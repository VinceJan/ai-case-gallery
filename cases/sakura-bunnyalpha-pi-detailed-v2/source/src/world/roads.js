// 道路、人行道、标线、桥梁 —— 基于地形高度贴合铺设
import * as THREE from 'three';
import { heightAt, WATER_Y } from './terrain.js';
import { ROADS, CROSSING, TRACK } from './layout.js';
import { PAL } from '../render/palette.js';
import { toon, basic, box, gradientMap, addOutline } from '../render/toon.js';
import { asphalt as asphaltTex, concrete, gravelTex } from '../render/textures.js';
import { closestOnSegment, lerp } from '../util/math.js';

const LIFT = 0.035;

/** 沿折线生成带宽条带（贴地） */
function ribbon(pts, width, lift, uvScale = 0.18, heightFn = heightAt) {
  const dense = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.ceil(len / 2.5));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      dense.push([lerp(ax, bx, t), lerp(az, bz, t)]);
    }
  }
  dense.push([pts[pts.length - 1][0], pts[pts.length - 1][1]]);

  const hw = width / 2;
  const verts = [], uvs = [], indices = [];
  let run = 0;
  for (let i = 0; i < dense.length; i++) {
    const [x, z] = dense[i];
    const p = dense[Math.max(0, i - 1)], n = dense[Math.min(dense.length - 1, i + 1)];
    let dx = n[0] - p[0], dz = n[1] - p[1];
    const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
    if (i > 0) run += Math.hypot(x - dense[i - 1][0], z - dense[i - 1][1]);
    const y = heightFn(x, z) + lift;
    verts.push(x - dz * hw, y, z + dx * hw);
    verts.push(x + dz * hw, y, z - dx * hw);
    uvs.push(0, run * uvScale, width * uvScale, run * uvScale);
    if (i < dense.length - 1) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/** 所有路面材质，雨天要变湿 */
const WET_MATS = [];

/** k: 0 干 → 1 湿 */
export function setRoadWet(k) {
  for (const m of WET_MATS) {
    if (!m.userData._dry) m.userData._dry = m.color.clone();
    m.color.copy(m.userData._dry).multiplyScalar(1 - k * 0.34);
    m.emissive.setRGB(k * 0.035, k * 0.04, k * 0.05);
  }
}

function roadMaterial(type) {
  const wrap = (m) => { WET_MATS.push(m); return m; };
  if (type === 'asphalt') {
    const t = asphaltTex().clone();
    t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, 1);
    return wrap(new THREE.MeshToonMaterial({ map: t, color: 0xffffff, gradientMap: gradientMap() }));
  }
  if (type === 'local') {
    const t = asphaltTex(PAL.asphaltLight).clone();
    t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return wrap(new THREE.MeshToonMaterial({ map: t, color: 0xf2f0ea, gradientMap: gradientMap() }));
  }
  if (type === 'gravel') {
    const t = gravelTex().clone();
    t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    return wrap(new THREE.MeshToonMaterial({ map: t, color: 0xffffff, gradientMap: gradientMap() }));
  }
  const t = concrete().clone();
  t.needsUpdate = true;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1.5, 1.5);
  return wrap(new THREE.MeshToonMaterial({ map: t, color: 0xf6f3ec, gradientMap: gradientMap() }));
}

/** 虚线标线 */
function dashes(pts, width, color = 0xfdf6d8, dash = 2.2, gap = 2.4, lift = 0.06) {
  const group = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const dx = (bx - ax) / len, dz = (bz - az) / len;
    for (let t = 0; t < len; t += dash + gap) {
      const cx = ax + dx * (t + dash / 2), cz = az + dz * (t + dash / 2);
      const g = new THREE.PlaneGeometry(width, dash);
      g.rotateX(-Math.PI / 2);
      g.rotateY(Math.atan2(dx, dz));
      g.translate(cx, heightAt(cx, cz) + lift, cz);
      group.push(g);
    }
  }
  return group;
}

