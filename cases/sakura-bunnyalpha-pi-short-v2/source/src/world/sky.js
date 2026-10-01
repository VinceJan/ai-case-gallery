/**
 * 天空与天光系统
 * - 渐变天穹（含朝阳辉光）
 * - 主平行光（白天太阳 / 夜晚月亮）带阴影
 * - 半球补光 + 雾
 * - 星星、太阳/月亮圆盘、飘动的低多边形云
 */
import * as THREE from 'three';
import { clamp, lerp, makeRNG, smoothstep } from '../core/utils.js';
import { toonMaterial, sharedToon } from '../core/toon.js';

// hour, 顶色, 地平色, 底部色, 光色, 光强, 半球天色, 半球地色, 半球强度, 曝光
const SKY_KEYS = [
  { h: 0.0, top: 0x080f2a, hor: 0x16244a, bot: 0x0a1024, sun: 0x9db4e4, sunI: 0.42, hemiS: 0x35497a, hemiG: 0x27314a, hemiI: 0.72, exp: 1.0 },
  { h: 4.6, top: 0x0c1533, hor: 0x1e2d55, bot: 0x0c1329, sun: 0x9db4e4, sunI: 0.42, hemiS: 0x37497a, hemiG: 0x28324b, hemiI: 0.74, exp: 1.0 },
  { h: 5.8, top: 0x2b3a72, hor: 0xd98a6e, bot: 0x3a3550, sun: 0xff9c62, sunI: 0.72, hemiS: 0x5b6a9a, hemiG: 0x3a3448, hemiI: 0.62, exp: 1.02 },
  { h: 6.8, top: 0x5f92cd, hor: 0xffd3a2, bot: 0x6a6a80, sun: 0xffd9a8, sunI: 1.42, hemiS: 0x8fb4de, hemiG: 0x6a6458, hemiI: 0.70, exp: 1.02 },
  { h: 9.0, top: 0x4b86d6, hor: 0xcfe6f5, bot: 0x9aa8b4, sun: 0xfff6e2, sunI: 1.82, hemiS: 0xa8cbec, hemiG: 0x74804f, hemiI: 0.80, exp: 1.02 },
  { h: 13.0, top: 0x3f7fd4, hor: 0xd6ecfa, bot: 0x9faeb8, sun: 0xfffcf4, sunI: 1.90, hemiS: 0xaed2f2, hemiG: 0x7a8656, hemiI: 0.82, exp: 1.0 },
  { h: 16.5, top: 0x4a83cd, hor: 0xdfe9f0, bot: 0xa0a89e, sun: 0xfff0d2, sunI: 1.68, hemiS: 0xa8c9ea, hemiG: 0x7c8252, hemiI: 0.78, exp: 1.02 },
  { h: 17.8, top: 0x5476b2, hor: 0xffb072, bot: 0xa88878, sun: 0xffa55e, sunI: 1.30, hemiS: 0xa89ac0, hemiG: 0x6e5c4a, hemiI: 0.70, exp: 1.04 },
  { h: 19.0, top: 0x33477f, hor: 0xe07a5c, bot: 0x5a4258, sun: 0xe07a52, sunI: 0.62, hemiS: 0x6d6ea0, hemiG: 0x40384a, hemiI: 0.60, exp: 1.05 },
  { h: 20.2, top: 0x1b2a58, hor: 0x4a4670, bot: 0x1e2440, sun: 0x8fa5d6, sunI: 0.44, hemiS: 0x425790, hemiG: 0x2a3450, hemiI: 0.74, exp: 1.02 },
  { h: 22.0, top: 0x0b1230, hor: 0x1a2850, bot: 0x0b1128, sun: 0x9db4e4, sunI: 0.42, hemiS: 0x35497a, hemiG: 0x27314a, hemiI: 0.72, exp: 1.0 },
  { h: 24.0, top: 0x080f2a, hor: 0x16244a, bot: 0x0a1024, sun: 0x9db4e4, sunI: 0.42, hemiS: 0x35497a, hemiG: 0x27314a, hemiI: 0.72, exp: 1.0 },
];

