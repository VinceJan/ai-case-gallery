import * as THREE from 'three';
import type { Block } from './world';

export const ATLAS_COLUMNS = 4;
export const TILE_SIZE = 64;
export const ATLAS_SIZE = ATLAS_COLUMNS * TILE_SIZE;

export const tileFor = (block: Block, face: number): number => {
  if (block === 'grass') return face === 2 ? 0 : face === 3 ? 2 : 1;
  if (block === 'wood') return face === 2 || face === 3 ? 6 : 5;
  return { dirt: 2, stone: 3, sand: 4, leaves: 7, planks: 8, brick: 9, glow: 10 }[block];
};

export function tileUV(tile: number, u: number, v: number): [number, number] {
  const col = tile % ATLAS_COLUMNS;
  const row = Math.floor(tile / ATLAS_COLUMNS);
  const inset = 1 / ATLAS_SIZE;
  return [(col + u) / ATLAS_COLUMNS + (u === 0 ? inset : -inset), 1 - (row + 1 - v) / ATLAS_COLUMNS + (v === 0 ? inset : -inset)];
}

function random(x: number, y: number, salt: number): number {
  let n = Math.imul(x + salt * 113, 374761393) ^ Math.imul(y + salt * 37, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function rgba(r: number, g: number, b: number): string {
  return `rgb(${Math.max(0, Math.min(255, Math.round(r)))},${Math.max(0, Math.min(255, Math.round(g)))},${Math.max(0, Math.min(255, Math.round(b)))})`;
}

export function createAtlas(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = ATLAS_SIZE;
  const ctx = canvas.getContext('2d')!;
  const paint = (tile: number, draw: (x: number, y: number, r: number) => string) => {
    const ox = (tile % 4) * TILE_SIZE;
    const oy = Math.floor(tile / 4) * TILE_SIZE;
    for (let y = 0; y < TILE_SIZE; y += 2) {
      for (let x = 0; x < TILE_SIZE; x += 2) {
        ctx.fillStyle = draw(x, y, random(x >> 1, y >> 1, tile));
        ctx.fillRect(ox + x, oy + y, 2, 2);
      }
    }
  };

  paint(0, (x, y, r) => {
    const blade = random(x >> 2, y >> 3, 18) > .86 ? 18 : 0;
    return rgba(79 + r * 31 + blade, 119 + r * 39 + blade, 62 + r * 22);
  });
  paint(1, (x, y, r) => y < 13 + Math.floor(random(x >> 2, 1, 17) * 5)
    ? rgba(74 + r * 28, 115 + r * 37, 58 + r * 22)
    : rgba(103 + r * 29, 79 + r * 24, 57 + r * 15));
  paint(2, (_x, _y, r) => rgba(107 + r * 31, 81 + r * 24, 59 + r * 17));
  paint(3, (x, y, r) => {
    const vein = Math.sin(x * .12 + y * .08) > .85 ? 10 : 0;
    return rgba(108 + r * 32 + vein, 115 + r * 32 + vein, 113 + r * 29 + vein);
  });
  paint(4, (_x, _y, r) => rgba(196 + r * 31, 180 + r * 28, 139 + r * 25));
  paint(5, (x, y, r) => {
    const grain = Math.sin(x * .55 + Math.sin(y * .12)) * 10;
    return rgba(101 + r * 22 + grain, 73 + r * 18 + grain * .65, 48 + r * 14);
  });
  paint(6, (x, y, r) => {
    const rings = Math.sin(Math.hypot(x - 32, y - 32) * .85) * 10;
    return rgba(135 + r * 21 + rings, 102 + r * 17 + rings, 68 + r * 14 + rings);
  });
  paint(7, (x, y, r) => {
    const leaf = random(x >> 2, y >> 2, 88) > .74 ? 23 : 0;
    return rgba(54 + r * 30 + leaf, 91 + r * 40 + leaf, 48 + r * 23);
  });
  paint(8, (x, y, r) => {
    const seam = y % 16 < 2 ? -36 : 0;
    const grain = Math.sin(x * .3 + y * .13) * 7;
    return rgba(177 + r * 22 + seam + grain, 134 + r * 20 + seam + grain, 88 + r * 15 + seam);
  });
  paint(9, (x, y, r) => {
    const mortar = y % 16 < 2 || (x + (Math.floor(y / 16) % 2) * 16) % 32 < 2;
    return mortar ? rgba(115, 105, 91) : rgba(151 + r * 27, 89 + r * 21, 69 + r * 17);
  });
  paint(10, (x, y, r) => {
    const frame = x < 5 || y < 5 || x > 58 || y > 58;
    return frame ? rgba(96 + r * 20, 68 + r * 16, 43 + r * 10) : rgba(255, 187 + r * 42, 81 + r * 26);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 8;
  return texture;
}
