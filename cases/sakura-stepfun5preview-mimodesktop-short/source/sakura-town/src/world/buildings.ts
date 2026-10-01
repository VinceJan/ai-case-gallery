import * as THREE from 'three';
import type { BuildingSpec } from '../game/types';
import { forwardVector } from './layout';
import { createToonMaterial, MeshBuilder } from '../utils/geometry';
import {
  createNorenTexture,
  createSignTexture,
} from '../utils/textures';

export interface BoxCollider {
  x: number;
  z: number;
  hw: number;
  hd: number;
}

export interface BuildingVisual {
  spec: BuildingSpec;
  group: THREE.Group;
  collider: BoxCollider;
  /** 内装场景（不可进入的建筑为 null）。 */
  interior: THREE.Group | null;
  /** 内装本地坐标中门内落点。 */
  interiorEntry: THREE.Vector3 | null;
  /** 内装墙体碰撞盒（本地坐标）。 */
  interiorWalls: BoxCollider[];
  /** 内装世界坐标原点（所有建筑都有，不可进入者用于隐藏 NPC）。 */
  interiorOrigin: THREE.Vector3;
}

export interface BuildingFactoryContext {
  toonGradient: THREE.Texture;
  windowMaterial: THREE.MeshStandardMaterial;
  lampMaterial: THREE.MeshStandardMaterial;
  disposables: { dispose(): void }[];
}

const WALL_T = 0.24;

function makeToonMaterial(gradient: THREE.Texture): THREE.MeshToonMaterial {
  return createToonMaterial(gradient);
}

/** 四棱锥/四棱台屋顶（日式入母屋风格的简化）。 */
function addHipRoof(
  builder: MeshBuilder,
  w: number,
  d: number,
  height: number,
  y: number,
  color: string,
  rotY: number,
  overhang = 0.55,
  topScale = 0.35,
): void {
  const geo = new THREE.CylinderGeometry(
    Math.max(w, d) * topScale,
    Math.max(w, d) * 1.05,
    height,
    4,
  );
  geo.rotateY(Math.PI / 4);
  geo.scale((w / 2 + overhang) / (Math.max(w, d) * 0.72), 1, (d / 2 + overhang) / (Math.max(w, d) * 0.72));
  geo.translate(0, y + height / 2, 0);
  if (rotY !== 0) geo.rotateY(rotY);
  builder.addGeometry(geo, color);
  // 屋脊
  builder.addBox(Math.min(w, d) * 0.5, 0.16, Math.max(w, d) * 1.02, 0, y + height + 0.02, 0, color, rotY);
}

function addGableRoof(
  builder: MeshBuilder,
  w: number,
  d: number,
  height: number,
  y: number,
  color: string,
): void {
  const halfW = w / 2 + 0.4;
  const slope = Math.atan2(height, halfW);
  const len = Math.hypot(halfW, height);
  for (const sign of [-1, 1]) {
    const slab = new THREE.BoxGeometry(len, 0.14, d + 0.9);
    slab.rotateZ(sign * slope);
    slab.translate((sign * halfW) / 2, y + height / 2, 0);
    builder.addGeometry(slab, color);
  }
  // 屋脊
  builder.addBox(0.34, 0.14, d + 0.95, 0, y + height + 0.04, 0, color);
  // 山墙三角封堵（前后两端）
  const shape = new THREE.Shape();
  shape.moveTo(-halfW, 0);
  shape.lineTo(halfW, 0);
  shape.lineTo(0, height);
  shape.closePath();
  for (const sign of [-1, 1]) {
    const gable = new THREE.ShapeGeometry(shape);
    gable.rotateY(sign === 1 ? 0 : Math.PI);
    gable.translate(0, y, (sign * (d + 0.9)) / 2);
    builder.addGeometry(gable, color);
  }
}

