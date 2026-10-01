// Canvas-painted textures: signage, posters, product rows, magazine covers.
// Everything is drawn procedurally so the diorama ships with no image assets.
import * as THREE from 'three';

const FONT_STACK = '"Zen Maru Gothic","Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
const FONT_SANS = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = true;
  return { c, x, w, h };
}

export function toTex(c, { srgb = true, repeat = null, aniso = 8, flipY = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.flipY = flipY;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  t.needsUpdate = true;
  return t;
}

/** Draw text with manual letter-spacing (works everywhere) and optional stroke. */
export function text(x, str, { size = 32, weight = 700, color = '#fff', font = FONT_STACK, align = 'center',
  x: px = 0, y: py = 0, spacing = 0, maxWidth = 0, stroke = null, strokeWidth = 4, alpha = 1, baseline = 'middle', rotate = 0 } = {}) {
  x.save();
  x.globalAlpha *= alpha;
  x.font = `${weight} ${size}px ${font}`;
  x.textBaseline = baseline;
  x.textAlign = 'left';
  const chars = [...str];
  const widths = chars.map((ch) => x.measureText(ch).width);
  const sp = spacing * (size / 32);
  let total = widths.reduce((a, b) => a + b, 0) + sp * (chars.length - 1);
  if (maxWidth && total > maxWidth) { /* caller should shrink size */ }
  let cx = align === 'center' ? px - total / 2 : align === 'right' ? px - total : px;
  x.translate(px, py); x.rotate(rotate);
  if (align === 'center') x.translate(-total / 2, 0);
  else if (align === 'right') x.translate(-total, 0);
  let i = 0;
  for (const ch of chars) {
    if (stroke) { x.lineWidth = strokeWidth; x.strokeStyle = stroke; x.lineJoin = 'round'; x.strokeText(ch, 0, 0); }
    x.fillStyle = color; x.fillText(ch, cx, 0);
    cx += widths[i++] + sp;
  }
  x.restore();
}

export const jp = (size, weight = 700) => ({ size, weight, font: FONT_STACK });
export const sans = (size, weight = 700) => ({ size, weight, font: FONT_SANS });

// ---------------------------------------------------------------------------------------------
//  Shop signage
// ---------------------------------------------------------------------------------------------
export const BRAND = { name: 'KIRARI', kana: 'きらり ストア', mark: 'K' };

/** The big illuminated fascia sign above the shop front. */
export function signMain() {
  const { c, x, w, h } = makeCanvas(1024, 256);
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#fdfdfb'); g.addColorStop(0.55, '#ffffff'); g.addColorStop(1, '#e8e9e4');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = '#1f8f5c'; x.fillRect(0, 0, w, 26);
  x.fillStyle = '#f0703c'; x.fillRect(0, h - 26, w, 26);
  // logo mark
  x.save(); x.translate(140, h / 2);
  x.fillStyle = '#1f8f5c';
  x.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 - Math.PI / 2; const r = i % 2 ? 30 : 62; x[i ? 'lineTo' : 'moveTo'](Math.cos(a) * r, Math.sin(a) * r); }
  x.closePath(); x.fill();
  x.fillStyle = '#fff'; text(x, 'K', { ...jp(72, 900), x: 0, y: 2 });
  x.restore();
  text(x, BRAND.name, { ...jp(96, 900), x: 260, y: h / 2 - 16, align: 'left', spacing: 4, color: '#12724a' });
  text(x, BRAND.kana, { ...jp(40, 700), x: 264, y: h / 2 + 52, align: 'left', spacing: 6, color: '#3d6a58' });
  // right badge strip
  x.fillStyle = '#f0703c';
  x.beginPath(); x.roundRect(760, 44, 220, 168, 22); x.fill();
  text(x, '24', { ...jp(96, 900), x: 812, y: 116, color: '#fff' });
  text(x, 'OPEN', { ...sans(40, 700), x: 812, y: 182, color: '#ffe9dd', spacing: 3 });
  x.fillStyle = '#12724a';
  x.beginPath(); x.roundRect(250, 30, 120, 196, 16); x.fill();
  text(x, 'ATM', { ...sans(44, 900), x: 310, y: 108, color: '#fff' });
  text(x, 'たばこ', { ...jp(34, 700), x: 310, y: 170, color: '#cfe8dc' });
  return toTex(c);
}

