// ================================================================
//  道具工厂：树木、路灯、自贩机、自行车、长椅、护栏、石灯笼…
//  每个工厂返回 { material -> GeoBuf }（局部坐标，原点在底部）
// ================================================================
import * as THREE from 'three';
import { GeoBuf, mergeBuf } from './geom.js';
import { toon, registerNightLight, basic } from '../render/toon.js';
import { PAL, mixHex } from '../render/palette.js';
import { vendingTex, signTex, windowTex } from '../render/textures.js';
import { TAU, lerp } from '../util/math.js';

/* ---------------- 共享材质 ---------------- */
export const PM = {};
export function initPropMaterials() {
  const t = (c, o) => toon(c, o);
  PM.bark = t(0x6a5140);
  PM.barkDark = t(0x503d2c);
  PM.sakuraA = t(PAL.sakura);
  PM.sakuraB = t(PAL.sakuraDeep);
  PM.sakuraC = t(PAL.sakuraPale);
  PM.leafA = t(PAL.leaf);
  PM.leafB = t(PAL.leafLight);
  PM.leafDark = t(PAL.leafDark);
  PM.pine = t(PAL.pine);
  PM.bamboo = t(PAL.bamboo);
  PM.wood = t(0xa8794a);
  PM.woodLight = t(0xd0a878);
  PM.woodDark = t(0x6b4a2e);
  PM.woodRed = t(0x9d4b3f);
  PM.metal = t(0xa8adb5);
  PM.metalDark = t(0x6c7178);
  PM.white = t(0xf6f4ee);
  PM.concrete = t(0xbdb8ac);
  PM.red = t(0xd0504c);
  PM.redDeep = t(0x9e3a38);
  PM.blue = t(0x4a7fb5);
  PM.green = t(0x5f9c62);
  PM.yellow = t(0xefc04a);
  PM.rubber = t(0x33333a);
  PM.gray = t(0x8f8f99);
  PM.dark = t(0x4a4a54);
  PM.stone = t(0x9a9384);
  PM.stoneDark = t(0x7a7466);
  PM.ceramic = t(0xd8d2c2);
  PM.fabricA = t(0xe4e0d2);
  PM.fabricB = t(0x9fc0d4);

  // 会亮的东西
  PM.lampGlass = t(0xfff4d8);
  registerNightLight(PM.lampGlass, { night: new THREE.Color(0xfff0c8), dayEmissive: new THREE.Color(0x000000), nightIntensity: 2.4, threshold: 0.26 });
  PM.neonSign = t(0xffffff, { map: signTex({ text: '営業中', sub: 'OPEN', bg: 0xe8a94c, fg: 0x4a3020, accent: 0x9e3a38, w: 256, h: 128, size: 62, subSize: 20 }) });
  registerNightLight(PM.neonSign, { night: new THREE.Color(0xffd08a), nightIntensity: 2.0, threshold: 0.3 });

  PM.vendBody = t(0xdfe4ea);
  PM.vendFace = toon(0xffffff, { map: vendingTex('beverage') });
  registerNightLight(PM.vendFace, { night: new THREE.Color(0xcfe4ff), nightIntensity: 0.85, threshold: 0.3 });
  registerNightLight(PM.vendBody, { night: new THREE.Color(0x6a7a90), nightIntensity: 0.3, threshold: 0.3 });

  PM.glass = toon(0xc8dcea, { transparent: true, opacity: 0.4, depthWrite: false });
  PM.waterLight = t(0x9ec4dc);
}

/* ------------------------------------------------------------------ *
 *  树木
 * ------------------------------------------------------------------ */
