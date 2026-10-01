// src/buildings/SakuraStation.ts
// Complete Japanese railway station: platform, waiting hall, ticket gates, signs.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { physics } from '../engine/Physics';

export class SakuraStation {
  public group: THREE.Group;
  public stationPosition: THREE.Vector3 = new THREE.Vector3(-10, 0, 25);

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    this.group.position.copy(this.stationPosition);
    scene.add(this.group);

    // 1. Station Platform
    this.createPlatform();

    // 2. Platform Canopy Roof & Steel Columns
    this.createCanopy();

    // 3. Station Signs & Timetables
    this.createStationSigns();

    // 4. Ticket Gates & Waiting Building
    this.createStationBuilding();
  }

  private createPlatform(): void {
    const platformMat = CelShaders.createToonMaterial(0x95a5a6);
    // Platform: Length 36m (X: -18 to +18), Width 5.5m (Z: -2.75 to +2.75), Height: 0.75m
    const platformGeo = new THREE.BoxGeometry(36, 0.75, 5.5);
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, 0.75 / 2, 0);
    platform.receiveShadow = true;
    this.group.add(platform);

    // Braille yellow tactile safety warning strip along track edge (Z = 2.4)
    const tactileMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createTactilePavingTexture()
    });
    const tactileGeo = new THREE.PlaneGeometry(35, 0.45);
    tactileGeo.rotateX(-Math.PI / 2);
    const tactileLine = new THREE.Mesh(tactileGeo, tactileMat);
    tactileLine.position.set(0, 0.755, 2.3);
    this.group.add(tactileLine);

    // Platform wooden benches
    const benchMat = CelShaders.createToonMaterial(0x8d6e63);
    for (const bx of [-10, 0, 10]) {
      const bench = new THREE.Group();
      bench.position.set(bx, 0.75, -1.0);

      // Seat
      const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.5), benchMat);
      seat.position.y = 0.45;
      bench.add(seat);

      // Backrest
      const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 0.06), benchMat);
      back.position.set(0, 0.75, -0.22);
      bench.add(back);

      // Legs
      const legMat = CelShaders.createToonMaterial(0x34495e);
      for (const lx of [-0.9, 0.9]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.4), legMat);
        leg.position.set(lx, 0.225, 0);
        bench.add(leg);
      }
      this.group.add(bench);
    }

    // Access Ramp from Station Plaza to Platform on West end (X: -18 to -23)
    const rampGeo = new THREE.BoxGeometry(5.0, 0.75, 4.0);
    rampGeo.rotateZ(Math.atan2(0.75, 5.0)); // Inclined ramp
    const rampMat = CelShaders.createToonMaterial(0x7f8c8d);
    const ramp = new THREE.Mesh(rampGeo, rampMat);
    ramp.position.set(-20.5, 0.35, -0.5);
    this.group.add(ramp);

    // Platform physics collider
    physics.addCollider(
      new THREE.Vector3(this.stationPosition.x - 18, 0, this.stationPosition.z - 2.8),
      new THREE.Vector3(this.stationPosition.x + 18, 0.8, this.stationPosition.z + 2.8)
    );
  }

  private createCanopy(): void {
    const steelMat = CelShaders.createToonMaterial(0x2c3e50); // Navy blue steel
    const roofMat = CelShaders.createToonMaterial(0xbdc3c7);  // Corrugated roof sheet

    // V-shaped Japanese platform canopy roof
    const roofGeo = new THREE.BoxGeometry(32, 0.15, 4.5);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 3.8, 0);
    this.group.add(roof);

    // Steel support columns every 6 meters
    for (let x = -12; x <= 12; x += 6) {
      const colGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.0, 8);
      const col = new THREE.Mesh(colGeo, steelMat);
      col.position.set(x, 0.75 + 1.5, -0.2);
      this.group.add(col);

      // Y-bracket top trusses
      const trussGeo = new THREE.BoxGeometry(2.4, 0.08, 0.08);
      const truss = new THREE.Mesh(trussGeo, steelMat);
      truss.position.set(x, 3.65, 0);
      this.group.add(truss);
    }
  }

  private createStationSigns(): void {
    // Hanging Station Signboard ("さくら町 / Sakura Town")
    const signTex = TextureGenerator.createStationSign();
    const signMat = new THREE.MeshBasicMaterial({ map: signTex });

    for (const sx of [-6, 6]) {
      const signGroup = new THREE.Group();
      signGroup.position.set(sx, 3.1, 0);

      // Double-sided signboard
      const signGeo = new THREE.BoxGeometry(2.4, 0.8, 0.08);
      const signMesh = new THREE.Mesh(signGeo, signMat);
      signGroup.add(signMesh);

      // Hanging chains
      const chainMat = CelShaders.createToonMaterial(0x34495e);
      for (const cx of [-0.9, 0.9]) {
        const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 6), chainMat);
        chain.position.set(cx, 0.65, 0);
        signGroup.add(chain);
      }
      this.group.add(signGroup);
    }

    // Platform Clock
    const clockGroup = new THREE.Group();
    clockGroup.position.set(0, 3.2, 1.2);
    const clockBody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.12, 16), CelShaders.createToonMaterial(0x34495e));
    clockBody.rotation.x = Math.PI / 2;
    clockGroup.add(clockBody);

    const clockFaceCanvas = document.createElement('canvas');
    clockFaceCanvas.width = 128;
    clockFaceCanvas.height = 128;
    const cctx = clockFaceCanvas.getContext('2d')!;
    cctx.fillStyle = '#ffffff';
    cctx.fillRect(0, 0, 128, 128);
    cctx.strokeStyle = '#111';
    cctx.lineWidth = 4;
    cctx.beginPath();
    cctx.arc(64, 64, 58, 0, Math.PI * 2);
    cctx.stroke();
    // Clock hands
    cctx.beginPath();
    cctx.moveTo(64, 64);
    cctx.lineTo(64, 25); // 12 o'clock
    cctx.moveTo(64, 64);
    cctx.lineTo(85, 64); // 3 o'clock
    cctx.stroke();

    const clockFaceTex = new THREE.CanvasTexture(clockFaceCanvas);
    const clockFace = new THREE.Mesh(new THREE.CircleGeometry(0.28, 16), new THREE.MeshBasicMaterial({ map: clockFaceTex }));
    clockFace.position.z = 0.07;
    clockGroup.add(clockFace);
    this.group.add(clockGroup);
  }

  private createStationBuilding(): void {
    // Station Entrance & Ticket Gate Pavilion on south side (Z: -3.0 to -8.0, X: -8 to 2)
    const buildingMat = CelShaders.createToonMaterial(0xecf0f1); // Clean white Showa/Heisei plaster
    const roofMat = CelShaders.createToonMaterial(0x34495e);

    const hallGeo = new THREE.BoxGeometry(10, 4.0, 5.0);
    const hall = new THREE.Mesh(hallGeo, buildingMat);
    hall.position.set(-3, 2.0, -5.2);
    hall.castShadow = true;
    this.group.add(hall);

    // Overhanging canopy
    const hallRoof = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.4, 5.8), roofMat);
    hallRoof.position.set(-3, 4.1, -5.2);
    this.group.add(hallRoof);

    // Station Name Sign above entrance
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d')!;
    sctx.fillStyle = '#1e3799';
    sctx.fillRect(0, 0, 512, 128);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 54px "Hiragino Sans", "Meiryo", sans-serif';
    sctx.textAlign = 'center';
    sctx.textBaseline = 'middle';
    sctx.fillText('さくら町駅', 256, 64);
    const signTex = new THREE.CanvasTexture(signCanvas);
    const entranceSign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshBasicMaterial({ map: signTex }));
    entranceSign.position.set(-3, 3.4, -2.65);
    this.group.add(entranceSign);

    // Automatic Ticket Turnstiles (改札機)
    const gateMat = CelShaders.createToonMaterial(0x7f8c8d);
    const icReaderMat = new THREE.MeshBasicMaterial({ color: 0x00d2d3 }); // Blue glowing Suica/Pasmo IC touch pad

    for (let gx = -5; gx <= -1; gx += 1.8) {
      const gate = new THREE.Group();
      gate.position.set(gx, 0, -2.6);

      // Gate housing
      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.95, 1.4), gateMat);
      housing.position.y = 0.95 / 2;
      gate.add(housing);

      // IC touch pad
      const icPad = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.22), icReaderMat);
      icPad.position.set(0, 0.96, -0.2);
      gate.add(icPad);

      // Flap barrier
      const flapMat = CelShaders.createToonMaterial(0x3498db);
      const flap = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.04), flapMat);
      flap.position.set(0.45, 0.5, 0);
      gate.add(flap);

      this.group.add(gate);
    }

    // Physics wall for station building
    physics.addCollider(
      new THREE.Vector3(this.stationPosition.x - 8.2, 0, this.stationPosition.z - 7.8),
      new THREE.Vector3(this.stationPosition.x + 2.2, 4.0, this.stationPosition.z - 2.8)
    );
  }
}
