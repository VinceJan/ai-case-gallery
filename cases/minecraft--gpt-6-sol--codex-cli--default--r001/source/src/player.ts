import * as THREE from 'three';
import { VoxelWorld, WATER_LEVEL } from './world';

const RADIUS = .29;
const HEIGHT = 1.76;
const EYE_HEIGHT = 1.61;

export class Player {
  readonly position = new THREE.Vector3();
  readonly velocity = new THREE.Vector3();
  yaw = 0;
  pitch = -.1;
  grounded = false;
  private keys = new Set<string>();

  constructor(private world: VoxelWorld, readonly camera: THREE.PerspectiveCamera) {
    this.reset();
  }

  reset(): void {
    const spawn = this.world.findSpawn();
    this.position.set(spawn.x, spawn.y, spawn.z);
    this.velocity.set(0, 0, 0);
    this.yaw = -1.66;
    this.pitch = -.08;
    this.syncCamera();
  }

  setKey(code: string, pressed: boolean): void {
    if (pressed) this.keys.add(code);
    else this.keys.delete(code);
  }

  look(dx: number, dy: number): void {
    this.yaw -= dx * .00235;
    this.pitch = THREE.MathUtils.clamp(this.pitch - dy * .00235, -1.48, 1.48);
    this.syncCamera();
  }

  update(delta: number): void {
    const dt = Math.min(delta, .05);
    const inWater = this.position.y < WATER_LEVEL + .4;
    const sprint = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
    const speed = inWater ? 3.1 : sprint ? 8.2 : 5.4;
    let forward = 0, side = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) forward++;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) forward--;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) side++;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) side--;
    const length = Math.hypot(forward, side) || 1;
    forward /= length; side /= length;
    this.velocity.x = (-Math.sin(this.yaw) * forward + Math.cos(this.yaw) * side) * speed;
    this.velocity.z = (-Math.cos(this.yaw) * forward - Math.sin(this.yaw) * side) * speed;
    if (this.keys.has('Space') && (this.grounded || inWater)) {
      this.velocity.y = inWater ? 4.5 : 8.4;
      this.grounded = false;
    }
    this.velocity.y -= (inWater ? 8 : 23) * dt;
    this.velocity.y = Math.max(this.velocity.y, -30);
    this.moveAxis('x', this.velocity.x * dt);
    this.moveAxis('z', this.velocity.z * dt);
    this.grounded = false;
    this.moveAxis('y', this.velocity.y * dt);
    if (this.position.y < -8) this.reset();
    this.syncCamera();
  }

  overlapsBlock(x: number, y: number, z: number): boolean {
    return this.position.x + RADIUS > x - .5 && this.position.x - RADIUS < x + .5
      && this.position.y + HEIGHT > y - .5 && this.position.y < y + .5
      && this.position.z + RADIUS > z - .5 && this.position.z - RADIUS < z + .5;
  }

  private collides(): boolean {
    const minX = Math.floor(this.position.x - RADIUS - .5);
    const maxX = Math.ceil(this.position.x + RADIUS + .5);
    const minY = Math.floor(this.position.y - .5);
    const maxY = Math.ceil(this.position.y + HEIGHT + .5);
    const minZ = Math.floor(this.position.z - RADIUS - .5);
    const maxZ = Math.ceil(this.position.z + RADIUS + .5);
    for (let z = minZ; z <= maxZ; z++) {
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          if (this.world.isSolid(x, y, z) && this.overlapsBlock(x, y, z)) return true;
        }
      }
    }
    return false;
  }

  private moveAxis(axis: 'x' | 'y' | 'z', distance: number): void {
    if (distance === 0) return;
    const original = this.position[axis];
    const steps = Math.max(1, Math.ceil(Math.abs(distance) / .18));
    for (let i = 0; i < steps; i++) {
      this.position[axis] += distance / steps;
      if (this.collides()) {
        this.position[axis] = original + (distance / steps) * i;
        if (axis === 'y' && distance < 0) this.grounded = true;
        this.velocity[axis] = 0;
        return;
      }
    }
  }

  private syncCamera(): void {
    this.camera.position.set(this.position.x, this.position.y + EYE_HEIGHT, this.position.z);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(this.pitch, this.yaw, 0);
  }
}
