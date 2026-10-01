import * as THREE from 'three';
import { PALETTE } from './constants.js';
import { getToonMaterial, warmWindowMaterial, forgeFireMaterial } from './materials.js';

export function buildVillage(animatedObjects = [], nightLights = []) {
  const villageGroup = new THREE.Group();
  villageGroup.name = 'VillageGroup';

  const woodTimber = getToonMaterial(PALETTE.WOOD_DARK);
  const woodPlank = getToonMaterial(PALETTE.WOOD_PLANK);
  const plasterMat = getToonMaterial(PALETTE.PLASTER_WALL);
  const thatchMat = getToonMaterial(PALETTE.THATCH_ROOF);
  const stoneMat = getToonMaterial(PALETTE.CASTLE_STONE_MID);
  const ironMat = getToonMaterial(PALETTE.IRON_METAL);

  // Array to collect chimney smoke emitters
  const smokeEmitters = [];

  // 1. HALF-TIMBERED HOUSES (木筋房)
  buildHalfTimberedHouses(villageGroup, plasterMat, woodTimber, thatchMat, stoneMat, smokeEmitters, nightLights);

  // 2. CHIMNEY SMOKE SYSTEM (炊烟上升)
  buildChimneySmokeSystem(villageGroup, smokeEmitters, animatedObjects);

  // 3. VILLAGE MARKET (集市)
  buildMarketSquare(villageGroup);

  // 4. VILLAGE WELL (水井)
  buildVillageWell(villageGroup);

  // 5. WOODEN CART / WAGON (马车)
  buildPeasantCart(villageGroup);

  // 6. BLACKSMITH WORKSHOP (铁匠铺)
  buildBlacksmithShop(villageGroup, stoneMat, woodTimber, ironMat, smokeEmitters, nightLights);

  // 7. WINDMILL (风车磨坊)
  buildWindmill(villageGroup, stoneMat, woodTimber, animatedObjects);

  // 8. WATERMILL (水车)
  buildWatermill(villageGroup, stoneMat, woodTimber, animatedObjects);

  // 9. BARN & HAYSTACKS (谷仓与草垛)
  buildBarnAndHaystacks(villageGroup, woodTimber, woodPlank, thatchMat);

  return villageGroup;
}

// 1. Half-timbered Houses
function buildHalfTimberedHouses(parent, plasterMat, woodTimber, thatchMat, stoneMat, smokeEmitters, nightLights) {
  // House 1: Village Tavern / Inn (Two stories with overhanging jetty)
  const inn = createHalfTimberedHouse({
    width: 6.0,
    depth: 4.8,
    height: 4.2,
    hasJetty: true,
    roofType: 'thatch',
    chimneyPos: [-2.2, 5.0, -1.2],
    pos: [-5.8, 3.84, 1.8],
    rotY: 0.15,
    plasterMat, woodTimber, thatchMat, stoneMat, nightLights
  });
  parent.add(inn);
  smokeEmitters.push(inn.chimneyTip);

  // House 2: Baker's House (near watermill stream)
  const bakerHouse = createHalfTimberedHouse({
    width: 4.6,
    depth: 4.0,
    height: 3.6,
    hasJetty: false,
    roofType: 'thatch',
    chimneyPos: [1.6, 4.4, -1.0],
    pos: [-8.8, 3.84, -2.4],
    rotY: -0.25,
    plasterMat, woodTimber, thatchMat, stoneMat, nightLights
  });
  parent.add(bakerHouse);
  smokeEmitters.push(bakerHouse.chimneyTip);

  // House 3: Village Townhouse (East plaza)
  const townHouse = createHalfTimberedHouse({
    width: 5.2,
    depth: 4.2,
    height: 4.0,
    hasJetty: true,
    roofType: 'thatch',
    chimneyPos: [-1.8, 4.8, 1.2],
    pos: [7.2, 3.84, -1.2],
    rotY: -0.1,
    plasterMat, woodTimber, thatchMat, stoneMat, nightLights
  });
  parent.add(townHouse);
  smokeEmitters.push(townHouse.chimneyTip);

  // House 4: Cozy Craftsman Cottage (South East)
  const cottage = createHalfTimberedHouse({
    width: 4.2,
    depth: 3.8,
    height: 3.4,
    hasJetty: false,
    roofType: 'thatch',
    chimneyPos: [1.3, 4.0, 0.8],
    pos: [7.8, 3.84, 3.8],
    rotY: 0.35,
    plasterMat, woodTimber, thatchMat, stoneMat, nightLights
  });
  parent.add(cottage);
}

