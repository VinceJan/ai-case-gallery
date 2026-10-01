/**
 * 地形与空间索引
 * - 盆地：四周群山 + 森林带围合，中央是小镇平地
 * - 河谷：从地形里切出 U 型河床
 * - 铁道路基：沿线压平
 * - 统一的高度采样 heightAt(x,z)，地形网格 / 人物 / 植被 / 建筑都读它
 */
import * as THREE from 'three';
import {
  clamp, fbm2, lerp, makePolylineQuery, makeRNG, ridged2, smoothstep, valueNoise2,
} from '../core/utils.js';
import { toonMaterial, noOutlineFlag } from '../core/toon.js';
import {
  CROSSING_PAD, PADDY, RAIL_CTRL, RAIL_Y, RIVER_BLOCK, RIVER_CTRL, RIVER_DEPTH, RIVER_WIDTH,
  ROADS, WATER_Y, insideFootprint, makePolyline2D,
} from './layout.js';

export const WORLD_SIZE = 380;
export const HALF = WORLD_SIZE / 2;

export const river = makePolylineQuery(makePolyline2D(RIVER_CTRL, 3));
export const rail = makePolylineQuery(makePolyline2D(RAIL_CTRL, 2));

/** 铁轨中心线上的弧长 → 世界坐标（带高程） */
export function railPointAt(s) {
  return rail.at(clamp(s, 0, rail.length)).position;
}
export const CROSSING_S = rail.closest(0, 52).s;
export const STATION_S = rail.closest(-43, 50.5).s;

// 道路索引
const roadSegments = [];
for (const road of ROADS) {
  const pts = makePolyline2D(road.pts, 2.5);
  for (let i = 0; i < pts.length - 1; i++) {
    roadSegments.push({
      a: pts[i],
      b: pts[i + 1],
      half: road.width / 2,
      style: road.style,
      id: road.id,
    });
  }
  road._poly = pts;
}

/** 点到最近道路中心线的距离（>=0 表示在路面外） */
export function roadDistance(x, z) {
  let best = Infinity;
  for (let i = 0; i < roadSegments.length; i++) {
    const s = roadSegments[i];
    const minX = Math.min(s.a.x, s.b.x) - s.half;
    const maxX = Math.max(s.a.x, s.b.x) + s.half;
    const minZ = Math.min(s.a.z, s.b.z) - s.half;
    const maxZ = Math.max(s.a.z, s.b.z) + s.half;
    if (x < minX || x > maxX || z < minZ || z > maxZ) continue;
    const dx = s.b.x - s.a.x;
    const dz = s.b.z - s.a.z;
    const lenSq = dx * dx + dz * dz;
    let t = lenSq > 1e-9 ? ((x - s.a.x) * dx + (z - s.a.z) * dz) / lenSq : 0;
    t = clamp(t, 0, 1);
    const cx = s.a.x + dx * t;
    const cz = s.a.z + dz * t;
    const d = Math.hypot(x - cx, z - cz) - s.half;
    if (d < best) best = d;
  }
  return best === Infinity ? 999 : best;
}

export function isOnRoad(x, z, margin = 0) {
  return roadDistance(x, z) < margin;
}

// ---------------------------------------------------------------------------
// 高度场
// ---------------------------------------------------------------------------
const GRID = 196;                 // 采样格数
const GRID_STEP = WORLD_SIZE / (GRID - 1);
const heights = new Float32Array(GRID * GRID);

const SHRINE = { x: -57, z: -51, r: 30, h: 8.4 };
const PARK_KNOLL = { x: 44, z: -52, r: 20, h: 2.4 };
const SOUTH_RISE = { x: -70, z: 62, r: 26, h: 3.0 };

