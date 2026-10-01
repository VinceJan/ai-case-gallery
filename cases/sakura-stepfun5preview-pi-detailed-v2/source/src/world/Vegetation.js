// 植被：樱花树、松树、山坡林、草丛、芦苇、竹林
import * as THREE from 'three';
import { addCyl, addSphere, addBox, rand, pick, chance, TAU, clamp } from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import { heightAt, riverX, slopeAt } from './Terrain.js';

const M = () => getMaterials();

/** 一棵樱花树（可复用于公园/神社/庭院） */
export function sakuraTree(group, x, z, scale = 1, opts = {}) {
  const y = opts.y !== undefined ? opts.y : heightAt(x, z);
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.scale.setScalar(scale);
  const h = rand(3.2, 4.6);
  // 树干（微弯）
  const trunk = addCyl(g, M().trunk, 0.16, 0.3, h, 0, h / 2, 0, { seg: 7 });
  trunk.rotation.z = rand(-0.06, 0.06);
  // 枝
  const bn = 3;
  for (let i = 0; i < bn; i++) {
    const a = (i / bn) * TAU + rand(0.5);
    const bl = rand(1.0, 1.8);
    const b = addCyl(g, M().trunk, 0.05, 0.1, bl, Math.cos(a) * bl * 0.4, h * 0.72, Math.sin(a) * bl * 0.4, { seg: 5 });
    b.rotation.set(Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7);
  }
  // 花团
  const cn = 4 + Math.floor(rand(0, 3));
  const pinks = [M().sakura, M().sakuraPale, M().sakuraDeep];
  for (let i = 0; i < cn; i++) {
    const a = rand(TAU), rr = rand(0.3, 1.5);
    const cm = pick(pinks);
    addSphere(g, cm, rand(0.9, 1.5), Math.cos(a) * rr, h * 0.8 + rand(-0.4, 1.0), Math.sin(a) * rr, {
      seg: 7, sx: rand(1.0, 1.35), sy: rand(0.72, 0.95), sz: rand(1.0, 1.35),
    });
  }
  group.add(g);
  return g;
}

/** 松树（神社/山脚） */
export function pineTree(group, x, z, scale = 1) {
  const y = heightAt(x, z);
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.scale.setScalar(scale);
  const h = rand(4.5, 7);
  addCyl(g, M().trunk, 0.16, 0.28, h, 0, h / 2, 0, { seg: 7 });
  for (let i = 0; i < 3; i++) {
    const r = 2.2 - i * 0.55;
    addSphere(g, i % 2 ? M().leafDark : M().leafGreen, r * 0.55, 0, h * 0.62 + i * 0.85, 0, { seg: 7, sy: 0.5 });
  }
  group.add(g);
  return g;
}

/** 杜鹃花球（绿篱） */
export function bush(group, x, z, r = 0.5) {
  const y = heightAt(x, z);
  addSphere(group, chance() ? M().leafGreen : M().sakuraDeep, r, x, y + r * 0.85, z, { seg: 7, sx: 1.2, sy: 0.9 });
}

/* ---------------- 整体植被 ---------------- */

