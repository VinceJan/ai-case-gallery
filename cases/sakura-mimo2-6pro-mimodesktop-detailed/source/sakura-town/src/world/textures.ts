/**
 * Procedural canvas textures: signs, storefronts, road markings, posters.
 * All text is drawn with system fonts; no external image assets.
 */
import * as THREE from 'three';

function makeCanvas(w: number, h: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas 2d unavailable');
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function signTexture(
  text: string,
  bg: string,
  fg: string,
  opts?: { sub?: string; w?: number; h?: number; vertical?: boolean; border?: string },
): THREE.CanvasTexture {
  const w = opts?.w ?? 256;
  const h = opts?.h ?? 96;
  const { canvas, ctx } = makeCanvas(opts?.vertical ? h : w, opts?.vertical ? w : h);
  const cw = canvas.width;
  const ch = canvas.height;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cw, ch);
  if (opts?.border) {
    ctx.strokeStyle = opts.border;
    ctx.lineWidth = 6;
    ctx.strokeRect(8, 8, cw - 16, ch - 16);
  }
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (opts?.vertical) {
    const chars = text.split('');
    const step = (ch - 40) / Math.max(chars.length, 1);
    ctx.font = `bold ${Math.floor(step * 0.85)}px sans-serif`;
    chars.forEach((c, i) => {
      ctx.fillText(c, cw / 2, 20 + step * (i + 0.5));
    });
  } else {
    const fontSize = opts?.sub ? Math.floor(ch * 0.42) : Math.floor(ch * 0.52);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillText(text, cw / 2, opts?.sub ? ch * 0.38 : ch * 0.52);
    if (opts?.sub) {
      ctx.font = `${Math.floor(ch * 0.22)}px sans-serif`;
      ctx.fillText(opts.sub, cw / 2, ch * 0.72);
    }
  }
  return toTexture(canvas);
}

export function windowTexture(lit: boolean, tint = '#a8d4e8'): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(64, 64);
  ctx.fillStyle = lit ? '#ffd88a' : tint;
  ctx.fillRect(0, 0, 64, 64);
  // frame
  ctx.strokeStyle = lit ? '#c8a060' : '#6a7880';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 60, 60);
  ctx.beginPath();
  ctx.moveTo(32, 4); ctx.lineTo(32, 60);
  ctx.moveTo(4, 32); ctx.lineTo(60, 32);
  ctx.stroke();
  if (lit) {
    const g = ctx.createRadialGradient(32, 32, 4, 32, 32, 36);
    g.addColorStop(0, 'rgba(255,230,160,0.5)');
    g.addColorStop(1, 'rgba(255,200,100,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }
  return toTexture(canvas);
}

export function roadTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 128);
  ctx.fillStyle = '#5c6168';
  ctx.fillRect(0, 0, 128, 128);
  // asphalt noise
  for (let i = 0; i < 400; i++) {
    const x = (i * 47) % 128;
    const y = (i * 89) % 128;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(x, y, 2, 2);
  }
  const tex = toTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function grassTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 128);
  ctx.fillStyle = '#7cb06a';
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 200; i++) {
    const x = (i * 31) % 128;
    const y = (i * 53) % 128;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(40,80,30,0.12)';
    ctx.fillRect(x, y, 3, 3);
  }
  const tex = toTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function crosswalkTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(64, 64);
  ctx.fillStyle = '#5c6168';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#ddd8cc';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(4 + i * 16, 8, 10, 48);
  }
  return toTexture(canvas);
}

export function posterTexture(kind: 'festival' | 'lost' | 'menu' | 'notice'): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(96, 128);
  ctx.fillStyle = '#f8f4e8';
  ctx.fillRect(0, 0, 96, 128);
  ctx.strokeStyle = '#2a2826';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 88, 120);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c05048';
  if (kind === 'festival') {
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('夏祭', 48, 40);
    ctx.fillStyle = '#2a2826';
    ctx.font = '12px sans-serif';
    ctx.fillText('駅前広場', 48, 70);
    ctx.fillText('18:00〜', 48, 95);
  } else if (kind === 'lost') {
    ctx.fillStyle = '#2a2826';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('落とし物', 48, 40);
    ctx.font = '11px sans-serif';
    ctx.fillText('黒いかばん', 48, 70);
    ctx.fillText('心当たりの方', 48, 95);
    ctx.fillText('交番へ', 48, 115);
  } else if (kind === 'menu') {
    ctx.fillStyle = '#2a2826';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('本日', 48, 36);
    ctx.fillText('おすすめ', 48, 56);
    ctx.font = '11px sans-serif';
    ctx.fillText('カツ丼 ¥650', 48, 86);
    ctx.fillText('味噌汁 ¥120', 48, 108);
  } else {
    ctx.fillStyle = '#2a2826';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('お知らせ', 48, 40);
    ctx.font = '10px sans-serif';
    ctx.fillText('水曜日 ごみの日', 48, 72);
    ctx.fillText('駐車場有料化', 48, 96);
    ctx.fillText('駅前工事', 48, 118);
  }
  return toTexture(canvas);
}

export function vendingTexture(brandColor = '#c05048'): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 256);
  ctx.fillStyle = brandColor;
  ctx.fillRect(0, 0, 128, 256);
  // product window
  ctx.fillStyle = '#e8f0f8';
  ctx.fillRect(16, 20, 96, 80);
  const colors = ['#e85050', '#50a0e0', '#e0c040', '#50c070', '#c070e0', '#e08040'];
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(20 + (i % 3) * 32, 28 + Math.floor(i / 3) * 36, 24, 28);
  }
  // payment area
  ctx.fillStyle = '#2a2826';
  ctx.fillRect(16, 120, 96, 40);
  ctx.fillStyle = '#80e0a0';
  ctx.fillRect(24, 128, 48, 12);
  // pickup
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(16, 180, 96, 50);
  ctx.fillStyle = '#f0f0f0';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('つめかえ口', 64, 160);
  return toTexture(canvas);
}

export function platformTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 128);
  ctx.fillStyle = '#c8c0b4';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#e8c840';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 20); ctx.lineTo(128, 20);
  ctx.stroke();
  ctx.fillStyle = '#a89880';
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(i * 16, 40, 2, 88);
  }
  return toTexture(canvas);
}

export function schoolYardTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = '#c4a070';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 100; i++) {
    const x = (i * 37) % 256;
    const y = (i * 61) % 256;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(120,80,40,0.15)';
    ctx.fillRect(x, y, 4, 4);
  }
  // white lines
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, 176, 176);
  ctx.beginPath();
  ctx.moveTo(128, 40); ctx.lineTo(128, 216);
  ctx.stroke();
  return toTexture(canvas);
}

export function bulletinTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 96);
  ctx.fillStyle = '#3a5080';
  ctx.fillRect(0, 0, 128, 96);
  ctx.fillStyle = '#f8f4e8';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('町内掲示', 64, 36);
  ctx.font = '11px sans-serif';
  ctx.fillText('桜町だより', 64, 64);
  return toTexture(canvas);
}
