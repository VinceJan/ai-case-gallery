/**
 * Building / prop factories for the Japanese suburban town.
 * All meshes are authored in local space (ground at y=0, front face toward +Z).
 */
import * as THREE from 'three';
import { PAL, toon, flat } from './materials';
import {
  signTexture,
  windowTexture,
  posterTexture,
  vendingTexture,
  bulletinTexture,
  platformTexture,
} from './textures';

const winLit = windowTexture(true);
const winDay = windowTexture(false);

export type BuildingVisual = {
  group: THREE.Group;
  doorWorldLocal: THREE.Vector3;
  windowMats: THREE.MeshToonMaterial[];
  signMesh?: THREE.Mesh;
  lightMeshes: THREE.Mesh[];
};

function box(w: number, h: number, d: number, color: string): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), toon({ color }));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function addWindows(
  parent: THREE.Group,
  width: number,
  floors: number,
  depth: number,
  floorH: number,
  windowMats: THREE.MeshToonMaterial[],
  litChance = 0,
  rng: () => number = Math.random,
): void {
  const cols = Math.max(2, Math.floor(width / 2.2));
  const gapX = width / (cols + 1);
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      const lit = rng() < litChance;
      const mat = toon({ color: lit ? PAL.glassNight : PAL.glass, map: lit ? winLit : winDay, emissive: lit ? '#5a4020' : undefined, emissiveIntensity: lit ? 0.45 : 0 });
      windowMats.push(mat);
      const w = 0.9;
      const h = 1.05;
      const win = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), mat);
      win.position.set(-width / 2 + gapX * (c + 1), floorH * f + 1.15, depth / 2 + 0.04);
      parent.add(win);
      // side windows on floors > 0
      if (f > 0 && c === 0) {
        const sw = new THREE.Mesh(new THREE.BoxGeometry(0.08, h, w), mat);
        sw.position.set(width / 2 + 0.04, floorH * f + 1.15, 0);
        parent.add(sw);
      }
    }
  }
}

export function createHouse(opts: {
  width: number;
  depth: number;
  floors: number;
  wall?: string;
  roof?: string;
  hasSign?: boolean;
  signText?: string;
  rng?: () => number;
}): BuildingVisual {
  const g = new THREE.Group();
  const floorH = 2.7;
  const wall = opts.wall ?? PAL.wallCream;
  const roof = opts.roof ?? PAL.roofTile;
  const rng = opts.rng ?? Math.random;
  const h = floorH * opts.floors;

  const body = box(opts.width, h, opts.depth, wall);
  body.position.y = h / 2;
  g.add(body);

  // roof
  const roofMesh = new THREE.Mesh(
    new THREE.BoxGeometry(opts.width + 0.35, 0.28, opts.depth + 0.35),
    toon({ color: roof }),
  );
  roofMesh.position.y = h + 0.14;
  roofMesh.castShadow = true;
  g.add(roofMesh);

  // roof ridge (simple hip hint)
  const ridge = new THREE.Mesh(new THREE.BoxGeometry(opts.width * 0.35, 0.35, opts.depth * 0.5), toon({ color: roof }));
  ridge.position.y = h + 0.35;
  g.add(ridge);

  const windowMats: THREE.MeshToonMaterial[] = [];
  addWindows(g, opts.width, opts.floors, opts.depth, floorH, windowMats, 0.15, rng);

  // entrance
  const door = box(1.1, 2.1, 0.12, PAL.woodDark);
  door.position.set(0, 1.05, opts.depth / 2 + 0.08);
  g.add(door);
  const step = box(1.4, 0.12, 0.6, PAL.concrete);
  step.position.set(0, 0.06, opts.depth / 2 + 0.35);
  g.add(step);
  // small awning
  const awn = box(1.6, 0.1, 0.7, PAL.wood);
  awn.position.set(0, 2.25, opts.depth / 2 + 0.3);
  g.add(awn);

  // AC unit
  const ac = box(0.7, 0.55, 0.35, '#d0d0c8');
  ac.position.set(opts.width / 2 - 0.5, floorH * 0.7, opts.depth / 2 + 0.2);
  g.add(ac);

  // fence hint
  const fence = box(opts.width + 0.5, 0.55, 0.1, PAL.woodDark);
  fence.position.set(0, 0.28, opts.depth / 2 + 1.6);
  g.add(fence);

  let signMesh: THREE.Mesh | undefined;
  if (opts.hasSign && opts.signText) {
    const tex = signTexture(opts.signText, '#f8f4e8', '#2a2826');
    signMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.55), flat('#ffffff', { map: tex }));
    signMesh.position.set(0, 2.55, opts.depth / 2 + 0.22);
    g.add(signMesh);
  }

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(0, 0, opts.depth / 2 + 0.6),
    windowMats,
    signMesh,
    lightMeshes: [],
  };
}

