/**
 * World surface mapping.
 * Gameplay lives in flat surface coords (sx, sz).
 * Rendering applies a gentle planet-like curvature so the town reads as a
 * small continuous curved world with a closed railway loop, without the
 * orientation chaos of a full polar chart.
 */
import * as THREE from 'three';

/** Virtual radius used only for visual curvature. */
export const WORLD_RADIUS = 420;

/** How much the ground droops with distance from town center (visual only). */
export function surfaceHeight(sx: number, sz: number): number {
  const r2 = sx * sx + sz * sz;
  return -r2 / (2 * WORLD_RADIUS);
}

/** Surface (sx,sz) → world position. */
export function surfaceToWorld(sx: number, sz: number, height = 0, out = new THREE.Vector3()): THREE.Vector3 {
  return out.set(sx, surfaceHeight(sx, sz) + height, sz);
}

/** World up is mostly +Y; near edges we tilt slightly toward the center. */
export function surfaceUp(sx: number, sz: number, out = new THREE.Vector3()): THREE.Vector3 {
  // derivative of height field: dh/dsx = -sx/R, dh/dsz = -sz/R
  const nx = -sx / WORLD_RADIUS;
  const nz = -sz / WORLD_RADIUS;
  return out.set(nx, 1, nz).normalize();
}

/**
 * Place matrix: yaw rotation about Y at the surface point.
 */
export function surfaceMatrix(sx: number, sz: number, height = 0, yaw = 0, out = new THREE.Matrix4()): THREE.Matrix4 {
  const y = surfaceHeight(sx, sz) + height;
  return out.makeRotationY(yaw).setPosition(sx, y, sz);
}

export function placeOnSurface(
  obj: THREE.Object3D,
  sx: number,
  sz: number,
  height = 0,
  yaw = 0,
): void {
  obj.position.set(sx, surfaceHeight(sx, sz) + height, sz);
  obj.rotation.set(0, yaw, 0);
  if (obj.scale.x === 0 && obj.scale.y === 0 && obj.scale.z === 0) {
    obj.scale.set(1, 1, 1);
  }
  obj.updateMatrixWorld(true);
}

export function surfaceDistance(ax: number, az: number, bx: number, bz: number): number {
  return Math.hypot(ax - bx, az - bz);
}

/**
 * Move by local-frame delta. yaw=0 faces +sx.
 * dx forward along facing, dz to the right of facing.
 */
export function moveSurface(
  sx: number,
  sz: number,
  dx: number,
  dz: number,
  yaw: number,
): { sx: number; sz: number } {
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  // facing = (cos, sin) in (sx,sz); right = (-sin, cos)
  const worldDx = dx * cos - dz * sin;
  const worldDz = dx * sin + dz * cos;
  return { sx: sx + worldDx, sz: sz + worldDz };
}

export function ringSurfacePoints(radius: number, segments: number, offsetYaw = 0): Array<{ sx: number; sz: number }> {
  const pts: Array<{ sx: number; sz: number }> = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2 + offsetYaw;
    pts.push({ sx: radius * Math.cos(t), sz: radius * Math.sin(t) });
  }
  return pts;
}

export const WORLD_UP = new THREE.Vector3(0, 1, 0);
