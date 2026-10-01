// 键盘 / 鼠标输入
export class Input {
  constructor(dom) {
    this.dom = dom;
    this.keys = new Set();
    this.pressed = new Set();   // 本帧刚按下
    this.dragging = false;
    this.dragDX = 0; this.dragDY = 0;
    this.wheel = 0;
    this.enabled = true;
    this.pointerLocked = false;
    this._last = { x: 0, y: 0 };
    this._blockers = new Set();

    // 被面板挡住时仍要放行 UI 键，否则面板只能用鼠标关掉
    this.uiKeys = new Set(['escape', 'j', 'm', 'u', 'p', '1', '2', '3', '4']);

    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (this._blockers.size && !this.uiKeys.has(k)) return;
      if (!this.keys.has(k)) this.pressed.add(k);
      this.keys.add(k);
      if ([' ', 'tab', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => { this.keys.delete(e.key.toLowerCase()); });
    window.addEventListener('blur', () => this.keys.clear());

    dom.addEventListener('mousedown', (e) => {
      if (e.button !== 0 && e.button !== 2) return;
      this.dragging = true;
      this._last.x = e.clientX; this._last.y = e.clientY;
    });
    window.addEventListener('mouseup', () => { this.dragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (this.pointerLocked) { this.dragDX += e.movementX; this.dragDY += e.movementY; return; }
      if (!this.dragging) return;
      this.dragDX += e.clientX - this._last.x;
      this.dragDY += e.clientY - this._last.y;
      this._last.x = e.clientX; this._last.y = e.clientY;
    });
    dom.addEventListener('wheel', (e) => { this.wheel += e.deltaY; e.preventDefault(); }, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  /** 阻止游戏按键（面板打开时） */
  block(v) { if (v) this._blockers.add('ui'); else this._blockers.delete('ui'); }

  down(...ks) { return ks.some((k) => this.keys.has(k)); }
  hit(...ks) { return ks.some((k) => this.pressed.has(k)); }

  axis() {
    let x = 0, y = 0;
    if (this.down('a', 'arrowleft')) x -= 1;
    if (this.down('d', 'arrowright')) x += 1;
    if (this.down('w', 'arrowup')) y += 1;
    if (this.down('s', 'arrowdown')) y -= 1;
    const l = Math.hypot(x, y);
    return l > 0 ? { x: x / l, y: y / l, len: 1 } : { x: 0, y: 0, len: 0 };
  }

  endFrame() {
    this.pressed.clear();
    this.dragDX = 0; this.dragDY = 0; this.wheel = 0;
  }
}
