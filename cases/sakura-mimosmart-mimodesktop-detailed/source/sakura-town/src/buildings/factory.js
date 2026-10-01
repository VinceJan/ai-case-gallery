/**
 * Procedural building factory for Japanese suburban / small-town architecture.
 * Returns THREE.Group with userData describing type, doors, windows, interactables.
 */
import * as THREE from 'three';
import {
  toonMaterial,
  unlitMaterial,
  signTexture,
  woodTexture,
  sidingTexture,
  tileRoofTexture,
  concreteTexture,
} from '../utils/materials.js';

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

function cyl(r, h, mat, x = 0, y = 0, z = 0, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  m.position.set(x, y, z);
  return m;
}

// ---------- shared texture materials ----------
const texCache = {};
function texMat(key, factory, color = '#ffffff') {
  if (!texCache[key]) {
    texCache[key] = new THREE.MeshToonMaterial({ map: factory(), color });
  }
  return texCache[key];
}

export function createHouse(opts = {}) {
  const {
    width = 8,
    depth = 7,
    floors = 2,
    wallColor = '#d9cfc0',
    roofColor = '#4a5568',
    style = 'modern', // modern | showa | shop
    name = '住宅',
  } = opts;

  const g = new THREE.Group();
  g.userData.kind = 'house';
  g.userData.name = name;

  const wallH = floors * 2.7;
  const wallMat = texMat(`siding-${wallColor}`, () => sidingTexture(wallColor), wallColor);
  const roofMat = texMat(`roof-${roofColor}`, () => tileRoofTexture(roofColor), roofColor);
  const woodMat = texMat('wood', () => woodTexture(), '#ffffff');
  const glassMat = toonMaterial('#9ec8e0', { transparent: true, opacity: 0.55 });
  const darkMat = toonMaterial('#3a3a42');
  const trimMat = toonMaterial('#f0ebe0');

  // main body
  g.add(box(width, wallH, depth, wallMat, 0, wallH / 2, 0));

  // foundation
  g.add(box(width + 0.3, 0.35, depth + 0.3, concreteTextureMat(), 0, 0.18, 0));

  // roof — proper rectangular hip (4-sided pyramid scaled to the building box)
  const roofH = 1.55 + floors * 0.12;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 4), roofMat);
  // ConeGeometry(…, 4) base is a diamond; rotate 45° so edges align with X/Z
  roof.rotation.y = Math.PI / 4;
  roof.scale.set((width + 0.2) * 0.72, roofH, (depth + 0.2) * 0.72);
  roof.position.y = wallH + roofH * 0.5 - 0.05;
  g.add(roof);

  // eaves (thin slab) so the roof does not look like it is folding into the walls
  g.add(box(width + 0.55, 0.14, depth + 0.55, roofMat, 0, wallH + 0.07, 0));
  // ridge cap
  g.add(box(0.35, 0.12, Math.max(1.2, depth * 0.35), roofMat, 0, wallH + roofH - 0.05, 0));

  // windows
  const windowRows = floors;
  for (let f = 0; f < windowRows; f++) {
    const y = 1.5 + f * 2.7;
    // front
    for (const x of [-width * 0.28, width * 0.28]) {
      g.add(makeWindow(1.3, 1.4, x, y, depth / 2 + 0.06, 0, glassMat, trimMat, darkMat));
    }
    // sides
    for (const z of [-depth * 0.2, depth * 0.2]) {
      g.add(makeWindow(1.2, 1.3, width / 2 + 0.06, y, z, Math.PI / 2, glassMat, trimMat, darkMat));
      g.add(makeWindow(1.2, 1.3, -width / 2 - 0.06, y, z, -Math.PI / 2, glassMat, trimMat, darkMat));
    }
  }

  // door
  const door = box(1.15, 2.15, 0.12, woodMat, 0, 1.08, depth / 2 + 0.08);
  door.name = 'door';
  door.userData = { interact: 'door', label: '开门', open: false, hingeSide: 1 };
  g.add(door);

  // entrance step / porch
  g.add(box(2.2, 0.18, 1.2, concreteTextureMat(), 0, 0.12, depth / 2 + 0.7));
  g.add(box(0.12, 2.4, 0.12, trimMat, -1.1, 1.2, depth / 2 + 1.1));
  g.add(box(0.12, 2.4, 0.12, trimMat, 1.1, 1.2, depth / 2 + 1.1));
  g.add(box(2.4, 0.12, 1.3, roofMat, 0, 2.45, depth / 2 + 0.75));

  // AC outdoor unit
  const ac = box(0.8, 0.55, 0.35, toonMaterial('#c8c8c8'), width / 2 + 0.25, 1.5, -depth * 0.15);
  g.add(ac);
  // utility meter
  g.add(box(0.35, 0.5, 0.2, darkMat, -width / 2 + 0.3, 1.2, depth / 2 + 0.12));

  // small fence / hedge
  if (style !== 'shop') {
    const hedgeMat = toonMaterial('#3f7a42');
    for (const x of [-width * 0.42, width * 0.42]) {
      g.add(box(0.7, 0.85, depth * 0.7, hedgeMat, x, 0.45, 0.3));
    }
  }

  // mailbox
  const mb = box(0.28, 0.4, 0.18, toonMaterial('#6a7a8a'), -1.6, 1.0, depth / 2 + 1.0);
  g.add(mb);

  g.userData.footprint = { w: width + 1.2, d: depth + 1.2 };
  g.userData.doorLocal = new THREE.Vector3(0, 1.2, depth / 2 + 0.2);
  return g;
}

