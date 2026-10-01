// src/vehicles/Train.ts
// 2-Car Japanese Commuter EMU Train running on a closed loop with station stops and riding physics.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { audio } from '../engine/AudioSynthesizer';
import { RailwayCrossing } from '../buildings/RailwayCrossing';

export enum TrainState {
  CRUISING = 'CRUISING',
  APPROACHING_STATION = 'APPROACHING_STATION',
  STOPPING_AT_STATION = 'STOPPING_AT_STATION',
  DOORS_OPEN = 'DOORS_OPEN',
  DEPARTING = 'DEPARTING'
}

export class TrainSystem {
  public group: THREE.Group;
  public trackCurve: THREE.CatmullRomCurve3;

  // Carriages
  public car1: THREE.Group;
  public car2: THREE.Group;
  private car1Doors: THREE.Mesh[] = [];
  private car2Doors: THREE.Mesh[] = [];

  // Track loop parameter (0.0 to 1.0)
  public trackProgress: number = 0.0;
  private speed: number = 0.048; // Loop speed
  public currentState: TrainState = TrainState.CRUISING;
  private stationTimer: number = 0;
  private doorsProgress: number = 0;

  // Player Riding
  public isPlayerRiding: boolean = false;
  public trainWorldPos: THREE.Vector3 = new THREE.Vector3();

  // Track Spline Waypoints across town
  private trackPoints: THREE.Vector3[] = [
    new THREE.Vector3(-30, 0.2, 25),  // Approach to Sakura Station
    new THREE.Vector3(-10, 0.2, 25),  // Sakura Station Platform Stop
    new THREE.Vector3(12, 0.2, 25),   // Approaching Crossing
    new THREE.Vector3(25, 0.2, 25),   // Railway Crossing!
    new THREE.Vector3(50, 0.2, 22),   // East turn
    new THREE.Vector3(60, 1.2, -5),   // South River Bank
    new THREE.Vector3(60, 1.2, -35),  // Crossing River Truss Bridge
    new THREE.Vector3(55, 0.5, -60),  // North East curve
    new THREE.Vector3(10, 0.2, -65),  // North Country line
    new THREE.Vector3(-35, 0.2, -65), // Behind Shrine Hill
    new THREE.Vector3(-65, 0.2, -45), // North West curve
    new THREE.Vector3(-75, 0.2, -15), // West countryside run
    new THREE.Vector3(-65, 0.2, 15),  // South West turn
    new THREE.Vector3(-45, 0.2, 25)   // Return to approach
  ];

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // 1. Closed-Loop Track Spline
    this.trackCurve = new THREE.CatmullRomCurve3(this.trackPoints, true, 'catmullrom', 0.2);

    // 2. Build 3D Rails and Sleepers
    this.renderTrackRails();

    // 3. Build 2-Car Japanese Commuter Train (EMU)
    this.car1 = this.buildTrainCar(true);
    this.car2 = this.buildTrainCar(false);
    this.group.add(this.car1);
    this.group.add(this.car2);

