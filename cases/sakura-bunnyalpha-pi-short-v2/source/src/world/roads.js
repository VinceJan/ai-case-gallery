/**
 * 道路系统：路面、人行道、斑马线、桥、广场铺装。
 * 路面贴着地形生成，遇到河谷会自动断开，由桥接上。
 */
import * as THREE from 'three';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry, cylinderGeometry } from '../core/toon.js';
import { heightAt, river, roadDistance } from './terrain.js';
import { PLAZAS, ROADS, RIVER_BLOCK, makePolyline2D } from './layout.js';
import { clamp } from '../core/utils.js';

function pavingTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#c9c3b6';
  g.fillRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(120,112,100,0.55)';
  g.lineWidth = 3;
  for (let i = 0; i <= 4; i++) {
    g.beginPath();
    g.moveTo((i * 128) / 4, 0);
    g.lineTo((i * 128) / 4, 128);
    g.stroke();
    g.beginPath();
    g.moveTo(0, (i * 128) / 4);
    g.lineTo(128, (i * 128) / 4);
    g.stroke();
  }
  g.fillStyle = 'rgba(255,255,255,0.14)';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if ((i + j) % 2) g.fillRect((i * 128) / 4 + 2, (j * 128) / 4 + 2, 30, 30);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function dashTexture() {
  const c = document.createElement('canvas');
  c.width = 16;
  c.height = 64;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 16, 64);
  g.fillStyle = '#f0ece0';
  g.fillRect(3, 6, 10, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** 把折线采样成带宽度、贴合地形的带状几何；遇河自动断开 */
function ribbon(points, halfWidth, yOffset, uvScale = 0.12, lateral = 0) {
  const runs = [];
  let cur = [];
  const step = 1.6;
  const samples = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    const n = Math.max(1, Math.round(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      samples.push({ x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t });
    }
  }
  samples.push(points[points.length - 1]);

  let dist = 0;
  for (let i = 0; i < samples.length; i++) {
    const p = samples[i];
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(samples.length - 1, i + 1)];
    let dx = next.x - prev.x;
    let dz = next.z - prev.z;
    const l = Math.hypot(dx, dz) || 1;
    dx /= l;
    dz /= l;
    const px = -dz;
    const pz = dx;
    if (i > 0) dist += Math.hypot(p.x - prev.x, p.z - prev.z);
    const inRiver = river.closest(p.x, p.z).dist < RIVER_BLOCK + 1.5;
    const cx = p.x + px * lateral;
    const cz = p.z + pz * lateral;
    const node = {
      lx: cx + px * halfWidth,
      lz: cz + pz * halfWidth,
      rx: cx - px * halfWidth,
      rz: cz - pz * halfWidth,
      s: dist,
      valid: !inRiver,
    };
    if (inRiver) {
      if (cur.length > 1) runs.push(cur);
      cur = [];
    } else {
      cur.push(node);
    }
  }
  if (cur.length > 1) runs.push(cur);

  const pos = [];
  const uv = [];
  const idx = [];
  let base = 0;
  for (const run of runs) {
    for (let i = 0; i < run.length; i++) {
      const n = run[i];
      pos.push(n.lx, heightAt(n.lx, n.lz) + yOffset, n.lz);
      pos.push(n.rx, heightAt(n.rx, n.rz) + yOffset, n.rz);
      uv.push(0, n.s * uvScale, 1, n.s * uvScale);
    }
    for (let i = 0; i < run.length - 1; i++) {
      const a = base + i * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
    base += run.length * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return { geo, runs };
}

export function buildRoads(m) {
  const b = new GeoBuilder('roads');
  const paveTex = pavingTexture();
  const dashTex = dashTexture();

  const roadMat = m.accentFor(0x5b5f66, { steps: 3 });
  const roadMatTex = m.accentFor(0x5b5f66, { steps: 3 });
  const walkMat = m.accentFor(0xcfc9bd, { steps: 3 });
  const stoneMat = m.accentFor(0xc3bdb2, { steps: 3 });
  const dirtMat = m.accentFor(0xa8895f, { steps: 3 });
  const lineMat = new THREE.MeshBasicMaterial({ map: dashTex, transparent: true, depthWrite: false });
  const paveMat = new THREE.MeshToonMaterial({ map: paveTex.clone(), color: 0xffffff });

  paveMat.map.repeat.set(1, 1);

  for (const road of ROADS) {
    const pts = makePolyline2D(road.pts, 3);
    const mat = road.style === 'stone' ? stoneMat : road.style === 'dirt' ? dirtMat : roadMat;
    const { geo } = ribbon(pts, road.width / 2, 0.06);
    b.add(geo, mat, {}, `road_${road.id}`);
    if (road.style === 'road') {
      // 人行道：左右各一条，不能盖住路面
      for (const s of [-1, 1]) {
        const wl = ribbon(pts, 0.72, 0.13, 0.12, s * (road.width / 2 + 0.78));
        b.add(wl.geo, walkMat, {}, `walk_${road.id}_${s}`);
        const cl = ribbon(pts, 0.11, 0.09, 0.12, s * (road.width / 2 + 0.06));
        b.add(cl.geo, m.stoneDark, {}, `curb_${road.id}_${s}`);
      }
    }
    if (road.id === 'main' || road.id === 'cross_m') {
      const line = ribbon(pts, 0.18, 0.09, 0.22);
      const geo2 = line.geo;
      const uvAttr = geo2.attributes.uv;
      if (uvAttr) {
        for (let i = 0; i < uvAttr.count; i++) uvAttr.setY(i, uvAttr.getY(i) * 1.0);
        uvAttr.needsUpdate = true;
      }
      b.add(geo2, lineMat, {}, `line_${road.id}`);
    }
  }

  // 广场铺装
  const pav = paveMat.map;
  for (const p of PLAZAS) {
    const mat = p.style === 'stone' ? paveMat : p.style === 'dirt' ? dirtMat : roadMat;
    const g = new THREE.PlaneGeometry(p.w, p.d, Math.max(1, Math.round(p.w / 4)), Math.max(1, Math.round(p.d / 4)));
    g.rotateX(-Math.PI / 2);
    // 让顶点贴合地形
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const wx = p.x + pos.getX(i);
      const wz = p.z + pos.getZ(i);
      pos.setY(i, heightAt(wx, wz) + 0.09);
    }
    g.computeVertexNormals();
    // 注意：g 的 X/Z 是在广场局部坐标里采样的，要整体平移到广场位置
    b.add(g, mat, { x: p.x, z: p.z, noOutline: true }, `plaza_${p.x}_${p.z}`);
  }

  // 广场砖纹 UV
  // (材质自带 repeat，通过每个 mesh 单独设置不可行，这里统一用世界坐标近似)
  return b.build({ outline: false });
}

/** 主街跨河大桥 */
export function buildBridge(m) {
  const b = new GeoBuilder('bridge');
  // 沿主街（x=0）找到河心
  let bestZ = -76;
  let bestD = Infinity;
  for (let z = -100; z <= -50; z += 0.4) {
    const d = river.closest(0, z).dist;
    if (d < bestD) {
      bestD = d;
      bestZ = z;
    }
  }
  const half = 13.5;
  const z0 = bestZ - half;
  const z1 = bestZ + half;
  const y = heightAt(0, bestZ + half + 4) + 0.35;

  // 桥面
  b.add(boxGeometry(11.5, 0.5, (z1 - z0) + 1.5), m.stone, { x: 0, y: y - 0.25, z: (z0 + z1) / 2 });
  b.add(boxGeometry(9.6, 0.1, (z1 - z0) + 1.4), m.accentFor(0x6b6f76), { x: 0, y: y + 0.02, z: (z0 + z1) / 2 });
  // 引桥
  for (const [za, zb] of [[z0 - 7, z0], [z1, z1 + 7]]) {
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      const z = za + (zb - za) * t;
      const gy = heightAt(0, z);
      b.add(boxGeometry(11.0, 0.42, 1.6), m.stone, { x: 0, y: (gy + y) / 2 - 0.1, z });
    }
  }
  // 栏杆
  for (const sx of [-1, 1]) {
    b.add(boxGeometry(0.3, 0.16, (z1 - z0) + 1.5), m.stone, { x: (sx * 11.5) / 2, y: y + 0.85, z: (z0 + z1) / 2 });
    b.add(boxGeometry(0.24, 0.12, (z1 - z0) + 1.5), m.stone, { x: (sx * 11.5) / 2, y: y + 0.4, z: (z0 + z1) / 2 });
    const n = Math.round((z1 - z0) / 1.6);
    for (let i = 0; i <= n; i++) {
      const z = z0 + ((z1 - z0) * i) / n;
      b.add(boxGeometry(0.22, 0.95, 0.22), m.stone, { x: (sx * 11.5) / 2, y: y + 0.45, z });
    }
  }
  // 桥墩
  for (const z of [bestZ - 4, bestZ + 4]) {
    b.add(boxGeometry(3.4, 6, 1.6), m.stoneDark, { x: 0, y: y - 3.2, z });
  }
  // 桥头石碑
  for (const sz of [z0, z1]) {
    b.add(boxGeometry(0.8, 1.3, 0.5), m.stone, { x: -6.4, y: y + 0.9, z: sz });
  }
  const g = b.build({ thickness: 0.03 });
  g.userData.bridgeZ = bestZ;
  g.userData.bridgeY = y;
  return g;
}

