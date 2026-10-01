// 第三人称相机：拖动转视角、滚轮缩放、避障
import * as THREE from 'three';
import { clamp, damp, lerp, TAU } from '../util/math.js';

export class CameraRig {
  constructor(camera, collision) {
    this.cam = camera;
    this.collision = collision;
    this.yaw = Math.PI;
    this.pitch = 0.22;
    this.dist = 6.2;
    this.targetDist = 6.2;
    this.height = 1.5;
    this.target = new THREE.Vector3();
    this.smoothTarget = new THREE.Vector3();
    this.shake = 0;
    this.indoor = false;
    this.fovBase = 52;
    this.minDist = 1.6; this.maxDist = 11;
    this.ceilH = 3.0;
    this.headLift = 0.45;
  }

  /**
   * 室内相机：房间小，改用「斜俯视」——
   * 拉高俯角、缩短距离，视线从家具上方掠过，不会被墙顶死。
   */
  setInterior(on, ceilH = 3.0) {
    this.indoor = on;
    this.ceilH = ceilH;
    if (on) {
      this.minDist = 1.4; this.maxDist = 6.5;
      this.targetDist = 3.4;
      this.headLift = 0.16;                 // 天花板低，机位抬升量要小
      this.pitch = clamp(this.pitch, 0.22, 0.85);
      if (this.pitch < 0.30) this.pitch = 0.31;
    } else {
      this.minDist = 1.6; this.maxDist = 11;
      this.targetDist = 6.2;
      this.headLift = 0.45;
      this.pitch = clamp(this.pitch, -0.42, 1.05);
      if (this.pitch > 0.25) this.pitch = 0.22;
    }
  }

  handleInput(input) {
    if (input.dragDX || input.dragDY) {
      this.yaw -= input.dragDX * 0.0055;
      const lo = this.indoor ? 0.22 : -0.42, hi = this.indoor ? 0.95 : 1.05;
      this.pitch = clamp(this.pitch + input.dragDY * 0.004, lo, hi);
    }
    if (input.wheel) {
      this.targetDist = clamp(this.targetDist + input.wheel * 0.006, this.minDist, this.maxDist);
    }
  }

  update(dt, player, lookAhead) {
    this.target.set(player.pos.x, player.pos.y + this.height, player.pos.z);
    this.smoothTarget.lerp(this.target, 1 - Math.exp(-12 * dt));

    this.dist = damp(this.dist, this.targetDist, 9, dt);

    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const dirX = Math.sin(this.yaw) * cp;
    const dirZ = Math.cos(this.yaw) * cp;
    let d = this.dist;

    // 避障
    if (this.collision) {
      const tx = this.smoothTarget.x, ty = this.smoothTarget.y, tz = this.smoothTarget.z;
      const steps = this.bounds ? 8 : 6;
      let ok = d;
      for (let i = 1; i <= steps; i++) {
        const t = (i / steps);
        const px = tx + dirX * d * t, py = ty + sp * d * t + this.headLift * t, pz = tz + dirZ * d * t;
        if (this.collision.blocked(tx, ty, tz, px, py, pz, 4)) { ok = d * t * 0.88; break; }
      }
      d = Math.max(1.1, ok);
    }

    let cx = this.smoothTarget.x + dirX * d;
    let cy = this.smoothTarget.y + sp * d + this.headLift;
    let cz = this.smoothTarget.z + dirZ * d;

    // 不穿地
    if (this.groundFn) {
      const g = this.groundFn(cx, cz) + (this.indoor ? 0.3 : 0.5);
      if (cy < g) cy = g;
    }

    if (this.bounds) {
      const b = this.bounds;
      cx = clamp(cx, b.x0, b.x1); cz = clamp(cz, b.z0, b.z1);
      cy = Math.min(cy, b.y ?? 99, this.ceilH - 0.22);
    }

    if (this.shake > 0.001) {
      cx += (Math.random() - 0.5) * this.shake;
      cy += (Math.random() - 0.5) * this.shake;
      cz += (Math.random() - 0.5) * this.shake;
      this.shake = damp(this.shake, 0, 6, dt);
    }

    this.cam.position.set(cx, cy, cz);
    this.cam.lookAt(this.smoothTarget.x, this.smoothTarget.y + 0.12, this.smoothTarget.z);
  }

  addShake(v) { this.shake = Math.min(0.6, this.shake + v); }
}
