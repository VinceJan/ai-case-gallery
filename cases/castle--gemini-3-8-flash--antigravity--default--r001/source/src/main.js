import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { MaterialLibrary } from './materials.js';
import { BaseTerrain } from './base.js';
import { Castle } from './castle.js';
import { Village } from './village.js';
import { Farmland } from './farmland.js';
import { PixelCharacterSystem } from './pixelCharacters.js';
import { WeatherSystem } from './weather.js';
import { Soundscape } from './audio.js';
import { DioramaUI } from './ui.js';

class App {
  constructor() {
    this.container = document.body;
    this.clock = new THREE.Clock();

    this.cameraLerp = {
      isTransitioning: false,
      targetPos: new THREE.Vector3(),
      targetLookAt: new THREE.Vector3(),
      speed: 2.2,
    };

    this.initScene();
    this.initWorld();
    this.initUI();
    this.animate();
  }

  initScene() {
    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera: Beautiful isometric-style perspective miniature angle
    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    this.camera.position.set(34, 30, 42);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 3.0, 0);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05; // Never look under base
    this.controls.minDistance = 8;
    this.controls.maxDistance = 110;

    window.addEventListener('resize', () => this.onWindowResize());
  }

  initWorld() {
    // Material Library
    this.materials = new MaterialLibrary();

    // Base Diorama & Terracing
    this.base = new BaseTerrain(this.scene, this.materials);

    // Castle on high terrace
    this.castle = new Castle(this.scene, this.materials);

    // Village on middle terrace
    this.village = new Village(this.scene, this.materials);

    // Farmland on lower terrace & wings
    this.farmland = new Farmland(this.scene, this.materials);

    // Pixel Characters (Knight & Farmer)
    this.pixelChars = new PixelCharacterSystem(this.scene, this.camera);

    // Weather & Atmosphere System
    this.weather = new WeatherSystem(this.scene, this.renderer, this.materials, this.village);

    // Procedural Ambient Soundscape
    this.soundscape = new Soundscape();
  }

  initUI() {
    this.ui = new DioramaUI({
      weatherSystem: this.weather,
      audioSystem: this.soundscape,
      onCameraPreset: (preset) => this.setCameraPreset(preset),
      onToggleAutoRotate: (autoRotate) => {
        this.controls.autoRotate = autoRotate;
        this.controls.autoRotateSpeed = 0.8;
      },
    });
  }

  setCameraPreset(name) {
    const presets = {
      overview: { pos: new THREE.Vector3(34, 30, 42), target: new THREE.Vector3(0, 3.0, 0) },
      castle: { pos: new THREE.Vector3(0, 18, 4), target: new THREE.Vector3(0, 8.5, -15) },
      village: { pos: new THREE.Vector3(12, 10, 18), target: new THREE.Vector3(-1, 3.2, 2.5) },
      farmland: { pos: new THREE.Vector3(-18, 9, 28), target: new THREE.Vector3(-4, 1.8, 14) },
      knight: { pos: new THREE.Vector3(3.5, 5.5, 7.5), target: new THREE.Vector3(0, 2.8, 1.5) },
    };

    const targetConfig = presets[name] || presets.overview;
    this.cameraLerp.targetPos.copy(targetConfig.pos);
    this.cameraLerp.targetLookAt.copy(targetConfig.target);
    this.cameraLerp.isTransitioning = true;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // Smooth Camera Transition Lerp
    if (this.cameraLerp.isTransitioning) {
      this.camera.position.lerp(this.cameraLerp.targetPos, delta * this.cameraLerp.speed);
      this.controls.target.lerp(this.cameraLerp.targetLookAt, delta * this.cameraLerp.speed);
      if (this.camera.position.distanceTo(this.cameraLerp.targetPos) < 0.1) {
        this.cameraLerp.isTransitioning = false;
      }
    }

    this.controls.update();

    // Update Modules
    if (this.base) this.base.update(time);
    if (this.castle) this.castle.update(time);
    if (this.village) this.village.update(time);
    if (this.farmland) this.farmland.update(time);
    if (this.pixelChars) this.pixelChars.update(delta, time);
    if (this.weather) this.weather.update(delta, time);

    this.renderer.render(this.scene, this.camera);
  }
}

new App();
