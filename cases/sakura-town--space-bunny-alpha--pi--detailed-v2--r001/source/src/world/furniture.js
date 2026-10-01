// 室内家具套件：全部程序化，风格与室外统一
import * as THREE from 'three';
import { GeoBuf, mergeBuf } from './geom.js';
import { toon, registerNightLight } from '../render/toon.js';
import { PAL } from '../render/palette.js';
import { tatamiTex, floorWoodTex, tileFloorTex, shelfTex } from '../render/textures.js';
export const IM = {};
export function initInteriorMaterials() {
  const t = (c, o) => toon(c, o);
  IM.wood = t(0xb58455);
  IM.woodDark = t(0x7a5636);
  IM.woodLight = t(0xd8b083);
  IM.bamboo = t(0xcbb68a);
  IM.wall = t(0xf3ede0);
  IM.wallAccent = t(0xe6dcc8);
  IM.wallWood = t(0xd8c4a0);
  IM.white = t(0xfaf8f2);
  IM.ceil = toon(0xf6f3ea, { side: THREE.DoubleSide });
  IM.wall2 = toon(0xe6ddc8, { side: THREE.DoubleSide });
  IM.wallWood2 = toon(0xcdb894, { side: THREE.DoubleSide });
  IM.cream = t(0xf6efdd);
  IM.metal = t(0xb4b9c0);
  IM.metalDark = t(0x6a7078);
  IM.black = t(0x33333b);
  IM.gray = t(0x8d8d96);
  IM.fabric = t(0x7d93a8);
  IM.fabricWarm = t(0xc4907f);
  IM.leaf = t(0x5f8f52);
  IM.leafDark = t(0x40693c);
  IM.ceramic = t(0xf0ece2);
  IM.red = t(0xc8504c);
  IM.blue = t(0x4a7fb5);
  IM.yellow = t(0xecc050);
  IM.green = t(0x5f9c62);
  IM.sakura = t(PAL.sakura);
  IM.tatami = t(0xffffff, { map: tatamiTex() });
  IM.floorWood = t(0xffffff, { map: floorWoodTex() });
  IM.floorTile = t(0xffffff, { map: tileFloorTex() });
  IM.counter = t(0xf2eee4);
  IM.glow = t(0xfff6e0);
  registerNightLight(IM.glow, { night: new THREE.Color(0xfff0cc), nightIntensity: 2.0, threshold: -1 });
  IM.glass = t(0xd6e6ee, { transparent: true, opacity: 0.42, depthWrite: false });
  IM.screen = t(0x1b2430);
  IM.paper = t(0xf6f2e6);

  const st = shelfTex("snack").clone(); st.needsUpdate = true;
  IM.shelfSnack = t(0xffffff, { map: st });
  const ct = shelfTex("coffee").clone(); ct.needsUpdate = true;
  IM.shelfCoffee = t(0xffffff, { map: ct });
}

// ---- 简易构造助手 ----
function addTo(parts, mat, buf) {
  if (!parts.has(mat)) parts.set(mat, new GeoBuf());
  mergeBuf(parts.get(mat), buf);
}

/* ------------------------------------------------------------------ *
 *  家具
 * ------------------------------------------------------------------ */
