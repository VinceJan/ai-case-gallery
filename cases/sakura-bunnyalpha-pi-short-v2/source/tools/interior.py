import os
from playwright.sync_api import sync_playwright
os.makedirs("shots", exist_ok=True)
errs=[]
with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"])
    p = b.new_page(viewport={"width":1100,"height":720})
    p.on("pageerror", lambda e: errs.append(str(e)))
    p.goto("http://127.0.0.1:5373/", wait_until="load")
    p.wait_for_function("() => window.__sakura && window.__sakura.game && window.__sakura.game.player", timeout=90000)
    p.keyboard.press("Space"); p.wait_for_timeout(1200)
    for rid,label in [('home','家'),('store','山田商店'),('konbini','便利店'),('ramen','拉面'),('cafe','咖啡'),('izakaya','小酒馆'),('station','车站'),('post','邮局'),('shrine','神社')]:
        p.evaluate("(rid)=>{const g=window.__sakura.game; if(g.indoor) g.exitBuilding(); g.enterBuilding({building:rid, interior:rid});}", rid)
        p.wait_for_timeout(1400)
        p.screenshot(path=f"shots/room-{rid}.png")
    p.evaluate("()=>{const g=window.__sakura.game; g.exitBuilding();}")
    p.wait_for_timeout(1000)
    b.close()
for e in errs[:8]: print(e)
print('ok')
