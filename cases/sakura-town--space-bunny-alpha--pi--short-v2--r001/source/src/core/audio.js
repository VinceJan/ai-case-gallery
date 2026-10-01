/**
 * 音频：全部用 WebAudio 现场合成，不依赖任何外部音频资源。
 * 包含脚步、对话音、列车鸣笛、道口警铃、开门、拾取、结算等。
 */
export class AudioKit {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.volume = 0.7;
    this._noiseBuf = null;
    this._ambientNodes = [];
    this._started = false;
  }

  /** 必须由用户手势触发 */
  unlock() {
    if (this._started) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);
    this._started = true;
    this._buildNoise();
    this.startAmbience();
  }

  _buildNoise() {
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this._noiseBuf = buf;
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master && !this._muted) this.master.gain.value = this.volume;
  }

  /** 音量控制的正式接口（与 setVolume 等价） */
  setMasterVolume(v) {
    this.setVolume(v);
  }

  setMuted(flag) {
    this._muted = !!flag;
    if (this.master) this.master.gain.value = this._muted ? 0 : this.volume;
    return this._muted;
  }

  getMuted() {
    return !!this._muted;
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master) this.master.gain.value = (on && !this._muted) ? this.volume : 0;
  }

  get ready() {
    return this._started && this.enabled;
  }

  _t() {
    return this.ctx.currentTime;
  }

  _tone({ freq = 440, type = 'sine', dur = 0.15, gain = 0.2, attack = 0.005, decay = null, detune = 0, slideTo = null, delay = 0, pan = 0 }) {
    if (!this.ready) return;
    const t0 = this._t() + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    if (detune) osc.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + (decay ?? dur));
    let node = g;
    if (pan !== 0 && this.ctx.createStereoPanner) {
      const p = this.ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan));
      g.connect(p);
      node = p;
    }
    osc.connect(g);
    node.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + (decay ?? dur) + 0.06);
  }

  _noise({ dur = 0.2, gain = 0.2, filter = 'lowpass', freq = 1200, q = 1, delay = 0, sweepTo = null, pan = 0 }) {
    if (!this.ready) return;
    const t0 = this._t() + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuf;
    src.loop = true;
    const bq = this.ctx.createBiquadFilter();
    bq.type = filter;
    bq.frequency.setValueAtTime(freq, t0);
    bq.Q.value = q;
    if (sweepTo) bq.frequency.exponentialRampToValueAtTime(Math.max(60, sweepTo), t0 + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = g;
    if (pan !== 0 && this.ctx.createStereoPanner) {
      const p = this.ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan));
      g.connect(p);
      node = p;
    }
    src.connect(bq);
    bq.connect(g);
    node.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur + 0.08);
  }

  // ---- 具体音效 ----------------------------------------------------------

  footstep(surface = 'stone', strength = 1) {
    switch (surface) {
      case 'grass':
        this._noise({ dur: 0.1, gain: 0.05 * strength, filter: 'bandpass', freq: 1500, q: 0.9, sweepTo: 700 });
        break;
      case 'wood':
        this._noise({ dur: 0.08, gain: 0.07 * strength, filter: 'lowpass', freq: 900 });
        this._tone({ freq: 150 + Math.random() * 30, type: 'sine', dur: 0.07, gain: 0.05 * strength });
        break;
      case 'water':
        this._noise({ dur: 0.22, gain: 0.08 * strength, filter: 'bandpass', freq: 2200, q: 0.6, sweepTo: 500 });
        break;
      case 'sand': // 河岸细沙：很轻、偏高频
        this._noise({ dur: 0.13, gain: 0.04 * strength, filter: 'bandpass', freq: 3200, q: 0.7, sweepTo: 1600 });
        break;
      case 'dirt': // 田埂软土：闷、带一点沙
        this._noise({ dur: 0.09, gain: 0.055 * strength, filter: 'lowpass', freq: 700 });
        this._noise({ dur: 0.07, gain: 0.025 * strength, filter: 'bandpass', freq: 2400, q: 0.8 });
        break;
      case 'metal': // 铁桥/站台钢板：清脆
        this._tone({ freq: 900 + Math.random() * 250, type: 'square', dur: 0.06, gain: 0.022 * strength });
        this._tone({ freq: 1750, type: 'sine', dur: 0.09, gain: 0.03 * strength });
        this._noise({ dur: 0.05, gain: 0.03 * strength, filter: 'highpass', freq: 3000 });
        break;
      case 'gravel': // 沙砾：几个极短的颗粒脉冲
        for (let i = 0; i < 4; i++) {
          this._noise({ dur: 0.03, gain: 0.03 * strength, filter: 'bandpass', freq: 2200 + Math.random() * 2600, q: 3, delay: i * 0.026 });
        }
        break;
      default: // stone
        this._noise({ dur: 0.07, gain: 0.06 * strength, filter: 'lowpass', freq: 1300 });
        this._tone({ freq: 110 + Math.random() * 20, type: 'triangle', dur: 0.05, gain: 0.04 * strength });
    }
  }

  /** 对话打字机音，按字符变化 */
  blip(charIndex = 0, speaker = '') {
    const base = speaker === 'npc' ? 430 : 560;
    const jitter = 1 + ((charIndex * 37) % 11) / 40;
    this._tone({ freq: base * jitter, type: 'square', dur: 0.035, gain: 0.022, attack: 0.002 });
  }

  confirm() {
    this._tone({ freq: 660, type: 'triangle', dur: 0.09, gain: 0.11 });
    this._tone({ freq: 990, type: 'triangle', dur: 0.13, gain: 0.09, delay: 0.07 });
  }

  cancel() {
    this._tone({ freq: 380, type: 'triangle', dur: 0.09, gain: 0.09 });
    this._tone({ freq: 250, type: 'triangle', dur: 0.12, gain: 0.08, delay: 0.06 });
  }

  pickup() {
    this._tone({ freq: 780, type: 'triangle', dur: 0.07, gain: 0.1 });
    this._tone({ freq: 1170, type: 'triangle', dur: 0.11, gain: 0.08, delay: 0.05 });
  }

  cash() {
    this._tone({ freq: 1320, type: 'square', dur: 0.05, gain: 0.07 });
    this._noise({ dur: 0.1, gain: 0.09, filter: 'highpass', freq: 3000, delay: 0.02 });
    this._tone({ freq: 1760, type: 'square', dur: 0.09, gain: 0.06, delay: 0.11 });
  }

  chime(good = true) {
    const notes = good ? [523, 659, 784, 1046] : [523, 440, 349];
    notes.forEach((f, i) =>
      this._tone({ freq: f, type: 'sine', dur: 0.36, gain: 0.09, delay: i * 0.085, attack: 0.01 }),
    );
  }

  door(open = true) {
    this._noise({ dur: 0.3, gain: 0.06, filter: 'bandpass', freq: open ? 700 : 420, q: 1.4, sweepTo: open ? 1400 : 260 });
    this._tone({ freq: open ? 300 : 220, type: 'sawtooth', dur: 0.16, gain: 0.03, slideTo: open ? 420 : 160 });
  }

  /** 列车汽笛（两长一短） */
  trainHorn(distance01 = 0) {
    if (!this.ready) return;
    const vol = 0.22 * (1 - Math.min(distance01, 0.92) * 0.85);
    const pan = Math.max(-0.8, Math.min(0.8, distance01 > 0.5 ? 0.8 : -0.8));
    const f = 196;
    [[0, 0.9], [0.1, 0.9], [0.55, 0.55]].forEach(([delay, dur]) => {
      this._tone({ freq: f * 1.0, type: 'sawtooth', dur, gain: vol * 0.5, attack: 0.06, delay, pan });
      this._tone({ freq: f * 1.5, type: 'sawtooth', dur, gain: vol * 0.32, attack: 0.06, delay, pan });
      this._tone({ freq: f * 2.02, type: 'sine', dur, gain: vol * 0.16, attack: 0.06, delay, pan });
    });
  }

  crossingBell(times = 2) {
    for (let i = 0; i < times; i++) {
      this._tone({ freq: 1180, type: 'square', dur: 0.11, gain: 0.055, delay: i * 0.26, pan: -0.15 });
      this._tone({ freq: 880, type: 'square', dur: 0.11, gain: 0.05, delay: i * 0.26 + 0.09, pan: -0.15 });
    }
  }

  /** 车轮接缝咔哒（随速度调用） */
  railClack(pan = 0) {
    this._noise({ dur: 0.05, gain: 0.05, filter: 'bandpass', freq: 2400, q: 3, pan });
    this._tone({ freq: 90, type: 'sine', dur: 0.05, gain: 0.05, pan });
  }

  splash() {
    this._noise({ dur: 0.5, gain: 0.14, filter: 'bandpass', freq: 3000, q: 0.5, sweepTo: 400 });
  }

  meow() {
    this._tone({ freq: 720, type: 'sawtooth', dur: 0.22, gain: 0.07, slideTo: 430, attack: 0.03 });
    this._tone({ freq: 1080, type: 'sine', dur: 0.2, gain: 0.035, slideTo: 640, attack: 0.05, delay: 0.02 });
  }

  bark() {
    this._tone({ freq: 300, type: 'square', dur: 0.12, gain: 0.07, slideTo: 180 });
  }

  heart() {
    this._tone({ freq: 1046, type: 'sine', dur: 0.2, gain: 0.07, attack: 0.01 });
    this._tone({ freq: 1568, type: 'sine', dur: 0.26, gain: 0.05, delay: 0.08 });
  }

  /** 环境音：风声 + 夜间虫鸣（低音量常驻） */
  startAmbience() {
    if (!this.ready || this._ambientStarted) return;
    this._ambientStarted = true;

    // 风：低频层（厚）
    const mk = (type, freq, q, gain) => {
      const src = this.ctx.createBufferSource();
      src.buffer = this._noiseBuf;
      src.loop = true;
      const f = this.ctx.createBiquadFilter();
      f.type = type;
      f.frequency.value = freq;
      if (q) f.Q.value = q;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      src.connect(f);
      f.connect(g);
      g.connect(this.master);
      src.start();
      this._ambientNodes.push({ src, g, f });
      return { g, f };
    };

    this._windLow = mk('lowpass', 380, 0, 0.035);       // 低处的厚风
    this._windHigh = mk('bandpass', 1500, 0.7, 0.0);    // 高处的薄风（靠音量淡入）
    this._waterBed = mk('bandpass', 5200, 1.2, 0.0);   // 水边细碎声

    // 给风加一个很慢的起伏，避免听起来像持续的「嘶」
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    lfoGain.connect(this._windLow.g.gain);
    lfo.start();
    this._ambientNodes.push({ src: lfo, g: lfoGain });

    this._ambBirds = 0;   // 白天的鸟叫权重
    this._ambBugs = 0;    // 夜虫权重
    this._birdTimer = 0;
  }

  /**
   * 每帧调用。opts: { height = 0, indoor = null, nearWater = false }
   * 高度用玩家相对地面的高度（0~40），越高风越大越薄。
   */
  updateAmbience(dt, hour, indoors, opts = {}) {
    if (!this.ready || !this._ambientStarted) return;
    const k = Math.min(1, dt * 1.2);
    const height = Math.max(0, Math.min(40, opts.height || 0));
    const heightT = Math.min(1, height / 26);
    const inside = !!opts.indoor;

    if (this._windLow) {
      let target = 0.02 + heightT * 0.045;
      let cutoff = 380 + heightT * 500;
      if (inside) {
        target *= 0.5;
        cutoff = 300;
      }
      this._windLow.g.gain.value += (target - this._windLow.g.gain.value) * k;
      this._windLow.f.frequency.value += (cutoff - this._windLow.f.frequency.value) * k;
    }
    if (this._windHigh) {
      // 只有站得高才听得见那层薄风
      const t = inside ? heightT * 0.15 : Math.max(0, heightT - 0.25) * 0.5;
      this._windHigh.g.gain.value += (t - this._windHigh.g.gain.value) * k;
    }
    if (this._waterBed) {
      const t = opts.nearWater && !inside ? 0.016 : 0;
      this._waterBed.g.gain.value += (t - this._waterBed.g.gain.value) * k;
    }

    // 鸟 / 虫的权重随时间平滑过渡
    const birdTarget = (hour > 5 && hour < 8) ? 1 : (hour > 16 && hour < 20) ? 0.75 : 0;
    const bugTarget = (hour > 20 || hour < 4) ? 1 : (hour >= 4 && hour < 5.5) ? 0.4 : 0;
    this._ambBirds += (birdTarget - this._ambBirds) * Math.min(1, dt * 0.35);
    this._ambBugs += (bugTarget - this._ambBugs) * Math.min(1, dt * 0.35);

    this._birdTimer -= dt;
    if (this._birdTimer <= 0) {
      if (this._ambBirds > 0.3 && hour > 5 && hour < 20) {
        this._birdTimer = 1.6 + Math.random() * 3.2;
        const pan = (Math.random() - 0.5) * 1.5;
        if (hour < 8) {
          // 清晨：短促上扬的啼叫
          this._tone({ freq: 2400 + Math.random() * 900, type: 'sine', dur: 0.09, gain: 0.018 * this._ambBirds, slideTo: 3200, pan });
          this._tone({ freq: 3000, type: 'sine', dur: 0.07, gain: 0.014 * this._ambBirds, delay: 0.1, pan });
        } else {
          // 傍晚：平缓的短鸣
          this._tone({ freq: 2000 + Math.random() * 700, type: 'sine', dur: 0.1, gain: 0.02 * this._ambBirds, slideTo: 1400, pan });
        }
      } else if (this._ambBugs > 0.3) {
        this._birdTimer = 2.6 + Math.random() * 4;
        this._noise({ dur: 0.7, gain: 0.012 * this._ambBugs, filter: 'bandpass', freq: 4200, q: 12, pan: (Math.random() - 0.5) * 1.4 });
      } else {
        this._birdTimer = 5 + Math.random() * 6;
      }
    }
  }

  // ---- UI / 系统音效（音量克制，不盖过环境音）----
  uiOpen() {
    if (!this.ready) return;
    this._tone({ freq: 620, type: 'sine', dur: 0.09, gain: 0.05 });
    this._tone({ freq: 930, type: 'sine', dur: 0.11, gain: 0.04, delay: 0.055 });
  }

  uiClose() {
    if (!this.ready) return;
    this._tone({ freq: 700, type: 'sine', dur: 0.09, gain: 0.045 });
    this._tone({ freq: 480, type: 'sine', dur: 0.11, gain: 0.035, delay: 0.05 });
  }

  uiTick() {
    this._tone({ freq: 1200 + Math.random() * 180, type: 'square', dur: 0.03, gain: 0.016 });
  }

  purchase(ok = true) {
    if (!this.ready) return;
    if (ok) {
      this._tone({ freq: 1180, type: 'sine', dur: 0.07, gain: 0.055 });
      this._tone({ freq: 1760, type: 'sine', dur: 0.12, gain: 0.045, delay: 0.06 });
    } else {
      this._tone({ freq: 300, type: 'square', dur: 0.09, gain: 0.045 });
      this._tone({ freq: 210, type: 'square', dur: 0.13, gain: 0.04, delay: 0.1 });
    }
  }

  questUpdate() {
    if (!this.ready) return;
    [660, 880, 1100].forEach((f, i) => this._tone({ freq: f, type: 'sine', dur: 0.12, gain: 0.04, delay: i * 0.07 }));
  }

  questDone() {
    if (!this.ready) return;
    [660, 880, 1100, 1320].forEach((f, i) => this._tone({ freq: f, type: 'sine', dur: 0.2, gain: 0.045, delay: i * 0.08 }));
  }

  save() {
    this._tone({ freq: 1400, type: 'sine', dur: 0.06, gain: 0.03, slideTo: 1900 });
  }

  error() {
    this._tone({ freq: 180, type: 'sine', dur: 0.2, gain: 0.06, slideTo: 120 });
  }

  levelUp() {
    if (!this.ready) return;
    [523, 659, 784, 1047].forEach((f, i) => this._tone({ freq: f, type: 'sine', dur: 0.18, gain: 0.04, delay: i * 0.06 }));
  }
}
