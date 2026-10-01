// NPC：作息驱动的行为 + 路网寻路 + 简单的社会反应
import * as THREE from 'three';
import { createCharacter } from './character.js';
import { heightAt, WATER_Y } from '../world/terrain.js';
import { TRACK, CROSSING, ANCHORS } from '../world/layout.js';
import { lerp, clamp, clamp01, damp, dampAngle, dist, TAU } from '../util/math.js';

const WALK = 1.32, RUN = 2.5;

// 各室内「门口」的室内侧落点（由 Town 写回的真实门位决定）
// 负 z = 店面入口一侧（与外观门朝向一致）
const DOOR_LOCAL = {
  konbini: { x: 0, z: -3.9 },
  cafe: { x: 0, z: -3.4 },
  station: { x: 0, z: 4.0 },
  house: { x: 0, z: 3.2 },
  kaikan: { x: 0, z: 4.6 },
};
function doorOf(id) {
  const a = ANCHORS[id] || ANCHORS[id + 'Door'];
  return a ? { x: a.x, z: a.z, local: DOOR_LOCAL[id] || { x: 0, z: 3 } } : null;
}

const HOME_SPOT = {
  'house-yoko': { x: -42, z: 40.2 },
  'house-kobayashi': { x: -54, z: 40.2 },
  'house-haruka': { x: -30, z: 40.2 },
  'house-m1': { x: -40, z: 56.4 },
  'house-m2': { x: -29, z: 56.4 },
};

export class NPC {
  constructor(def, scene, nav, opts = {}) {
    this.def = def;
    this.id = def.id;
    this.name = def.name;
    this.nav = nav;
    this.isBackground = !!opts.background;
    this.scale = opts.scale || 1;
    this.zone = 'world';
    this.affinity = 0;
    this.met = false;
    this.flags = {};
    this.rng = Math.random;

    this.char = createCharacter({ ...def.look, seed0: Math.random() * 6 });
    this.obj = this.char.root;
    this.obj.name = 'npc-' + def.id;
    this.obj.scale.setScalar(this.scale);
    scene.add(this.obj);

    this.pos = new THREE.Vector3();
    this.yaw = 0;
    this.state = 'idle';
    this.goal = null;
    this.leg = null;
    this.path = null;
    this.pathIdx = 0;
    this.speedNow = 0;
    this.activity = null;
    this._curTag = null;
    this.waitT = 0;
    this.zones = null;
  }

  get height() { return this.char.height; }
  get isHome() { return this.activity && (this.activity.act === 'sleep' || this.activity.act === 'sit'); }

  place(x, z, yaw = 0) {
    this.pos.set(x, heightAt(x, z), z);
    this.yaw = yaw; this.obj.rotation.y = yaw;
    this.obj.position.copy(this.pos);
  }

  resolveSpot(tag) {
    if (!tag) return { zone: 'world', pos: { x: this.pos.x, z: this.pos.z }, face: this.yaw };
    if (tag === 'home') {
      const p = HOME_SPOT[this.def.home] || { x: -42, z: 40 };
      return { zone: 'world', pos: p, face: 0 };
    }
    if (DOOR_LOCAL[tag]) return { zone: tag, pos: { x: 0, z: 2.5 }, face: Math.PI };
    if (tag === 'platform') return { zone: 'world', pos: { x: -6, z: TRACK.zAt(-6) + 6.3 }, face: 0, y: 1.05 };
    if (tag === 'school') return { zone: 'world', pos: { x: -80, z: 74.2 }, face: Math.PI };
    if (tag === 'shrine') return { zone: 'world', pos: { x: 24, z: -47.6 }, face: 0 };
    if (tag === 'lookout') return { zone: 'world', pos: { x: ANCHORS.lookout.x, z: ANCHORS.lookout.z + 0.6 }, face: Math.PI };
    if (tag === 'park:center') return { zone: 'world', pos: { x: -32, z: 72.5 }, face: 0 };
    let i = this.nav.indexByTag[tag];
    if (i === undefined && tag.startsWith('anchor:')) i = this.nav.indexByTag[tag];
    if (i !== undefined) {
      const n = this.nav.nodes[i];
      return { zone: 'world', pos: { x: n.x, z: n.z }, face: 0 };
    }
    return { zone: 'world', pos: { x: this.pos.x, z: this.pos.z }, face: this.yaw };
  }