export function createShop(opts: {
  width: number;
  depth: number;
  floors: number;
  name: string;
  signBg?: string;
  signFg?: string;
  awningColor?: string;
  wall?: string;
  rng?: () => number;
}): BuildingVisual {
  const g = new THREE.Group();
  const floorH = 3.0;
  const wall = opts.wall ?? PAL.wallBeige;
  const h = floorH * opts.floors;
  const rng = opts.rng ?? Math.random;

  const body = box(opts.width, h, opts.depth, wall);
  body.position.y = h / 2;
  g.add(body);

  const roof = box(opts.width + 0.3, 0.3, opts.depth + 0.3, PAL.roofGray);
  roof.position.y = h + 0.15;
  g.add(roof);

  // storefront glass
  const glass = new THREE.Mesh(new THREE.BoxGeometry(opts.width - 1.2, 1.8, 0.1), toon({ color: PAL.glass, emissive: '#2a3040', emissiveIntensity: 0.15 }));
  glass.position.set(0, 1.2, opts.depth / 2 + 0.06);
  g.add(glass);

  // door
  const door = box(1.2, 2.2, 0.12, PAL.glass);
  door.position.set(opts.width * 0.28, 1.1, opts.depth / 2 + 0.1);
  g.add(door);

  // awning
  const awning = box(opts.width + 0.2, 0.12, 1.2, opts.awningColor ?? PAL.awning);
  awning.position.set(0, 2.35, opts.depth / 2 + 0.55);
  g.add(awning);
  for (const dx of [-opts.width / 2 + 0.3, opts.width / 2 - 0.3]) {
    const post = box(0.1, 2.2, 0.1, PAL.pole);
    post.position.set(dx, 1.1, opts.depth / 2 + 1.0);
    g.add(post);
  }

  // signboard
  const tex = signTexture(opts.name, opts.signBg ?? '#c05048', opts.signFg ?? '#f8f4e8', { sub: '桜町' });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(opts.width - 0.5, 4.2), 1.0), flat('#ffffff', { map: tex }));
  sign.position.set(0, 3.05, opts.depth / 2 + 0.2);
  g.add(sign);

  const windowMats: THREE.MeshToonMaterial[] = [];
  if (opts.floors > 1) {
    addWindows(g, opts.width, opts.floors - 1, opts.depth, floorH, windowMats, 0.25, rng);
    // shift windows up
    // (addWindows places from y=1.15 which is fine for floor 0 shop; extra floors ok)
  }

  // interior hint: shelves visible through glass
  for (let i = 0; i < 3; i++) {
    const shelf = box(opts.width - 2.2, 1.4, 0.35, PAL.wood);
    shelf.position.set(0, 0.7, -opts.depth / 2 + 0.8 + i * 1.1);
    g.add(shelf);
  }

  const lamp = new THREE.Mesh(new THREE.BoxGeometry(opts.width - 1.5, 0.08, 0.15), toon({ color: PAL.lampGlow, emissive: PAL.lampGlow, emissiveIntensity: 0.8 }));
  lamp.position.set(0, 2.2, opts.depth / 2 - 0.3);
  g.add(lamp);

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(opts.width * 0.28, 0, opts.depth / 2 + 0.8),
    windowMats,
    signMesh: sign,
    lightMeshes: [lamp],
  };
}

export function createConvenience(opts: { width?: number; depth?: number }): BuildingVisual {
  const width = opts.width ?? 10;
  const depth = opts.depth ?? 8;
  const g = new THREE.Group();

  const body = box(width, 3.6, depth, PAL.wallWhite);
  body.position.y = 1.8;
  g.add(body);

  const roof = box(width + 0.4, 0.35, depth + 0.4, PAL.wallWhite);
  roof.position.y = 3.75;
  g.add(roof);

  // stripe
  const stripe = box(width + 0.1, 0.45, 0.12, PAL.red);
  stripe.position.set(0, 3.2, depth / 2 + 0.08);
  g.add(stripe);
  const stripe2 = box(width + 0.1, 0.45, 0.12, PAL.red);
  stripe2.position.set(0, 3.2, -depth / 2 - 0.08);
  g.add(stripe2);

  // glass front
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(width - 1.5, 2.4, 0.1),
    toon({ color: PAL.glass, emissive: '#304050', emissiveIntensity: 0.25 }),
  );
  glass.position.set(-0.4, 1.5, depth / 2 + 0.06);
  g.add(glass);

  // auto door
  const door = box(1.6, 2.3, 0.12, PAL.glass);
  door.position.set(width * 0.28, 1.15, depth / 2 + 0.1);
  g.add(door);

  const tex = signTexture('ローソン', '#0070c0', '#ffffff', { sub: '24H', w: 512, h: 96 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 1.15), flat('#ffffff', { map: tex }));
  sign.position.set(0, 4.35, depth / 2 + 0.15);
  g.add(sign);

  // interior shelves
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const shelf = box(1.6, 1.3, 0.4, row % 2 ? '#d8c8a8' : '#e0d0b0');
      shelf.position.set(-3 + col * 2.2, 0.65, -1.5 + row * 1.4);
      g.add(shelf);
    }
  }
  // counter
  const counter = box(3.2, 1.05, 0.8, PAL.wood);
  counter.position.set(2.2, 0.52, 1.8);
  g.add(counter);
  const register = box(0.55, 0.4, 0.4, '#2a2a2a');
  register.position.set(2.2, 1.25, 1.8);
  g.add(register);

  // fridge lights
  const fridge = box(0.7, 2.1, 0.7, '#d0e8f0');
  fridge.position.set(-width / 2 + 0.8, 1.05, -depth / 2 + 1.0);
  g.add(fridge);

  const lamp = new THREE.Mesh(new THREE.BoxGeometry(width - 1, 0.1, 0.2), toon({ color: PAL.lampGlow, emissive: PAL.lampGlow, emissiveIntensity: 1 }));
  lamp.position.set(0, 3.0, 0);
  g.add(lamp);

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(width * 0.28, 0, depth / 2 + 0.9),
    windowMats: [],
    signMesh: sign,
    lightMeshes: [lamp],
  };
}

