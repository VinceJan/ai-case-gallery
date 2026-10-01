// src/world/FoliageAndProps.ts
// Anime cherry blossom trees, utility poles with wires, vending machines, streetlights.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from './LightingSky';
import { physics } from '../engine/Physics';

export interface VendingMachineItem {
  id: string;
  name: string;
  jpName: string;
  price: number;
}

export class FoliageAndProps {
  public group: THREE.Group;
  public vendingMachines: { mesh: THREE.Mesh; position: THREE.Vector3 }[] = [];
  public streetLightMeshes: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // 1. Cherry Blossom Trees (Sakura)
    this.createCherryBlossomTrees();

    // 2. Evergreen trees and garden bushes
    this.createShrubsAndEvergreens();

    // 3. Japanese Utility Poles (電柱) and overhead wires
    this.createUtilityPoles();

    // 4. Street Lamps with lighting hooks
    this.createStreetLamps(lighting);

    // 5. Interactive Vending Machines
    this.createVendingMachines(lighting);

    // 6. Japanese Red Mailboxes (郵便ポスト) & Road Curve Mirrors (カーブミラー)
    this.createStreetFurniture();
  }

  private createCherryBlossomTrees(): void {
    // Strategic locations: Riverbank, Station, Crossing, Shrine, School, Residential
    const treeLocations = [
      // River canal promenade (South bank)
      { x: -65, z: -32, s: 1.2 },
      { x: -48, z: -32, s: 1.1 },
      { x: -22, z: -32, s: 1.3 },
      { x: -5,  z: -32, s: 1.15 },
      { x: 12,  z: -32, s: 1.25 },
      { x: 42,  z: -32, s: 1.1 },
      { x: 75,  z: -32, s: 1.3 },
      // Station Plaza & Crossing
      { x: -18, z: 12, s: 1.2 },
      { x: 14,  z: 22, s: 1.35 }, // Dramatic sakura tree next to railway crossing!
      { x: 34,  z: 26, s: 1.1 },
      // Shrine grounds
      { x: -38, z: -76, s: 1.8, isSacred: true }, // Ancient Sacred Tree (御神木)
      { x: -52, z: -68, s: 1.2 },
      { x: -24, z: -65, s: 1.3 },
      // School courtyard
      { x: -28, z: 58, s: 1.4 },
      // Residential alleys
      { x: -48, z: -2, s: 1.05 },
      { x: -62, z: -16, s: 1.1 }
    ];

    treeLocations.forEach((loc) => {
      const tree = this.buildSakuraTree(loc.s, loc.isSacred);
      // Adjust ground height
      const y = physics.getGroundHeight(loc.x, loc.z);
      tree.position.set(loc.x, y, loc.z);
      this.group.add(tree);

      // Add trunk obstacle
      physics.addCollider(
        new THREE.Vector3(loc.x - 0.5 * loc.s, y, loc.z - 0.5 * loc.s),
        new THREE.Vector3(loc.x + 0.5 * loc.s, y + 4.0 * loc.s, loc.z + 0.5 * loc.s)
      );
    });
  }

  private buildSakuraTree(scale: number = 1.0, isSacred: boolean = false): THREE.Group {
    const tree = new THREE.Group();

    // Dark bark trunk
    const trunkMat = CelShaders.createToonMaterial(0x4a3728);
    const trunkGeo = new THREE.CylinderGeometry(0.35 * scale, 0.55 * scale, 3.5 * scale, 8);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = (3.5 * scale) / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    // Gnarled branches
    const branchMat = trunkMat;
    const branchOffsets = [
      { rx: 0.4, rz: 0.5, y: 2.2 * scale },
      { rx: -0.35, rz: -0.4, y: 2.6 * scale },
      { rx: 0.2, rz: -0.6, y: 2.9 * scale }
    ];

    branchOffsets.forEach((b) => {
      const bGeo = new THREE.CylinderGeometry(0.18 * scale, 0.28 * scale, 1.8 * scale, 6);
      const branch = new THREE.Mesh(bGeo, branchMat);
      branch.position.set(0, b.y, 0);
      branch.rotation.set(b.rx, 0, b.rz);
      tree.add(branch);
    });

    // Fluffy anime sakura canopies
    const pinkFoliageMat = CelShaders.createToonMaterial(isSacred ? 0xffc4d6 : 0xffb3c6);
    const lightPinkMat = CelShaders.createToonMaterial(0xffe5ec);

    const foliagePuffs = [
      { x: 0, y: 3.8 * scale, z: 0, r: 1.8 * scale, mat: pinkFoliageMat },
      { x: 1.2 * scale, y: 3.4 * scale, z: 0.6 * scale, r: 1.5 * scale, mat: lightPinkMat },
      { x: -1.3 * scale, y: 3.5 * scale, z: -0.5 * scale, r: 1.6 * scale, mat: pinkFoliageMat },
      { x: 0.4 * scale, y: 3.6 * scale, z: -1.2 * scale, r: 1.4 * scale, mat: lightPinkMat },
      { x: -0.5 * scale, y: 4.4 * scale, z: 0.4 * scale, r: 1.3 * scale, mat: pinkFoliageMat }
    ];

    foliagePuffs.forEach((p) => {
      const puffGeo = new THREE.DodecahedronGeometry(p.r, 1);
      const puff = new THREE.Mesh(puffGeo, p.mat);
      puff.position.set(p.x, p.y, p.z);
      puff.castShadow = true;
      puff.receiveShadow = true;
      tree.add(puff);
    });

    // If sacred tree, add Shinto Shimenawa sacred rope & white zigzag Shide paper
    if (isSacred) {
      const ropeMat = CelShaders.createToonMaterial(0xe0cdab); // Rice straw rope
      const ropeGeo = new THREE.TorusGeometry(0.65 * scale, 0.08 * scale, 8, 16);
      ropeGeo.rotateX(Math.PI / 2);
      const rope = new THREE.Mesh(ropeGeo, ropeMat);
      rope.position.y = 1.8 * scale;
      tree.add(rope);

      // White paper zigzags (Shide)
      const shideMat = CelShaders.createToonMaterial(0xffffff);
      for (let s = 0; s < 4; s++) {
        const shide = new THREE.Mesh(new THREE.PlaneGeometry(0.18 * scale, 0.4 * scale), shideMat);
        const angle = (s * Math.PI) / 2;
        shide.position.set(Math.cos(angle) * 0.7 * scale, 1.6 * scale, Math.sin(angle) * 0.7 * scale);
        shide.rotation.y = angle;
        tree.add(shide);
      }
    }

    return tree;
  }

  private createShrubsAndEvergreens(): void {
    // Green trimmed boxwoods and garden shrubs
    const greenMat = CelShaders.createToonMaterial(0x2d6a4f);
    const flowerMat = CelShaders.createToonMaterial(0x9d4edd); // Purple hydrangeas

    const shrubCoords = [
      { x: 18, z: 2 },
      { x: 18, z: -10 },
      { x: 32, z: 2 },
      { x: 32, z: -12 },
      { x: -26, z: 14 },
      { x: -44, z: -6 },
      { x: -50, z: -6 },
      { x: -40, z: -46 }
    ];

    shrubCoords.forEach((c) => {
      const y = physics.getGroundHeight(c.x, c.z);
      const shrub = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6, 1), greenMat);
      shrub.position.set(c.x, y + 0.4, c.z);
      shrub.castShadow = true;
      this.group.add(shrub);

      // Occasional hydrangea flower dot
      if (Math.random() > 0.4) {
        const flower = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 1), flowerMat);
        flower.position.set(c.x + 0.2, y + 0.55, c.z + 0.15);
        this.group.add(flower);
      }
    });
  }

  private createUtilityPoles(): void {
    // Concrete utility poles lining main street and residential alley
    const poleMat = CelShaders.createToonMaterial(0x95a5a6);
    const boxMat = CelShaders.createToonMaterial(0x576574);
    const insulatorMat = CelShaders.createToonMaterial(0xecf0f1);

    const polePositions = [
      new THREE.Vector3(18.5, 0, 38),
      new THREE.Vector3(18.5, 0, 18),
      new THREE.Vector3(18.5, 0, -2),
      new THREE.Vector3(18.5, 0, -22),
      new THREE.Vector3(31.5, 0, 28),
      new THREE.Vector3(31.5, 0, 8),
      new THREE.Vector3(31.5, 0, -12),
      new THREE.Vector3(-10, 0, 15),
      new THREE.Vector3(-30, 0, 15),
      new THREE.Vector3(-45, 0, 15),
      new THREE.Vector3(-45, 0, -5),
      new THREE.Vector3(-45, 0, -25)
    ];

    const poleTops: THREE.Vector3[] = [];

    polePositions.forEach((pos) => {
      const poleGroup = new THREE.Group();
      const groundY = physics.getGroundHeight(pos.x, pos.z);
      poleGroup.position.set(pos.x, groundY, pos.z);

      // Main concrete column (9m high)
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 9.0, 8), poleMat);
      column.position.y = 4.5;
      column.castShadow = true;
      poleGroup.add(column);

      // Cylindrical transformer bucket
      const transformer = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.9, 8), boxMat);
      transformer.position.set(0.35, 6.8, 0);
      poleGroup.add(transformer);

      // Top crossarms
      const crossarm1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.12), boxMat);
      crossarm1.position.set(0, 8.2, 0);
      poleGroup.add(crossarm1);

      const crossarm2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 0.1), boxMat);
      crossarm2.position.set(0, 7.5, 0);
      poleGroup.add(crossarm2);

      // White ceramic insulators on crossarms
      for (const offset of [-0.65, 0, 0.65]) {
        const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.14, 6), insulatorMat);
        ins.position.set(offset, 8.35, 0);
        poleGroup.add(ins);
      }

      this.group.add(poleGroup);

      // Add collider
      physics.addCollider(
        new THREE.Vector3(pos.x - 0.25, groundY, pos.z - 0.25),
        new THREE.Vector3(pos.x + 0.25, groundY + 9.0, pos.z + 0.25)
      );

      poleTops.push(new THREE.Vector3(pos.x, groundY + 8.35, pos.z));
    });

    // Connect wires between sequential poles
    const wireMat = new THREE.LineBasicMaterial({ color: 0x222f3e, linewidth: 2 });
    for (let i = 0; i < poleTops.length - 1; i++) {
      const p1 = poleTops[i];
      const p2 = poleTops[i + 1];
      const dist = p1.distanceTo(p2);
      if (dist < 35) {
        // Create subtle sagging catenary curve
        const curvePoints: THREE.Vector3[] = [];
        const segments = 8;
        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const pt = new THREE.Vector3().lerpVectors(p1, p2, t);
          // Sagging parabola
          pt.y -= Math.sin(t * Math.PI) * 0.45;
          curvePoints.push(pt);
        }
        const wireGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const wire = new THREE.Line(wireGeo, wireMat);
        this.group.add(wire);
      }
    }
  }

  private createStreetLamps(lighting: LightingSky): void {
    const lampMat = CelShaders.createToonMaterial(0x34495e);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });

    const lampPositions = [
      new THREE.Vector3(20, 0, 25), // Next to railway crossing
      new THREE.Vector3(20, 0, 5),  // Outside Sakura Mart
      new THREE.Vector3(20, 0, -18), // Outside Cafe Komorebi
      new THREE.Vector3(-15, 0, 16), // Station Plaza
      new THREE.Vector3(-35, 0, 16), // Station West
      new THREE.Vector3(-45, 0, -14), // Residential Alley
      new THREE.Vector3(-35, 0, -32), // Red Bridge Entrance
      new THREE.Vector3(25, 0, -32)  // Road Bridge Entrance
    ];

    lampPositions.forEach((pos) => {
      const groundY = physics.getGroundHeight(pos.x, pos.z);
      const lamp = new THREE.Group();
      lamp.position.set(pos.x, groundY, pos.z);

      // Curved steel pole (4.2m)
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 4.2, 8), lampMat);
      post.position.y = 2.1;
      lamp.add(post);

      // Overhanging arm
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.08), lampMat);
      arm.position.set(0.35, 4.2, 0);
      lamp.add(arm);

      // Lantern housing
      const hood = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.2, 6), lampMat);
      hood.position.set(0.7, 4.2, 0);
      lamp.add(hood);

      // Glowing bulb mesh
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), bulbMat);
      bulb.position.set(0.7, 4.05, 0);
      lamp.add(bulb);

      // Point light
      const light = new THREE.PointLight(0xffe8a1, 0.0, 16, 1.8);
      light.position.set(0.7, 4.0, 0);
      lamp.add(light);
      lighting.registerNightLight(light);

      this.group.add(lamp);
      physics.addCollider(
        new THREE.Vector3(pos.x - 0.2, groundY, pos.z - 0.2),
        new THREE.Vector3(pos.x + 0.2, groundY + 4.2, pos.z + 0.2)
      );
    });
  }

  private createVendingMachines(lighting: LightingSky): void {
    const locations = [
      { x: -14, z: 18, rotY: 0 },         // Station Plaza
      { x: 33, z: 12, rotY: -Math.PI / 2 }, // Outside Sakura Mart
      { x: -42, z: -6, rotY: Math.PI }     // Residential corner
    ];

    locations.forEach((loc) => {
      const groundY = physics.getGroundHeight(loc.x, loc.z);
      const vendGroup = new THREE.Group();
      vendGroup.position.set(loc.x, groundY, loc.z);
      vendGroup.rotation.y = loc.rotY;

      // Outer metal cabinet (H: 1.85m, W: 1.0m, D: 0.75m)
      const bodyMat = CelShaders.createToonMaterial(0xdf283b); // Japanese vending machine red
      const bodyGeo = new THREE.BoxGeometry(1.0, 1.85, 0.75);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 1.85 / 2;
      body.castShadow = true;
      vendGroup.add(body);

      // Front display face with procedural drink texture
      const frontTex = TextureGenerator.createVendingMachineTexture();
      const faceMat = new THREE.MeshBasicMaterial({ map: frontTex });
      const faceGeo = new THREE.PlaneGeometry(0.96, 1.8);
      const face = new THREE.Mesh(faceGeo, faceMat);
      face.position.set(0, 1.85 / 2, 0.38);
      vendGroup.add(face);

      // Night glow light
      const vendLight = new THREE.PointLight(0xffffff, 0.0, 5);
      vendLight.position.set(0, 1.2, 0.6);
      vendGroup.add(vendLight);
      lighting.registerNightLight(vendLight);

      // Recycling bin for empty cans next to vending machine
      const binMat = CelShaders.createToonMaterial(0x1976d2);
      const bin = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.4), binMat);
      bin.position.set(0.75, 0.425, 0);
      vendGroup.add(bin);

      // Two round holes on top for cans/plastic bottles
      const holeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
      const hole1 = new THREE.Mesh(new THREE.CircleGeometry(0.07, 8), holeMat);
      hole1.rotation.x = -Math.PI / 2;
      hole1.position.set(0.75, 0.855, -0.08);
      vendGroup.add(hole1);

      this.group.add(vendGroup);

      // Collider
      physics.addCollider(
        new THREE.Vector3(loc.x - 0.7, groundY, loc.z - 0.5),
        new THREE.Vector3(loc.x + 0.7, groundY + 1.9, loc.z + 0.5)
      );

      this.vendingMachines.push({
        mesh: body,
        position: new THREE.Vector3(loc.x, groundY, loc.z)
      });
    });
  }

  private createStreetFurniture(): void {
    // 1. Japanese Red Postbox (郵便ポスト) at Station Plaza (-12, 16)
    const postMat = CelShaders.createToonMaterial(0xd32f2f);
    const postGroup = new THREE.Group();
    postGroup.position.set(-11, 0, 16);

    const postBase = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.1, 0.55), postMat);
    postBase.position.y = 0.55;
    postBase.castShadow = true;
    postGroup.add(postBase);

    // Letter insertion slit
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.05), new THREE.MeshBasicMaterial({ color: 0x111 }));
    slit.position.set(0, 0.9, 0.28);
    postGroup.add(slit);

    // White Post mark 〒
    const markCanvas = document.createElement('canvas');
    markCanvas.width = 128;
    markCanvas.height = 128;
    const mctx = markCanvas.getContext('2d')!;
    mctx.fillStyle = '#ffffff';
    mctx.font = 'bold 90px sans-serif';
    mctx.textAlign = 'center';
    mctx.textBaseline = 'middle';
    mctx.fillText('〒', 64, 64);
    const markTex = new THREE.CanvasTexture(markCanvas);
    const markMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.25), new THREE.MeshBasicMaterial({ map: markTex, transparent: true }));
    markMesh.position.set(0, 0.65, 0.28);
    postGroup.add(markMesh);

    this.group.add(postGroup);
    physics.addCollider(new THREE.Vector3(-11.3, 0, 15.7), new THREE.Vector3(-10.7, 1.2, 16.3));

    // 2. Curved Road Traffic Mirror (カーブミラー) at residential corner (-43, -10)
    const mirrorGroup = new THREE.Group();
    mirrorGroup.position.set(-43, 0, -10.5);

    const mirrorPoleMat = CelShaders.createToonMaterial(0xff7043); // Japanese safety orange pole
    const mPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8), mirrorPoleMat);
    mPole.position.y = 1.6;
    mirrorGroup.add(mPole);

    // Round convex mirror with orange hood
    const mirrorHood = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 16), mirrorPoleMat);
    mirrorHood.rotation.x = Math.PI / 2;
    mirrorHood.position.set(0, 3.1, 0.2);
    mirrorGroup.add(mirrorHood);

    // Silver mirror surface
    const mirrorFace = new THREE.Mesh(new THREE.CircleGeometry(0.38, 16), new THREE.MeshBasicMaterial({ color: 0xecf0f1 }));
    mirrorFace.position.set(0, 3.1, 0.26);
    mirrorGroup.add(mirrorFace);

    this.group.add(mirrorGroup);
  }
}
