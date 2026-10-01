import * as THREE from 'three';
import { createSkyTexture } from '../utils/textures';

export type DayPhase = 'night' | 'dawn' | 'day' | 'dusk';

interface LightingKey {
  hour: number;
  sunColor: string;
  sunIntensity: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  skyTop: string;
  skyMid: string;
  skyBottom: string;
  fog: string;
}

const KEYS: LightingKey[] = [
  {
    hour: 0,
    sunColor: '#8aa8d8',
    sunIntensity: 0.12,
    hemiSky: '#2a3a5a',
    hemiGround: '#1a2030',
    hemiIntensity: 0.5,
    skyTop: '#0d1526',
    skyMid: '#1c2a44',
    skyBottom: '#2a3450',
    fog: '#232d42',
  },
  {
    hour: 5,
    sunColor: '#8aa8d8',
    sunIntensity: 0.12,
    hemiSky: '#2a3a5a',
    hemiGround: '#1a2030',
    hemiIntensity: 0.5,
    skyTop: '#0d1526',
    skyMid: '#1c2a44',
    skyBottom: '#2a3450',
    fog: '#232d42',
  },
  {
    hour: 6.5,
    sunColor: '#ffb38a',
    sunIntensity: 0.7,
    hemiSky: '#f4c8d4',
    hemiGround: '#8a7a6a',
    hemiIntensity: 0.75,
    skyTop: '#7aa8d8',
    skyMid: '#f4c8d4',
    skyBottom: '#f6d9a8',
    fog: '#e8cfc0',
  },
  {
    hour: 9,
    sunColor: '#fff1bf',
    sunIntensity: 1.75,
    hemiSky: '#cfe8f4',
    hemiGround: '#9aa88a',
    hemiIntensity: 1.0,
    skyTop: '#6ab8e8',
    skyMid: '#a8d8f0',
    skyBottom: '#d8ecf4',
    fog: '#cfe4ee',
  },
  {
    hour: 15,
    sunColor: '#fff1bf',
    sunIntensity: 1.75,
    hemiSky: '#cfe8f4',
    hemiGround: '#9aa88a',
    hemiIntensity: 1.0,
    skyTop: '#6ab8e8',
    skyMid: '#a8d8f0',
    skyBottom: '#d8ecf4',
    fog: '#cfe4ee',
  },
  {
    hour: 17.5,
    sunColor: '#ffc890',
    sunIntensity: 1.15,
    hemiSky: '#f4d4c0',
    hemiGround: '#a08878',
    hemiIntensity: 0.85,
    skyTop: '#7a9ac8',
    skyMid: '#f4c8a8',
    skyBottom: '#f6d8b0',
    fog: '#e8d0b8',
  },
  {
    hour: 19,
    sunColor: '#e88a6a',
    sunIntensity: 0.35,
    hemiSky: '#8a6a8a',
    hemiGround: '#4a4050',
    hemiIntensity: 0.7,
    skyTop: '#2a3a5a',
    skyMid: '#8a5a7a',
    skyBottom: '#c88a7a',
    fog: '#6a5a68',
  },
  {
    hour: 20.5,
    sunColor: '#8aa8d8',
    sunIntensity: 0.12,
    hemiSky: '#2a3a5a',
    hemiGround: '#1a2030',
    hemiIntensity: 0.5,
    skyTop: '#0d1526',
    skyMid: '#1c2a44',
    skyBottom: '#2a3450',
    fog: '#232d42',
  },
];

/** 游戏时钟 + 昼夜光照 + 天空穹顶。1 现实秒 = 2 游戏分钟。 */
export class TimeSystem {
  day = 1;
  minutes = 7 * 60;
  readonly minutesPerSecond = 2;

  private readonly sun: THREE.DirectionalLight;
  private readonly hemi: THREE.HemisphereLight;
  private readonly ambient: THREE.AmbientLight;
  private readonly skyMesh: THREE.Mesh;
  private skyTexture: THREE.CanvasTexture;
  private readonly sunDisc: THREE.Sprite;
  private readonly moonDisc: THREE.Sprite;
  private readonly nightMaterials: THREE.MeshStandardMaterial[];
  private readonly lampGlowSprites: THREE.Sprite[];
  private readonly fog: THREE.Fog;
  private currentPhase: DayPhase = 'day';
  private lastSkyKey = '';

