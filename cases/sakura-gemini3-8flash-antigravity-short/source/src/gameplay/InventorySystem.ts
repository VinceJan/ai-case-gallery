// src/gameplay/InventorySystem.ts
// Manages player items, food consumption, quest keys, and inventory events.
import { InventoryItem } from '../types';
import { audio } from '../engine/AudioSynthesizer';

export class InventorySystem {
  public items: Map<string, InventoryItem> = new Map();

  constructor() {
    this.initDefaultItems();
  }

  private initDefaultItems(): void {
    this.addItem({
      id: 'train_pass',
      name: 'Commuter Train Pass',
      jpName: 'さくら町定期券',
      description: 'An unlimited commuter rail pass for the scenic Sakura loop.',
      category: 'quest',
      icon: '🎫',
      count: 1,
      isUsable: false
    });

    this.addItem({
      id: 'camera',
      name: 'Retro 35mm Camera',
      jpName: 'レトロカメラ',
      description: 'Used to photograph lovely moments and landmarks across town.',
      category: 'tool',
      icon: '📷',
      count: 1,
      isUsable: true
    });

    this.addItem({
      id: 'sakura_mochi',
      name: 'Sakura Mochi',
      jpName: '桜餅',
      description: 'Sweet pink rice cake wrapped in a salted cherry blossom leaf.',
      category: 'food',
      icon: '🌸',
      count: 2,
      isUsable: true
    });
  }

  public addItem(item: InventoryItem): void {
    if (this.items.has(item.id)) {
      this.items.get(item.id)!.count += item.count;
    } else {
      this.items.set(item.id, { ...item });
    }
    this.dispatchUpdate();
  }

  public removeItem(id: string, count: number = 1): boolean {
    if (!this.items.has(id)) return false;
    const item = this.items.get(id)!;
    if (item.count >= count) {
      item.count -= count;
      if (item.count <= 0) {
        this.items.delete(id);
      }
      this.dispatchUpdate();
      return true;
    }
    return false;
  }

  public hasItem(id: string, count: number = 1): boolean {
    return (this.items.get(id)?.count ?? 0) >= count;
  }

  public useItem(id: string): boolean {
    const item = this.items.get(id);
    if (!item || !item.isUsable) return false;

    if (item.category === 'food' || item.category === 'drink') {
      audio.playUIConfirm();
      this.removeItem(id, 1);
      window.dispatchEvent(
        new CustomEvent('player_notification', {
          detail: `Tasted delicious ${item.jpName} (${item.name})! Refreshed!`
        })
      );
      return true;
    }

    if (id === 'camera') {
      window.dispatchEvent(new CustomEvent('toggle_photo_mode'));
      return true;
    }

    return false;
  }

  private dispatchUpdate(): void {
    window.dispatchEvent(
      new CustomEvent('inventory_updated', {
        detail: Array.from(this.items.values())
      })
    );
  }
}
