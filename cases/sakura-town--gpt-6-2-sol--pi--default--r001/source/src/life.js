import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const { PI, sin, cos } = Math;
const TAU = 2 * PI;
const unitBox = new THREE.BoxGeometry(1, 1, 1);
const unitBall = new THREE.SphereGeometry(1, 16, 12);
const clamp = THREE.MathUtils.clamp;
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const mat = (color, options = {}) => new THREE.MeshStandardMaterial({ color, ...options });
const tint = (color, other, amount) => new THREE.Color(color).lerp(new THREE.Color(other), amount);

function mesh(parent, geometry, material, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(geometry, material);
  o.position.set(x, y, z);
  parent.add(o);
  return o;
}
function box(parent, m, w, h, d, x, y, z) {
  const o = mesh(parent, unitBox, m, x, y, z);
  o.scale.set(w, h, d);
  return o;
}
function ball(parent, m, w, h, d, x, y, z) {
  const o = mesh(parent, unitBall, m, x, y, z);
  o.scale.set(w, h, d);
  return o;
}
function groupAt(parent, x = 0, y = 0, z = 0) {
  const o = new THREE.Group();
  o.position.set(x, y, z);
  parent.add(o);
  return o;
}
function markShadows(group) {
  group.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
}
// Consolidate rigid parts by material without baking their parent's animation.
function batchRigid(root) {
  root.updateWorldMatrix(true, true);
  const inv = root.matrixWorld.clone().invert(), byMaterial = new Map();
  root.traverse((o) => {
    if (!o.isMesh || o.userData.noShadow) return;
    if (!byMaterial.has(o.material)) byMaterial.set(o.material, []);
    byMaterial.get(o.material).push(o);
  });
  for (const [material, source] of byMaterial) {
    if (source.length < 2) continue;
    const parts = source.map((o) => {
      const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      return g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
    });
    const merged = mergeGeometries(parts);
    for (const part of parts) part.dispose();
    if (!merged) continue;
    mesh(root, merged, material);
    for (const o of source) o.removeFromParent();
  }
}
function tube(parent, m, xyz, r = 0.014) {
  const points = xyz.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  return mesh(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 12, r, 6, false), m);
}
// Extrude a cross section (z,y) along the track's x axis.
function section(parent, m, length, xy, x, y, z) {
  const shape = new THREE.Shape();
  xy.forEach(([a, b], i) => (i ? shape.lineTo(a, b) : shape.moveTo(a, b)));
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false });
  g.translate(0, 0, -length / 2);
  g.rotateY(-PI / 2);
  return mesh(parent, g, m, x, y, z);
}
// One ordinary Mesh per material, even without a static batching pass.
function boxBatch(parent, m, boxes) {
  const vertices = [], normals = [], indices = [];
  const p = unitBox.attributes.position, n = unitBox.attributes.normal;
  for (const [x, y, z, w, h, d] of boxes) {
    const offset = vertices.length / 3;
    for (let i = 0; i < p.count; i++) {
      vertices.push(x + p.getX(i) * w, y + p.getY(i) * h, z + p.getZ(i) * d);
      normals.push(n.getX(i), n.getY(i), n.getZ(i));
    }
    for (const i of unitBox.index.array) indices.push(offset + i);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  g.setIndex(indices);
  return mesh(parent, g, m);
}
function label(parent, text, sub, w, h, x, y, z, bg, ink) {
  if (typeof document === 'undefined') return;
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 96;
  const c = canvas.getContext('2d');
  if (!c) return;
  c.fillStyle = bg; c.fillRect(0, 0, 256, 96);
  c.fillStyle = ink; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = 'bold 42px sans-serif'; c.fillText(text, 128, sub ? 38 : 52, 238);
  if (sub) { c.font = 'bold 20px sans-serif'; c.fillText(sub, 128, 73, 235); }
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  const face = mesh(parent, new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map }), x, y, z);
  face.userData.noShadow = true;
}

