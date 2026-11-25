import * as THREE from 'three';

// Shared global environment uniforms updated each frame by weather & animation loop
export const ENV_UNIFORMS = {
  uTime: { value: 0 },
  uWindStrength: { value: 1.0 },
  uSnowAmount: { value: 0.0 },
  uWetness: { value: 0.0 },
  uGlowIntensity: { value: 0.35 },
};

// Warm storybook cel-shading palette
export const PALETTE = {
  // Stone & masonry
  baseStoneLight: 0x9b9288,
  baseStoneDark: 0x7a7169,
  baseTrim: 0xc2b8a8,
  castleStone: 0xe3dac9,
  castleStoneAlt: 0xd2c7b3,
  castleTrim: 0xbcb09d,
  retainingWall: 0xb6ab9a,
  cobble: 0xc7bea9,

  // Roofs
  castleRoofBlue: 0x4f6d88,
  castleRoofDeep: 0x3e5870,
  thatchGold: 0xd9b366,
  thatchWarm: 0xcda152,
  terracotta: 0xc46d4c,
  smithyRoof: 0x675b56,
  barnRoof: 0x9e5842,

  // Timber & plaster
  plasterCream: 0xf1e8d6,
  plasterOchre: 0xebd9b8,
  plasterSage: 0xdde3cf,
  plasterBlush: 0xebd6ca,
  timberDark: 0x6b4b35,
  timberMid: 0x8d6545,
  timberLight: 0xb58b5e,
  ironDark: 0x434852,

  // Nature & fields
  grassTop: 0x87b065,
  grassMid: 0x739c56,
  grassDeep: 0x5d8448,
  soilRich: 0x8c6848,
  soilDark: 0x735338,
  pathDirt: 0xcfb991,
  wheatGold: 0xe5be58,
  wheatAmber: 0xd5a33e,
  hayGold: 0xe1c16e,
  waterShallow: 0x6bb8c2,
  waterDeep: 0x4b93a8,

  // Accents
  bannerCrimson: 0xc64e47,
  bannerBlue: 0x45739e,
  bannerGold: 0xe6b94c,
  windowGlow: 0xffd27a,
  forgeGlow: 0xff7b33,

  // Trees
  leafSun: 0x93ba63,
  leafMid: 0x6f9b53,
  leafDeep: 0x537a45,
  leafAutumn: 0xd1984e,
  pineGreen: 0x4d7451,
  trunkBark: 0x75553d,
};

let cachedGradientMap = null;

