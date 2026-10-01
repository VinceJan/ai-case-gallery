// 建筑工厂：参数化生成日式小镇建筑（晚春、轻怀旧动画背景风）
import * as THREE from 'three';
import { MAT, TEX, makeSignTex } from './materials.js';
import { PALETTE } from './palette.js';
import { terrainHeight, buildingDoor } from './layout.js';
import { makeRng, lerp, clamp } from '../core/utils.js';
import { addBox, addPlaneGeo } from './terrain.js';

// 局部坐标 → 世界（建筑 rotY）
function l2w(b, lx, lz, y = 0) {
  const c = Math.cos(b.rotY), s = Math.sin(b.rotY);
  return { x: b.x + lx * c + lz * s, z: b.z - lx * s + lz * c, y };
}

// 四坡屋顶几何
function hipRoofGeo(w, d, h, o = 0.55) {
  const alongX = w >= d;
  const W = w / 2 + o, D = d / 2 + o;
  const ridgeHalf = alongX ? Math.max(0.001, W - D) : Math.max(0.001, D - W);
  const verts = [];
  const push = (a, b, c) => {
    verts.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
  };
  if (alongX) {
    const A = [-W, 0, -D], B = [W, 0, -D], C = [W, 0, D], Dc = [-W, 0, D];
    const R1 = [-ridgeHalf, h, 0], R2 = [ridgeHalf, h, 0];
    push(Dc, C, R2); push(Dc, R2, R1);   // 前坡
    push(A, B, R2); push(A, R2, R1);     // 后坡
    push(A, Dc, R1);                     // 左
    push(B, C, R2);                      // 右
  } else {
    const A = [-W, 0, -D], B = [W, 0, -D], C = [W, 0, D], Dc = [-W, 0, D];
    const R1 = [0, h, -ridgeHalf], R2 = [0, h, ridgeHalf];
    push(A, B, R1); push(B, R2, R1);     // 后坡
    push(Dc, A, R1); push(Dc, R1, R2);   // 左坡
    push(B, C, R2);                      // 右坡
    push(C, Dc, R2);                     // 前坡
  }
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(verts);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  // 简易 UV
  const uv = [];
  for (let i = 0; i < pos.length / 3; i++) {
    uv.push((pos[i * 3] + 10) * 0.14, (pos[i * 3 + 2] + 10) * 0.14);
  }
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return geo;
}

// 窗（登记到 windowLit 批次，夜晚统一点亮）
function addWindow(batcher, b, lx, y, lz, w = 1.25, hgt = 1.15, tilt = 0) {
  const p = l2w(b, lx, lz);
  const geo = new THREE.PlaneGeometry(w, hgt);
  const m = new THREE.Matrix4();
  const e = new THREE.Euler(0, b.rotY + tilt, 0);
  m.makeRotationFromEuler(e);
  m.setPosition(p.x, p.y, p.z);
  batcher.add('windowLit', geo, m);
}

function addGlass(batcher, b, lx, y, lz, w, hgt, tilt = 0) {
  const p = l2w(b, lx, lz);
  const geo = new THREE.PlaneGeometry(w, hgt);
  const m = new THREE.Matrix4();
  m.makeRotationFromEuler(new THREE.Euler(0, b.rotY + tilt, 0));
  m.setPosition(p.x, p.y, p.z);
  batcher.add('glass', geo, m);
}

// 招牌（独立网格，带文字贴图）
function addSign(parent, text, x, y, z, rotY, w = 3.6, h = 0.95, opts = {}) {
  const tex = makeSignTex(text, { w: 512, h: 128, ...opts });
  const mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  parent.add(mesh);
  return mesh;
}

