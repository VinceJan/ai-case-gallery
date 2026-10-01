import * as THREE from 'three';
import { InputController } from '../core/InputController';
import { Loop } from '../core/Loop';
import { createRenderer, resizeRenderer } from '../core/Renderer';
import { Player } from '../entities/Player';
import { Train } from '../entities/Train';
import { AudioSystem } from '../systems/AudioSystem';
import { CameraRig } from '../systems/CameraRig';
import { DialogueSystem } from '../systems/DialogueSystem';
import { EconomySystem } from '../systems/EconomySystem';
import { EventSystem } from '../systems/EventSystem';
import { Hud } from '../systems/Hud';
import { InteriorSystem } from '../systems/InteriorSystem';
import { NpcSystem } from '../systems/NpcSystem';
import { TimeSystem } from '../systems/TimeSystem';
import { WeatherSystem } from '../systems/WeatherSystem';
import { Panels } from '../ui/Panels';
import { TitleScreen } from '../ui/TitleScreen';
import { TownState } from '../game/TownState';
import { Rng } from '../utils/random';
import { disposeObject3D } from '../utils/dispose';
import { createToonGradient } from '../utils/textures';
import { createTownWorld } from '../world/TownGenerator';
import type { BoxCollider } from '../world/buildings';
import { RAILWAY_Z, SHOPS, SPOT_MAP as SPOT_LOOKUP } from '../world/layout';
import type { GameDiagnostics, UiMode } from '../game/hooks';

const SHOP_HOURS: Record<string, [number, number]> = {
  s_bakery: [7, 19],
  s_store: [7, 19],
  s_cafe: [8, 21],
  s_flower: [8, 19],
};

const PLAYER_HOME_BED = new THREE.Vector3(-2.4, 0, 1.6);
const PLAYER_SPAWN = { x: -18, z: 16.8 };
const INTERACT_RADIUS_PROP = 2.3;

type InteractAction =
  | { type: 'npc'; npcId: string }
  | { type: 'event'; kind: 'kitten' | 'wallet' }
  | { type: 'enter'; buildingId: string; shopId?: string }
  | { type: 'exit' }
  | { type: 'sleep' };

