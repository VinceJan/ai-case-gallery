import * as THREE from 'three';

/**
 * Day/Night Cycle, Sky Dome, Sun/Moon Shadows, Sakura Petals,
 * Optional Spring Rain (桜雨), and Live Town Lighting Synchronization.
 */
export class AtmosphereSystem {
  constructor(scene, worldRefs) {
    this.scene = scene;
    this.worldRefs = worldRefs;

    // Time of day in minutes [0..1440), starts at a lovely spring morning 08:30
    this.timeMinutes = 8 * 60 + 30;
    this.timeSpeed = 1; // 1 = 10 game-minutes per real 10s (gentle pace); toggleable 1x / 3x / 0x
    this.isRaining = false;
    this.festivalUnlocked = false;
    this.homeLampOn = true;
    this.nightFactor = 0;

    this._setupLights();
    this._setupSkyAndStars();
    this._setupSakuraPetals();
    this._setupRain();
  }

  _setupLights() {
    this.hemiLight = new THREE.HemisphereLight(0xfff4e8, 0x7a9670, 0.95);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff1d6, 1.55);
    this.sunLight.position.set(28, 42, 22);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.near = 5;
    this.sunLight.shadow.camera.far = 140;
    const d = 56;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0007;
    this.scene.add(this.sunLight);

