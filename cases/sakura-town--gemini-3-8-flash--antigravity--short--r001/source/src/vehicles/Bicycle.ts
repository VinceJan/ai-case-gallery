// src/vehicles/Bicycle.ts
// Rideable Japanese Mamachari city bicycle with spinning wheels and ringing bell.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { audio } from '../engine/AudioSynthesizer';

export class Bicycle {
  public group: THREE.Group;
  public frontWheel: THREE.Group;
  public rearWheel: THREE.Group;

  public isMounted: boolean = false;
  public position: THREE.Vector3;
  public rotationY: number = 0;

  constructor(scene: THREE.Scene, initialPos: THREE.Vector3) {
    this.group = new THREE.Group();
    this.position = initialPos.clone();
    this.group.position.copy(this.position);
    scene.add(this.group);

    const wheels = this.buildBicycleModel();
    this.frontWheel = wheels.front;
    this.rearWheel = wheels.rear;
  }

  private buildBicycleModel(): { front: THREE.Group; rear: THREE.Group } {
    const frameMat = CelShaders.createToonMaterial(0x3498db); // Sky blue frame
    const chromeMat = CelShaders.createToonMaterial(0xdcdde1);
    const rubberMat = CelShaders.createToonMaterial(0x2f3542);
    const basketMat = CelShaders.createToonMaterial(0x718093);
    const saddleMat = CelShaders.createToonMaterial(0x2c3e50);

    // Wheel helper: Tire + Hub + Spokes
    const makeWheel = () => {
      const wGroup = new THREE.Group();
      // Outer rubber tire
      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.045, 8, 24), rubberMat);
      wGroup.add(tire);

      // Hub
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8), chromeMat);
      hub.rotation.x = Math.PI / 2;
      wGroup.add(hub);

      // 4 Spokes cross
      for (let s = 0; s < 4; s++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.74, 4), chromeMat);
        spoke.rotation.z = (s * Math.PI) / 4;
        wGroup.add(spoke);
      }
      return wGroup;
    };

    // 1. Rear Wheel (at Z = -0.65)
    const rearWheel = makeWheel();
    rearWheel.position.set(0, 0.38, -0.65);
    this.group.add(rearWheel);

    // 2. Front Wheel (at Z = 0.65)
    const frontWheel = makeWheel();
    frontWheel.position.set(0, 0.38, 0.65);
    this.group.add(frontWheel);

    // 3. Mamachari Step-Through Frame
    const tubeGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8);
    // Lower curving tube
    const mainTube = new THREE.Mesh(tubeGeo, frameMat);
    mainTube.rotation.x = Math.PI / 4.2;
    mainTube.position.set(0, 0.48, 0.05);
    this.group.add(mainTube);

    // Seat stay
    const seatTube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8), frameMat);
    seatTube.rotation.x = -Math.PI / 8;
    seatTube.position.set(0, 0.62, -0.32);
    this.group.add(seatTube);

    // Saddle / Bicycle Seat
    const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.32), saddleMat);
    saddle.position.set(0, 0.95, -0.38);
    saddle.castShadow = true;
    this.group.add(saddle);

    // 4. Handlebars & Front Wire Basket
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8), chromeMat);
    stem.position.set(0, 0.75, 0.58);
    this.group.add(stem);

    const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.04), chromeMat);
    handlebar.position.set(0, 1.05, 0.55);
    this.group.add(handlebar);

    // Front Wire Shopping Basket (ママチャリ前カゴ)
    const basket = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.34), basketMat);
    basket.position.set(0, 0.92, 0.74);
    basket.castShadow = true;
    this.group.add(basket);

    return { front: frontWheel, rear: rearWheel };
  }

  public ringBell(): void {
    audio.playBicycleBell();
  }

  public update(speed: number, delta: number): void {
    // Spin wheels according to riding speed
    if (Math.abs(speed) > 0.01) {
      const rollAngle = speed * delta * 5.0;
      this.frontWheel.rotation.x += rollAngle;
      this.rearWheel.rotation.x += rollAngle;
    }
  }
}
