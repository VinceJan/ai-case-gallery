/**
 * 对白：按 NPC、时间段、任务状态挑选台词。
 * 返回 {name, text, face} 的数组，交给 UI 逐条显示。
 */
import { QUESTS } from './quests.js';

const h = (hour) => {
  if (hour < 5) return 'night';
  if (hour < 8) return 'morning';
  if (hour < 11) return 'forenoon';
  if (hour < 14) return 'noon';
  if (hour < 17) return 'afternoon';
  if (hour < 20) return 'evening';
  return 'night';
};

const LINES = {
  yamada: {
    morning: ['哟，起得挺早。今天的菜刚到，新鲜着呢。', '镇上的早晨啊，安静得能听见鸟叫。'],
    forenoon: ['要买菜？自己挑，不买也没关系。', '听说河边那条铁路今天还要加一班车。'],
    noon: ['刚吃饭回来，来点萝卜？自家种的。'],
    afternoon: ['下午我得眯一会儿，年纪大了。', '美咲那孩子今天好像在公园疯跑。'],
    evening: ['要去喝一杯吗？「灯」那边今天有刺身。'],
    night: ['早点休息，明天还有一整天呢。'],
    quests: {
      delivery: {
        start: [
          ['山田 三郎', '啊，正好遇到你。'],
          ['山田 三郎', '有个小包裹想麻烦你送到田中家——就是主街往西、北横街那栋。'],
          ['山田 三郎', '是花子托我带的，她男人出远门了，东西多。'],
        ],
        done: [['山田 三郎', '回来了？辛苦了，花子刚才还打电话来道谢。']],
      },
    },
    default: [['山田 三郎', '欢迎光临，随时来坐坐。']],
  },
  tanaka: {
    morning: ['早啊。今天的菜园该浇水了。', '你看起来精神不错呢。'],
    forenoon: ['刚去便利店买了东西，人有点多。', '菜园里要是再不去浇水，萝卜就要渴了。'],
    noon: ['在咖啡店歇脚，星光咖啡的咖啡豆确实不错。'],
    afternoon: ['公园的樱花今年开得正好。', '小林爷爷每天一大早就去钓鱼，真是有精神。'],
    evening: ['该做晚饭了。', '晚上和小林爷爷约了喝酒。'],
    night: ['晚安，做个好梦。'],
    quests: {
      delivery: {
        ready: [
          ['田中 花子', '啊，是我的包裹吗？太感谢了！'],
          ['田中 花子', '最近一个人忙得团团转，多亏有你帮忙。'],
        ],
        notyet: [['田中 花子', '咦？好像有东西要寄给我？']],
      },
      garden: {
        start: [
          ['田中 花子', '啊，你有空吗？'],
          ['田中 花子', '菜园今天该浇水了，我一个人忙不过来……'],
          ['田中 花子', '浇完水，萝卜就能收了。'],
        ],
        done: [['田中 花子', '谢谢！萝卜你带几个回去吃吧。']],
      },
    },
    default: [['田中 花子', '慢慢走，樱花镇不大，一会就到。']],
  },
  kobayashi: {
    morning: ['年轻人起得比我晚多了。', '今天鲷鱼好像不在usual的位置……啊，说错了，是这条河。'],
    forenoon: ['神社那边很安静，适合散步。'],
    noon: ['钓了一上午，一条也没有。哈哈，不气馁。'],
    afternoon: ['我在镇上随便走走，你随意。', '这个镇子四十年了，闭着眼睛都能走。'],
    evening: ['晚上去「灯」那里坐坐？'],
    night: ['早点回去，年纪大了，觉少。'],
    quests: {
      firstfish: {
        start: [
          ['小林 茂', '欸，你也想钓鱼？'],
          ['小林 茂', '河边那个小亭子钓位不错。拿着我的钓竿去试试吧。'],
          ['小林 茂', '钓到的鱼，送到拉面 一龙 给小夜那丫头，她会高兴的。'],
        ],
        done: [['小林 茂', '哈哈，鱼！我就说你有财运！']],
      },
    },
    default: [['小林 茂', '樱花镇啊……是个好地方。']],
  },
  misaki: {
    morning: ['早！今天也要上学。', '啊，你起得好早。'],
    forenoon: ['上课中……（悄悄）下节课是数学。'],
    noon: ['午休！一起吃便当吗？'],
    afternoon: ['放学了！我要去公园玩。'],
    evening: ['今天很累……但是很开心。'],
    night: ['晚安！明天见！'],
    quests: {
      lostcat: {
        start: [
          ['樱花 美咲', '呜……三花不见了！'],
          ['樱花 美咲', '早上它还跟着我的！后来就不见了……'],
          ['樱花 美咲', '它最喜欢去河边的公园了。能不能帮我找找？'],
        ],
        done: [['樱花 美咲', '三花！你跑到哪里去了——谢谢你！！']],
      },
    },
    default: [['樱花 美咲', '要不要一起去公园？']],
  },
  kenji: {
    morning: ['早上好。今天的列车会准点。', '站台的椅子我昨天刚擦过。'],
    forenoon: ['一天三班，班班都准时——这可是我唯一的骄傲。'],
    noon: ['吃饭时间，站台会空一点。'],
    afternoon: ['对岸的樱花，是从车窗里看最好。'],
    evening: ['下班了！今天去「灯」庆祝一下。'],
    night: ['晚安。'],
    quests: {
      watchtrain: {
        start: [
          ['健一', '你是来看列车的？'],
          ['健一', '正好今天列车会进站。你到站台那边站着看吧。'],
          ['健一', '看完回来跟我说说感想，我请你喝饮料。'],
        ],
        done: [['健一', '是吧！每天都有不一样的风景从车窗掠过。']],
      },
    },
    default: [['健一', '要坐车的话，趁现在去售票口买票。']],
  },
  koyo: {
    morning: ['准备开店中……味噌今天刚熬好。', '来一碗？'],
    forenoon: ['中午最忙，稍等。'],
    noon: ['一碗味噌拉面，热的要不要？'],
    afternoon: ['下午比较清闲，适合发呆。'],
    evening: ['拉面店晚上也开着。'],
    night: ['最后一份汤要卖完了哦。'],
    quests: {
      firstfish: {
        ready: [
          ['小夜', '哇，是河里的鱼！谢谢！'],
          ['小夜', '今天的鱼汤就用它了——要不要来一碗？'],
        ],
      },
    },
    default: [['小夜', '味噌拉面，招牌招牌。']],
  },
  yui: {
    morning: ['早上好，咖啡刚烘好。', '今天的拿铁很顺。'],
    forenoon: ['画画的时候不能被打扰哦……啊，抱歉。'],
    noon: ['午休！去公园走走吧。'],
    afternoon: ['我在速写本上画樱花。', '傍晚的樱花最好看，颜色会变。'],
    evening: ['去喝酒？去嘛去嘛。'],
    night: ['晚安。'],
    quests: {
      petals: {
        start: [
          ['结衣', '帮个忙好不好～'],
          ['结衣', '我在找 5 片完整的樱花瓣，想做成书签。'],
          ['结衣', '公园里的樱花树下应该掉了很多。'],
        ],
        done: [['结衣', '五片都找到了！你真厉害。']],
      },
    },
    default: [['结衣', '要不要来杯手冲？']],
  },
  sora: {
    morning: ['稻田的水刚放好，今天的活儿多。', '早啊，要不要来根萝卜？'],
    forenoon: ['插秧的活儿干完了，肩膀酸。'],
    noon: ['农家的饭量大得很，你也多吃点。'],
    afternoon: ['下午去镇上卖点菜。'],
    evening: ['坐在门口看夕阳也不错。'],
    night: ['田里安静下来了。'],
    default: [['空', '庄稼人最怕的，就是没人来。']],
  },
};

