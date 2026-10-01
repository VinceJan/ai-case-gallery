import * as THREE from 'three';
import { PALETTE } from './constants.js';
import { getToonMaterial, createFlagMaterial, warmWindowMaterial } from './materials.js';

export function buildCastle(animatedObjects = [], nightLights = []) {
  const castleGroup = new THREE.Group();
  castleGroup.name = 'CastleGroup';

  const stoneLight = getToonMaterial(PALETTE.CASTLE_STONE_LIGHT);
  const stoneMid = getToonMaterial(PALETTE.CASTLE_STONE_MID);
  const stoneDark = getToonMaterial(PALETTE.CASTLE_STONE_DARK);
  const roofSlate = getToonMaterial(PALETTE.CASTLE_ROOF_SLATE);
  const roofRed = getToonMaterial(PALETTE.CASTLE_ROOF_RED);
  const woodPlank = getToonMaterial(PALETTE.WOOD_PLANK);
  const ironMat = getToonMaterial(PALETTE.IRON_METAL);

  const baseY = 7.2;

  // 1. GATEHOUSE & DRAWBRIDGE (城门与吊桥)
  buildGatehouse(castleGroup, baseY, stoneLight, stoneMid, woodPlank, ironMat, nightLights);

  // 2. CURTAIN WALLS & CRENELLATIONS (城墙与雉堞)
  buildCurtainWalls(castleGroup, baseY, stoneMid, stoneLight);

  // 3. CORNER WATCHTOWERS & SPIRES (角楼尖顶)
  buildCornerWatchtowers(castleGroup, baseY, stoneLight, stoneMid, roofSlate, animatedObjects);

  // 4. THE GRAND KEEP (主堡 - Donjon & Great Hall)
  buildGrandKeep(castleGroup, baseY, stoneLight, stoneMid, stoneDark, roofRed, roofSlate, animatedObjects, nightLights);

  return castleGroup;
}

// 1. Gatehouse & Drawbridge
function buildGatehouse(parent, baseY, stoneLight, stoneMid, woodPlank, ironMat, nightLights) {
  const gateGroup = new THREE.Group();
  gateGroup.position.set(0, baseY, -6.5);

  // Gatehouse main block
  const gateBlock = new THREE.Mesh(
    new THREE.BoxGeometry(6.4, 5.2, 3.8),
    stoneMid
  );
  gateBlock.position.set(0, 2.6, 0);
  gateBlock.castShadow = true;
  gateBlock.receiveShadow = true;
  gateGroup.add(gateBlock);

  // Arched entrance portal cutout (dark interior)
  const archInner = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 3.2, 4.0),
    getToonMaterial(0x1a1a20)
  );
  archInner.position.set(0, 1.6, 0);
  gateGroup.add(archInner);

  // Stone arch surround trim
  const archTop = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.4, 0.4, 12, 1, false, 0, Math.PI),
    stoneLight
  );
  archTop.rotation.z = Math.PI / 2;
  archTop.rotation.y = Math.PI / 2;
  archTop.position.set(0, 3.2, 1.95);
  gateGroup.add(archTop);

  // Portcullis (落闸 - black iron vertical bars and horizontal braces)
  const portcullisGroup = new THREE.Group();
  const barMat = ironMat;
  for (let x = -0.9; x <= 0.9; x += 0.3) {
    const vBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8, 6), barMat);
    vBar.position.set(x, 2.2, 1.4);
    portcullisGroup.add(vBar);
  }
  for (let y = 1.2; y <= 3.2; y += 0.6) {
    const hBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.1, 6), barMat);
    hBar.rotation.z = Math.PI / 2;
    hBar.position.set(0, y, 1.4);
    portcullisGroup.add(hBar);
  }
  gateGroup.add(portcullisGroup);

  // Twin Gatehouse flanking semi-towers
  const twinTowerGeom = new THREE.CylinderGeometry(1.4, 1.6, 6.2, 12);
  const leftTower = new THREE.Mesh(twinTowerGeom, stoneLight);
  leftTower.position.set(-3.2, 3.1, 0.4);
  leftTower.castShadow = true;

  const rightTower = leftTower.clone();
  rightTower.position.x = 3.2;
  gateGroup.add(leftTower, rightTower);

  // Gatehouse Crenellations (雉堞)
  for (let x = -3.8; x <= 3.8; x += 0.95) {
    const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.8, 0.4), stoneLight);
    merlon.position.set(x, 5.6, 1.9);
    merlon.castShadow = true;
    gateGroup.add(merlon);
  }

  // Drawbridge (吊桥) spanning the moat
  const drawbridgeGroup = new THREE.Group();
  const deckGeom = new THREE.BoxGeometry(2.6, 0.22, 4.4);
  const deck = new THREE.Mesh(deckGeom, woodPlank);
  deck.castShadow = true;
  deck.receiveShadow = true;
  drawbridgeGroup.add(deck);

  // Iron reinforcement bands across drawbridge
  for (let z = -1.6; z <= 1.6; z += 1.1) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.25, 0.12), ironMat);
    strap.position.set(0, 0, z);
    drawbridgeGroup.add(strap);
  }

  // Drawbridge position: extending out over the moat
  drawbridgeGroup.position.set(0, 0.15, 3.9);
  gateGroup.add(drawbridgeGroup);

  // Drawbridge heavy suspension iron chains (from gatehouse to outer bridge deck)
  const chainL = createChainMesh([-1.1, 4.0, 1.9], [-1.1, 0.25, 5.8], ironMat);
  const chainR = createChainMesh([1.1, 4.0, 1.9], [1.1, 0.25, 5.8], ironMat);
  gateGroup.add(chainL, chainR);

  // Wall lanterns on iron brackets flanking the gate portal
  const lanternL = createWallLantern([-1.8, 2.6, 2.0], nightLights);
  const lanternR = createWallLantern([1.8, 2.6, 2.0], nightLights);
  gateGroup.add(lanternL, lanternR);

  parent.add(gateGroup);
}

