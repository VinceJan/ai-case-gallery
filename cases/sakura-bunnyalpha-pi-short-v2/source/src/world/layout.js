/**
 * 小镇布局：唯一的世界蓝图。
 * 河道、铁轨、道路、建筑、寻路路网、交互点全部在这里定义，
 * 地形 / 道路 / 建筑 / 实体 / UI 都从这里读数据，保证各处坐标一致。
 *
 * 坐标约定：x 向东为正，z 向南为正，y 向上。世界是普通平面坐标。
 */
import * as THREE from 'three';

const V = (x, z) => new THREE.Vector3(x, 0, z);
const D2R = Math.PI / 180;

// ---------------------------------------------------------------------------
// 河：自西北山脉流向东南，横在镇子北侧，形成天然的北界
// ---------------------------------------------------------------------------
export const RIVER_CTRL = [
  V(-170, -112), V(-130, -96), V(-92, -98), V(-60, -84),
  V(-34, -89), V(-8, -76), V(16, -80), V(44, -71),
  V(76, -75), V(112, -62), V(170, -66),
];
export const RIVER_WIDTH = 18;   // 河谷影响半径
export const RIVER_DEPTH = 4.8;
export const RIVER_BLOCK = 9.0;  // 人物不可进入的半径
export const WATER_Y = -2.0;

// ---------------------------------------------------------------------------
// 铁轨：东西向横在镇子南侧，(0,52) 与主街平交道口
// ---------------------------------------------------------------------------
export const RAIL_CTRL = [
  V(-170, 36), V(-124, 42), V(-84, 47.5), V(-50, 50.5),
  V(-18, 50.5), V(0, 52), V(30, 55), V(64, 52),
  V(106, 45), V(170, 34),
];
export const RAIL_Y = 0.54;          // 轨面高度
export const BALLAST_TOP = 0.36;
export const SLEEPER_TOP = 0.44;
export const CROSSING_PAD = 0.36;    // 道口路面（轨枕会略微露出）
export const CROSSING = { x: 0, z: 52 };

// ---------------------------------------------------------------------------
// 道路
// ---------------------------------------------------------------------------
export const ROADS = [
  { id: 'main', name: '主街', width: 9.5, style: 'road', pts: [V(0, -100), V(0, 94)] },
  { id: 'cross_n', name: '北横街', width: 7, style: 'road', pts: [V(-62, -34), V(20, -34), V(70, -34)] },
  { id: 'cross_m', name: '中横街', width: 7, style: 'road', pts: [V(-70, 14), V(20, 14), V(78, 14)] },
  { id: 'cross_s', name: '南横街', width: 6, style: 'road', pts: [V(-58, 74), V(-2, 74), V(32, 74)] },
  { id: 'station_rd', name: '站前路', width: 7, style: 'road', pts: [V(-4, 38), V(-26, 38)] },
  { id: 'shrine_path', name: '神社参道', width: 4.6, style: 'stone', pts: [V(-38, -34), V(-47, -41), V(-53, -47)] },
  { id: 'park_path', name: '公园小径', width: 4.2, style: 'stone', pts: [V(36, -34), V(38, -46), V(41, -57)] },
  { id: 'school_lane', width: 5.4, style: 'road', pts: [V(38, 14), V(54, 14), V(54, 26)] },
  { id: 'field_lane', width: 4.4, style: 'dirt', pts: [V(8, 74), V(22, 80), V(42, 83)] },
  { id: 'west_lane', width: 5, style: 'dirt', pts: [V(-70, 14), V(-78, 2), V(-82, -20)] },
  { id: 'north_lane', width: 5, style: 'dirt', pts: [V(70, -34), V(80, -46), V(86, -60)] },
  { id: 'station_path', width: 4, style: 'stone', pts: [V(-28, 38), V(-28, 24), V(-43, 22), V(-60, 28), V(-62, 40)] },
  { id: 'platform_path', width: 3.4, style: 'stone', pts: [V(-62, 40), V(-43, 41), V(-28, 42)] },
];