const TRACK_Z = -13;
const CAR_LENGTH = 6.02;
const CAR_GAP = 0.42;
const TRAIN_HALF = CAR_LENGTH + CAR_GAP / 2;
const X_LEFT = -2.1, X_RIGHT = 4.1;
const LOOP = 45, BRAKE_AT = 11.5, STOP_X = 10.9, APPROACH_SPEED = 6;
const BRAKE_TIME = 2 * STOP_X / APPROACH_SPEED;
const STOP_AT = BRAKE_AT + BRAKE_TIME, LEAVE_AT = 22.4;
const DEPART_RAMP = 4.0, DEPART_SPEED = 5.4;
const WARNING_AT = 5.25, LOWER_AT = 6.45, LOWER_TIME = 1.65, RAISE_TIME = 1.45;
// The outermost end is just beyond the body's face (tail lamps & buffers).
const CLEAR_X = X_RIGHT + TRAIN_HALF + 0.37;
const RAISE_AT = STOP_AT - Math.sqrt(2 * (STOP_X - CLEAR_X) * BRAKE_TIME / APPROACH_SPEED);
const OPEN_AT = RAISE_AT + RAISE_TIME;

function trainPosition(t) {
  if (t < BRAKE_AT) return -69 + APPROACH_SPEED * t;
  if (t < STOP_AT) {
    const dt = t - BRAKE_AT;
    return APPROACH_SPEED * dt * (1 - dt / (2 * BRAKE_TIME));
  }
  if (t < LEAVE_AT) return STOP_X;
  const dt = t - LEAVE_AT;
  return Math.min(69, STOP_X + (dt < DEPART_RAMP
    ? DEPART_SPEED * dt * dt / (2 * DEPART_RAMP)
    : DEPART_SPEED * (dt - DEPART_RAMP / 2)));
}