// Drawbridge chain helper
function createChainMesh(p1, p2, mat) {
  const v1 = new THREE.Vector3(...p1);
  const v2 = new THREE.Vector3(...p2);
  const dist = v1.distanceTo(v2);
  const cyl = new THREE.CylinderGeometry(0.04, 0.04, dist, 6);
  const mesh = new THREE.Mesh(cyl, mat);

  const mid = v1.clone().add(v2).multiplyScalar(0.5);
  mesh.position.copy(mid);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v2.clone().sub(v1).normalize());
  mesh.castShadow = true;
  return mesh;
}

// Wall Lantern helper
function createWallLantern(pos, nightLights) {
  const group = new THREE.Group();
  group.position.set(...pos);

  // Iron bracket
  const bracket = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.4, 0.35),
    getToonMaterial(PALETTE.IRON_METAL)
  );
  group.add(bracket);

  // Lantern glass cage
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.3, 0.24),
    warmWindowMaterial
  );
  glass.position.set(0, -0.05, 0.2);
  group.add(glass);

  // Point light for night illumination
  const light = new THREE.PointLight(0xffa834, 0, 8, 1.5);
  light.position.set(0, -0.05, 0.25);
  group.add(light);
  nightLights.push({ light, maxIntensity: 1.8 });

  return group;
}

