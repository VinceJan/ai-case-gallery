// 少量简单随机事件：让小镇会"发生事情"
import { clamp01 } from '../util/math.js';
import { dist } from '../util/math.js';
import { LANDMARKS } from '../world/layout.js';

const EVENTS = [
  {
    id: 'animal', weight: 1.0, minHour: 8, maxHour: 19, cooldown: 1,
    start(c) {
      const spots = [
        { x: -32, z: 70, text: '一只三花猫蹲在公园的草丛边，看见你过来也不跑。' },
        { x: 24, z: -46, text: '神社的石灯笼后面传来猫叫，一只猫探出头。' },
        { x: 66, z: 4, text: '小桥上蹲着一只猫，尾巴垂在桥边晃。' },
        { x: 30, z: 33, text: '商店街上有只猫正在盯着一扇窗户。' },
      ];
      const s = spots[Math.floor(Math.random() * spots.length)];
      c.town.addInteract({
        id: 'ev-animal', x: s.x, z: s.z, r: 2.0, label: '摸摸小猫', kind: 'look', priority: 1,
        text: s.text, once: true,
      });
      c.ui.toast(s.text, '町内', 'good');
      c.audio?.cat();
      return 0;
    },
  },
  {
    id: 'trainDelay', weight: 0.8, minHour: 6, maxHour: 21, cooldown: 1,
    start(c) {
      c.trainSystem.delay = 25;
      c.ui.toast('车站广播：「ご迷惑をおかけしますが、次の列車はやく到着します。」', '铁路', 'warn');
      c.audio?.page();
      return 0;
    },
  },
  {
    id: 'shopLate', weight: 0.9, minHour: 8, maxHour: 15, cooldown: 1,
    start(c) {
      c.shopLate = true;
      c.ui.toast('喫茶ひより的招牌还没亮——老板今天起晚了。', '町内');
      return 0;
    },
  },
  {
    id: 'community', weight: 0.7, minHour: 16, maxHour: 20, cooldown: 1,
    start(c) {
      const spots = [{ x: -68, z: 52, who: 'nogami' }, { x: 30, z: 33, who: 'ken' }, { x: 0, z: 36, who: 'yoko' }];
      const s = spots[Math.floor(Math.random() * spots.length)];
      c.town.addInteract({
        id: 'ev-community', x: s.x, z: s.z, r: 2.2, label: '和街坊聊聊', kind: 'look', priority: 1,
        text: '大家围在一起说镇上的事，谁家孩子考上高中了，祭典预算还差多少。',
      });
      c.ui.toast('商店街那边有人在聊天。', '町内');
      return 0;
    },
  },
  {
    id: 'crossingTrouble', weight: 0.6, minHour: 8, maxHour: 19, cooldown: 1,
    start(c) {
      c.crossingTrouble = true;
      c.ui.toast('道口的警示灯灭了一盏。看起来得等一会儿。', '町内', 'warn');
      c.audio?.click();
      return 28;
    },
    end(c) {
      c.ui.toast('道口的警示灯恢复了。「抱歉，是接触不良。」', '町内', 'good');
    },
  },
  {
    id: 'lostItem', weight: 0.8, minHour: 9, maxHour: 18, cooldown: 1,
    start(c) {
      const spots = [
        { x: 34, z: 25, item: 'drink', text: '路边躺着一罐没喝完的饮料。' },
        { x: -30, z: 78, item: 'dango', text: '长椅上落着一串团子。' },
        { x: 24, z: -48, item: 'ema', text: '社殿前有一枚掉在地上的绘马。' },
        { x: -6, z: 6, item: 'notebook', text: '月台上有一本深蓝色笔记本。' },
      ];
      const s = spots[Math.floor(Math.random() * spots.length)];
      c.town.addInteract({
        id: 'ev-lost', x: s.x, z: s.z, r: 1.9, label: '捡起东西', kind: 'pickup',
        item: s.item, priority: 1, text: s.text,
      });
      c.ui.toast(s.text, '町内');
      return 0;
    },
  },
];

export class EventSystem {
  constructor(ctx) {
    this.ctx = ctx;
    this.cooldowns = {};
    this.timer = 70;
    this.active = null;
    this.activeT = 0;
  }

  update(dt) {
    const c = this.ctx;
    const t = c.time;
    for (const k of Object.keys(this.cooldowns)) this.cooldowns[k] -= dt;

    if (this.active) {
      this.activeT -= dt;
      if (this.activeT <= 0) {
        this.active.def.end?.(c);
        this.active = null;
      }
    }

    this.timer -= dt;
    if (this.timer > 0) return;
    this.timer = 100 + Math.random() * 140;

    if (t.day === 1 && t.hour < 11) return;      // 第一天先让玩家熟悉
    if (this.active) return;
    const pool = EVENTS.filter((e) => {
      if ((this.cooldowns[e.id] || 0) > 0) return false;
      const h = t.hour;
      const inR = e.minHour <= e.maxHour ? (h >= e.minHour && h < e.maxHour) : (h >= e.minHour || h < e.maxHour);
      return inR;
    });
    if (!pool.length) return;
    const total = pool.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * total;
    let pick = pool[0];
    for (const e of pool) { r -= e.weight; if (r <= 0) { pick = e; break; } }
    const dur = pick.start(c) ?? 0;
    this.cooldowns[pick.id] = 240;
    if (dur > 0) { this.active = { def: pick }; this.activeT = dur; }
  }
}
