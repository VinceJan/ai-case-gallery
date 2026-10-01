// ================================================================
//  地形：解析高度网格 + 溪流侵蚀 + 道路/地基切填
//  玩家、NPC、模型摆放、网格全部共用同一份高度数据
// ================================================================
import * as THREE from 'three';
import { fbm, ridged, noise2 } from '../util/noise.js';
import { smoothstep, lerp, clamp, clamp01, closestOnSegment, makeRNG } from '../util/math.js';
import { PAL, hex, mixHex } from '../render/palette.js';
import { gradientMap } from '../render/toon.js';
import { ROADS, STREAM, TRACK, BUILDINGS, PADS, WORLD, STATION } from './layout.js';

const N = WORLD.seg + 1;              // 每边顶点数
const SIZE = WORLD.size;
const CELL = SIZE / WORLD.seg;
const HALF = SIZE / 2;

const gridToWorld = (i) => -HALF + i * CELL;
const worldToGrid = (v) => (v + HALF) / CELL;

let H = null;        // 最终高度（地形网格 = 玩家采样）
let Hbase = null;    // 基础自然地形
let roadMask = null; // 0..1 道路/铺装影响
let streamDist = null;

export const WATER_Y = -1.25;

/* ------------------------------------------------------------------ *
 *  自然地形
 * ------------------------------------------------------------------ */
function mound(x, z, cx, cz, r, h) {
  const d2 = (x - cx) * (x - cx) + (z - cz) * (z - cz);
  return h * Math.exp(-d2 / (2 * r * r * 0.36));
}

export function naturalHeight(x, z) {
  const r = Math.hypot(x, z);
  let h = fbm(x * 0.0105, z * 0.0105, 3) * 1.85 + fbm(x * 0.031 + 31, z * 0.031 - 17, 2) * 0.4;

  h += mound(x, z, 24, -50, 30, 5.8);       // 神社丘陵
  h += mound(x, z, -80, -30, 30, 11.0);     // 西侧山体
  h += mound(x, z, -32, 76, 26, 1.5);       // 公园缓丘
  h += mound(x, z, -80, 80, 28, 2.4);       // 学校台地
  h += mound(x, z, 78, -26, 18, 2.0);       // 林间旧屋坡

  const t = smoothstep(86, 160, r);
  h += Math.pow(t, 1.7) * (28 + ridged(x * 0.0062, z * 0.0062, 4) * 44);
  h += smoothstep(150, 232, r) * 30;
  return h;
}

/* ------------------------------------------------------------------ *
 *  网格工具
 * ------------------------------------------------------------------ */
const idx = (i, j) => j * N + i;

function rawGet(x, z) {
  const gi = clamp(Math.round(worldToGrid(x)), 0, N - 1);
  const gj = clamp(Math.round(worldToGrid(z)), 0, N - 1);
  return H[idx(gi, gj)];
}

/** 圆角矩形 SDF（局部坐标） */
function roundedBoxDist(lx, lz, hw, hd, r) {
  const qx = Math.abs(lx) - (hw - r);
  const qz = Math.abs(lz) - (hd - r);
  const mx = Math.max(qx, 0), mz = Math.max(qz, 0);
  return Math.hypot(mx, mz) + Math.min(Math.max(qx, qz), 0) - r;
}

/** 在网格上把一个区域压平到 target 高度 */
function flattenPad(cx, cz, hw, hd, rot, feather, target, mode = 'flat') {
  const ca = Math.cos(-rot), sa = Math.sin(-rot);
  const rad = Math.hypot(hw, hd) + feather + 2;
  const i0 = clamp(Math.floor(worldToGrid(cx - rad)), 0, N - 1);
  const i1 = clamp(Math.ceil(worldToGrid(cx + rad)), 0, N - 1);
  const j0 = clamp(Math.floor(worldToGrid(cz - rad)), 0, N - 1);
  const j1 = clamp(Math.ceil(worldToGrid(cz + rad)), 0, N - 1);
  const fill = mode === 'pave' ? 1 : 0.55;
  for (let j = j0; j <= j1; j++) {
    const z = gridToWorld(j);
    for (let i = i0; i <= i1; i++) {
      const x = gridToWorld(i);
      const lx = (x - cx) * ca - (z - cz) * sa;
      const lz = (x - cx) * sa + (z - cz) * ca;
      const d = roundedBoxDist(lx, lz, hw, hd, Math.min(1.2, Math.min(hw, hd) * 0.35));
      if (d > feather) continue;
      const k = smoothstep(0, feather, Math.max(0, d));
      const id = idx(i, j);
      H[id] = lerp(target, H[id], k);
      if (k < 1) roadMask[id] = Math.max(roadMask[id], fill * (1 - k));
    }
  }
}

