/**
 * Vegetation: cherry trees, evergreens, bushes, grass patches, river, hills.
 */
import * as THREE from 'three';
import { placeOnPlanet, surfacePoint, surfaceNormal, PLANET_RADIUS } from './Planet.js';
import { toonMaterial, unlitMaterial, grassTexture } from '../utils/materials.js';

const rng = (() => {
  let s = 42;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
})();

export function createCherryTree(opts = {}) {
  const g = new THREE.Group();
  const scale = opts.scale ?? 0.9 + rng() * 0.5;
  const trunkMat = toonMaterial('#5a4030');
  const blossom = opts.blossom ?? ['#f0b0c0', '#e898b0', '#f4c0cc'][Math.floor(rng() * 3)];

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.32 * scale, 2.2 * scale, 7), trunkMat);
  trunk.position.y = 1.1 * scale;
  trunk.rotation.z = (rng() - 0.5) * 0.12;
  g.add(trunk);

  // branches
  for (let i = 0; i < 5; i++) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * scale, 0.12 * scale, 1.4 * scale, 6), trunkMat);
    const a = (i / 5) * Math.PI * 2 + rng();
    b.position.set(Math.cos(a) * 0.5 * scale, 2.0 * scale + rng() * 0.5, Math.sin(a) * 0.5 * scale);
    b.rotation.z = 0.7 + rng() * 0.5;
    b.rotation.y = a;
    g.add(b);
  }

  // blossom clusters (flat-shaded spheres)
  const blossomMat = toonMaterial(blossom);
  const count = 7 + Math.floor(rng() * 4);
  for (let i = 0; i < count; i++) {
    const r = (0.55 + rng() * 0.55) * scale;
    const s = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), blossomMat);
    const a = rng() * Math.PI * 2;
    const elev = 1.8 * scale + rng() * 1.8 * scale;
    const rad = (0.3 + rng() * 1.3) * scale;
    s.position.set(Math.cos(a) * rad, elev, Math.sin(a) * rad);
    s.scale.y = 0.75;
    g.add(s);
  }

  // fallen petals ground disc
  const petal = new THREE.Mesh(
    new THREE.CircleGeometry(1.6 * scale, 12),
    unlitMaterial(blossom, { transparent: true, opacity: 0.35 })
  );
  petal.rotation.x = -Math.PI / 2;
  petal.position.y = 0.06;
  g.add(petal);

  return g;
}

export function createEvergreenTree(opts = {}) {
  const g = new THREE.Group();
  const scale = opts.scale ?? 1 + rng() * 0.6;
  const trunkMat = toonMaterial('#4a3828');
  const leaf = opts.color ?? ['#2f6a38', '#3a7a42', '#2a5a32'][Math.floor(rng() * 3)];
  const leafMat = toonMaterial(leaf);

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15 * scale, 0.28 * scale, 2.4 * scale, 6), trunkMat);
  trunk.position.y = 1.2 * scale;
  g.add(trunk);

  for (let i = 0; i < 4; i++) {
    const h = (1.2 + i * 0.7) * scale;
    const r = (1.4 - i * 0.28) * scale;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(r, 1.5 * scale, 7), leafMat);
    cone.position.y = h + 0.7 * scale;
    g.add(cone);
  }
  return g;
}

export function createBush(opts = {}) {
  const g = new THREE.Group();
  const scale = opts.scale ?? 0.7 + rng() * 0.5;
  const color = opts.color ?? ['#3f7a42', '#4a8a4c', '#35703c'][Math.floor(rng() * 3)];
  const mat = toonMaterial(color);
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry((0.45 + rng() * 0.3) * scale, 7, 6), mat);
    s.position.set((rng() - 0.5) * 0.7 * scale, 0.35 * scale + rng() * 0.2, (rng() - 0.5) * 0.7 * scale);
    s.scale.y = 0.7;
    g.add(s);
  }
  return g;
}

