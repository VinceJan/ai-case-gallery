// 天气：晴天 / 阴天 / 雨（可选增强）
import * as THREE from 'three';
import { toon, basic, addOutline } from '../render/toon.js';
import { PAL, mixHex } from '../render/palette.js';
import { makeRNG, clamp01, lerp, damp, smoothstep, TAU } from '../util/math.js';
import { GeoBuf, mergeBuf } from '../world/geom.js';
import { setRoadWet } from '../world/roads.js';

const RAIN_VERT = /* glsl */`
uniform float uTime;
uniform vec3 uCam;
uniform float uSpeed;
attribute float aOffset;
attribute float aLen;
varying float vA;
void main(){
  vec3 p = position;
  float h = 26.0;
  p.y = mod(p.y - uTime * uSpeed * (0.7 + aOffset * 0.6), h);
  vec3 wp = vec3(uCam.x + p.x, p.y - 2.0, uCam.z + p.z);
  wp.x += sin(uTime * 0.4 + aOffset * 6.28) * 0.6;
  vec4 mv = modelViewMatrix * vec4(wp, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (7.0 + aLen * 5.0) * (16.0 / max(2.0, -mv.z));
  vA = 1.0 - smoothstep(16.0, 34.0, -mv.z);
}`;
const RAIN_FRAG = /* glsl */`
varying float vA;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  // 竖直雨丝
  float a = smoothstep(0.5, 0.08, abs(d.x) * 3.2) * smoothstep(0.5, 0.02, abs(d.y));
  gl_FragColor = vec4(0.82, 0.89, 0.98, a * 0.55 * vA);
}`;

export class Weather {
  constructor(scene) {
    this.scene = scene;
    this.state = 'clear';
    this.target = 0;          // 0..1 雨量
    this.rain = 0;
    this.clouds = 0;
    this.forced = false;
    this.nextChange = 3;
    this.wind = 0.4;
    this.rng = makeRNG(9021);
    this.buildRain();
  }

  buildRain() {
    const N = 2600;
    const pos = new Float32Array(N * 3);
    const off = new Float32Array(N);
    const len = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (this.rng() - 0.5) * 40;
      pos[i * 3 + 1] = this.rng() * 26;
      pos[i * 3 + 2] = (this.rng() - 0.5) * 40;
      off[i] = this.rng();
      len[i] = 0.5 + this.rng() * 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aOffset', new THREE.BufferAttribute(off, 1));
    g.setAttribute('aLen', new THREE.BufferAttribute(len, 1));
    this.rainMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uSpeed: { value: 17 } },
      vertexShader: RAIN_VERT, fragmentShader: RAIN_FRAG,
      transparent: true, depthWrite: false,
    });
    this.points = new THREE.Points(g, this.rainMat);
    this.points.frustumCulled = false;
    this.points.visible = false;
    this.scene.add(this.points);
  }

  forceRain() { this.forced = true; this.state = 'rain'; this.target = 1; }

  get label() {
    return this.state === 'rain' ? '雨' : this.clouds > 0.5 ? '阴' : '晴';
  }

  update(dt, time, camPos) {
    // 天气缓慢变化
    this.nextChange -= dt;
    if (this.nextChange <= 0 && !this.forced) {
      this.nextChange = 40 + this.rng() * 90;
      const r = this.rng();
      if (r < 0.55) { this.state = 'clear'; this.target = 0; }
      else if (r < 0.8) { this.state = 'cloudy'; this.target = 0; }
      else { this.state = 'rain'; this.target = 1; }
    }
    if (this.forced && this.nextChange <= 0) { this.nextChange = 200; }

    this.rain = damp(this.rain, this.target, 0.6, dt);
    this.clouds = damp(this.clouds, this.state === 'rain' ? 1 : this.state === 'cloudy' ? 0.6 : 0, 0.5, dt);
    this.wind = 0.3 + this.clouds * 0.5 + Math.sin(time.hour * 1.7) * 0.1;

    this.points.visible = this.rain > 0.02;
    if (this.points.visible) {
      this.rainMat.uniforms.uTime.value += dt;
      this.rainMat.uniforms.uCam.value.copy(camPos);
    }
  }

  /** 对光照的影响 */
  applyLights(sky) {
    const k = this.rain;
    setRoadWet(k);
    sky.sun.intensity *= (1 - k * 0.62) * (1 - this.clouds * 0.18);
    sky.hemi.intensity *= (1 - k * 0.1);
    if (k > 0.01) {
      const f = sky.scene.fog;
      f.color.lerp(new THREE.Color(0x8fa2b0), k * 0.7);
      f.near = lerp(120, 45, k);
      f.far = lerp(440, 220, k);
    }
  }
}
