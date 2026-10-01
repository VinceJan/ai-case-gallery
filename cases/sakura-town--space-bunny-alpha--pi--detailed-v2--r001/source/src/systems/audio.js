// ================================================================
//  程序化音频：全部用 WebAudio 合成，无需外部资源
// ================================================================
import { clamp, clamp01, lerp } from '../util/math.js';
import { makeRNG } from '../util/math.js';

export class Audio {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.enabled = true;
    this.volumes = { master: 0.8, sfx: 1.0, ambient: 0.8 };
    this._loops = {};
    this._rng = makeRNG(4242);
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    const c = this.ctx;

    this.master = c.createGain();
    this.master.gain.value = this.volumes.master;
    this.master.connect(c.destination);

    this.comp = c.createDynamicsCompressor();
    this.comp.threshold.value = -14;
    this.comp.ratio.value = 5;
    this.comp.connect(this.master);

    this.sfx = c.createGain(); this.sfx.gain.value = this.volumes.sfx; this.sfx.connect(this.comp);
    this.amb = c.createGain(); this.amb.gain.value = 0; this.amb.connect(this.comp);

    // 噪声源缓冲
    const len = c.sampleRate * 2;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noiseBuf = buf;
    // 粉噪声（风）
    const pb = c.createBuffer(1, len, c.sampleRate);
    const pd = pb.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.0990460;
      b1 = 0.96300 * b1 + w * 0.2965164;
      b2 = 0.57000 * b2 + w * 1.0526913;
      pd[i] = (b0 + b1 + b2 + w * 0.1848) * 0.22;
    }
    this.pinkBuf = pb;

    this.ready = true;
    this._startAmbience();
  }

  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); }
  get t() { return this.ctx ? this.ctx.currentTime : 0; }

  _gain(v = 1) { const g = this.ctx.createGain(); g.gain.value = v; return g; }
  _noise(pink = false, loop = false) {
    const s = this.ctx.createBufferSource();
    s.buffer = pink ? this.pinkBuf : this.noiseBuf;
    s.loop = loop;
    return s;
  }
  _env(node, t0, a, d, peak = 1) {
    const g = node.gain;
    g.cancelScheduledValues(t0);
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + a);
    g.exponentialRampToValueAtTime(0.0001, t0 + a + d);
  }

  /* ---------------------------------------------------------------- *
   *  持续环境
   * ---------------------------------------------------------------- */
  _startAmbience() {
    const c = this.ctx;
    // 风
    const wind = this._noise(true, true);
    const wf = c.createBiquadFilter();
    wf.type = 'lowpass'; wf.frequency.value = 420; wf.Q.value = 0.6;
    const wg = this._gain(0.0);
    wind.connect(wf); wf.connect(wg); wg.connect(this.amb);
    wind.start();
    this._loops.wind = { src: wind, gain: wg, filter: wf };

    // 雨
    const rain = this._noise(false, true);
    const rf = c.createBiquadFilter();
    rf.type = 'highpass'; rf.frequency.value = 900;
    const rf2 = c.createBiquadFilter();
    rf2.type = 'lowpass'; rf2.frequency.value = 6200;
    const rg = this._gain(0);
    rain.connect(rf); rf.connect(rf2); rf2.connect(rg); rg.connect(this.amb);
    rain.start();
    this._loops.rain = { src: rain, gain: rg };

    // 列车隆隆（位置相关）
    const tr = this._noise(true, true);
    const tf = c.createBiquadFilter();
    tf.type = 'lowpass'; tf.frequency.value = 180;
    const tg = this._gain(0);
    const tr2 = c.createOscillator();
    tr2.type = 'sawtooth'; tr2.frequency.value = 42;
    const tr2g = this._gain(0.0);
    tr.connect(tf); tf.connect(tg); tg.connect(this.amb);
    tr2.connect(tr2g); tr2g.connect(this.amb);
    tr.start(); tr2.start();
    this._loops.train = { src: tr, gain: tg, osc: tr2, oscGain: tr2g, filter: tf };

    // 溪流
    const str = this._noise(false, true);
    const sf = c.createBiquadFilter();
    sf.type = 'bandpass'; sf.frequency.value = 2200; sf.Q.value = 0.5;
    const sg = this._gain(0);
    str.connect(sf); sf.connect(sg); sg.connect(this.amb);
    str.start();
    this._loops.stream = { src: str, gain: sg };
  }

  /** 每帧更新环境音 */
  updateAmbience(dt, { night = 0, rain = 0, indoors = false, trainDist = 999, nearStream = 0, wind = 0.4 } = {}) {
    if (!this.ready) return;
    const t = this.t;
    const set = (name, v) => {
      const l = this._loops[name];
      if (!l) return;
      l.gain.gain.setTargetAtTime(Math.max(0, v), t, 0.35);
    };
    const indoorMul = indoors ? 0.45 : 1;
    set('wind', (0.05 + wind * 0.16) * (1 - rain * 0.5) * indoorMul);
    set('rain', rain * 0.3 * indoorMul);
    set('stream', nearStream * 0.22 * indoorMul);
    const tv = trainDist < 190 ? clamp01(1 - trainDist / 190) ** 1.6 : 0;
    if (this._loops.train) {
      this._loops.train.gain.gain.setTargetAtTime(tv * 0.55, t, 0.2);
      this._loops.train.oscGain.gain.setTargetAtTime(tv * 0.1, t, 0.2);
      this._loops.train.filter.frequency.setTargetAtTime(120 + tv * 260, t, 0.3);
      this._loops.train.osc.frequency.setTargetAtTime(38 + tv * 16, t, 0.4);
    }
    this.amb.gain.setTargetAtTime(this.volumes.ambient * (indoors ? 0.55 : 1), t, 0.4);
  }

  /* ---------------------------------------------------------------- *
   *  一次性音效
   * ---------------------------------------------------------------- */
  _tone(freq, dur, type = 'sine', vol = 0.2, at = 0, dest = null, glide = 0) {
    if (!this.ready) return;
    const c = this.ctx, t0 = this.t + at;
    const o = c.createOscillator();
    const g = this._gain(0);
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (glide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + glide), t0 + dur);
    o.connect(g); g.connect(dest || this.sfx);
    this._env(g, t0, Math.min(0.02, dur * 0.2), dur, vol);
    o.start(t0); o.stop(t0 + dur + 0.1);
  }

  _burst(dur, filterType, freq, vol = 0.2, at = 0, q = 1, pink = false) {
    if (!this.ready) return;
    const c = this.ctx, t0 = this.t + at;
    const s = this._noise(pink);
    const f = c.createBiquadFilter();
    f.type = filterType; f.frequency.value = freq; f.Q.value = q;
    const g = this._gain(0);
    s.connect(f); f.connect(g); g.connect(this.sfx);
    this._env(g, t0, 0.006, dur, vol);
    s.start(t0, Math.random() * 1.5); s.stop(t0 + dur + 0.05);
  }

  footstep(surface = 'grass', vol = 0.12) {
    const cfg = {
      grass: [0.16, 'bandpass', 900, 0.09],
      asphalt: [0.09, 'bandpass', 1600, 0.1],
      wood: [0.12, 'bandpass', 420, 0.12],
      tile: [0.07, 'highpass', 2400, 0.1],
      gravel: [0.14, 'bandpass', 2200, 0.11],
    }[surface] || [0.12, 'bandpass', 1200, 0.1];
    this._burst(cfg[0], cfg[1], cfg[2] * (0.85 + Math.random() * 0.3), cfg[3] * vol);
  }

  doorOpen() { this._burst(0.28, 'lowpass', 700, 0.09, 0, 1, true); this._tone(180, 0.1, 'sine', 0.05, 0.02); }
  doorClose() { this._burst(0.12, 'lowpass', 380, 0.13, 0, 1, true); }
  doorChime() {
    const base = 1046;
    [0, 0.09, 0.18].forEach((d, i) => this._tone(base * [1, 1.5, 2][i], 0.5, 'sine', 0.1 - i * 0.02, d));
  }
  chime() {
    [523, 659, 784].forEach((f, i) => this._tone(f, 0.7, 'triangle', 0.11, i * 0.14));
  }
  click() { this._tone(880, 0.05, 'square', 0.035); }
  page() { this._burst(0.14, 'bandpass', 2600, 0.07, 0, 0.7); }

  /** 铁路侧调用的名字 */
  playCrossingAlarm() { this.crossAlarm(); }

  crossAlarm() {
    // 交替高低双音
    for (let i = 0; i < 2; i++) {
      this._tone(i ? 660 : 880, 0.22, 'square', 0.055, i * 0.26);
    }
  }

  whistle(long = false) {
    const d = long ? 1.4 : 0.85;
    this._tone(1180, d, 'sine', 0.1, 0, null, -260);
    this._tone(1760, d, 'sine', 0.05, 0.02, null, -380);
    this._burst(d * 0.7, 'bandpass', 2400, 0.045, 0, 2);
  }

  brake() {
    if (!this.ready) return;
    const c = this.ctx, t0 = this.t;
    const s = this._noise(true);
    const f = c.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 6;
    const g = this._gain(0);
    s.connect(f); f.connect(g); g.connect(this.sfx);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.05, t0 + 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.4);
    f.frequency.setValueAtTime(2400, t0);
    f.frequency.exponentialRampToValueAtTime(600, t0 + 3.4);
    s.start(t0); s.stop(t0 + 3.6);
  }

  vending() {
    this._burst(0.09, 'bandpass', 2800, 0.12, 0, 2);
    this._burst(0.2, 'lowpass', 500, 0.1, 0.12, 1, true);
    this._tone(1568, 0.16, 'sine', 0.07, 0.3);
  }
  coin() {
    this._tone(1568, 0.09, 'square', 0.05);
    this._tone(2093, 0.22, 'square', 0.045, 0.07);
  }
  pour() { this._burst(0.5, 'bandpass', 700, 0.07, 0, 1.2, true); }
  success() {
    [523, 659, 784, 1046].forEach((f, i) => this._tone(f, 0.45, 'triangle', 0.1, i * 0.1));
  }
  discover() {
    [784, 988, 1175, 1568].forEach((f, i) => this._tone(f, 0.6, 'sine', 0.08, i * 0.11));
  }
  cat() {
    this._tone(760, 0.22, 'sawtooth', 0.05, 0, null, 260);
    this._tone(900, 0.18, 'sawtooth', 0.04, 0.26, null, -180);
  }
  bird() {
    const base = 2200 + Math.random() * 1600;
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      this._tone(base * (1 + i * 0.08), 0.07, 'sine', 0.028, i * 0.09, null, 380);
    }
  }
  cricket() {
    for (let i = 0; i < 3; i++) this._burst(0.03, 'bandpass', 4200, 0.022, i * 0.05, 12);
  }
  cicada() {
    if (!this.ready) return;
    const c = this.ctx, t0 = this.t, d = 1.8 + Math.random();
    const o = c.createOscillator();
    const g = this._gain(0);
    const lfo = c.createOscillator();
    const lg = this._gain(0.012);
    o.type = 'sawtooth'; o.frequency.value = 1750;
    lfo.type = 'square'; lfo.frequency.value = 42;
    lfo.connect(lg); lg.connect(g.gain);
    const f = c.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 2000; f.Q.value = 2;
    o.connect(f); f.connect(g); g.connect(this.amb);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.02, t0 + 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.start(t0); lfo.start(t0);
    o.stop(t0 + d + 0.1); lfo.stop(t0 + d + 0.1);
  }
  thud(vol = 0.1) { this._burst(0.16, 'lowpass', 220, vol, 0, 1, true); }
  splash() { this._burst(0.4, 'highpass', 1400, 0.09, 0, 0.8); }
  swing() {
    this._tone(320, 0.5, 'sine', 0.04, 0, null, 120);
    this._tone(480, 0.4, 'sine', 0.03, 0.2, null, -80);
  }
  shrineBell() {
    this._tone(740, 1.6, 'sine', 0.07);
    this._tone(1110, 1.2, 'sine', 0.04, 0.01);
    this._tone(1480, 0.8, 'sine', 0.02, 0.02);
  }
  trainHorn() { this.whistle(true); }
  stop() { this.brake(); }

  setVolume(kind, v) {
    this.volumes[kind] = v;
    if (!this.ready) return;
    const t = this.t;
    if (kind === 'master') this.master.gain.setTargetAtTime(v, t, 0.1);
    if (kind === 'sfx') this.sfx.gain.setTargetAtTime(v, t, 0.1);
    if (kind === 'ambient') this.amb.gain.setTargetAtTime(v, t, 0.1);
  }
  setMuted(m) {
    this.enabled = !m;
    if (this.ready) this.master.gain.setTargetAtTime(m ? 0 : this.volumes.master, this.t, 0.15);
  }
}
