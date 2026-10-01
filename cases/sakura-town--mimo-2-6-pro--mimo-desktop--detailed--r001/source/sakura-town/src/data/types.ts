/**
 * Shared game types for Sakura Town.
 */
import type * as THREE from 'three';

export type Weather = 'clear' | 'cloudy' | 'rain' | 'fog';

export type TimeOfDay = {
  day: number;
  hour: number;
  minute: number;
};

export type ShopHours = {
  open: number;
  close: number;
  closedWeekdays?: number[]; // 0=Sun
};

export type BuildingDef = {
  id: string;
  kind: 'house' | 'shop' | 'convenience' | 'school' | 'station' | 'shrine' | 'cafe' | 'clinic' | 'police' | 'warehouse' | 'apartment' | 'office';
  name: string;
  sx: number;
  sz: number;
  yaw: number;
  width: number;
  depth: number;
  floors: number;
  shop?: ShopHours;
  signText?: string;
  signColor?: string;
  wallColor?: string;
  roofColor?: string;
  hasInterior?: boolean;
  doorOffset?: number;
};

export type NPCDef = {
  id: string;
  name: string;
  role: 'student' | 'worker' | 'shopkeeper' | 'elder' | 'child' | 'office' | 'teacher' | 'homeless' | 'gardener';
  homeId: string;
  workId?: string;
  color: string;
  hairColor: string;
  age: number;
};

export type InteractableKind =
  | 'door'
  | 'light'
  | 'chair'
  | 'vending'
  | 'shopCounter'
  | 'bicycle'
  | 'trash'
  | 'bench'
  | 'crossingButton'
  | 'trainDoor'
  | 'book'
  | 'poster'
  | 'note'
  | 'mailbox'
  | 'shrine'
  | 'turnstile';

export type InteractableDef = {
  id: string;
  kind: InteractableKind;
  sx: number;
  sz: number;
  height: number;
  yaw?: number;
  label: string;
  buildingId?: string;
  data?: Record<string, string | number | boolean>;
};

export type QuestState = {
  id: string;
  title: string;
  status: 'hidden' | 'available' | 'active' | 'done' | 'failed';
  progress: number;
  target: number;
};

export type Relationship = {
  npcId: string;
  affinity: number; // -100..100
  met: boolean;
  lastMetDay: number;
};

export type InventoryItem = {
  id: string;
  name: string;
  kind: 'food' | 'drink' | 'gift' | 'tool' | 'ticket' | 'trash' | 'quest';
  price: number;
  icon: string;
};

export type WorldEvent = {
  id: string;
  kind: 'trainDelay' | 'shopClosed' | 'powerOut' | 'lostItem' | 'roadWork' | 'festival' | 'schoolActivity' | 'rainStart' | 'animal' | 'brokenLight';
  title: string;
  description: string;
  startDay: number;
  startHour: number;
  durationHours: number;
  active: boolean;
};

export type PlayerState = {
  money: number;
  inventory: InventoryItem[];
  relationships: Relationship[];
  quests: QuestState[];
  flags: Record<string, boolean | number>;
  visitedBuildings: string[];
  day: number;
};

export type InteractResult = {
  ok: boolean;
  message?: string;
  moneyDelta?: number;
  item?: InventoryItem;
  affinityDelta?: number;
  npcId?: string;
  questId?: string;
};

export type SurfacePose = {
  sx: number;
  sz: number;
  height: number;
  yaw: number;
};

export type Diagnostics = {
  frame: number;
  elapsed: number;
  fps: number;
  time: TimeOfDay;
  weather: Weather;
  player: { sx: number; sz: number; money: number };
  npcs: number;
  trains: number;
  renderer: { calls: number; triangles: number };
};

export type GameTestHooks = {
  seed: (value: number) => void;
  setState: (name: string) => { state: string };
  setPausedForScreenshot: (paused: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  hideDebugUi: (hidden: boolean) => void;
  setTime?: (hour: number, minute: number, day: number) => void;
  setWeather?: (w: Weather) => void;
};

declare global {
  interface Window {
    __THREE_GAME_DIAGNOSTICS__?: Diagnostics & Record<string, unknown>;
    __THREE_GAME_TEST_HOOKS__?: GameTestHooks;
    __SAKURA__?: unknown;
  }
}

export type { THREE };
