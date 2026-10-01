// src/world/LightingSky.ts
// 24-hour celestial cycle, anime sky dome, procedural clouds, stars, and dynamic illumination.
import * as THREE from 'three';

export class LightingSky {
  public scene: THREE.Scene;
  public sunLight: THREE.DirectionalLight;
  public hemiLight: THREE.HemisphereLight;
  public skyMesh: THREE.Mesh;
  public starsParticles: THREE.Points;
  public cloudsGroup: THREE.Group;

  // Emissive lights across town that activate at night
  public nightLights: (THREE.Light | THREE.Mesh)[] = [];

  private currentMinutes: number = 9 * 60; // Start at 09:00 AM

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // Anime depth atmospheric fog
    this.scene.fog = new THREE.FogExp2(0xc2e2fe, 0.003);

    // 1. Hemisphere Light (Anime ambient warmth)
    this.hemiLight = new THREE.HemisphereLight(0xfff7e6, 0x8ab4f8, 0.7);
    this.scene.add(this.hemiLight);

    // 2. Main Directional Light (Sun/Moon)
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    this.sunLight.position.set(40, 70, 30);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 250;
    const shadowD = 85;
    this.sunLight.shadow.camera.left = -shadowD;
    this.sunLight.shadow.camera.right = shadowD;
    this.sunLight.shadow.camera.top = shadowD;
    this.sunLight.shadow.camera.bottom = -shadowD;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // 3. Sky Dome
    const skyGeo = new THREE.SphereGeometry(300, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x3a88e9) },
        bottomColor: { value: new THREE.Color(0xc2e2fe) },
        offset: { value: 20 },
        exponent: { value: 0.6 }
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
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize( vWorldPosition + offset ).y;
          gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
        }
      `,
      side: THREE.BackSide,
      depthWrite: false
    });
    this.skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(this.skyMesh);

    // 4. Night Stars
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 280;
      const sinPhi = Math.sin(phi);
      // Keep stars mostly in upper hemisphere
      const y = Math.abs(r * Math.cos(phi)) + 15;
      starPositions[i * 3] = r * sinPhi * Math.sin(theta);
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = r * sinPhi * Math.cos(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.8,
      transparent: true,
      opacity: 0.0
    });
    this.starsParticles = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starsParticles);

    // 5. Stylized Fluffy Anime Clouds
    this.cloudsGroup = new THREE.Group();
    this.createClouds();
    this.scene.add(this.cloudsGroup);

    this.setTime(9, 0); // 09:00 AM
  }

  private createClouds(): void {
    const cloudMat = new THREE.MeshToonMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });

    for (let i = 0; i < 14; i++) {
      const cloud = new THREE.Group();
      const puffCount = 5 + Math.floor(Math.random() * 4);
      for (let p = 0; p < puffCount; p++) {
        const radius = 6 + Math.random() * 7;
        const puffGeo = new THREE.DodecahedronGeometry(radius, 1);
        const puff = new THREE.Mesh(puffGeo, cloudMat);
        puff.position.set((p - puffCount / 2) * 8 + Math.random() * 4, Math.random() * 3, Math.random() * 4);
        cloud.add(puff);
      }
      cloud.position.set(
        (Math.random() - 0.5) * 360,
        65 + Math.random() * 25,
        (Math.random() - 0.5) * 360
      );
      this.cloudsGroup.add(cloud);
    }
  }

  public registerNightLight(lightOrMesh: THREE.Light | THREE.Mesh): void {
    this.nightLights.push(lightOrMesh);
  }

  /** Set time in hours and minutes */
  public setTime(hour: number, minute: number): void {
    this.currentMinutes = (hour * 60 + minute) % 1440;
    this.updateLighting();
  }

  public advanceTime(minutesToAdd: number): void {
    this.currentMinutes = (this.currentMinutes + minutesToAdd) % 1440;
    this.updateLighting();
  }

  public getTime(): { hour: number; minute: number; totalMinutes: number; timeString: string } {
    const hour = Math.floor(this.currentMinutes / 60);
    const minute = Math.floor(this.currentMinutes % 60);
    const hStr = hour.toString().padStart(2, '0');
    const mStr = minute.toString().padStart(2, '0');
    return {
      hour,
      minute,
      totalMinutes: this.currentMinutes,
      timeString: `${hStr}:${mStr}`
    };
  }

  private updateLighting(): void {
    const timeNorm = this.currentMinutes / 1440.0; // 0.0 to 1.0 (0:00 to 24:00)
    const hour = this.currentMinutes / 60.0;

    // Calculate sun angle
    const sunAngle = (hour - 6) * (Math.PI / 12); // Sunrise at 6:00, Sunset at 18:00
    const sunDist = 120;
    const sunY = Math.sin(sunAngle) * sunDist;
    const sunX = Math.cos(sunAngle) * sunDist;
    const sunZ = 30;

    this.sunLight.position.set(sunX, Math.max(10, sunY), sunZ);

    const skyUniforms = (this.skyMesh.material as THREE.ShaderMaterial).uniforms;
    const starMat = this.starsParticles.material as THREE.PointsMaterial;

    // Night detection
    const isNight = hour < 5.0 || hour >= 19.5;
    const isSunset = hour >= 17.0 && hour < 19.5;
    const isDawn = hour >= 5.0 && hour < 7.0;

    if (isNight) {
      // Midnight deep navy
      skyUniforms.topColor.value.setHex(0x0a1128);
      skyUniforms.bottomColor.value.setHex(0x1c2541);
      this.sunLight.color.setHex(0xaecbeb); // Cool moonlight
      this.sunLight.intensity = 0.25;
      this.hemiLight.color.setHex(0x1c2541);
      this.hemiLight.groundColor.setHex(0x0b132b);
      this.hemiLight.intensity = 0.35;
      starMat.opacity = 0.95;
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0x1c2541);
    } else if (isSunset) {
      // Gorgeous anime golden-hour sunset
      const t = (hour - 17.0) / 2.5;
      const topCol = new THREE.Color(0x3a206e).lerp(new THREE.Color(0x1a1235), t);
      const botCol = new THREE.Color(0xff7043).lerp(new THREE.Color(0xd84315), t);
      skyUniforms.topColor.value.copy(topCol);
      skyUniforms.bottomColor.value.copy(botCol);
      this.sunLight.color.setHex(0xff7733);
      this.sunLight.intensity = 0.95;
      this.hemiLight.color.setHex(0xffb74d);
      this.hemiLight.groundColor.setHex(0x5c4d7d);
      this.hemiLight.intensity = 0.65;
      starMat.opacity = t * 0.4;
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.copy(botCol);
    } else if (isDawn) {
      // Soft peach rose dawn
      const t = (hour - 5.0) / 2.0;
      skyUniforms.topColor.value.setHex(0x4a69bd);
      skyUniforms.bottomColor.value.setHex(0xfad390);
      this.sunLight.color.setHex(0xffeaa7);
      this.sunLight.intensity = 0.8;
      this.hemiLight.color.setHex(0xfad390);
      this.hemiLight.groundColor.setHex(0x6a89cc);
      this.hemiLight.intensity = 0.55;
      starMat.opacity = (1 - t) * 0.4;
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0xfad390);
    } else {
      // Clear bright anime daylight
      skyUniforms.topColor.value.setHex(0x2980b9);
      skyUniforms.bottomColor.value.setHex(0x9bd8ff);
      this.sunLight.color.setHex(0xfffbe8);
      this.sunLight.intensity = 1.25;
      this.hemiLight.color.setHex(0xffffff);
      this.hemiLight.groundColor.setHex(0xa8d5e5);
      this.hemiLight.intensity = 0.75;
      starMat.opacity = 0.0;
      if (this.scene.fog) (this.scene.fog as THREE.FogExp2).color.setHex(0xc2e2fe);
    }

    // Toggle streetlights / night window glows
    const nightLightsActive = isNight || (hour >= 18.0);
    this.nightLights.forEach((obj) => {
      if ('intensity' in obj) {
        (obj as THREE.Light).intensity = nightLightsActive ? 1.0 : 0.0;
      } else if ('visible' in obj) {
        obj.visible = nightLightsActive;
      }
    });
  }

  public update(delta: number): void {
    // Slowly drift clouds across the sky
    this.cloudsGroup.children.forEach((cloud, i) => {
      cloud.position.x += delta * (1.2 + (i % 3) * 0.4);
      if (cloud.position.x > 220) {
        cloud.position.x = -220;
      }
    });
  }
}
