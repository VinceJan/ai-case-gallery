// 游戏编排器：系统装配、主循环、交互、室内外切换、存档
import * as THREE from 'three';
import { Engine } from '../core/engine.js';
import { Input } from '../core/input.js';
import { Audio } from '../core/audio.js';
import { SaveManager } from '../core/save.js';
import { clamp, lerp, dist2d, makeRng, pick } from '../core/utils.js';
import { buildGraph, terrainHeight, buildingDoor, POIS, BUILDINGS } from '../world/layout.js';
import { buildTown } from '../world/town.js';
import { buildTextures, buildMaterials } from '../world/materials.js';
import { Sky } from '../world/sky.js';
import { NPC, NPC_DEFS } from './npc.js';
import { EventSystem } from './events.js';
import { Player } from './player.js';
import { SimClock, SPEED_MINUTES } from './clock.js';
import { WeatherSystem } from './weather.js';
import { Shop, ITEMS } from './items.js';
import * as D from './dialogue.js';
import { makeCharacter, animateCharacter, makeNameTag, makeChatBubble, makeEmoteSprite } from '../world/characters.js';
import { umbrella as makeUmbrella } from '../world/props.js';

const TICK_RATE = 1 / 30;
const SHOP_BUILDINGS = ['shop_konbini', 'shop_bakery', 'shop_cafe', 'shop_books', 'shop_general', 'shop_izakaya'];

export class Game {
  constructor(ui) {
    this.ui = ui;
    this.audio = new Audio();
    this.mode = 'title'; // title | town | interior | menu | dialogue | panel | map
    this.time = 0;
    this._acc = 0;
    this._hudAcc = 0;
    this._socialAcc = 0;
    this._saveAcc = 0;
    this.lastAutoSaveDay = 0;
    this.markers = new Map();
    this.pickups = [];
    this.eventLog = [];
    this.flags = {};
    this.interactable = null;
    this.catFollow = false;
    this.photoFlash = 0;
  }

  // ---------------- 初始化 ----------------
  async buildWorld(progress) {
    const step = async (pct, text, fn) => {
      progress(pct, text);
      await new Promise((r) => setTimeout(r, 16));
      return fn();
    };

    this.engine = await step(5, '点亮灯火…', () => new Engine(this.ui.canvas));
    this.input = new Input(this.ui.canvas);
    this.graph = buildGraph();

    this.scene = await step(12, '铺开草地与道路…', () => {
      const s = new THREE.Scene();
      s.background = new THREE.Color(0xdfeef5);
      return s;
    });

    await step(18, '调制色彩…', () => { buildTextures(); buildMaterials(); });
    this.sky = await step(20, '绘制晚春的天空…', () => new Sky(this.scene));

    this.town = await step(45, '建起小镇的房屋…', () =>
      buildTown(this.scene, this.graph, (t, p) => progress(p, t)));

    this.clock = new SimClock(1, 8 * 60);
    this.weather = new WeatherSystem(Math.floor(Math.random() * 1e9));
    this.weather.pickNext(120);

    // 商店
    this.shops = new Map();
    for (const b of this.town.buildings) {
      if (SHOP_BUILDINGS.includes(b.building.id)) {
        this.shops.set(b.building.id, new Shop(b.building.id));
      }
    }

    // NPC
    await step(70, '叫醒镇民们…', () => {
      this.npcs = NPC_DEFS.map((def) => {
        const npc = new NPC(def, this.graph, this.town.buildings);
        npc._giftValue = (itemId) => {
          const it = ITEMS[itemId];
          if (!it) return 3;
          if (it.fav?.includes(npc.id)) return 12 + (it.kind === 'souvenir' ? 2 : 0);
          return Math.max(2, Math.round((it.gift ?? 4) * 0.8));
        };
        // 视图
        const { group, ...parts } = makeCharacter(npc.colors);
        npc.view = { group, parts, tag: makeNameTag(npc.name, npc.role), umbrella: null, bubble: null };
        npc.view.tag.position.y = 2.15;
        group.add(npc.view.tag);
        const umb = makeUmbrella(pick(makeRng(npc.name.length), [0x4a7fb5, 0xc94f6d, 0x3a3f4a, 0x5f9e6e]));
        umb.position.y = 1.05;
        umb.visible = false;
        group.add(umb);
        npc.view.umbrella = umb;
        this.scene.add(group);
        return npc;
      });
    });

    // 玩家
    const homeDoor = buildingDoor(BUILDINGS.find((b) => b.playerHome));
    this.player = new Player(homeDoor.x + 2.6, homeDoor.z + 7.0);
    const pv = makeCharacter({ top: 0x3f8a8a, bottom: 0x3a4a6b, hair: 0x3a2c26, skin: 0xf2cfae, hairStyle: 2 });
    this.playerView = pv;
    this.scene.add(pv.group);

    // 世界门面（给事件/NPC 用）
    this.world = {
      clock: this.clock, weather: this.weather, npcs: this.npcs, player: this.player,
      flags: this.flags, pickups: this.pickups, shops: this.shops,
      toast: (t, x, k) => this.ui.toast(t, x, k),
      marker: (x, z, label, id) => this.setMarker(id, x, z, label),
      clearMarker: (id) => this.markers.delete(id),
      spawnPickup: (id, x, z, itemId) => this.spawnPickup(id, x, z, itemId),
      addMoney: (n) => { this.player.money += n; },
      giveItem: (id, n = 1) => { this.player.addItem(id, n); this.ui.toast('获得物品', ITEMS[id].name + ' ×' + n); },
      itemKind: (id) => ITEMS[id]?.kind,
      itemName: (id) => ITEMS[id]?.name ?? id,
      logEvent: (text) => this.logEvent(text),
      setStalls: (on) => { this.town.stalls.visible = on; },
      setNightStalls: (on) => { this.town.nightStalls.visible = on; },
      setFireworks: (on) => { on ? this.town.fireworks.start() : this.town.fireworks.stop(); this.fireworksOn = on; },
      setCatVisible: (on) => { if (this.town.cats[0]) this.town.cats[0].group.visible = on; this.catVisible = on; },
      setCatFollow: (on) => { this.catFollow = on; },
      showSubtitle: (t, s) => this.ui.subtitle(t, s),
    };
    this.events = new EventSystem(this.world);

    // 相机
    this.camYaw = Math.PI; this.camPitch = 0.28; this.camDist = 10.5;
    this.ui.bindGame(this);
    this.engine.onFrame = (dt, el) => this.frame(dt, el);
  }

