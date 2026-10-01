// ================================================================
//  铁道：轨道 / 月台 / 道口 / 列车
// ================================================================
import * as THREE from 'three';
import { GeoBuf, mergeBuf } from './geom.js';
import { heightAt } from './terrain.js';
import { TRACK, CROSSING, STATION } from './layout.js';
import { toon, basic, addOutline, registerNightLight } from '../render/toon.js';
import { PAL } from '../render/palette.js';
import { gravelTex } from '../render/textures.js';
import { lerp, clamp, clamp01, damp, TAU } from '../util/math.js';

export const RAIL = {
  xMin: -220, xMax: 220,
  portalX: 106,
  stopX: -8,
  carLen: 19.6, carGap: 1.0, cars: 2,
};
const GAUGE = TRACK.gauge;
const TRAIN_LEN = RAIL.carLen * RAIL.cars + RAIL.carGap * (RAIL.cars - 1);

/* ------------------------------------------------------------------ *
 *  轨道几何
 * ------------------------------------------------------------------ */
function trackStrip(b, x0, x1, halfW, y, thick = 0.02) {
  for (let x = x0; x < x1; x += 3) {
    const xb = Math.min(x + 3, x1);
    const za = TRACK.zAt(x), zb = TRACK.zAt(xb);
    const ang = Math.atan2(xb - x, zb - za);
    const len = Math.hypot(xb - x, zb - za) + 0.04;
    const seg = new GeoBuf();
    seg.box(0, y, 0, len, thick, halfW * 2, 0.4);
    const m = new THREE.Matrix4().makeRotationY(ang);
    m.setPosition((x + xb) / 2, 0, (za + zb) / 2);
    seg.applyMatrix(m);
    mergeBuf(b, seg);
  }
}

