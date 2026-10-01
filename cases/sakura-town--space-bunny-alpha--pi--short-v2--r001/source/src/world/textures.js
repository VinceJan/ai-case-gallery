/**
 * Canvas 生成的贴图：招牌、门帘、海报、报纸、菜单等。
 * 不依赖任何外部图片资源。
 */
import * as THREE from 'three';

const cache = new Map();

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function finish(canvas, { repeat = null, aniso = 4 } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = aniso;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  tex.needsUpdate = true;
  return tex;
}

/** 商铺招牌：主标题 + 副标题 + 边框 */
export function signTexture({ text, sub = '', bg = '#2f5f7a', fg = '#f6f0e2', w = 512, h = 160, border = true }) {
  const key = `sign|${text}|${sub}|${bg}|${fg}|${w}|${h}|${border}`;
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  if (border) {
    g.strokeStyle = 'rgba(255,255,255,0.75)';
    g.lineWidth = 6;
    g.strokeRect(9, 9, w - 18, h - 18);
    g.strokeStyle = 'rgba(0,0,0,0.25)';
    g.lineWidth = 3;
    g.strokeRect(20, 20, w - 40, h - 40);
  }
  g.fillStyle = fg;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const mainSize = Math.min(h * 0.44, (w * 0.86) / Math.max(1, text.length) * 1.02);
  g.font = `700 ${mainSize}px "Noto Sans SC","Microsoft YaHei","PingFang SC",sans-serif`;
  g.fillText(text, w / 2, sub ? h * 0.42 : h * 0.52);
  if (sub) {
    g.font = `500 ${h * 0.17}px "Noto Sans SC","Microsoft YaHei","PingFang SC",sans-serif`;
    g.globalAlpha = 0.85;
    g.fillText(sub, w / 2, h * 0.74);
    g.globalAlpha = 1;
  }
  const tex = finish(c);
  cache.set(key, tex);
  return tex;
}

/** 门帘（暖帘） */
export function norenTexture({ text, color = '#8a3b32', w = 256, h = 256 }) {
  const key = `noren|${text}|${color}`;
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');
  g.fillStyle = color;
  g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(0,0,0,0.18)';
  for (let i = 0; i < 3; i++) g.fillRect(((i + 1) * w) / 4 - 3, 0, 6, h);
  if (text) {
    g.fillStyle = 'rgba(246,240,226,0.92)';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `700 ${h * 0.3}px "Noto Sans SC","Microsoft YaHei",serif`;
    g.fillText(text, w / 2, h * 0.5);
  }
  const tex = finish(c);
  cache.set(key, tex);
  return tex;
}

/** 木纹 / 墙面贴图（低频，纯粹为了打破纯色） */
export function plankTexture({ base = '#8a6144', dark = '#6b4832', w = 128, h = 128, lines = 6 } = {}) {
  const key = `plank|${base}|${dark}|${lines}`;
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  g.strokeStyle = dark;
  g.globalAlpha = 0.35;
  for (let i = 1; i < lines; i++) {
    g.lineWidth = 1 + Math.random() * 2;
    g.beginPath();
    const y = (i * h) / lines;
    g.moveTo(0, y);
    g.bezierCurveTo(w * 0.3, y + (Math.random() - 0.5) * 5, w * 0.7, y + (Math.random() - 0.5) * 5, w, y);
    g.stroke();
  }
  g.globalAlpha = 1;
  const tex = finish(c, { repeat: [1, 1] });
  cache.set(key, tex);
  return tex;
}

/** 车站站名牌 */
export function stationSignTexture(name = '樱花駅', sub = 'SAKURA STATION') {
  const key = `station|${name}|${sub}`;
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(1024, 256);
  const g = c.getContext('2d');
  g.fillStyle = '#f2efe6';
  g.fillRect(0, 0, 1024, 256);
  g.fillStyle = '#2b3a48';
  g.fillRect(0, 0, 1024, 10);
  g.fillRect(0, 246, 1024, 10);
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = '700 120px "Noto Sans SC","Microsoft YaHei",sans-serif';
  g.fillText(name, 340, 130);
  g.font = '500 56px sans-serif';
  g.globalAlpha = 0.75;
  g.fillText(sub, 760, 138);
  const tex = finish(c);
  cache.set(key, tex);
  return tex;
}

/** 抽象“文字”贴图，用于远处读不清的细节 */
export function scribbleTexture({ bg = '#f4f0e6', fg = '#8a8a80', w = 128, h = 128 } = {}) {
  const key = `scribble|${bg}|${fg}`;
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.strokeStyle = fg;
  g.globalAlpha = 0.6;
  g.lineWidth = 3;
  for (let i = 0; i < 9; i++) {
    const y = 12 + i * 13;
    g.beginPath();
    g.moveTo(10, y);
    g.lineTo(10 + (w - 20) * (0.4 + Math.random() * 0.6), y);
    g.stroke();
  }
  g.globalAlpha = 1;
  const tex = finish(c);
  cache.set(key, tex);
  return tex;
}

/** 稻田水面 */
export function paddyTexture() {
  const key = 'paddy';
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(128, 128);
  const g = c.getContext('2d');
  g.fillStyle = '#8fae6e';
  g.fillRect(0, 0, 128, 128);
  g.fillStyle = 'rgba(120,160,200,0.35)';
  for (let y = 0; y < 128; y += 16) {
    for (let x = 0; x < 128; x += 16) {
      if ((x / 16 + y / 16) % 2 === 0) g.fillRect(x + 2, y + 2, 12, 12);
    }
  }
  const tex = finish(c, { repeat: [8, 4] });
  cache.set(key, tex);
  return tex;
}
