/**
 * Deterministic seeded RNG (mulberry32). Route ALL gameplay randomness through
 * a seeded generator instead of Math.random so the __THREE_GAME_TEST_HOOKS__
 * seed() hook keeps visual baselines and bot playtests reproducible.
 */
export function createSeededRandom(seed: number): () => number {
  const rng = new Rng(seed);
  return () => rng.next();
}

/** 可序列化的 RNG：save/load 时保存内部状态。 */
export class Rng {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  next(): number {
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  int(maxExclusive: number): number {
    return Math.floor(this.next() * maxExclusive);
  }

  pick<T>(items: readonly T[]): T {
    return items[this.int(items.length)];
  }

  chance(probability: number): boolean {
    return this.next() < probability;
  }

  getState(): number {
    return this.state;
  }

  setState(state: number): void {
    this.state = state >>> 0;
  }
}
