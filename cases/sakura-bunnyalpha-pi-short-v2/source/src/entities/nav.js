/**
 * 寻路：基于路网节点的 A*，再接上一段直线到终点。
 * 镇子不大，节点数很少，够用且路径看起来会沿街走。
 */
import { EDGES, NODES } from '../world/layout.js';
import { heightAt } from '../world/terrain.js';

export class NavGraph {
  constructor(nodes = NODES, edges = EDGES) {
    this.nodes = nodes;
    this.index = new Map();
    nodes.forEach((n, i) => this.index.set(n.id, i));
    this.adj = nodes.map(() => []);
    for (const [a, b] of edges) {
      const ia = this.index.get(a);
      const ib = this.index.get(b);
      if (ia === undefined || ib === undefined) continue;
      const na = nodes[ia];
      const nb = nodes[ib];
      const d = Math.hypot(na.x - nb.x, na.z - nb.z);
      this.adj[ia].push({ to: ib, d });
      this.adj[ib].push({ to: ia, d });
    }
  }

  nearest(x, z) {
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const d = (n.x - x) ** 2 + (n.z - z) ** 2;
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    return best;
  }

  nodePos(i) {
    return this.nodes[i];
  }

  /** A* 求节点路径，返回节点数组 */
  findNodePath(startIdx, goalIdx) {
    if (startIdx === goalIdx) return [startIdx];
    const n = this.nodes.length;
    const g = new Float64Array(n).fill(Infinity);
    const f = new Float64Array(n).fill(Infinity);
    const prev = new Int32Array(n).fill(-1);
    const open = [startIdx];
    const inOpen = new Uint8Array(n);
    const closed = new Uint8Array(n);
    const goal = this.nodes[goalIdx];
    g[startIdx] = 0;
    f[startIdx] = Math.hypot(goal.x - this.nodes[startIdx].x, goal.z - this.nodes[startIdx].z);
    inOpen[startIdx] = 1;

    while (open.length) {
      let bi = 0;
      for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[bi]]) bi = i;
      const cur = open.splice(bi, 1)[0];
      inOpen[cur] = 0;
      if (cur === goalIdx) break;
      closed[cur] = 1;
      for (const e of this.adj[cur]) {
        if (closed[e.to]) continue;
        const ng = g[cur] + e.d;
        if (ng < g[e.to]) {
          prev[e.to] = cur;
          g[e.to] = ng;
          const nn = this.nodes[e.to];
          f[e.to] = ng + Math.hypot(goal.x - nn.x, goal.z - nn.z);
          if (!inOpen[e.to]) {
            open.push(e.to);
            inOpen[e.to] = 1;
          }
        }
      }
    }
    const path = [];
    let cur = goalIdx;
    if (prev[cur] === -1 && cur !== startIdx) return null;
    while (cur !== -1) {
      path.unshift(cur);
      if (cur === startIdx) break;
      cur = prev[cur];
    }
    return path;
  }

  /**
   * 求从 (x,z) 到 (tx,tz) 的路点数组（含每点 y）
   * @returns {{x:number,z:number,y:number}[]}
   */
  findPath(x, z, tx, tz) {
    const s = this.nearest(x, z);
    const t = this.nearest(tx, tz);
    const nodePath = this.findNodePath(s, t);
    const pts = [];
    if (nodePath) {
      for (const i of nodePath) {
        const n = this.nodes[i];
        pts.push({ x: n.x, z: n.z, y: heightAt(n.x, n.z) });
      }
    } else {
      pts.push({ x, z, y: heightAt(x, z) });
    }
    const last = pts[pts.length - 1];
    if (Math.hypot(last.x - tx, last.z - tz) > 0.6) {
      pts.push({ x: tx, z: tz, y: heightAt(tx, tz) });
    }
    // 去掉和当前位置重合的第一个点
    while (pts.length > 1 && Math.hypot(pts[0].x - x, pts[0].z - z) < 0.5) pts.shift();
    return pts;
  }
}
