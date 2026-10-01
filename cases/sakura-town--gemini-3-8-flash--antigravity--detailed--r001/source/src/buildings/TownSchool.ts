// src/buildings/TownSchool.ts
// Town School with sports ground, iron gate, clock tower, and enterable classroom.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';

export class TownSchool {
  public group: THREE.Group;
  public schoolPos: THREE.Vector3 = new THREE.Vector3(-30, 0, 60);

  // Classroom interactable items
  public chalkboardPos: THREE.Vector3;
  public teacherDeskPos: THREE.Vector3;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    this.group.position.copy(this.schoolPos);
    scene.add(this.group);

    this.chalkboardPos = new THREE.Vector3(this.schoolPos.x, 1.8, this.schoolPos.z + 1.2);
    this.teacherDeskPos = new THREE.Vector3(this.schoolPos.x, 0.8, this.schoolPos.z + 2.5);

    // 1. School Main Building & Clock Tower
    this.createSchoolBuilding(lighting);

    // 2. Enterable Classroom Interior
    this.createClassroom();

    // 3. School Courtyard & Soccer Goal
    this.createCourtyard();
  }

  private createSchoolBuilding(lighting: LightingSky): void {
    // School Building: W: 24m (X: -12 to 12), D: 10m (Z: 0 to 10), H: 8.5m (2 stories + clock tower)
    const wallMat = CelShaders.createToonMaterial(0xecf0f1); // Light grey-white concrete
    const accentMat = CelShaders.createToonMaterial(0x34495e); // Dark navy lintels
    const roofMat = CelShaders.createToonMaterial(0x7f8c8d);

    // Main 2-story building block
    const building = new THREE.Mesh(new THREE.BoxGeometry(24, 7.5, 10), wallMat);
    building.position.set(0, 3.75, 5);
    building.castShadow = true;
    this.group.add(building);

    // Parapet roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(24.6, 0.5, 10.6), roofMat);
    roof.position.set(0, 7.75, 5);
    this.group.add(roof);

    // Clock Tower in the center
    const towerMat = CelShaders.createToonMaterial(0xdcdde1);
    const tower = new THREE.Mesh(new THREE.BoxGeometry(4.5, 3.5, 4.5), towerMat);
    tower.position.set(0, 9.5, 5);
    this.group.add(tower);

    // Tower pyramid roof
    const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(3.4, 2.0, 4), accentMat);
    towerRoof.rotation.y = Math.PI / 4;
    towerRoof.position.set(0, 12.2, 5);
    this.group.add(towerRoof);

    // Clock Face on Tower front
    const clockCanvas = document.createElement('canvas');
    clockCanvas.width = 128;
    clockCanvas.height = 128;
    const cctx = clockCanvas.getContext('2d')!;
    cctx.fillStyle = '#ffffff';
    cctx.fillRect(0, 0, 128, 128);
    cctx.strokeStyle = '#111';
    cctx.lineWidth = 5;
    cctx.beginPath();
    cctx.arc(64, 64, 56, 0, Math.PI * 2);
    cctx.stroke();
    cctx.beginPath();
    cctx.moveTo(64, 64);
    cctx.lineTo(64, 28);
    cctx.moveTo(64, 64);
    cctx.lineTo(92, 64);
    cctx.stroke();

    const clockTex = new THREE.CanvasTexture(clockCanvas);
    const clockMesh = new THREE.Mesh(new THREE.CircleGeometry(0.8, 16), new THREE.MeshBasicMaterial({ map: clockTex }));
    clockMesh.position.set(0, 9.5, 2.72);
    clockMesh.rotation.y = Math.PI;
    this.group.add(clockMesh);

    // School Front Gate (Z = -14)
    const gatePostMat = CelShaders.createToonMaterial(0x95a5a6);
    for (const gx of [-3.5, 3.5]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.4, 0.8), gatePostMat);
      post.position.set(gx, 1.2, -14);
      this.group.add(post);
    }

    // School Nameplate
    const plateCanvas = document.createElement('canvas');
    plateCanvas.width = 128;
    plateCanvas.height = 384;
    const pctx = plateCanvas.getContext('2d')!;
    pctx.fillStyle = '#2c3e50';
    pctx.fillRect(0, 0, 128, 384);
    pctx.fillStyle = '#ffffff';
    pctx.font = 'bold 36px "Hiragino Sans", "Meiryo", serif';
    pctx.textAlign = 'center';
    pctx.fillText('町', 64, 80);
    pctx.fillText('立', 64, 140);
    pctx.fillText('南', 64, 200);
    pctx.fillText('学', 64, 260);
    pctx.fillText('校', 64, 320);
    const plateTex = new THREE.CanvasTexture(plateCanvas);
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 1.2), new THREE.MeshBasicMaterial({ map: plateTex }));
    plate.position.set(-3.5, 1.3, -13.58);
    this.group.add(plate);

    // Physics walls
    physics.addCollider(
      new THREE.Vector3(this.schoolPos.x - 12.2, 0, this.schoolPos.z - 0.2),
      new THREE.Vector3(this.schoolPos.x + 12.2, 8.0, this.schoolPos.z + 10.2)
    );
  }

  private createClassroom(): void {
    // 1st Floor Classroom pavilion (X: -6.0 to 6.0, Z: 0.5 to 7.5, recessed interior)
    const floorMat = CelShaders.createToonMaterial(0x8d6e63); // Light pine wood boards
    const deskMat = CelShaders.createToonMaterial(0x5c4033);
    const frameMat = CelShaders.createToonMaterial(0x34495e);

    // Large Chalkboard at the front (North wall inside classroom)
    const boardMat = new THREE.MeshBasicMaterial({ map: TextureGenerator.createClassroomChalkboard() });
    const chalkboard = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 1.8), boardMat);
    chalkboard.position.set(0, 2.0, 1.1);
    this.group.add(chalkboard);

    // Teacher's podium desk
    const podium = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.85, 0.7), deskMat);
    podium.position.set(0, 0.425, 2.6);
    this.group.add(podium);

    // 3 Rows of Student Desks and Chairs
    for (let row = 0; row < 3; row++) {
      const dz = 4.2 + row * 1.5;
      for (const dx of [-2.5, 0, 2.5]) {
        const deskGroup = new THREE.Group();
        deskGroup.position.set(dx, 0, dz);

        // Desk
        const desk = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.72, 0.55), deskMat);
        desk.position.y = 0.36;
        deskGroup.add(desk);

        // Chair
        const chair = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.4), deskMat);
        chair.position.set(0, 0.225, 0.5);
        deskGroup.add(chair);

        this.group.add(deskGroup);
      }
    }
  }

  private createCourtyard(): void {
    // Flat sports ground in front of school (Z: -14 to 0, X: -16 to 16)
    const groundMat = CelShaders.createToonMaterial(0xc4a482); // Red cinder / sand field
    const field = new THREE.Mesh(new THREE.PlaneGeometry(32, 14), groundMat);
    field.rotation.x = -Math.PI / 2;
    field.position.set(0, 0.02, -7.0);
    field.receiveShadow = true;
    this.group.add(field);

    // Soccer Goal
    const goalMat = CelShaders.createToonMaterial(0xffffff);
    const goalGroup = new THREE.Group();
    goalGroup.position.set(0, 0, -10.5);

    // Goal posts
    for (const gx of [-2.4, 2.4]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8), goalMat);
      post.position.set(gx, 1.1, 0);
      goalGroup.add(post);
    }
    // Crossbar
    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.8, 8), goalMat);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(0, 2.2, 0);
    goalGroup.add(crossbar);

    this.group.add(goalGroup);
  }
}