function makeWindow(w, h, x, y, z, rotY, glassMat, trimMat, darkMat) {
  const grp = new THREE.Group();
  grp.position.set(x, y, z);
  grp.rotation.y = rotY;
  grp.add(box(w, h, 0.08, trimMat));
  grp.add(box(w - 0.12, h - 0.12, 0.1, glassMat, 0, 0, 0.03));
  grp.add(box(0.06, h - 0.1, 0.12, darkMat));
  grp.add(box(w - 0.1, 0.06, 0.12, darkMat));
  // sill
  grp.add(box(w + 0.12, 0.08, 0.18, trimMat, 0, -h / 2 - 0.05, 0.06));
  return grp;
}

function concreteTextureMat() {
  return texMat('concrete', () => concreteTexture(), '#b0b4ba');
}

export function createKonbini(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'konbini';
  g.userData.name = opts.name || '二十四小时便利店';

  const W = 12;
  const D = 8;
  const H = 3.6;

  const wallMat = toonMaterial('#f2f2f2');
  const accent = toonMaterial('#2a6aaa');
  const glassMat = toonMaterial('#b8d8e8', { transparent: true, opacity: 0.35 });
  const darkMat = toonMaterial('#2c2c34');
  const floorMat = texMat('tile', () => concreteTexture('#d8d4cc'), '#e8e4dc');

  g.add(box(W, H, D, wallMat, 0, H / 2, 0));
  // blue stripe
  g.add(box(W + 0.08, 0.55, D + 0.08, accent, 0, H - 0.35, 0));
  // flat roof
  g.add(box(W + 0.5, 0.25, D + 0.5, toonMaterial('#8a9098'), 0, H + 0.12, 0));

  // storefront glass
  g.add(box(W * 0.85, 2.5, 0.1, glassMat, 0, 1.5, D / 2 + 0.06));

  // sliding auto doors
  const doorL = box(1.5, 2.4, 0.12, glassMat, -0.8, 1.2, D / 2 + 0.12);
  doorL.name = 'door';
  doorL.userData = { interact: 'door', label: '自动门', open: false, auto: true };
  g.add(doorL);
  const doorR = doorL.clone();
  doorR.position.x = 0.8;
  g.add(doorR);
  g.userData.doors = [doorL, doorR];

  // sign
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(6.5, 1.1, 0.15),
    new THREE.MeshBasicMaterial({ map: signTexture('さくらマート', '#1a6aaa', '#fff', false, 'KONBINI') })
  );
  sign.position.set(0, H + 0.55, D / 2 + 0.2);
  g.add(sign);
  g.userData.sign = sign;

  // vending machine beside store
  const vend = createVendingMachine();
  vend.position.set(W / 2 + 1.2, 0, 2.2);
  g.add(vend);

  // trash bins
  const bin = box(0.7, 1.0, 0.7, toonMaterial('#3a6a4a'), W / 2 + 1.0, 0.5, -1.5);
  g.add(bin);

  // outdoor AC
  g.add(box(1.0, 0.6, 0.4, toonMaterial('#c8c8c8'), -W / 2 - 0.3, 2.2, -2));

  // bicycle parking
  for (let i = 0; i < 3; i++) {
    const bike = createBicycle(toonMaterial(['#c45c48', '#3a6a8a', '#5a7a4a'][i]));
    bike.position.set(-W / 2 - 2.2 - i * 1.1, 0, 3.2);
    bike.rotation.y = 0.3;
    g.add(bike);
  }

  g.userData.footprint = { w: W + 4, d: D + 2 };
  g.userData.doorLocal = new THREE.Vector3(0, 1.2, D / 2 + 0.3);
  g.userData.shop = {
    id: 'konbini',
    openHour: 0,
    closeHour: 24,
    items: [
      { id: 'onigiri', name: '饭团', price: 180, kind: 'food', heal: 1 },
      { id: 'tea', name: '罐装茶', price: 130, kind: 'drink' },
      { id: 'bento', name: '便当', price: 480, kind: 'food', heal: 2 },
      { id: 'umbrella', name: '折叠伞', price: 600, kind: 'tool' },
    ],
  };
  return g;
}

