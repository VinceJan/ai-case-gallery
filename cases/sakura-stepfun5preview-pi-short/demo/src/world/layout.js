// 樱花小镇布局数据（纯数据，无 three 依赖）
// 坐标约定：y 向上，x 向东，z 向南。世界范围约 x∈[-140,140], z∈[-150,128]
import { makeRng, lerp, clamp, smoothstep } from '../core/utils.js';

export const TOWN = {
  name: '樱花小镇',
  bounds: { minX: -138, maxX: 138, minZ: -150, maxZ: 126 },
  river: { zMin: -142, zMax: -124 },      // 河面范围
  track: { z: -112, halfLen: 150 },       // 铁路
  platform: { x1: -40, x2: -16, z: -104 },
};

// ---------------- 道路（中心线） ----------------
export const ROADS = [
  { id: 'r_station', x1: -52, z1: -92, x2: 0, z2: -92, w: 8 },      // 站前路
  { id: 'r_v1', x1: -30, z1: -92, x2: -30, z2: -40, w: 6 },         // 站前→商店街
  { id: 'r_shotengai', x1: -58, z1: -40, x2: 70, z2: -40, w: 9 },   // 商店街
  { id: 'r_main', x1: 0, z1: -40, x2: 0, z2: 90, w: 7 },            // 樱花大道（主街）
  { id: 'r_h1', x1: -78, z1: -30, x2: -30, z2: -30, w: 5 },         // 住宅区北路
  { id: 'r_h2', x1: -78, z1: 20, x2: 70, z2: 20, w: 6 },            // 环湖北路
  { id: 'r_h3', x1: -78, z1: 60, x2: 70, z2: 60, w: 6 },            // 环湖南路
  { id: 'r_v3', x1: -70, z1: -40, x2: -70, z2: 115, w: 6 },         // 西街
  { id: 'r_v4', x1: 70, z1: -40, x2: 70, z2: 115, w: 6 },           // 东街
  { id: 'r_bridge', x1: 0, z1: -92, x2: 0, z2: -150, w: 5 },        // 樱花桥（跨河）
  { id: 'r_alley', x1: -78, z1: -24, x2: -78, z2: 60, w: 3.5 },     // 住宅区小巷
  { id: 'r_h4', x1: 70, z1: 38, x2: 116, z2: 38, w: 4.5 },          // 公寓前路
  { id: 'r_h5', x1: 70, z1: 84, x2: 118, z2: 84, w: 4 },            // 农场路
  { id: 'r_v3c', x1: -70, z1: -40, x2: -58, z2: -40, w: 5 },        // 西街→商店街连接
];