    this.scene.fog = new THREE.FogExp2(0xdfe8f2, 0.0062);
    this.scene.background = new THREE.Color(0xcce2f6);
  }

  _setupSkyAndStars() {
    // Twinkling starfield shown gently at night
    const starCount = 220;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.42;
      const r = 135;
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.cos(phi) * r + 8;
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.starMat = new THREE.PointsMaterial({
      color: 0xfff8e6, size: 1.35, transparent: true, opacity: 0, depthWrite: false,
    });
    this.stars = new THREE.Points(starGeo, this.starMat);
    this.scene.add(this.stars);
  }

  _setupSakuraPetals() {
    const count = 260;
    this.petalData = [];
    const geo = new THREE.PlaneGeometry(0.14, 0.1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffd2e0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    this.petalMesh = new THREE.InstancedMesh(geo, mat, count);
    this.petalDummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      this.petalData.push({
        x: (Math.random() - 0.5) * 90,
        y: 1 + Math.random() * 14,
        z: (Math.random() - 0.5) * 85,
        vx: 0.55 + Math.random() * 0.55,
        vy: -(0.35 + Math.random() * 0.35),
        vz: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    this.scene.add(this.petalMesh);
  }

  _setupRain() {
    const count = 650;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = Math.random() * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.rainMat = new THREE.PointsMaterial({
      color: 0xcbe2f5, size: 0.22, transparent: true, opacity: 0.65,
    });
    this.rainPoints = new THREE.Points(geo, this.rainMat);
    this.rainPoints.visible = false;
    this.scene.add(this.rainPoints);
  }

  getHour() {
    return this.timeMinutes / 60;
  }

  getFormattedTime() {
    const total = Math.floor(this.timeMinutes) % 1440;
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  getPeriodInfo() {
    const h = this.getHour();
    if (h >= 5 && h < 10) return { label: '早晨', icon: '🌅' };
    if (h >= 10 && h < 16.5) return { label: '白天', icon: '☀️' };
    if (h >= 16.5 && h < 19.2) return { label: '傍晚', icon: '🌇' };
    return { label: '夜晚', icon: '🌙' };
  }

  isCafeOpen() {
    const h = this.getHour();
    return h >= 8 && h < 21;
  }

  update(dt, elapsed, playerPos, residentHomeMap = {}) {
    // Advance game clock (~1.2 game minutes per real second at 1x -> 20 min full day, comfortable!)
    this.timeMinutes = (this.timeMinutes + dt * 2.2 * this.timeSpeed) % 1440;
    const h = this.getHour();

    // Compute smooth lighting palette keyframes
    const skyColor = new THREE.Color();
    const fogColor = new THREE.Color();
    const sunColor = new THREE.Color();
    let sunIntensity = 1.5;
    let hemiIntensity = 0.95;

    if (h >= 5 && h < 8) {
      // Dawn -> Morning
      const t = (h - 5) / 3;
      skyColor.lerpColors(new THREE.Color(0x3a4369), new THREE.Color(0xcce2f6), t);
      fogColor.lerpColors(new THREE.Color(0x9d7a8e), new THREE.Color(0xe6eef6), t);
      sunColor.lerpColors(new THREE.Color(0xffb48a), new THREE.Color(0xfff1d6), t);
      sunIntensity = 0.45 + t * 1.1;
      hemiIntensity = 0.5 + t * 0.45;
      this.nightFactor = 1 - t;
    } else if (h >= 8 && h < 16.5) {
      // Clear warm spring daytime
      skyColor.set(0xc6e2f8);
      fogColor.set(0xe4eef7);
      sunColor.set(0xfff4de);
      sunIntensity = 1.55;
      hemiIntensity = 0.95;
      this.nightFactor = 0;
    } else if (h >= 16.5 && h < 19.5) {
      // Golden sakura sunset -> Twilight
      const t = (h - 16.5) / 3;
      if (t < 0.55) {
        const s = t / 0.55;
        skyColor.lerpColors(new THREE.Color(0xc6e2f8), new THREE.Color(0xf2a58c), s);
        fogColor.lerpColors(new THREE.Color(0xe4eef7), new THREE.Color(0xf3beaa), s);
        sunColor.lerpColors(new THREE.Color(0xfff4de), new THREE.Color(0xff9d66), s);
        sunIntensity = 1.55 - s * 0.45;
      } else {
        const s = (t - 0.55) / 0.45;
        skyColor.lerpColors(new THREE.Color(0xf2a58c), new THREE.Color(0x1f2847), s);
        fogColor.lerpColors(new THREE.Color(0xf3beaa), new THREE.Color(0x252f4d), s);
        sunColor.lerpColors(new THREE.Color(0xff9d66), new THREE.Color(0x88a2d8), s);
        sunIntensity = 1.1 - s * 0.72;
      }
      hemiIntensity = 0.95 - t * 0.58;
      this.nightFactor = Math.max(0, (t - 0.35) / 0.65);
    } else {
      // Serene Japanese spring night
      skyColor.set(0x1b233d);
      fogColor.set(0x222b46);
      sunColor.set(0x91abd9);
      sunIntensity = 0.36;
      hemiIntensity = 0.36;
      this.nightFactor = 1;
    }

    // Rain overcast modulation
    if (this.isRaining) {
      skyColor.lerp(new THREE.Color(0x7c8e9e), 0.45);
      fogColor.lerp(new THREE.Color(0x8b9aa8), 0.45);
      sunIntensity *= 0.65;
    }

    this.scene.background.copy(skyColor);
    this.scene.fog.color.copy(fogColor);
    this.scene.fog.density = this.isRaining ? 0.0095 : 0.0058;
    this.sunLight.color.copy(sunColor);
    this.sunLight.intensity = sunIntensity;
    this.hemiLight.intensity = hemiIntensity;

    // Sun arc position across sky
    const sunAngle = ((h - 6) / 12) * Math.PI;
    const isDay = h >= 6 && h <= 18.8;
    if (isDay) {
      this.sunLight.position.set(
        Math.cos(sunAngle) * 44,
        Math.max(10, Math.sin(sunAngle) * 48),
        24
      );
    } else {
      this.sunLight.position.set(-22, 34, -18); // Moon angle
    }

    this.starMat.opacity = Math.max(0, this.nightFactor - 0.2) * (this.isRaining ? 0.15 : 0.9);

    // Sync town streetlights, shrine stone lanterns, café business hours, home lamp & house windows
    const duskGlow = Math.max(0, Math.min(1, (this.nightFactor - 0.1) * 1.35));

    for (const sl of this.worldRefs.streetLights) {
      if (sl.light) sl.light.intensity = duskGlow * sl.baseIntensity;
      if (sl.bulbMat) sl.bulbMat.emissiveIntensity = duskGlow * 2.2;
    }
    for (const lm of this.worldRefs.shrineLanternMats) {
      lm.emissiveIntensity = 0.12 + duskGlow * 1.45;
    }

    // Sakura Mart shines brightly as the iconic night convenience store beacon!
    for (const ml of this.worldRefs.martLights) {
      if (ml.isLight) ml.intensity = 1.6 + duskGlow * 1.4;
      else ml.emissiveIntensity = 0.42 + duskGlow * 0.68;
    }

    // Café Komorebi closes at 21:00 -> sign dims & lights switch off!
    const cafeOpen = this.isCafeOpen();
    if (this.worldRefs.doors.cafe) {
      this.worldRefs.doors.cafe.isClosedForNight = !cafeOpen;
    }
    if (this.worldRefs.cafeSignMat) {
      this.worldRefs.cafeSignMat.emissiveIntensity = cafeOpen ? 0.35 + duskGlow * 0.65 : 0.0;
    }
    for (const cl of this.worldRefs.cafeLights) {
      cl.intensity = cafeOpen ? 1.5 + duskGlow * 1.0 : 0.0;
    }

    // Player home floor lamp toggle
    if (this.worldRefs.homeLampLight) {
      this.worldRefs.homeLampLight.intensity = this.homeLampOn ? 1.9 : 0;
    }
    if (this.worldRefs.homeLampShadeMat) {
      this.worldRefs.homeLampShadeMat.emissiveIntensity = this.homeLampOn ? 0.95 : 0;
    }

    // Resident house windows light up warmly when resident is home & evening/night!
    for (const [resId, mats] of Object.entries(this.worldRefs.houseWindows)) {
      const isHome = residentHomeMap[resId] ?? false;
      const glow = isHome ? Math.max(0.22, duskGlow * 1.15) : duskGlow * 0.15;
      for (const m of mats) m.emissiveIntensity = glow;
    }
    for (const m of this.worldRefs.genericWindows) {
      m.emissiveIntensity = duskGlow * 0.85;
    }

    // Riverside festival lanterns glow warmly once unlocked (and softly at dusk)
    for (const fl of this.worldRefs.festivalLanterns) {
      fl.emissiveIntensity = this.festivalUnlocked ? 0.7 + duskGlow * 1.2 : duskGlow * 0.25;
    }

    // Spin classic barber pole!
    if (this.worldRefs.barberPole) {
      this.worldRefs.barberPole.rotation.y += dt * 1.8;
    }

    // Animate drifting sakura petals
    for (let i = 0; i < this.petalData.length; i++) {
      const p = this.petalData[i];
      p.x += (p.vx + Math.sin(elapsed + p.phase) * 0.3) * dt;
      p.y += p.vy * dt;
      p.z += (p.vz + Math.cos(elapsed * 0.8 + p.phase) * 0.25) * dt;
      if (p.y < 0.08) {
        p.y = 9 + Math.random() * 6;
        p.x = playerPos.x + (Math.random() - 0.5) * 60;
        p.z = playerPos.z + (Math.random() - 0.5) * 60;
      }
      this.petalDummy.position.set(p.x, p.y, p.z);
      this.petalDummy.rotation.set(elapsed * 1.4 + p.phase, elapsed + p.phase, elapsed * 0.7);
      this.petalDummy.updateMatrix();
      this.petalMesh.setMatrixAt(i, this.petalDummy.matrix);
    }
    this.petalMesh.instanceMatrix.needsUpdate = true;

    // Optional Spring Rain animation
    this.rainPoints.visible = this.isRaining;
    if (this.isRaining) {
      const posAttr = this.rainPoints.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let ry = posAttr.getY(i) - 18 * dt;
        if (ry < 0) {
          ry = 22;
          posAttr.setX(i, playerPos.x + (Math.random() - 0.5) * 46);
          posAttr.setZ(i, playerPos.z + (Math.random() - 0.5) * 46);
        }
        posAttr.setY(i, ry);
      }
      posAttr.needsUpdate = true;
    }
  }
}
