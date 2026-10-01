/**
 * 建筑生成器：把 layout.js 里的规格变成实际几何体。
 * 每栋建筑都在自己的局部坐标里搭建（+Z 为正面），最后由 world.js 摆到世界里。
 */
import * as THREE from 'three';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry, cylinderGeometry, sphereGeometry } from '../core/toon.js';
import { heightAt } from './terrain.js';
import {
  addACUnit, addAwning, addBarrel, addDoor, addFence, addMailbox, addPlanter, addShoji,
  addSign, addStoneSteps, addWindow, makeFlatRoofGeometry, makeRoofGeometry,
} from './kit.js';
import { makeRNG } from '../core/utils.js';

/** 建筑基底高度：取四角最高点，避免陷入地面 */
export function buildingBaseY(spec, pad = 0.0) {
  const c = Math.cos(spec.rot || 0);
  const s = Math.sin(spec.rot || 0);
  const hw = spec.w / 2 + 0.6;
  const hd = spec.d / 2 + 0.6;
  let max = -Infinity;
  for (const [lx, lz] of [[-hw, -hd], [hw, -hd], [-hw, hd], [hw, hd], [0, 0]]) {
    const wx = spec.x + lx * c + lz * s;
    const wz = spec.z - lx * s + lz * c;
    max = Math.max(max, heightAt(wx, wz));
  }
  return max + pad;
}

const FLOOR_H = 3.0;

/**
 * @param {object} spec layout 里的建筑数据
 * @param {MaterialLibrary} m
 * @returns {THREE.Group}
 */
export function buildBuilding(spec, m) {
  const b = new GeoBuilder(`bld_${spec.id}`);
  const rng = makeRNG(hashId(spec.id));
  const w = spec.w;
  const d = spec.d;
  const wm = m.wall(spec.wall);
  const rm = m.roof(spec.roofColor || 0x4a5a6b);
  const acc = m.accentFor(spec.accent || 0x8a6a4a);
  const floors = spec.floors || 1;
  const totalH = FLOOR_H * floors;
  const FZ = d / 2;

  // ---- 通用：基座 / 勒脚 / 转角柱 ----
  b.add(boxGeometry(w + 0.4, 1.6, d + 0.4), m.stone, { x: 0, y: -0.85, z: 0 });
  b.add(boxGeometry(w + 0.2, 0.34, d + 0.2), m.stoneDark, { x: 0, y: -0.18, z: 0 });
  if (spec.kind === 'house' || spec.kind === 'farm') {
    b.add(boxGeometry(w + 0.06, 0.7, d + 0.06), m.wood, { x: 0, y: 0.36, z: 0 });
  }

  switch (spec.kind) {
    case 'house':
    case 'farm':
      _house(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng);
      break;
    case 'shop':
      _shop(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng);
      break;
    case 'konbini':
      _konbini(b, m, spec, w, d, wm, acc, rng);
      break;
    case 'cafe':
      _cafe(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng);
      break;
    case 'izakaya':
      _izakaya(b, m, spec, w, d, totalH, wm, rm, acc, rng);
      break;
    case 'station':
      _station(b, m, spec, w, d, wm, rm, acc, rng);
      break;
    case 'shrine':
      _shrine(b, m, spec, w, d, rm, acc, rng);
      break;
    case 'post':
      _post(b, m, spec, w, d, wm, rm, acc, rng);
      break;
    case 'school':
      _school(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng);
      break;
    default:
      _house(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng);
  }

  const group = b.build({ thickness: 0.03, color: 0x2a2130 });
  const baseY = buildingBaseY(spec);
  group.position.set(spec.x, baseY, spec.z);
  group.rotation.y = spec.rot || 0;
  group.userData.spec = spec;
  return group;
}

// ---------------------------------------------------------------------------
// 各类型
// ---------------------------------------------------------------------------

function _walls(b, m, w, d, h, mat, y0 = 0) {
  b.add(boxGeometry(w, h, d), mat, { x: 0, y: y0 + h / 2, z: 0 });
}

function _cornerPosts(b, m, w, d, h, y0 = 0) {
  const t = 0.24;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(boxGeometry(t, h, t), m.wood, { x: (sx * (w - t)) / 2, y: y0 + h / 2, z: (sz * (d - t)) / 2 });
    }
  }
}

