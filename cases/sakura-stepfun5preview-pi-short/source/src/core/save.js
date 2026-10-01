// 存档：localStorage 三槽 + 自动存档
const KEY_PREFIX = 'sakura_town_save_';
const AUTO_SLOT = 0;

export const SaveManager = {
  slots: [AUTO_SLOT, 1, 2, 3],

  save(slot, data) {
    try {
      const payload = { version: 1, savedAt: Date.now(), ...data };
      localStorage.setItem(KEY_PREFIX + slot, JSON.stringify(payload));
      return true;
    } catch (e) {
      console.error('save failed', e);
      return false;
    }
  },

  load(slot) {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + slot);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  },

  has(slot) { return !!localStorage.getItem(KEY_PREFIX + slot); },

  info(slot) {
    const d = this.load(slot);
    if (!d) return null;
    return { day: d.clock?.day, time: d.clock ? Math.floor(d.clock.minutes / 60) + ':00' : '', savedAt: d.savedAt, money: d.player?.money };
  },

  remove(slot) { localStorage.removeItem(KEY_PREFIX + slot); },

  autoSave(data) { return this.save(AUTO_SLOT, data); },
  autoLoad() { return this.load(AUTO_SLOT); },
};