export function buildRailway(collision) {
  const group = new THREE.Group();
  group.name = 'railway';

  /* --- 道砟 --- */
  const bed = new GeoBuf();
  trackStrip(bed, RAIL.xMin, RAIL.xMax, 3.2, 0.02, 0.28);
  const bedTex = gravelTex().clone();
  bedTex.needsUpdate = true;
  bedTex.wrapS = bedTex.wrapT = THREE.RepeatWrapping;
  bedTex.repeat.set(70, 1.6);
  const bedMesh = new THREE.Mesh(bed.toGeometry(), toon(0xffffff, { map: bedTex }));
  bedMesh.receiveShadow = true;
  group.add(bedMesh);

  /* --- 枕木 --- */
  const sleepers = new GeoBuf();
  for (let x = RAIL.xMin; x < RAIL.xMax; x += 0.64) {
    const z = TRACK.zAt(x);
    const slope = (TRACK.zAt(x + 0.2) - TRACK.zAt(x - 0.2)) / 0.4;
    const s = new GeoBuf();
    s.box(0, 0.16, 0, 0.24, 0.16, 2.55, 1);
    const m = new THREE.Matrix4().makeRotationY(Math.atan2(1, slope));
    m.setPosition(x, 0, z);
    s.applyMatrix(m);
    mergeBuf(sleepers, s);
  }
  const slMesh = new THREE.Mesh(sleepers.toGeometry(), toon(0x6b6053));
  slMesh.receiveShadow = true;
  group.add(slMesh);

  /* --- 钢轨 --- */
  const rail = new GeoBuf();
  for (const s of [-1, 1]) {
    for (let x = RAIL.xMin; x < RAIL.xMax; x += 3) {
      const xb = Math.min(x + 3, RAIL.xMax);
      const za = TRACK.zAt(x) + s * GAUGE / 2, zb = TRACK.zAt(xb) + s * GAUGE / 2;
      const seg = new GeoBuf();
      seg.box(0, 0, 0, Math.hypot(xb - x, zb - za) + 0.03, 0.15, 0.075, 1);
      const m = new THREE.Matrix4().makeRotationY(Math.atan2(xb - x, zb - za));
      m.setPosition((x + xb) / 2, 0.255, (za + zb) / 2);
      seg.applyMatrix(m);
      mergeBuf(rail, seg);
    }
  }
  const railMesh = new THREE.Mesh(rail.toGeometry(), toon(PAL.railSteel));
  railMesh.castShadow = true;
  group.add(railMesh);
  addOutline(railMesh, 0.005);

  /* --- 月台 --- */
  const pf = STATION.platform;
  const segN = 26;
  const plat = new GeoBuf(), surf = new GeoBuf(), yellow = new GeoBuf(), edge = new GeoBuf();
  for (let i = 0; i < segN; i++) {
    const xa = lerp(pf.x0, pf.x1, i / segN), xb = lerp(pf.x0, pf.x1, (i + 1) / segN);
    const innA = TRACK.zAt(xa) + pf.inner, innB = TRACK.zAt(xb) + pf.inner;
    const outA = TRACK.zAt(xa) + pf.outer, outB = TRACK.zAt(xb) + pf.outer;
    const ang = Math.atan2(xb - xa, outB - innB);
    const len = Math.hypot(xb - xa, outB - innA);
    const w = outA - innA;
    const seg = new GeoBuf();
    seg.box(0, pf.h / 2, 0, len, pf.h, w, 0.55);
    let m = new THREE.Matrix4().makeRotationY(ang); m.setPosition((xa + xb) / 2, 0, (innA + outA) / 2);
    seg.applyMatrix(m); mergeBuf(plat, seg);

    // 面层
    const band = (off, width, y, target) => {
      const t0 = off / w, t1 = (off + width) / w;
      const s = new GeoBuf();
      s.box(0, y, 0, len, 0.02, width, 0.5);
      const cz = (lerp(innA, innB, t0) + lerp(outA, outB, t1)) / 2;
      const mm = new THREE.Matrix4().makeRotationY(ang); mm.setPosition((xa + xb) / 2, 0, cz);
      s.applyMatrix(mm); mergeBuf(target, s);
    };
    band(0.12, 0.95, pf.h + 0.012, surf);
    band(1.15, 0.55, pf.h + 0.014, yellow);
    const s = new GeoBuf();
    s.box(0, pf.h + 0.02, 0, len, 0.03, 0.18, 1);
    const mm = new THREE.Matrix4().makeRotationY(ang); mm.setPosition((xa + xb) / 2, 0, (innA + innB) / 2);
    s.applyMatrix(mm); mergeBuf(edge, s);
  }
  const platMesh = new THREE.Mesh(plat.toGeometry(), toon(0xd6d0c2));
  platMesh.receiveShadow = true; platMesh.castShadow = true;
  group.add(platMesh);
  const surfMesh = new THREE.Mesh(surf.toGeometry(), toon(0xc5bfb0));
  surfMesh.receiveShadow = true;
  group.add(surfMesh);
  const yMesh = new THREE.Mesh(yellow.toGeometry(), toon(0xe5c247));
  yMesh.receiveShadow = true;
  group.add(yMesh);
  group.add(new THREE.Mesh(edge.toGeometry(), toon(0xd9b238)));

  /* --- 月台雨棚 --- */
  const cb = new GeoBuf(), cm = new GeoBuf();
  const roof = STATION.roof;
  cb.box((roof.x0 + roof.x1) / 2, roof.y, 5.9, roof.x1 - roof.x0 + 1.6, 0.16, 7.8, 0.5);
  for (let x = roof.x0; x <= roof.x1 + 0.01; x += 6.4) {
    const z = TRACK.zAt(x) + 3.1;
    cm.cyl(x, pf.h, z, 0.1, 0.13, roof.y - pf.h, 8);
    cm.box(x, roof.y - 0.2, z + 0.5, 0.08, 0.08, 1.4);
    cm.box(x, roof.y - 0.48, z + 1.1, 0.07, 0.56, 0.07);
  }
  const cbMesh = new THREE.Mesh(cb.toGeometry(), toon(0x6d7280));
  const cmMesh = new THREE.Mesh(cm.toGeometry(), toon(0xc6c0b2));
  group.add(cbMesh, cmMesh);
  addOutline(cbMesh, 0.011);

  /* --- 隧道口 --- */
  group.add(buildTunnelPortal(-1), buildTunnelPortal(1));

  /* --- 月台护栏 --- */
  const fence = new GeoBuf();
  for (let x = pf.x0 - 1; x <= pf.x1 + 1; x += 2.4) {
    fence.cyl(x, pf.h, TRACK.zAt(x) + pf.outer + 0.12, 0.045, 0.05, 1.0, 5);
  }
  for (const y of [0.5, 0.9]) {
    for (let x = pf.x0 - 1; x < pf.x1 + 1; x += 2) {
      const xb = Math.min(x + 2, pf.x1 + 1);
      const za = TRACK.zAt(x) + pf.outer + 0.12, zb = TRACK.zAt(xb) + pf.outer + 0.12;
      const s = new GeoBuf();
      s.box(0, 0, 0, Math.hypot(xb - x, zb - za) + 0.02, 0.05, 0.05, 1);
      const m = new THREE.Matrix4().makeRotationY(Math.atan2(xb - x, zb - za));
      m.setPosition((x + xb) / 2, pf.h + y, (za + zb) / 2);
      s.applyMatrix(m); mergeBuf(fence, s);
    }
  }
  group.add(new THREE.Mesh(fence.toGeometry(), toon(0x9299a3)));

  if (collision) {
    for (let x = pf.x0 - 1; x <= pf.x1 + 1; x += 1.8) {
      collision.addBox(x, TRACK.zAt(x) + pf.outer + 0.12, 0.8, 0.1, 0, pf.h + 1.0, pf.h);
    }
  }
  return group;
}

