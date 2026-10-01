// 步行导航图：由道路折线 + 关键地点构成的稀疏图
import { ROADS, ANCHORS, LANDMARKS, STATION, CROSSING, TRACK, BUILDINGS } from './layout.js';
import { heightAt } from './terrain.js';
import { lerp, closestOnSegment, dist } from '../util/math.js';

export class NavGraph {
  constructor() {
    this.nodes = [];
    this.adj = [];
  }
  add(x, z, tag = null, zone = 'world') {
    const y = zone === 'world' ? heightAt(x, z) : 0;
    const i = this.nodes.length;
    this.nodes.push({ x, y, z, tag, zone, edges: [] });
    return i;
  }
  link(a, b) {
    if (a === b) return;
    const A = this.nodes[a], B = this.nodes[b];
    if (A.zone !== B.zone) return;
    const d = dist(A.x, A.z, B.x, B.z);
    if (d > 30) return;
    if (!A.edges.some((e) => e.n === b)) A.edges.push({ n: b, d });
    if (!B.edges.some((e) => e.n === a)) B.edges.push({ n: a, d });
  }
  /** 找到离 (x,z) 最近的节点 */
  nearest(x, z, zone = 'world', filter = null) {
    let best = -1, bd = 1e9;
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (n.zone !== zone) continue;
      if (filter && !filter(n)) continue;
      const d = dist(x, z, n.x, n.z);
      if (d < bd) { bd = d; best = i; }
    }
    return { i: best, d: bd };
  }
  connectToNearest(x, z, maxDist = 9, zone = 'world') {
    const r = this.nearest(x, z, zone);
    if (r.i >= 0 && r.d <= maxDist) return r.i;
    const i = this.add(x, z, null, zone);
    this.link(i, r.i);
    return i;
  }

  /** A* 寻路，返回节点索引数组 */
  path(startIdx, goalIdx) {
    if (startIdx < 0 || goalIdx < 0) return null;
    if (startIdx === goalIdx) return [startIdx];
    const N = this.nodes.length;
    const g = new Float32Array(N).fill(Infinity);
    const f = new Float32Array(N).fill(Infinity);
    const prev = new Int32Array(N).fill(-1);
    const open = [startIdx];
    const closed = new Uint8Array(N);
    const goal = this.nodes[goalIdx];
    const h = (i) => dist(this.nodes[i].x, this.nodes[i].z, goal.x, goal.z);
    g[startIdx] = 0; f[startIdx] = h(startIdx);
    while (open.length) {
      let bi = 0;
      for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[bi]]) bi = i;
      const cur = open.splice(bi, 1)[0];
      if (cur === goalIdx) {
        const out = [];
        let c = cur;
        while (c !== -1) { out.push(c); c = prev[c]; }
        return out.reverse();
      }
      closed[cur] = 1;
      for (const e of this.nodes[cur].edges) {
        if (closed[e.n]) continue;
        const tg = g[cur] + e.d;
        if (tg < g[e.n]) {
          prev[e.n] = cur; g[e.n] = tg; f[e.n] = tg + h(e.n);
          if (!open.includes(e.n)) open.push(e.n);
        }
      }
    }
    return null;
  }
}

/* ------------------------------------------------------------------ *
 *  构建
 * ------------------------------------------------------------------ */
export function buildNavGraph() {
  const G = new NavGraph();

  // 1) 道路节点
  const roadNodes = [];
  for (const r of ROADS) {
    const list = [];
    for (let i = 0; i < r.pts.length - 1; i++) {
      const [ax, az] = r.pts[i], [bx, bz] = r.pts[i + 1];
      const len = Math.hypot(bx - ax, bz - az);
      const n = Math.max(1, Math.round(len / 4.5));
      for (let k = 0; k < n; k++) {
        const t = k / n;
        const idx = G.add(lerp(ax, bx, t), lerp(az, bz, t), 'road');
        list.push(idx);
      }
    }
    const last = G.add(r.pts[r.pts.length - 1][0], r.pts[r.pts.length - 1][1], 'road');
    list.push(last);
    for (let i = 0; i < list.length - 1; i++) G.link(list[i], list[i + 1]);
    roadNodes.push(list);
  }

  // 2) 轨道走廊（可沿铁轨行走）
  {
    const list = [];
    for (let x = -96; x <= 96; x += 5) {
      const z = TRACK.zAt(x) + 4.0;
      list.push(G.add(x, z, 'track'));
    }
    for (let i = 0; i < list.length - 1; i++) G.link(list[i], list[i + 1]);
    // 连接到道口与站台
    G.connectToNearest(CROSSING.x, CROSSING.z + 6.5, 12);
    G.connectToNearest(-6, TRACK.zAt(-6) + 6.2, 12);
  }

  // 3) 路口与交叉：把几何上相邻的节点连起来（否则每条路各成一段）
  {
    const N = G.nodes.length;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const A = G.nodes[i], B = G.nodes[j];
        if (A.zone !== B.zone) continue;
        if (A.edges.some((e) => e.n === j)) continue;
        const dx = A.x - B.x, dz = A.z - B.z;
        if (dx * dx + dz * dz < 3.6 * 3.6) G.link(i, j);
      }
    }
  }

  // 4) 关键地点
  const addSpot = (x, z, tag, linkDist = 18) => {
    const i = G.add(x, z, tag);
    // 连到最近的若干个节点，避免只连到一个孤点
    const cand = [];
    for (let k = 0; k < G.nodes.length; k++) {
      if (k === i) continue;
      const d = dist(x, z, G.nodes[k].x, G.nodes[k].z);
      if (d < linkDist) cand.push([d, k]);
    }
    cand.sort((a, b) => a[0] - b[0]);
    for (const [d, k] of cand.slice(0, 3)) G.link(i, k);
    return i;
  };

  for (const lm of LANDMARKS) addSpot(lm.x, lm.z, 'lm:' + lm.id, 20);
  for (const [k, a] of Object.entries(ANCHORS)) addSpot(a.x, a.z, 'anchor:' + k, 20);

  // 建筑门前
  for (const b of BUILDINGS) {
    addSpot(b.x, b.z + b.d / 2 + 2.2, 'bld:' + b.id, 20);
  }
  // 店内工作点（门外侧）
  addSpot(0, 36.5, 'shop:konbini', 18);
  addSpot(13, 36.5, 'shop:cafe', 18);
  addSpot(-10, 20.0, 'shop:station', 18);
  addSpot(30, 24.0, 'street:main', 18);
  addSpot(-10, 28.0, 'street:station', 18);
  addSpot(-32, 52, 'street:residential', 18);
  addSpot(-32, 76, 'park:center', 20);
  addSpot(-8, TRACK.zAt(-8) + 6.2, 'platform', 16);
  addSpot(-2.2, 22.6, 'board', 14);

  // 5) 兜底：把仍然孤立的节点连到最近的节点
  {
    for (let i = 0; i < G.nodes.length; i++) {
      if (G.nodes[i].edges.length) continue;
      const n = G.nodes[i];
      const r = G.nearest(n.x, n.z, n.zone);
      if (r.i >= 0 && r.d < 26) G.link(i, r.i);
    }
  }

  G.indexByTag = {};
  G.nodes.forEach((n, i) => { if (n.tag && G.indexByTag[n.tag] === undefined) G.indexByTag[n.tag] = i; });
  return G;
}
