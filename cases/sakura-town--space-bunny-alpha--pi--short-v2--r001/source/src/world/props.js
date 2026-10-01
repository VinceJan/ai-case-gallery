/**
 * 场景道具 / 地标：鸟居、纪念碑、喷泉、钟塔、公交站、自动贩卖机、长椅、
 * 自行车、菜园、钓点、游乐设施、稻田、护坡等。
 */
import * as THREE from 'three';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry, cylinderGeometry, sphereGeometry } from '../core/toon.js';
import { heightAt } from './terrain.js';
import { addFence, addPlanter, addStreetLamp, makeFlatRoofGeometry } from './kit.js';
import { makeRNG } from '../core/utils.js';
import { paddyTexture, signTexture } from './textures.js';

export function buildProp(spec, m, ctx = {}) {
  switch (spec.kind) {
    case 'torii': return propTorii(spec, m);
    case 'monument': return propMonument(spec, m);
    case 'fountain': return propFountain(spec, m);
    case 'clocktower': return propClock(spec, m);
    case 'busstop': return propBusstop(spec, m);
    case 'vending': return propVending(spec, m);
    case 'bench': return propBench(spec, m);
    case 'mailbox': return propMailbox(spec, m);
    case 'signpost': return propSignpost(spec, m);
    case 'bikes': return propBikes(spec, m);
    case 'crates': return propCrates(spec, m);
    case 'flowerbed': return propFlowerbed(spec, m);
    case 'garden': return propGarden(spec, m);
    case 'fishspot': return propFishspot(spec, m);
    case 'playground': return propPlayground(spec, m);
    case 'paddyfield': return propPaddy(spec, m);
    case 'mochi': return propMochi(spec, m);
    case 'bigtree': return propBigTree(spec, m);
    default: return null;
  }
}

// ---------------------------------------------------------------------------
function place(group, spec) {
  const y = spec.y !== undefined ? spec.y : heightAt(spec.x, spec.z);
  group.position.set(spec.x, y, spec.z);
  group.rotation.y = spec.rot || 0;
  return group;
}

function propTorii(spec, m) {
  const b = new GeoBuilder('torii');
  const s = spec.scale || 1;
  const h = 5.2 * s;
  const span = 3.4 * s;
  const red = m.accentFor(0xd6482f);
  const black = m.accentFor(0x2a2528);
  for (const sx of [-1, 1]) {
    b.add(cylinderGeometry(0.22 * s, 0.3 * s, h, 10), red, { x: (sx * span) / 2, y: h / 2, z: 0, rz: -sx * 0.035 });
    b.add(cylinderGeometry(0.36 * s, 0.4 * s, 0.5 * s, 8), m.stone, { x: (sx * span) / 2, y: 0.25 * s, z: 0 });
  }
  // 贯（横梁）
  b.add(boxGeometry(span * 1.28, 0.3 * s, 0.4 * s), red, { x: 0, y: h * 0.74, z: 0 });
  // 岛木 + 笠木
  b.add(boxGeometry(span * 1.5, 0.24 * s, 0.34 * s), black, { x: 0, y: h * 0.9, z: 0 });
  b.add(boxGeometry(span * 1.72, 0.26 * s, 0.52 * s), black, { x: 0, y: h * 0.97, z: 0, rx: 0.03 });
  b.add(boxGeometry(span * 1.6, 0.12 * s, 0.3 * s), black, { x: 0, y: h * 1.05, z: 0 });
  b.add(boxGeometry(0.4 * s, 0.6 * s, 0.4 * s), red, { x: 0, y: h * 0.82, z: 0 });
  const g = b.build({ thickness: 0.032 });
  return place(g, spec);
}

