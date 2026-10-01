// ================================================================
//  角色模型：统一的日式动画风格低模人形 + 程序化动画
// ================================================================
import * as THREE from 'three';
import { toon, addOutline, basic } from '../render/toon.js';
import { PAL, mixHex } from '../render/palette.js';
import { lerp, clamp, damp, dampAngle, makeRNG, TAU } from '../util/math.js';

const matCache = new Map();
function cmat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) matCache.set(key, toon(color, opts));
  return matCache.get(key);
}

function skinMat(color) {
  if (!matCache.has('skin' + color)) matCache.set('skin' + color, toon(color));
  return matCache.get('skin' + color);
}

/* ------------------------------------------------------------------ *
 *  预设
 * ------------------------------------------------------------------ */
export const CHAR_PRESETS = {
  player: {
    h: 1.70, skin: 0xf6d5bd, hair: 0x4a3728, hairStyle: 'short',
    top: 0x6f9ec4, topAlt: 0xf2f0e6, bottom: 0x4c5468, bottomStyle: 'pants',
    shoes: 0x3d3a42, accessory: 'none', scarf: null,
  },
};

/* ------------------------------------------------------------------ *
 *  建造
 * ------------------------------------------------------------------ */
export function createCharacter(opts = {}) {
  const o = { ...CHAR_PRESETS.player, ...opts };
  const h = o.h;
  const P = {
    headR: h * 0.107,
    neckY: h * 0.815,
    shoulderY: h * 0.775,
    chestY: h * 0.66,
    waistY: h * 0.575,
    hipY: h * 0.49,
    kneeY: h * 0.275,
    ankleY: h * 0.075,
  };
  const S = h / 1.7;   // 缩放基准

  const root = new THREE.Group();
  root.name = 'char';

  const skin = skinMat(o.skin);
  const hairM = cmat(o.hair);
  const topM = cmat(o.top);
  const topAltM = cmat(o.topAlt ?? mixHex(o.top, 0xffffff, 0.7));
  const botM = cmat(o.bottom);
  const shoeM = cmat(o.shoes);
  const eyeM = cmat(0x33262c);
  const blushM = cmat(0xf2a3a8, { transparent: true, opacity: 0.55, depthWrite: false });
  const mouthM = cmat(0xa85a58);

  /* --- 髋部（根） --- */
  const hips = new THREE.Group();
  hips.position.y = P.hipY;
  root.add(hips);

  /* --- 躯干 --- */
  const torso = new THREE.Group();
  hips.add(torso);
  {
    const chest = new THREE.Mesh(
      new THREE.CylinderGeometry(h * 0.098, h * 0.076, P.shoulderY - P.hipY + h * 0.05, 12),
      topM
    );
    chest.position.y = (P.shoulderY - P.hipY) / 2 + h * 0.02;
    chest.scale.z = 0.78;
    torso.add(chest);
    addOutline(chest, 0.013);

    // 衣领 / 前襟
    const collar = new THREE.Mesh(new THREE.BoxGeometry(h * 0.115, h * 0.02, h * 0.075), topAltM);
    collar.position.set(0, P.shoulderY - P.hipY + h * 0.005, 0);
    torso.add(collar);
    const placket = new THREE.Mesh(new THREE.BoxGeometry(h * 0.022, P.shoulderY - P.hipY, h * 0.012), topAltM);
    placket.position.set(0, (P.shoulderY - P.hipY) / 2 + h * 0.02, h * 0.062);
    torso.add(placket);

    // 领结/领巾
    if (o.accessory === 'bow') {
      const bow = new THREE.Group();
      for (const s of [-1, 1]) {
        const t = new THREE.Mesh(new THREE.ConeGeometry(h * 0.026, h * 0.045, 4), cmat(0xd4566e));
        t.position.set(s * h * 0.024, 0, 0);
        t.rotation.z = s * Math.PI / 2;
        bow.add(t);
      }
      const k = new THREE.Mesh(new THREE.SphereGeometry(h * 0.012, 8, 6), cmat(0xd4566e));
      bow.add(k);
      bow.position.set(0, P.shoulderY - P.hipY - h * 0.015, h * 0.068);
      torso.add(bow);
    }
    if (o.accessory === 'apron') {
      const ap = new THREE.Mesh(new THREE.BoxGeometry(h * 0.13, h * 0.2, h * 0.012), cmat(0xf5f0e2));
      ap.position.set(0, P.waistY - P.hipY + h * 0.02, h * 0.066);
      torso.add(ap);
    }
    if (o.accessory === 'vest') {
      const v = new THREE.Mesh(new THREE.BoxGeometry(h * 0.15, h * 0.2, h * 0.075), cmat(0x4c5a6b));
      v.position.set(0, P.chestY - P.hipY, 0);
      v.scale.z = 1.02;
      torso.add(v);
    }
  }

  /* --- 头 --- */
  const neck = new THREE.Group();
  neck.position.y = P.neckY - P.hipY;
  torso.add(neck);
  const head = new THREE.Group();
  head.position.y = P.headR * 0.95;
  neck.add(head);
  {
    const skull = new THREE.Mesh(new THREE.SphereGeometry(P.headR, 14, 12), skin);
    skull.scale.set(1, 1.06, 0.96);
    addOutline(skull, 0.014);
    head.add(skull);
    // 下巴
    const chin = new THREE.Mesh(new THREE.SphereGeometry(P.headR * 0.7, 10, 8), skin);
    chin.position.set(0, -P.headR * 0.52, P.headR * 0.16);
    chin.scale.set(0.9, 0.7, 0.9);
    head.add(chin);
    // 耳朵
    for (const s of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(P.headR * 0.2, 6, 5), skin);
      ear.position.set(s * P.headR * 0.96, -P.headR * 0.05, 0);
      ear.scale.set(0.5, 1, 0.7);
      head.add(ear);
    }
    // 眼睛
    const eyeY = P.headR * 0.06, eyeZ = P.headR * 0.84;
    for (const s of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(P.headR * 0.155, 8, 8), eyeM);
      eye.position.set(s * P.headR * 0.36, eyeY, eyeZ);
      eye.scale.set(0.82, 1.16, 0.5);
      head.add(eye);
      const hi = new THREE.Mesh(new THREE.SphereGeometry(P.headR * 0.05, 6, 5), basic(0xffffff));
      hi.position.set(s * P.headR * 0.4, eyeY + P.headR * 0.07, eyeZ + P.headR * 0.06);
      head.add(hi);
      const brow = new THREE.Mesh(new THREE.BoxGeometry(P.headR * 0.26, P.headR * 0.055, P.headR * 0.05), hairM);
      brow.position.set(s * P.headR * 0.37, eyeY + P.headR * 0.3, eyeZ - P.headR * 0.02);
      brow.rotation.z = s * 0.12;
      head.add(brow);
      if (o.blush !== false) {
        const bl = new THREE.Mesh(new THREE.PlaneGeometry(P.headR * 0.3, P.headR * 0.16), blushM);
        bl.position.set(s * P.headR * 0.56, eyeY - P.headR * 0.2, eyeZ - P.headR * 0.1);
        bl.rotation.y = s * 0.5;
        head.add(bl);
      }
    }
    // 鼻 / 嘴
    const nose = new THREE.Mesh(new THREE.SphereGeometry(P.headR * 0.075, 6, 5), skin);
    nose.position.set(0, eyeY - P.headR * 0.22, eyeZ + P.headR * 0.05);
    head.add(nose);
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(P.headR * 0.18, P.headR * 0.05, P.headR * 0.04), mouthM);
    mouth.position.set(0, eyeY - P.headR * 0.45, eyeZ - P.headR * 0.02);
    head.add(mouth);
    if (o.glasses) {
      for (const s of [-1, 1]) {
        const gl = new THREE.Mesh(new THREE.TorusGeometry(P.headR * 0.2, P.headR * 0.028, 5, 12), cmat(0x4a4a52));
        gl.position.set(s * P.headR * 0.36, eyeY, eyeZ + P.headR * 0.02);
        head.add(gl);
      }
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(P.headR * 0.2, P.headR * 0.025, P.headR * 0.02), cmat(0x4a4a52));
      bridge.position.set(0, eyeY, eyeZ + P.headR * 0.02);
      head.add(bridge);
    }
    /* --- 头发 --- */
    buildHair(head, o, P, hairM, h);
  }

  /* --- 手臂 --- */
  const arms = {};
  for (const side of ['L', 'R']) {
    const s = side === 'L' ? 1 : -1;
    const sh = new THREE.Group();
    sh.position.set(s * h * 0.098, P.shoulderY - P.hipY, 0);
    torso.add(sh);
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.028, h * 0.024, h * 0.155, 8), topM);
    upper.position.y = -h * 0.078;
    addOutline(upper, 0.013);
    sh.add(upper);
    const el = new THREE.Group();
    el.position.y = -h * 0.155;
    sh.add(el);
    const fore = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.024, h * 0.02, h * 0.145, 8), o.sleeveShort ? skin : topM);
    fore.position.y = -h * 0.072;
    addOutline(fore, 0.013);
    el.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(h * 0.026, 8, 6), skin);
    hand.position.y = -h * 0.152;
    el.add(hand);
    arms[side] = { sh, el, hand };
  }

  /* --- 腿 --- */
  const legs = {};
  for (const side of ['L', 'R']) {
    const s = side === 'L' ? 1 : -1;
    const hip = new THREE.Group();
    hip.position.set(s * h * 0.045, 0, 0);
    hips.add(hip);
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.042, h * 0.036, P.hipY - P.kneeY + h * 0.02, 8), botM);
    thigh.position.y = -(P.hipY - P.kneeY) / 2;
    addOutline(thigh, 0.013);
    hip.add(thigh);
    const kn = new THREE.Group();
    kn.position.y = -(P.hipY - P.kneeY);
    hip.add(kn);
    const shin = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.034, h * 0.026, P.kneeY - P.ankleY, 8), o.bottomStyle === 'skirt' ? skin : botM);
    shin.position.y = -(P.kneeY - P.ankleY) / 2;
    addOutline(shin, 0.013);
    kn.add(shin);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(h * 0.055, h * 0.032, h * 0.105), shoeM);
    foot.position.set(0, -P.kneeY + P.ankleY - h * 0.012, h * 0.022);
    addOutline(foot, 0.013);
    kn.add(foot);
    legs[side] = { hip, kn, foot };
  }
  // 裙子
  if (o.bottomStyle === 'skirt') {
    const skMat = typeof o.skirt === 'number' ? cmat(o.skirt) : (o.skirt || cmat(0x4a4a58));
    const sk = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.075, h * 0.125, h * 0.16, 14, 1, true), skMat);
    sk.position.y = -h * 0.04;
    skMat.side = THREE.DoubleSide;
    addOutline(sk, 0.012);
    hips.add(sk);
  }

  /* --- 随身物 --- */
  if (o.bag) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(h * 0.11, h * 0.13, h * 0.05), cmat(o.bag));
    bag.position.set(0, P.waistY - P.hipY - h * 0.02, -h * 0.085);
    torso.add(bag);
    const strap = new THREE.Mesh(new THREE.BoxGeometry(h * 0.022, h * 0.24, h * 0.012), cmat(0x5a4a40));
    strap.position.set(h * 0.05, P.chestY - P.hipY + h * 0.02, 0);
    strap.rotation.z = -0.3;
    torso.add(strap);
  }
  if (o.hat) {
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(P.headR * 1.15, P.headR * 1.2, P.headR * 0.3, 12), cmat(o.hat));
    hat.position.set(0, P.headR * 1.02, 0);
    addOutline(hat, 0.013);
    head.add(hat);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(P.headR * 1.7, P.headR * 1.7, P.headR * 0.06, 14), cmat(o.hat));
    brim.position.set(0, P.headR * 0.9, -P.headR * 0.12);
    head.add(brim);
  }

  /* --- 雨伞 --- */
  const umb = new THREE.Group();
  {
    const canopyM = cmat(o.umbrellaColor ?? 0x4a6fa8);
    const shaftM = cmat(0x6a5a4a);
    const seg = 8, R = h * 0.3, top = h * 0.24;
    for (let i = 0; i < seg; i++) {
      const a0 = (i / seg) * TAU, a1 = ((i + 1) / seg) * TAU;
      const c = new THREE.Mesh(new THREE.ConeGeometry(R, top, seg, 1, true), canopyM);
      c.geometry = new THREE.ConeGeometry(R, top, seg, 1, true);
      c.position.y = top / 2;
      const p0 = new THREE.Vector3(Math.cos(a0) * R, 0, Math.sin(a0) * R);
      const p1 = new THREE.Vector3(Math.cos(a1) * R, 0, Math.sin(a1) * R);
      const apex = new THREE.Vector3(0, top, 0);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute([...p0.toArray(), ...p1.toArray(), ...apex.toArray()], 3));
      geo.computeVertexNormals();
      const tri = new THREE.Mesh(geo, canopyM);
      tri.material.side = THREE.DoubleSide;
      umb.add(tri);
      c.visible = false;
    }
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.008, h * 0.008, h * 0.42, 6), shaftM);
    shaft.position.y = -h * 0.12;
    umb.add(shaft);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(h * 0.03, h * 0.008, 5, 8), shaftM);
    handle.position.y = -h * 0.33;
    handle.rotation.y = Math.PI / 2;
    umb.add(handle);
    umb.traverse((n) => { if (n.isMesh) n.castShadow = true; });
  }
  umb.position.set(0, P.shoulderY - P.hipY + h * 0.33, 0);
  umb.visible = false;
  torso.add(umb);

  root.traverse((n) => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = false; } });
  umb.visible = false;

  /* --- 动画状态 --- */
  const st = {
    t: Math.random() * 10, phase: Math.random() * TAU, mode: 'idle',
    blink: 0, nextBlink: 1 + Math.random() * 3, look: 0, sitBlend: 0,
    wave: 0, talk: 0,
  };

  function setMode(m) { st.mode = m; }

  function update(dt, speed = 0) {
    st.t += dt;
    const walking = speed > 0.08;
    const run = speed > 3.0;
    const stride = run ? 7.2 : 5.6;
    st.phase += dt * stride * clamp(speed / 2.6, 0.35, 1.9);
    const sw = Math.sin(st.phase);
    const sw2 = Math.cos(st.phase);

    if (walking) {
      const amp = run ? 0.72 : 0.5;
      legs.L.hip.rotation.x = sw * amp;
      legs.R.hip.rotation.x = -sw * amp;
      legs.L.kn.rotation.x = -Math.max(0, -sw) * amp * 1.1 - 0.06;
      legs.R.kn.rotation.x = -Math.max(0, sw) * amp * 1.1 - 0.06;
      arms.L.sh.rotation.x = -sw * amp * 0.82;
      arms.R.sh.rotation.x = sw * amp * 0.82;
      arms.L.sh.rotation.z = 0.1;
      arms.R.sh.rotation.z = -0.1;
      arms.L.el.rotation.x = -0.28 - Math.max(0, sw) * 0.3;
      arms.R.el.rotation.x = -0.28 - Math.max(0, -sw) * 0.3;
      hips.position.y = P.hipY + Math.abs(sw2) * h * 0.014;
      hips.rotation.y = sw * 0.07;
      torso.rotation.x = run ? 0.16 : 0.07;
      head.rotation.x = run ? -0.1 : -0.03;
    } else {
      // 站立呼吸
      const br = Math.sin(st.t * 1.5) * 0.5 + 0.5;
      const k = 1 - st.sitBlend;
      legs.L.hip.rotation.x = damp(legs.L.hip.rotation.x, 0.02, 8, dt);
      legs.R.hip.rotation.x = damp(legs.R.hip.rotation.x, -0.02, 8, dt);
      legs.L.kn.rotation.x = damp(legs.L.kn.rotation.x, -0.04, 8, dt);
      legs.R.kn.rotation.x = damp(legs.R.kn.rotation.x, -0.04, 8, dt);
      arms.L.sh.rotation.x = damp(arms.L.sh.rotation.x, 0.03 + br * 0.02, 8, dt);
      arms.R.sh.rotation.x = damp(arms.R.sh.rotation.x, 0.03 + br * 0.02, 8, dt);
      arms.L.sh.rotation.z = damp(arms.L.sh.rotation.z, 0.13, 8, dt);
      arms.R.sh.rotation.z = damp(arms.R.sh.rotation.z, -0.13, 8, dt);
      arms.L.el.rotation.x = damp(arms.L.el.rotation.x, -0.16, 8, dt);
      arms.R.el.rotation.x = damp(arms.R.el.rotation.x, -0.16, 8, dt);
      hips.position.y = damp(hips.position.y, P.hipY + br * h * 0.005, 6, dt);
      hips.rotation.y = damp(hips.rotation.y, 0, 6, dt);
      torso.rotation.x = damp(torso.rotation.x, 0.015, 6, dt);
      head.rotation.x = damp(head.rotation.x, 0, 6, dt);
    }

    // 坐下
    st.sitBlend = damp(st.sitBlend, st.mode === 'sit' ? 1 : 0, 7, dt);
    if (st.sitBlend > 0.01) {
      const s = st.sitBlend;
      hips.position.y = lerp(hips.position.y, P.hipY - P.kneeY + h * 0.02, s * 0.6);
      legs.L.hip.rotation.x = lerp(legs.L.hip.rotation.x, -1.45, s);
      legs.R.hip.rotation.x = lerp(legs.R.hip.rotation.x, -1.45, s);
      legs.L.kn.rotation.x = lerp(legs.L.kn.rotation.x, 1.5, s);
      legs.R.kn.rotation.x = lerp(legs.R.kn.rotation.x, 1.5, s);
      torso.rotation.x = lerp(torso.rotation.x, 0.12, s);
    }

    // 挥手
    st.wave = Math.max(0, st.wave - dt);
    if (st.wave > 0) {
      const w = Math.sin(st.t * 12) * 0.35;
      arms.R.sh.rotation.z = lerp(arms.R.sh.rotation.z, -2.1, clamp(st.wave * 3, 0, 1));
      arms.R.sh.rotation.x = lerp(arms.R.sh.rotation.x, 0.1, clamp(st.wave * 3, 0, 1));
      arms.R.el.rotation.x = lerp(arms.R.el.rotation.x, -0.4 + w * 0.4, clamp(st.wave * 3, 0, 1));
    }

    // 眨眼
    st.nextBlink -= dt;
    if (st.nextBlink <= 0) { st.blink = 0.12; st.nextBlink = 2 + Math.random() * 4; }
    if (st.blink > 0) {
      st.blink -= dt;
      const s = 1 - Math.abs(st.blink / 0.06 - 1);
      head.children.forEach(() => { });
      if (head.userData.eyes) head.userData.eyes.forEach((e) => { e.scale.y = 1.16 * lerp(1, 0.12, s); });
    }
    // 说话时头部微动
    if (st.talk > 0) {
      st.talk -= dt;
      head.rotation.y = Math.sin(st.t * 9) * 0.09;
      neck.rotation.x = Math.sin(st.t * 6) * 0.05;
    } else {
      head.rotation.y = damp(head.rotation.y, Math.sin(st.t * 0.5 + o.seed0 || 0) * 0.12, 3, dt);
      neck.rotation.x = damp(neck.rotation.x, 0, 4, dt);
    }
  }

  function setUmbrella(v) { umb.visible = !!v; }

  return {
    root, hips, torso, head, neck, arms, legs, params: o, state: st, setUmbrella,
    setMode, update,
    say: (d = 1.2) => { st.talk = d; },
    wave: (d = 1.4) => { st.wave = d; },
    get headY() { return P.headY ?? (h * 0.93); },
    height: h,
  };
}

