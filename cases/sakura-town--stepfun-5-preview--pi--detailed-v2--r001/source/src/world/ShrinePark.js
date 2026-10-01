// 神社（小山之上）与樱丘公园 + 河桥
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, rand, TAU, chance, pick, Tex, canvasTexture,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import {
  wallX, wallZ, window_, doorway, roof, sign, bench, trashBin, planter,
  stoneLantern, torii, bicycle, aircon, vendingMachine,
} from './Buildings.js';
import { heightAt, riverX } from './Terrain.js';

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

/** 狐狸像（稻荷神社） */
function foxStatue(g, x, z, ry) {
  const grp = new THREE.Group();
  grp.position.set(x, 0, z); grp.rotation.y = ry;
  addBox(grp, M().white, 0.5, 0.7, 0.4, 0, 0.35, 0, { cast: true });     // 身体
  addSphere(grp, M().white, 0.22, 0, 0.85, 0, { seg: 7 });               // 头
  addSphere(grp, M().white, 0.09, -0.12, 0.92, 0.16, { seg: 5 });        // 耳
  addSphere(grp, M().white, 0.09, 0.12, 0.92, 0.16, { seg: 5 });
  addSphere(grp, M().black, 0.03, -0.08, 0.87, 0.2, { seg: 4 });         // 眼
  addSphere(grp, M().black, 0.03, 0.08, 0.87, 0.2, { seg: 4 });
  addBox(grp, M().woodRed, 0.3, 0.18, 0.05, 0, 0.6, 0.21);               // 围裙
  g.add(grp);
  return grp;
}

/* ==================== 神社 ==================== */

