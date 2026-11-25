import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { ENV_UNIFORMS } from './scene/materials.js';
import { ToonOutlineComposer } from './scene/outlineComposer.js';
import { buildTerrain } from './scene/terrain.js';
import { buildCastle } from './scene/castle.js';
import { buildVillage } from './scene/village.js';
import { buildFarmland } from './scene/farmland.js';
import { buildPixelCharacters } from './scene/pixelCharacters.js';
import { createWeatherSystem } from './scene/weather.js';
import { createWeatherUI } from './ui/weatherUI.js';

const appEl = document.getElementById('app');
const uiEl = document.getElementById('ui-root');

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
appEl.appendChild(renderer.domElement);

// Scene & atmospheric fog
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9e8f2);
scene.fog = new THREE.FogExp2(0xdfe9ee, 0.0085);

// Third-person miniature showcase camera
const camera = new THREE.PerspectiveCamera(
  36,
  window.innerWidth / window.innerHeight,
  0.5,
  140
);
camera.position.set(18.6, 17.6, 27.4);

// Smooth drag-rotate & zoom OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = true;
controls.panSpeed = 0.6;
controls.rotateSpeed = 0.72;
controls.zoomSpeed = 0.9;
controls.minDistance = 10.5;
controls.maxDistance = 56.0;
controls.minPolarAngle = 0.22;
controls.maxPolarAngle = Math.PI * 0.475;
controls.target.set(0.0, 2.35, -0.65);
controls.update();

// Lighting setup (controlled & smoothly modulated by WeatherSystem)
const hemiLight = new THREE.HemisphereLight(0xd8ebff, 0xa4947a, 1.05);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfff5de, 1.95);
sunLight.position.set(14, 22, 16);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near = 4;
sunLight.shadow.camera.far = 68;
const d = 17.5;
sunLight.shadow.camera.left = -d;
sunLight.shadow.camera.right = d;
sunLight.shadow.camera.top = d;
sunLight.shadow.camera.bottom = -d;
sunLight.shadow.bias = -0.00055;
sunLight.shadow.normalBias = 0.035;
scene.add(sunLight);

// Soft cool back-fill light so cel-shaded shadows stay vibrant and legible
const fillLight = new THREE.DirectionalLight(0xbcd8f5, 0.32);
fillLight.position.set(-16, 11, -14);
scene.add(fillLight);

// Cel-shaded ink outline post-processing pipeline
const outlineComposer = new ToonOutlineComposer(renderer, scene, camera);

// Shared water weather uniform
const waterUniforms = {
  uRainIntensity: { value: 0.0 },
};

// Build modular miniature world
const terrain = buildTerrain(waterUniforms);
const castle = buildCastle();
const village = buildVillage();
const farmland = buildFarmland();
const pixelChars = buildPixelCharacters();

scene.add(terrain.group);
scene.add(castle.group);
scene.add(village.group);
scene.add(farmland.group);
scene.add(pixelChars.group);

const allGlowMaterials = [
  ...castle.glowMaterials,
  ...village.glowMaterials,
];

// Weather & Atmosphere System + Minimal UI
const weatherSystem = createWeatherSystem({
  scene,
  sunLight,
  hemiLight,
  fillLight,
  outlineComposer,
  glowMaterials: allGlowMaterials,
  waterUniforms,
});

createWeatherUI(uiEl, weatherSystem);

// Expose quick inspection handle on window for testing/debugging
window.__DIORAMA__ = {
  scene,
  camera,
  controls,
  weatherSystem,
};

// Resize handler
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(pr);
  renderer.setSize(w, h);
  outlineComposer.setSize(w, h, pr);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;

  ENV_UNIFORMS.uTime.value = elapsed;

  controls.update();

  const currentSunColor = weatherSystem.update(dt, elapsed);
  terrain.update(dt, currentSunColor);
  castle.update(elapsed);
  village.update(dt, elapsed);
  farmland.update(elapsed);
  pixelChars.update(dt, elapsed, camera);

  outlineComposer.render();
}

animate();
