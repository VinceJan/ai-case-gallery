// ================================================================
//  室内空间：便利店 / 喫茶店 / 车站 / 住宅 / 集会所
//  统一放在远处偏移坐标，通过门与外部世界互相传送
// ================================================================
import * as THREE from 'three';
import { GeoBuf, mergeBuf } from './geom.js';
import * as F from './furniture.js';
import { IM, initInteriorMaterials } from './furniture.js';
import { toon, registerNightLight } from '../render/toon.js';
import { InstanceKit, xform } from './instancing.js';
import { signTex, timetableTex } from '../render/textures.js';
import { makeRNG, clamp } from '../util/math.js';
import { ANCHORS, INTERIOR_ORIGIN, STATION } from './layout.js';
const ORDER = ['station', 'konbini', 'cafe', 'house', 'kaikan'];
// 室内 id -> 对应建筑 id（Town 会把真实门位写进 ANCHORS[建筑id]）
const BLD_OF = { station: 'station', konbini: 'konbini', cafe: 'cafe', house: 'house-yoko', kaikan: 'kaikan' };
function doorAnchor(id) { return ANCHORS[BLD_OF[id]] || { x: 0, z: 0 }; }
const SPREAD = 90;
function originOf(id) {
  const i = ORDER.indexOf(id);
  return { x: INTERIOR_ORIGIN.x + i * SPREAD, z: 0 };
}

/* ------------------------------------------------------------------ *
 *  房间外壳
 * ------------------------------------------------------------------ */
function shell(parts, w, d, h, opts = {}) {
  const {
    wallMat = IM.wall, floorMat = IM.floorTile, ceil = true,
    skirt = true, openings = [],
  } = opts;
  // 地面（由 buildOne 以独立平面生成）
  let ceiling = null;
  // 墙（内侧）
  const wl = new GeoBuf();
  const t = 0.16;
  const segs = [];
  for (let i = 0; i < w; i += 1.0) segs.push(['x', -w / 2 + i + 0.5, d / 2, 1.0, d]);
  for (let i = 0; i < d; i += 1.0) segs.push(['z', w / 2, -d / 2 + i + 0.5, d, 1.0]);
  // 墙由 buildOne 以双面平面生成
  ceiling = { h: h + 0.12, w: w + 0.4, d: d + 0.4 };
  // 踢脚
  if (skirt) {
    const s = new GeoBuf();
    s.box(0, 0.06, -d / 2 + 0.1, w, 0.12, 0.04, 1);
    s.box(0, 0.06, d / 2 - 0.1, w, 0.12, 0.04, 1);
    s.box(-w / 2 + 0.1, 0.06, 0, 0.04, 0.12, d, 1);
    s.box(w / 2 - 0.1, 0.06, 0, 0.04, 0.12, d, 1);
    addP(parts, IM.woodDark, s);
  }
  return ceiling;
}

function addP(parts, mat, buf) {
  if (!parts.has(mat)) parts.set(mat, new GeoBuf());
  mergeBuf(parts.get(mat), buf);
}

/* ------------------------------------------------------------------ *
 *  主入口
 * ------------------------------------------------------------------ */
export function buildInteriors(scene, collision) {
  initInteriorMaterials();
  const zones = {};
  const interactables = [];
  const dynamic = [];

  const lights = [];
  for (const id of ORDER) {
    const z = buildOne(id, scene, collision, interactables, dynamic);
    zones[id] = z;
    // 室内照明
    const grp = new THREE.Group();
    grp.name = 'lights-' + id;
    const rows = clamp(Math.round(z.d / 4.5), 1, 3);
    const cols = clamp(Math.round(z.w / 4.5), 1, 4);
    for (let i = 0; i < cols; i++) {
      for (let k = 0; k < rows; k++) {
        const p = new THREE.PointLight(0xffeccb, 0.62, 11, 1.35);
        p.position.set(
          z.origin.x - z.w / 2 + (i + 0.5) * (z.w / cols),
          Math.min(2.6, z.h - 0.5),
          z.origin.z - z.d / 2 + (k + 0.5) * (z.d / rows)
        );
        grp.add(p);
      }
    }
    const fill = new THREE.HemisphereLight(0xfff4e2, 0xb0a894, 0.16);
    grp.add(fill);
    scene.add(grp);
    z.lightGroup = grp;
    z.lights = grp.children;
    lights.push({ group: grp });
  }
  return { zones, interactables, dynamic, lights };
}

