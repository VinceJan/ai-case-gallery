/**
 * Road network, sidewalks, crossings, signs, utility poles.
 * All geometry is authored in layout space then placed on the planet.
 */
import * as THREE from 'three';
import { placeOnPlanet, surfacePoint, surfaceNormal } from './Planet.js';
import {
  toonMaterial,
  unlitMaterial,
  asphaltTexture,
  sidewalkTexture,
  concreteTexture,
} from '../utils/materials.js';

const ROAD_W = 7.2;
const SIDE_W = 1.8;
const CURB_H = 0.14;

function makeBox(w, h, d, mat) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}

/**
 * Roads defined as polylines in layout space.
 * A closed ring plus several connectors.
 */
export function buildRoads(scene) {
  const group = new THREE.Group();
  group.name = 'roads';

  const asphalt = new THREE.MeshToonMaterial({
    color: '#4a5058',
    map: asphaltTexture(),
    gradientMap: toonMaterial('#ffffff').gradientMap,
  });
  const sidewalkMat = new THREE.MeshToonMaterial({
    color: '#a09a90',
    map: sidewalkTexture(),
  });
  const curbMat = toonMaterial('#7a7872');
  const lineMat = unlitMaterial('#e8e0c8', { transparent: true, opacity: 0.75 });
  const paintYellow = unlitMaterial('#e0c860', { transparent: true, opacity: 0.8 });

  // Ring road around the town center (ellipse-ish loop)
  const ring = [
    [0, -38],
    [22, -34],
    [38, -18],
    [42, 2],
    [36, 22],
    [18, 36],
    [-4, 40],
    [-26, 34],
    [-40, 16],
    [-42, -6],
    [-32, -28],
    [-14, -38],
    [0, -38],
  ];

  // Spokes
  const spokes = [
    // station plaza to south
    [
      [0, -6],
      [0, -20],
      [0, -38],
    ],
    // to school
    [
      [8, 6],
      [18, 14],
      [28, 20],
      [36, 22],
    ],
    // to shrine hill
    [
      [-6, 8],
      [-16, 18],
      [-24, 28],
      [-26, 34],
    ],
    // to residential west
    [
      [-8, -2],
      [-22, -4],
      [-36, -8],
      [-42, -6],
    ],
    // to riverside / park
    [
      [6, -8],
      [16, -18],
      [24, -28],
      [22, -34],
    ],
  ];

  const paths = [ring, ...spokes];

  for (const path of paths) {
    for (let i = 0; i < path.length - 1; i++) {
      addRoadSegment(group, path[i], path[i + 1], asphalt, sidewalkMat, curbMat, lineMat);
    }
  }

  // Station plaza (wider paved area)
  addPlaza(group, [0, -10], 18, 16, sidewalkMat, curbMat);

  // Crossings near station
  addCrossing(group, [0, -8], 0, paintYellow);
  addCrossing(group, [-8, -4], Math.PI / 2, paintYellow);
  addCrossing(group, [8, -4], Math.PI / 2, paintYellow);

  // Utility poles along ring + spokes
  const polePaths = [ring, ...spokes];
  for (const path of polePaths) {
    addPolesAlong(group, path);
  }

  // Street lights
  for (const p of [
    [4, -10],
    [-4, -10],
    [6, -4],
    [-6, -2],
    [0, -18],
    [-22, -10],
    [22, 16],
    [-28, 22],
    [18, -22],
    [-36, 8],
  ]) {
    addStreetLight(group, p);
  }

  // Guardrails near river
  addGuardrail(group, [20, -30], [28, -24]);
  addGuardrail(group, [-28, -22], [-36, -14]);

  scene.add(group);
  return group;
}

