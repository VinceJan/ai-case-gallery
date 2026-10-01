// Diorama layout.  Everything is in metres, the plinth is BASE x BASE and sits on y = 0.
//            -Z is "north" (the shop's back), +X is "east" (the street corner).
export const BASE = 24;
export const HALF = BASE / 2;          // 12
export const PLINTH_H = 0.7;
export const PLINTH_OVER = 0.22;       // rim that sticks out past the ground plate

// ---- roads ---------------------------------------------------------------------------------
export const ROAD_A = { z0: -1.2, z1: 4.2 };        // east-west street in front of the shop
export const ROAD_B = { x0: 4.2, x1: 9.2 };         // north-south street that turns the corner
export const CROSSWALK = { x0: -4.6, stripes: 4, w: 0.55, gap: 0.5 };

// ---- shop ----------------------------------------------------------------------------------
export const SHOP = { x0: -10.2, x1: -0.2, z0: -12, z1: -4.6, roof: 3.55, wall: 0.3 };
export const AWNING = { y: 2.45, z: -3.5, drop: 0.28 };
export const DOOR = { x0: -3.25, x1: -1.35, y0: 0.32, y1: 2.3 };
export const GLASS = { y0: 0.78, y1: 2.3, x0: SHOP.x0 + 0.22, x1: SHOP.x1 - 0.22 };
export const SIGN_BAND = { y0: 2.78, y1: 3.4 };
export const ROOF_SIGN = { x: -6.4, y0: 4.0, y1: 5.15, w: 4.6 };
export const INSIDE = { x0: -9.9, x1: -0.5, z0: -11.7, z1: -4.75, floor: 0.05, ceil: 2.86 };

// ---- interior fixtures ---------------------------------------------------------------------
export const FIX = {
  register: { x: -3.5, z: -6.3, w: 2.7, d: 1.1, h: 0.96 },
  cigWall: { x: -3.5, z: -7.35, w: 2.7, h: 2.1 },
  iceCase: { x: -5.15, z: -6.3, w: 0.9, d: 1.5, h: 1.15 },
  coffee: { x: -1.25, z: -5.35 },
  oden: { x: -9.25, z: -7.6, w: 1.1, d: 2.6, h: 1.5 },      // against the west wall
  bento: { x: -7.0, z: -5.9, w: 2.3, d: 1.0, h: 1.45 },
  seat: { x: -7.2, z: -5.05, w: 2.6, d: 0.5 },
  shelves: [-9.85, -8.5, -7.15],                             // gondola runs (z), x span below
  shelfX: { x0: -8.6, x1: -4.6 },
  coolers: { x0: -9.5, x1: -4.9, z: -11.66, h: 2.15, n: 5 },
  mags: { x: -9.8, z: -5.7 },
  backDoor: { z: -9.6, y0: 0, y1: 2.1 },
  lockers: { x: -1.5, z: -11.0 },
};

// ---- street furniture positions ------------------------------------------------------------
export const AT = {
  vending: { x: 2.15, z: -3.55, ry: -0.06 },
  vending2: { x: -11.0, z: 2.2, ry: Math.PI / 2 },
  bike: { x: -5.6, z: -3.35, ry: 0.18 },
  bike2: { x: 3.35, z: 8.4, ry: -0.5 },
  umbrella: { x: -0.75, z: -4.05 },
  umbrella2: { x: 3.5, z: 1.1 },
  bins: { x: 1.0, z: -3.9 },
  guardFront: { z: -1.35, x0: 0.0, x1: 4.2 },
  guardSide: { x: 4.35, z0: 4.2, z1: 12.0 },
  pole: { x: 3.95, z: 9.3 },
  pole2: { x: -11.2, z: 10.6 },
  lamp: { x: 3.55, z: 1.35, arm: 1.9 },
  lamp2: { x: -7.6, z: 8.4, arm: 1.3 },
  entranceLamp: { x: -2.3, z: -4.15 },
  signpost: { x: 0.55, z: 5.1 },
  notice: { x: -0.15, z: 5.6, ry: 0.25 },
  traffic: { x: 3.9, z: 10.9 },
  hydrant: { x: -11.4, z: 4.9 },
  crates: { x: -11.1, z: -2.2 },
  acRoof: [{ x: -8.4, z: -10.2 }, { x: -2.4, z: -9.0 }],
  acWall: [{ x: -0.05, z: -8.2, ry: -Math.PI / 2 }, { x: -10.35, z: -7.0, ry: Math.PI / 2 }],
  planters: [{ x: 3.9, z: 10.6 }, { x: -11.6, z: 0.4 }],
  bollards: [5.0, 6.4, 7.8, 9.2, 10.6].map((z) => ({ x: 11.5, z })),
};

export const SUN_DIR = [0.45, 0.72, -0.52];   // moonlight direction
export const NIGHT = {
  fog: '#0e1828',
  fogNear: 46,
  fogFar: 190,
  sky: '#0a1020',
  horizon: '#1b2a44',
  ambient: '#25314f',
  moon: '#c3d8fb',
  warm: '#ffd9a2',
};
export const EXPOSURE = 1.55;
