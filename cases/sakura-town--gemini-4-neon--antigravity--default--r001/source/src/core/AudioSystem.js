export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.initialized = false;
    this._musicTimer = 0;
    this._ambientTimer = 2.5;
    this._stepCooldown = 0;
    this._melodyIdx = 0;
    this._scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 783.99, 659.25];
  }

  init() {
    if (this.initialized) {
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.enabled ? 0.42 : 0;
      this.master.connect(this.ctx.destination);
      this.initialized = true;
    } catch {
      this.initialized = false;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.enabled ? 0.42 : 0, this.ctx.currentTime, 0.08);
    }
    return this.enabled;
  }

  update(dt, nightFactor, nearRiver) {
    if (!this.initialized || !this.enabled || !this.ctx || this.ctx.state !== 'running') return;
    if (this._stepCooldown > 0) this._stepCooldown -= dt;

    this._musicTimer -= dt;
    if (this._musicTimer <= 0) {
      this._musicTimer = 2.6 + Math.random() * 2.4;
      this._playCozyNote(nightFactor);
    }

    this._ambientTimer -= dt;
    if (this._ambientTimer <= 0) {
      this._ambientTimer = 6.5 + Math.random() * 7.5;
      if (nightFactor < 0.5) {
        if (Math.random() < 0.55) this._playUguisuBird();
      } else {
        this._playEveningCricket();
      }
      if (nearRiver) this._playWaterRipple();
    }
  }

  _playCozyNote(nightFactor) {
    const now = this.ctx.currentTime;
    const baseFreq = this._scale[this._melodyIdx % this._scale.length];
    this._melodyIdx += Math.random() < 0.65 ? 1 : 2;
    const freq = nightFactor > 0.6 ? baseFreq * 0.5 : baseFreq;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc2.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.032, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

    const g2 = this.ctx.createGain();
    g2.gain.value = 0.14;
    osc.connect(gain);
    osc2.connect(g2);
    g2.connect(gain);
    gain.connect(this.master);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 2.5);
    osc2.stop(now + 2.5);
  }

  _playUguisuBird() {
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1650, now);
    osc.frequency.linearRampToValueAtTime(1720, now + 0.45);
    osc.frequency.setValueAtTime(2150, now + 0.52);
    osc.frequency.linearRampToValueAtTime(2550, now + 0.64);
    osc.frequency.linearRampToValueAtTime(1950, now + 0.8);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.025, now + 0.08);
    gain.gain.setValueAtTime(0.022, now + 0.44);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.49);
    gain.gain.linearRampToValueAtTime(0.032, now + 0.54);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.86);

    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.9);
  }

  _playEveningCricket() {
    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const t = now + i * 0.13;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4150, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.015, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t);
      osc.stop(t + 0.11);
    }
  }

  _playWaterRipple() {
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.018, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playFumikiriBell(attenuation = 1.0) {
    if (!this.initialized || !this.enabled || !this.ctx || attenuation <= 0.02) return;
    const now = this.ctx.currentTime;
    const vol = 0.15 * Math.min(1, attenuation);
    [705, 768, 1412].forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 2 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol * (idx === 2 ? 0.32 : 0.7), now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  playTrainClack(attenuation = 1.0) {
    if (!this.initialized || !this.enabled || !this.ctx || attenuation <= 0.03) return;
    const now = this.ctx.currentTime;
    const vol = 0.12 * Math.min(1, attenuation);
    [0, 0.14].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(115, now + offset);
      osc.frequency.exponentialRampToValueAtTime(48, now + offset + 0.09);
      gain.gain.setValueAtTime(vol, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.1);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(now + offset);
      osc.stop(now + offset + 0.12);
    });
  }

  playTrainHorn(attenuation = 1.0) {
    if (!this.initialized || !this.enabled || !this.ctx || attenuation <= 0.04) return;
    const now = this.ctx.currentTime;
    const vol = 0.08 * Math.min(1, attenuation);
    [330, 415.3].forEach((f) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.08);
      gain.gain.setValueAtTime(vol * 0.85, now + 0.55);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      osc.start(now);
      osc.stop(now + 1.0);
    });
  }

  playStationChime(attenuation = 1.0) {
    if (!this.initialized || !this.enabled || !this.ctx || attenuation <= 0.05) return;
    const now = this.ctx.currentTime;
    const vol = 0.07 * Math.min(1, attenuation);
    [659.25, 783.99, 1046.5, 880, 1046.5].forEach((f, i) => {
      const t = now + i * 0.16;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t);
      osc.stop(t + 0.55);
    });
  }

  playFootstep(isWood = false) {
    if (!this.initialized || !this.enabled || !this.ctx || this._stepCooldown > 0) return;
    this._stepCooldown = 0.28;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isWood ? 190 : 120 + Math.random() * 25, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.055);
    gain.gain.setValueAtTime(0.032, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.065);
  }

  playDoorChime() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [880, 1174.66].forEach((f, i) => {
      const t = now + i * 0.11;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t);
      osc.stop(t + 0.48);
    });
  }

  playShrineBell() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [420, 635, 980, 1340].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.09 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(now);
      osc.stop(now + 1.55);
    });
  }

  playVendingClunk() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1040, now);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.13);

    const drop = this.ctx.createOscillator();
    const dg = this.ctx.createGain();
    drop.type = 'triangle';
    drop.frequency.setValueAtTime(160, now + 0.25);
    drop.frequency.exponentialRampToValueAtTime(70, now + 0.36);
    dg.gain.setValueAtTime(0.11, now + 0.25);
    dg.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
    drop.connect(dg);
    dg.connect(this.master);
    drop.start(now + 0.25);
    drop.stop(now + 0.4);
  }

  playCameraShutter() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.08, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.22));
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2400;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.24;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(now);
  }

  playCatMeow() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.linearRampToValueAtTime(920, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.36);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playSuccessChime() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const t = now + i * 0.085;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.075, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t);
      osc.stop(t + 0.38);
    });
  }

  playSplash() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.18, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.35));
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(420, now + 0.18);
    const gain = this.ctx.createGain();
    gain.gain.value = 0.2;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(now);
  }

  playUiClick() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(740, now);
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + 0.07);
  }
}
