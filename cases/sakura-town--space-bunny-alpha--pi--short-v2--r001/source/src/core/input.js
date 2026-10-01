/**
 * 输入：键盘 / 鼠标（第三人称轨道相机 + 交互射线）
 */
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressed = new Set(); // 本帧刚按下（由 endFrame 清空）
    this.mouse = { x: 0, y: 0, dx: 0, dy: 0, down: false, clicked: false, wheel: 0 };
    this.pointerLocked = false;
    this.enabled = true;
    /** 是否允许申请指针锁定（点击画面后自由转视角） */
    this.canPointerLock = true;
    /** 锁定失败时退回「按住拖拽转视角」 */
    this.dragLook = false;
    this.sensitivity = 1.0;
    this.invertY = false;
    this._lastX = 0;
    this._lastY = 0;
    this._lockPending = false;
    /** 触摸虚拟摇杆状态 */
    this.stick = { active: false, x: 0, y: 0, id: -1 };
    this._blockers = new Set();

    this._onKeyDown = (e) => {
      // 只在「真正能打字的输入框」里让出按键。
      // range / checkbox 这类控件拿到焦点时依然要能响应 Esc / J / H / K。
      const tag = e.target && e.target.tagName;
      if (tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
      if (tag === 'INPUT') {
        const t = (e.target.type || 'text').toLowerCase();
        if (t === 'text' || t === 'search' || t === 'email' || t === 'password' || t === 'url' || t === 'tel') return;
      }
      const code = e.code;
      if (!this.keys.has(code)) this.pressed.add(code);
      this.keys.add(code);
      if (this._shouldPreventDefault(code)) e.preventDefault();
    };
    this._onKeyUp = (e) => {
      this.keys.delete(e.code);
    };
    this._onBlur = () => {
      this.keys.clear();
      this.mouse.down = false;
    };

    window.addEventListener('keydown', this._onKeyDown, { passive: false });
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('mousemove', (e) => {
      if (this.pointerLocked) {
        // 指针锁定：用 movementX/Y（不受屏幕边界限制，可以无限转）
        this.mouse.dx += (e.movementX || 0) * this.sensitivity;
        this.mouse.dy += (e.movementY || 0) * this.sensitivity * (this.invertY ? -1 : 1);
      } else if (this.mouse.down && this.dragLook) {
        // 没锁定时：按住拖拽也能转
        this.mouse.dx += (e.clientX - this._lastX) * this.sensitivity;
        this.mouse.dy += (e.clientY - this._lastY) * this.sensitivity * (this.invertY ? -1 : 1);
      }
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this._lastX = e.clientX;
      this._lastY = e.clientY;
    });

    canvas.addEventListener('mousedown', (e) => {
      this._lastX = e.clientX;
      this._lastY = e.clientY;
      if (e.button === 0) {
        this.mouse.down = true;
        this._tryLock();
      }
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouse.down = false;
    });
    window.addEventListener('click', (e) => {
      if (e.target === canvas) this.mouse.clicked = true;
    });
    canvas.addEventListener(
      'wheel',
      (e) => {
        this.mouse.wheel += Math.sign(e.deltaY);
        e.preventDefault();
      },
      { passive: false },
    );
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === canvas;
      this.onLockChange?.(this.pointerLocked);
    });
    // 锁定失败（例如浏览器限制）时不要报错，静默退回拖拽模式
    document.addEventListener('pointerlockerror', () => {
      this.pointerLocked = false;
      this.dragLook = true;
      this._lockPending = false;
    });

    this._bindTouch(canvas);
  }

  _shouldPreventDefault(code) {
    return (
      code === 'Space' ||
      code === 'Tab' ||
      code.startsWith('Arrow') ||
      (code === 'KeyJ' && this.enabled)
    );
  }

  _bindTouch(canvas) {
    const touches = new Map();
    const stickOrigin = { x: 0, y: 0 };

    const onStart = (e) => {
      for (const t of e.changedTouches) {
        if (t.clientX < window.innerWidth * 0.45 && !this.stick.active) {
          this.stick.active = true;
          this.stick.id = t.identifier;
          this.stick.x = 0;
          this.stick.y = 0;
          stickOrigin.x = t.clientX;
          stickOrigin.y = t.clientY;
          touches.set(t.identifier, 'stick');
        } else {
          touches.set(t.identifier, 'look');
          this.mouse.dx += (t.clientX - window.innerWidth / 2) * 0.25;
          this.mouse.dy += (t.clientY - window.innerHeight / 2) * 0.25;
        }
      }
      e.preventDefault();
    };
    const onMove = (e) => {
      for (const t of e.changedTouches) {
        const role = touches.get(t.identifier);
        if (role === 'stick' && t.identifier === this.stick.id) {
          const dx = t.clientX - stickOrigin.x;
          const dy = t.clientY - stickOrigin.y;
          const len = Math.hypot(dx, dy) || 1;
          const clamped = Math.min(len, 70) / 70;
          this.stick.x = (dx / len) * clamped;
          this.stick.y = (dy / len) * clamped;
        } else if (role === 'look') {
          this.mouse.dx += t.clientX - (this._lastLookX ?? t.clientX);
          this.mouse.dy += t.clientY - (this._lastLookY ?? t.clientY);
        }
        if (role) {
          if (role === 'look') {
            this._lastLookX = t.clientX;
            this._lastLookY = t.clientY;
          }
        }
      }
      e.preventDefault();
    };
    const onEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.stick.id) {
          this.stick.active = false;
          this.stick.x = 0;
          this.stick.y = 0;
          this.stick.id = -1;
        }
        touches.delete(t.identifier);
      }
    };
    canvas.addEventListener('touchstart', onStart, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onEnd);
    canvas.addEventListener('touchcancel', onEnd);
  }

  _tryLock() {
    if (!this.canPointerLock || this.pointerLocked || this._lockPending) return;
    this._lockPending = true;
    this.requestPointerLock();
    // 有些环境下 requestPointerLock 不会触发 change/error 事件
    setTimeout(() => { this._lockPending = false; }, 400);
  }

  requestPointerLock() {
    if (!this.canPointerLock || this.pointerLocked) return;
    this.dragLook = true;
    const p = this.canvas.requestPointerLock?.({ unadjustedMovement: false });
    if (p && typeof p.catch === 'function') p.catch(() => { this.dragLook = true; });
  }

  exitPointerLock() {
    if (this.pointerLocked) document.exitPointerLock?.();
  }

  /** UI 打开时屏蔽世界输入 */
  block(name) {
    this._blockers.add(name);
    this.stick.x = 0;
    this.stick.y = 0;
    this.stick.active = false;
  }

  unblock(name) {
    this._blockers.delete(name);
  }

  get blocked() {
    return this._blockers.size > 0;
  }

  down(code) {
    return !this.blocked && this.keys.has(code);
  }

  /** 移动轴：x = 右，y = 前（-1 ~ 1） */
  moveAxis() {
    let x = 0;
    let y = 0;
    if (!this.blocked) {
      if (this.down('KeyW') || this.down('ArrowUp')) y += 1;
      if (this.down('KeyS') || this.down('ArrowDown')) y -= 1;
      if (this.down('KeyD') || this.down('ArrowRight')) x += 1;
      if (this.down('KeyA') || this.down('ArrowLeft')) x -= 1;
      if (this.stick.active) {
        x += this.stick.x;
        y -= this.stick.y;
      }
    }
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y, len: Math.min(len, 1) };
  }

  justPressed(code) {
    if (this.blocked) {
      // UI 打开时仍然允许 Esc / 关闭类按键
      if (code !== 'Escape' && code !== 'KeyJ') return false;
    }
    return this.pressed.has(code);
  }

  /** 不理会屏蔽的按键检测（UI 自己处理输入时用） */
  justPressedRaw(code) {
    return this.pressed.has(code);
  }

  get hit() {
    return this.mouse.clicked;
  }

  /** 每帧末尾调用，清空瞬时状态 */
  endFrame() {
    this.pressed.clear();
    this.mouse.dx = 0;
    this.mouse.dy = 0;
    this.mouse.wheel = 0;
    this.mouse.clicked = false;
  }

  dispose() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('blur', this._onBlur);
  }
}
