import * as THREE from 'three';

export class Castle {
  constructor(scene, materials) {
    this.scene = scene;
    this.mat = materials;
    this.group = new THREE.Group();
    this.flags = [];

    this.castleBaseY = 5.6;
    this.castleCenterZ = -15;

    this.buildCurtainWalls();
    this.buildCornerTowers();
    this.buildGatehouseAndDrawbridge();
    this.buildMainKeep();
    this.buildInnerCourtyard();

    this.scene.add(this.group);
  }

  buildCurtainWalls() {
    const wallH = 4.2;
    const wallThick = 1.0;
    const halfW = 12.0;
    const halfD = 7.0;
    const y = this.castleBaseY + wallH / 2;
    const cz = this.castleCenterZ;

    // Left wall
    this.createWallSegment(-halfW, y, cz, wallThick, wallH, halfD * 2, true);
    // Right wall
    this.createWallSegment(halfW, y, cz, wallThick, wallH, halfD * 2, true);
    // Back wall
    this.createWallSegment(0, y, cz - halfD, halfW * 2, wallH, wallThick, false);
    // Front wall Left section (to gatehouse)
    this.createWallSegment(-halfW / 2 - 2, y, cz + halfD, halfW - 4, wallH, wallThick, false);
    // Front wall Right section (to gatehouse)
    this.createWallSegment(halfW / 2 + 2, y, cz + halfD, halfW - 4, wallH, wallThick, false);
  }

  createWallSegment(x, y, z, w, h, d, isAlongZ) {
    // Wall Body
    const wallGeo = new THREE.BoxGeometry(w, h, d);
    const wall = new THREE.Mesh(wallGeo, this.mat.castleStone);
    wall.position.set(x, y, z);
    wall.castShadow = true;
    wall.receiveShadow = true;
    this.group.add(wall);

    // Wall-walk parapet ledge
    const walkwayGeo = new THREE.BoxGeometry(
      isAlongZ ? w + 0.3 : w,
      0.3,
      isAlongZ ? d : d + 0.3
    );
    const walkway = new THREE.Mesh(walkwayGeo, this.mat.castleDarkStone);
    walkway.position.set(x, y + h / 2 + 0.15, z);
    walkway.castShadow = true;
    this.group.add(walkway);

    // Crenellations (merlons) along outer edge
    const merlonW = 0.9;
    const merlonH = 0.8;
    const merlonD = 0.35;
    const gap = 0.7;
    const length = isAlongZ ? d : w;
    const count = Math.floor(length / (merlonW + gap));

    for (let i = 0; i < count; i++) {
      const offset = (i - count / 2 + 0.5) * (merlonW + gap);
      const merlonGeo = new THREE.BoxGeometry(
        isAlongZ ? merlonD : merlonW,
        merlonH,
        isAlongZ ? merlonW : merlonD
      );
      const merlon = new THREE.Mesh(merlonGeo, this.mat.castleStone);
      
      let mx = isAlongZ ? (x < 0 ? x - w / 2 - merlonD / 2 + 0.2 : x + w / 2 + merlonD / 2 - 0.2) : x + offset;
      let mz = isAlongZ ? z + offset : (z < this.castleCenterZ ? z - d / 2 - merlonD / 2 + 0.2 : z + d / 2 + merlonD / 2 - 0.2);
      let my = y + h / 2 + merlonH / 2 + 0.3;

      merlon.position.set(mx, my, mz);
      merlon.castShadow = true;
      this.group.add(merlon);

      // Arrow slits in some merlons
      if (i % 2 === 0) {
        const slitGeo = new THREE.BoxGeometry(
          isAlongZ ? 0.05 : 0.15,
          0.45,
          isAlongZ ? 0.15 : 0.05
        );
        const slit = new THREE.Mesh(slitGeo, this.mat.darkWindow);
        slit.position.set(
          isAlongZ ? mx + (x < 0 ? -merlonD / 2 : merlonD / 2) : mx,
          my,
          isAlongZ ? mz : mz + (z < this.castleCenterZ ? -merlonD / 2 : merlonD / 2)
        );
        this.group.add(slit);
      }
    }
  }

