/**
 * Interaction: doors, lights, vending, benches, shops, bicycles, posters, shrine.
 * Player actions leave persistent traces via GameState flags.
 */
import type { InteractableDef, InteractResult, InventoryItem, PlayerState, BuildingDef, TimeOfDay, Weather } from '../data/types';

export type InteractionContext = {
  player: PlayerState;
  time: TimeOfDay;
  weather: Weather;
  isOpen: (buildingId: string) => boolean;
  flag: (k: string) => boolean | number | undefined;
  setFlag: (k: string, v: boolean | number) => void;
  addMoney: (n: number) => void;
  addItem: (item: InventoryItem) => void;
  hasItem: (id: string) => boolean;
  removeItem: (id: string) => boolean;
};

const DRINKS: InventoryItem[] = [
  { id: 'coffee', name: 'コーヒー', kind: 'drink', price: 130, icon: '☕' },
  { id: 'tea', name: 'お茶', kind: 'drink', price: 100, icon: '🍵' },
  { id: 'juice', name: 'オレンジジュース', kind: 'drink', price: 140, icon: '🧃' },
  { id: 'water', name: '水', kind: 'drink', price: 80, icon: '💧' },
  { id: 'soda', name: 'サイダー', kind: 'drink', price: 120, icon: '🥤' },
];

const SHOP_ITEMS: Record<string, InventoryItem[]> = {
  bakery: [
    { id: 'bread', name: 'あんぱん', kind: 'food', price: 180, icon: '🍞' },
    { id: 'melonpan', name: 'メロンパン', kind: 'food', price: 160, icon: '🍈' },
    { id: 'currypan', name: 'カレーパン', kind: 'food', price: 200, icon: '🥖' },
    { id: 'sandwich', name: 'サンドイッチ', kind: 'food', price: 280, icon: '🥪' },
  ],
  konbini: [
    { id: 'onigiri', name: 'おにぎり', kind: 'food', price: 130, icon: '🍙' },
    { id: 'nikuman', name: '肉まん', kind: 'food', price: 160, icon: '🥟' },
    { id: 'bento', name: '弁当', kind: 'food', price: 450, icon: '🍱' },
    { id: 'magazine', name: '雑誌', kind: 'tool', price: 400, icon: '📖' },
    { id: 'umbrella', name: '傘', kind: 'tool', price: 600, icon: '☂️' },
  ],
  bookstore: [
    { id: 'novel', name: '文庫本', kind: 'tool', price: 520, icon: '📚' },
    { id: 'map', name: '町の地図', kind: 'tool', price: 300, icon: '🗺️' },
    { id: 'postcard', name: '絵はがき', kind: 'gift', price: 80, icon: '📮' },
  ],
  cafe: [
    { id: 'cake', name: 'チーズケーキ', kind: 'food', price: 420, icon: '🍰' },
    { id: 'coffee', name: 'ブレンド', kind: 'drink', price: 380, icon: '☕' },
    { id: 'sandwich_set', name: 'サンド定食', kind: 'food', price: 680, icon: '🍽️' },
  ],
  pharmacy: [
    { id: 'bandaid', name: '絆創膏', kind: 'tool', price: 200, icon: '🩹' },
    { id: 'vitamin', name: 'ビタミン', kind: 'tool', price: 800, icon: '💊' },
  ],
  hardware: [
    { id: 'battery', name: '電池', kind: 'tool', price: 350, icon: '🔋' },
    { id: 'tape', name: 'テープ', kind: 'tool', price: 180, icon: '📎' },
  ],
  florist: [
    { id: 'flower', name: '花束', kind: 'gift', price: 900, icon: '💐' },
    { id: 'pot', name: '小さな鉢植え', kind: 'gift', price: 650, icon: '🪴' },
  ],
};

export function createItem(id: string, name: string, kind: InventoryItem['kind'], price: number, icon: string): InventoryItem {
  return { id, name, kind, price, icon };
}

