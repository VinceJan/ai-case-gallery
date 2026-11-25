import * as THREE from 'three';
import {
  createToonMaterial,
  createWoodTexture,
  createSignTexture,
  createCrossingStripeTexture,
} from '../art/ToonMaterials.js';
import { createBench } from '../art/PropBuilders.js';

export class RailwaySystem {
  constructor(scene, collision) {
    this.scene = scene;
    this.collision = collision;

    this.trackZ = -18.0;
    this.stationX = -18.5;
    this.crossingX = 0.0;

    this.trainGroup = null;
    this.trainDoors = [];
    this.trainX = -132;
    this.trainSpeed = 0;
    this.direction = 1;
    this.state = 'IDLE';
    this.stateTimer = 12;
    this.doorOpenProgress = 0;
    this._clackTimer = 0;

    this.gateArms = [];
    this.gateAngle = 0;
    this.gatesClosed = false;
    this.crossingLamps = [];
    this.arrowLeftMats = [];
    this.arrowRightMats = [];
    this._flashTimer = 0;
    this._bellTimer = 0;

    this.benches = [];
    this.landmarks = {};
  }

  build() {
    this._buildTracksAndTunnels();
    this._buildRailwayBridge();
    this._buildSakuraStation();
    this._buildFumikiriCrossing();
    this._buildCommuterTrain();
  }

  _buildTracksAndTunnels() {
    const z = this.trackZ;
    const ballast = new THREE.Mesh(new THREE.BoxGeometry(250, 0.24, 3.8), createToonMaterial(0x9d9990));
    ballast.position.set(0, 0.08, z);
    ballast.receiveShadow = true;
    this.scene.add(ballast);

    const sleeperCount = 240;
    const sleepers = new THREE.InstancedMesh(new THREE.BoxGeometry(0.28, 0.12, 2.4), createToonMaterial(0x634937), sleeperCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < sleeperCount; i++) {
      dummy.position.set(-120 + i, 0.22, z);
      dummy.updateMatrix();
      sleepers.setMatrixAt(i, dummy.matrix);
    }
    sleepers.receiveShadow = true;
    this.scene.add(sleepers);

    const railMat = createToonMaterial(0xc0c6ce);
    for (const rz of [z - 0.65, z + 0.65]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(252, 0.14, 0.11), railMat);
      rail.position.set(0, 0.32, rz);
      this.scene.add(rail);
    }

