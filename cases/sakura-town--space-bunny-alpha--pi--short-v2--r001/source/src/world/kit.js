/**
 * 日式建筑构件库：屋顶（带日式反宇曲线）、障子窗、拉门、招牌、暖帘、
 * 雨棚、围栏、石灯笼、鸟居等。全部以“往 GeoBuilder 里加几何体”的方式使用。
 */
import * as THREE from 'three';
import { boxGeometry, cylinderGeometry, PALETTE, sphereGeometry } from '../core/toon.js';
import { GeoBuilder } from '../core/geobuilder.js';
import { norenTexture, signTexture } from './textures.js';

// ---------------------------------------------------------------------------
// 屋顶
// ---------------------------------------------------------------------------
/**
 * 带日式“反宇”反曲线的坡屋顶。
 * 屋脊沿局部 X 轴，坡面朝 ±Z。
 * @param {number} w 主体宽（沿 X）
 * @param {number} d 主体深（沿 Z）
 * @param {number} h 屋脊高度（相对檐口）
 * @param {number} o 出檐
 */
export function makeRoofGeometry(w, d, h, o, { ridgeFactor = 1, seg = 4, curve = 0.62, eaveThick = 0.14 } = {}) {
  const hw = w / 2 + o;
  const hd = d / 2 + o;
  const rhw = hw * ridgeFactor;
  const rows = [];

  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const y = h * (1 - Math.pow(t, curve));
    const z = t * hd;
    const xh = rhw + (hw - rhw) * Math.pow(t, 0.85);
    rows.push({ y, z, xh });
  }

  const pos = [];
  const push = (x, y, z) => pos.push(x, y, z);
  // 三次顶点的面，逆时针为外侧（与 three 的正面定义一致）
  const tri = (a, b, c) => {
    push(...a); push(...b); push(...c);
  };
  const quad = (a, b, c, d2) => {
    tri(a, b, c);
    tri(a, c, d2);
  };

  // 前后坡面（注意绕序要朝外，否则法线朝下，描边外壳会盖住屋顶）
  for (let i = 0; i < seg; i++) {
    const r0 = rows[i];
    const r1 = rows[i + 1];
    // 厚度固定，檐口处不要收成 0，否则会和底面打架出现条纹
    const y0 = r0.y - eaveThick * 0.5;
    const y1 = r1.y - eaveThick * 0.5;
    // 前坡（+Z）：外法线朝 (+Y, +Z)
    quad([-r0.xh, y0, r0.z], [-r1.xh, y1, r1.z], [r1.xh, y1, r1.z], [r0.xh, y0, r0.z]);
    // 后坡（-Z）：外法线朝 (+Y, -Z)
    quad([r0.xh, y0, -r0.z], [r1.xh, y1, -r1.z], [-r1.xh, y1, -r1.z], [-r0.xh, y0, -r0.z]);
  }
  // 两端（hip）
  if (ridgeFactor < 0.999) {
    for (const s of [1, -1]) {
      const tip = [s * rhw, h, 0];
      const a = [s * hw, -eaveThick, hd];
      const b = [s * hw, -eaveThick, -hd];
      if (s > 0) tri(tip, b, a);
      else tri(tip, a, b);
    }
  }
  // 底面（檐口平面，法线朝 -Y）
  quad([-hw, -eaveThick, hd], [-hw, -eaveThick, -hd], [hw, -eaveThick, -hd], [hw, -eaveThick, hd]);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  const uv = new Float32Array((pos.length / 3) * 2);
  for (let i = 0; i < uv.length / 2; i++) {
    uv[i * 2] = (pos[i * 3] + hw) / (hw * 2);
    uv[i * 2 + 1] = (pos[i * 3 + 2] + hd) / (hd * 2);
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geo.setIndex(Array.from({ length: pos.length / 3 }, (_, i) => i));
  return geo;
}

/** 平板屋顶（便利店） */
export function makeFlatRoofGeometry(w, d, o, t = 0.4) {
  const hw = w / 2 + o;
  const hd = d / 2 + o;
  const g = new THREE.BoxGeometry(hw * 2, t, hd * 2);
  g.translate(0, t / 2, 0);
  return g;
}

// ---------------------------------------------------------------------------
// 障子窗（格子木框 + 纸面）
// ---------------------------------------------------------------------------
/**
 * @param {GeoBuilder} b
 * @param {object} m 材质集合
 * @param {number} w 宽 @param {number} h 高
 * @param {object} t 位置/旋转
 * @param {number} panels 竖向分格
 */