function buildTunnelPortal(s) {
  const g = new THREE.Group();
  const x = s * RAIL.portalX;
  const z = TRACK.zAt(x);
  const base = heightAt(x, z);
  const stone = new GeoBuf(), dark = new GeoBuf();
  const W = 13, H = 8.5, T = 3.4;
  stone.box(0, H + 1.1, 0, T + 0.8, 2.2, W + 6.4, 0.35);
  for (const sg of [-1, 1]) {
    stone.box(0, H * 0.52, sg * (W / 2 + 1.5), T + 0.6, H * 1.05, 3.0, 0.35);
    // 斜角石
    stone.box(0, H * 0.92, sg * (W / 2 + 0.55), T + 0.6, 1.6, 1.6, 0.35);
  }
  dark.box(0, H * 0.4, 0, T * 0.5, H * 0.86, W, 1);
  g.add(new THREE.Mesh(stone.toGeometry(), toon(0x8f8779)));
  g.add(new THREE.Mesh(dark.toGeometry(), toon(0x17171c)));
  for (const c of g.children) addOutline(c, 0.012);
  g.position.set(x, base, z);
  g.rotation.y = Math.PI / 2;
  return g;
}

/* ------------------------------------------------------------------ *
 *  道口设备
 * ------------------------------------------------------------------ */
