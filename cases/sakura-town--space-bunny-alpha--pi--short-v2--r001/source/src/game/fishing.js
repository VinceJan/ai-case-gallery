/**
 * 抛竿 → 咬钩 → 收线 的钓鱼小游戏。
 * 收线阶段按住 E 抬指针，松开就沉；把指针维持在目标区里攒进度。
 */
import { clamp } from '../core/utils.js';

export const FISH_STATES = { IDLE: 'idle', CASTING: 'casting', WAITING: 'waiting', BITE: 'bite', REEL: 'reel', RESULT: 'result' };

export class FishingSession {
  constructor() {
    this.reset();
  }

  reset() {
    this.state = FISH_STATES.IDLE;
    this.t = 0;
    this.biteWindow = 0;
    this.pointer = 0.35;
    this.zone = 0.5;
    this.zoneHalf = 0.24;
    this.progress = 0;
    this.need = 1.6;
    this.failTimer = 0;
    this.result = null;
    this.resultTimer = 0;
    this.zoneTarget = 0.5;
    this.struggle = 0;
  }

  start() {
    this.reset();
    this.state = FISH_STATES.CASTING;
    this.t = 0;
  }

  get active() {
    return this.state !== FISH_STATES.IDLE;
  }

  /** @param {boolean} holding 是否按住 E / 空格 */
  press() {
    if (this.state === FISH_STATES.WAITING) {
      this.state = FISH_STATES.BITE;
      this.t = 0;
      return 'strike';
    }
    return null;
  }

  finish(result) {
    this.state = FISH_STATES.RESULT;
    this.result = result;
    this.resultTimer = 0;
  }

  update(dt, holding) {
    switch (this.state) {
      case FISH_STATES.CASTING:
        this.t += dt;
        if (this.t > 1.1) {
          this.state = FISH_STATES.WAITING;
          this.t = 0;
          this.biteWindow = 1.4 + Math.random() * 2.2;
        }
        break;
      case FISH_STATES.WAITING:
        this.t += dt;
        if (this.t > this.biteWindow) {
          this.state = FISH_STATES.BITE;
          this.t = 0;
        }
        break;
      case FISH_STATES.BITE:
        this.t += dt;
        if (this.t > 1.6) {
          this.state = FISH_STATES.WAITING;
          this.t = 0;
          this.biteWindow = 1.0 + Math.random() * 1.8;
        }
        break;
      case FISH_STATES.REEL: {
        // 指针
        this.pointer += (holding ? 0.52 : -0.44) * dt;
        this.pointer = clamp(this.pointer, 0, 1);
        // 目标区缓慢移动 + 挣扎
        this.struggle -= dt;
        if (this.struggle <= 0) {
          this.struggle = 1.9 + Math.random() * 2.2;
          this.zoneTarget = clamp(this.zoneTarget + (Math.random() - 0.5) * 0.34, 0.2, 0.8);
          this.zoneHalf = clamp(this.zoneHalf - 0.014, 0.15, 0.26);
        }
        this.zone += (this.zoneTarget - this.zone) * Math.min(1, dt * 2.4);
        const inZone = Math.abs(this.pointer - this.zone) < this.zoneHalf;
        if (inZone) {
          this.progress += dt;
          this.failTimer = 0;
        } else {
          this.failTimer += dt;
        }
        if (this.progress >= this.need) this.finish(true);
        else if (this.failTimer > 4.0) this.finish(false);
        break;
      }
      case FISH_STATES.RESULT:
        this.resultTimer += dt;
        break;
      default:
        break;
    }
  }

  /** UI 用的数据 */
  hud() {
    return {
      state: this.state,
      pointer: this.pointer,
      zone: this.zone,
      zoneHalf: this.zoneHalf,
      progress: clamp(this.progress / this.need, 0, 1),
    };
  }
}