export function createRiver(scene) {
  const group = new THREE.Group();
  group.name = 'river';

  // River path (south-east of town)
  const points = [
    [-20, -48],
    [-8, -44],
    [4, -42],
    [16, -40],
    [28, -36],
    [38, -30],
    [44, -20],
    [46, -8],
  ];

  const waterMat = new THREE.MeshToonMaterial({
    color: '#4a8ab0',
    transparent: true,
    opacity: 0.82,
  });

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    const yaw = Math.atan2(dx, dz);
    const mx = (a[0] + b[0]) / 2;
    const mz = (a[1] + b[1]) / 2;

    const water = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.15, len + 0.5), waterMat);
    placeOnPlanet(water, mx, mz, -0.35, yaw);
    group.add(water);

    // banks
    for (const side of [-1, 1]) {
      const bank = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, len + 0.4), toonMaterial('#6a8a5a'));
      const ox = Math.cos(yaw) * 3.8 * side;
      const oz = -Math.sin(yaw) * 3.8 * side;
      placeOnPlanet(bank, mx + ox, mz + oz, -0.15, yaw);
      group.add(bank);
    }
  }

  // bridge
  const bridge = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.35, 12), toonMaterial('#8a8680'));
  deck.position.y = 0.6;
  bridge.add(deck);
  for (const side of [-1, 1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.7, 12), toonMaterial('#c0c4c8'));
    rail.position.set(side * 3.5, 1.0, 0);
    bridge.add(rail);
    for (let i = -5; i <= 5; i += 2) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), toonMaterial('#c0c4c8'));
      post.position.set(side * 3.5, 0.95, i);
      bridge.add(post);
    }
  }
  placeOnPlanet(bridge, 22, -38, 0.1, 0.25);
  group.add(bridge);

  // trees along river
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const x = -18 + t * 58;
    const z = -50 + Math.sin(t * 3) * 6 + t * 30;
    const tree = i % 2 === 0 ? createCherryTree({ scale: 0.85 }) : createEvergreenTree({ scale: 1.0 });
    placeOnPlanet(tree, x + (i % 2 ? 6 : -6), z, 0.05, rng() * Math.PI * 2);
    group.add(tree);
  }

  scene.add(group);
  return group;
}

export function createVegetation(scene, layouts) {
  const group = new THREE.Group();
  group.name = 'vegetation';

  // Cherry trees — station plaza, along main streets, park, shrine path
  const cherrySpots = [
    [-4, -3], [4, -3], [-5, 3], [5, 3],
    [-12, -10], [-12, 4], [-18, -2],
    [10, -12], [14, -16], [18, -10],
    [22, 8], [16, 12], [10, 16],
    [-20, 18], [-14, 22], [-28, 22],
    [0, -22], [2, -28], [-4, -30],
    [-30, -14], [-26, -20],
    [8, 8], [-8, 10],
  ];
  for (const [x, z] of cherrySpots) {
    const t = createCherryTree({ scale: 0.85 + rng() * 0.4 });
    placeOnPlanet(t, x, z, 0.05, rng() * Math.PI * 2);
    group.add(t);
  }

  // Park dense cherry grove
  for (let i = 0; i < 10; i++) {
    const x = 12 + (rng() - 0.5) * 16;
    const z = -14 + (rng() - 0.5) * 14;
    const t = createCherryTree({ scale: 1.0 });
    placeOnPlanet(t, x, z, 0.05, rng() * Math.PI * 2);
    group.add(t);
  }

  // Evergreen hillside (north / shrine)
  for (let i = 0; i < 18; i++) {
    const x = -30 + (rng() - 0.5) * 24;
    const z = 28 + rng() * 16;
    const t = createEvergreenTree({ scale: 1.1 });
    placeOnPlanet(t, x, z, 0.05 + rng() * 0.4, rng() * Math.PI * 2);
    group.add(t);
  }

  // Outer forest ring (beyond the town)
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2 + rng() * 0.15;
    const r = 58 + rng() * 22;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const t = i % 3 === 0 ? createCherryTree({ scale: 0.9 }) : createEvergreenTree({ scale: 1.2 });
    placeOnPlanet(t, x, z, 0.1, rng() * Math.PI * 2);
    group.add(t);
  }

  // Bushes
  for (let i = 0; i < 36; i++) {
    const x = (rng() - 0.5) * 90;
    const z = (rng() - 0.5) * 90;
    // keep clear of plaza center
    if (Math.hypot(x, z) < 12) continue;
    const b = createBush({ scale: 0.7 + rng() * 0.5 });
    placeOnPlanet(b, x, z, 0.05, rng() * Math.PI * 2);
    group.add(b);
  }

  // Grass patches
  const grassMat = new THREE.MeshToonMaterial({ map: grassTexture(), color: '#6aaa60' });
  for (let i = 0; i < 14; i++) {
    const x = (rng() - 0.5) * 100;
    const z = (rng() - 0.5) * 100;
    const r = 4 + rng() * 8;
    const patch = new THREE.Mesh(new THREE.CircleGeometry(r, 12), grassMat);
    placeOnPlanet(patch, x, z, 0.03, rng() * Math.PI * 2);
    group.add(patch);
  }

  scene.add(group);
  return group;
}

/** Soft distant hills for the horizon (placed far on the sphere) */
export function createHills(scene) {
  const group = new THREE.Group();
  const mat = toonMaterial('#4a7a52');
  const matFar = toonMaterial('#3a6a4a');
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r = 95 + (i % 3) * 8;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const h = 8 + (i % 4) * 3;
    const hill = new THREE.Mesh(new THREE.ConeGeometry(18 + (i % 3) * 6, h, 10), i % 2 ? mat : matFar);
    placeOnPlanet(hill, x, z, h * 0.28, a);
    group.add(hill);
  }
  scene.add(group);
  return group;
}
