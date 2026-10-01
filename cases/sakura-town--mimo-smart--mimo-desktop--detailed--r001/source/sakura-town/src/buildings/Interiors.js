/**
 * Interior furniture kits and building interiors.
 * Interiors are attached to buildings and revealed when player enters.
 */
import * as THREE from 'three';
import {
  toonMaterial,
  unlitMaterial,
  woodTexture,
  concreteTexture,
  sidingTexture,
} from '../utils/materials.js';

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

export function createSofa(color = '#5a7a9a') {
  const g = new THREE.Group();
  const mat = toonMaterial(color);
  g.add(box(1.8, 0.45, 0.85, mat, 0, 0.35, 0));
  g.add(box(1.8, 0.7, 0.2, mat, 0, 0.75, -0.32));
  g.add(box(0.22, 0.55, 0.85, mat, -0.9, 0.55, 0));
  g.add(box(0.22, 0.55, 0.85, mat, 0.9, 0.55, 0));
  const cushion = toonMaterial('#6a8aaa');
  g.add(box(0.7, 0.14, 0.7, cushion, -0.4, 0.62, 0.05));
  g.add(box(0.7, 0.14, 0.7, cushion, 0.4, 0.62, 0.05));
  return g;
}

export function createTable(w = 1.2, d = 0.7, h = 0.7) {
  const g = new THREE.Group();
  const wood = toonMaterial('#8b6a4a');
  g.add(box(w, 0.08, d, wood, 0, h, 0));
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    g.add(box(0.08, h, 0.08, wood, (sx * w) / 2.3, h / 2, (sz * d) / 2.3));
  }
  return g;
}

export function createChair(color = '#6a5a4a') {
  const g = new THREE.Group();
  const mat = toonMaterial(color);
  g.add(box(0.45, 0.08, 0.45, mat, 0, 0.45, 0));
  g.add(box(0.45, 0.55, 0.08, mat, 0, 0.72, -0.2));
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    g.add(box(0.06, 0.45, 0.06, mat, sx * 0.18, 0.22, sz * 0.18));
  }
  g.userData = { interact: 'sit', label: '坐下' };
  return g;
}

export function createBed(color = '#c8d0e0') {
  const g = new THREE.Group();
  const wood = toonMaterial('#6a5a4a');
  const sheet = toonMaterial(color);
  g.add(box(1.4, 0.35, 2.1, wood, 0, 0.25, 0));
  g.add(box(1.3, 0.18, 1.9, sheet, 0, 0.52, 0.05));
  g.add(box(1.3, 0.25, 0.45, toonMaterial('#f0f0f0'), 0, 0.58, -0.72));
  g.add(box(1.4, 0.7, 0.12, wood, 0, 0.7, -1.1));
  return g;
}

export function createKitchenCounter(len = 2.4) {
  const g = new THREE.Group();
  const body = toonMaterial('#d0c8b8');
  const top = toonMaterial('#e8e4dc');
  const metal = toonMaterial('#b0b4b8');
  g.add(box(len, 0.9, 0.65, body, 0, 0.45, 0));
  g.add(box(len + 0.08, 0.08, 0.72, top, 0, 0.93, 0));
  // stove
  g.add(box(0.7, 0.06, 0.55, metal, -len * 0.25, 0.98, 0));
  for (const dx of [-0.15, 0.15]) {
    for (const dz of [-0.12, 0.12]) {
      g.add(box(0.18, 0.03, 0.18, toonMaterial('#2a2a2a'), -len * 0.25 + dx, 1.02, dz));
    }
  }
  // sink
  g.add(box(0.5, 0.12, 0.4, toonMaterial('#c8ccd0'), len * 0.22, 0.98, 0));
  // faucet
  g.add(box(0.06, 0.28, 0.06, metal, len * 0.22, 1.15, -0.22));
  g.add(box(0.06, 0.06, 0.22, metal, len * 0.22, 1.28, -0.12));
  return g;
}

export function createFridge() {
  const g = new THREE.Group();
  const body = box(0.75, 1.8, 0.7, toonMaterial('#e0e4e8'), 0, 0.9, 0);
  body.userData = { interact: 'fridge', label: '冰箱' };
  g.add(body);
  g.add(box(0.76, 0.04, 0.71, toonMaterial('#c8ccd0'), 0, 1.1, 0));
  g.add(box(0.06, 0.5, 0.08, toonMaterial('#8a8a8a'), 0.32, 1.35, 0.38));
  return g;
}

