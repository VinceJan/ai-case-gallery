import * as THREE from 'three';
import {
  PALETTE,
  ENV_UNIFORMS,
  getTextures,
  createToonMaterial,
  createGlowMaterial,
} from './materials.js';
import { VILLAGE_Y, WINDMILL_Y, CASTLE_Y } from './terrain.js';

export function buildVillage() {
  const textures = getTextures();
  const group = new THREE.Group();
  group.name = 'MedievalVillage';

  // Shared cel-shaded materials
  const stoneMat = createToonMaterial({
    color: PALETTE.castleStoneAlt,
    map: textures.retainingStone,
    snowable: true,
    snowThreshold: 0.65,
  });
  const castleStoneMat = createToonMaterial({
    color: 0xf4eee2,
    map: textures.castleStone,
    snowable: true,
    snowThreshold: 0.65,
  });
  const timberDarkMat = createToonMaterial({
    color: PALETTE.timberDark,
    snowable: true,
    snowThreshold: 0.68,
  });
  const timberMidMat = createToonMaterial({
    color: PALETTE.timberMid,
    snowable: true,
    snowThreshold: 0.68,
  });
  const woodPlankMat = createToonMaterial({
    color: 0xffffff,
    map: textures.wood,
    snowable: true,
    snowThreshold: 0.65,
  });
  const thatchMat = createToonMaterial({
    color: 0xffffff,
    map: textures.thatch,
    snowable: true,
    snowThreshold: 0.4,
  });
  const terracottaMat = createToonMaterial({
    color: PALETTE.terracotta,
    snowable: true,
    snowThreshold: 0.42,
  });
  const barnRoofMat = createToonMaterial({
    color: PALETTE.barnRoof,
    snowable: true,
    snowThreshold: 0.42,
  });
  const smithyRoofMat = createToonMaterial({
    color: PALETTE.smithyRoof,
    snowable: true,
    snowThreshold: 0.42,
  });
  const hayMat = createToonMaterial({
    color: PALETTE.hayGold,
    snowable: true,
    snowThreshold: 0.45,
  });
  const ironMat = createToonMaterial({
    color: PALETTE.ironDark,
    snowable: false,
  });
  const sailCanvasMat = createToonMaterial({
    color: 0xf6efde,
    side: THREE.DoubleSide,
    snowable: false,
  });
  const glowWindowMat = createGlowMaterial(PALETTE.windowGlow, 0.6);
  const forgeGlowMat = createGlowMaterial(PALETTE.forgeGlow, 1.1);

  const glowMaterials = [glowWindowMat, forgeGlowMat];
  const smokeSources = [];
  let windmillSails = null;
  let waterwheel = null;
  let forgeFlame = null;
  const splashPuffs = [];

  // Helper: Build a charming half-timbered medieval cottage with thatched or terracotta roof
  function createHalfTimberHouse({
    w = 2.0,
    d = 1.6,
    h = 1.35,
    plasterColor = PALETTE.plasterCream,
    roofMat = thatchMat,
    twoStory = false,
    hasChimney = true,
  }) {
    const hGroup = new THREE.Group();
    const plasterMat = createToonMaterial({
      color: plasterColor,
      snowable: true,
      snowThreshold: 0.72,
    });

    // Stone foundation plinth
    const base = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.26, d + 0.1), stoneMat);
    base.position.y = 0.13;
    base.castShadow = true;
    base.receiveShadow = true;
    hGroup.add(base);

    // Lower story plaster core
    const lowerH = twoStory ? h * 0.65 : h;
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, lowerH, d), plasterMat);
    body.position.y = 0.26 + lowerH / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    hGroup.add(body);

    // Dark timber framing posts & beams (木筋)
    const beamT = 0.085;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const post = new THREE.Mesh(
          new THREE.BoxGeometry(beamT, lowerH + 0.02, beamT),
          timberDarkMat
        );
        post.position.set(sx * (w / 2), 0.26 + lowerH / 2, sz * (d / 2));
        hGroup.add(post);
      }
    }
    // Horizontal belt beams
    for (const sy of [0.28, 0.26 + lowerH]) {
      const bF = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, beamT, beamT), timberDarkMat);
      bF.position.set(0, sy, d / 2);
      const bB = bF.clone();
      bB.position.z = -d / 2;
      const bL = new THREE.Mesh(new THREE.BoxGeometry(beamT, beamT, d + 0.06), timberDarkMat);
      bL.position.set(-w / 2, sy, 0);
      const bR = bL.clone();
      bR.position.x = w / 2;
      hGroup.add(bF, bB, bL, bR);
    }

    // Diagonal Tudor timber cross-braces on front & side walls
    for (const side of [-1, 1]) {
      const diag = new THREE.Mesh(
        new THREE.BoxGeometry(beamT * 0.8, lowerH * 0.92, beamT * 0.8),
        timberDarkMat
      );
      diag.position.set(side * (w * 0.34), 0.26 + lowerH * 0.5, d / 2 + 0.01);
      diag.rotation.z = side * 0.42;
      hGroup.add(diag);
    }

    // Optional overhanging jettied second floor
    let roofBaseY = 0.26 + lowerH;
    let roofW = w;
    let roofD = d;
    if (twoStory) {
      const upperH = h * 0.62;
      const uw = w + 0.26;
      const ud = d + 0.22;
      const upperBody = new THREE.Mesh(new THREE.BoxGeometry(uw, upperH, ud), plasterMat);
      upperBody.position.y = roofBaseY + upperH / 2;
      upperBody.castShadow = true;
      upperBody.receiveShadow = true;
      hGroup.add(upperBody);

      // Upper timber frame corners & center stud
      for (const sx of [-1, 0, 1]) {
        const upPost = new THREE.Mesh(
          new THREE.BoxGeometry(beamT, upperH, beamT),
          timberDarkMat
        );
        upPost.position.set(sx * (uw / 2), roofBaseY + upperH / 2, ud / 2);
        hGroup.add(upPost);
      }
      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(uw + 0.08, beamT, beamT), timberDarkMat);
      topBeam.position.set(0, roofBaseY + upperH, ud / 2);
      hGroup.add(topBeam);

      // Glowing upper window with shutters
      const uWin = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.08), glowWindowMat);
      uWin.position.set(-uw * 0.24, roofBaseY + upperH * 0.52, ud / 2 + 0.01);
      hGroup.add(uWin);
      const uWin2 = uWin.clone();
      uWin2.position.x = uw * 0.24;
      hGroup.add(uWin2);

      roofBaseY += upperH;
      roofW = uw;
      roofD = ud;
    }

    // Thick sculpted pitched thatched/tiled roof (茅草顶)
    const roofH = 1.08;
    const overhangX = 0.24;
    const overhangZ = 0.22;
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-(roofD / 2 + overhangZ), -0.1);
    roofShape.lineTo(roofD / 2 + overhangZ, -0.1);
    roofShape.lineTo(0, roofH);
    roofShape.closePath();

    const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
      depth: roofW + overhangX * 2,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 2,
    });
    roofGeo.translate(0, 0, -(roofW + overhangX * 2) / 2);
    roofGeo.rotateY(Math.PI / 2);
    // Scale UVs cleanly
    const rUv = roofGeo.attributes.uv;
    for (let i = 0; i < rUv.count; i++) {
      rUv.setXY(i, rUv.getX(i) * 0.45, rUv.getY(i) * 0.45);
    }
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = roofBaseY;
    roof.castShadow = true;
    roof.receiveShadow = true;
    hGroup.add(roof);

    // Wooden ridge beam along peak
    const ridgeBeam = new THREE.Mesh(
      new THREE.BoxGeometry(roofW + overhangX * 2 + 0.12, 0.11, 0.14),
      timberDarkMat
    );
    ridgeBeam.position.y = roofBaseY + roofH + 0.02;
    hGroup.add(ridgeBeam);

    // Front wooden door
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.72, 0.08), timberMidMat);
    door.position.set(0, 0.26 + 0.36, d / 2 + 0.02);
    hGroup.add(door);
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.78, 0.05), timberDarkMat);
    doorFrame.position.set(0, 0.26 + 0.39, d / 2 + 0.005);
    hGroup.add(doorFrame);

    // Glowing front window + flower box
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.07), glowWindowMat);
    win.position.set(w * 0.28, 0.26 + lowerH * 0.54, d / 2 + 0.02);
    hGroup.add(win);
    const fBox = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.14), timberDarkMat);
    fBox.position.set(w * 0.28, 0.26 + lowerH * 0.32, d / 2 + 0.07);
    hGroup.add(fBox);
    const flowers = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.09, 0.1),
      createToonMaterial({ color: 0xe3766c, snowable: true })
    );
    flowers.position.set(w * 0.28, 0.26 + lowerH * 0.39, d / 2 + 0.07);
    hGroup.add(flowers);

    // Side glowing window
    const sWin = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.34, 0.34), glowWindowMat);
    sWin.position.set(w / 2 + 0.02, 0.26 + lowerH * 0.54, 0);
    hGroup.add(sWin);

    // Stone chimney + register smoke emitter tip
    let chimneyTipLocal = null;
    if (hasChimney) {
      const chH = roofH + 0.65;
      const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.36, chH, 0.36), stoneMat);
      chimney.position.set(-roofW * 0.28, roofBaseY + chH * 0.42, -roofD * 0.18);
      chimney.castShadow = true;
      hGroup.add(chimney);

      const chCap = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.1, 0.46), stoneMat);
      chCap.position.set(-roofW * 0.28, roofBaseY + chH * 0.92, -roofD * 0.18);
      hGroup.add(chCap);

      chimneyTipLocal = new THREE.Vector3(
        -roofW * 0.28,
        roofBaseY + chH * 0.96,
        -roofD * 0.18
      );
    }

    return { mesh: hGroup, chimneyTipLocal };
  }

  // =========================================================================
  // 1. VILLAGE HALF-TIMBERED COTTAGES (木筋房 + 茅草顶)
  // =========================================================================
  const houseConfigs = [
    {
      x: -4.25, y: VILLAGE_Y, z: 0.25, rotY: 0.62,
      w: 2.15, d: 1.55, h: 1.38, plasterColor: PALETTE.plasterCream,
      roofMat: thatchMat, twoStory: true, hasChimney: true,
    },
    {
      x: -3.75, y: VILLAGE_Y, z: -1.95, rotY: 0.28,
      w: 1.9, d: 1.45, h: 1.22, plasterColor: PALETTE.plasterOchre,
      roofMat: thatchMat, twoStory: false, hasChimney: true,
    },
    {
      x: 3.95, y: VILLAGE_Y, z: -1.7, rotY: -0.36,
      w: 2.1, d: 1.55, h: 1.35, plasterColor: PALETTE.plasterSage,
      roofMat: terracottaMat, twoStory: true, hasChimney: true,
    },
    {
      x: 4.35, y: VILLAGE_Y, z: 0.85, rotY: -0.68,
      w: 1.95, d: 1.5, h: 1.25, plasterColor: PALETTE.plasterBlush,
      roofMat: thatchMat, twoStory: false, hasChimney: true,
    },
  ];

  for (const cfg of houseConfigs) {
    const { mesh, chimneyTipLocal } = createHalfTimberHouse(cfg);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    mesh.rotation.y = cfg.rotY;
    group.add(mesh);

    if (chimneyTipLocal) {
      mesh.updateMatrixWorld(true);
      const worldTip = chimneyTipLocal.clone().applyMatrix4(mesh.matrixWorld);
      smokeSources.push({ pos: worldTip, rate: 1.0, scale: 1.0 });
    }
  }

  // Register castle keep chimney smoke too!
  smokeSources.push({
    pos: new THREE.Vector3(-1.45, CASTLE_Y + 6.55, -8.8),
    rate: 0.8,
    scale: 1.15,
  });

  // =========================================================================
  // 2. VILLAGE STONE WELL (水井) — Centerpiece of Cobblestone Plaza
  // =========================================================================
  const well = new THREE.Group();
  well.position.set(0.05, VILLAGE_Y, 0.55);

  const wellRing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.52, 0.52, 12),
    stoneMat
  );
  wellRing.position.y = 0.26;
  wellRing.castShadow = true;
  wellRing.receiveShadow = true;
  well.add(wellRing);

  const wellWater = new THREE.Mesh(
    new THREE.CircleGeometry(0.36, 12),
    createToonMaterial({ color: PALETTE.waterDeep, snowable: false })
  );
  wellWater.rotation.x = -Math.PI / 2;
  wellWater.position.y = 0.48;
  well.add(wellWater);

  // Timber A-frame supports & pitched little roof
  for (const sx of [-0.42, 0.42]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 0.08), timberDarkMat);
    post.position.set(sx, 0.82, 0);
    post.castShadow = true;
    well.add(post);
  }
  // Windlass axle & hanging bucket
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.96, 8), timberMidMat);
  axle.rotation.z = Math.PI / 2;
  axle.position.y = 0.94;
  well.add(axle);

  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.34, 6), hayMat);
  rope.position.y = 0.76;
  well.add(rope);

  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.085, 0.16, 8), timberMidMat);
  bucket.position.set(0.0, 0.58, 0.0);
  well.add(bucket);

  // Small gabled well roof
  const wellRoofL = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.07, 0.58), thatchMat);
  wellRoofL.position.set(0, 1.38, -0.2);
  wellRoofL.rotation.x = -0.58;
  wellRoofL.castShadow = true;
  const wellRoofR = wellRoofL.clone();
  wellRoofR.position.z = 0.2;
  wellRoofR.rotation.x = 0.58;
  well.add(wellRoofL, wellRoofR);
  group.add(well);

  // =========================================================================
  // 3. VILLAGE MARKET STALLS (集市)
  // =========================================================================
  function createMarketStall(x, z, rotY, canopyColorA, canopyColorB, goodsType) {
    const stall = new THREE.Group();
    stall.position.set(x, VILLAGE_Y, z);
    stall.rotation.y = rotY;

    // Counter table
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.46, 0.64), woodPlankMat);
    table.position.y = 0.23;
    table.castShadow = true;
    table.receiveShadow = true;
    stall.add(table);

    // 4 Corner poles
    for (const sx of [-0.56, 0.56]) {
      for (const sz of [-0.28, 0.28]) {
        const h = sz < 0 ? 1.18 : 1.02;
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, 0.06), timberDarkMat);
        p.position.set(sx, h / 2, sz);
        p.castShadow = true;
        stall.add(p);
      }
    }

    // Striped cloth canopy
    const stripeCount = 5;
    const sw = 1.36 / stripeCount;
    const matA = createToonMaterial({ color: canopyColorA, snowable: true, snowThreshold: 0.45 });
    const matB = createToonMaterial({ color: canopyColorB, snowable: true, snowThreshold: 0.45 });
    for (let i = 0; i < stripeCount; i++) {
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(sw, 0.06, 0.86),
        i % 2 === 0 ? matA : matB
      );
      strip.position.set(-0.68 + sw * (i + 0.5), 1.12, 0.02);
      strip.rotation.x = 0.22;
      strip.castShadow = true;
      stall.add(strip);
    }

    // Goods on table
    if (goodsType === 'produce') {
      const appleMat = createToonMaterial({ color: 0xd14b47, snowable: false });
      const vegMat = createToonMaterial({ color: 0x7cb356, snowable: false });
      for (let i = 0; i < 6; i++) {
        const item = new THREE.Mesh(
          new THREE.SphereGeometry(0.075, 7, 7),
          i < 3 ? appleMat : vegMat
        );
        item.position.set(-0.35 + (i % 3) * 0.14 + (i >= 3 ? 0.5 : 0), 0.52, (i % 2 - 0.5) * 0.16);
        stall.add(item);
      }
    } else if (goodsType === 'bakery') {
      const breadMat = createToonMaterial({ color: 0xd89f52, snowable: false });
      for (let i = 0; i < 4; i++) {
        const loaf = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), breadMat);
        loaf.scale.set(1.4, 0.75, 0.9);
        loaf.position.set(-0.36 + i * 0.24, 0.52, 0.02);
        stall.add(loaf);
      }
    } else {
      // Fabric rolls & spice jars
      const boltColors = [0x4c79a6, 0xd46356, 0xe4ba58];
      for (let i = 0; i < 3; i++) {
        const bolt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.32, 8),
          createToonMaterial({ color: boltColors[i], snowable: false })
        );
        bolt.rotation.x = Math.PI / 2;
        bolt.position.set(-0.3 + i * 0.3, 0.54, 0);
        stall.add(bolt);
      }
    }

    // Side wooden barrel
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.36, 9), timberMidMat);
    barrel.position.set(0.76, 0.18, 0.08);
    barrel.castShadow = true;
    stall.add(barrel);

    group.add(stall);
  }

  createMarketStall(-1.68, 1.48, 0.55, PALETTE.bannerCrimson, 0xf5ecd9, 'produce');
  createMarketStall(1.88, 1.05, -0.52, PALETTE.bannerBlue, 0xf5ecd9, 'fabric');
  createMarketStall(-1.82, -0.55, 1.25, 0xd89c46, 0xf5ecd9, 'bakery');

  // =========================================================================
  // 4. HORSE CART / WAGON (马车)
  // =========================================================================
  const cart = new THREE.Group();
  cart.position.set(1.65, VILLAGE_Y, 2.38);
  cart.rotation.y = -0.38;

  // Wagon bed
  const bed = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.12, 0.72), woodPlankMat);
  bed.position.y = 0.34;
  bed.castShadow = true;
  cart.add(bed);

  // Side wooden rails
  for (const sz of [-0.34, 0.34]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.24, 0.05), timberMidMat);
    rail.position.set(0, 0.5, sz);
    rail.castShadow = true;
    cart.add(rail);
  }
  const backBoard = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.26, 0.72), timberMidMat);
  backBoard.position.set(-0.58, 0.5, 0);
  cart.add(backBoard);

  // Pull shafts at front (+X)
  for (const sz of [-0.22, 0.22]) {
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.05), timberDarkMat);
    shaft.position.set(0.88, 0.26, sz);
    shaft.rotation.z = -0.18;
    cart.add(shaft);
  }

  // 4 Spoked Wheels
  const wheelPositions = [
    [-0.36, -0.4], [-0.36, 0.4],
    [0.36, -0.4], [0.36, 0.4],
  ];
  for (const [wx, wz] of wheelPositions) {
    const wGroup = new THREE.Group();
    wGroup.position.set(wx, 0.24, wz);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.032, 6, 12), timberDarkMat);
    wGroup.add(rim);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 8), ironMat);
    hub.rotation.x = Math.PI / 2;
    wGroup.add(hub);
    for (let s = 0; s < 4; s++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.42, 0.025), timberMidMat);
      spoke.rotation.z = (s * Math.PI) / 4;
      wGroup.add(spoke);
    }
    cart.add(wGroup);
  }

  // Burlap grain sacks & barrel cargo
  const sackMat = createToonMaterial({ color: 0xdcc599, snowable: true });
  for (let i = 0; i < 3; i++) {
    const sack = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 7), sackMat);
    sack.scale.set(1.2, 0.85, 0.95);
    sack.position.set(-0.26 + i * 0.26, 0.54, (i % 2 - 0.5) * 0.14);
    sack.castShadow = true;
    cart.add(sack);
  }
  group.add(cart);

  // =========================================================================
  // 5. BLACKSMITH / SMITHY (铁匠铺)
  // =========================================================================
  const smithy = new THREE.Group();
  smithy.position.set(-3.75, VILLAGE_Y, 2.25);
  smithy.rotation.y = 0.18;

  // Stone workshop floor pad
  const sFloor = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.1, 1.55), stoneMat);
  sFloor.position.y = 0.05;
  sFloor.receiveShadow = true;
  smithy.add(sFloor);

  // Rear stone wall & forge furnace hearth
  const sBackWall = new THREE.Mesh(new THREE.BoxGeometry(1.95, 1.15, 0.22), stoneMat);
  sBackWall.position.set(0, 0.62, -0.62);
  sBackWall.castShadow = true;
  smithy.add(sBackWall);

  // Stone forge chimney & glowing ember hearth
  const forgeBody = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.72, 0.68), stoneMat);
  forgeBody.position.set(-0.48, 0.42, -0.32);
  forgeBody.castShadow = true;
  smithy.add(forgeBody);

  const forgeHood = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.42, 0.72, 4), stoneMat);
  forgeHood.rotation.y = Math.PI / 4;
  forgeHood.position.set(-0.48, 1.25, -0.36);
  smithy.add(forgeHood);

  const forgeChimney = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.05, 0.38), stoneMat);
  forgeChimney.position.set(-0.48, 2.02, -0.36);
  forgeChimney.castShadow = true;
  smithy.add(forgeChimney);

  // Glowing coal bed & leaping forge flame
  const coals = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.36), forgeGlowMat);
  coals.position.set(-0.48, 0.78, -0.26);
  smithy.add(coals);

  forgeFlame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.32, 6), forgeGlowMat);
  forgeFlame.position.set(-0.48, 0.96, -0.26);
  forgeFlame.userData.noOutline = true;
  smithy.add(forgeFlame);

  // Open timber posts & slanted dark-slate smithy lean-to roof
  for (const sx of [-0.92, 0.92]) {
    const fPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.25, 0.1), timberDarkMat);
    fPost.position.set(sx, 0.68, 0.66);
    fPost.castShadow = true;
    smithy.add(fPost);
  }
  const sRoof = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.14, 1.76), smithyRoofMat);
  sRoof.position.set(0, 1.38, 0.04);
  sRoof.rotation.x = 0.22;
  sRoof.castShadow = true;
  sRoof.receiveShadow = true;
  smithy.add(sRoof);

  // Anvil on oak tree stump
  const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.38, 9), timberMidMat);
  stump.position.set(0.32, 0.24, 0.12);
  stump.castShadow = true;
  smithy.add(stump);

  const anvilBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.18), ironMat);
  anvilBase.position.set(0.32, 0.48, 0.12);
  const anvilHorn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 6), ironMat);
  anvilHorn.rotation.z = -Math.PI / 2;
  anvilHorn.position.set(0.55, 0.5, 0.12);
  smithy.add(anvilBase, anvilHorn);

  // Wooden water quenching trough
  const trough = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.28, 0.28), timberDarkMat);
  trough.position.set(0.45, 0.19, -0.32);
  smithy.add(trough);
  const tWater = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.04, 0.2),
    createToonMaterial({ color: PALETTE.waterShallow, snowable: false })
  );
  tWater.position.set(0.45, 0.32, -0.32);
  smithy.add(tWater);

  group.add(smithy);
  smithy.updateMatrixWorld(true);
  smokeSources.push({
    pos: new THREE.Vector3(-0.48, 2.58, -0.36).applyMatrix4(smithy.matrixWorld),
    rate: 1.35,
    scale: 1.15,
  });

  // =========================================================================
  // 6. WINDMILL (风车磨坊) — Perched on Right Breezy Knoll
  // =========================================================================
  const windmill = new THREE.Group();
  windmill.position.set(7.85, WINDMILL_Y, -0.15);
  windmill.rotation.y = -0.45; // Angled gracefully toward front-left viewer!

  // Stone base plinth
  const wmBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.02, 1.18, 0.95, 14),
    stoneMat
  );
  wmBase.position.y = 0.475;
  wmBase.castShadow = true;
  wmBase.receiveShadow = true;
  windmill.add(wmBase);

  // Tapered whitewashed plaster tower
  const wmTower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.76, 1.02, 2.25, 14),
    createToonMaterial({ color: PALETTE.plasterCream, snowable: true, snowThreshold: 0.65 })
  );
  wmTower.position.y = 0.95 + 1.125;
  wmTower.castShadow = true;
  wmTower.receiveShadow = true;
  windmill.add(wmTower);

  // Timber collar & conical shingle cap
  const wmCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.84, 0.8, 0.22, 14),
    timberDarkMat
  );
  wmCollar.position.y = 3.24;
  windmill.add(wmCollar);

  const wmCap = new THREE.Mesh(
    new THREE.ConeGeometry(0.92, 1.15, 14),
    barnRoofMat
  );
  wmCap.position.y = 3.88;
  wmCap.castShadow = true;
  windmill.add(wmCap);

  // Mill wooden door & warm upper loft window
  const wmDoor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.78, 0.14), timberDarkMat);
  wmDoor.position.set(0, 0.42, 1.08);
  windmill.add(wmDoor);
  const wmWin = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.12), glowWindowMat);
  wmWin.position.set(0, 2.1, 0.88);
  windmill.add(wmWin);

  // Rotating 4-Sail Windmill Hub (facing +Z of windmill)
  windmillSails = new THREE.Group();
  windmillSails.position.set(0, 3.28, 0.95);

  const sailHub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.42, 10), timberDarkMat);
  sailHub.rotation.x = Math.PI / 2;
  sailHub.position.z = -0.1;
  windmillSails.add(sailHub);

  for (let i = 0; i < 4; i++) {
    const arm = new THREE.Group();
    arm.rotation.z = (i * Math.PI) / 2 + 0.35;

    // Main timber spar
    const spar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.25, 0.08), timberDarkMat);
    spar.position.y = 1.12;
    spar.castShadow = true;
    arm.add(spar);

    // Lattice frame bars + warm cream canvas sail
    const canvasPanel = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 1.65), sailCanvasMat);
    canvasPanel.position.set(0.24, 1.28, 0.02);
    canvasPanel.rotation.y = 0.14; // slight aerodynamic pitch
    canvasPanel.castShadow = true;
    canvasPanel.userData.noOutline = true;
    arm.add(canvasPanel);

    for (let r = 0; r < 5; r++) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.035, 0.04), timberMidMat);
      rung.position.set(0.24, 0.55 + r * 0.38, 0.01);
      arm.add(rung);
    }

    windmillSails.add(arm);
  }
  windmill.add(windmillSails);

  // Flour sacks stacked beside windmill door
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.19, 8, 7), sackMat);
    s.scale.set(1.1, 0.85, 0.95);
    s.position.set(-0.78 + i * 0.24, 0.16, 0.95 + (i % 2) * 0.18);
    s.castShadow = true;
    windmill.add(s);
  }
  group.add(windmill);

  // =========================================================================
  // 7. WATERWHEEL MILL (水车磨坊) — Along Western Canal Waterfall Spillway
  // =========================================================================
  const watermill = new THREE.Group();
  watermill.position.set(-8.45, 0.0, -1.65);

  // Stone lower wheel-house foundation
  const wMillBase = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.85, 2.1), stoneMat);
  wMillBase.position.y = 0.425;
  wMillBase.castShadow = true;
  wMillBase.receiveShadow = true;
  watermill.add(wMillBase);

  // Half-timbered upper millhouse
  const wMillBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.75, 1.15, 1.95),
    createToonMaterial({ color: PALETTE.plasterOchre, snowable: true, snowThreshold: 0.7 })
  );
  wMillBody.position.y = 0.85 + 0.575;
  wMillBody.castShadow = true;
  wMillBody.receiveShadow = true;
  watermill.add(wMillBody);

  // Mill roof
  const wmRoofShape = new THREE.Shape();
  wmRoofShape.moveTo(-1.15, -0.06);
  wmRoofShape.lineTo(1.15, -0.06);
  wmRoofShape.lineTo(0, 1.05);
  wmRoofShape.closePath();
  const wmRoofGeo = new THREE.ExtrudeGeometry(wmRoofShape, {
    depth: 2.35,
    bevelEnabled: false,
  });
  wmRoofGeo.translate(0, 0, -1.175);
  const wMillRoof = new THREE.Mesh(wmRoofGeo, thatchMat);
  wMillRoof.position.y = 2.0;
  wMillRoof.castShadow = true;
  wMillRoof.receiveShadow = true;
  watermill.add(wMillRoof);

  // Warm mill window
  const wMillWin = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.34, 0.08), glowWindowMat);
  wMillWin.position.set(0, 1.35, 1.0);
  watermill.add(wMillWin);

  // Rotating Wooden Paddle Waterwheel dipping right into the canal at x = -6.8 (local x = +1.35)
  waterwheel = new THREE.Group();
  waterwheel.position.set(1.38, 0.42, -0.15);

  const wheelAxle = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.95, 10), timberDarkMat);
  wheelAxle.rotation.z = Math.PI / 2;
  wheelAxle.position.x = -0.25;
  waterwheel.add(wheelAxle);

  for (const sx of [-0.22, 0.22]) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.065, 7, 16), timberDarkMat);
    rim.rotation.y = Math.PI / 2;
    rim.position.x = sx;
    rim.castShadow = true;
    waterwheel.add(rim);
  }
  const paddleCount = 10;
  for (let i = 0; i < paddleCount; i++) {
    const a = (i / paddleCount) * Math.PI * 2;
    const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.26), timberMidMat);
    paddle.position.set(0, Math.cos(a) * 0.74, Math.sin(a) * 0.74);
    paddle.rotation.x = -a;
    paddle.castShadow = true;
    waterwheel.add(paddle);

    if (i % 2 === 0) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.5, 0.07), timberDarkMat);
      spoke.rotation.x = a;
      waterwheel.add(spoke);
    }
  }
  watermill.add(waterwheel);
  group.add(watermill);

  // Subtle white water splash foam spheres around base of waterwheel
  const foamMat = createToonMaterial({
    color: 0xf4fafc,
    transparent: true,
    opacity: 0.78,
    snowable: false,
  });
  for (let i = 0; i < 6; i++) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.14, 7, 6), foamMat);
    puff.userData.noOutline = true;
    puff.userData.phase = (i / 6) * Math.PI * 2;
    puff.position.set(-6.95 + (i % 2) * 0.24, -0.1, -1.75 + (i - 2.5) * 0.16);
    group.add(puff);
    splashPuffs.push(puff);
  }

  // =========================================================================
  // 8. BARN / GRANARY & HAYSTACKS (谷仓与草垛)
  // =========================================================================
  const barn = new THREE.Group();
  barn.position.set(6.55, 0.0, 3.85);
  barn.rotation.y = -0.35;

  // Stone foundation + timber-planked barn walls
  const bBase = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.24, 1.8), stoneMat);
  bBase.position.y = 0.12;
  bBase.receiveShadow = true;
  barn.add(bBase);

  const bBody = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.45, 1.68), woodPlankMat);
  bBody.position.y = 0.24 + 0.725;
  bBody.castShadow = true;
  bBody.receiveShadow = true;
  barn.add(bBody);

  // Gambrel / Steep pitched barn roof
  const bRoofShape = new THREE.Shape();
  bRoofShape.moveTo(-1.05, -0.08);
  bRoofShape.lineTo(1.05, -0.08);
  bRoofShape.lineTo(0.62, 0.68);
  bRoofShape.lineTo(0, 1.08);
  bRoofShape.lineTo(-0.62, 0.68);
  bRoofShape.closePath();
  const bRoofGeo = new THREE.ExtrudeGeometry(bRoofShape, {
    depth: 2.45,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 1,
  });
  bRoofGeo.translate(0, 0, -1.225);
  bRoofGeo.rotateY(Math.PI / 2);
  const bRoof = new THREE.Mesh(bRoofGeo, barnRoofMat);
  bRoof.position.y = 1.66;
  bRoof.castShadow = true;
  bRoof.receiveShadow = true;
  barn.add(bRoof);

  // Double wooden barn doors with X-bracing
  for (const sx of [-0.36, 0.36]) {
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.66, 1.05, 0.08), timberDarkMat);
    door.position.set(sx, 0.76, 0.85);
    barn.add(door);
  }
  // Upper hayloft hatch & projecting hoist beam
  const loftHole = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.42, 0.08),
    createToonMaterial({ color: 0x3b2c22, snowable: false })
  );
  loftHole.position.set(0, 1.98, 0.86);
  barn.add(loftHole);
  const hoistBeam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.56), timberDarkMat);
  hoistBeam.position.set(0, 2.38, 1.05);
  barn.add(hoistBeam);

  // Conical haystack & stacked straw bales right beside the barn
  const barnStack = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.08, 10), hayMat);
  barnStack.position.set(1.55, 0.54, 0.18);
  barnStack.castShadow = true;
  barnStack.receiveShadow = true;
  barn.add(barnStack);

  for (let i = 0; i < 3; i++) {
    const bale = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.34), hayMat);
    bale.position.set(-1.38 + (i % 2) * 0.36, 0.14 + Math.floor(i / 2) * 0.28, 0.38);
    bale.rotation.y = i * 0.35;
    bale.castShadow = true;
    barn.add(bale);
  }
  group.add(barn);

  // =========================================================================
  // 9. RISING CHIMNEY SMOKE SYSTEM (炊烟上升)
  // =========================================================================
  const smokeMat = new THREE.MeshToonMaterial({
    color: 0xf4f0e8,
    transparent: true,
    opacity: 0.62,
  });
  const smokeGeo = new THREE.IcosahedronGeometry(0.16, 1);
  const smokeParticles = [];
  const puffsPerChimney = 7;

  for (const src of smokeSources) {
    for (let i = 0; i < puffsPerChimney; i++) {
      const m = new THREE.Mesh(smokeGeo, smokeMat.clone());
      m.userData.noOutline = true;
      group.add(m);
      smokeParticles.push({
        mesh: m,
        origin: src.pos,
        scaleBase: src.scale,
        age: (i / puffsPerChimney) * 4.2,
        life: 4.2,
        seed: i * 1.7 + src.pos.x,
      });
    }
  }

  return {
    group,
    glowMaterials,
    update(dt, time) {
      const wind = ENV_UNIFORMS.uWindStrength.value;

      // Rotate windmill sails smoothly
      if (windmillSails) {
        windmillSails.rotation.z -= dt * (0.68 + wind * 0.45);
      }

      // Rotate waterwheel steadily
      if (waterwheel) {
        waterwheel.rotation.x += dt * 1.35;
      }

      // Animate watermill splash foam
      for (const p of splashPuffs) {
        const ph = time * 4.2 + p.userData.phase;
        const s = 0.65 + (Math.sin(ph) * 0.5 + 0.5) * 0.65;
        p.scale.setScalar(s);
        p.position.y = -0.14 + Math.abs(Math.sin(ph)) * 0.12;
      }

      // Subtle smithy forge fire flicker
      if (forgeFlame) {
        const f = 0.85 + Math.sin(time * 11.0) * 0.18 + Math.cos(time * 17.0) * 0.08;
        forgeFlame.scale.set(1.0, f, 1.0);
      }

      // Rise & drift chimney smoke puffs
      for (const p of smokeParticles) {
        p.age += dt * (0.85 + wind * 0.18);
        if (p.age >= p.life) p.age -= p.life;
        const t = p.age / p.life;
        const driftX = t * (0.75 + wind * 0.55) + Math.sin(time * 1.3 + p.seed) * 0.12 * t;
        const driftZ = t * 0.25 + Math.cos(time * 1.1 + p.seed) * 0.1 * t;
        const riseY = t * 2.45;
        p.mesh.position.set(
          p.origin.x + driftX,
          p.origin.y + riseY,
          p.origin.z + driftZ
        );
        const s = p.scaleBase * (0.45 + t * 1.55);
        p.mesh.scale.setScalar(s);
        // Smooth fade in & fade out
        const alpha = Math.sin(t * Math.PI) * 0.58;
        p.mesh.material.opacity = alpha;
      }
    },
  };
}
