// ================================================================
//  樱花小镇 —— 世界布局（唯一数据源）
//  坐标系：x 东(+)/西(-)，z 南(+)/北(-)，y 上
// ================================================================

/* ---------- 轨道中心线（正弦缓弯） ---------- */
export const TRACK = {
  gauge: 1.435,
  zAt: (x) => 1.6 * Math.sin(x / 46) + 0.004 * x,
  y: 0,
  tunnelWest: -117,
  tunnelEast: 117,
  /** 轨道走廊的可行走半宽 */
  walkHalfWidth: 4.6,
  bedHalfWidth: 3.2,
  railY: 0.16,
};

/* ---------- 道路 ---------- */
// type: 'asphalt' 主街 | 'local' 支路 | 'path' 石板/土路 | 'gravel'
export const ROADS = [
  {
    id: 'main', name: '商店街', type: 'asphalt', width: 9,
    pts: [[-86, 30], [50, 30]], sidewalk: true,
  },
  {
    id: 'crossing', name: '道口通り', type: 'asphalt', width: 7,
    pts: [[34, 30], [34, 12], [34, 1], [34, -9]], sidewalk: true,
  },
  {
    id: 'station-front', name: '駅前通り', type: 'asphalt', width: 7,
    pts: [[-10, 19.5], [-10, 30]], sidewalk: true,
  },
  {
    id: 'residential', name: '住宅路', type: 'local', width: 5.6,
    pts: [[-44, 30], [-44, 52], [-6, 52]], sidewalk: false,
  },
  {
    id: 'kaikan-access', name: '集会所通り', type: 'local', width: 5.4,
    pts: [[-86, 30], [-78, 36], [-68, 42]], sidewalk: false,
  },
  {
    id: 'west-lane', name: '西の小径', type: 'path', width: 4.2,
    pts: [[-84, 30.5], [-88, 42], [-90, 56], [-87, 67], [-80, 71]], sidewalk: false,
  },
  {
    id: 'park-path', name: '公園の径', type: 'gravel', width: 3.8,
    pts: [[-30, 52], [-31, 62], [-32, 70], [-32, 80]], sidewalk: false,
  },
  {
    id: 'shrine-path', name: '参道', type: 'path', width: 3.6, steps: true,
    pts: [[34, -9], [33, -18], [30, -27], [27, -36], [24, -46], [24, -50]], sidewalk: false,
  },
  {
    id: 'lookout-path', name: '見晴らし道', type: 'path', width: 2.8,
    pts: [[24, -58], [20, -64], [15, -68]], sidewalk: false,
  },
  {
    id: 'east-path', name: '林の小径', type: 'path', width: 3.4,
    pts: [[50, 30], [55, 23], [59, 14], [60, 6]], sidewalk: false,
  },
  { id: 'bridge', name: '小橋', type: 'path', width: 4.0, bridge: true, pts: [[60, 6], [73, 2]], sidewalk: false },
  {
    id: 'east-trail', name: '沢沿い', type: 'path', width: 2.8,
    pts: [[73, 2], [78, -8], [80, -18], [80, -27]], sidewalk: false,
  },
];

/* ---------- 溪流 ---------- */
export const STREAM = {
  width: 5.2,
  pts: [[52, -96], [58, -70], [63, -44], [65.5, -20], [66, 8], [69, 30], [77, 56], [88, 88]],
};

/* ---------- 站台 ---------- */
export const STATION = {
  platform: { x0: -25, x1: 9, inner: 2.5, outer: 9.2, h: 1.05 },  // inner/outer 为轨道中心线两侧偏移
  roof: { x0: -22, x1: 6, y: 4.6 },
  building: { x: -10, z: 14.6, w: 24, d: 8.4, rot: 0 },
};

/* ---------- 道口 ---------- */
export const CROSSING = {
  x: 34, halfWidth: 4.0,          // 沿 x 方向半宽
  z: TRACK.zAt(34),               // ≈1.21
  barrierX: 8.2,                  // 栏杆距轨道距离
};