/** 铺装广场 */
export const PLAZAS = [
  { x: 0, z: -6, w: 32, d: 28, style: 'stone' },
  { x: -45, z: 24, w: 26, d: 12, style: 'stone' },
  { x: 54, z: 28, w: 24, d: 8, style: 'dirt' },
  { x: 0, z: 52, w: 13, d: 28, style: 'road' },
];

/** 稻田 */
export const PADDY = { x: 32, z: 79, w: 48, d: 24 };

// ---------------------------------------------------------------------------
// 建筑
// rot：正面朝向（局部 +Z 为正面）。w 沿局部 X，d 沿局部 Z。
// ---------------------------------------------------------------------------
export const BUILDINGS = [
  {
    id: 'home', kind: 'house', label: '樱花町住宅', x: -28, z: -6, rot: 90 * D2R,
    w: 13, d: 11, floors: 2, roof: 'gable', roofColor: 0x51606f,
    wall: 0xf4efe4, accent: 0xc9705f, enterable: true, interior: 'home',
    garden: true, balcony: true, resident: 'you',
  },
  {
    id: 'store', kind: 'shop', label: '山田商店', x: -14.5, z: -22, rot: 90 * D2R,
    w: 13, d: 10, floors: 1, roof: 'kawara', roofColor: 0x46525f,
    wall: 0xf1e7d5, accent: 0x3f6f8f, enterable: true, interior: 'store',
    sign: { text: '山田商店', color: 0xf6f0e2, sub: '杂货 · 蔬果', bg: 0x2f5f7a },
    awning: 0x3f6f8f, shutters: true, resident: 'yamada',
  },
  {
    id: 'konbini', kind: 'konbini', label: '樱花便利店', x: 15, z: -20, rot: -90 * D2R,
    w: 15, d: 9.5, floors: 1, roof: 'flat', roofColor: 0x4c5763,
    wall: 0xfaf6ec, accent: 0xd65545, enterable: true, interior: 'konbini',
    sign: { text: '樱花 CVS', color: 0xffffff, sub: '24h', bg: 0x2f7fb5 },
    awning: 0x2f7fb5, lit: true, resident: 'sakura',
  },
  {
    id: 'ramen', kind: 'shop', label: '拉面 一龙', x: -15, z: 4, rot: 90 * D2R,
    w: 12, d: 9.5, floors: 1, roof: 'kawara', roofColor: 0x3f4a55,
    wall: 0xe9dcc6, accent: 0xc4553f, enterable: true, interior: 'ramen',
    sign: { text: '拉面 一龙', color: 0xfff2dd, sub: '味噌拉面', bg: 0xb5452f },
    awning: 0xb5452f, noren: true, steam: true, resident: 'ichiryu',
  },
  {
    id: 'cafe', kind: 'cafe', label: '星光咖啡', x: 15.5, z: 6, rot: -90 * D2R,
    w: 12, d: 9.5, floors: 2, roof: 'gable', roofColor: 0x5b6a72,
    wall: 0xf6f1e6, accent: 0x6b8f5e, enterable: true, interior: 'cafe',
    sign: { text: '星光咖啡', color: 0x4a3a2a, sub: 'COFFEE & CAKE', bg: 0xefe2c8 },
    awning: 0xb8823f, outdoor: true, chimney: true, resident: 'yui',
  },
  {
    id: 'izakaya', kind: 'shop', label: '小酒馆 灯', x: -15, z: 25, rot: 90 * D2R,
    w: 12, d: 9, floors: 1, roof: 'kawara', roofColor: 0x403a3f,
    wall: 0x6b5546, accent: 0xe8b64c, enterable: true, interior: 'izakaya',
    sign: { text: '灯', color: 0xffd98a, sub: '居酒屋', bg: 0x3a2b28 },
    awning: 0x7a3b34, noren: true, lit: true, evening: true, resident: 'kenji',
  },
  {
    id: 'station', kind: 'station', label: '樱花站', x: -43, z: 33, rot: 0,
    w: 24, d: 9.5, floors: 1, roof: 'kawara', roofColor: 0x41505e,
    wall: 0xefe9dc, accent: 0x3a6b8a, enterable: true, interior: 'station',
    sign: { text: '樱花駅', color: 0x2b3a48, sub: 'SAKURA STATION' },
  },
  {
    id: 'shrine', kind: 'shrine', label: '稻荷神社', x: -57, z: -51, rot: 24 * D2R,
    w: 11, d: 8, floors: 1, roof: 'kirizuma', roofColor: 0x7a4a3c,
    wall: 0xc9603f, accent: 0xe8dcc0, enterable: true, interior: 'shrine',
  },
  {
    id: 'post', kind: 'post', label: '樱花邮局', x: 15.5, z: -24, rot: Math.PI,
    w: 10, d: 8, floors: 1, roof: 'kawara', roofColor: 0x4a5560,
    wall: 0xf0ece2, accent: 0x2f7f5f, enterable: true, interior: 'post',
    sign: { text: '邮便', color: 0xffffff, sub: '〒', bg: 0x2f7f5f },
  },
  {
    id: 'school', kind: 'school', label: '樱花学园', x: 56, z: 37, rot: Math.PI,
    w: 36, d: 15, floors: 2, roof: 'gable', roofColor: 0x53616d,
    wall: 0xefeae0, accent: 0x4a7fa5, enterable: false, bell: true, yard: true,
  },
  // ---- 住宅区（不可进入，只提供生活气息） ----
  { id: 'h1', kind: 'house', x: -30, z: 24, rot: 90 * D2R, w: 11, d: 9, floors: 1, roof: 'gable', roofColor: 0x5a4a52, wall: 0xf2ece2, accent: 0x7a9a6a, garden: true, resident: 'tanaka' },
  { id: 'h2', kind: 'house', x: -36, z: 40, rot: 90 * D2R, w: 11, d: 9, floors: 2, roof: 'gable', roofColor: 0x4a5660, wall: 0xeee7da, accent: 0xb58a5a, garden: true, resident: 'kobayashi' },
  { id: 'h3', kind: 'house', x: -36, z: 62, rot: 90 * D2R, w: 10, d: 9, floors: 1, roof: 'kawara', roofColor: 0x556170, wall: 0xf5f0e6, accent: 0x5f8f8f, garden: true },
  { id: 'h4', kind: 'house', x: 30, z: 22, rot: -90 * D2R, w: 11, d: 9, floors: 1, roof: 'gable', roofColor: 0x6a5a4a, wall: 0xf0e9dc, accent: 0xc07a5a, garden: true },
  { id: 'h5', kind: 'house', x: 33, z: 37, rot: -90 * D2R, w: 10, d: 9, floors: 2, roof: 'gable', roofColor: 0x4f5b66, wall: 0xf2ece0, accent: 0x6f8f5a, garden: true },
  { id: 'h6', kind: 'house', x: 24, z: 62, rot: -90 * D2R, w: 11, d: 9, floors: 1, roof: 'kawara', roofColor: 0x4a545e, wall: 0xeee8dc, accent: 0x8f6f5a, garden: true },
  { id: 'h7', kind: 'house', x: 24, z: -52, rot: 0, w: 11, d: 9, floors: 1, roof: 'gable', roofColor: 0x5f5348, wall: 0xf1ebdf, accent: 0x8fa06a, garden: true },
  { id: 'h8', kind: 'house', x: -18, z: -52, rot: 0, w: 11, d: 9, floors: 2, roof: 'gable', roofColor: 0x4a5a68, wall: 0xf0eae0, accent: 0x7a8a9a, garden: true },
  { id: 'h9', kind: 'house', x: -24, z: 60, rot: 0, w: 10, d: 9, floors: 1, roof: 'kawara', roofColor: 0x55616d, wall: 0xf2ece0, accent: 0xb08a6a, garden: true },
  { id: 'h10', kind: 'house', x: 34, z: -62, rot: Math.PI, w: 11, d: 9, floors: 1, roof: 'gable', roofColor: 0x5f5348, wall: 0xf1ebdf, accent: 0x8fa06a, garden: true },
  { id: 'farm', kind: 'house', x: -18, z: 78, rot: 0, w: 13, d: 10, floors: 1, roof: 'kawara', roofColor: 0x4a4438, wall: 0xdcd2bd, accent: 0x7a6a4a, garden: true, resident: 'sora' },
];

