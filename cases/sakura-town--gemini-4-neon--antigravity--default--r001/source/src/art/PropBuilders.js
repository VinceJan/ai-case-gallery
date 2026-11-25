import * as THREE from 'three';
import {
  createToonMaterial,
  createVendingFrontTexture,
  createSignTexture,
  TOON_GRADIENT_4,
} from './ToonMaterials.js';

const sharedMats = {
  bark: createToonMaterial(0x6b4c3d, { cacheKey: 'bark' }),
  sakuraLight: createToonMaterial(0xfbd2df, { cacheKey: 'sakuraLight' }),
  sakuraMid: createToonMaterial(0xf4acc3, { cacheKey: 'sakuraMid' }),
  sakuraDeep: createToonMaterial(0xe88ca9, { cacheKey: 'sakuraDeep' }),
  cedarDark: createToonMaterial(0x3a6a4d, { cacheKey: 'cedarDark' }),
  cedarMid: createToonMaterial(0x4b805c, { cacheKey: 'cedarMid' }),
  woodWarm: createToonMaterial(0xa46f47, { cacheKey: 'woodWarm' }),
  woodDark: createToonMaterial(0x66452e, { cacheKey: 'woodDark' }),
  metalDark: createToonMaterial(0x3a3f47, { cacheKey: 'metalDark' }),
  concrete: createToonMaterial(0xbebbb2, { cacheKey: 'concrete' }),
  stone: createToonMaterial(0x9a9890, { cacheKey: 'stone' }),
  postRed: createToonMaterial(0xd83b36, { cacheKey: 'postRed' }),
  white: createToonMaterial(0xf6f3ec, { cacheKey: 'white' }),
  orange: createToonMaterial(0xee8532, { cacheKey: 'orange' }),
};

export function createSakuraTree(scale = 1, seed = 1) {
  const group = new THREE.Group();
  const s = scale;

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.36 * s, 2.7 * s, 7), sharedMats.bark);
  trunk.position.y = 1.15 * s;
  trunk.rotation.z = Math.sin(seed * 3.1) * 0.08;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  group.add(trunk);

  for (let i = 0; i < 2; i++) {
    const bough = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * s, 0.18 * s, 1.5 * s, 6), sharedMats.bark);
    const side = i === 0 ? 1 : -1;
    bough.position.set(side * 0.55 * s, 2.35 * s, (i - 0.5) * 0.35 * s);
    bough.rotation.z = -side * 0.55;
    bough.castShadow = true;
    group.add(bough);
  }

  const mats = [sharedMats.sakuraLight, sharedMats.sakuraMid, sharedMats.sakuraDeep];
  const puffs = [
    [0, 3.35, 0, 1.65, 0], [-1.15, 2.95, 0.45, 1.25, 1], [1.18, 3.05, -0.35, 1.28, 1],
    [0.35, 2.85, 1.05, 1.15, 2], [-0.5, 3.1, -0.95, 1.12, 0], [0.7, 3.7, 0.35, 1.05, 0],
    [-0.75, 3.55, -0.2, 1.0, 2],
  ];
  const puffGeo = new THREE.IcosahedronGeometry(1, 1);
  puffs.forEach(([px, py, pz, r, mIdx], idx) => {
    const mesh = new THREE.Mesh(puffGeo, mats[(mIdx + Math.floor(seed)) % 3]);
    mesh.position.set(px * s, py * s, pz * s);
    mesh.scale.set(r * s * 1.12, r * s * 0.82, r * s * 1.08);
    mesh.rotation.y = (seed + idx) * 0.7;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  return group;
}

export function createCedarTree(scale = 1) {
  const group = new THREE.Group();
  // Extended root trunk (-0.4*scale) so trees on hillside slopes never appear floating
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.3 * scale, 2.6 * scale, 6), sharedMats.bark);
  trunk.position.y = 0.9 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  const layers = [
    { y: 2.4, r: 1.5, h: 2.3, mat: sharedMats.cedarDark },
    { y: 3.7, r: 1.22, h: 2.1, mat: sharedMats.cedarMid },
    { y: 4.9, r: 0.88, h: 1.8, mat: sharedMats.cedarDark },
  ];
  for (const l of layers) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(l.r * scale, l.h * scale, 7), l.mat);
    cone.position.y = l.y * scale;
    cone.castShadow = true;
    cone.receiveShadow = true;
    group.add(cone);
  }
  return group;
}

