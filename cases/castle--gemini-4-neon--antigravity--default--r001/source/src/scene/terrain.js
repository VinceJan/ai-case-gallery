import * as THREE from 'three';
import {
  PALETTE,
  ENV_UNIFORMS,
  getTextures,
  createToonMaterial,
} from './materials.js';

export const BASE_SIZE = 24;
export const BASE_HALF = BASE_SIZE / 2;
export const BASE_CORNER_R = 1.35;
export const BASE_DEPTH = 2.6;

export const VILLAGE_Y = 1.45;
export const WINDMILL_Y = 1.75;
export const CASTLE_Y = 3.25;
export const MOAT_WATER_Y = 1.05;
export const CANAL_WATER_Y = -0.16;

// Helper to create a 2D rounded rectangle Shape centered at (0,0)
export function createRoundedRectShape(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

// Helper: extruded rounded-corner plateau lying horizontally (extruded along +Y)
function createHorizontalRoundedBox(width, depth, height, radius, bevel = 0.08, planarMasonryUV = false) {
  const shape = createRoundedRectShape(width, depth, radius);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 10,
  });
  // ExtrudeGeometry extrudes along +Z; rotate -90 deg around X so extrusion goes along +Y
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  const pos = geo.attributes.position;
  const norm = geo.attributes.normal;
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    if (planarMasonryUV) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const pz = pos.getZ(i);
      const nx = Math.abs(norm.getX(i));
      const ny = Math.abs(norm.getY(i));
      if (ny > 0.65) {
        uv.setXY(i, px * 0.08, pz * 0.08);
      } else if (nx > 0.5) {
        uv.setXY(i, pz * 0.09, py * 0.34);
      } else {
        uv.setXY(i, px * 0.09, py * 0.34);
      }
    } else {
      uv.setXY(i, uv.getX(i) * 0.14, uv.getY(i) * 0.14);
    }
  }
  uv.needsUpdate = true;
  return geo;
}

/**
 * Custom stylized cel-shaded water shader with gentle wave ripples,
 * shoreline sparkle glints, and weather-reactive raindrop rings!
 */
function createWaterMaterial(waterUniforms) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: ENV_UNIFORMS.uTime,
      uWindStrength: ENV_UNIFORMS.uWindStrength,
      uRainIntensity: waterUniforms.uRainIntensity,
      uSnowAmount: ENV_UNIFORMS.uSnowAmount,
      uShallowColor: { value: new THREE.Color(PALETTE.waterShallow) },
      uDeepColor: { value: new THREE.Color(PALETTE.waterDeep) },
      uLightColor: { value: new THREE.Color(0xfff4df) },
      uSunDir: { value: new THREE.Vector3(0.55, 0.78, 0.45).normalize() },
    },
    transparent: true,
    side: THREE.DoubleSide,
    vertexShader: `
      uniform float uTime;
      uniform float uWindStrength;
      varying vec3 vWorldPos;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        float w = sin(worldPos.x * 2.1 + uTime * 1.9) * cos(worldPos.z * 2.4 - uTime * 1.5);
        pos.y += w * 0.022 * (0.7 + uWindStrength * 0.35);
        worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uWindStrength;
      uniform float uRainIntensity;
      uniform float uSnowAmount;
      uniform vec3 uShallowColor;
      uniform vec3 uDeepColor;
      uniform vec3 uLightColor;
      uniform vec3 uSunDir;
      varying vec3 vWorldPos;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 p = vWorldPos.xz;

        // Layered toon ripple bands
        float r1 = sin(p.x * 3.4 + p.y * 1.6 + uTime * 1.8);
        float r2 = cos(p.x * 2.3 - p.y * 3.1 - uTime * 1.35);
        float ripple = (r1 + r2) * 0.5;

        // Quantized cel water color bands
        float band = smoothstep(-0.2, 0.25, ripple);
        vec3 baseCol = mix(uDeepColor, uShallowColor, 0.38 + band * 0.48);

        // Cool winter tint when snowing
        baseCol = mix(baseCol, vec3(0.68, 0.80, 0.88), uSnowAmount * 0.48);

        // Crisp stylized specular glint streaks
        float glintWave = sin(p.x * 6.5 - p.y * 4.5 + uTime * 2.6) * cos(p.x * 4.2 + p.y * 6.8 - uTime * 2.1);
        float sparkle = smoothstep(0.74, 0.88, glintWave);
        baseCol = mix(baseCol, vec3(0.95, 0.99, 1.0), sparkle * 0.52);

        // Subtle animated foam lines near channel borders
        float edgeFoam = smoothstep(0.42, 0.5, abs(vUv.y - 0.5));
        float foamBreak = step(0.15, sin(p.x * 7.0 + p.y * 7.0 + uTime * 2.2));
        baseCol = mix(baseCol, vec3(0.92, 0.97, 0.99), edgeFoam * foamBreak * 0.42);

        // Raindrop expanding concentric rings when raining
        if (uRainIntensity > 0.02) {
          vec2 cell = floor(p * 1.65);
          vec2 local = fract(p * 1.65) - 0.5;
          float h = hash(cell);
          float t = fract(uTime * 1.35 + h * 6.0);
          float dist = length(local);
          float ring = smoothstep(0.055, 0.01, abs(dist - t * 0.42)) * (1.0 - t);
          baseCol = mix(baseCol, vec3(0.92, 0.96, 1.0), ring * uRainIntensity * 0.72);
        }

        // Tint lightly by current light color (dusk / night / sunny)
        baseCol *= mix(vec3(1.0), uLightColor, 0.45);

        gl_FragColor = vec4(baseCol, 0.88);
      }
    `,
  });
}

