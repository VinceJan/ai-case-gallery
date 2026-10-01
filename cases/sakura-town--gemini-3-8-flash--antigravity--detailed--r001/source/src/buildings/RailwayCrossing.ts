// src/buildings/RailwayCrossing.ts
// Authentic Japanese Fumikiri Railway Crossing with animated barrier arms and blinking lights.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { audio } from '../engine/AudioSynthesizer';
import { BoxCollider, physics } from '../engine/Physics';

export class RailwayCrossing {
  public group: THREE.Group;
  public crossingPosition: THREE.Vector3 = new THREE.Vector3(25, 0, 25);

  // Animated barrier arms
  private armLeftPivot: THREE.Group;
  private armRightPivot: THREE.Group;

  // Warning lamps
  private redLamps: THREE.Mesh[] = [];

  // State
  public isClosed: boolean = false;
  private barrierAngle: number = Math.PI / 2.2; // 0 = closed, ~80 deg = open
  private blinkTimer: number = 0;
  private bellTimer: number = 0;
  private currentToneHigh: boolean = false;

  // Dynamic collision barriers
  private leftCollider: BoxCollider | null = null;
  private rightCollider: BoxCollider | null = null;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    this.group.position.copy(this.crossingPosition);
    scene.add(this.group);

    // 1. Build West Mast & Barrier (Road West side, X = -4.5, Z = -2.5)
    const { mast: mastW, armPivot: armW, lamps: lampsW } = this.buildCrossingMast(-4.5, -2.6, 0);
    this.armLeftPivot = armW;
    this.group.add(mastW);
    this.redLamps.push(...lampsW);

    // 2. Build East Mast & Barrier (Road East side, X = 4.5, Z = 2.6)
    const { mast: mastE, armPivot: armE, lamps: lampsE } = this.buildCrossingMast(4.5, 2.6, Math.PI);
    this.armRightPivot = armE;
    this.group.add(mastE);
    this.redLamps.push(...lampsE);

