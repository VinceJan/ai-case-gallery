// 日式建筑构件库：墙、窗、门、屋顶、招牌、暖帘、空调外机、晾衣绳等
import * as THREE from 'three';
import { addBox, addCyl, addSphere, addPlane, canvasTexture, Tex, rand, TAU } from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';

const M = () => getMaterials();

/* ---------------- 门注册表（World 每帧更新动画/自动门） ---------------- */
const _doors = [];
export function allDoors() { return _doors; }
export function registerDoor(d) { _doors.push(d); }

/* ---------------- 墙体（带门洞） ---------------- */

/** 沿 X 轴的墙：中心 (cx,z)，长度 len，厚 t，高 h */
export function wallX(group, colliders, mat, cx, z, len, h, t = 0.24, y0 = 0, door = null) {
  if (door) {
    const d0 = cx - len / 2 + door.at * len - door.w / 2;
    const d1 = d0 + door.w;
    const a0 = cx - len / 2, a1 = cx + len / 2;
    const seg = (s0, s1) => {
      if (s1 - s0 <= 0.01) return;
      addBox(group, mat, s1 - s0, h, t, (s0 + s1) / 2, y0 + h / 2, z);
      colliders.push({ minX: s0 - t / 2, maxX: s1 + t / 2, minZ: z - t / 2, maxZ: z + t / 2 });
    };
    seg(a0, d0); seg(d1, a1);
    // 门楣
    if (door.h < h) addBox(group, mat, door.w, h - door.h, t, (d0 + d1) / 2, y0 + door.h + (h - door.h) / 2, z);
    return { cx: (d0 + d1) / 2, z, w: door.w, h: door.h };
  }
  addBox(group, mat, len, h, t, cx, y0 + h / 2, z);
  colliders.push({ minX: cx - len / 2 - t / 2, maxX: cx + len / 2 + t / 2, minZ: z - t / 2, maxZ: z + t / 2 });
  return null;
}

/** 沿 Z 轴的墙：中心 (x,cz) */
export function wallZ(group, colliders, mat, x, cz, len, h, t = 0.24, y0 = 0, door = null) {
  if (door) {
    const d0 = cz - len / 2 + door.at * len - door.w / 2;
    const d1 = d0 + door.w;
    const a0 = cz - len / 2, a1 = cz + len / 2;
    const seg = (s0, s1) => {
      if (s1 - s0 <= 0.01) return;
      addBox(group, mat, t, h, s1 - s0, x, y0 + h / 2, (s0 + s1) / 2);
      colliders.push({ minX: x - t / 2, maxX: x + t / 2, minZ: s0 - t / 2, maxZ: s1 + t / 2 });
    };
    seg(a0, d0); seg(d1, a1);
    if (door.h < h) addBox(group, mat, t, h - door.h, door.w, x, y0 + door.h + (h - door.h) / 2, (d0 + d1) / 2);
    return { cx: x, z: (d0 + d1) / 2, w: door.w, h: door.h };
  }
  addBox(group, mat, t, h, len, x, y0 + h / 2, cz);
  colliders.push({ minX: x - t / 2, maxX: x + t / 2, minZ: cz - len / 2 - t / 2, maxZ: cz + len / 2 + t / 2 });
  return null;
}

/* ---------------- 窗户 ---------------- */

/**
 * 日式玻璃窗：木框 + 玻璃 + 内侧障子。
 * lights: World 收集的夜间亮灯列表。
 */
