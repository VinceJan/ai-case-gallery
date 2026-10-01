/**
 * 世界装配：把地形、水面、道路、建筑、地标、植被、室内空间、铁道
 * 全部组装起来，并对外提供地面高度、碰撞、可交互点等查询。
 */
import * as THREE from 'three';
import { ColliderSet } from '../core/collide.js';
import { clamp, lerp, makeRNG, smoothstep } from '../core/utils.js';
import { MaterialLibrary } from './materials.js';
import { Terrain, Water, heightAt, rail, river, HALF } from './terrain.js';
import { buildRoads, buildBridge, buildCrossingMarkings, buildPlatform, buildTunnelPortal } from './roads.js';
import { buildBuilding, buildingBaseY } from './buildings.js';
import { buildProp } from './props.js';
import { Vegetation } from './vegetation.js';
import { buildInteriors, INTERIOR_Y } from './interiors.js';
import { addStreetLamp } from './kit.js';
import { GeoBuilder } from '../core/geobuilder.js';
import { boxGeometry } from '../core/toon.js';
import {
  BUILDINGS, CROSSING, LANDMARKS, ROADS, buildingById, doorPosition, makePolyline2D,
} from './layout.js';

export class World {
  constructor(scene, sky, audio) {
    this.scene = scene;
    this.sky = sky;
    this.audio = audio;
    this.mats = new MaterialLibrary();
    this.colliders = new ColliderSet();
    this.rng = makeRNG(20240401);

    /** 户外（进室内时整体隐藏） */
    this.outdoor = new THREE.Group();
    this.outdoor.name = 'outdoor';
    scene.add(this.outdoor);

    /** 可交互点（含建筑门） */
    this.interactables = [];
    this.doors = [];

    this._buildTerrain();
    this._buildRoads();
    this.veg = new Vegetation(this.mats);
    this._buildBuildings();
    this._buildLandmarks();
    this._buildVegetation();
    this._buildStreetFurniture();
    this._buildPetals();

    // 室内（独立碰撞体，避免和户外的家具/喷泉互相推挤）
    this.interiorColliders = new ColliderSet();
    const inter = buildInteriors(this.mats, this.interiorColliders);
    this.interiors = inter.rooms;
    this.interiorGroup = inter.group;
    inter.group.visible = false;
    scene.add(this.interiorGroup);

    this._buildGroundProvider();
  }

  // -------------------------------------------------------------------------
  _buildTerrain() {
    this.terrain = new Terrain(1);
    this.outdoor.add(this.terrain.build());
    this.water = new Water();
    this.outdoor.add(this.water.mesh);
  }

  _buildRoads() {
    this.outdoor.add(buildRoads(this.mats));
    const bridge = buildBridge(this.mats);
    this.outdoor.add(bridge);
    this.bridgeInfo = {
      halfW: 5.7,
      z0: bridge.userData.bridgeZ - 13.5,
      z1: bridge.userData.bridgeZ + 13.5,
      y: bridge.userData.bridgeY,
      z: bridge.userData.bridgeZ,
    };
    this.outdoor.add(buildCrossingMarkings(this.mats, CROSSING.x, CROSSING.z));
    // 站台
    this.outdoor.add(buildPlatform(this.mats, -70, -24, 46, 5.6));
    // 隧道洞口
    for (const s of [0, 1]) {
      const p = rail.at(s === 0 ? 7 : rail.length - 7);
      const t = p.tangent;
      const flip = s === 0 ? -1 : 1;
      const portal = buildTunnelPortal(this.mats, p.position.x, p.position.z, t.x * flip, t.z * flip);
      portal.position.set(p.position.x, 0, p.position.z);
      this.outdoor.add(portal);
    }
  }

