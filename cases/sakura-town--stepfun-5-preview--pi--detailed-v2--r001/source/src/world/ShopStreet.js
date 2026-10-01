// 商店街：便利店（可进入）、咖啡店（可进入）、文具店、面包房、邮局、小料理、书店 + 拱廊
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, canvasTexture, rand, TAU, pick, Tex,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import {
  wallX, wallZ, window_, shopWindow, doorway, roof, sign, noren, posterBoard,
  bench, vendingMachine, trashBin, aircon, planter, bicycle, utilityPole, postBox, laundry,
} from './Buildings.js';

const M = () => getMaterials();

/** 灯光光晕精灵（夜间可见） */
function glowSprite(ctx, x, y, z, size, opacity = 0.5) {
  const mat = new THREE.SpriteMaterial({
    map: Tex.glow('#ffd9a0'), transparent: true, opacity: 0, depthWrite: false,
    blending: THREE.AdditiveBlending, fog: false,
  });
  const sp = new THREE.Sprite(mat);
  sp.position.set(x, y, z);
  sp.scale.set(size, size, 1);
  ctx.scene.add(sp);
  return sp;
}

/** 商品货架（实例化小商品） */
function shelfUnit(g, x, z, ry, w = 3, h = 1.9, goods = 18) {
  const grp = new THREE.Group();
  grp.position.set(x, 0, z); grp.rotation.y = ry;
  addBox(grp, M().steelDark, w, 0.06, 0.5, 0, 0.35, 0);
  addBox(grp, M().steelDark, w, 0.06, 0.5, 0, 0.95, 0);
  addBox(grp, M().steelDark, w, 0.06, 0.5, 0, 1.55, 0);
  for (const s of [-1, 1]) addBox(grp, M().steelDark, 0.05, h, 0.45, s * (w / 2 - 0.03), h / 2, 0);
  const colors = ['#e8756b', '#f2b53c', '#6fb56f', '#5d8fe8', '#e87bb0', '#f0f0ec', '#9a7bd9', '#e89840'];
  const gGeo = new THREE.BoxGeometry(0.16, 0.24, 0.16);
  const inst = new THREE.InstancedMesh(gGeo, new THREE.MeshToonMaterial({}), goods * 3);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1), pv = new THREE.Vector3();
  let i = 0;
  for (let row = 0; row < 3; row++) {
    const y = 0.5 + row * 0.6;
    for (let k = 0; k < goods; k++) {
      const px = -w / 2 + 0.25 + (k * (w - 0.5)) / goods;
      pv.set(px, y, 0.12);
      q.setFromEuler(new THREE.Euler(0, rand(TAU), 0));
      m4.compose(pv, q, sc);
      inst.setMatrixAt(i, m4);
      inst.setColorAt(i, new THREE.Color(pick(colors)));
      i++;
    }
  }
  inst.count = i;
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  grp.add(inst);
  return grp;
}

/** 商店通用购买交互 */
function shopInteract(ctx, group, x, z, ry, title, items, promptText) {
  ctx.interactables.push({
    pos: new THREE.Vector3(x, 1, z),
    radius: 2.2,
    label: () => promptText || `浏览${title}`,
    prompt: () => promptText || `浏览${title}`,
    enabled: () => true,
    onUse: async () => {
      const opts = items.map((it) => ({ text: `${it.name}　￥${it.price}`, value: it }));
      opts.push({ text: '先不买了', value: null });
      const chosen = await ctx.ui.choice(`购买${title}`, opts);
      if (!chosen) return;
      if (ctx.game.coins < chosen.price) {
        ctx.ui.toast('零钱不够了…');
        ctx.audio.blip();
        return;
      }
      ctx.game.coins -= chosen.price;
      ctx.game.addItem(chosen.id, chosen.name);
      ctx.audio.coin();
      ctx.ui.toast(`买到了${chosen.name}`);
    },
  });
}

/* ==================== 便利店 ==================== */

