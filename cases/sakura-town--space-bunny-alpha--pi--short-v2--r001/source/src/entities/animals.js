/**
 * 动物：镇上的猫（可跟随 / 可撸）、广场鸽群、空中飞鸟。
 */
import * as THREE from 'three';
import { boxGeometry, cylinderGeometry, sphereGeometry, toonMaterial } from '../core/toon.js';
import { angleDelta, clamp, damp, dampAngle, makeRNG } from '../core/utils.js';
import { heightAt, isOnRoad, roadDistance } from '../world/terrain.js';

function buildCat(bodyColor = 0xe8e2d8) {
  const g = new THREE.Group();
  const fur = toonMaterial({ color: bodyColor, steps: 3 });
  const dark = toonMaterial({ color: 0x3a3540, steps: 2 });
  const pink = toonMaterial({ color: 0xe8a0a8, steps: 2 });

  const body = new THREE.Mesh(sphereGeometry(0.24, 10), fur);
  body.scale.set(1.5, 0.9, 0.95);
  body.position.y = 0.26;
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Group();
  head.position.set(0.32, 0.34, 0);
  g.add(head);
  const skull = new THREE.Mesh(sphereGeometry(0.16, 10), fur);
  skull.scale.set(1, 0.95, 0.95);
  skull.castShadow = true;
  head.add(skull);
  const muzzle = new THREE.Mesh(sphereGeometry(0.09, 8), fur);
  muzzle.position.set(0.13, -0.04, 0);
  head.add(muzzle);
  const nose = new THREE.Mesh(sphereGeometry(0.025, 6), pink);
  nose.position.set(0.21, -0.01, 0);
  head.add(nose);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.13, 4), fur);
    ear.position.set(-0.02, 0.15, s * 0.09);
    ear.rotation.y = s * 0.4;
    head.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6), dark);
    eye.position.set(0.11, 0.03, s * 0.07);
    head.add(eye);
  }

  const legs = [];
  for (const [lx, lz] of [[0.2, 0.11], [0.2, -0.11], [-0.2, 0.11], [-0.2, -0.11]]) {
    const leg = new THREE.Mesh(cylinderGeometry(0.045, 0.04, 0.26, 6), fur);
    leg.position.set(lx, 0.13, lz);
    leg.castShadow = true;
    g.add(leg);
    legs.push(leg);
  }

  // 尾巴（分段摆动）
  const tail = new THREE.Group();
  tail.position.set(-0.32, 0.3, 0);
  g.add(tail);
  let parent = tail;
  for (let i = 0; i < 4; i++) {
    const seg = new THREE.Mesh(cylinderGeometry(0.035 - i * 0.005, 0.032 - i * 0.005, 0.16, 6), fur);
    seg.position.y = 0.08;
    seg.rotation.x = -0.3;
    const holder = new THREE.Group();
    holder.position.y = i === 0 ? 0 : 0.14;
    holder.add(seg);
    parent.add(holder);
    parent = holder;
  }
  g.userData.tail = tail;
  g.userData.tailTip = parent;
  g.userData.legs = legs;
  g.userData.head = head;

  g.traverse((o) => {
    if (o.isMesh && !o.userData.isOutline) {
      const s = new THREE.Mesh(o.geometry, toonMaterial({ color: 0xffffff, steps: 1 }));
      // 用同一 shader 的外壳材质
      o.userData.outlineShell = true;
    }
  });
  return g;
}

export class Cat {
  constructor(scene, audio, home = { x: 20, z: -66 }) {
    this.audio = audio;
    this.mesh = buildCat(0xeee8dc);
    this.mesh.name = 'cat';
    scene.add(this.mesh);
    this.pos = new THREE.Vector3(home.x, 0, home.z);
    this.home = home;
    this.yaw = 0;
    this.speed = 0;
    this.target = null;
    this.state = 'idle';
    this.timer = 0;
    this.mood = 0;
    this.following = false;
    this.rng = makeRNG(9182);
    this.phase = 0;
    this.gone = false;
  }

  setHome(x, z) {
    this.home = { x, z };
  }

  remove() {
    this.gone = true;
    this.mesh.visible = false;
  }

  restore(x, z) {
    this.gone = false;
    this.mesh.visible = true;
    this.pos.set(x, heightAt(x, z), z);
    this.state = 'idle';
    this.timer = 0;
  }

  follow(x, z) {
    this.following = true;
    this.target = { x, z };
  }

  pet() {
    this.mood = Math.min(1, this.mood + 0.34);
    this.state = 'sit';
    this.timer = 2.4;
    this.audio?.meow();
    this.audio?.heart();
    setTimeout(() => this.audio?.meow(), 420);
  }

