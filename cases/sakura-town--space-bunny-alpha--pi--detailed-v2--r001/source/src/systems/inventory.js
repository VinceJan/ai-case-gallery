// ================================================================
//  道具栏
// ================================================================
export const ITEMS = {
  drink: { name: '罐装饮料', icon: '🥤', price: 130, desc: '自动售货机里最常见的那种。甜甜的。' },
  soda: { name: '橘子汽水', icon: '🧃', price: 150, desc: '玻璃瓶装，开盖会“呲”的一声。' },
  coffee: { name: '手冲咖啡', icon: '☕', price: 480, desc: 'ひより的手冲，酸得恰到好处。' },
  cake: { name: '草莓蛋糕', icon: '🍰', price: 520, desc: '奶油有点甜，但很好吃。' },
  umbrella: { name: '浅蓝色折叠伞', icon: '☂️', desc: '阳子的伞，伞柄上贴着一枚小樱花贴纸。' },
  radio: { name: '老式收音机', icon: '📻', desc: '野上先生修好的。旋钮有点松，但声音很清楚。' },
  notebook: { name: '深蓝色笔记本', icon: '📒', desc: '扉页上写着「高橋 遥」。里面画满了小小的地图。' },
  film: { name: '胶卷', icon: '🎞️', desc: '还剩七张。拍完小镇就刚好。' },
  ema: { name: '绘马', icon: '🐎', desc: '在背面写下心愿就能挂在社殿上。' },
  dango: { name: '祭典团子', icon: '🍡', desc: '三颗一串，樱花色的那颗最好吃。' },
  cotton: { name: '棉花糖', icon: '🍥', desc: '祭典摊子上现做的，粉红色。' },
  chair: { name: '折叠椅', icon: '🪑', desc: '集会所缺的那种。一共要三把。' },
  cat: { name: '三花猫', icon: '🐈', desc: '它叫小豆，是镇上有名的三花猫。' },
  camera: { name: '小型相机', icon: '📷', desc: '澄借给你的。按下快门就能留下风景。' },
  charm: { name: '御守', icon: '🧧', desc: '神社里求来的。小小的，红色。' },
  letter: { name: '一封信', icon: '✉️', desc: '今天新送到的信。' },
};

export class Inventory {
  constructor() {
    this.slots = {};
    this.money = 1500;
    this.newFlags = {};
  }
  add(id, n = 1) {
    this.slots[id] = (this.slots[id] || 0) + n;
    return true;
  }
  remove(id, n = 1) {
    if (!this.slots[id]) return false;
    this.slots[id] -= n;
    if (this.slots[id] <= 0) delete this.slots[id];
    return true;
  }
  has(id, n = 1) { return (this.slots[id] || 0) >= n; }
  count(id) { return this.slots[id] || 0; }
  get isEmpty() { return Object.keys(this.slots).length === 0; }
  pay(n) {
    if (this.money < n) return false;
    this.money -= n; return true;
  }
  earn(n) { this.money += n; }
  list() {
    return Object.keys(this.slots).filter((k) => ITEMS[k]).map((k) => ({ id: k, n: this.slots[k], ...ITEMS[k] }));
  }
  serialize() { return { slots: this.slots, money: this.money }; }
  load(d) { if (!d) return; this.slots = d.slots || {}; this.money = d.money ?? 1500; }
}
