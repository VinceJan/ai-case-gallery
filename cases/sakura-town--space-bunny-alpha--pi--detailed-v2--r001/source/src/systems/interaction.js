// 交互系统：就近 + 面朝方向选取可交互对象
import * as THREE from 'three';
import { clamp01, damp } from '../util/math.js';

export class InteractionSystem {
  constructor(ctx) {
    this.ctx = ctx;            // { game, town, npcs, zones, quests, inventory, audio, ui, time, weather }
    this.items = [];           // 全部可交互对象
    this.current = null;
    this.locked = false;
  }

  setItems(list) { this.items = list; }

  /**
   * 每帧重新读取数组：委托道具 / 祭典摊位是运行时动态加的，
   * 而且 clearQuestProps 会整体重新赋值，必须重新取引用。
   */
  refresh() {
    const c = this.ctx;
    this.items = [...(c.town?.interactables || []), ...(c.zones?.interactables || [])];
  }

  /** 每帧调用 */
  update(dt) {
    const c = this.ctx;
    const p = c.game.player;
    if (p.frozen || this.locked) { this.setCurrent(null); return; }

    this.refresh();
    let best = null, bestScore = -1;
    const zone = c.zones.current;
    const fx = Math.sin(p.yaw), fz = Math.cos(p.yaw);

    for (const it of this.items) {
      if (it.zone && it.zone !== zone) continue;
      if (it.enabled && !it.enabled()) continue;
      const dx = it.x - p.pos.x, dz = it.z - p.pos.z;
      const d = Math.hypot(dx, dz);
      const r = it.r || 1.6;
      if (d > r) continue;
      const dot = d < 0.25 ? 1 : (dx * fx + dz * fz) / d;
      if (dot < -0.25) continue;
      const score = (it.priority || 0) * 3 + (1 - d / r) + dot * 0.4;
      if (score > bestScore) { bestScore = score; best = it; }
    }

    // NPC 对话：正对着的优先于单纯最近的
    const npc = c.npcs.bestFacing(p.pos.x, p.pos.z, fx, fz, 2.8, zone);
    if (npc) {
      const dx = npc.pos.x - p.pos.x, dz = npc.pos.z - p.pos.z;
      const d = Math.hypot(dx, dz) || 1;
      const score = 2.4 + ((dx * fx + dz * fz) / d) * 0.4;
      if (score > bestScore) { bestScore = score; best = { id: 'npc-' + npc.id, npc, label: `和${npc.name}说话`, kind: 'talkNpc', r: 2.8 }; }
    }

    this.setCurrent(best);
  }

  setCurrent(it) {
    if (this.current === it) return;
    this.current = it;
    if (this.ctx.ui) this.ctx.ui.setPrompt(it ? it.label : null, it ? (it.key || 'E') : 'E');
  }

  /** E 键 */
  trigger() {
    const it = this.current;
    if (!it || this.locked) return false;
    const c = this.ctx;
    c.audio?.click();
    this.handle(it);
    return true;
  }

  handle(it) {
    const c = this.ctx;
    const g = c.game;
    switch (it.kind) {
      case 'enter': {
        c.zones.enter(it.target);
        break;
      }
      case 'exit': {
        c.zones.exit(it.to);
        break;
      }
      case 'talk': {
        c.ui.talkTo(it.target);
        break;
      }
      case 'talkNpc': {
        const n = it.npc;
        n.facePlayer(g.player.pos.x, g.player.pos.z);
        c.ui.talkTo(n.id);
        break;
      }
      case 'vending': {
        c.quests.onVending(it);
        break;
      }
      case 'notice': {
        c.ui.openBoard();
        break;
      }
      case 'sit': {
        const p = g.player;
        p.sitTarget = { x: it.x + Math.sin(p.yaw) * 0.35, z: it.z + Math.cos(p.yaw) * 0.35, dx: Math.sin(p.yaw), dz: Math.cos(p.yaw) };
        c.audio?.thud(0.06);
        break;
      }
      case 'swing': {
        c.audio?.swing();
        c.ui.toast('秋千荡得很高，风从耳边过去。', '日常');
        break;
      }
      case 'water': {
        c.inventory.add('water', 1);
        c.audio?.pour();
        c.ui.toast('掬起一掬凉水，整个人清醒了。', '清');
        c.quests.progress('wash');
        break;
      }
      case 'offer': {
        c.quests.doOffer();
        break;
      }
      case 'photo': {
        c.quests.doPhoto(it);
        break;
      }
      case 'timetable': {
        c.ui.openTimetable();
        break;
      }
      case 'order': {
        c.quests.doOrder();
        break;
      }
      case 'shopBuy': {
        c.quests.buyFromShop(it.data?.shop);
        break;
      }
      case 'buy': {
        c.quests.doCheckout();
        break;
      }
      case 'letter': {
        c.ui.openLetter();
        break;
      }
      case 'watch': {
        c.ui.toast('电视里在放天气预报，明天也是晴天。', '日常');
        c.audio?.chime();
        break;
      }
      case 'fridge': {
        const got = c.inventory.has('drink');
        if (got) { c.inventory.remove('drink', 1); c.ui.toast('从冰箱里拿了一罐饮料。', '日常'); c.audio?.vending(); }
        else c.ui.toast('冰箱里只有明天要用的食材。', '日常');
        break;
      }
      case 'kaikanBoard': {
        c.ui.openBoard('kaikan');
        break;
      }
      case 'view': {
        c.ui.toast(it.text || '从这里能看见整个小镇。', '风景');
        c.quests.discoverNearest(g.player.pos.x, g.player.pos.z, 26);
        break;
      }
      case 'look': {
        c.ui.toast(it.text || '看了一会儿。', '日常');
        c.quests.discoverNearest(g.player.pos.x, g.player.pos.z, 20);
        break;
      }
      case 'waterwheel': {
        c.ui.toast('水车吱呀吱呀地转着，水声很规律。', '日常');
        c.audio?.pour();
        c.quests.discoverNearest(g.player.pos.x, g.player.pos.z, 12);
        break;
      }
      case 'cat': {
        c.quests.petCat();
        break;
      }
      case 'pickup': {
        c.quests.pickup(it);
        break;
      }
      default: {
        if (it.onUse) it.onUse(it);
      }
    }
  }
}