// ---------------------------------------------------------------------------
// NPC 寻路路网
// ---------------------------------------------------------------------------
export const NODES = [
  { id: 'm0', x: 0, z: -60, tag: 'main' },
  { id: 'm1', x: 0, z: -48, tag: 'main' },
  { id: 'm2', x: 0, z: -34, tag: 'main' },
  { id: 'm3', x: 0, z: -20, tag: 'main' },
  { id: 'm4', x: 0, z: -6, tag: 'plaza' },
  { id: 'm5', x: 0, z: 6, tag: 'plaza' },
  { id: 'm6', x: 0, z: 14, tag: 'main' },
  { id: 'm7', x: 0, z: 30, tag: 'main' },
  { id: 'm8', x: 0, z: 38, tag: 'main' },
  { id: 'm9', x: 0, z: 46, tag: 'main' },
  { id: 'm10', x: 0, z: 58, tag: 'main' },
  { id: 'm11', x: 0, z: 74, tag: 'main' },
  { id: 'm12', x: 0, z: 88, tag: 'main' },
  { id: 'n1', x: -20, z: -34, tag: 'road' },
  { id: 'n2', x: -38, z: -34, tag: 'road' },
  { id: 'n3', x: -56, z: -34, tag: 'road' },
  { id: 'n4', x: -62, z: -40, tag: 'road' },
  { id: 'n5', x: 20, z: -34, tag: 'road' },
  { id: 'n6', x: 36, z: -34, tag: 'road' },
  { id: 'n7', x: 52, z: -34, tag: 'road' },
  { id: 'n8', x: 66, z: -34, tag: 'road' },
  { id: 'n9', x: 78, z: -44, tag: 'road' },
  { id: 'c1', x: -20, z: 14, tag: 'road' },
  { id: 'c2', x: -38, z: 14, tag: 'road' },
  { id: 'c3', x: -56, z: 14, tag: 'road' },
  { id: 'c4', x: -68, z: 4, tag: 'road' },
  { id: 'c5', x: -78, z: -14, tag: 'road' },
  { id: 'c6', x: 20, z: 14, tag: 'road' },
  { id: 'c7', x: 38, z: 14, tag: 'road' },
  { id: 'c8', x: 54, z: 14, tag: 'road' },
  { id: 'c9', x: 68, z: 14, tag: 'road' },
  { id: 'c10', x: 54, z: 26, tag: 'road' },
  { id: 's1', x: -26, z: 74, tag: 'road' },
  { id: 's2', x: -18, z: 88, tag: 'road' },
  { id: 's3', x: 20, z: 74, tag: 'road' },
  { id: 't1', x: -14, z: 38, tag: 'road' },
  { id: 't2', x: -28, z: 38, tag: 'road' },
  { id: 't3', x: -28, z: 24, tag: 'road' },
  { id: 't4', x: -43, z: 22, tag: 'road' },
  { id: 't5', x: -60, z: 28, tag: 'road' },
  { id: 't6', x: -62, z: 40, tag: 'road' },
  { id: 't7', x: -43, z: 41, tag: 'road' },
  { id: 'p1', x: -68, z: 46, tag: 'platform' },
  { id: 'p2', x: -54, z: 46, tag: 'platform' },
  { id: 'p3', x: -43, z: 46, tag: 'platform' },
  { id: 'p4', x: -32, z: 46, tag: 'platform' },
  { id: 'p5', x: -26, z: 46, tag: 'platform' },
  { id: 'k1', x: 38, z: -46, tag: 'park' },
  { id: 'k2', x: 41, z: -57, tag: 'park' },
  { id: 'k3', x: 52, z: -50, tag: 'park' },
  { id: 'k4', x: 30, z: -56, tag: 'park' },
  { id: 'h1', x: -47, z: -41, tag: 'shrine' },
  { id: 'h2', x: -53, z: -47, tag: 'shrine' },
  { id: 'r1', x: 0, z: -62, tag: 'river' },
  { id: 'r2', x: 0, z: -90, tag: 'river' },
  { id: 'r3', x: 12, z: -66, tag: 'river' },
  { id: 'r4', x: -12, z: -66, tag: 'river' },
  { id: 'r5', x: 28, z: -62, tag: 'river' },
  { id: 'r6', x: 50, z: -60, tag: 'river' },
  { id: 'r7', x: -28, z: -72, tag: 'river' },
  { id: 'r8', x: -58, z: -70, tag: 'river' },
  { id: 'f1', x: 20, z: -65, tag: 'fishing' },
  { id: 'y1', x: 30, z: 79, tag: 'field' },
  { id: 'y2', x: 50, z: 83, tag: 'field' },
];

