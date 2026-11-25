import * as THREE from 'three';
import { CollisionSystem } from '../core/CollisionSystem.js';
import { createAnimeCharacter, createCatMesh } from './CharacterMesh.js';

const SPOTS = {
  bakeryCounter: { x: -11.5, z: 9.2, label: '在木漏れ日面包店忙碌' },
  bakeryPorch: { x: -11.5, z: 4.5, label: '在面包店门口打扫' },
  catBakerySun: { x: -11.2, z: 4.6, label: '在面包店门口晒太阳' },
  catShrineNap: { x: 44.6, z: -3.6, label: '在樱森神社台阶边打盹' },
  catRiverNap: { x: 20.0, z: -4.2, label: '在樱川河堤舔毛发呆' },
  catAobaNap: { x: 12.2, z: 4.4, label: '在青叶商店门前打瞌睡' },
  aobaCounter: { x: 10.2, z: 9.2, label: '在青叶商店看店' },
  aobaBench: { x: 12.4, z: 4.4, label: '在青叶商店门前乘凉' },
  riverBenchNorth: { x: 20.0, z: -4.2, label: '在樱川河畔散步' },
  riverBenchSouth: { x: 20.0, z: 8.2, label: '在樱花河堤吹风' },
  bridgeCenter: { x: 29.0, z: 2.1, label: '在樱川红桥上写生' },
  shrinePlaza: { x: 45.2, z: -4.2, label: '在樱森神社参拜' },
  stationPlatform: { x: -16.2, z: -21.8, label: '在樱花站月台看电车' },
  crossingSouth: { x: -2.0, z: -13.6, label: '在铁道口等电车经过' },
  northField: { x: -4.2, z: -28.5, label: '在北侧田野边玩耍' },
  pierBank: { x: 19.6, z: 13.8, label: '在钓鱼栈道旁看河水' },
  bakeryCafeTable: { x: -10.3, z: 7.4, label: '在面包店里喝咖啡' },
  streetPlaza: { x: -2.6, z: 1.6, label: '在商店街闲逛' },
};

function buildPath(fromX, fromZ, toX, toZ) {
  const pts = [];
  const push = (x, z) => pts.push(new THREE.Vector3(x, 0, z));
  let cx = fromX;
  let cz = fromZ;

  if (cz > 5.8 && cx < -6 && cx > -16 && !(toZ > 5.8 && toX < -6 && toX > -16)) {
    push(-11.5, 4.4); cx = -11.5; cz = 4.4;
  } else if (cz > 5.8 && cx > 5.5 && cx < 15 && !(toZ > 5.8 && toX > 5.5 && toX < 15)) {
    push(10.2, 4.4); cx = 10.2; cz = 4.4;
  }
  if (cx > 35 && toX < 25) {
    push(41.2, 1.7); push(36.0, 2.1); push(21.0, 2.1); cx = 21.0; cz = 2.1;
  }
  if (cz < -18 && toZ > -18) {
    if (cx < -10) push(-6.0, -22.2);
    push(0.0, -22.0); push(0.0, -14.2); cx = 0.0; cz = -14.2;
  } else if (cz > -18 && toZ < -18) {
    push(0.0, -14.2); push(0.0, -22.0); cx = 0.0; cz = -22.0;
    if (toX < -10 && toZ > -25) push(-6.0, -22.2);
  }
  if (cx < 25 && toX > 35) {
    push(20.5, 2.1); push(36.5, 2.1); push(41.2, 1.7);
  }
  if (toZ > 5.8 && toX < -6 && toX > -16) push(-11.5, 4.4);
  else if (toZ > 5.8 && toX > 5.5 && toX < 15) push(10.2, 4.4);

  push(toX, toZ);
  return pts;
}

export class NPCSystem {
  constructor(scene) {
    this.scene = scene;
    this.npcs = [];
  }

