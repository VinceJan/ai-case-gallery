// src/buildings/SakuraShrine.ts
// Hilltop Shinto Shrine: Torii gate, stone lanterns, Temizuya, Haiden hall,
// Saisenbako offering box, Ema prayer rack, Omikuji fortune box, and scenic overlook.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { audio } from '../engine/AudioSynthesizer';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export interface OmikujiFortune {
  rank: string;
  jpRank: string;
  blessing: string;
  luckyItem: string;
}

export class SakuraShrine {
  public group: THREE.Group;
  public shrinePos: THREE.Vector3 = new THREE.Vector3(-38, 5.0, -68);

  // Interaction locations
  public saisenbakoPos: THREE.Vector3;
  public omikujiPos: THREE.Vector3;
  public emaBoardPos: THREE.Vector3;
  public waterBasinPos: THREE.Vector3;
  public overlookBenchPos: THREE.Vector3;

  private fortunes: OmikujiFortune[] = [
    { rank: 'Great Blessing', jpRank: '大吉 (Daikichi)', blessing: 'The cherry blossoms bloom in full glory! All endeavors shall bear sweet fruit.', luckyItem: 'Sakura Mochi' },
    { rank: 'Middle Blessing', jpRank: '中吉 (Chukichi)', blessing: 'A pleasant breeze carries good news along the railway tracks.', luckyItem: 'Green Tea' },
    { rank: 'Small Blessing', jpRank: '小吉 (Shokichi)', blessing: 'A modest encounter today will blossom into a lasting friendship.', luckyItem: 'Brass Bell' },
    { rank: 'Future Blessing', jpRank: '末吉 (Suekichi)', blessing: 'Patience at the train crossing brings clear pathways ahead.', luckyItem: 'Bicycle' }
  ];

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    this.group.position.copy(this.shrinePos);
    scene.add(this.group);

    this.saisenbakoPos = new THREE.Vector3(this.shrinePos.x, 5.8, this.shrinePos.z - 3.5);
    this.omikujiPos = new THREE.Vector3(this.shrinePos.x + 5.5, 5.6, this.shrinePos.z + 1.0);
    this.emaBoardPos = new THREE.Vector3(this.shrinePos.x - 5.5, 5.6, this.shrinePos.z + 1.0);
    this.waterBasinPos = new THREE.Vector3(this.shrinePos.x + 4.5, 5.4, this.shrinePos.z + 7.0);
    this.overlookBenchPos = new THREE.Vector3(this.shrinePos.x - 8.0, 5.4, this.shrinePos.z + 8.0);

    // 1. Grand Vermilion Torii Gate (大鳥居)
    this.createToriiGate();

    // 2. Stone Lanterns (石燈籠)
    this.createStoneLanterns(lighting);

    // 3. Temizuya Purification Water Pavilion (手水舎)
    this.createTemizuya();

    // 4. Main Shrine Hall (Haiden / 拝殿) & Offering Box (賽銭箱)
    this.createHaidenHall(lighting);

    // 5. Ema Prayer Board & Omikuji Fortune Drawer
    this.createEmaAndOmikuji();