/* ---------- 建筑 ---------- */
// facing: 'south'|'north'|'east'|'west' → 正立面朝向
export const BUILDINGS = [
  // ---- 核心可进入 ----
  { id: 'station', kind: 'station', name: '樱町车站', x: -10, z: 14.6, w: 24, d: 8.4, rot: 0, floors: 1, roof: 'gable', enter: 'station' },
  { id: 'konbini', kind: 'shop', name: '樱花便利店', x: 0, z: 40.5, w: 15, d: 9, rot: Math.PI, floors: 1, roof: 'flat', enter: 'konbini', sign: { text: 'CV', sub: '樱花ストア', vertical: false, bg: 0xf2f4f7, fg: 0xd94a4a, accent: 0xd94a4a, w: 640, h: 200, size: 116, subSize: 34, bgImage: 'paper' } },
  { id: 'cafe', kind: 'cafe', name: '喫茶ひより', x: 13, z: 40.5, w: 9, d: 9, rot: Math.PI, floors: 2, roof: 'gable', enter: 'cafe', sign: { text: 'ひより', sub: 'COFFEE & CAKE', bg: 0x6b4a3a, fg: 0xfff3e0, accent: 0xe8c48a, vertical: false, w: 512, h: 256, size: 104, subSize: 26, bgImage: 'wood' } },
  { id: 'house-yoko', kind: 'house', name: '藤田家', x: -42, z: 44, w: 10.5, d: 8.2, rot: 0, floors: 1, roof: 'hip', enter: 'house', wall: 0xe8dcc4, roofCol: 0x7c8494 },
  { id: 'kaikan', kind: 'kaikan', name: '町内集会所', x: -68, z: 46, w: 16, d: 12, rot: 0, floors: 1, roof: 'gable', enter: 'kaikan' },

  // ---- 商店街（北侧） ----
  { id: 'post', kind: 'shop', name: '樱町邮局', x: 14, z: 19.8, w: 12, d: 8.6, rot: 0, floors: 1, roof: 'flat', sign: { text: '郵便局', sub: 'JP POST', bg: 0xf5f2e6, fg: 0x2f5a3a, accent: 0xc9502f, w: 512, h: 200, size: 92, subSize: 26 } },
  { id: 'clinic', kind: 'shop', name: '青木内科', x: 25, z: 19.8, w: 9, d: 8.6, rot: 0, floors: 2, roof: 'flat', sign: { text: '青木内科', sub: '診療時間 9-18', bg: 0xfdfdfb, fg: 0x3a6b8a, accent: 0x3a6b8a, w: 512, h: 200, size: 76, subSize: 22 } },
  { id: 'apart', kind: 'apartment', name: '樱町公寓', x: 44, z: 19.8, w: 10, d: 8.6, rot: 0, floors: 2, roof: 'flat' },

  // ---- 商店街（南侧） ----
  { id: 'izakaya', kind: 'shop', name: '小料理 ます', x: 23, z: 40.5, w: 9, d: 9, rot: Math.PI, floors: 2, roof: 'gable', sign: { text: 'ます', sub: '小料理', bg: 0x3a2b26, fg: 0xffe6b8, accent: 0xd98b4a, w: 512, h: 256, size: 120, subSize: 30, bgImage: 'paper' }, lantern: true },
  { id: 'wagashi', kind: 'shop', name: '和菓子 花的国', x: 33, z: 40.5, w: 9, d: 9, rot: Math.PI, floors: 1, roof: 'gable', sign: { text: '花の国', sub: '和菓子', bg: 0xfdf6ec, fg: 0xb0506a, accent: 0x8a9a5a, w: 512, h: 256, size: 84, subSize: 28 }, awning: true },
  { id: 'sundries', kind: 'shop', name: ' Everyday 杂货', x: 44, z: 40.5, w: 8, d: 9, rot: Math.PI, floors: 2, roof: 'gable', sign: { text: 'よろず', sub: '日用品', bg: 0x2f4a3c, fg: 0xf2ecd8, accent: 0xe8c14b, w: 512, h: 256, size: 100, subSize: 26, bgImage: 'wood' }, lantern: true },

  // ---- 住宅区 ----
  { id: 'house-kobayashi', kind: 'house', name: '小林家', x: -54, z: 44, w: 10, d: 8, rot: 0, floors: 1, roof: 'gable', wall: 0xdcd0b6, roofCol: 0x8a7268 },
  { id: 'house-haruka', kind: 'house', name: '高橋家', x: -30, z: 44, w: 9.6, d: 8, rot: 0, floors: 1, roof: 'hip', wall: 0xf0e6d2, roofCol: 0x7a8292 },
  { id: 'house-m1', kind: 'house', name: '町宅', x: -18, z: 44, w: 9, d: 7.6, rot: 0, floors: 1, roof: 'gable', wall: 0xe0d8c4, roofCol: 0x6e7880 },
  { id: 'house-m2', kind: 'house', name: '町宅', x: -40, z: 60, w: 9, d: 7.6, rot: Math.PI, floors: 1, roof: 'gable', wall: 0xf2ece0, roofCol: 0x8a6e62 },
  { id: 'house-m3', kind: 'house', name: '町宅', x: -29, z: 60, w: 9.4, d: 7.6, rot: Math.PI, floors: 2, roof: 'hip', wall: 0xe6dcc6, roofCol: 0x74808e },
  { id: 'house-m4', kind: 'house', name: '町宅', x: -18, z: 60, w: 9, d: 7.6, rot: Math.PI, floors: 1, roof: 'gable', wall: 0xd8cfba, roofCol: 0x66707e },

  // ---- 学校 ----
  { id: 'school', kind: 'school', name: '樱町小学校', x: -80, z: 80, w: 30, d: 13, rot: 0, floors: 2, roof: 'flat' },

  // ---- 神社 ----
  { id: 'shrine', kind: 'shrine', name: '绯樱神社', x: 24, z: -54, w: 15, d: 12, rot: 0, floors: 1, roof: 'shrine' },
];

