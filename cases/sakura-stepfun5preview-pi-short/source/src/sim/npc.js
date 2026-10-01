// NPC：名册、住所、作息、关系与有限决策
import { findPath, nearestNode, buildingDoor } from '../world/layout.js';
import { makeRng, clamp, lerp, dist2d, rotateToward } from '../core/utils.js';

// h: 小时（可小数）; place: 'home' | 'work' | {poi:'id'} | {b:'buildingId'}
export const NPC_DEFS = [
  {
    id: 'ken', name: '佐藤健', role: '便利店店员', home: 'home_sakura', work: 'shop_konbini',
    colors: { top: 0xd96f4a, bottom: 0x3a4a6b, hair: 0x2c2420, skin: 0xe8bb92, hairStyle: 2 },
    personality: '认真',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 6.5, place: 'home', act: 'idle' },
      { h: 7.5, place: 'work', act: 'work' }, { h: 12, place: { poi: 'shotengai_mid' }, act: 'eat' },
      { h: 13, place: 'work', act: 'work' }, { h: 18, place: 'home', act: 'idle' },
      { h: 19, place: { poi: 'bench_park1' }, act: 'relax' }, { h: 21.5, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'taeko', name: '山田妙子', role: '面包师', home: 'home_taeko', work: 'shop_bakery',
    colors: { top: 0xe8e4da, bottom: 0x8a6f4a, hair: 0x5d4033, skin: 0xf2cfae, hairStyle: 0, skirt: true },
    personality: '热情',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 4.5, place: 'work', act: 'work' },
      { h: 12, place: 'home', act: 'eat' }, { h: 14, place: 'work', act: 'work' },
      { h: 18, place: 'home', act: 'idle' }, { h: 19.5, place: { poi: 'bench_park2' }, act: 'relax' },
      { h: 21.5, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'ren', name: '小林莲', role: '咖啡店主', home: 'home_ren', work: 'shop_cafe',
    colors: { top: 0x4a7fb5, bottom: 0x4a3f56, hair: 0x3a2c26, skin: 0xf7dcc0, hairStyle: 2 },
    personality: '安静',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7, place: 'work', act: 'work' },
      { h: 12, place: 'work', act: 'eat' }, { h: 14, place: 'work', act: 'work' },
      { h: 19, place: 'home', act: 'idle' }, { h: 20, place: { poi: 'riverwalk_e' }, act: 'relax' },
      { h: 22, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'azusa', name: '中村梓', role: '书店店主', home: 'home_azusa', work: 'shop_books',
    colors: { top: 0x7a6fb0, bottom: 0x3a4a6b, hair: 0x2c2420, skin: 0xf2cfae, hairStyle: 1, skirt: true },
    personality: '书痴',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 8, place: 'work', act: 'work' },
      { h: 12.5, place: { poi: 'shotengai_mid' }, act: 'eat' }, { h: 13.5, place: 'work', act: 'work' },
      { h: 19, place: 'home', act: 'idle' }, { h: 20, place: 'home', act: 'read' },
      { h: 22.5, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'hajime', name: '斋藤一', role: '杂货铺店主', home: 'home_hajime', work: 'shop_general',
    colors: { top: 0x5f9e6e, bottom: 0x5d5d68, hair: 0x8a6f4a, skin: 0xdcae92, hairStyle: 2 },
    personality: '慷慨',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7, place: 'work', act: 'work' },
      { h: 12, place: 'work', act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 18.5, place: 'home', act: 'idle' }, { h: 19.5, place: { poi: 'riverwalk_w' }, act: 'relax' },
      { h: 21.5, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'tetsuo', name: '大岛铁男', role: '居酒屋大将', home: 'home_tetsuo', work: 'shop_izakaya',
    colors: { top: 0x3a3f4a, bottom: 0x2c3038, hair: 0x3a2c26, skin: 0xdcae92, hairStyle: 2 },
    personality: '豪爽',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 10, place: 'home', act: 'idle' },
      { h: 11, place: { poi: 'farm_gate' }, act: 'shop' }, { h: 13, place: 'home', act: 'idle' },
      { h: 16, place: 'work', act: 'work' }, { h: 23, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'yuki', name: '森川雪', role: '邮局局长', home: 'home_inao', work: 'post_office',
    colors: { top: 0xc94f6d, bottom: 0x4a3f56, hair: 0x3a2c26, skin: 0xf7dcc0, hairStyle: 3, skirt: true },
    personality: '细致',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 8, place: 'work', act: 'work' },
      { h: 12, place: 'home', act: 'eat' }, { h: 13.5, place: 'work', act: 'work' },
      { h: 17.5, place: 'home', act: 'idle' }, { h: 18.5, place: { poi: 'park_entrance' }, act: 'relax' },
      { h: 21, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'takeshi', name: '冈田武', role: '小学教师', home: 'home_daisuke', work: 'school',
    colors: { top: 0x5a6b8a, bottom: 0x3a3640, hair: 0x5d4033, skin: 0xe8bb92, hairStyle: 2 },
    personality: '严格',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7, place: 'work', act: 'work' },
      { h: 12, place: 'home', act: 'eat' }, { h: 13.5, place: 'work', act: 'work' },
      { h: 17, place: { poi: 'shotengai_mid' }, act: 'shop' }, { h: 18.5, place: 'home', act: 'idle' },
      { h: 20, place: { poi: 'bench_park3' }, act: 'relax' }, { h: 22, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'shizuka', name: '藤原静香', role: '神社宫司', home: 'home_shizuka', work: 'shrine_hall',
    colors: { top: 0xe8e4da, bottom: 0xc94f6d, hair: 0x2c2420, skin: 0xf2cfae, hairStyle: 0, skirt: true },
    personality: '沉稳',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 6, place: 'work', act: 'work' },
      { h: 11, place: 'home', act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 17, place: { poi: 'shrine_top' }, act: 'relax' }, { h: 19, place: 'home', act: 'idle' },
      { h: 22, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'sanae', name: '早苗', role: '巫女', home: 'home_sanae', work: 'shrine_hall',
    colors: { top: 0xf2ede4, bottom: 0xc94f6d, hair: 0x3a2c26, skin: 0xf7dcc0, hairStyle: 1, skirt: true },
    personality: '活泼',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7, place: 'work', act: 'work' },
      { h: 12, place: { poi: 'shotengai_mid' }, act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 17.5, place: { poi: 'hanami' }, act: 'relax' }, { h: 19.5, place: 'home', act: 'idle' },
      { h: 22, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'inao', name: '铃木稻夫', role: '农家', home: 'home_akira', work: 'barn',
    colors: { top: 0x5f9e6e, bottom: 0x6b4a3a, hair: 0x8a6f4a, skin: 0xdcae92, hairStyle: 2 },
    personality: '朴实',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 5.5, place: 'work', act: 'work' },
      { h: 11.5, place: 'home', act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 17.5, place: { poi: 'paddy_dike' }, act: 'relax' }, { h: 19, place: 'home', act: 'idle' },
      { h: 21, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'akira', name: '高桥明', role: '站员', home: 'home_hajime', work: 'station',
    colors: { top: 0x3a5f8a, bottom: 0x2c3038, hair: 0x2c2420, skin: 0xe8bb92, hairStyle: 2 },
    personality: '守时',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 6, place: 'work', act: 'work' },
      { h: 12, place: 'work', act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 18, place: 'home', act: 'idle' }, { h: 19, place: { poi: 'station_front' }, act: 'relax' },
      { h: 21.5, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'kin', name: '佐藤绢', role: '退休奶奶', home: 'home_kin', work: null,
    colors: { top: 0x7a6fb0, bottom: 0x5d5d68, hair: 0xe8e4da, skin: 0xf2cfae, hairStyle: 3, skirt: true },
    personality: '和蔼',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7, place: 'home', act: 'idle' },
      { h: 8.5, place: { poi: 'shrine_steps' }, act: 'relax' }, { h: 10.5, place: { poi: 'hanami' }, act: 'relax' },
      { h: 12, place: 'home', act: 'eat' }, { h: 13.5, place: { poi: 'bench_park2' }, act: 'relax' },
      { h: 16, place: { poi: 'shop_general' }, act: 'shop' }, { h: 17.5, place: 'home', act: 'idle' },
      { h: 21, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'sakura', name: '松本樱', role: '学生', home: 'home_tetsuo', work: 'school',
    colors: { top: 0xffb7c5, bottom: 0x3a4a6b, hair: 0x5d4033, skin: 0xf7dcc0, hairStyle: 1, skirt: true },
    personality: '开朗',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7.5, place: 'work', act: 'work' },
      { h: 12, place: 'home', act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 15.5, place: { poi: 'bench_park1' }, act: 'relax' }, { h: 17, place: { poi: 'shotengai_mid' }, act: 'shop' },
      { h: 18, place: 'home', act: 'idle' }, { h: 19.5, place: { poi: 'hanami' }, act: 'relax' },
      { h: 21, place: 'home', act: 'sleep' },
    ],
  },
  {
    id: 'daisuke', name: '佐野大辅', role: '学生', home: 'home_daisuke', work: 'school',
    colors: { top: 0x4a7fb5, bottom: 0x5d5d68, hair: 0x3a2c26, skin: 0xe8bb92, hairStyle: 2 },
    personality: '调皮',
    schedule: [
      { h: 0, place: 'home', act: 'sleep' }, { h: 7.5, place: 'work', act: 'work' },
      { h: 12, place: 'home', act: 'eat' }, { h: 13, place: 'work', act: 'work' },
      { h: 15.5, place: { poi: 'park_entrance' }, act: 'relax' }, { h: 16.5, place: { poi: 'station_front' }, act: 'relax' },
      { h: 18, place: 'home', act: 'idle' }, { h: 20, place: { poi: 'shotengai_mid' }, act: 'relax' },
      { h: 21.5, place: 'home', act: 'sleep' },
    ],
  },
];

