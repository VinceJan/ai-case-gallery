import * as THREE from 'three';
import { PALETTE, CONFIG } from './constants.js';
import { getToonMaterial, createWaterMaterial } from './materials.js';

// Procedurally generate a stylized ashlar stone masonry texture for the base sides
function createStoneMasonryTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Base stone tone
  ctx.fillStyle = '#4c525d';
  ctx.fillRect(0, 0, 512, 256);

  // Stone block rows
  const rows = 8;
  const rowHeight = 256 / rows;

  for (let r = 0; r < rows; r++) {
    const y = r * rowHeight;
    const offset = (r % 2) * 32;
    const blockWidth = 64;

    for (let x = -offset; x < 512 + blockWidth; x += blockWidth) {
      // Subtle color variations per stone
      const shade = 70 + Math.floor(Math.sin(r * 3 + x) * 15);
      const hexShade = shade.toString(16).padStart(2, '0');
      ctx.fillStyle = `#${hexShade}${hexShade}${hexShade}`;
      ctx.fillRect(x + 2, y + 2, blockWidth - 4, rowHeight - 4);

      // Stone highlight top-left
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(x + 2, y + 2, blockWidth - 4, 3);
      ctx.fillRect(x + 2, y + 2, 3, rowHeight - 4);

      // Stone shadow bottom-right
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(x + 2, y + rowHeight - 5, blockWidth - 4, 3);
      ctx.fillRect(x + blockWidth - 5, y + 2, 3, rowHeight - 4);
    }
  }

  // Dark mortar lines
  ctx.strokeStyle = '#292c33';
  ctx.lineWidth = 3;
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * rowHeight);
    ctx.lineTo(512, r * rowHeight);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

export function buildDioramaBase() {
  const baseGroup = new THREE.Group();
  baseGroup.name = 'DioramaBase';

  const size = CONFIG.BASE_SIZE;
  const halfSize = size / 2;
  const radius = CONFIG.BASE_CORNER_RADIUS;
  const height = CONFIG.BASE_HEIGHT;

  // 1. Create rounded rectangle 2D shape for the diorama slab
  const shape = new THREE.Shape();
  shape.moveTo(-halfSize + radius, -halfSize);
  shape.lineTo(halfSize - radius, -halfSize);
  shape.quadraticCurveTo(halfSize, -halfSize, halfSize, -halfSize + radius);
  shape.lineTo(halfSize, halfSize - radius);
  shape.quadraticCurveTo(halfSize, halfSize, halfSize - radius, halfSize);
  shape.lineTo(-halfSize + radius, halfSize);
  shape.quadraticCurveTo(-halfSize, halfSize, -halfSize, halfSize - radius);
  shape.lineTo(-halfSize, -halfSize + radius);
  shape.quadraticCurveTo(-halfSize, -halfSize, -halfSize + radius, -halfSize);

  // Extrude the slab downward from Y = 0 to Y = -height
  const extrudeSettings = {
    steps: 1,
    depth: height,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.35,
    bevelThickness: 0.35
  };

  const slabGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  slabGeom.rotateX(Math.PI / 2); // Orient horizontal
  slabGeom.translate(0, -height, 0);

  const stoneTex = createStoneMasonryTexture();
  const sideMat = new THREE.MeshToonMaterial({
    map: stoneTex,
    color: PALETTE.BASE_STONE
  });

  const topMat = getToonMaterial(PALETTE.GRASS_LUSH);
  const slabMesh = new THREE.Mesh(slabGeom, [topMat, sideMat]);
  slabMesh.receiveShadow = true;
  baseGroup.add(slabMesh);

  // Dark polished wooden/slate plinth trim at the very bottom
  const plinthShape = new THREE.Shape();
  const pRadius = radius + 0.6;
  const pHalf = halfSize + 0.6;
  plinthShape.moveTo(-pHalf + pRadius, -pHalf);
  plinthShape.lineTo(pHalf - pRadius, -pHalf);
  plinthShape.quadraticCurveTo(pHalf, -pHalf, pHalf, -pHalf + pRadius);
  plinthShape.lineTo(pHalf, pHalf - pRadius);
  plinthShape.quadraticCurveTo(pHalf, pHalf, pHalf - pRadius, pHalf);
  plinthShape.lineTo(-pHalf + pRadius, pHalf);
  plinthShape.quadraticCurveTo(-pHalf, pHalf, -pHalf, pHalf - pRadius);
  plinthShape.lineTo(-pHalf, -pHalf + pRadius);
  plinthShape.quadraticCurveTo(-pHalf, -pHalf, -pHalf + pRadius, -pHalf);

  const plinthGeom = new THREE.ExtrudeGeometry(plinthShape, {
    depth: 0.8,
    bevelEnabled: true,
    bevelSize: 0.2,
    bevelThickness: 0.2
  });
  plinthGeom.rotateX(Math.PI / 2);
  plinthGeom.translate(0, -height - 0.4, 0);

  const plinthMat = getToonMaterial(PALETTE.BASE_PLINTH);
  const plinthMesh = new THREE.Mesh(plinthGeom, plinthMat);
  baseGroup.add(plinthMesh);

  // Top stone rim beveled border around the diorama perimeter
  const rimGeom = new THREE.RingGeometry(halfSize - 0.5, halfSize + 0.2, 4);
  rimGeom.rotateX(-Math.PI / 2);

  // Build the Tiered Terraced Terrain (前低后高)
  buildTieredTerrain(baseGroup);

  return baseGroup;
}