/** Warm under-awning light box strip. */
export function signStrip() {
  const { c, x, w, h } = makeCanvas(1024, 128);
  x.fillStyle = '#fff8e8'; x.fillRect(0, 0, w, h);
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,240,200,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 4; i++) text(x, BRAND.name, { ...jp(52, 900), x: 128 + i * 256, y: h / 2, color: i % 2 ? '#f0703c' : '#1f8f5c', spacing: 3 });
  return toTex(c);
}

/** Small hanging category signs inside the shop. */
export function categorySign(label, bg = '#1f8f5c', fg = '#fff') {
  const { c, x, w, h } = makeCanvas(256, 128);
  x.fillStyle = bg; x.fillRect(0, 0, w, h);
  x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(0, 0, w, 10); x.fillRect(0, h - 10, w, 10);
  text(x, label, { ...jp(56, 700), x: w / 2, y: h / 2 + 2, color: fg, spacing: 2 });
  return toTex(c);
}

/** Vending machine: illuminated product display with rows of cans and bottles. */
export function vendingPanel(rng) {
  const { c, x, w, h } = makeCanvas(512, 1024);
  x.fillStyle = '#f2f4f2'; x.fillRect(0, 0, w, h);
  // top brand band
  x.fillStyle = '#d8323c'; x.fillRect(0, 0, w, 150);
  text(x, 'COLD DRINKS', { ...sans(44, 900), x: w / 2, y: 58, color: '#fff', spacing: 2 });
  text(x, 'つめた〜い', { ...jp(46, 700), x: w / 2, y: 112, color: '#ffe3e3' });
  // product grid
  const cols = 5, rows = 5, x0 = 24, y0 = 176, cw = (w - 48) / cols, ch = 108;
  const cols3 = ['#e04a4a', '#3f8fd6', '#f0a93c', '#4fae63', '#8a63c9', '#e0703c', '#39b3b8', '#d8c23c', '#e05a90', '#5c6fd8'];
  for (let r = 0; r < rows; r++) for (let i = 0; i < cols; i++) {
    const px = x0 + i * cw + 5, py = y0 + r * ch + 5, pw = cw - 10, ph = ch - 10;
    x.fillStyle = cols3[Math.floor(rng() * cols3.length)]; x.fillRect(px, py, pw, ph);
    x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(px + 3, py + 3, pw - 6, 12);
    x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(px, py + ph - 16, pw, 16);
    // price tag
    x.fillStyle = '#fdfdf6'; x.fillRect(px + pw * 0.32, py + ph + 1, pw * 0.36, 15);
    x.fillStyle = '#c02a2a';
    text(x, '¥130', { ...sans(15, 700), x: px + pw / 2, y: py + ph + 8, color: '#c02a2a' });
  }
  // bottom
  x.fillStyle = '#2a3038'; x.fillRect(0, h - 130, w, 130);
  text(x, 'つり銭はでません', { ...jp(26, 500), x: w / 2, y: h - 92, color: '#c8cfd8' });
  return toTex(c);
}

/** Vending machine selection buttons + coin slot strip. */
export function vendingButtons(rng) {
  const { c, x, w, h } = makeCanvas(512, 512);
  x.fillStyle = '#20252c'; x.fillRect(0, 0, w, h);
  for (let r = 0; r < 5; r++) for (let i = 0; i < 5; i++) {
    const px = 20 + i * 96, py = 20 + r * 84;
    x.fillStyle = ['#e05a5a', '#4a90d9', '#e0a83a', '#57b06a', '#9a6fd0'][(r + i) % 5];
    x.beginPath(); x.roundRect(px, py, 78, 40, 10); x.fill();
    x.fillStyle = '#fdfdf6'; text(x, '¥130', { ...sans(20, 700), x: px + 39, y: py + 21, color: '#fdfdf6' });
  }
  return toTex(c);
}

// ---------------------------------------------------------------------------------------------
//  Interior product rows — one texture fills a whole shelf
// ---------------------------------------------------------------------------------------------
const PRODUCT_COLORS = ['#e8564f', '#f0a63c', '#f2d24b', '#63b45a', '#3f9ad6', '#4a5fc0', '#a463c4', '#e0628f', '#d9d3c4', '#ef7b3a', '#7ec8c0', '#b8523a', '#2f3440', '#e8e2d2'];

