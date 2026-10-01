// ================================================================
//  建筑生成器：统一风格的可参数化外观
//  重要建筑带可交互入口；普通建筑用生活细节表现"有人住"
// ================================================================
import * as THREE from 'three';
import { GeoBuf, gableRoof, hipRoof, flatRoof, shrineRoof } from './geom.js';
import { PAL, mixHex } from '../render/palette.js';
import { toon, addOutline, registerNightLight, basic, gradientMap } from '../render/toon.js';
import { woodSiding, roofTiles, windowTex, signTex, vSignTex } from '../render/textures.js';
import { makeRNG, lerp } from '../util/math.js';

const FLOOR_H = 3.05;

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967296;
}

export function mergeBuf(target, other) {
  const base = target.count;
  for (let i = 0; i < other.p.length; i++) target.p.push(other.p[i]);
  for (let i = 0; i < other.n.length; i++) target.n.push(other.n[i]);
  for (let i = 0; i < other.u.length; i++) target.u.push(other.u[i]);
  for (let i = 0; i < other.i.length; i++) target.i.push(other.i[i] + base);
}

/** 合并同属性几何（position/normal/uv + index） */
export function mergeSimple(list) {
  if (!list.length) return null;
  let vp = 0, vi = 0;
  for (const g of list) { vp += g.attributes.position.count; vi += g.index ? g.index.count : 0; }
  const pos = new Float32Array(vp * 3), nrm = new Float32Array(vp * 3), uv = new Float32Array(vp * 2);
  const index = new Uint32Array(vi);
  let o = 0, io = 0;
  for (const g of list) {
    const p = g.attributes.position, n = g.attributes.normal, u = g.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      pos[(o + i) * 3] = p.getX(i); pos[(o + i) * 3 + 1] = p.getY(i); pos[(o + i) * 3 + 2] = p.getZ(i);
      nrm[(o + i) * 3] = n.getX(i); nrm[(o + i) * 3 + 1] = n.getY(i); nrm[(o + i) * 3 + 2] = n.getZ(i);
      uv[(o + i) * 2] = u.getX(i); uv[(o + i) * 2 + 1] = u.getY(i);
    }
    const gi = g.index.array;
    for (let i = 0; i < gi.length; i++) index[io + i] = gi[i] + o;
    o += p.count; io += gi.length;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(index, 1));
  return out;
}

function defaultWall(kind, rng) {
  const opts = {
    house: [0xf0e6d2, 0xe4d5b8, 0xdcd2bd, 0xe8dcc4, 0xf2ece0, 0xd8cfba, 0xe6d9c0],
    shop: [0xf7f4ec, 0xf2ece0, 0xece4d4],
    cafe: [0xefe2cc, 0xe8d8c0],
    station: [0xe6dfcd],
    school: [0xe9e4d6],
    apartment: [0xefe9dc],
    kaikan: [0xeae2d2],
  };
  const arr = opts[kind] || opts.house;
  return arr[Math.floor(rng() * arr.length)];
}
function defaultRoof(kind, rng) {
  const opts = {
    house: [0x7a8292, 0x6e7880, 0x8a7268, 0x74808e, 0x66707e, 0x8a6e62, 0x7e7480],
    shop: [0x717a8a, 0x69718a],
    cafe: [0x8a6656, 0x946a58],
    station: [0x727a8c],
    school: [0x6e7484],
    apartment: [0x767e8c],
    kaikan: [0x7a808c],
  };
  const arr = opts[kind] || opts.house;
  return arr[Math.floor(rng() * arr.length)];
}

/* ------------------------------------------------------------------ *
 *  招牌
 * ------------------------------------------------------------------ */
const signRegistry = [];
export function getSigns() { return signRegistry; }

function buildSign(spec, kind) {
  const g = new THREE.Group();
  const s = spec.sign;
  if (!s) return null;
  const mat = new THREE.MeshToonMaterial({
    map: signTex(s), transparent: false, gradientMap: gradientMap(),
    emissiveMap: signTex(s), emissive: 0x000000, emissiveIntensity: 1,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(s.w / 100, s.h / 100), mat);
  const frameD = 0.12;
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(s.w / 100 + 0.1, s.h / 100 + 0.1, frameD),
    toon(s.accent ?? PAL.red)
  );
  frame.position.z = -0.02;
  g.add(frame, plane);
  g.userData.material = mat;
  signRegistry.push({ spec, material: mat, kind });
  return g;
}

