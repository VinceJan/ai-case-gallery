import * as THREE from 'three';
import { ITEMS } from './GameState.js';

const OMIKUJI_LIST = [
  { rank: '大吉', text: '春风顺意，今日在樱川边会有意外的小确幸。' },
  { rank: '中吉', text: '放慢脚步听听道口的铃声，温柔的事正悄悄靠近。' },
  { rank: '吉', text: '一杯热茶配刚出炉的面包，便是最好的日常。' },
  { rank: '小吉', text: '偶遇橘猫时记得摸摸它的下巴，好运会翻倍。' },
];

export class InteractionSystem {
  constructor(ctx) {
    this.ctx = ctx;
    this.points = [];
    this.nearest = null;
    this._activeNpc = null;
  }

  registerStaticPoints() {
    const { town, shrine, railway, terrain } = this.ctx;
    this.points = [];

    for (const b of [...terrain.benches, ...town.benches, ...shrine.benches, ...railway.benches]) {
      this.points.push({
        id: b.id, label: b.label, pos: new THREE.Vector3(b.x, b.y, b.z), radius: 2.3,
        action: () => {
          this.ctx.audio.playUiClick();
          this.ctx.player.sitOnBench(b);
          this.ctx.ui.showSitBar(true);
        },
      });
    }

    this.points.push({
      id: 'fishing_pier', label: '在樱川木栈道垂钓', pos: new THREE.Vector3(25.4, -0.62, 14.0), radius: 2.8,
      action: () => {
        this.ctx.player.enterFishing(new THREE.Vector3(25.6, -0.62, 14.0), Math.PI / 2);
        this.ctx.fishing.start();
      },
    });

    this.points.push({ id: 'vending', label: '使用街头自动售货机', pos: town.landmarks.vending, radius: 2.4, action: () => this._openVendingDialogue() });
    this.points.push({ id: 'shrine_bell', label: '摇铃参拜 · 抽御神签', pos: shrine.landmarks.shrineOffering, radius: 2.8, action: () => this._openShrineDialogue() });
    this.points.push({ id: 'postbox', label: '查看红色邮筒', pos: town.landmarks.postbox, radius: 2.3, action: () => this._openPostboxDialogue() });
    this.points.push({ id: 'notice_board', label: '阅读町内掲示板', pos: town.landmarks.noticeBoard, radius: 2.6, action: () => this._openNoticeBoardDialogue() });
    this.points.push({ id: 'timetable', label: '查看樱花站电车时刻表', pos: railway.landmarks.stationTimetable, radius: 2.5, action: () => this._openTimetableDialogue() });
    this.points.push({ id: 'home_futon', label: '在暖和的被褥里休息到明早', pos: town.landmarks.futon, radius: 2.4, action: () => this._openSleepDialogue() });
  }

  findNearest(playerPos) {
    let best = null;
    let bestDist = Infinity;

    for (const npc of this.ctx.npcSystem.npcs) {
      const d = playerPos.distanceTo(npc.position);
      if (d < 2.65 && d < bestDist) {
        bestDist = d;
        best = {
          id: `npc_${npc.id}`,
          label: npc.isCat ? `抚摸${npc.name}` : `和${npc.name}聊聊天`,
          action: () => this._openNpcDialogue(npc),
        };
      }
    }
    for (const p of this.points) {
      const d = playerPos.distanceTo(p.pos);
      if (d < p.radius && d < bestDist) {
        bestDist = d;
        best = p;
      }
    }
    this.nearest = best;
    return best;
  }

  triggerNearest() { if (this.nearest) this.nearest.action(); }

  closeDialogue() {
    if (this._activeNpc) {
      this._activeNpc.talkingToPlayer = false;
      this._activeNpc = null;
    }
    this.ctx.ui.hideDialogue();
  }