/** Rows of small packages, drawn as one strip. `hue` biases the palette. */
export function shelfStrip(rng, { w = 1024, h = 128, rows = 3, kind = 'box', tint = null } = {}) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#20242c'; x.fillRect(0, 0, w, h);
  const rh = h / rows;
  for (let r = 0; r < rows; r++) {
    const y0 = r * rh, iw = rh * 0.86, ih = rh * 0.78;
    let px = 4;
    while (px < w - iw) {
      const pw = iw * (0.55 + rng() * 0.5);
      const col = tint || PRODUCT_COLORS[Math.floor(rng() * PRODUCT_COLORS.length)];
      x.fillStyle = col; x.fillRect(px, y0 + rh * 0.06, pw, ih);
      // label band
      const lx = px + pw * 0.12, lw = pw * 0.76;
      x.fillStyle = ['#fdfdf6', '#ffe9a8', '#e8f2ff'][Math.floor(rng() * 3)];
      x.fillRect(lx, y0 + rh * 0.28, lw, ih * 0.3);
      x.fillStyle = 'rgba(0,0,0,0.55)';
      const bars = 1 + Math.floor(rng() * 3);
      for (let b = 0; b < bars; b++) x.fillRect(lx + 3, y0 + rh * 0.33 + b * (ih * 0.09), lw * (0.4 + rng() * 0.5), ih * 0.05);
      if (rng() < 0.5) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(px, y0 + rh * 0.06, pw * 0.22, ih); }
      if (kind === 'cup' && rng() < 0.6) { x.fillStyle = '#f4f6f8'; x.fillRect(px + pw * 0.1, y0 + rh * 0.02, pw * 0.8, rh * 0.1); }
      // price flag
      x.fillStyle = '#fdfdf6'; x.fillRect(px + pw * 0.3, y0 + rh * 0.82, pw * 0.4, rh * 0.13);
      x.fillStyle = '#c0392b'; x.fillRect(px + pw * 0.34, y0 + rh * 0.85, pw * 0.32, rh * 0.06);
      px += pw + 3;
    }
    // shelf board
    x.fillStyle = '#e9edf2'; x.fillRect(0, y0 + rh - rh * 0.1, w, rh * 0.1);
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, y0 + rh - rh * 0.02, w, rh * 0.02);
  }
  return toTex(c);
}

/** Drinks behind the coolers' glass: tall bottles / cans in rows. */
export function drinkWall(rng, { w = 512, h = 512, tint = '#2b3a4a' } = {}) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = tint; x.fillRect(0, 0, w, h);
  const cols = 7, rows = 4;
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) for (let i = 0; i < cols; i++) {
    const col = ['#d94a4a', '#3f86d0', '#e8c33c', '#4fae63', '#e07a2c', '#8f5fc0', '#39b0b8', '#e8e2d0'][Math.floor(rng() * 8)];
    const px = i * cw + cw * 0.14, pw = cw * 0.72, py = r * ch + ch * 0.12, ph = ch * 0.76;
    x.fillStyle = col;
    if (rng() < 0.5) { x.fillRect(px, py, pw, ph); x.fillStyle = col; x.fillRect(px + pw * 0.3, py - ph * 0.14, pw * 0.4, ph * 0.16); }
    else { x.beginPath(); x.roundRect(px, py, pw, ph, pw * 0.3); x.fill(); }
    x.fillStyle = 'rgba(255,255,255,0.62)'; x.fillRect(px + 2, py + ph * 0.24, pw - 4, ph * 0.2);
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(px + 2, py + 2, pw * 0.22, ph * 0.4);
    x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect(px, py + ph - 4, pw, 4);
  }
  return toTex(c);
}