// Procedural Half-Timbered House generator
function createHalfTimberedHouse(cfg) {
  const house = new THREE.Group();
  house.position.set(...cfg.pos);
  house.rotation.y = cfg.rotY;

  const w = cfg.width;
  const d = cfg.depth;
  const h = cfg.height;

  // 1. Stone foundation base
  const stoneBase = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.2, 0.6, d + 0.2),
    cfg.stoneMat
  );
  stoneBase.position.y = 0.3;
  stoneBase.castShadow = true;
  stoneBase.receiveShadow = true;
  house.add(stoneBase);

  // 2. Plaster walls body
  const wallBody = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    cfg.plasterMat
  );
  wallBody.position.y = 0.6 + h / 2;
  wallBody.castShadow = true;
  wallBody.receiveShadow = true;
  house.add(wallBody);

  // 3. Exposed Dark Timber Framing (Vertical studs, corner posts, horizontal beams, diagonal cross-braces)
  const timberGroup = new THREE.Group();
  const beamMat = cfg.woodTimber;
  const beamThick = 0.12;
  const beamDepth = 0.12;

  // Corner vertical posts
  [[-w/2, -d/2], [w/2, -d/2], [-w/2, d/2], [w/2, d/2]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(beamThick * 1.5, h, beamThick * 1.5), beamMat);
    post.position.set(px, 0.6 + h / 2, pz);
    timberGroup.add(post);
  });

  // Mid-wall vertical studs
  const midX = [-w/4, w/4];
  midX.forEach(px => {
    const postF = new THREE.Mesh(new THREE.BoxGeometry(beamThick, h, beamDepth), beamMat);
    postF.position.set(px, 0.6 + h / 2, d/2 + 0.02);
    const postB = postF.clone();
    postB.position.z = -d/2 - 0.02;
    timberGroup.add(postF, postB);
  });

  // Horizontal floor beam & lintel
  const hBeamF = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, beamThick, beamDepth), beamMat);
  hBeamF.position.set(0, 0.6 + h * 0.55, d/2 + 0.02);
  const hBeamB = hBeamF.clone();
  hBeamB.position.z = -d/2 - 0.02;
  timberGroup.add(hBeamF, hBeamB);

  // Diagonal cross-brace timbers (Fachwerk / half-timber aesthetic)
  const diagLength = Math.hypot(w / 4, h / 2);
  const diagAngle = Math.atan2(h / 2, w / 4);
  const diagGeom = new THREE.BoxGeometry(diagLength, beamThick, 0.08);

  const diag1 = new THREE.Mesh(diagGeom, beamMat);
  diag1.rotation.z = diagAngle;
  diag1.position.set(-w / 2.8, 0.6 + h * 0.28, d/2 + 0.02);

  const diag2 = new THREE.Mesh(diagGeom, beamMat);
  diag2.rotation.z = -diagAngle;
  diag2.position.set(w / 2.8, 0.6 + h * 0.28, d/2 + 0.02);

  timberGroup.add(diag1, diag2);
  house.add(timberGroup);

  // 4. Overhanging Jetty (if applicable)
  if (cfg.hasJetty) {
    const jettyGeom = new THREE.BoxGeometry(w + 0.5, 0.2, d + 0.5);
    const jetty = new THREE.Mesh(jettyGeom, beamMat);
    jetty.position.y = 0.6 + h * 0.52;
    jetty.castShadow = true;
    house.add(jetty);
  }

  // 5. Thatch Roof (茅草顶 - high pitched with overhang)
  const roofHeight = 2.4;
  const roofGeom = new THREE.ConeGeometry(Math.max(w, d) * 0.82, roofHeight, 4);
  roofGeom.rotateY(Math.PI / 4);
  roofGeom.scale(w / Math.max(w, d) * 1.15, 1.0, d / Math.max(w, d) * 1.15);

  const roof = new THREE.Mesh(roofGeom, cfg.thatchMat);
  roof.position.y = 0.6 + h + roofHeight / 2 - 0.2;
  roof.castShadow = true;
  house.add(roof);

  // Roof ridge binding pole (straw tie rod)
  const ridgeGeom = new THREE.BoxGeometry(w * 0.9, 0.2, 0.2);
  const ridge = new THREE.Mesh(ridgeGeom, beamMat);
  ridge.position.y = 0.6 + h + roofHeight - 0.2;
  house.add(ridge);

  // 6. Windows & Door
  const doorGeom = new THREE.BoxGeometry(1.0, 1.8, 0.15);
  const door = new THREE.Mesh(doorGeom, beamMat);
  door.position.set(0, 0.6 + 0.9, d/2 + 0.08);
  house.add(door);

  // Warm glowing windows
  const winGeom = new THREE.BoxGeometry(0.7, 0.7, 0.15);
  const win1 = new THREE.Mesh(winGeom, warmWindowMaterial);
  win1.position.set(-w / 3.2, 0.6 + h * 0.65, d/2 + 0.08);
  const win2 = new THREE.Mesh(winGeom, warmWindowMaterial);
  win2.position.set(w / 3.2, 0.6 + h * 0.65, d/2 + 0.08);
  house.add(win1, win2);

  // Interior night light point
  if (cfg.nightLights) {
    const light = new THREE.PointLight(0xffa233, 0, 6, 1.6);
    light.position.set(0, 0.6 + h * 0.6, 0);
    house.add(light);
    cfg.nightLights.push({ light, maxIntensity: 1.2 });
  }

  // 7. Stone Chimney (烟囱)
  const chimneyGeom = new THREE.BoxGeometry(0.8, 3.2, 0.8);
  const chimney = new THREE.Mesh(chimneyGeom, cfg.stoneMat);
  chimney.position.set(...cfg.chimneyPos);
  chimney.castShadow = true;
  house.add(chimney);

  // World tip position for smoke particles
  const chimneyTip = new THREE.Vector3();
  chimney.getWorldPosition(chimneyTip);
  chimneyTip.y += 1.6;
  house.chimneyTip = chimneyTip;

  return house;
}

