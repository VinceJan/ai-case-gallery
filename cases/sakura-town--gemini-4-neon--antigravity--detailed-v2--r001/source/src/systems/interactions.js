import * as THREE from 'three';
import { ITEMS, RESIDENT_PROFILES } from './gameState.js';

/**
 * Manages high-quality, intuitive town interactions:
 * - Automatic & manual doors with chime
 * - 3 Vending machines that physically dispense a 3D drink can into the tray
 * - Shop counters (Sakura Mart & Café Komorebi with visible coffee cup)
 * - Home lamp toggle, Futon rest & save, Mailbox letter
 * - Station parcel, Hidden hillside shed keepsake photo, Shrine offertory bell & Omikuji
 * - Benches & Café chairs (sit down!)
 * - Context-aware dialogue with all 5 core residents
 */
export class InteractionSystem {
  constructor({ player, worldRefs, npcManager, gameState, atmosphere, railway, audio, ui }) {
    this.player = player;
    this.worldRefs = worldRefs;
    this.npcManager = npcManager;
    this.gameState = gameState;
    this.atmosphere = atmosphere;
    this.railway = railway;
    this.audio = audio;
    this.ui = ui;

    this.currentTarget = null;
    this.shrineBellSwing = 0;

    // Sync world meshes with loaded save state
    this._syncWorldVisuals();
  }

  _syncWorldVisuals() {
    if (this.worldRefs.stationParcelMesh) {
      this.worldRefs.stationParcelMesh.visible = !this.gameState.flags.pickedParcel;
    }
    if (this.worldRefs.lostPhotoMesh) {
      this.worldRefs.lostPhotoMesh.visible = !this.gameState.flags.pickedOldPhoto;
    }
    if (this.worldRefs.mailboxFlag) {
      this.worldRefs.mailboxFlag.rotation.z = this.gameState.flags.readWelcomeLetter ? -1.2 : 0;
    }
    if (this.worldRefs.cafeCoffeeCup) {
      this.worldRefs.cafeCoffeeCup.visible = !!this.gameState.flags.cafeCoffeeServed;
    }
    this.atmosphere.homeLampOn = this.gameState.flags.homeLampOn;
    this.atmosphere.festivalUnlocked = !!this.gameState.flags.festivalUnlocked;
  }

  /**
   * Builds the live list of nearby interactables and finds the closest one within range.
   */
  update(dt) {
    const pPos = this.player.position;

    // 1. Update animated doors (Sakura Mart auto-opens for player OR any NPC + plays chime!)
    const doors = this.worldRefs.doors;
    if (doors.mart) {
      let someoneNear = pPos.distanceTo(doors.mart.doorPos) < 3.1;
      if (!someoneNear) {
        for (const npc of this.npcManager.npcs) {
          if (npc.pos.distanceTo(doors.mart.doorPos) < 2.6) { someoneNear = true; break; }
        }
      }
      if (someoneNear && !doors.mart.wasOpen) {
        if (pPos.distanceTo(doors.mart.doorPos) < 12) this.audio.playMartChime();
      }
      doors.mart.wasOpen = someoneNear;
      doors.mart.targetOpen = someoneNear ? 1 : 0;
      doors.mart.update(dt);
    }
    if (doors.cafe) {
      const nearCafe = pPos.distanceTo(doors.cafe.doorPos) < 2.6 ||
        this.npcManager.npcs.some((n) => n.pos.distanceTo(doors.cafe.doorPos) < 2.2);
      doors.cafe.targetOpen = nearCafe ? 1 : 0;
      doors.cafe.update(dt);
    }
    if (doors.home) {
      const nearHome = pPos.distanceTo(doors.home.doorPos) < 2.5;
      doors.home.targetOpen = nearHome ? 1 : 0;
      doors.home.update(dt);
    }

    // Shrine bell rope gentle damped swing after praying
    if (this.shrineBellSwing > 0.01 && this.worldRefs.shrineBellGroup) {
      this.shrineBellSwing *= Math.pow(0.18, dt);
      this.worldRefs.shrineBellGroup.rotation.z = Math.sin(performance.now() * 0.018) * this.shrineBellSwing;
    }

    // Location discovery unlocks
    if (!this.gameState.unlockedLocations.shrine && pPos.x > 10 && pPos.z < -33) {
      this.gameState.unlockedLocations.shrine = true;
      this.gameState.save(this.atmosphere.timeMinutes);
      this.ui.toast('⛩️ 发现地点：桜神社展望台 — 可以俯瞰整座樱花小镇！');
    }
    if (!this.gameState.unlockedLocations.hiddenShed && pPos.x > 31 && pPos.z < -20 && pPos.z > -30) {
      this.gameState.unlockedLocations.hiddenShed = true;
      this.gameState.save(this.atmosphere.timeMinutes);
      this.ui.toast('🌲 发现隐藏地点：山脚林道的旧木屋');
    }

    // Skip searching for prompts while UI/dialogue is open or player is sitting
    if (this.ui.isOverlayOpen() || this.player.sitting) {
      this.currentTarget = null;
      this.ui.setInteractPrompt(null);
      return;
    }

    const candidates = this._gatherInteractables();
    let best = null;
    let bestDist = Infinity;
    for (const c of candidates) {
      const d = Math.hypot(pPos.x - c.x, pPos.z - c.z);
      const dy = Math.abs(pPos.y - (c.y ?? 0));
      if (d <= (c.range ?? 2.3) && dy < 2.2 && d < bestDist) {
        best = c;
        bestDist = d;
      }
    }
    this.currentTarget = best;
    this.ui.setInteractPrompt(best ? best.label : null);
  }

