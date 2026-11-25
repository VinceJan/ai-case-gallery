import * as THREE from 'three';
import {
  createToonMaterial,
  createWoodTexture,
  createRoofTileTexture,
  createStonePathTexture,
} from '../art/ToonMaterials.js';
import { createStoneLantern, createSakuraTree, createBench } from '../art/PropBuilders.js';

export class ShrineBuilder {
  constructor(scene, collision) {
    this.scene = scene;
    this.collision = collision;
    this.lanternLights = [];
    this.lanternMats = [];
    this.bellRope = null;
    this.bellSwing = 0;
    this.benches = [];
    this.landmarks = {};
  }

  build() {
    this._buildStairsAndTerrace();
    this._buildToriiGates();
    this._buildShrineHall();
    this._buildSacredWeepingSakura();
    this._buildLanternsAndDetails();
  }

  _buildStairsAndTerrace() {
    const stoneMat = createToonMaterial(0xffffff, { map: createStonePathTexture(2, 3) });
    const trimStone = createToonMaterial(0x9a978e);

    for (let i = 0; i < 10; i++) {
      const t = (i + 0.5) / 10;
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 3.6), trimStone);
      step.position.set(36.8 + t * 3.8, t * 2.0 - 0.1, 1.7);
      step.castShadow = true;
      step.receiveShadow = true;
      this.scene.add(step);
    }

    const plaza = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.16, 12.2), stoneMat);
    plaza.position.set(46.2, 1.98, -4.6);
    plaza.receiveShadow = true;
    this.scene.add(plaza);
  }

  _createTorii(scale = 1) {
    const group = new THREE.Group();
    const vermilion = createToonMaterial(0xd64134);
    const blackMat = createToonMaterial(0x28292e);

    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.22 * scale, 4.1 * scale, 8), vermilion);
      pillar.position.set(side * 1.65 * scale, 2.05 * scale, 0);
      pillar.castShadow = true;
      group.add(pillar);

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.26 * scale, 0.3 * scale, 0.45 * scale, 8), blackMat);
      base.position.set(side * 1.65 * scale, 0.22 * scale, 0);
      group.add(base);
    }
    const nuki = new THREE.Mesh(new THREE.BoxGeometry(4.4 * scale, 0.24 * scale, 0.24 * scale), vermilion);
    nuki.position.y = 3.2 * scale;
    nuki.castShadow = true;
    group.add(nuki);

    const kasagi = new THREE.Mesh(new THREE.BoxGeometry(5.1 * scale, 0.28 * scale, 0.38 * scale), vermilion);
    kasagi.position.y = 4.05 * scale;
    kasagi.castShadow = true;
    group.add(kasagi);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(5.3 * scale, 0.14 * scale, 0.44 * scale), blackMat);
    cap.position.y = 4.24 * scale;
    group.add(cap);

    const tablet = new THREE.Mesh(new THREE.BoxGeometry(0.45 * scale, 0.68 * scale, 0.14 * scale), blackMat);
    tablet.position.y = 3.65 * scale;
    group.add(tablet);
    return group;
  }

  _buildToriiGates() {
    const torii1 = this._createTorii(1.0);
    torii1.position.set(36.9, 0.08, 1.7);
    torii1.rotation.y = Math.PI / 2;
    this.scene.add(torii1);
    this.collision.addCircle(36.9, 0.05, 0.26);
    this.collision.addCircle(36.9, 3.35, 0.26);

    const torii2 = this._createTorii(0.95);
    torii2.position.set(42.2, 2.0, -1.6);
    torii2.rotation.y = 0.25;
    this.scene.add(torii2);
    this.collision.addCircle(40.6, -2.0, 0.26);
    this.collision.addCircle(43.8, -1.2, 0.26);
  }

  _buildShrineHall() {
    const cx = 46.5;
    const cz = -9.6;
    const baseY = 2.0;

    const group = new THREE.Group();
    const woodMat = createToonMaterial(0xffffff, { map: createWoodTexture('#8a5738', '#693f26', 2, 2) });
    const plasterMat = createToonMaterial(0xf7efe2);
    const roofMat = createToonMaterial(0xffffff, { map: createRoofTileTexture('#3a4250', '#505c6f', 3, 2) });
    const goldMat = createToonMaterial(0xeab844);

    const deck = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.45, 4.8), woodMat);
    deck.position.set(cx, baseY + 0.22, cz);
    deck.castShadow = true;
    deck.receiveShadow = true;
    group.add(deck);

    const body = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.9, 3.4), plasterMat);
    body.position.set(cx, baseY + 1.9, cz - 0.35);
    body.castShadow = true;
    group.add(body);

    for (const px of [-2.8, -1.1, 1.1, 2.8]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.15, 2.8, 8), woodMat);
      p.position.set(cx + px, baseY + 1.85, cz + 1.9);
      p.castShadow = true;
      group.add(p);
    }

    const roof = new THREE.Mesh(new THREE.ConeGeometry(5.6, 2.4, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1.15, 1.0, 0.92);
    roof.position.set(cx, baseY + 4.45, cz);
    roof.castShadow = true;
    group.add(roof);

    const saisen = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.72, 0.75), woodMat);
    saisen.position.set(cx, baseY + 0.68, cz + 2.15);
    saisen.castShadow = true;
    group.add(saisen);

    const ropePivot = new THREE.Group();
    ropePivot.position.set(cx, baseY + 3.25, cz + 2.15);
    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 10), goldMat);
    bell.position.y = -0.25;
    ropePivot.add(bell);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.75, 8), createToonMaterial(0xd84c45));
    rope.position.y = -1.2;
    ropePivot.add(rope);
    group.add(ropePivot);
    this.bellRope = ropePivot;

    const shrineLight = new THREE.PointLight(0xffcb78, 0.6, 12, 1.5);
    shrineLight.position.set(cx, baseY + 2.6, cz + 1.9);
    group.add(shrineLight);
    this.lanternLights.push(shrineLight);

    this.scene.add(group);
    this.collision.addBoxCenter(cx, cz, 7.0, 4.9);
    this.collision.addCameraBox(cx - 3.8, baseY, cz - 2.8, cx + 3.8, baseY + 5.8, cz + 2.8, null);
    this.landmarks.shrineOffering = new THREE.Vector3(cx, baseY, cz + 2.9);
  }

  _buildSacredWeepingSakura() {
    const tree = createSakuraTree(1.65, 99);
    tree.position.set(51.6, 2.0, -3.8);
    this.scene.add(tree);
    this.collision.addCircle(51.6, -3.8, 0.85);

    const rope = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.11, 7, 16), createToonMaterial(0xd8bd7c));
    rope.rotation.x = Math.PI / 2;
    rope.position.set(51.6, 3.25, -3.8);
    this.scene.add(rope);
  }

  _buildLanternsAndDetails() {
    for (const [x, y, z] of [[37.4, 0.2, 0.1], [37.4, 0.2, 3.3], [42.8, 2.0, -5.8], [49.8, 2.0, -5.8]]) {
      const lantern = createStoneLantern();
      lantern.position.set(x, y, z);
      this.scene.add(lantern);
      this.collision.addCircle(x, z, 0.35);
      this.lanternLights.push(lantern.userData.lampLight);
      this.lanternMats.push(lantern.userData.glowMaterial);
    }

    const bench = createBench();
    bench.position.set(41.8, 2.0, -6.2);
    bench.rotation.y = -Math.PI / 2;
    this.scene.add(bench);
    this.collision.addBoxCenter(41.8, -6.2, 0.8, 2.0);
    this.benches.push({
      id: 'bench_shrine', label: '坐在神社观景椅俯瞰樱花小镇', x: 41.8, y: 2.0, z: -6.2,
      sitPos: new THREE.Vector3(41.65, 2.48, -6.2), facingYaw: -Math.PI / 2,
    });
  }

  ringBell() { this.bellSwing = 1.0; }

  update(dt, nightFactor) {
    if (this.bellSwing > 0.01 && this.bellRope) {
      this.bellSwing *= Math.exp(-dt * 2.2);
      this.bellRope.rotation.x = Math.sin(performance.now() * 0.016) * 0.42 * this.bellSwing;
    } else if (this.bellRope) {
      this.bellRope.rotation.x = 0;
    }
    for (const light of this.lanternLights) light.intensity = 0.25 + nightFactor * 2.1;
    for (const mat of this.lanternMats) mat.emissiveIntensity = 0.15 + nightFactor * 1.1;
  }
}
