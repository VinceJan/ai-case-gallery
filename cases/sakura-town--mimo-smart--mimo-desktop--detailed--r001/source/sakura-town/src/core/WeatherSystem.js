import { bus } from './EventBus.js';

const WEATHERS = {
  sunny: {
    id: 'sunny',
    name: '晴',
    fogDensity: 0.0012,
    rain: 0,
    cloud: 0.15,
    lightDim: 1.0,
    wetRoad: 0,
  },
  cloudy: {
    id: 'cloudy',
    name: '多云',
    fogDensity: 0.0022,
    rain: 0,
    cloud: 0.65,
    lightDim: 0.75,
    wetRoad: 0,
  },
  rain: {
    id: 'rain',
    name: '小雨',
    fogDensity: 0.004,
    rain: 1,
    cloud: 1,
    lightDim: 0.55,
    wetRoad: 1,
  },
  cloudyRain: {
    id: 'cloudyRain',
    name: '阵雨',
    fogDensity: 0.0032,
    rain: 0.45,
    cloud: 0.9,
    lightDim: 0.65,
    wetRoad: 0.6,
  },
};

export class WeatherSystem {
  constructor() {
    this.current = WEATHERS.sunny;
    this.target = WEATHERS.sunny;
    this.blend = 1;
    this.rainIntensity = 0;
    this.wetRoad = 0;
    this.nextChangeAt = 90 + Math.random() * 80; // real seconds
    this._acc = 0;
  }

  get name() {
    return this.current.name;
  }

  get isRaining() {
    return this.rainIntensity > 0.15;
  }

  get affectsTravel() {
    return this.rainIntensity > 0.3;
  }

  /** Pick a plausible next weather */
  pickNext(hour, isWeekend) {
    const roll = Math.random();
    // Mornings more likely sunny; evenings can bring rain
    if (hour > 14 && hour < 20 && roll < 0.28) return WEATHERS.rain;
    if (roll < 0.45) return WEATHERS.sunny;
    if (roll < 0.75) return WEATHERS.cloudy;
    if (roll < 0.9) return WEATHERS.cloudyRain;
    return WEATHERS.rain;
  }

  setWeather(id, instant = false) {
    const next = WEATHERS[id] || WEATHERS.sunny;
    if (next.id === this.current.id && !instant) return;
    if (instant) {
      this.current = next;
      this.target = next;
      this.blend = 1;
      this.rainIntensity = next.rain;
      this.wetRoad = next.wetRoad;
    } else {
      this.target = next;
      this.blend = 0;
    }
    bus.emit('weather:change', { weather: this.current, target: this.target });
  }

  update(dt, timeSystem) {
    this._acc += dt;
    this.nextChangeAt -= dt;

    if (this.nextChangeAt <= 0) {
      this.setWeather(this.pickNext(timeSystem.hour, timeSystem.isWeekend).id);
      this.nextChangeAt = 80 + Math.random() * 140;
    }

    if (this.blend < 1) {
      this.blend = Math.min(1, this.blend + dt / 28); // slow transition ~28s
      const t = this.blend;
      const a = this.current;
      const b = this.target;
      this.rainIntensity = a.rain + (b.rain - a.rain) * t;
      this.wetRoad = a.wetRoad + (b.wetRoad - a.wetRoad) * t;
      if (t >= 1) {
        this.current = this.target;
        bus.emit('weather:settled', { weather: this.current });
      }
    }

    // Wet road slowly dries when not raining
    if (this.rainIntensity < 0.05 && this.wetRoad > 0) {
      this.wetRoad = Math.max(0, this.wetRoad - dt * 0.01);
    }
  }

  /** Composited visual params */
  getVisual() {
    const w = this.blend >= 1 ? this.current : this._lerp(this.current, this.target, this.blend);
    return w;
  }

  _lerp(a, b, t) {
    return {
      id: t < 0.5 ? a.id : b.id,
      name: t < 0.5 ? a.name : b.name,
      fogDensity: a.fogDensity + (b.fogDensity - a.fogDensity) * t,
      rain: a.rain + (b.rain - a.rain) * t,
      cloud: a.cloud + (b.cloud - a.cloud) * t,
      lightDim: a.lightDim + (b.lightDim - a.lightDim) * t,
      wetRoad: a.wetRoad + (b.wetRoad - a.wetRoad) * t,
    };
  }
}

export { WEATHERS };
