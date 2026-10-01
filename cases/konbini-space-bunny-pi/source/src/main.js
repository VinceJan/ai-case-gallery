// Bootstrap: renderer, wet-road planar reflection, module build, orbit camera, main loop.
import * as THREE from 'three';
import * as L from './world/layout.js';
import { createContext } from './core/ctx.js';
import { createRenderPipeline } from './core/renderer.js';
import { Orbit } from './core/orbit.js';

const MODULES = ['sky', 'ground', 'konbini', 'interior', 'props', 'rain'];
const params = new URLSearchParams(location.search);
const SHOT = params.has('shot');
const ONLY = params.get('only') ? params.get('only').split(',').map((s) => s.trim()).filter(Boolean) : null;
const $ = (id) => document.getElementById(id);
const errors = []; window.__errors = errors;
const stats = { modules: {} }; window.__stats = stats;

const QUALITY = {
  high: { name: 'high', pixelRatio: Math.min(devicePixelRatio, 1.5), msaa: 4, shadowMap: 2048, refl: 0.5 },
  medium: { name: 'medium', pixelRatio: Math.min(devicePixelRatio, 1.0), msaa: 4, shadowMap: 1024, refl: 0.42 },
  low: { name: 'low', pixelRatio: Math.min(devicePixelRatio, 0.8), msaa: 0, shadowMap: 1024, refl: 0.34 },
};
const qName = params.get('q') || 'high';
const quality = { ...(QUALITY[qName] || QUALITY.high) };
if (SHOT) quality.pixelRatio = 1;

// ------------------------------------------------------------------ renderer
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false, preserveDrawingBuffer: SHOT });
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = !params.has('noshadow');
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.info.autoReset = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.4, 400);
const sunDir = new THREE.Vector3(...L.SUN_DIR).normalize();
const pipeline = createRenderPipeline(renderer, quality);
const ctx = createContext({ scene, camera, renderer, quality });
window.__ctx = ctx; window.THREE = THREE;
window.__pipe = pipeline; window.__renderer = renderer;

const orbit = new Orbit(camera, canvas, { target: [-2.6, 1.5, -4.2], radius: 25.5, theta: 0.60, phi: 0.99, minR: 8, maxR: 52 });
window.__setCam = (R, theta, phi) => orbit.setPose(R, theta, phi);
window.__orbit = orbit;

// ------------------------------------------------------------------ wet-road reflection
const rtRefl = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true });
const reflCam = new THREE.PerspectiveCamera();
reflCam.matrixWorldAutoUpdate = false;
reflCam.layers.set(2);
const MIRROR = new THREE.Matrix4().set(1, 0, 0, 0, 0, -1, 0, 0.004, 0, 0, 1, 0, 0, 0, 0, 1);
const reflClear = new THREE.Color(L.NIGHT.fog);

function resize() {
  const w = SHOT ? Number(params.get('w') || 1280) : innerWidth;
  const h = SHOT ? Number(params.get('h') || 720) : innerHeight;
  renderer.setSize(w, h, !SHOT);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  pipeline.setSize(w, h, quality.pixelRatio);
  ctx.wires.setResolution(pipeline.size.x, pipeline.size.y);
  const rs = Math.max(0.15, quality.refl);
  rtRefl.setSize(Math.max(160, Math.floor(pipeline.size.x * rs)), Math.max(120, Math.floor(pipeline.size.y * rs)));
  if (ctx.groundMat) ctx.groundMat.uniforms.tRefl.value = rtRefl.texture;
}
addEventListener('resize', resize);
resize();

function renderReflection() {
  if (!ctx.groundMat || params.has('norefl')) return;
  reflCam.projectionMatrix.copy(camera.projectionMatrix);
  reflCam.projectionMatrixInverse.copy(camera.projectionMatrixInverse);
  reflCam.matrixWorld.multiplyMatrices(MIRROR, camera.matrixWorld);
  reflCam.matrixWorldInverse.copy(reflCam.matrixWorld).invert();
  reflCam.layers.set(2);
  const bg = scene.background, fog = scene.fog;
  scene.background = null; scene.fog = fog;
  // the mirror flips winding, so draw both faces for this pass only
  renderer.state.setCullFace(THREE.CullFaceNone);
  renderer.setRenderTarget(rtRefl);
  renderer.setClearColor(reflClear, 1);
  renderer.clear();
  renderer.render(scene, reflCam);
  scene.background = bg;
  ctx.groundMat.uniforms.uReflMat.value.multiplyMatrices(reflCam.projectionMatrix, reflCam.matrixWorldInverse);
}