function propMonument(spec, m) {
  const b = new GeoBuilder('monument');
  b.add(boxGeometry(2.6, 0.35, 2.6), m.stone, { x: 0, y: 0.18, z: 0 });
  b.add(boxGeometry(1.9, 0.25, 1.9), m.stoneDark, { x: 0, y: 0.48, z: 0 });
  b.add(boxGeometry(1.0, 2.4, 0.7), m.stone, { x: 0, y: 1.8, z: 0 });
  b.add(boxGeometry(1.25, 0.3, 0.9), m.stoneDark, { x: 0, y: 3.1, z: 0 });
  // 铜像（抽象）
  b.add(cylinderGeometry(0.22, 0.3, 1.5, 8), m.accentFor(0x6f7a5a), { x: 0, y: 3.9, z: 0 });
  b.add(sphereGeometry(0.3, 8), m.accentFor(0x6f7a5a), { x: 0, y: 4.8, z: 0 });
  b.add(new THREE.PlaneGeometry(0.8, 1.0), m.accentFor(0xb8a06a), { x: 0, y: 2.1, z: 0.37, noOutline: true });
  // 花坛
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    b.add(sphereGeometry(0.2, 6), i % 2 ? m.flowerA : m.flowerB, { x: Math.cos(a) * 1.1, y: 0.72, z: Math.sin(a) * 1.1 });
  }
  const g = b.build({ thickness: 0.03 });
  return place(g, spec);
}

function propFountain(spec, m) {
  const b = new GeoBuilder('fountain');
  // 外池
  b.add(cylinderGeometry(3.35, 3.5, 0.9, 20), m.stone, { x: 0, y: 0.45, z: 0 });
  b.add(cylinderGeometry(3.45, 3.5, 0.22, 20), m.stoneDark, { x: 0, y: 0.95, z: 0 });
  // 内池底（比水面低，水面才露得出来）
  b.add(cylinderGeometry(2.9, 2.9, 0.6, 20), m.stoneDark, { x: 0, y: 0.45, z: 0 });
  // 水面
  b.add(new THREE.CircleGeometry(2.95, 22), m.glassBig, { x: 0, y: 0.78, z: 0, rx: -Math.PI / 2, noOutline: true });
  // 池边小水花
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    b.add(sphereGeometry(0.1, 6), m.glassBig, {
      x: Math.cos(a) * 1.7, y: 0.88, z: Math.sin(a) * 1.7, noOutline: true,
    });
  }
  // 中央柱与顶盘
  b.add(cylinderGeometry(0.32, 0.55, 1.5, 12), m.stone, { x: 0, y: 1.5, z: 0 });
  b.add(cylinderGeometry(1.05, 0.5, 0.34, 14), m.stoneDark, { x: 0, y: 2.35, z: 0 });
  b.add(cylinderGeometry(0.9, 1.05, 0.2, 14), m.stone, { x: 0, y: 2.58, z: 0 });
  b.add(cylinderGeometry(0.18, 0.26, 0.7, 10), m.stone, { x: 0, y: 2.95, z: 0 });
  b.add(sphereGeometry(0.3, 10), m.stoneDark, { x: 0, y: 3.4, z: 0 });
  const g = b.build({ thickness: 0.03 });
  const grp = new THREE.Group();
  grp.add(g);
  grp.userData.waterY = 0.78;
  return place(grp, spec);
}

function clockFaceTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#f7f4ea';
  g.beginPath();
  g.arc(128, 128, 124, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#3a3a42';
  g.lineWidth = 8;
  g.beginPath();
  g.arc(128, 128, 118, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = '#3a3a42';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const big = i % 3 === 0;
    g.save();
    g.translate(128 + Math.sin(a) * 96, 128 - Math.cos(a) * 96);
    g.rotate(a);
    g.fillRect(-3, -12, 6, big ? 24 : 14);
    g.restore();
  }
  g.fillStyle = '#3a3a42';
  g.font = '700 26px sans-serif';
  g.textAlign = 'center';
  g.fillText('SAKURA', 128, 188);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function propClock(spec, m) {
  const b = new GeoBuilder('clock');
  b.add(boxGeometry(1.5, 0.35, 1.5), m.stoneDark, { x: 0, y: 0.17, z: 0 });
  b.add(cylinderGeometry(0.2, 0.26, 3.4, 8), m.metalDark, { x: 0, y: 1.9, z: 0 });
  b.add(boxGeometry(1.1, 1.1, 0.55), m.metalDark, { x: 0, y: 4.2, z: 0 });
  b.add(new THREE.ConeGeometry(0.85, 0.6, 4), m.accentFor(0x3a6b8a), { x: 0, y: 5.05, z: 0, ry: Math.PI / 4 });
  const faceTex = clockFaceTexture();
  const faceMat = new THREE.MeshBasicMaterial({ map: faceTex, transparent: true });
  const grp = new THREE.Group();
  const geo = b.build({ thickness: 0.028 });
  grp.add(geo);
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.46, 20), faceMat);
  face.position.set(0, 4.2, 0.29);
  face.userData.noOutline = true;
  grp.add(face);
  const face2 = face.clone();
  face2.position.z = -0.29;
  face2.rotation.y = Math.PI;
  grp.add(face2);

  // 指针
  const handMat = m.accentFor(0x2a2528);
  const mkHand = (len, wid) => {
    const pivot = new THREE.Group();
    const bar = new THREE.Mesh(boxGeometry(wid, len, 0.04), handMat);
    bar.position.y = len / 2 - 0.05;
    pivot.add(bar);
    const shell = new THREE.Mesh(boxGeometry(wid, len, 0.04), m.metalDark);
    shell.position.y = len / 2 - 0.05;
    shell.visible = false;
    pivot.add(shell);
    return pivot;
  };
  const hourH = mkHand(0.28, 0.07);
  const minH = mkHand(0.4, 0.05);
  hourH.position.set(0, 4.2, 0.32);
  minH.position.set(0, 4.2, 0.34);
  grp.add(hourH, minH);
  const hourH2 = mkHand(0.28, 0.07);
  const minH2 = mkHand(0.4, 0.05);
  hourH2.position.set(0, 4.2, -0.32);
  hourH2.rotation.y = Math.PI;
  minH2.position.set(0, 4.2, -0.34);
  minH2.rotation.y = Math.PI;
  grp.add(hourH2, minH2);
  grp.userData.clock = { hourH, minH, hourH2, minH2 };
  return place(grp, spec);
}

function propBusstop(spec, m) {
  const b = new GeoBuilder('busstop');
  b.add(cylinderGeometry(0.08, 0.1, 2.4, 6), m.metalDark, { x: -1.6, y: 1.2, z: 0 });
  b.add(boxGeometry(1.5, 0.6, 0.1), m.accentFor(0x2f6b8a), { x: -1.6, y: 2.3, z: 0 });
  b.add(boxGeometry(1.9, 0.12, 1.2), m.metal, { x: 0.4, y: 2.3, z: 0 });
  for (const sx of [-1, 1]) b.add(cylinderGeometry(0.07, 0.07, 2.3, 6), m.metalDark, { x: 0.4 + sx * 0.85, y: 1.15, z: 0.45 });
  b.add(boxGeometry(1.7, 0.1, 0.45), m.wood, { x: 0.4, y: 0.55, z: 0.42 });
  b.add(boxGeometry(0.1, 0.5, 0.4), m.metalDark, { x: -0.4, y: 0.3, z: 0.42 });
  b.add(boxGeometry(0.1, 0.5, 0.4), m.metalDark, { x: 1.2, y: 0.3, z: 0.42 });
  b.add(new THREE.PlaneGeometry(1.7, 1.5), m.glassBig, { x: 0.4, y: 1.4, z: 0.6, noOutline: true });
  b.add(boxGeometry(2.1, 0.06, 1.4), m.accentFor(0x3a6b8a), { x: 0.4, y: 2.24, z: 0.05 });
  const g = b.build({ thickness: 0.028 });
  return place(g, spec);
}

