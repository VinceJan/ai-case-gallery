/**
 * 玩家：第三人称角色控制器 + 轨道相机。
 * 移动、跑步、上下坡、碰撞、河与深水阻挡、蹲坐/睡眠状态、脚步声。
 */
import * as THREE from 'three';
import { angleDelta, clamp, damp, dampAngle, lerp, smoothstep } from '../core/utils.js';
import { heightAt, river, surfaceAt } from '../world/terrain.js';
import { RIVER_BLOCK } from '../world/layout.js';
import { buildCharacter } from './character.js';

const WALK = 3.3;
const RUN = 6.6;
const CROUCH = 1.5;
const ACCEL = 18;
const TURN = 13;

export class Player {
  constructor({ scene, camera, input, audio, colliders, ground }) {
    this.scene = scene;
    this.camera = camera;
    this.input = input;
    this.audio = audio;
    this.colliders = colliders;
    this.ground = ground; // { at(x,z) } 含桥梁/站台等抬高面

    this.mesh = buildCharacter({
      height: 1.68,
      skin: 0xf7d8bd,
      shirt: 0xf0f0e8,
      pants: 0x4a6a8a,
      hair: 0x3a2e28,
      hairStyle: 'short',
      accent: 0xd65545,
    });
    this.mesh.name = 'player';
    scene.add(this.mesh);
    this.anim = this.mesh.userData.anim;

    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.radius = 0.42;
    this.height = 1.68;
    this.state = 'idle'; // idle | walk | run | sit | sleep | fishing | ride
    this.locked = false;
    this.speedMul = 1;
    this.carrying = null;
    this.visible = true;

    // 相机
    this.camYaw = 0;
    this.camPitch = 0.22;
    this.camDist = 6.2;
    this.camDistTarget = 6.2;
    this.camTarget = new THREE.Vector3();
    this.camPos = new THREE.Vector3();
    this.camShake = 0;
    this._stepTimer = 0;
    this._bob = 0;
    this._groundY = 0;
    this.indoors = false;
    this.spawn = { x: 0, z: 0, rot: 0 };
    /** 固定姿势：sit / sleep / fishing / null（不受移动状态覆盖） */
    this.holdingPose = null;
    /** 相机是否锁定（对话 / 面板 / 睡觉时） */
    this.camLocked = false;
    this.camYawSmoothed = 0;
    this.camPitchSmoothed = 0.22;
  }

  setPosition(x, z, yaw = 0) {
    this.pos.set(x, this.ground.at(x, z), z);
    this.yaw = yaw;
    this.camYaw = yaw;
    this.mesh.position.copy(this.pos);
  }

  get forward() {
    return new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
  }

