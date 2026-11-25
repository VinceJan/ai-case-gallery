import * as THREE from 'three';
import { toonMat, createRoadTexture } from '../core/toonMaterials.js';

/**
 * Builds the flat basin valley, roads, river & bridge, shrine hillside,
 * surrounding mountain ring, sakura & cedar trees, and hidden hillside shed.
 */
export function buildTerrain(scene, collision) {
  const group = new THREE.Group();
  scene.add(group);

  // 1. Main Valley Ground
  const groundMat = toonMat(0x8db970, { fourStep: true });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  group.add(ground);

  // Darker grass patches for organic visual richness
  const patchMat = toonMat(0x7da962);
  const patches = [
    [-26, 20, 16, 12],
    [24, 20, 18, 12],
    [-34, -28, 18, 16],
    [35, -24, 18, 18],
    [0, 38, 60, 14],
  ];
  patches.forEach(([x, z, w, d]) => {
    const p = new THREE.Mesh(new THREE.CircleGeometry(Math.max(w, d) * 0.55, 16), patchMat);
    p.rotation.x = -Math.PI / 2;
    p.position.set(x, 0.01, z);
    p.scale.set(w / Math.max(w, d), d / Math.max(w, d), 1);
    p.receiveShadow = true;
    group.add(p);
  });

  // 2. Asphalt Roads & Sidewalks
  const roadTexNS = createRoadTexture();
  roadTexNS.repeat.set(1, 10);
  const roadMatNS = new THREE.MeshStandardMaterial({
    map: roadTexNS,
    roughness: 0.88,
    metalness: 0.04,
  });

  const roadTexEW = createRoadTexture();
  roadTexEW.repeat.set(1, 15);
  const roadMatEW = new THREE.MeshStandardMaterial({
    map: roadTexEW,
    roughness: 0.88,
    metalness: 0.04,
  });

  // Main North-South Road (X = 0, Z from -23 to +25)
  const mainRoadNS = new THREE.Mesh(new THREE.PlaneGeometry(6.0, 48), roadMatNS);
  mainRoadNS.rotation.x = -Math.PI / 2;
  mainRoadNS.position.set(0, 0.03, 1);
  mainRoadNS.receiveShadow = true;
  group.add(mainRoadNS);

  // South continuation across bridge
  const southPath = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 12), roadMatNS);
  southPath.rotation.x = -Math.PI / 2;
  southPath.position.set(0, 0.028, 38.5);
  southPath.receiveShadow = true;
  group.add(southPath);

  // East-West Shopping Avenue (Z = +2, X from -46 to +46)
  const shoppingRoad = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 92), roadMatEW);
  shoppingRoad.rotation.x = -Math.PI / 2;
  shoppingRoad.rotation.z = Math.PI / 2;
  shoppingRoad.position.set(0, 0.032, 2);
  shoppingRoad.receiveShadow = true;
  group.add(shoppingRoad);

  // North Residential Lane (Z = -22, X from -38 to +36)
  const northLaneTex = createRoadTexture();
  northLaneTex.repeat.set(1, 12);
  const northLaneMat = new THREE.MeshStandardMaterial({
    map: northLaneTex,
    roughness: 0.9,
    metalness: 0.03,
  });
  const northLane = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 74), northLaneMat);
  northLane.rotation.x = -Math.PI / 2;
  northLane.rotation.z = Math.PI / 2;
  northLane.position.set(-1, 0.029, -22);
  northLane.receiveShadow = true;
  group.add(northLane);

  // Sidewalks & Station Plaza Paving
  const sidewalkMat = toonMat(0xdcd6cb);
  const plazaMat = toonMat(0xe5dfd3);

  const addPaving = (x, z, w, d, y = 0.04, mat = sidewalkMat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), mat);
    m.position.set(x, y, z);
    m.receiveShadow = true;
    group.add(m);
  };
  // Shopping street sidewalks
  addPaving(-22, 6.0, 38, 1.8);
  addPaving(22, 6.0, 38, 1.8);
  addPaving(-22, -2.0, 38, 1.8);
  addPaving(22, -2.0, 38, 1.8);
  // Station Plaza (West of crossing in front of Sakura Station)
  addPaving(-11.5, -22.2, 15, 5.2, 0.035, plazaMat);
  // Riverside Promenade
  addPaving(0, 22.8, 76, 3.4, 0.038, plazaMat);

  // Crosswalk stripes at main shopping intersection
  const stripeMat = toonMat(0xf8f6f0);
  for (let i = -2; i <= 2; i++) {
    const s1 = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 2.2), stripeMat);
    s1.rotation.x = -Math.PI / 2;
    s1.position.set(i * 1.05, 0.042, 6.0);
    group.add(s1);
    const s2 = s1.clone();
    s2.position.set(i * 1.05, 0.042, -2.0);
    group.add(s2);
  }

  // Dirt forest trail to East Hidden Shed
  const dirtMat = toonMat(0xb99c75);
  const trail = new THREE.Mesh(new THREE.PlaneGeometry(16, 2.6), dirtMat);
  trail.rotation.x = -Math.PI / 2;
  trail.rotation.z = 0.2;
  trail.position.set(30, 0.025, -24);
  trail.receiveShadow = true;
  group.add(trail);

  // 3. Sakura River (桜川) & Stone Embankments & Arched Bridge
  const riverY = -0.35;
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x62b4d6,
    roughness: 0.25,
    metalness: 0.15,
    transparent: true,
    opacity: 0.86,
  });
  const riverWater = new THREE.Mesh(new THREE.PlaneGeometry(160, 6.8), waterMat);
  riverWater.rotation.x = -Math.PI / 2;
  riverWater.position.set(0, riverY + 0.22, 29.0);
  riverWater.receiveShadow = true;
  group.add(riverWater);

  // Riverbed & stone embankments
  const bankMat = toonMat(0x9b9995);
  const northBank = new THREE.Mesh(new THREE.BoxGeometry(160, 0.8, 0.9), bankMat);
  northBank.position.set(0, -0.15, 25.4);
  northBank.receiveShadow = true;
  group.add(northBank);

  const southBank = northBank.clone();
  southBank.position.set(0, -0.15, 32.6);
  group.add(southBank);

  // Riverbank low guardrails on north & south sides (leaving bridge gap X in [-3.1, 3.1])
  const railMat = toonMat(0xebe7df);
  for (const sideZ of [25.25, 32.75]) {
    for (const [cx, w] of [[-28, 49.5], [28, 49.5]]) {
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, 0.1), railMat);
      topRail.position.set(cx, 0.82, sideZ);
      topRail.castShadow = true;
      group.add(topRail);
      for (let px = cx - w / 2; px <= cx + w / 2; px += 4.5) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.12), railMat);
        post.position.set(px, 0.42, sideZ);
        post.castShadow = true;
        group.add(post);
      }
    }
  }
  // Collision boxes blocking water outside bridge
  collision.addBox(-55, -3.15, 25.0, 33.0, { tag: 'river' });
  collision.addBox(3.15, 55, 25.0, 33.0, { tag: 'river' });

  // Arched Sakura Bridge (桜橋) at X = 0, Z = 23.8..34.2
  const bridgeGroup = new THREE.Group();
  const deckMat = toonMat(0xc79e72);
  const bridgeRailMat = toonMat(0xb8473e); // Vermilion-accent Japanese town bridge
  const segs = 12;
  for (let i = 0; i < segs; i++) {
    const z0 = 23.8 + (i / segs) * 10.4;
    const z1 = 23.8 + ((i + 1) / segs) * 10.4;
    const zm = (z0 + z1) / 2;
    const y0 = collision.getGroundHeight(0, z0);
    const y1 = collision.getGroundHeight(0, z1);
    const ym = (y0 + y1) / 2;
    const pitch = Math.atan2(y1 - y0, z1 - z0);
    const len = Math.hypot(z1 - z0, y1 - y0) + 0.08;

    const plank = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.22, len), deckMat);
    plank.position.set(0, ym - 0.08, zm);
    plank.rotation.x = -pitch;
    plank.receiveShadow = true;
    plank.castShadow = true;
    bridgeGroup.add(plank);

    // Side railings
    for (const sx of [-2.95, 2.95]) {
      const r = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, len), bridgeRailMat);
      r.position.set(sx, ym + 0.88, zm);
      r.rotation.x = -pitch;
      bridgeGroup.add(r);
      if (i % 2 === 0) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.96, 0.16), bridgeRailMat);
        post.position.set(sx, ym + 0.44, zm);
        post.castShadow = true;
        bridgeGroup.add(post);
      }
    }
  }
  // Bridge side colliders
  collision.addBox(-3.35, -2.9, 23.8, 34.2);
  collision.addBox(2.9, 3.35, 23.8, 34.2);
  group.add(bridgeGroup);

  // 4. Sakura Shrine Hill & Stone Staircase (North-East Ridge)
  const hillMat = toonMat(0x7ca961);
  const stoneMat = toonMat(0xa8a6a1);

  // Raised plateau terrace at X in [7, 29], Z in [-46, -33], Y = 3.0
  const plateau = new THREE.Mesh(new THREE.BoxGeometry(22, 3.0, 14), hillMat);
  plateau.position.set(18, 1.5, -40);
  plateau.receiveShadow = true;
  group.add(plateau);

  // Stone retaining wall facing town
  const retainWall = new THREE.Mesh(new THREE.BoxGeometry(22.4, 3.1, 0.8), stoneMat);
  retainWall.position.set(18, 1.5, -33.0);
  retainWall.receiveShadow = true;
  retainWall.castShadow = true;
  group.add(retainWall);

  // Stone staircase (X in [13.5, 18.5], Z from -24 to -33)
  const stepCount = 18;
  for (let i = 0; i < stepCount; i++) {
    const t = i / stepCount;
    const sz = -24.2 - t * 8.8;
    const sy = (t + 0.5 / stepCount) * 3.0;
    const step = new THREE.Mesh(new THREE.BoxGeometry(5.0, sy, 0.65), stoneMat);
    step.position.set(16, sy / 2, sz);
    step.receiveShadow = true;
    step.castShadow = true;
    group.add(step);
  }
  // Stair stone banisters
  for (const bx of [13.3, 18.7]) {
    const banister = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.85, 9.6), stoneMat);
    banister.position.set(bx, 1.8, -28.6);
    banister.rotation.x = Math.atan2(3.0, 9.0);
    banister.castShadow = true;
    group.add(banister);
  }
  // Colliders preventing walking through steep hill sides (leaving stairs open)
  collision.addBox(6.8, 13.3, -33.4, -24.0);
  collision.addBox(18.7, 29.2, -33.4, -24.0);
  collision.addBox(6.6, 7.2, -46.5, -33.0);
  collision.addBox(28.8, 29.4, -46.5, -33.0);
  collision.addBox(7.0, 29.0, -47.0, -46.2);

  // Scenic wooden overlook railing along south edge of plateau (west & east of stairs)
  const woodRailMat = toonMat(0x8e6341);
  for (const [rx, rw] of [[10.2, 6.2], [23.8, 9.8]]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(rw, 0.1, 0.12), woodRailMat);
    bar.position.set(rx, 3.85, -33.15);
    group.add(bar);
    for (let px = rx - rw / 2; px <= rx + rw / 2; px += 2.2) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), woodRailMat);
      p.position.set(px, 3.45, -33.15);
      group.add(p);
    }
  }

  // 5. Layered Basin Mountains (360-degree natural Japanese valley backdrop)
  const mountainMatNear = toonMat(0x6b9862);
  const mountainMatMid = toonMat(0x5b8667);
  const mountainMatFar = toonMat(0x74969e);

  const addHill = (x, z, r, h, mat) => {
    const geo = new THREE.ConeGeometry(r, h, 8);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, h * 0.42, z);
    m.rotation.y = Math.random() * Math.PI;
    m.scale.set(1.35, 1, 1.15);
    group.add(m);
  };

  // Ring of hills surrounding the valley
  for (let i = 0; i < 26; i++) {
    const angle = (i / 26) * Math.PI * 2;
    const dist = 74 + (i % 3) * 10;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    const h = 18 + (i % 4) * 6;
    const r = 24 + (i % 3) * 7;
    addHill(x, z, r, h, i % 2 === 0 ? mountainMatNear : mountainMatMid);
  }
  // Distant misty ridge
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + 0.17;
    const dist = 108 + (i % 2) * 14;
    addHill(Math.cos(angle) * dist, Math.sin(angle) * dist, 36, 36 + (i % 3) * 8, mountainMatFar);
  }

  // 6. Stylized Sakura & Cedar Trees
  const sakuraTrees = [];
  const trunkMat = toonMat(0x684b3c);
  const blossomMats = [toonMat(0xffc7d6), toonMat(0xffb4c8), toonMat(0xffd9e4)];
  const cedarMat = toonMat(0x467351);

  function createSakuraTree(x, z, scale = 1, addCollider = true) {
    const y = collision.getGroundHeight(x, z);
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * scale, 0.28 * scale, 2.5 * scale, 7), trunkMat);
    trunk.position.y = 1.25 * scale;
    trunk.castShadow = true;
    tree.add(trunk);

    const crownOffsets = [
      [0, 3.1, 0, 1.55],
      [-0.95, 2.75, 0.45, 1.15],
      [0.95, 2.8, -0.35, 1.2],
      [0.15, 3.6, 0.65, 1.05],
      [-0.35, 3.45, -0.75, 1.1],
    ];
    crownOffsets.forEach(([ox, oy, oz, rad], idx) => {
      const puff = new THREE.Mesh(
        new THREE.DodecahedronGeometry(rad * scale, 1),
        blossomMats[idx % blossomMats.length]
      );
      puff.position.set(ox * scale, oy * scale, oz * scale);
      puff.scale.y = 0.78;
      puff.castShadow = true;
      tree.add(puff);
    });

    group.add(tree);
    sakuraTrees.push(tree);
    if (addCollider) collision.addCircle(x, z, 0.42 * scale);
    return tree;
  }

  function createCedarTree(x, z, scale = 1, addCollider = false) {
    const y = collision.getGroundHeight(x, z);
    const tree = new THREE.Group();
    tree.position.set(x, y, z);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.28 * scale, 2.2 * scale, 6), trunkMat);
    trunk.position.y = 1.1 * scale;
    tree.add(trunk);
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry((1.65 - i * 0.35) * scale, 2.6 * scale, 7),
        cedarMat
      );
      cone.position.y = (2.6 + i * 1.4) * scale;
      cone.castShadow = true;
      tree.add(cone);
    }
    group.add(tree);
    if (addCollider) collision.addCircle(x, z, 0.45 * scale);
  }

  // Iconic riverside sakura promenade
  for (let rx = -38; rx <= 38; rx += 9.5) {
    if (Math.abs(rx) < 5) continue;
    createSakuraTree(rx, 24.1, 1.05 + (Math.abs(rx) % 3) * 0.08, true);
    createSakuraTree(rx + 2, 34.0, 1.1, false);
  }

  // Town accent sakura trees
  createSakuraTree(-5.2, -20.0, 0.95, true);
  createSakuraTree(6.5, -20.0, 1.05, true);
  createSakuraTree(-32, -20.0, 1.0, true);
  createSakuraTree(23.5, -39.0, 1.45, true); // Giant sacred weeping sakura at Shrine!
  createSakuraTree(10.5, -36.5, 1.1, true);
  createSakuraTree(-7.2, 6.2, 0.85, true);
  createSakuraTree(7.2, 6.2, 0.85, true);
  createSakuraTree(-37, -1.5, 1.05, true);
  createSakuraTree(37, -1.5, 1.05, true);

  // Natural perimeter forest border (cedars + wild sakura)
  const forestCoords = [];
  for (let x = -54; x <= 54; x += 6.5) {
    forestCoords.push([x, -49 - (Math.abs(x) % 5)]);
    forestCoords.push([x, 43 + (Math.abs(x) % 4)]);
  }
  for (let z = -44; z <= 40; z += 6.5) {
    if (Math.abs(z + 12) < 4.5) continue; // Keep railway tunnel approaches clear
    forestCoords.push([-52 - (Math.abs(z) % 4), z]);
    forestCoords.push([52 + (Math.abs(z) % 4), z]);
  }
  // Extra cluster around east forest trail, hidden shed, and natural road-end forest framing
  forestCoords.push(
    [32, -30], [39, -30], [42, -23], [39, -18], [32, -18], [-40, -34], [-42, -26],
    // West shopping road forest end (X = -46, Z = 2)
    [-46, -2.5], [-46, 6.5], [-49.5, 0], [-49.5, 4], [-51.5, 2],
    // East shopping road forest end (X = +46, Z = 2)
    [46, -2.5], [46, 6.5], [49.5, 0], [49.5, 4], [51.5, 2],
    // West North-Lane forest end (X = -38, Z = -22)
    [-39, -25], [-39, -19], [-42, -22],
    // South park path forest end (X = 0, Z = 44)
    [-4.5, 43], [4.5, 43], [-2, 46.5], [2, 46.5]
  );
  forestCoords.forEach(([fx, fz], idx) => {
    if (idx % 5 === 0) {
      createSakuraTree(fx, fz, 1.15, false);
    } else {
      createCedarTree(fx, fz, 1.1 + (idx % 3) * 0.22, false);
    }
  });

  // Wooden rural mountain-road guardrails at natural road ends so roads blend into the foothills
  const roadEndMat = toonMat(0xe8e2d5);
  const addRoadEndRail = (x, z, rotY) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotY;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.2, 0.14), roadEndMat);
    bar.position.y = 0.78;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.08, 0.16), toonMat(0xd99b38));
    stripe.position.y = 0.78;
    g.add(bar, stripe);
    for (const px of [-2.2, 0, 2.2]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.9, 0.16), toonMat(0x6e4b34));
      p.position.set(px, 0.45, 0);
      g.add(p);
    }
    group.add(g);
  };
  addRoadEndRail(-46.5, 2, Math.PI / 2);
  addRoadEndRail(46.5, 2, Math.PI / 2);
  addRoadEndRail(-38.5, -22, Math.PI / 2);
  addRoadEndRail(0, 42.8, 0);

  // 7. Hidden Hillside Wooden Shed (山脚の古い小屋) at X = +36, Z = -25
  const shedGroup = new THREE.Group();
  shedGroup.position.set(36, 0, -25);
  shedGroup.rotation.y = -0.35;
  const shedWood = toonMat(0x836851);
  const shedRoofMat = toonMat(0x5b6169);
  const shedBody = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.3, 2.6), shedWood);
  shedBody.position.y = 1.15;
  shedBody.castShadow = true;
  shedBody.receiveShadow = true;
  shedGroup.add(shedBody);

  const shedRoof = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.2, 3.1), shedRoofMat);
  shedRoof.position.y = 2.4;
  shedRoof.rotation.x = 0.14;
  shedRoof.castShadow = true;
  shedGroup.add(shedRoof);

  // Small wooden crate right in front of the shed (for the keepsake clue!)
  const crate = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.5, 0.5), toonMat(0xb68a5a));
  crate.position.set(-0.9, 0.25, 1.55);
  crate.castShadow = true;
  shedGroup.add(crate);

  group.add(shedGroup);
  collision.addBoxCenter(36, -25, 3.7, 3.0);

  return {
    group,
    riverWater,
    roadMaterials: [roadMatNS, roadMatEW, northLaneMat],
    sakuraTrees,
    update(time, isRaining) {
      // Gentle river sheen shimmer
      riverWater.position.y = riverY + 0.22 + Math.sin(time * 1.8) * 0.015;
      // Wet glossy asphalt when raining
      const targetRough = isRaining ? 0.34 : 0.88;
      roadMatNS.roughness += (targetRough - roadMatNS.roughness) * 0.05;
      roadMatEW.roughness = roadMatNS.roughness;
      northLaneMat.roughness = roadMatNS.roughness;
    },
  };
}