function propVending(spec, m) {
  const b = new GeoBuilder('vending');
  b.add(boxGeometry(1.3, 2.0, 0.78), m.accentFor(0xd0402f), { x: 0, y: 1.0, z: 0 });
  b.add(boxGeometry(1.36, 0.3, 0.84), m.accentFor(0xf0f0e8), { x: 0, y: 1.92, z: 0 });
  b.add(boxGeometry(1.1, 1.2, 0.08), m.bulb, { x: -0.12, y: 1.3, z: 0.4, noOutline: true });
  // 饮料排列
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      b.add(boxGeometry(0.18, 0.26, 0.14), m.accentFor([0x3f7fb5, 0xd65545, 0x6fa85a, 0xe8b64c][c]), {
        x: -0.45 + c * 0.26, y: 0.95 + r * 0.36, z: 0.42,
      });
    }
  }
  b.add(boxGeometry(0.3, 0.5, 0.06), m.metalDark, { x: 0.48, y: 1.2, z: 0.4 });
  b.add(boxGeometry(1.2, 0.16, 0.5), m.metalDark, { x: 0, y: 0.1, z: 0.1 });
  b.add(boxGeometry(1.3, 0.06, 0.7), m.metalDark, { x: 0, y: 0.02, z: 0 });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propBench(spec, m) {
  const b = new GeoBuilder('bench');
  b.add(boxGeometry(1.9, 0.1, 0.55), m.wood, { x: 0, y: 0.46, z: 0 });
  b.add(boxGeometry(1.9, 0.55, 0.1), m.wood, { x: 0, y: 0.78, z: -0.24, rx: 0.12 });
  b.add(boxGeometry(0.1, 0.46, 0.5), m.metalDark, { x: -0.8, y: 0.23, z: 0 });
  b.add(boxGeometry(0.1, 0.46, 0.5), m.metalDark, { x: 0.8, y: 0.23, z: 0 });
  b.add(boxGeometry(0.1, 0.5, 0.1), m.metalDark, { x: -0.8, y: 0.6, z: -0.2 });
  b.add(boxGeometry(0.1, 0.5, 0.1), m.metalDark, { x: 0.8, y: 0.6, z: -0.2 });
  const g = b.build({ thickness: 0.028 });
  return place(g, spec);
}

function propMailbox(spec, m) {
  const b = new GeoBuilder('mailbox');
  const red = m.accentFor(0xd65545);
  b.add(boxGeometry(0.7, 1.0, 0.5), red, { x: 0, y: 0.72, z: 0 });
  b.add(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 12, 1, false, 0, Math.PI), red, { x: 0, y: 1.22, z: 0, rz: Math.PI / 2 });
  b.add(boxGeometry(0.36, 0.05, 0.04), m.metalDark, { x: 0, y: 0.9, z: 0.26 });
  b.add(boxGeometry(0.1, 0.45, 0.1), m.metal, { x: 0, y: 0.22, z: 0 });
  b.add(boxGeometry(0.4, 0.06, 0.4), m.metal, { x: 0, y: 0.03, z: 0 });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propSignpost(spec, m) {
  const b = new GeoBuilder('signpost');
  b.add(cylinderGeometry(0.08, 0.1, 2.6, 6), m.wood, { x: 0, y: 1.3, z: 0 });
  const dirs = [[0.4, 0], [-0.35, 0.25], [0.3, -0.2]];
  const names = [['车站 300m'], ['公园 150m'], ['主街']];
  for (let i = 0; i < dirs.length; i++) {
    const [dx, dz] = dirs[i];
    const tex = signTexture({ text: names[i][0], bg: '#f4efe2', fg: '#3a4a58', w: 384, h: 128, border: true });
    const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    const g = new THREE.BoxGeometry(1.5, 0.42, 0.07);
    b.add(g, m.woodDark, { x: dx, y: 2.3 - i * 0.52, z: dz, ry: Math.atan2(dz, dx) });
    b.add(new THREE.PlaneGeometry(1.44, 0.38), mat, {
      x: dx + 0.001 * Math.sin(0), y: 2.3 - i * 0.52, z: dz + 0.045, ry: Math.atan2(dz, dx), noOutline: true,
    });
  }
  const g2 = b.build({ thickness: 0.026 });
  return place(g2, spec);
}