  update(dt, playerPos) {
    if (this.gone) return;
    this.phase += dt;
    this.timer -= dt;

    if (this.following && playerPos) {
      const d = Math.hypot(playerPos.x - this.pos.x, playerPos.z - this.pos.z);
      if (d > 1.6) {
        this.state = 'walk';
        this._moveToward(playerPos.x, playerPos.z, dt, d > 4 ? 3.0 : 2.0);
      } else {
        this.state = 'sit';
        this.speed = damp(this.speed, 0, 10, dt);
        this.yaw = dampAngle(this.yaw, Math.atan2(playerPos.x - this.pos.x, playerPos.z - this.pos.z), 6, dt);
      }
    } else if (this.state === 'walk') {
      this._step(dt);
    } else {
      if (this.timer <= 0) {
        if (this.state === 'sit' || this.state === 'sleep') {
          const a = this.rng() * Math.PI * 2;
          const r = this.rng.range(2, 8);
          this.target = { x: this.home.x + Math.cos(a) * r, z: this.home.z + Math.sin(a) * r };
          this.state = 'walk';
        } else {
          this.state = this.rng.chance(0.4) ? 'sleep' : 'sit';
          this.timer = this.rng.range(3, 9);
        }
      }
      this.speed = damp(this.speed, 0, 8, dt);
    }

    // 摆动
    const u = this.mesh.userData;
    const walking = this.state === 'walk' && this.speed > 0.2;
    u.legs.forEach((l, i) => {
      const off = i === 0 || i === 3 ? 0 : Math.PI;
      l.rotation.x = walking ? Math.sin(this.phase * 9 + off) * 0.5 : 0;
    });
    u.tail.rotation.y = Math.sin(this.phase * 2.4) * 0.3 + 0.2;
    u.tail.rotation.z = Math.sin(this.phase * 1.7) * 0.16;
    if (this.state === 'sit') {
      this.mesh.position.y = heightAt(this.pos.x, this.pos.z) + 0.06;
      u.head.rotation.x = 0.12;
    } else if (this.state === 'sleep') {
      this.mesh.position.y = heightAt(this.pos.x, this.pos.z) - 0.1;
      this.mesh.scale.y = 0.7;
      u.head.rotation.x = 0.5;
    } else {
      this.mesh.position.y = heightAt(this.pos.x, this.pos.z);
      this.mesh.scale.y = damp(this.mesh.scale.y, 1, 8, dt);
      u.head.rotation.x = 0;
    }
    this.mesh.position.x = this.pos.x;
    this.mesh.position.z = this.pos.z;
    this.mesh.rotation.y = this.yaw;
  }

  _moveToward(tx, tz, dt, speed) {
    const dx = tx - this.pos.x;
    const dz = tz - this.pos.z;
    const d = Math.hypot(dx, dz) || 1;
    this.speed = damp(this.speed, speed, 6, dt);
    this.pos.x += (dx / d) * this.speed * dt;
    this.pos.z += (dz / d) * this.speed * dt;
    this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 8, dt);
  }

  _step(dt) {
    if (!this.target) {
      this.state = 'sit';
      this.timer = 3;
      return;
    }
    const d = Math.hypot(this.target.x - this.pos.x, this.target.z - this.pos.z);
    if (d < 0.4) {
      this.state = this.mood > 0.6 ? 'sit' : 'sit';
      this.timer = 2 + this.rng() * 5;
      this.target = null;
      return;
    }
    this._moveToward(this.target.x, this.target.z, dt, 1.7);
  }
}

// ---------------------------------------------------------------------------
// 鸽子
// ---------------------------------------------------------------------------
function pigeonMesh() {
  const g = new THREE.Group();
  const body = toonMaterial({ color: 0x9aa4b0, steps: 3 });
  const wing = toonMaterial({ color: 0x7f8a96, steps: 2 });
  const b = new THREE.Mesh(sphereGeometry(0.11, 8), body);
  b.scale.set(1.5, 1, 1);
  b.position.y = 0.12;
  b.castShadow = true;
  g.add(b);
  const head = new THREE.Mesh(sphereGeometry(0.07, 7), body);
  head.position.set(0.14, 0.22, 0);
  g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.07, 5), toonMaterial({ color: 0xe8b64c, steps: 2 }));
  beak.position.set(0.22, 0.21, 0);
  beak.rotation.z = -Math.PI / 2;
  g.add(beak);
  const w1 = new THREE.Mesh(boxGeometry(0.16, 0.03, 0.12), wing);
  w1.position.set(-0.02, 0.16, 0.08);
  const w2 = w1.clone();
  w2.position.z = -0.08;
  g.add(w1, w2);
  g.userData.wings = [w1, w2];
  return g;
}