/**
 * 生成本次对话的台词序列
 * @returns {{name:string,text:string,face:string}[]}
 */
export function buildTalk(npc, state) {
  const id = npc.def.id;
  const set = LINES[id];
  if (!set) return [{ name: npc.def.name, text: '……', face: 'normal' }];
  const slot = h(state.hour + state.minute / 60);
  const out = [];

  // 任务相关优先
  for (const q of QUESTS) {
    if (q.giver !== id) continue;
    const e = state.quests[q.id];
    const qd = set.quests?.[q.id];
    if (!qd || !e) continue;
    if (e.status === 'locked') {
      out.push(...toLines(qd.start));
      out.push({ name: npc.def.name, text: `（接下了任务：${q.title}）`, face: 'happy' });
      continue;
    }
    if (e.status === 'active' && qd.ready) {
      const step = q.steps[e.step];
      const need = step?.check?.(state);
      if (need && e.step === q.steps.length - 1) {
        out.push(...toLines(qd.ready));
        continue;
      }
      if (qd.notyet) out.push(...toLines(qd.notyet));
      else out.push({ name: npc.def.name, text: `（当前目标：${step?.text || '……'}）`, face: 'normal' });
      continue;
    }
    if (e.status === 'done' && qd.done && Math.random() < 0.5) {
      out.push(...toLines(qd.done));
      continue;
    }
  }

  const pool = set[slot] || set.default;
  if (pool && pool.length) {
    out.push({ name: npc.def.name, text: pool[Math.floor(Math.random() * pool.length)], face: 'normal' });
  }

  if (out.length === 0) out.push({ name: npc.def.name, text: '……', face: 'normal' });
  return out;
}

function toLines(arr) {
  return (arr || []).map(([name, text]) => ({ name, text, face: 'normal' }));
}
