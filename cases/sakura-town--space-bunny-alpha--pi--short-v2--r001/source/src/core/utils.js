/**
 * 通用数学 / 随机 / 缓动工具
 * 所有随机都走可播种 RNG，保证世界生成稳定可复现。
 */

/** 32 位可播种伪随机数发生器 (mulberry32) */
export function makeRNG(seed = 20240401) {
  let a = seed >>> 0;
  const rng = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  rng.range = (min, max) => min + rng() * (max - min);
  rng.int = (min, max) => Math.floor(rng.range(min, max + 1));
  rng.pick = (arr) => arr[Math.floor(rng() * arr.length) % arr.length];
  rng.chance = (p) => rng() < p;
  rng.sign = () => (rng() < 0.5 ? -1 : 1);
  return rng;
}

export const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const invLerp = (a, b, v) => (b === a ? 0 : (v - a) / (b - a));
export const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};
export const damp = (current, target, lambda, dt) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

/** 角度工具：返回 [-PI, PI] 的最短差值 */
export function angleDelta(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export function dampAngle(current, target, lambda, dt) {
  return current + angleDelta(current, target) * (1 - Math.exp(-lambda * dt));
}

/** 2D 值噪声 + 分形叠加，用于地形与配色 */
function hash2(x, y, seed) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function valueNoise2(x, y, seed = 0) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

export function fbm2(x, y, { octaves = 4, lacunarity = 2.0, gain = 0.5, seed = 0 } = {}) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise2(x * freq, y * freq, seed + i * 977) * amp;
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / norm;
}

/** 脊状噪声：适合做山脊 */
export function ridged2(x, y, opts = {}) {
  const { octaves = 4, lacunarity = 2.0, gain = 0.5, seed = 0 } = opts;
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(valueNoise2(x * freq, y * freq, seed + i * 313) * 2 - 1);
    sum += n * n * amp;
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / norm;
}

/** 点到线段的最短平方距离，以及最近点参数 t */
export function distSqToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  let t = lenSq > 1e-9 ? ((px - ax) * dx + (pz - az) * dz) / lenSq : 0;
  t = clamp(t, 0, 1);
  const cx = ax + dx * t;
  const cz = az + dz * t;
  const ddx = px - cx;
  const ddz = pz - cz;
  return { distSq: ddx * ddx + ddz * ddz, t, cx, cz };
}

/**
 * 折线工具：把一串控制点重采样成等间距点，并可查询最近点的距离/参数。
 * 河道与铁轨都用它。
 */
export function polyline(points, spacing = 2) {
  const out = [points[0].clone()];
  let carry = 0;
  for (let i = 1; i < points.length; i++) {
    const a = out[out.length - 1];
    const b = points[i];
    const segLen = a.distanceTo(b);
    if (segLen < 1e-6) continue;
    let d = spacing - carry;
    while (d <= segLen) {
      const t = d / segLen;
      out.push(a.clone().lerp(b, t));
      d += spacing;
    }
    carry = segLen - (d - spacing);
  }
  return out;
}

/** 折线最近点查询（粗筛 + 精查，足够快） */
export function makePolylineQuery(points) {
  const n = points.length;
  const cum = new Float32Array(n);
  const segLen = new Float32Array(n);
  for (let i = 1; i < n; i++) {
    segLen[i] = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y, points[i].z - points[i - 1].z);
    cum[i] = cum[i - 1] + segLen[i];
  }
  const total = cum[n - 1];

  return {
    points,
    length: total,
    /** @returns {{dist:number, index:number, t:number, s:number, point:{x:number,z:number}}} */
    closest(x, z) {
      let best = Infinity;
      let bi = 0;
      let bt = 0;
      for (let i = 0; i < n - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const r = distSqToSegment(x, z, a.x, a.z, b.x, b.z);
        if (r.distSq < best) {
          best = r.distSq;
          bi = i;
          bt = r.t;
        }
      }
      const a = points[bi];
      const b = points[bi + 1];
      return {
        dist: Math.sqrt(best),
        index: bi,
        t: bt,
        s: cum[bi] + (cum[bi + 1] - cum[bi]) * bt,
        point: { x: a.x + (b.x - a.x) * bt, z: a.z + (b.z - a.z) * bt },
      };
    },
    /** 弧长 s -> 位置 + 切线 */
    at(s) {
      const clamped = clamp(s, 0, total);
      let lo = 0;
      let hi = n - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] <= clamped) lo = mid;
        else hi = mid;
      }
      const segLen = cum[hi] - cum[lo] || 1;
      const t = (clamped - cum[lo]) / segLen;
      const a = points[lo];
      const b = points[hi];
      return {
        position: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t },
        tangent: { x: (b.x - a.x) / segLen, y: (b.y - a.y) / segLen, z: (b.z - a.z) / segLen },
      };
    },
  };
}

export const TMP_V3_A = { x: 0, y: 0, z: 0 };