    this.updateTrainPosition(0);
  }

  private renderTrackRails(): void {
    const railMat = CelShaders.createToonMaterial(0xdcdde1);
    const sleeperMat = CelShaders.createToonMaterial(0x4a3728);

    const sampleCount = 280;
    const points = this.trackCurve.getSpacedPoints(sampleCount);

    for (let i = 0; i < sampleCount; i++) {
      const p = points[i];
      const tangent = this.trackCurve.getTangentAt(i / sampleCount).normalize();

      // Wooden sleeper tie (枕木)
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 0.25), sleeperMat);
      sleeper.position.copy(p);
      sleeper.position.y += 0.05;
      sleeper.rotation.y = Math.atan2(tangent.x, tangent.z) + Math.PI / 2;
      this.group.add(sleeper);
    }

    // Twin steel rails
    const railOffset = 0.65;
    for (const sign of [-1, 1]) {
      const railPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount;
        const pt = this.trackCurve.getPointAt(u % 1.0);
        const tan = this.trackCurve.getTangentAt(u % 1.0).normalize();
        const norm = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
        const railPt = pt.clone().add(norm.multiplyScalar(sign * railOffset));
        railPt.y += 0.14;
        railPoints.push(railPt);
      }
      const railCurve = new THREE.CatmullRomCurve3(railPoints, true);
      const railGeo = new THREE.TubeGeometry(railCurve, 280, 0.04, 6, true);
      const rail = new THREE.Mesh(railGeo, railMat);
      this.group.add(rail);
    }
  }

  private buildTrainCar(isLead: boolean): THREE.Group {
    const car = new THREE.Group();

    // Body dimensions: 13.5m length, 2.7m width, 3.2m height
    const bodyMat = CelShaders.createToonMaterial(0xf5f6fa); // Crisp Japanese white/cream
    const stripeMat = CelShaders.createToonMaterial(0xff7675); // Sakura pink line
    const greenStripeMat = CelShaders.createToonMaterial(0x2ecc71); // Fresh spring green line
    const roofMat = CelShaders.createToonMaterial(0x718093);
    const windowMat = CelShaders.createToonMaterial(0xa0e7e5, {
      transparent: true,
      opacity: 0.55,
      emissive: 0xffffff,
      emissiveIntensity: 0.2
    });

    // 1. Train Body Shell
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.7, 2.6, 13.5), bodyMat);
    body.position.y = 1.95;
    body.castShadow = true;
    car.add(body);

    // Decorative Pink and Green Stripes
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.22, 13.52), stripeMat);
    stripe.position.y = 1.35;
    car.add(stripe);

    const stripe2 = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.12, 13.52), greenStripeMat);
    stripe2.position.y = 1.15;
    car.add(stripe2);

    // Curved Roof
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 13.5, 16), roofMat);
    roof.rotation.x = Math.PI / 2;
    roof.position.y = 3.2;
    car.add(roof);

    // 2. Side Windows
    for (const side of [-1.36, 1.36]) {
      for (let wz = -4.5; wz <= 4.5; wz += 2.2) {
        if (Math.abs(wz) < 0.5) continue; // Door locations
        const win = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9), windowMat);
        win.position.set(side, 2.1, wz);
        win.rotation.y = side < 0 ? -Math.PI / 2 : Math.PI / 2;
        car.add(win);
      }
    }

    // 3. Sliding Passenger Doors (2 doors on the platform side: X = -1.36)
    const doorMat = CelShaders.createToonMaterial(0xdcdde1);
    const doorGeo = new THREE.PlaneGeometry(0.7, 1.9);

    for (const dz of [-2.5, 2.5]) {
      const doorL = new THREE.Mesh(doorGeo, doorMat);
      doorL.position.set(-1.37, 1.6, dz - 0.35);
      doorL.rotation.y = -Math.PI / 2;
      car.add(doorL);

      const doorR = new THREE.Mesh(doorGeo, doorMat);
      doorR.position.set(-1.37, 1.6, dz + 0.35);
      doorR.rotation.y = -Math.PI / 2;
      car.add(doorR);

      if (isLead) {
        this.car1Doors.push(doorL, doorR);
      } else {
        this.car2Doors.push(doorL, doorR);
      }
    }

    // 4. Lead Cab Windshield & Headlights
    if (isLead) {
      // Windshield
      const windshield = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), windowMat);
      windshield.position.set(0, 2.3, 6.76);
      car.add(windshield);

      // Bright Warm Headlights (前照灯)
      const headlightMat = CelShaders.createToonMaterial(0xfff9e6, {
        emissive: 0xfff9e6,
        emissiveIntensity: 1.5
      });
      for (const hx of [-0.85, 0.85]) {
        const hl = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), headlightMat);
        hl.position.set(hx, 1.25, 6.76);
        car.add(hl);
      }

      // Roof Pantograph (パンタグラフ)
      const pantoMat = CelShaders.createToonMaterial(0x2f3542);
      const panto = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.2), pantoMat);
      panto.position.set(0, 3.8, -4.5);
      car.add(panto);
    }

    // 5. Interior Passenger Bench Seats & Warm Lighting
    const seatMat = CelShaders.createToonMaterial(0x192a56); // Navy velvet commuter seats
    for (const sz of [-4.0, 0, 4.0]) {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 1.8), seatMat);
      seat.position.set(0.9, 1.1, sz);
      car.add(seat);
    }

    const interiorLight = new THREE.PointLight(0xfff8e7, 1.0, 10, 1.5);
    interiorLight.position.set(0, 2.8, 0);
    car.add(interiorLight);

    return car;
  }

  private updateTrainPosition(u: number): void {
    const uLead = (u % 1.0 + 1.0) % 1.0;
    // Car 2 trails Car 1 by roughly 14.5 meters along track
    const uTrail = ((uLead - 0.052) % 1.0 + 1.0) % 1.0;

    const pos1 = this.trackCurve.getPointAt(uLead);
    const tan1 = this.trackCurve.getTangentAt(uLead).normalize();
    this.car1.position.copy(pos1);
    this.car1.rotation.y = Math.atan2(tan1.x, tan1.z);

    const pos2 = this.trackCurve.getPointAt(uTrail);
    const tan2 = this.trackCurve.getTangentAt(uTrail).normalize();
    this.car2.position.copy(pos2);
    this.car2.rotation.y = Math.atan2(tan2.x, tan2.z);

    this.trainWorldPos.copy(pos1);
  }

  public update(delta: number, crossing: RailwayCrossing): void {
    // Track loop coordinates:
    // Station stop is located around progress u = 0.071
    // Crossing is located around progress u = 0.165

    const stationStopU = 0.071;
    const distToStation = Math.abs(this.trackProgress - stationStopU);

    // Periodic rail click-clack sound when cruising
    if (this.currentState === TrainState.CRUISING && Math.random() < 0.035) {
      audio.playRailClickClack();
    }

    switch (this.currentState) {
      case TrainState.CRUISING:
        this.trackProgress = (this.trackProgress + this.speed * delta * 0.12) % 1.0;

        // Approaching Station check
        if (distToStation < 0.045 && distToStation > 0.005 && this.trackProgress < stationStopU) {
          this.currentState = TrainState.APPROACHING_STATION;
        }

        // Approaching Crossing check (u between 0.11 and 0.22)
        if (this.trackProgress > 0.11 && this.trackProgress < 0.22) {
          crossing.setClosed(true);
        } else {
          crossing.setClosed(false);
        }
        break;

      case TrainState.APPROACHING_STATION:
        // Decelerate smoothly into Sakura Station
        this.trackProgress = THREE.MathUtils.lerp(this.trackProgress, stationStopU, delta * 1.8);
        if (Math.abs(this.trackProgress - stationStopU) < 0.001) {
          this.trackProgress = stationStopU;
          this.currentState = TrainState.STOPPING_AT_STATION;
          this.stationTimer = 0;
        }
        break;

      case TrainState.STOPPING_AT_STATION:
        this.stationTimer += delta;
        if (this.stationTimer > 0.8) {
          this.currentState = TrainState.DOORS_OPEN;
          this.stationTimer = 0;
          audio.playDoorSlide();
        }
        break;

      case TrainState.DOORS_OPEN:
        this.stationTimer += delta;
        this.doorsProgress = THREE.MathUtils.lerp(this.doorsProgress, 1.0, delta * 3.5);

        // Slide doors open
        this.animateDoors(this.doorsProgress);

        // Play departure melody 3 seconds before departure
        if (this.stationTimer > 7.0 && this.stationTimer - delta <= 7.0) {
          audio.playStationMelody();
        }

        // Depart after 11 seconds dwell time
        if (this.stationTimer > 11.5) {
          this.currentState = TrainState.DEPARTING;
          this.stationTimer = 0;
          audio.playDoorSlide();
        }
        break;

      case TrainState.DEPARTING:
        this.stationTimer += delta;
        this.doorsProgress = THREE.MathUtils.lerp(this.doorsProgress, 0.0, delta * 4.0);
        this.animateDoors(this.doorsProgress);

        if (this.doorsProgress < 0.05) {
          this.trackProgress = (this.trackProgress + 0.002) % 1.0;
          this.currentState = TrainState.CRUISING;
        }
        break;
    }

    this.updateTrainPosition(this.trackProgress);
  }

  private animateDoors(progress: number): void {
    // Open offset: 0.32m
    const offset = progress * 0.32;
    for (let i = 0; i < this.car1Doors.length; i += 2) {
      this.car1Doors[i].position.z = -2.5 - 0.35 - offset;
      this.car1Doors[i + 1].position.z = -2.5 + 0.35 + offset;
    }
  }

  public togglePlayerRiding(): boolean {
    this.isPlayerRiding = !this.isPlayerRiding;
    return this.isPlayerRiding;
  }
}
