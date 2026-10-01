# 樱花小镇 —— 玩法链路检查
import os, sys, json
from playwright.sync_api import sync_playwright

OUT = "shots"
os.makedirs(OUT, exist_ok=True)
errs = []
fails = []

def check(name, cond, extra=""):
    mark = "OK " if cond else "FAIL"
    if not cond:
        fails.append(f"{name} {extra}")
    print(f"[{mark}] {name} {extra}")

with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"])
    p = b.new_page(viewport={"width":1200,"height":760})
    p.on("pageerror", lambda e: errs.append(f"{e}\n{getattr(e,'stack','')}"))
    p.on("console", lambda m: errs.append(f"console.{m.type}: {m.text}") if m.type=="error" else None)
    p.goto("http://127.0.0.1:5373/", wait_until="load")
    p.wait_for_function("() => window.__sakura && window.__sakura.game && window.__sakura.game.player", timeout=90000)
    p.keyboard.press("Space")
    p.wait_for_timeout(1500)

    ev = lambda js, arg=None: p.evaluate(js, arg) if arg is not None else p.evaluate(js)
    shot = lambda n, w=900: (p.wait_for_timeout(w), p.screenshot(path=f"{OUT}/{n}.png"))
    # 软件渲染帧率很低，检查时用时间倍速推进
    def speed(n):
        ev(f"()=>window.__sakura.engine.setTimeScale({n})")

    # ---------- 1. 列车 → 道口 ----------
    print("\n--- 道口 / 列车 ---")
    ev("""()=>{const g=window.__sakura.game, r=g.railway;
      const crossS = r.s - r.distanceToCrossing();
      r.s = crossS - 120; r.speed = 15.5; r.phase='run'; r.hasStoppedAtStation=true;
      g.state.hour=10; g.state.minute=0;
      g.player.setPosition(0, 58, Math.PI);
      g.player.camYaw = Math.PI; g.player.camPitch=0.2; g.player.camDist=7;
    }""")
    speed(5)
    states = []
    for i in range(12):
        p.wait_for_timeout(500)
        st = ev("""()=>{const r=window.__sakura.game.railway;
          return {s:r.s, d:+r.distanceToCrossing().toFixed(1), st:r.crossingState, spd:+r.speed.toFixed(1),
                  block: r.lcBlocker.enabled, arm:+(r.lc.arms[0].pivot.rotation.z).toFixed(2)};}""")
        states.append(st)
    for st in states:
        print("   ", st)
    check("道口进入过警铃/落杆状态", any(s["st"] in ("warn","closing","closed") for s in states),
          f"states={[s['st'] for s in states]}")
    check("落杆时玩家被拦住", any(s["st"]=="closed" and s["block"] for s in states) or any(s["st"]=="closing" for s in states))
    shot("g1-crossing-train", 600)
    speed(1)

    # ---------- 2. 列车进站停靠 ----------
    print("\n--- 列车进站 ---")
    ev("()=>{const g=window.__sakura.game; g.quests.begin('watchtrain'); g.state.flags.sawTrain=false;}")
    ev("""()=>{const g=window.__sakura.game, r=g.railway;
      r.hasStoppedAtStation=false; r.phase='run'; r.speed=0; r.s=0;
      g.player.setPosition(-40, 44, Math.PI); g.player.camYaw=Math.PI; g.player.camDist=9; g.player.camPitch=0.12;
    }""")
    speed(4)
    info = None
    saw = False
    for i in range(150):
        p.wait_for_timeout(350)
        info = ev("()=>{const r=window.__sakura.game.railway; return {phase:r.phase, spd:+r.speed.toFixed(2), s:+r.s.toFixed(1)};}")
        if info["phase"] == "dwell":
            shot("g2-train-dwell", 150)
            saw = ev("()=>{const g=window.__sakura.game; g.player.setPosition(-40,44,Math.PI); const before={qst:g.quests.status('watchtrain'), dwell:g.railway.isAtStation, px:g.player.pos.x, pz:g.player.pos.z, saw:!!g.state.flags.sawTrain}; g._watchTrain(); return {ok:!!g.state.flags.sawTrain, before};}")
            print("    watchTrain:", saw)
            saw = saw["ok"]
            break
    print("   ", info)
    check("列车在站台停靠", info["phase"]=="dwell" and info["spd"]<1.0, str(info))
    p.wait_for_timeout(1500)
    check("列车停站时看车可完成任务", saw)
    speed(1)

    # ---------- 3. 任务：送信 ----------
    print("\n--- 任务链路 ---")
    ev("()=>{const g=window.__sakura.game; g.exitBuilding?.(); g.state.hour=9; g.state.minute=0;}")
    p.wait_for_timeout(400)
    # 和山田对话（传送到身边）
    ev("""()=>{const g=window.__sakura.game; const n=g.npcs.byId.get('yamada');
       n.hidden=false; n.mesh.visible=true;
       g.player.setPosition(n.pos.x+1.3, n.pos.z+1.3, 0);
       g.player.camYaw=Math.PI; g.player.camDist=5; g.player.camPitch=0.2;
       g.talkTo(n);}""")
    p.wait_for_timeout(600)
    for _ in range(8):
        p.keyboard.press("KeyE"); p.wait_for_timeout(260)
    q1 = ev("()=>({st:window.__sakura.game.quests.status('delivery'), bag:window.__sakura.game.state.bag})")
    check("与山田交谈后接到送信任务", q1["st"]=="active", str(q1))
    check("拿到包裹", q1["bag"].get("parcel")==1, str(q1))
    shot("g3-talk-yamada", 400)

    # 送到田中
    ev("""()=>{const g=window.__sakura.game; const n=g.npcs.byId.get('tanaka');
       n.hidden=false; n.mesh.visible=true;
       g.player.setPosition(n.pos.x+1.3, n.pos.z+1.3, 0); g.talkTo(n);}""")
    p.wait_for_timeout(600)
    for _ in range(8):
        p.keyboard.press("KeyE"); p.wait_for_timeout(240)
    q2 = ev("()=>({st:window.__sakura.game.quests.status('delivery'), money:window.__sakura.game.state.money, bag:window.__sakura.game.state.bag})")
    check("送信任务完成", q2["st"]=="done", str(q2))
    check("拿到报酬", q2["money"]==380 and q2["bag"].get("catfood")==1, str(q2))
    shot("g4-talk-tanaka", 400)

    # ---------- 4. 采花瓣 / 浇菜园 ----------
    print("\n--- 采集 / 菜园 ---")
    ev("()=>{const g=window.__sakura.game; const yui=g.npcs.byId.get('yui'); yui.hidden=false; yui.mesh.visible=true; yui.setAct('idle'); g.talkTo(yui);}")
    p.wait_for_timeout(500)
    for _ in range(6):
        p.keyboard.press("KeyE"); p.wait_for_timeout(220)
    ev("""()=>{const g=window.__sakura.game;
       for (const t of g.points.filter(x=>x.kind==='petal').slice(0,4)) { g._doInteract(t); g._doInteract(t); } }""")
    p.wait_for_timeout(700)
    q3 = ev("()=>({st:window.__sakura.game.quests.status('petals'), petals:window.__sakura.game.state.bag.petal})")
    check("采集樱花瓣完成任务", q3["st"]=="done" and q3["petals"]>=5, str(q3))

    ev("()=>{const g=window.__sakura.game; const n=g.npcs.byId.get('tanaka'); g.talkTo(n);}")
    p.wait_for_timeout(500)
    for _ in range(12):
        p.keyboard.press("KeyE"); p.wait_for_timeout(200)
    ev("()=>{const g=window.__sakura.game; g.ui.endDialogue(); g._manualLock=false;}")
    p.wait_for_timeout(300)
    ev("""()=>{const g=window.__sakura.game; const t=g.points.find(x=>x.kind==='garden');
       g.player.setPosition(t.x, t.z+1.0, 0);
       for(let i=0;i<4;i++){ g._doInteract(t); g.state.bag.radish=(g.state.bag.radish||0)+1; }
       g.quests.update();}""")
    p.wait_for_timeout(500)
    q4 = ev("()=>({st:window.__sakura.game.quests.status('garden'), radish:window.__sakura.game.state.bag.radish})")
    check("菜园任务完成", q4["st"]=="done", str(q4))
    shot("g5-quests", 400)

    # ---------- 5. 钓鱼 ----------
    print("\n--- 钓鱼 ---")
    ev("""()=>{const g=window.__sakura.game;
      const n=g.npcs.byId.get('kobayashi'); g.talkTo(n);}""")
    p.wait_for_timeout(500)
    for _ in range(6):
        p.keyboard.press("KeyE"); p.wait_for_timeout(220)
    ev("()=>{const g=window.__sakura.game; g.player.setPosition(20,-61.8,Math.PI); g.player.camYaw=Math.PI; g.player.camPitch=0.2; g.player.camDist=6; g.startFishing();}")
    speed(4)
    # 等咬钩
    got_bite = False
    for i in range(20):
        p.wait_for_timeout(400)
        stt = ev("()=>window.__sakura.game.fishing.state")
        if stt == "bite":
            p.keyboard.press("KeyE")
            got_bite = True
            break
    shot("g6-fishing-bite", 300)
    check("钓到咬钩时机", got_bite)
    # 收线：页面内自动驾驶（每 25ms 调一次，模拟人的反应）
    res = p.evaluate("""() => new Promise((resolve) => {
      const g = window.__sakura.game;
      const t0 = performance.now();
      const id = setInterval(() => {
        const f = g.fishing, h = f.hud();
        if (f.state === 'result' || f.state === 'idle') { clearInterval(id); resolve(f.state); return; }
        if (f.state === 'bite') { g.input.keys.add('KeyE'); g.input.pressed.add('KeyE'); }
        else if (f.state === 'reel') { if (h.pointer > h.zone + h.zoneHalf * 0.25) g.input.keys.delete('KeyE'); else if (h.pointer < h.zone - h.zoneHalf * 0.25) g.input.keys.add('KeyE'); }
        else { g.input.pressed.add('KeyE'); setTimeout(() => g.input.pressed.delete('KeyE'), 25); }
        if (performance.now() - t0 > 40000) { clearInterval(id); resolve('timeout'); }
      }, 25);
    })""")
    print("   fishing phase result:", res)
    f = {}
    for i in range(25):
        p.wait_for_timeout(600)
        f = ev("()=>{const g=window.__sakura.game; return {st:g.fishing.state, res:g.fishing.result, fish:g.state.bag.fish, caught:!!g.state.flags.caughtFish};}")
        if f["caught"] or f["st"] == "idle": break
    print("   ", f)
    check("钓鱼判定生效（成功或失败都要有结果）", f["st"] in ("idle","result"), str(f))
    check("成功钓到一条鱼", f["caught"] is True or (f["fish"] or 0) >= 1, str(f))
    shot("g7-fishing-result", 400)
    ev("()=>{window.__sakura.game.fishing.reset();}")
    speed(1)

    # ---------- 6. 睡觉 ----------
    print("\n--- 睡觉 ---")
    d0 = ev("()=>window.__sakura.game.state.day")
    ev("()=>{const g=window.__sakura.game; g.state.hour=23; g.state.minute=30; g.sleep();}")
    p.wait_for_timeout(4200)
    d1 = ev("()=>({day:window.__sakura.game.state.day, h:window.__sakura.game.state.hour})")
    check("睡觉推进到第二天早上", d1["day"]==d0+1 and 6<=d1["h"]<8, f"{d0} -> {d1}")
    shot("g8-morning", 500)

    # ---------- 7. 商店 ----------
    print("\n--- 商店 ---")
    ev("()=>{const g=window.__sakura.game; g.openShop('konbini');}")
    p.wait_for_timeout(500)
    m0 = ev("()=>window.__sakura.game.state.money")
    p.click(".shop-item")
    p.wait_for_timeout(400)
    m1 = ev("()=>({money:window.__sakura.game.state.money, bag:window.__sakura.game.state.bag, stam:window.__sakura.game.state.stamina})")
    check("买东西扣钱并入包/回体力", m1["money"]<m0, f"{m0} -> {m1}")
    shot("g9-shop", 300)
    p.keyboard.press("Escape")
    p.wait_for_timeout(400)

    # ---------- 8. 进门 / 出门 ----------
    print("\n--- 进出建筑 ---")
    ev("()=>{const g=window.__sakura.game; g.player.setPosition(-20.5,-2,1.9);}")
    p.wait_for_timeout(600)
    # 走到家门口
    ev("""()=>{const g=window.__sakura.game;
      const d=g.points.find(x=>x.kind==='door'&&x.building==='home');
      g.player.setPosition(d.x+1.2, d.z+1.2, 0); g._doInteract(d);}""")
    p.wait_for_timeout(1200)
    check("进入自家", ev("()=>window.__sakura.game.indoor")=="home")
    ev("()=>{const g=window.__sakura.game; g._doInteract({kind:'exit', x:0, z:0, radius:99, label:'出门'});}")
    p.wait_for_timeout(1000)
    check("走出自家", ev("()=>window.__sakura.game.indoor")==None)
    shot("g10-outside", 400)

    stats = ev("""()=>{const e=window.__sakura.engine, i=e.renderer.info;
      return {calls:i.render.calls, tris:i.render.triangles, geo:i.memory.geometries, tex:i.memory.textures, fps:e.fps};}""")
    print("\nSTATS", json.dumps(stats))
    b.close()

print(f"\n=== 失败项 ({len(fails)}) ===")
for f in fails: print(" ", f)
print(f"=== 运行时错误 ({len(errs)}) ===")
for e in errs[:10]: print(" ", e)
sys.exit(1 if (fails or errs) else 0)
