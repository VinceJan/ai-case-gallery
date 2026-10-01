import * as THREE from 'three';
import {
  createToonMaterial,
  addAnimeOutline
} from '../materials/celShader.js';
import {
  createVendingMachineTextures,
  createBulletinPosterTexture,
  createRoadSignsTexture,
  createGarbageLabelsTexture
} from '../textures/canvasTextures.js';

export function createStreetFurniture() {
  const furnitureGroup = new THREE.Group();
  furnitureGroup.name = 'StreetFurniture';

  const floorY = 0.12; // Sidewalk height

  // ----------------------------------------------------
  // 1. JAPANESE VENDING MACHINES (自动贩卖机)
  // ----------------------------------------------------
  const { drinksTex, coffeeTex } = createVendingMachineTextures();
  const vendingMatA = new THREE.MeshBasicMaterial({ map: drinksTex, toneMapped: false });
  const vendingMatB = new THREE.MeshBasicMaterial({ map: coffeeTex, toneMapped: false });
  const vendingSideMat = createToonMaterial(0x1e293b);

  const vmW = 0.95;
  const vmH = 1.95;
  const vmD = 0.75;

  const vmGroup = new THREE.Group();
  vmGroup.position.set(1.4, floorY, -3.2);

  // Vending Machine 1 (Blue Cold/Hot Drinks)
  const vm1 = new THREE.Group();
  const vm1Box = new THREE.Mesh(new THREE.BoxGeometry(vmW, vmH, vmD), vendingSideMat);
  vm1Box.position.y = vmH / 2;
  vm1.add(vm1Box);
  addAnimeOutline(vm1Box, 0.015, 0x090d16);

  const vm1Front = new THREE.Mesh(new THREE.PlaneGeometry(vmW, vmH), vendingMatA);
  vm1Front.position.set(0, vmH / 2, vmD / 2 + 0.01);
  vm1.add(vm1Front);
  vmGroup.add(vm1);

  // Vending Machine 2 (Red Boss Coffee)
  const vm2 = new THREE.Group();
  vm2.position.set(0, 0, 1.15);
  const vm2Box = new THREE.Mesh(new THREE.BoxGeometry(vmW, vmH, vmD), vendingSideMat);
  vm2Box.position.y = vmH / 2;
  vm2.add(vm2Box);
  addAnimeOutline(vm2Box, 0.015, 0x090d16);

  const vm2Front = new THREE.Mesh(new THREE.PlaneGeometry(vmW, vmH), vendingMatB);
  vm2Front.position.set(0, vmH / 2, vmD / 2 + 0.01);
  vm2.add(vm2Front);
  vmGroup.add(vm2);

  // Soft glow emitted by vending machines
  const vmGlow = new THREE.PointLight(0x38bdf8, 1.2, 3.5, 2.0);
  vmGlow.position.set(0.6, 1.2, 0.5);
  vmGroup.add(vmGlow);

  // Twin bottle & can recycling bin beside vending machines
  const vmBinGeo = new THREE.BoxGeometry(0.55, 0.95, 0.5);
  const vmBinMat = createToonMaterial(0x0284c7);
  const vmBin = new THREE.Mesh(vmBinGeo, vmBinMat);
  vmBin.position.set(0, 0.95 / 2, 2.0);
  vmGroup.add(vmBin);
  addAnimeOutline(vmBin, 0.015, 0x0369a1);

  // Twin round drop holes on top
  const holeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16);
  const holeMat = createToonMaterial(0x0f172a);
  const hole1 = new THREE.Mesh(holeGeo, holeMat);
  hole1.position.set(-0.12, 0.96, 2.0);
  vmGroup.add(hole1);
  const hole2 = new THREE.Mesh(holeGeo, holeMat);
  hole2.position.set(0.12, 0.96, 2.0);
  vmGroup.add(hole2);

  furnitureGroup.add(vmGroup);

  // ----------------------------------------------------
  // 2. JAPANESE STREET GARBAGE SORTING BINS (垃圾桶)
  // ----------------------------------------------------
  const garbageGroup = new THREE.Group();
  garbageGroup.position.set(-0.4, floorY, 1.5);

  const binColors = [0x16a34a, 0x0284c7, 0xf59e0b]; // Green, Blue, Yellow lids
  const binLabels = createGarbageLabelsTexture();
  const binLabelMat = new THREE.MeshBasicMaterial({ map: binLabels });

  const binBodyGeo = new THREE.BoxGeometry(0.42, 0.82, 0.42);
  const binBodyMat = createToonMaterial(0x475569);
  const lidGeo = new THREE.BoxGeometry(0.44, 0.1, 0.44);

  for (let i = 0; i < 3; i++) {
    const bGroup = new THREE.Group();
    bGroup.position.set(i * 0.52, 0, 0);

    const body = new THREE.Mesh(binBodyGeo, binBodyMat);
    body.position.y = 0.82 / 2;
    bGroup.add(body);
    addAnimeOutline(body, 0.012, 0x1e293b);

    const lid = new THREE.Mesh(lidGeo, createToonMaterial(binColors[i]));
    lid.position.y = 0.82 + 0.05;
    bGroup.add(lid);
    addAnimeOutline(lid, 0.01, 0x0f172a);

    // Front label slot
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15), binLabelMat);
    labelMesh.position.set(0, 0.55, 0.22);
    bGroup.add(labelMesh);

    garbageGroup.add(bGroup);
  }
  furnitureGroup.add(garbageGroup);

  // ----------------------------------------------------
  // 3. JAPANESE MAMACHARI BICYCLE (自行车)
  // ----------------------------------------------------
  const bicycle = new THREE.Group();
  bicycle.name = 'MamachariBicycle';
  bicycle.position.set(-4.2, floorY, 0.85);
  bicycle.rotation.y = -0.35; // Parked diagonally on kickstand

  const bikeMetalMat = createToonMaterial(0x94a3b8);
  const bikeFrameMat = createToonMaterial(0x0284c7); // Sky blue frame
  const bikeTireMat = createToonMaterial(0x18181b);

  // Wheels (Front & Rear)
  const wheelRadius = 0.32;
  const wheelThickness = 0.05;
  const wheelGeo = new THREE.TorusGeometry(wheelRadius, wheelThickness / 2, 8, 24);

  const rearWheel = new THREE.Mesh(wheelGeo, bikeTireMat);
  rearWheel.position.set(-0.55, wheelRadius + 0.02, 0);
  bicycle.add(rearWheel);

  const frontWheel = new THREE.Mesh(wheelGeo, bikeTireMat);
  frontWheel.position.set(0.55, wheelRadius + 0.02, 0);
  bicycle.add(frontWheel);

  // Wheel Hubs & Spokes cross
  for (const wx of [-0.55, 0.55]) {
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8), bikeMetalMat);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(wx, wheelRadius + 0.02, 0);
    bicycle.add(hub);
  }

  // Curved Low-Step Frame (Mamachari style)
  const frameCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.55, wheelRadius + 0.02, 0), // Rear axle
    new THREE.Vector3(-0.1, 0.28, 0),               // Bottom bracket / pedal
    new THREE.Vector3(0.15, 0.45, 0),               // Downtube curve
    new THREE.Vector3(0.45, 0.72, 0)                // Head tube
  ]);
  const frameGeo = new THREE.TubeGeometry(frameCurve, 16, 0.025, 8, false);
  const frameMesh = new THREE.Mesh(frameGeo, bikeFrameMat);
  bicycle.add(frameMesh);
  addAnimeOutline(frameMesh, 0.008, 0x0f172a);

  // Seat tube & Saddle
  const seatTube = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35), bikeMetalMat);
  seatTube.position.set(-0.15, 0.5, 0);
  seatTube.rotation.z = -0.2;
  bicycle.add(seatTube);

  const saddleMat = createToonMaterial(0x451a03); // Brown leather saddle
  const saddleGeo = new THREE.BoxGeometry(0.22, 0.06, 0.14);
  const saddle = new THREE.Mesh(saddleGeo, saddleMat);
  saddle.position.set(-0.18, 0.7, 0);
  bicycle.add(saddle);

  // Handlebars & Stem
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.25), bikeMetalMat);
  stem.position.set(0.42, 0.8, 0);
  bicycle.add(stem);

  const handleBarGeo = new THREE.BoxGeometry(0.04, 0.03, 0.52);
  const handleBar = new THREE.Mesh(handleBarGeo, bikeMetalMat);
  handleBar.position.set(0.38, 0.9, 0);
  bicycle.add(handleBar);

  // Front Wire Basket (前车筐)
  const basketGeo = new THREE.BoxGeometry(0.24, 0.18, 0.32);
  const basketMat = createToonMaterial(0x64748b, { wireframe: false });
  const basket = new THREE.Mesh(basketGeo, basketMat);
  basket.position.set(0.55, 0.78, 0);
  bicycle.add(basket);
  addAnimeOutline(basket, 0.01, 0x1e293b);

  // Front Headlight (前车灯)
  const headlight = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 8), createToonMaterial(0xfef08a));
  headlight.rotation.z = Math.PI / 2;
  headlight.position.set(0.68, 0.65, 0);
  bicycle.add(headlight);

  // Rear Luggage Rack (后衣架)
  const rackGeo = new THREE.BoxGeometry(0.35, 0.03, 0.16);
  const rack = new THREE.Mesh(rackGeo, bikeMetalMat);
  rack.position.set(-0.45, 0.65, 0);
  bicycle.add(rack);

  // Kickstand leaning against ground
  const kickstand = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.35), bikeMetalMat);
  kickstand.position.set(-0.15, 0.15, -0.12);
  kickstand.rotation.x = -0.4;
  bicycle.add(kickstand);

  furnitureGroup.add(bicycle);

  // ----------------------------------------------------
  // 4. CLEAR VINYL UMBRELLA STAND (雨伞架)
  // ----------------------------------------------------
  const umbrellaStand = new THREE.Group();
  umbrellaStand.position.set(-1.4, floorY, 0.15); // Outside door under canopy

  // Stainless steel wire grid rack
  const uRackGeo = new THREE.BoxGeometry(0.45, 0.55, 0.35);
  const uRackMat = createToonMaterial(0x94a3b8);
  const uRack = new THREE.Mesh(uRackGeo, uRackMat);
  uRack.position.y = 0.55 / 2;
  umbrellaStand.add(uRack);
  addAnimeOutline(uRack, 0.01, 0x1e293b);

  // Transparent Vinyl Anime Umbrellas (透明雨伞)
  const uShaftMat = createToonMaterial(0xe2e8f0);
  const uCanopyMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.55
  });

  const umbrellaAngles = [
    { x: -0.1, z: -0.05, rotX: 0.12, rotZ: -0.08 },
    { x: 0.08, z: 0.06, rotX: -0.1, rotZ: 0.14 },
    { x: -0.05, z: 0.08, rotX: 0.05, rotZ: 0.1 }
  ];

  umbrellaAngles.forEach((ua) => {
    const umb = new THREE.Group();
    umb.position.set(ua.x, 0.2, ua.z);
    umb.rotation.set(ua.rotX, 0, ua.rotZ);

    // Umbrella folded canopy (cone)
    const coneGeo = new THREE.ConeGeometry(0.09, 0.65, 8);
    const cone = new THREE.Mesh(coneGeo, uCanopyMat);
    cone.position.y = 0.45;
    cone.rotation.x = Math.PI;
    umb.add(cone);

    // Central shaft & tip
    const shaftGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.95);
    const shaft = new THREE.Mesh(shaftGeo, uShaftMat);
    shaft.position.y = 0.48;
    umb.add(shaft);

    // Curved white plastic handle
    const handleTorus = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 8, 16, Math.PI), uShaftMat);
    handleTorus.position.set(0.03, 0.95, 0);
    handleTorus.rotation.z = Math.PI / 2;
    umb.add(handleTorus);

    umbrellaStand.add(umb);
  });

  furnitureGroup.add(umbrellaStand);

  // ----------------------------------------------------
  // 5. JAPANESE UTILITY POLE & POWER CABLES (电线杆与电线)
  // ----------------------------------------------------
  const poleGroup = new THREE.Group();
  poleGroup.name = 'UtilityPole';
  // Positioned beside the vending machines along the side street
  poleGroup.position.set(2.05, floorY, -1.6);

  const poleHeight = 8.5;
  const poleMat = createToonMaterial(0x64748b, { roughness: 0.9 });
  // Concrete cylindrical pole tapering slightly
  const poleGeo = new THREE.CylinderGeometry(0.18, 0.24, poleHeight, 16);
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.y = poleHeight / 2;
  pole.castShadow = true;
  poleGroup.add(pole);
  addAnimeOutline(pole, 0.02, 0x1e293b);

  // Metal climbing rungs (foot pegs) up the pole
  const rungMat = createToonMaterial(0x94a3b8);
  const rungGeo = new THREE.BoxGeometry(0.24, 0.02, 0.02);
  for (let r = 0; r < 14; r++) {
    const rung = new THREE.Mesh(rungGeo, rungMat);
    const side = (r % 2 === 0) ? 0.18 : -0.18;
    rung.position.set(side, 1.8 + r * 0.45, 0);
    poleGroup.add(rung);
  }

  // Cylindrical Step-Down Transformer (变压器 drum)
  const transMat = createToonMaterial(0x475569);
  const transGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.95, 16);
  const transformer = new THREE.Mesh(transGeo, transMat);
  transformer.position.set(-0.35, 5.8, 0.2);
  transformer.castShadow = true;
  poleGroup.add(transformer);
  addAnimeOutline(transformer, 0.015, 0x0f172a);

  // Transformer cooling fins / ceramic bushings on top
  const bushingGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.2, 8);
  const bushingMat = createToonMaterial(0xf1f5f9);
  for (let b = 0; b < 3; b++) {
    const bush = new THREE.Mesh(bushingGeo, bushingMat);
    bush.position.set(-0.48 + b * 0.13, 6.35, 0.2);
    poleGroup.add(bush);
  }

  // Horizontal Cross-arms (横担)
  const armMat = createToonMaterial(0x334155);
  const arm1Geo = new THREE.BoxGeometry(2.4, 0.08, 0.08);
  const arm1 = new THREE.Mesh(arm1Geo, armMat);
  arm1.position.set(0, 6.8, 0);
  poleGroup.add(arm1);
  addAnimeOutline(arm1, 0.015, 0x0f172a);

  const arm2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.08), armMat);
  arm2.position.set(0, 7.8, 0);
  poleGroup.add(arm2);

  // Ceramic white insulators on cross-arms
  const insGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.14, 8);
  const insMat = createToonMaterial(0xffffff);
  for (const ix of [-1.0, -0.5, 0.5, 1.0]) {
    const ins = new THREE.Mesh(insGeo, insMat);
    ins.position.set(ix, 6.9, 0);
    poleGroup.add(ins);
  }
  for (const ix of [-0.7, 0.7]) {
    const ins = new THREE.Mesh(insGeo, insMat);
    ins.position.set(ix, 7.9, 0);
    poleGroup.add(ins);
  }

  // Curved Convex Road Safety Mirror (道路反射镜) mounted on pole
  const mirrorGroup = new THREE.Group();
  mirrorGroup.position.set(0.3, 3.2, 0.25);
  mirrorGroup.rotation.y = -Math.PI / 4;

  // Yellow/Orange outer hood
  const hoodGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 24);
  const hoodMat = createToonMaterial(0xf97316);
  const hood = new THREE.Mesh(hoodGeo, hoodMat);
  hood.rotation.x = Math.PI / 2;
  mirrorGroup.add(hood);

  // Reflective convex mirror surface
  const mirrorGeo = new THREE.SphereGeometry(0.38, 24, 16, 0, Math.PI * 2, 0, Math.PI / 4);
  const mirrorMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd,
    metalness: 0.95,
    roughness: 0.1
  });
  const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
  mirror.position.z = 0.04;
  mirror.rotation.x = -Math.PI / 2;
  mirrorGroup.add(mirror);

  // Metal mounting arm
  const armMount = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), rungMat);
  armMount.rotation.z = Math.PI / 3;
  armMount.position.set(-0.15, -0.1, 0);
  mirrorGroup.add(armMount);

  poleGroup.add(mirrorGroup);

  // Address plate on pole ("桜町 2-14-6")
  const plateCanvas = document.createElement('canvas');
  plateCanvas.width = 128;
  plateCanvas.height = 384;
  const pctx = plateCanvas.getContext('2d');
  pctx.fillStyle = '#0284c7';
  pctx.fillRect(0, 0, 128, 384);
  pctx.strokeStyle = '#ffffff';
  pctx.lineWidth = 4;
  pctx.strokeRect(4, 4, 120, 376);
  pctx.fillStyle = '#ffffff';
  pctx.font = 'bold 36px sans-serif';
  pctx.textAlign = 'center';
  pctx.fillText('桜', 64, 60);
  pctx.fillText('町', 64, 110);
  pctx.fillText('２', 64, 160);
  pctx.fillText('丁', 64, 210);
  pctx.fillText('目', 64, 260);
  pctx.fillText('14', 64, 320);

  const addressPlate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.55),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(plateCanvas) })
  );
  addressPlate.position.set(0, 2.2, 0.23);
  poleGroup.add(addressPlate);

  furnitureGroup.add(poleGroup);

  // Sagging Overhead Power Cables / Telephone Wires (Catenary curves)
  const cableMat = new THREE.LineBasicMaterial({ color: 0x090d16, linewidth: 2 });
  const cableEndpoints = [
    // Wire 1: From pole arm to store roof conduit
    [new THREE.Vector3(2.05 - 1.0, floorY + 6.9, -1.6), new THREE.Vector3(-3.0, floorY + 4.2, -6.5)],
    // Wire 2: From pole arm to edge of diorama
    [new THREE.Vector3(2.05 + 1.0, floorY + 6.9, -1.6), new THREE.Vector3(7.5, floorY + 6.2, 7.5)],
    // Wire 3: From pole upper arm across street
    [new THREE.Vector3(2.05 - 0.7, floorY + 7.8, -1.6), new THREE.Vector3(-7.5, floorY + 7.0, 4.0)],
    // Wire 4: Crossing diorama corner
    [new THREE.Vector3(2.05 + 0.7, floorY + 7.8, -1.6), new THREE.Vector3(7.5, floorY + 7.2, -5.0)]
  ];

  cableEndpoints.forEach(([start, end]) => {
    const segments = 24;
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const sag = 0.55;
    mid.y -= sag;

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const curvePoints = curve.getPoints(segments);
    const wireGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const wireMesh = new THREE.Line(wireGeo, cableMat);
    furnitureGroup.add(wireMesh);
  });

  // ----------------------------------------------------
  // 6. JAPANESE STREET LAMP (路灯)
  // ----------------------------------------------------
  const lampGroup = new THREE.Group();
  lampGroup.name = 'StreetLamp';
  // Positioned at the outer corner of the sidewalk overlooking zebra crossing
  lampGroup.position.set(2.05, floorY, 2.05);

  const lampPoleH = 5.2;
  const lampMat = createToonMaterial(0x334155);

  // Curved vertical pole
  const lampPoleGeo = new THREE.CylinderGeometry(0.08, 0.1, lampPoleH, 12);
  const lampPole = new THREE.Mesh(lampPoleGeo, lampMat);
  lampPole.position.y = lampPoleH / 2;
  lampGroup.add(lampPole);
  addAnimeOutline(lampPole, 0.015, 0x0f172a);

  // Gooseneck curvature arm pointing down towards street intersection
  const armCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, lampPoleH - 0.2, 0),
    new THREE.Vector3(0.2, lampPoleH + 0.3, 0.2),
    new THREE.Vector3(0.6, lampPoleH + 0.1, 0.6),
    new THREE.Vector3(0.8, lampPoleH - 0.1, 0.8)
  ]);
  const armTube = new THREE.Mesh(new THREE.TubeGeometry(armCurve, 16, 0.04, 8, false), lampMat);
  lampGroup.add(armTube);

  // Downward Hooded Luminaire Head
  const headGeo = new THREE.ConeGeometry(0.3, 0.2, 16);
  const head = new THREE.Mesh(headGeo, lampMat);
  head.position.set(0.8, lampPoleH - 0.1, 0.8);
  head.rotation.x = Math.PI;
  lampGroup.add(head);

  // Glowing bulb
  const bulbGeo = new THREE.SphereGeometry(0.12, 12, 12);
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, toneMapped: false });
  const bulb = new THREE.Mesh(bulbGeo, bulbMat);
  bulb.position.set(0.8, lampPoleH - 0.18, 0.8);
  lampGroup.add(bulb);

  // Cool Cyan Street Light Spot / Point
  const streetLight = new THREE.PointLight(0x7dd3fc, 2.8, 12.0, 1.5);
  streetLight.position.set(0.8, lampPoleH - 0.25, 0.8);
  lampGroup.add(streetLight);

  furnitureGroup.add(lampGroup);


  // ----------------------------------------------------
  // 7. JAPANESE ROAD TRAFFIC SIGNS (路牌)
  // ----------------------------------------------------
  const { stopSignTex, speedSignTex, streetPlateTex } = createRoadSignsTexture();
  const signPoleMat = createToonMaterial(0x94a3b8);

  // (A) Stop Sign (止まれ) Pole
  const stopGroup = new THREE.Group();
  stopGroup.position.set(2.0, floorY, 2.5);

  const spPole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8, 8), signPoleMat);
  spPole1.position.y = 1.4;
  stopGroup.add(spPole1);
  addAnimeOutline(spPole1, 0.01, 0x1e293b);

  const stopSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.7),
    new THREE.MeshBasicMaterial({ map: stopSignTex, transparent: true })
  );
  stopSignMesh.position.set(0, 2.45, 0.05);
  stopGroup.add(stopSignMesh);

  furnitureGroup.add(stopGroup);

  // (B) Speed Limit 30 Sign & Street Name Sign Pole
  const signGroup2 = new THREE.Group();
  signGroup2.position.set(6.8, 0, -2.5);

  const spPole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), signPoleMat);
  spPole2.position.y = 1.6;
  signGroup2.add(spPole2);

  const speedMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.65, 0.65),
    new THREE.MeshBasicMaterial({ map: speedSignTex, transparent: true })
  );
  speedMesh.position.set(0, 2.8, 0.05);
  signGroup2.add(speedMesh);

  const streetNameMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.3),
    new THREE.MeshBasicMaterial({ map: streetPlateTex })
  );
  streetNameMesh.position.set(0, 2.2, 0.05);
  signGroup2.add(streetNameMesh);

  furnitureGroup.add(signGroup2);

  // ----------------------------------------------------
  // 8. CORNER PEDESTRIAN GUARDRAILS (街角护栏)
  // ----------------------------------------------------
  const railGroup = new THREE.Group();
  railGroup.name = 'Guardrails';

  const railMat = createToonMaterial(0xffffff); // Japanese white pipe fence
  const reflectorMat = createToonMaterial(0xf59e0b); // Amber reflector

  function createGuardrailSection(length) {
    const section = new THREE.Group();
    const postGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8);
    const pipeGeo = new THREE.BoxGeometry(length, 0.05, 0.05);

    // Left and right posts
    const postL = new THREE.Mesh(postGeo, railMat);
    postL.position.set(-length / 2, 0.95 / 2, 0);
    section.add(postL);
    addAnimeOutline(postL, 0.01, 0x1e293b);

    const postR = new THREE.Mesh(postGeo, railMat);
    postR.position.set(length / 2, 0.95 / 2, 0);
    section.add(postR);
    addAnimeOutline(postR, 0.01, 0x1e293b);

    // Upper and lower horizontal rails
    const topRail = new THREE.Mesh(pipeGeo, railMat);
    topRail.position.set(0, 0.85, 0);
    section.add(topRail);

    const midRail = new THREE.Mesh(pipeGeo, railMat);
    midRail.position.set(0, 0.48, 0);
    section.add(midRail);

    // Reflectors on post caps
    const refGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12);
    const refL = new THREE.Mesh(refGeo, reflectorMat);
    refL.position.set(-length / 2, 0.96, 0);
    section.add(refL);

    const refR = new THREE.Mesh(refGeo, reflectorMat);
    refR.position.set(length / 2, 0.96, 0);
    section.add(refR);

    return section;
  }

  // Guardrails along corner sidewalk
  const g1 = createGuardrailSection(2.2);
  g1.position.set(-1.0, floorY, 2.1);
  railGroup.add(g1);

  const g2 = createGuardrailSection(2.2);
  g2.position.set(2.1, floorY, -1.0);
  g2.rotation.y = Math.PI / 2;
  railGroup.add(g2);

  furnitureGroup.add(railGroup);

  // ----------------------------------------------------
  // 9. AIR CONDITIONER OUTDOOR UNITS (空调外机)
  // ----------------------------------------------------
  const acGroup = new THREE.Group();
  acGroup.name = 'ACOutdoorUnits';
  // Mounted on the store's side alley wall
  acGroup.position.set(-7.15, floorY + 0.8, -4.5);

  const acBodyGeo = new THREE.BoxGeometry(0.35, 0.75, 0.95);
  const acBodyMat = createToonMaterial(0x94a3b8);
  const acBody = new THREE.Mesh(acBodyGeo, acBodyMat);
  acGroup.add(acBody);
  addAnimeOutline(acBody, 0.015, 0x1e293b);

  // Circular fan grille indentation
  const fanCavityGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.04, 16);
  const fanCavityMat = createToonMaterial(0x1e293b);
  const fanCavity = new THREE.Mesh(fanCavityGeo, fanCavityMat);
  fanCavity.rotation.z = Math.PI / 2;
  fanCavity.position.set(-0.16, 0, 0);
  acGroup.add(fanCavity);

  // AC Spinning Fan Blades (animated!)
  const fanBladeGroup = new THREE.Group();
  fanBladeGroup.position.set(-0.17, 0, 0);
  fanBladeGroup.rotation.z = Math.PI / 2;

  const bladeMat = createToonMaterial(0x64748b);
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.01), bladeMat);
    blade.position.y = 0.12;
    blade.rotation.z = (i * Math.PI) / 2;
    fanBladeGroup.add(blade);
  }
  acGroup.add(fanBladeGroup);
  acGroup.userData.fanBladeGroup = fanBladeGroup; // For rotation animation

  // Insulated copper refrigerant pipe connecting to store wall
  const pipeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.25, 0.4),
    new THREE.Vector3(0.08, 0.45, 0.4),
    new THREE.Vector3(0.08, 1.4, 0.4)
  ]);
  const pipeMesh = new THREE.Mesh(new THREE.TubeGeometry(pipeCurve, 12, 0.03, 8, false), createToonMaterial(0x475569));
  acGroup.add(pipeMesh);

  furnitureGroup.add(acGroup);

  // ----------------------------------------------------
  // 10. COMMUNITY BULLETIN BOARD & POSTERS (小型公告栏)
  // ----------------------------------------------------
  const bulletinTex = createBulletinPosterTexture();
  const bulletinMat = new THREE.MeshBasicMaterial({ map: bulletinTex });

  const bulletinGroup = new THREE.Group();
  bulletinGroup.position.set(-7.15, floorY + 1.8, -1.8);
  bulletinGroup.rotation.y = Math.PI / 2;

  // Wood / Aluminum Frame
  const bFrameGeo = new THREE.BoxGeometry(1.6, 1.2, 0.08);
  const bFrameMat = createToonMaterial(0x78350f);
  const bFrame = new THREE.Mesh(bFrameGeo, bFrameMat);
  bulletinGroup.add(bFrame);
  addAnimeOutline(bFrame, 0.015, 0x451a03);

  // Poster surface
  const bFace = new THREE.Mesh(new THREE.PlaneGeometry(1.48, 1.08), bulletinMat);
  bFace.position.z = 0.045;
  bulletinGroup.add(bFace);

  furnitureGroup.add(bulletinGroup);

  // ----------------------------------------------------
  // 11. SIDE ALLEY ENTRANCE PROPS (小巷入口氛围)
  // ----------------------------------------------------
  const alleyGroup = new THREE.Group();
  alleyGroup.position.set(-6.8, floorY, -6.0);

  // Stack of plastic beverage crates (Yellow & Red)
  const crateMatY = createToonMaterial(0xf59e0b);
  const crateMatR = createToonMaterial(0xdc2626);
  const crateGeo = new THREE.BoxGeometry(0.48, 0.32, 0.38);

  for (let c = 0; c < 4; c++) {
    const crate = new THREE.Mesh(crateGeo, (c % 2 === 0) ? crateMatY : crateMatR);
    crate.position.set(0, 0.32 / 2 + c * 0.32, (c % 2) * 0.05);
    alleyGroup.add(crate);
    addAnimeOutline(crate, 0.01, 0x0f172a);
  }

  // Metal emergency ladder on alley wall
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(-0.35, 1.2, 1.8);
  const ladderMat = createToonMaterial(0x64748b);
  // Vertical side rails
  for (const lx of [-0.2, 0.2]) {
    const sideRail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3.2), ladderMat);
    sideRail.position.set(lx, 1.6, 0);
    ladderGroup.add(sideRail);
  }
  // Rungs
  for (let r = 0; r < 8; r++) {
    const lrung = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4), ladderMat);
    lrung.rotation.z = Math.PI / 2;
    lrung.position.set(0, 0.4 + r * 0.4, 0);
    ladderGroup.add(lrung);
  }
  alleyGroup.add(ladderGroup);

  // Alley overhead industrial lantern
  const alleyLamp = new THREE.PointLight(0xfef08a, 0.9, 4.0, 2.0);
  alleyLamp.position.set(0, 2.6, 1.0);
  alleyGroup.add(alleyLamp);

  furnitureGroup.add(alleyGroup);

  // ----------------------------------------------------
  // 12. PEDESTRIAN TRAFFIC SIGNAL LIGHT (交通信号灯)
  // ----------------------------------------------------
  const signalGroup = new THREE.Group();
  signalGroup.name = 'TrafficSignal';
  signalGroup.position.set(6.8, 0, 6.8); // Corner of the diorama

  // Pole
  const sPoleGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.8, 8);
  const sPole = new THREE.Mesh(sPoleGeo, createToonMaterial(0x475569));
  sPole.position.y = 1.9;
  signalGroup.add(sPole);

  // Signal box
  const sBoxGeo = new THREE.BoxGeometry(0.35, 0.7, 0.25);
  const sBoxMat = createToonMaterial(0x18181b);
  const sBox = new THREE.Mesh(sBoxGeo, sBoxMat);
  sBox.position.set(0, 3.0, 0);
  signalGroup.add(sBox);
  addAnimeOutline(sBox, 0.015, 0x090d16);

  // Walk (Cyan/Green) & Don't Walk (Red) lights
  const redLensMat = new THREE.MeshBasicMaterial({ color: 0xef4444, toneMapped: false });
  const greenLensMat = new THREE.MeshBasicMaterial({ color: 0x10b981, toneMapped: false });

  const redLens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), redLensMat);
  redLens.rotation.x = Math.PI / 2;
  redLens.position.set(0, 3.18, 0.13);
  signalGroup.add(redLens);

  const greenLens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), greenLensMat);
  greenLens.rotation.x = Math.PI / 2;
  greenLens.position.set(0, 2.82, 0.13);
  signalGroup.add(greenLens);

  signalGroup.userData.redLensMat = redLensMat;
  signalGroup.userData.greenLensMat = greenLensMat;

  furnitureGroup.add(signalGroup);

  return furnitureGroup;
}