// ---------------- 建筑 ----------------
// type: house|konbini|shop|izakaya|post|school|station|shrine|apartment|barn|greenhouse
// rotY: 0 表示门在 +z 侧（朝南）
export const BUILDINGS = [
  // —— 住宅区（西）——
  { id: 'home_kin', type: 'house', x: -112, z: -18, w: 10, d: 9, rotY: 0, name: '佐藤家', npc: 'kin' },
  { id: 'home_sakura', type: 'house', x: -99, z: -18, w: 10, d: 9, rotY: 0, name: '松本家', npc: 'sakura' },
  { id: 'home_daisuke', type: 'house', x: -86, z: -18, w: 10, d: 9, rotY: 0, name: '佐野家', npc: 'daisuke' },
  { id: 'home_ren', type: 'house', x: -112, z: 8, w: 10, d: 9, rotY: 0, name: '小林家', npc: 'ren' },
  { id: 'home_azusa', type: 'house', x: -99, z: 8, w: 10, d: 9, rotY: 0, name: '中村家', npc: 'azusa' },
  { id: 'home_taeko', type: 'house', x: -86, z: 8, w: 10, d: 9, rotY: 0, name: '山田家', npc: 'taeko' },
  { id: 'home_hajime', type: 'house', x: -112, z: 40, w: 10, d: 9, rotY: 0, name: '斋藤家', npc: 'hajime' },
  { id: 'home_tetsuo', type: 'house', x: -99, z: 40, w: 10, d: 9, rotY: 0, name: '大岛家', npc: 'tetsuo' },
  { id: 'home_player', type: 'house', x: -86, z: 40, w: 10, d: 9, rotY: 0, name: '我的家', playerHome: true },
  // —— 住宅区（东）——
  { id: 'home_shizuka', type: 'house', x: 84, z: 34, w: 10, d: 9, rotY: -Math.PI / 2, name: '藤原家', npc: 'shizuka' },
  { id: 'home_sanae', type: 'house', x: 100, z: 34, w: 10, d: 9, rotY: -Math.PI / 2, name: '早苗家', npc: 'sanae' },
  { id: 'home_inao', type: 'house', x: 84, z: 50, w: 10, d: 9, rotY: -Math.PI / 2, name: '铃木家', npc: 'inao' },
  { id: 'home_akira', type: 'house', x: 100, z: 50, w: 10, d: 9, rotY: -Math.PI / 2, name: '高桥家', npc: 'akira' },
  { id: 'apartment', type: 'apartment', x: 112, z: 44, w: 13, d: 10, rotY: Math.PI, name: '樱花公寓' },
  // —— 公共建筑 ————
  { id: 'post_office', type: 'post', x: 88, z: -22, w: 12, d: 8, rotY: -Math.PI / 2, name: '樱花邮局', npc: 'yuki' },
  { id: 'school', type: 'school', x: 100, z: 10, w: 24, d: 15, rotY: -Math.PI / 2, name: '樱花小学', npc: 'takeshi' },
  { id: 'station', type: 'station', x: -48, z: -95, w: 22, d: 11, rotY: 0, name: '樱花站', npc: 'akira' },
  { id: 'shrine_hall', type: 'shrine', x: 0, z: 103, w: 10, d: 8, rotY: Math.PI, name: '樱花神社', npc: 'shizuka' },
  // —— 商店街（北侧，门朝南 +z）——
  { id: 'shop_konbini', type: 'konbini', x: -50, z: -49, w: 12, d: 9, rotY: 0, name: '海鸥便利店', npc: 'ken', sign: '海鸥便利店' },
  { id: 'shop_bakery', type: 'shop', x: -30, z: -49, w: 10, d: 9, rotY: 0, name: '小麦之路面包房', npc: 'taeko', sign: '小麦之路' },
  { id: 'shop_cafe', type: 'shop', x: -10, z: -49, w: 10, d: 9, rotY: 0, name: '木漏日咖啡', npc: 'ren', sign: '木漏日' },
  // —— 商店街（南侧，门朝北 -z）——
  { id: 'shop_books', type: 'shop', x: 10, z: -31, w: 10, d: 9, rotY: Math.PI, name: '纸间书店', npc: 'azusa', sign: '纸间书店' },
  { id: 'shop_general', type: 'shop', x: 30, z: -31, w: 10, d: 9, rotY: Math.PI, name: '千岁屋杂货铺', npc: 'hajime', sign: '千岁屋' },
  { id: 'shop_izakaya', type: 'izakaya', x: 50, z: -31, w: 10, d: 9, rotY: Math.PI, name: '晚霞居酒屋', npc: 'tetsuo', sign: '晚霞' },
  // —— 农场 ——
  { id: 'barn', type: 'barn', x: 96, z: 96, w: 12, d: 9, rotY: 0, name: '铃木农场谷仓', npc: 'inao' },
  { id: 'greenhouse', type: 'greenhouse', x: 116, z: 84, w: 11, d: 7, rotY: -Math.PI / 2, name: '温室' },
];

// ---------------- 兴趣点（POI） ----------------
export const POIS = [
  { id: 'bench_park1', x: -26, z: 30, name: '公园长椅', kind: 'bench' },
  { id: 'bench_park2', x: -56, z: 48, name: '湖畔长椅', kind: 'bench' },
  { id: 'bench_park3', x: -30, z: 52, name: '樱花树下', kind: 'bench' },
  { id: 'hanami', x: -40, z: 32, name: '花见胜地', kind: 'spot' },
  { id: 'pond_edge', x: -40, z: 44, name: '池塘边', kind: 'spot' },
  { id: 'shrine_steps', x: 0, z: 76, name: '神社石阶', kind: 'steps' },
  { id: 'shrine_top', x: 0, z: 97, name: '神社拜殿前', kind: 'spot' },
  { id: 'station_platform', x: -28, z: -102, name: '站台', kind: 'platform' },
  { id: 'station_front', x: -30, z: -89, name: '站前广场', kind: 'spot' },
  { id: 'bus_stop', x: 75, z: -28, name: '公交站', kind: 'bench' },
  { id: 'riverwalk_e', x: 14, z: -119, name: '河畔步道', kind: 'spot' },
  { id: 'riverwalk_w', x: -16, z: -119, name: '河畔步道', kind: 'spot' },
  { id: 'north_grove', x: 0, z: -138, name: '北岸樱林', kind: 'spot' },
  { id: 'school_gate', x: 87, z: 8, name: '小学校门', kind: 'spot' },
  { id: 'farm_gate', x: 96, z: 103, name: '农场门口', kind: 'spot' },
  { id: 'shotengai_mid', x: 0, z: -44, name: '商店街', kind: 'spot' },
  { id: 'paddy_dike', x: -100, z: 90, name: '水田田埂', kind: 'spot' },
  { id: 'park_entrance', x: -16, z: 24, name: '公园入口', kind: 'spot' },
];

