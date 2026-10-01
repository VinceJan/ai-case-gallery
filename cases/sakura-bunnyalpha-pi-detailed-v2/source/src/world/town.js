// ================================================================
//  小镇总装：地形 / 道路 / 建筑 / 铁道 / 植被 / 生活细节
// ================================================================
import * as THREE from 'three';
import { buildTerrainMesh, buildStreamMesh, heightAt, normalAt, slopeAt, streamDistAt } from './terrain.js';
import { buildRoads, initRoadIndex, nearestRoad, roadDistance } from './roads.js';
import { buildBuilding, getSigns, localToWorld } from './building.js';
import { buildRailway, buildCrossing, Train, TrainSystem, CrossingController, RAIL, SCHEDULE } from './railway.js';
import { BUILDINGS, ROADS, PADS, LANDMARKS, ANCHORS, STATION, CROSSING, TRACK, STREAM, WORLD, AREAS, SHOP_STOCK } from './layout.js';
import { InstanceKit, xform } from './instancing.js';
import { GeoBuf, mergeBuf } from './geom.js';
import * as P from './props.js';
import { PM, initPropMaterials } from './props.js';
import { toon, basic, addOutline, registerNightLight } from '../render/toon.js';
import { PAL } from '../render/palette.js';
import { signTex, posterTex, timetableTex, vSignTex, windowTex, concrete } from '../render/textures.js';
import { makeRNG, lerp, clamp, clamp01, TAU, smoothstep } from '../util/math.js';

export class Town {
  constructor(scene, collision) {
    this.scene = scene;
    this.collision = collision;
    this.interactables = [];
    this.landmarks = [];
    this.discovered = new Set();
    this.signMeshes = getSigns();
    this.dynamic = [];
  }

  addInteract(o) {
    const it = {
      id: o.id, x: o.x, z: o.z, y: o.y ?? heightAt(o.x, o.z), r: o.r ?? 1.7,
      label: o.label, key: o.key ?? 'e', kind: o.kind ?? 'use', onUse: o.onUse,
      data: o.data, enabled: o.enabled ?? (() => true), facing: o.facing,
      prompt: o.prompt, priority: o.priority ?? 0,
      target: o.target, text: o.text, item: o.item, count: o.count, once: o.once,
    };
    this.interactables.push(it);
    return it;
  }

  /* ============================================================== */
  build() {
    initPropMaterials();
    const rng = makeRNG(20250420);

    // 地形
    this.terrain = buildTerrainMesh();
    this.scene.add(this.terrain);
    this.stream = buildStreamMesh();
    this.scene.add(this.stream);

    // 道路
    initRoadIndex();
    this.roads = buildRoads();
    this.scene.add(this.roads);

    // 铁道
    this.railway = buildRailway(this.collision);
    this.scene.add(this.railway);
    this.crossing = buildCrossing(this.collision);
    this.scene.add(this.crossing.group);

    // 建筑
    this.buildings = [];
    this.buildingById = {};
    for (const spec of BUILDINGS) {
      const baseY = heightAt(spec.x, spec.z) - 0.05;
      const b = buildBuilding(spec, baseY);
      this.scene.add(b.group);
      this.buildings.push(b);
      this.buildingById[spec.id] = b;
      const bb = b.bounds;
      this.collision.addBox(bb.x, bb.z, bb.hw, bb.hd, bb.rot, baseY + bb.floors * 3.05 + 1, baseY - 0.5);
      // 店铺柜台：可以买东西
      if (SHOP_STOCK[spec.id]) {
        const dx = Math.sin(b.door.facing + Math.PI / 2), dz = Math.cos(b.door.facing + Math.PI / 2);
        this.addInteract({
          id: 'shop-' + spec.id, x: b.door.x + dx * 1.9, z: b.door.z + dz * 1.9, y: baseY, r: 1.7,
          label: `看看${spec.name}的柜台`, kind: 'shopBuy', data: { shop: spec.id }, priority: 1,
        });
      }
      if (spec.enter) {
        // 把真实门位写回锚点，供 NPC / 室内出口使用
        ANCHORS[spec.id] = { x: b.door.x, z: b.door.z };
        ANCHORS[spec.id + 'Door'] = { x: b.door.x, z: b.door.z };
        this.addInteract({
          id: 'door-' + spec.id, x: b.door.x, z: b.door.z, y: baseY, r: 1.9,
          label: `进入${spec.name}`, kind: 'enter', target: spec.enter, priority: 1,
          facing: b.door.facing,
        });
      }
    }

    // 特殊建筑：学校钟 / 神社装饰 等在 dressing 中补充
    this.dressStations();
    this.dressShrine();
    this.dressPark();
    this.dressSchool();
    this.dressHousing();
    this.dressStreets();
    this.dressForest();
    this.dressWater();
    this.landmarkMarkers();

    // 系统对象
    this.train = new Train();
    this.scene.add(this.train.group);
    this.trainSystem = new TrainSystem(this.train, null);
    this.crossingCtl = new CrossingController(this.crossing, null);

    this.collision.index();
    return this;
  }