    const mastMat = createToonMaterial(0x6b747d);
    for (let x = -60; x <= 60; x += 18) {
      if (Math.abs(x - this.crossingX) < 5 || Math.abs(x - 29) < 8) continue;
      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.8, 0.18), mastMat);
      mast.position.set(x, 2.9, z - 2.25);
      mast.castShadow = true;
      this.scene.add(mast);

      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 2.4), mastMat);
      bracket.position.set(x, 5.2, z - 1.15);
      this.scene.add(bracket);
    }

    const wire = new THREE.Mesh(new THREE.BoxGeometry(240, 0.04, 0.04), createToonMaterial(0x2e3138));
    wire.position.set(0, 5.12, z);
    this.scene.add(wire);

    const stoneMat = createToonMaterial(0x7c7a74);
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x14151c });
    for (const tx of [-96, 96]) {
      const portal = new THREE.Group();
      portal.position.set(tx, 0, z);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 6.2, 8.2), stoneMat);
      wall.position.y = 3.1;
      portal.add(wall);
      const hole = new THREE.Mesh(new THREE.BoxGeometry(2.8, 4.4, 4.2), darkMat);
      hole.position.y = 2.2;
      portal.add(hole);
      this.scene.add(portal);
    }

    this.collision.addBox(-60, z - 1.65, -3.1, z + 1.65);
    this.collision.addBox(3.1, z - 1.65, 60, z + 1.65);
  }

  _buildRailwayBridge() {
    const group = new THREE.Group();
    const redSteel = createToonMaterial(0xc8453a);
    const concrete = createToonMaterial(0xaba79d);
    const z = this.trackZ;

    for (const px of [23.2, 34.8]) {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.2, 4.0), concrete);
      pier.position.set(px, -1.2, z);
      group.add(pier);
    }

    for (const side of [-1, 1]) {
      const gz = z + side * 1.85;
      const bottomChord = new THREE.Mesh(new THREE.BoxGeometry(17.5, 0.26, 0.24), redSteel);
      bottomChord.position.set(29, 0.35, gz);
      group.add(bottomChord);
      const topChord = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.24, 0.24), redSteel);
      topChord.position.set(29, 3.6, gz);
      group.add(topChord);
      for (let i = 0; i < 6; i++) {
        const strut = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.6, 0.2), redSteel);
        strut.position.set(21.8 + i * 2.88, 1.98, gz);
        strut.rotation.z = i % 2 === 0 ? -0.35 : 0.35;
        strut.castShadow = true;
        group.add(strut);
      }
    }
    for (let x = 23; x <= 35; x += 3) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 3.9), redSteel);
      brace.position.set(x, 3.6, z);
      group.add(brace);
    }
    this.scene.add(group);
  }

  _buildSakuraStation() {
    const cx = this.stationX;
    const cz = -22.2;
    const platW = 16.0;
    const platD = 4.4;
    const platH = 0.65;

    const group = new THREE.Group();
    const woodMat = createToonMaterial(0xffffff, { map: createWoodTexture('#966844', '#754e30', 2, 1) });

    const deck = new THREE.Mesh(new THREE.BoxGeometry(platW, platH, platD), createToonMaterial(0xc8c4b8));
    deck.position.set(cx, platH / 2, cz);
    deck.receiveShadow = true;
    deck.castShadow = true;
    group.add(deck);

    const yellowLine = new THREE.Mesh(new THREE.BoxGeometry(platW - 1.2, 0.03, 0.28), createToonMaterial(0xf2cb3e));
    yellowLine.position.set(cx - 0.3, platH + 0.015, cz + platD / 2 - 0.45);
    group.add(yellowLine);

    for (const px of [cx - 4.2, cx, cx + 4.2]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.8, 0.18), woodMat);
      post.position.set(px, platH + 1.4, cz - 1.1);
      post.castShadow = true;
      group.add(post);
    }
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.18, 3.2), createToonMaterial(0x4a6c5d));
    canopy.position.set(cx, platH + 2.85, cz - 0.4);
    canopy.rotation.x = 0.12;
    canopy.castShadow = true;
    group.add(canopy);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(9.6, 2.2, 0.14), woodMat);
    backWall.position.set(cx, platH + 1.1, cz - 1.85);
    group.add(backWall);

    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 1.05, 0.1),
      createToonMaterial(0xffffff, { map: createSignTexture('さくら · 樱花', '◀ 山口     河原 ▶', '#fffdf8', '#22352c', '#3d8f5d') })
    );
    sign.position.set(cx + 5.6, platH + 1.75, cz - 1.3);
    group.add(sign);
    for (const sx of [-1.0, 1.0]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 6), createToonMaterial(0x4b535c));
      leg.position.set(cx + 5.6 + sx, platH + 0.9, cz - 1.3);
      group.add(leg);
    }

    const bench = createBench();
    bench.position.set(cx - 1.6, platH, cz - 1.35);
    group.add(bench);
    this.benches.push({
      id: 'bench_station', label: '坐在樱花站月台等电车', x: cx - 1.6, y: platH, z: cz - 1.35,
      sitPos: new THREE.Vector3(cx - 1.6, platH + 0.48, cz - 1.22), facingYaw: 0,
    });

    const icPost = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.15, 0.45), createToonMaterial(0x467a9e));
    icPost.position.set(cx + 6.4, platH + 0.58, cz + 0.6);
    group.add(icPost);
    this.landmarks.stationTimetable = new THREE.Vector3(cx + 6.4, platH, cz + 0.6);

    this.collision.addBox(cx - platW / 2 - 0.3, cz - platD / 2 - 0.2, cx + platW / 2, cz - platD / 2 + 0.25);
    this.collision.addBox(cx - platW / 2 - 0.3, cz - platD / 2, cx - platW / 2 + 0.2, cz + platD / 2);
    this.scene.add(group);
  }

  _buildFumikiriCrossing() {
    const cx = this.crossingX;
    const cz = this.trackZ;

    const deck = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.3, 3.6), createToonMaterial(0x5b6068));
    deck.position.set(cx, 0.14, cz);
    deck.receiveShadow = true;
    this.scene.add(deck);

    const stripeMat = createToonMaterial(0xffffff, { map: createCrossingStripeTexture() });
    const darkMat = createToonMaterial(0x282a30);

    for (const spec of [{ x: cx + 3.2, z: cz + 2.55, armDir: -1 }, { x: cx - 3.2, z: cz - 2.55, armDir: 1 }]) {
      const postGroup = new THREE.Group();
      postGroup.position.set(spec.x, 0, spec.z);

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 4.1, 8), stripeMat);
      mast.position.y = 2.05;
      mast.castShadow = true;
      postGroup.add(mast);

      for (const rot of [0.75, -0.75]) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.18, 0.08), stripeMat);
        blade.position.set(0, 3.55, spec.armDir < 0 ? 0.12 : -0.12);
        blade.rotation.z = rot;
        postGroup.add(blade);
      }

      const lampZ = spec.armDir < 0 ? 0.16 : -0.16;
      for (const lx of [-0.34, 0.34]) {
        const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.16, 10), darkMat);
        housing.rotation.x = Math.PI / 2;
        housing.position.set(lx, 2.55, lampZ);
        postGroup.add(housing);

        const bulbMat = new THREE.MeshBasicMaterial({ color: 0x551818 });
        const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.14, 10), bulbMat);
        bulb.position.set(lx, 2.55, lampZ + (spec.armDir < 0 ? 0.09 : -0.09));
        if (spec.armDir > 0) bulb.rotation.y = Math.PI;
        postGroup.add(bulb);
        this.crossingLamps.push({ mat: bulbMat, side: lx < 0 ? 0 : 1 });
      }

      const dirBox = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.32, 0.18), darkMat);
      dirBox.position.set(0, 3.02, lampZ);
      postGroup.add(dirBox);

      const leftMat = new THREE.MeshBasicMaterial({ color: 0x3b2a14 });
      const rightMat = new THREE.MeshBasicMaterial({ color: 0x3b2a14 });
      const arrowGeo = new THREE.ConeGeometry(0.11, 0.24, 3);
      const arrowL = new THREE.Mesh(arrowGeo, leftMat);
      arrowL.rotation.z = Math.PI / 2;
      arrowL.position.set(-0.24, 3.02, lampZ + (spec.armDir < 0 ? 0.1 : -0.1));
      postGroup.add(arrowL);
      const arrowR = new THREE.Mesh(arrowGeo, rightMat);
      arrowR.rotation.z = -Math.PI / 2;
      arrowR.position.set(0.24, 3.02, lampZ + (spec.armDir < 0 ? 0.1 : -0.1));
      postGroup.add(arrowR);
      this.arrowLeftMats.push(leftMat);
      this.arrowRightMats.push(rightMat);

      const motorBox = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 0.45), createToonMaterial(0xe6c347));
      motorBox.position.set(0, 1.0, 0);
      postGroup.add(motorBox);

      const armPivot = new THREE.Group();
      armPivot.position.set(0, 1.05, 0);
      const armMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 5.4, 7), stripeMat);
      armMesh.position.y = 2.7;
      armPivot.add(armMesh);
      postGroup.add(armPivot);
      this.gateArms.push({ pivot: armPivot, dir: spec.armDir });

      this.scene.add(postGroup);
      this.collision.addCircle(spec.x, spec.z, 0.35);
    }

    this.collision.addBox(cx - 3.0, cz + 2.25, cx + 3.0, cz + 2.85, 'crossing_gate');
    this.collision.addBox(cx - 3.0, cz - 2.85, cx + 3.0, cz - 2.25, 'crossing_gate');
    this.collision.setActiveById('crossing_gate', false);
  }

  _buildCommuterTrain() {
    this.trainGroup = new THREE.Group();
    this.trainGroup.position.set(this.trainX, 0.42, this.trackZ);

    const creamMat = createToonMaterial(0xfbf6e8);
    const mintMat = createToonMaterial(0x4c9a76);
    const roofMat = createToonMaterial(0x7c858e);
    const darkMat = createToonMaterial(0x32363d);
    const winMat = createToonMaterial(0xd6eefc, { emissive: 0xffe4a8, emissiveIntensity: 0.35 });
    this.trainWinMat = winMat;

    const carLen = 11.4;
    const carGap = 0.6;
    for (const offsetX of [-(carLen / 2 + carGap / 2), +(carLen / 2 + carGap / 2)]) {
      const car = new THREE.Group();
      car.position.x = offsetX;

      const bogie = new THREE.Mesh(new THREE.BoxGeometry(carLen - 0.6, 0.55, 2.3), darkMat);
      bogie.position.y = 0.32;
      car.add(bogie);
      const lower = new THREE.Mesh(new THREE.BoxGeometry(carLen, 1.05, 2.65), mintMat);
      lower.position.y = 1.08;
      lower.castShadow = true;
      car.add(lower);
      const upper = new THREE.Mesh(new THREE.BoxGeometry(carLen, 1.45, 2.62), creamMat);
      upper.position.y = 2.32;
      upper.castShadow = true;
      car.add(upper);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(carLen - 0.15, 0.35, 2.45), roofMat);
      roof.position.y = 3.18;
      car.add(roof);
      const ac = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.28, 1.4), createToonMaterial(0xc8ced4));
      ac.position.y = 3.45;
      car.add(ac);

      for (const side of [-1, 1]) {
        for (const wx of [-3.8, -1.6, 1.6, 3.8]) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.95, 0.08), winMat);
          win.position.set(wx, 2.25, side * 1.32);
          car.add(win);
        }
        for (const dSide of [-1, 1]) {
          const door = new THREE.Mesh(new THREE.BoxGeometry(0.66, 1.95, 0.1), createToonMaterial(0x3f8564));
          const closedX = dSide * 0.34;
          door.position.set(closedX, 1.62, side * 1.33);
          car.add(door);
          this.trainDoors.push({ mesh: door, closedX, openX: closedX + dSide * 0.55 });
        }
      }
      if (offsetX < 0) {
        const panto = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.15, 1.1), darkMat);
        panto.position.set(0, 4.05, 0);
        car.add(panto);
      }
      this.trainGroup.add(car);
    }

    const hlMat = new THREE.MeshBasicMaterial({ color: 0xfff5c0 });
    for (const endX of [-(carLen + carGap / 2 + 0.05), +(carLen + carGap / 2 + 0.05)]) {
      const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 2.0), winMat);
      windshield.position.set(endX, 2.35, 0);
      this.trainGroup.add(windshield);
      for (const hz of [-0.72, 0.72]) {
        const hl = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), hlMat);
        hl.position.set(endX, 1.18, hz);
        this.trainGroup.add(hl);
      }
    }

    const gangway = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 1.8), darkMat);
    gangway.position.set(0, 1.75, 0);
    this.trainGroup.add(gangway);
    this.scene.add(this.trainGroup);
  }

  getStatus() {
    return {
      state: this.state,
      trainX: this.trainX,
      direction: this.direction,
      gatesClosed: this.gatesClosed,
      nextArrivalSec: this.state === 'IDLE' ? Math.ceil(this.stateTimer) : 0,
      isVisibleInTown: Math.abs(this.trainX) < 65,
    };
  }

  update(dt, playerPos, nightFactor, audio) {
    const distCrossing = Math.hypot(playerPos.x - this.crossingX, playerPos.z - this.trackZ);
    const distTrain = Math.hypot(playerPos.x - this.trainX, playerPos.z - this.trackZ);
    const crossingAtten = Math.max(0, 1 - distCrossing / 52);
    const trainAtten = Math.max(0, 1 - distTrain / 58);

    if (this.trainWinMat) this.trainWinMat.emissiveIntensity = 0.22 + nightFactor * 1.1;

    const maxSpeed = 16.5;
    if (this.state === 'IDLE') {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) {
        this.state = 'APPROACHING';
        this.trainX = this.direction > 0 ? -125 : 125;
        this.trainSpeed = maxSpeed;
        if (audio) audio.playTrainHorn(Math.max(0.3, trainAtten));
      }
    } else if (this.state === 'APPROACHING') {
      const distToStation = (this.stationX - this.trainX) * this.direction;
      if (distToStation > 0) {
        this.trainSpeed = Math.min(maxSpeed, Math.max(1.8, distToStation * 0.62));
        this.trainX += this.direction * this.trainSpeed * dt;
        if (distToStation <= 0.35) {
          this.trainX = this.stationX;
          this.trainSpeed = 0;
          this.state = 'BOARDING';
          this.stateTimer = 7.5;
          if (audio) audio.playStationChime(Math.max(0.25, trainAtten));
        }
      } else {
        this.state = 'DEPARTING';
      }
    } else if (this.state === 'BOARDING') {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) {
        this.state = 'DEPARTING';
        if (audio) audio.playTrainHorn(Math.max(0.25, trainAtten));
      }
    } else if (this.state === 'DEPARTING') {
      this.trainSpeed = Math.min(maxSpeed, this.trainSpeed + dt * 6.2);
      this.trainX += this.direction * this.trainSpeed * dt;
      if (Math.abs(this.trainX) > 130) {
        this.state = 'IDLE';
        this.trainSpeed = 0;
        this.direction *= -1;
        this.stateTimer = 55;
      }
    }

    this.trainGroup.position.x = this.trainX;
    const targetDoor = this.state === 'BOARDING' && this.stateTimer > 1.0 ? 1 : 0;
    this.doorOpenProgress += (targetDoor - this.doorOpenProgress) * Math.min(1, dt * 5);
    for (const d of this.trainDoors) {
      d.mesh.position.x = THREE.MathUtils.lerp(d.closedX, d.openX, this.doorOpenProgress);
    }

    if (this.trainSpeed > 2.5 && Math.abs(this.trainX) < 85) {
      this._clackTimer -= dt * (this.trainSpeed / 12);
      if (this._clackTimer <= 0) {
        this._clackTimer = 0.55;
        if (audio) audio.playTrainClack(trainAtten);
      }
    }

    let warningActive = false;
    if (this.state !== 'IDLE') {
      const relX = this.trainX - this.crossingX;
      warningActive = this.direction > 0 ? (relX > -34 && relX < 26) : (relX < 52 && relX > -17);
    }

    this.gatesClosed = warningActive;
    this.collision.setActiveById('crossing_gate', warningActive);

    const targetGate = warningActive ? Math.PI / 2 : 0;
    this.gateAngle += (targetGate - this.gateAngle) * Math.min(1, dt * 4.5);
    for (const g of this.gateArms) {
      g.pivot.rotation.z = g.dir < 0 ? this.gateAngle : -this.gateAngle;
    }

    if (warningActive) {
      this._flashTimer += dt;
      const phase = Math.floor(this._flashTimer * 2.4) % 2;
      for (const lamp of this.crossingLamps) lamp.mat.color.setHex(lamp.side === phase ? 0xff3b3b : 0x551818);
      for (const m of this.arrowRightMats) m.color.setHex(this.direction > 0 ? 0xffb833 : 0x3b2a14);
      for (const m of this.arrowLeftMats) m.color.setHex(this.direction < 0 ? 0xffb833 : 0x3b2a14);

      this._bellTimer -= dt;
      if (this._bellTimer <= 0) {
        this._bellTimer = 0.44;
        if (audio) audio.playFumikiriBell(crossingAtten);
      }
    } else {
      for (const lamp of this.crossingLamps) lamp.mat.color.setHex(0x451818);
      for (const m of this.arrowRightMats) m.color.setHex(0x3b2a14);
      for (const m of this.arrowLeftMats) m.color.setHex(0x3b2a14);
      this._bellTimer = 0;
    }
  }
}
