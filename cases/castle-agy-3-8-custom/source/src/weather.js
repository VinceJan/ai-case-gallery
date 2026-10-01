import * as THREE from 'three';
import { PALETTE } from './constants.js';

export const WEATHER_TYPES = {
  SUNNY: 'SUNNY',
  DUSK: 'DUSK',
  RAIN: 'RAIN',
  SNOW: 'SNOW',
  NIGHT: 'NIGHT'
};

export class WeatherSystem {
  constructor(scene, renderer, nightLights = []) {
    this.scene = scene;
    this.renderer = renderer;
    this.nightLights = nightLights;

    this.currentWeather = WEATHER_TYPES.SUNNY;
    this.targetWeather = WEATHER_TYPES.SUNNY;
    this.weatherTransition = 1.0;

    // Time of day (0.0 to 24.0, default 13.5 midday)
    this.timeOfDay = 13.5;
    this.autoCycle = false;
    this.cycleSpeed = 0.4; // hours per second

    // Lighting setup
    this.setupLighting();

    // Floating Clouds System
    this.setupClouds();

    // Rain Particle System
    this.setupRain();

    // Snow Particle System
    this.setupSnow();

    // Fireflies System (for night)
    this.setupFireflies();

    // Apply initial state
    this.applyWeather(this.currentWeather, true);
  }

  setupLighting() {
    // 1. Directional Sun/Moon light
    this.dirLight = new THREE.DirectionalLight(0xfff4dc, 2.2);
    this.dirLight.position.set(28, 38, 24);
    this.dirLight.castShadow = true;

    // Shadow Map configuration for crisp cel shadows
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 5;
    this.dirLight.shadow.camera.far = 100;
    const d = 34;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0008;
    this.dirLight.shadow.normalBias = 0.03;
    this.scene.add(this.dirLight);

    // 2. Ambient Light (sky/ground dual hemisphere fill)
    this.hemiLight = new THREE.HemisphereLight(0xbfe0ff, 0x5a6344, 0.95);
    this.scene.add(this.hemiLight);

    // 3. Subtle bounce light from the diorama front
    this.fillLight = new THREE.DirectionalLight(0xa5c9eb, 0.45);
    this.fillLight.position.set(-20, 15, -15);
    this.scene.add(this.fillLight);

    // Scene fog for atmospheric depth
    this.scene.fog = new THREE.FogExp2(0xd6e8f8, 0.007);
    this.scene.background = new THREE.Color(0xd6e8f8);
  }