function buildOne(id, scene, collision, interactables, dynamic) {
  const o = originOf(id);
  const group = new THREE.Group();
  group.name = 'interior-' + id;
  const kit = new InstanceKit('int-' + id, 1);
  const add = (factory, x, y, z, ry = 0, ...args) => {
    const rng = makeRNG(((x * 97 + z * 31 + y * 7) | 0) + 5);
    const parts = factory(rng, ...args);
    const m = xform(o.x + x, y, z, ry, 1, 1, 1);
    for (const [mat, buf] of parts) if (buf && buf.count) kit.push(mat, buf, m);
  };
  const raw = (mat, buf) => kit.push(mat, buf, null);

  let meta = {};
  const DIMS = {
    station: [24, 12, 3.4, IM.floorTile],
    konbini: [15, 11, 3.1, IM.floorTile],
    cafe: [9.5, 9.5, 3.0, IM.floorWood],
    house: [11, 9, 2.8, IM.floorWood],
    kaikan: [17, 13, 3.8, IM.floorWood],
  };
  {
    const [W0, D0, H0, FMAT] = DIMS[id];
    const ceilGeo = new THREE.PlaneGeometry(W0 + 0.4, D0 + 0.4);
    ceilGeo.rotateX(Math.PI / 2);
    const cm2 = new THREE.Mesh(ceilGeo, IM.ceil);
    cm2.position.set(o.x, H0, o.z);
    group.add(cm2);
    // 地面贴图按房间尺寸重复，否则一张贴图被拉满整个房间
    const fmap = FMAT.map ? FMAT.map.clone() : null;
    if (fmap) { fmap.needsUpdate = true; fmap.repeat.set((W0 + 0.4) / 2.2, (D0 + 0.4) / 2.2); }
    const floorGeo = new THREE.PlaneGeometry(W0 + 0.4, D0 + 0.4);
    floorGeo.rotateX(-Math.PI / 2);
    const fm2 = new THREE.Mesh(floorGeo, fmap ? toon(0xffffff, { map: fmap }) : FMAT);
    fm2.position.set(o.x, 0, o.z);
    fm2.receiveShadow = true;
    group.add(fm2);
    // 四面墙（双面平面，法线朝内）
    const WALL = { station: IM.wall2, konbini: IM.wall2, cafe: IM.wallWood2, house: IM.wall2, kaikan: IM.wall2 }[id] || IM.wall2;
    const mk = (w2, h2, px, py, pz, ry) => {
      const g2 = new THREE.PlaneGeometry(w2, h2);
      const m2 = new THREE.Mesh(g2, WALL);
      m2.position.set(o.x + px, py, o.z + pz);
      m2.rotation.y = ry;
      m2.receiveShadow = true;
      group.add(m2);
    };
    mk(W0 + 0.4, H0, 0, H0 / 2, -D0 / 2 - 0.2, 0);
    mk(W0 + 0.4, H0, 0, H0 / 2, D0 / 2 + 0.2, 0);
    mk(D0 + 0.4, H0, -W0 / 2 - 0.2, H0 / 2, 0, Math.PI / 2);
    mk(D0 + 0.4, H0, W0 / 2 + 0.2, H0 / 2, 0, Math.PI / 2);
    // 室内背衬（防止看到外部）
    const backGeo = new THREE.SphereGeometry(60, 12, 8);
    const back = new THREE.Mesh(backGeo, new THREE.MeshBasicMaterial({ color: 0x2c3140, side: THREE.BackSide, fog: false }));
    back.position.set(o.x, 0, o.z);
    group.add(back);
  }

  if (id === 'konbini') meta = buildKonbini(group, add, raw, o, interactables, dynamic);
  if (id === 'cafe') meta = buildCafe(group, add, raw, o, interactables);
  if (id === 'station') meta = buildStationIn(group, add, raw, o, interactables);
  if (id === 'house') meta = buildHouse(group, add, raw, o, interactables);
  if (id === 'kaikan') meta = buildKaikan(group, add, raw, o, interactables);

  group.add(kit.build({ outline: 0.01, castShadow: true, receiveShadow: true }).group);
  scene.add(group);

  // 碰撞（以世界坐标添加，与室内物体一致）
  for (const c of meta.colliders || []) {
    collision.addBox(o.x + c.x, c.z, c.hw, c.hd, c.rot || 0, c.top ?? 3, c.bottom ?? -0.2);
  }
  {
    const [W0, D0] = DIMS[id];
    const t = 0.5;
    collision.addBox(o.x, o.z - D0 / 2 - t, W0 / 2 + t, t, 0, 4, -1);
    collision.addBox(o.x, o.z + D0 / 2 + t, W0 / 2 + t, t, 0, 4, -1);
    collision.addBox(o.x - W0 / 2 - t, o.z, t, D0 / 2 + t, 0, 4, -1);
    collision.addBox(o.x + W0 / 2 + t, o.z, t, D0 / 2 + t, 0, 4, -1);
  }
  return {
    id, group, origin: o,
    w: meta.w, d: meta.d, h: meta.h,
    groundFn: () => 0,
    spawn: meta.spawn,
    doors: meta.doors || [],
  };
}

