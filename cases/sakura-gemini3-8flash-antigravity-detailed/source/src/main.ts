// src/main.ts
// Main application entry point for Sakura Town (桜花小鎮).
import * as THREE from 'three';
import { LightingSky } from './world/LightingSky';
import { WeatherSystem } from './world/Weather';
import { TerrainAndRoads } from './world/TerrainAndRoads';
import { FoliageAndProps } from './world/FoliageAndProps';
import { SakuraStation } from './buildings/SakuraStation';
import { RailwayCrossing } from './buildings/RailwayCrossing';
import { SakuraMart } from './buildings/SakuraMart';
import { CafeKomorebi } from './buildings/CafeKomorebi';
import { PlayerHouse } from './buildings/PlayerHouse';
import { SakuraShrine } from './buildings/SakuraShrine';
import { TownSchool } from './buildings/TownSchool';
import { TrainSystem } from './vehicles/Train';
import { Bicycle } from './vehicles/Bicycle';
import { NPCManager } from './characters/NPCSystem';
import { PlayerController } from './gameplay/PlayerController';
import { InteractionManager } from './gameplay/InteractionManager';
import { InventorySystem } from './gameplay/InventorySystem';
import { QuestManager } from './gameplay/QuestManager';
import { PhotographySystem } from './gameplay/PhotographySystem';
import { SaveManager } from './gameplay/SaveManager';
import { UIManager } from './ui/UIManager';
import { audio } from './engine/AudioSynthesizer';
import { WeatherType } from './types';

class SakuraTownApp {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // World & Systems
  private lighting: LightingSky;
  private weather: WeatherSystem;
  private terrain: TerrainAndRoads;
  private props: FoliageAndProps;
  private station: SakuraStation;
  private crossing: RailwayCrossing;
  private mart: SakuraMart;
  private cafe: CafeKomorebi;
  private house: PlayerHouse;
  private shrine: SakuraShrine;
  private school: TownSchool;
  private train: TrainSystem;
  private bicycle: Bicycle;
  private npcs: NPCManager;

  // Gameplay
  private player: PlayerController;
  private interaction: InteractionManager;
  private inventory: InventorySystem;
  private quests: QuestManager;
  private photography: PhotographySystem;
  private ui: UIManager;

  private clock: THREE.Clock;
  private saveTimer: number = 0;

  constructor() {
    this.clock = new THREE.Clock();

    // 1. WebGL Renderer
    const container = document.getElementById('canvas-container')!;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(this.renderer.domElement);

    // 2. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.2, 500);

    // 3. Environment & Lighting
    this.lighting = new LightingSky(this.scene);
    this.weather = new WeatherSystem(this.scene);

    // 4. Infrastructure & Handcrafted Architecture
    this.terrain = new TerrainAndRoads(this.scene);
    this.props = new FoliageAndProps(this.scene, this.lighting);
    this.station = new SakuraStation(this.scene);
    this.crossing = new RailwayCrossing(this.scene);
    this.mart = new SakuraMart(this.scene, this.lighting);
    this.cafe = new CafeKomorebi(this.scene, this.lighting);
    this.house = new PlayerHouse(this.scene, this.lighting);
    this.shrine = new SakuraShrine(this.scene, this.lighting);
    this.school = new TownSchool(this.scene, this.lighting);

    // 5. Dynamic Vehicles
    this.train = new TrainSystem(this.scene);
    this.bicycle = new Bicycle(this.scene, new THREE.Vector3(-14, 0, 14));

    // 6. Characters
    this.npcs = new NPCManager(this.scene);
    this.player = new PlayerController(this.scene, this.camera);

    // 7. Gameplay Managers
    this.inventory = new InventorySystem();
    this.quests = new QuestManager(this.inventory);
    this.photography = new PhotographySystem();
    this.interaction = new InteractionManager();

    // 8. User Interface Overlay
    this.ui = new UIManager(
      this.inventory,
      this.quests,
      this.photography,
      (newWeather: WeatherType) => this.weather.setWeather(newWeather)
    );

    this.setupEventListeners();
    this.setupStartButton();

    // Attempt restoring saved state
    this.loadState();

    // Start 60fps render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  private setupStartButton(): void {
    const startBtn = document.getElementById('start-btn');
    const loadingScreen = document.getElementById('loading-screen');
    if (startBtn && loadingScreen) {
      startBtn.addEventListener('click', () => {
        audio.init();
        audio.playUIConfirm();
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => loadingScreen.remove(), 800);
      });
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('take_photo_requested', () => {
      const timeInfo = this.lighting.getTime();
      const mikanNPC = this.npcs.npcs.get('mikan');
      const catPos = mikanNPC ? mikanNPC.currentPos : new THREE.Vector3();

      const photo = this.photography.takePhoto(
        this.renderer,
        timeInfo.timeString,
        this.player.position,
        this.train.trainWorldPos,
        catPos
      );

      this.ui.showToast(`📸 Photo Captured at ${photo.locationName}!`);

      // Check Sunset Train photo quest
      const q = this.quests.getActiveQuest();
      if (q && q.id === 'quest_sunset_train') {
        const hour = timeInfo.hour;
        if (hour >= 17 && hour <= 19 && photo.hasTrain) {
          this.quests.advanceQuest('quest_sunset_train');
          this.ui.updateQuestDisplay();
        }
      }
    });
  }