function shrine(ctx) {
  const g = new THREE.Group();

  // 参道（碎石路）
  addPlane(g, M().dirt, 3.4, 22, 49, heightAt(49, 60) + 0.05, 60, { uv: 0.25 });
  // 鸟居（参道口）
  torii(g, 48, 58.5, 0.62, 1.15);
  foxStatue(g, 45.6, 57.6, 0.9);
  foxStatue(g, 50.4, 57.6, -0.9);
  // 石阶（可走）
  const steps = [];
  let sx = 52.5, sz = 59.5;
  for (let i = 0; i < 9; i++) {
    const t = i / 9;
    const x = 52.5 + t * 8.5, z = 59.5 + t * 5.5;
    const y = heightAt(x, z);
    addBox(g, M().stone, 3.6, 0.28, 1.05, x, y + 0.1, z, { ry: Math.atan2(8.5, 5.5), cast: true });
    steps.push({ minX: x - 1.9, maxX: x + 1.9, minZ: z - 0.6, maxZ: z + 0.6, y: y + 0.24 });
    ctx.walkables.push(steps[steps.length - 1]);
  }
  // 石灯笼（沿路）
  const lanterns = [];
  for (const [lx, lz] of [[46.5, 59.6], [55.5, 61.8], [59.5, 64.0], [66.5, 68.6], [57.5, 69.5]]) {
    const l = stoneLantern(g, lx, lz, { lit: true });
    lanterns.push(l.light);
    ctx.lights.push({ mesh: l.light, from: 17.8, to: 5.8 });
  }

  // 社殿
  const hx = 62, hz = 66;
  const hy = heightAt(hx, hz);
  const hall = new THREE.Group();
  hall.position.set(hx, hy, hz);
  // 基座
  addBox(hall, M().stone, 9.5, 0.9, 7.5, 0, 0.45, 0, { cast: true });
  addBox(hall, M().wood, 8.6, 0.12, 6.6, 0, 0.96, 0, { cast: false });
  // 墙与开放正面
  wallX(hall, ctx.colliders, M().plasterWarm, 0, -3.0, 8.6, 2.6, 0.24, 0.9);
  wallZ(hall, ctx.colliders, M().plasterWarm, -4.3, 0.3, 6.6, 2.6, 0.24, 0.9);
  wallZ(hall, ctx.colliders, M().plasterWarm, 4.3, 0.3, 6.6, 2.6, 0.24, 0.9);
  // 前柱
  for (const px of [-3.4, 0, 3.4]) addCyl(hall, M().woodRed, 0.16, 0.16, 2.6, px, 2.2, 3.0, { seg: 8 });
  addBox(hall, M().woodDark, 9.0, 0.24, 0.3, 0, 3.5, 3.0);
  addBox(hall, M().woodDark, 9.0, 0.2, 0.26, 0, 2.9, 3.0);
  // 屋顶
  roof(hall, 0, 0, 8.6, 6.6, 1.6, 3.7, M().tileRoofBrown, { overhang: 1.0 });
  // 注连绳 + 币帛
  addCyl(hall, M().fabric, 0.1, 0.1, 5.6, 0, 3.05, 3.0, { seg: 6, ry: 0 });
  const shimenawa = addCyl(hall, M().fabric, 0.22, 0.22, 0.3, 0, 3.05, 3.0, { seg: 8 });
  shimenawa.rotation.z = Math.PI / 2;
  // 内部神体
  addBox(hall, M().woodDark, 1.2, 1.4, 0.8, 0, 1.7, -1.8);
  addSphere(hall, M().gold, 0.16, 0, 2.5, -1.8, { seg: 6 });
  // 赛钱箱 + 铃绳
  const saisen = addBox(hall, M().woodDark, 1.5, 0.7, 0.7, 0, 1.35, 1.6, { cast: true });
  addBox(hall, M().black, 1.1, 0.08, 0.1, 0, 1.72, 1.6);
  const bellRope = addCyl(hall, M().woodRed, 0.03, 0.03, 1.1, 0.9, 2.5, 1.4, { seg: 5 });
  ctx.interactables.push({
    pos: new THREE.Vector3(hx, hy + 1, hz + 2.6), radius: 2.2, label: () => '摇铃参拜', prompt: () => '摇铃参拜（￥100）',
    enabled: () => true,
    onUse: () => {
      if (ctx.game.coins < 100) { ctx.ui.toast('没有零钱了…'); ctx.audio.blip(); return; }
      ctx.game.coins -= 100;
      ctx.audio.shrineBell();
      ctx.game.setFlag('prayed', true);
      ctx.ui.toast('铃声清脆。许了个愿。');
      ctx.game.npcs.bump('suzuki', 3);
    },
  });
  // 绘马架
  {
    const ex = hx + 4.6, ez = hz + 3.2, ey = heightAt(ex, ez);
    addBox(g, M().woodDark, 2.6, 1.5, 0.1, ex, ey + 0.75, ez);
    for (let i = 0; i < 4; i++) {
      const ema = addBox(g, M().paper, 0.4, 0.5, 0.03, ex - 0.9 + i * 0.6, ey + 1.35, ez + 0.05, { ry: rand(-0.1, 0.1) });
    }
    ctx.interactables.push({
      pos: new THREE.Vector3(ex, ey, ez + 1.2), radius: 2.0, label: () => '写绘马', prompt: () => '写一块绘马',
      enabled: () => true,
      onUse: async () => {
        const wish = await ctx.ui.choice('写下愿望', [
          { text: '希望奶奶身体健康', value: 'health' },
          { text: '希望明年樱花也好看', value: 'sakura' },
          { text: '希望小镇一直这样', value: 'town' },
          { text: '算了，不写了', value: null },
        ]);
        if (!wish) return;
        ctx.audio.itemGet();
        ctx.game.setFlag('ema', wish);
        ctx.ui.toast('把绘马挂了上去');
      },
    });
  }
  // 社名札
  sign(g, '稲荷神社', hx, hy + 3.3, hz + 3.4, Math.PI, { w: 2.2, h: 0.6, bg: '#f7f3ea', fg: '#7a4a3a' });
  g.add(hall);
  // 拜殿周围樱花与柴鱼
  for (const [bx, bz] of [[56, 62], [68, 62], [70, 72], [55, 74], [66, 78]]) {
    addSphere(g, M().sakura, rand(0.8, 1.2), bx, heightAt(bx, bz) + 0.5, bz, { seg: 7, sy: 0.7 });
  }
  // 眺望长椅
  const vbx = 73, vbz = 61, vby = heightAt(vbx, vbz);
  bench(g, vbx, vbz, -Math.PI / 2);
  ctx.interactables.push({
    pos: new THREE.Vector3(vbx, vby + 0.5, vbz + 1.0), radius: 1.8, label: () => '眺望小镇', prompt: () => '眺望小镇',
    enabled: () => true,
    onUse: async () => {
      ctx.game.player.sit(new THREE.Vector3(vbx, vby, vbz + 0.6), 0);
      await ctx.ui.say('眺望', ['从山上望下去：', '商店街的拱廊、铁道、河边的樱桥，还有远远的学校。', '傍晚的话，这里的夜樱最好看。']);
      ctx.game.setFlag('viewpoint', true);
    },
  });
  // 后山小径（通往观景点）
  addPlane(g, M().dirt, 2.2, 16, 76, 0, 84, { uv: 0.2 });

  ctx.scene.add(g);
  return { group: g, lanterns };
}

/* ==================== 公园 ==================== */

