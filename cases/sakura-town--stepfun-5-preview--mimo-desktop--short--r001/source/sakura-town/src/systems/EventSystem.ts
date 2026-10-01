import * as THREE from 'three';
import type { Rng } from '../utils/random';
import type { AudioSystem } from './AudioSystem';
import { NPCS, SPOT_MAP } from '../world/layout';

export interface EventHooks {
  kittenFound(): boolean;
  walletFound(): string | null;
  returnKitten(): void;
  returnWallet(ownerId: string): void;
}

/** 随机事件 + 樱花祭（灯笼/摊位/烟花）。 */
export class EventSystem {
  festivalActive = false;
  private festivalDay = 0;
  private postponedNotified = false;

  private kittenGroup: THREE.Group | null = null;
  private kittenActive = false;
  private walletGroup: THREE.Group | null = null;
  private walletActive = false;
  private walletOwnerId: string | null = null;

  private readonly festivalGroup = new THREE.Group();
  private fireworks: THREE.Points | null = null;
  private readonly fireworkParticles: {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    life: number;
  }[] = [];
  private fireworkCursor = 0;
  private nextVolley = -1;
  private volleysLeft = 0;

  onToast: ((message: string) => void) | null = null;

  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];

  constructor(
    private readonly scene: THREE.Scene,
    private readonly audio: AudioSystem,
  ) {
    this.buildKitten();
    this.buildWallet();
    this.buildFestival();
    this.buildFireworks();
  }

  private buildKitten(): void {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshToonMaterial({ color: '#e8d8c8' });
    const darkMat = new THREE.MeshToonMaterial({ color: '#8a7a6a' });
    this.materials.push(bodyMat, darkMat);
    const bodyGeo = new THREE.CapsuleGeometry(0.16, 0.24, 4, 8);
    const headGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const earGeo = new THREE.ConeGeometry(0.06, 0.12, 4);
    const tailGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 5);
    this.geometries.push(bodyGeo, headGeo, earGeo, tailGeo);

    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 2;
    body.position.y = 0.24;
    body.castShadow = true;
    group.add(body);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0.26, 0.34, 0);
    head.castShadow = true;
    group.add(head);
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(earGeo, darkMat);
      ear.position.set(0.24, 0.47, side * 0.07);
      group.add(ear);
    }
    const tail = new THREE.Mesh(tailGeo, bodyMat);
    tail.position.set(-0.3, 0.4, 0);
    tail.rotation.z = 0.8;
    group.add(tail);

    const spot = SPOT_MAP.sp_steps;
    group.position.set(spot.x + 1.5, 0, spot.z + 1.5);
    group.visible = false;
    this.kittenGroup = group;
    this.scene.add(group);
  }

  private buildWallet(): void {
    const group = new THREE.Group();
    const mat = new THREE.MeshToonMaterial({ color: '#6a4a30' });
    this.materials.push(mat);
    const geo = new THREE.BoxGeometry(0.3, 0.08, 0.22);
    this.geometries.push(geo);
    const wallet = new THREE.Mesh(geo, mat);
    wallet.castShadow = true;
    group.add(wallet);
    group.visible = false;
    this.walletGroup = group;
    this.scene.add(group);
  }

  private buildFestival(): void {
    // 参道灯笼
    const poleGeo = new THREE.BoxGeometry(0.1, 2.2, 0.1);
    const lanternGeo = new THREE.BoxGeometry(0.5, 0.62, 0.5);
    const glowMat = new THREE.MeshStandardMaterial({
      color: '#ffdf9a',
      emissive: '#ffc85a',
      emissiveIntensity: 1.2,
      roughness: 0.4,
    });
    this.materials.push(glowMat);
    this.geometries.push(poleGeo, lanternGeo);
    for (let i = 0; i <= 8; i += 1) {
      const t = i / 8;
      const x = 14 + t * 30;
      const z = 7 + Math.sin(t * Math.PI) * -1.5;
      for (const side of [-1, 1]) {
        const pole = new THREE.Mesh(poleGeo, glowMat);
        pole.position.set(x, 1.1, z + side * 2.4);
        this.festivalGroup.add(pole);
        const lantern = new THREE.Mesh(lanternGeo, glowMat);
        lantern.position.set(x, 2.4, z + side * 2.4);
        this.festivalGroup.add(lantern);
      }
    }
    // 摊位
    const stallColors = ['#d86a4a', '#4a8a7a', '#c8a04a'];
    for (let i = 0; i < 3; i += 1) {
      const stall = new THREE.Group();
      const counterGeo = new THREE.BoxGeometry(2.6, 1.0, 1.4);
      const roofGeo = new THREE.BoxGeometry(3.0, 0.12, 1.8);
      this.geometries.push(counterGeo, roofGeo);
      const counterMat = new THREE.MeshToonMaterial({ color: stallColors[i] });
      this.materials.push(counterMat);
      const counter = new THREE.Mesh(counterGeo, counterMat);
      counter.position.y = 0.5;
      counter.castShadow = true;
      stall.add(counter);
      const roof = new THREE.Mesh(roofGeo, new THREE.MeshToonMaterial({ color: '#e8ded0' }));
      roof.position.y = 2.2;
      stall.add(roof);
      const pole1 = new THREE.Mesh(poleGeo, new THREE.MeshToonMaterial({ color: '#8a6a4a' }));
      pole1.position.set(-1.2, 1.1, -0.6);
      stall.add(pole1);
      const pole2 = new THREE.Mesh(poleGeo, new THREE.MeshToonMaterial({ color: '#8a6a4a' }));
      pole2.position.set(1.2, 1.1, -0.6);
      stall.add(pole2);
      stall.position.set(36 + i * 4.5, 0, 12);
      this.festivalGroup.add(stall);
    }
    this.festivalGroup.visible = false;
    this.scene.add(this.festivalGroup);
  }

  private buildFireworks(): void {
    const count = 260;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.materials.push(mat);
    this.geometries.push(geo);
    for (let i = 0; i < count; i += 1) {
      this.fireworkParticles.push({ x: 0, y: -100, z: 0, vx: 0, vy: 0, vz: 0, life: 0 });
    }
    this.fireworks = new THREE.Points(geo, mat);
    this.fireworks.frustumCulled = false;
    this.fireworks.visible = false;
    this.scene.add(this.fireworks);
  }

  /** 新的一天：掷事件、处理祭典排期。 */
  resetDay(day: number, rng: Rng): void {
    this.kittenActive = false;
    this.walletActive = false;
    if (this.kittenGroup) this.kittenGroup.visible = false;
    if (this.walletGroup) this.walletGroup.visible = false;
    this.postponedNotified = false;

    // 樱花祭：每第 3 天
    const isFestivalDay = day % 3 === 0;
    if (isFestivalDay) {
      this.festivalDay = day;
    }

    if (day >= 2) {
      if (rng.chance(0.4)) {
        this.kittenActive = true;
        if (this.kittenGroup) this.kittenGroup.visible = true;
      }
      if (rng.chance(0.35)) {
        this.walletActive = true;
        this.walletOwnerId = rng.pick(NPCS).id;
        const spot = rng.pick(['sp_plaza', 'sp_street', 'sp_res', 'sp_grove'] as const);
        const spotDef = SPOT_MAP[spot];
        if (this.walletGroup) {
          this.walletGroup.position.set(spotDef.x + rng.range(-3, 3), 0.1, spotDef.z + rng.range(-3, 3));
          this.walletGroup.visible = true;
        }
      }
    }
  }

  /** 每帧更新。 */
  update(delta: number, day: number, minutes: number, isRaining: boolean, rng: Rng): void {
    const hour = minutes / 60;

    // 祭典窗口 18:00-22:00
    const shouldFestival = this.festivalDay === day && hour >= 18 && hour < 22 && !isRaining;
    if (shouldFestival && !this.festivalActive) {
      this.festivalActive = true;
      this.festivalGroup.visible = true;
      this.nextVolley = 20 * 60;
      this.volleysLeft = 3;
      this.onToast?.('樱花祭开始了！神社参道点起了灯笼。');
      this.audio.questAccept();
    } else if (!shouldFestival && this.festivalActive) {
      this.festivalActive = false;
      this.festivalGroup.visible = false;
      if (this.fireworks) this.fireworks.visible = false;
    }
    // 下雨顺延提示
    if (this.festivalDay === day && hour >= 18 && hour < 19 && isRaining && !this.postponedNotified) {
      this.postponedNotified = true;
      this.festivalDay = day + 1;
      this.onToast?.('樱花祭因下雨顺延到明天。');
    }

    // 烟花
    if (this.festivalActive && this.volleysLeft > 0 && minutes >= this.nextVolley) {
      this.spawnFireworkBurst(rng);
      this.volleysLeft -= 1;
      this.nextVolley = minutes + 20;
      this.audio.fireworks();
    }
    this.updateFireworks(delta);

    // 事件时间窗
    if (this.kittenActive && (hour < 8 || hour >= 18)) {
      this.kittenActive = false;
      if (this.kittenGroup) this.kittenGroup.visible = false;
    }
    if (this.walletActive && (hour < 9 || hour >= 17)) {
      this.walletActive = false;
      if (this.walletGroup) this.walletGroup.visible = false;
    }
  }

  private spawnFireworkBurst(rng: Rng): void {
    if (!this.fireworks) return;
    this.fireworks.visible = true;
    const cx = 44 + rng.range(-6, 6);
    const cy = 16 + rng.range(0, 6);
    const cz = 12 + rng.range(-4, 4);
    const palette = [
      [1, 0.75, 0.8],
      [1, 0.9, 0.6],
      [0.7, 0.85, 1],
      [0.85, 0.7, 1],
    ];
    const color = rng.pick(palette);
    const positions = this.fireworks.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colors = this.fireworks.geometry.getAttribute('color') as THREE.BufferAttribute;
    const burst = 70;
    for (let i = 0; i < burst; i += 1) {
      const index = this.fireworkCursor % this.fireworkParticles.length;
      this.fireworkCursor += 1;
      const p = this.fireworkParticles[index];
      const theta = rng.range(0, Math.PI * 2);
      const phi = rng.range(0, Math.PI);
      const speed = rng.range(3, 8);
      p.x = cx;
      p.y = cy;
      p.z = cz;
      p.vx = Math.sin(phi) * Math.cos(theta) * speed;
      p.vy = Math.cos(phi) * speed;
      p.vz = Math.sin(phi) * Math.sin(theta) * speed;
      p.life = rng.range(1.2, 2.0);
      positions.setXYZ(index, p.x, p.y, p.z);
      colors.setXYZ(index, color[0], color[1], color[2]);
    }
    positions.needsUpdate = true;
    colors.needsUpdate = true;
  }

  private updateFireworks(delta: number): void {
    if (!this.fireworks || !this.fireworks.visible) return;
    const positions = this.fireworks.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colors = this.fireworks.geometry.getAttribute('color') as THREE.BufferAttribute;
    let anyAlive = false;
    for (let i = 0; i < this.fireworkParticles.length; i += 1) {
      const p = this.fireworkParticles[i];
      if (p.life <= 0) continue;
      anyAlive = true;
      p.life -= delta;
      p.vy -= 5.2 * delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.z += p.vz * delta;
      positions.setXYZ(i, p.x, p.y, p.z);
      colors.setXYZ(i, colors.getX(i) * 0.995, colors.getY(i) * 0.99, colors.getZ(i) * 0.99);
    }
    positions.needsUpdate = true;
    colors.needsUpdate = true;
    if (!anyAlive) this.fireworks.visible = false;
  }

  /** 玩家附近可交互的世界事件物。 */
  nearestInteractable(playerPosition: THREE.Vector3): { kind: 'kitten' | 'wallet'; distance: number } | null {
    const candidates: { kind: 'kitten' | 'wallet'; distance: number }[] = [];
    if (this.kittenActive && this.kittenGroup) {
      const d = playerPosition.distanceTo(this.kittenGroup.position);
      if (d < 2.2) candidates.push({ kind: 'kitten', distance: d });
    }
    if (this.walletActive && this.walletGroup) {
      const d = playerPosition.distanceTo(this.walletGroup.position);
      if (d < 2.2) candidates.push({ kind: 'wallet', distance: d });
    }
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => a.distance - b.distance);
    return candidates[0];
  }

  /** 拾取事件物，返回提示文本。 */
  interact(kind: 'kitten' | 'wallet'): string {
    if (kind === 'kitten') {
      this.kittenActive = false;
      if (this.kittenGroup) this.kittenGroup.visible = false;
      return '小猫蹭了蹭你的手。脖子上的名牌写着「冈本陆」。';
    }
    this.walletActive = false;
    if (this.walletGroup) this.walletGroup.visible = false;
    const owner = this.walletOwnerId ? NPCS.find((n) => n.id === this.walletOwnerId) : undefined;
    return owner ? `捡到了钱包，名片上写着「${owner.name}」。` : '捡到了钱包。';
  }

  walletOwner(): string | null {
    return this.walletOwnerId;
  }

  clearWallet(): void {
    this.walletOwnerId = null;
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
  }
}
