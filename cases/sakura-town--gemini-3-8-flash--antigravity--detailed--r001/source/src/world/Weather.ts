// src/world/Weather.ts
// Dynamic weather system: Sakura Petal showers, gentle rain, sunshine, and umbrellas.
import * as THREE from 'three';
import { WeatherType } from '../types';
import { TextureGenerator } from '../engine/TextureGenerator';
import { audio } from '../engine/AudioSynthesizer';

export class WeatherSystem {
  public currentWeather: WeatherType = WeatherType.SAKURA_SHOWER;
  private scene: THREE.Scene;

  // Sakura petal particle system
  private petalParticles: THREE.InstancedMesh;
  private petalCount: number = 800;
  private petalMatrices: THREE.Matrix4[] = [];
  private petalPositions: THREE.Vector3[] = [];
  private petalRotations: THREE.Euler[] = [];
  private petalSpeeds: THREE.Vector3[] = [];

  // Rain particle system
  private rainParticles: THREE.Points | null = null;
  private rainCount: number = 2500;
  private rainPositions: Float32Array | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // 1. Create Sakura Petals Instanced Mesh
    const petalGeo = new THREE.PlaneGeometry(0.2, 0.26);
    const petalMat = new THREE.MeshToonMaterial({
      map: TextureGenerator.createSakuraPetalTexture(),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    this.petalParticles = new THREE.InstancedMesh(petalGeo, petalMat, this.petalCount);
    this.petalParticles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < this.petalCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 90,
        1 + Math.random() * 25,
        (Math.random() - 0.5) * 90
      );
      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const speed = new THREE.Vector3(
        0.5 + Math.random() * 1.5,
        -0.8 - Math.random() * 1.2,
        0.3 + Math.random() * 1.0
      );

      this.petalPositions.push(pos);
      this.petalRotations.push(rot);
      this.petalSpeeds.push(speed);

      dummy.position.copy(pos);
      dummy.rotation.copy(rot);
      dummy.scale.setScalar(0.7 + Math.random() * 0.6);
      dummy.updateMatrix();
      this.petalParticles.setMatrixAt(i, dummy.matrix);
    }
    this.petalParticles.instanceMatrix.needsUpdate = true;
    this.scene.add(this.petalParticles);

    // 2. Create Rain System
    this.createRainSystem();
    this.setWeather(WeatherType.SAKURA_SHOWER);
  }

  private createRainSystem(): void {
    const rainGeo = new THREE.BufferGeometry();
    this.rainPositions = new Float32Array(this.rainCount * 3);

    for (let i = 0; i < this.rainCount; i++) {
      this.rainPositions[i * 3] = (Math.random() - 0.5) * 100;
      this.rainPositions[i * 3 + 1] = Math.random() * 40;
      this.rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(this.rainPositions, 3));

    const rainMat = new THREE.PointsMaterial({
      color: 0x90caf9,
      size: 0.22,
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });

    this.rainParticles = new THREE.Points(rainGeo, rainMat);
    this.rainParticles.visible = false;
    this.scene.add(this.rainParticles);
  }

  public setWeather(weather: WeatherType): void {
    this.currentWeather = weather;
    const isRain = weather === WeatherType.RAINY;

    if (this.rainParticles) {
      this.rainParticles.visible = isRain;
    }

    audio.setRainActive(isRain);

    // Adjust petal density
    if (this.petalParticles) {
      this.petalParticles.visible = !isRain;
    }
  }

  public isRaining(): boolean {
    return this.currentWeather === WeatherType.RAINY;
  }

  public update(delta: number, playerCenter: THREE.Vector3): void {
    const dummy = new THREE.Object3D();

    // 1. Update Sakura Petals
    if (this.petalParticles.visible) {
      const isShower = this.currentWeather === WeatherType.SAKURA_SHOWER;
      const windMultiplier = isShower ? 1.8 : 0.8;

      for (let i = 0; i < this.petalCount; i++) {
        const pos = this.petalPositions[i];
        const rot = this.petalRotations[i];
        const spd = this.petalSpeeds[i];

        // Flutter motion
        pos.x += spd.x * delta * windMultiplier;
        pos.y += spd.y * delta;
        pos.z += spd.z * delta * windMultiplier;

        rot.x += delta * 1.5;
        rot.y += delta * 2.0;
        rot.z += Math.sin(pos.x * 2.0) * delta;

        // Wrap around player
        if (pos.y < 0.2) {
          pos.y = 20 + Math.random() * 8;
          pos.x = playerCenter.x + (Math.random() - 0.5) * 70;
          pos.z = playerCenter.z + (Math.random() - 0.5) * 70;
        }
        if (Math.abs(pos.x - playerCenter.x) > 45) {
          pos.x = playerCenter.x - Math.sign(pos.x - playerCenter.x) * 44;
        }
        if (Math.abs(pos.z - playerCenter.z) > 45) {
          pos.z = playerCenter.z - Math.sign(pos.z - playerCenter.z) * 44;
        }

        dummy.position.copy(pos);
        dummy.rotation.copy(rot);
        dummy.updateMatrix();
        this.petalParticles.setMatrixAt(i, dummy.matrix);
      }
      this.petalParticles.instanceMatrix.needsUpdate = true;
    }

    // 2. Update Rain
    if (this.rainParticles && this.rainParticles.visible && this.rainPositions) {
      const posAttr = this.rainParticles.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < this.rainCount; i++) {
        arr[i * 3 + 1] -= delta * 32.0; // Fast rain descent
        arr[i * 3] += delta * 3.0;     // Slanted wind

        if (arr[i * 3 + 1] < 0.0) {
          arr[i * 3 + 1] = 30 + Math.random() * 10;
          arr[i * 3] = playerCenter.x + (Math.random() - 0.5) * 80;
          arr[i * 3 + 2] = playerCenter.z + (Math.random() - 0.5) * 80;
        }
      }
      posAttr.needsUpdate = true;
    }
  }
}
