// 随机事件系统：丢钱包、流浪猫、夏日祭、暴雨、樱花吹雪、夜间集市
import { clamp, makeRng, pick, dist2d } from '../core/utils.js';

export class EventSystem {
  constructor(world) {
    this.w = world;
    this.rng = makeRng(Math.floor(Math.random() * 1e9));
    this.flags = world.flags;
    this.festivalDay = 5;          // 第5天傍晚举行祭典
    this.announceDay = 3;
    this.state = {
      wallet: null,     // {npcId, stage:'lost'|'return', x, z}
      cat: null,        // {stage:'appear'|'following'|'gifted'}
      stormCooldown: 0,
      petalCooldown: 0,
    };
  }

  toast(title, text, kind = 'event') { this.w.toast(title, text, kind); }

  update(dt, gameDt) {
    const w = this.w;
    const day = w.clock.day;
    const hour = w.clock.hour + w.clock.minute / 60;

    // —— 夏日祭流程 ——
    if (day === this.announceDay && !this.flags.festivalAnnounced) {
      this.flags.festivalAnnounced = true;
      this.toast('公告', '镇民公告：5日傍晚将举行樱花夏日祭，欢迎大家参加！');
    }
    if (day === this.festivalDay && !this.flags.festivalToday) {
      this.flags.festivalToday = true;
      this.toast('今天是祭典！', '樱花夏日祭将于傍晚在神社举行，不要错过。');
    }
    if (this.flags.festivalToday && hour >= 16 && !this.flags.festivalStalls) {
      this.flags.festivalStalls = true;
      w.setStalls(true);
      this.toast('祭典开张', '神社境内的摊位开始营业了。');
    }
    if (this.flags.festivalToday && hour >= 18 && !this.flags.festivalGather) {
      this.flags.festivalGather = true;
      for (const npc of w.npcs) {
        npc.override = { poiId: 'shrine_top', until: day * 1440 + 22 * 60, withPlayer: false };
        npc.path = null;
      }
      this.toast('祭典高峰', '镇民们聚集到神社，烟花即将开始。');
    }
    if (this.flags.festivalToday && hour >= 20 && !this.flags.festivalFireworks) {
      this.flags.festivalFireworks = true;
      w.setFireworks(true);
      this.toast('烟花大会', '咻——砰！樱花色的烟花在夜空中绽放。');
    }
    if (this.flags.festivalToday && hour >= 22 && !this.flags.festivalEnd) {
      this.flags.festivalEnd = true;
      w.setFireworks(false);
      w.setStalls(false);
      for (const npc of w.npcs) { npc.override = null; npc.path = null; }
    }

    // —— 丢钱包事件 ——
    if (!this.state.wallet && day >= 2 && !this.flags.walletDone && hour > 9 && hour < 15) {
      if (this.rng() < 0.02 * gameDt) this.startWalletQuest();
    }
    if (this.state.wallet) this.updateWallet();

    // —— 流浪猫 ——
    if (!this.state.cat && day >= 2 && !this.flags.catDone && hour > 6 && hour < 10) {
      if (this.rng() < 0.03 * gameDt) this.startCat();
    }
    if (this.state.cat) this.updateCat(gameDt);

    // —— 突发暴风雨 ——
    this.state.stormCooldown -= gameDt;
    if (day >= 2 && !this.flags.stormDone && this.state.stormCooldown <= 0 && hour > 8 && hour < 20) {
      if (this.rng() < 0.012 * gameDt) {
        this.flags.stormDone = true;
        this.state.stormCooldown = 1440;
        w.weather.force('storm', 90 + this.rng() * 60);
        this.toast('天气突变', '刚才还是晴天，突然乌云密布——暴雨来了！');
        w.showSubtitle('暴风雨来了！樱花被雨打落了不少。', 6);
      }
    }

    // —— 樱花吹雪 ——
    this.state.petalCooldown -= gameDt;
    if (day >= 2 && !this.flags.petalDone && this.state.petalCooldown <= 0 && hour > 8 && hour < 18) {
      if (this.rng() < 0.014 * gameDt) {
        this.flags.petalDone = true;
        this.state.petalCooldown = 1440;
        w.weather.force('petal', 150 + this.rng() * 90);
        this.toast('樱花吹雪', '风起了，满树樱花如雪般飘落——快去公园看看！');
        for (const npc of w.npcs) {
          if (['ken', 'taeko', 'tetsuo', 'inao'].includes(npc.id)) continue; // 看店的留下
          if (npc.state === 'sleep') continue;
          npc.override = {
            poiId: pick(this.rng, ['hanami', 'bench_park1', 'bench_park2', 'bench_park3']),
            until: w.clock.day * 1440 + w.clock.minutes + 180,
            withPlayer: false,
          };
          npc.path = null;
        }
      }
    }

    // —— 夜间集市 ——
    if (day >= 4 && !this.flags.marketDone && hour >= 19 && hour < 22) {
      this.flags.marketDone = true;
      w.setNightStalls(true);
      this.toast('夜间集市', '商店街今晚有夜间集市，去逛逛吧。');
      for (const npc of w.npcs) {
        if (npc.rng() < 0.4) {
          npc.override = { poiId: 'shotengai_mid', until: day * 1440 + 22 * 60, withPlayer: false };
          npc.path = null;
        }
      }
    }
    if (this.flags.marketDone && hour >= 22) w.setNightStalls(false);
  }

