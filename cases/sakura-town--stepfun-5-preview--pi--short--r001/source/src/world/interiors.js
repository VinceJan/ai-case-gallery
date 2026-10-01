// 室内场景：每家店/住宅都可进入的紧凑室内
import * as THREE from 'three';
import { MAT, TEX, makeSignTex } from './materials.js';
import { PALETTE } from './palette.js';
import { makeRng, clamp, lerp } from '../core/utils.js';

function box(w, h, d, mat, x, y, z, ry = 0, parent) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = false;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function plane(w, h, mat, x, y, z, ry = 0, parent) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  parent.add(m);
  return m;
}

// 通用房间外壳
function roomShell(scene, w, d, h = 3.3, opts = {}) {
  const floorMat = opts.floorMat || MAT.tatami;
  const wallMat = opts.wallMat || MAT.plaster;
  plane(w, d, floorMat, 0, 0.001, 0, -Math.PI / 2, scene);
  plane(w, d, MAT.white, 0, h, 0, Math.PI / 2, scene);
  // 三面墙 + 带门洞的前墙
  const t = 0.2;
  box(t, h, d, wallMat, -w / 2, h / 2, 0, 0, scene);
  box(t, h, d, wallMat, w / 2, h / 2, 0, 0, scene);
  box(w, h, t, wallMat, 0, h / 2, -d / 2, 0, scene);
  // 前墙（分两段，中间留门）
  const doorW = 1.5;
  box((w - doorW) / 2, h, t, wallMat, -(doorW / 2 + (w - doorW) / 4), h / 2, d / 2, 0, scene);
  box((w - doorW) / 2, h, t, wallMat, (doorW / 2 + (w - doorW) / 4), h / 2, d / 2, 0, scene);
  box(doorW, h - 2.2, t, wallMat, 0, 2.2 + (h - 2.2) / 2, d / 2, 0, scene);
  // 窗户（透光）
  const winMat = new THREE.MeshBasicMaterial({ color: 0xbfd9ea, toneMapped: false });
  plane(1.5, 1.1, winMat, -w / 2 + 0.06, 1.8, -1, Math.PI / 2, scene);
  plane(1.5, 1.1, winMat, w / 2 - 0.06, 1.8, -1, -Math.PI / 2, scene);
  return { winMat };
}

function lightRoom(scene, w, d) {
  const hemi = new THREE.HemisphereLight(0xfff2dd, 0xa8a294, 1.5);
  scene.add(hemi);
  const p1 = new THREE.PointLight(0xffe8c8, 18, 15, 1.8);
  p1.position.set(0, 2.8, 0);
  scene.add(p1);
  const p2 = new THREE.PointLight(0xfff0d8, 10, 13, 1.8);
  p2.position.set(-w / 3, 2.6, d / 3);
  scene.add(p2);
  // 天花灯（视觉）
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xfff6e0, toneMapped: false });
  const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.35, 16), lampMat);
  lamp.position.set(0, 3.22, 0);
  lamp.rotation.x = Math.PI / 2;
  scene.add(lamp);
  return { hemi, p1, p2, lampMat };
}