  _openNpcDialogue(npc) {
    this._activeNpc = npc;
    npc.talkingToPlayer = true;
    this.ctx.audio.playUiClick();

    if (npc.id === 'misaki') this._talkMisaki(npc);
    else if (npc.id === 'genzo') this._talkGenzo(npc);
    else if (npc.id === 'yuu') this._talkYuu(npc);
    else if (npc.id === 'haruto') this._talkHaruto(npc);
    else if (npc.id === 'mikan') this._talkMikan(npc);
  }

  _talkMisaki(npc) {
    const gs = this.ctx.gameState;
    const task = gs.tasks.anpan_delivery;
    const h = this.ctx.timeSystem.hour;
    const greeting = h < 11
      ? '早安呀！今天刚烤好的面包带着樱叶香气，闻着就让人心情舒畅。'
      : h < 18
        ? '欢迎光临「木漏れ日」！散步累了的话，来块刚出炉的面包吧。'
        : '傍晚的河风真舒服呢，忙完一天最喜欢在樱花树下发会儿呆了。';

    const choices = [];
    if (task.status === 'available') {
      choices.push({
        label: '「需要帮忙送刚出炉的红豆包吗？」', primary: true,
        onClick: () => {
          gs.startTask('anpan_delivery');
          gs.addItem('sakura_anpan', 1);
          this.ctx.audio.playSuccessChime();
          this.ctx.ui.showToast('🥖 收到「刚出炉的樱花红豆包」 · 新见闻已记入手账');
          this.ctx.ui.showDialogue(npc.name, npc.role, '呀，正好麻烦你啦！这炉「樱花红豆包」特别松软，街对面青叶商店的源造爷爷最爱趁热吃。帮我送一个过去吧？', [
            { label: '包在我身上！', primary: true, onClick: () => this.closeDialogue() },
          ]);
        },
      });
    } else if (task.status === 'active') {
      choices.push({
        label: '关于红豆包的去向',
        onClick: () => this.ctx.ui.showDialogue(npc.name, npc.role, '源造爷爷平时上午到傍晚都在街对面的「青叶商店」看店哦，傍晚有时会坐在店门前的木凳上乘凉。', [{ label: '好的，我这就去', onClick: () => this.closeDialogue() }]),
      });
    }
    choices.push({ label: '买点面包和咖啡', onClick: () => this._openShopMenu(npc, ['sakura_anpan', 'melonpan', 'matcha_latte']) });
    choices.push({ label: '先逛逛再聊', onClick: () => this.closeDialogue() });
    this.ctx.ui.showDialogue(npc.name, npc.role, greeting, choices);
  }

  _talkGenzo(npc) {
    const gs = this.ctx.gameState;
    const task = gs.tasks.anpan_delivery;
    const choices = [];

    if (task.status === 'active' && gs.hasItem('sakura_anpan')) {
      choices.push({
        label: '把热乎乎的「樱花红豆包」递给爷爷', primary: true,
        onClick: () => {
          gs.removeItem('sakura_anpan', 1);
          gs.completeTask('anpan_delivery');
          gs.addYen(320);
          gs.addItem('ramune', 1);
          this.ctx.audio.playSuccessChime();
          this.ctx.ui.showToast('🎉 完成见闻「趁热送去的樱花红豆包」！获得 ¥320 与弹珠汽水');
          this.ctx.ui.showDialogue(npc.name, npc.role, '哦吼！还热乎着呢！美咲这丫头手艺真是越来越好了，香气跟三十年前的老面包房一模一样。\n谢谢你跑这一趟，这瓶冰镇弹珠汽水和一点零花钱拿去路上喝吧！', [
            { label: '谢谢源造爷爷！', primary: true, onClick: () => this.closeDialogue() },
          ]);
        },
      });
    }

    const fishIds = ['ayu_fish', 'yamame_fish', 'river_crab', 'koi_fish'];
    const sellable = fishIds.filter((id) => gs.hasItem(id));
    if (sellable.length > 0) {
      choices.push({
        label: '把钓到的樱川渔获寄售给商店',
        onClick: () => {
          let total = 0;
          for (const id of sellable) {
            const qty = gs.inventory[id] || 0;
            total += qty * (ITEMS[id].sellPrice || 120);
            gs.removeItem(id, qty);
          }
          gs.addYen(total);
          this.ctx.audio.playSuccessChime();
          this.ctx.ui.showToast(`💰 源造爷爷收下了新鲜河鲜，获得 ¥${total}`);
          this.ctx.ui.showDialogue(npc.name, npc.role, `哟，真新鲜的樱川鱼货！镇上好几户人家晚上正好想煮鱼汤呢，这 ¥${total} 你收好。`, [{ label: '多谢照顾生意！', onClick: () => this.closeDialogue() }]);
        },
      });
    }

    choices.push({ label: '逛逛杂货与明信片', onClick: () => this._openShopMenu(npc, ['postcard', 'ramune', 'peach_water']) });
    choices.push({ label: '告辞', onClick: () => this.closeDialogue() });

    const text = this.ctx.timeSystem.hour < 8.5
      ? '早上好呀，年轻人！一大早去樱森神社走走，身子骨都舒坦多了。'
      : '欢迎欢迎！青叶商店里弹珠汽水、樱花明信片什么都有。要是去河边钓鱼了，也可以拿来我这儿换零花钱。';
    this.ctx.ui.showDialogue(npc.name, npc.role, text, choices);
  }

