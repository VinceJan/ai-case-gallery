import { PNG } from 'pngjs';
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
for (const file of files) {
  const png = PNG.sync.read(readFileSync(file));
  const points = [
    [640, 600, 'bottom-center'],
    [640, 540, 'lower-center'],
    [640, 480, 'center-lower'],
    [200, 650, 'bottom-left'],
    [1100, 650, 'bottom-right'],
    [640, 200, 'top-center'],
    [640, 400, 'center'],
  ];
  console.log(`--- ${file} (${png.width}x${png.height})`);
  for (const [x, y, label] of points) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    console.log(`  ${label} (${x},${y}): #${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`);
  }
}
