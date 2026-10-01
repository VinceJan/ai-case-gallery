// 天空 / 太阳 / 月亮 / 星星 / 云 / 大气 —— 昼夜视觉
import * as THREE from 'three';
import { PAL, mixHex } from '../render/palette.js';
import { toon, basic, addOutline } from '../render/toon.js';
import { clamp01, lerp, smoothstep, makeRNG, TAU, damp } from '../util/math.js';

/* 关键帧：[小时, 太阳色, 太阳强度, 环境色, 环境强度, 顶部天, 中部天, 底部天, 雾色] */
const KEYS = [
  [0.0, 0x9fb6e8, 0.16, 0x3a4470, 0.56, PAL.nightTop, PAL.nightMid, PAL.nightLow, 0x1b2340],
  [4.2, 0x9fb6e8, 0.16, 0x3a4470, 0.56, PAL.nightTop, PAL.nightMid, PAL.nightLow, 0x1b2340],
  [5.4, 0xffb98a, 0.52, 0x7a7298, 0.80, 0x3f4a80, 0xd08a92, 0xffc9a0, 0xa39aae],
  [6.6, 0xffd3a0, 0.92, 0xa8bcd0, 0.95, 0x74a8d8, 0xf2bfae, 0xffe0bd, 0xd8c8c0],
  [8.0, 0xfff2d8, 1.12, 0xc8d8e8, 0.92, PAL.skyTop, PAL.skyMid, PAL.skyLow, 0xd3e2ee],
  [12.0, 0xfff8ec, 1.22, 0xd2e2f2, 0.95, 0x63a8e4, 0xa9d3f2, 0xe6f0fa, 0xcfe3f2],
  [16.0, 0xfff0d0, 1.10, 0xccdaea, 0.92, 0x6aabe0, 0xbcd8ee, 0xf6e6d8, 0xd6e0e8],
  [17.8, 0xffb877, 0.86, 0xa89eb4, 0.80, 0x5a6fa8, 0xe8a189, 0xffd6a8, 0xe0bba8],
  [19.2, 0xf08a5a, 0.42, 0x6a6890, 0.70, 0x3d4478, 0xb06a86, 0xe8a07e, 0x9a8496],
  [20.6, 0x8fa8dc, 0.18, 0x3e4670, 0.58, 0x1c2450, 0x4a4a72, 0x7a6a88, 0x3a3a58],
  [22.0, 0x9fb6e8, 0.16, 0x3a4470, 0.56, PAL.nightTop, PAL.nightMid, PAL.nightLow, 0x1b2340],
  [24.0, 0x9fb6e8, 0.16, 0x3a4470, 0.56, PAL.nightTop, PAL.nightMid, PAL.nightLow, 0x1b2340],
];

function sampleKeys(h) {
  let a = KEYS[0], b = KEYS[KEYS.length - 1];
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (h >= KEYS[i][0] && h <= KEYS[i + 1][0]) { a = KEYS[i]; b = KEYS[i + 1]; break; }
  }
  const t = smoothstep(a[0], b[0], h);
  return {
    sunColor: mixHex(a[1], b[1], t),
    sunI: lerp(a[2], b[2], t),
    ambColor: mixHex(a[3], b[3], t),
    ambI: lerp(a[4], b[4], t),
    top: mixHex(a[5], b[5], t),
    mid: mixHex(a[6], b[6], t),
    low: mixHex(a[7], b[7], t),
    fog: mixHex(a[8], b[8], t),
  };
}

const SKY_VERT = /* glsl */`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.z = gl_Position.w;   // 永远在最远处
}`;

const SKY_FRAG = /* glsl */`
uniform vec3 uTop, uMid, uLow, uSunColor, uSunDir;
uniform float uNight, uSunSize;
varying vec3 vDir;
void main() {
  float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 c = mix(uLow, uMid, smoothstep(0.42, 0.56, h));
  c = mix(c, uTop, smoothstep(0.55, 0.92, h));
  // 太阳光晕
  float d = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
  c += uSunColor * pow(d, 18.0) * 0.55;
  c += uSunColor * pow(d, 3.0) * 0.10 * (1.0 - uNight);
  // 地平线暖化
  c += uSunColor * 0.06 * (1.0 - smoothstep(0.48, 0.62, h)) * (1.0 - uNight);
  gl_FragColor = vec4(c, 1.0);
}`;

