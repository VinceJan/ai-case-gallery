import * as THREE from 'three';
import { Rng } from '../utils/random';
import { createToonMaterial, MeshBuilder } from '../utils/geometry';
import {
  createGlowTexture,
  createGroundTexture,
  createRoadTexture,
  createSignTexture,
} from '../utils/textures';
import {
  BUILDINGS,
  RAILWAY_Z,
  RIVER_X,
  ROAD_SEGMENTS,
  TRAIN_CROSSINGS,
} from './layout';
import type { BoxCollider } from './buildings';

export interface CircleCollider {
  x: number;
  z: number;
  r: number;
}

export interface CrossingGate {
  x: number;
  z: number;
  pivot: THREE.Object3D;
  /** 0=开，1=关。 */
  closed: number;
}

export interface PropKit {
  group: THREE.Group;
  colliders: BoxCollider[];
  treeColliders: CircleCollider[];
  gates: CrossingGate[];
  /** 夜间点亮材质（路灯头/自动售货机/灯笼）。 */
  nightMaterials: THREE.MeshStandardMaterial[];
  lampGlowPositions: THREE.Vector3[];
}

function pointSegmentDistance(
  px: number,
  pz: number,
  x1: number,
  z1: number,
  x2: number,
  z2: number,
): number {
  const dx = x2 - x1;
  const dz = z2 - z1;
  const lengthSq = dx * dx + dz * dz;
  if (lengthSq === 0) return Math.hypot(px - x1, pz - z1);
  let t = ((px - x1) * dx + (pz - z1) * dz) / lengthSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), pz - (z1 + t * dz));
}

