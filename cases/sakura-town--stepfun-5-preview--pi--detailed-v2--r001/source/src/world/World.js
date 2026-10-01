// 世界组装：地形 + 建筑 + 植被 + 道具 + 铁路，并管理屋顶显隐/灯光/碰撞
import * as THREE from 'three';
import { damp, clamp, TAU } from '../core/Utils.js';
import { buildTerrain, buildRiver, buildRoads, heightAt, riverX } from './Terrain.js';
import { buildVegetation } from './Vegetation.js';
import { buildStation } from './Station.js';
import { buildShopStreet } from './ShopStreet.js';
import { buildResidential } from './Residential.js';
import { buildPublic } from './Public.js';
import { buildShrinePark } from './ShrinePark.js';
import { buildProps } from './Props.js';
import { buildRailway } from './Railway.js';
import { petalSystem, allDoors } from './Buildings.js';
import { RAIL_Z } from './Layout.js';

function inWindow(h, from, to) {
  return from <= to ? (h >= from && h < to) : (h >= from || h < to);
}

export class World {
  constructor(game) {
    this.game = game;
    this.scene = game.scene;
    this.colliders = game.colliders;
    this.interactables = game.interactables;
    this.walkables = game.walkables;
    this.lights = [];
    this.festivalOn = false;
    this.petalBoost = 0;

    const ctx = {
      scene: this.scene,
      colliders: this.colliders,
      interactables: this.interactables,
      walkables: this.walkables,
      lights: this.lights,
      audio: game.audio,
      game,
      get ui() { return game.ui; },   // UI 在 World 之后创建，用 getter 延迟引用
    };
    this.ctx = ctx;

    // ---- 地形与环境 ----
    buildTerrain(this.scene);
    this.river = buildRiver(this.scene);
    buildRoads(this.scene, this.colliders);
    buildVegetation(this.scene);

    // ---- 建筑 ----
    this.station = buildStation(ctx);
    this.shop = buildShopStreet(ctx);
    this.residential = buildResidential(ctx);
    this.public = buildPublic(ctx);
    this.shrinePark = buildShrinePark(ctx);
    this.props = buildProps(ctx);

    // ---- 铁路 ----
    this.railway = buildRailway(ctx);
    game.railway = this.railway;

    // ---- 可进入建筑：准备屋顶淡出 ----
    this.enterables = [
      this.station, this.shop.konbini, this.shop.cafe, this.residential.suzuki,
    ].map((b) => {
      const rec = { roof: b.roof, fp: b.footprint, v: 1, mats: [] };
      if (b.roof) {
        b.roof.traverse((o) => {
          if (o.isMesh) {
            o.material = o.material.clone();
            o.material.transparent = true;
            o.material.depthWrite = true;
            rec.mats.push(o.material);
          }
        });
      }
      return rec;
    });

    // ---- 边界与河道碰撞 ----
    this.buildBoundaries();

    // ---- 花瓣 ----
    this.petals = petalSystem(this.scene, { x: 0, z: 25, w: 180, d: 160 }, 460);

    // ---- 神社灯笼（庙会时全亮） ----
    this.festivalLanterns = this.shrinePark.shrine.lanterns || [];
    for (const l of this.lights) {
      if (this.festivalLanterns.includes(l.mesh)) l.festival = true;
    }

    // ---- 任务相关交互 ----
    this.addQuestInteractables();

    // ---- 收集所有门（动画 + 自动门） ----
    this.doors = allDoors();

    // ---- 阴影预算：小物件不投影（性能） ----
    this.scene.traverse((o) => {
      if (o.isMesh && o.castShadow && o.geometry) {
        if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
        const bb = o.geometry.boundingBox;
        if (!bb) return;
        const s = bb.getSize(_v3);
        if (s.x * s.y * s.z < 1.1) o.castShadow = false;
      }
    });

    // 灯光初始化
    this.updateLights(game.time.hours);
  }

