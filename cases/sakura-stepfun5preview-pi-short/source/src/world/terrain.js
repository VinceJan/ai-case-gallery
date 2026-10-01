// 地形：地面、道路、河、铁路、桥、山丘、水田、栅栏
import * as THREE from 'three';
import { MAT, TEX } from './materials.js';
import { ROADS, TOWN, terrainHeight, BUILDINGS, buildingDoor, POIS } from './layout.js';
import { makeRng, clamp } from '../core/utils.js';

const UP = new THREE.Vector3(0, 1, 0);

export function addBox(batcher, key, w, h, d, x, y, z, rotY = 0) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Matrix4();
  if (rotY) m.makeRotationY(rotY);
  m.setPosition(x, y, z);
  batcher.add(key, geo, m);
}

export function addPlaneGeo(batcher, key, geo, x, y, z, rotX = 0, rotY = 0) {
  const m = new THREE.Matrix4();
  const e = new THREE.Euler(rotX, rotY, 0);
  m.makeRotationFromEuler(e);
  m.setPosition(x, y, z);
  batcher.add(key, geo, m);
}

// 道路（沥青 + 人行道 + 车道线 + 斑马线）
function buildRoads(batcher, colliders) {
  for (const r of ROADS) {
    const dx = r.x2 - r.x1, dz = r.z2 - r.z1;
    const len = Math.hypot(dx, dz);
    const ang = Math.atan2(dx, dz); // 绕 Y 旋转，使盒子长边对齐
    const cx = (r.x1 + r.x2) / 2, cz = (r.z1 + r.z2) / 2;
    // 沥青路面（分段以贴合地形高度）
    const segs = Math.max(1, Math.ceil(len / 12));
    for (let i = 0; i < segs; i++) {
      const t0 = i / segs, t1 = (i + 1) / segs;
      const sx = r.x1 + dx * t0, sz = r.z1 + dz * t0;
      const ex = r.x1 + dx * t1, ez = r.z1 + dz * t1;
      const sl = Math.hypot(ex - sx, ez - sz);
      const mx = (sx + ex) / 2, mz = (sz + ez) / 2;
      const my = terrainHeight(mx, mz);
      // 路面
      addBox(batcher, 'asphalt', sl + 0.15, 0.12, r.w, mx, my + 0.045, mz, ang);
      // 人行道（两侧）
      const sw = 1.5;
      const px = Math.cos(ang), pz = -Math.sin(ang); // 垂直方向
      for (const s of [1, -1]) {
        addBox(batcher, 'sidewalk', sl + 0.15, 0.22, sw, mx + px * s * (r.w / 2 + sw / 2 - 0.05), my + 0.08, mz + pz * s * (r.w / 2 + sw / 2 - 0.05), ang);
      }
      // 边线
      for (const s of [1, -1]) {
        addBox(batcher, 'pavementMark', sl * 0.98, 0.02, 0.14, mx + px * s * (r.w / 2 - 0.35), my + 0.11, mz + pz * s * (r.w / 2 - 0.35), ang);
      }
      // 中央虚线
      if (r.w >= 6) {
        const dashN = Math.floor(len / 6);
        for (let k = 0; k < dashN; k++) {
          const tt = (k + 0.5) / dashN;
          const ddx = r.x1 + dx * tt, ddz = r.z1 + dz * tt;
          addBox(batcher, 'pavementMark', 2.2, 0.02, 0.16, ddx, terrainHeight(ddx, ddz) + 0.11, ddz, ang);
        }
      }
    }
  }
  // 斑马线（主路口）
  const crossings = [
    { x: 0, z: -40, ang: 0 }, { x: 0, z: 20, ang: 0 }, { x: 0, z: 60, ang: 0 },
    { x: -30, z: -40, ang: Math.PI / 2 }, { x: -70, z: 20, ang: Math.PI / 2 },
    { x: 70, z: 20, ang: Math.PI / 2 }, { x: -70, z: 60, ang: Math.PI / 2 }, { x: 70, z: 60, ang: Math.PI / 2 },
  ];
  for (const c of crossings) {
    for (let i = -3; i <= 3; i++) {
      const off = i * 0.9;
      addBox(batcher, 'pavementMark', c.ang === 0 ? 0.5 : 3.2, 0.02, c.ang === 0 ? 3.2 : 0.5,
        c.x + (c.ang === 0 ? 0 : off), terrainHeight(c.x, c.z) + 0.115, c.z + (c.ang === 0 ? off : 0));
    }
  }
}

