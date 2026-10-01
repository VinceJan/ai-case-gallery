import * as THREE from 'three';

// Create stepped luminance gradient map for Cel-Shading (Toon)
export function createToonGradientMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  
  // 4 steps of illumination for rich cel-shading
  const colors = ['#555566', '#888899', '#bbbbcc', '#ffffff'];
  colors.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(i, 0, 1, 1);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

export function createSoftToonGradientMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 8;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  
  const colors = ['#666677', '#7c7c8e', '#9696a8', '#b5b5c7', '#d0d0e0', '#e5e5f0', '#f4f4fa', '#ffffff'];
  colors.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(i, 0, 1, 1);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

// Procedural stylized textures
export function createStoneBrickTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#c5c2bb';
  ctx.fillRect(0, 0, 256, 256);

  const rows = 16;
  const rowHeight = 256 / rows;
  ctx.strokeStyle = '#7c7873';
  ctx.lineWidth = 3;

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();

    const cols = 6;
    const colWidth = 256 / cols;
    const offset = (r % 2) * (colWidth / 2);

    for (let c = -1; c <= cols + 1; c++) {
      const x = c * colWidth + offset;
      // Slight tone variation for individual bricks
      ctx.fillStyle = (r * 11 + c * 17) % 3 === 0 ? '#ded9d1' : ((r * 7 + c * 13) % 2 === 0 ? '#b8b4ad' : '#ccc8c0');
      ctx.fillRect(x + 2, y + 2, colWidth - 4, rowHeight - 4);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + rowHeight);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createCobbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#8f887f';
  ctx.fillRect(0, 0, 256, 256);

  // Draw irregular stones
  const seedRandom = (s) => {
    const x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
  };

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#5a554e';

  let s = 42;
  for (let y = 8; y < 256; y += 20) {
    for (let x = 8; x < 256; x += 22) {
      const ox = (seedRandom(s++) - 0.5) * 6;
      const oy = (seedRandom(s++) - 0.5) * 6;
      const rx = 8 + (seedRandom(s++) * 4);
      const ry = 6 + (seedRandom(s++) * 4);
      
      const shade = Math.floor(160 + seedRandom(s++) * 50);
      ctx.fillStyle = `rgb(${shade + 5}, ${shade}, ${shade - 10})`;

      ctx.beginPath();
      ctx.ellipse(x + ox, y + oy, rx, ry, seedRandom(s++) * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

export function createWoodPlankTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#6d4c33';
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#432b1a';
  ctx.lineWidth = 2;

  const planks = 6;
  const h = 128 / planks;
  for (let i = 0; i < planks; i++) {
    ctx.fillStyle = (i % 2 === 0) ? '#7a553a' : '#61432c';
    ctx.fillRect(0, i * h, 128, h);
    ctx.beginPath();
    ctx.moveTo(0, i * h);
    ctx.lineTo(128, i * h);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createRoofTileTexture(isSlate = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const baseCol = isSlate ? '#405668' : '#b24c36';
  const altCol = isSlate ? '#334756' : '#993f2c';
  const lineCol = isSlate ? '#21303b' : '#6e2718';

  ctx.fillStyle = baseCol;
  ctx.fillRect(0, 0, 128, 128);

  const rows = 8;
  const rH = 128 / rows;
  const cols = 6;
  const cW = 128 / cols;

  ctx.strokeStyle = lineCol;
  ctx.lineWidth = 2;

  for (let r = 0; r < rows; r++) {
    const y = r * rH;
    const offset = (r % 2) * (cW / 2);
    for (let c = -1; c <= cols + 1; c++) {
      const x = c * cW + offset;
      ctx.fillStyle = (r + c) % 2 === 0 ? baseCol : altCol;
      ctx.fillRect(x + 1, y + 1, cW - 2, rH - 2);

      // Scalloped / rounded tile edge
      ctx.beginPath();
      ctx.arc(x + cW / 2, y + rH, cW / 2, Math.PI, 0, true);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createThatchTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#caa352';
  ctx.fillRect(0, 0, 128, 128);

  // Vertical straw lines
  ctx.lineWidth = 1;
  for (let x = 0; x < 128; x += 3) {
    ctx.strokeStyle = (x % 6 === 0) ? '#a88133' : '#dbb568';
    ctx.beginPath();
    ctx.moveTo(x + (Math.random() - 0.5) * 2, 0);
    ctx.lineTo(x + (Math.random() - 0.5) * 2, 128);
    ctx.stroke();
  }

  // Horizontal ridge lines
  for (let y = 16; y < 128; y += 24) {
    ctx.strokeStyle = '#856320';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// Master Materials Library for the Scene
export class MaterialLibrary {
  constructor() {
    this.gradientMap = createToonGradientMap();
    this.softGradientMap = createSoftToonGradientMap();

    this.stoneTexture = createStoneBrickTexture();
    this.cobbleTexture = createCobbleTexture();
    this.woodTexture = createWoodPlankTexture();
    this.slateRoofTexture = createRoofTileTexture(true);
    this.clayRoofTexture = createRoofTileTexture(false);
    this.thatchTexture = createThatchTexture();

    this.initMaterials();
  }

  initMaterials() {
    // Castle & Base Stone
    this.castleStone = new THREE.MeshToonMaterial({
      color: 0xd9d5cc,
      gradientMap: this.gradientMap,
      map: this.stoneTexture,
    });

    this.castleDarkStone = new THREE.MeshToonMaterial({
      color: 0x98948d,
      gradientMap: this.gradientMap,
    });

    this.plinthStone = new THREE.MeshToonMaterial({
      color: 0x6e6b66,
      gradientMap: this.gradientMap,
      map: this.stoneTexture,
    });

    this.plinthRim = new THREE.MeshToonMaterial({
      color: 0x2e2d2b,
      gradientMap: this.gradientMap,
    });

    // Terrain & Paths
    this.grassTerrain = new THREE.MeshToonMaterial({
      color: 0x76b852,
      gradientMap: this.softGradientMap,
    });

    this.cliffRock = new THREE.MeshToonMaterial({
      color: 0x8a847b,
      gradientMap: this.gradientMap,
    });

    this.cobblestonePath = new THREE.MeshToonMaterial({
      color: 0xa8a39a,
      gradientMap: this.gradientMap,
      map: this.cobbleTexture,
    });

    this.dirtPath = new THREE.MeshToonMaterial({
      color: 0xae8b63,
      gradientMap: this.softGradientMap,
    });

    this.soilRidge = new THREE.MeshToonMaterial({
      color: 0x6e5239,
      gradientMap: this.gradientMap,
    });

    // Architecture & Wood
    this.timberWood = new THREE.MeshToonMaterial({
      color: 0x4e3524,
      gradientMap: this.gradientMap,
      map: this.woodTexture,
    });

    this.lightPlank = new THREE.MeshToonMaterial({
      color: 0x9a714a,
      gradientMap: this.gradientMap,
    });

    this.plasterWall = new THREE.MeshToonMaterial({
      color: 0xf5f1e8,
      gradientMap: this.softGradientMap,
    });

    this.plasterYellow = new THREE.MeshToonMaterial({
      color: 0xfaeec8,
      gradientMap: this.softGradientMap,
    });

    this.thatchRoof = new THREE.MeshToonMaterial({
      color: 0xdcb45a,
      gradientMap: this.gradientMap,
      map: this.thatchTexture,
    });

    this.slateRoof = new THREE.MeshToonMaterial({
      color: 0x4a657c,
      gradientMap: this.gradientMap,
      map: this.slateRoofTexture,
    });

    this.clayRoof = new THREE.MeshToonMaterial({
      color: 0xb54d37,
      gradientMap: this.gradientMap,
      map: this.clayRoofTexture,
    });

    // Vegetation
    this.treeLeaves = new THREE.MeshToonMaterial({
      color: 0x4fa844,
      gradientMap: this.softGradientMap,
    });

    this.pineLeaves = new THREE.MeshToonMaterial({
      color: 0x2e6b3f,
      gradientMap: this.softGradientMap,
    });

    this.autumnLeaves = new THREE.MeshToonMaterial({
      color: 0xd68910,
      gradientMap: this.softGradientMap,
    });

    this.treeTrunk = new THREE.MeshToonMaterial({
      color: 0x543d2b,
      gradientMap: this.gradientMap,
    });

    this.wheatStalk = new THREE.MeshToonMaterial({
      color: 0xeebb4d,
      gradientMap: this.softGradientMap,
    });

    // Props & Market
    this.ironMetal = new THREE.MeshToonMaterial({
      color: 0x3d4449,
      gradientMap: this.gradientMap,
    });

    this.goldTrim = new THREE.MeshToonMaterial({
      color: 0xf39c12,
      gradientMap: this.gradientMap,
    });

    this.redCloth = new THREE.MeshToonMaterial({
      color: 0xc0392b,
      gradientMap: this.gradientMap,
    });

    this.blueCloth = new THREE.MeshToonMaterial({
      color: 0x2980b9,
      gradientMap: this.gradientMap,
    });

    this.whiteCloth = new THREE.MeshToonMaterial({
      color: 0xf0f3f4,
      gradientMap: this.gradientMap,
    });

    this.hay = new THREE.MeshToonMaterial({
      color: 0xdfb153,
      gradientMap: this.gradientMap,
      map: this.thatchTexture,
    });

    // Animated / Emissive
    this.forgeEmbers = new THREE.MeshBasicMaterial({
      color: 0xff4d00,
    });

    this.windowGlow = new THREE.MeshBasicMaterial({
      color: 0xffd27d,
    });

    this.darkWindow = new THREE.MeshToonMaterial({
      color: 0x202428,
      gradientMap: this.gradientMap,
    });

    // Stylized Water
    this.water = new THREE.MeshToonMaterial({
      color: 0x3ab0d8,
      gradientMap: this.softGradientMap,
      transparent: true,
      opacity: 0.88,
    });

    // Outlines & details
    this.outlineBlack = new THREE.MeshBasicMaterial({
      color: 0x262320,
      side: THREE.BackSide,
    });
  }
}
