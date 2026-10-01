// 道具：树、路灯、电线杆、自动售货机、长椅、鸟居、石灯笼、公交站、车、电车、猫、祭典摊位
import * as THREE from 'three';
import { MAT, TEX, makeSignTex } from './materials.js';
import { PALETTE } from './palette.js';
import { terrainHeight } from './layout.js';
import { makeRng, lerp } from '../core/utils.js';

function yAt(x, z) { return terrainHeight(x, z); }

// ---------------- 植物 ----------------
export function sakuraTree(scale = 1, rng = Math.random) {
  const g = new THREE.Group();
  const h = (3.2 + rng() * 1.4) * scale;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * scale, 0.26 * scale, h, 7), MAT.sakuraTrunk);
  trunk.position.y = h / 2;
  trunk.castShadow = true;
  g.add(trunk);
  // 枝
  const branches = 3 + Math.floor(rng() * 3);
  for (let i = 0; i < branches; i++) {
    const a = rng() * Math.PI * 2;
    const bl = (0.9 + rng() * 0.7) * scale;
    const br = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * scale, 0.09 * scale, bl, 5), MAT.sakuraTrunk);
    br.position.set(Math.cos(a) * bl * 0.3, h * 0.75, Math.sin(a) * bl * 0.3);
    br.rotation.z = -Math.cos(a) * 0.7;
    br.rotation.x = Math.sin(a) * 0.7;
    br.castShadow = true;
    g.add(br);
  }
  // 花团（CEL 风：几个大色块球）
  const clusters = 4 + Math.floor(rng() * 3);
  const blossomMat = rng() > 0.5 ? MAT.sakura : MAT.sakuraDeep;
  for (let i = 0; i < clusters; i++) {
    const a = rng() * Math.PI * 2;
    const r = (0.5 + rng() * 0.9) * scale;
    const c = new THREE.Mesh(new THREE.IcosahedronGeometry((0.75 + rng() * 0.5) * scale, 0), blossomMat);
    c.position.set(Math.cos(a) * r, h * 0.82 + rng() * 0.7 * scale, Math.sin(a) * r);
    c.castShadow = true;
    g.add(c);
    // 深色内芯增加层次
    const c2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42 * scale, 0), MAT.sakuraDeep);
    c2.position.set(Math.cos(a) * r * 0.8, h * 0.82 + rng() * 0.5 * scale, Math.sin(a) * r * 0.8);
    g.add(c2);
  }
  // 树下落英
  for (let i = 0; i < 5; i++) {
    const a = rng() * Math.PI * 2;
    const r = (0.8 + rng() * 1.1) * scale;
    const p = new THREE.Mesh(new THREE.CircleGeometry(0.22 * scale, 6), MAT.sakuraDeep);
    p.rotation.x = -Math.PI / 2;
    p.rotation.z = rng() * 3;
    p.position.set(Math.cos(a) * r, 0.03, Math.sin(a) * r);
    g.add(p);
  }
  return g;
}

export function pineTree(scale = 1, rng = Math.random) {
  const g = new THREE.Group();
  const h = (4 + rng() * 1.5) * scale;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * scale, 0.2 * scale, h * 0.4, 6), MAT.sakuraTrunk);
  trunk.position.y = h * 0.2;
  trunk.castShadow = true;
  g.add(trunk);
  for (let i = 0; i < 3; i++) {
    const r = (1.5 - i * 0.4) * scale;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h * 0.45, 7), i % 2 ? MAT.maple : MAT.leaf);
    cone.position.y = h * 0.45 + i * h * 0.22;
    cone.castShadow = true;
    g.add(cone);
  }
  return g;
}

export function bush(scale = 1) {
  const g = new THREE.Group();
  const c = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 * scale, 0), MAT.leaf);
  c.position.y = 0.4 * scale;
  c.scale.y = 0.8;
  c.castShadow = true;
  g.add(c);
  return g;
}

export function flowerPatch(rng = Math.random) {
  const g = new THREE.Group();
  const cols = [0xffb7c5, 0xfff0a0, 0xffffff, 0xb0a0e0];
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.09, 5),
      new THREE.MeshBasicMaterial({ color: cols[Math.floor(rng() * cols.length)], toneMapped: false, side: THREE.DoubleSide }));
    m.rotation.x = -Math.PI / 2;
    m.position.set((rng() - 0.5) * 1.2, 0.04, (rng() - 0.5) * 1.2);
    g.add(m);
  }
  return g;
}