function _house(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng) {
  const FZ = d / 2;
  // 墙体：下层木筋土墙，上层纯土墙
  b.add(boxGeometry(w, totalH, d), wm, { x: 0, y: totalH / 2 + 0.3, z: 0 });
  _cornerPosts(b, m, w, d, totalH + 0.3, 0.3);
  // 层间横梁
  if (floors > 1) {
    b.add(boxGeometry(w + 0.14, 0.26, d + 0.14), m.woodDark, { x: 0, y: FLOOR_H + 0.3, z: 0 });
    b.add(boxGeometry(w + 0.06, 0.16, d + 0.06), m.wood, { x: 0, y: FLOOR_H + 0.42, z: 0 });
  }
  // 腰板
  b.add(boxGeometry(w + 0.04, 0.16, d + 0.04), acc, { x: 0, y: 1.42, z: 0 });

  // 一层：门 + 障子
  addDoor(b, m, 1.5, 2.15, { x: 0, y: 0, z: FZ + 0.02 }, { step: 0.22, noren: false });
  if (w > 9) {
    addShoji(b, m, 2.0, 1.75, { x: -w * 0.28, y: 0.78, z: FZ + 0.03 }, 2);
    addShoji(b, m, 2.0, 1.75, { x: w * 0.28, y: 0.78, z: FZ + 0.03 }, 2);
  } else {
    addShoji(b, m, 1.5, 1.6, { x: w * 0.26, y: 0.8, z: FZ + 0.03 }, 2);
  }
  // 侧面窗
  addShoji(b, m, 1.6, 1.5, { x: -w / 2 - 0.03, y: 0.8, z: 0, ry: -Math.PI / 2 }, 2);
  addShoji(b, m, 1.6, 1.5, { x: w / 2 + 0.03, y: 0.8, z: 0, ry: Math.PI / 2 }, 2);

  if (floors > 1) {
    const y2 = FLOOR_H + 0.3;
    const n = Math.max(2, Math.floor(w / 3));
    for (let i = 0; i < n; i++) {
      const x = -w / 2 + (w * (i + 0.5)) / n;
      addShoji(b, m, (w / n) * 0.72, 1.6, { x, y: y2 + 0.6, z: FZ + 0.03 }, 2);
    }
    for (let i = 0; i < Math.max(1, n - 1); i++) {
      const x = -w / 2 + (w * (i + 0.5)) / n;
      addShoji(b, m, (w / n) * 0.6, 1.4, { x, y: y2 + 0.6, z: -FZ - 0.03, ry: Math.PI }, 2);
    }
  }

  // 屋顶
  const rh = spec.roof === 'kawara' ? 1.55 : 2.05;
  const ridgeF = spec.roof === 'kawara' ? 0.72 : 1.0;
  const o = 0.95;
  b.add(makeRoofGeometry(w, d, rh, o, { ridgeFactor: ridgeF }), rm, { x: 0, y: totalH + 0.5, z: 0 });
  // 屋脊
  const ridgeLen = (w + o * 2) * ridgeF;
  b.add(boxGeometry(ridgeLen + 0.3, 0.24, 0.5), m.roof(0x3b4650), { x: 0, y: totalH + 0.5 + rh, z: 0 });
  // 檐口封板
  b.add(boxGeometry(w + o * 2, 0.16, 0.12), m.woodDark, { x: 0, y: totalH + 0.34, z: FZ + o - 0.05 });
  b.add(boxGeometry(w + o * 2, 0.16, 0.12), m.woodDark, { x: 0, y: totalH + 0.34, z: -FZ - o + 0.05 });

  if (spec.balcony && floors > 1) {
    const bw = w * 0.5;
    b.add(boxGeometry(bw, 0.14, 1.2), m.wood, { x: 0, y: FLOOR_H + 0.6, z: FZ + 0.6 });
    addFence(b, m, bw, { x: 0, y: FLOOR_H + 0.68, z: FZ + 1.15 }, { h: 0.7, postEvery: 1.1, style: 'metal' });
  }

  // 门牌 / 侧牌
  if (spec.label) {
    b.add(boxGeometry(0.9, 0.3, 0.08), m.woodDark, { x: -1.2, y: 2.5, z: FZ + 0.05 });
  }

  // 空调外机
  if (floors > 1) {
    addACUnit(b, m, { x: w * 0.28, y: FLOOR_H + 0.8, z: -FZ - 0.35 });
  }
  // 落水管
  b.add(cylinderGeometry(0.09, 0.09, totalH, 6), m.metalDark, { x: -w / 2 - 0.06, y: totalH / 2, z: -FZ - 0.2 });

  if (spec.garden) _garden(b, m, spec, w, d, rng);
}

