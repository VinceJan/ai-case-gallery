import type {
  BuildingSpec,
  ItemDef,
  NpcDef,
  RoadEdge,
  RoadNode,
  ShopDef,
  SpotDef,
} from '../game/types';

/** 建筑正面单位向量（rotY=0 朝 +z）。 */
export function forwardVector(rotY: number): { x: number; z: number } {
  return { x: -Math.sin(rotY), z: Math.cos(rotY) };
}

/** 由中心、朝向、进深计算门外站立点。 */
export function doorPoint(spec: BuildingSpec): { x: number; z: number } {
  const f = forwardVector(spec.rotY);
  return {
    x: spec.x + f.x * (spec.d / 2 + 0.9),
    z: spec.z + f.z * (spec.d / 2 + 0.9),
  };
}

function b(
  id: string,
  kind: BuildingSpec['kind'],
  name: string,
  x: number,
  z: number,
  rotY: number,
  w: number,
  d: number,
  h: number,
  options: Partial<BuildingSpec> = {},
): BuildingSpec {
  const spec: BuildingSpec = {
    id,
    kind,
    name,
    x,
    z,
    rotY,
    w,
    d,
    h,
    door: { x: 0, z: 0 },
    enterable: options.enterable ?? false,
    residentId: options.residentId,
    shopId: options.shopId,
    palette: options.palette ?? {
      wall: '#f2ead9',
      trim: '#8a5a3b',
      roof: '#4a5568',
    },
  };
  spec.door = doorPoint(spec);
  return spec;
}