export function createVendingMachine(color = '#d4483c') {
  const g = new THREE.Group();
  const body = box(1.1, 1.9, 0.75, toonMaterial(color), 0, 0.95, 0);
  body.userData = { interact: 'vending', label: '自动售货机', price: 140 };
  g.add(body);
  // glass window
  g.add(box(0.85, 1.1, 0.06, toonMaterial('#2a3a4a', { transparent: true, opacity: 0.7 }), 0, 1.25, 0.4));
  // product rows
  const productColors = ['#f0d060', '#70c080', '#e08070', '#80a0e0'];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      g.add(
        box(0.18, 0.28, 0.06, toonMaterial(productColors[(row + col) % 4]),
          -0.28 + col * 0.28, 1.65 - row * 0.35, 0.42)
      );
    }
  }
  // coin slot + button
  g.add(box(0.2, 0.08, 0.06, toonMaterial('#222'), 0.35, 0.75, 0.42));
  g.add(box(0.12, 0.12, 0.06, toonMaterial('#e8e8e8'), 0.35, 0.55, 0.42));
  // dispense tray
  g.add(box(0.55, 0.18, 0.08, toonMaterial('#1a1a1a'), -0.1, 0.35, 0.42));
  return g;
}

export function createBicycle(colorMat) {
  const g = new THREE.Group();
  const metal = toonMaterial('#444850');
  const wheelGeo = new THREE.TorusGeometry(0.32, 0.045, 8, 16);
  const w1 = new THREE.Mesh(wheelGeo, metal);
  w1.position.set(-0.45, 0.32, 0);
  w1.rotation.y = Math.PI / 2;
  g.add(w1);
  const w2 = w1.clone();
  w2.position.x = 0.45;
  g.add(w2);
  const frame = box(0.85, 0.06, 0.06, colorMat || toonMaterial('#c45c48'), 0, 0.55, 0);
  frame.rotation.z = 0.15;
  g.add(frame);
  g.add(box(0.06, 0.45, 0.06, metal, -0.45, 0.48, 0));
  g.add(box(0.06, 0.5, 0.06, metal, 0.45, 0.52, 0));
  g.add(box(0.35, 0.06, 0.06, metal, 0.45, 0.78, 0));
  g.add(box(0.2, 0.08, 0.18, toonMaterial('#222'), -0.2, 0.72, 0));
  return g;
}