// 2. Chimney Smoke System (炊烟上升动效)
function buildChimneySmokeSystem(parent, emitters, animatedObjects) {
  const smokeGroup = new THREE.Group();
  smokeGroup.name = 'SmokeParticles';

  const puffCount = 18;
  const puffs = [];
  const smokeMat = new THREE.MeshToonMaterial({
    color: PALETTE.SMOKE_WHITE,
    transparent: true,
    opacity: 0.72,
    flatShading: true
  });

  const puffGeom = new THREE.DodecahedronGeometry(0.35, 1);

  // Create smoke puff particles shared among emitters
  for (let i = 0; i < puffCount; i++) {
    const puff = new THREE.Mesh(puffGeom, smokeMat.clone());
    puff.emitterIndex = i % Math.max(1, emitters.length);
    puff.progress = (i / puffCount); // 0.0 to 1.0
    puff.baseScale = 0.4 + Math.random() * 0.3;
    smokeGroup.add(puff);
    puffs.push(puff);
  }

  parent.add(smokeGroup);

  // Register animation updater
  animatedObjects.push({
    update: (delta, time) => {
      puffs.forEach(puff => {
        // Advance cycle
        puff.progress = (puff.progress + delta * 0.28) % 1.0;
        const p = puff.progress;

        const emitterPos = emitters[puff.emitterIndex] || new THREE.Vector3(-6, 8.5, 2);

        // Rise with slight wind drift (X and Z)
        const windX = Math.sin(time * 1.5 + puff.progress * 4.0) * 0.4 + p * 1.2;
        const windZ = Math.cos(time * 1.2 + puff.progress * 3.0) * 0.3 + p * 0.6;
        const riseY = p * 4.2;

        puff.position.set(
          emitterPos.x + windX,
          emitterPos.y + riseY,
          emitterPos.z + windZ
        );

        // Expand as it rises, then dissipate
        const scale = puff.baseScale * (1.0 + p * 2.8);
        puff.scale.set(scale, scale * 0.85, scale);

        // Alpha fades out smoothly towards top
        puff.material.opacity = Math.max(0.0, 0.75 * Math.sin(p * Math.PI));
      });
    }
  });
}

