// src/buildings/PlayerHouse.ts
// Enterable two-story Japanese home: Genkan, tatami living room, kitchen, bedroom, balcony, appliances.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { audio } from '../engine/AudioSynthesizer';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class PlayerHouse {
  public group: THREE.Group;
  public housePos: THREE.Vector3 = new THREE.Vector3(-45, 0, 5);

  // Doors & Appliances
  private frontDoorPivot: THREE.Group;
  public isFrontDoorOpen: boolean = false;
  private roomLight!: THREE.PointLight;
  public isRoomLightOn: boolean = true;
  private acFan: THREE.Mesh;

  // Interactivity positions
  public bedPos: THREE.Vector3;
  public fridgePos: THREE.Vector3;
  public deskLampPos: THREE.Vector3;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    this.group.position.copy(this.housePos);
    scene.add(this.group);

    this.bedPos = new THREE.Vector3(this.housePos.x + 2.0, 3.5, this.housePos.z - 1.5);
    this.fridgePos = new THREE.Vector3(this.housePos.x - 2.8, 0.8, this.housePos.z - 2.5);
    this.deskLampPos = new THREE.Vector3(this.housePos.x + 3.0, 3.8, this.housePos.z + 2.0);

    // 1. House Architecture (Exterior walls, Roof, Balcony)
    this.createArchitecture(lighting);

    // 2. Sliding Front Entrance Door
    this.frontDoorPivot = this.createEntranceDoor();

    // 3. Ground Floor Interior (Genkan, Tatami Room, Kitchen)
    this.createGroundFloor();

    // 4. Second Floor Interior (Bedroom, Desk, Balcony)
    this.createSecondFloor();

    // 5. Exterior Details (AC compressor with spinning fan, garden fence, nameplate)
    this.acFan = this.createExteriorDetails();
  }

  private createArchitecture(lighting: LightingSky): void {
    // House dimensions: W: 9m (X: -4.5 to 4.5), D: 8m (Z: -4 to 4), H: 6.8m (2 stories)
    const wallMat = CelShaders.createToonMaterial(0xf5efe6); // Warm beige Japanese siding
    const woodTrimMat = CelShaders.createToonMaterial(0x5c4033);
    const roofMat = CelShaders.createToonMaterial(0x2f3640);  // Dark blue-grey Japanese roof tiles

    // Exterior walls (with cutouts for entrance and windows)
    // Back wall (North, Z = -4.0)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(9.0, 6.5, 0.3), wallMat);
    backWall.position.set(0, 3.25, -4.0);
    this.group.add(backWall);

    // West wall (X = -4.5)
    const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.5, 8.0), wallMat);
    westWall.position.set(-4.5, 3.25, 0);
    this.group.add(westWall);

    // East wall (X = 4.5)
    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.5, 8.0), wallMat);
    eastWall.position.set(4.5, 3.25, 0);
    this.group.add(eastWall);

    // Front wall (South, Z = 4.0): has entrance at X = -2.5, window at X = 2.0
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6.5, 0.3), wallMat);
    frontWallLeft.position.set(-3.75, 3.25, 4.0);
    this.group.add(frontWallLeft);

    const frontWallMid = new THREE.Mesh(new THREE.BoxGeometry(3.5, 6.5, 0.3), wallMat);
    frontWallMid.position.set(0.25, 3.25, 4.0);
    this.group.add(frontWallMid);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(2.5, 6.5, 0.3), wallMat);
    frontWallRight.position.set(3.25, 3.25, 4.0);
    this.group.add(frontWallRight);

    // Lintel above front door (Z = 4.0, X = -2.2, Y: 2.3 to 3.5)
    const doorLintel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.2, 0.3), wallMat);
    doorLintel.position.set(-2.2, 4.4, 4.0);
    this.group.add(doorLintel);

    // Traditional Gabled Roof with overhangs
    const roof = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.6, 9.2), roofMat);
    roof.position.set(0, 6.7, 0);
    this.group.add(roof);

    // Ridge crest (棟)
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(10.4, 0.25, 0.3), roofMat);
    ridge.position.set(0, 7.1, 0);
    this.group.add(ridge);

    // 2nd Floor Balcony (South side, X: 0 to 4.5, Z: 4.0 to 5.4, Y = 3.2)
    const balconyFloor = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.15, 1.4), woodTrimMat);
    balconyFloor.position.set(2.2, 3.2, 4.7);
    this.group.add(balconyFloor);

    // Balcony handrail
    const balconyRail = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.85, 0.08), CelShaders.createToonMaterial(0x34495e));
    balconyRail.position.set(2.2, 3.7, 5.4);
    this.group.add(balconyRail);

    // Room lights
    this.roomLight = new THREE.PointLight(0xffe082, 0.7, 8, 1.8);
    this.roomLight.position.set(1.0, 2.8, 0);
    this.group.add(this.roomLight);
    lighting.registerNightLight(this.roomLight);

    // Outer wall colliders
    physics.addCollider(new THREE.Vector3(this.housePos.x - 4.7, 0, this.housePos.z - 4.2), new THREE.Vector3(this.housePos.x + 4.7, 6.5, this.housePos.z - 3.8));
    physics.addCollider(new THREE.Vector3(this.housePos.x - 4.7, 0, this.housePos.z - 4.2), new THREE.Vector3(this.housePos.x - 4.3, 6.5, this.housePos.z + 4.2));
    physics.addCollider(new THREE.Vector3(this.housePos.x + 4.3, 0, this.housePos.z - 4.2), new THREE.Vector3(this.housePos.x + 4.7, 6.5, this.housePos.z + 4.2));
    physics.addCollider(new THREE.Vector3(this.housePos.x - 4.7, 0, this.housePos.z + 3.8), new THREE.Vector3(this.housePos.x - 3.0, 6.5, this.housePos.z + 4.2));
    physics.addCollider(new THREE.Vector3(this.housePos.x - 1.5, 0, this.housePos.z + 3.8), new THREE.Vector3(this.housePos.x + 4.7, 6.5, this.housePos.z + 4.2));
  }

  private createEntranceDoor(): THREE.Group {
    const doorGroup = new THREE.Group();
    doorGroup.position.set(-2.2, 0, 4.0);

    const doorMat = CelShaders.createToonMaterial(0x4a3728);
    const glassMat = new THREE.MeshBasicMaterial({ color: 0xecf0f1, transparent: true, opacity: 0.5 });

    // Sliding wooden door with frosted glass slats
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.3, 0.08), doorMat);
    door.position.set(0, 1.15, 0);
    doorGroup.add(door);

    const doorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.09), glassMat);
    doorGlass.position.set(0, 1.3, 0);
    doorGroup.add(doorGlass);

    this.group.add(doorGroup);
    return doorGroup;
  }

  private createGroundFloor(): void {
    // 1. Genkan (Lower stone entryway at X: -3.5 to -1.5, Z: 2.5 to 3.9)
    const genkanStoneMat = CelShaders.createToonMaterial(0x7f8c8d);
    const genkanFloor = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.4), genkanStoneMat);
    genkanFloor.rotation.x = -Math.PI / 2;
    genkanFloor.position.set(-2.5, 0.02, 3.2);
    this.group.add(genkanFloor);

    // Shoe cabinet (下駄箱 / Getabako)
    const shoeCabinetMat = CelShaders.createToonMaterial(0x5c4033);
    const getabako = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.1, 1.2), shoeCabinetMat);
    getabako.position.set(-3.8, 0.55, 3.2);
    this.group.add(getabako);

    // Raised wood entrance step (上がり框 / Agari-kamachi)
    const kamachiMat = CelShaders.createToonMaterial(0x8d6e63);
    const kamachi = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.25, 0.15), kamachiMat);
    kamachi.position.set(-2.5, 0.125, 2.45);
    this.group.add(kamachi);

    // 2. Living Room (Tatami Room / 和室 at X: 0 to 4.2, Z: -1.0 to 3.8)
    const tatamiMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createTatamiTexture()
    });
    const tatamiFloor = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 4.6), tatamiMat);
    tatamiFloor.rotation.x = -Math.PI / 2;
    tatamiFloor.position.set(2.0, 0.25, 1.4);
    this.group.add(tatamiFloor);

    // Low Kotatsu Table with quilt
    const kotatsuGroup = new THREE.Group();
    kotatsuGroup.position.set(2.0, 0.25, 1.4);

    const kotatsuTopMat = CelShaders.createToonMaterial(0x3e2723);
    const futonMat = CelShaders.createToonMaterial(0xc0392b); // Red warm checkered blanket

    // Table top
    const kTop = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 1.3), kotatsuTopMat);
    kTop.position.y = 0.45;
    kotatsuGroup.add(kTop);

    // Quilted blanket spreading out
    const kFuton = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.38, 1.6), futonMat);
    kFuton.position.y = 0.19;
    kotatsuGroup.add(kFuton);

    // Ceramic tea set on kotatsu
    const potMat = CelShaders.createToonMaterial(0x27ae60);
    const teaPot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.14, 8), potMat);
    teaPot.position.set(0.2, 0.54, 0);
    kotatsuGroup.add(teaPot);

    this.group.add(kotatsuGroup);

    // 3. Kitchenette (X: -4.0 to -1.0, Z: -3.8 to 0)
    const kitchenWood = CelShaders.createToonMaterial(0xd7ccc8);
    const kitchenCounter = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 0.7), kitchenWood);
    kitchenCounter.position.set(-2.5, 0.425 + 0.25, -3.2);
    this.group.add(kitchenCounter);

    // Gas stove & kettle
    const stoveMat = CelShaders.createToonMaterial(0x2f3640);
    const stove = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.5), stoveMat);
    stove.position.set(-3.2, 1.14, -3.2);
    this.group.add(stove);

    // Refrigerator (Silver, W: 0.65m, H: 1.65m)
    const fridgeMat = CelShaders.createToonMaterial(0xdcdde1);
    const fridge = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.65, 0.65), fridgeMat);
    fridge.position.set(-1.0, 0.825 + 0.25, -3.2);
    this.group.add(fridge);

    // 4. Wooden Staircase to 2nd Floor (X: -1.0 to 0.2, Z: -2.0 to 1.5)
    const stairMat = CelShaders.createToonMaterial(0x8d6e63);
    for (let st = 0; st < 12; st++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.25, 0.3), stairMat);
      step.position.set(-0.4, 0.25 + st * 0.25, -1.8 + st * 0.28);
      this.group.add(step);
    }
  }

  private createSecondFloor(): void {
    // 2nd Floor Plate
    const floorMat = CelShaders.createToonMaterial(0x8d6e63);
    const floor2 = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.15, 7.6), floorMat);
    floor2.position.set(0, 3.25, 0);
    this.group.add(floor2);

    // 1. Bed / Futon (X: 1.5 to 3.5, Z: -3.0 to -0.5)
    const bedGroup = new THREE.Group();
    bedGroup.position.set(2.5, 3.32, -1.8);

    const mattressMat = CelShaders.createToonMaterial(0xffffff);
    const duvetMat = CelShaders.createToonMaterial(0x64b5f6); // Soft sky blue duvet

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 2.2), mattressMat);
    mattress.position.y = 0.125;
    bedGroup.add(mattress);

    const duvet = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.15, 1.6), duvetMat);
    duvet.position.set(0, 0.26, 0.25);
    bedGroup.add(duvet);

    // White pillow
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.4), mattressMat);
    pillow.position.set(0, 0.28, -0.75);
    bedGroup.add(pillow);

    this.group.add(bedGroup);

    // 2. Study Desk with Lamp & Books (X: 2.8, Z: 2.0)
    const deskMat = CelShaders.createToonMaterial(0x5c4033);
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.75, 0.7), deskMat);
    desk.position.set(2.8, 3.32 + 0.375, 2.0);
    this.group.add(desk);

    // Study lamp
    const lampMat = CelShaders.createToonMaterial(0xff7043);
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 8), lampMat);
    lampBase.position.set(2.5, 3.32 + 0.77, 2.0);
    this.group.add(lampBase);

    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.15, 8), lampMat);
    lampShade.position.set(2.5, 3.32 + 1.05, 2.0);
    this.group.add(lampShade);
  }

  private createExteriorDetails(): THREE.Mesh {
    // 1. Outdoor Air Conditioner Compressor (室外機) at North wall
    const acGroup = new THREE.Group();
    acGroup.position.set(-3.2, 0, -4.5);

    const acMat = CelShaders.createToonMaterial(0xdcdde1);
    const acBody = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.35), acMat);
    acBody.position.y = 0.325;
    acGroup.add(acBody);

    // Circular fan grill & spinning fan
    const fanGrill = new THREE.Mesh(new THREE.CircleGeometry(0.22, 12), new THREE.MeshBasicMaterial({ color: 0x333333 }));
    fanGrill.position.set(0.12, 0.325, -0.18);
    fanGrill.rotation.y = Math.PI;
    acGroup.add(fanGrill);

    const fanMat = CelShaders.createToonMaterial(0x718093);
    const fanBlade = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.06, 0.02), fanMat);
    fanBlade.position.set(0.12, 0.325, -0.17);
    acGroup.add(fanBlade);

    this.group.add(acGroup);

    // 2. Japanese House Gate & Nameplate (表札: "さくら")
    const gatePostMat = CelShaders.createToonMaterial(0x95a5a6);
    const gatePost = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.4, 0.35), gatePostMat);
    gatePost.position.set(-1.2, 0.7, 5.2);
    this.group.add(gatePost);

    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 128;
    nameCanvas.height = 256;
    const nctx = nameCanvas.getContext('2d')!;
    nctx.fillStyle = '#ffffff';
    nctx.fillRect(0, 0, 128, 256);
    nctx.strokeStyle = '#333';
    nctx.strokeRect(4, 4, 120, 248);
    nctx.fillStyle = '#111';
    nctx.font = 'bold 50px "Hiragino Sans", "Meiryo", serif';
    nctx.textAlign = 'center';
    nctx.fillText('桜', 64, 100);
    nctx.fillText('井', 64, 175);
    const nameTex = new THREE.CanvasTexture(nameCanvas);
    const namePlate = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.36), new THREE.MeshBasicMaterial({ map: nameTex }));
    namePlate.position.set(-1.2, 1.0, 5.38);
    this.group.add(namePlate);

    return fanBlade;
  }

  public toggleFrontDoor(): void {
    this.isFrontDoorOpen = !this.isFrontDoorOpen;
    audio.playDoorSlide();
  }

  public toggleLight(): void {
    this.isRoomLightOn = !this.isRoomLightOn;
    this.roomLight.intensity = this.isRoomLightOn ? 0.7 : 0.0;
    audio.playUIConfirm();
  }

  public update(delta: number): void {
    // Spin AC fan blade
    if (this.acFan) {
      this.acFan.rotation.z += delta * 12.0;
    }

    // Front door sliding animation (slide along X axis)
    const targetX = this.isFrontDoorOpen ? -1.0 : 0.0;
    if (Math.abs(this.frontDoorPivot.position.x - (-2.2 + targetX)) > 0.02) {
      this.frontDoorPivot.position.x += ((-2.2 + targetX) - this.frontDoorPivot.position.x) * delta * 6.0;
    }
  }
}
