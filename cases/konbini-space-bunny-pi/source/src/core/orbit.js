// Damped orbit camera for the diorama. Drag to spin, wheel/pinch to zoom,
// right-drag (or two fingers) to slide. No on-screen UI at all.
import * as THREE from 'three';

export class Orbit {
  constructor(camera, dom, opts = {}) {
    this.camera = camera;
    this.dom = dom;
    this.target = new THREE.Vector3(...(opts.target || [0, 1.2, -2]));
    this.minR = opts.minR ?? 8;
    this.maxR = opts.maxR ?? 52;
    this.minPhi = opts.minPhi ?? 0.16;
    this.maxPhi = opts.maxPhi ?? 1.46;
    this.enabled = true;
    this.R = opts.radius ?? 27;
    this.theta = opts.theta ?? 0.72;   // azimuth, 0 = +Z
    this.phi = opts.phi ?? 1.06;       // polar from +Y
    this.vR = 0; this.vT = 0; this.vP = 0;
    this.panV = new THREE.Vector3();
    this._drag = null;
    this.idle = 0;
    this._bind();
    this.apply(1);
  }

  setPose(R, theta, phi) {
    if (R != null) this.R = R;
    if (theta != null) this.theta = theta;
    if (phi != null) this.phi = phi;
    this.vR = this.vT = this.vP = 0;
    this.apply(1);
  }

  _bind() {
    const d = this.dom;
    const pointers = new Map();
    let lastDist = 0;
    const onDown = (e) => {
      if (!this.enabled) return;
      d.setPointerCapture?.(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      this._drag = { x: e.clientX, y: e.clientY, pan: e.button === 2 || e.shiftKey || e.altKey };
      this.idle = 0;
    };
    const onMove = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (lastDist) this.vR -= (dist - lastDist) * 0.012 * this.R;
        lastDist = dist;
        return;
      }
      if (!this._drag) return;
      const dx = e.clientX - this._drag.x, dy = e.clientY - this._drag.y;
      this._drag.x = e.clientX; this._drag.y = e.clientY;
      if (this._drag.pan) this._pan(dx, dy);
      else {
        this.vT -= dx * 0.0052;
        this.vP -= dy * 0.0045;
      }
      this.idle = 0;
    };
    const onUp = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastDist = 0;
      if (!pointers.size) this._drag = null;
    };
    d.addEventListener('pointerdown', onDown);
    d.addEventListener('pointermove', onMove);
    d.addEventListener('pointerup', onUp);
    d.addEventListener('pointercancel', onUp);
    d.addEventListener('pointerleave', onUp);
    d.addEventListener('contextmenu', (e) => e.preventDefault());
    d.addEventListener('wheel', (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      this.vR += Math.sign(e.deltaY) * Math.min(1, Math.abs(e.deltaY) / 100) * this.R * 0.14;
      this.idle = 0;
    }, { passive: false });
  }

  _pan(dx, dy) {
    const scale = this.R * 0.0016;
    const right = new THREE.Vector3(Math.cos(this.theta), 0, -Math.sin(this.theta));
    const fwd = new THREE.Vector3(Math.sin(this.theta), 0, Math.cos(this.theta));
    this.panV.addScaledVector(right, -dx * scale);
    this.panV.addScaledVector(fwd, -dy * scale);
  }

  update(dt) {
    const damp = Math.pow(0.0025, dt);      // frame-rate independent smoothing
    this.R += this.vR; this.theta += this.vT; this.phi += this.vP;
    this.vR *= damp; this.vT *= damp; this.vP *= damp;
    this.target.add(this.panV.multiplyScalar(0.55));
    this.panV.multiplyScalar(damp);
    // limits
    const cl = (v, a, b) => (v < a ? a : v > b ? b : v);
    this.R = cl(this.R, this.minR, this.maxR);
    this.phi = cl(this.phi, this.minPhi, this.maxPhi);
    if (this.R <= this.minR || this.R >= this.maxR) this.vR = 0;
    this.target.x = cl(this.target.x, -13, 13);
    this.target.y = cl(this.target.y, -1, 8);
    this.target.z = cl(this.target.z, -13, 13);
    this.idle += dt;
    this.apply();
  }

  apply() {    const sp = Math.sin(this.phi), cp = Math.cos(this.phi);
    this.camera.position.set(
      this.target.x + this.R * sp * Math.sin(this.theta),
      this.target.y + this.R * cp,
      this.target.z + this.R * sp * Math.cos(this.theta)
    );
    this.camera.lookAt(this.target);
  }
}
