/**
 * Interaction system: find nearby interactables, handle door/vending/sit/talk/shop.
 */
import * as THREE from 'three';
import { surfacePoint } from '../world/Planet.js';
import { bus } from '../core/EventBus.js';

export class InteractionSystem {
  constructor(game) {
    this.game = game;
    this.current = null;
    this.interactables = [];
    this.maxDist = 3.2;
  }

  register(object3d, data) {
    object3d.userData.interactData = data;
    this.interactables.push(object3d);
  }

  /** Rebuild from a list of {object, data} */
  refresh(list) {
    this.interactables = list;
  }

  findNear(player) {
    const px = player.x;
    const pz = player.z;
    let best = null;
    let bestD = this.maxDist;

    for (const obj of this.interactables) {
      const d = obj.userData.interactData;
      if (!d || d.x == null) continue;
      const dist = Math.hypot(d.x - px, d.z - pz);
      if (dist < bestD) {
        bestD = dist;
        best = { type: 'object', object: obj, data: d, dist };
      }
    }

    // NPCs compete fairly on distance
    const npc = this.game.npcs.nearestTo(px, pz, Math.max(this.maxDist, bestD));
    if (npc) {
      const nd = Math.hypot(npc.x - px, npc.z - pz);
      if (!best || nd < bestD) {
        return { type: 'npc', npc, dist: nd };
      }
    }

    return best;
  }

  getHint(target) {
    if (!target) return null;
    if (target.type === 'npc') {
      return { label: `与 ${target.npc.name} 交谈`, key: 'E' };
    }
    const d = target.data;
    return { label: d.label || '交互', key: 'E' };
  }

  perform(target) {
    if (!target) return;
    if (target.type === 'npc') {
      this.game.dialogue.startNPC(target.npc);
      return;
    }
    const d = target.data;
    switch (d.kind || d.interact) {
      case 'door':
        this.toggleDoor(target.object, d);
        break;
      case 'vending':
        this.useVending(d);
        break;
      case 'sit':
        this.game.player.sitting = !this.game.player.sitting;
        this.game.ui.toast(this.game.player.sitting ? '你坐下了，歇了一会儿。' : '你站了起来。');
        break;
      case 'ticket':
        this.game.ui.toast('自动售票机：单程票 ¥220（列车运行中可乘坐）');
        break;
      case 'offering': {
        if (this.game.worldState.spendMoney(50)) {
          this.game.worldState.addBond(1);
          this.game.ui.toast('你投了赛钱，双手合十。心情平静了一些。');
          this.game.audio?.play('chime');
        } else {
          this.game.ui.toast('零钱不够了。');
        }
        break;
      }
      case 'postbox':
        this.game.ui.toast('邮筒里塞着几张明信片，都是寄给邻镇的。');
        break;
      case 'tv':
        this.game.ui.toast('电视里正在播天气预报：晚春，樱花前线北上。');
        break;
      case 'fridge':
        this.game.ui.toast('冰箱里有牛奶和昨天的剩菜。');
        break;
      case 'shop':
        this.openShop(d);
        break;
      case 'lamp':
        this.toggleLamp(d);
        break;
      default:
        if (d.label) this.game.ui.toast(d.label);
    }
    bus.emit('player:interact', { target });
  }

  toggleDoor(object, d) {
    d.open = !d.open;
    if (object) {
      // rotate door around hinge
      if (d.auto) {
        object.position.x += d.open ? (d.side || 1) * 0.9 : -(d.side || 1) * 0.9;
      } else {
        object.rotation.y = d.open ? (d.hingeSide || 1) * Math.PI * 0.55 : 0;
      }
    }
    this.game.audio?.play(d.open ? 'doorOpen' : 'doorClose');
    this.game.ui.toast(d.open ? '门开了。' : '门关上了。');
    // entering a building
    if (d.open && d.buildingId) {
      this.game.enterBuilding(d.buildingId);
    } else if (!d.open && d.buildingId) {
      this.game.exitBuilding();
    }
  }

  useVending(d) {
    const price = d.price ?? 140;
    if (this.game.worldState.spendMoney(price)) {
      this.game.worldState.addItem({ id: 'drink-' + Date.now(), name: '罐装饮料', kind: 'drink' });
      this.game.ui.toast(`购入饮料 -¥${price}。清凉了一下。`);
      this.game.worldState.addBond(0);
      this.game.audio?.play('vending');
    } else {
      this.game.ui.toast('钱不够。');
    }
  }

  openShop(d) {
    const shop = d.shop;
    if (!shop) return;
    const hour = this.game.time.hour;
    if (hour < shop.openHour || hour >= shop.closeHour) {
      this.game.ui.toast('现在没有营业。');
      return;
    }
    this.game.dialogue.startShop(shop);
  }

  toggleLamp(d) {
    const on = !d.on;
    d.on = on;
    if (d.light) d.light.intensity = on ? 2 : 0;
    this.game.ui.toast(on ? '灯亮了。' : '灯灭了。');
  }
}
