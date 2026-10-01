/**
 * 居民：作息表 + 路网行走 + 站桩/干活/休息动作。
 * 作息按游戏内时间推进，切时段时会自己走去下一个点。
 */
import * as THREE from 'three';
import { angleDelta, clamp, damp, dampAngle } from '../core/utils.js';
import { buildCharacter } from './character.js';
import { NavGraph } from './nav.js';
import { buildingById, doorPosition } from '../world/layout.js';
import { heightAt } from '../world/terrain.js';

const D2R = Math.PI / 180;

/** 相对某建筑门口的偏移点（局部坐标：right=沿墙，out=朝街道） */
function atDoor(id, right = 0, out = 1.2) {
  const b = buildingById(id);
  if (!b) return { x: 0, z: 0 };
  const d = doorPosition(b);
  const rx = d.dirZ;
  const rz = -d.dirX;
  return { x: d.x + rx * right + d.dirX * out, z: d.z + rz * right + d.dirZ * out };
}
function atBuilding(id, right = 0, out = 1.2) {
  return atDoor(id, right, out);
}

export const NPC_DEFS = [
  {
    id: 'yamada', name: '山田 三郎', age: '老板', tag: '山田商店',
    look: { height: 1.63, skin: 0xe8c39f, shirt: 0xf2ece0, pants: 0x5a5f6b, hair: 0xb8b0a4, hairStyle: 'old', apron: 0x3f6f8f },
    home: 'store', work: 'store',
    schedule: [
      { from: 0, to: 6.2, act: 'sleep' },
      { from: 6.2, to: 6.8, act: 'goto', spot: () => atDoor('store', 0, 1.4) },
      { from: 6.8, to: 11.5, act: 'work', spot: () => atDoor('store', -1.4, 1.3), face: 90 * D2R },
      { from: 11.5, to: 12.4, act: 'goto', spot: () => atDoor('ramen', -0.6, 1.3) },
      { from: 12.4, to: 13.0, act: 'sit', spot: () => atDoor('ramen', -0.6, 1.6), face: 90 * D2R },
      { from: 13.0, to: 18.2, act: 'work', spot: () => atDoor('store', -1.4, 1.3), face: 90 * D2R },
      { from: 18.2, to: 18.8, act: 'goto', spot: () => ({ x: -9, z: 25 }) },
      { from: 18.8, to: 21.2, act: 'sit', spot: () => atDoor('izakaya', 0.4, 1.7), face: 90 * D2R },
      { from: 21.2, to: 22.2, act: 'sleep' },
    ],
  },
  {
    id: 'tanaka', name: '田中 花子', age: '主妇', tag: '田中家',
    look: { height: 1.6, skin: 0xf7d8bd, shirt: 0xe88fa8, pants: 0x8a7f9a, hair: 0x4a3a2e, hairStyle: 'bob' },
    home: 'h1', work: 'home',
    schedule: [
      { from: 0, to: 6.6, act: 'sleep' },
      { from: 6.6, to: 8.4, act: 'work', spot: () => ({ x: -21.5, z: 20.5 }), face: -20 * D2R },
      { from: 8.4, to: 9.0, act: 'goto', spot: () => atDoor('konbini', 0, 1.4) },
      { from: 9.0, to: 9.9, act: 'idle', spot: () => atDoor('konbini', 0.2, 1.6), face: 0 },
      { from: 9.9, to: 12.0, act: 'work', spot: () => ({ x: -21.5, z: 20.5 }), face: -20 * D2R },
      { from: 12.0, to: 12.7, act: 'goto', spot: () => atDoor('cafe', 0, 1.5) },
      { from: 12.7, to: 13.4, act: 'sit', spot: () => atDoor('cafe', 0, 2.0), face: 0 },
      { from: 13.4, to: 16.6, act: 'walk', loop: [[36, -46], [45, -57], [30, -56], [40, -48]], speed: 1.55 },
      { from: 16.6, to: 17.4, act: 'goto', spot: () => ({ x: -21.5, z: 20.5 }) },
      { from: 17.4, to: 18.6, act: 'work', spot: () => ({ x: -21.5, z: 20.5 }), face: -20 * D2R },
      { from: 18.6, to: 19.3, act: 'goto', spot: () => atDoor('izakaya', -0.6, 1.6) },
      { from: 19.3, to: 21.4, act: 'sit', spot: () => atDoor('izakaya', -0.6, 1.9), face: 90 * D2R },
      { from: 21.4, to: 22.4, act: 'sleep' },
    ],
  },
  {
    id: 'kobayashi', name: '小林 茂', age: '退休', tag: '老宅',
    look: { height: 1.55, skin: 0xe0bd9c, shirt: 0x6f8f6a, pants: 0x6a6250, hair: 0xd8d4cc, hairStyle: 'old', hat: true },
    home: 'h2', work: 'none',
    schedule: [
      { from: 0, to: 5.2, act: 'sleep' },
      { from: 5.2, to: 8.4, act: 'fish', spot: () => ({ x: 18.4, z: -66.6 }), face: 0 },
      { from: 8.4, to: 9.2, act: 'goto', spot: () => ({ x: -47, z: -41 }) },
      { from: 9.2, to: 10.0, act: 'pray', spot: () => ({ x: -53.4, z: -45.4 }), face: 200 * D2R },
      { from: 10.0, to: 16.4, act: 'walk', loop: [[0, -6], [6, 14], [20, 14], [36, -46], [-20, 14], [-6, -34], [0, 38], [-30, 38]], speed: 1.35 },
      { from: 16.4, to: 17.2, act: 'goto', spot: () => atDoor('izakaya', -1.6, 1.7) },
      { from: 17.2, to: 20.2, act: 'sit', spot: () => atDoor('izakaya', -1.6, 2.0), face: 90 * D2R },
      { from: 20.2, to: 21.2, act: 'sleep' },
    ],
  },
  {
    id: 'misaki', name: '樱花 美咲', age: '学生', tag: '樱花学园',
    look: { height: 1.42, skin: 0xfbdcc4, shirt: 0x4a7fa5, pants: 0x3a4a5e, hair: 0x2f2a33, hairStyle: 'ponytail', accent: 0xf6bccb, scarf: 0xe8808a },
    home: 'home', work: 'school',
    schedule: [
      { from: 0, to: 7.2, act: 'sleep' },
      { from: 7.2, to: 8.2, act: 'goto', spot: () => ({ x: 54, z: 26 }) },
      { from: 8.2, to: 15.0, act: 'work', spot: () => ({ x: 45, z: 24.5 }), face: 200 * D2R },
      { from: 15.0, to: 15.8, act: 'goto', spot: () => atDoor('konbini', 0, 1.4) },
      { from: 15.8, to: 16.4, act: 'idle', spot: () => atDoor('konbini', 0.3, 1.7) },
      { from: 16.4, to: 17.6, act: 'play', spot: () => ({ x: 44, z: 21 }), face: 0 },
      { from: 17.6, to: 18.2, act: 'goto', spot: () => ({ x: 0, z: 6 }) },
      { from: 18.2, to: 21.6, act: 'idle', spot: () => ({ x: -9, z: -2 }), face: 90 * D2R },
      { from: 21.6, to: 22.4, act: 'sleep' },
    ],
    weekend: [
      { from: 0, to: 8.0, act: 'sleep' },
      { from: 8.0, to: 11.0, act: 'play', spot: () => ({ x: 44, z: 21 }), face: 0 },
      { from: 11.0, to: 12.0, act: 'walk', loop: [[36, -46], [45, -57], [30, -56]], speed: 2.0 },
      { from: 12.0, to: 18.0, act: 'play', spot: () => ({ x: 38, z: -50 }), face: 0 },
      { from: 18.0, to: 21.0, act: 'idle', spot: () => ({ x: -9, z: -2 }), face: 90 * D2R },
      { from: 21.0, to: 22.0, act: 'sleep' },
    ],
  },
  {
    id: 'kenji', name: '健一', age: '站员', tag: '樱花站',
    look: { height: 1.74, skin: 0xeec6a4, shirt: 0x3a6b8a, pants: 0x38414e, hair: 0x2f2a2a, hairStyle: 'short', cap: true, accent: 0x2f5f7a },
    home: 'izakaya', work: 'station',
    schedule: [
      { from: 0, to: 6.0, act: 'sleep' },
      { from: 6.0, to: 7.2, act: 'goto', spot: () => ({ x: -43, z: 41 }) },
      { from: 7.2, to: 17.0, act: 'work', spot: () => ({ x: -46, z: 45 }), face: 180 * D2R },
      { from: 17.0, to: 17.7, act: 'goto', spot: () => atDoor('izakaya', 0.6, 1.6) },
      { from: 17.7, to: 20.6, act: 'sit', spot: () => atDoor('izakaya', 0.6, 1.9), face: 90 * D2R },
      { from: 20.6, to: 21.6, act: 'sleep' },
    ],
  },
  {
    id: 'koyo', name: '小夜', age: '店主', tag: '拉面 一龙',
    look: { height: 1.66, skin: 0xf2cfae, shirt: 0xe9dcc6, pants: 0x4a4a52, hair: 0x3a2e2a, hairStyle: 'ponytail', apron: 0xb5452f },
    home: 'h3', work: 'ramen',
    schedule: [
      { from: 0, to: 8.0, act: 'sleep' },
      { from: 8.0, to: 8.8, act: 'goto', spot: () => atDoor('ramen', 1.2, 1.3) },
      { from: 8.8, to: 21.0, act: 'work', spot: () => atDoor('ramen', 1.4, 1.4), face: 90 * D2R },
      { from: 21.0, to: 22.2, act: 'sleep' },
    ],
  },
  {
    id: 'yui', name: '结衣', age: '咖啡店员', tag: '星光咖啡',
    look: { height: 1.62, skin: 0xfbdcc4, shirt: 0xb8823f, pants: 0x5a4a42, hair: 0x6a4a3a, hairStyle: 'long', apron: 0x6b8f5e },
    home: 'h4', work: 'cafe',
    schedule: [
      { from: 0, to: 8.2, act: 'sleep' },
      { from: 8.2, to: 9.0, act: 'goto', spot: () => atDoor('cafe', 0, 1.5) },
      { from: 9.0, time: 12.6, act: 'work', spot: () => atDoor('cafe', -1.6, 1.5), face: 0 },
      { from: 12.6, to: 13.4, act: 'sit', spot: () => atDoor('cafe', 1.6, 2.0), face: 0 },
      { from: 13.4, to: 17.4, act: 'work', spot: () => atDoor('cafe', -1.6, 1.5), face: 0 },
      { from: 17.4, to: 18.4, act: 'walk', loop: [[30, -8], [38, -50], [20, 14], [0, -6]], speed: 1.65 },
      { from: 18.4, to: 18.9, act: 'goto', spot: () => atDoor('izakaya', 1.4, 1.6) },
      { from: 18.9, to: 20.6, act: 'sit', spot: () => atDoor('izakaya', 1.4, 1.9), face: 90 * D2R },
      { from: 20.6, to: 21.6, act: 'sleep' },
    ],
  },
  {
    id: 'sora', name: '空', age: '农户', tag: '南边农舍',
    look: { height: 1.58, skin: 0xdcae86, shirt: 0x6f8f6a, pants: 0x6a5a4a, hair: 0x4a3a2a, hairStyle: 'cap', accent: 0xc0a04a },
    home: 'farm', work: 'field',
    schedule: [
      { from: 0, to: 5.4, act: 'sleep' },
      { from: 5.4, to: 11.0, act: 'work', spot: () => ({ x: 30, z: 80 }), face: 90 * D2R },
      { from: 11.0, to: 11.9, act: 'goto', spot: () => atDoor('store', 1.4, 1.4) },
      { from: 11.9, to: 12.6, act: 'idle', spot: () => atDoor('store', 1.4, 1.7) },
      { from: 12.6, to: 17.6, act: 'work', spot: () => ({ x: 34, z: 82 }), face: 200 * D2R },
      { from: 17.6, to: 18.4, act: 'goto', spot: () => ({ x: -18, z: 86 }) },
      { from: 18.4, to: 21.0, act: 'sit', spot: () => ({ x: -18, z: 86 }), face: 180 * D2R },
      { from: 21.0, to: 22.0, act: 'sleep' },
    ],
  },
];

