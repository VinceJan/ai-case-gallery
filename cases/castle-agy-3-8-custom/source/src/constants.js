// Color palette and configuration constants for the Medieval Diorama

export const PALETTE = {
  // Base & Ground
  BASE_STONE: 0x474c55,
  BASE_STONE_DARK: 0x33373e,
  BASE_PLINTH: 0x221c17,
  BASE_RIM: 0x5a606c,

  // Terrains
  GRASS_LUSH: 0x76a344,
  GRASS_DRY: 0x8ea84e,
  GRASS_DARK: 0x5e8436,
  EARTH_PATH: 0x9b7853,
  COBBLESTONE: 0x8a929b,

  // Castle Stone
  CASTLE_STONE_LIGHT: 0xcdd5df,
  CASTLE_STONE_MID: 0x9ca7b5,
  CASTLE_STONE_DARK: 0x687383,
  CASTLE_ROOF_RED: 0xb54d3f,
  CASTLE_ROOF_SLATE: 0x48647d,
  CASTLE_HERALDIC_GOLD: 0xf1c40f,
  CASTLE_HERALDIC_RED: 0xa83232,
  CASTLE_HERALDIC_BLUE: 0x2b5282,

  // Village
  PLASTER_WALL: 0xf2eee2,
  WOOD_DARK: 0x4d321d,
  WOOD_BEAM: 0x5c3d25,
  WOOD_PLANK: 0x7e5837,
  WOOD_LIGHT: 0xb38e64,
  THATCH_ROOF: 0xd6a750,
  THATCH_ROOF_DARK: 0xbe8f3a,
  BRICK_RED: 0x9e4334,

  // Farmland & Nature
  WHEAT_GOLD: 0xe8ba45,
  WHEAT_AMBER: 0xd69f31,
  WHEAT_LIGHT: 0xf5d271,
  LEAF_OAK: 0x558a3c,
  LEAF_OAK_LIGHT: 0x6ca34e,
  LEAF_PINE: 0x2f5b40,
  APPLE_RED: 0xcc3333,
  PUMPKIN_ORANGE: 0xdb6e24,

  // Water & Elements
  WATER_TEAL: 0x3d9ab0,
  WATER_DEEP: 0x266a7b,
  WATER_FOAM: 0xdef4f7,
  IRON_METAL: 0x373b43,
  BRASS_GOLD: 0xd9a838,

  // Animals
  COW_WHITE: 0xf0ece2,
  COW_BLACK: 0x28282c,
  SHEEP_WOOL: 0xf8f6f0,
  SHEEP_FACE: 0x3a3532,

  // FX & Lights
  TORCH_FIRE: 0xff8c2b,
  WINDOW_WARM: 0xffb347,
  SMOKE_WHITE: 0xeaecef
};

export const CONFIG = {
  BASE_SIZE: 50,
  BASE_HEIGHT: 6.5,
  BASE_CORNER_RADIUS: 2.5,
  
  // Elevations
  FARMLAND_Y: 1.0,
  VILLAGE_Y: 3.8,
  CASTLE_Y: 7.2,
  KEEP_TOP_Y: 19.5,
  
  // Wind parameters
  WIND_SPEED: 1.0,
  WIND_DIRECTION: { x: 0.85, z: 0.52 }
};
