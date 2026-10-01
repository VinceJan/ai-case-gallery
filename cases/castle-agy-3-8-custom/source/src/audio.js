// Procedural Web Audio Ambient Soundscapes for Medieval Diorama
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.weatherType = 'SUNNY';
    this.windGain = null;
    this.rainGain = null;
    this.cricketGain = null;
    this.luteTimer = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.0;
    this.masterGain.connect(this.ctx.destination);

    // 1. Wind Generator (Filtered Noise)
    this.setupWind();

    // 2. Rain Sound Generator
    this.setupRain();

    // 3. Night Cricket Generator
    this.setupCrickets();

    // 4. Lute Plucking Scheduler (warm medieval plucked chords)
    this.scheduleLuteChords();
  }

  toggleMute() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0.0 : 0.45, now + 0.5);
    return !this.isMuted;
  }

  setupWind() {
    // Generate pink noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate breeze
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 420;
    filter.Q.value = 1.2;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.35;

    whiteNoise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    whiteNoise.start();

    // LFO to modulate breeze gently
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
  }

  setupRain() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0.0;

    rainSource.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);
    rainSource.start();
  }

  setupCrickets() {
    this.cricketGain = this.ctx.createGain();
    this.cricketGain.gain.value = 0.0;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 4600;

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 4900;

    const mod = this.ctx.createOscillator();
    mod.type = 'square';
    mod.frequency.value = 12;

    const modGain = this.ctx.createGain();
    modGain.gain.value = 0.15;

    mod.connect(modGain.gain);
    osc1.connect(modGain);
    osc2.connect(modGain);
    modGain.connect(this.cricketGain);
    this.cricketGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    mod.start();
  }

  // Pluck a single acoustic medieval lute note
  pluckLute(freq, time, volume = 0.15) {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Pluck attack & exponential decay
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 1.7);
  }

  scheduleLuteChords() {
    // Medieval D-Dorian scale frequencies (D3, F3, G3, A3, C4, D4, E4, F4)
    const scale = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 329.63, 349.23];

    const playPhrase = () => {
      if (!this.isMuted && this.ctx) {
        const now = this.ctx.currentTime;
        const root = scale[Math.floor(Math.random() * 4)];
        this.pluckLute(root, now, 0.16);
        this.pluckLute(root * 1.5, now + 0.28, 0.12);
        this.pluckLute(root * 1.25, now + 0.55, 0.10);
        if (Math.random() > 0.4) {
          this.pluckLute(root * 2.0, now + 0.85, 0.08);
        }
      }
      const nextDelay = 5000 + Math.random() * 6000;
      this.luteTimer = setTimeout(playPhrase, nextDelay);
    };

    setTimeout(playPhrase, 4000);
  }

  setWeather(type) {
    this.weatherType = type;
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (type === 'RAIN') {
      this.rainGain.gain.cancelScheduledValues(now);
      this.rainGain.gain.linearRampToValueAtTime(0.28, now + 1.0);
      this.cricketGain.gain.linearRampToValueAtTime(0.0, now + 0.5);
    } else if (type === 'NIGHT') {
      this.rainGain.gain.linearRampToValueAtTime(0.0, now + 0.5);
      this.cricketGain.gain.cancelScheduledValues(now);
      this.cricketGain.gain.linearRampToValueAtTime(0.18, now + 1.0);
    } else {
      this.rainGain.gain.linearRampToValueAtTime(0.0, now + 0.5);
      this.cricketGain.gain.linearRampToValueAtTime(0.0, now + 0.5);
    }
  }
}
