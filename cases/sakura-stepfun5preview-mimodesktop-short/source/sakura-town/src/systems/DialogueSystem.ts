import type { Npc } from '../entities/Npc';
import type { TownState } from '../game/TownState';
import type { Quest } from '../game/types';
import { ITEM_MAP, SHOPS, SPOT_MAP } from '../world/layout';
import type { Rng } from '../utils/random';
import type { AudioSystem } from './AudioSystem';
import type { EventHooks } from './EventSystem';

interface DialogueView {
  speaker: string;
  text: string;
  choices: { label: string; action: string; payload?: string }[];
}


interface DialogueContext {
  rng: Rng;
  hour: () => number;
  playerNearSpot: (spotId: string, radius: number) => boolean;
  eventHooks: EventHooks;
}

const GREETINGS: Record<string, [string, string, string]> = {
  // [清晨, 白天, 傍晚]
  gentle: ['早上好，睡得还好吗？', '今天天气真不错呢。', '晚上好，今天辛苦了。'],
  lively: ['哦！来得正好！', '今天也很有精神嘛！', '辛苦啦，要不要坐坐？'],
  shy: ['啊……你好。', '那个……今天天气不错。', '晚上好……今天谢谢了。'],
  gruff: ['嗯。', '有事？……没事也行。', '这么晚了，注意安全。'],
  curious: ['哦，是你啊！来得正好！', '嗨，我在想一件事……', '晚上好！今天有什么发现？'],
};

const CHAT_LINES: Record<string, string[]> = {
  gentle: ['樱花落了一地，扫都扫不完呢。', '小镇的春天总是很短，要珍惜呀。', '下次有空来坐坐吧。'],
  lively: ['你听说了吗？神社的樱花快开了！', '今天的咖啡特别香！', '年轻人就该多走动走动！'],
  shy: ['我……我平时都待在家里。', '樱花很漂亮，对吧……', '请、请别客气。'],
  gruff: ['哼，年轻人。', '有话直说。', '……没什么。'],
  curious: ['你知道火车站以前是木头的吗？', '我在想，河那边是什么呢。', '听说夜里能听到火车说话。'],
};

const GIFT_REACTIONS: Record<string, [string, string]> = {
  // [普通, 喜欢]
  gentle: ['这个……谢谢你，我会珍惜的。', '这正是我最喜欢的！你怎么知道的？'],
  lively: ['哇，太棒了！', '天哪！这是我想要的那个！你太懂了！'],
  shy: ['谢、谢谢……我会好好收着的。', '……好开心。这个，我最喜欢了。'],
  gruff: ['……嗯，谢了。', '哼……还算你有点眼光。'],
  curious: ['哦！有意思的东西！', '等等，这个！你居然知道我喜欢这个！'],
};

/** 对话系统：寒暄、送礼、委托接取/交付。 */
export class DialogueSystem {
  private npc: Npc | null = null;
  private view: DialogueView = { speaker: '', text: '', choices: [] };
  private ctx: DialogueContext | null = null;

  onStateChanged: (() => void) | null = null;

  private readonly speakerEl: HTMLElement;
  private readonly textEl: HTMLElement;
  private readonly choicesEl: HTMLElement;
  private readonly rootEl: HTMLElement;

  constructor(
    private readonly state: TownState,
    private readonly audio: AudioSystem,
  ) {
    this.rootEl = this.must('#dialogue');
    this.speakerEl = this.must('#dialogue-speaker');
    this.textEl = this.must('#dialogue-text');
    this.choicesEl = this.must('#dialogue-choices');
  }

  get isOpen(): boolean {
    return this.npc !== null;
  }

  get currentNpc(): Npc | null {
    return this.npc;
  }