export function sakuraTree(rng, scale = 1) {
  const out = new Map();
  const s = scale * (0.85 + rng() * 0.35);
  const trunkH = (2.1 + rng() * 0.7) * s;
  const bt = new GeoBuf(), bb = new GeoBuf(), bc = new GeoBuf();
  bt.cyl(0, 0, 0, 0.13 * s, 0.24 * s, trunkH, 7);
  // 板根
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + rng();
    bt.cyl(Math.cos(a) * 0.16 * s, 0.1 * s, Math.sin(a) * 0.16 * s, 0.07 * s, 0.12 * s, 0.4 * s, 5);
  }
  // 分枝
  const nb = 3 + Math.floor(rng() * 2);
  for (let i = 0; i < nb; i++) {
    const a = (i / nb) * TAU + rng() * 0.8;
    const len = (0.9 + rng() * 0.6) * s;
    const b = new GeoBuf();
    b.cyl(0, 0, 0, 0.05 * s, 0.09 * s, len, 5);
    const m = new THREE.Matrix4().makeTranslation(0, trunkH * 0.78, 0);
    m.multiply(new THREE.Matrix4().makeRotationZ(Math.cos(a) * 0.62));
    m.multiply(new THREE.Matrix4().makeRotationX(Math.sin(a) * 0.62));
    b.applyMatrix(m);
    mergeBuf(bt, b);
  }
  // 树冠
  const cy = trunkH + 0.5 * s;
  const cr = (1.35 + rng() * 0.4) * s;
  const n = 5 + Math.floor(rng() * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + rng() * 0.6;
    const rr = cr * (0.5 + rng() * 0.4);
    const px = Math.cos(a) * cr * 0.55 * (0.4 + rng() * 0.7);
    const pz = Math.sin(a) * cr * 0.55 * (0.4 + rng() * 0.7);
    const py = cy + (rng() - 0.45) * cr * 0.55;
    const target = rng() < 0.3 ? bc : bb;
    target.sphere(px, py, pz, rr, 1, 0.16, i * 3.7 + rng() * 9);
  }
  bb.sphere(0, cy + cr * 0.2, 0, cr * 0.68, 1, 0.18, 4.1);
  out.set(PM.bark, bt);
  out.set(PM.sakuraA, bb);
  out.set(PM.sakuraB, bc);
  return out;
}

export function pinkTree(rng, scale = 1) {  // 比较大的一棵
  const t = sakuraTree(rng, scale * 1.35);
  return t;
}

export function pineTree(rng, scale = 1) {
  const out = new Map();
  const s = scale * (0.8 + rng() * 0.5);
  const bt = new GeoBuf(), bl = new GeoBuf();
  const h = (5 + rng() * 4) * s;
  bt.cyl(0, 0, 0, 0.1 * s, 0.26 * s, h * 0.5, 6);
  const layers = 4 + Math.floor(rng() * 2);
  for (let i = 0; i < layers; i++) {
    const t = i / layers;
    const y = h * (0.22 + t * 0.72);
    const r = (1.5 - t * 1.15) * s * (0.85 + rng() * 0.3);
    const c = new GeoBuf();
    // 圆锥
    const seg = 7, base = 0;
    for (let k = 0; k < seg; k++) {
      const a0 = (k / seg) * TAU, a1 = ((k + 1) / seg) * TAU;
      const p0 = c.vert(Math.cos(a0) * r, y - r * 0.35, Math.sin(a0) * r, Math.cos(a0) * 0.4, 0.4, Math.sin(a0) * 0.4, 0, 0);
      const p1 = c.vert(Math.cos(a1) * r, y - r * 0.35, Math.sin(a1) * r, Math.cos(a1) * 0.4, 0.4, Math.sin(a1) * 0.4, 1, 0);
      const p2 = c.vert(0, y + r * 1.25, 0, 0, 1, 0, 0.5, 1);
      c.tri(p0, p1, p2);
      const q0 = c.vert(0, y - r * 0.35, 0, 0, -1, 0, 0.5, 0.5);
      c.tri(q0, p1, p0);
    }
    mergeBuf(bl, c);
  }
  out.set(PM.bark, bt);
  out.set(PM.pine, bl);
  return out;
}