export const BUILDINGS: BuildingSpec[] = [
  // 商店街（北侧一排，朝南）
  b('b_bakery', 'bakery', '樱花面包房', -24, -21, 0, 11, 8, 5.5, {
    enterable: true,
    shopId: 's_bakery',
    palette: { wall: '#f6e7d4', trim: '#b0673a', roof: '#7c4a3a' },
  }),
  b('b_store', 'store', '佐藤杂货店', -8, -21, 0, 11, 8, 5.5, {
    enterable: true,
    shopId: 's_store',
    palette: { wall: '#eef0e6', trim: '#3f6d5a', roof: '#41506b' },
  }),
  b('b_cafe', 'cafe', '木漏咖啡馆', 8, -21, 0, 11, 8, 5.5, {
    enterable: true,
    shopId: 's_cafe',
    palette: { wall: '#e9e4f2', trim: '#5b4a72', roof: '#4c4560' },
  }),
  b('b_flower', 'flower', '花屋小樱', 24, -21, 0, 10, 8, 5.5, {
    enterable: true,
    shopId: 's_flower',
    palette: { wall: '#fbe9ef', trim: '#c05b7a', roof: '#6b4453' },
  }),
  // 诊疗所（商店街东端，朝西）
  b('b_clinic', 'clinic', '冈本诊疗所', 34, -13, Math.PI / 2, 12, 9, 5.5, {
    enterable: true,
    palette: { wall: '#f4f6f8', trim: '#3a6ea5', roof: '#3c4c66' },
  }),
  // 车站（铁路北侧）
  b('b_station', 'station', '樱花站', -4, -50, 0, 14, 10, 6, {
    enterable: true,
    palette: { wall: '#efe6d8', trim: '#7a6a4f', roof: '#46536b' },
  }),
  // 神社本殿（东侧，朝西）
  b('b_shrine', 'shrine', '樱花神社', 48, 10, Math.PI / 2, 12, 10, 6.5, {
    enterable: true,
    palette: { wall: '#f3ede0', trim: '#a03d2e', roof: '#5c4a3a' },
  }),
  // 可进入住宅
  b('b_home_player', 'house', '你的家', -18, 25, Math.PI, 10, 8, 5, {
    enterable: true,
    palette: { wall: '#f4ead8', trim: '#8a5a3b', roof: '#54606f' },
  }),
  b('b_home_teacher', 'house', '加藤家', 0, 25, Math.PI, 10, 8, 5, {
    enterable: true,
    residentId: 'npc_teacher',
    palette: { wall: '#f0ead6', trim: '#6f7f5a', roof: '#4c5a52' },
  }),
  b('b_home_student', 'house', '伊藤家', 16, 25, Math.PI, 10, 8, 5, {
    enterable: true,
    residentId: 'npc_student',
    palette: { wall: '#f6ece2', trim: '#a5683f', roof: '#575064' },
  }),
  b('b_home_kid', 'house', '冈本家', 32, 11, 0, 10, 8, 5, {
    enterable: true,
    residentId: 'npc_kid',
    palette: { wall: '#eef0e4', trim: '#4f7d6a', roof: '#454f63' },
  }),
  b('b_home_farmer', 'house', '渡边农家', -34, 34, Math.PI, 11, 9, 5, {
    enterable: true,
    residentId: 'npc_farmer',
    palette: { wall: '#efe8d4', trim: '#8f6b3f', roof: '#5a5340' },
  }),
  // 外观住宅
  b('b_house_a', 'house', '佐藤家', 40, 34, 0, 10, 8, 5, {
    residentId: 'npc_shopkeeper',
    palette: { wall: '#f2ece0', trim: '#7d6a52', roof: '#4a5468' },
  }),
  b('b_house_b', 'house', '田中家', -48, -34, 0, 10, 8, 5, {
    residentId: 'npc_baker',
    palette: { wall: '#f6e9d8', trim: '#a5673c', roof: '#54404a' },
  }),
  b('b_house_c', 'house', '高桥家', -52, 8, 0, 10, 8, 5, {
    residentId: 'npc_cafe',
    palette: { wall: '#ece7f2', trim: '#6a5a80', roof: '#474258' },
  }),
  b('b_house_d', 'house', '中村家', 52, 44, Math.PI, 10, 8, 5, {
    residentId: 'npc_florist',
    palette: { wall: '#fbe9ee', trim: '#b05b74', roof: '#5c4450' },
  }),
  b('b_house_e', 'house', '铃木家', 60, -34, Math.PI, 10, 8, 5, {
    residentId: 'npc_station',
    palette: { wall: '#efe6d6', trim: '#76705a', roof: '#46536b' },
  }),
  b('b_house_f', 'house', '松本家', -64, 40, 0, 10, 8, 5, {
    residentId: 'npc_villager1',
    palette: { wall: '#f0ece0', trim: '#6e6a52', roof: '#4d554e' },
  }),
  b('b_house_g', 'house', '木村家', 66, 6, Math.PI, 10, 8, 5, {
    residentId: 'npc_villager2',
    palette: { wall: '#e9eef0', trim: '#3f6d7d', roof: '#3c4a5c' },
  }),
  b('b_house_h', 'house', '早川家', 16, 44, Math.PI, 10, 8, 5, {
    residentId: 'npc_villager3',
    palette: { wall: '#f4ecdd', trim: '#96703f', roof: '#515160' },
  }),
];

export const SHOPS: ShopDef[] = [
  {
    id: 's_bakery',
    name: '樱花面包房',
    buildingId: 'b_bakery',
    stock: [
      { itemId: 'i_bread', qty: 6 },
      { itemId: 'i_taiyaki', qty: 6 },
      { itemId: 'i_cake', qty: 4 },
    ],
  },
  {
    id: 's_store',
    name: '佐藤杂货店',
    buildingId: 'b_store',
    stock: [
      { itemId: 'i_onigiri', qty: 8 },
      { itemId: 'i_milk', qty: 6 },
      { itemId: 'i_coffee', qty: 6 },
    ],
  },
  {
    id: 's_cafe',
    name: '木漏咖啡馆',
    buildingId: 'b_cafe',
    stock: [
      { itemId: 'i_coffee', qty: 8 },
      { itemId: 'i_cake', qty: 5 },
      { itemId: 'i_bread', qty: 5 },
    ],
  },
  {
    id: 's_flower',
    name: '花屋小樱',
    buildingId: 'b_flower',
    stock: [
      { itemId: 'i_bouquet', qty: 4 },
      { itemId: 'i_sakura', qty: 6 },
    ],
  },
];

