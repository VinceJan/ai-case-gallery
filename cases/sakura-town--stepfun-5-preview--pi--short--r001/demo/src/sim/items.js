// 物品定义（纯数据）
// kind: food 食物 / drink 饮品 / gift 礼物 / tool 工具 / material 材料 / souvenir 特产 / quest 任务
export const ITEMS = {
  onigiri:   { name: '饭团',       icon: '🍙', kind: 'food',   price: 120, sell: 40,  stamina: 18, desc: '海苔包着的米饭团，经典口味。' },
  melonpan:  { name: '蜜瓜包',     icon: '🍞', kind: 'food',   price: 150, sell: 50,  stamina: 22, desc: '酥皮面包， Cookies 口感。' },
  bento:     { name: '幕之内便当', icon: '🍱', kind: 'food',   price: 480, sell: 160, stamina: 55, desc: '车站便当，满满的和风菜肴。' },
  taiyaki:   { name: '鲷鱼烧',     icon: '🐟', kind: 'food',   price: 180, sell: 60,  stamina: 24, desc: '红豆馅的脆皮点心。' },
  dango:     { name: '三色团子',   icon: '🍡', kind: 'food',   price: 200, sell: 70,  stamina: 20, desc: '祭典必备的糯米团子。' },
  coffee:    { name: '热咖啡',     icon: '☕', kind: 'drink',  price: 320, sell: 100, stamina: 15, mood: 5, desc: '木漏日咖啡的招牌 blended。' },
  tea:       { name: '煎茶',       icon: '🍵', kind: 'drink',  price: 160, sell: 50,  stamina: 10, desc: '微苦的日本茶，静心。' },
  soda:      { name: '弹珠汽水',   icon: '🥤', kind: 'drink',  price: 140, sell: 45,  stamina: 12, desc: '叮叮当当的夏季汽水。' },
  beer:      { name: '本地啤酒',   icon: '🍺', kind: 'drink',  price: 400, sell: 120, stamina: 8,  desc: '晚霞居酒屋的本地酿造。' },
  bouquet:   { name: '花束',       icon: '💐', kind: 'gift',   price: 680, sell: 200, gift: 12, desc: '晚春的樱花与桔梗花束。', fav: ['kin', 'sakura', 'shizuka', 'sanae', 'azusa'] },
  charm:     { name: '樱花御守',   icon: '🧿', kind: 'gift',   price: 500, sell: 150, gift: 10, desc: '神社求来的护身符。', fav: ['takeshi', 'yuki', 'akira', 'shizuka', 'kin'] },
  postcard:  { name: '风景明信片', icon: '📇', kind: 'gift',   price: 120, sell: 40,  gift: 6,  desc: '印着樱花大桥的明信片。', fav: ['yuki', 'azusa', 'ken'] },
  figurine:  { name: '招财猫',     icon: '🐱', kind: 'gift',   price: 800, sell: 250, gift: 11, desc: '陶瓷招财猫，很受欢迎。', fav: ['taeko', 'daisuke', 'sakura', 'hajime'] },
  camera:    { name: '复古相机',   icon: '📷', kind: 'tool',   price: 0,   sell: 0,   desc: '可以拍下小镇风景（按 P）。' },
  umbrella:  { name: '折叠伞',     icon: '☂️', kind: 'tool',   price: 900, sell: 300, desc: '下雨时自动撑开。' },
  catfood:   { name: '猫粮',       icon: '🥫', kind: 'tool',   price: 200, sell: 60,  desc: '流浪猫会喜欢这个。' },
  petal:     { name: '樱花花瓣',   icon: '🌸', kind: 'material', price: 30, sell: 10, desc: '还带着香气的花瓣。' },
  wallet:    { name: '钱包',       icon: '👛', kind: 'quest',  price: 0,   sell: 0,   desc: '别人丢失的钱包，里面有钱包主人的名片。' },
  ticket:    { name: '电车票',     icon: '🎫', kind: 'tool',   price: 240, sell: 0,   desc: '前往城市的单程票。' },
  souvenir_city: { name: '城市特产', icon: '🎁', kind: 'souvenir', price: 600, sell: 380, gift: 8, desc: '从城市带回来的伴手礼。' },
  souvenir_sweets: { name: '和果子礼盒', icon: '🍬', kind: 'souvenir', price: 720, sell: 420, gift: 12, desc: '老字号点心的礼盒。', fav: ['kin', 'sakura', 'shizuka'] },
  souvenir_craft: { name: '手作木雕', icon: '🪵', kind: 'souvenir', price: 540, sell: 300, gift: 9, desc: '木匠手工雕刻的小摆件。' },
  taiyaki_stuff: { name: '鲷烧抱枕', icon: '🐡', kind: 'souvenir', price: 0, sell: 500, gift: 10, desc: '奇妙的鲷鱼烧形状抱枕。' },
  ringtoss_prize: { name: '祭典奖品', icon: '🏆', kind: 'gift', price: 0, sell: 200, gift: 8, desc: '祭典套圈赢来的小奖杯。' },
  veggies:   { name: '新鲜蔬菜',   icon: '🥬', kind: 'food',   price: 220, sell: 90,  stamina: 14, desc: '铃木农场今早摘的蔬菜。' },
};

