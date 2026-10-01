import * as THREE from 'three';
import { Npc, type NpcLocation } from '../entities/Npc';
import { NPCS, SPOT_MAP, WORK_LOCATIONS } from '../world/layout';
import type { NpcDef } from '../game/types';
import type { PathGraph } from '../world/pathfind';
import type { Rng } from '../utils/random';
import type { InteriorSystem } from './InteriorSystem';
import type { TownState } from '../game/TownState';
import type { TimeSystem } from './TimeSystem';
import type { WeatherSystem } from './WeatherSystem';

interface ScheduleSlot {
  from: number;
  to: number;
  location: NpcLocation;
  activity: string;
}

interface NpcRuntime {
  npc: Npc;
  energy: number;
  social: number;
  target: NpcLocation;
  /** 临时行为截止（游戏分钟，绝对 day*1440+minutes）。 */
  busyUntil: number;
  lastSlotIndex: number;
  offsetAngle: number;
}

/** NPC 间好友对（影响串门与寒暄）。 */
const FRIEND_PAIRS: [string, string][] = [
  ['npc_baker', 'npc_florist'],
  ['npc_cafe', 'npc_shopkeeper'],
  ['npc_student', 'npc_kid'],
  ['npc_teacher', 'npc_villager1'],
  ['npc_farmer', 'npc_villager2'],
  ['npc_doctor', 'npc_priest'],
  ['npc_station', 'npc_villager3'],
];

const SHOP_IDS = ['b_bakery', 'b_store', 'b_cafe', 'b_flower'];

function roleSchedule(def: NpcDef): ScheduleSlot[] {
  const home = (): NpcLocation => ({ buildingId: def.homeId });
  const work = (): NpcLocation => {
    const mapped = WORK_LOCATIONS[def.workId];
    if (mapped) return mapped;
    return { buildingId: def.workId };
  };
  const spot = (id: string): NpcLocation => ({ spotId: id });

  switch (def.role) {
    case 'baker':
      return [
        { from: 0, to: 7, location: home(), activity: '睡觉' },
        { from: 7, to: 8, location: spot('sp_street'), activity: '通勤' },
        { from: 8, to: 18, location: work(), activity: '看店' },
        { from: 18, to: 20, location: spot('sp_street'), activity: '散步' },
        { from: 20, to: 24, location: home(), activity: '休息' },
      ];
    case 'shopkeeper':
      return [
        { from: 0, to: 7, location: home(), activity: '睡觉' },
        { from: 7, to: 8, location: spot('sp_street'), activity: '通勤' },
        { from: 8, to: 18, location: work(), activity: '看店' },
        { from: 18, to: 19, location: spot('sp_street'), activity: '散步' },
        { from: 19, to: 24, location: home(), activity: '休息' },
      ];
    case 'cafeOwner':
      return [
        { from: 0, to: 7, location: home(), activity: '睡觉' },
        { from: 7, to: 8, location: spot('sp_street'), activity: '通勤' },
        { from: 8, to: 18, location: work(), activity: '看店' },
        { from: 18, to: 21, location: spot('sp_street'), activity: '小酌' },
        { from: 21, to: 24, location: home(), activity: '休息' },
      ];
    case 'florist':
      return [
        { from: 0, to: 7, location: home(), activity: '睡觉' },
        { from: 7, to: 8, location: spot('sp_street'), activity: '通勤' },
        { from: 8, to: 18, location: work(), activity: '看店' },
        { from: 18, to: 19, location: spot('sp_plaza'), activity: '散步' },
        { from: 19, to: 24, location: home(), activity: '休息' },
      ];
    case 'stationMaster':
      return [
        { from: 0, to: 6, location: home(), activity: '睡觉' },
        { from: 6, to: 7, location: spot('sp_platform'), activity: '通勤' },
        { from: 7, to: 17, location: work(), activity: '值班' },
        { from: 17, to: 24, location: home(), activity: '休息' },
      ];
    case 'doctor':
      return [
        { from: 0, to: 7, location: home(), activity: '睡觉' },
        { from: 7, to: 8, location: spot('sp_street'), activity: '通勤' },
        { from: 8, to: 17, location: work(), activity: '坐诊' },
        { from: 17, to: 18, location: spot('sp_plaza'), activity: '散步' },
        { from: 18, to: 24, location: home(), activity: '休息' },
      ];
    case 'priest':
      return [
        { from: 0, to: 6, location: home(), activity: '睡觉' },
        { from: 6, to: 18, location: work(), activity: '打扫神社' },
        { from: 18, to: 21, location: spot('sp_grove'), activity: '赏花' },
        { from: 21, to: 24, location: home(), activity: '休息' },
      ];
    case 'farmer':
      return [
        { from: 0, to: 6, location: home(), activity: '睡觉' },
        { from: 6, to: 12, location: work(), activity: '干农活' },
        { from: 12, to: 13, location: home(), activity: '吃午饭' },
        { from: 13, to: 18, location: work(), activity: '干农活' },
        { from: 18, to: 20, location: spot('sp_res'), activity: '散步' },
        { from: 20, to: 24, location: home(), activity: '休息' },
      ];
    case 'teacher':
      return [
        { from: 0, to: 8, location: home(), activity: '睡觉' },
        { from: 8, to: 11, location: spot('sp_plaza'), activity: '遛弯' },
        { from: 11, to: 15, location: spot('sp_street'), activity: '买东西' },
        { from: 15, to: 18, location: spot('sp_plaza'), activity: '晒太阳' },
        { from: 18, to: 24, location: home(), activity: '休息' },
      ];
    case 'student':
      return [
        { from: 0, to: 7, location: home(), activity: '睡觉' },
        { from: 7, to: 8, location: spot('sp_street'), activity: '通勤' },
        { from: 8, to: 15, location: spot('sp_school'), activity: '上课' },
        { from: 15, to: 17, location: spot('sp_plaza'), activity: '闲逛' },
        { from: 17, to: 24, location: home(), activity: '休息' },
      ];
    case 'kid':
      return [
        { from: 0, to: 8, location: home(), activity: '睡觉' },
        { from: 8, to: 11, location: spot('sp_plaza'), activity: '玩耍' },
        { from: 11, to: 13, location: home(), activity: '吃午饭' },
        { from: 13, to: 18, location: spot('sp_plaza'), activity: '玩耍' },
        { from: 18, to: 24, location: home(), activity: '休息' },
      ];
    default:
      return [
        { from: 0, to: 8, location: home(), activity: '睡觉' },
        { from: 8, to: 12, location: spot('sp_street'), activity: '溜达' },
        { from: 12, to: 17, location: spot('sp_plaza'), activity: '晒太阳' },
        { from: 17, to: 24, location: home(), activity: '休息' },
      ];
  }
}

