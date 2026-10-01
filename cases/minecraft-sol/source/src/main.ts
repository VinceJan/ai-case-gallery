import * as THREE from 'three';
import { Atmosphere } from './atmosphere';
import { Foliage } from './foliage';
import { Player } from './player';
import { TerrainRenderer } from './terrainMesh';
import { type Block, VoxelWorld, WATER_LEVEL } from './world';
import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#world')!;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.30;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, .06, 500);
const world = new VoxelWorld(42, 64);
try { world.loadEdits(localStorage.getItem('solstice-world-v1') ?? ''); } catch { /* Private browsing can disable storage. */ }
const terrain = new TerrainRenderer(world);
scene.add(terrain.group);
const foliage = new Foliage(world);
scene.add(foliage.group);
const atmosphere = new Atmosphere(scene, world);
const player = new Player(world, camera);
let beautifulLighting = true;

const selectionBox = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(1.009, 1.009, 1.009)),
  new THREE.LineBasicMaterial({ color: '#f7e6b7', transparent: true, opacity: .95, depthTest: false }),
);
selectionBox.visible = false;
selectionBox.renderOrder = 10;
scene.add(selectionBox);

const blockNames: Record<Block, string> = {
  grass: 'Grass Block', dirt: 'Rich Soil', stone: 'Stone', sand: 'Sandstone',
  wood: 'Oak Log', leaves: 'Oak Leaves', planks: 'Oak Planks', brick: 'Clay Brick', glow: 'Lantern Block',
};
const inventory: Block[] = ['grass', 'dirt', 'stone', 'wood', 'planks', 'brick', 'leaves', 'glow'];
const blockColors: Record<Block, string> = {
  grass: '#68934e', dirt: '#8b6748', stone: '#909795', sand: '#c7b58a',
  wood: '#825a38', leaves: '#568550', planks: '#b78d5c', brick: '#a36551', glow: '#ffc374',
};
let selected = 0;
let started = false;
let paused = true;
let hovered: { x: number; y: number; z: number; place: { x: number; y: number; z: number } | null; block: Block } | null = null;
let toastTimer = 0;

const landing = document.querySelector<HTMLElement>('#landing')!;
const pause = document.querySelector<HTMLElement>('#pause')!;
const hotbar = document.querySelector<HTMLElement>('#hotbar')!;
const hint = document.querySelector<HTMLElement>('#block-hint')!;
const toast = document.querySelector<HTMLElement>('#toast')!;
const coords = document.querySelector<HTMLElement>('#coords')!;
const biome = document.querySelector<HTMLElement>('#biome-label')!;
const fps = document.querySelector<HTMLElement>('#fps')!;
const timeIcon = document.querySelector<HTMLElement>('#time-icon')!;
const timeLabel = document.querySelector<HTMLElement>('#time-label')!;

function renderHotbar(): void {
  hotbar.replaceChildren();
  for (let i = 0; i < inventory.length; i++) {
    const block = inventory[i];
    const button = document.createElement('button');
    button.className = `slot${i === selected ? ' active' : ''}`;
    button.setAttribute('aria-label', `Select ${blockNames[block]}`);
    button.title = `${i + 1} · ${blockNames[block]}`;
    button.innerHTML = `<span class="slot-number">${i + 1}</span><span class="slot-block" style="--block-color:${blockColors[block]}"></span>`;
    button.addEventListener('click', () => { selected = i; renderHotbar(); showToast(blockNames[block]); });
    hotbar.append(button);
  }
}
renderHotbar();

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 1500);
}

function setPaused(value: boolean): void {
  paused = value;
  pause.classList.toggle('visible', value && started);
  pause.setAttribute('aria-hidden', String(!(value && started)));
  document.body.classList.toggle('playing', !value);
}

function requestPlay(): void {
  started = true;
  landing.classList.remove('visible');
  setPaused(false);
  canvas.requestPointerLock?.();
}

document.querySelector('#play-button')!.addEventListener('click', requestPlay);
document.querySelector('#resume-button')!.addEventListener('click', requestPlay);
document.querySelector('#menu-button')!.addEventListener('click', () => {
  if (!started) return;
  if (document.pointerLockElement) document.exitPointerLock();
  else setPaused(true);
});
canvas.addEventListener('click', () => { if (started && paused) requestPlay(); });
document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement && started) setPaused(true);
  else if (document.pointerLockElement) setPaused(false);
});
document.addEventListener('mousemove', (event) => {
  if (document.pointerLockElement === canvas && !paused) player.look(event.movementX, event.movementY);
});
document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape' && started && !document.pointerLockElement) setPaused(true);
  if (/^Digit[1-8]$/.test(event.code)) {
    selected = Number(event.code.slice(-1)) - 1;
    renderHotbar();
    showToast(blockNames[inventory[selected]]);
  }
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault();
  if (!paused) player.setKey(event.code, true);
});
document.addEventListener('keyup', (event) => player.setKey(event.code, false));
document.addEventListener('wheel', (event) => {
  if (paused) return;
  selected = (selected + (event.deltaY > 0 ? 1 : -1) + inventory.length) % inventory.length;
  renderHotbar();
  showToast(blockNames[inventory[selected]]);
}, { passive: true });
canvas.addEventListener('contextmenu', (event) => event.preventDefault());

