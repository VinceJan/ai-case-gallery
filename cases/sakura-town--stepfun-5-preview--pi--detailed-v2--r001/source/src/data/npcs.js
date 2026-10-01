// NPC 定义：身份、住所、作息路线、对话
// route: 按小时推进的路径点 {t, x, z, hide?, waitCrossing?}

export const NPC_DEFS = [
  /* ---------------- 奶奶（玩家的奶奶） ---------------- */
  {
    id: 'suzuki', name: '铃木芳子', title: '奶奶',
    colors: { skin: '#eec39c', shirt: '#7a6a9a', pants: '#4a4a55', hair: '#cfc8c0', bun: true, shoe: '#5a5a66' },
    speed: 0.85, umbrella: true,
    start: [38, 55], startYaw: Math.PI,
    route: [
      { t: 0, x: 38, z: 55, hide: true },
      { t: 6.5, x: 38, z: 62 },
      { t: 7.2, x: 44, z: 62 },
      { t: 7.9, x: 49, z: 60 },
      { t: 9.0, x: 44, z: 62 },
      { t: 9.5, x: 38, z: 62 },
      { t: 10.0, x: 38, z: 55, hide: true },
      { t: 13.5, x: 38, z: 62 },
      { t: 14.0, x: 24, z: 62 },
      { t: 14.7, x: 8, z: 62 },
      { t: 15.3, x: 0, z: 62 },
      { t: 15.9, x: 0, z: 40 },
      { t: 17.0, x: 0, z: 8 },
      { t: 17.6, x: -4, z: 8 },
      { t: 18.4, x: 0, z: 8 },
      { t: 18.9, x: 0, z: 40 },
      { t: 19.5, x: 0, z: 62 },
      { t: 20.0, x: 38, z: 62 },
      { t: 20.4, x: 38, z: 55, hide: true },
    ],
    talk(g) {
      const trust = g.trust.suzuki || 0;
      const lines = [];
      const h = g.time.hours;
      if (h < 5 || h > 21.5) lines.push('这么晚了还没睡呀。夜里镇上很安静，早点休息吧。');
      else if (h < 10) lines.push('早上好。粥在锅里，自己盛啊。');
      else if (h < 14) lines.push('午饭吃了没有？别老是吃便利店的东西。');
      else if (h < 18) lines.push('下午天气真好。樱花季的白天越来越长了。');
      else lines.push('晚上想吃什么？冰箱里有材料。');
      lines.push('难得回来一趟，多在镇上走走吧。');
      if (g.items.some((i) => i.id === 'catFound')) {
        lines.push('……找到它了？在河边睡着了吧，那只猫从小就喜欢水边。');
        lines.push('谢谢你啊。晚上给你做好吃的。');
        g.setFlag('catFound', true);
        g.quests.complete('cat');
        return lines;
      }
      if (trust >= 30 && !g.flags.letterPosted && !g.quests.isActive('letter') && !g.quests.isCompleted('letter')) {
        lines.push('啊，对了——柜子上有封信，帮我寄到邮局去吧。');
        g.quests.start('letter');
      }
      if (g.flags.prayed) lines.push('你去过山上的神社了？那地方春天最好了。');
      if (trust >= 60) lines.push('你小时候啊，每年都在那棵大樱树下睡觉……时间真快。');
      return lines;
    },
  },

  /* ---------------- 站长 ---------------- */
  {
    id: 'nakamura', name: '中村涼', title: '站长',
    colors: { skin: '#e8b78f', shirt: '#e8e4d8', pants: '#2b3a67', hair: '#4a4a55', cap: '#2b3a67', shoe: '#3a3a44' },
    speed: 1.0,
    start: [0, -27], startYaw: Math.PI,
    route: [
      { t: 0, x: 0, z: -27, hide: true },
      { t: 6.0, x: 0, z: -27 },
      { t: 7.5, x: 0, z: -35 },
      { t: 8.5, x: 0, z: -27 },
      { t: 12.0, x: 0, z: -35 },
      { t: 13.0, x: 0, z: -27 },
      { t: 14.5, x: 20, z: -30 },
      { t: 15.0, x: 42, z: -47.5, waitCrossing: true },
      { t: 15.4, x: 42, z: -47.5 },
      { t: 16.0, x: 0, z: -27 },
      { t: 17.5, x: 0, z: -20 },
      { t: 18.5, x: 0, z: -27 },
      { t: 21.5, x: 0, z: -27, hide: true },
    ],
    talk(g) {
      const lines = [];
      const tr = g.railway?.train;
      if (g.quests.isActive('arrival')) {
        lines.push('欢迎来到樱花町！你就是芳子老师的孙子吧。');
        lines.push('这小站一天只有几班车，不过每班都很准。');
        lines.push('要去哪儿、要做什么，看看公民馆的公告板吧。');
        g.quests.notify('arrival');
        return lines;
      }
      if (tr && tr.state === 'approach') lines.push('车来了。请站在黄线里面等。');
      else if (tr && tr.state === 'dock') lines.push('现在停靠的是开往岬的区间车。要坐吗？');
      else if (tr && tr.delayed) lines.push('今天的车有点晚……山上可能有人误闯了轨道，我去看看。');
      else lines.push('下一班车大概还有 ' + Math.max(1, Math.round(tr ? tr.timeToNext : 30)) + ' 分钟。');
      if (g.flags.viewpoint) lines.push('哦？你去过山上的眺望台了。那里的风景是最好的。');
      if ((g.trust.nakamura || 0) >= 40) lines.push('下次放长假，再来住几天啊。站里一直缺人手（笑）。');
      return lines;
    },
  },

  /* ---------------- 便利店店员 ---------------- */
  {
    id: 'hana', name: '山田花', title: '便利店店员',
    colors: { skin: '#f2c9a8', shirt: '#f4f1e8', pants: '#33405e', hair: '#5a3a2c', vest: '#d97a95', cap: '#d97a95', shoe: '#e8e4d8' },
    speed: 1.25,
    start: [-3, 22.4], startYaw: 0,
    route: [
      { t: 0, x: -3, z: 22.4, hide: true },
      { t: 5.0, x: 84, z: 14, hide: true },
      { t: 5.8, x: 70, z: 14 },
      { t: 6.2, x: 40, z: 16 },
      { t: 6.6, x: 10, z: 26 },
      { t: 7.0, x: -3, z: 26 },
      { t: 7.4, x: -3, z: 22.4 },
      { t: 12.0, x: -16.8, z: 18 },
      { t: 12.3, x: -3, z: 22.4 },
      { t: 22.2, x: -3, z: 22.4 },
      { t: 22.6, x: 10, z: 26 },
      { t: 23.0, x: 60, z: 16 },
      { t: 23.3, x: 88, z: 16, hide: true },
    ],
    talk(g) {
      const lines = [];
      const h = g.time.hours;
      if (g.quests.isActive('package')) {
        lines.push('啊，这个包裹是给田中家的。麻烦你跑一趟啦，谢谢！');
        g.quests.notify('package');
        return lines;
      }
      if (g.flags.lateOpen && h < 8) {
        lines.push('抱歉抱歉，今天开店晚了……货送得太迟。');
        lines.push('反正你也没事做吧？帮我把这个包裹送到田中家好不好？');
        g.quests.start('package');
        return lines;
      }
      if (!g.quests.isActive('package') && !g.quests.isCompleted('package')
        && g.quests.completed.includes('arrival') && (g.trust.hana || 0) >= 8 && h > 8 && h < 20) {
        lines.push('啊，正好！能帮我把这个包裹送到田中家吗？谢谢啦！');
        g.quests.start('package');
        return lines;
      }
      if (h < 6 || h >= 22) lines.push('欢迎光临……啊，这个点还在营业的只有我们了。');
      else lines.push('欢迎光临！关东煮第二轮七点出锅。');
      if (g.quests.isActive('train_delay') && !g.flags.toldHana) {
        lines.push('……什么？列车延误了？站长让你来告诉我？');
        lines.push('太好了，这样我就不用一直盯着时刻表了。谢谢你！');
        g.flags.toldHana = true;
        g.quests.notify('train_delay');
        return lines;
      }
      lines.push('饭团和牛奶在进门右手边。咖啡豆在最里面的货架上。');
      if ((g.trust.hana || 0) >= 30) lines.push('你总来买东西，我都记住你了。学生？来乡下度假？');
      return lines;
    },
  },

  /* ---------------- 咖啡店老板 ---------------- */
  {
    id: 'sato', name: '佐藤健二', title: '咖啡店老板',
    colors: { skin: '#e0ac82', shirt: '#f4f1e8', pants: '#5a4a3a', hair: '#2e2620', glasses: true, apron: '#8a6742', shoe: '#4a3a2e' },
    speed: 1.05,
    start: [22, 21.5], startYaw: 0,
    route: [
      { t: 0, x: 22, z: 21.5, hide: true },
      { t: 6.8, x: 22, z: 21.5 },
      { t: 8.2, x: -8, z: 20 },
      { t: 8.8, x: 22, z: 21.5 },
      { t: 12.2, x: 16, z: 26 },
      { t: 13.0, x: 22, z: 21.5 },
      { t: 20.2, x: 22, z: 21.5 },
      { t: 20.6, x: 30, z: 26 },
      { t: 21.0, x: 60, z: 26, hide: true },
    ],
    talk(g) {
      const lines = [];
      if (g.quests.isActive('coffee')) {
        lines.push('咖啡豆就拜托你了。便利店的货架上应该有。');
        g.quests.notify('coffee');
        return lines;
      }
      if (g.items.some((i) => i.id === 'coffee_beans') && !g.quests.isActive('coffee') && !g.quests.completed.includes('coffee')) {
        lines.push('你买到咖啡豆了？太感谢了，我正急着用。');
        lines.push('这是谢礼，拿去买点喝的吧。');
        g.setFlag('coffeeGiven', true);
        g.quests.complete('coffee');
        return lines;
      }
      const h = g.time.hours;
      if (h < 8 && !g.quests.isActive('coffee') && !g.quests.completed.includes('coffee') && g.quests.completed.includes('arrival')) {
        lines.push('……糟了，咖啡豆用完了。能帮我买一包吗？便利店就有。');
        g.quests.start('coffee');
        return lines;
      }
      if (h < 8) lines.push('早上好。第一杯咖啡总是最好的。');
      else if (h >= 20) lines.push('要打烊了。最后一位客人，慢慢来。');
      else lines.push('随便坐。今天的手冲是樱花风味的拼配。');
      if (g.weather.raining) lines.push('下雨天客人少，正好研究新菜单。');
      if ((g.trust.sato || 0) >= 40) lines.push('说起来，庙会那天的樱花奶昔，想不想帮忙试味道？');
      return lines;
    },
  },

  /* ---------------- 小学生 ---------------- */
  {
    id: 'yuki', name: '田中雪', title: '小学生',
    colors: { skin: '#f4cdaa', shirt: '#f4f1e8', pants: '#d97a95', hair: '#3a2c26', skirt: true, hat: '#f2d24b', backpack: '#c0392b', shoe: '#e8e4d8' },
    speed: 1.35, umbrella: true,
    start: [66, 15], startYaw: Math.PI,
    route: [
      { t: 0, x: 66, z: 15, hide: true },
      { t: 7.5, x: 66, z: 15 },
      { t: 8.0, x: 50, z: 16 },
      { t: 8.5, x: 42, z: 16 },
      { t: 9.0, x: 0, z: 8 },
      { t: 9.5, x: -55, z: 8 },
      { t: 10.0, x: -75, z: 8 },
      { t: 10.5, x: -75, z: 42 },
      { t: 11.0, x: -57, z: 42 },
      { t: 11.4, x: -56, z: 53 },
      { t: 15.4, x: -56, z: 53 },
      { t: 16.0, x: -57, z: 42 },
      { t: 16.4, x: -40, z: 40 },
      { t: 17.5, x: -22, z: 40 },
      { t: 18.3, x: 0, z: 40 },
      { t: 19.0, x: 42, z: 16 },
      { t: 19.5, x: 66, z: 15, hide: true },
    ],
    talk(g) {
      const lines = [];
      if (g.quests.isActive('hat')) {
        if (g.items.some((i) => i.id === 'hat')) {
          lines.push('……我的帽子！你在公园捡到的？');
          lines.push('太好了！谢谢你！这个给你——神社的护身符。');
          g.setFlag('hatReturned', true);
          g.quests.complete('hat');
          return lines;
        }
        lines.push('我的帽子……大概掉在公园里了。黄色的那顶。');
        lines.push('找到的话能还给我吗？');
        return lines;
      }
      if (!g.quests.completed.includes('hat')) {
        lines.push('呜……我的帽子不见了。');
        lines.push('黄色的帽子，可能掉在公园的草丛里了……能帮我找找吗？');
        g.quests.start('hat');
        return lines;
      }
      const h = g.time.hours;
      if (h < 9) lines.push('要迟到了要迟到了！');
      else if (h > 18) lines.push('妈妈说太晚不能在外面玩。但是我还能再玩五分钟！');
      else lines.push('公园的樱花全开了！比学校的还好看！');
      if ((g.trust.yuki || 0) >= 30) lines.push('大哥哥/大姐姐是从城里来的吗？城里也有樱花吗？');
      return lines;
    },
  },

  /* ---------------- 零工 ---------------- */
  {
    id: 'takada', name: '高田実', title: '水电零工',
    colors: { skin: '#d9a06e', shirt: '#6fb56f', pants: '#4a4a55', hair: '#2e2620', shoe: '#5a4a3a' },
    speed: 1.2,
    start: [0, -20], startYaw: 0,
    route: [
      { t: 0, x: 0, z: -27, hide: true },
      { t: 7.0, x: 0, z: -20 },
      { t: 7.5, x: 0, z: 8 },
      { t: 8.0, x: -3, z: 18 },
      { t: 9.0, x: 22, z: 18 },
      { t: 10.0, x: 42, z: 16 },
      { t: 11.0, x: 66, z: 15 },
      { t: 12.0, x: 66, z: 36 },
      { t: 13.0, x: 42, z: 34 },
      { t: 14.0, x: 0, z: 8 },
      { t: 15.0, x: -58, z: 30 },
      { t: 16.0, x: -56, z: 53 },
      { t: 17.0, x: 0, z: 40 },
      { t: 18.0, x: 0, z: 8 },
      { t: 19.0, x: 0, z: -20 },
      { t: 19.5, x: 0, z: -27, hide: true },
    ],
    talk(g) {
      const lines = [];
      if (g.weather.raining) {
        lines.push('下雨天干不了活，只能在便利店躲雨。');
        lines.push('小道消息：听说河边的旧屋子最近有动静，你要好奇就去看看。');
        return lines;
      }
      lines.push('我是做水电零工的高田。这镇上哪家水管坏了都找我。');
      if (g.quests.isActive('festival_prep')) lines.push('庙会的灯笼？我昨天就挂好了，你去神社看看 heights……啊不，看看挂好没有。');
      if ((g.trust.takada || 0) >= 30) lines.push('想要看稀罕东西？沿着河边往西走，有间没人住的小屋。');
      return lines;
    },
  },

  /* ---------------- 背景居民 ---------------- */
  {
    id: 'bg1', name: '佐野绿', title: '高中生', background: true,
    colors: { skin: '#f2c9a8', shirt: '#f4f1e8', pants: '#4a5568', hair: '#2e2620', skirt: true, backpack: '#2b3a67', shoe: '#e8e4d8' },
    speed: 1.4, start: [76, 14], startYaw: Math.PI,
    route: [
      { t: 0, x: 76, z: 14, hide: true },
      { t: 7.0, x: 76, z: 14 },
      { t: 7.6, x: 42, z: 16 },
      { t: 8.2, x: 0, z: 8 },
      { t: 9.0, x: -55, z: 8 },
      { t: 9.6, x: -75, z: 8 },
      { t: 10.0, x: -56, z: 53 },
      { t: 15.5, x: -56, z: 53 },
      { t: 16.0, x: -57, z: 42 },
      { t: 16.5, x: -22, z: 40 },
      { t: 18.0, x: 0, z: 8 },
      { t: 18.6, x: 42, z: 16 },
      { t: 19.0, x: 76, z: 14, hide: true },
    ],
    talk: () => ['啊，你好。我赶时间……'],
  },
  {
    id: 'bg2', name: '散步的主妇', title: '居民', background: true,
    colors: { skin: '#eec39c', shirt: '#d9a441', pants: '#7a6a9a', hair: '#3a2c26', shoe: '#e8e4d8' },
    speed: 1.0, umbrella: true, start: [-30, 8], startYaw: 0,
    route: [
      { t: 0, x: -30, z: 8, hide: true },
      { t: 9.0, x: -30, z: 8 },
      { t: 10.0, x: 30, z: 8 },
      { t: 11.0, x: 30, z: 26 },
      { t: 12.0, x: -20, z: 26 },
      { t: 13.0, x: -20, z: 8 },
      { t: 14.0, x: -40, z: 8 },
      { t: 15.0, x: -40, z: 40 },
      { t: 16.5, x: -22, z: 40 },
      { t: 18.0, x: 0, z: 8 },
      { t: 18.5, x: -30, z: 8, hide: true },
    ],
    talk: () => ['今天的鱼新鲜吗……啊，我在自言自语。'],
  },
  {
    id: 'bg3', name: '佐久間老人', title: '居民', background: true,
    colors: { skin: '#d9a883', shirt: '#8a8a7a', pants: '#4a4a55', hair: '#cfc8c0', shoe: '#5a5a66' },
    speed: 0.75, start: [-8, 30], startYaw: 0,
    route: [
      { t: 0, x: -8, z: 30, hide: true },
      { t: 8.0, x: -8, z: 30 },
      { t: 9.0, x: -22, z: 40 },
      { t: 11.0, x: -22, z: 40 },
      { t: 12.0, x: -6, z: 26 },
      { t: 13.0, x: -6, z: 26 },
      { t: 14.0, x: -22, z: 40 },
      { t: 16.0, x: 0, z: 40 },
      { t: 17.0, x: 0, z: 8 },
      { t: 18.0, x: -8, z: 30, hide: true },
    ],
    talk: () => ['年轻真好啊。我每天都在这公园走三圈。'],
  },
  {
    id: 'bg4', name: '等车的男人', title: '居民', background: true,
    colors: { skin: '#e0ac82', shirt: '#f4f1e8', pants: '#2b3a67', hair: '#2e2620', shoe: '#3a3a44' },
    speed: 1.15, start: [0, -20], startYaw: Math.PI,
    route: [
      { t: 0, x: 0, z: -27, hide: true },
      { t: 7.0, x: 0, z: -20 },
      { t: 8.0, x: 0, z: -35 },
      { t: 8.6, x: 0, z: -20 },
      { t: 17.5, x: 0, z: -20 },
      { t: 18.2, x: 0, z: -35 },
      { t: 19.0, x: 0, z: -27, hide: true },
    ],
    talk: () => ['我在等去岬的车。晚点的日子也不少，习惯了。'],
  },
];

/** 猫咪（特殊 NPC） */
export const CAT_SPOTS = [
  { x: 58, z: 64 }, { x: 66, z: 60 }, { x: -20, z: 44 }, { x: -30, z: 36 },
  { x: -86, z: 60 }, { x: 36, z: 58 }, { x: 12, z: 26 }, { x: -4, z: 30 },
];