  start() {
    this.mode = 'town';
    this.engine.scene = this.scene;
    this.engine.start();
  }

  // ---------------- 主循环 ----------------
  frame(dt, elapsed) {
    this.time = elapsed;
    if (this.mode === 'title') { this.engine.camera.position.set(0, 60, 120); this.engine.camera.lookAt(0, 0, 0); return; }
    const paused = this.mode === 'menu' || this.mode === 'panel' || this.mode === 'dialogue' || this.mode === 'map';

    // 输入采样
    this.input.sample();
    if (paused) { this.input.moveX = 0; this.input.moveZ = 0; }
    // 坐下时按移动键起身
    if (this.player.sitting && (this.input.moveX || this.input.moveZ)) this.standUp();

    // 游戏时间（advance 内部已按速度倍率换算，这里只传真实秒数）
    const timeRunning = !paused && this.clock.speedIndex !== 0;
    if (timeRunning) this.clock.advance(dt);
    const gameMin = timeRunning ? dt * SPEED_MINUTES[this.clock.speedIndex] : 0;

    // 天气
    this.weather.update(gameMin);
    const lp = this.clock.lightParams();

    // 相机参数同步
    this.camYaw = this.input.camYaw;
    this.camPitch = this.input.camPitch;
    this.camDist = this.input.camDist;
    this.sky.update(dt, lp, this.weather, elapsed);
    if (lp.lampsOn !== this._lampsOn) {
      this._lampsOn = lp.lampsOn;
      this.town.setNightLook(lp.lampsOn);
    }

    // 玩家
    if (!paused) {
      this.player.update(dt, this.input, this.camYaw, this.town.colliders, terrainHeight, this.weather);
    }
    this.updatePlayerView(dt);
    this.updateCamera(dt);

    // NPC
    if (!paused) {
      for (const npc of this.npcs) {
        npc.update(dt, gameMin, this.world);
      }
      this.socialTick(dt);
      this.events.update(dt, gameMin);
    }
    this.updateNpcViews(dt);

    // 跟随猫
    if (this.catFollow && this.town.cats[0]) {
      const cat = this.town.cats[0];
      const d = dist2d(cat.x, cat.z, this.player.pos.x, this.player.pos.z);
      if (d > 1.6) {
        const a = Math.atan2(this.player.pos.x - cat.x, this.player.pos.z - cat.z);
        cat.x += Math.sin(a) * Math.min(d - 1.4, 3.2 * dt);
        cat.z += Math.cos(a) * Math.min(d - 1.4, 3.2 * dt);
        cat.group.rotation.y = a;
      }
      cat.group.position.set(cat.x, terrainHeight(cat.x, cat.z), cat.z);
    }

    // 小镇动态
    this.town.update(dt, gameMin, {
      playerPos: new THREE.Vector3(this.player.pos.x, this.player.y, this.player.pos.z),
      elapsed,
      wind: this.weather.wind,
      petalDensity: this.weather.target === 'petal' ? 1.0 : (0.35 + this.weather.wind * 0.25),
      rainIntensity: this.weather.intensity,
      night: lp.lampsOn,
    });

    // 交互扫描
    if (!paused) this.scanInteractables();
    this.ui.hud({
      dateText: this.clock.dateText + ' ' + this.clock.weekdayText,
      timeText: this.clock.timeText,
      weatherIcon: this.weather.icon,
      money: this.player.money,
      speed: this.clock.speedIndex === 0 ? '暂停' : this.clock.speedIndex + 'x',
      stamina: this.player.stamina,
      night: lp.lampsOn,
      rainy: this.weather.isRaining,
      mode: this.mode,
      sitting: this.player.sitting,
    });
    this.ui.drawMinimap(this);

    // 音频
    this.audio.tick(dt, {
      day: !lp.isNight, raining: this.weather.isRaining, storm: this.weather.isStorm,
      fireworks: this.fireworksOn,
      walking: this.player.speed > 0.5, running: this.player.speed > 4.5,
    });
    this.audio.setEnvironment(this.weather.wind, this.weather.intensity, lp.isNight);

    // 自适应画质（低性能设备降级）
    this.autoQuality(dt);

    // 自动存档
    this._saveAcc += dt;
    if (this._saveAcc > 30) {
      this._saveAcc = 0;
      if (this.clock.day !== this.lastAutoSaveDay) {
        this.lastAutoSaveDay = this.clock.day;
        this.autoSave();
      }
    }
  }