/* ------------------------------------------------------------------ *
 *  构建
 * ------------------------------------------------------------------ */
export function buildTerrainData() {
  Hbase = new Float32Array(N * N);
  H = new Float32Array(N * N);
  roadMask = new Float32Array(N * N);
  streamDist = new Float32Array(N * N).fill(9999);

  // --- 1. 基础自然地形 ---
  for (let j = 0; j < N; j++) {
    const z = gridToWorld(j);
    for (let i = 0; i < N; i++) {
      Hbase[idx(i, j)] = naturalHeight(gridToWorld(i), z);
    }
  }
  H.set(Hbase);

  // --- 2. 溪流侵蚀 ---
  const segs = polylineSegments(STREAM.pts, 2.2);
  const sd = new Float32Array(N * N).fill(9999);
  for (const s of segs) {
    const rad = 40;
    const i0 = clamp(Math.floor(worldToGrid(Math.min(s.ax, s.bx) - rad)), 0, N - 1);
    const i1 = clamp(Math.ceil(worldToGrid(Math.max(s.ax, s.bx) + rad)), 0, N - 1);
    const j0 = clamp(Math.floor(worldToGrid(Math.min(s.az, s.bz) - rad)), 0, N - 1);
    const j1 = clamp(Math.ceil(worldToGrid(Math.max(s.az, s.bz) + rad)), 0, N - 1);
    for (let j = j0; j <= j1; j++) {
      const z = gridToWorld(j);
      for (let i = i0; i <= i1; i++) {
        const x = gridToWorld(i);
        const c = closestOnSegment(x, z, s.ax, s.az, s.bx, s.bz);
        if (c.d < sd[idx(i, j)]) sd[idx(i, j)] = c.d;
      }
    }
  }
  streamDist = sd;
  for (let k = 0; k < N * N; k++) {
    const d = sd[k];
    if (d > 42) continue;
    const g1 = Math.exp(-(d * d) / 12.96);      // 主河谷 sigma 3.6
    const g2 = Math.exp(-(d * d) / 144);        // 缓坡 sigma 12
    const g3 = Math.exp(-(d * d) / 10.24);      // 河槽 sigma 3.2
    H[k] -= 2.4 * g2 + 1.4 * g3 + 0.35 * g1;
  }

  // --- 3. 轨道走廊切填（梯形路堑） ---
  {
    const inner = 4.4, outer = 15;
    for (let j = 0; j <= N; j++) {
      for (let i = 0; i < N; i++) {
        const x = gridToWorld(i);
        const tdz = Math.abs(gridToWorld(j) - TRACK.zAt(x));
        if (tdz > outer) continue;
        const id = idx(i, j);
        // 溪流通道不参与切填，否则河床被填平、水面埋进地里
        if (streamDist[id] < 6) continue;
        const k = smoothstep(inner, outer, tdz);
        H[id] = lerp(0, H[id], k);
        if (k > 0.35) roadMask[id] = Math.max(roadMask[id], 0.9 * (1 - k));
      }
    }
  }

  // --- 3b. 隧道段：让山体重新覆盖轨道 ---
  for (let j = 0; j < N; j++) {
    const z = gridToWorld(j);
    for (let i = 0; i < N; i++) {
      const x = gridToWorld(i);
      const ax = Math.abs(x);
      const capT = smoothstep(104, 118, ax);
      if (capT <= 0.001) continue;
      const tdz = Math.abs(z - TRACK.zAt(x));
      if (tdz > 9) continue;
      const w = 1 - smoothstep(0, 6.5, tdz);
      const id = idx(i, j);
      const nh = Math.max(Hbase[id], 3.5);
      H[id] = lerp(H[id], nh, capT * w);
    }
  }

  // --- 4. 建筑地基 ---
  for (const b of BUILDINGS) {
    const target = rawGet(b.x, b.z);
    flattenPad(b.x, b.z, b.w / 2 + 0.5, b.d / 2 + 0.5, b.rot, 2.2, target, 'pad');
  }
  for (const p of PADS) {
    const target = p.y !== undefined ? p.y : rawGet(p.x, p.z);
    flattenPad(p.x, p.z, p.hw, p.hd, p.rot, p.feather, target, 'flat');
  }

  // --- 5. 道路 ---
  for (const r of ROADS) {
    if (r.bridge) continue;
    flattenRoad(r);
  }

  // --- 6. 站台区域保持水平 ---
  {
    const zt = TRACK.zAt(0);
    flattenPad(-8, zt + 5.8, 19, 4.6, 0, 2.5, 0, 'pave');
  }

  return { H, Hbase, roadMask, streamDist };
}