export function getToonGradientMap() {
  if (cachedGradientMap) return cachedGradientMap;
  // 4-step clean cel ramp with luminous shadows (never harsh black)
  const stops = new Uint8Array([
    138, 138, 138, 255,
    182, 182, 182, 255,
    222, 222, 222, 255,
    255, 255, 255, 255,
  ]);
  const tex = new THREE.DataTexture(stops, 4, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  cachedGradientMap = tex;
  return tex;
}

// Seeded PRNG for deterministic procedural textures
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCanvasTexture(size, drawFn, repeatX = 1, repeatY = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

const textureCache = {};

export function getTextures() {
  if (textureCache.ready) return textureCache;

  // 1. Stone masonry for diorama base sides
  textureCache.baseMasonry = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(101);
      ctx.fillStyle = '#6c635c';
      ctx.fillRect(0, 0, s, s);
      const rows = 8;
      const rowH = s / rows;
      for (let r = 0; r < rows; r++) {
        const cols = 4 + (r % 2);
        const offset = (r % 2) * (s / cols) * 0.5;
        let x = -offset;
        for (let c = 0; c <= cols + 1; c++) {
          const w = s / cols + (rand() - 0.5) * 10;
          const v = 138 + Math.floor((rand() - 0.5) * 26);
          const warm = Math.floor(rand() * 10);
          ctx.fillStyle = `rgb(${v + warm}, ${v + warm - 5}, ${v - 11})`;
          ctx.fillRect(x + 2, r * rowH + 2, w - 4, rowH - 4);
          // Subtle top bevel highlight
          ctx.fillStyle = 'rgba(255,250,240,0.16)';
          ctx.fillRect(x + 2, r * rowH + 2, w - 4, 3);
          // Subtle bottom shade
          ctx.fillStyle = 'rgba(40,32,28,0.14)';
          ctx.fillRect(x + 2, (r + 1) * rowH - 5, w - 4, 3);
          x += w;
        }
      }
    },
    6,
    1.15
  );

  // 2. Castle dressed limestone blocks
  textureCache.castleStone = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(202);
      ctx.fillStyle = '#bdb19f';
      ctx.fillRect(0, 0, s, s);
      const rows = 8;
      const rowH = s / rows;
      for (let r = 0; r < rows; r++) {
        const cols = 4;
        const w = s / cols;
        const off = (r % 2) * (w * 0.5);
        for (let c = -1; c <= cols; c++) {
          const shade = 216 + Math.floor((rand() - 0.5) * 20);
          ctx.fillStyle = `rgb(${shade + 8}, ${shade + 1}, ${shade - 12})`;
          ctx.fillRect(c * w + off + 1.5, r * rowH + 1.5, w - 3, rowH - 3);
          ctx.fillStyle = 'rgba(255,252,244,0.18)';
          ctx.fillRect(c * w + off + 1.5, r * rowH + 1.5, w - 3, 2.5);
        }
      }
    },
    2,
    2
  );

  // 3. Retaining wall rustic stone
  textureCache.retainingStone = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(303);
      ctx.fillStyle = '#8d8376';
      ctx.fillRect(0, 0, s, s);
      const rows = 6;
      const rowH = s / rows;
      for (let r = 0; r < rows; r++) {
        const cols = 5;
        const w = s / cols;
        const off = (r % 2) * (w * 0.5);
        for (let c = -1; c <= cols; c++) {
          const shade = 178 + Math.floor((rand() - 0.5) * 26);
          ctx.fillStyle = `rgb(${shade + 6}, ${shade}, ${shade - 10})`;
          ctx.fillRect(c * w + off + 2, r * rowH + 2, w - 4, rowH - 4);
        }
      }
    },
    3,
    1
  );

  // 4. Slate roof tiles
  textureCache.slateRoof = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(404);
      ctx.fillStyle = '#47627a';
      ctx.fillRect(0, 0, s, s);
      const rows = 10;
      const cols = 8;
      const rh = s / rows;
      const cw = s / cols;
      for (let r = 0; r < rows; r++) {
        const off = (r % 2) * (cw * 0.5);
        for (let c = -1; c <= cols; c++) {
          const shift = Math.floor((rand() - 0.5) * 18);
          ctx.fillStyle = `rgb(${78 + shift}, ${107 + shift}, ${134 + shift})`;
          ctx.fillRect(c * cw + off + 1, r * rh + 1, cw - 2, rh - 2);
          ctx.fillStyle = 'rgba(220,238,255,0.12)';
          ctx.fillRect(c * cw + off + 1, r * rh + 1, cw - 2, 2);
        }
      }
    },
    2,
    2
  );

  // 5. Golden thatch texture
  textureCache.thatch = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(505);
      ctx.fillStyle = '#d4ac5c';
      ctx.fillRect(0, 0, s, s);
      // Soft layered straw bundles
      for (let i = 0; i < 240; i++) {
        const x = rand() * s;
        const y = rand() * s;
        const len = 18 + rand() * 34;
        const w = 2 + rand() * 3;
        ctx.fillStyle = rand() > 0.45 ? 'rgba(244, 217, 138, 0.42)' : 'rgba(156, 114, 48, 0.34)';
        ctx.fillRect(x, y, w, len);
      }
      // Subtle horizontal courses
      for (let y = 32; y < s; y += 44) {
        ctx.fillStyle = 'rgba(128, 92, 38, 0.22)';
        ctx.fillRect(0, y, s, 4);
      }
    },
    1.5,
    1.5
  );

  // 6. Clean cobblestone plaza texture
  textureCache.cobble = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(606);
      ctx.fillStyle = '#a99f8c';
      ctx.fillRect(0, 0, s, s);
      const rows = 10;
      const cols = 10;
      const rh = s / rows;
      const cw = s / cols;
      for (let r = 0; r < rows; r++) {
        const off = (r % 2) * (cw * 0.5);
        for (let c = -1; c <= cols; c++) {
          const v = 192 + Math.floor((rand() - 0.5) * 26);
          ctx.fillStyle = `rgb(${v + 8}, ${v + 2}, ${v - 10})`;
          const x = c * cw + off + 2;
          const y = r * rh + 2;
          ctx.beginPath();
          ctx.roundRect(x, y, cw - 4, rh - 4, 4);
          ctx.fill();
        }
      }
    },
    3,
    3
  );

  // 7. Tilled farmland soil furrows
  textureCache.furrow = makeCanvasTexture(
    256,
    (ctx, s) => {
      ctx.fillStyle = '#7e5c3e';
      ctx.fillRect(0, 0, s, s);
      const stripes = 8;
      const sh = s / stripes;
      for (let i = 0; i < stripes; i++) {
        const y = i * sh;
        ctx.fillStyle = '#97724f';
        ctx.fillRect(0, y + 3, s, sh * 0.45);
        ctx.fillStyle = '#684a31';
        ctx.fillRect(0, y + sh * 0.68, s, sh * 0.25);
      }
    },
    2,
    2
  );

  // 8. Soft painterly meadow grass
  textureCache.grass = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(808);
      ctx.fillStyle = '#83ab62';
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 180; i++) {
        const x = rand() * s;
        const y = rand() * s;
        const r = 6 + rand() * 18;
        ctx.fillStyle = rand() > 0.5 ? 'rgba(155, 194, 108, 0.28)' : 'rgba(98, 142, 74, 0.22)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    4,
    4
  );

  // 9. Wood planks
  textureCache.wood = makeCanvasTexture(
    256,
    (ctx, s) => {
      const rand = mulberry32(909);
      ctx.fillStyle = '#8b6343';
      ctx.fillRect(0, 0, s, s);
      const planks = 6;
      const ph = s / planks;
      for (let i = 0; i < planks; i++) {
        const shift = Math.floor((rand() - 0.5) * 18);
        ctx.fillStyle = `rgb(${139 + shift}, ${99 + shift}, ${67 + shift})`;
        ctx.fillRect(0, i * ph + 1, s, ph - 2);
        ctx.fillStyle = 'rgba(54, 34, 20, 0.26)';
        ctx.fillRect(0, (i + 1) * ph - 2, s, 2);
      }
    },
    1,
    1
  );

  textureCache.ready = true;
  return textureCache;
}