/* ------------------------------------------------------------------ *
 *  发型
 * ------------------------------------------------------------------ */
function buildHair(head, o, P, hairM, h) {
  const R = P.headR;
  const style = o.hairStyle || 'short';
  const cap = (phiStart, phiLen, thetaLen, scale, pos, rot) => {
    const g = new THREE.SphereGeometry(R * 1.06, 14, 10, phiStart, phiLen, 0, thetaLen);
    const m = new THREE.Mesh(g, hairM);
    m.scale.set(scale[0], scale[1], scale[2]);
    m.position.set(pos[0], pos[1], pos[2]);
    if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
    addOutline(m, 0.014);
    head.add(m);
    return m;
  };

  if (style === 'bald' || style === 'thin') {
    cap(0, TAU, Math.PI * (style === 'bald' ? 0.42 : 0.5), [1, 1, 1], [0, R * 0.04, 0]);
    // 两侧鬓角
    for (const s of [-1, 1]) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(R * 0.34, 8, 6), hairM);
      m.position.set(s * R * 0.94, -R * 0.12, R * 0.12);
      m.scale.set(0.6, 1.2, 0.8);
      head.add(m);
    }
    return;
  }

  if (style === 'short') {
    cap(0, TAU, Math.PI * 0.56, [1.02, 1.04, 1.02], [0, R * 0.02, 0]);
    // 刘海
    for (let i = -2; i <= 2; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(R * 0.34, R * 0.4, R * 0.16), hairM);
      w.position.set(i * R * 0.3, R * 0.42 - Math.abs(i) * R * 0.045, R * 0.76);
      w.rotation.z = i * 0.16;
      w.rotation.x = -0.25;
      head.add(w);
    }
    return;
  }

  if (style === 'bob') {
    cap(0, TAU, Math.PI * 0.62, [1.06, 1.02, 1.06], [0, R * 0.01, 0]);
    for (let i = -2; i <= 2; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(R * 0.36, R * 0.46, R * 0.16), hairM);
      w.position.set(i * R * 0.31, R * 0.4 - Math.abs(i) * R * 0.04, R * 0.74);
      w.rotation.z = i * 0.15; w.rotation.x = -0.3;
      head.add(w);
    }
    // 鬓发
    for (const s of [-1, 1]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(R * 0.3, R * 0.95, R * 0.6), hairM);
      m.position.set(s * R * 0.92, -R * 0.42, R * 0.1);
      m.rotation.y = s * 0.12;
      addOutline(m, 0.014);
      head.add(m);
    }
    return;
  }

  if (style === 'long') {
    cap(0, TAU, Math.PI * 0.6, [1.05, 1.02, 1.05], [0, R * 0.01, 0]);
    const back = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.95, R * 0.7, R * 2.6, 12), hairM);
    back.position.set(0, -R * 0.9, -R * 0.18);
    back.scale.z = 0.6;
    addOutline(back, 0.014);
    head.add(back);
    for (let i = -2; i <= 2; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(R * 0.36, R * 0.44, R * 0.16), hairM);
      w.position.set(i * R * 0.31, R * 0.4, R * 0.75);
      w.rotation.z = i * 0.14; w.rotation.x = -0.28;
      head.add(w);
    }
    for (const s of [-1, 1]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(R * 0.26, R * 1.3, R * 0.5), hairM);
      m.position.set(s * R * 0.92, -R * 0.6, R * 0.16);
      addOutline(m, 0.014);
      head.add(m);
    }
    return;
  }

  if (style === 'ponytail') {
    cap(0, TAU, Math.PI * 0.58, [1.04, 1.03, 1.04], [0, R * 0.02, 0]);
    const tie = new THREE.Mesh(new THREE.TorusGeometry(R * 0.22, R * 0.06, 5, 10), cmat(0xe07a94));
    tie.position.set(0, R * 0.5, -R * 0.9);
    tie.rotation.x = 1.1;
    head.add(tie);
    const tail = new THREE.Mesh(new THREE.CapsuleGeometry(R * 0.3, R * 1.3, 4, 8), hairM);
    tail.position.set(0, -R * 0.25, -R * 1.15);
    tail.rotation.x = 0.45;
    addOutline(tail, 0.014);
    head.add(tail);
    for (let i = -2; i <= 2; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(R * 0.36, R * 0.4, R * 0.16), hairM);
      w.position.set(i * R * 0.3, R * 0.42, R * 0.76);
      w.rotation.z = i * 0.15; w.rotation.x = -0.26;
      head.add(w);
    }
    return;
  }

  if (style === 'cap') {
    const c = new THREE.Mesh(new THREE.SphereGeometry(R * 1.1, 12, 8, 0, TAU, 0, Math.PI * 0.5), cmat(o.hat || 0x4a6b8a));
    c.position.y = R * 0.12;
    addOutline(c, 0.014);
    head.add(c);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.35, R * 1.35, R * 0.05, 14), cmat(o.hat || 0x4a6b8a));
    brim.position.set(0, R * 0.16, R * 0.55);
    brim.scale.z = 0.8;
    head.add(brim);
    for (let i = -2; i <= 2; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(R * 0.34, R * 0.34, R * 0.16), hairM);
      w.position.set(i * R * 0.3, R * 0.34, R * 0.76);
      w.rotation.x = -0.3;
      head.add(w);
    }
    return;
  }

  if (style === 'bun') {
    cap(0, TAU, Math.PI * 0.6, [1.04, 1.02, 1.04], [0, R * 0.01, 0]);
    const bun = new THREE.Mesh(new THREE.SphereGeometry(R * 0.42, 10, 8), hairM);
    bun.position.set(0, R * 0.85, -R * 0.55);
    addOutline(bun, 0.014);
    head.add(bun);
    for (let i = -2; i <= 2; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(R * 0.36, R * 0.44, R * 0.16), hairM);
      w.position.set(i * R * 0.3, R * 0.4, R * 0.76);
      w.rotation.z = i * 0.15; w.rotation.x = -0.3;
      head.add(w);
    }
    return;
  }
  cap(0, TAU, Math.PI * 0.58, [1.04, 1.02, 1.04], [0, R * 0.02, 0]);
}
