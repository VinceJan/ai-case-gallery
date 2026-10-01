// src/vehicles/Bicycle.ts
// Rideable Japanese Mamachari (ママチャリ) utility bicycle with front basket, bell, and spinning wheels.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { audio } from '../engine/AudioSynthesizer';
import { physics } from '../engine/Physics';

export class Bicycle {
  public mesh: THREE.Group;
  public frontWheel: THREE.Group;
  public rearWheel: THREE.Group;
  public handlebars: THREE.Group;
  public pedalCrank: THREE.Group;
  public headlight: THREE.SpotLight;

  public isMounted: boolean = false;
  public speed: number = 0;
  public heading: number = 0; // Yaw angle in radians
  public bankAngle: number = 0;

  constructor(scene: THREE.Scene, initialPos: THREE.Vector3 = new THREE.Vector3(-14, 0, 14)) {
    this.mesh = new THREE.Group();
    this.mesh.position.copy(initialPos);
    this.mesh.position.y = physics.getGroundHeight(initialPos.x, initialPos.z);
    scene.add(this.mesh);

    const frameMat = CelShaders.createToonMaterial(0x20bf6b); // Japanese mint green frame
    const chromeMat = CelShaders.createToonMaterial(0xdcdde1);
    const blackMat = CelShaders.createToonMaterial(0x2f3640);
    const saddleMat = CelShaders.createToonMaterial(0x5c4033);

    // 1. Curved Step-through Steel Frame (ママチャリ)
    const frameTube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 8), frameMat);
    frameTube.rotation.z = Math.PI / 3;
    frameTube.position.set(0, 0.45, 0);
    this.mesh.add(frameTube);

    const seatTube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8), frameMat);
    seatTube.rotation.z = -Math.PI / 12;
    seatTube.position.set(-0.25, 0.55, 0);
    this.mesh.add(seatTube);

    // Saddle / Seat
    const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.2), saddleMat);
    saddle.position.set(-0.28, 0.88, 0);
    this.mesh.add(saddle);

    // Rear carrier rack (荷台)
    const rack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.16), chromeMat);
    rack.position.set(-0.55, 0.72, 0);
    this.mesh.add(rack);

    // 2. Wheels (Radius 0.35m)
    this.frontWheel = this.buildWheel(chromeMat, blackMat);
    this.frontWheel.position.set(0.65, 0.35, 0);
    this.mesh.add(this.frontWheel);

    this.rearWheel = this.buildWheel(chromeMat, blackMat);
    this.rearWheel.position.set(-0.65, 0.35, 0);
    this.mesh.add(this.rearWheel);

    // 3. Handlebars & Front Basket (前カゴ)
    this.handlebars = new THREE.Group();
    this.handlebars.position.set(0.45, 0.85, 0);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8), chromeMat);
    this.handlebars.add(stem);

    // Curved handlebar
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 8), chromeMat);
    bar.rotation.x = Math.PI / 2;
    bar.position.set(-0.04, 0.15, 0);
    this.handlebars.add(bar);

    // Front wire mesh grocery basket
    const basket = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.36), chromeMat);
    basket.position.set(0.18, 0.05, 0);
    this.handlebars.add(basket);

    // Front LED Headlight
    const headlightMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.1, 8), chromeMat);
    headlightMesh.rotation.z = Math.PI / 2;
    headlightMesh.position.set(0.18, -0.15, 0);
    this.handlebars.add(headlightMesh);

    this.headlight = new THREE.SpotLight(0xfffaed, 0.0, 18, Math.PI / 5, 0.4);
    this.headlight.position.set(0.25, -0.15, 0);
    this.headlight.target.position.set(5.0, -0.5, 0);
    this.handlebars.add(this.headlight);
    this.handlebars.add(this.headlight.target);

    this.mesh.add(this.handlebars);

    // 4. Pedal Crank
    this.pedalCrank = new THREE.Group();
    this.pedalCrank.position.set(-0.15, 0.25, 0);
    const crankAxle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6), chromeMat);
    crankAxle.rotation.x = Math.PI / 2;
    this.pedalCrank.add(crankAxle);
    this.mesh.add(this.pedalCrank);

    // Kickstand
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.32, 6), chromeMat);
    stand.rotation.z = Math.PI / 6;
    stand.position.set(-0.6, 0.18, -0.1);
    this.mesh.add(stand);
  }

  private buildWheel(chromeMat: THREE.Material, tireMat: THREE.Material): THREE.Group {
    const wheel = new THREE.Group();

    // Black Rubber Tire (Torus)
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.035, 8, 20), tireMat);
    wheel.add(tire);

    // Chrome Rim
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.015, 8, 20), chromeMat);
    wheel.add(rim);

    // Center Hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8), chromeMat);
    hub.rotation.x = Math.PI / 2;
    wheel.add(hub);

    // Crossed Spokes
    for (let s = 0; s < 8; s++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.62, 4), chromeMat);
      spoke.rotation.z = (s * Math.PI) / 4;
      wheel.add(spoke);
    }

    return wheel;
  }

  public ringBell(): void {
    audio.playBicycleBell();
  }

  public updateRiding(delta: number, forwardInput: number, steerInput: number): void {
    const maxSpeed = 10.5; // Fast comfortable cruising speed (~38 km/h)
    const accel = 8.0;
    const friction = 3.5;

    // Acceleration & Braking
    if (forwardInput !== 0) {
      this.speed = Math.max(-3.0, Math.min(maxSpeed, this.speed + forwardInput * accel * delta));
    } else {
      if (this.speed > 0) {
        this.speed = Math.max(0, this.speed - friction * delta);
      } else if (this.speed < 0) {
        this.speed = Math.min(0, this.speed + friction * delta);
      }
    }

    // Steering (effective when moving)
    if (Math.abs(this.speed) > 0.1) {
      const turnSpeed = 2.4 * (this.speed / maxSpeed);
      this.heading -= steerInput * turnSpeed * delta;

      // Handlebar visual rotation
      this.handlebars.rotation.y = -steerInput * 0.45;
      // Banking lean into turn
      const targetBank = -steerInput * 0.25 * (Math.abs(this.speed) / maxSpeed);
      this.bankAngle += (targetBank - this.bankAngle) * delta * 6.0;
    } else {
      this.handlebars.rotation.y *= 0.85;
      this.bankAngle *= 0.85;
    }

    // Calculate movement velocity vector
    const moveDist = this.speed * delta;
    const forwardVec = new THREE.Vector3(Math.cos(this.heading), 0, -Math.sin(this.heading));
    const targetPos = this.mesh.position.clone().add(forwardVec.multiplyScalar(moveDist));

    // Physics step
    const { newPos } = physics.moveActor(this.mesh.position, forwardVec.multiplyScalar(moveDist), 0.4, 1.2, 0.4);
    this.mesh.position.copy(newPos);
    this.mesh.rotation.y = this.heading;
    this.mesh.rotation.z = this.bankAngle;

    // Spin wheels and pedal crank
    const wheelRotSpeed = moveDist / 0.35;
    this.frontWheel.rotation.z -= wheelRotSpeed;
    this.rearWheel.rotation.z -= wheelRotSpeed;
    this.pedalCrank.rotation.z -= wheelRotSpeed * 0.6;
  }
}
