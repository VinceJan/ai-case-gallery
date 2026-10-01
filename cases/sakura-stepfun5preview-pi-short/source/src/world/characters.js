// 角色模型：玩家与 NPC 共用的 Q 版日式人物（程序化骨骼摆动）
import * as THREE from 'three';
import { MAT } from './materials.js';
import { makeSignTex } from './materials.js';
import { NPC_COLORS } from './palette.js';

const toon = (c) => new THREE.MeshToonMaterial({ color: c, gradientMap: MAT.plaster.gradientMap });

// 生成角色。opts: {top, bottom, hair, skin, hairStyle, height, skirt}
export function makeCharacter(opts = {}) {
  const o = {
    top: opts.top ?? 0x4a7fb5,
    bottom: opts.bottom ?? 0x3a4a6b,
    hair: opts.hair ?? 0x3a2c26,
    skin: opts.skin ?? 0xf2cfae,
    hairStyle: opts.hairStyle ?? Math.floor(Math.random() * 4),
    height: opts.height ?? 1.0,   // 1.0 = 标准
    skirt: opts.skirt ?? false,
  };
  const g = new THREE.Group();
  const s = o.height;
  // 腿
  const legL = new THREE.Group(); const legR = new THREE.Group();
  const legGeo = new THREE.BoxGeometry(0.16 * s, 0.62 * s, 0.18 * s);
  const legMat = toon(o.bottom);
  const mLL = new THREE.Mesh(legGeo, legMat); mLL.position.y = -0.31 * s;
  const mRL = new THREE.Mesh(legGeo, legMat); mRL.position.y = -0.31 * s;
  legL.add(mLL); legR.add(mRL);
  legL.position.set(-0.11 * s, 0.62 * s, 0);
  legR.position.set(0.11 * s, 0.62 * s, 0);
  g.add(legL, legR);
  // 鞋
  for (const leg of [legL, legR]) {
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.17 * s, 0.1 * s, 0.26 * s), toon(0x3a3640));
    shoe.position.set(0, -0.62 * s, 0.03 * s);
    leg.add(shoe);
  }
  // 身体
  const body = new THREE.Group();
  body.position.y = 0.62 * s;
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44 * s, 0.56 * s, 0.26 * s), toon(o.top));
  torso.position.y = 0.28 * s;
  body.add(torso);
  if (o.skirt) {
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.26 * s, 0.34 * s, 0.34 * s, 8), toon(o.bottom));
    skirt.position.y = 0.02 * s;
    body.add(skirt);
  }
  g.add(body);
  // 手臂
  const armL = new THREE.Group(); const armR = new THREE.Group();
  const armGeo = new THREE.BoxGeometry(0.11 * s, 0.52 * s, 0.13 * s);
  const armMat = toon(o.top);
  const mAL = new THREE.Mesh(armGeo, armMat); mAL.position.y = -0.26 * s;
  const mAR = new THREE.Mesh(armGeo, armMat); mAR.position.y = -0.26 * s;
  armL.add(mAL); armR.add(mAR);
  armL.position.set(-0.29 * s, 0.82 * s, 0);
  armR.position.set(0.29 * s, 0.82 * s, 0);
  g.add(armL, armR);
  // 头
  const head = new THREE.Group();
  head.position.y = 1.06 * s;
  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.4 * s, 0.4 * s, 0.38 * s), toon(o.skin));
  skull.position.y = 0.2 * s;
  skull.castShadow = true;
  head.add(skull);
  // 眼睛
  const eyeMat = MAT.eye;
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.045 * s, 0.07 * s, 0.02 * s), eyeMat);
    eye.position.set(sx * 0.09 * s, 0.22 * s, 0.195 * s);
    head.add(eye);
  }
  // 腮红
  for (const sx of [-1, 1]) {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.06 * s, 0.03 * s, 0.02 * s), MAT.cheek);
    cheek.position.set(sx * 0.15 * s, 0.15 * s, 0.19 * s);
    head.add(cheek);
  }
  // 嘴
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.05 * s, 0.02 * s, 0.02 * s), MAT.mouth);
  mouth.position.set(0, 0.11 * s, 0.2 * s);
  head.add(mouth);
  // 头发
  const hairMat = toon(o.hair);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.44 * s, 0.16 * s, 0.42 * s), hairMat);
  cap.position.y = 0.4 * s;
  head.add(cap);
  if (o.hairStyle === 0) {
    // 长直发
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.44 * s, 0.55 * s, 0.12 * s), hairMat);
    back.position.set(0, 0.14 * s, -0.22 * s);
    head.add(back);
  } else if (o.hairStyle === 1) {
    // 双马尾
    for (const sx of [-1, 1]) {
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.13 * s, 0.42 * s, 0.13 * s), hairMat);
      tail.position.set(sx * 0.28 * s, 0.16 * s, -0.1 * s);
      head.add(tail);
    }
  } else if (o.hairStyle === 2) {
    // 短发
    const fringe = new THREE.Mesh(new THREE.BoxGeometry(0.46 * s, 0.1 * s, 0.1 * s), hairMat);
    fringe.position.set(0, 0.32 * s, 0.2 * s);
    head.add(fringe);
  } else {
    // 丸子头
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.12 * s, 8, 8), hairMat);
    bun.position.set(0, 0.5 * s, -0.12 * s);
    head.add(bun);
  }
  g.add(head);
  // 阴影全部投射
  g.traverse((m) => { if (m.isMesh) { m.castShadow = true; } });
  return { group: g, head, body, armL, armR, legL, legR };
}

