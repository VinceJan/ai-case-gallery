import * as THREE from 'three';
import type { BoxCollider } from '../world/buildings';
import type { BuildingVisual } from '../world/buildings';

/**
 * 进出建筑：外景与内景是同一场景中相距 1000 米的两个区域，
 * 靠相机远裁剪面（320m）互相屏蔽；玩家在门内门外之间传送。
 */
export class InteriorSystem {
  indoorBuildingId: string | null = null;

  private readonly outdoorField = {
    boxes: [] as BoxCollider[],
    circles: [] as { x: number; z: number; r: number }[],
    minX: -78,
    maxX: 78,
    minZ: -74,
    maxZ: 62,
  };

  constructor(
    private readonly buildings: Record<string, BuildingVisual>,
    outdoorBoxes: BoxCollider[],
    outdoorCircles: { x: number; z: number; r: number }[],
  ) {
    this.outdoorField.boxes = outdoorBoxes;
    this.outdoorField.circles = outdoorCircles;
  }

  get isIndoor(): boolean {
    return this.indoorBuildingId !== null;
  }

  /** 进入建筑，返回玩家应处的位置。 */
  enter(buildingId: string): THREE.Vector3 | null {
    const building = this.buildings[buildingId];
    if (!building?.interior || !building.interiorEntry) return null;
    this.indoorBuildingId = buildingId;
    const interiorPos = building.interior.position;
    return new THREE.Vector3(
      interiorPos.x + building.interiorEntry.x,
      interiorPos.y,
      interiorPos.z + building.interiorEntry.z,
    );
  }

  /** 离开建筑，返回门外位置。 */
  exit(): THREE.Vector3 | null {
    if (!this.indoorBuildingId) return null;
    const building = this.buildings[this.indoorBuildingId];
    this.indoorBuildingId = null;
    if (!building) return null;
    return new THREE.Vector3(building.spec.door.x, 0, building.spec.door.z);
  }

  /** 当前空间的碰撞场。 */
  field(): { boxes: BoxCollider[]; circles: { x: number; z: number; r: number }[]; minX: number; maxX: number; minZ: number; maxZ: number } {
    if (!this.indoorBuildingId) return this.outdoorField;
    const building = this.buildings[this.indoorBuildingId];
    const origin = building?.interior?.position ?? new THREE.Vector3();
    return {
      boxes: (building?.interiorWalls ?? []).map((wall) => ({
        x: origin.x + wall.x,
        z: origin.z + wall.z,
        hw: wall.hw,
        hd: wall.hd,
      })),
      circles: [],
      minX: origin.x - 14,
      maxX: origin.x + 14,
      minZ: origin.z - 14,
      maxZ: origin.z + 14,
    };
  }

  /** NPC 在某建筑中的站立点（世界坐标；不可进入的建筑也有隐藏坐标）。 */
  npcSpotIn(buildingId: string, local: THREE.Vector3): THREE.Vector3 {
    const building = this.buildings[buildingId];
    const origin = building?.interiorOrigin ?? building?.interior?.position ?? new THREE.Vector3();
    return new THREE.Vector3(origin.x + local.x, origin.y, origin.z + local.z);
  }

  /** 玩家与 NPC 是否同一空间。 */
  sameSpace(npcLocation: { buildingId?: string; spotId?: string }): boolean {
    if (this.indoorBuildingId) return npcLocation.buildingId === this.indoorBuildingId;
    return !npcLocation.buildingId;
  }
}
