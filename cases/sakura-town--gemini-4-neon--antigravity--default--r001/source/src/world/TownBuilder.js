import * as THREE from 'three';
import {
  createToonMaterial,
  createWoodTexture,
  createRoofTileTexture,
  createTatamiTexture,
  createShojiTexture,
  createSignTexture,
  createNorenTexture,
} from '../art/ToonMaterials.js';
import {
  createUtilityPole,
  createPowerLines,
  createVendingMachine,
  createPostbox,
  createStreetLamp,
  createConvexMirror,
  createNoticeBoard,
  createBicycle,
  createSakuraTree,
  createBench,
} from '../art/PropBuilders.js';

export class TownBuilder {
  constructor(scene, collision) {
    this.scene = scene;
    this.collision = collision;
    this.enterableBuildings = [];
    this.nightLights = [];
    this.nightWindows = [];
    this.barberPole = null;
    this.benches = [];
    this.landmarks = {};
  }

  build() {
    this._buildKomorebiBakery();
    this._buildAobaGeneralStore();
    this._buildPlayerCottage();
    this._buildDecorativeTownhouses();
    this._buildStreetDetails();
  }

  _createGableRoof(width, depth, ridgeHeight, tileColor = '#465266', highlightColor = '#606f88') {
    const group = new THREE.Group();
    const roofTex = createRoofTileTexture(tileColor, highlightColor, 3, 2);
    const roofMat = createToonMaterial(0xffffff, { map: roofTex, side: THREE.DoubleSide });
    const fasciaMat = createToonMaterial(0x5d4330);

    const overhangW = width + 1.0;
    const overhangD = depth + 1.0;
    const halfD = overhangD / 2;
    const slopeLen = Math.sqrt(halfD * halfD + ridgeHeight * ridgeHeight);
    const angle = Math.atan2(ridgeHeight, halfD);

    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(overhangW, 0.18, slopeLen), roofMat);
      panel.position.set(0, ridgeHeight * 0.5, side * (halfD * 0.5));
      panel.rotation.x = side * angle;
      panel.castShadow = true;
      panel.receiveShadow = true;
      group.add(panel);
    }

    const shape = new THREE.Shape();
    shape.moveTo(-depth / 2, 0);
    shape.lineTo(depth / 2, 0);
    shape.lineTo(0, ridgeHeight);
    shape.closePath();
    const gableGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: false });
    const gableMat = createToonMaterial(0xf7efe2);

    for (const sx of [-width / 2, width / 2 - 0.22]) {
      const gable = new THREE.Mesh(gableGeo, gableMat);
      gable.rotation.y = Math.PI / 2;
      gable.position.set(sx, 0, 0);
      group.add(gable);
    }

    const ridge = new THREE.Mesh(new THREE.BoxGeometry(overhangW + 0.15, 0.22, 0.28), fasciaMat);
    ridge.position.y = ridgeHeight + 0.05;
    group.add(ridge);
    return group;
  }

  _buildHollowRoom({ cx, cz, width, depth, wallH, doorSide, doorWidth = 1.9, wallMat, floorMat }) {
    const group = new THREE.Group();
    const t = 0.26;

    const floor = new THREE.Mesh(new THREE.BoxGeometry(width, 0.16, depth), floorMat);
    floor.position.set(cx, 0.08, cz);
    floor.receiveShadow = true;
    group.add(floor);

    const addWallSeg = (x, z, w, d, h = wallH, yCenter = wallH / 2 + 0.12) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      mesh.position.set(x, yCenter, z);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      group.add(mesh);
      return mesh;
    };

    const halfW = width / 2;
    const halfD = depth / 2;

    addWallSeg(cx - halfW + t / 2, cz, t, depth);
    addWallSeg(cx + halfW - t / 2, cz, t, depth);
    this.collision.addBoxCenter(cx - halfW + t / 2, cz, t + 0.1, depth);
    this.collision.addBoxCenter(cx + halfW - t / 2, cz, t + 0.1, depth);

    const buildFrontOrBack = (zPos, hasDoor) => {
      if (!hasDoor) {
        addWallSeg(cx, zPos, width, t);
        this.collision.addBoxCenter(cx, zPos, width, t + 0.1);
      } else {
        const sideW = (width - doorWidth) / 2;
        addWallSeg(cx - halfW + sideW / 2, zPos, sideW, t);
        addWallSeg(cx + halfW - sideW / 2, zPos, sideW, t);
        const doorH = 2.3;
        addWallSeg(cx, zPos, doorWidth, t, wallH - doorH, doorH + (wallH - doorH) / 2 + 0.12);
        this.collision.addBoxCenter(cx - halfW + sideW / 2, zPos, sideW, t + 0.1);
        this.collision.addBoxCenter(cx + halfW - sideW / 2, zPos, sideW, t + 0.1);
      }
    };

    buildFrontOrBack(cz - halfD + t / 2, doorSide === 'north');
    buildFrontOrBack(cz + halfD - t / 2, doorSide === 'south');
    return group;
  }

  _buildKomorebiBakery() {
    const cx = -11.5;
    const cz = 9.2;
    const width = 8.4;
    const depth = 6.8;
    const wallH = 3.5;

    const group = new THREE.Group();
    const plasterMat = createToonMaterial(0xfbf1df);
    const woodFloorMat = createToonMaterial(0xffffff, { map: createWoodTexture('#c79667', '#a6764c', 3, 3) });
    const woodTrim = createToonMaterial(0x7c5234);

    group.add(this._buildHollowRoom({ cx, cz, width, depth, wallH, doorSide: 'north', doorWidth: 2.0, wallMat: plasterMat, floorMat: woodFloorMat }));

    const awning = new THREE.Mesh(new THREE.BoxGeometry(width - 0.35, 0.16, 1.25), createToonMaterial(0xe0788d));
    awning.position.set(cx, 2.7, cz - depth / 2 - 0.55);
    awning.rotation.x = 0.28;
    awning.castShadow = true;
    group.add(awning);

    // Cleanly positioned signboard below eaves with zero z-overlap
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.82, 0.14),
      createToonMaterial(0xffffff, { map: createSignTexture('木漏れ日', '手工面包 · 咖啡', '#fff9ee', '#4e3529', '#d87088') })
    );
    sign.position.set(cx, 3.22, cz - depth / 2 - 0.18);
    group.add(sign);

    const glassMat = createToonMaterial(0xdbf0ff, { transparent: true, opacity: 0.45, emissive: 0xffd79e, emissiveIntensity: 0.18 });
    this.nightWindows.push(glassMat);
    for (const wx of [cx - 2.6, cx + 2.6]) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.5, 0.12), glassMat);
      win.position.set(wx, 1.75, cz - depth / 2 - 0.02);
      group.add(win);
    }

    const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.95, 2.25, 0.1), createToonMaterial(0xffffff, { map: createShojiTexture() }));
    doorMesh.position.set(cx, 1.24, cz - depth / 2 + 0.14);
    group.add(doorMesh);

    const roofGroup = this._createGableRoof(width, depth, 2.2, '#8b4b43', '#a75e54');
    roofGroup.position.set(cx, wallH + 0.12, cz);
    group.add(roofGroup);

    const counter = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.05, 0.95), woodTrim);
    counter.position.set(cx - 1.2, 0.68, cz + 1.4);
    counter.castShadow = true;
    group.add(counter);
    this.collision.addBoxCenter(cx - 1.2, cz + 1.4, 4.2, 0.95);

    const breadColors = [0xe8b058, 0xf2a0b4, 0xd88f42, 0xf5d498];
    for (let i = 0; i < 6; i++) {
      const loaf = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), createToonMaterial(breadColors[i % breadColors.length]));
      loaf.scale.set(1.1, 0.65, 0.9);
      loaf.position.set(cx - 2.6 + i * 0.56, 1.3, cz + 1.32);
      group.add(loaf);
    }

    const espresso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.52, 0.45), createToonMaterial(0xc84d4d));
    espresso.position.set(cx + 0.4, 1.46, cz + 1.45);
    group.add(espresso);

    for (const tz of [cz - 0.9, cz + 1.3]) {
      const table = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.08, 12), createToonMaterial(0xc99666));
      table.position.set(cx + 2.45, 0.88, tz);
      group.add(table);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.16, 0.72, 8), woodTrim);
      leg.position.set(cx + 2.45, 0.52, tz);
      group.add(leg);
      this.collision.addCircle(cx + 2.45, tz, 0.55);
    }

    const interiorLight = new THREE.PointLight(0xffd79e, 1.35, 11, 1.4);
    interiorLight.position.set(cx, 2.9, cz);
    group.add(interiorLight);

    const bike = createBicycle(0xf0859b);
    bike.position.set(cx - 4.7, 0.02, cz - 2.6);
    bike.rotation.y = 0.3;
    group.add(bike);
    this.collision.addCircle(cx - 4.7, cz - 2.6, 0.65);

    this.scene.add(group);
    this.collision.addCameraBox(cx - width / 2 - 0.7, 0, cz - depth / 2 - 0.7, cx + width / 2 + 0.7, wallH + 2.6, cz + depth / 2 + 0.7, 'bakery');
    this.enterableBuildings.push({
      id: 'bakery',
      name: '「木漏れ日」面包咖啡馆',
      bounds: { minX: cx - width / 2 + 0.15, maxX: cx + width / 2 - 0.15, minZ: cz - depth / 2 + 0.15, maxZ: cz + depth / 2 - 0.15 },
      doorCenter: new THREE.Vector3(cx, 0, cz - depth / 2),
      roofGroup, doorMesh, doorClosedX: cx, doorOpenX: cx + 1.55, doorOpenProgress: 0, wasOpen: false, interiorLight,
    });
  }

  _buildAobaGeneralStore() {
    const cx = 10.2;
    const cz = 9.2;
    const width = 8.0;
    const depth = 6.6;
    const wallH = 3.5;

    const group = new THREE.Group();
    const woodWallMat = createToonMaterial(0xffffff, { map: createWoodTexture('#997352', '#7a593d', 3, 2) });
    const floorMat = createToonMaterial(0xffffff, { map: createWoodTexture('#b8946e', '#997754', 3, 3) });

    group.add(this._buildHollowRoom({ cx, cz, width, depth, wallH, doorSide: 'north', doorWidth: 2.0, wallMat: woodWallMat, floorMat }));

    const noren = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 0.85),
      createToonMaterial(0xffffff, { map: createNorenTexture('青 葉', '#345c84', '#fff9ee'), side: THREE.DoubleSide })
    );
    noren.position.set(cx, 2.38, cz - depth / 2 - 0.25);
    group.add(noren);

    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.82, 0.14),
      createToonMaterial(0xffffff, { map: createSignTexture('青葉商店', '日用杂货 · 钓具 · 零食', '#f4efe2', '#2b4238', '#4d8262') })
    );
    sign.position.set(cx, 3.2, cz - depth / 2 - 0.18);
    group.add(sign);

    const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.95, 2.25, 0.1), createToonMaterial(0xffffff, { map: createShojiTexture() }));
    doorMesh.position.set(cx, 1.24, cz - depth / 2 + 0.14);
    group.add(doorMesh);

    const roofGroup = this._createGableRoof(width, depth, 2.1, '#435854', '#58706b');
    roofGroup.position.set(cx, wallH + 0.12, cz);
    group.add(roofGroup);

    const counterMat = createToonMaterial(0x7c5639);
    const counter = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 0.85), counterMat);
    counter.position.set(cx + 1.5, 0.66, cz + 1.5);
    group.add(counter);
    this.collision.addBoxCenter(cx + 1.5, cz + 1.5, 3.2, 0.85);

    const catBody = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), createToonMaterial(0xfffaf0));
    catBody.position.set(cx + 0.5, 1.32, cz + 1.38);
    group.add(catBody);

    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2.1, 4.4), counterMat);
    shelf.position.set(cx - 3.3, 1.22, cz + 0.4);
    group.add(shelf);
    this.collision.addBoxCenter(cx - 3.3, cz + 0.4, 0.7, 4.4);

    const jarColors = [0xf28c8c, 0x7ac98d, 0xf2c95c, 0x7ab4e8, 0xe89ec4];
    for (let i = 0; i < 8; i++) {
      const jar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.3, 0.34), createToonMaterial(jarColors[i % jarColors.length]));
      jar.position.set(cx - 3.1, 0.94 + (i % 2) * 0.62, cz - 1.2 + Math.floor(i / 2) * 0.95);
      group.add(jar);
    }

    const frontBench = createBench();
    frontBench.position.set(cx + 2.4, 0, cz - depth / 2 - 0.75);
    frontBench.rotation.y = Math.PI;
    group.add(frontBench);
    this.collision.addBoxCenter(cx + 2.4, cz - depth / 2 - 0.75, 1.9, 0.65);
    this.benches.push({
      id: 'bench_aoba', label: '坐在青叶商店门前纳凉', x: cx + 2.4, y: 0, z: cz - depth / 2 - 0.75,
      sitPos: new THREE.Vector3(cx + 2.4, 0.48, cz - depth / 2 - 0.85), facingYaw: Math.PI,
    });

    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.48), createToonMaterial(0xd64b4b));
    crate.position.set(cx - 2.9, 0.24, cz - depth / 2 - 0.55);
    crate.castShadow = true;
    group.add(crate);

    const interiorLight = new THREE.PointLight(0xffe0a8, 1.3, 11, 1.4);
    interiorLight.position.set(cx, 2.85, cz);
    group.add(interiorLight);

    this.scene.add(group);
    this.collision.addCameraBox(cx - width / 2 - 0.7, 0, cz - depth / 2 - 0.7, cx + width / 2 + 0.7, wallH + 2.6, cz + depth / 2 + 0.7, 'general_store');
    this.enterableBuildings.push({
      id: 'general_store',
      name: '「青叶商店」杂货铺',
      bounds: { minX: cx - width / 2 + 0.15, maxX: cx + width / 2 - 0.15, minZ: cz - depth / 2 + 0.15, maxZ: cz + depth / 2 - 0.15 },
      doorCenter: new THREE.Vector3(cx, 0, cz - depth / 2),
      roofGroup, doorMesh, doorClosedX: cx, doorOpenX: cx + 1.55, doorOpenProgress: 0, wasOpen: false, interiorLight,
    });
  }

  _buildPlayerCottage() {
    const cx = -13.0;
    const cz = -6.8;
    const width = 7.4;
    const depth = 6.2;
    const wallH = 3.3;

    const group = new THREE.Group();
    const stuccoMat = createToonMaterial(0xf7f2e8);
    const tatamiMat = createToonMaterial(0xffffff, { map: createTatamiTexture(3, 3) });

    group.add(this._buildHollowRoom({ cx, cz, width, depth, wallH, doorSide: 'south', doorWidth: 1.9, wallMat: stuccoMat, floorMat: tatamiMat }));

    const engawa = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.4, 0.18, 1.1),
      createToonMaterial(0xffffff, { map: createWoodTexture('#a87950', '#875c38', 3, 1) })
    );
    engawa.position.set(cx, 0.09, cz + depth / 2 + 0.45);
    engawa.receiveShadow = true;
    group.add(engawa);

    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.42, 0.08),
      createToonMaterial(0xffffff, { map: createSignTexture('樱花小筑', '我的家', '#f5e8d0', '#453226', '#d87088') })
    );
    plate.position.set(cx + 1.75, 1.65, cz + depth / 2 + 0.08);
    group.add(plate);

    const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.88, 2.2, 0.1), createToonMaterial(0xffffff, { map: createShojiTexture() }));
    doorMesh.position.set(cx, 1.22, cz + depth / 2 - 0.14);
    group.add(doorMesh);

    const roofGroup = this._createGableRoof(width, depth, 2.15, '#465266', '#5f6f8a');
    roofGroup.position.set(cx, wallH + 0.12, cz);
    group.add(roofGroup);

    const chabudai = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.38, 1.0), createToonMaterial(0x8e5c3a));
    chabudai.position.set(cx + 0.8, 0.36, cz - 0.1);
    chabudai.castShadow = true;
    group.add(chabudai);
    this.collision.addBoxCenter(cx + 0.8, cz - 0.1, 1.4, 1.0);

    const teapot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), createToonMaterial(0x528264));
    teapot.position.set(cx + 0.8, 0.66, cz - 0.1);
    group.add(teapot);

    const futonMat = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.18, 2.2), createToonMaterial(0xf7f3eb));
    futonMat.position.set(cx - 2.1, 0.26, cz - 0.8);
    group.add(futonMat);
    const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.16, 1.55), createToonMaterial(0xea9bb0));
    blanket.position.set(cx - 2.1, 0.36, cz - 0.45);
    group.add(blanket);
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.16, 0.35), createToonMaterial(0xfffdf8));
    pillow.position.set(cx - 2.1, 0.39, cz - 1.6);
    group.add(pillow);

    const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.75, 0.45), createToonMaterial(0x845a3c));
    shelf.position.set(cx + 1.8, 1.04, cz - 2.55);
    group.add(shelf);
    this.collision.addBoxCenter(cx + 1.8, cz - 2.55, 1.6, 0.55);

    const interiorLight = new THREE.PointLight(0xffdba6, 1.25, 10, 1.4);
    interiorLight.position.set(cx, 2.75, cz);
    group.add(interiorLight);

    const gardenTree = createSakuraTree(0.88, 11);
    gardenTree.position.set(cx - 4.7, 0, cz + 1.2);
    group.add(gardenTree);
    this.collision.addCircle(cx - 4.7, cz + 1.2, 0.5);

    this.scene.add(group);
    this.collision.addCameraBox(cx - width / 2 - 0.7, 0, cz - depth / 2 - 0.7, cx + width / 2 + 0.7, wallH + 2.5, cz + depth / 2 + 0.7, 'cottage');
    this.landmarks.futon = new THREE.Vector3(cx - 2.1, 0.2, cz - 0.8);
    this.enterableBuildings.push({
      id: 'cottage',
      name: '樱花小筑（我的家）',
      bounds: { minX: cx - width / 2 + 0.15, maxX: cx + width / 2 - 0.15, minZ: cz - depth / 2 + 0.15, maxZ: cz + depth / 2 - 0.15 },
      doorCenter: new THREE.Vector3(cx, 0, cz + depth / 2),
      roofGroup, doorMesh, doorClosedX: cx, doorOpenX: cx + 1.48, doorOpenProgress: 0, wasOpen: false, interiorLight,
    });
  }

  _buildDecorativeTownhouses() {
    this._createSimpleHouse({ cx: -22.2, cz: 9.4, w: 6.4, d: 6.2, h: 4.4, wallColor: 0xeaf2f6, roofA: '#4e677a', roofB: '#66849a', signTitle: '樱花理发', signSub: 'BARBER', signZSide: -1 });
    const poleGroup = new THREE.Group();
    poleGroup.position.set(-19.5, 1.45, 5.95);
    const poleBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.82, 10),
      createToonMaterial(0xffffff, { map: createNorenTexture('///', '#e64d54', '#3c78c8') })
    );
    poleGroup.add(poleBody);
    const capT = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), createToonMaterial(0xd8dde4));
    capT.position.y = 0.44;
    poleGroup.add(capT);
    this.scene.add(poleGroup);
    this.barberPole = poleBody;

    this._createSimpleHouse({ cx: 10.6, cz: -6.8, w: 7.2, d: 6.0, h: 3.8, wallColor: 0xf7eee6, roofA: '#8c4b45', roofB: '#a85f58', signTitle: '樱花邮局', signSub: '〒 POST', signZSide: 1 });
    this._createSimpleHouse({ cx: -23.5, cz: -7.0, w: 5.8, d: 5.6, h: 4.6, wallColor: 0xf7f5ef, roofA: '#3d4554', roofB: '#515c6e', signTitle: '', signSub: '', signZSide: 1 });
    this._createSimpleHouse({ cx: -0.6, cz: 14.8, w: 7.8, d: 6.2, h: 4.9, wallColor: 0xf0e4d2, roofA: '#515a68', roofB: '#697485', signTitle: '', signSub: '', signZSide: -1 });
  }

  _createSimpleHouse({ cx, cz, w, d, h, wallColor, roofA, roofB, signTitle, signSub, signZSide }) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), createToonMaterial(wallColor));
    body.position.set(cx, h / 2, cz);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const roof = this._createGableRoof(w, d, 2.0, roofA, roofB);
    roof.position.set(cx, h, cz);
    group.add(roof);

    const winMat = createToonMaterial(0xc8dfef, { emissive: 0xffd084, emissiveIntensity: 0.05 });
    this.nightWindows.push(winMat);
    const frontZ = cz + signZSide * (d / 2 + 0.04);
    for (const wx of [-w * 0.25, w * 0.25]) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.05, 0.08), winMat);
      win.position.set(cx + wx, h > 4.2 ? 3.1 : 1.9, frontZ);
      group.add(win);
    }

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.1, 0.1), createToonMaterial(0x7c5438));
    door.position.set(cx, 1.05, frontZ);
    group.add(door);

    if (signTitle) {
      const sign = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.74, 0.12),
        createToonMaterial(0xffffff, { map: createSignTexture(signTitle, signSub) })
      );
      sign.position.set(cx, h - 0.72, frontZ + signZSide * 0.08);
      group.add(sign);
    }

    this.scene.add(group);
    this.collision.addBoxCenter(cx, cz, w + 0.2, d + 0.2);
    this.collision.addCameraBox(cx - w / 2 - 0.65, 0, cz - d / 2 - 0.65, cx + w / 2 + 0.65, h + 2.4, cz + d / 2 + 0.65, null);
  }

  _buildStreetDetails() {
    const vending = createVendingMachine();
    vending.position.set(4.6, 0, 5.5);
    vending.rotation.y = Math.PI;
    this.scene.add(vending);
    this.collision.addBoxCenter(4.6, 5.5, 1.5, 0.9);
    this.landmarks.vending = new THREE.Vector3(4.6, 0, 4.9);

    const postbox = createPostbox();
    postbox.position.set(6.2, 0, -3.4);
    this.scene.add(postbox);
    this.collision.addCircle(6.2, -3.4, 0.4);
    this.landmarks.postbox = new THREE.Vector3(6.2, 0, -3.4);

    const noticeBoard = createNoticeBoard();
    noticeBoard.position.set(-4.8, 0, -2.2);
    noticeBoard.rotation.y = 0.28;
    this.scene.add(noticeBoard);
    this.collision.addBoxCenter(-4.8, -2.2, 2.0, 0.5);
    this.landmarks.noticeBoard = new THREE.Vector3(-4.8, 0, -2.2);

    const mirror = createConvexMirror();
    mirror.position.set(3.6, 0, -1.6);
    mirror.rotation.y = -Math.PI * 0.75;
    this.scene.add(mirror);
    this.collision.addCircle(3.6, -1.6, 0.25);

    const streetPoles = [
      new THREE.Vector3(-25, 0, -1.2), new THREE.Vector3(-7, 0, -1.2),
      new THREE.Vector3(4.2, 0, -1.2), new THREE.Vector3(17.5, 0, -1.2),
    ];
    streetPoles.forEach((p, i) => {
      const pole = createUtilityPole(i === 1);
      pole.position.copy(p);
      this.scene.add(pole);
      this.collision.addCircle(p.x, p.z, 0.28);
    });
    this.scene.add(createPowerLines(streetPoles));

    const stationPoles = [new THREE.Vector3(3.8, 0, -12.8), new THREE.Vector3(3.8, 0, -23.5)];
    stationPoles.forEach((p) => {
      const pole = createUtilityPole(false);
      pole.position.copy(p);
      pole.rotation.y = Math.PI / 2;
      this.scene.add(pole);
      this.collision.addCircle(p.x, p.z, 0.28);
    });
    this.scene.add(createPowerLines([streetPoles[2], ...stationPoles]));

    const lampSpecs = [
      { x: -16.5, z: 5.0, rot: -Math.PI / 2 }, { x: -3.8, z: 5.2, rot: -Math.PI / 2 },
      { x: 16.5, z: 5.2, rot: -Math.PI / 2 }, { x: -3.5, z: -12.5, rot: 0 },
      { x: 18.8, z: -0.6, rot: Math.PI / 2 }, { x: 18.8, z: 12.2, rot: Math.PI / 2 },
    ];
    for (const s of lampSpecs) {
      const lamp = createStreetLamp();
      lamp.position.set(s.x, 0, s.z);
      lamp.rotation.y = s.rot;
      this.scene.add(lamp);
      this.collision.addCircle(s.x, s.z, 0.22);
      this.nightLights.push(lamp.userData.lampLight);
    }

    [{ x: -6.2, z: 6.8, s: 0.92 }, { x: 17.0, z: -4.2, s: 1.02 }, { x: -18.5, z: -1.5, s: 0.92 }].forEach((t, idx) => {
      const tree = createSakuraTree(t.s, 20 + idx);
      tree.position.set(t.x, 0, t.z);
      this.scene.add(tree);
      this.collision.addCircle(t.x, t.z, 0.45);
    });
  }

  update(dt, playerPos, nightFactor, audio) {
    let currentBuilding = null;
    for (const b of this.enterableBuildings) {
      const inside =
        playerPos.x >= b.bounds.minX && playerPos.x <= b.bounds.maxX &&
        playerPos.z >= b.bounds.minZ && playerPos.z <= b.bounds.maxZ;
      if (inside) currentBuilding = b;
      b.roofGroup.visible = !inside;

      const shouldOpen = playerPos.distanceTo(b.doorCenter) < 2.6;
      if (shouldOpen && !b.wasOpen && audio) audio.playDoorChime();
      b.wasOpen = shouldOpen;

      b.doorOpenProgress += ((shouldOpen ? 1 : 0) - b.doorOpenProgress) * Math.min(1, dt * 8);
      b.doorMesh.position.x = THREE.MathUtils.lerp(b.doorClosedX, b.doorOpenX, b.doorOpenProgress);
      b.interiorLight.intensity = 1.15 + nightFactor * 1.1;
    }

    for (const light of this.nightLights) light.intensity = nightFactor * 2.4;
    for (const mat of this.nightWindows) mat.emissiveIntensity = 0.06 + nightFactor * 0.85;
    if (this.barberPole) this.barberPole.rotation.y += dt * 1.8;

    return currentBuilding;
  }
}
