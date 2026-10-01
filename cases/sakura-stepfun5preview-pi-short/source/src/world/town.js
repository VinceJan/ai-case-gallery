// 小镇总装：地形 + 建筑 + 植被 + 街道设施 + 交通 + 粒子
import * as THREE from 'three';
import { MAT, TEX, StaticBatcher, buildMaterials, buildTextures } from './materials.js';
import { ROADS, TOWN, BUILDINGS, terrainHeight } from './layout.js';
import { buildTerrain } from './terrain.js';
import { buildBuilding } from './buildings.js';
import { buildInterior } from './interiors.js';
import * as P from './props.js';
import { makeRng, clamp, lerp } from '../core/utils.js';

// 与道路/建筑保持距离
function distToRoad(x, z) {
  let best = 1e9;
  for (const r of ROADS) {
    const dx = r.x2 - r.x1, dz = r.z2 - r.z1;
    const L2 = dx * dx + dz * dz;
    let t = ((x - r.x1) * dx + (z - r.z1) * dz) / L2;
    t = clamp(t, 0, 1);
    best = Math.min(best, Math.hypot(x - (r.x1 + dx * t), z - (r.z1 + dz * t)) - r.w / 2);
  }
  return best;
}
function distToBuilding(x, z) {
  let best = 1e9;
  for (const b of BUILDINGS) {
    const c = Math.cos(-b.rotY), s = Math.sin(-b.rotY);
    const dx = x - b.x, dz = z - b.z;
    const lx = dx * c - dz * s, lz = dx * s + dz * c;
    const ex = Math.max(Math.abs(lx) - b.w / 2, 0), ez = Math.max(Math.abs(lz) - b.d / 2, 0);
    best = Math.min(best, Math.hypot(ex, ez));
  }
  return best;
}

// ============ 花瓣粒子 ============
class PetalSystem {
  constructor(scene, count = 650) {
    this.count = count;
    const geo = new THREE.InstancedBufferGeometry();
    const quad = new THREE.PlaneGeometry(0.16, 0.16);
    geo.index = quad.index;
    geo.attributes.position = quad.attributes.position;
    geo.attributes.uv = quad.attributes.uv;
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      seeds[i * 3] = Math.random() * 200 - 100;      // x offset
      seeds[i * 3 + 1] = Math.random() * 40;          // y
      seeds[i * 3 + 2] = Math.random() * 200 - 100;   // z offset
    }
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 3));
    geo.instanceCount = count;
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uWind: { value: 0.3 },
        uCenter: { value: new THREE.Vector3() },
        uDensity: { value: 0.5 },
        uMap: { value: TEX.petal },
      },
      vertexShader: `
        attribute vec3 aSeed;
        uniform float uTime, uWind, uDensity;
        uniform vec3 uCenter;
        varying vec2 vUv;
        varying float vFade;
        void main() {
          vUv = uv;
          float span = 90.0;
          vec3 p;
          p.x = mod(aSeed.x + uTime * (1.2 + uWind * 3.0) + uCenter.x + span*0.5, span) - span*0.5 + uCenter.x;
          p.z = mod(aSeed.z + uTime * 0.4 * (0.5 + uWind) + uCenter.z + span*0.5, span) - span*0.5 + uCenter.z;
          float fall = mod(aSeed.y - uTime * (0.9 + uWind * 1.4), 40.0);
          p.y = 22.0 - fall;
          // 摇曳
          float sw = sin(uTime * 2.2 + aSeed.x * 3.1 + aSeed.z) * (0.6 + uWind * 2.2);
          p.x += sw;
          p.z += cos(uTime * 1.7 + aSeed.z * 2.3) * (0.4 + uWind * 1.6);
          // 可见密度（远处/低密度渐隐）
          float d = length(p.xz - uCenter.xz);
          vFade = smoothstep(46.0, 12.0, d) * uDensity;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D uMap;
        varying vec2 vUv;
        varying float vFade;
        void main() {
          vec4 t = texture2D(uMap, vUv);
          gl_FragColor = vec4(t.rgb, t.a * vFade * 0.95);
          if (gl_FragColor.a < 0.03) discard;
        }`,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
    scene.add(this.mesh);
    this.mat = mat;
  }
  update(dt, t, wind, density, center) {
    this.mat.uniforms.uTime.value = t;
    this.mat.uniforms.uWind.value = wind;
    this.mat.uniforms.uDensity.value = density;
    this.mat.uniforms.uCenter.value.copy(center);
    this.mesh.visible = density > 0.02;
  }
}