export function createBench() {
  const group = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 0.56), sharedMats.woodWarm);
  seat.position.y = 0.48;
  seat.castShadow = true;
  seat.receiveShadow = true;
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.42, 0.1), sharedMats.woodWarm);
  back.position.set(0, 0.82, -0.25);
  back.rotation.x = -0.14;
  back.castShadow = true;
  group.add(back);

  for (const sx of [-0.76, 0.76]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.48, 0.5), sharedMats.metalDark);
    leg.position.set(sx, 0.24, 0);
    leg.castShadow = true;
    group.add(leg);
  }
  return group;
}

export function createUtilityPole(hasTransformer = false) {
  const group = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.15, 7.6, 8), sharedMats.concrete);
  pole.position.y = 3.8;
  pole.castShadow = true;
  group.add(pole);

  for (const h of [6.4, 7.15]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.08), sharedMats.metalDark);
    arm.position.y = h;
    group.add(arm);
    for (const ix of [-0.62, 0.62]) {
      const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.14, 6), sharedMats.white);
      ins.position.set(ix, h + 0.09, 0);
      group.add(ins);
    }
  }
  if (hasTransformer) {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.68, 8), sharedMats.concrete);
    drum.position.set(0.32, 5.5, 0);
    group.add(drum);
  }
  return group;
}

export function createPowerLines(polePositions) {
  const group = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({ color: 0x262932, transparent: true, opacity: 0.72 });
  for (let i = 0; i < polePositions.length - 1; i++) {
    const a = polePositions[i];
    const b = polePositions[i + 1];
    for (const offset of [-0.55, 0.55]) {
      const pts = [];
      for (let s = 0; s <= 10; s++) {
        const t = s / 10;
        pts.push(new THREE.Vector3(
          THREE.MathUtils.lerp(a.x, b.x, t),
          THREE.MathUtils.lerp(a.y, b.y, t) + 7.1 - Math.sin(t * Math.PI) * 0.42,
          THREE.MathUtils.lerp(a.z, b.z, t) + offset * 0.25
        ));
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }
  }
  return group;
}

export function createVendingMachine() {
  const group = new THREE.Group();
  const bodyMat = createToonMaterial(0xe6535b);
  const frontMat = createToonMaterial(0xffffff, {
    map: createVendingFrontTexture(),
    emissive: 0xffe4d6,
    emissiveIntensity: 0.22,
  });
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.05, 0.78), [bodyMat, bodyMat, bodyMat, bodyMat, frontMat, bodyMat]);
  box.position.y = 1.025;
  box.castShadow = true;
  box.receiveShadow = true;
  group.add(box);

  const bin = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.72, 0.48), createToonMaterial(0x5d8eb8));
  bin.position.set(0.88, 0.36, 0.05);
  bin.castShadow = true;
  group.add(bin);
  return group;
}

export function createPostbox() {
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.72, 10), sharedMats.postRed);
  base.position.y = 0.36;
  base.castShadow = true;
  group.add(base);

  const upper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.42), sharedMats.postRed);
  upper.position.y = 1.02;
  upper.castShadow = true;
  group.add(upper);

  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.1, 0.48), sharedMats.postRed);
  cap.position.y = 1.38;
  group.add(cap);

  const slot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.04), sharedMats.metalDark);
  slot.position.set(0, 1.15, 0.21);
  group.add(slot);
  return group;
}

