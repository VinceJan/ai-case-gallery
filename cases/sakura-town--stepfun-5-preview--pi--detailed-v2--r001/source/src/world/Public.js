// 公共设施：樱花小学校 + 樱花公民馆（外观）
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, rand, TAU, chance, pick, Tex,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import {
  wallX, wallZ, window_, shopWindow, doorway, roof, sign, noren, bench,
  trashBin, aircon, planter, bicycle, car, utilityPole, stoneLantern, torii, postBox, posterBoard,
} from './Buildings.js';
import { heightAt } from './Terrain.js';

const M = () => getMaterials();

/* ==================== 小学 ==================== */

function school(ctx) {
  const g = new THREE.Group();
  const X0 = -72, X1 = -40, Z0 = 44, Z1 = 62;
  const W = X1 - X0, D = Z1 - Z0, H = 7.2;   // 两层
  const cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2;

  addPlane(g, M().concrete, W + 1.2, D + 1.2, cx, 0.1, cz, { uv: 0.3 });
  // 墙体
  wallX(g, ctx.colliders, M().plasterWarm, cx, Z0, W, H, 0.35, 0.2, { at: 0.5, w: 3.0, h: 2.4 });
  wallX(g, ctx.colliders, M().plasterWarm, cx, Z1, W, H, 0.35, 0.2);
  wallZ(g, ctx.colliders, M().plasterWarm, X0, cz, D, H, 0.35, 0.2);
  wallZ(g, ctx.colliders, M().plasterWarm, X1, cz, D, H, 0.35, 0.2);
  // 两层窗
  for (let i = 0; i < 5; i++) {
    const wx = X0 + 3 + i * ((W - 6) / 4);
    window_(g, ctx.lights, wx, 2.6, Z0 - 0.05, 0, 2.4, 1.3, { lit: true });
    window_(g, ctx.lights, wx, 5.2, Z0 - 0.05, 0, 2.4, 1.3, { lit: true });
  }
  for (const [px, pz, ry] of [[X0 - 0.05, Z0 + 5, -Math.PI / 2], [X1 + 0.05, Z1 - 5, Math.PI / 2]]) {
    window_(g, ctx.lights, px, 2.6, pz, ry, 2.2, 1.3);
    window_(g, ctx.lights, px, 5.2, pz, ry, 2.2, 1.3);
  }
  // 屋顶 + 屋顶水箱
  roof(g, cx, cz, W, D, 1.4, H + 0.3, M().tileRoof, { overhang: 0.9 });
  addBox(g, M().concrete, 2.0, 1.0, 2.0, cx + 8, H + 1.6, cz);
  // 校名招牌 + 入口
  sign(g, '桜小学校', cx, H - 1.2, Z0 + 0.5, Math.PI, { w: 5.0, h: 0.8, bg: '#f7f3ea', fg: '#2b3a67', accent: '#d9a441' });
  doorway(g, ctx.colliders, ctx.interactables, cx, Z0, Math.PI, 3.0, 2.4, { label: '学校正门', glassDoor: true, mat: M().steelDark });
  aircon(g, X0 + 0.5, 6.6, Z0 + 0.4, 0);
  // 夜间走廊灯
  for (let i = 0; i < 3; i++) {
    const bulb = addSphere(g, M().lampGlow, 0.12, cx - 6 + i * 6, 3.4, Z0 - 0.3, { seg: 6 });
    ctx.lights.push({ mesh: bulb, from: 17.0, to: 21.0 });
  }

  // 围墙 + 大门
  for (let x = X0 - 4; x < cx - 3; x += 2.6) {
    addBox(g, M().concrete, 2.4, 1.5, 0.24, x + 1.2, 0.75, Z0 - 3.4);
    ctx.colliders.push({ minX: x, maxX: x + 2.4, minZ: Z0 - 3.5, maxZ: Z0 - 3.3 });
  }
  for (let x = cx + 3; x < X1 + 4; x += 2.6) {
    addBox(g, M().concrete, 2.4, 1.5, 0.24, x + 1.2, 0.75, Z0 - 3.4);
    ctx.colliders.push({ minX: x, maxX: x + 2.4, minZ: Z0 - 3.5, maxZ: Z0 - 3.3 });
  }
  // 门柱 + 校门牌
  addBox(g, M().concrete, 0.7, 2.2, 0.7, cx - 3.4, 1.1, Z0 - 3.4);
  addBox(g, M().concrete, 0.7, 2.2, 0.7, cx + 3.4, 1.1, Z0 - 3.4);
  addBox(g, M().woodDark, 7.6, 0.3, 0.4, cx, 2.3, Z0 - 3.4);
  sign(g, '桜小学校', cx, 2.3, Z0 - 3.1, Math.PI, { w: 3.0, h: 0.5, bg: '#f7f3ea', fg: '#2b3a67' });

  // 操场（沙地 + 游乐设施）
  const py = Z0 - 8;
  addPlane(g, M().dirt, W - 4, 8, cx, 0.06, py, { uv: 0.3 });
  // 旗杆
  addCyl(g, M().steelDark, 0.06, 0.08, 9, cx + 9, 4.5, py - 2.5, { seg: 6 });
  const flag = addBox(g, M().white, 1.1, 0.7, 0.03, cx + 9.55, 8.2, py - 2.5);
  flag.userData.flag = true;
  // 秋千
  {
    const sx = cx - 8, sz = py + 1;
    for (const dx of [-1.2, 1.2]) addCyl(g, M().steelDark, 0.06, 0.06, 2.4, sx + dx, 1.2, sz, { seg: 5 });
    addBox(g, M().steelDark, 2.8, 0.1, 0.1, sx, 2.4, sz);
    for (const dx of [-0.7, 0.7]) {
      addBox(g, M().steelDark, 0.03, 1.3, 0.03, sx + dx, 1.7, sz);
      addBox(g, M().woodRed, 0.5, 0.05, 0.24, sx + dx, 1.05, sz);
    }
    ctx.interactables.push({
      pos: new THREE.Vector3(sx, 0.8, sz + 1.2), radius: 2.0, label: () => '荡秋千', prompt: () => '荡秋千',
      enabled: () => true,
      onUse: () => { ctx.audio.blip(); ctx.ui.toast('晃了一会儿。风很舒服。'); },
    });
  }
  // 滑梯
  {
    const sx = cx + 3, sz = py + 1;
    addBox(g, M().steelDark, 1.0, 1.2, 1.0, sx, 0.6, sz);
    addBox(g, M().sakura, 1.1, 0.08, 1.1, sx, 1.25, sz);
    const slide = addBox(g, M().sakuraDeep, 0.7, 0.05, 2.2, sx, 1.1, sz + 1.3, { rx: -0.5 });
    ctx.interactables.push({
      pos: new THREE.Vector3(sx, 0.8, sz + 1.6), radius: 2.0, label: () => '玩滑梯', prompt: () => '玩滑梯',
      enabled: () => true,
      onUse: () => { ctx.audio.blip(); ctx.ui.toast('呲溜——！有点幼稚，但不错。'); },
    });
  }
  // 自行车停放
  for (let i = 0; i < 4; i++) bicycle(g, X1 + 2.4, Z0 - 6 + i * 1.4, Math.PI / 2, pick(['#5d8fe8', '#d97a95', '#6fb56f', '#f2b53c']));

  ctx.scene.add(g);
  return { group: g, footprint: { minX: X0 - 4, maxX: X1 + 4, minZ: Z0 - 3.6, maxZ: Z1 } };
}

