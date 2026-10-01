// 时间系统：昼夜光照曲线 + 环境参数合成
import * as THREE from 'three';
import { clamp, lerp, damp } from '../core/Utils.js';

// 关键帧：[小时, 天顶色, 地平色, 阳光色, 阳光强度, 半球光强, 环境光强, 雾色, 雾近, 雾远, 星]
const KEYS = [
  [0.0, '#0a1230', '#1b2a4a', '#b9c6ef', 0.34, 0.62, 0.34, '#141f3a', 55, 330, 1.0],
  [4.6, '#101a3c', '#2c3358', '#aab8e8', 0.34, 0.64, 0.34, '#1b2440', 55, 320, 0.9],
  [6.0, '#3f5688', '#b98a86', '#ffb27a', 1.15, 0.75, 0.30, '#c9a493', 50, 300, 0.35],
  [7.0, '#6a8fc4', '#f0c39c', '#ffd0a0', 2.20, 1.15, 0.38, '#d8c4b4', 55, 310, 0.05],
  [9.0, '#6fa0d8', '#dfeaf2', '#ffeccb', 2.80, 1.45, 0.42, '#d5e2ea', 60, 330, 0.0],
  [12.0, '#5d92cf', '#cfe3ef', '#fff4e0', 3.10, 1.60, 0.45, '#cfe0ea', 65, 350, 0.0],
  [15.5, '#6b96cc', '#e6d9c4', '#ffedcf', 2.90, 1.50, 0.44, '#ddd6c8', 62, 340, 0.0],
  [17.6, '#7a90c0', '#f7c48a', '#ffbe78', 2.10, 1.20, 0.40, '#e8c9a8', 55, 320, 0.0],
  [18.8, '#5a628f', '#e89a78', '#ff9a55', 1.20, 0.85, 0.32, '#d99a80', 50, 300, 0.25],
  [19.8, '#39426e', '#a05f6e', '#e07050', 0.55, 0.55, 0.24, '#8a5a68', 45, 280, 0.65],
  [21.2, '#16204a', '#2a3355', '#aab8e8', 0.34, 0.62, 0.34, '#1c2542', 50, 300, 0.9],
  [24.0, '#0a1230', '#1b2a4a', '#b9c6ef', 0.34, 0.62, 0.34, '#141f3a', 55, 330, 1.0],
];

const PHASES = [
  [5, '清晨'], [8, '上午'], [11, '正午'], [13, '午后'], [17, '傍晚'], [19, '黄昏'], [21, '夜晚'], [24, '深夜'],
];

export class TimeSystem {
  constructor(scene) {
    this.scene = scene;
    this.hours = 8.2;          // 开局 08:12
    this.day = 1;
    this.timeScale = 1.0;      // 游戏分钟 / 真实秒
    this.boost = 1;            // T 键加速倍率
    this.rain = 0;             // 由 WeatherSystem 写入 0..1
    this.paused = false;

    // 灯光
    this.sun = new THREE.DirectionalLight(0xfff4e0, 3.0);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const sc = this.sun.shadow.camera;
    sc.near = 10; sc.far = 320;
    sc.left = -75; sc.right = 75; sc.top = 75; sc.bottom = -75;
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.03;
    scene.add(this.sun);
    scene.add(this.sun.target);

    this.hemi = new THREE.HemisphereLight(0xcfe0ff, 0x8a9a6a, 1.5);
    scene.add(this.hemi);
    this.ambient = new THREE.AmbientLight(0xffffff, 0.42);
    scene.add(this.ambient);
    // 月光（夜间冷色补光，不投影）
    this.moon = new THREE.DirectionalLight(0x9fb8ff, 0);
    scene.add(this.moon);
    scene.add(this.moon.target);

    // 环境参数（输出给 Sky）
    this.env = {
      skyTop: new THREE.Color('#5d92cf'),
      skyHorizon: new THREE.Color('#cfe3ef'),
      sunColor: new THREE.Color('#fff4e0'),
      sunDir: new THREE.Vector3(0.4, 0.7, 0.6).normalize(),
      sunStrength: 1,
      sunVisible: 1,
      moonVisible: 0,
      starOpacity: 0,
      cloudColor: new THREE.Color('#ffffff'),
      cloudOpacity: 0.92,
    };

    this._c1 = new THREE.Color();
    this._c2 = new THREE.Color();
    this._c3 = new THREE.Color();
    this._c4 = new THREE.Color();
    this.onNewDay = null;
  }

  get phase() {
    const h = this.hours;
    for (const [t, name] of PHASES) if (h < t) return name;
    return '深夜';
  }

  get isNight() { return this.hours >= 19.2 || this.hours < 5.2; }