function _shop(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng) {
  const FZ = d / 2;
  b.add(boxGeometry(w, totalH, d), wm, { x: 0, y: totalH / 2 + 0.3, z: 0 });
  _cornerPosts(b, m, w, d, totalH + 0.3, 0.3);
  b.add(boxGeometry(w + 0.06, 0.3, d + 0.06), m.woodDark, { x: 0, y: totalH + 0.05, z: 0 });
  if (floors > 1) {
    addShoji(b, m, 1.6, 1.5, { x: -w * 0.3, y: FLOOR_H + 0.9, z: FZ + 0.03 }, 2);
    addShoji(b, m, 1.6, 1.5, { x: w * 0.3, y: FLOOR_H + 0.9, z: FZ + 0.03 }, 2);
    b.add(boxGeometry(w + 0.1, 0.24, d + 0.1), m.woodDark, { x: 0, y: FLOOR_H + 0.3, z: 0 });
  }
  // 店铺玻璃橱窗
  const gw = w * 0.36;
  addWindow(b, m, gw, 1.9, { x: -w * 0.28, y: 1.15, z: FZ + 0.04 }, null, true);
  // 门 + 暖帘
  addDoor(b, m, 1.5, 2.1, { x: w * 0.16, y: 0, z: FZ + 0.04 }, {
    step: 0.22, noren: !!spec.noren, norenColor: spec.accent, norenText: spec.sign?.text?.slice(0, 2) || '',
  });
  // 雨棚
  if (spec.awning) {
    addAwning(b, m, w * 0.82, 1.5, spec.awning, { x: -w * 0.06, y: 2.85, z: FZ + 0.02 });
  }
  // 招牌
  if (spec.sign) {
    const sy = floors > 1 ? totalH - 0.9 : 2.95;
    addSign(b, m, spec.sign, Math.min(w * 0.8, 6.4), 1.5, { x: 0, y: sy, z: FZ + 0.1 });
  }
  // 屋顶
  const rh = 1.5;
  b.add(makeRoofGeometry(w, d, rh, 0.85, { ridgeFactor: 0.7 }), rm, { x: 0, y: totalH + 0.45, z: 0 });
  b.add(boxGeometry(w * 0.7 + 0.4, 0.2, 0.42), m.roof(0x39434f), { x: 0, y: totalH + 0.45 + rh, z: 0 });

  if (spec.shutters) {
    b.add(boxGeometry(gw + 0.2, 0.24, 0.3), m.metal, { x: -w * 0.28, y: 2.3, z: FZ + 0.2 });
  }
  // 门口杂物
  if (spec.id === 'store') {
    for (let i = 0; i < 3; i++) {
      addBarrel(b, m, { x: -w / 2 + 0.9, y: 0, z: FZ + 0.9 + i * 0.7 }, i === 1 ? 0xc4553f : null);
    }
    for (let i = 0; i < 4; i++) {
      b.add(boxGeometry(0.7, 0.42, 0.55), m.woodLight, {
        x: w / 2 - 1.0 - (i % 2) * 0.85, y: 0.21 + Math.floor(i / 2) * 0.44, z: FZ + 1.0,
      });
    }
  }
  if (spec.lit) {
    b.add(new THREE.PlaneGeometry(w * 0.7, 0.5), m.signLit, { x: 0, y: 2.62, z: FZ + 0.18, noOutline: true });
  }
}