/**
 * Helper to create a stone staircase from (yBottom) to (yTop) along +Z or -Z or +X.
 */
function createStoneStairs({
  width,
  depth,
  height,
  steps = 7,
  stoneMat,
  trimMat,
  cheekWalls = true,
}) {
  const group = new THREE.Group();
  const stepH = height / steps;
  const stepD = depth / steps;

  for (let i = 0; i < steps; i++) {
    const h = stepH * (i + 1);
    const geo = new THREE.BoxGeometry(width, h, stepD + 0.02);
    const mesh = new THREE.Mesh(geo, stoneMat);
    mesh.position.set(0, h / 2, -depth / 2 + stepD * (i + 0.5));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  if (cheekWalls) {
    const wallW = 0.24;
    const slopeLen = Math.hypot(depth, height);
    const slopeAngle = Math.atan2(height, depth);
    for (const side of [-1, 1]) {
      // Base triangle/stepped cheek
      const cheekBase = new THREE.Mesh(
        new THREE.BoxGeometry(wallW, height * 0.65, depth + 0.08),
        stoneMat
      );
      cheekBase.position.set(side * (width / 2 + wallW / 2), height * 0.325, 0);
      cheekBase.castShadow = true;
      cheekBase.receiveShadow = true;
      group.add(cheekBase);

      // Sloped capstone rail
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(wallW + 0.08, 0.16, slopeLen + 0.15),
        trimMat
      );
      rail.position.set(side * (width / 2 + wallW / 2), height * 0.55 + 0.22, 0);
      rail.rotation.x = -slopeAngle;
      rail.castShadow = true;
      rail.receiveShadow = true;
      group.add(rail);

      // End stone pillar post at bottom of stairs
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(wallW + 0.12, 0.65, wallW + 0.12),
        trimMat
      );
      post.position.set(side * (width / 2 + wallW / 2), 0.325, -depth / 2 - 0.05);
      post.castShadow = true;
      post.receiveShadow = true;
      group.add(post);
    }
  }

  return group;
}

