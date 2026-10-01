/**
 * NPC roster + AI: schedules, destinations, social reactions, simple decisions.
 */
import * as THREE from 'three';
import { placeOnPlanet, surfacePoint } from '../world/Planet.js';
import { toonMaterial } from '../utils/materials.js';
import { bus } from '../core/EventBus.js';

const JOB_SCHEDULES = {
  student: {
    weekdays: [
      { until: 7.5, at: 'home' },
      { until: 8.2, at: 'school' },
      { until: 15.5, at: 'school' },
      { until: 16.5, at: 'park' },
      { until: 18, at: 'home' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 10, at: 'home' },
      { until: 13, at: 'park' },
      { until: 16, at: 'konbini' },
      { until: 24, at: 'home' },
    ],
  },
  office: {
    weekdays: [
      { until: 7.2, at: 'home' },
      { until: 7.8, at: 'station' },
      { until: 17.5, at: 'work' },
      { until: 18.3, at: 'station' },
      { until: 19.2, at: 'konbini' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 9, at: 'home' },
      { until: 12, at: 'cafe' },
      { until: 15, at: 'park' },
      { until: 24, at: 'home' },
    ],
  },
  shopkeeper: {
    weekdays: [
      { until: 8, at: 'home' },
      { until: 20, at: 'work' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 8, at: 'home' },
      { until: 18, at: 'work' },
      { until: 24, at: 'home' },
    ],
  },
  elderly: {
    weekdays: [
      { until: 8, at: 'home' },
      { until: 10, at: 'shrine' },
      { until: 12, at: 'home' },
      { until: 15, at: 'park' },
      { until: 18, at: 'home' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 9, at: 'home' },
      { until: 12, at: 'shrine' },
      { until: 16, at: 'cafe' },
      { until: 24, at: 'home' },
    ],
  },
  child: {
    weekdays: [
      { until: 8, at: 'home' },
      { until: 14, at: 'school' },
      { until: 17, at: 'park' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 9, at: 'home' },
      { until: 12, at: 'park' },
      { until: 15, at: 'konbini' },
      { until: 24, at: 'home' },
    ],
  },
  stationStaff: {
    weekdays: [
      { until: 6.5, at: 'home' },
      { until: 16, at: 'station' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 7, at: 'home' },
      { until: 14, at: 'station' },
      { until: 24, at: 'home' },
    ],
  },
  doctor: {
    weekdays: [
      { until: 8, at: 'home' },
      { until: 18, at: 'clinic' },
      { until: 24, at: 'home' },
    ],
    weekend: [
      { until: 9, at: 'home' },
      { until: 13, at: 'clinic' },
      { until: 24, at: 'home' },
    ],
  },
};

// Place IDs → layout coordinates
// Place IDs → layout coordinates (match building placement)
export const PLACES = {
  home: { x: -34, z: -12 },
  home2: { x: -42, z: -20 },
  home3: { x: -30, z: -28 },
  home4: { x: -38, z: -34 },
  home5: { x: -22, z: -36 },
  home6: { x: -44, z: -4 },
  home7: { x: -14, z: 14 },
  home8: { x: 28, z: -2 },
  station: { x: 0, z: -6 },
  konbini: { x: -20, z: -14 },
  cafe: { x: 16, z: -8 },
  school: { x: 36, z: 22 },
  park: { x: 12, z: -18 },
  shrine: { x: -32, z: 34 },
  clinic: { x: -28, z: 2 },
  shop: { x: 2, z: -28 },
  work: { x: 32, z: -26 },
  river: { x: 22, z: -38 },
};

function placeIdFor(npc, key) {
  if (key === 'home') return npc.homeId || 'home';
  return key;
}

export class NPCSystem {
  constructor() {
    this.npcs = [];
    this.memory = {}; // player-npc memory
    this.nav = null; // optional nav graph
  }

