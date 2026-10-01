// 铁路系统：轨道、道口（警报+栏杆联动）、信号、隧道口、列车运行状态机
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, canvasTexture, rand, clamp, damp, lerp, TAU, pick,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import { sign, bench, trashBin, vendingMachine, stoneLantern } from './Buildings.js';
import { RAIL_Z, CROSSING_X, STATION_X } from './Layout.js';
import { heightAt } from './Terrain.js';

const M = () => getMaterials();

const PORTAL_X = 122;      // 隧道口位置
const TRAIN_LEN = 22.4;    // 两节车厢
const STOP_X = 0;          // 停车点（车站中心）
const RESET_X = 145;       // 复位点（隧道内）

/* ==================== 轨道 ==================== */

function buildTrack(ctx) {
  const g = new THREE.Group();
  // 道砟
  addBox(g, M().dirt, PORTAL_X * 2, 0.14, 7.5, 0, 0.07, RAIL_Z, { uv: 0.3, cast: false });
  // 轨枕（实例化）
  const sleeperGeo = new THREE.BoxGeometry(0.24, 0.18, 2.5);
  const count = Math.floor((PORTAL_X * 2) / 0.62);
  const sleepers = new THREE.InstancedMesh(sleeperGeo, M().woodDark, count);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1), pv = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    pv.set(-PORTAL_X + i * 0.62, 0.16, RAIL_Z);
    m4.compose(pv, q, sc);
    sleepers.setMatrixAt(i, m4);
  }
  sleepers.instanceMatrix.needsUpdate = true;
  g.add(sleepers);
  // 钢轨
  for (const rz of [-1.2, 1.2]) {
    const rail = addBox(g, M().steel, PORTAL_X * 2, 0.16, 0.14, 0, 0.26, RAIL_Z + rz, { cast: false });
    rail.material = M().steel;
  }
  // 轨道碰撞（道口处留口）
  const zMin = RAIL_Z - 3.6, zMax = RAIL_Z + 3.7;
  ctx.colliders.push({ minX: -PORTAL_X, maxX: CROSSING_X - 3.2, minZ: zMin, maxZ: zMax });
  ctx.colliders.push({ minX: CROSSING_X + 3.2, maxX: PORTAL_X, minZ: zMin, maxZ: zMax });

  // 北侧护栏（道口处断开）
  for (const [x0, x1] of [[-PORTAL_X, CROSSING_X - 6], [CROSSING_X + 6, PORTAL_X]]) {
    for (let x = x0; x < x1; x += 3) {
      addCyl(g, M().steelDark, 0.06, 0.06, 1.0, x + 1.5, 0.5, RAIL_Z - 4.6, { seg: 5 });
    }
    addBox(g, M().steelDark, x1 - x0, 0.07, 0.07, (x0 + x1) / 2, 0.95, RAIL_Z - 4.6, { cast: false });
    addBox(g, M().steelDark, x1 - x0, 0.07, 0.07, (x0 + x1) / 2, 0.6, RAIL_Z - 4.6, { cast: false });
  }
  // 西侧站外护栏
  for (let x = -PORTAL_X; x < -24; x += 3) addCyl(g, M().steelDark, 0.06, 0.06, 1.0, x + 1.5, 0.5, RAIL_Z + 4.4, { seg: 5 });

  // 隧道口
  for (const s of [-1, 1]) {
    const px = s * PORTAL_X;
    // 口部框架
    addBox(g, M().concrete, 3.0, 7.5, 1.2, px, 3.75, RAIL_Z - 5.6, { cast: true });
    addBox(g, M().concrete, 3.0, 7.5, 1.2, px, 3.75, RAIL_Z + 5.6, { cast: true });
    addBox(g, M().concrete, 1.4, 7.5, 12.4, px, 3.75, RAIL_Z, { cast: true });
    addBox(g, M().concrete, 2.2, 1.0, 12.0, px, 7.6, RAIL_Z, { cast: true });
    // 黑暗隧道内部
    const dark = addBox(g, M().black, 2.4, 6.4, 10.4, px + s * 1.6, 3.2, RAIL_Z, { cast: false });
    dark.material = new THREE.MeshBasicMaterial({ color: 0x05070c });
    // 洞口野草
    for (let i = 0; i < 6; i++) {
      addSphere(g, M().grassDry, rand(0.3, 0.7), px + s * rand(-1, 1), rand(0.2, 1.2), RAIL_Z + rand(-6, 6), { seg: 5, sy: 0.6 });
    }
    // 隧道铭牌
    sign(g, s < 0 ? '桜ヶ岳' : 'みさき', px, 6.6, RAIL_Z - 6.3, 0, { w: 2.0, h: 0.5, bg: '#f7f3ea', fg: '#2b3a67' });
  }

  ctx.scene.add(g);
  return { group: g };
}

