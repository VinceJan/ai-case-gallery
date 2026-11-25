import * as THREE from 'three';
import { CollisionWorld } from './core/collision.js';
import { PlayerController } from './core/player.js';
import { buildTerrain } from './world/terrain.js';
import { buildTownBuildings } from './world/buildings.js';
import { AtmosphereSystem } from './world/atmosphere.js';
import { RailwaySystem } from './systems/railway.js';
import { SoundEngine } from './systems/audio.js';
import { NPCManager } from './systems/npcs.js';
import { GameState } from './systems/gameState.js';
import { InteractionSystem } from './systems/interactions.js';
import { UIController } from './ui/hud.js';

// 1. Renderer, Scene & Camera
const container = document.getElementById('game-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.2, 260);

// 2. Core World & Systems
const collision = new CollisionWorld();
const audio = new SoundEngine();
const gameState = new GameState();

const terrain = buildTerrain(scene, collision);
const worldRefs = buildTownBuildings(scene, collision);
const atmosphere = new AtmosphereSystem(scene, worldRefs);
atmosphere.timeMinutes = gameState.savedTimeMinutes;

const railway = new RailwaySystem(scene, collision, audio);
const player = new PlayerController(scene, camera, collision, audio);
player.controlsLocked = true; // Locked while title overlay is visible

const npcManager = new NPCManager(scene, collision, railway);
const ui = new UIController({ gameState, atmosphere, player, npcManager, railway, audio });
const interactions = new InteractionSystem({
  player,
  worldRefs,
  npcManager,
  gameState,
  atmosphere,
  railway,
  audio,
  ui,
});

// Interact hotkey (E or Space when no overlay is open)
window.addEventListener('keydown', (e) => {
  if (ui.isOverlayOpen()) return;
  if (e.code === 'KeyE' || e.code === 'Space') {
    e.preventDefault();
    interactions.triggerCurrent();
  }
});

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 3. Main Game Loop
const clock = new THREE.Clock();
let hudRefreshTimer = 0;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;

  // Gentle scenic title-screen camera orbit before player starts
  const onTitle = !document.getElementById('title-overlay').classList.contains('hidden');
  if (onTitle) {
    const angle = elapsed * 0.12;
    camera.position.set(Math.sin(angle) * 26, 13.5, Math.cos(angle) * 24 - 2);
    camera.lookAt(0, 2.2, -4);
  } else {
    player.update(dt, atmosphere.isRaining);
  }

  // Living world updates (always alive even on title screen!)
  const residentHomeMap = npcManager.update(
    dt,
    atmosphere.getHour(),
    atmosphere.isRaining,
    atmosphere.festivalUnlocked,
    player.position,
    ui.activeSpeakerId
  );

  atmosphere.update(dt, elapsed, player.position, residentHomeMap);
  terrain.update(elapsed, atmosphere.isRaining);
  railway.update(dt, player.position, atmosphere.nightFactor);
  audio.updateAmbient(dt, atmosphere.nightFactor, atmosphere.isRaining);

  if (!onTitle) {
    interactions.update(dt);
    gameState.updateEvents(dt, railway, atmosphere, (msg) => ui.toast(msg));
    hudRefreshTimer -= dt;
    if (hudRefreshTimer <= 0) {
      hudRefreshTimer = 0.25;
      ui.refreshHud();
    }
  }

  renderer.render(scene, camera);
}

animate();