export function broadleafTree(rng, scale = 1) {
  const out = new Map();
  const s = scale * (0.8 + rng() * 0.5);
  const bt = new GeoBuf(), bl = new GeoBuf();
  const h = (2.6 + rng() * 1.6) * s;
  bt.cyl(0, 0, 0, 0.12 * s, 0.24 * s, h, 7);
  for (let i = 0; i < 3; i++) {
    const a = rng() * TAU;
    const b = new GeoBuf();
    b.cyl(0, 0, 0, 0.05 * s, 0.08 * s, (0.8 + rng() * 0.5) * s, 5);
    const m = new THREE.Matrix4().makeTranslation(0, h * 0.8, 0);
    m.multiply(new THREE.Matrix4().makeRotationZ(Math.cos(a) * 0.7));
    m.multiply(new THREE.Matrix4().makeRotationX(Math.sin(a) * 0.7));
    b.applyMatrix(m);
    mergeBuf(bt, b);
  }
  const cy = h + 0.7 * s, cr = (1.25 + rng() * 0.55) * s;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + rng();
    bl.sphere(Math.cos(a) * cr * 0.5, cy + (rng() - 0.4) * cr * 0.5, Math.sin(a) * cr * 0.5,
      cr * (0.5 + rng() * 0.3), 1, 0.2, i * 5.1);
  }
  bl.sphere(0, cy + cr * 0.15, 0, cr * 0.7, 1, 0.2, 2.2);
  out.set(PM.bark, bt);
  out.set(PM.leafA, bl);
  return out;
}

export function bush(rng, scale = 1) {
  const out = new Map();
  const s = scale * (0.7 + rng() * 0.6);
  const b = new GeoBuf();
  b.sphere(0, 0.28 * s, 0, 0.42 * s, 1, 0.24, rng() * 9);
  b.sphere(0.32 * s, 0.2 * s, 0.16 * s, 0.3 * s, 1, 0.24, rng() * 9);
  b.sphere(-0.28 * s, 0.22 * s, -0.2 * s, 0.32 * s, 1, 0.24, rng() * 9);
  out.set(rng() < 0.3 ? PM.leafDark : PM.leafB, b);
  return out;
}

export function grassTuft(rng, scale = 1) {
  const out = new Map();
  const s = scale * (0.7 + rng() * 0.7);
  const b = new GeoBuf();
  for (let i = 0; i < 5; i++) {
    const a = rng() * TAU, r = rng() * 0.16 * s;
    const h = (0.22 + rng() * 0.26) * s;
    b.cyl(Math.cos(a) * r, h / 2, Math.sin(a) * r, 0.001, 0.035 * s, h, 3);
  }
  out.set(rng() < 0.35 ? PM.leafB : PM.leafA, b);
  return out;
}

export function flowerBed(rng, scale = 1) {
  const out = new Map();
  const s = scale;
  const st = new GeoBuf(), fl = new GeoBuf();
  for (let i = 0; i < 7; i++) {
    const a = rng() * TAU, r = rng() * 0.5 * s;
    const h = 0.3 + rng() * 0.25;
    st.cyl(Math.cos(a) * r, h / 2, Math.sin(a) * r, 0.02, 0.025, h, 4);
    fl.sphere(Math.cos(a) * r, h + 0.05, Math.sin(a) * r, 0.09, 1, 0.1, rng() * 9);
  }
  out.set(PM.leafDark, st);
  out.set(PM.sakuraC, fl);
  return out;
}

/* ------------------------------------------------------------------ *
 *  街道设施
 * ------------------------------------------------------------------ */
export function utilityPole(rng, scale = 1, withTransformer = false) {
  const out = new Map();
  const c = new GeoBuf(), m = new GeoBuf(), d = new GeoBuf();
  const h = 7.6 * scale;
  c.cyl(0, 0, 0, 0.1, 0.15, h, 8);
  for (let i = 0; i < 3; i++) {
    const y = h - 0.5 - i * 0.75;
    c.box(0, y, 0, 0.08, 0.1, 1.5);
    for (const s of [-0.62, 0, 0.62]) {
      m.cyl(0, 0, 0, 0.045, 0.06, 0.14, 5);
      const mm = new THREE.Matrix4().makeTranslation(s, y + 0.12, 0);
      const t = new GeoBuf();
      t.cyl(0, 0, 0, 0.05, 0.07, 0.15, 5);
      t.applyMatrix(mm);
      mergeBuf(m, t);
    }
  }
  if (withTransformer) {
    d.cyl(0, h - 3.4, 0.24, 0.26, 0.26, 0.9, 8);
    d.box(0, h - 3.9, 0.24, 0.5, 0.3, 0.3);
  }
  out.set(PM.concrete, c);
  out.set(PM.metal, m);
  if (withTransformer) out.set(PM.metalDark, d);
  return out;
}

