/**
 * 材质库：所有 cel-shading 材质集中在这里缓存复用。
 * 其中一组“会随昼夜变化”的材质（窗户、纸门、灯泡、招牌灯）
 * 由 setNight(nightFactor) 统一驱动。
 */
import * as THREE from 'three';
import { toonMaterial } from '../core/toon.js';

export class MaterialLibrary {
  constructor() {
    this.cache = new Map();
    this.nightMats = [];

    // 固定色
    this.wood = this._mk(0x8a6144, { steps: 3 });
    this.woodDark = this._mk(0x6d4d37, { steps: 3 });
    this.woodLight = this._mk(0xb08a63, { steps: 3 });
    this.frame = this._mk(0x5a4536, { steps: 3 });
    this.stone = this._mk(0xc3bdb2, { steps: 3 });
    this.stoneDark = this._mk(0xa8a296, { steps: 3 });
    this.concrete = this._mk(0xb9b4ac, { steps: 3 });
    this.metal = this._mk(0xa8b1b9, { steps: 3 });
    this.metalDark = this._mk(0x767f8a, { steps: 3 });
    this.soil = this._mk(0x6b5340, { steps: 2 });
    this.bush = this._mk(0x5e8c4a, { steps: 3 });
    this.doorDark = this._mk(0x3a2b24, { steps: 2 });
    this.flowerA = this._mk(0xe8708a, { steps: 2 });
    this.flowerB = this._mk(0xf0c04a, { steps: 2 });
    this.flowerC = this._mk(0xf0f0e8, { steps: 2 });
    this.track = this._mk(0x7b8087, { steps: 2 });
    this.ballast = this._mk(0x9c9384, { steps: 3 });
    this.railSteel = this._mk(0xb0b6bb, { steps: 2 });
    this.trainBody = this._mk(0xf2f0ea, { steps: 3 });
    this.trainStripe = this._mk(0x2f6f9e, { steps: 3 });
    this.trainRoof = this._mk(0x6c737c, { steps: 3 });
    this.leafPine = this._mk(0x376b50, { steps: 3 });
    this.leafBroad = this._mk(0x5e8c4a, { steps: 3 });
    this.bark = this._mk(0x6a4f3a, { steps: 3 });
    this.sakura = this._mk(0xf6bccb, { steps: 3 });
    this.sakuraDeep = this._mk(0xe88fa8, { steps: 3 });
    this.grassTuft = this._mk(0x7fa856, { steps: 2 });
    this.rice = this._mk(0x93b464, { steps: 2 });

    // 昼夜动态
    this.glass = this._night(0x8fb8cc, 0xffcf7a, 1.5);
    this.glassBig = this._night(0x9ec6d8, 0xffd68f, 1.35);
    this.paper = this._night(0xf6efdc, 0xffc978, 1.25);
    this.bulb = this._night(0xf6f0dc, 0xffe0a0, 3.2);
    this.signLit = this._night(0xf0e8d8, 0xfff0c0, 2.0);
    this.tvGlow = this._night(0x2a3a4a, 0x6fa8d8, 2.4);
  }

  _key(opts) {
    return JSON.stringify(opts, (k, v) => (v && v.isColor ? v.getHex() : v));
  }

  _mk(color, opts = {}) {
    const key = this._key({ color, ...opts });
    if (this.cache.has(key)) return this.cache.get(key);
    const mat = toonMaterial({ color, ...opts });
    this.cache.set(key, mat);
    return mat;
  }

  _night(color, emissive, intensity) {
    const mat = toonMaterial({ color, emissive, emissiveIntensity: 0, steps: 2 });
    this.nightMats.push({ mat, base: intensity });
    return mat;
  }

  /** 任意颜色的 toon 材质（缓存） */
  accentFor(color, opts = {}) {
    return this._mk(color, { steps: opts.steps ?? 3, ...opts });
  }

  wall(color) {
    return this._mk(color, { steps: 3 });
  }

  /** 屋顶：统一提亮，否则大面积深色瓦面会糊成一团 */
  roof(color) {
    return this._mk(liftColor(color, 1.55), { steps: 3, warm: 0.1 });
  }

  /** 夜景：控制窗户/灯泡的自发光强度 */
  setNight(nightFactor) {
    const k = Math.max(0, Math.min(1, nightFactor));
    for (const { mat, base } of this.nightMats) {
      mat.emissiveIntensity = base * (k * k * 0.85 + k * 0.15);
    }
  }
}


/** 在 sRGB 空间里把颜色整体提亮 k 倍（用于大面积深色构件） */
export function liftColor(hex, k = 1.4) {
  const r = clamp255(((hex >> 16) & 255) * k);
  const g = clamp255(((hex >> 8) & 255) * k);
  const b = clamp255((hex & 255) * k);
  return (r << 16) | (g << 8) | b;
}
function clamp255(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}
