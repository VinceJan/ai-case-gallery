// 存档：localStorage（只保存重要内容）
const KEY = 'sakura_town_save_v1';

export const Save = {
  has() {
    try { return !!localStorage.getItem(KEY); } catch (e) { return false; }
  },
  read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  },
  write(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  },
  clear() {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  },
};

/** 游戏状态序列化（由 Game 提供快照） */
export function collectSnapshot(game) {
  return {
    v: 1,
    day: game.time.day,
    time: game.time.hours,
    player: {
      x: +game.player.pos.x.toFixed(2),
      y: +game.player.pos.y.toFixed(2),
      z: +game.player.pos.z.toFixed(2),
      yaw: +game.player.yaw.toFixed(3),
      camYaw: +game.camYaw.toFixed(3),
      camPitch: +game.camPitch.toFixed(3),
      camDist: +game.camDist.toFixed(2),
    },
    coins: game.coins,
    items: game.items.map((i) => i.id),
    trust: game.trust,
    met: game.met,
    quests: {
      active: game.quests.active.map((q) => ({ id: q.id, stage: q.stage })),
      completed: [...game.quests.completed],
    },
    flags: game.flags,
  };
}

export function applySnapshot(game, s) {
  if (!s || s.v !== 1) return false;
  game.time.day = s.day ?? 1;
  game.time.hours = s.time ?? 8;
  game.player.pos.set(s.player.x, s.player.y, s.player.z);
  game.player.yaw = s.player.yaw ?? 0;
  game.camYaw = s.player.camYaw ?? 0;
  game.camPitch = s.player.camPitch ?? 0.5;
  game.camDist = s.player.camDist ?? 7;
  game.coins = s.coins ?? 0;
  game.items = (s.items || []).map((id) => ({ id, name: id }));
  game.trust = s.trust || {};
  game.met = s.met || {};
  game.quests.completed = s.quests?.completed || [];
  game.flags = s.flags || {};
  // 重建进行中的任务
  for (const a of (s.quests?.active || [])) {
    game.quests.restore(a.id, a.stage);
  }
  return true;
}