/** Bento / onigiri counter: warm-lit rows of fresh food. */
export function bentoRow(rng, { w = 1024, h = 256 } = {}) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#3a2f28'; x.fillRect(0, 0, w, h);
  const rows = 2, rh = h / rows;
  for (let r = 0; r < rows; r++) {
    let px = 6;
    while (px < w - 40) {
      const pw = 34 + rng() * 26, ph = rh * 0.72;
      const py = r * rh + rh * 0.12;
      const base = ['#f0e2c8', '#f6d7c0', '#e8dcc0', '#f2e8d8'][Math.floor(rng() * 4)];
      x.fillStyle = base; x.beginPath(); x.roundRect(px, py, pw, ph, 4); x.fill();
      x.save(); x.beginPath(); x.roundRect(px, py, pw, ph, 4); x.clip();
      // food colours visible through the lid
      const n = 3 + Math.floor(rng() * 3);
      for (let k = 0; k < n; k++) {
        x.fillStyle = ['#e0703c', '#7ab648', '#f2d24b', '#d9503c', '#a4763a', '#f0ede4'][Math.floor(rng() * 6)];
        x.beginPath(); x.ellipse(px + pw * rng(), py + ph * (0.25 + rng() * 0.5), pw * 0.3, ph * 0.22, rng() * 3, 0, 6.3); x.fill();
      }
      x.fillStyle = 'rgba(255,255,255,0.30)'; x.fillRect(px, py, pw, ph * 0.3);
      x.restore();
      x.fillStyle = '#fdfdf6'; x.fillRect(px + 4, py + ph + 3, pw - 8, 13);
      x.fillStyle = '#c0392b'; x.fillRect(px + 7, py + ph + 6, pw * 0.4, 7);
      px += pw + 4;
    }
    x.fillStyle = '#e8dcc8'; x.fillRect(0, r * rh + rh * 0.9, w, rh * 0.08);
  }
  return toTex(c);
}

/** Magazine rack front: a grid of covers. */
export function magazineWall(rng, { w = 512, h = 512 } = {}) {
  const { c, x } = makeCanvas(w, h);
  x.fillStyle = '#2a2f38'; x.fillRect(0, 0, w, h);
  const cols = 4, rows = 4, cw = w / cols, ch = h / rows;
  const titles = ['月刊 ふつう', '旅と宿', ' OFFICE', 'cycling', '半个月刊', 'のりもの', '深夜食堂', 'コミック', '週末 dictated', 'ペット', '_present', 'スポーツ'];
  for (let r = 0; r < rows; r++) for (let i = 0; i < cols; i++) {
    const px = i * cw + 4, py = r * ch + 4, pw = cw - 8, ph = ch - 8;
    const g = x.createLinearGradient(px, py, px, py + ph);
    const c1 = PRODUCT_COLORS[Math.floor(rng() * PRODUCT_COLORS.length)], c2 = PRODUCT_COLORS[Math.floor(rng() * PRODUCT_COLORS.length)];
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    x.fillStyle = g; x.fillRect(px, py, pw, ph);
    // a tiny abstract "cover photo"
    x.fillStyle = 'rgba(255,255,255,0.5)';
    x.beginPath(); x.ellipse(px + pw * 0.5, py + ph * 0.42, pw * 0.24, ph * 0.24, 0, 0, 6.3); x.fill();
    x.fillStyle = 'rgba(0,0,0,0.3)';
    x.beginPath(); x.ellipse(px + pw * 0.5, py + ph * 0.5, pw * 0.26, ph * 0.26, 0, 0, 6.3); x.fill();
    x.fillStyle = '#fdfdf6';
    text(x, titles[(r * cols + i) % titles.length], { ...jp(15, 700), x: px + pw / 2, y: py + ph - 12, color: '#fdfdf6' });
    x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(px, py, pw, 5);
  }
  return toTex(c);
}