/* ==================== 道口 ==================== */

function buildCrossing(ctx) {
  const g = new THREE.Group();
  const x = CROSSING_X, z = RAIL_Z;
  // 路面（道口板）
  addBox(g, M().concrete, 8.0, 0.06, 8.0, x, 0.1, z, { cast: false });
  // 停止线
  for (const s of [-1, 1]) addBox(g, M().white, 6.0, 0.03, 0.3, x, 0.13, z + s * 4.6, { cast: false });
  // 警报灯
  const lamps = [];
  for (const s of [-1, 1]) {
    addCyl(g, M().steelDark, 0.09, 0.09, 2.6, x + s * 4.6, 1.3, z - 4.4, { seg: 6 });
    const lamp = addSphere(g, M().woodRed, 0.16, x + s * 4.6, 2.7, z - 4.4, { seg: 7 });
    lamps.push(lamp);
  }
  // 栏杆（两片，旋转下落）
  const gates = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(x, 0, z + s * 4.2);
    const arm = addBox(pivot, M().white, 7.4, 0.16, 0.12, -s * 3.7, 1.0, 0);
    for (let i = 0; i < 4; i++) addBox(pivot, M().woodRed, 0.5, 0.3, 0.2, -s * (0.9 + i * 1.9), 0.85, 0);
    pivot.userData.dir = s;
    g.add(pivot);
    gates.push(pivot);
  }
  // 遮断机机柱
  for (const s of [-1, 1]) addBox(g, M().woodRed, 0.4, 1.2, 0.4, x + s * 4.0, 0.6, z + s * 4.2);
  // 标识
  sign(g, '踏切', x, 2.2, z - 5.2, 0, { w: 0.9, h: 0.5, bg: '#d9a441', fg: '#fff' });
  sign(g, '警報機なし', x + 5.2, 2.2, z - 4.6, -Math.PI / 2, { w: 1.4, h: 0.36, bg: '#f7f3ea', fg: '#2b3a67' });
  // 路灯
  for (const s of [-1, 1]) {
    addCyl(g, M().steelDark, 0.07, 0.09, 4.0, x + s * 5.4, 2.0, z + s * 5.6, { seg: 6 });
    const bulb = addSphere(g, M().lampGlow, 0.18, x + s * 5.4, 4.1, z + s * 5.6, { seg: 6 });
    ctx.lights.push({ mesh: bulb, from: 17.4, to: 5.8 });
  }

  ctx.scene.add(g);
  return {
    group: g, lamps, gates, x, z,
    closed: false,
    /** t: 0 开 → 1 关 */
    update(dt, target) {
      this._t = this._t === undefined ? (target ? 1 : 0) : this._t + (target - this._t) * Math.min(1, 3.2 * dt);
      const t = this._t;
      for (const gate of gates) {
        gate.rotation.x = gate.userData.dir * t * 1.15;
      }
      const flashing = target && Math.floor(performance.now() / 380) % 2 === 0;
      for (const lamp of lamps) {
        lamp.material = flashing ? M().woodRed : M().glowWarm;
      }
      this.closed = t > 0.7;
    },
  };
}

/* ==================== 列车 ==================== */