function park(ctx) {
  const g = new THREE.Group();
  // 水池
  const pond = { x: -24, z: 42, r: 6.2 };
  const pondY = -0.25;
  const waterMat = M().water.clone();
  waterMat.map = M().water.map.clone();
  waterMat.map.needsUpdate = true;
  const pondMesh = new THREE.Mesh(new THREE.CircleGeometry(pond.r, 28), waterMat);
  pondMesh.rotation.x = -Math.PI / 2;
  pondMesh.position.set(pond.x, pondY, pond.z);
  g.add(pondMesh);
  // 池畔土堤
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * TAU;
    addSphere(g, M().rock, rand(0.25, 0.6), pond.x + Math.cos(a) * (pond.r + 0.7), 0.05, pond.z + Math.sin(a) * (pond.r + 0.7), { seg: 5, flat: true });
  }
  // 鸭子（动画）
  const ducks = [];
  for (let i = 0; i < 2; i++) {
    const d = new THREE.Group();
    addSphere(d, M().white, 0.22, 0, 0, 0, { seg: 7, sx: 1.3, sy: 0.8, sz: 1 });
    addSphere(d, M().white, 0.12, 0.26, 0.14, 0, { seg: 6 });
    addSphere(d, M().woodRed, 0.05, 0.36, 0.12, 0, { seg: 4, sx: 1.6, sy: 0.7, sz: 0.7 });
    d.userData.phase = i * Math.PI;
    g.add(d);
    ducks.push(d);
  }
  // 睡莲
  for (let i = 0; i < 7; i++) {
    const a = rand(TAU), rr = rand(1.5, pond.r - 1.2);
    addSphere(g, M().leafGreen, rand(0.2, 0.35), pond.x + Math.cos(a) * rr, pondY + 0.02, pond.z + Math.sin(a) * rr, { seg: 5, sy: 0.15 });
  }

  // 长椅（4）
  const benchSpots = [[-8, 30, Math.PI / 2], [-34, 40, 0], [-12, 50, Math.PI], [-32, 50, 0]];
  for (const [bx, bz, ry] of benchSpots) {
    bench(g, bx, bz, ry);
    ctx.interactables.push({
      pos: new THREE.Vector3(bx, 0.5, bz), radius: 1.8, label: () => '坐下', prompt: () => '坐下看看',
      enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(bx, 0, bz + (ry === 0 ? -0.5 : ry === Math.PI ? 0.5 : 0)), ry),
    });
  }
  // 儿童设施
  {
    const sx = -12, sz = 33;
    for (const dx of [-1.1, 1.1]) addCyl(g, M().steelDark, 0.05, 0.05, 2.2, sx + dx, 1.1, sz, { seg: 5 });
    addBox(g, M().steelDark, 2.6, 0.09, 0.09, sx, 2.2, sz);
    for (const dx of [-0.65, 0.65]) {
      addBox(g, M().steelDark, 0.03, 1.2, 0.03, sx + dx, 1.6, sz);
      addBox(g, M().sakuraDeep, 0.45, 0.05, 0.22, sx + dx, 1.0, sz);
    }
    ctx.interactables.push({
      pos: new THREE.Vector3(sx, 0.8, sz + 1.1), radius: 2.0, label: () => '荡秋千', prompt: () => '荡秋千',
      enabled: () => true, onUse: () => { ctx.audio.blip(); ctx.ui.toast('秋千吱呀吱呀地响。'); },
    });
  }
  {
    const sx = -30, sz = 30;
    addBox(g, M().steelDark, 0.9, 1.1, 0.9, sx, 0.55, sz);
    addBox(g, M().sakura, 1.0, 0.08, 1.0, sx, 1.15, sz);
    addBox(g, M().sakuraDeep, 0.65, 0.05, 2.0, sx, 1.0, sz + 1.2, { rx: -0.5 });
    ctx.interactables.push({
      pos: new THREE.Vector3(sx, 0.8, sz + 1.5), radius: 2.0, label: () => '玩滑梯', prompt: () => '玩滑梯',
      enabled: () => true, onUse: () => { ctx.audio.blip(); ctx.ui.toast('呲溜——！'); },
    });
  }
  // 跷跷板
  {
    const sx = -18, sz = 28;
    addBox(g, M().woodRed, 2.6, 0.1, 0.3, sx, 0.6, sz, { rz: 0.12 });
    addCyl(g, M().steelDark, 0.1, 0.1, 0.6, sx, 0.3, sz, { seg: 6 });
    ctx.interactables.push({
      pos: new THREE.Vector3(sx, 0.5, sz + 0.9), radius: 1.9, label: () => '玩跷跷板', prompt: () => '玩跷跷板',
      enabled: () => true, onUse: () => { ctx.audio.blip(); ctx.ui.toast('一个人玩不起来，但摇了摇。'); },
    });
  }
  // 自动售货机与垃圾桶
  vendingMachine(g, ctx.interactables, ctx.audio, ctx.game, -36, 52, Math.PI / 2);
  trashBin(g, -10, 30);
  planter(g, -36, 44, { big: true });
  const hat = new THREE.Group();
  const hatY = heightAt(-16, 46);
  addSphere(hat, M().sakuraPale, 0.22, 0, 0.22, 0, { seg: 7, sy: 0.7 });
  addCyl(hat, M().white, 0.23, 0.23, 0.06, 0, 0.06, 0, { seg: 10 });
  hat.position.set(-16, hatY, 46);
  g.add(hat);
  ctx.interactables.push({
    pos: new THREE.Vector3(-16, hatY + 0.5, 46), radius: 1.8,
    label: () => '捡起帽子', prompt: () => '捡起帽子',
    enabled: () => ctx.game.quests.isActive('hat'),
    onUse: () => {
      ctx.game.addItem('hat', '小雪的帽子');
      ctx.audio.itemGet();
      hat.visible = false;
      ctx.ui.toast('捡到了一顶草帽（去找小雪吧）');
      ctx.game.quests.notify('hat');
    },
  });
  trashBin(g, -10, 30);
  planter(g, -36, 44, { big: true });

  ctx.scene.add(g);
  return {
    group: g, pond, ducks,
    update(dt, t) {
      for (const d of ducks) {
        const a = t * 0.25 + d.userData.phase;
        const rr = pond.r * 0.55;
        d.position.set(pond.x + Math.cos(a) * rr, pondY + 0.06, pond.z + Math.sin(a) * rr);
        d.rotation.y = -a - Math.PI / 2;
      }
      waterMat.map.offset.x = Math.sin(t * 0.3) * 0.02;
    },
  };
}

