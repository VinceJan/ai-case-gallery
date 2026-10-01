/**
 * Assembles the full Sakura Town on the curved world:
 * roads, railway loop, station, shops, houses, school, shrine, river, park.
 */
import * as THREE from 'three';
import { PAL, toon, flat } from './materials';
import {
  createHouse,
  createShop,
  createConvenience,
  createStation,
  createSchool,
  createShrine,
  createTorii,
  createApartment,
  createClinic,
  createPoliceBox,
  createCafe,
  createUtilityPole,
  createStreetLamp,
  createBench,
  createVendingMachine,
  createTrashCan,
  createBicycle,
  createSakuraTree,
  createGreenTree,
  createBush,
  createTrafficLight,
  createCrossingGate,
  createPlatform,
  createTrack,
  createFence,
  createBridge,
  createWaterPlane,
  createBulletinBoard,
  createMailbox,
  createHedge,
  createSakuraPetals,
  type BuildingVisual,
} from './buildings';
import { placeOnSurface, surfaceHeight } from './surface';
import type { BuildingDef, InteractableDef } from '../data/types';

export type BuiltBuilding = {
  def: BuildingDef;
  visual: BuildingVisual;
  group: THREE.Group;
};

export type WorldRoot = {
  group: THREE.Group;
  buildings: BuiltBuilding[];
  interactables: InteractableDef[];
  railRadius: number;
  stationSurface: { sx: number; sz: number };
  updateNight: (night: number) => void;
  updateRain: (rain: number) => void;
};

const ROAD_Y = 0.02;

