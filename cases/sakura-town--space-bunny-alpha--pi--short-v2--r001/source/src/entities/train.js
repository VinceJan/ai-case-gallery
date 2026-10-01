/**
 * 铁道：轨道、道口栏杆/信号灯/警铃、列车（机车 + 2 节车厢）。
 * 列车沿真实轨道弧长运行，进站停车、道口先警铃后落杆，全部真的联动。
 */
import * as THREE from 'three';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry, cylinderGeometry, sphereGeometry } from '../core/toon.js';
import { clamp, damp, lerp, makeRNG } from '../core/utils.js';
import { CROSSING, BALLAST_TOP, RAIL_Y, SLEEPER_TOP } from '../world/layout.js';
import { CROSSING_S, STATION_S, heightAt, rail } from '../world/terrain.js';

// 站前可用距离有限：VMAX 由「从 0 加速 + 制动到站」的距离反推，保证一定停得住
const VMAX = 15.5;
const ACC = 2.2;
const BRAKE = 2.0;
const DWELL = 9.0;

// ---------------------------------------------------------------------------
// 轨道
// ---------------------------------------------------------------------------
export function buildTrack(m) {
  const b = new GeoBuilder('track');
  const L = rail.length;
  const step = 1.0;
  const n = Math.floor(L / step);

  // 道砟（上宽下窄的梯形断面）
  const pos = [];
  const idx = [];
  const profile = [
    [-2.5, 0.0], [-1.55, BALLAST_TOP], [1.55, BALLAST_TOP], [2.5, 0.0],
  ];
  for (let i = 0; i <= n; i++) {
    const s = i * step;
    const p = rail.at(s);
    const px = -p.tangent.z;
    const pz = p.tangent.x;
    for (const [lat, y] of profile) {
      const x = p.position.x + px * lat;
      const z = p.position.z + pz * lat;
      pos.push(x, y, z);
    }
  }
  for (let i = 0; i < n; i++) {
    const a = i * 4;
    const c = (i + 1) * 4;
    // 顶面 + 两侧斜面
    idx.push(a + 1, c + 1, a + 2, a + 2, c + 1, c + 2);
    idx.push(a, c, a + 1, a + 1, c, c + 1);
    idx.push(a + 3, a + 2, c + 2, a + 3, c + 2, c + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  b.add(geo, m.ballast, {}, 'ballast');

  // 轨枕
  const sleeperParts = [];
  const count = Math.floor(L / 0.65);
  const sg = new THREE.BoxGeometry(2.5, 0.1, 0.26);
  const sleeperMat = m.ballast.clone();
  sleeperMat.color.set(0x6a6055);
  const inst = new THREE.InstancedMesh(sg, sleeperMat, count);
  inst.receiveShadow = true;
  inst.castShadow = false;
  inst.userData.noOutline = true;
  inst.name = 'sleepers';
  const dummy = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    const s = i * 0.65;
    const p = rail.at(s);
    dummy.position.set(p.position.x, SLEEPER_TOP - 0.05, p.position.z);
    dummy.rotation.set(0, Math.atan2(p.tangent.x, p.tangent.z), 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.instanceMatrix.needsUpdate = true;
  inst.computeBoundingSphere?.();
  sleeperParts.push(inst);

  // 钢轨（两条）
  for (const side of [-1, 1]) {
    const rp = [];
    const ri = [];
    const y0 = SLEEPER_TOP;
    const y1 = RAIL_Y;
    const w = 0.05;
    for (let i = 0; i <= n; i++) {
      const s = i * step;
      const p = rail.at(s);
      const px = -p.tangent.z;
      const pz = p.tangent.x;
      const cx = p.position.x + px * 0.72 * side;
      const cz = p.position.z + pz * 0.72 * side;
      // 四个点：底左、底右、顶右、顶左（横向偏移 w）
      rp.push(cx - px * w, y0, cz - pz * w);
      rp.push(cx + px * w, y0, cz + pz * w);
      rp.push(cx + px * w, y1, cz + pz * w);
      rp.push(cx - px * w, y1, cz - pz * w);
    }
    for (let i = 0; i < n; i++) {
      const a = i * 4;
      const c = (i + 1) * 4;
      ri.push(a, c, a + 1, a + 1, c, c + 1);        // 底
      ri.push(a + 1, c + 1, a + 2, a + 2, c + 1, c + 2); // 侧
      ri.push(a + 2, c + 2, a + 3, a + 3, c + 2, c + 3); // 侧
      ri.push(a + 3, c + 3, a, a + 3, c, a);        // 顶
    }
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3));
    rg.setIndex(ri);
    rg.computeVertexNormals();
    b.add(rg, m.railSteel, {}, `rail${side}`);
  }

  const group = b.build({ outline: false });
  sleeperParts.forEach((p) => group.add(p));
  return group;
}

// ---------------------------------------------------------------------------
// 列车
// ---------------------------------------------------------------------------
function makeLocomotive(m) {
  const b = new GeoBuilder('loco');
  const body = m.trainBody;
  const stripe = m.trainStripe;
  const roof = m.trainRoof;
  const L = 14.5;
  const W = 3.0;
  // 车身
  b.add(boxGeometry(L, 2.4, W), body, { x: 0, y: 1.9, z: 0 });
  b.add(boxGeometry(L, 0.34, W + 0.04), stripe, { x: 0, y: 2.5, z: 0 });
  b.add(boxGeometry(L - 0.6, 0.5, W - 0.3), roof, { x: 0, y: 3.28, z: 0 });
  // 前脸
  b.add(boxGeometry(1.5, 2.2, W - 0.1), body, { x: L / 2 + 0.6, y: 1.9, z: 0, rz: -0.16 });
  b.add(new THREE.PlaneGeometry(W - 0.6, 1.1), m.glassBig, { x: L / 2 + 0.15, y: 2.45, z: 0, noOutline: true });
  // 驾驶室窗
  b.add(new THREE.PlaneGeometry(2.2, 0.9), m.glassBig, { x: -L / 2 + 0.3, y: 2.45, z: W / 2 + 0.01, noOutline: true });
  b.add(new THREE.PlaneGeometry(2.2, 0.9), m.glassBig, { x: -L / 2 + 0.3, y: 2.45, z: -W / 2 - 0.01, ry: Math.PI, noOutline: true });
  // 侧窗
  for (let i = 0; i < 3; i++) {
    const x = -2 + i * 2.4;
    b.add(new THREE.PlaneGeometry(1.6, 0.8), m.glassBig, { x, y: 2.45, z: W / 2 + 0.01, noOutline: true });
    b.add(new THREE.PlaneGeometry(1.6, 0.8), m.glassBig, { x, y: 2.45, z: -W / 2 - 0.01, ry: Math.PI, noOutline: true });
  }
  // 车头灯
  b.add(new THREE.SphereGeometry(0.2, 8), m.bulb, { x: L / 2 + 1.25, y: 1.4, z: 0, noOutline: true });
  b.add(boxGeometry(0.3, 0.24, 0.24), m.bulb, { x: L / 2 + 1.2, y: 2.9, z: 0 });
  // 排障器
  b.add(boxGeometry(0.7, 0.8, W - 0.6), m.metalDark, { x: L / 2 + 0.5, y: 0.55, z: 0, rz: -0.3 });
  // 底部裙板 + 转向架
  b.add(boxGeometry(L - 1, 0.5, W - 0.3), m.trainRoof, { x: 0, y: 0.55, z: 0 });
  for (const bx of [-4.6, 4.2]) {
    b.add(boxGeometry(3.4, 0.5, 2.2), m.metalDark, { x: bx, y: 0.4, z: 0 });
    for (const wz of [-1.0, 1.0]) {
      for (const wx of [-1.1, 1.1]) {
        b.add(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 12), m.railSteel, {
          x: bx + wx, y: 0.42, z: wz, rz: Math.PI / 2, rx: Math.PI / 2,
        });
      }
    }
  }
  return b.build({ thickness: 0.045, color: 0x33303a });
}