/* ------------------------------------------------------------------ *
 *  樱花便利店
 * ------------------------------------------------------------------ */
function buildKonbini(group, add, raw, o, interactables, dynamic) {
  const W = 15, D = 11, H = 3.1;
  const parts = new Map();
  shell(parts, W, D, H, { wallMat: IM.wall, floorMat: IM.floorTile });

  // 门口（北侧 z = -D/2）玻璃自动门
  const doorX = 0, doorZ = -D / 2;
  // 门框
  const fr = new GeoBuf();
  fr.box(doorX - 1.35, 1.2, doorZ + 0.05, 0.3, 2.4, 0.24);
  fr.box(doorX + 1.35, 1.2, doorZ + 0.05, 0.3, 2.4, 0.24);
  fr.box(doorX, 2.5, doorZ + 0.05, 3.0, 0.3, 0.24);
  addP(parts, IM.metalDark, fr);
  // 门旁玻璃
  const gl = new GeoBuf();
  gl.box(doorX - 4.0, 1.3, doorZ + 0.05, 4.4, 2.6, 0.06);
  gl.box(doorX + 4.0, 1.3, doorZ + 0.05, 4.4, 2.6, 0.06);
  addP(parts, IM.glass, gl);
  // 入口地垫
  const mat2 = new GeoBuf();
  mat2.box(doorX, 0.02, doorZ + 0.7, 3.0, 0.04, 1.4, 1);
  addP(parts, IM.blue, mat2);

  // 收银台
  add(F.counter, -1.2, 0, D / 2 - 1.2, 0, 3.4, 0.8, 1.0);
  add(F.register, -2.2, 1.0, D / 2 - 1.4, -0.3);
  add(F.onigiriCase, 0.4, 1.0, D / 2 - 1.3, Math.PI);

  // 货架（3 排）
  for (let i = 0; i < 3; i++) {
    const z = -2.2 + i * 2.6;
    for (let k = 0; k < 3; k++) {
      const x = -4.6 + k * 4.6;
      add(F.shelfUnit, x, 0, z, i % 2 ? Math.PI : 0, 3.2, 1.7, 0.6, IM.white, true);
    }
  }
  // 冷藏柜（靠墙）
  add(F.fridgeCase, -W / 2 + 0.6, 0, 0, Math.PI / 2, 1.2, 1.9, 0.65);
  add(F.fridgeCase, W / 2 - 0.6, 0, 0, -Math.PI / 2, 1.2, 1.9, 0.65);
  // 杂志架
  add(F.magazineRack, W / 2 - 1.2, 0, -3.6, -Math.PI / 2);
  // 垃圾桶 / 购物篮
  const bin = new GeoBuf();
  bin.cyl(-3.6, 0.35, 3.4, 0.26, 0.22, 0.7, 10);
  addP(parts, IM.metal, bin);
  const basket = new GeoBuf();
  for (let i = 0; i < 4; i++) basket.box(0.3, 0.1 + i * 0.11, D / 2 - 0.7, 0.5, 0.02, 0.34, 1);
  addP(parts, IM.red, basket);

  // 天花灯
  for (let i = -1; i <= 1; i++) for (let k = -1; k <= 1; k += 2) {
    add(F.ceilingLight, i * 4.6, H, k * 2.6, 0);
  }
  // 招牌
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.0), toon(0xffffff, {
    map: signTex({ text: '桜 ストア', sub: 'CONVENIENCE', bg: 0xf6f8fa, fg: 0xd94a4a, accent: 0x3a7f9e, w: 640, h: 200, size: 92, subSize: 28, key: 'konsign' }),
  }));
  sign.position.set(o.x, 2.45, o.z - D / 2 + 0.2);
  group.add(sign);
  registerNightLight(sign.material, { night: new THREE.Color(0xffffff), nightIntensity: 1.0, threshold: -1 });

  // 自动门（可动）
  const doorMat = IM.glass;
  const d1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 0.06), doorMat);
  const d2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 0.06), doorMat);
  d1.position.set(o.x - 0.65, 1.2, o.z + doorZ + 0.12);
  d2.position.set(o.x + 0.65, 1.2, o.z + doorZ + 0.12);
  const dr = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 0.05), IM.metalDark);
  dr.position.set(o.x - 0.65, 1.2, o.z + doorZ + 0.08);
  group.add(d1, d2);
  dynamic.push({ kind: 'slideDoor', objs: [d1, d2], closedX: [-0.65, 0.65], openX: [-1.3, 1.3] });

  for (const [mat, buf] of parts) raw(mat, buf);

  // 交互点
  interactables.push({
    id: 'konbini-counter', zone: 'konbini', x: o.x - 1.2, z: o.z + D / 2 - 2.4, y: 0, r: 1.8,
    label: '和店员说话', kind: 'talk', target: 'yoko', priority: 1,
  });
  interactables.push({
    id: 'konbini-exit', zone: 'konbini', x: o.x, z: o.z - D / 2 + 0.9, y: 0, r: 1.5,
    label: '出门', kind: 'exit', to: { x: doorAnchor('konbini').x, z: doorAnchor('konbini').z + 0.2, yaw: Math.PI },
  });
  interactables.push({
    id: 'konbini-buy', zone: 'konbini', x: o.x - 1.2, z: o.z + D / 2 - 1.9, y: 0, r: 1.6,
    label: '结账', kind: 'buy', priority: 1,
  });

  return {
    w: W, d: D, h: H, spawn: { x: o.x, z: o.z - D / 2 + 4.6, yaw: 0 },
    colliders: [
      { x: -1.2, z: D / 2 - 1.2, hw: 1.7, hd: 0.5 },
      { x: -W / 2 + 0.6, z: 0, hw: 0.35, hd: 1.0, rot: 0 },
      { x: W / 2 - 0.6, z: 0, hw: 0.35, hd: 1.0, rot: 0 },
      { x: W / 2 - 1.2, z: -3.6, hw: 0.25, hd: 0.45, rot: 0 },
      ...[-2.2, 0.4, 3.0].flatMap((z) => [-4.6, 0, 4.6].map((x) => ({ x, z, hw: 1.6, hd: 0.32 }))),
    ],
    doors: [{ x: o.x, z: o.z - D / 2 + 1.6 }],
  };
}