export function createStation(): BuildingVisual {
  const g = new THREE.Group();
  // main building
  const body = box(16, 4.2, 8, PAL.wallCream);
  body.position.y = 2.1;
  g.add(body);
  const roof = box(17.5, 0.45, 9.5, PAL.roofTile);
  roof.position.y = 4.45;
  g.add(roof);
  // roof slope hint
  const roof2 = box(16.5, 0.35, 3.2, PAL.roofTile);
  roof2.position.set(0, 4.85, 0);
  g.add(roof2);

  // entrance
  const door = box(3.2, 2.6, 0.15, PAL.glass);
  door.position.set(0, 1.3, 4.1);
  g.add(door);

  // windows
  for (let i = 0; i < 5; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 0.1), toon({ color: PAL.glass }));
    w.position.set(-6 + i * 3, 2.4, 4.08);
    g.add(w);
  }

  // clock
  const clock = new THREE.Mesh(new THREE.CircleGeometry(0.7, 24), flat('#f8f4e8'));
  clock.position.set(0, 3.6, 4.15);
  g.add(clock);
  const hand = box(0.06, 0.45, 0.05, '#2a2826');
  hand.position.set(0, 3.72, 4.18);
  g.add(hand);

  const tex = signTexture('桜町駅', '#1a5a3a', '#f8f4e8', { sub: 'Sakuramachi', w: 512, h: 128 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 1.4), flat('#ffffff', { map: tex }));
  sign.position.set(0, 5.4, 4.3);
  g.add(sign);

  // ticket gates area hint (interior)
  for (let i = 0; i < 3; i++) {
    const gate = box(0.7, 1.0, 1.2, '#4a6070');
    gate.position.set(-2.5 + i * 2.5, 0.5, 1.5);
    g.add(gate);
  }

  const lamp = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 0.15), toon({ color: PAL.lampGlow, emissive: PAL.lampGlow, emissiveIntensity: 0.7 }));
  lamp.position.set(0, 3.2, 2);
  g.add(lamp);

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(0, 0, 5),
    windowMats: [],
    signMesh: sign,
    lightMeshes: [lamp],
  };
}

export function createSchool(): BuildingVisual {
  const g = new THREE.Group();
  // main wing
  const body = box(22, 7.5, 10, PAL.wallSchool);
  body.position.y = 3.75;
  g.add(body);
  // second wing
  const body2 = box(10, 7.5, 8, PAL.wallSchool);
  body2.position.set(-14, 3.75, -2);
  g.add(body2);

  const roof = box(23, 0.4, 11, PAL.roofGray);
  roof.position.y = 7.7;
  g.add(roof);

  // windows grid
  for (let f = 0; f < 3; f++) {
    for (let c = 0; c < 8; c++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 0.1), toon({ color: PAL.glass }));
      w.position.set(-9.5 + c * 2.6, 1.8 + f * 2.3, 5.08);
      g.add(w);
    }
  }

  // entrance
  const door = box(2.4, 2.6, 0.15, PAL.woodDark);
  door.position.set(0, 1.3, 5.15);
  g.add(door);
  const step = box(4, 0.2, 1.2, PAL.concrete);
  step.position.set(0, 0.1, 5.7);
  g.add(step);

  // clock tower
  const tower = box(3, 3.2, 3, PAL.wallSchool);
  tower.position.set(8, 9.2, 2);
  g.add(tower);
  const towerRoof = box(3.4, 0.35, 3.4, PAL.roofRed);
  towerRoof.position.set(8, 10.95, 2);
  g.add(towerRoof);

  const tex = signTexture('桜町小学校', '#2a5a3a', '#f8f4e8', { w: 512, h: 96 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(5, 0.9), flat('#ffffff', { map: tex }));
  sign.position.set(0, 6.8, 5.2);
  g.add(sign);

  // outdoor corridor posts
  for (let i = 0; i < 6; i++) {
    const post = box(0.18, 3.2, 0.18, PAL.wood);
    post.position.set(-10 + i * 4, 1.6, 6.2);
    g.add(post);
  }

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(0, 0, 6.2),
    windowMats: [],
    signMesh: sign,
    lightMeshes: [],
  };
}