// Build the multi-tiered landscape (Farmland, Village, Castle Rock, Retaining walls, Steps, Trails)
function buildTieredTerrain(parent) {
  const terrainGroup = new THREE.Group();
  terrainGroup.name = 'TerrainGroup';

  // --- TIER 0: Farmland Ground (Front & Wings: Y = 0 to 1.5) ---
  // Layered green terrain blocks with soft stepped borders
  const farmPlateauGeom = new THREE.BoxGeometry(47, 1.2, 22);
  farmPlateauGeom.translate(0, 0.6, 12);
  const farmMesh = new THREE.Mesh(farmPlateauGeom, getToonMaterial(PALETTE.GRASS_LUSH));
  farmMesh.receiveShadow = true;
  terrainGroup.add(farmMesh);

  // Left wing terrace (rolling orchard & sheep pasture)
  const leftWingGeom = new THREE.BoxGeometry(11, 1.4, 18);
  leftWingGeom.translate(-18, 0.7, 0);
  const leftWing = new THREE.Mesh(leftWingGeom, getToonMaterial(PALETTE.GRASS_LUSH));
  leftWing.receiveShadow = true;
  terrainGroup.add(leftWing);

  // Right wing terrace (windmill rise & wheat strip)
  const rightWingGeom = new THREE.BoxGeometry(12, 1.6, 18);
  rightWingGeom.translate(17.5, 0.8, 0);
  const rightWing = new THREE.Mesh(rightWingGeom, getToonMaterial(PALETTE.GRASS_DRY));
  rightWing.receiveShadow = true;
  terrainGroup.add(rightWing);

  // --- TIER 1: Village Terrace (Center: Y = 3.8) ---
  const villagePlateauGeom = new THREE.BoxGeometry(32, 2.6, 14);
  villagePlateauGeom.translate(0, 2.5, 0);
  const villagePlateau = new THREE.Mesh(villagePlateauGeom, getToonMaterial(PALETTE.GRASS_DRY));
  villagePlateau.receiveShadow = true;
  terrainGroup.add(villagePlateau);

  // Cobblestone Village Plaza / Central Road
  const plazaGeom = new THREE.BoxGeometry(18, 0.08, 9);
  plazaGeom.translate(0, 3.84, 0.5);
  const plazaMesh = new THREE.Mesh(plazaGeom, getToonMaterial(PALETTE.COBBLESTONE));
  plazaMesh.receiveShadow = true;
  terrainGroup.add(plazaMesh);

  // Cobblestone patches & worn dirt path extending down towards farmland
  const villagePathGeom = new THREE.BoxGeometry(4.5, 0.06, 10);
  villagePathGeom.translate(1.5, 1.24, 10.5);
  const villagePath = new THREE.Mesh(villagePathGeom, getToonMaterial(PALETTE.EARTH_PATH));
  villagePath.receiveShadow = true;
  terrainGroup.add(villagePath);

  // Meandering dirt path through the farmland
  const farmPathGeom = new THREE.BoxGeometry(3.5, 0.05, 14);
  farmPathGeom.rotateY(0.2);
  farmPathGeom.translate(-4, 1.23, 14);
  const farmPath = new THREE.Mesh(farmPathGeom, getToonMaterial(PALETTE.EARTH_PATH));
  farmPath.receiveShadow = true;
  terrainGroup.add(farmPath);

  // --- TIER 2: Castle High Rock Plateau (Rear: Y = 7.2) ---
  const castlePlateauGeom = new THREE.BoxGeometry(38, 4.0, 16);
  castlePlateauGeom.translate(0, 5.2, -14);
  const castlePlateau = new THREE.Mesh(castlePlateauGeom, getToonMaterial(PALETTE.CASTLE_STONE_DARK));
  castlePlateau.receiveShadow = true;
  terrainGroup.add(castlePlateau);

  // Castle inner courtyard paving
  const courtyardGeom = new THREE.BoxGeometry(32, 0.1, 14);
  courtyardGeom.translate(0, 7.25, -14);
  const courtyard = new THREE.Mesh(courtyardGeom, getToonMaterial(PALETTE.CASTLE_STONE_MID));
  courtyard.receiveShadow = true;
  terrainGroup.add(courtyard);

  // --- RETAINING WALLS (挡土墙) ---
  buildRetainingWalls(terrainGroup);

  // --- CONNECTING STONE STEPS (石阶) ---
  buildStoneStairs(terrainGroup);

  // --- CANALS & WATER CHANNELS (水渠与护城河凹陷) ---
  buildWaterChannels(terrainGroup);

  parent.add(terrainGroup);
}