// 3. Village Market Square (集市)
function buildMarketSquare(parent) {
  const marketGroup = new THREE.Group();
  marketGroup.position.set(1.5, 3.84, 0.5);

  const stallConfigs = [
    { x: -2.0, z: -1.0, rotY: 0.1, stripeColor: 0xcc3333, goods: 'apples' },
    { x: 1.2, z: -1.2, rotY: -0.15, stripeColor: 0x2e8b57, goods: 'veggies' },
    { x: -0.5, z: 2.2, rotY: 3.1, stripeColor: 0x2c6496, goods: 'bread' }
  ];

  stallConfigs.forEach(sc => {
    const stall = createMarketStall(sc);
    stall.position.set(sc.x, 0, sc.z);
    stall.rotation.y = sc.rotY;
    marketGroup.add(stall);
  });

  // Stacks of barrels and crates
  const barrelMat = getToonMaterial(PALETTE.WOOD_PLANK);
  const crateMat = getToonMaterial(PALETTE.WOOD_LIGHT);

  [[-3.2, 0.3, -0.2], [-3.2, 0.3, 0.4], [2.6, 0.3, -0.4]].forEach(([bx, by, bz]) => {
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.38, 0.8, 10), barrelMat);
    barrel.position.set(bx, by, bz);
    barrel.castShadow = true;
    marketGroup.add(barrel);
  });

  // Crates
  [[2.7, 0.25, 0.5], [2.7, 0.7, 0.5], [2.1, 0.25, 0.6]].forEach(([cx, cy, cz]) => {
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.55), crateMat);
    crate.position.set(cx, cy, cz);
    crate.castShadow = true;
    marketGroup.add(crate);
  });

  parent.add(marketGroup);
}

// Single Market Stall Generator with striped awning & produce
function createMarketStall(cfg) {
  const stall = new THREE.Group();

  // Wooden table counter
  const counterGeom = new THREE.BoxGeometry(2.2, 0.8, 1.2);
  const counter = new THREE.Mesh(counterGeom, getToonMaterial(PALETTE.WOOD_PLANK));
  counter.position.y = 0.4;
  counter.castShadow = true;
  stall.add(counter);

  // 4 thin corner posts
  const postGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.3, 6);
  const postMat = getToonMaterial(PALETTE.WOOD_DARK);
  [[-1.0, -0.5], [1.0, -0.5], [-1.0, 0.5], [1.0, 0.5]].forEach(([px, pz]) => {
    const p = new THREE.Mesh(postGeom, postMat);
    p.position.set(px, 1.15, pz);
    stall.add(p);
  });

  // Striped Canopy Awning
  const canopyShape = new THREE.Shape();
  canopyShape.moveTo(-1.2, 0);
  canopyShape.lineTo(1.2, 0);
  canopyShape.lineTo(1.1, 0.5);
  canopyShape.lineTo(-1.1, 0.5);
  canopyShape.closePath();

  const canopyGeom = new THREE.BoxGeometry(2.4, 0.25, 1.4);
  const canopy = new THREE.Mesh(canopyGeom, getToonMaterial(cfg.stripeColor));
  canopy.position.set(0, 2.2, 0);
  canopy.rotation.x = 0.15;
  canopy.castShadow = true;
  stall.add(canopy);

  // Produce on display
  if (cfg.goods === 'apples') {
    for (let i = 0; i < 6; i++) {
      const apple = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.12, 1),
        getToonMaterial(PALETTE.APPLE_RED)
      );
      apple.position.set(-0.6 + (i % 3) * 0.3, 0.9, -0.2 + Math.floor(i / 3) * 0.3);
      stall.add(apple);
    }
  } else if (cfg.goods === 'veggies') {
    for (let i = 0; i < 4; i++) {
      const pumpkin = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 8, 8),
        getToonMaterial(PALETTE.PUMPKIN_ORANGE)
      );
      pumpkin.scale.set(1.2, 0.8, 1.2);
      pumpkin.position.set(-0.5 + i * 0.35, 0.92, 0);
      stall.add(pumpkin);
    }
  } else {
    // Bread loaves
    for (let i = 0; i < 5; i++) {
      const bread = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.1, 0.25, 4, 8),
        getToonMaterial(PALETTE.THATCH_ROOF_DARK)
      );
      bread.rotation.z = Math.PI / 2;
      bread.position.set(-0.6 + i * 0.3, 0.9, 0);
      stall.add(bread);
    }
  }

  return stall;
}