export function addShoji(b, m, w, h, t, panels = 2) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const th = 0.08;
  const frameD = 0.16;
  // 纸面
  b.add(new THREE.PlaneGeometry(w - 0.1, h - 0.1), m.paper, { x, y, z, ry, noOutline: true });
  // 外框
  b.add(boxGeometry(w, th, frameD), m.frame, { x, y: y + h / 2 - th / 2, z, ry });
  b.add(boxGeometry(w, th, frameD), m.frame, { x, y: y - h / 2 + th / 2, z, ry });
  b.add(boxGeometry(th, h, frameD), m.frame, { x: x - (w / 2) * Math.cos(ry), y, z: z + (w / 2) * Math.sin(ry), ry });
  b.add(boxGeometry(th, h, frameD), m.frame, { x: x + (w / 2) * Math.cos(ry), y, z: z - (w / 2) * Math.sin(ry), ry });
  // 竖格
  for (let i = 1; i < panels; i++) {
    const off = -w / 2 + (w * i) / panels;
    b.add(boxGeometry(0.05, h - 0.14, frameD * 0.8), m.frame, {
      x: x + off * Math.cos(ry), y, z: z - off * Math.sin(ry), ry,
    });
  }
  // 横格
  const rows = Math.max(2, Math.round(panels * 1.6));
  for (let i = 1; i < rows; i++) {
    const off = -h / 2 + (h * i) / rows;
    b.add(boxGeometry(w - 0.14, 0.045, frameD * 0.8), m.frame, { x, y: y + off, z, ry });
  }
}

// ---------------------------------------------------------------------------
// 玻璃窗（夜晚会自发光）
// ---------------------------------------------------------------------------
export function addWindow(b, m, w, h, t, frameColor = null, sill = true) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const d = 0.14;
  b.add(new THREE.PlaneGeometry(w - 0.16, h - 0.16), m.glass, { x, y, z, ry, noOutline: true });
  b.add(boxGeometry(w, 0.12, d), m.frame, { x, y: y + h / 2 - 0.06, z, ry });
  b.add(boxGeometry(w, 0.12, d), m.frame, { x, y: y - h / 2 + 0.06, z, ry });
  b.add(boxGeometry(0.12, h, d), m.frame, { x: x - (w / 2) * Math.cos(ry), y, z: z + (w / 2) * Math.sin(ry), ry });
  b.add(boxGeometry(0.12, h, d), m.frame, { x: x + (w / 2) * Math.cos(ry), y, z: z - (w / 2) * Math.sin(ry), ry });
  // 中挺
  b.add(boxGeometry(0.07, h - 0.2, d * 0.85), m.frame, { x, y, z, ry });
  if (sill) b.add(boxGeometry(w + 0.16, 0.1, 0.3), m.frame, { x, y: y - h / 2 - 0.05, z, ry });
}

// ---------------------------------------------------------------------------
// 拉门 / 入口
// ---------------------------------------------------------------------------
export function addDoor(b, m, w, h, t, { noren = null, norenColor = 0x8a3b32, norenText = '', step = 0.2 } = {}) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const d = 0.2;
  b.add(new THREE.PlaneGeometry(w - 0.2, h - 0.2), m.doorDark, { x, y: y + h / 2 - 0.1, z, ry, noOutline: true });
  b.add(boxGeometry(w, 0.14, d), m.frame, { x, y: y + h - 0.07, z, ry });
  b.add(boxGeometry(0.14, h, d), m.frame, { x: x - (w / 2) * Math.cos(ry), y: y + h / 2, z: z + (w / 2) * Math.sin(ry), ry });
  b.add(boxGeometry(0.14, h, d), m.frame, { x: x + (w / 2) * Math.cos(ry), y: y + h / 2, z: z - (w / 2) * Math.sin(ry), ry });
  // 门槛石
  if (step > 0) {
    b.add(boxGeometry(w + 0.7, step, 0.8), m.stone, { x, y: y - step / 2, z: z + 0.3 * Math.cos(ry), ry });
    b.add(boxGeometry(w + 0.2, 0.12, 1.5), m.stone, { x, y: y - step - 0.06, z: z + 0.75 * Math.cos(ry), ry });
  }
  // 暖帘
  if (noren) {
    const tex = norenTexture({ text: norenText, color: `#${norenColor.toString(16).padStart(6, '0')}` });
    const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true, opacity: 0.97 });
    b.add(new THREE.PlaneGeometry(w * 0.92, h * 0.42), mat, { x, y: y + h - h * 0.22, z: z + 0.16, ry, noOutline: true });
  }
}

