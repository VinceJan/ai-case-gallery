import * as THREE from 'three';
import type { InputController } from '../core/InputController';
import type { BoxCollider } from '../world/buildings';

export interface PlayerTuning {
  speed: number;
  acceleration: number;
}

export interface CircleCollider {
  x: number;
  z: number;
  r: number;
}

export interface CollisionField {
  boxes: BoxCollider[];
  circles: CircleCollider[];
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

const PLAYER_RADIUS = 0.42;

/** 圆 vs AABB 推出。 */
function resolveCircleBox(
  position: THREE.Vector3,
  radius: number,
  box: BoxCollider,
): void {
  const dx = position.x - box.x;
  const dz = position.z - box.z;
  const overlapX = box.hw + radius - Math.abs(dx);
  const overlapZ = box.hd + radius - Math.abs(dz);
  if (overlapX <= 0 || overlapZ <= 0) return;
  if (overlapX < overlapZ) {
    position.x += Math.sign(dx) * overlapX;
  } else {
    position.z += Math.sign(dz) * overlapZ;
  }
}

export class Player {
  readonly group = new THREE.Group();
  readonly velocity = new THREE.Vector3();

  private readonly move = new THREE.Vector2();
  private readonly targetVelocity = new THREE.Vector3();
  private walkPhase = 0;
  private field: CollisionField = {
    boxes: [],
    circles: [],
    minX: -78,
    maxX: 78,
    minZ: -74,
    maxZ: 62,
  };

  private readonly legs: THREE.Mesh[] = [];
  private readonly arms: THREE.Mesh[] = [];
  private readonly bodyPivot = new THREE.Group();
  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];

  constructor() {
    const skin = new THREE.MeshToonMaterial({ color: '#f2c9a0' });
    const hair = new THREE.MeshToonMaterial({ color: '#3a2e26' });
    const jacket = new THREE.MeshToonMaterial({ color: '#e8c85a' });
    const pants = new THREE.MeshToonMaterial({ color: '#4a5a7a' });
    const shoes = new THREE.MeshToonMaterial({ color: '#d86a4a' });
    this.materials.push(skin, hair, jacket, pants, shoes);

    const bodyGeo = new THREE.CapsuleGeometry(0.3, 0.5, 4, 10);
    const headGeo = new THREE.SphereGeometry(0.26, 12, 10);
    const hairGeo = new THREE.SphereGeometry(0.275, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const legGeo = new THREE.CapsuleGeometry(0.1, 0.42, 3, 8);
    const armGeo = new THREE.CapsuleGeometry(0.08, 0.36, 3, 8);
    this.geometries.push(bodyGeo, headGeo, hairGeo, legGeo, armGeo);

    const body = new THREE.Mesh(bodyGeo, jacket);
    body.position.y = 1.02;
    body.castShadow = true;
    this.bodyPivot.add(body);

    const head = new THREE.Mesh(headGeo, skin);
    head.position.y = 1.48;
    head.castShadow = true;
    this.bodyPivot.add(head);

    const hairMesh = new THREE.Mesh(hairGeo, hair);
    hairMesh.position.set(0, 1.5, -0.02);
    hairMesh.castShadow = true;
    this.bodyPivot.add(hairMesh);

    // 背包
    const packGeo = new THREE.BoxGeometry(0.34, 0.4, 0.18);
    this.geometries.push(packGeo);
    const pack = new THREE.Mesh(packGeo, pants);
    pack.position.set(0, 1.05, -0.3);
    pack.castShadow = true;
    this.bodyPivot.add(pack);

    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(legGeo, pants);
      leg.position.set(side * 0.14, 0.34, 0);
      leg.castShadow = true;
      this.bodyPivot.add(leg);
      this.legs.push(leg);

      const arm = new THREE.Mesh(armGeo, skin);
      arm.position.set(side * 0.38, 1.1, 0);
      arm.castShadow = true;
      this.bodyPivot.add(arm);
      this.arms.push(arm);
    }

    this.group.add(this.bodyPivot);
    this.group.position.set(-18, 0, 16.8);
  }

  setField(field: CollisionField): void {
    this.field = field;
  }

  update(
    delta: number,
    elapsed: number,
    input: InputController,
    tuning: PlayerTuning,
    cameraYaw: number,
  ): void {
    input.readMovement(this.move);
    // 相机相对移动：forward = 远离相机方向；move.y 为负表示“前进”
    const fx = -Math.sin(cameraYaw);
    const fz = -Math.cos(cameraYaw);
    const rx = -fz;
    const rz = fx;
    this.targetVelocity.set(
      rx * this.move.x - fx * this.move.y,
      0,
      rz * this.move.x - fz * this.move.y,
    );
    if (this.targetVelocity.lengthSq() > 1) this.targetVelocity.normalize();
    this.targetVelocity.multiplyScalar(tuning.speed);

    const smoothing = 1 - Math.exp(-tuning.acceleration * delta);
    this.velocity.lerp(this.targetVelocity, smoothing);
    this.group.position.addScaledVector(this.velocity, delta);

    this.collide();

    const speed = this.velocity.length();
    if (speed > 0.4) {
      this.group.rotation.y = Math.atan2(this.velocity.x, this.velocity.z);
      this.walkPhase += delta * speed * 2.1;
    } else {
      this.walkPhase += delta * 0.6;
    }

    // 行走摆动：腿/臂交替，身体轻颠
    const swing = Math.sin(this.walkPhase) * Math.min(speed / tuning.speed, 1);
    this.legs[0].rotation.x = swing * 0.85;
    this.legs[1].rotation.x = -swing * 0.85;
    this.arms[0].rotation.x = -swing * 0.6;
    this.arms[1].rotation.x = swing * 0.6;
    this.bodyPivot.position.y = Math.abs(Math.sin(this.walkPhase)) * 0.045 * Math.min(speed / tuning.speed, 1);
    this.bodyPivot.rotation.y = Math.sin(elapsed * 0.8) * 0.02;
  }

  private collide(): void {
    const p = this.group.position;
    p.x = THREE.MathUtils.clamp(p.x, this.field.minX, this.field.maxX);
    p.z = THREE.MathUtils.clamp(p.z, this.field.minZ, this.field.maxZ);
    for (const box of this.field.boxes) {
      resolveCircleBox(p, PLAYER_RADIUS, box);
    }
    for (const circle of this.field.circles) {
      const dx = p.x - circle.x;
      const dz = p.z - circle.z;
      const min = circle.r + PLAYER_RADIUS;
      const distSq = dx * dx + dz * dz;
      if (distSq < min * min && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        p.x = circle.x + (dx / dist) * min;
        p.z = circle.z + (dz / dist) * min;
      }
    }
  }

  reset(x = -18, z = 16.8, y = 0): void {
    this.group.position.set(x, y, z);
    this.group.rotation.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.move.set(0, 0);
    this.targetVelocity.set(0, 0, 0);
    this.stabilizeVisuals();
  }

  stabilizeVisuals(): void {
    this.walkPhase = 0;
    this.legs[0].rotation.x = 0;
    this.legs[1].rotation.x = 0;
    this.arms[0].rotation.x = 0;
    this.arms[1].rotation.x = 0;
    this.bodyPivot.position.y = 0;
    this.bodyPivot.rotation.y = 0;
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
  }
}