    // 6. Panoramic Scenic Overlook Bench
    this.createScenicOverlook();
  }

  private createToriiGate(): void {
    // Large Torii at entrance of hilltop sando (Z = 12.0 in local coords, X = 0)
    const toriiMat = CelShaders.createToonMaterial(0xc0392b); // Shinto vermilion red
    const blackMat = CelShaders.createToonMaterial(0x1e272c); // Black stone bases

    const toriiGroup = new THREE.Group();
    toriiGroup.position.set(0, 0, 11.5);

    // Two main upright pillars (Hashira)
    const pillarH = 5.2;
    for (const px of [-2.4, 2.4]) {
      // Black base stone
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.35, 0.5, 12), blackMat);
      base.position.set(px, 0.25, 0);
      toriiGroup.add(base);

      // Vermilion wooden pillar
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, pillarH, 12), toriiMat);
      col.position.set(px, pillarH / 2 + 0.25, 0);
      col.castShadow = true;
      toriiGroup.add(col);
    }

    // Upper curved lintel (Kasagi & Shimaki)
    const topLintel = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.38, 0.45), toriiMat);
    topLintel.position.set(0, pillarH + 0.45, 0);
    toriiGroup.add(topLintel);

    // Lower horizontal crossbar (Nuki)
    const nuki = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.28, 0.28), toriiMat);
    nuki.position.set(0, pillarH - 0.55, 0);
    toriiGroup.add(nuki);

    // Center vertical tablet (Gakuzuka) reading "さくら神社"
    const gakuzuka = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.7, 0.12), blackMat);
    gakuzuka.position.set(0, pillarH - 0.1, 0);
    toriiGroup.add(gakuzuka);

    this.group.add(toriiGroup);
  }

  private createStoneLanterns(lighting: LightingSky): void {
    const stoneMat = CelShaders.createToonMaterial(0x95a5a6);
    const fireMat = new THREE.MeshBasicMaterial({ color: 0xffd54f });

    const lanternCoords = [
      { x: -2.8, z: 9.0 },
      { x: 2.8, z: 9.0 },
      { x: -3.2, z: 4.5 },
      { x: 3.2, z: 4.5 },
      { x: -3.5, z: 0.0 },
      { x: 3.5, z: 0.0 }
    ];

    lanternCoords.forEach((c) => {
      const lantern = new THREE.Group();
      lantern.position.set(c.x, 0, c.z);

      // Octagonal pedestal
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.4, 8), stoneMat);
      ped.position.y = 0.2;
      lantern.add(ped);

      // Shaft (Sao)
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.9, 8), stoneMat);
      shaft.position.y = 0.85;
      lantern.add(shaft);

      // Firebox (Hibukuro) with glowing window
      const firebox = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 0.45), stoneMat);
      firebox.position.y = 1.45;
      lantern.add(firebox);

      const fireWindow = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.46), fireMat);
      fireWindow.position.y = 1.45;
      lantern.add(fireWindow);

      // Roof (Kasa) with flared corners
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.28, 6), stoneMat);
      roof.position.y = 1.75;
      lantern.add(roof);

      // Night light
      const pLight = new THREE.PointLight(0xffb74d, 0.0, 4);
      pLight.position.set(0, 1.45, 0);
      lantern.add(pLight);
      lighting.registerNightLight(pLight);

      this.group.add(lantern);
      physics.addCollider(
        new THREE.Vector3(this.shrinePos.x + c.x - 0.4, 5.0, this.shrinePos.z + c.z - 0.4),
        new THREE.Vector3(this.shrinePos.x + c.x + 0.4, 7.0, this.shrinePos.z + c.z + 0.4)
      );
    });
  }

  private createTemizuya(): void {
    // Water purification pavilion (X = 4.5, Z = 7.0)
    const temGroup = new THREE.Group();
    temGroup.position.set(4.5, 0, 7.0);

    const woodMat = CelShaders.createToonMaterial(0x5c4033);
    const stoneMat = CelShaders.createToonMaterial(0x7f8c8d);
    const waterMat = CelShaders.createToonMaterial(0x48dbfb);

    // 4 Wooden columns
    for (const px of [-1.0, 1.0]) {
      for (const pz of [-0.8, 0.8]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 6), woodMat);
        post.position.set(px, 1.1, pz);
        temGroup.add(post);
      }
    }

    // Tiled Pavilion Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.2), woodMat);
    roof.position.y = 2.3;
    temGroup.add(roof);

    // Stone water basin (Chōzubachi)
    const basin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.8), stoneMat);
    basin.position.y = 0.35;
    temGroup.add(basin);

    // Clear water plane inside basin
    const water = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.6), waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.68;
    temGroup.add(water);

    // Bamboo spout
    const bambooMat = CelShaders.createToonMaterial(0x6ab04c);
    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6), bambooMat);
    spout.rotation.x = Math.PI / 3;
    spout.position.set(0, 0.85, -0.4);
    temGroup.add(spout);

    this.group.add(temGroup);
  }

  private createHaidenHall(lighting: LightingSky): void {
    // Main Shrine Hall (X: 0, Z: -5.0)
    const hallMat = CelShaders.createToonMaterial(0x4e342e); // Aged cypress wood
    const roofCopper = CelShaders.createToonMaterial(0x27ae60); // Oxidized green copper roof
    const shojiMat = CelShaders.createToonMaterial(0xfff8e7);

    const hall = new THREE.Group();
    hall.position.set(0, 0, -5.0);

    // Raised wooden veranda foundation (Engawa)
    const foundation = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.8, 8.5), hallMat);
    foundation.position.y = 0.4;
    foundation.receiveShadow = true;
    hall.add(foundation);

    // Main hall walls
    const walls = new THREE.Mesh(new THREE.BoxGeometry(8.5, 3.8, 6.5), hallMat);
    walls.position.y = 0.8 + 1.9;
    walls.castShadow = true;
    hall.add(walls);

    // Traditional Irimoya Copper Roof with sweeping eaves
    const roof = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.8, 9.8), roofCopper);
    roof.position.y = 4.8;
    hall.add(roof);

    // Top ridge (Munagi) with sacred ornamental beams (Chigi & Katsuogi)
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 11.0, 8), roofCopper);
    ridge.rotation.z = Math.PI / 2;
    ridge.position.y = 5.4;
    hall.add(ridge);

    // Wooden stairs up to veranda
    for (let st = 0; st < 3; st++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.25, 0.4), hallMat);
      step.position.set(0, 0.125 + st * 0.25, 4.45 - st * 0.35);
      hall.add(step);
    }

    // Suzu Chime Bell & Red/White Braided Rope (鈴の緒)
    const bellMat = CelShaders.createToonMaterial(0xd4af37);
    const ropeMat = CelShaders.createToonMaterial(0xd63031);

    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), bellMat);
    bell.position.set(0, 3.4, 3.4);
    hall.add(bell);

    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.0, 8), ropeMat);
    rope.position.set(0, 2.3, 3.4);
    hall.add(rope);

    // Saisenbako Offering Box (賽銭箱)
    const boxMat = CelShaders.createToonMaterial(0x3e2723);
    const saisenbako = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.75, 0.8), boxMat);
    saisenbako.position.set(0, 0.8 + 0.375, 3.2);
    hall.add(saisenbako);

    // Gold coin slot bars
    for (const sx of [-0.4, -0.2, 0, 0.2, 0.4]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 0.7), bellMat);
      bar.position.set(sx, 0.8 + 0.76, 3.2);
      hall.add(bar);
    }

    this.group.add(hall);

    // Hall physics collider
    physics.addCollider(
      new THREE.Vector3(this.shrinePos.x - 5.5, 5.0, this.shrinePos.z - 9.5),
      new THREE.Vector3(this.shrinePos.x + 5.5, 10.0, this.shrinePos.z - 1.0)
    );
  }

  private createEmaAndOmikuji(): void {
    // 1. Ema Prayer Board Rack (X = -5.5, Z = 1.0)
    const rackMat = CelShaders.createToonMaterial(0x5c4033);
    const emaRack = new THREE.Group();
    emaRack.position.set(-5.5, 0, 1.0);

    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 0.15), rackMat);
    frame.position.y = 1.3;
    emaRack.add(frame);

    // Hanging wooden Ema plaques
    const emaMat = new THREE.MeshBasicMaterial({ map: TextureGenerator.createEmaPlaqueTexture() });
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const ema = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.32), emaMat);
        ema.position.set(-0.8 + col * 0.8, 1.0 + row * 0.6, 0.1);
        emaRack.add(ema);
      }
    }
    this.group.add(emaRack);

    // 2. Omikuji Fortune Box (X = 5.5, Z = 1.0)
    const omikujiGroup = new THREE.Group();
    omikujiGroup.position.set(5.5, 0, 1.0);

    const tableMat = CelShaders.createToonMaterial(0x8d6e63);
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.9), tableMat);
    table.position.y = 0.45;
    omikujiGroup.add(table);

    // Hexagonal fortune drawer cylinder
    const boxGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.45, 6);
    const boxMesh = new THREE.Mesh(boxGeo, CelShaders.createToonMaterial(0xd35400));
    boxMesh.position.set(0, 1.15, 0);
    omikujiGroup.add(boxMesh);

    this.group.add(omikujiGroup);
  }

  private createScenicOverlook(): void {
    // Overlook Terrace at south-west corner (-8.0, 0, 8.0) facing the whole town!
    const benchMat = CelShaders.createToonMaterial(0x5c4033);
    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.6), benchMat);
    bench.position.set(-8.0, 0.225, 8.0);
    this.group.add(bench);

    // Stone terrace balustrade
    const balMat = CelShaders.createToonMaterial(0x95a5a6);
    const balustrade = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.9, 0.3), balMat);
    balustrade.position.set(-8.0, 0.45, 9.5);
    this.group.add(balustrade);
  }

  /** Interacting with Saisenbako offering box */
  public pray(): { success: boolean; message: string } {
    audio.playShrinePrayer();
    return {
      success: true,
      message: 'You offered 5 Yen and clapped twice. The gentle spring breeze bestows inner peace and restored stamina!'
    };
  }

  /** Interacting with Omikuji box */
  public drawOmikuji(): OmikujiFortune {
    audio.playChimeNote(1200, 0.25, 0.15);
    const fortune = this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
    return fortune;
  }
}