/** 道口的斑马线 / 停止线 */
export function buildCrossingMarkings(m, cx, cz) {
  const b = new GeoBuilder('crossing');
  const white = m.accentFor(0xf0ece0, { steps: 2 });
  // 道口两侧的斑马线（垂直于道路方向）
  for (const s of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const x = -4.2 + i * 1.7;
      b.add(boxGeometry(0.85, 0.06, 3.2), white, {
        x, y: heightAt(cx + x, cz + s * 6.4) + 0.12, z: cz + s * 6.4,
      });
    }
  }
  // 停止线
  for (const s of [-1, 1]) {
    b.add(boxGeometry(9.2, 0.06, 0.4), white, { x: 0, y: heightAt(cx, cz + s * 9.4) + 0.12, z: cz + s * 9.4 });
  }
  return b.build({ outline: false });
}

/** 站台 */
export function buildPlatform(m, x0, x1, zCenter, zWidth) {
  const b = new GeoBuilder('platform');
  const y = 0.62;
  b.add(boxGeometry(x1 - x0, 0.7, zWidth), m.stone, { x: (x0 + x1) / 2, y: y - 0.35, z: zCenter });
  b.add(boxGeometry(x1 - x0, 0.08, zWidth + 0.1), m.accentFor(0xcfc9bd), { x: (x0 + x1) / 2, y: y + 0.02, z: zCenter });
  // 边缘警示带
  b.add(boxGeometry(x1 - x0, 0.1, 0.5), m.accentFor(0xe8b64c), { x: (x0 + x1) / 2, y: y + 0.06, z: zCenter + zWidth / 2 - 0.3 });
  // 站台灯柱
  for (let x = x0 + 5; x < x1; x += 11) {
    b.add(boxGeometry(0.18, 3.4, 0.18), m.metalDark, { x, y: y + 1.7, z: zCenter - zWidth / 2 + 0.6 });
    b.add(boxGeometry(1.2, 0.16, 0.5), m.metalDark, { x, y: y + 3.4, z: zCenter - zWidth / 2 + 0.9 });
    b.add(new THREE.PlaneGeometry(0.9, 0.3), m.bulb, { x, y: y + 3.3, z: zCenter - zWidth / 2 + 0.9, noOutline: true });
  }
  // 长椅
  for (const bx of [x0 + 8, (x0 + x1) / 2 + 4]) {
    b.add(boxGeometry(2.4, 0.12, 0.55), m.wood, { x: bx, y: y + 0.52, z: zCenter - zWidth / 2 + 1.1 });
    b.add(boxGeometry(2.4, 0.6, 0.1), m.wood, { x: bx, y: y + 0.85, z: zCenter - zWidth / 2 + 0.85, rx: 0.12 });
    b.add(boxGeometry(0.1, 0.5, 0.5), m.metalDark, { x: bx - 1.0, y: y + 0.25, z: zCenter - zWidth / 2 + 1.1 });
    b.add(boxGeometry(0.1, 0.5, 0.5), m.metalDark, { x: bx + 1.0, y: y + 0.25, z: zCenter - zWidth / 2 + 1.1 });
  }
  // 站牌
  b.add(cylinderGeometry(0.07, 0.09, 2.2, 6), m.metalDark, { x: x1 - 4, y: y + 1.1, z: zCenter - 1 });
  b.add(boxGeometry(1.2, 0.6, 0.08), m.accentFor(0xf2efe6), { x: x1 - 4, y: y + 2.1, z: zCenter - 1 });
  return b.build({ thickness: 0.026 });
}

