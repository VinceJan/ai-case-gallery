import * as THREE from 'three';
import { Rng } from '../utils/random';
import { createPetalTexture } from '../utils/textures';
import type { WeatherKind } from '../game/types';

const PETAL_COUNT = 320;
const RAIN_COUNT = 700;
const FIELD = 46;

interface Petal {
  x: number;
  y: number;
  z: number;
  vy: number;
  spin: number;
  phase: number;
}

/** 天气状态机 + 樱花花瓣/降雨粒子。 */
export class WeatherSystem {
  weather: WeatherKind = 'clear';
  /** 天气剩余游戏分钟。 */
  private remaining = 260;
  onWeatherChanged: ((weather: WeatherKind) => void) | null = null;

  private readonly petals: Petal[] = [];
  private readonly petalMesh: THREE.InstancedMesh;
  private readonly rainPoints: THREE.Points;
  private readonly rainVelocities: number[] = [];
  readonly group = new THREE.Group();
  private readonly matrix = new THREE.Matrix4();
  private readonly quaternion = new THREE.Quaternion();
  private readonly euler = new THREE.Euler();
  private readonly scaleVec = new THREE.Vector3(1, 1, 1);
  private readonly positionVec = new THREE.Vector3();
  private elapsed = 0;

  constructor(rng: Rng) {
    const petalTex = createPetalTexture();
    const petalGeo = new THREE.PlaneGeometry(0.16, 0.16);
    const petalMat = new THREE.MeshBasicMaterial({
      map: petalTex,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.petalMesh = new THREE.InstancedMesh(petalGeo, petalMat, PETAL_COUNT);
    this.petalMesh.frustumCulled = false;
    for (let i = 0; i < PETAL_COUNT; i += 1) {
      this.petals.push({
        x: rng.range(-FIELD, FIELD),
        y: rng.range(0, 18),
        z: rng.range(-FIELD, FIELD),
        vy: rng.range(0.5, 1.1),
        spin: rng.range(0.5, 2),
        phase: rng.range(0, Math.PI * 2),
      });
    }
    this.group.add(this.petalMesh);

    // 降雨
    const rainGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(RAIN_COUNT * 3);
    for (let i = 0; i < RAIN_COUNT; i += 1) {
      positions[i * 3] = rng.range(-FIELD, FIELD);
      positions[i * 3 + 1] = rng.range(0, 22);
      positions[i * 3 + 2] = rng.range(-FIELD, FIELD);
      this.rainVelocities.push(rng.range(9, 14));
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.rainPoints = new THREE.Points(
      rainGeo,
      new THREE.PointsMaterial({
        color: '#b8d4ec',
        size: 0.22,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    );
    this.rainPoints.frustumCulled = false;
    this.rainPoints.visible = false;
    this.group.add(this.rainPoints);
  }

  get isRaining(): boolean {
    return this.weather === 'rain';
  }

  get label(): string {
    return this.weather === 'clear' ? '晴' : this.weather === 'cloudy' ? '多云' : '雨';
  }

  setWeather(weather: WeatherKind, immediate = false): void {
    if (this.weather === weather && !immediate) return;
    this.weather = weather;
    this.rainPoints.visible = weather === 'rain';
    this.onWeatherChanged?.(weather);
  }

  /** 按游戏分钟推进天气状态机。 */
  tickGameMinutes(deltaMinutes: number, rng: Rng): void {
    this.remaining -= deltaMinutes;
    if (this.remaining > 0) return;
    const roll = rng.next();
    if (this.weather === 'rain') {
      this.setWeather(roll < 0.6 ? 'cloudy' : 'clear');
      this.remaining = rng.range(180, 420);
    } else if (this.weather === 'cloudy') {
      if (roll < 0.4) this.setWeather('rain');
      else if (roll < 0.8) this.setWeather('clear');
      else this.remaining = rng.range(120, 260);
      if (this.weather !== 'cloudy') this.remaining = rng.range(200, 460);
    } else {
      if (roll < 0.3) this.setWeather('cloudy');
      else if (roll < 0.42) this.setWeather('rain');
      else this.remaining = rng.range(240, 480);
      if (this.weather === 'clear') this.remaining = rng.range(240, 480);
    }
  }

  update(delta: number, playerPosition: THREE.Vector3, raining: boolean): void {
    this.elapsed += delta;
    this.group.position.set(playerPosition.x, 0, playerPosition.z);

    // 花瓣
    for (let i = 0; i < PETAL_COUNT; i += 1) {
      const p = this.petals[i];
      p.y -= p.vy * delta;
      p.x += Math.sin(this.elapsed * 1.4 + p.phase) * delta * 0.8;
      p.z += Math.cos(this.elapsed * 1.1 + p.phase) * delta * 0.6;
      if (p.y < 0.2) {
        p.y = 16;
        p.x = (Math.sin(i * 12.9898 + this.elapsed) * 0.5 + 0.5) * FIELD * 2 - FIELD;
        p.z = (Math.cos(i * 78.233 + this.elapsed) * 0.5 + 0.5) * FIELD * 2 - FIELD;
      }
      this.euler.set(p.phase + this.elapsed * p.spin, p.phase * 2, this.elapsed * p.spin * 0.7);
      this.quaternion.setFromEuler(this.euler);
      this.positionVec.set(p.x, p.y, p.z);
      this.matrix.compose(this.positionVec, this.quaternion, this.scaleVec);
      this.petalMesh.setMatrixAt(i, this.matrix);
    }
    this.petalMesh.instanceMatrix.needsUpdate = true;

    // 雨
    if (raining) {
      const positions = this.rainPoints.geometry.getAttribute('position') as THREE.BufferAttribute;
      const array = positions.array as Float32Array;
      for (let i = 0; i < RAIN_COUNT; i += 1) {
        array[i * 3 + 1] -= this.rainVelocities[i] * delta;
        if (array[i * 3 + 1] < 0) {
          array[i * 3] = (Math.sin(i * 91.7 + this.elapsed * 3) * 0.5 + 0.5) * FIELD * 2 - FIELD;
          array[i * 3 + 1] = 22;
          array[i * 3 + 2] = (Math.cos(i * 47.3 + this.elapsed * 2) * 0.5 + 0.5) * FIELD * 2 - FIELD;
        }
      }
      positions.needsUpdate = true;
    }
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  dispose(): void {
    this.petalMesh.geometry.dispose();
    (this.petalMesh.material as THREE.Material).dispose();
    this.rainPoints.geometry.dispose();
    (this.rainPoints.material as THREE.Material).dispose();
  }
}
