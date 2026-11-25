import * as THREE from 'three';
import { toonMat } from '../core/toonMaterials.js';

/**
 * Core named residents (Kenji, Aoi, Haru, Ren, Mike the Cat) + 3 Background Commuters.
 * Uses clean road-aligned routing, level-crossing waiting, station platform waiting,
 * umbrella-in-rain behavior, shopping bag carrying, and home-window lighting linkage!
 */
export class NPCManager {
  constructor(scene, collision, railway) {
    this.scene = scene;
    this.collision = collision;
    this.railway = railway;
    this.npcs = [];

    this._spawnCoreResidents();
    this._spawnBackgroundCommuters();
  }

  _buildHumanoidMesh({ hairColor, topColor, bottomColor, apronColor = null, heightScale = 1.0 }) {
    const root = new THREE.Group();
    const matSkin = toonMat(0xffe1c9);
    const matHair = toonMat(hairColor);
    const matTop = toonMat(topColor);
    const matBot = toonMat(bottomColor);

    const legGeo = new THREE.BoxGeometry(0.15, 0.54, 0.16);
    const leftLeg = new THREE.Mesh(legGeo, matBot);
    leftLeg.position.set(-0.1, 0.28, 0);
    leftLeg.castShadow = true;
    const rightLeg = new THREE.Mesh(legGeo, matBot);
    rightLeg.position.set(0.1, 0.28, 0);
    rightLeg.castShadow = true;

    const torso = new THREE.Group();
    torso.position.y = 0.58;

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.24), matTop);
    body.position.y = 0.25;
    body.castShadow = true;
    torso.add(body);

    if (apronColor !== null) {
      const apron = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.26), toonMat(apronColor));
      apron.position.set(0, 0.14, 0.01);
      torso.add(apron);
    }

    const armGeo = new THREE.BoxGeometry(0.12, 0.42, 0.13);
    const leftArm = new THREE.Mesh(armGeo, matTop);
    leftArm.position.set(-0.26, 0.26, 0);
    const rightArm = new THREE.Mesh(armGeo, matTop);
    rightArm.position.set(0.26, 0.26, 0);
    torso.add(leftArm, rightArm);

    // Shopping bag (toggled when carrying goods from Sakura Mart!)
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.1), toonMat(0xfefefe));
    bag.position.set(0.28, -0.04, 0.08);
    bag.visible = false;
    torso.add(bag);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), matSkin);
    head.position.y = 0.7;
    head.castShadow = true;
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.215, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.6), matHair);
    hair.position.y = 0.72;
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x221f28 });
    const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), eyeMat);
    lEye.position.set(-0.07, 0.7, 0.18);
    const rEye = lEye.clone();
    rEye.position.x = 0.07;
    torso.add(head, hair, lEye, rEye);

    // Umbrella when raining
    const umbrella = new THREE.Group();
    const uPole = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.9, 6), toonMat(0x525560));
    uPole.position.set(0.24, 0.86, 0.08);
    const uCanopy = new THREE.Mesh(
      new THREE.ConeGeometry(0.6, 0.22, 9, 1, true),
      toonMat(0xf5e2ea, { transparent: true, opacity: 0.82, side: THREE.DoubleSide })
    );
    uCanopy.position.set(0.24, 1.32, 0.08);
    umbrella.add(uPole, uCanopy);
    umbrella.visible = false;
    torso.add(umbrella);

    root.add(leftLeg, rightLeg, torso);
    root.scale.setScalar(heightScale);
    return { root, leftLeg, rightLeg, leftArm, rightArm, torso, umbrella, bag };
  }

  _buildCatMesh() {
    const root = new THREE.Group();
    const white = toonMat(0xf9f5ee);
    const orange = toonMat(0xd98a4a);
    const dark = toonMat(0x3b3536);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.46), white);
    body.position.y = 0.22;
    body.castShadow = true;
    const patch = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.14, 0.22), orange);
    patch.position.set(0, 0.28, -0.05);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), white);
    head.position.set(0, 0.34, 0.24);
    head.castShadow = true;
    const earL = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.12, 4), orange);
    earL.position.set(-0.08, 0.48, 0.24);
    const earR = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.12, 4), dark);
    earR.position.set(0.08, 0.48, 0.24);
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.035, 0.34, 6), dark);
    tail.position.set(0, 0.32, -0.26);
    tail.rotation.x = -0.6;

    root.add(body, patch, head, earL, earR, tail);
    return { root, tail, isCat: true };
  }

  _spawnCoreResidents() {
    // 1. Kenji Sato — Café Komorebi Master
    this.npcs.push({
      id: 'kenji',
      name: '佐藤 健二',
      isCore: true,
      speed: 2.35,
      homePos: new THREE.Vector3(26, 0, -21.8),
      pos: new THREE.Vector3(16.6, 0, 11.1),
      yaw: Math.PI,
      walkPhase: 0,
      carryingBag: false,
      isHome: false,
      activity: '在喫茶こもれび冲泡咖啡',
      parts: this._buildHumanoidMesh({ hairColor: 0x3b3330, topColor: 0xf4efe6, bottomColor: 0x3f3c46, apronColor: 0x6b4735 }),
      getTarget(hour, isRaining, festivalUnlocked) {
        if (festivalUnlocked && hour >= 18 && hour < 21.5 && !isRaining) {
          return { x: 4.2, z: 22.4, activity: '在桜川畔欣赏夜樱灯火', home: false, indoors: false };
        }
        if (hour >= 8 && hour < 21) {
          return { x: 16.6, z: 11.1, activity: '在喫茶こもれび营业中', home: false, indoors: true };
        }
        if (hour >= 6.8 && hour < 8) {
          return { x: 15, z: 5.5, activity: '正在开店准备', home: false, indoors: false };
        }
        return { x: 26, z: -21.8, activity: '已打烊回家休息', home: true, indoors: true };
      },
    });

    // 2. Aoi Takahashi — Sakura Mart Clerk
    this.npcs.push({
      id: 'aoi',
      name: '高桥 葵',
      isCore: true,
      speed: 2.55,
      homePos: new THREE.Vector3(31, 0, 15.2),
      pos: new THREE.Vector3(-17.4, 0, 11.1),
      yaw: 0,
      walkPhase: 1,
      carryingBag: false,
      isHome: false,
      activity: '在桜マート值班',
      parts: this._buildHumanoidMesh({ hairColor: 0x5c3e32, topColor: 0xfefefe, bottomColor: 0x3c4b64, apronColor: 0x4ca175, heightScale: 0.94 }),
      getTarget(hour, isRaining, festivalUnlocked) {
        if (festivalUnlocked && hour >= 18.5 && hour < 21 && !isRaining) {
          return { x: -4.2, z: 22.4, activity: '在河畔公园赏灯', home: false, indoors: false };
        }
        if (hour >= 13 && hour < 14.5 && !isRaining) {
          return { x: -6.8, z: 21.2, activity: '在桜川公园午休吹风', home: false, indoors: false };
        }
        if (hour >= 7 && hour < 22) {
          return { x: -17.4, z: 11.1, activity: '在桜マート值班', home: false, indoors: true };
        }
        return { x: 31, z: 15.2, activity: '下班回到公寓休息', home: true, indoors: true };
      },
    });

    // 3. Haru Suzuki — Retired Teacher
    this.npcs.push({
      id: 'haru',
      name: '铃木 ハル',
      isCore: true,
      speed: 1.85,
      homePos: new THREE.Vector3(-31, 0, 15.2),
      pos: new THREE.Vector3(14.0, 3.0, -35.8),
      yaw: 0,
      walkPhase: 2,
      carryingBag: false,
      isHome: false,
      activity: '在桜神社散步参拜',
      parts: this._buildHumanoidMesh({ hairColor: 0xc8c6cc, topColor: 0x9b7da8, bottomColor: 0x56525c, heightScale: 0.9 }),
      getTarget(hour, isRaining, festivalUnlocked) {
        if (isRaining && hour >= 9 && hour < 19) {
          return { x: 12.2, z: 11.4, activity: '在喫茶こもれび躲雨喝茶', home: false, indoors: true };
        }
        if (festivalUnlocked && hour >= 18 && hour < 21 && !isRaining) {
          return { x: -8.5, z: 22.3, activity: '在河畔看樱花灯笼', home: false, indoors: false };
        }
        if (hour >= 7 && hour < 11) {
          return { x: 14.2, z: -36.2, activity: '在桜神社晨间参拜', home: false, indoors: false };
        }
        if (hour >= 11 && hour < 15) {
          return { x: -5.2, z: 22.5, activity: '在桜川河畔赏樱', home: false, indoors: false };
        }
        if (hour >= 15 && hour < 18.5) {
          return { x: 12.2, z: 11.4, activity: '在喫茶こもれび喝下午茶', home: false, indoors: true };
        }
        return { x: -31, z: 15.2, activity: '在家中品茶休息', home: true, indoors: true };
      },
    });

    // 4. Ren Tanaka — Freelance Illustrator / Commuter
    this.npcs.push({
      id: 'ren',
      name: '田中 レン',
      isCore: true,
      speed: 2.65,
      homePos: new THREE.Vector3(5.5, 0, -24.5),
      pos: new THREE.Vector3(-11.5, 0.45, -15.5),
      yaw: 0,
      walkPhase: 3,
      carryingBag: false,
      isHome: false,
      activity: '在桜駅月台候车',
      parts: this._buildHumanoidMesh({ hairColor: 0x262834, topColor: 0xc97b5d, bottomColor: 0x3b4452, heightScale: 1.02 }),
      getTarget(hour, isRaining, festivalUnlocked) {
        if (festivalUnlocked && hour >= 18.5 && hour < 21.5 && !isRaining) {
          return { x: 7.5, z: 21.6, activity: '在河畔写生夜樱灯火', home: false, indoors: false };
        }
        if (hour >= 7.5 && hour < 11.5) {
          return { x: -11.5, z: -15.5, activity: '在桜駅月台候车', home: false, indoors: false };
        }
        if (hour >= 11.5 && hour < 14.5) {
          return { x: -13.6, z: 9.2, activity: '在桜マート买午餐和咖啡', home: false, indoors: true, buyBag: true };
        }
        if (hour >= 14.5 && hour < 18.5 && !isRaining) {
          return { x: 9.2, z: 22.6, activity: '在桜川边画电车素描', home: false, indoors: false };
        }
        if (hour >= 18.5 && hour < 20.5) {
          return { x: 13.8, z: 9.0, activity: '在喫茶こもれび整理画稿', home: false, indoors: true };
        }
        return { x: 5.5, z: -24.5, activity: '在公寓里赶插画稿', home: true, indoors: true };
      },
    });

    // 5. Mike — The Town Calico Cat!
    this.npcs.push({
      id: 'mike',
      name: 'ミケ',
      isCore: true,
      isCat: true,
      speed: 1.45,
      homePos: new THREE.Vector3(12.2, 0, 5.6),
      pos: new THREE.Vector3(12.0, 0, 5.6),
      yaw: 0,
      walkPhase: 0,
      carryingBag: false,
      isHome: false,
      activity: '在咖啡馆门口晒太阳',
      parts: this._buildCatMesh(),
      getTarget(hour, isRaining) {
        if (isRaining) {
          return { x: -10.5, z: -20.2, activity: '在桜駅候车室躲雨打盹', home: false, indoors: true };
        }
        if (hour >= 7 && hour < 12) {
          return { x: 12.0, z: 5.6, activity: '在喫茶こもれび门口晒太阳', home: false, indoors: false };
        }
        if (hour >= 12 && hour < 16.5) {
          return { x: 2.8, z: 22.6, activity: '在桜川桥边看水流', home: false, indoors: false };
        }
        return { x: 18.5, z: -36.0, activity: '在桜神社樱花树下巡逻', home: false, indoors: false };
      },
    });

    this.npcs.forEach((n) => {
      n.parts.root.position.copy(n.pos);
      this.scene.add(n.parts.root);
    });
  }

  _spawnBackgroundCommuters() {
    const commuters = [
      {
        id: 'bg_1',
        name: '小镇通勤者',
        speed: 2.4,
        pos: new THREE.Vector3(4.5, 0, 2.0),
        route: [
          { x: 4.5, z: 2.0 },
          { x: 0.8, z: 2.0 },
          { x: 0.8, z: -23.0 },
          { x: -11.5, z: -23.0 },
          { x: -9.2, z: -15.5, stationWait: true },
          { x: -11.5, z: -23.0 },
          { x: 0.8, z: -23.0 },
          { x: 0.8, z: 2.0 },
          { x: -18, z: 2.0 },
        ],
        colors: { hairColor: 0x2e2e36, topColor: 0x4f617a, bottomColor: 0x353740 },
      },
      {
        id: 'bg_2',
        name: '散步的邻居',
        speed: 1.9,
        pos: new THREE.Vector3(-18, 0, 22.5),
        route: [
          { x: -18, z: 22.5 },
          { x: 18, z: 22.5 },
          { x: 18, z: 2.2 },
          { x: -18, z: 2.2 },
        ],
        colors: { hairColor: 0x47382e, topColor: 0xd9a78b, bottomColor: 0x4b545e },
      },
      {
        id: 'bg_3',
        name: '放学路过的学生',
        speed: 2.5,
        pos: new THREE.Vector3(12, 0, -21.8),
        route: [
          { x: 12, z: -21.8 },
          { x: -1.4, z: -21.8 },
          { x: -1.4, z: 3.5 },
          { x: -15, z: 5.4 },
          { x: -1.4, z: 3.5 },
          { x: -1.4, z: -21.8 },
        ],
        colors: { hairColor: 0x22222c, topColor: 0xf4f6f9, bottomColor: 0x2d3a54 },
      },
    ];

    commuters.forEach((c) => {
      const parts = this._buildHumanoidMesh({ ...c.colors, heightScale: 0.96 });
      parts.root.position.copy(c.pos);
      this.scene.add(parts.root);
      this.npcs.push({
        id: c.id,
        name: c.name,
        isCore: false,
        speed: c.speed,
        pos: c.pos,
        yaw: 0,
        walkPhase: Math.random() * 5,
        route: c.route,
        routeIdx: 0,
        waitTimer: 0,
        parts,
      });
    });
  }

  /**
   * Computes a safe intermediate waypoint along the town's main avenues
   * so NPCs smoothly walk around buildings and across the railway crossing!
   */
  _computeNextStepTarget(curr, goal) {
    const dist = Math.hypot(goal.x - curr.x, goal.z - curr.z);
    if (dist < 1.5) return goal;

    // Crossing the railway (between north Z < -14 and south Z > -10) MUST funnel through X = 0
    const currNorth = curr.z < -13.2;
    const goalNorth = goal.z < -13.2;
    if (currNorth !== goalNorth) {
      if (Math.abs(curr.x) > 2.2) {
        return { x: 0, z: currNorth ? -21.5 : 2.0 };
      }
      return { x: 0, z: goalNorth ? -19.5 : -2.0 };
    }

    // Climbing / descending Shrine hill funnels through stairs at X = 16
    const currHill = curr.z < -31 && curr.x > 8;
    const goalHill = goal.z < -31 && goal.x > 8;
    if (currHill !== goalHill) {
      if (Math.abs(curr.x - 16) > 2.0) {
        return { x: 16, z: currHill ? -34.5 : -22.5 };
      }
      return { x: 16, z: goalHill ? -34.5 : -22.5 };
    }

    // Entering / exiting Sakura Mart (door at X = -15, Z = 6.7)
    const inMart = curr.x > -20 && curr.x < -10 && curr.z > 6.8 && curr.z < 14.2;
    const goalMart = goal.x > -20 && goal.x < -10 && goal.z > 6.8 && goal.z < 14.2;
    if (inMart !== goalMart) return { x: -15, z: inMart ? 5.6 : 6.4 };

    // Entering / exiting Café Komorebi (door at X = 15, Z = 6.7)
    const inCafe = curr.x > 10 && curr.x < 20 && curr.z > 6.8 && curr.z < 14.2;
    const goalCafe = goal.x > 10 && goal.x < 20 && goal.z > 6.8 && goal.z < 14.2;
    if (inCafe !== goalCafe) return { x: 15, z: inCafe ? 5.6 : 6.4 };

    // Entering / exiting Station platform via waiting room doorway (X = -11.5, Z = -22.6)
    const inStation = curr.x > -22.6 && curr.x < -4.0 && curr.z > -22.6 && curr.z < -14.0;
    const goalStation = goal.x > -22.6 && goal.x < -4.0 && goal.z > -22.6 && goal.z < -14.0;
    if (!inStation && goalStation && Math.abs(curr.x - -11.5) > 1.8) {
      return { x: -11.5, z: -23.4 };
    }
    if (inStation && !goalStation && curr.z > -22.4) {
      return { x: -11.5, z: -23.6 };
    }

    // Travel along shopping street Z = 2 or north lane Z = -22 when moving long horizontal distances
    if (Math.abs(goal.x - curr.x) > 9 && curr.z > 6 && curr.z < 18 && goal.z > 6 && goal.z < 18) {
      return { x: curr.x, z: 2.2 };
    }

    return goal;
  }

  update(dt, hour, isRaining, festivalUnlocked, playerPos, dialogueSpeakerId = null) {
    const residentHomeMap = {};

    for (const npc of this.npcs) {
      let target = null;
      let isIndoors = false;

      if (npc.isCore) {
        const info = npc.getTarget(hour, isRaining, festivalUnlocked);
        target = { x: info.x, z: info.z };
        npc.activity = info.activity;
        npc.isHome = !!info.home;
        isIndoors = !!info.indoors;
        if (info.buyBag) npc.carryingBag = true;
        if (info.home) npc.carryingBag = false;
        residentHomeMap[npc.id] = npc.isHome && Math.hypot(npc.pos.x - info.x, npc.pos.z - info.z) < 2.2;
      } else {
        const wp = npc.route[npc.routeIdx];
        target = wp;
        if (Math.hypot(wp.x - npc.pos.x, wp.z - npc.pos.z) < 0.85) {
          // Commuter waits on station platform for train doors to open!
          if (wp.stationWait && this.railway.state !== 'DOORS_OPEN') {
            npc.waitTimer = 0.5;
          } else if (npc.waitTimer <= 0) {
            npc.waitTimer = 1.6 + Math.random() * 2.0;
            npc.routeIdx = (npc.routeIdx + 1) % npc.route.length;
          }
        }
        if (npc.waitTimer > 0) npc.waitTimer -= dt;
      }

      // Pause & turn toward player while conversing!
      if (dialogueSpeakerId === npc.id) {
        const dx = playerPos.x - npc.pos.x;
        const dz = playerPos.z - npc.pos.z;
        npc.yaw = Math.atan2(dx, dz);
        npc.parts.root.rotation.y = npc.yaw;
        this._setIdleAnim(npc, isRaining, isIndoors);
        continue;
      }

      const stepGoal = this._computeNextStepTarget(npc.pos, target);
      const dx = stepGoal.x - npc.pos.x;
      const dz = stepGoal.z - npc.pos.z;
      const dist = Math.hypot(dx, dz);

      // Respect closed level crossing! Stop cleanly before barriers!
      let waitingAtCrossing = false;
      if (this.railway.crossingClosed && Math.abs(npc.pos.x) < 3.6) {
        const approachingFromSouth = npc.pos.z > -10.5 && npc.pos.z < -8.2 && dz < -0.1;
        const approachingFromNorth = npc.pos.z < -13.6 && npc.pos.z > -16.2 && dz > 0.1;
        if (approachingFromSouth || approachingFromNorth) {
          waitingAtCrossing = true;
        }
      }

      const canMove = dist > 0.35 && !waitingAtCrossing && (!npc.waitTimer || npc.waitTimer <= 0);
      if (canMove) {
        const vx = (dx / dist) * npc.speed;
        const vz = (dz / dist) * npc.speed;
        const nextX = npc.pos.x + vx * dt;
        const nextZ = npc.pos.z + vz * dt;
        const resolved = this.collision.resolve(nextX, nextZ, 0.34, ['cafeDoor']);
        npc.pos.x = resolved.x;
        npc.pos.z = resolved.z;
        npc.pos.y = this.collision.getGroundHeight(resolved.x, resolved.z);

        const targetYaw = Math.atan2(vx, vz);
        let diff = targetYaw - npc.yaw;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        npc.yaw += diff * Math.min(1, dt * 8);

        npc.walkPhase += dt * (npc.isCat ? 10 : 7.5);
        this._setWalkAnim(npc, isRaining, isIndoors);
      } else {
        this._setIdleAnim(npc, isRaining, isIndoors);
      }

      npc.parts.root.position.copy(npc.pos);
      npc.parts.root.rotation.y = npc.yaw;
    }

    return residentHomeMap;
  }

  _setWalkAnim(npc, isRaining, isIndoors) {
    const p = npc.parts;
    if (p.isCat) {
      p.tail.rotation.z = Math.sin(npc.walkPhase * 0.7) * 0.45;
      p.root.position.y = npc.pos.y + Math.abs(Math.sin(npc.walkPhase)) * 0.03;
      return;
    }
    const s = Math.sin(npc.walkPhase) * 0.48;
    p.leftLeg.rotation.x = s;
    p.rightLeg.rotation.x = -s;
    p.leftArm.rotation.x = -s * 0.7;
    p.rightArm.rotation.x = s * 0.7;
    p.umbrella.visible = isRaining && !isIndoors;
    p.bag.visible = !!npc.carryingBag;
  }

  _setIdleAnim(npc, isRaining, isIndoors) {
    const p = npc.parts;
    if (p.isCat) {
      p.tail.rotation.z = Math.sin(performance.now() * 0.004) * 0.35;
      return;
    }
    p.leftLeg.rotation.x *= 0.85;
    p.rightLeg.rotation.x *= 0.85;
    p.leftArm.rotation.x *= 0.85;
    p.rightArm.rotation.x *= 0.85;
    p.umbrella.visible = isRaining && !isIndoors;
    p.bag.visible = !!npc.carryingBag;
  }

  getCoreNPC(id) {
    return this.npcs.find((n) => n.id === id);
  }
}