// ---------------------------------------------------------------------------------------------
//  Posters, boards and street furniture faces
// ---------------------------------------------------------------------------------------------
export function poster(kind = 0, rng = Math.random) {
  const { c, x, w, h } = makeCanvas(512, 768);
  const sets = [
    { bg: '#f4efe4', a: '#d8452f', b: '#2a4a7a', t: 'あったか～い', s: 'おでん ゆであげました' },
    { bg: '#2a4a7a', a: '#ffd24a', b: '#f0f4f8', t: '夏日祭', s: '7/20・21  北通り広場' },
    { bg: '#f7d7e0', a: '#c0396b', b: '#5a3a6a', t: '新商品', s: 'aví ethics  さんdles 好評販売中' },
    { bg: '#eef2f6', a: '#1f8f5c', b: '#123a2a', t: '節電中', s: 'あき缶はリサイクルへ' },
    { bg: '#2b2f3a', a: '#7ad3f0', b: '#ffffff', t: '深夜の営業', s: '24時間 いつでもどうぞ' },
  ];
  const s = sets[kind % sets.length];
  x.fillStyle = s.bg; x.fillRect(0, 0, w, h);
  x.fillStyle = s.a;
  x.beginPath(); x.moveTo(0, h * 0.55); x.lineTo(w, h * 0.35); x.lineTo(w, h * 0.62); x.lineTo(0, h * 0.82); x.closePath(); x.fill();
  x.fillStyle = s.b; x.globalAlpha = 0.9;
  x.beginPath(); x.arc(w * 0.68, h * 0.3, w * 0.2, 0, 6.3); x.fill();
  x.globalAlpha = 1;
  text(x, s.t, { ...jp(76, 900), x: w / 2, y: h * 0.62, color: s.b, spacing: 3 });
  text(x, s.s, { ...jp(30, 500), x: w / 2, y: h * 0.72, color: s.b });
  x.strokeStyle = s.b; x.lineWidth = 6; x.strokeRect(16, 16, w - 32, h - 32);
  // torn edge + tape
  x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(0, h - 30, w, 30);
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(w * 0.4, 4, w * 0.2, 34);
  return toTex(c);
}

/** The little community notice board by the corner. */
export function noticeBoard(rng) {
  const { c, x, w, h } = makeCanvas(512, 640);
  x.fillStyle = '#e9e4d6'; x.fillRect(0, 0, w, h);
  text(x, 'おしらせ', { ...jp(52, 900), x: w / 2, y: 56, color: '#3a3346', spacing: 4 });
  x.fillStyle = '#3a3346'; x.fillRect(40, 84, w - 80, 4);
  const notes = [
    { bg: '#fdfdf6', t: '町内会清掃', s: '每月 第2土曜 8:00〜', c: '#2a4a7a' },
    { bg: '#fff6d8', t: '資源ごみ回収', s: '火・木  朝6時まで', c: '#7a5a20' },
    { bg: '#e4f2ff', t: '駐輪場の整理', s: '放置自転車は撤去します', c: '#22506e' },
    { bg: '#ffe9ec', t: '夜间门市', s: '21:00〜 朝6:00', c: '#8a2f42' },
  ];
  let y = 110;
  for (const n of notes) {
    x.save(); x.translate(46, y); x.rotate((rng() - 0.5) * 0.05);
    x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(4, 6, w - 92, 116);
    x.fillStyle = n.bg; x.fillRect(0, 0, w - 92, 116);
    x.fillStyle = n.c; text(x, n.t, { ...jp(34, 700), x: 20, y: 38, align: 'left', color: n.c });
    text(x, n.s, { ...jp(22, 500), x: 20, y: 82, align: 'left', color: '#4a4458' });
    x.restore();
    y += 128;
  }
  return toTex(c);
}

/** Street-name / guide sign, arrow style. */
export function guideSign(arrow = 'left', label = '北通り', sub = 'Kita-dori') {
  const { c, x, w, h } = makeCanvas(512, 256);
  x.fillStyle = '#1c3f6b'; x.beginPath(); x.roundRect(0, 0, w, h, 26); x.fill();
  x.strokeStyle = '#f2f6fa'; x.lineWidth = 8; x.strokeRect(14, 14, w - 28, h - 28);
  text(x, label, { ...jp(66, 700), x: w * 0.58, y: h * 0.38, color: '#f4f8fc', spacing: 4 });
  text(x, sub, { ...sans(28, 500), x: w * 0.58, y: h * 0.68, color: '#a9c6e2' });
  x.fillStyle = '#f2f6fa';
  const ax = w * 0.2, ay = h * 0.5, s = 52;
  x.beginPath();
  if (arrow === 'left') { x.moveTo(ax - s, ay); x.lineTo(ax - s * 0.2, ay - s); x.lineTo(ax - s * 0.2, ay - s * 0.4); x.lineTo(ax + s, ay - s * 0.4); x.lineTo(ax + s, ay + s * 0.4); x.lineTo(ax - s * 0.2, ay + s * 0.4); x.lineTo(ax - s * 0.2, ay + s); }
  else { x.moveTo(ax + s, ay); x.lineTo(ax + s * 0.2, ay - s); x.lineTo(ax + s * 0.2, ay - s * 0.4); x.lineTo(ax - s, ay - s * 0.4); x.lineTo(ax - s, ay + s * 0.4); x.lineTo(ax + s * 0.2, ay + s * 0.4); x.lineTo(ax + s * 0.2, ay + s); }
  x.closePath(); x.fill();
  return toTex(c);
}