  /* ---------------------------------------------------------------- *
   *  车站周边
   * ---------------------------------------------------------------- */
  dressStations() {
    const rng = makeRNG(11);
    const kit = new InstanceKit('station-props', 3);
    const g = new THREE.Group();
    g.name = 'station-detail';

    // 月台长椅
    for (const x of [-18, -2, 4]) {
      const z = TRACK.zAt(x) + 7.4;
      this.placeProp(kit, P.woodBench, x, STATION.platform.h, z, Math.PI);
      this.addInteract({ id: 'bench-st' + x, x, z, y: STATION.platform.h, r: 1.5, label: '坐下休息', kind: 'sit' });
    }
    // 时刻表 + 站名牌
    const board = new THREE.Group();
    const bm = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.75), toon(0xffffff, { map: timetableTex() }));
    const bfr = new THREE.Mesh(new THREE.BoxGeometry(1.42, 1.87, 0.09), toon(0x6b4a3a));
    bfr.position.z = -0.05;
    board.add(bfr, bm);
    addOutline(bfr, 0.01);
    board.position.set(-6, STATION.platform.h + 1.4, TRACK.zAt(-6) + 2.3);
    board.rotation.y = Math.PI;
    g.add(board);
    this.addInteract({
      id: 'timetable', x: -6, z: TRACK.zAt(-6) + 2.9, y: STATION.platform.h, r: 1.6,
      label: '查看时刻表', kind: 'timetable',
    });

    const nameBoard = new THREE.Group();
    const nb = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.62), toon(0xffffff, {
      map: signTex({ text: '桜町', sub: 'SAKURA-MACHI', bg: 0xf4f0e4, fg: 0x2f3a44, accent: 0x3a7f9e, w: 512, h: 128, size: 76, subSize: 22, key: 'stname' }),
    }));
    const nfr = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.74, 0.1), toon(0x4a5a66));
    nfr.position.z = -0.06;
    nameBoard.add(nfr, nb);
    addOutline(nfr, 0.01);
    nameBoard.position.set(-14, STATION.platform.h + 2.5, TRACK.zAt(-14) + 2.2);
    nameBoard.rotation.y = Math.PI;
    g.add(nameBoard);

    // 垃圾箱 / 自动售货机 / 长椅侧
    this.placeProp(kit, P.trashBin, 2.5, STATION.platform.h, TRACK.zAt(2.5) + 2.6, 0);
    this.placeProp(kit, P.bikeRack, 6, STATION.platform.h, TRACK.zAt(6) + 2.6, 0);
    // 站内时钟
    const clock = new THREE.Group();
    const cm = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16), toon(0xf6f2e6));
    cm.rotation.x = Math.PI / 2;
    const faceM = new THREE.Mesh(new THREE.CircleGeometry(0.26, 16), toon(0xffffff));
    faceM.position.z = 0.06;
    const hh = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.01), toon(0x33333a));
    hh.position.set(0, 0.07, 0.08);
    const mh = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.025, 0.01), toon(0x33333a));
    mh.position.set(0.08, 0, 0.08);
    clock.add(cm, faceM, hh, mh);
    clock.position.set(-10, STATION.platform.h + 2.5, TRACK.zAt(-10) + 2.1);
    clock.rotation.y = Math.PI;
    g.add(clock);
    this.clockHands = { hh, mh };

    // 站内海报
    const pm = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.05), toon(0xffffff, { map: posterTex('rail') }));
    const pfr = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.15, 0.06), toon(0x5a6470));
    pfr.position.z = -0.04;
    const pg = new THREE.Group(); pg.add(pfr, pm);
    pg.position.set(3, STATION.platform.h + 1.5, TRACK.zAt(3) + 2.2);
    pg.rotation.y = Math.PI;
    g.add(pg);

    // 月台上的自贩机
    this.placeProp(kit, P.vendingMachine, -20.5, STATION.platform.h, TRACK.zAt(-20.5) + 2.4, Math.PI);
    this.addInteract({
      id: 'vend-station', x: -20.5, z: TRACK.zAt(-20.5) + 3.3, y: STATION.platform.h, r: 1.5,
      label: '自动售货机', kind: 'vending', data: { price: 130 },
    });

    // 车站前广场：告示板、自行车、路灯、长椅
    const nb2 = P.noticeBoard(rng);
    this.placeProp(kit, () => nb2, ANCHORS.noticeBoard.x, heightAt(ANCHORS.noticeBoard.x, ANCHORS.noticeBoard.z), ANCHORS.noticeBoard.z, ANCHORS.noticeBoard.rot);
    this.addInteract({
      id: 'noticeboard', x: ANCHORS.noticeBoard.x, z: ANCHORS.noticeBoard.z + 0.7, r: 2.0, label: '查看告示板', kind: 'notice', priority: 2,
    });
    // 告示板上的纸
    const papers = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.46), toon(0xffffff, { map: posterTex(i % 2 ? 'town' : 'festival') }));
      p.position.set(-0.5 + i * 0.34, 1.35 + (i % 2) * 0.06, 0.06);
      p.rotation.z = (i - 1.5) * 0.04;
      papers.add(p);
    }
    papers.position.set(ANCHORS.noticeBoard.x, 0, ANCHORS.noticeBoard.z);
    papers.rotation.y = ANCHORS.noticeBoard.rot;
    g.add(papers);

    // 自行车停放
    const colors = [0x3f6f9c, 0x9c4f5f, 0x4f7f5c, 0x8a7a4a];
    for (let i = 0; i < 5; i++) {
      const x = -18 + i * 1.5, z = 21.4;
      this.placeProp(kit, P.bicycle, x, 0, z, 0.2 + i * 0.4, 1, colors[i % colors.length]);
      this.collision.addCircle(x, z, 0.4, 1.2, -0.2);
    }
    this.placeProp(kit, P.bikeRack, -15.5, 0, 21.4, 0);

    // 站前广场树与花坛
    for (const [x, z] of [[-20, 26.5], [-2, 26.5], [3, 24]]) {
      this.placeProp(kit, P.sakuraTree, x, heightAt(x, z), z, rng() * TAU, 0.85);
      this.collision.addCircle(x, z, 0.4, 3, -0.3);
    }
    for (const [x, z] of [[-17, 27.6], [1.5, 27.6], [-4.5, 23.4]]) {
      this.placeProp(kit, P.planter, x, heightAt(x, z), z, rng() * TAU, 1);
    }

    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0.009 }).group);
  }

  /* ---------------------------------------------------------------- *
   *  神社
   * ---------------------------------------------------------------- */
  dressShrine() {
    const rng = makeRNG(22);
    const kit = new InstanceKit('shrine-props', 3);
    const g = new THREE.Group();
    const gy = heightAt(ANCHORS.torii.x, ANCHORS.torii.z);

    // 鸟居
    const t = P.toriiGate(rng, 1);
    this.placeProp(kit, () => t, ANCHORS.torii.x, gy, ANCHORS.torii.z, 0, 1);
    this.collision.addCircle(ANCHORS.torii.x - 1.75, ANCHORS.torii.z, 0.3, 4.4, 0);
    this.collision.addCircle(ANCHORS.torii.x + 1.75, ANCHORS.torii.z, 0.3, 4.4, 0);

    // 参道两侧石灯笼
    for (let i = 0; i < 6; i++) {
      const t01 = i / 5;
      const x = lerp(33, 25, t01) + (i % 2 ? 2.6 : -2.6);
      const z = lerp(-12, -44, t01);
      this.placeProp(kit, P.stoneLantern, x, heightAt(x, z), z, 0, 0.9 + rng() * 0.2);
      this.collision.addCircle(x, z, 0.35, 1.6, -0.2);
    }
    // 社殿两侧
    for (const s of [-1, 1]) {
      for (let i = 0; i < 2; i++) {
        const x = ANCHORS.shrineGate.x + s * (7 + i * 2.6), z = -51 + i * 1.4;
        this.placeProp(kit, P.stoneLantern, x, heightAt(x, z), z, 0, 1);
      }
    }
    // 注连绳 + 御神木
    {
      const rope = new THREE.Group();
      const rb = new GeoBuf();
      for (let i = 0; i < 8; i++) {
        const t01 = i / 7;
        const x = lerp(14, 34, t01);
        const y = heightAt(x, -47) + 3.4 - Math.sin(t01 * Math.PI) * 0.7;
        rb.box(x, y, -47, 2.6, 0.16, 0.16, 1);
      }
      rope.add(new THREE.Mesh(rb.toGeometry(), toon(0xd8cf9a)));
      for (let i = 0; i < 4; i++) {
        const sh = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 4), toon(0xf6f4ee));
        sh.position.set(lerp(16, 32, i / 3), heightAt(0, -47) + 2.9, -47);
        rope.add(sh);
      }
      g.add(rope);
    }
    // 绘马板
    {
      const eb = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, 0.12), toon(0x6b4a2e));
        post.position.set(-1.4 + i * 1.4, 0.65, 0);
        eb.add(post);
      }
      const board = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 0.1), toon(0xd8c49a));
      board.position.set(0, 1.35, 0);
      addOutline(board, 0.01);
      eb.add(board);
      for (let i = 0; i < 8; i++) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.04), toon(i % 2 ? 0xf0e4d0 : 0xe8d0b0));
        p.position.set(-1.3 + (i % 4) * 0.86, 1.2 - Math.floor(i / 4) * 0.42, 0.07);
        eb.add(p);
      }
      eb.position.set(33, heightAt(33, -50), -50);
      eb.rotation.y = -0.5;
      g.add(eb);
      this.collision.addBox(33, -50, 1.7, 0.4, 0, heightAt(33, -50) + 1.9, 0);
    }
    // 手水舍
    {
      const hb = new GeoBuf(), hr = new GeoBuf();
      hr.box(0, 2.1, 0, 2.4, 0.16, 2.0);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) hb.cyl(sx * 1.0, 0, sz * 0.8, 0.08, 0.08, 2.1, 6);
      hb.box(0, 0.5, 0, 1.4, 0.1, 0.9);
      hb.box(0, 0.55, -0.4, 1.4, 0.14, 0.1);
      const house = new THREE.Group();
      house.add(new THREE.Mesh(hr.toGeometry(), toon(0x5a4a3a)), new THREE.Mesh(hb.toGeometry(), toon(0x6b4a2e)));
      house.position.set(29, heightAt(29, -46.5), -46.5);
      house.rotation.y = -0.3;
      g.add(house);
      this.addInteract({
        id: 'chozuya', x: 29, z: -45.6, y: heightAt(29, -46.5), r: 1.5, label: '掬水（洗手）', kind: 'water',
      });
    }
    // 拜殿
    this.addInteract({
      id: 'shrine-altar', x: ANCHORS.shrineGate.x, z: -48.6, y: heightAt(24, -48.6), r: 2.0,
      label: '参拜', kind: 'offer', priority: 1,
    });
    // 社務所
    {
      const sh = new THREE.Group();
      const b = new GeoBuf();
      b.box(0, 1.3, 0, 4.4, 2.6, 3.4);
      b.box(0, 2.75, 0, 5.0, 0.22, 4.0);
      sh.add(new THREE.Mesh(b.toGeometry(), toon(0xe0d4bc)));
      sh.position.set(32.5, heightAt(32.5, -55), -55);
      g.add(sh);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.3, 4.4), toon(0x4a4a52));
      roof.position.set(0, 2.95, 0);
      sh.add(roof);
      addOutline(roof, 0.012);
      this.collision.addBox(32.5, -55, 2.4, 1.8, 0, heightAt(32.5, -55) + 3, 0);
    }

    // 参道两侧的樱花
    for (let i = 0; i < 10; i++) {
      const t01 = i / 9;
      const z = lerp(-14, -44, t01);
      const cx = lerp(33.4, 25, t01);
      for (const s of [-1, 1]) {
        const x = cx + s * (4.2 + rng() * 1.4);
        this.placeProp(kit, P.sakuraTree, x, heightAt(x, z), z, rng() * TAU, 0.75 + rng() * 0.3);
        this.collision.addCircle(x, z, 0.35, 3, -0.3);
      }
    }

    // 见晴台
    this.buildLookout(kit, g);

    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0.011 }).group);
  }

  buildLookout(kit, g) {
    const { x, z } = ANCHORS.lookout;
    const y = heightAt(x, z);
    const deck = new GeoBuf();
    deck.box(0, 0, 0, 5.2, 0.24, 3.6);
    for (let i = 0; i < 8; i++) {
      const t01 = i / 7;
      const z2 = lerp(-12, -68, t01) - (-12) * 0;
    }
    const deckMesh = new THREE.Mesh(deck.toGeometry(), toon(0xa8794a));
    deckMesh.position.set(x, y + 0.12, z);
    addOutline(deckMesh, 0.012);
    g.add(deckMesh);
    // 支柱
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.3, y + 0.4, 0.3), toon(0x6b4a2e));
      p.position.set(x + sx * 2.2, (y + 0.4) / 2 - 0.2, z + sz * 1.4);
      g.add(p);
    }
    // 栏杆
    const rail = new GeoBuf();
    for (let i = 0; i <= 12; i++) {
      const px = x - 2.5 + (i / 12) * 5;
      rail.box(px, y + 0.7, z - 1.75, 0.1, 0.9, 0.1);
    }
    for (let i = 0; i <= 8; i++) {
      const pz = z - 1.75 + (i / 8) * 3.5;
      rail.box(x - 2.5, y + 0.7, pz, 0.1, 0.9, 0.1);
      rail.box(x + 2.5, y + 0.7, pz, 0.1, 0.9, 0.1);
    }
    rail.box(x, y + 1.12, z - 1.75, 5.1, 0.1, 0.1);
    rail.box(x, y + 0.78, z - 1.75, 5.1, 0.08, 0.08);
    g.add(new THREE.Mesh(rail.toGeometry(), toon(0x6b4a2e)));

    // 说明牌
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6), toon(0xffffff, {
      map: signTex({ text: '見晴台', sub: 'SAKURA-MACHI', bg: 0xe8e0cc, fg: 0x4a5a44, accent: 0x6b8a5a, w: 384, h: 256, size: 62, subSize: 20, key: 'lookout' }),
    }));
    const sf = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.7, 0.08), toon(0x6b4a2e));
    sf.position.z = -0.05;
    const sg = new THREE.Group();
    sg.add(sf, sign);
    sg.position.set(x + 1.8, y + 1.1, z + 1.0);
    sg.rotation.y = -0.5;
    g.add(sg);
    this.addInteract({ id: 'lookout-sign', x: x + 1.5, z: z + 1.2, y, r: 1.4, label: '眺望小镇', kind: 'view' });
    this.addInteract({ id: 'lookout', x, z, y, r: 2.0, label: '眺望', kind: 'view' });
    this.collision.addCircle(x + 1.9, z + 1.1, 0.2, 1.4, 0);
  }

  /* ---------------------------------------------------------------- *
   *  公园
   * ---------------------------------------------------------------- */
  dressPark() {
    const rng = makeRNG(33);
    const kit = new InstanceKit('park-props', 3);
    const g = new THREE.Group();
    const cx = -32, cz = 76;

    // 沙坑
    this.placeProp(kit, P.sandbox, cx - 12, heightAt(cx - 12, cz - 2), cz - 2, 0.2);
    // 滑梯 + 秋千
    this.placeProp(kit, P.playgroundSlide, cx - 7, heightAt(cx - 7, cz - 3), cz - 3, -0.4);
    this.placeProp(kit, P.swing, cx - 2.5, heightAt(cx - 2.5, cz - 4), cz - 4, 0.3);
    this.addInteract({ id: 'swing', x: cx - 2.5, z: cz - 4, y: heightAt(cx - 2.5, cz - 4), r: 1.8, label: '荡秋千', kind: 'swing' });

    // 喷泉 / 池塘
    this.placeProp(kit, P.fountain, cx + 3, heightAt(cx + 3, cz - 6), cz - 6, 0);
    this.addInteract({ id: 'fountain', x: cx + 3, z: cz - 5, y: heightAt(cx + 3, cz - 6), r: 1.6, label: '看看喷泉', kind: 'look' });
    // 池塘
    {
      const pond = new THREE.Group();
      const pb = new GeoBuf();
      const R = 5.2;
      const seg = 14;
      for (let i = 0; i < seg; i++) {
        const a0 = (i / seg) * TAU, a1 = ((i + 1) / seg) * TAU;
        const r0 = R * (0.8 + Math.sin(i * 2.1) * 0.14), r1 = R * (0.8 + Math.sin((i + 1) * 2.1) * 0.14);
        const p0 = new THREE.Vector3(Math.cos(a0) * r0, 0, Math.sin(a0) * r0);
        const p1 = new THREE.Vector3(Math.cos(a1) * r1, 0, Math.sin(a1) * r1);
        const mi = p0.clone().add(p1).multiplyScalar(0.5);
        const len = p0.distanceTo(p1) + 0.3;
        const ang = Math.atan2(p1.x - p0.x, p1.z - p0.z);
        const s = new GeoBuf();
        s.box(0, -0.18, 0, 0.6, 0.5, len, 1);
        const m = new THREE.Matrix4().makeRotationY(ang);
        m.setPosition(mi.x, 0, mi.z);
        s.applyMatrix(m);
        mergeBuf(pb, s);
      }
      const bank = new THREE.Mesh(pb.toGeometry(), toon(0x8a8478));
      pond.add(bank);
      const water = new THREE.Mesh(new THREE.CircleGeometry(R * 0.9, 16), toon(0x6fa8c4, { transparent: true, opacity: 0.85 }));
      water.rotation.x = -Math.PI / 2;
      water.position.y = -0.12;
      pond.add(water);
      pond.position.set(cx + 11, heightAt(cx + 11, cz + 3) + 0.02, cz + 3);
      g.add(pond);
      this.collision.addCircle(cx + 11, cz + 3, R * 0.95, 0.4, -1);
      this.addInteract({ id: 'pond', x: cx + 11, z: cz + 3, y: heightAt(cx + 11, cz + 3), r: 2.2, label: '池边', kind: 'look' });
    }

    // 樱花林
    for (let i = 0; i < 22; i++) {
      const a = rng() * TAU, r = 5 + rng() * 11;
      const x = cx + Math.cos(a) * r * 1.4, z = cz + Math.sin(a) * r;
      if (Math.abs(x - (cx + 11)) < 6 && Math.abs(z - (cz + 3)) < 6) continue;
      this.placeProp(kit, P.sakuraTree, x, heightAt(x, z), z, rng() * TAU, 0.9 + rng() * 0.5);
      this.collision.addCircle(x, z, 0.4, 3.4, -0.3);
    }
    // 灌木 + 草丛
    for (let i = 0; i < 26; i++) {
      const a = rng() * TAU, r = 2 + rng() * 15;
      const x = cx + Math.cos(a) * r * 1.5, z = cz + Math.sin(a) * r;
      this.placeProp(kit, P.bush, x, heightAt(x, z), z, rng() * TAU, 0.8 + rng() * 0.6);
    }
    for (let i = 0; i < 90; i++) {
      const a = rng() * TAU, r = 2 + rng() * 17;
      const x = cx + Math.cos(a) * r * 1.6, z = cz + Math.sin(a) * r;
      this.placeProp(kit, P.grassTuft, x, heightAt(x, z), z, rng() * TAU, 0.9 + rng() * 0.5);
    }

    // 长椅 + 路灯 + 垃圾桶
    for (const [x, z, ry] of [
      [ANCHORS.benchPark.x, ANCHORS.benchPark.z, Math.PI],
      [cx - 6, cz + 2, 0], [cx + 6, cz + 1, 0.3], [cx + 1, cz - 8, 2.2],
    ]) {
      this.placeProp(kit, P.woodBench, x, heightAt(x, z), z, ry);
      this.addInteract({ id: 'bench-p' + x + '_' + z, x, z, y: heightAt(x, z), r: 1.5, label: '坐下休息', kind: 'sit' });
    }
    for (const [x, z] of [[cx - 9, cz + 5], [cx + 7, cz - 8], [cx + 12, cz + 8]]) {
      this.placeProp(kit, P.streetLamp, x, heightAt(x, z), z, 0.6);
    }
    this.placeProp(kit, P.trashBin, cx - 5.4, heightAt(cx - 5.4, cz + 2.6), cz + 2.6, 0);

    // 纪念碑
    {
      const mb = new GeoBuf();
      mb.box(0, 0.2, 0, 1.5, 0.4, 1.5);
      mb.box(0, 1.3, 0, 0.8, 1.8, 0.6);
      mb.box(0, 2.3, 0, 1.0, 0.2, 0.8);
      const mon = new THREE.Group();
      mon.add(new THREE.Mesh(mb.toGeometry(), toon(0x9a9384)));
      mon.position.set(cx + 15, heightAt(cx + 15, cz - 8), cz - 8);
      g.add(mon);
      addOutline(mon.children[0], 0.012);
      this.collision.addBox(cx + 15, cz - 8, 0.6, 0.5, 0, 3, 0);
      this.addInteract({ id: 'monument', x: cx + 15, z: cz - 7, y: heightAt(cx + 15, cz - 8), r: 1.5, label: '看看碑', kind: 'look' });
    }
    // 公园牌
    {
      const sg = new THREE.Group();
      const s = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.55), toon(0xffffff, {
        map: signTex({ text: '河童公園', sub: 'KAPPA PARK', bg: 0xe4eede, fg: 0x3a5a3a, accent: 0x6b8a5a, w: 512, h: 224, size: 70, subSize: 22, key: 'park' }),
      }));
      const f = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.66, 0.09), toon(0x5a6b4a));
      f.position.z = -0.05;
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.6, 0.1), toon(0x5a6b4a));
      p1.position.y = -1.0;
      sg.add(f, s, p1);
      sg.position.set(cx - 2, heightAt(cx - 2, cz - 11), cz - 11);
      sg.rotation.y = 0.2;
      g.add(sg);
      this.collision.addBox(cx - 2, cz - 11, 0.15, 0.15, 0, 2.2, 0);
    }
    // 自动售货机（公园）
    this.placeProp(kit, P.vendingMachine, cx - 10.5, heightAt(cx - 10.5, cz + 3.2), cz + 3.2, 1.2);
    this.addInteract({
      id: 'vend-park', x: cx - 10.5, z: cz + 3.9, y: heightAt(cx - 10.5, cz + 3.2), r: 1.5,
      label: '自动售货机', kind: 'vending', data: { price: 130 },
    });

    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0.011 }).group);
  }

  /* ---------------------------------------------------------------- *
   *  学校
   * ---------------------------------------------------------------- */
  dressSchool() {
    const rng = makeRNG(44);
    const kit = new InstanceKit('school-props', 1);
    const g = new THREE.Group();
    const cx = -80, cz = 72;
    // 校门
    {
      const gb = new GeoBuf();
      for (const s of [-1, 1]) gb.box(s * 2.6, 1.6, 0, 0.5, 3.2, 0.5);
      gb.box(0, 3.3, 0, 6.0, 0.35, 0.5);
      const gate = new THREE.Group();
      gate.add(new THREE.Mesh(gb.toGeometry(), toon(0xcfd4d8)));
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), toon(0xffffff, {
        map: signTex({ text: '桜町小学校', bg: 0xf2f4f6, fg: 0x2f3a44, accent: 0xb04a3a, w: 512, h: 128, size: 68, key: 'school' }),
      }));
      sign.position.set(0, 3.3, 0.27);
      gate.add(sign);
      gate.position.set(cx, heightAt(cx, cz), cz);
      g.add(gate);
      addOutline(gate.children[0], 0.012);
      this.collision.addBox(cx - 2.6, cz, 0.3, 0.3, 0, 3.4, 0);
      this.collision.addBox(cx + 2.6, cz, 0.3, 0.3, 0, 3.4, 0);
    }
    // 操场标线 + 校旗
    this.placeProp(kit, P.flagPole, cx + 6, heightAt(cx + 6, cz + 6), cz + 6, 0);
    // 自行车棚
    {
      const sb = new GeoBuf(), sr = new GeoBuf();
      sr.box(0, 1.5, 0, 6.4, 0.14, 3.2);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) sb.cyl(sx * 3.0, 0, sz * 1.4, 0.07, 0.07, 1.5, 6);
      const shed = new THREE.Group();
      shed.add(new THREE.Mesh(sr.toGeometry(), toon(0x6d7280)), new THREE.Mesh(sb.toGeometry(), toon(0xc0c4c8)));
      shed.position.set(cx - 9, heightAt(cx - 9, cz + 3), cz + 3);
      g.add(shed);
      for (let i = 0; i < 5; i++) {
        const x = cx - 11.4 + i * 1.1;
        this.placeProp(kit, P.bicycle, x, heightAt(x, cz + 3), cz + 3, 0.1 * i, 0.95);
      }
    }
    // 操场边的树
    for (let i = 0; i < 8; i++) {
      const x = cx - 14 + i * 4.2;
      const z = cz + 9.5;
      this.placeProp(kit, P.broadleafTree, x, heightAt(x, z), z, rng() * TAU, 1.1);
      this.collision.addCircle(x, z, 0.4, 3.6, -0.3);
    }
    this.addInteract({ id: 'school-gate', x: cx, z: cz + 1.4, y: heightAt(cx, cz), r: 2.2, label: '校门', kind: 'look' });
    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0 }).group);
  }

  /* ---------------------------------------------------------------- *
   *  住宅区细节
   * ---------------------------------------------------------------- */
  dressHousing() {
    const rng = makeRNG(55);
    const kit = new InstanceKit('house-props', 2);
    const g = new THREE.Group();

    const houses = BUILDINGS.filter((b) => b.kind === 'house');
    const bikeCols = [0x3f6f9c, 0x9c4f5f, 0x4f7f5c, 0x8a7a4a, 0x6b5a8a];
    for (const b of houses) {
      const fx = b.x, fz = b.z;
      const front = localToWorld(b, 0, b.d / 2 + 1.0);
      // 门牌 + 邮箱
      this.placeProp(kit, P.mailbox, front.x + 1.6, heightAt(front.x + 1.6, front.z + 0.4), front.z + 0.4, b.rot, 0.9);
      // 自行车 / 鞋架
      if (rng() < 0.75) {
        const bx = front.x + (rng() < 0.5 ? -2.4 : 2.4), bz = front.z + 0.2;
        this.placeProp(kit, P.bicycle, bx, heightAt(bx, bz), bz, b.rot + rng() * 0.4 - 0.2, 0.95, bikeCols[Math.floor(rng() * bikeCols.length)]);
        this.collision.addCircle(bx, bz, 0.4, 1.2, -0.2);
      }
      if (rng() < 0.6) {
        const px = front.x + 2.6, pz = front.z - 0.3;
        this.placeProp(kit, P.planter, px, heightAt(px, pz), pz, rng() * TAU, 0.9);
      }
      if (rng() < 0.55) {
        const tx = front.x - 2.8, tz = front.z - 0.5;
        this.placeProp(kit, P.trashBin, tx, heightAt(tx, tz), tz, rng() * TAU, 0.9);
      }
      // 晾衣绳（后院）
      if (rng() < 0.5) {
        const lx = b.x + (rng() - 0.5) * 4, lz = b.z - b.d / 2 - 2.2;
        this.placeProp(kit, P.clothesLine, lx, heightAt(lx, lz), lz, b.rot + Math.PI / 2, 0.9);
      }
      // 灌木篱
      for (let i = 0; i < 4; i++) {
        const t01 = (i + 0.5) / 4;
        const hx = lerp(b.x - b.w / 2 - 1.2, b.x + b.w / 2 + 1.2, t01);
        const hz = b.z + Math.sin(b.rot) * 0 + (b.rot === 0 ? 1 : 1) * (b.d / 2 + 1.2);
        this.placeProp(kit, P.bush, hx, heightAt(hx, hz), hz, rng() * TAU, 0.85);
      }
      // 路灯
      if (rng() < 0.5) {
        const sx = b.x + b.w / 2 + 2.2, sz = b.z + b.d / 2 + 1.6;
        this.placeProp(kit, P.streetLamp, sx, heightAt(sx, sz), sz, b.rot + Math.PI);
      }
    }

    // 商店街沿街细节
    for (const b of BUILDINGS.filter((x) => x.kind === 'shop' || x.kind === 'cafe')) {
      const front = localToWorld(b, 0, b.d / 2 + 1.0);
      if (rng() < 0.8) {
        const bx = front.x + (rng() < 0.5 ? -3.4 : 3.4), bz = front.z + 0.4;
        this.placeProp(kit, P.bicycle, bx, heightAt(bx, bz), bz, rng() * TAU, 0.95, bikeCols[Math.floor(rng() * bikeCols.length)]);
        this.collision.addCircle(bx, bz, 0.4, 1.2, -0.2);
      }
      if (rng() < 0.5) {
        const px = front.x + 3.0, pz = front.z + 0.6;
        this.placeProp(kit, P.planter, px, heightAt(px, pz), pz, rng() * TAU, 1.0);
      }
    }

    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0 }).group);
  }

  /* ---------------------------------------------------------------- *
   *  街道：电线杆 / 路灯 / 护栏 / 长椅
   * ---------------------------------------------------------------- */
  dressStreets() {
    const rng = makeRNG(66);
    const kit = new InstanceKit('street-props', 2);
    const g = new THREE.Group();

    /* --- 主街电线杆（两侧） --- */
    const poleRuns = [
      { pts: [[-40, 24.2], [10, 24.2], [46, 24.2]], ry: 0 },
      { pts: [[-40, 35.8], [10, 35.8], [46, 35.8]], ry: Math.PI },
    ];
    this.poles = [];
    for (const run of poleRuns) {
      const dense = [];
      for (let i = 0; i < run.pts.length - 1; i++) {
        const [ax, az] = run.pts[i], [bx, bz] = run.pts[i + 1];
        const len = Math.hypot(bx - ax, bz - az);
        const n = Math.round(len / 17);
        for (let k = 0; k < n; k++) {
          const t = k / n;
          dense.push([lerp(ax, bx, t), lerp(az, bz, t)]);
        }
      }
      dense.push(run.pts[run.pts.length - 1]);
      for (let i = 0; i < dense.length; i++) {
        const [x, z] = dense[i];
        const y = heightAt(x, z);
        const tr = rng() < 0.35;
        this.placeProp(kit, P.utilityPole, x, y, z, run.ry, 1, tr);
        this.collision.addCircle(x, z, 0.22, 8, 0);
        this.poles.push({ x, y, z, ry: run.ry });
        // 电线
        if (i < dense.length - 1) {
          const [x2, z2] = dense[i + 1];
          const len = Math.hypot(x2 - x, z2 - z);
          const ang = Math.atan2(x2 - x, z2 - z);
          for (let w = 0; w < 3; w++) {
            const off = (w - 1) * 0.62;
            const wire = wireGeo(x, y + 6.9, z, x2, y + 6.9, z2, 1.1, off);
            kit.push(PM.dark, wire, null);
          }
        }
      }
    }

    /* --- 路灯（主街） --- */
    for (let x = -78; x <= 46; x += 15) {
      for (const z of [23.2, 36.8]) {
        if (z === 36.8 && x > 34) continue;
        this.placeProp(kit, P.streetLamp, x, heightAt(x, z), z, z < 30 ? Math.PI : 0);
        this.collision.addCircle(x, z, 0.18, 4.2, 0);
      }
    }
    // 住宅路 / 车站前
    for (const [x, z, ry] of [
      [-44, 27, Math.PI], [-40, 55, 0], [-28, 55, 0], [-16, 55, 0],
      [-10, 24, Math.PI], [-10, 27.6, 0], [34, 24, Math.PI], [34, 14, 0], [34, -5, Math.PI],
      [-70, 38, -0.8],
    ]) {
      this.placeProp(kit, P.streetLamp, x, heightAt(x, z), z, ry);
      this.collision.addCircle(x, z, 0.18, 4.2, 0);
    }

    /* --- 主街长椅 + 垃圾桶 + 花坛 --- */
    for (const [x, z, ry] of [[6, 33.6, Math.PI], [26, 33.6, Math.PI], [40, 24.4, 0]]) {
      this.placeProp(kit, P.woodBench, x, heightAt(x, z), z, ry);
      this.addInteract({ id: 'bench-m' + x, x, z, y: heightAt(x, z), r: 1.5, label: '坐下休息', kind: 'sit' });
    }
    for (const [x, z] of [[4, 33.6], [24, 33.6], [42, 24.4], [-16, 33.6], [-34, 24.4]]) {
      this.placeProp(kit, P.trashBin, x, heightAt(x, z), z, 0);
    }
    for (const [x, z] of [[0, 33.4], [16, 33.4], [30, 33.4], [44, 24.4], [-10, 33.4], [-24, 33.4], [-40, 33.4], [-56, 33.4]]) {
      this.placeProp(kit, P.planter, x, heightAt(x, z), z, 0, 1.1);
    }
    // 商店街中央的自贩机
    this.placeProp(kit, P.vendingMachine, 30, heightAt(30, 24.3), 24.3, 0);
    this.addInteract({ id: 'vend-main', x: 30, z: 25.2, y: heightAt(30, 24.3), r: 1.5, label: '自动售货机', kind: 'vending', data: { price: 130 } });
    this.placeProp(kit, P.vendingMachine, 2, heightAt(2, 24.3), 24.3, 0);
    this.addInteract({ id: 'vend-main2', x: 2, z: 25.2, y: heightAt(2, 24.3), r: 1.5, label: '自动售货机', kind: 'vending', data: { price: 130 } });

    /* --- 护栏（道口两侧 / 车站旁） --- */
    for (let z = -6; z <= 8; z += 2) {
      for (const s of [-1, 1]) {
        const x = CROSSING.x + s * 6.4;
        this.placeProp(kit, P.guardrailPost, x, heightAt(x, z), z, 0);
      }
      const railB = new GeoBuf();
      railB.box(CROSSING.x - 6.4, heightAt(CROSSING.x - 6.4, z) + 0.62, z, 0.09, 0.24, 2.0);
      railB.box(CROSSING.x + 6.4, heightAt(CROSSING.x + 6.4, z) + 0.62, z, 0.09, 0.24, 2.0);
      g.add(new THREE.Mesh(railB.toGeometry(), toon(0xa8adb5)));
    }

    /* --- 巴士站牌 --- */
    this.placeProp(kit, P.busStop, -16, heightAt(-16, 26.8), 26.8, 0);
    this.collision.addBox(-16, 26.8, 1.6, 0.7, 0, 2.4, 0);
    this.placeProp(kit, P.busStop, 30, heightAt(30, 26.8), 26.8, Math.PI);
    this.collision.addBox(30, 26.8, 1.6, 0.7, 0, 2.4, 0);

    /* --- 交通标识 --- */
    for (const [x, z, ry, t, sub, bg] of [
      [30.5, 9.5, 0.3, '止まれ', '', 0xd04a4a],
      [37.5, -7.5, 3.4, '踏切注意', '', 0xf2c94c],
      [-13, 22.5, 0.2, '駅前', 'STATION', 0x4a7fb5],
      [36, 27.5, Math.PI, '注意', 'LOOK BOTH WAYS', 0xf2c94c],
    ]) {
      const sp = P.signPost(t, sub, bg);
      this.placeProp(kit, () => sp, x, heightAt(x, z), z, ry, 1);
      this.collision.addCircle(x, z, 0.12, 1.8, 0);
    }
    this.placeProp(kit, P.trafficMirror, 28.4, heightAt(28.4, 6), 6, 1.2);
    this.placeProp(kit, P.hydrant, 20, heightAt(20, 26.4), 26.4, 0);
    this.placeProp(kit, P.waterTap, -4, heightAt(-4, 26.5), 26.5, 0);
    this.addInteract({ id: 'watertap', x: -4, z: 27.1, y: heightAt(-4, 26.5), r: 1.2, label: '水龙头', kind: 'water' });

    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0 }).group);
  }

  offsetLast() { /* 已由 wireGeo 取代 */ }

  /* ---------------------------------------------------------------- *
   *  森林与远景
   * ---------------------------------------------------------------- */
  dressForest() {
    const rng = makeRNG(77);
    const kit = new InstanceKit('forest', 5);
    const under = new InstanceKit('undergrowth', 5);
    // 主街行道树
    for (let x = -80; x <= 48; x += 7.5) {
      if (Math.abs(x - 34) < 9) continue;
      const z = 25.6;
      if (roadDistance(x, z) < 3) continue;
      this.placeProp(kit, P.sakuraTree, x, heightAt(x, z), z, rng() * TAU, 0.8 + rng() * 0.35);
      this.collision.addCircle(x, z, 0.35, 3.2, -0.3);
    }
    for (let x = -76; x <= 46; x += 9) {
      const z = 34.4;
      this.placeProp(kit, P.sakuraTree, x, heightAt(x, z), z, rng() * TAU, 0.75 + rng() * 0.3);
      this.collision.addCircle(x, z, 0.35, 3.2, -0.3);
    }
    // 住宅路
    for (let z = 34; z <= 52; z += 6) {
      for (const x of [-47, -41]) {
        this.placeProp(kit, P.sakuraTree, x, heightAt(x, z), z, rng() * TAU, 0.7);
        this.collision.addCircle(x, z, 0.35, 3, -0.3);
      }
    }
    // 山体森林（环形分布）
    for (let i = 0; i < 520; i++) {
      const a = rng() * TAU;
      const r = 70 + Math.pow(rng(), 0.55) * 96;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (Math.abs(z - TRACK.zAt(x)) < 16) continue;   // 铁路走廊
      if (streamDistAt(x, z) < 5) continue;
      const sl = slopeAt(x, z);
      const y = heightAt(x, z);
      if (y > 52) continue;
      const kind = y > 22 ? P.pineTree : (rng() < 0.55 ? P.broadleafTree : P.pineTree);
      this.placeProp(kit, kind, x, y, z, rng() * TAU, 0.9 + rng() * 0.8);
    }
    // 灌木与草丛（野外）
    for (let i = 0; i < 700; i++) {
      const a = rng() * TAU;
      const r = 24 + Math.pow(rng(), 0.6) * 130;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (roadDistance(x, z) < 2.4) continue;
      if (Math.abs(z - TRACK.zAt(x)) < 5) continue;
      if (streamDistAt(x, z) < 3.4) continue;
      const y = heightAt(x, z);
      if (y > 40) continue;
      this.placeProp(under, rng() < 0.45 ? P.grassTuft : P.bush, x, y, z, rng() * TAU, 0.8 + rng() * 0.7);
    }
    // 竹林（东侧小径旁）
    for (let i = 0; i < 70; i++) {
      const a = rng() * TAU, r = Math.sqrt(rng()) * 9;
      const x = 84 + Math.cos(a) * r, z = 22 + Math.sin(a) * r;
      const y = heightAt(x, z);
      const stalk = new GeoBuf();
      const hh = 6 + rng() * 4;
      stalk.cyl(0, hh / 2, 0, 0.06, 0.08, hh, 5);
      const leaves = new GeoBuf();
      for (let k = 0; k < 3; k++) {
        leaves.sphere(0, hh * (0.68 + k * 0.11), 0, 0.55 - k * 0.11, 1, 0.3, k + rng() * 5);
      }
      this.placeProp(kit, () => new Map([[PM.bamboo, stalk], [PM.leafDark, leaves]]), x, y, z, rng() * TAU, 1);
      this.collision.addCircle(x, z, 0.2, 5, 0);
    }
    this.scene.add(kit.build({ outline: 0.011, receiveShadow: true }).group);
    this.scene.add(under.build({ outline: 0, castShadow: false, receiveShadow: true }).group);
  }

  /* ---------------------------------------------------------------- *
   *  溪流周边：水车 / 旧屋 / 桥头
   * ---------------------------------------------------------------- */
  dressWater() {
    const rng = makeRNG(88);
    const kit = new InstanceKit('water-props', 2);
    const g = new THREE.Group();

    // 水车小屋
    {
      const { x, z } = ANCHORS.waterwheel;
      const y = heightAt(x, z);
      const w = P.waterWheel(rng);
      const grp = new THREE.Group();
      for (const [mat, buf] of w) {
        const m = new THREE.Mesh(buf.toGeometry(), mat);
        grp.add(m);
        addOutline(m, 0.011);
      }
      grp.position.set(x, y, z);
      grp.rotation.y = 0.3;
      g.add(grp);
      this.waterwheel = grp;
      this.collision.addBox(x, z - 1.6, 1.7, 1.3, 0.3, y + 2.2, 0);
      this.collision.addCircle(x + 1.2, z + 0.8, 1.3, 1.8, 0);
      this.addInteract({ id: 'waterwheel', x: x + 1.8, z: z + 1.2, y, r: 1.8, label: '看看水车', kind: 'waterwheel' });
    }
    // 溪边岩石
    for (let i = 0; i < 90; i++) {
      const idx = Math.floor(rng() * (STREAM.pts.length - 1));
      const [ax, az] = STREAM.pts[idx], [bx, bz] = STREAM.pts[idx + 1];
      const t = rng();
      const cx = lerp(ax, bx, t), cz = lerp(az, bz, t);
      if (Math.hypot(cx, cz) > 150) continue;
      const s = (rng() < 0.5 ? -1 : 1) * (3.2 + rng() * 3.5);
      let dx = bx - ax, dz = bz - az;
      const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
      const x = cx - dz * s, z = cz + dx * s;
      const y = heightAt(x, z);
      if (y < -3.5 || y > 12) continue;
      const b = new GeoBuf();
      const r = 0.4 + rng() * 1.1;
      b.sphere(0, r * 0.4, 0, r, 1, 0.3, rng() * 9);
      this.placeProp(kit, () => new Map([[PM.stone, b]]), x, y - r * 0.2, z, rng() * TAU, 1);
      if (r > 0.9) this.collision.addCircle(x, z, r * 0.8, 0.9, -0.3);
    }
    // 废弃小屋
    {
      const { x, z } = ANCHORS.hut;
      const y = heightAt(x, z);
      const hb = new GeoBuf(), hr = new GeoBuf();
      hb.box(0, 1.3, 0, 6.4, 2.6, 5.0);
      hr.box(0, 2.75, 0, 7.0, 0.3, 5.6);
      const roof = new GeoBuf();
      // 斜屋顶
      roof.addQuad(-3.5, 2.9, 2.8, 3.5, 2.9, 2.8, 3.5, 4.0, 0, -3.5, 4.0, 0, 3, 2);
      roof.addQuad(3.5, 2.9, -2.8, -3.5, 2.9, -2.8, -3.5, 4.0, 0, 3.5, 4.0, 0, 3, 2);
      const hut = new THREE.Group();
      hut.add(new THREE.Mesh(hb.toGeometry(), toon(0x9a8a70)));
      hut.add(new THREE.Mesh(hr.toGeometry(), toon(0x5a4a3a)));
      const rm = new THREE.Mesh(roof.toGeometry(), toon(0x4a3f3a));
      hut.add(rm);
      for (const c of hut.children) addOutline(c, 0.012);
      hut.position.set(x, y, z);
      hut.rotation.y = 0.24;
      g.add(hut);
      this.collision.addBox(x, z, 3.4, 2.7, 0.24, y + 3, 0);
      // 门
      const dr = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.9, 0.1), toon(0x4a3524));
      dr.position.set(0, 0.95, 2.52);
      dr.rotation.y = 0.24;
      dr.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0);
      hut.add(dr);
      this.addInteract({ id: 'hut-door', x: x + Math.sin(0.24) * 2.9, z: z + Math.cos(0.24) * 2.9, y, r: 1.6, label: '旧屋的门', kind: 'look' });
    }
    // 桥头护栏
    for (const [x, z] of [[59, 7.5], [74, 0.5]]) {
      this.placeProp(kit, P.guardrailPost, x, heightAt(x, z), z, 0);
      this.placeProp(kit, P.guardrailPost, x, heightAt(x, z), z + 1.6, 0);
    }
    this.scene.add(g);
    this.scene.add(kit.build({ outline: 0 }).group);
  }

  /* ---------------------------------------------------------------- *
   *  地标注册
   * ---------------------------------------------------------------- */
  landmarkMarkers() {
    for (const lm of LANDMARKS) {
      this.landmarks.push({ ...lm, y: heightAt(lm.x, lm.z) });
    }
  }

  /* ---------------------------------------------------------------- *
   *  放置辅助
   * ---------------------------------------------------------------- */
  placeProp(kit, factory, x, y, z, ry = 0, scale = 1, ...args) {
    const rng = makeRNG((Math.abs(x * 131 + z * 77) | 0) + 3);
    const parts = factory(rng, scale, ...args);
    if (!parts) return;
    const m = xform(x, y, z, ry, scale, scale, scale);
    for (const [mat, buf] of parts) {
      if (buf && buf.count) kit.push(mat, buf, m);
    }
  }

  update(dt, time, sky) {
    // 站钟
    if (this.clockHands) {
      const h = time.hour, m = (h % 1) * 60;
      this.clockHands.hh.rotation.z = -((h % 12) / 12) * TAU;
      this.clockHands.mh.rotation.z = -(m / 60) * TAU;
    }
    // 水车转动
    if (this.waterwheel) this.waterwheel.rotation.z += dt * 0.55;
    // 招牌夜间发光
    const night = sky ? sky.nightT : 0;
    for (const s of this.signMeshes) {
      const on = night > 0.3 ? 1 : 0;
      s.material.emissive.setScalar(on * 0.55);
      s.material.emissiveIntensity = on * 0.9;
    }
  }
}

