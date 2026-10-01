import type { TownState } from '../game/TownState';
import { ITEM_MAP, SHOPS } from '../world/layout';
import type { Rng } from '../utils/random';

export interface TradeResult {
  ok: boolean;
  message: string;
}

/** 商店库存与买卖。 */
export class EconomySystem {
  /** shopId -> itemId -> 剩余数量。 */
  private stocks: Record<string, Record<string, number>> = {};
  private baseStock: Record<string, Record<string, number>> = {};

  constructor() {
    for (const shop of SHOPS) {
      this.stocks[shop.id] = {};
      this.baseStock[shop.id] = {};
      for (const entry of shop.stock) {
        this.stocks[shop.id][entry.itemId] = entry.qty;
        this.baseStock[shop.id][entry.itemId] = entry.qty;
      }
    }
  }

  /** 新的一天补货（带少量随机波动）。 */
  refreshDay(rng: Rng): void {
    for (const shop of SHOPS) {
      for (const entry of shop.stock) {
        const variance = rng.int(3);
        this.stocks[shop.id][entry.itemId] = Math.max(1, entry.qty - variance);
      }
    }
  }

  stockOf(shopId: string, itemId: string): number {
    return this.stocks[shopId]?.[itemId] ?? 0;
  }

  priceOf(itemId: string): number {
    return ITEM_MAP[itemId]?.price ?? 0;
  }

  buy(shopId: string, itemId: string, state: TownState): TradeResult {
    const item = ITEM_MAP[itemId];
    if (!item) return { ok: false, message: '没有这件商品。' };
    const stock = this.stockOf(shopId, itemId);
    if (stock <= 0) return { ok: false, message: `${item.name}今天卖完了。` };
    if (!state.spendMoney(item.price)) return { ok: false, message: '钱不够……' };
    this.stocks[shopId][itemId] = stock - 1;
    state.addItem(itemId, 1);
    return { ok: true, message: `买下了${item.name}。` };
  }

  sell(_shopId: string, itemId: string, state: TownState): TradeResult {
    const item = ITEM_MAP[itemId];
    if (!item) return { ok: false, message: '这家店不收这个。' };
    if (state.countItem(itemId) <= 0) return { ok: false, message: '你没有这件物品。' };
    const price = Math.floor(item.price * 0.5);
    state.removeItem(itemId, 1);
    state.money += price;
    return { ok: true, message: `${item.name}卖了${price}元。` };
  }

  shopItems(shopId: string): { itemId: string; stock: number; price: number }[] {
    const stock = this.stocks[shopId] ?? {};
    return Object.keys(stock).map((itemId) => ({
      itemId,
      stock: stock[itemId],
      price: this.priceOf(itemId),
    }));
  }
}
