import * as THREE from 'three';
import {
  createDrinkWallTexture,
  createShelfItemsTexture,
  createBentoTexture,
  createMagazineTexture,
  createPosterTexture,
  createOdenSoupTexture
} from './textures.js';
import { addAnimeOutline } from './materials.js';

export function createStoreInterior(materials) {
  const interiorGroup = new THREE.Group();
  interiorGroup.name = 'store_interior';

  // 1. Walk-in Drink Refrigerator Cooler (Back Wall)
  // Positioned along the back wall of the store
  const coolerWidth = 7.0;
  const coolerHeight = 3.2;
  const coolerDepth = 0.8;

  const coolerGeo = new THREE.BoxGeometry(coolerWidth, coolerHeight, coolerDepth);
  const coolerMat = new THREE.MeshToonMaterial({ color: 0x334155 });
  const coolerMesh = new THREE.Mesh(coolerGeo, coolerMat);
  coolerMesh.position.set(-0.8, coolerHeight / 2 + 0.1, -2.6);
  interiorGroup.add(coolerMesh);

  // Lit drink texture face on front of cooler
  const drinkTex = createDrinkWallTexture();
  const drinkFrontMat = new THREE.MeshBasicMaterial({
    map: drinkTex
  });
  const drinkFrontGeo = new THREE.PlaneGeometry(coolerWidth - 0.2, coolerHeight - 0.3);
  const drinkFrontMesh = new THREE.Mesh(drinkFrontGeo, drinkFrontMat);
  drinkFrontMesh.position.set(-0.8, coolerHeight / 2 + 0.1, -2.6 + coolerDepth / 2 + 0.02);
  interiorGroup.add(drinkFrontMesh);

  // Cooler top header lightbox
  const coolerHeaderGeo = new THREE.PlaneGeometry(coolerWidth - 0.2, 0.4);
  const coolerHeaderMat = new THREE.MeshBasicMaterial({ color: 0xdbeafe });
  const coolerHeader = new THREE.Mesh(coolerHeaderGeo, coolerHeaderMat);
  coolerHeader.position.set(-0.8, coolerHeight + 0.05, -2.6 + coolerDepth / 2 + 0.02);
  interiorGroup.add(coolerHeader);

  // Subtle cold cyan backlight for drink display
  const coolerLight = new THREE.PointLight(0x7dd3fc, 2.0, 5.0);
  coolerLight.position.set(-0.8, coolerHeight / 2, -2.0);
  interiorGroup.add(coolerLight);

  // 2. Central Gondola Shelves (Rows of Snacks, Ramen, Chips)
  function createGondolaUnit(xPos, zPos, length = 3.6, type1 = 'snacks', type2 = 'ramen') {
    const gondola = new THREE.Group();
    const gHeight = 1.9;
    const gWidth = 0.9;

    // Gondola metal base and upright frame
    const baseGeo = new THREE.BoxGeometry(length, 0.15, gWidth);
    const baseMat = new THREE.MeshToonMaterial({ color: 0x475569 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.075;
    gondola.add(base);

    // End-caps (metal side panels)
    const endGeo = new THREE.BoxGeometry(0.1, gHeight, gWidth + 0.05);
    const endMat = new THREE.MeshToonMaterial({ color: 0x64748b });
    const endLeft = new THREE.Mesh(endGeo, endMat);
    endLeft.position.set(-length / 2, gHeight / 2, 0);
    const endRight = new THREE.Mesh(endGeo, endMat);
    endRight.position.set(length / 2, gHeight / 2, 0);
    gondola.add(endLeft, endRight);

    // Back divider
    const dividerGeo = new THREE.BoxGeometry(length - 0.2, gHeight - 0.2, 0.05);
    const divider = new THREE.Mesh(dividerGeo, baseMat);
    divider.position.set(0, gHeight / 2, 0);
    gondola.add(divider);

    // 3 Tiers of Shelves on each side
    const texFront = createShelfItemsTexture(type1);
    const texBack = createShelfItemsTexture(type2);

    for (let tier = 0; tier < 3; tier++) {
      const yShelf = 0.35 + tier * 0.52;

      // Metal shelf plank
      const shelfPlankGeo = new THREE.BoxGeometry(length - 0.2, 0.04, gWidth);
      const shelfPlank = new THREE.Mesh(shelfPlankGeo, endMat);
      shelfPlank.position.set(0, yShelf, 0);
      gondola.add(shelfPlank);

      // Front goods box
      const goodsGeo = new THREE.BoxGeometry(length - 0.25, 0.42, 0.35);
      const goodsMatF = new THREE.MeshBasicMaterial({ map: texFront });
      const goodsFront = new THREE.Mesh(goodsGeo, goodsMatF);
      goodsFront.position.set(0, yShelf + 0.22, 0.24);
      gondola.add(goodsFront);

      // Back goods box
      const goodsMatB = new THREE.MeshBasicMaterial({ map: texBack });
      const goodsBack = new THREE.Mesh(goodsGeo, goodsMatB);
      goodsBack.position.set(0, yShelf + 0.22, -0.24);
      gondola.add(goodsBack);
    }

    gondola.position.set(xPos, 0.1, zPos);
    return gondola;
  }

  // Two central aisles
  const aisle1 = createGondolaUnit(-2.0, -0.9, 3.8, 'snacks', 'chips');
  const aisle2 = createGondolaUnit(-2.0, 0.7, 3.8, 'ramen', 'snacks');
  interiorGroup.add(aisle1, aisle2);

  // 3. Chilled Bento & Onigiri Open Island
  const bentoIsland = new THREE.Group();
  bentoIsland.name = 'bento_island';

  const bentoBaseGeo = new THREE.BoxGeometry(2.4, 0.95, 1.1);
  const bentoBaseMat = new THREE.MeshToonMaterial({ color: 0x334155 });
  const bentoBase = new THREE.Mesh(bentoBaseGeo, bentoBaseMat);
  bentoBase.position.set(0, 0.95 / 2, 0);
  bentoIsland.add(bentoBase);

  // Slanted top display with onigiri and bento textures
  const bentoTex = createBentoTexture();
  const bentoTopGeo = new THREE.PlaneGeometry(2.3, 1.0);
  const bentoTopMat = new THREE.MeshBasicMaterial({ map: bentoTex });
  const bentoTop = new THREE.Mesh(bentoTopGeo, bentoTopMat);
  bentoTop.rotation.x = -Math.PI / 2 + 0.2; // Slight tilt
  bentoTop.position.set(0, 0.98, 0.02);
  bentoIsland.add(bentoTop);

  // Clear sneeze acrylic guard rail
  const sneezeGuardGeo = new THREE.BoxGeometry(2.35, 0.25, 0.04);
  const sneezeGuardMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1
  });
  const sneezeGuard = new THREE.Mesh(sneezeGuardGeo, sneezeGuardMat);
  sneezeGuard.position.set(0, 1.1, 0.52);
  bentoIsland.add(sneezeGuard);

  bentoIsland.position.set(-2.0, 0.1, 2.1);
  interiorGroup.add(bentoIsland);

  // 4. Checkout Counter (L-Shaped, Register, Hot Food, Oden, Coffee)
  const counterGroup = new THREE.Group();
  counterGroup.name = 'checkout_counter';

  // Main counter body
  const counterMainGeo = new THREE.BoxGeometry(1.0, 1.05, 3.8);
  const counterWoodMat = new THREE.MeshToonMaterial({ color: 0x9a3412 }); // Warm anime chestnut wood
  const counterMain = new THREE.Mesh(counterMainGeo, counterWoodMat);
  counterMain.position.set(0, 1.05 / 2, 0);
  counterGroup.add(counterMain);

  // White top countertop
  const counterTopGeo = new THREE.BoxGeometry(1.08, 0.08, 3.88);
  const counterTopMat = new THREE.MeshToonMaterial({ color: 0xfffbeb });
  const counterTop = new THREE.Mesh(counterTopGeo, counterTopMat);
  counterTop.position.set(0, 1.05, 0);
  counterGroup.add(counterTop);

  // POS Touchscreen Cash Register
  const registerGroup = new THREE.Group();
  // Register base
  const regBaseGeo = new THREE.BoxGeometry(0.42, 0.12, 0.42);
  const regBaseMat = new THREE.MeshToonMaterial({ color: 0x334155 });
  const regBase = new THREE.Mesh(regBaseGeo, regBaseMat);
  regBase.position.y = 0.06;
  registerGroup.add(regBase);

  // Touchscreen tilted towards clerk
  const screenArmGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.25);
  const screenArm = new THREE.Mesh(screenArmGeo, regBaseMat);
  screenArm.position.set(0, 0.22, 0);
  registerGroup.add(screenArm);

  const screenGeo = new THREE.BoxGeometry(0.36, 0.26, 0.05);
  const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 }); // Lit blue POS screen
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.rotation.x = -0.3;
  screen.position.set(0, 0.36, 0.05);
  registerGroup.add(screen);

  // Customer facing sub-display
  const custScreenGeo = new THREE.BoxGeometry(0.24, 0.14, 0.03);
  const custScreenMat = new THREE.MeshBasicMaterial({ color: 0x22c55e }); // Green total readout
  const custScreen = new THREE.Mesh(custScreenGeo, custScreenMat);
  custScreen.position.set(0, 0.38, -0.05);
  registerGroup.add(custScreen);

  // Barcode scanner & change tray
  const trayGeo = new THREE.BoxGeometry(0.22, 0.03, 0.18);
  const trayMat = new THREE.MeshToonMaterial({ color: 0x0284c7 }); // Blue Japanese money coin tray (コイントレー)
  const tray = new THREE.Mesh(trayGeo, trayMat);
  tray.position.set(0, 0.08, -0.22);
  registerGroup.add(tray);

  registerGroup.position.set(0.05, 1.09, 0.9);
  counterGroup.add(registerGroup);

  // Hot Food Heated Glass Showcase (Famichiki / Fried Chicken Warmer)
  const hotCaseGroup = new THREE.Group();
  hotCaseGroup.name = 'hot_food_showcase';

  const hotCaseGeo = new THREE.BoxGeometry(0.65, 0.65, 0.85);
  const hotCaseGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffedd5,
    transparent: true,
    opacity: 0.35,
    roughness: 0.05
  });
  const hotCaseGlass = new THREE.Mesh(hotCaseGeo, hotCaseGlassMat);
  hotCaseGlass.position.y = 0.35;
  hotCaseGroup.add(hotCaseGlass);

  // Red top canopy of the warmer
  const hotCaseTopGeo = new THREE.BoxGeometry(0.68, 0.1, 0.88);
  const hotCaseTopMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
  const hotCaseTop = new THREE.Mesh(hotCaseTopGeo, hotCaseTopMat);
  hotCaseTop.position.y = 0.7;
  hotCaseGroup.add(hotCaseTop);

  // Crispy fried chicken items inside warmer
  const chickenGeo = new THREE.BoxGeometry(0.14, 0.08, 0.14);
  const chickenMat = new THREE.MeshToonMaterial({ color: 0xb45309 });
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const chk = new THREE.Mesh(chickenGeo, chickenMat);
      chk.position.set(-0.15 + r * 0.3, 0.22 + (r % 2) * 0.18, -0.25 + c * 0.25);
      hotCaseGroup.add(chk);
    }
  }

  // Warm Amber glowing bulb inside
  const hotCaseLight = new THREE.PointLight(0xf59e0b, 1.8, 2.5);
  hotCaseLight.position.set(0, 0.4, 0);
  hotCaseGroup.add(hotCaseLight);

  hotCaseGroup.position.set(0, 1.09, -0.3);
  counterGroup.add(hotCaseGroup);

  // Oden Boiling Simmering Pot (Stainless steel pot with compartments & rising steam)
  const odenGroup = new THREE.Group();
  odenGroup.name = 'oden_pot';

  const odenPotGeo = new THREE.BoxGeometry(0.55, 0.25, 0.7);
  const odenPotMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.85,
    roughness: 0.2
  });
  const odenPot = new THREE.Mesh(odenPotGeo, odenPotMat);
  odenPot.position.y = 0.125;
  odenGroup.add(odenPot);

  // Oden soup surface with ingredients texture
  const odenSoupTex = createOdenSoupTexture();
  const odenSoupGeo = new THREE.PlaneGeometry(0.5, 0.65);
  const odenSoupMat = new THREE.MeshBasicMaterial({ map: odenSoupTex });
  const odenSoup = new THREE.Mesh(odenSoupGeo, odenSoupMat);
  odenSoup.rotation.x = -Math.PI / 2;
  odenSoup.position.y = 0.255;
  odenGroup.add(odenSoup);

  // Soft warm steam light
  const odenLight = new THREE.PointLight(0xfbbf24, 0.8, 1.5);
  odenLight.position.set(0, 0.45, 0);
  odenGroup.add(odenLight);

  odenGroup.position.set(0, 1.09, -1.25);
  counterGroup.add(odenGroup);

  // Commercial Espresso / Drip Coffee Machine
  const coffeeGroup = new THREE.Group();
  const coffeeMachineGeo = new THREE.BoxGeometry(0.48, 0.65, 0.42);
  const coffeeMachineMat = new THREE.MeshToonMaterial({ color: 0x1e293b });
  const coffeeMachine = new THREE.Mesh(coffeeMachineGeo, coffeeMachineMat);
  coffeeMachine.position.y = 0.325;
  coffeeGroup.add(coffeeMachine);

  // Coffee cup dispensers (stacks of cups)
  for (let s = 0; s < 3; s++) {
    const cupStackGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.38, 12);
    const cupStackMat = new THREE.MeshToonMaterial({
      color: s === 0 ? 0xffffff : s === 1 ? 0x78350f : 0xdc2626
    });
    const cupStack = new THREE.Mesh(cupStackGeo, cupStackMat);
    cupStack.position.set(0.18, 0.25, -0.15 + s * 0.15);
    coffeeGroup.add(cupStack);
  }

  coffeeGroup.position.set(0, 1.09, 1.5);
  counterGroup.add(coffeeGroup);

  counterGroup.position.set(3.2, 0.1, 0.2);
  interiorGroup.add(counterGroup);

  // 5. Magazine & Manga Display Rack (Right behind front glass window)
  const magRackGroup = new THREE.Group();
  magRackGroup.name = 'magazine_rack';

  const magRackFrameGeo = new THREE.BoxGeometry(3.2, 1.1, 0.45);
  const magRackFrameMat = new THREE.MeshToonMaterial({ color: 0x475569 });
  const magRackFrame = new THREE.Mesh(magRackFrameGeo, magRackFrameMat);
  magRackFrame.position.y = 0.55;
  magRackGroup.add(magRackFrame);

  // Tilted display shelves with magazine covers
  const magTex = createMagazineTexture();
  const magFaceGeo = new THREE.PlaneGeometry(3.1, 0.85);
  const magFaceMat = new THREE.MeshBasicMaterial({ map: magTex });
  const magFace = new THREE.Mesh(magFaceGeo, magFaceMat);
  magFace.rotation.x = -0.3; // Tilted backwards
  magFace.position.set(0, 0.65, 0.12);
  magRackGroup.add(magFace);

  // Positioned along the front window glass
  magRackGroup.position.set(-1.8, 0.1, 3.2);
  interiorGroup.add(magRackGroup);

  // 6. Back Wall Decor & Staff Only Door
  const staffDoorGeo = new THREE.BoxGeometry(1.2, 2.4, 0.06);
  const staffDoorMat = new THREE.MeshToonMaterial({ color: 0xcbd5e1 });
  const staffDoor = new THREE.Mesh(staffDoorGeo, staffDoorMat);
  staffDoor.position.set(3.4, 1.3, -2.6);
  interiorGroup.add(staffDoor);

  // Staff Only sign plaque
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 256;
  signCanvas.height = 128;
  const sCtx = signCanvas.getContext('2d');
  sCtx.fillStyle = '#dc2626';
  sCtx.fillRect(0, 0, 256, 128);
  sCtx.fillStyle = '#ffffff';
  sCtx.font = 'bold 22px sans-serif';
  sCtx.textAlign = 'center';
  sCtx.fillText('関係者以外', 128, 52);
  sCtx.fillText('立入禁止', 128, 85);
  sCtx.font = '14px sans-serif';
  sCtx.fillText('STAFF ONLY', 128, 112);

  const staffSignTex = new THREE.CanvasTexture(signCanvas);
  const staffSignGeo = new THREE.PlaneGeometry(0.65, 0.32);
  const staffSignMat = new THREE.MeshBasicMaterial({ map: staffSignTex });
  const staffSign = new THREE.Mesh(staffSignGeo, staffSignMat);
  staffSign.position.set(3.4, 1.9, -2.56);
  interiorGroup.add(staffSign);

  // Wall Clock showing late night anime time (23:45)
  const clockCanvas = document.createElement('canvas');
  clockCanvas.width = 128;
  clockCanvas.height = 128;
  const cCtx = clockCanvas.getContext('2d');
  cCtx.fillStyle = '#ffffff';
  cCtx.beginPath();
  cCtx.arc(64, 64, 60, 0, Math.PI * 2);
  cCtx.fill();
  cCtx.strokeStyle = '#0f172a';
  cCtx.lineWidth = 6;
  cCtx.stroke();
  // Hands pointing to 23:45
  cCtx.lineWidth = 4;
  cCtx.beginPath();
  cCtx.moveTo(64, 64);
  cCtx.lineTo(35, 64); // Minute hand at 9 (45m)
  cCtx.moveTo(64, 64);
  cCtx.lineTo(50, 32); // Hour hand near 12
  cCtx.stroke();

  const clockTex = new THREE.CanvasTexture(clockCanvas);
  const clockGeo = new THREE.CircleGeometry(0.32, 24);
  const clockMat = new THREE.MeshBasicMaterial({ map: clockTex });
  const clock = new THREE.Mesh(clockGeo, clockMat);
  clock.position.set(3.4, 3.2, -2.56);
  interiorGroup.add(clock);

  // 7. Interior Ceiling Recessed Lightboxes & Warm Volumetric Light
  // 6 linear ceiling lights casting bright warm anime light downwards
  const ceilingLightGeo = new THREE.BoxGeometry(2.4, 0.08, 0.5);
  const ceilingLightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const lightPositions = [
    [-2.2, 4.0, -1.0],
    [-2.2, 4.0, 1.0],
    [1.5, 4.0, -1.0],
    [1.5, 4.0, 1.0]
  ];

  lightPositions.forEach((pos, idx) => {
    const fixture = new THREE.Mesh(ceilingLightGeo, ceilingLightMat);
    fixture.position.set(...pos);
    interiorGroup.add(fixture);

    // Warm bright point light
    const downLight = new THREE.PointLight(0xfff3d6, 4.2, 9.0);
    downLight.position.set(pos[0], pos[1] - 0.2, pos[2]);
    interiorGroup.add(downLight);
  });

  // Additional warm fill light focused on checkout counter & entrance
  const counterFillLight = new THREE.PointLight(0xffe8ba, 4.0, 8.5);
  counterFillLight.position.set(2.4, 2.5, 1.2);
  interiorGroup.add(counterFillLight);

  // Aisle fill light
  const aisleFillLight = new THREE.PointLight(0xfff0db, 3.8, 8.0);
  aisleFillLight.position.set(-2.0, 2.5, 0);
  interiorGroup.add(aisleFillLight);

  return interiorGroup;
}
