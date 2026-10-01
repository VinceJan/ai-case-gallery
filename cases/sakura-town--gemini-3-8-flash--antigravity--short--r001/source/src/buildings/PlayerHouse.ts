// src/buildings/PlayerHouse.ts
// Traditional-modern Japanese 2-story home with Genkan, Tatami room, and 2nd-floor bedroom with sleepable bed.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class PlayerHouse {
  public group: THREE.Group;
  private lighting: LightingSky;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.lighting = lighting;

    // House Location: Residential Quarter West (X: -45, Z: -5)
    this.group.position.set(-45, 0, -5);

    this.buildHouseExterior();
    this.buildGenkanAndTatamiRoom();
    this.buildSecondFloorBedroom();
  }

  private buildHouseExterior(): void {
    const plasterMat = CelShaders.createToonMaterial(0xfff9e6); // Cream Japanese stucco
    const woodMat = CelShaders.createToonMaterial(0x5d4037);
    const roofMat = CelShaders.createToonMaterial(0x2f3542, {
      map: TextureGenerator.createKawaraRoofTexture()
    });

    // House Outer Dimensions: 12m wide x 10m deep x 6.5m high (2 stories)
    // First Floor Outer Walls
    const wallF1L = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 0.3), plasterMat);
    wallF1L.position.set(-3.8, 1.6, 4.85);
    this.group.add(wallF1L);

    const wallF1R = new THREE.Mesh(new THREE.BoxGeometry(4.5, 3.2, 0.3), plasterMat);
    wallF1R.position.set(3.5, 1.6, 4.85);
    this.group.add(wallF1R);

    // Side Walls & Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(12, 6.2, 0.3), plasterMat);
    backWall.position.set(0, 3.1, -4.85);
    this.group.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.2, 10), plasterMat);
    leftWall.position.set(-5.85, 3.1, 0);
    this.group.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.2, 10), plasterMat);
    rightWall.position.set(5.85, 3.1, 0);
    this.group.add(rightWall);

    // Second Floor Front Wall with Balcony
    const wallF2 = new THREE.Mesh(new THREE.BoxGeometry(7.0, 3.0, 0.3), plasterMat);
    wallF2.position.set(-2.2, 4.7, 4.85);
    this.group.add(wallF2);

    // Balcony Railing (X: 1.5 to 5.5, Z: 4.85 to 6.2)
    const balconyFloor = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.2, 2.0), woodMat);
    balconyFloor.position.set(3.5, 3.1, 5.85);
    this.group.add(balconyFloor);

    const balconyRail = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.9, 0.1), woodMat);
    balconyRail.position.set(3.5, 3.65, 6.8);
    this.group.add(balconyRail);

    // Traditional Kawara Tiled Gable Roof
    const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(8.5, 2.4, 4), roofMat);
    mainRoof.rotation.y = Math.PI / 4;
    mainRoof.position.set(0, 7.2, 0);
    mainRoof.castShadow = true;
    this.group.add(mainRoof);

    // Eaves overhang (ひさし) between 1st and 2nd floor
    const eaves = new THREE.Mesh(new THREE.BoxGeometry(12.8, 0.25, 1.2), roofMat);
    eaves.position.set(0, 3.2, 5.2);
    this.group.add(eaves);

    // Interior Warm Lighting
    const roomLightF1 = new THREE.PointLight(0xffe0b2, 1.3, 14, 1.5);
    roomLightF1.position.set(-1.5, 2.8, 0);
    this.group.add(roomLightF1);

    const roomLightF2 = new THREE.PointLight(0xffe0b2, 1.2, 12, 1.5);
    roomLightF2.position.set(0, 5.8, 0);
    this.group.add(roomLightF2);

    // Physics wall boundaries
    physics.addBox(-45 - 5.85, -5, 0.4, 10, 'house_wall_l');
    physics.addBox(-45 + 5.85, -5, 0.4, 10, 'house_wall_r');
    physics.addBox(-45, -5 - 4.85, 12, 0.4, 'house_wall_b');
    physics.addBox(-45 - 3.8, -5 + 4.85, 4.2, 0.4, 'house_front_l');
    physics.addBox(-45 + 3.5, -5 + 4.85, 4.5, 0.4, 'house_front_r');
  }

  private buildGenkanAndTatamiRoom(): void {
    const woodMat = CelShaders.createToonMaterial(0x8d6e63);
    const tatamiMat = CelShaders.createToonMaterial(0xdcd39e, {
      map: TextureGenerator.createTatamiTexture()
    });
    const shojiMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createShojiTexture(),
      transparent: true,
      opacity: 0.85
    });

    // 1. Lower Genkan (玄関) - Concrete shoe drop floor
    const genkanFloor = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.05, 2.8),
      CelShaders.createToonMaterial(0x95a5a6)
    );
    genkanFloor.position.set(-0.2, 0.03, 3.4);
    this.group.add(genkanFloor);

    // Raised Wood Threshold (上がり框)
    const step = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.25, 0.35), woodMat);
    step.position.set(-0.2, 0.15, 1.9);
    this.group.add(step);

    // Shoe Cabinet (下駄箱 - Getabako)
    const getabako = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 0.5), woodMat);
    getabako.position.set(1.1, 0.65, 3.2);
    this.group.add(getabako);

    // 2. Washitsu (和室) Tatami Room (West side: X: -5.5 to -0.5, Z: -4.5 to 1.5)
    const tatamiDeck = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.25, 6.0), tatamiMat);
    tatamiDeck.position.set(-3.0, 0.15, -1.5);
    tatamiDeck.receiveShadow = true;
    this.group.add(tatamiDeck);

    // Low Chabudai Wooden Table (ちゃぶ台)
    const chabudai = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.38, 16), woodMat);
    chabudai.position.set(-3.0, 0.45, -1.5);
    chabudai.castShadow = true;
    this.group.add(chabudai);

    // Ceramic Teapot (急須) and Cups
    const teapot = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      CelShaders.createToonMaterial(0x27ae60)
    );
    teapot.position.set(-3.0, 0.75, -1.5);
    this.group.add(teapot);

    // Zabuton Floor Cushions (座布団)
    const cushionMat = CelShaders.createToonMaterial(0x2980b9);
    for (const pos of [
      { x: -3.0, z: -0.6 },
      { x: -3.0, z: -2.4 },
      { x: -2.1, z: -1.5 },
      { x: -3.9, z: -1.5 }
    ]) {
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.65), cushionMat);
      cushion.position.set(pos.x, 0.3, pos.z);
      this.group.add(cushion);
    }

    // Shoji Screen Partitions (障子)
    const shoji1 = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.6), shojiMat);
    shoji1.position.set(-0.5, 1.45, -1.5);
    shoji1.rotation.y = Math.PI / 2;
    this.group.add(shoji1);
  }

  private buildSecondFloorBedroom(): void {
    const woodFloorMat = CelShaders.createToonMaterial(0xa1887f, {
      map: TextureGenerator.createWoodPlankTexture()
    });
    const futonWhiteMat = CelShaders.createToonMaterial(0xffffff);
    const futonBlueMat = CelShaders.createToonMaterial(0x3498db);

    // 2nd Floor Loft Deck (Z: -4.5 to 4.5, X: -5.5 to 5.5)
    const loftDeck = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.25, 9.4), woodFloorMat);
    loftDeck.position.set(0, 3.1, 0);
    this.group.add(loftDeck);

    // Stairs to second floor
    const stairMat = CelShaders.createToonMaterial(0x8d6e63);
    for (let i = 0; i < 11; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.28, 0.35), stairMat);
      step.position.set(4.5, 0.15 + i * 0.28, 1.8 - i * 0.35);
      this.group.add(step);
    }

    // 2nd Floor Futon Bed (Interactive Sleep Target)
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.15, 2.2), futonWhiteMat);
    mattress.position.set(-3.2, 3.3, -2.5);
    this.group.add(mattress);

    const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.18, 1.5), futonBlueMat);
    blanket.position.set(-3.2, 3.33, -2.15);
    this.group.add(blanket);

    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.4), futonWhiteMat);
    pillow.position.set(-3.2, 3.42, -3.2);
    this.group.add(pillow);

    // Study Desk with Laptop
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.9, 0.8),
      CelShaders.createToonMaterial(0x6d4c41)
    );
    desk.position.set(2.5, 3.65, -3.8);
    this.group.add(desk);

    const laptop = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.05, 0.32),
      CelShaders.createToonMaterial(0x2f3542)
    );
    laptop.position.set(2.5, 4.13, -3.8);
    this.group.add(laptop);
  }
}