// Retaining walls with stone blocks, buttresses, and coping
function buildRetainingWalls(parent) {
  const wallGroup = new THREE.Group();

  // 1. Lower retaining wall (between Farmland and Village, Z ~ 7)
  const lowerWallMat = getToonMaterial(PALETTE.CASTLE_STONE_MID);
  
  // Left section of lower retaining wall
  const lWall1 = new THREE.Mesh(new THREE.BoxGeometry(13, 2.6, 1.2), lowerWallMat);
  lWall1.position.set(-9.5, 2.5, 7.1);
  lWall1.castShadow = true;
  lWall1.receiveShadow = true;
  wallGroup.add(lWall1);

  // Right section of lower retaining wall
  const lWall2 = new THREE.Mesh(new THREE.BoxGeometry(13, 2.6, 1.2), lowerWallMat);
  lWall2.position.set(9.5, 2.5, 7.1);
  lWall2.castShadow = true;
  lWall2.receiveShadow = true;
  wallGroup.add(lWall2);

  // Stone buttress pillars on the retaining wall
  const buttressGeom = new THREE.BoxGeometry(1.2, 2.7, 1.6);
  const buttressPositions = [-15, -10, -5, 5, 10, 15];
  buttressPositions.forEach(x => {
    const buttress = new THREE.Mesh(buttressGeom, lowerWallMat);
    buttress.position.set(x, 2.55, 7.2);
    buttress.castShadow = true;
    wallGroup.add(buttress);
  });

  // Coping stones (protective capstones on top of retaining wall)
  const capstoneGeom = new THREE.BoxGeometry(13.4, 0.25, 1.5);
  const cap1 = new THREE.Mesh(capstoneGeom, getToonMaterial(PALETTE.CASTLE_STONE_LIGHT));
  cap1.position.set(-9.5, 3.85, 7.1);
  cap1.castShadow = true;
  const cap2 = cap1.clone();
  cap2.position.set(9.5, 3.85, 7.1);
  wallGroup.add(cap1, cap2);

  // 2. High cyclopean stone cliff/retaining wall (between Village and Castle, Z ~ -6)
  const highCliffGeom = new THREE.BoxGeometry(36, 3.8, 1.5);
  const highCliff = new THREE.Mesh(highCliffGeom, getToonMaterial(PALETTE.CASTLE_STONE_DARK));
  highCliff.position.set(0, 5.4, -6.2);
  highCliff.castShadow = true;
  highCliff.receiveShadow = true;
  wallGroup.add(highCliff);

  // Protective rampart corbels on the high cliff edge
  for (let x = -17; x <= 17; x += 3.4) {
    if (Math.abs(x) < 3.5) continue; // leave opening for bridge/gate
    const corbel = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 1.2, 1.2),
      getToonMaterial(PALETTE.CASTLE_STONE_LIGHT)
    );
    corbel.position.set(x, 6.8, -5.6);
    corbel.castShadow = true;
    wallGroup.add(corbel);
  }

  parent.add(wallGroup);
}

