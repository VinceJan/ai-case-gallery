// src/vehicles/Train.ts
// Fully functional 2-car Japanese commuter train running on a closed-loop track,
// with station stopping, sliding passenger doors, crossing triggering, and player riding!
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

  // Train Carriages
  public car1: THREE.Group;
  public car2: THREE.Group;
  private car1Doors: THREE.Mesh[] = [];
  private car2Doors: THREE.Mesh[] = [];

  // Track loop parameter (0.0 to 1.0)
  public trackProgress: number = 0.0;
  private speed: number = 0.055; // Normalized speed along loop
  public currentState: TrainState = TrainState.CRUISING;
  private stationTimer: number = 0;
  private doorsProgress: number = 0; // 0 = closed, 1 = open

  // Interaction: Player riding the train
  public isPlayerRiding: boolean = false;
  public trainWorldPos: THREE.Vector3 = new THREE.Vector3();

  // Track points along town
  private trackPoints: THREE.Vector3[] = [
    new THREE.Vector3(-30, 0.2, 25),  // Approaching Sakura Station
    new THREE.Vector3(-10, 0.2, 25),  // Sakura Station Platform Stop
    new THREE.Vector3(12, 0.2, 25),   // Before Crossing
    new THREE.Vector3(25, 0.2, 25),   // Railway Crossing!
    new THREE.Vector3(50, 0.2, 22),   // East curve
    new THREE.Vector3(60, 1.2, -5),   // Approaching River
    new THREE.Vector3(60, 1.2, -39),  // Crossing River Truss Bridge
    new THREE.Vector3(55, 0.5, -60),  // North East turn
    new THREE.Vector3(10, 0.2, -65),  // North country run
    new THREE.Vector3(-35, 0.2, -65), // Behind Shrine Hill
    new THREE.Vector3(-65, 0.2, -45), // North West curve
    new THREE.Vector3(-75, 0.2, -15), // West track run
    new THREE.Vector3(-65, 0.2, 15),  // South West turn back to station
    new THREE.Vector3(-45, 0.2, 25)   // Return to approach
  ];

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    // 1. Create Closed-Loop Track Spline
    this.trackCurve = new THREE.CatmullRomCurve3(this.trackPoints, true, 'catmullrom', 0.2);

    // 2. Render 3D Rails and Sleepers
    this.renderTrackRails();

    // 3. Build 2-Car Japanese EMU Commuter Train
    this.car1 = this.buildTrainCar(true);
    this.car2 = this.buildTrainCar(false);
    this.group.add(this.car1);
    this.group.add(this.car2);

    // Initial positioning
    this.updateTrainPosition(0);
  }

  private renderTrackRails(): void {
    const railMat = CelShaders.createToonMaterial(0xdcdde1);
    const sleeperMat = CelShaders.createToonMaterial(0x4a3728);

    // Sample points along curve to create sleepers and twin steel rails
    const sampleCount = 280;
    const points = this.trackCurve.getSpacedPoints(sampleCount);

    for (let i = 0; i < sampleCount; i++) {
      const p = points[i];
      const tangent = this.trackCurve.getTangentAt(i / sampleCount).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      // Wooden sleeper tie (枕木)
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 0.25), sleeperMat);
      sleeper.position.copy(p);
      sleeper.position.y += 0.05;
      sleeper.rotation.y = Math.atan2(tangent.x, tangent.z) + Math.PI / 2;
      this.group.add(sleeper);
    }

    // Two continuous steel rails
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

    // Car Dimensions: Length 14m, Width 2.8m, Height 3.2m
    const greenMat = CelShaders.createToonMaterial(0x27ae60); // Classic Enoden / Yamanote retro green
    const creamMat = CelShaders.createToonMaterial(0xfef9e7); // Warm cream stripe
    const roofMat = CelShaders.createToonMaterial(0x95a5a6);  // Silver/grey roof
    const windowMat = new THREE.MeshBasicMaterial({ color: 0x34495e });
    const bogieMat = CelShaders.createToonMaterial(0x2c3e50); // Dark steel wheels

    // Lower green body
    const bodyLower = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 13.8), greenMat);
    bodyLower.position.y = 1.3;
    bodyLower.castShadow = true;
    car.add(bodyLower);

    // Cream window band
    const bodyMid = new THREE.Mesh(new THREE.BoxGeometry(2.82, 1.1, 13.8), creamMat);
    bodyMid.position.y = 2.45;
    car.add(bodyMid);

    // Upper green stripe
    const bodyUpper = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.35, 13.8), greenMat);
    bodyUpper.position.y = 3.15;
    car.add(bodyUpper);

    // Curved silver roof
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 13.8, 12, 1, false, 0, Math.PI), roofMat);
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 3.3;
    car.add(roof);

    // Passenger windows along both flanks
    for (let wz = -4.5; wz <= 4.5; wz += 2.2) {
      if (Math.abs(wz) < 1.0) continue; // Door opening in center
      // Left window
      const winL = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.75), windowMat);
      winL.rotation.y = -Math.PI / 2;
      winL.position.set(-1.42, 2.45, wz);
      car.add(winL);

      // Right window
      const winR = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.75), windowMat);
      winR.rotation.y = Math.PI / 2;
      winR.position.set(1.42, 2.45, wz);
      car.add(winR);
    }

    // Sliding Passenger Doors in the center (-X side faces platform at station)
    const doorLeafMat = CelShaders.createToonMaterial(0xdcdde1);
    const door1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 0.75), doorLeafMat);
    door1.position.set(-1.42, 1.8, -0.4);
    car.add(door1);

    const door2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 0.75), doorLeafMat);
    door2.position.set(-1.42, 1.8, 0.4);
    car.add(door2);

    if (isLead) {
      this.car1Doors.push(door1, door2);
    } else {
      this.car2Doors.push(door1, door2);
    }

    // Wheel Bogies (Front and Rear trucks)
    for (const bz of [-4.5, 4.5]) {
      const bogie = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 2.2), bogieMat);
      bogie.position.set(0, 0.45, bz);
      car.add(bogie);

      // 4 Steel Wheels per bogie
      for (const wx of [-1.1, 1.1]) {
        for (const wz of [-0.6, 0.6]) {
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 16), CelShaders.createToonMaterial(0x718093));
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(wx, 0.42, bz + wz);
          car.add(wheel);
        }
      }
    }

    // If Lead Car: Add driver cabin windshield, headlights, destination sign, and roof pantograph!
    if (isLead) {
      // Windshield at front (Z = 6.9)
      const frontGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), windowMat);
      frontGlass.position.set(0, 2.5, 6.92);
      car.add(frontGlass);

      // Destination display board: "さくら町行"
      const destCanvas = document.createElement('canvas');
      destCanvas.width = 256;
      destCanvas.height = 64;
      const dctx = destCanvas.getContext('2d')!;
      dctx.fillStyle = '#111';
      dctx.fillRect(0, 0, 256, 64);
      dctx.fillStyle = '#ff9f43'; // Amber LED display
      dctx.font = 'bold 36px "Hiragino Sans", "Meiryo", sans-serif';
      dctx.textAlign = 'center';
      dctx.textBaseline = 'middle';
      dctx.fillText('さくら町行', 128, 32);
      const destTex = new THREE.CanvasTexture(destCanvas);
      const destMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), new THREE.MeshBasicMaterial({ map: destTex }));
      destMesh.position.set(0, 3.2, 6.92);
      car.add(destMesh);

      // Twin Headlights
      for (const hx of [-0.7, 0.7]) {
        const hLightMesh = new THREE.Mesh(new THREE.CircleGeometry(0.16, 12), new THREE.MeshBasicMaterial({ color: 0xfffaed }));
        hLightMesh.position.set(hx, 1.5, 6.92);
        car.add(hLightMesh);
      }

      // Diamond Pantograph on roof (Z = -3.5)
      const pantoMat = CelShaders.createToonMaterial(0xe74c3c); // Japanese red pantograph frame
      const panto = new THREE.Group();
      panto.position.set(0, 3.8, -3.5);

      const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), pantoMat);
      arm1.rotation.x = Math.PI / 4;
      arm1.position.set(0, 0.3, 0.25);
      panto.add(arm1);

      const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), pantoMat);
      arm2.rotation.x = -Math.PI / 4;
      arm2.position.set(0, 0.3, -0.25);
      panto.add(arm2);

      const collector = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 0.2), CelShaders.createToonMaterial(0x34495e));
      collector.position.y = 0.65;
      panto.add(collector);

      car.add(panto);
    }

    return car;
  }

  public updateTrainPosition(progress: number): void {
    const p1 = (progress + 1.0) % 1.0;
    const pos1 = this.trackCurve.getPointAt(p1);
    const tan1 = this.trackCurve.getTangentAt(p1).normalize();

    this.car1.position.copy(pos1);
    this.car1.rotation.y = Math.atan2(tan1.x, tan1.z);

    // Car 2 trails behind Car 1 by approx 14.5 meters
    const carOffsetProgress = 0.038;
    const p2 = (progress - carOffsetProgress + 1.0) % 1.0;
    const pos2 = this.trackCurve.getPointAt(p2);
    const tan2 = this.trackCurve.getTangentAt(p2).normalize();

    this.car2.position.copy(pos2);
    this.car2.rotation.y = Math.atan2(tan2.x, tan2.z);

    this.trainWorldPos.copy(pos1);
  }

  public update(delta: number, crossing: RailwayCrossing, playerPos: THREE.Vector3): void {
    // Station stop progress on curve: approx at progress ~ 0.068 (X = -10, Z = 25)
    const stationStopProgress = 0.07;
    const crossingProgress = 0.21; // X = 25, Z = 25

    // State machine
    switch (this.currentState) {
      case TrainState.CRUISING: {
        this.trackProgress = (this.trackProgress + delta * (this.speed / 10.0)) % 1.0;

        // Check if approaching station (progress between 0.02 and 0.068)
        if (this.trackProgress >= 0.02 && this.trackProgress < stationStopProgress) {
          this.currentState = TrainState.APPROACHING_STATION;
        }
        break;
      }

      case TrainState.APPROACHING_STATION: {
        // Slow down smoothly into station
        const remaining = stationStopProgress - this.trackProgress;
        const currentSpeed = Math.max(0.005, (remaining / 0.05) * (this.speed / 10.0));
        this.trackProgress += delta * currentSpeed;

        if (this.trackProgress >= stationStopProgress) {
          this.trackProgress = stationStopProgress;
          this.currentState = TrainState.STOPPING_AT_STATION;
          this.stationTimer = 0;
          audio.playTrainDepartureMelody();
        }
        break;
      }

      case TrainState.STOPPING_AT_STATION: {
        this.stationTimer += delta;
        // Slide open doors
        if (this.doorsProgress < 1.0) {
          this.doorsProgress = Math.min(1.0, this.doorsProgress + delta * 2.0);
        }

        // Wait at platform for 8 seconds
        if (this.stationTimer >= 8.0) {
          this.currentState = TrainState.DOORS_OPEN;
          this.stationTimer = 0;
          audio.playTrainHorn();
        }
        break;
      }

      case TrainState.DOORS_OPEN: {
        this.stationTimer += delta;
        // Slide shut doors
        if (this.doorsProgress > 0.0) {
          this.doorsProgress = Math.max(0.0, this.doorsProgress - delta * 2.0);
        }

        if (this.stationTimer >= 2.0 && this.doorsProgress <= 0.0) {
          this.currentState = TrainState.DEPARTING;
          this.stationTimer = 0;
        }
        break;
      }

      case TrainState.DEPARTING: {
        // Accelerate out of station
        this.trackProgress += delta * (this.speed / 14.0);
        if (this.trackProgress > 0.10) {
          this.currentState = TrainState.CRUISING;
        }
        break;
      }
    }

    // Animate passenger door sliding
    for (const d of [...this.car1Doors, ...this.car2Doors]) {
      // Leaf 1 slides -Z, Leaf 2 slides +Z
      if (d === this.car1Doors[0] || d === this.car2Doors[0]) {
        d.position.z = -0.4 - this.doorsProgress * 0.45;
      } else {
        d.position.z = 0.4 + this.doorsProgress * 0.45;
      }
    }

    // Check Railway Crossing logic
    // Crossing is at X = 25, Z = 25 (progress around 0.16 to 0.28)
    const distToCrossing = this.car1.position.distanceTo(crossing.crossingPosition);
    if (distToCrossing < 45.0) {
      crossing.setClosed(true);
    } else {
      crossing.setClosed(false);
    }

    // Wheel track clatter audio
    const distToPlayer = this.trainWorldPos.distanceTo(playerPos);
    if (distToPlayer < 75.0 && this.currentState !== TrainState.STOPPING_AT_STATION) {
      if (Math.random() < 0.05) {
        audio.playTrainTrackClack(1.0, distToPlayer / 75.0);
      }
    }

    this.updateTrainPosition(this.trackProgress);
  }

  public isBoardable(playerPos: THREE.Vector3): boolean {
    const distToCar1 = this.car1.position.distanceTo(playerPos);
    return distToCar1 < 3.2 && this.doorsProgress > 0.6;
  }
}