export function buildWorld(rng: () => number): WorldRoot {
  const group = new THREE.Group();
  const buildings: BuiltBuilding[] = [];
  const interactables: InteractableDef[] = [];
  const nightLights: THREE.Mesh[] = [];
  const windowMats: THREE.MeshToonMaterial[] = [];

  // —— gently curved ground (planet-like droop) ——
  const groundSize = 280;
  const groundSegs = 64;
  const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize, groundSegs, groundSegs);
  groundGeo.rotateX(-Math.PI / 2);
  {
    const pos = groundGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, surfaceHeight(x, z));
    }
    pos.needsUpdate = true;
    groundGeo.computeVertexNormals();
  }
  const ground = new THREE.Mesh(groundGeo, toon({ color: PAL.grass }));
  ground.receiveShadow = true;
  group.add(ground);

  // soft distant hills
  for (let i = 0; i < 10; i++) {
    const a = rng() * Math.PI * 2;
    const r = 55 + rng() * 30;
    const blob = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4 + rng() * 5, 1),
      toon({ color: rng() > 0.5 ? PAL.grassDark : PAL.grassSoft }),
    );
    const sx = Math.cos(a) * r;
    const sz = Math.sin(a) * r;
    placeOnSurface(blob, sx, sz, -2, rng() * Math.PI * 2);
    group.add(blob);
  }

  // —— roads as ribbons along key paths ——
  function addRoad(sx: number, sz: number, yaw: number, length: number, width = 7.5): void {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(length, width), toon({ color: PAL.asphalt }));
    road.rotation.x = -Math.PI / 2;
    const holder = new THREE.Group();
    holder.add(road);
    road.position.y = ROAD_Y;
    placeOnSurface(holder, sx, sz, 0, yaw);
    group.add(holder);

    const line = new THREE.Mesh(new THREE.PlaneGeometry(length, 0.18), flat(PAL.curb));
    line.rotation.x = -Math.PI / 2;
    line.position.y = ROAD_Y + 0.012;
    const lh = new THREE.Group();
    lh.add(line);
    placeOnSurface(lh, sx, sz, 0, yaw);
    group.add(lh);

    for (const side of [-1, 1]) {
      const sw = new THREE.Mesh(new THREE.PlaneGeometry(length, 1.5), toon({ color: PAL.sidewalk }));
      sw.rotation.x = -Math.PI / 2;
      sw.position.y = ROAD_Y + 0.02;
      sw.position.z = side * (width / 2 + 0.75);
      const sh = new THREE.Group();
      sh.add(sw);
      placeOnSurface(sh, sx, sz, 0, yaw);
      group.add(sh);
    }
  }

  // Main loop road (circle around town)
  const RAIL_R = 42;
  const ROAD_R = 30;
  addRoad(0, ROAD_R, 0, 50); // north
  addRoad(0, -ROAD_R, 0, 50); // south
  addRoad(ROAD_R, 0, Math.PI / 2, 50); // east
  addRoad(-ROAD_R, 0, Math.PI / 2, 50); // west

  // ring road approximation with segments (length along X → yaw = t)
  const roadRingSegs = 16;
  for (let i = 0; i < roadRingSegs; i++) {
    const t = (i / roadRingSegs) * Math.PI * 2;
    const sx = ROAD_R * Math.cos(t);
    const sz = ROAD_R * Math.sin(t);
    addRoad(sx, sz, t, 14, 5.5);
  }

  // Station plaza radial roads
  addRoad(0, 8, 0, 16, 6); // from center south toward station
  addRoad(8, 0, Math.PI / 2, 14, 5);

  // —— river (west side) ——
  const river = createWaterPlane(70, 5);
  placeOnSurface(river, -28, 5, 0, Math.PI / 2);
  group.add(river);
  const bridge = createBridge(8);
  placeOnSurface(bridge, -28, 5, 0, 0);
  group.add(bridge);

  // —— railway loop ——
  const railSegs = 36;
  for (let i = 0; i < railSegs; i++) {
    const t = (i / railSegs) * Math.PI * 2;
    const sx = RAIL_R * Math.cos(t);
    const sz = RAIL_R * Math.sin(t);
    // track length is along local X → yaw = t makes X tangent to the ring
    const track = createTrack((2 * Math.PI * RAIL_R) / railSegs + 0.4);
    placeOnSurface(track, sx, sz, 0, t);
    group.add(track);
  }

  // station platforms
  const platform = createPlatform();
  placeOnSurface(platform, RAIL_R + 3.2, 0, 0, Math.PI / 2);
  group.add(platform);
  const platform2 = createPlatform();
  placeOnSurface(platform2, -RAIL_R - 3.2, 0, 0, Math.PI / 2);
  group.add(platform2);

  // —— station building ——
  const stationDef: BuildingDef = {
    id: 'station',
    kind: 'station',
    name: '桜町駅',
    sx: RAIL_R + 8,
    sz: 0,
    yaw: -Math.PI / 2,
    width: 16,
    depth: 8,
    floors: 1,
    hasInterior: true,
    signText: '桜町駅',
  };
  const stationVis = createStation();
  placeOnSurface(stationVis.group, stationDef.sx, stationDef.sz, 0, stationDef.yaw);
  group.add(stationVis.group);
  buildings.push({ def: stationDef, visual: stationVis, group: stationVis.group });
  windowMats.push(...stationVis.windowMats);

  // —— convenience store ——
  const konbiniDef: BuildingDef = {
    id: 'konbini',
    kind: 'convenience',
    name: 'ローソン桜町店',
    sx: 18,
    sz: 10,
    yaw: Math.PI,
    width: 10,
    depth: 8,
    floors: 1,
    hasInterior: true,
    shop: { open: 0, close: 24 },
    signText: 'ローソン',
  };
  const konbiniVis = createConvenience({});
  placeOnSurface(konbiniVis.group, konbiniDef.sx, konbiniDef.sz, 0, konbiniDef.yaw);
  group.add(konbiniVis.group);
  buildings.push({ def: konbiniDef, visual: konbiniVis, group: konbiniVis.group });
  nightLights.push(...konbiniVis.lightMeshes);
  windowMats.push(...konbiniVis.windowMats);

  // —— shops along commercial street (south of center) ——
  const shopDefs: BuildingDef[] = [
    {
      id: 'bakery',
      kind: 'shop',
      name: 'パン屋 みどり',
      sx: 8,
      sz: -8,
      yaw: Math.PI / 2,
      width: 8,
      depth: 7,
      floors: 2,
      hasInterior: true,
      shop: { open: 7, close: 18 },
      signColor: '#e8a040',
    },
    {
      id: 'bookstore',
      kind: 'shop',
      name: 'さくら書店',
      sx: -8,
      sz: -10,
      yaw: Math.PI / 2,
      width: 9,
      depth: 7,
      floors: 2,
      hasInterior: true,
      shop: { open: 10, close: 20 },
      signColor: '#3a5080',
    },
    {
      id: 'izakaya',
      kind: 'shop',
      name: '居酒屋 はなみずき',
      sx: -18,
      sz: -6,
      yaw: 0,
      width: 10,
      depth: 8,
      floors: 2,
      hasInterior: true,
      shop: { open: 17, close: 23 },
      signColor: '#c05048',
    },
    {
      id: 'hardware',
      kind: 'shop',
      name: '金物 たなか',
      sx: 22,
      sz: -4,
      yaw: -Math.PI / 2,
      width: 8,
      depth: 7,
      floors: 1,
      hasInterior: true,
      shop: { open: 9, close: 18, closedWeekdays: [0] },
      signColor: '#6a7078',
    },
    {
      id: 'florist',
      kind: 'shop',
      name: '花屋 はなえ',
      sx: 14,
      sz: -16,
      yaw: Math.PI / 3,
      width: 7,
      depth: 6,
      floors: 1,
      hasInterior: true,
      shop: { open: 9, close: 18 },
      signColor: '#e890b0',
    },
    {
      id: 'laundry',
      kind: 'shop',
      name: 'クリーニング',
      sx: -12,
      sz: 14,
      yaw: Math.PI,
      width: 7,
      depth: 6,
      floors: 1,
      hasInterior: true,
      shop: { open: 9, close: 19 },
      signColor: '#5a9ac0',
    },
    {
      id: 'pharmacy',
      kind: 'shop',
      name: 'さくら薬局',
      sx: 4,
      sz: -22,
      yaw: Math.PI / 2,
      width: 8,
      depth: 7,
      floors: 1,
      hasInterior: true,
      shop: { open: 9, close: 18 },
      signColor: '#4a9a5a',
    },
  ];

  for (const def of shopDefs) {
    const vis = createShop({
      width: def.width,
      depth: def.depth,
      floors: def.floors,
      name: def.name,
      signBg: def.signColor,
      rng,
    });
    placeOnSurface(vis.group, def.sx, def.sz, 0, def.yaw);
    group.add(vis.group);
    buildings.push({ def, visual: vis, group: vis.group });
    nightLights.push(...vis.lightMeshes);
    windowMats.push(...vis.windowMats);
    interactables.push({
      id: `${def.id}-door`,
      kind: 'door',
      sx: def.sx,
      sz: def.sz,
      height: 1.2,
      yaw: def.yaw,
      label: `${def.name} 入口`,
      buildingId: def.id,
    });
    interactables.push({
      id: `${def.id}-counter`,
      kind: 'shopCounter',
      sx: def.sx,
      sz: def.sz - 2,
      height: 1.1,
      label: `${def.name} 会計`,
      buildingId: def.id,
    });
  }

  // —— café ——
  const cafeDef: BuildingDef = {
    id: 'cafe',
    kind: 'cafe',
    name: '喫茶 さくら',
    sx: -22,
    sz: 12,
    yaw: Math.PI / 2,
    width: 8,
    depth: 7,
    floors: 1,
    hasInterior: true,
    shop: { open: 8, close: 19 },
    signColor: '#5a4030',
  };
  const cafeVis = createCafe();
  placeOnSurface(cafeVis.group, cafeDef.sx, cafeDef.sz, 0, cafeDef.yaw);
  group.add(cafeVis.group);
  buildings.push({ def: cafeDef, visual: cafeVis, group: cafeVis.group });
  nightLights.push(...cafeVis.lightMeshes);
  interactables.push({
    id: 'cafe-door',
    kind: 'door',
    sx: cafeDef.sx,
    sz: cafeDef.sz,
    height: 1.2,
    label: '喫茶 さくら',
    buildingId: 'cafe',
  });

  // —— clinic & police ——
  const clinicDef: BuildingDef = {
    id: 'clinic',
    kind: 'clinic',
    name: 'さくら診療所',
    sx: -30,
    sz: -18,
    yaw: 0,
    width: 9,
    depth: 7,
    floors: 1,
    hasInterior: true,
    shop: { open: 9, close: 17 },
  };
  const clinicVis = createClinic();
  placeOnSurface(clinicVis.group, clinicDef.sx, clinicDef.sz, 0, clinicDef.yaw);
  group.add(clinicVis.group);
  buildings.push({ def: clinicDef, visual: clinicVis, group: clinicVis.group });

  const policeDef: BuildingDef = {
    id: 'police',
    kind: 'police',
    name: '交番',
    sx: 12,
    sz: 22,
    yaw: Math.PI,
    width: 5,
    depth: 5,
    floors: 1,
    hasInterior: true,
    shop: { open: 8, close: 20 },
  };
  const policeVis = createPoliceBox();
  placeOnSurface(policeVis.group, policeDef.sx, policeDef.sz, 0, policeDef.yaw);
  group.add(policeVis.group);
  buildings.push({ def: policeDef, visual: policeVis, group: policeVis.group });

  // —— school on the hill (NE) ——
  const schoolDef: BuildingDef = {
    id: 'school',
    kind: 'school',
    name: '桜町小学校',
    sx: 28,
    sz: 28,
    yaw: -Math.PI / 2 - 0.3,
    width: 22,
    depth: 10,
    floors: 3,
    hasInterior: true,
  };
  const schoolVis = createSchool();
  placeOnSurface(schoolVis.group, schoolDef.sx, schoolDef.sz, 0, schoolDef.yaw);
  group.add(schoolVis.group);
  buildings.push({ def: schoolDef, visual: schoolVis, group: schoolVis.group });

  // schoolyard
  const yard = new THREE.Mesh(new THREE.PlaneGeometry(24, 16), toon({ color: '#c4a070' }));
  yard.rotation.x = -Math.PI / 2;
  const yardH = new THREE.Group();
  yardH.add(yard);
  yard.position.y = ROAD_Y;
  placeOnSurface(yardH, 22, 20, 0, -Math.PI / 2 - 0.3);
  group.add(yardH);

  // —— shrine on the west hill ——
  const shrineDef: BuildingDef = {
    id: 'shrine',
    kind: 'shrine',
    name: 'さくら神社',
    sx: -38,
    sz: -28,
    yaw: 0.6,
    width: 6,
    depth: 5,
    floors: 1,
    hasInterior: true,
  };
  const shrineVis = createShrine();
  placeOnSurface(shrineVis.group, shrineDef.sx, shrineDef.sz, 1.5, shrineDef.yaw);
  group.add(shrineVis.group);
  buildings.push({ def: shrineDef, visual: shrineVis, group: shrineVis.group });

  // stone path to shrine
  for (let i = 0; i < 12; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.2), toon({ color: PAL.stone }));
    const h = new THREE.Group();
    h.add(step);
    step.position.y = 0.08;
    const t = i / 11;
    placeOnSurface(h, -20 - t * 16, -18 - t * 8, t * 1.5, 0.5);
    group.add(h);
  }
  const torii = createTorii();
  placeOnSurface(torii, -28, -22, 1.0, 0.5);
  group.add(torii);

  // —— apartments ——
  for (let i = 0; i < 4; i++) {
    const def: BuildingDef = {
      id: `apt-${i}`,
      kind: 'apartment',
      name: `さくらハイツ ${i + 1}号棟`,
      sx: -22 + (i % 2) * 12,
      sz: -28 - Math.floor(i / 2) * 12,
      yaw: (i % 2) * Math.PI * 0.1,
      width: 10,
      depth: 8,
      floors: 3,
      hasInterior: true,
    };
    const vis = createApartment({ floors: 3 });
    placeOnSurface(vis.group, def.sx, def.sz, 0, def.yaw);
    group.add(vis.group);
    buildings.push({ def, visual: vis, group: vis.group });
    windowMats.push(...vis.windowMats);
  }

  // —— houses ring ——
  const houseColors = [PAL.wallCream, PAL.wallBeige, PAL.wallWarmGray, PAL.wallWhite, PAL.wallBlueGray];
  const roofColors = [PAL.roofTile, PAL.roofRed, PAL.roofBlue, PAL.roofGray, PAL.roofGreen];
  const houseCount = 16;
  for (let i = 0; i < houseCount; i++) {
    const t = (i / houseCount) * Math.PI * 2 + 0.15;
    const r = 20 + (i % 3) * 5;
    const sx = r * Math.cos(t);
    const sz = r * Math.sin(t);
    // keep clear of key landmarks
    if (Math.hypot(sx - 18, sz - 10) < 12) continue;
    if (Math.hypot(sx - 28, sz - 28) < 14) continue;
    if (Math.hypot(sx + 38, sz + 28) < 12) continue;

    const floors = 1 + (rng() > 0.55 ? 1 : 0);
    const def: BuildingDef = {
      id: `house-${i}`,
      kind: 'house',
      name: `住宅 ${i + 1}`,
      sx,
      sz,
      yaw: t + Math.PI / 2,
      width: 7 + rng() * 3,
      depth: 6 + rng() * 2,
      floors,
      hasInterior: true,
    };
    const vis = createHouse({
      width: def.width,
      depth: def.depth,
      floors: def.floors,
      wall: houseColors[i % houseColors.length],
      roof: roofColors[i % roofColors.length],
      rng,
    });
    placeOnSurface(vis.group, def.sx, def.sz, 0, def.yaw);
    group.add(vis.group);
    buildings.push({ def, visual: vis, group: vis.group });
    windowMats.push(...vis.windowMats);
  }

  // —— street furniture along roads ——
  for (let i = 0; i < 12; i++) {
    const t = (i / 12) * Math.PI * 2;
    const sx = ROAD_R * Math.cos(t);
    const sz = ROAD_R * Math.sin(t);
    const pole = createUtilityPole();
    placeOnSurface(pole, sx, sz, 0, t);
    group.add(pole);
    const lamp = createStreetLamp(false);
    placeOnSurface(lamp, sx + Math.cos(t + 1) * 3, sz + Math.sin(t + 1) * 3, 0, t);
    group.add(lamp);
    nightLights.push(...[]); // lamp handled by updateNight via userData
    (lamp as any).userData.isLamp = true;
  }

  // sakura trees along roads and river
  for (let i = 0; i < 28; i++) {
    const t = (i / 28) * Math.PI * 2;
    const r = 26 + (i % 4) * 3;
    const tree = createSakuraTree({ scale: 0.7 + (i % 3) * 0.12 });
    placeOnSurface(tree, r * Math.cos(t), r * Math.sin(t), 0, rng() * Math.PI * 2);
    group.add(tree);
  }
  for (let i = 0; i < 10; i++) {
    const tree = createSakuraTree({ scale: 0.8 + rng() * 0.2 });
    placeOnSurface(tree, -24 + i * 3.5, 8, 0, rng() * Math.PI);
    group.add(tree);
  }

  // green trees / bushes
  for (let i = 0; i < 20; i++) {
    const a = rng() * Math.PI * 2;
    const r = 34 + rng() * 18;
    const tree = createGreenTree(0.7 + rng() * 0.35);
    placeOnSurface(tree, Math.cos(a) * r, Math.sin(a) * r, 0, rng() * Math.PI);
    group.add(tree);
    if (i % 2 === 0) {
      const bush = createBush(0.8 + rng() * 0.5);
      placeOnSurface(bush, Math.cos(a) * (r + 2.5), Math.sin(a) * (r + 2.5), 0, 0);
      group.add(bush);
    }
  }

  // park benches + vending + trash near center
  const parkSpots: Array<[number, number, number]> = [
    [5, 5, 0],
    [-5, 5, 1],
    [5, -5, 2],
    [-6, -4, 0.5],
    [10, 16, Math.PI],
    [-10, 16, 0],
  ];
  for (const [sx, sz, yaw] of parkSpots) {
    const bench = createBench();
    placeOnSurface(bench, sx, sz, 0, yaw);
    group.add(bench);
    interactables.push({ id: `bench-${sx}-${sz}`, kind: 'bench', sx, sz, height: 0.5, label: 'ベンチ', yaw });
  }

  const vendingSpots: Array<[number, number, number]> = [
    [16, 12, Math.PI],
    [-16, -4, 0],
    [20, 20, -Math.PI / 2],
    [-8, -20, Math.PI / 2],
  ];
  for (const [sx, sz, yaw] of vendingSpots) {
    const v = createVendingMachine(rng() > 0.5 ? PAL.red : PAL.awningBlue);
    placeOnSurface(v, sx, sz, 0, yaw);
    group.add(v);
    interactables.push({
      id: `vending-${sx}-${sz}`,
      kind: 'vending',
      sx,
      sz,
      height: 1,
      label: '自動販売機',
      yaw,
    });
    nightLights.push(v.children[0] as THREE.Mesh);
  }

  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const trash = createTrashCan();
    placeOnSurface(trash, Math.cos(a) * 18, Math.sin(a) * 18, 0, 0);
    group.add(trash);
  }

  // bicycles near station and houses
  for (let i = 0; i < 8; i++) {
    const bike = createBicycle(i % 2 ? '#3a6090' : '#8a4040');
    const sx = RAIL_R + 5 + (i % 4) * 1.2;
    const sz = -8 + Math.floor(i / 4) * 2;
    placeOnSurface(bike, sx, sz, 0, Math.PI / 2 + i * 0.2);
    group.add(bike);
    interactables.push({
      id: `bike-${i}`,
      kind: 'bicycle',
      sx,
      sz,
      height: 0.5,
      label: '自転車',
    });
  }

  // traffic lights + crossing
  const light = createTrafficLight();
  placeOnSurface(light, 12, 8, 0, 0);
  group.add(light);

  for (const [sx, sz, yaw] of [
    [RAIL_R - 2, 12, 0],
    [-RAIL_R + 2, -12, Math.PI],
  ] as Array<[number, number, number]>) {
    const gate = createCrossingGate();
    placeOnSurface(gate, sx, sz, 0, yaw);
    group.add(gate);
    (gate as any).userData.isCrossing = true;
  }

  // bulletin boards
  for (const [sx, sz, yaw] of [
    [2, 2, 0],
    [16, 14, Math.PI],
    [-18, -2, 1],
  ] as Array<[number, number, number]>) {
    const b = createBulletinBoard();
    placeOnSurface(b, sx, sz, 0, yaw);
    group.add(b);
    interactables.push({
      id: `board-${sx}`,
      kind: 'poster',
      sx,
      sz,
      height: 1.1,
      label: '掲示板',
      yaw,
    });
  }

  // mailboxes
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + 0.4;
    const mb = createMailbox();
    placeOnSurface(mb, 16 * Math.cos(t), 16 * Math.sin(t), 0, t);
    group.add(mb);
    interactables.push({
      id: `mail-${i}`,
      kind: 'mailbox',
      sx: 16 * Math.cos(t),
      sz: 16 * Math.sin(t),
      height: 0.8,
      label: 'ポスト',
    });
  }

  // hedges near houses
  for (let i = 0; i < 8; i++) {
    const t = i * 0.8;
    const hedge = createHedge(4);
    placeOnSurface(hedge, 14 * Math.cos(t), 14 * Math.sin(t), 0, t);
    group.add(hedge);
  }

  // fence near school
  const fence = createFence(16);
  placeOnSurface(fence, 22, 14, 0, -Math.PI / 2);
  group.add(fence);

  // petals
  const petals = createSakuraPetals(120, 45);
  group.add(petals);

  // shrine interactable
  interactables.push({
    id: 'shrine-offer',
    kind: 'shrine',
    sx: shrineDef.sx,
    sz: shrineDef.sz + 3,
    height: 1,
    label: '神社に祈る',
    buildingId: 'shrine',
  });

  function updateNight(night: number): void {
    for (const mat of windowMats) {
      const lit = night > 0.35;
      mat.emissive.set(lit ? '#5a4020' : '#000000');
      mat.emissiveIntensity = lit ? 0.35 + night * 0.6 : 0;
    }
    for (const m of nightLights) {
      const mat = m.material as THREE.MeshToonMaterial;
      if (mat && 'emissive' in mat) {
        mat.emissiveIntensity = night * 1.1;
      }
    }
    group.traverse((obj) => {
      if ((obj as any).userData?.isLamp) {
        const mesh = obj as THREE.Group;
        mesh.traverse((c) => {
          const mm = (c as THREE.Mesh).material as THREE.MeshToonMaterial;
          if (mm && mm.emissive) {
            mm.emissive.set(night > 0.3 ? PAL.lampGlow : '#000000');
            mm.emissiveIntensity = night > 0.3 ? night * 1.2 : 0;
          }
        });
      }
    });
  }

  function updateRain(rain: number): void {
    // darken ground slightly
    (ground.material as THREE.MeshToonMaterial).color.setHex(
      rain > 0.3 ? 0x5a9450 : 0x7cb06a,
    );
  }

  return {
    group,
    buildings,
    interactables,
    railRadius: RAIL_R,
    stationSurface: { sx: RAIL_R + 8, sz: 0 },
    updateNight,
    updateRain,
  };
}