function addRoadSegment(group, a, b, asphalt, sidewalkMat, curbMat, lineMat) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const len = Math.hypot(dx, dz) + 1.2; // overlap joints to hide seams
  if (len < 0.2) return;
  const yaw = Math.atan2(dx, dz);
  const mx = (a[0] + b[0]) / 2;
  const mz = (a[1] + b[1]) / 2;

  // Road surface
  const road = makeBox(ROAD_W, 0.08, len, asphalt);
  placeOnPlanet(road, mx, mz, 0.04, yaw);
  group.add(road);

  // Center line (dashed look via short strips)
  const dashes = Math.max(1, Math.floor(len / 2.4));
  for (let i = 0; i < dashes; i++) {
    const t = (i + 0.5) / dashes;
    const x = a[0] + dx * t;
    const z = a[1] + dz * t;
    const dash = makeBox(0.18, 0.02, 1.1, lineMat);
    placeOnPlanet(dash, x, z, 0.09, yaw);
    group.add(dash);
  }

  // Sidewalks
  for (const side of [-1, 1]) {
    const sw = makeBox(SIDE_W, 0.12, len, sidewalkMat);
    const offset = ROAD_W / 2 + SIDE_W / 2;
    // perpendicular offset in layout space
    const px = Math.cos(yaw) * offset * side;
    const pz = -Math.sin(yaw) * offset * side;
    placeOnPlanet(sw, mx + px, mz + pz, 0.08, yaw);
    group.add(sw);

    const curb = makeBox(0.18, CURB_H + 0.12, len, curbMat);
    placeOnPlanet(curb, mx + Math.cos(yaw) * (ROAD_W / 2 + 0.1) * side, mz - Math.sin(yaw) * (ROAD_W / 2 + 0.1) * side, 0.08, yaw);
    group.add(curb);
  }
}

function addPlaza(group, center, w, d, sidewalkMat, curbMat) {
  const plaza = makeBox(w, 0.1, d, sidewalkMat);
  placeOnPlanet(plaza, center[0], center[1], 0.06, 0);
  group.add(plaza);

  // subtle paving grid
  const lineMat = unlitMaterial('#8a847c', { transparent: true, opacity: 0.35 });
  for (let x = -w / 2 + 1; x < w / 2; x += 2) {
    const l = makeBox(0.06, 0.02, d, lineMat);
    placeOnPlanet(l, center[0] + x, center[1], 0.12, 0);
    group.add(l);
  }
  for (let z = -d / 2 + 1; z < d / 2; z += 2) {
    const l = makeBox(w, 0.02, 0.06, lineMat);
    placeOnPlanet(l, center[0], center[1] + z, 0.12, 0);
    group.add(l);
  }

  // Plaza edge curb
  for (const [sx, sz, w2, d2] of [
    [0, -d / 2, w, 0.2],
    [0, d / 2, w, 0.2],
    [-w / 2, 0, 0.2, d],
    [w / 2, 0, 0.2, d],
  ]) {
    // skip road openings — keep simple
  }
}

function addCrossing(group, pos, yaw, paint) {
  for (let i = -3; i <= 3; i++) {
    const stripe = makeBox(0.55, 0.02, 3.6, paint);
    const ox = Math.cos(yaw) * 0 + Math.sin(yaw) * i * 0.85;
    const oz = Math.cos(yaw) * i * 0.85;
    placeOnPlanet(stripe, pos[0] + ox, pos[1] + oz, 0.1, yaw);
    group.add(stripe);
  }
}

function addPolesAlong(group, path) {
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const count = Math.max(1, Math.floor(len / 18));
    for (let k = 0; k < count; k++) {
      const t = (k + 0.35) / count;
      const x = a[0] + (b[0] - a[0]) * t;
      const z = a[1] + (b[1] - a[1]) * t;
      addUtilityPole(group, x, z);
    }
  }
}

function addUtilityPole(group, x, z) {
  const pole = new THREE.Group();
  const poleMat = toonMaterial('#6a5a4a');
  const darkMat = toonMaterial('#3a342e');
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7.2, 8), poleMat);
  shaft.position.y = 3.6;
  pole.add(shaft);
  for (const y of [6.4, 5.7]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.12), darkMat);
    arm.position.set(0, y, 0);
    pole.add(arm);
  }
  // wires (simple thin cylinders to neighbor poles — visual only, short segments)
  const wireMat = unlitMaterial('#2a2a2a');
  for (const y of [6.4, 5.7]) {
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.2, 4), wireMat);
    wire.rotation.z = Math.PI / 2;
    wire.position.set(1.6, y, 0);
    pole.add(wire);
    const wire2 = wire.clone();
    wire2.position.set(-1.6, y, 0);
    pole.add(wire2);
  }
  // transformer can
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 8), toonMaterial('#5a6068'));
  can.position.set(0.45, 5.1, 0);
  pole.add(can);

  placeOnPlanet(pole, x, z, 0.1, 0);
  group.add(pole);
}

