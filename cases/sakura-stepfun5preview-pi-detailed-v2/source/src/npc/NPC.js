// NPC：模型构建 + 作息移动
import * as THREE from 'three';
import { clamp, damp, dampAngle, rand, TAU } from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import { heightAt } from '../world/Terrain.js';

const M = () => getMaterials();

function toonMat(color) {
  const m = new THREE.MeshToonMaterial({ color });
  m.gradientMap = M().paper.gradientMap;
  return m;
}

/** NPC 模型 */
export function buildNpcModel(def) {
  const g = new THREE.Group();
  const c = def.colors;
  const skin = toonMat(c.skin || '#f2c9a8');
  const shirt = toonMat(c.shirt || '#f4f1e8');
  const pants = toonMat(c.pants || '#33405e');
  const hair = toonMat(c.hair || '#3a2c26');

  const legL = new THREE.Group(), legR = new THREE.Group();
  const legH = c.skirt ? 0.5 : 0.72;
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.16, legH, 0.18), pants);
    thigh.position.y = -legH / 2;
    leg.add(thigh);
    if (c.skirt) {
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.24, 0.24), pants);
      skirt.position.y = 0.02;
      leg.add(skirt);
    }
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.11, 0.26), toonMat(c.shoe || '#e8e4d8'));
    foot.position.set(0, -legH - 0.05, 0.04);
    leg.add(foot);
    leg.position.set(s * 0.1, 0.82, 0);
    g.add(leg);
  }
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.6, 0.25), shirt);
  torso.position.y = 1.12;
  g.add(torso);
  if (c.vest) {
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.42, 0.28), toonMat(c.vest));
    vest.position.y = 1.05;
    g.add(vest);
  }
  if (c.apron) {
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.55, 0.02), toonMat(c.apron));
    apron.position.set(0, 0.95, 0.15);
    g.add(apron);
  }
  const armL = new THREE.Group(), armR = new THREE.Group();
  for (const [arm, s] of [[armL, -1], [armR, 1]]) {
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.58, 0.14), shirt);
    upper.position.y = -0.29;
    arm.add(upper);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.11), skin);
    hand.position.y = -0.62;
    arm.add(hand);
    arm.position.set(s * 0.29, 1.36, 0);
    g.add(arm);
  }
  const head = new THREE.Group();
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.175, 12, 10), skin);
  skull.scale.set(1, 1.05, 0.98);
  head.add(skull);
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.183, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.6), hair);
  hairMesh.position.y = 0.015;
  head.add(hairMesh);
  if (c.bun) {
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), hair);
    bun.position.set(0, 0.14, -0.14);
    head.add(bun);
  }
  if (c.hat) {
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.14, 10), toonMat(c.hat));
    hat.position.y = 0.15;
    head.add(hat);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.03, 12), toonMat(c.hat));
    brim.position.y = 0.1;
    head.add(brim);
  }
  if (c.cap) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.185, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), toonMat(c.cap));
    cap.position.y = 0.02;
    head.add(cap);
    const peak = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.14), toonMat(c.cap));
    peak.position.set(0, 0.02, 0.17);
    head.add(peak);
  }
  if (c.glasses) {
    for (const s of [-1, 1]) {
      const lens = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.06, 0.02), M().black);
      lens.position.set(s * 0.065, 0.0, 0.172);
      head.add(lens);
    }
  }
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.05, 0.02), M().black);
    eye.position.set(s * 0.065, 0.0, 0.168);
    head.add(eye);
  }
  head.position.y = 1.6;
  g.add(head);
  if (c.backpack) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.16), toonMat(c.backpack));
    bag.position.set(0, 1.18, -0.19);
    g.add(bag);
  }
  g.traverse((m) => { if (m.isMesh) m.castShadow = true; });

  // 雨伞
  const umbrella = new THREE.Group();
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.32, 10), toonMat(c.umbrella || '#5d8fe8'));
  canopy.material.side = THREE.DoubleSide;
  canopy.position.y = 1.9;
  umbrella.add(canopy);
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.95, 5), M().woodDark);
  stick.position.y = 1.42;
  umbrella.add(stick);
  umbrella.visible = false;
  g.add(umbrella);

  return { group: g, legL, legR, armL, armR, head, umbrella };
}

export class Npc {
  constructor(def, game) {
    this.def = def;
    this.id = def.id;
    this.name = def.name;
    this.game = game;
    this.model = buildNpcModel(def);
    game.scene.add(this.model.group);
    this.pos = new THREE.Vector3(def.start[0], 0, def.start[1]);
    this.yaw = def.startYaw || 0;
    this.targetIdx = 0;
    this.walkPhase = rand(TAU);
    this.waitTimer = 0;
    this.umbrellaOn = false;
    this.pos.y = heightAt(this.pos.x, this.pos.z);
    this.visible = true;
  }

  get route() { return this.def.route; }

  /** 当前时段的目标点（考虑时辰表） */
  currentTarget(hour) {
    const r = this.route;
    for (let i = 0; i < r.length; i++) {
      if (hour < r[i].t) return { wp: r[i], idx: i };
    }
    return { wp: r[r.length - 1], idx: r.length - 1 };
  }

  update(dt, hour, raining) {
    const g = this.game;
    const { wp } = this.override ? { wp: this.override } : this.currentTarget(hour);
    // 隐藏（在家/打烊）
    const shouldHide = !!wp.hide;
    if (shouldHide !== !this.visible) {
      this.visible = !shouldHide;
      this.model.group.visible = this.visible;
    }
    // 雨天：撑伞（部分 NPCC 不改动路线，只是撑伞）
    this.umbrellaOn = raining && this.def.umbrella && !shouldHide;
    this.model.umbrella.visible = this.umbrellaOn;

    if (shouldHide) return;

    // 道口等待
    let blocked = false;
    if (wp.waitCrossing && g.railway && g.railway.crossing.closed) blocked = true;

    const dx = wp.x - this.pos.x, dz = wp.z - this.pos.z;
    const dist = Math.hypot(dx, dz);
    const speed = this.def.speed || 1.1;
    let moving = false;
    if (!blocked && dist > 0.25) {
      const step = Math.min(speed * dt, dist);
      this.pos.x += (dx / dist) * step;
      this.pos.z += (dz / dist) * step;
      this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 8, dt);
      this.walkPhase += dt * 7.5;
      moving = true;
    } else {
      this.walkPhase = damp(this.walkPhase, 0, 4, dt);
      // 到点后缓慢环顾
      if (!this._lookT) this._lookT = rand(TAU);
      this._lookT += dt * 0.3;
      this.model.head.rotation.y = Math.sin(this._lookT) * 0.4;
    }

    this.pos.y = heightAt(this.pos.x, this.pos.z);
    const m = this.model;
    m.group.position.copy(this.pos);
    m.group.rotation.y = this.yaw;
    const swing = moving ? Math.sin(this.walkPhase) * 0.5 : 0.02;
    m.legL.rotation.x = swing;
    m.legR.rotation.x = -swing;
    m.armL.rotation.x = -swing * 0.75;
    m.armR.rotation.x = swing * 0.75;
    if (!moving) m.head.rotation.y = damp(m.head.rotation.y, 0, 2, dt);
    else m.head.rotation.y = 0;
  }
}
