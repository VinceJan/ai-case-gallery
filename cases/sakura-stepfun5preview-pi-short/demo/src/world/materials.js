import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// 共享材质与程序化贴图（cel/toon 风格）
import * as THREE from 'three';
import { PALETTE } from './palette.js';
import { makeRng, makeNoise2D, clamp, lerp } from '../core/utils.js';

let _gradient = null;
export function toonGradient() {
  if (_gradient) return _gradient;
  const colors = new Uint8Array(4);
  colors[0] = 110; colors[1] = 165; colors[2] = 225; colors[3] = 255;
  const tex = new THREE.DataTexture(colors, colors.length, 1, THREE.RedFormat);
  tex.needsUpdate = true;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  _gradient = tex;
  return tex;
}

// ---------- 画布贴图工具 ----------
function canvasTex(size, draw, { repeat = [1, 1], srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function noiseFill(ctx, size, base, amount, seed = 1) {
  const rng = makeRng(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  const img = ctx.getImageData(0, 0, size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rng() - 0.5) * amount;
    d[i] = clamp(d[i] + n, 0, 255);
    d[i + 1] = clamp(d[i + 1] + n, 0, 255);
    d[i + 2] = clamp(d[i + 2] + n, 0, 255);
  }
  ctx.putImageData(img, 0, 0);
}

const hex = (c) => '#' + c.toString(16).padStart(6, '0');

export const TEX = {};
export function buildTextures() {
  // 灰泥墙
  TEX.plaster = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#efe6d8', 14, 3);
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 2 ? '#d8cfc0' : '#fff8ee';
      ctx.fillRect(0, (i / 40) * s, s, 3);
    }
  }, { repeat: [1, 1] });
  // 木板墙（横板）
  TEX.wood = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#8a5a3b', 10, 7);
    ctx.globalAlpha = 0.5;
    for (let y = 0; y < s; y += 16) {
      ctx.strokeStyle = '#5d4033'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = '#c49a78';
      ctx.beginPath(); ctx.moveTo(0, y + 2); ctx.lineTo(s, y + 2); ctx.stroke();
      ctx.globalAlpha = 0.5;
    }
  });
  // 榻榻米
  TEX.tatami = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#c8bd84', 10, 11);
    ctx.strokeStyle = '#a89c62'; ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, s - 8, s - 8);
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo(8, 8 + i * 4); ctx.lineTo(s - 8, 8 + i * 4); ctx.stroke();
    }
  });
  // 沥青
  TEX.asphalt = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#55565c', 18, 5);
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = '#3c3d42';
      ctx.fillRect(Math.random() * s, Math.random() * s, 3, 2);
    }
  }, { repeat: [4, 4] });
  // 人行道
  TEX.sidewalk = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#bdb8ac', 10, 9);
    ctx.strokeStyle = '#a39e92'; ctx.lineWidth = 2;
    for (let i = 0; i <= s; i += 32) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke();
    }
  }, { repeat: [2, 2] });
  // 草地
  TEX.grass = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#86a860', 16, 13);
    const rng = makeRng(21);
    for (let i = 0; i < 220; i++) {
      ctx.strokeStyle = rng() > 0.5 ? '#76965088' : '#9abc7288';
      ctx.lineWidth = 1;
      const x = rng() * s, y = rng() * s;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rng() * 3 - 1.5, y - 2 - rng() * 3); ctx.stroke();
    }
  }, { repeat: [24, 24] });
  // 屋瓦
  TEX.roofTile = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#4a5568', 8, 17);
    ctx.strokeStyle = '#333c4e'; ctx.lineWidth = 3;
    for (let y = 6; y < s; y += 14) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke();
    }
    ctx.globalAlpha = 0.25; ctx.strokeStyle = '#6d7b94';
    for (let y = 8; y < s; y += 14) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke();
    }
  }, { repeat: [3, 2] });
  // 水面
  TEX.water = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#6fa8b8', 8, 23);
    ctx.globalAlpha = 0.3; ctx.strokeStyle = '#bfe0e8';
    for (let i = 0; i < 12; i++) {
      const y = (i / 12) * s + Math.random() * 6;
      ctx.beginPath(); ctx.moveTo(0, y);
      for (let x = 0; x <= s; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.2 + i) * 2);
      ctx.stroke();
    }
  }, { repeat: [6, 6] });
  // 水田
  TEX.rice = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#9db86a', 10, 29);
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = '#6f9150';
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 6);
    }
  }, { repeat: [3, 3] });
  // 石阶/石砖
  TEX.stone = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#a8a49c', 12, 31);
    ctx.strokeStyle = '#84817a'; ctx.lineWidth = 2;
    for (let i = 0; i <= s; i += 42) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke();
    }
  }, { repeat: [2, 2] });
  // 和纸/暖帘
  TEX.noren = canvasTex(128, (ctx, s) => {
    noiseFill(ctx, s, '#e8ddc8', 8, 37);
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < 24; i++) {
      ctx.fillStyle = '#b0a48c';
      ctx.fillRect(0, (i / 24) * s, s, 1);
    }
  });
  // 云（径向柔和）
  TEX.cloud = canvasTex(128, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });
  // 樱花花瓣（小四瓣形）
  TEX.petal = canvasTex(64, (ctx, s) => {
    ctx.clearRect(0, 0, s, s);
    ctx.fillStyle = '#ffc9d8';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      ctx.moveTo(s / 2, s / 2);
      ctx.ellipse(s / 2 + Math.cos(a) * s * 0.22, s / 2 + Math.sin(a) * s * 0.22,
        s * 0.2, s * 0.12, a, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.fillStyle = '#ff9eb8';
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s * 0.07, 0, Math.PI * 2); ctx.fill();
  });
  // 地面软阴影圆点
  TEX.shadow = canvasTex(64, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(0,0,0,0.32)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  });
  // 星星
  TEX.star = canvasTex(32, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  });
  // 对话框气泡
  TEX.bubble = canvasTex(128, (ctx, s) => {
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath();
    const r = 26;
    ctx.roundRect(8, 8, s - 16, s - 24, r);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(s / 2 - 10, s - 18); ctx.lineTo(s / 2, s - 2); ctx.lineTo(s / 2 + 10, s - 18);
    ctx.fill();
  });
}

