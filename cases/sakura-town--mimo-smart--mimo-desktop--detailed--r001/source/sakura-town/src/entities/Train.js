/**
 * Commuter train: multi-car model that follows the rail loop with
 * real stop/dwell/departure logic at the station.
 */
import * as THREE from 'three';
import { placeOnPlanet } from '../world/Planet.js';
import { sampleRail, buildRailLengths } from '../world/Railway.js';
import { toonMaterial, unlitMaterial } from '../utils/materials.js';
import { bus } from '../core/EventBus.js';

const CAR_COUNT = 3;
const CAR_LEN = 8.2;
const CAR_GAP = 0.55;

export class Train {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'train';
    this.t = 0; // position along loop 0..1
    this.dist = 0;
    this.speed = 0; // layout units / second
    this.maxSpeed = 14;
    this.state = 'running'; // running | arriving | dwelling | departing
    this.dwellTimer = 0;
    this.dwellDuration = 14; // seconds at station
    this.cars = [];
    this.lengths = buildRailLengths();
    this.passengers = [];
    this.late = false;
    this.lightIntensity = 1;

    this.build();
  }

  build() {
    for (let i = 0; i < CAR_COUNT; i++) {
      const car = createCar(i);
      this.cars.push(car);
      this.group.add(car);
    }
  }

  get isAtStation() {
    return this.state === 'dwelling';
  }

  update(dt, hour) {
    const stationT = 0.02; // roughly where station sits on loop
    // station is near layout (0,-42) which is close to first segments
    // We treat dist around a "station distance" as the stop point.
    const stationDist = this.lengths.total * 0.08;

    if (this.state === 'running') {
      this.speed = THREE.MathUtils.lerp(this.speed, this.maxSpeed, dt * 0.4);
      this.dist += this.speed * dt;

      // detect arrival window
      const remaining = this._distToStation(stationDist);
      if (remaining < 28 && remaining > 0) {
        this.state = 'arriving';
        bus.emit('train:arriving', { train: this });
      }
    } else if (this.state === 'arriving') {
      const remaining = this._distToStation(stationDist);
      const desired = Math.min(this.maxSpeed, Math.max(1.2, remaining * 0.35));
      this.speed = THREE.MathUtils.lerp(this.speed, desired, dt * 1.2);
      this.dist += this.speed * dt;
      if (remaining < 0.6 || this.speed < 1.5) {
        this.speed = 0;
        this.dist = stationDist;
        this.state = 'dwelling';
        this.dwellTimer = this.dwellDuration;
        bus.emit('train:stopped', { train: this });
      }
    } else if (this.state === 'dwelling') {
      this.speed = 0;
      this.dwellTimer -= dt;
      if (this.dwellTimer <= 0) {
        this.state = 'departing';
        bus.emit('train:departing', { train: this });
      }
    } else if (this.state === 'departing') {
      this.speed = THREE.MathUtils.lerp(this.speed, this.maxSpeed, dt * 0.35);
      this.dist += this.speed * dt;
      if (this.speed > this.maxSpeed * 0.55) {
        this.state = 'running';
      }
    }

    this.t = this.lengths.tFromDist(this.dist);
    this._placeCars();
  }

  _distToStation(stationDist) {
    let d = stationDist - this.dist;
    const total = this.lengths.total;
    while (d < 0) d += total;
    while (d > total) d -= total;
    return d;
  }

  _placeCars() {
    for (let i = 0; i < this.cars.length; i++) {
      const offsetDist = -i * (CAR_LEN + CAR_GAP);
      const t = this.lengths.tFromDist(this.dist + offsetDist);
      const p = sampleRail(t);
      placeOnPlanet(this.cars[i], p.x, p.z, 0.42, p.yaw);
    }
  }
}

function createCar(index) {
  const g = new THREE.Group();
  const bodyMat = toonMaterial('#e8eef2');
  const stripe = toonMaterial('#2a7a4a');
  const dark = toonMaterial('#2a3038');
  const glass = toonMaterial('#6a9ab0', { transparent: true, opacity: 0.55 });
  const metal = toonMaterial('#8a9098');

  const L = CAR_LEN;
  const W = 2.7;
  const H = 2.55;

  // body
  g.add(boxMesh(W, H, L, bodyMat, 0, H / 2 + 0.35, 0));
  // green stripe
  g.add(boxMesh(W + 0.06, 0.35, L + 0.06, stripe, 0, 1.15, 0));
  // roof
  g.add(boxMesh(W * 0.92, 0.22, L * 0.96, metal, 0, H + 0.42, 0));
  // undercarriage
  g.add(boxMesh(W * 0.85, 0.35, L * 0.9, dark, 0, 0.28, 0));

  // windows
  for (let w = -3; w <= 3; w++) {
    for (const side of [-1, 1]) {
      g.add(boxMesh(0.08, 1.1, 1.35, glass, side * (W / 2 + 0.02), 1.85, w * 1.15));
    }
  }
  // cab windows on first/last
  if (index === 0 || index === CAR_COUNT - 1) {
    const end = index === 0 ? 1 : -1;
    g.add(boxMesh(W * 0.7, 1.15, 0.1, glass, 0, 1.85, end * (L / 2 + 0.02)));
    // headlights
    const hl = toonMaterial('#fff2c0', { emissive: '#ffe6a0', emissiveIntensity: 1.2 });
    g.add(boxMesh(0.28, 0.18, 0.1, hl, -0.8, 0.95, end * (L / 2 + 0.08)));
    g.add(boxMesh(0.28, 0.18, 0.1, hl, 0.8, 0.95, end * (L / 2 + 0.08)));
  }

  // doors
  for (let d = -1; d <= 1; d++) {
    for (const side of [-1, 1]) {
      g.add(boxMesh(0.1, 1.9, 1.1, toonMaterial('#c8d0d8'), side * (W / 2 + 0.04), 1.35, d * 2.4));
    }
  }

  // bogies
  for (const z of [-L * 0.28, L * 0.28]) {
    g.add(boxMesh(W * 0.7, 0.35, 1.6, dark, 0, 0.22, z));
    for (const side of [-1, 1]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.18, 10), dark);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(side * 0.75, 0.32, z);
      g.add(wheel);
    }
  }

  return g;
}

function boxMesh(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}
