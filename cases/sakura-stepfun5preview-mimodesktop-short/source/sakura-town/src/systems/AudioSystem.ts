/** 程序化 WebAudio 音效与环境声（无外部音频资源）。 */
export class AudioSystem {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private unlocked = false;
  private muted = false;

  private windGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private cricketGain: GainNode | null = null;
  private trainGain: GainNode | null = null;
  private birdTimer = 0;
  private cricketTimer = 0;

  constructor() {
    const unlock = () => {
      void this.unlock();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  async unlock(): Promise<void> {
    if (this.unlocked) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.context = new AudioContextClass();
    await this.context.resume();
    this.unlocked = true;

    this.master = this.context.createGain();
    this.master.gain.value = this.muted ? 0 : 0.9;
    this.master.connect(this.context.destination);

    // 风声（持续噪声床）
    this.windGain = this.createNoiseLayer(500, 0.035);
    // 雨声
    this.rainGain = this.createNoiseLayer(1800, 0);
    // 虫鸣
    this.cricketGain = this.createNoiseLayer(4200, 0);
    // 列车通过
    this.trainGain = this.createNoiseLayer(220, 0);
  }

  private createNoiseLayer(frequency: number, gain: number): GainNode | null {
    if (!this.context || !this.master) return null;
    const length = this.context.sampleRate * 2;
    const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = frequency;
    filter.Q.value = 0.6;
    const gainNode = this.context.createGain();
    gainNode.gain.value = gain;
    source.connect(filter).connect(gainNode).connect(this.master);
    source.start();
    return gainNode;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master) this.master.gain.value = muted ? 0 : 0.9;
  }

  setRaining(raining: boolean): void {
    this.rainGain?.gain.setTargetAtTime(raining ? 0.11 : 0, this.context?.currentTime ?? 0, 0.4);
  }

  setNight(night: boolean): void {
    this.windGain?.gain.setTargetAtTime(night ? 0.022 : 0.035, this.context?.currentTime ?? 0, 0.8);
    this.cricketGain?.gain.setTargetAtTime(night ? 0.02 : 0, this.context?.currentTime ?? 0, 0.6);
  }

  /** 列车接近程度 0..1。 */
  setTrainProximity(proximity: number): void {
    this.trainGain?.gain.setTargetAtTime(proximity * 0.16, this.context?.currentTime ?? 0, 0.15);
  }

  private tone(
    frequency: number,
    duration: number,
    type: OscillatorType,
    gainValue: number,
    slideTo?: number,
  ): void {
    if (!this.context || this.context.state !== 'running' || !this.master) return;
    const now = this.context.currentTime;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    if (slideTo) oscillator.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain).connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  }

  uiClick(): void {
    this.tone(660, 0.07, 'triangle', 0.1);
  }

  interact(): void {
    this.tone(520, 0.09, 'triangle', 0.12, 720);
  }

  door(): void {
    this.tone(300, 0.14, 'sine', 0.14, 180);
    this.tone(900, 0.06, 'triangle', 0.06);
  }

  buy(): void {
    this.tone(740, 0.08, 'triangle', 0.1);
    this.tone(988, 0.12, 'triangle', 0.09);
  }

  sell(): void {
    this.tone(620, 0.09, 'triangle', 0.1);
    this.tone(466, 0.14, 'triangle', 0.09);
  }

  gift(): void {
    this.tone(523, 0.1, 'sine', 0.1);
    this.tone(659, 0.12, 'sine', 0.09);
    this.tone(784, 0.18, 'sine', 0.08);
  }

  questAccept(): void {
    this.tone(392, 0.1, 'triangle', 0.1);
    this.tone(523, 0.14, 'triangle', 0.1);
  }

  questDone(): void {
    this.tone(523, 0.1, 'triangle', 0.11);
    this.tone(659, 0.1, 'triangle', 0.11);
    this.tone(784, 0.1, 'triangle', 0.11);
    this.tone(1047, 0.22, 'triangle', 0.12);
  }

  trainBell(): void {
    this.tone(880, 0.5, 'sine', 0.09);
    this.tone(1320, 0.4, 'sine', 0.05);
  }

  fireworks(): void {
    this.tone(120, 0.35, 'sine', 0.16, 40);
    this.tone(2400, 0.12, 'square', 0.03);
  }

  sleep(): void {
    this.tone(392, 0.4, 'sine', 0.08, 262);
    this.tone(294, 0.6, 'sine', 0.06, 196);
  }

  /** 每帧更新：白天鸟鸣、夜晚虫鸣的随机啁啾。 */
  updateAmbience(delta: number, isNight: boolean): void {
    if (!this.context || this.context.state !== 'running') return;
    this.birdTimer -= delta;
    this.cricketTimer -= delta;
    if (!isNight && this.birdTimer <= 0) {
      this.birdTimer = 2.5 + Math.random() * 4;
      const base = 1800 + Math.random() * 900;
      this.tone(base, 0.09, 'sine', 0.035);
      window.setTimeout(() => this.tone(base * 1.2, 0.07, 'sine', 0.03), 110);
    }
    if (isNight && this.cricketTimer <= 0) {
      this.cricketTimer = 0.35 + Math.random() * 0.5;
      this.tone(4100 + Math.random() * 300, 0.05, 'square', 0.012);
    }
  }

  dispose(): void {
    void this.context?.close();
    this.context = null;
  }
}
