import * as THREE from 'three';

function createGradientMap(stops) {
  const data = new Uint8Array(stops.length * 4);
  for (let i = 0; i < stops.length; i++) {
    const v = stops[i];
    data[i * 4] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, stops.length, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export const TOON_GRADIENT_3 = createGradientMap([118, 192, 255]);
export const TOON_GRADIENT_4 = createGradientMap([102, 162, 214, 255]);

const materialCache = new Map();

export function createToonMaterial(color, opts = {}) {
  const {
    gradient = TOON_GRADIENT_3,
    map = null,
    side = THREE.FrontSide,
    transparent = false,
    opacity = 1,
    emissive = 0x000000,
    emissiveIntensity = 0,
    cacheKey = null,
  } = opts;

  if (cacheKey && materialCache.has(cacheKey)) return materialCache.get(cacheKey);

  const mat = new THREE.MeshToonMaterial({
    color,
    gradientMap: gradient,
    map,
    side,
    transparent,
    opacity,
    emissive,
    emissiveIntensity,
  });

  if (cacheKey) materialCache.set(cacheKey, mat);
  return mat;
}

function makeCanvasTexture(width, height, drawFn, repeatX = 1, repeatY = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, width, height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (repeatX !== 1 || repeatY !== 1) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
  }
  tex.needsUpdate = true;
  return tex;
}

export function createWoodTexture(base = '#9a6b48', grain = '#7d5234', rx = 1, ry = 1) {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = grain;
    ctx.lineWidth = 3;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i < 16; i++) ctx.fillRect((i * 32) + 4, 0, 8, h);
  }, rx, ry);
}

export function createRoofTileTexture(base = '#455163', highlight = '#5e6d82', rx = 2, ry = 2) {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    const rw = w / 8;
    const rh = h / 8;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const x = c * rw;
        const y = r * rh;
        ctx.fillStyle = highlight;
        ctx.beginPath();
        ctx.arc(x + rw * 0.5, y + rh * 0.72, rw * 0.44, 0, Math.PI);
        ctx.fill();
        ctx.strokeStyle = 'rgba(22, 28, 38, 0.42)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x, y + rh);
        ctx.lineTo(x + rw, y + rh);
        ctx.stroke();
      }
    }
  }, rx, ry);
}

export function createTatamiTexture(rx = 2, ry = 2) {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#d3c98d';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(154, 142, 88, 0.25)';
    ctx.lineWidth = 2;
    for (let y = 0; y < h; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = '#385840';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);
  }, rx, ry);
}

export function createShojiTexture() {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#fcf6e8';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#a37b52';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, w - 8, h - 8);
    ctx.lineWidth = 5;
    for (let x = 64; x < w; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 64; y < h; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  });
}

export function createAsphaltTexture(rx = 1, ry = 8) {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#686d76';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(30,34,42,0.08)';
      ctx.fillRect(Math.random() * w, Math.random() * h, 3, 3);
    }
    ctx.fillStyle = '#f2f0e8';
    ctx.fillRect(14, 0, 10, h);
    ctx.fillRect(w - 24, 0, 10, h);
  }, rx, ry);
}

export function createGrassTexture(rx = 14, ry = 14) {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#7bb868';
    ctx.fillRect(0, 0, w, h);
    const palette = ['#88c472', '#6fa95e', '#92cb78', '#74b064'];
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = palette[i % palette.length];
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, 10 + Math.random() * 22, 6 + Math.random() * 14, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#f9c7d5';
    for (let i = 0; i < 26; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, 3, 1.8, Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, rx, ry);
}

export function createStonePathTexture(rx = 2, ry = 6) {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#b9b4a8';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#928c80';
    ctx.lineWidth = 4;
    for (let r = 0; r < 4; r++) {
      const y = r * 64;
      const offset = (r % 2) * 32;
      for (let c = -1; c < 5; c++) {
        const x = c * 64 + offset;
        ctx.fillStyle = (r + c) % 2 === 0 ? '#cbc5b8' : '#bfb9ac';
        ctx.fillRect(x + 3, y + 3, 58, 58);
        ctx.strokeRect(x + 2, y + 2, 60, 60);
      }
    }
  }, rx, ry);
}

export function createSignTexture(title, subtitle = '', bg = '#fff7ea', fg = '#3b2c27', accent = '#d46a84') {
  return makeCanvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 14;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 68px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(title, w / 2, subtitle ? h * 0.42 : h * 0.5);
    if (subtitle) {
      ctx.fillStyle = accent;
      ctx.font = 'bold 30px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(subtitle, w / 2, h * 0.75);
    }
  });
}

export function createNorenTexture(charText, bg = '#2e5478', fg = '#fffaf0') {
  return makeCanvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fillRect(w / 3 - 2, h * 0.25, 4, h * 0.75);
    ctx.fillRect((w * 2) / 3 - 2, h * 0.25, 4, h * 0.75);
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 46px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(charText, w / 2, h * 0.52);
  });
}

export function createVendingFrontTexture() {
  return makeCanvasTexture(256, 512, (ctx, w, h) => {
    ctx.fillStyle = '#e7535b';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#eef7ff';
    ctx.fillRect(18, 24, w - 36, 250);
    const colors = ['#f49ab0', '#5db6e8', '#7ac97e', '#f5c252', '#8c5a3c', '#ff7b54'];
    for (let row = 0; row < 3; row++) {
      const y = 44 + row * 78;
      ctx.fillStyle = '#d3e4f0';
      ctx.fillRect(22, y + 48, w - 44, 10);
      for (let col = 0; col < 5; col++) {
        ctx.fillStyle = colors[(row * 5 + col) % colors.length];
        ctx.fillRect(32 + col * 40, y + 8, 26, 40);
        ctx.fillStyle = col % 2 === 0 ? '#3e92cc' : '#e65c5c';
        ctx.fillRect(34 + col * 40, y + 58, 22, 10);
      }
    }
    ctx.fillStyle = '#2d3138';
    ctx.fillRect(28, 360, w - 56, 86);
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(174, 290, 56, 52);
  });
}

export function createCrossingStripeTexture() {
  return makeCanvasTexture(256, 64, (ctx, w, h) => {
    ctx.fillStyle = '#f8d247';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#242529';
    for (let x = -64; x < w + 64; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 24, 0);
      ctx.lineTo(x + 4, h);
      ctx.lineTo(x - 20, h);
      ctx.closePath();
      ctx.fill();
    }
  }, 4, 1);
}

export function createWaterTexture() {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#5eb6d9';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 24; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 14, y + 10, x + 28, y);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, 14, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 2, 10);
}