function _konbini(b, m, spec, w, d, wm, acc, rng) {
  const FZ = d / 2;
  const h = 3.6;
  b.add(boxGeometry(w, h, d), wm, { x: 0, y: h / 2 + 0.3, z: 0 });
  // 平屋顶 + 女儿墙
  b.add(makeFlatRoofGeometry(w, d, 0.5, 0.5), m.concrete, { x: 0, y: h + 0.5, z: 0 });
  b.add(boxGeometry(w + 1.0, 0.6, 0.24), wm, { x: 0, y: h + 0.8, z: FZ + 0.5 });
  b.add(boxGeometry(w + 1.0, 0.6, 0.24), wm, { x: 0, y: h + 0.8, z: -FZ - 0.5 });
  b.add(boxGeometry(0.24, 0.6, d + 1.0), wm, { x: w / 2 + 0.5, y: h + 0.8, z: 0 });
  b.add(boxGeometry(0.24, 0.6, d + 1.0), wm, { x: -w / 2 - 0.5, y: h + 0.8, z: 0 });
  // 招牌带
  b.add(boxGeometry(w + 0.3, 1.5, 0.3), m.accentFor(0x2f7fb5), { x: 0, y: h - 0.1, z: FZ + 0.35 });
  addSign(b, m, { ...spec.sign, bg: 0x2f7fb5 }, w * 0.7, 1.15, { x: 0, y: h - 0.1, z: FZ + 0.55 });
  // 通透玻璃 + 自动门
  b.add(new THREE.PlaneGeometry(w * 0.9, 2.5), m.glassBig, { x: 0, y: 1.65, z: FZ + 0.06, noOutline: true });
  b.add(boxGeometry(0.16, 2.6, 0.2), m.metal, { x: -1.0, y: 1.6, z: FZ + 0.08 });
  b.add(boxGeometry(0.16, 2.6, 0.2), m.metal, { x: 1.0, y: 1.6, z: FZ + 0.08 });
  b.add(boxGeometry(2.3, 0.3, 0.26), m.metal, { x: 0, y: 2.85, z: FZ + 0.1 });
  b.add(boxGeometry(w * 0.92, 0.22, 0.2), m.metal, { x: 0, y: 0.35, z: FZ + 0.08 });
  b.add(boxGeometry(w * 0.92, 0.3, 0.16), m.metal, { x: 0, y: 2.95, z: FZ + 0.1 });
  // 室内可见感：几排货架剪影
  for (let i = 0; i < 3; i++) {
    b.add(boxGeometry(w * 0.24, 1.3, 0.3), m.accentFor(i % 2 ? 0xd8d2c0 : 0xc0c8cc), {
      x: -w * 0.3 + i * w * 0.3, y: 0.9, z: -1.0,
    });
  }
  // 入口台阶与雨棚
  b.add(boxGeometry(w * 0.6, 0.16, 1.2), m.concrete, { x: 0, y: 0.08, z: FZ + 0.7 });
  addAwning(b, m, w * 0.9, 1.3, 0x2f7fb5, { x: 0, y: 3.3, z: FZ + 0.1 });
  // 侧面窗
  addWindow(b, m, 2.2, 1.6, { x: -w / 2 - 0.04, y: 1.7, z: 0, ry: -Math.PI / 2 }, null, false);
  addWindow(b, m, 2.2, 1.6, { x: w / 2 + 0.04, y: 1.7, z: 0, ry: Math.PI / 2 }, null, false);
  // 屋顶设备
  addACUnit(b, m, { x: w * 0.3, y: h + 0.7, z: -1.0, scale: 1.4 });
  b.add(cylinderGeometry(0.35, 0.35, 1.1, 8), m.metal, { x: -w * 0.3, y: h + 1.1, z: 1.2 });
}

