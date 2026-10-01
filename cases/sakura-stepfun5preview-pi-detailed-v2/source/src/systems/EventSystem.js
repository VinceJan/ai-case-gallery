// 随机事件系统：少量让小镇"发生变化"的小事件
import { rand, chance, clamp } from '../core/Utils.js';

export class EventSystem {
  constructor(game) {
    this.game = game;
    this.timer = rand(70, 130);
    this.delayUntil = -1;     // 列车延误结束时刻（小时）
    this.festivalAnnounced = -1;
  }

  update(dt) {
    const g = this.game;
    this.timer -= dt;

    // 列车延误恢复
    if (g.flags.trainDelayed && g.time.hours >= this.delayUntil && g.time.hours < this.delayUntil + 12) {
      g.flags.trainDelayed = false;
      if (g.railway) g.railway.train.delayed = false;
      g.ui.toast('列车恢复了正常运行。');
    }

    // 庙会时段（傍晚）
    if (g.flags.festival) {
      const h = g.time.hours;
      if (h >= 19 && h < 21.5) {
        if (this.festivalAnnounced !== g.time.day) {
          this.festivalAnnounced = g.time.day;
          g.ui.toast('庙会开始了！神社的灯笼一盏盏亮了起来。');
          g.audio.shrineBell();
          g.npcs.gather(58 + rand(-2, 2), 62 + rand(-2, 2), ['suzuki', 'yuki', 'sato', 'hana', 'takada']);
        }
        g.world.setFestivalLanterns(true);
      } else {
        g.world.setFestivalLanterns(false);
      }
    }

    if (this.timer > 0) return;
    this.timer = rand(100, 200);
    this.roll();
  }

  roll() {
    const g = this.game;
    const h = g.time.hours;
    const options = [];

    // 早晨：便利店晚开
    if (h > 5.5 && h < 9 && !g.flags.lateOpen) options.push('lateOpen');
    // 白天：列车延误
    if (!g.flags.trainDelayed && g.met.nakamura) options.push('trainDelay');
    // 白天：猫不见了
    if (!g.flags.catMissing && !g.quests.isCompleted('cat') && h > 8 && h < 18) options.push('catMissing');
    // 风起花落
    if (!g.weather.raining) options.push('sakuraStorm');
    // 夜晚：废弃小屋的动静
    if ((h >= 20 || h < 4) && !g.flags.hutEvent) options.push('hut');

    if (!options.length) return;
    const ev = options[Math.floor(Math.random() * options.length)];

    switch (ev) {
      case 'lateOpen':
        g.flags.lateOpen = true;
        g.ui.toast('听说便利店今天开得特别晚……');
        break;
      case 'trainDelay':
        g.flags.trainDelayed = true;
        if (g.railway) g.railway.train.delayed = true;
        this.delayUntil = (g.time.hours + rand(1.5, 3)) % 24;
        g.ui.toast('车站广播：列车因故延误，敬请谅解。');
        if (g.met.nakamura) g.quests.start('train_delay');
        break;
      case 'catMissing':
        g.flags.catMissing = true;
        g.ui.toast('奶奶说，今天没看见那只猫来讨食。');
        g.quests.start('cat');
        break;
      case 'sakuraStorm':
        g.world.petalBurst();
        g.ui.toast('一阵风吹过，樱花花瓣纷纷扬扬。');
        break;
      case 'hut': {
        g.flags.hutEvent = true;
        const d = Math.hypot(g.player.pos.x + 113, g.player.pos.z - 16);
        if (d < 40) {
          g.ui.toast('废弃的小屋里传来什么声音……是猫吗？');
          g.audio.purr();
          g.npcs.summonCat(-108, 20);
        }
        break;
      }
    }
  }
}
