/**
 * 角色模型与程序化动画。
 * 玩家、NPC、猫狗都基于这里的人形骨架，通过 parts 引用做摆动。
 */
import * as THREE from 'three';
import { boxGeometry, cylinderGeometry, sphereGeometry, toonMaterial } from '../core/toon.js';
import { makeShellMaterial } from '../core/geobuilder.js';
import { damp, lerp, clamp } from '../core/utils.js';

// ---------------------------------------------------------------------------
// 表情贴图
// ---------------------------------------------------------------------------
const faceCache = new Map();
export function faceTexture(kind = 'normal') {
  if (faceCache.has(kind)) return faceCache.get(kind);
  const S = 256;
  const c = document.createElement('canvas');
  c.width = S;
  c.height = S;
  const g = c.getContext('2d');
  g.clearRect(0, 0, S, S);

  const eyeY = S * 0.46;
  const eyeDX = S * 0.2;
  const drawEye = (cx, closed = false, curve = 0) => {
    g.fillStyle = '#2b2530';
    g.strokeStyle = '#2b2530';
    g.lineWidth = 14;
    g.lineCap = 'round';
    if (closed) {
      g.beginPath();
      g.moveTo(cx - 30, eyeY);
      g.quadraticCurveTo(cx, eyeY + curve, cx + 30, eyeY);
      g.stroke();
    } else {
      g.beginPath();
      g.ellipse(cx, eyeY, 22, 29, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.ellipse(cx + 8, eyeY - 10, 8, 9, 0, 0, Math.PI * 2);
      g.fill();
    }
  };

  // 腮红
  g.fillStyle = 'rgba(240,150,150,0.34)';
  g.beginPath();
  g.ellipse(S * 0.5 - eyeDX - 34, eyeY + 48, 30, 16, 0, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.ellipse(S * 0.5 + eyeDX + 34, eyeY + 48, 30, 16, 0, 0, Math.PI * 2);
  g.fill();

  const mouth = (fn) => {
    g.strokeStyle = '#5a3a3a';
    g.lineWidth = 8;
    g.lineCap = 'round';
    g.beginPath();
    fn();
    g.stroke();
  };

  switch (kind) {
    case 'happy':
      drawEye(S * 0.5 - eyeDX, true, 12);
      drawEye(S * 0.5 + eyeDX, true, 12);
      mouth(() => {
        g.moveTo(S * 0.5 - 26, S * 0.72);
        g.quadraticCurveTo(S * 0.5, S * 0.82, S * 0.5 + 26, S * 0.72);
      });
      break;
    case 'wink':
      drawEye(S * 0.5 - eyeDX, true, 12);
      drawEye(S * 0.5 + eyeDX);
      mouth(() => {
        g.moveTo(S * 0.5 - 22, S * 0.73);
        g.quadraticCurveTo(S * 0.5 + 4, S * 0.8, S * 0.5 + 28, S * 0.7);
      });
      break;
    case 'sleepy':
      drawEye(S * 0.5 - eyeDX, true, -8);
      drawEye(S * 0.5 + eyeDX, true, -8);
      mouth(() => {
        g.moveTo(S * 0.5 - 12, S * 0.74);
        g.quadraticCurveTo(S * 0.5, S * 0.79, S * 0.5 + 12, S * 0.74);
      });
      break;
    case 'surprised':
      drawEye(S * 0.5 - eyeDX);
      drawEye(S * 0.5 + eyeDX);
      g.fillStyle = '#5a3a3a';
      g.beginPath();
      g.ellipse(S * 0.5, S * 0.75, 14, 18, 0, 0, Math.PI * 2);
      g.fill();
      break;
    case 'sad':
      drawEye(S * 0.5 - eyeDX);
      drawEye(S * 0.5 + eyeDX);
      mouth(() => {
        g.moveTo(S * 0.5 - 24, S * 0.78);
        g.quadraticCurveTo(S * 0.5, S * 0.7, S * 0.5 + 24, S * 0.78);
      });
      break;
    case 'cat':
      drawEye(S * 0.5 - eyeDX, false, 0);
      drawEye(S * 0.5 + eyeDX, false, 0);
      break;
    default:
      drawEye(S * 0.5 - eyeDX);
      drawEye(S * 0.5 + eyeDX);
      mouth(() => {
        g.moveTo(S * 0.5 - 18, S * 0.72);
        g.quadraticCurveTo(S * 0.5, S * 0.78, S * 0.5 + 18, S * 0.72);
      });
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  faceCache.set(kind, tex);
  return tex;
}

// ---------------------------------------------------------------------------
// 角色
// ---------------------------------------------------------------------------
let charSerial = 0;

/**
 * @param {object} o
 * @param {number} o.height 身高（默认 1.68）
 * @param {number} o.skin
 * @param {number} o.shirt
 * @param {number} o.pants
 * @param {number} o.hair
 * @param {string} o.hairStyle 'short'|'long'|'bob'|'ponytail'|'cap'|'beanie'|'bald'|'old'
 * @param {number} o.apron 围裙色（可选）
 * @param {number} o.scarf 围巾色（可选）
 * @param {number} o.scaleY
 */
export function buildCharacter(o = {}) {
  const cfg = {
    height: 1.68,
    skin: 0xf5d3b4,
    shirt: 0x5f8fbf,
    pants: 0x4a5568,
    hair: 0x4a3a2e,
    hairStyle: 'short',
    accent: 0xd65545,
    scaleY: 1,
    ...o,
  };
  const H = cfg.height;
  const s = H / 1.68;
  const id = ++charSerial;

  const root = new THREE.Group();
  root.name = `character_${id}`;

  const mat = (color, opts = {}) => toonMaterial({ color, steps: 3, ...opts });

  const skinMat = mat(cfg.skin, { steps: 3 });
  const shirtMat = mat(cfg.shirt, { steps: 3 });
  const pantsMat = mat(cfg.pants, { steps: 3 });
  const hairMat = mat(cfg.hair, { steps: 3 });
  const accentMat = mat(cfg.accent, { steps: 3 });
  const shoeMat = mat(0x3a3a44, { steps: 2 });

  // 髋部根节点（整个上身 + 下身都在其下）
  const body = new THREE.Group();
  body.position.y = 0.68 * s;
  body.scale.setScalar(s);
  root.add(body);

  // 躯干
  const torso = new THREE.Group();
  body.add(torso);
  const chest = new THREE.Mesh(cylinderGeometry(0.19, 0.22, 0.52, 10), shirtMat);
  chest.position.y = 0.26;
  chest.castShadow = true;
  torso.add(chest);
  const hip = new THREE.Mesh(cylinderGeometry(0.2, 0.17, 0.18, 10), pantsMat);
  hip.position.y = 0.02;
  hip.castShadow = true;
  torso.add(hip);
  // 衣摆
  const hem = new THREE.Mesh(cylinderGeometry(0.23, 0.24, 0.12, 10), shirtMat);
  hem.position.y = 0.02;
  torso.add(hem);

  if (cfg.apron) {
    const ap = new THREE.Mesh(boxGeometry(0.34, 0.42, 0.06), mat(cfg.apron, { steps: 2 }));
    ap.position.set(0, 0.22, 0.19);
    ap.castShadow = true;
    torso.add(ap);
  }
  if (cfg.scarf) {
    const sc = new THREE.Mesh(cylinderGeometry(0.13, 0.13, 0.12, 10), mat(cfg.scarf, { steps: 2 }));
    sc.position.y = 0.55;
    torso.add(sc);
  }

  // 头
  const neck = new THREE.Mesh(cylinderGeometry(0.07, 0.08, 0.1, 8), skinMat);
  neck.position.y = 0.58;
  torso.add(neck);
  const head = new THREE.Group();
  head.position.y = 0.62;
  torso.add(head);
  const skull = new THREE.Mesh(sphereGeometry(0.23, 14), skinMat);
  skull.scale.set(1, 1.06, 0.96);
  skull.castShadow = true;
  head.add(skull);

  // 脸
  const faceMat = new THREE.MeshBasicMaterial({ map: faceTexture('normal'), transparent: true, depthWrite: false });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.44), faceMat);
  face.position.set(0, -0.012, 0.2285);
  face.userData.noOutline = true;
  head.add(face);

  // 头发
  const hairGroup = new THREE.Group();
  head.add(hairGroup);
  addHair(hairGroup, cfg, hairMat, accentMat);

  // 手臂
  const armL = new THREE.Group();
  const armR = new THREE.Group();
  armL.position.set(-0.24, 0.46, 0);
  armR.position.set(0.24, 0.46, 0);
  torso.add(armL, armR);
  for (const [grp, side] of [[armL, -1], [armR, 1]]) {
    const upper = new THREE.Mesh(cylinderGeometry(0.062, 0.055, 0.3, 8), shirtMat);
    upper.position.y = -0.15;
    upper.castShadow = true;
    grp.add(upper);
    const fore = new THREE.Mesh(cylinderGeometry(0.052, 0.048, 0.26, 8), skinMat);
    fore.position.y = -0.4;
    fore.castShadow = true;
    grp.add(fore);
    const hand = new THREE.Mesh(sphereGeometry(0.058, 8), skinMat);
    hand.position.y = -0.53;
    grp.add(hand);
    grp.rotation.z = side * 0.1;
  }

  // 腿
  const legL = new THREE.Group();
  const legR = new THREE.Group();
  legL.position.set(-0.1, 0.0, 0);
  legR.position.set(0.1, 0.0, 0);
  body.add(legL, legR);
  for (const grp of [legL, legR]) {
    const thigh = new THREE.Mesh(cylinderGeometry(0.075, 0.065, 0.36, 8), pantsMat);
    thigh.position.y = -0.18;
    thigh.castShadow = true;
    grp.add(thigh);
    const shin = new THREE.Mesh(cylinderGeometry(0.062, 0.055, 0.32, 8), pantsMat);
    shin.position.y = -0.5;
    shin.castShadow = true;
    grp.add(shin);
    const foot = new THREE.Mesh(boxGeometry(0.12, 0.08, 0.2), shoeMat);
    foot.position.set(0, -0.68, 0.03);
    foot.castShadow = true;
    grp.add(foot);
  }

  root.userData.parts = {
    body, torso, head, hairGroup, armL, armR, legL, legR, face, faceMat, skull,
  };
  root.userData.cfg = cfg;
  root.userData.anim = new CharacterAnimator(root, cfg);
  addOutlineTo(root);
  return root;
}

function addHair(group, cfg, hairMat, accentMat) {
  const style = cfg.hairStyle;
  if (style === 'bald') return;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.238, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), hairMat);
  cap.position.y = 0.015;
  cap.scale.set(1, 1.04, 1.0);
  cap.castShadow = true;
  group.add(cap);
  // 刘海
  const bangs = new THREE.Mesh(boxGeometry(0.34, 0.11, 0.1), hairMat);
  bangs.position.set(0, 0.095, 0.185);
  bangs.rotation.x = 0.24;
  group.add(bangs);
  if (style === 'long' || style === 'ponytail') {
    const back = new THREE.Mesh(boxGeometry(0.36, 0.42, 0.14), hairMat);
    back.position.set(0, -0.16, -0.14);
    back.castShadow = true;
    group.add(back);
  }
  if (style === 'bob') {
    const back = new THREE.Mesh(boxGeometry(0.38, 0.24, 0.16), hairMat);
    back.position.set(0, -0.08, -0.13);
    group.add(back);
  }
  if (style === 'ponytail') {
    const tail = new THREE.Mesh(cylinderGeometry(0.07, 0.05, 0.3, 8), hairMat);
    tail.position.set(0, -0.2, -0.22);
    tail.rotation.x = -0.4;
    tail.castShadow = true;
    group.add(tail);
  }
  if (style === 'cap') {
    const capM = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), accentMat);
    capM.position.y = 0.03;
    group.add(capM);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.03, 12, 1, false, -0.9, 1.8), accentMat);
    brim.position.set(0, 0.05, 0.14);
    brim.rotation.y = Math.PI;
    brim.scale.z = 1.6;
    group.add(brim);
  }
  if (style === 'beanie') {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), accentMat);
    b.position.y = 0.04;
    group.add(b);
    const pom = new THREE.Mesh(sphereGeometry(0.07, 8), accentMat);
    pom.position.y = 0.26;
    group.add(pom);
  }
  if (style === 'old') {
    const back = new THREE.Mesh(boxGeometry(0.34, 0.16, 0.14), hairMat);
    back.position.set(0, -0.05, -0.14);
    group.add(back);
  }
}

