// 静态道具装配：按「材质 × 空间分块」合并为少量静态 Mesh
import * as THREE from 'three';
import { GeoBuf, mergeBuf } from './geom.js';
import { smoothNormals, outlineMaterialRef } from '../render/toon.js';

/** THREE.BufferGeometry -> GeoBuf（可带变换） */
export function geoToBuf(geo, matrix) {
  const b = new GeoBuf();
  const p = geo.attributes.position, n = geo.attributes.normal, u = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    let nx = n.getX(i), ny = n.getY(i), nz = n.getZ(i);
    if (matrix) {
      const e = matrix.elements;
      const X = e[0] * x + e[4] * y + e[8] * z + e[12];
      const Y = e[1] * x + e[5] * y + e[9] * z + e[13];
      const Z = e[2] * x + e[6] * y + e[10] * z + e[14];
      const NX = e[0] * nx + e[4] * ny + e[8] * nz;
      const NY = e[1] * nx + e[5] * ny + e[9] * nz;
      const NZ = e[2] * nx + e[6] * ny + e[10] * nz;
      const l = Math.hypot(NX, NY, NZ) || 1;
      x = X; y = Y; z = Z; nx = NX / l; ny = NY / l; nz = NZ / l;
    }
    b.vert(x, y, z, nx, ny, nz, u.getX(i), u.getY(i));
  }
  const idx = geo.index ? geo.index.array : null;
  if (idx) { for (let i = 0; i < idx.length; i++) b.i.push(idx[i]); }
  else { for (let i = 0; i < p.count; i++) b.i.push(i); }
  return b;
}

/**
 * 收集（同材质 + 同空间分块合并）
 *   const kit = new InstanceKit('trees', 3);   // 3 = 每轴分块数
 *   kit.push(mat, buf, matrix)
 *   scene.add(kit.build({outline: 0.012}).group)
 */
export class InstanceKit {
  constructor(name = 'props', chunks = 3) {
    this.name = name;
    this.chunks = chunks;
    this.size = 300 / chunks;         // 覆盖 ±150
    this.map = new Map();            // `${cx},${cz}|${matId}` -> {mat, buf, count}
    this._matIds = new Map();
    this._matList = [];
    this.count = 0;
  }
  _matId(mat) {
    let i = this._matIds.get(mat);
    if (i === undefined) { i = this._matList.length; this._matIds.set(mat, i); this._matList.push(mat); }
    return i;
  }
  push(material, buf, matrix) {
    if (!buf || !buf.count) return;
    const e = matrix ? matrix.elements : null;
    const x = e ? e[12] : 0, z = e ? e[14] : 0;
    const cx = Math.max(0, Math.min(this.chunks - 1, Math.floor((x + 150) / this.size)));
    const cz = Math.max(0, Math.min(this.chunks - 1, Math.floor((z + 150) / this.size)));
    const key = `${cx},${cz}|${this._matId(material)}`;
    let g = this.map.get(key);
    if (!g) { g = { mat: material, buf: new GeoBuf() }; this.map.set(key, g); }
    const tmp = new GeoBuf();
    tmp.p = buf.p.slice(); tmp.n = buf.n.slice(); tmp.u = buf.u.slice(); tmp.i = buf.i.slice();
    if (matrix) tmp.applyMatrix(matrix);
    mergeBuf(g.buf, tmp);
    this.count++;
  }
  build(opts = {}) {
    const g = new THREE.Group();
    g.name = this.name;
    const meshes = [];
    for (const { mat, buf } of this.map.values()) {
      if (buf.isEmpty()) continue;
      const geo = buf.toGeometry();
      const m = new THREE.Mesh(geo, mat);
      m.castShadow = opts.castShadow !== false;
      m.receiveShadow = opts.receiveShadow !== false;
      g.add(m);
      meshes.push(m);
      if (opts.outline) {
        const og = smoothNormals(geo.clone());
        const om = new THREE.Mesh(og, outlineMaterialRef(opts.outline, opts.outlineColor));
        om.name = 'outline';
        om.matrixAutoUpdate = false;
        om.renderOrder = (m.renderOrder || 0) - 1;
        m.add(om);
      }
    }
    return { group: g, meshes };
  }
}

/** 组合变换 */
export function xform(x = 0, y = 0, z = 0, ry = 0, sx = 1, sy = 1, sz = 1, rx = 0, rz = 0) {
  const m = new THREE.Matrix4();
  m.compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')),
    new THREE.Vector3(sx, sy, sz)
  );
  return m;
}
