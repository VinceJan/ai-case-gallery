// src/buildings/SakuraShrine.ts
// Historic hillside Shinto shrine: Torii gate, Chōzuya, Haiden, Suzu bell, Ema rack, and sacred ancient tree.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class SakuraShrine {
  public group: THREE.Group;
  private lighting: LightingSky;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.lighting = lighting;

    // Shrine Location on Northwest Hill (X: -40, Z: -65, Elevation: Y = 5.0)
    this.group.position.set(-40, 5.0, -65);

    // 1. Grand Vermilion Torii Gate (鳥居)
    this.buildToriiGate(0, 16);

    // 2. Chōzuya Water Purification Pavilion (手水舎)
    this.buildChozuya(-6, 8);

    // 3. Main Haiden Worship Hall with Suzu Bell & Saisen Box (拝殿・賽銭箱)
    this.buildHaidenHall(0, -2);

    // 4. Ema Wish Plaque Display Rack (絵馬掛け)
    this.buildEmaRack(6, 6);

    // 5. Sacred Ancient Sakura Tree (御神木)
    this.buildSacredTree(2, -10);

    // 6. Hilltop Scenic Overlook Deck
    this.buildScenicOverlook(-10, 5);
  }

  private buildToriiGate(x: number, z: number): void {
    const toriiGroup = new THREE.Group();
    toriiGroup.position.set(x, 0, z);

    const vermilionMat = CelShaders.createToonMaterial(0xc0392b);
    const blackMat = CelShaders.createToonMaterial(0x1e272e);

    // Twin Main Pillars (柱)
    for (const px of [-2.4, 2.4]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 5.2, 12), vermilionMat);
      pillar.position.set(px, 2.6, 0);
      pillar.castShadow = true;
      toriiGroup.add(pillar);

      // Black stone base (台石)
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.35, 12), blackMat);
      base.position.set(px, 0.175, 0);
      toriiGroup.add(base);
    }

    // Top Curved Lintel Beam (笠木・島木 - Kasagi)
    const topKasagi = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.38, 0.5), vermilionMat);
    topKasagi.position.set(0, 5.1, 0);
    topKasagi.castShadow = true;
    toriiGroup.add(topKasagi);

    // Black top cap
    const topCap = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.12, 0.55), blackMat);
    topCap.position.set(0, 5.35, 0);
    toriiGroup.add(topCap);

    // Lower Horizontal Tie Beam (貫 - Nuki)
    const nuki = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.28, 0.3), vermilionMat);
    nuki.position.set(0, 4.1, 0);
    toriiGroup.add(nuki);

    // Shrine Plaque (神額 - 桜神社)
    const plaqueMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createShrinePlaque()
    });
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2), plaqueMat);
    plaque.position.set(0, 4.6, 0.26);
    toriiGroup.add(plaque);

    this.group.add(toriiGroup);
  }

  private buildChozuya(x: number, z: number): void {
    const chozuGroup = new THREE.Group();
    chozuGroup.position.set(x, 0, z);

    const woodMat = CelShaders.createToonMaterial(0x6d4c41);
    const stoneMat = CelShaders.createToonMaterial(0x78909c);
    const roofMat = CelShaders.createToonMaterial(0x2d3436, {
      map: TextureGenerator.createKawaraRoofTexture()
    });

    // 4 Corner Wooden Pillars
    for (const px of [-1.1, 1.1]) {
      for (const pz of [-0.9, 0.9]) {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.6, 8), woodMat);
        p.position.set(px, 1.3, pz);
        chozuGroup.add(p);
      }
    }

    // Tiled Gable Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 0.9, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 3.0, 0);
    chozuGroup.add(roof);

    // Stone Water Basin (水盤)
    const basin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.75, 1.0), stoneMat);
    basin.position.set(0, 0.375, 0);
    basin.castShadow = true;
    chozuGroup.add(basin);

    // Pure Spring Water in basin
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.8),
      CelShaders.createToonMaterial(0x68d8d6, { transparent: true, opacity: 0.8 })
    );
    water.rotateX(-Math.PI / 2);
    water.position.set(0, 0.72, 0);
    chozuGroup.add(water);

    // Bamboo Ladles (柄杓)
    const ladleMat = CelShaders.createToonMaterial(0xdcd39e);
    const ladle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 6), ladleMat);
    ladle.rotation.z = Math.PI / 2;
    ladle.position.set(0, 0.78, 0.2);
    chozuGroup.add(ladle);

    this.group.add(chozuGroup);
  }

  private buildHaidenHall(x: number, z: number): void {
    const hallGroup = new THREE.Group();
    hallGroup.position.set(x, 0, z);

    const vermilionMat = CelShaders.createToonMaterial(0xc0392b);
    const woodDeckMat = CelShaders.createToonMaterial(0x8d6e63);
    const roofMat = CelShaders.createToonMaterial(0x2f3542, {
      map: TextureGenerator.createKawaraRoofTexture()
    });

    // Haiden Base Deck (8m wide x 6m deep x 0.6m high)
    const baseDeck = new THREE.Mesh(new THREE.BoxGeometry(8, 0.6, 6), woodDeckMat);
    baseDeck.position.set(0, 0.3, 0);
    baseDeck.receiveShadow = true;
    hallGroup.add(baseDeck);

    // Haiden Shrine Main Hall Building
    const hall = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.8, 4.8), vermilionMat);
    hall.position.set(0, 2.5, -0.4);
    hall.castShadow = true;
    hallGroup.add(hall);

    // Sweeping Irimoya Tiled Roof (入母屋造)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(6.2, 2.2, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 5.2, -0.4);
    roof.castShadow = true;
    hallGroup.add(roof);

    // Front Slatted Wooden Saisen Donation Box (賽銭箱)
    const saisenMat = CelShaders.createToonMaterial(0x5d4037);
    const saisen = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 0.9), saisenMat);
    saisen.position.set(0, 0.8, 2.2);
    saisen.castShadow = true;
    hallGroup.add(saisen);

    // Golden Kanji "奉納" on Saisen Box
    const goldMat = CelShaders.createToonMaterial(0xf1c40f);
    const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 12), goldMat);
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, 0.8, 2.66);
    hallGroup.add(emblem);

    // Brass Suzu Bell with Braided Red/White Rope (本坪鈴・鈴緒)
    const bellMat = CelShaders.createToonMaterial(0xf39c12);
    const suzuBell = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), bellMat);
    suzuBell.position.set(0, 3.4, 2.2);
    hallGroup.add(suzuBell);

    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8),
      CelShaders.createToonMaterial(0xe74c3c)
    );
    rope.position.set(0, 2.3, 2.2);
    hallGroup.add(rope);

    // Braided Shimenawa Sacred Straw Rope with Zigzag Paper Shide (注連縄)
    const shimenawaMat = CelShaders.createToonMaterial(0xdcd39e);
    const shimenawa = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 4.2, 10), shimenawaMat);
    shimenawa.rotation.z = Math.PI / 2;
    shimenawa.position.set(0, 3.8, 2.0);
    hallGroup.add(shimenawa);

    // White Paper Shide pendants (紙垂)
    const shideMat = CelShaders.createToonMaterial(0xffffff);
    for (let sx = -1.2; sx <= 1.2; sx += 0.8) {
      const shide = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.45, 0.02), shideMat);
      shide.position.set(sx, 3.45, 2.02);
      hallGroup.add(shide);
    }

    this.group.add(hallGroup);

    physics.addBox(-40, -65 - 0.4, 6.8, 4.8, 'shrine_hall');
    physics.addBox(-40, -65 + 2.2, 1.8, 0.9, 'shrine_saisen');
  }

  private buildEmaRack(x: number, z: number): void {
    const emaGroup = new THREE.Group();
    emaGroup.position.set(x, 0, z);

    const woodMat = CelShaders.createToonMaterial(0x6d4c41);

    // Wood post frame
    const postL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.4, 0.12), woodMat);
    postL.position.set(-1.8, 1.2, 0);
    emaGroup.add(postL);

    const postR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.4, 0.12), woodMat);
    postR.position.set(1.8, 1.2, 0);
    emaGroup.add(postR);

    const beamTop = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.12, 0.12), woodMat);
    beamTop.position.set(0, 2.3, 0);
    emaGroup.add(beamTop);

    const beamMid = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 0.08), woodMat);
    beamMid.position.set(0, 1.4, 0);
    emaGroup.add(beamMid);

    // Hanging Ema Wooden Tablets with Town Wishes
    const wishes = [
      '南中サッカー部 都大会出場！ (Ren)',
      '美大合格＆素敵な絵が描けますように (Aoi)',
      '今日も列車が無事に走りますように (高橋)',
      'ミカンの鈴が見つかりますように (佐藤)'
    ];

    wishes.forEach((wish, idx) => {
      const emaMat = CelShaders.createToonMaterial(0xffffff, {
        map: TextureGenerator.createEmaTabletTexture(wish)
      });
      const tablet = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.45), emaMat);
      tablet.position.set(-1.2 + idx * 0.8, idx < 2 ? 1.85 : 1.0, 0.06);
      emaGroup.add(tablet);
    });

    this.group.add(emaGroup);
  }

  private buildSacredTree(x: number, z: number): void {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0, z);

    const trunkMat = CelShaders.createToonMaterial(0x3e2723);
    const blossomMat = CelShaders.createToonMaterial(0xffb7c5);

    // 300-year-old thick massive ancient gnarled trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.35, 5.5, 12), trunkMat);
    trunk.position.y = 2.75;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Sacred Shimenawa Straw Rope wrapped around ancient trunk
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 1.02, 0.35, 12),
      CelShaders.createToonMaterial(0xdcd39e)
    );
    rope.position.y = 2.5;
    treeGroup.add(rope);

    // Massive Flowering Canopy (Large pink blossoms)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const canopy = new THREE.Mesh(
        new THREE.DodecahedronGeometry(2.4, 2),
        blossomMat
      );
      canopy.position.set(Math.cos(angle) * 2.2, 5.5 + (i % 2) * 0.8, Math.sin(angle) * 2.2);
      canopy.castShadow = true;
      treeGroup.add(canopy);
    }

    const centerCanopy = new THREE.Mesh(new THREE.DodecahedronGeometry(2.8, 2), blossomMat);
    centerCanopy.position.set(0, 7.2, 0);
    centerCanopy.castShadow = true;
    treeGroup.add(centerCanopy);

    this.group.add(treeGroup);

    physics.addBox(-40 + x, -65 + z, 2.4, 2.4, 'sacred_tree');
  }

  private buildScenicOverlook(x: number, z: number): void {
    const deckMat = CelShaders.createToonMaterial(0x8d6e63);
    const railMat = CelShaders.createToonMaterial(0xc0392b);

    // Scenic wooden observation balcony overlooking the town below
    const deck = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.25, 4.5), deckMat);
    deck.position.set(x, 0.125, z);
    deck.receiveShadow = true;
    this.group.add(deck);

    // Railing
    const rail = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.9, 0.1), railMat);
    rail.position.set(x, 0.55, z + 2.2);
    this.group.add(rail);
  }
}
