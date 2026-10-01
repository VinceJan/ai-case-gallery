// 通用工具：数学、随机、程序化贴图、噪声、几何助手
import * as THREE from 'three';

export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const smoothstep = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
export const rand = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
export const randInt = (a, b) => Math.floor(rand(a, b + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const chance = (p) => Math.random() < p;

/** 最短角度差 */
export function angleDelta(a, b) {
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
}
export function dampAngle(a, b, lambda, dt) {
  return a + angleDelta(a, b) * (1 - Math.exp(-lambda * dt));
}

/* ---------------- 程序化贴图 ---------------- */

/** 创建 canvas 贴图；draw(ctx, w, h) 负责绘制 */
export function canvasTexture(w, h, draw, { repeat = null, srgb = true, nearest = false } = {}) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(cv);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  if (nearest) { tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; }
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  tex.anisotropy = 4;
  return tex;
}

/** 噪点 */
function speckle(ctx, w, h, n, colors, rmin = 1, rmax = 3) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = pick(colors);
    const r = rand(rmin, rmax);
    ctx.beginPath();
    ctx.arc(rand(w), rand(h), r, 0, TAU);
    ctx.fill();
  }
}

/** 卡通渐变 ramp（MeshToonMaterial.gradientMap） */
export function toonGradient(steps = 3) {
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) data[i] = Math.round(255 * (i + 1) / steps);
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

/** 常用材质贴图（无外部资源） */
export const Tex = {
  plaster(w = 128) {
    return canvasTexture(w, w, (ctx, w, h) => {
      ctx.fillStyle = '#e8e2d4'; ctx.fillRect(0, 0, w, h);
      speckle(ctx, w, h, 130, ['#dcd4c2', '#efe9db', '#d2c9b4'], 1, 2.4);
    });
  },
  wood(base = '#b0824f', dark = '#8a5f34', light = '#c99a68', n = 60) {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < n; i++) {
        ctx.strokeStyle = Math.random() < 0.5 ? dark : light;
        ctx.lineWidth = rand(0.6, 2.2);
        const y = rand(h);
        ctx.beginPath(); ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.08 + i) * 2.2);
        ctx.stroke();
      }
    });
  },
  plank(base, dark) {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = dark;
      for (let i = 0; i <= 4; i++) ctx.fillRect(0, i * 32 - 1.5, w, 3);
      for (let i = 0; i < 40; i++) { ctx.fillRect(rand(w), rand(h), rand(4, 22), 1.4); }
    });
  },
  tile(base = '#4a5568', line = '#39424f', n = 26) {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = line; ctx.lineWidth = 3;
      for (let i = 0; i <= 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * 32); ctx.lineTo(w, i * 32); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i * 32, 0); ctx.lineTo(i * 32, h); ctx.stroke();
      }
      speckle(ctx, w, h, n, ['rgba(255,255,255,.14)', 'rgba(0,0,0,.14)'], 1, 2.6);
    });
  },
  tatami() {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = '#c8bd7d'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#a89a5e'; ctx.lineWidth = 2;
      for (let i = 0; i <= 2; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * 43); ctx.lineTo(w, i * 43); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i * 43, 0); ctx.lineTo(i * 43, h); ctx.stroke();
      }
      for (let i = 0; i < 90; i++) {
        ctx.strokeStyle = 'rgba(120,110,60,.25)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(rand(w), rand(h)); ctx.lineTo(rand(w), rand(h)); ctx.stroke();
      }
    });
  },
  asphalt() {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = '#4c4a4e'; ctx.fillRect(0, 0, w, h);
      speckle(ctx, w, h, 260, ['#58565b', '#424144', '#605e63'], 1, 2.2);
      ctx.fillStyle = 'rgba(70,68,72,.6)';
      ctx.fillRect(rand(10, 60), rand(10, 60), rand(20, 50), rand(15, 45));
    });
  },
  concrete() {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = '#b9b5ab'; ctx.fillRect(0, 0, w, h);
      speckle(ctx, w, h, 150, ['#aca89e', '#c6c2b8', '#a09d94'], 1, 2.6);
      ctx.strokeStyle = 'rgba(90,88,82,.5)'; ctx.lineWidth = 2;
      for (let i = 0; i <= 2; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * 43); ctx.lineTo(w, i * 43); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i * 43, 0); ctx.lineTo(i * 43, h); ctx.stroke();
      }
    });
  },
  grass(base = '#7fa65a', alt = '#6d9150', dry = '#93b061') {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      speckle(ctx, w, h, 220, [alt, dry, '#88ad63'], 1, 3);
      ctx.strokeStyle = alt; ctx.lineWidth = 1;
      for (let i = 0; i < 46; i++) {
        const x = rand(w), y = rand(h);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rand(-2, 2), y - rand(2, 5)); ctx.stroke();
      }
    });
  },
  water() {
    return canvasTexture(128, 128, (ctx, w, h) => {
      ctx.fillStyle = '#5d86a8'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,.22)'; ctx.lineWidth = rand(1, 2.4);
      for (let i = 0; i < 22; i++) {
        const y = rand(h);
        ctx.beginPath(); ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 24) ctx.lineTo(x, y + Math.sin(x * .12 + i) * 2.4);
        ctx.stroke();
      }
    });
  },
  noren(base = '#2b3a67', text = '樱花', sub = '') {
    return canvasTexture(256, 128, (ctx, w, h) => {
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.font = 'bold 56px "Hiragino Sans", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, w / 2, h / 2 + 6);
      if (sub) {
        ctx.font = '20px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.fillText(sub, w / 2, h - 24);
      }
    });
  },
  /** 招牌：竖排或横排日文 */
  sign(text, { w = 512, h = 128, bg = '#f7f3ea', fg = '#2b3a67', vertical = false, accent = '#d97a95', sub = '' } = {}) {
    return canvasTexture(w, h, (ctx, w, h) => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = accent; ctx.lineWidth = 5; ctx.strokeRect(3, 3, w - 6, h - 6);
      ctx.fillStyle = fg;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const font = '"Hiragino Sans", "Noto Sans JP", "Yu Gothic", "Meiryo", "Microsoft YaHei", sans-serif';
      if (vertical) {
        const chars = [...text];
        ctx.font = `bold ${Math.min(52, (h - 30) / chars.length)}px ${font}`;
        chars.forEach((c, i) => ctx.fillText(c, w / 2, (h - 20) / chars.length * i + 26));
      } else {
        ctx.font = `bold ${Math.min(64, (w - 40) / text.length * 1.6)}px ${font}`;
        ctx.fillText(text, w / 2, h / 2 - (sub ? 12 : 0));
      }
      if (sub) {
        ctx.font = `20px ${font}`; ctx.fillStyle = accent;
        ctx.fillText(sub, w / 2, h - 26);
      }
    });
  },
  /** 海报/公告 */
  poster(title, lines, { w = 512, h = 640, bg = '#f7f3ea' } = {}) {
    return canvasTexture(w, h, (ctx, w, h) => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#2b3a67'; ctx.lineWidth = 6; ctx.strokeRect(5, 5, w - 10, h - 10);
      ctx.fillStyle = '#d97a95'; ctx.fillRect(5, 5, w - 10, 70);
      ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
      ctx.font = 'bold 40px "Hiragino Sans", "Noto Sans JP", "Yu Gothic", sans-serif';
      ctx.fillText(title, w / 2, 50);
      ctx.fillStyle = '#33302e'; ctx.textAlign = 'left';
      ctx.font = '26px "Hiragino Sans", "Noto Sans JP", "Yu Gothic", "Microsoft YaHei", sans-serif';
      lines.forEach((l, i) => ctx.fillText(l, 36, 120 + i * 44));
    });
  },
  petal() {
    return canvasTexture(64, 64, (ctx, w, h) => {
      const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
      g.addColorStop(0, 'rgba(255,240,245,.95)');
      g.addColorStop(.6, 'rgba(248,196,212,.75)');
      g.addColorStop(1, 'rgba(240,160,190,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(32, 32, 26, 15, .5, 0, TAU);
      ctx.fill();
    }, { srgb: true });
  },
  glow(color = '#ffd9a0') {
    return canvasTexture(64, 64, (ctx, w, h) => {
      const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(255,220,170,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    });
  },
};

/* ---------------- 噪声 ---------------- */

function hash2(x, y) {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}
export function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
export function fbm(x, y, oct = 4) {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) {
    v += amp * valueNoise(x * f, y * f);
    amp *= 0.5; f *= 2.03;
  }
  return v;
}