export function window_(group, lights, x, y, z, ry, w = 1.3, h = 1.05, { lit = true, frame = null } = {}) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  const fm = frame || M().woodDark;
  // 外框
  addBox(g, fm, w + 0.14, 0.09, 0.16, 0, h / 2 + 0.05, 0);
  addBox(g, fm, w + 0.14, 0.09, 0.16, 0, -h / 2 - 0.05, 0);
  addBox(g, fm, 0.09, h + 0.14, 0.16, -w / 2 - 0.05, 0, 0);
  addBox(g, fm, 0.09, h + 0.14, 0.16, w / 2 + 0.05, 0, 0);
  addBox(g, fm, 0.05, h, 0.05, 0, 0, 0); // 中竖框
  // 玻璃
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M().glass);
  glass.position.set(0, 0, 0.02);
  g.add(glass);
  // 内侧障子（夜间发光）
  const shoji = new THREE.Mesh(
    new THREE.PlaneGeometry(w - 0.06, h - 0.06),
    lit ? M().glowWarm.clone() : M().paper.clone()
  );
  shoji.position.set(0, 0, -0.03);
  g.add(shoji);
  if (lit) lights.push({ mesh: shoji, from: 17.4, to: 5.6 });
  group.add(g);
  return g;
}

/** 铺面大橱窗（商店用） */
export function shopWindow(group, lights, x, y, z, ry, w, h) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  addBox(g, M().woodDark, w + 0.16, 0.12, 0.14, 0, h / 2 + 0.06, 0);
  addBox(g, M().woodDark, w + 0.16, 0.12, 0.14, 0, -h / 2 - 0.06, 0);
  addBox(g, M().woodDark, 0.12, h + 0.12, 0.14, -w / 2 - 0.06, 0, 0);
  addBox(g, M().woodDark, 0.12, h + 0.12, 0.14, w / 2 + 0.06, 0, 0);
  for (let i = 1; i < 3; i++) {
    addBox(g, M().woodDark, 0.06, h, 0.06, -w / 2 + (w / 3) * i, 0, 0);
  }
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M().glass);
  glass.position.z = 0.03;
  g.add(glass);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.1, h - 0.1), M().glowWarm.clone());
  glow.position.z = -0.03;
  g.add(glow);
  lights.push({ mesh: glow, from: 17.2, to: 5.8 });
  group.add(g);
  return g;
}

/* ---------------- 门 ---------------- */

/**
 * 日式拉门/玻璃自动门。返回 door 对象（可开合）。
 * ry: 0 表示门面朝 +Z。
 */
export function doorway(group, colliders, interactables, x, z, ry, w = 1.5, h = 2.15, {
  label = '门', auto = false, glassDoor = false, mat = null, onToggle = null, frameMat = null,
} = {}) {
  const m = mat || M().woodDark;
  const fm = frameMat || M().wood;
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = ry;
  // 门框
  addBox(g, fm, w + 0.3, 0.22, 0.34, 0, h + 0.11, 0);
  addBox(g, fm, 0.2, h + 0.22, 0.34, -w / 2 - 0.1, (h + 0.22) / 2 - 0.11, 0);
  addBox(g, fm, 0.2, h + 0.22, 0.34, w / 2 + 0.1, (h + 0.22) / 2 - 0.11, 0);
  // 门板（两扇，向两侧滑开）
  const panels = [];
  for (let i = 0; i < 2; i++) {
    const p = new THREE.Group();
    const pw = w / 2;
    if (glassDoor) {
      addBox(p, M().steelDark, pw - 0.04, h - 0.08, 0.06, 0, 0, 0);
      const gl = new THREE.Mesh(new THREE.PlaneGeometry(pw - 0.2, h - 0.5), M().glass);
      gl.position.z = 0.05;
      p.add(gl);
    } else {
      addBox(p, m, pw - 0.04, h - 0.1, 0.07, 0, 0, 0);
      // 格栅装饰
      for (let k = 1; k < 3; k++) addBox(p, M().paper, pw - 0.3, (h - 0.5) / 3, 0.02, 0, -h / 2 + 0.25 + k * (h - 0.5) / 3, 0.08);
    }
    p.position.set((i === 0 ? -1 : 1) * pw / 2, h / 2, 0);
    g.add(p);
    panels.push(p);
  }
  group.add(g);
  g.userData.door = true;

  // 门体碰撞（关闭时阻挡玩家与相机；开启后禁用）
  const col = {
    minX: x - w / 2 - 0.15, maxX: x + w / 2 + 0.15,
    minZ: z - 0.28, maxZ: z + 0.28,
    door: true, disabled: false,
  };
  colliders.push(col);

  const door = {
    open: false, auto, autoOpen: false, panels, baseX: [panels[0].position.x, panels[1].position.x], col,
    pos: new THREE.Vector3(x, 0, z),
    toggle() {
      door.open = !door.open;
      if (onToggle) onToggle(door.open);
      return door.open;
    },
  };
  door.update = (dt) => {
    const target = (door.autoOpen || door.open) ? 1 : 0;
    door._t = door._t === undefined ? (target ? 1 : 0) : door._t;
    door._t += (target - door._t) * Math.min(1, 8 * dt);
    panels[0].position.x = door.baseX[0] - door._t * (w / 2 + 0.02);
    panels[1].position.x = door.baseX[1] + door._t * (w / 2 + 0.02);
    col.disabled = door._t > 0.5;
  };
  interactables.push({
    pos: new THREE.Vector3(x, 1, z),
    radius: 2.2,
    label: () => (door.open ? '关门' : label),
    prompt: () => (door.open ? '关门' : label),
    enabled: () => !door.auto,
    onUse: () => { door.toggle(); },
  });
  _doors.push(door);
  return door;
}

