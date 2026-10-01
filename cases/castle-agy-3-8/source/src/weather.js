import * as THREE from 'three';

export class WeatherSystem {
  constructor(scene, renderer, materials, village) {
    this.scene = scene;
    this.renderer = renderer;
    this.mat = materials;
    this.village = village;

    this.currentPreset = 'day';
    this.targetPreset = 'day';
    this.transitionProgress = 1.0;

    // Lights
    this.sunLight = null;
    this.ambientLight = null;
    this.hemisphereLight = null;

    // Particles & FX
    this.clouds = [];
    this.rainParticles = null;
    this.snowParticles = null;
    this.fireflies = null;
    this.stars = null;

    this.initLighting();
    this.initClouds();
    this.initRain();
    this.initSnow();
    this.initNightFX();

    this.setPreset('day', true);
  }

  initLighting() {
    // Directional Sunlight / Moonlight
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    this.sunLight.position.set(30, 45, 25);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 120;
    const d = 34;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // Ambient Lighting
    this.ambientLight = new THREE.AmbientLight(0xdceefb, 0.65);
    this.scene.add(this.ambientLight);

    // Hemisphere light for natural sky/ground contrast
    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x5a6268, 0.4);
    this.scene.add(this.hemisphereLight);

    // Scene Fog
    this.scene.fog = new THREE.FogExp2(0xcde6f7, 0.009);
  }

  initClouds() {
    // Drifting stylized low-poly cumulus clouds
    this.cloudGroup = new THREE.Group();
    const cloudCount = 8;

    for (let c = 0; c < cloudCount; c++) {
      const cloud = new THREE.Group();
      const puffCount = 5 + Math.floor(Math.random() * 4);
      const puffMat = new THREE.MeshToonMaterial({
        color: 0xffffff,
        gradientMap: this.mat.softGradientMap,
      });

      for (let p = 0; p < puffCount; p++) {
        const r = 1.2 + Math.random() * 1.5;
        const puffGeo = new THREE.DodecahedronGeometry(r, 1);
        const puff = new THREE.Mesh(puffGeo, puffMat);
        puff.position.set(
          (p - puffCount / 2) * 1.6 + (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 1.0
        );
        cloud.add(puff);
      }

      cloud.position.set(
        (Math.random() - 0.5) * 60,
        24 + Math.random() * 6,
        (Math.random() - 0.5) * 60
      );
      cloud.userData = {
        speed: 0.8 + Math.random() * 0.6,
      };

      this.cloudGroup.add(cloud);
      this.clouds.push(cloud);
    }

    this.scene.add(this.cloudGroup);
  }

  initRain() {
    // Instanced rain streaks
    const rainCount = 650;
    const rainGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 3);
    const rainMat = new THREE.MeshBasicMaterial({
      color: 0xa4b0be,
      transparent: true,
      opacity: 0.55,
    });

    const instancedRain = new THREE.InstancedMesh(rainGeo, rainMat, rainCount);
    const dummy = new THREE.Object3D();
    instancedRain.userData = { positions: [] };

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 52;
      const y = Math.random() * 32;
      const z = (Math.random() - 0.5) * 52;
      dummy.position.set(x, y, z);
      dummy.rotation.z = 0.08; // slight wind slant
      dummy.updateMatrix();
      instancedRain.setMatrixAt(i, dummy.matrix);
      instancedRain.userData.positions.push({ x, y, z, speed: 28 + Math.random() * 8 });
    }

    instancedRain.instanceMatrix.needsUpdate = true;
    instancedRain.visible = false;
    this.rainParticles = instancedRain;
    this.scene.add(instancedRain);
  }

  initSnow() {
    // Instanced snowflakes
    const snowCount = 500;
    const snowGeo = new THREE.DodecahedronGeometry(0.09, 0);
    const snowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });

    const instancedSnow = new THREE.InstancedMesh(snowGeo, snowMat, snowCount);
    const dummy = new THREE.Object3D();
    instancedSnow.userData = { positions: [] };

    for (let i = 0; i < snowCount; i++) {
      const x = (Math.random() - 0.5) * 52;
      const y = Math.random() * 30;
      const z = (Math.random() - 0.5) * 52;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instancedSnow.setMatrixAt(i, dummy.matrix);
      instancedSnow.userData.positions.push({
        x,
        y,
        z,
        speed: 3.5 + Math.random() * 2.0,
        swaySpeed: 1.5 + Math.random() * 2.0,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    instancedSnow.instanceMatrix.needsUpdate = true;
    instancedSnow.visible = false;
    this.snowParticles = instancedSnow;
    this.scene.add(instancedSnow);
  }

  initNightFX() {
    // 1. Twinkling Sky Stars
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Hemisphere dome
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0) * 0.45;
      const r = 70;
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.cos(phi) + 10;
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      transparent: true,
      opacity: 0,
    });
    this.stars = new THREE.Points(starGeo, starMat);
    this.scene.add(this.stars);

    // 2. Fireflies (萤火虫) drifting in village & meadows
    const flyCount = 30;
    const flyGeo = new THREE.BufferGeometry();
    const flyPos = new Float32Array(flyCount * 3);
    const flyData = [];

    for (let i = 0; i < flyCount; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = 1.5 + Math.random() * 4.0;
      const z = (Math.random() - 0.5) * 36;
      flyPos[i * 3] = x;
      flyPos[i * 3 + 1] = y;
      flyPos[i * 3 + 2] = z;
      flyData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 0.8,
      });
    }

    flyGeo.setAttribute('position', new THREE.BufferAttribute(flyPos, 3));
    const flyMat = new THREE.PointsMaterial({
      color: 0xa3e635,
      size: 0.45,
      transparent: true,
      opacity: 0,
    });
    this.fireflies = new THREE.Points(flyGeo, flyMat);
    this.fireflies.userData = { flyData };
    this.scene.add(this.fireflies);
  }

  // Presets definition
  getPresetData(name) {
    switch (name) {
      case 'sunset':
        return {
          skyColor: 0xf39c12,
          fogColor: 0xe67e22,
          sunColor: 0xff793f,
          sunIntensity: 1.6,
          sunPos: new THREE.Vector3(45, 16, 25),
          ambientColor: 0xffbe76,
          ambientIntensity: 0.7,
          hemiSky: 0xfdcb6e,
          hemiGround: 0xd35400,
          lanterns: true,
          rain: false,
          snow: false,
          stars: false,
          fireflies: true,
        };
      case 'rain':
        return {
          skyColor: 0x57606f,
          fogColor: 0x747d8c,
          sunColor: 0xa4b0be,
          sunIntensity: 0.7,
          sunPos: new THREE.Vector3(15, 35, 15),
          ambientColor: 0x8395a7,
          ambientIntensity: 0.55,
          hemiSky: 0x747d8c,
          hemiGround: 0x2f3542,
          lanterns: true,
          rain: true,
          snow: false,
          stars: false,
          fireflies: false,
        };
      case 'night':
        return {
          skyColor: 0x0a1128,
          fogColor: 0x0c1b33,
          sunColor: 0x70a1ff, // Moonlight
          sunIntensity: 0.45,
          sunPos: new THREE.Vector3(-25, 40, -20),
          ambientColor: 0x1e272e,
          ambientIntensity: 0.45,
          hemiSky: 0x2f3542,
          hemiGround: 0x11141a,
          lanterns: true,
          rain: false,
          snow: false,
          stars: true,
          fireflies: true,
        };
      case 'snow':
        return {
          skyColor: 0xc7ecee,
          fogColor: 0xdff9fb,
          sunColor: 0xf5f6fa,
          sunIntensity: 1.1,
          sunPos: new THREE.Vector3(25, 40, 20),
          ambientColor: 0xdff9fb,
          ambientIntensity: 0.7,
          hemiSky: 0xffffff,
          hemiGround: 0x7ed6df,
          lanterns: true,
          rain: false,
          snow: true,
          stars: false,
          fireflies: false,
        };
      case 'day':
      default:
        return {
          skyColor: 0x81d4fa,
          fogColor: 0xb3e5fc,
          sunColor: 0xfffcf0,
          sunIntensity: 1.4,
          sunPos: new THREE.Vector3(30, 45, 25),
          ambientColor: 0xdceefb,
          ambientIntensity: 0.65,
          hemiSky: 0xffffff,
          hemiGround: 0x636e72,
          lanterns: false,
          rain: false,
          snow: false,
          stars: false,
          fireflies: false,
        };
    }
  }

  setPreset(name, immediate = false) {
    this.targetPreset = name;
    if (immediate) {
      this.currentPreset = name;
      this.applyPreset(name);
    }
  }

  applyPreset(name) {
    const data = this.getPresetData(name);

    this.scene.background = new THREE.Color(data.skyColor);
    this.scene.fog.color.setHex(data.fogColor);

    this.sunLight.color.setHex(data.sunColor);
    this.sunLight.intensity = data.sunIntensity;
    this.sunLight.position.copy(data.sunPos);

    this.ambientLight.color.setHex(data.ambientColor);
    this.ambientLight.intensity = data.ambientIntensity;

    this.hemisphereLight.color.setHex(data.hemiSky);
    this.hemisphereLight.groundColor.setHex(data.hemiGround);

    // Toggle FX visibility
    if (this.rainParticles) this.rainParticles.visible = data.rain;
    if (this.snowParticles) this.snowParticles.visible = data.snow;
    if (this.stars) this.stars.material.opacity = data.stars ? 0.9 : 0.0;
    if (this.fireflies) this.fireflies.material.opacity = data.fireflies ? 0.85 : 0.0;

    // Toggle Village Lanterns
    if (this.village && this.village.lanternLights) {
      this.village.lanternLights.forEach(l => {
        l.intensity = data.lanterns ? 1.0 : 0.05;
      });
    }
  }

  update(delta, time) {
    // 1. Slow drift of clouds across the sky
    this.clouds.forEach(cloud => {
      cloud.position.x += cloud.userData.speed * delta;
      if (cloud.position.x > 38) {
        cloud.position.x = -38;
        cloud.position.z = (Math.random() - 0.5) * 50;
      }
    });

    // 2. Slow shifting of sun angle (光影缓变)
    const sunSway = Math.sin(time * 0.15) * 1.5;
    this.sunLight.position.x += Math.sin(time * 0.1) * 0.02;

    // 3. Rain animation
    if (this.rainParticles && this.rainParticles.visible) {
      const dummy = new THREE.Object3D();
      const posData = this.rainParticles.userData.positions;
      for (let i = 0; i < posData.length; i++) {
        const p = posData[i];
        p.y -= p.speed * delta;
        if (p.y < 0.2) p.y = 30 + Math.random() * 4;

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.z = 0.08;
        dummy.updateMatrix();
        this.rainParticles.setMatrixAt(i, dummy.matrix);
      }
      this.rainParticles.instanceMatrix.needsUpdate = true;
    }

    // 4. Snow animation
    if (this.snowParticles && this.snowParticles.visible) {
      const dummy = new THREE.Object3D();
      const posData = this.snowParticles.userData.positions;
      for (let i = 0; i < posData.length; i++) {
        const p = posData[i];
        p.y -= p.speed * delta;
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * 0.04;
        if (p.y < 0.2) p.y = 28 + Math.random() * 4;

        dummy.position.set(p.x, p.y, p.z);
        dummy.updateMatrix();
        this.snowParticles.setMatrixAt(i, dummy.matrix);
      }
      this.snowParticles.instanceMatrix.needsUpdate = true;
    }

    // 5. Fireflies drifting & glowing
    if (this.fireflies && this.fireflies.material.opacity > 0.05) {
      const posAttr = this.fireflies.geometry.attributes.position;
      const flyData = this.fireflies.userData.flyData;

      for (let i = 0; i < flyData.length; i++) {
        const d = flyData[i];
        const nx = d.baseX + Math.sin(time * d.speed + d.phase) * 1.5;
        const ny = d.baseY + Math.cos(time * d.speed * 0.7 + d.phase) * 0.6;
        const nz = d.baseZ + Math.sin(time * d.speed * 0.5 + d.phase) * 1.5;
        posAttr.setXYZ(i, nx, ny, nz);
      }
      posAttr.needsUpdate = true;
    }
  }
}