  _talkYuu(npc) {
    const gs = this.ctx.gameState;
    const task = gs.tasks.lost_bell;
    const choices = [];

    if (task.status === 'active' && gs.hasItem('brass_bell')) {
      choices.push({
        label: '把钓上来的「电车铜铃」还给小悠', primary: true,
        onClick: () => {
          gs.removeItem('brass_bell', 1);
          gs.completeTask('lost_bell');
          gs.addYen(280);
          this.ctx.audio.playSuccessChime();
          this.ctx.ui.showToast('🎉 完成见闻「遗落在樱川边的电车铜铃」！获得 ¥280');
          this.ctx.ui.showDialogue(npc.name, npc.role, '哇！！真的是我的小电车铜铃！居然真的在樱川河底找到了！\n听，摇起来声音跟道口一模一样！太感谢了，这是我攒的零花钱，一定要收下！', [
            { label: '以后看电车要拿稳哦', primary: true, onClick: () => this.closeDialogue() },
          ]);
        },
      });
    } else if (task.status === 'available') {
      choices.push({
        label: '「你在找什么东西吗？」', primary: true,
        onClick: () => {
          gs.startTask('lost_bell');
          this.ctx.ui.showToast('📝 新见闻已记入手账：遗落在樱川边的电车铜铃');
          this.ctx.ui.showDialogue(npc.name, npc.role, '呜…刚才听见樱花电车过铁桥的声音太兴奋，我不小心把最喜欢的「电车铜铃」掉进樱川里了…\n听说顺着水流漂到东边「钓鱼木栈道」那儿去了，如果你去钓鱼的时候捞到它，能帮我带回来吗？', [
            { label: '没问题，我去木栈道试试！', primary: true, onClick: () => this.closeDialogue() },
          ]);
        },
      });
    }

    choices.push({
      label: '聊聊樱花电车',
      onClick: () => {
        const rs = this.ctx.railway.getStatus();
        const trainInfo = rs.state === 'IDLE'
          ? `下一趟电车大概 ${rs.nextArrivalSec} 秒后就会从山洞里钻出来哦！道口会发出「叮当叮当」的声音！`
          : '快看快看！电车正在小镇里运行呢！绿白涂装的两节车厢最帅了！';
        this.ctx.ui.showDialogue(npc.name, npc.role, trainInfo, [{ label: '一起听电车声吧', onClick: () => this.closeDialogue() }]);
      },
    });
    choices.push({ label: '待会儿见', onClick: () => this.closeDialogue() });

    const greet = task.status === 'done'
      ? '嘿嘿，我的电车铜铃现在牢牢系在书包上啦！今天电车也在准点运行哦！'
      : '每次听见「叮当叮当」的道口铃声，我就忍不住想冲过去看两节绿白电车开过红铁桥！';
    this.ctx.ui.showDialogue(npc.name, npc.role, greet, choices);
  }