function buildHouse(b, batcher, parent, rng, detail) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  const wallMat = rng() > 0.45 ? 'plaster' : 'wood';
  // 基座
  addBox(batcher, 'stone', w + 1, 0.45, d + 1, b.x, y0 + 0.22, b.z, b.rotY);
  // 一层墙
  addBox(batcher, wallMat, w, 3.15, d, b.x, y0 + 0.45 + 1.575, b.z, b.rotY);
  // 二层墙（内缩）
  addBox(batcher, wallMat === 'plaster' ? 'wood' : 'plaster', w - 0.6, 2.7, d - 0.6, b.x, y0 + 0.45 + 3.15 + 1.35, b.z, b.rotY);
  // 门窗
  addWindow(batcher, b, -w / 4 + 0.5, y0 + 1.7, d / 2 + 0.03);
  addWindow(batcher, b, w / 4 - 0.5, y0 + 1.7, d / 2 + 0.03);
  addWindow(batcher, b, 0, y0 + 4.9, d / 2 - 0.25);
  addWindow(batcher, b, 0, y0 + 4.9, -d / 2 + 0.28, 1.4, 1.0, Math.PI);
  addWindow(batcher, b, w / 2 - 0.28, y0 + 1.7, 0, 1.1, 1.15, Math.PI / 2);
  // 大门
  const dp = l2w(b, 0, d / 2 + 0.06);
  addBox(batcher, 'door', 1.25, 2.2, 0.14, dp.x, y0 + 0.45 + 1.1, dp.z, b.rotY);
  // 门廊
  addBox(batcher, 'wood', 2.2, 0.16, 1.1, l2w(b, 0, d / 2 + 0.55).x, y0 + 0.5, l2w(b, 0, d / 2 + 0.55).z, b.rotY);
  // 缘侧（木廊檐）
  addBox(batcher, 'wood', w - 0.4, 0.14, 1.0, b.x, y0 + 0.52, l2w(b, 0, d / 2 + 0.55).z, b.rotY);
  // 屋顶
  const roof = hipRoofGeo(w + 1.3, d + 1.3, 2.3);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.45 + 3.15 + 2.7, b.z);
  batcher.add('roofTile', roof, rm);
  // 屋脊
  addBox(batcher, 'roofTile', w + 1.6, 0.22, 0.4, b.x, y0 + 0.45 + 3.15 + 2.7 + 2.3 + 0.05, b.z, b.rotY);
  // 烟囱
  addBox(batcher, 'brick', 0.7, 1.5, 0.7, l2w(b, w / 3, -d / 4).x, y0 + 0.45 + 3.15 + 2.7 + 1.4, l2w(b, w / 3, -d / 4).z);
  // 空调外机
  addBox(batcher, 'metal', 0.6, 0.45, 0.3, l2w(b, -w / 2 + 0.8, d / 2 + 0.2).x, y0 + 2.4, l2w(b, -w / 2 + 0.8, d / 2 + 0.2).z, b.rotY);
  // 花园矮篱
  for (let i = -1; i <= 1; i++) {
    addBox(batcher, 'leaf', 0.5, 0.55, 0.5, l2w(b, i * 2.4, d / 2 + 1.6).x, y0 + 0.55, l2w(b, i * 2.4, d / 2 + 1.6).z);
  }
  // 名牌
  if (!detail) {
    const np = l2w(b, 1.6, d / 2 + 1.55);
    addSign(parent, b.name.replace('我的家', '我家'), np.x, y0 + 1.35, np.z, b.rotY, 1.5, 0.5, { w: 256, h: 96, bg: '#5d4033', fg: '#f7e9c9' });
  }
  return { interior: 'house' };
}