// ---------- 各类室内 ----------
function interiorHouse(scene, b) {
  const w = b.w - 1.4, d = b.d - 1.4;
  const sh = roomShell(scene, w, d, 3.3, { floorMat: MAT.tatami, wallMat: MAT.noren });
  lightRoom(scene, w, d);
  const rng = makeRng(b.x * 13 + b.z);
  // 矮桌 + 坐垫
  box(1.6, 0.1, 1.0, MAT.wood, 0, 0.38, 0.4, 0, scene);
  for (const [lx, lz] of [[-0.7, 0.05], [0.7, 0.05], [-0.7, 0.75], [0.7, 0.75]]) box(0.08, 0.36, 0.08, MAT.woodPlain, lx, 0.18, lz, 0, scene);
  for (const [cx, cz] of [[-1.2, 0.3], [1.2, 0.3]]) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 12), MAT.fabric);
    c.position.set(cx, 0.07, cz);
    scene.add(c);
  }
  // 茶具
  for (const s of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.09, 10), MAT.whitePlain);
    cup.position.set(s * 0.35, 0.47, 0.4);
    scene.add(cup);
  }
  // 电视柜 + 电视
  box(1.4, 0.5, 0.45, MAT.wood, -w / 2 + 1.1, 0.25, -d / 2 + 0.5, 0, scene);
  box(1.1, 0.7, 0.1, MAT.black, -w / 2 + 1.1, 0.85, -d / 2 + 0.42, 0, scene);
  // 厨房
  box(2.4, 0.85, 0.6, MAT.wood, w / 2 - 1.5, 0.43, -d / 2 + 0.45, 0, scene);
  box(0.7, 1.7, 0.6, MAT.metal, w / 2 - 0.7, 0.85, -d / 2 + 0.45, 0, scene); // 冰箱
  // 床
  box(1.9, 0.35, 1.0, MAT.wood, -w / 2 + 1.4, 0.2, d / 2 - 1.3, 0, scene);
  box(1.7, 0.14, 0.85, MAT.fabric, -w / 2 + 1.4, 0.44, d / 2 - 1.3, 0, scene);
  box(0.5, 0.12, 0.3, MAT.white, -w / 2 + 1.4, 0.57, d / 2 - 0.95, 0, scene);
  // 架子上摆书和花瓶
  box(1.8, 0.08, 0.35, MAT.wood, w / 2 - 1.2, 1.4, -d / 2 + 0.4, 0, scene);
  for (let i = 0; i < 5; i++) box(0.1, 0.3, 0.26, MAT.fabric, w / 2 - 1.8 + i * 0.22, 1.6, -d / 2 + 0.4, 0, scene);
  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.4, 10), MAT.whitePlain);
  vase.position.set(w / 2 - 0.6, 1.65, -d / 2 + 0.4);
  scene.add(vase);
  // 瓶中樱枝
  for (let i = 0; i < 3; i++) {
    const br = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 5), MAT.sakuraTrunk);
    br.position.set(w / 2 - 0.6 + (i - 1) * 0.08, 1.95, -d / 2 + 0.4);
    br.rotation.z = (i - 1) * 0.4;
    scene.add(br);
    const bl = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12, 0), MAT.sakura);
    bl.position.set(w / 2 - 0.6 + (i - 1) * 0.16, 2.2, -d / 2 + 0.4);
    scene.add(bl);
  }
  // 障子门（背面，微光）
  plane(2.2, 2.0, new THREE.MeshBasicMaterial({ color: 0xf5ecd8, toneMapped: false }), 0, 1.5, -d / 2 + 0.12, 0, scene);
  for (let i = 0; i < 3; i++) box(0.03, 2.0, 0.03, MAT.woodPlain, -0.73 + i * 0.73, 1.5, -d / 2 + 0.14, 0, scene);
  const interactions = [
    { type: 'bed', pos: new THREE.Vector3(-w / 2 + 1.4, 0, d / 2 - 1.3), radius: 1.6, label: '睡觉到早上' },
    { type: 'sit', pos: new THREE.Vector3(-1.2, 0, 0.3), radius: 1.1, label: '坐下来喝茶' },
    { type: 'sit', pos: new THREE.Vector3(1.2, 0, 0.3), radius: 1.1, label: '坐下来喝茶' },
    { type: 'look', pos: new THREE.Vector3(-w / 2 + 1.1, 0, -d / 2 + 0.5), radius: 1.2, label: '看电视' },
    { type: 'look', pos: new THREE.Vector3(w / 2 - 1.2, 0, -d / 2 + 0.4), radius: 1.2, label: '看看书架' },
  ];
  return interactions;
}

