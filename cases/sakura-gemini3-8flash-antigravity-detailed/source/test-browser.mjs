// test-browser.mjs
// Automates headless Edge testing using Chrome DevTools Protocol (CDP) via native WebSocket.
import { spawn } from 'child_process';

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9222;

console.log("Launching headless Edge with remote debugging on port " + port);
const edgeProc = spawn(edgePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  'http://localhost:4173/'
]);

edgeProc.stderr.on('data', (d) => {
  // console.log('[Edge Stderr]:', d.toString());
});

async function runTest() {
  // Wait for Edge to open CDP port
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      if (res.ok) {
        targets = await res.json();
        break;
      }
    } catch {}
  }

  if (!targets || targets.length === 0) {
    console.error("Could not connect to Edge DevTools");
    edgeProc.kill();
    process.exit(1);
  }

  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  console.log("Connected to page target:", pageTarget.title, pageTarget.url);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();
  const consoleLogs = [];
  const pageErrors = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map((a) => a.value || JSON.stringify(a)).join(' ');
      consoleLogs.push(`[${msg.params.type}] ${text}`);
      if (msg.params.type === 'error') {
        pageErrors.push(text);
      }
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      const err = msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || '');
      pageErrors.push(err);
      console.error("[Browser Exception]:", err);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await new Promise((r) => (ws.onopen = r));
  await send('Runtime.enable');
  await send('Page.enable');

  console.log("Waiting for game to load and start button to be clickable...");
  await new Promise((r) => setTimeout(r, 2000));

  // Click start button to trigger audio init and start simulation
  const clickRes = await send('Runtime.evaluate', {
    expression: `
      const btn = document.getElementById('start-btn');
      if (btn) { btn.click(); 'Clicked Start Button'; } else { 'Start button not found'; }
    `
  });
  console.log("Start button evaluation:", clickRes?.result?.value);

  // Wait 3 seconds for several simulation frames to render
  await new Promise((r) => setTimeout(r, 3000));

  // Check WebGL canvas status
  const canvasCheck = await send('Runtime.evaluate', {
    expression: `
      const canvas = document.querySelector('canvas');
      const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
      ({
        canvasWidth: canvas?.width,
        canvasHeight: canvas?.height,
        hasGL: !!gl,
        title: document.title,
        topHudText: document.querySelector('.top-hud')?.innerText?.replace(/\\n/g, ' | ')
      })
    `,
    returnByValue: true
  });
  console.log("Game Canvas & HUD status:", JSON.stringify(canvasCheck?.result?.value, null, 2));

  console.log("Captured console logs count:", consoleLogs.length);
  if (consoleLogs.length > 0) {
    console.log("Console logs:\n" + consoleLogs.join('\n'));
  }

  if (pageErrors.length > 0) {
    console.error("Page errors detected:\n" + pageErrors.join('\n'));
  } else {
    console.log("SUCCESS: 0 browser errors detected during runtime!");
  }

  ws.close();
  edgeProc.kill();
  process.exit(pageErrors.length > 0 ? 1 : 0);
}

runTest().catch((err) => {
  console.error("Test execution failed:", err);
  edgeProc.kill();
  process.exit(1);
});
