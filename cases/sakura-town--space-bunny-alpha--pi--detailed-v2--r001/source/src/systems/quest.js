// ================================================================
//  核心玩法：町内便（日常委托）
//  「在车站告示板接下今天的小事，帮镇上的几个人跑跑腿」
// ================================================================
import * as THREE from 'three';
import { ITEMS } from './inventory.js';
import { LANDMARKS, ANCHORS, SHOP_STOCK } from '../world/layout.js';
import { dist } from '../util/math.js';
import { toon } from '../render/toon.js';
import { heightAt } from '../world/terrain.js';

/* 目标类型：
   go      到达某坐标/地标
   buy     在自动售货机购买某物
   talk    与某人交谈
   pickup  在某处拾取
   give    把物品交给某人
   interact 使用某个交互物
   discover 发现地标
   photo   拍照
   sit     在指定长椅坐下
*/

export const QUESTS = [
  {
    id: 'q1', chapter: 1, title: '第一件小事', giver: 'notice',
    brief: '车站的站务员小林健想拜托你送一罐饮料过去——他忙了一早上，还没顾上买。',
    reward: { money: 200, affinity: { ken: 1 } },
    steps: [
      { id: 's1', type: 'buy', item: 'drink', desc: '在任意一台自动售货机买一罐饮料', hint: '车站前、商店街、公园都有售货机' },
      { id: 's2', type: 'give', item: 'drink', to: 'ken', desc: '把饮料交给站务员 健' },
    ],
  },
  {
    id: 'q2', chapter: 1, title: '落在门口的伞', giver: 'yoko',
    brief: '阳子下班时发现伞忘在商店街的花の國门口了。明天就要下雨，她有点担心。',
    requires: ['q1'],
    reward: { money: 150, affinity: { yoko: 1 } },
    steps: [
      { id: 's1', type: 'go', at: { x: 33, z: 36.0, r: 5 }, desc: '去和菓子店「花の国」门口', hint: '商店街往东第三家' },
      { id: 's2', type: 'interact', id: 'q2-umbrella', desc: '收起那把浅蓝色的伞' },
      { id: 's3', type: 'give', item: 'umbrella', to: 'yoko', desc: '把伞还给 阳子' },
    ],
  },
  {
    id: 'q3', chapter: 1, title: '修好的收音机', giver: 'nogami',
    brief: '野上先生修好了用了三十年的收音机，想在神社的社殿前听一次天气预报。他年纪大了，路上有段坡。',
    requires: ['q1'],
    reward: { money: 300, affinity: { nogami: 1 }, unlock: 'charm' },
    steps: [
      { id: 's1', type: 'talk', to: 'nogami', desc: '去住宅区找 野上先生 取收音机' },
      { id: 's2', type: 'give', item: 'radio', to: 'nogami', desc: '确认拿到收音机' },
      { id: 's3', type: 'go', at: { x: 24, z: -50, r: 9 }, desc: '把收音机带到神社' },
      { id: 's4', type: 'interact', id: 'q3-radio', desc: '在社殿前放收音机' },
    ],
  },
  {
    id: 'q4', chapter: 2, title: '月台上的笔记', giver: 'ken',
    brief: '有位乘客说，把一本深蓝色的笔记本落在了月台上。健翻遍了候车室也没找到。',
    requires: ['q2'],
    reward: { money: 260, affinity: { ken: 1, haruka: 1 } },
    steps: [
      { id: 's1', type: 'go', at: { x: 6, z: 7.5, r: 4.5 }, desc: '去月台东侧找一找' },
      { id: 's2', type: 'interact', id: 'q4-book', desc: '捡起笔记本' },
      { id: 's3', type: 'give', item: 'notebook', to: 'ken', desc: '交还给站务员 健' },
    ],
  },
  {
    id: 'q5', chapter: 2, title: '汽水与黄昏', giver: 'haruka',
    brief: '遥想买一罐汽水，可是身上只剩硬币了。她想在公园的长椅上喝。',
    requires: ['q1'],
    reward: { money: 180, affinity: { haruka: 1 } },
    steps: [
      { id: 's1', type: 'buy', item: 'soda', desc: '买一罐橘子汽水' },
      { id: 's2', type: 'go', at: { x: -30, z: 78, r: 5 }, desc: '去公园的长椅' },
      { id: 's3', type: 'interact', id: 'q5-sit', desc: '坐下陪遥喝汽水' },
    ],
  },
  {
    id: 'q6', chapter: 2, title: '从高处看小镇', giver: 'sumi',
    brief: '澄想拍一张「从山顶看下来的樱町」，交这次照片参加摄影比赛。相机她可以借你。',
    requires: ['q1'],
    reward: { money: 350, affinity: { sumi: 1 }, unlock: 'film' },
    steps: [
      { id: 's1', type: 'talk', to: 'sumi', desc: '向 澄 借相机' },
      { id: 's2', type: 'go', at: { x: ANCHORS.lookout.x, z: ANCHORS.lookout.z, r: 5 }, desc: '去神社后坡的见晴台' },
      { id: 's3', type: 'photo', desc: '拍下小镇的黄昏' },
      { id: 's4', type: 'give', item: 'film', to: 'sumi', desc: '把胶卷交给 澄' },
    ],
  },
  {
    id: 'q7', chapter: 2, title: '小豆不见了', giver: 'nogami',
    brief: '三花猫小豆从早上就没回家。爷爷有点担心——虽然他说「猫总是有自己的事」。',
    requires: ['q3'],
    reward: { money: 240, affinity: { nogami: 1, haruka: 1 } },
    steps: [
      { id: 's1', type: 'discover', lm: 'lm-waterwheel', desc: '去溪边找找' },
      { id: 's2', type: 'go', at: { x: ANCHORS.waterwheel.x + 1.6, z: ANCHORS.waterwheel.z + 1.2, r: 4 }, desc: '找到小豆' },
      { id: 's3', type: 'interact', id: 'q7-cat', desc: '把小豆抱起来' },
      { id: 's4', type: 'give', item: 'cat', to: 'nogami', desc: '把猫还给 野上先生' },
    ],
  },
  {
    id: 'q8', chapter: 3, title: '集会所缺的三把椅子', giver: 'kaikan',
    brief: '周末有町内会。集会所的折叠椅不够用了，健说散落在镇上的三把椅子得找回来。',
    requires: ['q4'],
    reward: { money: 400, affinity: { ken: 1, nogami: 1 } },
    steps: [
      { id: 's1', type: 'go', at: { x: 30, z: 33.6, r: 4 }, desc: '在商店街找到第一把' },
      { id: 's2', type: 'interact', id: 'q8-chair1', desc: '收起折叠椅' },
      { id: 's3', type: 'go', at: { x: -44, z: 27, r: 5 }, desc: '在车站前找到第二把' },
      { id: 's4', type: 'interact', id: 'q8-chair2', desc: '收起折叠椅' },
      { id: 's5', type: 'go', at: { x: -32, z: 76, r: 6 }, desc: '在公园找到第三把' },
      { id: 's6', type: 'interact', id: 'q8-chair3', desc: '收起折叠椅' },
      { id: 's7', type: 'go', at: { x: ANCHORS.kaikanDoor.x, z: ANCHORS.kaikanDoor.z, r: 4 }, desc: '把椅子送到集会所' },
    ],
  },
  {
    id: 'q9', chapter: 3, title: '神社的旧物', giver: 'sumi',
    brief: '神社后院的仓库里有一台老式留声机。澄想拍下它，但仓库钥匙在集会所。',
    requires: ['q6'],
    reward: { money: 320, affinity: { sumi: 1 }, unlock: 'charm' },
    steps: [
      { id: 's1', type: 'go', at: { x: ANCHORS.kaikanDoor.x, z: ANCHORS.kaikanDoor.z, r: 4 }, desc: '去集会所取钥匙' },
      { id: 's2', type: 'interact', id: 'q9-key', desc: '和集会所的人拿钥匙' },
      { id: 's3', type: 'go', at: { x: 32.5, z: -58, r: 5 }, desc: '打开神社后院的仓库' },
      { id: 's4', type: 'interact', id: 'q9-phono', desc: '拍下留声机' },
      { id: 's5', type: 'give', item: 'film', to: 'sumi', desc: '把胶卷交给 澄' },
    ],
  },
  {
    id: 'q10', chapter: 4, title: '小镇祭的准备', giver: 'kaikan',
    brief: '町内会要在神社办一次小祭。棉花糖、团子、绘马……还差一些东西，健说「差一个人来张罗」。',
    requires: ['q7', 'q8'],
    reward: { money: 800, affinity: { ken: 2, yoko: 2, sumi: 2, nogami: 2, haruka: 2 }, ending: true },
    steps: [
      { id: 's1', type: 'buy', item: 'drink', count: 2, desc: '买两罐饮料（给祭典补给）' },
      { id: 's2', type: 'go', at: { x: 13, z: 36.0, r: 5 }, desc: '去喫茶ひより' },
      { id: 's3', type: 'interact', id: 'q10-order', desc: '向 澄 订一批祭典团子' },
      { id: 's4', type: 'go', at: { x: 24, z: -50, r: 9 }, desc: '把东西布置到神社' },
      { id: 's5', type: 'interact', id: 'q10-decorate', desc: '挂上绘马，布置摊位' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 *  动态委托模板（每天刷新告示板）
 * ------------------------------------------------------------------ */
export const DAILY_BOARDS = [
  { id: 'd-vending', title: '帮阳子补货', desc: '店里囤货不够了，能帮忙带两罐饮料吗？', need: 'drink', count: 2, to: 'yoko', money: 260, affinity: { yoko: 1 } },
  { id: 'd-company', title: '陪爷爷走走', desc: '老爷子的膝盖不太行了，能陪他去一趟神社吗？', need: null, to: 'nogami', goto: 'shrine', money: 180, affinity: { nogami: 1 } },
  { id: 'd-souvenir', title: '给澄带点心', desc: '澄说想吃花の国的草饼。', need: 'dango', count: 1, to: 'sumi', money: 220, affinity: { sumi: 1 } },
  { id: 'd-lost', title: '找回落下的东西', desc: '有人在商店街捡到一样东西，先放在站务室。', need: 'drink', count: 1, to: 'ken', money: 150, affinity: { ken: 1 } },
];

const festivalLines = [
  '棉花糖在夕阳里转成一团粉色，像一小朵云。',
  '老板递来一串团子：「趁热吃，凉了就不好吃了。」',
  '金鱼在水盆里游来游去，小孩子蹲了很久不肯走。',
  '「一发入魂！」——欢呼声混着蝉鸣。',
  '石阶上坐满了人。抬头能看见今晚的第一颗星。',
];

export class QuestSystem {
  constructor(ctx) {
    this.ctx = ctx;
    this.done = new Set();
    this.active = null;
    this.stepIdx = 0;
    this.stepFlags = {};
    this.daily = [];
    this.dailyDay = 0;
    this.dailyActive = null;
    this.log = [];
    this.discovered = new Set();
    this.landmarks = LANDMARKS;
    this.catFound = false;
    this.photoTaken = 0;
    this.endingSeen = false;
    this.festival = false;
    this.flags = { letters: [] };
    this.pickupNodes = [];
  }

  /* ---------- 进度 ---------- */
  get currentStep() {
    if (!this.active) return null;
    const q = QUESTS.find((x) => x.id === this.active);
    if (!q) return null;
    return q.steps[this.stepIdx] || null;
  }
  get currentQuest() {
    return this.active ? QUESTS.find((x) => x.id === this.active) : null;
  }
  get currentObjectiveText() {
    const s = this.currentStep;
    if (!s) return null;
    if (s.type === 'give' && !this.ctx.inventory.has(s.item)) {
      return `取得「${ITEMS[s.item]?.name || s.item}」再交给对方`;
    }
    if (s.type === 'buy' && s.count) return `${s.desc}（${this.buyCount(s)}/${s.count}）`;
    return s.desc;
  }

  buyCount(s) {
    return s.count ? (this.stepFlags['count_' + s.id] || 0) : 1;
  }

  /* ---------- 接取 ---------- */
  available() {
    return QUESTS.filter((q) => !this.done.has(q.id)
      && (!q.requires || q.requires.every((r) => this.done.has(r))));
  }
  atBoard() {
    return this.available();
  }
  accept(id) {
    if (this.done.has(id)) return;
    const q = QUESTS.find((x) => x.id === id);
    if (!q) return;
    this.active = id;
    this.stepIdx = 0;
    this.stepFlags = {};
    this.log.push({ day: this.ctx.time.day, text: `接下了「${q.title}」` });
    this.ctx.ui.toast(`接下了委托：${q.title}`, '便笺');
    this.refreshTracker();
    this.spawnQuestProps();
  }
  abandon() {
    if (!this.active) return;
    this.log.push({ day: this.ctx.time.day, text: `放下了「${this.currentQuest.title}」` });
    this.active = null; this.stepFlags = {};
    this.refreshTracker();
  }

  advance() {
    const q = this.currentQuest;
    if (!q) return;
    this.stepIdx++;
    if (this.stepIdx >= q.steps.length) {
      this.completeQuest(q);
    } else {
      this.spawnQuestProps();     // 换步骤了，道具也要跟着换
      this.refreshTracker();
    }
  }

  completeQuest(q) {
    this.done.add(q.id);
    this.active = null; this.stepIdx = 0; this.stepFlags = {};
    const r = q.reward || {};
    if (r.money) this.ctx.inventory.earn(r.money);
    for (const [id, v] of Object.entries(r.affinity || {})) this.addAffinity(id, v);
    if (r.unlock) this.ctx.inventory.add(r.unlock, 1);
    this.log.push({ day: this.ctx.time.day, text: `完成了「${q.title}」` });
    this.ctx.ui.questComplete(q);
    this.refreshTracker();
    this.clearQuestProps();
    if (r.ending) { this.endingSeen = true; this.startFestival(); }
  }

  /** 小镇祭：把神社前的空地变成祭典会场 */
  startFestival() {
    const c = this.ctx;
    if (this.festival) return;
    this.spawnFestivalStalls();
    // 傍晚的光与灯
    this.ctx.time.hour = Math.max(this.ctx.time.hour, 17.6);
    this.festival = true;
  }

  spawnFestivalStalls() {
    const c = this.ctx;
    // 重复调用（读档 / 再次触发）时先清掉旧的摊位
    c.town.interactables = c.town.interactables.filter((i) => !String(i.id).startsWith('festival-'));
    const cx = 24, cz = -50;
    const stalls = [
      { x: cx - 5.5, z: cz - 3.0, label: '棉花糖摊' },
      { x: cx + 5.5, z: cz - 3.0, label: '团子摊' },
      { x: cx - 5.5, z: cz + 3.0, label: '金鱼捞' },
      { x: cx + 5.5, z: cz + 3.0, label: '射击摊' },
      { x: cx, z: cz - 5.5, label: '神社前广场' },
    ];
    for (const [i, s2] of stalls.entries()) {
      c.town.addInteract({
        id: 'festival-' + i, x: s2.x, z: s2.z, r: 2.2,
        label: `看看${s2.label}`, kind: 'view',
        text: festivalLines[i % festivalLines.length], priority: 0,
      });
    }
    c.ui.toast('小镇祭开始了。神社前摆起了摊位，镇上的人陆陆续续过去。', '小镇祭');
    c.audio?.chime();
    this.refreshTracker();
  }

  addAffinity(id, v) {
    const n = this.ctx.npcs.byId[id];
    if (!n) return;
    n.affinity = Math.min(5, n.affinity + v);
    if (!n.met) { n.met = true; this.ctx.ui.toast(`认识了 ${n.name}`, '相识'); }
    this.refreshTracker();
  }

  /* ---------- 触发点 ---------- */
  progress(kind, payload) {
    const s = this.currentStep;
    if (!s) return false;
    if (kind === 'buy' && s.type === 'buy' && s.item === payload.item) {
      const need = s.count || 1;
      const cur = this.stepFlags['count_' + s.id] || 0;
      this.stepFlags['count_' + s.id] = cur + 1;
      if (this.stepFlags['count_' + s.id] >= need) this.advance();
      else { this.refreshTracker(); this.ctx.ui.toast(`还差 ${need - this.stepFlags['count_' + s.id]} 份`, '便笺'); }
      return true;
    }
    if (kind === 'interact' && s.type === 'interact' && s.id === payload.id) { this.advance(); return true; }
    if (kind === 'photo' && s.type === 'photo') { this.advance(); return true; }
    if (kind === 'go' && s.type === 'go' && s.at) {
      if (dist(this.ctx.game.player.pos.x, this.ctx.game.player.pos.z, s.at.x, s.at.z) < (s.at.r || 5)) {
        this.advance(); return true;
      }
    }
    if (kind === 'talk' && s.type === 'talk' && s.to === payload.id) { this.advance(); return true; }
    return false;
  }

  /** 供 UI 目标箭头使用 */
  get objectiveMarker() {
    const s = this.currentStep;
    if (!s) return null;
    if (s.type === 'go' && s.at) return { x: s.at.x, z: s.at.z, label: s.desc };
    if (s.type === 'talk' || s.type === 'give') {
      const n = this.ctx.npcs.byId[s.to];
      if (n) return { x: n.pos.x, z: n.pos.z, label: `找 ${n.name}` };
    }
    return null;
  }

  /* ---------- 交互回调 ---------- */
  onVending(it) {
    const inv = this.ctx.inventory;
    const price = it.data?.price || 130;
    if (!inv.pay(price)) { this.ctx.ui.toast('钱包里不够了。', '便笺'); this.ctx.audio?.click(); return; }
    inv.add('drink', 1);
    this.ctx.audio?.vending();
    this.ctx.ui.toast(`买下一罐饮料（−${price}円）`, '商店');
    this.progress('buy', { item: 'drink' });
    this.refreshTracker();
  }

  /** 店铺柜台买东西 */
  buyFromShop(shopId) {
    const stock = SHOP_STOCK[shopId];
    if (!stock || !stock.length) return;
    const inv = this.ctx.inventory;
    const line = stock.map((g, i) => `${i + 1}. ${g.name} ${g.price}円`).join('   ');
    this.ctx.ui.toast(line + '　（按住数字键购买）', '商店');
    this.pendingShop = { shopId, stock };
  }

  buyItem(item) {
    const p = this.pendingShop;
    if (!p) return;
    const g = p.stock.find((x) => x.item === item);
    if (!g) return;
    if (!this.ctx.inventory.pay(g.price)) { this.ctx.ui.toast('钱包里不够了。', '商店'); this.ctx.audio?.click(); return; }
    this.ctx.inventory.add(g.item, 1);
    this.ctx.audio?.coin();
    this.ctx.ui.toast(`买下了${g.name}（−${g.price}円）`, '商店');
    this.progress('buy', { item: g.item });
    this.refreshTracker();
  }

  doCheckout() {
    const inv = this.ctx.inventory;
    if (inv.count('drink') + inv.count('soda') === 0) { this.ctx.ui.toast('手上没有要结账的东西。', '日常'); return; }
    this.ctx.ui.toast('阳子把东西装进袋子，笑着说谢谢。', '日常');
    this.ctx.audio?.coin();
  }

  doOrder() {
    const s = this.currentStep;
    this.ctx.ui.toast(s && s.id === 'q10-order'
      ? '澄把一整箱祭典团子搬到柜台上：「够不够？」'
      : '澄把一杯刚好的手冲推过来，附带两块小饼干。', '日常');
    // 喫茶店的柜台是常驻设施，只有委托真的要订团子时才给货并推进
    if (s && s.type === 'interact' && s.id === 'q10-order') {
      this.ctx.inventory.add('dango', 2);
      this.advance();
    } else {
      this.ctx.audio?.chime();
    }
    this.refreshTracker();
  }

  doOffer() {
    const inv = this.ctx.inventory;
    if (inv.money < 100) { this.ctx.ui.toast('香资需要 100 円。', '日常'); return; }
    inv.pay(100);
    this.ctx.audio?.shrineBell();
    this.ctx.ui.toast('合掌，摇铃。心里默默许了个愿。', '神社');
    if (!inv.has('charm')) inv.add('charm', 1);
    this.discoverNearest(this.ctx.game.player.pos.x, this.ctx.game.player.pos.z, 12);
  }

  doPhoto(it) {
    this.photoTaken++;
    this.ctx.inventory.add('film', 1);
    this.ctx.ui.toast(`咔嚓。胶卷上还剩 ${this.ctx.inventory.count('film')} 张。`, '风景');
    this.progress('photo', {});
    this.progress('interact', { id: 'photo' });
    this.refreshTracker();
  }

  pickup(it) {
    if (it.item && this.ctx.inventory.add(it.item, it.count || 1)) {
      this.ctx.audio?.coin();
      this.ctx.ui.toast(`捡到了「${ITEMS[it.item]?.name || it.item}」`, '获得');
    }
    // 不管这一步有没有物品，「动手做了」本身就算完成
    this.progress('interact', { id: it.id });
  }

  petCat() {
    this.catFound = true;
    this.ctx.inventory.add('cat', 1);
    this.ctx.audio?.cat();
    this.ctx.ui.toast('小豆眯起眼睛，喉咙里发出呼噜声。', '日常');
    this.progress('interact', { id: 'q7-cat' });
  }

  /* ---------- 地标发现 ---------- */
  discoverNearest(x, z, r = 14) {
    for (const lm of this.landmarks) {
      if (this.discovered.has(lm.id)) continue;
      if (Math.hypot(lm.x - x, lm.z - z) < r) {
        this.discovered.add(lm.id);
        this.ctx.ui.discover(lm);
        this.ctx.audio?.discover();
        this.log.push({ day: this.ctx.time.day, text: `发现了「${lm.name}」` });
        this.refreshTracker();
      }
    }
  }
  checkDiscoveries() {
    const p = this.ctx.game.player.pos;
    this.discoverNearest(p.x, p.z, 11);
    this.tick();
  }

  /**
   * 持续推进「到达某处」「发现某地」这类没有一次性触发点的步骤。
   * 由 game 每 0.4s 调用的 checkDiscoveries 驱动。
   */
  tick() {
    this.checkDaily();
    const s = this.currentStep;
    if (!s) return;
    if (s.type === 'go' && s.at) {
      const p = this.ctx.game.player.pos;
      if (dist(p.x, p.z, s.at.x, s.at.z) < (s.at.r || 5)) this.advance();
      return;
    }
    if (s.type === 'discover' && s.lm) {
      if (this.discovered.has(s.lm)) this.advance();
    }
  }

  get discoveredCount() { return this.discovered.size; }
  get totalLandmarks() { return LANDMARKS.filter((l) => l.discover !== false).length; }

  /* ---------- 每日告示板 ---------- */

  /** 接下来町内会通知 */
  acceptDaily(id) {
    const d = DAILY_BOARDS.find((x) => x.id === id);
    if (!d || this.dailyActive) return;
    this.dailyActive = d;
    this.ctx.ui.toast(`接下了「${d.title}」`, '町内会');
    this.refreshTracker();
  }

  completeDaily() {
    const d = this.dailyActive;
    if (!d) return;
    this.ctx.inventory.earn(d.money);
    for (const [id, v] of Object.entries(d.affinity || {})) this.addAffinity(id, v);
    this.log.push({ day: this.ctx.time.day, text: `帮街坊完成了「${d.title}」` });
    this.dailyActive = null;
    this.ctx.ui.toast(`「${d.title}」办好了（+${d.money}円）`, '町内会');
    this.refreshTracker();
  }

  /** 町内会通知的目标提示 */
  get dailyMarker() {
    const d = this.dailyActive;
    if (!d) return null;
    if (d.goto) {
      const lm = LANDMARKS.find((l) => l.id === d.goto);
      if (lm) return { x: lm.x, z: lm.z, label: d.title };
    }
    if (d.to) {
      const n = this.ctx.npcs.byId[d.to];
      if (n) return { x: n.pos.x, z: n.pos.z, label: `找 ${n.name}` };
    }
    return null;
  }

  checkDaily() {
    const d = this.dailyActive;
    if (!d) return;
    if (d.need && this.ctx.inventory.count(d.need) >= (d.count || 1)) { this.completeDaily(); return; }
    if (d.goto && this.discovered.has(d.goto)) { this.completeDaily(); }
  }

  rollDaily(day) {
    if (this.dailyDay === day && this.daily.length) return;
    this.dailyDay = day;
    const pool = [...DAILY_BOARDS];
    const out = [];
    for (let i = 0; i < 2 && pool.length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      out.push(pool.splice(idx, 1)[0]);
    }
    this.daily = out;
  }

  /* ---------- 委托相关的世界道具（动态生成） ---------- */
  spawnQuestProps() {
    this.clearQuestProps();
    const s = this.currentStep;
    if (!s) return;
    const c = this.ctx;
    if (s.type === 'interact' && s.id && !s.at) {
      const at = this.stepLocation(s);
      if (at) {
        c.town.addInteract({
          id: s.id, x: at.x, z: at.z, y: heightAt(at.x, at.z),
          r: at.r ?? 1.9, label: at.label || s.desc,
          kind: at.kind || 'pickup', item: at.item, priority: 2,
        });
        if (at.kind === 'cat') this.spawnCat(at.x, at.z, at.y ?? heightAt(at.x, at.z));
      }
    }
  }
  /** 三花猫小豆：只在找它的时候出现在溪边 */
  spawnCat(x, z, y) {
    const c = this.ctx;
    if (this._cat) { c.town.scene.remove(this._cat); this._cat = null; }
    const g = new THREE.Group();
    const fur = toon(0xf6f0e6);
    const patch = toon(0xd8a05e);
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), fur);
    body.scale.set(1.5, 0.85, 0.9);
    body.position.y = 0.2;
    g.add(body);
    for (const sx of [-1, 1]) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), patch);
      p.position.set(sx * 0.12, 0.3, 0.05);
      g.add(p);
    }
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), fur);
    head.position.set(0.3, 0.3, 0);
    g.add(head);
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 4), patch);
      ear.position.set(0.3 + sx * 0.07, 0.41, 0);
      g.add(ear);
    }
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.34, 6), fur);
    tail.rotation.z = 1.1; tail.position.set(-0.32, 0.3, 0);
    g.add(tail);
    g.position.set(x, y, z);
    g.traverse((o) => { o.castShadow = true; });
    c.town.scene.add(g);
    this._cat = g;
  }

  clearQuestProps() {
    const c = this.ctx;
    if (this._cat) { c.town.scene.remove(this._cat); this._cat = null; }
    c.town.interactables = c.town.interactables.filter((i) => !String(i.id).startsWith('q'));
  }
  stepLocation(s) {
    // 给需要拾取的步骤一个位置
    const map = {
      'q2-umbrella': { x: 33.0, z: 34.6, item: 'umbrella' },
      'q4-book': { x: 6.2, z: 7.6, item: 'notebook' },
      'q3-radio': { x: 24.6, z: -46.6, item: null },
      'q9-key': { x: ANCHORS.kaikanDoor.x, z: ANCHORS.kaikanDoor.z, item: null },
      'q9-phono': { x: 32.5, z: -58, item: null },
      'q10-decorate': { x: 25.3, z: -46.6, item: null },
      'q5-sit': { x: -30, z: 78, item: null },
      'q7-cat': { x: ANCHORS.waterwheel.x - 2.2, z: ANCHORS.waterwheel.z + 1.4, kind: 'cat', r: 2.2 },
      'q8-chair1': { x: 30, z: 33.4, item: 'chair' },
      'q8-chair2': { x: -44, z: 27.4, item: 'chair' },
      'q8-chair3': { x: -32, z: 76.4, item: 'chair' },
    };
    return map[s.id] || null;
  }

  /** 由 interact handler 调用，处理非物品类步骤 */
  onInteractStep(id) {
    const s = this.currentStep;
    if (s && s.type === 'interact' && s.id === id) { this.advance(); return true; }
    return false;
  }

  /* ---------- 与 NPC 对话时的推进 ---------- */
  onTalk(npcId) {
    const d = this.dailyActive;
    if (d && d.to === npcId && !d.need && !d.goto) { this.completeDaily(); return true; }
    const s = this.currentStep;
    if (s && s.type === 'talk' && s.to === npcId) {
      this.advance();
      // 「去某人那里取东西」：对话完对方就把东西交到手上了
      const nxt = this.currentStep;
      if (nxt && nxt.type === 'give' && nxt.to === npcId && nxt.item
        && !this.ctx.inventory.has(nxt.item)) {
        this.ctx.inventory.add(nxt.item, 1);
        this.ctx.ui.toast(`${this.ctx.npcs.byId[npcId]?.name || '对方'} 把它交给了你。`, '获得');
      }
      return true;
    }
    if (s && s.type === 'give') {
      const need = s.item;
      if (this.ctx.inventory.has(need) && s.to === npcId) { this.advance(); return true; }
    }
    return false;
  }

  refreshTracker() {
    if (this.ctx.ui) this.ctx.ui.refreshTracker();
  }

  serialize() {
    return {
      done: [...this.done], active: this.active, stepIdx: this.stepIdx, dailyActive: this.dailyActive?.id || null,
      stepFlags: this.stepFlags, discovered: [...this.discovered],
      log: this.log.slice(-40), catFound: this.catFound, photoTaken: this.photoTaken,
      dailyDay: this.dailyDay, daily: this.daily, endingSeen: this.endingSeen, festival: this.festival,
    };
  }
  load(d) {
    if (!d) return;
    this.done = new Set(d.done || []);
    this.active = d.active || null;
    this.stepIdx = d.stepIdx || 0;
    this.stepFlags = d.stepFlags || {};
    this.discovered = new Set(d.discovered || []);
    this.log = d.log || [];
    this.catFound = !!d.catFound;
    this.photoTaken = d.photoTaken || 0;
    this.dailyDay = d.dailyDay || 0;
    this.daily = d.daily || [];
    this.dailyActive = DAILY_BOARDS.find((x) => x.id === d.dailyActive) || null;
    this.endingSeen = !!d.endingSeen;
    this.festival = !!d.festival;
    if (this.festival) this.spawnFestivalStalls();
  }
}