  _talkHaruto(npc) {
    const gs = this.ctx.gameState;
    const task = gs.tasks.train_photo;
    const choices = [];

    if (task.status !== 'done' && gs.hasTrainPhoto()) {
      choices.push({
        label: '把刚拍下的「樱花电车照片」给晴人看', primary: true,
        onClick: () => {
          gs.completeTask('train_photo');
          gs.addYen(350);
          this.ctx.audio.playSuccessChime();
          this.ctx.ui.showToast('🎉 完成见闻「樱花电车经过的瞬间」！获得 ¥350');
          this.ctx.ui.showDialogue(npc.name, npc.role, '太棒了！光线、山谷和驶过樱花林的电车构图都恰到好处，像动画电影的一帧一样。\n谢谢你和我分享这张胶片，这一点冲洗费和谢礼请收下！', [
            { label: '能拍到真是太好了', primary: true, onClick: () => this.closeDialogue() },
          ]);
        },
      });
    } else if (task.status === 'available') {
      choices.push({
        label: '「在拍什么题材的照片？」', primary: true,
        onClick: () => {
          gs.startTask('train_photo');
          this.ctx.ui.showToast('📸 新见闻已记入手账：樱花电车经过的瞬间');
          this.ctx.ui.showDialogue(npc.name, npc.role, '我想收集一组「樱花电车穿过山谷」的胶片照，但一个人分身乏术。\n按 C 键就能打开随身胶片机，等电车进站或经过道口时按下快门，拍到了拿给我看看好吗？', [
            { label: '好呀，我留意电车时间！', primary: true, onClick: () => this.closeDialogue() },
          ]);
        },
      });
    }

    choices.push({ label: '祝你采风顺利', onClick: () => this.closeDialogue() });
    const text = task.status === 'done'
      ? '这座山谷小镇无论清晨、午后还是黄昏，光线都温柔得不可思议。多按 C 键留住喜欢的瞬间吧。'
      : '你好呀，我也刚来樱花小镇住下不久。站台、红桥和神社的视角都很适合拍照呢。';
    this.ctx.ui.showDialogue(npc.name, npc.role, text, choices);
  }

  _talkMikan(npc) {
    const gs = this.ctx.gameState;
    const task = gs.tasks.feed_cat;
    this.ctx.audio.playCatMeow();

    const choices = [
      {
        label: '轻轻挠挠阿橘的下巴',
        onClick: () => {
          this.ctx.audio.playCatMeow();
          if (task.status === 'available') {
            gs.startTask('feed_cat');
            this.ctx.ui.showToast('🐾 新见闻：阿橘似乎很想吃樱川里的新鲜小鱼');
          }
          this.ctx.ui.showDialogue(npc.name, npc.role, '喵呜～（阿橘眯起眼睛发出满足的呼噜声，闻了闻你的衣角，好像很期待樱川河里的新鲜小鱼呢。）', [{ label: '好乖好乖', onClick: () => this.closeDialogue() }]);
        },
      },
    ];

    if (gs.hasAnyFish()) {
      choices.unshift({
        label: '把一条新鲜河鱼分享给阿橘', primary: true,
        onClick: () => {
          gs.consumeOneFish();
          this.ctx.audio.playCatMeow();
          if (task.status !== 'done') {
            gs.completeTask('feed_cat');
            gs.addItem('clover_charm', 1);
            this.ctx.audio.playSuccessChime();
            this.ctx.ui.showToast('🎉 完成见闻「给阿橘的新鲜小鱼」！获得「四叶草护身符」');
            this.ctx.ui.showDialogue(npc.name, npc.role, '喵呜！！（阿橘开心地大快朵颐，吃完后用毛茸茸的脑袋蹭了蹭你的裤脚，还用爪子推来一枚「四叶草护身符」！）', [{ label: '谢谢你，阿橘！', primary: true, onClick: () => this.closeDialogue() }]);
          } else {
            this.ctx.ui.showDialogue(npc.name, npc.role, '喵～（阿橘吃得心满意足，在阳光下打了个滚！）', [{ label: '慢慢晒太阳吧', onClick: () => this.closeDialogue() }]);
          }
        },
      });
    }

    choices.push({ label: '挥手告别', onClick: () => this.closeDialogue() });
    this.ctx.ui.showDialogue(npc.name, npc.role, '喵～？（圆滚滚的橘猫歪着头望着你，脖子上的金色小铃铛轻响了一下。）', choices);
  }

