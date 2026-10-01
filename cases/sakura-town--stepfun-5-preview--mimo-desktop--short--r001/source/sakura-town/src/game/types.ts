/** 樱花小镇共享类型定义。 */

export interface Vec2 {
  x: number;
  z: number;
}

export type NpcRole =
  | 'baker'
  | 'shopkeeper'
  | 'cafeOwner'
  | 'florist'
  | 'stationMaster'
  | 'doctor'
  | 'priest'
  | 'farmer'
  | 'teacher'
  | 'student'
  | 'kid'
  | 'villager';

export type Personality = 'gentle' | 'lively' | 'shy' | 'gruff' | 'curious';

export interface NpcDef {
  id: string;
  name: string;
  role: NpcRole;
  homeId: string;
  workId: string;
  favoriteItem: string;
  personality: Personality;
  palette: {
    skin: string;
    hair: string;
    top: string;
    bottom: string;
  };
}

export type BuildingKind = 'bakery' | 'store' | 'cafe' | 'flower' | 'clinic' | 'station' | 'shrine' | 'house';

export interface BuildingSpec {
  id: string;
  kind: BuildingKind;
  name: string;
  x: number;
  z: number;
  /** 正面朝向：0=+z(南)，π=-z(北)，π/2=-x(西)，-π/2=+x(东)。 */
  rotY: number;
  w: number;
  d: number;
  h: number;
  /** 门外可站立点（世界坐标）。 */
  door: Vec2;
  enterable: boolean;
  /** 居住 NPC id（住宅）。 */
  residentId?: string;
  /** 关联商店 id。 */
  shopId?: string;
  palette: {
    wall: string;
    trim: string;
    roof: string;
  };
}

export interface ShopDef {
  id: string;
  name: string;
  buildingId: string;
  stock: { itemId: string; qty: number }[];
}

export type ItemKind = 'food' | 'gift' | 'material';

export interface ItemDef {
  id: string;
  name: string;
  kind: ItemKind;
  price: number;
  /** 作为礼物的基础好感价值。 */
  giftValue: number;
  desc: string;
}

export interface SpotDef {
  id: string;
  name: string;
  x: number;
  z: number;
  indoor: boolean;
}

export interface RoadNode {
  id: string;
  x: number;
  z: number;
}

export interface RoadEdge {
  a: string;
  b: string;
}

export type WeatherKind = 'clear' | 'cloudy' | 'rain';

export type QuestKind = 'fetch' | 'deliver' | 'meet' | 'find';

export interface Quest {
  id: string;
  kind: QuestKind;
  giverId: string;
  title: string;
  detail: string;
  /** 目标 NPC / 地点 / 物品。 */
  targetNpcId?: string;
  targetSpotId?: string;
  targetItemId?: string;
  /** 「见面」委托的有效时段（游戏小时）。 */
  windowFrom?: number;
  windowTo?: number;
  reward: number;
  relationshipReward: number;
  /** 到期游戏日；<=0 表示今日到期。 */
  deadlineDay: number;
  status: 'active' | 'ready' | 'done' | 'failed';
}

export interface TownSaveData {
  version: 1;
  day: number;
  minutes: number;
  weather: WeatherKind;
  money: number;
  inventory: Record<string, number>;
  relationships: Record<string, number>;
  talkedToday: Record<string, number>;
  quests: Quest[];
  flags: Record<string, boolean>;
  playerPos: Vec2;
  rngState: number;
}
