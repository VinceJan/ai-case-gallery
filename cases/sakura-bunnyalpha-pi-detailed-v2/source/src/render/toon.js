// Cel-shading 渲染基础：渐变贴图、共享材质库、轮廓线（反向外壳）
import * as THREE from 'three';
import { PAL } from './palette.js';

/* ------------------------------------------------------------------ *
 *  Toon 渐变贴图
 * ------------------------------------------------------------------ */
let _gradientMap = null;
export function gradientMap() {
  if (_gradientMap) return _gradientMap;
  // 4 段硬边渐变：阴影 / 暗部 / 中间调 / 亮部
  const steps = [104, 158, 212, 255];
  const data = new Uint8Array(steps.length * 4);
  steps.forEach((v, i) => {
    data[i * 4] = v; data[i * 4 + 1] = v; data[i * 4 + 2] = v; data[i * 4 + 3] = 255;
  });
  const tex = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  _gradientMap = tex;
  return tex;
}

/* ------------------------------------------------------------------ *
 *  共享材质库
 * ------------------------------------------------------------------ */
const _matCache = new Map();
const _emissiveRegistry = [];
let _idCounter = 0;
const _objIds = new WeakMap();
function objId(o) {
  let i = _objIds.get(o);
  if (i === undefined) { i = ++_idCounter; _objIds.set(o, i); }
  return i;
}
function keyOf(prefix, color, opts) {
  let k = prefix + color;
  for (const key in opts) {
    const v = opts[key];
    k += '|' + key + ':' + (v && (v.isTexture || v.isMaterial) ? 'o' + objId(v) : JSON.stringify(v));
  }
  return k;
}

/** 带缓存的 toon 材质 */
export function toon(color, opts = {}) {
  const key = keyOf('t', color, opts);
  if (_matCache.has(key)) return _matCache.get(key);
  const {
    map = null, transparent = false, opacity = 1, side = THREE.FrontSide,
    emissive = 0x000000, emissiveIntensity = 1, vertexColors = false,
    alphaTest = 0, depthWrite = true,
  } = opts;
  const m = new THREE.MeshToonMaterial({
    color, map, transparent, opacity, side, vertexColors, alphaTest, depthWrite,
    gradientMap: gradientMap(),
    emissive, emissiveIntensity,
  });
  _matCache.set(key, m);
  return m;
}

export function lambert(color, opts = {}) {
  const key = keyOf('l', color, opts);
  if (_matCache.has(key)) return _matCache.get(key);
  const m = new THREE.MeshLambertMaterial({ color, ...opts });
  _matCache.set(key, m);
  return m;
}

export function basic(color, opts = {}) {
  const key = keyOf('b', color, opts);
  if (_matCache.has(key)) return _matCache.get(key);
  const m = new THREE.MeshBasicMaterial({ color, ...opts });
  _matCache.set(key, m);
  return m;
}

/** 登记一块“会随夜晚亮起”的自发光材质 */
export function registerNightLight(material, opts = {}) {
  const entry = {
    material,
    dayEmissive: opts.day ?? new THREE.Color(0x000000),
    nightEmissive: opts.night ?? new THREE.Color(PAL.lampWarm),
    dayIntensity: opts.dayIntensity ?? 1,
    nightIntensity: opts.nightIntensity ?? 1.2,
    threshold: opts.threshold ?? 0.28,
    power: opts.power ?? 1,
    flicker: opts.flicker ?? 0,
  };
  _emissiveRegistry.push(entry);
  return entry;
}

/** 由昼夜系统调用：t 为 0(白天) → 1(深夜) */
export function updateNightLights(t, rain = 0) {
  for (const e of _emissiveRegistry) {
    const th = Math.max(0, e.threshold ?? 0);
    const k = th <= 0 ? 1 : Math.max(0, (t - th) / (1 - th));
    const eased = k * k * (3 - 2 * k);
    const c = e.dayEmissive.clone().lerp(e.nightEmissive, eased);
    let inten = e.dayIntensity + (e.nightIntensity - e.dayIntensity) * eased;
    if (e.flicker > 0) inten *= 1 - e.flicker * Math.random() * 0.5;
    // 雨天：招牌和窗户被雨雾衬得更亮，并轻微闪动
    if (rain > 0.01) {
      inten *= 1 + rain * 0.45;
      inten *= 1 - rain * 0.07 * Math.random();
    }
    e.material.emissive.copy(c);
    e.material.emissiveIntensity = inten;
  }
}

export function clearNightLights() {
  _emissiveRegistry.length = 0;
}

/* ------------------------------------------------------------------ *
 *  轮廓线：反向外壳（BackSide + 视空间法线外扩，屏幕宽度恒定）
 * ------------------------------------------------------------------ */
export const OUTLINE_COLOR = 0x3b3140;