/* ------------------------------------------------------------------ *
 *  店面内景暗示（浅进深盒体）
 * ------------------------------------------------------------------ */
function shopInterior(bufDark, bufLight, bufWall, x0, x1, y0, y1, zFront, depth, rng) {
  const zBack = zFront - depth;
  bufWall.box((x0 + x1) / 2, (y0 + y1) / 2, zBack, x1 - x0, y1 - y0, 0.14, 0.5);   // 背板
  bufWall.box((x0 + x1) / 2, y0, (zFront + zBack) / 2, x1 - x0, 0.1, depth, 0.5); // 地面
  bufWall.box((x0 + x1) / 2, y1, (zFront + zBack) / 2, x1 - x0, 0.1, depth, 0.5); // 顶
  bufWall.box(x0, (y0 + y1) / 2, (zFront + zBack) / 2, 0.12, y1 - y0, depth, 0.5);
  bufWall.box(x1, (y0 + y1) / 2, (zFront + zBack) / 2, 0.12, y1 - y0, depth, 0.5);
  // 货架
  const rows = 3;
  for (let i = 0; i < rows; i++) {
    const y = y0 + 0.35 + i * ((y1 - y0 - 0.7) / rows);
    const bw = (x1 - x0) * (0.3 + rng() * 0.2);
    const bx = lerp(x0 + 1, x1 - 1, rng());
    bufDark.box(bx, y + 0.5, zBack + 0.5, bw, 0.9, 0.3, 1);
    for (let k = 0; k < 7; k++) {
      bufLight.box(bx - bw / 2 + 0.25 + k * ((bw - 0.5) / 6), y + 0.62, zBack + 0.66, 0.2, 0.42, 0.06, 1);
    }
  }
  // 顶灯带
  bufLight.box((x0 + x1) / 2, y1 - 0.14, (zFront + zBack) / 2, (x1 - x0) * 0.8, 0.06, 0.24, 1);
}

/* ------------------------------------------------------------------ *
 *  主生成
 * ------------------------------------------------------------------ */