  private must(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing dialogue element: ${selector}`);
    return element;
  }

  open(npc: Npc, ctx: DialogueContext): void {
    this.npc = npc;
    this.ctx = ctx;
    npc.talking = true;    this.view = this.buildRoot();
    this.render();
    this.audio.interact();
  }

  close(): void {
    if (this.npc) this.npc.talking = false;
    this.npc = null;
    this.ctx = null;
    this.rootEl.classList.add('hidden');
    this.onStateChanged?.();
  }

  /** 数字键/Esc 由 Game 转调。 */
  handleKey(code: string): boolean {
    if (!this.npc || !this.ctx) return false;
    if (code === 'Escape') {
      this.close();
      return true;
    }
    const match = /^Digit([1-9])$/.exec(code);
    if (match) {
      const index = Number(match[1]) - 1;
      const choice = this.view.choices[index];
      if (choice) this.choose(choice.action, choice.payload);
      return true;
    }
    return false;
  }

  private choose(action: string, payload: string | undefined): void {
    if (!this.npc || !this.ctx) return;
    const ctx = this.ctx;
    const def = this.npc.def;
    this.audio.uiClick();
    switch (action) {
      case 'chat':
        this.doChat(ctx.rng);
        break;
      case 'gift':        this.view = this.buildGift();
        break;
      case 'give':
        if (payload) this.doGift(payload);
        break;
      case 'quest':
        this.doQuestOffer(ctx.rng);
        break;
      case 'turnin':
        this.doTurnIn(ctx.playerNearSpot);
        break;
      case 'return-kitten':
        ctx.eventHooks.returnKitten();
        this.state.addRelationship(def.id, 15);
        this.audio.questDone();
        this.view = {
          speaker: def.name,
          text: '什么！找到小樱了！太感谢了，我这就去找它！\n（好感 +15）',
          choices: [{ label: '返回', action: 'back' }],
        };
        break;
      case 'return-wallet':
        ctx.eventHooks.returnWallet(def.id);
        this.audio.questDone();
        this.view = {
          speaker: def.name,
          text: '啊，这正是我丢的钱包！里面有很重要的东西……太感谢了，这点心意请收下。\n（好感 +15）',
          choices: [{ label: '返回', action: 'back' }],
        };
        break;
      case 'back':        this.view = this.buildRoot();
        break;
      case 'close':
        this.close();
        return;
    }
    this.render();
    this.onStateChanged?.();
  }

  private buildRoot(): DialogueView {
    const ctx = this.ctx as DialogueContext;
    const npc = this.npc as Npc;
    const def = npc.def;
    const rel = this.state.relationship(def.id);
    const tier = rel >= 60 ? 3 : rel >= 30 ? 2 : rel >= 10 ? 1 : 0;
    const hour = ctx.hour();
    const slot = hour < 10 ? 0 : hour < 18 ? 1 : 2;
    const greeting = GREETINGS[def.personality][slot];
    const relNote =
      tier === 0 ? '' : tier === 1 ? '（他好像记住你了）' : tier === 2 ? '（他很高兴见到你）' : '（你们是好朋友了）';
    const quest = this.state.quests.find((q) => q.giverId === def.id && q.status !== 'done' && q.status !== 'failed');

    const choices: DialogueView['choices'] = [{ label: '聊聊天', action: 'chat' }];
    // 事件归还（小猫/钱包）
    const hooks = ctx.eventHooks;
    if (def.id === 'npc_kid' && hooks.kittenFound()) {
      choices.push({ label: '告诉陆君小猫的事', action: 'return-kitten' });
    }
    const walletOwner = hooks.walletFound();
    if (walletOwner === def.id) {
      choices.push({ label: '归还钱包', action: 'return-wallet' });
    }
    if (quest) {
      if (quest.status === 'ready') {
        choices.push({ label: `交付：${quest.title}`, action: 'turnin' });
      } else if (quest.kind === 'fetch' && this.state.countItem(quest.targetItemId ?? '') > 0) {
        // 持有物品时也允许直接尝试交付
        choices.push({ label: `交付：${quest.title}`, action: 'turnin' });
      } else {
        choices.push({ label: '询问委托的事', action: 'chat' });
      }
    } else if (this.canOfferQuest()) {
      choices.push({ label: '聊聊委托', action: 'quest' });
    }
    choices.push({ label: '送礼', action: 'gift' });
    choices.push({ label: '离开', action: 'close' });

    const flavor = ctx.rng.pick(CHAT_LINES[def.personality]);
    return {
      speaker: def.name,
      text: `${greeting}${relNote}\n${flavor}`,
      choices,
    };
  }

  private canOfferQuest(): boolean {
    return this.state.activeQuests().length < 3 && this.state.questsDoneToday < 2;
  }

  private buildGift(): DialogueView {
    const npc = this.npc as Npc;
    const choices: DialogueView['choices'] = [];
    const owned = Object.keys(this.state.inventory).filter((id) => (this.state.inventory[id] ?? 0) > 0);
    for (const itemId of owned) {
      const item = ITEM_MAP[itemId];
      if (!item) continue;
      const favorite = itemId === npc.def.favoriteItem ? ' ♥' : '';
      choices.push({ label: `送 ${item.name}${favorite}`, action: 'give', payload: itemId });
    }
    if (choices.length === 0) {
      return { speaker: npc.def.name, text: '你的背包空空如也，先去商店买点什么吧。', choices: [{ label: '返回', action: 'back' }] };
    }
    choices.push({ label: '返回', action: 'back' });
    return { speaker: npc.def.name, text: '想送什么？', choices };
  }

  private doChat(rng: Rng): void {
    const npc = this.npc as Npc;
    const def = npc.def;
    const talked = this.state.talkedToday[def.id];
    if (talked === undefined) {
      this.state.talkedToday[def.id] = 1;
      this.state.addRelationship(def.id, 3);
    } else {
      this.state.addRelationship(def.id, 1);
    }
    const line = rng.pick(CHAT_LINES[def.personality]);
    this.view = { speaker: def.name, text: line, choices: [{ label: '返回', action: 'back' }] };
  }

  private doGift(itemId: string): void {
    const npc = this.npc as Npc;
    const def = npc.def;
    const item = ITEM_MAP[itemId];
    if (!item || !this.state.removeItem(itemId, 1)) return;
    const favorite = itemId === def.favoriteItem;
    const rel = this.state.relationship(def.id);
    const gain = Math.round(item.giftValue * (favorite ? 1.6 : 1) * (1 + rel / 200)) + (favorite ? 5 : 0);
    this.state.addRelationship(def.id, gain);
    const reaction = GIFT_REACTIONS[def.personality][favorite ? 1 : 0];
    this.audio.gift();
    this.view = {
      speaker: def.name,
      text: `${reaction}\n（好感 +${gain}）`,
      choices: [{ label: '返回', action: 'back' }],
    };  }

  private doQuestOffer(rng: Rng): void {
    const npc = this.npc as Npc;
    const def = npc.def;
    const hour = (this.ctx as DialogueContext).hour();
    const kind: Quest['kind'] = rng.chance(0.6) ? 'fetch' : 'meet';
    const reward = 150 + rng.int(250);
    const relReward = 8 + rng.int(6);
    const questId = `q_${def.id}_${this.state.quests.length}_${rng.int(9999)}`;

    if (kind === 'fetch') {
      const shop = rng.pick(SHOPS);
      const entry = rng.pick(shop.stock);
      const item = ITEM_MAP[entry.itemId];
      const quest: Quest = {
        id: questId,
        kind: 'fetch',
        giverId: def.id,
        title: `带一个${item.name}`,
        detail: `想去${shop.name}买个${item.name}，买了带给我就行。`,
        targetItemId: entry.itemId,
        reward,
        relationshipReward: relReward,
        deadlineDay: this.currentDay,
        status: 'active',
      };
      this.state.addQuest(quest);
      this.view = {
        speaker: def.name,
        text: `其实有件事想拜托你……\n${quest.detail}（报酬 ${reward} 元）`,
        choices: [{ label: '返回', action: 'back' }],
      };
    } else {
      const spot = rng.pick(['sp_plaza', 'sp_grove', 'sp_river', 'sp_street'] as const);
      const spotDef = SPOT_MAP[spot];
      const from = Math.min(21, Math.max(hour + 2, 16));
      const quest: Quest = {
        id: questId,
        kind: 'meet',
        giverId: def.id,
        title: `在${spotDef.name}见面`,
        detail: `今天${from}:00 到 ${from + 2}:00，我在${spotDef.name}等你，有话想对你说。`,
        targetSpotId: spot,
        windowFrom: from,
        windowTo: from + 2,
        reward,
        relationshipReward: relReward,
        deadlineDay: this.currentDay,
        status: 'active',
      };
      this.state.addQuest(quest);
      this.view = {
        speaker: def.name,
        text: `有件事……\n${quest.detail}（报酬 ${reward} 元）`,
        choices: [{ label: '返回', action: 'back' }],
      };
    }
    this.audio.questAccept();
  }

  private currentDay = 1;

  setDay(day: number): void {
    this.currentDay = day;
  }

  /** 开场委托：让玩家立刻体验「购买→交付」循环。 */
  grantStarterQuest(npcId: string, itemId: string, shopName: string, itemName: string): void {
    const quest: Quest = {
      id: `q_starter_${npcId}`,
      kind: 'fetch',
      giverId: npcId,
      title: `带一个${itemName}`,
      detail: `想去${shopName}买个${itemName}，买了带给我就行。`,
      targetItemId: itemId,
      reward: 260,
      relationshipReward: 12,
      deadlineDay: this.currentDay,
      status: 'active',
    };
    this.state.addQuest(quest);
    this.audio.questAccept();
  }

  private doTurnIn(playerNearSpot: (spotId: string, radius: number) => boolean): void {
    const npc = this.npc as Npc;
    const def = npc.def;
    const quest = this.state.quests.find((q) => q.giverId === def.id && q.status !== 'done' && q.status !== 'failed');
    if (!quest) return;

    if (quest.kind === 'fetch') {
      if (!this.state.removeItem(quest.targetItemId ?? '', 1)) {
        this.view = { speaker: def.name, text: '东西还没带来呢，不急，今天内就好。', choices: [{ label: '返回', action: 'back' }] };
        return;
      }
    } else if (quest.kind === 'meet') {
      const near = quest.targetSpotId ? playerNearSpot(quest.targetSpotId, 9) : false;
      const inWindow = this.currentHour >= (quest.windowFrom ?? 0) && this.currentHour < (quest.windowTo ?? 24);
      if (!near || !inWindow) {
        this.view = {
          speaker: def.name,
          text: `我们约的时间是${quest.windowFrom}:00 到 ${quest.windowTo}:00，在${SPOT_MAP[quest.targetSpotId ?? '']?.name ?? '那里'}见。`,
          choices: [{ label: '返回', action: 'back' }],
        };
        return;
      }
    }

    quest.status = 'done';
    this.state.money += quest.reward;
    this.state.addRelationship(def.id, quest.relationshipReward);
    this.state.questsDoneToday += 1;
    this.audio.questDone();
    this.view = {
      speaker: def.name,
      text: `太感谢了！这是报酬 ${quest.reward} 元。\n（好感 +${quest.relationshipReward}）`,
      choices: [{ label: '返回', action: 'back' }],
    };
  }

  private currentHour = 8;

  setHour(hour: number): void {
    this.currentHour = hour;
  }

  private render(): void {
    this.rootEl.classList.remove('hidden');
    this.speakerEl.textContent = this.view.speaker;
    this.textEl.textContent = this.view.text;
    this.choicesEl.innerHTML = '';
    this.view.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice';
      const key = document.createElement('span');
      key.className = 'choice-key';
      key.textContent = String(index + 1);
      button.append(key, document.createTextNode(choice.label));
      button.addEventListener('click', () => this.choose(choice.action, choice.payload));
      this.choicesEl.appendChild(button);
    });
  }
}
