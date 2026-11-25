export const ITEMS = {
  sakura_anpan: { name: '刚出炉的樱花红豆包', desc: '美咲亲手烤制，还带着暖呼呼的樱叶香气。', price: 180, edible: true },
  melonpan: { name: '脆皮菠萝包', desc: '金黄酥脆，散步时吃一口心情会变好。', price: 160, edible: true },
  matcha_latte: { name: '冰镇抹茶拿铁', desc: '微苦回甘，喝完步履轻快。', price: 220, edible: true, boost: true },
  ramune: { name: '弹珠汽水', desc: '青叶商店招牌冰饮，带着清脆的气泡声。', price: 140, edible: true, boost: true },
  canned_coffee: { name: '自动售货机热咖啡', desc: '街头售货机买的温暖罐装咖啡，提神又暖手。', price: 120, edible: true, boost: true },
  peach_water: { name: '白桃气泡水', desc: '春日限定清甜白桃饮品。', price: 130, edible: true, boost: true },
  postcard: { name: '樱花小镇明信片', desc: '印着樱川红桥与电车的明信片，可以去邮筒寄出。', price: 100 },
  ayu_fish: { name: '樱川香鱼', desc: '清澈河水里钓到的银亮香鱼，橘猫阿橘最喜欢了。', sellPrice: 160 },
  yamame_fish: { name: '山女鱼', desc: '带着漂亮斑纹的溪流鱼。', sellPrice: 220 },
  river_crab: { name: '河岸小螃蟹', desc: '举着小钳子的活泼河蟹。', sellPrice: 120 },
  koi_fish: { name: '锦鲤（放生留念）', desc: '河底偶遇的华丽锦鲤，带来好兆头！', sellPrice: 380 },
  brass_bell: { name: '小悠的电车铜铃', desc: '河水冲刷得闪闪发亮的小电车挂件，该还给小悠了。', questItem: true },
  clover_charm: { name: '四叶草护身符', desc: '阿橘送给你的春日幸运礼物。', questItem: true },
  omikuji: { name: '樱森神社御神签', desc: '在樱森神社抽到的签纸，记着温柔的祝福。' },
};

export class GameState {
  constructor() {
    this.yen = 650;
    this.inventory = { melonpan: 1 };
    this.photos = [];
    this.latestOmikuji = null;
    this.postedPostcards = 0;

    this.tasks = {
      anpan_delivery: {
        id: 'anpan_delivery',
        title: '趁热送去的樱花红豆包',
        status: 'available',
        hint: '把美咲刚烤好的「樱花红豆包」送到街对面青叶商店的源造爷爷手中。',
        doneText: '源造爷爷收到热乎乎的樱花红豆包非常开心，还聊起了小镇往事。',
      },
      lost_bell: {
        id: 'lost_bell',
        title: '遗落在樱川边的电车铜铃',
        status: 'available',
        hint: '去东侧河畔的木栈道垂钓，帮小悠找回掉进河里的电车铜铃。',
        doneText: '从樱川里钓回了闪亮的铜铃，小悠开心地挂回了书包上。',
      },
      train_photo: {
        id: 'train_photo',
        title: '樱花电车经过的瞬间',
        status: 'available',
        hint: '按 C 打开胶片相机，拍下「樱花电车」驶过小镇或车站的照片，拿给摄影师晴人看。',
        doneText: '成功定格了电车驶过樱花山谷的画面，晴人把这张照片珍藏进了画册。',
      },
      feed_cat: {
        id: 'feed_cat',
        title: '给阿橘的新鲜小鱼',
        status: 'available',
        hint: '在河畔木栈道钓一条樱川香鱼（或溪流鱼），分给小镇橘猫「阿橘」。',
        doneText: '阿橘吃得呼噜直响，还用爪子推来一枚四叶草幸运护身符！',
      },
      shrine_wish: {
        id: 'shrine_wish',
        title: '樱森神社的祈愿与来信',
        status: 'available',
        hint: '走过红桥登上樱森神社摇铃抽签，或在青叶商店买一张明信片投入红色邮筒。',
        doneText: '在千年枝垂樱下听见清脆铃音，也把春天的问候寄向了远方。',
      },
    };
  }

  addItem(itemId, count = 1) { this.inventory[itemId] = (this.inventory[itemId] || 0) + count; }
  removeItem(itemId, count = 1) {
    if ((this.inventory[itemId] || 0) < count) return false;
    this.inventory[itemId] -= count;
    if (this.inventory[itemId] <= 0) delete this.inventory[itemId];
    return true;
  }
  hasItem(itemId, count = 1) { return (this.inventory[itemId] || 0) >= count; }
  hasAnyFish() { return this.hasItem('ayu_fish') || this.hasItem('yamame_fish') || this.hasItem('river_crab'); }
  consumeOneFish() {
    if (this.hasItem('ayu_fish')) return this.removeItem('ayu_fish', 1);
    if (this.hasItem('yamame_fish')) return this.removeItem('yamame_fish', 1);
    if (this.hasItem('river_crab')) return this.removeItem('river_crab', 1);
    return false;
  }
  spendYen(amount) { if (this.yen < amount) return false; this.yen -= amount; return true; }
  addYen(amount) { this.yen += amount; }
  startTask(id) { const t = this.tasks[id]; if (t && t.status === 'available') { t.status = 'active'; return true; } return false; }
  completeTask(id) { const t = this.tasks[id]; if (t && t.status !== 'done') { t.status = 'done'; return true; } return false; }
  hasTrainPhoto() { return this.photos.some((p) => p.tags.includes('train')); }
  getActiveTasks() { return Object.values(this.tasks).filter((t) => t.status === 'active'); }
}