  // ---------------- 视图更新 ----------------
  updatePlayerView(dt) {
    const pv = this.playerView;
    pv.group.visible = this.mode === 'town';
    pv.group.position.set(this.player.pos.x, this.player.y, this.player.pos.z);
    pv.group.rotation.y = this.player.heading;
    animateCharacter(this.playerView, this.player.walkPhase, this.player.speed, dt);
    // 雨伞
    if (!pv.umbrella) {
      const umb = makeUmbrella(0x3f8a8a);
      umb.position.y = 1.05;
      umb.visible = false;
      pv.group.add(umb);
      pv.umbrella = umb;
    }
    pv.umbrella.visible = this.weather.isRaining && this.mode === 'town';
  }

  updateNpcViews(dt) {
    for (const npc of this.npcs) {
      const v = npc.view;
      // 室内中的店主由 enterBuilding 单独管理
      if (npc === this.interiorNpc) continue;
      const hidden = npc.state === 'sleep';
      v.group.visible = !hidden && this.mode !== 'interior';
      if (v.group.visible) {
        v.group.position.set(npc.pos.x, terrainHeight(npc.pos.x, npc.pos.z), npc.pos.z);
        v.group.rotation.y = npc.heading;
        animateCharacter(v.parts, npc.walkPhase, npc.speed, dt);
        v.umbrella.visible = npc.umbrella;
        const d = dist2d(npc.pos.x, npc.pos.z, this.player.pos.x, this.player.pos.z);
        v.tag.visible = this.mode === 'town' && d < 15 && d > 2.0;
        // 聊天气泡
        if (npc.bubble && !v.bubble) {
          v.bubble = makeChatBubble(npc.bubble.text);
          v.bubble.position.y = 2.0;
          v.group.add(v.bubble);
        } else if (!npc.bubble && v.bubble) {
          v.group.remove(v.bubble);
          v.bubble = null;
        }
      }
      // 交谈时面向对方
      if (npc.chatWith === 'player') npc.faceTo(this.player.pos.x, this.player.pos.z);
      else if (npc.chatWith) {
        const other = this.npcs.find((n) => n.id === npc.chatWith);
        if (other) npc.faceTo(other.pos.x, other.pos.z);
      }
    }
  }

  updateCamera(dt) {
    const cam = this.engine.camera;
    const cp = Math.cos(this.camPitch), sp = Math.sin(this.camPitch);
    let tx, tz, ty, dist;
    if (this.mode === 'interior' && this.roomSize) {
      // 室内：相机位于玩家背后（按朝向），并夹紧在房间内
      const h = this.player.heading;
      dist = 3.6;
      tx = this.player.pos.x - Math.sin(h) * cp * dist;
      tz = this.player.pos.z - Math.cos(h) * cp * dist;
      ty = this.player.y + 1.25 + sp * dist * 0.8;
      const hw = this.roomSize.w / 2 - 0.5, hd = this.roomSize.d / 2 - 0.5;
      tx = clamp(tx, -hw, hw);
      tz = clamp(tz, -hd, hd);
      ty = clamp(ty, 0.7, this.roomSize.h - 0.35);
      cam.position.lerp(new THREE.Vector3(tx, ty, tz), clamp(dt * 8, 0, 1));
    } else {
      dist = this.camDist;
      tx = this.player.pos.x - Math.sin(this.camYaw) * cp * dist;
      tz = this.player.pos.z - Math.cos(this.camYaw) * cp * dist;
      ty = this.player.y + 1.3 + sp * dist;
      // 防止相机钻地
      const ground = terrainHeight(tx, tz) + 0.6;
      const y = Math.max(ty, ground);
      cam.position.lerp(new THREE.Vector3(tx, y, tz), clamp(dt * 10, 0, 1));
    }
    const look = new THREE.Vector3(this.player.pos.x, this.player.y + 1.35, this.player.pos.z);
    cam.lookAt(look);
  }

  // ---------------- 交互 ----------------
  scanInteractables() {
    if (this.mode === 'interior') {
      this.scanInteriorInteractables();
      return;
    }
    if (this.mode !== 'town') { this.ui.prompt(null); return; }
    if (this.player.sitting) {
      this.interactable = null;
      this.ui.prompt('[E] 起身');
      return;
    }
    const p = this.player.pos;
    let best = null, bestD = 1e9;
    const consider = (d, it) => { if (d < bestD) { bestD = d; best = it; } };

    // 拾取物
    for (const pk of this.pickups) {
      const d = dist2d(p.x, p.z, pk.x, pk.z);
      if (d < 2.0) consider(d, { kind: 'pickup', label: '捡起 ' + ITEMS[pk.itemId].name, data: pk });
    }
    // NPC
    for (const npc of this.npcs) {
      if (npc.state === 'sleep') continue;
      const d = dist2d(p.x, p.z, npc.pos.x, npc.pos.z);
      if (d < 2.8) consider(d, { kind: 'talk', label: '和 ' + npc.name + ' 说话', data: npc });
    }
    // 建筑门
    for (const b of this.town.buildings) {
      const d = dist2d(p.x, p.z, b.door.x, b.door.z);
      if (d < 2.0) consider(d, { kind: 'enter', label: '进入 ' + b.building.name, data: b });
    }
    // 长椅
    for (const b of this.town.benches || []) {
      const d = dist2d(p.x, p.z, b.x, b.z);
      if (d < 1.8) consider(d, { kind: 'sit', label: '坐一会儿', data: b });
    }
    // 售货机
    for (const v of this.town.vending || []) {
      const d = dist2d(p.x, p.z, v.x, v.z);
      if (d < 1.9) consider(d, { kind: 'vending', label: '买罐饮料（¥140）', data: v });
    }
    // 猫
    if (this.catVisible && this.town.cats[0]) {
      const c = this.town.cats[0];
      const d = dist2d(p.x, p.z, c.x, c.z);
      if (d < 2.2) consider(d, { kind: 'cat', label: '喂流浪猫', data: c });
    }
    // 电车
    if (this.town.train.state === 'docked') {
      const tx = this.town.train.x;
      const d = Math.abs(p.x - tx);
      const onPlatform = Math.abs(p.z - (-104)) < 3.5 && p.x > -42 && p.x < -14;
      if (d < 12 && onPlatform) consider(1.5, { kind: 'train', label: '乘坐电车去城市（¥240）', data: null });
    }

    this.interactable = best;
    if (best && this.mode === 'town') this.ui.prompt('[E] ' + best.label);
    else this.ui.prompt(null);
  }

