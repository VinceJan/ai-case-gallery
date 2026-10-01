// 游戏内时钟（纯逻辑）
import { clamp } from '../core/utils.js';

export const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export const START_DAY = 8;      // 4月8日（樱花满开的晚春）
export const START_MONTH = 4;

// 默认：1 实际秒 = 2 游戏分钟 → 一天 = 12 实际分钟
export const SPEED_MINUTES = [0, 2, 5, 12]; // index=速度档位（0=暂停）

export class SimClock {
  constructor(day = 1, minutes = 8 * 60) {
    this.day = day;            // 第几天（1 起）
    this.minutes = minutes;    // 当天分钟数 0..1439
    this.speedIndex = 1;
  }

  get hour() { return Math.floor(this.minutes / 60); }
  get minute() { return Math.floor(this.minutes % 60); }
  get timeText() {
    return String(this.hour).padStart(2, '0') + ':' + String(this.minute).padStart(2, '0');
  }
  get dateText() {
    return (START_MONTH) + '月' + (START_DAY + this.day - 1) + '日';
  }
  get weekdayText() { return WEEKDAYS[(this.day - 1) % 7]; }

  // 一天中的比例 0..1
  get dayT() { return this.minutes / 1440; }

  advance(realDt) {
    if (this.speedIndex === 0) return;
    this.minutes += realDt * SPEED_MINUTES[this.speedIndex];
    while (this.minutes >= 1440) {
      this.minutes -= 1440;
      this.day += 1;
    }
  }

  // 跳到第二天早上
  sleepToMorning(hour = 7) {
    this.day += 1;
    this.minutes = hour * 60;
  }

  // 快进 N 游戏小时（乘车等）
  skipHours(h) {
    this.minutes += h * 60;
    while (this.minutes >= 1440) { this.minutes -= 1440; this.day += 1; }
  }

  // 环境光照参数：返回太阳高度/强度/色温等
  lightParams() {
    const h = this.minutes / 60;
    // 日出 5:30，日落 18:40
    const sunrise = 5.5, sunset = 18.7;
    let sunAlt; // -1..1
    if (h < sunrise || h > sunset) sunAlt = -0.2;
    else sunAlt = Math.sin(Math.PI * (h - sunrise) / (sunset - sunrise));
    const isNight = h < sunrise - 0.3 || h > sunset + 0.3;
    // 日光强度
    let sunI = clamp(sunAlt * 2.6, 0, 3.0);
    // 黎明/黄昏暖色
    let warmth = 0;
    if (h > sunrise - 1 && h < sunrise + 1.2) warmth = 1 - Math.abs(h - sunrise) / 1.2;
    if (h > sunset - 1.2 && h < sunset + 1) warmth = Math.max(warmth, 1 - Math.abs(h - sunset) / 1.2);
    return {
      hour: h,
      sunAlt,
      sunI,
      warmth: clamp(warmth, 0, 1),
      isNight,
      isDawn: h > 4.5 && h < 7,
      isDusk: h > 17 && h < 20,
      // 路灯/窗户开启
      lampsOn: h < 6 || h > 17.6,
    };
  }

  serialize() { return { day: this.day, minutes: this.minutes, speedIndex: this.speedIndex }; }
  load(d) { this.day = d.day; this.minutes = d.minutes; this.speedIndex = d.speedIndex ?? 1; }
}