function makeCars(parent) {
  const cream = mat(0xffe8b9), salmon = mat(0xcd6351), salmonDark = mat(0x9d423f);
  const roof = mat(0x88867d), roofLight = mat(0xc1b9a8), rubber = mat(0x32353a);
  const chassis = mat(0x34343c), springs = mat(0x65616a), wheelMetal = mat(0x85818b, { metalness: 0.44 });
  const chrome = mat(0xd7d6c9, { metalness: 0.34, roughness: 0.35 });
  const seal = mat(0x323e43), glass = mat(0x587f87, { roughness: 0.23, metalness: 0.16 });
  const insetGlass = mat(0x334f59, { roughness: 0.26 });
  const reflected = mat(0x91b5b8, { roughness: 0.29 });
  const light = mat(0xffedb4, { emissive: 0xffbd60, emissiveIntensity: 0.95 });
  const tail = mat(0xea433c, { emissive: 0xdc1e19, emissiveIntensity: 0.68 });
  const wheel = new THREE.CylinderGeometry(0.303, 0.303, 0.16, 20);
  wheel.rotateX(PI / 2);
  const axle = new THREE.CylinderGeometry(0.070, 0.070, 1.86, 10);
  axle.rotateX(PI / 2);

  for (const carSide of [-1, 1]) {
    const car = groupAt(parent, carSide * (CAR_LENGTH + CAR_GAP) / 2);
    car.name = carSide === 1 ? 'Leading car' : 'Trailing car';
    section(car, cream, CAR_LENGTH, [[-1.14,.84],[1.14,.84],[1.24,1.17],[1.24,2.64],
      [1.16,2.79],[-1.16,2.79],[-1.24,2.64],[-1.24,1.17]], 0, 0, 0);
    section(car, salmon, CAR_LENGTH + 0.008, [[-1.145,.86],[1.145,.86],[1.25,1.17],[1.25,1.43],
      [-1.25,1.43],[-1.25,1.17]], 0, 0, 0);
    section(car, roof, CAR_LENGTH + 0.08, [[-1.255,2.69],[1.255,2.69],[1.19,2.84],
      [.99,2.97],[.67,3.03],[-.67,3.03],[-.99,2.97],[-1.19,2.84]], 0, 0, 0);
    box(car, chassis, 5.89, 0.24, 1.95, 0, .79, 0);
    box(car, roofLight, 1.25, .15, .73, -.37, 3.089, 0);
    for (let i = -4; i <= 4; i++) box(car, rubber, .038, .014, .55, -.37 + i * .117, 3.171, 0);
    for (const x of [-2.12, 1.4, 2.05]) box(car, roofLight, .31, .105, .65, x, 3.057, 0);
    for (const x of [-1.93, 1.93]) {
      box(car, chassis, 1.26, .28, 1.92, x, .61, 0);
      for (const dx of [-.40, .40]) {
        mesh(car, axle, chassis, x + dx, .47, 0);
        for (const s of [-1, 1]) {
          mesh(car, wheel, wheelMetal, x + dx, .47, s * .81);
          ball(car, chassis, .126, .126, .05, x + dx, .47, s * .895);
        }
      }
      for (const s of [-1, 1]) {
        box(car, chassis, 1.25, .15, .11, x, .555, s * .94);
        box(car, springs, .25, .12, .14, x, .63, s * .99);
      }
    }
    for (const [x, w, z] of [[-.57,.79,-.60],[.57,.57,-.60],[.08,.92,.58]]) {
      box(car, chassis, w, .27, .57, x, .65, z);
    }

    for (const s of [-1, 1]) {
      box(car, salmon, CAR_LENGTH, .116, .026, 0, 2.596, s * 1.244);
      box(car, salmonDark, CAR_LENGTH - .05, .048, .026, 0, 1.09, s * 1.254);
      for (const x of [-1.36, -.45, .46, 1.37]) {
        box(car, chrome, .78, .65, .047, x, 2.10, s * 1.252);
        box(car, seal, .729, .594, .049, x, 2.10, s * 1.270);
        box(car, glass, .675, .542, .024, x, 2.1, s * 1.298);
        box(car, insetGlass, .675, .102, .008, x, 1.883, s * 1.312);
        box(car, reflected, .626, .038, .006, x, 2.326, s * 1.315);
        box(car, chrome, .026, .552, .019, x + .087, 2.1, s * 1.317);
      }
      for (const x of [-2.35, 2.35]) {
        box(car, seal, .77, 1.535, .035, x, 1.71, s * 1.254);
        box(car, cream, .715, 1.481, .038, x, 1.71, s * 1.274);
        box(car, salmon, .716, .459, .017, x, 1.201, s * 1.299);
        box(car, seal, .018, 1.473, .021, x, 1.71, s * 1.305);
        for (const k of [-1, 1]) {
          box(car, seal, .261, .506, .022, x + .178 * k, 2.07, s * 1.302);
          box(car, glass, .216, .452, .015, x + .178 * k, 2.07, s * 1.322);
          box(car, chrome, .048, .10, .028, x + .105 * k, 1.66, s * 1.32);
        }
        box(car, chrome, .81, .064, .19, x, .894, s * 1.205);
      }
    }

    const end = groupAt(car, carSide * CAR_LENGTH / 2);
    end.rotation.y = carSide * PI / 2;
    box(end, salmon, 2.33, .62, .07, 0, 1.19, .021);
    box(end, rubber, .626, 1.556, .083, 0, 1.76, .053);
    box(end, cream, .48, 1.415, .041, 0, 1.76, .105);
    box(end, salmon, .48, .373, .017, 0, 1.24, .131);
    box(end, seal, .344, .524, .03, 0, 2.13, .133);
    box(end, glass, .294, .461, .025, 0, 2.13, .152);
    for (const s of [-1, 1]) {
      box(end, chrome, .686, .64, .053, s * .754, 2.14, .035);
      box(end, seal, .620, .574, .034, s * .754, 2.14, .072);
      box(end, glass, .569, .529, .026, s * .754, 2.14, .096);
      const wiper = box(end, rubber, .022, .37, .013, s * .71, 2.11, .115);
      wiper.rotation.z = -.49;
      ball(end, chrome, .135, .135, .057, s * .85, 1.54, .038);
      ball(end, carSide === 1 ? light : roofLight, .102, .102, .043, s * .85, 1.54, .083);
      ball(end, carSide === -1 ? tail : salmonDark, .067, .067, .043, s * .65, 1.13, .071);
    }
    box(end, rubber, .72, .194, .067, 0, 2.61, .045);
    label(end, 'さくら町', '', .632, .148, 0, 2.61, .081, '#303839', '#ffe8b5');
    box(end, chassis, 2.05, .21, .13, 0, .81, .066);
    box(end, chassis, .34, .16, .35, 0, .69, .135);
    tube(end, rubber, [[.39,.81,.12],[.46,.56,.20],[.26,.56,.27]], .035);
    batchRigid(car);
  }
  box(parent, rubber, .45, 1.28, .75, 0, 1.65, 0);
  box(parent, chassis, .55, .153, .31, 0, .73, 0);
  markShadows(parent);
  parent.traverse((o) => { if (o.userData.noShadow) o.castShadow = o.receiveShadow = false; });
}