function polylineSegments(pts, step = 1) {
  const out = [];
  // 细分长线段以便精确取样
  const dense = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.ceil(len / 8));
    for (let k = 0; k < n; k++) {
      const t0 = k / n, t1 = (k + 1) / n;
      dense.push([lerp(ax, bx, t0), lerp(az, bz, t0), lerp(ax, bx, t1), lerp(az, bz, t1)]);
    }
  }
  dense.forEach((d) => out.push({ ax: d[0], az: d[1], bx: d[2], bz: d[3] }));
  return out;
}

function flattenRoad(road) {
  const hw = road.width / 2;
  const feather = road.type === 'asphalt' ? 3.2 : 2.4;
  const segs = polylineSegments(road.pts, 1);
  const fill = road.type === 'asphalt' ? 1 : road.type === 'local' ? 0.7 : 0.45;
  for (const s of segs) {
    const hA = rawGet(s.ax, s.az);
    const hB = rawGet(s.bx, s.bz);
    const rad = hw + feather;
    const i0 = clamp(Math.floor(worldToGrid(Math.min(s.ax, s.bx) - rad)), 0, N - 1);
    const i1 = clamp(Math.ceil(worldToGrid(Math.max(s.ax, s.bx) + rad)), 0, N - 1);
    const j0 = clamp(Math.floor(worldToGrid(Math.min(s.az, s.bz) - rad)), 0, N - 1);
    const j1 = clamp(Math.ceil(worldToGrid(Math.max(s.az, s.bz) + rad)), 0, N - 1);
    for (let j = j0; j <= j1; j++) {
      const z = gridToWorld(j);
      for (let i = i0; i <= i1; i++) {
        const x = gridToWorld(i);
        const c = closestOnSegment(x, z, s.ax, s.az, s.bx, s.bz);
        if (c.d > hw + feather) continue;
        const id = idx(i, j);
        const target = lerp(hA, hB, c.t);
        const k = smoothstep(hw, hw + feather, c.d);
        H[id] = lerp(target, H[id], k);
        if (k < 1) roadMask[id] = Math.max(roadMask[id], fill * (1 - k));
      }
    }
  }
}

/* ------------------------------------------------------------------ *
 *  采样
 * ------------------------------------------------------------------ */
export function heightAt(x, z) {
  const gi = worldToGrid(x), gj = worldToGrid(z);
  const i0 = clamp(Math.floor(gi), 0, N - 1), j0 = clamp(Math.floor(gj), 0, N - 1);
  const i1 = Math.min(i0 + 1, N - 1), j1 = Math.min(j0 + 1, N - 1);
  const fx = gi - i0, fz = gj - j0;
  const h00 = H[idx(i0, j0)], h10 = H[idx(i1, j0)];
  const h01 = H[idx(i0, j1)], h11 = H[idx(i1, j1)];
  return lerp(lerp(h00, h10, fx), lerp(h01, h11, fx), fz);
}

export function normalAt(x, z, e = 0.7) {
  const hL = heightAt(x - e, z), hR = heightAt(x + e, z);
  const hD = heightAt(x, z - e), hU = heightAt(x, z + e);
  const nx = hL - hR, nz = hD - hU, ny = 2 * e;
  const l = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / l, y: ny / l, z: nz / l };
}

/** 坡度（0 平地 → 1 垂直） */
export function slopeAt(x, z) {
  const n = normalAt(x, z, 1.1);
  return 1 - n.y;
}

export function streamDistAt(x, z) {
  const gi = clamp(Math.round(worldToGrid(x)), 0, N - 1);
  const gj = clamp(Math.round(worldToGrid(z)), 0, N - 1);
  return streamDist[idx(gi, gj)];
}

export function isWaterAt(x, z) {
  return heightAt(x, z) < WATER_Y - 0.02 && streamDistAt(x, z) < 6.5;
}

export function roadMaskAt(x, z) {
  const gi = clamp(Math.round(worldToGrid(x)), 0, N - 1);
  const gj = clamp(Math.round(worldToGrid(z)), 0, N - 1);
  return roadMask[idx(gi, gj)];
}

/* ------------------------------------------------------------------ *
 *  网格生成
 * ------------------------------------------------------------------ */
const _c = new THREE.Color();

