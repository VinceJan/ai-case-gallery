// 全局配色 —— 所有模型、材质、UI 共用同一套色板，保证画面统一
export const PAL = {
  // 天空 / 大气
  skyTop: 0x6fb3e8,
  skyMid: 0xa9d3f2,
  skyLow: 0xfbe6e6,
  duskTop: 0x4a5a92,
  duskMid: 0xe89a86,
  duskLow: 0xffd6a8,
  nightTop: 0x0b1024,
  nightMid: 0x1b2444,
  nightLow: 0x2f3557,
  fogDay: 0xcfe3f2,
  fogDusk: 0xe6b7a4,
  fogNight: 0x1c2440,

  // 地面
  grass: 0x8fc07a,
  grassDark: 0x74a862,
  grassLight: 0xa6d18d,
  dirt: 0xc2a887,
  sand: 0xe0d2ac,
  rock: 0x9a9384,
  rockDark: 0x776f62,
  asphalt: 0x6e6f78,
  asphaltLight: 0x83848d,
  concrete: 0xb9b4a8,
  gravel: 0xa39a8b,
  water: 0x74a8c9,
  waterDeep: 0x3f7ba3,

  // 建筑
  wallCream: 0xf3e9d6,
  wallBeige: 0xe4d5b8,
  wallWhite: 0xf7f4ec,
  wallWood: 0xc9a274,
  wallWoodDark: 0x9d7a52,
  wallPlaster: 0xdcd2bd,
  wallTileBlue: 0x9fbcc4,
  roofSlate: 0x7a8292,
  roofTile: 0x7d8494,
  roofRed: 0xa4574e,
  roofDark: 0x5a606e,
  roofGreen: 0x5f7a63,
  shutter: 0x8d9aa6,
  doorWood: 0x8b5e3c,
  doorPaint: 0x3f6d63,
  window: 0x9ec8dc,
  windowDark: 0x5d7f8f,
  windowLit: 0xffe6a8,

  // 强调
  sakura: 0xf5b6c8,
  sakuraDeep: 0xe88ba8,
  sakuraPale: 0xfde4ec,
  leaf: 0x74a85f,
  leafDark: 0x4d7a45,
  leafLight: 0x9cc97c,
  pine: 0x3f6b4c,
  bamboo: 0x9fb86a,
  red: 0xd9534f,
  redDeep: 0xb03c3a,
  blue: 0x4a7fb5,
  yellow: 0xf0c14b,
  orange: 0xe88b3a,
  cream: 0xfaf3e4,
  white: 0xfbfaf6,
  black: 0x2b2b33,
  grey: 0x8f8f99,
  silver: 0xc3c7cd,
  rust: 0x9c6a4a,

  // 室内
  floorWood: 0xd2a874,
  floorTile: 0xe4e0d4,
  tatami: 0xcfc08a,
  wallIn: 0xf2ece0,
  wallInAccent: 0xe4d9c4,
  ceiling: 0xfbf7ee,

  // 光
  sunDay: 0xfff3dc,
  sunDusk: 0xffb677,
  moon: 0xbfd4ff,
  lampWarm: 0xffd79a,
  lampCool: 0xdfeaff,
  neonPink: 0xff7fa8,
  neonBlue: 0x7fc4ff,
  trainBody: 0xe9ecef,
  trainStripe: 0x3f7fa8,
  trainRoof: 0x8d94a0,
  railSteel: 0x9aa0a8,
};

/** 十六进制 -> '#rrggbb'（canvas 用） */
export const hex = (h) => '#' + h.toString(16).padStart(6, '0');

export function mixHex(a, b, t) {
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
  return (((ar + (br - ar) * t) | 0) << 16) | (((ag + (bg - ag) * t) | 0) << 8) | ((ab + (bb - ab) * t) | 0);
}

export function shade(h, amount) {
  // amount > 0 提亮，< 0 压暗
  const t = amount > 0 ? amount : -amount;
  return amount > 0 ? mixHex(h, 0xffffff, t) : mixHex(h, 0x000000, t * 0.72);
}