  triggerCurrent() {
    if (this.player.sitting) {
      this.player.standUp();
      this.ui.setSitting(false);
      return;
    }
    if (!this.currentTarget) return;
    this.audio.playUiBlip(true);
    this.currentTarget.action();
    this._syncWorldVisuals();
    this.ui.refreshHud();
  }

  _gatherInteractables() {
    const list = [];

    // 1. Core Residents
    for (const npc of this.npcManager.npcs) {
      if (!npc.isCore) continue;
      list.push({
        x: npc.pos.x, y: npc.pos.y, z: npc.pos.z, range: 2.6,
        label: npc.isCat ? `抚摸 / 互动：${npc.name}` : `交谈：${npc.name}`,
        action: () => this._talkToResident(npc),
      });
    }

    // 2. Vending Machines (two-stage physical dispense & pickup!)
    for (const vm of this.worldRefs.vendingMachines) {
      list.push({
        x: vm.pos.x, y: 0, z: vm.pos.z, range: 2.2,
        label: vm.hasDispensedCan ? '取出取货口的饮料罐' : '自动售货机 · 购买饮料 (¥120)',
        action: () => this._useVendingMachine(vm),
      });
    }

    // 3. Home Mailbox
    list.push({
      x: -23.2, y: 0, z: -23.2, range: 2.9,
      label: this.gameState.flags.readWelcomeLetter ? '查看桜荘信箱' : '阅读信箱里的欢迎信 ✉️',
      action: () => this._interactMailbox(),
    });

    // 4. Home Interior: Lamp Switch & Futon Rest
    list.push({
      x: -23.2, y: 0, z: -29.3, range: 2.2,
      label: this.atmosphere.homeLampOn ? '关闭和纸落地灯' : '点亮和纸落地灯',
      action: () => {
        this.atmosphere.homeLampOn = !this.atmosphere.homeLampOn;
        this.gameState.flags.homeLampOn = this.atmosphere.homeLampOn;
        this.gameState.save(this.atmosphere.timeMinutes);
        this.ui.toast(this.atmosphere.homeLampOn ? '💡 房间里的和纸灯亮起了暖光。' : '房间灯光已关闭。');
      },
    });
    list.push({
      x: -28.2, y: 0, z: -28.2, range: 2.3,
      label: '在被褥休息至清晨 07:30 并存档',
      action: () => {
        this.atmosphere.timeMinutes = 7 * 60 + 30;
        this.atmosphere.isRaining = false;
        this.gameState.save(this.atmosphere.timeMinutes);
        this.ui.toast('🌙 睡了个好觉……清晨的樱花微风吹进窗来（已自动存档）。');
      },
    });

    // 5. Sakura Mart Checkout Counter
    list.push({
      x: -16.8, y: 0, z: 11.4, range: 2.4,
      label: '桜マート · 选购商品',
      action: () => this._openMartShop(),
    });

    // 6. Café Komorebi Counter (only when open!)
    if (this.atmosphere.isCafeOpen()) {
      list.push({
        x: 16.4, y: 0, z: 11.4, range: 2.5,
        label: '喫茶 こもれび · 点单手冲咖啡 (¥250)',
        action: () => this._orderCafeCoffee(),
      });
    } else {
      list.push({
        x: 15, y: 0, z: 6.3, range: 2.2,
        label: '查看喫茶 こもれび门牌',
        action: () => this.ui.toast('☕ 木牌翻到了「本日打烊」，营业时间为 08:00 – 21:00。'),
      });
    }

    // 7. Station Parcel Shelf (Kenji's coffee beans!)
    if (!this.gameState.flags.pickedParcel) {
      list.push({
        x: -14.6, y: 0, z: -19.8, range: 2.2,
        label: '拿取寄存架上的「咖啡豆包裹」📦',
        action: () => {
          this.gameState.flags.pickedParcel = true;
          this.gameState.addItem('coffee_parcel', 1);
          if (this.gameState.quests.coffee_parcel === 'locked') {
            this.gameState.setQuest('coffee_parcel', 'active');
          }
          this.ui.toast('📦 拿到了寄给喫茶こもれび的「咖啡豆包裹」！');
        },
      });
    }

    // 8. Hidden East Hillside Shed: Haru's Lost Keepsake Photo
    if (!this.gameState.flags.pickedOldPhoto) {
      list.push({
        x: 34.7, y: 0, z: -23.6, range: 2.4,
        label: '拾起木箱上泛黄的「旧樱花照片」🖼️',
        action: () => {
          this.gameState.flags.pickedOldPhoto = true;
          this.gameState.addItem('old_photo', 1);
          if (this.gameState.quests.haru_photo === 'locked') {
            this.gameState.setQuest('haru_photo', 'active');
          }
          this.ui.toast('🖼️ 拾起了「旧樱花照片」！背面写着「铃木ハル 留念」。');
        },
      });
    }

    // 9. Shrine Offertory Box & Bell
    list.push({
      x: 16, y: 3.0, z: -39.6, range: 2.6,
      label: '桜神社 · 投币参拜摇铃 (¥5)',
      action: () => this._prayAtShrine(),
    });

    // 10. Community Notice Board & Red Postbox
    list.push({
      x: -5.4, y: 0, z: -2.4, range: 2.5,
      label: '查看「桜町 掲示板」',
      action: () => this._openNoticeBoard(),
    });
    list.push({
      x: -26.5, y: 0, z: 7.0, range: 2.2,
      label: '桜郵便局 · 红色邮筒',
      action: () => this.ui.toast('📮 邮筒上贴着班次表：每日上午10点与下午4点收件。'),
    });

    // 11. Sittable Benches & Café Chairs
    const seats = [
      { x: -6.8, z: 22.2, yaw: 0, label: '坐在河畔西侧长椅休息' },
      { x: 7.5, z: 22.2, yaw: 0, label: '坐在河畔东侧长椅看樱川' },
      { x: -15.5, z: -16.5, yaw: 0, label: '坐在桜駅月台长椅等列车' },
      { x: 11.8, z: -34.2, yaw: 0, label: '坐在神社展望台长椅俯瞰小镇' },
      { x: 11.35, z: 10.1, yaw: Math.PI / 2, label: '坐在喫茶 こもれび靠窗木椅' },
    ];
    for (const s of seats) {
      const y = this.player.collision.getGroundHeight(s.x, s.z);
      list.push({
        x: s.x, y, z: s.z, range: 1.9,
        label: s.label,
        action: () => {
          this.player.sitDown(new THREE.Vector3(s.x, y, s.z), s.yaw);
          this.ui.setSitting(true);
        },
      });
    }

    return list;
  }

