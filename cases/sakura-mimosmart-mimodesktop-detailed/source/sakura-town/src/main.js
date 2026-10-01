import { Game } from './core/Game.js';

const container = document.getElementById('app');

const game = new Game(container);
game.start();

// Export for debugging / test hooks
window.__SAKURA_TOWN__ = game;

const testState = {
  name: 'title',
  pausedForScreenshot: false,
  reducedMotion: false,
  hideDebugUi: false,
};

function applyPlayState() {
  game.paused = false;
  document.getElementById('title-screen')?.classList.add('hidden');
  game.ui.showHUD();
}

window.__THREE_GAME_TEST_HOOKS__ = {
  seed: 42,
  setState(name) {
    testState.name = name;
    if (name === 'active-play' || name === 'play' || name === 'gameplay') {
      applyPlayState();
    } else if (name === 'title' || name === 'menu') {
      game.paused = true;
      document.getElementById('title-screen')?.classList.remove('hidden');
    } else if (name === 'map') {
      applyPlayState();
      game.ui.showMap(true);
    } else {
      applyPlayState();
    }
    return { state: name, ok: true };
  },
  setPausedForScreenshot(v) {
    testState.pausedForScreenshot = !!v;
    game.paused = !!v || testState.name === 'title';
    return { state: testState.name, paused: game.paused };
  },
  setReducedMotion(v) {
    testState.reducedMotion = !!v;
    if (v) game.time.speedMultiplier = 0.2;
    return { state: testState.name, reducedMotion: testState.reducedMotion };
  },
  hideDebugUi() {
    testState.hideDebugUi = true;
    document.querySelector('.controls-hint')?.style.setProperty('display', 'none');
    return { state: testState.name, hidden: true };
  },
  getState() {
    return {
      state: testState.name,
      paused: game.paused,
      hour: game.time.hour,
      weather: game.weather.name,
    };
  },
};

window.__THREE_GAME_DIAGNOSTICS__ = {
  get info() {
    return {
      drawCalls: game.renderer.info.render.calls,
      triangles: game.renderer.info.render.triangles,
      geometries: game.renderer.info.memory.geometries,
      textures: game.renderer.info.memory.textures,
      programs: game.renderer.info.programs?.length ?? 0,
      npcs: game.npcs.npcs.length,
      hour: game.time.hour,
      weather: game.weather.name,
      player: { x: game.player.x, z: game.player.z },
      train: game.train.state,
    };
  },
};
