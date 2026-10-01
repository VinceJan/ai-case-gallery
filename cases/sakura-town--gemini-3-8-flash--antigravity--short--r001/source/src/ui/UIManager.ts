// src/ui/UIManager.ts
// Comprehensive Japanese Anime HUD, Visual Novel dialogue balloon, Inventory drawer, Quest tracker, and Camera Viewfinder.
import { InventorySystem } from '../gameplay/InventorySystem';
import { QuestManager } from '../gameplay/QuestManager';
import { PhotographySystem } from '../gameplay/PhotographySystem';
import { TimeState, WeatherType } from '../types';
import { audio } from '../engine/AudioSynthesizer';

export class UIManager {
  private container: HTMLDivElement;
  private inventory: InventorySystem;
  private quests: QuestManager;
  private photography: PhotographySystem;
  private onWeatherChange: (w: WeatherType) => void;

  // UI Elements
  private clockElem!: HTMLDivElement;
  private weatherElem!: HTMLButtonElement;
  private promptElem!: HTMLDivElement;
  private dialogueBox!: HTMLDivElement;
  private inventoryDrawer!: HTMLDivElement;
  private questModal!: HTMLDivElement;
  private photoAlbumModal!: HTMLDivElement;
  private cameraViewfinder!: HTMLDivElement;
  private notificationElem!: HTMLDivElement;
  private questTrackerElem!: HTMLDivElement;

  // State
  private isDialogueOpen: boolean = false;