function buildExterior(
  ctx: BuildingFactoryContext,
  spec: BuildingSpec,
): { group: THREE.Group; windows: THREE.Mesh[] } {
  const group = new THREE.Group();
  const builder = new MeshBuilder();
  const windows: THREE.Mesh[] = [];
  const { w, d, h } = spec;
  const p = spec.palette;

  // 台基
  builder.addBox(w + 0.5, 0.3, d + 0.5, 0, 0.15, 0, '#9a948a');
  // 墙体
  builder.addBox(w, h, d, 0, h / 2 + 0.3, 0, p.wall);
  // 木框架角线
  builder.addBox(w + 0.12, 0.18, d + 0.12, 0, 0.42, 0, p.trim);
  builder.addBox(w + 0.12, 0.18, d + 0.12, 0, h + 0.3, 0, p.trim);

  if (spec.kind === 'house' || spec.kind === 'bakery' || spec.kind === 'store' || spec.kind === 'cafe' || spec.kind === 'flower' || spec.kind === 'clinic') {
    addGableRoof(builder, w, d, h * 0.45, h + 0.22, p.roof);
  } else {
    addHipRoof(builder, w, d, h * 0.4, h + 0.22, p.roof, spec.rotY);
  }

  const f = forwardVector(spec.rotY);
  // 门（朝正面凹陷）
  const doorDepth = 0.35;
  builder.addBox(
    1.15,
    2.1,
    doorDepth,
    f.x * (d / 2 - doorDepth / 2 + 0.02),
    1.4,
    f.z * (d / 2 - doorDepth / 2 + 0.02),
    '#4a3a2c',
    spec.rotY,
  );
  // 门前台阶
  builder.addBox(1.7, 0.18, 0.8, f.x * (d / 2 + 0.5), 0.34, f.z * (d / 2 + 0.5), '#a8a29a', spec.rotY);

  if (spec.kind === 'house' && spec.enterable) {
    // 烟囱
    builder.addBox(0.7, 1.2, 0.7, w * 0.28, h + 0.9, d * 0.2, '#8a7a6a');
  }

  const geometry = builder.build();
  if (geometry) {
    const mesh = new THREE.Mesh(geometry, makeToonMaterial(ctx.toonGradient));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // 窗户（前墙两扇 + 侧墙一扇），共享夜灯材质
  const windowGeo = new THREE.BoxGeometry(1.25, 0.95, 0.1);
  const frameGeo = new THREE.BoxGeometry(1.5, 1.2, 0.06);
  const addWindow = (lx: number, lz: number, rotY: number): void => {
    const mesh = new THREE.Mesh(windowGeo, ctx.windowMaterial);
    mesh.position.set(lx, 1.85, lz);
    mesh.rotation.y = rotY;
    group.add(mesh);
    windows.push(mesh);
    const frame = new THREE.Mesh(frameGeo, makeToonMaterial(ctx.toonGradient));
    frame.position.set(lx, 1.85, lz);
    frame.rotation.y = rotY;
    group.add(frame);
  };
  const fx = f.x * (d / 2 + 0.04);
  const fz = f.z * (d / 2 + 0.04);
  addWindow(fx - f.z * 2.4, fz + f.x * 2.4, spec.rotY);
  addWindow(fx + f.z * 2.4, fz - f.x * 2.4, spec.rotY);
  // 侧墙窗（朝 ±x 或 ±z，取决于建筑朝向）
  addWindow(-f.z * (w / 2 + 0.04), f.x * (w / 2 + 0.04), spec.rotY + Math.PI / 2);

  // 店种差异细节
  if (spec.kind === 'bakery' || spec.kind === 'store' || spec.kind === 'cafe' || spec.kind === 'flower') {
    const labels: Record<string, [string, string, string]> = {
      bakery: ['面包', '#b0673a', '#f6e7d4'],
      store: ['杂货', '#3f6d5a', '#eef0e6'],
      cafe: ['咖啡', '#5b4a72', '#e9e4f2'],
      flower: ['花屋', '#c05b7a', '#fbe9ef'],
    };
    const [label, bg, fg] = labels[spec.kind];
    const signTex = createSignTexture(label, bg, fg);
    ctx.disposables.push(signTex);
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 1.05, 0.16),
      new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.6 }),
    );
    sign.position.set(f.x * (d / 2 + 0.14), h + 0.1, f.z * (d / 2 + 0.14));
    sign.rotation.y = spec.rotY;
    sign.castShadow = true;
    group.add(sign);

    // 暖帘
    const norenTex = createNorenTexture('営', bg);
    ctx.disposables.push(norenTex);
    const noren = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.0),
      new THREE.MeshStandardMaterial({ map: norenTex, roughness: 0.9, side: THREE.DoubleSide }),
    );
    noren.position.set(f.x * (d / 2 + 0.12), 2.55, f.z * (d / 2 + 0.12));
    noren.rotation.y = spec.rotY + Math.PI;
    group.add(noren);

    // 遮阳棚
    const awningBuilder = new MeshBuilder();
    awningBuilder.addBox(w * 0.8, 0.1, 1.5, 0, 0, 0, '#e8ded0');
    const awningGeo = awningBuilder.build();
    if (awningGeo) {
      const awning = new THREE.Mesh(awningGeo, makeToonMaterial(ctx.toonGradient));
      awning.position.set(f.x * (d / 2 + 0.9), 2.75, f.z * (d / 2 + 0.9));
      awning.rotation.y = spec.rotY;
      awning.castShadow = true;
      group.add(awning);
    }
  }

  if (spec.kind === 'clinic') {
    // 十字标识
    const cross = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.28, 0.08),
      new THREE.MeshStandardMaterial({ color: '#d84a3a', roughness: 0.5 }),
    );
    const cross2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.9, 0.08),
      new THREE.MeshStandardMaterial({ color: '#d84a3a', roughness: 0.5 }),
    );
    cross.position.set(f.x * (d / 2 + 0.1), h - 0.55, f.z * (d / 2 + 0.1));
    cross2.position.copy(cross.position);
    group.add(cross, cross2);
  }

  if (spec.kind === 'station') {
    // 站台雨棚
    const canopy = new MeshBuilder();
    canopy.addBox(10, 0.18, 5.5, 0, 0, 0, '#46536b');
    canopy.addBox(0.22, 2.6, 0.22, -4.6, -1.3, -2.4, '#5a6470');
    canopy.addBox(0.22, 2.6, 0.22, 4.6, -1.3, -2.4, '#5a6470');
    canopy.addBox(0.22, 2.6, 0.22, -4.6, -1.3, 2.4, '#5a6470');
    canopy.addBox(0.22, 2.6, 0.22, 4.6, -1.3, 2.4, '#5a6470');
    const canopyGeo = canopy.build();
    if (canopyGeo) {
      const canopyMesh = new THREE.Mesh(canopyGeo, makeToonMaterial(ctx.toonGradient));
      canopyMesh.position.set(0, 3.1, f.z * (d / 2 + 4));
      canopyMesh.castShadow = true;
      group.add(canopyMesh);
    }
    // 站牌
    const signTex = createSignTexture('樱花站', '#46536b', '#f2ead9');
    ctx.disposables.push(signTex);
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 1.0, 0.14),
      new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.6 }),
    );
    sign.position.set(0, h + 0.55, f.z * (d / 2 + 0.12));
    group.add(sign);
  }

  if (spec.kind === 'shrine') {
    const accent = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.5, 0.12),
      new THREE.MeshStandardMaterial({ color: '#a03d2e', roughness: 0.5 }),
    );
    accent.position.set(f.x * (d / 2 + 0.1), h + 0.5, f.z * (d / 2 + 0.1));
    accent.rotation.y = spec.rotY;
    group.add(accent);
  }

  group.position.set(spec.x, 0, spec.z);
  group.rotation.y = spec.rotY;
  return { group, windows };
}