function konbini(ctx) {
  const g = new THREE.Group();
  const X0 = -14, X1 = 8, Z0 = 12, Z1 = 24;
  const W = X1 - X0, D = Z1 - Z0, H = 3.3;

  // 地板 + 天花
  addPlane(g, M().sidewalk, W - 0.4, D - 0.4, (X0 + X1) / 2, 0.12, (Z0 + Z1) / 2, { uv: 0.4 });
  addBox(g, M().white, W - 0.4, 0.12, D - 0.4, (X0 + X1) / 2, H - 0.1, (Z0 + Z1) / 2, { cast: false });
  // 荧光灯
  for (const lx of [-6, 0]) {
    const fl = addBox(g, M().glowCool, 2.6, 0.08, 0.5, lx, H - 0.3, 18, { cast: false });
    ctx.lights.push({ mesh: fl, from: 0, to: 24, always: true });
  }

  // 外墙（北面朝街）
  wallX(g, ctx.colliders, M().plaster, (X0 + X1) / 2, Z0, W, H, 0.3, 0, { at: 0.32, w: 2.6, h: 2.3 });
  shopWindow(g, ctx.lights, 1.5, 1.75, Z0 - 0.05, 0, 6, 1.4);
  window_(g, ctx.lights, -8, 1.8, Z0 + 0.05, 0, 3.4, 1.3);
  wallX(g, ctx.colliders, M().plaster, (X0 + X1) / 2, Z1, W, H, 0.3, 0);
  wallZ(g, ctx.colliders, M().plaster, X0, (Z0 + Z1) / 2, D, H, 0.3, 0, { at: 0.7, w: 1.2, h: 2.1 });
  wallZ(g, ctx.colliders, M().plaster, X1, (Z0 + Z1) / 2, D, H, 0.3, 0);
  window_(g, ctx.lights, X0 - 0.05, 1.8, Z0 + 6, -Math.PI / 2, 3, 1.2);
  window_(g, ctx.lights, X1 + 0.05, 1.8, Z1 - 5, Math.PI / 2, 3, 1.2);

  // 屋顶
  const roofG = roof(g, (X0 + X1) / 2, (Z0 + Z1) / 2, W, D, 1.1, H + 0.3, M().tileRoofBrown, { overhang: 0.8 });

  // 门（自动）
  doorway(g, ctx.colliders, ctx.interactables, -3, Z0, Math.PI, 2.6, 2.3, {
    label: '便利店大门', auto: true, glassDoor: true, mat: M().steelDark,
  });

  // 招牌（24h 亮灯）
  sign(g, '樱屋便利店', -3, H + 0.85, Z0 + 0.75, Math.PI, { w: 4.6, h: 0.8, bg: '#2b3a67', fg: '#f7f3ea', accent: '#f2a7bb' });
  sign(g, 'Sakura Konbini', -3, 1.15, Z0 - 0.42, Math.PI, { w: 2.2, h: 0.34, bg: '#f7f3ea', fg: '#2b3a67' });
  sign(g, '24H', X1 - 0.6, H + 0.2, Z0 + 0.4, Math.PI / 2, { w: 0.7, h: 0.7, bg: '#d9a441', fg: '#fff' });

  // ---- 室内 ----
  // 冷藏柜（东墙）
  {
    const fz0 = 14.5, fz1 = 22.5;
    addBox(g, M().white, 1.2, 2.3, fz1 - fz0, X1 - 0.75, 1.15, (fz0 + fz1) / 2, { cast: false });
    for (let i = 0; i < 4; i++) {
      const cool = addBox(g, M().glowCool, 0.5, 0.45, (fz1 - fz0) / 4 - 0.15, X1 - 0.72, 0.55 + i * 0.52, fz0 + 0.6 + i * ((fz1 - fz0) / 4), { cast: false });
      ctx.lights.push({ mesh: cool, from: 0, to: 24, always: true });
    }
    // 饮料罐
    const canGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.14, 8);
    const cans = new THREE.InstancedMesh(canGeo, new THREE.MeshToonMaterial({}), 40);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1), pv = new THREE.Vector3();
    const cols = ['#e8756b', '#f2b53c', '#6fb56f', '#5d8fe8'];
    for (let i = 0; i < 40; i++) {
      const row = Math.floor(i / 10), k = i % 10;
      pv.set(X1 - 0.75, 0.5 + row * 0.52, fz0 + 1.0 + k * ((fz1 - fz0 - 2) / 10));
      q.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
      m4.compose(pv, q, sc);
      cans.setMatrixAt(i, m4);
      cans.setColorAt(i, new THREE.Color(cols[i % 4]));
    }
    cans.instanceMatrix.needsUpdate = true;
    if (cans.instanceColor) cans.instanceColor.needsUpdate = true;
    g.add(cans);
  }
  // 货架
  const s1 = shelfUnit(g, X0 + 0.9, 17.5, Math.PI / 2, 4.5, 1.9, 14);
  const s2 = shelfUnit(g, X0 + 0.9, 21.5, Math.PI / 2, 4.5, 1.9, 14);
  const s3 = shelfUnit(g, -3, 21.8, 0, 5.5, 1.9, 18);
  g.add(s1, s2, s3);
  shopInteract(ctx, g, X0 + 1.6, 17.5, 0, '食品货架', [
    { id: 'onigiri', name: '饭团', price: 150 },
    { id: 'bread', name: '牛奶面包', price: 120 },
    { id: 'coffee_beans', name: '咖啡豆', price: 300 },
    { id: 'milk', name: '牛奶', price: 180 },
    { id: 'candy', name: '樱花糖', price: 80 },
  ], '浏览食品货架');
  shopInteract(ctx, g, X0 + 1.6, 21.5, 0, '日用品', [
    { id: 'tissue', name: '纸巾', price: 100 },
    { id: 'battery', name: '电池', price: 150 },
  ], '浏览日用品');
  shopInteract(ctx, g, -3, 20.6, 0, '冰品', [
    { id: 'icecream', name: '抹茶冰淇淋', price: 160 },
  ], '浏览冰品');
  // 冷藏饮料交互
  ctx.interactables.push({
    pos: new THREE.Vector3(X1 - 1.8, 1, 18), radius: 2.0, label: () => '拿一瓶饮料', prompt: () => '拿一瓶饮料（￥120）',
    enabled: () => true,
    onUse: async () => {
      if (ctx.game.coins < 120) { ctx.ui.toast('零钱不够了…'); ctx.audio.blip(); return; }
      ctx.game.coins -= 120;
      ctx.game.addItem('petbottle', '瓶装茶');
      ctx.audio.coin();
      ctx.ui.toast('拿了一瓶冰镇茶');
    },
  });
  // 收银台 + 咖啡机 + 关东煮
  addBox(g, M().wood, 6.5, 0.1, 0.8, 3, 0.95, Z1 - 1.2, { cast: true });
  addBox(g, M().woodDark, 6.5, 0.9, 0.7, 3, 0.45, Z1 - 1.2);
  addBox(g, M().steelDark, 0.7, 0.9, 0.5, 6.5, 1.4, Z1 - 1.5);       // 咖啡机
  addBox(g, M().steelDark, 0.9, 0.5, 0.5, 5.2, 1.2, Z1 - 1.5);       // 关东煮锅
  const register = addBox(g, M().black, 0.5, 0.3, 0.4, 1.2, 1.15, Z1 - 1.4);
  ctx.lights.push({ mesh: register, from: 0, to: 24, always: true, emissiveOnly: true });
  addBox(g, M().white, 0.5, 0.4, 0.05, 6.5, 1.95, Z1 - 1.45);        // 菜单牌
  // 与店长对话
  ctx.interactables.push({
    pos: new THREE.Vector3(1.2, 1, Z1 - 2.4), radius: 2.4, label: () => '和店长打招呼', prompt: () => '和店长打招呼',
    enabled: () => true,
    onUse: () => ctx.game.npcs.talk('hana'),
  });
  // 餐桌
  addCyl(g, M().wood, 0.5, 0.5, 0.06, 2.5, 0.72, 15.5, { seg: 12 });
  addCyl(g, M().steelDark, 0.05, 0.05, 0.72, 2.5, 0.36, 15.5, { seg: 6 });
  for (const [dx, dz] of [[-0.8, 0], [0.8, 0], [0, -0.8], [0, 0.8]]) {
    addBox(g, M().wood, 0.4, 0.42, 0.4, 2.5 + dx, 0.21, 15.5 + dz, { ry: rand(TAU) });
  }
  ctx.interactables.push({
    pos: new THREE.Vector3(2.5, 0.5, 15.5), radius: 1.7, label: () => '坐下吃东西', prompt: () => '坐下吃东西',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(2.5, 0, 15.2), Math.PI),
  });
  // 海报与垃圾桶
  sign(g, '新入荷', -12.5, 2.1, Z1 - 0.16, Math.PI, { w: 1.0, h: 0.5, bg: '#d97a95', fg: '#fff' });
  trashBin(g, -12.6, Z0 + 1.4);
  planter(g, X0 + 0.8, Z0 + 1.0);

  // ---- 室外 ----
  vendingMachine(g, ctx.interactables, ctx.audio, ctx.game, -16.8, 17, Math.PI / 2);
  vendingMachine(g, ctx.interactables, ctx.audio, ctx.game, -16.8, 20, Math.PI / 2);
  aircon(g, X0 + 0.4, 2.6, Z0 + 0.3, 0);
  aircon(g, X1 - 0.4, 2.6, Z1 - 0.3, Math.PI);
  bicycle(g, 10.5, 14.5, 0.4, '#2b3a67');
  bicycle(g, 11.8, 15.2, 0.2, '#d97a95');
  trashBin(g, 10, 22.5);
  // 灯光
  const roomLight = new THREE.PointLight(0xf0f4ff, 0, 18, 2);
  roomLight.position.set(-3, 3.0, 18);
  g.add(roomLight);
  const fl2 = addBox(g, M().glowCool, 1.2, 0.06, 0.3, -3, 3.05, 18, { cast: false });
  ctx.lights.push({ mesh: fl2, from: 0, to: 24, always: true, light: roomLight, lightOn: 30, lightOff: 0 });

  ctx.scene.add(g);
  return {
    group: g, roof: roofG,
    footprint: { minX: X0 - 0.3, maxX: X1 + 0.3, minZ: Z0 - 0.3, maxZ: Z1 + 0.3 },
    lights: ctx.lights,
  };
}