function addOutlineTo(root) {
  const shell = makeShellMaterial(0.02, 0x2a2130);
  root.traverse((o) => {
    if (o.isMesh && !o.userData.isOutline && !o.userData.noOutline) {
      const s = new THREE.Mesh(o.geometry, shell);
      s.userData.isOutline = true;
      s.renderOrder = -1;
      o.add(s);
    }
  });
}

// ---------------------------------------------------------------------------
// 动画
// ---------------------------------------------------------------------------
export class CharacterAnimator {
  constructor(root, cfg) {
    this.root = root;
    this.parts = root.userData.parts;
    this.cfg = cfg;
    this.phase = 0;
    this.blink = 0;
    this.blinkTimer = 1 + Math.random() * 3;
    this.faceKind = 'normal';
    this.talkPhase = 0;
    this._legBase = 0;
    this._armBase = 0;
  }

  setFace(kind) {
    if (kind === this.faceKind) return;
    this.faceKind = kind;
    this.parts.faceMat.map = faceTexture(kind);
    this.parts.faceMat.needsUpdate = true;
  }

  /**
   * @param {number} dt
   * @param {object} s 状态：{speed, moving, sitting, sleeping, talking, working, carrying, lookAt}
   */
  update(dt, s = {}) {
    const p = this.parts;
    const speed = s.speed || 0;
    const moving = speed > 0.05;
    const stride = moving ? clamp(speed / 1.6, 0.4, 2.6) : 0;
    this.phase += dt * (2.6 + stride * 3.4);

    // 腿部
    if (s.sleeping) {
      // 躺平：腿伸直微微分开
      p.legL.rotation.x = damp(p.legL.rotation.x, 0.05, 9, dt);
      p.legR.rotation.x = damp(p.legR.rotation.x, 0.05, 9, dt);
      p.legL.rotation.z = damp(p.legL.rotation.z, 0.08, 9, dt);
      p.legR.rotation.z = damp(p.legR.rotation.z, -0.08, 9, dt);
    } else if (s.sitting) {
      p.legL.rotation.x = damp(p.legL.rotation.x, -1.45, 10, dt);
      p.legR.rotation.x = damp(p.legR.rotation.x, -1.45, 10, dt);
      p.legL.rotation.z = damp(p.legL.rotation.z, 0.12, 10, dt);
      p.legR.rotation.z = damp(p.legR.rotation.z, -0.12, 10, dt);
    } else if (moving) {
      const sw = Math.sin(this.phase) * (0.5 + stride * 0.16);
      p.legL.rotation.x = sw;
      p.legR.rotation.x = -sw;
      p.legL.rotation.z = damp(p.legL.rotation.z, 0, 10, dt);
      p.legR.rotation.z = damp(p.legR.rotation.z, 0, 10, dt);
    } else {
      p.legL.rotation.x = damp(p.legL.rotation.x, 0, 9, dt);
      p.legR.rotation.x = damp(p.legR.rotation.x, 0, 9, dt);
    }

    // 手臂
    if (s.sleeping) {
      // 手臂贴身
      p.armL.rotation.x = damp(p.armL.rotation.x, 0.12, 8, dt);
      p.armR.rotation.x = damp(p.armR.rotation.x, 0.12, 8, dt);
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.22, 8, dt);
      p.armR.rotation.z = damp(p.armR.rotation.z, -0.22, 8, dt);
    } else if (s.sitting) {
      // 坐在椅子上：手自然搭在膝盖/身侧
      p.armL.rotation.x = damp(p.armL.rotation.x, -0.55, 8, dt);
      p.armR.rotation.x = damp(p.armR.rotation.x, -0.55, 8, dt);
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.16, 8, dt);
      p.armR.rotation.z = damp(p.armR.rotation.z, -0.16, 8, dt);
    } else if (s.talking) {
      this.talkPhase += dt * 7;
      p.armR.rotation.x = damp(p.armR.rotation.x, -0.5 + Math.sin(this.talkPhase) * 0.35, 10, dt);
      p.armR.rotation.z = damp(p.armR.rotation.z, -0.35, 10, dt);
      p.armL.rotation.x = damp(p.armL.rotation.x, 0.15, 8, dt);
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.12, 8, dt);
    } else if (s.working) {
      const w = Math.sin(this.phase * 1.6) * 0.45;
      p.armR.rotation.x = damp(p.armR.rotation.x, -0.9 + w, 10, dt);
      p.armL.rotation.x = damp(p.armL.rotation.x, -0.5 - w * 0.5, 10, dt);
      p.armR.rotation.z = damp(p.armR.rotation.z, -0.2, 8, dt);
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.2, 8, dt);
    } else if (s.carrying) {
      p.armL.rotation.x = damp(p.armL.rotation.x, -1.5, 10, dt);
      p.armR.rotation.x = damp(p.armR.rotation.x, -0.3 + Math.sin(this.phase) * (moving ? 0.3 : 0.05), 10, dt);
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.25, 10, dt);
    } else if (moving) {
      const sw = Math.sin(this.phase) * (0.42 + stride * 0.2);
      p.armL.rotation.x = -sw;
      p.armR.rotation.x = sw;
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.1, 10, dt);
      p.armR.rotation.z = damp(p.armR.rotation.z, -0.1, 10, dt);
    } else {
      const idle = Math.sin(this.phase * 0.5) * 0.05;
      p.armL.rotation.x = damp(p.armL.rotation.x, idle, 8, dt);
      p.armR.rotation.x = damp(p.armR.rotation.x, -idle, 8, dt);
      p.armL.rotation.z = damp(p.armL.rotation.z, 0.1, 8, dt);
      p.armR.rotation.z = damp(p.armR.rotation.z, -0.1, 8, dt);
    }

    // 躯干起伏 / 前倾
    const bob = moving ? Math.abs(Math.sin(this.phase)) * 0.035 * stride : Math.sin(this.phase * 0.5) * 0.008;
    p.body.position.y = 0.68 * (this.cfg.height / 1.68) + bob;
    if (s.sleeping) {
      // 躺下：绕髋部后仰，身体压低
      p.body.rotation.x = damp(p.body.rotation.x, -Math.PI / 2 * 0.94, 8, dt);
      p.body.position.y = damp(p.body.position.y, 0.24 * (this.cfg.height / 1.68), 8, dt);
      p.torso.rotation.x = 0;
      p.torso.rotation.z = 0;
    } else if (s.sitting) {
      p.body.rotation.x = damp(p.body.rotation.x, 0, 8, dt);
      p.torso.rotation.x = damp(p.torso.rotation.x, -0.06, 8, dt);
      p.torso.rotation.z = 0;
    } else {
      p.body.rotation.x = damp(p.body.rotation.x, 0, 8, dt);
      const lean = moving ? clamp(speed * 0.055, 0, 0.16) : 0;
      p.torso.rotation.x = damp(p.torso.rotation.x, lean, 8, dt);
      p.torso.rotation.z = moving ? Math.sin(this.phase) * 0.03 : 0;
    }

    // 头部
    if (s.sleeping) {
      // 睡觉时头微微后仰
      p.head.rotation.y = damp(p.head.rotation.y, 0, 5, dt);
      p.head.rotation.x = damp(p.head.rotation.x, -0.25, 5, dt);
    } else if (s.lookAt !== undefined && s.lookAt !== null) {
      p.head.rotation.y = damp(p.head.rotation.y, s.lookAt, 6, dt);
    } else if (s.talking) {
      p.head.rotation.y = Math.sin(this.talkPhase * 0.4) * 0.14;
    } else {
      p.head.rotation.y = damp(p.head.rotation.y, moving ? 0 : Math.sin(this.phase * 0.22) * 0.22, 4, dt);
    }
    p.head.rotation.x = damp(p.head.rotation.x, moving ? -0.04 : Math.sin(this.phase * 0.31) * 0.05, 4, dt);

    // 眨眼（睡觉时不眨）
    if (!s.sleeping) {
      this.blinkTimer -= dt;
      if (this.blinkTimer <= 0) {
        this.blink = 0.12;
        this.blinkTimer = 2.2 + Math.random() * 4;
      }
      if (this.blink > 0) {
        this.blink -= dt;
        const closed = ['sleepy', 'happy', 'wink'].includes(this.faceKind);
        if (!closed) this.setFace('sleepy');
      } else if (this.faceKind === 'sleepy') {
        this.setFace(this._lastFace || 'normal');
      }
      this._lastFace = this.faceKind === 'sleepy' ? this._lastFace || 'normal' : this.faceKind;
    } else {
      this.setFace('sleepy');
    }
  }
}
