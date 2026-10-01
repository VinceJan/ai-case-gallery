// 程序化贴图（全部用 canvas 生成，统一风格，无需外部资源）
import * as THREE from 'three';
import { PAL, hex, shade } from './palette.js';
import { makeRNG } from '../util/math.js';

const cache = new Map();

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function toTexture(canvas, { repeat = [1, 1], wrap = true, aniso = 4, srgb = true, nearest = false } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = wrap ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (nearest) { t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; }
  t.needsUpdate = true;
  return t;
}

function cached(key, fn) {
  if (cache.has(key)) return cache.get(key);
  const v = fn();
  cache.set(key, v);
  return v;
}

function fill(ctx, w, h, color) {
  ctx.fillStyle = color; ctx.fillRect(0, 0, w, h);
}

function speckle(ctx, w, h, count, colors, rng, size = 1.6) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = colors[Math.floor(rng() * colors.length)];
    const s = size * (0.4 + rng() * 1.2);
    ctx.fillRect(rng() * w, rng() * h, s, s);
  }
}

/* ================================================================ *
 *  木质壁板（ siding ）
 * ================================================================ */
export function woodSiding(base = PAL.wallWood, planks = 8, vertical = false) {
  return cached(`siding${base}${planks}${vertical}`, () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(base % 9973 + planks);
    fill(ctx, W, H, hex(base));
    const ph = H / planks;
    for (let i = 0; i < planks; i++) {
      const y = i * ph;
      const tone = shade(base, (rng() - 0.45) * 0.16);
      ctx.fillStyle = hex(tone);
      ctx.fillRect(0, y, W, ph - 1);
      // 木纹
      ctx.strokeStyle = hex(shade(base, -0.12));
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      for (let g = 0; g < 5; g++) {
        ctx.beginPath();
        const gy = y + 3 + rng() * (ph - 6);
        ctx.moveTo(0, gy);
        ctx.bezierCurveTo(W * 0.3, gy + (rng() - 0.5) * 3, W * 0.7, gy + (rng() - 0.5) * 3, W, gy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // 板缝阴影
      ctx.fillStyle = hex(shade(base, -0.3));
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, y + ph - 2, W, 2);
      ctx.globalAlpha = 1;
    }
    return toTexture(c, { repeat: [1, 1] });
  });
}

/* ================================================================ *
 *  屋瓦（ japanese tile roof ）
 * ================================================================ */
export function roofTiles(base = PAL.roofTile) {
  return cached(`roof${base}`, () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(4242);
    fill(ctx, W, H, hex(base));
    const rows = 8, cols = 10;
    const rh = H / rows, cw = W / cols;
    for (let r = 0; r < rows; r++) {
      for (let col = -1; col <= cols; col++) {
        const x = col * cw + (r % 2 ? cw * 0.5 : 0);
        const y = r * rh;
        const tone = shade(base, (rng() - 0.5) * 0.2);
        ctx.fillStyle = hex(tone);
        ctx.beginPath();
        ctx.moveTo(x, y + rh);
        ctx.lineTo(x, y + rh * 0.35);
        ctx.quadraticCurveTo(x + cw * 0.5, y - rh * 0.2, x + cw, y + rh * 0.35);
        ctx.lineTo(x + cw, y + rh);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = hex(shade(base, -0.34));
        ctx.lineWidth = 1.4;
        ctx.stroke();
        // 高光
        ctx.strokeStyle = hex(shade(base, 0.24));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + cw * 0.2, y + rh * 0.7);
        ctx.quadraticCurveTo(x + cw * 0.5, y + rh * 0.2, x + cw * 0.8, y + rh * 0.7);
        ctx.stroke();
      }
    }
    return toTexture(c, { repeat: [1, 1] });
  });
}

/* ================================================================ *
 *  沥青路面
 * ================================================================ */
export function asphalt(base = PAL.asphalt, withLine = false) {
  return cached(`asphalt${base}${withLine}`, () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(777 + base);
    fill(ctx, W, H, hex(base));
    speckle(ctx, W, H, 2600, [hex(shade(base, 0.18)), hex(shade(base, -0.2)), hex(shade(base, 0.08))], rng, 1.7);
    // 淡淡的水痕
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = hex(shade(base, -0.35));
      ctx.beginPath();
      ctx.ellipse(rng() * W, rng() * H, 12 + rng() * 40, 6 + rng() * 16, rng() * 3, 0, 7);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (withLine) {
      ctx.strokeStyle = hex(PAL.cream);
      ctx.lineWidth = 6;
      ctx.setLineDash([34, 30]);
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
      ctx.setLineDash([]);
    }
    return toTexture(c, { repeat: [1, 1] });
  });
}

