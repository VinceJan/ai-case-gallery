/**
 * Closed-loop railway: track, overhead wires, crossings, signals, station platform.
 * Train runs the loop independently of the player.
 */
import * as THREE from 'three';
import { placeOnPlanet, surfacePoint, surfaceNormal } from './Planet.js';
import { toonMaterial, unlitMaterial, concreteTexture } from '../utils/materials.js';

// Loop path in layout space (roughly follows the outer ring)
export const RAIL_LOOP = [
  [8, -52],
  [32, -48],
  [52, -28],
  [58, 0],
  [52, 28],
  [32, 48],
  [4, 56],
  [-26, 50],
  [-48, 30],
  [-56, 2],
  [-50, -26],
  [-28, -46],
  [-2, -54],
  [8, -52],
];

export function buildRailway(scene) {
  const group = new THREE.Group();
  group.name = 'railway';

  const railMat = toonMaterial('#5a5e66');
  const sleeperMat = toonMaterial('#4a3a2c');
  const gravelMat = toonMaterial('#7a746c');
  const wireMat = unlitMaterial('#2a2a2a');
  const poleMat = toonMaterial('#6a6a72');

  for (let i = 0; i < RAIL_LOOP.length - 1; i++) {
    const a = RAIL_LOOP[i];
    const b = RAIL_LOOP[i + 1];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    const yaw = Math.atan2(dx, dz);
    const mx = (a[0] + b[0]) / 2;
    const mz = (a[1] + b[1]) / 2;

    // gravel bed
    const bed = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.25, len + 0.4), gravelMat);
    placeOnPlanet(bed, mx, mz, 0.12, yaw);
    group.add(bed);

    // rails
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, len + 0.3), railMat);
      const ox = Math.cos(yaw) * 0.72 * side;
      const oz = -Math.sin(yaw) * 0.72 * side;
      placeOnPlanet(rail, mx + ox, mz + oz, 0.3, yaw);
      group.add(rail);
    }

    // sleepers
    const n = Math.max(2, Math.floor(len / 1.4));
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n;
      const x = a[0] + dx * t;
      const z = a[1] + dz * t;
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.35), sleeperMat);
      placeOnPlanet(sleeper, x, z, 0.24, yaw);
      group.add(sleeper);
    }

    // catenary poles
    const poles = Math.max(1, Math.floor(len / 22));
    for (let k = 0; k < poles; k++) {
      const t = (k + 0.3) / poles;
      const x = a[0] + dx * t + Math.cos(yaw) * 3.2;
      const z = a[1] + dz * t - Math.sin(yaw) * 3.2;
      const pole = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 6.5, 8), poleMat);
      shaft.position.y = 3.25;
      pole.add(shaft);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.1), poleMat);
      arm.position.set(-1.2, 6.2, 0);
      pole.add(arm);
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 4), wireMat);
      wire.rotation.z = Math.PI / 2;
      wire.position.set(-1.2, 6.05, 0);
      pole.add(wire);
      placeOnPlanet(pole, x, z, 0.15, yaw);
      group.add(pole);
    }
  }

  // Overhead wire polyline (simplified long segments along loop)
  for (let i = 0; i < RAIL_LOOP.length - 1; i++) {
    const a = RAIL_LOOP[i];
    const b = RAIL_LOOP[i + 1];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    const yaw = Math.atan2(dx, dz);
    const mx = (a[0] + b[0]) / 2;
    const mz = (a[1] + b[1]) / 2;
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, len, 4), wireMat);
    wire.rotation.x = Math.PI / 2;
    wire.rotation.z = 0;
    // align with path
    const wireGroup = new THREE.Group();
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, len), wireMat);
    w.position.y = 5.95;
    wireGroup.add(w);
    placeOnPlanet(wireGroup, mx, mz, 0, yaw);
    group.add(wireGroup);
  }

  // Railroad crossing near station approach (layout coords)
  const crossing = createCrossing(0, -42);
  placeOnPlanet(crossing.group, 0, -42, 0.1, 0);
  group.add(crossing.group);

  // Second crossing on east
  const crossing2 = createCrossing(48, -8);
  placeOnPlanet(crossing2.group, 48, -8, 0.1, Math.PI / 2);
  group.add(crossing2.group);

  scene.add(group);

  return {
    group,
    loop: RAIL_LOOP,
    crossings: [crossing, crossing2],
  };
}