/** Round "no parking / 駐輪禁止" plate. */
export function roundSign(kind = 'no') {
  const { c, x, w } = makeCanvas(256, 256);
  x.clearRect(0, 0, w, w);
  x.fillStyle = '#f4f6f8'; x.beginPath(); x.arc(128, 128, 116, 0, 6.3); x.fill();
  x.strokeStyle = '#c0392b'; x.lineWidth = 18; x.beginPath(); x.arc(128, 128, 104, 0, 6.3); x.stroke();
  if (kind === 'no') { x.strokeStyle = '#c0392b'; x.lineWidth = 20; x.beginPath(); x.moveTo(48, 48); x.lineTo(208, 208); x.stroke(); }
  else { text(x, '駐輪', { ...jp(44, 900), x: 128, y: 108, color: '#22303f' }); text(x, '禁止', { ...jp(44, 900), x: 128, y: 160, color: '#22303f' }); }
  return toTex(c);
}

/** Floor guide decal inside the shop (arrows / foot marks / " please "). */
export function floorGuide(kind = 'arrow') {
  const { c, x, w, h } = makeCanvas(256, 256);
  x.clearRect(0, 0, w, h);
  if (kind === 'arrow') {
    x.fillStyle = '#f2c230';
    x.beginPath(); x.moveTo(60, 200); x.lineTo(196, 200); x.lineTo(196, 150); x.lineTo(238, 176); x.lineTo(128, 62); x.lineTo(18, 176); x.lineTo(60, 150); x.closePath(); x.fill();
  } else if (kind === 'feet') {
    x.fillStyle = '#f2c230';
    for (const [dx, dy, sc] of [[0, -30, 1], [0, 34, 1.12]]) {
      x.beginPath(); x.ellipse(128 + dx, 128 + dy, 22 * sc, 34 * sc, 0, 0, 6.3); x.fill();
    }
  } else {
    text(x, 'ごゆっくり', { ...jp(52, 700), x: 128, y: 128, color: '#f2c230' });
  }
  return toTex(c);
}

/** Awning / shop-window sticker strip. */
export function windowStickers() {
  const { c, x, w, h } = makeCanvas(1024, 256);
  x.clearRect(0, 0, w, h);
  const items = [['ATM', '#1f8f5c'], ['たばこ', '#c0392b'], ['酒', '#2a4a7a'], ['コピー', '#8a5a2a'], ['快递', '#e07a2c'], ['おでん', '#5a8a3a']];
  items.forEach(([t, col], i) => {
    const px = 20 + i * 168, w2 = 150;
    x.fillStyle = col; x.beginPath(); x.roundRect(px, 40, w2, 96, 16); x.fill();
    x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 5; x.beginPath(); x.roundRect(px + 8, 48, w2 - 16, 80, 12); x.stroke();
    text(x, t, { ...jp(46, 700), x: px + w2 / 2, y: 92, color: '#fff', spacing: 1 });
  });
  return toTex(c);
}

