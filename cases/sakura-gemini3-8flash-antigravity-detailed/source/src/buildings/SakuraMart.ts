// src/buildings/SakuraMart.ts
// Fully enterable Japanese convenience store (24H コンビニ) with automatic sliding doors,
// illuminated coolers, snack aisles, checkout counter, microwave, and part-time shift station.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { audio } from '../engine/AudioSynthesizer';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class SakuraMart {
  public group: THREE.Group;
  public storePos: THREE.Vector3 = new THREE.Vector3(40, 0, 5);

  // Automatic sliding doors
  private doorLeft: THREE.Mesh;
  private doorRight: THREE.Mesh;
  private doorOpenProgress: number = 0; // 0 = closed, 1 = fully open
  private doorChimePlayed: boolean = false;

  // Interaction triggers
  public checkoutCounterPos: THREE.Vector3;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    this.group.position.copy(this.storePos);
    scene.add(this.group);

    this.checkoutCounterPos = new THREE.Vector3(this.storePos.x + 3.0, 0.9, this.storePos.z + 1.5);

    // 1. Store Shell (Floor, Walls, Ceiling, Roof)
    this.createStoreStructure(lighting);

    // 2. Automatic Sliding Doors
    const { dL, dR } = this.createAutomaticDoors();
    this.doorLeft = dL;
    this.doorRight = dR;

    // 3. Interior Fixtures (Coolers, Shelves, Bento Island, Cashier Counter)
    this.createInteriorFixtures(lighting);

    // 4. Exterior Props (Parking lot, Trash sorting station)
    this.createExteriorProps();
  }

  private createStoreStructure(lighting: LightingSky): void {
    // Dimensions: Width: 14m (X: -7 to 7), Depth: 11m (Z: -5.5 to 5.5), Height: 4.2m
    const wallMat = CelShaders.createToonMaterial(0xf5f6fa); // White clean panels
    const floorMat = CelShaders.createToonMaterial(0xdcdde1); // Cream ceramic floor tiles
    const ceilingMat = CelShaders.createToonMaterial(0xffffff);
    const roofMat = CelShaders.createToonMaterial(0x718093);

    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(13.8, 10.8), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.05;
    floor.receiveShadow = true;
    this.group.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 11), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4.0;
    this.group.add(ceiling);

    // Roof parapet
    const roof = new THREE.Mesh(new THREE.BoxGeometry(14.4, 0.6, 11.4), roofMat);
    roof.position.y = 4.3;
    this.group.add(roof);

    // Rear wall (East, X = 7.0)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.0, 11), wallMat);
    backWall.position.set(7.0, 2.0, 0);
    this.group.add(backWall);

    // North wall (Z = -5.5)
    const northWall = new THREE.Mesh(new THREE.BoxGeometry(14, 4.0, 0.3), wallMat);
    northWall.position.set(0, 2.0, -5.5);
    this.group.add(northWall);

    // South wall (Z = 5.5)
    const southWall = new THREE.Mesh(new THREE.BoxGeometry(14, 4.0, 0.3), wallMat);
    southWall.position.set(0, 2.0, 5.5);
    this.group.add(southWall);

    // Front facade (West, facing main road at X = -7.0)
    // Left glass section (Z: -5.5 to -1.5)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xecf0f1,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1
    });

    const frontGlassLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.2, 4.0), glassMat);
    frontGlassLeft.position.set(-7.0, 1.8, -3.5);
    this.group.add(frontGlassLeft);

    // Right glass section (Z: 1.5 to 5.5)
    const frontGlassRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.2, 4.0), glassMat);
    frontGlassRight.position.set(-7.0, 1.8, 3.5);
    this.group.add(frontGlassRight);

    // Front lintel & signboard above entrance (X = -7.1, Y = 3.6)
    const signMat = new THREE.MeshBasicMaterial({ map: TextureGenerator.createSakuraMartSign() });
    const mainSign = new THREE.Mesh(new THREE.PlaneGeometry(14.2, 1.4), signMat);
    mainSign.rotation.y = -Math.PI / 2;
    mainSign.position.set(-7.22, 3.5, 0);
    this.group.add(mainSign);

    // Bright interior fluorescent tube lights
    for (const z of [-3, 0, 3]) {
      const tubeLight = new THREE.PointLight(0xffffff, 0.8, 12, 1.5);
      tubeLight.position.set(0, 3.8, z);
      this.group.add(tubeLight);
    }

    // Outer wall physics colliders
    physics.addCollider(new THREE.Vector3(this.storePos.x + 6.8, 0, this.storePos.z - 5.6), new THREE.Vector3(this.storePos.x + 7.3, 4, this.storePos.z + 5.6));
    physics.addCollider(new THREE.Vector3(this.storePos.x - 7.2, 0, this.storePos.z - 5.6), new THREE.Vector3(this.storePos.x + 7.2, 4, this.storePos.z - 5.2));
    physics.addCollider(new THREE.Vector3(this.storePos.x - 7.2, 0, this.storePos.z + 5.2), new THREE.Vector3(this.storePos.x + 7.2, 4, this.storePos.z + 5.6));
    // Front window colliders
    physics.addCollider(new THREE.Vector3(this.storePos.x - 7.3, 0, this.storePos.z - 5.5), new THREE.Vector3(this.storePos.x - 6.8, 4, this.storePos.z - 1.5));
    physics.addCollider(new THREE.Vector3(this.storePos.x - 7.3, 0, this.storePos.z + 1.5), new THREE.Vector3(this.storePos.x - 6.8, 4, this.storePos.z + 5.5));
  }

  private createAutomaticDoors(): { dL: THREE.Mesh; dR: THREE.Mesh } {
    const doorFrameMat = CelShaders.createToonMaterial(0x2f3640);
    const doorGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x90caf9,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1
    });

    // Left sliding leaf (1.4m wide, 2.6m high)
    const dL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.6, 1.35), doorGlassMat);
    dL.position.set(-7.0, 1.3, -0.7);
    this.group.add(dL);

    // Right sliding leaf
    const dR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.6, 1.35), doorGlassMat);
    dR.position.set(-7.0, 1.3, 0.7);
    this.group.add(dR);

    // Door motion sensor box above header
    const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.3), doorFrameMat);
    sensor.position.set(-7.15, 2.7, 0);
    this.group.add(sensor);

    return { dL, dR };
  }

  private createInteriorFixtures(lighting: LightingSky): void {
    // 1. Back Wall Refrigerated Drink Coolers (East wall, X: 6.2, Z: -4.5 to 4.5)
    const coolerMat = CelShaders.createToonMaterial(0x2c3e50);
    const coolerBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.6, 9.2), coolerMat);
    coolerBody.position.set(6.2, 1.3, 0);
    this.group.add(coolerBody);

    // Illuminated glass front panels with drinks
    const coolerGlassMat = new THREE.MeshBasicMaterial({ color: 0x48dbfb, transparent: true, opacity: 0.6 });
    const coolerGlass = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 2.3), coolerGlassMat);
    coolerGlass.rotation.y = -Math.PI / 2;
    coolerGlass.position.set(5.55, 1.3, 0);
    this.group.add(coolerGlass);

    // 2. Central Snack & Noodle Double Gondola Shelves (X: 0 to 2, Z: -3.5 to 3.5)
    const shelfMat = CelShaders.createToonMaterial(0xecf0f1);
    const itemColorMats = [
      CelShaders.createToonMaterial(0xe74c3c), // Red spicy chips
      CelShaders.createToonMaterial(0xf1c40f), // Yellow ramen
      CelShaders.createToonMaterial(0x2ecc71), // Green tea snacks
      CelShaders.createToonMaterial(0x3498db)  // Blue soda candy
    ];

    for (const sx of [0.5, -2.5]) {
      const gondola = new THREE.Group();
      gondola.position.set(sx, 0, -1.0);

      // Main frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 5.0), shelfMat);
      frame.position.y = 0.8;
      frame.castShadow = true;
      gondola.add(frame);

      // Shelved items
      for (let level = 0; level < 3; level++) {
        const ly = 0.4 + level * 0.45;
        for (let iz = -2.0; iz <= 2.0; iz += 0.8) {
          const item = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.5), itemColorMats[(level + Math.floor(iz)) % 4]);
          item.position.set(-0.4, ly, iz);
          gondola.add(item);

          const itemBack = item.clone();
          itemBack.position.x = 0.4;
          gondola.add(itemBack);
        }
      }

      this.group.add(gondola);
      physics.addCollider(
        new THREE.Vector3(this.storePos.x + sx - 0.7, 0, this.storePos.z - 3.6),
        new THREE.Vector3(this.storePos.x + sx + 0.7, 1.8, this.storePos.z + 1.6)
      );
    }

    // 3. Fresh Onigiri & Bento Island in the center
    const bentoIsland = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 2.2), shelfMat);
    bentoIsland.position.set(-1.0, 0.45, 3.2);
    bentoIsland.castShadow = true;
    this.group.add(bentoIsland);

    physics.addCollider(
      new THREE.Vector3(this.storePos.x - 2.2, 0, this.storePos.z + 2.0),
      new THREE.Vector3(this.storePos.x + 0.2, 1.0, this.storePos.z + 4.4)
    );

    // 4. Cashier Checkout Counter (L-shaped, near front entrance at X: -4.5 to -2.0, Z: -3.8 to -1.8)
    const counterMat = CelShaders.createToonMaterial(0xdcdde1);
    const counterTopMat = CelShaders.createToonMaterial(0x2f3640);

    const counter = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.95, 1.0), counterMat);
    counter.position.set(-4.5, 0.95 / 2, -3.8);
    this.group.add(counter);

    const counterTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 1.1), counterTopMat);
    counterTop.position.set(-4.5, 0.97, -3.8);
    this.group.add(counterTop);

    // POS Register Screen
    const registerScreen = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.06), CelShaders.createToonMaterial(0x111));
    registerScreen.position.set(-5.2, 1.2, -3.8);
    this.group.add(registerScreen);

    // Microwave Oven
    const microwave = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.4), CelShaders.createToonMaterial(0xbdc3c7));
    microwave.position.set(-3.5, 1.18, -3.8);
    this.group.add(microwave);

    // Hot snack warmer glass showcase (Karaage & Steamed buns!)
    const warmerCase = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.45), new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.6 }));
    warmerCase.position.set(-4.3, 1.22, -3.8);
    this.group.add(warmerCase);

    physics.addCollider(
      new THREE.Vector3(this.storePos.x - 6.3, 0, this.storePos.z - 4.4),
      new THREE.Vector3(this.storePos.x - 2.6, 1.4, this.storePos.z - 3.2)
    );

    // 5. Manga & Magazine Stand by front window
    const magStand = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.1, 2.6), CelShaders.createToonMaterial(0x95a5a6));
    magStand.position.set(-6.3, 0.55, 3.2);
    this.group.add(magStand);
  }

  private createExteriorProps(): void {
    // 1. Outside Trash & Recycling Station (Cans, Bottles, Burnable Trash)
    const binColors = [0x2ecc71, 0x3498db, 0xe74c3c];
    for (let b = 0; b < 3; b++) {
      const bin = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.85, 0.45), CelShaders.createToonMaterial(binColors[b]));
      bin.position.set(-7.5, 0.425, 4.0 + b * 0.5);
      this.group.add(bin);
    }

    // 2. Parking space markings outside convenience store
    const markMat = CelShaders.createToonMaterial(0xffffff);
    for (let p = -2; p <= 2; p++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.02, 0.15), markMat);
      line.position.set(-9.8, 0.03, p * 2.6);
      this.group.add(line);

      // Yellow wheel stopper block (車止め)
      const stopper = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 1.4), CelShaders.createToonMaterial(0xf1c40f));
      stopper.position.set(-11.5, 0.06, p * 2.6);
      this.group.add(stopper);
    }
  }

  public update(delta: number, playerPos: THREE.Vector3): void {
    // Check distance between player and front entrance (-7.0, 0, 0 in local space)
    const entranceWorldPos = new THREE.Vector3(this.storePos.x - 7.0, 0, this.storePos.z);
    const dist = entranceWorldPos.distanceTo(playerPos);

    const shouldOpen = dist < 2.8;

    if (shouldOpen) {
      if (this.doorOpenProgress < 1.0) {
        this.doorOpenProgress = Math.min(1.0, this.doorOpenProgress + delta * 2.5);
        if (!this.doorChimePlayed) {
          audio.playStoreDoorChime();
          this.doorChimePlayed = true;
        }
      }
    } else {
      if (this.doorOpenProgress > 0.0) {
        this.doorOpenProgress = Math.max(0.0, this.doorOpenProgress - delta * 2.0);
      } else {
        this.doorChimePlayed = false;
      }
    }

    // Slide doors sideways (Left slides -Z, Right slides +Z)
    this.doorLeft.position.z = -0.7 - this.doorOpenProgress * 1.05;
    this.doorRight.position.z = 0.7 + this.doorOpenProgress * 1.05;
  }
}
