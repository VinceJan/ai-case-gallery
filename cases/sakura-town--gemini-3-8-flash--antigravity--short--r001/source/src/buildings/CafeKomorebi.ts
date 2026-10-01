// src/buildings/CafeKomorebi.ts
// Retro Japanese Kissaten (Cafe Komorebi) with siphon coffee counter, vinyl corner, and riverside terrace.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class CafeKomorebi {
  public group: THREE.Group;
  private lighting: LightingSky;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.lighting = lighting;

    // Cafe Location: Beside Main Avenue facing the River Canal (X: 18, Z: -20)
    this.group.position.set(18, 0, -20);

    this.buildCafeStructure();
    this.buildCafeInterior();
    this.buildRiversideTerrace();
  }

  private buildCafeStructure(): void {
    const woodWallMat = CelShaders.createToonMaterial(0x5d4037);
    const plasterMat = CelShaders.createToonMaterial(0xf5eedc);
    const roofMat = CelShaders.createToonMaterial(0x3e2723);
    const floorMat = CelShaders.createToonMaterial(0x6d4c41, {
      map: TextureGenerator.createWoodPlankTexture()
    });
    const glassMat = CelShaders.createToonMaterial(0xa0e7e5, { transparent: true, opacity: 0.45 });

    // Cafe Dimensions: 12m wide x 10m deep x 4.0m high
    // 1. Polished Wood Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(12, 0.15, 10), floorMat);
    floor.position.set(0, 0.08, 0);
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Walls with vintage wood wainscoting
    // North Wall (River canal side with large scenic bay windows and terrace door)
    const northWallL = new THREE.Mesh(new THREE.BoxGeometry(4.0, 4.0, 0.3), plasterMat);
    northWallL.position.set(-3.8, 2.0, -4.85);
    this.group.add(northWallL);

    const northWallR = new THREE.Mesh(new THREE.BoxGeometry(4.0, 4.0, 0.3), plasterMat);
    northWallR.position.set(3.8, 2.0, -4.85);
    this.group.add(northWallR);

    // River Panoramic Bay Window
    const bayGlass = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.4, 0.08), glassMat);
    bayGlass.position.set(0, 2.0, -4.85);
    this.group.add(bayGlass);

    // South Wall (Entrance door facing avenue plaza)
    const southWallL = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.0, 0.3), plasterMat);
    southWallL.position.set(-3.5, 2.0, 4.85);
    this.group.add(southWallL);

    const southWallR = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.0, 0.3), plasterMat);
    southWallR.position.set(3.5, 2.0, 4.85);
    this.group.add(southWallR);

    // Side Walls (East & West)
    const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.0, 10), plasterMat);
    westWall.position.set(-5.85, 2.0, 0);
    this.group.add(westWall);

    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.0, 10), plasterMat);
    eastWall.position.set(5.85, 2.0, 0);
    this.group.add(eastWall);

    // 3. Cafe Gable Roof with dark wood shingles
    const roof = new THREE.Mesh(new THREE.BoxGeometry(13.2, 0.5, 11.2), roofMat);
    roof.position.set(0, 4.25, 0);
    roof.castShadow = true;
    this.group.add(roof);

    // 4. Cafe Komorebi Wooden Signboard
    const signMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createCafeSign()
    });
    const cafeSign = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 1.5), signMat);
    cafeSign.position.set(0, 3.8, 5.05);
    this.group.add(cafeSign);

    // Warm Ambient Interior Light & Lamp Pendants
    const cafeLight = new THREE.PointLight(0xffd59e, 1.4, 15, 1.6);
    cafeLight.position.set(0, 3.4, 0);
    this.group.add(cafeLight);

    // Add wall colliders
    physics.addBox(18 - 5.85, -20, 0.4, 10, 'cafe_wall_w');
    physics.addBox(18 + 5.85, -20, 0.4, 10, 'cafe_wall_e');
    physics.addBox(18 - 3.5, -20 + 4.85, 4.5, 0.4, 'cafe_wall_s1');
    physics.addBox(18 + 3.5, -20 + 4.85, 4.5, 0.4, 'cafe_wall_s2');
  }

  private buildCafeInterior(): void {
    const counterWoodMat = CelShaders.createToonMaterial(0x4e342e);
    const brassMat = CelShaders.createToonMaterial(0xd4af37);
    const tableMat = CelShaders.createToonMaterial(0x6d4c41);
    const stoolMat = CelShaders.createToonMaterial(0x8d6e63);

    // 1. Long Coffee Bar Counter
    const counter = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.05, 1.2), counterWoodMat);
    counter.position.set(-2.2, 0.525, 0.5);
    counter.castShadow = true;
    this.group.add(counter);

    // Coffee Grinder & Espresso Machine
    const espresso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.5), brassMat);
    espresso.position.set(-3.6, 1.35, 0.5);
    this.group.add(espresso);

    // Ceramic Cups on counter
    for (let c = -1.8; c <= 0.2; c += 0.6) {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.14, 8), CelShaders.createToonMaterial(0xffffff));
      cup.position.set(c, 1.12, 0.5);
      this.group.add(cup);
    }

    // 4 High Bar Stools
    for (let s = -3.8; s <= -0.5; s += 1.0) {
      const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.7, 8), stoolMat);
      stool.position.set(s, 0.35, 1.55);
      stool.castShadow = true;
      this.group.add(stool);
    }

    // 2. Dining Tables with Wooden Chairs
    const tableOffsets = [
      { x: 3.2, z: 2.2 },
      { x: 3.2, z: -1.8 }
    ];

    tableOffsets.forEach((pos) => {
      const table = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 1.4), tableMat);
      table.position.set(pos.x, 0.4, pos.z);
      table.castShadow = true;
      this.group.add(table);

      // 2 Chairs per table
      for (const cz of [-1.1, 1.1]) {
        const chair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.85, 0.5), stoolMat);
        chair.position.set(pos.x, 0.425, pos.z + cz);
        this.group.add(chair);
      }
    });

    // 3. Vintage Vinyl Jazz Turntable & Record Shelves Corner
    const vinylShelf = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 0.6), counterWoodMat);
    vinylShelf.position.set(-4.8, 0.9, -3.8);
    this.group.add(vinylShelf);

    const turntable = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.15, 0.5), brassMat);
    turntable.position.set(-4.8, 1.88, -3.8);
    this.group.add(turntable);

    physics.addBox(18 - 2.2, -20 + 0.5, 5.5, 1.2, 'cafe_counter');
  }

  private buildRiversideTerrace(): void {
    const deckMat = CelShaders.createToonMaterial(0x795548, {
      map: TextureGenerator.createWoodPlankTexture()
    });
    const railMat = CelShaders.createToonMaterial(0x4e342e);
    const umbrellaMat = CelShaders.createToonMaterial(0xff7675);

    // Wooden Deck extending north over the river embankment (12m wide x 4.5m deep)
    const deck = new THREE.Mesh(new THREE.BoxGeometry(12, 0.2, 4.5), deckMat);
    deck.position.set(0, 0.1, -7.1);
    deck.receiveShadow = true;
    this.group.add(deck);

    // Scenic Wood Railing
    const railNorth = new THREE.Mesh(new THREE.BoxGeometry(12, 0.9, 0.1), railMat);
    railNorth.position.set(0, 0.55, -9.3);
    this.group.add(railNorth);

    // Terrace Outdoor Table with Parasol Umbrella
    const tTable = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.8, 12), CelShaders.createToonMaterial(0xffffff));
    tTable.position.set(2.5, 0.4, -7.0);
    this.group.add(tTable);

    // Parasol Umbrella
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8, 8), CelShaders.createToonMaterial(0xdcdde1));
    pole.position.set(2.5, 1.4, -7.0);
    this.group.add(pole);

    const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.6, 8), umbrellaMat);
    canopy.position.set(2.5, 2.7, -7.0);
    this.group.add(canopy);
  }
}
