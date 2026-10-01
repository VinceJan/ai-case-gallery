// 游戏主控：渲染器、系统装配、主循环、输入路由、存档
import * as THREE from 'three';
import { Input } from './Input.js';
import { AudioEngine } from './Audio.js';
import { TimeSystem } from '../systems/TimeSystem.js';
import { Sky } from './Sky.js';
import { WeatherSystem } from '../systems/WeatherSystem.js';
import { World } from '../world/World.js';
import { Player } from '../player/Player.js';
import { NpcManager } from '../npc/NPCManager.js';
import { QuestSystem } from '../systems/QuestSystem.js';
import { EventSystem } from '../systems/EventSystem.js';
import { UI } from '../ui/UI.js';
import { Save, collectSnapshot, applySnapshot } from './Save.js';
import { itemName } from '../data/items.js';
import { LOCATIONS } from '../world/Layout.js';
import { clamp } from './Utils.js';

const frame = () => new Promise((r) => requestAnimationFrame(() => r()));

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 18, 40);

    this.clock = new THREE.Clock();
    this.input = new Input(canvas);
    this.audio = new AudioEngine();
    this.time = new TimeSystem(this.scene);
    this.sky = new Sky(this.scene);
    this.weather = new WeatherSystem(this.scene);

    // 玩法状态
    this.coins = 800;
    this.items = [];
    this.trust = {};
    this.met = {};
    this.flags = {};
    this.camYaw = Math.PI;
    this.camPitch = 0.42;
    this.camDist = 7;
    this.nearest = null;
    this.started = false;
    this.titleCam = true;
    this.autosaveT = 60;
    this._lastAvail = '';
    this._titleAngle = 0;

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /** 分步构建（带加载进度） */
  async boot() {
    const setP = (p, t) => {
      const f = document.getElementById('loading-bar-fill');
      if (f) f.style.width = `${Math.round(p * 100)}%`;
      const tx = document.getElementById('loading-text');
      if (tx && t) tx.textContent = t;
    };
    setP(0.06, '铺陈地形…');
    await frame();
    this.colliders = [];
    this.interactables = [];
    this.walkables = [];
    this.lights = [];
    this.world = new World(this);

    setP(0.5, '种下樱花…');
    await frame();
    this.player = new Player(this);
    this.npcs = new NpcManager(this);

    setP(0.72, '居民们醒来了…');
    await frame();
    this.quests = new QuestSystem(this);
    this.events = new EventSystem(this);

    setP(0.88, '擦亮招牌…');
    await frame();
    this.ui = new UI(this);

    // 公告板（车站前也放一个）
    this.interactables.push({
      pos: new THREE.Vector3(-13.5, 1, -17.5), radius: 2.2,
      label: () => '查看公告板', prompt: () => '查看公告板', enabled: () => true,
      onUse: () => this.quests.openBoard(),
    });

    setP(1, '准备出发…');
    await frame();
    document.getElementById('loading').classList.add('hidden');
    this.ui.showTitle();
  }

  startLoop() {
    const loop = () => {
      requestAnimationFrame(loop);
      const dt = Math.min(this.clock.getDelta(), 0.05);
      try {
        this.update(dt);
      } catch (e) {
        console.error('update error', e);
      }
      this.renderer.render(this.scene, this.camera);
      this.input.endFrame();
    };
    requestAnimationFrame(loop);
  }

  /* ================= 主更新 ================= */
  update(dt) {
    const focus = this.player ? this.player.pos : { x: 0, z: 0 };
    this.time.update(dt, focus);
    this.weather.update(dt, focus);
    this.sky.update(this.time.env, dt);

    if (!this.started) {
      // 标题画面：世界继续生活，相机缓慢环绕
      this.world.update(dt);
      this.npcs.update(dt);
      this.quests.update(dt);
      this.titleCamera(dt);
      this.ui.update(dt);
      return;
    }

    if (this.ui.blocking) {
      this.ui.handleKeys(this.input);
    } else {
      this.handleHotkeys();
      this.player.update(dt, this.input);
    }

    this.npcs.update(dt);
    this.quests.update(dt);
    this.world.update(dt);
    this.events.update(dt);

    // 交互检测
    if (this.player.state === 'sitting') {
      this.nearest = null;
      this.ui.setPrompt('按 E 站起来');
    } else if (this.player.state === 'riding') {
      this.nearest = null;
    } else {
      this.updateNearestInteractable(this.player.pos);
    }

    // 环境音
    this.audio.update(dt, {
      hour: this.time.hours,
      raining: this.weather.rain,
      trainNear: this.world.railway.near,
      indoor: this.world.isIndoor(this.player.pos),
    });

    // 地名横幅
    this.updateBanner();
    // 列车警示
    const danger = this.world.railway.near > 0.35 && this.world.railway.train.speed > 1.5;
    document.getElementById('danger-vignette').classList.toggle('on', danger);

    // 新委托提示
    const avail = this.quests.available().map((q) => q.id).join(',');
    if (avail !== this._lastAvail) {
      const added = avail.split(',').filter((id) => id && !this._lastAvail.split(',').includes(id));
      this._lastAvail = avail;
      if (added.length && this.started) this.ui.toast('公告板上好像有新的委托…');
    }

    // 自动保存
    this.autosaveT -= dt;
    if (this.autosaveT <= 0) {
      this.autosaveT = 90;
      this.saveGame(true);
    }

    this.ui.update(dt);
  }

  titleCamera(dt) {
    this._titleAngle += dt * 0.045;
    const r = 46;
    this.camera.position.set(
      Math.cos(this._titleAngle) * r,
      20 + Math.sin(this._titleAngle * 0.7) * 3,
      -12 + Math.sin(this._titleAngle) * r
    );
    this.camera.lookAt(0, 6, -6);
  }

  handleHotkeys() {
    const i = this.input;
    if (i.justPressed('Tab')) this.ui.toggleQuestLog();
    if (i.justPressed('KeyM')) this.ui.el.minimapBox.click();
    if (i.justPressed('Escape')) {
      if (this.ui.questLogOpen) this.ui.toggleQuestLog(false);
      else this.ui.togglePause();
    }
    if (i.justPressed('KeyT')) {
      const steps = [1, 3, 8];
      const idx = (steps.indexOf(this.time.boost) + 1) % steps.length;
      this.time.boost = steps[idx];
      this.ui.toast(`时间流速 ×${this.time.boost}`);
    }
    if (i.justPressed('KeyR')) {
      const on = this.weather.toggle();
      this.ui.toast(on ? '下雨了…' : '雨停了。');
    }
    if (i.justPressed('KeyE') || i.justPressed('Space')) {
      this.interact();
      i.consume('KeyE');
      i.consume('Space');
    }
  }

  interact() {
    if (this.player.state === 'sitting') { this.player.stand(); return; }
    if (!this.nearest) return;
    if (this.nearest.npc) { this.npcs.talk(this.nearest.npc.id); return; }
    if (this.nearest.it && this.nearest.it.onUse) this.nearest.it.onUse();
  }

  updateNearestInteractable(pos) {
    let best = null;
    let bestD = Infinity;
    for (const it of this.interactables) {
      if (it.enabled && !it.enabled()) continue;
      const p = it.dynamic ? it.dynamic() : it.pos;
      const d = Math.hypot(p.x - pos.x, p.z - pos.z);
      if (d < it.radius && d < bestD) { bestD = d; best = { it, p }; }
    }
    const npc = this.npcs.nearest(pos, 2.6);
    if (npc && bestD > 2.6) {
      best = { npc };
      bestD = 0;
    }
    this.nearest = best;
    if (best && best.npc) this.ui.setPrompt(`和${best.npc.name}交谈`);
    else if (best && best.it) this.ui.setPrompt(best.it.prompt ? best.it.prompt() : best.it.label());
    else this.ui.setPrompt(null);
  }

  updateBanner() {
    let name = null;
    let bd = 6;
    for (const key of Object.keys(LOCATIONS)) {
      const l = LOCATIONS[key];
      const d = Math.hypot(l.x - this.player.pos.x, l.z - this.player.pos.z);
      if (d < bd) { bd = d; name = l.name; }
    }
    if (name) this.ui.banner(name);
  }

  /* ================= 玩法状态 ================= */
  addItem(id, name) {
    if (this.items.some((i) => i.id === id)) return;
    this.items.push({ id, name: name || itemName(id) });
    this.ui.refreshItems();
    this.audio.itemGet();
  }
  removeItem(id) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx < 0) return false;
    this.items.splice(idx, 1);
    this.ui.refreshItems();
    return true;
  }
  bump(id, n) {
    if (!id) return;
    this.trust[id] = clamp((this.trust[id] || 0) + n, 0, 100);
  }
  setFlag(k, v = true) {
    this.flags[k] = v;
  }
  sleepUntilMorning() {
    this.time.skipTo(7.5);
    this.npcs.clearGather();
    this.audio.bird();
    this.ui.toast('睡了个好觉。早上好。');
    this.saveGame();
  }

  /* ================= 存档 ================= */
  saveGame(silent = false) {
    const ok = Save.write(collectSnapshot(this));
    if (!silent) this.ui.toast(ok ? '已保存' : '保存失败');
  }
  loadGame() {
    const s = Save.read();
    if (!applySnapshot(this, s)) { this.ui.toast('没有存档'); return; }
    this.started = true;
    this.titleCam = false;
    this.player.mesh.group.visible = true;
    this.player.state = 'normal';
    this.ui.hideTitle();
    this.ui.refreshItems();
    this.ui.refreshTracker();
    this.quests.refreshMarkers();
    this.ui.toast('读取存档…欢迎回来');
  }
  newGame() {
    this.coins = 800;
    this.items = [];
    this.trust = {};
    this.met = {};
    this.flags = {};
    this.quests.reset();
    this.time.day = 1;
    this.time.hours = 8.2;
    this.time.boost = 1;
    this.player.pos.set(0, 0, -14);
    this.player.yaw = Math.PI;
    this.player.y = 0;
    this.player.state = 'normal';
    this.player.riding = false;
    this.player.mesh.group.visible = true;
    this.camYaw = Math.PI;
    this.camPitch = 0.42;
    this.camDist = 7;
    this.started = true;
    this.titleCam = false;
    this.ui.hideTitle();
    this.ui.refreshItems();
    this.quests.start('arrival');
    this.ui.toast('春假开始了。去和镇上的人们打个招呼吧。');
    setTimeout(() => this.ui.toast('WASD 移动 · E 交互 · Tab 任务日志'), 2600);
  }
  toTitle() {
    this.started = false;
    this.titleCam = true;
    this.ui.showTitle();
  }
}