    // 3. Wooden rail sleepers & steel tracks through crossing road
    this.createCrossingTrackPavement();
  }

  private buildCrossingMast(x: number, z: number, rotationY: number): {
    mast: THREE.Group;
    armPivot: THREE.Group;
    lamps: THREE.Mesh[];
  } {
    const mast = new THREE.Group();
    mast.position.set(x, 0, z);
    mast.rotation.y = rotationY;

    const yellowMat = CelShaders.createToonMaterial(0xffd600);
    const blackMat = CelShaders.createToonMaterial(0x111111);
    const metalMat = CelShaders.createToonMaterial(0x576574);

    // Main steel pole with yellow/black bands
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.14, 4.5, 8);
    const pole = new THREE.Mesh(poleGeo, metalMat);
    pole.position.y = 2.25;
    mast.add(pole);

    // Yellow & Black striped warning rings on pole
    for (const py of [1.0, 2.0, 3.0]) {
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.45, 8), yellowMat);
      ring.position.y = py;
      mast.add(ring);
    }

    // Top X-shaped Railway Crossing Crossbuck Sign
    const crossGroup = new THREE.Group();
    crossGroup.position.set(0, 4.0, 0);

    const barGeo = new THREE.BoxGeometry(1.6, 0.18, 0.04);
    const bar1 = new THREE.Mesh(barGeo, yellowMat);
    bar1.rotation.z = Math.PI / 4;
    crossGroup.add(bar1);

    const bar2 = new THREE.Mesh(barGeo, yellowMat);
    bar2.rotation.z = -Math.PI / 4;
    crossGroup.add(bar2);

    // Diagonal black stripes on crossbuck
    for (const b of [bar1, bar2]) {
      for (const off of [-0.5, 0, 0.5]) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.19, 0.05), blackMat);
        stripe.position.set(off, 0, 0);
        b.add(stripe);
      }
    }
    mast.add(crossGroup);

    // Warning light box with twin red lamps
    const lightBar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.1), metalMat);
    lightBar.position.set(0, 3.3, 0);
    mast.add(lightBar);

    const lamps: THREE.Mesh[] = [];
    for (const lx of [-0.4, 0.4]) {
      // Black hood
      const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.15, 12), blackMat);
      hood.rotation.x = Math.PI / 2;
      hood.position.set(lx, 3.3, 0.08);
      mast.add(hood);

      // Red lens
      const lensMat = new THREE.MeshBasicMaterial({ color: 0x330000 }); // Unlit dark red
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.14, 12), lensMat);
      lens.position.set(lx, 3.3, 0.16);
      mast.add(lens);
      lamps.push(lens);
    }

    // Barrier Motor Box
    const motorBox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.5), metalMat);
    motorBox.position.set(0, 0.85, 0);
    mast.add(motorBox);

    // Pivot for barrier arm
    const armPivot = new THREE.Group();
    armPivot.position.set(0, 0.95, 0.3);
    armPivot.rotation.z = Math.PI / 2.2; // Initially open / up

    // Striped barrier pole (Length: 5.5m)
    const armTex = TextureGenerator.createBarrierStripesTexture();
    const armMat = new THREE.MeshBasicMaterial({ map: armTex });
    const armMesh = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.12, 0.08), armMat);
    armMesh.position.set(2.6, 0, 0);
    armPivot.add(armMesh);

    // Hanging curtain skirts (tassels / hanging grid)
    const skirtMat = CelShaders.createToonMaterial(0xffffff, {
      map: TextureGenerator.createBarrierStripesTexture()
    });
    for (let sk = 0.8; sk <= 4.8; sk += 0.8) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 4), metalMat);
      rod.position.set(sk, -0.25, 0);
      armPivot.add(rod);
    }

    mast.add(armPivot);

    return { mast, armPivot, lamps };
  }

  private createCrossingTrackPavement(): void {
    // Wooden flangeway planks between rails for cars and pedestrians to smoothly walk over
    const plankMat = CelShaders.createToonMaterial(0x5c4033);
    const plankGeo = new THREE.BoxGeometry(9.0, 0.06, 1.4);
    const plank = new THREE.Mesh(plankGeo, plankMat);
    plank.position.set(0, 0.04, 0);
    this.group.add(plank);

    // Steel rail bars across road
    const railMat = CelShaders.createToonMaterial(0xdcdde1);
    for (const rz of [-0.65, 0.65]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.1, 0.08), railMat);
      rail.position.set(0, 0.08, rz);
      this.group.add(rail);
    }
  }

  public setClosed(closed: boolean): void {
    if (this.isClosed === closed) return;
    this.isClosed = closed;

    if (this.isClosed) {
      // Add collision barriers across road
      this.leftCollider = physics.addCollider(
        new THREE.Vector3(this.crossingPosition.x - 4.5, 0, this.crossingPosition.z - 2.8),
        new THREE.Vector3(this.crossingPosition.x + 4.5, 2.0, this.crossingPosition.z - 2.2)
      );
      this.rightCollider = physics.addCollider(
        new THREE.Vector3(this.crossingPosition.x - 4.5, 0, this.crossingPosition.z + 2.2),
        new THREE.Vector3(this.crossingPosition.x + 4.5, 2.0, this.crossingPosition.z + 2.8)
      );
    } else {
      if (this.leftCollider) physics.removeCollider(this.leftCollider);
      if (this.rightCollider) physics.removeCollider(this.rightCollider);
      this.leftCollider = null;
      this.rightCollider = null;

      // Turn off lamps
      this.redLamps.forEach((l) => {
        (l.material as THREE.MeshBasicMaterial).color.setHex(0x330000);
      });
    }
  }

  public update(delta: number, playerPos: THREE.Vector3): void {
    // 1. Animate barrier arm rotation
    const targetAngle = this.isClosed ? 0.0 : Math.PI / 2.2;
    const speed = 1.4; // Arm lowers/raises smoothly in ~1.2s
    if (this.barrierAngle < targetAngle) {
      this.barrierAngle = Math.min(targetAngle, this.barrierAngle + delta * speed);
    } else if (this.barrierAngle > targetAngle) {
      this.barrierAngle = Math.max(targetAngle, this.barrierAngle - delta * speed);
    }

    this.armLeftPivot.rotation.z = this.barrierAngle;
    this.armRightPivot.rotation.z = this.barrierAngle;

    // 2. Warning bell and alternating blinking lights
    if (this.isClosed) {
      // Alternating blink every 0.35s
      this.blinkTimer += delta;
      if (this.blinkTimer >= 0.35) {
        this.blinkTimer = 0;
        this.currentToneHigh = !this.currentToneHigh;

        // Calculate distance to player for realistic spatial sound falloff
        const dist = this.crossingPosition.distanceTo(playerPos);
        const distFactor = Math.min(1.0, dist / 80.0);
        audio.playCrossingBell(this.currentToneHigh, distFactor);

        // Toggle twin red lamps
        const colOn = 0xff1744;
        const colOff = 0x330000;
        if (this.redLamps.length >= 4) {
          (this.redLamps[0].material as THREE.MeshBasicMaterial).color.setHex(this.currentToneHigh ? colOn : colOff);
          (this.redLamps[1].material as THREE.MeshBasicMaterial).color.setHex(this.currentToneHigh ? colOff : colOn);
          (this.redLamps[2].material as THREE.MeshBasicMaterial).color.setHex(this.currentToneHigh ? colOn : colOff);
          (this.redLamps[3].material as THREE.MeshBasicMaterial).color.setHex(this.currentToneHigh ? colOff : colOn);
        }
      }
    }
  }
}