  scanInteriorInteractables() {
    const p = this.player.pos;
    let best = null, bestD = 1e9;
    for (const it of this.interiorInteractions) {
      const d = dist2d(p.x, p.z, it.pos.x, it.pos.z);
      if (d < it.radius + 0.6) {
        if (d < bestD) { bestD = d; best = it; }
      }
    }
    this.interactable = best;
    if (best) this.ui.prompt('[E] ' + best.label);
    else this.ui.prompt(null);
  }

  interact() {
    if (this.player.sitting) { this.standUp(); return; }
    const it = this.interactable;
    if (!it) return;
    this.audio.blip(520, 0.06);
    switch (it.kind) {
      case 'pickup': this.doPickup(it.data); break;
      case 'talk': this.openDialogue(it.data); break;
      case 'enter': this.enterBuilding(it.data); break;
      case 'sit': this.sitDown(); break;
      case 'vending': this.buyVending(); break;
      case 'cat': this.feedCat(); break;
      case 'train': this.boardTrain(); break;
      default:
        if (it.type === 'exit') this.exitBuilding();
        else if (it.type === 'shop') this.openShop(it.data.buildingId);
        else if (it.type === 'bed') this.sleep();
        else if (it.type === 'sit') this.sitDown();
        else if (it.type === 'pray') this.pray();
        else if (it.type === 'look') this.ui.subtitle(it.label + '……', 2.5);
    }
  }

  doPickup(pk) {
    this.player.addItem(pk.itemId, 1);
    this.removePickup(pk.id);
    this.ui.toast('捡到了', ITEMS[pk.itemId].name + ' 已放入背包。');
    this.audio.blip(760, 0.08, 'sine', 0.1);
    if (pk.id === 'catgift') this.logEvent('收到了猫咪的礼物');
  }

