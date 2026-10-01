// 玩家控制：移动 / 碰撞 / 姿态 / 区域切换
import * as THREE from 'three';
import { createCharacter } from './character.js';
import { clamp, clamp01, damp, dampAngle, lerp, wrapAngle } from '../util/math.js';
import { canWalk } from '../systems/collision.js';

const WALK = 2.55, RUN = 4.9;

export class Player {
  constructor(collision) {
    this.collision = collision;
    this.pos = new THREE.Vector3(0, 0, 0);
    this.yaw = 0;
    this.vel = new THREE.Vector3();
    this.speed = 0;
    this.groundFn = () => 0;
    this.zone = 'world';
    this.char = createCharacter({ seed0: 0.3 });
    this.obj = this.char.root;
    this.obj.name = 'player';
    this.frozen = false;
    this.sitTarget = null;
    this._bob = 0;
    this.radius = 0.34;
    this.speedScale = 1;
  }

  teleport(x, y, z, yaw) {
    this.pos.set(x, y, z);
    if (yaw !== undefined) this.yaw = yaw;
    this.vel.set(0, 0, 0);
    this.sync();
  }

  sync() {
    this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.obj.rotation.y = this.yaw;
  }

  update(dt, input, camYaw) {
    if (this.frozen) { this.speed = 0; this.char.update(dt, 0); this.char.setMode(this.sitTarget ? 'sit' : 'idle'); this.sync(); return; }

    // 坐下
    if (this.sitTarget) {
      const d = Math.hypot(this.sitTarget.x - this.pos.x, this.sitTarget.z - this.pos.z);
      if (d > 0.9 || input.hit('e', 'escape')) { this.sitTarget = null; }
      else {
        this.char.setMode('sit');
        this.yaw = dampAngle(this.yaw, Math.atan2(this.sitTarget.dx ?? 0, this.sitTarget.dz ?? 1), 8, dt);
        this.char.update(dt, 0);
        this.sync();
        return;
      }
    }

    const ax = input.axis();
    const running = input.down('shift');
    let target = new THREE.Vector3();
    if (ax.len > 0) {
      const cs = Math.cos(camYaw), sn = Math.sin(camYaw);
      // camYaw: 0 = 相机在 -Z 方向看 +Z
      const fx = sn, fz = cs;
      const rx = cs, rz = -sn;
      target.set(fx * ax.y + rx * ax.x, 0, fz * ax.y + rz * ax.x);
      if (target.lengthSq() > 0) target.normalize();
    }
    const maxSpeed = (running ? RUN : WALK) * this.speedScale;
    const desired = target.multiplyScalar(maxSpeed);

    const accel = ax.len > 0 ? 18 : 14;
    this.vel.x = damp(this.vel.x, desired.x, accel, dt);
    this.vel.z = damp(this.vel.z, desired.z, accel, dt);
    this.speed = Math.hypot(this.vel.x, this.vel.z);

    if (this.speed > 0.12) {
      this.yaw = dampAngle(this.yaw, Math.atan2(this.vel.x, this.vel.z), 13, dt);
    }

    // 分轴移动以便于贴墙滑行
    const r = this.radius;
    const step = (dx, dz) => {
      const nx = this.pos.x + dx, nz = this.pos.z + dz;
      if (this.zone === 'world' && !canWalk(this.pos.x, this.pos.z, nx, nz, this.groundFn)) return false;
      const res = this.collision.resolve(nx, nz, r, this.pos.y, 3);
      // 碰撞后再检查一次地形
      if (this.zone === 'world' && !canWalk(this.pos.x, this.pos.z, res.x, res.z, this.groundFn)) return false;
      this.pos.x = res.x; this.pos.z = res.z;
      return true;
    };
    const mdx = this.vel.x * dt, mdz = this.vel.z * dt;
    if (!step(mdx, 0)) this.vel.x *= 0.2;
    if (!step(0, mdz)) this.vel.z *= 0.2;

    // 地面
    const gy = this.groundFn(this.pos.x, this.pos.z);
    this.pos.y = damp(this.pos.y, gy, 22, dt);
    if (Math.abs(this.pos.y - gy) < 0.02) this.pos.y = gy;

    this.char.setMode('idle');
    this.char.update(dt, this.speed);
    this.sync();
  }

  /** 供交互系统：面朝方向 */
  facing() { return this.yaw; }
}
