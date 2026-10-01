/**
 * Sakura Town — main game orchestrator.
 */
import * as THREE from 'three';
import { bus } from './EventBus.js';
import { TimeSystem } from './TimeSystem.js';
import { WeatherSystem } from './WeatherSystem.js';
import { SaveSystem } from './SaveSystem.js';
import {
  PLANET_RADIUS,
  createPlanetGround,
  placeOnPlanet,
  surfacePoint,
  surfaceNormal,
} from '../world/Planet.js';
import { buildRoads, updateStreetLights, buildNavGraph } from '../world/Roads.js';
import { buildRailway } from '../world/Railway.js';
import {
  createVegetation,
  createRiver,
  createHills,
  createCherryTree,
} from '../world/Vegetation.js';
import { createPetals, createFireflies } from '../world/Particles.js';
import { WorldState } from '../world/WorldState.js';
import {
  createHouse,
  createKonbini,
  createCafe,
  createSchool,
  createStation,
  createShrine,
  createShopRow,
  createClinic,
  createPostOffice,
  createWarehouse,
  createVendingMachine,
  createBicycle,
} from '../buildings/factory.js';
import { buildInterior } from '../buildings/Interiors.js';
import { Player } from '../entities/Player.js';
import { NPCSystem, PLACES } from '../entities/NPC.js';
import { Train } from '../entities/Train.js';
import { InteractionSystem } from '../systems/Interaction.js';
import { DialogueSystem } from '../systems/Dialogue.js';
import { QuestSystem } from '../systems/Quests.js';
import { EventSystem } from '../systems/Events.js';
import { AudioSystem } from '../systems/Audio.js';
import { UI } from '../ui/UI.js';
import {
  toonMaterial,
  skyColors,
  createSkyDome,
  updateSky,
  unlitMaterial,
} from '../utils/materials.js';

