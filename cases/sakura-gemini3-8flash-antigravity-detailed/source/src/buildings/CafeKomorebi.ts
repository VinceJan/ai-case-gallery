// src/buildings/CafeKomorebi.ts
// Enterable Japanese cozy riverside cafe with wooden terrace, espresso bar, chalkboard menu.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';
import { TextureGenerator } from '../engine/TextureGenerator';
import { LightingSky } from '../world/LightingSky';
import { physics } from '../engine/Physics';
import { audio } from '../engine/AudioSynthesizer';

export class CafeKomorebi {
  public group: THREE.Group;
  public cafePos: THREE.Vector3 = new THREE.Vector3(20, 0, -18);

  // Door
  private doorPivot: THREE.Group;
  public isDoorOpen: boolean = false;

  constructor(scene: THREE.Scene, lighting: LightingSky) {
    this.group = new THREE.Group();
    this.group.position.copy(this.cafePos);
    scene.add(this.group);

    // 1. Cafe Structure & Dark Timber Walls
    this.createCafeStructure(lighting);

    // 2. Hinged Entrance Door
    this.doorPivot = this.createEntranceDoor();

    // 3. Cafe Interior: Counter, Espresso Machine, Tables & Chairs
    this.createInterior(lighting);

    // 4. Riverside Wooden Terrace with River Views
    this.createRiversideTerrace();
  }

  private createCafeStructure(lighting: LightingSky): void {
    // Dimensions: Width 10m (X: -5 to 5), Depth 8m (Z: -4 to 4), Height: 3.8m
    const timberMat = CelShaders.createToonMaterial(0x4e342e); // Rich dark cedar wood
    const plasterMat = CelShaders.createToonMaterial(0xfff8e7); // Warm cream plaster
    const floorMat = CelShaders.createToonMaterial(0x5d4037); // Dark wood floorboards
    const roofMat = CelShaders.createToonMaterial(0x37474f);  // Slate tile roof

    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(9.8, 7.8), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.05;
    this.group.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), plasterMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3.6;
    this.group.add(ceiling);

    // Gable Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.5, 8.6), roofMat);
    roof.position.y = 3.85;
    this.group.add(roof);

