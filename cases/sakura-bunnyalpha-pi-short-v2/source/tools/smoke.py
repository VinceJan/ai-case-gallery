# 真实操作冒烟测试：只用键盘 / 鼠标驱动，模拟一个玩家
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
    p.wait_for_timeout(1200)

    ev = lambda js: p.evaluate(js)
    speed = lambda n: ev(f"()=>window.__sakura.engine.setTimeScale({n})")

    check("标题画面可见", ev("()=>!document.getElementById('title').classList.contains('hidden')"))
    p.keyboard.press("Space")
    p.wait_for_timeout(1200)
    check("空格开始游戏", ev("()=>document.getElementById('title').classList.contains('hidden')"))

    # 真的走一段路
    start = ev("()=>({x:window.__sakura.game.player.pos.x, z:window.__sakura.game.player.pos.z})")
    p.keyboard.down("KeyW")
    for _ in range(8):
        p.wait_for_timeout(400)
    p.keyboard.up("KeyW")
    p.wait_for_timeout(400)
    end = ev("()=>({x:window.__sakura.game.player.pos.x, z:window.__sakura.game.pos?.z ?? window.__sakura.game.player.pos.z, y:window.__sakura.game.player.pos.y, st:window.__sakura.game.player.state})")
    moved = ((end["x"]-start["x"])**2 + (end["z"]-start["z"])**2) ** 0.5
    check("WASD 能走动", moved > 1.0, f"移动 {moved:.1f}m, state={end['st']}")
    p.screenshot(path=f"{OUT}/p1-walk.png")

    # 跑步掉体力
    p.keyboard.down("ShiftLeft"); p.keyboard.down("KeyW")
    p.wait_for_timeout(3000)
    stam = ev("()=>window.__sakura.game.state.stamina")
    p.keyboard.up("KeyW"); p.keyboard.up("ShiftLeft")
    check("跑步消耗体力", stam < 99, f"stamina={stam:.0f}")
    p.wait_for_timeout(200)
    p.screenshot(path=f"{OUT}/p2-stamina.png")

    # 打开日志 / 背包 / 帮助
    p.keyboard.press("KeyJ"); p.wait_for_timeout(600)
    check("J 打开日志", ev("()=>document.getElementById('journal').classList.contains('on')"))
    p.screenshot(path=f"{OUT}/p3-journal.png")
    p.click("#journal .tab[data-t='b']"); p.wait_for_timeout(400)
    p.screenshot(path=f"{OUT}/p4-bag.png")
    p.keyboard.press("KeyJ"); p.wait_for_timeout(400)
    check("J 关闭日志", ev("()=>!document.getElementById('journal').classList.contains('on')"))
    p.keyboard.press("KeyH"); p.wait_for_timeout(600)
    check("H 打开帮助", ev("()=>document.getElementById('help').classList.contains('on')"))
    p.screenshot(path=f"{OUT}/p5-help.png")
    p.keyboard.press("KeyH"); p.wait_for_timeout(400)

    # 走到门口按 E 进门
    ev("""()=>{const g=window.__sakura.game;
      const d=g.points.find(x=>x.kind==='door'&&x.building==='home');
      g.player.setPosition(d.x + d.dirX*0.2, d.z + d.dirZ*0.2, Math.atan2(d.dirX,d.dirZ));
      g.player.camYaw = g.player.yaw + Math.PI; g.player.camDist=6.5; g.player.camPitch=0.28;}""")
    p.wait_for_timeout(900)
    p.screenshot(path=f"{OUT}/p6-door-prompt.png")
    check("门口出现交互提示", ev("()=>document.getElementById('prompt').classList.contains('on')"),
          ev("()=>document.getElementById('prompt').innerText.replace(/\\n/g,' ')"))
    p.keyboard.press("KeyE")
    p.wait_for_timeout(1200)
    ind = ev("()=>window.__sakura.game.indoor")
    err = ev("()=>window.__sakuraError || null")
    check("按 E 进屋", ind=="home", f"indoor={ind} err={err}")
    p.screenshot(path=f"{OUT}/p7-indoor.png")

    # 屋里走到床边睡觉
    ev("""()=>{const g=window.__sakura.game;
      const b=g.world.interiors.home.interactables.find(x=>x.kind==='bed');
      g.player.setPosition(b.x, b.z+0.9, Math.PI);}""")
    p.wait_for_timeout(800)
    p.screenshot(path=f"{OUT}/p8-bed.png")
    p.keyboard.press("KeyE")
    p.wait_for_timeout(500)
    p.keyboard.press("KeyE")
    p.wait_for_timeout(6500)
    check("睡觉到第二天早上", ev("()=>window.__sakura.game.state.day")==2 and 6 <= ev("()=>window.__sakura.game.state.hour") < 8,
          f"day={ev('()=>window.__sakura.game.state.day')} indoor={ev('()=>window.__sakura.game.indoor')} err={ev('()=>window.__sakuraError||null')}")
    p.screenshot(path=f"{OUT}/p9-nextday.png")

    # 出门
    ev("()=>{const g=window.__sakura.game; const r=g.world.interiors.home; g.player.setPosition(r.exit.x, r.exit.z - 0.7, 0);}")
    p.wait_for_timeout(800)
    p.keyboard.press("KeyE")
    p.wait_for_timeout(1000)
    check("按 E 出屋", ev("()=>window.__sakura.game.indoor")==None)
    p.screenshot(path=f"{OUT}/p10-outdoor.png")

    # 一整天作息巡检
    print("\n--- 24 小时作息 ---")
    rows = []
    for h in [5, 8, 11, 14, 17, 20, 23]:
        ev(f"()=>{{const g=window.__sakura.game; g.state.hour={h}; g.state.minute=0;}}")
        p.wait_for_timeout(1400)
        rows.append(ev("""()=>{const g=window.__sakura.game;
          return {h:g.state.hour, who:g.npcs.list.filter(n=>n.mesh.visible).map(n=>n.def.name).join('、')};}"""))
        p.screenshot(path=f"{OUT}/p11-hour-{h:02d}.png")
    for r in rows:
        print(f"   {r['h']:02d}点 在外: {r['who'] or '（无）'}")
    check("白天有居民在外面活动", any(len(r['who']) >= 2 for r in rows if 7 <= r['h'] <= 19))

    print("lastError:", ev("()=>window.__sakuraError || '(none)'"))
    stats = ev("""()=>{const e=window.__sakura.engine,i=e.renderer.info;
      return {calls:i.render.calls,tris:i.render.triangles,geo:i.memory.geometries,tex:i.memory.textures};}""")
    print("\nSTATS", json.dumps(stats))
    b.close()

print(f"\n=== 失败 ({len(fails)}) ===")
for f in fails: print(" ", f)
print(f"=== 错误 ({len(errs)}) ===")
for e in errs[:8]: print(" ", e)
sys.exit(1 if (fails or errs) else 0)