  // Floating Stylized Puffy Clouds (薄云移动)
  setupClouds() {
    this.cloudsGroup = new THREE.Group();
    this.cloudsGroup.name = 'CloudsGroup';
    this.clouds = [];

    const cloudMat = new THREE.MeshToonMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });

    const cloudPuffGeom = new THREE.DodecahedronGeometry(2.2, 1);

    for (let c = 0; c < 8; c++) {
      const cloud = new THREE.Group();
      // Combine 3-5 puffs into a stylized cumulus cloud
      const puffCount = 3 + Math.floor(Math.random() * 3);
      for (let p = 0; p < puffCount; p++) {
        const puff = new THREE.Mesh(cloudPuffGeom, cloudMat);
        puff.position.set(
          (p - puffCount / 2) * 1.8 + (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 1.5
        );
        const s = 0.7 + Math.random() * 0.6;
        puff.scale.set(s, s * 0.75, s);
        puff.castShadow = true;
        cloud.add(puff);
      }

      cloud.position.set(
        (Math.random() - 0.5) * 60,
        36 + Math.random() * 8,
        (Math.random() - 0.5) * 60
      );
      cloud.speed = 1.0 + Math.random() * 0.7;

      this.cloudsGroup.add(cloud);
      this.clouds.push(cloud);
    }

    this.scene.add(this.cloudsGroup);
  }

  // Rain particle system
  setupRain() {
    this.rainCount = 750;
    const rainGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(this.rainCount * 6); // 2 vertices per streak

    for (let i = 0; i < this.rainCount; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = Math.random() * 35;
      const z = (Math.random() - 0.5) * 55;

      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;

      // Streak end vertex
      positions[i * 6 + 3] = x - 0.15;
      positions[i * 6 + 4] = y - 0.9;
      positions[i * 6 + 5] = z - 0.1;
    }

    rainGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.rainMat = new THREE.LineBasicMaterial({
      color: 0x9bc2e6,
      transparent: true,
      opacity: 0.0
    });

    this.rainLines = new THREE.LineSegments(rainGeom, this.rainMat);
    this.rainLines.visible = false;
    this.scene.add(this.rainLines);
  }

  // Snow particle system
  setupSnow() {
    this.snowCount = 550;
    const snowGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(this.snowCount * 3);
    const wander = new Float32Array(this.snowCount);

    for (let i = 0; i < this.snowCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = Math.random() * 32;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 55;
      wander[i] = Math.random() * Math.PI * 2;
    }

    snowGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.snowWander = wander;

    // Soft snowflake canvas texture
    const snowCanvas = document.createElement('canvas');
    snowCanvas.width = 16;
    snowCanvas.height = 16;
    const sCtx = snowCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(8, 8, 1, 8, 8, 7);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, 'rgba(230, 240, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 16, 16);
    const snowTex = new THREE.CanvasTexture(snowCanvas);

    this.snowMat = new THREE.PointsMaterial({
      map: snowTex,
      size: 0.65,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.snowPoints = new THREE.Points(snowGeom, this.snowMat);
    this.snowPoints.visible = false;
    this.scene.add(this.snowPoints);
  }

  // Fireflies System (萤火虫 - dancing over wheat fields at night)
  setupFireflies() {
    this.fireflyCount = 45;
    const ffGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(this.fireflyCount * 3);
    this.fireflyOrigins = [];

    for (let i = 0; i < this.fireflyCount; i++) {
      // Clustered over wheat fields and stream
      const ox = -14 + Math.random() * 26;
      const oz = 2 + Math.random() * 18;
      const oy = 1.8 + Math.random() * 2.2;
      this.fireflyOrigins.push(new THREE.Vector3(ox, oy, oz));

      positions[i * 3 + 0] = ox;
      positions[i * 3 + 1] = oy;
      positions[i * 3 + 2] = oz;
    }

    ffGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Luminous glowing circle texture
    const ffCanvas = document.createElement('canvas');
    ffCanvas.width = 16;
    ffCanvas.height = 16;
    const fCtx = ffCanvas.getContext('2d');
    const fGrad = fCtx.createRadialGradient(8, 8, 1, 8, 8, 8);
    fGrad.addColorStop(0, '#fffb96');
    fGrad.addColorStop(0.4, '#a8e038');
    fGrad.addColorStop(1, 'rgba(168, 224, 56, 0.0)');
    fCtx.fillStyle = fGrad;
    fCtx.fillRect(0, 0, 16, 16);
    const ffTex = new THREE.CanvasTexture(ffCanvas);

    this.fireflyMat = new THREE.PointsMaterial({
      map: ffTex,
      size: 0.7,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.fireflyPoints = new THREE.Points(ffGeom, this.fireflyMat);
    this.fireflyPoints.visible = false;
    this.scene.add(this.fireflyPoints);
  }

  // Set weather preset
  setWeather(weatherKey) {
    if (this.currentWeather === weatherKey && !this.targetState) return;
    this.targetWeather = weatherKey;
    this.weatherTransition = 0.0;
    this.applyWeather(weatherKey, false);
  }

  applyWeather(key, instant = false) {
    this.currentWeather = key;

    let sunColor, sunIntensity, sunPos;
    let hemiSky, hemiGround, hemiIntensity;
    let skyColor, fogDensity;
    let rainAlpha = 0.0;
    let snowAlpha = 0.0;
    let fireflyAlpha = 0.0;
    let nightLightsOn = false;

    switch (key) {
      case WEATHER_TYPES.SUNNY:
        sunColor = 0xfff3da;
        sunIntensity = 2.2;
        sunPos = new THREE.Vector3(28, 38, 24);
        hemiSky = 0xbfe2ff;
        hemiGround = 0x64704b;
        hemiIntensity = 0.95;
        skyColor = 0xd6e8f8;
        fogDensity = 0.006;
        break;

      case WEATHER_TYPES.DUSK:
        sunColor = 0xff7438;
        sunIntensity = 2.8;
        sunPos = new THREE.Vector3(34, 14, 28);
        hemiSky = 0xc46b68;
        hemiGround = 0x3d3032;
        hemiIntensity = 0.8;
        skyColor = 0xda7354;
        fogDensity = 0.009;
        nightLightsOn = true;
        break;

      case WEATHER_TYPES.RAIN:
        sunColor = 0x98a8b8;
        sunIntensity = 1.1;
        sunPos = new THREE.Vector3(20, 32, 20);
        hemiSky = 0x8292a4;
        hemiGround = 0x48525b;
        hemiIntensity = 0.9;
        skyColor = 0x8a9aa8;
        fogDensity = 0.016;
        rainAlpha = 0.65;
        break;

      case WEATHER_TYPES.SNOW:
        sunColor = 0xdde7f2;
        sunIntensity = 1.4;
        sunPos = new THREE.Vector3(24, 34, 22);
        hemiSky = 0xcedae6;
        hemiGround = 0x768391;
        hemiIntensity = 1.0;
        skyColor = 0xc6d4e2;
        fogDensity = 0.014;
        snowAlpha = 0.85;
        break;

      case WEATHER_TYPES.NIGHT:
        sunColor = 0x7a9ec7; // moonlight
        sunIntensity = 0.75;
        sunPos = new THREE.Vector3(-22, 32, -20);
        hemiSky = 0x151c33;
        hemiGround = 0x0c111f;
        hemiIntensity = 0.45;
        skyColor = 0x0c1326;
        fogDensity = 0.012;
        fireflyAlpha = 0.9;
        nightLightsOn = true;
        break;
    }

    if (instant) {
      this.dirLight.color.setHex(sunColor);
      this.dirLight.intensity = sunIntensity;
      this.dirLight.position.copy(sunPos);

      this.hemiLight.color.setHex(hemiSky);
      this.hemiLight.groundColor.setHex(hemiGround);
      this.hemiLight.intensity = hemiIntensity;

      this.scene.background.setHex(skyColor);
      this.scene.fog.color.setHex(skyColor);
      this.scene.fog.density = fogDensity;

      this.rainMat.opacity = rainAlpha;
      this.rainLines.visible = rainAlpha > 0.01;

      this.snowMat.opacity = snowAlpha;
      this.snowPoints.visible = snowAlpha > 0.01;

      this.fireflyMat.opacity = fireflyAlpha;
      this.fireflyPoints.visible = fireflyAlpha > 0.01;

      this.nightLights.forEach(item => {
        item.light.intensity = nightLightsOn ? item.maxIntensity : 0.0;
      });
    } else {
      // Smooth interpolation in update loop
      this.targetState = {
        sunColor: new THREE.Color(sunColor),
        sunIntensity,
        sunPos,
        hemiSky: new THREE.Color(hemiSky),
        hemiGround: new THREE.Color(hemiGround),
        hemiIntensity,
        skyColor: new THREE.Color(skyColor),
        fogDensity,
        rainAlpha,
        snowAlpha,
        fireflyAlpha,
        nightLightsOn
      };
    }
  }

  update(delta, time) {
    // 1. Weather transition lerping
    if (this.targetState) {
      this.weatherTransition = Math.min(1.0, this.weatherTransition + delta * 1.5);
      const t = this.weatherTransition;

      this.dirLight.color.lerp(this.targetState.sunColor, 0.08);
      this.dirLight.intensity = THREE.MathUtils.lerp(this.dirLight.intensity, this.targetState.sunIntensity, 0.08);
      this.dirLight.position.lerp(this.targetState.sunPos, 0.08);

      this.hemiLight.color.lerp(this.targetState.hemiSky, 0.08);
      this.hemiLight.groundColor.lerp(this.targetState.hemiGround, 0.08);
      this.hemiLight.intensity = THREE.MathUtils.lerp(this.hemiLight.intensity, this.targetState.hemiIntensity, 0.08);

      this.scene.background.lerp(this.targetState.skyColor, 0.08);
      this.scene.fog.color.lerp(this.targetState.skyColor, 0.08);
      this.scene.fog.density = THREE.MathUtils.lerp(this.scene.fog.density, this.targetState.fogDensity, 0.08);

      this.rainMat.opacity = THREE.MathUtils.lerp(this.rainMat.opacity, this.targetState.rainAlpha, 0.1);
      this.rainLines.visible = this.rainMat.opacity > 0.02;

      this.snowMat.opacity = THREE.MathUtils.lerp(this.snowMat.opacity, this.targetState.snowAlpha, 0.1);
      this.snowPoints.visible = this.snowMat.opacity > 0.02;

      this.fireflyMat.opacity = THREE.MathUtils.lerp(this.fireflyMat.opacity, this.targetState.fireflyAlpha, 0.1);
      this.fireflyPoints.visible = this.fireflyMat.opacity > 0.02;

      this.nightLights.forEach(item => {
        const targetInt = this.targetState.nightLightsOn ? item.maxIntensity : 0.0;
        let curr = THREE.MathUtils.lerp(item.light.intensity, targetInt, 0.1);
        if (item.flicker && this.targetState.nightLightsOn) {
          curr += (Math.random() - 0.5) * 0.3;
        }
        item.light.intensity = Math.max(0, curr);
      });

      if (t >= 1.0) {
        this.currentWeather = this.targetWeather;
        this.rainMat.opacity = this.targetState.rainAlpha;
        this.rainLines.visible = this.rainMat.opacity > 0.02;
        this.snowMat.opacity = this.targetState.snowAlpha;
        this.snowPoints.visible = this.snowMat.opacity > 0.02;
        this.fireflyMat.opacity = this.targetState.fireflyAlpha;
        this.fireflyPoints.visible = this.fireflyMat.opacity > 0.02;
        this.targetState = null;
      }
    }

    // 2. Day-Night Auto Cycle
    if (this.autoCycle) {
      this.timeOfDay = (this.timeOfDay + delta * this.cycleSpeed) % 24.0;
      this.syncTimeOfDay(this.timeOfDay);
    }

    // 3. Clouds drifting across diorama (薄云移动)
    this.clouds.forEach(cloud => {
      cloud.position.x += cloud.speed * delta;
      cloud.position.z += (cloud.speed * 0.4) * delta;

      // Wrap around boundary
      if (cloud.position.x > 38) cloud.position.x = -38;
      if (cloud.position.z > 38) cloud.position.z = -38;
    });

    // 4. Rain falling
    if (this.rainLines.visible) {
      const posAttr = this.rainLines.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < this.rainCount; i++) {
        arr[i * 6 + 1] -= 28 * delta;
        arr[i * 6 + 4] -= 28 * delta;

        // Reset when fallen below ground level
        if (arr[i * 6 + 1] < 0) {
          const resetY = 32 + Math.random() * 5;
          arr[i * 6 + 1] = resetY;
          arr[i * 6 + 4] = resetY - 0.9;
        }
      }
      posAttr.needsUpdate = true;
    }

    // 5. Snow gently swirling
    if (this.snowPoints.visible) {
      const sPos = this.snowPoints.geometry.attributes.position;
      const sArr = sPos.array;
      for (let i = 0; i < this.snowCount; i++) {
        sArr[i * 3 + 1] -= 2.8 * delta;
        // Lateral wobble
        this.snowWander[i] += delta * 1.5;
        sArr[i * 3 + 0] += Math.sin(this.snowWander[i]) * 0.05;
        sArr[i * 3 + 2] += Math.cos(this.snowWander[i]) * 0.04;

        if (sArr[i * 3 + 1] < 0.5) {
          sArr[i * 3 + 1] = 30 + Math.random() * 4;
        }
      }
      sPos.needsUpdate = true;
    }

    // 6. Fireflies dancing at night
    if (this.fireflyPoints.visible) {
      const fPos = this.fireflyPoints.geometry.attributes.position;
      const fArr = fPos.array;
      for (let i = 0; i < this.fireflyCount; i++) {
        const origin = this.fireflyOrigins[i];
        const offsetPhase = i * 1.7;
        fArr[i * 3 + 0] = origin.x + Math.sin(time * 1.8 + offsetPhase) * 1.4;
        fArr[i * 3 + 1] = origin.y + Math.sin(time * 2.4 + offsetPhase * 0.5) * 0.6;
        fArr[i * 3 + 2] = origin.z + Math.cos(time * 1.5 + offsetPhase) * 1.4;
      }
      fPos.needsUpdate = true;
    }
  }

  syncTimeOfDay(hour) {
    if (hour >= 6.0 && hour < 16.5) {
      if (this.currentWeather !== WEATHER_TYPES.SUNNY && this.targetWeather !== WEATHER_TYPES.SUNNY) {
        this.setWeather(WEATHER_TYPES.SUNNY);
      }
    } else if (hour >= 16.5 && hour < 19.5) {
      if (this.currentWeather !== WEATHER_TYPES.DUSK && this.targetWeather !== WEATHER_TYPES.DUSK) {
        this.setWeather(WEATHER_TYPES.DUSK);
      }
    } else {
      if (this.currentWeather !== WEATHER_TYPES.NIGHT && this.targetWeather !== WEATHER_TYPES.NIGHT) {
        this.setWeather(WEATHER_TYPES.NIGHT);
      }
    }
  }
}
