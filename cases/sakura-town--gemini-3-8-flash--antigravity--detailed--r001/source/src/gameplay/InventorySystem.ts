// src/gameplay/InventorySystem.ts
// Inventory, economy (Yen currency), and consumable items system.
import { Item } from '../types';
import { audio } from '../engine/AudioSynthesizer';

export class InventorySystem {
  public money: number = 1500; // Start with 1,500 Yen
  public items: Map<string, { item: Item; count: number }> = new Map();

  public static catalog: Record<string, Item> = {
    sakura_soda: {
      id: 'sakura_soda',
      name: 'Sakura Soda',
      jpName: '桜ソーダ',
      description: 'Refreshing sparkling soda infused with delicate cherry blossom petals.',
      price: 130,
      icon: '🌸',
      category: 'drink',
      staminaRestore: 30,
      isConsumable: true
    },
    green_tea: {
      id: 'green_tea',
      name: 'Iced Green Tea',
      jpName: '冷たい緑茶',
      description: 'Traditional Japanese brewed green tea from Shizuoka.',
      price: 130,
      icon: '🍵',
      category: 'drink',
      staminaRestore: 25,
      isConsumable: true
    },
    boss_coffee: {
      id: 'boss_coffee',
      name: 'Boss Rainbow Coffee',
      jpName: 'ボス レインボーマウンテン',
      description: 'Classic canned Japanese roast coffee. A commuter’s best friend.',
      price: 130,
      icon: '☕',
      category: 'drink',
      staminaRestore: 35,
      isConsumable: true
    },
    onigiri: {
      id: 'onigiri',
      name: 'Salmon Onigiri',
      jpName: '鮭おにぎり',
      description: 'Handmade triangular rice ball wrapped in crisp nori seaweed.',
      price: 150,
      icon: '🍙',
      category: 'food',
      staminaRestore: 50,
      isConsumable: true
    },
    sakura_mochi: {
      id: 'sakura_mochi',
      name: 'Sakura Mochi',
      jpName: '桜餅',
      description: 'Sweet pink rice cake wrapped in a salted cherry leaf. Seasonal delicacy.',
      price: 220,
      icon: '🍡',
      category: 'food',
      staminaRestore: 45,
      isConsumable: true
    },
    cat_treat: {
      id: 'cat_treat',
      name: 'Dried Bonito Flakes',
      jpName: 'かつおぶし',
      description: 'Savory dried fish flakes. Mikan the calico cat goes crazy for these!',
      price: 180,
      icon: '🐟',
      category: 'tool',
      isConsumable: false
    },
    lost_bell: {
      id: 'lost_bell',
      name: 'Antique Brass Cat Bell',
      jpName: '真鍮の鈴',
      description: 'A polished brass bell found on the riverbank. Belongs to Mikan.',
      price: 0,
      icon: '🔔',
      category: 'quest',
      isConsumable: false
    }
  };

  constructor() {
    // Starting items
    this.addItem(InventorySystem.catalog.sakura_soda, 1);
    this.addItem(InventorySystem.catalog.onigiri, 1);
  }

  public addItem(item: Item, count: number = 1): void {
    if (this.items.has(item.id)) {
      this.items.get(item.id)!.count += count;
    } else {
      this.items.set(item.id, { item, count });
    }
  }

  public removeItem(itemId: string, count: number = 1): boolean {
    if (!this.items.has(itemId)) return false;
    const entry = this.items.get(itemId)!;
    if (entry.count < count) return false;
    entry.count -= count;
    if (entry.count <= 0) {
      this.items.delete(itemId);
    }
    return true;
  }

  public hasItem(itemId: string, count: number = 1): boolean {
    if (!this.items.has(itemId)) return false;
    return this.items.get(itemId)!.count >= count;
  }

  public consumeItem(itemId: string): { success: boolean; message: string } {
    if (!this.hasItem(itemId)) return { success: false, message: 'Item not in bag.' };
    const entry = this.items.get(itemId)!;
    if (!entry.item.isConsumable) return { success: false, message: 'This item cannot be consumed.' };

    this.removeItem(itemId, 1);
    audio.playDrinkCan();
    return {
      success: true,
      message: `You consumed ${entry.item.name} (${entry.item.jpName}). Stamina restored by +${entry.item.staminaRestore || 20}!`
    };
  }

  public earnMoney(amount: number): void {
    this.money += amount;
    audio.playChimeNote(1400, 0.15, 0.15);
  }

  public spendMoney(amount: number): boolean {
    if (this.money < amount) return false;
    this.money -= amount;
    return true;
  }
}