function _cafe(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng) {
  const FZ = d / 2;
  b.add(boxGeometry(w, totalH, d), wm, { x: 0, y: totalH / 2 + 0.3, z: 0 });
  _cornerPosts(b, m, w, d, totalH + 0.3, 0.3);
  // 底层大玻璃 + 雨棚
  b.add(new THREE.PlaneGeometry(w * 0.82, 2.3), m.glassBig, { x: 0, y: 1.5, z: FZ + 0.05, noOutline: true });
  b.add(boxGeometry(0.18, 2.5, 0.24), m.woodDark, { x: -w * 0.28, y: 1.5, z: FZ + 0.07 });
  b.add(boxGeometry(0.18, 2.5, 0.24), m.woodDark, { x: w * 0.28, y: 1.5, z: FZ + 0.07 });
  b.add(boxGeometry(0.18, 2.5, 0.24), m.woodDark, { x: 0, y: 1.5, z: FZ + 0.07 });
  b.add(boxGeometry(w * 0.9, 0.24, 0.3), m.woodDark, { x: 0, y: 2.85, z: FZ + 0.1 });
  addAwning(b, m, w * 0.86, 1.4, 0xb8823f, { x: 0, y: 3.0, z: FZ + 0.05 });
  addDoor(b, m, 1.1, 2.1, { x: -w * 0.34, y: 0, z: FZ + 0.06 }, { step: 0.16 });
  // 二层
  b.add(boxGeometry(w + 0.1, 0.26, d + 0.1), m.woodDark, { x: 0, y: FLOOR_H + 0.3, z: 0 });
  for (let i = -1; i <= 1; i++) {
    addShoji(b, m, 1.7, 1.7, { x: i * w * 0.3, y: FLOOR_H + 0.95, z: FZ + 0.03 }, 2);
  }
  // 屋顶
  const rh = 2.2;
  b.add(makeRoofGeometry(w, d, rh, 1.0, { ridgeFactor: 1.0 }), rm, { x: 0, y: totalH + 0.5, z: 0 });
  b.add(boxGeometry(w + 2.2, 0.22, 0.46), m.roof(0x46525a), { x: 0, y: totalH + 0.5 + rh, z: 0 });
  // 烟囱
  if (spec.chimney) {
    b.add(boxGeometry(0.7, 1.9, 0.7), m.stone, { x: w * 0.24, y: totalH + rh * 0.6 + 0.5, z: -d * 0.14 });
    b.add(boxGeometry(0.9, 0.18, 0.9), m.stoneDark, { x: w * 0.24, y: totalH + rh * 0.6 + 1.5, z: -d * 0.14 });
  }
  addSign(b, m, spec.sign, Math.min(w * 0.7, 4.6), 1.2, { x: 0, y: FLOOR_H - 0.55, z: FZ + 0.2 });
  // 户外座位
  if (spec.outdoor) {
    for (let i = 0; i < 2; i++) {
      const tx = -w * 0.3 + i * w * 0.6;
      b.add(cylinderGeometry(0.5, 0.5, 0.08, 10), m.wood, { x: tx, y: 0.72, z: FZ + 1.9 });
      b.add(cylinderGeometry(0.08, 0.1, 0.72, 6), m.metalDark, { x: tx, y: 0.36, z: FZ + 1.9 });
      b.add(cylinderGeometry(0.28, 0.28, 0.05, 8), m.woodDark, { x: tx, y: 0.45, z: FZ + 1.4 });
      b.add(cylinderGeometry(0.28, 0.28, 0.05, 8), m.woodDark, { x: tx, y: 0.45, z: FZ + 2.4 });
      // 遮阳伞
      b.add(cylinderGeometry(0.04, 0.04, 2.3, 6), m.metal, { x: tx, y: 1.15, z: FZ + 1.9 });
      b.add(new THREE.ConeGeometry(1.35, 0.42, 8), m.accentFor(0xd8a05a), { x: tx, y: 2.2, z: FZ + 1.9 });
    }
  }
}

function _izakaya(b, m, spec, w, d, totalH, wm, rm, acc, rng) {
  const FZ = d / 2;
  b.add(boxGeometry(w, totalH, d), wm, { x: 0, y: totalH / 2 + 0.3, z: 0 });
  _cornerPosts(b, m, w, d, totalH + 0.3, 0.3);
  b.add(boxGeometry(w + 0.06, 0.5, d + 0.06), m.woodDark, { x: 0, y: 0.55, z: 0 });
  // 格子窗 + 门
  addWindow(b, m, w * 0.3, 1.5, { x: -w * 0.24, y: 1.0, z: FZ + 0.04 }, null, true);
  addDoor(b, m, 1.4, 2.0, { x: w * 0.24, y: 0, z: FZ + 0.04 }, {
    step: 0.2, noren: true, norenColor: 0x7a3b34, norenText: '灯',
  });
  addAwning(b, m, w * 0.9, 1.2, 0x7a3b34, { x: 0, y: 2.7, z: FZ + 0.04 });
  addSign(b, m, spec.sign, 3.4, 1.3, { x: 0, y: 2.9, z: FZ + 0.12 });
  // 纸灯笼
  b.add(new THREE.SphereGeometry(0.26, 10, 8), m.accentFor(0xe8552f), { x: -w * 0.3, y: 2.25, z: FZ + 0.7, sy: 1.3, noOutline: true });
  b.add(cylinderGeometry(0.04, 0.04, 0.3, 5), m.woodDark, { x: -w * 0.3, y: 2.62, z: FZ + 0.7 });
  // 屋檐灯
  b.add(new THREE.PlaneGeometry(w * 0.6, 0.3), m.bulb, { x: 0, y: 2.62, z: FZ + 0.3, noOutline: true });
  // 屋顶
  b.add(makeRoofGeometry(w, d, 1.5, 1.1, { ridgeFactor: 0.65 }), rm, { x: 0, y: totalH + 0.45, z: 0 });
  b.add(boxGeometry(w * 0.65 + 0.4, 0.2, 0.4), m.roof(0x332e33), { x: 0, y: totalH + 1.95, z: 0 });
  // 酒箱
  for (let i = 0; i < 2; i++) {
    b.add(boxGeometry(0.62, 0.36, 0.42), m.woodDark, { x: w / 2 + 0.6, y: 0.18 + i * 0.38, z: FZ - 0.6 });
  }
}