/* ---------------- 屋顶 ---------------- */

/** 日式坡屋顶（庑殿顶）：屋脊 + 四坡 + 封底，双面材质保证受光正确 */
export function roof(group, x, z, w, d, h = 1.5, y = 2.9, mat = null, { overhang = 0.75, ridge = true } = {}) {
  const base = mat || M().tileRoof;
  const m = base.clone();
  m.side = THREE.DoubleSide;
  const g = new THREE.Group();
  g.position.set(x, y, z);
  const W = w / 2 + overhang, D = d / 2 + overhang;
  const rh = Math.min(0.4, d * 0.07);   // 屋脊半长

  const push = (arr, v) => arr.push(v[0], v[1], v[2]);
  const meshFrom = (verts, uvs, idx) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, m);
    mesh.castShadow = true;
    g.add(mesh);
    return mesh;
  };
  const quad = (a, b, c, dd) => {
    const v = [], uv = [];
    push(v, a); push(v, b); push(v, c); push(v, dd);
    uv.push(0, 0, 1, 0, 1, 1, 0, 1);
    return meshFrom(v, uv, [0, 1, 2, 0, 2, 3]);
  };
  const tri = (a, b, c) => {
    const v = [], uv = [];
    push(v, a); push(v, b); push(v, c);
    uv.push(0, 0, 1, 0, 0.5, 1);
    return meshFrom(v, uv, [0, 1, 2]);
  };

  const ridgeA = [0, h, -rh], ridgeB = [0, h, rh];
  const e0 = [-W, 0, -D], e1 = [W, 0, -D], e2 = [W, 0, D], e3 = [-W, 0, D];
  quad(ridgeA, e0, e1, ridgeB);          // 北坡
  quad(ridgeB, e2, e3, ridgeA);          // 南坡
  tri(e1, e2, ridgeB);                   // 东山墙坡
  tri(e3, e0, ridgeA);                   // 西山墙坡
  quad(e0, e3, e2, e1);                  // 封底

  // 屋脊
  if (ridge) {
    addBox(g, M().roofTileEdge, w + overhang * 2 + 0.25, 0.24, 0.46, 0, h + 0.08, 0);
    addBox(g, M().roofTileEdge, 0.46, 0.24, d + overhang * 2 + 0.25, 0, h + 0.08, 0);
  }
  // 檐口（厚边）
  addBox(g, M().woodDark, w + overhang * 2 + 0.3, 0.12, 0.3, 0, -0.04, -D - 0.02);
  addBox(g, M().woodDark, w + overhang * 2 + 0.3, 0.12, 0.3, 0, -0.04, D + 0.02);
  addBox(g, M().woodDark, 0.3, 0.12, d + overhang * 2 + 0.3, -W - 0.02, -0.04, 0);
  addBox(g, M().woodDark, 0.3, 0.12, d + overhang * 2 + 0.3, W + 0.02, -0.04, 0);
  // 正脊两端翘起（唐破风小装饰）
  addBox(g, M().roofTileEdge, 0.55, 0.1, 0.75, 0, h + 0.22, -D - 0.06, { rx: 0.32 });
  addBox(g, M().roofTileEdge, 0.55, 0.1, 0.75, 0, h + 0.22, D + 0.06, { rx: -0.32 });
  group.add(g);
  return g;
}

