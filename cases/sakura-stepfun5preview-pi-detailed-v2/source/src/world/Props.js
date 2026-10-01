// 街道道具：路灯、电线杆与电线、公交站、路牌、井盖、消防栓等
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, canvasTexture, Tex, rand, TAU, clamp,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import { bench, trashBin, vendingMachine, utilityPole, sign } from './Buildings.js';

const M = () => getMaterials();

/** 路灯 */
/** 灯光光晕精灵（夜间可见） */
function glowSprite(ctx, x, y, z, size, opacity = 0.5) {
  const tex = Tex.glow('#ffd9a0');
  const mat = new THREE.SpriteMaterial({
    map: tex, transparent: true, opacity: 0, depthWrite: false,
    blending: THREE.AdditiveBlending, fog: false,
  });
  const sp = new THREE.Sprite(mat);
  sp.position.set(x, y, z);
  sp.scale.set(size, size, 1);
  ctx.scene.add(sp);
  return sp;
}

export function streetLamp(ctx, x, z, ry = 0, h = 4.2) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addCyl(g, M().steelDark, 0.08, 0.11, h, 0, h / 2, 0, { seg: 6 });
  addBox(g, M().steelDark, 1.1, 0.08, 0.08, 0.5, h - 0.05, 0);
  const bulb = addSphere(g, M().lampGlow, 0.15, 1.0, h - 0.12, 0, { seg: 6 });
  const wx = x + Math.cos(ry) * 1.0, wz = z - Math.sin(ry) * 1.0;
  const sp = glowSprite(ctx, wx, h - 0.12, wz, 4.2, 0.55);
  ctx.lights.push({ mesh: bulb, from: 17.3, to: 5.9 });
  ctx.lights.push({ mesh: sp, from: 17.3, to: 5.9, sprite: true, opacity: 0.55 });
  ctx.scene.add(g);
  return g;
}

/** 电线（悬垂曲线） */
function wire(ctx, a, b, sag = 0.5) {
  const pts = [];
  const N = 8;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t - Math.sin(t * Math.PI) * sag;
    const z = a.z + (b.z - a.z) * t;
    pts.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const geo = new THREE.TubeGeometry(curve, 10, 0.025, 4, false);
  const mesh = new THREE.Mesh(geo, M().steelDark);
  mesh.castShadow = false;
  ctx.scene.add(mesh);
  return mesh;
}

/** 电线杆排 + 电线 */
function poleLine(ctx, pts, { transformerAt = [] } = {}) {
  const tops = [];
  pts.forEach(([x, z], i) => {
    const p = utilityPole(ctx.scene ? dummyGroup(ctx) : ctx.scene, x, z, 8.2, { transformer: transformerAt.includes(i) });
    tops.push({ x, y: 7.0, z });
  });
  for (let i = 0; i < tops.length - 1; i++) {
    wire(ctx, tops[i], tops[i + 1], 0.45);
    wire(ctx, { ...tops[i], y: tops[i].y - 0.9 }, { ...tops[i + 1], y: tops[i + 1].y - 0.9 }, 0.35);
  }
}

// utilityPole 需要 group；这里包一个临时 group 再挂到 scene
function dummyGroup(ctx) {
  const g = new THREE.Group();
  ctx.scene.add(g);
  return g;
}

/** 公交站 */
function busStop(ctx, x, z, ry) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addCyl(g, M().steelDark, 0.07, 0.09, 2.6, -0.7, 1.3, 0, { seg: 6 });
  addBox(g, M().white, 1.4, 0.9, 0.06, 0.2, 2.0, 0);
  const tex = Tex.sign('バス停', { w: 256, h: 128, bg: '#2b3a67', fg: '#f7f3ea', vertical: false });
  const mat = new THREE.MeshToonMaterial({ map: tex });
  mat.gradientMap = M().paper.gradientMap;
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), mat);
  signMesh.position.set(0.2, 2.0, 0.05);
  g.add(signMesh);
  addBox(g, M().wood, 1.6, 0.07, 0.45, 0.9, 0.44, 0);
  addBox(g, M().wood, 1.6, 0.4, 0.06, 0.9, 0.66, -0.2);
  addBox(g, M().steelDark, 0.07, 0.44, 0.42, 0.2, 0.22, 0);
  addBox(g, M().steelDark, 0.07, 0.44, 0.42, 1.6, 0.22, 0);
  // 时刻表
  const tt = Tex.poster('時刻', ['桜町駅前 発', '7:20  8:05  9:15', '17:30 18:40'], { w: 256, h: 320 });
  const ttMat = new THREE.MeshToonMaterial({ map: tt });
  ttMat.gradientMap = M().paper.gradientMap;
  const ttMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.56), ttMat);
  ttMesh.position.set(0.2, 1.45, 0.05);
  g.add(ttMesh);
  ctx.scene.add(g);
  ctx.interactables.push({
    pos: new THREE.Vector3(x + Math.cos(ry) * 0.9, 0.5, z - Math.sin(ry) * 0.9), radius: 1.8,
    label: () => '坐下等车', prompt: () => '坐下等车', enabled: () => true,
    onUse: () => ctx.game.player.sit(new THREE.Vector3(x + Math.cos(ry) * 1.2, 0, z - Math.sin(ry) * 1.2), ry),
  });
  return g;
}

/** 路牌 / 警示牌 */
function roadSign(ctx, x, z, ry, text, bg = '#f7f3ea', fg = '#2b3a67', w = 0.8, h = 0.8, vertical = false) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addCyl(g, M().steelDark, 0.05, 0.05, 1.8, 0, 0.9, 0, { seg: 5 });
  const tex = Tex.sign(text, { w: vertical ? 128 : 256, h: vertical ? 256 : 128, bg, fg, vertical });
  const mat = new THREE.MeshToonMaterial({ map: tex });
  mat.gradientMap = M().paper.gradientMap;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.y = 2.1;
  g.add(mesh);
  ctx.scene.add(g);
  return g;
}