/* ------------------------------------------------------------------ *
 *  喫茶ひより
 * ------------------------------------------------------------------ */
function buildCafe(group, add, raw, o, interactables) {
  const W = 9.5, D = 9.5, H = 3.0;
  const parts = new Map();
  shell(parts, W, D, H, { wallMat: IM.wallWood, floorMat: IM.floorWood });

  // 吧台
  add(F.counter, 0, 0, D / 2 - 1.2, 0, 6.4, 0.75, 1.05);
  add(F.coffeeMachine, -1.6, 1.08, -D / 2 + 1.0, 0.3);
  add(F.register, 1.8, 1.08, -D / 2 + 1.0, -0.2);
  for (let i = 0; i < 3; i++) add(F.stool, -1.4 + i * 1.4, 0, -D / 2 + 2.1, Math.PI);
  // 后厨架
  add(F.shelfUnit, 2.6, 0, -D / 2 + 0.6, 0, 1.6, 1.9, 0.4, IM.wood, true, IM.shelfCoffee);

  // 餐桌椅
  const seats = [[-2.2, 1.2, 0.5], [1.6, 1.6, -0.4], [-2.0, 3.8, 0.2], [2.4, 4.0, 3.0]];
  for (const [x, z, r] of seats) {
    add(F.table, x, 0, z, r, 0.95, 0.75, 0.72);
    add(F.chair, x - 0.75, 0, z, r + Math.PI / 2);
    add(F.chair, x + 0.75, 0, z, r - Math.PI / 2);
  }
  // 窗边座
  const wb = new GeoBuf();
  wb.box(W / 2 - 0.45, 0.22, 1.0, 0.7, 0.44, 2.6, 1);
  addP(parts, IM.woodDark, wb);
  add(F.table, W / 2 - 0.5, 0, 1.0, 0, 0.6, 1.4, 0.5);
  // 绿植 / 吊灯
  add(F.plant, -W / 2 + 0.6, 0, 2.4, 0, 1.1);
  add(F.plant, W / 2 - 0.7, 0, -2.2, 0, 0.9);
  for (let i = 0; i < 3; i++) add(F.ceilingLight, -2.4 + i * 2.4, H, 0.4, 0);

  // 菜单板
  const menu = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9), toon(0xffffff, {
    map: signTex({ text: 'メニュー', sub: 'COFFEE & CAKE', bg: 0x3a2b26, fg: 0xffe6b8, accent: 0xd98b4a, w: 384, h: 256, size: 58, subSize: 20, key: 'cafeMenu' }),
  }));
  menu.position.set(o.x - 1.4, 2.1, o.z - D / 2 + 0.42);
  group.add(menu);

  for (const [mat, buf] of parts) raw(mat, buf);

  interactables.push({
    id: 'cafe-counter', zone: 'cafe', x: o.x, z: o.z - D / 2 + 2.6, y: 0, r: 1.8,
    label: '点单', kind: 'order', priority: 1,
  });
  interactables.push({
    id: 'cafe-talk', zone: 'cafe', x: o.x + 2.2, z: o.z - D / 2 + 1.0, y: 0, r: 1.6,
    label: '和店员说话', kind: 'talk', target: 'sumi',
  });
  interactables.push({
    id: 'cafe-exit', zone: 'cafe', x: o.x, z: o.z - D / 2 + 0.9, y: 0, r: 1.4,
    label: '出门', kind: 'exit', to: { x: doorAnchor('cafe').x, z: doorAnchor('cafe').z + 0.2, yaw: Math.PI },
  });

  return {
    w: W, d: D, h: H, spawn: { x: o.x, z: o.z - D / 2 + 3.6, yaw: 0 },
    colliders: [
      { x: 0, z: D / 2 - 1.2, hw: 3.2, hd: 0.4 },
      { x: 2.6, z: -D / 2 + 0.6, hw: 0.8, hd: 0.2 },
      { x: W / 2 - 0.45, z: 1.0, hw: 0.35, hd: 1.3 },
      ...seats.map(([x, z]) => ({ x, z, hw: 0.48, hd: 0.38 })),
    ],
  };
}

