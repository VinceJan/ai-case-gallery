import * as THREE from 'three';

export class Farmland {
  constructor(scene, materials) {
    this.scene = scene;
    this.mat = materials;
    this.group = new THREE.Group();

    this.wheatMesh = null;
    this.wheatInstances = [];
    this.trees = [];
    this.animals = [];

    this.farmBaseY = 1.2;

    this.buildWheatFields();
    this.buildFences();
    this.buildScarecrow();
    this.buildHayBales();
    this.buildBridges();
    this.buildAnimals();
    this.buildPerimeterForest();

    this.scene.add(this.group);
  }

  buildWheatFields() {
    // Wheat field zone (Front Left: X: -8 to -1, Z: 9 to 21) & (Front Right: X: 4 to 12, Z: 10 to 22)
    const fieldZones = [
      { startX: -7.5, endX: -1.5, startZ: 9.5, endZ: 20.5, rows: 9, cols: 7 },
      { startX: 4.5, endX: 11.5, startZ: 10.5, endZ: 21.0, rows: 9, cols: 8 },
    ];

    // Build soil furrows / ridges (麦垄)
    fieldZones.forEach(zone => {
      const w = zone.endX - zone.startX;
      const d = zone.endZ - zone.startZ;
      const centerX = (zone.startX + zone.endX) / 2;
      const centerZ = (zone.startZ + zone.endZ) / 2;

      // Dark tilled soil bed
      const soilBedGeo = new THREE.PlaneGeometry(w + 0.8, d + 0.8);
      soilBedGeo.rotateX(-Math.PI / 2);
      const soilBed = new THREE.Mesh(soilBedGeo, this.mat.soilRidge);
      soilBed.position.set(centerX, this.farmBaseY + 0.02, centerZ);
      soilBed.receiveShadow = true;
      this.group.add(soilBed);

      // Elevated ridges (麦垄条状隆起)
      const ridgeCount = zone.rows;
      const rowStep = d / ridgeCount;
      for (let r = 0; r < ridgeCount; r++) {
        const rz = zone.startZ + r * rowStep + rowStep / 2;
        const ridgeGeo = new THREE.CylinderGeometry(0.22, 0.35, w, 6);
        ridgeGeo.rotateZ(Math.PI / 2);
        const ridge = new THREE.Mesh(ridgeGeo, this.mat.soilRidge);
        ridge.position.set(centerX, this.farmBaseY + 0.12, rz);
        ridge.receiveShadow = true;
        this.group.add(ridge);
      }
    });

    // Instanced Wheat Stalks (麦浪)
    // Geometry: slender stem + wheat head grain spike
    const stalkGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.7, 5);
    stalkGeo.translate(0, 0.35, 0);

    const headGeo = new THREE.ConeGeometry(0.07, 0.35, 5);
    headGeo.translate(0, 0.85, 0);

    // Merge stem and head into single wheat geometry
    const wheatGeo = new THREE.BufferGeometry();
    const pos1 = stalkGeo.attributes.position.array;
    const pos2 = headGeo.attributes.position.array;
    const combinedPos = new Float32Array(pos1.length + pos2.length);
    combinedPos.set(pos1, 0);
    combinedPos.set(pos2, pos1.length);
    wheatGeo.setAttribute('position', new THREE.BufferAttribute(combinedPos, 3));
    wheatGeo.computeVertexNormals();