/** Oden / hot-case menu board. */
export function menuBoard() {
  const { c, x, w, h } = makeCanvas(512, 384);
  x.fillStyle = '#2a1f1a'; x.fillRect(0, 0, w, h);
  x.fillStyle = '#f6e9c8'; x.fillRect(0, 0, w, 74);
  text(x, 'おでん', { ...jp(52, 900), x: 40, y: 38, align: 'left', color: '#7a3a1a', spacing: 4 });
  text(x, 'あたたかい', { ...jp(24, 500), x: 470, y: 40, align: 'right', color: '#a05a2a' });
  const items = [['大根', '120'], ['だいこん', '120'], ['たまご', '130'], ['ちくわ', '140'], ['牛筋', '160'], ['厚揚げ', '150'], ['pring onion', '90']];
  items.forEach(([n, p], i) => {
    const y = 104 + i * 40;
    text(x, n, { ...jp(30, 500), x: 36, y, align: 'left', color: '#f2e6cf' });
    x.strokeStyle = 'rgba(242,230,207,0.25)'; x.lineWidth = 1; x.setLineDash([4, 6]);
    x.beginPath(); x.moveTo(36, y + 12); x.lineTo(w - 90, y + 12); x.stroke(); x.setLineDash([]);
    text(x, p, { ...sans(26, 700), x: w - 30, y, align: 'right', color: '#ffd24a' });
  });
  return toTex(c);
}

/** Vending-machine-adjacent poster + a "fridge" brand panel. */
export function brandPanel() {
  const { c, x, w, h } = makeCanvas(512, 128);
  x.fillStyle = '#f2f6f8'; x.fillRect(0, 0, w, h);
  x.fillStyle = '#1f8f5c'; x.fillRect(0, 0, w, 22); x.fillRect(0, h - 22, w, 22);
  text(x, 'KIRARI MART', { ...jp(48, 900), x: w / 2, y: h / 2 - 2, color: '#12724a', spacing: 5 });
  return toTex(c);
}

/** Small vertical neon sign for the side of the building / alley. */
export function neonSign(text1, sub = '', color = '#ff5aa8', color2 = '#7ad3ff') {
  const { c, x, w, h } = makeCanvas(256, 1024);
  x.clearRect(0, 0, w, h);
  x.fillStyle = 'rgba(8,10,18,0.92)';
  x.beginPath(); x.roundRect(10, 10, w - 20, h - 20, 18); x.fill();
  x.strokeStyle = color; x.lineWidth = 6;
  x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 14); x.stroke();
  x.shadowColor = color; x.shadowBlur = 26;
  const chars = [...text1];
  const size = Math.min(150, (h - 200) / Math.max(1, chars.length));
  chars.forEach((ch, i) => {
    x.fillStyle = i % 2 ? color2 : color;
    text(x, ch, { ...jp(size, 700), x: w / 2, y: 150 + i * (size + 22), color: i % 2 ? color2 : color });
  });
  x.shadowBlur = 0;
  if (sub) { x.fillStyle = color2; text(x, sub, { ...jp(44, 700), x: w / 2, y: h - 90, color: color2, spacing: 4 }); }
  // tube highlight
  x.fillStyle = 'rgba(255,255,255,0.20)'; x.fillRect(30, 30, 10, h - 60);
  return toTex(c);
}

/** Illuminated "OPEN" / 営業中 sign. */
export function openSign(color = '#ff4a4a') {
  const { c, x, w, h } = makeCanvas(512, 256);
  x.fillStyle = '#12131c'; x.fillRect(0, 0, w, h);
  x.strokeStyle = color; x.lineWidth = 7; x.strokeRect(12, 12, w - 24, h - 24);
  x.shadowColor = color; x.shadowBlur = 22;
  text(x, 'OPEN', { ...sans(96, 900), x: w / 2, y: 104, color: color, spacing: 8 });
  x.shadowBlur = 0;
  text(x, '営業中', { ...jp(46, 700), x: w / 2, y: 186, color: '#ffe9b0', spacing: 6 });
  return toTex(c);
}

/** Small name plate engraved on the diorama base. */
export function basePlate() {
  const { c, x, w, h } = makeCanvas(1024, 128);
  x.fillStyle = '#2b3040'; x.fillRect(0, 0, w, h);
  const g = x.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255,255,255,0.12)'); g.addColorStop(0.5, 'rgba(255,255,255,0.02)'); g.addColorStop(1, 'rgba(0,0,0,0.2)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  text(x, '雨夜のコンビニ街角', { ...jp(46, 700), x: w / 2, y: 46, color: '#cfd8ea', spacing: 8 });
  text(x, 'RAINY  KONBINI  CORNER   ·   1:120', { ...sans(24, 500), x: w / 2, y: 88, color: '#7d8aa6', spacing: 6 });
  return toTex(c);
}