/* ---------------- 几何助手 ---------------- */

const _boxGeoCache = new Map();
/** 创建立方体并自动按尺寸缩放 UV（贴图不拉伸；同尺寸+同缩放共享几何体） */
export function uvBox(w, h, d, uvScale = 1) {
  const key = `${w},${h},${d},${uvScale}`;
  const cached = _boxGeoCache.get(key);
  if (cached) return cached;
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  const scale = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) {
    const [su, sv] = scale[f];
    for (let i = f * 4; i < f * 4 + 4; i++) {
      uv.setXY(i, uv.getX(i) * su * uvScale, uv.getY(i) * sv * uvScale);
    }
  }
  uv.needsUpdate = true;
  _boxGeoCache.set(key, geo);
  return geo;
}

/** 在 group 下加一个盒体（自动阴影/UV） */
export function addBox(group, mat, w, h, d, x, y, z, { ry = 0, rx = 0, rz = 0, uv = 1, cast = true, receive = true, name = '' } = {}) {
  const geo = uvBox(w, h, d, uv);
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.castShadow = cast; m.receiveShadow = receive;
  if (name) m.name = name;
  group.add(m);
  return m;
}

/** 圆柱 */
export function addCyl(group, mat, rt, rb, h, x, y, z, { seg = 10, ry = 0, cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z); m.rotation.y = ry;
  m.castShadow = cast; m.receiveShadow = receive;
  group.add(m);
  return m;
}

/** 球 */
export function addSphere(group, mat, r, x, y, z, { seg = 10, cast = true, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1 } = {}) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg / 2)), mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.rotation.set(rx, ry, rz);
  m.castShadow = cast; m.receiveShadow = false;
  group.add(m);
  return m;
}

/** 水平面（UV 按尺寸缩放） */
export function addPlane(group, mat, w, d, x, y, z, { ry = 0, uv = 0.25, receive = true, rx = 0 } = {}) {
  const geo = new THREE.PlaneGeometry(w, d);
  const u = geo.attributes.uv;
  for (let i = 0; i < u.count; i++) u.setXY(i, u.getX(i) * w * uv, u.getY(i) * d * uv);
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2 + rx;
  m.rotation.z = ry;
  m.position.set(x, y, z);
  m.receiveShadow = receive;
  group.add(m);
  return m;
}