export function createShrine(): BuildingVisual {
  const g = new THREE.Group();
  // stone base
  const base = box(6, 0.6, 5, PAL.stone);
  base.position.y = 0.3;
  g.add(base);
  // main hall
  const body = box(4.2, 2.8, 3.6, PAL.woodDark);
  body.position.y = 2.0;
  g.add(body);
  // roof layers
  const r1 = box(6.2, 0.35, 5.2, PAL.roofTile);
  r1.position.y = 3.6;
  g.add(r1);
  const r2 = box(4.6, 0.3, 3.8, PAL.roofRed);
  r2.position.y = 3.95;
  g.add(r2);
  // rope / shimenawa hint
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8), toon({ color: '#d8c8a0' }));
  rope.rotation.z = Math.PI / 2;
  rope.position.set(0, 2.6, 1.95);
  g.add(rope);

  // steps
  for (let i = 0; i < 3; i++) {
    const step = box(3.2 + i * 0.6, 0.18, 0.55, PAL.stone);
    step.position.set(0, 0.55 - i * 0.18, 2.2 + i * 0.5);
    g.add(step);
  }

  // offering box
  const offer = box(1.2, 0.7, 0.7, PAL.wood);
  offer.position.set(0, 0.95, 2.6);
  g.add(offer);

  // torii nearby (separate placement usually)
  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(0, 0, 3.2),
    windowMats: [],
    lightMeshes: [],
  };
}

export function createTorii(): THREE.Group {
  const g = new THREE.Group();
  const pillarMat = toon({ color: PAL.trafficRed });
  const left = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.2, 10), pillarMat);
  left.position.set(-1.3, 1.6, 0);
  left.castShadow = true;
  const right = left.clone();
  right.position.x = 1.3;
  g.add(left, right);
  const kasagi = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 0.35), pillarMat);
  kasagi.position.y = 3.25;
  kasagi.castShadow = true;
  g.add(kasagi);
  const nuki = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.16, 0.22), pillarMat);
  nuki.position.y = 2.55;
  g.add(nuki);
  return g;
}

export function createApartment(opts: { floors?: number } = {}): BuildingVisual {
  const floors = opts.floors ?? 3;
  const g = new THREE.Group();
  const floorH = 2.8;
  const h = floors * floorH;
  const body = box(10, h, 8, PAL.wallWarmGray);
  body.position.y = h / 2;
  g.add(body);

  // balconies
  for (let f = 1; f < floors; f++) {
    const bal = box(10.2, 0.12, 1.2, PAL.concrete);
    bal.position.set(0, f * floorH + 0.05, 4.5);
    g.add(bal);
    const rail = box(10.2, 0.7, 0.08, '#6a7078');
    rail.position.set(0, f * floorH + 0.5, 5.0);
    g.add(rail);
    for (let c = 0; c < 4; c++) {
      const door = box(1.1, 1.9, 0.1, PAL.glass);
      door.position.set(-3.6 + c * 2.4, f * floorH + 1.1, 4.08);
      g.add(door);
    }
  }

  // ground windows
  for (let c = 0; c < 4; c++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.1), toon({ color: PAL.glass }));
    w.position.set(-3.6 + c * 2.4, 1.3, 4.08);
    g.add(w);
  }

  // stairs
  const stair = box(1.8, 2.3, 0.15, PAL.woodDark);
  stair.position.set(3.5, 1.15, 4.12);
  g.add(stair);

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(3.5, 0, 4.8),
    windowMats: [],
    lightMeshes: [],
  };
}

