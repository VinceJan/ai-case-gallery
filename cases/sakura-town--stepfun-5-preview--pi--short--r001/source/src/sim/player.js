// 玩家：状态、移动、碰撞、背包
import { clamp, lerp, rotateToward, dist2d } from '../core/utils.js';
import { ITEMS } from './items.js';

const WALK = 3.4, RUN = 6.2, RADIUS = 0.36;

export class Player {
  constructor(x, z) {
    this.pos = { x, z };
    this.y = 0;
    this.vy = 0;
    this.grounded = true;
    this.heading = Math.PI; // 初始面向小镇
    this.money = 2500;
    this.stamina = 100;
    this.inventory = [
      { id: 'camera', n: 1 },
      { id: 'onigiri', n: 1 },
      { id: 'postcard', n: 1 },
    ];
    this.sitting = false;
    this.sitTimer = 0;
    this.umbrella = false;
    this.walkPhase = 0;
    this.speed = 0;
    this.companion = null; // 跟随的猫
    this.flags = {};       // 玩家行为记录（持久化）
    this.stats = { steps: 0, talks: 0, bought: 0, photos: 0, satTimes: 0, gifts: 0 };
  }

  addItem(id, n = 1) {
    const it = ITEMS[id];
    if (!it) return false;
    const stackable = it.kind !== 'tool' || id === 'camera';
    if (stackable) {
      const ex = this.inventory.find((i) => i.id === id);
      if (ex) { ex.n += n; return true; }
    }
    this.inventory.push({ id, n });
    return true;
  }
  removeItem(id, n = 1) {
    const idx = this.inventory.findIndex((i) => i.id === id);
    if (idx < 0) return false;
    this.inventory[idx].n -= n;
    if (this.inventory[idx].n <= 0) this.inventory.splice(idx, 1);
    return true;
  }
  hasItem(id, n = 1) { return this.countItem(id) >= n; }
  countItem(id) { return this.inventory.find((i) => i.id === id)?.n ?? 0; }

  // 使用物品，返回提示文本（null = 不能用）
  useItem(id) {
    const it = ITEMS[id];
    if (!it) return null;
    if (it.kind === 'food' || it.kind === 'drink') {
      this.removeItem(id, 1);
      this.stamina = clamp(this.stamina + (it.stamina || 10), 0, 100);
      return '吃掉了' + it.name + '，体力恢复了。';
    }
    if (id === 'camera') return 'photo';
    if (id === 'umbrella') return 'umbrella';
    if (id === 'catfood') return null;
    return null;
  }

  // 移动与碰撞
  update(dt, input, camYaw, colliders, terrainH, weather) {
    // 坐下时不能移动
    if (this.sitting) {
      this.speed = 0;
      this.sitTimer += dt;
      this.stamina = clamp(this.stamina + 9 * dt, 0, 100);
      return;
    }
    let mx = input.moveX, mz = input.moveZ;
    const mag = Math.hypot(mx, mz);
    if (mag > 1) { mx /= mag; mz /= mag; }
    const running = input.run && mag > 0.1 && this.stamina > 1;
    const speed = running ? RUN : WALK;
    if (mag > 0.05) {
      // 相机相对方向：F=(sin,cos) 为相机前方，R=(-cos,sin) 为右方
      const s = Math.sin(camYaw), c = Math.cos(camYaw);
      const dx = mx * -c - mz * s;
      const dz = mx * s - mz * c;
      const step = speed * dt;
      this.moveWithCollision(dx * step, dz * step, colliders);
      this.heading = rotateToward(this.heading, Math.atan2(dx, dz), 10 * dt);
      this.speed = speed;
      this.walkPhase += dt * (running ? 11 : 7.5);
      this.stats.steps += step;
      if (running) this.stamina = clamp(this.stamina - 11 * dt, 0, 100);
      else this.stamina = clamp(this.stamina + 2.5 * dt, 0, 100);
    } else {
      this.speed = 0;
      this.stamina = clamp(this.stamina + 6 * dt, 0, 100);
    }
    // 重力
    const ground = terrainH(this.pos.x, this.pos.z);
    if (!this.grounded) {
      this.vy -= 22 * dt;
      this.y += this.vy * dt;
      if (this.y <= ground) { this.y = ground; this.vy = 0; this.grounded = true; }
    } else {
      // 平滑贴合地形
      this.y = lerp(this.y, ground, clamp(dt * 12, 0, 1));
    }
    this.umbrella = weather.isRaining && mag >= 0;
  }

  jump() {
    if (this.grounded && !this.sitting) {
      this.vy = 7.2;
      this.grounded = false;
    }
  }

  // 圆形 vs OBB 碰撞
  moveWithCollision(dx, dz, colliders) {
    let nx = this.pos.x + dx, nz = this.pos.z + dz;
    for (let iter = 0; iter < 2; iter++) {
      let hit = false;
      for (const c of colliders) {
        if (c.kind === 'building') {
          // OBB
          const cos = Math.cos(-c.rot || 0), sin = Math.sin(-c.rot || 0);
          const px = nx - c.x, pz = nz - c.z;
          const lx = px * cos - pz * sin, lz = px * sin + pz * cos;
          const cx = clamp(lx, -c.hw, c.hw), cz = clamp(lz, -c.hd, c.hd);
          const ddx = lx - cx, ddz = lz - cz;
          const d2 = ddx * ddx + ddz * ddz;
          if (d2 < RADIUS * RADIUS) {
            const d = Math.sqrt(d2) || 0.0001;
            const push = (RADIUS - d) / d;
            const nlx = cx + ddx * (1 + push), nlz = cz + ddz * (1 + push);
            // 回世界
            nx = c.x + nlx * cos + nlz * sin;
            nz = c.z - nlx * sin + nlz * cos;
            hit = true;
          }
        } else {
          const ddx = nx - c.x, ddz = nz - c.z;
          const r = RADIUS + Math.max(c.hw, c.hd);
          if (Math.abs(ddx) < c.hw + RADIUS && Math.abs(ddz) < c.hd + RADIUS) {
            // 推到最近边
            const px = c.hw + RADIUS - Math.abs(ddx);
            const pz = c.hd + RADIUS - Math.abs(ddz);
            if (px < pz) nx = c.x + Math.sign(ddx || 1) * (c.hw + RADIUS);
            else nz = c.z + Math.sign(ddz || 1) * (c.hd + RADIUS);
            hit = true;
          }
        }
      }
      if (!hit) break;
    }
    this.pos.x = nx;
    this.pos.z = nz;
  }

  serialize() {
    return {
      pos: { ...this.pos }, money: this.money, stamina: this.stamina,
      inventory: this.inventory.map((i) => ({ ...i })),
      flags: this.flags, stats: this.stats,
    };
  }
  load(d) {
    this.pos = { ...d.pos };
    this.money = d.money;
    this.stamina = d.stamina ?? 100;
    this.inventory = d.inventory.map((i) => ({ ...i }));
    this.flags = d.flags || {};
    this.stats = d.stats || this.stats;
  }
}