/* ------------------------------------------------------------------ *
 *  车站站厅
 * ------------------------------------------------------------------ */
function buildStationIn(group, add, raw, o, interactables) {
  const W = 24, D = 12, H = 3.4;
  const parts = new Map();
  shell(parts, W, D, H, { wallMat: IM.wall, floorMat: IM.floorTile });

  // 售票窗口
  const cw = new GeoBuf();
  cw.box(0, 0.5, -D / 2 + 1.1, 8.0, 1.0, 0.7, 0.8);
  cw.box(0, 1.45, -D / 2 + 1.1, 8.0, 0.9, 0.14, 1);
  addP(parts, IM.cream, cw);
  for (let i = 0; i < 3; i++) {
    const g = new GeoBuf();
    g.box(-2.6 + i * 2.6, 1.55, -D / 2 + 1.5, 0.06, 0.8, 0.8, 1);
    addP(parts, IM.glass, g);
    const f = new GeoBuf();
    f.box(-2.6 + i * 2.6 + 0.3, 1.5, -D / 2 + 1.45, 0.5, 0.06, 0.3, 1);
    addP(parts, IM.metalDark, f);
  }
  // 检票口
  const gt = new GeoBuf();
  for (const sx of [-4.2, -0.2, 3.8]) gt.box(sx, 0.55, 2.2, 0.4, 1.1, 1.6, 1);
  gt.box(0, 1.2, 2.9, 9.5, 0.3, 0.4, 1);
  addP(parts, IM.metalDark, gt);
  // 候车长椅
  for (const x of [-7.5, -2.5, 2.5, 7.5]) {
    add(F.chair, x, 0, 0.2, Math.PI);
    add(F.chair, x, 0, -0.9, 0);
    add(F.chair, x, 0, 1.2, Math.PI);
  }
  // 时刻表 / 公告
  const tt = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.75), toon(0xffffff, { map: timetableTex() }));
  tt.position.set(o.x - 4.0, 1.7, o.z + D / 2 - 0.2);
  tt.rotation.y = Math.PI;
  group.add(tt);
  add(F.bulletinBoard, 5.0, 0, D / 2 - 0.3, Math.PI);
  // 站务室门
  const sd = new GeoBuf();
  sd.box(9.0, 1.05, -D / 2 + 0.2, 1.0, 2.1, 0.1, 1);
  addP(parts, IM.woodDark, sd);
  // 垃圾桶 / 卖店
  add(F.shelfUnit, 10.0, 0, 1.0, -Math.PI / 2, 1.6, 1.7, 0.5, IM.wood, true);
  for (let i = 0; i < 4; i++) add(F.ceilingLight, -8 + i * 5.4, H, -2, 0);
  add(F.plant, -11, 0, 3.6, 0, 1.2);
  add(F.plant, 11, 0, -3.6, 0, 1.0);

  for (const [mat, buf] of parts) raw(mat, buf);

  interactables.push({
    id: 'station-timetable', zone: 'station', x: o.x - 4.0, z: o.z + D / 2 - 0.8, y: 0, r: 1.5,
    label: '查看时刻表', kind: 'timetable',
  });
  interactables.push({
    id: 'station-window', zone: 'station', x: o.x - 1.0, z: o.z - D / 2 + 2.4, y: 0, r: 2.0,
    label: '和站务员说话', kind: 'talk', target: 'ken', priority: 1,
  });
  interactables.push({
    id: 'station-exit', zone: 'station', x: o.x, z: o.z + D / 2 - 0.9, y: 0, r: 1.6,
    label: '出站', kind: 'exit', to: { x: doorAnchor('station').x, z: doorAnchor('station').z + 0.4, yaw: 0 },
  });
  interactables.push({
    id: 'station-platform', zone: 'station', x: o.x - 6, z: o.z - 1.0, y: 0, r: 2.4,
    label: '通往月台', kind: 'exit', to: { x: ANCHORS.platformCenter.x, z: ANCHORS.platformCenter.z, yaw: Math.PI, y: STATION.platform.h },
  });

  return {
    w: W, d: D, h: H, spawn: { x: o.x, z: o.z + D / 2 - 4.0, yaw: Math.PI },
    colliders: [
      { x: 0, z: -D / 2 + 1.1, hw: 4.0, hd: 0.4 },
      { x: 9.0, z: -D / 2 + 0.25, hw: 0.5, hd: 0.2 },
      { x: 10.0, z: 1.0, hw: 0.25, hd: 0.8 },
      { x: 5.0, z: D / 2 - 0.35, hw: 0.7, hd: 0.2 },
      { x: -4.2, z: 2.2, hw: 0.2, hd: 0.8 },
      { x: -0.2, z: 2.2, hw: 0.2, hd: 0.8 },
      { x: 3.8, z: 2.2, hw: 0.2, hd: 0.8 },
    ],
  };
}

