import * as THREE from 'three';
import { RAILWAY_Z } from '../world/layout';

const TRAIN_SPEED = 16;

/** 定时穿过小镇的列车。 */
export class Train {
  readonly group = new THREE.Group();
  active = false;
  private x = -140;
  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];

  constructor() {
    const carColors = ['#d86a4a', '#4a7d9a', '#c8b04a'];
    for (let car = 0; car < 3; car += 1) {
      const bodyGeo = new THREE.BoxGeometry(11, 3.1, 2.9);
      bodyGeo.translate(0, 1.9, 0);
      const roofGeo = new THREE.BoxGeometry(11.3, 0.35, 3.1);
      roofGeo.translate(0, 3.55, 0);
      const windowGeo = new THREE.BoxGeometry(9.6, 1.0, 0.1);
      windowGeo.translate(0, 2.3, 1.46);
      const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 10);
      wheelGeo.rotateZ(Math.PI / 2);
      const noseGeo = new THREE.ConeGeometry(1.45, 2.2, 4);
      noseGeo.rotateY(Math.PI / 4);
      noseGeo.rotateZ(Math.PI / 2);
      noseGeo.translate(car === 0 ? 6.4 : 0, 1.9, 0);

      this.geometries.push(bodyGeo, roofGeo, windowGeo, wheelGeo, noseGeo);
      const bodyMat = new THREE.MeshToonMaterial({ color: carColors[car] });
      const roofMat = new THREE.MeshToonMaterial({ color: '#d8d4cc' });
      const windowMat = new THREE.MeshStandardMaterial({
        color: '#2e3a48',
        emissive: '#9ac8e8',
        emissiveIntensity: 0.25,
        roughness: 0.2,
      });
      const wheelMat = new THREE.MeshToonMaterial({ color: '#3a3a3a' });
      this.materials.push(bodyMat, roofMat, windowMat, wheelMat);

      const carGroup = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      carGroup.add(body);
      const roof = new THREE.Mesh(roofGeo, roofMat);
      carGroup.add(roof);
      const windows = new THREE.Mesh(windowGeo, windowMat);
      carGroup.add(windows);
      for (const wx of [-3.4, 0, 3.4]) {
        for (const wz of [-1.2, 1.2]) {
          const wheel = new THREE.Mesh(wheelGeo, wheelMat);
          wheel.position.set(wx, 0.5, wz);
          carGroup.add(wheel);
        }
      }
      if (car === 0) {
        const nose = new THREE.Mesh(noseGeo, bodyMat);
        carGroup.add(nose);
        // 车头灯
        const lampMat = new THREE.MeshStandardMaterial({
          color: '#fff4d8',
          emissive: '#ffe9a8',
          emissiveIntensity: 1.2,
        });
        this.materials.push(lampMat);
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), lampMat);
        lamp.position.set(7.3, 1.5, 0);
        carGroup.add(lamp);
      }
      carGroup.position.x = -car * 12.5;
      this.group.add(carGroup);
    }
    this.group.position.set(-140, 0, RAILWAY_Z);
    this.group.visible = false;
  }

  launch(direction: 1 | -1): void {
    this.active = true;
    this.x = direction === 1 ? -140 : 140;
    this.group.visible = true;
    this.group.rotation.y = direction === 1 ? 0 : Math.PI;
    this.group.position.x = this.x;
  }

  update(delta: number): void {
    if (!this.active) return;
    const direction = this.group.rotation.y === 0 ? 1 : -1;
    this.x += direction * TRAIN_SPEED * delta;
    this.group.position.x = this.x;
    if (this.x > 150 || this.x < -150) {
      this.active = false;
      this.group.visible = false;
    }
  }

  /** 列车前端世界坐标。 */
  frontX(): number {
    const direction = this.group.rotation.y === 0 ? 1 : -1;
    return this.x + direction * 17;
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
  }
}