function addStreetLight(group, pos) {
  const g = new THREE.Group();
  const metal = toonMaterial('#4a4e56');
  const lampMat = toonMaterial('#fff2c0', { emissive: '#ffe6a0', emissiveIntensity: 0.2 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.3, 8), metal);
  base.position.y = 0.15;
  g.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 4.2, 8), metal);
  pole.position.y = 2.2;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.08), metal);
  arm.position.set(0.55, 4.25, 0);
  g.add(arm);
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.18, 0.28), lampMat);
  lamp.position.set(1.05, 4.15, 0);
  g.add(lamp);

  // Point light (only a few active for perf)
  const light = new THREE.PointLight('#ffd9a0', 0, 9, 2);
  light.position.set(1.05, 4.0, 0);
  g.add(light);
  g.userData.streetLight = { light, lampMat };

  placeOnPlanet(g, pos[0], pos[1], 0.08, Math.random() * Math.PI * 2);
  group.add(g);
  return g;
}

function addGuardrail(group, a, b) {
  const metal = toonMaterial('#c5c8cc');
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const len = Math.hypot(dx, dz);
  const yaw = Math.atan2(dx, dz);
  const mx = (a[0] + b[0]) / 2;
  const mz = (a[1] + b[1]) / 2;
  const rail = makeBox(0.12, 0.55, len, metal);
  placeOnPlanet(rail, mx, mz, 0.45, yaw);
  group.add(rail);
  const posts = Math.max(2, Math.floor(len / 2));
  for (let i = 0; i <= posts; i++) {
    const t = i / posts;
    const post = makeBox(0.1, 0.7, 0.1, metal);
    placeOnPlanet(post, a[0] + dx * t, a[1] + dz * t, 0.35, yaw);
    group.add(post);
  }
}

/** Update street lamp intensity based on time */
export function updateStreetLights(streetGroups, hour, weatherDim = 1) {
  const nightFactor = hour < 6.5 || hour > 17.5 ? 1 : hour < 7.5 ? (7.5 - hour) : hour > 16.5 ? (hour - 16.5) / 1.0 : 0;
  const intensity = Math.min(1, Math.max(0, nightFactor)) * (1.2 + (1 - weatherDim) * 0.4);

  streetGroups.forEach((g) => {
    if (!g.userData?.streetLight) return;
    const { light, lampMat } = g.userData.streetLight;
    light.intensity = intensity * 2.2;
    lampMat.emissiveIntensity = 0.15 + intensity * 1.4;
  });
}

/**
 * Find road graph for NPC navigation (simple waypoints along ring + spokes).
 */
export function buildNavGraph() {
  const nodes = [];
  const add = (x, z) => {
    nodes.push({ x, z, neighbors: [] });
    return nodes.length - 1;
  };
  const link = (i, j) => {
    nodes[i].neighbors.push(j);
    nodes[j].neighbors.push(i);
  };

  // ring nodes
  const ringPts = [
    [0, -38], [22, -34], [38, -18], [42, 2], [36, 22], [18, 36],
    [-4, 40], [-26, 34], [-40, 16], [-42, -6], [-32, -28], [-14, -38],
  ];
  const ringIdx = ringPts.map(([x, z]) => add(x, z));
  for (let i = 0; i < ringIdx.length; i++) {
    link(ringIdx[i], ringIdx[(i + 1) % ringIdx.length]);
  }

  // interior nodes
  const station = add(0, 0);
  const plazaS = add(0, -18);
  const schoolJ = add(28, 20);
  const shrineJ = add(-24, 28);
  const westJ = add(-36, -8);
  const riverJ = add(24, -28);
  const cafe = add(8, -2);
  const konbini = add(-6, -12);

  link(station, plazaS);
  link(station, cafe);
  link(station, konbini);
  link(station, ringIdx[0]);
  link(cafe, schoolJ);
  link(schoolJ, ringIdx[4]);
  link(station, shrineJ);
  link(shrineJ, ringIdx[7]);
  link(station, westJ);
  link(westJ, ringIdx[9]);
  link(konbini, riverJ);
  link(riverJ, ringIdx[1]);

  return {
    nodes,
    nearest(x, z) {
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const d = (nodes[i].x - x) ** 2 + (nodes[i].z - z) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return best;
    },
    path(from, to) {
      // BFS
      const prev = new Array(nodes.length).fill(-1);
      const seen = new Array(nodes.length).fill(false);
      const q = [from];
      seen[from] = true;
      while (q.length) {
        const u = q.shift();
        if (u === to) break;
        for (const v of nodes[u].neighbors) {
          if (!seen[v]) {
            seen[v] = true;
            prev[v] = u;
            q.push(v);
          }
        }
      }
      const path = [];
      let cur = to;
      while (cur !== -1) {
        path.unshift({ x: nodes[cur].x, z: nodes[cur].z });
        cur = prev[cur];
      }
      return path;
    },
  };
}
