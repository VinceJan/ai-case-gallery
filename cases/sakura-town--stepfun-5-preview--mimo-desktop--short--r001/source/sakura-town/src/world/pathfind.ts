import type { RoadEdge, RoadNode } from '../game/types';

interface Graph {
  nodes: Map<string, RoadNode>;
  adjacency: Map<string, { id: string; cost: number }[]>;
}

function distance(a: RoadNode, b: RoadNode): number {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

/** 道路/门口节点图，NPC 作息移动的寻路基础。 */
export class PathGraph {
  private readonly graph: Graph;

  constructor(nodes: RoadNode[], edges: RoadEdge[]) {
    this.graph = {
      nodes: new Map(nodes.map((n) => [n.id, n])),
      adjacency: new Map(nodes.map((n) => [n.id, [] as { id: string; cost: number }[]])),
    };
    for (const edge of edges) {
      const a = this.graph.nodes.get(edge.a);
      const b = this.graph.nodes.get(edge.b);
      if (!a || !b) continue;
      const cost = distance(a, b);
      this.graph.adjacency.get(edge.a)?.push({ id: edge.b, cost });
      this.graph.adjacency.get(edge.b)?.push({ id: edge.a, cost });
    }
  }

  addNode(node: RoadNode): void {
    if (this.graph.nodes.has(node.id)) return;
    this.graph.nodes.set(node.id, node);
    this.graph.adjacency.set(node.id, []);
  }

  /** 把一个点挂到最近节点上（建筑门、户外点用）。 */
  connectToNearest(node: RoadNode, maxDistance = 60): boolean {
    let best: RoadNode | null = null;
    let bestDist = Infinity;
    for (const candidate of this.graph.nodes.values()) {
      if (candidate.id === node.id) continue;
      const dist = distance(candidate, node);
      if (dist < bestDist) {
        bestDist = dist;
        best = candidate;
      }
    }
    if (!best || bestDist > maxDistance) return false;
    this.graph.adjacency.get(node.id)?.push({ id: best.id, cost: bestDist });
    this.graph.adjacency.get(best.id)?.push({ id: node.id, cost: bestDist });
    return true;
  }

  /** 从任意世界坐标到任意世界坐标的路径点序列（含起终点）。 */
  findPath(fromX: number, fromZ: number, toX: number, toZ: number): { x: number; z: number }[] {
    const start = this.nearestNode(fromX, fromZ);
    const goal = this.nearestNode(toX, toZ);
    const nodePath = this.bfs(start, goal);
    const points = nodePath.map((id) => {
      const node = this.graph.nodes.get(id);
      return { x: node?.x ?? 0, z: node?.z ?? 0 };
    });
    return [{ x: fromX, z: fromZ }, ...points, { x: toX, z: toZ }];
  }

  private nearestNode(x: number, z: number): string {
    let bestId = '';
    let bestDist = Infinity;
    for (const node of this.graph.nodes.values()) {
      const dist = Math.hypot(node.x - x, node.z - z);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = node.id;
      }
    }
    return bestId;
  }

  private bfs(startId: string, goalId: string): string[] {
    if (startId === goalId) return [startId];
    const queue: string[] = [startId];
    const cameFrom = new Map<string, string>([[startId, startId]]);
    while (queue.length > 0) {
      const current = queue.shift() as string;
      if (current === goalId) break;
      for (const neighbor of this.graph.adjacency.get(current) ?? []) {
        if (cameFrom.has(neighbor.id)) continue;
        cameFrom.set(neighbor.id, current);
        queue.push(neighbor.id);
      }
    }
    if (!cameFrom.has(goalId)) return [startId];
    const path: string[] = [goalId];
    let cursor = goalId;
    while (cursor !== startId) {
      cursor = cameFrom.get(cursor) as string;
      path.unshift(cursor);
    }
    return path;
  }
}
