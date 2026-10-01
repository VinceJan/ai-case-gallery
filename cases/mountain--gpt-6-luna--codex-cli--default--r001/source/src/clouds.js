import * as THREE from 'three';

function random(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function createClouds() {
  const group = new THREE.Group();
  group.name = 'Voxel cloud banks';
  const rng = random(38107);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0xc5d2d0,
    roughness: 1,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });
  const centers = [
    { x: -30, z: -4, y: 13.8, rx: 8.2, rz: 4.2, ry: 1.8, count: 27 },
    { x: -12, z: 8, y: 13.3, rx: 7.2, rz: 3.8, ry: 1.7, count: 28 },
    { x: 14, z: 10, y: 13.5, rx: 7.8, rz: 3.9, ry: 1.8, count: 29 },
    { x: 31, z: -3, y: 13.1, rx: 7.2, rz: 3.7, ry: 1.7, count: 25 },
    { x: -1, z: -20, y: 14.4, rx: 9.5, rz: 3.7, ry: 1.6, count: 24 },
  ];
  const puffCount = centers.reduce((sum, bank) => sum + bank.count, 0);
  const mesh = new THREE.InstancedMesh(cube, material, puffCount);
  mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const cloudPalette = [0xbacbc9, 0xc9d4cf, 0xd2d2c5, 0xb0c4c8, 0xc1d1d2];
  let index = 0;

  for (const bank of centers) {
    for (let i = 0; i < bank.count; i += 1) {
      const angle = rng() * Math.PI * 2;
      const radius = Math.sqrt(rng());
      const x = bank.x + Math.cos(angle) * bank.rx * radius;
      const z = bank.z + Math.sin(angle) * bank.rz * radius;
      const y = bank.y + (rng() - 0.5) * bank.ry * 2;
      const puff = 0.95 + Math.pow(rng(), 0.62) * 1.85;
      dummy.position.set(x, y, z);
      dummy.rotation.y = (rng() - 0.5) * 0.22;
      dummy.scale.set(puff * (0.88 + rng() * 0.38), 0.72 + rng() * 0.72, puff * (0.82 + rng() * 0.42));
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      color.setHex(cloudPalette[Math.floor(rng() * cloudPalette.length)]).multiplyScalar(0.92 + rng() * 0.12);
      mesh.setColorAt(index, color);
      index += 1;
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.frustumCulled = false;
  group.add(mesh);

  return {
    group,
    update(time) {
      mesh.position.x = Math.sin(time * 0.075) * 0.55;
      mesh.position.z = Math.sin(time * 0.045 + 1.2) * 0.32;
      material.opacity = 0.33 + Math.sin(time * 0.18) * 0.018;
    },
  };
}
