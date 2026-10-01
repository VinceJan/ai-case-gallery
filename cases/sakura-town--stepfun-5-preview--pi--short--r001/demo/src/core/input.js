// 输入：键盘、鼠标拖动转视角、滚轮缩放
export class Input {
  constructor(canvas) {
    this.keys = new Set();
    this.moveX = 0; this.moveZ = 0;
    this.run = false;
    this.camYaw = Math.PI; this.camPitch = 0.32; this.camDist = 8;
    this.dragging = false;
    this.lastX = 0; this.lastY = 0;
    this.enabled = true;
    this.onPress = null; // (code) => {}

    addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      if (!this.keys.has(e.code) && this.onPress) this.onPress(e.code);
      this.keys.add(e.code);
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());

    canvas.addEventListener('pointerdown', (e) => {
      this.dragging = true;
      this.lastX = e.clientX; this.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointerup', (e) => {
      this.dragging = false;
      canvas.releasePointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!this.dragging || !this.enabled) return;
      const dx = e.clientX - this.lastX, dy = e.clientY - this.lastY;
      this.lastX = e.clientX; this.lastY = e.clientY;
      this.camYaw -= dx * 0.0052;
      this.camPitch = Math.max(0.06, Math.min(1.25, this.camPitch + dy * 0.004));
    });
    canvas.addEventListener('wheel', (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      this.camDist = Math.max(3.5, Math.min(16, this.camDist + e.deltaY * 0.012));
    }, { passive: false });
  }

  sample() {
    let x = 0, z = 0;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) z -= 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) z += 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;
    this.moveX = x; this.moveZ = z;
    this.run = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
  }
}
