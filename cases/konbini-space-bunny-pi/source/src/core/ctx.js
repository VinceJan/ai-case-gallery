// Shared build context for the diorama. Everything is static scenery; only the
// rain / lights / doors move, and those register through ctx.onUpdate.
import * as THREE from 'three';
import { createMaterials, LAYER_NO_OUTLINE, PALETTE } from './materials.js';
import * as geo from './geo.js';
import { createNightMaterials } from './night.js';

export function mulberry32(seed) {
  let a = (typeof seed === 'string' ? [...seed].reduce((h, c) => (Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0), 2166136261) : seed) >>> 0;
  const r = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  r.range = (lo, hi) => lo + (hi - lo) * r();
  r.int = (lo, hi) => Math.floor(lo + (hi - lo + 1) * r());
  r.pick = (arr) => arr[Math.floor(r() * arr.length)];
  r.chance = (p) => r() < p;
  r.sign = () => (r() < 0.5 ? -1 : 1);
  return r;
}

export function createContext({ scene, camera, renderer = null, quality }) {
  const staticRoot = new THREE.Group(); staticRoot.name = 'static';
  const dynamicRoot = new THREE.Group(); dynamicRoot.name = 'dynamic';
  scene.add(staticRoot); scene.add(dynamicRoot);
  const updates = [];
  const shared = { uTime: { value: 0 } };
  const mat = createMaterials(shared);
  const night = createNightMaterials(mat, shared);
  Object.assign(mat, night);
  const wires = geo.createWireSystem();
  const reflect = [];   // meshes drawn into the wet-ground planar reflection
  const reflectMats = new Set();

  const ctx = {
    THREE, scene, camera, renderer, quality,
    mat, geo, wires, shared, palette: PALETTE,
    services: {},
    staticRoot, dynamicRoot,
    LAYER_NO_OUTLINE,
    time: 0,
    addStatic(obj) { staticRoot.add(obj); return obj; },
    /** Add animated objects (never merged). */
    add(obj) { obj.traverse((o) => { o.userData.dynamic = true; }); dynamicRoot.add(obj); return obj; },
    onUpdate(fn) { updates.push(fn); },
    noOutline(obj) { obj.traverse((o) => o.layers.set(LAYER_NO_OUTLINE)); return obj; },
    noBatch(obj) { obj.traverse((o) => { o.userData.noBatch = true; }); return obj; },
    /** Include this subtree in the wet-road planar reflection (neon + warm windows).
     *  Layer 2 is the reflection camera's only layer; layer 1 stays "no outline". */
    reflect(obj) {
      obj.traverse((o) => {
        if (o.isMesh && o.material && !Array.isArray(o.material)) reflectMats.add(o.material);
        o.layers.enable(2);
      });
      reflect.push(obj);
      return obj;
    },
    get reflectMats() { return reflectMats; },
    rng: mulberry32,
    kit: (parent) => geo.makeKit(parent),
    _updates: updates,
  };
  return ctx;
}