function createCrossing(x, z) {
  const g = new THREE.Group();
  const white = toonMaterial('#f0f0f0');
  const red = toonMaterial('#d04040');
  const metal = toonMaterial('#3a3a42');

  // road strip over rails
  const road = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.2, 5.5), toonMaterial('#4a5058'));
  road.position.y = 0.22;
  g.add(road);

  // crossbuck signs
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.4, 8), metal);
    post.position.set(side * 3.2, 1.2, 0);
    g.add(post);

    const sign = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.08), white);
    sign.position.set(side * 3.2, 2.2, 0);
    sign.rotation.z = Math.PI / 4;
    g.add(sign);
    const sign2 = sign.clone();
    sign2.rotation.z = -Math.PI / 4;
    g.add(sign2);

    // flashing lights
    const lightA = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), toonMaterial('#ff3030', { emissive: '#ff2020', emissiveIntensity: 0.2 }));
    lightA.position.set(side * 3.2, 1.7, 0.15);
    lightA.name = 'crossLightA';
    g.add(lightA);
    const lightB = lightA.clone();
    lightB.position.x = side * 3.2 + 0.35 * side;
    lightB.name = 'crossLightB';
    g.add(lightB);

    // gate arm
    const arm = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 0.12), red);
    bar.position.x = side * 1.6;
    arm.add(bar);
    // stripes
    for (let i = 0; i < 4; i++) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.14), white);
      stripe.position.x = side * (0.5 + i * 0.75);
      arm.add(stripe);
    }
    arm.position.set(side * 3.2, 1.35, 0);
    arm.rotation.z = 0; // open (up)
    arm.name = 'gateArm';
    arm.userData = { side };
    g.add(arm);
  }

  return {
    group: g,
    x,
    z,
    lights: [g.getObjectByName('crossLightA'), g.getObjectByName('crossLightB')].filter(Boolean),
    arms: [g.getObjectByName('gateArm')].filter(Boolean),
    closed: false,
    setOpen(open) {
      this.closed = !open;
      for (const arm of this.arms) {
        // rotate gate down when closed
        arm.rotation.z = open ? 0 : (arm.userData.side || 1) * Math.PI / 2 * 0.95;
      }
      const mats = [];
      g.traverse((c) => {
        if (c.name === 'crossLightA' || c.name === 'crossLightB') mats.push(c);
      });
      for (const l of mats) {
        if (l.material && l.material.emissiveIntensity !== undefined) {
          l.material.emissiveIntensity = open ? 0.15 : 1.8;
        }
      }
    },
    update(t) {
      if (!this.closed) return;
      // blink
      const blink = Math.floor(t * 2) % 2 === 0;
      g.traverse((c) => {
        if (c.name === 'crossLightA') c.visible = blink;
        if (c.name === 'crossLightB') c.visible = !blink;
      });
    },
  };
}

/**
 * Sample a point along the rail loop by normalized t in [0,1)
 */
export function sampleRail(t) {
  const pts = RAIL_LOOP;
  const segs = pts.length - 1;
  const ft = ((t % 1) + 1) % 1;
  const s = ft * segs;
  const i = Math.floor(s);
  const f = s - i;
  const a = pts[i];
  const b = pts[i + 1];
  const x = a[0] + (b[0] - a[0]) * f;
  const z = a[1] + (b[1] - a[1]) * f;
  const yaw = Math.atan2(b[0] - a[0], b[1] - a[1]);
  return { x, z, yaw };
}

/** Approximate arc-length param: cumulative distances */
export function buildRailLengths() {
  const pts = RAIL_LOOP;
  const lengths = [0];
  for (let i = 0; i < pts.length - 1; i++) {
    const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    lengths.push(lengths[i] + d);
  }
  return {
    total: lengths[lengths.length - 1],
    lengths,
    // t from distance
    tFromDist(dist) {
      const d = ((dist % this.total) + this.total) % this.total;
      for (let i = 0; i < lengths.length - 1; i++) {
        if (d <= lengths[i + 1]) {
          const seg = lengths[i + 1] - lengths[i];
          const f = seg > 0 ? (d - lengths[i]) / seg : 0;
          return (i + f) / (lengths.length - 1);
        }
      }
      return 0;
    },
    distFromT(t) {
      const segs = lengths.length - 1;
      const ft = ((t % 1) + 1) % 1;
      const s = ft * segs;
      const i = Math.floor(s);
      const f = s - i;
      return lengths[i] + (lengths[i + 1] - lengths[i]) * f;
    },
  };
}