export function createStreetLamp() {
  const group = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 3.8, 7), sharedMats.metalDark);
  post.position.y = 1.9;
  post.castShadow = true;
  group.add(post);

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.07, 0.07), sharedMats.metalDark);
  arm.position.set(0.28, 3.72, 0);
  group.add(arm);

  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.18, 8), sharedMats.metalDark);
  shade.position.set(0.54, 3.62, 0);
  group.add(shade);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffe9b5 }));
  bulb.position.set(0.54, 3.48, 0);
  group.add(bulb);

  const light = new THREE.PointLight(0xffcb80, 0, 11, 1.6);
  light.position.set(0.54, 3.25, 0);
  group.add(light);
  group.userData.lampLight = light;
  return group;
}

export function createStoneLantern() {
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.25, 6), sharedMats.stone);
  base.position.y = 0.125;
  group.add(base);

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.95, 6), sharedMats.stone);
  shaft.position.y = 0.72;
  shaft.castShadow = true;
  group.add(shaft);

  const boxMat = createToonMaterial(0xfff1cf, { emissive: 0xffb347, emissiveIntensity: 0.2 });
  const lanternBox = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.36), boxMat);
  lanternBox.position.y = 1.38;
  group.add(lanternBox);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.28, 6), sharedMats.stone);
  roof.position.y = 1.7;
  roof.castShadow = true;
  group.add(roof);

  const light = new THREE.PointLight(0xffb866, 0, 8, 1.7);
  light.position.set(0, 1.38, 0);
  group.add(light);

  group.userData.lampLight = light;
  group.userData.glowMaterial = boxMat;
  return group;
}

export function createConvexMirror() {
  const group = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 3.0, 6), sharedMats.orange);
  pole.position.y = 1.5;
  pole.castShadow = true;
  group.add(pole);

  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 14), sharedMats.orange);
  rim.rotation.x = Math.PI / 2;
  rim.position.set(0, 2.85, 0.08);
  group.add(rim);

  const glass = new THREE.Mesh(
    new THREE.SphereGeometry(0.29, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.35),
    createToonMaterial(0xc8e4f5, { gradient: TOON_GRADIENT_4 })
  );
  glass.rotation.x = Math.PI / 2;
  glass.position.set(0, 2.85, 0.04);
  group.add(glass);
  return group;
}

export function createNoticeBoard() {
  const group = new THREE.Group();
  for (const sx of [-0.95, 0.95]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.1, 0.12), sharedMats.woodDark);
    post.position.set(sx, 1.05, 0);
    post.castShadow = true;
    group.add(post);
  }
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 1.15, 0.1),
    createToonMaterial(0xffffff, { map: createSignTexture('町内掲示板', '樱花季 · 邻里留言', '#efe3cc', '#46342a', '#7c5c44') })
  );
  board.position.set(0, 1.45, 0);
  board.castShadow = true;
  group.add(board);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.1, 0.56), sharedMats.woodDark);
  roof.position.set(0, 2.15, 0);
  roof.rotation.x = 0.12;
  roof.castShadow = true;
  group.add(roof);
  return group;
}

export function createBicycle(frameColor = 0xe86f7c) {
  const group = new THREE.Group();
  const frameMat = createToonMaterial(frameColor);
  const wheelGeo = new THREE.TorusGeometry(0.32, 0.045, 6, 14);
  for (const wx of [-0.52, 0.52]) {
    const w = new THREE.Mesh(wheelGeo, sharedMats.metalDark);
    w.position.set(wx, 0.34, 0);
    w.castShadow = true;
    group.add(w);
  }
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.06, 0.06), frameMat);
  bar.position.set(0, 0.58, 0);
  bar.rotation.z = -0.18;
  group.add(bar);
  const handlePost = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.65, 6), sharedMats.metalDark);
  handlePost.position.set(0.42, 0.72, 0);
  handlePost.rotation.z = 0.22;
  group.add(handlePost);
  const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.48, 6), sharedMats.metalDark);
  handleBar.rotation.x = Math.PI / 2;
  handleBar.position.set(0.36, 1.02, 0);
  group.add(handleBar);
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.32), sharedMats.woodWarm);
  basket.position.set(0.56, 0.86, 0);
  group.add(basket);
  return group;
}