export function buildVegetation(scene) {
  const g = new THREE.Group();

  // —— 镇内樱花树（街道 / 公园 / 神社 / 庭院） ——
  const townTrees = [
    // 主街
    [-5.5, -8, 1.0], [-5.5, 4, 1.05], [-5.5, 20, 0.95], [-5.5, 36, 1.0], [-5.5, 52, 1.05],
    [5.5, -6, 0.95], [5.5, 12, 1.0], [5.5, 28, 1.05], [5.5, 44, 0.95], [5.5, 58, 1.0],
    // 商店街
    [-24, 4.5, 0.9], [-8, 4.5, 0.85], [8, 4.5, 0.85], [26, 4.5, 0.9], [44, 4.5, 0.95], [-44, 4.5, 0.9],
    // 站前广场
    [-11, -20, 0.9], [11, -20, 0.9], [-16, -31, 0.85], [16, -31, 0.85],
    // 公园
    [-10, 30, 1.0], [-18, 34, 1.1], [-30, 36, 1.0], [-12, 48, 1.05], [-26, 50, 1.1], [-34, 46, 0.95], [-8, 52, 1.0],
    // 神社
    [50, 60, 0.95], [46, 66, 1.0], [72, 62, 1.05], [76, 70, 1.0], [70, 78, 1.05], [54, 76, 1.0], [62, 82, 1.1],
    // 铃木家庭院 & 住宅区
    [32, 54, 0.85], [44, 54, 0.8], [60, 12, 0.9], [72, 12, 0.9], [60, 38, 0.85], [72, 38, 0.9], [90, 26, 0.95],
    // 学校/公民馆
    [-44, 30, 0.9], [-44, 46, 0.95], [-38, 56, 0.9],
    // 河北侧
    [50, -52, 0.9], [-52, -50, 0.85],
    // 河边
    [-84, 0, 1.0], [-84, 70, 1.05], [-86, 100, 1.0],
  ];
  for (const [x, z, s] of townTrees) sakuraTree(g, x, z, s);

  // 松树（神社与山脚）
  for (const [x, z, s] of [[58, 56, 1], [68, 58, 0.9], [56, 84, 1.1], [74, 84, 1], [-30, -30, 0.9], [-40, -20, 1]]) {
    pineTree(g, x, z, s);
  }

  // 绿篱
  for (let x = -70; x <= -46; x += 2.2) bush(g, x, 21.2, rand(0.5, 0.7));
  for (let x = 58; x <= 74; x += 2.4) bush(g, x, 23.2, rand(0.45, 0.6));
  for (let x = 30; x <= 46; x += 2.2) bush(g, x, 67.2, rand(0.45, 0.65));

  // —— 山坡树林（实例化） ——
  const trunkGeo = new THREE.CylinderGeometry(0.22, 0.42, 5.5, 6);
  trunkGeo.translate(0, 2.75, 0);
  const canopyGeo = new THREE.IcosahedronGeometry(2.7, 0);
  const TREES = 620;
  const trunks = new THREE.InstancedMesh(trunkGeo, M().trunk, TREES);
  const canopies = new THREE.InstancedMesh(canopyGeo, M().leafDark, TREES);
  canopies.castShadow = false; trunks.castShadow = false;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pv = new THREE.Vector3();
  const colCanopy = new THREE.Color();
  let placed = 0, guard = 0;
  while (placed < TREES && guard++ < TREES * 30) {
    const a = rand(TAU), r = rand(98, 320);
    const x = Math.cos(a) * r, z = 25 + Math.sin(a) * r;
    const h = heightAt(x, z);
    if (h < 1.2 || h > 52) continue;
    if (slopeAt(x, z) > 0.8) continue;
    const s = rand(0.7, 1.6) * (h > 25 ? 0.8 : 1);
    pv.set(x, h - 0.2, z);
    q.setFromEuler(new THREE.Euler(rand(-0.05, 0.05), rand(TAU), rand(-0.05, 0.05)));
    sc.set(s, s * rand(0.85, 1.2), s);
    m4.compose(pv, q, sc);
    trunks.setMatrixAt(placed, m4);
    // 树冠颜色：低山混樱粉，高山深绿
    const pink = chance(0.28) && h < 20;
    colCanopy.set(pink ? '#e8a8bc' : (chance(0.5) ? '#4a6b3f' : '#5e8a4a'));
    canopies.setColorAt(placed, colCanopy);
    canopies.setMatrixAt(placed, m4);
    placed++;
  }
  trunks.count = placed; canopies.count = placed;
  trunks.instanceMatrix.needsUpdate = true;
  canopies.instanceMatrix.needsUpdate = true;
  if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;
  g.add(trunks, canopies);

  // —— 草丛（实例化锥体） ——
  const grassGeo = new THREE.ConeGeometry(0.16, 0.55, 4);
  grassGeo.translate(0, 0.27, 0);
  const GRASS = 900;
  const grasses = new THREE.InstancedMesh(grassGeo, M().grassDry, GRASS);
  let gi = 0; guard = 0;
  while (gi < GRASS && guard++ < GRASS * 40) {
    let x, z;
    const mode = Math.random();
    if (mode < 0.45) { x = rand(-100, 90); z = rand(-60, 110); }           // 全城
    else { const zz = rand(-150, 190); x = riverX(zz) + rand(-11, 11); z = zz; } // 河边
    const h = heightAt(x, z);
    if (h > 0.6 || h < -0.5) continue;
    if (slopeAt(x, z) > 0.4) continue;
    pv.set(x, h, z);
    q.setFromEuler(new THREE.Euler(rand(-0.15, 0.15), rand(TAU), rand(-0.15, 0.15)));
    const s = rand(0.6, 1.5);
    sc.set(s, s * rand(0.8, 1.6), s);
    m4.compose(pv, q, sc);
    grasses.setMatrixAt(gi, m4);
    gi++;
  }
  grasses.count = gi;
  grasses.instanceMatrix.needsUpdate = true;
  g.add(grasses);

  // —— 芦苇（水线边） ——
  const reedGeo = new THREE.CylinderGeometry(0.03, 0.06, 1.5, 4);
  reedGeo.translate(0, 0.75, 0);
  const REEDS = 260;
  const reeds = new THREE.InstancedMesh(reedGeo, M().grassDry, REEDS);
  for (let i = 0; i < REEDS; i++) {
    const z = rand(-140, 180);
    const side = chance() ? -1 : 1;
    const x = riverX(z) + side * rand(6.4, 9.2);
    pv.set(x, heightAt(x, z) - 0.1, z);
    q.setFromEuler(new THREE.Euler(rand(-0.1, 0.1), rand(TAU), rand(-0.1, 0.1)));
    sc.set(1, rand(0.7, 1.5), 1);
    m4.compose(pv, q, sc);
    reeds.setMatrixAt(i, m4);
  }
  reeds.instanceMatrix.needsUpdate = true;
  g.add(reeds);

  // —— 竹林（河边） ——
  const bamboo = new THREE.Group();
  for (let i = 0; i < 14; i++) {
    const z = rand(-6, 26);
    const x = riverX(z) - rand(11, 16);
    const bh = rand(4, 6.5);
    const b = addCyl(bamboo, M().bamboo, 0.05, 0.07, bh, x, heightAt(x, z) + bh / 2 - 0.3, z, { seg: 5 });
    b.rotation.z = rand(-0.08, 0.08);
    for (let k = 1; k < 5; k++) {
      const leaf = addSphere(bamboo, M().leafGreen, 0.3, x + rand(-0.3, 0.3), heightAt(x, z) - 0.3 + (bh * k) / 5, z + rand(-0.3, 0.3), { seg: 5, sy: 0.25 });
      leaf.rotation.y = rand(TAU);
    }
  }
  g.add(bamboo);

  // —— 河边石头 ——
  for (let i = 0; i < 46; i++) {
    const z = rand(-150, 190);
    const side = chance() ? -1 : 1;
    const x = riverX(z) + side * rand(6, 13);
    const r = rand(0.3, 1.1);
    addSphere(g, M().rock, r, x, heightAt(x, z) + r * 0.3, z, { seg: 5, flat: true, sx: rand(1, 1.6), sy: rand(0.5, 0.9), sz: rand(1, 1.6) });
  }

  scene.add(g);
  return { group: g };
}
