/**
 * Player controller on the curved surface.
 * WASD + mouse look (optional), shift to run, E to interact.
 */
import * as THREE from 'three';
import { placeOnSurface, moveSurface, surfaceToWorld, surfaceUp } from '../world/surface';

export type PlayerTuning = {
  speed: number;
  runMultiplier: number;
  acceleration: number;
  turnLerp: number;
};

export type InputFrame = {
  forward: number;
  strafe: number;
  run: boolean;
  interact: boolean;
  interactPressed: boolean;
  toggleLight: boolean;
  jump: boolean;
};

export class Player {
  readonly group = new THREE.Group();
  readonly velocity = new THREE.Vector3();
  sx = -6;
  sz = 6;
  yaw = 0;
  private mesh: THREE.Group;
  private bob = 0;
  private interactCooldown = 0;

  constructor() {
    this.mesh = this.buildBody();
    this.group.add(this.mesh);
    this.syncTransform();
  }

  private buildBody(): THREE.Group {
    const g = new THREE.Group();
    const bodyMat = new THREE.MeshToonMaterial({ color: '#3a5080' });
    const skinMat = new THREE.MeshToonMaterial({ color: '#f0c8a0' });
    const hairMat = new THREE.MeshToonMaterial({ color: '#2a2826' });
    const pantsMat = new THREE.MeshToonMaterial({ color: '#2a3040' });

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.7, 0.32), bodyMat);
    torso.position.y = 1.15;
    torso.castShadow = true;
    g.add(torso);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.36), skinMat);
    head.position.y = 1.72;
    head.castShadow = true;
    g.add(head);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.18, 0.4), hairMat);
    hair.position.y = 1.92;
    g.add(hair);

    for (const x of [-0.16, 0.16]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.7, 0.2), pantsMat);
      leg.position.set(x, 0.55, 0);
      leg.castShadow = true;
      g.add(leg);
    }
    for (const x of [-0.38, 0.38]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.65, 0.16), bodyMat);
      arm.position.set(x, 1.15, 0);
      arm.castShadow = true;
      g.add(arm);
    }
    return g;
  }

  reset(): void {
    this.sx = -6;
    this.sz = 6;
    this.yaw = 0;
    this.velocity.set(0, 0, 0);
    this.syncTransform();
  }

  stabilizeVisuals(): void {
    this.bob = 0;
  }

  syncTransform(): void {
    placeOnSurface(this.group, this.sx, this.sz, 0, this.yaw);
    // walk on ground: slight lift for legs
    const up = surfaceUp(this.sx, this.sz);
    this.group.position.addScaledVector(up, 0.02);
  }

  update(delta: number, elapsed: number, input: InputFrame, tuning: PlayerTuning): void {
    const targetSpeed = (input.run ? tuning.speed * tuning.runMultiplier : tuning.speed);
    const moveX = input.strafe;
    const moveZ = input.forward;

    // desired local velocity
    const len = Math.hypot(moveX, moveZ) || 1;
    const normX = moveX / len * Math.min(1, len);
    const normZ = moveZ / len * Math.min(1, len);

    // smooth
    const accel = tuning.acceleration * delta;
    this.velocity.x += (normX * targetSpeed - this.velocity.x) * Math.min(1, accel);
    this.velocity.z += (normZ * targetSpeed - this.velocity.z) * Math.min(1, accel);

    if (Math.abs(moveX) < 0.01 && Math.abs(moveZ) < 0.01) {
      this.velocity.multiplyScalar(Math.max(0, 1 - 8 * delta));
    }

    const moving = this.velocity.length() > 0.15;
    if (moving) {
      const next = moveSurface(this.sx, this.sz, this.velocity.x * delta, this.velocity.z * delta, 0);
      this.sx = next.sx;
      this.sz = next.sz;
      // face movement direction: yaw=0 faces +sx, facing=(cos yaw, sin yaw)
      const targetYaw = Math.atan2(this.velocity.z, this.velocity.x);
      let diff = targetYaw - this.yaw;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.yaw += diff * Math.min(1, tuning.turnLerp * delta * 10);
      this.bob = elapsed * (input.run ? 12 : 7);
    }

    this.syncTransform();
    // bob body
    this.mesh.position.y = moving ? Math.sin(this.bob) * 0.04 : 0;
    this.mesh.rotation.z = moving ? Math.sin(this.bob) * 0.03 : 0;

    if (this.interactCooldown > 0) this.interactCooldown -= delta;
  }

  get canInteract(): boolean {
    return this.interactCooldown <= 0;
  }

  consumeInteract(): void {
    this.interactCooldown = 0.25;
  }

  get positionSurface(): { sx: number; sz: number } {
    return { sx: this.sx, sz: this.sz };
  }

  worldPosition(out = new THREE.Vector3()): THREE.Vector3 {
    return surfaceToWorld(this.sx, this.sz, 1.0, out);
  }
}