export function chair(rng, seatColor = IM.wood) {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.44, 0, 0.42, 0.05, 0.42, 1);
  b.box(0, 0.66, -0.19, 0.4, 0.42, 0.05, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * 0.17, 0.22, sz * 0.17, 0.05, 0.44, 0.05, 1);
  addTo(p, seatColor, b);
  return p;
}
export function stool(rng) {
  const p = new Map();
  const b = new GeoBuf();
  b.cyl(0, 0.36, 0, 0.17, 0.17, 0.06, 10);
  b.cyl(0, 0.18, 0, 0.05, 0.05, 0.36, 6);
  b.cyl(0, 0.03, 0, 0.16, 0.18, 0.04, 10);
  addTo(p, IM.woodDark, b);
  return p;
}
export function table(rng, w = 1.2, d = 0.8, h = 0.74, color = IM.wood) {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, h, 0, w, 0.06, d, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * (w / 2 - 0.08), h / 2, sz * (d / 2 - 0.08), 0.06, h, 0.06, 1);
  addTo(p, color, b);
  return p;
}
export function lowTable(rng) {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.36, 0, 0.9, 0.05, 0.9, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * 0.38, 0.18, sz * 0.38, 0.06, 0.36, 0.06, 1);
  addTo(p, IM.woodDark, b);
  return p;
}
export function sofa(rng) {
  const p = new Map();
  const b = new GeoBuf(), c = new GeoBuf();
  b.box(0, 0.22, 0, 1.9, 0.32, 0.8, 1);
  b.box(0, 0.52, -0.36, 1.9, 0.7, 0.14, 1);
  b.box(-0.92, 0.5, 0, 0.14, 0.56, 0.8, 1);
  b.box(0.92, 0.5, 0, 0.14, 0.56, 0.8, 1);
  for (const sx of [-0.42, 0.42]) c.box(sx, 0.46, 0.04, 0.78, 0.14, 0.66, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * 0.85, 0.05, sz * 0.32, 0.08, 0.1, 0.08, 1);
  addTo(p, IM.fabric, b);
  addTo(p, IM.fabricWarm, c);
  return p;
}
export function tv(rng) {
  const p = new Map();
  const b = new GeoBuf(), s = new GeoBuf();
  b.box(0, 0.3, 0, 1.2, 0.62, 0.08, 1);
  b.box(0, 0.05, 0, 0.5, 0.1, 0.3, 1);
  b.box(0, 0.15, 0, 0.16, 0.2, 0.14, 1);
  s.box(0, 0.3, -0.05, 1.1, 0.52, 0.02, 1);
  addTo(p, IM.black, b);
  addTo(p, IM.screen, s);
  return p;
}
export function shelfUnit(rng, w = 1.2, h = 1.8, d = 0.35, mat = IM.wood, fill = true, fillMat = null) {
  const p = new Map();
  const b = new GeoBuf(), f = new GeoBuf();
  b.box(0, h / 2, -d / 2, w, h, 0.05, 1);
  b.box(-w / 2 + 0.03, h / 2, 0, 0.06, h, d, 1);
  b.box(w / 2 - 0.03, h / 2, 0, 0.06, h, d, 1);
  const rows = 4;
  for (let i = 1; i <= rows; i++) b.box(0, (h / (rows + 1)) * i, 0, w - 0.1, 0.04, d, 1);
  if (fill) for (let i = 0; i < rows; i++) {
    const y = (h / (rows + 1)) * i + h / (rows + 1) / 2 + 0.03;
    const gw = (w - 0.3) / 5 - 0.05, gh = 0.22;
    // 步长由盒子宽度推出，保证不越过两侧立板
    const step = (w - 0.3 - 2 * gw) / 4;
    for (let k = 0; k < 5; k++) f.box(-w / 2 + 0.15 + gw / 2 + k * step, y, 0.02, gw, gh, d - 0.1, 1 / gw, 1 / gh);
  }
  addTo(p, mat, b);
  if (fill) addTo(p, fillMat || IM.shelfSnack, f);
  return p;
}
export function counter(rng, w = 4, d = 0.7, h = 0.95) {
  const p = new Map();
  const b = new GeoBuf(), t = new GeoBuf();
  b.box(0, h / 2, 0, w, h, d, 0.8);
  t.box(0, h + 0.03, 0, w + 0.12, 0.06, d + 0.1, 1);
  addTo(p, IM.counter, b);
  addTo(p, IM.woodDark, t);
  return p;
}
export function register() {
  const p = new Map();
  const b = new GeoBuf(), s = new GeoBuf();
  b.box(0, 0.16, 0, 0.34, 0.32, 0.3, 1);
  s.box(0, 0.44, -0.02, 0.3, 0.24, 0.04, 1);
  s.box(0.2, 0.36, 0.05, 0.22, 0.1, 0.16, 1);
  addTo(p, IM.cream, b);
  addTo(p, IM.screen, s);
  return p;
}
export function coffeeMachine() {
  const p = new Map();
  const b = new GeoBuf(), m = new GeoBuf();
  b.box(0, 0.24, 0, 0.44, 0.48, 0.4, 1);
  m.box(0, 0.12, 0.22, 0.3, 0.1, 0.06, 1);
  m.cyl(0.14, 0.03, 0, 0.03, 0.03, 0.12, 6);
  m.box(0, 0.5, 0.06, 0.36, 0.06, 0.3, 1);
  addTo(p, IM.metalDark, b);
  addTo(p, IM.metal, m);
  return p;
}
export function bed(rng) {
  const p = new Map();
  const b = new GeoBuf(), q = new GeoBuf();
  b.box(0, 0.2, 0, 1.0, 0.3, 1.95, 1);
  b.box(0, 0.5, -0.95, 1.0, 0.7, 0.08, 1);
  q.box(0, 0.42, 0.2, 0.98, 0.16, 1.4, 1);
  q.box(0, 0.5, -0.7, 0.6, 0.12, 0.34, 1);
  addTo(p, IM.woodDark, b);
  addTo(p, IM.fabricWarm, q);
  return p;
}
export function fridge() {
  const p = new Map();
  const b = new GeoBuf(), m = new GeoBuf();
  b.box(0, 0.85, 0, 0.62, 1.7, 0.66, 1);
  m.box(0.28, 0.9, 0.34, 0.04, 0.5, 0.04, 1);
  m.box(0.28, 0.4, 0.34, 0.04, 0.4, 0.04, 1);
  m.box(0, 1.35, 0.33, 0.6, 0.03, 0.02, 1);
  addTo(p, IM.cream, b);
  addTo(p, IM.metal, m);
  return p;
}
export function washingMachine() {
  const p = new Map();
  const b = new GeoBuf(), g = new GeoBuf();
  b.box(0, 0.42, 0, 0.58, 0.84, 0.58, 1);
  g.cyl(0, 0.44, 0.3, 0.19, 0.19, 0.04, 12);
  addTo(p, IM.white, b);
  addTo(p, IM.glass, g);
  return p;
}
export function kitchenSink() {
  const p = new Map();
  const b = new GeoBuf(), m = new GeoBuf();
  b.box(0, 0.42, 0, 1.4, 0.84, 0.6, 0.8);
  m.box(0, 0.86, 0, 1.46, 0.06, 0.64, 1);
  m.box(0, 0.9, -0.2, 0.05, 0.24, 0.05, 1);
  m.box(0, 1.02, -0.13, 0.05, 0.05, 0.18, 1);
  addTo(p, IM.woodLight, b);
  addTo(p, IM.metal, m);
  return p;
}
export function stove() {
  const p = new Map();
  const b = new GeoBuf(), m = new GeoBuf();
  b.box(0, 0.4, 0, 0.7, 0.8, 0.6, 1);
  m.box(0, 0.82, 0, 0.72, 0.04, 0.62, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) m.cyl(sx * 0.16, 0.85, sz * 0.14, 0.09, 0.09, 0.03, 8);
  addTo(p, IM.cream, b);
  addTo(p, IM.black, m);
  return p;
}
export function wardrobe() {
  const p = new Map();
  const b = new GeoBuf(), m = new GeoBuf();
  b.box(0, 0.95, 0, 1.2, 1.9, 0.55, 0.8);
  m.box(0, 0.95, 0.28, 0.03, 1.8, 0.02, 1);
  m.box(-0.12, 0.95, 0.29, 0.04, 0.16, 0.03, 1);
  m.box(0.12, 0.95, 0.29, 0.04, 0.16, 0.03, 1);
  addTo(p, IM.wood, b);
  addTo(p, IM.woodDark, m);
  return p;
}
export function shoeRack() {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.42, 0, 0.9, 0.06, 0.34, 1);
  b.box(0, 0.84, 0, 0.9, 0.06, 0.34, 1);
  b.box(-0.44, 0.45, 0, 0.05, 0.9, 0.34, 1);
  b.box(0.44, 0.45, 0, 0.05, 0.9, 0.34, 1);
  addTo(p, IM.woodLight, b);
  return p;
}
export function magazineRack() {
  const p = new Map();
  const b = new GeoBuf();
  for (let i = 0; i < 3; i++) b.box(0, 0.5 + i * 0.32, 0.06, 0.8, 0.04, 0.3, 1);
  b.box(-0.4, 0.75, 0, 0.05, 1.5, 0.36, 1);
  b.box(0.4, 0.75, 0, 0.05, 1.5, 0.36, 1);
  addTo(p, IM.metal, b);
  return p;
}
export function plant(rng, size = 1) {
  const p = new Map();
  const b = new GeoBuf(), l = new GeoBuf();
  b.cyl(0, 0.16 * size, 0, 0.18 * size, 0.14 * size, 0.32 * size, 8);
  l.sphere(0, 0.55 * size, 0, 0.3 * size, 1, 0.3, 2);
  l.sphere(0.2 * size, 0.42 * size, 0.1 * size, 0.2 * size, 1, 0.3, 5);
  addTo(p, IM.ceramic, b);
  addTo(p, IM.leaf, l);
  return p;
}
export function bulletinBoard() {
  const p = new Map();
  const b = new GeoBuf(), c = new GeoBuf();
  b.box(0, 0.9, 0, 1.4, 1.1, 0.07, 1);
  for (let i = 0; i < 4; i++) c.box(-0.45 + (i % 2) * 0.6, 0.7 + Math.floor(i / 2) * 0.4, 0.05, 0.3, 0.4, 0.02, 1);
  addTo(p, IM.woodDark, b);
  addTo(p, IM.paper, c);
  return p;
}
export function ceilingLight(rng) {
  const p = new Map();
  const b = new GeoBuf(), g = new GeoBuf();
  b.cyl(0, -0.03, 0, 0.22, 0.26, 0.06, 10);
  g.cyl(0, -0.09, 0, 0.2, 0.2, 0.05, 10);
  addTo(p, IM.white, b);
  addTo(p, IM.glow, g);
  return p;
}
export function stage() {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.3, 0, 5.5, 0.6, 3.0, 0.8);
  b.box(0, 0.75, -1.4, 5.5, 0.9, 0.2, 1);
  addTo(p, IM.wood, b);
  return p;
}
export function foldingTable(rng) {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.7, 0, 1.4, 0.05, 0.7, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * 0.62, 0.35, sz * 0.3, 0.05, 0.7, 0.05, 1);
  addTo(p, IM.cream, b);
  return p;
}
export function doorLeaf(rng) {
  const p = new Map();
  const b = new GeoBuf(), g = new GeoBuf();
  b.box(0, 1.05, 0, 0.9, 2.1, 0.06, 1);
  g.box(0.24, 1.05, 0.04, 0.05, 0.05, 0.05, 1);
  addTo(p, IM.woodDark, b);
  addTo(p, IM.metal, g);
  return p;
}
export function slidingDoor(rng) {
  const p = new Map();
  const b = new GeoBuf(), g = new GeoBuf();
  b.box(0, 1.05, 0, 0.9, 2.1, 0.05, 1);
  g.box(0, 1.15, 0.04, 0.8, 1.7, 0.02, 1);
  addTo(p, IM.woodLight, b);
  addTo(p, IM.glass, g);
  return p;
}
export function onigiriCase() {
  const p = new Map();
  const b = new GeoBuf(), g = new GeoBuf();
  b.box(0, 0.5, 0, 1.1, 1.0, 0.45, 1);
  g.box(0, 0.55, 0.24, 1.0, 0.6, 0.02, 1);
  addTo(p, IM.cream, b);
  addTo(p, IM.glass, g);
  return p;
}
export function fridgeCase() {
  const p = new Map();
  const b = new GeoBuf(), g = new GeoBuf();
  b.box(0, 0.9, 0, 1.2, 1.8, 0.6, 1);
  for (let i = 0; i < 4; i++) g.box(-0.36 + (i % 2) * 0.72, 0.5 + Math.floor(i / 2) * 0.7, 0.31, 0.6, 0.6, 0.03, 1);
  addTo(p, IM.white, b);
  addTo(p, IM.glass, g);
  return p;
}
export function bathTub() {
  const p = new Map();
  const b = new GeoBuf(), w = new GeoBuf();
  b.box(0, 0.28, 0, 1.6, 0.56, 0.75, 1);
  w.box(0, 0.5, 0, 1.45, 0.12, 0.62, 1);
  addTo(p, IM.ceramic, b);
  addTo(p, IM.glow, w);
  return p;
}
export function toilet() {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.2, 0, 0.36, 0.4, 0.5, 1);
  b.box(0, 0.42, 0.04, 0.36, 0.08, 0.42, 1);
  b.box(0, 0.5, -0.2, 0.38, 0.5, 0.2, 1);
  addTo(p, IM.ceramic, b);
  return p;
}
export function kotatsu() {
  const p = new Map();
  const b = new GeoBuf();
  b.box(0, 0.4, 0, 1.0, 0.06, 1.0, 1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * 0.44, 0.2, sz * 0.44, 0.06, 0.4, 0.06, 1);
  addTo(p, IM.woodDark, b);
  addTo(p, IM.fabricWarm, new GeoBuf().box(0, 0.56, 0, 1.15, 0.2, 1.15, 1));
  return p;
}
