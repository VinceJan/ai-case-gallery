// src/world/Weather.ts
// Dynamic weather systems: Falling Sakura Petal Storm, Gentle Spring Rain, Sunny, Twilight.
import * as THREE from 'three';
import { WeatherType } from '../types';

export class WeatherSystem {
  public scene: THREE.Scene;
  public currentWeather: WeatherType = 'sakura_storm';

  // Particle systems
  private petalParticles: THREE.InstancedMesh | null = null;
  private petalCount = 1200;
  private petalMatrices: THREE.Matrix4[] = [];
  private petalVelocities: THREE.Vector3[] = [];
  private petalRotSpeeds: THREE.Vector3[] = [];
  private petalDummy = new THREE.Object3D();

  private rainParticles: THREE.Points | null = null;
  private rainCount = 2200;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    this.createSakuraPetals();
    this.createRainSystem();
    this.setWeather('sakura_storm');
  }

  private createSakuraPetals(): void {
    // Single petal geometry (slightly curved oval)
    const petalGeo = new THREE.PlaneGeometry(0.24, 0.36, 2, 2);
    const posAttr = petalGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      posAttr.setZ(i, Math.sin((y + 0.18) * Math.PI) * 0.06);
    }
    petalGeo.computeVertexNormals();

    const petalMat = new THREE.MeshToonMaterial({
      color: 0xffb7c5, // Sakura petal pink
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });

    this.petalParticles = new THREE.InstancedMesh(petalGeo, petalMat, this.petalCount);
    this.petalParticles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // Initial random spread around town (-80 to 80 on X/Z, 0 to 30 on Y)
    for (let i = 0; i < this.petalCount; i++) {
      const x = (Math.random() - 0.5) * 170;
      const y = Math.random() * 26 + 1;
      const z = (Math.random() - 0.5) * 170;

      this.petalDummy.position.set(x, y, z);
      this.petalDummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.petalDummy.scale.setScalar(0.7 + Math.random() * 0.6);
      this.petalDummy.updateMatrix();

      this.petalParticles.setMatrixAt(i, this.petalDummy.matrix);
      this.petalMatrices.push(this.petalDummy.matrix.clone());

      this.petalVelocities.push(
        new THREE.Vector3(
          0.6 + Math.random() * 0.8, // gentle eastern breeze
          -(0.7 + Math.random() * 0.8), // downward flutter
          0.3 + (Math.random() - 0.5) * 0.4
        )
      );

      this.petalRotSpeeds.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5
        )
      );
    }

    this.scene.add(this.petalParticles);
  }

  private createRainSystem(): void {
    const rainGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.rainCount * 3);

    for (let i = 0; i < this.rainCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = Math.random() * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 160;
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const rainMat = new THREE.PointsMaterial({
      color: 0x90caf9,
      size: 0.28,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.rainParticles = new THREE.Points(rainGeo, rainMat);
    this.rainParticles.visible = false;
    this.scene.add(this.rainParticles);
  }

  public setWeather(type: WeatherType): void {
    this.currentWeather = type;

    if (this.petalParticles) {
      this.petalParticles.visible = type === 'sakura_storm' || type === 'sunny' || type === 'twilight';
    }

    if (this.rainParticles) {
      this.rainParticles.visible = type === 'rain';
    }
  }

  public update(delta: number, playerPos: THREE.Vector3): void {
    // 1. Update Sakura Petals
    if (this.petalParticles && this.petalParticles.visible) {
      const boundRadius = 85;
      for (let i = 0; i < this.petalCount; i++) {
        this.petalParticles.getMatrixAt(i, this.petalDummy.matrix);
        this.petalDummy.matrix.decompose(this.petalDummy.position, this.petalDummy.quaternion, this.petalDummy.scale);

        // Wind drift + fluttering
        const vel = this.petalVelocities[i];
        this.petalDummy.position.x += vel.x * delta;
        this.petalDummy.position.y += vel.y * delta;
        this.petalDummy.position.z += vel.z * delta;

        // Tumble rotation
        const rot = this.petalRotSpeeds[i];
        this.petalDummy.rotation.x += rot.x * delta;
        this.petalDummy.rotation.y += rot.y * delta;
        this.petalDummy.rotation.z += rot.z * delta;

        // Wrap around player position
        if (this.petalDummy.position.y < 0.1) {
          this.petalDummy.position.y = 24 + Math.random() * 6;
          this.petalDummy.position.x = playerPos.x + (Math.random() - 0.5) * boundRadius * 2;
          this.petalDummy.position.z = playerPos.z + (Math.random() - 0.5) * boundRadius * 2;
        }

        this.petalDummy.updateMatrix();
        this.petalParticles.setMatrixAt(i, this.petalDummy.matrix);
      }
      this.petalParticles.instanceMatrix.needsUpdate = true;
    }

    // 2. Update Rain Streaks
    if (this.rainParticles && this.rainParticles.visible) {
      const positions = this.rainParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < this.rainCount; i++) {
        positions[i * 3 + 1] -= 38 * delta; // Fast rain falling
        positions[i * 3 + 0] += 3.5 * delta; // Wind slant

        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 38 + Math.random() * 5;
          positions[i * 3 + 0] = playerPos.x + (Math.random() - 0.5) * 120;
          positions[i * 3 + 2] = playerPos.z + (Math.random() - 0.5) * 120;
        }
      }
      this.rainParticles.geometry.attributes.position.needsUpdate = true;
    }
  }
}