/* ================================================================ *
 *  混凝土 / 侧石
 * ================================================================ */
export function concrete(base = PAL.concrete) {
  return cached(`conc${base}`, () => {
    const W = 128, H = 128;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(base % 631);
    fill(ctx, W, H, hex(base));
    speckle(ctx, W, H, 900, [hex(shade(base, 0.12)), hex(shade(base, -0.12))], rng, 1.4);
    return toTexture(c);
  });
}

/* ================================================================ *
 *  窗户贴图（室内 / 窗帘 / 夜景）
 * ================================================================ */
export function windowTex(variant = 'day') {
  return cached(`win${variant}`, () => {
    const W = 128, H = 128;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(313 + variant.length * 17);
    const frame = hex(PAL.cream);
    fill(ctx, W, H, frame);
    // 玻璃
    const g = ctx.createLinearGradient(0, 12, 0, H - 12);
    if (variant === 'night') {
      g.addColorStop(0, hex(PAL.windowLit));
      g.addColorStop(1, hex(shade(PAL.windowLit, -0.35)));
    } else {
      g.addColorStop(0, hex(shade(PAL.window, 0.35)));
      g.addColorStop(1, hex(shade(PAL.window, -0.2)));
    }
    ctx.fillStyle = g;
    ctx.fillRect(9, 9, W - 18, H - 18);
    // 室内剪影
    if (variant === 'lit') {
      ctx.fillStyle = 'rgba(120,80,50,.5)';
      ctx.fillRect(20, H - 46, 26, 36);
      ctx.fillStyle = 'rgba(60,50,40,.45)';
      ctx.fillRect(W - 52, H - 34, 34, 24);
    }
    // 窗帘
    if (variant === 'curtain' || variant === 'lit') {
      ctx.fillStyle = 'rgba(250,240,235,.92)';
      const cw = 26;
      ctx.beginPath();
      ctx.moveTo(9, 9);
      for (let x = 9; x <= 9 + cw; x += 4) ctx.lineTo(x, 9 + Math.sin(x * 0.9) * 3);
      ctx.lineTo(9 + cw, 40); ctx.lineTo(9, 34); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(W - 9 - cw, 9);
      for (let x = 0; x <= cw; x += 4) ctx.lineTo(W - 9 - cw + x, 9 + Math.sin(x * 0.9 + 1) * 3);
      ctx.lineTo(W - 9, 34); ctx.lineTo(W - 9 - cw, 40); ctx.fill();
    }
    // 玻璃反光
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(14, H - 16); ctx.lineTo(W - 44, 14); ctx.lineTo(W - 24, 14); ctx.lineTo(34, H - 16);
    ctx.fill();
    ctx.globalAlpha = 1;
    speckle(ctx, W, H, 90, ['rgba(255,255,255,.10)'], rng, 2);
    // 窗框
    ctx.strokeStyle = hex(PAL.cream);
    ctx.lineWidth = 6;
    ctx.strokeRect(9, 9, W - 18, H - 18);
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(W / 2, 9); ctx.lineTo(W / 2, H - 9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(9, H / 2); ctx.lineTo(W - 9, H / 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(90,70,60,.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(1, 1, W - 2, H - 2);
    return toTexture(c);
  });
}

/* ================================================================ *
 *  招牌 / 文字板
 * ================================================================ */
/**
 * @param {object} o
 *  text 主文字, sub 副标题, bg 背景色, fg 字色, accent 装饰色
 *  vertical 竖排, bgImage 'paper'|'wood'|'metal'|'night', border
 */
export function signTex(o = {}) {
  const {
    text = '', sub = '', bg = PAL.cream, fg = PAL.ink || 0x2c2a33, accent = PAL.red,
    vertical = false, w = 512, h = 256, bgImage = 'paper', border = true,
    font = 700, size = 96, subSize = 30, fontFamily = '"Zen Kaku Gothic New", "Noto Sans SC", sans-serif',
    key = '',
  } = o;
  const ck = `sign${key || text + sub + bg + vertical + w + h + bgImage}`;
  return cached(ck, () => {
    const c = makeCanvas(w, h), ctx = c.getContext('2d');
    const rng = makeRNG(text.length * 131 + w);
    // 背景
    if (bgImage === 'wood') {
      fill(ctx, w, h, hex(bg));
      for (let i = 0; i < 40; i++) {
        ctx.strokeStyle = hex(shade(bg, -0.14 + rng() * 0.2));
        ctx.globalAlpha = 0.5; ctx.lineWidth = 1 + rng() * 2;
        ctx.beginPath(); ctx.moveTo(0, rng() * h); ctx.lineTo(w, rng() * h); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else if (bgImage === 'metal') {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, hex(shade(bg, 0.16)));
      g.addColorStop(0.5, hex(bg));
      g.addColorStop(1, hex(shade(bg, -0.2)));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.08;
      for (let i = 0; i < h; i += 3) { ctx.fillStyle = i % 6 ? '#000' : '#fff'; ctx.fillRect(0, i, w, 1); }
      ctx.globalAlpha = 1;
    } else if (bgImage === 'night') {
      fill(ctx, w, h, hex(shade(bg, -0.6)));
    } else {
      fill(ctx, w, h, hex(bg));
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(255,255,255,.14)');
      g.addColorStop(1, 'rgba(0,0,0,.05)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      // 纸纤维
      ctx.globalAlpha = 0.05; speckle(ctx, w, h, 700, ['#000', '#fff'], rng, 1.6); ctx.globalAlpha = 1;
    }
    if (border) {
      ctx.strokeStyle = hex(accent);
      ctx.lineWidth = Math.max(3, h * 0.035);
      ctx.strokeRect(ctx.lineWidth, ctx.lineWidth, w - ctx.lineWidth * 2, h - ctx.lineWidth * 2);
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = hex(fg);
    if (vertical) {
      const chars = [...text];
      const cellH = (h * 0.82) / chars.length;
      ctx.font = `${font} ${Math.min(size, cellH * 0.86)}px ${fontFamily}`;
      chars.forEach((ch, i) => {
        ctx.fillText(ch, w / 2, h * 0.09 + cellH * (i + 0.5));
      });
      if (sub) {
        ctx.font = `400 ${subSize}px ${fontFamily}`;
        ctx.fillStyle = hex(accent);
        ctx.fillText(sub, w / 2, h * 0.95);
      }
    } else {
      ctx.font = `${font} ${size}px ${fontFamily}`;
      ctx.fillText(text, w / 2, sub ? h * 0.42 : h * 0.5);
      if (sub) {
        ctx.font = `400 ${subSize}px ${fontFamily}`;
        ctx.fillStyle = hex(accent);
        ctx.fillText(sub, w / 2, h * 0.78);
      }
    }
    return toTexture(c);
  });
}

/** 竖排长条灯箱招牌（商店街用） */
export function vSignTex(text, bg = PAL.red, fg = 0xfff7ee) {
  const w = 128;
  const h = 128 * Math.max(2, [...text].length) * 0.72;
  return signTex({ text, bg, fg, vertical: true, w, h: Math.round(h), size: 74, subSize: 20, bgImage: 'paper', border: false, fontFamily: '"Zen Kaku Gothic New", serif', key: 'v' + text + bg });
}

/* ================================================================ *
 *  海报 / 公告板
 * ================================================================ */
export function posterTex(kind = 'festival') {
  return cached(`poster${kind}`, () => {
    const W = 256, H = 384;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(kind.length * 733 + 5);
    const schemes = {
      festival: [PAL.sakura, PAL.cream, PAL.red],
      shop: [PAL.cream, PAL.woodBeige, PAL.redDeep],
      town: [PAL.wallTileBlue, PAL.cream, PAL.blue],
      rail: [PAL.cream, PAL.silver, PAL.blue],
    };
    const [a, b, ccol] = schemes[kind] || schemes.festival;
    fill(ctx, W, H, hex(b));
    // 标题带
    ctx.fillStyle = hex(a);
    ctx.fillRect(0, 0, W, 92);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const titles = { festival: '桜まつり', shop: '本日 特売', town: '町 内 だ よ り', rail: '運 転 お 知 ら せ' };
    ctx.fillStyle = hex(kind === 'festival' ? 0x6a3550 : 0xffffff);
    ctx.font = `700 46px "Zen Kaku Gothic New", serif`;
    ctx.fillText(titles[kind] || 'おしらせ', W / 2, 48);
    // 正文块
    ctx.fillStyle = 'rgba(60,50,60,.62)';
    for (let i = 0; i < 11; i++) {
      const lw = W * (0.4 + rng() * 0.45);
      ctx.fillRect(28, 130 + i * 22, lw, 7);
    }
    // 装饰
    ctx.fillStyle = hex(ccol);
    ctx.globalAlpha = 0.85;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(24 + rng() * (W - 48), 120 + rng() * (H - 200), 8 + rng() * 16, 0, 7);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // 纸边
    ctx.strokeStyle = 'rgba(120,100,90,.35)'; ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, W - 2, H - 2);
    return toTexture(c);
  });
}

/** 车站时刻表 */
export function timetableTex() {
  return cached('timetable', () => {
    const W = 384, H = 512;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    fill(ctx, W, H, '#fbf6ea');
    ctx.fillStyle = hex(PAL.blue);
    ctx.fillRect(0, 0, W, 74);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '700 42px "Zen Kaku Gothic New", sans-serif';
    ctx.fillText('桜 町 駅', W / 2, 38);
    ctx.fillStyle = hex(PAL.ink || 0x2c2a33);
    ctx.font = '500 24px "Zen Kaku Gothic New", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('普通  上り', 22, 104);
    ctx.fillText('普通  下り', 22, 296);
    const rows = [['6:12', '町田'], ['7:04', '青葉'], ['7:38', '日向台'], ['8:20', '城東'], ['9:05', '青葉'], ['9:47', '町田'], ['10:30', '日向台']];
    ctx.font = '400 21px "Zen Kaku Gothic New", sans-serif';
    rows.forEach((r, i) => {
      const y = 138 + i * 22;
      ctx.fillStyle = 'rgba(60,50,60,.75)';
      ctx.fillText(r[0], 26, y);
      ctx.fillText('● ' + r[1], 140, y);
      ctx.strokeStyle = 'rgba(120,100,90,.2)';
      ctx.beginPath(); ctx.moveTo(20, y + 11); ctx.lineTo(W - 20, y + 11); ctx.stroke();
    });
    ctx.fillStyle = 'rgba(60,50,60,.75)';
    ctx.font = '400 21px "Zen Kaku Gothic New", sans-serif';
    const rows2 = [['11:12', '青葉'], ['12:30', '町田'], ['13:08', '日向台'], ['14:22', '城東'], ['15:40', '青葉'], ['17:03', '町田'], ['18:26', '日向台']];
    rows2.forEach((r, i) => {
      const y = 330 + i * 22;
      ctx.fillText(r[0], 26, y);
      ctx.fillText('● ' + r[1], 140, y);
      ctx.strokeStyle = 'rgba(120,100,90,.2)';
      ctx.beginPath(); ctx.moveTo(20, y + 11); ctx.lineTo(W - 20, y + 11); ctx.stroke();
    });
    ctx.fillStyle = hex(PAL.red);
    ctx.fillRect(20, H - 44, W - 40, 3);
    return toTexture(c);
  });
}

/* ================================================================ *
 *  室内材质
 * ================================================================ */
export function tatamiTex() {
  return cached('tatami', () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(9182);
    fill(ctx, W, H, hex(PAL.tatami));
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = hex(shade(PAL.tatami, y % 8 === 0 ? 0.06 : -0.05));
      ctx.fillRect(0, y, W, 2);
    }
    ctx.fillStyle = hex(shade(PAL.tatami, -0.35));
    ctx.fillRect(0, 0, 6, H);
    ctx.fillRect(W - 6, 0, 6, H);
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 40; i++) { ctx.fillStyle = hex(shade(PAL.tatami, -0.3)); ctx.fillRect(rng() * W, rng() * H, 18, 1.5); }
    ctx.globalAlpha = 1;
    return toTexture(c, { repeat: [1, 1] });
  });
}

export function floorWoodTex() {
  return cached('floorwood', () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(6611);
    fill(ctx, W, H, hex(PAL.floorWood));
    const planks = 6, ph = H / planks;
    for (let i = 0; i < planks; i++) {
      const y = i * ph;
      ctx.fillStyle = hex(shade(PAL.floorWood, (rng() - 0.5) * 0.14));
      ctx.fillRect(0, y, W, ph - 1);
      ctx.strokeStyle = hex(shade(PAL.floorWood, -0.28));
      ctx.lineWidth = 1.4; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.moveTo(0, y + ph - 1.5); ctx.lineTo(W, y + ph - 1.5); ctx.stroke();
      // 板缝（竖向错缝）
      const seam = ((i * 71) % 128) + 64;
      ctx.beginPath(); ctx.moveTo(seam, y); ctx.lineTo(seam, y + ph); ctx.stroke();
      ctx.globalAlpha = 0.18;
      for (let g = 0; g < 6; g++) {
        ctx.strokeStyle = hex(shade(PAL.floorWood, -0.2));
        ctx.beginPath();
        const gy = y + 3 + rng() * (ph - 6);
        ctx.moveTo(0, gy); ctx.bezierCurveTo(W * 0.35, gy + (rng() - 0.5) * 2, W * 0.7, gy + (rng() - 0.5) * 2, W, gy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    return toTexture(c, { repeat: [1, 1] });
  });
}

export function tileFloorTex() {
  return cached('tilefloor', () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(3311);
    fill(ctx, W, H, hex(PAL.floorTile));
    const n = 4, s = W / n;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        ctx.fillStyle = hex(shade(PAL.floorTile, (rng() - 0.5) * 0.05));
        ctx.fillRect(x * s + 1, y * s + 1, s - 2, s - 2);
        ctx.strokeStyle = hex(shade(PAL.floorTile, -0.14));
        ctx.lineWidth = 2;
        ctx.strokeRect(x * s, y * s, s, s);
      }
    }
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 500; i++) { ctx.fillStyle = '#6a5a4a'; ctx.fillRect(rng() * W, rng() * H, 1.6, 1.6); }
    ctx.globalAlpha = 1;
    return toTexture(c, { repeat: [1, 1] });
  });
}

