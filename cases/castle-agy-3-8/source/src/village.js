import * as THREE from 'three';

export class Village {
  constructor(scene, materials) {
    this.scene = scene;
    this.mat = materials;
    this.group = new THREE.Group();

    this.smokeParticles = [];
    this.windmillBlades = null;
    this.waterwheel = null;
    this.waterSplashes = [];
    this.lanternLights = [];
    this.forgeLight = null;

    this.villageBaseY = 2.6;

    this.buildHouses();
    this.buildMarket();
    this.buildWaterWell();
    this.buildHorseCart();
    this.buildBlacksmith();
    this.buildWindmill();
    this.buildWatermill();
    this.buildBarnAndHay();

    this.scene.add(this.group);
  }

  // Helper to build a half-timbered house (木筋房)
  createHalfTimberHouse(x, z, rotY, width, length, height, isThatch = true, hasShop = false) {
    const house = new THREE.Group();
    house.position.set(x, this.villageBaseY, z);
    house.rotation.y = rotY;

    // 1. Stone Foundation
    const foundH = 0.5;
    const foundGeo = new THREE.BoxGeometry(width + 0.2, foundH, length + 0.2);
    const found = new THREE.Mesh(foundGeo, this.mat.castleStone);
    found.position.y = foundH / 2;
    found.castShadow = true;
    found.receiveShadow = true;
    house.add(found);

    // 2. Ground Floor Walls (Plaster)
    const wallH = height * 0.55;
    const wallGeo = new THREE.BoxGeometry(width, wallH, length);
    const wallMat = Math.random() > 0.5 ? this.mat.plasterWall : this.mat.plasterYellow;
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = foundH + wallH / 2;
    wall.castShadow = true;
    wall.receiveShadow = true;
    house.add(wall);

    // 3. Exposed Timber Beams (Fachwerk / 木筋框架)
    const beamThick = 0.12;
    // Corner posts
    [
      { bx: -width / 2, bz: -length / 2 },
      { bx: width / 2, bz: -length / 2 },
      { bx: -width / 2, bz: length / 2 },
      { bx: width / 2, bz: length / 2 },
    ].forEach(bp => {
      const postGeo = new THREE.BoxGeometry(beamThick * 1.5, wallH, beamThick * 1.5);
      const post = new THREE.Mesh(postGeo, this.mat.timberWood);
      post.position.set(bp.bx, foundH + wallH / 2, bp.bz);
      house.add(post);
    });

    // Horizontal timber beams
    [foundH, foundH + wallH].forEach(by => {
      const beamFrontGeo = new THREE.BoxGeometry(width + 0.1, beamThick, beamThick);
      const beamFront = new THREE.Mesh(beamFrontGeo, this.mat.timberWood);
      beamFront.position.set(0, by, length / 2 + 0.02);
      house.add(beamFront);

      const beamBack = beamFront.clone();
      beamBack.position.z = -length / 2 - 0.02;
      house.add(beamBack);
    });

    // Diagonal timber cross braces on front
    const diagL = Math.sqrt(width * width * 0.25 + wallH * wallH);
    const diagAngle = Math.atan2(wallH, width * 0.5);
    const diagGeo = new THREE.BoxGeometry(diagL, beamThick, beamThick * 0.8);
    const diag1 = new THREE.Mesh(diagGeo, this.mat.timberWood);
    diag1.position.set(-width / 4, foundH + wallH / 2, length / 2 + 0.03);
    diag1.rotation.z = diagAngle;
    house.add(diag1);

    const diag2 = new THREE.Mesh(diagGeo, this.mat.timberWood);
    diag2.position.set(width / 4, foundH + wallH / 2, length / 2 + 0.03);
    diag2.rotation.z = -diagAngle;
    house.add(diag2);

    // 4. Second Story Jetty / Overhang (Cantilevered floor)
    const jettyW = width + 0.4;
    const jettyL = length + 0.4;
    const jettyH = height * 0.45;
    const jettyGeo = new THREE.BoxGeometry(jettyW, jettyH, jettyL);
    const jetty = new THREE.Mesh(jettyGeo, wallMat);
    jetty.position.y = foundH + wallH + jettyH / 2;
    jetty.castShadow = true;
    house.add(jetty);

    // Corbel brackets supporting jetty
    for (let cx = -width / 2 + 0.4; cx <= width / 2 - 0.4; cx += 1.0) {
      const bracketGeo = new THREE.BoxGeometry(0.18, 0.35, 0.45);
      const bracket = new THREE.Mesh(bracketGeo, this.mat.timberWood);
      bracket.position.set(cx, foundH + wallH - 0.15, length / 2 + 0.1);
      house.add(bracket);
    }

    // Jetty timber framing
    [
      { bx: -jettyW / 2, bz: -jettyL / 2 },
      { bx: jettyW / 2, bz: -jettyL / 2 },
      { bx: -jettyW / 2, bz: jettyL / 2 },
      { bx: jettyW / 2, bz: jettyL / 2 },
    ].forEach(bp => {
      const postGeo = new THREE.BoxGeometry(beamThick * 1.5, jettyH, beamThick * 1.5);
      const post = new THREE.Mesh(postGeo, this.mat.timberWood);
      post.position.set(bp.bx, foundH + wallH + jettyH / 2, bp.bz);
      house.add(post);
    });

    // 5. Gabled Roof (Thatch or Clay Tile)
    const roofH = 1.8;
    const roofOverhang = 0.5;
    const roofGeo = new THREE.ConeGeometry(
      Math.max(jettyW, jettyL) * 0.72 + roofOverhang,
      roofH,
      4
    );
    roofGeo.rotateY(Math.PI / 4);
    const roofMat = isThatch ? this.mat.thatchRoof : this.mat.clayRoof;
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = foundH + wallH + jettyH + roofH / 2;
    roof.scale.set(jettyW / Math.max(jettyW, jettyL), 1, jettyL / Math.max(jettyW, jettyL));
    roof.castShadow = true;
    house.add(roof);

    // Wooden door
    const doorGeo = new THREE.BoxGeometry(0.7, 1.3, 0.1);
    const door = new THREE.Mesh(doorGeo, this.mat.timberWood);
    door.position.set(0, foundH + 0.65, length / 2 + 0.05);
    house.add(door);

    // Shuttered windows
    [-width / 3, width / 3].forEach(wx => {
      const winGeo = new THREE.BoxGeometry(0.5, 0.6, 0.1);
      const win = new THREE.Mesh(winGeo, this.mat.windowGlow);
      win.position.set(wx, foundH + wallH + jettyH / 2, jettyL / 2 + 0.05);
      house.add(win);

      // Window flower box
      const boxGeo = new THREE.BoxGeometry(0.65, 0.2, 0.25);
      const flowerBox = new THREE.Mesh(boxGeo, this.mat.timberWood);
      flowerBox.position.set(wx, foundH + wallH + jettyH / 2 - 0.35, jettyL / 2 + 0.15);
      house.add(flowerBox);

      // Colorful flowers in flower box
      const flowerGeo = new THREE.BoxGeometry(0.55, 0.15, 0.2);
      const flower = new THREE.Mesh(flowerGeo, this.mat.redCloth);
      flower.position.set(wx, foundH + wallH + jettyH / 2 - 0.22, jettyL / 2 + 0.15);
      house.add(flower);
    });

    // 6. Stone Chimney with Rising Smoke
    const chimGeo = new THREE.BoxGeometry(0.6, 2.8, 0.6);
    const chim = new THREE.Mesh(chimGeo, this.mat.castleStone);
    const chimX = width / 2 - 0.4;
    const chimZ = -length / 2 + 0.4;
    const chimY = foundH + wallH + jettyH + 1.0;
    chim.position.set(chimX, chimY, chimZ);
    chim.castShadow = true;
    house.add(chim);

    // Register chimney emitter
    this.addChimneySmokeEmitter(x + chimX, chimY + 1.4, z + chimZ);

    // Warm lantern hanging by the front door
    const lanternGeo = new THREE.BoxGeometry(0.2, 0.3, 0.2);
    const lantern = new THREE.Mesh(lanternGeo, this.mat.windowGlow);
    lantern.position.set(0.6, foundH + 1.2, length / 2 + 0.25);
    house.add(lantern);

    const lLight = new THREE.PointLight(0xffaa44, 0.8, 5, 2);
    lLight.position.set(x + 0.6, this.villageBaseY + foundH + 1.2, z + length / 2 + 0.35);
    this.scene.add(lLight);
    this.lanternLights.push(lLight);

    this.group.add(house);
    return house;
  }