  _buildBuildings() {
    for (const spec of BUILDINGS) {
      const group = buildBuilding(spec, this.mats);
      this.outdoor.add(group);
      const top = buildingBaseY(spec) + (spec.floors || 1) * 3.0 + 3.0;
      this.colliders.addBox(spec.x, spec.z, spec.w / 2, spec.d / 2, spec.rot || 0, -4, top, `bld_${spec.id}`);
      if (spec.enterable) {
        const d = doorPosition(spec);
        const door = {
          id: `door_${spec.id}`,
          kind: 'door',
          building: spec.id,
          interior: spec.interior,
          x: d.x,
          z: d.z,
          dirX: d.dirX,
          dirZ: d.dirZ,
          radius: 2.0,
          label: `进入 ${spec.label}`,
          prompt: 'E',
        };
        this.interactables.push(door);
        this.doors.push(door);
      }
    }
  }

  _buildLandmarks() {
    for (const spec of LANDMARKS) {
      if (spec.kind === 'sakuragrove' || spec.kind === 'forest') continue;
      const g = buildProp(spec, this.mats, {
        buildSakuraTree: (s, seed) => this.veg.buildSakuraTree(s, seed),
        buildBroadTree: (s, seed) => this.veg.buildBroadTree(s, seed),
      });
      if (!g) continue;
      this.outdoor.add(g);
      if (spec.kind === 'fountain') {
        this.colliders.addCircle(spec.x, spec.z, 3.0, 'fountain');
      }
      if (spec.kind === 'torii') {
        for (const sx of [-1, 1]) {
          this.colliders.addCircle(spec.x + sx * 1.6, spec.z, 0.5, 'torii');
        }
      }
      if (spec.kind === 'monument') {
        this.colliders.addCircle(spec.x, spec.z, 1.4, 'monument');
      }
      if (spec.kind === 'busstop' || spec.kind === 'playground') {
        this.colliders.addCircle(spec.x, spec.z, 1.6, spec.kind);
      }
    }
  }

  _buildVegetation() {
    // 公园樱林 / 神社樱林等
    for (const spec of LANDMARKS) {
      if (spec.kind === 'sakuragrove') {
        this.veg.scatter(spec, 'sakura', spec.n);
      } else if (spec.kind === 'forest') {
        this.veg.scatter(spec, 'pine', spec.n);
      }
    }
    this.veg.mountainForest(3);
    this.veg.grassField(2400);
    this.outdoor.add(this.veg.group);
  }

