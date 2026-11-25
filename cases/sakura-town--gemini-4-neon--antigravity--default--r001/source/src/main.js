import './style.css';
import * as THREE from 'three';
import { TimeSystem } from './core/TimeSystem.js';
import { CollisionSystem } from './core/CollisionSystem.js';
import { InputManager } from './core/InputManager.js';
import { AudioSystem } from './core/AudioSystem.js';
import { TerrainBuilder } from './world/TerrainBuilder.js';
import { TownBuilder } from './world/TownBuilder.js';
import { ShrineBuilder } from './world/ShrineBuilder.js';
import { RailwaySystem } from './world/RailwaySystem.js';
import { AtmosphereSystem } from './world/AtmosphereSystem.js';
import { PlayerController } from './entities/PlayerController.js';
import { NPCSystem } from './entities/NPCSystem.js';
import { GameState } from './gameplay/GameState.js';
import { FishingMiniGame } from './gameplay/FishingMiniGame.js';
import { PhotoSystem } from './gameplay/PhotoSystem.js';
import { InteractionSystem } from './gameplay/InteractionSystem.js';
import { UIManager } from './ui/UIManager.js';

class SakuraTownGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.started = false;

    this._initRendererAndScene();
    this._initSystems();
    this._bindControls();
    this._bindResize();

    this.clock = new THREE.Clock();
    this._titleAngle = 0.5;
    this._animate = this._animate.bind(this);
    requestAnimationFrame(this._animate);
  }

  _initRendererAndScene() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.06;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xd4eaf8, 0.0046);

    this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.15, 420);

    this.hemiLight = new THREE.HemisphereLight(0xb5defc, 0x868c74, 0.92);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff5de, 1.55);
    this.sunLight.position.set(45, 62, 32);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.near = 5;
    this.sunLight.shadow.camera.far = 190;
    const d = 62;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0008;
    this.sunLight.shadow.normalBias = 0.12;
    this.sunLight.shadow.radius = 2.5;
    this.scene.add(this.sunLight);
  }

  _initSystems() {
    this.timeSystem = new TimeSystem();
    this.collision = new CollisionSystem();
    this.input = new InputManager(this.canvas);
    this.audio = new AudioSystem();
    this.gameState = new GameState();
    this.ui = new UIManager();

    this.atmosphere = new AtmosphereSystem(this.scene);
    this.atmosphere.build();
    this.terrain = new TerrainBuilder(this.scene, this.collision);
    this.terrain.build();
    this.town = new TownBuilder(this.scene, this.collision);
    this.town.build();
    this.shrine = new ShrineBuilder(this.scene, this.collision);
    this.shrine.build();
    this.railway = new RailwaySystem(this.scene, this.collision);
    this.railway.build();

    this.player = new PlayerController(this.scene, this.camera, this.collision, this.input);
    this.npcSystem = new NPCSystem(this.scene);
    this.npcSystem.build();

    this.fishing = new FishingMiniGame(this.scene, this.gameState, this.audio, this.ui);
    this.photoSystem = new PhotoSystem(
      this.renderer, this.scene, this.camera, this.gameState,
      this.railway, this.npcSystem, this.timeSystem, this.audio, this.ui
    );

    this.interactions = new InteractionSystem({
      gameState: this.gameState, player: this.player, npcSystem: this.npcSystem,
      terrain: this.terrain, town: this.town, shrine: this.shrine,
      railway: this.railway, fishing: this.fishing, timeSystem: this.timeSystem,
      audio: this.audio, ui: this.ui, sleepCallback: () => this._sleepToNextMorning(),
    });
    this.interactions.registerStaticPoints();
  }

  _bindControls() {
    this.ui.els.btnStart.addEventListener('click', () => {
      this.started = true;
      this.audio.init();
      this.audio.playSuccessChime();
      this.ui.hideTitleAndShowHud();
      this.ui.showToast('🌸 欢迎来到樱花小镇！四处走走，和邻里打个招呼吧');
    });

    this.ui.els.btnNotebook.addEventListener('click', () => this._toggleNotebook());
    this.ui.els.btnCamera.addEventListener('click', () => this._toggleCameraMode());
    this.ui.els.btnSpeed.addEventListener('click', () => {
      this.audio.playUiClick();
      const s = this.timeSystem.toggleSpeed();
      this.ui.els.btnSpeed.textContent = `${s}x`;
      this.ui.showToast(s > 1 ? '⏩ 时间流速已切换为 3x' : '⏱ 时间流速已恢复为 1x');
    });
    this.ui.els.btnAudio.addEventListener('click', () => {
      this.audio.init();
      this.ui.els.btnAudio.textContent = this.audio.toggle() ? '🔊' : '🔇';
    });

    this.ui.els.btnStandUp.addEventListener('click', () => {
      this.player.standUp();
      this.ui.showSitBar(false);
    });
    this.ui.els.btnCancelFish.addEventListener('click', () => this._exitFishing());
    this.ui.els.btnSnap.addEventListener('click', () => this.photoSystem.capturePhoto());
    this.ui.els.btnExitCam.addEventListener('click', () => this._toggleCameraMode(false));

    this.input.onKeyPress('KeyE', () => this._handlePrimaryAction());
    this.input.onKeyPress('Space', () => this._handlePrimaryAction());
    this.input.onKeyPress('KeyC', () => {
      if (!this.started || this.ui.dialogueOpen || this.ui.notebookOpen || this.fishing.active) return;
      this._toggleCameraMode();
    });
    this.input.onKeyPress('Tab', () => {
      if (!this.started || this.ui.dialogueOpen || this.fishing.active) return;
      if (this.player.mode === 'CAMERA') this._toggleCameraMode(false);
      this._toggleNotebook();
    });
    this.input.onKeyPress('Escape', () => {
      if (this.ui.notebookOpen) this.ui.toggleNotebook(false);
      else if (this.ui.dialogueOpen) this.interactions.closeDialogue();
      else if (this.fishing.active) this._exitFishing();
      else if (this.player.mode === 'CAMERA') this._toggleCameraMode(false);
      else if (this.player.mode === 'SIT') {
        this.player.standUp();
        this.ui.showSitBar(false);
      }
    });
  }

  _handlePrimaryAction() {
    if (!this.started || this.ui.notebookOpen) return;
    if (this.player.mode === 'CAMERA') { this.photoSystem.capturePhoto(); return; }
    if (this.fishing.active) { this.fishing.triggerPull(); return; }
    if (this.ui.dialogueOpen) return;
    if (this.player.mode === 'SIT') { this.player.standUp(); this.ui.showSitBar(false); return; }
    this.interactions.triggerNearest();
  }

  _toggleNotebook() {
    this.audio.playUiClick();
    this.ui.toggleNotebook(undefined, {
      gameState: this.gameState, npcSystem: this.npcSystem, player: this.player, audio: this.audio,
    });
  }

  _toggleCameraMode(forceState) {
    const turnOn = typeof forceState === 'boolean' ? forceState : this.player.mode !== 'CAMERA';
    this.audio.playUiClick();
    if (turnOn) {
      if (this.player.enterCameraMode()) this.ui.showCameraUI(true);
    } else {
      this.player.exitCameraMode();
      this.ui.showCameraUI(false);
    }
  }

  _exitFishing() {
    this.fishing.stop();
    this.player.exitFishing();
  }

  async _sleepToNextMorning() {
    await this.ui.playSleepFade(`晚安，樱花小镇 · 即将迎来第 ${this.timeSystem.day + 1} 天`, () => {
      this.timeSystem.advanceToNextMorning();
      this.player.teleportToHomeWakeup();
    });
    this.ui.showToast(`🌅 早安！今天是第 ${this.timeSystem.day} 天，阳光真好`);
  }

  _bindResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  _updateLighting() {
    const ts = this.timeSystem;
    this.hemiLight.color.copy(ts.colors.hemiSky);
    this.hemiLight.groundColor.copy(ts.colors.hemiGround);
    this.hemiLight.intensity = ts.hemiIntensity;
    this.sunLight.color.copy(ts.colors.sunColor);
    this.sunLight.intensity = ts.sunIntensity;
    this.sunLight.position.copy(ts.sunDirection).multiplyScalar(78);
    this.scene.fog.color.copy(ts.colors.fogColor);
  }

  _animate() {
    requestAnimationFrame(this._animate);
    const dt = Math.min(this.clock.getDelta(), 0.05);

    this.timeSystem.update(this.started ? dt : dt * 0.25);
    this._updateLighting();

    this.atmosphere.update(dt, this.timeSystem);
    this.terrain.update(dt);

    const playerPos = this.player.position;
    const currentBuilding = this.town.update(dt, playerPos, this.timeSystem.nightFactor, this.started ? this.audio : null);
    this.shrine.update(dt, this.timeSystem.nightFactor);
    this.railway.update(dt, playerPos, this.timeSystem.nightFactor, this.started ? this.audio : null);

    const railStatus = this.railway.getStatus();
    this.npcSystem.update(dt, this.timeSystem.hour, railStatus, playerPos);

    if (!this.started) {
      this._titleAngle += dt * 0.085;
      this.camera.position.set(Math.cos(this._titleAngle) * 34 + 6, 15.5, Math.sin(this._titleAngle) * 28 + 4);
      this.camera.lookAt(5, 2.2, -3);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    const isUiBlocked = this.ui.dialogueOpen || this.ui.notebookOpen;
    this.player.update(dt, currentBuilding, isUiBlocked, this.audio);
    if (this.player.mode !== 'SIT') this.ui.showSitBar(false);
    this.fishing.update(dt);

    if (!isUiBlocked && this.player.mode === 'WALK') {
      const near = this.interactions.findNearest(playerPos);
      this.ui.setPrompt(Boolean(near), near ? near.label : '');
    } else {
      this.ui.setPrompt(false);
    }

    if (this.player.mode === 'CAMERA') {
      const analysis = this.photoSystem.analyzeFrame();
      this.ui.updateCameraViewfinder(analysis.labels, this.timeSystem.getFormattedTime());
    }

    this.audio.update(dt, this.timeSystem.nightFactor, Math.abs(playerPos.x - 29) < 15);
    this.ui.updateHud(this.timeSystem, this.gameState, playerPos, this.player.yaw, currentBuilding, railStatus, this.npcSystem.npcs);
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.__sakuraGame = new SakuraTownGame();
});