export function buildBuilding(spec, baseY = 0) {
  const rng = makeRNG(Math.floor(hashStr(spec.id) * 1e6) + 7);
  const { id, kind, w, d, rot, floors = 1 } = spec;
  const group = new THREE.Group();
  group.name = 'bld-' + id;

  const wallCol = spec.wall ?? defaultWall(kind, rng);
  const roofCol = spec.roofCol ?? defaultRoof(kind, rng);
  const isShop = kind === 'shop' || kind === 'cafe';

  const wallMat = toon(0xffffff, { map: woodSiding(wallCol, kind === 'house' ? 9 : 6) });
  const roofMat = toon(0xffffff, { map: roofTiles(roofCol) });
  const trimMat = toon(PAL.wallWoodDark);
  const darkMat = toon(0x55545e);
  const lightMat = toon(0xf2ead8);
  const roofTopMat = toon(0x9d9c95);
  const innerWallMat = toon(0xf2ece0);
  const doorMat = toon(spec.doorPaint ?? PAL.doorWood);

  const glassMats = [
    toon(0xffffff, { map: windowTex('day') }),
    toon(0xffffff, { map: windowTex('curtain') }),
    toon(0xffffff, { map: windowTex('day') }),
    toon(0xffffff, { map: windowTex('lit') }),
  ];
  registerNightLight(glassMats[0], { night: new THREE.Color(PAL.lampWarm), nightIntensity: 1.45, threshold: 0.3 });
  registerNightLight(glassMats[1], { night: new THREE.Color(0xffcf8e), nightIntensity: 0.95, threshold: 0.34 });
  registerNightLight(glassMats[3], { night: new THREE.Color(PAL.lampWarm), nightIntensity: 1.7, threshold: 0.2, dayIntensity: 0.25 });

  const B = {
    wall: new GeoBuf(), roof: new GeoBuf(), roofTop: new GeoBuf(), trim: new GeoBuf(),
    dark: new GeoBuf(), light: new GeoBuf(), inner: new GeoBuf(), door: new GeoBuf(),
  };
  const H = floors * FLOOR_H;
  const hw = w / 2, hd = d / 2;

  /* ---- 墙 ---- */
  B.wall.box(0, H / 2, -hd, w, H, 0.001, 0.34);          // 占位，实际见下
  B.wall.p.length = 0; B.wall.n.length = 0; B.wall.u.length = 0; B.wall.i.length = 0;
  // 后墙 / 侧墙
  B.wall.box(0, H / 2, -hd + 0.06, w, H, 0.12, 0.34);
  B.wall.box(-hw + 0.06, H / 2, 0, 0.12, H, d, 0.34);
  B.wall.box(hw - 0.06, H / 2, 0, 0.12, H, d, 0.34);
  // 基座
  B.dark.box(0, 0.16, 0, w + 0.16, 0.32, d + 0.16, 0.6);

  // 门
  const doorW = isShop ? 1.45 : 1.1;
  const doorH = 2.25;
  let doorX = -hw + doorW / 2 + (isShop ? 0.5 : 1.0);
  if (kind === 'station') doorX = -hw + 3.4;
  if (kind === 'kaikan') doorX = -hw + 2.6;
  if (kind === 'school') doorX = -hw + 4.5;
  const doorY = 0.32;

  // 店铺开间
  let storefront = null;
  if (isShop) {
    const openX0 = -hw + 0.4, openX1 = hw - 0.4, sillH = 0.55, openTop = FLOOR_H - 0.45;
    B.wall.box((openX0 - hw) / 2, sillH / 2, hd - 0.06, openX0 + hw, sillH, 0.12, 0.34);
    B.wall.box(0, (openTop + FLOOR_H) / 2, hd - 0.06, w, FLOOR_H - openTop, 0.12, 0.34);
    B.wall.box((openX0 + hw) / 2, (sillH + openTop) / 2, hd - 0.06, openX0 + hw, openTop - sillH, 0.12, 0.34);
    B.wall.box((openX1 + hw) / 2, (sillH + openTop) / 2, hd - 0.06, hw - openX1, openTop - sillH, 0.12, 0.34);
    // 店面内景
    shopInterior(B.dark, B.light, B.inner, openX0 + 0.1, openX1 - 0.1, 0.3, openTop, hd - 0.1, 2.1, rng);
    // 玻璃
    const gw = new THREE.PlaneGeometry(openX1 - openX0 - 0.1, openTop - sillH - 0.1);
    gw.translate((openX0 + openX1) / 2, (sillH + openTop) / 2, hd + 0.02);
    const gm = new THREE.Mesh(gw, toon(0xdfeaf0, { transparent: true, opacity: 0.42, depthWrite: false }));
    gm.renderOrder = 2;
    group.add(gm);
    group.userData.storeGlass = gm;
    storefront = { openX0, openX1, sillH, openTop };
  } else {
    B.wall.box(0, H / 2, hd - 0.06, w, H, 0.12, 0.34);
  }
  // 二层以上
  if (floors > 1) B.wall.box(0, (FLOOR_H + H) / 2, hd - 0.06, w, H - FLOOR_H, 0.12, 0.34);

  // 门框 + 门扇 + 门槛
  B.dark.box(doorX, doorY + doorH / 2, hd + 0.02, doorW + 0.26, doorH + 0.18, 0.1, 1);
  B.door.box(doorX, doorY + doorH / 2, hd + 0.09, doorW, doorH, 0.09, 1);
  B.light.box(doorX + doorW / 2 + 0.42, doorY + doorH * 0.78, hd + 0.05, 0.3, 0.14, 0.05, 1);
  B.dark.box(doorX, 0.1, hd + 0.72, doorW + 0.7, 0.2, 0.8, 0.8);   // 入口踏步
  if (!isShop) {
    // 玄关雨棚
    B.trim.box(doorX, doorY + doorH + 0.35, hd + 0.5, doorW + 1.0, 0.1, 1.0, 0.8);
    B.trim.box(doorX - (doorW + 1.0) / 2 + 0.06, doorY + doorH + 0.1, hd + 0.95, 0.12, 0.5, 0.12, 1);
    B.trim.box(doorX + (doorW + 1.0) / 2 - 0.06, doorY + doorH + 0.1, hd + 0.95, 0.12, 0.5, 0.12, 1);
  }

  /* ---- 窗 ---- */
  const windows = [];
  const winBuf = [[], [], [], []];
  const addWin = (cx, cy, cz, ww, wh, facing) => {
    const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]][facing];
    const tan = [dir[1], -dir[0]];
    // 窗洞内暗底
    const put = (ox, oy, sw, sh, target) => {
      const px = cx + tan[0] * ox, pz = cz + tan[1] * ox;
      const w2 = facing < 2 ? sw : 0.16;
      const d2 = facing < 2 ? 0.16 : sw;
      target.box(px, cy + oy, pz, w2, sh, d2, 1);
    };
    // 上/下/左/右框
    put(0, wh / 2 + 0.07, ww + 0.28, 0.14, B.trim);
    put(0, -wh / 2 - 0.07, ww + 0.28, 0.14, B.trim);
    put(-ww / 2 - 0.07, 0, 0.14, wh, B.trim);
    put(ww / 2 + 0.07, 0, 0.14, wh, B.trim);
    B.dark.box(cx + dir[0] * 0.02, cy, cz + dir[1] * 0.02, facing < 2 ? 0.06 : ww, wh, facing < 2 ? ww : 0.06, 1);
    const g = new THREE.PlaneGeometry(ww, wh);
    if (facing === 2) g.rotateY(Math.PI / 2);
    if (facing === 3) g.rotateY(-Math.PI / 2);
    if (facing === 1) g.rotateY(Math.PI);
    g.translate(cx + dir[0] * 0.06, cy, cz + dir[1] * 0.06);
    winBuf[facing].push(g);
    windows.push({ x: cx + dir[0] * 0.06, y: cy, z: cz + dir[1] * 0.06, w: ww, h: wh, facing });
  };

  for (let f = 0; f < floors; f++) {
    if (isShop && f === 0) continue;
    const y0 = f * FLOOR_H + 1.85;
    const m = 0.95;
    const nF = Math.max(1, Math.round((w - m * 2) / 2.7));
    for (let i = 0; i < nF; i++) {
      const x = lerp(-hw + m, hw - m, nF === 1 ? 0.5 : i / (nF - 1));
      if (f === 0 && Math.abs(x - doorX) < doorW / 2 + 0.75) continue;
      addWin(x, y0, hd, 1.2, 1.3, 0);
    }
    for (let i = 0; i < nF; i++) {
      const x = lerp(-hw + m, hw - m, nF === 1 ? 0.5 : i / (nF - 1));
      addWin(x, y0, -hd, 1.1, 1.2, 1);
    }
    const nS = Math.max(1, Math.round((d - m * 2) / 2.8));
    for (let i = 0; i < nS; i++) {
      const z = lerp(-hd + m, hd - m, nS === 1 ? 0.5 : i / (nS - 1));
      addWin(-hw, y0, z, 1.05, 1.2, 2);
      addWin(hw, y0, z, 1.05, 1.2, 3);
    }
  }
  // 店铺 2F 也开窗
  if (isShop && floors > 1) {
    const y0 = FLOOR_H + 1.75;
    const m = 0.9;
    const nF = Math.max(1, Math.round((w - m * 2) / 2.6));
    for (let i = 0; i < nF; i++) {
      const x = lerp(-hw + m, hw - m, nF === 1 ? 0.5 : i / (nF - 1));
      addWin(x, y0, hd, 1.5, 1.1, 0);
      addWin(x, y0, -hd, 1.2, 1.1, 1);
    }
  }

  /* ---- 屋顶 ---- */
  let roofH = 0;
  const rY = H;
  const roofType = spec.roof ?? (kind === 'apartment' ? 'flat' : 'gable');
  if (roofType === 'gable') {
    roofH = Math.min(d * 0.5, 3.1);
    gableRoof(B.roof, w, d, roofH, 0.5, rY, 0.5);
    B.trim.box(0, rY + roofH + 0.07, 0, w + 1.05, 0.16, 0.36, 0.8);
  } else if (roofType === 'hip') {
    roofH = Math.min(d * 0.46, 2.8);
    hipRoof(B.roof, w, d, roofH, 0.5, rY, 0.5);
    B.trim.box(0, rY + roofH + 0.06, 0, 0.4, 0.14, 0.4, 0.8);
  } else if (roofType === 'flat') {
    roofH = 0.6;
    flatRoof(B.roof, w, d, rY, 0.42, 0.62);
    B.roofTop.box(0, rY + 0.16, 0, w - 0.7, 0.14, d - 0.7, 0.5);
  } else if (roofType === 'shrine') {
    roofH = 3.2;
    shrineRoof(B.roof, w, d, roofH, 1.15, rY, 0.5);
  }
  B.trim.box(0, rY - 0.17, hd + 0.48, w + 1.05, 0.2, 0.14, 0.8);
  B.trim.box(0, rY - 0.17, -hd - 0.48, w + 1.05, 0.2, 0.14, 0.8);

  /* ---- 排水管 / 阳台 / 生活细节 ---- */
  const pipeX = rng() < 0.5 ? -hw + 0.2 : hw - 0.2;
  B.dark.box(pipeX, rY / 2, hd + 0.06, 0.1, rY, 0.1, 1);

  if (floors >= 2 && (kind === 'apartment' || kind === 'house' || kind === 'school')) {
    const by = FLOOR_H + 0.2;
    B.trim.box(0, by, hd + 0.55, w - 0.7, 0.14, 1.1, 0.8);
    for (let i = 0; i < 2; i++) B.trim.box(0, by + 0.22 + i * 0.32, hd + 1.05, w - 0.7, 0.07, 0.07, 1);
    const nPost = Math.max(4, Math.round(w / 1.15));
    for (let i = 0; i <= nPost; i++) {
      B.trim.box(lerp(-(w - 0.7) / 2, (w - 0.7) / 2, i / nPost), by + 0.42, hd + 1.05, 0.06, 0.84, 0.06, 1);
    }
  }

  if (kind === 'house' || kind === 'apartment') {
    if (rng() < 0.9) {
      const ax = lerp(-hw + 1.1, hw - 1.1, rng());
      const ay = 1.05 + (floors > 1 ? FLOOR_H : 0);
      B.light.box(ax, ay, hd + 0.42, 0.76, 0.54, 0.32, 1);
      B.dark.box(ax, ay, hd + 0.6, 0.58, 0.4, 0.04, 1);
    }
    if (rng() < 0.6) {
      const tx = rng() < 0.5 ? -hw + 0.7 : hw - 0.7;
      B.dark.box(tx, rY + roofH + 0.55, 0, 0.05, 1.5, 0.05, 1);
      for (let i = 0; i < 4; i++) B.dark.box(tx, rY + roofH + 0.95 + i * 0.2, 0, 0.95 - i * 0.17, 0.04, 0.04, 1);
    }
  }
  if (kind === 'school') {
    B.light.box(w / 2 - 2.4, rY + 2.9, 1.35, 1.7, 1.7, 0.14, 1);
    B.dark.box(w / 2 - 2.4, rY + 2.9, 1.45, 1.35, 1.35, 0.1, 1);
    B.dark.box(w / 2 - 2.4, rY + 5.5, 0, 3.0, 0.5, 3.0, 0.4);
  }

  /* ---- 雨棚 / 灯笼 ---- */
  if (spec.awning || isShop) {
    const aw = w - 0.6;
    const awnB = new GeoBuf();
    const ac = spec.awning ? (rng() < 0.5 ? 0xd4656f : 0x4a7f8a) : 0xc45a5a;
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const z0 = hd + 0.1 + t0 * 1.15, z1 = hd + 0.1 + t1 * 1.15;
      const y0 = FLOOR_H - 0.5 - t0 * 0.42, y1 = FLOOR_H - 0.5 - t1 * 0.42;
      awnB.addQuad(-aw / 2, y0, z0, aw / 2, y0, z0, aw / 2, y1, z1, -aw / 2, y1, z1, aw * 0.5, 0.4);
    }
    awnB.box(0, FLOOR_H - 0.5, hd + 1.25, aw, 0.16, 0.12, 1);
    const awning = new THREE.Mesh(awnB.toGeometry(), toon(ac));
    group.add(awning);
    addOutline(awning, 0.01);
  }
  if (spec.lantern) {
    for (const s of [-1, 1]) {
      const lg = new THREE.Group();
      const lant = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.5, 10), toon(0xf2e0c0));
      lant.position.set(s * (hw - 0.9), FLOOR_H - 0.75, hd + 0.75);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.26, 0.12, 10), toon(0x8a3f38));
      cap.position.set(s * (hw - 0.9), FLOOR_H - 0.45, hd + 0.75);
      lg.add(lant, cap);
      addOutline(lant, 0.012);
      group.add(lg);
    }
  }

  /* ---- 组装 ---- */
  const mk = (buf, mat) => {
    if (buf.isEmpty()) return null;
    const m = new THREE.Mesh(buf.toGeometry(), mat);
    group.add(m);
    return m;
  };
  mk(B.wall, wallMat);
  mk(B.roof, roofMat);
  mk(B.roofTop, roofTopMat);
  mk(B.trim, trimMat);
  mk(B.dark, darkMat);
  mk(B.light, lightMat);
  mk(B.inner, innerWallMat);
  mk(B.door, doorMat);
  for (let i = 0; i < 4; i++) {
    if (!winBuf[i].length) continue;
    const g = mergeSimple(winBuf[i]);
    if (g) group.add(new THREE.Mesh(g, glassMats[i % glassMats.length]));
  }

  // 招牌
  const sign = buildSign(spec, kind);
  if (sign) {
    if (isShop && storefront) {
      const sw = (spec.sign.w / 100);
      sign.position.set(0, storefront.openTop + 0.62, hd + 0.24);
      sign.scale.set(Math.min(1, (w - 0.6) / sw), 1, 1);
    } else {
      sign.position.set(-hw + 2.0, FLOOR_H - 0.1, hd + 0.2);
      sign.scale.setScalar(0.7);
    }
    group.add(sign);
    addOutline(sign.children[0], 0.008);
  }
  // 竖式灯箱招牌
  if (isShop && rng() < 0.75) {
    const vt = spec.sign ? (spec.sign.text.length > 2 ? spec.sign.text : '営業中') : '営業中';
    const tex = vSignTex(vt, kind === 'cafe' ? 0x6b4a3a : 0xb0453f);
    const vm = new THREE.MeshToonMaterial({ map: tex, emissiveMap: tex, emissive: 0x000000, gradientMap: gradientMap() });
    const hgt = tex.image.height / 100 * 0.55;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.55, hgt), vm);
    const boxM = new THREE.Mesh(new THREE.BoxGeometry(0.6, hgt + 0.08, 0.14), toon(0x2f2a2a));
    const holder = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.9), toon(0x2f2a2a));
    const g2 = new THREE.Group();
    g2.add(boxM, plane, holder);
    g2.position.set(hw - 0.35, FLOOR_H - 0.35, hd + 0.72);
    group.add(g2);
    signRegistry.push({ spec, material: vm, kind: 'v' + id });
  }

  // 轮廓
  for (const child of [...group.children]) {
    if (child.isMesh && child.userData.material === undefined) addOutline(child, 0.01);
  }

  group.position.set(spec.x, baseY, spec.z);
  group.rotation.y = rot;

  const doorWorld = localToWorld(spec, doorX, hd + 1.5);
  const bounds = { x: spec.x, z: spec.z, hw: hw + 0.6, hd: hd + 0.6, rot, id, floors };
  return { group, door: { x: doorWorld.x, z: doorWorld.z, y: baseY, facing: rot }, bounds, windows, spec, storefront };
}

export function localToWorld(spec, lx, lz) {
  const c = Math.cos(spec.rot), s = Math.sin(spec.rot);
  return { x: spec.x + lx * c + lz * s, z: spec.z - lx * s + lz * c };
}

export { FLOOR_H };
