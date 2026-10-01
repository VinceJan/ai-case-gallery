# 新系统集成检查：存档 / 背包使用 / 持物 / 钓鱼持竿 / 睡躺 / 坐长椅 / 设置
import os, sys, json
from playwright.sync_api import sync_playwright

OUT = "shots"
os.makedirs(OUT, exist_ok=True)
errs, fails = [], []

def check(name, cond, extra=""):
    if not cond: fails.append(f"{name} {extra}")
    print(f"[{'OK ' if cond else 'FAIL'}] {name} {extra}")

with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"])
    p = b.new_page(viewport={"width":1200,"height":760})
    p.on("pageerror", lambda e: errs.append(f"{e}\n{getattr(e,'stack','')}"))
    p.on("console", lambda m: errs.append(f"console.error: {m.text}") if m.type=="error" else None)
    p.goto("http://127.0.0.1:5373/", wait_until="load")
    p.wait_for_function("() => window.__sakura && window.__sakura.game && window.__sakura.game.player", timeout=90000)
    p.wait_for_timeout(1000)
    ev = lambda js: p.evaluate(js)
    p.keyboard.press("Space")
    p.wait_for_timeout(1500)

    # ---------- 设置面板 ----------
    print("\n--- 设置面板 ---")
    check("设置模块已挂载", ev("()=>!!window.__sakura.settings"))
    ev("()=>window.__sakura.settings.open()")
    p.wait_for_timeout(600)
    check("设置面板能打开", ev("()=>window.__sakura.settings.isOpen()"))
    p.screenshot(path=f"{OUT}/s1-settings.png")
    # 改灵敏度
    ev("()=>window.__sakura.settings.set('sensitivity', 1.8)")
    p.wait_for_timeout(300)
    check("灵敏度写回 input", abs(ev("()=>window.__sakura.input.sensitivity") - 1.8) < 0.01)
    # 改音量
    ev("()=>window.__sakura.settings.set('volume', 0.3)")
    p.wait_for_timeout(200)
    check("音量写回 audio", abs(ev("()=>window.__sakura.audio.volume") - 0.3) < 0.01)
    # 静音
    ev("()=>window.__sakura.settings.set('muted', true)")
    p.wait_for_timeout(200)
    check("静音生效", ev("()=>window.__sakura.audio.getMuted()")==True)
    ev("()=>{window.__sakura.settings.set('muted', false); window.__sakura.settings.set('volume', 0.7); window.__sakura.settings.set('sensitivity', 1.0);}")
    # 画质
    dpr_before = ev("()=>window.__sakura.engine.renderer.getPixelRatio()")
    ev("()=>window.__sakura.settings.set('quality', 'low')")
    p.wait_for_timeout(400)
    check("低画质关阴影", ev("()=>window.__sakura.engine.renderer.shadowMap.enabled")==False)
    ev("()=>window.__sakura.settings.set('quality', 'high')")
    p.wait_for_timeout(400)
    check("高清开阴影", ev("()=>window.__sakura.engine.renderer.shadowMap.enabled")==True)
    ev("()=>window.__sakura.settings.set('quality', 'balanced')")
    # 恢复默认 & 持久化
    ev("()=>window.__sakura.settings.reset()")
    p.wait_for_timeout(200)
    check("恢复默认", ev("()=>window.__sakura.settings.isDirty()")==False)
    persisted = ev("()=>!!localStorage.getItem('sakura-town-settings')")
    check("设置已持久化到 localStorage", persisted)
    ev("()=>window.__sakura.settings.close()")
    p.wait_for_timeout(400)
    check("设置面板能关闭", ev("()=>window.__sakura.settings.isOpen()")==False)
    # K 键开关
    p.keyboard.press("KeyK"); p.wait_for_timeout(500)
    check("K 键能开设置", ev("()=>window.__sakura.settings.isOpen()")==True)
    p.keyboard.press("Escape"); p.wait_for_timeout(500)
    check("Esc 能关设置", ev("()=>window.__sakura.settings.isOpen()")==False)

    # ---------- 背包使用 / 持物 ----------
    print("\n--- 背包 / 持物 ---")
    ev("""()=>{const g=window.__sakura.game;
      g.state.inv.add('catfood', 2); g.state.inv.add('charm', 1);
      g.state.inv.add('onigiri', 1); g.state.inv.add('parcel', 1);
      g.state.held = null; g._lastHeld = undefined; }""")
    p.wait_for_timeout(500)
    # 手持 → 手上应出现模型
    ev("()=>{window.__sakura.game.state.held = 'catfood';}")
    p.wait_for_timeout(600)
    carrying = ev("()=>!!window.__sakura.game.player.carrying")
    check("手持物品时手上出现模型", carrying)
    p.screenshot(path=f"{OUT}/s2-carry.png")
    # 使用食物
    stam0 = ev("()=>window.__sakura.game.state.stamina")
    ev("()=>{const g=window.__sakura.game; g.state.stamina=40; g.useItem('onigiri');}")
    p.wait_for_timeout(300)
    stam1 = ev("()=>window.__sakura.game.state.stamina")
    check("吃食物回体力", stam1 > 40, f"{stam0}->{stam1}")
    check("食物被消耗", ev("()=>!window.__sakura.game.state.bag.onigiri"))
    # 用御守
    ev("()=>window.__sakura.game.useItem('charm')")
    p.wait_for_timeout(300)
    check("御守可使用并转为手持", ev("()=>window.__sakura.game.state.held")=='charm')
    # 给 NPC 猫粮
    ev("""()=>{const g=window.__sakura.game; g.state.held='catfood';
       const n=g.npcs.byId.get('tanaka'); n.hidden=false; n.mesh.visible=true;
       g._giveToNpc(n, 'catfood'); }""")
    p.wait_for_timeout(300)
    check("猫粮可送给 NPC 并消耗", ev("()=>!window.__sakura.game.state.bag.catfood || window.__sakura.game.state.flags.gave_tanaka_catfood"))
    check("赠送后写入 flag（不重复送）", ev("()=>!!window.__sakura.game.state.flags.gave_tanaka_catfood"))

    # ---------- 钓鱼持竿 ----------
    print("\n--- 钓鱼持竿 ---")
    ev("()=>{const g=window.__sakura.game; g.player.setPosition(20,-61.8,Math.PI); g.startFishing();}")
    p.wait_for_timeout(800)
    check("钓鱼时手持鱼竿", ev("()=>!!window.__sakura.game._rodMesh && !!window.__sakura.game._rodMesh.parent"))
    p.screenshot(path=f"{OUT}/s3-fishing-rod.png")
    ev("()=>window.__sakura.game._endFishing()")
    p.wait_for_timeout(400)
    check("收竿后鱼竿收起", ev("()=>!window.__sakura.game._rodMesh || !window.__sakura.game._rodMesh.parent"))

    # ---------- 存档 ----------
    print("\n--- 存档 ---")
    ev("""()=>{const g=window.__sakura.game;
      g.state.money=999; g.state.day=5; g.state.hour=13.5; g.state.minute=30;
      g.state.inv.add('charm', 3);
      g.state.flags.met_yamada=true; g.quests.begin('delivery'); g.saveNow(); }""")
    p.wait_for_timeout(600)
    check("存档写入成功", ev("()=>window.__sakura.game.saveNow()")==True)
    check("存档有摘要", (ev("()=>window.__sakura.game.saveSummary()") or {}).get("day")==5)
    # 改内存状态，再读回
    ev("()=>{const g=window.__sakura.game; g.state.money=0; g.state.day=1; g.state.inv.remove('charm',99); g.loadNow();}")
    p.wait_for_timeout(600)
    st = ev("""()=>{const g=window.__sakura.game; return {money:g.state.money, day:g.state.day,
      charm:g.state.bag.charm, hour:g.state.hour, met:!!g.state.flags.met_yamada,
      invOK: g.state.inv instanceof Object && typeof g.state.inv.add==='function',
      toastOK: typeof g.state.toast==='function',
      questActive: g.quests.status('delivery')};}""")
    check("读档还原 money/day", st["money"]==999 and st["day"]==5, json.dumps(st))
    check("读档还原背包与 flags", st["charm"]==3 and st["met"]==True, json.dumps(st))
    check("读档后 inv 重新绑定可用", st["invOK"] and st["toastOK"])
    check("读档后任务状态保留", st["questActive"] in ('active','done'), st["questActive"])
    # 刷新页面 → 标题应出现「继续上次」
    p.reload(wait_until="load")
    p.wait_for_function("() => window.__sakura && window.__sakura.game", timeout=90000)
    p.wait_for_timeout(1500)
    hasContinue = ev("()=>!!document.querySelector('.title-btn.primary') && document.querySelector('.title-btn.primary').textContent.includes('继续')")
    check("刷新后标题出现「继续上次」", hasContinue)
    p.screenshot(path=f"{OUT}/s4-title-continue.png")
    # 点继续 → 进度恢复
    p.click(".title-btn.primary")
    p.wait_for_timeout(1200)
    st2 = ev("()=>({day:window.__sakura.game.state.day, money:window.__sakura.game.state.money, started:!document.getElementById('title').classList.contains('hidden')})")
    check("点「继续上次」恢复进度", st2["day"]==5 and st2["money"]==999 and st2["started"]==True, json.dumps(st2))
    p.screenshot(path=f"{OUT}/s5-continued.png")

    # ---------- 睡觉躺姿 / 坐长椅 ----------
    print("\n--- 姿势 ---")
    ev("""()=>{const g=window.__sakura.game;
      g.enterBuilding({building:'home', interior:'home'});}""")
    p.wait_for_timeout(1200)
    ev("""()=>{const g=window.__sakura.game;
      const bed=g.world.interiors.home.interactables.find(x=>x.kind==='bed');
      g.player.setPosition(bed.x+0.6, bed.z+1.2, Math.PI);
      g._doInteract({kind:'bed', x:bed.x, z:bed.z, yaw:Math.PI});}""")
    p.wait_for_timeout(2000)
    sleepPose = ev("()=>({pose:window.__sakura.game.player.holdingPose, bodyRot:+window.__sakura.game.player.mesh.userData.parts.body.rotation.x.toFixed(2), headX:+window.__sakura.game.player.mesh.userData.parts.head.rotation.x.toFixed(2)})")
    check("躺下后 body 后仰（睡姿）", sleepPose["pose"]=='sleep' and sleepPose["bodyRot"] < -1.2 and sleepPose["headX"] <= -0.05, json.dumps(sleepPose))
    p.screenshot(path=f"{OUT}/s6-sleeping.png")
    ev("()=>{const g=window.__sakura.game; g.exitBuilding();}")
    p.wait_for_timeout(1200)
    # 坐长椅
    ev("""()=>{const g=window.__sakura.game;
      const bench=g.points.find(x=>x.kind==='sit');
      g.player.setPosition(bench.x+1.0, bench.z+1.0, 0);
      g._doInteract(bench);}""")
    p.wait_for_timeout(1200)
    sitPose = ev("""()=>{const g=window.__sakura.game, p=g.player;
      return {pose:p.holdingPose, px:+p.pos.x.toFixed(2), pz:+p.pos.z.toFixed(2),
              bx:0}; }""")
    # 角色应被挪到长椅位置（误差 <0.5）
    bench = ev("()=>{const b=window.__sakura.game.points.find(x=>x.kind==='sit'); return {x:b.x,z:b.z};}")
    onBench = abs(sitPose["px"]-bench["x"]) < 0.6 and abs(sitPose["pz"]-bench["z"]) < 0.6
    check("坐下时角色被挪到长椅上", onBench and sitPose["pose"]=='sit', f"player=({sitPose['px']},{sitPose['pz']}) bench=({bench['x']:.1f},{bench['z']:.1f})" if False else f"player=({sitPose['px']},{sitPose['pz']}) bench=({bench['x']},{bench['z']})")
    p.screenshot(path=f"{OUT}/s7-sitting.png")
    # 起身回到原处
    ev("()=>window.__sakura.game._standUp()")
    p.wait_for_timeout(400)
    check("起身回到坐下前的位置", ev("()=>window.__sakura.game.player.holdingPose") is None)

    b.close()

print(f"\n=== 失败 ({len(fails)}) ===")
for f in fails: print(" ", f)
print(f"=== 错误 ({len(errs)}) ===")
for e in errs[:8]: print(" ", e)
sys.exit(1 if (fails or errs) else 0)
