import * as THREE from 'three';
import type { NpcDef } from '../game/types';
import { createNameTagTexture } from '../utils/textures';

export type NpcLocation = { buildingId?: string; spotId?: string };

const NPC_SPEED = 2.1;

/** 小镇居民：外形 + 沿路网移动 + 简单行走动画。 */
export class Npc {
  readonly group = new THREE.Group();
  readonly def: NpcDef;
  /** 当前语义位置（用于交互与内装归属）。 */
  location: NpcLocation = {};
  path: { x: number; z: number }[] = [];
  pathIndex = 0;
  paused = false;
  /** 对话中：面向玩家。 */
  talking = false;

  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];
  private readonly legs: THREE.Mesh[] = [];
  private readonly arms: THREE.Mesh[] = [];
  private readonly bodyPivot = new THREE.Group();
  private readonly nameSprite: THREE.Sprite;
  private walkPhase = 0;

  constructor(def: NpcDef) {
    this.def = def;
    const { skin, hair, top, bottom } = def.palette;
    const skinMat = new THREE.MeshToonMaterial({ color: skin });
    const hairMat = new THREE.MeshToonMaterial({ color: hair });
    const topMat = new THREE.MeshToonMaterial({ color: top });
    const bottomMat = new THREE.MeshToonMaterial({ color: bottom });
    this.materials.push(skinMat, hairMat, topMat, bottomMat);

    const bodyGeo = new THREE.CapsuleGeometry(0.28, 0.46, 4, 10);
    const headGeo = new THREE.SphereGeometry(0.25, 12, 10);
    const hairGeo = new THREE.SphereGeometry(0.265, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const legGeo = new THREE.CapsuleGeometry(0.095, 0.4, 3, 8);
    const armGeo = new THREE.CapsuleGeometry(0.075, 0.34, 3, 8);
    this.geometries.push(bodyGeo, headGeo, hairGeo, legGeo, armGeo);

    const body = new THREE.Mesh(bodyGeo, topMat);
    body.position.y = 0.97;
    body.castShadow = true;
    this.bodyPivot.add(body);

    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.42;
    head.castShadow = true;
    this.bodyPivot.add(head);

    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0, 1.44, -0.02);
    hairMesh.castShadow = true;
    this.bodyPivot.add(hairMesh);

    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(legGeo, bottomMat);
      leg.position.set(side * 0.13, 0.33, 0);
      leg.castShadow = true;
      this.bodyPivot.add(leg);
      this.legs.push(leg);

      const arm = new THREE.Mesh(armGeo, topMat);
      arm.position.set(side * 0.36, 1.04, 0);
      arm.castShadow = true;
      this.bodyPivot.add(arm);
      this.arms.push(arm);
    }

    this.group.add(this.bodyPivot);

    const nameTex = createNameTagTexture(def.name);
    this.nameSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: nameTex, transparent: true, depthTest: true }),
    );
    this.nameSprite.position.y = 2.05;
    this.nameSprite.scale.set(1.5, 0.375, 1);
    this.group.add(this.nameSprite);
  }

  get position(): THREE.Vector3 {
    return this.group.position;
  }

  get moving(): boolean {
    return this.pathIndex < this.path.length;
  }

  setPath(points: { x: number; z: number }[]): void {
    this.path = points;
    this.pathIndex = 0;
  }

  /** 传送到某处（切换场景/昼夜重置时）。 */
  teleport(x: number, z: number, y = 0): void {
    this.group.position.set(x, y, z);
    this.path = [];
    this.pathIndex = 0;
  }

  faceTo(x: number, z: number): void {
    const dx = x - this.group.position.x;
    const dz = z - this.group.position.z;
    if (Math.abs(dx) + Math.abs(dz) > 0.01) {
      this.group.rotation.y = Math.atan2(dx, dz);
    }
  }

  update(delta: number): void {
    if (this.talking) {
      this.stabilizeVisuals();
      return;
    }
    if (!this.paused && this.pathIndex < this.path.length) {
      const target = this.path[this.pathIndex];
      const dx = target.x - this.group.position.x;
      const dz = target.z - this.group.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.25) {
        this.pathIndex += 1;
      } else {
        const step = Math.min(NPC_SPEED * delta, dist);
        this.group.position.x += (dx / dist) * step;
        this.group.position.z += (dz / dist) * step;
        this.group.rotation.y = Math.atan2(dx, dz);
        this.walkPhase += delta * NPC_SPEED * 2.4;
      }
    } else {
      this.walkPhase += delta * 0.5;
    }

    const swing = Math.sin(this.walkPhase) * (this.moving ? 0.8 : 0.06);
    this.legs[0].rotation.x = swing;
    this.legs[1].rotation.x = -swing;
    this.arms[0].rotation.x = -swing * 0.55;
    this.arms[1].rotation.x = swing * 0.55;
    this.bodyPivot.position.y = Math.abs(Math.sin(this.walkPhase)) * (this.moving ? 0.04 : 0.012);
  }

  setNameTagVisible(visible: boolean): void {
    this.nameSprite.visible = visible;
  }

  stabilizeVisuals(): void {
    this.walkPhase = 0;
    this.legs[0].rotation.x = 0;
    this.legs[1].rotation.x = 0;
    this.arms[0].rotation.x = 0;
    this.arms[1].rotation.x = 0;
    this.bodyPivot.position.y = 0;
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
    this.nameSprite.material.dispose();
    this.nameSprite.material.map?.dispose();
  }
}
