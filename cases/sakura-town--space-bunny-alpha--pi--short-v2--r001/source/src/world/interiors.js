/**
 * 室内空间：9 个可进入的房间。
 * 每个房间建在远离户外的坐标上（y = INTERIOR_Y），
 * 进入时切换可见性，出来时还原。房间里也有交互点。
 */
import * as THREE from 'three';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry, cylinderGeometry, sphereGeometry, toonMaterial } from '../core/toon.js';
import { addShoji, addWindow } from './kit.js';
import { scribbleTexture } from './textures.js';
import { makeRNG } from '../core/utils.js';

export const INTERIOR_Y = -300;
const ROOM_W = 12;
const ROOM_D = 10;
const ROOM_H = 3.1;

export const ROOMS = [
  // spawn：进门后站的位置（局部坐标）；blocks：家具碰撞盒
  {
    id: 'home', label: '家', wall: 0xf0e6d2, floor: 0xc9a97a, w: 14, d: 10,
    spawn: [1.2, 1.8], exit: [0, 4.0],
    blocks: [[-3.6, -2.7, 0.95, 1.0], [-1.4, 0.4, 0.8, 0.8], [-1.6, -3.9, 1.1, 0.5],
      [2.6, -4.0, 1.9, 0.5], [4.6, -3.6, 0.6, 0.6], [4.7, 1.2, 1.0, 0.4], [5.0, 3.4, 0.4, 0.4], [-4.4, 4.0, 0.7, 0.4]],
  },
  {
    id: 'store', label: '山田商店', wall: 0xe8dcc0, floor: 0xbfb49c,
    spawn: [-2.4, 1.8], exit: [0, 4.0],
    blocks: [[-4.4, -2.2, 0.6, 2.6], [0, -2.2, 0.6, 2.6], [4.4, -2.2, 0.6, 2.6],
      [0.4, 1.4, 1.8, 0.7], [3.4, 1.5, 0.8, 0.4], [-2.4, 4.3, 0.5, 0.5]],
  },
  {
    id: 'konbini', label: '樱花便利店', wall: 0xf4f0e6, floor: 0xd6d2c6,
    spawn: [-3.0, 1.6], exit: [0, 4.0],
    blocks: [[-4.6, -1.0, 0.8, 0.5], [-2.0, -1.0, 0.8, 0.5], [0.6, -1.0, 0.8, 0.5], [3.2, -1.0, 0.8, 0.5],
      [1.0, 2.0, 2.2, 0.7], [3.4, 2.4, 0.5, 0.4], [4.6, 2.4, 0.7, 0.5], [-3.4, 4.2, 0.6, 0.3], [-5.2, -0.4, 0.7, 1.6]],
  },
  {
    id: 'ramen', label: '拉面 一龙', wall: 0xe4d4b8, floor: 0xb08a6a,
    spawn: [4.4, 1.8], exit: [0, 4.0],
    blocks: [[0, 0.6, 3.7, 0.8], [0, -1.6, 3.6, 0.7], [-3.4, 3.2, 0.9, 0.9]],
  },
  {
    id: 'cafe', label: '星光咖啡', wall: 0xf2ead8, floor: 0xa88a6a,
    spawn: [0.6, 2.2], exit: [0, 4.0],
    blocks: [[1.2, -1.0, 2.9, 0.7], [3.6, 1.6, 0.9, 0.4], [-2.6, 0.6, 0.6, 0.6],
      [-2.6, 2.8, 0.6, 0.6], [-4.6, 1.7, 0.6, 0.6], [4.8, 3.2, 0.4, 0.4]],
  },
  {
    id: 'izakaya', label: '小酒馆 灯', wall: 0x6a5040, floor: 0x5a4438,
    spawn: [4.4, 1.8], exit: [0, 4.0],
    blocks: [[0, 0.4, 3.2, 0.7], [0, -3.4, 2.6, 0.3], [-3.4, -1.4, 0.9, 0.5]],
  },
  {
    id: 'station', label: '樱花站', wall: 0xeee8da, floor: 0xc4bfb2,
    spawn: [0, 2.2], exit: [0, 4.0],
    blocks: [[-1.0, -3.2, 2.1, 0.6], [-3.4, 0.4, 1.3, 0.4], [-0.2, 0.4, 1.3, 0.4], [3.0, 0.4, 1.3, 0.4],
      [2.2, 2.2, 0.3, 1.2], [3.6, 2.2, 0.3, 1.2], [5.0, 0.6, 0.7, 0.5]],
  },
  {
    id: 'post', label: '樱花邮局', wall: 0xeeeade, floor: 0xc8c4b8,
    spawn: [3.8, 2.0], exit: [0, 4.0],
    blocks: [[0, -3.2, 2.1, 0.6], [0, 1.2, 2.1, 0.4], [-4.4, 0.6, 0.5, 0.4], [2.0, -1.0, 0.4, 0.4]],
  },
  {
    id: 'shrine', label: '稻荷神社', wall: 0xa8482f, floor: 0x8a6a50,
    spawn: [0, 1.6], exit: [0, 4.0],
    blocks: [[0, -3.0, 2.0, 0.7], [-2.6, -1.6, 0.7, 0.5], [3.0, -3.0, 0.6, 0.3], [-2.4, 0.6, 0.3, 0.3], [2.4, 0.6, 0.3, 0.3]],
  },
];

