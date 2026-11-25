/**
 * Lightweight 2D collision & ground-height engine for Sakura Town.
 * Keeps movement completely smooth, predictable, and impossible to get stuck in.
 */

export class CollisionWorld {
  constructor() {
    /** @type {Array<{id:string, minX:number, maxX:number, minZ:number, maxZ:number, active:boolean, tag?:string}>} */
    this.boxes = [];
    /** @type {Array<{x:number, z:number, r:number, active:boolean}>} */
    this.circles = [];
    // Soft natural basin bounds (well inside mountains/trees)
    this.bounds = { minX: -50, maxX: 50, minZ: -48, maxZ: 42 };
  }

  addBox(minX, maxX, minZ, maxZ, opts = {}) {
    const box = {
      id: opts.id || `box_${this.boxes.length}`,
      minX: Math.min(minX, maxX),
      maxX: Math.max(minX, maxX),
      minZ: Math.min(minZ, maxZ),
      maxZ: Math.max(minZ, maxZ),
      active: opts.active ?? true,
      tag: opts.tag || 'solid',
    };
    this.boxes.push(box);
    return box;
  }

  addBoxCenter(cx, cz, w, d, opts = {}) {
    return this.addBox(cx - w / 2, cx + w / 2, cz - d / 2, cz + d / 2, opts);
  }

  addCircle(x, z, r, opts = {}) {
    const c = { x, z, r, active: opts.active ?? true };
    this.circles.push(c);
    return c;
  }

  /**
   * Add a hollow enterable room made of 4 wall strips, with a doorway opening on one side.
   * doorSide: 'north' (-Z) | 'south' (+Z) | 'east' (+X) | 'west' (-X)
   */
  addRoomWalls(cx, cz, w, d, wallThick, doorSide, doorWidth, doorOffset = 0) {
    const x0 = cx - w / 2;
    const x1 = cx + w / 2;
    const z0 = cz - d / 2;
    const z1 = cz + d / 2;
    const halfDoor = doorWidth / 2;

    // North wall (z0)
    if (doorSide === 'north') {
      const dx = cx + doorOffset;
      if (dx - halfDoor > x0 + 0.05) this.addBox(x0, dx - halfDoor, z0 - wallThick / 2, z0 + wallThick / 2);
      if (x1 > dx + halfDoor + 0.05) this.addBox(dx + halfDoor, x1, z0 - wallThick / 2, z0 + wallThick / 2);
    } else {
      this.addBox(x0, x1, z0 - wallThick / 2, z0 + wallThick / 2);
    }

    // South wall (z1)
    if (doorSide === 'south') {
      const dx = cx + doorOffset;
      if (dx - halfDoor > x0 + 0.05) this.addBox(x0, dx - halfDoor, z1 - wallThick / 2, z1 + wallThick / 2);
      if (x1 > dx + halfDoor + 0.05) this.addBox(dx + halfDoor, x1, z1 - wallThick / 2, z1 + wallThick / 2);
    } else {
      this.addBox(x0, x1, z1 - wallThick / 2, z1 + wallThick / 2);
    }

    // West wall (x0)
    if (doorSide === 'west') {
      const dz = cz + doorOffset;
      if (dz - halfDoor > z0 + 0.05) this.addBox(x0 - wallThick / 2, x0 + wallThick / 2, z0, dz - halfDoor);
      if (z1 > dz + halfDoor + 0.05) this.addBox(x0 - wallThick / 2, x0 + wallThick / 2, dz + halfDoor, z1);
    } else {
      this.addBox(x0 - wallThick / 2, x0 + wallThick / 2, z0, z1);
    }

    // East wall (x1)
    if (doorSide === 'east') {
      const dz = cz + doorOffset;
      if (dz - halfDoor > z0 + 0.05) this.addBox(x1 - wallThick / 2, x1 + wallThick / 2, z0, dz - halfDoor);
      if (z1 > dz + halfDoor + 0.05) this.addBox(x1 - wallThick / 2, x1 + wallThick / 2, dz + halfDoor, z1);
    } else {
      this.addBox(x1 - wallThick / 2, x1 + wallThick / 2, z0, z1);
    }
  }