function buildShopFront(b, batcher, parent, rng, opts) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  const wallMat = opts.wall || 'plaster';
  // 基座 + 墙
  addBox(batcher, 'stone', w + 0.8, 0.4, d + 0.8, b.x, y0 + 0.2, b.z, b.rotY);
  addBox(batcher, wallMat, w, 4.4, d, b.x, y0 + 0.4 + 2.2, b.z, b.rotY);
  // 橱窗玻璃（正面下部）
  addGlass(batcher, b, -w / 4, y0 + 1.5, d / 2 + 0.04, w / 2 - 0.6, 1.9);
  addGlass(batcher, b, w / 4, y0 + 1.5, d / 2 + 0.04, w / 2 - 0.6, 1.9);
  // 入口玻璃门
  addGlass(batcher, b, 0, y0 + 1.45, d / 2 + 0.05, 1.3, 2.4);
  // 门栏
  addBox(batcher, 'metal', 1.5, 0.1, 0.1, l2w(b, 0, d / 2 + 0.62).x, y0 + 0.55, l2w(b, 0, d / 2 + 0.62).z, b.rotY);
  // 暖帘（noren）
  for (const s of [-1, 1]) {
    const p = l2w(b, s * 0.85, d / 2 + 0.28);
    const g = new THREE.PlaneGeometry(0.55, 0.8);
    const m = new THREE.Matrix4();
    m.makeRotationFromEuler(new THREE.Euler(0, b.rotY, 0));
    m.setPosition(p.x, y0 + 2.75, p.z);
    batcher.add('noren', g, m);
  }
  // 雨檐（遮阳篷）
  const awn = new THREE.BoxGeometry(w + 1.2, 0.12, 1.5);
  const am = new THREE.Matrix4();
  const ap = l2w(b, 0, d / 2 + 0.9, y0 + 3.0);
  am.makeRotationFromEuler(new THREE.Euler(-0.32, b.rotY, 0));
  am.setPosition(ap.x, ap.y, ap.z);
  batcher.add('awning', awn, am);
  // 屋顶
  const roof = hipRoofGeo(w + 0.9, d + 0.9, 1.1, 0.4);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.4 + 4.4, b.z);
  batcher.add(opts.roof || 'roofTile', roof, rm);
  // 侧面高窗
  addWindow(batcher, b, w / 2 - 0.25, y0 + 3.4, -0.6, 1.6, 0.9, Math.PI / 2);
  // 招牌
  const sp = l2w(b, 0, d / 2 + 0.1, y0 + 4.15);
  addSign(parent, b.sign || b.name, sp.x, sp.y, sp.z, b.rotY, w * 0.82, 0.85, { bg: opts.signBg || '#3a2f2a', fg: opts.signFg || '#f7e9c9' });
  return { interior: 'shop' };
}

function buildKonbini(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 1, 0.4, d + 1, b.x, y0 + 0.2, b.z, b.rotY);
  addBox(batcher, 'plaster', w, 4.6, d, b.x, y0 + 0.4 + 2.3, b.z, b.rotY);
  // 大玻璃立面（蓝白条纹是便利店特征）
  addGlass(batcher, b, 0, y0 + 1.7, d / 2 + 0.05, w - 1.6, 2.7);
  for (const s of [1, -1]) {
    addBox(batcher, 'fabric', 0.5, 2.7, 0.1, l2w(b, s * (w / 2 - 0.9), d / 2 + 0.1).x, y0 + 1.7, l2w(b, s * (w / 2 - 0.9), d / 2 + 0.1).z, b.rotY);
  }
  // 入口
  addGlass(batcher, b, -1.6, y0 + 1.5, d / 2 + 0.06, 1.2, 2.3);
  addBox(batcher, 'metal', 1.3, 0.08, 0.08, l2w(b, -1.6, d / 2 + 0.6).x, y0 + 0.6, l2w(b, -1.6, d / 2 + 0.6).z, b.rotY);
  // 屋顶 + 招牌墙
  const roof = hipRoofGeo(w + 1, d + 1, 1.0, 0.4);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.4 + 4.6, b.z);
  batcher.add('roofBlue', roof, rm);
  const sp = l2w(b, 0, d / 2 + 0.12, y0 + 4.3);
  addSign(parent, '海鸥便利店', sp.x, sp.y, sp.z, b.rotY, w * 0.85, 0.95, { bg: '#1d5c8f', fg: '#ffffff' });
  // 侧面冷柜窗
  addWindow(batcher, b, w / 2 - 0.25, y0 + 1.8, -1, 1.8, 1.3, Math.PI / 2);
  return { interior: 'konbini' };
}

function buildStation(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 1.5, 0.5, d + 1.5, b.x, y0 + 0.25, b.z, b.rotY);
  addBox(batcher, 'plaster', w, 5.2, d, b.x, y0 + 0.5 + 2.6, b.z, b.rotY);
  // 大玻璃正面 + 自动门
  addGlass(batcher, b, -3, y0 + 1.9, d / 2 + 0.05, 5, 2.9);
  addGlass(batcher, b, 3.5, y0 + 1.9, d / 2 + 0.05, 5, 2.9);
  addGlass(batcher, b, 0.6, y0 + 1.9, d / 2 + 0.06, 1.6, 2.9);
  // 站名大字
  const sp = l2w(b, 0, d / 2 + 0.15, y0 + 4.35);
  addSign(parent, '樱花站', sp.x, sp.y, sp.z, b.rotY, 8, 1.2, { bg: '#2e4a6b', fg: '#ffffff', font: 'bold 84px "Hiragino Sans","Microsoft YaHei",sans-serif' });
  // 屋顶
  const roof = hipRoofGeo(w + 2, d + 1.6, 1.8, 0.8);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.5 + 5.2, b.z);
  batcher.add('roofTile', roof, rm);
  // 侧面窗
  addWindow(batcher, b, w / 2 - 0.25, y0 + 2.6, -1, 2.4, 1.4, Math.PI / 2);
  return { interior: 'station' };
}