  _useVendingMachine(vm) {
    if (vm.hasDispensedCan) {
      vm.hasDispensedCan = false;
      vm.canMesh.visible = false;
      const item = ITEMS[vm.dispensedItemId];
      this.gameState.addItem(vm.dispensedItemId, 1);
      this.ui.toast(`${item.icon} 取出了「${item.name}」！`);
      return;
    }

    this.ui.openDialogue({
      speaker: '自动售货机',
      role: 'つめたい · あたたかい',
      hearts: 0,
      text: '机器微微发出制冷与保温的嗡嗡声。要投币购买哪一款饮料？（每罐 ¥120）',
      choices: [
        {
          label: '☕ 罐装热咖啡 (¥120)',
          onSelect: () => this._dispenseFromVM(vm, 'canned_coffee'),
        },
        {
          label: '🍵 樱花绿茶 (¥120)',
          onSelect: () => this._dispenseFromVM(vm, 'green_tea'),
        },
        { label: '先不买了', onSelect: () => {} },
      ],
    });
  }

  _dispenseFromVM(vm, itemId) {
    if (this.gameState.yen < 120) {
      this.ui.toast('零钱不够了（需要 ¥120）。');
      return;
    }
    this.gameState.yen -= 120;
    this.gameState.save(this.atmosphere.timeMinutes);
    this.audio.playVendingClunk();
    vm.hasDispensedCan = true;
    vm.dispensedItemId = itemId;
    vm.canMesh.visible = true;
    vm.canMesh.material.color.setHex(itemId === 'canned_coffee' ? 0xc47b3e : 0x5fb573);
    this.ui.toast('哐当！饮料罐掉进了下方取货口，再按 E 即可取出。');
  }