  buildCornerTowers() {
    const halfW = 12.0;
    const halfD = 7.0;
    const cz = this.castleCenterZ;

    const towerCoords = [
      { x: -halfW, z: cz + halfD, name: 'SW' },
      { x: halfW, z: cz + halfD, name: 'SE' },
      { x: -halfW, z: cz - halfD, name: 'NW' },
      { x: halfW, z: cz - halfD, name: 'NE' },
    ];

    towerCoords.forEach(pos => {
      this.createRoundCornerTower(pos.x, this.castleBaseY, pos.z, 2.2, 7.5);
    });
  }

  createRoundCornerTower(x, baseY, z, radius, height) {
    const group = new THREE.Group();
    group.position.set(x, baseY, z);

    // 1. Tower Base Flaring Plinth
    const plinthGeo = new THREE.CylinderGeometry(radius, radius + 0.5, 1.2, 12);
    const plinth = new THREE.Mesh(plinthGeo, this.mat.castleDarkStone);
    plinth.position.y = 0.6;
    plinth.castShadow = true;
    group.add(plinth);

    // 2. Tower Main Shaft
    const shaftGeo = new THREE.CylinderGeometry(radius, radius, height, 12);
    const shaft = new THREE.Mesh(shaftGeo, this.mat.castleStone);
    shaft.position.y = height / 2;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    group.add(shaft);

    // Arrow slits along tower height
    for (let lvl = 1; lvl <= 3; lvl++) {
      const slitY = lvl * (height / 3.8);
      for (let a = 0; a < 4; a++) {
        const angle = (a * Math.PI) / 2 + Math.PI / 4;
        const slitGeo = new THREE.BoxGeometry(0.18, 0.7, 0.4);
        const slit = new THREE.Mesh(slitGeo, this.mat.darkWindow);
        slit.position.set(Math.cos(angle) * (radius - 0.05), slitY, Math.sin(angle) * (radius - 0.05));
        slit.rotation.y = -angle + Math.PI / 2;
        group.add(slit);
      }
    }

    // 3. Corbeling / Machicolation Collar at Tower Top
    const corbelGeo = new THREE.CylinderGeometry(radius + 0.5, radius - 0.1, 0.8, 12);
    const corbel = new THREE.Mesh(corbelGeo, this.mat.castleDarkStone);
    corbel.position.y = height + 0.4;
    corbel.castShadow = true;
    group.add(corbel);

    // 4. Parapet Crenels
    const merlonCount = 8;
    for (let m = 0; m < merlonCount; m++) {
      if (m % 2 === 0) {
        const angle = (m / merlonCount) * Math.PI * 2;
        const mGeo = new THREE.BoxGeometry(0.6, 0.7, 0.35);
        const merlon = new THREE.Mesh(mGeo, this.mat.castleStone);
        merlon.position.set(
          Math.cos(angle) * (radius + 0.25),
          height + 1.0,
          Math.sin(angle) * (radius + 0.25)
        );
        merlon.rotation.y = -angle;
        merlon.castShadow = true;
        group.add(merlon);
      }
    }

    // 5. Conical Slate Spire Roof
    const roofGeo = new THREE.ConeGeometry(radius + 0.5, 3.8, 12);
    const roof = new THREE.Mesh(roofGeo, this.mat.slateRoof);
    roof.position.y = height + 0.8 + 1.9;
    roof.castShadow = true;
    group.add(roof);

    // 6. Finial and Fluttering Pennant Flag
    const finialGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.6, 6);
    const finial = new THREE.Mesh(finialGeo, this.mat.ironMetal);
    finial.position.y = height + 0.8 + 3.8 + 0.7;
    group.add(finial);

    const flagMesh = this.createFlag(0.9, 0.5, this.mat.redCloth);
    flagMesh.position.set(0.45, height + 0.8 + 3.8 + 1.0, 0);
    group.add(flagMesh);
    this.flags.push(flagMesh);