/** 村民特殊作息覆盖。 */
const VILLAGER_OVERRIDES: Record<string, ScheduleSlot[]> = {
  npc_villager2: [
    { from: 0, to: 6, location: { buildingId: 'b_house_g' }, activity: '睡觉' },
    { from: 6, to: 11, location: { spotId: 'sp_river' }, activity: '钓鱼' },
    { from: 11, to: 14, location: { buildingId: 'b_house_g' }, activity: '休息' },
    { from: 14, to: 19, location: { spotId: 'sp_river' }, activity: '整理渔网' },
    { from: 19, to: 24, location: { buildingId: 'b_house_g' }, activity: '休息' },
  ],
  npc_villager3: [
    { from: 0, to: 8, location: { buildingId: 'b_house_h' }, activity: '睡觉' },
    { from: 8, to: 15, location: { spotId: 'sp_school' }, activity: '上课' },
    { from: 15, to: 18, location: { spotId: 'sp_plaza' }, activity: '打球' },
    { from: 18, to: 24, location: { buildingId: 'b_house_h' }, activity: '休息' },
  ],
};

/** NPC 在内装中的站立偏移（按建筑类型）。 */
const INTERIOR_ANCHORS: Record<string, THREE.Vector3> = {
  bakery: new THREE.Vector3(0, 0, -1.8),
  store: new THREE.Vector3(0, 0, -1.8),
  cafe: new THREE.Vector3(0, 0, -1.8),
  flower: new THREE.Vector3(0, 0, -1.8),
  clinic: new THREE.Vector3(0, 0, -1.2),
  station: new THREE.Vector3(0, 0, -1.0),
  shrine: new THREE.Vector3(0, 0, -1.4),
  house: new THREE.Vector3(0.8, 0, 0.6),
};