export function createCafe(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'cafe';
  g.userData.name = opts.name || '珈琲 さくら';

  const W = 10;
  const D = 8;
  const H = 3.4;

  const wallMat = texMat('cafe-wall', () => woodTexture('#a07858'), '#b08868');
  const roofMat = toonMaterial('#5a4038');
  const glassMat = toonMaterial('#c8e0e8', { transparent: true, opacity: 0.4 });
  const trimMat = toonMaterial('#f0e8d8');

  g.add(box(W, H, D, wallMat, 0, H / 2, 0));
  // awning
  const awning = box(W * 0.7, 0.12, 2.2, toonMaterial('#c45c48'), 0, 2.6, D / 2 + 1.0);
  awning.rotation.x = -0.15;
  g.add(awning);
  g.add(box(0.1, 2.5, 0.1, trimMat, -W * 0.32, 1.25, D / 2 + 1.9));
  g.add(box(0.1, 2.5, 0.1, trimMat, W * 0.32, 1.25, D / 2 + 1.9));

  // storefront
  g.add(box(W * 0.7, 2.2, 0.1, glassMat, 0, 1.35, D / 2 + 0.05));
  // door
  const door = box(1.2, 2.3, 0.12, woodTextureMat(), -W * 0.28, 1.15, D / 2 + 0.1);
  door.userData = { interact: 'door', label: '推开木门', open: false };
  g.add(door);

  // sign
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.9, 0.12),
    new THREE.MeshBasicMaterial({ map: signTexture('珈琲さくら', '#3a2818', '#f0e0c0') })
  );
  sign.position.set(W * 0.15, H + 0.2, D / 2 + 0.15);
  g.add(sign);

  // menu board outside
  g.add(box(0.9, 1.2, 0.08, toonMaterial('#2a2a2a'), -W / 2 + 0.2, 1.3, D / 2 + 1.2));
  g.add(box(0.7, 1.0, 0.06, toonMaterial('#f0e8d0'), -W / 2 + 0.2, 1.3, D / 2 + 1.26));

  // flower pots
  for (const x of [-W / 2 + 1, W / 2 - 1]) {
    g.add(cyl(0.28, 0.35, toonMaterial('#a06040'), x, 0.18, D / 2 + 1.4));
    g.add(cyl(0.32, 0.45, toonMaterial('#d06080'), x, 0.55, D / 2 + 1.4, 8));
  }

  // chimney
  g.add(box(0.55, 1.4, 0.55, toonMaterial('#8a7060'), W * 0.25, H + 0.7, -D * 0.15));

  g.userData.footprint = { w: W + 2, d: D + 3 };
  g.userData.doorLocal = new THREE.Vector3(-W * 0.28, 1.2, D / 2 + 0.3);
  g.userData.shop = {
    id: 'cafe',
    openHour: 8,
    closeHour: 19,
    items: [
      { id: 'coffee', name: '手冲咖啡', price: 450, kind: 'drink' },
      { id: 'toast', name: '厚吐司', price: 380, kind: 'food' },
      { id: 'cake', name: '草莓蛋糕', price: 520, kind: 'food', heal: 2 },
    ],
  };
  return g;
}

function woodTextureMat() {
  return texMat('wood-door', () => woodTexture('#8b5a3c'), '#ffffff');
}

export function createSchool(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'school';
  g.userData.name = opts.name || '桜町中学校';

  const W = 22;
  const D = 10;
  const H = 8.2;
  const wallMat = toonMaterial('#d8c8b0');
  const roofMat = toonMaterial('#5a6a78');
  const glassMat = toonMaterial('#8eb8d0', { transparent: true, opacity: 0.5 });
  const trimMat = toonMaterial('#f0e8d8');
  const concrete = concreteTextureMat();

  // main block
  g.add(box(W, H, D, wallMat, 0, H / 2, 0));
  g.add(box(W + 0.6, 0.35, D + 0.6, roofMat, 0, H + 0.15, 0));

  // window grid
  for (let floor = 0; floor < 3; floor++) {
    const y = 1.8 + floor * 2.5;
    for (let i = 0; i < 8; i++) {
      const x = -W / 2 + 2.2 + i * 2.5;
      g.add(makeWindow(1.5, 1.35, x, y, D / 2 + 0.08, 0, glassMat, trimMat, toonMaterial('#3a3a42')));
    }
  }

  // entrance
  g.add(box(4.5, 3.2, 2.2, concrete, 0, 1.6, D / 2 + 1.1));
  const door = box(2.4, 2.5, 0.15, toonMaterial('#4a6070'), 0, 1.25, D / 2 + 2.25);
  door.userData = { interact: 'door', label: '学校大门', open: false };
  g.add(door);
  // entrance steps
  for (let i = 0; i < 3; i++) {
    g.add(box(5 - i * 0.3, 0.18, 0.55, concrete, 0, 0.09 + i * 0.18, D / 2 + 2.6 + i * 0.5));
  }

  // clock
  const clock = cyl(0.7, 0.12, toonMaterial('#f0f0e8'), 0, 4.2, D / 2 + 2.3, 16);
  clock.rotation.x = Math.PI / 2;
  g.add(clock);
  g.add(box(0.08, 0.45, 0.08, toonMaterial('#222'), 0, 4.2, D / 2 + 2.38));
  const hand = box(0.08, 0.32, 0.08, toonMaterial('#222'), 0.1, 4.35, D / 2 + 2.38);
  hand.rotation.z = -0.6;
  g.add(hand);

  // school gate pillars
  g.add(box(0.7, 3.2, 0.7, toonMaterial('#8a7060'), -6, 1.6, D / 2 + 5.5));
  g.add(box(0.7, 3.2, 0.7, toonMaterial('#8a7060'), 6, 1.6, D / 2 + 5.5));
  g.add(box(12.8, 0.35, 0.5, toonMaterial('#6a5040'), 0, 3.2, D / 2 + 5.5));

  // sports field mark
  const field = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 12),
    toonMaterial('#5f9a5a')
  );
  field.rotation.x = -Math.PI / 2;
  field.position.set(0, 0.05, -D / 2 - 8);
  g.add(field);

  // goal posts
  for (const sx of [-6, 6]) {
    g.add(box(0.15, 2.2, 0.15, toonMaterial('#e8e8e8'), sx, 1.1, -D / 2 - 12));
    g.add(box(0.15, 2.2, 0.15, toonMaterial('#e8e8e8'), sx, 1.1, -D / 2 - 4));
    g.add(box(0.12, 0.12, 8, toonMaterial('#e8e8e8'), sx, 2.2, -D / 2 - 8));
  }

  g.userData.footprint = { w: W + 6, d: D + 16 };
  g.userData.doorLocal = new THREE.Vector3(0, 1.3, D / 2 + 2.4);
  return g;
}