function propBikes(spec, m) {
  const grp = new THREE.Group();
  const rng = makeRNG(4242);
  const n = spec.n || 2;
  for (let i = 0; i < n; i++) {
    const b = new GeoBuilder('bike');
    const frame = m.accentFor([0x2f6b8a, 0xc4553f, 0x4f8f5a][i % 3]);
    for (const wx of [-0.55, 0.55]) {
      b.add(new THREE.TorusGeometry(0.34, 0.05, 6, 14), m.metalDark, { x: wx, y: 0.35, z: 0, ry: Math.PI / 2 });
    }
    b.add(boxGeometry(1.0, 0.07, 0.07), frame, { x: 0, y: 0.62, z: 0, rz: -0.1 });
    b.add(boxGeometry(0.07, 0.62, 0.07), frame, { x: 0.1, y: 0.42, z: 0, rz: 0.35 });
    b.add(boxGeometry(0.07, 0.5, 0.07), frame, { x: -0.3, y: 0.4, z: 0, rz: -0.3 });
    b.add(boxGeometry(0.36, 0.07, 0.22), m.metalDark, { x: -0.28, y: 0.78, z: 0 });
    b.add(boxGeometry(0.5, 0.06, 0.06), m.metal, { x: 0.5, y: 0.82, z: 0, rz: 0.2 });
    b.add(boxGeometry(0.16, 0.1, 0.3), m.metalDark, { x: 0.5, y: 0.86, z: 0 });
    const bike = b.build({ thickness: 0.02 });
    bike.position.set((i - (n - 1) / 2) * 0.5, 0, rng.range(-0.25, 0.25));
    bike.rotation.y = rng.range(-0.12, 0.12);
    grp.add(bike);
  }
  return place(grp, spec);
}