  constructor(
    inventory: InventorySystem,
    quests: QuestManager,
    photography: PhotographySystem,
    onWeatherChange: (w: WeatherType) => void
  ) {
    this.inventory = inventory;
    this.quests = quests;
    this.photography = photography;
    this.onWeatherChange = onWeatherChange;

    this.container = document.createElement('div');
    this.container.id = 'ui-container';
    document.body.appendChild(this.container);

    this.injectStyles();
    this.buildClockAndWeatherWidget();
    this.buildQuestTrackerWidget();
    this.buildInteractionPrompt();
    this.buildDialogueBox();
    this.buildInventoryDrawer();
    this.buildQuestModal();
    this.buildPhotoAlbumModal();
    this.buildCameraViewfinder();
    this.buildNotificationBanner();
    this.buildControlsBar();

    this.setupListeners();
  }

  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      #ui-container {
        position: fixed;
        inset: 0;
        pointer-events: none;
        user-select: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif;
        color: #2d3436;
        z-index: 100;
      }
      .ui-interactive {
        pointer-events: auto;
      }
      /* Clock & Weather Widget */
      .clock-widget {
        position: absolute;
        top: 20px;
        right: 24px;
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(8px);
        border: 2px solid #ffccd5;
        border-radius: 20px;
        padding: 8px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        font-weight: 700;
      }
      .weather-btn {
        background: #ffeaa7;
        border: none;
        border-radius: 12px;
        padding: 4px 10px;
        font-size: 13px;
        cursor: pointer;
        transition: transform 0.15s;
      }
      .weather-btn:hover {
        transform: scale(1.08);
      }
      /* Quest Tracker */
      .quest-tracker {
        position: absolute;
        top: 20px;
        left: 24px;
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(8px);
        border-left: 5px solid #ff4757;
        border-radius: 12px;
        padding: 10px 16px;
        max-width: 320px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      }
      .quest-title {
        font-size: 14px;
        font-weight: 800;
        color: #d63031;
      }
      .quest-desc {
        font-size: 12px;
        color: #636e72;
        margin-top: 4px;
      }
      /* Interaction Prompt */
      .prompt-box {
        position: absolute;
        bottom: 84px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(45, 52, 54, 0.92);
        color: #ffffff;
        padding: 10px 22px;
        border-radius: 30px;
        font-size: 15px;
        font-weight: 600;
        display: none;
        align-items: center;
        gap: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: pulse 1.8s infinite;
      }
      .key-badge {
        background: #ff4757;
        color: white;
        padding: 2px 10px;
        border-radius: 8px;
        font-weight: 800;
        font-size: 13px;
      }
      /* Visual Novel Dialogue Box */
      .dialogue-modal {
        position: absolute;
        bottom: 70px;
        left: 50%;
        transform: translateX(-50%);
        width: min(720px, 92vw);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        border: 2px solid #ffb8b8;
        border-radius: 20px;
        padding: 20px 24px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
        gap: 10px;
      }
      .dialogue-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .dialogue-avatar {
        font-size: 28px;
      }
      .dialogue-name {
        font-size: 18px;
        font-weight: 800;
        color: #d63031;
      }
      .dialogue-role {
        font-size: 12px;
        color: #747d8c;
        background: #f1f2f6;
        padding: 2px 8px;
        border-radius: 10px;
      }
      .dialogue-body {
        font-size: 15px;
        line-height: 1.6;
        color: #2f3542;
        min-height: 48px;
      }
      .dialogue-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }
      .dialogue-btn {
        background: #ff4757;
        color: white;
        border: none;
        border-radius: 18px;
        padding: 6px 18px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.15s, background 0.15s;
      }
      .dialogue-btn:hover {
        background: #ff6b81;
        transform: scale(1.05);
      }
      /* Drawer & Modals */
      .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(4px);
        display: none;
        justify-content: center;
        align-items: center;
      }
      .modal-card {
        background: #ffffff;
        border-radius: 24px;
        padding: 24px;
        width: min(640px, 90vw);
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .modal-title {
        font-size: 20px;
        font-weight: 800;
        color: #2f3542;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .close-btn {
        background: #f1f2f6;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        cursor: pointer;
        font-size: 16px;
      }
      .item-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 14px;
      }
      .item-card {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 16px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 6px;
        transition: transform 0.15s, border-color 0.15s;
      }
      .item-card:hover {
        transform: translateY(-2px);
        border-color: #ffccd5;
      }
      .item-icon {
        font-size: 32px;
      }
      .item-name {
        font-size: 13px;
        font-weight: 700;
      }
      .item-desc {
        font-size: 11px;
        color: #747d8c;
      }
      .use-btn {
        background: #2ed573;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 3px 12px;
        font-size: 11px;
        cursor: pointer;
        font-weight: 700;
      }
      /* Notification Banner */
      .notify-banner {
        position: absolute;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-60px);
        background: rgba(46, 213, 115, 0.95);
        color: white;
        padding: 10px 24px;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 700;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }
      .notify-banner.show {
        transform: translateX(-50%) translateY(0);
      }
      /* Viewfinder Camera Overlay */
      .viewfinder-overlay {
        position: absolute;
        inset: 0;
        display: none;
        pointer-events: auto;
      }
      .viewfinder-grid {
        position: absolute;
        inset: 40px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);
      }
      .grid-line-h1 { position: absolute; left: 0; right: 0; top: 33.3%; height: 1px; background: rgba(255, 255, 255, 0.3); }
      .grid-line-h2 { position: absolute; left: 0; right: 0; top: 66.6%; height: 1px; background: rgba(255, 255, 255, 0.3); }
      .grid-line-v1 { position: absolute; top: 0; bottom: 0; left: 33.3%; width: 1px; background: rgba(255, 255, 255, 0.3); }
      .grid-line-v2 { position: absolute; top: 0; bottom: 0; left: 66.6%; width: 1px; background: rgba(255, 255, 255, 0.3); }
      .shutter-btn {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: #ffffff;
        border: 4px solid #ff4757;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      }
      /* Bottom Quick Controls Bar */
      .controls-bar {
        position: absolute;
        bottom: 14px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(6px);
        padding: 6px 20px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        color: #57606f;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }
      @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.04); }
        100% { transform: translateX(-50%) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  private buildClockAndWeatherWidget(): void {
    const widget = document.createElement('div');
    widget.className = 'clock-widget ui-interactive';

    this.clockElem = document.createElement('div');
    this.clockElem.textContent = '10:30 AM';

    this.weatherElem = document.createElement('button');
    this.weatherElem.className = 'weather-btn';
    this.weatherElem.textContent = '🌸 桜吹雪';
    this.weatherElem.addEventListener('click', () => {
      this.cycleWeather();
    });

    const timeSkipBtn = document.createElement('button');
    timeSkipBtn.className = 'weather-btn';
    timeSkipBtn.textContent = '⏩ +2H';
    timeSkipBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('timeskip_requested', { detail: 2 }));
    });

    widget.appendChild(this.clockElem);
    widget.appendChild(this.weatherElem);
    widget.appendChild(timeSkipBtn);
    this.container.appendChild(widget);
  }

  private buildQuestTrackerWidget(): void {
    this.questTrackerElem = document.createElement('div');
    this.questTrackerElem.className = 'quest-tracker';
    this.questTrackerElem.innerHTML = `
      <div class="quest-title">🌸 迷子の真鍮鈴 (The Lost Bell)</div>
      <div class="quest-desc">Sato-san mentioned Mikan lost her brass collar bell near the river bridge.</div>
    `;
    this.container.appendChild(this.questTrackerElem);
  }

  private buildInteractionPrompt(): void {
    this.promptElem = document.createElement('div');
    this.promptElem.className = 'prompt-box';
    this.promptElem.innerHTML = `<span class="key-badge">E</span> <span id="prompt-text">Interact</span>`;
    this.container.appendChild(this.promptElem);
  }

  private buildDialogueBox(): void {
    this.dialogueBox = document.createElement('div');
    this.dialogueBox.className = 'dialogue-modal ui-interactive';
    this.dialogueBox.innerHTML = `
      <div class="dialogue-header">
        <div class="dialogue-avatar" id="dialogue-avatar">🌸</div>
        <div>
          <div class="dialogue-name" id="dialogue-name">Hina</div>
          <div class="dialogue-role" id="dialogue-role">Sakura Mart Clerk</div>
        </div>
      </div>
      <div class="dialogue-body" id="dialogue-body">
        いらっしゃいませ！ Welcome to Sakura Mart 24H!
      </div>
      <div class="dialogue-actions" id="dialogue-actions">
        <button class="dialogue-btn" id="dialogue-continue">Continue (次へ)</button>
      </div>
    `;
    this.container.appendChild(this.dialogueBox);

    const contBtn = this.dialogueBox.querySelector('#dialogue-continue')!;
    contBtn.addEventListener('click', () => {
      audio.playUIConfirm();
      this.closeDialogue();
    });
  }

  private buildInventoryDrawer(): void {
    this.inventoryDrawer = document.createElement('div');
    this.inventoryDrawer.className = 'modal-backdrop ui-interactive';
    this.inventoryDrawer.innerHTML = `
      <div class="modal-card">
        <div class="modal-title">
          <span>🎒 Inventory (持ち物)</span>
          <button class="close-btn" id="inv-close">✕</button>
        </div>
        <div class="item-grid" id="inventory-grid"></div>
      </div>
    `;
    this.container.appendChild(this.inventoryDrawer);

    this.inventoryDrawer.querySelector('#inv-close')!.addEventListener('click', () => {
      this.inventoryDrawer.style.display = 'none';
    });
  }

  private buildQuestModal(): void {
    this.questModal = document.createElement('div');
    this.questModal.className = 'modal-backdrop ui-interactive';
    this.questModal.innerHTML = `
      <div class="modal-card">
        <div class="modal-title">
          <span>📜 Town Chronicles (クエスト一覧)</span>
          <button class="close-btn" id="quest-close">✕</button>
        </div>
        <div id="quest-list" style="display:flex; flex-direction:column; gap:12px;"></div>
      </div>
    `;
    this.container.appendChild(this.questModal);

    this.questModal.querySelector('#quest-close')!.addEventListener('click', () => {
      this.questModal.style.display = 'none';
    });
  }

  private buildPhotoAlbumModal(): void {
    this.photoAlbumModal = document.createElement('div');
    this.photoAlbumModal.className = 'modal-backdrop ui-interactive';
    this.photoAlbumModal.innerHTML = `
      <div class="modal-card" style="width:min(800px, 94vw);">
        <div class="modal-title">
          <span>📷 Sakura Photo Album (写真集)</span>
          <button class="close-btn" id="album-close">✕</button>
        </div>
        <div id="album-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:16px;"></div>
      </div>
    `;
    this.container.appendChild(this.photoAlbumModal);

    this.photoAlbumModal.querySelector('#album-close')!.addEventListener('click', () => {
      this.photoAlbumModal.style.display = 'none';
    });
  }

  private buildCameraViewfinder(): void {
    this.cameraViewfinder = document.createElement('div');
    this.cameraViewfinder.className = 'viewfinder-overlay';
    this.cameraViewfinder.innerHTML = `
      <div class="viewfinder-grid">
        <div class="grid-line-h1"></div>
        <div class="grid-line-h2"></div>
        <div class="grid-line-v1"></div>
        <div class="grid-line-v2"></div>
      </div>
      <button class="shutter-btn" id="shutter-btn"></button>
    `;
    this.container.appendChild(this.cameraViewfinder);

    this.cameraViewfinder.querySelector('#shutter-btn')!.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('take_photo_requested'));
    });
  }

  private buildNotificationBanner(): void {
    this.notificationElem = document.createElement('div');
    this.notificationElem.className = 'notify-banner';
    this.notificationElem.textContent = 'Welcome to Sakura Town!';
    this.container.appendChild(this.notificationElem);
  }

  private buildControlsBar(): void {
    const bar = document.createElement('div');
    bar.className = 'controls-bar';
    bar.textContent = '[WASD] Move | [Shift] Run | [E] Interact | [F] Bike | [V] Camera View | [C] Camera Photo | [I] Inventory | [J] Quests | [P] Album | [T] Time Skip';
    this.container.appendChild(bar);
  }

  private setupListeners(): void {
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyI') {
        const isOpen = this.inventoryDrawer.style.display === 'flex';
        this.inventoryDrawer.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) this.renderInventory();
      } else if (e.code === 'KeyJ') {
        const isOpen = this.questModal.style.display === 'flex';
        this.questModal.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) this.renderQuests();
      } else if (e.code === 'KeyP') {
        const isOpen = this.photoAlbumModal.style.display === 'flex';
        this.photoAlbumModal.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) this.renderAlbum();
      } else if (e.code === 'KeyC') {
        this.photography.togglePhotoMode();
      } else if (e.code === 'KeyT') {
        window.dispatchEvent(new CustomEvent('timeskip_requested', { detail: 2 }));
      }
    });

    // Custom App Events
    window.addEventListener('interaction_changed', ((e: CustomEvent) => {
      if (e.detail) {
        this.promptElem.style.display = 'flex';
        this.promptElem.querySelector('#prompt-text')!.textContent = e.detail.prompt;
      } else {
        this.promptElem.style.display = 'none';
      }
    }) as EventListener);

    window.addEventListener('player_notification', ((e: CustomEvent) => {
      this.showNotification(e.detail);
    }) as EventListener);

    window.addEventListener('photo_mode_changed', ((e: CustomEvent) => {
      this.cameraViewfinder.style.display = e.detail.active ? 'block' : 'none';
    }) as EventListener);

    window.addEventListener('open_dialogue', ((e: CustomEvent) => {
      this.openDialogue(e.detail);
    }) as EventListener);
  }

  public updateTimeAndWeather(time: TimeState, weather: WeatherType): void {
    this.clockElem.textContent = time.formattedTime;

    const weatherIcons: Record<WeatherType, string> = {
      sakura_storm: '🌸 桜吹雪 (Petal Storm)',
      sunny: '☀️ 晴れ (Sunny)',
      rain: '🌧️ 小雨 (Spring Rain)',
      twilight: '🌆 夕暮れ (Twilight)',
      night: '🌙 星空 (Starry Night)'
    };
    this.weatherElem.textContent = weatherIcons[weather] || '🌸 桜花';
  }

  private cycleWeather(): void {
    const cycle: WeatherType[] = ['sakura_storm', 'sunny', 'rain', 'twilight', 'night'];
    const nextIdx = (cycle.indexOf(this.weatherElem.dataset.current as WeatherType) + 1) % cycle.length;
    const nextWeather = cycle[nextIdx];
    this.weatherElem.dataset.current = nextWeather;
    this.onWeatherChange(nextWeather);
    audio.playUIConfirm();
  }

  public showNotification(text: string): void {
    this.notificationElem.textContent = text;
    this.notificationElem.classList.add('show');
    setTimeout(() => {
      this.notificationElem.classList.remove('show');
    }, 3200);
  }

  public openDialogue(data: { name: string; role: string; text: string; avatarIcon?: string }): void {
    this.isDialogueOpen = true;
    this.dialogueBox.style.display = 'flex';
    this.dialogueBox.querySelector('#dialogue-name')!.textContent = data.name;
    this.dialogueBox.querySelector('#dialogue-role')!.textContent = data.role;
    this.dialogueBox.querySelector('#dialogue-body')!.textContent = data.text;
    this.dialogueBox.querySelector('#dialogue-avatar')!.textContent = data.avatarIcon || '🌸';
  }

  public closeDialogue(): void {
    this.isDialogueOpen = false;
    this.dialogueBox.style.display = 'none';
  }

  private renderInventory(): void {
    const grid = this.inventoryDrawer.querySelector('#inventory-grid')!;
    grid.innerHTML = '';

    this.inventory.items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <div class="item-name">${item.jpName} (x${item.count})</div>
        <div class="item-desc">${item.description}</div>
      `;

      if (item.isUsable) {
        const useBtn = document.createElement('button');
        useBtn.className = 'use-btn';
        useBtn.textContent = 'Use / Eat';
        useBtn.addEventListener('click', () => {
          this.inventory.useItem(item.id);
          this.renderInventory();
        });
        card.appendChild(useBtn);
      }
      grid.appendChild(card);
    });
  }

  private renderQuests(): void {
    const list = this.questModal.querySelector('#quest-list')!;
    list.innerHTML = '';

    this.quests.quests.forEach((q) => {
      const qCard = document.createElement('div');
      qCard.style.padding = '14px';
      qCard.style.borderRadius = '14px';
      qCard.style.background = q.completed ? '#e8f8f5' : '#f8f9fa';
      qCard.style.borderLeft = q.completed ? '5px solid #2ecc71' : '5px solid #ff4757';

      qCard.innerHTML = `
        <div style="font-weight:800; font-size:15px; color:${q.completed ? '#27ae60' : '#d63031'};">
          ${q.completed ? '✅' : '🌸'} ${q.jpTitle} (${q.title})
        </div>
        <div style="font-size:12px; color:#57606f; margin-top:4px;">${q.description}</div>
        <div style="font-size:11px; color:#747d8c; margin-top:6px;"><strong>Reward:</strong> ${q.rewardText}</div>
      `;
      list.appendChild(qCard);
    });
  }

  private renderAlbum(): void {
    const grid = this.photoAlbumModal.querySelector('#album-grid')!;
    grid.innerHTML = '';

    if (this.photography.photos.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#95a5a6; padding:30px;">No photos taken yet! Press [C] to open camera and take snapshots!</div>`;
      return;
    }

    this.photography.photos.forEach((photo) => {
      const card = document.createElement('div');
      card.style.borderRadius = '12px';
      card.style.overflow = 'hidden';
      card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      card.innerHTML = `
        <img src="${photo.dataUrl}" style="width:100%; height:140px; object-fit:cover; display:block;" />
        <div style="padding:10px; font-size:12px; background:white;">
          <div style="font-weight:700;">${photo.caption}</div>
          <div style="color:#a4b0be; font-size:10px; margin-top:4px;">${photo.timestamp} • ${photo.locationName}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}