function mergeGeos(list) {
  if (!list.length) return null;
  let total = 0, idxTotal = 0;
  for (const g of list) { total += g.attributes.position.count; idxTotal += g.index ? g.index.count : 0; }
  const pos = new Float32Array(total * 3);
  const nrm = new Float32Array(total * 3);
  const uv = new Float32Array(total * 2);
  const index = new Uint32Array(idxTotal);
  let vo = 0, io = 0;
  for (const g of list) {
    const p = g.attributes.position, nn = g.attributes.normal, u = g.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      pos[(vo + i) * 3] = p.getX(i); pos[(vo + i) * 3 + 1] = p.getY(i); pos[(vo + i) * 3 + 2] = p.getZ(i);
      nrm[(vo + i) * 3] = nn.getX(i); nrm[(vo + i) * 3 + 1] = nn.getY(i); nrm[(vo + i) * 3 + 2] = nn.getZ(i);
      uv[(vo + i) * 2] = u.getX(i); uv[(vo + i) * 2 + 1] = u.getY(i);
    }
    const gi = g.index.array;
    for (let i = 0; i < gi.length; i++) index[io + i] = gi[i] + vo;
    vo += p.count; io += gi.length;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(index, 1));
  return out;
}

export { mergeGeos };

/* ------------------------------------------------------------------ *
 *  主构建
 * ------------------------------------------------------------------ */
export function buildRoads() {
  const group = new THREE.Group();
  group.name = 'roads';

  for (const r of ROADS) {
    if (r.bridge) continue;
    const geo = ribbon(r.pts, r.width, LIFT, r.type === 'asphalt' ? 0.16 : 0.24);
    const m = new THREE.Mesh(geo, roadMaterial(r.type));
    m.receiveShadow = true;
    m.name = 'road-' + r.id;
    group.add(m);

    if (r.sidewalk) {
      for (const side of [-1, 1]) {
        const off = offsetPolyline(r.pts, (r.width / 2 + 1.3) * side);
        const g = ribbon(off, 2.6, 0.16, 0.3);
        const sm = new THREE.Mesh(g, roadMaterial('path'));
        sm.receiveShadow = true;
        group.add(sm);
        // 路缘立面
        const edge = offsetPolyline(r.pts, (r.width / 2) * side);
        const cv = curbGeo(edge);
        group.add(new THREE.Mesh(cv, toon(0xd8d2c4)));
      }
    }
    if (r.id === 'main') {
      const dm = mergeGeos(dashes(r.pts, 0.22));
      if (dm) group.add(new THREE.Mesh(dm, basic(PAL.cream)));
    }
  }

  // 斑马线（道口南侧）
  group.add(new THREE.Mesh(mergeGeos(crosswalkGeo(CROSSING.x, CROSSING.z + 6.6, 7.4, 3.4)), basic(0xf6f2e4)));
  group.add(new THREE.Mesh(mergeGeos(crosswalkGeo(CROSSING.x, CROSSING.z - 6.6, 7.4, 3.4)), basic(0xf6f2e4)));

  // 道口内路面
  const cz = TRACK.zAt(CROSSING.x);
  const cg = new THREE.PlaneGeometry(9.6, 7.2);
  cg.rotateX(-Math.PI / 2);
  cg.translate(CROSSING.x, heightAt(CROSSING.x, cz) + LIFT + 0.005, cz);
  const cm = new THREE.Mesh(cg, toon(0x7d7f88));
  group.add(cm);
  // 道口两侧引道
  for (const s of [-1, 1]) {
    const g = new THREE.PlaneGeometry(9.6, 3.2);
    g.rotateX(-Math.PI / 2);
    g.translate(CROSSING.x, heightAt(CROSSING.x, cz + s * 5.2) + LIFT, cz + s * 5.2);
    group.add(new THREE.Mesh(g, toon(0x75777f)));
  }

  // 桥
  group.add(buildBridge());

  return group;
}

function offsetPolyline(pts, off) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[Math.max(0, i - 1)], n = pts[Math.min(pts.length - 1, i + 1)];
    let dx = n[0] - p[0], dz = n[1] - p[1];
    const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
    out.push([pts[i][0] - dz * off, pts[i][1] + dx * off]);
  }
  return out;
}

