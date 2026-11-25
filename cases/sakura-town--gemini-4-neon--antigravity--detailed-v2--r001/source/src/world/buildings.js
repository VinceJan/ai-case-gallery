import * as THREE from 'three';
import {
  toonMat,
  addSubtleEdges,
  createSignTexture,
  createTatamiTexture,
  createTileFloorTexture,
  createVendingFrontTexture,
  createWindowTexture,
} from '../core/toonMaterials.js';

/**
 * Builds all enterable core buildings, Sakura Shrine, lived-in supporting town buildings,
 * utility poles with power lines, streetlights, vending machines, bicycles, benches, and props.
 */
export function buildTownBuildings(scene, collision) {
  const root = new THREE.Group();
  scene.add(root);

  // Dynamic references returned to atmosphere, NPCs, and interaction systems
  const worldRefs = {
    doors: {},          // Named animated doors { openAmount, targetOpen, update(dt), collider }
    cafeLights: [],     // Lights & emissive signs toggled by Café business hours
    cafeSignMat: null,
    cafeOpenSign: null,
    cafeCoffeeCup: null,
    martLights: [],
    homeLampLight: null,
    homeLampShadeMat: null,
    stationParcelMesh: null,
    shrineBellGroup: null,
    shrineLanternMats: [],
    streetLights: [],   // { light, bulbMat }
    houseWindows: {},   // residentId -> Array<MeshBasicMaterial/ToonMat>
    genericWindows: [], // General town windows lit at night
    vendingMachines: [],// { id, pos, canSlotPos, dispensedCanMesh }
    festivalLanterns: [], // Riverside lanterns unlocked by town gathering
    barberPole: null,
    lostPhotoMesh: null,
    mailboxFlag: null,
  };

  // Shared materials
  const matCreamWall = toonMat(0xf5efe4);
  const matWoodDark = toonMat(0x6e4b34);
  const matWoodWarm = toonMat(0xa6784e);
  const matRoofTile = toonMat(0x465266);
  const matRoofRed = toonMat(0x9f4944);
  const matMetal = toonMat(0x7c8591);
  const matGlass = toonMat(0xc5e3f6, { transparent: true, opacity: 0.45 });

  // Helper: build an enterable building shell with 4 walls, doorway cutout, floor, and pitched/flat roof
  function buildEnterableShell({ cx, cz, w, d, h, wallColor, floorTex, doorSide, doorW, doorH, roofStyle = 'gable', roofColor = 0x465266 }) {
    const g = new THREE.Group();
    g.position.set(cx, 0, cz);
    const wallMat = toonMat(wallColor);
    const t = 0.24;

    // Floor
    const floorMat = floorTex
      ? toonMat(0xffffff, { map: floorTex })
      : toonMat(0xe8dfd1);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.14, d), floorMat);
    floor.position.y = 0.07;
    floor.receiveShadow = true;
    g.add(floor);

    const addWallSeg = (x, y, z, sx, sy, sz) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), wallMat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      g.add(m);
      return m;
    };

    // Build each wall, cutting a doorway on doorSide
    const buildSideWall = (side) => {
      const isZ = side === 'north' || side === 'south';
      const span = isZ ? w : d;
      const pos = side === 'north' ? -d / 2 : side === 'south' ? d / 2 : side === 'west' ? -w / 2 : w / 2;

      if (side !== doorSide) {
        if (isZ) addWallSeg(0, h / 2, pos, w, h, t);
        else addWallSeg(pos, h / 2, 0, t, h, d);
      } else {
        const sideSpan = (span - doorW) / 2;
        if (isZ) {
          addWallSeg(-(doorW / 2 + sideSpan / 2), h / 2, pos, sideSpan, h, t);
          addWallSeg(doorW / 2 + sideSpan / 2, h / 2, pos, sideSpan, h, t);
          if (h > doorH) {
            addWallSeg(0, doorH + (h - doorH) / 2, pos, doorW, h - doorH, t);
          }
        } else {
          addWallSeg(pos, h / 2, -(doorW / 2 + sideSpan / 2), t, h, sideSpan);
          addWallSeg(pos, h / 2, doorW / 2 + sideSpan / 2, t, h, sideSpan);
          if (h > doorH) {
            addWallSeg(pos, doorH + (h - doorH) / 2, 0, t, h - doorH, doorW);
          }
        }
      }
    };

    ['north', 'south', 'east', 'west'].forEach(buildSideWall);

    // Roof (raised cleanly above interior ceiling so third-person camera stays unobstructed)
    const roofMat = toonMat(roofColor);
    if (roofStyle === 'flat') {
      const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.5, 0.35, d + 0.5), roofMat);
      roof.position.y = h + 0.18;
      roof.castShadow = true;
      g.add(roof);
    } else {
      const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.72, 2.0, 4), roofMat);
      roof.position.y = h + 1.0;
      roof.rotation.y = Math.PI / 4;
      roof.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d));
      roof.castShadow = true;
      g.add(roof);
    }

    collision.addRoomWalls(cx, cz, w, d, 0.35, doorSide, doorW + 0.15);
    root.add(g);
    return g;
  }

  // =========================================================================
  // 1. SAKURA MART (桜マート - Enterable Convenience Store) at X=-15, Z=+10.5
  // =========================================================================
  const martTile = createTileFloorTexture('#f8f5ef', '#eae6dc');
  martTile.repeat.set(4, 3);
  const mart = buildEnterableShell({
    cx: -15, cz: 10.5, w: 10, d: 7.4, h: 3.6,
    wallColor: 0xf7f5f0,
    floorTex: martTile,
    doorSide: 'north', doorW: 2.6, doorH: 2.5,
    roofStyle: 'flat', roofColor: 0x526378,
  });

  // Glowing iconic convenience store fascia & sign
  const martSignTex = createSignTexture({
    text: '桜マート',
    subtext: 'SAKURA MART · 24H',
    bg: '#ffffff',
    border: '#4e9f76',
    textColor: '#2c3d4f',
    accentColor: '#e98aa3',
    stripe: true,
  });
  const martSignMat = new THREE.MeshStandardMaterial({
    map: martSignTex,
    emissive: 0xffffff,
    emissiveMap: martSignTex,
    emissiveIntensity: 0.55,
    roughness: 0.4,
  });
  const martSign = new THREE.Mesh(new THREE.BoxGeometry(10.3, 1.05, 0.28), martSignMat);
  martSign.position.set(0, 3.65, -3.75);
  mart.add(martSign);
  worldRefs.martLights.push(martSignMat);

  // Storefront glass windows flanking the automatic doors
  for (const wx of [-3.1, 3.1]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.0, 0.32), matGlass);
    win.position.set(wx, 1.45, -3.68);
    mart.add(win);
  }

  // Automatic sliding glass doors!
  const martDoorL = new THREE.Mesh(new THREE.BoxGeometry(1.28, 2.45, 0.1), matGlass);
  martDoorL.position.set(-0.64, 1.25, -3.68);
  const martDoorR = new THREE.Mesh(new THREE.BoxGeometry(1.28, 2.45, 0.1), matGlass);
  martDoorR.position.set(0.64, 1.25, -3.68);
  // Subtle pink door stripes so player clearly sees the sliding glass
  const doorStripeMat = toonMat(0xe98aa3);
  const sL = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.14, 0.12), doorStripeMat);
  const sR = sL.clone();
  martDoorL.add(sL);
  martDoorR.add(sR);
  mart.add(martDoorL, martDoorR);

  worldRefs.doors.mart = {
    openAmount: 0,
    targetOpen: 0,
    wasOpen: false,
    doorPos: new THREE.Vector3(-15, 0, 6.8),
    update(dt) {
      this.openAmount += (this.targetOpen - this.openAmount) * Math.min(1, dt * 8);
      martDoorL.position.x = -0.64 - this.openAmount * 1.15;
      martDoorR.position.x = 0.64 + this.openAmount * 1.15;
    },
  };

  // Mart Interior: Checkout counter, stocked shelves, drink cooler, warm bright light
  const martCounter = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.0, 0.9), toonMat(0xebe4d8));
  martCounter.position.set(-2.6, 0.5, 2.0);
  martCounter.castShadow = true;
  mart.add(martCounter);
  collision.addBoxCenter(-17.6, 12.5, 3.5, 1.0);

  // Cash register
  const register = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.42), toonMat(0x3b4250));
  register.position.set(-2.2, 1.18, 2.0);
  mart.add(register);

  // Drink cooler along East wall
  const cooler = new THREE.Mesh(new THREE.BoxGeometry(0.75, 2.1, 4.4), toonMat(0xdcf0fb, { emissive: 0x99d6f5, emissiveIntensity: 0.35 }));
  cooler.position.set(4.4, 1.1, 0.4);
  mart.add(cooler);
  collision.addBoxCenter(-10.6, 10.9, 0.9, 4.5);

  // Two product aisles
  const shelfMat = toonMat(0xf1ece3);
  const itemColors = [0xe98aa3, 0x5ab079, 0xf2be5c, 0x5d9bd4, 0xd86b5c];
  for (const sx of [0.8, 2.5]) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.45, 3.4), shelfMat);
    shelf.position.set(sx, 0.76, 0.3);
    shelf.castShadow = true;
    mart.add(shelf);
    collision.addBoxCenter(-15 + sx, 10.8, 0.8, 3.5);
    for (let k = 0; k < 5; k++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.34), toonMat(itemColors[k % itemColors.length]));
      box.position.set(sx - 0.22, 1.05 + (k % 2) * 0.25, -1.0 + k * 0.55);
      mart.add(box);
    }
  }

  // Interior convenience store bright light (main night beacon!)
  const martLight = new THREE.PointLight(0xfff6e5, 2.2, 17, 1.4);
  martLight.position.set(-15, 3.1, 10.2);
  scene.add(martLight);
  worldRefs.martLights.push(martLight);

  // =========================================================================
  // 2. CAFÉ KOMOREBI (喫茶 こもれび - Enterable Showa Café) at X=+15, Z=+10.5
  // =========================================================================
  const cafeFloor = createTileFloorTexture('#9e7450', '#8f6644');
  cafeFloor.repeat.set(4, 3);
  const cafe = buildEnterableShell({
    cx: 15, cz: 10.5, w: 10, d: 7.4, h: 3.6,
    wallColor: 0xf4ead8,
    floorTex: cafeFloor,
    doorSide: 'north', doorW: 1.8, doorH: 2.35,
    roofStyle: 'gable', roofColor: 0x6e473b,
  });

  // Warm wooden wainscot & striped awning
  const awning = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.16, 1.35), toonMat(0xb85b4c));
  awning.position.set(0, 2.7, -4.25);
  awning.rotation.x = 0.25;
  awning.castShadow = true;
  cafe.add(awning);

  const cafeSignTex = createSignTexture({
    text: '喫茶 こもれび',
    subtext: 'COFFEE & TOAST · 08:00-21:00',
    bg: '#3f2e25',
    border: '#d6a46c',
    textColor: '#fcefd9',
    accentColor: '#f0b878',
  });
  const cafeSignMat = new THREE.MeshStandardMaterial({
    map: cafeSignTex,
    emissive: 0xffd7a3,
    emissiveMap: cafeSignTex,
    emissiveIntensity: 0.45,
    roughness: 0.5,
  });
  const cafeSign = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.9, 0.22), cafeSignMat);
  cafeSign.position.set(0, 3.35, -3.82);
  cafe.add(cafeSign);
  worldRefs.cafeSignMat = cafeSignMat;

  // Café windows
  for (const wx of [-3.0, 3.0]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 0.3), matGlass);
    win.position.set(wx, 1.65, -3.68);
    cafe.add(win);
  }

  // Café hinged wooden door
  const cafeDoorPivot = new THREE.Group();
  cafeDoorPivot.position.set(-0.9, 0, -3.68);
  const cafeDoorLeaf = new THREE.Mesh(new THREE.BoxGeometry(1.75, 2.3, 0.12), matWoodWarm);
  cafeDoorLeaf.position.set(0.88, 1.18, 0);
  const cafeDoorGlass = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.14), matGlass);
  cafeDoorGlass.position.set(0.88, 1.5, 0);
  cafeDoorPivot.add(cafeDoorLeaf, cafeDoorGlass);
  cafe.add(cafeDoorPivot);

  const cafeDoorCollider = collision.addBoxCenter(15, 6.8, 1.8, 0.35, { active: false, tag: 'cafeDoor' });
  worldRefs.doors.cafe = {
    openAmount: 0,
    targetOpen: 0,
    isClosedForNight: false,
    doorPos: new THREE.Vector3(15, 0, 6.8),
    collider: cafeDoorCollider,
    update(dt) {
      const target = this.isClosedForNight ? 0 : this.targetOpen;
      this.openAmount += (target - this.openAmount) * Math.min(1, dt * 7);
      cafeDoorPivot.rotation.y = this.openAmount * 1.35;
      this.collider.active = this.isClosedForNight;
    },
  };

  // Chalkboard menu stand outside café
  const chalkboard = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.05, 0.12), toonMat(0x2e3b34));
  chalkboard.position.set(-2.3, 0.55, -4.45);
  chalkboard.rotation.y = 0.25;
  chalkboard.castShadow = true;
  cafe.add(chalkboard);

  // Café interior: wooden bar counter, coffee siphon, warm cup, tables & chairs
  const cafeBar = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.05, 0.9), matWoodDark);
  cafeBar.position.set(1.6, 0.55, 1.8);
  cafeBar.castShadow = true;
  cafe.add(cafeBar);
  collision.addBoxCenter(16.6, 12.3, 4.9, 1.0);

  // Coffee siphon & cup on counter
  const siphon = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.42, 8), toonMat(0x4b3528));
  siphon.position.set(0.7, 1.28, 1.8);
  cafe.add(siphon);

  const coffeeCup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.14, 10), toonMat(0xfdfbf7));
  coffeeCup.position.set(1.8, 1.15, 1.55);
  coffeeCup.visible = false; // Appears when player orders hand-drip coffee!
  cafe.add(coffeeCup);
  worldRefs.cafeCoffeeCup = coffeeCup;

  // Two wooden tables & chairs
  for (const [tx, tz] of [[-2.7, -0.4], [-2.7, 1.9]]) {
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.1, 1.0), matWoodWarm);
    tableTop.position.set(tx, 0.78, tz);
    tableTop.castShadow = true;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.75, 6), matWoodDark);
    leg.position.set(tx, 0.38, tz);
    cafe.add(tableTop, leg);
    collision.addBoxCenter(15 + tx, 10.5 + tz, 1.25, 1.0);

    // Chairs
    for (const cxOff of [-0.95, 0.95]) {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.48), matWoodWarm);
      seat.position.set(tx + cxOff, 0.48, tz);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.48), matWoodDark);
      back.position.set(tx + cxOff + (cxOff < 0 ? -0.2 : 0.2), 0.76, tz);
      cafe.add(seat, back);
    }
  }

  // Warm amber pendant light inside Café
  const cafeLight = new THREE.PointLight(0xffcb88, 2.0, 14, 1.5);
  cafeLight.position.set(15, 3.0, 10.5);
  scene.add(cafeLight);
  worldRefs.cafeLights.push(cafeLight);

  // =========================================================================
  // 3. SAKURA HOUSE (桜荘 - Player's Enterable Home) at X=-26, Z=-27.2
  // =========================================================================
  const tatamiTex = createTatamiTexture();
  tatamiTex.repeat.set(3, 3);
  const home = buildEnterableShell({
    cx: -26, cz: -27.2, w: 8.2, d: 6.8, h: 3.4,
    wallColor: 0xf4eee3,
    floorTex: tatamiTex,
    doorSide: 'south', doorW: 1.7, doorH: 2.3,
    roofStyle: 'gable', roofColor: 0x3f4c63,
  });

  // Sliding wooden genkan door
  const homeDoor = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.25, 0.1), matWoodWarm);
  homeDoor.position.set(0, 1.15, 3.38);
  const doorPane = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.12), matGlass);
  doorPane.position.set(0, 0.2, 0);
  homeDoor.add(doorPane);
  home.add(homeDoor);
  worldRefs.doors.home = {
    openAmount: 0,
    targetOpen: 0,
    doorPos: new THREE.Vector3(-26, 0, -23.8),
    update(dt) {
      this.openAmount += (this.targetOpen - this.openAmount) * Math.min(1, dt * 8);
      homeDoor.position.x = this.openAmount * 1.45;
    },
  };

  // Nameplate sign outside home
  const homeSignTex = createSignTexture({
    width: 256, height: 120,
    text: '桜 荘',
    subtext: 'SAKURA HOUSE',
    bg: '#f8f2e6', border: '#6e4b34', textColor: '#3f2e25', accentColor: '#c95f7d',
  });
  const homeSign = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 0.08), toonMat(0xffffff, { map: homeSignTex }));
  homeSign.position.set(-1.6, 1.85, 3.5);
  home.add(homeSign);

  // Home Interior: Low Chabudai table, tea set, Futon bed, Desk, Toggleable Floor Lamp!
  const chabudai = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.42, 1.1), matWoodWarm);
  chabudai.position.set(0, 0.25, -0.2);
  chabudai.castShadow = true;
  home.add(chabudai);
  collision.addBoxCenter(-26, -27.4, 1.5, 1.1);

  // Futon on west side (interact to rest until morning!)
  const futonBase = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.18, 2.3), toonMat(0xfdfbf7));
  futonBase.position.set(-2.6, 0.18, -1.2);
  const futonQuilt = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.2, 1.55), toonMat(0xe98aa3));
  futonQuilt.position.set(-2.6, 0.24, -0.9);
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.14, 0.35), toonMat(0xf5e8c8));
  pillow.position.set(-2.6, 0.3, -2.0);
  home.add(futonBase, futonQuilt, pillow);
  collision.addBoxCenter(-28.6, -28.4, 1.5, 2.3);

  // Toggleable warm Japanese paper floor lamp (行灯)
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.12, 8), matWoodDark);
  lampBase.position.set(2.8, 0.18, -2.1);
  const lampShadeMat = new THREE.MeshStandardMaterial({
    color: 0xfff5e0,
    emissive: 0xffc978,
    emissiveIntensity: 0.85,
    roughness: 0.7,
  });
  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.85, 8), lampShadeMat);
  lampShade.position.set(2.8, 0.68, -2.1);
  home.add(lampBase, lampShade);
  worldRefs.homeLampShadeMat = lampShadeMat;

  const homeLampLight = new THREE.PointLight(0xffcf88, 1.8, 12, 1.4);
  homeLampLight.position.set(-23.2, 2.2, -29.3);
  scene.add(homeLampLight);
  worldRefs.homeLampLight = homeLampLight;

  // Mailbox right outside Sakura House at X=-23.2, Z=-23.2
  const mbGroup = new THREE.Group();
  mbGroup.position.set(-23.2, 0, -23.2);
  const mbPost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), matWoodDark);
  mbPost.position.y = 0.55;
  const mbBox = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.32, 0.34), toonMat(0xc9524c));
  mbBox.position.y = 1.15;
  mbBox.castShadow = true;
  const mbFlag = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.24, 0.14), toonMat(0xf6d465));
  mbFlag.position.set(0.26, 1.25, 0);
  mbGroup.add(mbPost, mbBox, mbFlag);
  root.add(mbGroup);
  collision.addCircle(-23.2, -23.2, 0.35);
  worldRefs.mailboxFlag = mbFlag;

  // =========================================================================
  // 4. SAKURA STATION (桜駅 - West of Level Crossing, Enterable Waiting Hall + Raised Platform)
  // =========================================================================
  const stationGroup = new THREE.Group();
  root.add(stationGroup);

  // Raised concrete platform (X in [-22.5, -4.0], Z in [-18.2, -14.0], top at Y=0.45)
  const platMesh = new THREE.Mesh(new THREE.BoxGeometry(18.5, 0.48, 4.2), toonMat(0xd5d2cb));
  platMesh.position.set(-13.25, 0.22, -16.1);
  platMesh.receiveShadow = true;
  platMesh.castShadow = true;
  stationGroup.add(platMesh);

  // Yellow tactile safety line (点字ブロック) along platform track edge
  const safetyLine = new THREE.Mesh(new THREE.BoxGeometry(18.0, 0.03, 0.28), toonMat(0xf0c748));
  safetyLine.position.set(-13.25, 0.46, -14.35);
  stationGroup.add(safetyLine);

  // Platform canopy roof supported by timber posts
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.18, 3.6), toonMat(0x4b5c73));
  canopy.position.set(-13.25, 3.65, -16.1);
  canopy.castShadow = true;
  stationGroup.add(canopy);
  for (const px of [-20, -15.5, -11, -6.5]) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 0.22), matWoodDark);
    col.position.set(px, 2.05, -16.4);
    col.castShadow = true;
    stationGroup.add(col);
  }

  // Station Platform Signboard (桜駅)
  const stPlatSignTex = createSignTexture({
    text: '桜 駅',
    subtext: '◀ 山手   SAKURA   河原 ▶',
    bg: '#ffffff', border: '#394b6b', textColor: '#24324a', accentColor: '#e98aa3',
  });
  const stPlatSign = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.95, 0.12), toonMat(0xffffff, { map: stPlatSignTex }));
  stPlatSign.position.set(-9.5, 2.75, -16.1);
  stationGroup.add(stPlatSign);

  // Enterable Waiting Room Building north of platform (X in [-16.0, -7.0], Z in [-22.6, -18.2])
  const stFloor = createTileFloorTexture('#ebe6dd', '#ded8ce');
  stFloor.repeat.set(3, 2);
  const stFloorMesh = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.12, 4.4), toonMat(0xffffff, { map: stFloor }));
  stFloorMesh.position.set(-11.5, 0.06, -20.4);
  stFloorMesh.receiveShadow = true;
  stationGroup.add(stFloorMesh);

  // Side walls + North entrance wall with wide open doorway + South passage onto platform
  const stWallMat = toonMat(0xf3ece0);
  const addStWall = (x, z, sx, sy, sz) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), stWallMat);
    m.position.set(x, sy / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    stationGroup.add(m);
  };
  addStWall(-16.0, -20.4, 0.26, 3.4, 4.4);
  addStWall(-7.0, -20.4, 0.26, 3.4, 4.4);
  // North facade flanking entrance (door X in [-13.0, -10.0])
  addStWall(-14.5, -22.6, 3.0, 3.4, 0.26);
  addStWall(-8.5, -22.6, 3.0, 3.4, 0.26);
  addStWall(-11.5, -22.6, 3.0, 1.0, 0.26);
  // Pitched station roof
  const stRoof = new THREE.Mesh(new THREE.ConeGeometry(6.8, 2.0, 4), matRoofTile);
  stRoof.position.set(-11.5, 4.35, -20.4);
  stRoof.rotation.y = Math.PI / 4;
  stRoof.scale.set(1.12, 1, 0.62);
  stRoof.castShadow = true;
  stationGroup.add(stRoof);

  // Station Front Sign (桜駅)
  const stFrontSignTex = createSignTexture({
    text: '桜 駅',
    subtext: 'SAKURA STATION',
    bg: '#394b6b', border: '#e98aa3', textColor: '#ffffff', accentColor: '#ffd4e0',
  });
  const stFrontSign = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.88, 0.16), toonMat(0xffffff, { map: stFrontSignTex }));
  stFrontSign.position.set(-11.5, 3.1, -22.8);
  stationGroup.add(stFrontSign);

  // Colliders for station waiting room walls (leaving Main Road X in [-3, 3] completely open!)
  collision.addBox(-16.2, -15.8, -22.7, -18.1);
  collision.addBox(-7.2, -6.8, -22.7, -18.1);
  collision.addBox(-16.0, -13.05, -22.8, -22.4);
  collision.addBox(-9.95, -7.0, -22.8, -22.4);
  // Prevent falling off south edge of platform onto tracks (X in [-22.6, -4.0] only!)
  collision.addBox(-22.6, -4.0, -14.15, -13.7, { tag: 'platformEdge' });
  collision.addBox(-22.8, -22.4, -18.2, -14.0);
  collision.addBox(-4.2, -3.8, -18.2, -14.0);

  // Waiting room parcel shelf & Kenji's Coffee Bean Parcel (interactive!)
  const parcelShelf = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 0.65), matWoodWarm);
  parcelShelf.position.set(-14.6, 0.48, -19.8);
  stationGroup.add(parcelShelf);
  collision.addBoxCenter(-14.6, -19.8, 1.5, 0.7);

  const parcelMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.42, 0.45), toonMat(0xd4a56a));
  parcelMesh.position.set(-14.6, 1.14, -19.8);
  const parcelTape = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.08, 0.12), toonMat(0x8e5d38));
  parcelMesh.add(parcelTape);
  stationGroup.add(parcelMesh);
  worldRefs.stationParcelMesh = parcelMesh;

  // Station warm light
  const stLight = new THREE.PointLight(0xffebb8, 1.6, 15, 1.5);
  stLight.position.set(-11.5, 3.0, -18.5);
  scene.add(stLight);
  worldRefs.streetLights.push({ light: stLight, bulbMat: null, baseIntensity: 1.6 });

  // =========================================================================
  // 5. SAKURA SHRINE (桜神社) on North Hill Plateau (X=16, Z=-39, Y=3.0)
  // =========================================================================
  const shrineGroup = new THREE.Group();
  root.add(shrineGroup);

  const matTorii = toonMat(0xcf4238);
  function addTorii(x, y, z, scale = 1) {
    const t = new THREE.Group();
    t.position.set(x, y, z);
    const pL = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * scale, 0.2 * scale, 3.8 * scale, 8), matTorii);
    pL.position.set(-1.7 * scale, 1.9 * scale, 0);
    pL.castShadow = true;
    const pR = pL.clone();
    pR.position.x = 1.7 * scale;
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(4.8 * scale, 0.28 * scale, 0.36 * scale), matTorii);
    topBar.position.y = 3.7 * scale;
    topBar.castShadow = true;
    const cap = new THREE.Mesh(new THREE.BoxGeometry(5.1 * scale, 0.14 * scale, 0.44 * scale), toonMat(0x2d2a33));
    cap.position.y = 3.88 * scale;
    const subBar = new THREE.Mesh(new THREE.BoxGeometry(4.1 * scale, 0.2 * scale, 0.24 * scale), matTorii);
    subBar.position.y = 3.05 * scale;
    t.add(pL, pR, topBar, cap, subBar);
    shrineGroup.add(t);
  }
  addTorii(16, 0, -24.2, 1.05);
  addTorii(16, 3.0, -34.2, 0.95);

  // Main Shrine Hall (本殿) at X=16, Z=-42.5, Y=3.0
  const honden = new THREE.Group();
  honden.position.set(16, 3.0, -42.2);
  const hBase = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.55, 4.2), toonMat(0xa5a098));
  hBase.position.y = 0.28;
  const hBody = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.7, 3.4), matWoodWarm);
  hBody.position.y = 1.85;
  hBody.castShadow = true;
  const hRoof = new THREE.Mesh(new THREE.ConeGeometry(4.4, 2.0, 4), toonMat(0x3b444f));
  hRoof.position.y = 4.1;
  hRoof.rotation.y = Math.PI / 4;
  hRoof.scale.set(1.25, 1, 0.95);
  hRoof.castShadow = true;
  honden.add(hBase, hBody, hRoof);

  // Offertory box (賽銭箱) & swaying Suzu bell rope
  const saisen = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.85, 0.7), matWoodDark);
  saisen.position.set(0, 0.95, 2.2);
  saisen.castShadow = true;
  honden.add(saisen);

  const bellGroup = new THREE.Group();
  bellGroup.position.set(0, 2.85, 2.0);
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), toonMat(0xdcb452));
  bell.position.y = -0.25;
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.2, 7), toonMat(0xf4ece2));
  rope.position.y = -0.9;
  bellGroup.add(bell, rope);
  honden.add(bellGroup);
  worldRefs.shrineBellGroup = bellGroup;

  shrineGroup.add(honden);
  collision.addBoxCenter(16, -42.2, 5.6, 4.4);

  // Stone Lanterns (石灯籠) flanking the shrine path
  const stoneMat = toonMat(0xa7a5a0);
  for (const [lx, lz] of [[12.5, -35.5], [19.5, -35.5], [12.5, -39.5], [19.5, -39.5]]) {
    const lGroup = new THREE.Group();
    lGroup.position.set(lx, 3.0, lz);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.1, 6), stoneMat);
    ped.position.y = 0.55;
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xffefc9, emissive: 0xffb85c, emissiveIntensity: 0.2, roughness: 0.5,
    });
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.38), glowMat);
    box.position.y = 1.3;
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.35, 6), stoneMat);
    cap.position.y = 1.68;
    lGroup.add(ped, box, cap);
    shrineGroup.add(lGroup);
    worldRefs.shrineLanternMats.push(glowMat);
    collision.addCircle(lx, lz, 0.3);
  }

  // Haru's Lost Keepsake Photo glowing softly near the hidden east shed crate (X=35.1, Z=-23.5)
  const photoGroup = new THREE.Group();
  photoGroup.position.set(34.7, 0.58, -23.6);
  const photoMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.05, 0.24),
    new THREE.MeshStandardMaterial({ color: 0xfff3d4, emissive: 0xffd27a, emissiveIntensity: 0.65 })
  );
  photoMesh.rotation.y = 0.4;
  photoGroup.add(photoMesh);
  root.add(photoGroup);
  worldRefs.lostPhotoMesh = photoGroup;

  // =========================================================================
  // 6. HIGH-DETAIL LIVED-IN SUPPORTING BUILDINGS (Exterior + Dynamic Windows)
  // =========================================================================
  function buildLivedInHouse({
    x, z, w, d, h, wallColor, roofColor, rotY = 0,
    signText = null, signSub = '', signBg = '#fcf8f2', signAccent = '#e98aa3',
    residentId = null, addBike = false, addLaundry = false,
  }) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotY;

    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), toonMat(wallColor));
    body.position.y = h / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    addSubtleEdges(body);
    g.add(body);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.78, 1.9, 4), toonMat(roofColor));
    roof.position.y = h + 0.92;
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d));
    roof.castShadow = true;
    g.add(roof);

    // Front Door
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.05, 0.14), matWoodDark);
    door.position.set(-w * 0.22, 1.05, d / 2 + 0.05);
    g.add(door);

    // Dynamic glowing windows (front & upper floor if tall)
    const winTex = createWindowTexture(false);
    const winMat = new THREE.MeshStandardMaterial({
      map: winTex,
      emissive: 0xffd185,
      emissiveIntensity: 0.0,
      roughness: 0.35,
    });
    const addWin = (wx, wy, wz) => {
      const wm = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.05, 0.12), winMat);
      wm.position.set(wx, wy, wz);
      g.add(wm);
    };
    addWin(w * 0.22, 1.55, d / 2 + 0.05);
    if (h >= 4.4) {
      addWin(-w * 0.22, 3.65, d / 2 + 0.05);
      addWin(w * 0.22, 3.65, d / 2 + 0.05);
    }
    if (residentId) {
      if (!worldRefs.houseWindows[residentId]) worldRefs.houseWindows[residentId] = [];
      worldRefs.houseWindows[residentId].push(winMat);
    } else {
      worldRefs.genericWindows.push(winMat);
    }

    // Optional shop sign
    if (signText) {
      const st = createSignTexture({
        text: signText, subtext: signSub, bg: signBg, border: '#3b4352', accentColor: signAccent,
      });
      const sm = new THREE.Mesh(new THREE.BoxGeometry(Math.min(w * 0.78, 4.4), 0.78, 0.18), toonMat(0xffffff, { map: st }));
      sm.position.set(0, h - 0.55, d / 2 + 0.14);
      g.add(sm);
    }

    // Outdoor AC unit (室外機) — iconic Japanese town detail!
    const ac = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.36), toonMat(0xe5e3dd));
    ac.position.set(w / 2 + 0.22, 0.32, d * 0.15);
    const fan = new THREE.Mesh(new THREE.CircleGeometry(0.18, 10), toonMat(0x5b6069));
    fan.position.set(0.39, 0, 0);
    fan.rotation.y = Math.PI / 2;
    ac.add(fan);
    g.add(ac);

    // Potted plant by doorway
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.28, 7), toonMat(0xb66b4e));
    pot.position.set(-w * 0.22 + 0.85, 0.14, d / 2 + 0.32);
    const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), toonMat(0x5fa164));
    bush.position.y = 0.28;
    pot.add(bush);
    g.add(pot);

    // Optional parked bicycle
    if (addBike) {
      const bike = createBicycleMesh();
      bike.position.set(w * 0.34, 0, d / 2 + 0.55);
      bike.rotation.y = 0.2;
      g.add(bike);
    }

    // Optional laundry pole on side
    if (addLaundry) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.2, 6), matMetal);
      pole.rotation.z = Math.PI / 2;
      pole.position.set(0, 2.75, d / 2 + 0.45);
      g.add(pole);
      const shirtColors = [0xfefefe, 0xa8d0f0, 0xf7b9cb];
      shirtColors.forEach((sc, idx) => {
        const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.58, 0.06), toonMat(sc));
        cloth.position.set(-0.6 + idx * 0.6, 2.42, d / 2 + 0.45);
        g.add(cloth);
      });
    }

    root.add(g);
    const effW = Math.abs(Math.cos(rotY)) > 0.5 ? w : d;
    const effD = Math.abs(Math.cos(rotY)) > 0.5 ? d : w;
    collision.addBoxCenter(x, z, effW + 0.45, effD + 0.45);
    return g;
  }

  // South Shopping Street extensions (facing north onto shopping road, rotY = PI)
  buildLivedInHouse({
    x: -31, z: 10.8, w: 7.4, d: 6.2, h: 3.6,
    wallColor: 0xf4ece4, roofColor: 0x9f4944, rotY: Math.PI,
    signText: '桜郵便局', signSub: 'POST OFFICE 〒', signBg: '#fff8f6', signAccent: '#d64541',
    addBike: true,
  });
  buildLivedInHouse({
    x: 31, z: 10.8, w: 7.4, d: 6.2, h: 3.6,
    wallColor: 0xf8efe0, roofColor: 0x875842, rotY: Math.PI,
    signText: 'はなベーカリー', signSub: 'BAKERY', signBg: '#fff9ee', signAccent: '#d98a4a',
    addBike: true,
  });

  // North side of Shopping Street (facing south onto shopping road, rotY = 0)
  buildLivedInHouse({
    x: -15, z: -5.8, w: 7.6, d: 5.4, h: 4.5,
    wallColor: 0xeae1d0, roofColor: 0x455264, rotY: 0,
    signText: '古書 桜堂', signSub: 'BOOKS', signBg: '#f6f0e2', signAccent: '#5a6e82',
  });
  const barberHouse = buildLivedInHouse({
    x: 15, z: -5.8, w: 7.4, d: 5.4, h: 4.2,
    wallColor: 0xf2f4f6, roofColor: 0x4b6a82, rotY: 0,
    signText: '理容 かぜ', signSub: 'BARBER', signBg: '#ffffff', signAccent: '#4682b4',
  });
  // Classic spinning barber pole!
  const bPole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.05, 10), toonMat(0xe85a5a));
  bPole.position.set(15 + 3.2, 1.35, -2.95);
  const bStripe = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.08), toonMat(0x3f7ec2));
  bPole.add(bStripe);
  root.add(bPole);
  worldRefs.barberPole = bPole;

  // Core Residents' Houses (linked to their occupancy!)
  // Kenji's Home (East North Lane)
  buildLivedInHouse({
    x: 26, z: -18.5, w: 6.8, d: 5.6, h: 4.4,
    wallColor: 0xefe7d8, roofColor: 0x5d493c, rotY: Math.PI,
    residentId: 'kenji', addBike: true, addLaundry: true,
  });
  // Haru's Traditional Residence (South-West quiet lane)
  buildLivedInHouse({
    x: -31, z: 18.8, w: 7.4, d: 5.8, h: 3.4,
    wallColor: 0xeadfc9, roofColor: 0x434c5c, rotY: 0,
    residentId: 'haru', addLaundry: true,
  });
  // Ren's Small Apartment (North Lane, east of Main Road)
  buildLivedInHouse({
    x: 5.5, z: -28.0, w: 6.8, d: 5.4, h: 4.8,
    wallColor: 0xe6ebee, roofColor: 0x526173, rotY: 0,
    residentId: 'ren', addBike: true,
  });
  // Aoi's Apartment (East-South quiet corner)
  buildLivedInHouse({
    x: 31, z: 18.8, w: 6.8, d: 5.4, h: 4.8,
    wallColor: 0xf4ecf0, roofColor: 0x5d6475, rotY: 0,
    residentId: 'aoi', addBike: true,
  });
  // Extra cozy neighborhood houses filling the west edge naturally
  buildLivedInHouse({
    x: -35, z: -6.0, w: 6.6, d: 5.4, h: 4.2,
    wallColor: 0xf0e9dc, roofColor: 0x546270, rotY: 0,
  });
  buildLivedInHouse({
    x: 34, z: -6.0, w: 6.6, d: 5.4, h: 4.2,
    wallColor: 0xede7df, roofColor: 0x6b564a, rotY: 0,
  });

  // =========================================================================
  // 7. STREET PROPS: Vending Machines, Postbox, Notice Board, Benches, Poles, Streetlights, Festival Lanterns
  // =========================================================================

  // Interactive Vending Machines (physically dispense 3D drink cans!)
  function addVendingMachine(id, x, z, rotY = 0, accent = '#d84a4a') {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotY;
    const frontTex = createVendingFrontTexture(accent);
    const bodyMat = toonMat(0xf5f2ec);
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex, emissive: 0xffffff, emissiveMap: frontTex, emissiveIntensity: 0.32, roughness: 0.35,
    });
    const mats = [bodyMat, bodyMat, bodyMat, bodyMat, frontMat, bodyMat];
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.85, 0.72), mats);
    box.position.y = 0.925;
    box.castShadow = true;
    g.add(box);

    // Physical dispensed can mesh in pickup tray (hidden until player buys!)
    const canMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.19, 10),
      toonMat(accent === '#d84a4a' ? 0x62b46e : 0xd48c46)
    );
    canMesh.rotation.z = Math.PI / 2;
    canMesh.position.set(0, 0.36, 0.38);
    canMesh.visible = false;
    g.add(canMesh);

    root.add(g);
    collision.addBoxCenter(x, z, 1.2, 0.85);
    const frontDir = new THREE.Vector3(Math.sin(rotY), 0, Math.cos(rotY));
    worldRefs.vendingMachines.push({
      id,
      pos: new THREE.Vector3(x, 0, z).addScaledVector(frontDir, 0.9),
      canMesh,
      hasDispensedCan: false,
      dispensedItemId: null,
      frontMat,
    });
  }

  addVendingMachine('vm_mart', -9.2, 7.6, Math.PI, '#45a36e');       // Outside Sakura Mart
  addVendingMachine('vm_station', -6.0, -21.8, Math.PI, '#d84a4a'); // Outside Sakura Station
  addVendingMachine('vm_park', -10.5, 21.3, 0, '#4482c9');          // Riverside Park

  // Red Japanese Postbox (郵便ポスト) outside Post Office
  const postbox = new THREE.Group();
  postbox.position.set(-26.5, 0, 7.0);
  const pbBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.55, 10), toonMat(0x4b4e57));
  pbBase.position.y = 0.28;
  const pbBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.92, 12), toonMat(0xd93f38));
  pbBody.position.y = 0.95;
  pbBody.castShadow = true;
  const pbCap = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), toonMat(0xd93f38));
  pbCap.position.y = 1.4;
  postbox.add(pbBase, pbBody, pbCap);
  root.add(postbox);
  collision.addCircle(-26.5, 7.0, 0.38);

  // Community Bulletin Board (町内掲示板) at Central Intersection (X=-5.4, Z=-2.4)
  const boardGroup = new THREE.Group();
  boardGroup.position.set(-5.4, 0, -2.4);
  const bLegL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), matWoodDark);
  bLegL.position.set(-0.95, 1.0, 0);
  const bLegR = bLegL.clone();
  bLegR.position.x = 0.95;
  const boardTex = createSignTexture({
    text: '桜町 掲示板',
    subtext: '春の行事 · 列車運行 · おしらせ',
    bg: '#f7f1e1', border: '#6e4b34', textColor: '#2e384a', accentColor: '#c95f7d',
  });
  const bFace = new THREE.Mesh(new THREE.BoxGeometry(2.05, 1.1, 0.12), toonMat(0xffffff, { map: boardTex }));
  bFace.position.y = 1.45;
  bFace.castShadow = true;
  const bRoof = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.12, 0.55), matRoofTile);
  bRoof.position.y = 2.12;
  boardGroup.add(bLegL, bLegR, bFace, bRoof);
  root.add(boardGroup);
  collision.addBoxCenter(-5.4, -2.4, 2.1, 0.45);

  // Sittable Park & Station Benches
  function addBench(x, z, rotY = 0) {
    const y = collision.getGroundHeight(x, z);
    const b = new THREE.Group();
    b.position.set(x, y, z);
    b.rotation.y = rotY;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.1, 0.52), matWoodWarm);
    seat.position.y = 0.46;
    seat.castShadow = true;
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.45, 0.08), matWoodWarm);
    back.position.set(0, 0.78, -0.22);
    back.rotation.x = -0.15;
    for (const lx of [-0.72, 0.72]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.46, 0.48), matMetal);
      leg.position.set(lx, 0.23, 0);
      b.add(leg);
    }
    b.add(seat, back);
    root.add(b);
    collision.addBoxCenter(x, z, Math.abs(Math.cos(rotY)) > 0.5 ? 1.8 : 0.65, Math.abs(Math.cos(rotY)) > 0.5 ? 0.65 : 1.8);
  }
  addBench(-6.8, 22.2, 0);           // Riverside Park West Bench
  addBench(7.5, 22.2, 0);            // Riverside Park East Bench
  addBench(-15.5, -16.5, 0);         // Station Platform Bench
  addBench(11.8, -34.2, 0);          // Shrine Overlook Bench!

  // Parked Japanese Kei-Car (stationary charm detail, clear of roads)
  const keiCar = createKeiCarMesh(0xf6e6b8);
  keiCar.position.set(-22.5, 0, -5.2);
  keiCar.rotation.y = Math.PI / 2;
  root.add(keiCar);
  collision.addBoxCenter(-22.5, -5.2, 3.3, 1.7);

  const keiCar2 = createKeiCarMesh(0xa8cde0);
  keiCar2.position.set(22.8, 0, -14.5);
  keiCar2.rotation.y = Math.PI / 2;
  root.add(keiCar2);
  collision.addBoxCenter(22.8, -14.5, 3.3, 1.7);

  // Utility Poles with Overhead Power Lines & Warm Streetlights!
  const polePositions = [
    [-26, -1.6], [-10, -1.6], [10, -1.6], [26, -1.6],
    [-26, 5.6], [-8, 5.6], [8, 5.6], [26, 5.6],
    [-16, -19.8], [11, -19.8],
    [-15, 21.4], [15, 21.4],
  ];
  const poleMat = toonMat(0x7c7a78);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x2f2f38, transparent: true, opacity: 0.6 });

  polePositions.forEach(([px, pz], idx) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 6.2, 7), poleMat);
    pole.position.set(px, 3.1, pz);
    pole.castShadow = true;
    root.add(pole);

    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.1), matMetal);
    arm.position.set(px, 5.6, pz);
    root.add(arm);

    // Streetlamp fixture on every other pole (or all key intersections)
    const lampArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.85), matMetal);
    lampArm.position.set(px, 4.45, pz + (pz < 2 ? 0.35 : -0.35));
    root.add(lampArm);

    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfff3d4, emissive: 0xffc773, emissiveIntensity: 0.0, roughness: 0.3,
    });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 8), bulbMat);
    bulb.position.set(px, 4.35, pz + (pz < 2 ? 0.72 : -0.72));
    root.add(bulb);

    // Add real PointLights on key streetlamps (keep light count efficient for smooth 60fps!)
    let light = null;
    if (idx % 2 === 0) {
      light = new THREE.PointLight(0xffcb80, 0, 15, 1.6);
      light.position.set(px, 4.1, pz + (pz < 2 ? 0.72 : -0.72));
      scene.add(light);
    }
    worldRefs.streetLights.push({ light, bulbMat, baseIntensity: 1.8 });
    collision.addCircle(px, pz, 0.22);
  });

  // Overhead sagging power wires connecting shopping street poles
  const wirePairs = [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7]];
  wirePairs.forEach(([a, b]) => {
    const [x1, z1] = polePositions[a];
    const [x2, z2] = polePositions[b];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x1, 5.55, z1),
      new THREE.Vector3((x1 + x2) / 2, 4.85, (z1 + z2) / 2),
      new THREE.Vector3(x2, 5.55, z2)
    );
    const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(10));
    root.add(new THREE.Line(geom, lineMat));
  });

  // Riverside Spring Festival Lanterns (glow warmly once town gathering is unlocked!)
  for (let lx = -24; lx <= 24; lx += 4.8) {
    if (Math.abs(lx) < 3.5) continue;
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.7, 6), matWoodDark);
    pole.position.set(lx, 1.35, 24.7);
    root.add(pole);

    const lMat = new THREE.MeshStandardMaterial({
      color: 0xffd2de, emissive: 0xff809e, emissiveIntensity: 0.08, roughness: 0.5,
    });
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), lMat);
    lantern.scale.set(0.85, 1.25, 0.85);
    lantern.position.set(lx, 2.52, 24.7);
    root.add(lantern);
    worldRefs.festivalLanterns.push(lMat);
  }

  return worldRefs;
}

