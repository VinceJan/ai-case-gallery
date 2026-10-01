// 建筑几何构造工具：世界尺度 UV、按材质合并
import * as THREE from 'three';

/** 把 src 合并进 target（自动偏移索引） */
export function mergeBuf(target, src) {
  const base = target.count;
  for (let i = 0; i < src.p.length; i++) target.p.push(src.p[i]);
  for (let i = 0; i < src.n.length; i++) target.n.push(src.n[i]);
  for (let i = 0; i < src.u.length; i++) target.u.push(src.u[i]);
  for (let i = 0; i < src.i.length; i++) target.i.push(src.i[i] + base);
}

/* ---------------- 世界尺度 UV 的盒体 ---------------- */
const BOX_DIMS = [[1, 0, 2], [1, 0, 2], [3, 0, 3], [3, 0, 3], [4, 0, 1], [4, 0, 1]];

export function worldUVBox(w, h, d, scale = 0.5, geo) {
  const g = geo || new THREE.BoxGeometry(w, h, d);
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  const uv = g.attributes.uv;
  for (let k = 0; k < 6; k++) {
    const [fw, fh] = dims[k];
    for (let i = 0; i < 4; i++) {
      const vi = k * 4 + i;
      uv.setXY(vi, uv.getX(vi) * fw * scale, uv.getY(vi) * fh * scale);
    }
  }
  uv.needsUpdate = true;
  return g;
}