function buildShrine(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  // 高台基座
  addBox(batcher, 'stone', w + 2.4, 1.2, d + 2.4, b.x, y0 + 0.6, b.z, b.rotY);
  // 四柱
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const p = l2w(b, sx * (w / 2 - 0.4), sz * (d / 2 - 0.4));
      addBox(batcher, 'woodPlain', 0.34, 3.4, 0.34, p.x, y0 + 1.2 + 1.7, p.z);
    }
  }
  // 殿身
  addBox(batcher, 'wood', w - 0.8, 2.6, d - 0.8, b.x, y0 + 1.2 + 1.3, b.z, b.rotY);
  // 大屋顶（挑檐深）
  const roof = hipRoofGeo(w + 3.2, d + 3.2, 2.4, 1.0);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 1.2 + 2.6, b.z);
  batcher.add('roofTile', roof, rm);
  addBox(batcher, 'roofTile', w + 3.4, 0.3, 0.5, b.x, y0 + 1.2 + 2.6 + 2.4, b.z, b.rotY);
  // 注连绳（shimenawa）
  addBox(batcher, 'rice', 1.6, 0.22, 0.22, l2w(b, 0, d / 2 + 0.2).x, y0 + 2.9, l2w(b, 0, d / 2 + 0.2).z);
  for (const s of [-1, 1]) addBox(batcher, 'rice', 0.16, 0.5, 0.16, l2w(b, s * 0.8, d / 2 + 0.2).x, y0 + 2.6, l2w(b, s * 0.8, d / 2 + 0.2).z);
  // 铃绪
  addBox(batcher, 'gold', 0.06, 0.7, 0.06, l2w(b, 0, d / 2 + 0.55).x, y0 + 2.5, l2w(b, 0, d / 2 + 0.55).z);
  // 正面台阶
  for (let i = 0; i < 4; i++) {
    addBox(batcher, 'stone', 2.6, 0.3, 0.55, l2w(b, 0, d / 2 + 1.2 + i * 0.55).x, y0 + 1.2 - i * 0.3, l2w(b, 0, d / 2 + 1.2 + i * 0.55).z);
  }
  const sp = l2w(b, 0, d / 2 + 0.15, y0 + 4.6);
  addSign(parent, '樱花神社', sp.x, sp.y, sp.z, b.rotY, 4.4, 0.9, { bg: '#7a2f26', fg: '#f7e9c9' });
  return { interior: 'shrine' };
}

function buildSchool(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 1.5, 0.5, d + 1.5, b.x, y0 + 0.25, b.z, b.rotY);
  addBox(batcher, 'plaster', w, 6.8, d, b.x, y0 + 0.5 + 3.4, b.z, b.rotY);
  // 两排窗（沿长边）
  const nWin = 7;
  for (let i = 0; i < nWin; i++) {
    const t = (i - (nWin - 1) / 2) * (w / (nWin + 1));
    addWindow(batcher, b, t, y0 + 2.4, d / 2 + 0.04);
    addWindow(batcher, b, t, y0 + 4.9, d / 2 + 0.04);
    addWindow(batcher, b, t, y0 + 2.4, -d / 2 - 0.04, 1.25, 1.15, Math.PI);
    addWindow(batcher, b, t, y0 + 4.9, -d / 2 - 0.04, 1.25, 1.15, Math.PI);
  }
  // 入口
  addBox(batcher, 'door', 2.2, 2.4, 0.16, l2w(b, 0, d / 2 + 0.08).x, y0 + 1.7, l2w(b, 0, d / 2 + 0.08).z, b.rotY);
  addBox(batcher, 'roofBlue', 4, 0.3, 2.2, l2w(b, 0, d / 2 + 1).x, y0 + 3.4, l2w(b, 0, d / 2 + 1).z, b.rotY);
  // 时钟
  const cp = l2w(b, 0, d / 2 + 0.12, y0 + 5.9);
  const clock = new THREE.Mesh(new THREE.CircleGeometry(0.55, 20), new THREE.MeshBasicMaterial({ color: 0xf7f0e6, toneMapped: false }));
  clock.position.set(cp.x, cp.y, cp.z);
  clock.rotation.y = b.rotY + Math.PI;
  parent.add(clock);
  const hand = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.42), new THREE.MeshBasicMaterial({ color: 0x2a2730, toneMapped: false }));
  hand.position.set(cp.x, cp.y + 0.12, cp.z + 0.02);
  hand.rotation.y = b.rotY + Math.PI;
  parent.add(hand);
  // 屋顶
  const roof = hipRoofGeo(w + 1.5, d + 1.5, 1.4, 0.6);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.5 + 6.8, b.z);
  batcher.add('roofTile', roof, rm);
  const sp = l2w(b, -w / 2 + 2.5, d / 2 + 0.15, y0 + 6.0);
  addSign(parent, '樱花小学', sp.x, sp.y, sp.z, b.rotY, 5, 0.9, { bg: '#c98f3f', fg: '#3a2f2a' });
  return { interior: 'school' };
}