function interiorKonbini(scene, b) {
  const w = b.w - 1.2, d = b.d - 1.2;
  roomShell(scene, w, d, 3.2, { floorMat: MAT.stone, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  // 货架（沿墙）+ 商品盒
  const goods = [0xe0544a, 0x4a7fb5, 0x5f9e6e, 0xd9a441, 0x9a6fb0, 0xe8e4da];
  const goodsMat = goods.map((c) => new THREE.MeshToonMaterial({ color: c }));
  for (const [sx, sz, rot] of [[-1, 0, Math.PI / 2], [1, 0, -Math.PI / 2], [0, -1, 0]]) {
    const shelfX = sx * (w / 2 - 0.55), shelfZ = sz * (d / 2 - 0.55);
    for (let f = 0; f < 3; f++) {
      box(0.5, 0.06, w - 1.4, MAT.metal, shelfX, 0.55 + f * 0.62, sz === 0 ? 0 : shelfZ, rot, scene);
      if (sz === 0) box(0.5, 0.06, d - 1.4, MAT.metal, shelfX, 0.55 + f * 0.62, 0, rot, scene);
      for (let i = 0; i < 6; i++) {
        const g = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.3, 0.26), goodsMat[(i + f) % goods.length]);
        const off = (i - 2.5) * ((sz === 0 ? d : w) - 2) / 5.5;
        if (sz === 0) g.position.set(shelfX, 0.75 + f * 0.62, off);
        else g.position.set(off, 0.75 + f * 0.62, shelfZ);
        scene.add(g);
      }
    }
  }
  // 收银台
  box(2.6, 1.0, 0.8, MAT.wood, 0, 0.5, 1.2, 0, scene);
  box(0.5, 0.35, 0.4, MAT.black, 0.4, 1.15, 1.2, 0, scene); // 收银机
  // 热食柜（发光）
  const hotMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false });
  box(1.8, 1.2, 0.7, MAT.metal, -1.6, 0.9, 1.2, 0, scene);
  box(1.6, 0.9, 0.1, hotMat, -1.6, 1.0, 1.56, 0, scene);
  // 杂志架
  box(1.2, 0.9, 0.35, MAT.wood, w / 2 - 1.4, 0.45, -1.6, 0, scene);
  const interactions = [
    { type: 'shop', pos: new THREE.Vector3(0, 0, 1.6), radius: 2.0, label: '购买商品', data: { buildingId: b.id } },
    { type: 'look', pos: new THREE.Vector3(-1.6, 0, 1.6), radius: 1.2, label: '看看热食' },
    { type: 'look', pos: new THREE.Vector3(w / 2 - 1.4, 0, -1.6), radius: 1.2, label: '翻翻杂志' },
  ];
  return interactions;
}

