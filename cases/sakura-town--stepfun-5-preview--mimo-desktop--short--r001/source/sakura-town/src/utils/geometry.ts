import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * 累积带色图元并合并为单一网格（顶点色 + MeshToonMaterial），
 * 让每个建筑/道具只占 1 个 draw call，同时保留 cel/toon 观感。
 */
export class MeshBuilder {
  private readonly parts: THREE.BufferGeometry[] = [];

  private push(geometry: THREE.BufferGeometry, color: string): void {
    const c = new THREE.Color(color);
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.parts.push(geometry);
  }

  addBox(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    color: string,
    rotY = 0,
  ): void {
    const g = new THREE.BoxGeometry(w, h, d);
    if (rotY !== 0) g.rotateY(rotY);
    g.translate(x, y, z);
    this.push(g, color);
  }

  addCylinder(
    rTop: number,
    rBottom: number,
    h: number,
    x: number,
    y: number,
    z: number,
    color: string,
    segments = 10,
  ): void {
    const g = new THREE.CylinderGeometry(rTop, rBottom, h, segments);
    g.translate(x, y, z);
    this.push(g, color);
  }

  addSphere(r: number, x: number, y: number, z: number, color: string, squashY = 1): void {
    const g = new THREE.SphereGeometry(r, 10, 8);
    if (squashY !== 1) g.scale(1, squashY, 1);
    g.translate(x, y, z);
    this.push(g, color);
  }

  addCone(r: number, h: number, x: number, y: number, z: number, color: string, segments = 8): void {
    const g = new THREE.ConeGeometry(r, h, segments);
    g.translate(x, y, z);
    this.push(g, color);
  }

  /** 直接加入已摆好位置的几何（如屋顶斜面）。 */
  addGeometry(geometry: THREE.BufferGeometry, color: string): void {
    this.push(geometry, color);
  }

  get empty(): boolean {
    return this.parts.length === 0;
  }

  build(): THREE.BufferGeometry | null {
    if (this.parts.length === 0) return null;
    const merged = mergeGeometries(this.parts, false);
    for (const part of this.parts) part.dispose();
    this.parts.length = 0;
    if (!merged) return null;
    merged.computeBoundingSphere();
    return merged;
  }
}

/**  cel/toon 共用料：顶点色 + 梯度贴图。 */
export function createToonMaterial(gradientMap: THREE.Texture): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ vertexColors: true, gradientMap });
}
