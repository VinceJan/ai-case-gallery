// src/gameplay/QuestManager.ts
// Organic questlines and narrative storytelling for Sakura Town.
import { Quest } from '../types';
import { InventorySystem } from './InventorySystem';
import { audio } from '../engine/AudioSynthesizer';

export class QuestManager {
  public quests: Map<string, Quest> = new Map();
  private inventory: InventorySystem;

  constructor(inventory: InventorySystem) {
    this.inventory = inventory;
    this.initQuests();
  }

  private initQuests(): void {
    // Quest 1: The Lost Bell of Mikan
    this.quests.set('mikan_bell', {
      id: 'mikan_bell',
      title: 'The Lost Bell of Mikan',
      jpTitle: '迷子の真鍮鈴',
      giver: 'Sato-san',
      description: 'Sato-san mentioned that Mikan lost her brass bell near the river bridge. Look around the canal banks.',
      rewardText: 'Shrine Omamori Lucky Charm',
      stage: 0,
      maxStages: 2,
      completed: false,
      active: true,
      requiredItem: 'cat_bell',
      targetNPC: 'sato'
    });

    // Quest 2: Hot Coffee Delivery
    this.quests.set('coffee_delivery', {
      id: 'coffee_delivery',
      title: 'Warm Brew Delivery',
      jpTitle: '木漏れ日の出前',
      giver: 'Kenji',
      description: 'Kenji at Cafe Komorebi brewed a special pour-over coffee for Station Master Takahashi.',
      rewardText: 'Fresh Sakura Mochi x3 + ¥500',
      stage: 0,
      maxStages: 2,
      completed: false,
      active: false,
      requiredItem: 'pour_over',
      targetNPC: 'takahashi'
    });

    // Quest 3: The Secret Wish
    this.quests.set('aoi_sketchbook', {
      id: 'aoi_sketchbook',
      title: 'The Lost Sketchbook',
      jpTitle: '失くしたスケッチブック',
      giver: 'Aoi',
      description: 'Aoi dropped her sketchbook near the blooming cherry blossom grove along the river.',
      rewardText: 'Handmade Bookmark & Friendship Boost',
      stage: 0,
      maxStages: 2,
      completed: false,
      active: false,
      requiredItem: 'sketchbook',
      targetNPC: 'aoi'
    });

    // Quest 4: Sakura Snapshot Album
    this.quests.set('town_photography', {
      id: 'town_photography',
      title: 'Sakura Snapshot Record',
      jpTitle: '桜町の記憶写真集',
      giver: 'Self',
      description: 'Photograph 4 iconic sights: The Shrine Torii, Railway Crossing, Train on River Bridge, and Mikan.',
      rewardText: 'Master Photographer Title',
      stage: 0,
      maxStages: 4,
      completed: false,
      active: true
    });
  }

  public advanceQuest(id: string): void {
    const q = this.quests.get(id);
    if (!q || q.completed) return;

    q.stage++;
    if (q.stage >= q.maxStages) {
      q.completed = true;
      audio.playUIConfirm();
      window.dispatchEvent(
        new CustomEvent('player_notification', {
          detail: `🌸 Quest Complete: ${q.jpTitle} (${q.title})! Reward: ${q.rewardText}`
        })
      );
    }
    this.dispatchUpdate();
  }

  private dispatchUpdate(): void {
    window.dispatchEvent(
      new CustomEvent('quests_updated', {
        detail: Array.from(this.quests.values())
      })
    );
  }
}