/* ------------------------------------------------------------------ *
 *  电线几何（带垂度与横向偏移）
 * ------------------------------------------------------------------ */
function wireGeo(x1, y1, z1, x2, y2, z2, sag = 1.1, lateral = 0) {
  const b = new GeoBuf();
  let dx = x2 - x1, dz = z2 - z1;
  const len = Math.hypot(dx, dz) || 1;
  const nx = -dz / len, nz = dx / len;
  const segs = 8;
  const x1o = x1 + nx * lateral, z1o = z1 + nz * lateral;
  const x2o = x2 + nx * lateral, z2o = z2 + nz * lateral;
  const _d = new THREE.Vector3(), _r = new THREE.Vector3(), _u = new THREE.Vector3();
  for (let i = 0; i < segs; i++) {
    const t0 = i / segs, t1 = (i + 1) / segs;
    const ax = lerp(x1o, x2o, t0), az = lerp(z1o, z2o, t0);
    const bx = lerp(x1o, x2o, t1), bz = lerp(z1o, z2o, t1);
    const ay = y1 - Math.sin(t0 * Math.PI) * sag;
    const by = y2 - Math.sin(t1 * Math.PI) * sag;
    _d.set(bx - ax, by - ay, bz - az);
    const l = _d.length() + 0.02;
    _d.normalize();
    _r.set(0, 1, 0).cross(_d);
    if (_r.lengthSq() < 1e-6) _r.set(1, 0, 0);
    _r.normalize();
    _u.copy(_d).cross(_r).normalize();
    const seg = new GeoBuf();
    seg.box(0, 0, l / 2, 0.028, 0.028, l, 1);
    const m = new THREE.Matrix4().makeBasis(_r, _u, _d);
    m.setPosition(ax, ay, az);
    seg.applyMatrix(m);
    mergeBuf(b, seg);
  }
  return b;
}