/* ---------------- 招牌 / 暖帘 ---------------- */

export function sign(group, text, x, y, z, ry, { w = 2.6, h = 0.75, vertical = false, bg = '#f7f3ea', fg = '#2b3a67', accent = '#d97a95', sub = '' } = {}) {
  const tex = Tex.sign(text, { w: vertical ? 128 : 512, h: vertical ? 512 : 128, bg, fg, vertical, accent, sub });
  const mat = new THREE.MeshToonMaterial({ map: tex });
  mat.gradientMap = M().paper.gradientMap;
  const geo = new THREE.PlaneGeometry(w, h);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  group.add(mesh);
  // 招牌底板
  addBox(group, M().woodDark, w + 0.18, h + 0.18, 0.08, x, y, z - 0.06 * Math.cos(ry), { ry });
  return mesh;
}

/** 暖帘（门帘） */
export function noren(group, text, x, y, z, ry, w = 1.5, h = 0.55) {
  const tex = Tex.noren('#2b3a67', text);
  const mat = new THREE.MeshToonMaterial({ map: tex, side: THREE.DoubleSide });
  mat.gradientMap = M().paper.gradientMap;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  group.add(mesh);
  addBox(group, M().woodDark, w + 0.15, 0.07, 0.07, x, y + h / 2 + 0.03, z + 0.04, { ry });
  return mesh;
}

/** 海报/公告板 */
export function posterBoard(group, title, lines, x, y, z, ry, w = 1.0, h = 1.3) {
  const tex = Tex.poster(title, lines, { w: 512, h: 640 });
  const mat = new THREE.MeshToonMaterial({ map: tex });
  mat.gradientMap = M().paper.gradientMap;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  group.add(mesh);
  addBox(group, M().woodDark, w + 0.12, h + 0.12, 0.05, x, y, z - 0.04 * Math.cos(ry), { ry });
  return mesh;
}

/* ---------------- 生活细节 ---------------- */

/** 空调外机 */
export function aircon(group, x, y, z, ry) {
  const g = new THREE.Group();
  g.position.set(x, y, z); g.rotation.y = ry;
  addBox(g, M().white, 0.72, 0.52, 0.3, 0, 0, 0);
  addBox(g, M().steelDark, 0.74, 0.06, 0.32, 0, -0.29, 0);
  addBox(g, M().steelDark, 0.6, 0.4, 0.03, 0, 0, -0.15);
  group.add(g);
  return g;
}

/** 晾衣绳 + 衣物 */
export function laundry(group, x0, z0, x1, z1, y = 4.2, count = 4) {
  const dx = x1 - x0, dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ry = Math.atan2(dx, dz);
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  addCyl(group, M().steelDark, 0.015, 0.015, len, cx, y, cz, { seg: 4, ry: ry + Math.PI / 2, cast: false });
  const colors = ['#e8e4d8', '#d9a441', '#8fb0d9', '#d97a95', '#f2f2f2'];
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const px = x0 + dx * t, pz = z0 + dz * t;
    const c = colors[i % colors.length];
    const mat = new THREE.MeshToonMaterial({ color: c });
    mat.gradientMap = M().paper.gradientMap;
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), mat);
    cloth.position.set(px, y - 0.42, pz);
    cloth.rotation.y = ry + Math.PI / 2;
    cloth.rotation.z = rand(-0.06, 0.06);
    group.add(cloth);
    addCyl(group, M().steelDark, 0.012, 0.012, 0.16, px, y - 0.06, pz, { seg: 4, cast: false });
  }
}