  _openShopMenu(npc, itemIds) {
    const gs = this.ctx.gameState;
    const choices = itemIds.map((id) => {
      const item = ITEMS[id];
      return {
        label: `${item.name}（¥${item.price}）`,
        disabled: gs.yen < item.price,
        onClick: () => {
          if (gs.spendYen(item.price)) {
            gs.addItem(id, 1);
            this.ctx.audio.playSuccessChime();
            this.ctx.ui.showToast(`🛍 购买了「${item.name}」`);
            this._openShopMenu(npc, itemIds);
          }
        },
      };
    });
    choices.push({ label: '谢谢，暂时这些就好', onClick: () => this.closeDialogue() });
    this.ctx.ui.showDialogue(npc.name, `${npc.role} · 当前持有 ¥${gs.yen}`, '看看今天想带点什么回去吧？（买到的饮品和面包可以在手账→随身行囊里享用哦）', choices);
  }

  _openVendingDialogue() {
    const gs = this.ctx.gameState;
    this.ctx.audio.playUiClick();
    const choices = ['canned_coffee', 'peach_water'].map((id) => {
      const item = ITEMS[id];
      return {
        label: `投币购买 ${item.name}（¥${item.price}）`,
        disabled: gs.yen < item.price,
        primary: id === 'peach_water',
        onClick: () => {
          if (gs.spendYen(item.price)) {
            this.ctx.audio.playVendingClunk();
            this.ctx.player.grantSpeedBoost(40);
            this.ctx.ui.showToast(`🥤 「哐当！」喝下${item.name}，脚步变得轻快了！`);
            this.closeDialogue();
          }
        },
      };
    });
    choices.push({ label: '先不买了', onClick: () => this.closeDialogue() });
    this.ctx.ui.showDialogue('自动售货机', `商店街街角 · 当前持有 ¥${gs.yen}`, '霓虹微亮的红白售货机，摆着冰镇白桃气泡水与微温的罐装咖啡。买一罐喝下还能短暂提升散步速度！', choices);
  }

  _openShrineDialogue() {
    const gs = this.ctx.gameState;
    this.ctx.audio.playUiClick();
    const choices = [
      {
        label: '投入香油钱 ¥50 · 摇铃抽御神签', primary: true, disabled: gs.yen < 50,
        onClick: () => {
          gs.spendYen(50);
          this.ctx.shrine.ringBell();
          this.ctx.audio.playShrineBell();
          const fortune = OMIKUJI_LIST[Math.floor(Math.random() * OMIKUJI_LIST.length)];
          gs.latestOmikuji = fortune;
          gs.addItem('omikuji', 1);
          if (gs.tasks.shrine_wish.status !== 'done') {
            gs.completeTask('shrine_wish');
            this.ctx.ui.showToast('⛩ 完成见闻「樱森神社的祈愿与来信」');
          }
          this.ctx.ui.showDialogue('樱森神社 · 御神签', `签运：【${fortune.rank}】`, `清脆的铜铃在山谷间回荡。\n你展开折叠的签纸，上面工整地写着：\n「${fortune.text}」`, [{ label: '收进手账，心怀感谢', primary: true, onClick: () => this.closeDialogue() }]);
        },
      },
      {
        label: '只是轻轻摇铃祈愿',
        onClick: () => {
          this.ctx.shrine.ringBell();
          this.ctx.audio.playShrineBell();
          this.ctx.ui.showToast('🔔 神社铜铃悠悠响起，樱花瓣随风落下…');
          this.closeDialogue();
        },
      },
      { label: '离开', onClick: () => this.closeDialogue() },
    ];
    this.ctx.ui.showDialogue('樱森神社 · 拜殿', '千年枝垂樱守护的山丘神社', '朱红鸟居后是一片安静的石庭，微风吹过枝垂樱，花瓣飘落在赛钱箱旁。', choices);
  }

