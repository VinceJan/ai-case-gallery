// ================================================================
//  游戏主控
// ================================================================
import * as THREE from 'three';
import { Input } from './input.js';
import { Player } from '../entities/player.js';
import { CameraRig } from '../entities/camera.js';
import { NPCManager } from '../entities/npc.js';
import { CollisionWorld } from '../systems/collision.js';
import { Sky } from '../world/sky.js';
import { buildTerrainData, buildTerrainMesh, buildStreamMesh, heightAt, streamDistAt } from '../world/terrain.js';
import { buildRoads, initRoadIndex } from '../world/roads.js';
import { Town } from '../world/town.js';
import { buildNavGraph } from '../world/navgraph.js';
import { buildInteriors } from '../world/interiors.js';
import { INTERIORS } from '../world/layout.js';
import { TimeSystem } from '../systems/time.js';
import { Audio } from '../systems/audio.js';
import { ZoneManager } from '../systems/zones.js';
import { InteractionSystem } from '../systems/interaction.js';
import { Inventory } from '../systems/inventory.js';
import { QuestSystem, QUESTS } from '../systems/quest.js';
import { EventSystem } from '../systems/events.js';
import { Weather } from '../systems/weather.js';
import { UI } from '../ui/hud.js';
import { questDialogue } from '../data/dialogue.js';
import { NPCS, BACKGROUND } from '../data/npcData.js';
import { updateNightLights } from '../render/toon.js';
import { clamp, clamp01, damp, dist } from '../util/math.js';

