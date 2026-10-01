import type { GameDiagnostics, GameTestHooks } from '../game/hooks';

declare global {
  interface Window {
    __THREE_GAME_TEST_HOOKS__?: GameTestHooks;
    __THREE_GAME_DIAGNOSTICS__?: GameDiagnostics;
  }
}

export {};
