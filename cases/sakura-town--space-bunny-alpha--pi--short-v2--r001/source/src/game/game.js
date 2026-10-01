/**
 * 游戏主体：时间、交互、任务推进、商店、钓鱼、进出门。
 */
import * as THREE from 'three';
import { clamp, lerp } from '../core/utils.js';
import { MaterialLibrary } from '../world/materials.js';
import { World } from '../world/world.js';
import { SkyRig } from '../world/sky.js';
import { BUILDINGS, LANDMARKS, SPAWN, TIME, buildingById, doorPosition } from '../world/layout.js';
import { heightAt, surfaceAt } from '../world/terrain.js';
import { Player } from '../entities/player.js';
import { NPCManager } from '../entities/npc.js';
import { Railway } from '../entities/train.js';
import { Birds, Cat, Pigeons } from '../entities/animals.js';
import { Inventory, ITEMS, QUEST_ITEMS, itemIcon, itemName } from './items.js';
import { clearSave, formatSaveTime, hasSave, loadGame, saveGame, saveMeta } from './save.js';
import { QuestLog } from './quests.js';
import { buildTalk } from './dialogue.js';
import { FISH_STATES, FishingSession } from './fishing.js';
import { boxGeometry, cylinderGeometry, sphereGeometry, toonMaterial } from '../core/toon.js';
import { GeoBuilder } from '../core/geobuilder.js';
import { makeRNG } from '../core/utils.js';

// ---------------------------------------------------------------------------
// 商店
// ---------------------------------------------------------------------------
const SHOPS = {
  store: {
    title: '山田商店',
    sub: '“杂货、蔬果、还有猫的口粮。今天的萝卜很新鲜。”',
    items: [
      { id: 'catfood', price: 60, desc: '小鱼干味，三花的最爱。' },
      { id: 'radish', price: 35, desc: '田中家菜园直送。' },
      { id: 'snack', price: 45, desc: '烤小鱼干，香脆。' },
      { id: 'onigiri', price: 95, desc: '便利店同款饭团，热一下更好吃。', use: 'eat' },
    ],
  },
  konbini: {
    title: '樱花便利店',
    sub: '“24 小时营业。关东煮还热着哦。”',
    items: [
      { id: 'onigiri', price: 95, desc: '鲑鱼 / 梅子 / 海苔，3 选 1。', use: 'eat' },
      { id: 'drink', price: 80, desc: '冰麦茶。', use: 'eat' },
      { id: 'snack', price: 45, desc: '小鱼干。' },
    ],
  },
  ramen: {
    title: '拉面 一龙',
    sub: '“今天也是用当天熬的味噌。”',
    items: [
      { id: 'ramen', price: 380, desc: '一碗热腾腾的味噌拉面。', use: 'eat' },
    ],
  },
  cafe: {
    title: '星光咖啡',
    sub: '“手冲今天用的是危地马拉豆。”',
    items: [
      { id: 'coffee', price: 190, desc: '一杯手冲，站着喝完。', use: 'eat' },
      { id: 'postcard', price: 120, desc: '樱花镇限定明信片。' },
    ],
  },
  izakaya: {
    title: '小酒馆 灯',
    sub: '“一个人来也欢迎。坐吧台就行。”',
    items: [
      { id: 'sake', price: 520, desc: '暖过的清酒，配烤物刚好。', use: 'eat' },
    ],
  },
  station: {
    title: '樱花站',
    sub: '“一天三班。今天 14:07 和 18:23 有车。”',
    items: [
      { id: 'ticket', price: 220, desc: '去往下一站的单程票。留个纪念。' },
      { id: 'postcard', price: 120, desc: '印着站台风景的明信片。' },
    ],
  },
  post: {
    title: '樱花邮局',
    sub: '“寄往全国的邮便，都可以在这里办理。”',
    items: [
      { id: 'postcard', price: 100, desc: '盖一枚樱花町邮戳的明信片。' },
      { id: 'charm', price: 300, desc: '神社同款护身符，据说很灵。' },
    ],
  },
};

const FORTUNES = [
  '今天会有好事发生——至少会有好事发生。',
  '你会在街上遇到一位老朋友。',
  '记得给花坛浇水，会有人记你的好。',
  '傍晚的云很好看，别错过了。',
  '想吃拉面的时候就吃，不要犹豫。',
  '慢一点也没关系，镇上的人都不赶时间。',
  '今天适合散步，适合发呆。',
];

const PLACE_ZONES = [
  { x: 0, z: -76, r: 26, name: '樱桥' },
  { x: -57, z: -50, r: 30, name: '稻荷神社' },
  { x: 38, z: -50, r: 30, name: '河岸公园' },
  { x: -43, z: 38, r: 26, name: '樱花站' },
  { x: 0, z: 52, r: 22, name: '平交道口' },
  { x: 56, z: 34, r: 30, name: '樱花学园' },
  { x: 0, z: -4, r: 22, name: '中央广场' },
  { x: 0, z: 40, r: 16, name: '主街' },
  { x: 0, z: -30, r: 16, name: '主街' },
  { x: 0, z: 76, r: 26, name: '南边水田' },
  { x: 20, z: -64, r: 24, name: '河岸' },
  { x: 30, z: 14, r: 26, name: '住宅区' },
  { x: -30, z: 26, r: 26, name: '住宅区' },
];

export class Game {
  constructor({ engine, input, audio, ui }) {
    this.engine = engine;
    this.input = input;
    this.audio = audio;
    this.ui = ui;
    this.scene = engine.scene;
    this.camera = engine.camera;

    this.state = {
      day: 1,
      hour: TIME.startHour,
      minute: Math.round((TIME.startHour % 1) * 60),
      money: 300,
      bag: {},
      held: null,
      flags: {},
      quests: {},
      log: [],
      stamina: 100,
    };
    this.state.inv = new Inventory(this.state);
    this.state.toast = (t, kind) => this.ui.toast(t, kind);
    this.quests = new QuestLog(this.state);
    this.state.onQuestDone = (q) => {
      this.audio.questDone();
      this.addLog(`完成「${q.title}」`);
    };
    this.state.onQuestStep = () => this.audio.questUpdate();

    this.indoor = null;
    this.fishing = new FishingSession();
    this.paused = false;
    this.notes = new Set();
    this.petalCooldown = new Map();
    this._manualLock = false;
    this._sleeping = false;
    this._wasBlocking = false;
  }