export function buildTerrain(waterUniforms) {
  const textures = getTextures();
  const group = new THREE.Group();
  group.name = 'TerrainAndBase';

  // Materials
  const baseSideMat = createToonMaterial({
    color: 0xffffff,
    map: textures.baseMasonry,
    snowable: false,
  });
  const baseTrimMat = createToonMaterial({
    color: PALETTE.baseTrim,
    snowable: true,
    snowThreshold: 0.65,
  });
  const grassMat = createToonMaterial({
    color: 0xffffff,
    map: textures.grass,
    snowable: true,
    snowThreshold: 0.55,
  });
  const grassRichMat = createToonMaterial({
    color: PALETTE.grassMid,
    snowable: true,
    snowThreshold: 0.55,
  });
  const retainingMat = createToonMaterial({
    color: 0xffffff,
    map: textures.retainingStone,
    snowable: true,
    snowThreshold: 0.72,
  });
  const castleRetainMat = createToonMaterial({
    color: 0xf4eee4,
    map: textures.castleStone,
    snowable: true,
    snowThreshold: 0.72,
  });
  const stoneTrimMat = createToonMaterial({
    color: PALETTE.castleTrim,
    snowable: true,
    snowThreshold: 0.55,
  });
  const cobbleMat = createToonMaterial({
    color: 0xffffff,
    map: textures.cobble,
    snowable: true,
    snowThreshold: 0.62,
  });
  const pathDirtMat = createToonMaterial({
    color: PALETTE.pathDirt,
    snowable: true,
    snowThreshold: 0.6,
  });
  const canalBedMat = createToonMaterial({
    color: 0x5c6862,
    snowable: false,
  });
  const stoneWallDarkMat = createToonMaterial({
    color: 0x8e867c,
    snowable: true,
    snowThreshold: 0.6,
  });

  // =========================================================================
  // 1. SQUARE STONE-MASONRY DIORAMA BASE (24x24 with slightly rounded corners)
  // =========================================================================
  // Lower solid plinth sits cleanly BELOW the recessed canal bed (top at y = -0.50)
  const plinthLowerH = BASE_DEPTH - 0.62;
  const plinthGeo = createHorizontalRoundedBox(
    BASE_SIZE,
    BASE_SIZE,
    plinthLowerH,
    BASE_CORNER_R,
    0.08,
    true
  );
  const plinth = new THREE.Mesh(plinthGeo, baseSideMat);
  plinth.position.y = -BASE_DEPTH + 0.08;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Upper outer masonry skirt band (from y = -0.52 up to y = -0.02) with a notch on +X for the canal outlet!
  const skirtOuter = createRoundedRectShape(BASE_SIZE, BASE_SIZE, BASE_CORNER_R);
  const skirtInner = createRoundedRectShape(BASE_SIZE - 0.52, BASE_SIZE - 0.52, BASE_CORNER_R - 0.18);
  skirtOuter.holes.push(skirtInner);
  const skirtGeo = new THREE.ExtrudeGeometry(skirtOuter, {
    depth: 0.5,
    bevelEnabled: false,
    curveSegments: 10,
  });
  skirtGeo.rotateX(-Math.PI / 2);
  skirtGeo.computeVertexNormals();
  const skPos = skirtGeo.attributes.position;
  const skNorm = skirtGeo.attributes.normal;
  const skUv = skirtGeo.attributes.uv;
  for (let i = 0; i < skUv.count; i++) {
    const nx = Math.abs(skNorm.getX(i));
    skUv.setXY(i, (nx > 0.5 ? skPos.getZ(i) : skPos.getX(i)) * 0.09, skPos.getY(i) * 0.34);
  }
  const skirtMesh = new THREE.Mesh(skirtGeo, baseSideMat);
  skirtMesh.position.y = -0.54;
  skirtMesh.receiveShadow = true;
  group.add(skirtMesh);

  // Subtle carved stone molding lip at bottom of plinth
  const bottomLipGeo = createHorizontalRoundedBox(
    BASE_SIZE + 0.28,
    BASE_SIZE + 0.28,
    0.26,
    BASE_CORNER_R + 0.12,
    0.05
  );
  const bottomLip = new THREE.Mesh(bottomLipGeo, baseTrimMat);
  bottomLip.position.y = -BASE_DEPTH - 0.08;
  bottomLip.receiveShadow = true;
  group.add(bottomLip);

  // Upper carved stone curb around the perimeter of the diorama top
  const upperRimOuter = createRoundedRectShape(
    BASE_SIZE + 0.18,
    BASE_SIZE + 0.18,
    BASE_CORNER_R + 0.08
  );
  const upperRimHole = createRoundedRectShape(
    BASE_SIZE - 0.36,
    BASE_SIZE - 0.36,
    BASE_CORNER_R - 0.12
  );
  upperRimOuter.holes.push(upperRimHole);
  const upperRimGeo = new THREE.ExtrudeGeometry(upperRimOuter, {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 2,
    curveSegments: 10,
  });
  upperRimGeo.rotateX(-Math.PI / 2);
  const upperRim = new THREE.Mesh(upperRimGeo, baseTrimMat);
  upperRim.position.y = -0.14;
  upperRim.castShadow = true;
  upperRim.receiveShadow = true;
  group.add(upperRim);

  // Decorative vertical stone corner quoins on the 4 rounded base corners
  const cornerCoords = [
    [-BASE_HALF + 0.55, -BASE_HALF + 0.55],
    [BASE_HALF - 0.55, -BASE_HALF + 0.55],
    [-BASE_HALF + 0.55, BASE_HALF - 0.55],
    [BASE_HALF - 0.55, BASE_HALF - 0.55],
  ];
  for (const [cx, cz] of cornerCoords) {
    for (let row = 0; row < 4; row++) {
      const q = new THREE.Mesh(
        new THREE.CylinderGeometry(0.92, 0.92, 0.42, 12),
        row % 2 === 0 ? baseTrimMat : retainingMat
      );
      q.position.set(cx, -BASE_DEPTH + 0.45 + row * 0.58, cz);
      q.receiveShadow = true;
      group.add(q);
    }
  }

  // =========================================================================
  // 2. TIER 1: MEADOW GROUND SURFACE (with clean recessed Irrigation Canal)
  // =========================================================================
  // Build grass ground in clean non-overlapping slabs around the recessed irrigation canal
  // Canal runs:
  //   Vertical leg: x in [-7.35, -6.25], z in [-2.4, +6.95]
  //   Horizontal leg: x in [-6.8, +12.0], z in [5.85, 6.95]
  const groundTopThickness = 0.42;

  function addGrassSlab(xMin, xMax, zMin, zMax, yTop = 0.0, mat = grassMat) {
    const w = xMax - xMin;
    const d = zMax - zMin;
    if (w <= 0.01 || d <= 0.01) return;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, groundTopThickness, d),
      mat
    );
    mesh.position.set((xMin + xMax) / 2, yTop - groundTopThickness / 2, (zMin + zMax) / 2);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // Rounded outer meadow skirt right inside the curb (sits slightly recessed as canal bed base)
  const bedShape = createRoundedRectShape(
    BASE_SIZE - 0.34,
    BASE_SIZE - 0.34,
    BASE_CORNER_R - 0.14
  );
  const bedGeo = new THREE.ExtrudeGeometry(bedShape, {
    depth: 0.18,
    bevelEnabled: false,
    curveSegments: 10,
  });
  bedGeo.rotateX(-Math.PI / 2);
  const bedMesh = new THREE.Mesh(bedGeo, canalBedMat);
  bedMesh.position.y = -0.58;
  bedMesh.receiveShadow = true;
  group.add(bedMesh);

  // Rear & middle-left/right grass pads (y = 0.0)
  // Left of vertical canal leg: x in [-11.75, -7.35], z in [-11.75, +11.75]
  const leftClip = 11.65;
  // Main grass shape WITH a cutout hole for the L-shaped irrigation canal!
  const meadowShape = createRoundedRectShape(
    BASE_SIZE - 0.38,
    BASE_SIZE - 0.38,
    BASE_CORNER_R - 0.16
  );

  // Cut out the L-shaped canal opening directly from the meadow surface shape
  // Note: ExtrudeGeometry rotates -PI/2 around X, so shape.y maps to world -Z!
  // Thus world z -> shape y = -z.
  const canalHole = new THREE.Path();
  // Canal spans:
  // Vertical leg: x: -7.35 .. -6.25, z: -2.6 .. +6.95  => shape y: +2.6 .. -6.95
  // Horizontal leg: x: -7.35 .. +11.72, z: +5.85 .. +6.95 => shape y: -5.85 .. -6.95
  canalHole.moveTo(-7.35, 2.6);
  canalHole.lineTo(-6.25, 2.6);
  canalHole.lineTo(-6.25, -5.85);
  canalHole.lineTo(11.72, -5.85);
  canalHole.lineTo(11.72, -6.95);
  canalHole.lineTo(-7.35, -6.95);
  canalHole.closePath();
  meadowShape.holes.push(canalHole);

  const meadowGeo = new THREE.ExtrudeGeometry(meadowShape, {
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 1,
    curveSegments: 10,
  });
  meadowGeo.rotateX(-Math.PI / 2);
  // Tile UVs nicely across world units
  const mUv = meadowGeo.attributes.uv;
  for (let i = 0; i < mUv.count; i++) {
    mUv.setXY(i, mUv.getX(i) * 0.08, mUv.getY(i) * 0.08);
  }
  meadowGeo.computeVertexNormals();
  const meadowMesh = new THREE.Mesh(meadowGeo, grassMat);
  meadowMesh.position.y = -0.44;
  meadowMesh.receiveShadow = true;
  group.add(meadowMesh);

  // Stone edging blocks lining the irrigation canal banks
  const bankSegments = [
    // Horizontal north bank (x: -6.25 -> 11.7, z = 5.82)
    { x: 2.72, z: 5.82, w: 17.95, d: 0.16 },
    // Horizontal south bank (x: -7.35 -> 11.7, z = 6.98)
    { x: 2.18, z: 6.98, w: 19.05, d: 0.16 },
    // Vertical west bank (x = -7.38, z: -2.5 -> 7.0)
    { x: -7.38, z: 2.25, w: 0.16, d: 9.5 },
    // Vertical east bank (x = -6.22, z: -2.5 -> 5.85)
    { x: -6.22, z: 1.68, w: 0.16, d: 8.35 },
  ];
  for (const b of bankSegments) {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(b.w, 0.52, b.d),
      stoneWallDarkMat
    );
    wall.position.set(b.x, -0.22, b.z);
    wall.castShadow = true;
    wall.receiveShadow = true;
    group.add(wall);
  }

  // Subtle stepped green lawn hillock on the rear-left and rear-right woodland flanks
  const leftHill = new THREE.Mesh(
    createHorizontalRoundedBox(4.0, 6.2, 0.72, 1.1, 0.06),
    grassRichMat
  );
  leftHill.position.set(-9.5, 0.0, -7.2);
  leftHill.receiveShadow = true;
  group.add(leftHill);

  const rightHill = new THREE.Mesh(
    createHorizontalRoundedBox(4.0, 6.6, 0.85, 1.1, 0.06),
    grassRichMat
  );
  rightHill.position.set(9.5, 0.0, -7.0);
  rightHill.receiveShadow = true;
  group.add(rightHill);

  // =========================================================================
  // 3. TIER 2: VILLAGE CENTRAL TERRACE + WINDMILL KNOLL + RETAINING WALLS
  // =========================================================================
  // Main Village Stone Retaining Terrace: x in [-6.15, +6.25], z in [-3.45, +3.25], y = 0..1.45
  const vW = 12.4;
  const vD = 6.7;
  const vCenterX = 0.05;
  const vCenterZ = -0.1;

  const villageWallGeo = createHorizontalRoundedBox(vW, vD, VILLAGE_Y - 0.12, 0.65, 0.05);
  const villageBase = new THREE.Mesh(villageWallGeo, retainingMat);
  villageBase.position.set(vCenterX, 0.0, vCenterZ);
  villageBase.castShadow = true;
  villageBase.receiveShadow = true;
  group.add(villageBase);

  // Grass cap on top of village terrace
  const villageGrassGeo = createHorizontalRoundedBox(vW + 0.12, vD + 0.12, 0.16, 0.68, 0.03);
  const villageGrass = new THREE.Mesh(villageGrassGeo, grassMat);
  villageGrass.position.set(vCenterX, VILLAGE_Y - 0.16, vCenterZ);
  villageGrass.receiveShadow = true;
  group.add(villageGrass);

  // Stone buttresses along the front village retaining wall (adds miniature craftsmanship!)
  for (const bx of [-5.2, -3.5, -1.75, 1.75, 3.6, 5.3]) {
    const buttress = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, VILLAGE_Y - 0.06, 0.34),
      stoneTrimMat
    );
    buttress.position.set(bx, (VILLAGE_Y - 0.06) / 2, 3.28);
    buttress.castShadow = true;
    buttress.receiveShadow = true;
    group.add(buttress);
  }

  // Central Cobblestone Village Plaza (flush slightly above grass at VILLAGE_Y + 0.02)
  const plazaGeo = createHorizontalRoundedBox(5.2, 5.5, 0.06, 0.85, 0.01);
  const plaza = new THREE.Mesh(plazaGeo, cobbleMat);
  plaza.position.set(0.0, VILLAGE_Y - 0.02, 0.45);
  plaza.receiveShadow = true;
  group.add(plaza);

  // Side cobblestone lane to windmill knoll & smithy
  const sideLane = new THREE.Mesh(
    createHorizontalRoundedBox(9.2, 1.5, 0.05, 0.35, 0.01),
    cobbleMat
  );
  sideLane.position.set(0.1, VILLAGE_Y - 0.02, 0.65);
  sideLane.receiveShadow = true;
  group.add(sideLane);

  // Windmill Breezy Knoll (Right Shoulder of Village): x in [6.0, 9.7], z in [-2.3, +2.0], y = WINDMILL_Y
  const windmillKnoll = new THREE.Mesh(
    createHorizontalRoundedBox(3.7, 4.3, WINDMILL_Y - 0.14, 0.95, 0.05),
    retainingMat
  );
  windmillKnoll.position.set(7.85, 0.0, -0.15);
  windmillKnoll.castShadow = true;
  windmillKnoll.receiveShadow = true;
  group.add(windmillKnoll);

  const windmillGrass = new THREE.Mesh(
    createHorizontalRoundedBox(3.84, 4.44, 0.18, 0.98, 0.03),
    grassMat
  );
  windmillGrass.position.set(7.85, WINDMILL_Y - 0.18, -0.15);
  windmillGrass.receiveShadow = true;
  group.add(windmillGrass);

  // Short 3-step stone stair connecting village terrace (1.45) to windmill knoll (1.75)
  const windmillSteps = createStoneStairs({
    width: 1.3,
    depth: 0.72,
    height: WINDMILL_Y - VILLAGE_Y,
    steps: 3,
    stoneMat: stoneTrimMat,
    trimMat: baseTrimMat,
    cheekWalls: false,
  });
  windmillSteps.rotation.y = Math.PI / 2;
  windmillSteps.position.set(6.15, VILLAGE_Y, 0.55);
  group.add(windmillSteps);

  // Front Grand Stone Stairs descending from Village Plaza (z=3.25, y=1.45) to Knight Plaza (z=4.75, y=0.0)
  const frontStairs = createStoneStairs({
    width: 2.0,
    depth: 1.55,
    height: VILLAGE_Y,
    steps: 7,
    stoneMat: stoneTrimMat,
    trimMat: baseTrimMat,
    cheekWalls: true,
  });
  frontStairs.rotation.y = Math.PI; // descends toward +Z
  frontStairs.position.set(0.0, 0.0, 4.02);
  group.add(frontStairs);

  // Eastern farm stairs descending from village right edge to the barn & pastures
  const eastStairs = createStoneStairs({
    width: 1.25,
    depth: 1.45,
    height: VILLAGE_Y,
    steps: 6,
    stoneMat: stoneTrimMat,
    trimMat: baseTrimMat,
    cheekWalls: true,
  });
  eastStairs.rotation.y = Math.PI;
  eastStairs.position.set(4.5, 0.0, 3.98);
  group.add(eastStairs);

  // =========================================================================
  // 4. TIER 3: CASTLE HIGH CITADEL PLATEAU + MOAT BASIN + APPROACH STAIRS
  // =========================================================================
  // Moat surrounding basin walls: moat occupies x in [-7.4, +7.4], z in [-10.6, -3.45]
  // Outer moat embankment walls holding the water neatly at y = MOAT_WATER_Y (1.05)
  const moatRimOuter = createRoundedRectShape(15.2, 7.6, 0.9);
  const moatRimInner = createRoundedRectShape(14.2, 6.7, 0.65);
  moatRimOuter.holes.push(moatRimInner);
  const moatRimGeo = new THREE.ExtrudeGeometry(moatRimOuter, {
    depth: 1.32,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 1,
    curveSegments: 8,
  });
  moatRimGeo.rotateX(-Math.PI / 2);
  const moatRim = new THREE.Mesh(moatRimGeo, retainingMat);
  moatRim.position.set(0.0, 0.0, -7.25);
  moatRim.castShadow = true;
  moatRim.receiveShadow = true;
  group.add(moatRim);

  // Moat stone floor (under water at y = 0.42)
  const moatFloor = new THREE.Mesh(
    new THREE.BoxGeometry(14.4, 0.45, 6.9),
    canalBedMat
  );
  moatFloor.position.set(0.0, 0.22, -7.25);
  moatFloor.receiveShadow = true;
  group.add(moatFloor);

  // Castle Citadel Fortified Plateau (x in [-5.6, +5.6], z in [-10.2, -5.05], y = 0..CASTLE_Y)
  const castlePlateau = new THREE.Mesh(
    createHorizontalRoundedBox(11.1, 5.1, CASTLE_Y - 0.14, 0.55, 0.06),
    castleRetainMat
  );
  castlePlateau.position.set(0.0, 0.0, -7.65);
  castlePlateau.castShadow = true;
  castlePlateau.receiveShadow = true;
  group.add(castlePlateau);

  // Castle stone courtyard paving top
  const castleTopPad = new THREE.Mesh(
    createHorizontalRoundedBox(11.24, 5.24, 0.18, 0.58, 0.03),
    cobbleMat
  );
  castleTopPad.position.set(0.0, CASTLE_Y - 0.18, -7.65);
  castleTopPad.receiveShadow = true;
  group.add(castleTopPad);

  // Battered stone buttresses along the castle plateau walls rising out of the moat
  for (const bx of [-4.5, -2.5, 2.5, 4.5]) {
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, CASTLE_Y - 0.2, 0.45),
      stoneTrimMat
    );
    b.position.set(bx, (CASTLE_Y - 0.2) / 2, -5.05);
    b.castShadow = true;
    b.receiveShadow = true;
    group.add(b);
  }

  // Castle Approach Grand Stone Staircase climbing from Village Plaza (z=-1.65, y=1.45)
  // up to the Moat Barbican Bridgehead Landing (z=-3.55, y=CASTLE_Y)
  const castleStairs = createStoneStairs({
    width: 1.85,
    depth: 1.75,
    height: CASTLE_Y - VILLAGE_Y,
    steps: 8,
    stoneMat: stoneTrimMat,
    trimMat: baseTrimMat,
    cheekWalls: true,
  });
  // default climbs toward +Z; rotate PI so it climbs toward -Z (up to castle)
  castleStairs.rotation.y = Math.PI;
  // Wait: in createStoneStairs, i=0 (lowest) is at -depth/2, i=steps-1 (highest) is at +depth/2.
  // So unrotated climbs toward +Z. Rotating PI makes lowest at +depth/2 (village side) and highest at -depth/2 (castle side)!
  castleStairs.position.set(0.0, VILLAGE_Y, -2.42);
  group.add(castleStairs);

  // Fortified Stone Bridgehead Landing right on the moat front edge (z = -3.65, y = CASTLE_Y)
  const bridgehead = new THREE.Mesh(
    new THREE.BoxGeometry(2.35, CASTLE_Y, 0.78),
    castleRetainMat
  );
  bridgehead.position.set(0.0, CASTLE_Y / 2, -3.62);
  bridgehead.castShadow = true;
  bridgehead.receiveShadow = true;
  group.add(bridgehead);

  // Low stone parapets on bridgehead sides
  for (const side of [-1, 1]) {
    const para = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.42, 0.76),
      stoneTrimMat
    );
    para.position.set(side * 1.05, CASTLE_Y + 0.21, -3.62);
    para.castShadow = true;
    group.add(para);
  }

  // =========================================================================
  // 5. ANIMATED WATER (Moat, Waterfall Spillway, Irrigation Canal, Edge Slice)
  // =========================================================================
  const waterMat = createWaterMaterial(waterUniforms);

  // Moat water sheet
  const moatWater = new THREE.Mesh(
    new THREE.PlaneGeometry(14.2, 6.7, 28, 16),
    waterMat
  );
  moatWater.rotation.x = -Math.PI / 2;
  moatWater.position.set(0.0, MOAT_WATER_Y, -7.25);
  moatWater.userData.noOutline = true;
  group.add(moatWater);

  // Stone sluice channel pouring from moat left corner (-6.8, -3.8) down to watermill wheel (-6.8, -2.2)
  const sluiceTrough = new THREE.Mesh(
    new THREE.BoxGeometry(0.86, 0.35, 1.85),
    stoneWallDarkMat
  );
  sluiceTrough.position.set(-6.8, 0.85, -3.15);
  sluiceTrough.castShadow = true;
  sluiceTrough.receiveShadow = true;
  group.add(sluiceTrough);

  const sluiceWater = new THREE.Mesh(
    new THREE.PlaneGeometry(0.56, 1.8, 4, 8),
    waterMat
  );
  sluiceWater.rotation.x = -Math.PI / 2;
  sluiceWater.position.set(-6.8, 1.04, -3.15);
  sluiceWater.userData.noOutline = true;
  group.add(sluiceWater);

  // Sparkling angled waterfall curtain cascading into the watermill race
  const waterfall = new THREE.Mesh(
    new THREE.PlaneGeometry(0.54, 1.28, 4, 10),
    waterMat
  );
  waterfall.position.set(-6.8, 0.44, -2.14);
  waterfall.rotation.x = -0.2;
  waterfall.userData.noOutline = true;
  group.add(waterfall);

  // Irrigation Canal water — Vertical leg (x = -6.8, z: -2.55 .. +6.92)
  const canalWaterV = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 9.45, 6, 26),
    waterMat
  );
  canalWaterV.rotation.x = -Math.PI / 2;
  canalWaterV.position.set(-6.8, CANAL_WATER_Y, 2.2);
  canalWaterV.userData.noOutline = true;
  group.add(canalWaterV);

  // Irrigation Canal water — Horizontal leg (x: -6.28 .. +11.82, z = 6.4)
  const canalWaterH = new THREE.Mesh(
    new THREE.PlaneGeometry(18.1, 1.08, 36, 6),
    waterMat
  );
  canalWaterH.rotation.x = -Math.PI / 2;
  canalWaterH.position.set(2.77, CANAL_WATER_Y, 6.4);
  canalWaterH.userData.noOutline = true;
  group.add(canalWaterH);

  // Clean vertical water cross-section slice on the right edge of the diorama base!
  const waterSliceMat = new THREE.MeshBasicMaterial({
    color: PALETTE.waterShallow,
    transparent: true,
    opacity: 0.92,
  });
  const waterSlice = new THREE.Mesh(
    new THREE.PlaneGeometry(1.12, 0.38),
    waterSliceMat
  );
  waterSlice.rotation.y = Math.PI / 2;
  waterSlice.position.set(BASE_HALF + 0.04, -0.34, 6.4);
  waterSlice.userData.noOutline = true;
  group.add(waterSlice);

  // =========================================================================
  // 6. WINDING DIRT & COBBLESTONE FOOTPATHS (小径)
  // =========================================================================
  function addPathSegment(x, z, w, d, rotY = 0, y = 0.018, mat = pathDirtMat) {
    const seg = new THREE.Mesh(
      createHorizontalRoundedBox(w, d, 0.04, Math.min(w, d) * 0.42, 0.005),
      mat
    );
    seg.position.set(x, y, z);
    seg.rotation.y = rotY;
    seg.receiveShadow = true;
    group.add(seg);
  }

  // Front entrance sunlit cobblestone-dirt plaza (where the Chibi Pixel Knight patrols!)
  addPathSegment(0.0, 5.25, 3.7, 1.15, 0, 0.015, cobbleMat);
  // Path continuing south from the front canal bridge through the middle of the wheat fields
  addPathSegment(0.0, 8.95, 1.45, 3.8, 0, 0.015, pathDirtMat);
  // Path branching east from front plaza toward barn & eastern stairs
  addPathSegment(3.1, 5.05, 3.6, 0.95, 0.06, 0.014, pathDirtMat);
  addPathSegment(5.4, 4.7, 1.8, 1.35, -0.1, 0.014, pathDirtMat);
  // Path branching west from front plaza toward upper-left wheat patch & watermill bridge
  addPathSegment(-3.3, 5.15, 3.6, 0.9, -0.05, 0.014, pathDirtMat);
  addPathSegment(-5.2, 3.5, 1.0, 3.2, 0.22, 0.014, pathDirtMat);
  // Stepping stones accenting the dirt lane
  const steppingStones = [
    [-0.25, 7.6], [0.22, 8.15], [-0.18, 8.75], [0.24, 9.35], [-0.12, 9.95],
    [2.2, 5.1], [3.2, 5.0], [4.2, 4.9], [-2.1, 5.15], [-3.2, 5.15],
  ];
  for (const [sx, sz] of steppingStones) {
    const stone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.28, 0.05, 7),
      stoneTrimMat
    );
    stone.position.set(sx, 0.032, sz);
    stone.scale.set(1.15, 1, 0.85);
    stone.rotation.y = sx * 1.7 + sz;
    stone.receiveShadow = true;
    group.add(stone);
  }

  return {
    group,
    waterMat,
    update(dt, lightColor) {
      if (lightColor) {
        waterMat.uniforms.uLightColor.value.copy(lightColor);
      }
    },
  };
}
