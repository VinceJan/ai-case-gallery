// One-off page probe: loads the app headless and dumps state that is hard to see in a screenshot.
// usage: node tools/probe.mjs "<js expression evaluated in the page>"
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expr = process.argv[2] || '1';
const extra = process.argv[3] || '';
const W = 900, H = 520;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  fs.readFile(f, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data); });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const EDGE = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
const browser = await puppeteer.launch({
  executablePath: EDGE, headless: true,
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-webgl', '--disable-gpu-sandbox', '--no-first-run', `--window-size=${W},${H}`],
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 }, protocolTimeout: 300000,
});
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log('[console]', m.text()); });
  await page.goto(`http://127.0.0.1:${port}/index.html?shot=1&w=${W}&h=${H}&t=12${extra}`, { waitUntil: 'load', timeout: 120000 });
  await page.waitForFunction('window.__ready === true', { timeout: 200000, polling: 250 });
  const out = await page.evaluate(expr);
  console.log(typeof out === 'string' ? out : JSON.stringify(out, null, 1));
  if (process.env.SHOT) { fs.mkdirSync(path.join(root, 'shots'), { recursive: true }); await page.screenshot({ path: path.join(root, 'shots', process.env.SHOT) }); console.log('saved shots/' + process.env.SHOT); }
} catch (e) { console.log('PROBE FAILED:', e.message); }
finally { await browser.close(); server.close(); }
