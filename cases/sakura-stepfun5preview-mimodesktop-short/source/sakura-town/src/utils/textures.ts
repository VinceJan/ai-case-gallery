import * as THREE from 'three';

/** 3 阶灰度梯度，让 MeshToonMaterial 呈现动画背景式的硬色阶。 */
export function createToonGradient(): THREE.DataTexture {
  const steps = new Uint8Array([90, 160, 220, 255]);
  const texture = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

/** 草地纹理：噪点 + 零星小花。 */
export function createGroundTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create ground texture context.');

  ctx.fillStyle = '#a4c97e';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 900; i += 1) {
    const x = (i * 97.31) % size;
    const y = (i * 57.17) % size;
    const shade = 0.85 + ((i * 37) % 30) / 100;
    ctx.fillStyle = `rgba(${Math.floor(120 * shade)}, ${Math.floor(180 * shade)}, ${Math.floor(90 * shade)}, 0.5)`;
    ctx.fillRect(x, y, 2, 2);
  }
  const flowers = ['#f6e7a8', '#f4c2d7', '#e8f0f4'];
  for (let i = 0; i < 26; i += 1) {
    const x = (i * 131.7) % size;
    const y = (i * 79.3) % size;
    ctx.fillStyle = flowers[i % flowers.length];
    ctx.fillRect(x, y, 2, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 24);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 沥青路面纹理：底色 + 白色边线 + 磨损噪点。 */
export function createRoadTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create road texture context.');

  ctx.fillStyle = '#8f8d88';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 500; i += 1) {
    const x = (i * 61.7) % size;
    const y = (i * 113.3) % size;
    ctx.fillStyle = `rgba(70, 68, 64, ${0.05 + ((i * 13) % 10) / 100})`;
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.fillStyle = 'rgba(240, 238, 230, 0.85)';
  ctx.fillRect(0, 6, size, 3);
  ctx.fillRect(0, size - 9, size, 3);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 木纹（室内地板/柜台）。 */
export function createWoodTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create wood texture context.');

  ctx.fillStyle = '#b08a5a';
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y += 32) {
    ctx.fillStyle = 'rgba(120, 84, 48, 0.55)';
    ctx.fillRect(0, y, size, 2);
    for (let i = 0; i < 40; i += 1) {
      const x = (i * 53.3 + y * 7) % size;
      ctx.fillStyle = 'rgba(140, 104, 64, 0.35)';
      ctx.fillRect(x, y + 4 + (i % 20), 18, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 榻榻米纹理。 */
export function createTatamiTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create tatami texture context.');

  ctx.fillStyle = '#c8b878';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(90, 80, 40, 0.8)';
  ctx.lineWidth = 3;
  for (let i = 0; i <= size; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 商店看板（文字牌子）。 */
export function createSignTexture(label: string, bg: string, fg: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create sign texture context.');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = fg;
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 240, 80);
  ctx.fillStyle = fg;
  ctx.font = 'bold 44px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 52);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 暖帘（noren）纹理。 */
export function createNorenTexture(label: string, bg: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create noren texture context.');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.font = 'bold 52px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** NPC 头顶名牌。 */
export function createNameTagTexture(name: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create name tag texture context.');

  ctx.fillStyle = 'rgba(30, 28, 26, 0.72)';
  ctx.beginPath();
  ctx.roundRect(16, 10, 224, 44, 12);
  ctx.fill();
  ctx.fillStyle = '#f6f1df';
  ctx.font = 'bold 30px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 128, 34);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 径向光晕精灵（路灯/灯笼发光）。 */
export function createGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create glow texture context.');

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 236, 190, 0.9)');
  gradient.addColorStop(0.4, 'rgba(255, 214, 140, 0.35)');
  gradient.addColorStop(1, 'rgba(255, 214, 140, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 天空穹顶渐变（按一天时段重绘）。 */
export function createSkyTexture(top: string, middle: string, bottom: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create sky texture context.');

  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, top);
  gradient.addColorStop(0.55, middle);
  gradient.addColorStop(1, bottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** 单枚樱花花瓣（带 alpha）。 */
export function createPetalTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create petal texture context.');

  ctx.fillStyle = '#f7c6d9';
  ctx.beginPath();
  ctx.ellipse(32, 32, 22, 14, Math.PI / 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.ellipse(26, 28, 8, 5, Math.PI / 5, 0, Math.PI * 2);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