function propCrates(spec, m) {
  const b = new GeoBuilder('crates');
  const rng = makeRNG(777);
  for (let i = 0; i < 5; i++) {
    const s = rng.range(0.5, 0.75);
    b.add(boxGeometry(s, s, s), i % 2 ? m.wood : m.woodLight, {
      x: rng.range(-0.9, 0.9), y: s / 2 + (i > 2 ? 0.6 : 0), z: rng.range(-0.7, 0.7), ry: rng.range(0, 1.5),
    });
  }
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propFlowerbed(spec, m) {
  const b = new GeoBuilder('flowerbed');
  addPlanter(b, m, 2.4, 1.1, { x: 0, y: 0, z: 0 }, { flowers: !!spec.flowers });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propGarden(spec, m) {
  const b = new GeoBuilder('garden');
  const W = 5.5;
  const D = 4.5;
  b.add(boxGeometry(W, 0.25, D), m.soil, { x: 0, y: 0.12, z: 0 });
  for (let i = 0; i < 4; i++) {
    b.add(boxGeometry(W - 0.4, 0.16, 0.18), m.wood, { x: 0, y: 0.3, z: -D / 2 + 0.6 + i * 1.1 });
  }
  // 蔬菜
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      const c = (i + j) % 3;
      b.add(sphereGeometry(0.19, 6), c === 0 ? m.accentFor(0xe07a4a) : c === 1 ? m.leafBroad : m.accentFor(0xf0d060), {
        x: -W / 2 + 0.6 + j * 0.8, y: 0.45, z: -D / 2 + 0.6 + i * 1.1,
      });
    }
  }
  addFence(b, m, W, { x: 0, y: 0, z: D / 2 }, { h: 0.7, postEvery: 1.2 });
  addFence(b, m, W, { x: 0, y: 0, z: -D / 2 }, { h: 0.7, postEvery: 1.2 });
  addFence(b, m, D, { x: -W / 2, y: 0, z: 0, ry: Math.PI / 2 }, { h: 0.7, postEvery: 1.2 });
  addFence(b, m, D, { x: W / 2, y: 0, z: 0, ry: Math.PI / 2 }, { h: 0.7, postEvery: 1.2 });
  // 稻草人
  b.add(cylinderGeometry(0.05, 0.05, 1.5, 5), m.wood, { x: 0, y: 0.75, z: 0 });
  b.add(boxGeometry(1.0, 0.07, 0.07), m.wood, { x: 0, y: 1.2, z: 0 });
  b.add(new THREE.SphereGeometry(0.24, 7), m.accentFor(0xe8c86a), { x: 0, y: 1.55, z: 0 });
  b.add(new THREE.ConeGeometry(0.42, 0.2, 8), m.accentFor(0xc8a04a), { x: 0, y: 1.72, z: 0 });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propFishspot(spec, m) {
  const b = new GeoBuilder('fishspot');
  // 木平台（顺着河岸，贴地放置）
  b.add(boxGeometry(4.4, 0.24, 3.4), m.wood, { x: 0, y: -0.02, z: -0.6 });
  b.add(boxGeometry(4.6, 0.12, 3.6), m.woodDark, { x: 0, y: 0.1, z: -0.6 });
  // 四根短木桩
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(cylinderGeometry(0.13, 0.15, 0.9, 6), m.woodDark, { x: sx * 1.9, y: -0.5, z: -0.6 + sz * 1.4 });
    }
  }
  // 靠河一侧的矮栏杆
  addFence(b, m, 4.4, { x: 0, y: 0.1, z: -2.2 }, { h: 0.75, postEvery: 1.1 });
  // 长凳
  b.add(boxGeometry(2.0, 0.1, 0.55), m.wood, { x: -0.2, y: 0.52, z: 0.5 });
  b.add(boxGeometry(2.0, 0.5, 0.1), m.wood, { x: -0.2, y: 0.8, z: 0.26, rx: 0.14 });
  b.add(boxGeometry(0.1, 0.5, 0.5), m.metalDark, { x: -1.1, y: 0.26, z: 0.5 });
  b.add(boxGeometry(0.1, 0.5, 0.5), m.metalDark, { x: 0.7, y: 0.26, z: 0.5 });
  // 伸向河面的钓竿 + 支竿架
  b.add(cylinderGeometry(0.04, 0.05, 3.0, 5), m.woodDark, { x: 0.9, y: 1.2, z: -1.5, rx: 1.32, rz: 0.12 });
  b.add(cylinderGeometry(0.05, 0.07, 1.3, 6), m.wood, { x: 1.4, y: 0.7, z: -1.1, rx: 0.2 });
  b.add(cylinderGeometry(0.04, 0.04, 0.5, 5), m.metalDark, { x: 1.4, y: 1.25, z: -1.25, rx: 0.9 });
  // 提示牌
  b.add(cylinderGeometry(0.06, 0.08, 1.5, 6), m.wood, { x: -1.9, y: 0.75, z: 0.9 });
  b.add(boxGeometry(1.0, 0.55, 0.07), m.woodDark, { x: -1.9, y: 1.45, z: 0.9, ry: 0.35 });
  b.add(new THREE.PlaneGeometry(0.86, 0.44), m.accentFor(0xf0e6cc), { x: -1.9, y: 1.45, z: 0.94, ry: 0.35, noOutline: true });
  // 水桶
  b.add(cylinderGeometry(0.2, 0.16, 0.3, 8), m.metal, { x: 1.3, y: 0.3, z: 0.6 });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propPlayground(spec, m) {
  const b = new GeoBuilder('playground');
  // 滑梯
  b.add(cylinderGeometry(0.08, 0.08, 2.0, 6), m.metalDark, { x: -2.2, y: 1.0, z: 0 });
  b.add(cylinderGeometry(0.08, 0.08, 2.0, 6), m.metalDark, { x: -0.6, y: 1.0, z: 0 });
  b.add(cylinderGeometry(0.08, 0.08, 2.0, 6), m.metalDark, { x: -0.6, y: 1.0, z: 1.4 });
  b.add(cylinderGeometry(0.08, 0.08, 2.0, 6), m.metalDark, { x: -2.2, y: 1.0, z: 1.4 });
  b.add(boxGeometry(1.8, 0.1, 1.6), m.accentFor(0xe8b64c), { x: -1.4, y: 2.0, z: 0.7 });
  b.add(boxGeometry(1.0, 0.1, 2.6), m.accentFor(0xd65545), { x: -1.4, y: 1.1, z: 2.4, rx: 0.75 });
  b.add(boxGeometry(1.0, 0.5, 0.1), m.accentFor(0x4f8f8f), { x: -1.4, y: 1.85, z: 1.4 });
  // 秋千
  for (const sx of [-1, 1]) {
    b.add(cylinderGeometry(0.07, 0.07, 2.2, 6), m.metalDark, { x: 1.0 + sx * 0.9, y: 1.1, z: 0, rz: sx * 0.12 });
  }
  b.add(cylinderGeometry(0.06, 0.06, 1.9, 6), m.metalDark, { x: 1.0, y: 2.15, z: 0, rz: Math.PI / 2 });
  for (let i = 0; i < 2; i++) {
    const sx = i === 0 ? 0.6 : 1.4;
    b.add(boxGeometry(0.03, 1.3, 0.03), m.metal, { x: sx, y: 1.5, z: 0 });
    b.add(boxGeometry(0.42, 0.08, 0.2), m.accentFor(0x3f7fb5), { x: sx, y: 0.9, z: 0 });
  }
  // 沙坑
  b.add(boxGeometry(2.4, 0.2, 2.4), m.accentFor(0xd8c49a), { x: 1.0, y: 0.1, z: 2.4 });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propPaddy(spec, m) {
  const b = new GeoBuilder('paddy');
  const W = spec.w || 44;
  const D = spec.d || 22;
  const rng = makeRNG(31337);
  // 田埂
  const cols = 4;
  const rows = 3;
  for (let i = 0; i <= cols; i++) {
    b.add(boxGeometry(0.4, 0.34, D), m.soil, { x: -W / 2 + (W * i) / cols, y: 0.16, z: 0 });
  }
  for (let j = 0; j <= rows; j++) {
    b.add(boxGeometry(W, 0.34, 0.4), m.soil, { x: 0, y: 0.16, z: -D / 2 + (D * j) / rows });
  }
  // 水面
  const tex = paddyTexture();
  const paddyMat = new THREE.MeshToonMaterial({ map: tex, color: 0xffffff, transparent: true, opacity: 0.92 });
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cw = W / cols - 0.4;
      const cd = D / rows - 0.4;
      const geo = new THREE.PlaneGeometry(cw, cd);
      geo.rotateX(-Math.PI / 2);
      b.add(geo, paddyMat, {
        x: -W / 2 + (W * (i + 0.5)) / cols, y: 0.18, z: -D / 2 + (D * (j + 0.5)) / rows, noOutline: true,
      });
    }
  }
  // 秧苗
  for (let i = 0; i < 260; i++) {
    const cx = -W / 2 + rng.range(0.6, W - 0.6);
    const cz = -D / 2 + rng.range(0.6, D - 0.6);
    b.add(new THREE.ConeGeometry(0.1, rng.range(0.4, 0.7), 4), m.rice, { x: cx, y: 0.42, z: cz, ry: rng.range(0, 3) });
  }
  const g = b.build({ outline: false });
  return place(g, spec);
}