function _station(b, m, spec, w, d, wm, rm, acc, rng) {
  const FZ = d / 2;
  const h = 3.9;
  b.add(boxGeometry(w, h, d), wm, { x: 0, y: h / 2 + 0.3, z: 0 });
  b.add(makeRoofGeometry(w, d, 1.7, 1.1, { ridgeFactor: 0.8 }), rm, { x: 0, y: h + 0.5, z: 0 });
  b.add(boxGeometry(w * 0.8 + 0.4, 0.22, 0.44), m.roof(0x35404a), { x: 0, y: h + 2.2, z: 0 });
  // 入口面（朝 +Z，站前广场侧）
  addWindow(b, m, w * 0.24, 2.2, { x: -w * 0.3, y: 1.5, z: FZ + 0.05 }, null, false);
  addWindow(b, m, w * 0.24, 2.2, { x: w * 0.3, y: 1.5, z: FZ + 0.05 }, null, false);
  addDoor(b, m, 1.7, 2.3, { x: 0, y: 0, z: FZ + 0.05 }, { step: 0.3 });
  // 站名牌
  addSign(b, m, { text: spec.sign.text, sub: spec.sign.sub, bg: 0xf2efe6, color: 0x2b3a48 }, Math.min(w * 0.7, 9), 1.5, { x: 0, y: 3.0, z: FZ + 0.3 });
  // 站台侧（朝 +Z 也是站台方向，这里站台在 +Z）
  // 雨棚柱
  for (let i = -2; i <= 2; i++) {
    b.add(cylinderGeometry(0.12, 0.12, 2.7, 8), m.metal, { x: i * (w / 5.4), y: 1.35, z: FZ + 1.5 });
  }
  b.add(makeFlatRoofGeometry(w * 0.96, 2.4, 0.3, 0.16), m.metal, { x: 0, y: 2.7, z: FZ + 1.5 });
  b.add(boxGeometry(w * 0.96, 0.1, 0.1), m.accentFor(0x3a6b8a), { x: 0, y: 2.78, z: FZ + 2.6 });
  // 售票口
  b.add(boxGeometry(1.4, 0.2, 0.9), m.concrete, { x: -w / 2 - 0.2, y: 1.1, z: FZ - 1.0, ry: Math.PI / 2 });
  addMailbox(b, m, { x: w / 2 + 1.2, y: 0, z: FZ + 1.0 });
}