  // ---------- 丢钱包 ----------
  startWalletQuest() {
    const candidates = this.w.npcs.filter((n) => !this.flags['walletNpc_' + n.id]);
    if (!candidates.length) return;
    const npc = pick(this.rng, candidates);
    const spots = [
      { x: -26, z: 30, name: '公园长椅旁' }, { x: 6, z: -42, name: '商店街入口' },
      { x: -30, z: -89, name: '站前广场' }, { x: 14, z: -117, name: '河畔步道' },
      { x: 2, z: 78, name: '神社石阶下' }, { x: -56, z: 48, name: '湖畔长椅' },
    ];
    const spot = pick(this.rng, spots);
    this.state.wallet = { npcId: npc.id, stage: 'lost', x: spot.x, z: spot.z, name: spot.name };
    this.flags['walletNpc_' + npc.id] = true;
    this.w.spawnPickup('wallet', spot.x, spot.z, 'wallet');
    this.w.marker(spot.x, spot.z, '闪亮的东西', 'wallet_spot');
    this.toast('有人丢了东西', '好像有人在' + spot.name + '掉了东西……');
  }

  updateWallet() {
    const st = this.state.wallet;
    if (!st) return;
    const w = this.w;
    if (st.stage === 'lost') {
      const pk = w.pickups.find((p) => p.id === 'wallet');
      if (!pk) {
        // 已被玩家捡起
        st.stage = 'return';
        w.clearMarker('wallet_spot');
        const npc = w.npcs.find((n) => n.id === st.npcId);
        if (npc) {
          w.marker(npc.pos.x, npc.pos.z, npc.name + '（归还钱包）', 'wallet_npc');
          this.toast('该还给失主', '钱包里有一张名片：' + npc.name + '。去找到ta吧。');
        }
      }
    } else if (st.stage === 'return') {
      // 标记跟随失主移动
      const npc = w.npcs.find((n) => n.id === st.npcId);
      if (npc) w.marker(npc.pos.x, npc.pos.z, npc.name + '（归还钱包）', 'wallet_npc');
    }
  }

  completeWallet() {
    const st = this.state.wallet;
    if (!st || st.stage !== 'return') return false;
    const npc = this.w.npcs.find((n) => n.id === st.npcId);
    this.state.wallet = null;
    this.flags.walletDone = true;
    this.w.clearMarker('wallet_npc');
    if (npc) {
      npc.affinity = clamp(npc.affinity + 18, 0, 100);
      npc.memory.helped = true;
      this.w.addMoney(800);
      this.w.giveItem('charm');
      this.toast('任务完成', npc.name + '收下了钱包，赠给你谢礼和一枚御守。', 'friend');
      this.w.logEvent('归还了' + npc.name + '的钱包');
    }
    return true;
  }

  // 喂猫（玩家交互与事件系统共用）；返回是否成功喂食
  tryFeedCat() {
    const st = this.state.cat;
    if (!st || st.stage !== 'appear') return false;
    const w = this.w;
    const player = w.player;
    // 猫粮优先，其次食物/饮品（相机等工具不算）
    const catfood = player.inventory.find((it) => it.id === 'catfood');
    if (catfood) {
      player.removeItem('catfood', 1);
      st.stage = 'following';
      w.setCatFollow(true);
      w.clearMarker('cat');
      this.toast('小猫跟着你了', '流浪猫吃饱了，决定跟着你走一段路。');
      return true;
    }
    const food = player.inventory.find((it) => ['food', 'drink'].includes(w.itemKind(it.id)));
    if (food) {
      player.removeItem(food.id, 1);
      st.stage = 'following';
      w.setCatFollow(true);
      w.clearMarker('cat');
      this.toast('小猫跟着你了', '流浪猫吃掉了你的' + w.itemName(food.id) + '，决定跟着你。');
      return true;
    }
    w.showSubtitle('喵～（流浪猫看着你，好像饿了。去便利店买点猫粮吧）', 3);
    return false;
  }

  // ---------- 流浪猫 ----------
  startCat() {
    this.state.cat = { stage: 'appear', x: 6, z: 92 };
    this.w.setCatVisible(true);
    this.w.marker(6, 92, '流浪猫', 'cat');
    this.toast('小猫出现了', '神社附近出现了一只流浪猫，它看起来饿了。');
  }

  updateCat(gameDt) {
    const st = this.state.cat;
    const w = this.w;
    const player = w.player;
    if (st.stage === 'appear') {
      const d = dist2d(st.x, st.z, player.pos.x, player.pos.z);
      if (d < 60) w.marker(st.x, st.z, '流浪猫', 'cat');
      if (d < 2.2) this.tryFeedCat();
    } else if (st.stage === 'following') {
      // 跟随直到第二天早上
      const nextDay = w.clock.day > st.followDay;
      if (st.followDay === undefined) st.followDay = w.clock.day;
      if (nextDay || w.clock.hour < 6) {
        st.stage = 'gifted';
        w.setCatFollow(false);
        w.setCatVisible(false);
        w.spawnPickup('catgift', -84, 45, pick(this.rng, ['figurine', 'souvenir_craft', 'charm', 'postcard']));
        this.toast('猫咪的礼物', '出门时发现门口放着一个小小的礼物……是猫放的？');
        this.flags.catDone = true;
        this.state.cat = null;
      }
    }
  }
}
