import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createMaterials } from './materials.js';
import { createConvenienceStore } from './convenienceStore.js';
import { createStreetAndProps } from './streetAndProps.js';
import { createRainSystem } from './rainSystem.js';

// 1. Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090c16);
scene.fog = new THREE.FogExp2(0x0e1324, 0.018);

const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
// Ideal isometric third-person view angle showcasing entrance, interior, and street corner
camera.position.set(16.5, 12.0, 17.5);

const canvas = document.querySelector('#webgl-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// 2. Diorama Miniature Orbit Controls (No UI, Pure 3D Model Feel)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0.5, 1.8, 0.5);

// Keep view angle above the pedestal display base
controls.minPolarAngle = Math.PI / 10;
controls.maxPolarAngle = Math.PI / 2.05;
controls.minDistance = 6.0;
controls.maxDistance = 34.0;
controls.autoRotate = false;

// 3. Atmospheric Lighting (Cold Rain Night vs Warm Inviting Interior)
// Midnight cold blue ambient fill
const ambientLight = new THREE.AmbientLight(0x1c243b, 1.3);
scene.add(ambientLight);

// Overcast moon / rainy cloud top directional light
const moonLight = new THREE.DirectionalLight(0x3a4b73, 1.1);
moonLight.position.set(-10, 20, 10);
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 2048;
moonLight.shadow.mapSize.height = 2048;
moonLight.shadow.camera.near = 0.5;
moonLight.shadow.camera.far = 45;
moonLight.shadow.camera.left = -15;
moonLight.shadow.camera.right = 15;
moonLight.shadow.camera.top = 15;
moonLight.shadow.camera.bottom = -15;
moonLight.shadow.bias = -0.0005;
scene.add(moonLight);

// Warm radiant light spill from convenience store storefront onto wet street
const storefrontSpillLight = new THREE.SpotLight(0xffecd1, 2.4, 15.0, Math.PI / 2.5, 0.85, 1.2);
storefrontSpillLight.position.set(0.5, 3.2, 1.8);
storefrontSpillLight.target.position.set(0.5, 0, 5.2);
scene.add(storefrontSpillLight);
scene.add(storefrontSpillLight.target);

// 4. Build Diorama Modules
const materials = createMaterials();

// Street, Base Pedestal, Utility Pole, Vending Machine, Bicycle, Props
const streetAndProps = createStreetAndProps(materials);
scene.add(streetAndProps.group);

// Convenience Store (Building, Sign, Sliding Doors, Shelves, Drink Wall, Bento, Register, Oden)
const store = createConvenienceStore(materials);
scene.add(store.group);

// Dynamic Rainy Environment (Falling Streaks, Eaves Drips, Puddle Ripples, Oden Steam)
const rainSystem = createRainSystem(materials, {
  canopyEavesZ: store.canopyEavesZ,
  canopyMinX: store.canopyMinX,
  canopyMaxX: store.canopyMaxX
});
scene.add(rainSystem.group);

// 5. Animation Loop
let lastTime = performance.now();
const startTime = lastTime;

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = Math.min((now - lastTime) / 1000, 0.1);
  const elapsedTime = (now - startTime) / 1000;
  lastTime = now;

  // Update controls damping
  controls.update();

  // Update animations
  store.update(delta, elapsedTime);
  streetAndProps.update(delta);
  rainSystem.update(delta);

  renderer.render(scene, camera);
}

animate();

// 6. Responsive Window Resize Handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