    // North wall (Facing river canal, has large glass panoramic windows)
    const northWallSolid = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.6, 0.3), timberMat);
    northWallSolid.position.set(-3.2, 1.8, -4.0);
    this.group.add(northWallSolid);

    const northWallRight = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.6, 0.3), timberMat);
    northWallRight.position.set(3.2, 1.8, -4.0);
    this.group.add(northWallRight);

    // Panoramic river window glass (Z = -4.0, X: -1.5 to 1.5)
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x90caf9, transparent: true, opacity: 0.35, roughness: 0.1 });
    const riverWindow = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.4, 0.1), glassMat);
    riverWindow.position.set(0, 1.8, -4.0);
    this.group.add(riverWindow);

    // East wall (Facing street at X = 5.0)
    // Wall sections leaving opening for door at Z = 1.0
    const eastWall1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.6, 3.0), plasterMat);
    eastWall1.position.set(5.0, 1.8, -2.5);
    this.group.add(eastWall1);

    const eastWall2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.6, 3.5), plasterMat);
    eastWall2.position.set(5.0, 1.8, 2.2);
    this.group.add(eastWall2);

    // Cafe wooden signboard above street entrance
    const signMat = new THREE.MeshBasicMaterial({ map: TextureGenerator.createCafeSign() });
    const cafeSign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), signMat);
    cafeSign.rotation.y = Math.PI / 2;
    cafeSign.position.set(5.16, 2.8, 0.2);
    this.group.add(cafeSign);

    // South wall (Z = 4.0)
    const southWall = new THREE.Mesh(new THREE.BoxGeometry(10, 3.6, 0.3), timberMat);
    southWall.position.set(0, 1.8, 4.0);
    this.group.add(southWall);

    // West wall (X = -5.0)
    const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.6, 8), timberMat);
    westWall.position.set(-5.0, 1.8, 0);
    this.group.add(westWall);

    // Warm pendant lights
    for (const lx of [-2, 2]) {
      const pLight = new THREE.PointLight(0xffb74d, 0.8, 8, 1.8);
      pLight.position.set(lx, 3.0, 0);
      this.group.add(pLight);
      lighting.registerNightLight(pLight);
    }

    // Physics walls
    physics.addCollider(new THREE.Vector3(this.cafePos.x - 5.2, 0, this.cafePos.z - 4.2), new THREE.Vector3(this.cafePos.x + 5.2, 3.8, this.cafePos.z - 3.8));
    physics.addCollider(new THREE.Vector3(this.cafePos.x - 5.2, 0, this.cafePos.z + 3.8), new THREE.Vector3(this.cafePos.x + 5.2, 3.8, this.cafePos.z + 4.2));
    physics.addCollider(new THREE.Vector3(this.cafePos.x - 5.2, 0, this.cafePos.z - 4.2), new THREE.Vector3(this.cafePos.x - 4.8, 3.8, this.cafePos.z + 4.2));
    physics.addCollider(new THREE.Vector3(this.cafePos.x + 4.8, 0, this.cafePos.z - 4.2), new THREE.Vector3(this.cafePos.x + 5.2, 3.8, this.cafePos.z - 1.0));
    physics.addCollider(new THREE.Vector3(this.cafePos.x + 4.8, 0, this.cafePos.z + 0.6), new THREE.Vector3(this.cafePos.x + 5.2, 3.8, this.cafePos.z + 4.2));
  }

  private createEntranceDoor(): THREE.Group {
    const doorPivot = new THREE.Group();
    doorPivot.position.set(5.0, 0, 0.45); // Hinge position

    const woodDoorMat = CelShaders.createToonMaterial(0x3e2723);
    const doorLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 1.1), woodDoorMat);
    doorLeaf.position.set(0, 1.2, -0.55);
    doorPivot.add(doorLeaf);

    // Brass handle
    const handleMat = CelShaders.createToonMaterial(0xffd54f);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35, 6), handleMat);
    handle.position.set(0.06, 1.1, -0.95);
    doorPivot.add(handle);

    this.group.add(doorPivot);
    return doorPivot;
  }

  private createInterior(lighting: LightingSky): void {
    // 1. Coffee Bar Counter (L-shape, X: -2.5 to -4.5, Z: -1.0 to 3.0)
    const counterWood = CelShaders.createToonMaterial(0x3e2723);
    const counterStone = CelShaders.createToonMaterial(0xefebe9); // Marble counter top

    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 4.0), counterWood);
    bar.position.set(-2.5, 0.5, 1.0);
    this.group.add(bar);

    const barTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 4.2), counterStone);
    barTop.position.set(-2.5, 1.04, 1.0);
    this.group.add(barTop);

    // Copper Espresso Machine & Grinder on counter
    const copperMat = CelShaders.createToonMaterial(0xb87333);
    const espressoMachine = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.55, 0.5), copperMat);
    espressoMachine.position.set(-2.5, 1.35, 0.5);
    this.group.add(espressoMachine);

    // Hand-drip pour-over copper kettle and glass server
    const kettle = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.22, 8), copperMat);
    kettle.position.set(-2.5, 1.18, 1.5);
    this.group.add(kettle);

    // 2. Dining Tables & Cushioned Wooden Chairs
    const tableMat = counterWood;
    const chairMat = CelShaders.createToonMaterial(0x5d4037);

    for (const tz of [-2.0, 1.5]) {
      const tableGroup = new THREE.Group();
      tableGroup.position.set(1.5, 0, tz);

      // Round wooden table
      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.06, 16), tableMat);
      tableTop.position.y = 0.75;
      tableGroup.add(tableTop);

      const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.75, 8), tableMat);
      tableLeg.position.y = 0.375;
      tableGroup.add(tableLeg);

      // 2 Chairs per table
      for (const cx of [-0.9, 0.9]) {
        const chair = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), chairMat);
        chair.position.set(cx, 0.225, 0);
        tableGroup.add(chair);
      }
      this.group.add(tableGroup);

      physics.addCollider(
        new THREE.Vector3(this.cafePos.x + 0.5, 0, this.cafePos.z + tz - 0.9),
        new THREE.Vector3(this.cafePos.x + 2.5, 1.0, this.cafePos.z + tz + 0.9)
      );
    }
  }

  private createRiversideTerrace(): void {
    // Wooden outdoor deck on north side (Z: -4.0 to -8.0, X: -4.0 to 4.0) overlooking the river canal
    const deckMat = CelShaders.createToonMaterial(0x8d6e63);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.2, 4.0), deckMat);
    deck.position.set(0, 0.1, -6.0);
    this.group.add(deck);

    // Wooden deck railing
    const railMat = CelShaders.createToonMaterial(0x4e342e);
    const railTop = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.08, 0.08), railMat);
    railTop.position.set(0, 1.0, -8.0);
    this.group.add(railTop);

    // Posts
    for (let rx = -4.0; rx <= 4.0; rx += 2.0) {
      const rpost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), railMat);
      rpost.position.set(rx, 0.55, -8.0);
      this.group.add(rpost);
    }

    // Terrace Parasol & Table
    const parasolGroup = new THREE.Group();
    parasolGroup.position.set(0, 0, -6.0);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8), railMat);
    pole.position.y = 1.2;
    parasolGroup.add(pole);

    const umbrellaMat = CelShaders.createToonMaterial(0xff7043); // Warm orange parasol
    const umbrella = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.5, 8), umbrellaMat);
    umbrella.position.y = 2.4;
    parasolGroup.add(umbrella);

    const tTable = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.06, 16), deckMat);
    tTable.position.y = 0.75;
    parasolGroup.add(tTable);

    this.group.add(parasolGroup);

    // Terrace collider
    physics.addCollider(
      new THREE.Vector3(this.cafePos.x - 4.2, 0, this.cafePos.z - 8.2),
      new THREE.Vector3(this.cafePos.x + 4.2, 1.2, this.cafePos.z - 7.8)
    );
  }

  public toggleDoor(): void {
    this.isDoorOpen = !this.isDoorOpen;
    audio.playDoorSlide();
  }

  public update(delta: number): void {
    const targetY = this.isDoorOpen ? -Math.PI / 2 : 0;
    if (Math.abs(this.doorPivot.rotation.y - targetY) > 0.02) {
      this.doorPivot.rotation.y += (targetY - this.doorPivot.rotation.y) * delta * 5.0;
    }
  }
}
