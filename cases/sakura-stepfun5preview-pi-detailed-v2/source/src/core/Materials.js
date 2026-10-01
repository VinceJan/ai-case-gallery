// 统一卡通风格材质库（程序化贴图，无外部资源）
import * as THREE from 'three';
import { Tex, toonGradient } from './Utils.js';

function toon(map, { transparent = false, opacity = 1, side, emissive = 0x000000, emissiveIntensity = 1, flat = false } = {}) {
  const m = new THREE.MeshToonMaterial({
    map,
    transparent,
    opacity,
    side: side || THREE.FrontSide,
    emissive: new THREE.Color(emissive),
    emissiveIntensity,
  });
  m.gradientMap = gradient;
  m.flatShading = flat;
  return m;
}

const gradient = toonGradient(3);

function makeMats() {
  const wrap = (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
  const M = {};

  // —— 建筑 —
  M.plaster = toon(wrap(Tex.plaster()));
  M.plasterWarm = toon(wrap(Tex.plaster(96)));
  M.plasterWarm.color = new THREE.Color('#ead9c0');
  M.plasterBlue = toon(wrap(Tex.plaster(96)));
  M.plasterBlue.color = new THREE.Color('#c3cede');
  M.wood = toon(wrap(Tex.wood('#b0824f')));
  M.woodDark = toon(wrap(Tex.wood('#7a5a38', '#5d4227', '#94714a')));
  M.woodRed = toon(wrap(Tex.wood('#a8452f', '#7e3322', '#c05a40', 40)));
  M.plank = toon(wrap(Tex.plank('#c49a63', '#a37c4c')));
  M.plankDark = toon(wrap(Tex.plank('#8a6742', '#6d4f31')));
  M.tileRoof = toon(wrap(Tex.tile('#4c5a6e', '#3a4657', 22)));
  M.tileRoof.color = new THREE.Color('#54627a');
  M.tileRoofBrown = toon(wrap(Tex.tile('#6b5140', '#523f31', 22)));
  M.roofMetal = toon(wrap(Tex.tile('#7d838c', '#63696f', 10)));
  M.concrete = toon(wrap(Tex.concrete()));
  M.sidewalk = toon(wrap(Tex.concrete()));
  M.sidewalk.color = new THREE.Color('#cfc9bb');
  M.asphalt = toon(wrap(Tex.asphalt()));
  M.dirt = toon(wrap(Tex.grass('#a08b62', '#8f7a52', '#b29a6d')));
  M.stone = toon(wrap(Tex.concrete()));
  M.stone.color = new THREE.Color('#9a968c');
  M.rock = toon(null, { flat: true });
  M.rock.color = new THREE.Color('#8d887c');
  M.tatami = toon(wrap(Tex.tatami()));
  M.paper = toon(null);
  M.paper.color = new THREE.Color('#f6efdd');
  M.fabric = toon(null);
  M.fabric.color = new THREE.Color('#e8e4d8');
  M.norenIndigo = toon(Tex.noren('#2b3a67', '樱花'));
  M.norenIndigo2 = toon(Tex.noren('#31456e', '酒'));
  M.black = toon(null);
  M.black.color = new THREE.Color('#2e2a28');
  M.white = toon(null);
  M.white.color = new THREE.Color('#f4f1e8');
  M.roofTileEdge = toon(null);
  M.roofTileEdge.color = new THREE.Color('#39424f');

  // —— 自然 —
  M.grass = toon(wrap(Tex.grass()));
  M.grassDry = toon(wrap(Tex.grass('#93a862', '#7d9450', '#a8b96e')));
  M.leafDark = toon(null, { flat: true });
  M.leafDark.color = new THREE.Color('#4a6b3f');
  M.leafGreen = toon(null, { flat: true });
  M.leafGreen.color = new THREE.Color('#5e8a4a');
  M.sakura = toon(null, { flat: true });
  M.sakura.color = new THREE.Color('#f5b8c8');
  M.sakuraPale = toon(null, { flat: true });
  M.sakuraPale.color = new THREE.Color('#fbdce4');
  M.sakuraDeep = toon(null, { flat: true });
  M.sakuraDeep.color = new THREE.Color('#e898b0');
  M.bamboo = toon(null);
  M.bamboo.color = new THREE.Color('#7d9a52');
  M.trunk = toon(wrap(Tex.wood('#6b4c33', '#543a24', '#7f5b3d', 30)));

  // —— 水 / 玻璃 / 金属 —
  M.water = toon(wrap(Tex.water()), { transparent: true, opacity: 0.86 });
  M.glass = toon(null, { transparent: true, opacity: 0.28 });
  M.metal = toon(wrap(Tex.tile('#9aa0a8', '#7e848c', 6)));
  M.steel = toon(null);
  M.steel.color = new THREE.Color('#8f959d');
  M.steelDark = toon(null);
  M.steelDark.color = new THREE.Color('#5a5f66');
  M.copper = toon(null);
  M.copper.color = new THREE.Color('#b07a45');
  M.gold = toon(null);
  M.gold.color = new THREE.Color('#d9a441');

  // —— 自发光（灯 / 招牌 / 窗户） ——
  M.lampGlow = new THREE.MeshBasicMaterial({ color: 0xffe6b8, transparent: true, opacity: 0.95 });
  M.lampOff = toon(null);
  M.lampOff.color = new THREE.Color('#6a6f78');
  M.glowWarm = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
  M.glowCool = new THREE.MeshBasicMaterial({ color: 0xcfe4ff });
  M.neonPink = new THREE.MeshBasicMaterial({ color: 0xff9ec0 });
  M.signBoard = (tex) => toon(tex);

  return M;
}

let _mats = null;
export function getMaterials() {
  if (!_mats) _mats = makeMats();
  return _mats;
}

export const gradientMap = gradient;