// 门前小径
function buildSpurPaths(batcher, graph) {
  const roadNodes = graph.nodes.filter((n) => n.tag !== 'door' && n.tag !== 'poi');
  for (const b of BUILDINGS) {
    const d = buildingDoor(b);
    let best = null, bd = 1e9;
    for (const n of roadNodes) {
      const dd = Math.hypot(n.x - d.x, n.z - d.z);
      if (dd < bd) { bd = dd; best = n; }
    }
    if (!best || bd < 2.5) continue;
    const mx = (d.x + best.x) / 2, mz = (d.z + best.z) / 2;
    const ang = Math.atan2(best.x - d.x, best.z - d.z);
    addBox(batcher, 'sidewalk', Math.min(bd, 40), 0.05, 1.6, mx, terrainHeight(mx, mz) + 0.03, mz, ang);
  }
}

// 河流、河岸步道、桥
function buildRiver(batcher, colliders) {
  const zMin = TOWN.river.zMin, zMax = TOWN.river.zMax;
  // 河床
  const bed = new THREE.PlaneGeometry(300, zMax - zMin);
  addPlaneGeo(batcher, 'soil', bed, 0, -2.1, (zMin + zMax) / 2, -Math.PI / 2);
  // 水面
  const water = new THREE.PlaneGeometry(300, zMax - zMin + 0.5);
  addPlaneGeo(batcher, 'water', water, 0, -1.5, (zMin + zMax) / 2, -Math.PI / 2);
  // 石砌岸（除桥口外）
  for (const z of [zMin - 0.4, zMax + 0.4]) {
    for (const s of [0, 1]) {
      const x0 = s === 0 ? -150 : 3.4, x1 = s === 0 ? -3.4 : 150;
      addBox(batcher, 'stone', x1 - x0, 1.6, 1.2, (x0 + x1) / 2, -1.2, z);
    }
  }
  colliders.push({ x: 0, z: zMax + 0.9, hw: 150, hd: 0.8 });
  colliders.push({ x: 0, z: zMin - 1.1, hw: 150, hd: 0.8 });
  // 南岸河畔步道
  for (let x = -140; x < 140; x += 14) {
    addBox(batcher, 'sidewalk', 14, 0.16, 2.4, x + 7, 0.06, zMax + 1.6);
  }
  // 护栏（南岸）
  for (let x = -140; x < 140; x += 6) {
    addBox(batcher, 'metal', 0.12, 0.7, 0.12, x, 0.45, zMax + 2.6);
  }
  addBox(batcher, 'metal', 280, 0.09, 0.09, 0, 0.72, zMax + 2.6);
}

// 樱花桥（拱形木桥）
function buildBridge(batcher, colliders) {
  const z0 = TOWN.bounds.minZ + 2, z1 = TOWN.river.zMax - 0.5;
  const n = Math.ceil((z1 - z0) / 2);
  for (let i = 0; i < n; i++) {
    const za = z0 + (i / n) * (z1 - z0), zb = z0 + ((i + 1) / n) * (z1 - z0);
    const mz = (za + zb) / 2;
    const y = terrainHeight(0, mz);
    const y0 = terrainHeight(0, za), y1 = terrainHeight(0, zb);
    const tilt = Math.atan2(y1 - y0, zb - za);
    // 桥面
    const g = new THREE.BoxGeometry(5.6, 0.3, Math.hypot(zb - za, y1 - y0) + 0.1);
    const m = new THREE.Matrix4();
    m.makeRotationX(-tilt);
    m.setPosition(0, y + 0.1, mz);
    batcher.add('wood', g, m);
    // 栏杆
    for (const s of [1, -1]) {
      const rg = new THREE.BoxGeometry(0.14, 0.14, Math.hypot(zb - za, y1 - y0) + 0.1);
      const rm = new THREE.Matrix4();
      rm.makeRotationX(-tilt);
      rm.setPosition(s * 2.6, y + 0.75, mz);
      batcher.add('woodPlain', rg, rm);
    }
    // 栏杆柱
    for (const s of [1, -1]) {
      const pg = new THREE.BoxGeometry(0.16, 0.85, 0.16);
      const pm = new THREE.Matrix4();
      pm.makeRotationX(-tilt);
      pm.setPosition(s * 2.6, y + 0.45, (za + zb) / 2);
      batcher.add('woodPlain', pg, pm);
    }
  }
  // 桥栏杆碰撞
  for (const s of [1, -1]) colliders.push({ x: s * 2.75, z: (z0 + z1) / 2, hw: 0.2, hd: (z1 - z0) / 2 });
}

