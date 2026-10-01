import * as THREE from 'three';

// 1. Generate 3-tone Ramp Gradient Map for MeshToonMaterial (Cel-shading)
export function createAnimeGradientMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  // Discrete anime shading steps (Shadow, Midtone, Highlight)
  ctx.fillStyle = '#6b7280'; // Saturated ambient shadow
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = '#9ca3af'; // Half tone
  ctx.fillRect(1, 0, 1, 1);
  ctx.fillStyle = '#d1d5db'; // Soft bright
  ctx.fillRect(2, 0, 1, 1);
  ctx.fillStyle = '#ffffff'; // Direct specular / sun
  ctx.fillRect(3, 0, 1, 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

export function createWarmGradientMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#c2410c'; // Warm reddish shadow
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = '#ea580c'; // Warm orange midtone
  ctx.fillRect(1, 0, 1, 1);
  ctx.fillStyle = '#fdba74'; // Soft golden peach
  ctx.fillRect(2, 0, 1, 1);
  ctx.fillStyle = '#fff7ed'; // Crisp white highlight
  ctx.fillRect(3, 0, 1, 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

const defaultRamp = createAnimeGradientMap();
const warmRamp = createWarmGradientMap();

// Invert UV mapping on 2D planes so canvas textures map upright and left-to-right
export function invertGeometryUV(geo) {
  if (!geo || !geo.attributes || !geo.attributes.uv) return geo;
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, 1.0 - uv.getX(i), 1.0 - uv.getY(i));
  }
  uv.needsUpdate = true;
  return geo;
}

// 2. Inverted Hull Anime Outline Helper
// Creates classic anime cel-shading back-face outlines
export function addAnimeOutline(mesh, thickness = 0.04, color = 0x181e2b) {
  if (!mesh || !mesh.geometry) return;

  const outlineMat = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.BackSide
  });

  const outlineMesh = new THREE.Mesh(mesh.geometry, outlineMat);
  outlineMesh.position.copy(mesh.position);
  outlineMesh.rotation.copy(mesh.rotation);
  outlineMesh.scale.copy(mesh.scale).multiplyScalar(1 + thickness);
  outlineMesh.name = 'anime_outline';

  if (mesh.parent) {
    mesh.parent.add(outlineMesh);
  } else {
    mesh.add(outlineMesh);
  }

  return outlineMesh;
}

// 3. Central Materials Factory
export function createMaterials() {
  return {
    // Pedestal Base: Dark display block
    pedestalBase: new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.65,
      metalness: 0.15
    }),
    pedestalChamfer: new THREE.MeshStandardMaterial({
      color: 0x1c212d,
      roughness: 0.4,
      metalness: 0.3
    }),

    // Wet Asphalt Road
    wetAsphalt: new THREE.MeshStandardMaterial({
      color: 0x161821,
      roughness: 0.18, // Very wet and glossy
      metalness: 0.35,
      roughnessMap: null // Specular highlights from rain
    }),

    // Sidewalk Concrete
    sidewalk: new THREE.MeshToonMaterial({
      color: 0x828a9b,
      gradientMap: defaultRamp
    }),
    curb: new THREE.MeshToonMaterial({
      color: 0x5e6676,
      gradientMap: defaultRamp
    }),

    // Store Exterior Walls
    storeWallCream: new THREE.MeshToonMaterial({
      color: 0xf1f1eb,
      gradientMap: defaultRamp
    }),
    storeWallDark: new THREE.MeshToonMaterial({
      color: 0x2b303c,
      gradientMap: defaultRamp
    }),
    storeAwningBlue: new THREE.MeshToonMaterial({
      color: 0x0284c7,
      gradientMap: defaultRamp
    }),
    storeCanopyUnderside: new THREE.MeshToonMaterial({
      color: 0xf8fafc,
      gradientMap: defaultRamp
    }),

    // Store Interior
    interiorFloor: new THREE.MeshStandardMaterial({
      color: 0xedf2f7,
      roughness: 0.15, // Polished vinyl anime shine
      metalness: 0.1
    }),
    interiorWallWarm: new THREE.MeshToonMaterial({
      color: 0xfff7ed,
      gradientMap: warmRamp
    }),
    interiorCeiling: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.8
    }),

    // Glass Windows (Crystal clear anime glass with subtle rain reflections)
    storeGlass: new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.24,
      roughness: 0.1,
      metalness: 0.3,
      depthWrite: false
    }),

    // Clear Umbrella Plastic
    umbrellaVinyl: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.42,
      roughness: 0.1,
      transmission: 0.75,
      depthWrite: false,
      side: THREE.DoubleSide
    }),

    // Dark Aluminum Window Frames & Grilles
    metalDark: new THREE.MeshToonMaterial({
      color: 0x272b38,
      gradientMap: defaultRamp
    }),
    metalSilver: new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.8,
      roughness: 0.25
    }),
    metalChrome: new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      metalness: 0.95,
      roughness: 0.1
    }),

    // Utility Pole & Concrete
    utilityPoleConcrete: new THREE.MeshToonMaterial({
      color: 0x717987,
      gradientMap: defaultRamp
    }),
    utilityCableBlack: new THREE.MeshToonMaterial({
      color: 0x0f172a,
      gradientMap: defaultRamp
    }),

    // Emissive / Glowing Materials
    ceilingLight: new THREE.MeshBasicMaterial({
      color: 0xfffbeb
    }),
    streetLightGlow: new THREE.MeshBasicMaterial({
      color: 0xffe082
    }),
    trafficLightGreen: new THREE.MeshBasicMaterial({
      color: 0x22c55e
    }),
    trafficLightRed: new THREE.MeshBasicMaterial({
      color: 0xef4444
    }),
    hotFoodAmber: new THREE.MeshBasicMaterial({
      color: 0xf59e0b
    }),

    // Raindrop Material
    rainStreak: new THREE.MeshBasicMaterial({
      color: 0xc7d2fe,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    }),

    // Puddle Ripple Ring
    rippleRing: new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  };
}