// 2. Curtain Walls & Battlements (城墙与雉堞)
function buildCurtainWalls(parent, baseY, stoneMid, stoneLight) {
  const wallGroup = new THREE.Group();
  wallGroup.position.set(0, baseY, 0);

  const wallHeight = 4.8;
  const wallThickness = 1.4;

  // Front Curtain Wall - Left Section (from X = -3.2 to -14.0, Z = -6.5)
  const fWallL = new THREE.Mesh(
    new THREE.BoxGeometry(10.0, wallHeight, wallThickness),
    stoneMid
  );
  fWallL.position.set(-8.6, wallHeight / 2, -6.5);
  fWallL.castShadow = true;
  fWallL.receiveShadow = true;
  wallGroup.add(fWallL);

  // Front Curtain Wall - Right Section (from X = 3.2 to 14.0, Z = -6.5)
  const fWallR = new THREE.Mesh(
    new THREE.BoxGeometry(10.0, wallHeight, wallThickness),
    stoneMid
  );
  fWallR.position.set(8.6, wallHeight / 2, -6.5);
  fWallR.castShadow = true;
  fWallR.receiveShadow = true;
  wallGroup.add(fWallR);

  // Left Curtain Wall (along X = -14.0, from Z = -6.5 to -21.5)
  const lWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 15.0),
    stoneMid
  );
  lWall.position.set(-14.0, wallHeight / 2, -14.0);
  lWall.castShadow = true;
  lWall.receiveShadow = true;
  wallGroup.add(lWall);

  // Right Curtain Wall (along X = 14.0, from Z = -6.5 to -21.5)
  const rWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 15.0),
    stoneMid
  );
  rWall.position.set(14.0, wallHeight / 2, -14.0);
  rWall.castShadow = true;
  rWall.receiveShadow = true;
  wallGroup.add(rWall);

  // Rear Curtain Wall (along Z = -21.5, from X = -14.0 to 14.0)
  const rearWall = new THREE.Mesh(
    new THREE.BoxGeometry(28.0, wallHeight, wallThickness),
    stoneMid
  );
  rearWall.position.set(0, wallHeight / 2, -21.5);
  rearWall.castShadow = true;
  rearWall.receiveShadow = true;
  wallGroup.add(rearWall);

  // Crenellations on the Front Walls
  buildCrenellationStrip(wallGroup, -13.5, -3.8, wallHeight, -5.9, 'x', stoneLight);
  buildCrenellationStrip(wallGroup, 3.8, 13.5, wallHeight, -5.9, 'x', stoneLight);

  // Crenellations on the Side Walls
  buildCrenellationStrip(wallGroup, -21.0, -7.0, wallHeight, -14.6, 'z', stoneLight);
  buildCrenellationStrip(wallGroup, -21.0, -7.0, wallHeight, 14.6, 'z', stoneLight);

  parent.add(wallGroup);
}

// Helper to generate regular merlons along a coordinate span
function buildCrenellationStrip(parent, start, end, y, offset, axis, mat) {
  const step = 1.0;
  for (let val = start; val <= end; val += step) {
    const isMerlon = Math.round((val - start) / step) % 2 === 0;
    if (!isMerlon) continue;

    const merlon = new THREE.Mesh(
      new THREE.BoxGeometry(axis === 'x' ? 0.6 : 0.4, 0.75, axis === 'x' ? 0.4 : 0.6),
      mat
    );
    if (axis === 'x') {
      merlon.position.set(val, y + 0.38, offset);
    } else {
      merlon.position.set(offset, y + 0.38, val);
    }
    merlon.castShadow = true;
    parent.add(merlon);
  }
}