// 铁路与站台
function buildRailway(batcher, colliders) {
  const tz = TOWN.track.z;
  // 道砟
  addBox(batcher, 'stoneDark', 300, 0.18, 4.6, 0, -0.55, tz);
  // 枕木
  for (let x = -148; x <= 148; x += 0.85) {
    addBox(batcher, 'sleeper', 2.6, 0.14, 0.5, x, -0.38, tz);
  }
  // 钢轨
  for (const s of [1, -1]) {
    addBox(batcher, 'metal', 300, 0.14, 0.14, 0, -0.26 + 0.06, tz + s * 0.75);
  }
  // 站台
  const p = TOWN.platform;
  addBox(batcher, 'sidewalk', p.x2 - p.x1, 0.9, 6, (p.x1 + p.x2) / 2, 0.15, p.z);
  addBox(batcher, 'stoneDark', p.x2 - p.x1, 0.5, 6.4, (p.x1 + p.x2) / 2, -0.3, p.z + 0.2);
  // 站台雨棚
  for (const px of [p.x1 + 1, p.x2 - 1]) {
    addBox(batcher, 'metal', 0.24, 4.2, 0.24, px, 2.2, p.z - 2.4);
    addBox(batcher, 'metal', 0.24, 4.2, 0.24, px, 2.2, p.z + 2.4);
  }
  addBox(batcher, 'roofBlue', p.x2 - p.x1 + 1, 0.22, 6.4, (p.x1 + p.x2) / 2, 4.4, p.z);
  // 安全线
  addBox(batcher, 'pavementMark', p.x2 - p.x1, 0.03, 0.3, (p.x1 + p.x2) / 2, 0.62, p.z - 2.7);
  colliders.push({ x: (p.x1 + p.x2) / 2, z: tz, hw: (p.x2 - p.x1) / 2, hd: 2.2 });
  // 轨道沿线栅栏（南北两侧）
  for (const s of [1, -1]) {
    for (let x = -146; x <= 146; x += 5) {
      addBox(batcher, 'metal', 0.08, 0.9, 0.08, x, 0.05, tz + s * 3.2);
    }
    addBox(batcher, 'metal', 292, 0.07, 0.07, 0, 0.45, tz + s * 3.2);
    if (s === 1) colliders.push({ x: 0, z: tz + 3.4, hw: 150, hd: 0.5 });
  }
}

// 山丘（神社山、公园丘）—— 用置换网格贴合 terrainHeight
function buildMounds(batcher) {
  const mounds = [
    { x: 0, z: 102, w: 76, d: 76, seg: 44 },
    { x: -40, z: 36, w: 42, d: 42, seg: 26 },
  ];
  for (const m of mounds) {
    const geo = new THREE.PlaneGeometry(m.w, m.d, m.seg, m.seg);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) + m.x, z = pos.getZ(i) + m.z;
      pos.setY(i, terrainHeight(x, z));
    }
    geo.computeVertexNormals();
    addPlaneGeo(batcher, 'grass', geo, m.x, 0.02, m.z);
  }
  // 神社石阶
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const z = 72 + t * 20;
    const y = terrainHeight(0, z);
    addBox(batcher, 'stone', 5.4, 0.32, 20 / steps + 0.15, 0, y + 0.02, z + (20 / steps) / 2);
  }
}