// 行走/待机动画
export function animateCharacter(parts, phase, speed = 0, dt = 0) {
  const swing = Math.min(speed / 3, 1);
  const amp = 0.55 * swing + 0.03;
  parts.legL.rotation.x = Math.sin(phase) * amp;
  parts.legR.rotation.x = -Math.sin(phase) * amp;
  parts.armL.rotation.x = -Math.sin(phase) * amp * 0.9;
  parts.armR.rotation.x = Math.sin(phase) * amp * 0.9;
  // 身体轻微起伏
  parts.body.position.y = 0.62 + Math.abs(Math.sin(phase)) * 0.03 * swing;
  parts.head.rotation.z = Math.sin(phase * 0.5) * 0.02;
  // 待机呼吸
  if (swing < 0.05) {
    parts.body.scale.y = 1 + Math.sin(phase * 0.4) * 0.012;
  } else parts.body.scale.y = 1;
}

// 名字标签
const nameTagCache = new Map();
export function makeNameTag(name, sub = '') {
  const key = name + '|' + sub;
  if (nameTagCache.has(key)) {
    const mat = nameTagCache.get(key);
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.6, 0.42, 1);
    return sprite;
  }
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(28,22,32,0.72)';
  ctx.beginPath();
  ctx.roundRect(4, 4, 248, 56, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,183,197,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ffe9ee';
  ctx.font = 'bold 26px "Hiragino Sans","Microsoft YaHei",sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 128, sub ? 24 : 32);
  if (sub) {
    ctx.fillStyle = '#ffd98a';
    ctx.font = '16px "Hiragino Sans","Microsoft YaHei",sans-serif';
    ctx.fillText(sub, 128, 48);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  nameTagCache.set(key, mat);
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.05, 0.27, 1);
  return sprite;
}

// 聊天气泡
export function makeChatBubble(text = '…') {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.roundRect(8, 8, 112, 92, 24);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(54, 98); ctx.lineTo(64, 122); ctx.lineTo(74, 98);
  ctx.fill();
  ctx.fillStyle = '#5a4a52';
  ctx.font = 'bold 44px "Hiragino Sans","Microsoft YaHei",sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 56);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sprite.scale.set(1.0, 1.0, 1);
  return sprite;
}

// 心情图标（爱心等）
export function makeEmoteSprite(emoji) {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.font = '80px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sprite.scale.set(0.8, 0.8, 1);
  return sprite;
}
