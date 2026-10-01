// 住宅区：铃木家（可进入，玩家据点）+ 田中家等住宅外观
import * as THREE from 'three';
import {
  addBox, addCyl, addSphere, addPlane, canvasTexture, rand, TAU, pick, chance,
} from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import {
  wallX, wallZ, window_, shopWindow, doorway, roof, sign, noren,
  bench, trashBin, aircon, planter, bicycle, car, laundry, utilityPole, stoneLantern, torii, postBox,
} from './Buildings.js';
import { heightAt } from './Terrain.js';
import { registerDoor } from './Buildings.js';

const M = () => getMaterials();

/** 障子门（内部门，可开合） */
function shojiDoor(g, x, z, ry, w = 1.7, h = 2.0, label = '拉门') {
  const grp = new THREE.Group();
  grp.position.set(x, 0, z); grp.rotation.y = ry;
  const panel = addBox(grp, M().wood, w - 0.06, h - 0.08, 0.05, 0, h / 2, 0);
  // 格栅
  for (let i = 1; i < 4; i++) addBox(grp, M().paper, w - 0.5, (h - 0.4) / 4, 0.02, 0, h * (i / 4), 0.04);
  grp.userData.door = true;
  const door = {
    open: false, panel, baseX: panel.position.x, alongX: ry === 0 || Math.abs(ry) === Math.PI,
    toggle() { door.open = !door.open; return door.open; },
    update(dt) {
      const t = door._t = door._t === undefined ? 0 : door._t + ((door.open ? 1 : 0) - door._t) * Math.min(1, 7 * dt);
      panel.position.x = door.baseX - t * (w * 0.62);
      if (door.col) door.col.disabled = t > 0.5;
    },
  };
  if (door.alongX) {
    door.col = { minX: x - w / 2, maxX: x + w / 2, minZ: z - 0.15, maxZ: z + 0.15, door: true, disabled: false };
  } else {
    door.col = { minX: x - 0.15, maxX: x + 0.15, minZ: z - w / 2, maxZ: z + w / 2, door: true, disabled: false };
  }
  door.pos = new THREE.Vector3(x, 0, z);
  registerDoor(door);
  return { group: grp, door };
}

/* ==================== 铃木家（可进入） ==================== */