/**
 * Create a clean cel-shaded MeshToonMaterial with optional snow accumulation & wetness response.
 */
export function createToonMaterial({
  color = 0xffffff,
  map = null,
  snowable = true,
  snowThreshold = 0.52,
  emissive = 0x000000,
  emissiveIntensity = 0.0,
  side = THREE.FrontSide,
  transparent = false,
  opacity = 1.0,
  vertexColors = false,
} = {}) {
  const mat = new THREE.MeshToonMaterial({
    color,
    map,
    gradientMap: getToonGradientMap(),
    emissive,
    emissiveIntensity,
    side,
    transparent,
    opacity,
    vertexColors,
  });

  if (snowable) {
    mat.customProgramCacheKey = () => `toon-snow-${snowThreshold.toFixed(2)}`;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uSnowAmount = ENV_UNIFORMS.uSnowAmount;
      shader.uniforms.uWetness = ENV_UNIFORMS.uWetness;

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
           varying float vWorldUp;`
        )
        .replace(
          '#include <beginnormal_vertex>',
          `#include <beginnormal_vertex>
           vec3 snowObjNorm = objectNormal;
           #ifdef USE_INSTANCING
             vec3 snowWorldNorm = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * snowObjNorm);
           #else
             vec3 snowWorldNorm = normalize(mat3(modelMatrix) * snowObjNorm);
           #endif
           vWorldUp = snowWorldNorm.y;`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
           uniform float uSnowAmount;
           uniform float uWetness;
           varying float vWorldUp;`
        )
        .replace(
          '#include <map_fragment>',
          `#include <map_fragment>
           // Slight cool darkening when wet in rain
           diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.84, 0.87, 0.92), uWetness * 0.45);
           // Clean storybook snow cap on upward surfaces
           float snowMask = smoothstep(${(snowThreshold - 0.12).toFixed(2)}, ${(snowThreshold + 0.18).toFixed(2)}, vWorldUp) * uSnowAmount;
           diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.94, 0.96, 0.99), snowMask * 0.88);`
        );
    };
  }

  return mat;
}

/**
 * Create a warm window/forge glowing material whose intensity reacts to weather & dusk/night.
 */
export function createGlowMaterial(color = PALETTE.windowGlow, baseIntensity = 0.65) {
  const mat = new THREE.MeshToonMaterial({
    color,
    emissive: color,
    emissiveIntensity: baseIntensity,
    gradientMap: getToonGradientMap(),
  });
  mat.userData.isGlowMaterial = true;
  mat.userData.baseGlow = baseIntensity;
  return mat;
}

/**
 * Create a fluttering banner/flag material with gentle wind wave.
 */
export function createFlagMaterial(color, pattern = 'solid') {
  const tex = makeCanvasTexture(128, (ctx, s) => {
    const col = new THREE.Color(color);
    ctx.fillStyle = `#${col.getHexString()}`;
    ctx.fillRect(0, 0, s, s);
    if (pattern === 'heraldic') {
      // Soft gold chevron & emblem
      ctx.fillStyle = '#ebd07e';
      ctx.fillRect(0, s * 0.42, s, s * 0.16);
      ctx.fillRect(s * 0.24, 0, s * 0.14, s);
      ctx.fillStyle = '#f6ecd2';
      ctx.beginPath();
      ctx.arc(s * 0.31, s * 0.5, s * 0.12, 0, Math.PI * 2);
      ctx.fill();
    } else if (pattern === 'stripe') {
      ctx.fillStyle = '#f2e8d2';
      ctx.fillRect(0, s * 0.36, s, s * 0.28);
    }
  });
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;

  const mat = new THREE.MeshToonMaterial({
    map: tex,
    gradientMap: getToonGradientMap(),
    side: THREE.DoubleSide,
  });

  mat.customProgramCacheKey = () => 'toon-flag-flutter';
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = ENV_UNIFORMS.uTime;
    shader.uniforms.uWindStrength = ENV_UNIFORMS.uWindStrength;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uTime;
         uniform float uWindStrength;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         // Assume flag extends along +X from x=0 (pole)
         float dist = clamp(position.x, 0.0, 2.0);
         float wave = sin(dist * 6.0 - uTime * (4.2 + uWindStrength * 2.4)) * 0.09 * dist * (0.65 + uWindStrength * 0.6);
         float wave2 = cos(dist * 10.0 - uTime * 6.5 + position.y * 4.0) * 0.025 * dist * uWindStrength;
         transformed.z += wave + wave2;
         transformed.y += sin(dist * 4.0 - uTime * 3.0) * 0.02 * dist;`
      );
  };
  return mat;
}
