import type { Quest, TownSaveData, WeatherKind } from './types';
import { ITEM_MAP, NPCS } from '../world/layout';

const SAVE_KEY = 'sakura-town-save-v1';

/** 玩家可持久化的小镇状态：金钱、物品、好感、委托。 */
export class TownState {
  money = 800;
  inventory: Record<string, number> = { i_onigiri: 1 };
  relationships: Record<string, number> = {};
  talkedToday: Record<string, number> = {};
  quests: Quest[] = [];
  flags: Record<string, boolean> = {};
  /** 本游戏日已完成委托数（影响每日委托上限）。 */
  questsDoneToday = 0;

  constructor() {
    for (const npc of NPCS) this.relationships[npc.id] = 0;
  }

  reset(): void {
    this.money = 800;
    this.inventory = { i_onigiri: 1 };
    for (const npc of NPCS) this.relationships[npc.id] = 0;
    this.talkedToday = {};
    this.quests = [];
    this.flags = {};
    this.questsDoneToday = 0;
  }

  addItem(itemId: string, count = 1): void {
    this.inventory[itemId] = (this.inventory[itemId] ?? 0) + count;
  }

  removeItem(itemId: string, count = 1): boolean {
    const have = this.inventory[itemId] ?? 0;
    if (have < count) return false;
    this.inventory[itemId] = have - count;
    if (this.inventory[itemId] <= 0) delete this.inventory[itemId];
    return true;
  }

  countItem(itemId: string): number {
    return this.inventory[itemId] ?? 0;
  }

  spendMoney(amount: number): boolean {
    if (this.money < amount) return false;
    this.money -= amount;
    return true;
  }

  relationship(npcId: string): number {
    return this.relationships[npcId] ?? 0;
  }

  addRelationship(npcId: string, amount: number): number {
    const next = Math.max(0, Math.min(100, (this.relationships[npcId] ?? 0) + amount));
    this.relationships[npcId] = next;
    return next;
  }

  activeQuests(): Quest[] {
    return this.quests.filter((q) => q.status === 'active' || q.status === 'ready');
  }

  questById(id: string): Quest | undefined {
    return this.quests.find((q) => q.id === id);
  }

  addQuest(quest: Quest): void {
    this.quests.push(quest);
  }

  toSaveData(day: number, minutes: number, weather: WeatherKind, playerPos: { x: number; z: number }, rngState: number): TownSaveData {
    return {
      version: 1,
      day,
      minutes,
      weather,
      money: this.money,
      inventory: { ...this.inventory },
      relationships: { ...this.relationships },
      talkedToday: { ...this.talkedToday },
      quests: this.quests.map((q) => ({ ...q })),
      flags: { ...this.flags },
      playerPos: { ...playerPos },
      rngState,
    };
  }

  save(data: TownSaveData): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {
      // 存储不可用（隐私模式等）时静默跳过。
    }
  }

  static load(): TownSaveData | null {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as TownSaveData;
      if (data.version !== 1) return null;
      return data;
    } catch {
      return null;
    }
  }

  static hasSave(): boolean {
    return TownState.load() !== null;
  }

  static clearSave(): void {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // 忽略
    }
  }

  applySaveData(data: TownSaveData): void {
    this.money = data.money;
    this.inventory = { ...data.inventory };
    this.relationships = { ...data.relationships };
    for (const npc of NPCS) {
      if (this.relationships[npc.id] === undefined) this.relationships[npc.id] = 0;
    }
    this.talkedToday = { ...data.talkedToday };
    this.quests = data.quests.map((q) => ({ ...q }));
    this.flags = { ...data.flags };
    this.questsDoneToday = this.quests.filter((q) => q.status === 'done').length;
  }

  /** 物品描述（图鉴/商店用）。 */
  static itemName(itemId: string): string {
    return ITEM_MAP[itemId]?.name ?? itemId;
  }
}