/** 内装：参数化房间 + 按 kind 布置家具。 */
function buildInterior(
  ctx: BuildingFactoryContext,
  spec: BuildingSpec,
): { group: THREE.Group; entry: THREE.Vector3; walls: BoxCollider[] } {
  const group = new THREE.Group();
  const iw = spec.w - 2.2;
  const id = spec.d - 2.2;
  const ih = spec.h - 0.4;
  const builder = new MeshBuilder();
  const walls: BoxCollider[] = [];

  // 地板
  builder.addBox(iw, 0.1, id, 0, -0.05, 0, spec.kind === 'shrine' ? '#c8b878' : '#b08a5a');

  // 四面墙，正面留门洞
  const back = new THREE.BoxGeometry(iw, ih, WALL_T);
  back.translate(0, ih / 2, -id / 2);
  builder.addGeometry(back, '#e8e2d4');
  walls.push({ x: 0, z: -id / 2 - WALL_T / 2, hw: iw / 2, hd: WALL_T / 2 });

  const sideLen = id;
  for (const sign of [-1, 1]) {
    const wall = new THREE.BoxGeometry(WALL_T, ih, sideLen);
    wall.translate((sign * iw) / 2, ih / 2, 0);
    builder.addGeometry(wall, '#efe9dc');
    walls.push({ x: (sign * iw) / 2, z: 0, hw: WALL_T / 2, hd: sideLen / 2 });
  }

  const doorW = 1.4;
  const segLen = (iw - doorW) / 2;
  for (const sign of [-1, 1]) {
    const wall = new THREE.BoxGeometry(segLen, ih, WALL_T);
    wall.translate((sign * (doorW / 2 + segLen / 2)), ih / 2, id / 2);
    builder.addGeometry(wall, '#efe9dc');
    walls.push({ x: sign * (doorW / 2 + segLen / 2), z: id / 2 + WALL_T / 2, hw: segLen / 2, hd: WALL_T / 2 });
  }
  const lintel = new THREE.BoxGeometry(doorW, ih - 2.1, WALL_T);
  lintel.translate(0, 2.1 + (ih - 2.1) / 2, id / 2);
  builder.addGeometry(lintel, '#efe9dc');

  // 按 kind 布置
  const wood = '#9a6f45';
  const dark = '#6a4a30';
  switch (spec.kind) {
    case 'bakery': {
      builder.addBox(4.6, 1.05, 0.9, 0, 0.55, -id / 2 + 0.7, wood); // 柜台
      builder.addBox(4.6, 0.35, 1.1, 0, 1.15, -id / 2 + 0.75, '#c8a878');
      builder.addBox(2.4, 1.6, 0.6, -3.4, 0.85, -id / 2 + 0.5, dark); // 货架
      for (let i = 0; i < 3; i += 1) {
        builder.addBox(0.4, 0.3, 0.4, -4.2 + i * 0.8, 1.8, -id / 2 + 0.5, '#e8c85a');
      }
      builder.addBox(1.6, 1.8, 1.6, 3.4, 0.95, -id / 2 + 1.6, '#7a6a5a'); // 烤炉
      addTableSet(builder, -1.2, 2.2, wood);
      addTableSet(builder, 1.6, 2.6, wood);
      break;
    }
    case 'store': {
      builder.addBox(5.2, 1.0, 0.9, 0, 0.55, -id / 2 + 0.7, wood);
      for (let i = 0; i < 3; i += 1) {
        builder.addBox(3.6, 1.5, 0.55, -3.2 + i * 3.2, 0.8, -id / 2 + 0.55, dark);
        for (let j = 0; j < 3; j += 1) {
          builder.addBox(0.45, 0.4, 0.45, -4.2 + i * 3.2 + j * 0.8, 1.7, -id / 2 + 0.55, ['#d86a4a', '#4a8a5a', '#4a6ad8'][j]);
        }
      }
      builder.addBox(1.2, 2.0, 0.8, iw / 2 - 0.8, 1.05, -1.2, '#c8cfd8'); // 冰柜
      break;
    }
    case 'cafe': {
      builder.addBox(5.4, 1.1, 0.9, 0, 0.6, -id / 2 + 0.7, dark);
      addTableSet(builder, -1.6, 1.8, wood);
      addTableSet(builder, 1.8, 2.4, wood);
      addTableSet(builder, -0.4, 3.6, wood);
      builder.addBox(1.4, 0.9, 0.12, 3.6, 1.7, -id / 2 + 0.3, '#5b4a72'); // 菜单板
      break;
    }
    case 'flower': {
      builder.addBox(4.2, 1.0, 0.9, 0, 0.55, -id / 2 + 0.7, '#c8b8a0');
      const colors = ['#e09ab0', '#e8c85a', '#b8a8e0', '#f4f4f0'];
      for (let i = 0; i < 4; i += 1) {
        builder.addBox(0.9, 1.3, 0.5, -3 + i * 2, 0.7, -id / 2 + 0.6, '#a89070');
        builder.addSphere(0.32, -3 + i * 2, 1.55, -id / 2 + 0.6, colors[i % colors.length], 0.8);
        builder.addSphere(0.26, -3.2 + i * 2, 1.4, -id / 2 + 0.55, '#5a8a4a', 0.7);
      }
      break;
    }
    case 'clinic': {
      builder.addBox(1.1, 0.55, 2.1, -2.6, 0.3, 1.6, '#e8e8ea'); // 诊察床
      builder.addBox(0.9, 0.5, 0.6, -2.6, 0.85, 0.6, '#f4f4f6');
      builder.addBox(3.2, 1.4, 0.8, 1.8, 0.75, -id / 2 + 0.6, '#a8b0b8'); // 药柜
      builder.addBox(1.6, 0.75, 0.9, 1.8, 0.42, 1.8, '#8a929c'); // 办公桌
      break;
    }
    case 'station': {
      builder.addBox(1.0, 0.45, 2.4, -3.4, 0.25, 0.8, '#7a6a4f'); // 长椅
      builder.addBox(1.0, 0.45, 2.4, 3.4, 0.25, 0.8, '#7a6a4f');
      builder.addBox(1.2, 1.7, 0.6, 0, 0.9, -id / 2 + 0.5, '#3f5a7d'); // 售票机
      builder.addBox(2.6, 1.2, 0.1, 0, 2.2, id / 2 - 0.4, '#e8e2d4'); // 时刻表
      break;
    }
    case 'shrine': {
      builder.addBox(2.6, 0.9, 1.2, 0, 0.5, -id / 2 + 0.9, '#6a4a30'); // 祭坛
      builder.addBox(2.2, 0.14, 0.8, 0, 1.0, -id / 2 + 0.9, '#a03d2e');
      builder.addBox(0.5, 0.5, 0.5, 0, 1.3, -id / 2 + 0.9, '#d8b048'); // 供品盒
      builder.addCylinder(0.16, 0.16, 1.6, -1.6, 0.85, 0, '#d8d0c0', 8); // 注连绳
      builder.addCylinder(0.2, 0.2, 0.5, 1.6, 0.3, 0.6, '#8a7a5a', 8); // 香炉
      break;
    }
    default: {
      // 住宅：床 + 桌 + 矮柜
      builder.addBox(1.15, 0.5, 2.1, -2.4, 0.3, id / 2 - 1.3, '#c8b8a0');
      builder.addBox(1.2, 0.18, 2.15, -2.4, 0.6, id / 2 - 1.3, '#f0ece0');
      builder.addBox(0.5, 0.45, 0.4, -2.4, 0.72, id / 2 - 2.1, '#8a7a9a');
      addTableSet(builder, 1.6, -0.6, wood);
      builder.addBox(1.5, 1.1, 0.5, iw / 2 - 1.0, 0.6, -id / 2 + 0.45, dark); // 柜
      builder.addBox(1.2, 0.06, 1.2, 1.6, 0.75, -0.6, '#e8e2d4'); // 桌上杯
      break;
    }
  }

  // 室内灯（自发光球 + 线吊）
  for (const [lx, lz] of [
    [-iw / 4, 0],
    [iw / 4, 0],
  ] as [number, number][]) {
    builder.addCylinder(0.03, 0.03, ih * 0.35, lx, ih * 0.82, lz, '#5a4a3a', 6);
  }

  const geometry = builder.build();
  if (geometry) {
    const mesh = new THREE.Mesh(geometry, makeToonMaterial(ctx.toonGradient));
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);
  }

  // 灯泡（夜灯材质，白天也柔和发光）
  for (const [lx, lz] of [
    [-iw / 4, 0],
    [iw / 4, 0],
  ] as [number, number][]) {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), ctx.lampMaterial);
    bulb.position.set(lx, ih * 0.62, lz);
    group.add(bulb);
  }

  group.position.set(0, 0, 0);
  const entry = new THREE.Vector3(0, 0, id / 2 - 0.9);
  return { group, entry, walls };
}