export class Game {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 1200);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.55;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.time = new TimeSystem();
    this.weather = new WeatherSystem();
    this.worldState = new WorldState();
    this.npcs = new NPCSystem();
    this.npcMemory = {};
    this.ui = new UI(this);
    this.interaction = new InteractionSystem(this);
    this.dialogue = new DialogueSystem(this);
    this.quests = new QuestSystem(this);
    this.events = new EventSystem(this);
    this.audio = new AudioSystem();
    this.saveSystem = new SaveSystem(this);

    this.player = new Player(this.camera);
    this.train = new Train();
    this.buildingColliders = [];
    this.buildingGroups = new Map();
    this.streetLights = [];
    this.interactables = [];
    this.windowMaterials = [];
    this.insideBuilding = null;

    this.paused = true;
    this.keys = new Set();
    this.mouse = { dragging: false, x: 0, y: 0 };
    this.touchMove = { x: 0, y: 0 };

    this.buildWorld();
    this.bindInput();
    this.bindUI();
    this.quests.init();

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  buildWorld() {
    const scene = this.scene;

    // Lighting — sun targets the town near the north pole (y ≈ PLANET_RADIUS)
    const hemi = new THREE.HemisphereLight('#e0f0ff', '#b0c898', 1.45);
    scene.add(hemi);
    this.hemi = hemi;

    const sun = new THREE.DirectionalLight('#fff2d8', 2.1);
    sun.position.set(80, PLANET_RADIUS + 120, 60);
    sun.target.position.set(0, PLANET_RADIUS, 0);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 20;
    sun.shadow.camera.far = 400;
    const s = 85;
    sun.shadow.camera.left = -s;
    sun.shadow.camera.right = s;
    sun.shadow.camera.top = s;
    sun.shadow.camera.bottom = -s;
    sun.shadow.bias = -0.0012;
    sun.shadow.normalBias = 0.05;
    scene.add(sun);
    scene.add(sun.target);
    this.sun = sun;

    // Sky
    this.sky = createSkyDome();
    scene.add(this.sky);

    // Ground planet
    const groundGeo = createPlanetGround(72);
    const groundMat = new THREE.MeshToonMaterial({
      color: '#6a9a62',
      gradientMap: toonMaterial('#fff').gradientMap,
    });
    // use vertex-ish flat color with slight variation via material
    this.ground = new THREE.Mesh(groundGeo, groundMat);
    this.ground.receiveShadow = true;
    scene.add(this.ground);

    // Grass plateau tint near town
    const plateau = new THREE.Mesh(
      new THREE.CircleGeometry(70, 48),
      new THREE.MeshToonMaterial({ color: '#7aaa6e' })
    );
    placeOnPlanet(plateau, 0, 0, 0.12, 0);
    // circle is on tangent — OK for visual
    this.ground.add(plateau);
    // Actually placePlateau on scene using placeOnPlanet
    scene.remove(plateau);
    placeOnPlanet(plateau, 0, 0, 0.14, 0);
    scene.add(plateau);

    // Roads
    const roads = buildRoads(scene);
    roads.traverse((c) => {
      if (c.userData?.streetLight) this.streetLights.push(c);
    });

    // River & vegetation
    createRiver(scene);
    createVegetation(scene);
    createHills(scene);
    this.petals = createPetals(scene, 180);
    this.fireflies = createFireflies(scene, 36);

    // Railway
    const railway = buildRailway(scene);
    this.railway = railway;
    this.crossings = railway.crossings;

    // Buildings
    this.buildBuildings(scene);

    // Actors
    scene.add(this.player.group);
    this.npcs.createRoster();
    for (const npc of this.npcs.npcs) {
      placeOnPlanet(npc.group, npc.x, npc.z, 0, npc.yaw);
      scene.add(npc.group);
    }
    scene.add(this.train.group);

    // Fog
    this.scene.fog = new THREE.FogExp2('#c5d8e8', 0.0012);

    // Collect interactables
    this.collectInteractables();
  }

  buildBuildings(scene) {
    // Layout is spaced so building colliders do not overlap.
    // `col` is the solid wall footprint used for collision (tighter than visuals).
    const defs = [
      {
        id: 'station',
        factory: () => createStation({}),
        x: 0,
        z: -2,
        yaw: Math.PI,
        kind: 'station',
        name: '桜町駅',
        col: { w: 14, d: 6.5 },
      },
      {
        id: 'konbini',
        factory: () => createKonbini({}),
        x: -20,
        z: -14,
        yaw: 0.35,
        kind: 'konbini',
        name: 'さくらマート',
        col: { w: 11, d: 7 },
      },
      {
        id: 'cafe',
        factory: () => createCafe({}),
        x: 16,
        z: -8,
        yaw: -0.35,
        kind: 'cafe',
        name: '珈琲 さくら',
        col: { w: 9, d: 7 },
      },
      {
        id: 'school',
        factory: () => createSchool({}),
        x: 36,
        z: 22,
        yaw: Math.PI * 0.9,
        kind: 'school',
        name: '桜町中学校',
        col: { w: 20, d: 8 },
      },
      {
        id: 'shrine',
        factory: () => createShrine({}),
        x: -32,
        z: 34,
        yaw: Math.PI * 1.05,
        kind: 'shrine',
        name: '稲荷神社',
        col: { w: 10, d: 10 },
      },
      {
        id: 'shoprow',
        factory: () => createShopRow({}),
        x: 2,
        z: -28,
        yaw: 0,
        kind: 'shoprow',
        name: '商店街',
        col: { w: 22, d: 7 },
      },
      {
        id: 'clinic',
        factory: () => createClinic({}),
        x: -28,
        z: 2,
        yaw: Math.PI / 2,
        kind: 'clinic',
        name: 'さくらクリニック',
        col: { w: 9, d: 7 },
      },
      {
        id: 'post',
        factory: () => createPostOffice({}),
        x: -14,
        z: 14,
        yaw: Math.PI,
        kind: 'post',
        name: '桜町郵便局',
        col: { w: 8, d: 6.5 },
      },
      {
        id: 'warehouse',
        factory: () => createWarehouse({}),
        x: 32,
        z: -26,
        yaw: 0.5,
        kind: 'warehouse',
        name: '仓库',
        col: { w: 10, d: 6.5 },
      },
    ];

    // Residential houses — spaced on the west and east sides
    const houseSpots = [
      { x: -34, z: -12, yaw: 0.3, name: '春香的家', style: 'modern', color: '#d9cfc0' },
      { x: -42, z: -20, yaw: 0.8, name: '健二的公寓', style: 'showa', color: '#c8c0b0' },
      { x: -30, z: -28, yaw: -0.2, name: '由纪的家', style: 'modern', color: '#e0d4c0' },
      { x: -44, z: -4, yaw: 1.2, name: '空屋', style: 'showa', color: '#b8b0a0' },
      { x: -38, z: -34, yaw: 0.1, name: '民家', style: 'modern', color: '#d0c4b0' },
      { x: -22, z: -36, yaw: -0.5, name: '民家', style: 'showa', color: '#c4b8a4' },
      { x: 26, z: 14, yaw: Math.PI, name: '教师宿舍', style: 'modern', color: '#d4c8b8' },
      { x: 28, z: -2, yaw: -1.0, name: '民家', style: 'modern', color: '#c8bca8' },
    ];

    let hi = 0;
    for (const h of houseSpots) {
      defs.push({
        id: `house-${hi++}`,
        factory: () =>
          createHouse({
            width: 7.2 + (hi % 3) * 0.4,
            depth: 6.2,
            floors: h.style === 'showa' ? 1 : 2,
            wallColor: h.color,
            roofColor: h.style === 'showa' ? '#5a4a3a' : '#4a5568',
            style: h.style,
            name: h.name,
          }),
        x: h.x,
        z: h.z,
        yaw: h.yaw,
        kind: 'house',
        name: h.name,
        col: { w: 7.2, d: 6.2 },
      });
    }

    for (const d of defs) {
      const b = d.factory();
      // sit slightly above the sphere so curved ground does not poke through
      placeOnPlanet(b, d.x, d.z, 0.12, d.yaw);
      b.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      scene.add(b);
      this.buildingGroups.set(d.id, b);

      // Attach a simple interior (visible when shell is faded)
      if (d.kind !== 'shrine' && d.kind !== 'warehouse') {
        try {
          const interior = buildInterior(d.kind === 'shoprow' ? 'cafe' : d.kind, d.col);
          interior.position.y = 0.06;
          interior.visible = true;
          interior.traverse((c) => {
            c.userData.isInterior = true;
          });
          b.add(interior);
          b.userData.hasInterior = true;
        } catch (err) {
          // interiors are optional polish
        }
      }

      // remember window materials for night glow (clone so they can differ)
      const windowMats = new Map();
      b.traverse((c) => {
        if (c.isMesh && c.material && c.material.color) {
          const hex = c.material.color.getHexString();
          if (hex === '9ec8e0' || hex === 'b0d0e0' || hex === 'a0c8d8' || hex === 'b8d8e8') {
            if (!windowMats.has(c.material.uuid)) {
              const clone = c.material.clone();
              clone.emissive = new THREE.Color(0x000000);
              clone.emissiveIntensity = 0;
              windowMats.set(c.material.uuid, clone);
            }
            c.material = windowMats.get(c.material.uuid);
          }
        }
      });
      if (windowMats.size) {
        this.windowMaterials.push({ id: d.id, mats: [...windowMats.values()], x: d.x, z: d.z });
      }

      // tight collider from col, door on the +z local side
      const col = d.col || b.userData.footprint || { w: 10, d: 8 };
      this.buildingColliders.push({
        id: d.id,
        minX: d.x - col.w / 2,
        maxX: d.x + col.w / 2,
        minZ: d.z - col.d / 2,
        maxZ: d.z + col.d / 2,
        doorGap: {
          x: d.x + (b.userData.doorLocal?.x || 0) * 0.3,
          z: d.z + col.d / 2,
        },
        kind: d.kind,
        name: d.name,
      });

      // doors → interact
      b.traverse((c) => {
        if (c.userData?.interact === 'door') {
          this.interactables.push({
            object: c,
            data: {
              kind: 'door',
              label: c.userData.label || '门',
              open: false,
              auto: c.userData.auto,
              hingeSide: c.userData.hingeSide,
              x: d.x + (c.position.x || 0) * 0.2,
              z: d.z + col.d / 2 + 1.2,
              buildingId: d.id,
              buildingKind: d.kind,
            },
          });
        }
        if (c.userData?.interact === 'vending') {
          this.interactables.push({
            object: c,
            data: {
              kind: 'vending',
              label: '自动售货机',
              price: 140,
              x: d.x + 6,
              z: d.z + 2,
            },
          });
        }
        if (c.userData?.interact === 'sit') {
          this.interactables.push({
            object: c,
            data: {
              kind: 'sit',
              label: '坐下',
              x: d.x + c.position.x,
              z: d.z + c.position.z,
            },
          });
        }
        if (c.userData?.interact === 'offering') {
          this.interactables.push({
            object: c,
            data: {
              kind: 'offering',
              label: '投入赛钱',
              price: 50,
              x: d.x,
              z: d.z,
            },
          });
        }
        if (c.userData?.interact === 'ticket') {
          this.interactables.push({
            object: c,
            data: { kind: 'ticket', label: '自动售票机', x: d.x - 6, z: d.z + 2 },
          });
        }
      });

      // shop interaction volume in front of commercial buildings
      if (b.userData.shop) {
        this.interactables.push({
          object: b,
          data: {
            kind: 'shop',
            label: `进入 ${d.name}`,
            shop: b.userData.shop,
            x: d.x,
            z: d.z + col.d / 2 + 1.5,
          },
        });
      }
    }

    // extra vending machines
    const v1 = createVendingMachine();
    placeOnPlanet(v1, -6, -16, 0.12, 0.2);
    scene.add(v1);
    this.interactables.push({
      object: v1,
      data: { kind: 'vending', label: '自动售货机', price: 140, x: -6, z: -16 },
    });

    const v2 = createVendingMachine('#3a7ab0');
    placeOnPlanet(v2, 8, -14, 0.12, -0.4);
    scene.add(v2);
    this.interactables.push({
      object: v2,
      data: { kind: 'vending', label: '自动售货机', price: 140, x: 8, z: -14 },
    });

    // benches in park
    for (const [x, z, yaw] of [
      [12, -16, 0.3],
      [16, -20, -0.2],
      [8, -12, 1.1],
      [-4, -22, 0.0],
      [4, -18, Math.PI],
    ]) {
      const bench = new THREE.Group();
      const wood = toonMaterial('#8b6a4a');
      const metal = toonMaterial('#3a3a42');
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 0.55), wood);
      seat.position.y = 0.45;
      seat.userData = { interact: 'sit', label: '长椅' };
      bench.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 0.1), wood);
      back.position.set(0, 0.85, -0.22);
      bench.add(back);
      bench.add(new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), metal));
      placeOnPlanet(bench, x, z, 0.05, yaw);
      scene.add(bench);
      this.interactables.push({
        object: seat,
        data: { kind: 'sit', label: '坐下', x, z },
      });
    }

    // bicycle props
    for (const [x, z] of [
      [-12, -16],
      [-13, -16],
      [12, -10],
    ]) {
      const b = createBicycle(toonMaterial('#4a7a9a'));
      placeOnPlanet(b, x, z, 0.12, Math.random() * Math.PI);
      scene.add(b);
    }
  }

  collectInteractables() {
    this.interaction.refresh(this.interactables.map((i) => i.object));
    // store data on objects for findNear
    for (const i of this.interactables) {
      i.object.userData.interactData = i.data;
    }
  }

  bindInput() {
    const canvas = this.renderer.domElement;

    window.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      if (e.code === 'KeyE') this.tryInteract();
      if (e.code === 'KeyF') this.toggleSit();
      if (e.code === 'KeyM') this.ui.showMap(!this.ui.els.mapOverlay.classList.contains('visible'));
      if (e.code === 'Escape') {
        this.ui.showMap(false);
        if (this.dialogue.active) this.dialogue.close();
      }
      if (e.code === 'Space' && this.dialogue.active) {
        e.preventDefault();
        this.dialogue.advance();
      }
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));

    canvas.addEventListener('mousedown', (e) => {
      this.mouse.dragging = true;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseup', () => {
      this.mouse.dragging = false;
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.mouse.dragging || this.dialogue.active) return;
      const dx = e.clientX - this.mouse.x;
      const dy = e.clientY - this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.player.camYaw -= dx * 0.005;
      this.player.camPitch = THREE.MathUtils.clamp(this.player.camPitch + dy * 0.004, -0.15, 1.1);
    });

    canvas.addEventListener(
      'wheel',
      (e) => {
        this.player.camDist = THREE.MathUtils.clamp(this.player.camDist + e.deltaY * 0.01, 3.5, 16);
      },
      { passive: true }
    );

    // touch look
    canvas.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          this.mouse.dragging = true;
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
        }
      },
      { passive: true }
    );
    canvas.addEventListener(
      'touchmove',
      (e) => {
        if (!this.mouse.dragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - this.mouse.x;
        const dy = e.touches[0].clientY - this.mouse.y;
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.player.camYaw -= dx * 0.005;
        this.player.camPitch = THREE.MathUtils.clamp(this.player.camPitch + dy * 0.004, -0.15, 1.1);
      },
      { passive: true }
    );
    canvas.addEventListener('touchend', () => {
      this.mouse.dragging = false;
    });

    // mobile stick
    const stick = document.getElementById('mobile-stick');
    const knob = document.getElementById('mobile-knob');
    if (stick && knob) {
      let active = false;
      let origin = { x: 0, y: 0 };
      const onStart = (e) => {
        active = true;
        const t = e.touches ? e.touches[0] : e;
        origin = { x: t.clientX, y: t.clientY };
      };
      const onMove = (e) => {
        if (!active) return;
        const t = e.touches ? e.touches[0] : e;
        const dx = t.clientX - origin.x;
        const dy = t.clientY - origin.y;
        const max = 48;
        const cl = Math.min(max, Math.hypot(dx, dy));
        const a = Math.atan2(dy, dx);
        knob.style.transform = `translate(${Math.cos(a) * cl}px, ${Math.sin(a) * cl}px)`;
        this.touchMove.x = (Math.cos(a) * cl) / max;
        this.touchMove.y = (Math.sin(a) * cl) / max;
      };
      const onEnd = () => {
        active = false;
        knob.style.transform = 'translate(0,0)';
        this.touchMove.x = 0;
        this.touchMove.y = 0;
      };
      stick.addEventListener('touchstart', onStart, { passive: true });
      stick.addEventListener('touchmove', onMove, { passive: true });
      stick.addEventListener('touchend', onEnd);
      stick.addEventListener('mousedown', onStart);
      window.addEventListener('mousemove', (e) => active && onMove(e));
      window.addEventListener('mouseup', onEnd);
    }

    const actionBtn = document.getElementById('mobile-action');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => this.tryInteract());
    }
  }

  bindUI() {
    document.getElementById('start-btn')?.addEventListener('click', () => {
      this.audio.unlock();
      this.paused = false;
      this.ui.showHUD();
      this.ui.toast('欢迎来到樱花小镇。用 WASD 移动，E 交互。');
    });

    document.getElementById('map-btn')?.addEventListener('click', () => {
      this.ui.showMap(true);
    });
    document.getElementById('map-close')?.addEventListener('click', () => {
      this.ui.showMap(false);
    });

    document.getElementById('dialogue')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('dialogue-choice')) return;
      this.dialogue.advance();
    });

    bus.on('quest:complete', () => {
      this.saveSystem.save(true);
    });

    bus.on('train:stopped', () => {
      this.audio.play('chime');
      this.quests.onObserve('train-stop');
    });

    bus.on('train:arriving', () => {
      this.audio.play('train-horn');
      // close crossings
      for (const c of this.crossings || []) {
        c.setOpen(false);
      }
    });

    bus.on('train:departing', () => {
      setTimeout(() => {
        for (const c of this.crossings || []) {
          c.setOpen(true);
        }
      }, 4000);
      this.quests.onObserve('train-ride-complete');
    });

    bus.on('dialogue:close', () => {
      // pass
    });
  }

  tryInteract() {
    if (this.dialogue.active) {
      this.dialogue.advance();
      return;
    }
    const target = this.interaction.findNear(this.player);
    if (!target) {
      this.ui.toast('附近没有可交互的东西。');
      return;
    }
    if (target.type === 'npc') {
      this.quests.onTalk(target.npc.id);
    }
    if (target.type === 'object') {
      const d = target.data;
      if (d.kind === 'vending') this.quests.onAction('buy', 'vending');
      if (d.kind === 'offering') this.quests.onAction('action', 'offering');
      if (d.kind === 'door' && d.buildingId === 'konbini') {
        this.quests.onPlace('konbini');
      }
    }
    this.interaction.perform(target);
  }

  toggleSit() {
    this.player.sitting = !this.player.sitting;
    this.ui.toast(this.player.sitting ? '你坐下休息。' : '你站起身。');
  }

  enterBuilding(id) {
    this.insideBuilding = id;
    this.setBuildingShellOpacity(id, 0.12);
    this.ui.toast('进入了建筑。');
  }

  exitBuilding() {
    if (this.insideBuilding) this.setBuildingShellOpacity(this.insideBuilding, 1);
    this.insideBuilding = null;
  }

  setBuildingShellOpacity(id, opacity) {
    const b = this.buildingGroups.get(id);
    if (!b) return;
    b.traverse((c) => {
      if (!c.isMesh || !c.material || c.userData.interact || c.userData.isInterior) return;
      if (opacity < 1) {
        if (!c.userData._origMat) c.userData._origMat = c.material;
        if (!c.userData._fadeMat) {
          const m = c.material.clone();
          m.transparent = true;
          m.opacity = opacity;
          m.depthWrite = false;
          c.userData._fadeMat = m;
        }
        c.userData._fadeMat.opacity = opacity;
        c.material = c.userData._fadeMat;
      } else if (c.userData._origMat) {
        c.material = c.userData._origMat;
      }
    });
  }

  resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  gatherInput() {
    let x = 0;
    let z = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) z += 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) z -= 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;

    // touch
    x += this.touchMove.x;
    z += -this.touchMove.y;

    const run = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
    this.player.setInput({ forward: z, right: x, run });
  }

  updateEnvironment() {
    const hour = this.time.hour;
    const colors = skyColors(hour);
    const w = this.weather.getVisual();

    updateSky(this.sky, colors);

    // Sun orbits above the town (which sits near the north pole)
    this.sun.intensity = colors.sunIntensity * w.lightDim * 1.35;
    this.sun.color.copy(colors.sun);
    const ang = ((hour - 6) / 12) * Math.PI; // 6h = east horizon, 12h = overhead
    const elev = Math.sin(ang);
    const azim = Math.cos(ang);
    const dist = 160;
    const y = PLANET_RADIUS + Math.max(18, elev * dist + 40);
    this.sun.position.set(azim * dist, y, azim * dist * 0.35 + 30);
    this.sun.target.position.set(0, PLANET_RADIUS, 0);
    this.sun.target.updateMatrixWorld();

    this.hemi.intensity = (0.85 + colors.ambientIntensity * 0.85) * (0.85 + w.lightDim * 0.25);
    this.hemi.color.copy(colors.ambient).lerp(new THREE.Color('#c8e0f8'), 0.35);
    this.hemi.groundColor.copy(colors.ambient).multiplyScalar(0.55);

    // fog
    if (this.scene.fog) {
      this.scene.fog.color.copy(colors.fog);
      this.scene.fog.density = w.fogDensity;
    }
    this.renderer.setClearColor(colors.mid);

    // street lights
    updateStreetLights(this.streetLights, hour, w.lightDim);

    // window glow at night
    const nightFactor = hour < 6.5 || hour > 17.2 ? 1 : hour < 7.5 ? 7.5 - hour : hour > 16.2 ? (hour - 16.2) : 0;
    const glow = Math.min(1, Math.max(0, nightFactor));
    for (const wm of this.windowMaterials) {
      // some windows lit, some not — based on building id hash
      const lit = (wm.id.charCodeAt(wm.id.length - 1) + Math.floor(hour)) % 3 !== 0;
      for (const m of wm.mats) {
        if (!m.emissive) m.emissive = new THREE.Color('#000000');
        m.emissive.setHex(lit && glow > 0.2 ? 0xffc878 : 0x000000);
        m.emissiveIntensity = lit ? glow * 0.55 : 0;
      }
    }

    // ground wetness (slight darken)
    if (this.ground?.material?.color) {
      const base = new THREE.Color('#6a9a62');
      base.multiplyScalar(1 - w.wetRoad * 0.18);
      this.ground.material.color.copy(base);
    }

    // store flags
    this.worldState.setFlag('konbiniOpen', true);
    this.worldState.setFlag('cafeOpen', hour >= 8 && hour < 19);
    this.worldState.setFlag('schoolOpen', this.time.isSchoolHours);
    this.worldState.setFlag('crossingActive', this.crossings?.some((c) => c.closed) || false);
  }

  updatePlaceQuests() {
    const px = this.player.x;
    const pz = this.player.z;
    const near = (id, x, z, r = 6) => Math.hypot(px - x, pz - z) < r;
    if (near('park', PLACES.park.x, PLACES.park.z, 8)) this.quests.onPlace('park');
    if (near('konbini', PLACES.konbini.x, PLACES.konbini.z, 8)) this.quests.onPlace('konbini');
    if (near('shrine', PLACES.shrine.x, PLACES.shrine.z, 10)) this.quests.onPlace('shrine');
    if (near('station', PLACES.station.x, PLACES.station.z, 10)) {
      // station visit
    }
  }

  start() {
    this.renderer.setAnimationLoop(() => this.frame());
  }

  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.paused) {
      this.time.update(dt);
      this.weather.update(dt, this.time);
      this.gatherInput();
      this.player.update(dt, { buildingColliders: this.buildingColliders });
      this.npcs.update(dt, this.time, this.weather, this.worldState, this.player, this.train);
      this.train.update(dt, this.time.hour);
      this.events.update(dt, this.time);
      this.updateEnvironment();
      this.updatePlaceQuests();

      // crossings
      const t = performance.now() / 1000;
      for (const c of this.crossings || []) c.update(t);

      // atmosphere
      if (this.petals) this.petals.update(dt, t);
      if (this.fireflies) this.fireflies.update(dt, t, this.time.isNight);

      // interaction hint
      const target = this.interaction.findNear(this.player);
      this.ui.showInteractHint(this.interaction.getHint(target));

      // UI clock
      this.ui.updateClock(this.time, this.weather);
      this.ui.updateStats(this.worldState);

      // audio
      this.audio.update(this.time.hour, this.weather.rainIntensity, this.time.isNight);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