  _interactMailbox() {
    this.gameState.flags.readWelcomeLetter = true;
    this.gameState.save(this.atmosphere.timeMinutes);
    this.ui.openNotice(
      '✉️ 桜荘信箱 · 欢迎来到樱花小镇',
      `<div class="notice-section">
        <h4>来自「喫茶 こもれび」佐藤健二的便签</h4>
        <p>新邻居你好！欢迎搬进樱花小镇的桜荘。</p>
        <p>沿门前小路向东过铁路道口，就是商店街了。有空的话欢迎推开街东侧「喫茶 こもれび」的木门，请你喝一杯刚磨好的春季手冲咖啡！</p>
        <p style="margin-top:8px;color:#c95f7d;">—— 佐藤 健二（营业时间 08:00 – 21:00）</p>
      </div>`
    );
  }

  _openMartShop() {
    this.ui.openDialogue({
      speaker: '桜マート 收银台',
      role: '24小时营业',
      hearts: 0,
      text: '欢迎光临桜マート！货架上摆着刚补货的春日点心与饮品。',
      choices: [
        { label: '🍙 鲑鱼饭团 (¥150)', onSelect: () => this._buyShopItem('onigiri', 150) },
        { label: '🐟 小鱼干零食 (¥140)', onSelect: () => this._buyShopItem('fish_snack', 140) },
        { label: '🍵 樱花绿茶 (¥120)', onSelect: () => this._buyShopItem('green_tea', 120) },
        { label: '随便看看', onSelect: () => {} },
      ],
    });
  }

  _buyShopItem(itemId, price) {
    if (this.gameState.yen < price) {
      this.ui.toast(`零钱不足（需要 ¥${price}）。`);
      return;
    }
    this.gameState.yen -= price;
    this.gameState.addItem(itemId, 1);
    this.ui.toast(`已购买 ${ITEMS[itemId].icon} ${ITEMS[itemId].name}！`);
  }

  _orderCafeCoffee() {
    if (this.gameState.yen < 250) {
      this.ui.toast('手冲咖啡需要 ¥250。');
      return;
    }
    this.gameState.yen -= 250;
    this.gameState.flags.cafeCoffeeServed = true;
    this.gameState.save(this.atmosphere.timeMinutes);
    this.ui.toast('☕ 健二把一杯热气腾腾的手冲咖啡放到了木头吧台上，香气四溢！');
  }

  _prayAtShrine() {
    if (this.gameState.yen < 5) {
      this.ui.toast('口袋里连 ¥5 硬币也没有了……');
      return;
    }
    this.gameState.yen -= 5;
    this.audio.playShrineBell();
    this.shrineBellSwing = 0.42;
    const fortunes = [
      '【大吉】春风顺意，今日在小镇会有温暖的相遇。',
      '【中吉】放慢脚步，山脚与河岸都藏着小小的惊喜。',
      '【吉】听着列车的声音喝杯热茶，一切都会顺利。',
      '【小吉】留意身边的小动物，它会为你带来好运。',
    ];
    const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
    this.gameState.flags.lastOmikuji = pick;
    this.gameState.save(this.atmosphere.timeMinutes);
    this.ui.toast(`🔔 摇响铃铛抽到御神签：${pick}`);
  }

