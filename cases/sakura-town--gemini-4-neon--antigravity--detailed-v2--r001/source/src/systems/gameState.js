const SAVE_KEY = 'sakura_town_save_v1';

export const ITEMS = {
  canned_coffee: { id: 'canned_coffee', name: '罐装热咖啡', icon: '☕', consumable: true, desc: '自动售货机买到的温热咖啡，散发淡淡烘焙香。' },
  green_tea: { id: 'green_tea', name: '樱花绿茶', icon: '🍵', consumable: true, desc: '清爽回甘的春日限定绿茶。' },
  onigiri: { id: 'onigiri', name: '鲑鱼饭团', icon: '🍙', consumable: true, desc: '桜マート的人气三角饭团。' },
  fish_snack: { id: 'fish_snack', name: '小鱼干零食', icon: '🐟', consumable: false, desc: '三花猫ミケ最喜欢的香脆小鱼干。' },
  coffee_parcel: { id: 'coffee_parcel', name: '咖啡豆包裹', icon: '📦', consumable: false, desc: '寄给喫茶こもれび佐藤健二店长的烘焙豆包裹。' },
  old_photo: { id: 'old_photo', name: '旧樱花照片', icon: '🖼️', consumable: false, desc: '微微泛黄的照片，拍着二十年前的樱花车站与河岸。' },
  sakura_charm: { id: 'sakura_charm', name: '樱花御守', icon: '🌸', consumable: false, desc: 'ミケ带来的一枚小小樱花护身符，带着木头与花瓣香气。' },
};

export const QUEST_DEFS = [
  {
    id: 'welcome_letter',
    title: '家门口的欢迎信',
    hint: '查看桜荘门前的红色信箱，再去商店街的「喫茶 こもれび」向店长佐藤健二打招呼。',
    desc: '刚搬进桜荘的第一天，门前信箱似乎插着一封邻居留下的信。',
  },
  {
    id: 'coffee_parcel',
    title: '车站里的咖啡豆包裹',
    hint: '前往北边的「桜駅候车室」木架取回咖啡豆包裹，交给喫茶 こもれび的佐藤健二。',
    desc: '健二店长订购的春日烘焙豆送到了桜駅寄存架，但他正忙着照看咖啡馆。',
  },
  {
    id: 'haru_photo',
    title: '遗落在山脚的旧照片',
    hint: '沿着东北方的山脚林道探索「旧木屋」，找回铃木奶奶遗失的旧照片并还给她。',
    desc: '铃木ハル奶奶散步时不慎把珍藏的樱花小镇旧照片忘在了东边林道的小屋旁。',
  },
  {
    id: 'warm_coffee_for_ren',
    title: '给候车画师的热咖啡',
    hint: '在任意「自动售货机」买一罐热咖啡并取出，送给自由插画师田中レン。',
    desc: '高桥葵说田中レン最近为了赶插画稿天天往返车站，一罐热咖啡一定能让他精神起来。',
  },
  {
    id: 'feed_mike',
    title: '与三花猫ミケ交朋友',
    hint: '带着小鱼干零食（可在桜マート购买或由高桥葵赠送），找到小镇三花猫ミケ喂它。',
    desc: '小镇吉祥物三花猫ミケ常在神社、咖啡馆门口和河岸公园之间散步。',
  },
  {
    id: 'spring_lantern_night',
    title: '桜川畔的春日灯火',
    hint: '完成至少3件小镇记事后，前往商店街口的「桜町 掲示板」点亮河畔樱花灯笼！',
    desc: '大家一起筹备的河畔夜樱点灯就要开始了，点亮灯笼后傍晚和夜晚的河岸会焕然一新。',
  },
];

export const RESIDENT_PROFILES = {
  kenji: {
    id: 'kenji',
    name: '佐藤 健二',
    role: '喫茶 こもれび 店长',
    relation: '高桥葵的舅舅 · 小镇热心人',
    homeName: '北巷东侧木屋',
    bio: '经营昭和风老咖啡馆十余年，每天早上八点准时拉开木门，晚上九点打烊回家。',
  },
  aoi: {
    id: 'aoi',
    name: '高桥 葵',
    role: '桜マート 便利店员',
    relation: '健二的侄女 · 田中レン的熟人',
    homeName: '东南侧公寓',
    bio: '笑容爽朗的便利店店员，最熟悉小镇每个角落的八卦和自动售货机库存。',
  },
  haru: {
    id: 'haru',
    name: '铃木 ハル',
    role: '退休小学教师',
    relation: '从小看着健二长大的长辈',
    homeName: '西南静巷老宅',
    bio: '喜欢在清晨登上桜神社参拜，午后去河畔长椅赏樱，珍藏着小镇几十年的记忆。',
  },
  ren: {
    id: 'ren',
    name: '田中 レン',
    role: '自由插画师 / 通勤族',
    relation: '桜マート常客 · 热爱铁道写生',
    homeName: '北巷公寓',
    bio: '常在桜駅搭车往返邻镇交稿，傍晚喜欢坐在河畔画下经过的樱花电车。',
  },
  mike: {
    id: 'mike',
    name: 'ミケ (小花)',
    role: '小镇吉祥物三花猫',
    relation: '全镇居民共同的邻居',
    homeName: '随风而居',
    bio: '一只温顺亲人的三花猫，听说它总能发现小镇里藏着的小小幸运。',
  },
};

export class GameState {
  constructor() {
    this.resetDefaults();
    this.hasSavedData = false;
    this.load();
  }