export function createStation(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'station';
  g.userData.name = opts.name || '桜町駅';

  const W = 16;
  const D = 7;
  const H = 4.2;

  const wallMat = toonMaterial('#e8dcc8');
  const roofMat = toonMaterial('#3a5a6a');
  const trimMat = toonMaterial('#2a3a48');
  const glassMat = toonMaterial('#a0c8d8', { transparent: true, opacity: 0.45 });
  const wood = woodTextureMat();

  // station building
  g.add(box(W, H, D, wallMat, 0, H / 2, 0));
  // hipped roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 4), roofMat);
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(W * 0.72, 2.0, D * 0.72);
  roof.position.y = H + 0.9;
  g.add(roof);
  g.add(box(W + 0.8, 0.15, D + 0.8, roofMat, 0, H + 0.1, 0));

  // ticket windows
  for (const x of [-4, -1, 2]) {
    g.add(box(2.0, 1.6, 0.12, glassMat, x, 1.8, D / 2 + 0.08));
    g.add(box(2.2, 0.25, 0.4, wood, x, 1.0, D / 2 + 0.35));
  }

  // gate
  const door = box(3.2, 2.6, 0.14, toonMaterial('#2a4a5a'), 5.5, 1.3, D / 2 + 0.1);
  door.userData = { interact: 'door', label: '车站入口', open: false };
  g.add(door);

  // station name sign
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.85, 0.12),
    new THREE.MeshBasicMaterial({ map: signTexture('桜町', '#f0f0e8', '#1a2a3a', false, 'Sakuramachi') })
  );
  sign.position.set(0, H + 0.35, D / 2 + 0.2);
  g.add(sign);

  // benches on platform side
  for (const x of [-5, -1, 3]) {
    g.add(createBench(x, -D / 2 - 1.8));
  }

  // platform (toward railway)
  const platform = box(W + 10, 0.75, 5.5, concreteTextureMat(), 0, 0.38, -D / 2 - 4.2);
  g.add(platform);
  // yellow safety line
  g.add(box(W + 8, 0.04, 0.35, unlitMaterial('#e0c040'), 0, 0.78, -D / 2 - 6.6));
  // canopy
  const canopy = box(W + 6, 0.18, 4.2, roofMat, 0, 3.4, -D / 2 - 4.0);
  g.add(canopy);
  for (let i = -3; i <= 3; i++) {
    g.add(box(0.18, 2.8, 0.18, trimMat, i * 2.6, 1.9, -D / 2 - 5.8));
    g.add(box(0.18, 2.8, 0.18, trimMat, i * 2.6, 1.9, -D / 2 - 2.4));
  }

  // station clock
  const clockFace = cyl(0.55, 0.1, toonMaterial('#f8f4e8'), 0, 3.1, D / 2 + 0.3, 16);
  clockFace.rotation.x = Math.PI / 2;
  g.add(clockFace);

  // ticket machine
  const tm = box(0.9, 1.7, 0.6, toonMaterial('#c8a060'), -6.5, 0.85, D / 2 + 0.8);
  tm.userData = { interact: 'ticket', label: '自动售票机' };
  g.add(tm);

  // bicycle parking roof
  const bikeRoof = box(5, 0.12, 3, roofMat, -W / 2 - 3.5, 2.2, 1);
  g.add(bikeRoof);
  for (const x of [-W / 2 - 5.2, -W / 2 - 1.8]) {
    g.add(box(0.12, 2.2, 0.12, trimMat, x, 1.1, 0));
    g.add(box(0.12, 2.2, 0.12, trimMat, x, 1.1, 2));
  }
  for (let i = 0; i < 2; i++) {
    const b = createBicycle(toonMaterial(['#4a7a9a', '#8a5a4a'][i]));
    b.position.set(-W / 2 - 4.2 - i * 1.0, 0, 1.0);
    g.add(b);
  }

  g.userData.footprint = { w: W + 14, d: D + 12 };
  g.userData.doorLocal = new THREE.Vector3(5.5, 1.3, D / 2 + 0.3);
  g.userData.isStation = true;
  return g;
}

