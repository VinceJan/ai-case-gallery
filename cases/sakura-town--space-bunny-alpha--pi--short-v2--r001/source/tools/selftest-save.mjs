// 存档模块自测（Node 里跑，不依赖浏览器）
import { __selfTest } from '../src/game/save.js';
const R = __selfTest();
let fail = 0;
for (const r of R) {
  if (!r.pass) fail++;
  console.log(`[${r.pass ? 'OK ' : 'FAIL'}] ${r.name}${r.note ? '  → ' + r.note : ''}`);
}
console.log(`\n${R.length - fail}/${R.length} passed`);
process.exit(fail ? 1 : 0);