export function streetLamp(rng) {
  const out = new Map();
  const m = new GeoBuf(), g = new GeoBuf();
  m.cyl(0, 0, 0, 0.07, 0.11, 4.0, 8);
  m.box(0, 0.12, 0, 0.3, 0.24, 0.3);
  m.box(0, 4.05, 0.28, 0.09, 0.09, 0.6);
  m.box(0, 3.9, 0.56, 0.3, 0.12, 0.42);
  g.box(0, 3.76, 0.56, 0.24, 0.16, 0.34);
  out.set(PM.metalDark, m);
  out.set(PM.lampGlass, g);
  return out;
}

export function vendingMachine(rng) {
  const out = new Map();
  const body = new GeoBuf();
  body.box(0, 0.95, 0, 1.05, 1.9, 0.72);
  body.box(0, 0.06, 0, 1.12, 0.12, 0.78);
  out.set(PM.vendBody, body);
  // 正面贴图
  const face = new GeoBuf();
  face.box(0, 0.95, 0.365, 1.0, 1.82, 0.01);
  out.set(PM.vendFace, face);
  return out;
}

export function woodBench(rng) {
  const out = new Map();
  const w = new GeoBuf(), d = new GeoBuf();
  for (let i = 0; i < 4; i++) w.box(0, 0.42, -0.24 + i * 0.16, 1.8, 0.05, 0.13);
  for (let i = 0; i < 3; i++) w.box(0, 0.6 + i * 0.17, -0.34, 1.8, 0.13, 0.05);
  for (const s of [-1, 1]) {
    d.box(s * 0.78, 0.21, -0.1, 0.07, 0.42, 0.56);
    d.box(s * 0.78, 0.68, -0.34, 0.06, 0.66, 0.06);
  }
  out.set(PM.wood, w);
  out.set(PM.metalDark, d);
  return out;
}

export function bicycle(rng, scale = 1, color = null) {
  const out = new Map();
  const frame = new GeoBuf(), dark = new GeoBuf();
  const wheel = new GeoBuf();
  const R = 0.33 * scale;
  for (const s of [-1, 1]) {
    const w = new GeoBuf();
    w.ring(0, 0, 0, R - 0.045, R, 14);
    const m = new THREE.Matrix4().makeTranslation(s * 0.52, R, 0);
    w.applyMatrix(m);
    mergeBuf(wheel, w);
    // 辐条
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * TAU;
      dark.box(s * 0.52, R, 0, 0.02, R * 1.7, 0.02);
    }
  }
  // 车架
  frame.box(0, 0.62, 0, 0.86, 0.05, 0.05);
  frame.box(-0.3, 0.5, 0, 0.05, 0.5, 0.05);
  frame.box(0.22, 0.42, 0, 0.05, 0.42, 0.05);
  frame.box(0.32, 0.78, 0, 0.06, 0.42, 0.05);
  frame.box(-0.42, 0.78, 0, 0.05, 0.3, 0.05);
  frame.box(0.34, 0.96, 0, 0.05, 0.05, 0.5);
  dark.box(0.5, 0.62, 0, 0.06, 0.05, 0.42);
  out.set(color ? toon(color) : PM.blue, frame);
  out.set(PM.dark, dark);
  out.set(PM.rubber, wheel);
  return out;
}

export function planter(rng, s = 1) {
  const out = new Map();
  const p = new GeoBuf(), f = new GeoBuf(), b = new GeoBuf();
  p.box(0, 0.22 * s, 0, 0.8 * s, 0.44 * s, 0.8 * s);
  p.box(0, 0.46 * s, 0, 0.86 * s, 0.08 * s, 0.86 * s);
  b.sphere(0, 0.6 * s, 0, 0.34 * s, 1, 0.25, 1.1);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU;
    f.sphere(Math.cos(a) * 0.18 * s, 0.78 * s, Math.sin(a) * 0.18 * s, 0.1 * s, 1, 0.1, i);
  }
  out.set(PM.ceramic, p);
  out.set(PM.leafDark, b);
  out.set(PM.sakuraB, f);
  return out;
}

export function mailbox(rng) {
  const out = new Map();
  const c = new GeoBuf(), r = new GeoBuf();
  c.cyl(0, 0, 0, 0.06, 0.08, 0.75, 6);
  r.box(0, 0.92, 0, 0.32, 0.38, 0.44);
  r.box(0, 1.13, 0, 0.36, 0.06, 0.48);
  out.set(PM.metalDark, c);
  out.set(PM.red, r);
  return out;
}