function _shrine(b, m, spec, w, d, rm, acc, rng) {
  const FZ = d / 2;
  // 石基台
  b.add(boxGeometry(w + 2.4, 1.2, d + 2.4), m.stone, { x: 0, y: -0.5, z: 0 });
  b.add(boxGeometry(w + 1.0, 0.5, d + 1.0), m.stoneDark, { x: 0, y: 0.3, z: 0 });
  // 主体
  b.add(boxGeometry(w, 3.0, d), m.accentFor(0xc9603f), { x: 0, y: 2.05, z: 0 });
  b.add(boxGeometry(w + 0.1, 0.3, d + 0.1), m.woodDark, { x: 0, y: 3.6, z: 0 });
  // 柱廊
  for (let i = -1; i <= 1; i += 1) {
    b.add(cylinderGeometry(0.16, 0.16, 2.4, 8), m.accentFor(0xa8482f), { x: i * w * 0.36, y: 1.9, z: FZ + 0.9 });
  }
  b.add(boxGeometry(w + 0.6, 0.24, 2.0), m.accentFor(0xa8482f), { x: 0, y: 3.1, z: FZ + 0.9 });
  // 屋顶：反宇 + 千木
  const rh = 2.4;
  b.add(makeRoofGeometry(w, d + 1.8, rh, 1.5, { ridgeFactor: 0.78, curve: 0.5, eaveThick: 0.2 }), rm, { x: 0, y: 3.75, z: 0.4 });
  b.add(boxGeometry(w * 0.78 + 0.6, 0.3, 0.55), m.roof(0x5a3630), { x: 0, y: 3.75 + rh, z: 0.4 });
  for (const s of [-1, 1]) {
    b.add(boxGeometry(0.14, 1.5, 0.14), m.woodLight, { x: s * w * 0.2, y: 3.75 + rh + 0.6, z: 0.4, rx: s * 0.5 });
  }
  // 注连绳
  b.add(cylinderGeometry(0.09, 0.09, w * 0.7, 6), m.accentFor(0xe8dcc0), { x: 0, y: 2.9, z: FZ + 1.2, rz: Math.PI / 2 });
  for (let i = -1; i <= 1; i++) {
    b.add(new THREE.PlaneGeometry(0.2, 0.5), m.accentFor(0xf6f2e6), { x: i * w * 0.22, y: 2.6, z: FZ + 1.25, noOutline: true });
  }
  // 拜殿内部（暗）
  b.add(new THREE.PlaneGeometry(w * 0.7, 2.0), m.doorDark, { x: 0, y: 1.7, z: FZ + 0.02, noOutline: true });
  addStoneSteps(b, m, w * 0.5, 4, { x: 0, y: 0.5, z: FZ + 1.4 });
  // 赛钱箱
  b.add(boxGeometry(0.9, 0.7, 0.6), m.woodDark, { x: 0, y: 1.15, z: FZ + 0.4 });
  b.add(boxGeometry(1.05, 0.1, 0.7), m.accentFor(0x8a2f22), { x: 0, y: 1.55, z: FZ + 0.4 });
}

function _post(b, m, spec, w, d, wm, rm, acc, rng) {
  const FZ = d / 2;
  const h = 3.4;
  b.add(boxGeometry(w, h, d), wm, { x: 0, y: h / 2 + 0.3, z: 0 });
  b.add(makeRoofGeometry(w, d, 1.5, 0.85, { ridgeFactor: 0.7 }), rm, { x: 0, y: h + 0.45, z: 0 });
  addWindow(b, m, w * 0.34, 1.6, { x: -w * 0.24, y: 1.3, z: FZ + 0.04 }, null, true);
  addDoor(b, m, 1.3, 2.1, { x: w * 0.26, y: 0, z: FZ + 0.04 }, { step: 0.2 });
  addSign(b, m, spec.sign, 2.6, 1.2, { x: 0, y: 2.7, z: FZ + 0.12 });
  addMailbox(b, m, { x: w / 2 + 0.9, y: 0, z: FZ + 0.4 });
  // 旗杆
  b.add(cylinderGeometry(0.07, 0.07, 4.2, 6), m.woodLight, { x: -w / 2 - 0.8, y: 2.1, z: FZ + 0.4 });
  b.add(new THREE.PlaneGeometry(0.9, 0.7), m.accentFor(0xf0f0e8), { x: -w / 2 - 0.8 + 0.5, y: 3.5, z: FZ + 0.4, ry: Math.PI / 2, noOutline: true });
}