// 4. Village Well (水井)
function buildVillageWell(parent) {
  const wellGroup = new THREE.Group();
  wellGroup.position.set(-1.8, 3.84, -0.8);

  const stoneMat = getToonMaterial(PALETTE.CASTLE_STONE_LIGHT);
  const woodMat = getToonMaterial(PALETTE.WOOD_DARK);

  // Round stone well curb
  const curbGeom = new THREE.CylinderGeometry(1.0, 1.1, 0.9, 12, 1, true);
  const curb = new THREE.Mesh(curbGeom, stoneMat);
  curb.position.y = 0.45;
  curb.castShadow = true;
  wellGroup.add(curb);

  // Well water interior disc
  const waterDisc = new THREE.Mesh(
    new THREE.CircleGeometry(0.9, 12),
    getToonMaterial(PALETTE.WATER_DEEP)
  );
  waterDisc.rotation.x = -Math.PI / 2;
  waterDisc.position.y = 0.35;
  wellGroup.add(waterDisc);

  // Timber A-frame roof support posts
  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), woodMat);
  postL.position.set(-0.95, 1.0, 0);
  const postR = postL.clone();
  postR.position.x = 0.95;
  wellGroup.add(postL, postR);

  // Roof Canopy (shingled pitched roof)
  const roofGeom = new THREE.ConeGeometry(1.4, 0.9, 4);
  roofGeom.rotateY(Math.PI / 4);
  const wellRoof = new THREE.Mesh(roofGeom, getToonMaterial(PALETTE.CASTLE_ROOF_RED));
  wellRoof.position.y = 2.2;
  wellRoof.castShadow = true;
  wellGroup.add(wellRoof);

  // Wooden Winch axle & suspended bucket
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.9, 8), woodMat);
  axle.rotation.z = Math.PI / 2;
  axle.position.y = 1.45;
  wellGroup.add(axle);

  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.35, 8), woodMat);
  bucket.position.set(0.2, 0.75, 0);
  wellGroup.add(bucket);

  parent.add(wellGroup);
}