function buildPost(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 1, 0.45, d + 1, b.x, y0 + 0.22, b.z, b.rotY);
  addBox(batcher, 'plaster', w, 4.6, d, b.x, y0 + 0.45 + 2.3, b.z, b.rotY);
  addGlass(batcher, b, 0, y0 + 1.6, d / 2 + 0.05, w - 3, 2.2);
  addWindow(batcher, b, w / 2 - 0.25, y0 + 2.8, -1, 1.6, 1.0, Math.PI / 2);
  const roof = hipRoofGeo(w + 1, d + 1, 1.2, 0.5);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.45 + 4.6, b.z);
  batcher.add('roofBlue', roof, rm);
  const sp = l2w(b, 0, d / 2 + 0.15, y0 + 4.2);
  addSign(parent, '樱花邮局', sp.x, sp.y, sp.z, b.rotY, 4.6, 0.9, { bg: '#2e6b4a', fg: '#ffffff' });
  // 门口邮筒
  const mp = l2w(b, w / 2 - 1, d / 2 + 1.2);
  addBox(batcher, 'vending', 0.55, 0.9, 0.55, mp.x, y0 + 0.45, mp.z);
  addBox(batcher, 'metal', 0.6, 0.1, 0.6, mp.x, y0 + 0.95, mp.z);
  return { interior: 'post' };
}

function buildApartment(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 1, 0.4, d + 1, b.x, y0 + 0.2, b.z, b.rotY);
  const floors = 3, fh = 2.9;
  addBox(batcher, 'plaster', w, floors * fh, d, b.x, y0 + 0.4 + (floors * fh) / 2, b.z, b.rotY);
  for (let f = 0; f < floors; f++) {
    const fy = y0 + 0.4 + f * fh + 1.6;
    addWindow(batcher, b, -w / 4, fy, d / 2 + 0.04);
    addWindow(batcher, b, w / 4, fy, d / 2 + 0.04);
    addWindow(batcher, b, 0, fy, -d / 2 - 0.04, 1.25, 1.15, Math.PI);
    // 阳台
    const bp = l2w(b, 0, d / 2 + 0.7, fy - 0.7);
    addBox(batcher, 'stone', w - 2, 0.12, 1.2, bp.x, bp.y, bp.z, b.rotY);
    for (const s of [-1, 1]) {
      const rp = l2w(b, s * (w / 2 - 1), d / 2 + 0.7, fy + 0.3);
      addBox(batcher, 'metal', 0.06, 0.7, 0.06, rp.x, rp.y, rp.z);
    }
    addBox(batcher, 'metal', w - 2, 0.06, 0.06, bp.x, fy + 0.62, bp.z, b.rotY);
  }
  const roof = hipRoofGeo(w + 0.8, d + 0.8, 1.0, 0.4);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.4 + floors * fh, b.z);
  batcher.add('roofTile', roof, rm);
  const sp = l2w(b, 0, d / 2 + 0.15, y0 + 0.4 + floors * fh + 0.6);
  addSign(parent, '樱花公寓', sp.x, sp.y, sp.z, b.rotY, 4, 0.8, { bg: '#5a5f8a', fg: '#ffffff' });
  return { interior: 'apartment' };
}

