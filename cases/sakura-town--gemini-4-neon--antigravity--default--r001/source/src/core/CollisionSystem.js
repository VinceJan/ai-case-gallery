export class CollisionSystem {
  constructor() {
    this.boxes = [];
    this.circles = [];
    this.cameraBoxes = []; // 3D AABBs for third-person spring-arm camera occlusion prevention
    this.bounds = { minX: -54, maxX: 56, minZ: -44, maxZ: 34 };
  }

  addCameraBox(minX, minY, minZ, maxX, maxY, maxZ, buildingId = null) {
    this.cameraBoxes.push({
      minX: Math.min(minX, maxX), maxX: Math.max(minX, maxX),
      minY: Math.min(minY, maxY), maxY: Math.max(minY, maxY),
      minZ: Math.min(minZ, maxZ), maxZ: Math.max(minZ, maxZ),
      buildingId,
    });
  }

  // Slab raycast from origin -> target; returns closest hit t in (0, 1] or 1 if unobstructed
  castCameraRay(ox, oy, oz, tx, ty, tz, ignoreBuildingId = null) {
    const dx = tx - ox;
    const dy = ty - oy;
    const dz = tz - oz;
    let closestT = 1.0;

    for (const b of this.cameraBoxes) {
      if (ignoreBuildingId && b.buildingId === ignoreBuildingId) continue;

      let tMin = 0.0;
      let tMax = closestT;

      // X slab
      if (Math.abs(dx) < 1e-6) {
        if (ox < b.minX || ox > b.maxX) continue;
      } else {
        let t1 = (b.minX - ox) / dx;
        let t2 = (b.maxX - ox) / dx;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tMin = Math.max(tMin, t1);
        tMax = Math.min(tMax, t2);
        if (tMin > tMax) continue;
      }

      // Y slab
      if (Math.abs(dy) < 1e-6) {
        if (oy < b.minY || oy > b.maxY) continue;
      } else {
        let t1 = (b.minY - oy) / dy;
        let t2 = (b.maxY - oy) / dy;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tMin = Math.max(tMin, t1);
        tMax = Math.min(tMax, t2);
        if (tMin > tMax) continue;
      }

      // Z slab
      if (Math.abs(dz) < 1e-6) {
        if (oz < b.minZ || oz > b.maxZ) continue;
      } else {
        let t1 = (b.minZ - oz) / dz;
        let t2 = (b.maxZ - oz) / dz;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tMin = Math.max(tMin, t1);
        tMax = Math.min(tMax, t2);
        if (tMin > tMax) continue;
      }

      if (tMin > 0.02 && tMin < closestT) {
        closestT = tMin;
      }
    }
    return closestT;
  }

  addBox(minX, minZ, maxX, maxZ, id = null) {
    const box = {
      id,
      minX: Math.min(minX, maxX),
      maxX: Math.max(minX, maxX),
      minZ: Math.min(minZ, maxZ),
      maxZ: Math.max(minZ, maxZ),
      active: true,
    };
    this.boxes.push(box);
    return box;
  }

  addBoxCenter(cx, cz, width, depth, id = null) {
    return this.addBox(cx - width / 2, cz - depth / 2, cx + width / 2, cz + depth / 2, id);
  }

  addCircle(x, z, r, id = null) {
    const c = { id, x, z, r, active: true };
    this.circles.push(c);
    return c;
  }

  setActiveById(id, active) {
    for (const b of this.boxes) if (b.id === id) b.active = active;
    for (const c of this.circles) if (c.id === id) c.active = active;
  }

  static getRiverCenterX(z) {
    return 29 + Math.sin(z * 0.045) * 2.2;
  }

  // Exact terrain surface height (shared by mesh builder and tree placement so zero trees float!)
  static getTerrainMeshHeight(x, z) {
    let y = 0;
    const rc = CollisionSystem.getRiverCenterX(z);
    const distRiver = Math.abs(x - rc);
    if (distRiver < 6.8) {
      if (distRiver < 4.5) y = -1.85;
      else {
        const bankT = (distRiver - 4.5) / (6.8 - 4.5);
        y = -1.85 * (1 - bankT);
      }
    }

    if (x >= 36.2 && z >= -18 && z <= 8) {
      if (x >= 40.6 && x <= 55.5 && z >= -15.5 && z <= 1.2) {
        y = Math.max(y, 2.0);
      } else {
        const dx = Math.max(0, Math.min(1, (x - 36.2) / 5.2));
        const dz = z > 1.2 ? Math.max(0, 1 - (z - 1.2) / 6.5) : 1;
        y = Math.max(y, 2.0 * dx * dz);
      }
    }

    const edgeX = Math.max(0, Math.abs(x) - 55);
    const edgeZPos = Math.max(0, z - 35);
    const edgeZNeg = Math.max(0, -37 - z);
    const hillDist = Math.sqrt(edgeX * edgeX + edgeZPos * edgeZPos + edgeZNeg * edgeZNeg);
    if (hillDist > 0) {
      const nearRail = Math.abs(z + 18) < 7.5 && Math.abs(x) < 108;
      const nearRiverPass = Math.abs(x - rc) < 8.5;
      const passFactor = nearRail || nearRiverPass ? 0.08 : 1.0;
      const undulation = 1 + 0.25 * Math.sin(x * 0.08) * Math.cos(z * 0.07);
      y += Math.pow(hillDist / 16, 1.55) * 4.5 * undulation * passFactor;
    }

    return y;
  }

  // Analytical walkable height including bridge, pier, station platform, stairs, and terrain
  static getGroundHeight(x, z) {
    if (z >= -0.3 && z <= 4.5 && x >= 21.2 && x <= 36.8) {
      const t = (x - 21.2) / (36.8 - 21.2);
      return 0.18 + Math.sin(t * Math.PI) * 0.95;
    }
    if (z >= 11.4 && z <= 16.6 && x >= 21.4 && x <= 27.0) {
      return -0.62;
    }
    if (z >= 12.2 && z <= 15.8 && x >= 19.3 && x < 21.4) {
      const t = (x - 19.3) / (21.4 - 19.3);
      return -0.62 * t;
    }
    if (x >= -26.5 && x <= -10.5 && z >= -24.4 && z <= -19.9) {
      if (x > -12.2) {
        const t = (x - -10.5) / (-12.2 - -10.5);
        return 0.65 * Math.min(1, Math.max(0, t));
      }
      return 0.65;
    }
    if (x >= 36.8 && x < 40.6 && z >= -0.8 && z <= 4.2) {
      const t = (x - 36.8) / (40.6 - 36.8);
      return 2.0 * Math.min(1, Math.max(0, t));
    }
    return CollisionSystem.getTerrainMeshHeight(x, z);
  }

  resolve(x, z, r = 0.42, allowCrossing = false) {
    let rx = Math.max(this.bounds.minX + r, Math.min(this.bounds.maxX - r, x));
    let rz = Math.max(this.bounds.minZ + r, Math.min(this.bounds.maxZ - r, z));

    const onBridge = rz >= 0.1 && rz <= 4.1 && rx >= 20.8 && rx <= 37.2;
    const onPier = rz >= 11.7 && rz <= 16.3 && rx >= 20.5 && rx <= 26.6;
    if (!onBridge && !onPier) {
      const rc = CollisionSystem.getRiverCenterX(rz);
      const minBankDist = 5.3 + r;
      const dxRiver = rx - rc;
      if (Math.abs(dxRiver) < minBankDist) {
        rx = rc + (dxRiver < 0 ? -minBankDist : minBankDist);
      }
    }

    for (let iter = 0; iter < 3; iter++) {
      for (const b of this.boxes) {
        if (!b.active) continue;
        if (allowCrossing && b.id === 'crossing_gate') continue;

        const closestX = Math.max(b.minX, Math.min(rx, b.maxX));
        const closestZ = Math.max(b.minZ, Math.min(rz, b.maxZ));
        const dx = rx - closestX;
        const dz = rz - closestZ;
        const distSq = dx * dx + dz * dz;

        if (distSq < r * r) {
          if (distSq > 0.00001) {
            const dist = Math.sqrt(distSq);
            const push = r - dist;
            rx += (dx / dist) * push;
            rz += (dz / dist) * push;
          } else {
            const dLeft = Math.abs(rx - b.minX);
            const dRight = Math.abs(b.maxX - rx);
            const dTop = Math.abs(rz - b.minZ);
            const dBot = Math.abs(b.maxZ - rz);
            const m = Math.min(dLeft, dRight, dTop, dBot);
            if (m === dLeft) rx = b.minX - r;
            else if (m === dRight) rx = b.maxX + r;
            else if (m === dTop) rz = b.minZ - r;
            else rz = b.maxZ + r;
          }
        }
      }

      for (const c of this.circles) {
        if (!c.active) continue;
        const dx = rx - c.x;
        const dz = rz - c.z;
        const minDist = r + c.r;
        const distSq = dx * dx + dz * dz;
        if (distSq < minDist * minDist && distSq > 0.00001) {
          const dist = Math.sqrt(distSq);
          const push = minDist - dist;
          rx += (dx / dist) * push;
          rz += (dz / dist) * push;
        }
      }
    }

    return { x: rx, z: rz };
  }
}