// ---------------- 地形高度 ----------------
export function terrainHeight(x, z) {
  let h = 0;
  // 神社小山
  const ds = Math.hypot(x - 0, z - 102);
  if (ds < 32) h += 3.8 * 0.5 * (1 + Math.cos(Math.PI * clamp(ds / 32, 0, 1)));
  // 公园小丘
  const dp = Math.hypot(x + 40, z - 36);
  if (dp < 17) h += 1.1 * 0.5 * (1 + Math.cos(Math.PI * clamp(dp / 17, 0, 1)));
  // 河
  if (z < TOWN.river.zMax) {
    const onBridge = Math.abs(x) < 3.4 && z > TOWN.bounds.minZ;
    if (!onBridge) h = z < TOWN.river.zMin ? -0.55 : -1.9; // 北岸是低地，河面较深
    else {
      const t = clamp((z - TOWN.bounds.minZ) / (TOWN.river.zMax - TOWN.bounds.minZ), 0, 1);
      h = 0.55 * Math.sin(Math.PI * t) + 0.06;
    }
  }
  // 水田（浅水，可慢行）
  if (x < -78 && x > -126 && z > 66 && z < 114 && h > -0.5) h = Math.min(h, -0.12);
  return h;
}

// ---------------- 门的世界坐标 ----------------
export function buildingDoor(b) {
  const cz = Math.cos(b.rotY), sz = Math.sin(b.rotY);
  const lz = b.d / 2 + 0.7;
  return { x: b.x + sz * lz, z: b.z + cz * lz };
}

// ---------------- 寻路图 ----------------
function segNodes() {
  const nodes = [];
  const add = (x, z, tag) => { nodes.push({ id: 'n' + nodes.length, x, z, tag }); return nodes[nodes.length - 1]; };
  for (const r of ROADS) { add(r.x1, r.z1, r.id); add(r.x2, r.z2, r.id); }
  for (let i = 0; i < ROADS.length; i++) {
    for (let j = i + 1; j < ROADS.length; j++) {
      const p = segIntersect(ROADS[i], ROADS[j]);
      if (p) add(p.x, p.z, 'cross');
    }
  }
  return nodes;
}

function segIntersect(a, b) {
  const d1x = a.x2 - a.x1, d1z = a.z2 - a.z1;
  const d2x = b.x2 - b.x1, d2z = b.z2 - b.z1;
  const denom = d1x * d2z - d1z * d2x;
  if (Math.abs(denom) < 1e-6) return null;
  const t = ((b.x1 - a.x1) * d2z - (b.z1 - a.z1) * d2x) / denom;
  const u = ((b.x1 - a.x1) * d1z - (b.z1 - a.z1) * d1x) / denom;
  // 含端点：端点重合时由去重步骤合并
  if (t < -0.001 || t > 1.001 || u < -0.001 || u > 1.001) return null;
  return { x: a.x1 + d1x * t, z: a.z1 + d1z * t };
}

// 合并相距 <2.2m 的道路/交叉节点（处理 T 型口与重合端点）
function dedupeRoadNodes(nodes) {
  const kept = [];
  for (const n of nodes) {
    let found = false;
    for (const k of kept) {
      if (Math.hypot(k.x - n.x, k.z - n.z) < 2.2) { found = true; break; }
    }
    if (!found) kept.push(n);
  }
  return kept;
}