export function handleInteract(def: InteractableDef, ctx: InteractionContext): InteractResult {
  switch (def.kind) {
    case 'vending': {
      const key = `vending_used_${def.id}`;
      const drink = DRINKS[Math.floor(Math.random() * DRINKS.length)];
      if (ctx.player.money < drink.price) {
        return { ok: false, message: 'お金が足りない…' };
      }
      ctx.addMoney(-drink.price);
      ctx.addItem({ ...drink });
      ctx.setFlag(key, (Number(ctx.flag(key)) || 0) + 1);
      return {
        ok: true,
        message: `${drink.name}を買った（-¥${drink.price}）`,
        moneyDelta: -drink.price,
        item: drink,
      };
    }
    case 'bench': {
      const key = `sat_${def.id}`;
      ctx.setFlag(key, true);
      return { ok: true, message: 'ベンチに座った。休憩していると気持ちが落ち着く。' };
    }
    case 'door': {
      const bid = def.buildingId ?? 'unknown';
      const open = ctx.isOpen(bid);
      const key = `door_${bid}`;
      ctx.setFlag(key, !ctx.flag(key));
      if (!open) {
        return { ok: false, message: `${def.label}は閉まっている。` };
      }
      if (!ctx.player.visitedBuildings.includes(bid)) {
        ctx.player.visitedBuildings.push(bid);
      }
      return { ok: true, message: `${def.label}に入った。` };
    }
    case 'shopCounter': {
      const bid = def.buildingId ?? '';
      if (!ctx.isOpen(bid)) {
        return { ok: false, message: 'お店は閉まっている。' };
      }
      const items = SHOP_ITEMS[bid] ?? SHOP_ITEMS.konbini;
      // buy cheapest unowned or random
      const buyable = items.filter((i) => ctx.player.money >= i.price);
      if (!buyable.length) return { ok: false, message: '買えるものがなさそうだ。' };
      const item = buyable[Math.floor(Math.random() * buyable.length)];
      ctx.addMoney(-item.price);
      ctx.addItem({ ...item });
      return {
        ok: true,
        message: `${item.name}を買った（-¥${item.price}）`,
        moneyDelta: -item.price,
        item,
        affinityDelta: 2,
      };
    }
    case 'bicycle': {
      const key = `bike_${def.id}`;
      ctx.setFlag(key, true);
      return {
        ok: true,
        message: '自転車に乗った。移動が少し速くなる。（降りる：もう一度 E）',
      };
    }
    case 'trash': {
      if (ctx.hasItem('trash')) {
        ctx.removeItem('trash');
        ctx.setFlag('cleaned_trash', (Number(ctx.flag('cleaned_trash')) || 0) + 1);
        return { ok: true, message: 'ゴミを捨てた。町が少しきれいになった。', affinityDelta: 3 };
      }
      return { ok: false, message: '捨てるものを持っていない。' };
    }
    case 'poster':
    case 'book':
    case 'note': {
      const msgs = [
        '掲示板：夏祭りは駅前広場で18時から。屋台が出るらしい。',
        '掲示板：落とし物（黒いかばん）心当たりのある方は交番まで。',
        '掲示板：水曜日はごみの日。資源ごみは第1・第3週。',
        '掲示板：駅前工事のため、3番線は来月末まで使用停止。',
        'この町は桜町。人口約3,200人。駅から学校まで徒歩12分。',
      ];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      ctx.setFlag(`read_${def.id}`, true);
      return { ok: true, message: msg };
    }
    case 'mailbox': {
      const key = `mail_checked_${def.id}`;
      if (ctx.flag(key)) {
        return { ok: false, message: 'ポストは空だ。' };
      }
      ctx.setFlag(key, true);
      if (Math.random() < 0.4) {
        return {
          ok: true,
          message: '町内会からのお知らせが入っていた。',
          item: createItem('notice', '町内会だより', 'quest', 0, '📄'),
        };
      }
      return { ok: true, message: 'ポストを確認した。今日は何も入っていない。' };
    }
    case 'shrine': {
      ctx.setFlag('prayed_shrine', (Number(ctx.flag('prayed_shrine')) || 0) + 1);
      ctx.player.money += 0; // no change
      return {
        ok: true,
        message: '手を合わせて祈った。心が静かになる。（運気が少しあがった気がする）',
        affinityDelta: 5,
      };
    }
    case 'light': {
      const key = `light_${def.id}`;
      const on = !ctx.flag(key);
      ctx.setFlag(key, on);
      return { ok: true, message: on ? '灯りをつけた。' : '灯りを消した。' };
    }
    case 'chair': {
      return { ok: true, message: '椅子に座った。' };
    }
    case 'crossingButton': {
      return { ok: true, message: '踏切のボタンを押した。' };
    }
    case 'trainDoor': {
      return { ok: true, message: '電車のドア。乗車するにはホームに立とう。' };
    }
    case 'turnstile': {
      return { ok: true, message: '改札を通った。' };
    }
    default:
      return { ok: true, message: def.label };
  }
}

export function getShopStock(buildingId: string): InventoryItem[] {
  return SHOP_ITEMS[buildingId] ?? SHOP_ITEMS.konbini;
}

export function isBuildingOpen(
  building: BuildingDef | undefined,
  time: TimeOfDay,
  weather: Weather,
  flags: Record<string, boolean | number>,
): boolean {
  if (!building) return false;
  if (flags[`event_shopClosed_${building.id}`]) return false;
  if (building.kind === 'shrine' || building.kind === 'school') return time.hour >= 8 && time.hour < 18;
  if (building.kind === 'station') return true;
  const hours = building.shop;
  if (!hours) return time.hour >= 8 && time.hour < 18;
  if (hours.closedWeekdays?.includes(time.day % 7)) return false;
  const h = time.hour + time.minute / 60;
  // rain can close florist
  if (weather === 'rain' && building.id === 'florist' && h > 16) return false;
  return h >= hours.open && h < hours.close;
}