/* ---------------- 通用几何累加器 ---------------- */
export class GeoBuf {
  constructor() { this.p = []; this.n = []; this.u = []; this.i = []; }
  get count() { return this.p.length / 3; }
  vert(x, y, z, nx, ny, nz, u, v) {
    this.p.push(x, y, z); this.n.push(nx, ny, nz); this.u.push(u, v);
    return this.count - 1;
  }
  tri(a, b, c) { this.i.push(a, b, c); }
  quad(a, b, c, d) { this.i.push(a, b, c, a, c, d); }
  /** 由三点计算法线后加入一个四边形 */
  addQuad(ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz, su = 1, sv = 1) {
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const wx = dx - ax, wy = dy - ay, wz = dz - az;
    let nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    const wu = Math.hypot(ux, uy, uz) * su, wv = Math.hypot(wx, wy, wz) * sv;
    const a = this.vert(ax, ay, az, nx, ny, nz, 0, 0);
    const b = this.vert(bx, by, bz, nx, ny, nz, wu, 0);
    const c = this.vert(cx, cy, cz, nx, ny, nz, wu, wv);
    const d = this.vert(dx, dy, dz, nx, ny, nz, 0, wv);
    this.quad(a, b, c, d);
    return this;
  }
  addTri(ax, ay, az, bx, by, bz, cx, cy, cz, su = 1, sv = 1) {
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const wx = cx - ax, wy = cy - ay, wz = cz - az;
    let nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    const wu = Math.hypot(ux, uy, uz) * su, wv = Math.hypot(wx, wy, wz) * sv;
    const a = this.vert(ax, ay, az, nx, ny, nz, 0, 0);
    const b = this.vert(bx, by, bz, nx, ny, nz, wu, 0);
    const c = this.vert(cx, cy, cz, nx, ny, nz, wu, wv);
    this.tri(a, b, c);
  }
  /** 圆柱（轴沿 Y） */
  cyl(cx, cy, cz, rTop, rBot, h, seg = 8, caps = true, su = 1) {
    const base = this.count;
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      // 侧面法线
      const slope = (rBot - rTop) / h;
      let nx = ca, ny = slope, nz = sa;
      const l = Math.hypot(nx, ny, nz) || 1;
      this.vert(cx + ca * rTop, cy + h / 2, cz + sa * rTop, nx / l, ny / l, nz / l, (i / seg) * su * 4, 0);
      this.vert(cx + ca * rBot, cy - h / 2, cz + sa * rBot, nx / l, ny / l, nz / l, (i / seg) * su * 4, h * su);
    }
    for (let i = 0; i < seg; i++) {
      const a = base + i * 2;
      this.quad(a, a + 2, a + 3, a + 1);
    }
    if (caps) {
      for (const [y, r, ny] of [[cy + h / 2, rTop, 1], [cy - h / 2, rBot, -1]]) {
        if (r <= 0.0001) continue;
        const c = this.vert(cx, y, cz, 0, ny, 0, 0.5, 0.5);
        const ring = [];
        for (let i = 0; i <= seg; i++) {
          const a = (i / seg) * Math.PI * 2;
          ring.push(this.vert(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r, 0, ny, 0, 0.5 + Math.cos(a) * 0.5, 0.5 + Math.sin(a) * 0.5));
        }
        for (let i = 0; i < seg; i++) {
          if (ny > 0) this.tri(c, ring[i], ring[i + 1]);
          else this.tri(c, ring[i + 1], ring[i]);
        }
      }
    }
    return this;
  }
  /** 低模球（二十面体细分） */
  sphere(cx, cy, cz, r, sub = 1, jitter = 0, seed = 0) {
    const g = new THREE.IcosahedronGeometry(r, sub);
    const pos = g.attributes.position, nrm = g.attributes.normal, uvA = g.attributes.uv;
    const base = this.count;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      if (jitter > 0) {
        const n = Math.sin(x * 2.3 + seed) * Math.cos(z * 1.9 - seed) * Math.sin(y * 2.7 + 1.1);
        const s = 1 + n * jitter;
        x *= s; y *= s; z *= s;
      }
      this.vert(cx + x, cy + y, cz + z, nrm.getX(i), nrm.getY(i), nrm.getZ(i), uvA.getX(i), uvA.getY(i));
    }
    for (let i = 0; i < pos.count; i += 3) this.tri(base + i, base + i + 1, base + i + 2);
    g.dispose();
    return this;
  }
  /** 圆环（水平） */
  ring(cx, cy, cz, rIn, rOut, seg = 12) {
    const base = this.count;
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      this.vert(cx + ca * rOut, cy, cz + sa * rOut, 0, 1, 0, i / seg, 0);
      this.vert(cx + ca * rIn, cy, cz + sa * rIn, 0, 1, 0, i / seg, 1);
    }
    for (let i = 0; i < seg; i++) {
      const a = base + i * 2;
      this.quad(a, a + 2, a + 3, a + 1);
    }
    return this;
  }
  box(cx, cy, cz, w, h, d, su = 0.5, sv = 0.5) {
    const x0 = cx - w / 2, x1 = cx + w / 2;
    const y0 = cy - h / 2, y1 = cy + h / 2;
    const z0 = cz - d / 2, z1 = cz + d / 2;
    this.addQuad(x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1, w * su, h * sv);
    this.addQuad(x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y1, z0, w * su, h * sv);
    this.addQuad(x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y1, z0, d * su, h * sv);
    this.addQuad(x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y1, z1, d * su, h * sv);
    this.addQuad(x0, y1, z1, x1, y1, z1, x1, y1, z0, x0, y1, z0, w * su, d * sv);
    this.addQuad(x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1, w * su, d * sv);
    return this;
  }
  /** 带世界 UV 的立方体（贴图连续） */
  applyMatrix(m) { this.p = this._apply(this.p, m, 3); this.n = this._normals(this.n, m); return this; }
  _apply(arr, m, size) {
    const out = new Array(arr.length);
    const e = m.elements;
    for (let k = 0; k < arr.length; k += size) {
      const x = arr[k], y = arr[k + 1], z = arr[k + 2];
      out[k] = e[0] * x + e[4] * y + e[8] * z + e[12];
      out[k + 1] = e[1] * x + e[5] * y + e[9] * z + e[13];
      out[k + 2] = e[2] * x + e[6] * y + e[10] * z + e[14];
    }
    return out;
  }
  _normals(arr, m) {
    const out = new Array(arr.length);
    const e = m.elements;
    for (let k = 0; k < arr.length; k += 3) {
      const x = arr[k], y = arr[k + 1], z = arr[k + 2];
      let nx = e[0] * x + e[4] * y + e[8] * z;
      let ny = e[1] * x + e[5] * y + e[9] * z;
      let nz = e[2] * x + e[6] * y + e[10] * z;
      const l = Math.hypot(nx, ny, nz) || 1;
      out[k] = nx / l; out[k + 1] = ny / l; out[k + 2] = nz / l;
    }
    return out;
  }
  toGeometry() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.setIndex(this.i);
    g.computeBoundingSphere();
    return g;
  }
  isEmpty() { return this.i.length === 0; }
}

