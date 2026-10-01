// 地形：盆地高度场、河流、道路网
import * as THREE from 'three';
import {
  addBox, addPlane, smoothstep, lerp, fbm, rand, clamp, TAU, pick,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import { RAIL_Z, RIVER_BASE_X, BRIDGE_Z, ROADS } from './Layout.js';

const M = () => getMaterials();

/** 河道中心线 x（随 z 蜿蜒） */
export function riverX(z) {
  return RIVER_BASE_X + Math.sin(z * 0.018) * 7 + Math.sin(z * 0.052 + 2.1) * 2.2;
}

/** 地形高度（解析函数：地形网格 / 玩家 / NPC / 道具共用） */
export function heightAt(x, z) {
  const r = Math.hypot(x, z - 25);
  let h = 0;
  // 盆地外缘丘陵
  h += smoothstep((r - 95) / 60) * 15;
  // 远山
  const t2 = smoothstep((r - 150) / 90);
  h += t2 * 48;
  // 噪声（只在城外与山坡）
  const n = fbm(x * 0.016 + 7.3, z * 0.016 + 2.1, 4);
  h += n * (3 + t2 * 30) * smoothstep((r - 100) / 30);
  // 神社小山
  const dh = Math.hypot(x - 62, z - 72);
  h += 9.5 * Math.pow(Math.max(0, 1 - dh / 20), 1.7);
  // 河道下切
  const d = Math.abs(x - riverX(z));
  const carve = Math.pow(Math.max(0, 1 - d / 15), 1.35);
  h -= carve * (3.6 + t2 * 2.2);
  // 铁路走廊整平（到隧道口为止，之后山体合拢）
  if (Math.abs(z - RAIL_Z) < 17 && Math.abs(x) < 124) {
    const m = smoothstep((17 - Math.abs(z - RAIL_Z)) / 8);
    h = lerp(h, 0.12, m);
  }
  // 桥头引道整平（河道处除外，水从桥下过）
  if (Math.abs(z - BRIDGE_Z) < 6 && x < -70 && x > -118) {
    const dd = Math.abs(x - riverX(z));
    if (dd > 16) {
      const m = smoothstep((6 - Math.abs(z - BRIDGE_Z)) / 3) * smoothstep((dd - 16) / 6);
      h = lerp(h, 0.06, m);
    }
  }
  return h;
}

/** 地形坡度（0..1 近似） */
export function slopeAt(x, z) {
  const e = 1.2;
  const dx = heightAt(x + e, z) - heightAt(x - e, z);
  const dz = heightAt(x, z + e) - heightAt(x, z - e);
  return clamp(Math.hypot(dx, dz) / (2 * e), 0, 1);
}

/* ---------------- 地形网格 ---------------- */

export function buildTerrain(scene) {
  const SIZE = 660, SEG = 210;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const cGrass = new THREE.Color('#84a75d');
  const cGrassDry = new THREE.Color('#96ad68');
  const cDirt = new THREE.Color('#a08b62');
  const cRock = new THREE.Color('#8d887c');
  const cSand = new THREE.Color('#b5a482');
  const cDeep = new THREE.Color('#5d7a4a');
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const h = heightAt(x, z);
    pos.setY(i, h);
    const slope = slopeAt(x, z);
    const r = Math.hypot(x, z - 25);
    // 基础草色（噪声变化）
    const v = fbm(x * 0.09, z * 0.09, 2);
    tmp.copy(cGrass).lerp(cGrassDry, v);
    // 坡地露土
    tmp.lerp(cDirt, smoothstep((slope - 0.32) / 0.35));
    // 陡坡岩石
    tmp.lerp(cRock, smoothstep((slope - 0.62) / 0.3));
    // 河床砂石
    const dr = Math.abs(x - riverX(z));
    if (dr < 17 && h < 0.6) tmp.lerp(cSand, smoothstep((17 - dr) / 17) * 0.85);
    // 高处偏深绿（远山有雾 anyway）
    if (h > 18) tmp.lerp(cDeep, smoothstep((h - 18) / 25) * 0.5);
    colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshToonMaterial({ vertexColors: true });
  mat.gradientMap = M().paper.gradientMap;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  scene.add(mesh);

  // 镇内修剪草坪（覆盖平坦区，质感更干净）
  const ground = addPlane(scene, M().grass, 210, 160, 0, 0.045, 25, { uv: 0.055 });
  ground.receiveShadow = true;
  const ground2 = addPlane(scene, M().grass, 60, 60, 66, 0.045, 20, { uv: 0.055 });
  ground2.receiveShadow = true;

  return { mesh, ground };
}

/* ---------------- 河流 ---------------- */

export function buildRiver(scene) {
  const z0 = -170, z1 = 200, step = 8;
  const posArr = [], uvArr = [], idxArr = [];
  let vi = 0;
  for (let z = z0; z <= z1; z += step) {
    const cx = riverX(z);
    const halfW = 6.2;
    posArr.push(cx - halfW, -1.05, z, cx + halfW, -1.05, z);
    uvArr.push(0, (z - z0) / 12, 1, (z - z0) / 12);
    if (z + step <= z1) {
      idxArr.push(vi, vi + 1, vi + 3, vi, vi + 3, vi + 2);
      vi += 2;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvArr, 2));
  geo.setIndex(idxArr);
  geo.computeVertexNormals();
  const mat = M().water.clone();
  mat.map = M().water.map.clone();
  mat.map.needsUpdate = true;
  mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
  const water = new THREE.Mesh(geo, mat);
  water.receiveShadow = false;
  scene.add(water);
  return {
    mesh: water,
    update(dt) {
      mat.map.offset.y -= dt * 0.06;
      mat.map.offset.x = Math.sin(performance.now() * 0.0002) * 0.05;
    },
  };
}

/* ---------------- 道路 ---------------- */

/**
 * 铺设一段道路（沥青 + 人行道 + 中线）。
 * pts: [[x,z],...] 折线；w: 沥青宽度
 */
export function addRoad(group, colliders, pts, w, {
  sidewalk = true, markings = true, kind = 'asphalt',
} = {}) {
  const mat = kind === 'asphalt' ? M().asphalt : M().dirt;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, z0] = pts[i], [x1, z1] = pts[i + 1];
    const dx = x1 - x0, dz = z1 - z0;
    const len = Math.hypot(dx, dz);
    const ry = Math.atan2(dx, dz);
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    const y = 0.055;
    addBox(group, mat, w, 0.1, len, cx, y, cz, { ry, uv: 0.22, cast: false });
    if (sidewalk) {
      for (const s of [-1, 1]) {
        const sw = 1.5;
        const ox = Math.cos(ry) * s * (w / 2 + sw / 2);
        const oz = -Math.sin(ry) * s * (w / 2 + sw / 2);
        addBox(group, M().sidewalk, sw, 0.16, len, cx + ox, 0.07, cz + oz, { ry, uv: 0.4, cast: false });
      }
    }
    if (markings) {
      const n = Math.floor(len / 3.2);
      for (let k = 0; k < n; k++) {
        const t = (k + 0.5) / n;
        const mx = x0 + dx * t, mz = z0 + dz * t;
        const dash = addBox(group, M().white, 0.16, 0.02, 1.5, mx, 0.12, mz, { ry, cast: false });
        dash.receiveShadow = false;
      }
    }
  }
}

