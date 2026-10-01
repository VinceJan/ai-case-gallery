// 天气系统（纯逻辑）
// 状态：clear 晴 / cloudy 多云 / rain 雨 / storm 暴风雨 / petal 樱花吹雪
import { clamp, lerp, makeRng } from '../core/utils.js';

export const WEATHER_NAMES = {
  clear: '晴', cloudy: '多云', rain: '小雨', storm: '暴风雨', petal: '樱花吹雪',
};
export const WEATHER_ICONS = {
  clear: '☀', cloudy: '⛅', rain: '🌧', storm: '⛈', petal: '🌸',
};

export class WeatherSystem {
  constructor(seed = 2024) {
    this.rng = makeRng(seed);
    this.state = 'clear';
    this.target = 'clear';
    this.timer = 6 * 60;      // 距离下次变化（游戏分钟）
    this.blend = 1;           // 状态混合度 0..1
    this.wind = 0.3;
    this.targetWind = 0.3;
    this.intensity = 0;       // 雨的强度 0..1
    this.targetIntensity = 0;
    this.cloud = 0.15;        // 云量 0..1
    this.targetCloud = 0.15;
    this.stormForced = 0;     // 事件强制天气剩余分钟
  }

  setState(s, minutes = 120) {
    this.target = s;
    this.timer = minutes;
    this.applyTargetParams();
  }

  // 事件强制天气
  force(s, minutes) {
    this.stormForced = minutes;
    this.setState(s, minutes);
  }

  update(gameMinutes) {
    // 平滑过渡
    const k = clamp(gameMinutes / 90, 0, 1) * 0.6;
    this.state = this.target;
    this.cloud = lerp(this.cloud, this.targetCloud, k);
    this.intensity = lerp(this.intensity, this.targetIntensity, k);
    this.wind = lerp(this.wind, this.targetWind, k);

    if (this.stormForced > 0) {
      this.stormForced -= gameMinutes;
      if (this.stormForced <= 0) { this.stormForced = 0; this.pickNext(90 + this.rng() * 120); }
      return;
    }
    this.timer -= gameMinutes;
    if (this.timer <= 0) this.pickNext(90 + this.rng() * 180);
  }

  pickNext(minutes = 120) {
    const r = this.rng();
    let s;
    if (r < 0.5) s = 'clear';
    else if (r < 0.72) s = 'cloudy';
    else if (r < 0.9) s = 'rain';
    else if (r < 0.96) s = 'petal';
    else s = 'storm';
    this.setState(s, minutes);
    this.applyTargetParams();
  }

  applyTargetParams() {
    const t = this.target;
    if (t === 'clear') { this.targetCloud = 0.12; this.targetIntensity = 0; this.targetWind = 0.25; }
    else if (t === 'cloudy') { this.targetCloud = 0.55; this.targetIntensity = 0; this.targetWind = 0.4; }
    else if (t === 'rain') { this.targetCloud = 0.8; this.targetIntensity = 0.55; this.targetWind = 0.5; }
    else if (t === 'storm') { this.targetCloud = 0.95; this.targetIntensity = 1; this.targetWind = 1.1; }
    else if (t === 'petal') { this.targetCloud = 0.3; this.targetIntensity = 0; this.targetWind = 0.9; }
  }

  get isRaining() { return this.intensity > 0.15; }
  get isStorm() { return this.target === 'storm' && this.intensity > 0.6; }
  get name() { return WEATHER_NAMES[this.state] ?? WEATHER_NAMES[this.target]; }
  get icon() { return WEATHER_ICONS[this.target]; }

  serialize() {
    return { state: this.state, target: this.target, timer: this.timer, wind: this.wind, intensity: this.intensity, cloud: this.cloud, stormForced: this.stormForced, seed: 12345 };
  }
  load(d) {
    this.state = d.state; this.target = d.target; this.timer = d.timer;
    this.wind = d.wind; this.intensity = d.intensity; this.cloud = d.cloud;
    this.stormForced = d.stormForced || 0;
    this.applyTargetParams();
    this.targetCloud = this.cloud; this.targetIntensity = this.intensity; this.targetWind = this.wind;
  }
}
