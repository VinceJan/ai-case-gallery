// 区域管理：世界 <-> 室内 的切换
import * as THREE from 'three';
import { heightAt } from '../world/terrain.js';
import { damp, lerp, clamp } from '../util/math.js';

export class ZoneManager {
  constructor(game) {
    this.game = game;
    this.zones = {};
    this.current = 'world';
    this.player = game.player;
    this.rig = game.rig;
    this.rig.groundFn = (x, z) => this.groundFn(x, z);
    this.fadeEl = document.getElementById('fade');
    this.onChange = null;
  }

  setZones(zones) { this.zones = zones; }

  get isIndoor() { return this.current !== 'world'; }

  groundFn(x, z) {
    if (this.isIndoor) return 0;
    return heightAt(x, z);
  }

  async enter(zoneId, at = null) {
    if (this.current === zoneId) return;
    const z = this.zones[zoneId];
    if (!z) return;
    await this._fade(async () => {
      this.current = zoneId;
      this.currentZoneName = z.name || zoneId;
      this.player.zone = zoneId;
      this.player.groundFn = () => 0;
      const sp = (at && at.x !== undefined) ? at : z.spawn;
      this.player.teleport(sp.x, sp.y || 0, sp.z, sp.yaw ?? 0);
      this.rig.yaw = (sp.yaw ?? 0) + Math.PI;
      this.rig.smoothTarget.copy(this.player.pos);
      document.body.classList.add('interior');
      const hw = z.w / 2 - 0.7, hd = z.d / 2 - 0.7;
      this.rig.bounds = { x0: z.origin.x - hw, x1: z.origin.x + hw, z0: z.origin.z - hd, z1: z.origin.z + hd, y: 2.95 };
      this.rig.setInterior(true, z.h ?? 3.0);
      // 室内灯光
      this._setInteriorLight(true);
    });
    if (this.onChange) this.onChange(zoneId);
  }

  async exit(worldPos) {
    if (this.current === 'world') return;
    await this._fade(async () => {
      this.current = 'world';
      this.currentZoneName = '';
      this.player.zone = 'world';
      this.player.groundFn = heightAt;
      const y = worldPos.y !== undefined ? worldPos.y : heightAt(worldPos.x, worldPos.z);
      this.player.teleport(worldPos.x, y, worldPos.z, worldPos.yaw ?? 0);
      this.rig.yaw = (worldPos.yaw ?? 0) + Math.PI;
      this.rig.smoothTarget.copy(this.player.pos);
      document.body.classList.remove('interior');
      this.rig.bounds = null;
      this.rig.setInterior(false);
      this._setInteriorLight(false);
    });
    if (this.onChange) this.onChange('world');
  }

  _setInteriorLight(on) {
    const g = this.game;
    if (!g.sky) return;
    g.sky.mesh.visible = !on;
    g.sky.stars.visible = !on && g.sky.nightT > 0.02;
    g.sky.sunSprite.visible = !on;
    g.sky.moonSprite.visible = !on;
    g.sky.clouds.visible = !on;
    g.sky.indoor = on;
    g.sky.sun.castShadow = !on;
    g.skyIndoor = on;
    // 室内点光源只在室内打开
    for (const z of Object.values(g.interiorZones || {})) {
      if (z.lightGroup) z.lightGroup.visible = on;
    }
  }

  _fade(fn) {
    return new Promise((resolve) => {
      const el = this.fadeEl;
      el.classList.add('on');
      setTimeout(async () => {
        await fn();
        el.classList.remove('on');
        setTimeout(resolve, 400);
      }, 390);
    });
  }
}
