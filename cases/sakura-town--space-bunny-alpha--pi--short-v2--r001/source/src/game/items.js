/**
 * 物品与背包。
 */
export const ITEMS = {
  parcel: { name: '包裹', icon: '📦', desc: '山田商店的包裹，寄给田中家。', use: '给田中 花子' },
  letter: { name: '信', icon: '💌', desc: '美咲写的信，麻烦投进邮局。', use: '投进邮局' },
  catfood: { name: '猫粮', icon: '🐟', desc: '小鱼干味的猫粮。猫会很喜欢。', use: '喂给三花' },
  snack: { name: '小鱼干', icon: '🍘', desc: '猫咪的最爱。', use: '喂给三花' },
  onigiri: { name: '饭团', icon: '🍙', desc: '便利店买的，还热着。', use: '吃掉', food: 30 },
  drink: { name: '饮料', icon: '🥤', desc: '冰凉的麦茶。', use: '喝掉', food: 18 },
  ramen: { name: '拉面', icon: '🍜', desc: '一龙味噌拉面。', use: '吃掉', food: 55 },
  coffee: { name: '咖啡', icon: '☕', desc: '星光咖啡的手冲。', use: '喝掉', food: 25 },
  sake: { name: '酒', icon: '🍶', desc: '灯的招牌酒。', use: '喝掉', food: 20 },
  fish: { name: '鱼', icon: '🐟', desc: '刚从河里钓上来的。', use: '送去拉面 一龙' },
  radish: { name: '萝卜', icon: '🥕', desc: '花子家菜园种的。', use: '吃掉', food: 12 },
  petal: { name: '樱花瓣', icon: '🌸', desc: '完整的樱花瓣。', use: '交给结衣' },
  charm: { name: '樱花御守', icon: '🧧', desc: '神社的护身符，据说能带来好运。', use: '贴身带着' },
  ticket: { name: '车票', icon: '🎫', desc: '去往下一站的单程票。', use: '收进收藏' },
  postcard: { name: '明信片', icon: '🏞', desc: '印着樱花镇风景的明信片。', use: '收进收藏' },
};

/** 哪些物品是「任务道具」（不会被误吃/误用掉） */
export const QUEST_ITEMS = new Set(['parcel', 'letter', 'catfood', 'snack', 'fish', 'petal', 'radish']);

export function itemName(id) {
  return ITEMS[id]?.name || id;
}
export function itemIcon(id) {
  return ITEMS[id]?.icon || '❔';
}

export class Inventory {
  constructor(state) {
    this.state = state;
    if (!state.bag) state.bag = {};
  }

  add(id, n = 1) {
    this.state.bag[id] = (this.state.bag[id] || 0) + n;
    return this.state.bag[id];
  }

  remove(id, n = 1) {
    if (!this.state.bag[id]) return false;
    this.state.bag[id] -= n;
    if (this.state.bag[id] <= 0) delete this.state.bag[id];
    return true;
  }

  has(id, n = 1) {
    return (this.state.bag[id] || 0) >= n;
  }

  count(id) {
    return this.state.bag[id] || 0;
  }

  get held() {
    return this.state.held;
  }

  hold(id) {
    if (id && !this.has(id)) return false;
    this.state.held = this.state.held === id ? null : id;
    return true;
  }

  clearHeld() {
    this.state.held = null;
  }

  list() {
    return Object.keys(this.state.bag)
      .filter((id) => this.state.bag[id] > 0)
      .map((id) => ({ id, count: this.state.bag[id], ...(ITEMS[id] || { name: id, icon: '❔' }) }));
  }
}
