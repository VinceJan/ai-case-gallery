/**
 * Player controller: walk/run on the curved planet surface,
 * camera follow, interaction, sitting, inventory use.
 */
import * as THREE from 'three';
import {
  surfacePoint,
  surfaceNormal,
  surfaceForward,
  surfaceRight,
  placeOnPlanet,
} from '../world/Planet.js';
import { toonMaterial } from '../utils/materials.js';
import { bus } from '../core/EventBus.js';

const WALK_SPEED = 4.2;
const RUN_SPEED = 8.0;
const CAMERA_DIST = 8.5;
const CAMERA_HEIGHT = 3.6;

export class Player {
  constructor(camera) {
    this.camera = camera;
    this.group = new THREE.Group();
    this.group.name = 'player';

    // layout-space position (the source of truth) — open plaza south of station
    this.x = 0;
    this.z = -12;
    this.yaw = Math.PI;
    this.height = 0;
    this.velocity = new THREE.Vector2(0, 0);
    this.moving = false;
    this.running = false;
    this.sitting = false;
    this.seatRef = null;
    this.inBuilding = null; // building id when indoors

    this.camYaw = Math.PI;
    this.camPitch = 0.35;
    this.camDist = CAMERA_DIST;

    this.input = {
      forward: 0,
      right: 0,
      run: false,
      interact: false,
      sit: false,
    };

    this.buildBody();
    this.syncTransform();
  }