  build() {
    const definitions = [
      {
        id: 'misaki', name: '美咲', role: '「木漏れ日」面包咖啡馆店主', mapColor: '#e87893', isCat: false,
        meshOpts: { scale: 0.94, hairColor: 0x5c3c2e, hairStyle: 'ponytail', shirtColor: 0xfff7ec, apronColor: 0xd9738a, pantsColor: 0x6b5649 },
        schedule: [
          { from: 0, to: 7.5, spot: 'bakeryPorch' },
          { from: 7.5, to: 18.0, spot: 'bakeryCounter' },
          { from: 18.0, to: 21.0, spot: 'riverBenchSouth' },
          { from: 21.0, to: 24.1, spot: 'bakeryCounter' },
        ],
        scheduleSummary: '06:00 店前清扫 · 07:30-18:00 面包店营业 · 18:00-21:00 樱川河堤散步',
      },
      {
        id: 'genzo', name: '源造爷爷', role: '「青叶商店」老店主', mapColor: '#4c8c64', isCat: false,
        meshOpts: { scale: 0.92, hairColor: 0xd6d4ce, hairStyle: 'short', shirtColor: 0xe8e0cc, jacketColor: 0x5e705c, apronColor: 0x355878, pantsColor: 0x45494e },
        schedule: [
          { from: 0, to: 8.2, spot: 'shrinePlaza' },
          { from: 8.2, to: 18.8, spot: 'aobaCounter' },
          { from: 18.8, to: 22.0, spot: 'aobaBench' },
          { from: 22.0, to: 24.1, spot: 'aobaCounter' },
        ],
        scheduleSummary: '清晨 樱森神社散步 · 08:15-18:45 青叶商店营业 · 傍晚 店前长椅纳凉',
      },
      {
        id: 'yuu', name: '小悠', role: '热爱电车的小学生', mapColor: '#e8a23c', isCat: false,
        meshOpts: { scale: 0.72, hairColor: 0x342a26, hairStyle: 'short', hatColor: 0xf2c94c, shirtColor: 0xf5f2ea, jacketColor: 0x4a78a8, pantsColor: 0x3c4c63, hasBackpack: true },
        schedule: [
          { from: 0, to: 10.5, spot: 'crossingSouth' },
          { from: 10.5, to: 14.5, spot: 'northField' },
          { from: 14.5, to: 18.2, spot: 'pierBank' },
          { from: 18.2, to: 24.1, spot: 'streetPlaza' },
        ],
        scheduleSummary: '上午 铁道口看电车 · 中午 北侧田野 · 午后 河畔栈道 · 傍晚 商店街',
      },
      {
        id: 'haruto', name: '晴人', role: '旅居小镇的摄影师', mapColor: '#5685b8', isCat: false,
        meshOpts: { scale: 1.0, hairColor: 0x2c303a, hairStyle: 'short', shirtColor: 0xeff2f5, jacketColor: 0x7b6d5c, pantsColor: 0x3f434a, hasCamera: true },
        schedule: [
          { from: 0, to: 11.0, spot: 'bridgeCenter' },
          { from: 11.0, to: 14.0, spot: 'bakeryCafeTable' },
          { from: 14.0, to: 17.5, spot: 'shrinePlaza' },
          { from: 17.5, to: 24.1, spot: 'stationPlatform' },
        ],
        scheduleSummary: '上午 樱川红桥写生拍照 · 中午 面包店喝咖啡 · 午后 神社 · 黄昏 樱花站月台',
      },
      {
        id: 'mikan', name: '阿橘', role: '小镇的橘色招财猫', mapColor: '#f28c38', isCat: true,
        schedule: [
          { from: 0, to: 10.0, spot: 'catBakerySun' },
          { from: 10.0, to: 15.0, spot: 'catShrineNap' },
          { from: 15.0, to: 19.0, spot: 'catRiverNap' },
          { from: 19.0, to: 24.1, spot: 'catAobaNap' },
        ],
        scheduleSummary: '喜欢晒太阳，经常在面包店门口、神社台阶、河堤与杂货店前打盹',
      },
    ];

    for (const def of definitions) {
      const meshObj = def.isCat ? createCatMesh() : createAnimeCharacter(def.meshOpts);
      const initialKey = this._getSpotKeyForHour(def, 8.25);
      const initialSpot = SPOTS[initialKey];
      const startY = CollisionSystem.getGroundHeight(initialSpot.x, initialSpot.z);

      const npc = {
        ...def,
        meshObj,
        position: new THREE.Vector3(initialSpot.x, startY, initialSpot.z),
        yaw: 0,
        currentSpotKey: initialKey,
        activityLabel: initialSpot.label,
        path: [],
        waitingAtCrossing: false,
        talkingToPlayer: false,
      };
      meshObj.root.position.copy(npc.position);
      this.scene.add(meshObj.root);
      this.npcs.push(npc);
    }
  }