function addTableSet(builder: MeshBuilder, x: number, z: number, wood: string): void {
  builder.addBox(1.1, 0.09, 1.1, x, 0.72, z, wood);
  builder.addBox(0.1, 0.72, 0.1, x - 0.48, 0.36, z - 0.48, '#7a5a3a');
  builder.addBox(0.1, 0.72, 0.1, x + 0.48, 0.36, z - 0.48, '#7a5a3a');
  builder.addBox(0.1, 0.72, 0.1, x - 0.48, 0.36, z + 0.48, '#7a5a3a');
  builder.addBox(0.1, 0.72, 0.1, x + 0.48, 0.36, z + 0.48, '#7a5a3a');
  builder.addBox(0.42, 0.45, 0.42, x + 0.85, 0.24, z - 0.3, '#8a6a4a');
  builder.addBox(0.42, 0.45, 0.42, x - 0.85, 0.24, z + 0.3, '#8a6a4a');
}

export function createBuildingVisual(
  ctx: BuildingFactoryContext,
  spec: BuildingSpec,
  interiorOrigin: THREE.Vector3,
): BuildingVisual {
  const { group } = buildExterior(ctx, spec);
  let interior: THREE.Group | null = null;
  let interiorEntry: THREE.Vector3 | null = null;
  let interiorWalls: BoxCollider[] = [];

  if (spec.enterable) {
    const built = buildInterior(ctx, spec);
    interior = built.group;
    interiorEntry = built.entry;
    interiorWalls = built.walls;
    interior.position.copy(interiorOrigin);
  }

  const rotated = Math.abs(Math.cos(spec.rotY)) < 0.5;
  return {
    spec,
    group,
    collider: {
      x: spec.x,
      z: spec.z,
      hw: (rotated ? spec.d : spec.w) / 2,
      hd: (rotated ? spec.w : spec.d) / 2,
    },
    interior,
    interiorEntry,
    interiorWalls,
    interiorOrigin,
  };
}
