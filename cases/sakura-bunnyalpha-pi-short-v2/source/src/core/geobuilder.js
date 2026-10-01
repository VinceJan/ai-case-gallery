/**
 * GeoBuilder：把大量小几何体按材质合并成少量 mesh，
 * 大幅压低 draw call，同时保留 cel-shading 需要的描边外壳。
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export class GeoBuilder {
  constructor(name = 'group') {
    this.name = name;
    /** @type {Map<string, {mat: THREE.Material, geos: THREE.BufferGeometry[], noOutline: boolean}>} */
    this.buckets = new Map();
    this._m = new THREE.Matrix4();
    this._q = new THREE.Quaternion();
    this._e = new THREE.Euler();
    this._v = new THREE.Vector3();
    this._s = new THREE.Vector3(1, 1, 1);
  }

  /**
   * @param {THREE.BufferGeometry} geo
   * @param {THREE.Material} mat
   * @param {object} t 变换：{x,y,z,rx,ry,rz,s 或 sx,sy,sz}
   * @param {string} key 可选：强制分桶
   */
  add(geo, mat, t = {}, key = null) {
    const bucketKey = key ?? mat.uuid + (t.noOutline ? '|n' : '');
    let bucket = this.buckets.get(bucketKey);
    if (!bucket) {
      bucket = { mat, geos: [], noOutline: !!t.noOutline };
      this.buckets.set(bucketKey, bucket);
    }
    const g = geo.clone();
    this._e.set(t.rx || 0, t.ry || 0, t.rz || 0);
    this._q.setFromEuler(this._e);
    this._v.set(t.x || 0, t.y || 0, t.z || 0);
    if (typeof t.s === 'number') this._s.setScalar(t.s);
    else this._s.set(t.sx ?? 1, t.sy ?? 1, t.sz ?? 1);
    this._m.compose(this._v, this._q, this._s);
    g.applyMatrix4(this._m);
    if (!g.attributes.uv) {
      const count = g.attributes.position.count;
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
    }
    if (!g.index) g.setIndex(Array.from({ length: g.attributes.position.count }, (_, i) => i));
    // 只保留合并所需的属性
    for (const name of Object.keys(g.attributes)) {
      if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name);
    }
    if (!g.attributes.normal) g.computeVertexNormals();
    bucket.geos.push(g);
    return this;
  }

  /** 直接加入一个已经构造好的 BufferGeometry（会按当前矩阵烘焙） */
  addGeometry(geo, mat, t = {}, key = null) {
    return this.add(geo, mat, t, key);
  }

  get isEmpty() {
    return this.buckets.size === 0;
  }

  /**
   * @param {object} opts
   * @param {boolean} opts.outline 是否生成描边
   * @param {number} opts.thickness 描边厚度
   * @param {number} opts.color 描边颜色
   */
  /**
   * 合并所有分桶，返回 [{mat, geometry, noOutline}]
   */
  dump() {
    const out = [];
    for (const [, bucket] of this.buckets) {
      if (bucket.geos.length === 0) continue;
      let merged = null;
      try {
        merged = mergeGeometries(bucket.geos, false);
      } catch (e) {
        merged = null;
      }
      bucket.geos.forEach((g) => g.dispose());
      bucket.geos.length = 0;
      if (!merged) continue;
      merged.computeBoundingSphere();
      out.push({ mat: bucket.mat, geometry: merged, noOutline: bucket.noOutline });
    }
    this.buckets.clear();
    return out;
  }

  build(opts = {}) {
    const group = new THREE.Group();
    group.name = this.name;
    const { outline = true, thickness = 0.035, color = 0x2a2130 } = opts;

    for (const { mat, geometry, noOutline } of this.dump()) {
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.castShadow = !noOutline;
      mesh.receiveShadow = !noOutline;
      if (noOutline) mesh.userData.noOutline = true;
      group.add(mesh);

      if (outline && !noOutline) {
        const shell = new THREE.Mesh(geometry, makeShellMaterial(thickness, color));
        shell.userData.isOutline = true;
        shell.renderOrder = -1;
        mesh.add(shell);
      }
    }
    return group;
  }
}

const shellCache = new Map();
export function makeShellMaterial(thickness, color) {
  const key = `${thickness.toFixed(4)}:${color}`;
  if (shellCache.has(key)) return shellCache.get(key);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      thickness: { value: thickness },
      outlineColor: { value: new THREE.Color(color) },
    },
    vertexShader: /* glsl */ `
      uniform float thickness;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * normal);
        mvPosition.xyz += n * thickness;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 outlineColor;
      void main() {
        gl_FragColor = vec4(outlineColor, 1.0);
        #include <colorspace_fragment>
      }
    `,
    side: THREE.BackSide,
    depthWrite: true,
  });
  shellCache.set(key, mat);
  return mat;
}
