// src/world/FoliageAndProps.ts
// Lush cherry blossom trees, Japanese pine trees, utility poles with wires, vending machines, and street props.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from './LightingSky';

export class FoliageAndProps {
  public group: THREE.Group;
  private lighting: LightingSky;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.lighting = lighting;

    // 1. Lush Cherry Blossom Trees (Somei Yoshino)
    this.buildSakuraTrees();

    // 2. Evergreen Pines & Azalea Bushes
    this.buildPinesAndBushes();

    // 3. Japanese Utility Poles (電柱) with Hanging Overhead Cables
    this.buildUtilityPolesWithWires();

    // 4. Street Lamps, Postbox, Phone Booth, Mirrors
    this.buildStreetFurniture();

    // 5. Outdoor Drink Vending Machines (自動販売機)
    this.buildVendingMachines();
  }

  private buildSakuraTrees(): void {
    const trunkMat = CelShaders.createToonMaterial(0x5d4037);
    const blossomMat = CelShaders.createToonMaterial(0xffccd5);
    const darkBlossomMat = CelShaders.createToonMaterial(0xf8a5c2);

    const treePositions = [
      // Along River Promenade (Both banks)
      { x: -50, z: -30, scale: 1.1 },
      { x: -38, z: -30, scale: 1.2 },
      { x: -20, z: -30, scale: 1.0 },
      { x: -5, z: -30, scale: 1.15 },
      { x: 5, z: -30, scale: 1.2 },
      { x: 26, z: -30, scale: 1.05 },
      { x: 42, z: -30, scale: 1.25 },

      { x: -50, z: -40, scale: 1.1 },
      { x: -22, z: -40, scale: 1.2 },
      { x: -8, z: -40, scale: 1.0 },
      { x: 8, z: -40, scale: 1.15 },
      { x: 30, z: -40, scale: 1.1 },
      { x: 48, z: -40, scale: 1.2 },

      // Around Sakura Station & Ekimae Plaza
      { x: -26, z: 12, scale: 1.2 },
      { x: -4, z: 12, scale: 1.1 },
      { x: 2, z: 24, scale: 1.0 },

      // Near Player House & Residential Quarter
      { x: -38, z: 4, scale: 1.15 },
      { x: -42, z: -20, scale: 1.25 },
      { x: -62, z: -10, scale: 1.1 },

      // Shrine Approach Path & Hillside
      { x: -46, z: -52, scale: 1.3 },
      { x: -30, z: -52, scale: 1.25 },
      { x: -48, z: -68, scale: 1.35 },
      { x: -32, z: -72, scale: 1.4 },

      // School Entrance
      { x: -18, z: 46, scale: 1.15 },
      { x: -10, z: 46, scale: 1.1 }
    ];

    treePositions.forEach((pos) => {
      const tree = new THREE.Group();
      tree.position.set(pos.x, 0, pos.z);
      tree.scale.setScalar(pos.scale);

      // Curved organic trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.48, 3.8, 8), trunkMat);
      trunk.position.y = 1.9;
      trunk.castShadow = true;
      tree.add(trunk);

      // Branches
      const branch1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 2.2, 6), trunkMat);
      branch1.position.set(0.6, 3.2, 0.4);
      branch1.rotation.z = -Math.PI / 4;
      branch1.rotation.y = 0.5;
      tree.add(branch1);

      const branch2 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 2.0, 6), trunkMat);
      branch2.position.set(-0.6, 3.3, -0.3);
      branch2.rotation.z = Math.PI / 3.8;
      branch2.rotation.y = -0.6;
      tree.add(branch2);

      // Multi-tier fluffy cherry blossom canopy clusters
      const foliageOffsets = [
        { x: 0, y: 4.8, z: 0, r: 2.1, mat: blossomMat },
        { x: 1.3, y: 4.2, z: 0.8, r: 1.6, mat: darkBlossomMat },
        { x: -1.2, y: 4.3, z: -0.7, r: 1.7, mat: blossomMat },
        { x: 0.7, y: 3.9, z: -1.1, r: 1.5, mat: darkBlossomMat },
        { x: -0.8, y: 4.1, z: 1.2, r: 1.55, mat: blossomMat },
        { x: 0, y: 5.6, z: 0, r: 1.4, mat: blossomMat }
      ];

      foliageOffsets.forEach((f) => {
        const cluster = new THREE.Mesh(new THREE.DodecahedronGeometry(f.r, 2), f.mat);
        cluster.position.set(f.x, f.y, f.z);
        cluster.castShadow = true;
        cluster.receiveShadow = true;
        tree.add(cluster);
      });

      this.group.add(tree);
    });
  }

  private buildPinesAndBushes(): void {
    const pineTrunkMat = CelShaders.createToonMaterial(0x4e342e);
    const pineNeedleMat = CelShaders.createToonMaterial(0x1b5e20);
    const bushMat = CelShaders.createToonMaterial(0x388e3c);

    // Japanese Black Pines (Near Shrine and North Hill)
    const pinePositions = [
      { x: -55, z: -62, scale: 1.2 },
      { x: -25, z: -70, scale: 1.3 },
      { x: 62, z: -15, scale: 1.1 }
    ];

    pinePositions.forEach((pos) => {
      const pine = new THREE.Group();
      pine.position.set(pos.x, 0, pos.z);
      pine.scale.setScalar(pos.scale);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 4.5, 8), pineTrunkMat);
      trunk.position.y = 2.25;
      trunk.castShadow = true;
      pine.add(trunk);

      // 3 Tiered horizontal pine cone tiers
      for (let i = 0; i < 3; i++) {
        const tier = new THREE.Mesh(
          new THREE.ConeGeometry(2.5 - i * 0.6, 1.6, 7),
          pineNeedleMat
        );
        tier.position.y = 3.2 + i * 1.3;
        tier.castShadow = true;
        pine.add(tier);
      }

      this.group.add(pine);
    });

    // Roadside trimmed azalea bushes
    for (let x = -40; x <= 40; x += 14) {
      if (Math.abs(x - 15) < 6) continue; // skip main intersection
      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 8), bushMat);
      bush.scale.set(1.4, 0.8, 1.0);
      bush.position.set(x, 0.4, 21.5);
      bush.castShadow = true;
      this.group.add(bush);
    }
  }

  private buildUtilityPolesWithWires(): void {
    const poleMat = CelShaders.createToonMaterial(0x9e9e9e); // Concrete grey
    const metalMat = CelShaders.createToonMaterial(0x37474f); // Steel arm
    const transMat = CelShaders.createToonMaterial(0x546e7a); // Transformer cylinder
    const wireMat = new THREE.LineBasicMaterial({ color: 0x1e272e, linewidth: 1.5 });

    const polePositions: THREE.Vector3[] = [
      new THREE.Vector3(19.5, 0, 32),
      new THREE.Vector3(19.5, 0, 16),
      new THREE.Vector3(19.5, 0, 0),
      new THREE.Vector3(19.5, 0, -16),
      new THREE.Vector3(19.5, 0, -32),
      new THREE.Vector3(19.5, 0, -48),
      new THREE.Vector3(-12, 0, 22),
      new THREE.Vector3(-36, 0, 22),
      new THREE.Vector3(-48, 0, 6)
    ];

    const wirePoints: THREE.Vector3[] = [];

    polePositions.forEach((pos, idx) => {
      const poleGroup = new THREE.Group();
      poleGroup.position.copy(pos);

      // Concrete Pole (8m tall, slight taper)
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 8.2, 10), poleMat);
      pole.position.y = 4.1;
      pole.castShadow = true;
      poleGroup.add(pole);

      // Steel Crossbars (腕金)
      const crossbar1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 0.12), metalMat);
      crossbar1.position.set(0, 7.4, 0);
      poleGroup.add(crossbar1);

      const crossbar2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 0.1), metalMat);
      crossbar2.position.set(0, 6.5, 0);
      poleGroup.add(crossbar2);

      // High-voltage Transformer Drum (変圧器) on every second pole
      if (idx % 2 === 0) {
        const trans = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.1, 10), transMat);
        trans.position.set(0.48, 6.2, 0);
        poleGroup.add(trans);
      }

      // Street Lamp attached to pole
      const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6), metalMat);
      lampArm.rotation.z = Math.PI / 3;
      lampArm.position.set(-0.5, 4.8, 0);
      poleGroup.add(lampArm);

      const lampHead = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.32, 0.25, 8),
        CelShaders.createToonMaterial(0xfff8e7, { emissive: 0xffecb3, emissiveIntensity: 0.8 })
      );
      lampHead.position.set(-1.0, 4.4, 0);
      poleGroup.add(lampHead);

      // Night Point Light
      const pLight = new THREE.PointLight(0xffecb3, 0, 16, 2.0);
      pLight.position.set(pos.x - 1.0, 4.3, pos.z);
      pLight.userData.baseIntensity = 1.4;
      this.lighting.registerNightLight(pLight);
      this.group.add(pLight);

      this.group.add(poleGroup);

      // Collect wire attachment point for main street poles (0 to 5)
      if (idx <= 5) {
        wirePoints.push(new THREE.Vector3(pos.x, 7.4, pos.z));
      }
    });

    // Hanging Catenary Overhead Wires (架空電線) along main avenue
    for (let i = 0; i < wirePoints.length - 1; i++) {
      const pA = wirePoints[i];
      const pB = wirePoints[i + 1];

      for (const sideOffset of [-0.9, 0.9]) {
        const pts: THREE.Vector3[] = [];
        const segments = 16;
        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const x = THREE.MathUtils.lerp(pA.x + sideOffset, pB.x + sideOffset, t);
          const z = THREE.MathUtils.lerp(pA.z, pB.z, t);
          // Catenary sag curve
          const sag = Math.sin(t * Math.PI) * 0.45;
          const y = THREE.MathUtils.lerp(pA.y, pB.y, t) - sag;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(lineGeo, wireMat);
        this.group.add(line);
      }
    }
  }

  private buildStreetFurniture(): void {
    // 1. Red Japanese Postbox (郵便ポスト)
    const postMat = CelShaders.createToonMaterial(0xd63031);
    const postbox = new THREE.Group();
    postbox.position.set(11.5, 0, 14.5);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.95, 0.55), postMat);
    body.position.y = 0.85;
    body.castShadow = true;
    postbox.add(body);

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 8), postMat);
    pillar.position.y = 0.25;
    postbox.add(pillar);

    // Letter slots
    const slotMat = CelShaders.createToonMaterial(0x2d3436);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.04), slotMat);
    slot.position.set(0, 1.15, 0.28);
    postbox.add(slot);

    this.group.add(postbox);

    // 2. Green NTT Public Telephone Booth (公衆電話)
    const boothMat = CelShaders.createToonMaterial(0x27ae60);
    const glassMat = CelShaders.createToonMaterial(0xa0e7e5, { transparent: true, opacity: 0.55 });
    const booth = new THREE.Group();
    booth.position.set(11.2, 0, 11);

    const boothFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 1.2), boothMat);
    boothFrame.position.y = 1.2;
    booth.add(boothFrame);

    const glassFront = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.8), glassMat);
    glassFront.position.set(0, 1.2, 0.61);
    booth.add(glassFront);

    this.group.add(booth);

    // 3. Convex Traffic Mirrors (カーブミラー) at intersections
    const mirrorMat = CelShaders.createToonMaterial(0xf1c40f); // Bright yellow post
    const mirrorGlass = CelShaders.createToonMaterial(0xdfe6e9);
    const orangeRim = CelShaders.createToonMaterial(0xe67e22);

    const mirrorPositions = [
      new THREE.Vector3(19.2, 0, 14.2),
      new THREE.Vector3(11.2, 0, -27.5),
      new THREE.Vector3(-42.5, 0, 16.5)
    ];

    mirrorPositions.forEach((pos) => {
      const mirror = new THREE.Group();
      mirror.position.copy(pos);

      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.2, 8), mirrorMat);
      post.position.y = 1.6;
      mirror.add(post);

      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 16), orangeRim);
      head.rotation.x = Math.PI / 2;
      head.position.set(0, 3.1, 0);
      mirror.add(head);

      const glass = new THREE.Mesh(new THREE.CircleGeometry(0.44, 16), mirrorGlass);
      glass.position.set(0, 3.1, 0.07);
      mirror.add(glass);

      this.group.add(mirror);
    });
  }

  private buildVendingMachines(): void {
    // Japanese Beverage Vending Machines (自動販売機)
    const machinePositions = [
      { x: 30.5, z: 14.5, rot: 0, col: 0x3498db },      // Blue machine outside Sakura Mart
      { x: 32.2, z: 14.5, rot: 0, col: 0xe74c3c },      // Red Coca-Cola/Boss machine
      { x: -14.0, z: 15.0, rot: -Math.PI / 2, col: 0x2ecc71 } // Green tea machine near station
    ];

    machinePositions.forEach((pos) => {
      const machine = new THREE.Group();
      machine.position.set(pos.x, 0, pos.z);
      machine.rotation.y = pos.rot;

      const bodyMat = CelShaders.createToonMaterial(pos.col);
      const displayMat = CelShaders.createToonMaterial(0xffffff, {
        map: TextureGenerator.createVendingDrinksDisplay(),
        emissive: 0xffffff,
        emissiveIntensity: 0.35
      });

      // Body cabinet
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.1, 0.85), bodyMat);
      body.position.y = 1.05;
      body.castShadow = true;
      machine.add(body);

      // Backlit display window
      const display = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.4), displayMat);
      display.position.set(0, 1.25, 0.43);
      machine.add(display);

      // Night light glow from vending machine
      const vLight = new THREE.PointLight(0xffffff, 0.6, 6, 2.0);
      vLight.position.set(0, 1.2, 0.7);
      vLight.userData.baseIntensity = 1.1;
      this.lighting.registerNightLight(vLight);
      machine.add(vLight);

      this.group.add(machine);
    });
  }
}