export function createClinic(): BuildingVisual {
  const g = new THREE.Group();
  const body = box(9, 3.8, 7, PAL.wallWhite);
  body.position.y = 1.9;
  g.add(body);
  const roof = box(9.5, 0.35, 7.5, PAL.roofBlue);
  roof.position.y = 3.95;
  g.add(roof);

  // cross sign
  const crossV = box(0.35, 1.2, 0.15, PAL.trafficRed);
  crossV.position.set(0, 4.8, 3.6);
  g.add(crossV);
  const crossH = box(1.2, 0.35, 0.15, PAL.trafficRed);
  crossH.position.set(0, 4.8, 3.6);
  g.add(crossH);

  const door = box(1.4, 2.2, 0.12, PAL.glass);
  door.position.set(0, 1.1, 3.55);
  g.add(door);
  for (const dx of [-2.8, 2.8]) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 0.1), toon({ color: PAL.glass }));
    w.position.set(dx, 1.8, 3.52);
    g.add(w);
  }
  const tex = signTexture('さくら診療所', '#f8f4e8', '#2a5a3a', { w: 384, h: 80 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.7), flat('#ffffff', { map: tex }));
  sign.position.set(0, 3.2, 3.65);
  g.add(sign);

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(0, 0, 4.2),
    windowMats: [],
    signMesh: sign,
    lightMeshes: [],
  };
}

export function createPoliceBox(): BuildingVisual {
  const g = new THREE.Group();
  const body = box(5, 3.2, 5, PAL.wallBlueGray);
  body.position.y = 1.6;
  g.add(body);
  const roof = box(5.5, 0.3, 5.5, PAL.indigo);
  roof.position.y = 3.35;
  g.add(roof);
  const door = box(1.1, 2.1, 0.12, PAL.woodDark);
  door.position.set(0, 1.05, 2.55);
  g.add(door);
  const w = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.1, 0.1), toon({ color: PAL.glass }));
  w.position.set(-1.2, 1.7, 2.52);
  g.add(w);
  const tex = signTexture('交番', '#1a3a6a', '#f8f4e8', { w: 128, h: 64 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.6), flat('#ffffff', { map: tex }));
  sign.position.set(0, 3.0, 2.6);
  g.add(sign);
  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(0, 0, 3.2),
    windowMats: [],
    signMesh: sign,
    lightMeshes: [],
  };
}

export function createCafe(): BuildingVisual {
  const g = new THREE.Group();
  const body = box(8, 3.4, 7, PAL.wallWarmGray);
  body.position.y = 1.7;
  g.add(body);
  // pitched roof hint
  const roof = box(8.6, 0.4, 7.6, PAL.roofRed);
  roof.position.y = 3.55;
  g.add(roof);
  const roof2 = box(6, 0.5, 5, PAL.roofRed);
  roof2.position.y = 3.95;
  g.add(roof2);

  const glass = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2.0, 0.1), toon({ color: PAL.glass, emissive: '#403020', emissiveIntensity: 0.35 }));
  glass.position.set(-0.8, 1.3, 3.55);
  g.add(glass);
  const door = box(1.1, 2.15, 0.12, PAL.woodDark);
  door.position.set(2.6, 1.08, 3.58);
  g.add(door);

  // outdoor seats
  for (let i = 0; i < 2; i++) {
    const table = box(0.8, 0.08, 0.8, PAL.wood);
    table.position.set(-2 + i * 2.2, 0.72, 5.0);
    g.add(table);
    const leg = box(0.1, 0.7, 0.1, PAL.woodDark);
    leg.position.set(-2 + i * 2.2, 0.35, 5.0);
    g.add(leg);
  }

  const tex = signTexture('喫茶 さくら', '#5a4030', '#f8e8c8', { sub: 'COFFEE', w: 384, h: 96 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.9), flat('#ffffff', { map: tex }));
  sign.position.set(0, 3.15, 3.7);
  g.add(sign);

  const lamp = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 0.15), toon({ color: PAL.lampGlow, emissive: PAL.lampGlow, emissiveIntensity: 0.6 }));
  lamp.position.set(0, 2.3, 3.2);
  g.add(lamp);

  return {
    group: g,
    doorWorldLocal: new THREE.Vector3(2.6, 0, 4.3),
    windowMats: [],
    signMesh: sign,
    lightMeshes: [lamp],
  };
}

// —— street props ——

export function createUtilityPole(): THREE.Group {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7.5, 8), toon({ color: PAL.pole }));
  pole.position.y = 3.75;
  pole.castShadow = true;
  g.add(pole);
  const cross = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.12), toon({ color: PAL.pole }));
  cross.position.y = 6.8;
  g.add(cross);
  const cross2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 0.1), toon({ color: PAL.pole }));
  cross2.position.y = 6.3;
  g.add(cross2);
  // transformer
  const tf = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.55, 10), toon({ color: '#5a5850' }));
  tf.position.set(0.35, 5.4, 0);
  g.add(tf);
  return g;
}

export function createStreetLamp(night = false): THREE.Group {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 5.2, 8), toon({ color: PAL.lamp }));
  pole.position.y = 2.6;
  pole.castShadow = true;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.08), toon({ color: PAL.lamp }));
  arm.position.set(0.55, 5.1, 0);
  g.add(arm);
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.18, 0.35),
    toon({ color: night ? PAL.lampGlow : '#c8c4b8', emissive: night ? PAL.lampGlow : undefined, emissiveIntensity: night ? 1.2 : 0 }),
  );
  head.position.set(1.0, 5.0, 0);
  g.add(head);
  return g;
}