function suzukiHouse(ctx) {
  const g = new THREE.Group();
  const X0 = 30, X1 = 46, Z0 = 46, Z1 = 60;
  const W = X1 - X0, D = Z1 - Z0, H = 3.0;
  const cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2;
  const doors = [];

  // ---- 外观：土墙 + 木格 + 瓦顶 ----
  addPlane(g, M().wood, W - 0.4, D - 0.4, cx, 0.1, cz, { uv: 0.3 });
  wallX(g, ctx.colliders, M().plasterWarm, cx, Z1, W, H, 0.3, 0.2, { at: 0.5, w: 1.8, h: 2.1 });
  wallX(g, ctx.colliders, M().plasterWarm, cx, Z0, W, H, 0.3, 0.2, { at: 0.75, w: 1.6, h: 2.0 });
  wallZ(g, ctx.colliders, M().plasterWarm, X0, cz, D, H, 0.3, 0.2);
  wallZ(g, ctx.colliders, M().plasterWarm, X1, cz, D, H, 0.3, 0.2);
  // 木格栅装饰（土墙家的筋骨）
  for (let x = X0 + 1; x < X1; x += 2.2) {
    addBox(g, M().woodDark, 0.12, H - 0.3, 0.1, x, H / 2, Z1 - 0.18, { cast: false });
    addBox(g, M().woodDark, 0.12, H - 0.3, 0.1, x, H / 2, Z0 + 0.18, { cast: false });
  }
  window_(g, ctx.lights, X0 + 3.5, 1.6, Z1 - 0.05, 0, 1.8, 1.2);
  window_(g, ctx.lights, X1 - 3.5, 1.6, Z0 + 0.05, 0, 1.8, 1.2);
  window_(g, ctx.lights, X0 - 0.05, 1.6, cz + 2, -Math.PI / 2, 1.6, 1.2);
  const roofG = roof(g, cx, cz, W, D, 1.7, H + 0.3, M().tileRoofBrown, { overhang: 1.0 });
  sign(g, '鈴木', cx + 5.5, 2.3, Z1 - 0.12, Math.PI, { w: 0.55, h: 0.9, vertical: true, bg: '#f7f3ea', fg: '#2b3a67' });
  // 檐下风铃
  const windchime = addSphere(g, M().glass, 0.07, cx - 4, H - 0.5, Z1 + 0.5, { seg: 6 });
  windchime.userData.chime = true;

  // 大门 + 后门
  const frontDoor = doorway(g, ctx.colliders, ctx.interactables, cx, Z1, Math.PI, 1.8, 2.1, {
    label: '拉开拉门', mat: M().woodDark,
  });
  doors.push(frontDoor);
  const backDoor = doorway(g, ctx.colliders, ctx.interactables, X1 - 4, Z0, 0, 1.6, 2.0, {
    label: '后门', mat: M().woodDark,
  });
  doors.push(backDoor);

  // ---- 室内 ----
  // 玄关（下沉）
  addBox(g, M().concrete, 3.2, 0.14, 2.2, cx, 0.07, Z1 - 1.2, { cast: false });
  addBox(g, M().wood, 0.9, 0.1, 1.0, cx - 1.2, 0.16, Z1 - 1.4);  // 放鞋处
  // 主室（榻榻米）
  addPlane(g, M().tatami, W - 3.4, D - 4.4, cx, 0.14, Z0 + 2.6, { uv: 0.32 });
  // 起居/卧室（西侧木地板）
  addPlane(g, M().plank, 4.4, 6.0, X0 + 2.6, 0.14, cz + 1, { uv: 0.3 });
  // 天花板
  addBox(g, M().white, W - 0.4, 0.1, D - 0.4, cx, H - 0.08, cz, { cast: false });
  // 内墙（分隔玄关/主室/卧室的矮隔断 + 障子）
  addBox(g, M().woodDark, W - 3.0, 0.06, 0.12, cx + 1.5, 0.17, Z1 - 2.4, { cast: false });
  const sd1 = shojiDoor(g, cx - 3.5, Z1 - 2.4, 0, 1.7, 2.0);
  g.add(sd1.group);
  doors.push(sd1.door);
  ctx.colliders.push(sd1.door.col);
  ctx.interactables.push({
    pos: new THREE.Vector3(cx - 3.5, 1, Z1 - 1.4), radius: 1.7, label: () => (sd1.door.open ? '关上隔扇' : '拉开隔扇'),
    prompt: () => (sd1.door.open ? '关上隔扇' : '拉开隔扇'), enabled: () => true,
    onUse: () => { sd1.door.toggle(); ctx.audio.doorSlide(sd1.door.open); },
  });
  const sd2 = shojiDoor(g, X0 + 4.7, cz - 0.5, Math.PI / 2, 1.6, 2.0);
  g.add(sd2.group);
  doors.push(sd2.door);
  ctx.colliders.push(sd2.door.col);
  ctx.interactables.push({
    pos: new THREE.Vector3(X0 + 3.4, 1, cz - 0.5), radius: 1.7, label: () => (sd2.door.open ? '关上隔扇' : '拉开隔扇'),
    prompt: () => (sd2.door.open ? '关上隔扇' : '拉开隔扇'), enabled: () => true,
    onUse: () => { sd2.door.toggle(); ctx.audio.doorSlide(sd2.door.open); },
  });

  // 被炉（暖桌）
  {
    const kx = cx + 1.5, kz = Z0 + 2.6;
    addBox(g, M().woodDark, 2.0, 0.35, 1.4, kx, 0.32, kz, { cast: true });
    addBox(g, M().fabric, 2.1, 0.06, 1.5, kx, 0.52, kz, { cast: false });
    const glowLeg = addSphere(g, M().lampGlow, 0.1, kx, 0.28, kz, { seg: 6 });
    ctx.lights.push({ mesh: glowLeg, from: 16, to: 24 });
    // 座垫
    for (const [dx, dz] of [[-0.9, 0], [0.9, 0], [0, -0.75], [0, 0.75]]) {
      addCyl(g, M().fabric, 0.28, 0.28, 0.1, kx + dx, 0.19, kz + dz, { seg: 10 });
    }
    ctx.interactables.push({
      pos: new THREE.Vector3(kx, 0.4, kz + 0.9), radius: 1.8, label: () => '钻进被炉', prompt: () => '钻进被炉',
      enabled: () => true,
      onUse: () => {
        ctx.game.player.sit(new THREE.Vector3(kx, 0, kz + 0.7), 0);
        ctx.ui.toast('暖洋洋的…橘子还没摆出来');
      },
    });
  }
  // 壁龛 + 挂轴 + 佛坛
  addBox(g, M().woodDark, 1.6, 0.1, 0.4, cx + 4.5, 1.1, Z0 + 0.35, { cast: false });
  const scroll = addBox(g, M().paper, 0.7, 1.5, 0.03, cx + 4.5, 1.9, Z0 + 0.3, { cast: false });
  ctx.interactables.push({
    pos: new THREE.Vector3(cx + 4.5, 1, Z0 + 1.2), radius: 1.8, label: () => '看一看挂轴', prompt: () => '看一看挂轴',
    enabled: () => true,
    onUse: async () => {
      await ctx.ui.say('挂轴', ['上面写着「桜」字，是爷爷生前写的。', '奶奶说，每年樱花盛开的时候，他就会来看。']);
    },
  });
  // 佛坛
  addBox(g, M().woodDark, 1.0, 0.9, 0.45, cx - 6.5, 0.6, Z0 + 0.4, { cast: true });
  addBox(g, M().gold, 0.2, 0.12, 0.05, cx - 6.5, 1.1, Z0 + 0.4);
  ctx.interactables.push({
    pos: new THREE.Vector3(cx - 6.5, 1, Z0 + 1.3), radius: 1.8, label: () => '合十双手', prompt: () => '合十双手',
    enabled: () => true,
    onUse: () => { ctx.audio.shrineBell(); ctx.ui.toast('双手合十，静默了一小会儿'); },
  });

  // 卧室：被褥 + 床（睡觉）
  addBox(g, M().fabric, 1.9, 0.28, 1.0, X0 + 2.6, 0.28, cz - 1.6, { cast: true });     // 被褥
  addBox(g, M().white, 0.5, 0.14, 0.32, X0 + 2.6, 0.49, cz - 2.0);
  ctx.interactables.push({
    pos: new THREE.Vector3(X0 + 2.6, 0.3, cz - 1.0), radius: 1.9, label: () => '睡一觉', prompt: () => '睡一觉（到次日早晨）',
    enabled: () => true,
    onUse: async () => {
      const yes = await ctx.ui.confirm('要睡一觉吗？', '时间会跳到第二天早上。');
      if (!yes) return;
      ctx.game.sleepUntilMorning();
    },
  });
  // 衣柜 + 镜子和梳妆台
  addBox(g, M().woodDark, 1.2, 1.9, 0.55, X0 + 1.0, 0.95, cz - 2.2, { cast: true });
  addBox(g, M().glass, 0.4, 0.9, 0.03, X0 + 2.9, 1.2, cz - 2.2);
  addBox(g, M().wood, 1.2, 0.06, 0.45, X0 + 2.9, 0.76, cz - 2.2);
  addCyl(g, M().woodRed, 0.2, 0.2, 0.45, X0 + 2.9, 0.22, cz - 2.2, { seg: 8 });

  // 厨房
  addBox(g, M().white, 3.6, 0.88, 0.6, X1 - 2.2, 0.44, Z0 + 0.9, { cast: true });
  addBox(g, M().steelDark, 0.7, 0.06, 0.5, X1 - 3.4, 0.92, Z0 + 0.9);   // 水槽
  addBox(g, M().steelDark, 0.6, 0.5, 0.55, X1 - 1.4, 1.15, Z0 + 0.9);   // 冰箱
  addBox(g, M().steelDark, 1.6, 0.05, 0.55, X1 - 2.4, 1.7, Z0 + 0.9);   // 吊柜
  // 餐桌（厨房旁）
  addBox(g, M().wood, 1.5, 0.07, 0.9, X1 - 2.4, 0.72, Z0 + 2.6, { cast: true });
  for (const [dx, dz] of [[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]]) {
    addCyl(g, M().woodDark, 0.05, 0.05, 0.7, X1 - 2.4 + dx, 0.35, Z0 + 2.6 + dz, { seg: 5 });
  }
  ctx.interactables.push({
    pos: new THREE.Vector3(X1 - 2.4, 0.4, Z0 + 3.2), radius: 1.7, label: () => '在餐桌坐下', prompt: () => '在餐桌坐下',
    enabled: () => true, onUse: () => ctx.game.player.sit(new THREE.Vector3(X1 - 2.4, 0, Z0 + 3.0), 0),
  });

  // 电视
  {
    const tx = X0 + 2.6, tz = cz + 3.6;
    addBox(g, M().black, 1.1, 0.7, 0.09, tx, 1.35, tz, { cast: true });
    addBox(g, M().woodDark, 1.0, 0.08, 0.4, tx, 0.98, tz);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x223344 });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.55), screenMat);
    screen.position.set(tx, 1.38, tz + 0.06);
    g.add(screen);
    tvScreen = screen;
    ctx.interactables.push({
      pos: new THREE.Vector3(tx, 1, tz + 1.1), radius: 1.9, label: () => '看电视', prompt: () => '看电视',
      enabled: () => true,
      onUse: async () => {
        ctx.audio.tv();
        await ctx.ui.say('电视', ['地方台正在播天气预报：', '「晚春的樱花，这周开得最好。周末在稻荷神社有赏花茶会。」']);
      },
    });
  }
  // 电灯开关 + 收音机
  ctx.interactables.push({
    pos: new THREE.Vector3(X1 - 1.0, 1.2, cz - 2.4), radius: 1.7, label: () => '电灯开关', prompt: () => '开灯 / 关灯',
    enabled: () => true,
    onUse: () => {
      ceilRec.manualOn = !ceilRec.manualOn;
      ctx.audio.blip();
      ctx.ui.toast(ceilRec.manualOn ? '灯亮了' : '灯暗了');
    },
  });
  ctx.interactables.push({
    pos: new THREE.Vector3(X0 + 4.9, 1.0, cz + 2.4), radius: 1.7, label: () => '打开收音机', prompt: () => '打开收音机',
    enabled: () => true,
    onUse: () => { ctx.audio.chime(); ctx.ui.toast('收音机里在放古老的流行歌'); },
  });
  // 冰箱
  ctx.interactables.push({
    pos: new THREE.Vector3(X1 - 1.4, 1, Z0 + 1.6), radius: 1.8, label: () => '打开冰箱', prompt: () => '打开冰箱',
    enabled: () => true,
    onUse: async () => {
      await ctx.ui.say('冰箱', ['里面有切好的西瓜、麦茶，还有给奶奶准备的药。', '（拿东西前要问过奶奶才行。）']);
    },
  });

  // 室内灯
  const roomLight = new THREE.PointLight(0xffd9a0, 0, 15, 2);
  roomLight.position.set(cx, 2.7, cz);
  g.add(roomLight);
  const ceiling = addSphere(g, M().lampGlow, 0.22, cx, 2.75, cz, { seg: 8 });
  const ceilRec = { mesh: ceiling, from: 17.2, to: 6.0, light: roomLight, lightOn: 18, lightOff: 0, manual: true, manualOn: false };
  ctx.lights.push(ceilRec);

  // ---- 庭院 ----
  laundry(g, X0 + 1.2, Z1 + 2.2, X0 + 4.4, Z1 + 2.2, 3.4, 3);
  planter(g, X1 - 0.8, Z1 + 1.2, { big: true });
  stoneLantern(g, X0 - 1.6, Z1 + 1.8);
  postBox(g, X0 + 6.5, Z1 + 1.2, Math.PI);
  ctx.interactables.push({
    pos: new THREE.Vector3(X0 + 6.5, 1, Z1 + 1.2), radius: 1.8, label: () => '查看信箱', prompt: () => '查看信箱',
    enabled: () => true,
    onUse: async () => {
      if (ctx.game.removeItem('letter')) {
        ctx.audio.itemGet();
        await ctx.ui.say('信箱', ['信箱里有一封奶奶写了很久的信。', '「把这个寄到邮局去吧。」']);
        ctx.game.addItem('letter', '奶奶的信');
        ctx.ui.toast('拿到了奶奶的信（去邮局寄掉吧）');
      } else if (ctx.game.flags.letterPosted) {
        await ctx.ui.say('信箱', ['空的。信应该已经到了吧。']);
      } else {
        await ctx.ui.say('信箱', ['信箱里只有广告传单。']);
      }
    },
  });
  bicycle(g, X1 + 1.6, Z1 + 1.4, 0.4, '#7a4a3a');
  trashBin(g, X0 - 1.2, Z0 - 1.2);
  utilityPole(g, X0 - 2.4, Z1 + 2.6, 8.0);

  ctx.scene.add(g);
  return {
    group: g, roof: roofG,
    footprint: { minX: X0 - 0.3, maxX: X1 + 0.3, minZ: Z0 - 0.3, maxZ: Z1 + 0.3 },
    doors,
    tvScreen,
  };
}