// 商店库存模板
export const SHOP_DEFS = {
  shop_konbini: {
    name: '海鸥便利店', keeper: 'ken',
    stock: [
      { id: 'onigiri', n: 8 }, { id: 'melonpan', n: 6 }, { id: 'bento', n: 4 },
      { id: 'coffee', n: 6 }, { id: 'soda', n: 8 }, { id: 'tea', n: 5 },
      { id: 'postcard', n: 5 }, { id: 'ticket', n: 9 }, { id: 'catfood', n: 4 },
    ],
    buyKinds: ['food', 'drink', 'material', 'souvenir'],
  },
  shop_bakery: {
    name: '小麦之路面包房', keeper: 'taeko',
    stock: [
      { id: 'melonpan', n: 8 }, { id: 'taiyaki', n: 6 }, { id: 'bento', n: 3 }, { id: 'coffee', n: 5 },
    ],
    buyKinds: ['food', 'souvenir'],
  },
  shop_cafe: {
    name: '木漏日咖啡', keeper: 'ren',
    stock: [
      { id: 'coffee', n: 10 }, { id: 'tea', n: 6 }, { id: 'melonpan', n: 5 }, { id: 'taiyaki', n: 4 },
    ],
    buyKinds: ['drink', 'food'],
  },
  shop_books: {
    name: '纸间书店', keeper: 'azusa',
    stock: [
      { id: 'postcard', n: 10 }, { id: 'charm', n: 3 }, { id: 'figurine', n: 2 },
    ],
    buyKinds: ['gift', 'material'],
  },
  shop_general: {
    name: '千岁屋杂货铺', keeper: 'hajime',
    stock: [
      { id: 'catfood', n: 6 }, { id: 'umbrella', n: 3 }, { id: 'charm', n: 5 },
      { id: 'figurine', n: 3 }, { id: 'bouquet', n: 4 }, { id: 'souvenir_craft', n: 2 },
    ],
    buyKinds: ['gift', 'tool', 'material', 'souvenir'],
  },
  shop_izakaya: {
    name: '晚霞居酒屋', keeper: 'tetsuo',
    stock: [
      { id: 'beer', n: 10 }, { id: 'bento', n: 5 }, { id: 'dango', n: 6 }, { id: 'soda', n: 6 },
    ],
    buyKinds: ['food', 'drink', 'souvenir'],
  },
};

export class Shop {
  constructor(buildingId) {
    const def = SHOP_DEFS[buildingId];
    this.buildingId = buildingId;
    this.name = def.name;
    this.keeper = def.keeper;
    this.buyKinds = def.buyKinds;
    this.coin = 20000 + Math.floor(Math.random() * 8000);
    this.stock = def.stock.map((s) => ({ id: s.id, n: s.n, base: ITEMS[s.id].price }));
  }
  priceOf(itemId) {
    const it = ITEMS[itemId];
    const s = this.stock.find((x) => x.id === itemId);
    // 存货少时略涨价
    if (!s) return it.price;
    return Math.round(it.price * (1 + Math.max(0, (3 - s.n)) * 0.06));
  }
  sellPriceOf(itemId) {
    return ITEMS[itemId]?.sell ?? 0;
  }
  canBuy(itemId) {
    const s = this.stock.find((x) => x.id === itemId);
    return !!s && s.n > 0;
  }
  buy(itemId) {
    const s = this.stock.find((x) => x.id === itemId);
    if (!s || s.n <= 0) return null;
    s.n -= 1;
    this.coin -= this.priceOf(itemId);
    return this.priceOf(itemId);
  }
  sell(itemId) {
    const kind = ITEMS[itemId]?.kind;
    if (!this.buyKinds.includes(kind)) return null;
    this.coin += this.sellPriceOf(itemId);
    return this.sellPriceOf(itemId);
  }
  restock() {
    for (const s of this.stock) {
      s.n = Math.min(s.n + 3, Math.ceil(s.base / 60) + 4);
    }
  }
  serialize() { return { coin: this.coin, stock: this.stock.map((s) => ({ id: s.id, n: s.n })) }; }
  load(d) { this.coin = d.coin; for (const s of d.stock) { const t = this.stock.find((x) => x.id === s.id); if (t) t.n = s.n; } }
}
