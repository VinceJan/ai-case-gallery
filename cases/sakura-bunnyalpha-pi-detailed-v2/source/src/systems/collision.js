// 碰撞世界：旋转盒 + 圆柱，迭代推出
import { heightAt, slopeAt, normalAt, isWaterAt, WATER_Y } from '../world/terrain.js';

export class CollisionWorld {
  constructor() {
    this.boxes = [];      // {x,z,hw,hd,rot,c,s,top,bottom,tall}
    this.circles = [];    // {x,z,r,top,bottom}
    this.grid = new Map();
    this.cell = 8;
  }
  addBox(x, z, hw, hd, rot = 0, top = Infinity, bottom = -1) {
    const b = { x, z, hw, hd, rot, top, bottom, c: Math.cos(rot), s: Math.sin(rot) };
    this.boxes.push(b);
    return b;
  }
  addCircle(x, z, r, top = Infinity, bottom = -1) {
    const c = { x, z, r, top, bottom };
    this.circles.push(c);
    return c;
  }
  /** 空间哈希加速 */
  index() {
    this.grid.clear();
    const C = this.cell;
    const put = (cx, cz, item) => {
      const k = Math.floor(cx / C) + ',' + Math.floor(cz / C);
      let a = this.grid.get(k);
      if (!a) { a = []; this.grid.set(k, a); }
      a.push(item);
    };
    for (const b of this.boxes) {
      const r = Math.hypot(b.hw, b.hd) + 0.5;
      for (let x = b.x - r; x <= b.x + r; x += C) for (let z = b.z - r; z <= b.z + r; z += C) put(x, z, b);
    }
    for (const c of this.circles) {
      for (let x = c.x - c.r; x <= c.x + c.r; x += C) for (let z = c.z - c.r; z <= c.z + c.r; z += C) put(x, z, c);
    }
  }
  near(x, z, radius) {
    const C = this.cell;
    const out = [];
    const seen = new Set();
    for (let cx = Math.floor((x - radius) / C); cx <= Math.floor((x + radius) / C); cx++) {
      for (let cz = Math.floor((z - radius) / C); cz <= Math.floor((z + radius) / C); cz++) {
        const a = this.grid.get(cx + ',' + cz);
        if (!a) continue;
        for (const it of a) { if (!seen.has(it)) { seen.add(it); out.push(it); } }
      }
    }
    return out;
  }
  /**
   * 把圆 (x,z,r) 从碰撞体中推出
   * @returns {{x:number,z:number}}
   */
  resolve(x, z, r, y = 0, iterations = 3) {
    for (let it = 0; it < iterations; it++) {
      const list = this.near(x, z, r + 2);
      let moved = false;
      for (const c of list) {
        if (y + 1.2 < c.bottom || y > c.top) continue;
        if (c.hw !== undefined) {
          const dx = x - c.x, dz = z - c.z;
          const lx = dx * c.c + dz * c.s;
          const lz = -dx * c.s + dz * c.c;
          const cx = Math.max(-c.hw, Math.min(c.hw, lx));
          const cz = Math.max(-c.hd, Math.min(c.hd, lz));
          let ox = lx - cx, oz = lz - cz;
          let d = Math.hypot(ox, oz);
          if (d > r) continue;
          if (d < 1e-6) {
            // 在内部：沿最近面推出
            const px = c.hw - Math.abs(lx), pz = c.hd - Math.abs(lz);
            if (px < pz) { ox = Math.sign(lx) || 1; oz = 0; d = 0; }
            else { ox = 0; oz = Math.sign(lz) || 1; d = 0; }
            const push = r + (px < pz ? px : pz) + 0.001;
            const nx = ox, nz = oz;
            const wx = nx * c.c - nz * c.s;
            const wz = nx * c.s + nz * c.c;
            x += wx * push; z += wz * push;
            moved = true;
            continue;
          }
          const nx = ox / d, nz = oz / d;
          const push = r - d + 0.001;
          const wx = nx * c.c - nz * c.s;
          const wz = nx * c.s + nz * c.c;
          x += wx * push; z += wz * push;
          moved = true;
        } else {
          const dx = x - c.x, dz = z - c.z;
          const d = Math.hypot(dx, dz);
          const rr = c.r + r;
          if (d >= rr || d < 1e-6) continue;
          const push = rr - d;
          x += (dx / d) * push; z += (dz / d) * push;
          moved = true;
        }
      }
      if (!moved) break;
    }
    return { x, z };
  }
  /** 视线检测：从 a 到 b 是否被阻挡（粗略，只查高箱） */
  blocked(ax, ay, az, bx, by, bz, steps = 12) {
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const x = ax + (bx - ax) * t, y = ay + (by - ay) * t, z = az + (bz - az) * t;
      for (const c of this.near(x, z, 1.5)) {
        if (c.hw === undefined) { if (Math.hypot(x - c.x, z - c.z) < c.r) return true; continue; }
        if (y < c.bottom || y > c.top) continue;
        const dx = x - c.x, dz = z - c.z;
        const lx = dx * c.c + dz * c.s, lz = -dx * c.s + dz * c.c;
        if (Math.abs(lx) < c.hw && Math.abs(lz) < c.hd) return true;
      }
    }
    return false;
  }
}

/* ------------------------------------------------------------------ *
 *  地形辅助
 * ------------------------------------------------------------------ */
const MAX_STEP = 0.62;
const MAX_SLOPE_Y = 0.66;   // ≈48°

/** 判断能否从 (fx,fz) 走到 (tx,tz)：坡度 / 台阶 / 水 */
export function canWalk(fx, fz, tx, tz, groundFn = heightAt) {
  const h0 = groundFn(fx, fz);
  const h1 = groundFn(tx, tz);
  if (Math.abs(h1 - h0) > MAX_STEP) return false;
  if (normalAt(tx, tz, 0.8).y < MAX_SLOPE_Y) return false;
  if (h1 < WATER_Y - 1.1) return false;
  return true;
}