function makeCarriage(m) {
  const b = new GeoBuilder('car');
  const body = m.trainBody;
  const stripe = m.trainStripe;
  const L = 16.5;
  const W = 2.95;
  b.add(boxGeometry(L, 2.5, W), body, { x: 0, y: 1.95, z: 0 });
  b.add(boxGeometry(L, 0.3, W + 0.04), stripe, { x: 0, y: 2.62, z: 0 });
  b.add(boxGeometry(L - 1.2, 0.42, W - 0.4), m.trainRoof, { x: 0, y: 3.36, z: 0 });
  // 车窗
  for (let i = 0; i < 5; i++) {
    const x = -L / 2 + 1.9 + i * 3.0;
    for (const sz of [1, -1]) {
      b.add(new THREE.PlaneGeometry(2.2, 1.0), m.glassBig, {
        x, y: 2.62, z: (sz * W) / 2 + 0.01 * sz, ry: sz > 0 ? 0 : Math.PI, noOutline: true,
      });
      b.add(boxGeometry(2.4, 1.2, 0.06), m.trainBody, { x, y: 2.62, z: (sz * W) / 2 + 0.02 * sz });
    }
  }
  // 车门
  for (const dx of [-2.5, 2.5]) {
    for (const sz of [1, -1]) {
      b.add(boxGeometry(1.2, 2.2, 0.08), m.accentFor(0x8a9aa8), { x: dx, y: 1.6, z: (sz * W) / 2 + 0.02 * sz });
    }
  }
  // 转向架
  b.add(boxGeometry(L - 1, 0.45, W - 0.3), m.trainRoof, { x: 0, y: 0.6, z: 0 });
  for (const bx of [-5.4, 5.4]) {
    b.add(boxGeometry(3.2, 0.45, 2.0), m.metalDark, { x: bx, y: 0.42, z: 0 });
    for (const wz of [-0.95, 0.95]) {
      for (const wx of [-1.0, 1.0]) {
        b.add(new THREE.CylinderGeometry(0.4, 0.4, 0.15, 12), m.railSteel, {
          x: bx + wx, y: 0.42, z: wz, rz: Math.PI / 2, rx: Math.PI / 2,
        });
      }
    }
  }
  return b.build({ thickness: 0.045, color: 0x33303a });
}