/** 花坛/盆栽 */
export function planter(group, x, z, { ry = 0, big = false } = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addBox(g, M().concrete, big ? 1.6 : 0.7, big ? 0.5 : 0.36, big ? 1.6 : 0.7, 0, (big ? 0.25 : 0.18), 0);
  const leafMat = chance_() ? M().leafGreen : M().sakuraDeep;
  for (let i = 0; i < (big ? 5 : 3); i++) {
    addSphere(g, leafMat, big ? 0.32 : 0.2, rand(-0.4, 0.4), big ? 0.62 : 0.44, rand(-0.4, 0.4), { seg: 6 });
  }
  group.add(g);
  return g;
}
function chance_() { return Math.random() < 0.6; }

/** 电线杆（带变压器与电线由 Props 统一拉） */
export function utilityPole(group, x, z, h = 8.5, { crossarm = true, transformer = false } = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  addCyl(g, M().woodDark, 0.14, 0.19, h, 0, h / 2, 0, { seg: 8 });
  if (crossarm) {
    addBox(g, M().woodDark, 1.7, 0.12, 0.12, 0, h - 1.2, 0);
    addBox(g, M().woodDark, 1.2, 0.1, 0.1, 0, h - 2.2, 0);
    for (let i = -1; i <= 1; i++) addCyl(g, M().steelDark, 0.05, 0.05, 0.16, i * 0.8, h - 1.2, 0, { seg: 5, cast: false });
  }
  if (transformer) addBox(g, M().steelDark, 0.4, 0.55, 0.3, 0.28, h - 2.8, 0);
  group.add(g);
  return { group: g, top: h - 1.2 };
}

/** 长椅 */
export function bench(group, x, z, ry = 0, { back = true } = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addBox(g, M().wood, 1.7, 0.08, 0.5, 0, 0.44, 0);
  if (back) addBox(g, M().wood, 1.7, 0.42, 0.07, 0, 0.68, -0.22);
  addBox(g, M().steelDark, 0.08, 0.44, 0.46, -0.72, 0.22, 0);
  addBox(g, M().steelDark, 0.08, 0.44, 0.46, 0.72, 0.22, 0);
  addBox(g, M().steelDark, 1.6, 0.06, 0.4, 0, 0.06, 0);
  group.add(g);
  return g;
}

/** 石灯笼（神社用） */
export function stoneLantern(group, x, z, { lit = false } = {}) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  addCyl(g, M().stone, 0.16, 0.22, 0.32, 0, 0.16, 0, { seg: 6 });
  addCyl(g, M().stone, 0.1, 0.1, 0.8, 0, 0.68, 0, { seg: 6 });
  addCyl(g, M().stone, 0.3, 0.24, 0.22, 0, 1.18, 0, { seg: 6 });
  addCyl(g, M().stone, 0.26, 0.26, 0.3, 0, 1.44, 0, { seg: 6 });
  addCyl(g, M().stone, 0.42, 0.3, 0.16, 0, 1.66, 0, { seg: 6 });
  addCyl(g, M().stone, 0.1, 0.14, 0.22, 0, 1.82, 0, { seg: 6 });
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), lit ? M().glowWarm.clone() : M().stone);
  light.position.y = 1.44;
  g.add(light);
  if (lit) light.userData.lantern = { from: 18.2, to: 5.8 };
  group.add(g);
  return { group: g, light };
}