  addChimneySmokeEmitter(x, y, z) {
    // Generate soft stylized puff particles
    const puffCount = 6;
    for (let i = 0; i < puffCount; i++) {
      const size = 0.15 + Math.random() * 0.15;
      const puffGeo = new THREE.DodecahedronGeometry(size, 1);
      const puffMat = new THREE.MeshBasicMaterial({
        color: 0xe8e8ea,
        transparent: true,
        opacity: 0.65,
      });
      const puff = new THREE.Mesh(puffGeo, puffMat);
      puff.position.set(x, y + i * 0.3, z);
      puff.userData = {
        baseX: x,
        baseY: y,
        baseZ: z,
        age: i * 0.6,
        maxAge: 3.5,
        speedY: 0.7 + Math.random() * 0.3,
        driftX: (Math.random() - 0.5) * 0.3,
        driftZ: (Math.random() - 0.5) * 0.3,
        initialSize: size,
      };
      this.group.add(puff);
      this.smokeParticles.push(puff);
    }
  }

  buildHouses() {
    // Variety of half-timbered cottages forming village streets
    // Left street houses
    this.createHalfTimberHouse(-8.5, -1.5, 0.1, 3.6, 4.2, 3.2, true);
    this.createHalfTimberHouse(-10.2, 3.8, 0.25, 4.0, 3.8, 3.0, true);
    this.createHalfTimberHouse(-5.8, -4.2, -0.15, 3.4, 3.6, 2.8, false);

    // Right street houses
    this.createHalfTimberHouse(6.5, -2.5, -0.2, 3.8, 4.0, 3.1, false);
    this.createHalfTimberHouse(8.2, 2.6, -0.4, 3.5, 3.5, 2.9, true);
  }

