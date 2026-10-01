/**
 * Planet mapping: the town is authored in a flat "layout" plane (x, z),
 * then projected onto a small sphere so the world curves and loops.
 *
 * Layout origin maps to the sphere's north pole (0, R, 0).
 * +x / +z in layout become directions on the tangent plane at the pole.
 */
import * as THREE from 'three';

export const PLANET_RADIUS = 240;

const _up = new THREE.Vector3(0, 1, 0);
const _q = new THREE.Quaternion();

/** Unit-sphere direction from layout (x, z). */
function dirFromLayout(x, z) {
  const r = Math.hypot(x, z);
  if (r < 1e-8) return new THREE.Vector3(0, 1, 0);
  const theta = r / PLANET_RADIUS; // polar angle from +Y
  const phi = Math.atan2(x, z); // azimuth around Y
  const sinT = Math.sin(theta);
  return new THREE.Vector3(
    sinT * Math.sin(phi),
    Math.cos(theta),
    sinT * Math.cos(phi)
  );
}

export function surfaceNormal(x, z) {
  return dirFromLayout(x, z);
}

export function surfacePoint(x, z, height = 0) {
  return dirFromLayout(x, z).multiplyScalar(PLANET_RADIUS + height);
}

export function placeOnPlanet(object3d, x, z, height = 0, yaw = 0) {
  const pos = surfacePoint(x, z, height);
  object3d.position.copy(pos);
  const n = surfaceNormal(x, z);
  _q.setFromUnitVectors(_up, n);
  object3d.quaternion.copy(_q);
  if (yaw) {
    const yawQ = new THREE.Quaternion().setFromAxisAngle(_up, yaw);
    object3d.quaternion.multiply(yawQ);
  }
  return object3d;
}

/** Convert a world-space point near the surface back to layout (x, z, height). */
export function layoutFromWorld(worldPos) {
  const n = worldPos.clone().normalize();
  const height = worldPos.length() - PLANET_RADIUS;
  const theta = Math.acos(THREE.MathUtils.clamp(n.y, -1, 1));
  const phi = Math.atan2(n.x, n.z);
  const r = theta * PLANET_RADIUS;
  return {
    x: r * Math.sin(phi),
    z: r * Math.cos(phi),
    height,
  };
}

/**
 * Create a sphere mesh with a gentle hill-like displacement, used as ground.
 */
export function createPlanetGround(quality = 64) {
  const geo = new THREE.SphereGeometry(PLANET_RADIUS, quality, quality);

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = v.clone().normalize();
    // Low-frequency bumps
    const h =
      Math.sin(n.x * 6.0) * Math.cos(n.z * 5.0) * 2.2 +
      Math.sin(n.x * 12.0 + n.z * 9.0) * 1.1 +
      Math.sin(n.y * 8.0) * 0.8;
    // Flatten the town plateau near the north pole (y ~ 1) almost completely
    const townMask = THREE.MathUtils.smoothstep(n.y, 0.82, 0.97);
    const disp = h * (1 - townMask);
    v.normalize().multiplyScalar(PLANET_RADIUS + disp);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Forward direction on the surface from layout yaw.
 * yaw 0 = +z layout direction, positive yaw = clockwise looking down (+x).
 */
export function surfaceForward(x, z, yaw) {
  const n = surfaceNormal(x, z);
  // Build a stable tangent basis at (x,z):
  // d/dx of position ≈ east, d/dz ≈ north (for small x,z near pole)
  const eps = 0.5;
  const p0 = surfacePoint(x, z, 0);
  const px = surfacePoint(x + eps, z, 0);
  const pz = surfacePoint(x, z + eps, 0);
  const east = px.clone().sub(p0).normalize();
  const north = pz.clone().sub(p0).normalize();
  // Orthonormalize against normal
  east.sub(n.clone().multiplyScalar(east.dot(n))).normalize();
  north.sub(n.clone().multiplyScalar(north.dot(n))).normalize();
  return new THREE.Vector3()
    .addScaledVector(north, Math.cos(yaw))
    .addScaledVector(east, Math.sin(yaw))
    .normalize();
}

/** Right vector on the surface */
export function surfaceRight(x, z, yaw) {
  const n = surfaceNormal(x, z);
  const f = surfaceForward(x, z, yaw);
  return new THREE.Vector3().crossVectors(f, n).normalize();
}
