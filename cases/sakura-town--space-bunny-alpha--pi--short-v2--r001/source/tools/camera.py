# 相机自由转动 + 移动速度检查
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
    p.on("console", lambda m: errs.append(f"console.error: {m.text}") if m.type == "error" else None)
    p.goto("http://127.0.0.1:5373/", wait_until="load")
    p.wait_for_function("() => window.__sakura && window.__sakura.game && window.__sakura.game.player", timeout=90000)
    p.wait_for_timeout(1200)

    ev = lambda js: p.evaluate(js)

    check("canPointerLock 已启用", ev("()=>window.__sakura.input.canPointerLock === true"))
    p.keyboard.press("Space")
    p.wait_for_timeout(1200)
    ev("()=>{const g=window.__sakura.game; g.player.setPosition(0,-4,0); g.player.camYaw=0; g.player.camPitch=0.25;}")
    p.wait_for_timeout(700)

    # --- 用真实鼠标事件驱动（Playwright 会派发 movementX/Y） ---
    def cam_state():
        return ev("""()=>{const pl=window.__sakura.game.player; return {
            yaw:+pl.camYaw.toFixed(3), pitch:+pl.camPitch.toFixed(3),
            camx:+pl.camera.position.x.toFixed(2), camz:+pl.camera.position.z.toFixed(2)};}""")

    before = cam_state()
    # 分多次小幅移动，模拟真实鼠标（浏览器会累加 movementX）
    for _ in range(12):
        p.mouse.move(600 + (_ - 6) * 14, 380, steps=1)
        p.wait_for_timeout(90)
    p.wait_for_timeout(500)
    after = cam_state()
    print("   before:", before, "\n   after :", after)
    check("鼠标水平移动能转动视角", abs(after["yaw"] - before["yaw"]) > 0.35,
          f"Δyaw={after['yaw']-before['yaw']:.3f}")
    check("鼠标转动带动相机绕角色", abs(after["camx"] - before["camx"]) > 0.8 or abs(after["camz"] - before["camz"]) > 0.8)
    p.screenshot(path=f"{OUT}/c1-mouselook.png")

    before2 = cam_state()
    for _ in range(10):
        p.mouse.move(600, 380 + (_ - 5) * 12, steps=1)
        p.wait_for_timeout(90)
    p.wait_for_timeout(500)
    after2 = cam_state()
    check("鼠标垂直移动能俯仰视角", abs(after2["pitch"] - before2["pitch"]) > 0.15,
          f"Δpitch={after2['pitch']-before2['pitch']:.3f}")
    check("俯仰角被夹在合理范围内", -0.45 <= after2["pitch"] <= 1.25, f"pitch={after2['pitch']}")
    p.screenshot(path=f"{OUT}/c2-mouselook-pitch.png")

    # 大幅转 360 度不越界、不崩
    for _ in range(40):
        p.mouse.move(600 + ((_ * 37) % 900), 380, steps=1)
        p.wait_for_timeout(40)
    p.wait_for_timeout(500)
    spun = cam_state()
    check("连续大幅转动不异常", abs(spun["yaw"]) < 100 and spun["camx"] == spun["camx"], str(spun))

    # --- 速度 ---
    def walk_test(key, shift, seconds):
        # 主街南段笔直无障碍，用它测速
        ev('()=>{const g=window.__sakura.game; g.state.stamina=100; g.player.setPosition(0,18,Math.PI); g.player.camYaw=Math.PI; g.player.camPitch=0.5;}')
        p.wait_for_timeout(700)
        a = ev('()=>({x:window.__sakura.game.player.pos.x, z:window.__sakura.game.player.pos.z})')
        if shift: p.keyboard.down('ShiftLeft')
        p.keyboard.down(key)
        p.wait_for_timeout(seconds * 1000)
        mid = ev('()=>window.__sakura.game.player.state')
        p.keyboard.up(key)
        if shift: p.keyboard.up('ShiftLeft')
        p.wait_for_timeout(250)
        c = ev('()=>({x:window.__sakura.game.player.pos.x, z:window.__sakura.game.player.pos.z})')
        return ((c['x']-a['x'])**2 + (c['z']-a['z'])**2) ** 0.5, mid

    # 加速时间倍率，让低帧率环境下也能测到距离
    ev("()=>window.__sakura.engine.setTimeScale(3)")
    d_walk, st1 = walk_test("KeyW", False, 3)
    d_run, st2 = walk_test("KeyW", True, 3)
    ev("()=>window.__sakura.engine.setTimeScale(1)")
    check("走路速度明显提升", d_walk > 3.0, f"3秒走 {d_walk:.1f}m (≈{d_walk/3:.1f} m/s) state={st1}")
    check("跑步明显快于走路", d_run > d_walk * 1.5, f"跑 {d_run:.1f}m / 走 {d_walk:.1f}m state={st2}")

    # 拖拽转视角（未锁定时的兜底）
    ev("()=>{const g=window.__sakura.game; g.player.camYaw=0;}")
    p.wait_for_timeout(400)
    b3 = cam_state()
    p.mouse.move(400, 380)
    p.mouse.down()
    for i in range(10):
        p.mouse.move(400 + i * 20, 380, steps=1)
        p.wait_for_timeout(70)
    p.mouse.up()
    p.wait_for_timeout(400)
    a3 = cam_state()
    check("未锁定时按住拖拽也能转视角", abs(a3["yaw"] - b3["yaw"]) > 0.2, f"Δyaw={a3['yaw']-b3['yaw']:.3f}")

    p.screenshot(path=f"{OUT}/c3-draglook.png")
    b.close()

print(f"\n=== 失败 ({len(fails)}) ===")
for f in fails: print(" ", f)
print(f"=== 错误 ({len(errs)}) ===")
for e in errs[:8]: print(" ", e)
sys.exit(1 if (fails or errs) else 0)