export class Pigeons {
  constructor(scene, center = { x: 0, z: -4 }, count = 9) {
    this.list = [];
    const rng = makeRNG(555);
    for (let i = 0; i < count; i++) {
      const p = pigeonMesh();
      p.position.set(center.x + rng.range(-7, 7), heightAt(center.x, center.z), center.z + rng.range(-6, 6));
      p.rotation.y = rng() * Math.PI * 2;
      scene.add(p);
      this.list.push({
        mesh: p,
        home: new THREE.Vector2(center.x + rng.range(-8, 8), center.z + rng.range(-7, 7)),
        pos: new THREE.Vector2(p.position.x, p.position.z),
        target: new THREE.Vector2(p.position.x, p.position.z),
        yaw: rng() * Math.PI * 2,
        flying: 0,
        timer: rng.range(1, 5),
        rng,
      });
    }
  }

  update(dt, playerPos) {
    for (const p of this.list) {
      p.timer -= dt;
      if (p.timer <= 0) {
        p.timer = p.rng.range(2.5, 7);
        const a = p.rng() * Math.PI * 2;
        const r = p.rng.range(2, 9);
        p.target.set(p.home.x + Math.cos(a) * r, p.home.y + Math.sin(a) * r);
        // 玩家靠近就炸群
        if (playerPos && Math.hypot(playerPos.x - p.pos.x, playerPos.z - p.pos.y) < 3.4) {
          p.flying = 1.4;
          p.target.set(
            p.pos.x + p.rng.range(-6, 6),
            p.pos.y + p.rng.range(-6, 6),
          );
        }
      }
      if (p.flying > 0) p.flying -= dt;
      const dx = p.target.x - p.pos.x;
      const dz = p.target.y - p.pos.y;
      const d = Math.hypot(dx, dz);
      const sp = p.flying > 0 ? 5.5 : 0.9;
      if (d > 0.25) {
        p.pos.x += (dx / d) * sp * dt;
        p.pos.y += (dz / d) * sp * dt;
        p.yaw = dampAngle(p.yaw, Math.atan2(dx, dz), 7, dt);
      }
      const gy = heightAt(p.pos.x, p.pos.y);
      const targetY = p.flying > 0 ? gy + 2.2 + Math.sin(p.timer * 3) * 0.4 : gy;
      p.mesh.position.x = p.pos.x;
      p.mesh.position.z = p.pos.y;
      p.mesh.position.y = damp(p.mesh.position.y, targetY, 5, dt);
      p.mesh.rotation.y = p.yaw;
      const flap = p.flying > 0 ? Math.sin(performance.now() * 0.02) * 1.1 : 0;
      p.mesh.userData.wings[0].rotation.x = flap;
      p.mesh.userData.wings[1].rotation.x = -flap;
    }
  }
}

// ---------------------------------------------------------------------------
// 飞鸟（高空点缀）
// ---------------------------------------------------------------------------
export class Birds {
  constructor(scene, count = 9) {
    this.list = [];
    const rng = makeRNG(2468);
    const mat = toonMaterial({ color: 0x3f4a56, steps: 2 });
    const geo = new THREE.BufferGeometry();
    // 一个简单的 V 形鸟
    const v = new Float32Array([
      0, 0, 0.2, -0.5, 0.05, -0.1, 0, 0, -0.05,
      0, 0, 0.2, 0, 0, -0.05, 0.5, 0.05, -0.1,
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(v, 3));
    geo.computeVertexNormals();
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.setScalar(rng.range(0.7, 1.3));
      mesh.userData.noOutline = true;
      scene.add(mesh);
      this.list.push({
        mesh,
        r: rng.range(28, 70),
        a: rng() * Math.PI * 2,
        y: rng.range(24, 46),
        sp: rng.range(0.09, 0.2) * (rng.chance(0.5) ? 1 : -1),
        wob: rng.range(0, 10),
      });
    }
  }

  update(dt, cx, cz) {
    for (const b of this.list) {
      b.a += b.sp * dt;
      b.mesh.position.set(
        cx + Math.cos(b.a) * b.r,
        b.y + Math.sin(b.wob + performance.now() * 0.0004) * 2.4,
        cz + Math.sin(b.a) * b.r,
      );
      b.mesh.rotation.y = -b.a + (b.sp > 0 ? -Math.PI / 2 : Math.PI / 2);
    }
  }
}
