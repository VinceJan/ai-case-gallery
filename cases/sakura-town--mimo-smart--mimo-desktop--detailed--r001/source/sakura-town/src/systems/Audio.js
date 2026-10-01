/**
 * Procedural / synthesized audio via Web Audio API.
 * No external files required — keeps the project self-contained.
 */
export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.ambienceGain = null;
    this.rainGain = null;
    this.noiseNode = null;
    this.started = false;
  }

  async unlock() {
    if (this.started) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.35;
      this.master.connect(this.ctx.destination);
      this.buildAmbience();
      this.started = true;
    } catch (err) {
      console.warn('audio unavailable', err);
      this.enabled = false;
    }
  }

  buildAmbience() {
    // soft wind / air noise
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.35;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;

    this.ambienceGain = this.ctx.createGain();
    this.ambienceGain.gain.value = 0.05;

    noise.connect(filter);
    filter.connect(this.ambienceGain);
    this.ambienceGain.connect(this.master);
    noise.start();

    // rain noise (separate, louder when raining)
    const rain = this.ctx.createBufferSource();
    rain.buffer = buffer;
    rain.loop = true;
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'highpass';
    rainFilter.frequency.value = 900;
    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0;
    rain.connect(rainFilter);
    rainFilter.connect(this.rainGain);
    this.rainGain.connect(this.master);
    rain.start();

    this.noiseNode = noise;
  }

  setRain(intensity) {
    if (!this.rainGain) return;
    this.rainGain.gain.setTargetAtTime(intensity * 0.14, this.ctx.currentTime, 0.5);
  }

  setAmbience(level) {
    if (!this.ambienceGain) return;
    this.ambienceGain.gain.setTargetAtTime(0.04 + level * 0.06, this.ctx.currentTime, 0.8);
  }

  play(name) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    switch (name) {
      case 'doorOpen':
        this.blip(220, 0.08, 'triangle', 0.08);
        this.blip(330, 0.12, 'triangle', 0.05, 0.05);
        break;
      case 'doorClose':
        this.blip(180, 0.1, 'triangle', 0.08);
        break;
      case 'vending':
        this.blip(520, 0.07, 'square', 0.05);
        this.blip(660, 0.07, 'square', 0.05, 0.08);
        this.blip(780, 0.12, 'square', 0.04, 0.16);
        break;
      case 'chime':
        this.tone(660, 0.4, 'sine', 0.06);
        this.tone(880, 0.5, 'sine', 0.04, 0.12);
        break;
      case 'quest':
        this.tone(523, 0.12, 'triangle', 0.08);
        this.tone(659, 0.12, 'triangle', 0.08, 0.1);
        this.tone(784, 0.22, 'triangle', 0.08, 0.2);
        break;
      case 'train-horn':
        this.tone(196, 0.55, 'sawtooth', 0.04);
        this.tone(247, 0.55, 'sawtooth', 0.03, 0.02);
        break;
      case 'crossing':
        this.blip(880, 0.1, 'square', 0.03);
        this.blip(660, 0.1, 'square', 0.03, 0.18);
        break;
      case 'coin':
        this.tone(988, 0.06, 'square', 0.05);
        this.tone(1319, 0.1, 'square', 0.04, 0.05);
        break;
      case 'step':
        this.blip(90 + Math.random() * 30, 0.04, 'triangle', 0.02);
        break;
      default:
        this.blip(440, 0.08, 'sine', 0.04);
    }
  }

  blip(freq, dur, type = 'sine', gain = 0.05, delay = 0) {
    this.tone(freq, dur, type, gain, delay);
  }

  tone(freq, dur, type = 'sine', gain = 0.05, delay = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  update(hour, rainIntensity, isNight) {
    if (!this.started) return;
    // night quieter
    const base = isNight ? 0.4 : 0.7;
    this.setAmbience(base);
    this.setRain(rainIntensity);
  }
}
