import { spawn } from 'node:child_process';
import fs from 'node:fs';

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    '--user-data-dir=E:\\tmp\\test\\custom\\tmp_edge_2',
    'http://localhost:3000/'
  ]);

  console.log('Edge launched...');
  let targets = null;
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      const listRes = await fetch('http://127.0.0.1:9333/json/list');
      const text = await listRes.text();
      targets = JSON.parse(text);
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }


  if (!targets) {
    console.error('Could not connect to Edge DevTools');
    edgeProc.kill();
    return;
  }

  try {
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand('Runtime.enable');
    await sendCommand('Page.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Wait for scene rendering
    await new Promise(r => setTimeout(r, 2500));

    console.log('Capturing screenshot...');
    const result = await sendCommand('Page.captureScreenshot', { format: 'png' });
    if (result && result.data) {
      fs.writeFileSync('diorama_shot.png', Buffer.from(result.data, 'base64'));
      console.log('Screenshot saved to diorama_shot.png successfully!');
    }

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    edgeProc.kill();
  }
}

capture();