function buildTrain(ctx) {
  const g = new THREE.Group();
  const doors = [];

  const carGeo = () => {
    const car = new THREE.Group();
    // 车体
    addBox(car, M().white, 2.7, 2.9, 11.0, 0, 1.75, 0, { cast: true });
    addBox(car, M().plasterBlue, 2.76, 0.5, 11.0, 0, 1.05, 0, { cast: true });
    addBox(car, M().white, 2.5, 0.5, 10.8, 0, 3.15, 0, { cast: true });
    addBox(car, M().sakuraDeep, 2.78, 0.12, 11.0, 0, 1.42, 0, { cast: false });
    // 窗
    for (const s of [-1, 1]) {
      for (let i = 0; i < 5; i++) {
        const win = addBox(car, M().glass, 0.06, 0.95, 1.5, s * 1.36, 2.05, -4.0 + i * 2.0, { cast: false });
        win.material = M().glass;
      }
    }
    // 夜间车内照明
    const inner = addBox(car, M().glowWarm, 2.4, 0.6, 9.6, 0, 2.0, 0, { cast: false });
    inner.material = new THREE.MeshBasicMaterial({ color: 0x2a2f3a, transparent: true, opacity: 0.0 });
    car.userData.inner = inner;
    // 门（每侧两扇）
    for (const s of [-1, 1]) {
      for (const dx of [-3.2, 3.2]) {
        const panel = addBox(car, M().steelDark, 0.7, 2.0, 1.3, s * 1.32, 1.6, dx, { cast: false });
        const win = addBox(car, M().glass, 0.05, 1.0, 1.0, s * 1.37, 1.9, dx, { cast: false });
        doors.push({ panel, win, side: s, offset: dx, car, open: 0 });
      }
    }
    // 转向架
    for (const dz of [-3.6, 3.6]) {
      addBox(car, M().black, 2.2, 0.6, 1.8, 0, 0.55, dz, { cast: true });
    }
    return car;
  };

  const car1 = carGeo(); car1.position.x = -5.7; g.add(car1);
  const car2 = carGeo(); car2.position.x = 5.7; g.add(car2);
  // 车头（东端）细节
  {
    const nose = new THREE.Group();
    nose.position.set(11.2, 0, 0);
    addBox(nose, M().white, 2.5, 2.4, 1.6, 0, 1.5, 0, { cast: true });
    const cab = addBox(nose, M().glass, 2.0, 0.9, 0.1, 0, 2.2, 0.8);
    cab.material = M().glass;
    for (const s of [-1, 1]) {
      const hl = addSphere(nose, M().glowWarm, 0.16, s * 0.8, 1.0, 0.85, { seg: 6 });
      nose.userData[`light${s}`] = hl;
    }
    addBox(nose, M().black, 1.6, 0.4, 0.1, 0, 2.9, 0.82);   // 方向幕
    g.add(nose);
    g.userData.nose = nose;
  }
  // 车头方向幕（用贴图）
  {
    const tex = canvasTexture(256, 64, (c, w, h) => {
      c.fillStyle = '#101820'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#ffd9a0';
      c.font = 'bold 40px "Hiragino Sans", "Noto Sans JP", sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('みさき', w / 2, h / 2 + 2);
    });
    const mat = new THREE.MeshBasicMaterial({ map: tex });
    const dest = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.36), mat);
    dest.position.set(11.2, 2.9, 0.89);
    g.add(dest);
  }
  // 西端（尾灯）
  for (const s of [-1, 1]) {
    const tl = addSphere(g, M().woodRed, 0.12, -11.2, 1.0, s * 0.9, { seg: 6 });
  }

  ctx.scene.add(g);

  const train = {
    group: g, doors,
    x: -RESET_X, speed: 0,
    state: 'wait',           // wait | approach | dock | leave
    stateT: 0,
    timeToNext: 40,
    delayed: false,
    doorOpen: 0,             // 0..1
    horned: false,
    get front() { return train.x + TRAIN_LEN / 2; },
    get tail() { return train.x - TRAIN_LEN / 2; },
    get stopped() { return train.state === 'dock'; },
    update(dt, ctxGame) {
      const t = train;
      t.stateT += dt;
      const CRUISE = 11;
      switch (t.state) {
        case 'wait': {
          t.timeToNext -= dt;
          if (t.timeToNext <= 0) { t.state = 'approach'; t.stateT = 0; t.horned = false; }
          break;
        }
        case 'approach': {
          // 从 -RESET_X 驶向车站，按距离平滑加减速，准确停靠
          const dist = Math.max(0, STOP_X - t.x);
          const desired = Math.min(CRUISE, Math.sqrt(2 * 1.15 * dist));
          if (t.speed < desired) t.speed = Math.min(desired, t.speed + 0.9 * dt);
          else t.speed = Math.max(desired, t.speed - 1.5 * dt);
          t.x += t.speed * dt;
          if (!t.horned && t.x > -60) { t.horned = true; ctxGame.audio.horn(); }
          if (dist <= 0.05 || t.x >= STOP_X) {
            t.x = STOP_X; t.speed = 0; t.state = 'dock'; t.stateT = 0;
            ctxGame.audio.brake();
          }
          break;
        }
        case 'dock': {
          // 开门 → 等待 → 关门
          if (t.stateT < 2.5) t.doorOpen = damp(t.doorOpen, 1, 3, dt);
          else if (t.stateT < 2.5 + (t.delayed ? 8 : 14)) t.doorOpen = 1;
          else if (t.stateT < 2.5 + (t.delayed ? 8 : 14) + 2.5) t.doorOpen = damp(t.doorOpen, 0, 3, dt);
          else { t.state = 'leave'; t.stateT = 0; }
          break;
        }
        case 'leave': {
          if (t.doorOpen > 0) t.doorOpen = damp(t.doorOpen, 0, 4, dt);
          t.speed = Math.min(CRUISE, t.speed + 0.8 * dt);
          t.x += t.speed * dt;
          if (t.x >= RESET_X) {
            t.x = -RESET_X; t.speed = 0; t.state = 'wait';
            t.timeToNext = t.delayed ? 26 : 38;
            t.stateT = 0;
          }
          break;
        }
      }
      // 位置与门动画
      g.position.x = t.x;
      for (const d of doors) {
        const target = t.doorOpen;
        d.open += (target - d.open) * Math.min(1, 4 * dt);
        d.panel.position.x = d.side * (1.32 - d.open * 0.62);
        d.win.position.x = d.side * (1.37 - d.open * 0.62);
      }
      // 夜间车内亮灯
      const night = ctxGame.time.isNight;
      for (const car of [car1, car2]) {
        car.userData.inner.material.opacity = night ? 0.55 : 0.0;
      }
      // 车头灯
      const nose = g.userData.nose;
      if (nose) {
        for (const s of [-1, 1]) {
          const on = night || t.state !== 'wait';
          nose.userData[`light${s}`].material = on ? M().glowWarm : M().lampOff;
        }
      }
    },
  };
  return train;
}