const ACT_TO_ANIM = {
  work: { working: true },
  pray: { sitting: true },
  fish: { working: true },
  sit: { sitting: true },
  sleep: { sleeping: true },
  play: { talking: true },
  talk: { talking: true },
  idle: {},
  walk: {},
  goto: {},
};

export class NPC {
  constructor(def, scene, nav, audio) {
    this.def = def;
    this.nav = nav;
    this.audio = audio;
    const look = { ...def.look };
    if (look.cap) look.hairStyle = 'cap';
    this.mesh = buildCharacter(look);
    this.mesh.name = `npc_${def.id}`;
    scene.add(this.mesh);
    this.anim = this.mesh.userData.anim;
    this.pos = new THREE.Vector3();
    this.yaw = 0;
    this.speed = 0;
    this.path = null;
    this.pathIndex = 0;
    this.act = 'idle';
    this.faceYaw = null;
    this.currentKey = '';
    this.visible = true;
    this.walkLoop = null;
    this.loopIndex = 0;
    this.homeSpot = null;
    this.talkCooldown = 0;
    this.known = false;
    this.quest = null;
    this.greeted = false;
    this.hidden = false;
  }

  get name() {
    return this.def.name;
  }

  place(x, z) {
    this.pos.set(x, heightAt(x, z), z);
    this.mesh.position.copy(this.pos);
  }

