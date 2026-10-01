import * as THREE from 'three';
import { BUILDINGS, ROAD_SEGMENTS, SPOTS } from '../world/layout';
import type { TownState } from '../game/TownState';
import type { TimeSystem } from '../systems/TimeSystem';
import type { WeatherSystem } from '../systems/WeatherSystem';

export interface HudFrame {
  playerPosition: THREE.Vector3;
  playerRotation: number;
  npcPositions: { x: number; z: number }[];
  questTargets: { x: number; z: number; kind: 'quest' | 'event' }[];
}

const MAP_SCALE = 176 / 184;

function weatherIcon(weather: string): string {
  if (weather === 'rain') {
    return '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 15a4.5 4.5 0 1 1 .5-8.97A5.5 5.5 0 0 1 18 6.5 3.5 3.5 0 0 1 17.5 15z" fill="#b8c8d8"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" stroke="#6a9ac8" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }
  if (weather === 'cloudy') {
    return '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 15a4.5 4.5 0 1 1 .5-8.97A5.5 5.5 0 0 1 18 6.5 3.5 3.5 0 0 1 17.5 15z" fill="#d8d4cc"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="4.6" fill="#f4c95a"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke="#f4c95a" stroke-width="1.6" stroke-linecap="round"/></svg>';
}

/** 游戏内 HUD：时钟/天气、金钱、委托追踪、交互提示、toast、小地图。 */
export class Hud {
  private readonly clockTime: HTMLElement;
  private readonly clockDay: HTMLElement;
  private readonly clockWeather: HTMLElement;
  private readonly moneyValue: HTMLElement;
  private readonly questTracker: HTMLElement;
  private readonly prompt: HTMLElement;
  private readonly toasts: HTMLElement;
  private readonly minimap: HTMLCanvasElement;
  private readonly mapCtx: CanvasRenderingContext2D | null;
  private toastTimers: number[] = [];

  constructor(
    private readonly state: TownState,
    private readonly time: TimeSystem,
    private readonly weather: WeatherSystem,
  ) {
    this.clockTime = this.must('#clock-time');
    this.clockDay = this.must('#clock-day');
    this.clockWeather = this.must('#clock-weather');
    this.moneyValue = this.must('#money-value');
    this.questTracker = this.must('#quest-tracker');
    this.prompt = this.must('#interact-prompt');
    this.toasts = this.must('#toasts');
    this.minimap = this.must('#minimap') as HTMLCanvasElement;
    this.mapCtx = this.minimap.getContext('2d');
  }

  private must(selector: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`Missing HUD element: ${selector}`);
    return element;
  }

  update(frame: HudFrame): void {
    this.clockTime.textContent = this.time.timeLabel;
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][(this.time.day - 1) % 7];
    this.clockDay.textContent = `第 ${this.time.day} 天 · 周${weekday}`;
    this.clockWeather.innerHTML = weatherIcon(this.weather.weather);
    this.moneyValue.textContent = `¥ ${this.state.money}`;

    const quests = this.state.activeQuests();
    if (quests.length === 0) {
      this.questTracker.innerHTML = '<div class="quest-empty">今天还没有委托</div>';
    } else {
      this.questTracker.innerHTML = quests
        .map((q) => `<div class="quest-item">${this.escape(q.title)}<span class="quest-reward">¥${q.reward}</span></div>`)
        .join('');
    }

    this.drawMinimap(frame);
  }

  setPrompt(text: string | null): void {
    if (text) {
      this.prompt.textContent = text;
      this.prompt.classList.remove('hidden');
    } else {
      this.prompt.classList.add('hidden');
    }
  }

  toast(message: string): void {
    const element = document.createElement('div');
    element.className = 'toast';
    element.textContent = message;
    this.toasts.append(element);
    const timer = window.setTimeout(() => {
      element.classList.add('fade');
      window.setTimeout(() => element.remove(), 400);
    }, 3200);
    this.toastTimers.push(timer);
    while (this.toasts.children.length > 4) this.toasts.firstElementChild?.remove();
  }

  private drawMinimap(frame: HudFrame): void {
    const ctx = this.mapCtx;
    if (!ctx) return;
    const size = this.minimap.width;
    ctx.clearRect(0, 0, size, size);

    // 底
    ctx.fillStyle = 'rgba(24, 28, 24, 0.72)';
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, 12);
    ctx.fill();

    const toMap = (x: number, z: number): [number, number] => [
      (x + 92) * MAP_SCALE,
      (z + 92) * MAP_SCALE,
    ];

    // 道路
    ctx.strokeStyle = 'rgba(220, 214, 196, 0.5)';
    for (const seg of ROAD_SEGMENTS) {
      const [x1, z1] = toMap(seg.x1, seg.z1);
      const [x2, z2] = toMap(seg.x2, seg.z2);
      ctx.lineWidth = Math.max(2, seg.width * MAP_SCALE);
      ctx.beginPath();
      ctx.moveTo(x1, z1);
      ctx.lineTo(x2, z2);
      ctx.stroke();
    }

    // 建筑
    for (const building of BUILDINGS) {
      const [x, z] = toMap(building.x, building.z);
      ctx.fillStyle =
        building.kind === 'shrine'
          ? 'rgba(200, 80, 60, 0.9)'
          : building.kind === 'station'
            ? 'rgba(90, 120, 160, 0.9)'
            : building.enterable
              ? 'rgba(240, 230, 200, 0.85)'
              : 'rgba(160, 150, 130, 0.7)';
      const w = Math.max(3, building.w * MAP_SCALE);
      const h = Math.max(3, building.d * MAP_SCALE);
      ctx.fillRect(x - w / 2, z - h / 2, w, h);
    }

    // 户外点
    ctx.fillStyle = 'rgba(160, 200, 140, 0.8)';
    for (const spot of SPOTS) {
      const [x, z] = toMap(spot.x, spot.z);
      ctx.beginPath();
      ctx.arc(x, z, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 委托目标
    for (const target of frame.questTargets) {
      const [x, z] = toMap(target.x, target.z);
      ctx.fillStyle = '#f4c95a';
      ctx.beginPath();
      ctx.arc(x, z, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(244, 201, 90, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, z, 6, 0, Math.PI * 2);
      ctx.stroke();
    }

    // NPC
    ctx.fillStyle = 'rgba(232, 200, 90, 0.9)';
    for (const npc of frame.npcPositions) {
      const [x, z] = toMap(npc.x, npc.z);
      ctx.beginPath();
      ctx.arc(x, z, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 玩家（箭头）
    const [px, pz] = toMap(frame.playerPosition.x, frame.playerPosition.z);
    ctx.save();
    ctx.translate(px, pz);
    ctx.rotate(-frame.playerRotation + Math.PI);
    ctx.fillStyle = '#f6f1df';
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(3.6, 4);
    ctx.lineTo(-3.6, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  dispose(): void {
    for (const timer of this.toastTimers) window.clearTimeout(timer);
  }

  private escape(text: string): string {
    return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  }
}
