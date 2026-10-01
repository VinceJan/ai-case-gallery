import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createTerrain } from './terrain.js';
import { createWater } from './water.js';
import { createClouds } from './clouds.js';
import { createForest } from './forest.js';
import './style.css';

const canvas = document.querySelector('#scene');
const fpsElement = document.querySelector('#fps');
const errorElement = document.querySelector('#error-message');

if (!('WebGLRenderingContext' in window)) {
  errorElement.hidden = false;
} else {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xa8bdbe, 67, 154);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(190, 40, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {},
      vertexShader: `
        varying vec3 vDirection;
        void main() {
          vDirection = normalize(mat3(modelMatrix) * position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDirection;
        void main() {
          float h = normalize(vDirection).y;
          float lower = smoothstep(-0.25, 0.15, h);
          float upper = smoothstep(0.08, 0.88, h);
          vec3 horizon = vec3(0.84, 0.63, 0.49);
          vec3 haze = vec3(0.60, 0.72, 0.75);
          vec3 high = vec3(0.24, 0.39, 0.53);
          vec3 color = mix(horizon, haze, lower);
          color = mix(color, high, upper * 0.88);
          float glow = exp(-pow((h - 0.015) * 8.5, 2.0));
          color += vec3(0.12, 0.075, 0.045) * glow;
          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    }),
  );
  sky.name = 'Dawn sky';
  scene.add(sky);

  const hemisphere = new THREE.HemisphereLight(0xd4e5e6, 0x4d5149, 2.25);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(0xffd2a1, 3.2);
  sun.position.set(-36, 58, 26);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1536, 1536);
  sun.shadow.camera.left = -58;
  sun.shadow.camera.right = 58;
  sun.shadow.camera.top = 52;
  sun.shadow.camera.bottom = -52;
  sun.shadow.camera.near = 4;
  sun.shadow.camera.far = 150;
  sun.shadow.bias = -0.00018;
  scene.add(sun);

  const coolFill = new THREE.DirectionalLight(0x8ebcc7, 0.62);
  coolFill.position.set(25, 18, -36);
  scene.add(coolFill);

  const terrain = createTerrain();
  scene.add(terrain.mesh);
  scene.add(createForest(terrain.heightAt));
  const clouds = createClouds();
  scene.add(clouds.group);
  const water = createWater(terrain);
  scene.add(water.root);

  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 420);
  camera.position.set(48, 39, 80);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 14, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;
  controls.enablePan = false;
  controls.minDistance = 50;
  controls.maxDistance = 122;
  controls.minPolarAngle = 0.78;
  controls.maxPolarAngle = 1.52;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.43;
  controls.update();

  const clock = new THREE.Clock();
  let frameCount = 0;
  let fpsElapsed = 0;
  const fpsSmoothed = { value: 60 };
  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    clouds.update(elapsed);
    water.update(elapsed);
    controls.update();
    renderer.render(scene, camera);

    frameCount += 1;
    fpsElapsed += delta;
    if (fpsElapsed >= 0.65) {
      const measured = frameCount / fpsElapsed;
      fpsSmoothed.value = THREE.MathUtils.lerp(fpsSmoothed.value, measured, 0.48);
      fpsElement.textContent = String(Math.round(fpsSmoothed.value));
      frameCount = 0;
      fpsElapsed = 0;
    }
  }
  animate();

  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.setSize(width, height);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') clock.start();
  });
}