/** 斑马线（道口/路口前） */
export function zebra(group, x, z, ry, w = 6, across = 4) {
  for (let i = 0; i < across; i++) {
    for (let j = -Math.floor(across / 2); j <= Math.floor(across / 2); j++) {
      const ox = Math.cos(ry) * j * (w / across) + Math.sin(ry) * i * 0.62;
      const oz = -Math.sin(ry) * j * (w / across) + Math.cos(ry) * i * 0.62;
      addBox(group, M().white, w / across - 0.14, 0.02, 0.42, x + ox, 0.125, z + oz, { ry, cast: false });
    }
  }
}

/** 广场铺装 */
export function plaza(group, x0, z0, x1, z1) {
  const w = Math.abs(x1 - x0), d = Math.abs(z1 - z0);
  addPlane(group, M().sidewalk, w, d, (x0 + x1) / 2, 0.07, (z0 + z1) / 2, { uv: 0.35 });
  // 铺装分隔缝
  for (let x = x0 + 2; x < x1; x += 2) {
    addBox(group, M().concrete, 0.06, 0.02, d, x, 0.08, (z0 + z1) / 2, { cast: false });
  }
}

/** 全部道路一次性铺设 */
export function buildRoads(scene, colliders) {
  const g = new THREE.Group();
  for (const r of ROADS) {
    addRoad(g, colliders, r.pts, r.w, { kind: r.w <= 3 ? 'dirt' : 'asphalt', markings: r.w > 3.4 });
  }
  // 站前广场
  plaza(g, -13, -25, 13, -16);
  // 道口斑马线
  zebra(g, 42, -47.5, 0, 7, 5);
  zebra(g, 42, -36.5, 0, 7, 5);
  scene.add(g);
  return g;
}