// Stone steps connecting the tiers
function buildStoneStairs(parent) {
  const stairGroup = new THREE.Group();
  const stepMat = getToonMaterial(PALETTE.CASTLE_STONE_LIGHT);

  // 1. Village to Farmland Central Stairs (at X ~ 0, Z = 7)
  const numStepsLower = 10;
  const stepWidth = 4.2;
  const stepDepth = 0.45;
  const stepHeight = 0.26;

  for (let i = 0; i < numStepsLower; i++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth),
      stepMat
    );
    step.position.set(0, 1.3 + i * stepHeight, 8.8 - i * stepDepth);
    step.castShadow = true;
    step.receiveShadow = true;
    stairGroup.add(step);
  }

  // Stone balustrade walls flanking the stairs
  const balustradeGeom = new THREE.BoxGeometry(0.5, 1.6, 4.8);
  const balustradeL = new THREE.Mesh(balustradeGeom, getToonMaterial(PALETTE.CASTLE_STONE_MID));
  balustradeL.position.set(-2.3, 2.5, 7.1);
  balustradeL.rotation.x = -0.42;
  balustradeL.castShadow = true;

  const balustradeR = balustradeL.clone();
  balustradeR.position.x = 2.3;
  stairGroup.add(balustradeL, balustradeR);

  // 2. Secondary side steps down from Village to Watermill on the left
  for (let i = 0; i < 7; i++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.24, 0.4),
      stepMat
    );
    step.position.set(-14.2, 1.4 + i * 0.24, 3.5 - i * 0.4);
    step.castShadow = true;
    stairGroup.add(step);
  }

  parent.add(stairGroup);
}

// Water channels: Stream flowing through village/farmland, and Castle Moat
function buildWaterChannels(parent) {
  const waterGroup = new THREE.Group();
  const waterMat = createWaterMaterial();

  // 1. Irrigation Stream (flowing from left mountain slope through village past watermill to front farmland pond)
  const streamGeom = new THREE.BoxGeometry(3.6, 0.3, 26);
  const streamMesh = new THREE.Mesh(streamGeom, waterMat);
  streamMesh.position.set(-16.5, 0.95, 6.0);
  streamMesh.receiveShadow = true;
  waterGroup.add(streamMesh);

  // Sunken stream bed banks (dark river stone)
  const riverbankMat = getToonMaterial(PALETTE.BASE_STONE_DARK);
  const bankL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 26), riverbankMat);
  bankL.position.set(-18.6, 1.0, 6.0);
  const bankR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 26), riverbankMat);
  bankR.position.set(-14.4, 1.0, 6.0);
  waterGroup.add(bankL, bankR);

  // 2. Castle Moat (front ditch Y = 6.4, width 3.6, length 28)
  const moatGeom = new THREE.BoxGeometry(30, 0.3, 4.0);
  const moatMesh = new THREE.Mesh(moatGeom, waterMat);
  moatMesh.position.set(0, 6.7, -6.5);
  moatMesh.receiveShadow = true;
  waterGroup.add(moatMesh);

  // Moat side extension (wrapping left and right castle sides)
  const moatLeftGeom = new THREE.BoxGeometry(3.6, 0.3, 14);
  const moatLeft = new THREE.Mesh(moatLeftGeom, waterMat);
  moatLeft.position.set(-14.5, 6.7, -13.5);
  const moatRight = moatLeft.clone();
  moatRight.position.x = 14.5;
  waterGroup.add(moatLeft, moatRight);

  parent.add(waterGroup);
}