export function trashBin(rng) {
  const out = new Map();
  const m = new GeoBuf(), d = new GeoBuf();
  m.cyl(0, 0.32, 0, 0.28, 0.25, 0.64, 10);
  d.cyl(0, 0.68, 0, 0.31, 0.31, 0.08, 10);
  d.cyl(0, 0.78, 0, 0.16, 0.2, 0.14, 8);
  out.set(PM.metal, m);
  out.set(PM.dark, d);
  return out;
}

export function guardrailPost(rng) {
  const out = new Map();
  const m = new GeoBuf();
  m.box(0, 0.35, 0, 0.1, 0.7, 0.1);
  out.set(PM.metal, m);
  return out;
}

export function signPost(text = '注意', sub = '', bg = 0xf2c94c, fg = 0x3a3226) {
  const out = new Map();
  const m = new GeoBuf();
  m.cyl(0, 0, 0, 0.045, 0.045, 1.3, 6);
  out.set(PM.metalDark, m);
  const sm = toon(0xffffff, { map: signTex({ text, sub, bg, fg, accent: fg, w: 256, h: 256, size: 64, subSize: 20, key: 'sp' + text + sub }) });
  out.set(sm, new GeoBuf().box(0, 1.55, 0.03, 0.5, 0.5, 0.04));
  return out;
}

export function stoneLantern(rng) {
  const out = new Map();
  const s = new GeoBuf(), l = new GeoBuf();
  s.cyl(0, 0.12, 0, 0.26, 0.3, 0.24, 6);
  s.cyl(0, 0.62, 0, 0.1, 0.11, 0.78, 6);
  s.box(0, 1.06, 0, 0.36, 0.1, 0.36);
  // 火袋
  s.box(0, 1.28, 0, 0.3, 0.34, 0.3);
  s.cyl(0, 1.56, 0, 0.06, 0.3, 0.2, 6);
  s.sphere(0, 1.68, 0, 0.09, 1, 0, 0);
  l.box(0, 1.28, 0, 0.32, 0.36, 0.32);
  out.set(PM.stone, s);
  out.set(PM.lampGlass, l);
  return out;
}

export function toriiGate(rng, scale = 1) {
  const out = new Map();
  const s = scale;
  const r = new GeoBuf(), d = new GeoBuf();
  const H = 4.4 * s, W = 3.4 * s;
  for (const side of [-1, 1]) {
    r.cyl(side * W / 2, 0, 0, 0.19 * s, 0.23 * s, H, 9);
    d.cyl(side * W / 2, 0, 0, 0.28 * s, 0.3 * s, 0.3 * s, 8);
  }
  // 岛木 + 笠木
  d.box(0, H + 0.16 * s, 0, W + 1.5 * s, 0.2 * s, 0.36 * s);
  d.box(0, H + 0.42 * s, 0, W + 1.9 * s, 0.24 * s, 0.5 * s);
  d.box(0, H - 0.02 * s, 0, W + 0.3 * s, 0.2 * s, 0.26 * s);
  // 贯
  r.box(0, H * 0.72, 0, W + 0.5 * s, 0.16 * s, 0.22 * s);
  r.box(0, H * 0.3, 0, 0.3 * s, H * 0.72, 0.24 * s);
  out.set(PM.red, r);
  out.set(PM.dark, d);
  return out;
}

export function clothesLine(rng) {
  const out = new Map();
  const m = new GeoBuf();
  for (const s of [-1, 1]) {
    m.cyl(s * 1.2, 0, 0, 0.05, 0.06, 1.7, 6);
    m.box(s * 1.2, 1.72, 0, 0.07, 0.07, 0.07);
  }
  m.box(0, 1.7, 0, 2.4, 0.02, 0.02);
  out.set(PM.metal, m);
  const cloth = new GeoBuf();
  for (let i = 0; i < 4; i++) {
    const x = -0.9 + i * 0.6;
    cloth.box(x, 1.42, 0, 0.42, 0.55, 0.03);
  }
  out.set(rng() < 0.5 ? PM.fabricA : PM.fabricB, cloth);
  return out;
}