  onNewDay: (() => void) | null = null;

  constructor(
    scene: THREE.Scene,
    fog: THREE.Fog,
    nightMaterials: THREE.MeshStandardMaterial[],
    lampGlowSprites: THREE.Sprite[],
  ) {
    this.fog = fog;
    this.nightMaterials = nightMaterials;
    this.lampGlowSprites = lampGlowSprites;

    this.sun = new THREE.DirectionalLight('#fff1bf', 2.3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 200;
    const shadowCam = this.sun.shadow.camera;
    shadowCam.left = -46;
    shadowCam.right = 46;
    shadowCam.top = 46;
    shadowCam.bottom = -46;
    // 修改视锥后必须更新投影矩阵，否则阴影相机沿用默认 ±5m 视锥
    shadowCam.updateProjectionMatrix();
    this.sun.shadow.bias = -0.0002;
    this.sun.shadow.normalBias = 0.02;
    scene.add(this.sun);
    scene.add(this.sun.target);

    this.hemi = new THREE.HemisphereLight('#cfe8f4', '#9aa88a', 1.0);
    scene.add(this.hemi);

    // 柔和环境光，避免阴影区死黑
    this.ambient = new THREE.AmbientLight('#c8d4d8', 0.22);
    scene.add(this.ambient);

    this.skyTexture = createSkyTexture('#6ab8e8', '#a8d8f0', '#d8ecf4');
    this.skyMesh = new THREE.Mesh(
      new THREE.SphereGeometry(260, 16, 12),
      new THREE.MeshBasicMaterial({ map: this.skyTexture, side: THREE.BackSide, fog: false, depthWrite: false }),
    );
    scene.add(this.skyMesh);

    const discTex = createSunTexture('#fff4d8');
    this.sunDisc = new THREE.Sprite(new THREE.SpriteMaterial({ map: discTex, fog: false, transparent: true }));
    this.sunDisc.scale.setScalar(26);
    scene.add(this.sunDisc);
    const moonTex = createSunTexture('#e8ecf4');
    this.moonDisc = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonTex, fog: false, transparent: true }));
    this.moonDisc.scale.setScalar(14);
    scene.add(this.moonDisc);

    this.applyLighting();
  }

  get hour(): number {
    return this.minutes / 60;
  }

  get phase(): DayPhase {
    return this.currentPhase;
  }

  get isNight(): boolean {
    return this.currentPhase === 'night';
  }

  get timeLabel(): string {
    const h = Math.floor(this.minutes / 60) % 24;
    const m = Math.floor(this.minutes % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  setTime(day: number, minutes: number): void {
    this.day = day;
    this.minutes = minutes;
    this.applyLighting();
  }

  update(delta: number, playerPosition: THREE.Vector3): void {
    const before = Math.floor(this.minutes);
    this.minutes += delta * this.minutesPerSecond;
    const after = Math.floor(this.minutes);
    if (after !== before) this.applyLighting();
    if (this.minutes >= 1440) {
      this.minutes -= 1440;
      this.day += 1;
      this.onNewDay?.();
    }
    // 太阳/月亮随玩家移动阴影相机
    const angle = ((this.minutes - 360) / 1440) * Math.PI * 2;
    const sunHeight = Math.sin(angle);
    this.sun.position.set(
      playerPosition.x + Math.cos(angle) * 60,
      Math.max(6, sunHeight * 70),
      playerPosition.z + 28,
    );
    this.sun.target.position.copy(playerPosition);
  }

  /** 天气对光照的衰减（阴天变暗）。 */
  applyWeatherDim(dim: number): void {
    this.weatherDim = dim;
    this.sun.intensity = this.sunIntensityBase * dim;
    this.hemi.intensity = this.hemiIntensityBase * (0.6 + dim * 0.4);
  }

  private sunIntensityBase = 1.75;
  private hemiIntensityBase = 1.0;
  private weatherDim = 1;

  private applyLighting(): void {
    const hour = this.hour;
    let i = 0;
    while (i < KEYS.length - 1 && hour >= KEYS[i + 1].hour) i += 1;
    const a = KEYS[i];
    const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
    const span = Math.max(0.001, b.hour - a.hour);
    const t = Math.max(0, Math.min(1, (hour - a.hour) / span));

    const sunColor = new THREE.Color(a.sunColor).lerp(new THREE.Color(b.sunColor), t);
    const hemiSky = new THREE.Color(a.hemiSky).lerp(new THREE.Color(b.hemiSky), t);
    const hemiGround = new THREE.Color(a.hemiGround).lerp(new THREE.Color(b.hemiGround), t);
    const skyTop = new THREE.Color(a.skyTop).lerp(new THREE.Color(b.skyTop), t);
    const skyMid = new THREE.Color(a.skyMid).lerp(new THREE.Color(b.skyMid), t);
    const skyBottom = new THREE.Color(a.skyBottom).lerp(new THREE.Color(b.skyBottom), t);
    const fogColor = new THREE.Color(a.fog).lerp(new THREE.Color(b.fog), t);

    this.sun.color.copy(sunColor);
    this.sunIntensityBase = THREE.MathUtils.lerp(a.sunIntensity, b.sunIntensity, t);
    this.sun.intensity = this.sunIntensityBase * this.weatherDim;
    this.sun.userData.baseIntensity = this.sunIntensityBase;

    this.hemi.color.copy(hemiSky);
    this.hemi.groundColor.copy(hemiGround);
    this.hemiIntensityBase = THREE.MathUtils.lerp(a.hemiIntensity, b.hemiIntensity, t);
    this.hemi.intensity = this.hemiIntensityBase * (0.6 + this.weatherDim * 0.4);

    const key = `${Math.round(skyTop.r * 8)}-${Math.round(skyMid.g * 8)}-${Math.round(skyBottom.b * 8)}`;
    if (key !== this.lastSkyKey) {
      this.lastSkyKey = key;
      this.skyTexture.dispose();
      this.skyTexture = createSkyTexture(
        `#${skyTop.getHexString()}`,
        `#${skyMid.getHexString()}`,
        `#${skyBottom.getHexString()}`,
      );
      (this.skyMesh.material as THREE.MeshBasicMaterial).map = this.skyTexture;
      (this.skyMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }

    this.fog.color.copy(fogColor);

    // 昼夜判定
    const phase: DayPhase = hour < 5 || hour >= 20.5 ? 'night' : hour < 7.5 ? 'dawn' : hour < 17 ? 'day' : 'dusk';
    if (phase !== this.currentPhase) {
      this.currentPhase = phase;
    }

    // 夜间灯光
    const night = phase === 'night' || phase === 'dawn' ? (phase === 'night' ? 1 : 0.35) : 0;
    for (const material of this.nightMaterials) {
      material.emissiveIntensity = night * 1.1;
    }
    for (const sprite of this.lampGlowSprites) {
      (sprite.material as THREE.SpriteMaterial).opacity = night * 0.8;
    }

    // 太阳/月亮位置（穹顶上的圆盘）
    const dayAngle = ((this.minutes - 360) / 1440) * Math.PI * 2;
    const radius = 240;
    this.sunDisc.position.set(
      Math.cos(dayAngle) * radius,
      Math.sin(dayAngle) * radius,
      -60,
    );
    this.sunDisc.visible = Math.sin(dayAngle) > -0.1;
    this.moonDisc.position.set(
      -Math.cos(dayAngle) * radius,
      -Math.sin(dayAngle) * radius,
      60,
    );
    this.moonDisc.visible = Math.sin(dayAngle) < 0.1;
  }

  dispose(): void {
    this.skyTexture.dispose();
    this.sunDisc.material.map?.dispose();
    this.sunDisc.material.dispose();
    this.moonDisc.material.map?.dispose();
    this.moonDisc.material.dispose();
    this.skyMesh.geometry.dispose();
    (this.skyMesh.material as THREE.Material).dispose();
  }
}

function createSunTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create sun texture context.');
  const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.35, `${color}cc`);
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