function _school(b, m, spec, w, d, floors, totalH, wm, rm, acc, rng) {
  const FZ = d / 2;
  b.add(boxGeometry(w, totalH, d), wm, { x: 0, y: totalH / 2 + 0.3, z: 0 });
  b.add(boxGeometry(w + 0.12, 0.3, d + 0.12), m.woodDark, { x: 0, y: FLOOR_H + 0.3, z: 0 });
  // 窗阵列（正面 +Z）
  const n = Math.floor(w / 3.2);
  for (let f = 0; f < floors; f++) {
    const y0 = 0.9 + f * FLOOR_H;
    for (let i = 0; i < n; i++) {
      const x = -w / 2 + (w * (i + 0.5)) / n;
      if (f === 0 && Math.abs(x) < 2.2) {
        addDoor(b, m, 2.4, 2.4, { x, y: 0, z: FZ + 0.04 }, { step: 0.35 });
        continue;
      }
      addWindow(b, m, 2.0, 1.7, { x, y: y0 + 0.4, z: FZ + 0.04 }, null, false);
    }
    for (let i = 0; i < Math.floor(w / 4.5); i++) {
      const x = -w / 2 + 2.5 + i * 4.5;
      addWindow(b, m, 2.0, 1.7, { x, y: y0 + 0.4, z: -FZ - 0.04, ry: Math.PI }, null, false);
    }
  }
  // 入口雨棚 + 校牌
  b.add(makeFlatRoofGeometry(7.0, 2.6, 0.4, 0.2), m.concrete, { x: 0, y: 3.3, z: FZ + 1.3 });
  b.add(cylinderGeometry(0.14, 0.14, 3.1, 8), m.metal, { x: -3.0, y: 1.55, z: FZ + 2.3 });
  b.add(cylinderGeometry(0.14, 0.14, 3.1, 8), m.metal, { x: 3.0, y: 1.55, z: FZ + 2.3 });
  addSign(b, m, { text: spec.label, sub: 'SAKURA ELEMENTARY', bg: 0xf2f0e6, color: 0x2f4a5e }, 5.4, 1.3, { x: 0, y: 3.9, z: FZ + 0.12 });
  // 屋顶
  b.add(makeRoofGeometry(w, d, 2.3, 1.1, { ridgeFactor: 1.0 }), rm, { x: 0, y: totalH + 0.5, z: 0 });
  b.add(boxGeometry(w + 2.4, 0.24, 0.48), m.roof(0x414d57), { x: 0, y: totalH + 2.8, z: 0 });
  // 钟塔
  const tx = w / 2 - 4;
  b.add(boxGeometry(2.4, 4.6, 2.4), wm, { x: tx, y: totalH + 0.5 + 2.3, z: 0 });
  b.add(makeRoofGeometry(2.6, 2.6, 1.1, 0.5, { ridgeFactor: 0.2 }), rm, { x: tx, y: totalH + 0.5 + 4.6, z: 0 });
  b.add(new THREE.PlaneGeometry(1.5, 1.5), m.signLit, { x: tx, y: totalH + 0.5 + 3.6, z: 1.22, noOutline: true });
  b.add(new THREE.PlaneGeometry(1.5, 1.5), m.signLit, { x: tx, y: totalH + 0.5 + 3.6, z: -1.22, ry: Math.PI, noOutline: true });
  // 操场围栏 + 单杠
  if (spec.yard) {
    for (let i = 0; i < 6; i++) {
      const bx = -w * 0.3 + i * (w * 0.12);
      b.add(cylinderGeometry(0.06, 0.06, 0.9, 6), m.metal, { x: bx, y: 0.45, z: FZ + 1.2 });
    }
    b.add(cylinderGeometry(0.05, 0.05, w * 0.62, 6), m.metal, { x: 0, y: 0.9, z: FZ + 1.2, rz: Math.PI / 2 });
  }
}

function _garden(b, m, spec, w, d, rng) {
  const FZ = d / 2;
  // 侧院小径与绿篱
  const gx = w / 2 + 2.2;
  addFence(b, m, d + 2.0, { x: gx, y: 0, z: 0, ry: Math.PI / 2 }, { h: 0.9, postEvery: 1.6 });
  for (let i = 0; i < 4; i++) {
    const zz = -d / 2 + (d * (i + 0.5)) / 4;
    b.add(sphereGeometry(0.55 + (i % 2) * 0.2, 7), m.bush, { x: gx - 0.6, y: 0.55, z: zz, sy: 0.8 });
  }
  // 石灯笼
  b.add(cylinderGeometry(0.16, 0.2, 0.6, 6), m.stone, { x: -w / 2 - 1.4, y: 0.3, z: FZ - 1.2 });
  b.add(boxGeometry(0.5, 0.45, 0.5), m.stone, { x: -w / 2 - 1.4, y: 0.85, z: FZ - 1.2 });
  b.add(new THREE.ConeGeometry(0.46, 0.3, 6), m.stoneDark, { x: -w / 2 - 1.4, y: 1.22, z: FZ - 1.2 });
  b.add(new THREE.SphereGeometry(0.11, 6, 5), m.bulb, { x: -w / 2 - 1.4, y: 0.85, z: FZ - 1.2, noOutline: true });
  // 盆栽
  addPlanter(b, m, 1.4, 0.7, { x: w * 0.3, y: 0, z: FZ + 0.9 }, { flowers: false });
}

function hashId(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