  createRoster() {
    const defs = [
      {
        id: 'haruka',
        name: '春香',
        job: 'shopkeeper',
        homeId: 'home',
        workId: 'cafe',
        color: '#c45c48',
        hair: '#3a2020',
        personality: 'warm',
        greeting: '啊，是你。今天也来得很早呢。',
        lines: [
          '早安。要不要来一杯手冲？',
          '今天豆子烤得不错。',
          '下午可能会下雨，记得带伞。',
          '店里最近来了新甜点，有空尝尝。',
        ],
      },
      {
        id: 'kenji',
        name: '健二',
        job: 'office',
        homeId: 'home2',
        workId: 'work',
        color: '#3a5a8a',
        hair: '#201818',
        personality: 'hurried',
        greeting: '不好意思，我赶电车。',
        lines: [
          '最近工作有点忙……',
          '要是列车晚点我就完了。',
          '晚上会去便利店买点吃的。',
          '你也住这附近吗？',
        ],
      },
      {
        id: 'yuki',
        name: '由纪',
        job: 'student',
        homeId: 'home3',
        workId: 'school',
        color: '#6a5a8a',
        hair: '#2a2030',
        personality: 'cheerful',
        greeting: '你好！今天天气真好～',
        lines: [
          '放学后要不要去公园？',
          '数学作业好难……',
          '听说神社那边樱花开了。',
          '你有见过我的手帕吗？',
        ],
      },
      {
        id: 'taro',
        name: '太郎',
        job: 'child',
        homeId: 'home4',
        workId: 'school',
        color: '#e0a040',
        hair: '#3a2818',
        personality: 'playful',
        greeting: '大哥哥好！',
        lines: [
          '我要去公园玩！',
          '妈妈说不能跑太远。',
          '你看那只猫！',
          '电车好长啊！',
        ],
      },
      {
        id: 'sachiko',
        name: '幸子',
        job: 'elderly',
        homeId: 'home5',
        workId: 'shrine',
        color: '#8a6a7a',
        hair: '#c8c0b8',
        personality: 'gentle',
        greeting: '哎呀，是客人呢。',
        lines: [
          '这镇子的樱花，一年比一年好了。',
          '慢慢走，不着急。',
          '神社的石阶要小心。',
          '年轻真好啊。',
        ],
      },
      {
        id: 'masao',
        name: '正雄',
        job: 'stationStaff',
        homeId: 'home6',
        workId: 'station',
        color: '#2a4a5a',
        hair: '#2a2a2a',
        personality: 'dutiful',
        greeting: '欢迎来到桜町。',
        lines: [
          '下一班列车快到了。',
          '道口附近请小心。',
          '周末班次会少一些。',
          '这张时刻表给你。',
        ],
      },
      {
        id: 'dr-honda',
        name: '本田医生',
        job: 'doctor',
        homeId: 'home7',
        workId: 'clinic',
        color: '#e8e8e8',
        hair: '#4a4a4a',
        personality: 'calm',
        greeting: '今天身体怎么样？',
        lines: [
          '换季容易感冒。',
          '累了就休息一下。',
          '镇上的空气很好。',
          '有需要可以来诊所。',
        ],
      },
      {
        id: 'aya',
        name: '彩',
        job: 'student',
        homeId: 'home8',
        workId: 'school',
        color: '#d07090',
        hair: '#5a3040',
        personality: 'quiet',
        greeting: '……你好。',
        lines: [
          '我在看云。',
          '图书馆的书还没还。',
          '河边很安静。',
          '你也喜欢樱花吗？',
        ],
      },
    ];

    this.npcs = defs.map((d) => this.buildNPC(d));
    return this.npcs;
  }