export const ITEMS: ItemDef[] = [
  { id: 'i_onigiri', name: '饭团', kind: 'food', price: 120, giftValue: 8, desc: '热腾腾的饭团，海苔很脆。' },
  { id: 'i_bread', name: '黄油面包', kind: 'food', price: 180, giftValue: 10, desc: '今早刚烤好的黄油面包。' },
  { id: 'i_taiyaki', name: '鲷鱼烧', kind: 'food', price: 150, giftValue: 9, desc: '红豆馅鲷鱼烧，捧着暖暖的。' },
  { id: 'i_coffee', name: '手冲咖啡', kind: 'food', price: 220, giftValue: 11, desc: '一杯香气很足的手冲咖啡。' },
  { id: 'i_cake', name: '樱花蛋糕', kind: 'food', price: 280, giftValue: 13, desc: '点缀盐渍樱花的蛋糕。' },
  { id: 'i_milk', name: '牛奶', kind: 'food', price: 140, giftValue: 7, desc: '本地牧场直送的牛奶。' },
  { id: 'i_bouquet', name: '春花束', kind: 'gift', price: 480, giftValue: 18, desc: '小樱搭配的春季花束。' },
  { id: 'i_sakura', name: '樱花枝', kind: 'gift', price: 300, giftValue: 14, desc: '一枝开得正好的樱花。' },
  { id: 'i_radish', name: '萝卜', kind: 'material', price: 80, giftValue: 5, desc: '渡边家田里刚拔的萝卜。' },
];

export const ITEM_MAP: Record<string, ItemDef> = Object.fromEntries(
  ITEMS.map((item) => [item.id, item]),
);

export const NPCS: NpcDef[] = [
  {
    id: 'npc_baker',
    name: '田中花子',
    role: 'baker',
    homeId: 'b_house_b',
    workId: 'b_bakery',
    favoriteItem: 'i_bread',
    personality: 'gentle',
    palette: { skin: '#f2cfae', hair: '#4a3527', top: '#e8b4c8', bottom: '#7a5a48' },
  },
  {
    id: 'npc_shopkeeper',
    name: '佐藤健',
    role: 'shopkeeper',
    homeId: 'b_house_a',
    workId: 'b_store',
    favoriteItem: 'i_onigiri',
    personality: 'gruff',
    palette: { skin: '#e8bd93', hair: '#2e2a26', top: '#5a7d6a', bottom: '#3f4a55' },
  },
  {
    id: 'npc_cafe',
    name: '高桥美咲',
    role: 'cafeOwner',
    homeId: 'b_house_c',
    workId: 'b_cafe',
    favoriteItem: 'i_cake',
    personality: 'lively',
    palette: { skin: '#f4d3b0', hair: '#6b4a2f', top: '#8a7ab8', bottom: '#4a4458' },
  },
  {
    id: 'npc_florist',
    name: '中村小樱',
    role: 'florist',
    homeId: 'b_house_d',
    workId: 'b_flower',
    favoriteItem: 'i_bouquet',
    personality: 'gentle',
    palette: { skin: '#f6d8b8', hair: '#3f3230', top: '#e09ab0', bottom: '#8a5a68' },
  },
  {
    id: 'npc_station',
    name: '铃木一郎',
    role: 'stationMaster',
    homeId: 'b_house_e',
    workId: 'b_station',
    favoriteItem: 'i_coffee',
    personality: 'curious',
    palette: { skin: '#e5b98e', hair: '#57504a', top: '#3f5a7d', bottom: '#333c48' },
  },
  {
    id: 'npc_doctor',
    name: '冈本医生',
    role: 'doctor',
    homeId: 'b_house_f',
    workId: 'b_clinic',
    favoriteItem: 'i_milk',
    personality: 'gentle',
    palette: { skin: '#efc9a4', hair: '#d8d4cc', top: '#f0f2f4', bottom: '#5a6470' },
  },
  {
    id: 'npc_priest',
    name: '山本隆',
    role: 'priest',
    homeId: 'b_shrine',
    workId: 'b_shrine',
    favoriteItem: 'i_sakura',
    personality: 'gruff',
    palette: { skin: '#dcb28a', hair: '#e6e2da', top: '#4a4a52', bottom: '#3a3a42' },
  },
  {
    id: 'npc_farmer',
    name: '渡边大辅',
    role: 'farmer',
    homeId: 'b_home_farmer',
    workId: 'b_farm',
    favoriteItem: 'i_onigiri',
    personality: 'lively',
    palette: { skin: '#c99a6b', hair: '#33291f', top: '#a58a4f', bottom: '#5f4a2f' },
  },
  {
    id: 'npc_teacher',
    name: '加藤京子',
    role: 'teacher',
    homeId: 'b_home_teacher',
    workId: 'b_home_teacher',
    favoriteItem: 'i_cake',
    personality: 'gentle',
    palette: { skin: '#f0cba6', hair: '#8a8578', top: '#9a7ab8', bottom: '#5a5470' },
  },
  {
    id: 'npc_student',
    name: '伊藤结衣',
    role: 'student',
    homeId: 'b_home_student',
    workId: 'b_school',
    favoriteItem: 'i_taiyaki',
    personality: 'shy',
    palette: { skin: '#f6d6b6', hair: '#2f2a2e', top: '#e8e4f0', bottom: '#4a4a63' },
  },
  {
    id: 'npc_kid',
    name: '冈本陆',
    role: 'kid',
    homeId: 'b_home_kid',
    workId: 'b_park',
    favoriteItem: 'i_taiyaki',
    personality: 'curious',
    palette: { skin: '#f4cfa8', hair: '#3a2f28', top: '#e8c85a', bottom: '#4a6a8a' },
  },
  {
    id: 'npc_villager1',
    name: '松本绘里',
    role: 'villager',
    homeId: 'b_house_f',
    workId: 'b_house_f',
    favoriteItem: 'i_coffee',
    personality: 'gentle',
    palette: { skin: '#eec4a2', hair: '#7a6f60', top: '#c8b8a0', bottom: '#6a6258' },
  },
  {
    id: 'npc_villager2',
    name: '木村大介',
    role: 'villager',
    homeId: 'b_house_g',
    workId: 'b_river',
    favoriteItem: 'i_onigiri',
    personality: 'gruff',
    palette: { skin: '#c89668', hair: '#2a2620', top: '#3f6d7d', bottom: '#33404a' },
  },
  {
    id: 'npc_villager3',
    name: '早川翔',
    role: 'villager',
    homeId: 'b_house_h',
    workId: 'b_park',
    favoriteItem: 'i_milk',
    personality: 'lively',
    palette: { skin: '#e8bd93', hair: '#1f1c1a', top: '#d86a4a', bottom: '#3a4450' },
  },
];