/* ==================== 公民馆 ==================== */

function community(ctx) {
  const g = new THREE.Group();
  const X0 = -70, X1 = -46, Z0 = 22, Z1 = 38;
  const W = X1 - X0, D = Z1 - Z0, H = 3.6;
  const cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2;

  addPlane(g, M().concrete, W + 1, D + 1, cx, 0.1, cz, { uv: 0.35 });
  wallX(g, ctx.colliders, M().plaster, cx, Z0, W, H, 0.3, 0.2, { at: 0.5, w: 2.4, h: 2.2 });
  wallX(g, ctx.colliders, M().plaster, cx, Z1, W, H, 0.3, 0.2);
  wallZ(g, ctx.colliders, M().plaster, X0, cz, D, H, 0.3, 0.2);
  wallZ(g, ctx.colliders, M().plaster, X1, cz, D, H, 0.3, 0.2);
  shopWindow(g, ctx.lights, cx - 5, 1.7, Z0 - 0.05, 0, 5, 1.4);
  window_(g, ctx.lights, cx + 6, 1.7, Z0 - 0.05, 0, 3, 1.3);
  roof(g, cx, cz, W, D, 1.3, H + 0.3, M().tileRoof, { overhang: 0.85 });
  sign(g, '桜花公民館', cx, H + 0.75, Z0 + 0.6, Math.PI, { w: 4.0, h: 0.66, bg: '#2b3a67', fg: '#f7f3ea' });
  doorway(g, ctx.colliders, ctx.interactables, cx + 1.2, Z0, Math.PI, 2.4, 2.2, { label: '公民馆大门', glassDoor: true, mat: M().steelDark });
  // 横幅
  const bannerMat = new THREE.MeshToonMaterial({ color: '#d97a95' });
  bannerMat.gradientMap = M().paper.gradientMap;
  addBox(g, bannerMat, 3.2, 0.7, 0.04, cx - 6, 2.6, Z0 - 0.3);
  // 委托公告板（重要交互）
  {
    const bx = cx + 6, bz = Z0 + 1.6;
    for (const dx of [-1.1, 1.1]) addCyl(g, M().woodDark, 0.08, 0.08, 1.5, bx + dx, 0.75, bz, { seg: 5 });
    addBox(g, M().woodDark, 3.2, 1.6, 0.08, bx, 1.55, bz);
    const boardMat = new THREE.MeshToonMaterial({ map: Tex.poster('町内掲示板', ['・桜まつり 準備協力者募集', '・迷子の猫を探しています', '・届け出は駅の窓口へ'], { w: 512, h: 300 }) });
    boardMat.gradientMap = M().paper.gradientMap;
    const board = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.35), boardMat);
    board.position.set(bx, 1.6, bz + 0.06);
    g.add(board);
    ctx.interactables.push({
      pos: new THREE.Vector3(bx, 1, bz + 1.2), radius: 2.2, label: () => '查看公告板', prompt: () => '查看公告板',
      enabled: () => true,
      onUse: () => ctx.game.quests.openBoard(),
    });
  }
  bench(g, cx - 4, Z0 + 1.4, Math.PI);
  ctx.interactables.push({
    pos: new THREE.Vector3(cx - 4, 0.5, Z0 + 1.4), radius: 1.8, label: () => '坐下', prompt: () => '坐下',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(cx - 4, 0, Z0 + 1.0), 0),
  });
  planter(g, X0 + 0.8, Z0 + 0.9);
  planter(g, X1 - 0.8, Z0 + 0.9);
  // 夜间灯
  const bulb = addSphere(g, M().lampGlow, 0.14, cx + 1.2, 2.5, Z0 + 0.2, { seg: 6 });
  ctx.lights.push({ mesh: bulb, from: 17.2, to: 22.0 });

  ctx.scene.add(g);
  return { group: g, footprint: { minX: X0, maxX: X1, minZ: Z0, maxZ: Z1 } };
}

/* ==================== 组装 ==================== */

export function buildPublic(ctx) {
  return {
    school: school(ctx),
    community: community(ctx),
  };
}