export function buildCrossing(collision) {
  const g = new THREE.Group();
  g.name = 'crossing';
  const cx = CROSSING.x, cz = CROSSING.z;
  const parts = { gates: [], lights: [] };
  const LEN = CROSSING.barrierX + 0.6;      // 栏杆长度：从立柱伸到路中央

  // 四个方向各一组（立柱 + 旋转灯 + 警铃 + 栏杆）
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const bx = cx + sx * CROSSING.barrierX;
      const bz = cz + sz * 5.6;
      const gy = heightAt(bx, bz);
      const m = new GeoBuf();
      m.cyl(0, 0, 0, 0.14, 0.19, 3.7, 8);
      m.box(0, 3.78, 0, 0.36, 0.22, 0.36);
      m.box(0, 4.02, 0, 0.52, 0.16, 0.52);
      const mast = new THREE.Mesh(m.toGeometry(), toon(0x4c525d));
      mast.position.set(bx, gy, bz);
      addOutline(mast, 0.012);
      g.add(mast);

      const lampMat = basic(0x3d1515, { transparent: true, opacity: 0.6 });
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), lampMat);
      lamp.position.set(bx, gy + 3.62, bz);
      g.add(lamp);
      parts.lights.push({ mesh: lamp, material: lampMat });

      const alarm = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.21, 0.28, 8), toon(0x2b2f37));
      alarm.position.set(bx, gy + 3.32, bz - 0.36);
      alarm.rotation.x = Math.PI / 2;
      g.add(alarm);

      // 栏杆（水平时落下，竖起时打开）
      const pivot = new THREE.Group();
      pivot.position.set(bx, gy + 1.08, bz);
      const dir = -sx;                       // 指向路中央
      const b = new GeoBuf();
      b.box(dir * LEN / 2, 0, 0, LEN, 0.12, 0.12, 1);
      const boom = new THREE.Mesh(b.toGeometry(), toon(0xf4f1e6));
      pivot.add(boom);
      for (let i = 0; i < 5; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.145, 0.145), toon(PAL.red));
        stripe.position.set(dir * (0.9 + i * 1.5), 0, 0);
        pivot.add(stripe);
      }
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), toon(PAL.red));
      tip.position.set(dir * LEN, 0, 0);
      pivot.add(tip);
      g.add(pivot);
      parts.gates.push({ pivot, side: sx * sz, x: bx, z: bz, y: gy });

      // 交叉警标
      const cx2 = cx + sx * (CROSSING.barrierX - 1.8);
      const cgy = heightAt(cx2, bz);
      const a = new GeoBuf();
      a.box(0, 2.05, 0, 1.2, 0.18, 0.06, 1);
      a.box(0, 2.05, 0, 0.18, 1.2, 0.06, 1);
      const cross = new THREE.Mesh(a.toGeometry(), toon(0xf6f2e6));
      cross.position.set(cx2, cgy + 1.7, bz);
      const postB = new GeoBuf();
      postB.cyl(0, 0, 0, 0.05, 0.06, 1.5, 6);
      const post = new THREE.Mesh(postB.toGeometry(), toon(0x9299a3));
      post.position.set(cx2, cgy, bz);
      g.add(cross, post);
      addOutline(cross, 0.012);

      if (collision) collision.addCircle(bx, bz, 0.32, gy + 1.5, gy - 0.3);
    }
  }
  // 关闭时挡路的动态碰撞体（打开时抬高到人走不过去的高度之上）
  const block = collision ? collision.addBox(cx, cz, 4.6, 2.6, 0, 2.2, 2.0) : null;

  g.userData.parts = parts;
  return { group: g, parts, x: cx, z: cz, block };
}

/* ------------------------------------------------------------------ *
 *  列车
 * ------------------------------------------------------------------ */
function buildCarParts() {
  const L = RAIL.carLen, W = 2.72, H = 3.0;
  const body = new GeoBuf(), win = new GeoBuf(), stripe = new GeoBuf();
  const dark = new GeoBuf(), inner = new GeoBuf();

  body.box(0, 1.78, 0, L, H, W, 0.4);
  body.box(0, 3.3, 0, L - 0.5, 0.2, W - 0.45, 0.4);
  dark.box(0, 0.44, 0, L - 0.5, 0.5, W - 0.18, 1);
  stripe.box(0, 1.12, 0, L, 0.24, W + 0.03, 1);
  stripe.box(0, 2.72, 0, L, 0.09, W + 0.03, 1);

  for (const s of [-1, 1]) {
    const nWin = 6;
    for (let i = 0; i < nWin; i++) {
      const x = lerp(-L / 2 + 2.0, L / 2 - 3.2, nWin === 1 ? 0.5 : i / (nWin - 1));
      if (Math.abs(x) < 1.4 || Math.abs(x) > 4.2) continue;
      win.box(x, 2.22, s * (W / 2 + 0.01), 1.55, 0.82, 0.03, 1);
    }
  }
  // 车内（透过门窗隐约可见）
  inner.box(0, 0.72, 0, L - 0.3, 0.06, W - 0.2, 1);
  for (const s of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const x = lerp(-L / 2 + 2.2, L / 2 - 2.2, i / 2);
      inner.box(x, 1.0, s * (W / 2 - 0.45), 1.5, 0.5, 0.55, 1);
    }
  }
  inner.box(0, 2.3, 0, L - 0.2, 0.05, W - 0.2, 1);
  for (const sx of [-1, 1]) {
    dark.box(sx * (L / 2 - 2.7), 0.38, 0, 2.6, 0.46, W - 0.45, 1);
    for (const sz of [-1, 1]) {
      const w = new GeoBuf();
      w.cyl(0, 0, 0, 0.4, 0.4, 0.09, 12);
      w.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
      w.applyMatrix(new THREE.Matrix4().makeTranslation(sx * (L / 2 - 2.7), 0.48, sz * 0.7));
      mergeBuf(dark, w);
    }
  }
  dark.box(-L / 4, 3.46, 0, 2.3, 0.22, 1.4, 1);
  dark.box(L / 4, 3.46, 0, 2.3, 0.22, 1.4, 1);
  return { body, win, stripe, dark, inner };
}