// 3. Corner Watchtowers & Spires (角楼尖顶)
function buildCornerWatchtowers(parent, baseY, stoneLight, stoneMid, roofSlate, animatedObjects) {
  const towerGroup = new THREE.Group();
  towerGroup.position.set(0, baseY, 0);

  const towerPositions = [
    { x: -14.0, z: -6.5, height: 7.2, radius: 1.8, spireHeight: 3.5, bannerColor: PALETTE.CASTLE_HERALDIC_RED },
    { x: 14.0, z: -6.5, height: 7.2, radius: 1.8, spireHeight: 3.5, bannerColor: PALETTE.CASTLE_HERALDIC_BLUE },
    { x: -14.0, z: -21.5, height: 8.8, radius: 2.0, spireHeight: 4.2, bannerColor: PALETTE.CASTLE_HERALDIC_GOLD },
    { x: 14.0, z: -21.5, height: 8.8, radius: 2.0, spireHeight: 4.2, bannerColor: PALETTE.CASTLE_HERALDIC_RED }
  ];

  towerPositions.forEach((tp) => {
    const singleTower = new THREE.Group();
    singleTower.position.set(tp.x, 0, tp.z);

    // Tower base shaft
    const shaftGeom = new THREE.CylinderGeometry(tp.radius * 0.95, tp.radius * 1.1, tp.height, 12);
    const shaft = new THREE.Mesh(shaftGeom, stoneLight);
    shaft.position.y = tp.height / 2;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    singleTower.add(shaft);

    // Machicolation corbel gallery (projecting overhang)
    const galleryGeom = new THREE.CylinderGeometry(tp.radius * 1.25, tp.radius * 1.0, 0.8, 12);
    const gallery = new THREE.Mesh(galleryGeom, stoneMid);
    gallery.position.y = tp.height + 0.4;
    gallery.castShadow = true;
    singleTower.add(gallery);

    // Conical Slate Roof Spire (尖顶)
    const spireGeom = new THREE.ConeGeometry(tp.radius * 1.3, tp.spireHeight, 12);
    const spire = new THREE.Mesh(spireGeom, roofSlate);
    spire.position.y = tp.height + 0.8 + tp.spireHeight / 2;
    spire.castShadow = true;
    singleTower.add(spire);

    // Gilded Finial & Pennant (角楼顶饰与小三角旗)
    const finial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6),
      getToonMaterial(PALETTE.CASTLE_HERALDIC_GOLD)
    );
    finial.position.y = tp.height + 0.8 + tp.spireHeight + 0.7;
    singleTower.add(finial);

    // Pennant Flag (fluttering in the wind)
    const pennantGeom = new THREE.PlaneGeometry(1.2, 0.6);
    pennantGeom.translate(0.6, 0, 0); // anchor at flag pole
    const pennantMat = createFlagMaterial(tp.bannerColor);
    const pennant = new THREE.Mesh(pennantGeom, pennantMat);
    pennant.position.set(0, tp.height + 0.8 + tp.spireHeight + 1.0, 0);
    pennant.castShadow = true;
    singleTower.add(pennant);

    // Arrow Slits (箭窗) on the tower shaft
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const slit = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.8, 0.35),
        getToonMaterial(0x18181e)
      );
      const slitDist = tp.radius * 0.98;
      slit.position.set(
        Math.cos(angle) * slitDist,
        tp.height * 0.55,
        Math.sin(angle) * slitDist
      );
      slit.rotation.y = -angle;
      singleTower.add(slit);
    }

    towerGroup.add(singleTower);
  });

  parent.add(towerGroup);
}

