import * as THREE from 'three';

export const BLOCK = 0.88;
const GRID_X = 104;
const GRID_Z = 78;
const X_MIN = -GRID_X * BLOCK * 0.5;
const Z_MIN = -GRID_Z * BLOCK * 0.5;

const peaks = [
  { x: -11, z: -10, h: 33, rx: 23, rz: 23 },
  { x: 9, z: -9, h: 23, rx: 18, rz: 20 },
  { x: -29, z: -13, h: 19, rx: 15, rz: 17 },
  { x: 27, z: -11, h: 20, rx: 15, rz: 18 },
  { x: 0, z: 14, h: 17, rx: 18, rz: 15 },
];

function hash(ix, iz) {
  const value = Math.sin(ix * 127.1 + iz * 311.7 + 73.19) * 43758.5453123;
  return (value - Math.floor(value)) * 2 - 1;
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x, z) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = smooth(x - ix);
  const fz = smooth(z - iz);
  const a = THREE.MathUtils.lerp(hash(ix, iz), hash(ix + 1, iz), fx);
  const b = THREE.MathUtils.lerp(hash(ix, iz + 1), hash(ix + 1, iz + 1), fx);
  return THREE.MathUtils.lerp(a, b, fz);
}

function rawHeight(x, z) {
  let ridges = 0;
  let mass = 0;
  for (const peak of peaks) {
    const dx = (x - peak.x) / peak.rx;
    const dz = (z - peak.z) / peak.rz;
    const radius = Math.hypot(dx, dz);
    const shape = Math.pow(Math.max(0, 1 - radius), 1.22);
    ridges += peak.h * shape;
    mass = Math.max(mass, shape);
  }

  const foothill = Math.max(0, 1 - Math.hypot(x / 48, z / 38)) * 1.8;
  const broad = valueNoise(x * 0.12, z * 0.12) * 1.35;
  const detail = valueNoise(x * 0.36 + 11, z * 0.36 - 9) * 0.72;
  const relief = (broad + detail) * Math.min(1, mass * 2.2 + 0.16);

  // A narrow eroded notch makes a clear ledge for the main waterfall to cross.
  const chute = Math.exp(-0.5 * ((x + 9) / 3.1) ** 2);
  const northWall = THREE.MathUtils.smoothstep(z, -2.1, 0.4);
  const southWall = 1 - THREE.MathUtils.smoothstep(z, 8.5, 13.2);
  const erosion = 4.8 * chute * northWall * southWall;

  return Math.max(BLOCK, BLOCK + foothill + ridges + relief - erosion);
}

function seeded(x, z) {
  return (Math.sin(x * 81.17 + z * 29.73 + 5.1) * 951.1357) % 1;
}

function palette(level, variation) {
  const choices = level < 6
    ? [0x384f43, 0x415747, 0x48604b, 0x50654f]
    : level < 13
      ? [0x465a4c, 0x4d6353, 0x53665a, 0x586a5c]
      : level < 21
        ? [0x566765, 0x5c706b, 0x62746e, 0x52645e]
        : level < 31
          ? [0x767d79, 0x818480, 0x6c7775, 0x898781]
          : [0xb7c2bf, 0xc2c7c0, 0xd1d1c9, 0xb0bdbb];
  return new THREE.Color(choices[Math.abs(variation) % choices.length]);
}

function addFace(position, colors, tint, a, b, c, d) {
  position.push(...a, ...b, ...c, ...d);
  colors.push(...tint, ...tint, ...tint, ...tint);
}

function makeGeometry(heights, levels) {
  const position = [];
  const colors = [];
  const indices = [];
  const face = (points, tint) => {
    const base = position.length / 3;
    addFace(position, colors, tint.toArray(), ...points);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };

  for (let iz = 0; iz < GRID_Z; iz += 1) {
    for (let ix = 0; ix < GRID_X; ix += 1) {
      const idx = iz * GRID_X + ix;
      const top = heights[idx];
      const level = levels[idx];
      const x0 = X_MIN + ix * BLOCK;
      const x1 = x0 + BLOCK;
      const z0 = Z_MIN + iz * BLOCK;
      const z1 = z0 + BLOCK;
      const surfaceTint = palette(level, Math.floor(Math.abs(seeded(ix, iz)) * 4));
      surfaceTint.multiplyScalar(0.94 + Math.abs(seeded(iz, ix)) * 0.11);
      face([[x0, top, z0], [x0, top, z1], [x1, top, z1], [x1, top, z0]], surfaceTint);

      const neighbors = [
        { level: iz === GRID_Z - 1 ? 0 : levels[idx + GRID_X], points: (y0, y1) => [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], shade: 0.74 },
        { level: iz === 0 ? 0 : levels[idx - GRID_X], points: (y0, y1) => [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], shade: 0.71 },
        { level: ix === GRID_X - 1 ? 0 : levels[idx + 1], points: (y0, y1) => [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], shade: 0.82 },
        { level: ix === 0 ? 0 : levels[idx - 1], points: (y0, y1) => [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], shade: 0.77 },
      ];

      for (const neighbor of neighbors) {
        for (let layer = neighbor.level; layer < level; layer += 1) {
          const variation = Math.abs(seeded(ix * 7 + layer, iz * 11 - layer));
          const sideTint = palette(layer + 1, Math.floor(variation * 4));
          sideTint.multiplyScalar(neighbor.shade * (0.88 + variation * 0.18));
          face(neighbor.points(layer * BLOCK, (layer + 1) * BLOCK), sideTint);
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export function createTerrain() {
  const heights = new Float32Array(GRID_X * GRID_Z);
  const levels = new Uint8Array(GRID_X * GRID_Z);
  for (let iz = 0; iz < GRID_Z; iz += 1) {
    for (let ix = 0; ix < GRID_X; ix += 1) {
      const x = X_MIN + (ix + 0.5) * BLOCK;
      const z = Z_MIN + (iz + 0.5) * BLOCK;
      const level = Math.max(1, Math.round(rawHeight(x, z) / BLOCK));
      const idx = iz * GRID_X + ix;
      levels[idx] = level;
      heights[idx] = level * BLOCK;
    }
  }

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.01,
  });
  const mesh = new THREE.Mesh(makeGeometry(heights, levels), material);
  mesh.name = 'Voxel mountain range';
  mesh.castShadow = true;
  mesh.receiveShadow = false;

  function heightAt(x, z) {
    const gx = THREE.MathUtils.clamp((x - X_MIN) / BLOCK - 0.5, 0, GRID_X - 1);
    const gz = THREE.MathUtils.clamp((z - Z_MIN) / BLOCK - 0.5, 0, GRID_Z - 1);
    const x0 = Math.floor(gx);
    const z0 = Math.floor(gz);
    const x1 = Math.min(GRID_X - 1, x0 + 1);
    const z1 = Math.min(GRID_Z - 1, z0 + 1);
    const tx = gx - x0;
    const tz = gz - z0;
    const h00 = heights[z0 * GRID_X + x0];
    const h10 = heights[z0 * GRID_X + x1];
    const h01 = heights[z1 * GRID_X + x0];
    const h11 = heights[z1 * GRID_X + x1];
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(h00, h10, tx), THREE.MathUtils.lerp(h01, h11, tx), tz);
  }

  return { mesh, heightAt };
}
