// 樱花町站：站房（可进入）+ 站台 + 站台雨棚 + 闸机 + 发车牌
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, canvasTexture, rand, TAU, Tex,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import {
  wallX, wallZ, window_, shopWindow, doorway, roof, sign, posterBoard,
  bench, vendingMachine, trashBin, aircon, planter, utilityPole,
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

/** 发车牌贴图 */
function boardTexture(rows, alert = null) {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#10161f'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1d2836'; ctx.fillRect(0, 0, w, 46);
    ctx.fillStyle = '#ffb26b';
    ctx.font = 'bold 30px "Hiragino Sans", "Noto Sans JP", sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('桜町駅 発車案内', 18, 24);
    ctx.textAlign = 'right';
    ctx.fillText(new Date().getSeconds() % 2 ? '●' : ' ', w - 18, 24);
    rows.forEach((r, i) => {
      const y = 84 + i * 52;
      ctx.textAlign = 'left';
      ctx.fillStyle = r.color || '#e8eef5';
      ctx.font = '28px "Hiragino Sans", "Noto Sans JP", sans-serif';
      ctx.fillText(r.dest, 20, y);
      ctx.textAlign = 'right';
      ctx.fillStyle = r.timeColor || '#7fe0a8';
      ctx.font = 'bold 34px monospace';
      ctx.fillText(r.time, w - 20, y);
    });
    if (alert) {
      ctx.fillStyle = alert.color || '#ff7a6b';
      ctx.font = 'bold 26px "Hiragino Sans", "Noto Sans JP", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(alert.text, w / 2, h - 22);
    }
  });
}

