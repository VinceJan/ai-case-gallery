import * as THREE from 'three';
import { createToonMaterial } from '../art/ToonMaterials.js';

export class FishingMiniGame {
  constructor(scene, gameState, audio, ui) {
    this.scene = scene;
    this.gameState = gameState;
    this.audio = audio;
    this.ui = ui;

    this.active = false;
    this.phase = 'IDLE';
    this.waitTimer = 0;
    this.cursorPos = 0;
    this.cursorDir = 1;
    this.sweetStart = 0.36;
    this.sweetEnd = 0.64;
    this.castCount = 0;

    this.rigGroup = new THREE.Group();
    this.rigGroup.visible = false;

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.032, 2.8, 6), createToonMaterial(0x7c5334));
    rod.position.set(26.7, 0.52, 14.0);
    rod.rotation.z = -1.05;
    this.rigGroup.add(rod);

    this.bobber = new THREE.Group();
    const bTop = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), createToonMaterial(0xe84d52));
    bTop.position.y = 0.04;
    const bBot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), createToonMaterial(0xfffaf2));
    bBot.position.y = -0.03;
    this.bobber.add(bTop, bBot);
    this.bobber.position.set(29.2, -1.06, 14.0);
    this.rigGroup.add(this.bobber);

    this.ripple = new THREE.Mesh(
      new THREE.RingGeometry(0.18, 0.28, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    );
    this.ripple.rotation.x = -Math.PI / 2;
    this.ripple.position.set(29.2, -1.08, 14.0);
    this.rigGroup.add(this.ripple);

    this.line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(27.85, 1.2, 14.0), new THREE.Vector3(29.2, -1.02, 14.0)]),
      new THREE.LineBasicMaterial({ color: 0xf4f8fc, transparent: true, opacity: 0.75 })
    );
    this.rigGroup.add(this.line);
    this.scene.add(this.rigGroup);
  }

  start() {
    this.active = true;
    this.rigGroup.visible = true;
    this._startNewCast();
    this.ui.showFishingUI(true);
  }

  stop() {
    this.active = false;
    this.phase = 'IDLE';
    this.rigGroup.visible = false;
    this.ui.showFishingUI(false);
  }

  _startNewCast() {
    this.phase = 'WAITING';
    this.waitTimer = 2.0 + Math.random() * 2.6;
    this.cursorPos = 0.05;
    this.cursorDir = 1;
    this.audio.playSplash();
    this.ui.updateFishingUI('WAITING', 0, '浮漂轻轻晃动，静静等待鱼儿上钩…');
  }

  triggerPull() {
    if (!this.active) return;
    if (this.phase === 'WAITING') {
      this.ui.showToast('提竿太早啦，鱼儿还没咬钩呢！重新抛竿…');
      this._startNewCast();
      return;
    }
    if (this.phase === 'BITING') {
      if (this.cursorPos >= this.sweetStart && this.cursorPos <= this.sweetEnd) {
        this._resolveCatch();
      } else {
        this.audio.playSplash();
        this.ui.showToast('差一点点，鱼儿摆尾游走啦！再试一次吧');
        this._startNewCast();
      }
    }
  }

  _resolveCatch() {
    this.castCount += 1;
    this.audio.playSuccessChime();

    const bellTask = this.gameState.tasks.lost_bell;
    if (bellTask.status === 'active' && !this.gameState.hasItem('brass_bell') && (this.castCount >= 2 || Math.random() < 0.55)) {
      this.gameState.addItem('brass_bell', 1);
      this.ui.showToast('✨ 钓到了闪闪发亮的「小悠的电车铜铃」！快拿去还给小悠吧');
      this._startNewCast();
      return;
    }

    const roll = Math.random();
    let itemId = 'ayu_fish';
    let msg = '🐟 钓到了银亮的「樱川香鱼」！';
    if (roll > 0.88) { itemId = 'koi_fish'; msg = '✨ 好运气！河底跃出一尾华丽的「锦鲤」！'; }
    else if (roll > 0.6) { itemId = 'yamame_fish'; msg = '🐟 钓到了清流里的「山女鱼」！'; }
    else if (roll > 0.42) { itemId = 'river_crab'; msg = '🦀 钓起一只举着钳子的「河岸小螃蟹」！'; }
    this.gameState.addItem(itemId, 1);
    this.ui.showToast(msg);
    this._startNewCast();
  }

  update(dt) {
    if (!this.active) return;
    const now = performance.now() * 0.001;
    if (this.phase === 'WAITING') {
      this.waitTimer -= dt;
      this.bobber.position.y = -1.06 + Math.sin(now * 3.5) * 0.04;
      const rScale = 0.8 + ((now * 0.6) % 1) * 0.9;
      this.ripple.scale.setScalar(rScale);
      this.ripple.material.opacity = Math.max(0, 0.7 - ((now * 0.6) % 1) * 0.7);
      if (this.waitTimer <= 0) {
        this.phase = 'BITING';
        this.cursorPos = 0.05;
        this.cursorDir = 1;
        this.audio.playSplash();
        this.ui.updateFishingUI('BITING', this.cursorPos, '⚡ 浮漂沉下去了！看准时机提竿！');
      }
    } else if (this.phase === 'BITING') {
      this.bobber.position.y = -1.2 + Math.sin(now * 24) * 0.06;
      this.ripple.scale.setScalar(1.3 + Math.sin(now * 16) * 0.35);
      this.ripple.material.opacity = 0.85;
      this.cursorPos += this.cursorDir * dt * 1.05;
      if (this.cursorPos >= 0.98) { this.cursorPos = 0.98; this.cursorDir = -1; }
      else if (this.cursorPos <= 0.02) { this.cursorPos = 0.02; this.cursorDir = 1; }
      this.ui.updateFishingUI('BITING', this.cursorPos, '⚡ 鱼儿咬钩了！在樱粉色区域按下 E 或 Space！');
    }
  }
}