export const NPC_MAP: Record<string, NpcDef> = Object.fromEntries(
  NPCS.map((npc) => [npc.id, npc]),
);

export const SPOTS: SpotDef[] = [
  { id: 'sp_plaza', name: '中央广场', x: 0, z: 6, indoor: false },
  { id: 'sp_street', name: '商店街', x: 0, z: -12, indoor: false },
  { id: 'sp_res', name: '住宅街', x: 0, z: 20, indoor: false },
  { id: 'sp_farm', name: '农田', x: -30, z: 46, indoor: false },
  { id: 'sp_river', name: '河岸', x: 68, z: 24, indoor: false },
  { id: 'sp_steps', name: '神社石阶', x: 38, z: 7, indoor: false },
  { id: 'sp_grove', name: '樱花林', x: 58, z: 18, indoor: false },
  { id: 'sp_platform', name: '站台', x: -4, z: -55, indoor: false },
  { id: 'sp_bench', name: '广场长椅', x: 6, z: 3, indoor: false },
  { id: 'sp_school', name: '学校', x: 44, z: -26, indoor: false },
];

export const SPOT_MAP: Record<string, SpotDef> = Object.fromEntries(
  SPOTS.map((spot) => [spot.id, spot]),
);

/** NPC 的虚拟工作地（映射到建筑或户外点）。 */
export const WORK_LOCATIONS: Record<string, { buildingId?: string; spotId?: string }> = {
  b_farm: { spotId: 'sp_farm' },
  b_school: { spotId: 'sp_street' },
  b_park: { spotId: 'sp_plaza' },
  b_river: { spotId: 'sp_river' },
};

