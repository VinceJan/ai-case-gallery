// src/gameplay/SaveManager.ts
// LocalStorage state persistence for player progression, inventory, and town state.
import * as THREE from 'three';
import { WeatherType } from '../types';

export interface TownSaveData {
  playerPos: { x: number; y: number; z: number };
  hour: number;
  weather: WeatherType;
  inventory: Array<{ id: string; count: number }>;
  quests: Array<{ id: string; stage: number; completed: boolean; active: boolean }>;
}

export class SaveManager {
  private static KEY = 'sakura_town_save_v1';

  public static save(data: TownSaveData): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('player_notification', { detail: '💾 Game Progress Auto-Saved' }));
    } catch {
      console.warn('LocalStorage save failed');
    }
  }

  public static load(): TownSaveData | null {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      console.warn('LocalStorage load failed');
    }
    return null;
  }
}