  _openNoticeBoard() {
    const doneCount = this.gameState.getCompletedQuestCount();
    const canUnlockFestival = doneCount >= 3 && !this.gameState.flags.festivalUnlocked;
    const eventHtml = this.gameState.activeEvent
      ? `<div class="notice-section"><h4>📢 实时城镇动态 · ${this.gameState.activeEvent.title}</h4><p>${this.gameState.activeEvent.desc}</p></div>`
      : '';

    const festHtml = this.gameState.flags.festivalUnlocked
      ? `<div class="notice-section"><h4>🏮 桜川夜樱点灯进行中！</h4><p>河畔的樱花灯笼已全部点亮！傍晚 18:00 后居民们会相约到桜川边散步赏灯。</p></div>`
      : canUnlockFestival
        ? `<div class="notice-section"><h4>🏮 河畔灯笼点灯准备就绪</h4><p>感谢你这段时间热心帮忙！大家把河畔樱花灯笼的开关留给你啦。</p><button id="btn-trigger-festival" class="btn-primary" style="margin-top:8px;padding:8px 18px;font-size:13px;">🏮 点亮桜川春日灯火！</button></div>`
        : `<div class="notice-section"><h4>🏮 春日河畔点灯预告</h4><p>目前已完成小镇记事 ${doneCount}/3。多和居民们聊聊天、帮些小忙后，就能一起点亮桜川河畔的樱花灯笼！</p></div>`;

    this.ui.openNotice(
      '📋 桜町 町内掲示板',
      `${eventHtml}
      <div class="notice-section">
        <h4>🚃 桜線 列车实时状态</h4>
        <p>${this.railway.getStatusText()}</p>
      </div>
      <div class="notice-section">
        <h4>🏪 商店街营业信息</h4>
        <p>・桜マート便利店：24小时营业（自动门与夜间照明全天开启）</p>
        <p>・喫茶 こもれび：08:00 – 21:00（每晚9点打烊）</p>
      </div>
      ${festHtml}`
    );

    const festBtn = document.getElementById('btn-trigger-festival');
    if (festBtn) {
      festBtn.addEventListener('click', () => {
        this.gameState.flags.festivalUnlocked = true;
        this.atmosphere.festivalUnlocked = true;
        this.gameState.setQuest('spring_lantern_night', 'done');
        this.gameState.yen += 400;
        this.gameState.save(this.atmosphere.timeMinutes);
        this.ui.closeNotice();
        this.ui.toast('🏮 桜川畔的樱花灯笼一盏盏点亮了！傍晚去河岸看看大家吧！');
      });
    }
  }