/** 访客（非本店员工）站在店内顾客区，避免与店主重叠。 */
const VISITOR_ANCHOR = new THREE.Vector3(1.4, 0, 1.0);

function anchorFor(def: NpcDef, buildingId: string): THREE.Vector3 {
  const isWorker = def.workId === buildingId;
  if (!isWorker) return VISITOR_ANCHOR;
  const kind = BUILDING_KINDS[buildingId];
  return (kind && INTERIOR_ANCHORS[kind]) || INTERIOR_ANCHORS.house;
}

const BUILDING_KINDS: Record<string, string> = {};

export interface NpcSystemContext {
  time: TimeSystem;
  weather: WeatherSystem;
  state: TownState;
  rng: Rng;
  graph: PathGraph;
  interiors: InteriorSystem;
  festival: boolean;
}

/** NPC 作息/决策/关系大脑。 */
export class NpcSystem {
  readonly npcs: Npc[] = [];
  readonly npcMap: Record<string, Npc> = {};
  private readonly runtimes = new Map<string, NpcRuntime>();
  private readonly schedules = new Map<string, ScheduleSlot[]>();

  constructor() {
    NPCS.forEach((def, index) => {
      const npc = new Npc(def);
      this.npcs.push(npc);
      this.npcMap[def.id] = npc;
      this.schedules.set(def.id, VILLAGER_OVERRIDES[def.id] ?? roleSchedule(def));
      this.runtimes.set(def.id, {
        npc,
        energy: 100,
        social: 60,
        target: { buildingId: def.homeId },
        busyUntil: 0,
        lastSlotIndex: -1,
        offsetAngle: index * 2.399,
      });
    });
  }

  /** 新一天：恢复精力，清空社交疲劳。 */
  resetDay(): void {
    for (const runtime of this.runtimes.values()) {
      runtime.energy = 100;
      runtime.social = 60;
      runtime.lastSlotIndex = -1;
      runtime.busyUntil = 0;
    }
  }

  /** 全量重置位置（读档/测试状态用）。 */
  relocateAll(ctx: NpcSystemContext): void {
    for (const runtime of this.runtimes.values()) {
      const def = runtime.npc.def;
      const home = this.buildings[def.homeId];
      const spot = home ? { x: home.spec.door.x, z: home.spec.door.z } : { x: 0, z: 0 };
      runtime.npc.teleport(spot.x, spot.z, 0);
      runtime.target = { buildingId: def.homeId };
      this.placeNpc(runtime, ctx);
    }
  }

  private buildings: Record<string, { spec: { kind: string; door: { x: number; z: number } } }> = {};

  setBuildings(buildings: Record<string, { spec: { kind: string; door: { x: number; z: number } } }>): void {
    this.buildings = buildings;
    for (const [id, building] of Object.entries(buildings)) {
      BUILDING_KINDS[id] = building.spec.kind;
    }
  }

  update(delta: number, ctx: NpcSystemContext): void {
    const absoluteMinutes = ctx.time.day * 1440 + ctx.time.minutes;
    const hour = ctx.time.hour;

    for (const runtime of this.runtimes.values()) {
      const def = runtime.npc.def;

      // 精力/社交随时间变化（按游戏小时）
      const hourDelta = (delta * ctx.time.minutesPerSecond) / 60;
      if (runtime.target.buildingId === def.homeId) {
        runtime.energy = Math.min(100, runtime.energy + hourDelta * 9);
        runtime.social = Math.max(0, runtime.social - hourDelta * 1.5);
      } else {
        runtime.energy = Math.max(0, runtime.energy - hourDelta * 2.2);
        runtime.social = Math.min(100, runtime.social + hourDelta * 1.2);
      }

      // 祭典期间全员汇聚神社
      if (ctx.festival && hour >= 18 && hour < 22) {
        if (runtime.target.spotId !== 'sp_steps') {
          this.sendTo(runtime, { spotId: 'sp_steps' }, ctx, absoluteMinutes);
        }
      } else if (absoluteMinutes >= runtime.busyUntil) {
        const schedule = this.schedules.get(def.id) ?? [];
        const slotIndex = schedule.findIndex((slot) => hour >= slot.from && hour < slot.to);
        const slot = schedule[Math.max(0, slotIndex)];
        if (slotIndex !== runtime.lastSlotIndex) {
          runtime.lastSlotIndex = slotIndex;
          this.decideSlot(runtime, slot, ctx, absoluteMinutes);
        }
      }

      // 移动到位后进入室内
      if (!runtime.npc.moving && runtime.target.buildingId && !this.isInside(runtime)) {
        this.placeNpc(runtime, ctx);
      }

      runtime.npc.update(delta);
      runtime.npc.setNameTagVisible(this.nameTagVisible(runtime, ctx));
    }
  }

