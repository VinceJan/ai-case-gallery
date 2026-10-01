// test-comprehensive.mjs
// Thorough functional test of movement, interactions, shopping, camera, and screenshots.
import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9223;

console.log("Launching headless Edge for comprehensive test on port " + port);
const edgeProc = spawn(edgePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--window-size=1280,720`,
  `--remote-debugging-port=${port}`,
  'http://localhost:4173/'
]);

async function runFullTest() {
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

  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map((a) => a.value || JSON.stringify(a)).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(msg.params.exceptionDetails.text);
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

  console.log("1. Entering game...");
  await new Promise((r) => setTimeout(r, 1500));
  await send('Runtime.evaluate', { expression: `document.getElementById('start-btn')?.click()` });
  await new Promise((r) => setTimeout(r, 2000));

  console.log("2. Simulating Player Movement (Walking towards Station & Mart)...");
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyW', key: 'w' });
  await new Promise((r) => setTimeout(r, 1200));
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyW', key: 'w' });

  console.log("3. Testing Context Interaction & Dialogue...");
  // Press 'E' to trigger interaction
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyE', key: 'e' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyE', key: 'e' });
  await new Promise((r) => setTimeout(r, 1000));

  // Check if dialogue or interaction opened
  const interactionCheck = await send('Runtime.evaluate', {
    expression: `
      const diag = document.querySelector('.dialogue-modal');
      const badge = document.querySelector('.interaction-badge');
      ({
        isDialogueOpen: diag?.style.display === 'flex',
        npcName: document.getElementById('diag-npc-name')?.innerText,
        badgeLabel: document.getElementById('badge-label')?.innerText
      })
    `,
    returnByValue: true
  });
  console.log("Interaction Check:", interactionCheck?.result?.value);

  // Close dialogue if open
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'Escape', key: 'Escape' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'Escape', key: 'Escape' });

  console.log("4. Testing Shopping System (Sakura Mart)...");
  await send('Runtime.evaluate', {
    expression: `
      const bagBtn = Array.from(document.querySelectorAll('.hud-btn')).find(b => b.innerText.includes('持ち物'));
      bagBtn?.click();
    `
  });
  await new Promise((r) => setTimeout(r, 800));

  const bagCheck = await send('Runtime.evaluate', {
    expression: `
      const bag = document.querySelector('.center-modal');
      ({
        isBagOpen: bag?.style.display === 'flex',
        itemsCount: document.getElementById('bag-items-list')?.children?.length
      })
    `,
    returnByValue: true
  });
  console.log("Backpack Check:", bagCheck?.result?.value);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'Escape', key: 'Escape' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'Escape', key: 'Escape' });

  console.log("5. Testing Sakura Snap Photography Viewfinder...");
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyP', key: 'p' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyP', key: 'p' });
  await new Promise((r) => setTimeout(r, 800));

  // Snap photo
  await send('Runtime.evaluate', {
    expression: `document.getElementById('cam-shutter-btn')?.click()`
  });
  await new Promise((r) => setTimeout(r, 1000));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyP', key: 'p' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyP', key: 'p' });

  console.log("6. Testing Weather Cycle...");
  await send('Runtime.evaluate', {
    expression: `
      const wBtn = Array.from(document.querySelectorAll('.hud-btn')).find(b => b.innerText.includes('天気'));
      wBtn?.click(); // to Sunny
      wBtn?.click(); // to Sunset
      wBtn?.click(); // to Rainy
    `
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log("7. Capturing Full Gameplay Verification Screenshot...");
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  if (screenshot?.data) {
    fs.writeFileSync('verification_screenshot.png', Buffer.from(screenshot.data, 'base64'));
    console.log("Saved verification_screenshot.png (Size: " + Math.round(screenshot.data.length * 0.75 / 1024) + " KB)");
  }

  console.log("Comprehensive test completed! Console errors count:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error("Console errors:\n" + consoleErrors.join('\n'));
  }

  ws.close();
  edgeProc.kill();
  process.exit(consoleErrors.length > 0 ? 1 : 0);
}

runFullTest().catch((err) => {
  console.error("Test failed:", err);
  edgeProc.kill();
  process.exit(1);
});