/* ------------------------------------------------------------------ *
 *  藤田家
 * ------------------------------------------------------------------ */
function buildHouse(group, add, raw, o, interactables) {
  const W = 11, D = 9, H = 2.8;
  const parts = new Map();
  shell(parts, W, D, H, { wallMat: IM.wall, floorMat: IM.floorWood });

  // 玄关（南侧）
  const genkan = new GeoBuf();
  genkan.box(0, -0.02, D / 2 - 1.4, 3.4, 0.1, 2.6, 0.6);
  addP(parts, IM.gray, genkan);
  add(F.shoeRack, -1.2, 0, D / 2 - 0.5, Math.PI);
  // 隔断墙
  const pw = new GeoBuf();
  pw.box(-W / 2 + 1.6, H / 2, D / 2 - 2.9, 0.14, H, 5.2, 0.45);
  pw.box(1.8, H / 2, D / 2 - 5.5, 7.0, H, 0.14, 0.45);
  addP(parts, IM.wallAccent, pw);

  // 客厅
  add(F.sofa, -2.6, 0, 0.2, 0);
  add(F.lowTable, -2.6, 0, 0.2, 0);
  add(F.tv, -2.6, 0, -1.6, 0);
  add(F.shelfUnit, -W / 2 + 0.4, 0, 2.0, Math.PI / 2, 1.2, 1.5, 0.4, IM.wood, true);
  add(F.plant, -5.0, 0, 3.2, 0, 1.1);
  add(F.chair, -0.6, 0, 2.0, -0.6);
  // 餐桌
  add(F.table, 3.2, 0, 1.2, 0, 1.3, 0.85, 0.74);
  for (const [dx, dz, r] of [[-0.9, 0, Math.PI / 2], [0.9, 0, -Math.PI / 2], [0, -0.65, 0], [0, 0.65, Math.PI]]) {
    add(F.chair, 3.2 + dx, 0, 1.2 + dz, r);
  }
  // 厨房
  add(F.kitchenSink, 4.4, 0, -3.4, Math.PI);
  add(F.stove, 3.2, 0, -3.5, Math.PI);
  add(F.fridge, 5.0, 0, -1.4, -Math.PI / 2);
  add(F.washingMachine, 2.0, 0, -3.6, Math.PI);
  // 卧室（榻榻米）
  const tat = new GeoBuf();
  tat.box(-2.8, 0.03, -2.6, 4.2, 0.06, 4.2, 1 / 4.2, 1 / 4.2);
  addP(parts, IM.tatami, tat);
  add(F.bed, -2.8, 0.06, -2.6, 0);
  add(F.wardrobe, -4.8, 0, -2.6, Math.PI / 2);
  add(F.lowTable, -2.8, 0.06, -0.9, 0);
  for (const [dx, dz, r] of [[-0.8, 0, Math.PI / 2], [0.8, 0, -Math.PI / 2]]) add(F.chair, -2.8 + dx, 0.06, -0.9 + dz, r);
  // 浴室（小）
  const bath = new GeoBuf();
  bath.box(-W / 2 + 1.2, 1.3, -D / 2 + 1.6, 0.12, 2.6, 3.0, 0.5);
  bath.box(-W / 2 + 1.2, 1.3, -D / 2 + 3.15, 2.4, 2.6, 0.12, 0.5);
  addP(parts, IM.wallAccent, bath);
  add(F.bathTub, -3.6, 0, -3.4, 0);
  add(F.toilet, -4.8, 0, -1.9, Math.PI / 2);
  // 灯
  for (const [x, z] of [[-2.6, 0.5], [3.0, 1.0], [-2.8, -2.0], [0, D / 2 - 1.2]]) add(F.ceilingLight, x, H, z, 0);
  // 相框
  const ph = new GeoBuf();
  for (let i = 0; i < 3; i++) ph.box(-W / 2 + 0.2, 1.7 - i * 0.0, 1.0 + i * 0.45, 0.06, 0.34, 0.26, 1);
  addP(parts, IM.woodDark, ph);

  for (const [mat, buf] of parts) raw(mat, buf);

  interactables.push({
    id: 'house-exit', zone: 'house', x: o.x, z: o.z + D / 2 - 0.8, y: 0, r: 1.4,
    label: '出门', kind: 'exit', to: { x: doorAnchor('house').x, z: doorAnchor('house').z + 0.2, yaw: 0 },
  });
  interactables.push({
    id: 'house-tv', zone: 'house', x: o.x - 2.6, z: o.z - 1.6, y: 0, r: 1.4, label: '看电视', kind: 'watch' });
  interactables.push({
    id: 'house-mail', zone: 'house', x: o.x, z: o.z + D / 2 - 1.9, y: 0, r: 1.2, label: '查看信件', kind: 'letter' });
  interactables.push({
    id: 'house-fridge', zone: 'house', x: o.x + 5.0, z: o.z - 1.4, y: 0, r: 1.2, label: '冰箱', kind: 'fridge' });
  interactables.push({
    id: 'house-sit', zone: 'house', x: o.x - 2.6, z: o.z + 1.3, y: 0, r: 1.2, label: '坐下', kind: 'sit' });

  return {
    w: W, d: D, h: H, spawn: { x: o.x, z: o.z + D / 2 - 3.4, yaw: Math.PI },
    colliders: [
      { x: -2.6, z: 0.2, hw: 1.0, hd: 0.45 }, { x: -2.6, z: -1.6, hw: 0.7, hd: 0.2 },
      { x: -2.6, z: -2.6, hw: 1.0, hd: 1.0 }, { x: -4.8, z: -2.6, hw: 0.3, hd: 0.6 },
      { x: 3.2, z: 1.2, hw: 0.65, hd: 0.45 },
      { x: 4.4, z: -3.4, hw: 0.7, hd: 0.3 }, { x: 3.2, z: -3.5, hw: 0.35, hd: 0.3 },
      { x: 5.0, z: -1.4, hw: 0.35, hd: 0.35 }, { x: 2.0, z: -3.6, hw: 0.3, hd: 0.3 },
      { x: -W / 2 + 1.2, z: -D / 2 + 1.6, hw: 1.2, hd: 1.5 },
      { x: -W / 2 + 1.6, z: D / 2 - 2.9, hw: 0.1, hd: 2.6 },
      { x: 1.8, z: D / 2 - 5.5, hw: 3.5, hd: 0.1 },
    ],
  };
}