function propMochi(spec, m) {
  const b = new GeoBuilder('mochi');
  b.add(boxGeometry(2.2, 0.9, 1.2), m.wood, { x: 0, y: 0.45, z: 0 });
  b.add(boxGeometry(2.4, 0.12, 1.4), m.woodDark, { x: 0, y: 0.94, z: 0 });
  b.add(makeFlatRoofGeometry(2.2, 1.2, 0.4, 0.1), m.accentFor(0xf0e0e8), { x: 0, y: 1.9, z: 0 });
  for (const sx of [-1, 1]) b.add(cylinderGeometry(0.05, 0.05, 1.9, 5), m.woodDark, { x: sx * 1.0, y: 0.95, z: 0 });
  for (let i = 0; i < 6; i++) {
    b.add(sphereGeometry(0.12, 7), m.accentFor(0xf7c8d8), { x: -0.8 + (i % 3) * 0.4, y: 1.08, z: -0.2 + Math.floor(i / 3) * 0.4 });
  }
  const tex = signTexture({ text: '樱饼', sub: 'SAKURA MOCHI', bg: '#f7e8ee', fg: '#8a4a5a', w: 384, h: 128 });
  b.add(new THREE.PlaneGeometry(1.2, 0.4), new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }), { x: 0, y: 1.55, z: 0.66, noOutline: true });
  const g = b.build({ thickness: 0.026 });
  return place(g, spec);
}

function propBigTree(spec, m, ctx = {}) {
  const { buildSakuraTree, buildBroadTree } = ctx;
  if (!buildSakuraTree || !buildBroadTree) return null;
  const tree = spec.blossom ? buildSakuraTree(1.35, 3) : buildBroadTree(1.3, 3);
  return place(tree, spec);
}

export { propBigTree as _propBigTree };