/* ==================== 信号机 ==================== */

function buildSignal(ctx) {
  const g = new THREE.Group();
  const x = -30, z = RAIL_Z + 5.2;
  addCyl(g, M().steelDark, 0.08, 0.08, 3.4, x, 1.7, z, { seg: 6 });
  addBox(g, M().black, 0.5, 0.9, 0.3, x, 3.2, z);
  const red = addSphere(g, M().woodRed, 0.13, x, 3.45, z + 0.16, { seg: 6 });
  const green = addSphere(g, M().leafGreen, 0.13, x, 3.0, z + 0.16, { seg: 6 });
  ctx.scene.add(g);
  return {
    update(train) {
      const stop = train.state === 'dock' || train.state === 'approach';
      red.material = stop ? M().woodRed : M().lampOff;
      green.material = stop ? M().lampOff : M().leafGreen;
    },
  };
}

/* ==================== 组装 ==================== */

export function buildRailway(ctx) {
  const track = buildTrack(ctx);
  const crossing = buildCrossing(ctx);
  const train = buildTrain(ctx);
  const signal = buildSignal(ctx);

  // 乘车交互（停站且开门时）
  for (const dx of [-6, 6]) {
    ctx.interactables.push({
      pos: new THREE.Vector3(dx, 0.8, -35.6), radius: 2.4,
      label: () => '乘上列车', prompt: () => '乘上列车',
      enabled: () => train.state === 'dock' && train.doorOpen > 0.6,
      onUse: () => {
        ctx.game.player.boardTrain(train, dx);
        ctx.audio.chime();
      },
    });
    ctx.interactables.push({
      pos: new THREE.Vector3(dx, 0.8, -35.6), radius: 2.4,
      label: () => '下车', prompt: () => '下车',
      enabled: () => ctx.game.player.riding && train.state === 'dock' && train.doorOpen > 0.6,
      onUse: () => ctx.game.player.alightTrain(dx),
    });
  }

  // 列车接近玩家的距离（用于环境音与警示）
  let near = 0;
  return {
    track, crossing, train, signal,
    update(dt, ctxGame) {
      train.update(dt, ctxGame);
      // 道口联动：列车车头进入 26m 开始报警
      const alarm = train.front > CROSSING_X - 26 && train.tail < CROSSING_X + 10;
      crossing.update(dt, alarm);
      // 警报声
      if (alarm && !crossing._bell) {
        crossing._bell = true;
        crossing._bellT = 0;
      }
      if (crossing._bell) {
        crossing._bellT -= dt;
        if (crossing._bellT <= 0) {
          crossing._bellT = 0.85;
          ctxGame.audio.crossBell(crossing._hi = !crossing._hi);
        }
        if (!alarm) { crossing._bell = false; }
      }
      signal.update(train);
      // 列车 proximity（0..1）
      const px = ctxGame.player.pos.x;
      const d = Math.abs(px - train.x);
      near = clamp(1 - d / 55, 0, 1) * (train.state === 'wait' ? 0.15 : 1);
      // 列车撞到玩家
      if (!ctxGame.player.riding && train.speed > 0.5) {
        const p = ctxGame.player.pos;
        if (Math.abs(p.x - train.x) < TRAIN_LEN / 2 + 0.5 && Math.abs(p.z - RAIL_Z) < 2.6) {
          // 推出轨道
          const dir = p.z > RAIL_Z ? 1 : -1;
          p.z = RAIL_Z + dir * 5.2;
          ctxGame.audio.brake();
          ctxGame.ui.toast('好险！列车疾驰而过…');
          ctxGame.npcs.bump('all', 0);
        }
      }
    },
    get near() { return near; },
  };
}