  setGoal(tag, act = 'stand') {
    const s = this.resolveSpot(tag);
    this.goal = { ...s, act, tag };
    this.leg = null; this.path = null;
  }

  /** 规划下一段移动 */
  nextLeg() {
    const g = this.goal;
    if (!g) { this.leg = null; return; }
    if (g.zone === 'world' && this.zone === 'world') {
      const s = this.nav.nearest(this.pos.x, this.pos.z);
      const e = this.nav.nearest(g.pos.x, g.pos.z);
      const p = (s.i >= 0 && e.i >= 0) ? this.nav.path(s.i, e.i) : null;
      this.path = p && p.length > 1 ? p : null;
      this.pathIdx = 1;
      this.leg = this.path ? { kind: 'world' } : { kind: 'spot', target: { x: g.pos.x, z: g.pos.z } };
    } else if (g.zone === 'world') {
      const d = doorOf(this.zone);
      if (!d) { this.leg = null; return; }
      this.leg = { kind: 'spot', inZone: true, target: d.local, onDone: 'exitZone' };
    } else if (this.zone === 'world') {
      const d = doorOf(g.zone);
      if (!d) { this.leg = null; return; }
      this.leg = { kind: 'spot', target: { x: d.x, z: d.z }, onDone: 'enterZone' };
    } else {
      this.leg = { kind: 'spot', target: g.pos, onDone: 'arrive' };
    }
  }

  zoneOrigin() { return this.zones?.[this.zone]?.origin || { x: 0, z: 0 }; }
  toWorld(p) { const o = this.zoneOrigin(); return { x: o.x + p.x, z: o.z + p.z }; }
  fromWorld(p) { const o = this.zoneOrigin(); return { x: p.x - o.x, z: p.z - o.z }; }

  update(dt, ctx) {
    this.zones = ctx.zones;
    const act = this.currentActivity(ctx.time.hour, ctx);
    const tag = act.at || act.tag;
    if (tag !== this._curTag || act.act !== this._curAct) {
      this._curTag = tag; this._curAct = act.act;
      this.activity = act;
      this.setGoal(tag, act.act);
    }
    if (!this.leg) this.nextLeg();
    this.step(dt, ctx);
  }

  currentActivity(h, ctx) {
    const sch = this.def.schedule;
    // 下雨时优先去有遮蔽的地方（室内 / 屋檐下）
    const rain = ctx?.weather?.rain ?? 0;
    if (rain > 0.25 && this.def.rainTag) {
      const cur = this._pickSchedule(sch, h);
      const curTag = cur && (cur.at || cur.tag);
      // 注意：要丢掉原来的 at，只留 tag，否则 at 会盖掉新目的地
      if (cur && curTag !== this.def.rainTag && cur.act === 'walk') {
        return { tag: this.def.rainTag, act: 'walk' };
      }
    }
    if (!sch) {
      const p = this.def.period;
      const inP = p[0] <= p[1] ? (h >= p[0] && h <= p[1]) : (h >= p[0] || h <= p[1]);
      if (!inP) return { tag: this.def.loop[0], act: 'stand' };
      const span = Math.max(0.5, (p[1] - p[0] + 24) % 24 || 24);
      const t = (((h - p[0]) + 24) % 24);
      const idx = clamp(Math.floor(t / (span / this.def.loop.length)), 0, this.def.loop.length - 1);
      return { tag: this.def.loop[idx], act: 'walk' };
    }
    return this._pickSchedule(sch, h);
  }

  _pickSchedule(sch, h) {
    for (const s of sch) {
      const [a, b] = s.h;
      const inR = a <= b ? (h >= a && h < b) : (h >= a || h < b);
      if (inR) return s;
    }
    return sch[sch.length - 1];
  }

