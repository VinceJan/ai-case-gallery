import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { createDioramaBase } from './models/dioramaBase.js';
import { createStreet } from './models/street.js';
import { createConvenienceStore } from './models/convenienceStore.js';
import { createStreetFurniture } from './models/streetFurniture.js';
import { createRainSystem } from './effects/rainSystem.js';

// ----------------------------------------------------
// 1. SETUP CANVAS & RENDERER
// ----------------------------------------------------
const canvas = document.getElementById('webgl-canvas');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// ----------------------------------------------------
// 2. SCENE & CAMERA SETUP
// ----------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070b14); // Deep rainy midnight navy
scene.fog = new THREE.FogExp2(0x090e1c, 0.015);

const dioramaSize = 16.0;

// Third-person perspective camera framing the diorama
// Positioned to give an unobstructed view of the store entrance, glass windows, interior, and street corner
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.5,
  80.0
);
camera.position.set(4.2, 7.2, 14.6);

// OrbitControls (Smooth drag, rotate, zoom)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(-2.0, 1.2, -1.0); // Focus on the store entrance and front showcase
controls.minDistance = 4.5;
controls.maxDistance = 25.0;
controls.maxPolarAngle = Math.PI / 2 - 0.03; // Keep above base so pedestal is always grounded
controls.update();



// ----------------------------------------------------
// 3. ANIME NIGHT ENVIRONMENT LIGHTING
// ----------------------------------------------------
// Deep indigo ambient light (cold rainy exterior atmosphere)
const ambientLight = new THREE.AmbientLight(0x18243b, 1.2);
scene.add(ambientLight);

// Directional moonlight from high sky
const moonLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
moonLight.position.set(8.0, 16.0, 6.0);
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 2048;
moonLight.shadow.mapSize.height = 2048;
moonLight.shadow.camera.near = 1.0;
moonLight.shadow.camera.far = 30.0;
moonLight.shadow.camera.left = -9.0;
moonLight.shadow.camera.right = 9.0;
moonLight.shadow.camera.top = 9.0;
moonLight.shadow.camera.bottom = -9.0;
moonLight.shadow.bias = -0.001;
scene.add(moonLight);

// Cool blue fill light from opposite angle
const fillLight = new THREE.DirectionalLight(0x1e3a8a, 0.5);
fillLight.position.set(-10.0, 12.0, -8.0);
scene.add(fillLight);

// Warm exterior spill light (simulates bright interior light flooding out onto sidewalk)
const storeSpillLight = new THREE.PointLight(0xffecd1, 2.2, 9.0, 1.6);
storeSpillLight.position.set(-2.0, 2.2, 0.8);
scene.add(storeSpillLight);

// ----------------------------------------------------
// 4. ASSEMBLE DIORAMA LAYERS
// ----------------------------------------------------
const dioramaRoot = new THREE.Group();
dioramaRoot.name = 'DioramaRoot';
scene.add(dioramaRoot);

// (A) Solid Diorama Pedestal Base (Below ground Y <= 0)
const base = createDioramaBase(dioramaSize, 1.2);
dioramaRoot.add(base);

// (B) Street & Sidewalk Surface (Ground level Y = 0 to 0.12)
const street = createStreet(dioramaSize);
dioramaRoot.add(street);

// (C) Japanese Convenience Store Architecture & Detailed Interior
const store = createConvenienceStore();
dioramaRoot.add(store);

// (D) Street Corner Props & Infrastructure
const furniture = createStreetFurniture();
dioramaRoot.add(furniture);

// (E) Dynamic Rain & Animation Systems
const rainSystem = createRainSystem(scene, dioramaSize);

const models = {
  base,
  street,
  store,
  furniture
};

// ----------------------------------------------------
// 5. POST-PROCESSING (Anime Bloom & ACES Tone Mapping)
// ----------------------------------------------------
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// UnrealBloomPass for Japanese anime neon bloom
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.25, // strength (crisp sign text with soft ambient glow)
  0.25, // radius
  0.92  // threshold
);
composer.addPass(bloomPass);



// OutputPass handles sRGB output conversion and tone mapping
const outputPass = new OutputPass();
composer.addPass(outputPass);

// ----------------------------------------------------
// 6. RENDER & ANIMATION LOOP
// ----------------------------------------------------
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.1);
  const elapsed = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Update rain, drops, sliding door, neon hum, traffic light, AC fan
  rainSystem.update(delta, elapsed, models);

  // Render post-processing pipeline
  composer.render();
}

animate();

// ----------------------------------------------------
// 7. RESPONSIVE RESIZE HANDLER
// ----------------------------------------------------
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  composer.setSize(width, height);
  bloomPass.setSize(width, height);
});
