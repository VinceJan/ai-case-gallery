import * as THREE from 'three';
import { toonMat } from '../core/toonMaterials.js';

/**
 * Full Japanese local railway & level crossing (踏切) system.
 * Tracks run East-West at Z = -12, entering/exiting mountain tunnels at X = ±66.
 * Level crossing sits at X = 0, Z = -12 on the main town avenue.
 */
export class RailwaySystem {
  constructor(scene, collision, audio) {
    this.scene = scene;
    this.collision = collision;
    this.audio = audio;

    this.trackZ = -12.0;
    this.state = 'AWAY'; // AWAY | WARNING | APPROACHING | DOORS_OPEN | DOORS_CLOSING | DEPARTING
    this.timer = 10;     // First train arrives soon after starting so player sees it!
    this.direction = 1;  // +1 = West->East, -1 = East->West
    this.trainX = -78;
    this.trainSpeed = 0;
    this.doorOpen = 0;
    this.crossingClosed = false;
    this.gateAngle = 0;  // 0 = open (up), 1 = closed (horizontal)
    this.flashTimer = 0;
    this.bellTimer = 0;
    this.isDelayed = false;
    this.nextTrainCountdown = 10;

    this.group = new THREE.Group();
    scene.add(this.group);

    this._buildTracksAndTunnels();
    this._buildLevelCrossing();
    this._buildTrain();

    // Dynamic colliders preventing crossing tracks while barriers are down
    this.northGateCollider = collision.addBox(-3.2, 3.2, -13.9, -13.2, { active: false, tag: 'crossing' });
    this.southGateCollider = collision.addBox(-3.2, 3.2, -10.6, -9.9, { active: false, tag: 'crossing' });
    // Fence along tracks outside the level crossing so nobody walks onto tracks
    collision.addBox(-55, -3.25, -13.6, -10.4, { tag: 'trackFence' });
    collision.addBox(3.25, 55, -13.6, -10.4, { tag: 'trackFence' });
  }

  _buildTracksAndTunnels() {
    const ballastMat = toonMat(0x8d8882);
    const tieMat = toonMat(0x5e4736);
    const railMat = toonMat(0x575d66);
    const poleMat = toonMat(0x6e737b);

    // Ballast bed along Z = -12
    const ballast = new THREE.Mesh(new THREE.BoxGeometry(144, 0.14, 3.0), ballastMat);
    ballast.position.set(0, 0.05, this.trackZ);
    ballast.receiveShadow = true;
    this.group.add(ballast);

    // Steel rails
    for (const rz of [-0.62, 0.62]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(144, 0.1, 0.1), railMat);
      rail.position.set(0, 0.17, this.trackZ + rz);
      this.group.add(rail);
    }

    // Wooden sleepers (ties)
    const tieGeo = new THREE.BoxGeometry(0.24, 0.08, 2.05);
    const tieCount = 130;
    const instTies = new THREE.InstancedMesh(tieGeo, tieMat, tieCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < tieCount; i++) {
      dummy.position.set(-65 + i * 1.0, 0.12, this.trackZ);
      dummy.updateMatrix();
      instTies.setMatrixAt(i, dummy.matrix);
    }
    this.group.add(instTies);