/* ================================================================ *
 *  自动售货机正面
 * ================================================================ */
export function vendingTex(drink = 'beverage') {
  return cached(`vend${drink}`, () => {
    const W = 256, H = 512;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(drink === 'beverage' ? 5150 : 2277);
    fill(ctx, W, H, '#f4f6f8');
    // 上半：商品窗
    ctx.fillStyle = '#2a3340';
    ctx.fillRect(14, 20, W - 28, 250);
    const rows = 4, cols = 5;
    const cw = (W - 34) / cols, ch = 250 / rows;
    const canCols = drink === 'beverage'
      ? ['#e24a4a', '#3f7fc0', '#f0b83c', '#57a860', '#d47ab0', '#8a6bc4', '#e88b3a', '#4fb0b8', '#c85a3a', '#6a8f3a']
      : ['#d94a4a', '#3f6fbf', '#f2c94c', '#3fa860', '#c04a86'];
    for (let r = 0; r < rows; r++) {
      ctx.fillStyle = '#8fb8c8';
      ctx.fillRect(18, 24 + r * ch, W - 36, ch - 6);
      for (let i = 0; i < cols; i++) {
        const x = 20 + i * cw, y = 26 + r * ch;
        ctx.fillStyle = canCols[Math.floor(rng() * canCols.length)];
        const bw = cw * 0.62, bh = ch * 0.66;
        ctx.fillRect(x + (cw - bw) / 2, y + 3, bw, bh);
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.fillRect(x + (cw - bw) / 2, y + 3, bw * 0.22, bh);
        ctx.fillStyle = 'rgba(0,0,0,.25)';
        ctx.fillRect(x + (cw - bw) / 2, y + 3 + bh * 0.55, bw, bh * 0.16);
      }
      ctx.fillStyle = '#5c6b7a';
      ctx.fillRect(18, 24 + r * ch + ch - 8, W - 36, 4);
    }
    // 玻璃反光
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(20, 270); ctx.lineTo(96, 20); ctx.lineTo(126, 20); ctx.lineTo(50, 270); ctx.fill();
    ctx.globalAlpha = 1;
    // 下半：价格与按钮
    ctx.fillStyle = '#e8eef2';
    ctx.fillRect(14, 282, W - 28, 216);
    for (let r = 0; r < 4; r++) {
      for (let i = 0; i < 5; i++) {
        const x = 22 + i * ((W - 44) / 5), y = 292 + r * 50;
        ctx.fillStyle = '#ff5a4a';
        ctx.beginPath(); ctx.arc(x + 16, y + 16, 11, 0, 7); ctx.fill();
        ctx.fillStyle = '#2b3a46';
        ctx.font = '600 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('¥130', x + 16, y + 36);
      }
    }
    // 取货口
    ctx.fillStyle = '#39424e';
    ctx.fillRect(20, 470, W - 40, 32);
    ctx.fillStyle = '#161c22';
    ctx.fillRect(26, 476, W - 52, 20);
    return toTexture(c);
  });
}