// ============ 雨粒子 ============
class RainSystem {
  constructor(scene, count = 900) {
    this.count = count;
    const geo = new THREE.InstancedBufferGeometry();
    const streak = new THREE.BoxGeometry(0.035, 0.95, 0.035);
    geo.index = streak.index;
    geo.attributes.position = streak.attributes.position;
    geo.attributes.uv = streak.attributes.uv;
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      seeds[i * 3] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
    }
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 3));
    geo.instanceCount = count;
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uCenter: { value: new THREE.Vector3() },
        uIntensity: { value: 0 },
      },
      vertexShader: `
        attribute vec3 aSeed;
        uniform float uTime, uIntensity;
        uniform vec3 uCenter;
        varying float vFade;
        void main() {
          float span = 60.0;
          vec3 p;
          p.x = mod(aSeed.x * span + uCenter.x + span*0.5, span) - span*0.5 + uCenter.x;
          p.z = mod(aSeed.z * span + uCenter.z + span*0.5, span) - span*0.5 + uCenter.z;
          float fall = mod(aSeed.y * 30.0 - uTime * (14.0 + uIntensity * 8.0), 30.0);
          p.y = 20.0 - fall;
          // 风斜
          p.x += uIntensity * 3.0;
          float d = length(p.xz - uCenter.xz);
          vFade = smoothstep(32.0, 8.0, d) * uIntensity;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vFade;
        void main() {
          gl_FragColor = vec4(0.75, 0.85, 0.95, vFade * 0.5);
        }`,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 6;
    this.mesh.visible = false;
    scene.add(this.mesh);
    this.mat = mat;
  }
  update(dt, t, intensity, center) {
    this.mat.uniforms.uTime.value = t;
    this.mat.uniforms.uIntensity.value = intensity;
    this.mat.uniforms.uCenter.value.copy(center);
    this.mesh.visible = intensity > 0.08;
  }
}

// ============ 烟花 ============
class Fireworks {
  constructor(scene) {
    this.group = new THREE.Group();
    this.group.visible = false;
    scene.add(this.group);
    this.bursts = [];
    this.timer = 0;
  }
  start() { this.group.visible = true; this.timer = 0; }
  stop() { this.group.visible = false; for (const b of this.bursts) b.points.geometry.dispose(); this.bursts = []; }
  burst(x, y, z, color) {
    const n = 60;
    const pos = new Float32Array(n * 3);
    const vel = [];
    for (let i = 0; i < n; i++) {
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      const a = Math.random() * Math.PI * 2, e = Math.random() * Math.PI - Math.PI / 2;
      const sp = 6 + Math.random() * 6;
      vel.push(new THREE.Vector3(Math.cos(a) * Math.cos(e) * sp, Math.sin(e) * sp + 3, Math.sin(a) * Math.cos(e) * sp));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color, size: 0.5, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geo, mat);
    this.group.add(points);
    this.bursts.push({ points, vel, life: 2.2 });
  }
  update(dt, center) {
    if (!this.group.visible) return;
    this.timer -= dt;
    if (this.timer <= 0) {
      const a = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * 40;
      this.burst(center.x + Math.cos(a) * r, 30 + Math.random() * 12, center.z + Math.sin(a) * r,
        [0xff9eb8, 0xffd98a, 0x9ec9ff, 0xc9a0ff][Math.floor(Math.random() * 4)]);
      this.timer = 0.9 + Math.random() * 0.8;
    }
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.life -= dt;
      const pos = b.points.geometry.attributes.position;
      for (let k = 0; k < pos.count; k++) {
        b.vel[k].y -= 9 * dt;
        pos.setXYZ(k, pos.getX(k) + b.vel[k].x * dt, pos.getY(k) + b.vel[k].y * dt, pos.getZ(k) + b.vel[k].z * dt);
      }
      pos.needsUpdate = true;
      b.points.material.opacity = Math.max(0, b.life / 2.2);
      if (b.life <= 0) {
        this.group.remove(b.points);
        b.points.geometry.dispose();
        b.points.material.dispose();
        this.bursts.splice(i, 1);
      }
    }
  }
}

