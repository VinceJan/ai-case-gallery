// src/world/TerrainAndRoads.ts
// Japanese town terrain, road network, stone embankments, canal river, and 3 iconic bridges.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { physics } from '../engine/Physics';

export class TerrainAndRoads {
  public group: THREE.Group;
  public riverWater: THREE.Mesh;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // 1. Base Green Field
    this.buildTerrainGround();

    // 2. Asphalt Roads & Side Ditches (側溝)
    this.buildRoadNetwork();

    // 3. Sakura River Canal with Stone Embankments & Stylized Water
    this.riverWater = this.buildRiverCanal();

    // 4. Three Distinctive Bridges
    this.buildThreeBridges();

    // 5. Shrine Hill Stairs & School Yard
    this.buildShrineHillStairs();
    this.buildSchoolGround();
  }

  private buildTerrainGround(): void {
    // 240x240m terrain mesh with subdivisions for curved world vertex deformation
    const geo = new THREE.PlaneGeometry(260, 260, 48, 48);
    geo.rotateX(-Math.PI / 2);

    const mat = CelShaders.createToonMaterial(0x81c784); // Spring lawn green
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.position.y = -0.05;
    this.group.add(mesh);
  }

  private buildRoadNetwork(): void {
    const roadMat = CelShaders.createToonMaterial(0x42464b, {
      map: TextureGenerator.createRoadTexture()
    });
    const crosswalkMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createCrosswalkTexture()
    });
    const curbMat = CelShaders.createToonMaterial(0xb0bec5);
    const ditchMat = CelShaders.createToonMaterial(0x263238);

    // Helper: Build straight road segment with curb and side drainage gutters
    const addRoadSegment = (
      centerX: number,
      centerZ: number,
      width: number,
      length: number,
      isVertical: boolean
    ) => {
      const w = isVertical ? width : length;
      const d = isVertical ? length : width;

      // Asphalt
      const roadGeo = new THREE.PlaneGeometry(w, d);
      roadGeo.rotateX(-Math.PI / 2);
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.position.set(centerX, 0.02, centerZ);
      road.receiveShadow = true;
      this.group.add(road);

      // Drainage Gutters (側溝) and curbstones along the two sides
      if (isVertical) {
        for (const side of [-1, 1]) {
          const edgeX = centerX + side * (width / 2 + 0.25);
          // Gutter
          const gutter = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, length), ditchMat);
          gutter.position.set(edgeX, 0.01, centerZ);
          this.group.add(gutter);

          // Curbstone
          const curb = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, length), curbMat);
          curb.position.set(centerX + side * (width / 2 + 0.6), 0.08, centerZ);
          this.group.add(curb);
        }
      } else {
        for (const side of [-1, 1]) {
          const edgeZ = centerZ + side * (width / 2 + 0.25);
          // Gutter
          const gutter = new THREE.Mesh(new THREE.BoxGeometry(length, 0.1, 0.5), ditchMat);
          gutter.position.set(centerX, 0.01, edgeZ);
          this.group.add(gutter);

          // Curbstone
          const curb = new THREE.Mesh(new THREE.BoxGeometry(length, 0.15, 0.2), curbMat);
          curb.position.set(centerX, 0.08, centerZ + side * (width / 2 + 0.6));
          this.group.add(curb);
        }
      }
    };

    // 1. Ekimae Station Avenue (North-South main street from station across the town)
    addRoadSegment(15, 0, 8.0, 70, true);

    // 2. Station Plaza Promenade (East-West along station)
    addRoadSegment(0, 18, 55, 7.5, false);

    // 3. River Promenade Road (South of river)
    addRoadSegment(0, -28, 120, 6.0, false);

    // 4. North Bank Shrine Lane (North of river)
    addRoadSegment(-20, -42, 90, 5.5, false);

    // 5. Residential Alleyway
    addRoadSegment(-45, -5, 5.0, 50, true);

    // Crosswalks (横断歩道)
    const addCrosswalk = (x: number, z: number, w: number, d: number) => {
      const cwGeo = new THREE.PlaneGeometry(w, d);
      cwGeo.rotateX(-Math.PI / 2);
      const cw = new THREE.Mesh(cwGeo, crosswalkMat);
      cw.position.set(x, 0.03, z);
      this.group.add(cw);
    };

    addCrosswalk(15, 14, 8.0, 4.0); // Station Plaza intersection
    addCrosswalk(15, -28, 8.0, 4.0); // River Promenade intersection
    addCrosswalk(-45, 18, 5.0, 3.5); // Residential lane crossing
  }

  private buildRiverCanal(): THREE.Mesh {
    const riverLength = 180;
    const riverWidth = 9.0;
    const canalZ = -35;

    // Stylized Anime Water Surface
    const waterMat = CelShaders.createAnimeWaterMaterial();
    const waterGeo = new THREE.PlaneGeometry(riverLength, riverWidth, 64, 8);
    waterGeo.rotateX(-Math.PI / 2);

    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(0, -0.65, canalZ);
    this.group.add(water);

    // Stone Embankments (護岸)
    const stoneWallMat = CelShaders.createToonMaterial(0x78909c);
    const wallHeight = 1.4;

    for (const sign of [-1, 1]) {
      const wallZ = canalZ + sign * (riverWidth / 2 + 0.4);
      const wallGeo = new THREE.BoxGeometry(riverLength, wallHeight, 0.8);
      const wall = new THREE.Mesh(wallGeo, stoneWallMat);
      wall.position.set(0, -0.1, wallZ);
      wall.receiveShadow = true;
      wall.castShadow = true;
      this.group.add(wall);

      // Register collision boundaries for canal edge to prevent falling
      physics.addBox(0, wallZ, riverLength, 0.8, 'canal_wall');
    }

    return water;
  }

  private buildThreeBridges(): void {
    // Bridge 1: Red Vermilion Shinto Bridge (神橋 - Taiko Bridge) leading to Shrine
    this.buildRedShrineBridge(-35, -35);

    // Bridge 2: Central Town Stone Bridge (本町大橋) for main avenue
    this.buildTownStoneBridge(15, -35);

    // Bridge 3: Railway Steel Truss Bridge (鉄道鉄橋) for train line
    this.buildRailwayTrussBridge(60, -35);
  }

  private buildRedShrineBridge(x: number, z: number): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(x, 0, z);

    const redMat = CelShaders.createToonMaterial(0xc0392b); // Shinto vermilion red
    const woodDeckMat = CelShaders.createToonMaterial(0x8d6e63);
    const goldCapMat = CelShaders.createToonMaterial(0xf1c40f);

    // Curved arched bridge deck
    const deckGeo = new THREE.BoxGeometry(5.0, 0.35, 12.0);
    const deck = new THREE.Mesh(deckGeo, woodDeckMat);
    deck.position.set(0, 0.35, 0);
    deck.receiveShadow = true;
    bridgeGroup.add(deck);

    // Red lacquered railings with ornamental giboshi posts
    for (const side of [-1, 1]) {
      const railX = side * 2.3;
      // Horizontal rail
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 12.0, 8), redMat);
      rail.rotation.x = Math.PI / 2;
      rail.position.set(railX, 1.15, 0);
      bridgeGroup.add(rail);

      const bottomRail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 12.0, 8), redMat);
      bottomRail.rotation.x = Math.PI / 2;
      bottomRail.position.set(railX, 0.75, 0);
      bridgeGroup.add(bottomRail);

      // Vertical posts with golden giboshi onion caps (擬宝珠)
      for (let pz = -5.5; pz <= 5.5; pz += 2.2) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9, 8), redMat);
        post.position.set(railX, 0.8, pz);
        bridgeGroup.add(post);

        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), goldCapMat);
        cap.position.set(railX, 1.28, pz);
        bridgeGroup.add(cap);
      }
    }

    this.group.add(bridgeGroup);
  }

  private buildTownStoneBridge(x: number, z: number): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(x, 0, z);

    const stoneMat = CelShaders.createToonMaterial(0xb0bec5);
    const asphaltMat = CelShaders.createToonMaterial(0x3a3d40);

    // Roadbed
    const deck = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.4, 12.5), asphaltMat);
    deck.position.set(0, 0.25, 0);
    deck.receiveShadow = true;
    bridgeGroup.add(deck);

    // Solid concrete parapets
    for (const side of [-1, 1]) {
      const pX = side * 4.45;
      const parapet = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 12.5), stoneMat);
      parapet.position.set(pX, 0.75, 0);
      parapet.castShadow = true;
      bridgeGroup.add(parapet);

      // Bridge nameplates (親柱)
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.7), stoneMat);
      pillar.position.set(pX, 0.85, 6.2);
      bridgeGroup.add(pillar);

      const pillar2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.7), stoneMat);
      pillar2.position.set(pX, 0.85, -6.2);
      bridgeGroup.add(pillar2);
    }

    this.group.add(bridgeGroup);
  }

  private buildRailwayTrussBridge(x: number, z: number): void {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(x, 0, z);

    const steelMat = CelShaders.createToonMaterial(0xe74c3c); // Iconic Japanese red railway steel truss

    // Longitudinal bottom girders
    for (const side of [-1, 1]) {
      const bX = side * 2.2;
      const girder = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 14.0), steelMat);
      girder.position.set(bX, 0.3, 0);
      girder.castShadow = true;
      bridgeGroup.add(girder);

      // Top truss beam
      const topGirder = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 14.0), steelMat);
      topGirder.position.set(bX, 3.8, 0);
      bridgeGroup.add(topGirder);

      // Diagonal cross-truss steel lattice
      for (let t = -6; t <= 4; t += 2.5) {
        const diag1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.2, 0.18), steelMat);
        diag1.position.set(bX, 2.0, t + 1.25);
        diag1.rotation.x = Math.PI / 4;
        bridgeGroup.add(diag1);

        const diag2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.2, 0.18), steelMat);
        diag2.position.set(bX, 2.0, t + 1.25);
        diag2.rotation.x = -Math.PI / 4;
        bridgeGroup.add(diag2);
      }
    }

    this.group.add(bridgeGroup);
  }

  private buildShrineHillStairs(): void {
    // Stone stairs leading up to the hillside shrine on the northwest
    const stairMat = CelShaders.createToonMaterial(0x90a4ae);
    const startX = -38;
    const startZ = -46;
    const stepsCount = 18;

    for (let i = 0; i < stepsCount; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.25, 0.9), stairMat);
      step.position.set(startX, 0.15 + i * 0.26, startZ - i * 0.85);
      step.receiveShadow = true;
      this.group.add(step);
    }
  }

  private buildSchoolGround(): void {
    // School sports ground in the southeast (-30 to -10 X, 45 to 75 Z)
    const gravelMat = CelShaders.createToonMaterial(0xd7ccc8);
    const groundGeo = new THREE.PlaneGeometry(35, 30);
    groundGeo.rotateX(-Math.PI / 2);
    const ground = new THREE.Mesh(groundGeo, gravelMat);
    ground.position.set(-30, 0.015, 60);
    ground.receiveShadow = true;
    this.group.add(ground);

    // Soccer Goal
    const goalMat = CelShaders.createToonMaterial(0xffffff);
    const goal = new THREE.Group();
    goal.position.set(-30, 0, 72);

    const crossbar = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.12, 0.12), goalMat);
    crossbar.position.set(0, 2.2, 0);
    goal.add(crossbar);

    const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.12), goalMat);
    post1.position.set(-2.5, 1.1, 0);
    goal.add(post1);

    const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.12), goalMat);
    post2.position.set(2.5, 1.1, 0);
    goal.add(post2);

    this.group.add(goal);
  }

  public update(time: number): void {
    // Update anime water time uniform
    const mat = this.riverWater.material as THREE.ShaderMaterial;
    if (mat && mat.uniforms && mat.uniforms.uTime) {
      mat.uniforms.uTime.value = time;
    }
  }
}
