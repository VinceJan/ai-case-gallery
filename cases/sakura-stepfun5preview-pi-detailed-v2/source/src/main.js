// 入口
import * as THREE from 'three';
import { Game } from './core/Game.js';

const canvas = document.createElement('canvas');
canvas.id = 'game-canvas';
document.getElementById('app').appendChild(canvas);

const game = new Game(canvas);
window.game = game;   // 调试用
window.THREE = THREE; // 调试用

(async () => {
  await game.boot();
  game.startLoop();
})();
