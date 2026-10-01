import { Game } from './core/game.js';
import { roadDistance } from './world/roads.js';

const canvas = document.getElementById('scene');
const game = new Game(canvas);
window.__game = game;

const bar = document.getElementById('load-bar');
const pct = document.getElementById('load-pct');
const txt = document.getElementById('load-text');
const btn = document.getElementById('btn-start');
const title = document.getElementById('title-screen');

game.onProgress = (p, t) => {
  bar.style.width = p + '%';
  pct.textContent = Math.round(p) + '%';
  if (t) txt.textContent = t;
};

window.addEventListener('resize', () => game.resize());

(async () => {
  try {
    await game.boot();
    game._roadDist = roadDistance;
    btn.disabled = false;
    btn.textContent = '开 始';
    const hasSave = !!localStorage.getItem('sakura-town-save');
    txt.textContent = hasSave ? '检测到上次的存档 · 可以继续' : '一切就绪';
  } catch (e) {
    console.error(e);
    txt.textContent = '出错了：' + e.message;
    throw e;
  }
})();

function begin(cont) {
  title.style.opacity = '0';
  setTimeout(() => { title.style.display = 'none'; }, 900);
  document.getElementById('hud').classList.remove('hidden');
  game.start();
  if (cont) setTimeout(() => game.load(), 400);
}
// 有存档就显示「继 续」，点一次即可（不要再叠加第二个监听器）
const HAS_SAVE = !!localStorage.getItem('sakura-town-save');
if (HAS_SAVE) btn.textContent = '继 续';
btn.addEventListener('click', () => begin(HAS_SAVE));