function createBicycleMesh() {
  const g = new THREE.Group();
  const wheelMat = toonMat(0x3a3c45);
  const frameMat = toonMat(0xd96b7c);
  const w1 = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 6, 12), wheelMat);
  w1.position.set(-0.42, 0.3, 0);
  const w2 = w1.clone();
  w2.position.x = 0.42;
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.06, 0.06), frameMat);
  bar.position.set(0, 0.55, 0);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.46), toonMat(0xb8bec7));
  handle.position.set(0.36, 0.72, 0);
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.28), toonMat(0xc59a69));
  basket.position.set(0.5, 0.7, 0);
  g.add(w1, w2, bar, handle, basket);
  return g;
}

function createKeiCarMesh(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 3.0), toonMat(color));
  body.position.y = 0.55;
  body.castShadow = true;
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.62, 1.85), toonMat(color));
  cabin.position.set(0, 1.15, -0.15);
  cabin.castShadow = true;
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.44, 1.55), toonMat(0x7c9cb8));
  glass.position.set(0, 1.18, -0.15);
  const wheelMat = toonMat(0x32343d);
  for (const [wx, wz] of [[-0.72, 0.92], [0.72, 0.92], [-0.72, -0.92], [0.72, -0.92]]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.18, 10), wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(wx, 0.26, wz);
    g.add(w);
  }
  g.add(body, cabin, glass);
  return g;
}