export const EDGES = [
  ['m0', 'm1'], ['m1', 'm2'], ['m2', 'm3'], ['m3', 'm4'], ['m4', 'm5'], ['m5', 'm6'],
  ['m6', 'm7'], ['m7', 'm8'], ['m8', 'm9'], ['m9', 'm10'], ['m10', 'm11'], ['m11', 'm12'],
  ['m2', 'n1'], ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'],
  ['m2', 'n5'], ['n5', 'n6'], ['n6', 'n7'], ['n7', 'n8'], ['n8', 'n9'],
  ['m6', 'c1'], ['c1', 'c2'], ['c2', 'c3'], ['c3', 'c4'], ['c4', 'c5'],
  ['m6', 'c6'], ['c6', 'c7'], ['c7', 'c8'], ['c8', 'c9'], ['c8', 'c10'],
  ['m11', 's1'], ['s1', 's2'], ['m11', 's3'],
  ['m8', 't1'], ['t1', 't2'], ['t2', 't3'], ['t3', 't4'], ['t4', 't5'], ['t5', 't6'],
  ['t6', 'p1'], ['p1', 'p2'], ['p2', 'p3'], ['p3', 'p4'], ['p4', 'p5'],
  ['t2', 't7'], ['t7', 't6'], ['t7', 'p3'],
  ['n6', 'k1'], ['k1', 'k2'], ['k2', 'k3'], ['k1', 'k4'],
  ['n2', 'h1'], ['h1', 'h2'],
  ['m0', 'r1'], ['r1', 'r2'], ['r1', 'r4'], ['r1', 'r3'], ['r3', 'r5'],
  ['r3', 'f1'], ['n7', 'r6'], ['n2', 'r7'], ['r7', 'r8'], ['n3', 'r8'],
  ['c9', 'c10'], ['s3', 'y1'], ['y1', 'y2'],
  // 门口连接
  ['m3', 'door_store'], ['m3', 'door_konbini'],
  ['m4', 'door_home'], ['m4', 'door_ramen'],
  ['m5', 'door_cafe'], ['m6', 'door_izakaya'],
  ['n5', 'door_post'], ['t7', 'door_station'], ['p2', 'door_station'], ['p4', 'door_station'],
  ['h2', 'door_shrine'], ['s2', 'door_farm'],
];

