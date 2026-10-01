// NPC 管理：作息更新、交谈、信任度、猫咪
import * as THREE from 'three';
import { NPC_DEFS, CAT_SPOTS } from '../data/npcs.js';
import { Npc } from './NPC.js';
import { getMaterials } from '../core/Materials.js';
import { heightAt } from '../world/Terrain.js';
import { rand, pick, damp, dampAngle, clamp } from '../core/Utils.js';

const M = () => getMaterials();

/** 猫咪 */
class Cat {
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    const fur = new THREE.MeshToonMaterial({ color: '#d9a06e' });
    fur.gradientMap = M().paper.gradientMap;
    const white = new THREE.MeshToonMaterial({ color: '#f4f1e8' });
    white.gradientMap = M().paper.gradientMap;
    this.body = new THREE.Mesh(new THREE.SphereGeometry(0.24, 9, 7), fur);
    this.body.scale.set(1.35, 0.85, 0.9);
    this.body.position.y = 0.26;
    this.group.add(this.body);
    this.head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 9, 7), fur);
    this.head.position.set(0.3, 0.42, 0);
    this.group.add(this.head);
    for (const s of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.1, 4), fur);
      ear.position.set(0.28, 0.55, s * 0.06);
      this.group.add(ear);
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.02), M().black);
      eye.position.set(0.42, 0.44, s * 0.06);
      this.group.add(eye);
    }
    this.tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.4, 5), fur);
    this.tail.position.set(-0.34, 0.36, 0);
    this.tail.rotation.z = 0.8;
    this.group.add(this.tail);
    this.group.traverse((m) => { if (m.isMesh) m.castShadow = true; });
    this.pos = new THREE.Vector3(60, 0, 64);
    this.target = new THREE.Vector3(60, 0, 64);
    this.timer = 2;
    this.waitT = 0;
    this.group.position.copy(this.pos);
    game.scene.add(this.group);
  }

  update(dt) {
    this.timer -= dt;
    if (this.timer <= 0 && this.waitT <= 0) {
      if (Math.random() < 0.4) { this.waitT = rand(2, 6); }
      else {
        const spot = pick(CAT_SPOTS);
        this.target.set(spot.x, 0, spot.z);
        this.timer = rand(4, 9);
      }
    }
    if (this.waitT > 0) {
      this.waitT -= dt;
      // 坐下/舔毛
      this.body.position.y = 0.24;
      this.tail.rotation.z = 0.8 + Math.sin(performance.now() * 0.004) * 0.35;
    } else {
      this.body.position.y = 0.26;
      const dx = this.target.x - this.pos.x, dz = this.target.z - this.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.2) {
        const sp = 0.7 * dt;
        this.pos.x += (dx / d) * sp;
        this.pos.z += (dz / d) * sp;
        this.group.rotation.y = dampAngle(this.group.rotation.y, Math.atan2(dx, dz), 6, dt);
        this.body.position.y = 0.26 + Math.abs(Math.sin(performance.now() * 0.012)) * 0.03;
        this.tail.rotation.z = 0.8 + Math.sin(performance.now() * 0.01) * 0.3;
      }
    }
    this.pos.y = heightAt(this.pos.x, this.pos.z);
    this.group.position.copy(this.pos);
  }
}

export class NpcManager {
  constructor(game) {
    this.game = game;
    this.npcs = NPC_DEFS.map((def) => new Npc(def, game));
    this.cat = new Cat(game);

    // 猫咪交互
    game.interactables.push({
      pos: new THREE.Vector3(this.cat.pos.x, 0.5, this.cat.pos.z),
      radius: 2.0,
      label: () => '摸摸猫', prompt: () => '摸摸猫',
      enabled: () => true,
      onUse: () => {
        this.game.audio.purr();
        this.game.ui.toast('猫咕噜咕噜地蹭了过来');
        this.game.bump('suzuki', 1);
        if (this.game.quests.isActive('cat')) {
          this.game.quests.notify('cat');
          this.game.addItem('catFound', '找到的猫');
          this.game.ui.toast('找到了！带奶奶去看它吧');
        }
      },
      dynamic: () => this.cat.pos,
    });
  }

  update(dt) {
    const g = this.game;
    const hour = g.time.hours;
    const raining = g.weather.raining;
    for (const npc of this.npcs) npc.update(dt, hour, raining);
    this.cat.update(dt);
  }

  /** 找最近的可交谈 NPC */
  nearest(pos, maxDist = 2.4) {
    let best = null, bestD = maxDist;
    for (const npc of this.npcs) {
      if (!npc.visible) continue;
      const d = Math.hypot(npc.pos.x - pos.x, npc.pos.z - pos.z);
      if (d < bestD) { bestD = d; best = npc; }
    }
    return best;
  }

  talk(id) {
    const npc = this.npcs.find((n) => n.id === id);
    if (!npc) return;
    const g = this.game;
    const lines = npc.def.talk(g);
    g.ui.say(`${npc.name}（${npc.def.title}）`, lines).then(() => {
      if (!g.met[id]) {
        g.met[id] = true;
        g.bump(id, 5);
        g.ui.toast(`认识了 ${npc.name}`);
      } else {
        g.bump(id, 1);
      }
    });
  }

  /** 与最近的 NPC 对话（玩家按 E 时调用） */
  talkToNearest(pos) {
    const near = this.nearest(pos, 2.6);
    if (!near) return false;
    if (near.npc) { this.talk(near.npc.id); return true; }
    return false;
  }

  bump(id, amount) {
    if (!id || id === 'all') return;
    this.game.trust[id] = Math.min(100, (this.game.trust[id] || 0) + amount);
  }

  /** 庙会等场合：让指定 NPC 聚到某处 */
  gather(x, z, ids) {
    for (const npc of this.npcs) {
      if (!ids.includes(npc.id)) continue;
      npc.override = { t: 99, x: x + rand(-2.5, 2.5), z: z + rand(-2.5, 2.5) };
    }
  }

  /** 解除聚集（新的一天） */
  clearGather() {
    for (const npc of this.npcs) npc.override = null;
  }

  /** 把猫叫到某处（事件用） */
  summonCat(x, z) {
    this.cat.target.set(x, 0, z);
    this.cat.pos.set(x, 0, z);
    this.cat.waitT = 0;
  }
}