export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly input: InputController;

  private readonly rng = new Rng(1);
  private readonly world = createTownWorld(this.rng, createToonGradient());
  private readonly player = new Player();
  private readonly train = new Train();
  private readonly audio = new AudioSystem();
  private readonly state = new TownState();
  private readonly economy = new EconomySystem();
  private readonly interiors: InteriorSystem;
  private readonly npcSystem = new NpcSystem();
  private readonly time: TimeSystem;
  private readonly weather: WeatherSystem;
  private readonly dialogue: DialogueSystem;
  private readonly events: EventSystem;
  private readonly panels: Panels;
  private readonly title: TitleScreen;
  private readonly hud: Hud;
  private readonly cameraRig: CameraRig;

  private uiMode: UiMode = 'title';
  private frame = 0;
  private elapsed = 0;
  private pausedForScreenshot = false;
  private reducedMotion = false;
  private fadeElement: HTMLDivElement | null = null;
  private readonly indoorCameraDesired = new THREE.Vector3();

  private lastTrainMinute = -1;
  private lastAutosaveHour = -1;
  private starterQuestGiven = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas);
    this.renderer.toneMappingExposure = 0.95;
    this.camera = new THREE.PerspectiveCamera(48, 1, 0.1, 320);

    const stick = this.must('#touch-stick');
    const knob = this.must('#touch-knob');
    const actionButton = this.must('#action-button');
    this.input = new InputController(stick, knob, actionButton);

    this.scene.fog = new THREE.Fog('#cfe4ee', 55, 240);
    this.scene.add(this.world.group);
    this.scene.add(this.player.group);
    this.scene.add(this.train.group);
    for (const npc of this.npcSystem.npcs) this.scene.add(npc.group);

    this.interiors = new InteriorSystem(this.world.buildingMap, this.world.colliders, this.world.treeColliders);
    this.player.setField(this.interiors.field());

    this.time = new TimeSystem(this.scene, this.scene.fog as THREE.Fog, this.world.nightMaterials, this.world.lampGlowSprites);
    this.weather = new WeatherSystem(this.rng);
    this.scene.add(this.weather.group);
    this.weather.onWeatherChanged = () => {
      this.time.applyWeatherDim(this.weather.isRaining ? 0.5 : this.weather.weather === 'cloudy' ? 0.78 : 1);
    };
    this.time.applyWeatherDim(1);

    this.events = new EventSystem(this.scene, this.audio);
    this.events.onToast = (message) => this.hud?.toast(message);

    this.dialogue = new DialogueSystem(this.state, this.audio);
    this.dialogue.onStateChanged = () => {
      if (this.uiMode === 'dialogue' && !this.dialogue.isOpen) {
        this.uiMode = 'play';
      }
      this.panels.refresh();
    };

    this.panels = new Panels(this.state, this.economy, this.audio);
    this.title = new TitleScreen();
    this.hud = new Hud(this.state, this.time, this.weather);

    this.npcSystem.setBuildings(this.world.buildingMap);
    this.cameraRig = new CameraRig(this.camera);

    this.time.onNewDay = () => this.onNewDay();
    this.title.onContinue = () => this.continueGame();
    this.title.onNewGame = () => this.newGame();

    this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
    resizeRenderer(this.renderer, this.camera, 2);
    this.installTestHooks();
    this.publishDiagnostics();
    this.title.show(TownState.hasSave());
  }

  start(): void {
    this.loop.start();
  }

  private readonly loop = new Loop(
    (delta, elapsed) => this.update(delta, elapsed),
    () => this.render(),
  );

  dispose(): void {
    this.loop.stop();
    this.input.dispose();
    this.audio.dispose();
    this.weather.dispose();
    this.events.dispose();
    this.npcSystem.dispose();
    this.player.dispose();
    this.train.dispose();
    this.time.dispose();
    this.hud.dispose();
    disposeObject3D(this.scene);
    this.renderer.dispose();
    window.__THREE_GAME_DIAGNOSTICS__ = undefined;
    window.__THREE_GAME_TEST_HOOKS__ = undefined;
  }

  // ---------------------------------------------------------------- 主循环

  private update(delta: number, elapsed: number): void {
    this.frame += 1;
    if (this.pausedForScreenshot) {
      this.publishDiagnostics();
      return;
    }

    const simulating = this.uiMode === 'play';
    if (simulating) this.elapsed += delta;

    if (simulating) {
      this.time.update(delta, this.player.group.position);
      this.dialogue.setDay(this.time.day);
      this.dialogue.setHour(this.time.hour);
      this.npcSystem.setCurrentHour(this.time.hour);
      this.npcSystem.setPlayerPosition(this.player.group.position);
      this.npcSystem.setCurrentIndoor(this.interiors.indoorBuildingId);
      this.npcSystem.update(delta, {
        time: this.time,
        weather: this.weather,
        state: this.state,
        rng: this.rng,
        graph: this.world.graph,
        interiors: this.interiors,
        festival: this.events.festivalActive,
      });
      this.weather.tickGameMinutes(delta * this.time.minutesPerSecond, this.rng);
      this.weather.update(this.reducedMotion ? 0 : delta, this.player.group.position, this.weather.isRaining);
      this.events.update(this.reducedMotion ? 0 : delta, this.time.day, this.time.minutes, this.weather.isRaining, this.rng);
      this.updateTrain(delta);
      this.updateGates(delta);
      this.updatePlayer(delta, elapsed);
      // 先解析交互再处理按键，避免本帧到达门口时 E 被过期状态吃掉
      this.updateInteraction();
    }

    this.handleGlobalKeys();

    if (simulating) this.maybeAutosave();

    // 相机与 HUD 始终更新
    const cameraInput = { yaw: 0, zoom: 0 };
    this.input.consumeCamera(cameraInput);
    if (!this.interiors.isIndoor) {
      if (cameraInput.yaw !== 0) this.cameraRig.rotate(cameraInput.yaw);
      if (cameraInput.zoom !== 0) this.cameraRig.zoom(cameraInput.zoom);
      this.cameraRig.update(delta, this.player.group.position, 0.14, this.cameraColliders());
    } else {
      // 室内：房间概览相机（固定偏移 + 平滑跟随）
      const indoorId = this.interiors.indoorBuildingId;
      const origin = indoorId ? this.world.buildingMap[indoorId]?.interior?.position : undefined;
      if (origin) {
        const desired = this.indoorCameraDesired.set(origin.x + 0.8, origin.y + 2.9, origin.z + 2.4);
        this.camera.position.lerp(desired, Math.min(1, delta * 4.5));
        this.camera.lookAt(
          this.player.group.position.x,
          this.player.group.position.y + 1.2,
          this.player.group.position.z,
        );
      }
    }

    this.audio.setRaining(this.weather.isRaining);
    this.audio.setNight(this.time.isNight);
    this.audio.updateAmbience(delta, this.time.isNight);

    this.hud.update({
      playerPosition: this.player.group.position,
      playerRotation: this.player.group.rotation.y,
      npcPositions: this.npcSystem.outdoorPositions(),
      questTargets: this.questTargets(),
    });

    this.publishDiagnostics();
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  // ---------------------------------------------------------------- 输入

  private handleGlobalKeys(): void {
    if (this.title.visible) return;

    if (this.uiMode === 'dialogue') {
      for (const code of ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Escape', 'KeyE']) {
        if (this.input.consumeKey(code)) {
          this.dialogue.handleKey(code === 'KeyE' ? 'Escape' : code);
          break;
        }
      }
      return;
    }

    if (this.uiMode !== 'play') {
      if (this.input.consumeKey('Escape') || this.input.consumeKey('KeyI') || this.input.consumeKey('KeyJ')) {
        this.panels.closeAll();
        this.uiMode = 'play';
        this.audio.uiClick();
      }
      return;
    }

    if (this.input.consumeKey('KeyI')) {
      this.uiMode = 'inventory';
      this.panels.openInventory();
    } else if (this.input.consumeKey('KeyJ')) {
      this.uiMode = 'quests';
      this.panels.openQuests();
    } else if (this.input.consumeKey('Escape')) {
      this.uiMode = 'menu';
      this.panels.openMenu({
        onResume: () => {
          this.panels.closeAll();
          this.uiMode = 'play';
        },
        onSave: () => this.saveGame(true),
        onLoad: () => this.loadGame(),
        onNewGame: () => {
          this.panels.closeAll();
          this.newGame();
        },
      });
    } else if (this.input.consumeKey('KeyH')) {
      const hint = this.must('#controls-hint');
      hint.classList.toggle('hidden');
    } else if (this.input.consumeAction()) {
      this.doInteract();
    }
  }

  // ---------------------------------------------------------------- 交互

  private resolveInteract(): { label: string; action: InteractAction } | null {
    const playerPos = this.player.group.position;

    const npc = this.npcSystem.nearestInteractable(playerPos);
    if (npc) {
      return { label: `与${npc.def.name}交谈`, action: { type: 'npc', npcId: npc.def.id } };
    }

    const event = this.events.nearestInteractable(playerPos);
    if (event) {
      return {
        label: event.kind === 'kitten' ? '靠近小猫' : '捡起钱包',
        action: { type: 'event', kind: event.kind },
      };
    }

    if (this.interiors.isIndoor) {
      const indoorId = this.interiors.indoorBuildingId;
      const building = indoorId ? this.world.buildingMap[indoorId] : undefined;
      if (building?.interior && building.interiorEntry) {
        // 床（睡觉）优先于门（离开）
        if (building.spec.id === 'b_home_player') {
          const bed = this.interiors.npcSpotIn('b_home_player', PLAYER_HOME_BED);
          const bx = playerPos.x - bed.x;
          const bz = playerPos.z - bed.z;
          if (bx * bx + bz * bz < 4.8) {
            return { label: '睡觉（推进到明天清晨）', action: { type: 'sleep' } };
          }
        }
        const entry = building.interior.position;
        const dx = playerPos.x - (entry.x + building.interiorEntry.x);
        const dz = playerPos.z - (entry.z + building.interiorEntry.z);
        if (dx * dx + dz * dz < 4) {
          return { label: `离开${building.spec.name}`, action: { type: 'exit' } };
        }
      }
      return null;
    }

    let best: { label: string; action: InteractAction; distSq: number } | null = null;
    for (const building of this.world.buildings) {
      if (!building.spec.enterable) continue;
      const dx = playerPos.x - building.spec.door.x;
      const dz = playerPos.z - building.spec.door.z;
      const distSq = dx * dx + dz * dz;
      if (distSq > INTERACT_RADIUS_PROP * INTERACT_RADIUS_PROP) continue;
      if (best && distSq >= best.distSq) continue;
      const shopId = building.spec.shopId;
      const hours = shopId ? SHOP_HOURS[shopId] : undefined;
      const open = !hours || (this.time.hour >= hours[0] && this.time.hour < hours[1]);
      best = {
        label: open ? `进入${building.spec.name}` : `${building.spec.name}（已打烊）`,
        action: { type: 'enter', buildingId: building.spec.id, shopId },
        distSq,
      };
    }
    return best ? { label: best.label, action: best.action } : null;
  }

  private currentInteract: { label: string; action: InteractAction } | null = null;

  private updateInteraction(): void {
    this.currentInteract = this.resolveInteract();
    this.hud.setPrompt(this.currentInteract?.label ?? null);
  }

  private doInteract(): void {
    const action = this.currentInteract?.action;
    if (!action) return;
    this.audio.interact();

    switch (action.type) {
      case 'npc': {
        const npc = this.npcSystem.npcMap[action.npcId];
        if (!npc) return;
        npc.faceTo(this.player.group.position.x, this.player.group.position.z);
        this.player.group.rotation.y = Math.atan2(
          npc.position.x - this.player.group.position.x,
          npc.position.z - this.player.group.position.z,
        );
        this.uiMode = 'dialogue';
        this.dialogue.open(npc, {
          rng: this.rng,
          hour: () => this.time.hour,
          playerNearSpot: (spotId, radius) => this.playerNearSpot(spotId, radius),
          eventHooks: {
            kittenFound: () => this.state.flags.kittenFound === true,
            walletFound: () =>
              this.state.flags.walletFound === true ? this.events.walletOwner() : null,
            returnKitten: () => {
              this.state.flags.kittenFound = false;
              this.hud.toast('陆君高兴地朝神社石阶跑去了。');
            },
            returnWallet: (ownerId: string) => {
              this.state.flags.walletFound = false;
              this.state.money += 400;
              this.state.addRelationship(ownerId, 15);
              this.events.clearWallet();
              this.hud.toast('收下了 400 元谢礼。');
            },
          },
        });
        break;
      }
      case 'event': {
        const message = this.events.interact(action.kind);
        if (action.kind === 'kitten') {
          this.state.flags.kittenFound = true;
        } else {
          this.state.flags.walletFound = true;
        }
        this.hud.toast(message);
        this.audio.gift();
        break;
      }
      case 'enter': {
        const building = this.world.buildingMap[action.buildingId];
        if (!building) return;
        const position = this.interiors.enter(action.buildingId);
        if (!position) return;
        this.player.reset(position.x, position.z, position.y);
        this.player.setField(this.interiors.field());
        this.npcSystem.setCurrentIndoor(this.interiors.indoorBuildingId);
        this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
        this.audio.door();
        if (action.shopId) {
          const hours = SHOP_HOURS[action.shopId];
          const open = this.time.hour >= hours[0] && this.time.hour < hours[1];
          if (open) {
            this.uiMode = 'shop';
            this.panels.openShop(action.shopId);
            this.hud.toast('逛完后按 Esc 离开；和店主交谈可以聊聊委托。');
          } else {
            this.hud.toast('这家店已经打烊了。');
          }
        }
        break;
      }
      case 'exit': {
        const position = this.interiors.exit();
        if (!position) return;
        this.player.reset(position.x, position.z, position.y);
        this.player.setField(this.interiors.field());
        this.npcSystem.setCurrentIndoor(null);
        this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
        this.audio.door();
        break;
      }
      case 'sleep': {
        this.sleep();
        break;
      }
    }
  }

  private playerNearSpot(spotId: string, radius: number): boolean {
    const target = SPOT_LOOKUP[spotId];
    if (!target) return false;
    const dx = this.player.group.position.x - target.x;
    const dz = this.player.group.position.z - target.z;
    return dx * dx + dz * dz < radius * radius;
  }

  // ---------------------------------------------------------------- 玩家

  private updatePlayer(delta: number, elapsed: number): void {
    this.player.update(delta, elapsed, this.input, { speed: 4.6, acceleration: 12 }, this.cameraRig.yaw);

    // 列车危险判定
    if (this.train.active && !this.interiors.isIndoor) {
      const near = Math.abs(this.train.group.position.x - this.player.group.position.x);
      if (near < 9 && Math.abs(this.player.group.position.z - RAILWAY_Z) < 2.6) {
        const push = this.player.group.position.x > this.train.group.position.x ? 1 : -1;
        this.player.group.position.x += push * 6 * delta;
        this.player.group.position.z += (this.player.group.position.z > RAILWAY_Z ? 1 : -1) * 6 * delta;
        this.cameraRig.addTrauma(0.5);
        this.hud.toast('好险！列车呼啸而过……');
        this.audio.fireworks();
      }
    }
  }

  // ---------------------------------------------------------------- 列车

  private updateTrain(delta: number): void {
    const minute = Math.floor(this.time.minutes);
    // 每小时 :05 和 :35 发车
    if (minute !== this.lastTrainMinute && (minute % 60 === 5 || minute % 60 === 35)) {
      this.lastTrainMinute = minute;
      this.train.launch(this.rng.chance(0.5) ? 1 : -1);
      this.audio.trainBell();
    }
    this.train.update(delta);

    if (this.train.active) {
      const distance = Math.abs(this.train.group.position.x);
      const proximity = Math.max(0, 1 - distance / 90);
      this.audio.setTrainProximity(proximity);
    } else {
      this.audio.setTrainProximity(0);
    }
  }

  private updateGates(delta: number): void {
    // 每个平交口独立判断列车接近（列车前端 +34m 内开始落栏）
    for (const gate of this.world.gates) {
      const trainNear =
        this.train.active &&
        Math.abs(this.train.group.position.x + (this.train.group.rotation.y === 0 ? 17 : -17) - gate.x) < 34;
      const target = trainNear ? 1.45 : 0;
      const wasClosed = gate.closed > 0.5;
      gate.closed += (target - gate.closed) * Math.min(1, delta * 3.2);
      gate.pivot.rotation.y = -gate.closed;
      if (trainNear && !wasClosed) this.audio.trainBell();
    }
  }

  // ---------------------------------------------------------------- 日程

  private onNewDay(): void {
    this.state.talkedToday = {};
    this.state.questsDoneToday = 0;
    // 过期委托
    for (const quest of this.state.quests) {
      if (quest.status === 'active' && quest.deadlineDay < this.time.day) {
        quest.status = 'failed';
        this.hud.toast(`委托过期了：${quest.title}`);
      }
    }
    this.economy.refreshDay(this.rng);
    this.events.resetDay(this.time.day, this.rng);
    this.npcSystem.resetDay();
    this.saveGame(false);
  }

  private maybeAutosave(): void {
    const hour = Math.floor(this.time.minutes / 60);
    if (hour !== this.lastAutosaveHour) {
      this.lastAutosaveHour = hour;
      this.saveGame(false);
    }
  }

  private sleep(): void {
    this.uiMode = 'sleep';
    const fade = this.ensureFade();
    fade.style.opacity = '1';
    window.setTimeout(() => {
      this.time.setTime(this.time.day + 1, 6.5 * 60);
      this.player.reset(PLAYER_SPAWN.x, PLAYER_SPAWN.z);
      this.interiors.exit();
      this.player.setField(this.interiors.field());
      this.npcSystem.setCurrentIndoor(null);
      this.npcSystem.relocateAll({
        time: this.time,
        weather: this.weather,
        state: this.state,
        rng: this.rng,
        graph: this.world.graph,
        interiors: this.interiors,
        festival: this.events.festivalActive,
      });
      this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
      this.saveGame(false);
      fade.style.opacity = '0';
      this.uiMode = 'play';
      this.hud.toast(`第 ${this.time.day} 天开始了。已自动存档。`);
    }, 900);
  }

  private ensureFade(): HTMLDivElement {
    if (!this.fadeElement) {
      const fade = document.createElement('div');
      fade.id = 'fade-overlay';
      document.body.append(fade);
      this.fadeElement = fade;
    }
    return this.fadeElement;
  }

  // ---------------------------------------------------------------- 存档

  private saveGame(manual: boolean): void {
    this.state.save(
      this.state.toSaveData(
        this.time.day,
        this.time.minutes,
        this.weather.weather,
        { x: this.player.group.position.x, z: this.player.group.position.z },
        this.rng.getState(),
      ),
    );
    if (manual) this.hud.toast('进度已保存。');
  }

  private loadGame(): void {
    const data = TownState.load();
    if (!data) {
      this.hud.toast('没有找到存档。');
      return;
    }
    this.state.applySaveData(data);
    this.time.setTime(data.day, data.minutes);
    this.weather.setWeather(data.weather, true);
    this.rng.setState(data.rngState);
    this.interiors.exit();
    this.player.reset(data.playerPos.x, data.playerPos.z);
    this.player.setField(this.interiors.field());
    this.npcSystem.setCurrentIndoor(null);
    this.npcSystem.relocateAll(this.npcContext());
    this.economy.refreshDay(this.rng);
    this.events.resetDay(this.time.day, this.rng);
    this.panels.closeAll();
    this.uiMode = 'play';
    this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
    this.hud.toast('存档已读取。');
  }

  private npcContext() {
    return {
      time: this.time,
      weather: this.weather,
      state: this.state,
      rng: this.rng,
      graph: this.world.graph,
      interiors: this.interiors,
      festival: this.events.festivalActive,
    };
  }

  private continueGame(): void {
    this.input.clearPresses();
    this.title.hide();
    this.loadGame();
  }

  private newGame(): void {
    this.input.clearPresses();
    this.title.hide();
    this.state.reset();
    this.time.setTime(1, 10.5 * 60);
    this.weather.setWeather('clear', true);
    this.rng.setState(1);
    this.interiors.exit();
    this.player.reset(PLAYER_SPAWN.x, PLAYER_SPAWN.z);
    this.player.setField(this.interiors.field());
    this.npcSystem.setCurrentIndoor(null);
    this.npcSystem.relocateAll(this.npcContext());
    this.economy.refreshDay(this.rng);
    this.events.resetDay(1, this.rng);
    this.panels.closeAll();
    this.uiMode = 'play';
    this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
    this.starterQuestGiven = false;
    this.hud.toast('欢迎来到樱花小镇。去住宅街找加藤老师聊聊吧。');
    window.setTimeout(() => {
      if (this.uiMode === 'play' && !this.starterQuestGiven) {
        this.dialogue.grantStarterQuest('npc_teacher', 'i_bread', SHOPS[0].name, '黄油面包');
        this.starterQuestGiven = true;
        this.hud.toast('接受了委托：带一个黄油面包（今天内）');
      }
    }, 1500);
  }

  // ---------------------------------------------------------------- 工具

  /** 相机避让用的碰撞盒（室内用内装墙体，室外用世界碰撞盒）。 */
  private cameraColliders(): BoxCollider[] | undefined {
    if (this.interiors.isIndoor) {
      const field = this.interiors.field();
      return field.boxes;
    }
    return this.world.colliders;
  }

  private questTargets(): { x: number; z: number; kind: 'quest' | 'event' }[] {
    const targets: { x: number; z: number; kind: 'quest' | 'event' }[] = [];
    const playerIndoor = this.interiors.indoorBuildingId;
    for (const quest of this.state.activeQuests()) {
      if (quest.kind === 'meet' && quest.targetSpotId) {
        const spot = SPOT_LOOKUP[quest.targetSpotId];
        if (spot) targets.push({ x: spot.x, z: spot.z, kind: 'quest' });
      } else if (quest.kind === 'fetch') {
        const npc = this.npcSystem.npcMap[quest.giverId];
        if (!npc) continue;
        if (npc.location.buildingId && playerIndoor !== npc.location.buildingId) {
          // NPC 在室内且玩家不在同处：目标取其建筑门口
          const building = this.world.buildingMap[npc.location.buildingId];
          if (building) targets.push({ x: building.spec.door.x, z: building.spec.door.z, kind: 'quest' });
        } else {
          targets.push({ x: npc.position.x, z: npc.position.z, kind: 'quest' });
        }
      }
    }
    return targets;
  }

  /** 供 bot/测试使用的当前委托目标点。 */
  private currentQuestTarget(): { x: number; z: number } | null {
    const targets = this.questTargets();
    return targets.length > 0 ? { x: targets[0].x, z: targets[0].z } : null;
  }

  private must(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing element: ${selector}`);
    return element;
  }

  // ---------------------------------------------------------------- 测试钩子

  private installTestHooks(): void {
    window.__THREE_GAME_TEST_HOOKS__ = {
      seed: (value: number) => {
        this.rng.setState(value * 7919 + 13);
      },
      setState: (name: string) => {
        this.applyTestState(name);
        this.render();
        this.publishDiagnostics();
        return { state: name };
      },
      setPausedForScreenshot: (paused: boolean) => {
        this.pausedForScreenshot = paused;
      },
      setReducedMotion: (enabled: boolean) => {
        this.reducedMotion = enabled;
        if (enabled) {
          this.player.stabilizeVisuals();
          for (const npc of this.npcSystem.npcs) npc.stabilizeVisuals();
        }
        this.render();
        this.publishDiagnostics();
      },
      hideDebugUi: () => {
        // 无调试 UI 需要隐藏。
      },
    };
  }

  private applyTestState(name: string): void {
    this.title.hide();
    this.panels.closeAll();
    this.dialogue.close();
    this.rng.setState(42);
    this.state.reset();
    let enterBuilding: string | null = null;

    switch (name) {
      case 'title':
        this.uiMode = 'title';
        this.title.show(false);
        return;
      case 'active-play':
        this.time.setTime(1, 10.5 * 60);
        this.weather.setWeather('clear', true);
        this.player.reset(PLAYER_SPAWN.x, PLAYER_SPAWN.z);
        break;
      case 'night':
        this.time.setTime(2, 22 * 60);
        this.weather.setWeather('clear', true);
        this.player.reset(0, 6);
        break;
      case 'rain':
        this.time.setTime(2, 15 * 60);
        this.weather.setWeather('rain', true);
        this.player.reset(0, -12);
        break;
      case 'festival':
        this.time.setTime(3, 18.5 * 60);
        this.weather.setWeather('clear', true);
        this.player.reset(40, 8);
        break;
      case 'interior-bakery':
        this.time.setTime(1, 10 * 60);
        this.weather.setWeather('clear', true);
        this.player.reset(PLAYER_SPAWN.x, PLAYER_SPAWN.z);
        enterBuilding = 'b_bakery';
        break;
      default:
        throw new Error(`Unknown test state: ${name}`);
    }

    this.interiors.exit();
    this.player.setField(this.interiors.field());
    this.npcSystem.setCurrentIndoor(null);
    this.npcSystem.relocateAll(this.npcContext());
    this.events.resetDay(this.time.day, this.rng);
    this.economy.refreshDay(this.rng);
    if (enterBuilding) {
      this.doEnterForTest(enterBuilding);
      this.uiMode = 'play';
    } else {
      this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
      this.uiMode = 'play';
    }
  }

  private doEnterForTest(buildingId: string): void {
    const position = this.interiors.enter(buildingId);
    if (!position) return;
    this.player.reset(position.x, position.z, position.y);
    this.player.setField(this.interiors.field());
    this.npcSystem.setCurrentIndoor(buildingId);
    this.cameraRig.snapTo(this.player.group.position, this.cameraColliders());
  }

  private publishDiagnostics(): void {
    const info = this.renderer.info;
    window.__THREE_GAME_DIAGNOSTICS__ = {
      frame: this.frame,
      elapsed: this.elapsed,
      uiMode: this.uiMode,
      day: this.time.day,
      minutes: this.time.minutes,
      weather: this.weather.weather,
      money: this.state.money,
      indoor: this.interiors.indoorBuildingId,
      player: {
        position: {
          x: this.player.group.position.x,
          y: this.player.group.position.y,
          z: this.player.group.position.z,
        },
        speed: this.player.velocity.length(),
      },
      camera: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
        fov: this.camera.fov,
        far: this.camera.far,
      },
      npcs: {
        total: this.npcSystem.npcs.length,
        outdoor: this.npcSystem.outdoorPositions().length,
      },
      quests: {
        active: this.state.activeQuests().length,
        done: this.state.quests.filter((q) => q.status === 'done').length,
      },
      questTarget: this.currentQuestTarget(),
      festival: this.events.festivalActive,
      renderer: {
        calls: info.render.calls,
        triangles: info.render.triangles,
        geometries: info.memory.geometries,
        textures: info.memory.textures,
      },
      canvas: {
        clientWidth: this.canvas.clientWidth,
        clientHeight: this.canvas.clientHeight,
        width: this.canvas.width,
        height: this.canvas.height,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      },
    } satisfies GameDiagnostics;
  }
}