  /**
   * Resolve circle (x, z, radius) against all active colliders with smooth sliding.
   */
  resolve(x, z, radius = 0.42, ignoreTags = null) {
    let rx = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, x));
    let rz = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, z));

    // Two iterations prevent corner jitter
    for (let iter = 0; iter < 2; iter++) {
      for (let i = 0; i < this.boxes.length; i++) {
        const b = this.boxes[i];
        if (!b.active) continue;
        if (ignoreTags && ignoreTags.includes(b.tag)) continue;

        const closestX = Math.max(b.minX, Math.min(rx, b.maxX));
        const closestZ = Math.max(b.minZ, Math.min(rz, b.maxZ));
        const dx = rx - closestX;
        const dz = rz - closestZ;
        const distSq = dx * dx + dz * dz;

        if (distSq < radius * radius) {
          if (distSq > 1e-6) {
            const dist = Math.sqrt(distSq);
            const push = radius - dist;
            rx += (dx / dist) * push;
            rz += (dz / dist) * push;
          } else {
            // Center is inside box; push out along shallowest axis
            const left = rx - b.minX;
            const right = b.maxX - rx;
            const top = rz - b.minZ;
            const bottom = b.maxZ - rz;
            const m = Math.min(left, right, top, bottom);
            if (m === left) rx = b.minX - radius;
            else if (m === right) rx = b.maxX + radius;
            else if (m === top) rz = b.minZ - radius;
            else rz = b.maxZ + radius;
          }
        }
      }

      for (let i = 0; i < this.circles.length; i++) {
        const c = this.circles[i];
        if (!c.active) continue;
        const dx = rx - c.x;
        const dz = rz - c.z;
        const minDist = radius + c.r;
        const distSq = dx * dx + dz * dz;
        if (distSq < minDist * minDist && distSq > 1e-6) {
          const dist = Math.sqrt(distSq);
          const push = minDist - dist;
          rx += (dx / dist) * push;
          rz += (dz / dist) * push;
        }
      }
    }

    return { x: rx, z: rz };
  }

  /**
   * Analytic ground elevation for stairs, bridge, station platform, and shrine hill.
   */
  getGroundHeight(x, z) {
    // 1. River bridge arch at X in [-3.1, 3.1], Z in [23.8, 34.2]
    if (Math.abs(x) <= 3.15 && z >= 23.8 && z <= 34.2) {
      const t = (z - 29.0) / 5.2; // -1 to 1
      return Math.max(0, Math.cos(t * Math.PI * 0.5) * 0.72);
    }

    // 2. Sakura Station raised platform (X in [-22.5, -4.0], Z in [-18.2, -14.0])
    if (x >= -22.5 && x <= -4.0 && z >= -18.2 && z <= -14.0) {
      // Smooth ramp on north edge connecting to station entrance (Z = -18.2)
      if (z < -17.4) {
        const t = (z - -18.2) / 0.8;
        return 0.45 * Math.max(0, Math.min(1, t));
      }
      return 0.45;
    }

    // 3. Sakura Shrine hill & stone staircase (North-East ridge around X in [8, 28], Z in [-46, -24])
    if (x >= 7 && x <= 29 && z <= -24 && z >= -47) {
      // Stone stairs along X in [13.5, 18.5], Z from -24 to -33
      if (z >= -33.2) {
        const t = Math.max(0, Math.min(1, (-24 - z) / 9.0));
        return t * 3.0;
      }
      // Upper shrine terrace plateau
      return 3.0;
    }

    return 0;
  }

  /**
   * Returns a human-readable Japanese/Chinese location name for the HUD.
   */
  getLocationName(x, z) {
    if (x >= -20.5 && x <= -9.5 && z >= 6.5 && z <= 14.5) return '桜マート · 便利店内';
    if (x >= 9.5 && x <= 20.5 && z >= 6.5 && z <= 14.5) return '喫茶 こもれび · 店内';
    if (x >= -30.5 && x <= -21.5 && z >= -30.5 && z <= -22.5) return '桜荘 · 你的房间';
    if (x >= -16.2 && x <= -6.8 && z >= -23.0 && z <= -18.2) return '桜駅 · 候车室';
    if (x >= -22.5 && x <= -4.0 && z >= -18.2 && z <= -13.5) return '桜駅 · 月台';
    if (Math.abs(x) <= 5.5 && z >= -14 && z <= -9.5) return '桜町 · 铁路道口';
    if (x >= 8 && x <= 29 && z <= -28) return '桜神社 · 山坡展望台';
    if (x >= 29 && z <= -16 && z >= -32) return '山脚林道 · 旧木屋';
    if (z >= 22) return '桜川 · 河畔公园';
    if (z >= -4 && z <= 18) return '桜通り · 商店街';
    if (z <= -18 && x < 8) return '桜丘 · 住宅小巷';
    return '樱花小镇 · 街道';
  }
}