export function makeRail(outside) {
  const staticGroup = groupAt(outside);
  staticGroup.name = 'Railway • fixed scenery';
  staticGroup.userData.static = true;
  const fixed = groupAt(staticGroup, 0, 0, TRACK_Z);
  const ballast = mat(0x948b82), sleeper = mat(0x73645f), lightTie = mat(0x867974);
  const foot = mat(0x746e6c, { metalness: .35 });
  const nickel = mat(0xdbdce0, { metalness: .44, roughness: .36 });
  const deck = mat(0x626670), edge = mat(0xa3a2a4), paint = mat(0xfff0cc);
  const stripe = mat(0xf6bc37), black = mat(0x272629), concrete = mat(0xaaa09a);
  const warmWhite = mat(0xfff3d7), wood = mat(0x8e6551), enamel = mat(0x44665e);
  const trackLen = 148;
  section(fixed, ballast, trackLen, [[-1.88,.006],[1.88,.006],[1.44,.081],[-1.44,.081]], 0, 0, 0).receiveShadow = true;
  const ties = [[], []], clips = [], pebbles = [[], []];
  for (let i = 0; i < 194; i++) {
    const x = -73.34 + i * .76;
    if (x > X_LEFT - .22 && x < X_RIGHT + .22) continue;
    ties[i % 5 === 0 ? 1 : 0].push([x, .088, 0, .24, .072, 2.84]);
    for (const s of [-1, 1]) {
      const jitter = sin(i * 57.37 + s * 4.54);
      clips.push([x, .138, s * .81, .15, .032, .232]);
      pebbles[i % 3 === 0 ? 1 : 0].push([x + .35, .073, s * (1.43 + .25 * jitter), .113, .025, .081]);
    }
  }
  boxBatch(fixed, sleeper, ties[0]).receiveShadow = true;
  boxBatch(fixed, lightTie, ties[1]).receiveShadow = true;
  boxBatch(fixed, foot, clips).receiveShadow = true;
  boxBatch(fixed, mat(0x7f7770), pebbles[0]).receiveShadow = true;
  boxBatch(fixed, mat(0xa79b8c), pebbles[1]).receiveShadow = true;
  for (const s of [-1, 1]) {
    const z = s * .81;
    box(fixed, foot, trackLen, .030, .150, 0, .137, z).receiveShadow = true;
    box(fixed, foot, trackLen, .038, .050, 0, .155, z).receiveShadow = true;
    box(fixed, nickel, trackLen, .037, .092, 0, .173, z).receiveShadow = true;
  }
  // Rail slots separate the infill into three plates; they keep the railheads visible.
  for (const [z, d] of [[-1.681, 1.48], [0, 1.358], [1.681, 1.48]]) {
    box(fixed, deck, 6.2, .151, d, 1, .076, z).receiveShadow = true;
    for (const x of [-2.02, 4.02]) box(fixed, edge, .105, .014, d - .025, x, .158, z);
  }
  for (const s of [-1, 1]) {
    box(fixed, edge, 6.2, .10, .24, 1, .051, s * 2.53).receiveShadow = true;
    box(fixed, paint, 5.62, .012, .106, 1, .16, s * 2.31);
  }
  for (const z of [-2.19, -1.82, -1.45, -1.08, -.62, -.26, .1, .46, 1.08, 1.45, 1.82, 2.19]) {
    box(fixed, paint, .87, .009, .127, 3.34, .157, z);
    box(fixed, paint, .10, .009, .15, -.12, .157, z);
  }

  const platform = groupAt(staticGroup, 10, 0, -16);
  const retaining = mat(0x8f8279), pavement = mat(0xc9b6a6), joint = mat(0xb2a091);
  box(platform, retaining, 12, .49, 2.87, 0, .245, -.045).receiveShadow = true;
  box(platform, pavement, 12, .113, 2.96, 0, .535, -.04).receiveShadow = true;
  box(platform, warmWhite, 12, .063, .111, 0, .51, 1.442);
  box(platform, stripe, 11.93, .029, .236, 0, .602, 1.253).receiveShadow = true;
  const bumps = [], seams = [];
  for (let i = 0; i < 92; i++) {
    for (const z of [1.192, 1.314]) bumps.push([-5.9 + i * .13, .619, z, .036, .014, .042]);
  }
  for (let x = -5.5; x <= 5.5; x++) seams.push([x, .593, -.23, .015, .007, 2.37]);
  boxBatch(platform, mat(0xe0a426), bumps);
  boxBatch(platform, joint, seams);
  // Rear approach steps don't extend the platform into the crossing or track.
  for (let i = 0; i < 3; i++) box(platform, pavement, 3.1, .15 * (3 - i), .30, -.5, .075 * (3 - i), -1.62 - i * .29).receiveShadow = true;
  const furniture = groupAt(platform);
  for (const x of [-3.25, 3.15]) {
    for (const leg of [-.65, .65]) box(furniture, enamel, .094, .43, .37, x + leg, .79, -.83);
    box(furniture, wood, 1.69, .093, .43, x, .979, -.83);
    for (const y of [1.15, 1.31]) box(furniture, wood, 1.69, .122, .066, x, y, -1.027);
  }
  for (const x of [.86, 2.25]) box(furniture, enamel, .089, 1.61, .095, x, 1.398, -1.15);
  box(furniture, enamel, 1.81, .57, .115, 1.555, 1.997, -1.15);
  label(furniture, 'さくら町', 'SAKURA TOWN', 1.64, .446, 1.555, 1.997, -1.087, '#f9efe0', '#35534e');
  markShadows(furniture);
  furniture.traverse((o) => { if (o.userData.noShadow) o.castShadow = o.receiveShadow = false; });

  const dynamic = groupAt(outside);
  dynamic.name = 'Railway • train and crossing signals';
  const train = groupAt(dynamic, -69, 0, TRACK_Z);
  train.name = 'Cream and salmon two-car local';
  makeCars(train);
  const gates = [], lamps = [];
  const darkRed = mat(0x572728, { roughness: .27 });
  const litRed = mat(0xff3827, { emissive: 0xff1709, emissiveIntensity: 2.15, roughness: .24 });
  for (const s of [-1, 1]) {
    const x = 1 - s * 2.89, z = s * 2.73;
    const hardware = groupAt(fixed, x, 0, z);
    box(hardware, concrete, .43, .12, .44, 0, .06, 0);
    box(hardware, black, .29, .85, .30, 0, .526, 0);
    for (let j = 0; j < 3; j++) box(hardware, stripe, .297, .125, .307, 0, .3 + j * .25, 0);
    box(hardware, foot, .33, .295, .34, 0, 1.065, 0);
    const sign = groupAt(hardware, 0, 0, s * .43);
    box(sign, stripe, .161, 2.95, .161, 0, 1.48, 0);
    for (let j = 0; j < 5; j++) box(sign, black, .17, .222, .17, 0, .32 + j * .43, 0);
    for (const k of [-1, 1]) {
      const cross = groupAt(sign, 0, 2.91, 0);
      cross.rotation.z = k * PI * .28;
      box(cross, black, .97, .19, .088, 0, 0, 0);
      for (let j = 0; j < 4; j++) box(cross, stripe, .132, .185, .092, -.373 + j * .248, 0, 0);
    }
    box(sign, black, .86, .102, .097, 0, 2.27, 0);
    markShadows(hardware);
    const arm = groupAt(dynamic, x, 1.07, TRACK_Z + z);
    const length = 5.54, count = 12;
    for (let j = 0; j < count; j++) {
      box(arm, j % 2 ? black : stripe, length / count, .123, .106,
        s * (j + .5) * length / count, 0, 0);
    }
    box(arm, warmWhite, .124, .133, .114, s * length, 0, 0);
    box(arm, black, .27, .174, .15, -s * .08, 0, 0);
    batchRigid(arm);
    markShadows(arm);
    gates.push({ arm, s });
    for (const k of [-1, 1]) {
      const lampX = x + k * .258, lampZ = TRACK_Z + z + s * .43;
      ball(sign, black, .157, .151, .118, k * .258, 2.27, 0);
      lamps.push([-1, 1].map((face) => {
        const lens = ball(dynamic, darkRed, .103, .100, .033, lampX, 2.27, lampZ + face * .105);
        ball(sign, black, .129, .045, .119, k * .258, 2.37, face * .071);
        return lens;
      }));
    }
  }

  let closed = false, warning = false, trainX = -69;
  function update(seconds) {
    const t = ((seconds % LOOP) + LOOP) % LOOP;
    trainX = trainPosition(t);
    train.position.x = trainX;
    warning = t >= WARNING_AT && t < OPEN_AT;
    closed = t >= LOWER_AT && t < OPEN_AT;
    const down = smooth((t - LOWER_AT) / LOWER_TIME) * (1 - smooth((t - RAISE_AT) / RAISE_TIME));
    for (const { arm, s } of gates) arm.rotation.z = s * (1 - down) * 1.46;
    const phase = Math.floor((t - WARNING_AT) * 3.4) % 2;
    for (let i = 0; i < lamps.length; i++) {
      const glow = warning && i % 2 === phase ? litRed : darkRed;
      for (const lens of lamps[i]) lens.material = glow;
    }
  }
  update(0);
  return { staticGroup, update, get closed() { return closed; }, get warning() { return warning; }, get trainX() { return trainX; } };
}

