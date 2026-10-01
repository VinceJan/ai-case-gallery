// src/world/LightingSky.ts
// 24-hour dynamic celestial lighting, procedural anime sky dome, and night illumination.
import * as THREE from 'three';
import { TimeState } from '../types';

export class LightingSky {
  public scene: THREE.Scene;
  public dirLight: THREE.DirectionalLight;
  public hemiLight: THREE.HemisphereLight;
  public skyMesh: THREE.Mesh;

  // Night lighting groups (streetlamps, windows, signs)
  private nightLights: THREE.Light[] = [];
  private glowingMaterials: THREE.MeshStandardMaterial[] = [];

  // Time state (default: 10:30 AM late spring morning)
  private currentHour: number = 10.5;
  private timeSpeed: number = 0.05; // 1 real sec = 3 game minutes
  private isPaused: boolean = false;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // 1. Hemisphere Light (Anime sky/ground contrast)
    this.hemiLight = new THREE.HemisphereLight(0xfff3e0, 0x7da4c4, 0.85);
    this.scene.add(this.hemiLight);

    // 2. Main Directional Sunlight / Moonlight with Cascaded Shadows
    this.dirLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    this.dirLight.position.set(40, 70, 30);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 1;
    this.dirLight.shadow.camera.far = 280;
    this.dirLight.shadow.camera.left = -90;
    this.dirLight.shadow.camera.right = 90;
    this.dirLight.shadow.camera.top = 90;
    this.dirLight.shadow.camera.bottom = -90;
    this.dirLight.shadow.bias = -0.0004;
    this.scene.add(this.dirLight);

    // 3. Procedural Sky Dome
    this.skyMesh = this.buildAnimeSkyDome();
    this.scene.add(this.skyMesh);

    this.updateLighting(this.currentHour);
  }

  private buildAnimeSkyDome(): THREE.Mesh {
    const geo = new THREE.SphereGeometry(380, 32, 24);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTopColor: { value: new THREE.Color(0x4a90e2) },
        uMidColor: { value: new THREE.Color(0xa0d8ef) },
        uBottomColor: { value: new THREE.Color(0xffe6eb) },
        uSunPos: { value: new THREE.Vector3(0, 1, 0) }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uMidColor;
        uniform vec3 uBottomColor;
        varying vec3 vWorldPosition;

        void main() {
          vec3 dir = normalize(vWorldPosition);
          float h = clamp(dir.y * 1.5 + 0.1, 0.0, 1.0);
          vec3 sky = mix(uBottomColor, uMidColor, smoothstep(0.0, 0.4, h));
          sky = mix(sky, uTopColor, smoothstep(0.4, 1.0, h));
          gl_FragColor = vec4(sky, 1.0);
        }
      `
    });

    return new THREE.Mesh(geo, mat);
  }

  public registerNightLight(light: THREE.Light): void {
    this.nightLights.push(light);
  }

  public registerGlowingMaterial(mat: THREE.MeshStandardMaterial): void {
    this.glowingMaterials.push(mat);
  }

  public update(delta: number): void {
    if (!this.isPaused) {
      this.currentHour = (this.currentHour + delta * this.timeSpeed) % 24;
      this.updateLighting(this.currentHour);
    }
  }

  public setTime(hour: number): void {
    this.currentHour = (hour % 24 + 24) % 24;
    this.updateLighting(this.currentHour);
  }

  public getTime(): TimeState {
    const hour = Math.floor(this.currentHour);
    const minute = Math.floor((this.currentHour - hour) * 60);
    const isDay = this.currentHour >= 5.5 && this.currentHour < 18.5;
    const isNight = !isDay;
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return {
      hour,
      minute,
      day: 1,
      isDaytime: isDay,
      isNight,
      formattedTime
    };
  }

  public togglePauseTime(): boolean {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  private updateLighting(hour: number): void {
    const skyShader = this.skyMesh.material as THREE.ShaderMaterial;
    const topCol = skyShader.uniforms.uTopColor.value as THREE.Color;
    const midCol = skyShader.uniforms.uMidColor.value as THREE.Color;
    const btmCol = skyShader.uniforms.uBottomColor.value as THREE.Color;

    // Angle of sun in sky (0 = midnight, 6 = dawn, 12 = noon, 18 = dusk)
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const sunX = Math.cos(angle) * 120;
    const sunY = Math.sin(angle) * 120;
    const sunZ = 40;

    this.dirLight.position.set(sunX, Math.max(sunY, -30), sunZ);
    skyShader.uniforms.uSunPos.value.set(sunX, sunY, sunZ).normalize();

    // Night toggle (18:30 to 5:30)
    const isNightTime = hour < 5.5 || hour >= 18.5;
    const nightIntensity = isNightTime ? 1.0 : 0.0;

    this.nightLights.forEach((light) => {
      light.intensity = nightIntensity * (light.userData.baseIntensity || 1.2);
    });

    this.glowingMaterials.forEach((mat) => {
      mat.emissiveIntensity = isNightTime ? 0.9 : 0.05;
    });

    if (hour >= 5.0 && hour < 7.0) {
      // Dawn (朝焼け)
      const t = (hour - 5.0) / 2.0;
      topCol.setHex(0x5c6bc0).lerp(new THREE.Color(0x42a5f5), t);
      midCol.setHex(0xffb74d).lerp(new THREE.Color(0xffe0b2), t);
      btmCol.setHex(0xf48fb1).lerp(new THREE.Color(0xffcdd2), t);
      this.dirLight.color.setHex(0xffe0b2);
      this.dirLight.intensity = 0.8 + t * 0.4;
      this.hemiLight.intensity = 0.6;
    } else if (hour >= 7.0 && hour < 16.5) {
      // Daytime (青空)
      topCol.setHex(0x2196f3);
      midCol.setHex(0x81d4fa);
      btmCol.setHex(0xffebee);
      this.dirLight.color.setHex(0xfffaf0);
      this.dirLight.intensity = 1.35;
      this.hemiLight.color.setHex(0xffffff);
      this.hemiLight.groundColor.setHex(0x90caf9);
      this.hemiLight.intensity = 0.85;
    } else if (hour >= 16.5 && hour < 19.0) {
      // Golden Hour / Twilight (夕暮れ)
      const t = (hour - 16.5) / 2.5;
      topCol.setHex(0x2196f3).lerp(new THREE.Color(0x283593), t);
      midCol.setHex(0xff9800).lerp(new THREE.Color(0xd81b60), t);
      btmCol.setHex(0xffe082).lerp(new THREE.Color(0x512da8), t);
      this.dirLight.color.setHex(0xffb74d);
      this.dirLight.intensity = 1.2 - t * 0.7;
      this.hemiLight.intensity = 0.7 - t * 0.3;
    } else {
      // Night (星空・月夜)
      topCol.setHex(0x0a0e2a);
      midCol.setHex(0x1a237e);
      btmCol.setHex(0x283593);
      this.dirLight.color.setHex(0x8c9eff);
      this.dirLight.intensity = 0.35;
      this.hemiLight.color.setHex(0x303f9f);
      this.hemiLight.groundColor.setHex(0x1a237e);
      this.hemiLight.intensity = 0.4;
    }
  }
}