/* ---------- 地形压平区（建筑地基） ---------- */
// 建筑自动生成 pad；此处仅列额外需要压平的区域
export const PADS = [
  { x: -10, z: 25, hw: 16, hd: 8, rot: 0, feather: 4 },      // 车站前广场
  { x: -80, z: 72, hw: 20, hd: 12, rot: 0, feather: 5 },     // 学校操场
  { x: -32, z: 76, hw: 21, hd: 14, rot: 0, feather: 6 },     // 公园
  { x: 15, z: -68, hw: 5, hd: 5, rot: 0, feather: 3 },       // 观景台
  { x: 80, z: -27, hw: 6, hd: 6, rot: 0, feather: 3 },       // 废弃小屋
  { x: 61, z: 16, hw: 4.5, hd: 4.5, rot: 0, feather: 2.5 },  // 水车
  { x: 0, z: 40.5, hw: 34, hd: 8, rot: 0, feather: 3.5 },   // 商店街南侧铺装
  { x: 26, z: 19.8, hw: 24, hd: 7, rot: 0, feather: 3.5 },   // 商店街北侧铺装
  { x: 60, z: 4, hw: 9, hd: 4, rot: -0.3, feather: 2 },      // 桥头
];

/* ---------- 地标（探索发现） ---------- */
export const LANDMARKS = [
  { id: 'lm-shop', name: '商店街', x: 24, z: 33, r: 8, desc: '傍晚会亮起一排招牌的小街。', discover: true },
  { id: 'lm-shrine', name: '绯樱神社', x: 24, z: -52, r: 9, desc: '坡道尽头、石阶之上的老神社。', discover: true },
  { id: 'lm-lookout', name: '见晴台', x: 15, z: -68, r: 6, desc: '能一眼望见整个小镇的木制平台。', discover: true },
  { id: 'lm-waterwheel', name: '水车小屋', x: 61, z: 16, r: 6, desc: '还在转的旧水车，据说能带来好运。', discover: true },
  { id: 'lm-hut', name: '林间旧屋', x: 80, z: -27, r: 7, desc: '溪边林子里一间很久没人住的屋子。', discover: true },
  { id: 'lm-tunnel', name: '隧道口', x: 112, z: 0, r: 10, desc: '铁路切进山体的入口，火车从这里消失。', discover: true },
  { id: 'lm-school', name: '樱町小学', x: -80, z: 76, r: 12, desc: '放学后空荡荡的操场。', discover: false },
  { id: 'lm-kaikan', name: '町内集会所', x: -68, z: 46, r: 10, desc: '小镇大事都在这里商量。', discover: true },
  { id: 'lm-park', name: '河童公园', x: -32, z: 76, r: 12, desc: '有沙坑和滑梯的小公园。', discover: false },
  { id: 'lm-station', name: '樱町车站', x: -10, z: 12, r: 10, desc: '小镇的大门。', discover: false },
];