// ------------------------------------------------------------------ build
async function loadFonts() {
  if (!document.fonts || !document.fonts.load) return;
  const jp = 'きらりストア自動ドアおにぎり北通り駅前雨水駐輪禁止パン';
  await Promise.race([
    Promise.all(['700 32px "Noto Sans JP"', '900 32px "Noto Sans JP"', '700 32px "Zen Maru Gothic"', '900 32px "Zen Maru Gothic"'].map((f) => document.fonts.load(f, jp).catch(() => null))),
    new Promise((r) => setTimeout(r, 5000)),
  ]);
}

async function build() {
  await loadFonts();
  const list = ONLY ? MODULES.filter((m) => ONLY.includes(m)).concat(ONLY.filter((m) => !MODULES.includes(m))) : MODULES;
  for (const name of list) {
    const t0 = performance.now();
    try {
      const mod = await import(`./world/${name}.js`);
      if (typeof mod.build !== 'function') throw new Error('module has no build(ctx) export');
      await mod.build(ctx);
      stats.modules[name] = Math.round(performance.now() - t0);
    } catch (e) {
      console.error(`[module ${name}]`, e);
      errors.push({ module: name, message: String((e && e.stack) || e) });
    }
  }
  const wm = ctx.wires.build();
  if (wm) { scene.add(wm); ctx.wires.setResolution(pipeline.size.x, pipeline.size.y); }
  ctx.add = null;   // everything is built now
  try { renderer.compile(scene, camera); } catch (e) { console.warn(e); }
  if (ctx.groundMat) ctx.groundMat.uniforms.tRefl.value = rtRefl.texture;
  window.__rtRefl = rtRefl;
}

// ------------------------------------------------------------------ loop
let simT = params.has('t') ? Number(params.get('t')) : 0;
function stepUpdates(dt, t) {
  ctx.time = t; ctx.shared.uTime.value = t;
  for (const fn of ctx._updates) {
    try { fn(dt, t); } catch (e) {
      if (!fn.__err) { fn.__err = 1; console.error('update error', e); errors.push({ module: 'update', message: String((e && e.stack) || e) }); }
    }
  }
}
window.__sim = (target) => { let t = 0; const dt = 1 / 30; while (t < target) { stepUpdates(dt, t); t += dt; } simT = target; stepUpdates(0, simT); };

let last = performance.now(), fpsAcc = 0, fpsN = 0, fps = 0;
function frame(now) {
  requestAnimationFrame(frame);
  let dt = Math.min(0.08, (now - last) / 1000); last = now;
  if (SHOT) dt = 1 / 30;
  simT += dt;
  orbit.update(dt);
  camera.updateMatrixWorld();
  stepUpdates(dt, simT);
  renderer.info.reset();
  renderReflection();
  pipeline.compMat.uniforms.uExposure.value = L.EXPOSURE;
  pipeline.render(scene, camera, sunDir, simT, new THREE.Color(L.NIGHT.sky));  fpsAcc += dt; fpsN++;
  if (fpsAcc > 0.5) { fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; }
  stats.fps = fps; stats.calls = renderer.info.render.calls; stats.triangles = renderer.info.render.triangles;
}

window.__bench = (n = 30) => {
  const gl = renderer.getContext(); const px = new Uint8Array(4);
  pipeline.render(scene, camera, sunDir, simT); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const t0 = performance.now();
  for (let i = 0; i < n; i++) { renderer.info.reset(); renderReflection(); pipeline.render(scene, camera, sunDir, simT); }
  gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const ms = (performance.now() - t0) / n;
  return { ms: +ms.toFixed(2), calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures };
};
window.__diag = () => {
  let meshes = 0, inst = 0, mats = new Set(), layers = {};
  scene.traverse((o) => {
    if (o.isMesh || o.isLine || o.isLineSegments || o.isPoints) {
      meshes++; if (o.isInstancedMesh) inst++;
      const m = Array.isArray(o.material) ? o.material[0] : o.material;
      if (m) mats.add(m.type);
      for (let i = 0; i < 4; i++) if (o.layers.test(new THREE.Layers().set(i))) layers['L' + i] = (layers['L' + i] || 0) + 1;
    }
  });
  return { meshes, inst, materials: [...mats], layers, draws: renderer.info.render.calls, tris: renderer.info.render.triangles };
};

async function main() {
  await build();
  if (params.has('cam')) {
    const v = params.get('cam').split(',').map(Number);
    if (v.length === 3) orbit.setPose(v[0], v[1], v[2]);
  }
  if (simT > 0) window.__sim(simT); else stepUpdates(0, 0);
  orbit.update(0);
  camera.updateMatrixWorld();
  requestAnimationFrame(frame);
  document.body.classList.add('ready');
  if (SHOT) {
    document.body.classList.add('shot');
    const veil = $('veil'); if (veil) veil.style.display = 'none';
    let n = 0;
    const wait = () => { if (++n > 8) window.__ready = true; else requestAnimationFrame(wait); };
    requestAnimationFrame(wait);
  }
}
main();