function createBench(x, z) {
  const g = new THREE.Group();
  const wood = toonMaterial('#8b6a4a');
  const metal = toonMaterial('#3a3a42');
  g.add(box(1.8, 0.1, 0.55, wood, 0, 0.45, 0));
  g.add(box(1.8, 0.55, 0.1, wood, 0, 0.85, -0.22));
  g.add(box(0.12, 0.45, 0.12, metal, -0.7, 0.22, 0.15));
  g.add(box(0.12, 0.45, 0.12, metal, 0.7, 0.22, 0.15));
  g.position.set(x, 0, z);
  return g;
}

export function createShrine(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'shrine';
  g.userData.name = opts.name || '稲荷神社';

  const vermillion = toonMaterial('#c45c3c');
  const darkWood = toonMaterial('#3a2818');
  const stone = toonMaterial('#a8a49c');
  const gold = toonMaterial('#d4b060');
  const roofMat = toonMaterial('#2a2a2a');

  // stone steps
  for (let i = 0; i < 6; i++) {
    g.add(box(4.5 - i * 0.15, 0.22, 1.0, stone, 0, 0.11 + i * 0.22, 6 - i * 1.0));
  }

  // torii gate
  const torii = new THREE.Group();
  torii.position.set(0, 0, 3.5);
  torii.add(box(0.35, 3.6, 0.35, vermillion, -1.6, 1.8, 0));
  torii.add(box(0.35, 3.6, 0.35, vermillion, 1.6, 1.8, 0));
  torii.add(box(4.4, 0.32, 0.45, vermillion, 0, 3.5, 0));
  torii.add(box(5.0, 0.28, 0.55, vermillion, 0, 3.85, 0));
  torii.add(box(4.0, 0.22, 0.35, darkWood, 0, 2.7, 0));
  g.add(torii);

  // main hall
  const hall = new THREE.Group();
  hall.position.set(0, 1.4, -2);
  hall.add(box(5.2, 2.4, 4.2, vermillion, 0, 1.2, 0));
  hall.add(box(4.2, 0.35, 3.4, darkWood, 0, 2.55, 0));
  // roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 4), roofMat);
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(4.2, 1.8, 3.6);
  roof.position.y = 3.6;
  hall.add(roof);
  // gold ornament
  hall.add(cyl(0.18, 0.45, gold, 0, 4.7, 0, 8));
  // offering box
  const boxMesh = box(1.4, 0.7, 0.8, darkWood, 0, 0.35, 2.4);
  boxMesh.userData = { interact: 'offering', label: '赛钱箱', price: 50 };
  hall.add(boxMesh);
  // steps to hall
  hall.add(box(3.5, 0.25, 0.8, stone, 0, 0.12, 2.6));
  g.add(hall);

  // lanterns
  for (const x of [-2.4, 2.4]) {
    const l = new THREE.Group();
    l.add(cyl(0.12, 1.2, stone, 0, 0.6, 0));
    l.add(box(0.55, 0.55, 0.55, stone, 0, 1.4, 0));
    l.add(box(0.7, 0.12, 0.7, stone, 0, 1.75, 0));
    l.position.set(x, 1.4, 1.2);
    g.add(l);
  }

  // shimenawa rope
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.2, 8), toonMaterial('#d8c890'));
  rope.rotation.z = Math.PI / 2;
  rope.position.set(0, 3.1, 3.5);
  g.add(rope);

  // sacred tree
  const treeTrunk = cyl(0.55, 5, toonMaterial('#4a3828'), 5.5, 2.5, -1);
  g.add(treeTrunk);
  for (const [dx, dy, dz, s] of [
    [5.5, 6, -1, 2.8],
    [4.2, 5.2, -0.5, 1.8],
    [6.8, 5.0, -1.5, 1.7],
    [5.5, 7.2, -1, 1.5],
  ]) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(s, 10, 8), toonMaterial('#2f6a38'));
    c.position.set(dx, dy, dz);
    g.add(c);
  }

  // ema plaques
  for (let i = 0; i < 4; i++) {
    const ema = box(0.35, 0.28, 0.05, toonMaterial('#e8d0a0'), -3.2 + (i % 2) * 0.5, 1.5 + Math.floor(i / 2) * 0.4, 2.8);
    ema.rotation.y = 0.15 * (i % 2 ? 1 : -1);
    g.add(ema);
  }

  g.userData.footprint = { w: 12, d: 14 };
  g.userData.doorLocal = new THREE.Vector3(0, 2.0, 0.5);
  return g;
}