/** 井盖 */
function manhole(ctx, x, z) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 12), M().steelDark);
  m.position.set(x, 0.14, z);
  m.receiveShadow = true;
  ctx.scene.add(m);
}

/** 消防栓 */
function hydrant(ctx, x, z) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  addCyl(g, M().woodRed, 0.12, 0.14, 0.7, 0, 0.35, 0, { seg: 6 });
  addSphere(g, M().woodRed, 0.14, 0, 0.75, 0, { seg: 6 });
  ctx.scene.add(g);
}

/* ==================== 组装 ==================== */

export function buildProps(ctx) {
  const g = new THREE.Group();

  // —— 主街路灯 ——
  for (let z = -14; z <= 80; z += 16) {
    streetLamp(ctx, -5.6, z, 0);
    streetLamp(ctx, 5.6, z + 8, Math.PI);
  }
  // —— 商店街路灯 ——
  for (let x = -50; x <= 50; x += 16) streetLamp(ctx, x, 4.2, 0, 3.8);
  // —— 站前广场 ——
  streetLamp(ctx, -11, -17, Math.PI / 2, 4.0);
  streetLamp(ctx, 11, -17, -Math.PI / 2, 4.0);
  // —— 东纵路 / 道口附近 ——
  for (let z = -34; z <= 30; z += 16) streetLamp(ctx, 45.6, z, Math.PI);
  // —— 西横路 ——
  for (let z = 12; z <= 54; z += 14) streetLamp(ctx, -78.4, z, -Math.PI / 2);
  // —— 住宅区 ——
  for (let x = 50; x <= 88; x += 19) streetLamp(ctx, x, 20.4, 0, 3.8);
  for (let x = 50; x <= 88; x += 19) streetLamp(ctx, x, 38.4, Math.PI, 3.8);
  // —— 神社参道 ——
  for (const [x, z] of [[44, 63], [40, 63], [36, 63]]) streetLamp(ctx, x, z, -Math.PI / 2, 3.6);
  // —— 桥头 ——
  streetLamp(ctx, -80, 26, 0, 4.0);
  streetLamp(ctx, -110, 26, Math.PI, 4.0);
  // —— 公园 ——
  streetLamp(ctx, -6, 30, -Math.PI / 2, 3.6);
  streetLamp(ctx, -36, 40, 0, 3.6);

  // —— 电线杆与电线 ——
  poleLine(ctx, [[-6, -20], [-6, 4], [-6, 28], [-6, 52], [-6, 76]], { transformerAt: [1] });
  poleLine(ctx, [[-52, 5], [-26, 5], [0, 5], [26, 5], [52, 5]], { transformerAt: [2] });
  poleLine(ctx, [[44, -30], [44, -6], [44, 18], [44, 42]], {});
  poleLine(ctx, [[-52, 11], [-74, 11], [-74, 58]], { transformerAt: [0] });
  poleLine(ctx, [[-84, -34], [-84, -10], [-84, 14], [-84, 60], [-84, 100]], {});
  poleLine(ctx, [[44, -66], [-66, -66]], {});

  // —— 公交站 ——
  busStop(ctx, 6, 24, Math.PI);
  busStop(ctx, -6, 34, 0);

  // —— 路牌 ——
  roadSign(ctx, 2.5, -30, Math.PI, '踏切 注意', '#d9a441', '#fff', 1.0, 0.6);
  roadSign(ctx, -2.5, 40, 0, '学校', '#f7f3ea', '#2b3a67', 0.7, 0.9, true);
  roadSign(ctx, 44, -36, 0, '徐行', '#d97a95', '#fff', 0.6, 0.6);
  roadSign(ctx, 0, 78, 0, '稲荷神社 →', '#f7f3ea', '#2b3a67', 1.2, 0.5);
  roadSign(ctx, -78, 36, -Math.PI / 2, '公民館・小学校', '#f7f3ea', '#2b3a67', 1.2, 0.5);

  // —— 井盖 ——
  for (const [x, z] of [[0, -18], [0, 6], [0, 30], [0, 54], [42, 8], [-20, 8], [20, 8], [38, 62]]) manhole(ctx, x, z);

  // —— 消防栓 ——
  hydrant(ctx, -8, 4);
  hydrant(ctx, 8, 20);

  // —— 站前广场售货机 + 垃圾桶 + 长椅 ——
  vendingMachine(g, ctx.interactables, ctx.audio, ctx.game, -12.5, -17.5, Math.PI / 2);
  trashBin(g, 11, -19);
  bench(g, 9, -19.5, Math.PI);
  ctx.interactables.push({
    pos: new THREE.Vector3(9, 0.6, -19.5), radius: 1.8, label: () => '坐下', prompt: () => '坐下休息',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(9, 0, -19.2), Math.PI),
  });

  // —— 住宅前的牛奶箱 ——
  for (const [x, z] of [[64, 23], [80, 21], [60, 43], [78, 43], [50, -47], [-52, -45]]) {
    const box = addBox(g, M().white, 0.3, 0.36, 0.26, x, 0.2, z, { ry: rand(-0.2, 0.2) });
    addBox(g, M().woodRed, 0.32, 0.05, 0.28, x, 0.4, z, { ry: 0 });
  }

  ctx.scene.add(g);
  return {
    group: g,
    update(dt) { /* 街道静态道具无需每帧更新 */ },
  };
}