  /* ---------------- 碰撞边界 ---------------- */
  buildBoundaries() {
    // 河道（桥处断开）
    for (let z = -170; z < 200; z += 8) {
      if (z > 24 && z < 36) continue;
      const rx = riverX(z);
      this.colliders.push({ minX: rx - 6.6, maxX: rx + 6.6, minZ: z, maxZ: z + 8 });
    }
    // 公园水池
    const pond = this.shrinePark.park.pond;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU;
      const a2 = ((i + 1) / 5) * TAU;
      const x0 = pond.x + Math.cos(a) * (pond.r - 0.4), z0 = pond.z + Math.sin(a) * (pond.r - 0.4);
      const x1 = pond.x + Math.cos(a2) * (pond.r - 0.4), z1 = pond.z + Math.sin(a2) * (pond.r - 0.4);
      this.colliders.push({
        minX: Math.min(x0, x1), maxX: Math.max(x0, x1),
        minZ: Math.min(z0, z1), maxZ: Math.max(z0, z1),
      });
    }
    // 盆地外缘（隐形保险，铁路走廊处断开）
    const R = 128;
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * TAU;
      const x = Math.cos(a) * R, z = 25 + Math.sin(a) * R;
      if (Math.abs(z - RAIL_Z) < 24 && Math.abs(x) < 140) continue;
      this.colliders.push({ minX: x - 6, maxX: x + 6, minZ: z - 6, maxZ: z + 6 });
    }
  }

  /* ---------------- 任务交互 ---------------- */
  addQuestInteractables() {
    const g = this.game;
    const add = (pos, label, enabled, onUse) => {
      this.interactables.push({ pos, radius: 2.2, label, prompt: label, enabled, onUse });
    };

    // 送包裹到田中家
    add(new THREE.Vector3(66, 1, 23.5), '把包裹交给田中家的人',
      () => g.quests.isActive('package') && g.items.some((i) => i.id === 'package'),
      () => {
        g.removeItem('package');
        g.setFlag('packageDelivered', true);
        g.audio.chime();
        g.ui.toast('包裹送到了。田中家的人道了谢。');
        g.quests.notify('package');
      });

    // 三处赏樱点
    const vps = [
      { pos: new THREE.Vector3(-8, 0.6, 30), flag: 'vp_park', text: '公园池畔的樱花倒影在水面上。' },
      { pos: new THREE.Vector3(73, 5.0, 61), flag: 'vp_shrine', text: '从山上俯视，整条商店街都是粉色的。' },
      { pos: new THREE.Vector3(-95, 1.3, 26), flag: 'vp_bridge', text: '樱桥上下游，花瓣顺着河水漂走。' },
    ];
    for (const vp of vps) {
      add(vp.pos, '好好欣赏樱花',
        () => g.quests.isActive('sakura_spots') && !g.flags[vp.flag],
        () => {
          g.setFlag(vp.flag, true);
          g.audio.itemGet();
          g.ui.toast(vp.text);
          g.quests.notify('sakura_spots');
        });
    }

    // 庙会灯笼三盏
    const lanternSpots = [
      new THREE.Vector3(46.5, 0.5, 59.6),
      new THREE.Vector3(55.5, 0.5, 61.8),
      new THREE.Vector3(59.5, 0.5, 64.0),
    ];
    lanternSpots.forEach((p, i) => {
      add(p, '挂上庙会灯笼',
        () => g.quests.isActive('festival_prep') && (g.flags.lanterns || 0) < 3,
        () => {
          g.flags.lanterns = (g.flags.lanterns || 0) + 1;
          g.audio.itemGet();
          g.ui.toast(`挂上了一盏灯笼（${g.flags.lanterns}/3）`);
          if (g.flags.lanterns >= 3) {
            g.setFlag('festival', true);
            g.quests.complete('festival_prep');
          }
        });
    });

    // 夜樱
    add(new THREE.Vector3(62, 5.2, 69.5), '观赏夜樱',
      () => g.quests.isActive('night_sakura'),
      () => {
        g.setFlag('nightSakura', true);
        g.audio.shrineBell();
        g.quests.complete('night_sakura');
        g.ui.toast('灯笼的光落在花瓣上。这个春天，很难忘。');
      });
  }

  /* ---------------- 查询 ---------------- */
  groundY(x, z) { return heightAt(x, z); }

  isIndoor(pos) {
    for (const rec of this.enterables) {
      const fp = rec.fp;
      if (pos.x > fp.minX && pos.x < fp.maxX && pos.z > fp.minZ && pos.z < fp.maxZ) return true;
    }
    return false;
  }

  petalBurst() { this.petalBoost = 1; }

  setFestivalLanterns(on) { this.festivalOn = on; }

  /* ---------------- 每帧更新 ---------------- */
  update(dt) {
    const g = this.game;
    const hour = g.time.hours;
    const p = g.player.pos;

    // 门动画 + 自动门
    for (const d of this.doors) {
      if (d.auto) {
        const dd = Math.hypot(d.pos.x - p.x, d.pos.z - p.z);
        d.autoOpen = dd < 3.6;
      }
      d.update(dt);
    }

    // 屋顶淡入淡出
    for (const rec of this.enterables) {
      if (!rec.roof) continue;
      const fp = rec.fp;
      const inside = p.x > fp.minX - 0.7 && p.x < fp.maxX + 0.7 && p.z > fp.minZ - 0.7 && p.z < fp.maxZ + 0.7;
      const target = inside ? 0 : 1;
      if (Math.abs(rec.v - target) > 0.003) {
        rec.v = damp(rec.v, target, 7, dt);
        for (const m of rec.mats) {
          m.opacity = rec.v;
          m.depthWrite = rec.v > 0.55;
        }
        rec.roof.visible = rec.v > 0.02;
      }
    }

    // 灯光
    this.updateLights(hour);

    // 铁路
    this.railway.update(dt, g);

    // 河流 / 公园
    this.river.update(dt);
    this.shrinePark.park.update(dt, performance.now() * 0.001);

    // 花瓣
    this.petalBoost = Math.max(0, this.petalBoost - dt * 0.25);
    this.petals.update(dt, { rain: g.weather.rain, boost: this.petalBoost });

    // 电视微光
    const tv = this.residential.suzuki.tvScreen;
    if (tv) {
      const lum = 0.1 + Math.sin(performance.now() * 0.0011) * 0.03;
      tv.material.color.setHSL(0.58, 0.25, lum);
    }
  }

  updateLights(hour) {
    for (const l of this.lights) {
      let on;
      if (l.always) on = true;
      else if (l.manual) on = l.manualOn;
      else {
        on = inWindow(hour, l.from, l.to);
        if (!on && l.festival && this.festivalOn) on = true;
      }
      if (l.sprite) {
        // 光晕精灵：调节透明度与可见性
        l.mesh.material.opacity = on ? (l.opacity || 0.5) : 0;
        l.mesh.visible = on;
        continue;
      }
      if (!l.onMat) {
        l.onMat = l.mesh.material.clone();
        l.mesh.material = l.onMat;
      }
      l.mesh.material = on ? l.onMat : OFF_MAT;
      if (l.light) l.light.intensity = on ? l.lightOn : 0;
    }
  }
}

const OFF_MAT = new THREE.MeshBasicMaterial({ color: 0x3a4048 });
const _v3 = new THREE.Vector3();