let tvScreen = null;

/* ==================== 普通住宅外观 ==================== */

function houseFacade(ctx, cfg) {
  const g = new THREE.Group();
  const { x0, x1, z0, z1, name, wall, roof: roofMat, doorX, garden = 'flowers', carSpot = false, signName = null } = cfg;
  const W = x1 - x0, D = z1 - z0, H = rand(2.9, 3.4);
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const wm = wall || pick([M().plaster, M().plasterWarm, M().plasterBlue]);

  addPlane(g, M().concrete, W + 0.6, D + 0.6, cx, 0.09, cz, { uv: 0.35 });
  wallX(g, ctx.colliders, wm, cx, z0, W, H, 0.26, 0.15, { at: 0.5, w: 1.4, h: 2.05 });
  wallX(g, ctx.colliders, wm, cx, z1, W, H, 0.26, 0.15);
  wallZ(g, ctx.colliders, wm, x0, cz, D, H, 0.26, 0.15);
  wallZ(g, ctx.colliders, wm, x1, cz, D, H, 0.26, 0.15);
  window_(g, ctx.lights, cx - 2.4, 1.6, z0 - 0.04, 0, 1.5, 1.15);
  window_(g, ctx.lights, cx + 2.4, 1.6, z0 - 0.04, 0, 1.5, 1.15);
  window_(g, ctx.lights, x0 - 0.04, 1.6, cz + 1.5, -Math.PI / 2, 1.4, 1.1);
  window_(g, ctx.lights, x1 + 0.04, 1.6, cz - 1.5, Math.PI / 2, 1.4, 1.1);
  roof(g, cx, cz, W, D, rand(1.2, 1.7), H + 0.25, roofMat || pick([M().tileRoof, M().tileRoofBrown, M().roofMetal]), { overhang: 0.7 });
  doorway(g, ctx.colliders, ctx.interactables, doorX || cx, z0, Math.PI, 1.4, 2.05, { label: `${name}的门`, mat: M().woodDark });
  if (signName) sign(g, signName, cx + 4, 2.1, z0 - 0.1, Math.PI, { w: 0.5, h: 0.8, vertical: true, bg: '#f7f3ea', fg: '#2b3a67' });
  aircon(g, x1 - 0.4, 2.2, z1 - 0.3, Math.PI);
  // 门牌
  addBox(g, M().white, 0.24, 0.16, 0.03, (doorX || cx) + 1.1, 1.5, z0 - 0.12, { cast: false });
  // 庭院
  if (garden === 'flowers') {
    for (let i = 0; i < 5; i++) {
      addSphere(g, chance() ? M().sakuraDeep : M().leafGreen, rand(0.16, 0.26), cx - 2.6 + i * 0.7, 0.3, z0 + 0.9, { seg: 6 });
    }
    planter(g, cx - 3.4, z0 + 0.6);
    planter(g, cx + 3.4, z0 + 0.6);
  } else if (garden === 'tree') {
    const t = new THREE.Group();
    addCyl(t, M().trunk, 0.12, 0.18, 2.4, cx - 3, 1.2, z0 + 1.0, { seg: 6 });
    addSphere(t, M().leafGreen, 1.1, cx - 3, 2.7, z0 + 1.0, { seg: 7 });
    g.add(t);
  } else if (garden === 'rock') {
    addSphere(g, M().rock, 0.5, cx - 3, 0.3, z0 + 0.8, { seg: 5, flat: true, sx: 1.3, sy: 0.8, sz: 1.1 });
    addSphere(g, M().rock, 0.3, cx + 3, 0.2, z0 + 0.8, { seg: 5, flat: true });
  }
  // 生活痕迹
  if (chance()) laundry(g, x0 + 0.8, z1 - 0.8, x0 + 3.2, z1 - 0.8, 3.2, 3);
  bicycle(g, x1 + 1.2, z0 + 1.2, rand(-0.3, 0.3), pick(['#2b3a67', '#d97a95', '#7a4a3a', '#5d8fe8']));
  if (carSpot) car(g, x0 - 2.6, cz, Math.PI / 2, pick(['#e8e4d8', '#7a8a9a', '#d9a441']));
  trashBin(g, x1 - 0.9, z0 + 1.0);
  // 门灯
  const bulb = addSphere(g, M().lampGlow, 0.1, (doorX || cx) + 1.4, 2.3, z0 + 0.1, { seg: 6 });
  ctx.lights.push({ mesh: bulb, from: 17.2, to: 6.0 });
  ctx.scene.add(g);
  return { group: g, footprint: { minX: x0, maxX: x1, minZ: z0, maxZ: z1 } };
}

