// src/engine/AudioSynthesizer.ts
// Pure Web Audio API procedural sound engine with authentic Japanese town soundscapes.

export class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private riverGain: GainNode | null = null;
  private trainLoopGain: GainNode | null = null;

  // Track crossing chime interval
  private crossingInterval: number | null = null;
  private isCrossingPlaying: boolean = false;

  public init(): void {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.startAmbientSoundscapes();
    } catch {
      console.warn('Web Audio not supported or blocked by user gesture.');
    }
  }

  public resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  /** Background gentle wind, birds, and river streams */
  private startAmbientSoundscapes(): void {
    if (!this.ctx || !this.masterGain) return;

    // 1. River running water (filtered pink noise)
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

    const riverSource = this.ctx.createBufferSource();
    riverSource.buffer = noiseBuffer;
    riverSource.loop = true;

    const riverFilter = this.ctx.createBiquadFilter();
    riverFilter.type = 'bandpass';
    riverFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
    riverFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.riverGain = this.ctx.createGain();
    this.riverGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    riverSource.connect(riverFilter);
    riverFilter.connect(this.riverGain);
    this.riverGain.connect(this.masterGain);
    riverSource.start();

    // 2. Periodic spring birds chirping
    setInterval(() => {
      if (Math.random() < 0.4 && !this.isMuted && this.ctx && this.ctx.state === 'running') {
        this.playBirdChirp();
      }
    }, 4500);
  }

  /** Bird chirp FM synthesis */
  public playBirdChirp(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 2400 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, t0);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, t0 + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, t0 + 0.18);

    gain.gain.setValueAtTime(0.0, t0);
    gain.gain.linearRampToValueAtTime(0.04, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.22);
  }

  /** Player Footstep sound */
  public playFootstep(surface: 'road' | 'wood' | 'tatami' | 'gravel' = 'road'): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (surface === 'tatami') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, t0);
      osc.frequency.exponentialRampToValueAtTime(40, t0 + 0.08);
      gain.gain.setValueAtTime(0.08, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);
    } else if (surface === 'wood') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t0);
      osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.09);
      gain.gain.setValueAtTime(0.12, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.1);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, t0);
      osc.frequency.exponentialRampToValueAtTime(50, t0 + 0.07);
      gain.gain.setValueAtTime(0.1, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.1);
  }

  /** Authentic Japanese Railroad Crossing Bell (踏切警報音: 700Hz & 750Hz) */
  public startCrossingBell(): void {
    if (this.isCrossingPlaying || !this.ctx || !this.masterGain) return;
    this.isCrossingPlaying = true;
    let step = 0;

    const playDing = () => {
      if (!this.isCrossingPlaying || !this.ctx || !this.masterGain) return;
      const t0 = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const freq = step % 2 === 0 ? 710 : 750;
      step++;
      osc.frequency.setValueAtTime(freq, t0);

      gain.gain.setValueAtTime(0.18, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t0);
      osc.stop(t0 + 0.46);
    };

    playDing();
    this.crossingInterval = window.setInterval(playDing, 550);
  }

  public stopCrossingBell(): void {
    this.isCrossingPlaying = false;
    if (this.crossingInterval !== null) {
      clearInterval(this.crossingInterval);
      this.crossingInterval = null;
    }
  }

  /** Train Rail Clatter (Click-clack rhythm) */
  public playRailClickClack(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    [0, 0.12].forEach((offset) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, t0 + offset);
      osc.frequency.exponentialRampToValueAtTime(45, t0 + offset + 0.08);
      gain.gain.setValueAtTime(0.15, t0 + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + offset + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(t0 + offset);
      osc.stop(t0 + offset + 0.1);
    });
  }

  /** Japanese Train Station Departure Melody (JR-style Pentatonic Chime) */
  public playStationMelody(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    // Sakura Town Station chime notes: C5, E5, G5, A5, C6, G5, E5
    const notes = [
      { f: 523.25, d: 0.28 }, // C5
      { f: 659.25, d: 0.28 }, // E5
      { f: 783.99, d: 0.28 }, // G5
      { f: 880.00, d: 0.40 }, // A5
      { f: 1046.50, d: 0.35 },// C6
      { f: 783.99, d: 0.35 }, // G5
      { f: 659.25, d: 0.60 }  // E5
    ];

    let timeAcc = 0;
    notes.forEach((n) => {
      const start = t0 + timeAcc;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, start);

      gain.gain.setValueAtTime(0.0, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(start);
      osc.stop(start + n.d + 0.05);

      timeAcc += n.d * 0.9;
    });
  }

  /** Bicycle Bell (ママチャリ dual chime) */
  public playBicycleBell(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    [0, 0.14].forEach((offset, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      const freq = idx === 0 ? 1760 : 2093; // A6, C7
      osc.frequency.setValueAtTime(freq, t0 + offset);

      gain.gain.setValueAtTime(0.22, t0 + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + offset + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(t0 + offset);
      osc.stop(t0 + offset + 0.38);
    });
  }

  /** Shrine Suzu Brass Bell Ring & Coin Toss into Saisen Box */
  public playShrineBellAndCoin(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;

    // Resonant big brass Suzu bell
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(840, t0);
    osc.frequency.exponentialRampToValueAtTime(820, t0 + 1.2);
    gain.gain.setValueAtTime(0.3, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 1.4);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 1.45);

    // Coin clattering onto wooden slats
    setTimeout(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const tc = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const cOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        cOsc.type = 'triangle';
        cOsc.frequency.setValueAtTime(1400 + i * 300, tc + i * 0.05);
        cGain.gain.setValueAtTime(0.12, tc + i * 0.05);
        cGain.gain.exponentialRampToValueAtTime(0.001, tc + i * 0.05 + 0.1);
        cOsc.connect(cGain);
        cGain.connect(this.masterGain);
        cOsc.start(tc + i * 0.05);
        cOsc.stop(tc + i * 0.05 + 0.12);
      }
    }, 350);
  }

  /** Vending machine purchase: Coin insert + Heavy can drop "clunk" */
  public playVendingMachine(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;

    // Coin slot beep/tick
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, t0);
    gain1.gain.setValueAtTime(0.15, t0);
    gain1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(t0);
    osc1.stop(t0 + 0.09);

    // Can falling into slot (heavy clunk)
    setTimeout(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const tc = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, tc);
      osc2.frequency.exponentialRampToValueAtTime(45, tc + 0.22);
      gain2.gain.setValueAtTime(0.35, tc);
      gain2.gain.exponentialRampToValueAtTime(0.001, tc + 0.25);
      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(tc);
      osc2.stop(tc + 0.28);
    }, 400);
  }

  /** Calico Cat Meow & Purr */
  public playCatMeow(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, t0);
    osc.frequency.linearRampToValueAtTime(880, t0 + 0.15);
    osc.frequency.exponentialRampToValueAtTime(540, t0 + 0.42);

    gain.gain.setValueAtTime(0.0, t0);
    gain.gain.linearRampToValueAtTime(0.2, t0 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.45);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.48);
  }

  /** Camera Shutter Snap Click */
  public playCameraShutter(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1600, t0);
    osc.frequency.exponentialRampToValueAtTime(400, t0 + 0.04);

    gain.gain.setValueAtTime(0.25, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.07);
  }

  /** UI Confirm / Dialogue Chime */
  public playUIConfirm(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t0);
    osc.frequency.exponentialRampToValueAtTime(1760, t0 + 0.08);

    gain.gain.setValueAtTime(0.15, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.16);
  }

  /** Door sliding open sound */
  public playDoorSlide(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t0);
    osc.frequency.linearRampToValueAtTime(160, t0 + 0.25);

    gain.gain.setValueAtTime(0.12, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.3);
  }
}

export const audio = new AudioSynthesizer();