export function bikeRack(rng) {
  const out = new Map();
  const m = new GeoBuf();
  for (let i = 0; i < 4; i++) {
    const z = -0.6 + i * 0.4;
    m.box(0, 0.3, z, 0.5, 0.05, 0.05);
    m.box(-0.25, 0.15, z, 0.05, 0.3, 0.05);
    m.box(0.25, 0.15, z, 0.05, 0.3, 0.05);
  }
  out.set(PM.metal, m);
  return out;
}

export function busStop(rng) {
  const out = new Map();
  const m = new GeoBuf(), g = new GeoBuf(), p = new GeoBuf();
  for (const s of [-1, 1]) m.box(s * 1.5, 1.1, 0, 0.1, 2.2, 0.1);
  m.box(0, 2.2, 0, 3.3, 0.12, 1.2);
  p.box(0, 1.1, -0.5, 2.9, 2.0, 0.05);
  g.box(0, 1.0, 0, 2.7, 0.06, 0.5);
  out.set(PM.metalDark, m);
  out.set(PM.glass, g);
  out.set(PM.white, p);
  return out;
}

export function stoneWall(rng, len = 4) {
  const out = new Map();
  const s = new GeoBuf();
  const rows = 3;
  for (let r = 0; r < rows; r++) {
    const n = Math.floor(len / 0.5);
    for (let i = 0; i < n; i++) {
      const x = (i - n / 2) * 0.5 + (r % 2 ? 0.25 : 0);
      s.box(x, 0.16 + r * 0.26, 0, 0.46, 0.24, 0.34);
    }
  }
  out.set(PM.stone, s);
  return out;
}

export function powerLineRun(rng, length, sag = 1.2) {
  // 返回线段几何（用于电线）
  const out = {};
  const m = new GeoBuf();
  const segs = 10;
  for (let i = 0; i < segs; i++) {
    const t0 = i / segs, t1 = (i + 1) / segs;
    const y0 = -Math.sin(t0 * Math.PI) * sag, y1 = -Math.sin(t1 * Math.PI) * sag;
    const x0 = t0 * length, x1 = t1 * length;
    const dx = x1 - x0, dy = y1 - y0;
    const l = Math.hypot(dx, dy);
    const b = new GeoBuf();
    b.box(l / 2, 0, 0, l, 0.035, 0.035);
    const mtx = new THREE.Matrix4().makeRotationZ(Math.atan2(dy, dx));
    mtx.setPosition(x0, y0, 0);
    b.applyMatrix(mtx);
    mergeBuf(m, b);
  }
  out.set(PM.dark, m);
  return out;
}

export function trafficMirror(rng) {
  const out = new Map();
  const m = new GeoBuf(), d = new GeoBuf();
  m.cyl(0, 0, 0, 0.05, 0.06, 2.0, 6);
  d.cyl(0, 2.2, 0, 0.32, 0.32, 0.12, 12);
  out.set(PM.metal, m);
  out.set(PM.glass, d);
  return out;
}

export function crate(rng) {
  const out = new Map();
  const w = new GeoBuf();
  w.box(0, 0.24, 0, 0.7, 0.48, 0.5);
  w.box(0, 0.5, 0, 0.74, 0.06, 0.54);
  out.set(PM.wood, w);
  return out;
}

export function acUnit(rng) {
  const out = new Map();
  const m = new GeoBuf(), d = new GeoBuf();
  m.box(0, 0.32, 0, 0.78, 0.58, 0.34);
  d.box(0, 0.32, 0.18, 0.6, 0.44, 0.03);
  out.set(PM.gray, m);
  out.set(PM.metalDark, d);
  return out;
}

export function hydrant(rng) {
  const out = new Map();
  const r = new GeoBuf();
  r.cyl(0, 0, 0, 0.09, 0.11, 0.55, 8);
  r.cyl(0, 0.55, 0, 0.07, 0.09, 0.18, 8);
  r.box(0, 0.38, 0, 0.34, 0.1, 0.1);
  out.set(PM.red, r);
  return out;
}