/* ---------------- 屋顶 ---------------- */
/** 双坡屋顶（屋脊沿 X） */
export function gableRoof(b, w, d, rise, oh = 0.6, y = 0, su = 0.7) {
  const hw = w / 2 + oh, hd = d / 2 + oh;
  const ry = y + rise;
  // 前坡
  b.addQuad(-hw, y, hd, hw, y, hd, hw, ry, 0, -hw, ry, 0, w * su, Math.hypot(hd, rise) * su);
  // 后坡
  b.addQuad(hw, y, -hd, -hw, y, -hd, -hw, ry, 0, hw, ry, 0, w * su, Math.hypot(hd, rise) * su);
  // 山墙三角
  b.addTri(hw, y, -hd, hw, y, hd, hw, ry, 0, d * su, rise * su);
  b.addTri(-hw, y, hd, -hw, y, -hd, -hw, ry, 0, d * su, rise * su);
  // 底面
  b.addQuad(-hw, y, hd, -hw, y, -hd, hw, y, -hd, hw, y, hd, w * su, d * su);
  // 封檐板
  const t = 0.14;
  b.box(0, y - t / 2, hd, w + oh * 2, t, 0.16, su);
  b.box(0, y - t / 2, -hd, w + oh * 2, t, 0.16, su);
  return { height: rise };
}

/** 四坡屋顶 */
export function hipRoof(b, w, d, rise, oh = 0.6, y = 0, su = 0.7) {
  const hw = w / 2 + oh, hd = d / 2 + oh;
  const ry = y + rise;
  const ridgeHalf = Math.max(0.4, w / 2 - d / 2 + 0.2);
  // 前坡
  b.addQuad(-hw, y, hd, hw, y, hd, ridgeHalf, ry, 0, -ridgeHalf, ry, 0, w * su, Math.hypot(hd, rise) * su);
  // 后坡
  b.addQuad(hw, y, -hd, -hw, y, -hd, -ridgeHalf, ry, 0, ridgeHalf, ry, 0, w * su, Math.hypot(hd, rise) * su);
  // 左坡
  b.addQuad(-hw, y, -hd, -hw, y, hd, -ridgeHalf, ry, 0, -ridgeHalf, ry, 0, d * su, Math.hypot(hw, rise) * su);
  // 右坡
  b.addQuad(hw, y, hd, hw, y, -hd, ridgeHalf, ry, 0, ridgeHalf, ry, 0, d * su, Math.hypot(hw, rise) * su);
  b.addQuad(-hw, y, hd, -hw, y, -hd, hw, y, -hd, hw, y, hd, w * su, d * su);
  const t = 0.14;
  b.box(0, y - t / 2, hd, w + oh * 2, t, 0.16, su);
  b.box(0, y - t / 2, -hd, w + oh * 2, t, 0.16, su);
  b.box(-hw, y - t / 2, 0, 0.16, t, d + oh * 2, su);
  b.box(hw, y - t / 2, 0, 0.16, t, d + oh * 2, su);
  return { height: rise };
}

/** 平屋顶（带女儿墙） */
export function flatRoof(b, w, d, y = 0, oh = 0.35, parapet = 0.55) {
  const hw = w / 2 + oh, hd = d / 2 + oh;
  b.box(0, y - 0.12, 0, w + oh * 2, 0.24, d + oh * 2, 0.6);
  const p = 0.18;
  b.box(0, y + parapet / 2, hd - p / 2, w + oh * 2, parapet, p, 0.6);
  b.box(0, y + parapet / 2, -hd + p / 2, w + oh * 2, parapet, p, 0.6);
  b.box(hw - p / 2, y + parapet / 2, 0, p, parapet, d + oh * 2, 0.6);
  b.box(-hw + p / 2, y + parapet / 2, 0, p, parapet, d + oh * 2, 0.6);
  return { height: parapet };
}