/** 隧道洞口（铁轨两端） */
export function buildTunnelPortal(m, x, z, dirX, dirZ) {
  const b = new GeoBuilder('tunnel');
  const ry = Math.atan2(dirX, dirZ);
  // 两侧石壁
  b.add(boxGeometry(2.0, 9.5, 5.0), m.stoneDark, { x: -2.9, y: 3.6, z: 2.5, ry });
  b.add(boxGeometry(2.0, 9.5, 5.0), m.stoneDark, { x: 2.9, y: 3.6, z: 2.5, ry });
  // 顶部横梁
  b.add(boxGeometry(7.8, 2.6, 5.0), m.stoneDark, { x: 0, y: 8.2, z: 2.5, ry });
  // 拱顶装饰
  b.add(boxGeometry(8.4, 0.6, 0.7), m.stone, { x: 0, y: 9.3, z: 0.1, ry });
  b.add(boxGeometry(8.4, 0.5, 0.6), m.stone, { x: 0, y: 0.3, z: 0.1, ry });
  // 洞口（暗）
  b.add(new THREE.PlaneGeometry(3.9, 7.0), m.doorDark, { x: 0, y: 3.9, z: 0.06, ry, noOutline: true });
  b.add(new THREE.CircleGeometry(1.95, 14), m.doorDark, { x: 0, y: 3.9, z: 0.08, ry, noOutline: true });
  // 洞口包边
  b.add(boxGeometry(0.5, 8.4, 0.5), m.stone, { x: -2.2, y: 4.0, z: 0.2, ry });
  b.add(boxGeometry(0.5, 8.4, 0.5), m.stone, { x: 2.2, y: 4.0, z: 0.2, ry });
  return b.build({ thickness: 0.03 });
}
