// 任务数据：核心玩法循环（小镇委托）
// check(g) 返回 true 时自动推进该阶段；marker 为 LOCATIONS 中的地点 id

export const QUEST_DEFS = [
  {
    id: 'arrival',
    title: '初来乍到',
    desc: '奶奶说，到了新地方要去和照顾你的人打声招呼。去车站吧。',
    giver: 'suzuki',
    auto: true,
    stages: [
      { text: '去樱花町站，和中村站长说说话', marker: 'station', check: (g) => g.met.nakamura },
    ],
    reward: { coins: 300, trust: { suzuki: 5 } },
    doneText: '站长挥手送你出站。春假开始了。',
  },
  {
    id: 'letter',
    title: '奶奶的信',
    desc: '奶奶有一封写了很久的信，想让你帮忙寄到邮局。',
    giver: 'suzuki',
    condition: (g) => (g.trust.suzuki || 0) >= 25 && !g.flags.letterPosted,
    stages: [
      { text: '从家门口的信箱里取出信', check: (g) => g.items.some((i) => i.id === 'letter') },
      { text: '把信投进邮局前的邮筒', marker: 'post', check: (g) => g.flags.letterPosted },
    ],
    reward: { coins: 200, trust: { suzuki: 10 } },
    doneText: '信寄出去了。奶奶看起来松了口气。',
  },
  {
    id: 'package',
    title: '一个小包裹',
    desc: '便利店老板请你把一个包裹送到东边的田中家。',
    giver: 'hana',
    condition: (g) => g.quests.completed.includes('arrival'),
    stages: [
      { text: '从花小姐那里接过包裹', check: (g) => g.items.some((i) => i.id === 'package') },
      { text: '把包裹送到田中家', marker: 'tanaka', check: (g) => g.flags.packageDelivered },
    ],
    reward: { coins: 250, trust: { hana: 10 } },
    doneText: '田中家的人收下了包裹，还送了你自己烤的饼干。',
  },
  {
    id: 'hat',
    title: '遗失的帽子',
    desc: '小雪的黄色帽子丢在了公园里。',
    giver: 'yuki',
    stages: [
      { text: '在樱丘公园的草丛里找找看', marker: 'park', check: (g) => g.items.some((i) => i.id === 'hat') },
      { text: '把帽子还给小雪', marker: 'tanaka', check: (g) => g.flags.hatReturned },
    ],
    reward: { coins: 150, trust: { yuki: 12 }, item: 'omamori' },
    doneText: '小雪把神社的护身符送给了你。',
  },
  {
    id: 'coffee',
    title: '咖啡豆没了',
    desc: '咖啡店的老板急需咖啡豆，便利店应该有卖。',
    giver: 'sato',
    condition: (g) => g.quests.completed.includes('arrival'),
    stages: [
      { text: '在便利店的食品货架上买咖啡豆（￥300）', marker: 'konbini', check: (g) => g.items.some((i) => i.id === 'coffee_beans') },
      { text: '把咖啡豆交给佐藤老板', marker: 'cafe', check: (g) => g.flags.coffeeGiven },
    ],
    reward: { coins: 200, trust: { sato: 12 } },
    doneText: '老板请你喝了一杯新拼配。',
  },
  {
    id: 'cat',
    title: '猫咪去哪儿了',
    desc: '奶奶说，镇上的猫今天没来讨食。',
    giver: 'suzuki',
    condition: (g) => g.flags.catMissing,
    stages: [
      { text: '去河边找找看', marker: 'riverPath', check: (g) => g.items.some((i) => i.id === 'catFound') },
      { text: '告诉奶奶猫找到了', marker: 'suzuki', check: (g) => g.flags.catFound },
    ],
    reward: { coins: 100, trust: { suzuki: 8 } },
    doneText: '奶奶笑了：「它啊，老是往人少的地方跑。」',
  },
  {
    id: 'train_delay',
    title: '列车延误',
    desc: '列车不知为何延误了，站长希望你通知便利店的店员。',
    giver: 'nakamura',
    condition: (g) => g.flags.trainDelayed,
    stages: [
      { text: '去便利店告诉花小姐列车延误了', marker: 'konbini', check: (g) => g.flags.toldHana },
    ],
    reward: { coins: 150, trust: { nakamura: 10, hana: 5 } },
    doneText: '花小姐说，这样她就不用一直盯着时刻表了。',
  },
  {
    id: 'festival_prep',
    title: '庙会的准备',
    desc: '春天的庙会要挂灯笼，居民们需要帮手。',
    giver: 'takada',
    condition: (g) => totalTrust(g) >= 40,
    stages: [
      { text: '去神社挂上三盏灯笼', marker: 'shrine', check: (g) => (g.flags.lanterns || 0) >= 3 },
    ],
    reward: { coins: 400, trust: { suzuki: 10, takada: 10, yuki: 5 } },
    doneText: '灯笼挂好了。傍晚的神社，一定会很漂亮。',
  },
  {
    id: 'sakura_spots',
    title: '樱花三景',
    desc: '奶奶说，镇上最美的三个赏樱处，你都应该去看看。',
    giver: 'suzuki',
    condition: (g) => g.quests.completed.includes('letter'),
    stages: [
      { text: '公园池畔', marker: 'park', check: (g) => g.flags.vp_park },
      { text: '神社山道', marker: 'shrine', check: (g) => g.flags.vp_shrine },
      { text: '樱桥桥头', marker: 'bridge', check: (g) => g.flags.vp_bridge },
    ],
    reward: { coins: 300, trust: { suzuki: 12 } },
    doneText: '奶奶：「你看到的樱花，比我说的还要好吧？」',
  },
  {
    id: 'night_sakura',
    title: '夜樱',
    desc: '庙会的灯笼亮起之后，晚上的神社是另一个世界。',
    giver: 'suzuki',
    condition: (g) => g.flags.festival && g.time.isNight,
    stages: [
      { text: '在夜晚去一趟稻荷神社', marker: 'shrine', check: (g) => g.flags.nightSakura },
    ],
    reward: { coins: 500 },
    doneText: '夜风、灯笼、花瓣。这个春天，大概会记很久。',
  },
];

function totalTrust(g) {
  let t = 0;
  for (const k of ['suzuki', 'nakamura', 'hana', 'sato', 'yuki', 'takada']) t += g.trust[k] || 0;
  return t;
}
