/**
 * Closed-loop railway: train runs, stops at station, crossing gates, passenger boarding.
 */
import * as THREE from 'three';
import { placeOnSurface } from '../world/surface';
import { createTrainCar, createCrossingGate } from '../world/buildings';
import type { MeshToonMaterial } from 'three';

export type TrainState = {
  angle: number;
  speed: number;
  targetSpeed: number;
  state: 'running' | 'approaching' | 'stopped' | 'departing' | 'delayed';
  stopTimer: number;
  doorsOpen: boolean;
  delayTimer: number;
  cars: THREE.Group;
};

export class TrainSystem {
  readonly group = new THREE.Group();
  private trains: TrainState[] = [];
  private radius: number;
  private crossings: Array<{ group: THREE.Group; angle: number; arm: THREE.Object3D | null }> = [];
  private stationAngle = 0;
  private _crossingClosed = false;
  private whistle = 0;

  constructor(radius: number) {
    this.radius = radius;
    this.buildCrossings();
    this.spawnTrains(2);
  }

  private buildCrossings(): void {
    for (const angle of [Math.PI * 0.25, Math.PI * 1.25]) {
      const gate = createCrossingGate();
      const sx = Math.cos(angle) * (this.radius + 4);
      const sz = Math.sin(angle) * (this.radius + 4);
      placeOnSurface(gate, sx, sz, 0, angle);
      this.group.add(gate);
      this.crossings.push({
        group: gate,
        angle,
        arm: (gate as any).userData.armPivot ?? null,
      });
    }
  }

  private spawnTrains(count: number): void {
    for (let i = 0; i < count; i++) {
      const cars = new THREE.Group();
      const isHead = true;
      const car = createTrainCar({ isHead, color: i === 0 ? '#e8e8e0' : '#d8e0e8' });
      cars.add(car);
      // second car
      const car2 = createTrainCar({ isHead: false, color: '#d0d8e0' });
      car2.position.x = -12.4;
      cars.add(car2);
      this.group.add(cars);

      this.trains.push({
        angle: (i / count) * Math.PI * 2 + 0.4,
        speed: 8,
        targetSpeed: 8,
        state: 'running',
        stopTimer: 0,
        doorsOpen: false,
        delayTimer: 0,
        cars,
      });
    }
  }

  get crossingClosed(): boolean {
    return this._crossingClosed;
  }

  get nearestTrain(): TrainState | null {
    return this.trains[0] ?? null;
  }

  setDelay(active: boolean): void {
    for (const t of this.trains) {
      if (active) {
        t.state = 'delayed';
        t.delayTimer = 45;
        t.targetSpeed = 3;
      } else if (t.state === 'delayed') {
        t.state = 'running';
        t.targetSpeed = 8;
      }
    }
  }

  update(delta: number): void {
    let anyCrossing = false;

    for (const t of this.trains) {
      if (t.state === 'delayed') {
        t.delayTimer -= delta;
        if (t.delayTimer <= 0) {
          t.state = 'running';
          t.targetSpeed = 8;
        }
        t.targetSpeed = 2.5;
      }

      // distance to station along loop
      let diff = t.angle - this.stationAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const distToStation = Math.abs(diff) * this.radius;

      if (t.state === 'running' && distToStation < 18 && t.delayTimer <= 0) {
        t.state = 'approaching';
        t.targetSpeed = 6;
        this.whistle = 1.5;
      }
      if (t.state === 'approaching') {
        t.targetSpeed = Math.max(1.2, distToStation * 0.35);
        if (distToStation < 1.2) {
          t.state = 'stopped';
          t.stopTimer = 8;
          t.doorsOpen = true;
          t.targetSpeed = 0;
          t.speed = 0;
        }
      }
      if (t.state === 'stopped') {
        t.stopTimer -= delta;
        if (t.stopTimer < 3) t.doorsOpen = false;
        if (t.stopTimer <= 0) {
          t.state = 'departing';
          t.targetSpeed = 5;
        }
      }
      if (t.state === 'departing') {
        t.targetSpeed = 8;
        if (distToStation > 12) t.state = 'running';
      }

      // speed lerp
      t.speed += (t.targetSpeed - t.speed) * Math.min(1, delta * 1.8);
      t.angle += (t.speed / this.radius) * delta;

      // place train cars along the ring
      const sx = Math.cos(t.angle) * this.radius;
      const sz = Math.sin(t.angle) * this.radius;
      // train car length is along local X → yaw = angle aligns with ring tangent
      placeOnSurface(t.cars, sx, sz, 0.35, t.angle);

      // near-station flag unused but kept for crossing logic below

      // crossing proximity
      for (const c of this.crossings) {
        let cd = t.angle - c.angle;
        while (cd > Math.PI) cd -= Math.PI * 2;
        while (cd < -Math.PI) cd += Math.PI * 2;
        if (Math.abs(cd) * this.radius < 20) anyCrossing = true;
      }
    }

    this._crossingClosed = anyCrossing;
    for (const c of this.crossings) {
      if (c.arm) {
        const target = anyCrossing ? -Math.PI / 2 : 0;
        c.arm.rotation.x += (target - c.arm.rotation.x) * Math.min(1, delta * 3);
      }
      // blink light
      if (anyCrossing) {
        c.group.traverse((obj) => {
          const m = (obj as THREE.Mesh).material as MeshToonMaterial;
          if (m && m.emissive && Math.sin(performance.now() * 0.02) > 0) {
            m.emissiveIntensity = 1.5;
          } else if (m && m.emissive) {
            m.emissiveIntensity = 0.2;
          }
        });
      }
    }

    if (this.whistle > 0) this.whistle -= delta;
  }

  /** Surface position of train 0 for boarding. */
  trainSurface(): { sx: number; sz: number } | null {
    const t = this.trains[0];
    if (!t) return null;
    return {
      sx: Math.cos(t.angle) * this.radius,
      sz: Math.sin(t.angle) * this.radius,
    };
  }

  get trainState(): string {
    return this.trains[0]?.state ?? 'none';
  }

  get delayActive(): boolean {
    return this.trains.some((t) => t.state === 'delayed');
  }
}