  currentSchedule(hour, weekend) {
    const list = weekend && this.def.weekend ? this.def.weekend : this.def.schedule;
    for (const item of list) {
      if (hour >= item.from && hour < item.to) return item;
    }
    return list[list.length - 1];
  }

  setAct(act) {
    if (this.act === act) return;
    this.act = act;
    if (act === 'sleep') {
      this.path = null;
      this.walkLoop = null;
    }
    this.mesh.visible = !this.hidden && act !== 'sleep';
  }

  goTo(x, z, speed = 1.95) {
    const p = this.nav.findPath(this.pos.x, this.pos.z, x, z);
    this.path = p;
    this.pathIndex = 0;
    this.walkSpeed = speed;
    this.walkLoop = null;
    this.faceYaw = null;
  }

  setWalkLoop(loop, speed) {
    if (this.walkLoop === loop) return;
    this.walkLoop = loop;
    this.loopIndex = 0;
    this.path = null;
    this.walkSpeed = speed;
    this.faceYaw = null;
  }

  update(dt, ctx) {
    const hour = ctx.hour;
    const weekend = ctx.weekend;
    const item = this.currentSchedule(hour, weekend);
    const key = `${item.act}:${item.spot ? JSON.stringify(item.spot()) : ''}:${item.loop ? 'loop' : ''}`;
    if (key !== this.currentKey) {
      this.currentKey = key;
      this.applySchedule(item);
    }

    this.mesh.visible = !this.hidden;
    if (this.act === 'sleep') {
      this.speed = 0;
      this.anim.update(dt, { speed: 0, sleeping: true });
      this.mesh.visible = false;
      return;
    }

    // ---- 移动 ----
    if (this.walkLoop) {
      const target = this.walkLoop[this.loopIndex % this.walkLoop.length];
      const d = Math.hypot(target[0] - this.pos.x, target[1] - this.pos.z);
      if (d < 1.2) {
        this.loopIndex++;
      } else {
        this._stepToward(target[0], target[1], dt);
      }
    } else if (this.path && this.pathIndex < this.path.length) {
      const wp = this.path[this.pathIndex];
      const d = Math.hypot(wp.x - this.pos.x, wp.z - this.pos.z);
      if (d < 0.55) {
        this.pathIndex++;
      } else {
        this._stepToward(wp.x, wp.z, dt);
      }
      if (this.pathIndex >= this.path.length) {
        this.path = null;
        this.speed = damp(this.speed, 0, 10, dt);
      }
    } else {
      this.speed = damp(this.speed, 0, 10, dt);
    }

    // ---- 动画 ----
    const anim = ACT_TO_ANIM[this.act] || {};
    this.anim.update(dt, {
      speed: this.speed,
      sitting: !!anim.sitting,
      working: !!anim.working,
      talking: !!anim.talking,
    });
    if (this.faceYaw !== null && this.speed < 0.15) {
      this.yaw = dampAngle(this.yaw, this.faceYaw, 5, dt);
    }
    this.mesh.position.set(this.pos.x, heightAt(this.pos.x, this.pos.z), this.pos.z);
    this.mesh.rotation.y = this.yaw;

    if (this.talkCooldown > 0) this.talkCooldown -= dt;
  }

