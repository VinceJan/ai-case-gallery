// WebAudio 程序化音效（无外部音频资源）
import { clamp, rand, pick } from './Utils.js';

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.masterVol = 0.8;
    this.muted = false;
  }

  /** 必须在用户手势后调用 */
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.masterVol;
    this.master.connect(ctx.destination);

    // ---- 噪声缓冲 ----
    const len = ctx.sampleRate * 2;
    this.whiteBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const wd = this.whiteBuf.getChannelData(0);
    for (let i = 0; i < len; i++) wd[i] = Math.random() * 2 - 1;
    this.brownBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const bd = this.brownBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      bd[i] = last * 3.2;
    }

    // ---- 环境音床（常驻，增益渐变） ----
    const mkLoop = (buf, filterType, freq, q, gain) => {
      const src = ctx.createBufferSource();
      src.buffer = buf; src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = filterType; f.frequency.value = freq; if (q) f.Q.value = q;
      const g = ctx.createGain(); g.gain.value = 0;
      src.connect(f); f.connect(g); g.connect(this.master);
      src.start();
      return { g, f, target: 0 };
    };
    this.amb = {
      wind: mkLoop(this.brownBuf, 'bandpass', 320, 0.8, 0),
      cicada: mkLoop(this.whiteBuf, 'bandpass', 4200, 9, 0),
      rain: mkLoop(this.whiteBuf, 'lowpass', 2600, 0, 0),
      night: mkLoop(this.brownBuf, 'lowpass', 260, 0, 0),
      train: mkLoop(this.brownBuf, 'lowpass', 190, 0, 0),
    };
    this.ready = true;
  }

  setMasterVolume(v) {
    this.masterVol = clamp(v, 0, 1);
    if (this.master) this.master.gain.value = this.muted ? 0 : this.masterVol;
  }

  _env(node, t0, a, peak, d) {
    node.gain.setValueAtTime(0.0001, t0);
    node.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + a);
    node.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d);
  }

  _noiseBurst({ dur = 0.15, type = 'lowpass', freq = 800, q = 1, peak = 0.5, delay = 0 } = {}) {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.whiteBuf; src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    src.connect(f); f.connect(g); g.connect(this.master);
    this._env(g, t, 0.012, peak, dur);
    src.start(t); src.stop(t + dur + 0.1);
  }

  _tone({ freq = 440, type = 'sine', dur = 0.3, peak = 0.3, delay = 0, slideTo = null, filter = null } = {}) {
    if (!this.ready) return;
    const ctx = this.ctx, t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    const g = ctx.createGain();
    let node = o;
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = filter.type || 'lowpass'; f.frequency.value = filter.freq || 1200;
      o.connect(f); node = f;
    }
    node.connect(g); g.connect(this.master);
    this._env(g, t, 0.015, peak, dur);
    o.start(t); o.stop(t + dur + 0.12);
  }

  /* ---------------- 具体音效 ---------------- */
  blip() { this._tone({ freq: 1180, type: 'square', dur: 0.06, peak: 0.12 }); }
  coin() { this._tone({ freq: 950, type: 'sine', dur: 0.1, peak: 0.2 }); this._tone({ freq: 1420, type: 'sine', dur: 0.16, peak: 0.16, delay: 0.08 }); }
  chime() {
    this._tone({ freq: 1318, type: 'sine', dur: 0.5, peak: 0.22 });
    this._tone({ freq: 1760, type: 'sine', dur: 0.7, peak: 0.18, delay: 0.16 });
  }
  thunk() { this._noiseBurst({ dur: 0.14, type: 'lowpass', freq: 320, peak: 0.6 }); this._tone({ freq: 120, type: 'sine', dur: 0.14, peak: 0.4, slideTo: 60 }); }
  canDrop() { this._noiseBurst({ dur: 0.2, type: 'bandpass', freq: 900, q: 2, peak: 0.3, delay: 0.25 }); }
  footstep(running) { this._noiseBurst({ dur: 0.055, type: 'lowpass', freq: running ? 700 : 520, peak: running ? 0.16 : 0.1 }); }
  doorSlide(open) {
    this._noiseBurst({ dur: open ? 0.5 : 0.45, type: 'bandpass', freq: open ? 900 : 700, q: 1.4, peak: 0.22 });
  }
  /** 道口警报（单声，交替音高由外部控制） */
  crossBell(hi) { this._tone({ freq: hi ? 880 : 660, type: 'square', dur: 0.24, peak: 0.14, filter: { freq: 2400 } }); }
  /** 列车汽笛 */
  horn() {
    if (!this.ready) return;
    this._tone({ freq: 233, type: 'sawtooth', dur: 1.5, peak: 0.2, slideTo: 210, filter: { freq: 900 } });
    this._tone({ freq: 293, type: 'sawtooth', dur: 1.4, peak: 0.16, slideTo: 262, filter: { freq: 900 } });
    this._tone({ freq: 350, type: 'sine', dur: 1.3, peak: 0.1, slideTo: 300, filter: { freq: 1200 } });
  }
  /** 列车进站气动声 */
  brake() { this._noiseBurst({ dur: 1.1, type: 'highpass', freq: 1800, peak: 0.16 }); }
  /** 鸟叫 */
  bird() {
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      this._tone({ freq: rand(2100, 3600), type: 'sine', dur: 0.07, peak: 0.05, delay: i * rand(0.07, 0.13), slideTo: rand(2600, 4200) });
    }
  }
  /** 狗吠（夜晚远处） */
  bark() {
    this._tone({ freq: 240, type: 'sawtooth', dur: 0.09, peak: 0.05, slideTo: 130, filter: { freq: 700 } });
    this._tone({ freq: 230, type: 'sawtooth', dur: 0.08, peak: 0.045, slideTo: 120, delay: 0.16, filter: { freq: 700 } });
  }
  /** 猫咪呼噜 */
  purr() { this._noiseBurst({ dur: 0.6, type: 'lowpass', freq: 260, peak: 0.12 }); }
  /** 神社铃铛 */
  shrineBell() {
    this._tone({ freq: 1046, type: 'sine', dur: 1.4, peak: 0.2 });
    this._tone({ freq: 1568, type: 'sine', dur: 1.1, peak: 0.1, delay: 0.02 });
    this._tone({ freq: 2093, type: 'sine', dur: 0.8, peak: 0.06, delay: 0.04 });
  }
  /** 获得物品 */
  itemGet() { this._tone({ freq: 660, type: 'triangle', dur: 0.12, peak: 0.18 }); this._tone({ freq: 990, type: 'triangle', dur: 0.2, peak: 0.16, delay: 0.1 }); }
  /** 任务完成小号角 */
  fanfare() {
    [523, 659, 784, 1046].forEach((f, i) => this._tone({ freq: f, type: 'triangle', dur: 0.26, peak: 0.16, delay: i * 0.13 }));
  }
  /** 雨点打伞 */
  rainOnUmbrella() { this._noiseBurst({ dur: 0.1, type: 'highpass', freq: 2400, peak: 0.05 }); }
  /** 电视白噪音 */
  tv() { this._noiseBurst({ dur: 0.4, type: 'bandpass', freq: 1400, q: 3, peak: 0.07 }); }

  /* ---------------- 环境音更新 ---------------- */
  update(dt, info) {
    if (!this.ready) return;
    const { hour = 12, raining = 0, trainNear = 0, indoor = false } = info || {};
    const set = (k, target, speed = 1.2) => {
      const a = this.amb[k];
      if (!a) return;
      a.target = target;
      const cur = a.g.gain.value;
      const next = cur + (target - cur) * Math.min(1, speed * dt);
      a.g.gain.value = next;
    };
    const isDay = hour > 5.5 && hour < 18.5;
    const isNight = hour >= 19.5 || hour < 4.5;
    // 风（户外，山地小镇常有风）
    set('wind', indoor ? 0 : 0.05 + 0.03 * Math.sin(hour), 0.8);
    // 蝉鸣（盛夏白天，此处晚春较弱）
    set('cicada', indoor || raining > 0.5 || !isDay ? 0 : 0.028, 0.6);
    // 雨
    set('rain', raining, 1.5);
    // 夜晚低鸣
    set('night', indoor ? 0 : (isNight ? 0.075 : 0), 0.7);
    // 列车接近
    set('train', trainNear * (indoor ? 0.5 : 0.85), 2.5);

    // 随机鸟叫 / 狗吠
    this._critterTimer = (this._critterTimer || 0) - dt;
    if (this._critterTimer <= 0) {
      this._critterTimer = rand(4, 12);
      if (!indoor && raining < 0.5 && isDay && Math.random() < 0.7) this.bird();
      else if (!indoor && isNight && Math.random() < 0.3) this.bark();
    }
  }
}