// 招牌贴图（日文/中文文字）
export function makeSignTex(text, { w = 512, h = 128, bg = '#3a2f2a', fg = '#f7e9c9', font = 'bold 56px "Hiragino Sans","Microsoft YaHei",sans-serif' } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = fg; ctx.lineWidth = 6; ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.fillStyle = fg;
  ctx.font = font;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ---------- 材质库 ----------
export const MAT = {};
export function buildMaterials() {
  const g = toonGradient();
  const toon = (color, opts = {}) => new THREE.MeshToonMaterial({ color, gradientMap: g, ...opts });

  MAT.plaster = toon(0xffffff, { map: TEX.plaster });
  MAT.wood = toon(0xffffff, { map: TEX.wood });
  MAT.woodPlain = toon(PALETTE.woodDark);
  MAT.roofTile = toon(0xffffff, { map: TEX.roofTile });
  MAT.roofBlue = toon(PALETTE.roofBlue);
  MAT.door = toon(PALETTE.door[0]);
  MAT.brick = toon(PALETTE.brick);
  MAT.shopFront = toon(PALETTE.shopFront);
  MAT.tatami = toon(0xffffff, { map: TEX.tatami });
  MAT.stone = toon(0xffffff, { map: TEX.stone });
  MAT.stonePlain = toon(PALETTE.stone);
  MAT.stoneDark = toon(PALETTE.stoneDark);
  MAT.asphalt = toon(0xffffff, { map: TEX.asphalt });
  MAT.sidewalk = toon(0xffffff, { map: TEX.sidewalk });
  MAT.grass = toon(0xffffff, { map: TEX.grass });
  MAT.leaf = toon(PALETTE.leafGreen);
  MAT.maple = toon(PALETTE.mapleGreen);
  MAT.sakura = toon(PALETTE.sakura);
  MAT.sakuraDeep = toon(PALETTE.sakuraDeep);
  MAT.sakuraTrunk = toon(PALETTE.sakuraTrunk);
  MAT.water = new THREE.MeshToonMaterial({ color: 0xffffff, map: TEX.water, transparent: true, opacity: 0.92, gradientMap: g });
  MAT.rice = toon(0xffffff, { map: TEX.rice });
  MAT.soil = toon(PALETTE.soil);
  MAT.torii = toon(PALETTE.torii);
  MAT.toriiDark = toon(PALETTE.toriiDark);
  MAT.lantern = toon(PALETTE.lantern);
  MAT.gold = toon(PALETTE.gold);
  MAT.noren = toon(0xffffff, { map: TEX.noren, side: THREE.DoubleSide });
  MAT.rail = toon(PALETTE.rail);
  MAT.sleeper = toon(PALETTE.sleeper);
  MAT.pole = toon(PALETTE.pole);
  MAT.vending = toon(PALETTE.vending);
  MAT.fabric = toon(PALETTE.fabric[0]);
  MAT.awning = toon(PALETTE.clothAwning[0]);
  MAT.black = toon(0x2a2730);
  MAT.white = toon(0xf2ede4);
  MAT.dark = toon(0x3a3640);

  // 玻璃（橱窗）
  MAT.glass = new THREE.MeshToonMaterial({ color: 0xbfd9e0, transparent: true, opacity: 0.45, gradientMap: g, side: THREE.DoubleSide });

  // 夜晚发光窗户（可开关）
  MAT.windowLit = new THREE.MeshBasicMaterial({ color: 0xffd98a });
  MAT.windowDark = toon(PALETTE.window);
  MAT.lampOn = new THREE.MeshBasicMaterial({ color: 0xffe2ae });
  MAT.lampOff = toon(0x8a8478);
  MAT.signDark = toon(0x4a3f3a);
  MAT.railTie = toon(PALETTE.sleeper);
  MAT.metal = toon(0x9aa0a8);
  MAT.trainBody = toon(0xe8e4da);
  MAT.trainStripe = toon(0xc94f6d);
  MAT.carBody = toon(0x8a97a8);
  MAT.tire = toon(0x2c2c30);
  MAT.pavementMark = toon(0xe8e4da);
  MAT.inkBlack = toon(0x24222a);
  MAT.cheek = toon(0xf2a0a8);
  MAT.mouth = toon(0x8a4a4a);
  MAT.eye = toon(0x2c2420);
  MAT.whitePlain = toon(0xffffff);
}

// ---------- 静态几何合批器 ----------
// 收集静态部件的 (geometry, matrix, materialKey)，最后按材质合并，降低 draw call
export class StaticBatcher {
  constructor() {
    this.buckets = new Map(); // key -> [{geo, matrix}]
  }
  add(key, geo, matrix) {
    if (!this.buckets.has(key)) this.buckets.set(key, []);
    this.buckets.get(key).push({ geo, matrix });
  }
// 生成合并网格组
  build(parent, { shadow = true } = {}) {
    const group = new THREE.Group();
    group.name = 'static-batch';
    for (const [key, list] of this.buckets) {
      const mat = MAT[key];
      if (!mat) { console.warn('missing material', key); continue; }
      // 按 material 分组内可合并：直接合并全部（同材质同 map 时可合并 uv 重复没问题）
      const geos = [];
      for (const it of list) {
        let g = it.geo.clone();
        g.applyMatrix4(it.matrix);
        // 统一为非索引 + 仅保留 position/normal/uv，保证可合并
        if (g.index) g = g.toNonIndexed();
        for (const attr of Object.keys(g.attributes)) {
          if (!['position', 'normal', 'uv'].includes(attr)) g.deleteAttribute(attr);
        }
        if (!g.attributes.uv) {
          const n = g.attributes.position.count;
          g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
        }
        if (!g.attributes.normal) g.computeVertexNormals();
        geos.push(g);
      }
      let merged;
      try {
        merged = mergeGeometries(geos, false);
      } catch (e) {
        console.warn('merge failed for', key, e);
        merged = null;
      }
      geos.forEach((g) => g.dispose());
      if (!merged) continue;
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = shadow;
      mesh.receiveShadow = true;
      mesh.name = 'batch-' + key;
      group.add(mesh);
    }
    parent.add(group);
    return group;
  }
}

// 需要时动态导入合并工具
