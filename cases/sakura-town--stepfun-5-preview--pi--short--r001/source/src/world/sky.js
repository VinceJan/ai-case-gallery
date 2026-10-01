// 天空、光照、云、星、月（cel/toon 动画背景风）
import * as THREE from 'three';
import { clamp, lerp, makeRng } from '../core/utils.js';
import { TEX } from './materials.js';

const SKY_VERT = `
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const SKY_FRAG = `
varying vec3 vDir;
uniform vec3 topColor;
uniform vec3 horizonColor;
uniform vec3 sunColor;
uniform vec3 sunDir;
uniform vec3 moonDir;
uniform float starAlpha;
uniform float moonAlpha;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

void main() {
  vec3 d = normalize(vDir);
  float h = clamp(d.y, -0.15, 1.0);
  vec3 col = mix(horizonColor, topColor, pow(max(h, 0.0), 0.58));
  // 地平线以下渐暗（避免穿帮）
  col *= 1.0 - 0.35 * clamp(-d.y * 3.0, 0.0, 1.0);

  vec3 sd = normalize(sunDir);
  float s = max(dot(d, sd), 0.0);
  col += sunColor * pow(s, 1200.0) * 4.0;          // 日盘
  col += sunColor * pow(s, 14.0) * 0.28;           // 大气晕
  col += sunColor * pow(s, 3.0) * 0.06;            // 广晕

  vec3 md = normalize(moonDir);
  float m = max(dot(d, md), 0.0);
  float moonDisc = smoothstep(0.99955, 0.99985, m);
  float moonGlow = pow(m, 90.0) * 0.35;
  col += vec3(0.95, 0.95, 1.0) * (moonDisc + moonGlow) * moonAlpha;

  // 星星
  if (starAlpha > 0.01 && d.y > 0.02) {
    vec3 q = floor(d * 190.0);
    float st = hash13(q);
    float star = step(0.9975, st);
    float tw = 0.6 + 0.4 * hash13(q + 3.7);
    col += vec3(1.0, 0.98, 0.95) * star * tw * starAlpha * clamp(d.y * 2.2, 0.0, 1.0);
  }
  gl_FragColor = vec4(col, 1.0);
}`;

export class Sky {
  constructor(scene) {
    this.scene = scene;
    const geo = new THREE.SphereGeometry(600, 32, 20);
    this.uniforms = {
      topColor: { value: new THREE.Color(0x6fb7e8) },
      horizonColor: { value: new THREE.Color(0xdfeef5) },
      sunColor: { value: new THREE.Color(0xfff2cc) },
      sunDir: { value: new THREE.Vector3(0.5, 0.8, 0.3) },
      moonDir: { value: new THREE.Vector3(-0.5, -0.6, -0.3) },
      starAlpha: { value: 0 },
      moonAlpha: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      uniforms: this.uniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.name = 'sky';
    scene.add(this.mesh);

    // 云（billboard）
    this.clouds = new THREE.Group();
    const rng = makeRng(555);
    const cloudMat = new THREE.SpriteMaterial({ map: TEX.cloud, transparent: true, opacity: 0.85, depthWrite: false, fog: false });
    for (let i = 0; i < 22; i++) {
      const sp = new THREE.Sprite(cloudMat.clone());
      const a = rng() * Math.PI * 2;
      const r = 190 + rng() * 130;
      sp.position.set(Math.cos(a) * r, 55 + rng() * 90, Math.sin(a) * r);
      const s = 60 + rng() * 90;
      sp.scale.set(s, s * 0.45, 1);
      sp.material.opacity = 0.5 + rng() * 0.4;
      sp.userData.drift = 0.4 + rng() * 0.8;
      this.clouds.add(sp);
    }
    scene.add(this.clouds);

    // 环境光 & 太阳光
    this.hemi = new THREE.HemisphereLight(0xbfd9ea, 0x8a9a6a, 1.1);
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xfff2dd, 2.6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const sc = this.sun.shadow.camera;
    sc.left = -150; sc.right = 150; sc.top = 150; sc.bottom = -150;
    sc.near = 10; sc.far = 500;
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.04;
    scene.add(this.sun);
    scene.add(this.sun.target);
    // 夜间冷色补光
    this.nightFill = new THREE.DirectionalLight(0x8fa8d8, 0.0);
    scene.add(this.nightFill);

    this.fog = new THREE.Fog(0xdfeef5, 90, 380);
    scene.fog = this.fog;
  }

  // params: clock.lightParams() + weather
  update(dt, lp, weather, elapsed) {
    const h = lp.hour;
    // 太阳方向：东(+x) → 南(+z) → 西(-x)
    const t = (h - 6) / 12;
    const az = t * Math.PI;
    const el = Math.sin(az) * 1.28;
    const sunDir = new THREE.Vector3(Math.cos(az), Math.max(el, -0.3), 0.32 * Math.sin(az)).normalize();
    if (el < 0) sunDir.set(Math.cos(az), -0.25, 0.32 * Math.sin(az)).normalize();
    this.uniforms.sunDir.value.copy(sunDir);
    this.uniforms.moonDir.value.copy(sunDir).negate();

    // 颜色随一天变化
    const dayTop = new THREE.Color(0x5fb0e8);
    const dayHor = new THREE.Color(0xd8ecf5);
    const duskTop = new THREE.Color(0x7a6a9e);
    const duskHor = new THREE.Color(0xffb28a);
    const nightTop = new THREE.Color(0x141a30);
    const nightHor = new THREE.Color(0x2c3550);

    let top, hor, sunCol;
    if (lp.isNight) {
      top = nightTop; hor = nightHor; sunCol = new THREE.Color(0x9ab0e0);
    } else if (lp.warmth > 0.25) {
      const k = lp.warmth;
      top = dayTop.clone().lerp(duskTop, k * 0.8);
      hor = dayHor.clone().lerp(duskHor, k);
      sunCol = new THREE.Color(0xfff2dd).lerp(new THREE.Color(0xff9a5a), k);
    } else {
      top = dayTop; hor = dayHor; sunCol = new THREE.Color(0xfff2dd);
    }
    // 阴天使天空变灰
    const cloud = weather.cloud;
    top.lerp(new THREE.Color(0x9aa5ad), cloud * 0.75);
    hor.lerp(new THREE.Color(0xc4ccd2), cloud * 0.85);
    // 雨天更暗
    top.lerp(new THREE.Color(0x5a6470), weather.intensity * 0.5);
    hor.lerp(new THREE.Color(0x7a848e), weather.intensity * 0.5);

    const k = clamp(dt * 1.6, 0, 1);
    this.uniforms.topColor.value.lerp(top, k);
    this.uniforms.horizonColor.value.lerp(hor, k);
    this.uniforms.sunColor.value.lerp(sunCol, k);
    this.uniforms.starAlpha.value = lerp(this.uniforms.starAlpha.value, lp.isNight ? (1 - cloud * 0.8) : 0, k);
    this.uniforms.moonAlpha.value = lerp(this.uniforms.moonAlpha.value, lp.isNight ? 1 : 0, k);

    // 光照
    this.sun.intensity = lp.sunI * (1 - weather.intensity * 0.55) * (1 - cloud * 0.35);
    this.sun.color.copy(this.uniforms.sunColor.value);
    this.sun.position.copy(sunDir).multiplyScalar(180);
    this.sun.target.position.set(0, 0, 0);
    this.sun.visible = this.sun.intensity > 0.05;
    this.nightFill.intensity = lp.isNight ? 0.55 * (1 - cloud * 0.5) : 0;
    this.hemi.intensity = lp.isNight ? 0.55 : 1.15 * (1 - cloud * 0.4);
    this.hemi.color.copy(this.uniforms.horizonColor.value).lerp(new THREE.Color(0xffffff), 0.3);
    this.hemi.groundColor.set(lp.isNight ? 0x2a3040 : 0x9aa87a);

    // 雾
    this.fog.color.copy(this.uniforms.horizonColor.value);
    this.fog.near = lerp(90, 30, weather.intensity);
    this.fog.far = lerp(380, 160, weather.intensity);

    // 云
    for (const c of this.clouds.children) {
      c.position.x += c.userData.drift * dt * (0.5 + weather.wind * 2);
      if (c.position.x > 320) c.position.x = -320;
      const targetOp = (lp.isNight ? 0.25 : 0.85) * (0.25 + cloud * 0.9);
      c.material.opacity = lerp(c.material.opacity, targetOp, clamp(dt, 0, 1));
      const dark = weather.intensity * 0.55;
      c.material.color.setRGB(1 - dark, 1 - dark * 0.9, 1 - dark * 0.7);
    }
  }
}
