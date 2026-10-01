// 天气系统（可选增强项）：雨天
import * as THREE from 'three';
import { canvasTexture, rand, clamp, damp } from '../core/Utils.js';

export class WeatherSystem {
  constructor(scene) {
    this.scene = scene;
    this.rain = 0;            // 当前 0..1
    this.targetRain = 0;      // 目标
    this.wetness = 0;         // 地面潮湿程度
    this.thunder = 0;
    this._wetMats = [];       // { mat, base: Color }
    this._t = 0;

    // 雨丝粒子
    const N = 1400;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = rand(-45, 45);
      pos[i * 3 + 1] = rand(0, 34);
      pos[i * 3 + 2] = rand(-45, 45);
      vel[i] = rand(16, 24);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const tex = canvasTexture(16, 64, (ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(190,215,235,0)');
      grad.addColorStop(0.5, 'rgba(200,222,240,.9)');
      grad.addColorStop(1, 'rgba(190,215,235,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(6, 0, 4, h);
    });
    this.rainMat = new THREE.PointsMaterial({
      map: tex, size: 0.55, transparent: true, opacity: 0,
      depthWrite: false, color: 0xcfe2f2,
    });
    this.rainPoints = new THREE.Points(g, this.rainMat);
    this.rainPoints.frustumCulled = false;
    this.rainPoints.visible = false;
    scene.add(this.rainPoints);
    this._vel = vel;
    this._center = new THREE.Vector3(0, 0, 0);
  }

  /** 注册可被淋湿的材质（道路/地面） */
  registerWet(mat, tint = 0.35) {
    this._wetMats.push({ mat, base: mat.color.clone(), tint });
  }

  get raining() { return this.rain > 0.35; }

  toggle() {
    this.targetRain = this.targetRain > 0.5 ? 0 : 1;
    return this.targetRain > 0.5;
  }

  update(dt, focus) {
    this._t += dt;
    this.rain = damp(this.rain, this.targetRain, 0.6, dt);
    this.wetness = damp(this.wetness, this.targetRain, 0.35, dt);
    this.rainMat.opacity = this.rain * 0.85;
    this.rainPoints.visible = this.rain > 0.02;

    // 雨区跟随玩家
    if (focus) {
      this._center.set(focus.x, 0, focus.z);
      this.rainPoints.position.set(
        Math.round(focus.x / 2) * 2, 0, Math.round(focus.z / 2) * 2
      );
    }
    if (this.rain > 0.02) {
      const p = this.rainPoints.geometry.attributes.position;
      const arr = p.array;
      const wind = 0.35;
      for (let i = 0; i < this._vel.length; i++) {
        arr[i * 3 + 1] -= this._vel[i] * dt * this.rain;
        arr[i * 3] += wind * dt * 6;
        if (arr[i * 3 + 1] < -2) {
          arr[i * 3] = rand(-45, 45);
          arr[i * 3 + 1] = rand(26, 34);
          arr[i * 3 + 2] = rand(-45, 45);
        }
        if (arr[i * 3] > 45) arr[i * 3] -= 90;
      }
      p.needsUpdate = true;
    }

    // 地面潮湿
    for (const w of this._wetMats) {
      const target = w.base.clone().lerp(new THREE.Color('#5a626e'), this.wetness * w.tint);
      w.mat.color.lerp(target, 1 - Math.exp(-2.5 * dt));
    }
  }
}