  _getSpotKeyForHour(def, hour) {
    for (const entry of def.schedule) {
      if (hour >= entry.from && hour < entry.to) return entry.spot;
    }
    return def.schedule[0].spot;
  }

  update(dt, hour, railwayStatus, playerPos) {
    const now = performance.now() * 0.001;
    for (const npc of this.npcs) {
      const desiredSpotKey = this._getSpotKeyForHour(npc, hour);
      if (desiredSpotKey !== npc.currentSpotKey) {
        npc.currentSpotKey = desiredSpotKey;
        const target = SPOTS[desiredSpotKey];
        npc.activityLabel = target.label;
        npc.path = buildPath(npc.position.x, npc.position.z, target.x, target.z);
      }

      let moveSpeed = 0;
      if (npc.talkingToPlayer) {
        const targetYaw = Math.atan2(playerPos.x - npc.position.x, playerPos.z - npc.position.z);
        let diff = targetYaw - npc.yaw;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        npc.yaw += diff * Math.min(1, dt * 8);
      } else if (npc.path.length > 0) {
        const nextPt = npc.path[0];
        const dx = nextPt.x - npc.position.x;
        const dz = nextPt.z - npc.position.z;
        const dist = Math.hypot(dx, dz);

        const approachingCrossingSouth = railwayStatus.gatesClosed && npc.position.z > -15.3 && npc.position.z < -13.4 && Math.abs(npc.position.x) < 3.8 && dz < 0;
        const approachingCrossingNorth = railwayStatus.gatesClosed && npc.position.z < -20.7 && npc.position.z > -22.6 && Math.abs(npc.position.x) < 3.8 && dz > 0;
        npc.waitingAtCrossing = approachingCrossingSouth || approachingCrossingNorth;

        if (!npc.waitingAtCrossing) {
          if (dist < 0.3) {
            npc.path.shift();
          } else {
            const speed = npc.isCat ? 2.1 : 2.35;
            moveSpeed = speed;
            const step = Math.min(dist, speed * dt);
            npc.position.x += (dx / dist) * step;
            npc.position.z += (dz / dist) * step;
            const targetYaw = Math.atan2(dx, dz);
            let diff = targetYaw - npc.yaw;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            npc.yaw += diff * Math.min(1, dt * 9);
          }
        }
      } else if (npc.position.distanceTo(playerPos) < 4.5) {
        const targetYaw = Math.atan2(playerPos.x - npc.position.x, playerPos.z - npc.position.z);
        let diff = targetYaw - npc.yaw;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        npc.yaw += diff * Math.min(1, dt * 3.5);
      }

      const gy = CollisionSystem.getGroundHeight(npc.position.x, npc.position.z);
      npc.position.y += (gy - npc.position.y) * Math.min(1, dt * 12);
      npc.meshObj.root.position.copy(npc.position);
      npc.meshObj.root.rotation.y = npc.yaw;
      npc.meshObj.animate(now + npc.position.x * 0.2, moveSpeed, false);
    }
  }
}
