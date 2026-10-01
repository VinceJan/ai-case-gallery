import * as THREE from 'three';
import {
  createToonMaterial,
  createRainGlassMaterial,
  addAnimeOutline
} from '../materials/celShader.js';
import {
  createStoreSignTexture,
  createDoormatTexture,
  createDrinkCoolerTexture,
  createGondolaItemsTexture,
  createMangaMagazineTexture,
  createBentoTexture,
  createHotSnackTexture,
  createOdenTexture
} from '../textures/canvasTextures.js';

export function createConvenienceStore() {
  const storeGroup = new THREE.Group();
  storeGroup.name = 'ConvenienceStore';

  const storeW = 7.6;
  const storeD = 6.2;
  const storeH = 3.5;
  const startX = -7.2;
  const startZ = -6.8;
  const centerX = startX + storeW / 2; // -3.4
  const centerZ = startZ + storeD / 2; // -3.7
  const floorY = 0.12;

  // ----------------------------------------------------
  // 1. STORE EXTERIOR WALLS & STRUCTURE
  // ----------------------------------------------------
  // Rear wall (North: Z = startZ)
  const rearWallGeo = new THREE.BoxGeometry(storeW, storeH, 0.2);
  const wallMat = createToonMaterial(0xe2e8f0, { roughness: 0.8 });
  const rearWall = new THREE.Mesh(rearWallGeo, wallMat);
  rearWall.position.set(centerX, floorY + storeH / 2, startZ);
  rearWall.castShadow = true;
  rearWall.receiveShadow = true;
  storeGroup.add(rearWall);
  addAnimeOutline(rearWall, 0.02, 0x1e293b);

  // Left side wall (West: X = startX)
  const leftWallGeo = new THREE.BoxGeometry(0.2, storeH, storeD);
  const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
  leftWall.position.set(startX, floorY + storeH / 2, centerZ);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  storeGroup.add(leftWall);
  addAnimeOutline(leftWall, 0.02, 0x1e293b);

  // Ceiling & Parapet Roof
  const roofH = 0.35;
  const roofGeo = new THREE.BoxGeometry(storeW + 0.3, roofH, storeD + 0.3);
  const roofMat = createToonMaterial(0x334155);
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(centerX, floorY + storeH + roofH / 2, centerZ);
  roof.castShadow = true;
  storeGroup.add(roof);
  addAnimeOutline(roof, 0.025, 0x0f172a);

  // Roof Parapet Border Wall
  const parapetMat = createToonMaterial(0x475569);
  const parapetGeoF = new THREE.BoxGeometry(storeW + 0.3, 0.4, 0.15);
  const parapetF = new THREE.Mesh(parapetGeoF, parapetMat);
  parapetF.position.set(centerX, floorY + storeH + roofH + 0.2, startZ + storeD + 0.1);
  storeGroup.add(parapetF);

  // Roof Industrial Props (AC chillers, vents, antenna)
  const chillerGeo = new THREE.BoxGeometry(1.4, 1.0, 0.8);
  const chillerMat = createToonMaterial(0x94a3b8);
  const chiller1 = new THREE.Mesh(chillerGeo, chillerMat);
  chiller1.position.set(centerX - 1.5, floorY + storeH + roofH + 0.5, centerZ - 1.0);
  chiller1.castShadow = true;
  storeGroup.add(chiller1);
  addAnimeOutline(chiller1, 0.015, 0x1e293b);

  const chiller2 = new THREE.Mesh(chillerGeo, chillerMat);
  chiller2.position.set(centerX + 1.2, floorY + storeH + roofH + 0.5, centerZ - 1.2);
  chiller2.castShadow = true;
  storeGroup.add(chiller2);
  addAnimeOutline(chiller2, 0.015, 0x1e293b);

  // Roof exhaust duct cylinder
  const ductGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 16);
  const duct = new THREE.Mesh(ductGeo, chillerMat);
  duct.position.set(centerX - 0.2, floorY + storeH + roofH + 0.6, centerZ - 1.8);
  storeGroup.add(duct);

  // ----------------------------------------------------
  // 2. STORE FASCIA SIGN & RAIN AWNING / CANOPY
  // ----------------------------------------------------
  const frontZ = startZ + storeD; // -0.6

  // Overhanging Rain Canopy / Awning
  const canopyDepth = 1.35;
  const canopyH = 0.85;
  const canopyGeo = new THREE.BoxGeometry(storeW + 0.4, canopyH, canopyDepth);
  const canopyMat = createToonMaterial(0x1e293b);
  const canopy = new THREE.Mesh(canopyGeo, canopyMat);
  canopy.position.set(centerX, floorY + storeH + 0.1, frontZ + canopyDepth / 2);
  canopy.castShadow = true;
  storeGroup.add(canopy);
  addAnimeOutline(canopy, 0.02, 0x050810);

  // Main Fascia Sign: "HOTTO MART ほっとマート 24 HOURS" mounted on the FRONT of the canopy
  const signTex = createStoreSignTexture();
  const signMat = new THREE.MeshBasicMaterial({
    map: signTex,
    toneMapped: true
  });
  const signGeo = new THREE.PlaneGeometry(storeW + 0.38, 0.82);
  const signMesh = new THREE.Mesh(signGeo, signMat);
  signMesh.position.set(centerX, floorY + storeH + 0.1, frontZ + canopyDepth + 0.01);
  storeGroup.add(signMesh);
  storeGroup.userData.signMaterial = signMat; // For subtle flicker animation

  // Side Fascia Sign (East facing) on side of canopy
  const sideSignGeo = new THREE.PlaneGeometry(canopyDepth, 0.82);
  const sideSignMesh = new THREE.Mesh(sideSignGeo, signMat);
  sideSignMesh.position.set(centerX + (storeW + 0.4) / 2 + 0.01, floorY + storeH + 0.1, frontZ + canopyDepth / 2);
  sideSignMesh.rotation.y = Math.PI / 2;
  storeGroup.add(sideSignMesh);


  // Awning Underside Warm Downlight Strip
  const stripMat = new THREE.MeshBasicMaterial({ color: 0xffedd5, toneMapped: true });
  const stripGeo = new THREE.BoxGeometry(storeW + 0.2, 0.04, 0.08);
  const stripMesh = new THREE.Mesh(stripGeo, stripMat);
  stripMesh.position.set(centerX, floorY + storeH - 0.19, frontZ + 0.4);
  storeGroup.add(stripMesh);

  // Store Front Eaves Light (Spot / Point)
  const eavesLight = new THREE.PointLight(0xffecd1, 2.5, 7.0, 1.8);
  eavesLight.position.set(centerX, floorY + storeH - 0.25, frontZ + 0.6);
  storeGroup.add(eavesLight);

  // Interior Front Area Warm Fill Light (illuminates merchandise clearly through front glass)
  const frontWarmLight = new THREE.PointLight(0xfff1d6, 3.2, 7.5, 1.4);
  frontWarmLight.position.set(-2.4, floorY + 2.2, frontZ - 1.2);
  storeGroup.add(frontWarmLight);


  // ----------------------------------------------------
  // 3. SEAMLESS CLEAR GLASS WINDOWS & SLIDING DOORS
  // ----------------------------------------------------
  const glassMat = createRainGlassMaterial();
  storeGroup.userData.glassMaterial = glassMat; // For animation time update

  // Window mullions (dark aluminum frame)
  const frameMat = createToonMaterial(0x1e293b);

  // Left show window (Front wall left of doors: X from startX to -3.8)
  const leftWinW = 3.2;
  const winH = storeH - 0.8;
  const leftGlassGeo = new THREE.PlaneGeometry(leftWinW, winH);
  const leftGlass = new THREE.Mesh(leftGlassGeo, glassMat);
  leftGlass.position.set(startX + leftWinW / 2 + 0.2, floorY + winH / 2 + 0.2, frontZ);
  storeGroup.add(leftGlass);

  // Right show window (Front wall right of doors: X from -1.4 to startX + storeW)
  const rightWinW = 1.6;
  const rightGlassGeo = new THREE.PlaneGeometry(rightWinW, winH);
  const rightGlass = new THREE.Mesh(rightGlassGeo, glassMat);
  rightGlass.position.set(startX + storeW - rightWinW / 2 - 0.2, floorY + winH / 2 + 0.2, frontZ);
  storeGroup.add(rightGlass);

  // East Side Big Glass Window (looking into store from side street)
  const eastWinW = 4.2;
  const eastGlassGeo = new THREE.PlaneGeometry(eastWinW, winH);
  const eastGlass = new THREE.Mesh(eastGlassGeo, glassMat);
  eastGlass.rotation.y = -Math.PI / 2;
  eastGlass.position.set(startX + storeW, floorY + winH / 2 + 0.2, centerZ + 0.8);
  storeGroup.add(eastGlass);

  // Window Base Kickplate (Bottom 0.2m)
  const kickGeo = new THREE.BoxGeometry(storeW, 0.2, 0.1);
  const kick = new THREE.Mesh(kickGeo, frameMat);
  kick.position.set(centerX, floorY + 0.1, frontZ);
  storeGroup.add(kick);

  // Automatic Double Sliding Glass Doors
  // Doorway opening: centered at X = -2.6, width = 1.8m, height = 2.4m
  const doorW = 0.85;
  const doorH = 2.4;
  const doorFrameMat = createToonMaterial(0x334155);

  const doorGroup = new THREE.Group();
  doorGroup.name = 'AutoDoors';
  doorGroup.position.set(-2.6, floorY, frontZ);

  // Left Door Leaf
  const leftDoor = new THREE.Group();
  const doorLeafGeo = new THREE.BoxGeometry(doorW, doorH, 0.04);
  const doorLeafMesh = new THREE.Mesh(doorLeafGeo, glassMat);
  doorLeafMesh.position.set(-doorW / 2, doorH / 2, 0);
  leftDoor.add(doorLeafMesh);
  // Door frame border
  const dFrameGeoL = new THREE.BoxGeometry(0.04, doorH, 0.05);
  const dFrameL = new THREE.Mesh(dFrameGeoL, doorFrameMat);
  dFrameL.position.set(-doorW + 0.02, doorH / 2, 0);
  leftDoor.add(dFrameL);
  const dFrameR = new THREE.Mesh(dFrameGeoL, doorFrameMat);
  dFrameR.position.set(-0.02, doorH / 2, 0);
  leftDoor.add(dFrameR);
  doorGroup.add(leftDoor);

  // Right Door Leaf
  const rightDoor = new THREE.Group();
  const rightDoorMesh = new THREE.Mesh(doorLeafGeo, glassMat);
  rightDoorMesh.position.set(doorW / 2, doorH / 2, 0);
  rightDoor.add(rightDoorMesh);
  const rdFrameL = new THREE.Mesh(dFrameGeoL, doorFrameMat);
  rdFrameL.position.set(0.02, doorH / 2, 0);
  rightDoor.add(rdFrameL);
  const rdFrameR = new THREE.Mesh(dFrameGeoL, doorFrameMat);
  rdFrameR.position.set(doorW - 0.02, doorH / 2, 0);
  rightDoor.add(rdFrameR);
  doorGroup.add(rightDoor);

  // Motion sensor above the sliding door
  const sensorGeo = new THREE.BoxGeometry(0.3, 0.08, 0.12);
  const sensor = new THREE.Mesh(sensorGeo, doorFrameMat);
  sensor.position.set(0, doorH + 0.06, 0.06);
  doorGroup.add(sensor);
  // Sensor green indicator LED
  const sensorLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, toneMapped: false });
  const sensorLed = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), sensorLedMat);
  sensorLed.position.set(0, doorH + 0.04, 0.13);
  doorGroup.add(sensorLed);

  storeGroup.add(doorGroup);

  // Store door animation data
  storeGroup.userData.leftDoor = leftDoor;
  storeGroup.userData.rightDoor = rightDoor;
  storeGroup.userData.doorW = doorW;
  storeGroup.userData.openAmount = 0.0;

  // ----------------------------------------------------
  // 4. WELCOME DOORMAT (门口地垫)
  // ----------------------------------------------------
  const doormatTex = createDoormatTexture();
  const doormatMat = new THREE.MeshBasicMaterial({ map: doormatTex });
  const doormatGeo = new THREE.PlaneGeometry(1.8, 1.0);
  const doormat = new THREE.Mesh(doormatGeo, doormatMat);
  doormat.rotation.x = -Math.PI / 2;
  doormat.position.set(-2.6, floorY + 0.003, frontZ + 0.7);
  storeGroup.add(doormat);

  // ----------------------------------------------------
  // 5. INTERIOR FLOORING & WARM CEILING LIGHTS
  // ----------------------------------------------------
  // Interior Floor (Warm light beige / cream tile)
  const floorGeo = new THREE.PlaneGeometry(storeW - 0.2, storeD - 0.2);
  const floorMat = createToonMaterial(0xfef3c7, { roughness: 0.3 });
  const interiorFloor = new THREE.Mesh(floorGeo, floorMat);
  interiorFloor.rotation.x = -Math.PI / 2;
  interiorFloor.position.set(centerX, floorY + 0.002, centerZ);
  interiorFloor.receiveShadow = true;
  storeGroup.add(interiorFloor);

  // Interior Bright Warm Fluorescent Light Panels (Ceiling)
  const lightPanelGeo = new THREE.PlaneGeometry(1.8, 0.4);
  const lightPanelMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb, toneMapped: false });

  // 6 ceiling light fixtures arranged in grid
  const lightCoords = [
    [-5.2, -5.2], [-3.4, -5.2], [-1.6, -5.2],
    [-5.2, -2.6], [-3.4, -2.6], [-1.6, -2.6]
  ];

  lightCoords.forEach(([lx, lz]) => {
    const fixture = new THREE.Mesh(lightPanelGeo, lightPanelMat);
    fixture.rotation.x = Math.PI / 2;
    fixture.position.set(lx, floorY + storeH - 0.05, lz);
    storeGroup.add(fixture);

    // Warm ceiling spot/point light
    const intLight = new THREE.PointLight(0xfff3d1, 1.8, 6.5, 1.6);
    intLight.position.set(lx, floorY + storeH - 0.2, lz);
    storeGroup.add(intLight);
  });

  // Hanging Promotional Ceiling Banners (Sale / New Items)
  const bannerMat = createToonMaterial(0xef4444);
  const bannerGeo = new THREE.PlaneGeometry(1.2, 0.45);
  for (let i = 0; i < 2; i++) {
    const banner = new THREE.Mesh(bannerGeo, bannerMat);
    banner.position.set(centerX - 1.2 + i * 2.4, floorY + storeH - 0.4, centerZ);
    storeGroup.add(banner);
  }

  // ----------------------------------------------------
  // 6. DETAILED INTERIOR PROPS
  // ----------------------------------------------------

  // (A) REAR DRINK COOLER WALL (4-bay refrigerated beverage display)
  const coolerTex = createDrinkCoolerTexture();
  const coolerMat = new THREE.MeshBasicMaterial({ map: coolerTex, toneMapped: false });
  const coolerGeo = new THREE.BoxGeometry(4.8, 2.5, 0.5);
  const coolerMesh = new THREE.Mesh(coolerGeo, coolerMat);
  coolerMesh.position.set(centerX - 0.6, floorY + 1.25, startZ + 0.35);
  coolerMesh.castShadow = true;
  storeGroup.add(coolerMesh);
  addAnimeOutline(coolerMesh, 0.015, 0x0f172a);

  // Cool white internal LED light inside the drink cooler
  const coolerGlow = new THREE.PointLight(0x7dd3fc, 1.5, 4.0, 1.8);
  coolerGlow.position.set(centerX - 0.6, floorY + 1.5, startZ + 0.8);
  storeGroup.add(coolerGlow);

  // Backroom Staff Door ("STAFF ONLY" / 関係者以外立入禁止)
  const doorGeo = new THREE.BoxGeometry(1.1, 2.2, 0.05);
  const staffDoorMat = createToonMaterial(0x94a3b8);
  const staffDoor = new THREE.Mesh(doorGeo, staffDoorMat);
  staffDoor.position.set(centerX + 2.5, floorY + 1.1, startZ + 0.12);
  storeGroup.add(staffDoor);
  addAnimeOutline(staffDoor, 0.015, 0x1e293b);

  // Door handle
  const handleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15);
  const handleMat = createToonMaterial(0xf1f5f9);
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.set(centerX + 2.15, floorY + 1.1, startZ + 0.18);
  storeGroup.add(handle);

  // (B) GONDOLA RETAIL AISLE SHELVES (Loaded with Ramen, Chips, Snacks, Breads)
  const gondolaTex = createGondolaItemsTexture();
  const gondolaMat = new THREE.MeshToonMaterial({ map: gondolaTex });
  const gondolaBaseMat = createToonMaterial(0x64748b);

  const aisleLength = 3.6;
  const aisleH = 1.6;
  const aisleD = 0.8;

  // Aisle 1 (Center aisle)
  const aisle1 = new THREE.Group();
  const a1Geo = new THREE.BoxGeometry(aisleLength, aisleH, aisleD);
  const a1Mesh = new THREE.Mesh(a1Geo, gondolaMat);
  a1Mesh.position.y = aisleH / 2;
  aisle1.add(a1Mesh);
  addAnimeOutline(a1Mesh, 0.015, 0x1e293b);
  aisle1.position.set(centerX - 0.8, floorY, centerZ - 0.5);
  storeGroup.add(aisle1);

  // Aisle 2 (Front-center aisle)
  const aisle2 = new THREE.Group();
  const a2Mesh = new THREE.Mesh(a1Geo, gondolaMat);
  a2Mesh.position.y = aisleH / 2;
  aisle2.add(a2Mesh);
  addAnimeOutline(a2Mesh, 0.015, 0x1e293b);
  aisle2.position.set(centerX - 0.8, floorY, centerZ + 1.1);
  storeGroup.add(aisle2);

  // Endcap display racks for both aisles
  const endcapGeo = new THREE.BoxGeometry(aisleD, aisleH - 0.2, 0.4);
  const endcapMat = createToonMaterial(0x38bdf8);
  const endcap1 = new THREE.Mesh(endcapGeo, endcapMat);
  endcap1.position.set(centerX - 0.8 + aisleLength / 2 + 0.2, floorY + (aisleH - 0.2) / 2, centerZ - 0.5);
  storeGroup.add(endcap1);

  const endcap2 = new THREE.Mesh(endcapGeo, endcapMat);
  endcap2.position.set(centerX - 0.8 + aisleLength / 2 + 0.2, floorY + (aisleH - 0.2) / 2, centerZ + 1.1);
  storeGroup.add(endcap2);

  // (C) BENTO & ONIGIRI OPEN CHILLER COUNTER (Fresh food island)
  const bentoTex = createBentoTexture();
  const bentoMat = new THREE.MeshBasicMaterial({ map: bentoTex });
  const bentoIsland = new THREE.Group();
  bentoIsland.position.set(centerX + 2.0, floorY, centerZ - 0.8);

  const bentoBaseGeo = new THREE.BoxGeometry(1.6, 0.95, 1.2);
  const bentoBaseMat = createToonMaterial(0x1e293b);
  const bentoBase = new THREE.Mesh(bentoBaseGeo, bentoBaseMat);
  bentoBase.position.y = 0.95 / 2;
  bentoIsland.add(bentoBase);
  addAnimeOutline(bentoBase, 0.015, 0x090d16);

  // Display top
  const bentoTopGeo = new THREE.PlaneGeometry(1.5, 1.1);
  const bentoTop = new THREE.Mesh(bentoTopGeo, bentoMat);
  bentoTop.rotation.x = -Math.PI / 2;
  bentoTop.position.y = 0.96;
  bentoIsland.add(bentoTop);
  storeGroup.add(bentoIsland);

  // (D) CHECKOUT COUNTER (L-shaped service desk)
  const counterGroup = new THREE.Group();
  counterGroup.position.set(startX + 1.2, floorY, centerZ + 1.3);

  const deskMat = createToonMaterial(0xf8fafc);
  // Main counter slab
  const cMainGeo = new THREE.BoxGeometry(1.8, 1.0, 0.7);
  const cMain = new THREE.Mesh(cMainGeo, deskMat);
  cMain.position.set(0, 0.5, 0);
  counterGroup.add(cMain);
  addAnimeOutline(cMain, 0.015, 0x334155);

  // Dual Cash Registers (POS terminals)
  const posMat = createToonMaterial(0x1e293b);
  const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, toneMapped: false });
  for (let p = 0; p < 2; p++) {
    const px = -0.45 + p * 0.9;
    // POS Base
    const posBase = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 0.35), posMat);
    posBase.position.set(px, 1.08, 0);
    counterGroup.add(posBase);

    // Screen
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.03), screenMat);
    screen.position.set(px, 1.25, -0.08);
    screen.rotation.x = -0.2;
    counterGroup.add(screen);

    // Barcode scanner
    const scanner = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.06), createToonMaterial(0xef4444));
    scanner.position.set(px + 0.24, 1.08, 0.05);
    counterGroup.add(scanner);
  }

  // Hot Snack Warmer Cabinet (FamiChiki style glowing display)
  const hotSnackTex = createHotSnackTexture();
  const hotSnackMat = new THREE.MeshBasicMaterial({ map: hotSnackTex, toneMapped: false });
  const hotGeo = new THREE.BoxGeometry(0.7, 0.45, 0.4);
  const hotMesh = new THREE.Mesh(hotGeo, hotSnackMat);
  hotMesh.position.set(0.65, 1.25, 0);
  counterGroup.add(hotMesh);
  addAnimeOutline(hotMesh, 0.01, 0x78350f);

  // Warm orange glow inside the hot snack warmer
  const hotGlow = new THREE.PointLight(0xf59e0b, 1.2, 2.5, 2.0);
  hotGlow.position.set(0.65, 1.35, 0.1);
  counterGroup.add(hotGlow);

  // Japanese Oden Counter (关东煮)
  const odenTex = createOdenTexture();
  const odenMat = new THREE.MeshBasicMaterial({ map: odenTex });
  const odenGeo = new THREE.BoxGeometry(0.65, 0.25, 0.45);
  const odenMesh = new THREE.Mesh(odenGeo, odenMat);
  odenMesh.position.set(-0.65, 1.15, 0);
  counterGroup.add(odenMesh);
  addAnimeOutline(odenMesh, 0.01, 0x451a03);

  // Fresh Drip Coffee Machine on rear counter
  const coffeeMachineGroup = new THREE.Group();
  coffeeMachineGroup.position.set(-0.5, 1.0, -0.6);
  const cmBaseGeo = new THREE.BoxGeometry(0.45, 0.65, 0.4);
  const cmBaseMat = createToonMaterial(0x18181b);
  const cmMesh = new THREE.Mesh(cmBaseGeo, cmBaseMat);
  cmMesh.position.y = 0.65 / 2;
  coffeeMachineGroup.add(cmMesh);
  // Coffee bean hopper (transparent cylinder)
  const hopperGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.2, 12);
  const hopperMat = createToonMaterial(0x78350f);
  const hopper = new THREE.Mesh(hopperGeo, hopperMat);
  hopper.position.set(0, 0.75, 0);
  coffeeMachineGroup.add(hopper);
  counterGroup.add(coffeeMachineGroup);

  // Microwave oven on back counter
  const mwGeo = new THREE.BoxGeometry(0.6, 0.35, 0.35);
  const mwMat = createToonMaterial(0x94a3b8);
  const microwave = new THREE.Mesh(mwGeo, mwMat);
  microwave.position.set(0.3, 1.2, -0.6);
  counterGroup.add(microwave);

  storeGroup.add(counterGroup);

  // (E) MANGA & MAGAZINE STAND (窓際 雑誌ラック) - Right beside the front window!
  const mangaTex = createMangaMagazineTexture();
  const mangaMat = new THREE.MeshBasicMaterial({ map: mangaTex });

  const magazineStand = new THREE.Group();
  magazineStand.position.set(startX + 1.2, floorY, frontZ - 0.45);

  // Wire frame shelf slanted
  const mFrameGeo = new THREE.BoxGeometry(1.8, 1.1, 0.35);
  const mFrameMat = createToonMaterial(0x475569);
  const mFrame = new THREE.Mesh(mFrameGeo, mFrameMat);
  mFrame.position.y = 1.1 / 2;
  magazineStand.add(mFrame);
  addAnimeOutline(mFrame, 0.015, 0x1e293b);

  // Slanted magazine display face
  const mFaceGeo = new THREE.PlaneGeometry(1.7, 1.0);
  const mFace = new THREE.Mesh(mFaceGeo, mangaMat);
  mFace.position.set(0, 0.58, 0.18);
  mFace.rotation.x = -0.15;
  magazineStand.add(mFace);

  storeGroup.add(magazineStand);

  // (F) ICE CREAM CHEST FREEZER (Low island freezer with sliding glass)
  const freezerGroup = new THREE.Group();
  freezerGroup.position.set(centerX + 2.0, floorY, centerZ + 1.2);

  const freezerGeo = new THREE.BoxGeometry(1.4, 0.85, 0.9);
  const freezerMat = createToonMaterial(0x0284c7);
  const freezer = new THREE.Mesh(freezerGeo, freezerMat);
  freezer.position.y = 0.85 / 2;
  freezerGroup.add(freezer);
  addAnimeOutline(freezer, 0.015, 0x0c4a6e);

  // Glass sliding top with colorful popsicles visible
  const fTopGeo = new THREE.PlaneGeometry(1.3, 0.8);
  const fTopMat = new THREE.MeshBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.75
  });
  const fTop = new THREE.Mesh(fTopGeo, fTopMat);
  fTop.rotation.x = -Math.PI / 2;
  fTop.position.y = 0.86;
  freezerGroup.add(fTop);

  storeGroup.add(freezerGroup);

  // (G) SHOPPING HANDBASKETS (Red and yellow stack near entrance)
  const basketMatR = createToonMaterial(0xef4444);
  const basketMatY = createToonMaterial(0xfacc15);
  const basketGeo = new THREE.BoxGeometry(0.35, 0.22, 0.25);

  for (let b = 0; b < 5; b++) {
    const basket = new THREE.Mesh(basketGeo, (b % 2 === 0) ? basketMatR : basketMatY);
    basket.position.set(-1.4, floorY + 0.11 + b * 0.08, frontZ - 0.4);
    storeGroup.add(basket);
  }

  // Checkout Queue Floor Guide Tape ("WAIT HERE" red/white decals)
  const queueTapeGeo = new THREE.PlaneGeometry(0.7, 0.12);
  const queueTapeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  for (let q = 0; q < 3; q++) {
    const tape = new THREE.Mesh(queueTapeGeo, queueTapeMat);
    tape.rotation.x = -Math.PI / 2;
    tape.position.set(startX + 1.2, floorY + 0.003, centerZ + 0.4 - q * 0.6);
    storeGroup.add(tape);
  }

  return storeGroup;
}
