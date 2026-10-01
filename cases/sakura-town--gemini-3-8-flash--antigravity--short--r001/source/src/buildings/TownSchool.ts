// src/buildings/TownSchool.ts
// Enterable junior high school building with detailed anime classroom.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class TownSchool {
  public group: THREE.Group;
  private lighting: LightingSky;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.lighting = lighting;

    // School Location: South-West Quarter (X: -30, Z: 55)
    this.group.position.set(-30, 0, 55);

    this.buildSchoolStructure();
    this.buildClassroomInterior();
  }

  private buildSchoolStructure(): void {
    const wallMat = CelShaders.createToonMaterial(0xfff3e0); // Warm school cream
    const roofMat = CelShaders.createToonMaterial(0x37474f);
    const floorMat = CelShaders.createToonMaterial(0x8d6e63);
    const glassMat = CelShaders.createToonMaterial(0xa0e7e5, { transparent: true, opacity: 0.5 });

    // Main Classroom Wing: 14m wide x 10m deep x 4.5m high
    // 1. Wood Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.2, 10), floorMat);
    floor.position.set(0, 0.1, 0);
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Walls
    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 4.5, 0.3), wallMat);
    backWall.position.set(0, 2.25, 4.85);
    this.group.add(backWall);

    // Front Classroom Wall with Blackboard
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(14, 4.5, 0.3), wallMat);
    frontWall.position.set(0, 2.25, -4.85);
    this.group.add(frontWall);

    // Left Hallway Wall with sliding door entrance
    const leftWallF = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 4.0), wallMat);
    leftWallF.position.set(-6.85, 2.25, -2.8);
    this.group.add(leftWallF);

    const leftWallB = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 4.0), wallMat);
    leftWallB.position.set(-6.85, 2.25, 2.8);
    this.group.add(leftWallB);

    // Right Exterior Wall with large school windows overlooking sports ground
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 10), wallMat);
    rightWall.position.set(6.85, 2.25, 0);
    this.group.add(rightWall);

    const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 8.5), glassMat);
    windowGlass.position.set(6.85, 2.2, 0);
    this.group.add(windowGlass);

    // 3. Flat School Concrete Roof with Parapet
    const roof = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.5, 11.2), roofMat);
    roof.position.set(0, 4.75, 0);
    roof.castShadow = true;
    this.group.add(roof);

    // Clock Tower Top Feature (学校の時計台)
    const tower = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.5, 3.0), wallMat);
    tower.position.set(-4.0, 6.0, -3.0);
    this.group.add(tower);

    const clockFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.65, 16),
      CelShaders.createToonMaterial(0xffffff)
    );
    clockFace.position.set(-4.0, 6.2, -1.48);
    this.group.add(clockFace);

    // Classroom Ceiling Fluorescent Lights
    const schoolLight = new THREE.PointLight(0xfff8e7, 1.2, 16, 1.5);
    schoolLight.position.set(0, 4.0, 0);
    this.group.add(schoolLight);

    // Physics colliders
    physics.addBox(-30, 55 + 4.85, 14, 0.4, 'school_wall_b');
    physics.addBox(-30, 55 - 4.85, 14, 0.4, 'school_wall_f');
    physics.addBox(-30 + 6.85, 55, 0.4, 10, 'school_wall_r');
    physics.addBox(-30 - 6.85, 55 - 2.8, 0.4, 4.0, 'school_wall_lf');
    physics.addBox(-30 - 6.85, 55 + 2.8, 0.4, 4.0, 'school_wall_lb');
  }

  private buildClassroomInterior(): void {
    const boardMat = CelShaders.createToonMaterial(0x2d5a27); // School chalkboard green
    const deskMat = CelShaders.createToonMaterial(0xd7ccc8);
    const chairMat = CelShaders.createToonMaterial(0x8d6e63);

    // 1. Large Chalkboard on front wall
    const board = new THREE.Mesh(new THREE.BoxGeometry(7.5, 1.8, 0.08), boardMat);
    board.position.set(0, 2.2, -4.68);
    this.group.add(board);

    // Chalk tray
    const tray = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.08, 0.15), chairMat);
    tray.position.set(0, 1.26, -4.62);
    this.group.add(tray);

    // 2. Teacher's Podium Desk (教卓)
    const podium = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.9), chairMat);
    podium.position.set(0, 0.5, -3.2);
    podium.castShadow = true;
    this.group.add(podium);

    // 3. Rows of Student Desks and Chairs (3 columns x 3 rows)
    for (let col = -1; col <= 1; col++) {
      for (let row = 0; row < 3; row++) {
        const dx = col * 2.8;
        const dz = -0.8 + row * 2.0;

        // Student Wooden Desk
        const desk = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.75, 0.75), deskMat);
        desk.position.set(dx, 0.375, dz);
        desk.castShadow = true;
        this.group.add(desk);

        // Student Chair
        const chair = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.75, 0.48), chairMat);
        chair.position.set(dx, 0.375, dz + 0.65);
        chair.castShadow = true;
        this.group.add(chair);
      }
    }
  }
}
