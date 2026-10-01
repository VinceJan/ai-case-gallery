// 对话内容（数据驱动 + 模板组合）
import { pick, makeRng } from '../core/utils.js';

const GREET = {
  dawn: ['这么早就要出门吗，真有精神。', '早上好，真是个清爽的早晨。', '早啊，吃过饭了吗？'],
  morning: ['早上好！', '啊，早上好。今天天气真不错呢。', '早，今天也要元气满满哦。'],
  noon: ['中午好，吃饭了吗？', '午安，正好有点饿了。', '白天了呢，街上很热闹。'],
  afternoon: ['下午好。', '午后的阳光真舒服。', '这个时间最适合散步了。'],
  evening: ['晚上好。', '天色暗下来了呢。', '傍晚的小镇最有味道了。'],
  night: ['这么晚了还没睡吗？', '夜深了，路上要小心哦。', '晚上好，外面有点凉。'],
};

const WEATHER_LINES = {
  clear: ['今天阳光真好，樱花看起来更漂亮了。', '这样的天气，最适合在公园坐坐了。', '晴天真让人心情舒畅。'],
  cloudy: ['云有点多呢，希望不要下雨。', '阴天也别有味道。', '感觉要变天了。'],
  rain: ['下雨了，出门记得带伞。', '雨中的小镇很有情调，对吧？', '这场雨下得樱花瓣都掉了。'],
  storm: ['好大的风雨！樱花都要被吹落了。', '这种天气还是别出门比较好。', '暴风雨天，门窗都关好了吗？'],
  petal: ['樱花吹雪！太美了……', '风一吹，花瓣像雪一样落下来。', '这是樱花季最后的狂欢吧。'],
};

const WORK_LINES = {
  '便利店店员': ['店里刚补了货，有新品便当哦。', '热食柜的关东煮很好吃，不来一份吗？', '深夜班有点累，但镇上很安静，我喜欢。'],
  '面包师': ['凌晨四点就要起来和面呢。', '刚出炉的蜜瓜包，要不要来一个？', '烤面包的香气就是小镇的闹钟。'],
  '咖啡店主': ['今天试了新的 blended，要不要尝尝？', '咖啡豆是本地烘焙的。', '下午店里最安静，适合看书。'],
  '书店店主': ['新到了一批樱花摄影集。', '书店虽然不赚钱，但我不想它消失。', '慢慢看，不买也没关系。'],
  '杂货铺店主': ['店里什么都有，随便看看。', '御守是从神社求来的，很灵验。', '有想要的东西可以帮我留意。'],
  '居酒屋大将': ['晚上来喝一杯吧，本地啤酒不错！', '今天的下酒菜是炸鸡。', '居酒屋是镇上大人们聊天的地方。'],
  '邮局局长': ['信件虽然少了，但每封都很珍贵。', '明信片可以从这里寄到任何地方。', '邮局是小镇的记忆保管员。'],
  '小学教师': ['孩子们又吵又让人放心不下。', '春天的校外教学快要开始了。', '看着樱花树下的孩子们，就觉得当老师真好。'],
  '神社宫司': ['樱花盛开的时候，神社最热闹。', '心要静，才能听见小镇的声音。', '祭典的准备工作很繁重，但值得。'],
  '巫女': ['打扫境内的落叶很解压呢。', '求一支签吧？今天的运势是大吉。', '樱花季的神社，香火特别旺。'],
  '农家': ['水田刚插完秧，接下来看天了。', '自己种的蔬菜，味道就是不一样。', '青蛙叫得越欢，稻子长越好。'],
  '站员': ['电车是小镇的命脉，一刻不能误点。', '搭车去城市只要四十分钟。', '站台上的樱花，是我最喜欢的风景。'],
  '退休奶奶': ['年轻时这里更热闹呢。', '老了才懂得慢慢走路的幸福。', '樱花开了又落，跟人生一样。'],
  '学生': ['放学后去公园写作业！', '明信片集邮超有趣的。', '春天就是樱花季！等等，我作业还没写完……'],
};

const GOSSIP = [
  '{other}最近好像很忙的样子。',
  '说起来，{other}昨天也在那个长椅坐了很久。',
  '听说{other}的手艺在附近都很有名哦。',
  '我和{other}认识很多年了，那是个好人。',
  '{other}？我们偶尔会一起喝茶。',
];