/* ==================== 咖啡店 ==================== */

function cafe(ctx) {
  const g = new THREE.Group();
  const X0 = 12, X1 = 32, Z0 = 12, Z1 = 24;
  const W = X1 - X0, D = Z1 - Z0, H = 3.2;

  addPlane(g, M().plank, W - 0.4, D - 0.4, (X0 + X1) / 2, 0.12, (Z0 + Z1) / 2, { uv: 0.3 });
  addBox(g, M().plaster, W - 0.4, 0.12, D - 0.4, (X0 + X1) / 2, H - 0.1, (Z0 + Z1) / 2, { cast: false });

  wallX(g, ctx.colliders, M().plasterWarm, (X0 + X1) / 2, Z0, W, H, 0.3, 0, { at: 0.5, w: 1.6, h: 2.2 });
  shopWindow(g, ctx.lights, 16.5, 1.7, Z0 - 0.05, 0, 4.5, 1.4);
  shopWindow(g, ctx.lights, 28, 1.7, Z0 - 0.05, 0, 4.5, 1.4);
  wallX(g, ctx.colliders, M().plasterWarm, (X0 + X1) / 2, Z1, W, H, 0.3, 0);
  wallZ(g, ctx.colliders, M().plasterWarm, X0, (Z0 + Z1) / 2, D, H, 0.3, 0);
  wallZ(g, ctx.colliders, M().plasterWarm, X1, (Z0 + Z1) / 2, D, H, 0.3, 0);

  const roofG = roof(g, (X0 + X1) / 2, (Z0 + Z1) / 2, W, D, 1.2, H + 0.3, M().tileRoof, { overhang: 0.85 });
  doorway(g, ctx.colliders, ctx.interactables, 22, Z0, Math.PI, 1.6, 2.2, { label: '咖啡店门', mat: M().woodDark });
  sign(g, '喫茶 さくら', 22, H + 0.8, Z0 + 0.7, Math.PI, { w: 3.4, h: 0.72, bg: '#f7f3ea', fg: '#7a4a3a', accent: '#d9a441', sub: 'Sakura Cafe' });
  noren(g, '珈琲', 22, 2.0, Z0 + 0.12, Math.PI, 1.2, 0.5);
  planter(g, X0 + 0.7, Z0 + 0.9);
  planter(g, X1 - 0.7, Z0 + 0.9);
  bicycle(g, 14, 14.5, 0.3, '#7a4a3a');
  aircon(g, X0 + 0.4, 2.5, Z0 + 0.3, 0);

  // 吧台 + 厨房
  addBox(g, M().woodDark, 8.5, 0.12, 0.8, 22, 1.05, Z1 - 1.6, { cast: true });
  addBox(g, M().wood, 8.5, 1.0, 0.75, 22, 0.5, Z1 - 1.6);
  for (const sx of [17.5, 20, 24, 26.5]) {
    addCyl(g, M().woodRed, 0.22, 0.2, 0.62, sx, 0.31, Z1 - 1.6, { seg: 8 });   // 吧台凳
  }
  ctx.interactables.push({
    pos: new THREE.Vector3(20, 0.5, Z1 - 2.2), radius: 1.6, label: () => '在吧台坐下', prompt: () => '在吧台坐下',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(20, 0, Z1 - 2.4), 0),
  });
  // 厨房（后台）
  addBox(g, M().white, 8.5, 1.6, 1.4, 22, 0.8, Z1 - 0.4, { cast: false });
  addBox(g, M().steelDark, 3.0, 0.1, 0.7, 19, 1.2, Z1 - 0.4);
  addBox(g, M().steelDark, 0.6, 0.5, 0.6, 25.5, 1.5, Z1 - 0.4);      // 咖啡机
  const kitchenLamp = addBox(g, M().glowWarm, 3.0, 0.08, 0.4, 22, 1.9, Z1 - 0.4, { cast: false });
  ctx.lights.push({ mesh: kitchenLamp, from: 6, to: 21 });
  // 与老板对话
  ctx.interactables.push({
    pos: new THREE.Vector3(22, 1, Z1 - 2.6), radius: 2.4, label: () => '和老板聊聊', prompt: () => '和老板聊聊',
    enabled: () => true, onUse: () => ctx.game.npcs.talk('sato'),
  });
  // 菜单板
  posterBoard(g, '本日のおすすめ', ['ブレンド   ￥400', 'カフェラテ ￥450', '桜シェイク ￥500', '朝セット   ￥600'], X0 + 0.2, 2.0, Z0 + 1.2, -Math.PI / 2, 1.1, 1.5);
  ctx.interactables.push({
    pos: new THREE.Vector3(X0 + 1.2, 1, Z0 + 1.2), radius: 1.8, label: () => '看看菜单', prompt: () => '看看菜单',
    enabled: () => true,
    onUse: async () => {
      await ctx.ui.say('菜单', ['手写菜单： blend ￥400 / 拿铁 ￥450 / 樱花奶昔 ￥500 / 早餐套餐 ￥600。', '旁边写着：「坐多久都可以，不点东西也没关系。」']);
    },
  });
  // 餐桌（4 桌）
  const tables = [[16, 16.5], [28, 16.5], [16, 20.5], [28, 20.5]];
  for (const [tx, tz] of tables) {
    addCyl(g, M().wood, 0.55, 0.55, 0.07, tx, 0.72, tz, { seg: 12 });
    addCyl(g, M().steelDark, 0.05, 0.05, 0.72, tx, 0.36, tz, { seg: 6 });
    for (const [dx, dz] of [[-0.75, 0], [0.75, 0]]) addBox(g, M().woodRed, 0.42, 0.44, 0.42, tx + dx, 0.22, tz + dz, { ry: rand(TAU) });
    // 桌上小花瓶
    addCyl(g, M().white, 0.06, 0.08, 0.14, tx + 0.15, 0.82, tz - 0.1, { seg: 6 });
    addSphere(g, M().sakura, 0.07, tx + 0.15, 0.93, tz - 0.1, { seg: 5 });
    ctx.interactables.push({
      pos: new THREE.Vector3(tx, 0.5, tz), radius: 1.6, label: () => '坐下喝一杯', prompt: () => '坐下喝一杯',
      enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(tx, 0, tz - 0.5), 0),
    });
  }
  // 留声机（交互：换音乐）
  {
    const px = X1 - 1.2, pz = Z0 + 1.2;
    addBox(g, M().woodDark, 0.8, 0.9, 0.5, px, 0.45, pz);
    const disc = addCyl(g, M().black, 0.3, 0.3, 0.04, px, 0.95, pz, { seg: 16 });
    disc.rotation.x = Math.PI / 2;
    ctx.interactables.push({
      pos: new THREE.Vector3(px, 1, pz), radius: 1.8, label: () => '播放唱片', prompt: () => '播放唱片',
      enabled: () => true,
      onUse: () => {
        ctx.audio.chime();
        setTimeout(() => ctx.audio.bird(), 300);
        ctx.ui.toast('留声机里流出舒缓的爵士乐');
      },
    });
  }
  // 暖色吊灯
  const roomLight = new THREE.PointLight(0xffc890, 0, 16, 2);
  roomLight.position.set(22, 2.9, 17);
  g.add(roomLight);
  const pendant = addSphere(g, M().lampGlow, 0.22, 22, 2.75, 17, { seg: 8 });
  ctx.lights.push({ mesh: pendant, from: 16.5, to: 22.5, light: roomLight, lightOn: 22, lightOff: 0 });

  ctx.scene.add(g);
  return {
    group: g, roof: roofG,
    footprint: { minX: X0 - 0.3, maxX: X1 + 0.3, minZ: Z0 - 0.3, maxZ: Z1 + 0.3 },
  };
}

