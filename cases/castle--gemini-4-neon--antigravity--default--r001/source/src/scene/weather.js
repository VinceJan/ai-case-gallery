import * as THREE from 'three';
import { ENV_UNIFORMS, getToonGradientMap } from './materials.js';

/**
 * Weather presets + Time-of-Day presets with smooth crossfade transitions.
 * Includes:
 * - Soft stylized drifting clouds (薄云移动)
 * - Diagonal rain streaks + puddle splash sparkles (细雨)
 * - Gently swirling snowflakes + global snow accumulation shader cap (飘雪)
 * - Layered drifting valley mist ribbons (薄雾)
 * - Slow natural sunlight drift & shadow breathing (光影缓变)
 */

export const WEATHER_PRESETS = {
  sunny: {
    label: '晴朗',
    wind: 0.75,
    rain: 0.0,
    snow: 0.0,
    mist: 0.0,
    cloudOpacity: 0.72,
    cloudTint: 0xffffff,
    skyDesat: 0.0,
    sunMult: 1.0,
    fogDensity: 0.0085,
    inkStrength: 0.66,
    windowBoost: 0.0,
  },
  rain: {
    label: '细雨',
    wind: 1.65,
    rain: 1.0,
    snow: 0.0,
    mist: 0.35,
    cloudOpacity: 0.88,
    cloudTint: 0x9aa8b8,
    skyDesat: 0.55,
    sunMult: 0.55,
    fogDensity: 0.017,
    inkStrength: 0.58,
    windowBoost: 0.55,
  },
  snow: {
    label: '飘雪',
    wind: 0.95,
    rain: 0.0,
    snow: 1.0,
    mist: 0.28,
    cloudOpacity: 0.85,
    cloudTint: 0xe6edf6,
    skyDesat: 0.35,
    sunMult: 0.78,
    fogDensity: 0.0155,
    inkStrength: 0.54,
    windowBoost: 0.45,
  },
  fog: {
    label: '薄雾',
    wind: 0.42,
    rain: 0.0,
    snow: 0.0,
    mist: 1.0,
    cloudOpacity: 0.82,
    cloudTint: 0xf0eee8,
    skyDesat: 0.42,
    sunMult: 0.7,
    fogDensity: 0.025,
    inkStrength: 0.48,
    windowBoost: 0.3,
  },
};

export const TIME_PRESETS = {
  day: {
    label: '日间',
    sky: 0xd9e8f2,
    fog: 0xdfe9ee,
    sunColor: 0xfff5de,
    sunIntensity: 1.95,
    hemiSky: 0xd8ebff,
    hemiGround: 0xa4947a,
    hemiIntensity: 1.05,
    sunAzimuth: 0.68,
    sunElevation: 0.94,
    inkColor: 0x2f262c,
    windowBase: 0.38,
    darkUI: false,
  },
  dusk: {
    label: '暮色',
    sky: 0xe7b698,
    fog: 0xe2b39c,
    sunColor: 0xffae6b,
    sunIntensity: 1.75,
    hemiSky: 0xf4c3a4,
    hemiGround: 0x6c5964,
    hemiIntensity: 0.88,
    sunAzimuth: 1.25,
    sunElevation: 0.44,
    inkColor: 0x35232b,
    windowBase: 1.05,
    darkUI: false,
  },
  night: {
    label: '星夜',
    sky: 0x24304a,
    fog: 0x25324c,
    sunColor: 0xa7c4f0,
    sunIntensity: 0.88,
    hemiSky: 0x4b6491,
    hemiGround: 0x282738,
    hemiIntensity: 0.72,
    sunAzimuth: -0.65,
    sunElevation: 0.82,
    inkColor: 0x161926,
    windowBase: 1.55,
    darkUI: true,
  },
};