function rawHeight(x, z) {
  let h = 0;

  // 镇内平缓起伏
  h += (fbm2(x * 0.0105, z * 0.0105, { octaves: 3, seed: 11 }) - 0.5) * 2.05;
  h += (fbm2(x * 0.036, z * 0.036, { octaves: 2, seed: 29 }) - 0.5) * 0.55;

  // 神社丘陵 / 公园小丘 / 南侧缓坡
  h += SHRINE.h * Math.exp(-(((x - SHRINE.x) ** 2 + (z - SHRINE.z) ** 2) / (SHRINE.r * SHRINE.r)));
  h += PARK_KNOLL.h * Math.exp(-(((x - PARK_KNOLL.x) ** 2 + (z - PARK_KNOLL.z) ** 2) / (PARK_KNOLL.r * PARK_KNOLL.r)));
  h += SOUTH_RISE.h * Math.exp(-(((x - SOUTH_RISE.x) ** 2 + (z - SOUTH_RISE.z) ** 2) / (SOUTH_RISE.r * SOUTH_RISE.r)));

  // 群山：远处抬升成盆壁，山脊用脊状噪声
  const r = Math.hypot(x, z);
  const rimT = smoothstep(84, HALF - 6, r);
  if (rimT > 0) {
    const ridge = ridged2(x * 0.0165, z * 0.0165, { octaves: 4, seed: 7 });
    const detail = fbm2(x * 0.06, z * 0.06, { octaves: 2, seed: 51 });
    h += rimT * (20 + 46 * ridge + 6 * detail);
  }

  // 河谷：U 型下切
  const d = river.closest(x, z).dist;
  if (d < RIVER_WIDTH * 1.9) {
    const t = clamp(d / RIVER_WIDTH, 0, 1);
    const profile = 1 - smoothstep(0, 1, t);
    h -= RIVER_DEPTH * profile;
  }

  // 铁道路基：沿线压平
  const rd = rail.closest(x, z).dist;
  const rf = 1 - smoothstep(7.5, 17, rd);
  if (rf > 0) h = lerp(h, 0.02, rf);

  // 平交道口：路面抬升到与轨枕齐平
  {
    const dzc = Math.abs(z - 52);
    const dxc = Math.abs(x - 0);
    if (dzc < 20 && dxc < 11) {
      const t = (1 - smoothstep(9, 20, dzc)) * (1 - smoothstep(5.2, 10, dxc));
      h = lerp(h, CROSSING_PAD, t);
    }
  }

  // 稻田：压平成水田田埂
  const px = Math.abs(x - PADDY.x);
  const pz = Math.abs(z - PADDY.z);
  if (px < PADDY.w / 2 + 8 && pz < PADDY.d / 2 + 8) {
    const pf = (1 - smoothstep(PADDY.w / 2, PADDY.w / 2 + 8, px)) * (1 - smoothstep(PADDY.d / 2, PADDY.d / 2 + 8, pz));
    h = lerp(h, 0.32, pf * 0.94);
  }

  return h;
}

(function buildHeightField() {
  for (let j = 0; j < GRID; j++) {
    const z = -HALF + j * GRID_STEP;
    for (let i = 0; i < GRID; i++) {
      const x = -HALF + i * GRID_STEP;
      heights[j * GRID + i] = rawHeight(x, z);
    }
  }
})();

/** 双线性采样高度 */
export function heightAt(x, z) {
  const fx = (x + HALF) / GRID_STEP;
  const fz = (z + HALF) / GRID_STEP;
  const i = clamp(Math.floor(fx), 0, GRID - 2);
  const j = clamp(Math.floor(fz), 0, GRID - 2);
  const tx = clamp(fx - i, 0, 1);
  const tz = clamp(fz - j, 0, 1);
  const h00 = heights[j * GRID + i];
  const h10 = heights[j * GRID + i + 1];
  const h01 = heights[(j + 1) * GRID + i];
  const h11 = heights[(j + 1) * GRID + i + 1];
  return lerp(lerp(h00, h10, tx), lerp(h01, h11, tx), tz);
}

const _n = new THREE.Vector3();
export function normalAt(x, z, out = _n) {
  const e = 1.2;
  const hL = heightAt(x - e, z);
  const hR = heightAt(x + e, z);
  const hD = heightAt(x, z - e);
  const hU = heightAt(x, z + e);
  out.set(hL - hR, 2 * e, hD - hU).normalize();
  return out;
}