/** 鸟居 */
export function torii(group, x, z, ry = 0, scale = 1, mat = null) {
  const m = mat || M().woodRed;
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  g.scale.setScalar(scale);
  addCyl(g, m, 0.16, 0.2, 3.4, -1.35, 1.7, 0, { seg: 8 });
  addCyl(g, m, 0.16, 0.2, 3.4, 1.35, 1.7, 0, { seg: 8 });
  addBox(g, m, 4.1, 0.22, 0.42, 0, 3.55, 0);
  addBox(g, m, 3.5, 0.16, 0.3, 0, 2.85, 0);
  addBox(g, m, 3.9, 0.1, 0.24, 0, 3.32, 0);
  group.add(g);
  return g;
}

/** 自动贩卖机（交互：购买饮料） */
export function vendingMachine(group, interactables, audio, game, x, z, ry = 0, kind = 'drink') {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addBox(g, M().steelDark, 1.0, 1.9, 0.62, 0, 0.95, 0);
  // 展示窗
  const winMat = new THREE.MeshToonMaterial({ color: 0x9fd4e8, transparent: true, opacity: 0.5 });
  winMat.gradientMap = M().paper.gradientMap;
  const win = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 1.15), winMat);
  win.position.set(0, 1.28, 0.32);
  g.add(win);
  // 商品
  const cols = ['#e85d5d', '#f2b53c', '#6fb56f', '#5d8fe8', '#e87bb0'];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.13, 8), new THREE.MeshToonMaterial({ color: cols[(r + c) % cols.length] }));
      can.rotation.x = Math.PI / 2;
      can.position.set(-0.3 + c * 0.15, 0.9 + r * 0.28, 0.34);
      g.add(can);
    }
  }
  // 投币口/出货口
  addBox(g, M().black, 0.3, 0.2, 0.05, 0.28, 0.55, 0.33);
  addBox(g, M().black, 0.42, 0.3, 0.06, 0, 0.32, 0.33);
  // 灯条
  const strip = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.06, 0.04), M().glowWarm.clone());
  strip.position.set(0, 1.93, 0.3);
  g.add(strip);
  strip.userData.lantern = { from: 17.2, to: 5.8 };
  // 底部
  addBox(g, M().black, 1.05, 0.1, 0.66, 0, 0.05, 0);
  group.add(g);

  interactables.push({
    pos: new THREE.Vector3(x, 1, z),
    radius: 2.4,
    label: () => '使用售货机',
    prompt: () => '使用售货机（￥120）',
    enabled: () => true,
    onUse: () => {
      if (game.coins < 120) {
        game.ui.toast('零钱不够了…');
        game.audio.blip();
        return;
      }
      game.coins -= 120;
      game.addItem('冰镇麦茶', 'item_tea');
      game.audio.thunk();
      setTimeout(() => game.audio.canDrop(), 350);
      game.ui.toast('买了一罐冰镇麦茶');
    },
  });
  return g;
}

/** 邮筒 */
export function postBox(group, x, z, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addCyl(g, M().woodDark, 0.09, 0.11, 1.0, 0, 0.5, 0, { seg: 8 });
  const body = addBox(g, M().steelDark, 0.42, 0.62, 0.42, 0, 1.42, 0);
  body.geometry = body.geometry;
  addBox(g, M().woodRed, 0.46, 0.1, 0.46, 0, 1.76, 0);
  addBox(g, M().black, 0.3, 0.06, 0.05, 0, 1.5, 0.22);
  group.add(g);
  return g;
}

/** 垃圾桶 */
export function trashBin(group, x, z, ry = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  addCyl(g, M().leafDark, 0.26, 0.22, 0.62, 0, 0.31, 0, { seg: 8 });
  addCyl(g, M().black, 0.28, 0.28, 0.05, 0, 0.64, 0, { seg: 8 });
  group.add(g);
  return g;
}