export function buildStation(ctx) {
  const { scene, colliders, interactables, lights, walkables } = ctx;
  const g = new THREE.Group();
  const doors = [];

  const X0 = -20, X1 = 20, Z0 = -33.4, Z1 = -21.4;   // 站房
  const W = X1 - X0, D = Z1 - Z0;
  const H = 3.6;

  // ---- 地板 / 内饰 ----
  addPlane(g, M().plank, W - 0.5, D - 0.5, 0, 0.12, (Z0 + Z1) / 2, { uv: 0.35 });
  // 天花
  addBox(g, M().white, W - 0.4, 0.15, D - 0.4, 0, H - 0.1, (Z0 + Z1) / 2, { cast: false });

  // ---- 四面墙（带门洞） ----
  // 南墙（z=Z1，朝广场）：大门 + 橱窗
  wallX(g, colliders, M().plaster, 0, Z1, W, H, 0.3, 0, { at: 0.5, w: 3.2, h: 2.3 });
  shopWindow(g, lights, -11, 1.7, Z1 - 0.05, 0, 7, 1.5);
  shopWindow(g, lights, 11, 1.7, Z1 - 0.05, 0, 7, 1.5);
  // 北墙（z=Z0，朝站台）：门 + 窗
  wallX(g, colliders, M().plaster, 0, Z0, W, H, 0.3, 0, { at: 0.28, w: 2.0, h: 2.3 });
  window_(g, lights, 10, 1.8, Z0 + 0.05, 0, 4, 1.3);
  // 东西墙
  wallZ(g, colliders, M().plaster, X0, (Z0 + Z1) / 2, D, H, 0.3);
  wallZ(g, colliders, M().plaster, X1, (Z0 + Z1) / 2, D, H, 0.3);
  window_(g, lights, X0 - 0.05, 1.9, Z1 - 6, -Math.PI / 2, 3, 1.2);
  window_(g, lights, X1 + 0.05, 1.9, Z0 + 6, Math.PI / 2, 3, 1.2);

  // ---- 屋顶（进站时隐藏） ----
  const roofG = roof(g, 0, (Z0 + Z1) / 2, W, D, 1.9, H + 0.35, M().tileRoof, { overhang: 1.0 });
  // 车站名招牌（正面屋顶上方）
  sign(g, '桜町駅', 0, H + 1.15, Z1 + 0.9, Math.PI, { w: 5.2, h: 0.85, bg: '#2b3a67', fg: '#f7f3ea', accent: '#f2a7bb' });
  // 侧面小招牌
  sign(g, 'Sakura Town Sta.', X1 + 0.5, 2.6, Z0 + 3, Math.PI / 2, { w: 2.6, h: 0.5, bg: '#f7f3ea', fg: '#2b3a67' });

  // ---- 门 ----
  doors.push(doorway(g, colliders, interactables, 0, Z1, Math.PI, 3.2, 2.3, {
    label: '车站入口', glassDoor: true, mat: M().steelDark,
  }));
  doors.push(doorway(g, colliders, interactables, -20 * 0.28 + 20 * 0.5, Z0, 0, 2.0, 2.3, {
    label: '通往站台', glassDoor: true, mat: M().steelDark,
  }));

  // ---- 室内：闸机 ----
  const gate = { open: false };
  {
    const gx = 0, gz = Z1 - 1.7;   // 闸机在门内
    for (const s of [-1, 1]) {
      addBox(g, M().steelDark, 0.5, 1.0, 0.4, gx + s * 0.85, 0.5, gz);
      addBox(g, M().glowWarm, 0.1, 0.1, 0.06, gx + s * 0.85, 1.02, gz + 0.21);
    }
    const flapL = addBox(g, M().steel, 0.8, 0.9, 0.06, gx - 0.4, 0.45, gz, {});
    const flapR = addBox(g, M().steel, 0.8, 0.9, 0.06, gx + 0.4, 0.45, gz, {});
    gate.update = (dt) => {
      const t = gate._t = gate._t === undefined ? 0 : gate._t + ((gate.open ? 1 : 0) - gate._t) * Math.min(1, 7 * dt);
      flapL.rotation.y = -t * 1.2; flapR.rotation.y = t * 1.2;
      flapL.position.x = gx - 0.4 - t * 0.3; flapR.position.x = gx + 0.4 + t * 0.3;
    };
    interactables.push({
      pos: new THREE.Vector3(gx, 1, gz + 1.0),
      radius: 2.0,
      label: () => (gate.open ? '关闭闸机' : '刷卡进站'),
      prompt: () => (gate.open ? '关闭闸机' : '刷卡进站（需要车票）'),
      enabled: () => true,
      onUse: () => {
        if (!gate.open) {
          if (ctx.game.items.some((i) => i.id === 'ticket')) {
            gate.open = true; ctx.audio.chime(); ctx.ui.toast('闸机打开了');
          } else {
            ctx.ui.toast('先在售票机买张车票吧');
            ctx.audio.blip();
          }
        } else { gate.open = false; ctx.audio.blip(); }
      },
    });
  }

  // ---- 室内家具 ----
  // 长椅
  const bench1 = bench(g, -10, Z1 - 2.6, Math.PI);
  const bench2 = bench(g, -4, Z1 - 2.6, Math.PI);
  const bench3 = bench(g, 8, Z1 - 2.6, Math.PI);
  interactables.push({
    pos: new THREE.Vector3(-10, 0.6, Z1 - 2.6), radius: 1.8, label: () => '坐下休息', prompt: () => '坐下休息',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(-10, 0, Z1 - 2.2), Math.PI),
  });
  interactables.push({
    pos: new THREE.Vector3(8, 0.6, Z1 - 2.6), radius: 1.8, label: () => '坐下休息', prompt: () => '坐下休息',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(8, 0, Z1 - 2.2), Math.PI),
  });
  // 售票机
  {
    const tx = 14, tz = Z1 - 1.4;
    addBox(g, M().steelDark, 1.1, 1.7, 0.5, tx, 0.85, tz);
    addBox(g, M().glowCool, 0.8, 0.7, 0.05, tx, 1.35, tz - 0.28);
    addBox(g, M().black, 0.5, 0.12, 0.06, tx, 0.5, tz - 0.28);
    sign(g, '切符', tx, 1.95, tz - 0.3, Math.PI, { w: 0.9, h: 0.3, bg: '#2b3a67', fg: '#fff' });
    interactables.push({
      pos: new THREE.Vector3(tx, 1, tz - 1.0), radius: 1.9, label: () => '购买车票', prompt: () => '购买车票（￥200）',
      enabled: () => true,
      onUse: () => {
        if (ctx.game.coins < 200) { ctx.ui.toast('零钱不够了…'); ctx.audio.blip(); return; }
        ctx.game.coins -= 200;
        ctx.game.addItem('ticket', '往返车票');
        ctx.audio.coin();
        ctx.ui.toast('买到了往返车票');
      },
    });
  }
  // 发车牌
  const board = { rows: [], alert: null, mesh: null, mat: null, lastKey: '' };
  {
    const bx = 0, by = 2.5, bz = Z0 + 1.4;
    addBox(g, M().woodDark, 3.4, 1.7, 0.12, bx, by, bz);
    const tex = canvasTexture(512, 256, (c) => { c.fillStyle = '#10161f'; c.fillRect(0, 0, 512, 256); });
    board.mat = new THREE.MeshToonMaterial({ map: tex, emissive: 0x223044, emissiveIntensity: 0.6 });
    board.mat.gradientMap = M().paper.gradientMap;
    board.mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6), board.mat);
    board.mesh.position.set(bx, by, bz + 0.08);
    g.add(board.mesh);
  }
  board.update = (train) => {
    let rows, alert = null;
    if (train.state === 'stopped') {
      rows = [{ dest: 'まもなく 発車', time: 'NOW', timeColor: '#ffd166' }];
      alert = { text: 'ドアが開いています', color: '#7fe0a8' };
    } else if (train.state === 'approach') {
      rows = [{ dest: 'みさき 行き', time: 'まもなく', timeColor: '#ffd166' }];
      alert = { text: '危険ですので 黄色い線まで お下がりください', color: '#ffb26b' };
    } else if (train.delayed) {
      rows = [{ dest: 'みさき 行き', time: '遅延', timeColor: '#ff7a6b' }];
      alert = { text: 'ただいま 遅延しております', color: '#ff7a6b' };
    } else {
      const t = Math.max(1, Math.round(train.timeToNext));
      rows = [
        { dest: 'みさき 行き', time: `${t}分` },
        { dest: '桜町 止', time: '当駅' },
      ];
    }
    const key = JSON.stringify(rows) + (alert ? alert.text : '');
    if (key !== board.lastKey) {
      board.lastKey = key;
      const tex = canvasTexture(512, 256, (c) => {
        c.fillStyle = '#10161f'; c.fillRect(0, 0, 512, 256);
        c.fillStyle = '#1d2836'; c.fillRect(0, 0, 512, 46);
        c.fillStyle = '#ffb26b';
        c.font = 'bold 30px "Hiragino Sans", "Noto Sans JP", sans-serif';
        c.textAlign = 'left'; c.textBaseline = 'middle';
        c.fillText('桜町駅 発車案内', 18, 24);
        rows.forEach((r, i) => {
          const y = 84 + i * 52;
          c.textAlign = 'left'; c.fillStyle = r.color || '#e8eef5';
          c.font = '28px "Hiragino Sans", "Noto Sans JP", sans-serif';
          c.fillText(r.dest, 20, y);
          c.textAlign = 'right'; c.fillStyle = r.timeColor || '#7fe0a8';
          c.font = 'bold 34px monospace';
          c.fillText(r.time, 492, y);
        });
        if (alert) {
          c.fillStyle = alert.color || '#ff7a6b';
          c.font = 'bold 24px "Hiragino Sans", "Noto Sans JP", sans-serif';
          c.textAlign = 'center';
          c.fillText(alert.text, 256, 234);
        }
      });
      board.mat.map.dispose();
      board.mat.map = tex;
      board.mat.needsUpdate = true;
    }
  };

  // 室内售货机 + 垃圾桶 + 盆栽
  vendingMachine(g, interactables, ctx.audio, ctx.game, 15.5, Z0 + 1.6, Math.PI);
  trashBin(g, -14, Z1 - 1.2);
  planter(g, 13, Z0 + 2.2);
  // 墙面海报（时刻表）
  posterBoard(g, '時刻表', ['桜町 → みさき', '毎時 00 分 / 30 分 頃', '末班 21:30', '運賃 ￥200'], -6, 2.2, Z1 - 0.16, Math.PI, 0.9, 1.2);
  // 站长的桌子与共和国氛围
  addBox(g, M().wood, 2.4, 0.08, 1.0, 12, 0.78, Z0 + 3.0);
  addBox(g, M().woodDark, 2.4, 0.75, 0.9, 12, 0.38, Z0 + 3.0);
  addSphere(g, M().lampGlow, 0.09, 12, 1.05, Z0 + 3.4, { seg: 6 });
  // 挂钟
  {
    const clock = addCyl(g, M().white, 0.28, 0.28, 0.08, 0, 2.9, Z0 + 0.2, { seg: 16 });
    clock.rotation.x = Math.PI / 2;
    const hand = addBox(g, M().black, 0.02, 0.2, 0.01, 0, 2.9, Z0 + 0.26);
    hand.geometry = hand.geometry; // noop
  }

  // ---- 室内灯 ----
  const roomLight = new THREE.PointLight(0xffd9a0, 0, 16, 2);
  roomLight.position.set(0, 3.0, (Z0 + Z1) / 2);
  g.add(roomLight);
  const lampShade = addCyl(g, M().lampGlow, 0.4, 0.4, 0.18, 0, 3.3, (Z0 + Z1) / 2, { seg: 10 });
  lights.push({ mesh: lampShade, from: 17.0, to: 6.0, light: roomLight, lightOn: 26, lightOff: 0 });
  // 夜间门廊灯
  const porch = addSphere(g, M().lampGlow, 0.12, -1.4, 2.55, Z1 + 0.3, { seg: 6 });
  lights.push({ mesh: porch, from: 17.6, to: 5.8 });
  {
    const sp = glowSprite(ctx, -1.4, 2.55, Z1 + 0.3, 3.2, 0.5);
    lights.push({ mesh: sp, from: 17.6, to: 5.8, sprite: true, opacity: 0.5 });
  }

  scene.add(g);

  // ---- 站台 ----
  const plat = new THREE.Group();
  const PZ0 = -38.4, PZ1 = -33.4;
  addPlane(plat, M().concrete, 46, PZ1 - PZ0, 0, 0.5, (PZ0 + PZ1) / 2, { uv: 0.3 });
  // 黄色安全线
  addBox(plat, M().gold, 46, 0.03, 0.35, 0, 0.52, PZ0 + 0.75, { cast: false });
  // 站台雨棚
  addBox(plat, M().roofMetal, 46, 0.18, 6.4, 0, 3.5, PZ0 + 3.0, { cast: true });
  for (const px of [-21, -7, 7, 21]) addCyl(plat, M().steelDark, 0.09, 0.09, 3.3, px, 1.7, PZ0 + 0.4, { seg: 6 });
  // 站台设施
  const pb1 = bench(plat, -12, PZ0 + 2.6, 0);
  const pb2 = bench(plat, 12, PZ0 + 2.6, 0);
  interactables.push({
    pos: new THREE.Vector3(-12, 0.6, PZ0 + 2.6), radius: 1.8, label: () => '坐下等车', prompt: () => '坐下等车',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(-12, 0.5, PZ0 + 2.2), 0),
  });
  interactables.push({
    pos: new THREE.Vector3(12, 0.6, PZ0 + 2.6), radius: 1.8, label: () => '坐下等车', prompt: () => '坐下等车',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(12, 0.5, PZ0 + 2.2), 0),
  });
  vendingMachine(plat, interactables, ctx.audio, ctx.game, -19, PZ0 + 3.2, Math.PI / 2);
  trashBin(plat, 19, PZ0 + 3.2);
  // 站台灯
  for (const px of [-14, 14]) {
    const lamp = addCyl(plat, M().steelDark, 0.06, 0.06, 3.2, px, 1.6, PZ1 - 0.5, { seg: 5 });
    const bulb = addSphere(plat, M().lampGlow, 0.16, px, 3.2, PZ1 - 0.5, { seg: 6 });
    lights.push({ mesh: bulb, from: 17.4, to: 5.8 });
    const sp = glowSprite(ctx, px, 3.2, PZ1 - 0.5, 3.6, 0.5);
    lights.push({ mesh: sp, from: 17.4, to: 5.8, sprite: true, opacity: 0.5 });
  }
  // 站台名牌
  sign(plat, '桜町', -22.5, 1.1, PZ0 + 1.6, Math.PI / 2, { w: 0.7, h: 1.6, vertical: true, bg: '#f7f3ea', fg: '#2b3a67' });
  sign(plat, '1', 22.5, 1.1, PZ0 + 1.6, -Math.PI / 2, { w: 0.7, h: 0.7, bg: '#2b3a67', fg: '#fff' });
  scene.add(plat);
  walkables.push({ minX: -23, maxX: 23, minZ: PZ0, maxZ: PZ1, y: 0.5 });

  // ---- 站前广场细节 ----
  planter(g, -13.5, Z1 + 1.6);
  planter(g, 13.5, Z1 + 1.6);
  utilityPole(g, -15, Z1 + 2.4, 8.5);
  utilityPole(g, 15, Z1 + 2.4, 8.5, { transformer: true });

  return {
    group: g, roof: roofG,
    footprint: { minX: X0 - 0.4, maxX: X1 + 0.4, minZ: Z0 - 0.4, maxZ: Z1 + 0.4 },
    doors, board, platform: { z0: PZ0, z1: PZ1, y: 0.5 },
    lights,
  };
}