    // Setup custom vertex animation for wind waving
    const wheatMat = this.mat.wheatStalk.clone();
    wheatMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = `
        uniform float uTime;
        ${shader.vertexShader}
      `;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        // Only bend upper part of wheat
        float heightFactor = clamp(transformed.y / 0.9, 0.0, 1.0);
        float wave = sin(uTime * 3.2 + position.x * 1.5 + position.z * 1.2) * 0.18 * heightFactor;
        transformed.x += wave;
        transformed.z += wave * 0.6;
        `
      );
      wheatMat.userData.shader = shader;
    };

    // Calculate total stalks
    let totalStalks = 0;
    fieldZones.forEach(z => {
      totalStalks += z.rows * z.cols * 6;
    });

    const instancedWheat = new THREE.InstancedMesh(wheatGeo, wheatMat, totalStalks);
    instancedWheat.castShadow = true;
    instancedWheat.receiveShadow = true;

    const dummy = new THREE.Object3D();
    let idx = 0;

    fieldZones.forEach(zone => {
      const rowStep = (zone.endZ - zone.startZ) / zone.rows;
      const colStep = (zone.endX - zone.startX) / zone.cols;

      for (let r = 0; r < zone.rows; r++) {
        for (let c = 0; c < zone.cols; c++) {
          for (let k = 0; k < 6; k++) {
            const rx = zone.startX + c * colStep + (Math.random() - 0.5) * colStep * 0.9;
            const rz = zone.startZ + r * rowStep + (Math.random() - 0.5) * rowStep * 0.9;
            const scale = 0.8 + Math.random() * 0.4;

            dummy.position.set(rx, this.farmBaseY + 0.12, rz);
            dummy.scale.set(scale, scale, scale);
            dummy.rotation.y = Math.random() * Math.PI * 2;
            dummy.updateMatrix();

            instancedWheat.setMatrixAt(idx++, dummy.matrix);
          }
        }
      }
    });

    instancedWheat.instanceMatrix.needsUpdate = true;
    this.wheatMesh = instancedWheat;
    this.group.add(instancedWheat);
  }

  buildFences() {
    // Split-rail wooden fences bordering the pastures and fields
    const fenceLines = [
      // Left wheat field front & left fence
      { p1: [-8.0, 9.0], p2: [-8.0, 21.5] },
      { p1: [-8.0, 21.5], p2: [-1.2, 21.5] },
      // Right wheat field front & right fence
      { p1: [12.0, 10.0], p2: [12.0, 21.5] },
      { p1: [4.0, 21.5], p2: [12.0, 21.5] },
      // Pasture fence (Left Wing: X: -22 to -14, Z: 10 to 22)
      { p1: [-22.0, 10.0], p2: [-15.0, 10.0] },
      { p1: [-22.0, 10.0], p2: [-22.0, 22.0] },
      { p1: [-22.0, 22.0], p2: [-15.0, 22.0] },
    ];

    fenceLines.forEach(line => {
      this.createFenceSection(line.p1[0], line.p1[1], line.p2[0], line.p2[1]);
    });
  }

  createFenceSection(x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(dz, dx);
    const postSpacing = 2.0;
    const count = Math.ceil(dist / postSpacing);

    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const px = x1 + dx * t;
      const pz = z1 + dz * t;

      // Vertical post
      const postGeo = new THREE.CylinderGeometry(0.06, 0.07, 1.1, 5);
      const post = new THREE.Mesh(postGeo, this.mat.timberWood);
      post.position.set(px, this.farmBaseY + 0.55, pz);
      post.rotation.y = Math.random() * Math.PI;
      post.castShadow = true;
      this.group.add(post);

      // Horizontal rails
      if (i < count) {
        const segLen = dist / count;
        const midX = px + (dx / count) * 0.5;
        const midZ = pz + (dz / count) * 0.5;

        [0.4, 0.8].forEach(ry => {
          const railGeo = new THREE.BoxGeometry(segLen + 0.1, 0.08, 0.05);
          const rail = new THREE.Mesh(railGeo, this.mat.lightPlank);
          rail.position.set(midX, this.farmBaseY + ry, midZ);
          rail.rotation.y = -angle;
          rail.castShadow = true;
          this.group.add(rail);
        });
      }
    }
  }

  buildScarecrow() {
    // Scarecrow in the left wheat field (X: -4.5, Z: 14.5)
    const scarecrow = new THREE.Group();
    scarecrow.position.set(-4.5, this.farmBaseY, 14.5);

    // Main vertical wooden post
    const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6);
    const post = new THREE.Mesh(postGeo, this.mat.timberWood);
    post.position.y = 1.2;
    post.castShadow = true;
    scarecrow.add(post);

    // Cross beam (arms)
    const crossGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.8, 6);
    crossGeo.rotateZ(Math.PI / 2);
    const cross = new THREE.Mesh(crossGeo, this.mat.timberWood);
    cross.position.y = 1.6;
    cross.castShadow = true;
    scarecrow.add(cross);

    // Burlap head
    const headGeo = new THREE.SphereGeometry(0.24, 8, 8);
    const head = new THREE.Mesh(headGeo, this.mat.whiteCloth);
    head.position.y = 1.95;
    scarecrow.add(head);

    // Floppy hat
    const brimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.05, 8);
    const brim = new THREE.Mesh(brimGeo, this.mat.timberWood);
    brim.position.y = 2.12;
    brim.rotation.z = 0.15;
    scarecrow.add(brim);

    const crownGeo = new THREE.ConeGeometry(0.28, 0.45, 6);
    const crown = new THREE.Mesh(crownGeo, this.mat.thatchRoof);
    crown.position.y = 2.35;
    crown.rotation.z = 0.15;
    scarecrow.add(crown);

    // Patched blue coat
    const coatGeo = new THREE.CylinderGeometry(0.25, 0.35, 0.8, 6);
    const coat = new THREE.Mesh(coatGeo, this.mat.blueCloth);
    coat.position.y = 1.45;
    coat.castShadow = true;
    scarecrow.add(coat);

    // Straw sticking out of sleeves
    [-0.85, 0.85].forEach(sx => {
      const strawGeo = new THREE.ConeGeometry(0.12, 0.3, 4);
      strawGeo.rotateZ(sx < 0 ? Math.PI / 2 : -Math.PI / 2);
      const straw = new THREE.Mesh(strawGeo, this.mat.hay);
      straw.position.set(sx, 1.6, 0);
      scarecrow.add(straw);
    });

    this.group.add(scarecrow);
  }

  buildHayBales() {
    // Neatly stacked rectangular straw bales (干草垛)
    const balePositions = [
      { x: 3.5, z: 12.0, rot: 0.2 },
      { x: 3.8, z: 12.0, rot: 0.1 },
      { x: 3.65, z: 12.0, yOff: 0.45, rot: 0.15 },
      { x: 12.5, z: 14.0, rot: 0.4 },
      { x: 12.8, z: 15.0, rot: -0.2 },
    ];

    balePositions.forEach(b => {
      const baleGeo = new THREE.BoxGeometry(0.85, 0.45, 0.55);
      const bale = new THREE.Mesh(baleGeo, this.mat.hay);
      bale.position.set(b.x, this.farmBaseY + 0.22 + (b.yOff || 0), b.z);
      bale.rotation.y = b.rot;
      bale.castShadow = true;
      this.group.add(bale);
    });
  }

  buildBridges() {
    // 1. Rustic Arched Stone Bridge over canal (connecting Village stairs to lower farmland)
    const stoneBridge = new THREE.Group();
    stoneBridge.position.set(-12.8, 1.7, 3.8);
    stoneBridge.rotation.y = -0.3;

    // Arched road deck
    const deckGeo = new THREE.BoxGeometry(2.2, 0.25, 4.0);
    const deck = new THREE.Mesh(deckGeo, this.mat.castleStone);
    deck.castShadow = true;
    stoneBridge.add(deck);

    // Stone parapets
    [-1.0, 1.0].forEach(px => {
      const parapetGeo = new THREE.BoxGeometry(0.25, 0.6, 4.0);
      const parapet = new THREE.Mesh(parapetGeo, this.mat.castleDarkStone);
      parapet.position.set(px, 0.35, 0);
      parapet.castShadow = true;
      stoneBridge.add(parapet);
    });
    this.group.add(stoneBridge);

    // 2. Wooden footbridge crossing downstream canal in farmland (X: -10.5, Z: 14.5)
    const woodBridge = new THREE.Group();
    woodBridge.position.set(-10.5, this.farmBaseY + 0.15, 14.5);
    woodBridge.rotation.y = 0.2;

    const plankDeckGeo = new THREE.BoxGeometry(1.6, 0.12, 3.2);
    const plankDeck = new THREE.Mesh(plankDeckGeo, this.mat.lightPlank);
    plankDeck.castShadow = true;
    woodBridge.add(plankDeck);

    // Wooden handrails
    [-0.75, 0.75].forEach(rx => {
      // Posts
      [-1.3, 0, 1.3].forEach(pz => {
        const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 4);
        const post = new THREE.Mesh(postGeo, this.mat.timberWood);
        post.position.set(rx, 0.4, pz);
        woodBridge.add(post);
      });
      // Top rail
      const railGeo = new THREE.BoxGeometry(0.08, 0.08, 3.2);
      const rail = new THREE.Mesh(railGeo, this.mat.timberWood);
      rail.position.set(rx, 0.8, 0);
      woodBridge.add(rail);
    });
    this.group.add(woodBridge);
  }

  buildAnimals() {
    // Pasture zone on left flank (X: -21 to -15, Z: 11 to 21)
    // 1. Holstein Cow (Black & White spotted dairy cow)
    this.createCow(-18.5, 15.0, 0.4, true);
    // 2. Brown Jersey Cow
    this.createCow(-16.0, 18.5, -0.6, false);

    // Fluffy Sheep grazing on green clover pasture
    const sheepCoords = [
      { x: -19.5, z: 12.5, rot: 0.8 },
      { x: -16.8, z: 13.0, rot: -0.5 },
      { x: -20.0, z: 18.0, rot: 1.2 },
      { x: -17.5, z: 20.0, rot: -1.0 },
    ];

    sheepCoords.forEach(sc => {
      this.createSheep(sc.x, sc.z, sc.rot);
    });
  }

  createCow(x, z, rotY, isSpotted = true) {
    const cow = new THREE.Group();
    cow.position.set(x, this.farmBaseY, z);
    cow.rotation.y = rotY;

    const bodyMat = isSpotted ? this.mat.whiteCloth : this.mat.lightPlank;
    const spotMat = this.mat.outlineBlack;

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.2, 0.9, 1.8);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.95;
    body.castShadow = true;
    cow.add(body);

    if (isSpotted) {
      // Spots on cow
      const spot1Geo = new THREE.BoxGeometry(0.4, 0.4, 0.05);
      const spot1 = new THREE.Mesh(spot1Geo, spotMat);
      spot1.position.set(0.61, 1.05, 0.2);
      cow.add(spot1);

      const spot2 = spot1.clone();
      spot2.position.set(-0.61, 0.85, -0.3);
      cow.add(spot2);
    }

    // Head with subtle grazing bob animation
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.2, 0.95);

    const headGeo = new THREE.BoxGeometry(0.55, 0.6, 0.7);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0, 0, 0.25);
    head.castShadow = true;
    headGroup.add(head);

    // Pink muzzle
    const muzMat = new THREE.MeshToonMaterial({ color: 0xffb8b8, gradientMap: this.mat.gradientMap });
    const muzGeo = new THREE.BoxGeometry(0.45, 0.35, 0.3);
    const muz = new THREE.Mesh(muzGeo, muzMat);
    muz.position.set(0, -0.15, 0.65);
    headGroup.add(muz);

    // Horns
    [-0.28, 0.28].forEach(hx => {
      const hornGeo = new THREE.ConeGeometry(0.06, 0.25, 4);
      hornGeo.rotateZ(hx < 0 ? 0.3 : -0.3);
      const horn = new THREE.Mesh(hornGeo, this.mat.thatchRoof);
      horn.position.set(hx, 0.35, 0.2);
      headGroup.add(horn);
    });

    cow.add(headGroup);

    // 4 Legs
    [
      { lx: -0.45, lz: -0.65 },
      { lx: 0.45, lz: -0.65 },
      { lx: -0.45, lz: 0.65 },
      { lx: 0.45, lz: 0.65 },
    ].forEach(lp => {
      const legGeo = new THREE.BoxGeometry(0.2, 0.7, 0.2);
      const leg = new THREE.Mesh(legGeo, bodyMat);
      leg.position.set(lp.lx, 0.35, lp.lz);
      leg.castShadow = true;
      cow.add(leg);
    });

    this.group.add(cow);
    this.animals.push({ group: headGroup, baseRotX: 0.25, speed: 1.5, offset: Math.random() * 5 });
  }

  createSheep(x, z, rotY) {
    const sheep = new THREE.Group();
    sheep.position.set(x, this.farmBaseY, z);
    sheep.rotation.y = rotY;

    // Woolly fleece body (cloud of soft spheres)
    const bodyGeo = new THREE.DodecahedronGeometry(0.55, 1);
    bodyGeo.scale(1, 0.85, 1.25);
    const body = new THREE.Mesh(bodyGeo, this.mat.whiteCloth);
    body.position.y = 0.65;
    body.castShadow = true;
    sheep.add(body);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.68, 0.65);

    const headGeo = new THREE.BoxGeometry(0.3, 0.3, 0.35);
    const head = new THREE.Mesh(headGeo, this.mat.darkWindow);
    head.position.set(0, -0.05, 0.15);
    headGroup.add(head);

    // Ears
    [-0.18, 0.18].forEach(ex => {
      const earGeo = new THREE.BoxGeometry(0.12, 0.06, 0.08);
      const ear = new THREE.Mesh(earGeo, this.mat.darkWindow);
      ear.position.set(ex, 0.05, 0.05);
      headGroup.add(ear);
    });

    sheep.add(headGroup);

    // 4 Tiny Black Legs
    [
      { lx: -0.25, lz: -0.35 },
      { lx: 0.25, lz: -0.35 },
      { lx: -0.25, lz: 0.35 },
      { lx: 0.25, lz: 0.35 },
    ].forEach(lp => {
      const legGeo = new THREE.BoxGeometry(0.1, 0.4, 0.1);
      const leg = new THREE.Mesh(legGeo, this.mat.darkWindow);
      leg.position.set(lp.lx, 0.2, lp.lz);
      sheep.add(leg);
    });

    this.group.add(sheep);
    this.animals.push({ group: headGroup, baseRotX: 0.35, speed: 2.2, offset: Math.random() * 5 });
  }

  buildPerimeterForest() {
    // Stylized trees around perimeter and foothills
    const treePositions = [
      // Along back left / rear cliff
      { x: -22, z: -21, type: 'pine', scale: 1.3 },
      { x: -18, z: -22, type: 'pine', scale: 1.1 },
      { x: -14, z: -23, type: 'oak', scale: 1.2 },
      { x: 14, z: -23, type: 'pine', scale: 1.2 },
      { x: 19, z: -22, type: 'pine', scale: 1.4 },
      { x: 22, z: -20, type: 'oak', scale: 1.1 },
      // Left perimeter
      { x: -23, z: -10, type: 'oak', scale: 1.2 },
      { x: -22, z: -2, type: 'pine', scale: 1.1 },
      { x: -23, z: 6, type: 'oak', scale: 1.3 },
      { x: -23, z: 23, type: 'pine', scale: 1.2 },
      // Right perimeter
      { x: 23, z: -10, type: 'pine', scale: 1.2 },
      { x: 22, z: 3, type: 'oak', scale: 1.3 },
      { x: 21, z: 12, type: 'pine', scale: 1.1 },
      { x: 22, z: 21, type: 'oak', scale: 1.2 },
      // Front perimeter corners
      { x: -15, z: 23, type: 'oak', scale: 1.1 },
      { x: 15, z: 23, type: 'pine', scale: 1.2 },
      { x: -3, z: 23, type: 'oak', scale: 0.9 },
    ];

    treePositions.forEach(tp => {
      this.createStylizedTree(tp.x, tp.z, tp.type, tp.scale);
    });

    // Wildflowers & mushrooms in grassy patches
    for (let i = 0; i < 35; i++) {
      const flowerGeo = new THREE.DodecahedronGeometry(0.12, 0);
      const fCol = i % 3 === 0 ? 0xe74c3c : (i % 3 === 1 ? 0x3498db : 0xf1c40f);
      const flowerMat = new THREE.MeshToonMaterial({ color: fCol, gradientMap: this.mat.gradientMap });
      const flower = new THREE.Mesh(flowerGeo, flowerMat);
      
      const fx = (Math.random() - 0.5) * 44;
      const fz = Math.random() * 14 + 8;
      flower.position.set(fx, this.farmBaseY + 0.1, fz);
      this.group.add(flower);
    }
  }

  createStylizedTree(x, z, type, scale = 1.0) {
    const tree = new THREE.Group();
    // Estimate Y based on position
    let y = this.farmBaseY;
    if (z < -8) y = 4.8;
    else if (z < 6) y = 2.4;

    tree.position.set(x, y, z);

    if (type === 'pine') {
      // Conifer Pine Tree (stacked tiered cones)
      const trunkH = 1.6 * scale;
      const trunkGeo = new THREE.CylinderGeometry(0.18 * scale, 0.28 * scale, trunkH, 6);
      const trunk = new THREE.Mesh(trunkGeo, this.mat.treeTrunk);
      trunk.position.y = trunkH / 2;
      trunk.castShadow = true;
      tree.add(trunk);

      // 3 Tiered foliage cones
      const tiers = 3;
      for (let t = 0; t < tiers; t++) {
        const coneR = (1.5 - t * 0.35) * scale;
        const coneH = 1.8 * scale;
        const coneGeo = new THREE.ConeGeometry(coneR, coneH, 7);
        const foliage = new THREE.Mesh(coneGeo, this.mat.pineLeaves);
        foliage.position.y = trunkH + t * (1.1 * scale) + coneH / 2;
        foliage.castShadow = true;
        tree.add(foliage);
      }
    } else {
      // Deciduous Oak Tree (Puff foliage clusters)
      const trunkH = 2.0 * scale;
      const trunkGeo = new THREE.CylinderGeometry(0.22 * scale, 0.35 * scale, trunkH, 6);
      const trunk = new THREE.Mesh(trunkGeo, this.mat.treeTrunk);
      trunk.position.y = trunkH / 2;
      trunk.castShadow = true;
      tree.add(trunk);

      // Main puff + secondary puffs
      const leafMat = Math.random() > 0.3 ? this.mat.treeLeaves : this.mat.autumnLeaves;
      const puffOffsets = [
        { ox: 0, oy: trunkH + 1.2 * scale, oz: 0, r: 1.4 * scale },
        { ox: 0.6 * scale, oy: trunkH + 0.9 * scale, oz: 0.4 * scale, r: 0.9 * scale },
        { ox: -0.5 * scale, oy: trunkH + 1.0 * scale, oz: -0.3 * scale, r: 1.0 * scale },
        { ox: 0.2 * scale, oy: trunkH + 1.8 * scale, oz: -0.2 * scale, r: 1.1 * scale },
      ];

      puffOffsets.forEach(po => {
        const puffGeo = new THREE.DodecahedronGeometry(po.r, 1);
        const puff = new THREE.Mesh(puffGeo, leafMat);
        puff.position.set(po.ox, po.oy, po.oz);
        puff.castShadow = true;
        tree.add(puff);
      });
    }

    this.group.add(tree);
    this.trees.push({
      group: tree,
      baseRotX: 0,
      baseRotZ: 0,
      swaySpeed: 1.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    });
  }

  update(time) {
    // 1. Wheat waving animation (updates uniform in vertex shader)
    if (this.wheatMesh && this.wheatMesh.material.userData.shader) {
      this.wheatMesh.material.userData.shader.uniforms.uTime.value = time;
    }

    // 2. Tree gentle wind sway
    this.trees.forEach(t => {
      const sway = Math.sin(time * t.swaySpeed + t.phase) * 0.025;
      t.group.rotation.z = sway;
      t.group.rotation.x = sway * 0.5;
    });

    // 3. Animal grazing head bobs
    this.animals.forEach(a => {
      const bob = Math.sin(time * a.speed + a.offset) * 0.15;
      a.group.rotation.x = a.baseRotX + bob;
    });
  }
}