// ---------------- 街道设施 ----------------
export function streetLamp() {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 4.4, 6), MAT.pole);
  pole.position.y = 2.2;
  pole.castShadow = true;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.09, 0.09), MAT.pole);
  arm.position.set(0.4, 4.35, 0);
  g.add(arm);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.26), MAT.lampOn);
  head.position.set(0.8, 4.28, 0);
  g.add(head);
  return g;
}

export function utilityPole(withWires = true) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.15, 6.5, 6), MAT.pole);
  pole.position.y = 3.25;
  pole.castShadow = true;
  g.add(pole);
  for (const y of [5.3, 4.7]) {
    const cross = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.08), MAT.pole);
    cross.position.y = y;
    g.add(cross);
  }
  return g;
}

// 电线（相邻电线杆之间的悬链线）
export function wireBetween(p1, p2, sag = 0.8) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(p1.x, p1.y, p1.z),
    new THREE.Vector3((p1.x + p2.x) / 2, Math.min(p1.y, p2.y) - sag, (p1.z + p2.z) / 2),
    new THREE.Vector3(p2.x, p2.y, p2.z)
  );
  const geo = new THREE.TubeGeometry(curve, 12, 0.035, 4, false);
  return new THREE.Mesh(geo, MAT.black);
}

export function vendingMachine() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.8, 0.55), MAT.vending);
  body.position.y = 0.9;
  body.castShadow = true;
  g.add(body);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2),
    new THREE.MeshBasicMaterial({ map: makeSignTex('冷·饮', { w: 256, h: 384, bg: '#d0453f', fg: '#ffffff', font: 'bold 90px "Hiragino Sans","Microsoft YaHei",sans-serif' }), toneMapped: false }));
  face.position.set(0, 1.05, 0.29);
  g.add(face);
  const slot = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.06), MAT.black);
  slot.position.set(0, 0.28, 0.3);
  g.add(slot);
  return g;
}

export function bench(rotY = 0) {
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.09, 0.55), MAT.wood);
  seat.position.y = 0.45;
  seat.castShadow = true;
  g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.08), MAT.wood);
  back.position.set(0, 0.72, -0.24);
  g.add(back);
  for (const sx of [-0.8, 0.8]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.45, 0.5), MAT.metal);
    leg.position.set(sx, 0.22, 0);
    g.add(leg);
  }
  g.rotation.y = rotY;
  return g;
}

export function torii(scale = 1) {
  const g = new THREE.Group();
  const w = 3.4 * scale, h = 3.6 * scale;
  for (const sx of [-1, 1]) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * scale, 0.2 * scale, h, 10), MAT.torii);
    pillar.position.set(sx * w / 2, h / 2, 0);
    pillar.castShadow = true;
    g.add(pillar);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(w + 1.1 * scale, 0.22 * scale, 0.42 * scale), MAT.torii);
  top.position.y = h + 0.16 * scale;
  g.add(top);
  const top2 = new THREE.Mesh(new THREE.BoxGeometry(w + 0.7 * scale, 0.14 * scale, 0.3 * scale), MAT.toriiDark);
  top2.position.y = h - 0.12 * scale;
  g.add(top2);
  const mid = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2 * scale, 0.18 * scale, 0.24 * scale), MAT.torii);
  mid.position.y = h * 0.62;
  g.add(mid);
  return g;
}

export function stoneLantern() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.3, 6), MAT.stonePlain);
  base.position.y = 0.15;
  g.add(base);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.9, 6), MAT.stonePlain);
  post.position.y = 0.75;
  g.add(post);
  const box_ = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), MAT.stonePlain);
  box_.position.y = 1.4;
  g.add(box_);
  const light = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), MAT.lantern);
  light.position.y = 1.4;
  light.name = 'lanternLight';
  g.add(light);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.3, 4), MAT.stonePlain);
  roof.position.y = 1.72;
  roof.rotation.y = Math.PI / 4;
  g.add(roof);
  return g;
}

