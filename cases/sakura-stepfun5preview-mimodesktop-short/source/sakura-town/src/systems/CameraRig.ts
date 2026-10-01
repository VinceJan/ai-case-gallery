import * as THREE from 'three';
import type { BoxCollider } from '../world/buildings';

/** 第三人称跟随相机：拖拽环绕 + 滚轮缩放 + 建筑避让 + 创伤抖动。 */
export class CameraRig {
  yaw = 0;
  distance = 8.5;
  private readonly desiredPosition = new THREE.Vector3();
  private readonly lookTarget = new THREE.Vector3();
  private readonly rayDirection = new THREE.Vector3();
  private trauma = 0;
  private time = 0;
  private fovPunch = 0;
  private readonly baseFov: number;

  constructor(private readonly camera: THREE.PerspectiveCamera) {
    this.baseFov = camera.fov;
  }

  rotate(deltaYaw: number): void {
    this.yaw += deltaYaw;
  }

  zoom(delta: number): void {
    this.distance = THREE.MathUtils.clamp(this.distance + delta, 4.5, 14);
  }

  addTrauma(amount: number): void {
    this.trauma = Math.min(1, this.trauma + amount);
  }

  punchFov(degrees: number): void {
    this.fovPunch = Math.min(8, this.fovPunch + degrees);
  }

  snapTo(target: THREE.Vector3, colliders?: BoxCollider[]): void {
    this.computeDesired(target, colliders);
    this.camera.position.copy(this.desiredPosition);
    this.lookTarget.set(target.x, target.y + 1.5, target.z);
    this.camera.lookAt(this.lookTarget);
  }

  private computeDesired(target: THREE.Vector3, colliders?: BoxCollider[]): void {
    const height = 3.6;
    this.desiredPosition.set(
      target.x + Math.sin(this.yaw) * this.distance,
      target.y + height,
      target.z + Math.cos(this.yaw) * this.distance,
    );

    // 建筑避让：从注视点向相机位做射线，命中则拉近并抬高
    if (colliders && colliders.length > 0) {
      this.lookTarget.set(target.x, target.y + 1.5, target.z);
      this.rayDirection.copy(this.desiredPosition).sub(this.lookTarget);
      const rayLength = this.rayDirection.length();
      if (rayLength > 0.001) {
        this.rayDirection.divideScalar(rayLength);
        const hit = raycastBoxes(this.lookTarget, this.rayDirection, rayLength, colliders);
        if (hit !== null && hit < rayLength - 0.15) {
          const pull = Math.max(1.8, hit * 0.85);
          const raise = (rayLength - pull) * 0.42;
          this.desiredPosition
            .copy(this.lookTarget)
            .addScaledVector(this.rayDirection, pull)
            .add(new THREE.Vector3(0, raise, 0));
        }
      }
    }
  }

  update(delta: number, target: THREE.Vector3, lag: number, colliders?: BoxCollider[]): void {
    this.time += delta;
    this.trauma = Math.max(0, this.trauma - 1.6 * delta);

    this.computeDesired(target, colliders);

    const factor = 1 - Math.exp(-delta / Math.max(0.001, lag));
    this.camera.position.lerp(this.desiredPosition, factor);

    this.lookTarget.set(target.x, target.y + 1.5, target.z);
    this.camera.lookAt(this.lookTarget);

    if (this.trauma > 0) {
      const shake = this.trauma * this.trauma;
      const t = this.time * 34;
      this.camera.position.x += 0.5 * shake * pseudoNoise(t, 1);
      this.camera.position.y += 0.4 * shake * pseudoNoise(t, 2);
      this.camera.rotation.z += 0.06 * shake * pseudoNoise(t, 3);
    }

    if (this.fovPunch > 0.01) {
      this.fovPunch *= Math.exp(-delta / 0.2);
      this.camera.fov = this.baseFov + this.fovPunch;
      this.camera.updateProjectionMatrix();
    }
  }
}

/** 射线 vs AABB 列表，返回最近命中距离（未命中返回 null）。 */
function raycastBoxes(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  maxDistance: number,
  boxes: BoxCollider[],
): number | null {
  let closest: number | null = null;
  for (const box of boxes) {
    // 只考虑有一定高度的盒子（建筑/道具），忽略过低的地面装饰
    const minX = box.x - box.hw;
    const maxX = box.x + box.hw;
    const minZ = box.z - box.hd;
    const maxZ = box.z + box.hd;
    const minY = 0;
    const maxY = 6;

    let tMin = 0;
    let tMax = maxDistance;
    let ok = true;
    for (let axis = 0; axis < 3; axis += 1) {
      const o = axis === 0 ? origin.x : axis === 1 ? origin.y : origin.z;
      const d = axis === 0 ? direction.x : axis === 1 ? direction.y : direction.z;
      const lo = axis === 0 ? minX : axis === 1 ? minY : minZ;
      const hi = axis === 0 ? maxX : axis === 1 ? maxY : maxZ;
      if (Math.abs(d) < 1e-8) {
        if (o < lo || o > hi) {
          ok = false;
          break;
        }
        continue;
      }
      let t1 = (lo - o) / d;
      let t2 = (hi - o) / d;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tMin = Math.max(tMin, t1);
      tMax = Math.min(tMax, t2);
      if (tMin > tMax) {
        ok = false;
        break;
      }
    }
    if (ok && tMin >= 0 && (closest === null || tMin < closest)) {
      closest = tMin;
    }
  }
  return closest;
}

function pseudoNoise(t: number, seed: number): number {
  const x = Math.sin(t * 12.9898 + seed * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}