    // Overhead catenary poles & single contact wire
    for (let px = -56; px <= 56; px += 14) {
      if (Math.abs(px) < 4) continue;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 5.4, 7), poleMat);
      pole.position.set(px, 2.7, this.trackZ + 1.85);
      pole.castShadow = true;
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 2.2), poleMat);
      arm.position.set(px, 4.9, this.trackZ + 0.85);
      this.group.add(pole, arm);
    }
    const wireGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-68, 4.8, this.trackZ),
      new THREE.Vector3(68, 4.8, this.trackZ),
    ]);
    this.group.add(new THREE.Line(wireGeo, new THREE.LineBasicMaterial({ color: 0x383b44 })));

    // Low concrete railway safety fences (leaving crossing at X in [-3.1, 3.1] open)
    const fenceMat = toonMat(0xcecbc4);
    for (const [cx, w] of [[-29, 51], [29, 51]]) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(w, 0.78, 0.12), fenceMat);
      f.position.set(cx, 0.4, this.trackZ + 1.65);
      this.group.add(f);
    }

    // West & East Mountain Tunnels (X = -62 and X = +62)
    const tunnelStone = toonMat(0x7c7b79);
    const tunnelDark = new THREE.MeshBasicMaterial({ color: 0x161820 });
    const hillMat = toonMat(0x63915c);

    for (const tx of [-62, 62]) {
      const tGroup = new THREE.Group();
      tGroup.position.set(tx, 0, this.trackZ);
      // Tunnel portal wall
      const portal = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.4, 6.2), tunnelStone);
      portal.position.y = 2.7;
      const voidBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.9, 3.5), tunnelDark);
      voidBox.position.y = 1.95;
      // Hillside mound swallowing the tunnel cleanly
      const mound = new THREE.Mesh(new THREE.ConeGeometry(16, 15, 8), hillMat);
      mound.position.set(tx < 0 ? -7.5 : 7.5, 6.8, 0);
      mound.scale.set(1.2, 1, 1.35);
      tGroup.add(portal, voidBox, mound);
      this.group.add(tGroup);
    }
  }

  _buildLevelCrossing() {
    const cg = new THREE.Group();
    this.group.add(cg);

    // Timber/rubber road crossing deck at X in [-3.1, 3.1], Z = -12
    const deck = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.17, 2.9), toonMat(0x7c7975));
    deck.position.set(0, 0.09, this.trackZ);
    deck.receiveShadow = true;
    cg.add(deck);

    // Yellow & black crossing warning posts on North-West and South-East corners
    const yellowMat = toonMat(0xf0c43e);
    const blackMat = toonMat(0x282a30);

    this.crossingLamps = [];
    this.gatePivots = [];

    const posts = [
      { x: -3.25, z: this.trackZ + 1.85, rotY: 0, armDir: 1 },      // South-West post, arm extends +X
      { x: 3.25, z: this.trackZ - 1.85, rotY: Math.PI, armDir: -1 }, // North-East post, arm extends -X
    ];

    posts.forEach((p) => {
      const pg = new THREE.Group();
      pg.position.set(p.x, 0, p.z);
      pg.rotation.y = p.rotY;

      // Striped vertical post
      for (let s = 0; s < 6; s++) {
        const seg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.09, 0.52, 8),
          s % 2 === 0 ? yellowMat : blackMat
        );
        seg.position.y = 0.26 + s * 0.52;
        seg.castShadow = true;
        pg.add(seg);
      }

      // Iconic Japanese X crossbuck (踏切警報機)
      const x1 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.14, 0.06), yellowMat);
      x1.position.set(0, 2.75, 0.1);
      x1.rotation.z = 0.72;
      const x2 = x1.clone();
      x2.rotation.z = -0.72;
      pg.add(x1, x2);

      // Twin alternating red warning lights!
      const lampPair = [];
      for (const lx of [-0.26, 0.26]) {
        const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.16, 10), blackMat);
        housing.rotation.x = Math.PI / 2;
        housing.position.set(lx, 2.22, 0.12);
        const bulbMat = new THREE.MeshStandardMaterial({
          color: 0x551818, emissive: 0xff2222, emissiveIntensity: 0, roughness: 0.3,
        });
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), bulbMat);
        bulb.position.set(lx, 2.22, 0.2);
        pg.add(housing, bulb);
        lampPair.push(bulbMat);
      }
      this.crossingLamps.push(lampPair);

      // Motorized boom gate arm
      const pivot = new THREE.Group();
      pivot.position.set(0.15, 0.98, 0);
      for (let b = 0; b < 8; b++) {
        const seg = new THREE.Mesh(
          new THREE.BoxGeometry(0.75, 0.1, 0.08),
          b % 2 === 0 ? yellowMat : blackMat
        );
        seg.position.set(0.38 + b * 0.75, 0, 0);
        seg.castShadow = true;
        pivot.add(seg);
      }
      pg.add(pivot);
      this.gatePivots.push(pivot);

      cg.add(pg);
    });
  }

  _buildTrain() {
    this.trainGroup = new THREE.Group();
    this.trainGroup.position.set(this.trainX, 0.24, this.trackZ);
    this.group.add(this.trainGroup);

    this.slidingDoors = []; // { mesh, closedX, dir }
    this.trainInteriorMats = [];
    this.headlightMats = [];

    const creamMat = toonMat(0xf7f2e6);
    const sakuraStripe = toonMat(0xe67c98);
    const roofMat = toonMat(0x7c838e);
    const chassisMat = toonMat(0x3a3e47);
    const doorMat = toonMat(0xeae4d8);

    const buildCar = (offsetX) => {
      const car = new THREE.Group();
      car.position.x = offsetX;

      // Underframe & bogies
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.45, 2.35), chassisMat);
      chassis.position.y = 0.42;
      car.add(chassis);

      for (const bx of [-3.4, 3.4]) {
        const bogie = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.35, 1.9), chassisMat);
        bogie.position.set(bx, 0.22, 0);
        car.add(bogie);
      }

      // Main car body
      const body = new THREE.Mesh(new THREE.BoxGeometry(10.8, 2.45, 2.52), creamMat);
      body.position.y = 1.85;
      body.castShadow = true;
      body.receiveShadow = true;
      car.add(body);

      // Signature Sakura Line pink waist stripe
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(10.86, 0.32, 2.56), sakuraStripe);
      stripe.position.y = 1.28;
      car.add(stripe);

      // Roof & AC units
      const roof = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.28, 2.38), roofMat);
      roof.position.y = 3.16;
      roof.castShadow = true;
      car.add(roof);
      for (const ax of [-2.4, 2.4]) {
        const ac = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.24, 1.2), toonMat(0xb8bec7));
        ac.position.set(ax, 3.4, 0);
        car.add(ac);
      }

      // Illuminated windows along both sides
      const winMat = new THREE.MeshStandardMaterial({
        color: 0xdbeeff, emissive: 0xffe4ad, emissiveIntensity: 0.35, roughness: 0.25,
      });
      this.trainInteriorMats.push(winMat);
      for (const wz of [-1.27, 1.27]) {
        for (const wx of [-3.9, 0, 3.9]) {
          const w = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.95, 0.05), winMat);
          w.position.set(wx, 2.1, wz);
          car.add(w);
        }
      }

      // Animated double sliding doors on North side (facing station platform!) & South side
      for (const dz of [-1.29, 1.29]) {
        for (const doorCenterX of [-2.1, 2.1]) {
          const dLeft = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.85, 0.07), doorMat);
          dLeft.position.set(doorCenterX - 0.32, 1.68, dz);
          const dRight = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.85, 0.07), doorMat);
          dRight.position.set(doorCenterX + 0.32, 1.68, dz);
          const dWinL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.72, 0.09), winMat);
          dWinL.position.y = 0.25;
          const dWinR = dWinL.clone();
          dLeft.add(dWinL);
          dRight.add(dWinR);
          car.add(dLeft, dRight);
          this.slidingDoors.push({ mesh: dLeft, closedX: doorCenterX - 0.32, dir: -1 });
          this.slidingDoors.push({ mesh: dRight, closedX: doorCenterX + 0.32, dir: 1 });
        }
      }

      // End cab windshield & headlights
      const endX = offsetX > 0 ? 5.42 : -5.42;
      const cabWin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 1.9), winMat);
      cabWin.position.set(endX, 2.15, 0);
      car.add(cabWin);

      for (const lz of [-0.72, 0.72]) {
        const hlMat = new THREE.MeshStandardMaterial({
          color: 0xfff8dc, emissive: 0xffe699, emissiveIntensity: 0.9,
        });
        const hl = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), hlMat);
        hl.position.set(endX, 1.28, lz);
        car.add(hl);
        this.headlightMats.push(hlMat);
      }

      this.trainGroup.add(car);
    };

    // 2-car commuter consist (total ~22m, fits the 27m Sakura Station platform!)
    buildCar(-5.7);
    buildCar(5.7);
    // Flexible gangway coupler between the two cars
    const coupler = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.2, 1.8), chassisMat);
    coupler.position.set(0, 1.8, 0);
    this.trainGroup.add(coupler);
  }

  triggerDelay(extraSeconds = 18) {
    this.isDelayed = true;
    if (this.state === 'AWAY') {
      this.timer += extraSeconds;
    }
  }

  getStatusText() {
    if (this.state === 'DOORS_OPEN') return '桜駅 停车上下客中';
    if (this.state === 'WARNING' || this.state === 'APPROACHING') return '列车即将进站 · 道口已关闭';
    if (this.state === 'DEPARTING') return '列车正驶离桜駅';
    if (this.isDelayed) return `因春季强风微幅延误 (约 ${Math.ceil(this.timer)} 秒后到达)`;
    return `下一班列车约 ${Math.ceil(this.timer)} 秒后进站`;
  }

  update(dt, playerPos, nightFactor) {
    // 1. State Machine
    if (this.state === 'AWAY') {
      this.timer -= dt;
      this.nextTrainCountdown = Math.max(0, this.timer);
      this.crossingClosed = false;
      this.trainGroup.visible = false;
      if (this.timer <= 0) {
        this.state = 'WARNING';
        this.timer = 5.0; // Crossing alarm rings & distant train rumble BEFORE train emerges!
        this.crossingClosed = true;
        this.direction = Math.random() < 0.5 ? 1 : -1;
        this.trainX = this.direction > 0 ? -74 : 74;
        this.trainSpeed = 16.0;
        this.trainGroup.visible = true;
        this.isDelayed = false;
      }
    } else if (this.state === 'WARNING') {
      this.timer -= dt;
      this.crossingClosed = true;
      if (this.timer <= 0) {
        this.state = 'APPROACHING';
      }
    } else if (this.state === 'APPROACHING') {
      this.crossingClosed = true;
      const stopX = -13.25; // Aligned cleanly with Sakura Station platform!
      const distToStop = Math.abs(this.trainX - stopX);
      // Smooth braking curve into Sakura Station
      const targetSpeed = distToStop < 26 ? Math.max(1.8, (distToStop / 26) * 15.5) : 16.0;
      this.trainSpeed += (targetSpeed - this.trainSpeed) * Math.min(1, dt * 4);
      this.trainX += this.direction * this.trainSpeed * dt;

      if ((this.direction > 0 && this.trainX >= stopX) || (this.direction < 0 && this.trainX <= stopX)) {
        this.trainX = stopX;
        this.trainSpeed = 0;
        this.state = 'DOORS_OPEN';
        this.timer = 8.5;
        if (this.audio) this.audio.playStationChime(playerPos.distanceTo(new THREE.Vector3(stopX, 0, -14)));
      }
    } else if (this.state === 'DOORS_OPEN') {
      this.crossingClosed = true;
      this.doorOpen = Math.min(1, this.doorOpen + dt * 2.2);
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = 'DOORS_CLOSING';
        this.timer = 1.6;
      }
    } else if (this.state === 'DOORS_CLOSING') {
      this.crossingClosed = true;
      this.doorOpen = Math.max(0, this.doorOpen - dt * 1.8);
      this.timer -= dt;
      if (this.timer <= 0) {
        this.doorOpen = 0;
        this.state = 'DEPARTING';
      }
    } else if (this.state === 'DEPARTING') {
      this.trainSpeed = Math.min(17.5, this.trainSpeed + 4.4 * dt);
      this.trainX += this.direction * this.trainSpeed * dt;

      // Once train cleanly clears the level crossing at X = 0, lift gates!
      if ((this.direction > 0 && this.trainX > 16.0) || (this.direction < 0 && this.trainX < -24.5)) {
        this.crossingClosed = false;
      }
      if (Math.abs(this.trainX) > 76) {
        this.state = 'AWAY';
        this.timer = 28 + Math.random() * 14; // Regular pleasant rural interval
      }
    }

    // 2. Apply train position & sliding doors
    this.trainGroup.position.x = this.trainX;
    for (let i = 0; i < this.slidingDoors.length; i++) {
      const d = this.slidingDoors[i];
      d.mesh.position.x = d.closedX + d.dir * this.doorOpen * 0.56;
    }

    // Interior glow brighter at dusk/night
    const winEmissive = 0.25 + nightFactor * 0.85;
    for (const m of this.trainInteriorMats) m.emissiveIntensity = winEmissive;

    // 3. Level Crossing Gate Animation, Flashing Red Lamps & Collider Sync
    const targetGate = this.crossingClosed ? 1 : 0;
    this.gateAngle += (targetGate - this.gateAngle) * Math.min(1, dt * 3.8);
    // When open (gateAngle = 0), arm points up (+PI/2 * 0.88); when closed (1), horizontal (0)
    const armRotZ = (1 - this.gateAngle) * 1.38;
    for (const pivot of this.gatePivots) {
      pivot.rotation.z = armRotZ;
    }
    const blockPedestrians = this.gateAngle > 0.35;
    this.northGateCollider.active = blockPedestrians;
    this.southGateCollider.active = blockPedestrians;

    // Alternating red crossing flashers &カンカンカン bell
    if (this.crossingClosed) {
      this.flashTimer += dt;
      const phase = Math.floor(this.flashTimer * 2.6) % 2;
      for (const [mL, mR] of this.crossingLamps) {
        mL.emissiveIntensity = phase === 0 ? 2.4 : 0.05;
        mR.emissiveIntensity = phase === 1 ? 2.4 : 0.05;
      }

      this.bellTimer -= dt;
      if (this.bellTimer <= 0) {
        this.bellTimer = 0.48;
        const dist = Math.hypot(playerPos.x, playerPos.z - this.trackZ);
        if (this.audio && dist < 44) {
          this.audio.playCrossingBell(dist);
        }
      }
    } else {
      for (const [mL, mR] of this.crossingLamps) {
        mL.emissiveIntensity = 0;
        mR.emissiveIntensity = 0;
      }
    }

    // 4. Spatialized train rumble audio (heard even slightly before emerging from tunnel!)
    if (this.audio) {
      const moving = this.state === 'WARNING' || this.state === 'APPROACHING' || this.state === 'DEPARTING';
      const dist = Math.hypot(playerPos.x - this.trainX, playerPos.z - this.trackZ);
      const intensity = moving ? Math.max(0, 1 - dist / 65) * (this.state === 'WARNING' ? 0.38 : Math.min(1, this.trainSpeed / 12)) : 0;
      this.audio.setTrainRumble(intensity);
    }
  }
}
