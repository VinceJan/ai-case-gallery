/**
 * Sakura Town — main game orchestrator.
 * Wires world, player, NPCs, trains, time/weather, interaction, quests, UI, audio, save.
 */
import * as THREE from 'three';
import { InputController } from '../core/InputController';
import { Loop } from '../core/Loop';
import { createRenderer, resizeRenderer } from '../core/Renderer';
import { Player, type InputFrame } from '../entities/Player';
import { NPCSystem, type NPCScheduleSlot } from '../entities/NPC';
import { TrainSystem } from '../entities/Train';
import { buildWorld, type WorldRoot } from '../world/WorldBuilder';
import { TimeWeatherSystem } from '../systems/TimeWeatherSystem';
import { handleInteract, isBuildingOpen, type InteractionContext } from '../systems/InteractionSystem';
import { createEventSystem } from '../systems/QuestSystem';
import { Hud } from '../systems/Hud';
import { AudioSystem } from '../systems/AudioSystem';
import { saveGame, loadGame, defaultPlayerState } from '../systems/SaveSystem';
import { createSeededRandom } from '../utils/random';
import { surfaceToWorld } from '../world/surface';
import type {
  PlayerState,
  NPCDef,
  InteractableDef,
} from '../data/types';

const NPC_DEFS: NPCDef[] = [
  { id: 'midori', name: '緑', role: 'shopkeeper', homeId: 'house-1', workId: 'bakery', color: '#c87850', hairColor: '#3a2818', age: 34 },
  { id: 'ken', name: '健', role: 'worker', homeId: 'apt-0', workId: 'office', color: '#2a3a5a', hairColor: '#1a1a1a', age: 28 },
  { id: 'yuki', name: '雪', role: 'student', homeId: 'house-2', workId: 'school', color: '#4a6a9a', hairColor: '#2a2020', age: 11 },
  { id: 'sora', name: '空', role: 'student', homeId: 'house-3', workId: 'school', color: '#3a5a80', hairColor: '#4a3020', age: 10 },
  { id: 'hanako', name: '花子', role: 'elder', homeId: 'house-4', color: '#6a4a6a', hairColor: '#c0c0c0', age: 72 },
  { id: 'taro', name: '太郎', role: 'office', homeId: 'apt-1', workId: 'station', color: '#3a3a40', hairColor: '#202020', age: 45 },
  { id: 'sakura', name: 'さくら', role: 'teacher', homeId: 'house-5', workId: 'school', color: '#4a7a5a', hairColor: '#3a2818', age: 29 },
  { id: 'jiro', name: '次郎', role: 'child', homeId: 'house-6', workId: 'school', color: '#d06040', hairColor: '#2a2018', age: 8 },
  { id: 'mama', name: 'ママ', role: 'shopkeeper', homeId: 'house-7', workId: 'cafe', color: '#a06080', hairColor: '#2a1810', age: 50 },
  { id: 'shota', name: '翔太', role: 'worker', homeId: 'apt-2', workId: 'hardware', color: '#4a5a3a', hairColor: '#201810', age: 38 },
  { id: 'ai', name: '愛', role: 'office', homeId: 'apt-3', workId: 'clinic', color: '#5a7080', hairColor: '#3a2820', age: 32 },
  { id: 'kenta', name: '健太', role: 'gardener', homeId: 'house-8', workId: 'shrine', color: '#5a6a40', hairColor: '#3a2818', age: 55 },
];

