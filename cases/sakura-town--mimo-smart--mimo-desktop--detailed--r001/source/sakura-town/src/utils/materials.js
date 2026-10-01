/**
 * Cel-shading material kit + procedural canvas textures
 */
import * as THREE from 'three';

let gradientMap = null;

function makeGradientMap() {
  // 4-step toon ramp (RedFormat = 1 byte per texel)
  // Keep the floor relatively high so shadowed sides stay readable
  const colors = new Uint8Array([130, 180, 220, 255]);
  const tex = new THREE.DataTexture(colors, 4, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

export function getGradientMap() {
  if (!gradientMap) gradientMap = makeGradientMap();
  return gradientMap;
}

const materialCache = new Map();

export function toonMaterial(color, opts = {}) {
  const key = `${color}|${opts.emissive || 0}|${opts.transparent || false}|${opts.opacity ?? 1}`;
  if (materialCache.has(key)) return materialCache.get(key);

  const mat = new THREE.MeshToonMaterial({
    color,
    gradientMap: getGradientMap(),
    transparent: opts.transparent || false,
    opacity: opts.opacity ?? 1,
  });
  if (opts.emissive) {
    mat.emissive = new THREE.Color(opts.emissive);
    mat.emissiveIntensity = opts.emissiveIntensity ?? 1;
  }
  if (opts.side) mat.side = opts.side;
  materialCache.set(key, mat);
  return mat;
}

export function unlitMaterial(color, opts = {}) {
  const key = `unlit|${color}|${opts.transparent || false}|${opts.opacity ?? 1}`;
  if (materialCache.has(key)) return materialCache.get(key);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: opts.transparent || false,
    opacity: opts.opacity ?? 1,
  });
  if (opts.side) mat.side = opts.side;
  materialCache.set(key, mat);
  return mat;
}

// ---------- Procedural canvas textures ----------

function canvasTexture(size, draw, opts = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (opts.repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  tex.anisotropy = 4;
  return tex;
}

export function asphaltTexture() {
  return canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#3a3f48';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 1800; i++) {
      const g = 40 + Math.random() * 40;
      ctx.fillStyle = `rgba(${g},${g + 4},${g + 10},${0.15 + Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    // subtle center variation
    const grad = ctx.createLinearGradient(0, 0, s, s);
    grad.addColorStop(0, 'rgba(255,255,255,0.03)');
    grad.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s);
  }, { repeat: [8, 8] });
}

export function sidewalkTexture() {
  return canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = '#8a8680';
    ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * s / 4, 0);
      ctx.lineTo(i * s / 4, s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * s / 4);
      ctx.lineTo(s, i * s / 4);
      ctx.stroke();
    }
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2);
    }
  }, { repeat: [6, 6] });
}

export function woodTexture(base = '#8b5a3c') {
  return canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 24; i++) {
      const y = (i / 24) * s + (Math.random() - 0.5) * 3;
      ctx.strokeStyle = `rgba(0,0,0,${0.08 + Math.random() * 0.1})`;
      ctx.lineWidth = 1 + Math.random();
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= s; x += 8) {
        ctx.lineTo(x, y + Math.sin(x * 0.08 + i) * 1.5);
      }
      ctx.stroke();
    }
  }, { repeat: [2, 2] });
}

export function sidingTexture(base = '#d9cfc0') {
  return canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 10) {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, y, s, 1);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, y + 1, s, 2);
    }
  }, { repeat: [2, 2] });
}

export function tileRoofTexture(base = '#4a5568') {
  return canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 8) {
      for (let x = (y / 8) % 2 === 0 ? 0 : 6; x < s; x += 12) {
        ctx.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.06})`;
        ctx.fillRect(x, y, 11, 7);
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fillRect(x, y + 6, 12, 1);
      }
    }
  }, { repeat: [3, 3] });
}

export function grassTexture() {
  return canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = '#5f9a5a';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 400; i++) {
      const g = 120 + Math.random() * 80;
      ctx.fillStyle = `rgba(${g * 0.45},${g},${g * 0.4},${0.15 + Math.random() * 0.2})`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 3 + Math.random() * 3);
    }
  }, { repeat: [16, 16] });
}

export function concreteTexture(base = '#9aa0a8') {
  return canvasTexture(128, (ctx, s) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 300; i++) {
      const v = 120 + Math.random() * 80;
      ctx.fillStyle = `rgba(${v},${v},${v},0.12)`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 3, 3);
    }
  }, { repeat: [4, 4] });
}

