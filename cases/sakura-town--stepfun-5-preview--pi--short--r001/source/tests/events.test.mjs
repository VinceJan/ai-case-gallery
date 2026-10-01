// 事件系统浏览器测试：钱包/猫/祭典/电车/烟花
import puppeteer from 'puppeteer';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const shotsDir = path.join(root, 'tests', 'shots');
fs.mkdirSync(shotsDir, { recursive: true });
const PORT = 8127;

const server = spawn(process.execPath, ['serve.mjs', String(PORT)], { cwd: root, stdio: 'inherit' });
await new Promise((r) => setTimeout(r, 800));

const errors = [];
let exitCode = 0;
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=swiftshader', '--disable-dev-shm-usage'],
  defaultViewport: { width: 1280, height: 800 },
});

function check(name, cond) {
  console.log((cond ? '  ✓ ' : '  ✗ ') + name);
  if (!cond) exitCode = 1;
}

try {
  const page = await browser.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  await page.click('#btn-new-game');
  await page.waitForFunction(() => window.__sakura?.game?.mode === 'town', { timeout: 120000 });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('— 丢钱包事件 —');
  const wallet = await page.evaluate(async () => {
    const g = window.__sakura.game;
    g.clock.day = 2; g.clock.minutes = 10 * 60;
    g.events.startWalletQuest();
    const st = g.events.state.wallet;
    const pickupExists = !!g.pickups.find((p) => p.id === 'wallet');
    const markerExists = g.markers.has('wallet_spot');
    return { started: !!st, pickupExists, markerExists, stage: st?.stage };
  });
  check('钱包事件触发 + 拾取物生成 + 标记', wallet.started && wallet.pickupExists && wallet.markerExists);

  // 玩家去捡钱包
  const walletPick = await page.evaluate(async () => {
    const g = window.__sakura.game;
    const st = g.events.state.wallet;
    g.player.pos.x = st.x; g.player.pos.z = st.z + 0.5;
    await new Promise((r) => setTimeout(r, 300));
    g.scanInteractables();
    g.interact();
    await new Promise((r) => setTimeout(r, 300)); // 等一帧让事件系统更新阶段
    return { hasWallet: g.player.countItem('wallet'), stage: g.events.state.wallet?.stage };
  });
  check('捡到钱包并进入归还阶段', walletPick.hasWallet >= 1 && walletPick.stage === 'return');

  // 归还
  const walletReturn = await page.evaluate(async () => {
    const g = window.__sakura.game;
    const st = g.events.state.wallet;
    const npc = g.npcs.find((n) => n.id === st.npcId);
    const money0 = g.player.money;
    const done = g.events.completeWallet();
    return { done, moneyUp: g.player.money > money0, flag: !!g.flags.walletDone, charm: g.player.countItem('charm') };
  });
  check('归还钱包获得谢礼', walletReturn.done && walletReturn.moneyUp && walletReturn.flag && walletReturn.charm >= 1);

  console.log('— 流浪猫事件 —');
  const cat = await page.evaluate(async () => {
    const g = window.__sakura.game;
    g.clock.day = 3; g.clock.minutes = 9 * 60;
    g.events.startCat();
    const visible = !!g.town.cats[0]?.group.visible;
    const marked = g.markers.has('cat');
    return { visible, marked, stage: g.events.state.cat?.stage };
  });
  check('猫出现并有标记', cat.visible && cat.marked);

  const catFeed = await page.evaluate(async () => {
    const g = window.__sakura.game;
    g.player.addItem('catfood', 2);
    const c = g.town.cats[0];
    g.player.pos.x = c.x + 0.8; g.player.pos.z = c.z + 0.5;
    await new Promise((r) => setTimeout(r, 250));
    g.scanInteractables();
    g.interact();
    await new Promise((r) => setTimeout(r, 250));
    return { following: g.catFollow, stage: g.events.state.cat?.stage, food: g.player.countItem('catfood') };
  });
  check('喂猫后猫跟随玩家', catFeed.following && catFeed.stage === 'following' && catFeed.food === 1);

  console.log('— 夏日祭 —');
  const festival = await page.evaluate(async () => {
    const g = window.__sakura.game;
    g.clock.day = 5; g.clock.minutes = 21 * 60;
    // 推进事件系统
    for (let i = 0; i < 5; i++) g.events.update(0.1, 5);
    const stalls = g.town.stalls.visible;
    const fireworks = g.town.fireworks.group.visible;
    const gathered = g.npcs.filter((n) => n.override?.poiId === 'shrine_top').length;
    return { stalls, fireworks, gathered, flags: g.flags.festivalToday };
  });
  check('祭典摊位+烟花+镇民聚集', festival.stalls && festival.fireworks && festival.gathered >= 5);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(shotsDir, '14_festival.png') });

  console.log('— 电车乘坐 —');
  const train = await page.evaluate(async () => {
    const g = window.__sakura.game;
    g.clock.day = 6; g.clock.minutes = 11 * 60;
    g.town.train.state = 'docked';
    g.town.train.dockTimer = 200;
    g.town.train.x = -28;
    g.player.addItem('ticket', 1);
    g.player.pos.x = -26; g.player.pos.z = -102;
    await new Promise((r) => setTimeout(r, 300));
    g.scanInteractables();
    const kind = g.interactable?.kind;
    g.interact();
    await new Promise((r) => setTimeout(r, 2200));
    return { kind, hour: g.clock.hour, tickets: g.player.countItem('ticket'), souvenirs: g.player.inventory.filter((i) => ['souvenir_city', 'souvenir_sweets', 'souvenir_craft', 'taiyaki_stuff'].includes(i.id)).length, mode: g.mode };
  });
  check('乘电车去城市并带回特产', train.kind === 'train' && train.hour >= 12 && train.souvenirs >= 1);

  console.log('— 自动保存与读取 —');
  const save = await page.evaluate(async () => {
    const g = window.__sakura.game;
    g.autoSave();
    const d = JSON.parse(localStorage.getItem('sakura_town_save_0'));
    return { hasClock: !!d?.clock, hasNpcs: (d?.npcs?.length || 0) === 15, hasShops: (d?.shops?.length || 0) === 6, day: d?.clock?.day };
  });
  check('自动存档结构完整', save.hasClock && save.hasNpcs && save.hasShops && save.day === 6);

  // 重新读取继续游戏
  await page.reload({ waitUntil: 'networkidle0' });
  await page.click('#btn-continue');
  await page.waitForFunction(() => window.__sakura?.game?.mode === 'town', { timeout: 120000 });
  const loaded = await page.evaluate(() => {
    const g = window.__sakura.game;
    return { day: g.clock.day, npcs: g.npcs.length, money: g.player.money };
  });
  check('读取自动存档恢复进度', loaded.day === 6 && loaded.npcs === 15);

  await page.screenshot({ path: path.join(shotsDir, '15_loaded.png') });

} catch (e) {
  console.error('测试失败:', e);
  exitCode = 1;
} finally {
  await browser.close();
  server.kill();
}

console.log('\n错误 (' + errors.length + '):');
for (const e of errors.slice(0, 10)) console.log(' ✗', e);
if (errors.length) exitCode = 1;
process.exit(exitCode);
