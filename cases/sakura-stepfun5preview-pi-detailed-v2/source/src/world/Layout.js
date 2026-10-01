// 小镇布局常量（各系统共享：建造 / 寻路 / 任务 / 小地图）
// 坐标约定：x 向东，z 向南，1 单位 = 1 米，y 向上

export const RAIL_Z = -42;            // 铁路中心线
export const RAIL_X_MIN = -152;
export const RAIL_X_MAX = 152;
export const STATION_X = 0;           // 车站中心
export const CROSSING_X = 42;         // 铁路道口
export const RIVER_BASE_X = -95;      // 河道基准线（带蜿蜒）
export const BRIDGE_Z = 30;           // 河桥
export const SHRINE_HILL = { x: 62, z: 72, r: 20, h: 9.5 };

/** 道路网（NPC 寻路与小地图共用） */
export const ROADS = [
  { id: 'main', pts: [[0, -22], [0, 84]], w: 8 },                       // 主街
  { id: 'shotengai', pts: [[-55, 8], [55, 8]], w: 7 },                  // 商店街
  { id: 'east', pts: [[42, -70], [42, 38]], w: 6 },                     // 东纵路（过道口）
  { id: 'west', pts: [[-55, 8], [-75, 8], [-75, 58]], w: 5 },           // 西横路
  { id: 'school', pts: [[-75, 42], [-57, 42]], w: 4 },                  // 学校支路
  { id: 'bridge', pts: [[-75, 30], [-114, 30]], w: 4 },                 // 过河桥路
  { id: 'resE1', pts: [[42, 16], [90, 16]], w: 4 },                     // 住宅横道一
  { id: 'resE2', pts: [[42, 34], [90, 34]], w: 3.5 },                   // 住宅横道二
  { id: 'northEnd', pts: [[42, -70], [-70, -70]], w: 4 },               // 北端路
  { id: 'railSide', pts: [[48, -46], [112, -46]], w: 2.5 },             // 铁道北侧小道
  { id: 'shrine', pts: [[0, 62], [46, 62]], w: 4 },                     // 神社参道
  { id: 'parkN', pts: [[-6, 26], [-6, 52]], w: 3 },                     // 公园纵道
  { id: 'parkW', pts: [[-6, 40], [-34, 40]], w: 3 },                    // 公园横道
  { id: 'back', pts: [[-55, 27], [55, 27]], w: 3 },                     // 商店后巷
  { id: 'riverPath', pts: [[-88, -40], [-88, 120]], w: 2.5 },           // 河畔小道
  { id: 'suzuki', pts: [[38, 60], [38, 66]], w: 3 },                    // 铃木家门前
];

/** 建筑 footprint（碰撞 / 小地图 / 交互用） */
export const BUILDINGS = {
  station:   { name: '樱花町站',   minX: -20, maxX: 20, minZ: -33.4, maxZ: -21.4, enter: true },
  konbini:   { name: '樱屋便利店', minX: -14, maxX: 8,  minZ: 12,  maxZ: 24,  enter: true },
  cafe:      { name: '沐茶咖啡',   minX: 12,  maxX: 32, minZ: 12,  maxZ: 24,  enter: true },
  stationer: { name: '樱文具店',   minX: 36,  maxX: 50, minZ: 12,  maxZ: 22 },
  bakery:    { name: '日出面包房', minX: -32, maxX: -18, minZ: 12, maxZ: 22 },
  post:      { name: '樱花邮局',   minX: -8,  maxX: 10, minZ: -5,  maxZ: 3 },
  izakaya:   { name: '驹鸟小料理', minX: 14,  maxX: 30, minZ: -5,  maxZ: 3 },
  book:      { name: '春风书店',   minX: -26, maxX: -10, minZ: -5, maxZ: 3 },
  tanaka:    { name: '田中家',     minX: 58,  maxX: 74, minZ: 8,   maxZ: 22 },
  houseA:    { name: '北本家',     minX: 58,  maxX: 74, minZ: 30,  maxZ: 42 },
  houseB:    { name: '山田家',     minX: 76,  maxX: 92, minZ: 8,   maxZ: 20 },
  houseC:    { name: '渡边家',     minX: 76,  maxX: 92, minZ: 30,  maxZ: 42 },
  suzuki:    { name: '铃木家',     minX: 30,  maxX: 46, minZ: 46,  maxZ: 60, enter: true },
  community: { name: '樱花公民馆', minX: -70, maxX: -46, minZ: 22, maxZ: 38 },
  school:    { name: '樱花小学校', minX: -72, maxX: -40, minZ: 44, maxZ: 62 },
  hut:       { name: '废弃小屋',   minX: -120, maxX: -106, minZ: 8, maxZ: 24 },
  northA:    { name: '森下家',     minX: 48,  maxX: 64, minZ: -60, maxZ: -48 },
  northB:    { name: '佐藤家',     minX: -64, maxX: -50, minZ: -58, maxZ: -46 },
};

/** 重要地点（任务目标 / 小地图 / 传送提示用） */
export const LOCATIONS = {
  station:    { name: '樱花町站',   x: 0,   z: -27 },
  plaza:      { name: '站前广场',   x: 0,   z: -18 },
  platform:   { name: '站台',       x: 0,   z: -36 },
  crossing:   { name: '铁路道口',   x: 42,  z: -42 },
  konbini:    { name: '樱屋便利店', x: -3,  z: 18 },
  cafe:       { name: '沐茶咖啡',   x: 22,  z: 18 },
  post:       { name: '樱花邮局',   x: 1,   z: -1 },
  shotengai:  { name: '樱花商店街', x: 0,   z: 8 },
  park:       { name: '樱丘公园',   x: -22, z: 40 },
  shrine:     { name: '稻荷神社',   x: 62,  z: 66 },
  school:     { name: '樱花小学校', x: -56, z: 53 },
  community:  { name: '樱花公民馆', x: -58, z: 30 },
  suzuki:     { name: '铃木家',     x: 38,  z: 53 },
  tanaka:     { name: '田中家',     x: 66,  z: 15 },
  bridge:     { name: '樱桥',       x: -95, z: 30 },
  hut:        { name: '废弃小屋',   x: -113, z: 16 },
  viewpoint:  { name: '铁道眺望台', x: 108, z: -46 },
  riverPath:  { name: '河畔小道',   x: -88, z: 60 },
  north:      { name: '铁道北侧',   x: 56,  z: -54 },
};