/** 商店货架（便利店内景 / 咖啡吧台） */
export function shelfTex(kind = 'snack') {
  return cached(`shelf${kind}`, () => {
    const W = 256, H = 128;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(kind.length * 313 + 17);
    fill(ctx, W, H, '#f7f7f2');
    ctx.fillStyle = '#c9cdd2';
    ctx.fillRect(0, H - 10, W, 10);
    const n = 9;
    for (let i = 0; i < n; i++) {
      const x = i * (W / n) + 2;
      const hue = [
        ['#e8a94c', '#d4553f', '#5aa06a', '#4a7fb5', '#d78bb0'],
        ['#7fb5a0', '#c96a4a', '#e0c14b', '#6a8fc4', '#b06ab0'],
      ][kind === 'coffee' ? 1 : 0];
      ctx.fillStyle = hue[Math.floor(rng() * hue.length)];
      ctx.fillRect(x, 30, W / n - 5, H - 48);
      ctx.fillStyle = 'rgba(255,255,255,.35)';
      ctx.fillRect(x, 30, W / n - 5, 10);
      ctx.fillStyle = 'rgba(0,0,0,.18)';
      ctx.fillRect(x, H - 30, W / n - 5, 12);
    }
    ctx.fillStyle = 'rgba(70,60,50,.14)';
    ctx.fillRect(0, 0, W, 30);
    return toTexture(c);
  });
}

