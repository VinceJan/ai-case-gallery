import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';
import { globalUniforms } from './materials.js';
import { buildDioramaBase } from './base.js';
import { buildCastle } from './castle.js';
import { buildVillage } from './village.js';
import { buildFarmland } from './farmland.js';
import { buildPixelCharacters } from './pixelCharacters.js';
import { WeatherSystem } from './weather.js';
import { setupPostprocessing } from './postprocessing.js';
import { AudioManager } from './audio.js';
import { setupUI } from './ui.js';

// Initialize Three.js Application
function init() {
  const container = document.createElement('div');
  container.id = 'canvas-container';
  document.body.appendChild(container);

  // 1. Scene & Renderer
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  // 2. Camera: Isometric-like Diorama Perspective
  const camera = new THREE.PerspectiveCamera(
    38,
    window.innerWidth / window.innerHeight,
    0.5,
    250
  );
  camera.position.set(40, 36, 44);

  // 3. OrbitControls (Smooth third-person diorama navigation)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 6.0, 0);
  controls.maxPolarAngle = Math.PI / 2.05; // Never clip under diorama base
  controls.minDistance = 8;
  controls.maxDistance = 110;
  controls.update();

  // Arrays to collect dynamic items
  const animatedObjects = [];
  const nightLights = [];

  // 4. Build Diorama Base & Tiered Topography (前低后高)
  const dioramaBase = buildDioramaBase();
  scene.add(dioramaBase);

  // 5. Build High Fortress Castle (后方高处)
  const castle = buildCastle(animatedObjects, nightLights);
  scene.add(castle);

  // 6. Build Lively Medieval Village (居中村落)
  const village = buildVillage(animatedObjects, nightLights);
  scene.add(village);

  // 7. Build Farmland & Golden Wheat Fields (前方与两翼)
  const farmland = buildFarmland(animatedObjects);
  scene.add(farmland);

  // 8. Build 2D Pixel Characters (Q版骑士与农夫)
  const { charactersGroup, knightStandee, farmerStandee } = buildPixelCharacters(
    scene,
    camera,
    animatedObjects
  );

  // 9. Weather System (Sun, dusk, rain, snow, night, clouds, fireflies)
  const weatherSystem = new WeatherSystem(scene, renderer, nightLights);

  // 10. Cel Edge Outline Postprocessing Pass
  const postprocessing = setupPostprocessing(renderer, scene, camera);

  // 11. Procedural Web Audio Ambient Sound Synthesizer
  const audioManager = new AudioManager();

  // 12. Setup Medieval Glassmorphic UI & Clean View Controller
  const uiController = setupUI({
    weatherSystem,
    controls,
    camera,
    audioManager,
    postprocessing,
    knightStandee,
    farmerStandee
  });

  // Handle Window Resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    postprocessing.resize(width, height);
  });

  // 13. Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);
    const elapsedTime = clock.getElapsedTime();

    // Update global shader time uniform for waving wheat, flags, water
    globalUniforms.uTime.value = elapsedTime;

    // Update animated world objects (windmill, watermill, smoke, cows, sheep)
    animatedObjects.forEach(obj => {
      if (obj.update) obj.update(delta, elapsedTime);
    });

    // Update weather effects (clouds, rain, snow, night fireflies, day cycle)
    weatherSystem.update(delta, elapsedTime);

    // Update camera smooth bookmark/target transitions
    uiController.updateCameraTransition(delta);

    // Update OrbitControls
    controls.update();

    // Render with Cel Post-processing
    postprocessing.composer.render();
  }

  animate();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