  private loadState(): void {
    const save = SaveManager.loadGame();
    if (save) {
      this.player.position.set(save.playerPos.x, save.playerPos.y, save.playerPos.z);
      this.player.rotationY = save.playerYaw;
      this.inventory.money = save.playerMoney;
      this.lighting.setTime(Math.floor(save.gameTimeMinutes / 60), save.gameTimeMinutes % 60);
      this.weather.setWeather(save.weather);
      this.ui.showToast('🌸 Welcome back to Sakura Town! Saved progress restored.');
    }
  }

  private animate(): void {
    requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.08); // Clamp delta to avoid huge physics spikes

    // 1. Advance in-game time (1 real second = 1 in-game minute)
    this.lighting.advanceTime(delta * 1.0);
    this.lighting.update(delta);

    const timeInfo = this.lighting.getTime();
    const currentHour = timeInfo.hour + timeInfo.minute / 60.0;

    // 2. Weather & Petal particle drift
    this.weather.update(delta, this.player.position);

    // 3. Train & Railway Crossing updates
    this.train.update(delta, this.crossing, this.player.position);
    this.crossing.update(delta, this.player.position);

    // 4. Enterable Buildings dynamic updates (automatic doors, fans, lighting)
    this.mart.update(delta, this.player.position);
    this.cafe.update(delta);
    this.house.update(delta);

    // 5. NPC Living Simulation (schedules, movement, animations)
    this.npcs.update(delta, currentHour, this.weather.currentWeather, this.player.position);

    // 6. Player Controller & Camera
    this.player.update(delta, this.train, this.weather.isRaining());

    // 7. Context Interactions scanner
    this.interaction.update(
      this.player,
      this.npcs,
      this.props,
      this.mart,
      this.cafe,
      this.house,
      this.shrine,
      this.school,
      this.train,
      this.bicycle,
      {
        onOpenDialogue: (npc) => this.ui.openDialogue(npc),
        onOpenShop: () => this.ui.openShop(),
        onOpenOmikuji: (fortune) => this.ui.openOmikuji(fortune),
        onShowToast: (msg) => this.ui.showToast(msg),
        onSleep: () => {
          this.lighting.setTime(7, 0); // Fast forward to 07:00 AM next morning
          audio.playBirdSong();
          this.ui.showToast('You slept peacefully. Good morning! 07:00 AM (Next Day).');
        }
      }
    );

    // 8. Update UI Prompts & Minimap
    this.ui.setInteractionPrompt(this.interaction.currentPrompt);
    this.ui.updateTimeAndWeather(timeInfo.timeString, this.weather.currentWeather);

    const npcArray = Array.from(this.npcs.npcs.values());
    this.ui.renderMinimap(
      { x: this.player.position.x, z: this.player.position.z },
      this.player.rotationY,
      { x: this.train.trainWorldPos.x, z: this.train.trainWorldPos.z },
      npcArray
    );

    // 9. Auto-save every 45 seconds
    this.saveTimer += delta;
    if (this.saveTimer >= 45.0) {
      this.saveTimer = 0;
      SaveManager.saveGame(
        this.player,
        this.inventory,
        this.quests,
        this.npcs,
        this.lighting,
        this.weather
      );
    }

    // 10. Render 3D Scene
    this.renderer.render(this.scene, this.camera);
  }
}

// Bootstrap game when window loads
window.addEventListener('DOMContentLoaded', () => {
  new SakuraTownApp();
});
