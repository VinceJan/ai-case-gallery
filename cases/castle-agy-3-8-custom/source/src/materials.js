import * as THREE from 'three';
import { PALETTE } from './constants.js';

// Generate a discrete 3-tone stepped gradient map for cel shading
function createToonGradientMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  
  // 3-step discrete cel shading: shadow (0.4), midtone (0.75), highlight (1.0)
  ctx.fillStyle = '#666666';
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = '#b8b8b8';
  ctx.fillRect(1, 0, 2, 1);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(3, 0, 1, 1);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

export const toonGradientMap = createToonGradientMap();

// Global uniform for animated shaders (wind, water, flags)
export const globalUniforms = {
  uTime: { value: 0.0 },
  uWindStrength: { value: 1.0 },
  uWindDirection: { value: new THREE.Vector2(0.85, 0.52).normalize() }
};

// Material cache
const materials = {};

export function getToonMaterial(colorHex, options = {}) {
  const key = `${colorHex}_${options.wireframe ? 'w' : ''}_${options.roughness || 0.5}_${options.emissive || 0}`;
  if (materials[key]) return materials[key];

  const mat = new THREE.MeshToonMaterial({
    color: colorHex,
    gradientMap: toonGradientMap,
    ...options
  });
  
  materials[key] = mat;
  return mat;
}

// Custom Waving Wheat Material (Vertex Shader Wind Waves)
export function createWheatMaterial() {
  const mat = new THREE.MeshToonMaterial({
    color: PALETTE.WHEAT_GOLD,
    gradientMap: toonGradientMap,
    side: THREE.DoubleSide
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = globalUniforms.uTime;
    shader.uniforms.uWindStrength = globalUniforms.uWindStrength;

    shader.vertexShader = `
      uniform float uTime;
      uniform float uWindStrength;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      // Wheat sway increases with height (local Y > 0)
      float swayFactor = smoothstep(0.0, 1.2, position.y);
      float wave = sin(uTime * 2.8 + transformed.x * 0.45 + transformed.z * 0.6) * 0.22;
      float gust = sin(uTime * 1.2 + transformed.x * 0.2) * 0.12;
      transformed.x += (wave + gust) * swayFactor * uWindStrength;
      transformed.z += (cos(uTime * 2.1 + transformed.z * 0.5) * 0.15) * swayFactor * uWindStrength;
      `
    );
  };

  return mat;
}

// Custom Fluttering Flag / Banner Material
export function createFlagMaterial(colorHex) {
  const mat = new THREE.MeshToonMaterial({
    color: colorHex,
    gradientMap: toonGradientMap,
    side: THREE.DoubleSide
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = globalUniforms.uTime;
    shader.uniforms.uWindStrength = globalUniforms.uWindStrength;

    shader.vertexShader = `
      uniform float uTime;
      uniform float uWindStrength;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      // Flutter displacement increases with distance along X or local coordinate
      float dist = max(0.0, position.x + 0.5);
      float wave1 = sin(uTime * 5.0 - position.x * 4.0) * 0.15 * dist;
      float wave2 = cos(uTime * 3.5 - position.y * 3.0) * 0.08 * dist;
      transformed.z += (wave1 + wave2) * uWindStrength;
      `
    );
  };

  return mat;
}

// Cel Water Material with gentle ripples and specular glint
export function createWaterMaterial() {
  const mat = new THREE.MeshStandardMaterial({
    color: PALETTE.WATER_TEAL,
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.88,
    flatShading: true
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = globalUniforms.uTime;

    shader.vertexShader = `
      uniform float uTime;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float wave = sin(uTime * 2.2 + position.x * 1.2 + position.z * 1.5) * 0.06;
      float ripple = cos(uTime * 3.0 + position.x * 2.5) * 0.03;
      transformed.y += wave + ripple;
      `
    );
  };

  return mat;
}

// Stylized Tree Foliage Sway Material
export function createFoliageMaterial(colorHex) {
  const mat = new THREE.MeshToonMaterial({
    color: colorHex,
    gradientMap: toonGradientMap
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = globalUniforms.uTime;
    shader.uniforms.uWindStrength = globalUniforms.uWindStrength;

    shader.vertexShader = `
      uniform float uTime;
      uniform float uWindStrength;
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float heightFactor = max(0.0, position.y * 0.08);
      float sway = sin(uTime * 1.8 + transformed.x * 0.3 + transformed.z * 0.3) * 0.08;
      transformed.x += sway * heightFactor * uWindStrength;
      transformed.z += (cos(uTime * 1.5 + transformed.x * 0.2) * 0.06) * heightFactor * uWindStrength;
      `
    );
  };

  return mat;
}

// Warm Emissive Window Glass Material (active during dusk/night)
export const warmWindowMaterial = new THREE.MeshBasicMaterial({
  color: PALETTE.WINDOW_WARM,
  transparent: true,
  opacity: 0.95
});

// Blacksmith Forge Emissive Material
export const forgeFireMaterial = new THREE.MeshBasicMaterial({
  color: 0xff4800
});

// Soft radial contact shadow texture for billboard characters
export function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createRadialGradient(32, 32, 4, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(25, 20, 35, 0.55)');
  gradient.addColorStop(0.5, 'rgba(30, 25, 40, 0.32)');
  gradient.addColorStop(1, 'rgba(35, 30, 45, 0.0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = false;
  return tex;
}

export const contactShadowTexture = createContactShadowTexture();
export const contactShadowMaterial = new THREE.MeshBasicMaterial({
  map: contactShadowTexture,
  transparent: true,
  opacity: 0.85,
  depthWrite: false
});
