import * as THREE from 'three';
import { Rng } from '../utils/random';
import { BUILDINGS, ROAD_EDGES, ROAD_NODES, SPOTS } from './layout';
import type { BuildingVisual, BoxCollider } from './buildings';
import { createBuildingVisual } from './buildings';
import { createProps, type CrossingGate, type PropKit } from './props';
import { PathGraph } from './pathfind';

export interface TownWorld {
  group: THREE.Group;
  buildings: BuildingVisual[];
  buildingMap: Record<string, BuildingVisual>;
  colliders: BoxCollider[];
  treeColliders: { x: number; z: number; r: number }[];
  gates: CrossingGate[];
  nightMaterials: THREE.MeshStandardMaterial[];
  lampGlowSprites: THREE.Sprite[];
  graph: PathGraph;
}

const INTERIOR_Y = -1000;
const INTERIOR_SPACING = 420;

export function createTownWorld(rng: Rng, toonGradient: THREE.Texture): TownWorld {
  const group = new THREE.Group();

  const windowMaterial = new THREE.MeshStandardMaterial({
    color: '#3a4656',
    emissive: '#ffd9a0',
    emissiveIntensity: 0,
    roughness: 0.25,
    metalness: 0.1,
  });
  const lampMaterial = new THREE.MeshStandardMaterial({
    color: '#ffe9c0',
    emissive: '#ffcf90',
    emissiveIntensity: 0.35,
    roughness: 0.4,
  });

  const disposables: { dispose(): void }[] = [];
  const ctx = { toonGradient, windowMaterial, lampMaterial, disposables };

  const buildings: BuildingVisual[] = [];
  const buildingMap: Record<string, BuildingVisual> = {};
  let interiorIndex = 0;
  for (const spec of BUILDINGS) {
    // 所有建筑都分配内景坐标（不可进入的建筑也有隐藏坐标，NPC 在其中不可见）
    const origin = new THREE.Vector3(interiorIndex * INTERIOR_SPACING, INTERIOR_Y, 0);
    if (spec.enterable) interiorIndex += 1;
    const visual = createBuildingVisual(ctx, spec, origin);
    buildings.push(visual);
    buildingMap[spec.id] = visual;
    group.add(visual.group);
    if (visual.interior) group.add(visual.interior);
  }

  const props: PropKit = createProps(toonGradient, rng);
  group.add(props.group);

  // ---------- 寻路图：道路节点 + 建筑门节点 + 户外点 ----------
  const graph = new PathGraph(ROAD_NODES, ROAD_EDGES);
  for (const spec of BUILDINGS) {
    graph.addNode({ id: `door_${spec.id}`, x: spec.door.x, z: spec.door.z });
    graph.connectToNearest({ id: `door_${spec.id}`, x: spec.door.x, z: spec.door.z });
  }
  for (const spot of SPOTS) {
    if (spot.indoor) continue;
    graph.addNode({ id: `spot_${spot.id}`, x: spot.x, z: spot.z });
    graph.connectToNearest({ id: `spot_${spot.id}`, x: spot.x, z: spot.z });
  }

  const colliders: BoxCollider[] = [...props.colliders];
  for (const building of buildings) colliders.push(building.collider);

  return {
    group,
    buildings,
    buildingMap,
    colliders,
    treeColliders: props.treeColliders,
    gates: props.gates,
    nightMaterials: props.nightMaterials,
    lampGlowSprites: props.group.children.filter(
      (child): child is THREE.Sprite => child instanceof THREE.Sprite,
    ),
    graph,
  };
}