/* ==================== 沿街小铺（只做外观） ==================== */

function smallShop(ctx, cfg) {
  const g = new THREE.Group();
  const { x0, x1, z0, z1, name, signText, signBg = '#f7f3ea', signFg = '#2b3a67', wallMat = null, kind = 'shop' } = cfg;
  const W = x1 - x0, D = z1 - z0, H = 3.1;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const wm = wallMat || M().plaster;

  addPlane(g, M().concrete, W - 0.3, D - 0.3, cx, 0.1, cz, { uv: 0.4 });
  wallX(g, ctx.colliders, wm, cx, z0, W, H, 0.28, 0);
  wallX(g, ctx.colliders, wm, cx, z1, W, H, 0.28, 0);
  wallZ(g, ctx.colliders, wm, x0, cz, D, H, 0.28, 0);
  wallZ(g, ctx.colliders, wm, x1, cz, D, H, 0.28, 0);
  // 临街橱窗与门
  shopWindow(g, ctx.lights, cx - 2, 1.6, z0 - 0.05, 0, 3.4, 1.3);
  const dx = cx + 2.6;
  doorway(g, ctx.colliders, ctx.interactables, dx, z0, Math.PI, 1.3, 2.1, { label: `${name}的门`, mat: M().woodDark });
  roof(g, cx, cz, W, D, 1.0, H + 0.25, kind === 'izakaya' ? M().tileRoofBrown : M().tileRoof, { overhang: 0.7 });
  sign(g, signText, cx, H + 0.7, z0 + 0.6, Math.PI, { w: Math.min(3.6, W * 0.7), h: 0.62, bg: signBg, fg: signFg });
  if (kind === 'izakaya') {
    noren(g, '酒', dx, 1.9, z0 + 0.1, Math.PI, 1.0, 0.45);
    const lantern = addSphere(g, M().lampGlow, 0.16, dx + 1.4, 2.2, z0 + 0.5, { seg: 7 });
    ctx.lights.push({ mesh: lantern, from: 16.5, to: 24 });
  }
  if (kind === 'post') {
    postBox(g, cx - 3.5, z0 + 1.4, Math.PI);
    ctx.interactables.push({
      pos: new THREE.Vector3(cx - 3.5, 1, z0 + 1.4), radius: 2.0, label: () => '投递信件', prompt: () => '投递信件',
      enabled: () => true,
      onUse: () => {
        if (ctx.game.removeItem('letter')) {
          ctx.audio.chime();
          ctx.ui.toast('信件投进了邮筒');
          ctx.game.setFlag('letterPosted', true);
          ctx.game.quests.notify('letter');
        } else {
          ctx.ui.toast('没有要寄的信');
          ctx.audio.blip();
        }
      },
    });
    sign(g, '〒', cx + 3.6, 2.4, z0 - 0.3, Math.PI, { w: 0.5, h: 0.5, bg: '#d97a95', fg: '#fff' });
  }
  if (kind === 'bakery') {
    // 橱窗里的面包
    for (let i = 0; i < 5; i++) {
      addSphere(g, M().wood, 0.16, cx - 3.4 + i * 0.42, 1.35, z0 + 0.35, { seg: 6, sx: 1.4, sy: 0.8, sz: 0.9 });
    }
  }
  if (kind === 'stationer') {
    for (let i = 0; i < 4; i++) {
      addBox(g, M().sakura, 0.3, 0.4, 0.05, cx - 2.6 + i * 0.5, 1.5, z0 + 0.3, { ry: rand(-0.2, 0.2) });
    }
  }
  if (kind === 'book') {
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 6; i++) {
        addBox(g, r % 2 ? M().woodRed : M().plasterBlue, 0.07, 0.3, 0.22, cx - 2.8 + i * 0.28, 1.35 + r * 0.34, z0 + 0.3, { ry: rand(-0.1, 0.1) });
      }
    }
  }
  aircon(g, x0 + 0.35, 2.4, z0 + 0.25, 0);
  // 夜间灯
  const bulb = addSphere(g, M().lampGlow, 0.1, dx + 1.0, 2.45, z0 + 0.15, { seg: 6 });
  ctx.lights.push({ mesh: bulb, from: 17.0, to: 23.0 });
  ctx.scene.add(g);
  return { group: g, footprint: { minX: x0, maxX: x1, minZ: z0, maxZ: z1 } };
}

