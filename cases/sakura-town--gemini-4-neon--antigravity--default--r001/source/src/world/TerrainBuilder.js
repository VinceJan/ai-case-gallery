import * as THREE from 'three';
import { CollisionSystem } from '../core/CollisionSystem.js';
import {
  createToonMaterial,
  createGrassTexture,
  createAsphaltTexture,
  createStonePathTexture,
  createWaterTexture,
  createWoodTexture,
} from '../art/ToonMaterials.js';
import { createSakuraTree, createCedarTree, createBench } from '../art/PropBuilders.js';

export class TerrainBuilder {
  constructor(scene, collision) {
    this.scene = scene;
    this.collision = collision;
    this.waterTexture = null;
    this.waterMesh = null;
    this.benches = [];
  }

  build() {
    this._buildBasinTerrain();
    this._buildSurroundingMountainsAndForest();
    this._buildRiverAndEmbankments();
    this._buildRedBridge();
    this._buildFishingPier();
    this._buildRoadsAndPaths();
    this._buildNorthernFields();
  }

  _buildBasinTerrain() {
    const geo = new THREE.PlaneGeometry(230, 220, 115, 110);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, CollisionSystem.getTerrainMeshHeight(x, z));
    }

    geo.computeVertexNormals();
    const ground = new THREE.Mesh(geo, createToonMaterial(0xffffff, { map: createGrassTexture(22, 22) }));
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  _buildSurroundingMountainsAndForest() {
    const nearPeakMat = createToonMaterial(0x558c64);
    const midPeakMat = createToonMaterial(0x63948b);
    const farPeakMat = createToonMaterial(0x82a7c2);

    const mountainGroup = new THREE.Group();
    const rings = [
      { count: 18, radius: 108, minH: 22, maxH: 38, minR: 26, maxR: 40, mat: nearPeakMat },
      { count: 22, radius: 158, minH: 36, maxH: 64, minR: 38, maxR: 58, mat: midPeakMat },
      { count: 24, radius: 215, minH: 52, maxH: 92, minR: 52, maxR: 78, mat: farPeakMat },
    ];

    rings.forEach((ring, rIdx) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + rIdx * 0.35;
        const jitterR = ring.radius + Math.sin(i * 4.7 + rIdx) * 12;
        const x = Math.cos(angle) * jitterR;
        const z = Math.sin(angle) * jitterR - 6;
        const h = ring.minH + ((Math.sin(i * 2.9 + rIdx * 5) + 1) * 0.5) * (ring.maxH - ring.minH);
        const rad = ring.minR + ((Math.cos(i * 3.3 + rIdx) + 1) * 0.5) * (ring.maxR - ring.minR);

        const peak = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 7), ring.mat);
        peak.position.set(x, h * 0.42 - 3, z);
        peak.rotation.y = i * 0.9;
        mountainGroup.add(peak);
      }
    });
    this.scene.add(mountainGroup);

    const forestSpots = [];
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const rx = 59 + (i % 3) * 7 + Math.sin(i * 2.3) * 3;
      const rz = 46 + (i % 4) * 6 + Math.cos(i * 1.9) * 3;
      const x = Math.cos(a) * rx;
      const z = Math.sin(a) * rz - 6;
      if (Math.abs(z + 18) < 6.5) continue;
      if (Math.abs(x - CollisionSystem.getRiverCenterX(z)) < 8.5) continue;
      forestSpots.push({ x, z, isSakura: i % 5 === 0, scale: 1.05 + (i % 4) * 0.2 });
    }

    const extraGroves = [
      { x: 52, z: -26, isSakura: true, scale: 1.25 },
      { x: 48, z: -30, isSakura: false, scale: 1.3 },
      { x: 54, z: -5, isSakura: false, scale: 1.35 },
      { x: 53, z: 7, isSakura: true, scale: 1.2 },
      { x: 44, z: 16, isSakura: false, scale: 1.2 },
      { x: -45, z: -28, isSakura: true, scale: 1.25 },
      { x: -42, z: -34, isSakura: false, scale: 1.3 },
      { x: -46, z: 14, isSakura: true, scale: 1.2 },
      { x: -38, z: 24, isSakura: false, scale: 1.25 },
      { x: 8, z: 28, isSakura: true, scale: 1.18 },
      { x: 16, z: 26, isSakura: false, scale: 1.22 },
    ];

    [...forestSpots, ...extraGroves].forEach((spot, idx) => {
      const tree = spot.isSakura ? createSakuraTree(spot.scale, idx + 1) : createCedarTree(spot.scale);
      const y = CollisionSystem.getTerrainMeshHeight(spot.x, spot.z);
      tree.position.set(spot.x, y - 0.15, spot.z);
      tree.rotation.y = idx * 1.1;
      this.scene.add(tree);
    });
  }

  _buildRiverAndEmbankments() {
    const geo = new THREE.PlaneGeometry(10.6, 210, 4, 80);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setX(i, pos.getX(i) + CollisionSystem.getRiverCenterX(pos.getZ(i)));
    }
    geo.computeVertexNormals();

    this.waterTexture = createWaterTexture();
    this.waterMesh = new THREE.Mesh(
      geo,
      createToonMaterial(0xffffff, { map: this.waterTexture, transparent: true, opacity: 0.88 })
    );
    this.waterMesh.position.y = -1.12;
    this.waterMesh.receiveShadow = true;
    this.scene.add(this.waterMesh);

    [-30, -8, 10, 21].forEach((z, idx) => {
      const rc = CollisionSystem.getRiverCenterX(z);
      const wx = rc - 7.6;
      const treeW = createSakuraTree(1.08, idx * 2 + 3);
      treeW.position.set(wx, 0, z);
      this.scene.add(treeW);
      this.collision.addCircle(wx, z, 0.55);

      if (z !== -8) {
        const ex = rc + 7.8;
        const treeE = createSakuraTree(1.04, idx * 2 + 7);
        treeE.position.set(ex, CollisionSystem.getTerrainMeshHeight(ex, z), z);
        this.scene.add(treeE);
        this.collision.addCircle(ex, z, 0.55);
      }
    });

    const bench1 = createBench();
    bench1.position.set(21.4, 0, -4.5);
    bench1.rotation.y = Math.PI / 2;
    this.scene.add(bench1);
    this.collision.addBoxCenter(21.4, -4.5, 0.8, 2.0);
    this.benches.push({
      id: 'bench_river_north', label: '坐在樱川河畔长椅上', x: 21.4, y: 0, z: -4.5,
      sitPos: new THREE.Vector3(21.55, 0.45, -4.5), facingYaw: Math.PI / 2,
    });

    const bench2 = createBench();
    bench2.position.set(21.4, 0, 8.2);
    bench2.rotation.y = Math.PI / 2;
    this.scene.add(bench2);
    this.collision.addBoxCenter(21.4, 8.2, 0.8, 2.0);
    this.benches.push({
      id: 'bench_river_south', label: '坐在樱花树下看河水', x: 21.4, y: 0, z: 8.2,
      sitPos: new THREE.Vector3(21.55, 0.45, 8.2), facingYaw: Math.PI / 2,
    });
  }

  _buildRedBridge() {
    const group = new THREE.Group();
    const woodMat = createToonMaterial(0xffffff, { map: createWoodTexture('#b07d52', '#8e613c', 3, 1) });
    const redMat = createToonMaterial(0xd4493b);
    const goldMat = createToonMaterial(0xf2c652);

    const segments = 16;
    const xStart = 21.2;
    const xEnd = 36.8;
    const span = xEnd - xStart;
    const bridgeZ = 2.1;
    const bridgeW = 4.2;

    for (let i = 0; i < segments; i++) {
      const t0 = i / segments;
      const t1 = (i + 1) / segments;
      const tm = (t0 + t1) * 0.5;
      const x = xStart + tm * span;
      const y0 = 0.18 + Math.sin(t0 * Math.PI) * 0.95;
      const y1 = 0.18 + Math.sin(t1 * Math.PI) * 0.95;
      const ym = (y0 + y1) * 0.5;
      const segLen = span / segments;
      const slope = Math.atan2(y1 - y0, segLen);

      const plank = new THREE.Mesh(new THREE.BoxGeometry(segLen + 0.08, 0.24, bridgeW), woodMat);
      plank.position.set(x, ym - 0.12, bridgeZ);
      plank.rotation.z = slope;
      plank.castShadow = true;
      plank.receiveShadow = true;
      group.add(plank);

      for (const side of [-1, 1]) {
        const railZ = bridgeZ + side * (bridgeW * 0.5 - 0.12);
        const topRail = new THREE.Mesh(new THREE.BoxGeometry(segLen + 0.06, 0.1, 0.12), redMat);
        topRail.position.set(x, ym + 0.92, railZ);
        topRail.rotation.z = slope;
        topRail.castShadow = true;
        group.add(topRail);

        const midRail = new THREE.Mesh(new THREE.BoxGeometry(segLen + 0.06, 0.07, 0.09), redMat);
        midRail.position.set(x, ym + 0.48, railZ);
        midRail.rotation.z = slope;
        group.add(midRail);
      }
    }

    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const x = xStart + t * span;
      const y = 0.18 + Math.sin(t * Math.PI) * 0.95;
      for (const side of [-1, 1]) {
        const z = bridgeZ + side * (bridgeW * 0.5 - 0.12);
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.15, 0.2), redMat);
        post.position.set(x, y + 0.55, z);
        post.castShadow = true;
        group.add(post);

        const finial = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), goldMat);
        finial.position.set(x, y + 1.18, z);
        group.add(finial);
      }
    }

    this.collision.addBox(21.4, -0.35, 36.6, 0.12);
    this.collision.addBox(21.4, 4.08, 36.6, 4.55);
    this.scene.add(group);
  }

  _buildFishingPier() {
    const group = new THREE.Group();
    const woodMat = createToonMaterial(0xffffff, { map: createWoodTexture('#9c6e46', '#7a5232', 2, 2) });
    const darkWood = createToonMaterial(0x63432c);

    const deck = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.22, 4.8), woodMat);
    deck.position.set(24.15, -0.73, 14.0);
    deck.castShadow = true;
    deck.receiveShadow = true;
    group.add(deck);

    for (const px of [22.0, 24.2, 26.5]) {
      for (const pz of [12.0, 16.0]) {
        const piling = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.7, 7), darkWood);
        piling.position.set(px, -1.25, pz);
        piling.castShadow = true;
        group.add(piling);
      }
    }

    for (let i = 0; i < 4; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 3.2), woodMat);
      step.position.set(19.6 + i * 0.52, -0.14 - i * 0.16, 14.0);
      step.receiveShadow = true;
      group.add(step);
    }

    const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.19, 0.36, 10), createToonMaterial(0xc49562));
    bucket.position.set(25.6, -0.44, 12.4);
    bucket.castShadow = true;
    group.add(bucket);

    this.collision.addBox(26.85, 11.4, 27.5, 16.6);
    this.collision.addBox(21.4, 11.0, 27.0, 11.55);
    this.collision.addBox(21.4, 16.45, 27.0, 17.0);
    this.scene.add(group);
  }

  _buildRoadsAndPaths() {
    const asphaltMatNS = createToonMaterial(0xffffff, { map: createAsphaltTexture(1, 10) });
    const asphaltMatEW = createToonMaterial(0xffffff, { map: createAsphaltTexture(1, 9) });
    const stoneMat = createToonMaterial(0xffffff, { map: createStonePathTexture(2, 6) });
    const dirtMat = createToonMaterial(0xc8b28e);

    const nsRoad = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 48), asphaltMatNS);
    nsRoad.rotation.x = -Math.PI / 2;
    nsRoad.position.set(0, 0.03, -10);
    nsRoad.receiveShadow = true;
    this.scene.add(nsRoad);

    const ewRoad = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 52), asphaltMatEW);
    ewRoad.rotation.x = -Math.PI / 2;
    ewRoad.rotation.z = Math.PI / 2;
    ewRoad.position.set(-4.5, 0.035, 2.1);
    ewRoad.receiveShadow = true;
    this.scene.add(ewRoad);

    const stripeMat = createToonMaterial(0xf5f3ec);
    for (let i = -2; i <= 2; i++) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 2.0), stripeMat);
      s.rotation.x = -Math.PI / 2;
      s.position.set(i * 0.9, 0.045, -1.6);
      this.scene.add(s);
    }

    const stationPath = new THREE.Mesh(new THREE.PlaneGeometry(11, 2.8), stoneMat);
    stationPath.rotation.x = -Math.PI / 2;
    stationPath.position.set(-5.5, 0.04, -22.2);
    stationPath.receiveShadow = true;
    this.scene.add(stationPath);

    const riverPath = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 30), dirtMat);
    riverPath.rotation.x = -Math.PI / 2;
    riverPath.position.set(19.6, 0.025, 2.5);
    riverPath.receiveShadow = true;
    this.scene.add(riverPath);

    const cottagePath = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 4.5), stoneMat);
    cottagePath.rotation.x = -Math.PI / 2;
    cottagePath.position.set(-13, 0.04, -1.4);
    cottagePath.receiveShadow = true;
    this.scene.add(cottagePath);
  }

  _buildNorthernFields() {
    const soilMat = createToonMaterial(0x7e5f45);
    const cropMat = createToonMaterial(0x63a64b);
    const paddyWaterMat = createToonMaterial(0x7bbad0, { transparent: true, opacity: 0.78 });

    const plot = new THREE.Mesh(new THREE.BoxGeometry(13.5, 0.14, 7.2), soilMat);
    plot.position.set(-13, 0.05, -31.5);
    plot.receiveShadow = true;
    this.scene.add(plot);

    for (let r = 0; r < 4; r++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(12.2, 0.22, 0.8), soilMat);
      ridge.position.set(-13, 0.14, -34.0 + r * 1.65);
      this.scene.add(ridge);
      for (let c = 0; c < 8; c++) {
        const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.36, 0), cropMat);
        bush.position.set(-18.2 + c * 1.48, 0.42, -34.0 + r * 1.65);
        bush.castShadow = true;
        this.scene.add(bush);
      }
    }

    const paddyFrame = new THREE.Mesh(new THREE.BoxGeometry(12.6, 0.22, 8.2), createToonMaterial(0x88b86d));
    paddyFrame.position.set(12, 0.06, -31.5);
    paddyFrame.receiveShadow = true;
    this.scene.add(paddyFrame);

    const paddyWater = new THREE.Mesh(new THREE.PlaneGeometry(11.4, 7.0), paddyWaterMat);
    paddyWater.rotation.x = -Math.PI / 2;
    paddyWater.position.set(12, 0.19, -31.5);
    this.scene.add(paddyWater);

    const scarecrow = new THREE.Group();
    scarecrow.position.set(-12.8, 0.12, -31.5);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.9, 6), createToonMaterial(0x7c5738));
    pole.position.y = 0.95;
    scarecrow.add(pole);
    const arms = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 6), createToonMaterial(0x7c5738));
    arms.rotation.z = Math.PI / 2;
    arms.position.y = 1.32;
    scarecrow.add(arms);
    const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.72, 0.25), createToonMaterial(0x5278a8));
    shirt.position.y = 1.15;
    scarecrow.add(shirt);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), createToonMaterial(0xf0dfc2));
    head.position.y = 1.66;
    scarecrow.add(head);
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.52, 0.22, 8), createToonMaterial(0xdcb868));
    hat.position.y = 1.88;
    scarecrow.add(hat);
    this.scene.add(scarecrow);

    const overlookBench = createBench();
    overlookBench.position.set(0, 0.02, -34.2);
    this.scene.add(overlookBench);
    this.collision.addBoxCenter(0, -34.2, 2.0, 0.8);
    this.benches.push({
      id: 'bench_north_overlook', label: '坐在北丘长椅眺望电车与小镇', x: 0, y: 0, z: -34.2,
      sitPos: new THREE.Vector3(0, 0.48, -34.05), facingYaw: 0,
    });
  }

  update(dt) {
    if (this.waterTexture) this.waterTexture.offset.y -= dt * 0.18;
  }
}
