// 樱花小镇 · 入口
import { UI } from './ui/ui.js';
import { Game } from './sim/game.js';

const ui = new UI();
const game = new Game(ui);
ui.bindGame(game);

// 目标检查（每秒）
setInterval(() => {
  if (game.mode === 'title' || !game.npcs) return;
  try {
    ui.checkGoals(game);
  } catch (e) { /* 面板未打开时静默 */ }
}, 1000);

// 暴露给调试/测试
window.__sakura = { ui, game };