/**
 * @param {MaterialLibrary} m
 * @param {ColliderSet} colliders
 * @returns {{group:THREE.Group, rooms:Object}}
 */
export function buildInteriors(m, colliders) {
  const group = new THREE.Group();
  group.name = 'interiors';
  const rooms = {};
  const shellMat = toonMaterial({ color: 0x1a1720, steps: 2, side: THREE.BackSide });

  ROOMS.forEach((spec, idx) => {
    const cx = idx * 40;
    const b = new GeoBuilder(`room_${spec.id}`);
    const wallMat = m.wall(spec.wall);
    const floorMat = m.accentFor(spec.floor, { steps: 3 });
    const trimMat = m.wood;
    const w = spec.w || ROOM_W;
    const d = spec.d || ROOM_D;

    // 地 / 顶 / 墙
    b.add(boxGeometry(w, 0.2, d), floorMat, { x: 0, y: -0.1, z: 0 });
    b.add(boxGeometry(w, 0.16, d), m.accentFor(0xf2ede0), { x: 0, y: ROOM_H, z: 0 });
    // 四面墙（+Z 面留门洞）
    b.add(boxGeometry(w, ROOM_H, 0.22), wallMat, { x: 0, y: ROOM_H / 2, z: -d / 2 });
    b.add(boxGeometry(0.22, ROOM_H, d), wallMat, { x: -w / 2, y: ROOM_H / 2, z: 0 });
    b.add(boxGeometry(0.22, ROOM_H, d), wallMat, { x: w / 2, y: ROOM_H / 2, z: 0 });
    const sideW = (w - 2.6) / 2;
    const sideX = 1.3 + sideW / 2;
    b.add(boxGeometry(sideW, ROOM_H, 0.22), wallMat, { x: -sideX, y: ROOM_H / 2, z: d / 2 });
    b.add(boxGeometry(sideW, ROOM_H, 0.22), wallMat, { x: sideX, y: ROOM_H / 2, z: d / 2 });
    b.add(boxGeometry(2.6, 0.7, 0.22), wallMat, { x: 0, y: ROOM_H - 0.35, z: d / 2 });
    // 踢脚线
    b.add(boxGeometry(w, 0.12, 0.08), trimMat, { x: 0, y: 0.06, z: -d / 2 + 0.12 });
    b.add(boxGeometry(0.08, 0.12, d), trimMat, { x: -w / 2 + 0.12, y: 0.06, z: 0 });
    b.add(boxGeometry(0.08, 0.12, d), trimMat, { x: w / 2 - 0.12, y: 0.06, z: 0 });

    const rng = makeRNG(1000 + idx * 37);
    const fn = FURNISH[spec.id];
    const interactables = [];
    if (fn) fn(b, m, { w, d, rng, interactables, cx });

    // 顶灯
    b.add(new THREE.CylinderGeometry(0.52, 0.44, 0.16, 12), m.metal, { x: 0, y: ROOM_H - 0.08, z: 0 });
    b.add(new THREE.SphereGeometry(0.15, 8, 6), m.bulb, { x: 0, y: ROOM_H - 0.2, z: 0, noOutline: true });
    // 门口提示条
    b.add(boxGeometry(2.2, 0.05, 0.16), m.accentFor(0xe8c86a), { x: 0, y: 0.025, z: d / 2 - 1.1 });
    // 门框 + 暖帘（挡住门外的黑壳）
    b.add(boxGeometry(0.22, ROOM_H, 0.34), trimMat, { x: -1.41, y: ROOM_H / 2, z: d / 2 });
    b.add(boxGeometry(0.22, ROOM_H, 0.34), trimMat, { x: 1.41, y: ROOM_H / 2, z: d / 2 });
    b.add(boxGeometry(3.04, 0.28, 0.34), trimMat, { x: 0, y: ROOM_H - 0.14, z: d / 2 });
    b.add(new THREE.PlaneGeometry(2.6, 1.1), m.accentFor(0xd8c8b0), { x: 0, y: 2.05, z: d / 2 - 0.12, noOutline: true });
    for (let i = 0; i < 3; i++) {
      b.add(boxGeometry(2.6, 0.06, 0.05), m.accentFor(0xa89078), { x: 0, y: 1.62 + i * 0.42, z: d / 2 - 0.14 });
    }
    // 门槛
    b.add(boxGeometry(3.0, 0.12, 0.5), m.stone, { x: 0, y: 0.06, z: d / 2 - 0.2 });

    const wrap = new THREE.Group();
    wrap.name = `interior_${spec.id}`;
    wrap.position.set(cx, INTERIOR_Y, 0);
    // 外壳，避免看到天空与地形
    const shell = new THREE.Mesh(new THREE.BoxGeometry(w + 16, 10, d + 16), shellMat);
    shell.position.set(0, 2, 0);
    shell.userData.noOutline = true;
    wrap.add(shell);
    wrap.add(b.build({ thickness: 0.028, color: 0x2a2130 }));

    // 灯：三点式，主灯 + 两个补光，保证房间任何角落都看得清
    const light = new THREE.PointLight(0xffdcac, 15, 20, 1.5);
    light.position.set(0, ROOM_H - 0.45, 0);
    wrap.add(light);
    const fillA = new THREE.PointLight(0xfff0d8, 6, 15, 1.3);
    fillA.position.set(-w * 0.3, 1.6, d * 0.28);
    wrap.add(fillA);
    const fillB = new THREE.PointLight(0xd8e8ff, 5, 15, 1.3);
    fillB.position.set(w * 0.3, 1.6, -d * 0.28);
    wrap.add(fillB);

    group.add(wrap);

    // 碰撞：四面墙（供相机避让，同时防止走出房间）
    const base = INTERIOR_Y;
    const hw = w / 2 - 0.1;
    const hd = d / 2 - 0.1;
    const thick = 0.6;
    colliders.addBox(cx, -(hd + thick), hw + thick, thick, 0, base, base + ROOM_H + 4, 'innerWall');
    colliders.addBox(cx, hd + thick, hw + thick, thick, 0, base, base + ROOM_H + 4, 'innerWall');
    colliders.addBox(cx - (hw + thick), 0, thick, hd + thick, 0, base, base + ROOM_H + 4, 'innerWall');
    colliders.addBox(cx + (hw + thick), 0, thick, hd + thick, 0, base, base + ROOM_H + 4, 'innerWall');
    for (const [bx, bz, bhw, bhd] of spec.blocks || []) {
      colliders.addBox(cx + bx, bz, bhw, bhd, 0, base, base + ROOM_H, 'furniture');
    }

    rooms[spec.id] = {
      id: spec.id,
      label: spec.label,
      group: wrap,
      light,
      lights: [light, fillA, fillB],
      center: new THREE.Vector3(cx, base, 0),
      spawn: { x: cx + (spec.spawn?.[0] || 0), z: spec.spawn?.[1] ?? d / 2 - 2.9 },
      exit: { x: cx + (spec.exit?.[0] || 0), z: spec.exit?.[1] ?? d / 2 - 0.9 },
      interactables: interactables.map((it) => ({ ...it, x: it.x + cx, z: it.z })),
      bounds: { x: cx, z: 0, hw, hd },
      w, d,
    };
  });

  return { group, rooms };
}