export function createBench(): THREE.Group {
  const g = new THREE.Group();
  for (const z of [-0.35, 0, 0.35]) {
    const slat = box(1.6, 0.08, 0.18, PAL.wood);
    slat.position.set(0, 0.45, z);
    g.add(slat);
  }
  const back = box(1.6, 0.5, 0.08, PAL.wood);
  back.position.set(0, 0.75, -0.4);
  back.rotation.x = -0.25;
  g.add(back);
  for (const x of [-0.7, 0.7]) {
    const leg = box(0.1, 0.45, 0.7, PAL.woodDark);
    leg.position.set(x, 0.22, 0);
    g.add(leg);
  }
  return g;
}

export function createVendingMachine(brand = PAL.red): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.9, 0.7), toon({ color: brand }));
  body.position.y = 0.95;
  body.castShadow = true;
  g.add(body);
  const tex = vendingTexture(brand);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.85), flat('#ffffff', { map: tex }));
  face.position.set(0, 0.95, 0.36);
  g.add(face);
  return g;
}

export function createTrashCan(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.75, 12), toon({ color: '#4a6070' }));
  body.position.y = 0.38;
  g.add(body);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 12), toon({ color: '#3a4a58' }));
  lid.position.y = 0.78;
  g.add(lid);
  return g;
}

export function createBicycle(color = '#3a6090'): THREE.Group {
  const g = new THREE.Group();
  const wheelGeo = new THREE.TorusGeometry(0.32, 0.035, 8, 20);
  const wheelMat = toon({ color: '#2a2a2a' });
  const w1 = new THREE.Mesh(wheelGeo, wheelMat);
  w1.position.set(-0.45, 0.32, 0);
  w1.rotation.y = Math.PI / 2;
  const w2 = w1.clone();
  w2.position.x = 0.45;
  g.add(w1, w2);
  const frame = box(0.9, 0.06, 0.06, color);
  frame.position.y = 0.45;
  g.add(frame);
  const seat = box(0.18, 0.06, 0.12, '#2a2a2a');
  seat.position.set(-0.15, 0.62, 0);
  g.add(seat);
  const bar = box(0.06, 0.28, 0.4, '#2a2a2a');
  bar.position.set(0.45, 0.62, 0);
  g.add(bar);
  return g;
}

export function createSakuraTree(opts: { scale?: number; bloom?: number } = {}): THREE.Group {
  const g = new THREE.Group();
  const scale = opts.scale ?? 1;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 1.8, 8), toon({ color: PAL.trunk }));
  trunk.position.y = 0.9;
  trunk.castShadow = true;
  g.add(trunk);
  const bloom = opts.bloom ?? 1;
  const colors = [PAL.sakura, PAL.sakuraDeep, PAL.sakuraPale];
  const clumps = 6;
  for (let i = 0; i < clumps; i++) {
    const r = 0.55 + (i % 3) * 0.18;
    const ball = new THREE.Mesh(
      new THREE.IcosahedronGeometry(r * (0.75 + bloom * 0.25), 1),
      toon({ color: colors[i % 3] }),
    );
    const a = (i / clumps) * Math.PI * 2;
    ball.position.set(
      Math.cos(a) * 0.7,
      1.7 + (i % 2) * 0.35,
      Math.sin(a) * 0.7,
    );
    ball.castShadow = true;
    g.add(ball);
  }
  g.scale.setScalar(scale);
  return g;
}

export function createGreenTree(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 1.5, 8), toon({ color: PAL.trunk }));
  trunk.position.y = 0.75;
  trunk.castShadow = true;
  g.add(trunk);
  for (let i = 0; i < 4; i++) {
    const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 + (i % 2) * 0.2, 1), toon({ color: i % 2 ? PAL.leaf : PAL.leafDark }));
    ball.position.set((i % 2 ? 0.35 : -0.28), 1.5 + i * 0.22, (i < 2 ? 0.28 : -0.22));
    ball.castShadow = true;
    g.add(ball);
  }
  g.scale.setScalar(scale);
  return g;
}

export function createBush(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4 * scale, 1), toon({ color: PAL.leafDark }));
  ball.position.y = 0.3 * scale;
  ball.castShadow = true;
  g.add(ball);
  return g;
}

export function createTrafficLight(): THREE.Group {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 3.6, 8), toon({ color: '#2a2a2a' }));
  pole.position.y = 1.8;
  g.add(pole);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.3), toon({ color: '#1a1a1a' }));
  head.position.y = 3.4;
  g.add(head);
  const colors = [PAL.trafficRed, PAL.yellow, PAL.trafficGreen];
  colors.forEach((c, i) => {
    const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.11, 12), flat(c));
    lamp.position.set(0, 3.7 - i * 0.3, 0.16);
    g.add(lamp);
  });
  return g;
}

