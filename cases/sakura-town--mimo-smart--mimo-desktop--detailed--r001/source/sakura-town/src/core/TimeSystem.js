import { bus } from './EventBus.js';

const DAY_NAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

/**
 * In-game clock. One real second = `timeScale` game minutes.
 * Default: 1 real minute ≈ 12 game minutes → a full day in ~2 real minutes
 * but we use a slower, more livable pace: 1 real second = 0.05 game hours
 * → full day = 8 real minutes.
 */
export class TimeSystem {
  constructor() {
    this.hour = 8.0;
    this.day = 0; // days since start
    this.timeScale = 24 / (8 * 60); // hours per real second → day in 8 min
    this.paused = false;
    this.speedMultiplier = 1;
    this.dateLabel = '4月12日';
  }

  get dayOfWeek() {
    return DAY_NAMES[this.day % 7];
  }

  get isWeekend() {
    return this.day % 7 === 5 || this.day % 7 === 6;
  }

  get isNight() {
    return this.hour < 6 || this.hour >= 19.5;
  }

  get isMorning() {
    return this.hour >= 6 && this.hour < 12;
  }

  get isAfternoon() {
    return this.hour >= 12 && this.hour < 17;
  }

  get isEvening() {
    return this.hour >= 17 && this.hour < 19.5;
  }

  /** 0..1 progress through the day */
  get dayT() {
    return this.hour / 24;
  }

  /** Commute windows used by NPCs */
  get isCommuteMorning() {
    return this.hour >= 7 && this.hour < 9;
  }

  get isCommuteEvening() {
    return this.hour >= 17 && this.hour < 19;
  }

  get isSchoolHours() {
    return !this.isWeekend && this.hour >= 8.2 && this.hour < 15.5;
  }

  format() {
    const h = Math.floor(this.hour);
    const m = Math.floor((this.hour - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  update(dt) {
    if (this.paused) return;
    const prevHour = this.hour;
    this.hour += dt * this.timeScale * this.speedMultiplier;

    // Hour tick events
    const hourInt = Math.floor(this.hour);
    const prevHourInt = Math.floor(prevHour);
    if (hourInt !== prevHourInt && hourInt < 24) {
      bus.emit('time:hour', { hour: hourInt, day: this.day });
    }

    // Half-hour soft ticks
    const half = Math.floor(this.hour * 2);
    const prevHalf = Math.floor(prevHour * 2);
    if (half !== prevHalf) {
      bus.emit('time:half', { hour: this.hour, day: this.day });
    }

    while (this.hour >= 24) {
      this.hour -= 24;
      this.day += 1;
      bus.emit('time:day', { day: this.day, hour: this.hour });
    }

    bus.emit('time:tick', { hour: this.hour, day: this.day, text: this.format() });
  }

  /** Fast-forward to a given hour (e.g. sleeping) */
  skipTo(hour) {
    if (hour <= this.hour) {
      this.day += 1;
    }
    this.hour = hour;
    bus.emit('time:hour', { hour: Math.floor(hour), day: this.day });
    bus.emit('time:tick', { hour: this.hour, day: this.day, text: this.format() });
  }

  serialize() {
    return { hour: this.hour, day: this.day, dateLabel: this.dateLabel };
  }

  restore(data) {
    if (!data) return;
    this.hour = data.hour ?? 8;
    this.day = data.day ?? 0;
    this.dateLabel = data.dateLabel ?? '4月12日';
  }
}