  applySchedule(item) {
    if (item.act === 'sleep') {
      this.setAct('sleep');
      const home = this.def.home;
      const b = buildingById(home);
      if (b) this.place(b.x, b.z);
      return;
    }
    if (item.loop) {
      this.setAct(item.act);
      this.setWalkLoop(item.loop, item.speed || 1.2);
      // 立刻寻路到循环起点
      if (!this.path && !this.walkLoop) return;
      return;
    }
    if (item.spot) {
      const s = item.spot();
      this.faceYaw = item.face !== undefined ? item.face : null;
      if (Math.hypot(s.x - this.pos.x, s.z - this.pos.z) < 0.7) {
        this.setAct(item.act);
        this.path = null;
        this.walkLoop = null;
      } else {
        this.setAct('walk');
        this.goTo(s.x, s.z, item.act === 'walk' ? 2.0 : 2.2);
        this.pendingAct = item.act;
        this.pendingFace = this.faceYaw;
      }
    }
  }

  _stepToward(tx, tz, dt) {
    const dx = tx - this.pos.x;
    const dz = tz - this.pos.z;
    const d = Math.hypot(dx, dz) || 1;
    const sp = this.walkSpeed || 1.45;
    this.speed = damp(this.speed, sp, 6, dt);
    this.pos.x += (dx / d) * this.speed * dt;
    this.pos.z += (dz / d) * this.speed * dt;
    this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 7, dt);
    if (this.pendingAct && !this.path && !this.walkLoop) {
      this.setAct(this.pendingAct);
      if (this.pendingFace !== null && this.pendingFace !== undefined) this.faceYaw = this.pendingFace;
      this.pendingAct = null;
    }
  }

  /** 面向玩家 */
  faceTowards(x, z) {
    this.faceYaw = Math.atan2(x - this.pos.x, z - this.pos.z);
  }

  say(kind) {
    if (this.talkCooldown > 0) return;
    this.talkCooldown = 6 + Math.random() * 5;
    this.anim.setFace(kind || 'happy');
    setTimeout(() => this.anim.setFace('normal'), 2200);
  }
}

export class NPCManager {
  constructor(scene, audio) {
    this.nav = new NavGraph();
    this.list = NPC_DEFS.map((d) => new NPC(d, scene, this.nav, audio));
    this.byId = new Map(this.list.map((n) => [n.def.id, n]));
    this.group = scene;
  }

  update(dt, ctx) {
    for (const npc of this.list) npc.update(dt, ctx);
  }

  /** 找到一定范围内、可以对话的 NPC */
  nearest(x, z, maxDist = 3.4) {
    let best = null;
    let bd = maxDist;
    for (const n of this.list) {
      if (!n.mesh.visible) continue;
      const d = Math.hypot(n.pos.x - x, n.pos.z - z);
      if (d < bd) {
        bd = d;
        best = n;
      }
    }
    return best;
  }
}
