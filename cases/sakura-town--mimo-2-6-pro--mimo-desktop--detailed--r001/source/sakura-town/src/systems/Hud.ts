/**
 * HUD, dialogue overlay, quest panel, interaction prompt, time/weather badge.
 */
import type { PlayerState, TimeOfDay, QuestState, WorldEvent } from '../data/types';

export class Hud {
  private timeEl: HTMLElement;
  private weatherEl: HTMLElement;
  private moneyEl: HTMLElement;
  private promptEl: HTMLElement;
  private dialogueEl: HTMLElement;
  private dialogueName: HTMLElement;
  private dialogueText: HTMLElement;
  private toastEl: HTMLElement;
  private questListEl: HTMLElement;
  private eventEl: HTMLElement;
  private inventoryEl: HTMLElement;
  private hintEl: HTMLElement;
  private toastTimer = 0;
  private dialogueTimer = 0;

  constructor() {
    this.timeEl = this.ensure('hud-time');
    this.weatherEl = this.ensure('hud-weather');
    this.moneyEl = this.ensure('hud-money');
    this.promptEl = this.ensure('hud-prompt');
    this.dialogueEl = this.ensure('dialogue');
    this.dialogueName = this.ensure('dialogue-name');
    this.dialogueText = this.ensure('dialogue-text');
    this.toastEl = this.ensure('toast');
    this.questListEl = this.ensure('quest-list');
    this.eventEl = this.ensure('event-banner');
    this.inventoryEl = this.ensure('inventory');
    this.hintEl = this.ensure('hud-hint');
  }

  private ensure(id: string): HTMLElement {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    }
    return el;
  }

  setPrompt(text: string | null): void {
    if (text) {
      this.promptEl.textContent = text;
      this.promptEl.style.opacity = '1';
    } else {
      this.promptEl.style.opacity = '0';
    }
  }

  showDialogue(name: string, text: string, duration = 4.5): void {
    this.dialogueName.textContent = name;
    this.dialogueText.textContent = text;
    this.dialogueEl.style.opacity = '1';
    this.dialogueTimer = duration;
  }

  toast(text: string): void {
    this.toastEl.textContent = text;
    this.toastEl.style.opacity = '1';
    this.toastTimer = 3.2;
  }

  update(
    delta: number,
    time: TimeOfDay,
    timeString: string,
    weatherLabel: string,
    player: PlayerState,
    quests: QuestState[],
    events: WorldEvent[],
    nearPrompt: string | null,
  ): void {
    this.timeEl.textContent = `${timeString}  ·  ${time.day}日目`;
    this.weatherEl.textContent = weatherLabel;
    this.moneyEl.textContent = `¥${player.money}`;
    this.setPrompt(nearPrompt);

    // inventory
    const inv = player.inventory.slice(-8);
    this.inventoryEl.innerHTML = inv.length
      ? inv.map((i) => `<span class="inv-item">${i.icon} ${i.name}</span>`).join('')
      : '<span class="inv-empty">持ち物なし</span>';

    // quests
    const visible = quests.filter((q) => q.status !== 'hidden').slice(0, 5);
    this.questListEl.innerHTML = visible
      .map((q) => {
        const mark = q.status === 'done' ? '✓' : q.status === 'active' ? '●' : '○';
        return `<div class="quest-row ${q.status}"><span class="q-mark">${mark}</span>${q.title}</div>`;
      })
      .join('');

    // events
    if (events.length) {
      this.eventEl.textContent = `⚡ ${events[0].title}：${events[0].description}`;
      this.eventEl.style.opacity = '1';
    } else {
      this.eventEl.style.opacity = '0';
    }

    if (this.toastTimer > 0) {
      this.toastTimer -= delta;
      if (this.toastTimer <= 0) this.toastEl.style.opacity = '0';
    }
    if (this.dialogueTimer > 0) {
      this.dialogueTimer -= delta;
      if (this.dialogueTimer <= 0) this.dialogueEl.style.opacity = '0';
    }
  }

  setHint(text: string): void {
    this.hintEl.textContent = text;
  }

  flashPickup(): void {
    this.toastEl.style.opacity = '1';
    this.toastTimer = 1.5;
  }
}
