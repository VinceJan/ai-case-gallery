/**
 * localStorage persistence for player money, inventory, relationships, flags, day.
 */
import type { PlayerState, InventoryItem, Relationship, QuestState } from '../data/types';

const KEY = 'sakura-town-save-v1';

export type SaveBlob = {
  money: number;
  inventory: InventoryItem[];
  relationships: Relationship[];
  quests: QuestState[];
  flags: Record<string, boolean | number>;
  visitedBuildings: string[];
  day: number;
  hour: number;
  minute: number;
};

export function saveGame(state: PlayerState, hour: number, minute: number): void {
  try {
    const blob: SaveBlob = {
      money: state.money,
      inventory: state.inventory,
      relationships: state.relationships,
      quests: state.quests,
      flags: state.flags,
      visitedBuildings: state.visitedBuildings,
      day: state.day,
      hour,
      minute,
    };
    localStorage.setItem(KEY, JSON.stringify(blob));
  } catch {
    // storage full / private mode
  }
}

export function loadGame(): SaveBlob | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SaveBlob;
  } catch {
    return null;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function defaultPlayerState(): PlayerState {
  return {
    money: 1500,
    inventory: [{ id: 'onigiri', name: 'おにぎり', kind: 'food', price: 130, icon: '🍙' }],
    relationships: [],
    quests: [],
    flags: {},
    visitedBuildings: [],
    day: 1,
  };
}