// ---------------------------------------------------------------------------
// 地标 / 场景物件
// ---------------------------------------------------------------------------
export const LANDMARKS = [
  { id: 'torii', kind: 'torii', x: -50, z: -36, rot: -40 * D2R, scale: 1.2 },
  { id: 'monument', kind: 'monument', x: 0, z: -13, rot: 0 },
  { id: 'fountain', kind: 'fountain', x: 0, z: 2, rot: 0 },
  { id: 'clock', kind: 'clocktower', x: 8, z: -20, rot: -90 * D2R },
  { id: 'busstop', kind: 'busstop', x: 7, z: 62, rot: Math.PI },
  { id: 'vending1', kind: 'vending', x: 10.5, z: -13, rot: -90 * D2R, lit: true },
  { id: 'vending2', kind: 'vending', x: -10.5, z: 33, rot: 90 * D2R, lit: true },
  { id: 'vending3', kind: 'vending', x: -46, z: 38.5, rot: 0, lit: true },
  { id: 'bench1', kind: 'bench', x: 9, z: -4, rot: -90 * D2R },
  { id: 'bench2', kind: 'bench', x: 34, z: -50, rot: 140 * D2R },
  { id: 'bench3', kind: 'bench', x: 45, z: -57, rot: -40 * D2R },
  { id: 'bench4', kind: 'bench', x: -50, z: 30, rot: 10 * D2R },
  { id: 'bench5', kind: 'bench', x: 9, z: 18, rot: -90 * D2R },
  { id: 'mailbox', kind: 'mailbox', x: 7.5, z: -27, rot: -90 * D2R },
  { id: 'signin', kind: 'signpost', x: 3.5, z: -22, rot: -30 * D2R },
  { id: 'signin2', kind: 'signpost', x: -3.5, z: 22, rot: 150 * D2R },
  { id: 'signin3', kind: 'signpost', x: 3.5, z: 44, rot: 20 * D2R },
  { id: 'bike1', kind: 'bikes', x: 11, z: -24, rot: -90 * D2R, n: 3 },
  { id: 'bike2', kind: 'bikes', x: -12, z: 12, rot: 90 * D2R, n: 2 },
  { id: 'crates', kind: 'crates', x: -20, z: -27, rot: 15 * D2R },
  { id: 'planter1', kind: 'flowerbed', x: 7, z: 0, rot: 0, flowers: true },
  { id: 'planter2', kind: 'flowerbed', x: -7, z: 16, rot: 0, flowers: true },
  { id: 'planter3', kind: 'flowerbed', x: 8, z: -26, rot: 0, flowers: true },
  { id: 'tanakagarden', kind: 'garden', x: -22, z: 22, rot: 0, resident: 'tanaka' },
  { id: 'fishspot', kind: 'fishspot', x: 20, z: -62.5, rot: 6 * D2R },
  { id: 'playground', kind: 'playground', x: 45, z: 22, rot: 0 },
  { id: 'sakuratree1', kind: 'bigtree', x: -13, z: -16, rot: 0, blossom: true },
  { id: 'sakuratree2', kind: 'bigtree', x: 11, z: -8, rot: 0, blossom: true },
  { id: 'sakuratree3', kind: 'bigtree', x: 30, z: -8, rot: 0, blossom: true },
  { id: 'sakuratree4', kind: 'bigtree', x: -27, z: 8, rot: 0, blossom: true },
  { id: 'sakuratree5', kind: 'bigtree', x: 16, z: 36, rot: 0, blossom: true },
  { id: 'sakuratree6', kind: 'bigtree', x: -14, z: 44, rot: 0, blossom: true },
  { id: 'sakuragrove', kind: 'sakuragrove', x: 38, z: -50, r: 24, n: 30, blossom: true },
  { id: 'sakuragrove2', kind: 'sakuragrove', x: -64, z: -24, r: 15, n: 12, blossom: true },
  { id: 'sakuragrove3', kind: 'sakuragrove', x: 20, z: -68, r: 13, n: 9, blossom: true },
  { id: 'forest1', kind: 'forest', x: -66, z: 26, r: 24, n: 46 },
  { id: 'forest2', kind: 'forest', x: 70, z: 4, r: 20, n: 38 },
  { id: 'forest3', kind: 'forest', x: 16, z: -70, r: 16, n: 26 },
  { id: 'forest4', kind: 'forest', x: 44, z: 62, r: 18, n: 30 },
  { id: 'forest5', kind: 'forest', x: -40, z: 74, r: 16, n: 24 },
  { id: 'paddy', kind: 'paddyfield', x: PADDY.x, z: PADDY.z, w: PADDY.w, d: PADDY.d },
  { id: 'sakuramochi', kind: 'mochi', x: 12, z: -4, rot: 0 },
];

