/**
 * Procedural Web Audio: ambience, footsteps, train, rain, interactions.
 * No external audio files required.
 */
export class AudioSystem {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private unlocked = false;
  private muted = false;

  constructor() {
    // created lazily on first user gesture
    const unlock = () => this.unlock();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  private unlock(): void {
    if (this.unlocked) return;
    try {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.35;
      this.master.connect(this.ctx.destination);
      this.unlocked = true;
      this.startAmbience();
    } catch {
      // audio unavailable
    }
  }

  private startAmbience(): void {
    if (!this.ctx || !this.master) return;
    // soft noise bed
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    const g = this.ctx.createGain();
    g.gain.value = 0.12;
    noise.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    noise.start();

    // rain layer (silent by default)
    const rain = this.ctx.createBufferSource();
    rain.buffer = buffer;
    rain.loop = true;
    const rFilter = this.ctx.createBiquadFilter();
    rFilter.type = 'highpass';
    rFilter.frequency.value = 1200;
    const rg = this.ctx.createGain();
    rg.gain.value = 0;
    rain.connect(rFilter);
    rFilter.connect(rg);
    rg.connect(this.master);
    rain.start();
    this.rainGain = rg;
  }

  setRain(level: number): void {
    if (this.rainGain && this.ctx) {
      this.rainGain.gain.setTargetAtTime(level * 0.25, this.ctx.currentTime, 0.5);
    }
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.35, this.ctx.currentTime, 0.1);
    }
  }

  private blip(freq: number, dur = 0.12, type: OscillatorType = 'sine', vol = 0.2): void {
    if (!this.ctx || !this.master || this.muted) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = vol;
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    o.connect(g);
    g.connect(this.master);
    o.start();
    o.stop(this.ctx.currentTime + dur);
  }

  interact(): void {
    this.blip(660, 0.08, 'triangle', 0.15);
    setTimeout(() => this.blip(880, 0.1, 'triangle', 0.12), 40);
  }

  purchase(): void {
    this.blip(520, 0.07, 'square', 0.1);
    setTimeout(() => this.blip(780, 0.12, 'square', 0.08), 70);
  }

  dialogue(): void {
    this.blip(440, 0.05, 'sine', 0.08);
  }

  footstep(): void {
    this.blip(120 + Math.random() * 40, 0.04, 'triangle', 0.05);
  }

  trainHorn(): void {
    this.blip(180, 0.6, 'sawtooth', 0.12);
    setTimeout(() => this.blip(140, 0.8, 'sawtooth', 0.1), 120);
  }

  crossing(): void {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => this.blip(1000, 0.08, 'square', 0.08), i * 220);
    }
  }

  secret(): void {
    this.blip(523, 0.15, 'sine', 0.12);
    setTimeout(() => this.blip(659, 0.15, 'sine', 0.12), 120);
    setTimeout(() => this.blip(784, 0.25, 'sine', 0.12), 240);
  }

  questDone(): void {
    const notes = [523, 659, 784, 1046];
    notes.forEach((f, i) => setTimeout(() => this.blip(f, 0.18, 'triangle', 0.14), i * 100));
  }

  dispose(): void {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.unlocked = false;
    }
  }
}
