/**
 * Random / emergent world events that propagate into other systems.
 */
import { bus } from '../core/EventBus.js';

const EVENT_POOL = [
  {
    id: 'train-delay',
    name: '列车晚点',
    weight: 1.2,
    duration: 120,
    npcComment: '列车好像晚点了……站台人多了起来。',
    apply(game) {
      if (game.train) {
        game.train.maxSpeed = 7;
        game.train.late = true;
      }
      game.ui.toast('事件：列车晚点');
    },
    revert(game) {
      if (game.train) {
        game.train.maxSpeed = 14;
        game.train.late = false;
      }
    },
  },
  {
    id: 'sudden-rain',
    name: '突降阵雨',
    weight: 1.0,
    duration: 90,
    npcComment: '下起雨来了！有伞吗？',
    apply(game) {
      game.weather.setWeather('rain');
      game.ui.toast('事件：突降阵雨');
    },
    revert(game) {
      game.weather.setWeather('cloudy');
    },
  },
  {
    id: 'lost-item',
    name: '有人丢了东西',
    weight: 1.4,
    duration: 180,
    npcComment: '听说有人在车站丢了手帕……',
    apply(game) {
      game.worldState.setFlag('lostItem', true);
      game.ui.toast('事件：车站有人在寻找失物。去问问吧。');
    },
    revert(game) {
      game.worldState.setFlag('lostItem', false);
    },
  },
  {
    id: 'road-work',
    name: '道路施工',
    weight: 0.8,
    duration: 150,
    npcComment: '商店街那边在挖路，绕一下吧。',
    apply(game) {
      game.worldState.setFlag('roadWork', true);
      game.ui.toast('事件：道路施工');
    },
    revert(game) {
      game.worldState.setFlag('roadWork', false);
    },
  },
  {
    id: 'market-day',
    name: '小小集市',
    weight: 0.9,
    duration: 200,
    npcComment: '今天商店街好像有小集市。',
    apply(game) {
      game.worldState.setFlag('market', true);
      game.ui.toast('事件：商店街集市开张');
    },
    revert(game) {
      game.worldState.setFlag('market', false);
    },
  },
  {
    id: 'power-blink',
    name: '短暂停电',
    weight: 0.6,
    duration: 45,
    npcComment: '刚才灯灭了一下，吓我一跳。',
    apply(game) {
      game.worldState.setFlag('powerOn', false);
      game.ui.toast('事件：短暂停电');
    },
    revert(game) {
      game.worldState.setFlag('powerOn', true);
    },
  },
  {
    id: 'cat-visit',
    name: '小猫出没',
    weight: 1.1,
    duration: 160,
    npcComment: '看，那里有只猫。',
    apply(game) {
      game.worldState.setFlag('catHere', true);
      game.ui.toast('事件：一只小猫出现在公园附近');
    },
    revert(game) {
      game.worldState.setFlag('catHere', false);
    },
  },
  {
    id: 'school-event',
    name: '学校活动',
    weight: 0.7,
    duration: 180,
    npcComment: '学校好像有活动，很多学生过去了。',
    apply(game) {
      game.worldState.setFlag('schoolEvent', true);
      game.ui.toast('事件：学校活动');
    },
    revert(game) {
      game.worldState.setFlag('schoolEvent', false);
    },
  },
];

export class EventSystem {
  constructor(game) {
    this.game = game;
    this.activeEvent = null;
    this.timer = 0;
    this.cooldown = 60 + Math.random() * 60;
    this.history = [];
  }

  update(dt, timeSys) {
    if (this.activeEvent) {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.activeEvent.revert(this.game);
        this.history.push(this.activeEvent.id);
        this.activeEvent = null;
        this.cooldown = 50 + Math.random() * 90;
        bus.emit('event:end');
      }
      return;
    }

    this.cooldown -= dt;
    if (this.cooldown > 0) return;

    // more events during waking hours
    if (timeSys.hour < 7 || timeSys.hour > 22) {
      this.cooldown = 40;
      return;
    }

    const pool = EVENT_POOL.filter((e) => this.history.slice(-3).every((h) => h !== e.id));
    const total = pool.reduce((s, e) => s + e.weight, 0);
    let roll = Math.random() * total;
    for (const e of pool) {
      roll -= e.weight;
      if (roll <= 0) {
        this.activeEvent = e;
        this.timer = e.duration;
        e.apply(this.game);
        bus.emit('event:start', e);
        break;
      }
    }
  }

  serialize() {
    return {
      history: this.history,
      active: this.activeEvent?.id || null,
      timer: this.timer,
    };
  }

  restore(data) {
    if (!data) return;
    this.history = data.history || [];
    if (data.active) {
      const e = EVENT_POOL.find((x) => x.id === data.active);
      if (e) {
        this.activeEvent = e;
        this.timer = data.timer || 30;
      }
    }
  }
}

export { EVENT_POOL };