  /** 相机朝向（水平投影），用于交互选取 */
  get camForward() {
    return new THREE.Vector3(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
  }

  setCarrying(mesh) {
    this.carrying = mesh;
    if (mesh) {
      const p = this.mesh.userData.parts;
      mesh.position.set(0, -0.5, 0.42);
      mesh.rotation.x = 0.3;
      p.armR.add(mesh);
    }
  }

  clearCarrying() {
    if (this.carrying) {
      this.carrying.parent?.remove(this.carrying);
      this.carrying = null;
    }
  }

  /**
   * 坐到指定位置（长椅）。会记住当前位置，起身时原路返回。
   * @param {number} x @param {number} z @param {number} yaw 朝向
   */
  sitAt(x, z, yaw) {
    if (!this._sitReturn) this._sitReturn = { x: this.pos.x, z: this.pos.z, yaw: this.yaw };
    this.pos.set(x, this.ground.at(x, z), z);
    this.yaw = yaw;
    this.holdingPose = 'sit';
    this.vel.set(0, 0, 0);
  }

  /** 从长椅起身：回到坐下前的位置 */
  standUp() {
    if (this._sitReturn) {
      const r = this._sitReturn;
      this.pos.set(r.x, this.ground.at(r.x, r.z), r.z);
      this.yaw = r.yaw;
      this._sitReturn = null;
    }
    this.holdingPose = null;
  }

  /** 睡到床上：也记住位置，醒来回到床边 */
  lieDownAt(x, z, yaw) {
    if (!this._sitReturn) this._sitReturn = { x: this.pos.x, z: this.pos.z, yaw: this.yaw };
    this.pos.set(x, this.ground.at(x, z), z);
    this.yaw = yaw;
    this.holdingPose = 'sleep';
    this.vel.set(0, 0, 0);
  }

  addShake(amount) {
    this.camShake = Math.min(1, this.camShake + amount);
  }

  update(dt) {
    // 安全兜底：任何原因导致的 NaN 都会让画面永久卡死，这里拉回出生点
    if (!Number.isFinite(this.pos.x) || !Number.isFinite(this.pos.y) || !Number.isFinite(this.pos.z)) {
      console.warn('[SakuraTown] 玩家坐标异常，已重置到出生点');
      this.setPosition(this.spawn.x, this.spawn.z, this.spawn.rot);
      this.vel.set(0, 0, 0);
    }
    const input = this.input;
    const canMove = !this.locked && !this.holdingPose;

    // ---- 输入 → 期望速度 ----
    let vx = 0;
    let vz = 0;
    if (canMove) {
      const ax = input.moveAxis();
      if (ax.len > 0.05) {
        const dirX = -Math.sin(this.camYaw);
        const dirZ = -Math.cos(this.camYaw);
        const rightX = Math.cos(this.camYaw);
        const rightZ = -Math.sin(this.camYaw);
        vx = (dirX * ax.y + rightX * ax.x);
        vz = (dirZ * ax.y + rightZ * ax.x);
        const l = Math.hypot(vx, vz) || 1;
        vx /= l;
        vz /= l;
      }
    }
    const wantRun = input.down('ShiftLeft') || input.down('ShiftRight');
    const wantCrouch = input.down('ControlLeft') || input.down('KeyC');
    let maxSpeed = 0;
    if (canMove) {
      if (wantCrouch) maxSpeed = CROUCH;
      else if (wantRun && vx * vx + vz * vz > 0.01) maxSpeed = RUN;
      else if (vx * vx + vz * vz > 0.01) maxSpeed = WALK;
    }
    maxSpeed *= this.speedMul;

    // ---- 速度积分 ----
    const targetVX = vx * maxSpeed;
    const targetVZ = vz * maxSpeed;
    this.vel.x = damp(this.vel.x, targetVX, canMove ? ACCEL : 12, dt);
    this.vel.z = damp(this.vel.z, targetVZ, canMove ? ACCEL : 12, dt);
    if (Math.abs(this.vel.x) < 0.01) this.vel.x = 0;
    if (Math.abs(this.vel.z) < 0.01) this.vel.z = 0;

    // ---- 移动 + 碰撞 ----
    let nx = this.pos.x + this.vel.x * dt;
    let nz = this.pos.z + this.vel.z * dt;

    const fix = this.colliders.resolve(nx, nz, this.radius);
    nx = fix.x;
    nz = fix.z;

    // 深水阻挡
    if (!this._allowedOverWater(nx, nz)) {
      const q = river.closest(nx, nz);
      if (q.dist < RIVER_BLOCK + this.radius) {
        const dx = nx - q.point.x;
        const dz = nz - q.point.z;
        const d = Math.hypot(dx, dz) || 1;
        nx = q.point.x + (dx / d) * (RIVER_BLOCK + this.radius);
        nz = q.point.z + (dz / d) * (RIVER_BLOCK + this.radius);
        // 沿河岸滑动
        const tx = -dz / d;
        const tz = dx / d;
        const dot = this.vel.x * tx + this.vel.z * tz;
        this.vel.x = tx * dot;
        this.vel.z = tz * dot;
        this.splashed = true;
      }
    }
    // 河对岸也推一下（防止从侧面穿过去）
    const q2 = river.closest(nx, nz);
    if (!this._allowedOverWater(nx, nz) && q2.dist < RIVER_BLOCK + this.radius) {
      const dx = nx - q2.point.x;
      const dz = nz - q2.point.z;
      const d = Math.hypot(dx, dz) || 1;
      nx = q2.point.x + (dx / d) * (RIVER_BLOCK + this.radius);
      nz = q2.point.z + (dz / d) * (RIVER_BLOCK + this.radius);
    }

    // 避开稻田水面（只能从田埂走）——这里只做软限制
    this.pos.x = nx;
    this.pos.z = nz;

    // ---- 朝向 ----
    const speed = Math.hypot(this.vel.x, this.vel.z);
    if (speed > 0.12) {
      const want = Math.atan2(this.vel.x, this.vel.z);
      this.yaw = dampAngle(this.yaw, want, TURN, dt);
    }

    // ---- 地面高度 ----
    const gy = this.ground.at(this.pos.x, this.pos.z);
    this._groundY = damp(this._groundY, gy, 18, dt);
    this.pos.y = this._groundY;

    // ---- 状态 ----
    this.state = this.holdingPose
      ? this.holdingPose
      : speed > 0.2 ? (speed > 3.2 ? 'run' : 'walk') : 'idle';

    // ---- 动画 ----
    this.anim.update(dt, {
      speed,
      sitting: this.state === 'sit',
      sleeping: this.state === 'sleep',
      carrying: !!this.carrying,
    });
    this.mesh.position.copy(this.pos);
    this.mesh.rotation.y = this.yaw;

    // ---- 脚步 ----
    if (speed > 0.4 && this.state !== 'sit' && this.state !== 'sleep') {
      this._stepTimer -= dt * (speed / (wantRun ? 1.5 : 1.15));
      if (this._stepTimer <= 0) {
        this._stepTimer = 0.42;
        this.audio?.footstep(surfaceAt(this.pos.x, this.pos.z), clamp(speed / 4, 0.4, 1));
      }
    }

    this._updateCamera(dt);
  }

  _allowedOverWater(x, z) {
    const br = this.ground.bridge;
    if (!br) return false;
    return Math.abs(x) <= br.halfW - 0.4 && z > br.z0 - 0.4 && z < br.z1 + 0.4;
  }

  _updateCamera(dt) {
    const input = this.input;
    // ---- 视角 ----
    if (!this.camLocked) {
      const sens = input.pointerLocked ? 0.0032 : 0.0042;
      this.camYaw -= input.mouse.dx * sens;
      this.camPitch = clamp(this.camPitch + input.mouse.dy * sens, -0.42, 1.2);
      if (input.mouse.wheel) {
        this.camDistTarget = clamp(this.camDistTarget + input.mouse.wheel * 0.7, 2.4, 12);
      }
      // 键盘转向（Q / E 在对话外也能用）
      if (input.down('KeyQ')) this.camYaw += dt * 2.2;
      if (input.down('KeyE') && !input.down('ShiftLeft') && !input.pointerLocked) this.camYaw -= dt * 2.2;
    }
    // 轻微平滑，鼠标转视角不会发抖
    this.camYawSmoothed = damp(this.camYawSmoothed, this.camYaw, 26, dt);
    this.camPitchSmoothed = damp(this.camPitchSmoothed, this.camPitch, 26, dt);
    this.camDist = damp(this.camDist, this.camDistTarget, 8, dt);

    const focusY = this.state === 'sleep' ? 0.45 : 1.16;
    this.camTarget.set(this.pos.x, this.pos.y + focusY, this.pos.z);

    const cp = Math.cos(this.camPitchSmoothed);
    const sp = Math.sin(this.camPitchSmoothed);
    let ox = Math.sin(this.camYawSmoothed) * cp * this.camDist;
    let oz = Math.cos(this.camYawSmoothed) * cp * this.camDist;
    let oy = sp * this.camDist + 0.35;

    // 相机避障
    const dirLen = Math.hypot(ox, oz, oy) || 1;
    const dx = ox / dirLen;
    const dy = oy / dirLen;
    const dz = oz / dirLen;
    const hit = this.colliders.rayDistance(
      this.camTarget.x, this.camTarget.y, this.camTarget.z, dx, dy, dz, this.camDist,
    );
    let finalDist = this.camDist;
    if (hit < this.camDist) {
      finalDist = Math.max(0.55, hit - 0.25);
      ox = dx * finalDist;
      oy = dy * finalDist;
      oz = dz * finalDist;
    }
    // 贴得太近时把相机抬起来俯视角色，而不是怼在墙上
    if (finalDist < 2.6) {
      oy += (2.6 - finalDist) * 1.15;
      finalDist = Math.hypot(ox, oy, oz);
      if (finalDist > 0.01) {
        ox = (ox / finalDist) * Math.max(finalDist, 1.6);
        oy = (oy / finalDist) * Math.max(finalDist, 1.6);
        oz = (oz / finalDist) * Math.max(finalDist, 1.6);
      }
    }
    // 不要钻到地面以下 / 顶穿天花板
    const desiredY = this.pos.y + oy;
    const groundAtCam = this.ground.at(this.pos.x + ox, this.pos.z + oz) + 0.55;
    if (desiredY < groundAtCam) oy = groundAtCam - this.pos.y;
    if (this.ground.ceilingY !== null && this.ground.ceilingY !== undefined) {
      const maxY = this.ground.ceilingY - 0.35;
      if (this.pos.y + oy > maxY) oy = maxY - this.pos.y;
    }

    this.camShake = damp(this.camShake, 0, 4, dt);
    const sh = this.camShake;
    this.camPos.set(
      this.camTarget.x + ox + (Math.random() - 0.5) * sh * 0.24,
      this.camTarget.y + oy + (Math.random() - 0.5) * sh * 0.24,
      this.camTarget.z + oz + (Math.random() - 0.5) * sh * 0.24,
    );
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget.x, this.camTarget.y + 0.1, this.camTarget.z);
  }
}