function buildBarn(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 1, 0.4, d + 1, b.x, y0 + 0.2, b.z, b.rotY);
  addBox(batcher, 'wood', w, 4.4, d, b.x, y0 + 0.4 + 2.2, b.z, b.rotY);
  // 大门
  addBox(batcher, 'door', 2.4, 2.8, 0.14, l2w(b, 0, d / 2 + 0.07).x, y0 + 1.8, l2w(b, 0, d / 2 + 0.07).z, b.rotY);
  addWindow(batcher, b, -w / 4, y0 + 3.2, d / 2 + 0.04, 1, 1);
  addWindow(batcher, b, w / 4, y0 + 3.2, d / 2 + 0.04, 1, 1);
  const roof = hipRoofGeo(w + 1.5, d + 1.5, 1.8, 0.7);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.4 + 4.4, b.z);
  batcher.add('roofTile', roof, rm);
  const sp = l2w(b, 0, d / 2 + 0.15, y0 + 4.1);
  addSign(parent, '铃木农场', sp.x, sp.y, sp.z, b.rotY, 3.6, 0.8, { bg: '#7a4a2a', fg: '#f7e9c9' });
  return { interior: 'barn' };
}

function buildGreenhouse(b, batcher, parent, rng) {
  const w = b.w, d = b.d;
  const y0 = terrainHeight(b.x, b.z);
  addBox(batcher, 'stone', w + 0.6, 0.3, d + 0.6, b.x, y0 + 0.15, b.z, b.rotY);
  // 玻璃房
  addBox(batcher, 'glass', w, 2.6, d, b.x, y0 + 0.3 + 1.3, b.z, b.rotY);
  // 框架
  for (let i = -1; i <= 1; i++) {
    addBox(batcher, 'metal', 0.12, 2.7, d + 0.1, l2w(b, i * (w / 3), 0).x, y0 + 1.65, l2w(b, i * (w / 3), 0).z, b.rotY);
  }
  // 圆弧顶
  const roof = hipRoofGeo(w + 0.3, d + 0.3, 0.9, 0.15);
  const rm = new THREE.Matrix4();
  rm.makeRotationY(b.rotY);
  rm.setPosition(b.x, y0 + 0.3 + 2.6, b.z);
  batcher.add('glass', roof, rm);
  const sp = l2w(b, 0, d / 2 + 0.15, y0 + 3.2);
  addSign(parent, '温室', sp.x, sp.y, sp.z, b.rotY, 2.4, 0.7, { bg: '#3f6b4a', fg: '#ffffff' });
  return { interior: 'greenhouse' };
}

const BUILDERS = {
  house: buildHouse,
  shop: (b, ba, pa, rng) => buildShopFront(b, ba, pa, rng, { wall: 'wood', roof: 'roofTile', signBg: '#5d4033' }),
  izakaya: (b, ba, pa, rng) => {
    const r = buildShopFront(b, ba, pa, rng, { wall: 'wood', roof: 'roofTile', signBg: '#7a2f26' });
    // 红灯笼
    const y0 = terrainHeight(b.x, b.z);
    for (const s of [-1, 1]) {
      const p = l2w(b, s * 2.2, b.d / 2 + 1.3);
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff6a4a, toneMapped: false }));
      lantern.position.set(p.x, y0 + 2.9, p.z);
      lantern.scale.y = 1.2;
      pa.add(lantern);
    }
    return r;
  },
  konbini: buildKonbini,
  station: buildStation,
  shrine: buildShrine,
  school: buildSchool,
  post: buildPost,
  apartment: buildApartment,
  barn: buildBarn,
  greenhouse: buildGreenhouse,
};

// 入口交互元数据
export function buildBuilding(b, batcher, parent, colliders) {
  const rng = makeRng(1000 + b.x * 31 + b.z * 7);
  const info = (BUILDERS[b.type] || buildHouse)(b, batcher, parent, rng);
  const door = buildingDoor(b);
  colliders.push({ x: b.x, z: b.z, hw: b.w / 2 + 0.3, hd: b.d / 2 + 0.3, rot: b.rotY, kind: 'building', id: b.id });
  return {
    building: b,
    door,
    interior: info.interior,
    // 室内交互点（由 interiors 提供）
  };
}
