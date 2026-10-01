// src/buildings/SakuraMart.ts
// Fully enterable 24-hour Japanese convenience store with detailed interior shelves and cashier.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class SakuraMart {
  public group: THREE.Group;
  private lighting: LightingSky;

  // Interactive automatic sliding door
  public doorLeft: THREE.Mesh;
  public doorRight: THREE.Mesh;
  public isDoorOpen: boolean = false;
  private doorProgress: number = 0;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.lighting = lighting;

    // Sakura Mart Location: Station Avenue East Side (X: 35, Z: 5)
    this.group.position.set(35, 0, 5);

    // Build building structure & interior
    const doors = this.buildStoreStructure();
    this.doorLeft = doors.left;
    this.doorRight = doors.right;

    this.buildStoreInterior();
  }

  private buildStoreStructure(): { left: THREE.Mesh; right: THREE.Mesh } {
    const wallMat = CelShaders.createToonMaterial(0xf5f6fa);
    const roofMat = CelShaders.createToonMaterial(0x718093);
    const floorTileMat = CelShaders.createToonMaterial(0xe8ecef);
    const glassMat = CelShaders.createToonMaterial(0xa0e7e5, { transparent: true, opacity: 0.45 });

    // Store dimensions: 14m wide x 11m deep x 4.2m high
    // 1. Tiled Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.15, 11), floorTileMat);
    floor.position.set(0, 0.08, 0);
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Outer Solid Walls (Back, Left, Right)
    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 4.2, 0.3), wallMat);
    backWall.position.set(0, 2.1, -5.35);
    this.group.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 11), wallMat);
    leftWall.position.set(-6.85, 2.1, 0);
    this.group.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 11), wallMat);
    rightWall.position.set(6.85, 2.1, 0);
    this.group.add(rightWall);

    // Front Wall with Large Glass Display Windows
    const frontWallL = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.2, 0.3), wallMat);
    frontWallL.position.set(-4.75, 2.1, 5.35);
    this.group.add(frontWallL);

    const frontWallR = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.2, 0.3), wallMat);
    frontWallR.position.set(4.25, 2.1, 5.35);
    this.group.add(frontWallR);

    // Front Glass Windows
    const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 0.08), glassMat);
    frontGlass.position.set(-4.6, 1.8, 5.35);
    this.group.add(frontGlass);

    // 3. Sliding Automatic Glass Doors (Entry opening at X: -0.8 to 1.2)
    const doorGeo = new THREE.BoxGeometry(1.1, 2.6, 0.06);
    const doorL = new THREE.Mesh(doorGeo, glassMat);
    doorL.position.set(-0.6, 1.3, 5.35);
    this.group.add(doorL);

    const doorR = new THREE.Mesh(doorGeo, glassMat);
    doorR.position.set(0.6, 1.3, 5.35);
    this.group.add(doorR);

    // 4. Roof Fascia and Sakura Mart Signboard
    const roof = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.6, 12.2), roofMat);
    roof.position.set(0, 4.4, 0);
    roof.castShadow = true;
    this.group.add(roof);

    // Illuminated Store Signboard (🌸 さくらマート 24H)
    const signMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createSakuraMartSign(),
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    });
    const storeSign = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 1.4), signMat);
    storeSign.position.set(0, 4.3, 6.15);
    this.group.add(storeSign);

    // 5. Interior Fluorescent Ceiling Lights
    const flMat = CelShaders.createToonMaterial(0xffffff, { emissive: 0xffffff, emissiveIntensity: 1.0 });
    for (let lx = -4; lx <= 4; lx += 4) {
      for (let lz = -3; lz <= 3; lz += 3) {
        const fixture = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 2.2), flMat);
        fixture.position.set(lx, 4.0, lz);
        this.group.add(fixture);
      }
    }

    const interiorLight = new THREE.PointLight(0xfff8e7, 1.2, 18, 1.5);
    interiorLight.position.set(0, 3.8, 0);
    this.group.add(interiorLight);

    // Add wall colliders to physics engine
    physics.addBox(35, 5 - 5.35, 14, 0.4, 'mart_back_wall');
    physics.addBox(35 - 6.85, 5, 0.4, 11, 'mart_left_wall');
    physics.addBox(35 + 6.85, 5, 0.4, 11, 'mart_right_wall');
    physics.addBox(35 - 4.75, 5 + 5.35, 4.2, 0.4, 'mart_front_l');
    physics.addBox(35 + 4.25, 5 + 5.35, 5.2, 0.4, 'mart_front_r');

    return { left: doorL, right: doorR };
  }

  private buildStoreInterior(): void {
    const counterMat = CelShaders.createToonMaterial(0x34495e);
    const shelfMat = CelShaders.createToonMaterial(0xdcdde1);
    const posMat = CelShaders.createToonMaterial(0x2f3542);
    const warmerGlassMat = CelShaders.createToonMaterial(0xffb142, {
      transparent: true,
      opacity: 0.65,
      emissive: 0xffa502,
      emissiveIntensity: 0.4
    });

    // 1. Checkout Cashier Counter (L-shaped counter near entrance)
    const counterMain = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.0, 1.1), counterMat);
    counterMain.position.set(3.8, 0.5, 3.2);
    counterMain.castShadow = true;
    this.group.add(counterMain);

    // POS Cash Register Monitor
    const pos = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.35), posMat);
    pos.position.set(3.8, 1.2, 3.2);
    this.group.add(pos);

    // Heated Hot Snack Showcase (Karaage / Meat Buns)
    const warmer = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.6), warmerGlassMat);
    warmer.position.set(2.4, 1.3, 3.2);
    this.group.add(warmer);

    // 2. Snack & Grocery Shelving Aisles (Two long double-sided gondolas)
    for (const shelfZ of [-0.5, -2.8]) {
      const gondola = new THREE.Mesh(new THREE.BoxGeometry(7.5, 1.8, 1.1), shelfMat);
      gondola.position.set(-1.5, 0.9, shelfZ);
      gondola.castShadow = true;
      this.group.add(gondola);

      // Colorful snack boxes & instant noodles on shelves
      const colors = [0xe74c3c, 0xf1c40f, 0x2ecc71, 0x3498db, 0xe67e22];
      for (let s = -3.2; s <= 3.2; s += 0.8) {
        for (let tier = 0; tier < 3; tier++) {
          const item = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.25, 0.25),
            CelShaders.createToonMaterial(colors[(Math.floor(Math.abs(s * 3)) + tier) % colors.length])
          );
          item.position.set(-1.5 + s, 0.45 + tier * 0.5, shelfZ + 0.48);
          this.group.add(item);
        }
      }

      // Physics obstacle for shelves
      physics.addBox(35 - 1.5, 5 + shelfZ, 7.5, 1.1, 'mart_shelf');
    }

    // 3. Walk-in Backlit Beverage Coolers (Back Wall: X: -5 to 3, Z: -5.0)
    const coolerMat = CelShaders.createToonMaterial(0x2c3e50);
    const coolerGlass = CelShaders.createToonMaterial(0xa0e7e5, {
      transparent: true,
      opacity: 0.5,
      emissive: 0x68d8d6,
      emissiveIntensity: 0.6
    });

    const coolerFrame = new THREE.Mesh(new THREE.BoxGeometry(9.0, 2.8, 0.7), coolerMat);
    coolerFrame.position.set(-1.0, 1.4, -4.9);
    this.group.add(coolerFrame);

    const coolerGlassDoor = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 2.4), coolerGlass);
    coolerGlassDoor.position.set(-1.0, 1.4, -4.54);
    this.group.add(coolerGlassDoor);

    // 4. Magazine & Manga Stand (雑誌ラック) near front glass window
    const magMat = CelShaders.createToonMaterial(0x95a5a6);
    const magStand = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 0.6), magMat);
    magStand.position.set(-4.6, 0.55, 4.4);
    this.group.add(magStand);

    physics.addBox(35 + 3.8, 5 + 3.2, 4.2, 1.1, 'mart_counter');
  }

  public update(playerPos: THREE.Vector3, delta: number): void {
    // Proximity automatic door opening: opens when player approaches within 3.5m of front doors
    const martWorldDoor = new THREE.Vector3(35, 0, 10.35);
    const dist = playerPos.distanceTo(martWorldDoor);

    const targetOpen = dist < 3.2;
    const targetProgress = targetOpen ? 1.0 : 0.0;
    this.doorProgress = THREE.MathUtils.lerp(this.doorProgress, targetProgress, delta * 4.0);

    // Slide doors left and right
    this.doorLeft.position.x = -0.6 - this.doorProgress * 0.9;
    this.doorRight.position.x = 0.6 + this.doorProgress * 0.9;
  }
}