// ---------------------------------------------------------------------------
// 道口
// ---------------------------------------------------------------------------
function makeLevelCrossing(m) {
  const root = new THREE.Group();
  root.name = 'levelCrossing';
  const cx = CROSSING.x;
  const cz = CROSSING.z;
  const baseY = heightAt(cx, cz);
  root.position.set(cx, baseY, cz);

  const b = new GeoBuilder('lcStatic');
  // 基座
  for (const sx of [-1, 1]) {
    b.add(boxGeometry(1.0, 0.3, 1.0), m.concrete, { x: (sx * 6.6), y: 0.15, z: -3.2 });
    b.add(boxGeometry(1.0, 0.3, 1.0), m.concrete, { x: (sx * 6.6), y: 0.15, z: 3.2 });
    // 灯柱
    for (const dz of [-3.2, 3.2]) {
      b.add(cylinderGeometry(0.09, 0.12, 2.4, 8), m.metalDark, { x: sx * 6.6, y: 1.2, z: dz });
      b.add(boxGeometry(0.5, 0.8, 0.36), m.metalDark, { x: sx * 6.6, y: 2.5, z: dz });
    }
    // 警铃
    b.add(new THREE.SphereGeometry(0.22, 8, 6), m.metalDark, { x: sx * 6.6, y: 2.95, z: 0, noOutline: true });
    // 栏杆立柱
    for (const dz of [-3.4, 3.4]) {
      b.add(boxGeometry(0.34, 1.15, 0.34), m.accentFor(0xe8e2d4), { x: sx * 5.2, y: 0.57, z: dz });
      b.add(boxGeometry(0.36, 0.16, 0.36), m.accentFor(0xd6482f), { x: sx * 5.2, y: 1.2, z: dz });
    }
  }
  // 交叉警示牌
  b.add(boxGeometry(0.12, 0.9, 0.12), m.metalDark, { x: -8.6, y: 1.3, z: 0 });
  b.add(boxGeometry(0.12, 0.9, 0.12), m.metalDark, { x: 8.6, y: 1.3, z: 0 });
  root.add(b.build({ thickness: 0.03 }));

  // 闪灯
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xff2a1a });
  const lights = [];
  for (const sx of [-1, 1]) {
    for (const dz of [-3.2, 3.2]) {
      for (const dy of [2.35, 2.68]) {
        const l = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), lightMat.clone());
        l.position.set(sx * 6.6, dy, dz + (dz > 0 ? 0.2 : -0.2));
        l.userData.noOutline = true;
        root.add(l);
        lights.push(l);
      }
    }
  }
  // 警铃
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), m.metalDark);
  bell.position.set(0, 3.0, -3.2);
  root.add(bell);

  // 栏杆臂（每侧 2 根，绕 Z 轴从竖直转到水平）
  const arms = [];
  for (const sx of [-1, 1]) {
    for (const dz of [-3.4, 3.4]) {
      const pivot = new THREE.Group();
      pivot.position.set(sx * 5.2, 1.0, dz);
      const armLen = 2.9;
      const stripeGeo = new THREE.BoxGeometry(armLen, 0.16, 0.14);
      const arm = new THREE.Mesh(stripeGeo, m.accentFor(0xf0ece0));
      arm.position.set((sx * armLen) / 2, 0, 0);
      arm.castShadow = true;
      pivot.add(arm);
      for (let i = 0; i < 3; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.18, 0.16), m.accentFor(0xd6482f));
        stripe.position.set((sx * armLen * (i + 0.5)) / 3.4, 0, 0);
        pivot.add(stripe);
      }
      pivot.rotation.z = (sx * Math.PI) / 2;
      root.add(pivot);
      arms.push({ pivot, side: sx });
    }
  }

  return { root, lights, arms, bell };
}