/** 玩家出生点（自家门口的路边） */
export const SPAWN = { x: -18.6, z: -5.2, rot: 32 * D2R };

/** 昼夜：1 现实秒 ≈ 1.15 游戏分钟（一天约 12.5 分钟） */
export const TIME = {
  startHour: 7.2,
  minutesPerSecond: 1.15,
  dayNames: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
};

// ---------------------------------------------------------------------------
// 派生工具
// ---------------------------------------------------------------------------
export function makePolyline2D(ctrl, spacing) {
  const pts = [{ x: ctrl[0].x, y: 0, z: ctrl[0].z }];
  let carry = 0;
  for (let i = 1; i < ctrl.length; i++) {
    const a = pts[pts.length - 1];
    const b = { x: ctrl[i].x, y: 0, z: ctrl[i].z };
    const segLen = Math.hypot(b.x - a.x, b.z - a.z);
    if (segLen < 1e-6) continue;
    let d = spacing - carry;
    while (d <= segLen) {
      const t = d / segLen;
      pts.push({ x: a.x + (b.x - a.x) * t, y: 0, z: a.z + (b.z - a.z) * t });
      d += spacing;
    }
    carry = segLen - (d - spacing);
  }
  return pts;
}

export const buildingById = (id) => BUILDINGS.find((b) => b.id === id);
export const nodeById = (id) => NODES.find((n) => n.id === id);