export function busStop() {
  const g = new THREE.Group();
  for (const sx of [-0.9, 0.9]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.4, 0.1), MAT.metal);
    post.position.set(sx, 1.2, -0.5);
    g.add(post);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.2), MAT.roofBlue);
  roof.position.y = 2.45;
  roof.castShadow = true;
  g.add(roof);
  const glassB = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.0, 0.05), MAT.glass);
  glassB.position.set(0, 1.9, -0.5);
  g.add(glassB);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5),
    new THREE.MeshBasicMaterial({ map: makeSignTex('巴士站', { w: 256, h: 160, bg: '#2e6b4a', fg: '#ffffff' }), toneMapped: false }));
  sign.position.set(0, 2.0, 0.05);
  g.add(sign);
  return g;
}

export function emaRack() {
  const g = new THREE.Group();
  for (const sx of [-0.8, 0.8]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.08), MAT.woodPlain);
    post.position.set(sx, 0.7, 0);
    g.add(post);
  }
  for (const y of [0.9, 1.3]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.05), MAT.woodPlain);
    bar.position.y = y;
    g.add(bar);
  }
  for (let i = 0; i < 5; i++) {
    const ema = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.2, 0.03),
      new THREE.MeshToonMaterial({ color: [0xd96f4a, 0x4a7fb5, 0x5f9e6e, 0xd9a441, 0xc94f6d][i] }));
    ema.position.set(-0.7 + i * 0.35, 1.05, 0.03);
    g.add(ema);
  }
  return g;
}

// ---------------- 车辆 ----------------
export function car(color = 0x8a97a8) {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshToonMaterial({ color });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 3.6), bodyMat);
  body.position.y = 0.62;
  body.castShadow = true;
  g.add(body);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.5, 1.9), MAT.glass);
  cabin.position.set(0, 1.05, -0.15);
  g.add(cabin);
  for (const [wx, wz] of [[-0.82, 1.15], [0.82, 1.15], [-0.82, -1.15], [0.82, -1.15]]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 10), MAT.tire);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(wx, 0.3, wz);
    g.add(wheel);
  }
  for (const sx of [-0.55, 0.55]) {
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.06), MAT.lampOn);
    light.position.set(sx, 0.66, 1.82);
    g.add(light);
  }
  return g;
}

export function trainCar() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.9, 18), MAT.trainBody);
  body.position.y = 1.75;
  body.castShadow = true;
  g.add(body);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.84, 0.5, 18.1), MAT.trainStripe);
  stripe.position.y = 1.5;
  g.add(stripe);
  // 车窗带
  for (const sx of [-1, 1]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 15.5), MAT.windowLit);
    win.position.set(sx * 1.42, 2.4, 0);
    g.add(win);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.3, 16), MAT.metal);
  roof.position.y = 3.35;
  g.add(roof);
  // 车头斜面
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 2.2, 12, 1, false, -Math.PI / 2.6, Math.PI / 1.3), MAT.trainBody);
  nose.rotation.z = Math.PI / 2;
  nose.rotation.y = Math.PI / 2;
  nose.position.set(0, 1.75, 9.4);
  nose.scale.set(1, 1, 1.2);
  g.add(nose);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.1),
    new THREE.MeshBasicMaterial({ color: 0x2a3a4a, toneMapped: false }));
  face.position.set(0, 2.2, 10.45);
  face.rotation.y = Math.PI;
  g.add(face);
  return g;
}

// ---------------- 猫 ----------------
export function cat(color = 0xd9a45a) {
  const g = new THREE.Group();
  const mat = new THREE.MeshToonMaterial({ color });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.5, 4, 8), mat);
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.32;
  body.castShadow = true;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), mat);
  head.position.set(0, 0.5, 0.36);
  g.add(head);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.14, 4), mat);
    ear.position.set(s * 0.1, 0.68, 0.34);
    g.add(ear);
  }
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.5, 5), mat);
  tail.position.set(0, 0.5, -0.42);
  tail.rotation.x = -0.8;
  g.add(tail);
  for (const [lx, lz] of [[-0.12, 0.2], [0.12, 0.2], [-0.12, -0.2], [0.12, -0.2]]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.24, 5), mat);
    leg.position.set(lx, 0.12, lz);
    g.add(leg);
  }
  return g;
}