export class Sky {
  constructor(scene) {
    this.scene = scene;
    const geo = new THREE.SphereGeometry(1, 32, 20);
    this.uniforms = {
      uTop: { value: new THREE.Color(PAL.skyTop) },
      uMid: { value: new THREE.Color(PAL.skyMid) },
      uLow: { value: new THREE.Color(PAL.skyLow) },
      uSunColor: { value: new THREE.Color(0xfff3dc) },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uNight: { value: 0 },
      uSunSize: { value: 1 },
    };
    this.mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
      vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
      uniforms: this.uniforms, side: THREE.BackSide, depthWrite: false, fog: false,
    }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -1000;
    scene.add(this.mesh);

    // 太阳 / 月亮 圆盘
    this.sunSprite = new THREE.Mesh(
      new THREE.CircleGeometry(14, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff6e0, transparent: true, depthWrite: false, fog: false })
    );
    this.sunSprite.renderOrder = -999;
    scene.add(this.sunSprite);
    this.moonSprite = new THREE.Mesh(
      new THREE.CircleGeometry(9, 20),
      new THREE.MeshBasicMaterial({ color: 0xe8eefc, transparent: true, depthWrite: false, fog: false })
    );
    this.moonSprite.renderOrder = -999;
    scene.add(this.moonSprite);

    // 星星
    const rng = makeRNG(1337);
    const N = 900;
    const sp = new Float32Array(N * 3), ss = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const u = rng() * TAU, v = rng() * 0.55 + 0.02;
      const y = v, r = Math.sqrt(1 - v * v);
      sp[i * 3] = Math.cos(u) * r * 320;
      sp[i * 3 + 1] = y * 320;
      sp[i * 3 + 2] = Math.sin(u) * r * 320;
      ss[i] = 1.2 + rng() * 2.6;
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    sg.setAttribute('aSize', new THREE.BufferAttribute(ss, 1));
    this.starMat = new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0 } },
      vertexShader: `attribute float aSize; varying float vS;
        void main(){ vS=aSize; vec4 mv=modelViewMatrix*vec4(position,1.0);
        gl_Position=projectionMatrix*mv; gl_PointSize=aSize; }`,
      fragmentShader: `uniform float uOpacity; varying float vS;
        void main(){ vec2 d=gl_PointCoord-0.5; float a=smoothstep(0.5,0.1,length(d));
        gl_FragColor=vec4(vec3(1.0,0.98,0.92), a*uOpacity); }`,
      transparent: true, depthWrite: false, fog: false,
    });
    this.stars = new THREE.Points(sg, this.starMat);
    this.stars.renderOrder = -998;
    this.stars.frustumCulled = false;
    scene.add(this.stars);

    this.buildClouds();

    // 灯光
    this.sun = new THREE.DirectionalLight(0xfff3dc, 1.15);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const S = 78;
    this.sun.shadow.camera.left = -S; this.sun.shadow.camera.right = S;
    this.sun.shadow.camera.top = S; this.sun.shadow.camera.bottom = -S;
    this.sun.shadow.camera.near = 1; this.sun.shadow.camera.far = 320;
    this.sun.shadow.bias = -0.0009;
    this.sun.shadow.normalBias = 0.035;
    this.sunTarget = new THREE.Object3D();
    scene.add(this.sun, this.sunTarget);
    this.sun.target = this.sunTarget;

    this.hemi = new THREE.HemisphereLight(0xcfe3f2, 0x7a8a6a, 0.75);
    scene.add(this.hemi);
    this.ambient = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(this.ambient);

    scene.fog = new THREE.Fog(0xcfe3f2, 120, 440);
    this.state = sampleKeys(12);
    this.nightT = 0;
  }

  buildClouds() {
    const rng = makeRNG(777);
    this.clouds = new THREE.Group();
    this.clouds.name = 'clouds';
    const mat = toon(0xfdfbf6);
    const dark = toon(0xd8dde8);
    this.cloudMats = [mat, dark];
    for (let i = 0; i < 16; i++) {
      const g = new THREE.Group();
      const n = 3 + Math.floor(rng() * 3);
      const s = 1.0 + rng() * 1.6;
      for (let k = 0; k < n; k++) {
        const r = (4 + rng() * 5) * s;
        const m = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), rng() < 0.3 ? dark : mat);
        m.position.set((k - n / 2) * r * 1.05, (rng() - 0.5) * r * 0.45, (rng() - 0.5) * r * 0.7);
        m.scale.y = 0.62;
        addOutline(m, 0.012);
        g.add(m);
      }
      const a = rng() * TAU;
      const rad = 130 + rng() * 120;
      g.position.set(Math.cos(a) * rad, 62 + rng() * 55, Math.sin(a) * rad);
      g.userData.speed = 0.28 + rng() * 0.4;
      g.userData.ang = a;
      g.userData.rad = rad;
      this.clouds.add(g);
    }
    this.scene.add(this.clouds);
  }

  update(dt, hour, cameraPos) {
    const s = sampleKeys(hour);
    this.state = s;
    // 夜间程度 0..1
    const night = clamp01(1 - smoothstep(0.16, 0.52, s.sunI));
    this.nightT = damp(this.nightT, night, 4, dt);

    // 太阳角度：6:00 东升，18:00 西落
    const ang = ((hour - 6) / 12) * Math.PI;
    const elev = Math.sin(ang);
    const azi = Math.cos(ang);
    const dir = new THREE.Vector3(azi * 0.85, Math.max(elev, -0.25), -0.35).normalize();

    const px = cameraPos.x, py = cameraPos.y, pz = cameraPos.z;
    this.uniforms.uTop.value.setHex(s.top);
    this.uniforms.uMid.value.setHex(s.mid);
    this.uniforms.uLow.value.setHex(s.low);
    this.uniforms.uSunColor.value.setHex(s.sunColor);
    this.uniforms.uSunDir.value.copy(dir);
    this.uniforms.uNight.value = night;
    this.mesh.position.set(px, py, pz);
    this.mesh.scale.setScalar(500);

    this.sunSprite.position.set(px + dir.x * 300, py + Math.max(0.02, elev) * 300, pz + dir.z * 300);
    this.sunSprite.lookAt(px, py, pz);
    this.sunSprite.material.color.setHex(s.sunI > 0.3 ? 0xfff6e0 : 0xdfe6ff);
    this.sunSprite.material.opacity = clamp01(smoothstep(0.05, 0.35, s.sunI) * 0.95);
    this.sunSprite.scale.setScalar(lerp(0.8, 1.15, clamp01(s.sunI)));

    const mdir = new THREE.Vector3(-dir.x, Math.max(-elev, 0.2), -dir.z).normalize();
    this.moonSprite.position.set(px + mdir.x * 300, py + Math.max(0.05, -elev) * 300, pz + mdir.z * 300);
    this.moonSprite.lookAt(px, py, pz);
    this.moonSprite.material.opacity = clamp01(night * 0.9);

    this.stars.position.set(px, py, pz);
    this.starMat.uniforms.uOpacity.value = night * 0.95;
    this.stars.visible = !this.indoor && night > 0.02;
    this.sunSprite.visible = !this.indoor;
    this.moonSprite.visible = !this.indoor;
    this.clouds.visible = !this.indoor;

    // 光照
    this.sun.color.setHex(s.sunColor);
    this.sun.intensity = s.sunI;
    this.sun.position.set(px + dir.x * 110, py + Math.max(elev, 0.12) * 110, pz + dir.z * 110);
    this.sunTarget.position.set(px, 0, pz);
    this.hemi.color.setHex(s.mid);
    this.hemi.groundColor.setHex(mixHex(0x7a8a6a, s.fog, 0.35));
    this.hemi.intensity = s.ambI * 1.0;
    this.ambient.color.setHex(s.ambColor);
    this.ambient.intensity = s.ambI * 0.42;
    if (this.indoor) {
      this.sun.intensity = 0.06;
      this.hemi.intensity = 0.3;
      this.hemi.color.setHex(0xf2ecdc);
      this.hemi.groundColor.setHex(0x9a9080);
      this.ambient.intensity = 0.2;
      this.ambient.color.setHex(0xfff2e0);
    }

    if (this.indoor) {
      this.scene.fog.color.setHex(0x3a4054);
      this.scene.fog.near = 20;
      this.scene.fog.far = 70;
    } else {
      this.scene.fog.color.setHex(s.fog);
      this.scene.fog.near = 120;
      this.scene.fog.far = 440 - night * 90;
    }

    // 云移动
    for (const c of this.clouds.children) {
      c.userData.ang += dt * c.userData.speed * 0.004;
      c.position.x = Math.cos(c.userData.ang) * c.userData.rad;
      c.position.z = Math.sin(c.userData.ang) * c.userData.rad;
    }
    // 黄昏给云染色
    const warm = clamp01(1 - Math.abs(s.sunI - 0.7) / 0.5);
    this.cloudMats[0].color.setHex(mixHex(0xfdfbf6, 0xffc9a0, warm * 0.55));
    this.cloudMats[1].color.setHex(mixHex(0xd8dde8, 0xd6a0a8, warm * 0.6));
  }
}

export { sampleKeys };