  async init() {
    const scene = this.scene;
    this.sky = new SkyRig(scene, this.engine.renderer);
    this.world = new World(scene, this.sky, this.audio);
    this.world.makeNightLights();
    this.colliders = this.world.colliders;
    this.ground = this.world.ground;

    this.player = new Player({
      scene, camera: this.camera, input: this.input, audio: this.audio,
      colliders: this.colliders, ground: this.ground,
    });
    this.player.spawn = { x: SPAWN.x, z: SPAWN.z, rot: SPAWN.rot };
    this.player.setPosition(SPAWN.x, SPAWN.z, SPAWN.rot);
    this.player.camDistTarget = 5.4;

    this.npcs = new NPCManager(scene, this.audio);
    this.railway = new Railway(scene, this.world.mats, this.colliders, this.audio);

    this.cat = new Cat(scene, this.audio, { x: 34, z: -48 });
    this.pigeons = new Pigeons(scene, { x: 0, z: -4 }, 9);
    this.birds = new Birds(scene, 10);

    this._buildPoints();
    this._buildHeldMesh();

    this.ui.onType = () => {
      const d = this.ui._dlg;
      if (d) this.audio.blip(d.out.length, 'npc');
    };
    this._syncClock();
    this.ui.updateHud(this.hudData());
  }