function interiorShop(scene, b) {
  const w = b.w - 1.2, d = b.d - 1.2;
  roomShell(scene, w, d, 3.2, { floorMat: MAT.wood, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  const kind = b.id;
  if (kind === 'shop_cafe') {
    // 咖啡店：小桌 + 椅子
    for (const [tx, tz] of [[-1.8, 0.2], [1.8, 0.2], [-1.8, -1.6], [1.8, -1.6]]) {
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 14), MAT.wood);
      top.position.set(tx, 0.72, tz);
      scene.add(top);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.72, 8), MAT.metal);
      leg.position.set(tx, 0.36, tz);
      scene.add(leg);
      const chair = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.45, 0.42), MAT.fabric);
      chair.position.set(tx, 0.22, tz - 0.75);
      scene.add(chair);
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.1, 10), MAT.whitePlain);
      cup.position.set(tx, 0.81, tz);
      scene.add(cup);
    }
    // 吧台
    box(3.4, 1.05, 0.7, MAT.wood, 0, 0.52, -d / 2 + 0.6, 0, scene);
    box(3.0, 0.5, 0.3, MAT.metal, 0, 1.2, -d / 2 + 0.55, 0, scene); // 咖啡机
    // 菜单板
    plane(1.6, 1.0, new THREE.MeshBasicMaterial({ map: makeSignTex('木漏日\n咖啡·茶', { w: 256, h: 160, bg: '#3a2f2a', fg: '#f7e9c9' }), toneMapped: false }), -w / 2 + 0.1, 1.8, 0, Math.PI / 2, scene);
    return [
      { type: 'shop', pos: new THREE.Vector3(0, 0, -d / 2 + 1.0), radius: 2.0, label: '点单', data: { buildingId: b.id } },
      { type: 'sit', pos: new THREE.Vector3(-1.8, 0, -0.5), radius: 1.2, label: '坐下喝咖啡' },
      { type: 'sit', pos: new THREE.Vector3(1.8, 0, -0.5), radius: 1.2, label: '坐下喝咖啡' },
      { type: 'sit', pos: new THREE.Vector3(-1.8, 0, -2.3), radius: 1.2, label: '坐下休息' },
      { type: 'sit', pos: new THREE.Vector3(1.8, 0, -2.3), radius: 1.2, label: '坐下休息' },
    ];
  }
  if (kind === 'shop_bakery') {
    // 面包柜
    box(3.6, 1.1, 0.7, MAT.wood, 0, 0.55, -d / 2 + 0.7, 0, scene);
    const breadMat = new THREE.MeshToonMaterial({ color: 0xd9a45a });
    for (let i = 0; i < 7; i++) {
      const bread = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), breadMat);
      bread.position.set(-1.5 + i * 0.5, 1.2, -d / 2 + 0.7);
      bread.scale.y = 0.7;
      scene.add(bread);
    }
    box(1.4, 1.0, 0.7, MAT.metal, -w / 2 + 1.0, 0.5, 1.4, 0, scene); // 烤箱
    plane(1.4, 0.9, new THREE.MeshBasicMaterial({ map: makeSignTex('刚出炉', { w: 256, h: 160, bg: '#7a4a2a', fg: '#ffe9c9' }), toneMapped: false }), w / 2 - 0.1, 1.8, 0, -Math.PI / 2, scene);
    return [
      { type: 'shop', pos: new THREE.Vector3(0, 0, -d / 2 + 1.1), radius: 2.0, label: '购买面包', data: { buildingId: b.id } },
      { type: 'look', pos: new THREE.Vector3(-w / 2 + 1.0, 0, 1.4), radius: 1.2, label: '看看烤箱' },
    ];
  }
  if (kind === 'shop_books') {
    // 书架墙
    for (let f = 0; f < 4; f++) {
      box(0.35, 0.05, w - 1.2, MAT.wood, -w / 2 + 0.5, 0.5 + f * 0.62, -1.2, 0, scene);
      for (let i = 0; i < 8; i++) {
        const bk = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.34, 0.16), new THREE.MeshToonMaterial({ color: [0x8a4a5a, 0x4a6b8a, 0x6b8a4a, 0x8a7a4a][i % 4] }));
        bk.position.set(-w / 2 + 0.5, 0.72 + f * 0.62, -2.2 + i * 0.28);
        scene.add(bk);
      }
    }
    box(1.8, 0.9, 0.6, MAT.wood, 0, 0.45, 1.4, 0, scene);
    return [
      { type: 'shop', pos: new THREE.Vector3(0, 0, 1.8), radius: 2.0, label: '购买书籍杂货', data: { buildingId: b.id } },
      { type: 'look', pos: new THREE.Vector3(-w / 2 + 0.8, 0, -1.2), radius: 1.4, label: '看看书架' },
    ];
  }
  // 杂货铺 / 居酒屋
  if (kind === 'shop_izakaya') {
    // 吧台 + 高脚凳
    box(3.8, 1.05, 0.65, MAT.wood, 0, 0.52, -d / 2 + 0.7, 0, scene);
    for (const sx of [-1.2, 0, 1.2]) {
      const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.62, 10), MAT.woodPlain);
      stool.position.set(sx, 0.31, -d / 2 + 1.6);
      scene.add(stool);
    }
    // 灯笼
    for (const sx of [-1.5, 0, 1.5]) {
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff7a5a, toneMapped: false }));
      l.position.set(sx, 2.4, -d / 2 + 1.0);
      l.scale.y = 1.15;
      scene.add(l);
    }
    // 暖帘
    plane(1.6, 0.7, MAT.noren, 0, 2.55, d / 2 - 0.15, Math.PI, scene);
    return [
      { type: 'shop', pos: new THREE.Vector3(0, 0, -d / 2 + 1.2), radius: 2.2, label: '点单', data: { buildingId: b.id } },
      { type: 'sit', pos: new THREE.Vector3(-1.2, 0, -d / 2 + 1.6), radius: 1.0, label: '坐下喝一杯' },
      { type: 'sit', pos: new THREE.Vector3(1.2, 0, -d / 2 + 1.6), radius: 1.0, label: '坐下喝一杯' },
    ];
  }
  // 千岁屋杂货铺
  for (let f = 0; f < 3; f++) {
    box(0.4, 0.05, w - 1.6, MAT.wood, -w / 2 + 0.6, 0.5 + f * 0.7, 0.8, 0, scene);
    box(0.4, 0.05, d - 2.2, MAT.wood, w / 2 - 0.6, 0.5 + f * 0.7, 0, 0, scene);
  }
  const charmMat = new THREE.MeshToonMaterial({ color: 0xd96f4a });
  for (let i = 0; i < 5; i++) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.05), charmMat);
    c.position.set(-w / 2 + 0.6, 0.68 + (i % 3) * 0.7, -0.6 + i * 0.7);
    scene.add(c);
  }
  box(2.2, 0.95, 0.7, MAT.wood, 0, 0.48, 1.6, 0, scene);
  return [
    { type: 'shop', pos: new THREE.Vector3(0, 0, 2.0), radius: 2.0, label: '购买杂货', data: { buildingId: b.id } },
    { type: 'look', pos: new THREE.Vector3(-w / 2 + 0.8, 0, 0.8), radius: 1.3, label: '看看货架' },
  ];
}

