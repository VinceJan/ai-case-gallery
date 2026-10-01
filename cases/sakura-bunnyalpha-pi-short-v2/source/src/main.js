/**
 * 《樱花小镇》Sakura Town —— 入口
 */
import './ui/style.css';
import * as THREE from 'three';
import { Engine } from './core/engine.js';
import { Input } from './core/input.js';
import { AudioKit } from './core/audio.js';
import { UI } from './ui/ui.js';
import { Game } from './game/game.js';

const canvas = document.getElementById('scene');
const uiRoot = document.getElementById('ui-root');

// ---- 加载画面 ----
const loading = document.createElement('div');
loading.id = 'loading';
loading.innerHTML = `<div class="box">
  <div class="k">桜 の 町</div>
  <div class="bar"><i></i></div>
  <div class="t">正在生成樱花小镇……</div>
</div>`;
uiRoot.appendChild(loading);

function showError(err) {
  const text = String(err && err.stack ? err.stack : err);
  window.__sakuraError = text;
  console.error('[SakuraTown]', text);
  let box = document.getElementById('loading');
  if (!box) {
    box = document.createElement('div');
    box.id = 'loading';
    uiRoot.appendChild(box);
  }
  box.classList.remove('hidden');
  box.style.opacity = '1';
  box.innerHTML = `<div class="box" style="max-width:min(760px,92vw)">
    <div class="k">出错了</div>
    <div class="t" style="text-align:left;white-space:pre-wrap;line-height:1.6">${text}</div>
  </div>`;
}

async function boot() {
  const engine = new Engine(canvas);
  const input = new Input(canvas);
  const audio = new AudioKit();
  const ui = new UI(uiRoot);

  const game = new Game({ engine, input, audio, ui });
  window.__sakura = { engine, game, input, audio, ui };
  window.THREE = THREE; // 调试用

  // 设置面板（自包含模块）
  const { SettingsPanel } = await import('./ui/settings.js');
  const settings = new SettingsPanel({
    root: uiRoot,
    input,
    audio,
    engine,
  });
  settings.scene = engine.scene;
  settings.mount();
  game.settings = settings;
  window.__sakura.settings = settings;

  // 等一帧，保证加载界面先绘制出来
  await new Promise((r) => setTimeout(r, 40));
  await game.init();

  engine.onUpdate((dt) => {
    try {
      game.update(dt);
    } catch (e) {
      engine.setPaused(true);
      showError(e);
    }
  });
  engine.start();

  loading.classList.add('hidden');
  setTimeout(() => loading.remove(), 700);

  // ---- 开始游戏 ----
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    audio.unlock();
    ui.hideTitle();
    // 指针锁定必须在用户手势里申请，成功后鼠标就能自由转视角
    input.requestPointerLock();
    setTimeout(() => {
      if (!input.pointerLocked) input.requestPointerLock();
    }, 350);
  };
  // 点击标题区域开始，但点到按钮/设置面板时不开始
  ui.title.addEventListener('click', (e) => {
    if (e.target.closest('.title-btn') || e.target.closest('.stp-card')) return;
    if (settings.isOpen()) return;
    start();
  });
  window.addEventListener('keydown', (e) => {
    if (started) return;
    if (settings.isOpen()) return;
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      start();
    }
  });

  // 窗口失焦时释放鼠标；切后台 / 关页时存档
  window.addEventListener('blur', () => input.exitPointerLock());
  const flushSave = () => { try { game.saveNow(); } catch (e) { /* 存不了就算了 */ } };
  window.addEventListener('beforeunload', flushSave);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) flushSave();
  });

  // 标题画面额外提供「继续 / 设置 / 新游戏」三个入口
  ui.enhanceTitle({
    hasSave: game.saveSummary(),
    onContinue: () => {
      if (game.loadNow()) ui.toast('继续上次的进度');
    },
    onSettings: () => settings.toggle(),
    onNewGame: () => { /* 直接开始，存档不覆盖除非之后真的玩 */ },
  });
}

boot().catch(showError);
