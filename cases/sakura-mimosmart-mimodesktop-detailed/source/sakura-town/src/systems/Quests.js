/**
 * Quests that emerge from world state rather than a static list of fetch-codes.
 */
import { bus } from '../core/EventBus.js';

export class QuestSystem {
  constructor(game) {
    this.game = game;
    this.quests = [];
    this.flags = {};
  }

  init() {
    this.quests = [
      {
        id: 'morning-coffee',
        title: '早晨的咖啡',
        desc: '去珈琲さくら和春香打个招呼',
        type: 'talk',
        target: 'haruka',
        hourRange: [7, 11],
        done: false,
        reward: { bond: 1, money: 0 },
        note: '春香通常早上在店里。',
      },
      {
        id: 'station-wait',
        title: '等待列车',
        desc: '在桜町駅站台看一次列车进站',
        type: 'observe',
        target: 'train-stop',
        done: false,
        reward: { bond: 1, money: 200 },
        note: '列车会绕行一整圈再回来。',
      },
      {
        id: 'help-elderly',
        title: '帮幸子婆婆',
        desc: '和神社附近的幸子交谈，听她说说话',
        type: 'talk',
        target: 'sachiko',
        done: false,
        reward: { bond: 2, money: 300 },
        note: '她白天常在神社一带。',
      },
      {
        id: 'buy-drink',
        title: '解渴',
        desc: '从自动售货机买一罐饮料',
        type: 'buy',
        target: 'vending',
        done: false,
        reward: { bond: 0, money: 0 },
        note: '便利店旁就有。',
      },
      {
        id: 'evening-walk',
        title: '黄昏散步',
        desc: '在傍晚（17:00 后）走到公园',
        type: 'place',
        target: 'park',
        hourRange: [17, 20],
        done: false,
        reward: { bond: 1, money: 150 },
        note: '黄昏的樱花很好看。',
      },
      {
        id: 'shrine-calm',
        title: '片刻宁静',
        desc: '到神社投入赛钱',
        type: 'action',
        target: 'offering',
        done: false,
        reward: { bond: 2, money: 0 },
        note: '石阶尽头就是。',
      },
      {
        id: 'night-konbini',
        title: '夜里的灯光',
        desc: '夜里（20:00 后）进入便利店',
        type: 'place',
        target: 'konbini',
        hourRange: [20, 24],
        done: false,
        reward: { bond: 1, money: 100 },
        note: '它是街上最亮的地方。',
      },
      {
        id: 'ride-train',
        title: '环镇列车',
        desc: '乘坐列车环行一圈',
        type: 'ride',
        target: 'train',
        done: false,
        reward: { bond: 3, money: 0 },
        note: '在站台等待并上车。',
      },
    ];
    this.emit();
  }

  emit() {
    bus.emit('quest:update', { quests: this.quests });
    this.game.ui?.renderQuests(this.quests);
  }

  /** Call when player talks to an NPC */
  onTalk(npcId) {
    for (const q of this.quests) {
      if (q.done || q.type !== 'talk') continue;
      if (q.target === npcId) {
        if (q.hourRange) {
          const h = this.game.time.hour;
          if (h < q.hourRange[0] || h >= q.hourRange[1]) continue;
        }
        this.complete(q);
      }
    }
  }

  onAction(kind, id) {
    for (const q of this.quests) {
      if (q.done) continue;
      if (q.type === 'buy' && kind === 'buy' && (q.target === id || id === 'vending')) {
        this.complete(q);
      }
      if (q.type === 'action' && kind === q.target) {
        this.complete(q);
      }
    }
  }

  onPlace(placeId) {
    for (const q of this.quests) {
      if (q.done || q.type !== 'place') continue;
      if (q.target !== placeId) continue;
      if (q.hourRange) {
        const h = this.game.time.hour;
        if (h < q.hourRange[0] || h >= q.hourRange[1]) continue;
      }
      this.complete(q);
    }
  }

  onObserve(event) {
    for (const q of this.quests) {
      if (q.done || q.type !== 'observe') continue;
      if (q.target === event) this.complete(q);
    }
    for (const q of this.quests) {
      if (q.done || q.type !== 'ride') continue;
      if (event === 'train-ride-complete' && q.target === 'train') this.complete(q);
    }
  }

  complete(q) {
    q.done = true;
    if (q.reward?.money) this.game.worldState.addMoney(q.reward.money);
    if (q.reward?.bond) this.game.worldState.addBond(q.reward.bond);
    this.game.worldState.addHelp();
    this.game.ui.toast(`完成：${q.title}`);
    this.game.audio?.play('quest');
    this.emit();
    bus.emit('quest:complete', q);
  }

  serialize() {
    return {
      done: this.quests.filter((q) => q.done).map((q) => q.id),
      flags: { ...this.flags },
    };
  }

  restore(data) {
    if (!data?.done) return;
    for (const id of data.done) {
      const q = this.quests.find((x) => x.id === id);
      if (q) q.done = true;
    }
    Object.assign(this.flags, data.flags || {});
    this.emit();
  }
}
