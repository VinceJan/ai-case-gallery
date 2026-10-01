/**
 * Falling cherry petals + fireflies at night — cheap atmosphere particles.
 */
import * as THREE from 'three';
import { placeOnPlanet, surfacePoint, surfaceNormal } from '../world/Planet.js';

export function createPetals(scene, count = 220) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // scatter in layout space around the town
    const x = (Math.random() - 0.5) * 90;
    const z = (Math.random() - 0.5) * 90;
    const h = 2 + Math.random() * 12;
    const p = surfacePoint(x, z, h);
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.35 + Math.random() * 0.7;
    radii[i] = Math.hypot(x, z);
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
  geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

  const mat = new THREE.PointsMaterial({
    color: '#f4b8c8',
    size: 0.22,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);

  const base = positions.slice();

  return {
    points,
    update(dt, t) {
      const pos = geo.attributes.position;
      for (let i = 0; i < count; i++) {
        // slowly fall and sway
        const fall = (t * speeds[i] * 0.55) % 14;
        const sway = Math.sin(t * speeds[i] + phases[i]) * 0.8;
        // reconstruct approximate layout by blending original with sway
        const ix = base[i * 3] + sway * 0.15;
        const iy = base[i * 3 + 1] - fall;
        const iz = base[i * 3 + 2] + Math.cos(t * 0.4 + phases[i]) * 0.2;
        // keep them roughly above the town: pull toward original height band
        pos.setXYZ(i, ix, iy, iz);
      }
      pos.needsUpdate = true;
    },
  };
}

export function createFireflies(scene, count = 40) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 70;
    const z = (Math.random() - 0.5) * 70;
    const p = surfacePoint(x, z, 1.2 + Math.random() * 2.5);
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
    seeds.push({ x, z, phase: Math.random() * Math.PI * 2, h: 1.2 + Math.random() * 2.5 });
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: '#ffe9a0',
    size: 0.28,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);

  return {
    points,
    mat,
    update(dt, t, isNight) {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isNight ? 0.9 : 0, 0.02);
      if (mat.opacity < 0.02) return;
      const pos = geo.attributes.position;
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        const x = s.x + Math.sin(t * 0.6 + s.phase) * 1.2;
        const z = s.z + Math.cos(t * 0.5 + s.phase) * 1.2;
        const p = surfacePoint(x, z, s.h + Math.sin(t + s.phase) * 0.3);
        pos.setXYZ(i, p.x, p.y, p.z);
      }
      pos.needsUpdate = true;
    },
  };
}