export class Train {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'train';
    this.doorState = 0;
    this.cars = [];

    this.mats = {
      body: toon(PAL.trainBody),
      win: toon(0x2f3a46, { transparent: true, opacity: 0.92 }),
      stripe: toon(PAL.trainStripe),
      dark: toon(0x3b414a),
      inner: toon(0xe8e2d4),
    };
    registerNightLight(this.mats.win, { night: new THREE.Color(0xffd89a), nightIntensity: 1.4, threshold: 0.32 });
    registerNightLight(this.mats.inner, { night: new THREE.Color(0xffe0b0), dayIntensity: 0.5, nightIntensity: 1.5, threshold: 0.3 });

    const parts = buildCarParts();
    const geos = {};
    for (const k of Object.keys(parts)) geos[k] = parts[k].toGeometry();

    for (let i = 0; i < RAIL.cars; i++) {
      const car = new THREE.Group();
      for (const k of Object.keys(geos)) {
        const m = new THREE.Mesh(geos[k], this.mats[k]);
        m.castShadow = true;
        car.add(m);
      }
      this.cars.push({ group: car, doors: [] });
      this.group.add(car);
    }
    this._buildDoors();

    // 车头（跟随行进方向）
    this.nose = new THREE.Group();
    this.headMat = basic(0xfff6d0);
    this.tailMat = basic(0x592222);
    for (const s of [-1, 1]) {
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), this.headMat);
      l.position.set(0, 0.95, s * 0.7);
      this.nose.add(l);
    }
    this.headLight = new THREE.SpotLight(0xfff0c8, 0, 70, 0.42, 0.55, 1.1);
    this.headLight.position.set(0.3, 1.0, 0);
    this.headTarget = new THREE.Object3D();
    this.headTarget.position.set(40, 0.5, 0);
    this.nose.add(this.headLight, this.headTarget);
    this.headLight.target = this.headTarget;
    this.group.add(this.nose);

    this.x = 0; this.dir = 1;
    this.setVisible(false);
  }

  _buildDoors() {
    const L = RAIL.carLen, W = 2.72;
    for (let i = 0; i < this.cars.length; i++) {
      const car = this.cars[i];
      car.doors = [];
      for (const s of [-1, 1]) {
        for (const dx of [-L / 4, L / 4]) {
          const pivot = new THREE.Group();
          pivot.position.set(dx, 1.24, s * (W / 2 + 0.02));
          const d1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.9, 0.07), this.mats.body);
          const d2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.9, 0.07), this.mats.body);
          const g1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.72, 0.03), this.mats.win);
          const g2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.72, 0.03), this.mats.win);
          d1.position.x = -0.3; d2.position.x = 0.3;
          g1.position.set(-0.3, 0.42, 0.05); g2.position.set(0.3, 0.42, 0.05);
          pivot.add(d1, d2, g1, g2);
          car.group.add(pivot);
          car.doors.push({ pivot, s });
        }
      }
    }
  }

  setVisible(v) { this.group.visible = v; this.visible = v; }
  setDoors(open) { this.doorTarget = open ? 1 : 0; }

  updateDoors(dt) {
    this.doorState = damp(this.doorState, this.doorTarget || 0, 5.5, dt);
    for (const c of this.cars) {
      for (const d of c.doors) {
        d.pivot.children[0].position.x = -0.3 - this.doorState * 0.62;
        d.pivot.children[2].position.x = -0.3 - this.doorState * 0.62;
        d.pivot.children[1].position.x = 0.3 + this.doorState * 0.62;
        d.pivot.children[3].position.x = 0.3 + this.doorState * 0.62;
      }
    }
  }

  place(x, dir) {
    const L = RAIL.carLen + RAIL.carGap;
    for (let i = 0; i < this.cars.length; i++) {
      const off = (i - (this.cars.length - 1) / 2) * L;
      const cx = x + off;
      this.cars[i].group.position.set(cx, 0, TRACK.zAt(cx));
      this.cars[i].group.rotation.y = dir > 0 ? 0 : Math.PI;
    }
    const lead = x + dir * (TRAIN_LEN / 2 + 0.2);
    this.nose.position.set(lead, 0, TRACK.zAt(lead));
    this.nose.rotation.y = dir > 0 ? 0 : Math.PI;
    this.headMat.color.setHex(this.night ? 0xfff6d0 : 0xece2c4);
    this.x = x; this.dir = dir;
  }

  update(dt, night) {
    this.night = night;
    this.updateDoors(dt);
    this.headLight.intensity = night > 0.25 ? 14 : 0;
    this.headMat.opacity = 1;
  }
}

