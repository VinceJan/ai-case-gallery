// src/world/TerrainAndRoads.ts
// Handcrafted town elevation, canals, bridges, asphalt roads, and sidewalks.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { physics } from '../engine/Physics';

export class TerrainAndRoads {
  public group: THREE.Group;
  public riverWaterMesh: THREE.Mesh;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // 1. Base Green Grass Terrain
    this.createBaseTerrain();

    // 2. Sakura River Canal & Water
    this.riverWaterMesh = this.createRiverCanal();

    // 3. Roads, Sidewalks & Asphalt
    this.createRoadNetwork();

    // 4. Bridges (Red Shrine Bridge, Road Bridge, Railway Truss Bridge)
    this.createBridges();

    // 5. Shrine Hill Steps & Terrace
    this.createShrineHill();
  }

  private createBaseTerrain(): void {
    // Large ground plane
    const groundGeo = new THREE.PlaneGeometry(260, 240, 16, 16);
    groundGeo.rotateX(-Math.PI / 2);

    const groundMat = CelShaders.createToonMaterial(0x8cb86d); // Japanese lush spring grass
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    ground.position.y = -0.05;
    this.group.add(ground);
  }

  private createRiverCanal(): THREE.Mesh {
    // River canal cutout: Z from -44 to -34, X from -110 to 110
    // River bed plane
    const bedGeo = new THREE.PlaneGeometry(220, 10);
    bedGeo.rotateX(-Math.PI / 2);
    const bedMat = CelShaders.createToonMaterial(0x3e5246);
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.set(0, -2.6, -39);
    bed.receiveShadow = true;
    this.group.add(bed);

    // Concrete canal retaining walls (North and South banks)
    const wallGeo = new THREE.BoxGeometry(220, 3.0, 0.8);
    const wallMat = CelShaders.createToonMaterial(0x8d99ae);

    // South wall
    const southWall = new THREE.Mesh(wallGeo, wallMat);
    southWall.position.set(0, -1.0, -34.4);
    southWall.receiveShadow = true;
    this.group.add(southWall);

    // North wall
    const northWall = new THREE.Mesh(wallGeo, wallMat);
    northWall.position.set(0, -1.0, -43.6);
    northWall.receiveShadow = true;
    this.group.add(northWall);

    // Green safety railings along south bank
    this.createCanalRailings(-33.8);

    // River Water Plane with custom caustics shader
    const waterGeo = new THREE.PlaneGeometry(220, 9.2);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMat = CelShaders.createAnimeWaterMaterial();
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(0, -0.6, -39);
    this.group.add(water);

    return water;
  }

  private createCanalRailings(z: number): void {
    const railMat = CelShaders.createToonMaterial(0x2d6a4f); // Deep green painted steel
    // Segmented railings with openings at bridges
    const segments = [
      { startX: -100, endX: -42 },
      { startX: -28, endX: 16 },
      { startX: 34, endX: 54 },
      { startX: 68, endX: 100 }
    ];

    segments.forEach((seg) => {
      const len = seg.endX - seg.startX;
      const midX = (seg.startX + seg.endX) / 2;

      // Top rail
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, len, 8);
      barGeo.rotateZ(Math.PI / 2);
      const bar = new THREE.Mesh(barGeo, railMat);
      bar.position.set(midX, 0.85, z);
      this.group.add(bar);

      // Mid rail
      const midBar = bar.clone();
      midBar.position.y = 0.45;
      this.group.add(midBar);

      // Posts every 3 meters
      const postCount = Math.floor(len / 3.0);
      const postGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8);
      for (let p = 0; p <= postCount; p++) {
        const px = seg.startX + (p / postCount) * len;
        const post = new THREE.Mesh(postGeo, railMat);
        post.position.set(px, 0.45, z);
        this.group.add(post);
      }

      // Add physics barrier
      physics.addCollider(
        new THREE.Vector3(seg.startX, 0, z - 0.2),
        new THREE.Vector3(seg.endX, 1.2, z + 0.2)
      );
    });
  }

  private createRoadNetwork(): void {
    const asphaltMat = CelShaders.createToonMaterial(0x3d4044); // Dark asphalt
    const sidewalkMat = CelShaders.createToonMaterial(0xbdc3c7); // Concrete pavement
    const roadMarkMat = CelShaders.createToonMaterial(0xffffff); // White paint

    // --- Road 1: Main Town Commercial Street (さくら通り) ---
    // Runs North-South at X = 25, from Z = 45 to Z = -34
    const mainRoadGeo = new THREE.PlaneGeometry(8, 80);
    mainRoadGeo.rotateX(-Math.PI / 2);
    const mainRoad = new THREE.Mesh(mainRoadGeo, asphaltMat);
    mainRoad.position.set(25, 0.02, 5);
    mainRoad.receiveShadow = true;
    this.group.add(mainRoad);

    // Center dashed white line
    for (let z = -30; z < 45; z += 5) {
      if (z >= 22 && z <= 28) continue; // Skip railway crossing zone
      const dashGeo = new THREE.PlaneGeometry(0.2, 3);
      dashGeo.rotateX(-Math.PI / 2);
      const dash = new THREE.Mesh(dashGeo, roadMarkMat);
      dash.position.set(25, 0.025, z);
      this.group.add(dash);
    }

    // Sidewalks on left & right with yellow tactile blocks
    const swLeftGeo = new THREE.PlaneGeometry(2.5, 80);
    swLeftGeo.rotateX(-Math.PI / 2);
    const swLeft = new THREE.Mesh(swLeftGeo, sidewalkMat);
    swLeft.position.set(19.75, 0.08, 5);
    swLeft.receiveShadow = true;
    this.group.add(swLeft);

    const swRight = swLeft.clone();
    swRight.position.x = 30.25;
    this.group.add(swRight);

    // Tactile paving line on west sidewalk
    const tactileMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createTactilePavingTexture()
    });
    const tactileGeo = new THREE.PlaneGeometry(0.5, 76);
    tactileGeo.rotateX(-Math.PI / 2);
    const tactileLine = new THREE.Mesh(tactileGeo, tactileMat);
    tactileLine.position.set(19.5, 0.09, 5);
    this.group.add(tactileLine);

    // Zebra Crossing at Station Crossing Approach (Z = 16)
    const zebraMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createZebraCrossingTexture()
    });
    const zebraGeo = new THREE.PlaneGeometry(8, 3.5);
    zebraGeo.rotateX(-Math.PI / 2);
    const zebra = new THREE.Mesh(zebraGeo, zebraMat);
    zebra.position.set(25, 0.03, 16);
    this.group.add(zebra);

    // Road Marking "止まれ" before railway crossing
    const stopMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createRoadStopTexture(),
      transparent: true
    });
    const stopSignPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 5.0), stopMat);
    stopSignPlane.rotation.x = -Math.PI / 2;
    stopSignPlane.position.set(23.5, 0.035, 19.5);
    this.group.add(stopSignPlane);

    // --- Road 2: Station Plaza Avenue ---
    // Runs East-West along Z = 16, from X = -35 to X = 25
    const plazaAvenueGeo = new THREE.PlaneGeometry(60, 7);
    plazaAvenueGeo.rotateX(-Math.PI / 2);
    const plazaAvenue = new THREE.Mesh(plazaAvenueGeo, asphaltMat);
    plazaAvenue.position.set(-5, 0.02, 16);
    plazaAvenue.receiveShadow = true;
    this.group.add(plazaAvenue);

    // --- Road 3: Residential District Alleyways (路地) ---
    // East-West alley from X = -75 to X = 15 at Z = -8
    const alley1Geo = new THREE.PlaneGeometry(90, 4.5);
    alley1Geo.rotateX(-Math.PI / 2);
    const alley1 = new THREE.Mesh(alley1Geo, asphaltMat);
    alley1.position.set(-30, 0.02, -8);
    alley1.receiveShadow = true;
    this.group.add(alley1);

    // North-South connecting alley at X = -45, from Z = -34 to Z = 16
    const alley2Geo = new THREE.PlaneGeometry(4.5, 50);
    alley2Geo.rotateX(-Math.PI / 2);
    const alley2 = new THREE.Mesh(alley2Geo, asphaltMat);
    alley2.position.set(-45, 0.02, -9);
    alley2.receiveShadow = true;
    this.group.add(alley2);

    // Concrete drainage gutters (側溝) with metal grates along alleys
    this.createStreetGutters();
  }

  private createStreetGutters(): void {
    const gutterMat = CelShaders.createToonMaterial(0x5a6065);
    const gutterGeo = new THREE.PlaneGeometry(90, 0.35);
    gutterGeo.rotateX(-Math.PI / 2);

    const gutter1 = new THREE.Mesh(gutterGeo, gutterMat);
    gutter1.position.set(-30, 0.015, -10.4);
    this.group.add(gutter1);

    const gutter2 = gutter1.clone();
    gutter2.position.z = -5.6;
    this.group.add(gutter2);
  }

  private createBridges(): void {
    // --- Bridge 1: Traditional Vermilion Arched Wooden Bridge (太鼓橋) ---
    // Connects residential path (Z = -34) to Shrine steps (Z = -44) at X = -35
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(-35, 0, -39);

    const archDeckGeo = new THREE.BoxGeometry(4.2, 0.3, 10.5);
    const redWoodMat = CelShaders.createToonMaterial(0xc0392b); // Shinto vermilion red
    const deck = new THREE.Mesh(archDeckGeo, redWoodMat);
    deck.position.y = 0.35;
    bridgeGroup.add(deck);

    // Curved red side parapets & giboshi posts
    const parapetGeo = new THREE.BoxGeometry(0.25, 0.8, 10.5);
    const leftParapet = new THREE.Mesh(parapetGeo, redWoodMat);
    leftParapet.position.set(-2.0, 0.85, 0);
    bridgeGroup.add(leftParapet);

    const rightParapet = leftParapet.clone();
    rightParapet.position.x = 2.0;
    bridgeGroup.add(rightParapet);

    // Bronze Giboshi onion-shaped post finials
    const giboshiMat = CelShaders.createToonMaterial(0xd4af37);
    const giboshiGeo = new THREE.SphereGeometry(0.14, 8, 8);
    for (const pz of [-5.2, -1.8, 1.8, 5.2]) {
      for (const px of [-2.0, 2.0]) {
        const finial = new THREE.Mesh(giboshiGeo, giboshiMat);
        finial.position.set(px, 1.35, pz);
        bridgeGroup.add(finial);
      }
    }

    this.group.add(bridgeGroup);

    // Bridge physics boundaries (keep player from jumping into canal)
    physics.addCollider(new THREE.Vector3(-37.5, 0, -44.5), new THREE.Vector3(-37.0, 2.0, -33.5));
    physics.addCollider(new THREE.Vector3(-33.0, 0, -44.5), new THREE.Vector3(-32.5, 2.0, -33.5));

    // --- Bridge 2: Town Main Road Bridge (Concrete & Asphalt) ---
    // Connects X = 25 across Z = -44 to Z = -34
    const roadBridge = new THREE.Group();
    roadBridge.position.set(25, 0, -39);

    const rbDeckGeo = new THREE.BoxGeometry(13.0, 0.6, 10.5);
    const rbDeckMat = CelShaders.createToonMaterial(0x7f8c8d);
    const rbDeck = new THREE.Mesh(rbDeckGeo, rbDeckMat);
    rbDeck.position.y = 0.1;
    roadBridge.add(rbDeck);

    // Asphalt surface on bridge
    const rbAspGeo = new THREE.PlaneGeometry(8, 10.4);
    rbAspGeo.rotateX(-Math.PI / 2);
    const rbAspMat = CelShaders.createToonMaterial(0x3d4044);
    const rbAsp = new THREE.Mesh(rbAspGeo, rbAspMat);
    rbAsp.position.y = 0.42;
    roadBridge.add(rbAsp);

    // White bridge side walls
    const rbWallGeo = new THREE.BoxGeometry(0.4, 0.9, 10.5);
    const rbWallMat = CelShaders.createToonMaterial(0xecf0f1);
    const leftRbWall = new THREE.Mesh(rbWallGeo, rbWallMat);
    leftRbWall.position.set(-6.3, 0.85, 0);
    roadBridge.add(leftRbWall);

    const rightRbWall = leftRbWall.clone();
    rightRbWall.position.x = 6.3;
    roadBridge.add(rightRbWall);

    this.group.add(roadBridge);

    // --- Bridge 3: Railway Iron Truss Bridge ---
    // At X = 60, Z across -44 to -34
    const trussGroup = new THREE.Group();
    trussGroup.position.set(60, 0.8, -39);

    const trussSteelMat = CelShaders.createToonMaterial(0x27ae60); // Classic dark green railway steel
    // Base girder
    const baseGirder = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.8, 12.0), trussSteelMat);
    trussGroup.add(baseGirder);

    // Vertical & diagonal truss steel frame
    const trussSideGeo = new THREE.BoxGeometry(0.3, 3.2, 12.0);
    const leftTruss = new THREE.Mesh(trussSideGeo, trussSteelMat);
    leftTruss.position.set(-2.4, 1.8, 0);
    trussGroup.add(leftTruss);

    const rightTruss = leftTruss.clone();
    rightTruss.position.x = 2.4;
    trussGroup.add(rightTruss);

    // Top cross beams
    for (let bz = -5.0; bz <= 5.0; bz += 2.5) {
      const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.25, 0.25), trussSteelMat);
      crossBeam.position.set(0, 3.4, bz);
      trussGroup.add(crossBeam);
    }

    this.group.add(trussGroup);
  }

  private createShrineHill(): void {
    // Stepped hillside rising from Z = -45 (Y=0) to Z = -75 (Y=5.0) at X from -65 to -15
    const hillMat = CelShaders.createToonMaterial(0x769e58);
    const hillGeo = new THREE.BoxGeometry(45, 5.0, 32);
    const hill = new THREE.Mesh(hillGeo, hillMat);
    hill.position.set(-38, 2.4, -66);
    hill.receiveShadow = true;
    this.group.add(hill);

    // Grand Stone Staircase (參道 / Sando)
    // Runs from bridge exit at (X = -35, Z = -44) up to (X = -35, Z = -58)
    const stepCount = 20;
    const stepMat = CelShaders.createToonMaterial(0xa0a7ab); // Weathered granite stone
    for (let i = 0; i < stepCount; i++) {
      const stepY = i * 0.25;
      const stepZ = -44.5 - i * 0.65;
      const stepGeo = new THREE.BoxGeometry(4.0, 0.26, 0.7);
      const step = new THREE.Mesh(stepGeo, stepMat);
      step.position.set(-35, stepY + 0.13, stepZ);
      step.receiveShadow = true;
      this.group.add(step);
    }

    // Stone retaining side walls along staircase
    const stairWallGeo = new THREE.BoxGeometry(0.4, 5.5, 14.0);
    const stairWallMat = CelShaders.createToonMaterial(0x8a9296);

    const leftStairWall = new THREE.Mesh(stairWallGeo, stairWallMat);
    leftStairWall.position.set(-37.2, 2.5, -51);
    this.group.add(leftStairWall);

    const rightStairWall = leftStairWall.clone();
    rightStairWall.position.x = -32.8;
    this.group.add(rightStairWall);

    // Hilltop Gravel Plaza (境内)
    const plazaGeo = new THREE.PlaneGeometry(42, 24);
    plazaGeo.rotateX(-Math.PI / 2);
    const plazaMat = CelShaders.createToonMaterial(0xd7ccc8); // Fine white-beige shrine gravel
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(-38, 5.02, -68);
    plaza.receiveShadow = true;
    this.group.add(plaza);

    // Hillside stone colliders for safety
    physics.addCollider(new THREE.Vector3(-62, 0, -82), new THREE.Vector3(-14, 5.5, -45));
  }
}