const FESTIVAL_LINES = [
  '祭典就快到了，好期待！',
  '听说今年的烟花规模比往年都大。',
  '我要在祭典上摆摊卖团子！',
  '祭典的准备工作，大家都干劲十足呢。',
];

const SAKURA_LINES = [
  '樱花满开了呢，一整年就等这一刻。',
  '樱花瓣落得满地都是，扫都扫不完。',
  '走在樱花道下，脚步都会变慢。',
  '樱花花期真短啊，所以要更珍惜。',
];

const GIFT_FAV = ['这个……！我一直想要这个，谢谢你！', '哇，你怎么知道我喜欢这个？', '太开心了，我会好好珍惜的。'];
const GIFT_OK = ['谢谢，我很高兴。', '这个不错呢，收下了。', '哎呀，太客气了。'];
const GIFT_BAD = ['呃……谢谢？', '这个……我可能用不上。', '心意我领了，但下次还是换个别的吧。'];

const INVITE_YES = ['好呀，那就说定了。', '能和你一起真开心，走吧。', '当然可以，我正好想出去走走。'];
const INVITE_NO = ['抱歉，今天有点忙……', '下次吧，好不好？', '啊，我还有其他安排。'];

const FIRST_MEET = [
  '啊，你是新搬来的吧？欢迎来到樱花小镇！',
  '第一次见你呢。我是这里的{npc}，请多关照。',
  '欢迎欢迎！慢慢逛，小镇很小的。',
];

export function greeting(npc, ctx) {
  const h = ctx.hour;
  const key = h < 6 ? 'dawn' : h < 10 ? 'morning' : h < 12 ? 'noon' : h < 17 ? 'afternoon' : h < 21 ? 'evening' : 'night';
  let line = pick(npc.rng, GREET[key]);
  if (ctx.firstMeet) line = pick(npc.rng, FIRST_MEET).replace('{npc}', npc.role);
  return line;
}

export function chat(npc, ctx) {
  // 优先级：祭典 > 天气极端 > 工作 > 樱花 > 八卦 > 关系
  const r = npc.rng();
  if (ctx.festivalSoon && r < 0.4) return pick(npc.rng, FESTIVAL_LINES);
  if (ctx.weather === 'storm' && r < 0.6) return pick(npc.rng, WEATHER_LINES.storm);
  if (ctx.weather === 'petal' && r < 0.5) return pick(npc.rng, SAKURA_LINES);
  if (r < 0.35) return pick(npc.rng, WEATHER_LINES[ctx.weather] || WEATHER_LINES.clear);
  if (r < 0.6 && WORK_LINES[npc.role]) return pick(npc.rng, WORK_LINES[npc.role]);
  if (r < 0.85 && ctx.otherNpcName) {
    return pick(npc.rng, GOSSIP).replace('{other}', ctx.otherNpcName);
  }
  return pick(npc.rng, SAKURA_LINES);
}

export function giftResponse(npc, value) {
  if (value >= 10) return pick(npc.rng, GIFT_FAV);
  if (value >= 5) return pick(npc.rng, GIFT_OK);
  return pick(npc.rng, GIFT_BAD);
}

export function inviteResponse(npc, accept) {
  return accept ? pick(npc.rng, INVITE_YES) : pick(npc.rng, INVITE_NO);
}

export function farewell(npc) {
  return pick(npc.rng, ['再见，路上小心。', '下次见！', '那么，回头见。', '拜拜，慢慢来哦。']);
}

// 特定情境台词
export const SPECIAL = {
  lostWallet_ask: '那个……请问你有看到我的钱包吗？里面有很多重要的卡片……',
  lostWallet_thanks: '找到了！真的太感谢你了，这是谢礼，请收下！',
  cat_hungry: '喵～（流浪猫看着你，好像饿了）',
  cat_fed: '喵～喵♪（流浪猫满足地蹭了蹭你，决定跟着你）',
  cat_gift: '喵！（猫好像给你带来了什么东西）',
  festival_greet: '祭典快乐！今晚的烟花从八点开始，别错过哦！',
  shrine_pray: '（闭上眼睛许愿……樱花静静地飘落）',
  train_conductor: '欢迎乘坐樱花线，下一站是城市站。',
  sit_bench: '（坐在长椅上，看着樱花道发了一会儿呆）',
  vending: '（买了一罐饮料，冰凉的感觉）',
};
