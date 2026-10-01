/**
 * Shared toon / cel-shading material palette for the Japanese suburban town.
 * Warm daylight, cool shadows, soft anime-background look.
 */
import * as THREE from 'three';

export type ToonOpts = {
  color: THREE.ColorRepresentation;
  gradientSteps?: number;
  emissive?: THREE.ColorRepresentation;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  map?: THREE.Texture | null;
  side?: THREE.Side;
  vertexColors?: boolean;
};

const gradientCache = new Map<number, THREE.DataTexture>();

function getGradient(steps: number): THREE.DataTexture {
  const cached = gradientCache.get(steps);
  if (cached) return cached;
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) {
    // soft ramp: avoid pure black shadow
    const t = i / (steps - 1);
    data[i] = Math.round(70 + t * 185);
  }
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  gradientCache.set(steps, tex);
  return tex;
}

export function toon(opts: ToonOpts): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({
    color: opts.color,
    gradientMap: getGradient(opts.gradientSteps ?? 4),
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    map: opts.map ?? null,
    side: opts.side ?? THREE.FrontSide,
    vertexColors: opts.vertexColors ?? false,
  });
}

/** Flat-ish basic material for outlines / signs / unlit accents. */
export function flat(color: THREE.ColorRepresentation, opts?: { opacity?: number; transparent?: boolean; map?: THREE.Texture | null }): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    opacity: opts?.opacity ?? 1,
    transparent: opts?.transparent ?? false,
    map: opts?.map ?? null,
  });
}

// —— Town palette (late-spring Japanese suburb) ——
export const PAL = {
  // grounds
  asphalt: '#5c6168',
  asphaltDark: '#4a4f56',
  sidewalk: '#9a958c',
  curb: '#c9c3b8',
  dirt: '#8b7355',
  grass: '#7cb06a',
  grassDark: '#5a9450',
  grassSoft: '#8fc47a',
  concrete: '#b0aaa0',
  concreteDark: '#8a847c',
  stone: '#a89b8a',
  wood: '#a67c52',
  woodDark: '#6e4e32',
  // buildings
  wallCream: '#f0e6d2',
  wallWhite: '#f5f2ea',
  wallBeige: '#e2d3b8',
  wallBlueGray: '#c5d0d8',
  wallWarmGray: '#d4cbbf',
  wallBrick: '#c4785a',
  wallSchool: '#e8e0d0',
  roofTile: '#6b5e52',
  roofRed: '#a85a4a',
  roofBlue: '#5a6f82',
  roofGray: '#7a7670',
  roofGreen: '#5a7a62',
  glass: '#a8d4e8',
  glassNight: '#ffd88a',
  awning: '#c45c48',
  awningBlue: '#4a6fa5',
  awningGreen: '#4a7a52',
  // infrastructure
  pole: '#4a4540',
  wire: '#2a2826',
  rail: '#6a6560',
  sleeper: '#5a4030',
  crossing: '#d4c84a',
  trafficRed: '#c04040',
  trafficGreen: '#40a060',
  lamp: '#2a2a2a',
  lampGlow: '#ffe8a0',
  // nature
  sakura: '#f5b8c8',
  sakuraDeep: '#e898b0',
  sakuraPale: '#fce0e8',
  leaf: '#6aaa58',
  leafDark: '#4a8840',
  leafLight: '#8ec870',
  trunk: '#6a5340',
  water: '#6aa8c8',
  waterDeep: '#4a88b0',
  // sky / time (updated at runtime)
  skyDay: '#a8d0e8',
  skyNoon: '#88b8e0',
  skyDusk: '#e8a878',
  skyNight: '#1a2848',
  sun: '#fff2c8',
  moon: '#c8d8f0',
  // accents
  red: '#c05048',
  yellow: '#e8c84a',
  orange: '#e08840',
  paper: '#f8f4e8',
  ink: '#2a2826',
  pink: '#f0a0b8',
  indigo: '#3a5080',
};

export function disposeMaterials(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        m.dispose();
      }
    }
  });
}