// ============ 小镇 ============
export function buildTown(scene, graph, report) {
  buildTextures();
  buildMaterials();
  const batcher = new StaticBatcher();
  const colliders = [];
  const lamps = [];       // 路灯位置
  const dynamic = [];     // 每帧更新对象

  report?.('铺设道路与地形…', 12);
  buildTerrain(scene, batcher, colliders, graph);

  // —— 建筑 ——
  report?.('建造房屋与商店…', 30);
  const buildings = [];
  for (const b of BUILDINGS) {
    const info = buildBuilding(b, batcher, scene, colliders);
    buildings.push(info);
  }
  const batchGroup = batcher.build(scene, { shadow: true });
  batchGroup.name = 'town-static';

  // —— 樱花树与绿化 ——
  report?.('栽种樱花树…', 45);
  const rng = makeRng(20240408);
  const trees = new THREE.Group();
  scene.add(trees);
  const treeSpots = [];
  // 主街樱花道
  for (let z = -34; z <= 68; z += 13) {
    treeSpots.push([5.9, z], [-5.9, z + 6]);
  }
  // 商店街两侧
  for (let x = -54; x <= 58; x += 16) treeSpots.push([x, -53.5]);
  // 公园
  const parkSpots = [[-24, 30], [-34, 28], [-52, 40], [-58, 50], [-26, 50], [-48, 28], [-20, 44], [-58, 30]];
  treeSpots.push(...parkSpots);
  // 神社境内
  for (let i = 0; i < 14; i++) {
    const a = rng() * Math.PI * 2, r = 12 + rng() * 20;
    treeSpots.push([Math.cos(a) * r, 102 + Math.sin(a) * r]);
  }
  // 北岸樱林（桥的北侧低地）
  for (let i = 0; i < 9; i++) {
    const a = rng() * Math.PI * 2, r = 4 + rng() * 12;
    treeSpots.push([Math.cos(a) * r, -146 + Math.sin(a) * r * 0.45]);
  }
  // 住宅区点缀
  treeSpots.push([-118, -24], [-118, 44], [-82, -24], [-82, 44], [-118, 4], [66, 8], [66, 56], [110, -30], [124, 20], [-60, 68], [60, 118], [-40, 118]);
  let treeCount = 0;
  for (const [x, z] of treeSpots) {
    if (distToRoad(x, z) < 2.2) continue;
    if (distToBuilding(x, z) < 3.5) continue;
    if (Math.abs(x) > 130 || z < -148 || z > 120) continue;
    const t = P.sakuraTree(0.9 + rng() * 0.4, rng);
    t.position.set(x, terrainHeight(x, z), z);
    t.rotation.y = rng() * 6.28;
    trees.add(t);
    if (rng() > 0.6) {
      const sh = P.groundShadow(3.4);
      sh.position.set(x, terrainHeight(x, z) + 0.02, z);
      trees.add(sh);
    }
    colliders.push({ x, z, hw: 0.4, hd: 0.4, kind: 'tree' });
    treeCount++;
  }
  // 松树（神社后山、农场）
  for (let i = 0; i < 10; i++) {
    const a = rng() * 6.28, r = 22 + rng() * 10;
    const x = Math.cos(a) * r, z = 118 + Math.sin(a) * r * 0.6;
    if (distToBuilding(x, z) < 3) continue;
    const t = P.pineTree(0.9 + rng() * 0.3, rng);
    t.position.set(x, terrainHeight(x, z), z);
    trees.add(t);
    colliders.push({ x, z, hw: 0.4, hd: 0.4, kind: 'tree' });
  }
  // 灌木与花
  for (let i = 0; i < 40; i++) {
    const x = (rng() - 0.5) * 250, z = (rng() - 0.5) * 250 + 10;
    if (distToRoad(x, z) < 2.5 || distToBuilding(x, z) < 3) continue;
    if (z < -120 || z > 124) continue;
    const b = rng() > 0.5 ? P.bush(0.7 + rng() * 0.6) : P.flowerPatch(rng);
    b.position.set(x, terrainHeight(x, z), z);
    trees.add(b);
  }

  // —— 路灯 ——
  report?.('安装路灯与电线…', 55);
  const lampGroup = new THREE.Group();
  scene.add(lampGroup);
  const addLamp = (x, z, rotY = 0) => {
    const l = P.streetLamp();
    l.position.set(x, terrainHeight(x, z), z);
    l.rotation.y = rotY;
    lampGroup.add(l);
    lamps.push({ x, z, y: terrainHeight(x, z) + 4.2 });
    colliders.push({ x, z, hw: 0.2, hd: 0.2, kind: 'lamp' });
  };
  for (let z = -36; z <= 84; z += 22) { addLamp(3.6, z); addLamp(-3.6, z + 11, Math.PI); }
  for (let x = -54; x <= 58; x += 20) { addLamp(x, -43.5); addLamp(x + 10, -36.5, Math.PI); }
  for (let x = -64; x <= 64; x += 26) { addLamp(x, 23.4); addLamp(x + 13, 16.6, Math.PI); }
  for (let x = -64; x <= 64; x += 26) { addLamp(x, 63.4); addLamp(x + 13, 56.6, Math.PI); }
  for (let z = -84; z <= -44; z += 20) { addLamp(-33.6, z); addLamp(-26.4, z + 10, Math.PI); }
  addLamp(0, -95); addLamp(-52, -95); addLamp(0, -118);
  for (let z = -36; z <= 108; z += 26) { addLamp(-73.6, z); addLamp(73.6, z + 13, Math.PI); }

  // 电线杆 + 电线
  const poles = [];
  const addPole = (x, z) => {
    const p = P.utilityPole();
    p.position.set(x, terrainHeight(x, z), z);
    lampGroup.add(p);
    poles.push({ x, z, y: terrainHeight(x, z) + 5.3 });
    colliders.push({ x, z, hw: 0.18, hd: 0.18, kind: 'pole' });
  };
  for (let z = -38; z <= 112; z += 26) { addPole(-68, z); addPole(68, z); }
  for (let x = -66; x <= 66; x += 26) { addPole(x, 22); addPole(x, 62); }
  addPole(-66, -38); addPole(-28, -88);
  // 悬链线
  const byKey = (k) => poles.filter((p) => Math.abs(p.x - k) < 0.1 || Math.abs(p.z - k) < 0.1);
  for (let i = 0; i < poles.length - 1; i++) {
    const a = poles[i], b = poles[i + 1];
    if (Math.hypot(a.x - b.x, a.z - b.z) < 30) {
      lampGroup.add(P.wireBetween(a, b, 0.9));
      lampGroup.add(P.wireBetween({ ...a, y: a.y - 0.5 }, { ...b, y: b.y - 0.5 }, 1.1));
    }
  }

  // —— 街道设施 ——
  report?.('摆放长椅与自动售货机…', 62);
  const propGroup = new THREE.Group();
  scene.add(propGroup);
  const benchSpots = [];
  const vendingSpots = [];
  const addProp = (obj, x, z, rotY = 0, coll = 0.4) => {
    obj.position.set(x, terrainHeight(x, z), z);
    obj.rotation.y = rotY;
    propGroup.add(obj);
    if (coll) colliders.push({ x, z, hw: coll, hd: coll, kind: 'prop' });
    return obj;
  };
  // 长椅（公园等）
  for (const [bx, bz, br] of [[-26, 30, 0.2], [-56, 48, -Math.PI / 2], [-30, 52, Math.PI * 0.9],
    [75, -27, -Math.PI / 2], [-33, -89, 0], [14, -117.5, Math.PI], [-16, -117.5, Math.PI], [2, 66, 0], [0, -96, 0]]) {
    addProp(P.bench(), bx, bz, br);
    benchSpots.push({ x: bx, z: bz, rotY: br });
  }
  // 自动售货机
  for (const [vx, vz, vr] of [[1.5, -37, Math.PI], [-56, -37, 0], [-1.5, 24, Math.PI],
    [-33.5, -84, Math.PI / 2], [76, -32, 0], [-75, 24, 0]]) {
    addProp(P.vendingMachine(), vx, vz, vr, 0.6);
    vendingSpots.push({ x: vx, z: vz });
  }
  // 邮筒、垃圾桶
  addProp(P.mailbox(), 82.5, -18, 0);
  addProp(P.mailbox(), -83.5, 46, Math.PI);
  addProp(P.trashCan(), 4, -45.5);
  addProp(P.trashCan(), -4, -45.5);
  addProp(P.trashCan(), 58, -45.5);
  addProp(P.trashCan(), -18, 24);
  addProp(P.trashCan(), -52, -89);
  // 自行车停放
  for (let i = 0; i < 3; i++) addProp(P.bicycle([0x3f8a8a, 0xd96f4a, 0x4a7fb5][i]), -38 + i * 1.6, -86.5, 0.1 * i, 0.3);
  addProp(P.bicycle(0x5f9e6e), 78, 6, 0, 0.3);
  // 公交站
  addProp(P.busStop(), 74.5, -28, -Math.PI / 2, 0.2);
  // 鸟居与石灯笼
  addProp(P.torii(1.0), 0, 72.5, 0, 0.2);
  addProp(P.torii(0.9), 0, 88, 0, 0.2);
  addProp(P.torii(1.1), 0, -144, 0, 0.2);   // 北岸大门
  for (let i = 0; i < 5; i++) {
    const z = 74 + i * 4.2;
    for (const s of [-1, 1]) {
      const l = P.stoneLantern();
      l.position.set(s * 3.2, terrainHeight(s * 3.2, z), z);
      propGroup.add(l);
      colliders.push({ x: s * 3.2, z, hw: 0.3, hd: 0.3, kind: 'lantern' });
    }
  }
  addProp(P.stoneLantern(), 3.5, 97, 0);
  addProp(P.stoneLantern(), -3.5, 97, 0);
  addProp(P.emaRack(), 2.8, 99, -0.4);
  addProp(P.shrineOfferingBox(), 0, 98.5, 0, 0.5);
  // 指示牌
  addProp(P.waySign('商店街'), 0, -43, Math.PI, 0.1);
  addProp(P.waySign('樱花神社'), 2.5, 68, Math.PI, 0.1);
  addProp(P.waySign('公园'), -14, 22, -Math.PI / 2, 0.1);
  addProp(P.waySign('樱花站'), -28, -86, -Math.PI / 2, 0.1);
  addProp(P.waySign('住宅区'), -66, 18, -Math.PI / 2, 0.1);
  addProp(P.waySign('水田'), -66, 66, -Math.PI / 2, 0.1);
  addProp(P.waySign('农场'), 66, 66, Math.PI / 2, 0.1);

  // —— 商店街拱廊 ——
  report?.('搭建商店街拱廊…', 68);
  const arcade = new THREE.Group();
  scene.add(arcade);
  const arcRoof1 = new THREE.Mesh(new THREE.BoxGeometry(128, 0.18, 5.2), new THREE.MeshToonMaterial({ color: 0xe8ddc8, gradientMap: MAT.plaster.gradientMap }));
  arcRoof1.position.set(4, 4.85, -42.4);
  arcRoof1.rotation.x = 0.16;
  arcRoof1.castShadow = true;
  arcade.add(arcRoof1);
  const arcRoof2 = arcRoof1.clone();
  arcRoof2.position.z = -37.6;
  arcRoof2.rotation.x = -0.16;
  arcade.add(arcRoof2);
  const arcTop = new THREE.Mesh(new THREE.BoxGeometry(128, 0.2, 1.6), new THREE.MeshToonMaterial({ color: 0xd8cbb0, gradientMap: MAT.plaster.gradientMap }));
  arcTop.position.set(4, 5.35, -40);
  arcade.add(arcTop);
  for (let x = -56; x <= 62; x += 7.5) {
    for (const z of [-44.6, -35.4]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 4.6, 8), MAT.metal);
      pillar.position.set(x, 2.3, z);
      arcade.add(pillar);
    }
    // 拱廊吊花
    if (x % 15 === 0) {
      for (let i = 0; i < 4; i++) {
        const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14, 0), MAT.sakura);
        f.position.set(x - 1 + i * 0.7, 4.6, -40);
        arcade.add(f);
      }
    }
  }

  // —— 交通：电车 ——
  report?.('调度电车与汽车…', 76);
  const trainGroup = new THREE.Group();
  scene.add(trainGroup);
  const train = {
    group: trainGroup,
    x: -120,
    dir: 1,
    speed: 22,
    state: 'running', // running | docking | docked
    dockTimer: 0,
    cars: [],
  };
  for (let i = 0; i < 2; i++) {
    const c = P.trainCar();
    c.position.z = -i * 18.5;
    trainGroup.add(c);
    train.cars.push(c);
  }
  trainGroup.position.set(train.x, 0, TOWN.track.z);
  const updateTrain = (dt, gameDt) => {
    const stationX = -28;
    if (train.state === 'running') {
      train.x += train.dir * train.speed * dt;
      // 接近车站减速
      const dist = Math.abs(train.x - stationX);
      if (dist < 26 && train.dir === 1 && train.x < stationX) {
        train.speed = Math.max(2.5, train.speed - 30 * dt);
        if (dist < 0.6) { train.state = 'docked'; train.speed = 0; train.dockTimer = 200; }
      } else if (train.speed < 22) train.speed = Math.min(22, train.speed + 12 * dt);
      if (train.x > 170) { train.x = -170; }
    } else if (train.state === 'docked') {
      train.dockTimer -= gameDt;
      if (train.dockTimer <= 0) { train.state = 'running'; train.dir = 1; train.speed = 6; }
    }
    trainGroup.position.x = train.x;
  };

  // 汽车（环路）
  const carLoop = [
    { x: -66, z: -30 }, { x: -66, z: 60 }, { x: 66, z: 60 }, { x: 66, z: -30 },
  ];
  const cars = [];
  const carColors = [0x8a97a8, 0xd8d4cc, 0x7a9ab0, 0xb08a8a];
  for (let i = 0; i < 2; i++) {
    const c = P.car(carColors[i]);
    scene.add(c);
    cars.push({ group: c, t: i * 0.5, speed: 7.5, seg: 0 });
  }
  const updateCars = (dt) => {
    for (const car of cars) {
      const a = carLoop[car.seg], b = carLoop[(car.seg + 1) % carLoop.length];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      car.t += (car.speed * dt) / len;
      if (car.t >= 1) { car.t = 0; car.seg = (car.seg + 1) % carLoop.length; }
      const a2 = carLoop[car.seg], b2 = carLoop[(car.seg + 1) % carLoop.length];
      car.group.position.x = a2.x + (b2.x - a2.x) * car.t;
      car.group.position.z = a2.z + (b2.z - a2.z) * car.t;
      car.group.position.y = terrainHeight(car.group.position.x, car.group.position.z);
      car.group.rotation.y = Math.atan2(b2.x - a2.x, b2.z - a2.z);
    }
  };

  // 公交巴士（环路 + 站点停靠）
  const busGroup = new THREE.Group();
  scene.add(busGroup);
  {
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.3, 7.5), new THREE.MeshToonMaterial({ color: 0x3f7a5f, gradientMap: MAT.plaster.gradientMap }));
    body.position.y = 1.5;
    body.castShadow = true;
    busGroup.add(body);
    for (const sx of [-1, 1]) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 6.2), MAT.windowLit);
      win.position.set(sx * 1.17, 2.0, 0);
      busGroup.add(win);
    }
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.0), new THREE.MeshBasicMaterial({ color: 0x2a3a4a, toneMapped: false }));
    face.position.set(0, 1.7, 3.78);
    busGroup.add(face);
    for (const [wx, wz] of [[-1.0, 2.2], [1.0, 2.2], [-1.0, -2.2], [1.0, -2.2]]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 10), MAT.tire);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.42, wz);
      busGroup.add(wheel);
    }
  }
  const busState = { t: 0, seg: 0, speed: 8, stopTimer: 0, stopping: false };
  const updateBus = (dt, gameDt) => {
    if (busState.stopTimer > 0) {
      busState.stopTimer -= gameDt;
      return;
    }
    const a = carLoop[busState.seg], b = carLoop[(busState.seg + 1) % carLoop.length];
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    busState.t += (busState.speed * dt) / len;
    if (busState.t >= 1) { busState.t = 0; busState.seg = (busState.seg + 1) % carLoop.length; }
    const a2 = carLoop[busState.seg], b2 = carLoop[(busState.seg + 1) % carLoop.length];
    const px = a2.x + (b2.x - a2.x) * busState.t, pz = a2.z + (b2.z - a2.z) * busState.t;
    // 接近公交站 (74,-28) 停靠
    const dStop = Math.hypot(px - 74, pz + 28);
    if (dStop < 6 && !busState.stopping) {
      busState.stopping = true;
      busState.stopTimer = 90; // 游戏分钟
    }
    if (busState.stopping && dStop > 8) busState.stopping = false;
    busGroup.position.set(px, terrainHeight(px, pz), pz);
    busGroup.rotation.y = Math.atan2(b2.x - a2.x, b2.z - a2.z);
  };

  // 猫
  const cats = [];
  for (let i = 0; i < 2; i++) {
    const c = P.cat([0xd9a45a, 0x8a8a90][i]);
    scene.add(c);
    cats.push({
      group: c,
      x: i === 0 ? 6 : -8, z: i === 0 ? 92 : 30,
      tx: 0, tz: 0, wait: 0,
      zone: i === 0 ? { x: 0, z: 96, r: 22 } : { x: -40, z: 36, r: 20 },
    });
  }
  const updateCats = (dt) => {
    for (const cat of cats) {
      if (cat.wait > 0) {
        cat.wait -= dt;
        cat.group.rotation.y += dt * 0.8;
        continue;
      }
      const d = Math.hypot(cat.x - cat.tx, cat.z - cat.tz);
      if (d < 0.5) {
        cat.wait = 2 + Math.random() * 5;
        const a = Math.random() * Math.PI * 2, r = Math.random() * cat.zone.r;
        cat.tx = cat.zone.x + Math.cos(a) * r;
        cat.tz = cat.zone.z + Math.sin(a) * r;
      } else {
        const sp = 1.1 * dt;
        const ang = Math.atan2(cat.tx - cat.x, cat.tz - cat.z);
        cat.x += Math.sin(ang) * sp;
        cat.z += Math.cos(ang) * sp;
        cat.group.rotation.y = ang;
      }
      cat.group.position.set(cat.x, terrainHeight(cat.x, cat.z), cat.z);
    }
  };

  // —— 粒子系统 ——
  report?.('撒下樱花雨…', 78);
  const petals = new PetalSystem(scene, 650);
  const rain = new RainSystem(scene, 900);
  const fireworks = new Fireworks(scene);

  // 祭典摊位（默认隐藏）
  const stalls = new THREE.Group();
  stalls.visible = false;
  scene.add(stalls);
  const stallDefs = [
    { kind: 'food', x: -8, z: 70, rotY: 0 },
    { kind: 'drink', x: 8, z: 70, rotY: 0 },
    { kind: 'food', x: -14, z: 74, rotY: 0.3 },
    { kind: 'game', x: 14, z: 74, rotY: -0.3 },
  ];
  const stallObjs = [];
  for (const s of stallDefs) {
    const st = P.festivalStall(s.kind);
    st.position.set(s.x, terrainHeight(s.x, s.z), s.z);
    st.rotation.y = s.rotY;
    stalls.add(st);
    stallObjs.push(st);
  }
  // 夜间集市摊位
  const nightStalls = new THREE.Group();
  nightStalls.visible = false;
  scene.add(nightStalls);
  for (const [i, s] of [[0, { x: 20, z: -44 }], [1, { x: 34, z: -36 }]].entries()) {
    const st = P.festivalStall(i === 0 ? 'food' : 'drink');
    st.position.set(s.x, terrainHeight(s.x, s.z), s.z);
    st.rotation.y = i === 0 ? -Math.PI / 2 : Math.PI / 2;
    nightStalls.add(st);
  }

  // 路灯实光（池）
  const lampLights = [];
  for (let i = 0; i < 8; i++) {
    const pl = new THREE.PointLight(0xffd9a0, 0, 30, 1.5);
    scene.add(pl);
    lampLights.push(pl);
  }
  let lampAssignTimer = 0;

  // —— 夜晚外观切换 ——
  const setNightLook = (night) => {
    MAT.windowLit.color.set(night ? 0xffd98a : 0x39434e);
    MAT.lampOn.color.set(night ? 0xffe2ae : 0xb0a894);
    MAT.lantern.color.set(night ? 0xfff0d0 : 0xe0d6c0);
  };
  setNightLook(false);

  const interiorCache = new Map();
  const getInterior = (info) => {
    if (!interiorCache.has(info.building.id)) {
      interiorCache.set(info.building.id, buildInterior(info));
    }
    return interiorCache.get(info.building.id);
  };

  return {
    buildings,
    colliders,
    benches: benchSpots,
    vending: vendingSpots,
    lamps,
    petals,
    rain,
    fireworks,
    train,
    cars,
    busGroup,
    cats,
    stalls,
    nightStalls,
    stallObjs,
    setNightLook,
    getInterior,
    treeCount,
    update(dt, gameDt, ctx) {
      // ctx: {playerPos, elapsed, wind, petalDensity, rainIntensity, night}
      updateTrain(dt, gameDt);
      updateCars(dt);
      updateBus(dt, gameDt);
      updateCats(dt);
      petals.update(dt, ctx.elapsed, ctx.wind, ctx.petalDensity, ctx.playerPos);
      rain.update(dt, ctx.elapsed, ctx.rainIntensity, ctx.playerPos);
      fireworks.update(dt, ctx.playerPos);
      // 路灯实光分配
      lampAssignTimer -= dt;
      if (lampAssignTimer <= 0) {
        lampAssignTimer = 0.3;
        if (ctx.night) {
          const sorted = lamps
            .map((l) => ({ l, d: Math.hypot(l.x - ctx.playerPos.x, l.z - ctx.playerPos.z) }))
            .sort((a, b) => a.d - b.d)
            .slice(0, lampLights.length);
          lampLights.forEach((pl, i) => {
            if (sorted[i] && sorted[i].d < 46) {
              pl.position.set(sorted[i].l.x, sorted[i].l.y, sorted[i].l.z);
              pl.intensity = 34;
            } else pl.intensity = 0;
          });
        } else {
          for (const pl of lampLights) pl.intensity = 0;
        }
      }
    },
  };
}
