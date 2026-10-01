// 确定性 value noise / fbm —— 地形与自然摆放共用，保证玩家与网格高度完全一致
import { makeRNG, smoothstep } from './math.js';

const PERM = new Uint8Array(512);
const GRAD = new Float32Array(512);
(function build() {
  const rng = makeRNG(90210);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    GRAD[i] = rng() * 2 - 1;
  }
})();

/** 2D value noise，返回 [-1, 1] */
export function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const X = xi & 255, Y = yi & 255;
  const aa = GRAD[PERM[X + PERM[Y]] & 511];
  const ab = GRAD[PERM[X + PERM[Y + 1]] & 511];
  const ba = GRAD[PERM[X + 1 + PERM[Y]] & 511];
  const bb = GRAD[PERM[X + 1 + PERM[Y + 1]] & 511];
  const n0 = aa + (ba - aa) * u;
  const n1 = ab + (bb - ab) * u;
  return n0 + (n1 - n0) * v;
}

/** 分形叠加 */
export function fbm(x, y, octaves = 4, lacunarity = 2.03, gain = 0.5) {
  let amp = 1, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise2(x * freq, y * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / norm;
}

/** 脊状噪声，用于山脊 */
export function ridged(x, y, octaves = 4) {
  let amp = 1, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(noise2(x * freq, y * freq));
    sum += amp * n * n;
    norm += amp;
    amp *= 0.52;
    freq *= 2.07;
  }
  return sum / norm;
}

export { smoothstep };
