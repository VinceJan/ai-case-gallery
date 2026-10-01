// Headless (node) build check for the diorama modules — no GPU needed.
// usage: node tools/check.mjs konbini interior props rain
// Stubs the DOM, builds each module, runs the update loop, and prints triangles /
// mesh counts / bounds plus any NaNs, non-toon materials or errors.
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

class Ctx2D {
  constructor(c) { this.canvas = c; this.font = '10px sans-serif'; }
  measureText(t) { const m = /(\d+(?:\.\d+)?)px/.exec(this.font); const s = m ? Number(m[1]) : 10; return { width: [...String(t)].length * s * 0.92 }; }
  createLinearGradient() { return { addColorStop() {} }; }
  createRadialGradient() { return { addColorStop() {} }; }
  createConicGradient() { return { addColorStop() {} }; }
  getImageData(x, y, w, h) { return { data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h }; }
  createImageData(w, h) { return { data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h }; }
  putImageData() {} getTransform() { return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }; }
  isPointInPath() { return false; }
  getLineDash() { return []; }
  roundRect() {}
}
const ctxProxy = (c) => new Proxy(new Ctx2D(c), { get(t, k) { if (k in t) return t[k]; return () => {}; }, set(t, k, v) { t[k] = v; return true; } });
class FakeCanvas {
  constructor() { this.width = 300; this.height = 150; this.style = {}; this._ctx = null; }
  getContext(type) { if (type !== '2d') return null; return this._ctx || (this._ctx = ctxProxy(this)); }
  toDataURL() { return 'data:,'; } addEventListener() {} removeEventListener() {}
}
globalThis.window = globalThis;
globalThis.self = globalThis;
globalThis.document = {
  createElement: (t) => (t === 'canvas' ? new FakeCanvas() : { style: {}, addEventListener() {}, appendChild() {}, setAttribute() {} }),
  createElementNS: () => ({ style: {} }),
  fonts: { load: async () => [] }, body: { appendChild() {}, classList: { add() {} } }, addEventListener() {},
};
globalThis.Image = class { constructor() { this.width = 1; this.height = 1; } addEventListener() {} };
globalThis.HTMLCanvasElement = FakeCanvas; globalThis.OffscreenCanvas = FakeCanvas;
globalThis.requestAnimationFrame = (f) => setTimeout(() => f(Date.now()), 16);
globalThis.addEventListener = () => {};
globalThis.innerWidth = 1280; globalThis.innerHeight = 720; globalThis.devicePixelRatio = 1;
globalThis.matchMedia = () => ({ matches: false, addEventListener() {} });
globalThis.location = { search: '' };

const THREE = await import('three');
const { createContext } = await import(pathToFileURL(path.join(root, 'src/core/ctx.js')).href);
const L = await import(pathToFileURL(path.join(root, 'src/world/layout.js')).href);

const names = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!names.length) { console.log('usage: node tools/check.mjs <module> [...]'); process.exit(1); }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 16 / 9, 0.4, 400);
camera.position.set(12, 14, 22);
const quality = { name: 'high', pixelRatio: 1, msaa: 4, shadowMap: 2048, refl: 0.5 };
const ctx = createContext({ scene, camera, renderer: null, quality });

const triCount = (o) => {
  const g = o.geometry; if (!g || !g.attributes.position) return 0;
  const n = g.index ? g.index.count / 3 : g.attributes.position.count / 3;
  return n * (o.isInstancedMesh ? o.count : 1);
};
const snapshot = () => { const set = new Set(); scene.traverse((o) => set.add(o)); return set; };
const warnings = [];
let failed = false;
const BUDGET = { sky: 60e3, ground: 40e3, konbini: 260e3, interior: 420e3, props: 420e3, rain: 20e3 };

for (const name of names) {
  const before = snapshot();
  const wiresBefore = ctx.wires.count, updBefore = ctx._updates.length;
  const t0 = Date.now();
  let err = null;
  try {
    const mod = await import(pathToFileURL(path.join(root, `src/world/${name}.js`)).href);
    if (typeof mod.build !== 'function') throw new Error('no exported build(ctx)');
    await mod.build(ctx);
  } catch (e) { err = e; failed = true; }
  const ms = Date.now() - t0;
  scene.updateMatrixWorld(true);
  const added = []; scene.traverse((o) => { if (!before.has(o)) added.push(o); });
  let tris = 0, meshes = 0, nan = 0;
  const mats = new Set(), matTypes = {};
  const box = new THREE.Box3(), tb = new THREE.Box3();
  const nonToon = new Set();
  for (const o of added) {
    if (!o.isMesh && !o.isLine && !o.isLineSegments && !o.isPoints) continue;
    meshes++; tris += triCount(o);
    const ms_ = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of ms_) {
      if (!m) continue; mats.add(m); matTypes[m.type] = (matTypes[m.type] || 0) + 1;
      if (['MeshStandardMaterial', 'MeshPhysicalMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial'].includes(m.type)) nonToon.add(m.type);
    }
    if (o.geometry && o.geometry.attributes.position) {
      const a = o.geometry.attributes.position.array;
      for (let i = 0; i < a.length; i += 97) if (!Number.isFinite(a[i])) { nan++; break; }
    }
    if (!Number.isFinite(o.matrixWorld.elements[12]) || !Number.isFinite(o.matrixWorld.elements[13])) nan++;
  }
  // run the update loop hard
  let updErr = null;
  const upd = ctx._updates.slice(updBefore);
  try {
    let t = 0; const dt = 1 / 30;
    for (let i = 0; i < 1200; i++) { ctx.time = t; ctx.shared.uTime.value = t; for (const f of upd) f(dt, t); t += dt; }
    for (const T of [60, 90, 120, 180, 300, 600]) { ctx.time = T; for (const f of upd) f(0, T); }
  } catch (e) { updErr = e; failed = true; }
  scene.updateMatrixWorld(true);
  for (const o of added) {
    if (!o.isMesh || !o.geometry) continue;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    if (o.geometry.boundingBox && !o.geometry.boundingBox.isEmpty()) { tb.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld); box.union(tb); }
  }
  const report = {
    module: name, ok: !err && !updErr, buildMs: ms,
    triangles: Math.round(tris), budget: BUDGET[name] || null, meshes,
    materials: mats.size, materialTypes: matTypes,
    wires: ctx.wires.count - wiresBefore, updateFns: upd.length,
    bounds: box.isEmpty() ? null : { min: box.min.toArray().map((v) => +v.toFixed(1)), max: box.max.toArray().map((v) => +v.toFixed(1)) },
  };
  if (nan) warnings.push(`${name}: ${nan} object(s) with NaN/Infinity positions`);
  if (nonToon.size) warnings.push(`${name}: non-toon lit materials (${[...nonToon].join(', ')}) — use ctx.mat.toon()/emissive()/glass()`);
  if (report.budget && tris > report.budget) warnings.push(`${name}: ${Math.round(tris)} triangles exceeds budget ${report.budget}`);
  console.log(JSON.stringify(report));
  if (err) console.log(`BUILD ERROR in ${name}:\n${err.stack || err}`);
  if (updErr) console.log(`UPDATE ERROR in ${name}:\n${updErr.stack || updErr}`);
}
try { if (ctx.wires.count) ctx.wires.build(); } catch (e) { failed = true; console.log('WIRES ERROR:\n' + (e.stack || e)); }
for (const w of warnings) console.log('WARNING:', w);
console.log(failed ? 'RESULT: FAIL' : 'RESULT: OK');
process.exit(failed ? 1 : 0);
