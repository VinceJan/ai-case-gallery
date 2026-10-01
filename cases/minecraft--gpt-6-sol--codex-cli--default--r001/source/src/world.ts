export type Block = 'grass' | 'dirt' | 'stone' | 'sand' | 'wood' | 'leaves' | 'planks' | 'brick' | 'glow';

export const WATER_LEVEL = 7;
export const WORLD_LIMIT = 32;
export const MAX_HEIGHT = 48;

const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

function hash(x: number, z: number, seed: number): number {
  let n = Math.imul(x, 374761393) + Math.imul(z, 668265263) + Math.imul(seed, 1442695041);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function noise(x: number, z: number, seed: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz, seed) * (1 - sx) + hash(ix + 1, iz, seed) * sx;
  const b = hash(ix, iz + 1, seed) * (1 - sx) + hash(ix + 1, iz + 1, seed) * sx;
  return (a * (1 - sz) + b * sz) * 2 - 1;
}

export function terrainHeight(x: number, z: number, seed = 42): number {
  const broad = noise(x * 0.026, z * 0.026, seed) * 5.5;
  const rolling = noise(x * 0.075, z * 0.075, seed + 11) * 3.3;
  const detail = noise(x * 0.19, z * 0.19, seed + 23) * 1.15;
  const ridge = Math.abs(noise(x * 0.014 + 24, z * 0.014 - 8, seed + 7));
  const centralRise = 4 * Math.exp(-((x + 1) ** 2 + (z + 2) ** 2) / 650);
  const cove = -5 * Math.exp(-((x - 14) ** 2 + (z - 7) ** 2) / 175);
  return Math.max(3, Math.min(25, Math.floor(12 + broad + rolling + detail + ridge * 3 + centralRise + cove)));
}

export class VoxelWorld {
  readonly blocks = new Map<string, Block>();
  readonly edits = new Map<string, Block | null>();
  readonly half: number;

  constructor(readonly seed = 42, readonly size = 64) {
    this.half = size / 2;
    this.generate();
  }

  inBounds(x: number, y: number, z: number): boolean {
    return x >= -this.half && x < this.half && z >= -this.half && z < this.half && y >= 0 && y < MAX_HEIGHT;
  }

  getSurfaceY(x: number, z: number): number {
    return terrainHeight(x, z, this.seed);
  }

  getBlock(x: number, y: number, z: number): Block | null {
    if (!this.inBounds(x, y, z)) return null;
    return this.blocks.get(key(x, y, z)) ?? null;
  }

  isSolid(x: number, y: number, z: number): boolean {
    const block = this.getBlock(x, y, z);
    return block !== null && block !== 'leaves';
  }

  setBlock(x: number, y: number, z: number, block: Block | null): boolean {
    if (!this.inBounds(x, y, z)) return false;
    const id = key(x, y, z);
    if (block === null) this.blocks.delete(id);
    else this.blocks.set(id, block);
    this.edits.set(id, block);
    return true;
  }

  serializeEdits(): string {
    return JSON.stringify([...this.edits]);
  }

  loadEdits(raw: string): void {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      for (const entry of parsed) {
        if (!Array.isArray(entry) || entry.length !== 2 || typeof entry[0] !== 'string') continue;
        const coords = entry[0].split(',').map(Number);
        const block = entry[1] as Block | null;
        if (coords.length !== 3 || coords.some((n) => !Number.isInteger(n))) continue;
        if (block !== null && !(['grass', 'dirt', 'stone', 'sand', 'wood', 'leaves', 'planks', 'brick', 'glow'] as unknown[]).includes(block)) continue;
        this.setBlock(coords[0], coords[1], coords[2], block);
      }
    } catch {
      // Ignore invalid or older saved worlds.
    }
  }

  findSpawn(): { x: number; y: number; z: number } {
    const candidates: { x: number; z: number; score: number }[] = [];
    for (let z = -this.half + 3; z < this.half - 3; z++) {
      for (let x = -this.half + 3; x < this.half - 3; x++) {
        const h = this.getSurfaceY(x, z);
        if (h < WATER_LEVEL + 2) continue;
        let clear = true;
        for (let dy = 1; dy <= 4 && clear; dy++) {
          for (let dz = -1; dz <= 1 && clear; dz++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (this.getBlock(x + dx, h + dy, z + dz)) { clear = false; break; }
            }
          }
        }
        if (!clear) continue;
        const score = Math.hypot(x + 5, z - 2) + Math.abs(h - 12) * .5;
        candidates.push({ x, z, score });
      }
    }
    candidates.sort((a, b) => a.score - b.score);
    const best = candidates[0] ?? { x: 0, z: 0 };
    return { x: best.x, y: this.getSurfaceY(best.x, best.z) + .51, z: best.z };
  }

  private put(x: number, y: number, z: number, block: Block): void {
    if (this.inBounds(x, y, z)) this.blocks.set(key(x, y, z), block);
  }

  private generate(): void {
    for (let z = -this.half; z < this.half; z++) {
      for (let x = -this.half; x < this.half; x++) {
        const h = this.getSurfaceY(x, z);
        for (let y = 0; y <= h; y++) {
          const block: Block = y === h ? (h <= WATER_LEVEL + 1 ? 'sand' : 'grass') : y > h - 4 ? 'dirt' : 'stone';
          this.put(x, y, z, block);
        }
      }
    }
    for (let z = -this.half + 4; z < this.half - 4; z += 6) {
      for (let x = -this.half + 4; x < this.half - 4; x += 6) {
        const tx = x + Math.floor(hash(x, z, this.seed + 100) * 4) - 2;
        const tz = z + Math.floor(hash(x, z, this.seed + 101) * 4) - 2;
        const h = this.getSurfaceY(tx, tz);
        if (h <= WATER_LEVEL + 2 || h >= 19 || hash(tx, tz, this.seed + 102) < .31) continue;
        const trunk = 3 + Math.floor(hash(tx, tz, this.seed + 103) * 3);
        for (let y = h + 1; y <= h + trunk; y++) this.put(tx, y, tz, 'wood');
        for (let dy = -2; dy <= 2; dy++) {
          const r = Math.abs(dy) === 2 ? 1 : 2;
          for (let dz = -r; dz <= r; dz++) {
            for (let dx = -r; dx <= r; dx++) {
              if (Math.abs(dx) === r && Math.abs(dz) === r && hash(tx + dx, tz + dz, this.seed + dy) < .45) continue;
              const bx = tx + dx, by = h + trunk + dy, bz = tz + dz;
              if (!this.getBlock(bx, by, bz)) this.put(bx, by, bz, 'leaves');
            }
          }
        }
      }
    }
  }
}