    this.group.add(group);
  }

  buildGatehouseAndDrawbridge() {
    const gz = this.castleCenterZ + 7.0;
    const baseY = this.castleBaseY;
    const gateW = 5.2;
    const gateH = 5.5;

    // Twin Barbican Towers flanking the gate
    [-gateW / 2, gateW / 2].forEach(tx => {
      const towerGeo = new THREE.CylinderGeometry(1.6, 1.8, gateH + 0.5, 12);
      const tower = new THREE.Mesh(towerGeo, this.mat.castleStone);
      tower.position.set(tx, baseY + (gateH + 0.5) / 2, gz);
      tower.castShadow = true;
      tower.receiveShadow = true;
      this.group.add(tower);

      // Conical roofs
      const roofGeo = new THREE.ConeGeometry(1.9, 2.5, 12);
      const roof = new THREE.Mesh(roofGeo, this.mat.slateRoof);
      roof.position.set(tx, baseY + gateH + 0.5 + 1.25, gz);
      roof.castShadow = true;
      this.group.add(roof);

      // Pennants
      const flag = this.createFlag(0.7, 0.4, this.mat.blueCloth);
      flag.position.set(tx + 0.35, baseY + gateH + 0.5 + 2.7, gz);
      this.group.add(flag);
      this.flags.push(flag);
    });

    // Central Archway Block
    const archBlockGeo = new THREE.BoxGeometry(gateW, gateH - 0.2, 2.4);
    const archBlock = new THREE.Mesh(archBlockGeo, this.mat.castleStone);
    archBlock.position.set(0, baseY + (gateH - 0.2) / 2, gz);
    archBlock.castShadow = true;
    archBlock.receiveShadow = true;
    this.group.add(archBlock);

    // Arched Portal Opening (Dark Interior)
    const portalGeo = new THREE.BoxGeometry(2.6, 3.4, 2.5);
    const portal = new THREE.Mesh(portalGeo, this.mat.darkWindow);
    portal.position.set(0, baseY + 1.7, gz + 0.05);
    this.group.add(portal);

    // Portcullis Grate (Iron bars)
    const portcullisGroup = new THREE.Group();
    for (let bx = -1.0; bx <= 1.0; bx += 0.4) {
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.8, 4);
      const bar = new THREE.Mesh(barGeo, this.mat.ironMetal);
      bar.position.set(bx, 1.4, 0);
      portcullisGroup.add(bar);
    }
    for (let by = 0.5; by <= 2.5; by += 0.6) {
      const crossGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.2, 4);
      crossGeo.rotateZ(Math.PI / 2);
      const cross = new THREE.Mesh(crossGeo, this.mat.ironMetal);
      cross.position.set(0, by, 0);
      portcullisGroup.add(cross);
    }
    portcullisGroup.position.set(0, baseY, gz + 0.8);
    this.group.add(portcullisGroup);

    // Crenellations over Gatehouse
    for (let c = -1.8; c <= 1.8; c += 0.9) {
      const merlonGeo = new THREE.BoxGeometry(0.6, 0.7, 0.4);
      const merlon = new THREE.Mesh(merlonGeo, this.mat.castleStone);
      merlon.position.set(c, baseY + gateH + 0.35, gz + 1.1);
      merlon.castShadow = true;
      this.group.add(merlon);
    }

    // Heavy Timber Drawbridge spanning the moat
    const bridgeL = 4.8;
    const bridgeW = 3.2;
    const bridgeGeo = new THREE.BoxGeometry(bridgeW, 0.3, bridgeL);
    const drawbridge = new THREE.Mesh(bridgeGeo, this.mat.timberWood);
    drawbridge.position.set(0, baseY - 0.2, gz + bridgeL / 2 + 1.1);
    drawbridge.castShadow = true;
    drawbridge.receiveShadow = true;
    this.group.add(drawbridge);

    // Bridge wooden cross beams
    for (let pz = -bridgeL / 2 + 0.4; pz <= bridgeL / 2; pz += 0.8) {
      const plankGeo = new THREE.BoxGeometry(bridgeW + 0.1, 0.38, 0.3);
      const plank = new THREE.Mesh(plankGeo, this.mat.lightPlank);
      plank.position.set(0, baseY - 0.15, gz + bridgeL / 2 + 1.1 + pz);
      this.group.add(plank);
    }

    // Iron Drawbridge Chains
    [-bridgeW / 2 + 0.3, bridgeW / 2 - 0.3].forEach(cx => {
      const chainStart = new THREE.Vector3(cx, baseY + 3.8, gz + 1.2);
      const chainEnd = new THREE.Vector3(cx, baseY - 0.05, gz + bridgeL + 0.8);
      const chainCurve = new THREE.LineCurve3(chainStart, chainEnd);
      const chainGeo = new THREE.TubeGeometry(chainCurve, 8, 0.04, 4, false);
      const chain = new THREE.Mesh(chainGeo, this.mat.ironMetal);
      this.group.add(chain);
    });
  }

  buildMainKeep() {
    const keepX = 0;
    const keepZ = this.castleCenterZ - 1.5;
    const baseY = this.castleBaseY;

    const group = new THREE.Group();
    group.position.set(keepX, baseY, keepZ);

    // 1. Lower Stone Bastion (Tower Base)
    const baseW = 9.0;
    const baseD = 7.5;
    const baseH = 6.0;
    const lowerKeepGeo = new THREE.BoxGeometry(baseW, baseH, baseD);
    const lowerKeep = new THREE.Mesh(lowerKeepGeo, this.mat.castleStone);
    lowerKeep.position.y = baseH / 2;
    lowerKeep.castShadow = true;
    lowerKeep.receiveShadow = true;
    group.add(lowerKeep);

    // Stone corner buttresses for massive defensive fortification
    [
      { x: -baseW / 2 - 0.3, z: -baseD / 2 - 0.3 },
      { x: baseW / 2 + 0.3, z: -baseD / 2 - 0.3 },
      { x: -baseW / 2 - 0.3, z: baseD / 2 + 0.3 },
      { x: baseW / 2 + 0.3, z: baseD / 2 + 0.3 },
    ].forEach(bPos => {
      const buttGeo = new THREE.BoxGeometry(1.2, baseH + 0.5, 1.2);
      const butt = new THREE.Mesh(buttGeo, this.mat.castleDarkStone);
      butt.position.set(bPos.x, (baseH + 0.5) / 2, bPos.z);
      butt.castShadow = true;
      group.add(butt);
    });

    // 2. Middle Level Wooden Hoarding / Overhang Balcony (木制防御外廊)
    const hoardW = baseW + 1.2;
    const hoardD = baseD + 1.2;
    const hoardH = 2.6;
    const hoardGeo = new THREE.BoxGeometry(hoardW, hoardH, hoardD);
    const hoard = new THREE.Mesh(hoardGeo, this.mat.timberWood);
    hoard.position.y = baseH + hoardH / 2;
    hoard.castShadow = true;
    group.add(hoard);

    // Decorative supporting corbel brackets under wooden hoarding
    for (let bx = -baseW / 2 + 0.8; bx <= baseW / 2 - 0.8; bx += 1.4) {
      [-baseD / 2 - 0.3, baseD / 2 + 0.3].forEach(bz => {
        const bracketGeo = new THREE.BoxGeometry(0.3, 0.7, 0.8);
        const bracket = new THREE.Mesh(bracketGeo, this.mat.timberWood);
        bracket.position.set(bx, baseH - 0.35, bz);
        group.add(bracket);
      });
    }

    // Narrow arrow slits and shuttered windows on the hoarding
    for (let wx = -hoardW / 2 + 1.5; wx <= hoardW / 2 - 1.5; wx += 2.5) {
      const winGeo = new THREE.BoxGeometry(0.7, 0.9, 0.15);
      const win = new THREE.Mesh(winGeo, this.mat.darkWindow);
      win.position.set(wx, baseH + hoardH / 2, hoardD / 2 + 0.05);
      group.add(win);
    }

    // 3. Upper Keep Level with Stone Battlements
    const upperW = baseW - 1.0;
    const upperD = baseD - 1.0;
    const upperH = 3.2;
    const upperGeo = new THREE.BoxGeometry(upperW, upperH, upperD);
    const upper = new THREE.Mesh(upperGeo, this.mat.castleStone);
    upper.position.y = baseH + hoardH + upperH / 2;
    upper.castShadow = true;
    group.add(upper);

    // Keep Roof Crenellations
    const topY = baseH + hoardH + upperH;
    for (let cx = -upperW / 2 + 0.6; cx <= upperW / 2 - 0.6; cx += 1.2) {
      [-upperD / 2, upperD / 2].forEach(cz => {
        const mGeo = new THREE.BoxGeometry(0.7, 0.8, 0.4);
        const m = new THREE.Mesh(mGeo, this.mat.castleStone);
        m.position.set(cx, topY + 0.4, cz);
        m.castShadow = true;
        group.add(m);
      });
    }

    // 4. Central Grand High Watchtower & Spire
    const watchTowerR = 2.0;
    const watchTowerH = 5.5;
    const watchGeo = new THREE.CylinderGeometry(watchTowerR, watchTowerR, watchTowerH, 10);
    const watchTower = new THREE.Mesh(watchGeo, this.mat.castleStone);
    watchTower.position.set(0, topY + watchTowerH / 2, 0);
    watchTower.castShadow = true;
    group.add(watchTower);

    // High Watchtower Conical Spire Roof
    const spireH = 4.8;
    const spireGeo = new THREE.ConeGeometry(watchTowerR + 0.5, spireH, 10);
    const spire = new THREE.Mesh(spireGeo, this.mat.slateRoof);
    spire.position.set(0, topY + watchTowerH + spireH / 2, 0);
    spire.castShadow = true;
    group.add(spire);

    // Royal Banner Finial atop the Keep
    const grandFlagPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 6);
    const flagPole = new THREE.Mesh(grandFlagPoleGeo, this.mat.goldTrim);
    flagPole.position.set(0, topY + watchTowerH + spireH + 1.0, 0);
    group.add(flagPole);

    // Grand waving heraldic banner
    const royalBanner = this.createFlag(1.6, 0.9, this.mat.redCloth, true);
    royalBanner.position.set(0.8, topY + watchTowerH + spireH + 1.4, 0);
    group.add(royalBanner);
    this.flags.push(royalBanner);

    // Keep Stone Chimney
    const chimGeo = new THREE.BoxGeometry(0.8, 2.2, 0.8);
    const chimney = new THREE.Mesh(chimGeo, this.mat.castleDarkStone);
    chimney.position.set(-2.5, topY + 1.1, -1.8);
    chimney.castShadow = true;
    group.add(chimney);

    this.group.add(group);
  }

  buildInnerCourtyard() {
    const baseY = this.castleBaseY;
    const cz = this.castleCenterZ;

    // Wooden weapons rack & training dummy in courtyard
    const rackGeo = new THREE.BoxGeometry(2.0, 1.2, 0.5);
    const rack = new THREE.Mesh(rackGeo, this.mat.timberWood);
    rack.position.set(-6.5, baseY + 0.6, cz + 2.5);
    rack.castShadow = true;
    this.group.add(rack);

    // Training dummy (straw body, wooden cross)
    const dummyPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 6);
    const dummyPole = new THREE.Mesh(dummyPoleGeo, this.mat.timberWood);
    dummyPole.position.set(-5.5, baseY + 0.9, cz + 4.0);
    this.group.add(dummyPole);

    const dummyBodyGeo = new THREE.CylinderGeometry(0.35, 0.3, 1.0, 8);
    const dummyBody = new THREE.Mesh(dummyBodyGeo, this.mat.hay);
    dummyBody.position.set(-5.5, baseY + 1.1, cz + 4.0);
    dummyBody.castShadow = true;
    this.group.add(dummyBody);

    // Courtyard storage barrels and crates
    for (let i = 0; i < 4; i++) {
      const barrelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.9, 10);
      const barrel = new THREE.Mesh(barrelGeo, this.mat.timberWood);
      barrel.position.set(6.2 + (i % 2) * 0.8, baseY + 0.45, cz + 2.2 + Math.floor(i / 2) * 0.9);
      barrel.castShadow = true;
      this.group.add(barrel);
    }
  }

  createFlag(width, height, clothMaterial, isRoyal = false) {
    // Flag mesh with subdivs for wave animation
    const flagGeo = new THREE.PlaneGeometry(width, height, 8, 4);
    // Anchor left edge at x = 0
    flagGeo.translate(width / 2, 0, 0);

    const flagMesh = new THREE.Mesh(flagGeo, clothMaterial);
    flagMesh.castShadow = true;
    flagMesh.userData = {
      initialVertices: flagGeo.attributes.position.clone(),
      isRoyal: isRoyal,
      speed: 3.5 + Math.random() * 1.5,
      frequency: 2.5 + Math.random() * 1.0,
    };
    return flagMesh;
  }

  update(time) {
    // Dynamic cloth wave animation for banners
    this.flags.forEach(flag => {
      const geo = flag.geometry;
      const pos = geo.attributes.position;
      const init = flag.userData.initialVertices;
      const speed = flag.userData.speed;
      const freq = flag.userData.frequency;

      for (let i = 0; i < pos.count; i++) {
        const x = init.getX(i);
        const wave = Math.sin(time * speed + x * freq) * (x * 0.22);
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
    });
  }
}
