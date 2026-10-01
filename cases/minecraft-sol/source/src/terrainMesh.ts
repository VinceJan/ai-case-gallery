import * as THREE from 'three';
import { createAtlas, tileFor, tileUV } from './atlas';
import { MAX_HEIGHT, VoxelWorld } from './world';

const CHUNK_SIZE = 16;

const faces = [
  { n: [1, 0, 0], v: [[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[.5,-.5,.5]], shade: .87 },
  { n: [-1, 0, 0], v: [[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-.5,-.5,-.5]], shade: .82 },
  { n: [0, 1, 0], v: [[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5]], shade: 1 },
  { n: [0, -1, 0], v: [[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5],[-.5,-.5,.5]], shade: .64 },
  { n: [0, 0, 1], v: [[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,.5]], shade: .92 },
  { n: [0, 0, -1], v: [[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5],[.5,-.5,-.5]], shade: .78 },
];
const faceUV = [[0,0], [0,1], [1,1], [1,0]];
const indices = [0,1,2,0,2,3];

export class TerrainRenderer {
  readonly group = new THREE.Group();
  readonly material: THREE.MeshStandardMaterial;
  private chunks = new Map<string, THREE.Mesh>();

  constructor(private world: VoxelWorld) {
    this.material = new THREE.MeshStandardMaterial({
      map: createAtlas(), vertexColors: true, roughness: .94, metalness: 0,
      emissive: new THREE.Color('#151109'), emissiveIntensity: .07,
    });
    for (let z = -world.half; z < world.half; z += CHUNK_SIZE) {
      for (let x = -world.half; x < world.half; x += CHUNK_SIZE) this.rebuild(x, z);
    }
  }

  private chunkStart(coord: number): number {
    return Math.floor((coord + this.world.half) / CHUNK_SIZE) * CHUNK_SIZE - this.world.half;
  }

  updateBlock(x: number, z: number): void {
    const cx = this.chunkStart(x), cz = this.chunkStart(z);
    this.rebuild(cx, cz);
    if ((x - cx) === 0) this.rebuild(cx - CHUNK_SIZE, cz);
    if ((x - cx) === CHUNK_SIZE - 1) this.rebuild(cx + CHUNK_SIZE, cz);
    if ((z - cz) === 0) this.rebuild(cx, cz - CHUNK_SIZE);
    if ((z - cz) === CHUNK_SIZE - 1) this.rebuild(cx, cz + CHUNK_SIZE);
  }

  rebuild(cx: number, cz: number): void {
    if (cx < -this.world.half || cz < -this.world.half || cx >= this.world.half || cz >= this.world.half) return;
    const id = `${cx},${cz}`;
    const previous = this.chunks.get(id);
    if (previous) { this.group.remove(previous); previous.geometry.dispose(); }
    const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [];
    for (let z = cz; z < cz + CHUNK_SIZE; z++) {
      for (let x = cx; x < cx + CHUNK_SIZE; x++) {
        for (let y = 0; y < MAX_HEIGHT; y++) {
          const block = this.world.getBlock(x, y, z);
          if (!block) continue;
          for (let f = 0; f < 6; f++) {
            const face = faces[f];
            if (this.world.getBlock(x + face.n[0], y + face.n[1], z + face.n[2])) continue;
            const tile = tileFor(block, f);
            const base = block === 'glow' ? 1.35 : face.shade;
            for (const i of indices) {
              const v = face.v[i];
              positions.push(x + v[0], y + v[1], z + v[2]);
              normals.push(...face.n);
              const [u, vv] = tileUV(tile, faceUV[i][0], faceUV[i][1]);
              uvs.push(u, vv);
              const ao = this.vertexAO(x, y, z, f, v);
              colors.push(base * ao, base * ao, base * ao);
            }
          }
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.group.add(mesh);
    this.chunks.set(id, mesh);
  }

  private vertexAO(x: number, y: number, z: number, face: number, vertex: number[]): number {
    if (face === 3) return 1;
    const n = faces[face].n;
    const axes = face < 2 ? [1, 2] : face < 4 ? [0, 2] : [0, 1];
    const offsetA = [0,0,0], offsetB = [0,0,0];
    offsetA[axes[0]] = vertex[axes[0]] > 0 ? 1 : -1;
    offsetB[axes[1]] = vertex[axes[1]] > 0 ? 1 : -1;
    const solid = (dx: number, dy: number, dz: number) => this.world.isSolid(x + dx, y + dy, z + dz) ? 1 : 0;
    const a = solid(n[0] + offsetA[0], n[1] + offsetA[1], n[2] + offsetA[2]);
    const b = solid(n[0] + offsetB[0], n[1] + offsetB[1], n[2] + offsetB[2]);
    const c = solid(n[0] + offsetA[0] + offsetB[0], n[1] + offsetA[1] + offsetB[1], n[2] + offsetA[2] + offsetB[2]);
    return 1 - (a && b ? 3 : a + b + c) * .085;
  }

  getMeshes(): THREE.Mesh[] { return [...this.chunks.values()]; }
}
