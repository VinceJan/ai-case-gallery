import * as THREE from 'three';

const KEYFRAMES = [
  { hour: 0, skyTop: 0x0f1630, skyMid: 0x1c284d, skyHorizon: 0x2c385e, sunColor: 0x9ab8ff, sunIntensity: 0.25, hemiSky: 0x3b4d82, hemiGround: 0x1d202b, hemiIntensity: 0.55, fogColor: 0x1d2846, nightFactor: 1.0 },
  { hour: 5.5, skyTop: 0x2f4378, skyMid: 0x867aa8, skyHorizon: 0xf4b6a4, sunColor: 0xffc69d, sunIntensity: 0.72, hemiSky: 0xbba4c8, hemiGround: 0x5c5350, hemiIntensity: 0.75, fogColor: 0xdfb7b8, nightFactor: 0.45 },
  { hour: 8, skyTop: 0x4b93db, skyMid: 0x8bc5f2, skyHorizon: 0xdfeffc, sunColor: 0xfff5de, sunIntensity: 1.55, hemiSky: 0xb5defc, hemiGround: 0x868c74, hemiIntensity: 0.92, fogColor: 0xd4eaf8, nightFactor: 0.0 },
  { hour: 13, skyTop: 0x3d88d8, skyMid: 0x81c0f4, skyHorizon: 0xdef1ff, sunColor: 0xfffbf0, sunIntensity: 1.7, hemiSky: 0xc2e5ff, hemiGround: 0x8b9579, hemiIntensity: 0.96, fogColor: 0xd6ecfa, nightFactor: 0.0 },
  { hour: 16.5, skyTop: 0x5182be, skyMid: 0xa6b9db, skyHorizon: 0xfde2be, sunColor: 0xffd598, sunIntensity: 1.45, hemiSky: 0xe6d3bc, hemiGround: 0x847664, hemiIntensity: 0.88, fogColor: 0xf2d9c2, nightFactor: 0.08 },
  { hour: 18.2, skyTop: 0x3b4880, skyMid: 0xc97686, skyHorizon: 0xffb37b, sunColor: 0xff925c, sunIntensity: 1.15, hemiSky: 0xe89ea0, hemiGround: 0x624d4e, hemiIntensity: 0.76, fogColor: 0xe8a596, nightFactor: 0.62 },
  { hour: 20, skyTop: 0x161f42, skyMid: 0x2c3666, skyHorizon: 0x514c78, sunColor: 0xa4beff, sunIntensity: 0.35, hemiSky: 0x4c5e94, hemiGround: 0x252635, hemiIntensity: 0.6, fogColor: 0x2a3254, nightFactor: 0.95 },
  { hour: 24, skyTop: 0x0f1630, skyMid: 0x1c284d, skyHorizon: 0x2c385e, sunColor: 0x9ab8ff, sunIntensity: 0.25, hemiSky: 0x3b4d82, hemiGround: 0x1d202b, hemiIntensity: 0.55, fogColor: 0x1d2846, nightFactor: 1.0 },
];

export class TimeSystem {
  constructor() {
    this.day = 1;
    this.minutes = 8 * 60 + 15;
    this.speedMultiplier = 1;
    this.paused = false;

    this.colors = {
      skyTop: new THREE.Color(),
      skyMid: new THREE.Color(),
      skyHorizon: new THREE.Color(),
      sunColor: new THREE.Color(),
      hemiSky: new THREE.Color(),
      hemiGround: new THREE.Color(),
      fogColor: new THREE.Color(),
    };
    this.sunIntensity = 1.5;
    this.hemiIntensity = 0.9;
    this.nightFactor = 0;
    this.sunDirection = new THREE.Vector3(0.4, 0.7, 0.3).normalize();

    this._tmpA = new THREE.Color();
    this._tmpB = new THREE.Color();
    this._computeState();
  }

  get hour() { return this.minutes / 60; }

  toggleSpeed() {
    this.speedMultiplier = this.speedMultiplier === 1 ? 3 : 1;
    return this.speedMultiplier;
  }

  advanceToNextMorning() {
    this.day += 1;
    this.minutes = 7 * 60 + 30;
    this._computeState();
  }

  setHour(h) {
    this.minutes = ((h % 24) + 24) % 24 * 60;
    this._computeState();
  }

  update(dt) {
    if (!this.paused) {
      this.minutes += dt * 1.5 * this.speedMultiplier;
      if (this.minutes >= 1440) {
        this.minutes -= 1440;
        this.day += 1;
      }
    }
    this._computeState();
  }

  getFormattedTime() {
    const totalMin = Math.floor(this.minutes);
    const h = Math.floor(totalMin / 60) % 24;
    const m = totalMin % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  getPeriodInfo() {
    const h = this.hour;
    if (h >= 5 && h < 8) return { label: '清晨', icon: '🌅' };
    if (h >= 8 && h < 11.5) return { label: '上午', icon: '☀' };
    if (h >= 11.5 && h < 14) return { label: '正午', icon: '☀' };
    if (h >= 14 && h < 17) return { label: '午后', icon: '🌤' };
    if (h >= 17 && h < 19.2) return { label: '黄昏', icon: '🌇' };
    return { label: '夜晚', icon: '🌙' };
  }

  _lerpColor(target, hexA, hexB, t) {
    this._tmpA.setHex(hexA);
    this._tmpB.setHex(hexB);
    target.copy(this._tmpA).lerp(this._tmpB, t);
  }

  _computeState() {
    const h = this.hour;
    let a = KEYFRAMES[0];
    let b = KEYFRAMES[KEYFRAMES.length - 1];
    for (let i = 0; i < KEYFRAMES.length - 1; i++) {
      if (h >= KEYFRAMES[i].hour && h <= KEYFRAMES[i + 1].hour) {
        a = KEYFRAMES[i];
        b = KEYFRAMES[i + 1];
        break;
      }
    }
    const span = Math.max(0.0001, b.hour - a.hour);
    const t = THREE.MathUtils.smoothstep((h - a.hour) / span, 0, 1);

    this._lerpColor(this.colors.skyTop, a.skyTop, b.skyTop, t);
    this._lerpColor(this.colors.skyMid, a.skyMid, b.skyMid, t);
    this._lerpColor(this.colors.skyHorizon, a.skyHorizon, b.skyHorizon, t);
    this._lerpColor(this.colors.sunColor, a.sunColor, b.sunColor, t);
    this._lerpColor(this.colors.hemiSky, a.hemiSky, b.hemiSky, t);
    this._lerpColor(this.colors.hemiGround, a.hemiGround, b.hemiGround, t);
    this._lerpColor(this.colors.fogColor, a.fogColor, b.fogColor, t);

    this.sunIntensity = THREE.MathUtils.lerp(a.sunIntensity, b.sunIntensity, t);
    this.hemiIntensity = THREE.MathUtils.lerp(a.hemiIntensity, b.hemiIntensity, t);
    this.nightFactor = THREE.MathUtils.lerp(a.nightFactor, b.nightFactor, t);

    const isDay = h >= 5.5 && h <= 19;
    if (isDay) {
      const dayT = (h - 5.5) / (19 - 5.5);
      const angle = dayT * Math.PI;
      this.sunDirection.set(
        Math.cos(angle) * 0.85,
        Math.max(0.14, Math.sin(angle) * 0.88),
        0.42
      ).normalize();
    } else {
      this.sunDirection.set(-0.35, 0.72, 0.45).normalize();
    }
  }
}
