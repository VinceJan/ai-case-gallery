import * as THREE from 'three';

type PointerState = {
  active: boolean;
  id: number | null;
  centerX: number;
  centerY: number;
  radius: number;
};

const ACTION_CODES = ['KeyE', 'Space', 'TouchAction'];

/**
 * 键鼠 + 触屏统一输入。
 * 移动：WASD/方向键/摇杆；交互：E / 触屏互动键；
 * 相机：拖拽环绕、滚轮缩放；面板：I/J/Esc/H。
 * 所有“按下沿”走队列，快速点按不会因采样错过而丢失。
 */
export class InputController {
  private readonly keys = new Set<string>();
  private readonly pressQueue: string[] = [];
  private readonly pointer = new THREE.Vector2();
  private readonly keyVector = new THREE.Vector2();
  private readonly pointerState: PointerState = {
    active: false,
    id: null,
    centerX: 0,
    centerY: 0,
    radius: 1,
  };
  private dragging = false;
  private lastDragX = 0;
  private dragDeltaYaw = 0;
  private zoomDelta = 0;

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) return;
    this.keys.add(event.code);
    this.pressQueue.push(event.code);
  };

  private readonly onKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
  };

  private readonly onStickDown = (event: PointerEvent) => {
    event.preventDefault();
    const rect = this.stick.getBoundingClientRect();
    this.pointerState.active = true;
    this.pointerState.id = event.pointerId;
    this.pointerState.centerX = rect.left + rect.width / 2;
    this.pointerState.centerY = rect.top + rect.height / 2;
    this.pointerState.radius = rect.width * 0.42;
    try {
      this.stick.setPointerCapture(event.pointerId);
    } catch {
      // 合成测试事件未必有可捕获的 pointer id。
    }
    this.updatePointer(event.clientX, event.clientY);
  };

  private readonly onStickMove = (event: PointerEvent) => {
    if (!this.pointerState.active || event.pointerId !== this.pointerState.id) return;
    event.preventDefault();
    this.updatePointer(event.clientX, event.clientY);
  };

  private readonly onStickUp = (event: PointerEvent) => {
    if (event.pointerId !== this.pointerState.id) return;
    event.preventDefault();
    this.pointerState.active = false;
    this.pointerState.id = null;
    this.pointer.set(0, 0);
    this.updateKnob();
  };

  private readonly onActionDown = (event: PointerEvent) => {
    event.preventDefault();
    this.pressQueue.push('TouchAction');
  };

  private readonly onCanvasDown = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    this.dragging = true;
    this.lastDragX = event.clientX;
  };

  private readonly onCanvasMove = (event: PointerEvent) => {
    if (!this.dragging) return;
    this.dragDeltaYaw -= (event.clientX - this.lastDragX) * 0.008;
    this.lastDragX = event.clientX;
  };

  private readonly onCanvasUp = () => {
    this.dragging = false;
  };

  private readonly onWheel = (event: WheelEvent) => {
    event.preventDefault();
    this.zoomDelta += Math.sign(event.deltaY) * 0.8;
  };

  constructor(
    private readonly stick: HTMLElement,
    private readonly knob: HTMLElement,
    private readonly actionButton: HTMLElement,
  ) {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.stick.addEventListener('pointerdown', this.onStickDown);
    this.stick.addEventListener('pointermove', this.onStickMove);
    this.stick.addEventListener('pointerup', this.onStickUp);
    this.stick.addEventListener('pointercancel', this.onStickUp);
    this.actionButton.addEventListener('pointerdown', this.onActionDown);

    const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');
    if (canvas) {
      canvas.addEventListener('pointerdown', this.onCanvasDown);
      window.addEventListener('pointermove', this.onCanvasMove);
      window.addEventListener('pointerup', this.onCanvasUp);
      canvas.addEventListener('wheel', this.onWheel, { passive: false });
    }
  }

  readMovement(target: THREE.Vector2): THREE.Vector2 {
    this.keyVector.set(0, 0);
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) this.keyVector.x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) this.keyVector.x += 1;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) this.keyVector.y -= 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) this.keyVector.y += 1;

    target.copy(this.keyVector).add(this.pointer);
    if (target.lengthSq() > 1) target.normalize();
    return target;
  }

  /** 交互键按下沿（每按消费一次，快速点按不丢失）。 */
  consumeAction(): boolean {    for (let i = 0; i < this.pressQueue.length; i += 1) {
      if (ACTION_CODES.includes(this.pressQueue[i])) {
        this.pressQueue.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  /** 指定按键的按下沿。 */
  consumeKey(code: string): boolean {
    const index = this.pressQueue.indexOf(code);
    if (index < 0) return false;
    this.pressQueue.splice(index, 1);
    return true;
  }

  /** 取出本帧累积的相机拖拽/缩放。 */
  consumeCamera(out: { yaw: number; zoom: number }): void {
    out.yaw = this.dragDeltaYaw;
    out.zoom = this.zoomDelta;
    this.dragDeltaYaw = 0;
    this.zoomDelta = 0;
  }

  isKeyHeld(code: string): boolean {
    return this.keys.has(code);
  }

  /** 清空未消费的按键队列（切场景时避免残留输入）。 */
  clearPresses(): void {
    this.pressQueue.length = 0;
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.stick.removeEventListener('pointerdown', this.onStickDown);
    this.stick.removeEventListener('pointermove', this.onStickMove);
    this.stick.removeEventListener('pointerup', this.onStickUp);
    this.stick.removeEventListener('pointercancel', this.onStickUp);
    this.actionButton.removeEventListener('pointerdown', this.onActionDown);
    const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');
    if (canvas) {
      canvas.removeEventListener('pointerdown', this.onCanvasDown);
      canvas.removeEventListener('wheel', this.onWheel);
    }
    window.removeEventListener('pointermove', this.onCanvasMove);
    window.removeEventListener('pointerup', this.onCanvasUp);
  }

  private updatePointer(clientX: number, clientY: number): void {
    const dx = clientX - this.pointerState.centerX;
    const dy = clientY - this.pointerState.centerY;
    this.pointer.set(dx / this.pointerState.radius, dy / this.pointerState.radius);
    if (this.pointer.lengthSq() > 1) this.pointer.normalize();
    this.updateKnob();
  }

  private updateKnob(): void {
    const distance = 38;
    this.knob.style.transform = `translate(calc(-50% + ${this.pointer.x * distance}px), calc(-50% + ${this.pointer.y * distance}px))`;
  }
}
