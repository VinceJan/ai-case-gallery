// src/gameplay/SaveManager.ts
// LocalStorage persistence for player status, money, quests, inventory, and settings.
import { SaveData, WeatherType } from '../types';
import { PlayerController } from './PlayerController';
import { InventorySystem } from './InventorySystem';
import { QuestManager } from './QuestManager';
import { NPCManager } from '../characters/NPCSystem';
import { LightingSky } from '../world/LightingSky';
import { WeatherSystem } from '../world/Weather';

export class SaveManager {
  private static STORAGE_KEY = 'sakura_town_save_v1';

  public static saveGame(
    player: PlayerController,
    inventory: InventorySystem,
    quests: QuestManager,
    npcs: NPCManager,
    lighting: LightingSky,
    weather: WeatherSystem
  ): boolean {
    try {
      const completed: string[] = [];
      const active: { id: string; step: number }[] = [];
      quests.quests.forEach((q) => {
        if (q.isCompleted) completed.push(q.id);
        else active.push({ id: q.id, step: q.currentStep });
      });

      const invArray: { itemId: string; count: number }[] = [];
      inventory.items.forEach((entry, id) => {
        invArray.push({ itemId: id, count: entry.count });
      });

      const friendships: Record<string, number> = {};
      npcs.npcs.forEach((npc, id) => {
        friendships[id] = npc.personality.friendship;
      });

      const data: SaveData = {
        version: 1,
        playerPos: { x: player.position.x, y: player.position.y, z: player.position.z },
        playerYaw: player.rotationY,
        playerMoney: inventory.money,
        inventory: invArray,
        completedQuests: completed,
        activeQuests: active,
        friendships,
        gameTimeMinutes: lighting.getTime().totalMinutes,
        weather: weather.currentWeather,
        unlockedPhotos: [],
        isRidingBicycle: player.isRidingBicycle
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('Save game failed:', e);
      return false;
    }
  }

  public static loadGame(): SaveData | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as SaveData;
    } catch {
      return null;
    }
  }
}
