// 无头浏览器冒烟测试：加载游戏、模拟操作、截图
import puppeteer from 'puppeteer';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = 8123;
const shotsDir = path.join(root, 'tests', 'shots');

const server = spawn(process.execPath, ['serve.mjs', String(PORT)], { cwd: root, stdio: 'inherit' });
await new Promise((r) => setTimeout(r, 800));

fs.mkdirSync(shotsDir, { recursive: true });

const errors = [];
const logs = [];
let exitCode = 0;

const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox', '--disable-setuid-sandbox',
    '--enable-unsafe-swiftshader',
    '--use-gl=swiftshader',
    '--disable-dev-shm-usage',
    '--window-size=1280,800',
  ],
  defaultViewport: { width: 1280, height: 800 },
});

try {
  const page = await browser.newPage();
  page.on('console', (m) => {
    const t = m.type();
    logs.push(`[${t}] ${m.text()}`);
    if (t === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', (r) => errors.push('REQFAIL: ' + r.url() + ' ' + r.failure()?.errorText));

  console.log('→ 打开页面');
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.screenshot({ path: path.join(shotsDir, '01_title.png') });

  console.log('→ 点击新的开始');
  await page.click('#btn-new-game');
  // 等待世界生成完成
  await page.waitForFunction(() => window.__sakura?.game?.mode === 'town', { timeout: 120000 });
  console.log('→ 世界生成完成');
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(shotsDir, '02_town_morning.png') });

  // 状态检查
  const state1 = await page.evaluate(() => {
    const g = window.__sakura.game;
    return {
      mode: g.mode,
      day: g.clock.day, time: g.clock.timeText,
      npcs: g.npcs.length,
      buildings: g.town.buildings.length,
      colliders: g.town.colliders.length,
      trees: g.town.treeCount,
      drawCalls: g.engine.renderer.info.render.calls,
      triangles: g.engine.renderer.info.render.triangles,
      playerPos: g.player.pos,
      money: g.player.money,
    };
  });
  console.log('状态:', JSON.stringify(state1, null, 1));

  // 行走测试
  console.log('→ 模拟行走');
  await page.keyboard.down('KeyW');
  await new Promise((r) => setTimeout(r, 2000));
  await page.keyboard.up('KeyW');
  const moved = await page.evaluate(() => {
    const p = window.__sakura.game.player.pos;
    return { x: Math.round(p.x * 10) / 10, z: Math.round(p.z * 10) / 10 };
  });
  console.log('移动后位置:', JSON.stringify(moved));
  await page.screenshot({ path: path.join(shotsDir, '03_walk.png') });

  // 加速时间到白天，看天空变化
  console.log('→ 快进时间');
  await page.keyboard.press('Digit3');
  await new Promise((r) => setTimeout(r, 6000));
  await page.screenshot({ path: path.join(shotsDir, '04_day.png') });

  // 传送测试：商店街与NPC（等到有NPC处于工作状态时贴近交谈）
  console.log('→ 传送测试：商店街与NPC');
  await page.evaluate(() => {
    const g = window.__sakura.game;
    g.player.pos.x = -30; g.player.pos.z = -44;
    g.clock.minutes = 10 * 60;
  });
  await page.waitForFunction(() => {
    const g = window.__sakura.game;
    return g.npcs.some((n) => ['work', 'idle', 'relax', 'eat', 'shop'].includes(n.state));
  }, { timeout: 90000 });
  await page.evaluate(() => {
    const g = window.__sakura.game;
    let npc = g.npcs.find((n) => ['work', 'idle', 'relax', 'eat', 'shop'].includes(n.state));
    // 贴近并冻结该 NPC，保证交互稳定
    npc.override = { poiId: 'shotengai_mid', until: 99999, withPlayer: false };
    npc.path = null; npc.speed = 0; npc.state = 'idle';
    g.player.pos.x = npc.pos.x + 1.0;
    g.player.pos.z = npc.pos.z + 0.5;
    window.__talkTarget = npc.id;
    g.scanInteractables();
    if (!g.interactable || g.interactable.kind !== 'talk') {
      g.player.pos.x = npc.pos.x; g.player.pos.z = npc.pos.z + 0.6;
      g.scanInteractables();
    }
    g.interact();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(shotsDir, '05_shotengai.png') });
  const dlgVisible = await page.evaluate(() => !document.getElementById('dialogue-screen').classList.contains('hidden'));
  console.log('对话界面出现:', dlgVisible, '对象:', await page.evaluate(() => window.__talkTarget),
    'npcPos:', await page.evaluate(() => window.__npcPos),
    'interactable:', await page.evaluate(() => window.__interactable),
    'playerPos:', await page.evaluate(() => window.__sakura.game.player.pos));
  await page.screenshot({ path: path.join(shotsDir, '06_dialogue.png') });
  if (dlgVisible) {
    // 点闲聊
    const clicked = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('.dialogue-choice')];
      const chat = btns.find((b) => b.textContent === '闲聊');
      if (chat) { chat.click(); return true; }
      return false;
    });
    await new Promise((r) => setTimeout(r, 500));
    console.log('闲聊点击:', clicked);
    await page.screenshot({ path: path.join(shotsDir, '07_dialogue_chat.png') });
    await page.keyboard.press('Escape');
  }

  // 进入便利店
  console.log('→ 进入便利店');
  await page.evaluate(() => {
    const g = window.__sakura.game;
    const b = g.town.buildings.find((x) => x.building.id === 'shop_konbini');
    g.player.pos.x = b.door.x; g.player.pos.z = b.door.z + 0.5;
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.keyboard.press('KeyE');
  await new Promise((r) => setTimeout(r, 800));
  const interiorMode = await page.evaluate(() => window.__sakura.game.mode);
  console.log('室内模式:', interiorMode);
  await page.screenshot({ path: path.join(shotsDir, '08_interior.png') });

  // 购物
  if (interiorMode === 'interior') {
    const shopOpened = await page.evaluate(() => {
      const g = window.__sakura.game;
      // 走到柜台
      const it = g.interiorInteractions.find((i) => i.type === 'shop');
      if (it) { g.player.pos.x = it.pos.x; g.player.pos.z = it.pos.z + 0.5; return true; }
      return false;
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.keyboard.press('KeyE');
    await new Promise((r) => setTimeout(r, 500));
    const panelVisible = await page.evaluate(() => !document.getElementById('panel-screen').classList.contains('hidden'));
    console.log('商店面板:', panelVisible);
    await page.screenshot({ path: path.join(shotsDir, '09_shop.png') });
    if (panelVisible) {
      const bought = await page.evaluate(() => {
        const rows = [...document.querySelectorAll('.item-row')];
        const btn = rows[0]?.querySelector('button');
        if (btn) { btn.click(); return true; }
        return false;
      });
      await new Promise((r) => setTimeout(r, 400));
      console.log('购买点击:', bought);
      await page.screenshot({ path: path.join(shotsDir, '10_shop_buy.png') });
    }
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 300));
    // 出门
    const exited = await page.evaluate(() => {
      const g = window.__sakura.game;
      const it = g.interiorInteractions.find((i) => i.type === 'exit');
      g.player.pos.x = it.pos.x; g.player.pos.z = it.pos.z + 0.5;
      return true;
    });
    await new Promise((r) => setTimeout(r, 300));
    await page.keyboard.press('KeyE');
    await new Promise((r) => setTimeout(r, 500));
    console.log('回到户外:', await page.evaluate(() => window.__sakura.game.mode));
  }

  // 地图
  console.log('→ 打开地图');
  await page.keyboard.press('KeyM');
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(shotsDir, '11_map.png') });
  await page.keyboard.press('KeyM');

  // 背包与目标
  console.log('→ 背包/目标测试');
  await page.keyboard.press('Tab');
  await new Promise((r) => setTimeout(r, 400));
  const invVisible = await page.evaluate(() => !document.getElementById('panel-screen').classList.contains('hidden'));
  await page.screenshot({ path: path.join(shotsDir, '11b_inventory.png') });
  const goalsOk = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#panel-footer button')];
    const g = btns.find((b) => b.textContent === '小镇目标');
    if (g) { g.click(); return true; }
    return false;
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(shotsDir, '11c_goals.png') });
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 300));
  console.log('背包面板:', invVisible, '目标面板:', goalsOk);

  // 长椅休息
  console.log('→ 长椅休息测试');
  const sat = await page.evaluate(async () => {
    const g = window.__sakura.game;
    const bench = g.town.benches.find((b) => b.x === 14) || g.town.benches[0]; // 河畔长椅（避开NPC）
    g.player.pos.x = bench.x + 0.8;
    g.player.pos.z = bench.z + 0.8;
    await new Promise((r) => setTimeout(r, 350));
    g.scanInteractables();
    if (!g.interactable || g.interactable.kind !== 'sit') {
      g.player.pos.x = bench.x; g.player.pos.z = bench.z + 0.6;
      await new Promise((r) => setTimeout(r, 200));
      g.scanInteractables();
    }
    const dbg = { p: { ...g.player.pos }, bench, mode: g.mode,
      dBench: Math.hypot(g.player.pos.x - bench.x, g.player.pos.z - bench.z),
      near: g.town.buildings.map((b) => ({ id: b.building.id, d: Math.hypot(g.player.pos.x - b.door.x, g.player.pos.z - b.door.z) })).filter((x) => x.d < 6) };
    g.interact();
    return { sitting: g.player.sitting, kind: g.interactable?.kind, dbg };
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(shotsDir, '11d_sit.png') });
  await page.evaluate(() => window.__sakura.game.player.sitting && window.__sakura.game.interact());
  console.log('坐下:', JSON.stringify(sat));

  // 夜晚测试
  console.log('→ 快进到夜晚');
  await page.evaluate(() => { window.__sakura.game.clock.minutes = 21 * 60; });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(shotsDir, '12_night.png') });

  // 雨天测试
  console.log('→ 测试下雨');
  await page.evaluate(() => {
    const g = window.__sakura.game;
    g.weather.force('rain', 200);
    g.clock.minutes = 12 * 60;
  });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(shotsDir, '13_rain.png') });

  // 保存/读取
  console.log('→ 保存/读取测试');
  const saveOk = await page.evaluate(() => {
    const g = window.__sakura.game;
    g.saveSlot(1);
    const before = { day: g.clock.day, money: g.player.money, npcAff: g.npcs[0].affinity };
    g.player.money += 500;
    const ok = g.loadSlot(1);
    return { ok, restored: g.player.money === before.money, before };
  });
  console.log('存档测试:', JSON.stringify(saveOk));

  // 性能采样
  const perf = await page.evaluate(async () => {
    const g = window.__sakura.game;
    let frames = 0;
    const t0 = performance.now();
    await new Promise((resolve) => {
      const tick = () => { frames++; if (performance.now() - t0 > 2000) resolve(); else requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    return { fps: Math.round((frames / (performance.now() - t0)) * 1000), calls: g.engine.renderer.info.render.calls, tris: g.engine.renderer.info.render.triangles };
  });
  console.log('性能:', JSON.stringify(perf));

} catch (e) {
  console.error('测试失败:', e);
  exitCode = 1;
} finally {
  await browser.close();
  server.kill();
}

console.log('\n===== 错误 (' + errors.length + ') =====');
for (const e of errors.slice(0, 30)) console.log(' ✗', e);
if (errors.length > 0) exitCode = 1;
console.log('\n===== 日志尾部 =====');
for (const l of logs.slice(-15)) console.log(' ', l);
process.exit(exitCode);
