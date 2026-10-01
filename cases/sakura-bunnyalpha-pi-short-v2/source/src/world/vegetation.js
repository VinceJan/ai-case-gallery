/**
 * 植被：樱树、阔叶树、黑松、灌木、草丛。
 * 树与草丛用 InstancedMesh 散播，并带顶点风摆。
 */
import * as THREE from 'three';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry, cylinderGeometry, sphereGeometry } from '../core/toon.js';
import { clamp, fbm2, makeRNG } from '../core/utils.js';
import { heightAt, isOnRoad, rail, river, roadDistance } from './terrain.js';
import { CLEAR_POINTS, PADDY, insideFootprint } from './layout.js';

// 全局风摆时间
export const swayTime = { value: 0 };

function foliageMaterial(base, amount) {
  base.onBeforeCompile = (shader) => {
    shader.uniforms.uSwayTime = swayTime;
    shader.uniforms.uSwayAmount = { value: amount };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uSwayTime;\nuniform float uSwayAmount;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 swayBase = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        #else
          vec3 swayBase = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]);
        #endif
        float swayH = max(transformed.y, 0.0);
        float phase = swayBase.x * 0.63 + swayBase.z * 0.81;
        float amp = uSwayAmount * swayH * swayH * 0.016;
        transformed.x += sin(uSwayTime * 1.25 + phase) * amp;
        transformed.z += cos(uSwayTime * 0.95 + phase * 1.37) * amp * 0.8;
        `,
      );
  };
  base.customProgramCacheKey = () => `sway_${amount}`;
  return base;
}

// ---------------------------------------------------------------------------
// 树的几何
// ---------------------------------------------------------------------------
function trunkAndBranches(b, m, rng, height, lean) {
  const th = height;
  b.add(cylinderGeometry(0.13, 0.26, th * 0.52, 7), m.bark, {
    x: lean * 0.3, y: th * 0.26, z: 0, rz: lean * 0.06, rx: lean * 0.04,
  });
  const n = 3;
  for (let i = 0; i < n; i++) {
    const a = rng() * Math.PI * 2;
    const len = th * rng.range(0.2, 0.32);
    b.add(cylinderGeometry(0.05, 0.1, len, 5), m.bark, {
      x: Math.cos(a) * len * 0.32, y: th * 0.5, z: Math.sin(a) * len * 0.32,
      rz: -Math.cos(a) * 0.75, rx: Math.sin(a) * 0.75,
    });
  }
  // 根部土球
  b.add(new THREE.ConeGeometry(0.42, 0.3, 7), m.bark, { x: 0, y: 0.1, z: 0 });
}

function sakuraGeos(m, rng) {
  const b = new GeoBuilder('sakura');
  const th = 4.6;
  trunkAndBranches(b, m, rng, th, rng.range(-0.2, 0.2));
  const puffs = 6;
  for (let i = 0; i < puffs; i++) {
    const a = (i / puffs) * Math.PI * 2 + rng.range(-0.3, 0.3);
    const rad = i === 0 ? 0 : rng.range(0.8, 1.5);
    const s = rng.range(0.95, 1.55);
    b.add(new THREE.IcosahedronGeometry(s, 0), i % 3 === 0 ? m.sakuraDeep : m.sakura, {
      x: Math.cos(a) * rad, y: th * 0.72 + rng.range(-0.4, 0.7), z: Math.sin(a) * rad,
      sy: rng.range(0.62, 0.82), ry: rng() * 3,
    });
  }
  return b;
}

function broadGeos(m, rng) {
  const b = new GeoBuilder('broad');
  const th = 4.2;
  trunkAndBranches(b, m, rng, th, rng.range(-0.15, 0.15));
  const puffs = 5;
  for (let i = 0; i < puffs; i++) {
    const a = (i / puffs) * Math.PI * 2 + rng.range(-0.4, 0.4);
    const rad = i === 0 ? 0 : rng.range(0.7, 1.3);
    b.add(new THREE.IcosahedronGeometry(rng.range(1.0, 1.5), 0), i % 2 ? m.leafBroad : m.accentFor(0x6f9a52), {
      x: Math.cos(a) * rad, y: th * 0.75 + rng.range(-0.4, 0.6), z: Math.sin(a) * rad, sy: rng.range(0.68, 0.85),
    });
  }
  return b;
}

function pineGeos(m, rng) {
  const b = new GeoBuilder('pine');
  const th = 6.4;
  const lean = rng.range(0.1, 0.4) * rng.sign();
  b.add(cylinderGeometry(0.12, 0.3, th, 7), m.bark, { x: lean * 0.5, y: th / 2, z: 0, rz: -lean * 0.09 });
  const layers = 4;
  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1);
    const y = th * (0.42 + t * 0.5);
    const r = 2.0 * (1 - t * 0.78);
    b.add(new THREE.ConeGeometry(r, 1.5 - t * 0.5, 7), i % 2 ? m.leafPine : m.accentFor(0x3a6b4a), {
      x: lean * 0.5 + rng.range(-0.15, 0.15), y, z: rng.range(-0.15, 0.15), ry: rng() * 3,
    });
  }
  return b;
}

function shrubGeos(m, rng) {
  const b = new GeoBuilder('shrub');
  for (let i = 0; i < 3; i++) {
    b.add(new THREE.IcosahedronGeometry(rng.range(0.4, 0.7), 0), i % 2 ? m.bush : m.accentFor(0x4f7a3f), {
      x: rng.range(-0.4, 0.4), y: rng.range(0.3, 0.5), z: rng.range(-0.4, 0.4), sy: 0.8,
    });
  }
  return b;
}

function grassGeos(m, rng) {
  const b = new GeoBuilder('grass');
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const h = rng.range(0.28, 0.5);
    b.add(new THREE.ConeGeometry(0.06, h, 3), m.grassTuft, {
      x: Math.cos(a) * 0.1, y: h / 2, z: Math.sin(a) * 0.1,
      rz: Math.cos(a) * 0.35, rx: Math.sin(a) * 0.35,
    });
  }
  return b;
}

// ---------------------------------------------------------------------------
// 散布工具
// ---------------------------------------------------------------------------
function canPlace(x, z, { marginRoad = 2.2, marginBuilding = 2.4, maxHeight = 100, minHeight = -99, avoidNodes = true, marginRail = 5.5 } = {}) {
  if (river.closest(x, z).dist < 11) return false;
  if (rail.closest(x, z).dist < marginRail) return false;
  if (roadDistance(x, z) < marginRoad) return false;
  if (insideFootprint(x, z, marginBuilding)) return false;
  const px = Math.abs(x - PADDY.x);
  const pz = Math.abs(z - PADDY.z);
  if (px < PADDY.w / 2 + 2 && pz < PADDY.d / 2 + 2) return false;
  const h = heightAt(x, z);
  if (h > maxHeight || h < minHeight) return false;
  if (avoidNodes) {
    for (const p of CLEAR_POINTS) {
      const dx = x - p.x;
      const dz = z - p.z;
      if (dx * dx + dz * dz < 16) return false;
    }
  }
  return true;
}

export class Vegetation {
  constructor(m) {
    this.m = m;
    this.group = new THREE.Group();
    this.group.name = 'vegetation';
    this.dummy = new THREE.Object3D();
    // 摇曳材质
    this.matSakura = foliageMaterial(m.sakura, 1.0);
    this.matSakuraDeep = foliageMaterial(m.sakuraDeep, 1.0);
    this.matBroad = foliageMaterial(m.leafBroad, 0.85);
    this.matBroad2 = foliageMaterial(m.accentFor(0x6f9a52), 0.85);
    this.matPine = foliageMaterial(m.leafPine, 0.45);
    this.matPine2 = foliageMaterial(m.accentFor(0x3a6b4a), 0.45);
    this.matBush = foliageMaterial(m.bush, 0.5);
    this.matGrass = foliageMaterial(m.grassTuft, 2.4);
  }

  /** 生成一个独立（带描边）的树，用于地标 */
  buildSakuraTree(scale = 1, seed = 3) {
    const rng = makeRNG(seed * 7717 + 13);
    const b = sakuraGeos(this.m, rng);
    const g = b.build({ thickness: 0.05, color: 0x4a3540 });
    g.scale.setScalar(scale);
    g.traverse((o) => {
      if (o.isMesh && o.material) {
        if (o.material === this.m.sakura) o.material = this.matSakura;
        else if (o.material === this.m.sakuraDeep) o.material = this.matSakuraDeep;
      }
    });
    return g;
  }

  buildBroadTree(scale = 1, seed = 3) {
    const rng = makeRNG(seed * 3313 + 7);
    const b = broadGeos(this.m, rng);
    const g = b.build({ thickness: 0.05, color: 0x3a4030 });
    g.scale.setScalar(scale);
    g.traverse((o) => {
      if (o.isMesh && o.material) {
        if (o.material === this.m.leafBroad) o.material = this.matBroad;
        else if (o.material === this.m.accentFor(0x6f9a52)) o.material = this.matBroad2;
      }
    });
    return g;
  }

  /**
   * 在一个圆盘区域里散布某种树
   * @param {object} spec {x, z, r, n}
   * @param {'sakura'|'broad'|'pine'|'shrub'} type
   */
  scatter(spec, type, seedBase = 1) {
    const rng = makeRNG(seedBase * 977 + spec.n * 31);
    const geos = type === 'sakura' ? sakuraGeos(this.m, rng) : type === 'pine' ? pineGeos(this.m, rng) : shrubGeos(this.m, rng);
    const parts = geos.dump();
    const placements = [];
    const minDist = type === 'shrub' ? 1.6 : type === 'sakura' ? 4.2 : 3.6;
    const maxH = type === 'pine' ? 999 : type === 'sakura' ? 14 : 30;
    let tries = 0;
    while (placements.length < spec.n && tries < spec.n * 26) {
      tries++;
      const a = rng() * Math.PI * 2;
      const rr = Math.sqrt(rng()) * spec.r;
      const x = spec.x + Math.cos(a) * rr;
      const z = spec.z + Math.sin(a) * rr;
      if (!canPlace(x, z, { maxHeight: maxH, marginBuilding: type === 'shrub' ? 1.4 : 2.8 })) continue;
      let ok = true;
      for (const p of placements) {
        const dx = x - p.x;
        const dz = z - p.z;
        if (dx * dx + dz * dz < minDist * minDist) { ok = false; break; }
      }
      if (!ok) continue;
      placements.push({ x, z });
    }

    const meshes = [];
    for (const { mat, geometry, noOutline } of parts) {
      const inst = new THREE.InstancedMesh(geometry, this._matFor(type, mat), placements.length);
      inst.castShadow = !noOutline;
      inst.receiveShadow = !noOutline;
      inst.userData.noOutline = noOutline;
      inst.name = `scatter_${type}`;
      this.dummy.rotation.set(0, rng() * Math.PI * 2, 0);
      const s = type === 'sakura' ? rng.range(0.75, 1.3) : type === 'pine' ? rng.range(0.8, 1.35) : rng.range(0.7, 1.2);
      this.dummy.scale.setScalar(s);
      for (let i = 0; i < placements.length; i++) {
        const p = placements[i];
        this.dummy.position.set(p.x, heightAt(p.x, p.z) - 0.1, p.z);
        this.dummy.updateMatrix();
        inst.setMatrixAt(i, this.dummy.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      inst.frustumCulled = true;
      inst.computeBoundingSphere?.();
      this.group.add(inst);
      meshes.push(inst);
    }
    return meshes;
  }

  _matFor(type, mat) {
    const table = {
      sakura: { [this.m.sakura.uuid]: this.matSakura, [this.m.sakuraDeep.uuid]: this.matSakuraDeep, [this.m.bark.uuid]: this.m.bark },
      pine: { [this.m.leafPine.uuid]: this.matPine, [this.m.accentFor(0x3a6b4a).uuid]: this.matPine2, [this.m.bark.uuid]: this.m.bark },
      shrub: { [this.m.bush.uuid]: this.matBush, [this.m.accentFor(0x4f7a3f).uuid]: this.matBush, [this.m.bark.uuid]: this.m.bark },
      broad: { [this.m.leafBroad.uuid]: this.matBroad, [this.m.accentFor(0x6f9a52).uuid]: this.matBroad2, [this.m.bark.uuid]: this.m.bark },
    };
    return table[type]?.[mat.uuid] || mat;
  }

  /** 山地针叶林：沿山脚到山腰铺一圈 */
  mountainForest(seedBase = 5) {
    const rng = makeRNG(seedBase * 1913);
    const buckets = { pine: [], broad: [] };
    for (let i = 0; i < 2600; i++) {
      const a = rng() * Math.PI * 2;
      const rr = 78 + Math.pow(rng(), 0.55) * 88;
      const x = Math.cos(a) * rr;
      const z = Math.sin(a) * rr;
      if (river.closest(x, z).dist < 13) continue;
      if (rail.closest(x, z).dist < 7) continue;
      if (isOnRoad(x, z, 3.5)) continue;
      if (insideFootprint(x, z, 3)) continue;
      const h = heightAt(x, z);
      if (h < 3.5) continue;
      const density = fbm2(x * 0.03, z * 0.03, { octaves: 2, seed: 17 });
      if (density < 0.36) continue;
      (h > 20 || density > 0.62 ? buckets.pine : buckets.broad).push({ x, z });
    }
    this._instanceInto('pine', buckets.pine, rng, 3.4, 0.85, 1.4);
    this._instanceInto('broad', buckets.broad, rng, 3.0, 0.7, 1.2);
  }

  _instanceInto(type, list, rng, minDist, sMin, sMax) {
    if (list.length === 0) return;
    const kept = [];
    for (const p of list) {
      let ok = true;
      for (const q of kept) {
        const dx = p.x - q.x;
        const dz = p.z - q.z;
        if (dx * dx + dz * dz < minDist * minDist) { ok = false; break; }
      }
      if (ok) kept.push(p);
    }
    const geoFn = type === 'pine' ? pineGeos : broadGeos;
    const parts = geoFn(this.m, rng).dump();
    for (const { mat, geometry, noOutline } of parts) {
      const inst = new THREE.InstancedMesh(geometry, this._matFor(type, mat), kept.length);
      inst.castShadow = !noOutline;
      inst.receiveShadow = !noOutline;
      inst.userData.noOutline = noOutline;
      inst.name = `forest_${type}`;
      for (let i = 0; i < kept.length; i++) {
        const p = kept[i];
        this.dummy.position.set(p.x, heightAt(p.x, p.z) - 0.12, p.z);
        this.dummy.rotation.set(0, rng() * Math.PI * 2, 0);
        this.dummy.scale.setScalar(rng.range(sMin, sMax));
        this.dummy.updateMatrix();
        inst.setMatrixAt(i, this.dummy.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      inst.computeBoundingSphere?.();
      this.group.add(inst);
    }
  }

  /** 草丛：全镇随机散布 */
  grassField(count = 2600) {
    const rng = makeRNG(0xa11ce);
    const parts = grassGeos(this.m, rng).dump();
    const spots = [];
    let tries = 0;
    while (spots.length < count && tries < count * 8) {
      tries++;
      const a = rng() * Math.PI * 2;
      const rr = Math.sqrt(rng()) * 96;
      const x = Math.cos(a) * rr;
      const z = Math.sin(a) * rr;
      if (!canPlace(x, z, { marginRoad: 0.6, marginBuilding: 1.0, maxHeight: 26, avoidNodes: false })) continue;
      spots.push({ x, z });
    }
    for (const { mat, geometry, noOutline } of parts) {
      const inst = new THREE.InstancedMesh(geometry, this.matGrass, spots.length);
      inst.castShadow = false;
      inst.receiveShadow = false;
      inst.userData.noOutline = true;
      inst.name = 'grass';
      for (let i = 0; i < spots.length; i++) {
        const p = spots[i];
        this.dummy.position.set(p.x, heightAt(p.x, p.z) - 0.04, p.z);
        this.dummy.rotation.set(0, rng() * Math.PI * 2, 0);
        this.dummy.scale.setScalar(rng.range(0.7, 1.5));
        this.dummy.updateMatrix();
        inst.setMatrixAt(i, this.dummy.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      inst.computeBoundingSphere?.();
      this.group.add(inst);
    }
  }

  /** 樱花飘落粒子的静态几何（花瓣由 game 层驱动） */
  update(dt) {
    swayTime.value += dt;
  }
}