/** 神社式屋顶（反曲） */
export function shrineRoof(b, w, d, rise, oh = 0.9, y = 0, su = 0.6) {
  const hw = w / 2 + oh, hd = d / 2 + oh;
  const steps = 5;
  for (const s of [1, -1]) {
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const z0 = hd * (1 - t0), z1 = hd * (1 - t1);
      const y0 = y + rise * Math.pow(t0, 0.72);
      const y1 = y + rise * Math.pow(t1, 0.72);
      const w0 = hw * (1 - t0 * 0.78), w1 = hw * (1 - t1 * 0.78);
      if (s > 0) b.addQuad(-w0, y0, z0, w0, y0, z0, w1, y1, z1, -w1, y1, z1, w0 * 2 * su, (z0 - z1) * su);
      else b.addQuad(w0, y0, z0, -w0, y0, z0, -w1, y1, z1, w1, y1, z1, w0 * 2 * su, (z0 - z1) * su);
    }
    // 博风板
    b.box(0, y + rise + 0.1, s * 0.1, 0.5, 0.3, 0.6, 0.6);
  }
  b.addQuad(-hw * 0.22, y + rise, 0.25, hw * 0.22, y + rise, 0.25, hw * 0.22, y + rise, -0.25, -hw * 0.22, y + rise, -0.25, 1, 1);
  b.box(0, y - 0.1, 0, w + oh * 2, 0.2, d + oh * 2, 0.5);
  return { height: rise };
}

/* ---------------- 台阶 ---------------- */
export function stairsGeo(b, cx, cz, w, steps, rise, run, dirZ = 1, su = 0.6) {
  for (let i = 0; i < steps; i++) {
    const y = rise * (i + 1);
    const z = cz + dirZ * run * (i + 0.5);
    b.box(cx, y - rise / 2, z, w, rise, run, su);
  }
  // 侧墙
  for (const s of [-1, 1]) {
    b.box(cx + s * (w / 2 + 0.12), rise / 2 + 0.1, cz + dirZ * run * steps / 2, 0.24, rise + 0.2, run * steps, su);
  }
}

/* ---------------- 台阶状人行道（车站前） ---------------- */
export function platformSide(b, x0, x1, z, h, su = 0.5) {
  b.box((x0 + x1) / 2, h / 2, z, x1 - x0, h, 0.3, su);
}

/* ---------------- 树冠球体（低模） ---------------- */
export function blobGeo(b, cx, cy, cz, r, seed = 0, lumps = 5) {
  const pts = [];
  for (let i = 0; i < lumps; i++) {
    const a = (i / lumps) * Math.PI * 2 + seed;
    const t = (i / lumps) * Math.PI;
    const rr = r * (0.52 + 0.3 * ((Math.sin(i * 12.9898 + seed) * 43758.5453) % 1 + 1) % 1);
    pts.push([
      cx + Math.cos(a) * Math.sin(t) * r * 0.75,
      cy + Math.cos(t) * r * 0.55,
      cz + Math.sin(a) * Math.sin(t) * r * 0.75,
      rr,
    ]);
  }
  // 用低分辨率 icosphere 合并近似
  const sph = new THREE.IcosahedronGeometry(r, 1);
  const pos = sph.attributes.position;
  const nrm = sph.attributes.normal;
  const arrP = [], arrN = [], arrU = [];
  const base = [];
  for (let i = 0; i < pos.count; i++) {
    let px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
    // 用噪声扰动做成团块
    const n = Math.sin(px * 3.1 + seed) * Math.cos(pz * 2.7 - seed) * Math.sin(py * 3.9 + 1.3);
    const s = 1 + n * 0.17;
    px *= s; py *= s * 0.92; pz *= s;
    base.push([cx + px, cy + py, cz + pz]);
    arrP.push(cx + px, cy + py, cz + pz);
    arrN.push(nrm.getX(i), nrm.getY(i), nrm.getZ(i));
    arrU.push((px / r) * 0.5 + 0.5, (pz / r) * 0.5 + 0.5);
  }
  const idx = [];
  for (let i = 0; i < pos.count; i++) idx.push(i);
  for (let i = 0; i < idx.length; i += 3) {
    b.p.push(...arrP.slice(i * 3, i * 3 + 3));
    b.n.push(...arrN.slice(i * 3, i * 3 + 3));
    b.u.push(...arrU.slice(i * 2, i * 2 + 2));
    b.i.push(idx[i], idx[i + 1], idx[i + 2]);
  }
  sph.dispose();
  return b;
}
