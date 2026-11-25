import * as THREE from 'three';

let sharedGradient3 = null;
let sharedGradient4 = null;

function createGradientTexture(steps) {
  const data = new Uint8Array(steps.length * 4);
  for (let i = 0; i < steps.length; i++) {
    const v = steps[i];
    data[i * 4 + 0] = v;
    data[i * 4 + 1] = v;
    data[i * 4 + 2] = v;
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export function getToonGradient(fourStep = false) {
  if (fourStep) {
    if (!sharedGradient4) sharedGradient4 = createGradientTexture([105, 165, 215, 255]);
    return sharedGradient4;
  }
  if (!sharedGradient3) sharedGradient3 = createGradientTexture([118, 188, 255]);
  return sharedGradient3;
}

export function toonMat(color, opts = {}) {
  return new THREE.MeshToonMaterial({
    color,
    gradientMap: getToonGradient(opts.fourStep ?? false),
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
    emissive: opts.emissive ? new THREE.Color(opts.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    map: opts.map ?? null,
    depthWrite: opts.depthWrite ?? true,
  });
}

const outlineMat = new THREE.LineBasicMaterial({
  color: 0x3b3440,
  transparent: true,
  opacity: 0.28,
});

export function addSubtleEdges(mesh, threshold = 28) {
  const edges = new THREE.EdgesGeometry(mesh.geometry, threshold);
  const line = new THREE.LineSegments(edges, outlineMat);
  mesh.add(line);
  return line;
}

/**
 * Create a crisp procedural Japanese sign texture on an HTML canvas.
 */
export function createSignTexture({
  width = 512,
  height = 160,
  bg = '#fcf8f2',
  border = '#394b6b',
  text = '桜駅',
  subtext = '',
  textColor = '#2c2a35',
  accentColor = '#e98aa3',
  stripe = false,
  vertical = false,
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  if (stripe) {
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, width, height * 0.2);
    ctx.fillStyle = '#4e9f76';
    ctx.fillRect(0, height * 0.84, width, height * 0.16);
  }

  ctx.strokeStyle = border;
  ctx.lineWidth = Math.max(4, Math.min(width, height) * 0.04);
  ctx.strokeRect(6, 6, width - 12, height - 12);

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (vertical) {
    const chars = [...text];
    const fontSize = Math.floor(Math.min(width * 0.62, (height - 28) / Math.max(1, chars.length)));
    ctx.font = `800 ${fontSize}px "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Microsoft YaHei", sans-serif`;
    const step = (height - 28) / chars.length;
    chars.forEach((ch, idx) => {
      ctx.fillText(ch, width / 2, 18 + step * (idx + 0.5));
    });
  } else {
    const mainSize = subtext ? Math.floor(height * 0.42) : Math.floor(height * 0.52);
    ctx.font = `800 ${mainSize}px "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Microsoft YaHei", sans-serif`;
    ctx.fillText(text, width / 2, subtext ? height * 0.42 : height * 0.52);

    if (subtext) {
      ctx.fillStyle = accentColor;
      ctx.font = `700 ${Math.floor(height * 0.18)}px "Hiragino Kaku Gothic ProN", "Yu Gothic UI", sans-serif`;
      ctx.fillText(subtext, width / 2, height * 0.76);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function createRoadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#686b75';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle asphalt grain
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 92 + Math.floor(Math.random() * 26);
    ctx.fillStyle = `rgb(${v},${v + 2},${v + 8})`;
    ctx.fillRect(x, y, 2, 2);
  }
  // White side shoulder lines
  ctx.fillStyle = 'rgba(248, 246, 240, 0.85)';
  ctx.fillRect(14, 0, 8, 256);
  ctx.fillRect(234, 0, 8, 256);

  // Center dashed line
  ctx.fillStyle = 'rgba(246, 240, 224, 0.78)';
  ctx.fillRect(125, 24, 6, 92);
  ctx.fillRect(125, 152, 6, 80);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createTatamiTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d3cf99';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#c2be85';
  ctx.lineWidth = 1;
  for (let y = 0; y < 256; y += 4) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }
  ctx.strokeStyle = '#475c4a';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 246, 246);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createTileFloorTexture(c1 = '#f4efe6', c2 = '#e8dfd1') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const s = 64;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? c1 : c2;
      ctx.fillRect(x * s, y * s, s, s);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createVendingFrontTexture(accent = '#d84a4a') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8f5ef';
  ctx.fillRect(0, 0, 256, 384);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 256, 46);
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 22px "Yu Gothic UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('つめたい · あたたかい', 128, 30);

  // Display window
  ctx.fillStyle = '#eef6fb';
  ctx.fillRect(16, 58, 224, 178);
  ctx.strokeStyle = '#b9c6d4';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 58, 224, 178);

  const canColors = ['#3fa66b', '#e06666', '#4a90d9', '#d99a4a', '#7c5338', '#e98aa3'];
  for (let row = 0; row < 3; row++) {
    const ry = 76 + row * 56;
    ctx.fillStyle = '#cbd5df';
    ctx.fillRect(20, ry + 36, 216, 6);
    for (let col = 0; col < 6; col++) {
      ctx.fillStyle = canColors[(row * 2 + col) % canColors.length];
      ctx.fillRect(28 + col * 34, ry + 6, 22, 28);
      // Price tag pill
      ctx.fillStyle = row === 2 ? '#d9534f' : '#2e7bb5';
      ctx.fillRect(28 + col * 34, ry + 36, 22, 7);
    }
  }

  // Coin slot & pickup tray
  ctx.fillStyle = '#3c404b';
  ctx.fillRect(184, 252, 46, 32);
  ctx.fillStyle = '#292c35';
  ctx.fillRect(24, 298, 208, 62);
  ctx.fillStyle = '#4e5463';
  ctx.fillRect(32, 306, 192, 16);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createWindowTexture(lit = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = lit ? '#ffdf9e' : '#7b99b5';
  ctx.fillRect(0, 0, 128, 128);
  // Subtle diagonal reflection
  if (!lit) {
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.beginPath();
    ctx.moveTo(14, 14);
    ctx.lineTo(54, 14);
    ctx.lineTo(14, 78);
    ctx.closePath();
    ctx.fill();
  }
  ctx.strokeStyle = '#534a45';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 120, 120);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(64, 0);
  ctx.lineTo(64, 128);
  ctx.moveTo(0, 64);
  ctx.lineTo(128, 64);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