function raycastBlock(): typeof hovered {
  const origin = camera.position;
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  let previous = { x: Math.floor(origin.x + .5), y: Math.floor(origin.y + .5), z: Math.floor(origin.z + .5) };
  for (let d = .08; d < 7; d += .045) {
    const x = Math.floor(origin.x + dir.x * d + .5);
    const y = Math.floor(origin.y + dir.y * d + .5);
    const z = Math.floor(origin.z + dir.z * d + .5);
    if (x === previous.x && y === previous.y && z === previous.z) continue;
    const block = world.getBlock(x, y, z);
    if (block) return { x, y, z, place: previous, block };
    previous = { x, y, z };
  }
  return null;
}

function editBlock(button: number): void {
  if (paused || document.pointerLockElement !== canvas) return;
  const target = raycastBlock();
  if (!target) return;
  if (button === 0) {
    if (target.y === 0) return;
    world.setBlock(target.x, target.y, target.z, null);
    terrain.updateBlock(target.x, target.z);
    foliage.rebuild();
  } else if (button === 2 && target.place) {
    const { x, y, z } = target.place;
    if (world.getBlock(x, y, z) || player.overlapsBlock(x, y, z)) return;
    if (!world.setBlock(x, y, z, inventory[selected])) return;
    terrain.updateBlock(x, z);
    foliage.rebuild();
  } else return;
  try { localStorage.setItem('solstice-world-v1', world.serializeEdits()); } catch { /* Save is best effort. */ }
}
document.addEventListener('mousedown', (event) => editBlock(event.button));

const timeSlider = document.querySelector<HTMLInputElement>('#time-slider')!;
timeSlider.addEventListener('input', () => {
  const value = Number(timeSlider.value);
  atmosphere.setDayTime(value);
  if (value < .3 || value > .7) { timeIcon.textContent = '☾'; timeLabel.textContent = 'TWILIGHT'; }
  else if (value < .39 || value > .61) { timeIcon.textContent = '☀'; timeLabel.textContent = 'GOLDEN HOUR'; }
  else { timeIcon.textContent = '☀'; timeLabel.textContent = 'DAYLIGHT'; }
});
const shaderToggle = document.querySelector<HTMLButtonElement>('#shader-toggle')!;
shaderToggle.addEventListener('click', () => {
  beautifulLighting = !beautifulLighting;
  shaderToggle.classList.toggle('active', beautifulLighting);
  shaderToggle.setAttribute('aria-checked', String(beautifulLighting));
  renderer.shadowMap.enabled = beautifulLighting;
  atmosphere.daylight.castShadow = beautifulLighting;
  terrain.material.needsUpdate = true;
});
document.querySelector('#reset-button')!.addEventListener('click', () => {
  if (!window.confirm('Remove all blocks you have placed or changed in this world?')) return;
  localStorage.removeItem('solstice-world-v1');
  window.location.reload();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

});

let last = performance.now();
let frameCount = 0;
let fpsTime = 0;
function frame(now: number): void {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, .08);
  last = now;
  if (!paused) player.update(dt);
  atmosphere.update(dt);
  foliage.update(now / 1000);
  hovered = !paused ? raycastBlock() : null;
  selectionBox.visible = !!hovered;
  hint.classList.toggle('visible', !!hovered);
  if (hovered) {
    selectionBox.position.set(hovered.x, hovered.y, hovered.z);
    hint.textContent = blockNames[hovered.block];
  }
  coords.textContent = `X ${Math.round(player.position.x)} · Y ${Math.floor(player.position.y)} · Z ${Math.round(player.position.z)}`;
  biome.textContent = player.position.y < WATER_LEVEL + 1 ? 'Stillwater Cove' : player.position.y > 16 ? 'The Highlands' : 'The Quiet Wilds';
  frameCount++;
  fpsTime += dt;
  if (fpsTime > .7) { fps.textContent = `${Math.round(frameCount / fpsTime)} FPS`; frameCount = 0; fpsTime = 0; }
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);
