/** 测试钩子与诊断数据的类型契约（供 window 全局声明与检查脚本使用）。 */

export type UiMode = 'title' | 'play' | 'dialogue' | 'shop' | 'inventory' | 'quests' | 'menu' | 'sleep';

export interface GameDiagnostics {
  frame: number;
  elapsed: number;
  uiMode: UiMode;
  day: number;
  minutes: number;
  weather: string;
  money: number;
  indoor: string | null;
  player: {
    position: { x: number; y: number; z: number };
    speed: number;
  };
  camera: {
    x: number;
    y: number;
    z: number;
    fov: number;
    far: number;
  };
  npcs: { total: number; outdoor: number };
  quests: { active: number; done: number };
  /** 当前委托目标点（bot 寻路用）。 */
  questTarget: { x: number; z: number } | null;
  festival: boolean;
  renderer: {
    calls: number;
    triangles: number;
    geometries: number;
    textures: number;
  };
  canvas: {
    clientWidth: number;
    clientHeight: number;
    width: number;
    height: number;
    dpr: number;
  };
}

export type TestStateName =
  | 'title'
  | 'active-play'
  | 'night'
  | 'rain'
  | 'festival'
  | 'interior-bakery';

export interface GameTestHooks {
  seed(value: number): void;
  setState(name: string): { state: string };
  setPausedForScreenshot(paused: boolean): void;
  setReducedMotion(enabled: boolean): void;
  hideDebugUi(hidden: boolean): void;
}