// 4. The Grand Keep (主堡 - Donjon, Great Hall & Spire)
function buildGrandKeep(parent, baseY, stoneLight, stoneMid, stoneDark, roofRed, roofSlate, animatedObjects, nightLights) {
  const keepGroup = new THREE.Group();
  keepGroup.name = 'GrandKeep';
  keepGroup.position.set(0, baseY, -14.5);

  // Level 1: Great Hall Base (Massive stone foundation)
  const l1Geom = new THREE.BoxGeometry(11.0, 6.0, 8.5);
  const l1Mesh = new THREE.Mesh(l1Geom, stoneMid);
  l1Mesh.position.y = 3.0;
  l1Mesh.castShadow = true;
  l1Mesh.receiveShadow = true;
  keepGroup.add(l1Mesh);

  // Battered buttresses at Keep corners
  const buttressGeom = new THREE.BoxGeometry(1.8, 5.5, 1.8);
  [[-5.2, -3.9], [5.2, -3.9], [-5.2, 3.9], [5.2, 3.9]].forEach(([bx, bz]) => {
    const bMesh = new THREE.Mesh(buttressGeom, stoneDark);
    bMesh.position.set(bx, 2.75, bz);
    bMesh.castShadow = true;
    keepGroup.add(bMesh);
  });

  // Level 2: Lord's Quarters (Upper residential tier)
  const l2Geom = new THREE.BoxGeometry(9.4, 4.5, 7.2);
  const l2Mesh = new THREE.Mesh(l2Geom, stoneLight);
  l2Mesh.position.y = 8.25;
  l2Mesh.castShadow = true;
  l2Mesh.receiveShadow = true;
  keepGroup.add(l2Mesh);

  // Level 3: Machicolated Gallery & Crenellated Roof Terrace
  const galGeom = new THREE.BoxGeometry(10.2, 0.7, 8.0);
  const gallery = new THREE.Mesh(galGeom, stoneMid);
  gallery.position.y = 10.85;
  gallery.castShadow = true;
  keepGroup.add(gallery);

  // Battlements on Keep Terrace
  for (let x = -4.7; x <= 4.7; x += 1.3) {
    const merlonF = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.35), stoneLight);
    merlonF.position.set(x, 11.5, 3.8);
    merlonF.castShadow = true;
    const merlonB = merlonF.clone();
    merlonB.position.z = -3.8;
    keepGroup.add(merlonF, merlonB);
  }

  // Level 4: The High Keep Tower (Octagonal Spire)
  const highTowerGeom = new THREE.CylinderGeometry(2.4, 2.6, 5.5, 8);
  const highTower = new THREE.Mesh(highTowerGeom, stoneLight);
  highTower.position.set(0, 13.9, 0);
  highTower.castShadow = true;
  keepGroup.add(highTower);

  // Steep High Roof Spire (Terracotta/Slate)
  const keepSpireGeom = new THREE.ConeGeometry(3.2, 5.0, 8);
  const keepSpire = new THREE.Mesh(keepSpireGeom, roofSlate);
  keepSpire.position.set(0, 19.1, 0);
  keepSpire.castShadow = true;
  keepGroup.add(keepSpire);

  // Tall Royal Flagpole atop Keep Spire
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8),
    getToonMaterial(PALETTE.CASTLE_HERALDIC_GOLD)
  );
  pole.position.set(0, 22.8, 0);
  keepGroup.add(pole);

  // Grand Royal Banner (fluttering swallowtail flag)
  const royalBannerGeom = new THREE.PlaneGeometry(2.6, 1.4);
  royalBannerGeom.translate(1.3, 0, 0);
  const royalBannerMat = createFlagMaterial(PALETTE.CASTLE_HERALDIC_RED);
  const royalBanner = new THREE.Mesh(royalBannerGeom, royalBannerMat);
  royalBanner.position.set(0, 22.6, 0);
  royalBanner.castShadow = true;
  keepGroup.add(royalBanner);

  // Two Wall Banners hanging down the front facade of the Keep
  const wallBannerGeom = new THREE.PlaneGeometry(1.2, 3.2);
  const wallBannerMatL = getToonMaterial(PALETTE.CASTLE_HERALDIC_BLUE);
  const wallBannerMatR = getToonMaterial(PALETTE.CASTLE_HERALDIC_RED);

  const wbL = new THREE.Mesh(wallBannerGeom, wallBannerMatL);
  wbL.position.set(-2.6, 7.5, 3.63);
  const wbR = new THREE.Mesh(wallBannerGeom, wallBannerMatR);
  wbR.position.set(2.6, 7.5, 3.63);
  keepGroup.add(wbL, wbR);

  // Heraldic Escutcheon Shield above the Great Hall door
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(-0.6, 0.8);
  shieldShape.lineTo(0.6, 0.8);
  shieldShape.lineTo(0.6, -0.2);
  shieldShape.quadraticCurveTo(0.6, -0.8, 0, -1.1);
  shieldShape.quadraticCurveTo(-0.6, -0.8, -0.6, -0.2);
  shieldShape.closePath();

  const shieldGeom = new THREE.ExtrudeGeometry(shieldShape, { depth: 0.12, bevelEnabled: false });
  const shield = new THREE.Mesh(shieldGeom, getToonMaterial(PALETTE.CASTLE_HERALDIC_GOLD));
  shield.position.set(0, 5.0, 4.3);
  shield.castShadow = true;
  keepGroup.add(shield);

  // Double Arched Castle Windows (with warm glowing glass for dusk/night)
  const windowPositions = [
    [-2.4, 8.5, 3.63], [2.4, 8.5, 3.63],
    [-2.4, 8.5, -3.63], [2.4, 8.5, -3.63],
    [-4.73, 8.5, 0], [4.73, 8.5, 0],
    [0, 14.5, 2.45], [0, 14.5, -2.45]
  ];

  windowPositions.forEach(([wx, wy, wz]) => {
    const isRot = Math.abs(wx) > 4.0;
    const win = new THREE.Mesh(
      new THREE.BoxGeometry(isRot ? 0.2 : 0.8, 1.2, isRot ? 0.8 : 0.2),
      warmWindowMaterial
    );
    win.position.set(wx, wy, wz);
    keepGroup.add(win);
  });

  // Keep Interior Point Light for night glow
  const keepLight = new THREE.PointLight(0xffa53a, 0, 14, 1.2);
  keepLight.position.set(0, 9.0, 0);
  keepGroup.add(keepLight);
  nightLights.push({ light: keepLight, maxIntensity: 2.2 });

  parent.add(keepGroup);
}