  _openPostboxDialogue() {
    const gs = this.ctx.gameState;
    this.ctx.audio.playUiClick();
    const choices = [];
    if (gs.hasItem('postcard')) {
      choices.push({
        label: '寄出一张「樱花小镇明信片」', primary: true,
        onClick: () => {
          gs.removeItem('postcard', 1);
          gs.postedPostcards += 1;
          this.ctx.audio.playSuccessChime();
          if (gs.tasks.shrine_wish.status !== 'done') gs.completeTask('shrine_wish');
          this.ctx.ui.showToast('📮 明信片已投入红邮筒，把樱花小镇的春风寄向远方！');
          this.closeDialogue();
        },
      });
    }
    choices.push({ label: '离开', onClick: () => this.closeDialogue() });
    const text = gs.hasItem('postcard')
      ? '复古的红色圆柱邮筒，写着每日下午四点取信。要现在寄出从青叶商店买的樱花明信片吗？'
      : '复古的红色圆柱邮筒。如果在「青叶商店」买了明信片，可以来这里寄给远方的朋友哦。';
    this.ctx.ui.showDialogue('樱花邮局 · 红色邮筒', '〒 町内便', text, choices);
  }

  _openNoticeBoardDialogue() {
    this.ctx.audio.playUiClick();
    this.ctx.gameState.startTask('shrine_wish');
    this.ctx.ui.showDialogue(
      '町内掲示板', '樱花小镇春季公告',
      '【樱花季便民贴士】\n• 「木漏れ日」面包店早上出炉樱花红豆包，美咲好像正找人帮忙捎给源造爷爷。\n• 樱川东侧木栈道已开放垂钓，听说小学生小悠在河边掉了心爱的铜铃。\n• 樱花电铁约每分钟有一班列车经停「樱花站」，过道口请留意红灯与遮断杆。\n• 欢迎跨过樱川红桥前往「樱森神社」摇铃抽签，或在黄昏欣赏山谷落日与萤火虫！',
      [{ label: '记在心里了', primary: true, onClick: () => this.closeDialogue() }]
    );
  }

  _openTimetableDialogue() {
    this.ctx.audio.playUiClick();
    const rs = this.ctx.railway.getStatus();
    const dirLabel = rs.direction > 0 ? '开往 河原方向（东行 ▶）' : '开往 山口方向（西行 ◀）';
    const statusLine = rs.state === 'IDLE'
      ? `下一班电车：约 ${rs.nextArrivalSec} 秒后进站\n运行方向：${dirLabel}`
      : `当前列车状态：${rs.state === 'BOARDING' ? '正在樱花站停靠上下客' : '正在小镇区间运行中'}\n运行方向：${dirLabel}`;
    this.ctx.ui.showDialogue('樱花站 · 时刻表', '樱花电铁 · 单线往返', `${statusLine}\n\n提示：按 C 键开启相机模式，可在月台或道口拍下电车驶过樱花山谷的瞬间。`, [{ label: '知道了', primary: true, onClick: () => this.closeDialogue() }]);
  }

  _openSleepDialogue() {
    this.ctx.audio.playUiClick();
    this.ctx.ui.showDialogue(
      '樱花小筑 · 温暖被褥', `第 ${this.ctx.timeSystem.day} 天 · ${this.ctx.timeSystem.getFormattedTime()}`,
      '叠得整整齐齐的樱花粉棉被散发着阳光晒过的香气。要休息一晚，迎接下一个晴朗的清晨吗？',
      [
        { label: '盖上被子，睡到明天早上 07:30', primary: true, onClick: () => { this.closeDialogue(); this.ctx.sleepCallback(); } },
        { label: '再在小镇逛一会儿', onClick: () => this.closeDialogue() },
      ]
    );
  }
}