/* ==================== 河桥 ==================== */

function bridge(ctx) {
  const g = new THREE.Group();
  const z = 30;
  const rx = riverX(z);
  const deckY = 1.25;
  const half = 9;
  // 桥面
  addBox(g, M().concrete, half * 2, 0.3, 5.2, rx, deckY, z, { cast: true });
  // 栏杆
  for (const s of [-1, 1]) {
    addBox(g, M().steelDark, half * 2, 0.08, 0.08, rx, deckY + 0.85, z + s * 2.5);
    for (let i = -4; i <= 4; i++) addCyl(g, M().steelDark, 0.045, 0.045, 0.85, rx + i * 2.1, deckY + 0.45, z + s * 2.5, { seg: 5 });
  }
  // 桥墩
  for (const px of [rx - 5, rx + 5]) addBox(g, M().concrete, 0.8, 2.6, 3.4, px, -0.3, z);
  // 引桥（可走）
  for (const s of [-1, 1]) {
    addBox(g, M().concrete, 5.0, 0.3, 5.2, rx + s * (half + 2.5), 0.62, z, { rx: s * -0.24, cast: true });
    ctx.walkables.push({ minX: Math.min(rx + s * half, rx + s * (half + 5)), maxX: Math.max(rx + s * half, rx + s * (half + 5)), minZ: z - 2.6, maxZ: z + 2.6, y: 0.6 });
  }
  ctx.walkables.push({ minX: rx - half, maxX: rx + half, minZ: z - 2.6, maxZ: z + 2.6, y: deckY });
  // 桥名牌
  sign(g, '桜橋', rx, deckY + 1.3, z - 2.8, 0, { w: 1.2, h: 0.4, bg: '#f7f3ea', fg: '#2b3a67' });
  // 路灯
  for (const px of [rx - 6, rx + 6]) {
    addCyl(g, M().steelDark, 0.07, 0.09, 3.6, px, 1.8, z + 2.9, { seg: 6 });
    const bulb = addSphere(g, M().lampGlow, 0.16, px, 3.7, z + 2.9, { seg: 6 });
    ctx.lights.push({ mesh: bulb, from: 17.6, to: 5.8 });
    const sp = glowSprite(ctx, px, 3.7, z + 2.9, 3.6, 0.5);
    ctx.lights.push({ mesh: sp, from: 17.6, to: 5.8, sprite: true, opacity: 0.5 });
  }
  ctx.scene.add(g);
  return { group: g };
}

/* ==================== 组装 ==================== */

export function buildShrinePark(ctx) {
  return {
    shrine: shrine(ctx),
    park: park(ctx),
    bridge: bridge(ctx),
  };
}