/* ------------------------------------------------------------------ *
 *  时刻表
 * ------------------------------------------------------------------ */
export const SCHEDULE = [
  { arr: 6.28, dir: 1, dest: '町田' },
  { arr: 7.12, dir: 1, dest: '青葉' },
  { arr: 7.75, dir: -1, dest: '日向台' },
  { arr: 8.42, dir: 1, dest: '城東' },
  { arr: 9.15, dir: -1, dest: '町田' },
  { arr: 9.85, dir: 1, dest: '青葉' },
  { arr: 10.55, dir: -1, dest: '日向台' },
  { arr: 11.25, dir: 1, dest: '町田' },
  { arr: 12.05, dir: -1, dest: '青葉' },
  { arr: 12.62, dir: 1, dest: '日向台' },
  { arr: 13.20, dir: -1, dest: '城東' },
  { arr: 13.90, dir: 1, dest: '町田' },
  { arr: 14.50, dir: -1, dest: '青葉' },
  { arr: 15.10, dir: 1, dest: '日向台' },
  { arr: 15.80, dir: -1, dest: '町田' },
  { arr: 16.50, dir: 1, dest: '城東' },
  { arr: 17.30, dir: -1, dest: '青葉' },
  { arr: 18.10, dir: 1, dest: '町田' },
  { arr: 18.90, dir: -1, dest: '日向台' },
  { arr: 19.70, dir: 1, dest: '青葉' },
];

const SPAWN = 152, LEAVE = 152;
const LEAD = 0.30;   // 提前多少游戏小时开始准备

export class TrainSystem {
  constructor(train, audio) {
    this.train = train;
    this.audio = audio;
    this.state = 'idle';
    this.active = null;
    this.x = 0; this.v = 0;
    this.doorOpen = false;
    this.listeners = {};
    this.lastDeparture = null;
    this.dwellLeft = 0;
  }
  on(ev, fn) { (this.listeners[ev] ||= []).push(fn); }
  emit(ev, data) { (this.listeners[ev] || []).forEach((f) => f(data)); }

  nextTrain(hour) {
    for (const s of SCHEDULE) if (s.arr > hour + 0.001) return s;
    return { arr: SCHEDULE[0].arr + 24, dir: SCHEDULE[0].dir, dest: SCHEDULE[0].dest, tomorrow: true };
  }

