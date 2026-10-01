// 时间系统：一天从 07:00 开始，可暂停
import { clamp01, lerp } from '../util/math.js';

export const PHASES = [
  { id: 'dawn', name: '清晨', from: 4.6, to: 7.0 },
  { id: 'morning', name: '上午', from: 7.0, to: 11.0 },
  { id: 'noon', name: '午后', from: 11.0, to: 15.0 },
  { id: 'late', name: '傍晚前', from: 15.0, to: 17.4 },
  { id: 'evening', name: '黄昏', from: 17.4, to: 19.6 },
  { id: 'night', name: '夜晚', from: 19.6, to: 4.6 },
];

export function phaseOf(h) {
  for (const p of PHASES) {
    if (p.from <= p.to ? (h >= p.from && h < p.to) : (h >= p.from || h < p.to)) return p;
  }
  return PHASES[0];
}

export class TimeSystem {
  constructor() {
    this.hour = 7.0;
    this.day = 1;
    this.scale = 1 / 70;      // 每现实秒推进的游戏小时数
    this.paused = false;
    this.startHour = 7.0;
    this.totalHours = 0;
    this.onHour = null;
    this.onNewDay = null;
  }
  update(dt) {
    if (this.paused) return;
    const prev = this.hour;
    this.hour += dt * this.scale;
    this.totalHours += dt * this.scale;
    if (this.hour >= 24) {
      this.hour -= 24;
      this.day++;
      if (this.onNewDay) this.onNewDay(this.day);
    }
    const ph = Math.floor(prev), nh = Math.floor(this.hour);
    if (ph !== nh && this.onHour) this.onHour(nh);
  }
  get phase() { return phaseOf(this.hour); }
  get isNight() { const h = this.hour; return h >= 19.6 || h < 4.6; }
  get isDark() { const h = this.hour; return h >= 19.0 || h < 6.0; }
  /** 0=深夜 1=正午 */
  get daylight() { return clamp01((Math.sin(((this.hour - 6) / 12) * Math.PI) + 0.15) / 1.15); }
  setHour(h) {
    const nh = ((h % 24) + 24) % 24;
    if (nh < this.hour) this.day++;
    this.hour = nh;
  }
  /** 距离下一个整点的小时数 */
  get untilNextHour() { return (Math.floor(this.hour) + 1) - this.hour; }
}
