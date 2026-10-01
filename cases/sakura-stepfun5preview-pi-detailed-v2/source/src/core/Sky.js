// 天空：渐变天穹、日月、星辰、云
import * as THREE from 'three';
import { canvasTexture, rand, TAU } from './Utils.js';

const VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAG = /* glsl */ `
uniform vec3 topColor;
uniform vec3 horizonColor;
uniform vec3 sunDir;
uniform vec3 sunColor;
uniform float sunStrength;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(horizonColor, topColor, pow(h, 0.75));
  float s = max(dot(d, normalize(sunDir)), 0.0);
  col += sunColor * pow(s, 220.0) * 1.6 * sunStrength;
  col += sunColor * pow(s, 9.0) * 0.30 * sunStrength;
  // 地平线附近的暖晕
  col += sunColor * pow(max(1.0 - abs(d.y), 0.0), 5.0) * 0.10 * sunStrength;
  gl_FragColor = vec4(col, 1.0);
}`;

export class Sky {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    const geo = new THREE.SphereGeometry(480, 32, 18);
    this.uniforms = {
      topColor: { value: new THREE.Color('#5d8fc4') },
      horizonColor: { value: new THREE.Color('#cfe3ef') },
      sunDir: { value: new THREE.Vector3(0.3, 0.5, 0.8) },
      sunColor: { value: new THREE.Color('#fff2d8') },
      sunStrength: { value: 1 },
    };
    this.dome = new THREE.Mesh(geo, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: this.uniforms, side: THREE.BackSide, depthWrite: false, fog: false,
    }));
    this.dome.renderOrder = -10;
    this.group.add(this.dome);

    // 太阳 / 月亮
    const glowTex = canvasTexture(64, 64, (ctx, w, h) => {
      const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
      g.addColorStop(0, 'rgba(255,250,230,1)');
      g.addColorStop(0.35, 'rgba(255,240,200,.55)');
      g.addColorStop(1, 'rgba(255,235,190,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    });
    this.sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, fog: false }));
    this.sunSprite.scale.set(120, 120, 1);
    this.group.add(this.sunSprite);

    this.moon = new THREE.Mesh(
      new THREE.CircleGeometry(16, 24),
      new THREE.MeshBasicMaterial({ color: 0xf2ecd9, fog: false, transparent: true })
    );
    this.group.add(this.moon);

    // 星辰
    const starN = 420, sp = new Float32Array(starN * 3), ss = new Float32Array(starN);
    for (let i = 0; i < starN; i++) {
      const t = rand(TAU), p = Math.acos(rand(0.05, 1));
      const r = 440;
      sp[i * 3] = r * Math.sin(p) * Math.cos(t);
      sp[i * 3 + 1] = r * Math.cos(p);
      sp[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
      ss[i] = rand(1.2, 3.2);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    sg.setAttribute('size', new THREE.BufferAttribute(ss, 1));
    this.starMat = new THREE.PointsMaterial({
      color: 0xdfe8ff, size: 2.4, sizeAttenuation: false,
      transparent: true, opacity: 0, depthWrite: false, fog: false,
    });
    this.stars = new THREE.Points(sg, this.starMat);
    this.group.add(this.stars);

    // 云
    this.clouds = [];
    const cloudMat = new THREE.MeshToonMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 });
    cloudMat.gradientMap = this.starMat; // 占位，下面统一设置
    const gradTex = canvasTexture(4, 1, (ctx, w, h) => {
      const d = ctx.createImageData(w, h);
      for (let i = 0; i < w; i++) d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = Math.round(255 * (i + 1) / w);
      ctx.putImageData(d, 0, 0);
    });
    gradTex.minFilter = gradTex.magFilter = THREE.NearestFilter;
    cloudMat.gradientMap = gradTex;
    for (let i = 0; i < 11; i++) {
      const c = new THREE.Group();
      const n = 3 + Math.floor(rand(0, 3));
      for (let j = 0; j < n; j++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(rand(9, 17), 8, 6), cloudMat);
        s.position.set(rand(-16, 16), rand(-3, 3), rand(-8, 8));
        s.scale.y = rand(0.5, 0.75);
        c.add(s);
      }
      const a = rand(TAU), r = rand(240, 400);
      c.position.set(Math.cos(a) * r, rand(70, 150), Math.sin(a) * r);
      this.clouds.push({ g: c, speed: rand(0.4, 1.1) });
      this.group.add(c);
    }

    scene.add(this.group);
  }

  /** env 由 TimeSystem + WeatherSystem 合成 */
  update(env, dt) {
    const u = this.uniforms;
    u.topColor.value.lerp(env.skyTop, 1 - Math.exp(-3 * dt));
    u.horizonColor.value.lerp(env.skyHorizon, 1 - Math.exp(-3 * dt));
    u.sunColor.value.lerp(env.sunColor, 1 - Math.exp(-3 * dt));
    u.sunStrength.value += (env.sunStrength - u.sunStrength.value) * Math.min(1, 2 * dt);
    u.sunDir.value.copy(env.sunDir);

    this.sunSprite.position.copy(env.sunDir).multiplyScalar(400);
    this.sunSprite.material.opacity = env.sunVisible;
    this.moon.position.copy(env.sunDir).multiplyScalar(-400);
    this.moon.lookAt(0, 0, 0);
    this.moon.material.opacity = env.moonVisible;

    const targetStar = env.starOpacity;
    this.starMat.opacity += (targetStar - this.starMat.opacity) * Math.min(1, 2 * dt);
    this.stars.rotation.y += dt * 0.004;

    for (const c of this.clouds) {
      c.g.position.x += c.speed * dt;
      if (c.g.position.x > 420) c.g.position.x = -420;
      c.g.children[0].material = c.g.children[0].material; // no-op 保持引用
    }
    const cloudColor = env.cloudColor;
    for (const c of this.clouds) {
      for (const s of c.g.children) {
        s.material.color.lerp(cloudColor, 1 - Math.exp(-1.5 * dt));
        s.material.opacity = env.cloudOpacity;
      }
    }
  }
}