  _talkToResident(npc) {
    const profile = RESIDENT_PROFILES[npc.id];
    const isNew = this.gameState.meetResident(npc.id);
    if (isNew) this.ui.toast(`✨ 认识了新居民：${profile.name}（${profile.role}）`);

    const hearts = this.gameState.friendship[npc.id] || 0;
    const isRaining = this.atmosphere.isRaining;
    const period = this.atmosphere.getPeriodInfo().label;
    const openDlg = (opts) => this.ui.openDialogue({ speakerId: npc.id, ...opts });

    // --- 1. KENJI (Café Master) ---
    if (npc.id === 'kenji') {
      if (this.gameState.quests.welcome_letter === 'active') {
        openDlg({
          speaker: profile.name, role: profile.role, hearts,
          text: '哎呀，你就是刚搬进桜荘的新邻居吧！看到信箱里的便签了吗？欢迎来到樱花小镇。趁着咖啡还热，对了——能顺路帮我一个小忙吗？我订的一箱春季烘焙咖啡豆刚送到北边「桜駅候车室」的寄存架上，我这边一时走不开。',
          choices: [
            {
              label: '没问题，我去桜駅帮你取回来！',
              onSelect: () => {
                this.gameState.setQuest('welcome_letter', 'done');
                this.gameState.setQuest('coffee_parcel', 'active');
                this.gameState.addFriendship('kenji', 1);
                this.ui.toast('📖 新记事：前往桜駅候车室取回咖啡豆包裹');
              },
            },
          ],
        });
        return;
      }

      if (this.gameState.quests.coffee_parcel === 'active' && this.gameState.hasItem('coffee_parcel')) {
        this.ui.openDialogue({
          speaker: profile.name, role: profile.role, hearts,
          text: '太感谢你了！这么快就把咖啡豆扛回来了。你看这烘焙的香气——这是跑腿谢礼，另外有空也可以去桜神社或河畔转转，铃木奶奶好像丢了样重要的东西，挺着急的。',
          choices: [
            {
              label: '把咖啡豆包裹交给健二 (+¥300)',
              onSelect: () => {
                this.gameState.removeItem('coffee_parcel', 1);
                this.gameState.yen += 300;
                this.gameState.setQuest('coffee_parcel', 'done');
                this.gameState.setQuest('haru_photo', 'active');
                this.gameState.addFriendship('kenji', 1);
                this.ui.toast('🎉 完成「车站里的咖啡豆包裹」！获得 ¥300');
              },
            },
          ],
        });
        return;
      }

      const lines = isRaining
        ? '下着樱花雨的时候，听着屋檐滴水声喝手冲咖啡最舒服了。铃木奶奶通常雨天也会来我店里坐会儿。'
        : this.gameState.flags.festivalUnlocked
          ? '河畔的樱花灯笼亮起来真好看啊！这座小镇因为有你变得更热闹温暖了。'
          : `${period}好呀！我的侄女小葵就在街对面桜マート打工，有空也可以去跟她聊聊。店里每天营业到晚上9点哦。`;

      this.ui.openDialogue({ speaker: profile.name, role: profile.role, hearts, text: lines });
      return;
    }

    // --- 2. AOI (Sakura Mart Clerk) ---
    if (npc.id === 'aoi') {
      if (this.gameState.quests.warm_coffee_for_ren === 'locked') {
        this.ui.openDialogue({
          speaker: profile.name, role: profile.role, hearts,
          text: '欢迎光临桜マート！你是新搬来的邻居吧？我舅舅健二跟我提过你！对了，常来买饭团的插画师田中レン最近总在车站赶稿，看起来困极了。如果你路过自动售货机，能买一罐热咖啡送给他吗？',
          choices: [
            {
              label: '好呀，我买罐热咖啡送给レン！',
              onSelect: () => {
                this.gameState.setQuest('warm_coffee_for_ren', 'active');
                this.gameState.addFriendship('aoi', 1);
                this.ui.toast('📖 新记事：在自动售货机买一罐热咖啡送给田中レン');
              },
            },
          ],
        });
        return;
      }

      const text = isRaining
        ? '下雨天便利店的灯光照在湿漉漉的马路上，感觉特别像动画里的场景呢。'
        : this.railway.isDelayed
          ? '刚刚听说桜線的列车因为山风稍微晚点了一会儿，レン大概还在月台上等车呢。'
          : '桜マート24小时亮着灯，晚上散步饿了随时进来买个饭团或者小鱼干吧！三花猫ミケ超爱小鱼干的。';
      this.ui.openDialogue({ speaker: profile.name, role: profile.role, hearts, text });
      return;
    }

    // --- 3. HARU (Retired Teacher) ---
    if (npc.id === 'haru') {
      if (this.gameState.hasItem('old_photo') && this.gameState.quests.haru_photo !== 'done') {
        this.ui.openDialogue({
          speaker: profile.name, role: profile.role, hearts,
          text: '天哪……这就是我弄丢的那张旧樱花照片！你看，照片里还是当年刚通车时的桜駅呢，那时候树苗才这么高。真是太谢谢你跑到东边山脚林道帮我找回来！',
          choices: [
            {
              label: '把「旧樱花照片」交还给铃木奶奶 (+¥250)',
              onSelect: () => {
                this.gameState.removeItem('old_photo', 1);
                this.gameState.yen += 250;
                this.gameState.setQuest('haru_photo', 'done');
                this.gameState.addFriendship('haru', 2);
                this.ui.toast('🎉 完成「遗落在山脚的旧照片」！获得 ¥250');
              },
            },
          ],
        });
        return;
      }

      if (this.gameState.quests.haru_photo !== 'done') {
        this.gameState.setQuest('haru_photo', 'active');
        this.ui.openDialogue({
          speaker: profile.name, role: profile.role, hearts,
          text: '你好呀，年轻人。我前几天顺着北巷往东边的山脚林道散步，坐在那间旧木屋旁歇脚时，好像把一张珍藏的小镇旧照片落在木箱上了……如果你去那边探索，方便帮我留意一下吗？',
        });
        return;
      }

      this.ui.openDialogue({
        speaker: profile.name, role: profile.role, hearts,
        text: isRaining
          ? '下起小雨了，还好喫茶こもれび总是暖洋洋的。'
          : '每年晚春站在桜神社展望台俯瞰电车穿过樱花树，都会觉得住在这里真好啊。',
      });
      return;
    }

    // --- 4. REN (Illustrator / Commuter) ---
    if (npc.id === 'ren') {
      if (this.gameState.hasItem('canned_coffee') && this.gameState.quests.warm_coffee_for_ren !== 'done') {
        this.ui.openDialogue({
          speaker: profile.name, role: profile.role, hearts,
          text: '唔……这是热腾腾的罐装咖啡？是小葵托你带给我的吗？太救命了！画了一整晚分镜，刚在桜駅等车都快睡着了。这包刚买的小鱼干送你吧，三花猫ミケ要是闻到一定会粘着你不放！',
          choices: [
            {
              label: '递出「罐装热咖啡」(+¥200 & 小鱼干零食)',
              onSelect: () => {
                this.gameState.removeItem('canned_coffee', 1);
                this.gameState.yen += 200;
                this.gameState.addItem('fish_snack', 1);
                this.gameState.setQuest('warm_coffee_for_ren', 'done');
                this.gameState.setQuest('feed_mike', 'active');
                this.gameState.addFriendship('ren', 2);
                this.ui.toast('🎉 完成「给候车画师的热咖啡」！获得 ¥200 与 🐟小鱼干零食');
              },
            },
          ],
        });
        return;
      }

      if (this.gameState.quests.warm_coffee_for_ren === 'locked') {
        this.gameState.setQuest('warm_coffee_for_ren', 'active');
      }
      this.ui.openDialogue({
        speaker: profile.name, role: profile.role, hearts,
        text: this.railway.state === 'DOORS_OPEN'
          ? '哦！电车门开了，这班樱花涂装的列车每次看都很上镜。'
          : '嗨，新搬来的邻居？我正在画樱花小镇的明信片。要是能喝到一罐自动售货机卖的热咖啡就完美了……',
      });
      return;
    }

    // --- 5. MIKE (Calico Cat) ---
    if (npc.id === 'mike') {
      if (this.gameState.hasItem('fish_snack') && this.gameState.quests.feed_mike !== 'done') {
        this.ui.openDialogue({
          speaker: 'ミケ', role: '小镇吉祥物三花猫', hearts,
          text: '喵呜~♪（ミケ嗅到了小鱼干的香气，开心地蹭着你的裤脚，吃完后用爪子从草丛里推给你一枚小小的「樱花御守」！）',
          choices: [
            {
              label: '喂给ミケ「小鱼干零食」🐟',
              onSelect: () => {
                this.gameState.removeItem('fish_snack', 1);
                this.gameState.addItem('sakura_charm', 1);
                this.gameState.setQuest('feed_mike', 'done');
                this.gameState.addFriendship('mike', 3);
                this.ui.toast('🌸 成为了ミケ的好朋友！获得珍贵纪念品「樱花御守」');
              },
            },
          ],
        });
        return;
      }

      this.ui.openDialogue({
        speaker: 'ミケ', role: '小镇吉祥物三花猫', hearts,
        text: this.gameState.quests.feed_mike === 'done'
          ? '喵~呼噜呼噜……（ミケ懒洋洋地翻了个身，似乎很喜欢有你陪伴的樱花小镇。）'
          : '喵呜？（ミケ歪着头看着你，似乎在期待着香脆的小鱼干零食……）',
      });
    }
  }
}