export function buildGraph() {
  const nodes = dedupeRoadNodes(segNodes()).map((n) => ({ ...n }));
  const edges = [];
  const seen = new Set();
  const link = (a, b) => {
    if (!a || !b || a === b) return;
    const k = a.id < b.id ? a.id + '|' + b.id : b.id + '|' + a.id;
    if (seen.has(k)) return;
    seen.add(k);
    edges.push([a.id, b.id]);
  };
  // 沿每段连接相邻节点
  for (const r of ROADS) {
    const onSeg = nodes
      .filter((n) => distToSeg(n, r) < 0.6)
      .sort((p, q) => segT(p, r) - segT(q, r));
    for (let i = 0; i + 1 < onSeg.length; i++) link(onSeg[i], onSeg[i + 1]);
  }
  // 建筑门 → 最近道路节点（门与门不互连，避免穿墙）
  for (const b of BUILDINGS) {
    const d = buildingDoor(b);
    let best = null, bd = 1e9;
    for (const n of nodes) {
      if (n.tag === 'door' || n.tag === 'poi') continue;
      const dd = Math.hypot(n.x - d.x, n.z - d.z);
      if (dd < bd) { bd = dd; best = n; }
    }
    const dn = { id: 'door_' + b.id, x: d.x, z: d.z, tag: 'door', building: b.id };
    nodes.push(dn);
    if (best && bd < 60) link(dn, best);
    else console.warn('door without road link:', b.id, Math.round(bd));
  }
  // POI → 最近节点（道路或门）
  for (const p of POIS) {
    let best = null, bd = 1e9;
    for (const n of nodes) {
      if (n.tag === 'poi') continue;
      const dd = Math.hypot(n.x - p.x, n.z - p.z);
      if (dd < bd) { bd = dd; best = n; }
    }
    const pn = { id: 'poi_' + p.id, x: p.x, z: p.z, tag: 'poi', poi: p.id };
    nodes.push(pn);
    if (best && bd < 80) link(pn, best);
    else console.warn('poi without link:', p.id, Math.round(bd));
  }
  return { nodes, edges };
}

function distToSeg(p, r) {
  const dx = r.x2 - r.x1, dz = r.z2 - r.z1;
  const L2 = dx * dx + dz * dz;
  let t = ((p.x - r.x1) * dx + (p.z - r.z1) * dz) / L2;
  t = clamp(t, 0, 1);
  return Math.hypot(p.x - (r.x1 + dx * t), p.z - (r.z1 + dz * t));
}
function segT(p, r) {
  const dx = r.x2 - r.x1, dz = r.z2 - r.z1;
  return ((p.x - r.x1) * dx + (p.z - r.z1) * dz) / (dx * dx + dz * dz);
}

// A* 寻路
export function findPath(graph, startId, goalId) {
  if (startId === goalId) return [startId];
  const idx = new Map(graph.nodes.map((n) => [n.id, n]));
  const adj = new Map(graph.nodes.map((n) => [n.id, []]));
  for (const [a, b] of graph.edges) {
    adj.get(a)?.push(b);
    adj.get(b)?.push(a);
  }
  const goal = idx.get(goalId);
  if (!goal) return null;
  const h = (n) => Math.hypot(n.x - goal.x, n.z - goal.z);
  const open = [{ id: startId, f: h(idx.get(startId)) }];
  const came = new Map();
  const g = new Map([[startId, 0]]);
  const closed = new Set();
  let guard = 0;
  while (open.length && guard++ < 5000) {
    open.sort((p, q) => p.f - q.f);
    const cur = open.shift();
    if (cur.id === goalId) {
      const path = [cur.id];
      let c = cur.id;
      while (came.has(c)) { c = came.get(c); path.unshift(c); }
      return path;
    }
    if (closed.has(cur.id)) continue;
    closed.add(cur.id);
    for (const nb of adj.get(cur.id) || []) {
      if (closed.has(nb)) continue;
      const step = Math.hypot(idx.get(nb).x - idx.get(cur.id).x, idx.get(nb).z - idx.get(cur.id).z);
      const ng = g.get(cur.id) + step;
      if (ng < (g.get(nb) ?? Infinity)) {
        g.set(nb, ng);
        came.set(nb, cur.id);
        open.push({ id: nb, f: ng + h(idx.get(nb)) });
      }
    }
  }
  return null;
}

export function nearestNode(graph, x, z, filter) {
  let best = null, bd = 1e9;
  for (const n of graph.nodes) {
    if (filter && !filter(n)) continue;
    const dd = Math.hypot(n.x - x, n.z - z);
    if (dd < bd) { bd = dd; best = n; }
  }
  return best;
}

// NPC 初始住所/工作地点辅助
export function doorNodeId(buildingId) { return 'door_' + buildingId; }
export function poiNodeId(poiId) { return 'poi_' + poiId; }