// 初始关系（同事/邻里更亲密）
const REL_BASE = {
  'ken|taeko': 55, 'taeko|ren': 60, 'ren|azusa': 65, 'azusa|hajime': 50, 'hajime|tetsuo': 58,
  'yuki|akira': 62, 'takeshi|sakura': 45, 'takeshi|daisuke': 42, 'shizuka|sanae': 70, 'shizuka|kin': 62,
  'kin|taeko': 55, 'kin|sakura': 60, 'inao|hajime': 55, 'inao|tetsuo': 60, 'akira|ren': 40,
  'sanae|sakura': 58, 'daisuke|sakura': 55, 'ken|akira': 45, 'yuki|kin': 50,
};

export class NPC {
  constructor(def, graph, buildings) {
    Object.assign(this, def);
    this.graph = graph;
    this.buildingsById = new Map(buildings.map((b) => [b.building.id, b]));
    this.rng = makeRng(def.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) * 977);
    this.affinity = 0;
    this.memory = { metDay: 0, giftsToday: 0, lastGiftDay: -1, talks: 0, invited: false, helped: false };
    this.relations = new Map();
    for (const other of NPC_DEFS) {
      if (other.id === def.id) continue;
      const key = [def.id, other.id].sort().join('|');
      this.relations.set(other.id, REL_BASE[key] ?? 15 + this.rng() * 35);
    }
    const home = this.buildingsById.get(def.home);
    const d = buildingDoor(home.building);
    this.pos = { x: d.x + (this.rng() - 0.5) * 2, z: d.z + (this.rng() - 0.5) * 2 };
    this.heading = this.rng() * 6.28;
    this.state = 'idle';
    this.planIndex = -1;
    this.path = null;
    this.pathIdx = 0;
    this.speed = 1.5;
    this.target = { ...this.pos };
    this.umbrella = false;
    this.override = null;       // {poiId, until, withPlayer}
    this.chatWith = null;       // NPC id
    this.chatTimer = 0;
    this.bubble = null;         // {text, t}
    this.walkPhase = this.rng() * 6.28;
    this.destOffset = { x: (this.rng() - 0.5) * 1.6, z: (this.rng() - 0.5) * 1.6 };
  }

  get building() { return this.buildingsById.get(this.work); }

  // 解析作息地点 → 目标坐标与节点
  resolvePlace(place) {
    if (place === 'home' || place === 'work') {
      const b = this.buildingsById.get(place === 'home' ? this.home : this.work);
      if (!b) return null;
      const d = buildingDoor(b.building);
      return { x: d.x + this.destOffset.x, z: d.z + this.destOffset.z, node: 'door_' + b.building.id };
    }
    if (place && place.poi) {
      const n = this.graph.nodes.find((x) => x.id === 'poi_' + place.poi);
      if (!n) return null;
      return { x: n.x + this.destOffset.x * 0.5, z: n.z + this.destOffset.z * 0.5, node: n.id };
    }
    return null;
  }

  currentPlan(minutes) {
    const h = minutes / 60;
    let plan = this.schedule[0];
    for (const p of this.schedule) if (p.h <= h) plan = p;
    return plan;
  }

  planKey(plan) {
    const place = plan?.place;
    if (place === 'home') return 'home';
    if (place === 'work') return 'work';
    if (place && place.poi) return place.poi;
    return 'none';
  }

  // 主更新
  update(dt, gameDt, world) {
    const { clock, weather, npcs, player } = world;
    const minutes = clock.minutes;
    const hour = clock.hour + clock.minute / 60;
    this.walkPhase += dt * (2 + this.speed * 2.2);

    // 气泡计时
    if (this.bubble) {
      this.bubble.t -= gameDt;
      if (this.bubble.t <= 0) this.bubble = null;
    }

    // 雨伞
    const wantUmbrella = weather.isRaining && !(this.state === 'sleep');
    if (wantUmbrella !== this.umbrella) {
      this.umbrella = wantUmbrella;
      world.onUmbrellaChange?.(this);
    }

    // 邀请覆盖（玩家邀请去某地）
    if (this.override) {
      const until = this.override.until;
      if (clock.day * 1440 + minutes > until) {
        this.override = null;
        this.path = null;
      } else {
        const nodeId = 'poi_' + this.override.poiId;
        const node = this.graph.nodes.find((n) => n.id === nodeId);
        if (node) {
          if (dist2d(this.pos.x, this.pos.z, node.x, node.z) > 1.5) {
            this.gotoTarget(node.x + this.destOffset.x, node.z + this.destOffset.z, nodeId, world);
          } else {
            this.state = 'wait';
            // 玩家靠近 → 特殊互动
            const pd = dist2d(this.pos.x, this.pos.z, player.pos.x, player.pos.z);
            if (pd < 3.2) {
              this.faceTo(player.pos.x, player.pos.z);
              if (!this.bubble) this.bubble = { text: '♥', t: 30 };
              world.onInviteMeet?.(this);
            }
          }
        }
        this.move(dt, world);
        return;
      }
    }

    // NPC 间交谈
    if (this.chatTimer > 0) {
      this.chatTimer -= gameDt;
      this.state = 'chat';
      if (this.chatTimer <= 0) {
        this.chatWith = null;
        this.path = null;
      }
      this.move(dt, world);
      return;
    }

    // 按作息行动
    const plan = this.currentPlan(minutes);
    const key = this.planKey(plan);
    if (key !== this.planKey(this.schedule[this.planIndex] || {})) {
      this.planIndex = this.schedule.indexOf(plan);
      this.path = null;
      // 新计划事件
      world.onPlanChange?.(this, plan);
    }
    const curPlan = this.schedule[this.planIndex] || plan;

    // 雨天调整：户外放松改为去商店或回家
    let place = curPlan.place, act = curPlan.act;
    if (weather.isRaining && (act === 'relax')) {
      place = this.rng() > 0.5 ? { poi: 'shotengai_mid' } : 'home';
      act = place === 'home' ? 'idle' : 'shop';
    }
    // 深夜强制回家
    if ((hour >= 23.5 || hour < 5) && curPlan.place !== 'home' && act !== 'work') {
      place = 'home'; act = 'sleep';
    }

    const target = this.resolvePlace(place);
    if (target) {
      const d = dist2d(this.pos.x, this.pos.z, target.x, target.z);
      if (d > 1.3) {
        this.state = 'walk';
        this.speed = weather.isRaining ? 2.5 : 1.8;
        this.gotoTarget(target.x, target.z, target.node, world);
      } else {
        this.state = act;
        this.speed = 0;
        // 工作/就坐时面朝感兴趣方向
        if (act === 'work' && this.work) {
          const b = this.buildingsById.get(this.work);
          if (b) this.faceTo(b.door.x, b.door.z);
        } else if (act === 'relax' || act === 'idle') {
          // 缓慢环顾
          if (this.rng() < 0.002) this.heading += (this.rng() - 0.5) * 2;
        }
      }
    }
    this.move(dt, world);
  }

  gotoTarget(x, z, nodeId, world) {
    // 目标变化时重算路径（失败则直线前往，避免每帧 A*）
    if (this.pathGoal !== nodeId) {
      const from = nearestNode(this.graph, this.pos.x, this.pos.z, (n) => n.tag !== 'door' && n.tag !== 'poi');
      const path = from ? findPath(this.graph, from.id, nodeId) : null;
      this.path = path ? path.map((id) => this.graph.nodes.find((n) => n.id === id)) : null;
      this.pathIdx = 0;
      this.finalTarget = { x, z };
      this.pathGoal = nodeId;
    }
  }

  move(dt, world) {
    if (this.speed <= 0) return;
    let tx, tz;
    if (this.path && this.pathIdx < this.path.length) {
      const n = this.path[this.pathIdx];
      tx = n.x; tz = n.z;
      if (dist2d(this.pos.x, this.pos.z, tx, tz) < 0.7) {
        this.pathIdx++;
        if (this.pathIdx >= this.path.length) {
          // 走向最终目标
          tx = this.finalTarget?.x ?? tx;
          tz = this.finalTarget?.z ?? tz;
          if (dist2d(this.pos.x, this.pos.z, tx, tz) < 0.5) { this.path = null; return; }
        }
      }
    } else if (this.finalTarget) {
      tx = this.finalTarget.x; tz = this.finalTarget.z;
      if (dist2d(this.pos.x, this.pos.z, tx, tz) < 0.5) { this.path = null; return; }
    } else return;

    const dx = tx - this.pos.x, dz = tz - this.pos.z;
    const d = Math.hypot(dx, dz) || 1;
    const step = this.speed * dt;
    this.pos.x += (dx / d) * step;
    this.pos.z += (dz / d) * step;
    this.faceTo(tx, tz);
  }

  faceTo(x, z) {
    const want = Math.atan2(x - this.pos.x, z - this.pos.z);
    this.heading = rotateToward(this.heading, want, 6 * 0.016);
  }

  // 与玩家交谈
  talk(world) {
    this.memory.talks++;
    this.memory.metDay = world.clock.day;
    this.state = 'chat';
    this.chatWith = 'player';
    this.faceTo(world.player.pos.x, world.player.pos.z);
    this.chatTimer = 25; // 游戏分钟
    // 面向玩家后停止移动
    this.path = null;
    this.speed = 0;
  }

  // 收礼
  receiveGift(itemId, day) {
    const it = this.giftValue(itemId);
    this.memory.giftsToday++;
    this.memory.lastGiftDay = day;
    this.affinity = clamp(this.affinity + it, 0, 100);
    return it;
  }

  giftValue(itemId) {
    // 由 items 的 fav 列表决定（在 game 层注入）
    return this._giftValue ? this._giftValue(itemId) : 6;
  }

  get relationLevel() {
    if (this.affinity >= 80) return '挚友';
    if (this.affinity >= 55) return '好友';
    if (this.affinity >= 30) return '熟人';
    if (this.affinity >= 12) return '认识';
    return '陌生人';
  }

  serialize() {
    return {
      id: this.id, affinity: this.affinity, memory: this.memory,
      relations: [...this.relations], pos: { ...this.pos }, state: this.state,
      planIndex: this.planIndex,
    };
  }
  load(d) {
    this.affinity = d.affinity;
    this.memory = d.memory;
    this.relations = new Map(d.relations);
    if (d.pos) { this.pos = { ...d.pos }; }
    this.planIndex = d.planIndex ?? -1;
  }
}