/** Draw Japanese-style signboard */
export function signTexture(text, bg = '#c45c48', fg = '#fff8e8', vertical = false, sub = '') {
  return canvasTexture(vertical ? 128 : 256, (ctx, s) => {
    // The canvas is square; layout depends on orientation
    const w = vertical ? 64 : s;
    const h = vertical ? s : 80;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, s - 8, s - 8);

    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (vertical) {
      const chars = text.split('');
      const step = s / (chars.length + 1);
      ctx.font = `bold ${Math.min(40, step * 0.7)}px sans-serif`;
      chars.forEach((ch, i) => {
        ctx.fillText(ch, s / 2, step * (i + 1));
      });
    } else {
      ctx.font = `bold ${Math.min(48, 280 / Math.max(text.length, 1))}px sans-serif`;
      ctx.fillText(text, s / 2, s * 0.42);
      if (sub) {
        ctx.font = '18px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText(sub, s / 2, s * 0.72);
      }
    }
  });
}

/** Generate a soft outdoor sky texture gradient for background */
export function skyColors(hour = 12) {
  // hour 0-24
  const day = {
    top: new THREE.Color('#6aadf0'),
    mid: new THREE.Color('#a8d8f8'),
    bottom: new THREE.Color('#f8ecd4'),
    sun: new THREE.Color('#fff4d8'),
    ambient: new THREE.Color('#c8e0f4'),
    sunIntensity: 1.7,
    ambientIntensity: 1.0,
    fog: new THREE.Color('#c8e0f0'),
  };
  const dawn = {
    top: new THREE.Color('#4a5a90'),
    mid: new THREE.Color('#d08898'),
    bottom: new THREE.Color('#f8c090'),
    sun: new THREE.Color('#ffc890'),
    ambient: new THREE.Color('#9098b8'),
    sunIntensity: 1.15,
    ambientIntensity: 0.7,
    fog: new THREE.Color('#e0b0a0'),
  };
  const night = {
    top: new THREE.Color('#0c1428'),
    mid: new THREE.Color('#1a2844'),
    bottom: new THREE.Color('#2a3854'),
    sun: new THREE.Color('#8aa0c8'),
    ambient: new THREE.Color('#2a3850'),
    sunIntensity: 0.18,
    ambientIntensity: 0.18,
    fog: new THREE.Color('#152038'),
  };

  let a, b, t;
  if (hour < 5) {
    a = night; b = night; t = 0;
  } else if (hour < 7.5) {
    a = night; b = dawn; t = (hour - 5) / 2.5;
  } else if (hour < 10) {
    a = dawn; b = day; t = (hour - 7.5) / 2.5;
  } else if (hour < 16.5) {
    a = day; b = day; t = 0;
  } else if (hour < 19) {
    a = day; b = dawn; t = (hour - 16.5) / 2.5;
  } else if (hour < 21) {
    a = dawn; b = night; t = (hour - 19) / 2;
  } else {
    a = night; b = night; t = 0;
  }

  const lerpColor = (ca, cb) => ca.clone().lerp(cb, t);
  return {
    top: lerpColor(a.top, b.top),
    mid: lerpColor(a.mid, b.mid),
    bottom: lerpColor(a.bottom, b.bottom),
    sun: lerpColor(a.sun, b.sun),
    ambient: lerpColor(a.ambient, b.ambient),
    sunIntensity: a.sunIntensity + (b.sunIntensity - a.sunIntensity) * t,
    ambientIntensity: a.ambientIntensity + (b.ambientIntensity - a.ambientIntensity) * t,
    fog: lerpColor(a.fog, b.fog),
    isNight: hour < 6 || hour > 19.5,
    isDawn: hour >= 5 && hour < 10,
    isDusk: hour >= 16.5 && hour < 21,
  };
}

export function createSkyDome() {
  const geo = new THREE.SphereGeometry(900, 32, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color('#5b9fd4') },
      midColor: { value: new THREE.Color('#8ec5e8') },
      bottomColor: { value: new THREE.Color('#f0e2c8') },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 bottomColor;
      varying vec3 vWorldPos;
      void main() {
        float h = normalize(vWorldPos).y;
        vec3 col;
        if (h > 0.15) {
          col = mix(midColor, topColor, smoothstep(0.15, 0.7, h));
        } else {
          col = mix(bottomColor, midColor, smoothstep(-0.15, 0.15, h));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -100;
  mat.toneMapped = false;
  mat.fog = false;
  return mesh;
}

export function updateSky(skyMesh, colors) {
  skyMesh.material.uniforms.topColor.value.copy(colors.top);
  skyMesh.material.uniforms.midColor.value.copy(colors.mid);
  skyMesh.material.uniforms.bottomColor.value.copy(colors.bottom);
}