function sampleKeys(hour) {
  let a = SKY_KEYS[0];
  let b = SKY_KEYS[SKY_KEYS.length - 1];
  for (let i = 0; i < SKY_KEYS.length - 1; i++) {
    if (hour >= SKY_KEYS[i].h && hour <= SKY_KEYS[i + 1].h) {
      a = SKY_KEYS[i];
      b = SKY_KEYS[i + 1];
      break;
    }
  }
  const t = smoothstep(a.h, b.h, hour);
  return { a, b, t };
}

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_Position.z = gl_Position.w * 0.99999;
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  uniform vec3 uGlowColor;
  uniform vec3 uGlowDir;
  uniform float uGlowStrength;
  varying vec3 vDir;

  void main() {
    vec3 dir = normalize(vDir);
    vec3 col = mix(uHorizon, uTop, smoothstep(0.0, 0.46, dir.y));
    col = mix(col, uBottom, smoothstep(0.0, -0.22, dir.y));
    float g = max(dot(dir, normalize(uGlowDir)), 0.0);
    col += uGlowColor * pow(g, 4.0) * uGlowStrength * 0.55;
    col += uGlowColor * pow(g, 48.0) * uGlowStrength * 0.9;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export class SkyRig {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.rng = makeRNG(4242);

    this.sunDir = new THREE.Vector3(0, 1, 0);
    this.glowDir = new THREE.Vector3(0, 1, 0);
    this.nightFactor = 0;
    this.dawnFactor = 0;
    this.indoor = 0;
    this.sunColor = new THREE.Color(0xffffff);
    this.horizonColor = new THREE.Color(0xbfd9ef);
    this.elevation = 1;

    this._buildDome();
    this._buildLights();
    this._buildStars();
    this._buildCelestialDiscs();
    this._buildClouds();

    this._shadowTarget = new THREE.Vector3();
    this._tmp = new THREE.Color();
  }

  _buildDome() {
    const geo = new THREE.SphereGeometry(1, 32, 20);
    this.domeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTop: { value: new THREE.Color(0x4b86d6) },
        uHorizon: { value: new THREE.Color(0xcfe6f5) },
        uBottom: { value: new THREE.Color(0x9aa8b4) },
        uGlowColor: { value: new THREE.Color(0xfff0d0) },
        uGlowDir: { value: new THREE.Vector3(0, 1, 0) },
        uGlowStrength: { value: 0.5 },
      },
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    this.dome = new THREE.Mesh(geo, this.domeMat);
    this.dome.scale.setScalar(600);
    this.dome.frustumCulled = false;
    this.dome.renderOrder = -1000;
    this.dome.userData.noOutline = true;
    this.scene.add(this.dome);
  }

  _buildLights() {
    this.sun = new THREE.DirectionalLight(0xfff6e2, 1.8);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const s = 78;
    this.sun.shadow.camera.left = -s;
    this.sun.shadow.camera.right = s;
    this.sun.shadow.camera.top = s;
    this.sun.shadow.camera.bottom = -s;
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 320;
    this.sun.shadow.bias = -0.0008;
    this.sun.shadow.normalBias = 0.035;
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.hemi = new THREE.HemisphereLight(0xaed2f2, 0x74804f, 0.8);
    this.scene.add(this.hemi);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.16);
    this.scene.add(this.ambient);
  }

  _buildStars() {
    const count = 700;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // 只在地平线以上撒点
      const u = this.rng();
      const v = this.rng() * 0.94 + 0.06;
      const theta = u * Math.PI * 2;
      const phi = Math.acos(1 - 2 * v) * 0.5;
      const r = 520;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.cos(phi) * r * 0.92 + 30;
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
      size[i] = 1.2 + this.rng() * 2.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('starSize', new THREE.BufferAttribute(size, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0 }, uColor: { value: new THREE.Color(0xfff8e8) } },
      vertexShader: /* glsl */ `
        attribute float starSize;
        varying float vS;
        void main(){
          vS = starSize;
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = starSize;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        uniform vec3 uColor;
        varying float vS;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.05, length(d));
          gl_FragColor = vec4(uColor, a * uOpacity);
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthWrite: false,
      fog: false,
    });
    this.starMat = mat;
    this.stars = new THREE.Points(geo, mat);
    this.stars.frustumCulled = false;
    this.stars.renderOrder = -900;
    this.scene.add(this.stars);
  }

  _buildCelestialDiscs() {
    const circle = new THREE.CircleGeometry(1, 28);
    this.sunDisc = new THREE.Mesh(
      circle,
      new THREE.MeshBasicMaterial({ color: 0xfff4d0, transparent: true, opacity: 0.95, depthWrite: false, fog: false }),
    );
    this.sunDisc.scale.setScalar(17);
    this.sunDisc.renderOrder = -880;
    this.sunDisc.userData.noOutline = true;
    this.scene.add(this.sunDisc);

    const glowTex = makeRadialTexture();
    this.sunGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTex, color: 0xffd9a0, transparent: true, opacity: 0.55, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }),
    );
    this.sunGlow.scale.setScalar(110);
    this.sunGlow.renderOrder = -885;
    this.scene.add(this.sunGlow);

    this.moonDisc = new THREE.Mesh(
      new THREE.CircleGeometry(1, 26),
      new THREE.MeshBasicMaterial({ color: 0xf3f0e2, transparent: true, opacity: 0.95, depthWrite: false, fog: false }),
    );
    this.moonDisc.scale.setScalar(12);
    this.moonDisc.renderOrder = -880;
    this.moonDisc.userData.noOutline = true;
    this.scene.add(this.moonDisc);

    this.moonGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTex, color: 0x9fb6e8, transparent: true, opacity: 0.3, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }),
    );
    this.moonGlow.scale.setScalar(70);
    this.moonGlow.renderOrder = -885;
    this.scene.add(this.moonGlow);
  }

  _buildClouds() {
    this.cloudGroup = new THREE.Group();
    this.cloudMat = toonMaterial({ color: 0xffffff, steps: 2 });
    this.cloudMat.flatShading = true;
    this.cloudMat.fog = true;
    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const cluster = new THREE.Group();
      const puffs = this.rng.int(3, 6);
      for (let p = 0; p < puffs; p++) {
        const g = new THREE.IcosahedronGeometry(this.rng.range(5, 11), 0);
        g.scale(1, this.rng.range(0.42, 0.6), 0.8);
        const m = new THREE.Mesh(g, this.cloudMat);
        m.position.set(this.rng.range(-16, 16), this.rng.range(-2, 2.5), this.rng.range(-8, 8));
        m.castShadow = false;
        m.receiveShadow = false;
        m.userData.noOutline = true;
        cluster.add(m);
      }
      const ang = this.rng() * Math.PI * 2;
      const rad = this.rng.range(160, 300);
      cluster.position.set(Math.cos(ang) * rad, this.rng.range(52, 96), Math.sin(ang) * rad);
      cluster.userData.angle = ang;
      cluster.userData.radius = rad;
      cluster.userData.speed = this.rng.range(0.0035, 0.009) * (this.rng.chance(0.5) ? 1 : -1);
      cluster.userData.bobPhase = this.rng() * 10;
      this.cloudGroup.add(cluster);
      shapes.push(cluster);
    }
    this.clouds = shapes;
    this.scene.add(this.cloudGroup);
  }

  /**
   * @param {number} hour 0~24
   * @param {THREE.Vector3} focus 阴影/天穹跟随点
   * @param {number} dt
   */
  update(hour, focus, dt) {
    const { a, b, t } = sampleKeys(clamp(hour, 0, 24));

    const top = new THREE.Color().set(a.top).lerp(new THREE.Color(b.top), t);
    const hor = new THREE.Color().set(a.hor).lerp(new THREE.Color(b.hor), t);
    const bot = new THREE.Color().set(a.bot).lerp(new THREE.Color(b.bot), t);
    const sunC = new THREE.Color().set(a.sun).lerp(new THREE.Color(b.sun), t);
    const hemiS = new THREE.Color().set(a.hemiS).lerp(new THREE.Color(b.hemiS), t);
    const hemiG = new THREE.Color().set(a.hemiG).lerp(new THREE.Color(b.hemiG), t);
    const sunI = lerp(a.sunI, b.sunI, t);
    const hemiI = lerp(a.hemiI, b.hemiI, t);
    const exp = lerp(a.exp, b.exp, t);

    // 太阳轨迹：6:00 东侧地平线 → 12:00 高空 → 18:00 西侧地平线
    const ang = ((hour - 6) / 24) * Math.PI * 2;
    const elev = Math.sin(ang);
    const maxElev = 0.94;
    const dayDir = new THREE.Vector3(Math.cos(ang) * 0.72, elev * maxElev, -0.30 * elev - 0.12).normalize();
    const nightDir = dayDir.clone().multiplyScalar(-1);
    this.elevation = elev;

    // 黄昏/黎明权重
    const dawnFactor = clamp(1 - Math.abs(elev) / 0.26, 0, 1);
    this.dawnFactor = dawnFactor;
    const nightFactor = clamp((-elev + 0.06) / 0.3, 0, 1);
    this.nightFactor = nightFactor;

    // 太阳落山后改用月亮方向
    const useMoon = elev < 0.03;
    const dir = (useMoon ? nightDir : dayDir).clone();
    // 贴地时把方向压平，避免阴影突然拉长穿帮
    dir.y = Math.max(dir.y, 0.05);
    dir.normalize();
    this.sunDir.copy(dir);
    this.glowDir.copy(dir);

    const u = this.domeMat.uniforms;
    const ind = this.indoor;
    u.uTop.value.copy(top).multiplyScalar(1 - ind * 0.88);
    u.uHorizon.value.copy(hor).multiplyScalar(1 - ind * 0.88);
    u.uBottom.value.copy(bot).multiplyScalar(1 - ind * 0.9);
    u.uGlowColor.value.copy(sunC);
    u.uGlowDir.value.copy(dir);
    u.uGlowStrength.value = (0.35 + dawnFactor * 1.35) * (1 - ind);
    this.dome.visible = ind < 0.98;

    this.horizonColor.copy(hor);
    this.sunColor.copy(sunC);

    // 光源
    const dist = 120;
    this.sun.position.set(focus.x + dir.x * dist, focus.y + dir.y * dist, focus.z + dir.z * dist);
    this.sun.target.position.copy(focus);
    this.sun.target.updateMatrixWorld();
    this.sun.color.copy(sunC);
    this.sun.intensity = sunI * (1 - ind * 0.7);
    this.hemi.color.copy(hemiS);
    this.hemi.groundColor.copy(hemiG);
    this.hemi.intensity = hemiI * (1 - ind * 0.4) + ind * 0.95;
    this.ambient.intensity = lerp(0.15, 0.07, nightFactor) + ind * 0.45;
    this.ambient.color.copy(hemiS);
    this.renderer.toneMappingExposure = exp * (1 - ind * 0.1);

    // 雾跟随地平色
    if (this.scene.fog) {
      this.scene.fog.color.copy(hor).multiplyScalar(1 - ind * 0.9);
      this.scene.fog.near = lerp(120, 70, nightFactor);
      this.scene.fog.far = lerp(430, ind > 0.5 ? 60 : 330, nightFactor);
    }
    this.renderer.setClearColor(hor, 1);

    // 星星
    this.starMat.uniforms.uOpacity.value = nightFactor * 0.95 * (1 - ind);
    this.stars.position.set(focus.x, 0, focus.z);
    this.stars.rotation.y = ang * 0.3;
    this.stars.visible = ind < 0.5;

    // 日月圆盘
    const discPos = (d, mesh, glow) => {
      mesh.position.set(focus.x + d.x * 460, focus.y + d.y * 460, focus.z + d.z * 460);
      mesh.lookAt(focus.x, focus.y, focus.z);
      glow.position.copy(mesh.position);
    };
    discPos(dayDir, this.sunDisc, this.sunGlow);
    discPos(nightDir, this.moonDisc, this.moonGlow);
    const sunVis = clamp(1 - (0.02 - dayDir.y) / 0.22, 0, 1) * (1 - ind);
    this.sunDisc.visible = sunVis > 0.01;
    this.sunGlow.visible = sunVis > 0.01;
    this.sunDisc.material.opacity = sunVis;
    this.sunGlow.material.opacity = sunVis * (0.35 + dawnFactor * 0.5);
    this.sunGlow.material.color.copy(sunC);
    this.sunGlow.material.opacity = sunVis * (0.3 + dawnFactor * 0.55);
    this.moonDisc.visible = nightFactor > 0.02 && ind < 0.5;
    this.moonGlow.visible = this.moonDisc.visible;
    this.moonDisc.material.opacity = nightFactor * (1 - ind);
    this.moonGlow.material.opacity = nightFactor * 0.32 * (1 - ind);

    // 云
    this.cloudMat.color.copy(hor).lerp(new THREE.Color(0xffffff), 0.55 - nightFactor * 0.42);
    this.cloudGroup.visible = ind < 0.5;
    for (const c of this.clouds) {
      c.userData.angle += c.userData.speed * dt;
      const ang2 = c.userData.angle;
      const rad = c.userData.radius;
      c.position.x = Math.cos(ang2) * rad;
      c.position.z = Math.sin(ang2) * rad;
      c.position.y += Math.sin(this.elapsed * 0.4 + c.userData.bobPhase) * dt * 0.4;
    }
  }
}

function makeRadialTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.14)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