  step(dt, ctx) {
    const leg = this.leg;
    if (!leg) { this.state = 'idle'; this.apply(dt); return; }
    const g = this.goal;

    if (leg.kind === 'world' && this.path) {
      const n = this.nav.nodes[this.path[this.pathIdx]];
      if (!n) { this.path = null; this.leg = { kind: 'spot', target: { x: g.pos.x, z: g.pos.z } }; this.apply(dt); return; }
      if (dist(this.pos.x, this.pos.z, n.x, n.z) < 1.0) {
        this.pathIdx++;
        if (this.pathIdx >= this.path.length) {
          this.path = null; this.leg = { kind: 'spot', target: { x: g.pos.x, z: g.pos.z } };
        }
      } else {
        if (this.mustWaitForTrain(n, ctx)) { this.state = 'wait'; this.apply(dt); return; }
        this.moveTo(n.x, n.z, dt, ctx);
      }
    } else {
      const t = this.targetPoint(leg);
      const d = dist(this.pos.x, this.pos.z, t.x, t.z);
      if (d < (leg.inZone ? 0.55 : 0.5)) {
        this.onArrive(leg, ctx);
      } else {
        if (this.zone === 'world' && this.mustWaitForTrain(t, ctx)) { this.state = 'wait'; }
        else this.moveTo(t.x, t.z, dt, ctx, leg.inZone ? 0.75 : 1);
      }
    }

    // 到达最终目标后的行为
    if (!this.leg || this.leg.kind === 'spot') {
      if (this.goal && g.zone === this.zone) {
        const tp = this.targetPoint({ ...this.leg, target: g.pos });
        if (dist(this.pos.x, this.pos.z, tp.x, tp.z) < 1.0) {
          if (g.face !== undefined) this.yaw = dampAngle(this.yaw, g.face, 3, dt);
          this.state = g.act === 'sit' ? 'sit' : g.act === 'work' ? 'work' : 'idle';
          this.speedNow = 0;
        } else if (this.state !== 'wait') this.moveTo(tp.x, tp.z, dt, ctx, 0.6);
      }
    }
    this.apply(dt);
  }

  targetPoint(leg) {
    const interiorGoal = this.goal && this.goal.zone !== 'world' && this.goal.zone === this.zone;
    const t = leg.inZone ? leg.target
      : (leg.target || (this.goal && this.goal.zone !== 'world' ? this.goal.pos : null));
    if (!t) return { x: this.pos.x, z: this.pos.z };
    if (leg.inZone || interiorGoal) return this.toWorld(t);
    return t;
  }

  onArrive(leg, ctx) {
    if (leg.onDone === 'enterZone') {
      const d = doorOf(this.goal.zone);
      const o = this.zones[this.goal.zone]?.origin;
      if (d && o) {
        this.zone = this.goal.zone;
        this.pos.set(o.x + d.local.x, 0, o.z + d.local.z);
      }
      this.path = null; this.leg = null;
      this.nextLeg();
    } else if (leg.onDone === 'exitZone') {
      const d = doorOf(this.zone);
      if (d) { this.zone = 'world'; this.pos.set(d.x, heightAt(d.x, d.z), d.z); }
      this.path = null; this.leg = null;
      this.nextLeg();
    } else {
      this.path = null; this.leg = null;
    }
  }

  mustWaitForTrain(p, ctx) {
    if (!ctx.trainSystem || !ctx.trainSystem.crossingBusy) return false;
    if (this.zone !== 'world') return false;
    const t1 = this.pos.z - TRACK.zAt(this.pos.x);
    const t2 = p.z - TRACK.zAt(p.x);
    if (t1 * t2 < 0 && Math.abs(this.pos.x - CROSSING.x) < 15) return true;
    return false;
  }

