/**
 * Cel-shading（赛璐璐）材质工厂
 * - 统一的 3 阶 / 4 阶色阶贴图，MeshToonMaterial 直接吃
 * - 反向外壳描边（inverted hull），屏幕空间等宽，不会因为物体缩放而粗细不一
 * - 共享实例，避免为每个物体新建材质
 */
import * as THREE from 'three';

const gradientCache = new Map();
const materialCache = new Map();
const outlineCache = new Map();

/** 生成 1D 色阶贴图（NearestFilter 才能保持硬边色块） */
export function gradientMap(steps = 3, warmth = 0.06) {
  const key = `${steps}:${warmth}`;
  if (gradientCache.has(key)) return gradientCache.get(key);

  const data = new Uint8Array(steps * 4);
  for (let i = 0; i < steps; i++) {
    // 手动排布明暗：暗部偏冷且更暗，亮部偏暖。
    // 最暗阶刻意抬到 0.55 左右，避免阴影死黑，保持动画背景的通透感。
    const t = steps === 1 ? 1 : i / (steps - 1);
    const v = 0.56 + 0.44 * t;
    data[i * 4 + 0] = Math.min(255, Math.round(255 * (v + warmth * t)));
    data[i * 4 + 1] = Math.min(255, Math.round(255 * v));
    data[i * 4 + 2] = Math.min(255, Math.round(255 * (v - warmth * t * 0.8)));
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  gradientCache.set(key, tex);
  return tex;
}

/** 主 cel 材质 */
export function toonMaterial({
  color = 0xffffff,
  steps = 3,
  emissive = 0x000000,
  emissiveIntensity = 1,
  transparent = false,
  opacity = 1,
  vertexColors = false,
  side = THREE.FrontSide,
  map = null,
  depthWrite,
  warm = 0.06,
} = {}) {
  const mat = new THREE.MeshToonMaterial({
    color: new THREE.Color(color),
    gradientMap: gradientMap(steps, warm),
    emissive: new THREE.Color(emissive),
    emissiveIntensity,
    transparent,
    opacity,
    vertexColors,
    side,
    map,
  });
  if (depthWrite !== undefined) mat.depthWrite = depthWrite;
  return mat;
}

/** 共享材质（相同参数复用同一个实例） */
export function sharedToon(opts) {
  const key = JSON.stringify(opts, (k, v) => (v && v.isColor ? v.getHex() : v));
  if (materialCache.has(key)) return materialCache.get(key);
  const mat = toonMaterial(opts);
  materialCache.set(key, mat);
  return mat;
}

/** 自发光（窗户、灯、霓虹） */
export function glowMaterial(color, intensity = 1.0) {
  return sharedToon({ color, emissive: color, emissiveIntensity: intensity, steps: 2 });
}

// ---------------------------------------------------------------------------
// 描边
// ---------------------------------------------------------------------------

const OUTLINE_VERT = /* glsl */ `
  uniform float thickness;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * normal);
    // 视图空间外推 -> 屏幕空间等宽描边
    mvPosition.xyz += viewNormal * thickness;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const OUTLINE_FRAG = /* glsl */ `
  uniform vec3 outlineColor;
  void main() {
    gl_FragColor = vec4(outlineColor, 1.0);
    #include <colorspace_fragment>
  }
`;

function outlineMaterial(thickness, colorHex) {
  const key = `${thickness.toFixed(4)}:${colorHex}`;
  if (outlineCache.has(key)) return outlineCache.get(key);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      thickness: { value: thickness },
      outlineColor: { value: new THREE.Color(colorHex) },
    },
    vertexShader: OUTLINE_VERT,
    fragmentShader: OUTLINE_FRAG,
    side: THREE.BackSide,
    depthWrite: true,
  });
  outlineCache.set(key, mat);
  return mat;
}

/**
 * 给一个 mesh 挂上描边外壳。返回外壳 mesh（已 add 到原 mesh 下）。
 * @param {THREE.Mesh} mesh
 * @param {{thickness?:number, color?:number}} opts
 */
export function addOutline(mesh, { thickness = 0.02, color = 0x2b2033 } = {}) {
  if (!mesh || !mesh.geometry) return null;
  if (mesh.userData.__outlined) return mesh.userData.__outline;
  const shell = new THREE.Mesh(mesh.geometry, outlineMaterial(thickness, color));
  shell.name = `${mesh.name || 'mesh'}__outline`;
  shell.castShadow = false;
  shell.receiveShadow = false;
  shell.frustumCulled = mesh.frustumCulled;
  shell.renderOrder = (mesh.renderOrder || 0) - 1;
  shell.matrixAutoUpdate = false;
  shell.userData.isOutline = true;
  mesh.add(shell);
  mesh.userData.__outlined = true;
  mesh.userData.__outline = shell;
  return shell;
}

/** 递归给一个 group 里的所有网格加描边 */
export function outlineGroup(group, opts = {}) {
  const targets = [];
  group.traverse((o) => {
    if (o.isMesh && !o.userData.isOutline && !o.userData.noOutline) targets.push(o);
  });
  targets.forEach((m) => addOutline(m, opts));
  return group;
}

/** 标记：跳过描边的标记几何（薄片、地形等） */
export function noOutlineFlag(mesh) {
  mesh.userData.noOutline = true;
  return mesh;
}

// ---------------------------------------------------------------------------
// 常用小构件
// ---------------------------------------------------------------------------

const BOX_GEOS = new Map();
export function boxGeometry(w, h, d) {
  const key = `${w.toFixed(3)}_${h.toFixed(3)}_${d.toFixed(3)}`;
  if (!BOX_GEOS.has(key)) BOX_GEOS.set(key, new THREE.BoxGeometry(w, h, d));
  return BOX_GEOS.get(key);
}

const CYL_GEOS = new Map();
/** @param {number} segs 低面数柱体，保持卡通风 */
export function cylinderGeometry(rt, rb, h, segs = 10) {
  const key = `${rt.toFixed(3)}_${rb.toFixed(3)}_${h.toFixed(3)}_${segs}`;
  if (!CYL_GEOS.has(key)) CYL_GEOS.set(key, new THREE.CylinderGeometry(rt, rb, h, segs));
  return CYL_GEOS.get(key);
}

const SPHERE_GEOS = new Map();
export function sphereGeometry(r, segs = 10) {
  const key = `${r.toFixed(3)}_${segs}`;
  if (!SPHERE_GEOS.has(key)) SPHERE_GEOS.set(key, new THREE.SphereGeometry(r, segs, Math.max(4, segs >> 1)));
  return SPHERE_GEOS.get(key);
}

/** 快捷：盒子 mesh（自动居中到自身几何中心） */
export function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(boxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function cyl(rt, rb, h, segs, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(cylinderGeometry(rt, rb, h, segs), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function ball(r, segs, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(sphereGeometry(r, segs), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export const PALETTE = {
  wood: 0x99704e,
  woodDark: 0x6d4d37,
  woodLight: 0xb08a63,
  plaster: 0xf2ece0,
  plasterWarm: 0xf6ead6,
  plasterBlue: 0xdfe6ec,
  roofTile: 0x4a5a6b,
  roofTileDark: 0x39434f,
  roofRed: 0x9c4a3c,
  concrete: 0xb9b4ac,
  asphalt: 0x565a63,
  stone: 0xc3bdb2,
  glass: 0x9fd0e0,
  glassNight: 0xffd88a,
  accentRed: 0xd65545,
  accentBlue: 0x4a7fa5,
  accentGreen: 0x5f8f52,
  accentYellow: 0xe8b64c,
  sakura: 0xf6bccb,
  sakuraDeep: 0xe88fa8,
  leaf: 0x5e8c4a,
  leafDark: 0x3f6636,
  leafPine: 0x2f5a43,
  grass: 0x7fa856,
  dirt: 0xa8895f,
  metal: 0x9aa3ab,
  metalDark: 0x767f8a,
  white: 0xfbfbf7,
  black: 0x2a2530,
};