/* ================================================================ *
 *  杂项
 * ================================================================ */
export function bookTex() {
  return cached('book', () => {
    const W = 128, H = 128;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(555);
    fill(ctx, W, H, '#d8cbb2');
    for (let y = 0; y < H; y += 5) {
      ctx.fillStyle = 'rgba(120,100,70,.16)';
      ctx.fillRect(0, y, W, 2);
    }
    ctx.fillStyle = 'rgba(150,40,40,.6)';
    ctx.fillRect(18, 22, 6, H - 44);
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 10; i++) { ctx.fillStyle = '#6a5a40'; ctx.fillRect(30 + rng() * 80, 30 + rng() * 70, 3, 3); }
    ctx.globalAlpha = 1;
    return toTexture(c);
  });
}

export function gravelTex() {
  return cached('gravel', () => {
    const W = 128, H = 128;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(8123);
    fill(ctx, W, H, hex(PAL.gravel));
    for (let i = 0; i < 1400; i++) {
      const s = 1.4 + rng() * 2.6;
      ctx.fillStyle = hex(shade(PAL.gravel, (rng() - 0.5) * 0.4));
      ctx.beginPath();
      ctx.ellipse(rng() * W, rng() * H, s, s * 0.7, rng() * 3, 0, 7);
      ctx.fill();
    }
    return toTexture(c, { repeat: [1, 1] });
  });
}

/** 水面法线感：用带状波纹的贴图 */
export function waterTex() {
  return cached('water', () => {
    const W = 256, H = 256;
    const c = makeCanvas(W, H), ctx = c.getContext('2d');
    const rng = makeRNG(2468);
    fill(ctx, W, H, hex(PAL.waterDeep));
    for (let i = 0; i < 60; i++) {
      ctx.strokeStyle = hex(shade(PAL.water, 0.1 + rng() * 0.35));
      ctx.globalAlpha = 0.25 + rng() * 0.35;
      ctx.lineWidth = 1 + rng() * 2.4;
      const y = rng() * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(W * 0.3, y + (rng() - 0.5) * 8, W * 0.7, y + (rng() - 0.5) * 8, W, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    return toTexture(c, { repeat: [1, 1] });
  });
}

export function disposeTextureCache() {
  for (const t of cache.values()) t.dispose?.();
  cache.clear();
}