const SAVE_KEY = 'sakura-town-save';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, powerPreference: 'high-performance', stencil: false,
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 700);
    this.scene.add(this.camera);

    this.clock = new THREE.Clock();
    this.input = new Input(canvas);
    this.collision = new CollisionWorld();
    this.player = new Player(this.collision);
    this.rig = new CameraRig(this.camera, this.collision);
    this.rig.groundFn = heightAt;
    this.paused = false;   // Esc 菜单会置位
    this.fastNight = false;
    this.debugFree = false;
    this.stepT = 0;
    this.game = this;          // 便于各子系统回引
  }

  onProgress(pct, text) { this._progress?.(pct, text); }

  async boot() {
    const step = async (pct, text, fn) => {
      this.onProgress(pct, text);
      await new Promise((r) => setTimeout(r, 10));
      return fn?.();
    };

    await step(5, '塑造山谷与溪流…', () => buildTerrainData());
    await step(18, '计算道路与人行道…', () => initRoadIndex());
    await step(30, '搭建町内建筑…', () => {
      this.town = new Town(this.scene, this.collision);
      this.town.build();
    });
    await step(50, '铺设铁轨与月台…', () => {
      this.scene.add(buildRoads());
      this.scene.add(buildStreamMesh());
    });
    await step(60, '布置室内…', () => {
      const inte = buildInteriors(this.scene, this.collision);
      this.interiorZones = inte.zones;
      this.interiorInteractables = inte.interactables;
      this.interiorDynamic = inte.dynamic;
      this.interiorLights = inte.lights;
    });
    await step(72, '整理碰撞…', () => this.collision.index());
    await step(80, '准备天空与光…', () => {
      this.sky = new Sky(this.scene);
      this.time = new TimeSystem();
      this.audio = new Audio();
      this.weather = new Weather(this.scene);
    });
    await step(88, '町民们正在醒来…', () => {
      this.nav = buildNavGraph();
      this.npcs = new NPCManager(this.scene, this.nav, NPCS, BACKGROUND);
      this.inventory = new Inventory();
      this.zones = new ZoneManager(this);
      this.zones.setZones(this.interiorZones);
      // 室内交互点（含每个房间的「出门」）必须挂到 ZoneManager 上，
      // 否则 InteractionSystem 取不到，玩家就出不了门
      this.zones.interactables = this.interiorInteractables;
      for (const k of Object.keys(this.interiorZones)) {
        this.interiorZones[k].name = INTERIORS[k]?.name || k;
      }
      this.zones.currentZoneName = '';
      this.quests = new QuestSystem(this);
      this.questDialogue = questDialogue;
      this.ui = new UI(this);
      this.interaction = new InteractionSystem(this);
      this.events = new EventSystem(this);
    });
    await step(96, '最后一遍检查…', () => {
      this.setupWorld();
      this.resize();
      this.interaction.refresh();
      this.ui.refreshTracker();
    });
    await step(100, '准备完成');
  }

  setupWorld() {
    this.player.groundFn = heightAt;
    const a = { x: -10, z: 25.5, yaw: 0 };
    this.player.teleport(a.x, heightAt(a.x, a.z), a.z, a.yaw);
    this.rig.yaw = a.yaw + Math.PI;
    this.rig.pitch = 0.19;
    this.rig.smoothTarget.copy(this.player.pos);
    this.scene.add(this.player.obj);
    // 町民初始站位
    for (const n of this.npcs.list) {
      const s = n.resolveSpot(n.def.schedule ? (n.def.schedule[0].at || n.def.schedule[0].tag) : n.def.loop[0]);
      if (s.zone === 'world') n.place(s.pos.x, s.pos.z, s.face || 0);
      else {
        const o = this.interiorZones[s.zone]?.origin;
        if (o) {
          n.zone = s.zone;
          n.pos.set(o.x + s.pos.x, 0, o.z + s.pos.z);
          n.obj.position.copy(n.pos);
          n.yaw = s.face || 0;
          n.obj.rotation.y = n.yaw;
        }
      }
    }
    // 音频接线
    this.heightAt = heightAt;
    this.trainSystem = this.town.trainSystem;
    this.trainSystem.audio = this.audio;
    this.town.crossingCtl.audio = this.audio;
    this.town.trainSystem.on('whistle', () => this.audio.whistle(false));
    this.town.trainSystem.on('arrive', () => { this.audio.chime(); this.audio.brake(); });
    this.town.trainSystem.on('doorsOpen', () => this.audio.doorChime());
    this.town.trainSystem.on('doorsClose', () => this.audio.doorChime());
    this.town.trainSystem.on('approach', () => this.rig.addShake(0.02));
    this.time.onNewDay = (d) => {
      this.quests.rollDaily(d);
      this.ui.toast(`第 ${d} 天开始了。`, '清晨');
      this.ui.refreshTracker();
    };
  }

  resize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
  }

  setFreeCam(pos, look) { this.freeCam = pos ? { pos, look } : null; }
  setHour(h) { this.time.hour = h; }
  onPauseUI() { /* 预留 */ }

  start() {
    this.audio.init();
    this.audio.resume();
    this.clock.start();
    this.quests.rollDaily(this.time.day);
    this.renderer.setAnimationLoop(() => this.frame());
  }

  /* ================================================================ */
  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    try {
      this.tick(dt);
      this._err = null;
    } catch (e) {
      this._err = e;
      if (!this._reported) { this._reported = true; console.error('[SakuraTown] frame error:', e); }
      // 输入一定要清掉：否则同一个键会每帧重复触发，异常永不停止
      try { this.input.endFrame(); } catch { /* 输入层也坏了就算了 */ }
    }
  }

  tick(dt) {
    const ui = this.ui;
    const indoor = this.zones.isIndoor;

    this.handleKeys();

    // 时间
    if (!this.paused && !ui.dialogActive && !ui.panelOpen && !this.boardEl) {
      this.time.update(dt);
      if (this.fastNight && this.time.hour > 18.4 && this.time.hour < 20) this.time.hour += dt * 0.05;
    }

    // 天空 / 天气
    this.sky.update(dt, this.time.hour, this.camera.position);
    if (!this.skyIndoor) this.weather.applyLights(this.sky);
    this.weather.update(dt, this.time, this.camera.position);
    updateNightLights(this.sky.nightT, this.weather.rain);

    // 玩家
    if (!this.paused) {
      this.player.update(dt, this.input, this.rig.yaw);
    }

    // 火车与道口
    if (!this.paused) {
      this.town.trainSystem.update(dt, this.time, this.sky.nightT);
      this.town.crossingCtl.update(dt, this.town.trainSystem);
    }
    this.town.train.update(dt, this.sky.nightT);

    // NPC
    if (!this.paused) {
      this.npcs.update(dt, {
        time: this.time, trainSystem: this.town.trainSystem, zones: this.interiorZones,
        collision: this.collision, weather: this.weather, player: this.player,
      });
    }

    // 世界更新
    this.town.update(dt, this.time, this.sky);
    this.updateInteriorDynamic(dt);

    // 交互
    this.interaction.locked = ui.dialogActive || ui.panelOpen || !!this.boardEl;
    this.interaction.update(dt);
    if (this.input.hit('e')) this.interaction.trigger();

    // 事件 / 发现
    if (!this.paused) {
      this.events.update(dt);
      this.stepT += dt;
      if (this.stepT > 0.4) { this.stepT = 0; this.quests.checkDiscoveries(); }
    }

    // 雨伞： indoors 收起来
    const indoorNow = this.zones.isIndoor;
    const raining = !indoorNow && this.weather.rain > 0.25;
    this.player.char.setUmbrella(raining);
    for (const n of this.npcs.list) {
      n.char.setUmbrella(raining && n.zone === 'world');
    }

    // HUD
    ui.updateHUD(this.time, this.weather, this.player);
    this.updateObjectiveMarker();

    // 音频
    this.updateAudio(dt, indoor);

    // 相机
    this.rig.handleInput(this.input);
    if (this.freeCam) {
      this.camera.position.set(...this.freeCam.pos);
      this.camera.lookAt(...this.freeCam.look);
    } else {
      this.rig.update(dt, this.player);
    }
    this.input.endFrame();
    this.renderer.render(this.scene, this.camera);

    // 进度自动落盘
    this._saveT = (this._saveT || 0) + dt;
    if (this._saveT > 30) { this._saveT = 0; this.save(true); }
  }

  handleKeys() {
    if (this.input.hit('escape')) {
      if (this.ui.dialogActive) { this.ui.nextLine(); }
      else if (this.boardEl) this.ui.closeBoard();
      else if (this.ui.panelOpen) this.ui.closePanel();
      else if (this.quests.pendingShop) { this.quests.pendingShop = null; this.ui.toast('没有买什么。', '商店'); }
      else this.ui.togglePanel('settings');
      return;                       // Esc 一帧只做一件事
    }
    if (this.input.hit('j')) this.ui.togglePanel('journal');
    if (this.input.hit('m')) this.ui.togglePanel('map');
    if (this.input.hit('u')) this.ui.togglePanel('people');
    if (this.input.hit('p')) this.save();
    // 店铺柜台：数字键选货
    if (this.quests.pendingShop) {
      for (let i = 0; i < this.quests.pendingShop.stock.length; i++) {
        if (this.input.hit(String(i + 1))) { this.quests.buyItem(this.quests.pendingShop.stock[i].item); break; }
      }
      if (this.input.hit('escape')) { this.quests.pendingShop = null; this.ui.toast('没有买什么。', '商店'); }
    }
  }

  updateInteriorDynamic(dt) {
    for (const d of this.interiorDynamic) {
      if (d.kind !== 'slideDoor') continue;
      const near = dist(this.player.pos.x, this.player.pos.z, d.objs[0].position.x, d.objs[0].position.z) < 3.2
        && this.player.zone === 'konbini';
      d.open = damp(d.open || 0, near ? 1 : 0, 6, dt);
      d.objs[0].position.x = d.baseX0 ?? (d.baseX0 = d.objs[0].position.x);
      d.objs[1].position.x = d.baseX1 ?? (d.baseX1 = d.objs[1].position.x);
      d.objs[0].position.x = d.baseX0 - d.open * 0.62;
      d.objs[1].position.x = d.baseX1 + d.open * 0.62;
    }
  }

  updateObjectiveMarker() {
    const m = this.quests.objectiveMarker;
    this.ui.updateObjectiveArrow(
      m && !this.zones.isIndoor ? m : null,
      this.player.pos, this.rig.yaw,
    );
  }

  updateAudio(dt, indoor) {
    if (!this.audio.ready) return;
    const p = this.player.pos;
    const ts = this.town.trainSystem;
    const trainDist = ts.state === 'idle' ? 999 : Math.abs(ts.x - p.x);
    const sd = streamDistAt(p.x, p.z);
    // 脚步
    this._footAcc = (this._footAcc || 0) + this.player.speed * dt;
    if (this._footAcc > 0.78) {
      this._footAcc = 0;
      const road = this.roadNear(p.x, p.z);
      this.audio.footstep(road, 0.9);
    }
    this.audio.updateAmbience(dt, {
      night: this.sky.nightT,
      rain: this.weather.rain,
      indoors: indoor,
      trainDist,
      nearStream: clamp01(1 - sd / 14),
      wind: this.weather.wind,
    });
    // 虫鸣 / 鸟叫
    this._ambT = (this._ambT || 0) - dt;
    if (this._ambT <= 0) {
      this._ambT = 2.2 + Math.random() * 5;
      if (!indoor) {
        if (this.sky.nightT > 0.5) this.audio.cricket();
        else if (this.weather.rain < 0.2) this.audio.bird();
        else if (this.time.hour > 15 && this.time.hour < 20 && Math.random() < 0.4) this.audio.cicada();
      }
    }
  }

  roadNear(x, z) {
    const d = this._roadDist ? this._roadDist(x, z) : 99;
    if (d < 4) return 'asphalt';
    if (d < 9) return 'gravel';
    return 'grass';
  }

  /* ================================================================ *
   *  存档
   * ================================================================ */
  save(quiet = false) {
    try {
      const data = {
        v: 2,
        time: { day: this.time.day, hour: this.time.hour },
        pos: { x: this.player.pos.x, y: this.player.pos.y, z: this.player.pos.z, yaw: this.player.yaw, zone: this.player.zone },
        inv: this.inventory.serialize(),
        quests: this.quests.serialize(),
        affinity: Object.fromEntries(this.npcs.list.map((n) => [n.id, { a: n.affinity, m: n.met }])),
        weather: { state: this.weather.state },
        flags: { shopLate: !!this.shopLate },
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      return true;
    } catch (e) { return false; }
  }

  async load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) { this.ui.toast('还没有存档。', '存档'); return; }
      const d = JSON.parse(raw);
      if (d.time) { this.time.day = d.time.day; this.time.hour = d.time.hour; }
      this.inventory.load(d.inv);
      this.quests.load(d.quests);
      if (d.affinity) for (const [id, v] of Object.entries(d.affinity)) {
        const n = this.npcs.byId[id];
        if (n) { n.affinity = v.a; n.met = v.m; }
      }
      if (d.weather) { this.weather.state = d.weather.state; this.weather.target = d.weather.state === 'rain' ? 1 : 0; }
      this.shopLate = d.flags?.shopLate;
      if (d.pos) {
        if (d.pos.zone && d.pos.zone !== 'world' && this.interiorZones[d.pos.zone]) {
          // 走正规的进房流程：淡入淡出、相机边界、室内灯光都由 zones 负责
          const at = { x: d.pos.x, y: d.pos.y, z: d.pos.z, yaw: d.pos.yaw };
          await this.zones.enter(d.pos.zone, at);
        } else {
          this.player.teleport(d.pos.x, heightAt(d.pos.x, d.pos.z), d.pos.z, d.pos.yaw);
        }
      }
      this.ui.refreshTracker();
      this.quests.spawnQuestProps();
      return true;
    } catch (e) { this.ui.toast('读取失败。', '存档'); return false; }
  }
}
