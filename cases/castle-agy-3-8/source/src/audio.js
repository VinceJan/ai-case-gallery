// Procedural Web Audio Ambient Soundscape Generator
export class Soundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentMode = 'day';
    this.masterGain = null;
    this.rainGain = null;
    this.windGain = null;
    this.cricketGain = null;
    this.timer = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.initWindNode();
    this.initRainNode();
    this.startBirdAndCricketLoop();
  }

  initWindNode() {
    // Pink noise buffer for ambient wind
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    whiteNoise.start();
  }

  initRainNode() {
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
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    rainSource.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);
    rainSource.start();
  }

  playBirdChirp() {
    if (!this.ctx || !this.isPlaying || this.currentMode !== 'day') return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    const baseFreq = 2200 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 700, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 200, now + 0.15);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  playCricketChirp() {
    if (!this.ctx || !this.isPlaying || (this.currentMode !== 'night' && this.currentMode !== 'sunset')) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(4500 + Math.random() * 400, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  startBirdAndCricketLoop() {
    const loop = () => {
      if (this.isPlaying) {
        if (this.currentMode === 'day') {
          if (Math.random() < 0.6) this.playBirdChirp();
        } else if (this.currentMode === 'night' || this.currentMode === 'sunset') {
          if (Math.random() < 0.7) this.playCricketChirp();
        }
      }
      setTimeout(loop, 800 + Math.random() * 2200);
    };
    loop();
  }

  setWeather(mode) {
    this.currentMode = mode;
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (mode === 'rain') {
      this.rainGain.gain.linearRampToValueAtTime(0.22, now + 1.0);
      this.windGain.gain.linearRampToValueAtTime(0.18, now + 1.0);
    } else {
      this.rainGain.gain.linearRampToValueAtTime(0.0, now + 1.0);
      this.windGain.gain.linearRampToValueAtTime(0.12, now + 1.0);
    }
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = !this.isPlaying;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isPlaying ? 0.35 : 0.0, this.ctx.currentTime);
    }
    return this.isPlaying;
  }
}