/* ==================== 商店街拱廊 ==================== */

function arcade(ctx) {
  const g = new THREE.Group();
  const z = 8;
  for (let x = -34; x <= 34; x += 4) {
    addCyl(g, M().steelDark, 0.07, 0.07, 3.4, x, 1.7, z - 3.2, { seg: 6 });
    addCyl(g, M().steelDark, 0.07, 0.07, 3.4, x, 1.7, z + 3.2, { seg: 6 });
  }
  // 弧形顶棚（半圆柱面）
  const curve = new THREE.CylinderGeometry(4.4, 4.4, 68, 12, 1, true, 0, Math.PI);
  const roofMesh = new THREE.Mesh(curve, M().roofMetal);
  roofMesh.position.set(0, 3.5, z);
  roofMesh.rotation.y = Math.PI / 2;
  roofMesh.material = M().glass;
  roofMesh.castShadow = false;
  g.add(roofMesh);
  // 横梁
  for (let x = -34; x <= 34; x += 4) addBox(g, M().woodDark, 0.14, 0.14, 7.4, x, 3.45, z, { cast: false });
  // 拱廊灯笼（带光晕）
  for (const x of [-24, -8, 8, 24]) {
    for (const lz of [z - 2.4, z + 2.4]) {
      const l = addSphere(g, M().lampGlow, 0.18, x, 3.1, lz, { seg: 7 });
      ctx.lights.push({ mesh: l, from: 16.8, to: 23.5 });
      const sp = glowSprite(ctx, x, 3.1, lz, 3.4, 0.5);
      ctx.lights.push({ mesh: sp, from: 16.8, to: 23.5, sprite: true, opacity: 0.5 });
    }
  }
  ctx.scene.add(g);
}