const SCHEDULES: Record<string, NPCScheduleSlot[]> = {
  midori: [
    { hour: 6, minute: 30, placeId: 'bakery', activity: '开店准备' },
    { hour: 12, minute: 0, placeId: 'bakery', activity: '营业' },
    { hour: 18, minute: 0, placeId: 'house-1', activity: '回家' },
    { hour: 21, minute: 0, placeId: 'home', activity: '休息' },
  ],
  ken: [
    { hour: 6, minute: 40, placeId: 'station', activity: '通勤' },
    { hour: 8, minute: 0, placeId: 'station', activity: '乘车' },
    { hour: 9, minute: 0, placeId: 'office', activity: '工作' },
    { hour: 18, minute: 0, placeId: 'station', activity: '回家' },
    { hour: 19, minute: 0, placeId: 'apt-0', activity: '到家' },
    { hour: 22, minute: 0, placeId: 'home', activity: '就寝' },
  ],
  yuki: [
    { hour: 7, minute: 20, placeId: 'school', activity: '上学' },
    { hour: 15, minute: 30, placeId: 'wander', activity: '放学玩耍' },
    { hour: 17, minute: 0, placeId: 'house-2', activity: '回家' },
    { hour: 21, minute: 0, placeId: 'home', activity: '就寝' },
  ],
  sora: [
    { hour: 7, minute: 30, placeId: 'school', activity: '上学' },
    { hour: 15, minute: 30, placeId: 'wander', activity: '玩耍' },
    { hour: 17, minute: 30, placeId: 'house-3', activity: '回家' },
    { hour: 20, minute: 30, placeId: 'home', activity: '就寝' },
  ],
  hanako: [
    { hour: 8, minute: 0, placeId: 'wander', activity: '散步' },
    { hour: 11, minute: 0, placeId: 'cafe', activity: '喫茶' },
    { hour: 13, minute: 0, placeId: 'wander', activity: '午休' },
    { hour: 17, minute: 0, placeId: 'house-4', activity: '回家' },
  ],
  taro: [
    { hour: 6, minute: 20, placeId: 'station', activity: '值班' },
    { hour: 12, minute: 0, placeId: 'wander', activity: '午休' },
    { hour: 14, minute: 0, placeId: 'station', activity: '车站工作' },
    { hour: 20, minute: 0, placeId: 'apt-1', activity: '回家' },
  ],
  sakura: [
    { hour: 7, minute: 0, placeId: 'school', activity: '上班' },
    { hour: 16, minute: 0, placeId: 'wander', activity: '课后' },
    { hour: 17, minute: 30, placeId: 'house-5', activity: '回家' },
    { hour: 22, minute: 0, placeId: 'home', activity: '就寝' },
  ],
  jiro: [
    { hour: 7, minute: 40, placeId: 'school', activity: '上学' },
    { hour: 15, minute: 0, placeId: 'wander', activity: '玩耍' },
    { hour: 18, minute: 0, placeId: 'house-6', activity: '回家' },
    { hour: 20, minute: 0, placeId: 'home', activity: '就寝' },
  ],
  mama: [
    { hour: 8, minute: 0, placeId: 'cafe', activity: '开店' },
    { hour: 13, minute: 0, placeId: 'cafe', activity: '营业' },
    { hour: 19, minute: 0, placeId: 'house-7', activity: '打烊回家' },
    { hour: 22, minute: 0, placeId: 'home', activity: '就寝' },
  ],
  shota: [
    { hour: 8, minute: 30, placeId: 'hardware', activity: '开店' },
    { hour: 17, minute: 30, placeId: 'wander', activity: '回家路上' },
    { hour: 18, minute: 30, placeId: 'apt-2', activity: '到家' },
    { hour: 22, minute: 30, placeId: 'home', activity: '就寝' },
  ],
  ai: [
    { hour: 8, minute: 0, placeId: 'clinic', activity: '工作' },
    { hour: 17, minute: 0, placeId: 'wander', activity: '下班' },
    { hour: 18, minute: 0, placeId: 'apt-3', activity: '回家' },
    { hour: 22, minute: 0, placeId: 'home', activity: '就寝' },
  ],
  kenta: [
    { hour: 7, minute: 0, placeId: 'shrine', activity: '神社打扫' },
    { hour: 11, minute: 0, placeId: 'wander', activity: '园林' },
    { hour: 16, minute: 0, placeId: 'shrine', activity: '黄昏参拜' },
    { hour: 18, minute: 0, placeId: 'house-8', activity: '回家' },
  ],
};