function terrainColorAt(x, z, h, slope, out) {
  const r = Math.hypot(x, z);
  const sd = streamDistAt(x, z);
  const rm = roadMaskAt(x, z);
  const n = noise2(x * 0.06, z * 0.06);
  const n2 = noise2(x * 0.017 + 40, z * 0.017 - 22);
  const n3 = noise2(x * 0.21 - 11, z * 0.21 + 7);

  // 基础草地
  let c = mixHex(PAL.grass, PAL.grassDark, clamp01(0.5 + n * 0.55 + n2 * 0.35));
  c = mixHex(c, PAL.grassLight, clamp01(0.45 + n3 * 0.6) * 0.5);
  c = mixHex(c, mixHex(PAL.grassDark, PAL.leafDark, 0.5), clamp01(n2 * 0.4 + 0.18) * 0.35);

  // 高处山林
  const alpine = smoothstep(0.45, 1.5, h);
  if (alpine > 0) {
    const forest = mixHex(PAL.pine, PAL.leafDark, 0.4 + n * 0.3);
    c = mixHex(c, forest, clamp01(alpine * 1.3));
    const rockAmt = smoothstep(0.55, 1.0, slope) * (0.4 + alpine);
    c = mixHex(c, mixHex(PAL.rock, PAL.rockDark, n * 0.5), clamp01(rockAmt));
  }

  // 陡坡露岩
  const rocky = smoothstep(0.42, 0.72, slope);
  c = mixHex(c, mixHex(PAL.rock, PAL.rockDark, 0.3 + n * 0.4), rocky * 0.85);

  // 溪岸砂石
  const bank = smoothstep(9, 2.2, sd);
  c = mixHex(c, mixHex(PAL.sand, PAL.gravel, 0.4 + n * 0.4), bank * 0.9);
  if (h < WATER_Y + 0.4) c = mixHex(c, PAL.gravel, smoothstep(WATER_Y + 0.4, WATER_Y - 0.6, h));

  // 道路边缘泥土
  if (rm > 0.01) c = mixHex(c, PAL.dirt, rm * 0.5);

  out.setHex(c);
  return out;
}

export function buildTerrainMesh() {
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, WORLD.seg, WORLD.seg);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const v = idx(i, j);
      pos.setY(v, H[v]);
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const nrm = geo.attributes.normal;
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const v = idx(i, j);
      const x = gridToWorld(i), z = gridToWorld(j);
      const slope = 1 - nrm.getY(v);
      terrainColorAt(x, z, H[v], slope, _c);
      colors[v * 3] = _c.r; colors[v * 3 + 1] = _c.g; colors[v * 3 + 2] = _c.b;
    }
  }
  geo.attributes.color.needsUpdate = true;
  const mat = new THREE.MeshToonMaterial({
    vertexColors: true,
    gradientMap: gradientMap(),
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = 'terrain';
  mesh.receiveShadow = true;
  return mesh;
}

/* ------------------------------------------------------------------ *
 *  水面
 * ------------------------------------------------------------------ */
export function buildStreamMesh() {
  const pts = [];
  const p = STREAM.pts;
  // 细分
  for (let i = 0; i < p.length - 1; i++) {
    const [ax, az] = p[i], [bx, bz] = p[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.ceil(len / 3);
    for (let k = 0; k < n; k++) {
      const t = k / n;
      pts.push([lerp(ax, bx, t), lerp(az, bz, t)]);
    }
  }
  pts.push([p[p.length - 1][0], p[p.length - 1][1]]);

  const half = STREAM.width * 0.5;
  const verts = [], uvs = [], indices = [];
  let run = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x, z] = pts[i];
    const prev = pts[Math.max(0, i - 1)], next = pts[Math.min(pts.length - 1, i + 1)];
    let dx = next[0] - prev[0], dz = next[1] - prev[1];
    const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
    const nx = -dz, nz = dx;
    if (i > 0) run += Math.hypot(x - pts[i - 1][0], z - pts[i - 1][1]);
    // 水面宽度随地形自然收放
    const w = half * (0.85 + 0.3 * Math.sin(run * 0.13));
    verts.push(x + nx * w, WATER_Y, z + nz * w);
    verts.push(x - nx * w, WATER_Y, z - nz * w);
    uvs.push(0, run * 0.14, 1, run * 0.14);
    if (i < pts.length - 1) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({
    color: PAL.water, transparent: true, opacity: 0.86, side: THREE.DoubleSide,
  }));
  mesh.name = 'stream-water';
  mesh.renderOrder = 1;
  return mesh;
}

export { N as TERRAIN_N, CELL as TERRAIN_CELL, gridToWorld, polylineSegments };
