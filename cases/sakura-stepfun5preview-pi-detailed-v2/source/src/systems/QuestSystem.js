// 任务系统：小镇委托核心循环
import * as THREE from 'three';
import { QUEST_DEFS } from '../data/quests.js';
import { itemName } from '../data/items.js';
import { LOCATIONS } from '../world/Layout.js';
import { getMaterials } from '../core/Materials.js';

const M = () => getMaterials();

export class QuestSystem {
  constructor(game) {
    this.game = game;
    this.active = [];       // { def, stage }
    this.completed = [];    // id[]
    this.markers = [];      // { mesh, questId, stage }
    this.boardOpen = false;
  }

  isActive(id) { return this.active.some((q) => q.def.id === id); }
  isCompleted(id) { return this.completed.includes(id); }

  /** 新游戏：清空任务状态 */
  reset() {
    for (const m of this.markers) {
      this.game.scene.remove(m.mesh);
      m.mesh.geometry.dispose();
    }
    this.markers = [];
    this.active = [];
    this.completed = [];
    this.boardOpen = false;
  }

  /** 可接取的委托（满足条件且未接取/未完成） */
  available() {
    return QUEST_DEFS.filter((d) => {
      if (this.isActive(d.id) || this.isCompleted(d.id)) return false;
      return d.condition ? d.condition(this.game) : true;
    });
  }

  start(id) {
    if (this.isActive(id) || this.isCompleted(id)) return false;
    const def = QUEST_DEFS.find((d) => d.id === id);
    if (!def) return false;
    if (def.condition && !def.condition(this.game)) return false;
    this.active.push({ def, stage: 0 });
    this.game.ui.toast(`接受委托：${def.title}`);
    this.game.audio.itemGet();
    this.refreshMarkers();
    this.game.ui.refreshTracker();
    return true;
  }

  restore(id, stage) {
    const def = QUEST_DEFS.find((d) => d.id === id);
    if (!def) return;
    this.active.push({ def, stage: stage || 0 });
  }

  complete(id) {
    const idx = this.active.findIndex((q) => q.def.id === id);
    if (idx < 0) return;
    const { def } = this.active[idx];
    this.active.splice(idx, 1);
    this.completed.push(id);
    // 奖励
    if (def.reward) {
      if (def.reward.coins) {
        this.game.coins += def.reward.coins;
        this.game.ui.toast(`获得 ￥${def.reward.coins}`);
      }
      if (def.reward.trust) {
        for (const [k, v] of Object.entries(def.reward.trust)) this.game.bump(k, v);
      }
      if (def.reward.item) this.game.addItem(def.reward.item, itemName(def.reward.item));
    }
    if (def.doneText) this.game.ui.toast(def.doneText);
    this.game.audio.fanfare();
    this.refreshMarkers();
    this.game.ui.refreshTracker();
    this.game.ui.refreshQuestLog();
    // 完成任务的连锁：解锁新地点提示
    if (id === 'festival_prep') this.game.setFlag('festival', true);
  }

  notify(id) {
    const q = this.active.find((a) => a.def.id === id);
    if (q) this.checkQuest(q);
  }

  update(dt) {
    for (const q of [...this.active]) this.checkQuest(q);
    // 标记动画
    const t = performance.now() * 0.001;
    for (const m of this.markers) {
      m.mesh.rotation.y = t * 1.6;
      m.mesh.position.y = m.baseY + Math.sin(t * 2.2 + m.phase) * 0.18;
    }
    // 夜晚 + 庙会 → 夜樱任务可接
    if (this.game.flags.festival && this.game.time.isNight && !this.isActive('night_sakura') && !this.isCompleted('night_sakura')) {
      if (this.game.flags.nightSakuraPrompt !== this.game.time.day) {
        this.game.flags.nightSakuraPrompt = this.game.time.day;
        this.game.ui.toast('夜色中的神社亮着灯笼……去看看吗？');
      }
    }
  }

  checkQuest(q) {
    const stage = q.def.stages[q.stage];
    if (!stage) { this.complete(q.def.id); return; }
    if (stage.check(this.game)) {
      q.stage++;
      this.game.ui.refreshTracker();
      if (q.stage >= q.def.stages.length) {
        this.complete(q.def.id);
      } else {
        const next = q.def.stages[q.stage];
        this.game.ui.toast(`委托更新：${next.text}`);
        this.refreshMarkers();
      }
    }
  }

  refreshMarkers() {
    // 清除旧标记
    for (const m of this.markers) {
      this.game.scene.remove(m.mesh);
      m.mesh.geometry.dispose();
    }
    this.markers = [];
    for (const q of this.active) {
      const stage = q.def.stages[q.stage];
      if (!stage || !stage.marker) continue;
      const loc = LOCATIONS[stage.marker];
      if (!loc) continue;
      const y = this.game.world.groundY(loc.x, loc.z);
      const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.3), M().neonPink);
      mesh.position.set(loc.x, y + 2.4, loc.z);
      this.game.scene.add(mesh);
      this.markers.push({ mesh, questId: q.def.id, stage: q.stage, baseY: y + 2.4, phase: Math.random() * 6 });
    }
    this.game.ui.refreshMinimapMarkers();
  }

  /** 打开公告板 */
  openBoard() {
    if (this.boardOpen) return;
    this.boardOpen = true;
    const avail = this.available();
    const entries = avail.map((d) => ({
      text: `【${d.giver ? this.npcName(d.giver) : '公告'}】${d.title}`,
      desc: d.desc,
      value: d.id,
    }));
    entries.push({ text: '现在不看', desc: '', value: null });
    this.game.ui.panel('樱花町 公告板', entries).then((id) => {
      this.boardOpen = false;
      if (id) this.start(id);
    });
  }

  npcName(id) {
    const npc = this.game.npcs?.npcs.find((n) => n.id === id);
    return npc ? npc.name : id;
  }
}
