// src/main.ts
// Main application entry point for Sakura Town (桜花小町) - 3D Japanese Anime Living Simulation.
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

  // World Systems
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
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // 2. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.2, 500);

    // 3. Environment & Lighting
    this.lighting = new LightingSky(this.scene);
    this.weather = new WeatherSystem(this.scene);

    // 4. Infrastructure & Architecture
    this.terrain = new TerrainAndRoads(this.scene);
    this.props = new FoliageAndProps(this.scene, this.lighting);
    this.station = new SakuraStation(this.scene);
    this.crossing = new RailwayCrossing(this.scene);
    this.mart = new SakuraMart(this.scene, this.lighting);
    this.cafe = new CafeKomorebi(this.scene, this.lighting);
    this.house = new PlayerHouse(this.scene, this.lighting);
    this.shrine = new SakuraShrine(this.scene, this.lighting);
    this.school = new TownSchool(this.scene, this.lighting);

    // 5. Vehicles
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

    // 8. User Interface
    this.ui = new UIManager(
      this.inventory,
      this.quests,
      this.photography,
      (newWeather: WeatherType) => this.weather.setWeather(newWeather)
    );

    this.setupEventListeners();
    this.setupStartButton();
    this.registerInteractiveWorld();

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
      const location = this.detectCurrentLandmark(this.player.position, catPos);

      const dataUrl = this.renderer.domElement.toDataURL('image/jpeg', 0.88);
      this.photography.takePhoto(dataUrl, location);

      // Quest 4 progression check
      this.checkPhotographyQuest(location);
    });

    window.addEventListener('timeskip_requested', ((e: CustomEvent) => {
      const hours = e.detail || 2;
      const current = this.lighting.getTime().hour;
      this.lighting.setTime(current + hours);
      audio.playUIConfirm();
    }) as EventListener);

    // [F] Key for bicycle mount/dismount
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyF') {
        const dist = this.player.position.distanceTo(this.bicycle.position);
        if (this.player.ridingBicycle) {
          this.player.mountBicycle(this.bicycle);
          this.ui.showNotification('Dismounted Mamachari Bicycle (自転車を降りました)');
        } else if (dist < 3.2) {
          this.player.mountBicycle(this.bicycle);
          this.ui.showNotification('Mounted Mamachari Bicycle! (ママチャリに乗りました) [Shift] Speed [Space] Bell');
        }
      }
    });
  }

  private detectCurrentLandmark(playerPos: THREE.Vector3, catPos: THREE.Vector3): string {
    if (playerPos.distanceTo(catPos) < 4.0) return 'Mikan the Calico Cat (三毛猫のミカン)';
    if (playerPos.distanceTo(new THREE.Vector3(-40, 5, -49)) < 12) return 'Sakura Shrine Torii (桜神社 鳥居)';
    if (playerPos.distanceTo(new THREE.Vector3(22, 0, 24)) < 10) return 'Railway Crossing (踏切)';
    if (playerPos.distanceTo(new THREE.Vector3(60, 1.2, -35)) < 14) return 'River Truss Bridge (鉄道鉄橋)';
    if (playerPos.distanceTo(new THREE.Vector3(35, 0, 5)) < 12) return 'Sakura Mart 24H (さくらマート)';
    if (playerPos.distanceTo(new THREE.Vector3(18, 0, -20)) < 12) return 'Cafe Komorebi (珈琲 木漏れ日)';
    if (playerPos.distanceTo(new THREE.Vector3(-10, 0, 20)) < 14) return 'Sakura Station (さくら町駅)';
    if (playerPos.distanceTo(new THREE.Vector3(-45, 0, -5)) < 12) return 'Player Residence (自宅)';
    return 'Sakura Town Avenue (さくら町通り)';
  }

  private checkPhotographyQuest(location: string): void {
    const q = this.quests.quests.get('town_photography');
    if (q && !q.completed) {
      this.quests.advanceQuest('town_photography');
    }
  }

  private registerInteractiveWorld(): void {
    // 1. Convenience Store Cashier (Sakura Mart)
    this.interaction.register({
      id: 'mart_cashier',
      prompt: 'Buy Fresh Sakura Mochi & Bento (さくらマート買い物)',
      distance: 2.8,
      position: { x: 38.8, y: 0.5, z: 8.2 },
      onInteract: () => {
        audio.playVendingMachine();
        this.inventory.addItem({
          id: 'sakura_mochi',
          name: 'Fresh Sakura Mochi',
          jpName: '特製 桜餅',
          description: 'A traditional spring delicacy wrapped in cherry leaf.',
          category: 'food',
          icon: '🌸',
          count: 1,
          isUsable: true
        });
        this.ui.showNotification('Purchased Sakura Mochi (桜餅) at Sakura Mart! Check [I] bag.');
      }
    });

    // 2. Vending Machines on Avenue
    this.interaction.register({
      id: 'vending_machine',
      prompt: 'Buy Cold BOSS Coffee & Melon Soda (自販機ドリンク購入)',
      distance: 2.6,
      position: { x: 31.4, y: 0.5, z: 14.5 },
      onInteract: () => {
        audio.playVendingMachine();
        this.inventory.addItem({
          id: 'boss_coffee',
          name: 'BOSS Rainbow Canned Coffee',
          jpName: 'BOSS 缶コーヒー',
          description: 'Aromatic hot roast blend for an energetic day in Sakura Town.',
          category: 'drink',
          icon: '☕',
          count: 1,
          isUsable: true
        });
        this.ui.showNotification('Clunk! Received hot BOSS Canned Coffee from machine!');
      }
    });

    // 3. Cafe Komorebi Barista Counter
    this.interaction.register({
      id: 'cafe_barista',
      prompt: 'Order Fresh Pour-Over Coffee (木漏れ日 特製珈琲を注文)',
      distance: 2.6,
      position: { x: 15.8, y: 0.5, z: -19.5 },
      onInteract: () => {
        audio.playUIConfirm();
        this.inventory.addItem({
          id: 'pour_over',
          name: 'Special Pour-Over Drip Coffee',
          jpName: '木漏れ日ブレンド',
          description: 'Rich hand-drip Ethiopian blend brewed by Kenji.',
          category: 'drink',
          icon: '☕',
          count: 1,
          isUsable: true
        });

        // Quest 2 check
        const q2 = this.quests.quests.get('coffee_delivery');
        if (q2 && q2.stage === 0) {
          this.quests.advanceQuest('coffee_delivery');
        }

        this.ui.openDialogue({
          name: 'Kenji (健二)',
          role: 'Cafe Komorebi Owner & Master Barista',
          avatarIcon: '☕',
          text: 'Here is your fresh hand-drip pour-over! The beans were roasted just yesterday. Enjoy the aroma while watching the river.'
        });
      }
    });

    // 4. Shrine Suzu Bell & Saisen Box
    this.interaction.register({
      id: 'shrine_saisen',
      prompt: 'Ring Shrine Bell & Toss 5-Yen Coin (鈴を鳴らし、二礼二拍手一礼)',
      distance: 2.8,
      position: { x: -40, y: 5.0, z: -62.8 },
      onInteract: () => {
        audio.playShrineBellAndCoin();
        this.ui.showNotification('RANG SUZU BELL & PRAYED (二礼二拍手一礼: May peace and spring blossom over Sakura Town!)');
      }
    });

    // 5. Player House Futon Bed (Time Skip / Sleep)
    this.interaction.register({
      id: 'house_bed',
      prompt: 'Rest & Sleep until Morning 06:00 (布団で寝る・朝まで休む)',
      distance: 2.5,
      position: { x: -48.2, y: 3.2, z: -7.5 },
      onInteract: () => {
        audio.playUIConfirm();
        this.lighting.setTime(6.0);
        this.ui.showNotification('Good morning! The sun rises over the cherry blossom groves (朝6:00になりました)');
      }
    });

    // 6. Commuter Train Boarding (Sakura Station Platform)
    this.interaction.register({
      id: 'train_boarding',
      prompt: 'Board 2-Car Commuter Train (列車に乗る・車窓を楽しむ)',
      distance: 3.5,
      position: { x: -10, y: 0.75, z: 25.0 },
      onInteract: () => {
        const riding = this.train.togglePlayerRiding();
        this.player.ridingTrain = riding ? this.train : null;
        if (riding) {
          this.ui.showNotification('Boarded Commuter Train! Relax and enjoy the scenic loop view!');
        } else {
          this.player.position.set(-10, 0.75, 23.5);
          this.ui.showNotification('Stepped off onto Sakura Station Platform.');
        }
      }
    });

    // 7. Quest 1 Lost Item: Mikan's Brass Bell on River Embankment
    this.interaction.register({
      id: 'lost_bell_item',
      prompt: 'Pick up Sparkling Brass Bell (川辺の真鍮鈴を拾う)',
      distance: 2.4,
      position: { x: -35, y: 0.2, z: -32 },
      onInteract: () => {
        audio.playUIConfirm();
        this.inventory.addItem({
          id: 'cat_bell',
          name: "Mikan's Lost Brass Bell",
          jpName: 'ミカンの真鍮鈴',
          description: 'A tiny engraved golden bell that fell off Mikan’s collar.',
          category: 'quest',
          icon: '🔔',
          count: 1,
          isUsable: false
        });

        const q1 = this.quests.quests.get('mikan_bell');
        if (q1 && q1.stage === 0) {
          this.quests.advanceQuest('mikan_bell');
        }
        this.ui.showNotification("Found Mikan's Lost Brass Bell (真鍮の鈴)! Bring it to Sato-san at the Shrine.");
      }
    });

    // 8. NPC Dialogues (Hina, Sato-san, Aoi, Ren, Takahashi-san, Kenji, Mikan)
    this.npcs.npcs.forEach((npc) => {
      this.interaction.register({
        id: 'npc_' + npc.personality.id,
        prompt: `Talk with ${npc.personality.jpName} (${npc.personality.name}) [E]`,
        distance: 2.6,
        position: npc.currentPos,
        onInteract: () => {
          this.handleNPCTalk(npc);
        }
      });
    });
  }

  private handleNPCTalk(npc: ReturnType<typeof this.npcs.npcs.get>): void {
    if (!npc) return;
    audio.playUIConfirm();

    // Special Cat interaction
    if (npc.isCat) {
      audio.playCatMeow();
      this.ui.openDialogue({
        name: `${npc.personality.jpName} (${npc.personality.name})`,
        role: npc.personality.jpRole,
        avatarIcon: '🐱',
        text: 'Nyaaa~~ (Mikan purrs gently and rubs against your knees. Her calico coat is warm from the spring sun!)'
      });
      return;
    }

    // Special Quest 1 Hand-in: Sato-san
    if (npc.personality.id === 'sato') {
      const q1 = this.quests.quests.get('mikan_bell');
      if (q1 && q1.stage === 1 && this.inventory.hasItem('cat_bell')) {
        this.inventory.removeItem('cat_bell', 1);
        this.quests.advanceQuest('mikan_bell');
        this.inventory.addItem({
          id: 'omamori',
          name: 'Sakura Shrine Omamori',
          jpName: '桜神社の御守り',
          description: 'A sacred brocade charm that grants blessings and peace.',
          category: 'charm',
          icon: '⛩️',
          count: 1,
          isUsable: false
        });
        this.ui.openDialogue({
          name: 'Sato-san (佐藤さん)',
          role: 'Town Elder & Shrine Caretaker',
          avatarIcon: '⛩️',
          text: 'Oh! You found Mikan’s collar bell by the river bridge! Thank you so much, kind traveler. Please take this sacred Sakura Omamori (御守り) as our town’s blessing!'
        });
        return;
      }
    }

    // Special Quest 2 Hand-in: Station Master Takahashi
    if (npc.personality.id === 'takahashi') {
      const q2 = this.quests.quests.get('coffee_delivery');
      if (q2 && q2.stage === 1 && this.inventory.hasItem('pour_over')) {
        this.inventory.removeItem('pour_over', 1);
        this.quests.advanceQuest('coffee_delivery');
        this.inventory.addItem({
          id: 'sakura_mochi',
          name: 'Fresh Sakura Mochi',
          jpName: '桜餅',
          description: 'Delicious snack given by Station Master.',
          category: 'food',
          icon: '🌸',
          count: 3,
          isUsable: true
        });
        this.ui.openDialogue({
          name: 'Takahashi-san (高橋駅長)',
          role: 'Sakura Station Master',
          avatarIcon: '🚉',
          text: 'Ah! Kenji’s pour-over coffee! Nothing beats a hot cup of Komorebi roast during platform duty. Here, take these fresh Sakura Mochi as my thanks!'
        });
        return;
      }
    }

    // Default character dialogue
    const lines = npc.personality.defaultDialogue;
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    this.ui.openDialogue({
      name: `${npc.personality.jpName} (${npc.personality.name})`,
      role: npc.personality.jpRole,
      avatarIcon: npc.personality.id === 'hina' ? '🌸' : npc.personality.id === 'kenji' ? '☕' : '👤',
      text: randomLine
    });
  }

  private animate(): void {
    requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Celestial & Weather Systems
    this.lighting.update(delta);
    const timeState = this.lighting.getTime();
    this.weather.update(delta, this.player.position);
    this.terrain.update(elapsedTime);

    // 2. Vehicles
    this.train.update(delta, this.crossing);
    this.crossing.update(delta);

    // 3. Characters & Living Simulation
    this.npcs.update(timeState.hour, this.weather.currentWeather, delta, this.player.position);
    this.player.update(delta);

    // 4. Proximity Interactions
    this.interaction.update(this.player.position);

    // 5. UI Updates
    this.ui.updateTimeAndWeather(timeState, this.weather.currentWeather);

    // 6. Auto-save every 45 seconds
    this.saveTimer += delta;
    if (this.saveTimer > 45) {
      this.saveTimer = 0;
      SaveManager.save({
        playerPos: { x: this.player.position.x, y: this.player.position.y, z: this.player.position.z },
        hour: timeState.hour,
        weather: this.weather.currentWeather,
        inventory: Array.from(this.inventory.items.values()).map(i => ({ id: i.id, count: i.count })),
        quests: Array.from(this.quests.quests.values()).map(q => ({
          id: q.id,
          stage: q.stage,
          completed: q.completed,
          active: q.active
        }))
      });
    }

    // 7. Render
    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate and start Sakura Town when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new SakuraTownApp();
});
