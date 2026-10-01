// src/engine/AudioSynthesizer.ts
// Comprehensive 100% procedural Web Audio engine for Sakura Town.
// Generates ambient, railway, interaction, and music without any external file dependencies.

export class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;

  // Background ambient nodes
  private windNode: AudioNode | null = null;
  private riverNode: AudioNode | null = null;
  private rainNode: AudioNode | null = null;
  private isPlayingBgm: boolean = false;
  private bgmTimer: number | null = null;

  // Volumes
  private bgmVolume: number = 0.4;
  private sfxVolume: number = 0.7;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policies
  }

  public init(): void {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.startAmbient();
      this.startAnimeMusic();
    } catch (e) {
      console.warn('Web Audio not available:', e);
    }
  }

  public ensureContext(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return !!this.ctx;
  }

  public setBGMVolume(vol: number): void {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  public setSFXVolume(vol: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  // --- AMBIENT SOUND GENERATION ---
  private startAmbient(): void {
    if (!this.ctx || !this.ambientGain) return;

    // 1. Gentle Wind / Air generator using filtered white noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO to modulate wind frequency
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // slow swell
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.ambientGain);
    whiteNoise.start();
    this.windNode = windGain;

    // Periodic birds / cicada chirps
    this.scheduleBirdChirps();
  }

  private scheduleBirdChirps(): void {
    if (!this.ctx) return;
    const nextInterval = 4000 + Math.random() * 8000;
    setTimeout(() => {
      this.playBirdSong();
      this.scheduleBirdChirps();
    }, nextInterval);
  }

  public playBirdSong(): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    // Japanese Bush Warbler (Uguisu) style sweet chirp
    const baseFreq = 2200 + Math.random() * 400;
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, t + 0.25);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, t + 0.4);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.04, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ambientGain || this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  public setRainActive(active: boolean): void {
    if (!this.ctx || !this.ambientGain) return;
    if (active && !this.rainNode) {
      // Create rain noise
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.0);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);
      noise.start();
      this.rainNode = gain;
    } else if (!active && this.rainNode) {
      const g = this.rainNode as GainNode;
      g.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        g.disconnect();
        this.rainNode = null;
      }, 1600);
    }
  }

  // --- RAILWAY & CROSSING SFX ---

  /** Japanese Fumikiri Railway Crossing Bell (踏切警报音: Alternating 700Hz and 750Hz dings) */
  public playCrossingBell(toneHigh: boolean, distanceFactor: number = 1.0): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Alternate between 700Hz and 750Hz
    const freq = toneHigh ? 750 : 700;
    osc.frequency.setValueAtTime(freq, t);

    // Resonant harmonic
    const oscHarmonic = this.ctx.createOscillator();
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2.76, t); // Metallic bell inharmonic

    const vol = Math.max(0.02, Math.min(0.25, 0.25 * (1 - distanceFactor * 0.8)));
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    oscHarmonic.start(t);
    osc.stop(t + 0.4);
    oscHarmonic.stop(t + 0.4);
  }

  /** Train Wheel Clatter on Track joints ("chug-clack") */
  public playTrainTrackClack(speedFactor: number = 1.0, distanceFactor: number = 1.0): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, t);

    const vol = 0.15 * Math.max(0, 1 - distanceFactor) * speedFactor;
    if (vol <= 0.001) return;

    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  /** Japanese Station Departure Melody (発車メロディ) - Nostalgic bright pentatonic chime */
  public playTrainDepartureMelody(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    // Chime notes: C5, E5, G5, A5, C6 (Ebisu/Shinjuku style bright chime)
    const notes = [
      { f: 523.25, d: 0.18, pause: 0.05 },
      { f: 659.25, d: 0.18, pause: 0.05 },
      { f: 783.99, d: 0.22, pause: 0.05 },
      { f: 880.00, d: 0.25, pause: 0.05 },
      { f: 783.99, d: 0.22, pause: 0.05 },
      { f: 1046.50, d: 0.55, pause: 0.1 }
    ];

    let offset = 0;
    notes.forEach((n) => {
      setTimeout(() => {
        this.playChimeNote(n.f, n.d, 0.18);
      }, offset * 1000);
      offset += n.d + n.pause;
    });
  }

  /** Train horn whistle (gentle Japanese two-tone commuter horn) */
  public playTrainHorn(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(392.00, t); // G4
    osc2.frequency.setValueAtTime(493.88, t); // B4

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.1);
    gain.gain.setValueAtTime(0.12, t + 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.1);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.2);
    osc2.stop(t + 1.2);
  }

  // --- INTERACTIVE SFX ---

  public playFootstep(surface: 'asphalt' | 'wood' | 'tatami' | 'gravel' = 'asphalt'): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    let freq = 120;
    let duration = 0.06;
    let vol = 0.05;

    if (surface === 'wood') {
      freq = 180;
      vol = 0.07;
      duration = 0.07;
    } else if (surface === 'tatami') {
      freq = 90;
      vol = 0.03;
      duration = 0.05;
    } else if (surface === 'gravel') {
      freq = 240;
      vol = 0.06;
      duration = 0.08;
    }

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, t);

    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  /** Bicycle Bell ("Rin-Rin!") */
  public playBicycleBell(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    this.playBellDing(1800, 0);
    this.playBellDing(2050, 0.12);
  }

  private playBellDing(freq: number, delay: number): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  /** Vending Machine Coin Clink & Can Drop Thud */
  public playVendingMachineBuy(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    // 1. Coin clink
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(3200, t);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.1);

    // 2. Can thud after 0.5s
    setTimeout(() => {
      if (!this.ctx || !this.sfxGain) return;
      const t2 = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(140, t2);
      osc2.frequency.exponentialRampToValueAtTime(50, t2 + 0.15);
      gain2.gain.setValueAtTime(0.25, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.2);
      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(t2);
      osc2.stop(t2 + 0.22);
    }, 500);
  }

  /** Can Pop Open and Sip */
  public playDrinkCan(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    // Pop snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  /** Convenience Store Door Welcome Chime (FamilyMart / 7-Eleven style bright arpeggio) */
  public playStoreDoorChime(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    // F#4, D4, A3, D4, E4, A4 ... classic bright chime
    const notes = [
      { f: 740, d: 0.14 },
      { f: 587, d: 0.14 },
      { f: 440, d: 0.14 },
      { f: 587, d: 0.14 },
      { f: 659, d: 0.14 },
      { f: 880, d: 0.35 }
    ];

    let delay = 0;
    notes.forEach((n) => {
      setTimeout(() => {
        this.playChimeNote(n.f, n.d, 0.12);
      }, delay * 1000);
      delay += n.d + 0.04;
    });
  }

  /** Shrine Prayer Clap and Coin drop */
  public playShrinePrayer(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    // Coin drop
    this.playBellDing(2400, 0);
    // Two sacred hand claps
    setTimeout(() => this.playHandClap(), 350);
    setTimeout(() => this.playHandClap(), 650);
  }

  private playHandClap(): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.05);
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  /** Camera Shutter Click */
  public playCameraShutter(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    // Click 1 (Mirror flip)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1400, t);
    gain1.gain.setValueAtTime(0.18, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc1.connect(gain1);
    gain1.connect(this.sfxGain);
    osc1.start(t);
    osc1.stop(t + 0.05);

    // Click 2 (Curtain close)
    setTimeout(() => {
      if (!this.ctx || !this.sfxGain) return;
      const t2 = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(950, t2);
      gain2.gain.setValueAtTime(0.16, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.06);
      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(t2);
      osc2.stop(t2 + 0.07);
    }, 80);
  }

  /** Sliding Door Whoosh */
  public playDoorSlide(): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.linearRampToValueAtTime(80, t + 0.35);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.06, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.36);
  }

  /** Dialogue text blip */
  public playDialogueBlip(): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const pitch = 580 + (Math.random() * 80 - 40);
    osc.frequency.setValueAtTime(pitch, t);
    gain.gain.setValueAtTime(0.025, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  /** UI click/confirm sound */
  public playUIConfirm(): void {
    this.playChimeNote(880, 0.1, 0.08);
  }

  /** Cat Meow */
  public playCatMeow(): void {
    if (!this.ensureContext() || !this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.linearRampToValueAtTime(900, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(450, t + 0.45);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  public playChimeNote(freq: number, duration: number, volume: number = 0.1): void {
    if (!this.ctx || !this.sfxGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  // --- ANIME NOSTALGIC PIANO LO-FI BGM GENERATOR ---
  private startAnimeMusic(): void {
    if (this.isPlayingBgm) return;
    this.isPlayingBgm = true;

    // Japanese Anime / Ghibli inspired chord progression in F Major / D Minor:
    // Bbmaj7 -> C7 -> Am7 -> Dm7 (classic nostalgic spring progression!)
    const chordProgression = [
      // Bbmaj7: Bb3 (233Hz), D4 (293Hz), F4 (349Hz), A4 (440Hz)
      { bass: 116.54, chord: [233.08, 293.66, 349.23, 440.00], melody: [440.0, 523.25, 440.0, 392.0] },
      // C7: C3 (130.8Hz), E4 (329Hz), G4 (392Hz), Bb4 (466Hz)
      { bass: 130.81, chord: [261.63, 329.63, 392.00, 466.16], melody: [523.25, 587.33, 523.25, 466.16] },
      // Am7: A2 (110Hz), C4 (261Hz), E4 (329Hz), G4 (392Hz)
      { bass: 110.00, chord: [220.00, 261.63, 329.63, 392.00], melody: [392.0, 440.0, 392.0, 349.23] },
      // Dm7: D3 (146Hz), F4 (349Hz), A4 (440Hz), C5 (523Hz)
      { bass: 146.83, chord: [293.66, 349.23, 440.00, 523.25], melody: [349.23, 392.0, 440.0, 349.23] }
    ];

    let chordIdx = 0;
    const playNextBar = () => {
      if (!this.isPlayingBgm || !this.ctx || !this.bgmGain) return;

      const current = chordProgression[chordIdx];
      chordIdx = (chordIdx + 1) % chordProgression.length;

      // Play soft warm piano chord
      const t = this.ctx.currentTime;
      this.playPianoNote(current.bass, 3.8, 0.05, 'triangle');

      current.chord.forEach((note, i) => {
        setTimeout(() => {
          this.playPianoNote(note, 2.5, 0.025, 'sine');
        }, i * 60);
      });

      // Play melody notes across the 4 beats
      current.melody.forEach((melNote, i) => {
        setTimeout(() => {
          this.playPianoNote(melNote, 1.2, 0.035, 'sine');
        }, i * 900 + 150);
      });

      this.bgmTimer = window.setTimeout(playNextBar, 3800);
    };

    playNextBar();
  }

  private playPianoNote(freq: number, duration: number, volume: number, type: OscillatorType = 'sine'): void {
    if (!this.ctx || !this.bgmGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(t);
    osc.stop(t + duration);
  }
}

// Global audio singleton
export const audio = new AudioSynthesizer();