function interiorPost(scene, b) {
  const w = b.w - 1.2, d = b.d - 1.2;
  roomShell(scene, w, d, 3.2, { floorMat: MAT.stone, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  box(3.0, 1.05, 0.7, MAT.wood, 0, 0.52, 0.8, 0, scene);
  // 邮筒墙
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      box(0.34, 0.4, 0.3, MAT.metal, -1.6 + c * 0.64, 1.1 + r * 0.5, -d / 2 + 0.5, 0, scene);
    }
  }
  // 秤
  box(0.5, 0.12, 0.5, MAT.metal, w / 2 - 1.2, 0.06, 1.4, 0, scene);
  return [
    { type: 'look', pos: new THREE.Vector3(0, 0, 1.3), radius: 1.8, label: '寄封信' },
    { type: 'look', pos: new THREE.Vector3(-1.6, 0, -d / 2 + 0.8), radius: 1.6, label: '看看邮箱' },
  ];
}

function interiorSchool(scene, b) {
  const w = b.w - 2, d = b.d - 2;
  roomShell(scene, w, d, 3.4, { floorMat: MAT.wood, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  // 课桌
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      const x = -3.5 + c * 1.75, z = -1.5 + r * 1.6;
      box(0.8, 0.07, 0.55, MAT.wood, x, 0.68, z, 0, scene);
      box(0.07, 0.68, 0.07, MAT.metal, x - 0.34, 0.34, z - 0.22, 0, scene);
      box(0.07, 0.68, 0.07, MAT.metal, x + 0.34, 0.34, z - 0.22, 0, scene);
      const chair = box(0.42, 0.42, 0.4, MAT.fabric, x, 0.21, z + 0.55, 0, scene);
    }
  }
  // 黑板
  box(4.0, 1.2, 0.08, MAT.black, 0, 1.9, -d / 2 + 0.2, 0, scene);
  // 讲台
  box(1.4, 0.2, 0.7, MAT.wood, 0, 0.1, -d / 2 + 1.1, 0, scene);
  return [
    { type: 'look', pos: new THREE.Vector3(0, 0, -d / 2 + 1.4), radius: 1.8, label: '看看教室' },
    { type: 'sit', pos: new THREE.Vector3(-1.75, 0, -0.9), radius: 1.1, label: '坐在课桌前' },
    { type: 'sit', pos: new THREE.Vector3(1.75, 0, -0.9), radius: 1.1, label: '坐在课桌前' },
  ];
}