// 5. Wooden Peasant Wagon / Cart (马车)
function buildPeasantCart(parent) {
  const cartGroup = new THREE.Group();
  cartGroup.position.set(4.2, 3.84, 3.8);
  cartGroup.rotation.y = -0.4;

  const woodMat = getToonMaterial(PALETTE.WOOD_PLANK);
  const darkWood = getToonMaterial(PALETTE.WOOD_DARK);

  // Bed of cart
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.4), woodMat);
  bed.position.y = 0.85;
  bed.castShadow = true;
  cartGroup.add(bed);

  // Wooden slatted sideboards
  const sideL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.45, 0.08), woodMat);
  sideL.position.set(0, 1.08, -0.66);
  const sideR = sideL.clone();
  sideR.position.z = 0.66;
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 1.4), woodMat);
  back.position.set(-1.26, 1.08, 0);
  cartGroup.add(sideL, sideR, back);

  // Spoked wooden wheels (4 wheels)
  const wheelGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.1, 10);
  wheelGeom.rotateX(Math.PI / 2);
  const wheelMat = darkWood;

  [[-0.9, -0.75], [0.9, -0.75], [-0.9, 0.75], [0.9, 0.75]].forEach(([wx, wz]) => {
    const wheel = new THREE.Mesh(wheelGeom, wheelMat);
    wheel.position.set(wx, 0.48, wz);
    wheel.castShadow = true;
    cartGroup.add(wheel);
  });

  // Hay load inside the wagon
  const hayGeom = new THREE.BoxGeometry(2.3, 0.55, 1.2);
  const hay = new THREE.Mesh(hayGeom, getToonMaterial(PALETTE.WHEAT_GOLD));
  hay.position.set(-0.1, 1.2, 0);
  cartGroup.add(hay);

  // Cart draft shafts pointing forward
  const shaftL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6), darkWood);
  shaftL.rotation.z = Math.PI / 2 - 0.2;
  shaftL.position.set(2.0, 0.5, -0.4);
  const shaftR = shaftL.clone();
  shaftR.position.z = 0.4;
  cartGroup.add(shaftL, shaftR);

  parent.add(cartGroup);
}

// 6. Blacksmith Shop (铁匠铺)
function buildBlacksmithShop(parent, stoneMat, woodTimber, ironMat, smokeEmitters, nightLights) {
  const forgeGroup = new THREE.Group();
  forgeGroup.position.set(-10.8, 3.84, 2.2);

  // Open-walled workshop structure (3 stone walls, open front facing plaza)
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.0, 0.6), stoneMat);
  backWall.position.set(0, 1.5, -2.0);
  backWall.castShadow = true;

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.0, 4.0), stoneMat);
  leftWall.position.set(-2.3, 1.5, 0);
  leftWall.castShadow = true;

  forgeGroup.add(backWall, leftWall);

  // Roof Canopy
  const forgeRoof = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 0.3, 4.6),
    getToonMaterial(PALETTE.CASTLE_ROOF_RED)
  );
  forgeRoof.position.set(0, 3.1, 0);
  forgeRoof.rotation.x = 0.12;
  forgeRoof.castShadow = true;
  forgeGroup.add(forgeRoof);

  // Front timber pillar support
  const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.0, 0.25), woodTimber);
  pillar.position.set(2.3, 1.5, 1.8);
  forgeGroup.add(pillar);

  // Hearth / Forge Furnace with glowing red-orange coals
  const hearthGeom = new THREE.BoxGeometry(1.6, 1.1, 1.4);
  const hearth = new THREE.Mesh(hearthGeom, stoneMat);
  hearth.position.set(-1.0, 0.55, -1.0);
  hearth.castShadow = true;
  forgeGroup.add(hearth);

  // Glowing coals
  const coals = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.2, 0.8),
    forgeFireMaterial
  );
  coals.position.set(-1.0, 1.15, -1.0);
  forgeGroup.add(coals);

  // Forge Chimney
  const forgeChimney = new THREE.Mesh(new THREE.BoxGeometry(1.0, 3.8, 1.0), stoneMat);
  forgeChimney.position.set(-1.0, 3.0, -1.0);
  forgeChimney.castShadow = true;
  forgeGroup.add(forgeChimney);

  // Chimney tip for smoke
  const fTip = new THREE.Vector3();
  forgeChimney.getWorldPosition(fTip);
  fTip.y += 2.0;
  smokeEmitters.push(fTip);

  // Dynamic Warm Forge Light (flickering in night / dusk)
  const forgeLight = new THREE.PointLight(0xff4500, 1.8, 8, 1.6);
  forgeLight.position.set(-1.0, 1.4, -0.8);
  forgeGroup.add(forgeLight);
  nightLights.push({ light: forgeLight, maxIntensity: 2.5, flicker: true });

  // Heavy Iron Anvil on Tree Stump
  const stump = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.5, 0.65, 10),
    woodTimber
  );
  stump.position.set(0.8, 0.32, 0.3);
  stump.castShadow = true;
  forgeGroup.add(stump);

  // Iron Anvil
  const anvilBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.35), ironMat);
  anvilBase.position.set(0.8, 0.75, 0.3);
  const anvilHorn = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 6), ironMat);
  anvilHorn.rotation.z = -Math.PI / 2;
  anvilHorn.position.set(1.15, 0.8, 0.3);
  forgeGroup.add(anvilBase, anvilHorn);

  // Water Quench Trough (barrel)
  const trough = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.35, 0.7, 10),
    woodTimber
  );
  trough.position.set(1.5, 0.35, -1.0);
  forgeGroup.add(trough);

  parent.add(forgeGroup);
}