/** 自行车（靠墙停放） */
export function bicycle(group, x, z, ry = 0, color = '#2b3a67') {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  const mat = new THREE.MeshToonMaterial({ color });
  mat.gradientMap = M().paper.gradientMap;
  const wheel = (wx) => {
    const w = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.035, 6, 14), mat);
    w.position.set(wx, 0.31, 0);
    w.rotation.y = Math.PI / 2;
    g.add(w);
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.6, 4), M().steelDark);
    spoke.rotation.x = Math.PI / 2;
    spoke.position.set(wx, 0.31, 0);
    g.add(spoke);
  };
  wheel(-0.42); wheel(0.42);
  addBox(g, mat, 0.8, 0.06, 0.06, 0, 0.52, 0, { rz: 0.06 });
  addBox(g, M().black, 0.05, 0.42, 0.05, 0.3, 0.68, 0, { rz: -0.35 });
  addBox(g, M().black, 0.34, 0.06, 0.06, 0.34, 0.9, 0);
  addBox(g, M().black, 0.05, 0.3, 0.05, -0.3, 0.72, 0, { rz: 0.3 });
  addBox(g, M().steelDark, 0.3, 0.05, 0.08, 0.05, 0.42, 0.14);
  group.add(g);
  return g;
}

/** 小汽车 */
export function car(group, x, z, ry = 0, color = '#e8e4d8') {
  const g = new THREE.Group();
  g.position.set(x, 0, z); g.rotation.y = ry;
  const mat = new THREE.MeshToonMaterial({ color });
  mat.gradientMap = M().paper.gradientMap;
  addBox(g, mat, 1.78, 0.62, 3.9, 0, 0.62, 0, { cast: true });
  addBox(g, mat, 1.6, 0.5, 2.0, 0, 1.14, -0.1, { cast: true });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.42), M().glass);
  glass.position.set(0, 1.16, 0.92);
  g.add(glass);
  addBox(g, M().black, 1.84, 0.3, 4.0, 0, 0.32, 0);
  const wheel = (wx, wz) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 10), M().black);
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.3, wz);
    g.add(w);
  };
  wheel(-0.82, 1.25); wheel(0.82, 1.25); wheel(-0.82, -1.3); wheel(0.82, -1.3);
  const light = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.06), M().glowWarm.clone());
  light.position.set(-0.6, 0.68, 1.96);
  g.add(light);
  light.userData.lantern = { from: 17.2, to: 5.8 };
  group.add(g);
  return g;
}

/** 樱花花瓣粒子（晚春氛围） */
export function petalSystem(scene, area = { x: 0, z: 0, w: 170, d: 170 }, count = 420) {
  const tex = Tex.petal();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = area.x + rand(-area.w / 2, area.w / 2);
    pos[i * 3 + 1] = rand(1, 16);
    pos[i * 3 + 2] = area.z + rand(-area.d / 2, area.d / 2);
    seed[i] = rand(TAU);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const mat = new THREE.PointsMaterial({
    map: tex, size: 0.42, transparent: true, opacity: 0.9,
    depthWrite: false, color: 0xffd6e4, sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);
  let t = 0;
  return {
    points,
    update(dt, opts = {}) {
      const active = opts.rain < 0.3;
      const boost = opts.boost || 0;
      const targetOpacity = active ? 0.85 + boost * 0.15 : Math.max(0, mat.opacity - dt);
      mat.opacity += (targetOpacity - mat.opacity) * Math.min(1, 2 * dt);
      mat.size = 0.42 + boost * 0.5;
      if (!active && boost <= 0) return;
      t += dt * (1 + boost * 2);
      const p = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const s = seed[i];
        p[i * 3 + 1] -= dt * (0.55 + (s % 0.5));
        p[i * 3] += Math.sin(t * 1.4 + s * 9) * dt * 0.9 + dt * 0.35;
        p[i * 3 + 2] += Math.cos(t * 1.1 + s * 7) * dt * 0.7;
        if (p[i * 3 + 1] < 0.1) {
          p[i * 3] = area.x + rand(-area.w / 2, area.w / 2);
          p[i * 3 + 1] = rand(12, 18);
          p[i * 3 + 2] = area.z + rand(-area.d / 2, area.d / 2);
        }
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}