export function playgroundSlide(rng) {
  const out = new Map();
  const y = new GeoBuf(), m = new GeoBuf(), s = new GeoBuf();
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) m.cyl(sx * 0.7, 0.5, sz * 0.7, 0.06, 0.06, 1.0, 6);
  m.box(0, 1.02, 0, 1.6, 0.1, 1.6);
  for (let i = 0; i < 5; i++) s.box(0, 0.9 - i * 0.18, 0.9 + i * 0.42, 0.8, 0.06, 0.5);
  for (const sx of [-1, 1]) s.box(sx * 0.42, 0.7, 1.4, 0.06, 0.5, 2.2);
  out.set(PM.yellow, y);
  out.set(PM.metal, m);
  out.set(PM.red, s);
  return out;
}

export function swing(rng) {
  const out = new Map();
  const m = new GeoBuf(), y = new GeoBuf();
  for (const sx of [-1, 1]) {
    m.box(sx * 1.1, 1.1, 0, 0.09, 2.2, 0.09);
    m.box(sx * 1.1, 0.05, 0, 0.09, 0.1, 0.9);
  }
  m.box(0, 2.2, 0, 2.4, 0.1, 0.1);
  for (const sx of [-0.55, 0.55]) {
    m.box(sx, 1.4, 0, 0.03, 1.6, 0.03);
    m.box(sx, 0.6, 0, 0.03, 1.6, 0.03);
    y.box(sx, 0.55, 0, 0.5, 0.06, 0.3);
  }
  out.set(PM.metal, m);
  out.set(PM.red, y);
  return out;
}

export function sandbox(rng) {
  const out = new Map();
  const w = new GeoBuf(), s = new GeoBuf();
  for (const sx of [-1, 1]) w.box(sx * 1.5, 0.18, 0, 0.16, 0.36, 3.0);
  for (const sz of [-1, 1]) w.box(0, 0.18, sz * 1.5, 3.16, 0.36, 0.16);
  s.box(0, 0.1, 0, 2.9, 0.2, 2.9);
  out.set(PM.wood, w);
  out.set(PM.stone, s);
  return out;
}

export function fountain(rng) {
  const out = new Map();
  const s = new GeoBuf(), w = new GeoBuf();
  s.cyl(0, 0.2, 0, 1.5, 1.6, 0.4, 14);
  s.cyl(0, 0.55, 0, 0.24, 0.3, 0.7, 8);
  s.cyl(0, 0.95, 0, 0.7, 0.5, 0.14, 12);
  w.cyl(0, 0.36, 0, 1.35, 1.35, 0.06, 14);
  out.set(PM.stone, s);
  out.set(PM.waterLight, w);
  return out;
}

export function waterWheel(rng) {
  const out = new Map();
  const w = new GeoBuf(), wd = new GeoBuf();
  const R = 1.5;
  w.cyl(0, R, 0, R, R, 0.5, 14);
  const wheel = new GeoBuf();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU;
    const p = wheel.box(Math.cos(a) * R, Math.sin(a) * R, 0, 0.3, 0.08, 0.7);
  }
  const m = new THREE.Matrix4().makeRotationX(Math.PI / 2);
  wheel.applyMatrix(m);
  mergeBuf(wd, wheel);
  // 木屋
  wd.box(0, 1.0, -1.6, 3.2, 2.0, 2.4);
  out.set(PM.wood, w);
  out.set(PM.woodDark, wd);
  return out;
}

export function noticeBoard(rng) {
  const out = new Map();
  const m = new GeoBuf(), w = new GeoBuf();
  for (const s of [-1, 1]) m.cyl(s * 0.8, 0, 0, 0.06, 0.07, 1.5, 6);
  m.box(0, 1.6, 0, 1.7, 0.08, 0.08);
  w.box(0, 1.35, 0, 1.6, 1.1, 0.1);
  out.set(PM.woodDark, m);
  out.set(PM.wood, w);
  return out;
}

export function flagPole(rng) {
  const out = new Map();
  const m = new GeoBuf(), f = new GeoBuf();
  m.cyl(0, 0, 0, 0.05, 0.07, 6.5, 6);
  f.box(0.35, 5.6, 0, 0.7, 0.45, 0.02);
  out.set(PM.gray, m);
  out.set(PM.white, f);
  return out;
}

export function benchTable(rng) { return woodBench(rng); }

export function waterTap(rng) {
  const out = new Map();
  const m = new GeoBuf();
  m.cyl(0, 0, 0, 0.08, 0.1, 0.7, 8);
  m.box(0, 0.75, 0, 0.3, 0.08, 0.1);
  out.set(PM.metal, m);
  return out;
}
