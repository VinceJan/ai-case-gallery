/**
 * Time of day, weather, and lighting that actually affect the town.
 */
import * as THREE from 'three';
import { PAL } from '../world/materials';
import type { TimeOfDay, Weather } from '../data/types';

export class TimeWeatherSystem {
  time: TimeOfDay = { day: 1, hour: 8, minute: 30 };
  weather: Weather = 'clear';
  private weatherTimer = 0;
  private sun: THREE.DirectionalLight;
  private moon: THREE.DirectionalLight;
  private hemisphere: THREE.HemisphereLight;
  private fog: THREE.Fog;
  private sky: THREE.Mesh;
  private rng: () => number;

  /** 0 at midnight, 1 at noon — used for night factor inverse. */
  get nightFactor(): number {
    const h = this.time.hour + this.time.minute / 60;
    // night 0-5 and 19-24
    if (h >= 19) return Math.min(1, (h - 19) / 3);
    if (h < 6) return 1 - h / 6;
    return 0;
  }

  get dayFactor(): number {
    return 1 - this.nightFactor;
  }

  get isRushHour(): boolean {
    const h = this.time.hour;
    return (h >= 7 && h <= 9) || (h >= 17 && h <= 19);
  }

  get isWeekend(): boolean {
    return this.time.day % 7 === 0 || this.time.day % 7 === 6;
  }

  get rainFactor(): number {
    return this.weather === 'rain' ? 1 : this.weather === 'cloudy' ? 0.3 : 0;
  }

  constructor(scene: THREE.Scene, rng: () => number) {
    this.rng = rng;
    this.hemisphere = new THREE.HemisphereLight('#d8e8f8', '#5a6858', 1.2);
    scene.add(this.hemisphere);

    this.sun = new THREE.DirectionalLight(PAL.sun, 2.2);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = 200;
    this.sun.shadow.camera.left = -60;
    this.sun.shadow.camera.right = 60;
    this.sun.shadow.camera.top = 60;
    this.sun.shadow.camera.bottom = -60;
    scene.add(this.sun);
    scene.add(this.sun.target);

    this.moon = new THREE.DirectionalLight(PAL.moon, 0);
    scene.add(this.moon);

    // sky dome
    const skyGeo = new THREE.SphereGeometry(220, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
      color: PAL.skyDay,
      side: THREE.BackSide,
      fog: false,
    });
    this.sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(this.sky);

    this.fog = new THREE.Fog(new THREE.Color(PAL.skyDay), 80, 220);
    scene.fog = this.fog;
    scene.background = new THREE.Color(PAL.skyDay);
  }

  setTime(hour: number, minute: number, day = 1): void {
    this.time = { hour, minute, day };
    this.applyLighting();
  }

  setWeather(w: Weather): void {
    this.weather = w;
    this.applyLighting();
  }

  update(delta: number): void {
    // 1 real second = 1 game minute at default (adjustable)
    const minutes = delta * 1.2;
    this.time.minute += minutes;
    while (this.time.minute >= 60) {
      this.time.minute -= 60;
      this.time.hour += 1;
      if (this.time.hour >= 24) {
        this.time.hour = 0;
        this.time.day += 1;
      }
    }

    this.weatherTimer += delta;
    if (this.weatherTimer > 120) {
      this.weatherTimer = 0;
      const r = this.rng();
      if (r < 0.55) this.weather = 'clear';
      else if (r < 0.8) this.weather = 'cloudy';
      else if (r < 0.95) this.weather = 'rain';
      else this.weather = 'fog';
      this.applyLighting();
    }

    this.applyLighting();
  }

  private applyLighting(): void {
    const h = this.time.hour + this.time.minute / 60;
    const night = this.nightFactor;
    const rain = this.rainFactor;

    // sun angle
    const sunA = ((h - 6) / 12) * Math.PI; // 6:00 rise, 18:00 set
    this.sun.position.set(Math.cos(sunA) * 80, Math.sin(sunA) * 90 + 10, 40);
    this.sun.target.position.set(0, 0, 0);
    this.sun.intensity = Math.max(0, (1 - night) * 2.4 * (1 - rain * 0.55));
    this.sun.color.set(h > 16 || h < 8 ? '#ffd0a0' : '#fff2c8');

    this.moon.position.set(-40, 60, -30);
    this.moon.intensity = night * 0.35;

    this.hemisphere.intensity = 0.35 + (1 - night) * 1.1 - rain * 0.2;
    this.hemisphere.color.set(night > 0.5 ? '#2a3858' : rain > 0.5 ? '#8a9aaa' : '#d8e8f8');
    this.hemisphere.groundColor.set(night > 0.5 ? '#1a2030' : '#5a6858');

    // sky color
    let sky: THREE.Color;
    if (night > 0.7) sky = new THREE.Color(PAL.skyNight);
    else if (night > 0.25) sky = new THREE.Color(PAL.skyDusk).lerp(new THREE.Color(PAL.skyNight), night);
    else if (h > 15 && h < 19) sky = new THREE.Color(PAL.skyDusk).lerp(new THREE.Color(PAL.skyDay), (19 - h) / 4);
    else sky = new THREE.Color(PAL.skyDay);

    if (rain > 0.4) sky.lerp(new THREE.Color('#6a7888'), 0.55);
    if (this.weather === 'fog') sky.lerp(new THREE.Color('#b0b8c0'), 0.5);

    (this.sky.material as THREE.MeshBasicMaterial).color.copy(sky);
    this.fog.color.copy(sky);
    this.fog.near = this.weather === 'fog' ? 25 : rain > 0.3 ? 50 : 80;
    this.fog.far = this.weather === 'fog' ? 90 : rain > 0.3 ? 140 : 220;
  }

  get timeString(): string {
    const h = Math.floor(this.time.hour).toString().padStart(2, '0');
    const m = Math.floor(this.time.minute).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  get dateString(): string {
    return `${this.time.day}日目`;
  }

  get weatherLabel(): string {
    switch (this.weather) {
      case 'clear': return '晴れ';
      case 'cloudy': return 'くもり';
      case 'rain': return '雨';
      case 'fog': return '霧';
    }
  }
}