export const ROAD_NODES: RoadNode[] = [
  { id: 'A', x: 0, z: -46 },
  { id: 'B', x: -4, z: -44 },
  { id: 'C', x: 0, z: -38 },
  { id: 'D', x: -44, z: -13 },
  { id: 'E', x: 0, z: -13 },
  { id: 'F', x: 36, z: -13 },
  { id: 'G', x: 34, z: -11 },
  { id: 'H', x: 0, z: 4 },
  { id: 'I', x: 10, z: 8 },
  { id: 'J', x: 26, z: 8 },
  { id: 'K', x: 44, z: 10 },
  { id: 'L', x: 0, z: 18 },
  { id: 'M', x: -40, z: 18 },
  { id: 'N', x: 44, z: 18 },
  { id: 'O', x: 0, z: 30 },
  { id: 'P', x: -50, z: 32 },
  { id: 'Q', x: 40, z: 32 },
  { id: 'R', x: -60, z: 0 },
  { id: 'S', x: 64, z: 0 },
  { id: 'T', x: 0, z: 60 },
  { id: 'U', x: -34, z: 30 },
  { id: 'V', x: -50, z: 18 },
  { id: 'W', x: -60, z: -38 },
  { id: 'X', x: 64, z: -38 },
  { id: 'W2', x: -60, z: -64 },
  { id: 'X2', x: 64, z: -64 },
  { id: 'Y', x: 20, z: -38 },
  { id: 'Z', x: 72, z: 20 },
];

export const ROAD_EDGES: RoadEdge[] = [
  { a: 'A', b: 'B' },
  { a: 'A', b: 'C' },
  { a: 'C', b: 'E' },
  { a: 'C', b: 'W' },
  { a: 'C', b: 'Y' },
  { a: 'E', b: 'D' },
  { a: 'E', b: 'F' },
  { a: 'E', b: 'H' },
  { a: 'F', b: 'G' },
  { a: 'H', b: 'I' },
  { a: 'H', b: 'L' },
  { a: 'I', b: 'J' },
  { a: 'J', b: 'K' },
  { a: 'L', b: 'M' },
  { a: 'L', b: 'N' },
  { a: 'L', b: 'O' },
  { a: 'O', b: 'P' },
  { a: 'O', b: 'Q' },
  { a: 'O', b: 'T' },
  { a: 'P', b: 'U' },
  { a: 'P', b: 'V' },
  { a: 'R', b: 'V' },
  { a: 'R', b: 'W' },
  { a: 'R', b: 'T' },
  { a: 'S', b: 'X' },
  { a: 'S', b: 'N' },
  { a: 'S', b: 'T' },
  { a: 'S', b: 'Z' },
  { a: 'W', b: 'X' },
  { a: 'W', b: 'W2' },
  { a: 'X', b: 'X2' },
  { a: 'Y', b: 'X' },
  { a: 'Z', b: 'N' },
];

/** 道路可视化线段（世界坐标，宽度米）。 */
export const ROAD_SEGMENTS: { x1: number; z1: number; x2: number; z2: number; width: number }[] = [
  { x1: 0, z1: -46, x2: 0, z2: 30, width: 6 },
  { x1: -4, z1: -44, x2: 0, z2: -44, width: 4 },
  { x1: -44, z1: -13, x2: 36, z2: -13, width: 6 },
  { x1: -40, z1: 18, x2: 44, z2: 18, width: 5 },
  { x1: -50, z1: 32, x2: 40, z2: 32, width: 5 },
  { x1: -60, z1: -38, x2: 20, z2: -38, width: 4 },
  { x1: -60, z1: -64, x2: -60, z2: 60, width: 4 },
  { x1: 64, z1: -64, x2: 64, z2: 60, width: 4 },
  { x1: -60, z1: 60, x2: 64, z2: 60, width: 4 },
  { x1: 10, z1: 8, x2: 44, z2: 8, width: 5 },
  { x1: -50, z1: 18, x2: -50, z2: 60, width: 4 },
  { x1: 72, z1: 14, x2: 72, z2: 26, width: 5 },
];

export const RAILWAY_Z = -58;
export const TRAIN_CROSSINGS = [-60, 64];
export const RIVER_X = 76;
export const TOWN_HALF = 80;