function hairCap(parent, material, style) {
  const positions = [], indices = [];
  const around = 32, tiers = 12;
  for (let j = 0; j <= tiers; j++) for (let i = 0; i <= around; i++) {
    const a = i * TAU / around, front = cos(a);
    const silhouette = style === 'bob' ? .23 : style === 'crop' ? -.22 : 0;
    const hem = 1.68 - .41 * front + silhouette * (1 - Math.max(0, front)) + .13 * Math.max(0, front) * sin(a * 3 + .7);
    const p = .008 + (hem - .008) * j / tiers;
    positions.push(.386 * sin(p) * sin(a), .407 * cos(p) + .026, .338 * sin(p) * cos(a) - .023);
    if (i && j) {
      const v = j * (around + 1) + i, above = v - around - 1;
      indices.push(above - 1, v - 1, v, above - 1, v, above);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return mesh(parent, g, material);
}

/** Colors: top, pants, hair, skin, optional bag and hat (hex numbers or CSS colors).
 *  bagStyle: 'satchel' for a cross-body mailbag; otherwise bag adds a backpack.
 *  hairStyle: 'swept' (default), 'bob', 'crop', or 'bun'.
 *  Root faces +z; caller owns its transform. pose() receives simulation seconds.
 */
export function makePerson(colors = {}) {
  const { top = 0xb96647, pants = 0x424a5a, hair = 0x22283d, skin = 0xf3c5a9,
    bag, hat, bagStyle, hairStyle = 'swept' } = colors;
  const group = new THREE.Group();
  group.name = 'Chibi pedestrian';
  const rig = groupAt(group), chest = groupAt(rig, 0, 1.14, 0);
  const coat = mat(top), seam = mat(tint(top, 0x302b36, .24)), cuff = mat(tint(top, 0xffebc9, .18));
  const trousers = mat(pants), hem = mat(tint(pants, 0xa0b0bd, .2));
  const flesh = mat(skin), blush = mat(tint(skin, 0xe4686b, .52));
  const ink = mat(hair), lock = mat(tint(hair, 0x717886, .15));
  const ivory = mat(0xffecd3), sole = mat(0x423a3f), shoe = mat(0x614d49);
  const eyes = mat(0x322932, { roughness: .33 }), mouth = mat(0x9c5051);
  const shine = new THREE.MeshBasicMaterial({ color: 0xffffea });
  ball(rig, trousers, .305, .146, .178, 0, .837, 0);
  ball(chest, coat, .312, .357, .207, 0, -.078, 0);
  ball(chest, seam, .274, .115, .189, 0, -.307, .001);
  ball(chest, flesh, .113, .131, .102, 0, .255, 0);
  ball(chest, ivory, .168, .079, .173, 0, .198, .035);
  box(chest, seam, .02, .36, .016, 0, -.067, .202);
  for (const y of [-.207, -.085, .033]) ball(chest, ivory, .024, .023, .015, .041, y, .206);

  const head = groupAt(chest, 0, .581, .018);
  ball(head, flesh, .352, .370, .306, 0, 0, 0);
  hairCap(head, ink, hairStyle);
  if (hairStyle === 'bun') {
    ball(head, seam, .143, .131, .079, .055, .255, -.265);
    ball(head, ink, .183, .153, .148, .081, .294, -.337);
    ball(head, lock, .113, .072, .047, .085, .33, -.46).rotation.z = .28;
  }
  const eyelids = [];
  for (const s of [-1, 1]) {
    ball(head, flesh, .083, .105, .073, s * .336, -.025, -.012);
    ball(head, blush, .041, .057, .035, s * .382, -.03, .027);
    const bob = hairStyle === 'bob', cropped = hairStyle === 'crop';
    const sideLock = ball(head, ink, bob ? .099 : .080, bob ? .266 : cropped ? .125 : s === 1 ? .209 : .17,
      bob ? .151 : .116, s * .315, bob ? -.008 : .14, bob ? .027 : .097);
    sideLock.rotation.z = s * .24;
    ball(head, blush, .064, .031, .012, s * .211, -.071, .239).rotation.y = s * .53;
    const eye = groupAt(head, s * .124, .025, .284);
    eye.rotation.y = s * .26;
    ball(eye, ivory, .078, .086, .022, 0, 0, 0);
    ball(eye, eyes, .049, .070, .022, .009, -.004, .017);
    ball(eye, shine, .019, .020, .009, -.005, .022, .037);
    ball(eye, shine, .008, .009, .006, .026, -.027, .035);
    eyelids.push(eye);
    tube(head, ink, [[s * .071,.130,.279],[s * .124,.149,.275],[s * .181,.130,.25]], .013);
  }
  ball(head, flesh, .050, .041, .042, 0, -.062, .294);
  tube(head, mouth, [[-.055,-.138,.277],[0,-.157,.285],[.055,-.133,.276]], .010);
  ball(head, lock, .191, .070, .091, -.135, .232, .234).rotation.z = .70;
  ball(head, ink, .163, .064, .105, -.085, .211, .247).rotation.z = .57;
  ball(head, ink, .145, .071, .102, .142, .242, .237).rotation.z = -.83;
  if (hat != null) {
    const felt = mat(hat), band = mat(tint(hat, 0x41323e, .26));
    const cap = groupAt(head, 0, .276, -.024);
    cap.rotation.z = -.13;
    ball(cap, felt, .371, .178, .318, 0, .017, 0);
    ball(cap, band, .376, .060, .324, 0, -.025, 0);
    ball(cap, felt, .265, .032, .145, -.023, -.052, .229).rotation.x = .14;
  }

  const arms = [], shins = [], legs = [];
  for (const s of [-1, 1]) {
    const arm = groupAt(chest, s * .267, .104, 0);
    ball(arm, coat, .124, .194, .132, s * .033, -.120, 0);
    ball(arm, cuff, .090, .080, .096, s * .041, -.268, 0);
    ball(arm, flesh, .079, .093, .075, s * .043, -.352, .012);
    ball(arm, flesh, .036, .061, .046, -s * .016, -.335, .042);
    arms.push(arm);
    const leg = groupAt(rig, s * .154, .827, 0);
    ball(leg, trousers, .134, .234, .137, 0, -.125, 0);
    const shin = groupAt(leg, 0, -.342, 0);
    ball(shin, trousers, .118, .194, .122, 0, -.14, 0);
    ball(shin, hem, .119, .057, .128, 0, -.266, .007);
    ball(shin, shoe, .128, .091, .206, 0, -.365, .076);
    ball(shin, sole, .133, .033, .213, 0, -.447, .076);
    ball(shin, ivory, .077, .013, .027, 0, -.299, .121);
    legs.push(leg); shins.push(shin);
  }

  if (bag != null) {
    const canvas = mat(bag), binding = mat(tint(bag, 0x5b4848, .30)), flap = mat(tint(bag, 0xfff1d6, .23));
    if (bagStyle === 'satchel') {
      tube(chest, binding, [[-.217,.20,-.118],[-.227,.193,.152],[-.10,.073,.216],[.091,-.12,.21],[.298,-.317,.090]], .026);
      tube(chest, binding, [[-.217,.20,-.118],[-.183,.163,-.172],[.12,-.137,-.202],[.309,-.305,-.13]], .025);
      const pouch = groupAt(chest, .34, -.329, -.044);
      pouch.rotation.y = .52;
      pouch.rotation.z = .12;
      ball(pouch, binding, .193, .191, .112, 0, 0, 0);
      ball(pouch, canvas, .183, .171, .117, 0, .012, .022);
      ball(pouch, flap, .179, .086, .121, 0, .083, .039);
      box(pouch, ivory, .070, .043, .018, 0, .036, .159);
    } else {
      ball(chest, binding, .279, .309, .189, 0, -.086, -.209);
      ball(chest, canvas, .265, .286, .192, 0, -.088, -.241);
      ball(chest, flap, .211, .109, .106, 0, .025, -.382);
      ball(chest, binding, .190, .111, .09, 0, -.202, -.364);
      ball(chest, canvas, .178, .088, .093, 0, -.196, -.385);
      box(chest, ivory, .088, .053, .013, 0, -.02, -.482);
      tube(chest, binding, [[-.071,.154,-.265],[-.063,.227,-.223],[.065,.227,-.223],[.071,.154,-.265]], .023);
      for (const s of [-1, 1]) {
        tube(chest, binding, [[s*.169,.156,-.224],[s*.209,.213,-.041],[s*.223,.163,.131],[s*.249,-.082,.153],[s*.225,-.245,.063],[s*.198,-.298,-.23]], .026);
      }
    }
  }
  markShadows(group);

  function pose(time, moving, seated = false) {
    const t = time * TAU * 1.76;
    const stride = moving ? sin(t) : 0;
    rig.position.y = moving ? .021 * (1 - cos(2 * t)) : .012 * (1 + sin(time * 3.2));
    chest.rotation.set(moving ? .065 : .013, -.136 * stride, moving ? -.035 * cos(t) : .016 * sin(time * 2));
    head.rotation.set(-.027 + .033 * sin(time * (moving ? 5.8 : 2.1)), .046 * sin(time * 2), .025 * cos(time * 2.1));
    for (let i = 0; i < 2; i++) {
      const s = i === 0 ? -1 : 1;
      const step = s * stride;
      legs[i].rotation.x = -.59 * step;
      shins[i].rotation.x = moving ? .045 + .46 * Math.max(0, -s * cos(t)) ** 2 : 0;
      arms[i].rotation.x = .51 * step - .065;
      arms[i].rotation.z = s * (.18 + .045 * Math.abs(stride));
    }
    if (seated) {
      rig.position.y -= .31;
      chest.rotation.x = -.1;
      for (let i = 0; i < 2; i++) {
        legs[i].rotation.x = -1.47;
        shins[i].rotation.x = 1.36;
        arms[i].rotation.x = -.42;
      }
    }
    const blink = Math.abs((((time + 1.1) % 4.35) + 4.35) % 4.35 - 2.1);
    for (const eye of eyelids) eye.scale.y = blink < .082 ? .09 + .91 * smooth(blink / .082) : 1;
  }
  pose(0, false);
  return { group, pose };
}
