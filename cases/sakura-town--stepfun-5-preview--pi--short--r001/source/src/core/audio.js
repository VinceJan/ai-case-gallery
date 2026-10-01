// 音频：全部由 WebAudio 程序化合成（风、雨、鸟鸣、脚步、电车、祭典太鼓等）
export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.volume = 0.7;
    this.windGain = null;
    this.rainGain = null;
    this.birdTimer = 0;
    this.taikoTimer = 0;
    this.taikoOn = false;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);

    // 风：滤波噪声
    const windSrc = this.ctx.createBufferSource();
    windSrc.buffer = this.noiseBuffer(4);
    windSrc.loop = true;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 320;
    windFilter.Q.value = 0.6;
    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.04;
    windSrc.connect(windFilter).connect(this.windGain).connect(this.master);
    windSrc.start();

    // 雨：高频噪声
    const rainSrc = this.ctx.createBufferSource();
    rainSrc.buffer = this.noiseBuffer(4);
    rainSrc.loop = true;
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'highpass';
    rainFilter.frequency.value = 1400;
    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0;
    rainSrc.connect(rainFilter).connect(this.rainGain).connect(this.master);
    rainSrc.start();
  }

  noiseBuffer(sec) {
    const sr = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, sr * sec, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  resume() { if (this.ctx?.state === 'suspended') this.ctx.resume(); }
  setMuted(m) { this.muted = m; if (this.master) this.master.gain.value = m ? 0 : this.volume; }
  setVolume(v) { this.volume = v; if (this.master && !this.muted) this.master.gain.value = v; }

  // 环境参数
  setEnvironment(wind, rain, night) {
    if (!this.ctx) return;
    this.windGain.gain.value = 0.02 + wind * 0.09 + rain * 0.05;
    this.rainGain.gain.value = rain * 0.14;
    this.night = night;
  }

  blip(freq = 660, dur = 0.07, type = 'sine', vol = 0.12) {
    if (!this.ctx || this.muted) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    o.connect(g).connect(this.master);
    o.start(); o.stop(this.ctx.currentTime + dur);
  }

  footstep(running) {
    if (!this.ctx || this.muted) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.12);
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = running ? 500 : 340;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(running ? 0.09 : 0.05, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    src.connect(f).connect(g).connect(this.master);
    src.start(); src.stop(this.ctx.currentTime + 0.12);
  }

  chirp() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    const base = 1800 + Math.random() * 1200;
    o.frequency.setValueAtTime(base, t);
    o.frequency.exponentialRampToValueAtTime(base * 1.6, t + 0.05);
    o.frequency.exponentialRampToValueAtTime(base * 0.9, t + 0.11);
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.15);
  }

  thunder() {
    if (!this.ctx || this.muted) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(1.6);
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(400, this.ctx.currentTime);
    f.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 1.4);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    src.connect(f).connect(g).connect(this.master);
    src.start(); src.stop(this.ctx.currentTime + 1.6);
  }

  trainWhistle() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    for (const f of [520, 660]) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.08, t + 0.15);
      g.gain.setValueAtTime(0.08, t + 0.7);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 1.05);
    }
  }

  drum() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(50, t + 0.18);
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + 0.26);
  }

  firework() {
    if (!this.ctx || this.muted) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(0.5);
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.22, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
    src.connect(f).connect(g).connect(this.master);
    src.start(); src.stop(this.ctx.currentTime + 0.5);
  }

  cash() {
    this.blip(880, 0.08, 'square', 0.08);
    setTimeout(() => this.blip(1320, 0.1, 'square', 0.07), 70);
  }

  // 每帧环境更新（鸟鸣/太鼓/雷）
  tick(dt, opts) {
    if (!this.ctx || this.muted) return;
    // 鸟鸣（白天、无雨）
    this.birdTimer -= dt;
    if (this.birdTimer <= 0) {
      this.birdTimer = 2.5 + Math.random() * 5;
      if (opts.day && !opts.raining && Math.random() < 0.7) this.chirp();
    }
    // 雷
    if (opts.storm && Math.random() < dt * 0.12) this.thunder();
    // 祭典太鼓
    if (this.taikoOn) {
      this.taikoTimer -= dt;
      if (this.taikoTimer <= 0) {
        this.taikoTimer = 0.42;
        this.drum();
        if (Math.random() < 0.3) setTimeout(() => this.drum(), 180);
      }
    }
    // 烟花
    if (opts.fireworks && Math.random() < dt * 0.8) this.firework();
    // 脚步
    if (opts.walking) {
      this._stepT = (this._stepT || 0) - dt;
      if (this._stepT <= 0) {
        this._stepT = opts.running ? 0.24 : 0.38;
        this.footstep(opts.running);
      }
    }
  }
}
