import * as THREE from 'three';
import { createToonMaterial } from '../art/ToonMaterials.js';

export class AtmosphereSystem {
  constructor(scene) {
    this.scene = scene;
    this.skyUniforms = null;
    this.clouds = [];
    this.petalsMesh = null;
    this.petalData = [];
    this.firefliesMesh = null;
    this.fireflyData = [];
    this._dummy = new THREE.Object3D();
  }

  build() {
    this._buildAnimeSkyDome();
    this._buildFluffyClouds();
    this._buildSakuraPetals();
    this._buildFireflies();
  }

  _buildAnimeSkyDome() {
    this.skyUniforms = {
      uTopColor: { value: new THREE.Color(0x4b93db) },
      uMidColor: { value: new THREE.Color(0x8bc5f2) },
      uHorizonColor: { value: new THREE.Color(0xdfeffc) },
      uSunDir: { value: new THREE.Vector3(0.4, 0.7, 0.3).normalize() },
      uSunColor: { value: new THREE.Color(0xfff5de) },
      uNightFactor: { value: 0.0 },
    };

    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vWorldDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldDir = normalize(position);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uMidColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uSunDir;
        uniform vec3 uSunColor;
        uniform float uNightFactor;
        varying vec3 vWorldDir;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main() {
          vec3 dir = normalize(vWorldDir);
          float h = clamp(dir.y, 0.0, 1.0);
          vec3 col = mix(uHorizonColor, uMidColor, smoothstep(0.0, 0.28, h));
          col = mix(col, uTopColor, smoothstep(0.24, 0.82, h));
          float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
          col += uSunColor * (pow(sunDot, 16.0) * 0.35 + smoothstep(0.9965, 0.9985, sunDot) * 0.9);
          if (uNightFactor > 0.2 && h > 0.12) {
            vec2 starCell = floor(dir.xz / (dir.y + 0.35) * 42.0);
            if (hash(starCell) > 0.985) col += vec3(0.95, 0.96, 1.0) * uNightFactor * smoothstep(0.12, 0.45, h);
          }
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.scene.add(new THREE.Mesh(new THREE.SphereGeometry(280, 24, 16), skyMat));
  }

  _buildFluffyClouds() {
    const cloudMat = createToonMaterial(0xffffff, { transparent: true, opacity: 0.92 });
    const puffGeo = new THREE.IcosahedronGeometry(1, 1);
    for (let i = 0; i < 14; i++) {
      const cloud = new THREE.Group();
      const puffs = 4 + (i % 3);
      for (let p = 0; p < puffs; p++) {
        const m = new THREE.Mesh(puffGeo, cloudMat);
        const s = 3.8 + ((i + p) % 3) * 1.9;
        m.scale.set(s * 1.5, s * 0.65, s * 1.1);
        m.position.set((p - puffs / 2) * 3.6, Math.sin(p * 1.4) * 1.1, (p % 2) * 1.6);
        cloud.add(m);
      }
      cloud.position.set(-160 + (i / 14) * 320, 46 + (i % 4) * 7, -120 + Math.sin(i * 2.1) * 95);
      cloud.userData.speed = 0.8 + (i % 3) * 0.35;
      this.scene.add(cloud);
      this.clouds.push(cloud);
    }
    this.cloudMat = cloudMat;
  }

  _buildSakuraPetals() {
    const count = 240;
    this.petalsMesh = new THREE.InstancedMesh(
      new THREE.PlaneGeometry(0.16, 0.11),
      new THREE.MeshBasicMaterial({ color: 0xffc6d6, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }),
      count
    );
    for (let i = 0; i < count; i++) {
      this.petalData.push({
        x: (Math.random() - 0.5) * 105, y: 0.5 + Math.random() * 14, z: (Math.random() - 0.5) * 85 - 5,
        vx: 0.55 + Math.random() * 0.65, vy: -(0.45 + Math.random() * 0.45), vz: 0.18 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2, rotSpeed: 1.4 + Math.random() * 2.4,
      });
    }
    this.scene.add(this.petalsMesh);
  }

  _buildFireflies() {
    const count = 42;
    this.fireflyMat = new THREE.MeshBasicMaterial({ color: 0xf4ff9c, transparent: true, opacity: 0 });
    this.firefliesMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.08, 6, 6), this.fireflyMat, count);
    for (let i = 0; i < count; i++) {
      const nearShrine = i % 3 === 0;
      this.fireflyData.push({
        baseX: nearShrine ? 44 + (Math.random() - 0.5) * 14 : 26 + (Math.random() - 0.5) * 14,
        baseY: nearShrine ? 2.6 + Math.random() * 2.2 : 0.4 + Math.random() * 2.0,
        baseZ: nearShrine ? -4 + (Math.random() - 0.5) * 12 : (Math.random() - 0.5) * 44,
        phase: Math.random() * Math.PI * 2,
      });
    }
    this.scene.add(this.firefliesMesh);
  }

  update(dt, timeSystem) {
    const now = performance.now() * 0.001;
    if (this.skyUniforms) {
      this.skyUniforms.uTopColor.value.copy(timeSystem.colors.skyTop);
      this.skyUniforms.uMidColor.value.copy(timeSystem.colors.skyMid);
      this.skyUniforms.uHorizonColor.value.copy(timeSystem.colors.skyHorizon);
      this.skyUniforms.uSunDir.value.copy(timeSystem.sunDirection);
      this.skyUniforms.uSunColor.value.copy(timeSystem.colors.sunColor);
      this.skyUniforms.uNightFactor.value = timeSystem.nightFactor;
    }
    if (this.cloudMat) {
      this.cloudMat.color.setHex(0xffffff).lerp(timeSystem.colors.skyHorizon, 0.45);
      this.cloudMat.opacity = THREE.MathUtils.lerp(0.92, 0.32, timeSystem.nightFactor);
    }
    for (const c of this.clouds) {
      c.position.x += c.userData.speed * dt;
      if (c.position.x > 175) c.position.x = -175;
    }

    for (let i = 0; i < this.petalData.length; i++) {
      const p = this.petalData[i];
      p.x += (p.vx + Math.sin(now * 1.3 + p.phase) * 0.35) * dt;
      p.y += p.vy * dt;
      p.z += (p.vz + Math.cos(now * 1.1 + p.phase) * 0.25) * dt;
      if (p.y < 0.08 || p.x > 58 || p.z > 42) {
        p.x = (Math.random() - 0.5) * 105 - 8;
        p.y = 9 + Math.random() * 7;
        p.z = (Math.random() - 0.5) * 80 - 6;
      }
      this._dummy.position.set(p.x, p.y, p.z);
      this._dummy.rotation.set(now * p.rotSpeed + p.phase, now * p.rotSpeed * 0.7, Math.sin(now * 2 + p.phase) * 0.8);
      this._dummy.scale.setScalar(1);
      this._dummy.updateMatrix();
      this.petalsMesh.setMatrixAt(i, this._dummy.matrix);
    }
    this.petalsMesh.instanceMatrix.needsUpdate = true;

    const fireflyAlpha = THREE.MathUtils.clamp((timeSystem.nightFactor - 0.35) * 1.5, 0, 0.95);
    this.fireflyMat.opacity = fireflyAlpha;
    if (fireflyAlpha > 0.02) {
      for (let i = 0; i < this.fireflyData.length; i++) {
        const f = this.fireflyData[i];
        this._dummy.position.set(
          f.baseX + Math.sin(now * 0.7 + f.phase) * 0.9,
          f.baseY + Math.sin(now * 1.1 + f.phase * 1.3) * 0.45,
          f.baseZ + Math.cos(now * 0.6 + f.phase) * 0.9
        );
        this._dummy.rotation.set(0, 0, 0);
        this._dummy.scale.setScalar(0.6 + 0.55 * Math.sin(now * 3.2 + f.phase));
        this._dummy.updateMatrix();
        this.firefliesMesh.setMatrixAt(i, this._dummy.matrix);
      }
      this.firefliesMesh.instanceMatrix.needsUpdate = true;
    }
  }
}