// 水田
function buildPaddies(batcher, colliders) {
  const cells = [
    { x: -116, z: 74 }, { x: -96, z: 74 }, { x: -116, z: 96 }, { x: -96, z: 96 },
  ];
  for (const c of cells) {
    // 水面
    const geo = new THREE.PlaneGeometry(20, 20);
    addPlaneGeo(batcher, 'rice', geo, c.x, -0.06, c.z, -Math.PI / 2);
    // 田埂
    for (const s of [1, -1]) {
      addBox(batcher, 'soil', 21, 0.5, 1.2, c.x, 0.1, c.z + s * 10.4);
      addBox(batcher, 'soil', 1.2, 0.5, 21, c.x + s * 10.4, 0.1, c.z);
    }
  }
  // 秧苗点缀
  const rng = makeRng(77);
  for (const c of cells) {
    for (let i = 0; i < 26; i++) {
      const x = c.x + (rng() - 0.5) * 17, z = c.z + (rng() - 0.5) * 17;
      addBox(batcher, 'leaf', 0.5, 0.02, 0.12, x, 0.06, z, rng() * 3);
    }
  }
}

// 农场
function buildFarm(batcher) {
  // 菜地垄
  for (let i = 0; i < 5; i++) {
    const z = 76 + i * 5;
    addBox(batcher, 'soil', 34, 0.24, 1.6, 96, 0.1, z);
    addBox(batcher, 'leaf', 34, 0.3, 1.0, 96, 0.3, z);
  }
  // 稻草人
  const sx = 108, sz = 78;
  addBox(batcher, 'woodPlain', 0.12, 1.6, 0.12, sx, 0.9, sz);
  addBox(batcher, 'fabric', 0.7, 0.7, 0.2, sx, 1.5, sz);
  addBox(batcher, 'woodPlain', 1.1, 0.08, 0.08, sx, 1.7, sz);
}

// 边界栅栏（闭环世界）
function buildBoundary(batcher, colliders) {
  const b = TOWN.bounds;
  const posts = [];
  for (let z = b.minZ + 4; z <= b.maxZ; z += 5) { posts.push([-b.maxX, z]); posts.push([b.maxX, z]); }
  for (let x = -b.maxX; x <= b.maxX; x += 5) posts.push([x, b.maxZ]);
  for (const [x, z] of posts) {
    addBox(batcher, 'woodPlain', 0.16, 1.15, 0.16, x, 0.55, z);
    addBox(batcher, 'woodPlain', 0.1, 0.1, 4.9, x, 0.95, z + (Math.abs(x) > 100 ? 0 : 2.45));
    addBox(batcher, 'woodPlain', 0.1, 0.1, 4.9, x, 0.55, z + (Math.abs(x) > 100 ? 0 : 2.45));
  }
  colliders.push({ x: -b.maxX, z: 0, hw: 0.4, hd: 150 });
  colliders.push({ x: b.maxX, z: 0, hw: 0.4, hd: 150 });
  colliders.push({ x: 0, z: b.maxZ, hw: 150, hd: 0.4 });
  // 北岸封闭大门（世界闭环）
  colliders.push({ x: 0, z: -145, hw: 2.2, hd: 0.5 });
}

export function buildTerrain(parent, batcher, colliders, graph) {
  // 大地面
  const groundGeo = new THREE.PlaneGeometry(560, 560);
  addPlaneGeo(batcher, 'grass', groundGeo, 0, 0, 0, -Math.PI / 2);
  buildRoads(batcher, colliders);
  buildSpurPaths(batcher, graph);
  buildRiver(batcher, colliders);
  buildBridge(batcher, colliders);
  buildRailway(batcher, colliders);
  buildMounds(batcher);
  buildPaddies(batcher, colliders);
  buildFarm(batcher);
  buildBoundary(batcher, colliders);
}