export function createProps(
  toonGradient: THREE.Texture,
  rng: Rng,
): PropKit {
  const group = new THREE.Group();
  const colliders: BoxCollider[] = [];
  const treeColliders: CircleCollider[] = [];
  const gates: CrossingGate[] = [];
  const nightMaterials: THREE.MeshStandardMaterial[] = [];
  const lampGlowPositions: THREE.Vector3[] = [];
  const toon = (): THREE.MeshToonMaterial => createToonMaterial(toonGradient);

  // ---------- 地面 ----------
  const groundTex = createGroundTexture();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 240),
    new THREE.MeshStandardMaterial({ map: groundTex, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  group.add(ground);

  // ---------- 道路 ----------
  const roadTex = createRoadTexture();
  const roadBuilder = new MeshBuilder();
  for (const seg of ROAD_SEGMENTS) {
    const len = Math.hypot(seg.x2 - seg.x1, seg.z2 - seg.z1);
    const angle = Math.atan2(seg.x2 - seg.x1, seg.z2 - seg.z1);
    roadBuilder.addBox(seg.width, 0.06, len, (seg.x1 + seg.x2) / 2, 0.03, (seg.z1 + seg.z2) / 2, '#ffffff', angle);
  }
  const roadGeo = roadBuilder.build();
  if (roadGeo) {
    const roads = new THREE.Mesh(
      roadGeo,
      new THREE.MeshStandardMaterial({ map: roadTex, roughness: 0.9 }),
    );
    roads.receiveShadow = true;
    group.add(roads);
  }

  // ---------- 广场（圆形碎石地） ----------
  const plaza = new THREE.Mesh(
    new THREE.CylinderGeometry(9, 9.4, 0.12, 24),
    new THREE.MeshStandardMaterial({ color: '#cfc8b8', roughness: 0.95 }),
  );
  plaza.position.set(0, 0.06, 4);
  plaza.receiveShadow = true;
  group.add(plaza);

  // ---------- 铁路 ----------
  const railBuilder = new MeshBuilder();
  railBuilder.addBox(160, 0.3, 7, 0, 0.15, RAILWAY_Z, '#8a857c'); // 道砟
  for (const offset of [-0.75, 0.75]) {
    railBuilder.addBox(160, 0.16, 0.18, 0, 0.36, RAILWAY_Z + offset, '#5a564f');
  }
  // 枕木
  for (let x = -78; x <= 78; x += 1.1) {
    railBuilder.addBox(0.22, 0.1, 5.6, x, 0.3, RAILWAY_Z, '#4a4438');
  }
  const railGeo = railBuilder.build();
  if (railGeo) {
    const rails = new THREE.Mesh(railGeo, toon());
    rails.receiveShadow = true;
    group.add(rails);
  }

  // ---------- 平交口 ----------
  for (const cx of TRAIN_CROSSINGS) {
    const pivot = new THREE.Group();
    pivot.position.set(cx, 0, RAILWAY_Z - 3.2);
    const armBuilder = new MeshBuilder();
    armBuilder.addBox(0.14, 0.14, 5.2, 0, 0, 2.6, '#d8d4cc');
    for (let i = 0; i < 6; i += 1) {
      armBuilder.addBox(0.18, 0.18, 0.5, 0, 0, 0.7 + i * 0.82, i % 2 === 0 ? '#d84a3a' : '#e8e4dc');
    }
    const armGeo = armBuilder.build();
    if (armGeo) {
      const arm = new THREE.Mesh(armGeo, toon());
      arm.position.y = 1.05;
      arm.castShadow = true;
      pivot.add(arm);
    }
    const poleGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.1, 8);
    const pole = new THREE.Mesh(poleGeo, toon());
    pole.position.y = 0.55;
    pivot.add(pole);
    group.add(pivot);
    gates.push({ x: cx, z: RAILWAY_Z - 3.2, pivot, closed: 0 });

    // 警戒灯
    const lampMat = new THREE.MeshStandardMaterial({
      color: '#d84a3a',
      emissive: '#d84a3a',
      emissiveIntensity: 0.4,
      roughness: 0.4,
    });
    nightMaterials.push(lampMat);
    const warn = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), lampMat);
    warn.position.set(cx, 1.75, RAILWAY_Z - 3.2);
    group.add(warn);
  }

  // ---------- 站台 ----------
  const platformBuilder = new MeshBuilder();
  platformBuilder.addBox(9, 1.1, 4.5, -4, 0.55, RAILWAY_Z + 3.4, '#b8b2a6');
  platformBuilder.addBox(9.2, 0.12, 4.7, -4, 1.14, RAILWAY_Z + 3.4, '#cfc8b8');
  for (let i = 0; i < 4; i += 1) {
    platformBuilder.addBox(0.16, 0.5, 0.16, -7.6 + i * 2.4, 1.4, RAILWAY_Z + 1.6, '#7a7468');
  }
  const platformGeo = platformBuilder.build();
  if (platformGeo) {
    const platform = new THREE.Mesh(platformGeo, toon());
    platform.castShadow = true;
    platform.receiveShadow = true;
    group.add(platform);
  }
  colliders.push({ x: -4, z: RAILWAY_Z + 3.4, hw: 4.6, hd: 2.35 });

  // ---------- 河流与桥 ----------
  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 240),
    new THREE.MeshStandardMaterial({ color: '#7ab8d8', roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.9 }),
  );
  river.rotation.x = -Math.PI / 2;
  river.position.set(RIVER_X, 0.05, 0);
  group.add(river);

  const bridgeBuilder = new MeshBuilder();
  bridgeBuilder.addBox(14, 0.3, 6, RIVER_X, 0.5, 20, '#a8907a');
  bridgeBuilder.addBox(14, 0.35, 0.25, RIVER_X, 1.15, 16.9, '#8a6a4a');
  bridgeBuilder.addBox(14, 0.35, 0.25, RIVER_X, 1.15, 23.1, '#8a6a4a');
  for (let i = 0; i < 7; i += 1) {
    bridgeBuilder.addBox(0.14, 0.8, 0.14, RIVER_X - 6.5 + i * 2.17, 1.0, 16.9, '#8a6a4a');
    bridgeBuilder.addBox(0.14, 0.8, 0.14, RIVER_X - 6.5 + i * 2.17, 1.0, 23.1, '#8a6a4a');
  }
  const bridgeGeo = bridgeBuilder.build();
  if (bridgeGeo) {
    const bridge = new THREE.Mesh(bridgeGeo, toon());
    bridge.castShadow = true;
    group.add(bridge);
  }

  // ---------- 樱花树（实例化） ----------
  const treeSpots: { x: number; z: number; scale: number }[] = [];
  const isFree = (x: number, z: number, minDist: number): boolean => {
    for (const b of BUILDINGS) {
      const hw = Math.max(b.w, b.d) / 2 + minDist;
      if (Math.abs(x - b.x) < hw && Math.abs(z - b.z) < hw) return false;
    }
    for (const seg of ROAD_SEGMENTS) {
      if (pointSegmentDistance(x, z, seg.x1, seg.z1, seg.x2, seg.z2) < minDist) return false;
    }
    if (Math.abs(z - RAILWAY_Z) < 8) return false;
    if (Math.abs(x - RIVER_X) < 8) return false;
    return true;
  };

  // 广场大樱树
  treeSpots.push({ x: 0, z: 8, scale: 1.5 });
  // 神社后方樱花林（赏樱名所）
  for (let i = 0; i < 12; i += 1) {
    treeSpots.push({
      x: 54 + rng.range(-4, 8),
      z: 16 + rng.range(-8, 12),
      scale: rng.range(0.9, 1.3),
    });
  }
  // 商店街前
  for (let i = 0; i < 7; i += 1) {
    treeSpots.push({ x: -40 + i * 12 + rng.range(-2, 2), z: -8 + rng.range(-1, 1), scale: rng.range(0.85, 1.1) });
  }
  // 住宅街
  for (let i = 0; i < 6; i += 1) {
    treeSpots.push({ x: -34 + i * 14 + rng.range(-2, 2), z: 24 + rng.range(-1.5, 1.5), scale: rng.range(0.8, 1.05) });
  }
  // 散落
  let guard = 0;
  while (treeSpots.length < 34 && guard < 400) {
    guard += 1;
    const x = rng.range(-68, 68);
    const z = rng.range(-40, 56);
    if (!isFree(x, z, 4)) continue;
    if (treeSpots.some((t) => Math.hypot(t.x - x, t.z - z) < 7)) continue;
    treeSpots.push({ x, z, scale: rng.range(0.75, 1.15) });
  }

  const trunkGeo = new THREE.CylinderGeometry(0.22, 0.34, 2.6, 7);
  trunkGeo.translate(0, 1.3, 0);
  const canopyGeo = new THREE.IcosahedronGeometry(1.5, 1);
  canopyGeo.scale(1, 0.72, 1);

  const trunkMesh = new THREE.InstancedMesh(trunkGeo, toon(), treeSpots.length);
  const canopyShades = ['#f4c2d7', '#f7d3e2', '#eeb8cf', '#f9dde8'];
  const canopyMeshes = canopyShades.map(
    (color) => new THREE.InstancedMesh(canopyGeo, new THREE.MeshToonMaterial({ color, gradientMap: toonGradient }), treeSpots.length),
  );
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();
  treeSpots.forEach((spot, index) => {
    matrix.makeScale(spot.scale, spot.scale, spot.scale);
    matrix.setPosition(spot.x, 0, spot.z);
    trunkMesh.setMatrixAt(index, matrix);
    canopyMeshes.forEach((mesh, shade) => {
      mesh.setMatrixAt(index, matrix);
      if (shade === 0) {
        color.set(canopyShades[rng.int(canopyShades.length)]);
        mesh.setColorAt(index, color);
      }
    });
    treeColliders.push({ x: spot.x, z: spot.z, r: 0.5 * spot.scale });
  });
  trunkMesh.castShadow = true;
  for (const mesh of canopyMeshes) {
    mesh.castShadow = true;
    group.add(mesh);
  }
  group.add(trunkMesh);

  // ---------- 森林环带（深绿锥形树） ----------
  const forestSpots: { x: number; z: number; scale: number }[] = [];
  for (let i = 0; i < 90; i += 1) {
    const edge = rng.int(4);
    let x = 0;
    let z = 0;
    if (edge === 0) { x = rng.range(-84, 84); z = rng.range(-88, -74); }
    if (edge === 1) { x = rng.range(-84, 84); z = rng.range(64, 88); }
    if (edge === 2) { x = rng.range(-88, -74); z = rng.range(-70, 70); }
    if (edge === 3) { x = rng.range(80, 92); z = rng.range(-70, 70); }
    forestSpots.push({ x, z, scale: rng.range(1.2, 2.4) });
  }
  const pineGeo = new THREE.ConeGeometry(1.6, 4.2, 7);
  pineGeo.translate(0, 2.1, 0);
  const pineMesh = new THREE.InstancedMesh(pineGeo, new THREE.MeshToonMaterial({ color: '#4a7a52', gradientMap: toonGradient }), forestSpots.length);
  const pineTrunkGeo = new THREE.CylinderGeometry(0.16, 0.2, 1.2, 6);
  pineTrunkGeo.translate(0, 0.6, 0);
  const pineTrunkMesh = new THREE.InstancedMesh(pineTrunkGeo, toon(), forestSpots.length);
  forestSpots.forEach((spot, index) => {
    matrix.makeScale(spot.scale, spot.scale, spot.scale);
    matrix.setPosition(spot.x, 0, spot.z);
    pineMesh.setMatrixAt(index, matrix);
    pineTrunkMesh.setMatrixAt(index, matrix);
  });
  pineMesh.castShadow = true;
  group.add(pineMesh, pineTrunkMesh);

  // ---------- 路灯 ----------
  const lampSpots: [number, number][] = [
    [-34, -10], [-18, -10], [-2, -10], [14, -10], [30, -10],
    [-8, 0], [8, 0], [-8, 10], [8, 10],
    [-30, 16], [30, 16], [10, 8], [30, 8],
    [-52, -12], [-52, 30], [50, 0], [-20, -44], [12, -44],
  ];
  const lampPoleGeo = new THREE.CylinderGeometry(0.07, 0.09, 3.4, 6);
  lampPoleGeo.translate(0, 1.7, 0);
  const lampHeadGeo = new THREE.BoxGeometry(0.5, 0.18, 0.5);
  lampHeadGeo.translate(0, 3.45, 0);
  const lampMat = new THREE.MeshStandardMaterial({
    color: '#ffe9c0',
    emissive: '#ffd9a0',
    emissiveIntensity: 0,
    roughness: 0.4,
  });
  nightMaterials.push(lampMat);
  const poleMesh = new THREE.InstancedMesh(lampPoleGeo, toon(), lampSpots.length);
  const headMesh = new THREE.InstancedMesh(lampHeadGeo, lampMat, lampSpots.length);
  lampSpots.forEach(([x, z], index) => {
    matrix.makeScale(1, 1, 1);
    matrix.setPosition(x, 0, z);
    poleMesh.setMatrixAt(index, matrix);
    headMesh.setMatrixAt(index, matrix);
    lampGlowPositions.push(new THREE.Vector3(x, 3.5, z));
    colliders.push({ x, z, hw: 0.16, hd: 0.16 });
  });
  group.add(poleMesh, headMesh);

  // 路灯光晕（ Sprite 叠加 ）
  const glowTex = createGlowTexture();
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  for (const pos of lampGlowPositions) {
    const sprite = new THREE.Sprite(glowMat.clone());
    sprite.position.copy(pos);
    sprite.scale.setScalar(3.2);
    group.add(sprite);
  }

  // ---------- 长椅 ----------
  const benchSpots: [number, number, number][] = [
    [-5, 2, 0], [6, 2, Math.PI], [-2, -12, 0], [-4, -50, Math.PI / 2], [56, 14, Math.PI / 2], [46, 6, 0],
  ];
  const benchBuilder = new MeshBuilder();
  for (const [x, z, rotY] of benchSpots) {
    benchBuilder.addBox(0.55, 0.1, 1.8, x, 0.48, z, '#a58a5f', rotY);
    benchBuilder.addBox(0.55, 0.5, 0.12, x, 0.75, z - Math.cos(rotY) * 0.85, '#a58a5f', rotY);
    benchBuilder.addBox(0.12, 0.45, 0.12, x - Math.sin(rotY) * 0.7 + Math.cos(rotY) * 0.2, 0.24, z - Math.cos(rotY) * 0.7 - Math.sin(rotY) * 0.2, '#7a5f3f', rotY);
    benchBuilder.addBox(0.12, 0.45, 0.12, x + Math.sin(rotY) * 0.7 + Math.cos(rotY) * 0.2, 0.24, z - Math.cos(rotY) * 0.7 + Math.sin(rotY) * 0.2, '#7a5f3f', rotY);
  }
  const benchGeo = benchBuilder.build();
  if (benchGeo) {
    const benches = new THREE.Mesh(benchGeo, toon());
    benches.castShadow = true;
    group.add(benches);
    for (const [x, z] of benchSpots) colliders.push({ x, z, hw: 0.5, hd: 0.5 });
  }

  // ---------- 鸟居（神社参道） ----------
  const toriiSpots: [number, number, number][] = [
    [26, 8, 0],
    [40, 6, 0],
  ];
  for (const [x, z, scale] of toriiSpots.map(([tx, tz]) => [tx, tz, 1] as [number, number, number])) {
    const builder = new MeshBuilder();
    builder.addBox(0.42, 4.4, 0.42, -2.1, 2.2, 0, '#a03d2e');
    builder.addBox(0.42, 4.4, 0.42, 2.1, 2.2, 0, '#a03d2e');
    builder.addBox(5.6, 0.34, 0.7, 0, 4.5, 0, '#b0483a');
    builder.addBox(4.6, 0.26, 0.5, 0, 3.9, 0, '#a03d2e');
    const geo = builder.build();
    if (geo) {
      const torii = new THREE.Mesh(geo, toon());
      torii.position.set(x, 0, z);
      torii.scale.setScalar(scale);
      torii.castShadow = true;
      group.add(torii);
      colliders.push({ x: x - 2.1, z, hw: 0.3, hd: 0.3 });
      colliders.push({ x: x + 2.1, z, hw: 0.3, hd: 0.3 });
    }
  }

  // ---------- 石灯笼 ----------
  const lanternSpots: [number, number][] = [
    [30, 5], [34, 4.5], [36, 6.5], [20, 6], [16, 5.5], [-10, 12], [10, 12],
  ];
  const lanternBuilder = new MeshBuilder();
  for (const [x, z] of lanternSpots) {
    lanternBuilder.addCylinder(0.34, 0.42, 0.5, x, 0.25, z, '#9a948a', 6);
    lanternBuilder.addCylinder(0.12, 0.12, 0.9, x, 0.95, z, '#4a4640', 6);
    lanternBuilder.addBox(0.62, 0.5, 0.62, x, 1.65, z, '#b8b2a4');
    lanternBuilder.addCone(0.55, 0.4, x, 2.1, z, '#8a8478', 4);
    lanternBuilder.addSphere(0.1, x, 2.36, z, '#8a8478');
  }
  const lanternGeo = lanternBuilder.build();
  if (lanternGeo) {
    const lanterns = new THREE.Mesh(lanternGeo, toon());
    lanterns.castShadow = true;
    group.add(lanterns);
    for (const [x, z] of lanternSpots) colliders.push({ x, z, hw: 0.3, hd: 0.3 });
  }

  // ---------- 自动售货机 ----------
  const vendingSpots: [number, number, number][] = [
    [-2, -9, 0], [12, -16, Math.PI], [-6, -46, Math.PI / 2],
  ];
  for (const [x, z, rotY] of vendingSpots) {
    const builder = new MeshBuilder();
    builder.addBox(1.1, 1.9, 0.7, 0, 0.95, 0, '#c84a3a');
    const geo = builder.build();
    if (!geo) continue;
    const machine = new THREE.Mesh(geo, toon());
    machine.position.set(x, 0, z);
    machine.rotation.y = rotY;
    machine.castShadow = true;
    group.add(machine);
    const panelMat = new THREE.MeshStandardMaterial({
      color: '#ffe9c0',
      emissive: '#ffd9a0',
      emissiveIntensity: 0,
      roughness: 0.3,
    });
    nightMaterials.push(panelMat);
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.3), panelMat);
    panel.position.set(x + Math.sin(rotY) * 0.37, 1.15, z + Math.cos(rotY) * 0.37);
    panel.rotation.y = rotY + Math.PI;
    group.add(panel);
    colliders.push({ x, z, hw: 0.6, hd: 0.45 });
  }

  // ---------- 告示牌（任务板） ----------
  {
    const builder = new MeshBuilder();
    builder.addBox(0.16, 1.8, 0.16, -0.9, 0.9, 0, '#7a5f3f');
    builder.addBox(0.16, 1.8, 0.16, 0.9, 0.9, 0, '#7a5f3f');
    builder.addBox(2.3, 1.2, 0.1, 0, 1.9, 0, '#8a6a4a');
    const geo = builder.build();
    const boardTex = createSignTexture('公告板', '#8a6a4a', '#f2ead9');
    if (geo) {
      const board = new THREE.Mesh(geo, toon());
      board.position.set(4, 0, 10);
      board.castShadow = true;
      group.add(board);
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(2.1, 1.0),
        new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.8 }),
      );
      face.position.set(4, 1.9, 9.94);
      group.add(face);
      colliders.push({ x: 4, z: 10, hw: 1.2, hd: 0.3 });
    }
  }

  // ---------- 农田 ----------
  {
    const builder = new MeshBuilder();
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        const x = -48 + col * 8;
        const z = 38 + row * 6;
        builder.addBox(6.5, 0.25, 4.5, x, 0.14, z, '#8a6f4a');
        for (let i = 0; i < 4; i += 1) {
          builder.addSphere(0.22, x - 2.6 + i * 1.7, 0.4, z - 1.4, '#5a8a4a', 0.8);
        }
      }
    }
    // 水井与柴堆
    builder.addCylinder(0.8, 0.9, 0.7, -38, 0.35, 34, '#8a857c', 10);
    builder.addBox(0.14, 1.2, 0.14, -38, 1.3, 33.2, '#6a4a30');
    builder.addBox(1.6, 0.14, 0.14, -38, 1.9, 33.2, '#6a4a30');
    for (let i = 0; i < 5; i += 1) {
      builder.addCylinder(0.14, 0.14, 1.5, -42 + (i % 2) * 0.3, 0.75, 30 + Math.floor(i / 2) * 0.4, '#7a5f3f', 6);
    }
    const geo = builder.build();
    if (geo) {
      const farm = new THREE.Mesh(geo, toon());
      farm.receiveShadow = true;
      group.add(farm);
      colliders.push({ x: -38, z: 34, hw: 0.9, hd: 0.9 });
    }
  }

  // ---------- 远山背景 ----------
  {
    const hillMat = new THREE.MeshToonMaterial({ color: '#7a9a6a', gradientMap: toonGradient });
    const hills: [number, number, number][] = [
      [-110, -30, 60], [-70, -90, 75], [0, -110, 90], [80, -100, 70], [130, -20, 65],
      [-130, 60, 70], [130, 70, 75], [40, 130, 80], [-60, 135, 65],
    ];
    for (const [x, z, r] of hills) {
      const hill = new THREE.Mesh(new THREE.ConeGeometry(r, r * 0.5, 6), hillMat);
      hill.position.set(x, r * 0.22, z);
      hill.rotation.y = rng.range(0, Math.PI);
      group.add(hill);
    }
  }

  return {
    group,
    colliders,
    treeColliders,
    gates,
    nightMaterials,
    lampGlowPositions,
  };
}