  buildBody() {
    const bodyMat = toonMaterial('#3a5a8a');
    const skin = toonMaterial('#f0c8a0');
    const hair = toonMaterial('#2a2020');
    const pants = toonMaterial('#2a3040');

    // torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.72, 0.32), bodyMat);
    torso.position.y = 1.15;
    this.group.add(torso);

    // head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.4, 0.36), skin);
    head.position.y = 1.72;
    this.group.add(head);

    // hair
    const hairMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.4), hair);
    hairMesh.position.y = 1.88;
    this.group.add(hairMesh);
    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.35, 0.12), hair);
    hairBack.position.set(0, 1.68, -0.16);
    this.group.add(hairBack);

    // arms
    for (const side of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.62, 0.18), bodyMat);
      arm.position.set(side * 0.4, 1.18, 0);
      arm.name = side < 0 ? 'armL' : 'armR';
      this.group.add(arm);
      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), skin);
      hand.position.set(side * 0.4, 0.82, 0);
      this.group.add(hand);
    }

    // legs
    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 0.22), pants);
      leg.position.set(side * 0.16, 0.48, 0);
      leg.name = side < 0 ? 'legL' : 'legR';
      this.group.add(leg);
    }

    // small backpack
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.16), toonMaterial('#5a7a5a'));
    pack.position.set(0, 1.25, -0.24);
    this.group.add(pack);
  }

  setInput(input) {
    Object.assign(this.input, input);
  }

  serialize() {
    return {
      x: this.x,
      z: this.z,
      yaw: this.yaw,
      camYaw: this.camYaw,
      sitting: this.sitting,
      inBuilding: this.inBuilding,
    };
  }

  restore(data) {
    if (!data) return;
    this.x = data.x ?? this.x;
    this.z = data.z ?? this.z;
    this.yaw = data.yaw ?? this.yaw;
    this.camYaw = data.camYaw ?? this.camYaw;
    this.sitting = !!data.sitting;
    this.inBuilding = data.inBuilding || null;
    this.syncTransform();
  }

  syncTransform() {
    placeOnPlanet(this.group, this.x, this.z, this.sitting ? 0.25 : 0, this.yaw);
  }

  update(dt, world) {
    if (this.sitting) {
      this.syncTransform();
      this.updateCamera(dt);
      return;
    }

    let ix = this.input.right;
    let iz = this.input.forward;
    const len = Math.hypot(ix, iz);
    if (len > 1) {
      ix /= len;
      iz /= len;
    }

    this.running = this.input.run && len > 0.1;
    const speed = this.running ? RUN_SPEED : WALK_SPEED;

    // camera-relative movement on surface
    const fwd = surfaceForward(this.x, this.z, this.camYaw);
    const right = surfaceRight(this.x, this.z, this.camYaw);

    // project to layout space (near pole, XZ ≈ tangent plane)
    let moveX = right.x * ix + fwd.x * iz;
    let moveZ = right.z * ix + fwd.z * iz;
    const ml = Math.hypot(moveX, moveZ);
    if (ml > 1e-5) {
      moveX /= ml;
      moveZ /= ml;
    }

    const targetVX = moveX * speed;
    const targetVZ = moveZ * speed;
    const accel = 12;
    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, targetVX, 1 - Math.exp(-accel * dt));
    this.velocity.y = THREE.MathUtils.lerp(this.velocity.y, targetVZ, 1 - Math.exp(-accel * dt));

    const nx = this.x + this.velocity.x * dt;
    const nz = this.z + this.velocity.y * dt;

    // Building collision: slide along walls; escape if already stuck inside
    let blocked = false;
    const radius = 0.55;
    const colliders = world?.buildingColliders || [];

    // If already inside a wall, push out first
    for (const c of colliders) {
      if (c.doorGap && this._inDoorGap(c, this.x, this.z, radius)) continue;
      if (this._inside(c, this.x, this.z, radius)) {
        this._pushOut(c, radius);
      }
    }

    if (colliders.length) {
      // try full move
      if (!this._hitsAny(colliders, nx, nz, radius)) {
        this.x = nx;
        this.z = nz;
      } else if (!this._hitsAny(colliders, nx, this.z, radius)) {
        this.x = nx;
      } else if (!this._hitsAny(colliders, this.x, nz, radius)) {
        this.z = nz;
      } else {
        blocked = true;
      }
    } else {
      this.x = nx;
      this.z = nz;
    }

    // soft world bounds — stay on the town cap (gentle pull back)
    const bound = 95;
    if (blocked) {
      this.velocity.multiplyScalar(0.3);
    }

    const distFromCenter = Math.hypot(this.x, this.z);
    if (distFromCenter > bound) {
      const pull = (distFromCenter - bound) * 0.02;
      this.x -= (this.x / distFromCenter) * pull * dt * 30;
      this.z -= (this.z / distFromCenter) * pull * dt * 30;
    }

    this.moving = len > 0.1;
    if (this.moving) {
      this.yaw = Math.atan2(this.velocity.x, this.velocity.y);
    }

    this.syncTransform();
    this.animate(dt);
    this.updateCamera(dt);
  }

  _inDoorGap(c, x, z, r) {
    if (!c.doorGap) return false;
    return Math.abs(x - c.doorGap.x) < 1.5 + r && Math.abs(z - c.doorGap.z) < 1.3 + r;
  }

  _inside(c, x, z, r) {
    return x > c.minX - r && x < c.maxX + r && z > c.minZ - r && z < c.maxZ + r;
  }

  _hitsAny(colliders, x, z, r) {
    for (const c of colliders) {
      if (c.doorGap && this._inDoorGap(c, x, z, r)) continue;
      if (this._inside(c, x, z, r)) return true;
    }
    return false;
  }

  _pushOut(c, r) {
    const x = this.x;
    const z = this.z;
    const left = Math.abs(x - (c.minX - r));
    const right = Math.abs(x - (c.maxX + r));
    const top = Math.abs(z - (c.minZ - r));
    const bottom = Math.abs(z - (c.maxZ + r));
    const min = Math.min(left, right, top, bottom);
    if (min === left) this.x = c.minX - r - 0.05;
    else if (min === right) this.x = c.maxX + r + 0.05;
    else if (min === top) this.z = c.minZ - r - 0.05;
    else this.z = c.maxZ + r + 0.05;
    this.velocity.multiplyScalar(0.2);
  }

  animate(dt) {
    const t = performance.now() / 1000;
    const swing = this.moving ? Math.sin(t * (this.running ? 12 : 8)) * 0.45 : 0;
    const legL = this.group.getObjectByName('legL');
    const legR = this.group.getObjectByName('legR');
    const armL = this.group.getObjectByName('armL');
    const armR = this.group.getObjectByName('armR');
    if (legL) legL.rotation.x = swing;
    if (legR) legR.rotation.x = -swing;
    if (armL) armL.rotation.x = -swing * 0.7;
    if (armR) armR.rotation.x = swing * 0.7;

    // gentle bob
    if (this.moving && !this.sitting) {
      this.group.position.addScaledVector(surfaceNormal(this.x, this.z), Math.abs(Math.sin(t * 8)) * 0.04);
    }
  }

  updateCamera(dt) {
    const target = surfacePoint(this.x, this.z, 1.55);
    const normal = surfaceNormal(this.x, this.z);

    // camera orbits around player using camYaw / camPitch
    const pitch = this.camPitch;
    const dist = this.camDist;

    // basis on tangent plane
    const fwd = surfaceForward(this.x, this.z, this.camYaw);
    const right = surfaceRight(this.x, this.z, this.camYaw);

    const offset = new THREE.Vector3()
      .addScaledVector(fwd, -Math.cos(pitch) * dist)
      .addScaledVector(normal, Math.sin(pitch) * dist + CAMERA_HEIGHT * 0.35);

    const camPos = target.clone().add(offset);

    // soft follow
    this.camera.position.lerp(camPos, 1 - Math.exp(-8 * dt));
    const lookAt = target.clone().addScaledVector(normal, 0.4);
    this.camera.lookAt(lookAt);
  }

  /** World-space position of the player (feet) */
  getWorldPosition() {
    return surfacePoint(this.x, this.z, 0);
  }
}