  _buildStreetFurniture() {
    const b = new GeoBuilder('streetProps');
    const m = this.mats;
    const placed = [];
    // 主街与主要道路沿线排灯
    const lampRoads = ROADS.filter((r) => r.style === 'road' && r.width >= 6.5);
    for (const road of lampRoads) {
      const pts = makePolyline2D(road.pts, 4);
      let acc = 0;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const c = pts[i];
        const dx = c.x - a.x;
        const dz = c.z - a.z;
        const len = Math.hypot(dx, dz);
        acc += len;
        if (acc < 17) continue;
        acc = 0;
        if (river.closest(c.x, c.z).dist < 14) continue;
        const px = -dz / (len || 1);
        const pz = dx / (len || 1);
        const off = road.width / 2 + 0.9;
        for (const s of [-1, 1]) {
          const x = c.x + px * off * s;
          const z = c.z + pz * off * s;
          if (placed.some((p) => Math.hypot(p.x - x, p.z - z) < 14)) continue;
          placed.push({ x, z });
          addStreetLamp(b, m, { x, y: heightAt(x, z), z, ry: Math.atan2(-px * s, -pz * s) }, 4.4, 'round');
        }
      }
    }
    this.outdoor.add(b.build({ thickness: 0.026 }));
    this.lampPositions = placed;
  }

  _buildPetals() {
    const count = 260;
    const pos = new Float32Array(count * 3);
    const rng = makeRNG(31337);
    this.petalData = [];
    for (let i = 0; i < count; i++) {
      const a = rng() * Math.PI * 2;
      const r = rng.range(4, 70);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = heightAt(x, z) + rng.range(2, 12);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      this.petalData.push({ vy: rng.range(0.35, 0.9), sway: rng.range(0.4, 1.4), phase: rng() * 10, spin: rng.range(-2, 2) });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.petalMat = new THREE.PointsMaterial({
      color: 0xfbc3d4,
      size: 0.3,
      map: makePetalTexture(),
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      alphaTest: 0.02,
    });
    this.petals = new THREE.Points(geo, this.petalMat);
    this.petals.frustumCulled = false;
    this.petals.userData.noOutline = true;
    this.outdoor.add(this.petals);
  }

  _buildGroundProvider() {
    const platforms = [
      { x0: -5.7, x1: 5.7, z0: this.bridgeInfo.z0 - 8, z1: this.bridgeInfo.z1 + 8, y: this.bridgeInfo.y, ramp: 0.01 },
      { x0: -70, x1: -24, z0: 43.2, z1: 48.8, y: 0.66, ramp: 2.6 },
    ];
    const ground = {
      bridge: this.bridgeInfo,
      indoorY: null,
      ceilingY: null,
      at(x, z) {
        if (ground.indoorY !== null) return ground.indoorY;
        let h = heightAt(x, z);
        for (const p of platforms) {
          if (x < p.x0 - p.ramp || x > p.x1 + p.ramp || z < p.z0 - p.ramp || z > p.z1 + p.ramp) continue;
          const fx = smoothstep(p.x0 - p.ramp, p.x0, x) * (1 - smoothstep(p.x1, p.x1 + p.ramp, x));
          const fz = smoothstep(p.z0 - p.ramp, p.z0, z) * (1 - smoothstep(p.z1, p.z1 + p.ramp, z));
          const f = Math.min(fx, fz);
          if (f > 0.001) h = Math.max(h, lerp(h, p.y, f));
        }
        return h;
      },
      atOutdoor(x, z) {
        return heightAt(x, z);
      },
    };
    this.ground = ground;
  }

  /** 夜间点亮的几盏实际点光源（性能考虑只放少量） */
  makeNightLights() {
    const group = new THREE.Group();
    group.name = 'nightLights';
    const spots = [
      [0, 2, 2.4], [0, -20, 2.2], [0, 40, 2.2], [0, -40, 2.2],
      [-20, 14, 2.0], [20, -34, 2.0], [0, 74, 2.0], [0, -70, 2.0],
    ];
    this.nightLights = [];
    for (const [x, z, y] of spots) {
      const l = new THREE.PointLight(0xffd9a0, 0, 22, 1.8);
      l.position.set(x, heightAt(x, z) + y + 1.4, z);
      group.add(l);
      this.nightLights.push(l);
    }
    this.outdoor.add(group);
    this.nightLightGroup = group;
    return group;
  }

  /** 供环境音/玩法查询：到河道中心线的距离 */
  riverDistAt(x, z) {
    return river.closest(x, z).dist;
  }

  setNightFactor(n) {
    this.mats.setNight(n);
    if (this.nightLights) {
      for (const l of this.nightLights) l.intensity = n * 1.35;
    }
  }

  update(dt, ctx) {
    this.veg?.update(dt);
    this.water.update(dt, this.sky);
    // 花瓣
    const pos = this.petals.geometry.attributes.position;
    const t = performance.now() * 0.001;
    for (let i = 0; i < this.petalData.length; i++) {
      const p = this.petalData[i];
      let y = pos.getY(i) - p.vy * dt;
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.8 + p.phase) * p.sway * dt * 0.7);
      pos.setZ(i, pos.getZ(i) + Math.cos(t * 0.6 + p.phase * 1.3) * p.sway * dt * 0.7);
      const g = heightAt(pos.getX(i), pos.getZ(i));
      if (y < g + 0.1) y = g + 8 + Math.random() * 4;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  }

  /** 切换室内 / 户外可见性 */
  setIndoor(indoor) {
    this.outdoor.visible = !indoor;
    this.ground.indoorY = indoor ? INTERIOR_Y : null;
    this.ground.ceilingY = indoor ? INTERIOR_Y + 3.05 : null;
    this.activeColliders = indoor ? this.interiorColliders : this.colliders;
    if (this.sky) this.sky.indoor = indoor ? 1 : 0;
    this.interiorGroup.visible = !!indoor;
    for (const id of Object.keys(this.interiors)) {
      this.interiors[id].group.visible = indoor === id;
    }
  }
}


function makePetalTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 64, 64);
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.ellipse(32, 32, 22, 14, 0.5, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