export function createCrossingGate(): THREE.Group {
  const g = new THREE.Group();
  const base = box(0.5, 0.35, 0.5, '#3a3a3a');
  base.position.y = 0.18;
  g.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.4, 8), toon({ color: '#c8c8c0' }));
  pole.position.y = 1.2;
  g.add(pole);
  // arm pivot group
  const armPivot = new THREE.Group();
  armPivot.position.y = 2.2;
  const arm = box(0.12, 0.12, 4.5, '#d0d0c8');
  arm.position.z = 2.25;
  armPivot.add(arm);
  // red stripes
  for (let i = 0; i < 5; i++) {
    const stripe = box(0.13, 0.13, 0.4, PAL.trafficRed);
    stripe.position.set(0, 0, 0.5 + i * 0.9);
    armPivot.add(stripe);
  }
  g.add(armPivot);
  // light
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), toon({ color: PAL.trafficRed, emissive: PAL.trafficRed, emissiveIntensity: 0.8 }));
  light.position.set(0, 2.6, 0);
  g.add(light);
  (g as any).userData.armPivot = armPivot;
  (g as any).userData.light = light;
  return g;
}

export function createPlatform(): THREE.Group {
  const g = new THREE.Group();
  const deck = box(18, 0.9, 3.2, PAL.concrete);
  deck.position.y = 0.45;
  g.add(deck);
  const tex = platformTexture();
  const top = new THREE.Mesh(new THREE.PlaneGeometry(18, 3.2), flat('#ffffff', { map: tex }));
  top.rotation.x = -Math.PI / 2;
  top.position.y = 0.91;
  g.add(top);
  // roof pillars + canopy
  for (let i = 0; i < 5; i++) {
    const post = box(0.15, 2.8, 0.15, PAL.pole);
    post.position.set(-7 + i * 3.5, 2.3, -1.0);
    g.add(post);
  }
  const canopy = box(18, 0.15, 2.8, PAL.roofBlue);
  canopy.position.set(0, 3.8, -0.3);
  g.add(canopy);
  // benches
  for (let i = 0; i < 3; i++) {
    const b = createBench();
    b.position.set(-5 + i * 5, 0.9, 0.4);
    g.add(b);
  }
  // yellow line already in texture
  return g;
}

export function createTrack(length: number): THREE.Group {
  const g = new THREE.Group();
  // sparse sleepers (draw-call friendly)
  const sleeperCount = Math.max(2, Math.floor(length / 1.6));
  for (let i = 0; i < sleeperCount; i++) {
    const s = box(0.28, 0.1, 2.2, PAL.sleeper);
    s.position.set(-length / 2 + (i + 0.5) * (length / sleeperCount), 0.05, 0);
    g.add(s);
  }
  for (const z of [-0.75, 0.75]) {
    const rail = box(length, 0.12, 0.1, PAL.rail);
    rail.position.set(0, 0.16, z);
    g.add(rail);
    const rail2 = box(length, 0.08, 0.22, '#8a8580');
    rail2.position.set(0, 0.08, z);
    g.add(rail2);
  }
  const ballast = box(length, 0.08, 2.6, '#7a7268');
  ballast.position.y = 0.02;
  g.add(ballast);
  return g;
}

export function createFence(length: number, color = PAL.concrete): THREE.Group {
  const g = new THREE.Group();
  const n = Math.floor(length / 1.2);
  for (let i = 0; i <= n; i++) {
    const post = box(0.12, 1.0, 0.12, color);
    post.position.set(-length / 2 + i * (length / n), 0.5, 0);
    g.add(post);
  }
  const rail = box(length, 0.1, 0.08, color);
  rail.position.y = 0.95;
  g.add(rail);
  const rail2 = box(length, 0.1, 0.08, color);
  rail2.position.y = 0.55;
  g.add(rail2);
  return g;
}

export function createBridge(width: number): THREE.Group {
  const g = new THREE.Group();
  const deck = box(width, 0.25, 4, PAL.concrete);
  deck.position.y = 1.0;
  g.add(deck);
  for (const z of [-1.8, 1.8]) {
    const rail = box(width, 0.55, 0.12, PAL.concrete);
    rail.position.set(0, 1.4, z);
    g.add(rail);
  }
  for (const x of [-width / 2 + 1, width / 2 - 1]) {
    const pier = box(1.2, 1.0, 4, PAL.concreteDark);
    pier.position.set(x, 0.5, 0);
    g.add(pier);
  }
  return g;
}