export function createBookshelf(w = 1.4) {
  const g = new THREE.Group();
  const wood = toonMaterial('#7a5a42');
  g.add(box(w, 2.0, 0.35, wood, 0, 1.0, 0));
  const bookColors = ['#c45c48', '#3a6a8a', '#5a8a5a', '#c4a048', '#8a5a7a'];
  for (let row = 0; row < 4; row++) {
    for (let i = 0; i < 5; i++) {
      const bh = 0.28 + (i % 3) * 0.05;
      g.add(
        box(0.16, bh, 0.28, toonMaterial(bookColors[(row * 5 + i) % 5]),
          -w / 2 + 0.25 + i * 0.22, 0.35 + row * 0.45, 0.02)
      );
    }
  }
  return g;
}

export function createTVStand() {
  const g = new THREE.Group();
  g.add(box(1.6, 0.5, 0.45, toonMaterial('#5a4a3a'), 0, 0.25, 0));
  const tv = box(1.25, 0.75, 0.08, toonMaterial('#1a1a1a'), 0, 0.95, 0);
  tv.userData = { interact: 'tv', label: '电视机' };
  g.add(tv);
  g.add(box(1.15, 0.62, 0.04, toonMaterial('#2a3a4a'), 0, 0.95, 0.05));
  return g;
}

export function createShelfUnit(w = 1.6, h = 1.8) {
  const g = new THREE.Group();
  const metal = toonMaterial('#a0a4a8');
  const wood = toonMaterial('#c8b898');
  g.add(box(w, 0.08, 0.45, wood, 0, 0.1, 0));
  g.add(box(w, 0.08, 0.45, wood, 0, 0.7, 0));
  g.add(box(w, 0.08, 0.45, wood, 0, 1.3, 0));
  g.add(box(w, 0.08, 0.45, wood, 0, 1.85, 0));
  for (const sx of [-w / 2 + 0.05, w / 2 - 0.05]) {
    g.add(box(0.08, 1.95, 0.45, metal, sx, 0.97, 0));
  }
  // goods
  const goods = ['#e06050', '#50a0c0', '#e0c040', '#60b060', '#e080b0'];
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 4; i++) {
      g.add(
        box(0.22, 0.28, 0.22, toonMaterial(goods[(row * 4 + i) % 5]),
          -w / 2 + 0.35 + i * 0.35, 0.3 + row * 0.6, 0)
      );
    }
  }
  return g;
}

export function createCounterDesk(w = 2.2) {
  const g = new THREE.Group();
  const wood = toonMaterial('#8b6a4a');
  const top = toonMaterial('#c8a878');
  g.add(box(w, 1.0, 0.7, wood, 0, 0.5, 0));
  g.add(box(w + 0.15, 0.1, 0.85, top, 0, 1.05, 0));
  return g;
}

export function createCafeTableSet() {
  const g = new THREE.Group();
  const table = createTable(0.9, 0.7, 0.72);
  g.add(table);
  const c1 = createChair('#6a5a4a');
  c1.position.set(0, 0, 0.75);
  c1.rotation.y = Math.PI;
  g.add(c1);
  const c2 = createChair('#6a5a4a');
  c2.position.set(0, 0, -0.75);
  g.add(c2);
  // cup
  g.add(box(0.12, 0.12, 0.12, toonMaterial('#f0e8d8'), 0.15, 0.84, 0.1));
  return g;
}

/**
 * Build an interior group for a given building kind.
 * Local origin is building center; +z is toward the door.
 */