// ---------------------------------------------------------------------------
// 主体
// ---------------------------------------------------------------------------
export class Railway {
  constructor(scene, m, colliders, audio) {
    this.m = m;
    this.audio = audio;
    this.group = new THREE.Group();
    this.group.name = 'railway';
    scene.add(this.group);

    this.group.add(buildTrack(m));

    // 列车
    this.trainGroup = new THREE.Group();
    this.loco = makeLocomotive(m);
    this.car1 = makeCarriage(m);
    this.car2 = makeCarriage(m);
    this.trainGroup.add(this.loco, this.car1, this.car2);
    this.group.add(this.trainGroup);
    this.carOffsets = [0, 16.0, 32.4];
    this.vehicles = [
      { mesh: this.loco, offset: 0 },
      { mesh: this.car1, offset: 16.0 },
      { mesh: this.car2, offset: 32.4 },
    ];

    // 道口
    this.lc = makeLevelCrossing(m);
    this.group.add(this.lc.root);
    this.lcBlocker = colliders.addCircle(CROSSING.x, CROSSING.z, 5.0, 'crossing');
    this.lcBlocker.enabled = false;

    this.L = rail.length;
    this.s = 0;
    this.speed = 0;
    this.phase = 'run';       // run | brake | dwell | depart
    this.dwellTimer = 0;
    this.passed = false;
    this.crossingState = 'idle'; // idle | warn | closing | closed | opening
    this.crossingTimer = 0;
    this.bellTimer = 0;
    this.clackTimer = 0;
    this.hasStoppedAtStation = false;
    this.hornPlayed = false;
    this.stationDwellCount = 0;
    this._warned = false;
  }

  /** 列车头部距离道口的距离（沿轨道的正负） */
  distanceToCrossing() {
    return this.s - CROSSING_S;
  }

  update(dt, ctx = {}) {
    // ---- 运行控制 ----
    const distToStation = STATION_S - this.s;
    if (this.phase === 'run' || this.phase === 'brake') {
      if (!this.hasStoppedAtStation && distToStation > 0) {
        const brakeDist = (this.speed * this.speed) / (2 * BRAKE) + 10;
        if (distToStation < brakeDist) {
          this.phase = 'brake';
          this.speed = Math.max(0, this.speed - BRAKE * dt);
        } else {
          this.phase = 'run';
          this.speed = Math.min(VMAX, this.speed + ACC * dt);
        }
        this.s += this.speed * dt;
      } else if (this.hasStoppedAtStation) {
        this.phase = 'depart';
        this.speed = Math.min(VMAX, this.speed + ACC * dt * 1.5);
        this.s += this.speed * dt;
      } else {
        this.speed = Math.min(VMAX, this.speed + ACC * dt);
        this.s += this.speed * dt;
      }
      if (this.speed < 0.15 && this.phase === 'brake') {
        this.phase = 'dwell';
        this.dwellTimer = DWELL;
        this.hasStoppedAtStation = true;
        this.stationDwellCount++;
        this.audio?.trainHorn(0.02);
      }
    } else if (this.phase === 'dwell') {
      this.speed = damp(this.speed, 0, 9, dt);
      this.dwellTimer -= dt;
      if (this.dwellTimer <= 0) this.phase = 'depart';
    } else if (this.phase === 'depart') {
      this.speed = Math.min(VMAX, this.speed + ACC * dt * 1.5);
      this.s += this.speed * dt;
    }

    if (this.s > this.L - 2) {
      // 隧道尽头回到起点，从静止重新加速，保证能在下一站前刹住
      this.s = 0;
      this.speed = 0;
      this.hasStoppedAtStation = false;
      this.phase = 'run';
      this.passed = false;
    }

    // ---- 车辆摆位 ----
    for (const v of this.vehicles) {
      const s = clamp(this.s - v.offset, 0, this.L);
      const p = rail.at(s);
      v.mesh.position.set(p.position.x, RAIL_Y, p.position.z);
      v.mesh.rotation.y = Math.atan2(p.tangent.x, p.tangent.z) - Math.PI / 2;
    }

    // ---- 道口联动 ----
    this._updateCrossing(dt, ctx);

    // ---- 声音 ----
    if (this.speed > 3) {
      this.clackTimer -= dt * this.speed;
      if (this.clackTimer <= 0) {
        this.clackTimer = 3.2;
        const near = this._nearness();
        if (near < 0.9) this.audio?.railClack(clamp((this.s / this.L) * 2 - 1, -1, 1) * 0.5);
      }
    }
  }

