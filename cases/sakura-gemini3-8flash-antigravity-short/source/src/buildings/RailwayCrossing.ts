// src/buildings/RailwayCrossing.ts
// Authentic Japanese railway crossing with animated barrier gates and flashing red signals.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { audio } from '../engine/AudioSynthesizer';

export class RailwayCrossing {
  public group: THREE.Group;

  // Crossing barrier arms
  private barrierArms: THREE.Group[] = [];
  private warningLamps: THREE.Mesh[] = [];

  // Crossing state
  public isClosed: boolean = false;
  private barrierAngle: number = 0; // 0 = open (vertical), PI/2 = closed (horizontal)
  private flashTimer: number = 0;
  private flashState: boolean = false;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // Crossing Location: Railway intersecting Station Avenue at X: 22, Z: 24
    this.buildCrossingAssembly(18.5, 27, 0);
    this.buildCrossingAssembly(25.5, 21, Math.PI);
  }

  private buildCrossingAssembly(x: number, z: number, rotationY: number): void {
    const assembly = new THREE.Group();
    assembly.position.set(x, 0, z);
    assembly.rotation.y = rotationY;

    const poleMat = CelShaders.createToonMaterial(0xf1c40f); // Bright warning yellow
    const metalMat = CelShaders.createToonMaterial(0x2f3542);
    const redLightOffMat = CelShaders.createToonMaterial(0x7f1d1d);
    const redLightOnMat = CelShaders.createToonMaterial(0xff0000, {
      emissive: 0xff1744,
      emissiveIntensity: 1.5
    });

    // 1. Vertical Warning Pole (with black and yellow hazard paint)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.2, 8), poleMat);
    pole.position.y = 2.1;
    pole.castShadow = true;
    assembly.add(pole);

    // Hazard Stripes Rings
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.35, 8), metalMat);
      ring.position.y = 0.8 + i * 0.8;
      assembly.add(ring);
    }

    // 2. Crossbuck Signboard (踏切警標 - X cross)
    const crossGroup = new THREE.Group();
    crossGroup.position.set(0, 3.8, 0);

    const xBar1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 0.05), poleMat);
    xBar1.rotation.z = Math.PI / 4;
    crossGroup.add(xBar1);

    const xBar2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 0.05), poleMat);
    xBar2.rotation.z = -Math.PI / 4;
    crossGroup.add(xBar2);

    assembly.add(crossGroup);

    // 3. Dual Red Flashing Signal Lamps (警報灯)
    const lampBar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.08), metalMat);
    lampBar.position.set(0, 3.2, 0);
    assembly.add(lampBar);

    for (const lampSide of [-0.48, 0.48]) {
      // Visor hood
      const visor = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.18, 12), metalMat);
      visor.rotation.x = Math.PI / 2;
      visor.position.set(lampSide, 3.2, 0.08);
      assembly.add(visor);

      // Red lens
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.19, 12), redLightOffMat);
      lens.position.set(lampSide, 3.2, 0.18);
      lens.userData = { onMat: redLightOnMat, offMat: redLightOffMat, isLeft: lampSide < 0 };
      assembly.add(lens);
      this.warningLamps.push(lens);
    }

    // 4. Motorized Barrier Arm (遮断桿 - Black/Yellow striped boom)
    const motorBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.55), metalMat);
    motorBox.position.set(0, 0.85, 0);
    assembly.add(motorBox);

    const armPivot = new THREE.Group();
    armPivot.position.set(0, 0.95, 0.35);
    armPivot.rotation.z = Math.PI / 2; // Initial vertical open state

    // 6.5m barrier boom
    const boomGeo = new THREE.BoxGeometry(6.5, 0.12, 0.12);
    const boom = new THREE.Mesh(boomGeo, poleMat);
    boom.position.set(3.25, 0, 0);
    boom.castShadow = true;
    armPivot.add(boom);

    // Hazard stripes along boom
    for (let b = 0.5; b < 6.2; b += 1.0) {
      const bStripe = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.13, 0.13), metalMat);
      bStripe.position.set(b, 0, 0);
      armPivot.add(bStripe);
    }

    assembly.add(armPivot);
    this.barrierArms.push(armPivot);

    this.group.add(assembly);
  }

  public setClosed(closed: boolean): void {
    if (this.isClosed !== closed) {
      this.isClosed = closed;
      if (closed) {
        audio.startCrossingBell();
      } else {
        audio.stopCrossingBell();
      }
    }
  }

  public update(delta: number): void {
    // 1. Smoothly animate barrier gate angle
    // Open: angle = PI/2 (vertical), Closed: angle = 0 (horizontal across road)
    const targetAngle = this.isClosed ? 0.0 : Math.PI / 2;
    this.barrierAngle = THREE.MathUtils.lerp(this.barrierAngle, targetAngle, delta * 3.5);

    this.barrierArms.forEach((arm) => {
      arm.rotation.z = this.barrierAngle;
    });

    // 2. Alternating flashing lamps when closed
    if (this.isClosed) {
      this.flashTimer += delta;
      if (this.flashTimer > 0.42) {
        this.flashTimer = 0;
        this.flashState = !this.flashState;

        this.warningLamps.forEach((lamp) => {
          const isLeft = lamp.userData.isLeft;
          const shouldBeOn = isLeft ? this.flashState : !this.flashState;
          lamp.material = shouldBeOn ? lamp.userData.onMat : lamp.userData.offMat;
        });
      }
    } else {
      // Turn off lamps when open
      this.warningLamps.forEach((lamp) => {
        lamp.material = lamp.userData.offMat;
      });
    }
  }
}
