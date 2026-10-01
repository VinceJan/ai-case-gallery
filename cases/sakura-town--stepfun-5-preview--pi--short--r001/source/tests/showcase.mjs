//  showcase 截图：小镇各区域
import puppeteer from 'puppeteer';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const shotsDir = path.join(root, 'tests', 'shots');
fs.mkdirSync(shotsDir, { recursive: true });
const PORT = 8131;

const server = spawn(process.execPath, ['serve.mjs', String(PORT)], { cwd: root, stdio: 'inherit' });
await new Promise((r) => setTimeout(r, 800));
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=swiftshader', '--disable-dev-shm-usage'],
  defaultViewport: { width: 1280, height: 800 },
});
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  await page.click('#btn-new-game');
  await page.waitForFunction(() => window.__sakura?.game?.mode === 'town', { timeout: 120000 });
  await new Promise((r) => setTimeout(r, 1500));

  const shots = [
    { name: '20_shotengai', x: 0, z: -46, yaw: Math.PI, pitch: 0.22, dist: 12, h: 11, label: '商店街拱廊' },
    { name: '21_shrine', x: 0, z: 78, yaw: Math.PI, pitch: 0.3, dist: 10, h: 10, label: '神社参道' },
    { name: '22_station', x: -30, z: -84, yaw: Math.PI, pitch: 0.25, dist: 12, h: 12, label: '樱花站' },
    { name: '23_park', x: -40, z: 24, yaw: Math.PI * 0.75, pitch: 0.3, dist: 10, h: 15, label: '公园花见' },
    { name: '24_bridge', x: 6, z: -118, yaw: Math.PI * 0.5, pitch: 0.2, dist: 10, h: 18, label: '樱花桥与河' },
    { name: '25_dusk', x: 10, z: -30, yaw: Math.PI, pitch: 0.26, dist: 12, h: 18.5, label: '黄昏主街' },
    { name: '26_paddy', x: -100, z: 60, yaw: Math.PI, pitch: 0.3, dist: 11, h: 10, label: '水田' },
    { name: '27_residential', x: -98, z: 20, yaw: Math.PI, pitch: 0.28, dist: 11, h: 10, label: '住宅区小巷' },
  ];
  for (const s of shots) {
    await page.evaluate((s) => {
      const g = window.__sakura.game;
      g.player.pos.x = s.x; g.player.pos.z = s.z;
      g.player.y = 0;
      g.input.camYaw = s.yaw; g.input.camPitch = s.pitch; g.input.camDist = s.dist;
      g.clock.minutes = s.h * 60;
      g.clock.day = 8;
      g.weather.force('clear', 600);
      // 让相机立即就位
      g.updateCamera(1);
    }, s);
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(shotsDir, s.name + '.png') });
    console.log('  ✓', s.name, s.label);
  }
} catch (e) {
  console.error('失败:', e);
} finally {
  await browser.close();
  server.kill();
}
console.log('错误:', errors.length);
for (const e of errors.slice(0, 5)) console.log(' ✗', e);