  _nearness() {
    const d = Math.abs(this.distanceToCrossing());
    return clamp(1 - d / 150, 0, 1);
  }

  _updateCrossing(dt, ctx) {
    const d = this.distanceToCrossing();
    // 列车沿 s 增大方向行驶：d < 0 表示正在驶向道口
    const approaching = d < 0;
    const dist = Math.abs(d);
    const near = this._nearness();
    let wantState = this.crossingState;

    if (this.crossingState === 'idle') {
      if (approaching && dist < 125) wantState = 'warn';
    } else if (this.crossingState === 'warn') {
      if (!approaching || dist > 150) wantState = 'idle';
      else if (dist < 78) wantState = 'closing';
    } else if (this.crossingState === 'closing') {
      if (!approaching) wantState = 'opening';
      else if (dist < 46) wantState = 'closed';
    } else if (this.crossingState === 'closed') {
      const tailClear = this.hasStoppedAtStation || dist > 42;
      if (!approaching && tailClear) wantState = 'opening';
    } else if (this.crossingState === 'opening') {
      if (approaching && dist < 130) wantState = 'warn';
      else wantState = 'idle';
    }

    if (wantState !== this.crossingState) {
      this.crossingState = wantState;
      if (wantState === 'warn' || wantState === 'closing') {
        this.bellTimer = 0;
      }
      if (wantState === 'warn') this.audio?.crossingBell(2);
    }

    // 警铃节奏
    const active = this.crossingState === 'warn' || this.crossingState === 'closing';
    if (active) {
      this.bellTimer -= dt;
      if (this.bellTimer <= 0) {
        this.bellTimer = 0.62;
        this.audio?.crossingBell(1);
      }
      if (this.lc.bell) {
        this.lc.bell.rotation.z += dt * 22;
      }
    }

    // 闪灯
    const flashOn = active && (Math.floor(ctx.time * 2.2) % 2 === 0);
    for (const l of this.lc.lights) {
      l.material.color.setHex(flashOn ? 0xff3a22 : 0x5a1a12);
      l.scale.setScalar(flashOn ? 1.15 : 0.9);
    }

    // 栏杆
    const closed = this.crossingState === 'closed';
    for (const a of this.lc.arms) {
      const openAngle = (a.side * Math.PI) / 2;
      const closedAngle = a.side > 0 ? Math.PI : 0;
      a.pivot.rotation.z = damp(a.pivot.rotation.z, closed ? closedAngle : openAngle, 3.2, dt);
    }
    this.lcBlocker.enabled = this.crossingState === 'closed';

    // 汽笛
    if (approaching && dist < 100 && !this.hornPlayed) {
      this.hornPlayed = true;
      this.audio?.trainHorn(near);
    }
    if (dist > 130) this.hornPlayed = false;
  }

  /** 列车是否正停在站台（供 NPC 上下车判断） */
  get isAtStation() {
    return this.phase === 'dwell';
  }

  /** 列车头部的世界坐标（相机/音效用） */
  headPosition() {
    const p = rail.at(this.s);
    return p.position;
  }
}