  private isInside(runtime: NpcRuntime): boolean {
    return runtime.npc.location.buildingId === runtime.target.buildingId && runtime.target.buildingId !== undefined;
  }

  private decideSlot(runtime: NpcRuntime, slot: ScheduleSlot, ctx: NpcSystemContext, absoluteMinutes: number): void {
    const def = runtime.npc.def;
    let target = slot.location;

    // 有限决策 1：下雨天不去户外
    if (ctx.weather.isRaining && target.spotId) {
      const isWorkHours = slot.activity === '看店' || slot.activity === '坐诊' || slot.activity === '值班' || slot.activity === '打扫神社';
      target = isWorkHours ? { buildingId: def.workId } : { buildingId: def.homeId };
    }

    // 有限决策 2：精力低就回家
    if (runtime.energy < 25 && !target.buildingId?.includes('home') && target.spotId) {
      target = { buildingId: def.homeId };
    }

    // 有限决策 3：傍晚社交需求高 → 串门
    const hour = ctx.time.hour;
    if (hour >= 17 && hour < 21 && runtime.social < 45 && ctx.rng.chance(0.4)) {
      const friend = FRIEND_PAIRS.find(([a, b]) => a === def.id || b === def.id);
      if (friend) {
        const friendId = friend[0] === def.id ? friend[1] : friend[0];
        const friendDef = NPCS.find((n) => n.id === friendId);
        if (friendDef) {
          target = { buildingId: friendDef.homeId };
          runtime.busyUntil = absoluteMinutes + 90; // 串门 90 游戏分钟
        }
      }
    }

    // 有限决策 4：散步时可能去购物
    if (slot.activity === '散步' || slot.activity === '买东西' || slot.activity === '溜达') {
      if (ctx.rng.chance(0.3)) {
        const shop = ctx.rng.pick(SHOP_IDS);
        target = { buildingId: shop };
        runtime.busyUntil = absoluteMinutes + 30;
      }
    }

    this.sendTo(runtime, target, ctx, absoluteMinutes);
  }

  private sendTo(runtime: NpcRuntime, target: NpcLocation, ctx: NpcSystemContext, _absoluteMinutes: number): void {
    runtime.target = target;
    if (target.buildingId) {
      const building = this.buildings[target.buildingId];
      if (building) {
        const indoorsNow = runtime.npc.location.buildingId !== undefined;
        if (indoorsNow) {
          // 室内→室内：直接换位
          runtime.npc.location = { buildingId: target.buildingId };
          const anchor = anchorFor(runtime.npc.def, target.buildingId);
          const spot = ctx.interiors.npcSpotIn(target.buildingId, anchor);
          runtime.npc.teleport(spot.x, spot.z, spot.y);
        } else {
          // 户外→室内：先走到门口，到达后由 placeNpc 送入
          runtime.npc.location = { spotId: `door_${target.buildingId}` };
          runtime.npc.setPath(
            ctx.graph.findPath(runtime.npc.position.x, runtime.npc.position.z, building.spec.door.x, building.spec.door.z),
          );
        }
        return;
      }
    }
    const spotDef = target.spotId ? SPOT_MAP[target.spotId] : undefined;
    if (spotDef) {
      // 从室内前往户外：先落点到所在建筑的门口，再沿路网走
      if (runtime.npc.location.buildingId) {
        const from = this.buildings[runtime.npc.location.buildingId];
        if (from) runtime.npc.teleport(from.spec.door.x, from.spec.door.z, 0);
        runtime.npc.location = {};
      }
      runtime.npc.location = { spotId: target.spotId };
      const jitter = 1.6;
      const angle = runtime.offsetAngle;
      const x = spotDef.x + Math.cos(angle) * jitter + ctx.rng.range(-1.2, 1.2);
      const z = spotDef.z + Math.sin(angle) * jitter + ctx.rng.range(-1.2, 1.2);
      runtime.npc.setPath(ctx.graph.findPath(runtime.npc.position.x, runtime.npc.position.z, x, z));
      return;
    }
    // 无有效目标：回家
    const home = this.buildings[runtime.npc.def.homeId];
    if (home) {
      runtime.npc.location = { buildingId: runtime.npc.def.homeId };
      const spot = ctx.interiors.npcSpotIn(runtime.npc.def.homeId, INTERIOR_ANCHORS.house);
      runtime.npc.teleport(spot.x, spot.z, spot.y);
    }
  }