  moveTo(tx, tz, dt, ctx, slow = 1) {
    const dx = tx - this.pos.x, dz = tz - this.pos.z;
    const len = Math.hypot(dx, dz) || 1;
    const base = this.isBackground ? WALK * 1.08 : (this.goal?.act === 'run' ? RUN : WALK);
    const sp = base * (this.def.speed ?? 1) * slow;
    const vx = (dx / len) * sp, vz = (dz / len) * sp;
    let nx = this.pos.x + vx * dt, nz = this.pos.z + vz * dt;
    if (this.zone === 'world') {
      const h0 = heightAt(this.pos.x, this.pos.z);
      if (Math.abs(heightAt(nx, nz) - h0) > 0.7 || heightAt(nx, nz) < WATER_Y - 1.0) {
        if (Math.abs(heightAt(nx, this.pos.z) - h0) <= 0.7 && heightAt(nx, this.pos.z) >= WATER_Y - 1.0) nz = this.pos.z;
        else if (Math.abs(heightAt(this.pos.x, nz) - h0) <= 0.7 && heightAt(this.pos.x, nz) >= WATER_Y - 1.0) nx = this.pos.x;
        else { this.state = 'idle'; this.speedNow = 0; return; }
      }
    }
    const res = ctx.collision.resolve(nx, nz, 0.3, this.pos.y, 2);
    const moved = Math.hypot(res.x - this.pos.x, res.z - this.pos.z);
    this.pos.x = res.x; this.pos.z = res.z;
    this.speedNow = sp;
    this.yaw = dampAngle(this.yaw, Math.atan2(vx, vz), 8, dt);
    this.state = moved > 1e-4 ? 'walk' : 'wait';

    // 卡住时沿侧向绕行
    this.stuckT = moved < 0.015 ? (this.stuckT || 0) + dt : 0;
    if (this.stuckT > 0.35) {
      this.stuckT = 0;
      this.detour = -(this.detour || 1);
      this.detourT = 1.1;
    }
    if (this.detourT > 0) {
      this.detourT -= dt;
      const px = -dz / len, pz = dx / len;
      const ex = tx - this.pos.x, ez = tz - this.pos.z;
      const el = Math.hypot(ex, ez) || 1;
      // 目标点向侧向偏一点
      this.pos.x += (px * this.detour) * sp * dt * 0.9;
      this.pos.z += (pz * this.detour) * sp * dt * 0.9;
    }
  }

  apply(dt) {
    if (this.zone === 'world') this.pos.y = damp(this.pos.y, heightAt(this.pos.x, this.pos.z), 16, dt);
    this.obj.position.copy(this.pos);
    this.obj.rotation.y = this.yaw;
    const sp = this.state === 'walk' ? this.speedNow : 0;
    this.char.setMode(this.state === 'sit' ? 'sit' : 'idle');
    this.char.update(dt, sp);
  }

  facePlayer(px, pz) {
    this.yaw = Math.atan2(px - this.pos.x, pz - this.pos.z);
    this.obj.rotation.y = this.yaw;
  }
  setPose(mode) { this.state = mode; }
}

/* ------------------------------------------------------------------ *
 *  管理器
 * ------------------------------------------------------------------ */
export class NPCManager {
  constructor(scene, nav, coreDefs, bgDefs) {
    this.list = [];
    this.byId = {};
    for (const d of coreDefs) {
      const n = new NPC(d, scene, nav, {});
      this.list.push(n); this.byId[d.id] = n;
    }
    for (const d of bgDefs) {
      const n = new NPC(d, scene, nav, { background: true, scale: d.scale || 1 });
      n.id = d.id;
      this.list.push(n); this.byId[d.id] = n;
    }
  }
  update(dt, ctx) {
    for (const n of this.list) n.update(dt, ctx);
  }
  /** 玩家正对着、且在范围内最合适的对话对象 */
  bestFacing(px, pz, fx, fz, maxDist = 3.2, zone = 'world') {
    let best = null, bestScore = -Infinity;
    for (const n of this.list) {
      if (n.zone !== zone) continue;
      const dx = n.pos.x - px, dz = n.pos.z - pz;
      const d = Math.hypot(dx, dz) || 1e-4;
      if (d > maxDist) continue;
      const dot = (dx * fx + dz * fz) / d;
      if (dot < -0.2) continue;
      const score = dot * 1.6 + (1 - d / maxDist);
      if (score > bestScore) { bestScore = score; best = n; }
    }
    return best;
  }

  /** 找到玩家附近可对话的人 */
  nearest(px, pz, maxDist = 3.2, zone = 'world') {
    let best = null, bd = maxDist;
    for (const n of this.list) {
      if (n.zone !== zone) continue;
      const d = Math.hypot(n.pos.x - px, n.pos.z - pz);
      if (d < bd) { bd = d; best = n; }
    }
    return best;
  }
  allInZone(zone) { return this.list.filter((n) => n.zone === zone); }
}