function interiorStation(scene, b) {
  const w = b.w - 1.6, d = b.d - 1.4;
  roomShell(scene, w, d, 3.6, { floorMat: MAT.stone, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  // 长椅
  for (const sx of [-2, 0, 2]) {
    box(1.6, 0.1, 0.5, MAT.wood, sx, 0.45, 1.6, 0, scene);
    box(1.6, 0.45, 0.1, MAT.wood, sx, 0.22, 1.85, 0, scene);
  }
  // 自动售票机
  box(1.0, 1.6, 0.5, MAT.metal, -w / 2 + 1.0, 0.8, -d / 2 + 0.6, 0, scene);
  box(0.7, 0.5, 0.06, new THREE.MeshBasicMaterial({ color: 0x9ad0e0, toneMapped: false }), -w / 2 + 1.0, 1.2, -d / 2 + 0.36, 0, scene);
  // 检票口
  for (const sx of [-0.6, 0.6]) box(0.16, 1.2, 0.3, MAT.metal, sx, 0.6, -1.2, 0, scene);
  box(1.4, 0.16, 0.3, MAT.metal, 0, 1.25, -1.2, 0, scene);
  // 方向牌
  plane(2.4, 0.6, new THREE.MeshBasicMaterial({ map: makeSignTex('← 城市方面', { w: 384, h: 96, bg: '#2e4a6b', fg: '#ffffff' }), toneMapped: false }), 0, 2.9, d / 2 - 0.15, Math.PI, scene);
  return [
    { type: 'look', pos: new THREE.Vector3(0, 0, -1.4), radius: 1.6, label: '通过检票口' },
    { type: 'sit', pos: new THREE.Vector3(-2, 0, 1.4), radius: 1.2, label: '坐下等车' },
    { type: 'sit', pos: new THREE.Vector3(2, 0, 1.4), radius: 1.2, label: '坐下等车' },
  ];
}

function interiorShrine(scene, b) {
  const w = b.w - 1.6, d = b.d - 1.6;
  roomShell(scene, w, d, 3.4, { floorMat: MAT.wood, wallMat: MAT.wood });
  lightRoom(scene, w, d);
  // 供纳箱
  box(1.6, 0.9, 0.7, MAT.woodPlain, 0, 0.45, 1.4, 0, scene);
  box(1.4, 0.06, 0.1, MAT.black, 0, 0.93, 1.12, 0, scene);
  // 神坛
  box(2.0, 1.0, 0.8, MAT.wood, 0, 0.5, -d / 2 + 0.9, 0, scene);
  // 注连绳
  const rope = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 8, 20), MAT.rice);
  rope.position.set(0, 2.6, -d / 2 + 1.0);
  scene.add(rope);
  // 灯笼
  for (const sx of [-1.5, 1.5]) {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.5, 8), new THREE.MeshBasicMaterial({ color: 0xfff0c8, toneMapped: false }));
    l.position.set(sx, 1.6, -d / 2 + 0.6);
    scene.add(l);
    box(0.1, 0.8, 0.1, MAT.woodPlain, sx, 2.2, -d / 2 + 0.6, 0, scene);
  }
  // 绘马架
  box(1.8, 0.06, 0.3, MAT.wood, -w / 2 + 1.0, 1.5, -0.5, 0, scene);
  for (let i = 0; i < 4; i++) {
    box(0.3, 0.22, 0.04, MAT.fabric, -w / 2 + 0.5 + i * 0.35, 1.62, -0.5, 0, scene);
  }
  return [
    { type: 'pray', pos: new THREE.Vector3(0, 0, 1.4), radius: 1.8, label: '拜一拜' },
    { type: 'look', pos: new THREE.Vector3(-w / 2 + 1.0, 0, -0.5), radius: 1.3, label: '看看绘马' },
  ];
}