  resetDefaults() {
    this.yen = 600;
    this.inventory = []; // [{ id, count }]
    this.selectedSlot = 0;
    this.knownResidents = {}; // id -> true
    this.friendship = { kenji: 0, aoi: 0, haru: 0, ren: 0, mike: 0 };
    this.quests = {
      welcome_letter: 'active', // 'locked' | 'active' | 'done'
      coffee_parcel: 'locked',
      haru_photo: 'locked',
      warm_coffee_for_ren: 'locked',
      feed_mike: 'locked',
      spring_lantern_night: 'locked',
    };
    this.flags = {
      readWelcomeLetter: false,
      pickedParcel: false,
      pickedOldPhoto: false,
      cafeCoffeeServed: false,
      festivalUnlocked: false,
      homeLampOn: true,
      lastOmikuji: '',
    };
    this.unlockedLocations = {
      shrine: false,
      hiddenShed: false,
    };
    this.savedTimeMinutes = 8 * 60 + 30;
    this.activeEvent = null; // { id, title, desc, expiresAt }
    this.eventCooldown = 35;
  }

  hasItem(itemId) {
    return this.inventory.some((s) => s.id === itemId && s.count > 0);
  }

  addItem(itemId, count = 1) {
    const existing = this.inventory.find((s) => s.id === itemId);
    if (existing) {
      existing.count += count;
    } else if (this.inventory.length < 5) {
      this.inventory.push({ id: itemId, count });
    } else {
      // Expand gently if holding quest items
      this.inventory.push({ id: itemId, count });
    }
    this.save();
  }

  removeItem(itemId, count = 1) {
    const idx = this.inventory.findIndex((s) => s.id === itemId);
    if (idx === -1) return false;
    this.inventory[idx].count -= count;
    if (this.inventory[idx].count <= 0) this.inventory.splice(idx, 1);
    if (this.selectedSlot >= this.inventory.length) this.selectedSlot = Math.max(0, this.inventory.length - 1);
    this.save();
    return true;
  }

  meetResident(id) {
    if (!this.knownResidents[id]) {
      this.knownResidents[id] = true;
      this.save();
      return true;
    }
    return false;
  }

  addFriendship(id, delta = 1) {
    this.meetResident(id);
    this.friendship[id] = Math.min(3, (this.friendship[id] || 0) + delta);
    this.save();
  }

  setQuest(id, status) {
    if (this.quests[id] === 'done' && status !== 'done') return;
    this.quests[id] = status;
    // Automatically unlock the finale lantern quest once 3 errands are complete
    const doneCount = this.getCompletedQuestCount();
    if (doneCount >= 3 && this.quests.spring_lantern_night === 'locked') {
      this.quests.spring_lantern_night = 'active';
    }
    this.save();
  }

  getCompletedQuestCount() {
    return Object.values(this.quests).filter((s) => s === 'done').length;
  }

  getPrimaryActiveQuest() {
    for (const q of QUEST_DEFS) {
      if (this.quests[q.id] === 'active') return q;
    }
    return null;
  }

  save(currentTimeMinutes = null) {
    if (currentTimeMinutes !== null) this.savedTimeMinutes = currentTimeMinutes;
    try {
      const payload = {
        yen: this.yen,
        inventory: this.inventory,
        knownResidents: this.knownResidents,
        friendship: this.friendship,
        quests: this.quests,
        flags: this.flags,
        unlockedLocations: this.unlockedLocations,
        savedTimeMinutes: this.savedTimeMinutes,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
      this.hasSavedData = true;
    } catch {
      // Ignore storage quota errors in restricted browsers
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (typeof data.yen === 'number') this.yen = data.yen;
      if (Array.isArray(data.inventory)) this.inventory = data.inventory;
      if (data.knownResidents) this.knownResidents = data.knownResidents;
      if (data.friendship) this.friendship = { ...this.friendship, ...data.friendship };
      if (data.quests) this.quests = { ...this.quests, ...data.quests };
      if (data.flags) this.flags = { ...this.flags, ...data.flags };
      if (data.unlockedLocations) this.unlockedLocations = { ...this.unlockedLocations, ...data.unlockedLocations };
      if (typeof data.savedTimeMinutes === 'number') this.savedTimeMinutes = data.savedTimeMinutes;
      this.hasSavedData = true;
      return true;
    } catch {
      return false;
    }
  }

  clearSave() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // noop
    }
    this.resetDefaults();
    this.hasSavedData = false;
  }

  /**
   * Lightweight random town events that gently connect systems (railway, café, residents).
   */
  updateEvents(dt, railway, atmosphere, onToast) {
    if (this.activeEvent) {
      this.activeEvent.remaining -= dt;
      if (this.activeEvent.remaining <= 0) {
        this.activeEvent = null;
        this.eventCooldown = 55 + Math.random() * 30;
      }
      return;
    }
    this.eventCooldown -= dt;
    if (this.eventCooldown <= 0) {
      const pool = [
        {
          id: 'train_delay',
          title: '🚃 列车微幅延误',
          desc: '因山谷春风较强，桜線下一班列车将稍晚十余秒进站。',
          duration: 38,
          trigger: () => railway.triggerDelay(16),
        },
        {
          id: 'cafe_aroma',
          title: '☕ こもれび 刚烘好新豆',
          desc: '商店街飘来浓郁的咖啡香气，去喫茶こもれび坐坐吧。',
          duration: 42,
          trigger: () => {},
        },
        {
          id: 'sakura_gust',
          title: '🌸 樱吹雪时刻',
          desc: '微风吹过樱川河畔，粉色花瓣正缓缓飘落小镇街道。',
          duration: 36,
          trigger: () => {},
        },
      ];
      const pick = pool[Math.floor(Math.random() * pool.length)];
      this.activeEvent = { ...pick, remaining: pick.duration };
      pick.trigger();
      if (onToast) onToast(`${pick.title}：${pick.desc}`);
    }
  }
}