/** 建筑正面朝向外侧的门口世界坐标 */
export function doorPosition(spec) {
  const dirX = Math.sin(spec.rot);
  const dirZ = Math.cos(spec.rot);
  const offset = (spec.d || 8) / 2 + 1.6;
  return { x: spec.x + dirX * offset, z: spec.z + dirZ * offset, dirX, dirZ };
}

// 门口节点自动加入路网
for (const b of BUILDINGS) {
  if (!b.enterable) continue;
  const d = doorPosition(b);
  NODES.push({ id: `door_${b.id}`, x: d.x, z: d.z, tag: 'door', building: b.id });
}

/** 建筑占地（含外扩），用于植被避让 */
export const FOOTPRINTS = BUILDINGS.map((b) => ({
  id: b.id,
  x: b.x,
  z: b.z,
  w: (b.w || 10) / 2 + 1.2,
  d: (b.d || 8) / 2 + 1.2,
  rot: b.rot || 0,
}));

/** 点是否落在某个建筑占地（含外扩 margin）内 */
export function insideFootprint(x, z, margin = 0) {
  for (const f of FOOTPRINTS) {
    const dx = x - f.x;
    const dz = z - f.z;
    const c = Math.cos(-f.rot);
    const s = Math.sin(-f.rot);
    const lx = dx * c - dz * s;
    const lz = dx * s + dz * c;
    if (Math.abs(lx) < f.w + margin && Math.abs(lz) < f.d + margin) return true;
  }
  return false;
}

/** 供植被散布时避让的点（路网节点 + 门口） */
export const CLEAR_POINTS = NODES.map((n) => ({ x: n.x, z: n.z, r: 2.6 }));
