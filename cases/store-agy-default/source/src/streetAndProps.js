import * as THREE from 'three';
import {
  createVendingMachineTexture,
  createTactilePaverTexture,
  createRoadZebraTexture,
  createStreetSignTexture,
  createBulletinBoardTexture,
  createACUnitTexture
} from './textures.js';
import { addAnimeOutline } from './materials.js';

export function createStreetAndProps(materials) {
  const streetGroup = new THREE.Group();
  streetGroup.name = 'street_and_props';

  // Diorama base size: 24 x 24 square
  const baseSize = 24.0;
  const baseHeight = 1.2;

  // 1. Square Diorama Pedestal Base Block
  const baseGeo = new THREE.BoxGeometry(baseSize, baseHeight, baseSize);
  const baseMesh = new THREE.Mesh(baseGeo, materials.pedestalBase);
  baseMesh.position.set(0, -baseHeight / 2, 0);
  baseMesh.receiveShadow = true;
  streetGroup.add(baseMesh);

  // Beveled top rim for collectible model aesthetic
  const rimGeo = new THREE.BoxGeometry(baseSize + 0.15, 0.08, baseSize + 0.15);
  const rimMesh = new THREE.Mesh(rimGeo, materials.pedestalChamfer);
  rimMesh.position.set(0, -0.04, 0);
  streetGroup.add(rimMesh);

  // 2. Asphalt Roadway (L-shaped intersection)
  // Main wet asphalt road surface
  const roadGeo = new THREE.PlaneGeometry(baseSize, baseSize);
  const roadMesh = new THREE.Mesh(roadGeo, materials.wetAsphalt);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.set(0, 0.01, 0);
  roadMesh.receiveShadow = true;
  streetGroup.add(roadMesh);

  // Pedestrian Zebra Crossing (Crosswalk)
  const zebraTex = createRoadZebraTexture();
  const zebraGeo = new THREE.PlaneGeometry(3.6, 5.2);
  const zebraMat = new THREE.MeshBasicMaterial({
    map: zebraTex,
    transparent: true,
    opacity: 0.88
  });
  const zebra = new THREE.Mesh(zebraGeo, zebraMat);
  zebra.rotation.x = -Math.PI / 2;
  zebra.rotation.z = Math.PI / 2;
  zebra.position.set(-6.2, 0.02, 6.4);
  streetGroup.add(zebra);

  // Road "止まれ" (STOP) Road Markings on asphalt
  const stopMarkCanvas = document.createElement('canvas');
  stopMarkCanvas.width = 256;
  stopMarkCanvas.height = 512;
  const smCtx = stopMarkCanvas.getContext('2d');
  smCtx.fillStyle = 'rgba(0,0,0,0)';
  smCtx.fillRect(0, 0, 256, 512);
  // Stretched white Japanese road letters for perspective view
  smCtx.fillStyle = '#f1f5f9';
  smCtx.font = '900 120px "Hiragino Kaku Gothic Pro", sans-serif';
  smCtx.textAlign = 'center';
  smCtx.fillText('止', 128, 140);
  smCtx.fillText('ま', 128, 290);
  smCtx.fillText('れ', 128, 440);

  const stopMarkTex = new THREE.CanvasTexture(stopMarkCanvas);
  const stopMarkGeo = new THREE.PlaneGeometry(1.6, 3.2);
  const stopMarkMat = new THREE.MeshBasicMaterial({
    map: stopMarkTex,
    transparent: true,
    opacity: 0.85
  });
  const stopMark = new THREE.Mesh(stopMarkGeo, stopMarkMat);
  stopMark.rotation.x = -Math.PI / 2;
  stopMark.rotation.z = Math.PI / 2;
  stopMark.position.set(-1.2, 0.02, 7.8);
  streetGroup.add(stopMark);

  // Wet Asphalt Puddles (Glossy anime night reflections of street lamps & neon lights)
  const puddleMat = new THREE.MeshStandardMaterial({
    color: 0x0a0e18,
    roughness: 0.04,
    metalness: 0.85,
    transparent: true,
    opacity: 0.8
  });

  const puddleConfigs = [
    { x: -5.2, z: 2.4, rx: 2.2, rz: 1.3, rot: 0.3 },
    { x: -0.8, z: 4.8, rx: 2.6, rz: 1.5, rot: -0.2 },
    { x: 3.5, z: 6.2, rx: 2.2, rz: 1.4, rot: 0.1 },
    { x: 7.2, z: 7.0, rx: 1.8, rz: 1.2, rot: -0.4 },
    { x: -7.5, z: 9.0, rx: 2.4, rz: 1.6, rot: 0.3 }
  ];

  puddleConfigs.forEach(p => {
    const pGeo = new THREE.CircleGeometry(1.0, 24);
    pGeo.scale(p.rx, p.rz, 1);
    const pMesh = new THREE.Mesh(pGeo, puddleMat);
    pMesh.rotation.x = -Math.PI / 2;
    pMesh.rotation.z = p.rot;
    pMesh.position.set(p.x, 0.022, p.z);
    streetGroup.add(pMesh);
  });

  // Stop line solid white bar
  const stopLineGeo = new THREE.PlaneGeometry(0.35, 4.2);
  const stopLineMat = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
  const stopLine = new THREE.Mesh(stopLineGeo, stopLineMat);
  stopLine.rotation.x = -Math.PI / 2;
  stopLine.position.set(-3.5, 0.02, 7.8);
  streetGroup.add(stopLine);

  // Store Front Parking Space (White line markings & car wheel stop blocks)
  const parkingLineGeo = new THREE.PlaneGeometry(0.12, 4.8);
  const parkingLine1 = new THREE.Mesh(parkingLineGeo, stopLineMat);
  parkingLine1.rotation.x = -Math.PI / 2;
  parkingLine1.position.set(7.5, 0.02, 5.2);
  const parkingLine2 = new THREE.Mesh(parkingLineGeo, stopLineMat);
  parkingLine2.rotation.x = -Math.PI / 2;
  parkingLine2.position.set(10.2, 0.02, 5.2);
  streetGroup.add(parkingLine1, parkingLine2);

  // Yellow concrete wheel stops (车轮阻挡块)
  const wheelStopGeo = new THREE.BoxGeometry(0.85, 0.12, 0.16);
  const wheelStopMat = new THREE.MeshToonMaterial({ color: 0xeab308 });
  const wheelStop1 = new THREE.Mesh(wheelStopGeo, wheelStopMat);
  wheelStop1.position.set(8.0, 0.08, 3.1);
  const wheelStop2 = new THREE.Mesh(wheelStopGeo, wheelStopMat);
  wheelStop2.position.set(9.7, 0.08, 3.1);
  streetGroup.add(wheelStop1, wheelStop2);

  // 3. Elevated Sidewalk Curb & Paving
  // Sidewalk concrete platform in front and side of convenience store
  const sidewalkW = 15.5;
  const sidewalkD = 9.8;
  const sidewalkH = 0.2;

  const sidewalkGeo = new THREE.BoxGeometry(sidewalkW, sidewalkH, sidewalkD);
  const sidewalk = new THREE.Mesh(sidewalkGeo, materials.sidewalk);
  sidewalk.position.set(4.2, sidewalkH / 2, -3.2);
  sidewalk.receiveShadow = true;
  streetGroup.add(sidewalk);

  // Sidewalk curb bevel stones (Grey granite curbs)
  const curbGeo = new THREE.BoxGeometry(sidewalkW + 0.1, sidewalkH + 0.02, 0.25);
  const curbFront = new THREE.Mesh(curbGeo, materials.curb);
  curbFront.position.set(4.2, sidewalkH / 2 + 0.01, 1.7);
  streetGroup.add(curbFront);

  const curbSideGeo = new THREE.BoxGeometry(0.25, sidewalkH + 0.02, sidewalkD);
  const curbSide = new THREE.Mesh(curbSideGeo, materials.curb);
  curbSide.position.set(-3.55, sidewalkH / 2 + 0.01, -3.2);
  streetGroup.add(curbSide);

  // Tactile Paving Strip (Tenji Blocks / 盲道点字ブロック)
  const tactileTex = createTactilePaverTexture();
  const tactileGeo = new THREE.PlaneGeometry(13.5, 0.5);
  const tactileMat = new THREE.MeshToonMaterial({ map: tactileTex });
  const tactileStrip = new THREE.Mesh(tactileGeo, tactileMat);
  tactileStrip.rotation.x = -Math.PI / 2;
  tactileStrip.position.set(4.4, sidewalkH + 0.01, 1.2);
  streetGroup.add(tactileStrip);

  // Drainage Gutter with Slotted Steel Grates along curb
  for (let g = 0; g < 4; g++) {
    const grateGeo = new THREE.BoxGeometry(1.2, 0.04, 0.35);
    const grateMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.3
    });
    const grate = new THREE.Mesh(grateGeo, grateMat);
    grate.position.set(-2.0 + g * 3.4, 0.02, 1.95);
    streetGroup.add(grate);
  }

  // 4. Utility Pole (電柱 Denchū) & Overhead Power Cables
  const poleGroup = new THREE.Group();
  poleGroup.name = 'utility_pole';

  const poleHeight = 11.5;
  const poleRadius = 0.26;

  // Concrete Pole Shaft
  const poleGeo = new THREE.CylinderGeometry(poleRadius * 0.75, poleRadius, poleHeight, 16);
  const pole = new THREE.Mesh(poleGeo, materials.utilityPoleConcrete);
  pole.position.y = poleHeight / 2;
  poleGroup.add(pole);

  // Yellow and black chevron warning wrap at base
  const warningWrapCanvas = document.createElement('canvas');
  warningWrapCanvas.width = 256;
  warningWrapCanvas.height = 128;
  const wwCtx = warningWrapCanvas.getContext('2d');
  wwCtx.fillStyle = '#eab308';
  wwCtx.fillRect(0, 0, 256, 128);
  wwCtx.fillStyle = '#0f172a';
  for (let w = -2; w < 6; w++) {
    wwCtx.beginPath();
    wwCtx.moveTo(w * 64, 0);
    wwCtx.lineTo(w * 64 + 40, 0);
    wwCtx.lineTo(w * 64 + 90, 128);
    wwCtx.lineTo(w * 64 + 50, 128);
    wwCtx.closePath();
    wwCtx.fill();
  }
  const warningWrapTex = new THREE.CanvasTexture(warningWrapCanvas);
  const warningWrapGeo = new THREE.CylinderGeometry(poleRadius + 0.01, poleRadius + 0.01, 1.6, 16);
  const warningWrapMat = new THREE.MeshBasicMaterial({ map: warningWrapTex });
  const warningWrap = new THREE.Mesh(warningWrapGeo, warningWrapMat);
  warningWrap.position.y = 1.0;
  poleGroup.add(warningWrap);

  // Climbing Metal Footpegs (Step rungs)
  for (let r = 0; r < 14; r++) {
    const rungGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35);
    const rung = new THREE.Mesh(rungGeo, materials.metalDark);
    rung.rotation.z = Math.PI / 2;
    const angle = (r % 2 === 0 ? 0 : Math.PI);
    rung.position.set(r % 2 === 0 ? 0.22 : -0.22, 2.2 + r * 0.55, 0);
    poleGroup.add(rung);
  }

  // Heavy Cylindrical Transformer (变压器)
  const transformerGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.3, 16);
  const transformerMat = new THREE.MeshToonMaterial({ color: 0x64748b });
  const transformer = new THREE.Mesh(transformerGeo, transformerMat);
  transformer.position.set(-0.55, 8.2, 0.15);
  poleGroup.add(transformer);

  // Transformer top insulators
  for (let ins = 0; ins < 3; ins++) {
    const insGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.22, 8);
    const insMat = new THREE.MeshToonMaterial({ color: 0xf1f5f9 }); // White ceramic insulator
    const insulator = new THREE.Mesh(insGeo, insMat);
    insulator.position.set(-0.75 + ins * 0.2, 8.95, 0.15);
    poleGroup.add(insulator);
  }

  // Crossarms (横担)
  const crossarm1Geo = new THREE.BoxGeometry(2.4, 0.12, 0.12);
  const crossarm1 = new THREE.Mesh(crossarm1Geo, materials.metalDark);
  crossarm1.position.set(0, 9.6, 0);
  poleGroup.add(crossarm1);

  const crossarm2Geo = new THREE.BoxGeometry(1.8, 0.12, 0.12);
  const crossarm2 = new THREE.Mesh(crossarm2Geo, materials.metalDark);
  crossarm2.position.set(0, 10.6, 0);
  poleGroup.add(crossarm2);

  // Insulators on crossarms
  [-1.0, -0.4, 0.4, 1.0].forEach((x) => {
    const insGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.2, 8);
    const insMat = new THREE.MeshToonMaterial({ color: 0xf1f5f9 });
    const ins = new THREE.Mesh(insGeo, insMat);
    ins.position.set(x, 9.75, 0);
    poleGroup.add(ins);
  });

  // Street Lamp arm & warm conical lampshade attached to utility pole
  const lampArmGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5);
  const lampArm = new THREE.Mesh(lampArmGeo, materials.metalDark);
  lampArm.rotation.z = Math.PI / 3;
  lampArm.position.set(0.65, 5.8, 0);
  poleGroup.add(lampArm);

  const lampShadeGeo = new THREE.ConeGeometry(0.35, 0.25, 16, 1, true);
  const lampShade = new THREE.Mesh(lampShadeGeo, materials.metalDark);
  lampShade.position.set(1.3, 5.3, 0);
  poleGroup.add(lampShade);

  // Glowing bulb inside street lamp
  const bulbGeo = new THREE.SphereGeometry(0.12, 12, 12);
  const bulb = new THREE.Mesh(bulbGeo, materials.streetLightGlow);
  bulb.position.set(1.3, 5.2, 0);
  poleGroup.add(bulb);

  // Street Lamp Spotlight casting puddle of warm light on street
  const streetLight = new THREE.SpotLight(0xffbe6b, 4.5, 14.0, Math.PI / 4, 0.4, 1.2);
  streetLight.position.set(1.3, 5.2, 0);
  streetLight.target.position.set(1.3, 0, 0);
  poleGroup.add(streetLight);
  poleGroup.add(streetLight.target);

  // Utility pole address plate: "緑町 3丁目"
  const addressTex = createStreetSignTexture('address');
  const addressGeo = new THREE.PlaneGeometry(0.32, 0.32);
  const addressMat = new THREE.MeshBasicMaterial({ map: addressTex });
  const addressPlate = new THREE.Mesh(addressGeo, addressMat);
  addressPlate.position.set(0, 2.6, poleRadius + 0.02);
  poleGroup.add(addressPlate);

  // Place Utility Pole near front-left corner
  poleGroup.position.set(-6.8, 0, 4.5);
  streetGroup.add(poleGroup);

  // 5. Overhead Drooping Catenary Electrical Cables (電線)
  // Curves connecting utility pole to store roof and diorama edges
  function createCatenaryWire(p1, p2, sag = 0.5) {
    const midX = (p1.x + p2.x) / 2;
    const midY = Math.min(p1.y, p2.y) - sag;
    const midZ = (p1.z + p2.z) / 2;

    const curve = new THREE.QuadraticBezierCurve3(
      p1,
      new THREE.Vector3(midX, midY, midZ),
      p2
    );

    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.02, 6, false);
    const wire = new THREE.Mesh(tubeGeo, materials.utilityCableBlack);
    return wire;
  }

  // Main wires stretching across the diorama
  const poleTop1 = new THREE.Vector3(-6.8 + 1.0, 9.8, 4.5);
  const poleTop2 = new THREE.Vector3(-6.8 - 1.0, 9.8, 4.5);
  const roofMast = new THREE.Vector3(2.5, 5.2, 0.2);
  const farEdge1 = new THREE.Vector3(-11.5, 9.2, -6.0);
  const farEdge2 = new THREE.Vector3(11.5, 8.5, 7.0);

  const wire1 = createCatenaryWire(poleTop1, roofMast, 0.7);
  const wire2 = createCatenaryWire(poleTop2, farEdge1, 0.9);
  const wire3 = createCatenaryWire(roofMast, farEdge2, 0.8);
  const wire4 = createCatenaryWire(new THREE.Vector3(-6.8, 10.6, 4.5), new THREE.Vector3(8.0, 7.5, -8.0), 1.1);

  streetGroup.add(wire1, wire2, wire3, wire4);

  // 6. Japanese Vending Machine (自動販売機) & Recycling Bin
  const jihankiGroup = new THREE.Group();
  jihankiGroup.name = 'vending_machine';

  const jWidth = 1.4;
  const jHeight = 2.45;
  const jDepth = 0.95;

  const jBodyGeo = new THREE.BoxGeometry(jWidth, jHeight, jDepth);
  const jBodyMat = new THREE.MeshToonMaterial({ color: 0x0284c7 });
  const jBody = new THREE.Mesh(jBodyGeo, jBodyMat);
  jBody.position.y = jHeight / 2;
  jihankiGroup.add(jBody);

  // Front backlit display panel texture
  const jihankiTex = createVendingMachineTexture();
  const jFrontGeo = new THREE.PlaneGeometry(jWidth - 0.05, jHeight - 0.08);
  const jFrontMat = new THREE.MeshBasicMaterial({ map: jihankiTex });
  const jFront = new THREE.Mesh(jFrontGeo, jFrontMat);
  jFront.position.set(0, jHeight / 2, jDepth / 2 + 0.01);
  jihankiGroup.add(jFront);

  // Soft cool blue glow from vending machine
  const jihankiLight = new THREE.PointLight(0x38bdf8, 2.2, 4.5);
  jihankiLight.position.set(0, jHeight / 2, jDepth / 2 + 0.6);
  jihankiGroup.add(jihankiLight);

  // Recycling Box with dual circular sorting holes
  const binGroup = new THREE.Group();
  const binGeo = new THREE.BoxGeometry(0.7, 1.1, 0.65);
  const binMat = new THREE.MeshToonMaterial({ color: 0x64748b });
  const bin = new THREE.Mesh(binGeo, binMat);
  bin.position.y = 1.1 / 2;
  binGroup.add(bin);

  // Top lid with colored holes (Blue for cans, Green for PET bottles)
  const hole1Geo = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16);
  const hole1Mat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
  const hole1 = new THREE.Mesh(hole1Geo, hole1Mat);
  hole1.rotation.x = Math.PI / 2;
  hole1.position.set(-0.16, 0.85, 0.33);
  binGroup.add(hole1);

  const hole2Mat = new THREE.MeshBasicMaterial({ color: 0x16a34a });
  const hole2 = new THREE.Mesh(hole1Geo, hole2Mat);
  hole2.rotation.x = Math.PI / 2;
  hole2.position.set(0.16, 0.85, 0.33);
  binGroup.add(hole2);

  binGroup.position.set(jWidth / 2 + 0.45, 0, 0.1);
  jihankiGroup.add(binGroup);

  // Place Vending machine on sidewalk next to convenience store
  jihankiGroup.position.set(8.5, sidewalkH, 0.3);
  streetGroup.add(jihankiGroup);

  // 7. Umbrella Stand & Transparent Vinyl Umbrellas (傘立て & ビニール傘)
  const umbrellaStandGroup = new THREE.Group();
  umbrellaStandGroup.name = 'umbrella_stand';

  const standBaseGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.65, 16, 1, true);
  const standMat = new THREE.MeshToonMaterial({ color: 0x475569 });
  const stand = new THREE.Mesh(standBaseGeo, standMat);
  stand.position.y = 0.65 / 2;
  umbrellaStandGroup.add(stand);

  // Transparent vinyl umbrellas standing inside
  for (let u = 0; u < 4; u++) {
    const umbGroup = new THREE.Group();

    // Central metal shaft
    const shaftGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.1);
    const shaft = new THREE.Mesh(shaftGeo, materials.metalSilver);
    shaft.position.y = 0.55;
    umbGroup.add(shaft);

    // Curved hook handle
    const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 8, 16, Math.PI);
    const handleMat = new THREE.MeshToonMaterial({ color: u % 2 === 0 ? 0xffffff : 0x0f172a });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.rotation.z = Math.PI;
    handle.position.set(0.06, 1.1, 0);
    umbGroup.add(handle);

    // Folded clear vinyl canopy
    const canopyGeo = new THREE.ConeGeometry(0.14, 0.75, 8, 1, true);
    const umbCanopy = new THREE.Mesh(canopyGeo, materials.umbrellaVinyl);
    umbCanopy.position.y = 0.55;
    umbGroup.add(umbCanopy);

    // Subtle random tilt inside stand
    umbGroup.rotation.z = (u - 1.5) * 0.12;
    umbGroup.rotation.x = ((u % 2) - 0.5) * 0.15;
    umbGroup.position.set(((u % 2) - 0.5) * 0.12, 0, (Math.floor(u / 2) - 0.5) * 0.12);
    umbrellaStandGroup.add(umbGroup);
  }

  // Placed right next to sliding door entrance
  umbrellaStandGroup.position.set(4.8, sidewalkH, 1.1);
  streetGroup.add(umbrellaStandGroup);

  // 8. Japanese Mama-chari Bicycle (ママチャリ)
  const bikeGroup = new THREE.Group();
  bikeGroup.name = 'japanese_bicycle';

  const bikeMat = new THREE.MeshToonMaterial({ color: 0x0284c7 }); // Anime cyan blue frame
  const wheelMat = materials.metalChrome;
  const rubberMat = new THREE.MeshToonMaterial({ color: 0x1e293b });

  function createBicycleWheel() {
    const wheel = new THREE.Group();
    // Tire rubber
    const tireGeo = new THREE.TorusGeometry(0.48, 0.04, 12, 24);
    const tire = new THREE.Mesh(tireGeo, rubberMat);
    wheel.add(tire);
    // Chrome rim
    const rimGeo = new THREE.TorusGeometry(0.46, 0.02, 8, 24);
    const rim = new THREE.Mesh(rimGeo, wheelMat);
    wheel.add(rim);
    // Center axle
    const axleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1);
    const axle = new THREE.Mesh(axleGeo, wheelMat);
    axle.rotation.x = Math.PI / 2;
    wheel.add(axle);
    return wheel;
  }

  const frontWheel = createBicycleWheel();
  frontWheel.position.set(0.9, 0.5, 0);
  const rearWheel = createBicycleWheel();
  rearWheel.position.set(-0.9, 0.5, 0);
  bikeGroup.add(frontWheel, rearWheel);

  // Curved low-step frame tubes
  const frameGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.35);
  const mainBar = new THREE.Mesh(frameGeo, bikeMat);
  mainBar.rotation.z = -0.55;
  mainBar.position.set(-0.1, 0.68, 0);
  bikeGroup.add(mainBar);

  const seatStayGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.95);
  const seatStay = new THREE.Mesh(seatStayGeo, bikeMat);
  seatStay.rotation.z = 0.55;
  seatStay.position.set(-0.45, 0.72, 0);
  bikeGroup.add(seatStay);

  // Saddle
  const saddleGeo = new THREE.BoxGeometry(0.32, 0.08, 0.2);
  const saddleMat = new THREE.MeshToonMaterial({ color: 0x3b1d11 }); // Brown vinyl anime seat
  const saddle = new THREE.Mesh(saddleGeo, saddleMat);
  saddle.position.set(-0.35, 1.15, 0);
  bikeGroup.add(saddle);

  // Curved Handlebars & Bell
  const handleBarGeo = new THREE.TorusGeometry(0.24, 0.025, 8, 16, Math.PI);
  const handleBar = new THREE.Mesh(handleBarGeo, wheelMat);
  handleBar.rotation.x = Math.PI / 2;
  handleBar.rotation.z = Math.PI / 2;
  handleBar.position.set(0.75, 1.3, 0);
  bikeGroup.add(handleBar);

  // Wire Front Basket
  const basketGeo = new THREE.BoxGeometry(0.42, 0.32, 0.45);
  const basketMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    wireframe: true
  });
  const basket = new THREE.Mesh(basketGeo, basketMat);
  basket.position.set(1.05, 1.1, 0);
  bikeGroup.add(basket);

  // Front wheel headlight
  const lightGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08);
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
  const frontLight = new THREE.Mesh(lightGeo, lightMat);
  frontLight.rotation.z = Math.PI / 2;
  frontLight.position.set(0.95, 0.85, 0);
  bikeGroup.add(frontLight);

  // Double kickstand holding bike upright
  const kickstandGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5);
  const kickstand = new THREE.Mesh(kickstandGeo, materials.metalDark);
  kickstand.rotation.z = -0.3;
  kickstand.position.set(-0.8, 0.25, 0.15);
  bikeGroup.add(kickstand);

  // Park bike neatly against convenience store side wall
  bikeGroup.rotation.y = Math.PI / 2 - 0.2;
  bikeGroup.position.set(10.8, sidewalkH, -2.8);
  streetGroup.add(bikeGroup);

  // 9. Side Alley & Service Area (AC Outdoor Units & Dumpsters)
  const acGroup = new THREE.Group();
  acGroup.name = 'ac_outdoor_units';

  const acTex = createACUnitTexture();
  const acGeo = new THREE.BoxGeometry(1.1, 0.75, 0.42);
  const acBodyMat = new THREE.MeshToonMaterial({ color: 0xf1f5f9 });

  // Stack of 2 AC compressor units
  for (let a = 0; a < 2; a++) {
    const acUnit = new THREE.Mesh(acGeo, acBodyMat);
    acUnit.position.y = 0.45 + a * 0.85;

    // Front fan grille
    const acFrontGeo = new THREE.PlaneGeometry(1.05, 0.7);
    const acFrontMat = new THREE.MeshBasicMaterial({ map: acTex });
    const acFront = new THREE.Mesh(acFrontGeo, acFrontMat);
    acFront.position.set(0, 0.45 + a * 0.85, 0.22);

    acGroup.add(acUnit, acFront);
  }

  // Refrigerant pipes leading up the wall
  const pipeGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.2);
  const pipeMat = new THREE.MeshToonMaterial({ color: 0xd1d5db });
  const pipe = new THREE.Mesh(pipeGeo, pipeMat);
  pipe.position.set(-0.65, 1.8, -0.05);
  acGroup.add(pipe);

  acGroup.rotation.y = Math.PI / 2;
  acGroup.position.set(-5.6, sidewalkH, -4.5);
  streetGroup.add(acGroup);

  // Stacked Japanese Drink Crates (Yellow & Blue plastic crates)
  const crateColors = [0xeab308, 0x0284c7, 0xeab308];
  crateColors.forEach((col, idx) => {
    const crateGeo = new THREE.BoxGeometry(0.65, 0.35, 0.48);
    const crateMat = new THREE.MeshToonMaterial({ color: col });
    const crate = new THREE.Mesh(crateGeo, crateMat);
    crate.position.set(-5.6, sidewalkH + 0.18 + idx * 0.36, -2.8);
    streetGroup.add(crate);
  });

  // 10. Street Corner Details: Japanese Guardrails, Signs & Pedestrian Signal
  // Classic Japanese White Tubular Pedestrian Guardrail (防護柵)
  const railGroup = new THREE.Group();
  railGroup.name = 'guardrail';

  function createGuardrailSection(length = 2.4) {
    const section = new THREE.Group();
    // Two vertical posts
    const postGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.95);
    const postMat = new THREE.MeshToonMaterial({ color: 0xf8fafc });
    const post1 = new THREE.Mesh(postGeo, postMat);
    post1.position.set(-length / 2, 0.95 / 2, 0);
    const post2 = new THREE.Mesh(postGeo, postMat);
    post2.position.set(length / 2, 0.95 / 2, 0);
    section.add(post1, post2);

    // Two horizontal curved pipes
    const barGeo = new THREE.CylinderGeometry(0.035, 0.035, length);
    const barTop = new THREE.Mesh(barGeo, postMat);
    barTop.rotation.z = Math.PI / 2;
    barTop.position.set(0, 0.82, 0);
    const barMid = new THREE.Mesh(barGeo, postMat);
    barMid.rotation.z = Math.PI / 2;
    barMid.position.set(0, 0.45, 0);
    section.add(barTop, barMid);

    // Yellow reflective tape bands
    const tapeGeo = new THREE.CylinderGeometry(0.046, 0.046, 0.12);
    const tapeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const tape1 = new THREE.Mesh(tapeGeo, tapeMat);
    tape1.position.set(-length / 2, 0.75, 0);
    const tape2 = new THREE.Mesh(tapeGeo, tapeMat);
    tape2.position.set(length / 2, 0.75, 0);
    section.add(tape1, tape2);

    return section;
  }

  const rail1 = createGuardrailSection(2.6);
  rail1.position.set(-3.2, sidewalkH, 1.4);
  const rail2 = createGuardrailSection(2.2);
  rail2.rotation.y = Math.PI / 2;
  rail2.position.set(-3.4, sidewalkH, -0.4);
  streetGroup.add(rail1, rail2);

  // Japanese Traffic Signs Pole (Stop Sign & One-Way Sign)
  const signPoleGroup = new THREE.Group();
  const spGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.6);
  const signPole = new THREE.Mesh(spGeo, materials.metalDark);
  signPole.position.y = 1.8;
  signPoleGroup.add(signPole);

  // Stop sign: Inverted red triangle
  const stopSignTex = createStreetSignTexture('stop');
  const stopSignGeo = new THREE.PlaneGeometry(0.75, 0.75);
  const stopSignMat = new THREE.MeshBasicMaterial({
    map: stopSignTex,
    side: THREE.DoubleSide
  });
  const stopSign = new THREE.Mesh(stopSignGeo, stopSignMat);
  stopSign.position.set(0, 3.1, 0.04);
  signPoleGroup.add(stopSign);

  // One-way blue circle sign
  const oneWayTex = createStreetSignTexture('oneway');
  const oneWayGeo = new THREE.CircleGeometry(0.3, 24);
  const oneWayMat = new THREE.MeshBasicMaterial({
    map: oneWayTex,
    side: THREE.DoubleSide
  });
  const oneWaySign = new THREE.Mesh(oneWayGeo, oneWayMat);
  oneWaySign.position.set(0, 2.3, 0.04);
  signPoleGroup.add(oneWaySign);

  signPoleGroup.position.set(-3.1, sidewalkH, 2.2);
  streetGroup.add(signPoleGroup);

  // Pedestrian Signal Light (Mini Japanese traffic light head)
  const pedSignalGroup = new THREE.Group();
  const pPostGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.4);
  const pPost = new THREE.Mesh(pPostGeo, materials.metalDark);
  pPost.position.y = 1.7;
  pedSignalGroup.add(pPost);

  // Signal housing box
  const sBoxGeo = new THREE.BoxGeometry(0.28, 0.65, 0.22);
  const sBoxMat = new THREE.MeshToonMaterial({ color: 0x334155 });
  const sBox = new THREE.Mesh(sBoxGeo, sBoxMat);
  sBox.position.set(0, 2.7, 0.12);
  pedSignalGroup.add(sBox);

  // Red standing figure & Green walking figure lenses
  const redLensGeo = new THREE.CircleGeometry(0.09, 16);
  const redLens = new THREE.Mesh(redLensGeo, materials.trafficLightRed);
  redLens.position.set(0, 2.85, 0.24);

  const greenLensGeo = new THREE.CircleGeometry(0.09, 16);
  const greenLens = new THREE.Mesh(greenLensGeo, materials.trafficLightGreen);
  greenLens.position.set(0, 2.55, 0.24);

  pedSignalGroup.add(redLens, greenLens);

  // Soft glow from pedestrian signal
  const pedLight = new THREE.PointLight(0x22c55e, 1.2, 3.5);
  pedLight.position.set(0, 2.55, 0.4);
  pedSignalGroup.add(pedLight);

  pedSignalGroup.position.set(-8.8, 0, 7.8);
  pedSignalGroup.rotation.y = -Math.PI / 4;
  streetGroup.add(pedSignalGroup);

  // 11. Neighborhood Notice Board (掲示板)
  const noticeBoardGroup = new THREE.Group();
  noticeBoardGroup.name = 'bulletin_board';

  // Two wooden posts
  const nbPostGeo = new THREE.BoxGeometry(0.08, 2.4, 0.08);
  const nbPostMat = new THREE.MeshToonMaterial({ color: 0x78350f });
  const nbPost1 = new THREE.Mesh(nbPostGeo, nbPostMat);
  nbPost1.position.set(-1.1, 1.2, 0);
  const nbPost2 = new THREE.Mesh(nbPostGeo, nbPostMat);
  nbPost2.position.set(1.1, 1.2, 0);
  noticeBoardGroup.add(nbPost1, nbPost2);

  // Notice board frame & corkboard with community notices
  const nbTex = createBulletinBoardTexture();
  const nbGeo = new THREE.PlaneGeometry(2.3, 1.15);
  const nbMat = new THREE.MeshBasicMaterial({ map: nbTex });
  const nbBoard = new THREE.Mesh(nbGeo, nbMat);
  nbBoard.position.set(0, 1.6, 0.05);
  noticeBoardGroup.add(nbBoard);

  // Rain protective overhang roof on bulletin board
  const nbRoofGeo = new THREE.BoxGeometry(2.5, 0.06, 0.35);
  const nbRoofMat = new THREE.MeshToonMaterial({ color: 0x1e293b });
  const nbRoof = new THREE.Mesh(nbRoofGeo, nbRoofMat);
  nbRoof.rotation.x = 0.2;
  nbRoof.position.set(0, 2.22, 0.1);
  noticeBoardGroup.add(nbRoof);

  noticeBoardGroup.rotation.y = Math.PI;
  noticeBoardGroup.position.set(1.5, sidewalkH, -7.2);
  streetGroup.add(noticeBoardGroup);

  // Signal blinking controller
  let pedBlinkTime = 0;
  function updatePedestrianSignal(delta) {
    pedBlinkTime += delta;
    // Walk green pulses slowly, switches to red occasionally
    const cycle = pedBlinkTime % 10.0;
    if (cycle < 7.0) {
      greenLens.visible = true;
      redLens.visible = false;
      pedLight.color.setHex(0x22c55e);
      // Blink green when close to changing
      if (cycle > 5.0 && Math.floor(cycle * 4) % 2 === 0) {
        greenLens.visible = false;
      }
    } else {
      greenLens.visible = false;
      redLens.visible = true;
      pedLight.color.setHex(0xef4444);
    }
  }

  return {
    group: streetGroup,
    update: (delta) => {
      updatePedestrianSignal(delta);
    }
  };
}