function interiorApartment(scene, b) {
  const w = b.w - 1.2, d = b.d - 1.2;
  roomShell(scene, w, d, 3.0, { floorMat: MAT.stone, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  // 信箱墙
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      box(0.3, 0.36, 0.26, MAT.metal, -1.5 + c * 0.55, 1.0 + r * 0.45, -d / 2 + 0.4, 0, scene);
    }
  }
  // 几扇门
  for (const sx of [-1.5, 0, 1.5]) box(0.8, 2.1, 0.12, MAT.woodPlain, sx, 1.05, d / 2 - 0.2, 0, scene);
  // 盆栽
  for (const sx of [-2.5, 2.5]) {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.3, 8), MAT.stonePlain);
    pot.position.set(sx, 0.15, 1.5);
    scene.add(pot);
    const plant = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), MAT.leaf);
    plant.position.set(sx, 0.5, 1.5);
    scene.add(plant);
  }
  return [
    { type: 'look', pos: new THREE.Vector3(-1.5, 0, -d / 2 + 0.7), radius: 1.5, label: '看看信箱' },
    { type: 'look', pos: new THREE.Vector3(0, 0, 1.8), radius: 1.5, label: '敲门看看' },
  ];
}

function interiorBarn(scene, b) {
  const w = b.w - 1.2, d = b.d - 1.2;
  roomShell(scene, w, d, 3.6, { floorMat: MAT.soil, wallMat: MAT.wood });
  lightRoom(scene, w, d);
  // 干草捆
  for (const [hx, hz] of [[-2.5, -1.5], [-2.5, 0], [-1.4, -0.7]]) {
    const hay = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.0, 10), new THREE.MeshToonMaterial({ color: 0xd9c05a }));
    hay.rotation.z = Math.PI / 2;
    hay.position.set(hx, 0.5, hz);
    scene.add(hay);
  }
  // 农具
  box(0.1, 1.6, 0.1, MAT.woodPlain, 2.5, 0.8, -1.5, 0, scene);
  box(0.7, 0.1, 0.1, MAT.metal, 2.5, 1.5, -1.5, 0, scene);
  // 菜筐
  for (let i = 0; i < 3; i++) {
    const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.35, 10), MAT.wood);
    basket.position.set(1.5 + i * 0.8, 0.18, 1.8);
    scene.add(basket);
    const veg = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), MAT.leaf);
    veg.position.set(1.5 + i * 0.8, 0.4, 1.8);
    scene.add(veg);
  }
  return [
    { type: 'look', pos: new THREE.Vector3(-2.5, 0, -0.7), radius: 1.8, label: '看看干草' },
    { type: 'look', pos: new THREE.Vector3(1.9, 0, 1.8), radius: 1.5, label: '看看蔬菜' },
  ];
}

function interiorGreenhouse(scene, b) {
  const w = b.w - 1, d = b.d - 1;
  roomShell(scene, w, d, 3.0, { floorMat: MAT.soil, wallMat: MAT.plaster });
  lightRoom(scene, w, d);
  // 苗床
  for (let r = 0; r < 2; r++) {
    box(w - 1, 0.5, 0.9, MAT.wood, 0, 0.25, -1 + r * 2.2, 0, scene);
    for (let i = 0; i < 6; i++) {
      const sprout = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), MAT.leaf);
      sprout.position.set(-2.5 + i * 1.0, 0.6, -1 + r * 2.2);
      scene.add(sprout);
    }
  }
  return [
    { type: 'look', pos: new THREE.Vector3(0, 0, 0.6), radius: 1.8, label: '看看育苗' },
  ];
}

const INTERIORS = {
  house: interiorHouse,
  konbini: interiorKonbini,
  shop: interiorShop,
  post: interiorPost,
  school: interiorSchool,
  station: interiorStation,
  shrine: interiorShrine,
  apartment: interiorApartment,
  barn: interiorBarn,
  greenhouse: interiorGreenhouse,
};

// 构建（并缓存）室内场景
export function buildInterior(building) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1620);
  const fn = INTERIORS[building.interior] || interiorHouse;
  const interactions = fn(scene, building.building) || [];
  // 出口（门内侧）
  const exitPos = new THREE.Vector3(0, 0, (building.building.d - 1.4) / 2 - 0.6);
  interactions.push({ type: 'exit', pos: exitPos, radius: 1.4, label: '回到小镇' });
  return { scene, interactions, exitPos };
}