  update(dt, time, night) {
    if (this.state === 'idle') {
      const h = time.hour;
      const s = this.nextTrain(h);
      this.lastDeparture = s;
      if (s.arr - h < LEAD && s.arr - h > 0) this.begin(s);
      return;
    }
    const a = this.active;
    a.t += dt;
    this.train.update(dt, night);

    switch (this.state) {
      case 'approach': {
        if (!a._whistled && this.x * a.dir < -112) {
          a._whistled = true;
          this.emit('whistle');
        }
        this.v = lerp(7, 19, clamp01(a.t / 8.5));
        this.x += this.v * a.dir * dt;
        if (Math.abs(this.x) < 168) this.train.setVisible(true);
        if (a.t > 9.0 || Math.abs(this.x) <= 44) { this.state = 'brake'; a.t = 0; }
        break;
      }
      case 'brake': {
        const remain = (Math.abs(this.x) - RAIL.stopX) * a.dir;
        const target = Math.max(1.6, Math.sqrt(Math.max(0, 2 * 2.4 * Math.max(0, remain))));
        this.v = damp(this.v, target, 3.0, dt);
        this.x += this.v * a.dir * dt;
        if (remain <= 0.06 || a.t > 10) {
          this.x = RAIL.stopX; this.v = 0;
          this.state = 'dwell'; a.t = 0;
          this.doorOpen = true;
          this.train.setDoors(true);
          this.emit('doorsOpen', a);
          this.emit('arrive', a);
        }
        break;
      }
      case 'dwell': {
        this.dwellLeft = 24 - a.t;
        if (a.t > 24) {
          this.doorOpen = false;
          this.train.setDoors(false);
          this.state = 'depart'; a.t = 0;
          this.emit('doorsClose', a);
        }
        break;
      }
      case 'depart': {
        this.v = lerp(0, 21, clamp01(a.t / 7));
        this.x += this.v * a.dir * dt;
        if (a.t > 2.4 && !a._departed) { a._departed = true; this.emit('depart', a); }
        if (Math.abs(this.x) > LEAVE) {
          this.state = 'idle';
          this.train.setVisible(false);
          this.active = null;
          this.v = 0;
        }
        break;
      }
    }
    this.train.place(this.x, a.dir);
  }

  begin(s) {
    this.active = { ...s, t: 0 };
    this.state = 'approach';
    this.x = -s.dir * SPAWN;
    this.train.setVisible(true);
    this.train.place(this.x, s.dir);
    this.emit('approach', this.active);
  }

  /** 是否正在通过道口（用于行人等待） */
  get crossingBusy() {
    if (this.state === 'approach') return Math.abs(this.x) < 96;
    if (this.state === 'brake') return true;
    if (this.state === 'dwell') return false;
    if (this.state === 'depart') return this.active && this.active.t > 2.4;
    return false;
  }
}

/* ------------------------------------------------------------------ *
 *  道口控制
 * ------------------------------------------------------------------ */
export class CrossingController {
  constructor(crossing, audio) {
    this.c = crossing;
    this.audio = audio;
    this.t = 0;
    this._top = 2.2; this._bot = 2.0;
    this.alarmed = false;
    this.blink = 0;
    this.alarmTimer = 0;
  }
  update(dt, ts) {
    const busy = ts.crossingBusy;
    const target = busy ? 1 : 0;
    this.t = damp(this.t, target, busy ? 3.4 : 1.6, dt);
    const tt = clamp01(this.t);
    for (const gate of this.c.parts.gates) {
      gate.pivot.rotation.x = (1 - tt) * (Math.PI / 2.1) * (gate.side > 0 ? 1 : -1);
    }
    // 铃声：响两声就停
    if (tt > 0.3) {
      if (this.alarmRings === undefined) this.alarmRings = 0;
      this.alarmTimer -= dt;
      if (this.alarmTimer <= 0 && this.alarmRings < 2) {
        this.audio?.playCrossingAlarm?.();
        this.alarmRings++;
        this.alarmTimer = 0.85;
      }
    } else { this.alarmTimer = 0; this.alarmRings = 0; }
    // 关闭时把玩家挡在栏杆外
    if (this.c.block) {
      const closed = clamp01((tt - 0.25) / 0.35);
      this.c.block.top = lerp(2.4, 1.4, closed);
      this.c.block.bottom = lerp(2.2, -1.0, closed);
    }
    // 闪灯
    this.blink += dt * 2.4;
    const on = tt > 0.25 && (this.blink % 1) < 0.52;
    for (const l of this.c.parts.lights) {
      l.material.color.setHex(on ? 0xff3a26 : 0x3d1515);
      l.material.opacity = tt > 0.25 ? 1 : 0.55;
    }
  }
}