  timeString() {
    const h = Math.floor(this.hours), m = Math.floor((this.hours - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  /** 0..1：室内/窗户是否应亮灯 */
  indoorLightFactor() {
    return clamp((this.hours - 16.5) / 2.5, 0, 1) * (1 - clamp((this.hours - 5) / 1.5, 0, 1) * 0);
  }

  update(dt, focus) {
    if (!this.paused) {
      this.hours += (dt * this.timeScale * this.boost) / 60;
      if (this.hours >= 24) {
        this.hours -= 24;
        this.day++;
        if (this.onNewDay) this.onNewDay(this.day);
      }
    }
    const h = this.hours;
    // 关键帧插值
    let i = 0;
    while (i < KEYS.length - 2 && h > KEYS[i + 1][0]) i++;
    const a = KEYS[i], b = KEYS[i + 1];
    const t = clamp((h - a[0]) / (b[0] - a[0]), 0, 1);
    const skyTop = this._c1.set(a[1]).lerp(this._c2.set(b[1]), t).clone();
    const skyHor = this._c1.set(a[2]).lerp(this._c2.set(b[2]), t).clone();
    const sunCol = this._c1.set(a[3]).lerp(this._c2.set(b[3]), t).clone();
    const sunI = lerp(a[4], b[4], t);
    const hemiI = lerp(a[5], b[5], t);
    const ambI = lerp(a[6], b[6], t);
    const fogCol = this._c1.set(a[7]).lerp(this._c2.set(b[7]), t).clone();
    const fogNear = lerp(a[8], b[8], t);
    const fogFar = lerp(a[9], b[9], t);
    const stars = lerp(a[10], b[10], t);

    // 太阳方向（6 点东升，18 点西落）
    const ang = ((h - 6) / 24) * Math.PI * 2;
    const sunDir = this.env.sunDir.set(Math.cos(ang), Math.sin(ang), -0.32).normalize();
    const sunVis = clamp(Math.sin(ang) * 6 + 0.5, 0, 1);

    // 阴雨：压暗天空、加强雾
    const r = this.rain;
    if (r > 0) {
      skyTop.lerp(this._c3.set('#5a6472'), r * 0.75);
      skyHor.lerp(this._c3.set('#8e97a2'), r * 0.75);
      fogCol.lerp(this._c3.set('#7d8794'), r * 0.8);
      sunCol.lerp(this._c3.set('#aeb8c4'), r * 0.7);
    }

    // 应用灯光
    this.sun.intensity = sunI * (1 - r * 0.55);
    this.sun.color.copy(sunCol);
    this.hemi.intensity = hemiI * (1 - r * 0.25);
    this.hemi.color.copy(skyHor);
    this.ambient.intensity = ambI * (1 - r * 0.15);

    // 月光
    this.moon.intensity = clamp(1 - sunVis, 0, 1) * 0.55 * (1 - r * 0.6);
    if (focus) {
      this.moon.position.set(focus.x - sunDir.x * 120, -sunDir.y * 120 + 30, focus.z - sunDir.z * 120);
      this.moon.target.position.set(focus.x, 0, focus.z);
      this.moon.target.updateMatrixWorld();
    }

    // 阴影跟随玩家（紧凑小镇，保证近处清晰）
    if (focus) {
      this.sun.position.set(focus.x + sunDir.x * 120, sunDir.y * 120 + 20, focus.z + sunDir.z * 120);
      this.sun.target.position.set(focus.x, 0, focus.z);
    }
    this.sun.target.updateMatrixWorld();

    // 雾
    if (!this.scene.fog) this.scene.fog = new THREE.Fog(0xcfe0ea, 60, 340);
    this.scene.fog.color.copy(fogCol);
    this.scene.fog.near = fogNear * (1 - r * 0.35);
    this.scene.fog.far = fogFar * (1 - r * 0.4);

    // 输出环境
    this.env.skyTop.copy(skyTop);
    this.env.skyHorizon.copy(skyHor);
    this.env.sunColor.copy(sunCol);
    this.env.sunStrength = clamp(sunI / 3.1, 0.15, 1.2);
    this.env.sunVisible = sunVis;
    this.env.moonVisible = clamp(1 - sunVis, 0, 1) * clamp(stars * 1.4, 0, 1);
    this.env.starOpacity = stars * (1 - r);
    this.env.cloudColor.copy(r > 0.4 ? this._c3.set('#6d7684') : skyHor).lerp(this._c4.set('#ffffff'), 0.45);
    this.env.cloudOpacity = 0.92;
  }

  /** 睡觉/跳时：直接推进小时 */
  skipTo(hour) {
    let target = hour;
    if (target <= this.hours) { this.day++; if (this.onNewDay) this.onNewDay(this.day); }
    this.hours = target;
  }
}