function createSoftMistTexture() {
  const s = 128;
  const canvas = document.createElement('canvas');
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 6, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(248, 250, 252, 0.42)');
  g.addColorStop(0.5, 'rgba(244, 248, 252, 0.18)');
  g.addColorStop(1, 'rgba(244, 248, 252, 0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(canvas);
}

export function createWeatherSystem({
  scene,
  sunLight,
  hemiLight,
  fillLight,
  outlineComposer,
  glowMaterials,
  waterUniforms,
}) {
  const group = new THREE.Group();
  group.name = 'WeatherAndAtmosphere';
  scene.add(group);

  // Current active target modes
  let weatherKey = 'sunny';
  let timeKey = 'day';

  // Smoothly interpolated live parameters
  const live = {
    wind: WEATHER_PRESETS.sunny.wind,
    rain: 0,
    snow: 0,
    mist: 0,
    cloudOpacity: WEATHER_PRESETS.sunny.cloudOpacity,
    sunMult: 1.0,
    fogDensity: WEATHER_PRESETS.sunny.fogDensity,
    inkStrength: WEATHER_PRESETS.sunny.inkStrength,
    windowGlow: TIME_PRESETS.day.windowBase,
    sunAzimuth: TIME_PRESETS.day.sunAzimuth,
    sunElevation: TIME_PRESETS.day.sunElevation,
    skyColor: new THREE.Color(TIME_PRESETS.day.sky),
    fogColor: new THREE.Color(TIME_PRESETS.day.fog),
    sunColor: new THREE.Color(TIME_PRESETS.day.sunColor),
    hemiSky: new THREE.Color(TIME_PRESETS.day.hemiSky),
    hemiGround: new THREE.Color(TIME_PRESETS.day.hemiGround),
    inkColor: new THREE.Color(TIME_PRESETS.day.inkColor),
    cloudColor: new THREE.Color(0xffffff),
  };

  // =========================================================================
  // 1. DRIFTING STYLIZED THIN CLOUDS (薄云移动)
  // =========================================================================
  const cloudMat = new THREE.MeshToonMaterial({
    color: 0xffffff,
    gradientMap: getToonGradientMap(),
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });

  const clouds = [];
  const cloudConfigs = [
    { x: -11, y: 12.2, z: -7.5, s: 1.15, spd: 0.36 },
    { x: -2, y: 13.4, z: -9.8, s: 1.35, spd: 0.28 },
    { x: 7.5, y: 11.8, z: -5.2, s: 1.05, spd: 0.34 },
    { x: -7.5, y: 12.8, z: 3.5, s: 0.92, spd: 0.42 },
    { x: 4.2, y: 13.8, z: 6.2, s: 0.85, spd: 0.31 },
  ];

  for (const cfg of cloudConfigs) {
    const cGroup = new THREE.Group();
    const puffs = [
      [0, 0, 0, 1.05, 0.42, 0.72],
      [-0.85, -0.06, 0.12, 0.78, 0.34, 0.6],
      [0.9, -0.04, -0.08, 0.82, 0.36, 0.62],
      [0.18, 0.16, -0.15, 0.68, 0.32, 0.56],
    ];
    for (const [px, py, pz, sx, sy, sz] of puffs) {
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), cloudMat);
      m.position.set(px, py, pz);
      m.scale.set(sx, sy, sz);
      m.userData.noOutline = true;
      cGroup.add(m);
    }
    cGroup.position.set(cfg.x, cfg.y, cfg.z);
    cGroup.scale.setScalar(cfg.s);
    group.add(cGroup);
    clouds.push({ mesh: cGroup, baseY: cfg.y, speed: cfg.spd, seed: cfg.x });
  }

  // =========================================================================
  // 2. STYLIZED RAIN STREAKS (细雨)
  // =========================================================================
  const rainCount = 650;
  const rainPositions = new Float32Array(rainCount * 6); // 2 vertices per streak line
  const rainMeta = [];
  for (let i = 0; i < rainCount; i++) {
    const rx = (Math.random() - 0.5) * 28;
    const ry = Math.random() * 16;
    const rz = (Math.random() - 0.5) * 28;
    const speed = 13.5 + Math.random() * 4.5;
    const len = 0.62 + Math.random() * 0.35;
    rainMeta.push({ x: rx, y: ry, z: rz, speed, len });
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMat = new THREE.LineBasicMaterial({
    color: 0xd9e8f5,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
  });
  const rainLines = new THREE.LineSegments(rainGeo, rainMat);
  rainLines.userData.noOutline = true;
  rainLines.visible = false;
  group.add(rainLines);

  // =========================================================================
  // 3. SWIRLING SNOWFLAKES (飘雪)
  // =========================================================================
  const snowCount = 700;
  const snowPositions = new Float32Array(snowCount * 3);
  const snowMeta = [];
  for (let i = 0; i < snowCount; i++) {
    const sx = (Math.random() - 0.5) * 28;
    const sy = Math.random() * 16;
    const sz = (Math.random() - 0.5) * 28;
    snowMeta.push({
      x: sx,
      y: sy,
      z: sz,
      speed: 1.45 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2,
    });
    snowPositions[i * 3] = sx;
    snowPositions[i * 3 + 1] = sy;
    snowPositions[i * 3 + 2] = sz;
  }
  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  // Soft circular snow flake sprite texture
  const flakeCanvas = document.createElement('canvas');
  flakeCanvas.width = 32;
  flakeCanvas.height = 32;
  const fCtx = flakeCanvas.getContext('2d');
  const fg = fCtx.createRadialGradient(16, 16, 2, 16, 16, 15);
  fg.addColorStop(0, 'rgba(255,255,255,1)');
  fg.addColorStop(0.6, 'rgba(245,250,255,0.85)');
  fg.addColorStop(1, 'rgba(245,250,255,0)');
  fCtx.fillStyle = fg;
  fCtx.fillRect(0, 0, 32, 32);
  const flakeTex = new THREE.CanvasTexture(flakeCanvas);

  const snowMat = new THREE.PointsMaterial({
    map: flakeTex,
    color: 0xffffff,
    size: 0.28,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
  });
  const snowPoints = new THREE.Points(snowGeo, snowMat);
  snowPoints.userData.noOutline = true;
  snowPoints.visible = false;
  group.add(snowPoints);

  // =========================================================================
  // 4. LAYERED VALLEY MIST RIBBONS (薄雾)
  // =========================================================================
  const mistTex = createSoftMistTexture();
  const mistLayers = [];
  for (let i = 0; i < 10; i++) {
    const mMat = new THREE.MeshBasicMaterial({
      map: mistTex,
      color: 0xf4f6f8,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(8.5 + (i % 3) * 2.5, 4.2), mMat);
    m.rotation.x = -Math.PI / 2;
    const baseX = ((i % 5) - 2) * 5.2;
    const baseZ = -6.5 + Math.floor(i / 5) * 11.5;
    const baseY = 0.75 + (i % 3) * 0.65;
    m.position.set(baseX, baseY, baseZ);
    m.userData.noOutline = true;
    m.visible = false;
    group.add(m);
    mistLayers.push({ mesh: m, baseX, baseY, baseZ, speed: 0.35 + (i % 3) * 0.14 });
  }

  // Reusable temp colors
  const targetSky = new THREE.Color();
  const targetFog = new THREE.Color();
  const targetSun = new THREE.Color();
  const targetHemiSky = new THREE.Color();
  const targetHemiGround = new THREE.Color();
  const targetInk = new THREE.Color();
  const targetCloud = new THREE.Color();
  const overcastTint = new THREE.Color(0x9fb0c0);
  const snowSkyTint = new THREE.Color(0xdde6f2);
  const fogSkyTint = new THREE.Color(0xe6ecec);

  return {
    setWeather(key) {
      if (WEATHER_PRESETS[key]) weatherKey = key;
    },
    setTimeOfDay(key) {
      if (TIME_PRESETS[key]) timeKey = key;
    },
    getState() {
      return { weatherKey, timeKey };
    },
    update(dt, time) {
      const w = WEATHER_PRESETS[weatherKey];
      const tod = TIME_PRESETS[timeKey];
      const lerpFactor = 1.0 - Math.exp(-dt * 2.1);

      // Compute combined atmospheric target colors (Time of Day modulated by Weather)
      targetSky.setHex(tod.sky);
      targetFog.setHex(tod.fog);
      targetSun.setHex(tod.sunColor);
      targetHemiSky.setHex(tod.hemiSky);
      targetHemiGround.setHex(tod.hemiGround);
      targetInk.setHex(tod.inkColor);
      targetCloud.setHex(w.cloudTint);

      if (weatherKey === 'rain') {
        targetSky.lerp(overcastTint, timeKey === 'night' ? 0.2 : timeKey === 'dusk' ? 0.35 : 0.6);
        targetFog.lerp(overcastTint, timeKey === 'night' ? 0.2 : timeKey === 'dusk' ? 0.38 : 0.62);
        targetSun.lerp(new THREE.Color(0xcbd9e8), timeKey === 'dusk' ? 0.25 : 0.55);
      } else if (weatherKey === 'snow') {
        targetSky.lerp(snowSkyTint, timeKey === 'night' ? 0.12 : timeKey === 'dusk' ? 0.2 : 0.48);
        targetFog.lerp(snowSkyTint, timeKey === 'night' ? 0.14 : timeKey === 'dusk' ? 0.22 : 0.52);
      } else if (weatherKey === 'fog') {
        targetSky.lerp(fogSkyTint, timeKey === 'night' ? 0.18 : timeKey === 'dusk' ? 0.32 : 0.55);
        targetFog.lerp(fogSkyTint, timeKey === 'night' ? 0.2 : timeKey === 'dusk' ? 0.36 : 0.65);
      }

      if (timeKey === 'dusk') {
        targetCloud.lerp(new THREE.Color(0xffcdb0), 0.52);
      } else if (timeKey === 'night') {
        targetCloud.lerp(new THREE.Color(0x4b5c7d), 0.72);
      }

      // Smoothly interpolate all weather & lighting values
      live.wind = THREE.MathUtils.lerp(live.wind, w.wind, lerpFactor);
      live.rain = THREE.MathUtils.lerp(live.rain, w.rain, lerpFactor);
      live.snow = THREE.MathUtils.lerp(live.snow, w.snow, lerpFactor);
      live.mist = THREE.MathUtils.lerp(live.mist, w.mist, lerpFactor);
      live.cloudOpacity = THREE.MathUtils.lerp(live.cloudOpacity, w.cloudOpacity, lerpFactor);
      live.sunMult = THREE.MathUtils.lerp(live.sunMult, w.sunMult, lerpFactor);
      live.fogDensity = THREE.MathUtils.lerp(live.fogDensity, w.fogDensity, lerpFactor);
      live.inkStrength = THREE.MathUtils.lerp(live.inkStrength, w.inkStrength, lerpFactor);
      live.windowGlow = THREE.MathUtils.lerp(live.windowGlow, tod.windowBase + w.windowBoost, lerpFactor);
      live.sunAzimuth = THREE.MathUtils.lerp(live.sunAzimuth, tod.sunAzimuth, lerpFactor);
      live.sunElevation = THREE.MathUtils.lerp(live.sunElevation, tod.sunElevation, lerpFactor);

      live.skyColor.lerp(targetSky, lerpFactor);
      live.fogColor.lerp(targetFog, lerpFactor);
      live.sunColor.lerp(targetSun, lerpFactor);
      live.hemiSky.lerp(targetHemiSky, lerpFactor);
      live.hemiGround.lerp(targetHemiGround, lerpFactor);
      live.inkColor.lerp(targetInk, lerpFactor);
      live.cloudColor.lerp(targetCloud, lerpFactor);

      // Update shared GPU uniforms
      ENV_UNIFORMS.uWindStrength.value = live.wind;
      ENV_UNIFORMS.uSnowAmount.value = THREE.MathUtils.lerp(
        ENV_UNIFORMS.uSnowAmount.value,
        w.snow,
        1.0 - Math.exp(-dt * 1.15) // gradual snow cap accumulation
      );
      ENV_UNIFORMS.uWetness.value = live.rain;
      ENV_UNIFORMS.uGlowIntensity.value = live.windowGlow;
      waterUniforms.uRainIntensity.value = live.rain;

      // Apply slow subtle sun-angle & shadow breathing (光影缓变)
      const slowDrift = Math.sin(time * 0.14) * 0.14;
      const elevDrift = Math.cos(time * 0.11) * 0.04;
      const az = live.sunAzimuth + slowDrift;
      const el = live.sunElevation + elevDrift;
      const dist = 28;
      sunLight.position.set(
        Math.cos(el) * Math.sin(az) * dist,
        Math.sin(el) * dist,
        Math.cos(el) * Math.cos(az) * dist
      );
      sunLight.color.copy(live.sunColor);
      sunLight.intensity = tod.sunIntensity * live.sunMult;

      hemiLight.color.copy(live.hemiSky);
      hemiLight.groundColor.copy(live.hemiGround);
      hemiLight.intensity = tod.hemiIntensity;
      fillLight.color.copy(live.hemiSky);
      fillLight.intensity = 0.32 * (timeKey === 'night' ? 0.65 : 1.0);

      // Scene sky & atmospheric fog
      scene.background = live.skyColor;
      if (scene.fog) {
        scene.fog.color.copy(live.fogColor);
        scene.fog.density = live.fogDensity;
      }

      // Cel ink outline tint & softness
      outlineComposer.setInkStyle(live.inkColor, live.inkStrength);

      // Warm cottage/castle windows & smithy forge glow
      for (const gm of glowMaterials) {
        const base = gm.userData.baseGlow ?? 0.6;
        gm.emissiveIntensity = base * live.windowGlow;
      }

      // Animate thin clouds drifting smoothly across sky (薄云移动)
      cloudMat.color.copy(live.cloudColor);
      cloudMat.opacity = live.cloudOpacity;
      for (const c of clouds) {
        c.mesh.position.x += dt * c.speed * (0.7 + live.wind * 0.45);
        c.mesh.position.y = c.baseY + Math.sin(time * 0.4 + c.seed) * 0.18;
        if (c.mesh.position.x > 16) c.mesh.position.x = -16;
      }

      // Animate Rain streaks
      rainLines.visible = live.rain > 0.02;
      if (rainLines.visible) {
        rainMat.opacity = live.rain * 0.48;
        const posAttr = rainGeo.attributes.position;
        const slantX = 0.24 * live.wind;
        for (let i = 0; i < rainCount; i++) {
          const r = rainMeta[i];
          r.y -= r.speed * dt;
          r.x += slantX * r.speed * 0.12 * dt;
          if (r.y < -0.5) {
            r.y = 14.5 + Math.random() * 2.5;
            r.x = (Math.random() - 0.5) * 28;
            r.z = (Math.random() - 0.5) * 28;
          }
          const idx = i * 6;
          posAttr.array[idx] = r.x;
          posAttr.array[idx + 1] = r.y;
          posAttr.array[idx + 2] = r.z;
          posAttr.array[idx + 3] = r.x - slantX * r.len;
          posAttr.array[idx + 4] = r.y + r.len;
          posAttr.array[idx + 5] = r.z;
        }
        posAttr.needsUpdate = true;
      }

      // Animate Swirling Snowflakes
      snowPoints.visible = live.snow > 0.02;
      if (snowPoints.visible) {
        snowMat.opacity = live.snow * 0.88;
        const sPos = snowGeo.attributes.position;
        for (let i = 0; i < snowCount; i++) {
          const s = snowMeta[i];
          s.y -= s.speed * dt;
          s.x += (Math.sin(time * 1.1 + s.phase) * 0.55 + live.wind * 0.38) * dt;
          s.z += Math.cos(time * 0.9 + s.phase) * 0.35 * dt;
          if (s.y < -0.5) {
            s.y = 15.0 + Math.random() * 2.0;
            s.x = (Math.random() - 0.5) * 28;
            s.z = (Math.random() - 0.5) * 28;
          }
          sPos.array[i * 3] = s.x;
          sPos.array[i * 3 + 1] = s.y;
          sPos.array[i * 3 + 2] = s.z;
        }
        sPos.needsUpdate = true;
      }

      // Animate Layered Valley Mist Ribbons
      const mistVis = live.mist > 0.02;
      for (const ml of mistLayers) {
        ml.mesh.visible = mistVis;
        if (!mistVis) continue;
        ml.mesh.position.x += dt * ml.speed * (0.6 + live.wind * 0.35);
        if (ml.mesh.position.x > 13.5) ml.mesh.position.x = -13.5;
        ml.mesh.material.opacity = live.mist * 0.52;
        ml.mesh.material.color.copy(live.fogColor).lerp(new THREE.Color(0xffffff), 0.45);
      }

      return live.sunColor;
    },
  };
}