// 7. Windmill (风车磨坊 - with rotating sails)
function buildWindmill(parent, stoneMat, woodTimber, animatedObjects) {
  const millGroup = new THREE.Group();
  millGroup.position.set(18.5, 2.4, -1.5);

  // Round tapered stone tower base
  const towerGeom = new THREE.CylinderGeometry(2.0, 2.6, 5.5, 12);
  const tower = new THREE.Mesh(towerGeom, stoneMat);
  tower.position.y = 2.75;
  tower.castShadow = true;
  tower.receiveShadow = true;
  millGroup.add(tower);

  // Wooden rotating top cap
  const capGeom = new THREE.ConeGeometry(2.4, 2.2, 8);
  const cap = new THREE.Mesh(capGeom, getToonMaterial(PALETTE.CASTLE_ROOF_RED));
  cap.position.y = 6.6;
  cap.castShadow = true;
  millGroup.add(cap);

  // Rotating Sail Hub & Blades
  const sailRotor = new THREE.Group();
  sailRotor.position.set(-0.2, 6.2, 2.1); // facing front/left breeze

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.4, 8),
    getToonMaterial(PALETTE.WOOD_DARK)
  );
  hub.rotation.x = Math.PI / 2;
  sailRotor.add(hub);

  // 4 Windmill Lattice Blades with Canvas Sails
  const bladeMat = getToonMaterial(PALETTE.WOOD_BEAM);
  const sailClothMat = getToonMaterial(PALETTE.PLASTER_WALL);

  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const bladeArm = new THREE.Group();
    bladeArm.rotation.z = angle;

    // Wooden spar
    const spar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.4, 0.1), bladeMat);
    spar.position.y = 2.2;
    bladeArm.add(spar);

    // Canvas sail cloth panel
    const canvasSail = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 3.6), sailClothMat);
    canvasSail.position.set(0.42, 2.3, 0.02);
    canvasSail.rotation.y = 0.15; // pitch angle to catch wind
    bladeArm.add(canvasSail);

    sailRotor.add(bladeArm);
  }

  millGroup.add(sailRotor);
  parent.add(millGroup);

  // Animation: sails rotate with wind
  animatedObjects.push({
    update: (delta) => {
      sailRotor.rotation.z += delta * 0.95;
    }
  });
}

