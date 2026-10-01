// 玩家：第三人称角色控制器、碰撞、交互检测、坐下/乘车
import * as THREE from 'three';
import { clamp, damp, dampAngle, lerp, rand } from '../core/Utils.js';
import { getMaterials } from '../core/Materials.js';
import { heightAt, slopeAt } from '../world/Terrain.js';

const M = () => getMaterials();

/** 构建角色模型（简洁动画风） */
function buildCharacter(colors) {
  const g = new THREE.Group();
  const skin = new THREE.MeshToonMaterial({ color: colors.skin });
  skin.gradientMap = M().paper.gradientMap;
  const shirt = new THREE.MeshToonMaterial({ color: colors.shirt });
  shirt.gradientMap = M().paper.gradientMap;
  const pants = new THREE.MeshToonMaterial({ color: colors.pants });
  pants.gradientMap = M().paper.gradientMap;
  const hair = new THREE.MeshToonMaterial({ color: colors.hair });
  hair.gradientMap = M().paper.gradientMap;
  const shoe = new THREE.MeshToonMaterial({ color: '#e8e4d8' });
  shoe.gradientMap = M().paper.gradientMap;

  // 腿
  const legL = new THREE.Group(); const legR = new THREE.Group();
  for (const [leg, s] of [[legL, -1], [legR, 1]]) {
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.72, 0.19), pants);
    thigh.position.y = -0.36;
    leg.add(thigh);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.12, 0.28), shoe);
    foot.position.set(0, -0.75, 0.05);
    leg.add(foot);
    leg.position.set(s * 0.11, 0.8, 0);
    leg.rotation.x = 0;
    g.add(leg);
  }
  // 身体
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.62, 0.26), shirt);
  torso.position.y = 1.12;
  g.add(torso);
  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.4, 0.29), new THREE.MeshToonMaterial({ color: colors.vest }));
  vest.material.gradientMap = M().paper.gradientMap;
  vest.position.y = 1.06;
  g.add(vest);
  // 手臂
  const armL = new THREE.Group(); const armR = new THREE.Group();
  for (const [arm, s] of [[armL, -1], [armR, 1]]) {
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.6, 0.15), shirt);
    upper.position.y = -0.3;
    arm.add(upper);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), skin);
    hand.position.y = -0.64;
    arm.add(hand);
    arm.position.set(s * 0.3, 1.38, 0);
    g.add(arm);
  }
  // 头
  const head = new THREE.Group();
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.185, 12, 10), skin);
  skull.scale.set(1, 1.06, 0.98);
  head.add(skull);
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.192, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), hair);
  hairMesh.position.y = 0.015;
  head.add(hairMesh);
  // 刘海
  const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 0.12), hair);
  bangs.position.set(0, 0.1, 0.15);
  bangs.rotation.x = 0.25;
  head.add(bangs);
  // 眼睛
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.055, 0.02), M().black);
    eye.position.set(s * 0.07, 0.0, 0.175);
    head.add(eye);
  }
  head.position.y = 1.62;
  g.add(head);

  // 书包
  const bag = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.36, 0.14), new THREE.MeshToonMaterial({ color: colors.bag || '#7a4a3a' }));
  bag.material.gradientMap = M().paper.gradientMap;
  bag.position.set(-0.02, 1.15, -0.2);
  g.add(bag);

  g.traverse((c) => { if (c.isMesh) { c.castShadow = true; } });
  return { group: g, legL, legR, armL, armR, head, torso };
}