/* ---------- 区域（用于 HUD 区域名 / NPC 归属） ---------- */
export const AREAS = [
  { id: 'station', name: '车站', x: -10, z: 14, r: 22 },
  { id: 'main-st', name: '商店街', x: 20, z: 30, r: 30 },
  { id: 'residential', name: '住宅区', x: -32, z: 50, r: 22 },
  { id: 'park', name: '河童公园', x: -32, z: 76, r: 20 },
  { id: 'shrine', name: '神社', x: 24, z: -50, r: 24 },
  { id: 'school', name: '学校', x: -80, z: 76, r: 22 },
  { id: 'kaikan', name: '集会所', x: -68, z: 46, r: 16 },
  { id: 'east-woods', name: '东边的林子', x: 74, z: -8, r: 26 },
];

/* ---------- 关键锚点 ---------- */
export const ANCHORS = {
  spawn: { x: -10, z: 25.5, rot: 0 },
  stationDoor: { x: -10, z: 19.0 },
  konbiniDoor: { x: 0, z: 35.6 },
  konbiniInside: { x: 0, z: 43.2 },
  cafeDoor: { x: 13, z: 35.6 },
  cafeInside: { x: 13, z: 42.6 },
  houseDoor: { x: -42, z: 48.5 },
  houseInside: { x: -42, z: 42.4 },
  kaikanDoor: { x: -68, z: 52.4 },
  kaikanInside: { x: -68, z: 49.2 },
  stationInside: { x: -10, z: 16.6 },
  noticeBoard: { x: -2.2, z: 21.6, rot: -0.35 },
  platformCenter: { x: -8, z: 5.6 },
  crossingSouth: { x: 34, z: 8.5 },
  crossingNorth: { x: 34, z: -5.5 },
  shrineGate: { x: 24, z: -45.5 },
  parkCenter: { x: -32, z: 76 },
  benchPark: { x: -30, z: 78 },
  schoolGate: { x: -80, z: 71 },
  torii: { x: 24, z: -45.5 },
  lookout: { x: 15, z: -68 },
  bridge: { x: 66.5, z: 4 },
  waterwheel: { x: 61, z: 16 },
  hut: { x: 80, z: -27 },
};

/* ---------- 室内区域（偏移到远处独立坐标） ---------- */
export const INTERIOR_ORIGIN = { x: 2400, z: 0 };
export const INTERIORS = {
  station: { name: '樱町车站', w: 24, d: 8.4, wall: 0xe8e2d2, floor: 'tile' },
  konbini: { name: '樱花便利店', w: 15, d: 9, wall: 0xf4f6f4, floor: 'tile' },
  cafe: { name: '喫茶ひより', w: 9, d: 9, wall: 0xf0e2cc, floor: 'wood' },
  house: { name: '藤田家', w: 10.5, d: 8.2, wall: 0xf2ead6, floor: 'wood' },
  kaikan: { name: '町内集会所', w: 16, d: 12, wall: 0xece6d8, floor: 'wood' },
};

export function interiorLocal(id) {
  const it = INTERIORS[id];
  return { ...it, ox: INTERIOR_ORIGIN.x, oz: INTERIOR_ORIGIN.z };
}

/* ---------- 世界常量 ---------- */
/** 可以在柜台买到的东西：id -> [{ item, price, name }] */
export const SHOP_STOCK = {
  wagashi: [
    { item: 'dango', price: 120, name: '樱花团子' },
    { item: 'drink', price: 130, name: '冷泡茶' },
  ],
  konbini: [
    { item: 'drink', price: 130, name: '罐装饮料' },
    { item: 'soda', price: 140, name: '苏打水' },
  ],
};

export const WORLD = {
  size: 440,          // 地形网格覆盖范围
  seg: 288,           // 网格分段
  playRadius: 104,    // 玩家软边界
  waterY: -1.15,
  groundR: 80,        // 盆地半径
  mountainR0: 80,
  mountainR1: 172,
  mountainH: 62,
};