// 8. Watermill (水车 - with rotating water wheel)
function buildWatermill(parent, stoneMat, woodTimber, animatedObjects) {
  const watermillGroup = new THREE.Group();
  watermillGroup.position.set(-15.8, 1.2, 5.5);

  // Timber millhouse
  const millhouse = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 3.4, 4.0),
    getToonMaterial(PALETTE.WOOD_PLANK)
  );
  millhouse.position.set(2.4, 1.7, 0);
  millhouse.castShadow = true;
  watermillGroup.add(millhouse);

  // Millhouse roof
  const millRoof = new THREE.Mesh(
    new THREE.ConeGeometry(3.6, 2.0, 4),
    getToonMaterial(PALETTE.THATCH_ROOF)
  );
  millRoof.rotateY(Math.PI / 4);
  millRoof.position.set(2.4, 4.2, 0);
  millRoof.castShadow = true;
  watermillGroup.add(millRoof);

  // Water Wheel (水车 - large rotating paddle wheel in the stream)
  const wheelGroup = new THREE.Group();
  wheelGroup.position.set(-0.2, 1.1, 0); // half submerged in stream

  const wheelMat = getToonMaterial(PALETTE.WOOD_DARK);
  const paddleMat = getToonMaterial(PALETTE.WOOD_PLANK);

  // Wheel rim rings
  const rim1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.08, 6, 16), wheelMat);
  rim1.position.z = -0.3;
  const rim2 = rim1.clone();
  rim2.position.z = 0.3;
  wheelGroup.add(rim1, rim2);

  // Wheel axle
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.0, 8), wheelMat);
  axle.rotation.x = Math.PI / 2;
  wheelGroup.add(axle);

  // 12 Wooden Paddles around the wheel
  const numPaddles = 12;
  for (let i = 0; i < numPaddles; i++) {
    const angle = (i * Math.PI * 2) / numPaddles;
    const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.65), paddleMat);
    paddle.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
    paddle.rotation.z = angle;
    wheelGroup.add(paddle);
  }

  watermillGroup.add(wheelGroup);
  parent.add(watermillGroup);

  // Animation: water wheel turns steadily with water flow
  animatedObjects.push({
    update: (delta) => {
      wheelGroup.rotation.z += delta * 1.25;
    }
  });
}

// 9. Barn & Haystacks (谷仓与草垛)
function buildBarnAndHaystacks(parent, woodTimber, woodPlank, thatchMat) {
  const barnGroup = new THREE.Group();
  barnGroup.position.set(11.5, 3.84, 1.8);

  // Rustic wooden barn building
  const barn = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 3.2, 3.8),
    woodPlank
  );
  barn.position.y = 1.6;
  barn.castShadow = true;
  barnGroup.add(barn);

  // Barn double doors
  const doorMat = woodTimber;
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 0.15), doorMat);
  door.position.set(0, 1.1, 1.95);
  barnGroup.add(door);

  // Gambrel/pitched thatch roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.8, 2.2, 4),
    thatchMat
  );
  roof.rotateY(Math.PI / 4);
  roof.position.set(0, 4.0, 0);
  roof.castShadow = true;
  barnGroup.add(roof);

  // Conical Thatched Haystacks (草垛)
  const haystackPositions = [
    [3.6, 0, 1.8, 1.4, 2.2],
    [4.8, 0, -0.8, 1.2, 1.8],
    [-2.8, 0, 3.2, 1.0, 1.5]
  ];

  haystackPositions.forEach(([hx, hy, hz, radius, height]) => {
    const stack = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 8),
      thatchMat
    );
    stack.position.set(hx, height / 2, hz);
    stack.castShadow = true;
    barnGroup.add(stack);

    // Center wooden pole sticking out the top
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, height + 0.8, 6),
      woodTimber
    );
    pole.position.set(hx, height / 2 + 0.4, hz);
    barnGroup.add(pole);
  });

  // Cylindrical rolled hay bales
  const baleGeom = new THREE.CylinderGeometry(0.45, 0.45, 0.9, 10);
  baleGeom.rotateZ(Math.PI / 2);
  const baleMat = getToonMaterial(PALETTE.WHEAT_GOLD);

  [[2.2, 0.45, 3.0], [2.2, 0.45, 4.0], [2.2, 1.2, 3.5]].forEach(([bx, by, bz]) => {
    const bale = new THREE.Mesh(baleGeom, baleMat);
    bale.position.set(bx, by, bz);
    bale.castShadow = true;
    barnGroup.add(bale);
  });

  parent.add(barnGroup);
}