export function slopeAt(x, z) {
  const n = normalAt(x, z, new THREE.Vector3());
  return 1 - n.y;
}

// ---------------------------------------------------------------------------
// 地形网格
// ---------------------------------------------------------------------------
const C = {
  grassA: new THREE.Color(0x7fae5c),
  grassB: new THREE.Color(0x6d9e50),
  grassC: new THREE.Color(0x8bb862),
  dryGrass: new THREE.Color(0x9fae5e),
  forestFloor: new THREE.Color(0x4c6b3e),
  rock: new THREE.Color(0x84868f),
  rockDark: new THREE.Color(0x6a6c78),
  snowCap: new THREE.Color(0xe8eef2),
  sand: new THREE.Color(0xc9b48c),
  silt: new THREE.Color(0x6d6350),
  bankGrass: new THREE.Color(0x8fae5a),
  paddy: new THREE.Color(0x7ea15a),
  dirt: new THREE.Color(0xa8895f),
};

const _col = new THREE.Color();
const _col2 = new THREE.Color();

function terrainColor(x, z, h, slope) {
  const patch = fbm2(x * 0.055, z * 0.055, { octaves: 2, seed: 91 });
  const patch2 = valueNoise2(x * 0.14, z * 0.14, 33);

  // 基础草地
  if (patch < 0.42) _col.copy(C.grassB);
  else if (patch > 0.62) _col.copy(C.grassC);
  else _col.copy(C.grassA);
  _col2.copy(C.dryGrass);
  _col.lerp(_col2, smoothstep(0.55, 0.9, patch) * 0.55);
  _col.offsetHSL(0, 0, (patch2 - 0.5) * 0.06);

  // 高处变森林地表
  const forestT = smoothstep(11, 24, h);
  _col.lerp(C.forestFloor, forestT * 0.85);

  // 岩石：坡度大 / 高处
  const rockT = clamp(smoothstep(0.36, 0.66, slope) * 0.8 + smoothstep(40, 58, h) * 0.8, 0, 1);
  _col2.copy(C.rock);
  _col.lerp(_col2, rockT);
  _col2.copy(C.rockDark);
  _col.lerp(_col2, smoothstep(0.55, 0.82, slope) * 0.65);
  // 雪顶
  _col.lerp(C.snowCap, smoothstep(58, 74, h) * 0.9);

  // 河岸沙地
  const rd = river.closest(x, z).dist;
  const bank = 1 - smoothstep(RIVER_WIDTH * 0.82, RIVER_WIDTH * 1.5, rd);
  _col2.copy(C.sand);
  _col.lerp(_col2, bank * 0.85);
  _col.lerp(C.bankGrass, smoothstep(0.3, 0.75, bank) * 0.35);
  // 水下河床
  const sub = 1 - smoothstep(WATER_Y - 0.1, WATER_Y + 1.1, h);
  _col2.copy(C.silt);
  _col.lerp(_col2, sub * 0.92);

  // 稻田
  const px = Math.abs(x - PADDY.x);
  const pz = Math.abs(z - PADDY.z);
  if (px < PADDY.w / 2 + 6 && pz < PADDY.d / 2 + 6) {
    const pf = (1 - smoothstep(PADDY.w / 2, PADDY.w / 2 + 6, px)) * (1 - smoothstep(PADDY.d / 2, PADDY.d / 2 + 6, pz));
    _col.lerp(C.paddy, pf * 0.8);
  }
  return _col;
}

export class Terrain {
  constructor(quality = 1) {
    this.segments = Math.max(96, Math.round(176 * quality));
    this.mesh = null;
  }

  build() {
    const N = this.segments;
    const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, N, N);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const count = pos.count;
    const colors = new Float32Array(count * 3);
    const nrm = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = heightAt(x, z);
      pos.setY(i, h);
      normalAt(x, z, nrm);
      const c = terrainColor(x, z, h, 1 - nrm.y);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = toonMaterial({ color: 0xffffff, vertexColors: true, steps: 4, warm: 0.09 });
    mat.flatShading = true;
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'terrain';
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    noOutlineFlag(mesh);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.mesh = mesh;
    return mesh;
  }
}