// ---------------------------------------------------------------------------
// 各房间的陈设
// ---------------------------------------------------------------------------
const FURNISH = {
  home(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 榻榻米区
    b.add(boxGeometry(6.2, 0.06, 4.4), m.accentFor(0xd8c898), { x: -1.6, y: 0.03, z: -0.4 });
    b.add(boxGeometry(0.06, 0.07, 4.4), m.accentFor(0xa89878), { x: 0.2, y: 0.035, z: -0.4 });
    // 床
    b.add(boxGeometry(1.4, 0.34, 2.0), m.wood, { x: -3.6, y: 0.17, z: -2.2 });
    b.add(boxGeometry(1.3, 0.24, 1.9), m.accentFor(0xf0e8dc), { x: -3.6, y: 0.44, z: -2.2 });
    b.add(boxGeometry(1.0, 0.16, 0.5), m.accentFor(0xffffff), { x: -3.6, y: 0.62, z: -2.9 });
    b.add(boxGeometry(1.42, 0.7, 0.1), m.wood, { x: -3.6, y: 0.5, z: -3.2 });
    interactables.push({ id: 'bed', kind: 'bed', x: -3.6, z: -2.0, label: '睡觉', radius: 1.5, prompt: 'E' });
    // 被炉矮桌
    b.add(boxGeometry(1.2, 0.1, 1.2), m.woodLight, { x: -1.4, y: 0.4, z: 0.4 });
    for (const [ox, oz] of [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]]) {
      b.add(boxGeometry(0.1, 0.4, 0.1), m.woodDark, { x: -1.4 + ox, y: 0.2, z: 0.4 + oz });
    }
    b.add(cylinderGeometry(0.12, 0.12, 0.14, 10), m.accentFor(0xd86a4a), { x: -1.4, y: 0.52, z: 0.4 });
    b.add(new THREE.SphereGeometry(0.1, 8), m.accentFor(0xe8e0c0), { x: -1.1, y: 0.5, z: 0.6 });
    // 坐垫
    for (const [x, z] of [[-1.4, -0.5], [-0.5, 0.4], [-2.3, 0.4]]) {
      b.add(boxGeometry(0.5, 0.12, 0.5), m.accentFor(0x6f8f5a), { x, y: 0.1, z });
    }
    // 电视柜 + 电视
    b.add(boxGeometry(1.6, 0.5, 0.5), m.wood, { x: -1.6, y: 0.25, z: -3.9 });
    b.add(boxGeometry(1.5, 0.86, 0.14), m.metalDark, { x: -1.6, y: 1.0, z: -4.0 });
    b.add(new THREE.PlaneGeometry(1.36, 0.72), m.tvGlow, { x: -1.6, y: 1.0, z: -3.91, noOutline: true });
    // 厨房台 + 冰箱
    b.add(boxGeometry(3.2, 0.9, 0.7), m.accentFor(0xd8d2c6), { x: 2.6, y: 0.45, z: -4.0 });
    b.add(boxGeometry(3.3, 0.1, 0.8), m.stone, { x: 2.6, y: 0.95, z: -4.0 });
    b.add(boxGeometry(0.9, 0.1, 0.6), m.metal, { x: 2.0, y: 1.02, z: -4.0 });
    b.add(boxGeometry(0.85, 1.9, 0.75), m.accentFor(0xe8e4dc), { x: 4.6, y: 0.95, z: -3.6 });
    b.add(boxGeometry(0.06, 0.5, 0.06), m.metal, { x: 4.2, y: 1.1, z: -3.25 });
    interactables.push({ id: 'fridge', kind: 'fridge', x: 4.0, z: -3.2, label: '冰箱', radius: 1.4, prompt: 'E' });
    // 碗柜
    b.add(boxGeometry(1.6, 1.1, 0.5), m.accentFor(0xe8e2d4), { x: 4.7, y: 1.5, z: 1.2 });
    // 挂钟
    b.add(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 14), m.accentFor(0xf4f0e6), { x: 0, y: 2.5, z: -4.85, rx: Math.PI / 2 });
    // 窗
    b.add(new THREE.PlaneGeometry(2.6, 1.4), m.paper, { x: -2.0, y: 1.9, z: -4.88, noOutline: true });
    b.add(boxGeometry(2.9, 0.12, 0.12), trimMat2(m), { x: -2.0, y: 2.6, z: -4.85 });
    b.add(boxGeometry(0.12, 1.5, 0.12), trimMat2(m), { x: -2.0, y: 1.9, z: -4.85 });
    // 盆栽
    b.add(cylinderGeometry(0.24, 0.2, 0.4, 10), m.accentFor(0xb5452f), { x: 5.0, y: 0.2, z: 3.4 });
    b.add(sphereGeometry(0.34, 8), m.bush, { x: 5.0, y: 0.6, z: 3.4 });
    // 玄关
    b.add(boxGeometry(1.6, 0.06, 0.9), m.accentFor(0x8a6a4a), { x: -4.2, y: 0.03, z: 3.4 });
    b.add(boxGeometry(1.0, 0.9, 0.4), m.wood, { x: -4.6, y: 0.45, z: 4.0 });
    b.add(boxGeometry(0.9, 0.1, 0.4), m.accentFor(0x6f8f5a), { x: -4.6, y: 0.95, z: 4.0 });
  },

  store(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 货架
    for (let i = 0; i < 3; i++) {
      const x = -4.4 + i * 4.4;
      b.add(boxGeometry(0.7, 1.8, 5.0), m.wood, { x, y: 0.9, z: -2.2 });
      for (let s = 0; s < 4; s++) {
        b.add(boxGeometry(0.8, 0.08, 5.1), m.woodDark, { x, y: 0.35 + s * 0.45, z: -2.2 });
        for (let k = 0; k < 6; k++) {
          const c = [0xd86a4a, 0x6fa85a, 0xe8c86a, 0xd8a0c0, 0x8ab0d8][(i + s + k) % 5];
          b.add(boxGeometry(0.42, 0.26, 0.42), m.accentFor(c), { x, y: 0.52 + s * 0.45, z: -4.3 + k * 0.8 });
        }
      }
    }
    // 收银台
    b.add(boxGeometry(3.4, 1.0, 0.9), m.woodLight, { x: 0.4, y: 0.5, z: 1.4 });
    b.add(boxGeometry(3.6, 0.1, 1.0), m.stone, { x: 0.4, y: 1.05, z: 1.4 });
    b.add(boxGeometry(0.7, 0.5, 0.5), m.accentFor(0xd65545), { x: -0.4, y: 1.3, z: 1.4 });
    b.add(boxGeometry(0.6, 0.1, 0.4), m.metalDark, { x: 1.4, y: 1.15, z: 1.5 });
    interactables.push({ id: 'storeCounter', kind: 'shop', shop: 'store', x: 0.4, z: 2.4, label: '看看商品', radius: 1.9, prompt: 'E' });
    // 猫粮展示
    b.add(boxGeometry(1.4, 0.7, 0.5), m.accentFor(0x3f6f8f), { x: 3.4, y: 0.35, z: 1.5 });
    for (let i = 0; i < 5; i++) {
      b.add(cylinderGeometry(0.11, 0.11, 0.3, 8), m.accentFor(0xe8b64c), { x: 3.0 + i * 0.22, y: 0.85, z: 1.5 });
    }
    interactables.push({ id: 'catfood', kind: 'item', item: 'catfood', x: 3.4, z: 2.2, label: '猫粮', radius: 1.4, prompt: 'E' });
    // 门口的秤与筐
    b.add(boxGeometry(0.7, 0.2, 0.6), m.metal, { x: -2.4, y: 0.1, z: 4.3 });
    b.add(cylinderGeometry(0.05, 0.05, 0.9, 6), m.metalDark, { x: -2.4, y: 0.55, z: 4.3 });
    b.add(new THREE.CircleGeometry(0.34, 14), m.accentFor(0xf0ece0), { x: -2.4, y: 1.0, z: 4.3, rx: -Math.PI / 2 });
    // 挂钟与海报
    b.add(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 12), m.accentFor(0xf4f0e6), { x: 3.6, y: 2.5, z: -4.86, rx: Math.PI / 2 });
    b.add(new THREE.PlaneGeometry(1.0, 1.4), new THREE.MeshBasicMaterial({ map: scribbleTexture({ bg: '#f0e8d8', fg: '#8a9a7a' }) }), { x: -3.0, y: 2.1, z: -4.88, noOutline: true });
  },

  konbini(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 货架走廊
    for (let i = 0; i < 4; i++) {
      const x = -4.6 + i * 2.6;
      b.add(boxGeometry(1.4, 1.9, 0.7), m.accentFor(0xf0ece0), { x, y: 0.95, z: -1.0 });
      for (let s = 0; s < 4; s++) {
        b.add(boxGeometry(1.5, 0.06, 0.8), m.accentFor(0xd8d4c8), { x, y: 0.3 + s * 0.45, z: -1.0 });
        for (let k = 0; k < 4; k++) {
          const c = [0xd65545, 0x3f7fb5, 0x6fa85a, 0xe8c86a][(i + s + k) % 4];
          b.add(boxGeometry(0.26, 0.3, 0.24), m.accentFor(c), { x: x - 0.45 + k * 0.3, y: 0.5 + s * 0.45, z: -1.0 });
        }
      }
    }
    // 收银台
    b.add(boxGeometry(4.0, 1.1, 1.0), m.accentFor(0xf4f0e6), { x: 1.0, y: 0.55, z: 2.0 });
    b.add(boxGeometry(4.2, 0.1, 1.1), m.accentFor(0x2f7fb5), { x: 1.0, y: 1.15, z: 2.0 });
    b.add(boxGeometry(0.8, 0.6, 0.6), m.metalDark, { x: -0.4, y: 1.5, z: 2.0 });
    b.add(new THREE.PlaneGeometry(0.6, 0.4), m.tvGlow, { x: -0.4, y: 1.6, z: 2.31, noOutline: true });
    interactables.push({ id: 'konbiniCounter', kind: 'shop', shop: 'konbini', x: 1.0, z: 3.0, label: '买东西', radius: 2.1, prompt: 'E' });
    // 咖啡机
    b.add(boxGeometry(0.7, 1.4, 0.6), m.metal, { x: 3.4, y: 0.7, z: 2.4 });
    b.add(new THREE.PlaneGeometry(0.5, 0.3), m.bulb, { x: 3.4, y: 1.2, z: 2.71, noOutline: true });
    // 杂志架
    b.add(boxGeometry(1.0, 1.6, 0.4), m.accentFor(0xd8d2c0), { x: -3.4, y: 0.8, z: 4.2 });
    for (let i = 0; i < 3; i++) {
      b.add(new THREE.PlaneGeometry(0.34, 0.44), new THREE.MeshBasicMaterial({ map: scribbleTexture({ bg: '#f0eae0', fg: '#9a8a7a' }) }), { x: -3.7 + i * 0.36, y: 1.1, z: 4.41, noOutline: true });
    }
    // 关东煮柜
    b.add(boxGeometry(1.2, 0.8, 0.7), m.accentFor(0xe8e4dc), { x: 4.6, y: 0.4, z: 2.4 });
    b.add(new THREE.PlaneGeometry(1.0, 0.5), m.bulb, { x: 4.6, y: 0.5, z: 2.76, noOutline: true });
    interactables.push({ id: 'konbiniFood', kind: 'item', item: 'onigiri', x: 4.6, z: 3.2, label: '饭团', radius: 1.4, prompt: 'E' });
    // 冷柜
    b.add(boxGeometry(1.2, 2.0, 3.0), m.accentFor(0xd8e8f0), { x: -5.2, y: 1.0, z: -0.4 });
    b.add(new THREE.PlaneGeometry(1.0, 2.6), m.glassBig, { x: -5.2, y: 1.0, z: -0.4, ry: Math.PI / 2, noOutline: true });
  },

  ramen(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 吧台
    b.add(boxGeometry(7.0, 1.05, 1.1), m.woodLight, { x: 0, y: 0.52, z: 0.6 });
    b.add(boxGeometry(7.2, 0.12, 1.3), m.woodDark, { x: 0, y: 1.1, z: 0.6 });
    for (let i = 0; i < 5; i++) {
      b.add(cylinderGeometry(0.2, 0.2, 0.1, 10), m.accentFor(0xb5452f), { x: -2.8 + i * 1.4, y: 0.58, z: 1.9 });
      b.add(cylinderGeometry(0.06, 0.08, 0.55, 8), m.woodDark, { x: -2.8 + i * 1.4, y: 0.28, z: 1.9 });
    }
    interactables.push({ id: 'ramenCounter', kind: 'shop', shop: 'ramen', x: 0, z: 2.4, label: '点一碗拉面', radius: 2.6, prompt: 'E' });
    // 厨房
    b.add(boxGeometry(7.0, 0.9, 1.0), m.metal, { x: 0, y: 0.45, z: -1.6 });
    b.add(boxGeometry(7.0, 0.1, 1.1), m.metalDark, { x: 0, y: 0.95, z: -1.6 });
    for (let i = 0; i < 3; i++) {
      b.add(cylinderGeometry(0.42, 0.42, 0.5, 12), m.metalDark, { x: -1.8 + i * 1.8, y: 1.25, z: -1.6 });
    }
    b.add(boxGeometry(7.0, 1.4, 0.3), m.metal, { x: 0, y: 1.6, z: -2.5 });
    // 挂着的灯笼与菜单
    for (let i = 0; i < 4; i++) {
      b.add(new THREE.SphereGeometry(0.22, 10, 8), m.accentFor(0xe8552f), { x: -2.4 + i * 1.6, y: 2.4, z: 0.4, sy: 1.3, noOutline: true });
    }
    b.add(new THREE.PlaneGeometry(3.2, 1.1), new THREE.MeshBasicMaterial({ map: scribbleTexture({ bg: '#f0e4c8', fg: '#8a3b32' }) }), { x: 0, y: 2.3, z: 3.0, noOutline: true });
    // 桌子
    b.add(boxGeometry(1.4, 0.1, 1.4), m.wood, { x: -3.4, y: 0.75, z: 3.2 });
    for (const [ox, oz] of [[-0.6, -0.6], [0.6, -0.6], [0.6, 0.6], [-0.6, 0.6]]) {
      b.add(boxGeometry(0.1, 0.75, 0.1), m.woodDark, { x: -3.4 + ox, y: 0.37, z: 3.2 + oz });
    }
    for (const s of [-1, 1]) {
      b.add(boxGeometry(0.5, 0.12, 0.5), m.accentFor(0xb5452f), { x: -3.4, y: 0.46, z: 3.2 + s * 1.1 });
    }
  },

  cafe(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 吧台
    b.add(boxGeometry(5.4, 1.1, 1.0), m.woodDark, { x: 1.2, y: 0.55, z: -1.0 });
    b.add(boxGeometry(5.6, 0.12, 1.2), m.woodLight, { x: 1.2, y: 1.15, z: -1.0 });
    b.add(boxGeometry(0.9, 0.7, 0.7), m.metal, { x: 2.4, y: 1.55, z: -1.0 });
    b.add(new THREE.PlaneGeometry(0.7, 0.3), m.bulb, { x: 2.4, y: 1.7, z: -0.63, noOutline: true });
    for (let i = 0; i < 3; i++) {
      b.add(cylinderGeometry(0.16, 0.13, 0.24, 10), m.accentFor(0xf0ece0), { x: 0.2 + i * 0.3, y: 1.3, z: -0.8 });
    }
    // 甜点柜
    b.add(boxGeometry(1.6, 1.2, 0.6), m.accentFor(0xf6f0e4), { x: 3.6, y: 0.6, z: 1.6 });
    b.add(new THREE.PlaneGeometry(1.4, 0.9), m.glassBig, { x: 3.6, y: 0.75, z: 1.91, noOutline: true });
    for (let i = 0; i < 6; i++) {
      b.add(cylinderGeometry(0.12, 0.12, 0.14, 8), m.accentFor([0xe8c86a, 0xd8a0b0, 0xc8d8a0][i % 3]), { x: 3.1 + (i % 3) * 0.5, y: 1.28, z: 1.6 });
    }
    interactables.push({ id: 'cafeCounter', kind: 'shop', shop: 'cafe', x: 1.2, z: 0.6, label: '点杯咖啡', radius: 2.0, prompt: 'E' });
    // 桌椅
    for (const [tx, tz] of [[-2.6, 0.6], [-2.6, 2.8], [-4.6, 1.7]]) {
      b.add(cylinderGeometry(0.5, 0.5, 0.08, 12), m.wood, { x: tx, y: 0.75, z: tz });
      b.add(cylinderGeometry(0.07, 0.09, 0.75, 8), m.metalDark, { x: tx, y: 0.37, z: tz });
      for (let i = 0; i < 2; i++) {
        const a = i * Math.PI + 0.6;
        b.add(boxGeometry(0.42, 0.5, 0.42), m.accentFor(0x6b8f5e), { x: tx + Math.cos(a) * 0.85, y: 0.25, z: tz + Math.sin(a) * 0.85, ry: -a });
      }
    }
    // 绿植
    b.add(cylinderGeometry(0.26, 0.22, 0.4, 10), m.accentFor(0xb8845a), { x: 4.8, y: 0.2, z: 3.2 });
    b.add(sphereGeometry(0.45, 8), m.bush, { x: 4.8, y: 0.7, z: 3.2 });
    b.add(new THREE.PlaneGeometry(3.0, 1.6), m.glassBig, { x: -3.0, y: 1.9, z: -4.88, noOutline: true });
  },

  izakaya(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    b.add(boxGeometry(6.0, 1.05, 1.0), m.woodDark, { x: 0, y: 0.52, z: 0.4 });
    b.add(boxGeometry(6.2, 0.12, 1.2), m.wood, { x: 0, y: 1.1, z: 0.4 });
    for (let i = 0; i < 6; i++) {
      b.add(boxGeometry(0.46, 0.1, 0.46), m.accentFor(0x7a3b34), { x: -2.5 + i, y: 0.6, z: 1.7 });
      b.add(boxGeometry(0.1, 0.55, 0.1), m.woodDark, { x: -2.5 + i, y: 0.3, z: 1.7 });
    }
    interactables.push({ id: 'izakayaCounter', kind: 'shop', shop: 'izakaya', x: 0, z: 2.2, label: '喝一杯', radius: 2.4, prompt: 'E' });
    // 酒架
    b.add(boxGeometry(5.0, 1.8, 0.4), m.wood, { x: 0, y: 1.4, z: -3.4 });
    for (let s = 0; s < 3; s++) {
      b.add(boxGeometry(5.0, 0.06, 0.42), m.woodDark, { x: 0, y: 0.8 + s * 0.55, z: -3.4 });
      for (let k = 0; k < 12; k++) {
        b.add(cylinderGeometry(0.08, 0.1, 0.34, 8), m.accentFor(0xd8d0c0), { x: -2.2 + k * 0.4, y: 1.0 + s * 0.55, z: -3.4 });
      }
    }
    // 烤台
    b.add(boxGeometry(1.6, 0.8, 0.7), m.metalDark, { x: -3.4, y: 0.4, z: -1.4 });
    b.add(new THREE.PlaneGeometry(1.3, 0.5), m.bulb, { x: -3.4, y: 0.85, z: -1.4, rx: -Math.PI / 2, noOutline: true });
    // 灯笼
    for (const x of [-2.0, 0, 2.0]) {
      b.add(new THREE.SphereGeometry(0.24, 10, 8), m.accentFor(0xe8a83a), { x, y: 2.3, z: 1.2, sy: 1.3, noOutline: true });
    }
    b.add(new THREE.PlaneGeometry(4.0, 0.5), m.bulb, { x: 0, y: 2.7, z: -1.0, noOutline: true });
  },

  station(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 售票口
    b.add(boxGeometry(4.0, 1.1, 0.9), m.wood, { x: -1.0, y: 0.55, z: -3.4 });
    b.add(boxGeometry(4.2, 0.1, 1.0), m.woodDark, { x: -1.0, y: 1.15, z: -3.4 });
    b.add(new THREE.PlaneGeometry(2.2, 0.7), m.glassBig, { x: -1.0, y: 1.5, z: -3.8, noOutline: true });
    b.add(boxGeometry(0.7, 0.1, 0.4), m.metalDark, { x: 0.8, y: 1.3, z: -3.2 });
    interactables.push({ id: 'stationCounter', kind: 'shop', shop: 'station', x: -1.0, z: -2.4, label: '售票 / 问路', radius: 2.2, prompt: 'E' });
    // 候车长椅
    for (let i = 0; i < 3; i++) {
      const x = -3.4 + i * 3.2;
      b.add(boxGeometry(2.4, 0.12, 0.55), m.wood, { x, y: 0.5, z: 0.4 });
      b.add(boxGeometry(2.4, 0.6, 0.1), m.wood, { x, y: 0.85, z: 0.15, rx: 0.12 });
      for (const s of [-1, 1]) b.add(boxGeometry(0.12, 0.5, 0.5), m.metalDark, { x: x + s * 1.0, y: 0.25, z: 0.4 });
    }
    // 时刻表板
    b.add(boxGeometry(1.8, 1.3, 0.12), m.woodDark, { x: 3.6, y: 1.7, z: -3.9 });
    b.add(new THREE.PlaneGeometry(1.6, 1.1), new THREE.MeshBasicMaterial({ map: scribbleTexture({ bg: '#f4f0e6', fg: '#5a6a7a' }) }), { x: 3.6, y: 1.7, z: -3.82, noOutline: true });
    // 检票口
    b.add(boxGeometry(0.4, 1.4, 2.2), m.accentFor(0x3a6b8a), { x: 2.2, y: 0.7, z: 3.0 });
    b.add(boxGeometry(0.4, 1.4, 2.2), m.accentFor(0x3a6b8a), { x: 3.6, y: 0.7, z: 3.0 });
    b.add(boxGeometry(1.4, 0.3, 0.3), m.accentFor(0xe8b64c), { x: 2.9, y: 1.5, z: 2.2 });
    // 自动贩卖机
    b.add(boxGeometry(1.2, 1.9, 0.7), m.accentFor(0x2f7fb5), { x: 5.0, y: 0.95, z: 0.6 });
    b.add(new THREE.PlaneGeometry(0.9, 1.1), m.bulb, { x: 5.0, y: 1.2, z: 0.96, noOutline: true });
    interactables.push({ id: 'stationDrink', kind: 'item', item: 'drink', x: 5.0, z: 1.6, label: '饮料', radius: 1.4, prompt: 'E' });
  },

  post(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    b.add(boxGeometry(4.0, 1.1, 0.9), m.accentFor(0x2f7f5f), { x: 0, y: 0.55, z: -3.2 });
    b.add(boxGeometry(4.2, 0.1, 1.0), m.woodDark, { x: 0, y: 1.15, z: -3.2 });
    b.add(boxGeometry(0.8, 0.2, 0.5), m.metalDark, { x: 1.2, y: 1.3, z: -3.0 });
    interactables.push({ id: 'postCounter', kind: 'shop', shop: 'post', x: 0, z: -2.2, label: '寄信 / 寄包裹', radius: 2.2, prompt: 'E' });
    // 包裹架
    for (let s = 0; s < 3; s++) {
      b.add(boxGeometry(4.0, 0.08, 0.5), m.wood, { x: 0, y: 0.6 + s * 0.7, z: 1.2 });
      for (let k = 0; k < 4; k++) {
        b.add(boxGeometry(0.6, 0.5, 0.45), m.accentFor(0xc8a878), { x: -1.5 + k * 1.0, y: 0.9 + s * 0.7, z: 1.2 });
      }
    }
    for (const s of [-1, 1]) b.add(boxGeometry(0.1, 2.4, 0.5), m.woodDark, { x: (s * 2.05), y: 1.2, z: 1.2 });
    // 邮筒
    b.add(boxGeometry(0.7, 1.0, 0.5), m.accentFor(0xd65545), { x: -4.4, y: 0.72, z: 0.6 });
    b.add(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 12, 1, false, 0, Math.PI), m.accentFor(0xd65545), { x: -4.4, y: 1.22, z: 0.6, rz: Math.PI / 2 });
    // 秤
    b.add(boxGeometry(0.5, 0.1, 0.5), m.metal, { x: 2.0, y: 0.05, z: -1.0 });
    b.add(cylinderGeometry(0.04, 0.05, 1.0, 6), m.metalDark, { x: 2.0, y: 0.5, z: -1.0 });
  },

  shrine(b, m, ctx) {
    const { w, d, rng, interactables } = ctx;
    // 祭坛
    b.add(boxGeometry(3.6, 1.0, 1.0), m.woodDark, { x: 0, y: 0.5, z: -3.0 });
    b.add(boxGeometry(4.0, 0.14, 1.2), m.accentFor(0x8a2f22), { x: 0, y: 1.05, z: -3.0 });
    b.add(boxGeometry(3.0, 1.4, 0.4), m.accentFor(0x7a2a20), { x: 0, y: 1.8, z: -3.6 });
    // 御神体（镜与团扇）
    b.add(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 14), m.accentFor(0xd8c88a), { x: -0.7, y: 1.4, z: -3.3, rx: Math.PI / 2 });
    b.add(new THREE.SphereGeometry(0.32, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m.accentFor(0xf0ead0), { x: 0.6, y: 1.4, z: -3.3, rx: Math.PI / 2 });
    // 供物
    for (let i = 0; i < 3; i++) {
      b.add(cylinderGeometry(0.16, 0.14, 0.2, 10), m.accentFor(0xe8dcc0), { x: -1.0 + i * 1.0, y: 1.2, z: -2.6 });
      b.add(sphereGeometry(0.12, 8), m.accentFor(0x6fa85a), { x: -1.0 + i * 1.0, y: 1.36, z: -2.6 });
    }
    interactables.push({ id: 'shrineAltar', kind: 'offer', x: 0, z: -1.8, label: '参拜', radius: 2.0, prompt: 'E' });
    // 赛钱箱
    b.add(boxGeometry(1.0, 0.8, 0.7), m.woodDark, { x: -2.6, y: 0.4, z: -1.6 });
    b.add(boxGeometry(1.15, 0.12, 0.85), m.accentFor(0x8a2f22), { x: -2.6, y: 0.85, z: -1.6 });
    // 注连绳
    b.add(cylinderGeometry(0.1, 0.1, 4.4, 6), m.accentFor(0xe8dcc0), { x: 0, y: 2.5, z: -1.8, rz: Math.PI / 2 });
    for (let i = -1; i <= 1; i++) {
      b.add(new THREE.PlaneGeometry(0.22, 0.55), m.accentFor(0xf6f2e6), { x: i * 1.2, y: 2.2, z: -1.75, noOutline: true });
    }
    // 千本与绘马
    b.add(boxGeometry(1.0, 1.2, 0.3), m.wood, { x: 3.0, y: 1.2, z: -3.0 });
    for (let i = 0; i < 5; i++) {
      b.add(new THREE.PlaneGeometry(0.34, 0.44), m.accentFor(0xf0e8d0), { x: 2.6 + (i % 3) * 0.4, y: 0.8 + Math.floor(i / 3) * 0.5, z: -2.83, noOutline: true });
    }
    // 蜡烛
    for (const s of [-1, 1]) {
      b.add(cylinderGeometry(0.1, 0.12, 0.4, 10), m.metal, { x: s * 2.4, y: 0.2, z: 0.6 });
      b.add(new THREE.SphereGeometry(0.1, 8), m.bulb, { x: s * 2.4, y: 0.48, z: 0.6, noOutline: true });
    }
  },
};

function trimMat2(m) {
  return m.wood;
}