// ---------------- 祭典摊位 ----------------
export function festivalStall(kind = 'food') {
  const g = new THREE.Group();
  const colors = { food: 0xd96f4a, drink: 0x4a7fb5, game: 0x5f9e6e };
  const c = colors[kind] || 0xd96f4a;
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 1.1), new THREE.MeshToonMaterial({ color: c }));
  counter.position.y = 0.4;
  counter.castShadow = true;
  g.add(counter);
  for (const sx of [-1.2, 1.2]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), MAT.woodPlain);
    post.position.set(sx, 1.1, -0.4);
    g.add(post);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.1, 1.5), new THREE.MeshToonMaterial({ color: 0xe8ddc8 }));
  roof.position.y = 2.25;
  g.add(roof);
  const roof2 = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.08, 1.5), new THREE.MeshToonMaterial({ color: c }));
  roof2.position.y = 2.1;
  g.add(roof2);
  // 暖帘
  const noren = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.5), MAT.noren);
  noren.position.set(0, 1.95, 0.45);
  g.add(noren);
  // 灯笼
  for (const sx of [-1.2, 1.2]) {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff6a4a, toneMapped: false }));
    l.position.set(sx, 2.0, 0.5);
    l.scale.y = 1.1;
    g.add(l);
  }
  const labels = { food: '小吃', drink: '饮品', game: '套圈' };
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.4),
    new THREE.MeshBasicMaterial({ map: makeSignTex(labels[kind] || '祭', { w: 256, h: 96, bg: '#7a2f26', fg: '#ffe9c9' }), toneMapped: false }));
  sign.position.set(0, 2.0, 0.51);
  g.add(sign);
  return g;
}

// ---------------- 雨伞 ----------------
export function umbrella(color = 0x4a7fb5) {
  const g = new THREE.Group();
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.32, 8), new THREE.MeshToonMaterial({ color, side: THREE.DoubleSide }));
  canopy.position.y = 0.98;
  g.add(canopy);
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.05, 5), MAT.woodPlain);
  stick.position.y = 0.5;
  g.add(stick);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 5, 8, Math.PI), MAT.woodPlain);
  handle.position.set(0, 0.02, 0);
  handle.rotation.y = Math.PI / 2;
  g.add(handle);
  return g;
}

// ---------------- 小物件 ----------------
export function mailbox() {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.0, 6), MAT.woodPlain);
  post.position.y = 0.5;
  g.add(post);
  const box_ = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.4, 0.5), MAT.vending);
  box_.position.y = 1.15;
  box_.castShadow = true;
  g.add(box_);
  return g;
}

export function trashCan() {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.6, 8), MAT.metal);
  b.position.y = 0.3;
  g.add(b);
  return g;
}

export function bicycle(color = 0x3f8a8a) {
  const g = new THREE.Group();
  const mat = new THREE.MeshToonMaterial({ color });
  for (const [wx, wz] of [[-0.42, 0.55], [0.42, 0.55], [-0.42, -0.55], [0.42, -0.55]]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 6, 14), MAT.black);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(wx, 0.3, wz);
    g.add(wheel);
  }
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.2), mat);
  frame.position.y = 0.55;
  g.add(frame);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.07, 0.3), MAT.black);
  seat.position.set(0, 0.72, -0.4);
  g.add(seat);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.05), MAT.metal);
  bar.position.set(0, 0.85, 0.55);
  g.add(bar);
  return g;
}

export function shrineOfferingBox() {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 0.7), MAT.woodPlain);
  b.position.y = 0.42;
  b.castShadow = true;
  g.add(b);
  const slot = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.08), MAT.black);
  slot.position.y = 0.88;
  g.add(slot);
  return g;
}

export function waySign(text) {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.0, 6), MAT.metal);
  post.position.y = 1.0;
  g.add(post);
  const board = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.42),
    new THREE.MeshBasicMaterial({ map: makeSignTex(text, { w: 320, h: 96, bg: '#3a5f8a', fg: '#ffffff' }), toneMapped: false }));
  board.position.y = 1.8;
  g.add(board);
  return g;
}

// 地面软阴影
export function groundShadow(size = 1.2) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: TEX.shadow, transparent: true, depthWrite: false, opacity: 0.8 }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.03;
  m.renderOrder = 1;
  return m;
}