  /** 把 NPC 放到其语义位置（到门后送入室内）。 */
  private placeNpc(runtime: NpcRuntime, ctx: NpcSystemContext): void {
    const target = runtime.target;
    if (target.buildingId) {
      const building = this.buildings[target.buildingId];
      if (building) {
        runtime.npc.location = { buildingId: target.buildingId };
        const anchor = anchorFor(runtime.npc.def, target.buildingId);
        const spot = ctx.interiors.npcSpotIn(target.buildingId, anchor);
        runtime.npc.teleport(spot.x, spot.z, spot.y);
        return;
      }
    }
    this.sendTo(runtime, target, ctx, 0);
  }

  private nameTagVisible(runtime: NpcRuntime, ctx: NpcSystemContext): boolean {
    if (runtime.npc.talking) return true;
    const player = ctx.interiors.isIndoor ? ctx.interiors.indoorBuildingId : null;
    const npcIndoor = runtime.npc.location.buildingId ?? null;
    if (player !== npcIndoor) return false;
    const dx = runtime.npc.position.x - this.playerPosition.x;
    const dz = runtime.npc.position.z - this.playerPosition.z;
    return dx * dx + dz * dz < 144;
  }

  private playerPosition = new THREE.Vector3();

  setPlayerPosition(position: THREE.Vector3): void {
    this.playerPosition.copy(position);
  }

  /** 户外 NPC 的世界坐标（小地图/统计用）。 */
  outdoorPositions(): { x: number; z: number }[] {
    const result: { x: number; z: number }[] = [];
    for (const runtime of this.runtimes.values()) {
      if (!runtime.npc.location.buildingId) {
        result.push({ x: runtime.npc.position.x, z: runtime.npc.position.z });
      }
    }
    return result;
  }

  /** 玩家可交互的最近 NPC（同空间、3m 内）。 */
  nearestInteractable(playerPosition: THREE.Vector3): Npc | null {
    let best: Npc | null = null;
    let bestDist = 3.0 * 3.0;
    for (const runtime of this.runtimes.values()) {
      const npcIndoor = runtime.npc.location.buildingId ?? null;
      if ((this.currentIndoor ?? null) !== npcIndoor) continue;
      const dx = runtime.npc.position.x - playerPosition.x;
      const dz = runtime.npc.position.z - playerPosition.z;
      const distSq = dx * dx + dz * dz;
      if (distSq < bestDist) {
        bestDist = distSq;
        best = runtime.npc;
      }
    }
    return best;
  }

  private currentIndoor: string | null = null;

  setCurrentIndoor(buildingId: string | null): void {
    this.currentIndoor = buildingId;
  }

  setTalking(npc: Npc | null): void {
    for (const runtime of this.runtimes.values()) {
      runtime.npc.talking = runtime.npc === npc;
    }
  }

  /** NPC 当前活动描述（对话/观察用）。 */
  activityOf(npcId: string): string {
    const runtime = this.runtimes.get(npcId);
    if (!runtime) return '';
    const schedule = this.schedules.get(npcId) ?? [];
    const slot = schedule.find((s) => this.currentHour >= s.from && this.currentHour < s.to);
    return slot?.activity ?? '休息';
  }

  private currentHour = 8;

  setCurrentHour(hour: number): void {
    this.currentHour = hour;
  }

  dispose(): void {
    for (const npc of this.npcs) npc.dispose();
  }
}