export class Player {
  constructor(game) {
    this.game = game;
    this.pos = new THREE.Vector3(0, 0, -14);
    this.yaw = 0;
    this.vel = new THREE.Vector3();
    this.radius = 0.42;
    this.state = 'normal';       // normal | sitting | riding
    this.sitInfo = null;
    this.riding = false;
    this.train = null;
    this.walkPhase = 0;
    this.stepDist = 0;
    this.y = 0;
    this.mesh = buildCharacter({ skin: '#f2c9a8', shirt: '#f4f1e8', pants: '#33405e', hair: '#3a2c26', vest: '#2b3a67', bag: '#7a4a3a' });
    game.scene.add(this.mesh.group);
    // 雨伞
    this.umbrella = new THREE.Group();
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.34, 10), new THREE.MeshToonMaterial({ color: '#d97a95', side: THREE.DoubleSide }));
    canopy.material.gradientMap = M().paper.gradientMap;
    canopy.position.y = 1.95;
    this.umbrella.add(canopy);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 5), M().woodDark);
    stick.position.y = 1.45;
    this.umbrella.add(stick);
    this.umbrella.visible = false;
    this.mesh.group.add(this.umbrella);
  }

  get indoor() { return this.game.world.isIndoor(this.pos); }

  update(dt, input) {
    const game = this.game;

    if (this.state === 'riding') {
      this.updateRiding(dt, input);
      return;
    }

    // ---- 相机 ----
    const cam = game.camera;
    const m = input.mouse;
    if (input.mouse.down) {
      game.camYaw -= m.dx * 0.0052;
      game.camPitch = clamp(game.camPitch + m.dy * 0.0038, 0.06, 1.15);
    }
    game.camDist = clamp(game.camDist + m.wheel * 0.6, 3.2, 13);

    if (this.state === 'sitting') {
      // 坐姿：轻微呼吸
      this.mesh.torso.position.y = 1.12 + Math.sin(performance.now() * 0.001) * 0.006;
      if (input.justPressed('KeyE') || input.justPressed('Space')) {
        this.stand();
      }
      this.updateCamera(dt);
      return;
    }

    // ---- 移动 ----
    const speed = input.down('ShiftLeft') || input.down('ShiftRight') ? 6.0 : 3.3;
    let ix = 0, iz = 0;
    if (input.down('KeyW') || input.down('ArrowUp')) iz += 1;
    if (input.down('KeyS') || input.down('ArrowDown')) iz -= 1;
    if (input.down('KeyA') || input.down('ArrowLeft')) ix -= 1;
    if (input.down('KeyD') || input.down('ArrowRight')) ix += 1;

    const moving = (ix !== 0 || iz !== 0);
    if (moving) {
      const len = Math.hypot(ix, iz);
      ix /= len; iz /= len;
      // 相机相对方向
      const fx = -Math.sin(game.camYaw), fz = -Math.cos(game.camYaw);
      const rx = Math.cos(game.camYaw), rz = -Math.sin(game.camYaw);
      const mx = fx * iz + rx * ix;
      const mz = fz * iz + rz * ix;
      const targetYaw = Math.atan2(mx, mz);
      this.yaw = dampAngle(this.yaw, targetYaw, 12, dt);

      // 坡度限制：太陡不给走
      const tryMove = (dx, dz) => {
        const nx = this.pos.x + dx, nz = this.pos.z + dz;
        if (slopeAt(nx, nz) > 0.75) return false;
        this.pos.x = nx; this.pos.z = nz;
        return true;
      };
      const step = speed * dt;
      if (!tryMove(mx * step, mz * step)) {
        if (!tryMove(mx * step, 0)) tryMove(0, mz * step);
      }
      // 脚步声
      this.stepDist += step;
      const stride = speed > 4 ? 0.62 : 0.48;
      if (this.stepDist > stride) {
        this.stepDist = 0;
        game.audio.footstep(speed > 4);
      }
      this.walkPhase += dt * (speed > 4 ? 13 : 9);
    } else {
      this.walkPhase = damp(this.walkPhase, 0, 8, dt);
      this.stepDist = 0.5;
    }

    // ---- 碰撞 ----
    this.resolveCollision();

    // ---- 地面高度 ----
    let targetY = heightAt(this.pos.x, this.pos.z);
    for (const w of game.walkables) {
      if (this.pos.x > w.minX && this.pos.x < w.maxX && this.pos.z > w.minZ && this.pos.z < w.maxZ) {
        if (w.y <= this.y + 0.85 && w.y > targetY - 0.02) targetY = w.y;
      }
    }
    this.y = damp(this.y, targetY, 12, dt);
    this.pos.y = this.y;

    // ---- 模型 ----
    const g = this.mesh.group;
    g.position.copy(this.pos);
    g.rotation.y = this.yaw;
    const swing = Math.sin(this.walkPhase) * (moving ? 0.55 : 0.03);
    this.mesh.legL.rotation.x = swing;
    this.mesh.legR.rotation.x = -swing;
    this.mesh.armL.rotation.x = -swing * 0.8;
    this.mesh.armR.rotation.x = swing * 0.8;
    this.mesh.torso.position.y = 1.12 + (moving ? Math.abs(Math.sin(this.walkPhase)) * 0.02 : 0);
    // 雨伞
    this.umbrella.visible = game.weather.raining && !this.indoor;
    this.mesh.head.rotation.x = 0;

    this.updateCamera(dt);
  }

  updateRiding(dt, input) {
    const game = this.game;
    const train = this.train;
    this.pos.x = train.x;
    this.pos.z = -35.4;
    this.pos.y = 0.5;
    this.mesh.group.visible = false;
    // 相机跟随列车
    game.camYaw = dampAngle(game.camYaw, Math.PI / 2, 3, dt);
    game.camPitch = damp(game.camPitch, 0.32, 3, dt);
    game.camDist = damp(game.camDist, 9.5, 3, dt);
    const cam = game.camera;
    const px = this.pos.x, py = 1.2, pz = this.pos.z;
    cam.position.set(
      px + Math.sin(game.camYaw) * game.camDist,
      py + Math.sin(game.camPitch) * game.camDist,
      pz + Math.cos(game.camYaw) * game.camDist
    );
    cam.lookAt(px, py + 1.0, pz);
    game.ui.setPrompt(null);
    if (input.justPressed('KeyE') && train.state === 'dock' && train.doorOpen > 0.6) {
      this.alightTrain(-6);
    }
  }

  updateCamera(dt) {
    const game = this.game;
    const cam = game.camera;
    const tx = this.pos.x, ty = this.pos.y + 1.35, tz = this.pos.z;
    let dist = game.camDist;
    // 相机防穿墙：从玩家沿相机方向投射，遇到碰撞体就拉近
    const dirX = Math.sin(game.camYaw), dirZ = Math.cos(game.camYaw);
    let hitT = Infinity;
    for (const b of game.colliders) {
      if (b.disabled) continue;
      let t0 = 0, t1 = Infinity, ok = true;
      for (const [p, d, lo, hi] of [[tx, dirX, b.minX, b.maxX], [tz, dirZ, b.minZ, b.maxZ]]) {
        if (Math.abs(d) < 1e-6) {
          if (p < lo || p > hi) { ok = false; break; }
        } else {
          let ta = (lo - p) / d, tb = (hi - p) / d;
          if (ta > tb) [ta, tb] = [tb, ta];
          t0 = Math.max(t0, ta); t1 = Math.min(t1, tb);
          if (t0 > t1) { ok = false; break; }
        }
      }
      if (!ok) continue;
      if (t1 <= 0) continue;                 // 完全在身后
      const entry = Math.max(t0, 0);
      if (entry > 0.02 && entry < hitT) hitT = entry;
      else if (entry <= 0.02) hitT = 0.02;   // 起点就在盒内
    }
    if (hitT !== Infinity) dist = Math.max(1.6, Math.min(dist, hitT - 0.5));
    const cx = tx + dirX * dist;
    const cz = tz + dirZ * dist;
    const cy = ty + Math.sin(game.camPitch) * dist;
    // 平滑跟随
    cam.position.x = damp(cam.position.x, cx, 14, dt);
    cam.position.y = damp(cam.position.y, cy, 10, dt);
    cam.position.z = damp(cam.position.z, cz, 14, dt);
    cam.lookAt(tx, ty, tz);
  }

  resolveCollision() {
    const game = this.game;
    const r = this.radius;
    let px = this.pos.x, pz = this.pos.z;
    for (const b of game.colliders) {
      if (b.disabled) continue;
      const nx = clamp(px, b.minX, b.maxX);
      const nz = clamp(pz, b.minZ, b.maxZ);
      let dx = px - nx, dz = pz - nz;
      let d2 = dx * dx + dz * dz;
      if (d2 >= r * r) continue;
      if (d2 > 1e-8) {
        const d = Math.sqrt(d2);
        const push = r - d;
        px += (dx / d) * push;
        pz += (dz / d) * push;
      } else {
        // 圆心在盒内：沿最小穿透轴推出
        const ox = Math.min(px - b.minX, b.maxX - px);
        const oz = Math.min(pz - b.minZ, b.maxZ - pz);
        if (ox < oz) px += (px - (b.minX + b.maxX) / 2 > 0 ? 1 : -1) * (ox + r);
        else pz += (pz - (b.minZ + b.maxZ) / 2 > 0 ? 1 : -1) * (oz + r);
      }
    }
    this.pos.x = px; this.pos.z = pz;
  }

  sit(pos, yaw) {
    if (this.state !== 'normal') return;
    this.state = 'sitting';
    this.sitInfo = { pos: pos.clone(), yaw };
    this.pos.x = pos.x; this.pos.z = pos.z; this.yaw = yaw;
    // 坐姿
    this.mesh.legL.rotation.x = -1.45;
    this.mesh.legR.rotation.x = -1.45;
    this.mesh.group.position.y = this.pos.y - 0.34;
    this.mesh.armL.rotation.x = -0.25;
    this.mesh.armR.rotation.x = -0.25;
    this.game.ui.setPrompt('站起来');
    this.game.ui.toast('按 E 站起来');
  }

  stand() {
    if (this.state !== 'sitting') return;
    this.state = 'normal';
    this.sitInfo = null;
    this.mesh.legL.rotation.x = 0;
    this.mesh.legR.rotation.x = 0;
    this.mesh.armL.rotation.x = 0;
    this.mesh.armR.rotation.x = 0;
    this.mesh.group.position.y = this.pos.y;
    this.game.ui.setPrompt(null);
  }

  boardTrain(train, doorX) {
    this.state = 'riding';
    this.riding = true;
    this.train = train;
    this.pos.x = train.x;
    this.pos.z = -35.4;
    this.game.ui.toast('上车了。列车即将出发…');
  }

  alightTrain(doorX) {
    this.state = 'normal';
    this.riding = false;
    this.mesh.group.visible = true;
    this.pos.x = this.train.x;
    this.pos.z = -35.4;
    this.pos.y = 0.5;
    this.y = 0.5;
    this.train = null;
    this.game.ui.setPrompt(null);
    this.game.ui.toast('下车了');
  }
}
