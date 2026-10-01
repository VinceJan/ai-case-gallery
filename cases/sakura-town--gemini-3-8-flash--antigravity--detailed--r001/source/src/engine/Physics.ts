// src/engine/Physics.ts
// Robust, lightweight collision detection, ground heightfield, and stair-stepping.
import * as THREE from 'three';

export interface BoxCollider {
  id?: string;
  min: THREE.Vector3;
  max: THREE.Vector3;
  isTrigger?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
  metadata?: Record<string, unknown>;
}

export class PhysicsEngine {
  private static instance: PhysicsEngine;
  public static getInstance(): PhysicsEngine {
    if (!PhysicsEngine.instance) {
      PhysicsEngine.instance = new PhysicsEngine();
    }
    return PhysicsEngine.instance;
  }

  private colliders: BoxCollider[] = [];

  // Ground elevation zones
  public getGroundHeight(x: number, z: number): number {
    // 1. River Canal zone: Z between -45 and -35, across X from -90 to 90
    if (z >= -44 && z <= -34) {
      // River bed is at -2.6
      // Except where bridges exist:
      // Red bridge at X around -35
      if (x >= -40 && x <= -30) return 0.5; // Red bridge arch
      // Road bridge at X around 25
      if (x >= 18 && x <= 32) return 0.0;
      // Rail bridge at X around 60
      if (x >= 55 && x <= 65) return 1.2;
      return -2.6;
    }

    // 2. Shrine Hill: X from -65 to -15, Z from -85 to -48
    if (x <= -15 && x >= -65 && z <= -48 && z >= -85) {
      // Height rises smoothly from Z = -48 (Y=0) to Z = -65 (Y=5.0)
      const t = Math.min(1.0, Math.max(0.0, (-48 - z) / 16.0));
      return t * 5.0;
    }

    // 3. Station Platform: X from -25 to 5, Z from 22 to 28
    if (x >= -25 && x <= 5 && z >= 22 && z <= 28) {
      return 0.75; // Platform height
    }

    // Default ground level
    return 0.0;
  }

  public addCollider(
    min: THREE.Vector3,
    max: THREE.Vector3,
    options: { id?: string; isTrigger?: boolean; onEnter?: () => void; onExit?: () => void; metadata?: Record<string, unknown> } = {}
  ): BoxCollider {
    const col: BoxCollider = { min, max, ...options };
    this.colliders.push(col);
    return col;
  }

  public removeCollider(col: BoxCollider): void {
    const idx = this.colliders.indexOf(col);
    if (idx !== -1) {
      this.colliders.splice(idx, 1);
    }
  }

  public clearColliders(): void {
    this.colliders = [];
  }

  /**
   * Resolves player/NPC capsule/cylinder movement with smooth stair climbing and wall sliding.
   * Returns corrected position.
   */
  public moveActor(
    currentPos: THREE.Vector3,
    velocity: THREE.Vector3,
    actorRadius: number = 0.35,
    actorHeight: number = 1.6,
    maxStepHeight: number = 0.45
  ): { newPos: THREE.Vector3; grounded: boolean } {
    const targetPos = currentPos.clone().add(velocity);

    // 1. Check ground height at target
    const groundY = this.getGroundHeight(targetPos.x, targetPos.z);
    let newY = targetPos.y;
    let grounded = false;

    // Ground snap / gravity
    if (newY <= groundY + 0.1) {
      newY = groundY;
      grounded = true;
    }

    // Check if target requires stepping up
    const currentGroundY = this.getGroundHeight(currentPos.x, currentPos.z);
    if (groundY > currentGroundY && groundY - currentGroundY <= maxStepHeight) {
      newY = groundY;
      grounded = true;
    }

    // 2. Horizontal obstacle collisions (AABB vs Cylinder)
    let finalX = targetPos.x;
    let finalZ = targetPos.z;

    for (const col of this.colliders) {
      if (col.isTrigger) continue;

      // Check vertical overlap
      if (newY + actorHeight < col.min.y || newY > col.max.y) {
        continue;
      }

      // Check step-up: if collider top is below step height, allow walking onto it
      if (col.max.y <= currentGroundY + maxStepHeight) {
        newY = Math.max(newY, col.max.y);
        grounded = true;
        continue;
      }

      // Find closest point on AABB to target position
      const closestX = Math.max(col.min.x, Math.min(finalX, col.max.x));
      const closestZ = Math.max(col.min.z, Math.min(finalZ, col.max.z));

      const dx = finalX - closestX;
      const dz = finalZ - closestZ;
      const distSq = dx * dx + dz * dz;

      if (distSq < actorRadius * actorRadius) {
        const dist = Math.sqrt(distSq);
        if (dist > 0.0001) {
          const pushX = (dx / dist) * (actorRadius - dist);
          const pushZ = (dz / dist) * (actorRadius - dist);
          finalX += pushX;
          finalZ += pushZ;
        } else {
          // Inside collider, push out on shallower axis
          const leftPen = Math.abs(finalX - col.min.x);
          const rightPen = Math.abs(col.max.x - finalX);
          const bottomPen = Math.abs(finalZ - col.min.z);
          const topPen = Math.abs(col.max.z - finalZ);
          const minPen = Math.min(leftPen, rightPen, bottomPen, topPen);

          if (minPen === leftPen) finalX = col.min.x - actorRadius;
          else if (minPen === rightPen) finalX = col.max.x + actorRadius;
          else if (minPen === bottomPen) finalZ = col.min.z - actorRadius;
          else finalZ = col.max.z + actorRadius;
        }
      }
    }

    return {
      newPos: new THREE.Vector3(finalX, newY, finalZ),
      grounded
    };
  }

  /**
   * Helper to add a building box obstacle
   */
  public addBuildingObstacle(x: number, z: number, width: number, depth: number, height: number = 8): BoxCollider {
    const halfW = width / 2;
    const halfD = depth / 2;
    const min = new THREE.Vector3(x - halfW, 0, z - halfD);
    const max = new THREE.Vector3(x + halfW, height, z + halfD);
    return this.addCollider(min, max);
  }
}

export const physics = PhysicsEngine.getInstance();
