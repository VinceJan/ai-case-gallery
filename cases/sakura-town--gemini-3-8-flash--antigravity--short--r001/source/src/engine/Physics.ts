// src/engine/Physics.ts
// Collision boundaries, terrain sampling, and interaction trigger zones.
import * as THREE from 'three';
import { CelShaders } from './CelShaders';

export interface CollisionBox {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  minY?: number;
  maxY?: number;
  name?: string;
}

export class PhysicsEngine {
  private static instance: PhysicsEngine;
  private colliders: CollisionBox[] = [];

  public static getInstance(): PhysicsEngine {
    if (!PhysicsEngine.instance) {
      PhysicsEngine.instance = new PhysicsEngine();
    }
    return PhysicsEngine.instance;
  }

  /** Register an axis-aligned 3D obstacle */
  public addCollider(box: CollisionBox): void {
    this.colliders.push(box);
  }

  /** Register a box from center and dimensions */
  public addBox(x: number, z: number, width: number, depth: number, name?: string): void {
    this.colliders.push({
      minX: x - width / 2,
      maxX: x + width / 2,
      minZ: z - depth / 2,
      maxZ: z + depth / 2,
      name
    });
  }

  /**
   * Samples terrain elevation at (x, z), including curved world horizon deformation
   */
  public getTerrainHeight(x: number, z: number): number {
    let baseY = 0.0;

    // Shrine Hill (North-West)
    const shrineDistSq = (x - (-40)) * (x - (-40)) + (z - (-65)) * (z - (-65));
    if (shrineDistSq < 30 * 30) {
      const shrineFactor = 1.0 - Math.sqrt(shrineDistSq) / 30;
      baseY = Math.max(baseY, shrineFactor * shrineFactor * 5.2);
    }

    // River Canal Depression (Center East-West trench)
    const riverZ = -35;
    const riverWidth = 7;
    if (Math.abs(z - riverZ) < riverWidth) {
      const distFromCenter = Math.abs(z - riverZ);
      const bridgePositions = [-35, 15, 60]; // Red bridge, main street stone bridge, railway bridge
      let onBridge = false;
      for (const bx of bridgePositions) {
        if (Math.abs(x - bx) < 3.2) {
          onBridge = true;
          break;
        }
      }
      if (!onBridge) {
        // Deep canal trench
        const depth = 2.2 * (1.0 - distFromCenter / riverWidth);
        baseY -= depth;
      }
    }

    // Apply curved world vertex sag if active
    if (CelShaders.isCurvedWorld) {
      const distSq = x * x + z * z;
      const sag = distSq / (2.0 * CelShaders.curvatureRadius);
      return baseY - sag;
    }

    return baseY;
  }

  /**
   * Resolves horizontal 2D collision against registered bounding boxes
   */
  public resolveCollision(position: THREE.Vector3, radius: number = 0.45): boolean {
    let collided = false;

    for (const box of this.colliders) {
      // Find closest point on AABB to the player sphere
      const closestX = Math.max(box.minX, Math.min(position.x, box.maxX));
      const closestZ = Math.max(box.minZ, Math.min(position.z, box.maxZ));

      const distX = position.x - closestX;
      const distZ = position.z - closestZ;
      const distSq = distX * distX + distZ * distZ;

      if (distSq < radius * radius && distSq > 0.00001) {
        const dist = Math.sqrt(distSq);
        const overlap = radius - dist;
        // Push position outwards
        position.x += (distX / dist) * overlap;
        position.z += (distZ / dist) * overlap;
        collided = true;
      }
    }

    return collided;
  }

  /**
   * Checks if a point is inside an interior zone (e.g. inside Sakura Mart or Cafe)
   */
  public isInsideZone(x: number, z: number, box: CollisionBox): boolean {
    return x >= box.minX && x <= box.maxX && z >= box.minZ && z <= box.maxZ;
  }
}

export const physics = PhysicsEngine.getInstance();