export function buildInterior(kind, footprint) {
  const g = new THREE.Group();
  g.name = 'interior';
  const w = (footprint?.w ?? 8) * 0.85;
  const d = (footprint?.d ?? 7) * 0.85;
  const wallH = 2.8;
  const floorMat = toonMaterial(kind === 'konbini' ? '#e0dcd4' : '#b89a78');
  const wallMat = toonMaterial(kind === 'konbini' ? '#f2f2f2' : '#e8e0d0');

  // floor
  g.add(box(w, 0.08, d, floorMat, 0, 0.04, 0));
  // walls (with door gap at +z)
  g.add(box(w, wallH, 0.12, wallMat, 0, wallH / 2, -d / 2));
  g.add(box(0.12, wallH, d, wallMat, -w / 2, wallH / 2, 0));
  g.add(box(0.12, wallH, d, wallMat, w / 2, wallH / 2, 0));
  g.add(box(w * 0.35, wallH, 0.12, wallMat, -w * 0.32, wallH / 2, d / 2));
  g.add(box(w * 0.35, wallH, 0.12, wallMat, w * 0.32, wallH / 2, d / 2));
  // ceiling
  g.add(box(w, 0.1, d, toonMaterial('#f0ebe0'), 0, wallH + 0.05, 0));
  // ceiling light
  const lightPanel = box(1.2, 0.08, 0.6, toonMaterial('#fff8e0', { emissive: '#fff0c0', emissiveIntensity: 0.8 }), 0, wallH - 0.15, 0);
  g.add(lightPanel);
  const ptLight = new THREE.PointLight('#ffe8c0', 1.1, 12, 2);
  ptLight.position.set(0, wallH - 0.5, 0);
  g.add(ptLight);

  switch (kind) {
    case 'konbini': {
      for (let i = 0; i < 3; i++) {
        const shelf = createShelfUnit(2.0, 1.8);
        shelf.position.set(-w / 4 + i * (w / 4), 0, -d / 4);
        g.add(shelf);
      }
      const counter = createCounterDesk(2.4);
      counter.position.set(0, 0, d / 4);
      g.add(counter);
      // fridges along back wall
      for (let i = 0; i < 3; i++) {
        const fridge = createFridge();
        fridge.position.set(-w / 3 + i * 1.1, 0, -d / 2 + 0.55);
        g.add(fridge);
      }
      break;
    }
    case 'cafe': {
      const counter = createCounterDesk(2.8);
      counter.position.set(0, 0, -d / 5);
      g.add(counter);
      for (const [x, z] of [[-w / 4, d / 5], [w / 6, d / 4], [-w / 5, d / 3.2]]) {
        const set = createCafeTableSet();
        set.position.set(x, 0, z);
        g.add(set);
      }
      const shelf = createBookshelf(1.6);
      shelf.position.set(-w / 2 + 1, 0, -d / 2 + 0.4);
      g.add(shelf);
      break;
    }
    case 'house':
    case 'home': {
      // living
      const sofa = createSofa('#6a8aaa');
      sofa.position.set(-w / 5, 0, -d / 6);
      g.add(sofa);
      const tv = createTVStand();
      tv.position.set(-w / 5, 0, d / 6);
      tv.rotation.y = Math.PI;
      g.add(tv);
      const table = createTable(1.1, 0.7, 0.4);
      table.position.set(-w / 5, 0, 0);
      g.add(table);
      // kitchen
      const kit = createKitchenCounter(2.2);
      kit.position.set(w / 4, 0, -d / 3);
      g.add(kit);
      const fridge = createFridge();
      fridge.position.set(w / 2 - 0.7, 0, -d / 3);
      g.add(fridge);
      // dining
      const dtable = createTable(1.3, 0.8, 0.72);
      dtable.position.set(w / 5, 0, d / 8);
      g.add(dtable);
      for (const [x, z] of [[0, 0.7], [0, -0.7], [0.8, 0], [-0.8, 0]]) {
        const ch = createChair('#6a5a4a');
        ch.position.set(w / 5 + x, 0, d / 8 + z);
        g.add(ch);
      }
      // bed
      const bed = createBed();
      bed.position.set(-w / 3.2, 0, -d / 3.2);
      g.add(bed);
      break;
    }
    case 'school': {
      // simple classroom
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const desk = createTable(0.9, 0.5, 0.72);
          desk.position.set(-w / 4 + col * 1.2, 0, -d / 5 + row * 1.2);
          g.add(desk);
          const ch = createChair('#5a6a7a');
          ch.position.set(-w / 4 + col * 1.2, 0, -d / 5 + row * 1.2 + 0.7);
          ch.rotation.y = Math.PI;
          g.add(ch);
        }
      }
      g.add(box(3.2, 1.4, 0.12, toonMaterial('#2a4a3a'), 0, 1.5, -d / 2 + 0.2));
      break;
    }
    case 'clinic': {
      const desk = createCounterDesk(2.0);
      desk.position.set(0, 0, -d / 4);
      g.add(desk);
      const bed = createBed('#d0e8f0');
      bed.position.set(w / 4, 0, d / 6);
      g.add(bed);
      break;
    }
    default: {
      const table = createTable(1.2, 0.7, 0.72);
      g.add(table);
      const ch = createChair();
      ch.position.set(0, 0, 0.8);
      g.add(ch);
    }
  }

  return g;
}