export function createShopRow(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'shoprow';
  g.userData.name = opts.name || '商店街';

  const shops = [
    { name: '青果店', color: '#d4845c', sign: '青果', w: 7 },
    { name: '书店', color: '#6a8a6a', sign: '本屋', w: 6.5 },
    { name: '五金', color: '#7a7a8a', sign: '金物', w: 7.5 },
  ];

  let x = -11;
  for (const s of shops) {
    const unit = createShopUnit(s);
    unit.position.x = x + s.w / 2;
    g.add(unit);
    x += s.w + 0.4;
  }

  g.userData.footprint = { w: 24, d: 10 };
  g.userData.doorLocal = new THREE.Vector3(-7, 1.2, 4.5);
  return g;
}

function createShopUnit(s) {
  const g = new THREE.Group();
  const W = s.w;
  const D = 7;
  const H = 3.8;
  const wall = toonMaterial(s.color);
  const wood = woodTextureMat();
  const glass = toonMaterial('#b0d0e0', { transparent: true, opacity: 0.4 });
  const roof = toonMaterial('#3a4048');

  g.add(box(W, H, D, wall, 0, H / 2, 0));
  g.add(box(W + 0.35, 0.2, D + 0.35, roof, 0, H + 0.1, 0));
  // tiled awning
  const awn = box(W + 0.2, 0.12, 1.6, toonMaterial('#5a5a62'), 0, 2.7, D / 2 + 0.8);
  awn.rotation.x = -0.12;
  g.add(awn);

  // display window
  g.add(box(W * 0.7, 1.8, 0.1, glass, 0, 1.4, D / 2 + 0.06));
  // door
  const door = box(1.1, 2.1, 0.12, wood, -W * 0.28, 1.05, D / 2 + 0.1);
  door.userData = { interact: 'door', label: `进入${s.name}`, open: false };
  g.add(door);

  // sign
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(W * 0.7, 0.75, 0.1),
    new THREE.MeshBasicMaterial({ map: signTexture(s.sign, '#2a2a2a', '#f0e0c0', true) })
  );
  sign.position.set(-W * 0.35, H * 0.55, D / 2 + 0.12);
  g.add(sign);

  // noren curtain
  const noren = box(W * 0.45, 0.55, 0.05, toonMaterial('#c45c48'), 0, 2.35, D / 2 + 0.08);
  g.add(noren);

  // second floor window
  if (s.w > 6.8) {
    g.add(makeWindow(1.2, 1.1, W * 0.15, 3.1, D / 2 + 0.08, 0, glass, toonMaterial('#f0e8d8'), toonMaterial('#3a3a42')));
  }

  return g;
}

