import * as THREE from 'three';
import {
  createStoreSignTexture,
  createSideSignTexture,
  createPosterTexture
} from './textures.js';
import { createStoreInterior } from './interiorDetails.js';
import { addAnimeOutline } from './materials.js';

export function createConvenienceStore(materials) {
  const storeGroup = new THREE.Group();
  storeGroup.name = 'convenience_store';

  // Overall Store Dimensions
  const storeWidth = 11.8;
  const storeHeight = 4.4;
  const storeDepth = 6.8;

  // 1. Interior Floor
  const floorGeo = new THREE.PlaneGeometry(storeWidth, storeDepth);
  const floor = new THREE.Mesh(floorGeo, materials.interiorFloor);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0.1, 0);
  storeGroup.add(floor);

  // 2. Ceiling & Roof
  const ceilingGeo = new THREE.BoxGeometry(storeWidth, 0.25, storeDepth);
  const ceiling = new THREE.Mesh(ceilingGeo, materials.interiorCeiling);
  ceiling.position.set(0, storeHeight, 0);
  storeGroup.add(ceiling);

  // Roof Parapet (Top rim edge)
  const parapetGeo = new THREE.BoxGeometry(storeWidth + 0.3, 0.5, storeDepth + 0.3);
  const parapetMat = new THREE.MeshToonMaterial({ color: 0x334155 });
  const parapet = new THREE.Mesh(parapetGeo, parapetMat);
  parapet.position.set(0, storeHeight + 0.25, 0);
  storeGroup.add(parapet);

  // 3. Walls
  // Back Wall (Solid)
  const backWallGeo = new THREE.BoxGeometry(storeWidth, storeHeight, 0.3);
  const backWall = new THREE.Mesh(backWallGeo, materials.storeWallCream);
  backWall.position.set(0, storeHeight / 2, -storeDepth / 2);
  storeGroup.add(backWall);

  // Right Wall (Solid)
  const rightWallGeo = new THREE.BoxGeometry(0.3, storeHeight, storeDepth);
  const rightWall = new THREE.Mesh(rightWallGeo, materials.storeWallCream);
  rightWall.position.set(storeWidth / 2, storeHeight / 2, 0);
  storeGroup.add(rightWall);

  // Left Wall (Corner wrap-around: half glass, half solid)
  const leftWallSolidGeo = new THREE.BoxGeometry(0.3, storeHeight, storeDepth * 0.4);
  const leftWallSolid = new THREE.Mesh(leftWallSolidGeo, materials.storeWallCream);
  leftWallSolid.position.set(-storeWidth / 2, storeHeight / 2, -storeDepth * 0.3);
  storeGroup.add(leftWallSolid);

  // Left side glass window
  const leftGlassGeo = new THREE.BoxGeometry(0.08, storeHeight - 0.7, storeDepth * 0.55);
  const leftGlass = new THREE.Mesh(leftGlassGeo, materials.storeGlass);
  leftGlass.position.set(-storeWidth / 2, (storeHeight - 0.7) / 2 + 0.35, storeDepth * 0.2);
  storeGroup.add(leftGlass);

  // Left window baseboard
  const leftBaseGeo = new THREE.BoxGeometry(0.3, 0.35, storeDepth * 0.55);
  const leftBase = new THREE.Mesh(leftBaseGeo, materials.storeWallDark);
  leftBase.position.set(-storeWidth / 2, 0.35 / 2 + 0.1, storeDepth * 0.2);
  storeGroup.add(leftBase);

  // 4. Front Glass Storefront & Mullions
  // Front window baseboard along ground
  const frontBaseGeo = new THREE.BoxGeometry(storeWidth, 0.35, 0.3);
  const frontBase = new THREE.Mesh(frontBaseGeo, materials.storeWallDark);
  frontBase.position.set(0, 0.35 / 2 + 0.1, storeDepth / 2);
  storeGroup.add(frontBase);

  // Front Main Glass Window (Left section)
  const frontGlassW1 = 6.4;
  const frontGlassH = storeHeight - 0.9;
  const frontGlass1Geo = new THREE.BoxGeometry(frontGlassW1, frontGlassH, 0.08);
  const frontGlass1 = new THREE.Mesh(frontGlass1Geo, materials.storeGlass);
  frontGlass1.position.set(-2.4, frontGlassH / 2 + 0.45, storeDepth / 2);
  storeGroup.add(frontGlass1);

  // Aluminum Mullion Dividers for front glass
  for (let m = 0; m <= 3; m++) {
    const xMullion = -5.5 + m * (frontGlassW1 / 3);
    const mullionGeo = new THREE.BoxGeometry(0.08, frontGlassH, 0.12);
    const mullion = new THREE.Mesh(mullionGeo, materials.metalDark);
    mullion.position.set(xMullion, frontGlassH / 2 + 0.45, storeDepth / 2);
    storeGroup.add(mullion);
  }

  // Front Right Glass Window (To the right of the door, by checkout counter)
  const frontGlassW2 = 1.7;
  const frontGlass2Geo = new THREE.BoxGeometry(frontGlassW2, frontGlassH, 0.08);
  const frontGlass2 = new THREE.Mesh(frontGlass2Geo, materials.storeGlass);
  frontGlass2.position.set(4.9, frontGlassH / 2 + 0.45, storeDepth / 2);
  storeGroup.add(frontGlass2);

  const mullionRGeo = new THREE.BoxGeometry(0.1, frontGlassH, 0.12);
  const mullionR = new THREE.Mesh(mullionRGeo, materials.metalDark);
  mullionR.position.set(5.8, frontGlassH / 2 + 0.45, storeDepth / 2);
  storeGroup.add(mullionR);

  // 5. Automatic Sliding Glass Doors (Entrance)
  const doorSystem = new THREE.Group();
  doorSystem.name = 'automatic_doors';

  const doorWidth = 2.4;
  const doorHeight = 3.0;

  // Outer Door Frame
  const frameTopGeo = new THREE.BoxGeometry(doorWidth + 0.4, 0.15, 0.2);
  const frameTop = new THREE.Mesh(frameTopGeo, materials.metalDark);
  frameTop.position.set(2.8, doorHeight + 0.4, storeDepth / 2);
  doorSystem.add(frameTop);

  // Overhead Motion Sensor Box (With tiny green LED dot)
  const sensorGeo = new THREE.BoxGeometry(0.5, 0.14, 0.18);
  const sensor = new THREE.Mesh(sensorGeo, materials.metalDark);
  sensor.position.set(2.8, doorHeight + 0.55, storeDepth / 2 + 0.08);
  doorSystem.add(sensor);

  const sensorLedGeo = new THREE.SphereGeometry(0.025, 8, 8);
  const sensorLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  const sensorLed = new THREE.Mesh(sensorLedGeo, sensorLedMat);
  sensorLed.position.set(2.8, doorHeight + 0.55, storeDepth / 2 + 0.18);
  doorSystem.add(sensorLed);

  // Sliding Glass Leaf 1 (Left pane)
  const leaf1Group = new THREE.Group();
  const leaf1Geo = new THREE.BoxGeometry(1.15, doorHeight - 0.1, 0.05);
  const leaf1Glass = new THREE.Mesh(leaf1Geo, materials.storeGlass);
  leaf1Glass.position.y = (doorHeight - 0.1) / 2;
  leaf1Group.add(leaf1Glass);

  // Door leaf metal trim
  const leaf1TrimGeo = new THREE.BoxGeometry(1.15, 0.08, 0.06);
  const leaf1Trim = new THREE.Mesh(leaf1TrimGeo, materials.metalDark);
  leaf1Trim.position.y = doorHeight - 0.1;
  leaf1Group.add(leaf1Trim);
  const leaf1HandleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6);
  const leaf1Handle = new THREE.Mesh(leaf1HandleGeo, materials.metalChrome);
  leaf1Handle.position.set(0.48, 1.2, 0.05);
  leaf1Group.add(leaf1Handle);

  // Sliding Glass Leaf 2 (Right pane)
  const leaf2Group = new THREE.Group();
  const leaf2Glass = new THREE.Mesh(leaf1Geo, materials.storeGlass);
  leaf2Glass.position.y = (doorHeight - 0.1) / 2;
  leaf2Group.add(leaf2Glass);
  const leaf2Trim = new THREE.Mesh(leaf1TrimGeo, materials.metalDark);
  leaf2Trim.position.y = doorHeight - 0.1;
  leaf2Group.add(leaf2Trim);
  const leaf2Handle = new THREE.Mesh(leaf1HandleGeo, materials.metalChrome);
  leaf2Handle.position.set(-0.48, 1.2, 0.05);
  leaf2Group.add(leaf2Handle);

  // Initial closed positions
  const doorClosedLeftX = 2.8 - 0.58;
  const doorClosedRightX = 2.8 + 0.58;
  leaf1Group.position.set(doorClosedLeftX, 0.4, storeDepth / 2);
  leaf2Group.position.set(doorClosedRightX, 0.4, storeDepth / 2);
  doorSystem.add(leaf1Group, leaf2Group);

  // Red Welcome Entrance Mat outside ("いらっしゃいませ")
  const matCanvas = document.createElement('canvas');
  matCanvas.width = 256;
  matCanvas.height = 128;
  const mCtx = matCanvas.getContext('2d');
  mCtx.fillStyle = '#dc2626'; // Deep Japanese rubber red mat
  mCtx.fillRect(0, 0, 256, 128);
  mCtx.strokeStyle = '#991b1b';
  mCtx.lineWidth = 6;
  mCtx.strokeRect(6, 6, 244, 116);
  mCtx.fillStyle = '#ffffff';
  mCtx.font = 'bold 26px "Hiragino Kaku Gothic Pro", sans-serif';
  mCtx.textAlign = 'center';
  mCtx.fillText('いらっしゃいませ', 128, 55);
  mCtx.font = 'bold 18px sans-serif';
  mCtx.fillText('WELCOME', 128, 92);

  const matTex = new THREE.CanvasTexture(matCanvas);
  const matGeo = new THREE.PlaneGeometry(2.0, 1.1);
  const matMat = new THREE.MeshBasicMaterial({ map: matTex });
  const welcomeMat = new THREE.Mesh(matGeo, matMat);
  welcomeMat.rotation.x = -Math.PI / 2;
  welcomeMat.position.set(2.8, 0.28, storeDepth / 2 + 1.0);
  doorSystem.add(welcomeMat);

  storeGroup.add(doorSystem);

  // 6. Exterior Awning Canopy & Main Fascia Signboard
  const canopyGroup = new THREE.Group();
  canopyGroup.name = 'canopy_eaves';

  const canopyWidth = storeWidth + 0.8;
  const canopyDepth = 1.8;
  const canopyHeight = 0.35;

  // Canopy roof slab extending over sidewalk
  const canopySlabGeo = new THREE.BoxGeometry(canopyWidth, canopyHeight, canopyDepth);
  const canopySlab = new THREE.Mesh(canopySlabGeo, materials.storeCanopyUnderside);
  canopySlab.position.set(0, storeHeight - 0.2, storeDepth / 2 + canopyDepth / 2 - 0.1);
  canopyGroup.add(canopySlab);

  // Awning front fascia trim
  const awningFrontGeo = new THREE.BoxGeometry(canopyWidth, 0.12, 0.08);
  const awningFront = new THREE.Mesh(awningFrontGeo, materials.storeAwningBlue);
  awningFront.position.set(0, storeHeight - 0.06, storeDepth / 2 + canopyDepth - 0.1);
  canopyGroup.add(awningFront);

  // Main Illuminated Convenience Store Signboard Box (MORI MART / 森のコンビニ)
  const signWidth = storeWidth + 0.4;
  const signHeight = 1.35;
  const signDepth = 0.25;

  const signBoxGeo = new THREE.BoxGeometry(signWidth, signHeight, signDepth);
  const signBoxMat = new THREE.MeshToonMaterial({ color: 0x0f172a });
  const signBox = new THREE.Mesh(signBoxGeo, signBoxMat);
  signBox.position.set(0, storeHeight + 0.7, storeDepth / 2 + 0.1);
  canopyGroup.add(signBox);

  // Sign illuminated face
  const signTex = createStoreSignTexture();
  const signFaceGeo = new THREE.PlaneGeometry(signWidth - 0.1, signHeight - 0.1);
  const signFaceMat = new THREE.MeshBasicMaterial({
    map: signTex
  });
  const signFace = new THREE.Mesh(signFaceGeo, signFaceMat);
  signFace.position.set(0, storeHeight + 0.7, storeDepth / 2 + 0.24);
  canopyGroup.add(signFace);

  // Side Signboard on corner
  const sideSignTex = createSideSignTexture();
  const sideSignGeo = new THREE.PlaneGeometry(signHeight - 0.1, signHeight - 0.1);
  const sideSignMat = new THREE.MeshBasicMaterial({ map: sideSignTex });
  const sideSign = new THREE.Mesh(sideSignGeo, sideSignMat);
  sideSign.rotation.y = -Math.PI / 2;
  sideSign.position.set(-storeWidth / 2 - 0.21, storeHeight + 0.7, storeDepth / 2 + 0.1);
  canopyGroup.add(sideSign);

  // Downlights under canopy roof (Soft warm spotlights onto sidewalk)
  const underLights = [-3.8, 0, 2.8];
  underLights.forEach((x) => {
    const fixtureGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16);
    const fixtureMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const fixture = new THREE.Mesh(fixtureGeo, fixtureMat);
    fixture.position.set(x, storeHeight - 0.4, storeDepth / 2 + 0.8);
    canopyGroup.add(fixture);

    const downLight = new THREE.PointLight(0xffedd5, 1.8, 4.5);
    downLight.position.set(x, storeHeight - 0.5, storeDepth / 2 + 0.8);
    canopyGroup.add(downLight);
  });

  // Rain Gutter Downspout Pipe on the side
  const downspoutGeo = new THREE.CylinderGeometry(0.06, 0.06, storeHeight + 0.5, 12);
  const downspoutMat = new THREE.MeshToonMaterial({ color: 0x475569 });
  const downspout = new THREE.Mesh(downspoutGeo, downspoutMat);
  downspout.position.set(storeWidth / 2 + 0.22, (storeHeight + 0.5) / 2, storeDepth / 2 + 0.1);
  canopyGroup.add(downspout);

  storeGroup.add(canopyGroup);

  // 7. Window Posters mounted on glass
  const poster1Tex = createPosterTexture(0); // Oden poster
  const poster1Geo = new THREE.PlaneGeometry(0.7, 1.05);
  const poster1Mat = new THREE.MeshBasicMaterial({ map: poster1Tex });
  const poster1 = new THREE.Mesh(poster1Geo, poster1Mat);
  poster1.position.set(-4.2, 1.8, storeDepth / 2 + 0.06);
  storeGroup.add(poster1);

  const poster2Tex = createPosterTexture(1); // Anime collaboration
  const poster2Geo = new THREE.PlaneGeometry(0.7, 1.05);
  const poster2Mat = new THREE.MeshBasicMaterial({ map: poster2Tex });
  const poster2 = new THREE.Mesh(poster2Geo, poster2Mat);
  poster2.position.set(-2.0, 1.8, storeDepth / 2 + 0.06);
  storeGroup.add(poster2);

  const poster3Tex = createPosterTexture(2); // Coffee poster
  const poster3Geo = new THREE.PlaneGeometry(0.7, 1.05);
  const poster3Mat = new THREE.MeshBasicMaterial({ map: poster3Tex });
  const poster3 = new THREE.Mesh(poster3Geo, poster3Mat);
  poster3.position.set(4.9, 1.8, storeDepth / 2 + 0.06);
  storeGroup.add(poster3);

  // 8. Mount Detailed Store Interior
  const interior = createStoreInterior(materials);
  storeGroup.add(interior);

  // Position entire convenience store towards back-right of diorama base
  storeGroup.position.set(0.5, 0, -2.8);

  // 9. Door Animation Controller
  let doorTimer = 0;
  let doorOpenProgress = 0; // 0: closed, 1: fully open
  let doorState = 'closed'; // 'closed' -> 'opening' -> 'open' -> 'closing'
  let stateTime = 0;

  function updateDoors(delta) {
    stateTime += delta;

    if (doorState === 'closed') {
      if (stateTime > 12.0) { // Every 12s, door opens
        doorState = 'opening';
        stateTime = 0;
      }
    } else if (doorState === 'opening') {
      doorOpenProgress += delta * 1.5;
      if (doorOpenProgress >= 1.0) {
        doorOpenProgress = 1.0;
        doorState = 'open';
        stateTime = 0;
      }
    } else if (doorState === 'open') {
      if (stateTime > 3.5) { // Stays open for 3.5s
        doorState = 'closing';
        stateTime = 0;
      }
    } else if (doorState === 'closing') {
      doorOpenProgress -= delta * 1.2;
      if (doorOpenProgress <= 0.0) {
        doorOpenProgress = 0.0;
        doorState = 'closed';
        stateTime = 0;
      }
    }

    // Slide doors sideways
    const maxSlide = 0.85;
    leaf1Group.position.x = doorClosedLeftX - doorOpenProgress * maxSlide;
    leaf2Group.position.x = doorClosedRightX + doorOpenProgress * maxSlide;
  }

  // Neon sign subtle breathing & micro-flicker
  let signFlickerTimer = 0;
  function updateSign(time) {
    // Subtle sine wave breathing
    const breath = 0.96 + 0.04 * Math.sin(time * 2.5);
    // Rare realistic micro-flicker
    const microFlicker = Math.random() > 0.994 ? 0.82 : 1.0;
    const finalIntensity = breath * microFlicker;
    signFaceMat.color.setRGB(finalIntensity, finalIntensity, finalIntensity);
    sideSignMat.color.setRGB(finalIntensity, finalIntensity, finalIntensity);
  }

  return {
    group: storeGroup,
    canopyEavesZ: storeGroup.position.z + storeDepth / 2 + canopyDepth - 0.1,
    canopyMinX: storeGroup.position.x - canopyWidth / 2,
    canopyMaxX: storeGroup.position.x + canopyWidth / 2,
    update: (delta, time) => {
      updateDoors(delta);
      updateSign(time);
    }
  };
}
