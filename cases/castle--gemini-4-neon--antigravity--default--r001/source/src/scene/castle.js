import * as THREE from 'three';
import {
  PALETTE,
  getTextures,
  createToonMaterial,
  createGlowMaterial,
  createFlagMaterial,
} from './materials.js';
import { CASTLE_Y } from './terrain.js';

export function buildCastle() {
  const textures = getTextures();
  const group = new THREE.Group();
  group.name = 'MedievalCastle';
  group.position.y = CASTLE_Y;

  // Materials
  const stoneMainMat = createToonMaterial({
    color: 0xf7f2e8,
    map: textures.castleStone,
    snowable: true,
    snowThreshold: 0.65,
  });
  const stoneAltMat = createToonMaterial({
    color: PALETTE.castleStoneAlt,
    map: textures.castleStone,
    snowable: true,
    snowThreshold: 0.65,
  });
  const trimMat = createToonMaterial({
    color: PALETTE.castleTrim,
    snowable: true,
    snowThreshold: 0.55,
  });
  const roofSlateMat = createToonMaterial({
    color: 0xffffff,
    map: textures.slateRoof,
    snowable: true,
    snowThreshold: 0.42,
  });
  const roofDeepMat = createToonMaterial({
    color: PALETTE.castleRoofDeep,
    snowable: true,
    snowThreshold: 0.42,
  });
  const timberDarkMat = createToonMaterial({
    color: PALETTE.timberDark,
    snowable: true,
    snowThreshold: 0.65,
  });
  const timberPlankMat = createToonMaterial({
    color: 0xffffff,
    map: textures.wood,
    snowable: true,
    snowThreshold: 0.65,
  });
  const ironMat = createToonMaterial({
    color: PALETTE.ironDark,
    snowable: false,
  });
  const darkRecessMat = createToonMaterial({
    color: 0x2a252a,
    snowable: false,
  });
  const goldMat = createToonMaterial({
    color: PALETTE.bannerGold,
    snowable: false,
  });
  const glowWindowMat = createGlowMaterial(PALETTE.windowGlow, 0.55);
  const fireGlowMat = createGlowMaterial(PALETTE.forgeGlow, 1.0);

  const flagCrimsonMat = createFlagMaterial(PALETTE.bannerCrimson, 'heraldic');
  const flagBlueMat = createFlagMaterial(PALETTE.bannerBlue, 'stripe');

  const glowMaterials = [glowWindowMat, fireGlowMat];
  const brazierFlames = [];

  // Helper: add recessed cross-shaped arrow slit (箭窗) on a vertical face
  function addArrowSlit(parent, x, y, z, rotY = 0, scale = 1.0) {
    const slit = new THREE.Group();
    const vBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.08 * scale, 0.46 * scale, 0.08),
      darkRecessMat
    );
    const hBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.22 * scale, 0.075 * scale, 0.08),
      darkRecessMat
    );
    hBar.position.y = 0.06 * scale;
    slit.add(vBar, hBar);
    slit.position.set(x, y, z);
    slit.rotation.y = rotY;
    parent.add(slit);
  }

  // Helper: add arched glowing lancet window
  function addArchedWindow(parent, x, y, z, rotY = 0, w = 0.34, h = 0.64) {
    const win = new THREE.Group();
    // Stone frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.14, h + 0.12, 0.1),
      trimMat
    );
    win.add(frame);
    // Glowing pane
    const pane = new THREE.Mesh(
      new THREE.BoxGeometry(w, h * 0.72, 0.12),
      glowWindowMat
    );
    pane.position.y = -h * 0.08;
    win.add(pane);
    // Arch top
    const arch = new THREE.Mesh(
      new THREE.CylinderGeometry(w / 2, w / 2, 0.12, 10),
      glowWindowMat
    );
    arch.rotation.x = Math.PI / 2;
    arch.position.y = h * 0.28;
    win.add(arch);
    // Mullion cross
    const mullionV = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, h * 0.9, 0.14),
      ironMat
    );
    const mullionH = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.04, 0.14),
      ironMat
    );
    win.add(mullionV, mullionH);

    win.position.set(x, y, z);
    win.rotation.y = rotY;
    parent.add(win);
  }

  // Helper: fluttering pennant/flag on a pole
  function createFlag(poleHeight, flagW, flagH, mat, swallowtail = true) {
    const fGroup = new THREE.Group();
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.04, poleHeight, 6),
      ironMat
    );
    pole.position.y = poleHeight / 2;
    pole.castShadow = true;
    fGroup.add(pole);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), goldMat);
    finial.position.y = poleHeight + 0.04;
    fGroup.add(finial);

    // Flag plane anchored at x = 0 extending to +X
    const segX = 10;
    const segY = 3;
    const flagGeo = new THREE.PlaneGeometry(flagW, flagH, segX, segY);
    flagGeo.translate(flagW / 2 + 0.03, 0, 0);
    if (swallowtail) {
      // Taper tail vertices gently into a pennant
      const pos = flagGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i);
        const py = pos.getY(i);
        const t = THREE.MathUtils.clamp(px / flagW, 0, 1);
        pos.setY(i, py * (1.0 - t * 0.58));
      }
      flagGeo.computeVertexNormals();
    }
    const flagMesh = new THREE.Mesh(flagGeo, mat);
    flagMesh.position.y = poleHeight - flagH * 0.58;
    flagMesh.castShadow = true;
    flagMesh.userData.noOutline = true;
    fGroup.add(flagMesh);

    return fGroup;
  }

  // Helper: cylindrical corner tower with corbel ring, battlements & conical spire
  function createCornerTower({ x, z, radius, height, spireH, flagMat }) {
    const tGroup = new THREE.Group();
    tGroup.position.set(x, 0, z);

    // Battered stone plinth
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 1.02, radius * 1.14, 0.65, 16),
      stoneAltMat
    );
    base.position.y = 0.325;
    base.castShadow = true;
    base.receiveShadow = true;
    tGroup.add(base);

    // Main cylindrical shaft
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius * 1.03, height, 16),
      stoneMainMat
    );
    shaft.position.y = 0.5 + height / 2;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    tGroup.add(shaft);

    // Mid decorative stone stringcourse ring
    const midRing = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 1.08, radius * 1.08, 0.14, 16),
      trimMat
    );
    midRing.position.y = height * 0.58;
    tGroup.add(midRing);

    // Corbeled machicolation crown
    const crownY = 0.5 + height;
    const corbel = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 1.18, radius * 1.02, 0.28, 16),
      trimMat
    );
    corbel.position.y = crownY - 0.08;
    corbel.castShadow = true;
    tGroup.add(corbel);

    const parapet = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 1.18, radius * 1.18, 0.42, 16),
      stoneMainMat
    );
    parapet.position.y = crownY + 0.22;
    parapet.castShadow = true;
    tGroup.add(parapet);

    // Individual crenellation merlons around the tower crown
    const merlonCount = 10;
    for (let i = 0; i < merlonCount; i++) {
      const a = (i / merlonCount) * Math.PI * 2;
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.28, 0.24),
        trimMat
      );
      m.position.set(
        Math.cos(a) * radius * 1.08,
        crownY + 0.52,
        Math.sin(a) * radius * 1.08
      );
      m.rotation.y = -a;
      m.castShadow = true;
      tGroup.add(m);
    }

    // Conical slate spire (角楼尖顶)
    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(radius * 1.22, spireH, 16),
      roofSlateMat
    );
    spire.position.y = crownY + 0.52 + spireH / 2;
    spire.castShadow = true;
    spire.receiveShadow = true;
    tGroup.add(spire);

    // Small spire dormer window facing front
    const dormer = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.34, 0.34),
      trimMat
    );
    dormer.position.set(0, crownY + 0.92, radius * 0.78);
    tGroup.add(dormer);
    const dormerCap = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 0.28, 4),
      roofDeepMat
    );
    dormerCap.rotation.y = Math.PI / 4;
    dormerCap.position.set(0, crownY + 1.22, radius * 0.78);
    tGroup.add(dormerCap);

    // Arrow slits around outer faces of tower
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      addArrowSlit(
        tGroup,
        Math.sin(a) * (radius + 0.01),
        height * 0.72,
        Math.cos(a) * (radius + 0.01),
        a,
        0.92
      );
    }

    // Fluttering pennant atop spire
    const flag = createFlag(1.05, 0.92, 0.36, flagMat, true);
    flag.position.y = crownY + 0.52 + spireH - 0.08;
    flag.rotation.y = -0.35;
    tGroup.add(flag);

    group.add(tGroup);
    return tGroup;
  }

  // Helper: curtain wall segment with parapet cornice, merlons (雉堞), wall-walk & arrow slits
  function createCurtainWall({ x1, z1, x2, z2, height = 2.15, thickness = 0.58 }) {
    const wGroup = new THREE.Group();
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    const angle = Math.atan2(dx, dz);

    wGroup.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
    wGroup.rotation.y = angle;

    // Main wall body (oriented along Z from -len/2 to +len/2)
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, len),
      stoneMainMat
    );
    wall.position.y = height / 2;
    wall.castShadow = true;
    wall.receiveShadow = true;
    wGroup.add(wall);

    // Top cornice band
    const cornice = new THREE.Mesh(
      new THREE.BoxGeometry(thickness + 0.14, 0.16, len + 0.04),
      trimMat
    );
    cornice.position.y = height + 0.05;
    cornice.castShadow = true;
    wGroup.add(cornice);

    // Outer parapet wall
    const parapet = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.3, len),
      stoneMainMat
    );
    parapet.position.set(thickness / 2 - 0.05, height + 0.24, 0);
    parapet.castShadow = true;
    wGroup.add(parapet);

    // Timber wall-walk deck inside
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.08, len - 0.1),
      timberDarkMat
    );
    deck.position.set(-thickness / 2 - 0.12, height - 0.12, 0);
    wGroup.add(deck);

    // Crenellations / Merlons (雉堞) along both outer and subtle inner edges
    const merlonSpacing = 0.62;
    const count = Math.max(2, Math.floor((len - 0.3) / merlonSpacing));
    const startZ = -((count - 1) * merlonSpacing) / 2;
    for (let i = 0; i < count; i++) {
      const mz = startZ + i * merlonSpacing;
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.34, 0.34),
        trimMat
      );
      m.position.set(thickness / 2 - 0.04, height + 0.5, mz);
      m.castShadow = true;
      wGroup.add(m);
    }

    // Arrow slits on outer (+X) face
    const slitCount = Math.max(1, Math.floor(len / 1.55));
    for (let i = 0; i < slitCount; i++) {
      const sz = -len / 2 + ((i + 0.5) / slitCount) * len;
      addArrowSlit(wGroup, thickness / 2 + 0.01, height * 0.62, sz, Math.PI / 2, 0.9);
    }

    group.add(wGroup);
  }

  // Helper: iron fire brazier
  function addBrazier(x, y, z) {
    const b = new THREE.Group();
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.18, 0.38, 6),
      ironMat
    );
    stand.position.y = 0.19;
    b.add(stand);

    const bowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.13, 0.16, 6),
      ironMat
    );
    bowl.position.y = 0.42;
    b.add(bowl);

    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.13, 0.28, 6),
      fireGlowMat
    );
    flame.position.y = 0.58;
    flame.userData.noOutline = true;
    b.add(flame);
    brazierFlames.push(flame);

    b.position.set(x, y, z);
    group.add(b);
  }

  // =========================================================================
  // 1. FOUR CORNER TOWERS WITH CONICAL SPIRES (角楼尖顶)
  // =========================================================================
  // Front corners (slightly shorter so inner keep towers proudly above!)
  createCornerTower({ x: -5.0, z: -5.45, radius: 0.82, height: 2.55, spireH: 2.05, flagMat: flagBlueMat });
  createCornerTower({ x: 5.0, z: -5.45, radius: 0.82, height: 2.55, spireH: 2.05, flagMat: flagBlueMat });
  // Rear corners (taller framing guardian towers)
  createCornerTower({ x: -5.0, z: -9.85, radius: 0.9, height: 3.35, spireH: 2.35, flagMat: flagCrimsonMat });
  createCornerTower({ x: 5.0, z: -9.85, radius: 0.9, height: 3.35, spireH: 2.35, flagMat: flagCrimsonMat });

  // =========================================================================
  // 2. CURTAIN WALLS WITH BATTLEMENTS & MERLONS (城墙雉堞)
  // =========================================================================
  // Front-left wall (from FL tower to gatehouse)
  createCurtainWall({ x1: -1.35, z1: -5.45, x2: -4.45, z2: -5.45, height: 2.05 });
  // Front-right wall (from FR tower to gatehouse)
  createCurtainWall({ x1: 4.45, z1: -5.45, x2: 1.35, z2: -5.45, height: 2.05 });
  // Left wall (outer face -X, so pass z1 < z2? Let's verify outer +X direction)
  // With angle = atan2(dx, dz): if dx=0, dz=+1 => angle=0 => +X is world +X.
  // So for Left wall (outer is world -X), we want angle=PI => dz < 0 => z1=-5.9 to z2=-9.3.
  createCurtainWall({ x1: -5.0, z1: -5.9, x2: -5.0, z2: -9.3, height: 2.2 });
  // Right wall (outer is world +X => dz > 0)
  createCurtainWall({ x1: 5.0, z1: -9.3, x2: 5.0, z2: -5.9, height: 2.2 });
  // Rear wall (outer is world -Z => dx > 0 gives angle=+PI/2 => local +X maps to world -Z!)
  createCurtainWall({ x1: -4.4, z1: -9.85, x2: 4.4, z2: -9.85, height: 2.35 });

  // =========================================================================
  // 3. GATEHOUSE, PORTCULLIS & CHAINED DRAWBRIDGE (城门与吊桥)
  // =========================================================================
  const gateGroup = new THREE.Group();
  gateGroup.position.set(0, 0, -5.42);
  group.add(gateGroup);

  // Twin flanking gatehouse turrets
  for (const side of [-1, 1]) {
    const turret = new THREE.Mesh(
      new THREE.CylinderGeometry(0.66, 0.72, 3.05, 12),
      stoneMainMat
    );
    turret.position.set(side * 1.15, 1.525, 0.14);
    turret.castShadow = true;
    turret.receiveShadow = true;
    gateGroup.add(turret);

    const tCrown = new THREE.Mesh(
      new THREE.CylinderGeometry(0.76, 0.68, 0.24, 12),
      trimMat
    );
    tCrown.position.set(side * 1.15, 3.05, 0.14);
    gateGroup.add(tCrown);

    const tCap = new THREE.Mesh(
      new THREE.ConeGeometry(0.78, 1.32, 12),
      roofSlateMat
    );
    tCap.position.set(side * 1.15, 3.82, 0.14);
    tCap.castShadow = true;
    gateGroup.add(tCap);

    // Arrow slits on front of gatehouse turrets
    addArrowSlit(gateGroup, side * 1.15, 2.15, 0.82, 0, 0.9);
    addArrowSlit(gateGroup, side * 1.15, 1.15, 0.82, 0, 0.85);

    // Decorative hanging vertical heraldic banner on gatehouse turrets
    const wallBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.95),
      side < 0 ? flagCrimsonMat : flagBlueMat
    );
    wallBanner.position.set(side * 1.15, 1.72, 0.86);
    wallBanner.userData.noOutline = true;
    gateGroup.add(wallBanner);
  }

  // Central gatehouse bridge block above the arched portal
  const gateBridge = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 1.38, 1.18),
    stoneMainMat
  );
  gateBridge.position.set(0, 2.38, 0);
  gateBridge.castShadow = true;
  gateBridge.receiveShadow = true;
  gateGroup.add(gateBridge);

  // Side gate piers framing the archway
  for (const side of [-1, 1]) {
    const pier = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1.78, 1.14),
      stoneAltMat
    );
    pier.position.set(side * 0.82, 0.89, 0);
    pier.castShadow = true;
    gateGroup.add(pier);
  }

  // Gatehouse crenellated parapet top
  for (let i = -2; i <= 2; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.34, 0.24), trimMat);
    m.position.set(i * 0.48, 3.22, 0.48);
    m.castShadow = true;
    gateGroup.add(m);
  }

  // Recessed dark arched gate interior
  const gateVoid = new THREE.Mesh(
    new THREE.BoxGeometry(1.16, 1.56, 0.72),
    darkRecessMat
  );
  gateVoid.position.set(0, 0.78, -0.08);
  gateGroup.add(gateVoid);

  // Stone voussoir arch ring framing the entrance
  const archRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.13, 8, 14, Math.PI),
    trimMat
  );
  archRing.position.set(0, 1.25, 0.56);
  gateGroup.add(archRing);

  // Iron Portcullis grille (吊闸) raised halfway
  const portcullis = new THREE.Group();
  for (let i = -2; i <= 2; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.92, 0.045), ironMat);
    bar.position.set(i * 0.22, 1.32, 0.44);
    portcullis.add(bar);
  }
  for (let j = 0; j < 3; j++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.045, 0.045), ironMat);
    bar.position.set(0, 0.96 + j * 0.28, 0.44);
    portcullis.add(bar);
  }
  gateGroup.add(portcullis);

  // Heraldic Coat-of-Arms Shield centered above the archway
  const shield = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.16, 0.08, 6),
    createToonMaterial({ color: PALETTE.bannerCrimson, snowable: false })
  );
  shield.rotation.x = Math.PI / 2;
  shield.position.set(0, 2.42, 0.62);
  gateGroup.add(shield);
  const shieldBoss = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), goldMat);
  shieldBoss.position.set(0, 2.42, 0.66);
  gateGroup.add(shieldBoss);

  // Heavy Timber Drawbridge (吊桥) spanning from gatehouse (z = -5.0) to bridgehead (z = -3.72)
  // In gateGroup local coords (z = -5.42): extends from z = +0.32 to z = +1.72
  const drawbridge = new THREE.Group();
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(1.38, 0.14, 1.56),
    timberPlankMat
  );
  deck.position.set(0, 0.07, 1.04);
  deck.castShadow = true;
  deck.receiveShadow = true;
  drawbridge.add(deck);

  // Transverse iron-strapped timber beams on drawbridge
  for (const bz of [0.46, 0.86, 1.26, 1.62]) {
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(1.46, 0.06, 0.1),
      timberDarkMat
    );
    beam.position.set(0, 0.15, bz);
    drawbridge.add(beam);
  }

  // Twin diagonal iron drawbridge chains connecting bridge end up to gatehouse winch ports
  for (const side of [-1, 1]) {
    const pStart = new THREE.Vector3(side * 0.68, 0.14, 1.56);
    const pEnd = new THREE.Vector3(side * 0.68, 2.15, 0.58);
    const diff = new THREE.Vector3().subVectors(pEnd, pStart);
    const chainLen = diff.length();
    const chain = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, chainLen, 6),
      ironMat
    );
    chain.position.copy(pStart).addScaledVector(diff, 0.5);
    chain.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), diff.clone().normalize());
    chain.castShadow = true;
    drawbridge.add(chain);

    // Winch ring on wall
    const winch = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 6, 10), ironMat);
    winch.position.copy(pEnd);
    drawbridge.add(winch);
  }
  gateGroup.add(drawbridge);

  // Twin flaming braziers flanking the bridgehead approach
  addBrazier(-0.92, 0.0, -3.62);
  addBrazier(0.92, 0.0, -3.62);

  // =========================================================================
  // 4. GRAND MAIN KEEP / DONJON (主堡) & GREAT HALL WING
  // =========================================================================
  const keepGroup = new THREE.Group();
  keepGroup.position.set(0.0, 0, -8.15);
  group.add(keepGroup);

  // Stepped stone foundation plinth
  const keepBase = new THREE.Mesh(
    new THREE.BoxGeometry(4.45, 0.55, 2.95),
    stoneAltMat
  );
  keepBase.position.y = 0.275;
  keepBase.castShadow = true;
  keepBase.receiveShadow = true;
  keepGroup.add(keepBase);

  // Main Donjon stone body
  const keepW = 4.1;
  const keepH = 3.95;
  const keepD = 2.6;
  const keepBody = new THREE.Mesh(
    new THREE.BoxGeometry(keepW, keepH, keepD),
    stoneMainMat
  );
  keepBody.position.y = 0.45 + keepH / 2;
  keepBody.castShadow = true;
  keepBody.receiveShadow = true;
  keepGroup.add(keepBody);

  // Corner buttress pilasters on the Keep
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const pilaster = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, keepH + 0.15, 0.42),
        trimMat
      );
      pilaster.position.set(sx * (keepW / 2 - 0.08), 0.45 + keepH / 2, sz * (keepD / 2 - 0.08));
      pilaster.castShadow = true;
      keepGroup.add(pilaster);
    }
  }

  // Horizontal stringcourse molding belt
  const belt = new THREE.Mesh(
    new THREE.BoxGeometry(keepW + 0.2, 0.16, keepD + 0.2),
    trimMat
  );
  belt.position.y = 2.55;
  keepGroup.add(belt);

  // Corbeled upper parapet cornice around keep top
  const keepTopY = 0.45 + keepH;
  const keepCornice = new THREE.Mesh(
    new THREE.BoxGeometry(keepW + 0.34, 0.24, keepD + 0.34),
    trimMat
  );
  keepCornice.position.y = keepTopY + 0.08;
  keepCornice.castShadow = true;
  keepGroup.add(keepCornice);

  // Keep battlements (merlons along front & back of keep parapet)
  for (let i = -3; i <= 3; i++) {
    for (const sz of [-1, 1]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.32, 0.22), trimMat);
      m.position.set(i * 0.62, keepTopY + 0.34, sz * (keepD / 2 + 0.05));
      m.castShadow = true;
      keepGroup.add(m);
    }
  }

  // Steep pitched slate manor roof atop the Keep (with stone gable ends)
  const roofH = 1.85;
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-keepD / 2 - 0.14, 0);
  gableShape.lineTo(keepD / 2 + 0.14, 0);
  gableShape.lineTo(0, roofH);
  gableShape.closePath();

  const roofGeo = new THREE.ExtrudeGeometry(gableShape, {
    depth: keepW + 0.12,
    bevelEnabled: false,
  });
  roofGeo.translate(0, 0, -(keepW + 0.12) / 2);
  roofGeo.rotateY(Math.PI / 2);
  const keepRoof = new THREE.Mesh(roofGeo, roofSlateMat);
  keepRoof.position.y = keepTopY + 0.18;
  keepRoof.castShadow = true;
  keepRoof.receiveShadow = true;
  keepGroup.add(keepRoof);

  // Decorative roof ridge crest
  const ridge = new THREE.Mesh(
    new THREE.BoxGeometry(keepW + 0.24, 0.14, 0.16),
    trimMat
  );
  ridge.position.y = keepTopY + 0.18 + roofH;
  keepGroup.add(ridge);

  // Twin small roof dormers facing front
  for (const dx of [-1.05, 1.05]) {
    const dorm = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.56, 0.58), trimMat);
    dorm.position.set(dx, keepTopY + 0.72, keepD * 0.32);
    keepGroup.add(dorm);
    const dormRoof = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.42, 4), roofDeepMat);
    dormRoof.rotation.y = Math.PI / 4;
    dormRoof.position.set(dx, keepTopY + 1.18, keepD * 0.32);
    keepGroup.add(dormRoof);
    const dormPane = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.08), glowWindowMat);
    dormPane.position.set(dx, keepTopY + 0.72, keepD * 0.32 + 0.28);
    keepGroup.add(dormPane);
  }

  // Arched Keep Entrance Door & Steps facing courtyard (+Z)
  const keepDoor = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 1.18, 0.14),
    timberDarkMat
  );
  keepDoor.position.set(0, 0.92, keepD / 2 + 0.02);
  keepGroup.add(keepDoor);
  const keepDoorArch = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.09, 6, 12, Math.PI),
    trimMat
  );
  keepDoorArch.position.set(0, 1.38, keepD / 2 + 0.06);
  keepGroup.add(keepDoorArch);

  // Keep front glowing arched windows & arrow slits
  addArchedWindow(keepGroup, -1.18, 3.25, keepD / 2 + 0.01, 0, 0.36, 0.7);
  addArchedWindow(keepGroup, 0.0, 3.32, keepD / 2 + 0.01, 0, 0.42, 0.8);
  addArchedWindow(keepGroup, 1.18, 3.25, keepD / 2 + 0.01, 0, 0.36, 0.7);
  addArrowSlit(keepGroup, -1.2, 1.65, keepD / 2 + 0.02, 0, 1.0);
  addArrowSlit(keepGroup, 1.2, 1.65, keepD / 2 + 0.02, 0, 1.0);

  // Rear Keep windows
  addArchedWindow(keepGroup, -1.0, 3.25, -keepD / 2 - 0.01, Math.PI, 0.34, 0.65);
  addArchedWindow(keepGroup, 1.0, 3.25, -keepD / 2 - 0.01, Math.PI, 0.34, 0.65);

  // Tall Heroic Lord's Spire Turret rising from Keep's rear-right corner (highest peak!)
  const heroTurret = new THREE.Group();
  heroTurret.position.set(1.85, 0, -0.82);
  const hShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.8, 5.45, 16),
    stoneMainMat
  );
  hShaft.position.y = 2.725;
  hShaft.castShadow = true;
  hShaft.receiveShadow = true;
  heroTurret.add(hShaft);

  const hCrown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.88, 0.74, 0.3, 16),
    trimMat
  );
  hCrown.position.y = 5.45;
  heroTurret.add(hCrown);

  const hSpire = new THREE.Mesh(
    new THREE.ConeGeometry(0.92, 2.35, 16),
    roofSlateMat
  );
  hSpire.position.y = 6.72;
  hSpire.castShadow = true;
  heroTurret.add(hSpire);

  addArchedWindow(heroTurret, 0, 4.45, 0.73, 0, 0.28, 0.54);
  addArrowSlit(heroTurret, 0.73, 3.1, 0, Math.PI / 2, 0.9);

  // Grand Sovereign Banner atop the highest Keep Spire!
  const sovereignFlag = createFlag(1.45, 1.38, 0.56, flagCrimsonMat, false);
  sovereignFlag.position.y = 7.8;
  sovereignFlag.rotation.y = -0.25;
  heroTurret.add(sovereignFlag);
  keepGroup.add(heroTurret);

  // Secondary smaller stair turret on Keep's front-left corner
  const stairTurret = new THREE.Group();
  stairTurret.position.set(-1.92, 0, 0.9);
  const stShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.56, 0.62, 4.55, 14),
    stoneAltMat
  );
  stShaft.position.y = 2.275;
  stShaft.castShadow = true;
  stairTurret.add(stShaft);
  const stSpire = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1.65, 14),
    roofDeepMat
  );
  stSpire.position.y = 5.32;
  stSpire.castShadow = true;
  stairTurret.add(stSpire);
  const stFlag = createFlag(0.95, 0.8, 0.32, flagBlueMat, true);
  stFlag.position.y = 6.08;
  stFlag.rotation.y = -0.35;
  stairTurret.add(stFlag);
  keepGroup.add(stairTurret);

  // Keep Stone Chimney on left flank
  const keepChimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 2.2, 0.46),
    trimMat
  );
  keepChimney.position.set(-1.45, keepTopY + 1.05, -0.65);
  keepChimney.castShadow = true;
  keepGroup.add(keepChimney);

  // =========================================================================
  // 5. INNER COURTYARD GARRISON DETAILS (Barracks, Supplies, Braziers)
  // =========================================================================
  // Garrison timber barracks / armory shed tucked along inner right curtain wall
  const barracks = new THREE.Group();
  barracks.position.set(3.55, 0, -7.2);
  const bWall = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 1.25, 2.35),
    createToonMaterial({ color: PALETTE.plasterCream, snowable: true })
  );
  bWall.position.y = 0.625;
  bWall.castShadow = true;
  bWall.receiveShadow = true;
  barracks.add(bWall);

  // Slanted timber shed roof
  const bRoof = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.14, 2.55),
    createToonMaterial({ color: PALETTE.terracotta, snowable: true, snowThreshold: 0.45 })
  );
  bRoof.position.set(-0.05, 1.42, 0);
  bRoof.rotation.z = 0.26;
  bRoof.castShadow = true;
  barracks.add(bRoof);

  // Timber frame posts on barracks
  for (const bz of [-1.05, 0, 1.05]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.26, 0.12), timberDarkMat);
    post.position.set(-0.75, 0.63, bz);
    barracks.add(post);
  }
  addArchedWindow(barracks, -0.78, 0.72, 0.45, -Math.PI / 2, 0.24, 0.4);
  group.add(barracks);

  // Supply barrels & crates tucked in courtyard left corner
  const barrelMat = createToonMaterial({ color: PALETTE.timberMid, snowable: true });
  const barrelPositions = [
    [-3.45, -6.4], [-3.82, -6.58], [-3.55, -6.82],
    [2.45, -6.25], [2.78, -6.38],
  ];
  for (const [bx, bz] of barrelPositions) {
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.15, 0.36, 10),
      barrelMat
    );
    barrel.position.set(bx, 0.18, bz);
    barrel.castShadow = true;
    group.add(barrel);
  }

  // Courtyard braziers flanking keep entrance
  addBrazier(-0.85, 0.0, -6.55);
  addBrazier(0.85, 0.0, -6.55);

  return {
    group,
    glowMaterials,
    update(time) {
      // Gentle firelight flicker on castle braziers
      for (let i = 0; i < brazierFlames.length; i++) {
        const f = brazierFlames[i];
        const flicker = 0.88 + Math.sin(time * 9.5 + i * 2.1) * 0.14 + Math.cos(time * 15.0 + i) * 0.06;
        f.scale.set(1.0, flicker, 1.0);
      }
    },
  };
}
