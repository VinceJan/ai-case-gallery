/**
 * 任务：镇上自然发生的小差事。
 * 每个任务由若干步组成，步的完成条件是纯函数 check(state)，
 * 游戏每帧轮询当前步，满足就推进并给奖励。
 */
export const QUESTS = [
  {
    id: 'delivery',
    title: '第一件差事',
    giver: 'yamada',
    order: 1,
    summary: '把山田商店的包裹送到田中家。',
    startCheck: (s) => !!s.flags.met_yamada,
    startText: '山田老板好像有话要说……',
    onStart: (s) => {
      s.inv.add('parcel', 1);
      s.toast('获得：📦 包裹');
    },
    steps: [
      {
        text: '把 📦 包裹送到田中家（北横街西侧）',
        check: (s) => s.flags.delivered_parcel,
      },
    ],
    reward: { money: 80, item: 'catfood', itemText: '🐟 猫粮' },
    doneText: '「谢谢你啦！花子收到包裹一定会很高兴的。」',
  },
  {
    id: 'lostcat',
    title: '三花不见了',
    giver: 'misaki',
    order: 2,
    summary: '帮美咲在河边公园找回走丢的猫「三花」。',
    startCheck: (s) => !!s.flags.met_misaki,
    startText: '美咲好像很着急的样子。',
    onStart: () => {},
    steps: [
      {
        text: '在河边公园一带找到走丢的猫「三花」',
        check: (s) => s.flags.catFound,
      },
      {
        text: '把三花带回美咲身边',
        check: (s) => s.flags.catReturned,
      },
    ],
    reward: { money: 120, item: 'snack', itemText: '🍘 小鱼干' },
    doneText: '「三花！你跑到哪里去了——谢谢你！」',
  },
  {
    id: 'firstfish',
    title: '河岸的清晨',
    giver: 'kobayashi',
    order: 3,
    summary: '陪小林爷爷钓一条鱼，再送去拉面店。',
    startCheck: (s) => !!s.flags.met_kobayashi,
    startText: '桥边有位老爷爷在钓鱼。',
    onStart: (s) => {
      s.toast('获得：🎣 钓竿（到钓点按 E 使用）');
    },
    steps: [
      {
        text: '在小亭的钓点钓上一条鱼',
        check: (s) => s.flags.caughtFish,
      },
      {
        text: '把 🐟 鱼送到拉面 一龙',
        check: (s) => s.flags.fishDelivered,
      },
    ],
    reward: { money: 150, item: 'coffee', itemText: '☕ 咖啡' },
    doneText: '「鱼钓到了？年轻人果然有财运！」',
  },
  {
    id: 'petals',
    title: '樱花季的小-request',
    giver: 'yui',
    order: 4,
    summary: '在公园的樱树下收集 5 片完整的樱花瓣。',
    startCheck: (s) => !!s.flags.met_yui,
    startText: '结衣在公园里好像在找什么。',
    onStart: () => {},
    steps: [
      {
        text: '在公园的樱花树下收集 🌸 樱花瓣（0/5）',
        check: (s) => s.inv.count('petal') >= 5,
      },
    ],
    reward: { money: 60, item: 'charm', itemText: '🧧 樱花御守' },
    doneText: '「哇，五片都有！这是给你的护身符，插在神社的绘马架上就会生效。」',
  },
  {
    id: 'garden',
    title: '花子家的菜园',
    giver: 'tanaka',
    order: 5,
    summary: '帮田中花子浇菜园，再收 3 根萝卜。',
    startCheck: (s) => !!s.flags.met_tanaka,
    startText: '花子的菜园好像有点干。',
    onStart: () => {},
    steps: [
      {
        text: '给田中家的菜园浇水',
        check: (s) => s.flags.gardenWatered,
      },
      {
        text: '在菜园里收 3 根 🥕 萝卜',
        check: (s) => s.inv.count('radish') >= 3,
      },
    ],
    reward: { money: 100, item: 'onigiri', itemText: '🍙 饭团' },
    doneText: '「萝卜长得真好！这些你带去吃吧。」',
  },
  {
    id: 'watchtrain',
    title: '去看列车吧',
    giver: 'kenji',
    order: 6,
    summary: '在站台上等一班列车进站，再和健一聊聊。',
    startCheck: (s) => !!s.flags.met_kenji,
    startText: '站台上，健一正在擦拭站牌。',
    onStart: () => {},
    steps: [
      {
        text: '在樱花站的站台上等列车进站',
        check: (s) => s.flags.sawTrain,
      },
      {
        text: '回去和健一说说你的感想',
        check: (s) => s.flags.talked_kenji_train,
      },
    ],
    reward: { money: 60, item: 'postcard', itemText: '🏞 明信片' },
    doneText: '「每天都有不同的风景从车窗掠过——这就是我的工作。」',
  },
];

export class QuestLog {
  constructor(state) {
    this.state = state;
    if (!state.quests || Object.keys(state.quests).length === 0) {
      state.quests = {};
      for (const q of QUESTS) state.quests[q.id] = { status: 'locked', step: 0 };
    }
  }

  get(id) {
    return QUESTS.find((q) => q.id === id);
  }

  entry(id) {
    return this.state.quests?.[id] || { status: 'locked', step: 0 };
  }

  status(id) {
    return this.entry(id).status;
  }

  step(id) {
    const e = this.entry(id);
    const q = this.get(id);
    if (!e || !q || e.status !== 'active') return null;
    return q.steps[e.step] || null;
  }

  /** 每帧检查：启动 / 推进 / 完成 */
  update() {
    const s = this.state;
    for (const q of QUESTS) {
      const e = this.entry(q.id);
      if (!e) continue;
      if (e.status === 'locked') {
        if (q.startCheck && q.startCheck(s)) this.begin(q.id);
        continue;
      }
      if (e.status !== 'active') continue;
      const step = q.steps[e.step];
      if (!step) continue;
      if (step.check(s)) this.advance(q.id);
    }
  }

  begin(id) {
    const e = this.entry(id);
    const q = this.get(id);
    if (!e || e.status === 'active' || e.status === 'done') return;
    e.status = 'active';
    e.step = 0;
    this.state.toast(`新任务：${q.title}`);
    q.onStart?.(this.state);
  }

  advance(id) {
    const e = this.entry(id);
    const q = this.get(id);
    if (!e || e.status !== 'active') return;
    e.step++;
    if (e.step >= q.steps.length) {
      e.status = 'done';
      e.doneDay = this.state.day;
      if (q.reward) {
        if (q.reward.money) {
          this.state.money += q.reward.money;
          this.state.toast(`获得：¥${q.reward.money}`);
        }
        if (q.reward.item) {
          this.state.inv.add(q.reward.item, 1);
          this.state.toast(`获得：${q.reward.itemText || q.reward.item}`);
        }
      }
      this.state.toast(`任务完成：${q.title}`);
      this.state.onQuestDone?.(q);
    } else {
      const next = q.steps[e.step];
      this.state.toast(`目标更新：${next.text}`);
      this.state.onQuestStep?.();
    }
  }

  active() {
    return QUESTS.filter((q) => this.entry(q.id).status === 'active');
  }

  done() {
    return QUESTS.filter((q) => this.entry(q.id).status === 'done');
  }

  available() {
    return QUESTS.filter((q) => this.entry(q.id).status === 'locked');
  }

  serialize() {
    return this.state.quests;
  }
}