export function createWaterPlane(length: number, width: number): THREE.Group {
  const g = new THREE.Group();
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(length, width),
    toon({ color: PAL.water, transparent: true, opacity: 0.85 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.05;
  g.add(water);
  // banks
  for (const z of [-width / 2 - 0.5, width / 2 + 0.5]) {
    const bank = box(length, 0.4, 1.0, PAL.stone);
    bank.position.set(0, 0.2, z);
    g.add(bank);
  }
  return g;
}

export function createBulletinBoard(): THREE.Group {
  const g = new THREE.Group();
  const frame = box(1.8, 1.3, 0.12, PAL.woodDark);
  frame.position.y = 1.1;
  g.add(frame);
  const tex = bulletinTexture();
  const face = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 1.05), flat('#ffffff', { map: tex }));
  face.position.set(0, 1.1, 0.08);
  g.add(face);
  for (const x of [-0.7, 0.7]) {
    const leg = box(0.12, 1.6, 0.12, PAL.woodDark);
    leg.position.set(x, 0.55, 0);
    g.add(leg);
  }
  // posters
  const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.48), flat('#ffffff', { map: posterTexture('festival') }));
  p1.position.set(-0.45, 1.15, 0.1);
  g.add(p1);
  const p2 = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.48), flat('#ffffff', { map: posterTexture('lost') }));
  p2.position.set(0.45, 1.15, 0.1);
  g.add(p2);
  return g;
}

export function createMailbox(): THREE.Group {
  const g = new THREE.Group();
  const body = box(0.45, 1.1, 0.35, '#2a5a8a');
  body.position.y = 0.75;
  g.add(body);
  const slot = box(0.3, 0.06, 0.05, '#1a1a1a');
  slot.position.set(0, 1.05, 0.18);
  g.add(slot);
  const leg = box(0.12, 0.55, 0.12, '#2a5a8a');
  leg.position.y = 0.28;
  g.add(leg);
  return g;
}

export function createHedge(length: number): THREE.Group {
  const g = new THREE.Group();
  const n = Math.ceil(length / 0.8);
  for (let i = 0; i < n; i++) {
    const b = box(0.75, 0.7, 0.55, PAL.leafDark);
    b.position.set(-length / 2 + 0.4 + i * (length / n), 0.35, 0);
    g.add(b);
  }
  return g;
}

export function createPowerLines(from: THREE.Vector3, to: THREE.Vector3): THREE.Line {
  const mid = from.clone().add(to).multiplyScalar(0.5);
  mid.y -= 0.8;
  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  const pts = curve.getPoints(16);
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.Line(geo, flat(PAL.wire));
}

export function createSakuraPetals(count = 80, radius = 50): THREE.Points {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * radius * 2;
    positions[i * 3 + 1] = Math.random() * 12 + 1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: PAL.sakura, size: 0.12, transparent: true, opacity: 0.85 });
  return new THREE.Points(geo, mat);
}

export function createTrainCar(opts: { color?: string; isHead?: boolean } = {}): THREE.Group {
  const g = new THREE.Group();
  const color = opts.color ?? '#e8e8e0';
  const accent = opts.color ? '#ffffff' : '#3a6a9a';
  const body = box(12, 2.6, 2.8, color);
  body.position.y = 1.9;
  g.add(body);
  // stripe
  const stripe = box(12.05, 0.35, 2.85, accent);
  stripe.position.y = 1.35;
  g.add(stripe);
  // windows
  for (let i = 0; i < 6; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.08), toon({ color: '#b8d8e8', emissive: '#203040', emissiveIntensity: 0.2 }));
    w.position.set(-5 + i * 2, 2.3, 1.42);
    g.add(w);
    const w2 = w.clone();
    w2.position.z = -1.42;
    g.add(w2);
  }
  // roof
  const roof = box(11.8, 0.25, 2.6, '#c8c8c0');
  roof.position.y = 3.3;
  g.add(roof);
  // wheels
  for (const x of [-4.2, -2.8, 2.8, 4.2]) {
    for (const z of [-1.1, 1.1]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.2, 12), toon({ color: '#2a2a2a' }));
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.45, z);
      g.add(wheel);
    }
  }
  // doors
  for (const x of [-3.5, 0, 3.5]) {
    const door = box(1.2, 2.0, 0.06, accent);
    door.position.set(x, 1.6, 1.42);
    g.add(door);
    const door2 = door.clone();
    door2.position.z = -1.42;
    g.add(door2);
  }
  if (opts.isHead) {
    const face = box(0.3, 1.8, 2.2, '#e0e0d8');
    face.position.set(6.2, 1.9, 0);
    g.add(face);
    for (const z of [-0.7, 0.7]) {
      const light = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), flat('#fff8d0'));
      light.rotation.y = Math.PI / 2;
      light.position.set(6.36, 1.7, z);
      g.add(light);
    }
    const dest = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.35), flat('#1a3a2a'));
    dest.rotation.y = Math.PI / 2;
    dest.position.set(6.36, 2.7, 0);
    g.add(dest);
  }
  return g;
}
