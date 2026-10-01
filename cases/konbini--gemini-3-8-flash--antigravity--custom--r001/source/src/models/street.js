import * as THREE from 'three';
import {
  createWetRoadMaterial,
  createToonMaterial,
  addAnimeOutline
} from '../materials/celShader.js';
import {
  createRoadTomareTexture,
  createTactilePavingTexture,
  createDrainGrateTexture
} from '../textures/canvasTextures.js';

export function createStreet(size = 16) {
  const streetGroup = new THREE.Group();
  streetGroup.name = 'StreetLayout';

  // 1. Wet Asphalt Road Surface (Covers entire ground level Y = 0)
  const roadGeo = new THREE.PlaneGeometry(size, size, 64, 64);
  const roadMat = createWetRoadMaterial();
  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.rotation.x = -Math.PI / 2;
  roadMesh.position.y = 0.001;
  roadMesh.receiveShadow = true;
  streetGroup.add(roadMesh);

  // Store reference to wet road material for animation updates
  streetGroup.userData.wetRoadMaterial = roadMat;

  // 2. Elevated Sidewalk Platform (Y = 0 to 0.12)
  // Convenience store and corner pedestrian area sit on this elevated sidewalk
  // Shape: roughly in X: [-8, 2.2], Z: [-8, 2.2]
  const sidewalkW = 10.2;
  const sidewalkD = 10.2;
  const sidewalkH = 0.12;

  // Corner sidewalk block
  const sidewalkGeo = new THREE.BoxGeometry(sidewalkW, sidewalkH, sidewalkD);
  const sidewalkMat = createToonMaterial(0x94a3b8, { roughness: 0.8 });
  const sidewalkMesh = new THREE.Mesh(sidewalkGeo, sidewalkMat);
  sidewalkMesh.position.set(-8 + sidewalkW / 2, sidewalkH / 2, -8 + sidewalkD / 2);
  sidewalkMesh.receiveShadow = true;
  sidewalkMesh.castShadow = true;
  streetGroup.add(sidewalkMesh);
  addAnimeOutline(sidewalkMesh, 0.02, 0x1e293b);

  // Sidewalk Paving Tile Grooves (anime sidewalk line details)
  const tileLineMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 });
  const tileLinesGeo = new THREE.BufferGeometry();
  const linePoints = [];
  const startX = -8;
  const endX = 2.2;
  const startZ = -8;
  const endZ = 2.2;
  const tileSize = 0.8;

  for (let x = startX; x <= endX; x += tileSize) {
    linePoints.push(new THREE.Vector3(x, sidewalkH + 0.001, startZ));
    linePoints.push(new THREE.Vector3(x, sidewalkH + 0.001, endZ));
  }
  for (let z = startZ; z <= endZ; z += tileSize) {
    linePoints.push(new THREE.Vector3(startX, sidewalkH + 0.001, z));
    linePoints.push(new THREE.Vector3(endX, sidewalkH + 0.001, z));
  }
  tileLinesGeo.setFromPoints(linePoints);
  const tileLines = new THREE.LineSegments(tileLinesGeo, tileLineMat);
  streetGroup.add(tileLines);

  // 3. Concrete Curb Stones along the sidewalk border
  // South border curb (Z = 2.2)
  const curbMat = createToonMaterial(0x64748b, { roughness: 0.6 });
  const curbGeoZ = new THREE.BoxGeometry(sidewalkW + 0.15, sidewalkH + 0.02, 0.2);
  const curbZ = new THREE.Mesh(curbGeoZ, curbMat);
  curbZ.position.set(-8 + sidewalkW / 2, (sidewalkH + 0.02) / 2, 2.2);
  curbZ.castShadow = true;
  streetGroup.add(curbZ);

  // East border curb (X = 2.2)
  const curbGeoX = new THREE.BoxGeometry(0.2, sidewalkH + 0.02, sidewalkD + 0.15);
  const curbX = new THREE.Mesh(curbGeoX, curbMat);
  curbX.position.set(2.2, (sidewalkH + 0.02) / 2, -8 + sidewalkD / 2);
  curbX.castShadow = true;
  streetGroup.add(curbX);

  // 4. Yellow Tactile Paving (盲道砖) for pedestrians
  const tactileTex = createTactilePavingTexture();
  tactileTex.wrapS = THREE.RepeatWrapping;
  tactileTex.wrapT = THREE.RepeatWrapping;
  tactileTex.repeat.set(12, 1);

  const tactileMat = new THREE.MeshBasicMaterial({ map: tactileTex });
  // Horizontal tactile strip near curb
  const tactileGeoH = new THREE.PlaneGeometry(6.0, 0.45);
  const tactileH = new THREE.Mesh(tactileGeoH, tactileMat);
  tactileH.rotation.x = -Math.PI / 2;
  tactileH.position.set(-2.0, sidewalkH + 0.002, 1.6);
  streetGroup.add(tactileH);

  // Vertical tactile strip
  const tactileTexV = tactileTex.clone();
  tactileTexV.repeat.set(1, 10);
  const tactileMatV = new THREE.MeshBasicMaterial({ map: tactileTexV });
  const tactileGeoV = new THREE.PlaneGeometry(0.45, 5.0);
  const tactileV = new THREE.Mesh(tactileGeoV, tactileMatV);
  tactileV.rotation.x = -Math.PI / 2;
  tactileV.position.set(1.6, sidewalkH + 0.002, -1.0);
  streetGroup.add(tactileV);

  // 5. Metal Storm Drain Gratings (排水沟格栅) in road gutter
  const drainTex = createDrainGrateTexture();
  const drainMat = new THREE.MeshBasicMaterial({ map: drainTex });
  const drainGeo = new THREE.PlaneGeometry(0.4, 0.9);

  // Place drain grates along south and east curb gutters
  const drainPositions = [
    { x: -3.5, z: 2.55, rot: 0 },
    { x: 0.5, z: 2.55, rot: 0 },
    { x: 2.55, z: -3.0, rot: Math.PI / 2 },
    { x: 2.55, z: 0.5, rot: Math.PI / 2 }
  ];

  drainPositions.forEach(pos => {
    const drain = new THREE.Mesh(drainGeo, drainMat);
    drain.rotation.x = -Math.PI / 2;
    drain.rotation.z = pos.rot;
    drain.position.set(pos.x, 0.003, pos.z);
    streetGroup.add(drain);
  });

  // 6. Pedestrian Zebra Crossing (横断歩道)
  // Reflective white stripes on wet asphalt
  const zebraMat = new THREE.MeshBasicMaterial({
    color: 0xededf2,
    transparent: true,
    opacity: 0.88
  });
  const zebraStripeGeo = new THREE.PlaneGeometry(0.65, 3.2);

  // South crossing across cross-street
  const numStripes = 6;
  for (let i = 0; i < numStripes; i++) {
    const stripe = new THREE.Mesh(zebraStripeGeo, zebraMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(3.4 + i * 0.9, 0.004, 3.8);
    streetGroup.add(stripe);
  }

  // East crossing across main road
  const zebraStripeGeoV = new THREE.PlaneGeometry(3.2, 0.65);
  for (let i = 0; i < numStripes; i++) {
    const stripe = new THREE.Mesh(zebraStripeGeoV, zebraMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(3.8, 0.004, 3.4 + i * 0.9);
    streetGroup.add(stripe);
  }

  // 7. Road Markings: "止まれ" (STOP) Japanese Road Lettering & Stop Bar
  const tomareTex = createRoadTomareTexture();
  const tomareMat = new THREE.MeshBasicMaterial({
    map: tomareTex,
    transparent: true,
    opacity: 0.85
  });
  const tomareGeo = new THREE.PlaneGeometry(1.6, 3.6);
  const tomareMesh = new THREE.Mesh(tomareGeo, tomareMat);
  tomareMesh.rotation.x = -Math.PI / 2;
  tomareMesh.position.set(5.5, 0.005, 0.5);
  streetGroup.add(tomareMesh);

  // Stop Bar Line (厚白线)
  const stopBarMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
  const stopBarGeo = new THREE.PlaneGeometry(2.4, 0.35);
  const stopBar = new THREE.Mesh(stopBarGeo, stopBarMat);
  stopBar.rotation.x = -Math.PI / 2;
  stopBar.position.set(5.5, 0.005, 2.0);
  streetGroup.add(stopBar);

  // Road Center Dashed Line
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.75 });
  const dashGeo = new THREE.PlaneGeometry(0.18, 1.5);
  for (let z = -7; z <= 7; z += 3.0) {
    if (z > 2.0 && z < 5.5) continue; // Skip intersection center
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(5.5, 0.004, z);
    streetGroup.add(dash);
  }

  // 8. Convenience Store Dedicated Parking Space
  // Marked parking bay in front of store sidewalk
  const parkLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
  // Outer boundary line
  const pLineGeo1 = new THREE.PlaneGeometry(0.15, 4.6);
  const pLine1 = new THREE.Mesh(pLineGeo1, parkLineMat);
  pLine1.rotation.x = -Math.PI / 2;
  pLine1.position.set(-1.8, 0.004, 5.0);
  streetGroup.add(pLine1);

  const pLine2 = new THREE.Mesh(pLineGeo1, parkLineMat);
  pLine2.rotation.x = -Math.PI / 2;
  pLine2.position.set(0.6, 0.004, 5.0);
  streetGroup.add(pLine2);

  // Yellow Wheel Stop Blocks (车轮挡块)
  const stopperMat = createToonMaterial(0xeab308);
  const stopperGeo = new THREE.BoxGeometry(0.8, 0.1, 0.16);
  const stopper1 = new THREE.Mesh(stopperGeo, stopperMat);
  stopper1.position.set(-1.3, 0.05, 3.4);
  stopper1.castShadow = true;
  streetGroup.add(stopper1);
  addAnimeOutline(stopper1, 0.015, 0x1e293b);

  const stopper2 = new THREE.Mesh(stopperGeo, stopperMat);
  stopper2.position.set(0.1, 0.05, 3.4);
  stopper2.castShadow = true;
  streetGroup.add(stopper2);
  addAnimeOutline(stopper2, 0.015, 0x1e293b);

  return streetGroup;
}
