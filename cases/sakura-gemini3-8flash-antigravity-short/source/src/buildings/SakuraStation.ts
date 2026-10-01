// src/buildings/SakuraStation.ts
// Fully enterable Japanese railway station: Concourse, ticket gates, covered platform with signs.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { physics } from '../engine/Physics';

export class SakuraStation {
  public group: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // Station Location: Centered around X: -10, Z: 20
    this.buildStationBuilding(-10, 20);
    this.buildPlatform(-10, 24);
  }

  private buildStationBuilding(x: number, z: number): void {
    const stationGroup = new THREE.Group();
    stationGroup.position.set(x, 0, z);

    const wallMat = CelShaders.createToonMaterial(0xecf0f1);
    const roofMat = CelShaders.createToonMaterial(0x2c3e50);
    const floorMat = CelShaders.createToonMaterial(0xbdc3c7);
    const glassMat = CelShaders.createToonMaterial(0xa0e7e5, { transparent: true, opacity: 0.55 });
    const woodMat = CelShaders.createToonMaterial(0x8d6e63);

    // 1. Station Concourse Floor (16m wide x 8m deep)
    const floor = new THREE.Mesh(new THREE.BoxGeometry(16, 0.2, 8), floorMat);
    floor.position.set(0, 0.1, 0);
    floor.receiveShadow = true;
    stationGroup.add(floor);

    // 2. Walls with Open Entrances
    // Back wall (platform side) with gate openings
    const backWallLeft = new THREE.Mesh(new THREE.BoxGeometry(5.5, 4.2, 0.3), wallMat);
    backWallLeft.position.set(-5.2, 2.1, 3.85);
    stationGroup.add(backWallLeft);

    const backWallRight = new THREE.Mesh(new THREE.BoxGeometry(5.5, 4.2, 0.3), wallMat);
    backWallRight.position.set(5.2, 2.1, 3.85);
    stationGroup.add(backWallRight);

    // Side Walls
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 8), wallMat);
    leftWall.position.set(-7.85, 2.1, 0);
    stationGroup.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 8), wallMat);
    rightWall.position.set(7.85, 2.1, 0);
    stationGroup.add(rightWall);

    // Front Wall with Glass Windows & Plaza Entrance
    const frontWallL = new THREE.Mesh(new THREE.BoxGeometry(5, 4.2, 0.3), wallMat);
    frontWallL.position.set(-5.5, 2.1, -3.85);
    stationGroup.add(frontWallL);

    const frontWallR = new THREE.Mesh(new THREE.BoxGeometry(5, 4.2, 0.3), wallMat);
    frontWallR.position.set(5.5, 2.1, -3.85);
    stationGroup.add(frontWallR);

    // Front Glass Window
    const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.2, 0.1), glassMat);
    frontGlass.position.set(0, 3.0, -3.85);
    stationGroup.add(frontGlass);

    // 3. Station Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(17.5, 0.5, 9.5), roofMat);
    roof.position.set(0, 4.4, 0);
    roof.castShadow = true;
    stationGroup.add(roof);

    // Station Entrance Signboard (さくら町駅)
    const signMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createStationSign()
    });
    const mainSign = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.6), signMat);
    mainSign.position.set(0, 4.8, -4.8);
    stationGroup.add(mainSign);

    // 4. Concourse Interior: Ticket Vending Machines (自動券売機)
    const ticketMachineMat = CelShaders.createToonMaterial(0x34495e);
    const screenMat = CelShaders.createToonMaterial(0x3498db, { emissive: 0x3498db, emissiveIntensity: 0.5 });
    for (let i = 0; i < 3; i++) {
      const tm = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.8, 0.7), ticketMachineMat);
      tm.position.set(-6.8 + i * 1.3, 1.0, -3.0);
      stationGroup.add(tm);

      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.5), screenMat);
      screen.position.set(-6.8 + i * 1.3, 1.25, -2.64);
      stationGroup.add(screen);
    }

    // 5. Automatic Ticket Gates / Turnstiles (自動改札機)
    const gateMat = CelShaders.createToonMaterial(0x7f8c8d);
    const icTouchMat = CelShaders.createToonMaterial(0x3498db, { emissive: 0x3498db, emissiveIntensity: 0.8 });
    for (let i = 0; i < 4; i++) {
      const gate = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.95, 1.8), gateMat);
      gate.position.set(-2.2 + i * 1.4, 0.55, 3.8);
      stationGroup.add(gate);

      // Blue IC card reader pad (Suica / Pasmo touch pad)
      const icPad = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.3), icTouchMat);
      icPad.position.set(-2.2 + i * 1.4, 1.05, 3.5);
      stationGroup.add(icPad);
    }

    // 6. Waiting Benches
    const bench = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 0.7), woodMat);
    bench.position.set(4.5, 0.4, 0);
    bench.castShadow = true;
    stationGroup.add(bench);

    this.group.add(stationGroup);

    // Register physics colliders for station walls
    physics.addBox(x - 7.85, z, 0.4, 8, 'station_wall_l');
    physics.addBox(x + 7.85, z, 0.4, 8, 'station_wall_r');
    physics.addBox(x - 5.5, z - 3.85, 5, 0.4, 'station_front_l');
    physics.addBox(x + 5.5, z - 3.85, 5, 0.4, 'station_front_r');
  }

  private buildPlatform(x: number, z: number): void {
    const platformGroup = new THREE.Group();
    platformGroup.position.set(x, 0, z);

    const concreteMat = CelShaders.createToonMaterial(0x95a5a6);
    const canopyMat = CelShaders.createToonMaterial(0x34495e);
    const pillarMat = CelShaders.createToonMaterial(0x7f8c8d);
    const tactileMat = CelShaders.createToonMaterial(0xfbc531, {
      map: TextureGenerator.createTactilePavingTexture()
    });

    // Elevated Platform Deck (32m long x 4.5m wide x 0.75m high)
    const platformDeck = new THREE.Mesh(new THREE.BoxGeometry(34, 0.75, 4.6), concreteMat);
    platformDeck.position.set(0, 0.375, 0);
    platformDeck.receiveShadow = true;
    platformGroup.add(platformDeck);

    // Yellow Tactile Warning Braille Strip along the train track edge
    const tactileStrip = new THREE.Mesh(new THREE.PlaneGeometry(33.6, 0.45), tactileMat);
    tactileStrip.rotateX(-Math.PI / 2);
    tactileStrip.position.set(0, 0.76, 1.7);
    platformGroup.add(tactileStrip);

    // Platform Canopy Roof & Steel Support Pillars
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(34, 0.35, 4.8), canopyMat);
    canopy.position.set(0, 3.8, 0);
    canopy.castShadow = true;
    platformGroup.add(canopy);

    for (let px = -14; px <= 14; px += 7) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.1, 8), pillarMat);
      pillar.position.set(px, 2.2, 0);
      pillar.castShadow = true;
      platformGroup.add(pillar);
    }

    // Platform Hanging Station Name Signs (駅名標)
    const signMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createStationSign()
    });
    for (const signX of [-8, 8]) {
      const pSign = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.9), signMat);
      pSign.position.set(signX, 3.0, 0);
      platformGroup.add(pSign);

      const pSignBack = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.9), signMat);
      pSignBack.position.set(signX, 3.0, 0.02);
      pSignBack.rotation.y = Math.PI;
      platformGroup.add(pSignBack);
    }

    this.group.add(platformGroup);
  }
}