const _outlineMaterials = new Map();
function outlineMaterial(thickness, color) {
  const key = thickness + '_' + color;
  if (_outlineMaterials.has(key)) return _outlineMaterials.get(key);
  const m = new THREE.MeshBasicMaterial({
    color, side: THREE.BackSide, fog: true, transparent: false, depthWrite: true,
  });
  m.userData.uThickness = { value: thickness };
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uThickness = m.userData.uThickness;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uThickness;')
      .replace(
        '#include <project_vertex>',
        /* glsl */`
        vec4 mvPosition = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        mvPosition = modelViewMatrix * mvPosition;
        vec3 outlineN = normalize( normalMatrix * normal );
        mvPosition.xyz += outlineN * min( max( -mvPosition.z, 1.0 ) * uThickness, 0.085 );
        gl_Position = projectionMatrix * mvPosition;
        `
      );
  };
  m.customProgramCacheKey = () => 'outline' + key;
  _outlineMaterials.set(key, m);
  return m;
}

/**
 * 为几何体生成平滑法线版本（把同位置法线合并平均），
 * 让反向外壳在方盒等硬边物体上也能得到连续轮廓。
 */
export function smoothNormals(geometry) {
  const pos = geometry.attributes.position;
  const nrm = geometry.attributes.normal;
  if (!pos || !nrm) return geometry;
  const n = pos.count;
  const map = new Map();
  const keyOf = (i) => `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`;
  for (let i = 0; i < n; i++) {
    const k = keyOf(i);
    let e = map.get(k);
    if (!e) { e = [0, 0, 0, []]; map.set(k, e); }
    e[0] += nrm.getX(i); e[1] += nrm.getY(i); e[2] += nrm.getZ(i);
    e[3].push(i);
  }
  for (const e of map.values()) {
    let x = e[0], y = e[1], z = e[2];
    const len = Math.hypot(x, y, z) || 1;
    x /= len; y /= len; z /= len;
    for (const i of e[3]) nrm.setXYZ(i, x, y, z);
  }
  nrm.needsUpdate = true;
  return geometry;
}

/** 给一个普通 Mesh 挂上轮廓（作为子物体，随之变换） */
export function addOutline(mesh, thickness = 0.014, color = OUTLINE_COLOR) {
  if (!mesh.geometry) return null;
  const g = smoothNormals(mesh.geometry.clone());
  const o = new THREE.Mesh(g, outlineMaterial(thickness, color));
  o.name = 'outline';
  o.renderOrder = (mesh.renderOrder || 0) - 1;
  o.castShadow = false;
  o.receiveShadow = false;
  o.matrixAutoUpdate = false;
  mesh.add(o);
  return o;
}

/** 为 InstancedMesh 生成配套轮廓实例（需手动同步 instanceMatrix） */
export function makeOutlineInstances(source, thickness = 0.014, color = OUTLINE_COLOR) {
  const o = new THREE.InstancedMesh(smoothNormals(source.geometry.clone()), outlineMaterial(thickness, color), source.count);
  o.name = 'outlineInstanced';
  o.instanceMatrix = source.instanceMatrix;
  o.count = source.count;
  o.castShadow = false;
  o.receiveShadow = false;
  o.frustumCulled = source.frustumCulled;
  return o;
}

export function outlineMaterialRef(thickness, color = OUTLINE_COLOR) {
  return outlineMaterial(thickness, color);
}

/* ------------------------------------------------------------------ *
 *  几何体小工具
 * ------------------------------------------------------------------ */
const _geoCache = new Map();
export function box(w, h, d, seg = 1) {
  const k = `box${w},${h},${d},${seg}`;
  if (!_geoCache.has(k)) _geoCache.set(k, new THREE.BoxGeometry(w, h, d, seg, seg, seg));
  return _geoCache.get(k);
}
export function cyl(rt, rb, h, seg = 10, open = false) {
  const k = `cyl${rt},${rb},${h},${seg},${open}`;
  if (!_geoCache.has(k)) _geoCache.set(k, new THREE.CylinderGeometry(rt, rb, h, seg, 1, open));
  return _geoCache.get(k);
}
export function sphere(r, w = 12, h = 8) {
  const k = `sph${r},${w},${h}`;
  if (!_geoCache.has(k)) _geoCache.set(k, new THREE.SphereGeometry(r, w, h));
  return _geoCache.get(k);
}
export function cone(r, h, seg = 10) {
  const k = `cone${r},${h},${seg}`;
  if (!_geoCache.has(k)) _geoCache.set(k, new THREE.ConeGeometry(r, h, seg));
  return _geoCache.get(k);
}
export function plane(w, h, ws = 1, hs = 1) {
  const k = `pl${w},${h},${ws},${hs}`;
  if (!_geoCache.has(k)) _geoCache.set(k, new THREE.PlaneGeometry(w, h, ws, hs));
  return _geoCache.get(k);
}
export function torus(r, t, seg = 8, ring = 16) {
  const k = `to${r},${t},${seg},${ring}`;
  if (!_geoCache.has(k)) _geoCache.set(k, new THREE.TorusGeometry(r, t, seg, ring));
  return _geoCache.get(k);
}
export function disposeGeoCache() {
  for (const g of _geoCache.values()) g.dispose();
  _geoCache.clear();
}

/** 快速创建网格 */
export function mesh(geometry, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  return m;
}