// ---------------------------------------------------------------------------
// 雨棚 / 遮阳篷
// ---------------------------------------------------------------------------
export function addAwning(b, m, w, depth, color, t, { scallop = true, drop = 0.5 } = {}) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const mat = m.accentFor ? m.accentFor(color) : m.frame;
  // 斜面
  const g = new THREE.BoxGeometry(w, 0.1, depth);
  b.add(g, mat, { x, y: y - drop * 0.5, z: z + depth * 0.5, rx: -0.22, ry });
  // 支撑
  const s = new THREE.BoxGeometry(0.1, 0.1, depth * 1.05);
  b.add(s, m.metal, { x: x - (w / 2 - 0.2) * Math.cos(ry), y: y - drop * 0.42, z: z + depth * 0.5 + 0.1 * Math.sin(ry), ry });
  b.add(s, m.metal, { x: x + (w / 2 - 0.2) * Math.cos(ry), y: y - drop * 0.42, z: z + depth * 0.5 - 0.1 * Math.sin(ry), ry });
  if (scallop) {
    b.add(boxGeometry(w, 0.22, 0.1), mat, { x, y: y - drop, z: z + depth, ry });
  }
}

// ---------------------------------------------------------------------------
// 招牌
// ---------------------------------------------------------------------------
export function addSign(b, m, spec, w, h, t) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const tex = signTexture({
    text: spec.text,
    sub: spec.sub || '',
    bg: spec.bg ? `#${spec.bg.toString(16).padStart(6, '0')}` : '#3a4a58',
    fg: spec.color ? `#${spec.color.toString(16).padStart(6, '0')}` : '#f6f0e2',
  });
  const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
  b.add(boxGeometry(w + 0.18, h + 0.18, 0.12), m.frame, { x, y, z, ry });
  b.add(new THREE.PlaneGeometry(w, h), mat, { x: x + 0.07 * Math.sin(ry), y, z: z + 0.07 * Math.cos(ry), ry, noOutline: true });
  // 背面
  b.add(new THREE.PlaneGeometry(w, h), mat, {
    x: x - 0.07 * Math.sin(ry), y, z: z - 0.07 * Math.cos(ry), ry: ry + Math.PI, noOutline: true,
  });
}

// ---------------------------------------------------------------------------
// 围栏 / 石阶 / 杂项
// ---------------------------------------------------------------------------
export function addFence(b, m, len, t, { h = 0.85, postEvery = 1.5, style = 'wood' } = {}) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const n = Math.max(2, Math.round(len / postEvery));
  const step = len / n;
  const mat = style === 'wood' ? m.wood : m.metal;
  b.add(boxGeometry(len, 0.1, 0.08), mat, { x, y: y + h * 0.86, z, ry });
  b.add(boxGeometry(len, 0.08, 0.06), mat, { x, y: y + h * 0.42, z, ry });
  for (let i = 0; i <= n; i++) {
    const off = -len / 2 + i * step;
    b.add(boxGeometry(0.11, h, 0.11), mat, { x: x + off * Math.cos(ry), y: y + h / 2, z: z - off * Math.sin(ry), ry });
  }
}

export function addStoneSteps(b, m, w, steps, t) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  for (let i = 0; i < steps; i++) {
    const rise = 0.22;
    b.add(boxGeometry(w, rise, 0.55), m.stone, {
      x, y: y + rise * (i + 0.5), z: z - i * 0.5 * Math.cos(ry), ry,
    });
  }
}

export function addPlanter(b, m, w, d, t, { flowers = true } = {}) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  b.add(boxGeometry(w, 0.5, d), m.concrete, { x, y: y + 0.25, z, ry });
  b.add(boxGeometry(w + 0.1, 0.1, d + 0.1), m.stone, { x, y: y + 0.52, z, ry });
  b.add(boxGeometry(w - 0.3, 0.14, d - 0.3), m.soil, { x, y: y + 0.5, z, ry, noOutline: true });
  if (flowers) {
    const n = Math.max(3, Math.round((w * d) / 1.2));
    for (let i = 0; i < n; i++) {
      const fx = (Math.random() - 0.5) * (w - 0.6);
      const fz = (Math.random() - 0.5) * (d - 0.6);
      const c = i % 3 === 0 ? m.flowerA : i % 3 === 1 ? m.flowerB : m.flowerC;
      b.add(new THREE.IcosahedronGeometry(0.16, 0), c, {
        x: x + fx * Math.cos(ry) - fz * Math.sin(ry),
        y: y + 0.68,
        z: z + fx * Math.sin(ry) + fz * Math.cos(ry),
        ry,
      });
    }
  } else {
    for (let i = 0; i < 3; i++) {
      b.add(sphereGeometry(0.3, 7), m.bush, {
        x: x + (i - 1) * (w / 3) * Math.cos(ry), y: y + 0.68, z: z - (i - 1) * (w / 3) * Math.sin(ry), ry,
      });
    }
  }
}