/* ==================== 组装 ==================== */

export function buildResidential(ctx) {
  const out = {};
  out.suzuki = suzukiHouse(ctx);
  // 田中家（雪子的家，外观）
  out.tanaka = houseFacade(ctx, {
    x0: 58, x1: 74, z0: 8, z1: 22, name: '田中家', wall: M().plasterBlue,
    doorX: 66, garden: 'tree', signName: '田中', carSpot: true,
  });
  out.houseA = houseFacade(ctx, { x0: 58, x1: 74, z0: 30, z1: 42, name: '北本家', wall: M().plasterWarm, garden: 'flowers', signName: '北本' });
  out.houseB = houseFacade(ctx, { x0: 76, x1: 92, z0: 8, z1: 20, name: '山田家', garden: 'rock', carSpot: true, signName: '山田' });
  out.houseC = houseFacade(ctx, { x0: 76, x1: 92, z0: 30, z1: 42, name: '渡边家', wall: M().plasterWarm, garden: 'flowers', signName: '渡辺' });
  out.northA = houseFacade(ctx, { x0: 48, x1: 64, z0: -60, z1: -48, name: '森下家', garden: 'tree' });
  out.northB = houseFacade(ctx, { x0: -64, x1: -50, z0: -58, z1: -46, name: '佐藤家', wall: M().plasterBlue, garden: 'rock' });
  return out;
}

export function getTvScreen() { return tvScreen; }