function curbGeo(pts) {
  const verts = [], indices = [];
  const dense = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.ceil(len / 2.5));
    for (let k = 0; k < n; k++) dense.push([lerp(ax, bx, k / n), lerp(az, bz, k / n)]);
  }
  dense.push(pts[pts.length - 1]);
  for (let i = 0; i < dense.length; i++) {
    const [x, z] = dense[i];
    const h = heightAt(x, z);
    verts.push(x, h + 0.18, z);
    verts.push(x, h - 0.15, z);
    if (i < dense.length - 1) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

function crosswalkGeo(cx, cz, w, depth) {
  const list = [];
  const n = 7;
  const barW = w / (n * 2 - 1);
  for (let i = 0; i < n; i++) {
    const x = cx - w / 2 + barW * 0.5 + i * barW * 2;
    const g = new THREE.PlaneGeometry(barW, depth);
    g.rotateX(-Math.PI / 2);
    g.translate(x, heightAt(x, cz) + LIFT + 0.02, cz);
    list.push(g);
  }
  return list;
}

/* ------------------------------------------------------------------ *
 *  小桥
 * ------------------------------------------------------------------ */
function buildBridge() {
  const g = new THREE.Group();
  g.name = 'bridge';
  const a = [60, 6], b = [73, 2];
  const cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2;
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const deckY = heightAt(a[0], a[1]) + 0.18;
  const angle = Math.atan2(b[0] - a[0], b[1] - a[1]);

  const deck = box(4.2, 0.22, len + 1.6);
  const deckMesh = new THREE.Mesh(deck, toon(0xa89078));
  deckMesh.position.set(cx, deckY, cz);
  deckMesh.rotation.y = angle;
  deckMesh.castShadow = true; deckMesh.receiveShadow = true;
  g.add(deckMesh);

  // 栏杆
  for (const s of [-1, 1]) {
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const px = lerp(a[0], b[0], t) + Math.cos(angle) * 0 * s;
      const pz = lerp(a[1], b[1], t);
      const nx = -Math.sin(angle), nz = Math.cos(angle);
      const post = new THREE.Mesh(box(0.14, 0.9, 0.14), toon(PAL.wallWoodDark));
      post.position.set(px + nx * 1.95 * s, deckY + 0.5, pz + nz * 1.95 * s);
      g.add(post);
    }
    const rail = new THREE.Mesh(box(0.1, 0.12, len + 1.2), toon(PAL.wallWoodDark));
    rail.position.set(cx + (-Math.sin(angle)) * 1.95 * s, deckY + 0.9, cz + Math.cos(angle) * 1.95 * s);
    rail.rotation.y = angle;
    g.add(rail);
    const rail2 = rail.clone();
    rail2.position.y = deckY + 0.5;
    g.add(rail2);
  }
  // 桥墩
  for (const t of [0.35, 0.65]) {
    const px = lerp(a[0], b[0], t), pz = lerp(a[1], b[1], t);
    const pier = new THREE.Mesh(box(1.1, 4.5, 1.1), toon(0x9a9384));
    pier.position.set(px, deckY - 2.3, pz);
    pier.rotation.y = angle;
    g.add(pier);
  }
  return g;
}

/* ------------------------------------------------------------------ *
 *  查询：点距最近道路
 * ------------------------------------------------------------------ */
const _roadSegs = [];
export function initRoadIndex() {
  _roadSegs.length = 0;
  for (const r of ROADS) {
    const pts = r.pts;
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
      const len = Math.hypot(bx - ax, bz - az);
      const n = Math.max(1, Math.round(len / 6));
      for (let k = 0; k < n; k++) {
        _roadSegs.push({
          ax: lerp(ax, bx, k / n), az: lerp(az, bz, k / n),
          bx: lerp(ax, bx, (k + 1) / n), bz: lerp(az, bz, (k + 1) / n),
          hw: r.width / 2, id: r.id,
        });
      }
    }
  }
}

export function nearestRoad(x, z) {
  let best = null;
  for (const s of _roadSegs) {
    const c = closestOnSegment(x, z, s.ax, s.az, s.bx, s.bz);
    if (c.d < s.hw && (!best || c.d < best.d)) best = { ...c, hw: s.hw, id: s.id };
  }
  return best;
}

export function roadDistance(x, z) {
  let best = 1e9;
  for (const s of _roadSegs) {
    const c = closestOnSegment(x, z, s.ax, s.az, s.bx, s.bz);
    if (c.d < best) best = c.d;
  }
  return best;
}