  // ----------------------------------------------------------------- 场景物件
  _buildPoints() {
    const pts = [];
    for (const lm of LANDMARKS) {
      switch (lm.kind) {
        case 'bench':
          pts.push({ id: lm.id, kind: 'sit', x: lm.x, z: lm.z, radius: 1.5, label: '坐下休息', prompt: 'E', yaw: lm.rot });
          break;
        case 'vending':
          pts.push({ id: lm.id, kind: 'drink', x: lm.x, z: lm.z, radius: 1.6, label: '买饮料（¥80）', prompt: 'E' });
          break;
        case 'fishspot':
          pts.push({ id: lm.id, kind: 'fish', x: lm.x, z: lm.z + 0.6, radius: 2.0, label: '钓鱼', prompt: 'E' });
          break;
        case 'garden':
          pts.push({ id: lm.id, kind: 'garden', x: lm.x, z: lm.z + 1.6, radius: 2.0, label: '照料菜园', prompt: 'E' });
          break;
        case 'bigtree':
          if (lm.blossom) {
            pts.push({ id: lm.id, kind: 'petal', x: lm.x, z: lm.z, radius: 2.0, label: '收集樱花瓣', prompt: 'E' });
          } else {
            pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 1.6, label: '看看这棵树', prompt: 'E' });
          }
          break;
        case 'fountain':
          pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 4.2, label: '看看喷泉', prompt: 'E' });
          break;
        case 'monument':
          pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 2.2, label: '看看纪念碑', prompt: 'E' });
          break;
        case 'torii':
          pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 3.0, label: '看看鸟居', prompt: 'E' });
          break;
        case 'busstop':
          pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 2.0, label: '看看时刻表', prompt: 'E' });
          break;
        case 'mochi':
          pts.push({ id: lm.id, kind: 'buySnack', x: lm.x, z: lm.z, radius: 1.8, label: '买樱饼（¥120）', prompt: 'E' });
          break;
        case 'playground':
          pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 2.4, label: '看看游乐场', prompt: 'E' });
          break;
        case 'mailbox':
          pts.push({ id: lm.id, kind: 'look', x: lm.x, z: lm.z, radius: 1.6, label: '查看邮筒', prompt: 'E' });
          break;
        default:
          break;
      }
    }
    // 学校门口
    pts.push({ id: 'schoolgate', kind: 'look', x: 54, z: 26, radius: 2.6, label: '看看学校', prompt: 'E' });
    // 道口
    pts.push({ id: 'crossing', kind: 'look', x: 6.4, z: 58, radius: 3.0, label: '看着列车通过', prompt: 'E' });
    // 站台（看车）
    pts.push({ id: 'platform', kind: 'look', x: -34, z: 46, radius: 3.0, label: '等列车', prompt: 'E' });
    this.points = [...this.world.doors, ...pts];
  }

  _buildHeldMesh() {
    this.heldRoot = new THREE.Group();
    this.scene.add(this.heldRoot);
  }

  // ----------------------------------------------------------------- 时间
  get timeOfDay() {
    return this.state.hour + this.state.minute / 60;
  }

  get isWeekend() {
    return (this.state.day - 1) % 7 >= 5;
  }

  _advanceTime(dt) {
    const s = this.state;
    s.minute += TIME.minutesPerSecond * dt;
    while (s.minute >= 60) {
      s.minute -= 60;
      s.hour++;
      if (s.hour >= 24) {
        s.hour -= 24;
        s.day++;
        this.addLog(`第 ${s.day} 天开始了`);
        this.ui.toast(`—— 第 ${s.day} 天 ——`);
        this.saveNow(); // 跨天必定存档，避免挂机一整天后刷新就丢
      }
    }
  }

  addLog(text) {
    const t = this._fmtTime();
    this.state.log.unshift(`${t}　${text}`);
    if (this.state.log.length > 40) this.state.log.pop();
  }

  // ----------------------------------------------------------------- 存档
  /**
   * 自动存档：切后台时一定存，其余情况节流 20s。
   * 注意 saveGame() 每次调用都会立即写盘，所以节流放在这里做。
   */
  _autosave() {
    const now = performance.now();
    if (now - (this._lastSave || 0) < 20000) return;
    this._lastSave = now;
    this.saveNow();
  }

  /** 立即存档（返回是否成功） */
  saveNow() {
    if (this._loadingSave) return false;
    const r = saveGame(this.state);
    if (r.ok) {
      this.audio?.save?.();
      this._lastSave = performance.now();
    } else if (r.error === 'storage-unavailable') {
      // 隐私模式：只提醒一次，不要反复弹
      if (!this._warnedStorage) {
        this._warnedStorage = true;
        this.ui.toast('浏览器禁用了本地存储，本次进度不会被保存');
      }
    }
    return r.ok;
  }

  /** 读档：把存档里的字段覆盖回 state，运行时绑定（inv/toast）保持原样 */
  loadNow() {
    const st = loadGame();
    if (!st) return false;
    this._loadingSave = true;
    try {
      for (const k of Object.keys(st)) this.state[k] = st[k];
      // inv / toast / quests 视图必须重新绑到新的 state 上
      this.state.inv = new Inventory(this.state);
      this.state.toast = (t, kind) => this.ui.toast(t, kind);
      this.quests = new QuestLog(this.state);
      this._lastSave = performance.now();
      // 屋内的话把人放回床上，别留在半空
      if (this.indoor) {
        const room = this.world.interiors[this.indoor];
        if (room) this.player.setPosition(room.spawn.x, room.spawn.z, 0);
      } else {
        this.player.setPosition(SPAWN.x, SPAWN.z, SPAWN.rot);
      }
      this.audio?.confirm?.();
      return true;
    } finally {
      this._loadingSave = false;
    }
  }

  /** 标题画面用：有没有存档可以继续 */
  saveSummary() {
    const m = saveMeta();
    if (!m) return null;
    return {
      day: m.day,
      money: m.money,
      time: `${String(Math.floor(m.hour)).padStart(2, '0')}:${String(Math.floor((m.hour % 1) * 60)).padStart(2, '0')}`,
      when: formatSaveTime(m.at),
    };
  }

  _fmtTime() {
    const h = Math.floor(this.state.hour);
    const m = Math.floor(this.state.minute);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  placeAt(x, z) {
    let best = '樱花町';
    let bd = 26;
    for (const p of PLACE_ZONES) {
      const d = Math.hypot(x - p.x, z - p.z);
      if (d < p.r && d < bd) {
        bd = d;
        best = p.name;
      }
    }
    return best;
  }

  hudData() {
    const s = this.state;
    const q = this.quests.active()[0];
    const step = q ? this.quests.step(q.id) : null;
    return {
      timeText: this._fmtTime(),
      day: s.day,
      dayName: TIME.dayNames[(s.day - 1) % 7],
      money: s.money,
      place: this.indoor ? this.world.interiors[this.indoor].label : this.placeAt(this.player.pos.x, this.player.pos.z),
      hour: s.hour,
      minute: s.minute,
      goal: step ? { text: step.text, title: q.title } : (q ? { text: '与镇民聊聊推进任务', title: q.title } : null),
    };
  }

  // ----------------------------------------------------------------- 主循环
  update(dt) {
    if (this.paused) {
      this.ui.updateHud(this.hudData());
      return;
    }
    const s = this.state;
    const ctx = {
      time: this.engine.elapsed,
      hour: this.timeOfDay,
      weekend: this.isWeekend,
    };

    this._advanceTime(dt);

    // 专注：天空
    const focus = this.indoor
      ? this.world.interiors[this.indoor].center
      : this.player.mesh.position;
    this.sky.update(this.timeOfDay, focus, dt);
    const night = this.sky.nightFactor;
    this.world.setNightFactor(night);
    this.world.update(dt, ctx);

    // 玩家
    const wasIndoor = !!this.indoor;
    this.player.locked = this._manualLock || this.uiBlocking || this.fishing.active || this._sleeping;
    // 面板 / 对话 / 睡觉时锁住视角，其它时候鼠标可以自由转
    this.player.camLocked = this.uiBlocking || this._sleeping || this.player.holdingPose === 'sleep';
    this.player.update(dt);
    this._syncHeld();

    // NPC
    this.npcs.update(dt, ctx);

    // 铁路
    this.railway.update(dt, ctx);

    // 动物
    this.cat.update(dt, this.player.pos);
    this.pigeons.update(dt, this.player.pos);
    this.birds.update(dt, this.player.pos.x, this.player.pos.z);
    this._catProximity();
    this._watchTrain();

    // 交互
    this._updateInteract(dt);

    // 钓鱼
    this._updateFishing(dt);

    // 体力
    const speed = Math.hypot(this.player.vel.x, this.player.vel.z);
    if (speed > 4.6) s.stamina = clamp(s.stamina - dt * 3.4, 0, 100);
    else s.stamina = clamp(s.stamina + dt * 1.8, 0, 100);
    this.player.speedMul = s.stamina <= 1 ? 0.55 : 1;

    // 任务
    this.quests.update();

    // 时钟指针
    this._updateClockHands();

    // UI
    this.ui.updateHud(this.hudData());
    if (this.indoor) {
      this.ui.setMinimapVisible(false);
    } else {
      this.ui.setMinimapVisible(true);
        this.ui.updateMinimap(
        { x: this.player.pos.x, z: this.player.pos.z, yaw: this.player.yaw },
        this.npcs.list.map((n) => ({ x: n.pos.x, z: n.pos.z, visible: n.mesh.visible })),
        this.railway.headPosition(),
        night,
      );
    }
    this.audio.updateAmbience(dt, this.timeOfDay, wasIndoor, this._ambienceCtx());

    // 打开面板时释放指针锁定：否则光标被隐藏，就点不到商店里的购买按钮了
    const blocking = this.uiBlocking;
    if (blocking && !this._wasBlocking) this.input.exitPointerLock();
    this._wasBlocking = blocking;
    this.ui.setLockHint(!this.indoor && !blocking && !this.input.pointerLocked && this.input.dragLook);
    if (this.settings) this.ui.setHintsVisible(this.settings.get('showHints'));

    this.input.endFrame();
  }

  _syncHeld() {
    const held = this.state.held;
    if (held === this._lastHeld) return;
    this._lastHeld = held;
    this.player.clearCarrying();
    if (held) {
      const mesh = this._makeItemMesh(held);
      if (mesh) this.player.setCarrying(mesh);
    }
  }

  /** 钓鱼时手里的竿（带握把、竿环和轮） */
  _makeRodMesh() {
    const b = new GeoBuilder('rod');
    const m = this.world.mats;
    // 竿身：向斜前方伸出
    b.add(cylinderGeometry(0.018, 0.032, 2.4, 6), m.woodDark, { x: 0, y: 0.1, z: 0, rx: Math.PI / 2 - 0.25 });
    // 握把
    b.add(cylinderGeometry(0.035, 0.035, 0.3, 6), m.wood, { x: 0, y: 0.12, z: -0.34, rx: Math.PI / 2 - 0.25 });
    // 竿环
    b.add(new THREE.TorusGeometry(0.045, 0.012, 5, 10), m.metal, { x: 0, y: 0.42, z: 0.72, rx: Math.PI / 2 - 0.25 });
    // 纺车轮
    b.add(cylinderGeometry(0.06, 0.06, 0.05, 8), m.metalDark, { x: 0.07, y: 0.16, z: -0.22, rz: Math.PI / 2 });
    const g = b.build({ thickness: 0.012 });
    g.traverse((o) => { if (o.isMesh) o.castShadow = false; });
    return g;
  }

  _setFishingRod(on) {
    if (on && !this._rodMesh) this._rodMesh = this._makeRodMesh();
    const p = this.player.mesh.userData.parts;
    if (on) {
      if (this._rodMesh && this._rodMesh.parent !== p.armR) {
        this._rodMesh.position.set(0, -0.5, 0.2);
        this._rodMesh.rotation.set(0, 0, 0);
        p.armR.add(this._rodMesh);
      }
    } else if (this._rodMesh && this._rodMesh.parent) {
      this._rodMesh.parent.remove(this._rodMesh);
    }
  }

  _makeItemMesh(id) {
    const b = new GeoBuilder('item');
    const m = this.world.mats;
    switch (id) {
      case 'parcel':
        b.add(boxGeometry(0.3, 0.22, 0.24), m.accentFor(0xc8a878));
        b.add(boxGeometry(0.32, 0.04, 0.26), m.accentFor(0x8a6a4a), { y: 0.11 });
        break;
      case 'fish':
        b.add(sphereGeometry(0.13, 8), m.accentFor(0x9ac0d8), { sz: 2.0, sy: 0.7 });
        b.add(new THREE.ConeGeometry(0.07, 0.12, 4), m.accentFor(0x9ac0d8), { x: -0.2, rz: Math.PI / 2 });
        break;
      case 'radish':
        b.add(new THREE.ConeGeometry(0.09, 0.3, 7), m.accentFor(0xe87f7f), { ry: Math.PI });
        b.add(sphereGeometry(0.05, 6), m.accentFor(0x5f8f4a), { y: 0.2 });
        break;
      case 'petal':
        b.add(new THREE.SphereGeometry(0.11, 6), m.sakura, { sz: 0.35 });
        break;
      case 'ramen':
      case 'onigiri':
        b.add(new THREE.CylinderGeometry(0.12, 0.09, 0.2, 10), m.accentFor(0xf0ece0));
        b.add(new THREE.SphereGeometry(0.1, 8), m.accentFor(0xfaf6ec), { y: 0.12, sy: 0.6 });
        break;
      case 'coffee':
      case 'drink':
        b.add(new THREE.CylinderGeometry(0.07, 0.06, 0.24, 10), m.accentFor(0xd88a4a));
        b.add(cylinderGeometry(0.075, 0.075, 0.04, 10), m.accentFor(0xf0ece0), { y: 0.12 });
        break;
      case 'charm':
        b.add(boxGeometry(0.16, 0.2, 0.06), m.accentFor(0xd84a5a));
        b.add(boxGeometry(0.17, 0.05, 0.07), m.accentFor(0xf0e0c0), { y: 0.06 });
        break;
      case 'catfood':
      case 'snack':
        b.add(boxGeometry(0.16, 0.2, 0.08), m.accentFor(0xe8b64c));
        b.add(new THREE.CircleGeometry(0.05, 8), m.accentFor(0xd86a4a), { z: 0.05, noOutline: true });
        break;
      default:
        b.add(boxGeometry(0.2, 0.2, 0.2), m.accentFor(0xd8b8a0));
        break;
    }
    const g = b.build({ thickness: 0.012 });
    g.traverse((o) => {
      if (o.isMesh) o.castShadow = false;
    });
    return g;
  }

  _updateClockHands() {
    const h = this.state.hour % 12;
    const mi = this.state.minute;
    for (const c of this.clockHands) {
      const d = c.userData.clock;
      if (!d) continue;
      d.hourH.rotation.z = -(h + mi / 60) * (Math.PI / 6);
      d.minH.rotation.z = -mi * (Math.PI / 30);
      d.hourH2.rotation.z = d.hourH.rotation.z;
      d.minH2.rotation.z = d.minH.rotation.z;
    }
  }

  _syncClock() {
    this.clockHands = [];
    this.scene.traverse((o) => {
      if (o.userData && o.userData.clock) this.clockHands.push(o);
    });
  }

  // ----------------------------------------------------------------- 交互
  get uiBlocking() {
    return this.ui.blocking;
  }

  _candidatePoints() {
    if (this.indoor) {
      const room = this.world.interiors[this.indoor];
      return [...room.interactables, { id: 'exitDoor', kind: 'exit', x: room.exit.x, z: room.exit.z, radius: 1.6, label: '出门', prompt: 'E' }];
    }
    return this.points;
  }

  _updateInteract(dt) {
    const key = (c) => this.input.justPressedRaw(c);
    const blocked = this.uiBlocking || this.fishing.active;
    this.currentTarget = null;
    if (!blocked) {
      const p = this.player.pos;
      const fwd = this.player.camForward;
      let best = null;
      let bestScore = -Infinity;
      for (const it of this._candidatePoints()) {
        const dx = it.x - p.x;
        const dz = it.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d > (it.radius || 1.8) + 0.4) continue;
        const dot = d < 0.01 ? 1 : (dx / d) * fwd.x + (dz / d) * fwd.z;
        if (dot < 0.25 && d > 1.0) continue;
        const score = dot * 2 - d * 0.35;
        if (score > bestScore) {
          bestScore = score;
          best = it;
        }
      }
      // NPC
      const npc = this.npcs.nearest(p.x, p.z, 3.2);
      if (npc) {
        const d = Math.hypot(npc.pos.x - p.x, npc.pos.z - p.z);
        const dot = d < 0.01 ? 1 : ((npc.pos.x - p.x) / d) * fwd.x + ((npc.pos.z - p.z) / d) * fwd.z;
        const score = dot * 2.4 - d * 0.35 + 0.3;
        if (dot > 0.2 || d < 1.6) {
          if (score > bestScore) {
            bestScore = score;
            best = {
              id: `npc_${npc.def.id}`, kind: 'talk', npc, x: npc.pos.x, z: npc.pos.z,
              radius: 3.2, label: `和 ${npc.name} 说话`, prompt: 'E',
            };
          }
        }
      }
      // 猫
      if (!this.cat.gone) {
        const d = Math.hypot(this.cat.pos.x - p.x, this.cat.pos.z - p.z);
        if (d < 1.5) {
          const score = 3.2 - d;
          if (score > bestScore) {
            bestScore = score;
            best = {
              id: 'cat', kind: 'cat', x: this.cat.pos.x, z: this.cat.pos.z, radius: 1.5,
              label: this.cat.following ? '摸摸三花' : '摸摸这只猫', prompt: 'E',
            };
          }
        }
      }
      this.currentTarget = best;
    }

    // 提示
    if (this.currentTarget) {
      this.ui.setPrompt(this.currentTarget.label, this._targetSub());
    } else {
      this.ui.setPrompt(null);
    }

    // 键盘
    if (!this.ui.dialogueOpen && key('KeyE') && this.currentTarget) {
      this._doInteract(this.currentTarget);
    }
    if (key('KeyJ')) {
      if (this.ui.journalOpen) this.ui.hideJournal();
      else this.ui.showJournal(this.journalData());
    }
    if (key('KeyF') && !this.ui.dialogueOpen && this.state.held) {
      // 把手持物品递给面前的人
      let target = null;
      if (this.currentTarget && this.currentTarget.kind === 'talk') target = this.currentTarget.npc;
      if (!target) {
        target = this.npcs.nearest(this.player.pos.x, this.player.pos.z, 2.8);
      }
      if (target) {
        this._giveToNpc(target, this.state.held);
      } else {
        this.audio.cancel();
        this.ui.toast('附近没有人可以递东西');
      }
    }
    if (key('KeyH')) {
      if (this.ui.helpOpen) this.ui.hideHelp();
      else this.ui.showHelp();
    }
    if (key('KeyK') || (key('KeyO') && !this.input.down('ShiftLeft'))) {
      if (this.settings) {
        if (this.settings.isOpen()) this.settings.close();
        else this.settings.open();
      }
    }
    if (this.settings && this.settings.isOpen() && key('Escape')) {
      this.settings.close();
    }
    if (key('Escape')) {
      if (this.settings && this.settings.isOpen()) { this.settings.close(); return; }
      if (this.ui.shopOpen) this.closeShop();
      else if (this.ui.journalOpen) this.ui.hideJournal();
      else if (this.ui.helpOpen) this.ui.hideHelp();
      else if (this.player.holdingPose === 'sit') this._standUp();
      else if (this.player.holdingPose === 'sleep') { this.player.standUp(); this.player.holdingPose = null; }
      else this.input.exitPointerLock();
    }
    if (this.ui.dialogueOpen) {
      this.ui.advanceDialogue(dt);
      if (key('KeyE') || key('Space') || key('Enter')) this.ui.nextDialogue();
    } else if (this.ui.shopOpen && key('KeyE')) {
      this.closeShop();
    }
  }

  _targetSub() {
    const t = this.currentTarget;
    if (!t) return '';
    if (t.kind === 'talk') {
      const hour = this.timeOfDay;
      const act = t.npc.currentSchedule(hour, this.isWeekend);
      const label = { sleep: '休息中', work: '工作', sit: '小酌', idle: '发呆', walk: '散步', fish: '钓鱼', pray: '参拜', play: '玩耍' }[act.act] || act.act;
      // 如果有可以送给这个人的物品，提示一下
      const held = this.state.held;
      const giveable = held && this._canGive(t.npc, held) ? `　·　可递上 ${itemIcon(held)}` : '';
      return `${t.npc.def.age} · 现在在${label}${giveable}`;
    }
    return '';
  }

  /** 判断这个物品能不能给这个 NPC（用于提示，不实际消耗） */
  _canGive(npc, id) {
    if (!this.state.inv.has(id)) return false;
    if (this.state.flags[`gave_${npc.def.id}_${id}`]) return false;
    return true;
  }

  _doInteract(t) {
    const s = this.state;
    switch (t.kind) {
      case 'door':
        this.enterBuilding(t);
        break;
      case 'exit':
        this.exitBuilding();
        break;
      case 'talk':
        this.talkTo(t.npc);
        break;
      case 'sit':
        this.sitDown(t);
        break;
      case 'look':
        this.lookAt(t);
        break;
      case 'petal':
        this.takePetal(t);
        break;
      case 'garden':
        this.waterGarden(t);
        break;
      case 'fish':
        this.startFishing();
        break;
      case 'drink':
        this.buyOne('drink', 80);
        break;
      case 'buySnack':
        this.buyOne('petal', 120, '🌸 一份樱花口味的点心', () => {
          this.ui.dialogue.classList.remove('on');
        });
        break;
      case 'cat':
        this.petCat();
        break;
      case 'shop':
        this.openShop(t.shop);
        break;      case 'bed':
        this.prepareSleep(t);
        break;
      case 'fridge':
        this.eatFromFridge();
        break;
      case 'item':
        this.takeInteriorItem(t);
        break;
      case 'offer':
        this.offerAtShrine();
        break;
      default:
        break;
    }
  }

  // ------------------------------------------------------------------ 进门
  enterBuilding(door) {
    const spec = buildingById(door.building);
    if (!spec) return;
    this.audio.door(true);
    this.indoor = door.interior;
    this.world.setIndoor(door.interior);
    this.player.colliders = this.world.activeColliders;
    this._setOutdoorActors(false);
    const room = this.world.interiors[door.interior];
    this.player.indoors = true;
    this.player.setPosition(room.spawn.x, room.spawn.z, 0);
    this.player.camDistTarget = 3.4;
    this.player.camPitch = 0.34;
    this.player.camDist = 3.4;
    this.ui.toast(`${spec.label}`);
  }

  exitBuilding() {
    const id = this.indoor;
    this.indoor = null;
    this.audio.door(false);
    this.world.setIndoor(null);
    this.player.colliders = this.world.activeColliders;
    this._setOutdoorActors(true);
    this.player.indoors = false;
    this.player.camDistTarget = 6.0;
    this.player.camPitch = 0.22;
    const spec = BUILDINGS.find((b) => b.interior === id);
    if (spec) {
      const d = doorPosition(spec);
      this.player.setPosition(d.x + d.dirX * 0.6, d.z + d.dirZ * 0.6, spec.rot);
    }
  }

  /** 室内时把铁道、居民、猫狗都收起来，避免穿帮 */
  _setOutdoorActors(on) {
    if (this.railway) this.railway.group.visible = on;
    if (this.npcs) for (const n of this.npcs.list) { n.hidden = !on; n.mesh.visible = on && n.act !== 'sleep'; }
    if (this.cat) this.cat.mesh.visible = on && !this.cat.gone;
    if (this.pigeons) for (const p of this.pigeons.list) p.mesh.visible = on;
    if (this.birds) for (const b of this.birds.list) b.mesh.visible = on;
    if (this.player) this.player.mesh.visible = true;
  }

  // ------------------------------------------------------------------ 对话
  talkTo(npc) {
    const s = this.state;
    const id = npc.def.id;
    if (!s.flags[`met_${id}`]) {
      s.flags[`met_${id}`] = true;
      npc.known = true;
    }
    npc.faceTowards(this.player.pos.x, this.player.pos.z);
    npc.say('happy');
    // 任务钩子
    if (id === 'tanaka' && this.state.inv.has('parcel') && this.quests.status('delivery') === 'active') {
      this.state.inv.remove('parcel');
      s.flags.delivered_parcel = true;
      this.audio.chime(true);
    }
    if (id === 'misaki' && this.cat.following && this.quests.status('lostcat') === 'active') {
      s.flags.catReturned = true;
      this.cat.following = false;
      this.cat.setHome(38, -50);
      this.audio.chime(true);
    }
    if (id === 'koyo' && s.inv.has('fish') && this.quests.status('firstfish') === 'active') {
      s.inv.remove('fish');
      s.flags.fishDelivered = true;
      this.audio.chime(true);
    }
    if (id === 'kenji' && s.flags.sawTrain && this.quests.status('watchtrain') === 'active') {
      s.flags.talked_kenji_train = true;
    }

    const lines = buildTalk(npc, s);
    this._manualLock = true;
    this.ui.showDialogue(lines, () => {
      this._manualLock = false;
    });
    this.addLog(`和${npc.name}聊了聊`);
  }

  // ------------------------------------------------------------------ 交互细项
  sitDown(t) {
    if (this.player.holdingPose === 'sit') {
      this._standUp();
      return;
    }
    // 坐到长椅上（而不是坐在空气里）：长椅的座面略高于地面
    const seatY = (t.yaw || 0) + Math.PI; // 面向长椅靠背的反方向 = 坐在椅子上朝前
    this.player.sitAt(t.x, t.z, seatY);
    this._manualLock = false;
    this.ui.toast('休息了一会儿……体力恢复了');
    this.state.stamina = clamp(this.state.stamina + 26, 0, 100);
    this.addLog('在长椅上休息了一下');
    clearTimeout(this._sitTimer);
    this._sitTimer = setTimeout(() => this._standUp(), 5000);
  }

  _standUp() {
    clearTimeout(this._sitTimer);
    this.player.standUp();
  }

  lookAt(t) {
    const LINES = {
      fountain: ['喷泉的水很凉，能听见叮咚的声音。', '池子里有几片落樱，慢慢打着转。'],
      monument: ['这是镇民为建镇时捐的那棵树立的碑。', '碑座上摆着今早的花。'],
      torii: ['穿过鸟居，就是通往稻荷神社的参道。', '朱红的柱子，据说摸一摸会带来好运。'],
      busstop: ['时刻表：8:12 / 14:07 / 18:23。', '下一班还有 12 分钟。'],
      schoolgate: ['放学时间，操场上传来吵闹声。', '美咲说她最喜欢算术课——虽然听起来不像。'],
      crossing: ['道口的警铃还没响，现在过去是安全的。', '铁轨被太阳晒得发烫，能看见远处的热气。'],
      platform: ['站台上很安静，只有广播的电流声。', '列车进站时，风会把你的头发吹起来。'],
      mailLook: ['邮筒是旧的，但每天都有信被送走。'],
    };
    const map = {
      fountain: 'fountain', monument: 'monument', torii: 'torii', busstop: 'busstop',
      schoolgate: 'schoolgate', crossing: 'crossing', platform: 'platform', mailbox: 'mailLook',
    };
    const key = map[t.id];
    const pool = key && LINES[key] ? LINES[key] : ['镇上的日常，就从这里开始。', '没什么特别的，但看起来不错。'];
    const text = pool[Math.floor(Math.random() * pool.length)];
    this.ui.toast(text);
  }

  takePetal(t) {
    // 每棵树每天最多 2 片，天亮恢复
    const key = `${t.id}`;
    const counts = this.state.flags.petalTaken || (this.state.flags.petalTaken = {});
    if ((counts[key] || 0) >= 2) {
      this.ui.toast('这棵树下的花瓣都捡完了，换一棵吧');
      return;
    }
    counts[key] = (counts[key] || 0) + 1;
    this.state.inv.add('petal', 1);
    this.audio.pickup();
    this.ui.toast(`得到 🌸 樱花瓣（${this.state.inv.count('petal')}）`);
    this.addLog('在樱树下捡到一片完整的樱花瓣');
  }

  waterGarden(t) {
    const s = this.state;
    const active = this.quests.status('garden') === 'active';
    if (s.flags.gardenWatered && !active) {
      this.ui.toast('菜园已经浇过水了，长得很好。');
      return;
    }
    s.flags.gardenWatered = true;
    this.audio.splash();
    this.ui.toast('咕嘟咕嘟……菜园浇好水了');
    if (active) this.addLog('帮花子浇了菜园');
    if (this.quests.status('garden') === 'active') {
      const n = 1;
      if (s.inv.count('radish') < 3) {
        s.inv.add('radish', n);
        this.ui.toast(`收获 🥕 萝卜（${s.inv.count('radish')}/3）`);
      }
    } else if (Math.random() < 0.5) {
      s.inv.add('radish', 1);
      this.ui.toast(`顺手收了 🥕 萝卜（${s.inv.count('radish')}）`);
    }
  }

  petCat() {
    const cat = this.cat;
    const questActive = this.quests.status('lostcat') === 'active';
    if (!cat.following) {
      cat.pet();
      if (questActive) {
        this.state.flags.catFound = true;
        cat.following = true;
        this.ui.toast('三花认得你了！它一直跟着你');
        this.audio.chime(true);
      } else {
        this.ui.toast('这只猫不太黏人……');
      }
    } else {
      cat.pet();
      this.ui.toast(`三花的满足度：${Math.round(cat.mood * 100)}%`);
    }
  }

  _catProximity() {
    if (this.cat.gone) return;
    if (this.quests.status('lostcat') !== 'active') return;
    if (this.state.flags.catFound) return;
    const d = Math.hypot(this.cat.pos.x - this.player.pos.x, this.cat.pos.z - this.player.pos.z);
    if (d < 1.4) {
      this.state.flags.catFound = true;
      this.cat.following = true;
      this.ui.toast('你发现了一只白色的猫！它好像一直在等你');
      this.audio.chime(true);
      this.addLog('在河边公园找到了走丢的「三花」');
    }
  }

  _watchTrain() {
    if (this.state.flags.sawTrain) return;
    if (this.quests.status('watchtrain') !== 'active') return;
    if (!this.railway.isAtStation) return;
    const p = this.player.pos;
    if (p.x > -72 && p.x < -22 && p.z > 42 && p.z < 50) {
      this.state.flags.sawTrain = true;
      this.ui.toast('列车进站了！风把樱花瓣卷了起来');
      this.player.addShake(0.7);
      this.audio.chime(true);
      this.addLog('在站台看了一班列车进站');
    }
  }

  // ------------------------------------------------------------------ 钓鱼
  startFishing() {
    const s = this.state;
    if (this.fishing.active) return; // 已经在钓鱼了就别重复抛竿
    if (s.stamina < 12) {
      this.ui.toast('有点累了，先歇一会儿吧');
      return;
    }
    this.fishing.start();
    this.player.holdingPose = 'fishing';
    this._setFishingRod(true);
    this.ui.toast('抛竿……');
  }

  _updateFishing(dt) {
    const f = this.fishing;
    if (!f.active) {
      this.ui.setFishing(null);
      return;
    }
    const key = (c) => this.input.justPressedRaw(c);
    const holding = this.input.down('KeyE') || this.input.down('Space');

    if (f.state === FISH_STATES.BITE && (key('KeyE') || (holding && f.t > 0.32))) {
      f.state = FISH_STATES.REEL;
      this.ui.toast('上钩了！按住 E 收线，把指针保持在绿区');
      this.audio.splash();
    }
    if ((f.state === FISH_STATES.WAITING || f.state === FISH_STATES.CASTING) && key('KeyE')) {
      f.t = Math.max(f.t, f.biteWindow - 0.6);
    }
    if (key('Escape')) {
      this.ui.toast('收竿了');
      this._endFishing();
      return;
    }
    f.update(dt, holding);
    this.ui.setFishing(f.hud());

    if (f.state === FISH_STATES.RESULT) {
      if (f.resultTimer > 1.1 && !this._fishDone) {
        this._fishDone = true;
        if (f.result) {
          this.state.inv.add('fish', 1);
          this.state.flags.caughtFish = true;
          this.audio.chime(true);
          this.ui.toast('钓到一条鱼！送去拉面店试试');
          this.addLog('在河边钓到了一条鱼');
        } else {
          this.ui.toast('鱼跑了……下次稳住指针');
        }
        this._endFishing();
      }
    }
  }

  _endFishing() {
    this._fishDone = false;
    this.fishing.reset();
    this.ui.setFishing(null);
    this._setFishingRod(false);
    this.player.holdingPose = null;
  }

  // ------------------------------------------------------------------ 商店
  openShop(id) {
    const def = SHOPS[id];
    if (!def) return;
    this._manualLock = true;
    const items = def.items.map((it) => ({
      ...it,
      name: itemName(it.id),
      icon: itemIcon(it.id),
    }));
    this.ui.showShop({
      title: def.title,
      sub: def.sub,
      items,
      money: this.state.money,
      onBuy: (it) => this.buyItem(def, it),
    });
  }

  closeShop() {
    this.ui.hideShop();
    this._manualLock = false;
  }

  buyItem(def, it) {
    const s = this.state;
    if (s.money < it.price) {
      this.audio.purchase(false);
      this.ui.toast('钱不够了');
      return;
    }
    s.money -= it.price;
    this.audio.cash();
    if (it.use === 'eat') {
      this.ui.toast(`${itemIcon(it.id)} ${itemName(it.id)}　体力 +40`);
      s.stamina = clamp(s.stamina + 40, 0, 100);
      this.addLog(`在${def.title}吃了${itemName(it.id)}`);
    } else {
      s.inv.add(it.id, 1);
      this.ui.toast(`获得 ${itemIcon(it.id)} ${itemName(it.id)}`);
      this.addLog(`在${def.title}买了${itemName(it.id)}`);
    }
    this.ui.updateShopMoney(s.money);
  }

  buyOne(id, price, msg, after) {
    const s = this.state;
    if (s.money < price) {
      this.ui.toast('钱不够了');
      this.audio.purchase(false);
      return;
    }
    s.money -= price;
    this.audio.cash();
    this.ui.toast(msg || `获得 ${itemIcon(id)} ${itemName(id)}`);
    s.stamina = clamp(s.stamina + 12, 0, 100);
    after?.();
  }

  eatFromFridge() {
    if (this.state.stamina > 92) {
      this.ui.toast('现在并不饿。');
      return;
    }
    this.state.stamina = clamp(this.state.stamina + 35, 0, 100);
    this.audio.pickup();
    this.ui.toast('从冰箱拿了点东西吃　体力 +35');
    this.addLog('在家吃了点东西');
  }

  takeInteriorItem(t) {
    if (this.state.inv.has(t.item)) {
      this.ui.toast('已经有足够的了');
      return;
    }
    this.state.inv.add(t.item, 1);
    this.audio.pickup();
    this.ui.toast(`获得 ${itemIcon(t.item)} ${itemName(t.item)}`);
  }

  offerAtShrine() {
    const s = this.state;
    const key = `offer_${s.day}`;
    if (s.flags[key]) {
      const f = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      this.ui.toast(`你又参拜了一次。\n「${f}」`);
      return;
    }
    s.flags[key] = true;
    const f = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    this.audio.chime(true);
    s.money -= 0;
    this.ui.toast(`你在赛钱箱投了 5 枚硬币。\n御神说：「${f}」`);
    this.addLog(`在稻荷神社参拜：${f}`);
  }

  /** 环境音需要的上下文（高度 / 室内 / 临水） */
  _ambienceCtx() {
    const p = this.player.pos;
    const g = this.world.ground;
    const ground = g.atOutdoor ? g.atOutdoor(p.x, p.z) : 0;
    const height = Math.max(0, p.y - ground);
    let nearWater = false;
    try {
      nearWater = this.world.riverDistAt(p.x, p.z) < 17;
    } catch (e) { /* 取不到就当不临水 */ }
    return { height, indoor: this.indoor, nearWater };
  }

  // ----------------------------------------------------------------- 背包使用
  /**
   * 使用一个背包物品。
   * @param {string} id 物品 id
   * @param {object} [ctx] { targetNpc } 额外上下文（比如对准某个人递过去）
   */
  useItem(id, ctx = {}) {
    const s = this.state;
    if (!s.inv.has(id)) {
      this.audio.cancel();
      this.ui.toast('没有这个了');
      return false;
    }
    const def = ITEMS[id] || {};
    const npc = ctx.targetNpc;
    // 食物：直接吃，回体力
    if (def.food) {
      s.inv.remove(id);
      s.stamina = clamp(s.stamina + def.food, 0, 100);
      s.held = null;
      this.audio.pickup();
      this.ui.toast(`${itemIcon(id)} ${def.name}　体力 +${def.food}`);
      this.addLog(`吃了${def.name}`);
      return true;
    }
    // 对着人：赠送 / 交付
    if (npc) {
      const handled = this._giveToNpc(npc, id);
      if (handled) return true;
    }
    // 御守：贴身收藏
    if (id === 'charm') {
      s.inv.remove(id);
      s.held = id;
      this.audio.chime(true);
      this.ui.toast('🧧 御守已贴身收好');
      this.addLog('把御守收进了口袋');
      return true;
    }
    // 任务道具但没给对人
    if (QUEST_ITEMS.has(id)) {
      this.audio.cancel();
      this.ui.toast(`${def.name || id}　得交给对应的人才行（${def.use || ''}）`);
      return false;
    }
    // 车票/明信片：收藏
    s.inv.remove(id);
    s.held = id;
    this.audio.pickup();
    this.ui.toast(`收下了 ${itemIcon(id)} ${def.name || id}`);
    return true;
  }

  /** 把物品交给某个 NPC；成功返回 true */
  _giveToNpc(npc, id) {
    const s = this.state;
    const nid = npc.def.id;
    const key = `gave_${nid}_${id}`;
    if (s.flags[key]) {
      this.ui.toast(`${npc.name} 已经有了。`);
      this.audio.cancel();
      return true;
    }
    // 特定交付
    if (nid === 'tanaka' && id === 'parcel') { this.talkTo(npc); return true; }
    if (nid === 'koyo' && id === 'fish') { this.talkTo(npc); return true; }
    if (nid === 'yui' && id === 'petal') { this.talkTo(npc); return true; }
    // 小鱼干/猫粮喂猫（给谁都能成立，只是回一句）
    if (id === 'catfood' || id === 'snack') {
      s.inv.remove(id);
      s.held = null;
      s.flags[key] = true;
      this.cat.pet();
      this.cat.mood = 1;
      this.audio.heart();
      this.ui.toast(`${npc.name} 收下了 ${itemIcon(id)} ${itemName(id)}`);
      this.addLog(`把${itemName(id)}给了${npc.name}`);
      return true;
    }
    // 萝卜给谁都能送
    if (id === 'radish') {
      s.inv.remove(id);
      s.held = null;
      s.flags[key] = true;
      this.audio.heart();
      this.ui.toast(`${npc.name}：「谢谢！正好做饭要用。」`);
      return true;
    }
    // 未匹配的普通赠送
    s.inv.remove(id);
    s.held = null;
    s.flags[key] = true;
    this.audio.heart();
    this.ui.toast(`${npc.name}：「谢啦，这个我喜欢。」`);
    this.addLog(`把${itemName(id)}送给了${npc.name}`);
    return true;
  }
  prepareSleep(t) {
    if (this._sleeping) return;
    if (this.player.holdingPose === 'sleep') {
      this.sleep();
      return;
    }
    // 躺到床上
    if (t) this.player.lieDownAt(t.x, t.z, t.yaw ?? Math.PI);
    else this.player.holdingPose = 'sleep';
    this._manualLock = false;
    this.ui.toast('按 E 睡到明天早上 · Esc 起身');
  }

  async sleep() {
    if (this._sleeping) return;
    this._sleeping = true;
    this.player.standUp();
    this.player.holdingPose = null;
    this.ui.setPrompt(null);
    this.ui.setHudVisible(false);
    this.ui.fadeTo(true, `晚安<small>第 ${this.state.day} 天结束</small>`);
    await wait(1600);
    const s = this.state;
    s.day++;
    s.hour = 6.6;
    s.minute = 30;
    s.stamina = 100;
    s.flags.petalTaken = {};
    s.flags[`offer_${s.day - 1}`] = false;
    if (this.quests.status('lostcat') === 'active' && !s.flags.catReturned) {
      this.cat.restore(36, -50);
    }
    this.addLog('在自家的床上睡了一觉');
    await wait(600);
    this.ui.fadeTo(false, `第 ${s.day} 天<small>星期${'一二三四五六日'[(s.day - 1) % 7]}</small>`);
    await wait(1700);
    this.ui.setHudVisible(true);
    this.ui.fadeTo(false, '');
    this._sleeping = false;
    this.ui.toast('新的一天开始了');
  }

  // ------------------------------------------------------------------ 日志数据
  journalData() {
    const s = this.state;
    const map = (q) => {
      const e = s.quests[q.id];
      return {
        title: q.title,
        summary: q.summary,
        status: e.status,
        stepIndex: e.step,
        total: q.steps.length,
        steps: q.steps.map((x) => x.text),
      };
    };
    const ql = this.quests;
    return {
      done: ql.done().map(map),
      active: ql.active().map(map),
      available: ql.available().map(map),
      bag: s.inv.list(),
      held: s.held,
      heldName: s.held ? itemName(s.held) : '',
      onUse: (id, it) => this._useFromJournal(id, it),
      log: s.log,
    };
  }

  /** 背包面板里点击物品 */
  _useFromJournal(id, it) {
    // 对话 / 商店打开时禁用手持
    if (this.ui.dialogueOpen) return;
    if (it && it.food) {
      this.useItem(id);
    } else if (id === 'charm' || id === 'ticket' || id === 'postcard') {
      this.useItem(id);
    } else {
      // 任务道具：拿在手上（可递给 NPC）
      this.state.held = this.state.held === id ? null : id;
      this.audio.pickup();
      this.ui.toast(this.state.held ? `手持 ${itemIcon(id)} ${it.name}　·　去交给对应的人` : '放回背包');
    }
    this.ui.renderJournal(this.journalData());
  }
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
