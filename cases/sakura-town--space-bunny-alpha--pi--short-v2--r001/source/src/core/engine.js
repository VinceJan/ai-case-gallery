/**
 * 渲染引擎骨架：renderer / scene / camera / 主循环 / 尺寸自适应
 * 只做“引擎层”的事，天光与天空在 world/sky.js。
 */
import * as THREE from 'three';
import { clamp } from './utils.js';

export class Engine {
  constructor(canvas) {
    this.canvas = canvas;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // 赛璐璐画面不需要电影级 tone mapping：关掉它颜色更干净、明暗更硬朗
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.setClearColor(0xbfd9ef, 1);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xbfd9ef, 150, 460);

    this.camera = new THREE.PerspectiveCamera(52, 1, 0.35, 900);
    this.camera.position.set(0, 8, 14);

    this.clock = new THREE.Clock();
    this.elapsed = 0;
    this.frame = 0;
    this.fps = 60;
    this._fpsAccum = 0;
    this._fpsFrames = 0;

    /** @type {Set<(dt:number)=>void>} */
    this._updaters = new Set();
    /** @type {Set<()=>void>} */
    this._renderers = new Set();
    this._paused = false;
    this._timeScale = 1;

    this._onResize = this.resize.bind(this);
    window.addEventListener('resize', this._onResize);
    window.addEventListener('orientationchange', this._onResize);
    this.resize();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.clock.getDelta();
    });
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this._emitResize();
  }

  onResize(fn) {
    this._resizeFns = this._resizeFns || new Set();
    this._resizeFns.add(fn);
    return () => this._resizeFns.delete(fn);
  }

  _emitResize() {
    if (!this._resizeFns) return;
    for (const fn of this._resizeFns) fn(window.innerWidth, window.innerHeight);
  }

  /** 注册每帧更新回调（dt 已乘 timeScale） */
  onUpdate(fn) {
    this._updaters.add(fn);
    return () => this._updaters.delete(fn);
  }

  /** 注册渲染前回调（用于调试叠加等） */
  onRender(fn) {
    this._renderers.add(fn);
    return () => this._renderers.delete(fn);
  }

  setTimeScale(s) {
    this._timeScale = clamp(s, 0, 10);
  }

  setPaused(p) {
    this._paused = p;
  }

  get paused() {
    return this._paused;
  }

  start() {
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      const real = this.clock.getDelta();
      const raw = Math.min(real, 0.05);
      const dt = this._paused ? 0 : raw * this._timeScale;
      this.elapsed += dt;
      this.frame++;

      this._fpsAccum += real;
      this._fpsFrames++;
      if (this._fpsAccum >= 0.5) {
        this.fps = Math.round(this._fpsFrames / this._fpsAccum);
        this._fpsAccum = 0;
        this._fpsFrames = 0;
      }

      for (const fn of this._updaters) fn(dt, this.elapsed);
      for (const fn of this._renderers) fn(dt, this.elapsed);
      this.renderer.render(this.scene, this.camera);
    };
    this._raf = requestAnimationFrame(tick);
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
    window.removeEventListener('resize', this._onResize);
  }

  dispose() {
    this.stop();
    this.renderer.dispose();
  }
}