  buildNPC(def) {
    const g = new THREE.Group();
    g.name = `npc-${def.id}`;

    const skin = toonMaterial('#f0c8a0');
    const body = toonMaterial(def.color);
    const hair = toonMaterial(def.hair);
    const dark = toonMaterial('#2a2a32');

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.7, 0.3), body);
    torso.position.y = 1.14;
    g.add(torso);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.34), skin);
    head.position.y = 1.7;
    g.add(head);
    const hairMesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.38), hair);
    hairMesh.position.y = 1.86;
    g.add(hairMesh);

    for (const side of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.16), body);
      arm.position.set(side * 0.38, 1.15, 0);
      arm.name = side < 0 ? 'armL' : 'armR';
      g.add(arm);
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.68, 0.2), dark);
      leg.position.set(side * 0.15, 0.48, 0);
      leg.name = side < 0 ? 'legL' : 'legR';
      g.add(leg);
    }

    // name sprite (billboard)
    const label = makeNameLabel(def.name);
    label.position.y = 2.25;
    g.add(label);

    return {
      id: def.id,
      name: def.name,
      job: def.job,
      def,
      group: g,
      x: (PLACES[def.homeId]?.x ?? 0) + (Math.random() - 0.5) * 3.5,
      z: (PLACES[def.homeId]?.z ?? 0) + (Math.random() - 0.5) * 3.5,
      yaw: 0,
      state: 'idle', // idle | walking | talking | working | waiting | riding
      target: null,
      path: [],
      pathIndex: 0,
      speed: 2.2 + Math.random() * 0.6,
      waitTimer: 0,
      mood: 1,
      bond: 0,
      currentPlace: 'home',
      umbrella: null,
      socialCooldown: 0,
      lastSpoke: -999,
    };
  }

  bindNav(nav) {
    this.nav = nav;
  }

  /** Decide destination from schedule + world conditions */
  desiredPlace(npc, timeSys, weatherSys, worldState) {
    const hour = timeSys.hour;
    const weekend = timeSys.isWeekend;
    const schedule = JOB_SCHEDULES[npc.job] || JOB_SCHEDULES.office;
    const rows = weekend ? schedule.weekend : schedule.weekdays;

    let dest = rows[rows.length - 1].at;
    for (const row of rows) {
      if (hour < row.until) {
        dest = row.at;
        break;
      }
    }

    // Decision layer
    if (weatherSys.isRaining && dest === 'park') {
      dest = Math.random() < 0.5 ? 'konbini' : 'cafe';
      npc.mood = 0.7;
    }
    if (dest === 'cafe' && worldState.flags.cafeOpen === false) dest = 'konbini';
    if (dest === 'konbini' && worldState.flags.konbiniOpen === false) dest = 'home';
    if (npc.job === 'student' && !timeSys.isSchoolHours && !weekend && hour > 7 && hour < 16) {
      // school may be open still
    }

    return placeIdFor(npc, dest === 'work' ? npc.workId : dest);
  }

  update(dt, timeSys, weatherSys, worldState, player, train) {
    for (const npc of this.npcs) {
      npc.socialCooldown = Math.max(0, npc.socialCooldown - dt);

      // rain umbrella
      if (weatherSys.isRaining && !npc.umbrella) {
        npc.umbrella = createUmbrella(npc.def.color);
        npc.group.add(npc.umbrella);
      } else if (!weatherSys.isRaining && npc.umbrella) {
        npc.group.remove(npc.umbrella);
        npc.umbrella = null;
      }

      if (npc.state === 'talking') {
        npc.waitTimer -= dt;
        if (npc.waitTimer <= 0) npc.state = 'walking';
      }

      if (npc.state === 'waiting') {
        npc.waitTimer -= dt;
        // wait for train
        if (train && train.isAtStation) {
          npc.state = 'walking';
          // "board" — hide briefly then reappear at a far place (abstracted ride)
          npc.group.visible = false;
          setTimeout(() => {
            const dest = PLACES.station;
            npc.x = dest.x + (Math.random() - 0.5) * 4;
            npc.z = dest.z + (Math.random() - 0.5) * 4;
            npc.group.visible = true;
            npc.state = 'walking';
          }, 3500);
        } else if (npc.waitTimer < -25) {
          npc.state = 'walking';
        }
      }

      if (npc.state === 'walking' || npc.state === 'idle') {
        const destId = this.desiredPlace(npc, timeSys, weatherSys, worldState);
        const dest = PLACES[destId] || PLACES.home;
        const dx = dest.x - npc.x;
        const dz = dest.z - npc.z;
        const dist = Math.hypot(dx, dz);

        if (dist > 1.4) {
          npc.state = 'walking';
          // move toward dest; simple direct + slight noise
          const speedMul = weatherSys.isRaining ? 0.85 : 1;
          const sp = npc.speed * speedMul * (npc.state === 'walking' ? 1 : 0);
          // occasionally path via station (commute)
          let tx = dest.x;
          let tz = dest.z;
          if (dist > 25 && Math.random() < 0.02) {
            // detour
            tx += (Math.random() - 0.5) * 8;
            tz += (Math.random() - 0.5) * 8;
          }
          const ndx = tx - npc.x;
          const ndz = tz - npc.z;
          const nl = Math.hypot(ndx, ndz) || 1;
          npc.x += (ndx / nl) * sp * dt;
          npc.z += (ndz / nl) * sp * dt;
          npc.yaw = Math.atan2(ndx, ndz);
          npc.currentPlace = destId;
        } else {
          npc.state = 'idle';
          npc.currentPlace = destId;
          // chance to wait at station for train
          if (destId === 'station' && train && train.state !== 'dwelling' && Math.random() < 0.01) {
            npc.state = 'waiting';
            npc.waitTimer = 20;
          }
        }

        this.animateNPC(npc, dt);
      }

      // social: nearby NPC greeting
      if (npc.socialCooldown <= 0) {
        for (const other of this.npcs) {
          if (other === npc) continue;
          const d = Math.hypot(other.x - npc.x, other.z - npc.z);
          if (d < 2.2 && Math.random() < 0.002) {
            npc.socialCooldown = 8;
            other.socialCooldown = 8;
            npc.state = 'talking';
            other.state = 'talking';
            npc.waitTimer = 3;
            other.waitTimer = 3;
            npc.yaw = Math.atan2(other.x - npc.x, other.z - npc.z);
            other.yaw = Math.atan2(npc.x - other.x, npc.z - other.z);
            bus.emit('npc:social', { a: npc, b: other });
            break;
          }
        }
      }

      placeOnPlanet(npc.group, npc.x, npc.z, 0, npc.yaw);
    }
  }

  animateNPC(npc, dt) {
    const t = performance.now() / 1000;
    const walking = npc.state === 'walking';
    const swing = walking ? Math.sin(t * 7 + npc.id.length) * 0.4 : 0;
    const legL = npc.group.getObjectByName('legL');
    const legR = npc.group.getObjectByName('legR');
    const armL = npc.group.getObjectByName('armL');
    const armR = npc.group.getObjectByName('armR');
    if (legL) legL.rotation.x = swing;
    if (legR) legR.rotation.x = -swing;
    if (armL) armL.rotation.x = -swing * 0.6;
    if (armR) armR.rotation.x = swing * 0.6;
  }

  /** Find nearest NPC to a layout position */
  nearestTo(x, z, maxDist = 3.5) {
    let best = null;
    let bestD = maxDist;
    for (const npc of this.npcs) {
      const d = Math.hypot(npc.x - x, npc.z - z);
      if (d < bestD) {
        bestD = d;
        best = npc;
      }
    }
    return best;
  }

  getById(id) {
    return this.npcs.find((n) => n.id === id);
  }
}

function makeNameLabel(name) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(20,28,42,0.55)';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(8, 12, 240, 40, 12);
    ctx.fill();
  } else {
    ctx.fillRect(8, 12, 240, 40);
  }
  ctx.fillStyle = '#fff8f0';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 128, 32);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, depthTest: true, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.6, 0.4, 1);
  return sprite;
}

function createUmbrella(color) {
  const g = new THREE.Group();
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.28, 8), toonMaterial(color));
  canopy.position.y = 2.15;
  g.add(canopy);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), toonMaterial('#3a3a3a'));
  pole.position.y = 1.7;
  g.add(pole);
  return g;
}