/* ==================== 组装 ==================== */

export function buildShopStreet(ctx) {
  const out = {};
  out.konbini = konbini(ctx);
  out.cafe = cafe(ctx);
  out.stationer = smallShop(ctx, { x0: 36, x1: 50, z0: 12, z1: 22, name: '樱文具店', signText: '櫻文具店', kind: 'stationer' });
  out.bakery = smallShop(ctx, { x0: -32, x1: -18, z0: 12, z1: 22, name: '日出面包房', signText: 'パン屋 ひので', signBg: '#f2d9a0', signFg: '#7a4a3a', kind: 'bakery' });
  out.post = smallShop(ctx, { x0: -8, x1: 10, z0: -5, z1: 3, name: '樱花邮局', signText: '樱花邮局', signBg: '#d97a95', signFg: '#fff', kind: 'post' });
  out.izakaya = smallShop(ctx, { x0: 14, x1: 30, z0: -5, z1: 3, name: '驹鸟小料理', signText: '駒鳥', signBg: '#2b3a67', signFg: '#f7f3ea', kind: 'izakaya', wallMat: M().plasterWarm });
  out.book = smallShop(ctx, { x0: -26, x1: -10, z0: -5, z1: 3, name: '春风书店', signText: '春風書店', kind: 'book' });
  arcade(ctx);
  return out;
}