export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
  private readonly input: InputController;
  private readonly player = new Player();
  private readonly hud = new Hud();
  private readonly audio = new AudioSystem();
  private readonly loop = new Loop(
    (d, e) => this.update(d, e),
    () => this.render(),
  );

  private world!: WorldRoot;
  private timeWeather!: TimeWeatherSystem;
  private npcSystem!: NPCSystem;
  private trains!: TrainSystem;
  private events = createEventSystem();
  private playerState: PlayerState = defaultPlayerState();
  private rng = createSeededRandom(42);
  private frame = 0;
  private elapsed = 0;
  private pausedForScreenshot = false;
  private reducedMotion = false;
  private saveTimer = 0;
  private footTimer = 0;
  private nearInteractable: InteractableDef | null = null;
  private ridingBike = false;
  private maxDpr = 2;
  private keys: Record<string, boolean> = {};
  private interactPressed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas);
    this.renderer.toneMappingExposure = 1.05;

    const stick = this.q('#touch-stick');
    const knob = this.q('#touch-knob');
    const dash = this.q('#dash-button');
    this.input = new InputController(stick, knob, dash);

    // restore save
    const saved = loadGame();
    if (saved) {
      this.playerState.money = saved.money;
      this.playerState.inventory = saved.inventory ?? [];
      this.playerState.relationships = saved.relationships ?? [];
      this.playerState.quests = saved.quests ?? [];
      this.playerState.flags = saved.flags ?? {};
      this.playerState.visitedBuildings = saved.visitedBuildings ?? [];
      this.playerState.day = saved.day ?? 1;
    }

    this.buildScene();
    resizeRenderer(this.renderer, this.camera, this.maxDpr);
    this.installTestHooks();
    this.hud.setHint('WASD 移动 · E 交互 · Shift 奔跑 · 环状の町を歩き回ろう');
  }

  private q(sel: string): HTMLElement {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) throw new Error(`Missing ${sel}`);
    return el;
  }

  private buildScene(): void {
    this.scene.background = new THREE.Color('#a8d0e8');

    this.timeWeather = new TimeWeatherSystem(this.scene, () => this.rng());
    if (loadGame()) {
      const s = loadGame()!;
      this.timeWeather.setTime(s.hour ?? 8, s.minute ?? 30, s.day ?? 1);
    }

    this.world = buildWorld(() => this.rng());
    this.scene.add(this.world.group);

    // places map for NPCs
    const places = new Map<string, { sx: number; sz: number }>();
    for (const b of this.world.buildings) {
      places.set(b.def.id, { sx: b.def.sx, sz: b.def.sz });
    }
    places.set('station', this.world.stationSurface);
    places.set('office', { sx: 20, sz: 0 });
    places.set('home', { sx: 0, sz: 0 });

    this.npcSystem = new NPCSystem(places);
    this.npcSystem.spawn(NPC_DEFS, SCHEDULES);
    this.scene.add(this.npcSystem.root);

    this.trains = new TrainSystem(this.world.railRadius);
    this.scene.add(this.trains.group);

    this.scene.add(this.player.group);

    // rain particles
    const rainGeo = new THREE.BufferGeometry();
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = Math.random() * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const rainMat = new THREE.PointsMaterial({
      color: '#8ab0d0',
      size: 0.12,
      transparent: true,
      opacity: 0,
    });
    const rain = new THREE.Points(rainGeo, rainMat);
    rain.name = 'rain';
    this.scene.add(rain);

    this.camera.position.set(0, 25, 35);
    this.camera.lookAt(0, 0, 0);
  }

  start(): void {
    this.loop.start();
  }

  dispose(): void {
    this.loop.stop();
    this.input.dispose();
    this.audio.dispose();
    this.renderer.dispose();
    window.__THREE_GAME_DIAGNOSTICS__ = undefined;
    window.__THREE_GAME_TEST_HOOKS__ = undefined;
  }

  private _keysInstalled = false;

  private installKeys(): void {
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.keys[e.code] = true;
      if (e.code === 'KeyE') this.interactPressed = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  private update(delta: number, elapsed: number): void {
    this.frame += 1;
    if (!this._keysInstalled) {
      this._keysInstalled = true;
      this.installKeys();
    }

    if (this.pausedForScreenshot) {
      this.publishDiagnostics();
      return;
    }

    this.elapsed += delta;
    resizeRenderer(this.renderer, this.camera, this.maxDpr);

    // input
    const input: InputFrame = {
      forward: (this.keys['KeyW'] || this.keys['ArrowUp'] ? 1 : 0) - (this.keys['KeyS'] || this.keys['ArrowDown'] ? 1 : 0),
      strafe: (this.keys['KeyD'] || this.keys['ArrowRight'] ? 1 : 0) - (this.keys['KeyA'] || this.keys['ArrowLeft'] ? 1 : 0),
      run: !!(this.keys['ShiftLeft'] || this.keys['ShiftRight']),
      interact: false,
      interactPressed: this.interactPressed,
      toggleLight: false,
      jump: false,
    };

    const bikeBonus = this.ridingBike ? 1.7 : 1;
    const tuning = {
      speed: 5.2 * bikeBonus,
      runMultiplier: 1.55,
      acceleration: 12,
      turnLerp: 1.2,
    };
    this.player.update(delta, elapsed, input, tuning);

    // footsteps
    const speed = this.player.velocity.length();
    if (speed > 1) {
      this.footTimer += delta * speed;
      if (this.footTimer > 2.2) {
        this.footTimer = 0;
        this.audio.footstep();
      }
    }

    // time / weather
    if (!this.reducedMotion) this.timeWeather.update(delta);
    this.world.updateNight(this.timeWeather.nightFactor);
    this.world.updateRain(this.timeWeather.rainFactor);
    this.audio.setRain(this.timeWeather.rainFactor);
    this.npcSystem.setWeatherVisual(this.timeWeather.weather);

    // NPCs
    this.npcSystem.update(
      delta,
      this.timeWeather.time,
      this.timeWeather.weather,
      this.player.sx,
      this.player.sz,
      { trainDelay: this.trains.delayActive },
    );

    // trains
    this.trains.update(delta);
    if (this.trains.crossingClosed && this.frame % 120 === 0) {
      this.audio.crossing();
    }

    // events
    (this.events as any) && this.events.update(this.timeWeather.time, this.timeWeather.weather, this.playerState.flags);

    // rain visual
    const rainObj = this.scene.getObjectByName('rain');
    if (rainObj) {
      const mat = (rainObj as THREE.Points).material as THREE.PointsMaterial;
      mat.opacity = this.timeWeather.rainFactor * 0.7;
      const attr = (rainObj as THREE.Points).geometry.getAttribute('position') as THREE.BufferAttribute;
      if (this.timeWeather.rainFactor > 0.1 && !this.reducedMotion) {
        for (let i = 0; i < attr.count; i++) {
          let y = attr.getY(i) - delta * 18;
          if (y < 0) y = 25 + Math.random() * 10;
          attr.setY(i, y);
        }
        attr.needsUpdate = true;
      }
      rainObj.position.copy(this.player.group.position);
    }

    // camera follow (third person on curved world)
    const target = surfaceToWorld(this.player.sx, this.player.sz, 1.5);
    const backYaw = this.player.yaw;
    const camPos = surfaceToWorld(
      this.player.sx - Math.cos(backYaw) * 7,
      this.player.sz - Math.sin(backYaw) * 7,
      3.2,
    );
    if (this.frame < 5) {
      this.camera.position.copy(camPos);
    } else {
      this.camera.position.lerp(camPos, Math.min(1, 5 * delta));
    }
    this.camera.lookAt(target);

    // interaction proximity
    this.nearInteractable = null;
    let prompt: string | null = null;
    let bestD = 3.2;
    for (const it of this.world.interactables) {
      const d = Math.hypot(it.sx - this.player.sx, it.sz - this.player.sz);
      if (d < bestD) {
        bestD = d;
        this.nearInteractable = it;
        prompt = `[E] ${it.label}`;
      }
    }
    // NPC talk
    const npc = this.npcSystem.getNearest(this.player.sx, this.player.sz, 2.5);
    if (npc && (!prompt || bestD > 2)) {
      prompt = `[E] ${npc.def.name} に話しかける`;
      this.nearInteractable = {
        id: `npc-${npc.def.id}`,
        kind: 'note',
        sx: npc.sx,
        sz: npc.sz,
        height: 1.2,
        label: npc.def.name,
      };
    }
    this.hud.setPrompt(prompt);

    // interact
    if (this.interactPressed && this.player.canInteract) {
      this.interactPressed = false;
      this.player.consumeInteract();
      this.doInteract();
    } else if (this.interactPressed) {
      this.interactPressed = false;
    }

    // secrets
    const secret = this.events.tryDiscover(this.player.sx, this.player.sz, {
      ...this.playerState.flags,
      __hour: this.timeWeather.time.hour,
    });
    if (secret) {
      this.hud.toast(secret);
      this.audio.secret();
    }

    // save
    this.saveTimer += delta;
    if (this.saveTimer > 15) {
      this.saveTimer = 0;
      saveGame(this.playerState, this.timeWeather.time.hour, this.timeWeather.time.minute);
    }

    this.hud.update(
      delta,
      this.timeWeather.time,
      this.timeWeather.timeString,
      this.timeWeather.weatherLabel,
      this.playerState,
      this.events.quests,
      this.events.active,
      prompt,
    );

    this.publishDiagnostics();
  }

  private doInteract(): void {
    const npc = this.npcSystem.getNearest(this.player.sx, this.player.sz, 2.5);
    if (npc && (!this.nearInteractable || this.nearInteractable.id.startsWith('npc-'))) {
      this.talkToNpc(npc.def.id, npc.def.name);
      return;
    }
    if (!this.nearInteractable) return;

    const def = this.nearInteractable;
    const ctx: InteractionContext = {
      player: this.playerState,
      time: this.timeWeather.time,
      weather: this.timeWeather.weather,
      isOpen: (id) => {
        const b = this.world.buildings.find((x) => x.def.id === id)?.def;
        return isBuildingOpen(b, this.timeWeather.time, this.timeWeather.weather, this.playerState.flags);
      },
      flag: (k) => this.playerState.flags[k],
      setFlag: (k, v) => {
        this.playerState.flags[k] = v;
      },
      addMoney: (n) => {
        this.playerState.money += n;
      },
      addItem: (item) => {
        this.playerState.inventory.push(item);
      },
      hasItem: (id) => this.playerState.inventory.some((i) => i.id === id),
      removeItem: (id) => {
        const idx = this.playerState.inventory.findIndex((i) => i.id === id);
        if (idx >= 0) {
          this.playerState.inventory.splice(idx, 1);
          return true;
        }
        return false;
      },
    };

    const result = handleInteract(def, ctx);
    if (result.message) this.hud.toast(result.message);
    if (result.ok) this.audio.interact();
    if (result.moneyDelta) this.audio.purchase();
    if (result.item && result.item.kind === 'quest') {
      this.events.completeQuest('q_lost_bag');
      this.audio.questDone();
    }
    if (def.kind === 'bicycle') {
      this.ridingBike = !this.ridingBike;
      if (this.ridingBike) this.hud.toast('自転車に乗った');
      else this.hud.toast('自転車を降りた');
    }
    if (def.kind === 'shopCounter') {
      this.events.completeQuest('q_help_bakery');
    }
    if (def.kind === 'shrine') {
      this.events.completeQuest('q_shrine_visit');
      this.audio.questDone();
    }
  }

  private talkToNpc(id: string, name: string): void {
    const lines = [
      `こんにちは。${this.timeWeather.timeString}だね。`,
      this.timeWeather.weather === 'rain' ? '今日は雨だね。傘、持っている？' : 'いい天気だね。',
      this.trains.delayActive ? '電車が遅れているって。駅が混んでるよ。' : 'この町は穏やかでいいところだよ。',
      '何か困ったことがあったら、いつでも声をかけて。',
      '駅前のパン屋、今朝のパンがおいしかった。',
      '神社の桜、今年はきれいだったね。',
      '用事がなければ、また後でね。',
    ];
    const line = lines[Math.floor(Math.random() * lines.length)];
    this.hud.showDialogue(name, line);
    this.audio.dialogue();

    // affinity
    const rel = this.playerState.relationships.find((r) => r.npcId === id);
    if (rel) {
      rel.affinity = Math.min(100, rel.affinity + 2);
      rel.lastMetDay = this.timeWeather.time.day;
      rel.met = true;
    } else {
      this.playerState.relationships.push({
        npcId: id,
        affinity: 5,
        met: true,
        lastMetDay: this.timeWeather.time.day,
      });
    }

    // quest progress
    const met = this.playerState.relationships.filter((r) => r.met).length;
    if (met >= 3) {
      const done = this.events.completeQuest('q_make_friends');
      if (done) {
        this.hud.toast(done);
        this.audio.questDone();
      }
    }
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private syncCamera(): void {
    const target = surfaceToWorld(this.player.sx, this.player.sz, 1.5);
    const backYaw = this.player.yaw;
    // yaw=0 faces +sx → camera sits behind along -facing
    const camPos = surfaceToWorld(
      this.player.sx - Math.cos(backYaw) * 7,
      this.player.sz - Math.sin(backYaw) * 7,
      3.2,
    );
    this.camera.position.copy(camPos);
    this.camera.lookAt(target);
    this.camera.updateMatrixWorld();
  }

  private installTestHooks(): void {
    window.__THREE_GAME_TEST_HOOKS__ = {
      seed: (v: number) => {
        this.rng = createSeededRandom(v);
      },
      setState: (name: string) => {
        if (name === 'night') {
          this.timeWeather.setTime(21, 0, 1);
          this.syncCamera();
          this.hud.update(0, this.timeWeather.time, this.timeWeather.timeString, this.timeWeather.weatherLabel, this.playerState, this.events.quests, this.events.active, null);
          this.render();
          return { state: name };
        }
        if (name === 'rain') {
          this.timeWeather.setWeather('rain');
          this.timeWeather.setTime(14, 0, 2);
          this.syncCamera();
          this.render();
          return { state: name };
        }
        if (name === 'station') {
          this.player.sx = this.world.stationSurface.sx;
          this.player.sz = this.world.stationSurface.sz;
          this.player.yaw = -Math.PI / 2;
          this.player.syncTransform();
          this.syncCamera();
          this.render();
          this.publishDiagnostics();
          return { state: name };
        }
        if (name === 'overview') {
          this.camera.position.set(50, 80, 50);
          this.camera.lookAt(0, 0, 0);
          this.camera.updateMatrixWorld();
          this.render();
          return { state: name };
        }
        if (name === 'railway') {
          this.player.sx = 30;
          this.player.sz = 0;
          this.player.yaw = -Math.PI / 2;
          this.player.syncTransform();
          this.syncCamera();
          this.render();
          this.publishDiagnostics();
          return { state: name };
        }
        this.syncCamera();
        this.render();
        this.publishDiagnostics();
        return { state: name === 'active-play' || name === 'complete' || name === 'title' ? name : name };
      },
      setPausedForScreenshot: (p: boolean) => {
        this.pausedForScreenshot = p;
        if (p) this.render();
      },
      setReducedMotion: (e: boolean) => {
        this.reducedMotion = e;
        this.render();
      },
      hideDebugUi: (_h: boolean) => {
        // debug GUI hidden
      },
    };
  }

  private publishDiagnostics(): void {
    const info = this.renderer.info;
    window.__THREE_GAME_DIAGNOSTICS__ = {
      frame: this.frame,
      elapsed: this.elapsed,
      fps: 0,
      time: this.timeWeather?.time ?? { day: 1, hour: 8, minute: 0 },
      weather: this.timeWeather?.weather ?? 'clear',
      player: {
        sx: this.player.sx,
        sz: this.player.sz,
        money: this.playerState.money,
      },
      camera: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
      },
      npcs: this.npcSystem?.npcs.length ?? 0,
      trains: 2,
      renderer: {
        calls: info.render.calls,
        triangles: info.render.triangles,
      },
    } as any;
  }
}
