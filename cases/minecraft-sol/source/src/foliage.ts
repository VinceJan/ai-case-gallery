import * as THREE from 'three';
import { VoxelWorld } from './world';

function hash(x: number, z: number, seed: number): number {
  let n = Math.imul(x + seed * 71, 374761393) ^ Math.imul(z - seed * 31, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function grassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const blades = [
    [5, 39, 15, 11, '#598a45'], [12, 44, 24, 5, '#83a85a'],
    [19, 38, 25, 18, '#709c50'], [25, 49, 34, 4, '#568547'],
    [32, 38, 41, 12, '#81aa5d'], [40, 45, 49, 6, '#65934e'],
    [48, 39, 59, 17, '#84aa61'], [52, 51, 63, 28, '#537e43'],
  ] as const;
  for (const [base, shoulder, tipX, tipY, color] of blades) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(base - 5, 64);
    ctx.quadraticCurveTo(shoulder, 33, tipX, tipY);
    ctx.quadraticCurveTo(shoulder - 5, 45, base + 4, 64);
    ctx.closePath();
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function flowerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.strokeStyle = '#6a9c54'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(32, 64); ctx.quadraticCurveTo(34, 44, 30, 25); ctx.stroke();
  ctx.fillStyle = '#729f55';
  ctx.beginPath(); ctx.ellipse(24, 47, 12, 4, .45, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(41, 39, 10, 4, -.6, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * 2 / 5;
    ctx.fillStyle = i % 2 ? '#f8eee2' : '#fff7e9';
    ctx.beginPath(); ctx.ellipse(32 + Math.cos(a) * 9, 25 + Math.sin(a) * 9, 6, 9, a, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#f4ce75'; ctx.beginPath(); ctx.arc(32, 25, 6, 0, Math.PI * 2); ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class Foliage {
  readonly group = new THREE.Group();
  private grass: THREE.InstancedMesh[];
  private flowers: THREE.InstancedMesh[];
  private windUniform = { value: 0 };

  constructor(private world: VoxelWorld) {
    const plane = new THREE.PlaneGeometry(.70, .80);
    plane.translate(0, .38, 0);
    const grassMaterial = new THREE.MeshStandardMaterial({
      map: grassTexture(), transparent: true, alphaTest: .38, side: THREE.DoubleSide,
      roughness: 1, depthWrite: true, vertexColors: false,
    });
    grassMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uWindTime = this.windUniform;
      shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uWindTime;');
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
        #include <begin_vertex>
        #ifdef USE_INSTANCING
          transformed.x += sin(uWindTime * 1.55 + instanceMatrix[3].x * .48 + instanceMatrix[3].z * .61) * transformed.y * .11;
        #endif
      `);
    };
    const flowerMaterial = new THREE.MeshStandardMaterial({ map: flowerTexture(), transparent: true, alphaTest: .32, side: THREE.DoubleSide, roughness: 1 });
    const capacity = world.size * world.size;
    this.grass = [new THREE.InstancedMesh(plane, grassMaterial, capacity), new THREE.InstancedMesh(plane, grassMaterial, capacity)];
    this.flowers = [new THREE.InstancedMesh(plane, flowerMaterial, capacity), new THREE.InstancedMesh(plane, flowerMaterial, capacity)];
    this.group.add(...this.grass, ...this.flowers);
    this.rebuild();
  }

  rebuild(): void {
    const dummy = new THREE.Object3D();
    let grassCount = 0, flowerCount = 0;
    for (let z = -this.world.half; z < this.world.half; z++) {
      for (let x = -this.world.half; x < this.world.half; x++) {
        const h = this.world.getSurfaceY(x, z);
        if (this.world.getBlock(x, h, z) !== 'grass' || this.world.getBlock(x, h + 1, z)) continue;
        const r = hash(x, z, 27);
        if (r < .49) continue;
        const flower = r > .978;
        const target = flower ? this.flowers : this.grass;
        const index = flower ? flowerCount++ : grassCount++;
        dummy.position.set(x + (hash(x,z,8)-.5)*.52, h + .50, z + (hash(x,z,9)-.5)*.52);
        const scale = flower ? .75 + hash(x,z,15)*.35 : .65 + hash(x,z,16)*.53;
        dummy.scale.setScalar(scale);
        for (let i = 0; i < 2; i++) {
          dummy.rotation.set(0, hash(x,z,12)*Math.PI*2 + i*Math.PI/2, 0);
          dummy.updateMatrix();
          target[i].setMatrixAt(index, dummy.matrix);
        }
      }
    }
    for (const mesh of this.grass) { mesh.count = grassCount; mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingSphere(); }
    for (const mesh of this.flowers) { mesh.count = flowerCount; mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingSphere(); }
  }

  update(time: number): void { this.windUniform.value = time; }
}