  buildMarket() {
    // Village Square Market (Z: 1.5 to 5.5, X: -2.5 to 4.5)
    const stallsData = [
      { x: -3.5, z: 2.2, rot: 0.1, stripeColor: this.mat.redCloth, goodType: 'apples' },
      { x: -3.2, z: 4.8, rot: -0.2, stripeColor: this.mat.blueCloth, goodType: 'bread' },
      { x: 3.8, z: 2.5, rot: -0.15, stripeColor: this.mat.clayRoof, goodType: 'veggies' },
    ];

    stallsData.forEach(st => {
      const stall = new THREE.Group();
      stall.position.set(st.x, this.villageBaseY, st.z);
      stall.rotation.y = st.rot;

      // Wooden Table
      const tableGeo = new THREE.BoxGeometry(2.2, 0.8, 1.2);
      const table = new THREE.Mesh(tableGeo, this.mat.timberWood);
      table.position.y = 0.4;
      table.castShadow = true;
      stall.add(table);

      // Four wooden corner posts
      [
        { px: -1.0, pz: -0.5 },
        { px: 1.0, pz: -0.5 },
        { px: -1.0, pz: 0.5 },
        { px: 1.0, pz: 0.5 },
      ].forEach(p => {
        const postGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 6);
        const post = new THREE.Mesh(postGeo, this.mat.timberWood);
        post.position.set(p.px, 1.1, p.pz);
        stall.add(post);
      });

      // Striped fabric awning / canopy
      const canopyW = 2.4;
      const canopyD = 1.6;
      const canopyGeo = new THREE.ConeGeometry(canopyW * 0.7, 0.6, 4);
      canopyGeo.rotateY(Math.PI / 4);
      canopyGeo.scale(1.2, 1, 0.9);
      const canopy = new THREE.Mesh(canopyGeo, st.stripeColor);
      canopy.position.y = 2.4;
      canopy.castShadow = true;
      stall.add(canopy);

      // Produce crates & baskets on the table
      [-0.6, 0.1, 0.7].forEach((cx, idx) => {
        const crateGeo = new THREE.BoxGeometry(0.5, 0.3, 0.45);
        const crate = new THREE.Mesh(crateGeo, this.mat.lightPlank);
        crate.position.set(cx, 0.95, 0);
        stall.add(crate);

        // Good items inside
        const itemCol = idx === 0 ? 0xe74c3c : (idx === 1 ? 0xf39c12 : 0x27ae60);
        const itemMat = new THREE.MeshToonMaterial({ color: itemCol, gradientMap: this.mat.gradientMap });
        for (let k = 0; k < 3; k++) {
          const itemGeo = new THREE.SphereGeometry(0.09, 6, 6);
          const item = new THREE.Mesh(itemGeo, itemMat);
          item.position.set(cx + (k - 1) * 0.12, 1.15, 0);
          stall.add(item);
        }
      });

      // Wooden barrel beside the stall
      const barrelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.7, 8);
      const barrel = new THREE.Mesh(barrelGeo, this.mat.timberWood);
      barrel.position.set(1.4, 0.35, 0.3);
      barrel.castShadow = true;
      stall.add(barrel);

      this.group.add(stall);
    });

    // Town notice board / signpost in village square
    const signGroup = new THREE.Group();
    signGroup.position.set(-0.8, this.villageBaseY, 1.2);
    const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.0, 6);
    const post = new THREE.Mesh(postGeo, this.mat.timberWood);
    post.position.y = 1.0;
    post.castShadow = true;
    signGroup.add(post);

    const boardGeo = new THREE.BoxGeometry(1.0, 0.7, 0.1);
    const board = new THREE.Mesh(boardGeo, this.mat.lightPlank);
    board.position.set(0, 1.5, 0);
    signGroup.add(board);

    // Parchment notice papers pinned
    [-0.2, 0.2].forEach(px => {
      const noticeGeo = new THREE.PlaneGeometry(0.3, 0.35);
      const notice = new THREE.Mesh(noticeGeo, this.mat.whiteCloth);
      notice.position.set(px, 1.5, 0.06);
      signGroup.add(notice);
    });
    this.group.add(signGroup);
  }

  buildWaterWell() {
    const well = new THREE.Group();
    well.position.set(1.2, this.villageBaseY, 3.8);

    // Stone rim
    const rimGeo = new THREE.CylinderGeometry(1.0, 1.1, 0.8, 10);
    const rim = new THREE.Mesh(rimGeo, this.mat.castleStone);
    rim.position.y = 0.4;
    rim.castShadow = true;
    well.add(rim);

    // Inner water plane
    const waterGeo = new THREE.CircleGeometry(0.75, 10);
    waterGeo.rotateX(-Math.PI / 2);
    const water = new THREE.Mesh(waterGeo, this.mat.water);
    water.position.y = 0.55;
    well.add(water);

    // Two wooden uprights
    [-0.8, 0.8].forEach(wx => {
      const postGeo = new THREE.CylinderGeometry(0.07, 0.07, 2.2, 6);
      const post = new THREE.Mesh(postGeo, this.mat.timberWood);
      post.position.set(wx, 1.1, 0);
      post.castShadow = true;
      well.add(post);
    });

    // Cross beam
    const crossGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 6);
    crossGeo.rotateZ(Math.PI / 2);
    const cross = new THREE.Mesh(crossGeo, this.mat.timberWood);
    cross.position.set(0, 2.1, 0);
    well.add(cross);

    // Peaked Wooden Roof
    const roofGeo = new THREE.ConeGeometry(1.3, 0.8, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, this.mat.thatchRoof);
    roof.position.y = 2.5;
    roof.castShadow = true;
    well.add(roof);

    // Winch cylinder with rope
    const winchGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8);
    winchGeo.rotateZ(Math.PI / 2);
    const winch = new THREE.Mesh(winchGeo, this.mat.lightPlank);
    winch.position.set(0, 1.8, 0);
    well.add(winch);

    // Wooden bucket hanging by rope
    const bucketGeo = new THREE.CylinderGeometry(0.2, 0.16, 0.3, 8);
    const bucket = new THREE.Mesh(bucketGeo, this.mat.timberWood);
    bucket.position.set(0.1, 1.0, 0);
    bucket.castShadow = true;
    well.add(bucket);

    this.group.add(well);
  }

  buildHorseCart() {
    const cart = new THREE.Group();
    cart.position.set(-2.0, this.villageBaseY, 6.2);
    cart.rotation.y = 0.35;

    // Wagon Bed
    const bedGeo = new THREE.BoxGeometry(1.6, 0.15, 2.6);
    const bed = new THREE.Mesh(bedGeo, this.mat.lightPlank);
    bed.position.y = 0.7;
    bed.castShadow = true;
    cart.add(bed);

    // Wagon Side Slats
    [-0.8, 0.8].forEach(sx => {
      const sideGeo = new THREE.BoxGeometry(0.1, 0.6, 2.6);
      const side = new THREE.Mesh(sideGeo, this.mat.timberWood);
      side.position.set(sx, 1.0, 0);
      cart.add(side);
    });

    // Front/Back boards
    [-1.3, 1.3].forEach(sz => {
      const boardGeo = new THREE.BoxGeometry(1.6, 0.6, 0.1);
      const board = new THREE.Mesh(boardGeo, this.mat.timberWood);
      board.position.set(0, 1.0, sz);
      cart.add(board);
    });

    // Two Large Wooden Spoked Wheels
    [-0.95, 0.95].forEach(wx => {
      const wheelGeo = new THREE.TorusGeometry(0.55, 0.08, 6, 12);
      const wheel = new THREE.Mesh(wheelGeo, this.mat.timberWood);
      wheel.position.set(wx, 0.55, 0);
      wheel.rotation.y = Math.PI / 2;
      wheel.castShadow = true;
      cart.add(wheel);

      // Hub
      const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 6);
      hubGeo.rotateZ(Math.PI / 2);
      const hub = new THREE.Mesh(hubGeo, this.mat.ironMetal);
      hub.position.set(wx, 0.55, 0);
      cart.add(hub);
    });

    // Drawbar / Thill Shafts (forward poles)
    [-0.5, 0.5].forEach(dx => {
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.0, 4);
      poleGeo.rotateX(Math.PI / 2);
      const pole = new THREE.Mesh(poleGeo, this.mat.timberWood);
      pole.position.set(dx, 0.45, 2.2);
      cart.add(pole);
    });

    // Cargo in cart: Sacks of grain and pumpkin
    for (let i = 0; i < 3; i++) {
      const sackGeo = new THREE.SphereGeometry(0.35, 6, 6);
      sackGeo.scale(1, 0.7, 1.3);
      const sack = new THREE.Mesh(sackGeo, this.mat.whiteCloth);
      sack.position.set((i - 1) * 0.4, 0.9, (i % 2) * 0.4 - 0.2);
      sack.castShadow = true;
      cart.add(sack);
    }
    const pumpGeo = new THREE.SphereGeometry(0.28, 8, 8);
    const pumpMat = new THREE.MeshToonMaterial({ color: 0xe67e22, gradientMap: this.mat.gradientMap });
    const pumpkin = new THREE.Mesh(pumpGeo, pumpMat);
    pumpkin.position.set(0.2, 1.0, 0.7);
    pumpkin.castShadow = true;
    cart.add(pumpkin);

    this.group.add(cart);
  }

  buildBlacksmith() {
    // Blacksmith Workshop (X: 5.5, Z: 5.8)
    const smith = new THREE.Group();
    smith.position.set(5.5, this.villageBaseY, 5.5);
    smith.rotation.y = -0.4;

    // Stone Hearth / Forge
    const forgeH = 1.2;
    const forgeGeo = new THREE.BoxGeometry(2.0, forgeH, 1.6);
    const forge = new THREE.Mesh(forgeGeo, this.mat.castleStone);
    forge.position.set(0, forgeH / 2, 0);
    forge.castShadow = true;
    smith.add(forge);

    // Glowing Embers / Coals inside forge hearth cavity
    const emberGeo = new THREE.BoxGeometry(1.2, 0.2, 0.8);
    const embers = new THREE.Mesh(emberGeo, this.mat.forgeEmbers);
    embers.position.set(0, forgeH + 0.05, 0);
    smith.add(embers);

    // Dynamic Pulsing Forge Fire Light
    this.forgeLight = new THREE.PointLight(0xff4500, 2.5, 6, 2);
    this.forgeLight.position.set(5.5, this.villageBaseY + forgeH + 0.4, 5.5);
    this.scene.add(this.forgeLight);

    // Tall Stone Forge Chimney
    const chimGeo = new THREE.BoxGeometry(1.0, 3.5, 1.0);
    const chim = new THREE.Mesh(chimGeo, this.mat.castleDarkStone);
    chim.position.set(0, forgeH + 1.75, -0.2);
    chim.castShadow = true;
    smith.add(chim);
    this.addChimneySmokeEmitter(5.5, this.villageBaseY + forgeH + 3.6, 5.3);

    // Oak Stump with Heavy Iron Anvil
    const stumpGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.6, 8);
    const stump = new THREE.Mesh(stumpGeo, this.mat.treeTrunk);
    stump.position.set(0, 0.3, 1.8);
    stump.castShadow = true;
    smith.add(stump);

    // Anvil
    const anvilBaseGeo = new THREE.BoxGeometry(0.35, 0.2, 0.5);
    const anvilBase = new THREE.Mesh(anvilBaseGeo, this.mat.ironMetal);
    anvilBase.position.set(0, 0.7, 1.8);
    smith.add(anvilBase);

    const anvilTopGeo = new THREE.BoxGeometry(0.4, 0.2, 0.8);
    const anvilTop = new THREE.Mesh(anvilTopGeo, this.mat.ironMetal);
    anvilTop.position.set(0, 0.85, 1.8);
    anvilTop.castShadow = true;
    smith.add(anvilTop);

    // Water Quench Trough
    const troughGeo = new THREE.BoxGeometry(0.8, 0.5, 1.4);
    const trough = new THREE.Mesh(troughGeo, this.mat.timberWood);
    trough.position.set(-1.4, 0.25, 1.2);
    smith.add(trough);

    const troughWater = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 1.2), this.mat.water);
    troughWater.rotation.x = -Math.PI / 2;
    troughWater.position.set(-1.4, 0.45, 1.2);
    smith.add(troughWater);

    // Open Timber Canopy over workshop
    [
      { cx: -1.6, cz: -0.6 },
      { cx: 1.6, cz: -0.6 },
      { cx: -1.6, cz: 2.4 },
      { cx: 1.6, cz: 2.4 },
    ].forEach(cp => {
      const postGeo = new THREE.BoxGeometry(0.16, 2.8, 0.16);
      const post = new THREE.Mesh(postGeo, this.mat.timberWood);
      post.position.set(cp.cx, 1.4, cp.cz);
      smith.add(post);
    });

    const roofGeo = new THREE.ConeGeometry(2.6, 1.2, 4);
    roofGeo.rotateY(Math.PI / 4);
    roofGeo.scale(1.2, 1, 1.1);
    const roof = new THREE.Mesh(roofGeo, this.mat.clayRoof);
    roof.position.set(0, 3.2, 0.9);
    roof.castShadow = true;
    smith.add(roof);

    this.group.add(smith);
  }

  buildWindmill() {
    // Windmill perched on the right elevated knoll (X: 16.5, Z: -1, Y: 2.8)
    const mill = new THREE.Group();
    mill.position.set(16.5, 2.8, -1.0);

    // 1. Tapered Round/Octagonal Stone Base
    const baseH = 2.4;
    const baseGeo = new THREE.CylinderGeometry(2.0, 2.5, baseH, 8);
    const baseMesh = new THREE.Mesh(baseGeo, this.mat.castleStone);
    baseMesh.position.y = baseH / 2;
    baseMesh.castShadow = true;
    mill.add(baseMesh);

    // 2. Timber Upper Tower
    const towerH = 4.2;
    const towerGeo = new THREE.CylinderGeometry(1.5, 2.0, towerH, 8);
    const towerMesh = new THREE.Mesh(towerGeo, this.mat.timberWood);
    towerMesh.position.y = baseH + towerH / 2;
    towerMesh.castShadow = true;
    mill.add(towerMesh);

    // 3. Conical Mill Cap
    const capH = 2.0;
    const capGeo = new THREE.ConeGeometry(1.8, capH, 8);
    const capMesh = new THREE.Mesh(capGeo, this.mat.thatchRoof);
    capMesh.position.y = baseH + towerH + capH / 2;
    capMesh.castShadow = true;
    mill.add(capMesh);

    // 4. Windmill Axle & 4 Rotating Sails
    const axleGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.2, 6);
    axleGeo.rotateX(Math.PI / 2);
    const axle = new THREE.Mesh(axleGeo, this.mat.timberWood);
    axle.position.set(0, baseH + towerH + 0.5, 1.4);
    mill.add(axle);

    // Sails Rotor Group
    this.windmillBlades = new THREE.Group();
    this.windmillBlades.position.set(0, baseH + towerH + 0.5, 2.0);

    // Hub
    const hubGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.3, 8);
    hubGeo.rotateX(Math.PI / 2);
    const hub = new THREE.Mesh(hubGeo, this.mat.ironMetal);
    this.windmillBlades.add(hub);

    // 4 Lattice Wooden Blades with Sail Cloth
    const bladeLen = 4.2;
    for (let b = 0; b < 4; b++) {
      const bladeGroup = new THREE.Group();
      bladeGroup.rotation.z = (b * Math.PI) / 2;

      // Spar / Main Timber Beam
      const sparGeo = new THREE.BoxGeometry(0.12, bladeLen, 0.12);
      const spar = new THREE.Mesh(sparGeo, this.mat.timberWood);
      spar.position.y = bladeLen / 2;
      bladeGroup.add(spar);

      // Sail Canvas Cloth
      const clothGeo = new THREE.PlaneGeometry(0.85, bladeLen * 0.85);
      const cloth = new THREE.Mesh(clothGeo, this.mat.whiteCloth);
      cloth.position.set(0.48, bladeLen * 0.55, 0.05);
      cloth.rotation.y = 0.15;
      cloth.castShadow = true;
      bladeGroup.add(cloth);

      this.windmillBlades.add(bladeGroup);
    }

    mill.add(this.windmillBlades);
    this.group.add(mill);
  }

  buildWatermill() {
    // Watermill beside canal (X: -13.0, Z: 3.5)
    const mill = new THREE.Group();
    mill.position.set(-13.0, 1.8, 3.5);

    // Mill House Structure
    const houseW = 3.6;
    const houseL = 4.2;
    const houseH = 2.8;

    const baseGeo = new THREE.BoxGeometry(houseW, 0.6, houseL);
    const base = new THREE.Mesh(baseGeo, this.mat.castleStone);
    base.position.y = 0.3;
    base.castShadow = true;
    mill.add(base);

    const bodyGeo = new THREE.BoxGeometry(houseW - 0.2, houseH, houseL - 0.2);
    const body = new THREE.Mesh(bodyGeo, this.mat.timberWood);
    body.position.y = 0.6 + houseH / 2;
    body.castShadow = true;
    mill.add(body);

    const roofGeo = new THREE.ConeGeometry(houseL * 0.7, 1.8, 4);
    roofGeo.rotateY(Math.PI / 4);
    roofGeo.scale(houseW / houseL, 1, 1);
    const roof = new THREE.Mesh(roofGeo, this.mat.thatchRoof);
    roof.position.y = 0.6 + houseH + 0.9;
    roof.castShadow = true;
    mill.add(roof);

    // Rotating Waterwheel on canal side (x = -houseW/2 - 0.6)
    this.waterwheel = new THREE.Group();
    this.waterwheel.position.set(-houseW / 2 - 0.45, 0.6, 0);

    // Dual wooden rims
    const wheelR = 1.6;
    [-0.3, 0.3].forEach(wz => {
      const rimGeo = new THREE.TorusGeometry(wheelR, 0.08, 6, 16);
      const rim = new THREE.Mesh(rimGeo, this.mat.timberWood);
      rim.position.z = wz;
      rim.castShadow = true;
      this.waterwheel.add(rim);
    });

    // Central axle
    const axleGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8);
    axleGeo.rotateX(Math.PI / 2);
    const axle = new THREE.Mesh(axleGeo, this.mat.ironMetal);
    this.waterwheel.add(axle);

    // 12 Paddle Blades
    const paddleCount = 12;
    for (let p = 0; p < paddleCount; p++) {
      const angle = (p / paddleCount) * Math.PI * 2;
      const paddleGeo = new THREE.BoxGeometry(0.45, 0.08, 0.65);
      const paddle = new THREE.Mesh(paddleGeo, this.mat.lightPlank);
      paddle.position.set(Math.cos(angle) * (wheelR - 0.2), Math.sin(angle) * (wheelR - 0.2), 0);
      paddle.rotation.z = angle + Math.PI / 2;
      paddle.castShadow = true;
      this.waterwheel.add(paddle);

      // Spokes
      const spokeGeo = new THREE.CylinderGeometry(0.04, 0.04, wheelR, 4);
      spokeGeo.rotateZ(angle + Math.PI / 2);
      const spoke = new THREE.Mesh(spokeGeo, this.mat.timberWood);
      spoke.position.set(Math.cos(angle) * (wheelR * 0.45), Math.sin(angle) * (wheelR * 0.45), 0);
      this.waterwheel.add(spoke);
    }

    mill.add(this.waterwheel);
    this.group.add(mill);
  }

  buildBarnAndHay() {
    // Village/Farm Barn (X: 11.5, Z: 6.5)
    const barn = new THREE.Group();
    barn.position.set(11.5, this.villageBaseY, 6.5);
    barn.rotation.y = 0.2;

    const barnW = 5.2;
    const barnL = 4.0;
    const barnH = 3.2;

    // Wooden barn body
    const bodyGeo = new THREE.BoxGeometry(barnW, barnH, barnL);
    const body = new THREE.Mesh(bodyGeo, this.mat.timberWood);
    body.position.y = barnH / 2;
    body.castShadow = true;
    barn.add(body);

    // Barn gabled thatch roof
    const roofGeo = new THREE.ConeGeometry(barnW * 0.72, 2.2, 4);
    roofGeo.rotateY(Math.PI / 4);
    roofGeo.scale(1, 1, barnL / barnW);
    const roof = new THREE.Mesh(roofGeo, this.mat.thatchRoof);
    roof.position.y = barnH + 1.1;
    roof.castShadow = true;
    barn.add(roof);

    // Double barn doors
    const doorGeo = new THREE.BoxGeometry(1.8, 2.0, 0.12);
    const door = new THREE.Mesh(doorGeo, this.mat.lightPlank);
    door.position.set(0, 1.0, barnL / 2 + 0.06);
    barn.add(door);

    // Loft hay door above
    const loftGeo = new THREE.BoxGeometry(0.9, 0.9, 0.12);
    const loft = new THREE.Mesh(loftGeo, this.mat.lightPlank);
    loft.position.set(0, 2.5, barnL / 2 + 0.06);
    barn.add(loft);

    this.group.add(barn);

    // Multiple Golden Haystacks (草垛) around barn
    const hayPositions = [
      { x: 15.0, z: 7.2, r: 1.1, h: 1.6 },
      { x: 14.2, z: 9.2, r: 0.9, h: 1.3 },
      { x: 8.5, z: 8.8, r: 1.2, h: 1.7 },
    ];

    hayPositions.forEach(hp => {
      const hayGeo = new THREE.ConeGeometry(hp.r, hp.h, 10);
      const hayMesh = new THREE.Mesh(hayGeo, this.mat.hay);
      hayMesh.position.set(hp.x, 1.2 + hp.h / 2, hp.z);
      hayMesh.castShadow = true;
      this.group.add(hayMesh);

      // Pitchfork leaning against the haystack
      const forkPoleGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.6, 4);
      const forkPole = new THREE.Mesh(forkPoleGeo, this.mat.lightPlank);
      forkPole.position.set(hp.x + hp.r * 0.7, 1.2 + 0.75, hp.z + 0.3);
      forkPole.rotation.z = -0.3;
      this.group.add(forkPole);
    });
  }

  update(time) {
    // 1. Windmill rotation
    if (this.windmillBlades) {
      this.windmillBlades.rotation.z += 0.018;
    }

    // 2. Waterwheel rotation
    if (this.waterwheel) {
      this.waterwheel.rotation.z += 0.025;
    }

    // 3. Smoke puffs rising and dissipating
    this.smokeParticles.forEach(p => {
      const d = p.userData;
      d.age += 0.016;
      if (d.age > d.maxAge) {
        d.age = 0;
        p.position.set(d.baseX, d.baseY, d.baseZ);
        p.material.opacity = 0.65;
        p.scale.set(1, 1, 1);
      } else {
        const progress = d.age / d.maxAge;
        p.position.y += d.speedY * 0.016;
        p.position.x += d.driftX * 0.016;
        p.position.z += d.driftZ * 0.016;
        const scale = 1 + progress * 1.8;
        p.scale.set(scale, scale, scale);
        p.material.opacity = 0.65 * (1 - progress);
      }
    });

    // 4. Blacksmith forge light flicker
    if (this.forgeLight) {
      this.forgeLight.intensity = 2.0 + Math.sin(time * 12.0) * 0.5 + (Math.random() - 0.5) * 0.4;
    }
  }
}
