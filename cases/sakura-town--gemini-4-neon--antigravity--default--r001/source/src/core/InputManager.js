export class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.orbitDeltaX = 0;
    this.orbitDeltaY = 0;
    this.zoomDelta = 0;
    this.listeners = new Map();

    this._onKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      const code = e.code;
      if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
        e.preventDefault();
      }
      if (!this.keys.has(code)) {
        this.keys.add(code);
        this._emit(code);
      }
    };

    this._onKeyUp = (e) => { this.keys.delete(e.code); };
    this._onBlur = () => { this.keys.clear(); this.isDragging = false; };

    this._onMouseDown = (e) => {
      if (e.target !== this.canvas) return;
      if (e.button === 0 || e.button === 2) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
    };

    this._onMouseMove = (e) => {
      if (!this.isDragging) return;
      this.orbitDeltaX += e.clientX - this.lastMouseX;
      this.orbitDeltaY += e.clientY - this.lastMouseY;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    };

    this._onMouseUp = () => { this.isDragging = false; };
    this._onWheel = (e) => { if (e.target === this.canvas) this.zoomDelta += Math.sign(e.deltaY); };
    this._onContextMenu = (e) => { if (e.target === this.canvas) e.preventDefault(); };

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);
    window.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('wheel', this._onWheel, { passive: true });
    window.addEventListener('contextmenu', this._onContextMenu);
  }

  onKeyPress(code, callback) {
    if (!this.listeners.has(code)) this.listeners.set(code, []);
    this.listeners.get(code).push(callback);
  }

  _emit(code) {
    const list = this.listeners.get(code);
    if (!list) return;
    for (const fn of list) fn();
  }

  isDown(code) { return this.keys.has(code); }

  getMoveAxes() {
    let forward = 0;
    let right = 0;
    if (this.isDown('KeyW') || this.isDown('ArrowUp')) forward += 1;
    if (this.isDown('KeyS') || this.isDown('ArrowDown')) forward -= 1;
    if (this.isDown('KeyD') || this.isDown('ArrowRight')) right += 1;
    if (this.isDown('KeyA') || this.isDown('ArrowLeft')) right -= 1;
    return { forward, right };
  }

  getKeyCameraTurn() {
    let turn = 0;
    if (this.isDown('KeyQ')) turn += 1;
    if (this.isDown('KeyR')) turn -= 1;
    return turn;
  }

  consumeOrbit() {
    const dx = this.orbitDeltaX;
    const dy = this.orbitDeltaY;
    const zoom = this.zoomDelta;
    this.orbitDeltaX = 0;
    this.orbitDeltaY = 0;
    this.zoomDelta = 0;
    return { dx, dy, zoom };
  }
}