// ---------------------------------------------------------------------------
// 河面
// ---------------------------------------------------------------------------
const WATER_VERT = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uFoam;
  uniform vec3 uSky;
  uniform vec3 uSunDir;
  uniform float uNight;
  varying vec3 vWorld;

  float band(float v, float w) {
    return smoothstep(0.5 - w, 0.5 + w, v);
  }

  void main() {
    // 两组方向性波纹叠加，形成动画风格的条带
    float w1 = sin(vWorld.x * 0.42 + vWorld.z * 0.20 + uTime * 1.35);
    float w2 = sin(vWorld.z * 0.55 - vWorld.x * 0.11 - uTime * 0.95);
    float w3 = sin((vWorld.x + vWorld.z) * 1.15 + uTime * 2.1) * 0.35;
    float v = w1 * 0.42 + w2 * 0.42 + w3;
    v = v * 0.5 + 0.5;

    vec3 col = mix(uDeep, uShallow, band(v, 0.42));
    // 高光条带（柔和一些，不要硬白条）
    float hi = smoothstep(0.62, 0.78, v) * (1.0 - smoothstep(0.80, 0.98, v));
    col = mix(col, uFoam, hi * 0.30);
    // 太阳反光
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float spec = pow(max(dot(reflect(-uSunDir, vec3(0.0, 1.0, 0.0)), viewDir), 0.0), 18.0);
    col += vec3(1.0, 0.96, 0.86) * spec * 0.28;
    col = mix(col, uSky, 0.30 + uNight * 0.10);
    gl_FragColor = vec4(col, 0.9);
    #include <colorspace_fragment>
  }
`;

export class Water {
  constructor() {
    const geo = new THREE.PlaneGeometry(WORLD_SIZE * 1.6, WORLD_SIZE * 1.6, 1, 1);
    geo.rotateX(-Math.PI / 2);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uShallow: { value: new THREE.Color(0x7fc4d8) },
        uDeep: { value: new THREE.Color(0x2f7f9e) },
        uFoam: { value: new THREE.Color(0xeaf6fb) },
        uSky: { value: new THREE.Color(0xbfd9ef) },
        uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uNight: { value: 0 },
      },
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      transparent: true,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(geo, this.material);
    this.mesh.position.y = WATER_Y;
    this.mesh.name = 'water';
    this.mesh.renderOrder = 5;
    this.mesh.userData.noOutline = true;
    this.mesh.frustumCulled = false;
  }

  update(dt, sky) {
    this.material.uniforms.uTime.value += dt;
    if (sky) {
      this.material.uniforms.uSky.value.copy(sky.horizonColor);
      this.material.uniforms.uSunDir.value.copy(sky.sunDir);
      this.material.uniforms.uNight.value = sky.nightFactor;
      const shallow = this.material.uniforms.uShallow.value;
      shallow.set(0x86cde0).lerp(new THREE.Color(0x33456b), sky.nightFactor * 0.75);
      this.material.uniforms.uDeep.value.set(0x3f93b0).lerp(new THREE.Color(0x1b2b52), sky.nightFactor * 0.8);
    }
  }
}

// ---------------------------------------------------------------------------
// 地表类型（脚步声 / 移动速度）
// ---------------------------------------------------------------------------
export function surfaceAt(x, z) {
  const h = heightAt(x, z);
  const d = river.closest(x, z).dist;
  if (d < RIVER_WIDTH * 0.8) return 'sand';
  if (roadDistance(x, z) < 0.6) return 'stone';
  const px = Math.abs(x - PADDY.x);
  const pz = Math.abs(z - PADDY.z);
  if (px < PADDY.w / 2 && pz < PADDY.d / 2) return 'dirt';
  if (h > 24) return 'rock';
  return 'grass';
}

/** 判断该点是否可通行（河里 / 铁路上不行） */
export function isWaterBlocked(x, z) {
  return river.closest(x, z).dist < RIVER_BLOCK;
}

export function makeTerrainRandom() {
  return makeRNG(90210);
}
