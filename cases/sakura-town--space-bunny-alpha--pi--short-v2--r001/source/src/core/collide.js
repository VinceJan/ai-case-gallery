/**
 * 碰撞：建筑用带旋转的矩形盒（OBB），河/道口等用圆形禁区。
 * 玩家、NPC、相机共用一套查询。
 */
import { clamp } from './utils.js';

export class ColliderSet {
  constructor() {
    /** @type {Array<{x:number,z:number,hw:number,hd:number,rot:number,top:number,bottom:number,tag?:string}>} */
    this.boxes = [];
    /** @type {Array<{x:number,z:number,r:number,tag?:string,enabled?:boolean}>} */
    this.circles = [];
  }

  /** 添加一个 OBB。rot 为 Y 轴弧度。 */
  addBox(x, z, hw, hd, rot, bottom = 0, top = 6, tag = '') {
    this.boxes.push({ x, z, hw, hd, rot, bottom, top, tag });
    return this.boxes[this.boxes.length - 1];
  }

  addCircle(x, z, r, tag = '') {
    this.circles.push({ x, z, r, tag, enabled: true });
    return this.circles[this.circles.length - 1];
  }

  /**
   * 把一个半径 r 的圆推出所有碰撞体。
   * @returns {{x:number,z:number,hit:boolean}} 修正后的位置
   */
  resolve(x, z, r) {
    let hit = false;
    // 盒子
    for (let i = 0; i < this.boxes.length; i++) {
      const b = this.boxes[i];
      const dx = x - b.x;
      const dz = z - b.z;
      const c = Math.cos(-b.rot);
      const s = Math.sin(-b.rot);
      const lx = dx * c - dz * s;
      const lz = dx * s + dz * c;
      const cx = clamp(lx, -b.hw, b.hw);
      const cz = clamp(lz, -b.hd, b.hd);
      let ox = lx - cx;
      let oz = lz - cz;
      let d = Math.hypot(ox, oz);
      if (d >= r) continue;
      if (d < 1e-5) {
        // 圆心在盒内：沿最浅的一侧推出
        const pushX = b.hw - Math.abs(lx) + r;
        const pushZ = b.hd - Math.abs(lz) + r;
        if (pushX < pushZ) ox = Math.sign(lx || 1) * pushX;
        else oz = Math.sign(lz || 1) * pushZ;
        d = 0;
      } else {
        const k = (r - d) / d;
        ox *= k;
        oz *= k;
      }
      // 回到世界坐标
      const cc = Math.cos(b.rot);
      const ss = Math.sin(b.rot);
      x += ox * cc - oz * ss;
      z += ox * ss + oz * cc;
      hit = true;
    }
    // 圆
    for (let i = 0; i < this.circles.length; i++) {
      const c = this.circles[i];
      if (c.enabled === false) continue;
      const dx = x - c.x;
      const dz = z - c.z;
      const d = Math.hypot(dx, dz);
      const min = c.r + r;
      if (d >= min) continue;
      if (d < 1e-5) {
        x += min;
        hit = true;
        continue;
      }
      const k = (min - d) / d;
      x += dx * k;
      z += dz * k;
      hit = true;
    }
    return { x, z, hit };
  }

  /** 只判断是否与盒子重叠（用于 NPC 视线等） */
  blockedByBox(x, z, r) {
    for (let i = 0; i < this.boxes.length; i++) {
      const b = this.boxes[i];
      const dx = x - b.x;
      const dz = z - b.z;
      const c = Math.cos(-b.rot);
      const s = Math.sin(-b.rot);
      const lx = dx * c - dz * s;
      const lz = dx * s + dz * c;
      const cx = clamp(lx, -b.hw, b.hw);
      const cz = clamp(lz, -b.hd, b.hd);
      if (Math.hypot(lx - cx, lz - cz) < r) return b;
    }
    return null;
  }

  /**
   * 射线检测（相机遮挡用）：返回从 (x0,y0,z0) 沿 (dx,dy,dz) 走到的最近可通行距离。
   */
  rayDistance(x0, y0, z0, dx, dy, dz, maxT) {
    let best = maxT;
    for (let i = 0; i < this.boxes.length; i++) {
      const b = this.boxes[i];
      const c = Math.cos(-b.rot);
      const s = Math.sin(-b.rot);
      const ox = x0 - b.x;
      const oz = z0 - b.z;
      const lox = ox * c - oz * s;
      const loz = ox * s + oz * c;
      const ldx = dx * c - dz * s;
      const ldz = dx * s + dz * c;
      let tmin = 0;
      let tmax = best;
      // X 轴 slab
      if (Math.abs(ldx) < 1e-6) {
        if (lox < -b.hw || lox > b.hw) continue;
      } else {
        let t1 = (-b.hw - lox) / ldx;
        let t2 = (b.hw - lox) / ldx;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) continue;
      }
      // Z 轴 slab
      if (Math.abs(ldz) < 1e-6) {
        if (loz < -b.hd || loz > b.hd) continue;
      } else {
        let t1 = (-b.hd - loz) / ldz;
        let t2 = (b.hd - loz) / ldz;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) continue;
      }
      if (tmin <= 0 || tmin >= best) continue;
      const hitY = y0 + dy * tmin;
      if (hitY < b.bottom || hitY > b.top) continue;
      best = tmin;
    }
    return best;
  }
}
