import * as THREE from 'three';

export class PhotoSystem {
  constructor(renderer, scene, camera, gameState, railway, npcSystem, timeSystem, audio, ui) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.gameState = gameState;
    this.railway = railway;
    this.npcSystem = npcSystem;
    this.timeSystem = timeSystem;
    this.audio = audio;
    this.ui = ui;

    this._frustum = new THREE.Frustum();
    this._projScreenMatrix = new THREE.Matrix4();
    this._tmpVec = new THREE.Vector3();
  }

  analyzeFrame() {
    this.camera.updateMatrixWorld();
    this._projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(this._projScreenMatrix);

    const tags = [];
    const labels = [];

    const railStatus = this.railway.getStatus();
    if (railStatus.isVisibleInTown) {
      this._tmpVec.set(railStatus.trainX, 2.0, this.railway.trackZ);
      if (this.camera.position.distanceTo(this._tmpVec) < 78 && this._frustum.containsPoint(this._tmpVec)) {
        tags.push('train');
        labels.push('樱花电车');
      }
    }

    this._tmpVec.set(45.5, 4.0, -7.0);
    if (this.camera.position.distanceTo(this._tmpVec) < 70 && this._frustum.containsPoint(this._tmpVec)) {
      tags.push('shrine');
      labels.push('樱森神社');
    }

    this._tmpVec.set(29.0, 1.5, 2.1);
    if (this.camera.position.distanceTo(this._tmpVec) < 55 && this._frustum.containsPoint(this._tmpVec)) {
      tags.push('bridge');
      labels.push('樱川红桥');
    }

    for (const npc of this.npcSystem.npcs) {
      this._tmpVec.set(npc.position.x, npc.position.y + 1.0, npc.position.z);
      if (this.camera.position.distanceTo(this._tmpVec) < 28 && this._frustum.containsPoint(this._tmpVec)) {
        tags.push(`npc_${npc.id}`);
        labels.push(npc.name);
        break;
      }
    }

    if (this.timeSystem.hour >= 16.5 && this.timeSystem.hour <= 19.2) {
      tags.push('sunset');
      labels.push('黄昏暮色');
    }

    return { tags, labels };
  }

  capturePhoto() {
    this.audio.playCameraShutter();
    this.ui.triggerCameraFlash();
    const analysis = this.analyzeFrame();

    this.renderer.render(this.scene, this.camera);
    const srcCanvas = this.renderer.domElement;
    const out = document.createElement('canvas');
    out.width = 480;
    out.height = 300;
    const ctx = out.getContext('2d');
    const srcRatio = srcCanvas.width / srcCanvas.height;
    const dstRatio = out.width / out.height;
    let sx = 0, sy = 0, sw = srcCanvas.width, sh = srcCanvas.height;
    if (srcRatio > dstRatio) { sw = srcCanvas.height * dstRatio; sx = (srcCanvas.width - sw) / 2; }
    else { sh = srcCanvas.width / dstRatio; sy = (srcCanvas.height - sh) / 2; }
    ctx.drawImage(srcCanvas, sx, sy, sw, sh, 0, 0, out.width, out.height);

    ctx.fillStyle = 'rgba(255, 198, 120, 0.92)';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`DAY ${this.timeSystem.day}  ${this.timeSystem.getFormattedTime()}`, out.width - 135, out.height - 14);

    const dataUrl = out.toDataURL('image/jpeg', 0.84);
    const caption = analysis.labels.length > 0 ? analysis.labels.slice(0, 2).join(' · ') : '樱花小镇的午后风景';
    const photo = {
      dataUrl, caption,
      timeLabel: `第 ${this.timeSystem.day} 天 ${this.timeSystem.getFormattedTime()}`,
      tags: analysis.tags,
    };
    this.gameState.photos.unshift(photo);
    if (this.gameState.photos.length > 18) this.gameState.photos.pop();

    this.ui.showToast(
      analysis.tags.includes('train')
        ? '📸 拍到了「樱花电车」驶过的绝佳瞬间！快去给晴人看看吧'
        : `📸 已保存照片「${caption}」到小镇相册`
    );
    return photo;
  }
}
