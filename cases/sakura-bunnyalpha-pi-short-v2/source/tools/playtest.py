# 樱花小镇 —— 自动化试玩检查（Playwright / Python）
# 用法: python tools/playtest.py
import os
import sys
import json
from playwright.sync_api import sync_playwright

OUT = "shots"
os.makedirs(OUT, exist_ok=True)

errors = []
logs = []

with sync_playwright() as pw:
    browser = pw.chromium.launch(
        args=[
            "--use-gl=angle",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
            "--ignore-gpu-blocklist",
        ]
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    def on_console(m):
        t = f"{m.type}: {m.text}"
        logs.append(t)
        if m.type == "error":
            errors.append(t)

    page.on("console", on_console)
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}\n{e.stack if hasattr(e,'stack') else ''}"))

    page.goto("http://127.0.0.1:5373/", wait_until="load")
    page.wait_for_timeout(1500)
    page.screenshot(path=f"{OUT}/00-loading.png")

    page.wait_for_function(
        "() => window.__sakura && window.__sakura.game && window.__sakura.game.player",
        timeout=90000,
    )
    page.wait_for_timeout(2500)
    page.screenshot(path=f"{OUT}/01-title.png")

    page.keyboard.press("Space")
    page.wait_for_timeout(2500)
    page.screenshot(path=f"{OUT}/02-start.png")

    def teleport(x, z, yaw=0.0, hour=None):
        page.evaluate(
            "([x,z,yaw,hour]) => { const g = window.__sakura.game;"
            " g.player.setPosition(x,z,yaw);"
            " if (hour !== null) { g.state.hour = Math.floor(hour); g.state.minute = Math.round((hour%1)*60); } }",
            [x, z, yaw, hour],
        )

    def set_hour(h):
        page.evaluate(
            "(h)=>{const g=window.__sakura.game; g.state.hour=Math.floor(h); g.state.minute=Math.round((h%1)*60);}",
            h,
        )

    def step(name, fn=None, wait=1500):
        if fn:
            fn()
        page.wait_for_timeout(wait)
        page.screenshot(path=f"{OUT}/{name}.png")

    step("03-plaza", lambda: teleport(0, -4, 1.57, 9.5))
    step("04-mainstreet", lambda: teleport(0, 20, 1.57, 12.0))
    step("05-station", lambda: teleport(-40, 40, 3.14, 10.0))
    step("06-crossing", lambda: teleport(0, 40, 0, 13.0), 2500)
    step("07-river", lambda: teleport(0, -58, 0, 16.0))
    step("08-bridge", lambda: teleport(0, -76, 0, 17.5))
    step("09-park", lambda: teleport(38, -48, 0, 8.0))
    step("10-shrine", lambda: teleport(-50, -40, -2.3, 9.0))
    step("11-school", lambda: teleport(54, 28, 3.14, 11.0))
    step("12-paddy", lambda: teleport(30, 78, 0, 17.0))
    step("13-dusk", lambda: set_hour(18.4), 2000)
    step("14-night", lambda: set_hour(21.5), 2500)
    step("15-dawn", lambda: set_hour(5.6), 2500)

    # 列车：驶向道口
    page.evaluate(
        "()=>{const g=window.__sakura.game; g.state.hour=10; g.state.minute=0;"
        " g.railway.s=0; g.railway.hasStoppedAtStation=false; g.railway.phase='run'; g.railway.speed=21;}"
    )
    page.wait_for_timeout(2200)
    page.screenshot(path=f"{OUT}/16-train-approach.png")
    page.wait_for_timeout(3200)
    page.screenshot(path=f"{OUT}/17-train-crossing.png")
    print("crossing state:", page.evaluate("()=>window.__sakura.game.railway.crossingState"))

    # 列车进站
    page.evaluate(
        "()=>{const g=window.__sakura.game; g.railway.s=100; g.railway.hasStoppedAtStation=false;"
        " g.railway.phase='run'; g.railway.speed=10;}"
    )
    page.wait_for_timeout(7000)
    page.screenshot(path=f"{OUT}/18-train-station.png")
    print("train phase:", page.evaluate("()=>window.__sakura.game.railway.phase"))

    # 进店
    page.evaluate("()=>window.__sakura.game.enterBuilding({building:'store', interior:'store'})")
    page.wait_for_timeout(1800)
    page.screenshot(path=f"{OUT}/19-interior-store.png")
    page.evaluate("()=>window.__sakura.game.exitBuilding()")
    page.wait_for_timeout(1200)

    # 对话
    page.evaluate(
        """()=>{const g=window.__sakura.game; const npc=g.npcs.byId.get('tanaka');
        npc.mesh.visible=true; npc.act='idle'; npc.setAct('idle');
        g.player.setPosition(npc.pos.x+1.4, npc.pos.z+1.4, 0); g.talkTo(npc);}"""
    )
    page.wait_for_timeout(1500)
    page.screenshot(path=f"{OUT}/20-dialogue.png")
    page.keyboard.press("KeyE")
    page.wait_for_timeout(400)
    page.keyboard.press("KeyE")
    page.wait_for_timeout(700)
    page.screenshot(path=f"{OUT}/21-dialogue2.png")

    # 商店
    page.evaluate("()=>window.__sakura.game.openShop('konbini')")
    page.wait_for_timeout(900)
    page.screenshot(path=f"{OUT}/22-shop.png")
    page.keyboard.press("Escape")
    page.wait_for_timeout(500)

    # 日志
    page.keyboard.press("KeyJ")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUT}/23-journal.png")
    page.keyboard.press("KeyJ")
    page.wait_for_timeout(400)

    # 钓鱼
    page.evaluate(
        "()=>{const g=window.__sakura.game; g.player.setPosition(19,-66.4,3.14); g.startFishing();}"
    )
    page.wait_for_timeout(4500)
    page.screenshot(path=f"{OUT}/24-fishing.png")
    page.keyboard.press("KeyE")
    page.wait_for_timeout(300)
    page.keyboard.down("KeyE")
    page.wait_for_timeout(1600)
    page.screenshot(path=f"{OUT}/25-fishing-reel.png")
    page.keyboard.up("KeyE")
    page.keyboard.press("Escape")
    page.wait_for_timeout(600)

    # 走路
    page.evaluate(
        "()=>{const g=window.__sakura.game; g.player.setPosition(-20.5,-2,1.9);"
        " g.state.hour=7.5; g.state.minute=0;}"
    )
    page.keyboard.down("KeyD")
    page.wait_for_timeout(1600)
    page.keyboard.up("KeyD")
    page.screenshot(path=f"{OUT}/26-walk.png")

    # 睡觉
    page.evaluate("()=>window.__sakura.game.sleep()")
    page.wait_for_timeout(4200)
    page.screenshot(path=f"{OUT}/27-morning.png")
    print("day:", page.evaluate("()=>window.__sakura.game.state.day"),
          "hour:", page.evaluate("()=>window.__sakura.game.state.hour"))

    stats = page.evaluate(
        """()=>{const e=window.__sakura.engine, i=e.renderer.info;
        return {calls:i.render.calls, triangles:i.render.triangles,
        geometries:i.memory.geometries, textures:i.memory.textures,
        programs: i.programs? i.programs.length : -1, fps:e.fps};}"""
    )
    print("STATS", json.dumps(stats, indent=2, ensure_ascii=False))

    npcs = page.evaluate(
        "()=>window.__sakura.game.npcs.list.map(n=>({id:n.def.id,act:n.act,"
        "x:Math.round(n.pos.x),z:Math.round(n.pos.z),vis:n.mesh.visible}))"
    )
    print("NPCS", json.dumps(npcs, ensure_ascii=False))

    browser.close()

print(f"\n=== ERRORS ({len(errors)}) ===")
for e in errors[:30]:
    print(e)
warns = [l for l in logs if l.startswith("warning")]
print(f"\n=== WARNINGS ({len(warns)}) ===")
for w in list(dict.fromkeys(warns))[:12]:
    print(w)

sys.exit(1 if errors else 0)