/* ------------------------------------------------------------------ *
 *  町内集会所
 * ------------------------------------------------------------------ */
function buildKaikan(group, add, raw, o, interactables) {
  const W = 17, D = 13, H = 3.8;
  const parts = new Map();
  shell(parts, W, D, H, { wallMat: IM.wall, floorMat: IM.floorWood });

  add(F.stage, 0, 0, -D / 2 + 1.8, 0);
  add(F.bulletinBoard, -W / 2 + 0.3, 0, -2.0, Math.PI / 2);
  for (let i = 0; i < 3; i++) {
    add(F.foldingTable, -3 + i * 3, 0, 1.0 + (i % 2) * 1.4, i * 0.3);
    for (let k = 0; k < 2; k++) add(F.chair, -3.8 + i * 3 + k * 1.6, 0, 0.4 + (i % 2) * 1.4, 0);
  }
  add(F.counter, W / 2 - 3.5, 0, -D / 2 + 1.0, 0, 3.0, 0.7, 0.95);
  add(F.coffeeMachine, W / 2 - 4.2, 0.98, -D / 2 + 1.0, 0);
  add(F.shelfUnit, W / 2 - 0.5, 0, 3.0, -Math.PI / 2, 1.6, 1.8, 0.45, IM.wood, true);
  add(F.plant, -W / 2 + 0.8, 0, 4.6, 0, 1.3);
  add(F.plant, W / 2 - 0.8, 0, 4.6, 0, 1.2);
  for (let i = -1; i <= 1; i++) add(F.ceilingLight, i * 5, H, 0, 0);
  // 挂钟
  const clk = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 16), toon(0xf6f2e6));
  clk.rotation.x = Math.PI / 2;
  clk.position.set(o.x, 2.9, o.z - D / 2 + 0.3);
  group.add(clk);

  for (const [mat, buf] of parts) raw(mat, buf);

  interactables.push({
    id: 'kaikan-exit', zone: 'kaikan', x: o.x, z: o.z + D / 2 - 0.9, y: 0, r: 1.5,
    label: '出门', kind: 'exit', to: { x: doorAnchor('kaikan').x, z: doorAnchor('kaikan').z + 0.2, yaw: 0 },
  });
  interactables.push({
    id: 'kaikan-board', zone: 'kaikan', x: o.x - W / 2 + 0.8, z: o.z - 2.0, y: 0, r: 1.6,
    label: '看公告', kind: 'kaikanBoard',
  });
  interactables.push({
    id: 'kaikan-sit', zone: 'kaikan', x: o.x - 3, z: o.z + 2.4, y: 0, r: 1.3, label: '坐下', kind: 'sit' });

  return {
    w: W, d: D, h: H, spawn: { x: o.x, z: o.z + D / 2 - 4.0, yaw: Math.PI },
    colliders: [
      { x: 0, z: -D / 2 + 1.8, hw: 2.8, hd: 1.5 },
      { x: W / 2 - 3.5, z: -D / 2 + 1.0, hw: 1.5, hd: 0.35 },
      { x: W / 2 - 0.5, z: 3.0, hw: 0.25, hd: 0.8 },
      ...[-3, 0, 3].map((x, i) => ({ x, z: 1.0 + (i % 2) * 1.4, hw: 0.7, hd: 0.35 })),
    ],
  };
}

export { originOf, ORDER as INTERIOR_ORDER };
