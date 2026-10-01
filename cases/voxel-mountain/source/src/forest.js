import * as THREE from 'three';

function random(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1103515245 + 12345) >>> 0;
    return value / 4294967296;
  };
}

export function createForest(heightAt) {
  const group = new THREE.Group();
  group.name = 'Pine forest and boulders';
  const rng = random(91551);
  const trunks = [];
  const foliage = [];
  const trunkColors = [0x59483a, 0x675241, 0x705847];
  const leafColors = [0x264c40, 0x315746, 0x3b6049, 0x47694e];
  const candidates = 205;

  for (let i = 0; i < candidates; i += 1) {
    const angle = rng() * Math.PI * 2;
    const radius = 19 + rng() * 20;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius * 0.77 + 1;
    const y = heightAt(x, z);
    const slope = Math.abs(heightAt(x + 1.6, z) - heightAt(x - 1.6, z)) + Math.abs(heightAt(x, z + 1.6) - heightAt(x, z - 1.6));
    const nearBasin = ((x + 14) / 12) ** 2 + ((z - 24.5) / 7.8) ** 2 < 1.18;
    const nearWater = nearBasin || Math.hypot(x + 10, z - 7) < 4.6 || Math.hypot(x - 13, z - 6) < 3.2;
    if (y > 12.4 || slope > 5.8 || nearWater || rng() < 0.2) continue;

    const size = 0.74 + rng() * 0.65;
    const trunkHeight = 2.0 + rng() * 2.1;
    const trunkY = y + trunkHeight * size * 0.5;
    trunks.push({
      position: [x, trunkY, z],
      scale: [0.48 * size, trunkHeight * size, 0.48 * size],
      color: trunkColors[Math.floor(rng() * trunkColors.length)],
    });

    const top = y + trunkHeight * size;
    const tiers = [
      { y: 1.0, width: 2.7, depth: 2.7 },
      { y: 2.05, width: 2.15, depth: 2.15 },
      { y: 3.02, width: 1.55, depth: 1.55 },
      { y: 3.86, width: 0.92, depth: 0.92 },
    ];
    for (let t = 0; t < tiers.length; t += 1) {
      const tier = tiers[t];
      foliage.push({
        position: [x, top + tier.y * size, z],
        scale: [tier.width * size * (0.88 + rng() * 0.24), 1.26 * size, tier.depth * size * (0.88 + rng() * 0.24)],
        color: leafColors[Math.floor(rng() * leafColors.length)],
      });
    }
  }

  const cube = new THREE.BoxGeometry(1, 1, 1);
  const trunkMesh = new THREE.InstancedMesh(cube, new THREE.MeshStandardMaterial({ roughness: 1 }), trunks.length);
  const leafMesh = new THREE.InstancedMesh(cube, new THREE.MeshStandardMaterial({ roughness: 1 }), foliage.length);
  const matrix = new THREE.Object3D();
  const color = new THREE.Color();
  for (const [mesh, items] of [[trunkMesh, trunks], [leafMesh, foliage]]) {
    items.forEach((item, index) => {
      matrix.position.set(...item.position);
      matrix.rotation.set(0, (rng() - 0.5) * 0.35, 0);
      matrix.scale.set(...item.scale);
      matrix.updateMatrix();
      mesh.setMatrixAt(index, matrix.matrix);
      color.setHex(item.color);
      mesh.setColorAt(index, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  return group;
}
