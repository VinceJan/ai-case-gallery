const SAVE_KEY = 'sakura-town-save-v1';

export class SaveSystem {
  constructor(game) {
    this.game = game;
    this.hasSave = !!localStorage.getItem(SAVE_KEY);
  }

  save(silent = false) {
    try {
      const data = {
        version: 1,
        savedAt: Date.now(),
        time: this.game.time.serialize(),
        weather: this.game.weather.current.id,
        player: this.game.player.serialize(),
        world: this.game.worldState.serialize(),
        quests: this.game.quests.serialize(),
        events: this.game.events.serialize(),
        npcMemory: this.game.npcMemory,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      this.hasSave = true;
      if (!silent) this.game.ui.toast('进度已保存');
      return true;
    } catch (err) {
      console.error('save failed', err);
      if (!silent) this.game.ui.toast('保存失败');
      return false;
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      this.game.time.restore(data.time);
      if (data.weather) this.game.weather.setWeather(data.weather, true);
      this.game.player.restore(data.player);
      this.game.worldState.restore(data.world);
      this.game.quests.restore(data.quests);
      this.game.events.restore(data.events);
      this.game.npcMemory = data.npcMemory || {};
      return true;
    } catch (err) {
      console.error('load failed', err);
      return false;
    }
  }

  clear() {
    localStorage.removeItem(SAVE_KEY);
    this.hasSave = false;
  }
}