export function createClinic(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'clinic';
  g.userData.name = opts.name || 'さくらクリニック';

  const W = 10;
  const D = 8;
  const H = 5;
  const wall = toonMaterial('#e8f0f0');
  const roof = toonMaterial('#4a6a7a');
  const glass = toonMaterial('#a0c8d8', { transparent: true, opacity: 0.45 });
  const cross = toonMaterial('#e05050');

  g.add(box(W, H, D, wall, 0, H / 2, 0));
  g.add(box(W + 0.4, 0.25, D + 0.4, roof, 0, H + 0.12, 0));
  // red cross
  g.add(box(0.7, 1.8, 0.15, cross, W / 2 - 0.2, H - 0.6, D / 2 + 0.12));
  g.add(box(1.6, 0.7, 0.15, cross, W / 2 - 0.2, H - 0.6, D / 2 + 0.12));

  for (let f = 0; f < 2; f++) {
    for (let i = 0; i < 4; i++) {
      g.add(makeWindow(1.4, 1.3, -W / 2 + 1.8 + i * 2.2, 1.8 + f * 2.4, D / 2 + 0.08, 0, glass, toonMaterial('#f0f4f4'), toonMaterial('#3a3a42')));
    }
  }

  const door = box(1.5, 2.3, 0.12, toonMaterial('#3a6a7a'), 0, 1.15, D / 2 + 0.1);
  door.userData = { interact: 'door', label: '诊所入口', open: false };
  g.add(door);

  // ramp
  const ramp = box(2.2, 0.12, 2.5, concreteTextureMat(), 0, 0.35, D / 2 + 1.8);
  ramp.rotation.x = -0.12;
  g.add(ramp);

  g.userData.footprint = { w: W + 2, d: D + 4 };
  g.userData.doorLocal = new THREE.Vector3(0, 1.2, D / 2 + 0.3);
  return g;
}

export function createPostOffice(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'post';
  g.userData.name = opts.name || '桜町郵便局';

  const W = 9;
  const D = 7;
  const H = 3.8;
  g.add(box(W, H, D, toonMaterial('#f0e8d0'), 0, H / 2, 0));
  g.add(box(W + 0.3, 0.2, D + 0.3, toonMaterial('#c4a060'), 0, H + 0.1, 0));

  // red "〒" mark
  const t1 = box(0.35, 1.3, 0.12, toonMaterial('#d04040'), -W / 2 + 1.2, H - 0.8, D / 2 + 0.1);
  g.add(t1);
  g.add(box(1.1, 0.3, 0.12, toonMaterial('#d04040'), -W / 2 + 1.2, H - 0.8, D / 2 + 0.1));
  g.add(box(0.9, 0.28, 0.12, toonMaterial('#d04040'), -W / 2 + 1.2, H - 1.25, D / 2 + 0.1));

  const door = box(1.2, 2.2, 0.12, woodTextureMat(), 0, 1.1, D / 2 + 0.1);
  door.userData = { interact: 'door', label: '邮局入口', open: false };
  g.add(door);

  // post box
  const pb = box(0.55, 1.15, 0.4, toonMaterial('#d04040'), 2.4, 0.58, D / 2 + 1.2);
  pb.userData = { interact: 'postbox', label: '邮筒' };
  g.add(pb);

  g.userData.footprint = { w: W + 2, d: D + 3 };
  g.userData.doorLocal = new THREE.Vector3(0, 1.2, D / 2 + 0.3);
  return g;
}

export function createWarehouse(opts = {}) {
  const g = new THREE.Group();
  g.userData.kind = 'warehouse';
  g.userData.name = opts.name || '仓库';

  const W = 11;
  const D = 7;
  const H = 4;
  g.add(box(W, H, D, toonMaterial('#7a8890'), 0, H / 2, 0));
  // corrugated roof
  const roof = box(W + 0.3, 0.2, D + 0.3, toonMaterial('#5a6a72'), 0, H + 0.1, 0);
  roof.rotation.z = 0.04;
  g.add(roof);

  // roller door
  const door = box(3.2, 2.8, 0.18, toonMaterial('#4a5a62'), 0, 1.4, D / 2 + 0.1);
  door.userData = { interact: 'door', label: '卷帘门', open: false };
  g.add(door);

  g.userData.footprint = { w: W + 1, d: D + 1 };
  g.userData.doorLocal = new THREE.Vector3(0, 1.4, D / 2 + 0.3);
  return g;
}
