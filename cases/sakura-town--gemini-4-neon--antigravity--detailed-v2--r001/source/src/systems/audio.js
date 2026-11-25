/**
 * Clean, zero-dependency procedural Web Audio soundscape for Sakura Town.
 * Generates wind, birds/crickets, spatialized train rumble, level crossing bells,
 * convenience store door chime, vending clunk, shrine bell, footsteps, and optional rain.
 */
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
    this.trainGain = null;
    this.rainGain = null;
    this.ambientTimer = 2.0;
    this.ready = false;
  }

  unlock() {
    if (this.ready) {
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.muted ? 0 : 0.45;
    this.masterGain.connect(this.ctx.destination);

    // Filtered noise buffer reused for breeze, train rumble, and rain
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuf = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    // Gentle spring breeze bed
    const windSrc = this.ctx.createBufferSource();
    windSrc.buffer = noiseBuf;
    windSrc.loop = true;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 340;
    const windGain = this.ctx.createGain();
    windGain.gain.value = 0.04;
    windSrc.connect(windFilter).connect(windGain).connect(this.masterGain);
    windSrc.start();

    // Spatialized train rumble bed
    const trainSrc = this.ctx.createBufferSource();
    trainSrc.buffer = noiseBuf;
    trainSrc.loop = true;
    const trainFilter = this.ctx.createBiquadFilter();
    trainFilter.type = 'bandpass';
    trainFilter.frequency.value = 110;
    trainFilter.Q.value = 1.6;
    this.trainGain = this.ctx.createGain();
    this.trainGain.gain.value = 0;
    trainSrc.connect(trainFilter).connect(this.trainGain).connect(this.masterGain);
    trainSrc.start();

    // Spring rain bed
    const rainSrc = this.ctx.createBufferSource();
    rainSrc.buffer = noiseBuf;
    rainSrc.loop = true;
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1250;
    rainFilter.Q.value = 0.7;
    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0;
    rainSrc.connect(rainFilter).connect(this.rainGain).connect(this.masterGain);
    rainSrc.start();

    this.ready = true;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : 0.45, this.ctx.currentTime, 0.05);
    }
    return this.muted;
  }

  setTrainRumble(intensity) {
    if (!this.ready || !this.trainGain) return;
    const val = Math.max(0, Math.min(1, intensity)) * 0.28;
    this.trainGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.12);
  }

  setRain(isRaining) {
    if (!this.ready || !this.rainGain) return;
    this.rainGain.gain.setTargetAtTime(isRaining ? 0.11 : 0, this.ctx.currentTime, 0.35);
  }

  // Iconic Japanese level crossing metallic "カンカン" twin-tone bell
  playCrossingBell(distance) {
    if (!this.ready || this.muted) return;
    const vol = Math.max(0, 1 - distance / 44) * 0.14;
    if (vol <= 0.005) return;
    const now = this.ctx.currentTime;
    for (const freq of [710, 768]) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      osc.connect(g).connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.36);
    }
  }

  // Sakura Mart automatic door 3-tone friendly chime!
  playMartChime() {
    if (!this.ready || this.muted) return;
    const now = this.ctx.currentTime;
    const notes = [740, 587.3, 440, 587.3];
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.14);
      g.gain.setValueAtTime(0.11, now + i * 0.14);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.28);
      osc.connect(g).connect(this.masterGain);
      osc.start(now + i * 0.14);
      osc.stop(now + i * 0.14 + 0.3);
    });
  }

  // Soft station arrival melody
  playStationChime(distance) {
    if (!this.ready || this.muted || distance > 45) return;
    const vol = Math.max(0.02, (1 - distance / 45) * 0.12);
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.16);
      g.gain.setValueAtTime(vol, now + i * 0.16);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.16 + 0.45);
      osc.connect(g).connect(this.masterGain);
      osc.start(now + i * 0.16);
      osc.stop(now + i * 0.16 + 0.48);
    });
  }

  playFootstep(indoors = false) {
    if (!this.ready || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(indoors ? 135 : 175, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.06);
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
    osc.connect(g).connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playVendingClunk() {
    if (!this.ready || this.muted) return;
    const now = this.ctx.currentTime;
    [220, 145].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(f, now + i * 0.12);
      g.gain.setValueAtTime(0.08, now + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.11);
      osc.connect(g).connect(this.masterGain);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.12);
    });
  }

  playShrineBell() {
    if (!this.ready || this.muted) return;
    const now = this.ctx.currentTime;
    for (let k = 0; k < 4; k++) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1120 + k * 210, now + k * 0.06);
      g.gain.setValueAtTime(0.08, now + k * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + k * 0.06 + 0.55);
      osc.connect(g).connect(this.masterGain);
      osc.start(now + k * 0.06);
      osc.stop(now + k * 0.06 + 0.58);
    }
  }

  playUiBlip(high = false) {
    if (!this.ready || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(high ? 780 : 520, now);
    g.gain.setValueAtTime(0.06, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(g).connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  updateAmbient(dt, nightFactor, isRaining) {
    if (!this.ready || this.muted) return;
    this.setRain(isRaining);
    this.ambientTimer -= dt;
    if (this.ambientTimer <= 0) {
      this.ambientTimer = 3.5 + Math.random() * 4.5;
      const now = this.ctx.currentTime;
      if (nightFactor > 0.55) {
        // Gentle evening cricket chirp
        for (let i = 0; i < 3; i++) {
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(3400, now + i * 0.09);
          g.gain.setValueAtTime(0.015, now + i * 0.09);
          g.gain.exponentialRampToValueAtTime(0.0005, now + i * 0.09 + 0.06);
          osc.connect(g).connect(this.masterGain);
          osc.start(now + i * 0.09);
          osc.stop(now + i * 0.09 + 0.07);
        }
      } else if (!isRaining) {
        // Soft spring warbler bird chirp
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1650, now);
        osc.frequency.exponentialRampToValueAtTime(2250, now + 0.14);
        g.gain.setValueAtTime(0.022, now);
        g.gain.exponentialRampToValueAtTime(0.0005, now + 0.22);
        osc.connect(g).connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.24);
      }
    }
  }
}
