// 键盘 / 鼠标输入
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = Object.create(null);
    this.pressed = Object.create(null);   // 本帧刚按下（边沿）
    this.mouse = { dx: 0, dy: 0, down: false, wheel: 0, x: 0, y: 0 };
    this._dragging = false;
    this._listeners = [];

    const onKeyDown = (e) => {
      if (e.repeat) return;
      const k = e.code;
      // 防止 Tab/空格滚动页面
      if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(k)) e.preventDefault();
      this.keys[k] = true;
      this.pressed[k] = true;
    };
    const onKeyUp = (e) => { this.keys[e.code] = false; };
    const onBlur = () => { this.keys = Object.create(null); this._dragging = false; };

    const onDown = (e) => {
      if (e.button === 0) { this._dragging = true; this.mouse.down = true; }
      this.mouse.x = e.clientX; this.mouse.y = e.clientY;
    };
    const onUp = () => { this._dragging = false; this.mouse.down = false; };
    const onMove = (e) => {
      if (this._dragging) {
        this.mouse.dx += e.movementX || 0;
        this.mouse.dy += e.movementY || 0;
      }
      this.mouse.x = e.clientX; this.mouse.y = e.clientY;
    };
    const onWheel = (e) => { this.mouse.wheel += Math.sign(e.deltaY); e.preventDefault(); };
    const onContext = (e) => e.preventDefault();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('contextmenu', onContext);

    this._listeners = [
      [window, 'keydown', onKeyDown], [window, 'keyup', onKeyUp], [window, 'blur', onBlur],
      [canvas, 'mousedown', onDown], [window, 'mouseup', onUp], [window, 'mousemove', onMove],
      [canvas, 'wheel', onWheel], [canvas, 'contextmenu', onContext],
    ];
  }

  down(code) { return !!this.keys[code]; }
  justPressed(code) { return !!this.pressed[code]; }
  /** 消费一次按键沿（防止同一次按键跨帧触发两次） */
  consume(code) { this.pressed[code] = false; }
  /** 组合键查询 */
  anyDown(codes) { return codes.some((c) => this.keys[c]); }

  /** 每帧末调用：清理边沿状态 */
  endFrame() {
    this.pressed = Object.create(null);
    this.mouse.dx = 0; this.mouse.dy = 0; this.mouse.wheel = 0;
  }

  dispose() {
    for (const [t, ev, fn] of this._listeners) t.removeEventListener(ev, fn);
  }
}