/** 空调外机 / 通风管之类的“生活痕迹” */
export function addACUnit(b, m, t) {
  const { x = 0, y = 0, z = 0, ry = 0, scale = 1 } = t;
  b.add(boxGeometry(0.9 * scale, 0.7 * scale, 0.6 * scale), m.metal, { x, y, z, ry });
  b.add(new THREE.CircleGeometry(0.26 * scale, 10), m.metalDark, {
    x: x + 0.31 * scale * Math.sin(ry), y, z: z + 0.31 * scale * Math.cos(ry), rx: Math.PI / 2, ry, noOutline: true,
  });
}

export function addBarrel(b, m, t, color = null) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  const mat = color ? m.accentFor(color) : m.metal;
  b.add(cylinderGeometry(0.3, 0.28, 0.86, 10), mat, { x, y: y + 0.43, z, ry });
  b.add(cylinderGeometry(0.32, 0.32, 0.06, 10), m.metalDark, { x, y: y + 0.62, z, ry });
  b.add(cylinderGeometry(0.32, 0.32, 0.06, 10), m.metalDark, { x, y: y + 0.24, z, ry });
}

/** 邮筒 */
export function addMailbox(b, m, t) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  b.add(boxGeometry(0.7, 1.05, 0.5), m.accentFor(0xd65545), { x, y: y + 0.72, z, ry });
  b.add(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 10, 1, false, 0, Math.PI), m.accentFor(0xd65545), {
    x, y: y + 1.24, z, ry, rz: Math.PI / 2,
  });
  b.add(boxGeometry(0.36, 0.06, 0.04), m.metalDark, { x: x + 0.3 * Math.sin(ry), y: y + 0.9, z: z + 0.3 * Math.cos(ry), ry });
  b.add(boxGeometry(0.12, 0.45, 0.12), m.metal, { x, y: y + 0.22, z, ry });
  b.add(boxGeometry(0.4, 0.08, 0.4), m.metal, { x, y: y + 0.04, z, ry });
}

/** 路灯 / 街灯（灯罩材质由外部按昼夜切换） */
export function addStreetLamp(b, m, t, h = 4.2, style = 'post') {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  b.add(cylinderGeometry(0.09, 0.12, h, 8), m.metalDark, { x, y: y + h / 2, z });
  b.add(cylinderGeometry(0.2, 0.24, 0.3, 8), m.metalDark, { x, y: y + 0.15, z });
  if (style === 'post') {
    b.add(boxGeometry(0.9, 0.12, 0.12), m.metalDark, { x: x + 0.4 * Math.cos(ry), y: y + h, z: z - 0.4 * Math.sin(ry), ry });
    b.add(new THREE.SphereGeometry(0.22, 8, 6), m.bulb, {
      x: x + 0.8 * Math.cos(ry), y: y + h - 0.12, z: z - 0.8 * Math.sin(ry), noOutline: true,
    });
  } else {
    b.add(new THREE.ConeGeometry(0.32, 0.34, 8), m.metalDark, { x, y: y + h + 0.1, z });
    b.add(new THREE.SphereGeometry(0.24, 8, 6), m.bulb, { x, y: y + h - 0.16, z, noOutline: true });
  }
}

/** 纸灯笼（夜市/居酒屋） */
export function addLantern(b, m, t, h = 2.6, color = 0xe8552f) {
  const { x = 0, y = 0, z = 0, ry = 0 } = t;
  b.add(cylinderGeometry(0.05, 0.05, h, 6), m.wood, { x, y: y + h / 2, z });
  b.add(new THREE.SphereGeometry(0.24, 10, 8), m.accentFor(color), { x, y: y + h - 0.1, z, sy: 1.25, noOutline: true });
  b.add(cylinderGeometry(0.1, 0.1, 0.08, 8), m.wood, { x, y: y + h - 0.36, z });
}

export { PALETTE };
