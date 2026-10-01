/**
 * Dialogue + simple shop UI.
 */
import { bus } from '../core/EventBus.js';

export class DialogueSystem {
  constructor(game) {
    this.game = game;
    this.active = false;
    this.speaker = '';
    this.lines = [];
    this.index = 0;
    this.choices = null;
    this.onClose = null;
  }

  startNPC(npc) {
    const t = this.game.time;
    const weather = this.game.weather;
    let text;

    if (npc.state === 'waiting') {
      text = '列车还没来……今天有点慢呢。';
    } else if (weather.isRaining) {
      text = Math.random() < 0.5 ? '雨下起来了呢。' : '这种天气，不想出门。';
    } else if (t.isNight) {
      text = '晚上好。这会儿街上真安静。';
    } else if (npc.bond > 3) {
      text = `又见面了。${npc.def.lines[Math.floor(Math.random() * npc.def.lines.length)]}`;
    } else {
      text = Math.random() < 0.4 ? npc.def.greeting : npc.def.lines[Math.floor(Math.random() * npc.def.lines.length)];
    }

    // occasionally mention world state
    if (this.game.events.activeEvent && Math.random() < 0.35) {
      const ev = this.game.events.activeEvent;
      if (ev.npcComment) text = ev.npcComment;
    }

    const choices = [
      {
        label: '打听镇上的事',
        action: () => {
          const rumors = [
            '车站那边最近在修栏杆。',
            '神社的樱花今年开得特别好。',
            '便利店的关东煮傍晚经常卖光。',
            '听说河边能看到野鸭。',
            '列车有时候会晚个两三分钟。',
            '商店街的书店老板很会讲故事。',
          ];
          this.show(npc.name, rumors[Math.floor(Math.random() * rumors.length)]);
        },
      },
      {
        label: '表示友好',
        action: () => {
          npc.bond += 1;
          this.game.worldState.addBond(1);
          this.game.npcMemory[npc.id] = (this.game.npcMemory[npc.id] || 0) + 1;
          this.show(npc.name, npc.bond > 2 ? '嗯，和你聊天很开心。' : '谢谢。你也多保重。');
          this.game.ui.toast(`${npc.name} 的好感提升了。`);
        },
      },
      {
        label: '告别',
        action: () => this.close(),
      },
    ];

    this.open(npc.name, text, choices);
  }

  startShop(shop) {
    const items = shop.items || [];
    const lines = [
      `欢迎光临。今天需要点什么？`,
    ];
    const choices = items.map((item) => ({
      label: `购买 ${item.name} — ¥${item.price}`,
      action: () => {
        if (this.game.worldState.spendMoney(item.price)) {
          this.game.worldState.addItem({ ...item, id: item.id + '-' + Date.now() });
          this.game.ui.toast(`购入 ${item.name} -¥${item.price}`);
          if (item.heal) this.game.ui.toast('吃了一些，恢复了精神。');
          this.show('店员', `好的，${item.name}。谢谢惠顾。`);
        } else {
          this.show('店员', '抱歉，金额好像不太够。');
        }
      },
    }));
    choices.push({
      label: '离开',
      action: () => this.close(),
    });

    this.open('店员', lines[0], choices);
  }

  open(speaker, text, choices = null) {
    this.active = true;
    this.speaker = speaker;
    this.lines = [text];
    this.index = 0;
    this.choices = choices;
    this.render();
  }

  show(speaker, text) {
    this.speaker = speaker;
    this.lines = [text];
    this.index = 0;
    this.render();
  }

  render() {
    const ui = this.game.ui;
    ui.showDialogue(this.speaker, this.lines[this.index], this.choices);
  }

  advance() {
    if (!this.active) return;
    if (this.choices) return; // wait for choice
    if (this.index < this.lines.length - 1) {
      this.index += 1;
      this.render();
    } else {
      this.close();
    }
  }

  close() {
    this.active = false;
    this.choices = null;
    this.game.ui.hideDialogue();
    if (this.onClose) this.onClose();
    this.onClose = null;
    bus.emit('dialogue:close');
  }
}
