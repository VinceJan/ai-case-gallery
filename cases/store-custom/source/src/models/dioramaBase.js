import * as THREE from 'three';
import { createToonMaterial, addAnimeOutline } from '../materials/celShader.js';

export function createDioramaBase(size = 16, height = 1.2) {
  const baseGroup = new THREE.Group();
  baseGroup.name = 'DioramaBase';

  // 1. Main Pedestal Block (Below ground Y <= 0)
  const pedestalGeo = new THREE.BoxGeometry(size, height, size);
  const pedestalMat = createToonMaterial(0x131824, {
    roughness: 0.6,
    metalness: 0.1
  });
  const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
  pedestal.position.y = -height / 2;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  baseGroup.add(pedestal);

  // Subtle clean anime outline around the base perimeter
  addAnimeOutline(pedestal, 0.04, 0x090d16);

  // 2. Stratigraphic Cutaway Edge Layers (Architectural model cross-section)
  // Asphalt crust layer (top 0.1m)
  const crustH = 0.08;
  const crustGeo = new THREE.BoxGeometry(size + 0.02, crustH, size + 0.02);
  const crustMat = createToonMaterial(0x222b3d);
  const crust = new THREE.Mesh(crustGeo, crustMat);
  crust.position.y = -crustH / 2;
  baseGroup.add(crust);

  // Lower bevel rim / plinth base
  const plinthH = 0.18;
  const plinthMargin = 0.3;
  const plinthGeo = new THREE.BoxGeometry(size + plinthMargin, plinthH, size + plinthMargin);
  const plinthMat = createToonMaterial(0x0b0e17);
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = -height - plinthH / 2;
  baseGroup.add(plinth);

  // 3. Brass / Metallic Collectible Nameplate on the front edge
  const plateW = 3.6;
  const plateH = 0.55;
  const plateD = 0.04;
  const plateGeo = new THREE.BoxGeometry(plateW, plateH, plateD);

  // Create canvas texture for brass collector's plate
  const plateCanvas = document.createElement('canvas');
  plateCanvas.width = 512;
  plateCanvas.height = 128;
  const pctx = plateCanvas.getContext('2d');

  // Brushed gold / bronze gradient
  const goldGrad = pctx.createLinearGradient(0, 0, 512, 128);
  goldGrad.addColorStop(0, '#785627');
  goldGrad.addColorStop(0.3, '#f59e0b');
  goldGrad.addColorStop(0.5, '#fef08a');
  goldGrad.addColorStop(0.7, '#d97706');
  goldGrad.addColorStop(1, '#451a03');
  pctx.fillStyle = goldGrad;
  pctx.fillRect(0, 0, 512, 128);

  // Inset border
  pctx.strokeStyle = '#451a03';
  pctx.lineWidth = 4;
  pctx.strokeRect(8, 8, 496, 112);

  // Text
  pctx.fillStyle = '#1c1917';
  pctx.font = 'bold 36px "Hiragino Kaku Gothic ProN", sans-serif';
  pctx.textAlign = 'center';
  pctx.fillText('ほっとマート 桜町二丁目', 256, 56);

  pctx.font = 'bold 18px "Arial Rounded MT Bold", sans-serif';
  pctx.fillStyle = '#292524';
  pctx.fillText('RAINY NIGHT DIORAMA ・ 1/24 SCALE', 256, 92);

  // Rivets on corners
  pctx.fillStyle = '#451a03';
  [[20, 20], [492, 20], [20, 108], [492, 108]].forEach(([x, y]) => {
    pctx.beginPath();
    pctx.arc(x, y, 5, 0, Math.PI * 2);
    pctx.fill();
  });

  const plateTex = new THREE.CanvasTexture(plateCanvas);
  const plateMat = new THREE.MeshStandardMaterial({
    map: plateTex,
    roughness: 0.35,
    metalness: 0.8
  });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  plateMesh.position.set(0, -height / 2, size / 2 + plateD / 2);
  baseGroup.add(plateMesh);

  return baseGroup;
}