  spawnPickup(id, x, z, itemId) {
    // 可视化：小发光盒子
    const g = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.3),
      new THREE.MeshBasicMaterial({ color: 0xffd98a }));
    g.position.set(x, terrainHeight(x, z) + 0.5, z);
    this.scene.add(g);
    this.pickups.push({ id, x, z, itemId, mesh: g });
  }
  removePickup(id) {
    const i = this.pickups.findIndex((p) => p.id === id);
    if (i >= 0) {
      this.scene.remove(this.pickups[i].mesh);
      this.pickups.splice(i, 1);
    }
  }

  setMarker(id, x, z, label) { this.markers.set(id, { x, z, label }); }

  logEvent(text) {
    this.eventLog.unshift({ day: this.clock.day, time: this.clock.timeText, text });
    if (this.eventLog.length > 50) this.eventLog.pop();
  }

  // ---------------- 对话 ----------------
  openDialogue(npc) {
    this.mode = 'dialogue';
    this.ui.prompt(null);
    npc.talk(this.world);
    this.dialogueNpc = npc;
    const text = D.greeting(npc, {
      hour: this.clock.hour, firstMeet: npc.memory.talks === 0,
    });
    const dlg = {
      name: npc.name, relation: npc.relationLevel + (npc.affinity > 0 ? ' ♥' + Math.round(npc.affinity) : ''),
      text, choices: [
        { label: '闲聊', value: 'chat' },
        { label: '送礼', value: 'gift', dim: !this.hasGift() },
        { label: '邀请', value: 'invite' },
        { label: '告别', value: 'bye' },
      ],
    };
    this.lastDialogue = dlg;
    this.ui.dialogue(dlg);
    if (npc.memory.talks === 0) this.logEvent('认识了' + npc.name);
    this.player.stats.talks++;
  }

  hasGift() {
    return this.player.inventory.some((i) => ['gift', 'souvenir', 'material', 'food', 'drink'].includes(ITEMS[i.id]?.kind));
  }

  onDialogueChoice(value) {
    const npc = this.dialogueNpc;
    if (!npc) return;
    if (value === 'chat') {
      const others = this.npcs.filter((n) => n.id !== npc.id && n.relations.get(npc.id) > 45);
      const text = D.chat(npc, {
        hour: this.clock.hour,
        weather: this.weather.target,
        festivalSoon: this.flags.festivalAnnounced && this.clock.day < this.events.festivalDay,
        otherNpcName: others.length ? pick(npc.rng, others).name : null,
      });
      npc.affinity = clamp(npc.affinity + 1.5, 0, 100);
      this.ui.dialogueText(text);
    } else if (value === 'gift') {
      this.openGiftMenu(npc);
    } else if (value === 'invite') {
      this.openInviteMenu(npc);
    } else if (value === 'bye') {
      this.ui.hideDialogue();
      this.mode = 'town';
      npc.chatTimer = Math.min(npc.chatTimer, 8);
      this.dialogueNpc = null;
    } else if (value.startsWith('gift:')) {
      const itemId = value.slice(5);
      const val = npc.giftValue(itemId);
      this.player.removeItem(itemId, 1);
      npc.receiveGift(itemId, this.clock.day);
      npc.memory.giftsToday++;
      const resp = D.giftResponse(npc, val);
      this.player.stats.gifts++;
      this.ui.dialogueText('（送出了' + ITEMS[itemId].name + '）\n' + npc.name + '：' + resp);
      if (val >= 10) {
        this.ui.toast('好感度提升', npc.name + '非常喜欢这个礼物！', 'friend');
        // 回礼
        if (npc.affinity > 60 && npc.rng() < 0.5) {
          const giftId = pick(npc.rng, ['charm', 'postcard', 'figurine', 'souvenir_sweets']);
          this.player.addItem(giftId, 1);
          setTimeout(() => this.ui.toast('回礼', npc.name + '回赠了你' + ITEMS[giftId].name + '。', 'friend'), 800);
        }
      }
      this.ui.dialogueChoices([
        { label: '继续闲聊', value: 'chat' },
        { label: '告别', value: 'bye' },
      ]);
    } else if (value.startsWith('invite:')) {
      const poiId = value.slice(7);
      const accept = npc.affinity >= 12 || npc.memory.talks > 2;
      const resp = D.inviteResponse(npc, accept);
      this.ui.dialogueText(resp);
      if (accept) {
        npc.override = {
          poiId,
          until: this.clock.day * 1440 + this.clock.minutes + 90,
          withPlayer: true,
        };
        npc.path = null;
        const poi = POIS.find((p) => p.id === poiId);
        this.ui.toast('约定', '约' + npc.name + '在' + poi.name + '见面。', 'friend');
        npc.memory.invited = true;
        this.logEvent('约' + npc.name + '在' + poi.name + '见面');
      }
      this.ui.dialogueChoices([
        { label: '继续闲聊', value: 'chat' },
        { label: '告别', value: 'bye' },
      ]);
    }
  }

  openGiftMenu(npc) {
    const gifts = this.player.inventory.filter((i) => ITEMS[i.id].gift || ITEMS[i.id].kind === 'souvenir' || ITEMS[i.id].kind === 'material');
    this.mode = 'panel';
    this.ui.panel({
      title: '送出礼物', sub: '对象：' + npc.name,
      items: gifts.map((i) => ({
        icon: ITEMS[i.id].icon, name: ITEMS[i.id].name + ' ×' + i.n,
        desc: ITEMS[i.id].desc, value: 'gift:' + i.id,
      })),
      empty: '背包里没有适合送礼的物品',
      cancel: () => { this.mode = 'dialogue'; this.ui.dialogue(this.lastDialogue); },
    });
    this.giftTarget = npc;
  }

  openInviteMenu(npc) {
    const spots = ['hanami', 'bench_park1', 'bench_park2', 'shrine_top', 'riverwalk_e', 'pond_edge'];
    this.mode = 'panel';
    this.ui.panel({
      title: '邀请', sub: '邀请' + npc.name + '去哪里？',
      items: spots.map((id) => {
        const poi = POIS.find((p) => p.id === id);
        return { icon: '📍', name: poi.name, desc: '约在这里见面', value: 'invite:' + id };
      }),
      cancel: () => { this.mode = 'dialogue'; this.ui.dialogue(this.lastDialogue); },
    });
    this.giftTarget = npc;
  }

  onPanelChoice(value) {
    // 面板选择回调（礼物/邀请/商店/背包/菜单）
    if (value === 'noop') return;
    if (value.startsWith('menu:')) { this.ui.onMenuChoice(value, this); return; }
    if (value.startsWith('gift:')) {
      const npc = this.giftTarget;
      this.ui.hidePanel();
      this.mode = 'dialogue';
      this.onDialogueChoice(value);
    } else if (value.startsWith('invite:')) {
      const npc = this.giftTarget;
      this.ui.hidePanel();
      this.mode = 'dialogue';
      this.onDialogueChoice(value);
    } else if (value.startsWith('buy:')) {
      this.buyItem(value.slice(4));
    } else if (value.startsWith('sell:')) {
      this.sellItem(value.slice(5));
    } else if (value.startsWith('use:')) {
      this.useInventoryItem(value.slice(4));
    } else if (value === 'close') {
      this.ui.hidePanel();
      this.mode = this.prevMode || 'town';
    }
  }

  // ---------------- 室内 ----------------
  enterBuilding(info) {
    const interior = this.town.getInterior(info);
    if (!interior) return;
    this.mode = 'interior';
    this.prevMode = 'town';
    this.outdoorPos = { ...this.player.pos };
    this.currentInterior = { info, interior };
    this.engine.scene = interior.scene;
    this.interiorInteractions = interior.interactions;
    // 出生在房间中部，面向房间内部（柜台/展柜一侧）
    this.player.pos = { x: 0, z: 1.6 };
    this.player.y = 0;
    this.player.heading = Math.PI; // 面向房间内部(-z)
    this.roomSize = { w: info.building.w - 1.2, d: info.building.d - 1.2, h: 3.3 };
    this.input.camYaw = Math.PI; this.input.camPitch = 0.3; this.input.camDist = 5.5;
    // 店主/职员在室内
    const npc = this.npcs.find((n) => n.work === info.building.id);
    if (npc) {
      const counter = interior.interactions.find((i) => i.type === 'shop' || i.type === 'look');
      const pos = counter ? counter.pos : new THREE.Vector3(0, 0, 0);
      npc.view.group.position.set(pos.x * 0.5, 0, pos.z * 0.6 - 0.4);
      npc.view.group.rotation.y = 0;
      npc.view.group.visible = true;
      npc.view.tag.visible = true;
      interior.scene.add(npc.view.group);
      this.interiorNpc = npc;
    }
    this.ui.subtitle('—— ' + info.building.name + ' ——', 2.2);
  }

  exitBuilding() {
    if (this.interiorNpc) {
      this.scene.add(this.interiorNpc.view.group);
      this.interiorNpc.view.group.visible = this.interiorNpc.state !== 'sleep';
      this.interiorNpc = null;
    }
    this.mode = 'town';
    this.engine.scene = this.scene;
    this.player.pos = { ...this.outdoorPos };
    this.player.y = terrainHeight(this.player.pos.x, this.player.pos.z);
    this.currentInterior = null;
    this.roomSize = null;
    this.ui.prompt(null);
  }

  // ---------------- 商店 ----------------
  openShop(buildingId) {
    const shop = this.shops.get(buildingId);
    if (!shop) return;
    this.mode = 'panel';
    this.ui.prompt(null);
    this.prevMode = 'interior';
    this.currentShop = shop;
    this.refreshShopPanel();
  }

  refreshShopPanel() {
    const shop = this.currentShop;
    const items = shop.stock.map((s) => ({
      icon: ITEMS[s.id].icon,
      name: ITEMS[s.id].name + (s.n > 0 ? '' : '（售罄）'),
      desc: ITEMS[s.id].desc + '　剩 ' + s.n + ' 个',
      price: '¥' + shop.priceOf(s.id),
      value: 'buy:' + s.id,
      dim: s.n <= 0 || this.player.money < shop.priceOf(s.id),
    }));
    // 出售区
    const sellables = this.player.inventory.filter((i) => shop.buyKinds.includes(ITEMS[i.id]?.kind) && ITEMS[i.id].sell > 0);
    this.ui.panel({
      title: shop.name, sub: '钱包 ¥' + this.player.money.toLocaleString() + ' · 店主零钱 ¥' + shop.coin.toLocaleString(),
      items, sellTitle: '出售物品',
      sellItems: sellables.map((i) => ({
        icon: ITEMS[i.id].icon, name: ITEMS[i.id].name + ' ×' + i.n,
        desc: '收购价 ¥' + ITEMS[i.id].sell, price: '¥' + ITEMS[i.id].sell * i.n,
        value: 'sell:' + i.id,
      })),
      empty: '今天卖光了',
      cancel: () => { this.ui.hidePanel(); this.mode = 'interior'; },
    });
  }

  buyItem(itemId) {
    const shop = this.currentShop;
    const price = shop.priceOf(itemId);
    if (this.player.money < price) { this.ui.toast('钱不够', '钱包里的钱不足。'); return; }
    if (!shop.canBuy(itemId)) { this.ui.toast('售罄', '这个已经卖完了。'); return; }
    shop.buy(itemId);
    this.player.money -= price;
    this.player.addItem(itemId, 1);
    this.player.stats.bought++;
    this.audio.cash();
    this.ui.toast('购买', ITEMS[itemId].name + '　-' + price + '円');
    this.refreshShopPanel();
  }

  sellItem(itemId) {
    const shop = this.currentShop;
    const price = shop.sell(itemId);
    if (price === null) { this.ui.toast('无法收购', '这家店不收这个。'); return; }
    if (!this.player.removeItem(itemId, 1)) return;
    this.player.money += price;
    this.audio.cash();
    this.ui.toast('出售', ITEMS[itemId].name + '　+' + price + '円');
    this.refreshShopPanel();
  }

  buyVending() {
    if (this.player.money < 140) { this.ui.toast('钱不够', '买不起饮料。'); return; }
    this.player.money -= 140;
    const drink = pick(makeRng(Date.now() % 1e6), ['soda', 'coffee', 'tea']);
    this.player.addItem(drink, 1);
    this.audio.blip(440, 0.1, 'square', 0.1);
    this.ui.toast('自动售货机', '买到了' + ITEMS[drink].name + '。');
  }

  // ---------------- 动作 ----------------
  sitDown() {
    this.player.sitting = true;
    this.ui.subtitle('（坐在长椅上，看着樱花道发了一会儿呆）', 3);
    this.player.stats.satTimes++;
    this.mode = 'town';
    this.ui.prompt('[E] 起身');
  }
  standUp() {
    this.player.sitting = false;
    this.ui.prompt(null);
  }

  sleep() {
    this.clock.sleepToMorning(7);
    this.player.stamina = 100;
    this.exitBuilding();
    this.ui.subtitle('（睡了个好觉。滋沥——窗外是四月清晨的樱花。）', 4);
    this.ui.toast('新的一天', this.clock.dateText + ' 早上好！');
    this.autoSave();
  }

  pray() {
    const roll = Math.random();
    this.ui.subtitle('（闭上眼睛许愿……樱花静静地飘落）', 3);
    if (roll < 0.3) {
      this.player.money += 100;
      this.ui.toast('御缘', '香钱箱旁多了 100 円，就当是神明的回礼吧。');
    } else if (roll < 0.5) {
      this.player.addItem('petal', 1);
      this.ui.toast('御缘', '得到了一片完整的樱花花瓣。');
    }
  }

  feedCat() {
    // 优先交给事件系统（含跟随逻辑）
    if (this.events?.state.cat?.stage === 'appear') {
      this.events.tryFeedCat();
      return;
    }
    const catfood = this.player.countItem('catfood');
    if (catfood > 0) {
      this.player.removeItem('catfood', 1);
      this.ui.subtitle('喵～喵♪（流浪猫满足地蹭了蹭你）', 3);
      this.ui.toast('小猫', '流浪猫很喜欢你。');
      this.catVisible = true;
      return;
    }
    const food = this.player.inventory.find((i) => ['food', 'drink'].includes(ITEMS[i.id].kind));
    if (food) {
      this.player.removeItem(food.id, 1);
      this.ui.subtitle('喵～（流浪猫吃掉了你的' + ITEMS[food.id].name + '）', 3);
      return;
    }
    this.ui.subtitle('喵～（流浪猫看着你，好像饿了。去便利店买点猫粮吧）', 3);
  }

  boardTrain() {
    const hasTicket = this.player.countItem('ticket') > 0;
    if (hasTicket) this.player.removeItem('ticket', 1);
    else if (this.player.money >= 240) this.player.money -= 240;
    else { this.ui.toast('无法乘车', '需要车票（¥240）。'); return; }
    this.mode = 'panel';
    this.ui.subtitle('（电车穿过樱花隧道，驶向城市……）', 3);
    const souvenirs = ['souvenir_city', 'souvenir_sweets', 'souvenir_craft', 'taiyaki_stuff'];
    setTimeout(() => {
      this.clock.skipHours(2);
      const s = pick(makeRng(Date.now() % 1e6), souvenirs);
      this.player.addItem(s, 1);
      this.ui.toast('城市一日游', '两小时后你回来了，带回了' + ITEMS[s].name + '。', 'friend');
      this.mode = 'town';
      this.logEvent('乘坐电车去了城市');
      this.autoSave();
    }, 1800);
  }

  takePhoto() {
    try {
      const url = this.engine.renderer.domElement.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sakura_' + this.clock.day + '日_' + this.clock.timeText.replace(':', '') + '.png';
      a.click();
      this.player.stats.photos++;
      this.ui.toast('拍照', '咔嚓！照片已保存。');
      this.audio.blip(1200, 0.05, 'square', 0.08);
    } catch (e) { this.ui.toast('拍照失败', String(e)); }
  }

  // ---------------- 自适应画质 ----------------
  autoQuality(dt) {
    if (this._qualityDone) return;
    this._fpsFrames = (this._fpsFrames || 0) + 1;
    this._fpsTime = (this._fpsTime || 0) + dt;
    if (this._fpsTime < 4) return;
    const fps = this._fpsFrames / this._fpsTime;
    this._qualityDone = true;
    if (fps < 24) {
      const r = this.engine.renderer;
      r.setPixelRatio(1);
      r.shadowMap.enabled = false;
      this.scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; });
      this.town.petals.mesh.visible = false;
      if (this.town.rain) this.town.rain.mesh.visible = false;
      this.ui.toast('画质调整', '检测到帧率较低，已自动降低画质以获得流畅体验。');
      console.log('[quality] 低画质模式，fps≈', Math.round(fps));
    } else {
      console.log('[quality] 高画质模式，fps≈', Math.round(fps));
    }
  }

  // ---------------- 存档 ----------------
  getState() {
    return {
      clock: this.clock.serialize(),
      weather: this.weather.serialize(),
      player: this.player.serialize(),
      npcs: this.npcs.map((n) => n.serialize()),
      shops: [...this.shops.entries()].map(([k, v]) => [k, v.serialize()]),
      flags: this.flags,
      eventLog: this.eventLog,
      eventState: {
        wallet: this.events?.state.wallet,
        cat: this.events?.state.cat,
        festivalDay: this.events?.festivalDay,
      },
      stats: { playTime: this.time },
    };
  }

  applyState(d) {
    if (!d) return false;
    this.clock.load(d.clock);
    this.weather.load(d.weather);
    this.player.load(d.player);
    this.npcs.forEach((n) => {
      const sd = d.npcs.find((x) => x.id === n.id);
      if (sd) n.load(sd);
    });
    for (const [k, v] of d.shops || []) {
      const shop = this.shops.get(k);
      if (shop) shop.load(v);
    }
    Object.assign(this.flags, d.flags || {});
    this.eventLog = d.eventLog || [];
    if (this.events && d.eventState) {
      this.events.state.wallet = d.eventState.wallet || null;
      this.events.state.cat = d.eventState.cat || null;
      // 恢复进行中的拾取物
      if (this.events.state.wallet?.stage === 'lost') {
        const w = this.events.state.wallet;
        if (!this.pickups.find((p) => p.id === 'wallet')) {
          this.spawnPickup('wallet', w.x, w.z, 'wallet');
          this.setMarker('wallet_spot', w.x, w.z, '闪亮的东西');
        }
      }
      if (this.events.state.wallet?.stage === 'return') {
        const npc = this.npcs.find((n) => n.id === this.events.state.wallet.npcId);
        if (npc) this.setMarker('wallet_npc', npc.pos.x, npc.pos.z, npc.name);
      }
    }
    if (d.flags?.festivalStalls) this.town.stalls.visible = true;
    return true;
  }

  autoSave() {
    if (this.mode === 'title') return;
    const ok = SaveManager.autoSave(this.getState());
    if (ok) this.ui.toast('自动保存', '进度已保存。');
  }

  saveSlot(slot) {
    const ok = SaveManager.save(slot, this.getState());
    this.ui.toast(ok ? '保存成功' : '保存失败', ok ? '进度已存入存档 ' + slot + '。' : '浏览器存储空间不足。');
  }

  loadSlot(slot) {
    const d = SaveManager.load(slot);
    if (!d) { this.ui.toast('读取失败', '该存档是空的。'); return false; }
    this.applyState(d);
    this.ui.toast('读取成功', '欢迎回到樱花小镇。');
    return true;
  }

  // ---------------- 社交 ----------------
  socialTick(dt) {
    this._socialAcc += dt;
    if (this._socialAcc < 0.7) return;
    this._socialAcc = 0;
    for (let i = 0; i < this.npcs.length; i++) {
      for (let j = i + 1; j < this.npcs.length; j++) {
        const a = this.npcs[i], b = this.npcs[j];
        if (a.chatWith || b.chatWith) continue;
        if (a.state === 'sleep' || b.state === 'sleep') continue;
        if (!['idle', 'relax', 'eat', 'shop', 'read'].includes(a.state)) continue;
        if (!['idle', 'relax', 'eat', 'shop', 'read'].includes(b.state)) continue;
        const d = dist2d(a.pos.x, a.pos.z, b.pos.x, b.pos.z);
        if (d < 3.2 && (a.relations.get(b.id) ?? 0) > 28) {
          a.chatWith = b.id; b.chatWith = a.id;
          a.chatTimer = b.chatTimer = 20 + Math.random() * 30;
          a.bubble = { text: '…', t: 20 }; b.bubble = { text: '…', t: 20 };
          const rel = a.relations.get(b.id) ?? 0;
          a.relations.set(b.id, clamp(rel + 2, 0, 100));
          b.relations.set(a.id, clamp(rel + 2, 0, 100));
          a.faceTo(b.pos.x, b.pos.z); b.faceTo(a.pos.x, a.pos.z);
        }
      }
    }
  }

  // ---------------- 标题画面流程 ----------------
  async requestNewGame() {
    this.ui.showTitle(false);
    this.ui.showLoading(true);
    this.ui.setLoading(0, '开始生成…');
    await this.buildWorld((p, t) => this.ui.setLoading(p, t));
    this.ui.setLoading(100, '完成');
    await new Promise((r) => setTimeout(r, 200));
    this.ui.showLoading(false);
    document.getElementById('hud').classList.remove('hidden');
    this.audio.init();
    this.audio.resume();
    this.start();
    this.ui.subtitle('欢迎来到樱花小镇。晚春四月，樱花正盛。', 5);
    this.ui.toast('新游戏', '第 1 天 · 从家里出门看看吧（WASD 移动）');
  }

  async requestContinue() {
    const d = SaveManager.autoLoad();
    if (!d) { this.ui.toast('读取失败', '没有找到自动存档。'); return; }
    this.audio.init();
    this.audio.resume();
    this.ui.showTitle(false);
    this.ui.showLoading(true);
    this.ui.setLoading(0, '恢复小镇…');
    await this.buildWorld((p, t) => this.ui.setLoading(p, t));
    this.applyState(d);
    this.ui.setLoading(100, '完成');
    await new Promise((r) => setTimeout(r, 200));
    this.ui.showLoading(false);
    document.getElementById('hud').classList.remove('hidden');
    this.audio.init();
    this.audio.resume();
    this.start();
    this.ui.toast('读取存档', '第 ' + this.clock.day + ' 天 ' + this.clock.timeText + '，欢迎回来。');
  }

  showTitleScreen() {
    document.getElementById('hud').classList.add('hidden');
    this.ui.showTitle(true);
    this.ui.hideDialogue();
    this.ui.hidePanel();
    this.ui.hideMap();
    this.engine?.stop();
  }

  // ---------------- 菜单 ----------------
  setSpeed(i) {
    this.clock.speedIndex = clamp(i, 0, 3);
    this.ui.toast('时间流速', this.clock.speedIndex === 0 ? '已暂停' : this.clock.speedIndex + ' 倍速');
  }

  toggleMenu(force) {
    if (this.mode === 'menu' || force === false) {
      this.mode = this.prevMode || 'town';
      this.ui.hidePanel();
    } else if (this.mode === 'town' || this.mode === 'interior') {
      this.prevMode = this.mode;
      this.mode = 'menu';
      this.ui.openMenu(this);
    }
  }

  toggleMap() {
    if (this.mode === 'map') { this.mode = 'town'; this.ui.hideMap(); }
    else if (this.mode === 'town') { this.mode = 'map'; this.ui.showMap(this); }
  }

  toggleInventory() {
    if (this.mode === 'panel' && this.currentShop) { this.ui.hidePanel(); this.mode = 'interior'; return; }
    if (this.mode === 'town' || this.mode === 'interior') {
      this.prevMode = this.mode; // 先记录再切换
      this.mode = 'panel';
      this.ui.openInventory(this);
    } else if (this.mode === 'panel') {
      this.ui.hidePanel();
      this.mode = this.prevMode || 'town';
    }
  }

  useInventoryItem(itemId) {
    const r = this.player.useItem(itemId);
    if (r === 'photo') { this.takePhoto(); this.ui.openInventory(this); return; }
    if (r) {
      this.ui.toast('使用', r);
      this.audio.blip(700, 0.07);
    }
    this.ui.openInventory(this);
  }
}
