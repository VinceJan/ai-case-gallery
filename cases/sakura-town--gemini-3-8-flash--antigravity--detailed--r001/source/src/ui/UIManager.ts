// src/ui/UIManager.ts
// Responsive Japanese anime visual novel style UI overlay and HUD.
import { LivingNPC } from '../characters/NPCSystem';
import { InventorySystem } from '../gameplay/InventorySystem';
import { QuestManager } from '../gameplay/QuestManager';
import { PhotographySystem } from '../gameplay/PhotographySystem';
import { OmikujiFortune } from '../buildings/SakuraShrine';
import { WeatherType } from '../types';
import { audio } from '../engine/AudioSynthesizer';
import { CelShaders } from '../engine/CelShaders';

export class UIManager {
  private container: HTMLDivElement;

  // HUD elements
  private timeDisplay!: HTMLSpanElement;
  private weatherDisplay!: HTMLSpanElement;
  private moneyDisplay!: HTMLSpanElement;
  private interactionBadge!: HTMLDivElement;
  private questTracker!: HTMLDivElement;
  private minimapCanvas!: HTMLCanvasElement;
  private minimapCtx!: CanvasRenderingContext2D;

  // Modals & Panels
  private dialogueBox!: HTMLDivElement;
  private shopModal!: HTMLDivElement;
  private omikujiModal!: HTMLDivElement;
  private photoViewfinder!: HTMLDivElement;
  private photoGalleryModal!: HTMLDivElement;
  private inventoryModal!: HTMLDivElement;
  private helpModal!: HTMLDivElement;
  private toastContainer!: HTMLDivElement;

  // Dialogue state
  private isDialogueActive: boolean = false;
  private activeNPC: LivingNPC | null = null;
  private currentDialogueIndex: number = 0;
  private typewriterTimer: number | null = null;

  constructor(
    private inventory: InventorySystem,
    private quests: QuestManager,
    private photoSystem: PhotographySystem,
    private onWeatherChange: (w: WeatherType) => void
  ) {
    this.container = document.createElement('div');
    this.container.id = 'ui-root';
    document.body.appendChild(this.container);

    this.injectStyles();
    this.buildHUD();
    this.buildDialogueBox();
    this.buildShopModal();
    this.buildOmikujiModal();
    this.buildPhotographyViewfinder();
    this.buildInventoryModal();
    this.buildHelpModal();
    this.buildToastSystem();

    this.setupGlobalShortcuts();
  }

  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      #ui-root {
        position: absolute;
        inset: 0;
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif;
        color: #2c3e50;
        user-select: none;
        overflow: hidden;
      }

      .ui-panel {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 182, 193, 0.6);
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
      }

      /* Top HUD Bar */
      .top-hud {
        position: absolute;
        top: 20px;
        left: 24px;
        right: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .hud-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 18px;
        font-weight: 600;
        font-size: 15px;
      }

      .hud-btn {
        background: #fff0f3;
        border: 1px solid #ffb3c6;
        border-radius: 20px;
        padding: 6px 14px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        color: #d63384;
        transition: all 0.2s ease;
      }
      .hud-btn:hover {
        background: #ffccd5;
        transform: translateY(-2px);
      }

      /* Quest Tracker (Top Left below HUD) */
      .quest-card {
        position: absolute;
        top: 80px;
        left: 24px;
        width: 320px;
        padding: 14px 18px;
      }
      .quest-title {
        font-size: 14px;
        font-weight: 700;
        color: #c0392b;
        margin-bottom: 4px;
      }
      .quest-step {
        font-size: 13px;
        color: #4b6584;
        line-height: 1.4;
      }

      /* Minimap */
      .minimap-container {
        position: absolute;
        bottom: 24px;
        right: 24px;
        width: 170px;
        height: 170px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid #ffffff;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        background: #95afc0;
        pointer-events: auto;
      }

      /* Context Interaction Badge */
      .interaction-badge {
        position: absolute;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(33, 37, 41, 0.88);
        color: #ffffff;
        padding: 10px 22px;
        border-radius: 30px;
        font-size: 15px;
        font-weight: 600;
        display: none;
        align-items: center;
        gap: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        transition: opacity 0.2s;
        border: 1px solid rgba(255,255,255,0.3);
      }
      .key-icon {
        background: #ffd32a;
        color: #1e272c;
        padding: 3px 9px;
        border-radius: 6px;
        font-weight: 800;
        font-size: 13px;
      }

      /* Visual Novel Style Dialogue Box */
      .dialogue-modal {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 820px;
        max-width: 90vw;
        padding: 24px 28px;
        display: none;
        flex-direction: column;
        gap: 10px;
        z-index: 100;
      }
      .npc-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .npc-name {
        font-size: 18px;
        font-weight: 700;
        color: #2c3e50;
      }
      .npc-role {
        font-size: 13px;
        color: #7f8c8d;
        background: #f1f2f6;
        padding: 2px 10px;
        border-radius: 12px;
      }
      .dialogue-text {
        font-size: 16px;
        line-height: 1.6;
        color: #2f3542;
        min-height: 52px;
      }
      .dialogue-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      /* Modal Popups (Shop, Omikuji, Inventory) */
      .center-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 580px;
        max-width: 92vw;
        max-height: 80vh;
        overflow-y: auto;
        padding: 24px;
        display: none;
        flex-direction: column;
        gap: 16px;
        z-index: 200;
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #f1f2f6;
        padding-bottom: 10px;
      }
      .modal-title {
        font-size: 20px;
        font-weight: 700;
        color: #e74c3c;
      }
      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #95a5a6;
      }

      /* Shop Grid */
      .shop-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 14px;
      }
      .shop-item-card {
        border: 1px solid #dfe4ea;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        background: #ffffff;
      }

      /* Camera Viewfinder */
      .camera-viewfinder {
        position: absolute;
        inset: 0;
        border: 40px solid rgba(0, 0, 0, 0.75);
        display: none;
        pointer-events: auto;
        z-index: 150;
      }
      .crosshair {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        transform: translate(-50%, -50%);
        border: 2px dashed rgba(255, 255, 255, 0.7);
        border-radius: 50%;
      }
      .camera-controls {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 18px;
        align-items: center;
      }
      .shutter-btn {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #ffffff;
        border: 4px solid #ff4757;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      }

      /* Toasts */
      .toast-container {
        position: absolute;
        top: 80px;
        right: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 300;
      }
      .toast {
        background: rgba(30, 39, 46, 0.94);
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        animation: toastIn 0.3s ease;
        border-left: 5px solid #ff6b81;
      }
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(40px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
  }

  private buildHUD(): void {
    const topHud = document.createElement('div');
    topHud.className = 'top-hud';

    // Left: Time & Weather
    const timePill = document.createElement('div');
    timePill.className = 'ui-panel hud-pill';
    this.timeDisplay = document.createElement('span');
    this.timeDisplay.textContent = '09:00 AM';
    this.weatherDisplay = document.createElement('span');
    this.weatherDisplay.textContent = '🌸 桜吹雪 (Sakura Shower)';
    timePill.appendChild(this.timeDisplay);
    timePill.appendChild(document.createTextNode('•'));
    timePill.appendChild(this.weatherDisplay);
    topHud.appendChild(timePill);

    // Center: Quick action buttons (Weather cycle, Camera, Bag, Help)
    const centerActions = document.createElement('div');
    centerActions.className = 'ui-panel hud-pill';

    const weatherBtn = document.createElement('button');
    weatherBtn.className = 'hud-btn';
    weatherBtn.textContent = '🌦️ 天気 (Weather)';
    let weatherIdx = 0;
    const weathers = [WeatherType.SAKURA_SHOWER, WeatherType.SUNNY, WeatherType.SUNSET, WeatherType.RAINY];
    weatherBtn.onclick = () => {
      weatherIdx = (weatherIdx + 1) % weathers.length;
      this.onWeatherChange(weathers[weatherIdx]);
      this.showToast(`Weather changed to: ${weathers[weatherIdx]}`);
    };

    const camBtn = document.createElement('button');
    camBtn.className = 'hud-btn';
    camBtn.textContent = '📷 写真 [P]';
    camBtn.onclick = () => this.togglePhotography();

    const bagBtn = document.createElement('button');
    bagBtn.className = 'hud-btn';
    bagBtn.textContent = '🎒 持ち物 [Tab]';
    bagBtn.onclick = () => this.toggleInventoryModal();

    const curveBtn = document.createElement('button');
    curveBtn.className = 'hud-btn';
    curveBtn.textContent = '🌍 曲面世界 (Curved)';
    curveBtn.onclick = () => {
      CelShaders.isCurvedWorld = !CelShaders.isCurvedWorld;
      curveBtn.textContent = CelShaders.isCurvedWorld ? '🌍 曲面世界 (Curved)' : '📐 平面世界 (Flat)';
      this.showToast(`Curved world horizon set to: ${CelShaders.isCurvedWorld ? 'ON' : 'OFF'}`);
    };

    const helpBtn = document.createElement('button');
    helpBtn.className = 'hud-btn';
    helpBtn.textContent = '❓ ガイド [H]';
    helpBtn.onclick = () => this.toggleHelpModal();

    centerActions.appendChild(weatherBtn);
    centerActions.appendChild(camBtn);
    centerActions.appendChild(bagBtn);
    centerActions.appendChild(curveBtn);
    centerActions.appendChild(helpBtn);
    topHud.appendChild(centerActions);

    // Right: Money
    const moneyPill = document.createElement('div');
    moneyPill.className = 'ui-panel hud-pill';
    this.moneyDisplay = document.createElement('span');
    this.moneyDisplay.textContent = '¥ 1,500';
    moneyPill.appendChild(document.createTextNode('所持金: '));
    moneyPill.appendChild(this.moneyDisplay);
    topHud.appendChild(moneyPill);

    this.container.appendChild(topHud);

    // Quest Tracker Card
    this.questTracker = document.createElement('div');
    this.questTracker.className = 'ui-panel quest-card';
    this.updateQuestDisplay();
    this.container.appendChild(this.questTracker);

    // Minimap
    const mapContainer = document.createElement('div');
    mapContainer.className = 'minimap-container';
    this.minimapCanvas = document.createElement('canvas');
    this.minimapCanvas.width = 170;
    this.minimapCanvas.height = 170;
    this.minimapCtx = this.minimapCanvas.getContext('2d')!;
    mapContainer.appendChild(this.minimapCanvas);
    this.container.appendChild(mapContainer);

    // Context Interaction Badge
    this.interactionBadge = document.createElement('div');
    this.interactionBadge.className = 'interaction-badge';
    this.interactionBadge.innerHTML = `<span class="key-icon">E</span> <span id="badge-label">Talk</span>`;
    this.container.appendChild(this.interactionBadge);
  }

  private buildDialogueBox(): void {
    this.dialogueBox = document.createElement('div');
    this.dialogueBox.className = 'ui-panel dialogue-modal';
    this.dialogueBox.innerHTML = `
      <div class="npc-header">
        <span class="npc-name" id="diag-npc-name">Hina</span>
        <span class="npc-role" id="diag-npc-role">Clerk</span>
      </div>
      <div class="dialogue-text" id="diag-text">...</div>
      <div class="dialogue-footer">
        <button class="hud-btn" id="diag-next-btn">Next [E] ▶</button>
      </div>
    `;
    this.container.appendChild(this.dialogueBox);

    const nextBtn = this.dialogueBox.querySelector('#diag-next-btn') as HTMLButtonElement;
    nextBtn.onclick = () => this.advanceDialogue();
  }

  private buildShopModal(): void {
    this.shopModal = document.createElement('div');
    this.shopModal.className = 'ui-panel center-modal';
    this.shopModal.innerHTML = `
      <div class="modal-header">
        <span class="modal-title">🏪 さくらマート (Sakura Mart 24H)</span>
        <button class="close-btn" id="shop-close-btn">&times;</button>
      </div>
      <div style="font-size:14px;color:#666;">Choose delicious snacks, bento, and refreshing canned drinks:</div>
      <div class="shop-grid" id="shop-items-grid"></div>
      <div style="margin-top:10px;text-align:right;">
        <button class="hud-btn" id="shop-parttime-btn" style="background:#2ecc71;color:#fff;border:none;padding:10px 20px;">
          💼 Work Part-Time Cashier Shift (+¥800)
        </button>
      </div>
    `;
    this.container.appendChild(this.shopModal);

    const closeBtn = this.shopModal.querySelector('#shop-close-btn') as HTMLButtonElement;
    closeBtn.onclick = () => this.closeShop();

    const parttimeBtn = this.shopModal.querySelector('#shop-parttime-btn') as HTMLButtonElement;
    parttimeBtn.onclick = () => {
      this.inventory.earnMoney(800);
      audio.playStoreDoorChime();
      this.showToast('You completed an energetic 2-hour cashier shift at Sakura Mart! Earned ¥800.');
      this.closeShop();
    };
  }

  private buildOmikujiModal(): void {
    this.omikujiModal = document.createElement('div');
    this.omikujiModal.className = 'ui-panel center-modal';
    this.omikujiModal.style.textAlign = 'center';
    this.omikujiModal.innerHTML = `
      <div class="modal-header">
        <span class="modal-title">⛩️ さくら神社 御神籤 (Omikuji)</span>
        <button class="close-btn" id="omikuji-close-btn">&times;</button>
      </div>
      <div id="omikuji-rank" style="font-size:32px;font-weight:800;color:#c0392b;margin:15px 0;">大吉</div>
      <div id="omikuji-blessing" style="font-size:16px;line-height:1.7;color:#2f3542;margin-bottom:15px;"></div>
      <div id="omikuji-lucky" style="font-size:14px;background:#fff0f3;padding:8px;border-radius:8px;color:#d63384;"></div>
      <button class="hud-btn" id="omikuji-ok-btn" style="margin-top:15px;">Tied to Sacred Pine Tree (結ぶ)</button>
    `;
    this.container.appendChild(this.omikujiModal);

    const closeBtn = this.omikujiModal.querySelector('#omikuji-close-btn') as HTMLButtonElement;
    const okBtn = this.omikujiModal.querySelector('#omikuji-ok-btn') as HTMLButtonElement;
    closeBtn.onclick = okBtn.onclick = () => {
      this.omikujiModal.style.display = 'none';
    };
  }

  private buildPhotographyViewfinder(): void {
    this.photoViewfinder = document.createElement('div');
    this.photoViewfinder.className = 'camera-viewfinder';
    this.photoViewfinder.innerHTML = `
      <div class="crosshair"></div>
      <div style="position:absolute;top:20px;left:20px;color:#fff;font-weight:700;font-size:18px;">
        📸 SAKURA SNAP 4K
      </div>
      <div class="camera-controls">
        <button class="hud-btn" id="cam-filter-btn">Filter: Normal</button>
        <button class="shutter-btn" id="cam-shutter-btn" title="Snap Photo [Space]"></button>
        <button class="hud-btn" id="cam-exit-btn">Exit Viewfinder [P]</button>
      </div>
    `;
    this.container.appendChild(this.photoViewfinder);

    const shutterBtn = this.photoViewfinder.querySelector('#cam-shutter-btn') as HTMLButtonElement;
    shutterBtn.onclick = () => {
      window.dispatchEvent(new CustomEvent('take_photo_requested'));
    };

    const filterBtn = this.photoViewfinder.querySelector('#cam-filter-btn') as HTMLButtonElement;
    const filters: ('normal' | 'warm' | 'vintage' | 'bloom')[] = ['normal', 'warm', 'vintage', 'bloom'];
    let fIdx = 0;
    filterBtn.onclick = () => {
      fIdx = (fIdx + 1) % filters.length;
      this.photoSystem.currentFilter = filters[fIdx];
      filterBtn.textContent = `Filter: ${filters[fIdx].toUpperCase()}`;
    };

    const exitBtn = this.photoViewfinder.querySelector('#cam-exit-btn') as HTMLButtonElement;
    exitBtn.onclick = () => this.togglePhotography();
  }

  private buildInventoryModal(): void {
    this.inventoryModal = document.createElement('div');
    this.inventoryModal.className = 'ui-panel center-modal';
    this.inventoryModal.innerHTML = `
      <div class="modal-header">
        <span class="modal-title">🎒 持ち物 (Player Backpack)</span>
        <button class="close-btn" id="bag-close-btn">&times;</button>
      </div>
      <div id="bag-items-list" style="display:flex;flex-direction:column;gap:10px;"></div>
    `;
    this.container.appendChild(this.inventoryModal);

    const closeBtn = this.inventoryModal.querySelector('#bag-close-btn') as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.inventoryModal.style.display = 'none';
    };
  }

  private buildHelpModal(): void {
    this.helpModal = document.createElement('div');
    this.helpModal.className = 'ui-panel center-modal';
    this.helpModal.innerHTML = `
      <div class="modal-header">
        <span class="modal-title">🌸 桜花小鎮 操作案内 (Game Guide & Controls)</span>
        <button class="close-btn" id="help-close-btn">&times;</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;line-height:1.6;color:#2f3542;">
        <div><strong>🚶 移動 (Movement):</strong> <span class="key-icon">W</span> <span class="key-icon">A</span> <span class="key-icon">S</span> <span class="key-icon">D</span> / 方向キー (Arrow Keys)</div>
        <div><strong>🏃 ダッシュ (Sprint):</strong> <span class="key-icon">Shift</span></div>
        <div><strong>🦘 ジャンプ (Jump):</strong> <span class="key-icon">Space</span></div>
        <div><strong>💬 インタラクト (Interact):</strong> <span class="key-icon">E</span> (NPC会話、改札、自動販売機、列車の乗降、神社参拝、お店)</div>
        <div><strong>🚲 自転車 (Mamachari):</strong> <span class="key-icon">B</span> で乗車/駐車、<span class="key-icon">F</span> でベルを鳴らす ("Rin-Rin!")</div>
        <div><strong>📷 写真撮影 (Sakura Snap):</strong> <span class="key-icon">P</span> でカメラ起動、ファインダー内で撮影</div>
        <div><strong>🎒 持ち物・クエスト (Backpack):</strong> <span class="key-icon">Tab</span></div>
        <div><strong>🌍 曲面世界 (Curved World):</strong> 上部メニューのボタンで曲面・平面切り替え</div>
        <div><strong>🌦️ 天候切替 (Weather):</strong> 上部メニューで 快晴・桜吹雪・夕暮れ・春雨 をいつでも切替可能</div>
      </div>
    `;
    this.container.appendChild(this.helpModal);

    const closeBtn = this.helpModal.querySelector('#help-close-btn') as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.helpModal.style.display = 'none';
    };
  }

  private buildToastSystem(): void {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'toast-container';
    this.container.appendChild(this.toastContainer);
  }

  private setupGlobalShortcuts(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyP') {
        this.togglePhotography();
      }
      if (e.code === 'KeyH') {
        this.toggleHelpModal();
      }
      if (e.code === 'Tab') {
        e.preventDefault();
        this.toggleInventoryModal();
      }
      if (e.code === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  public toggleHelpModal(): void {
    const isShowing = this.helpModal.style.display === 'flex';
    this.helpModal.style.display = isShowing ? 'none' : 'flex';
  }

  // --- PUBLIC API METHODS ---

  public updateTimeAndWeather(timeStr: string, weather: WeatherType): void {
    this.timeDisplay.textContent = timeStr;
    const weatherNames: Record<WeatherType, string> = {
      [WeatherType.SUNNY]: '☀️ 快晴 (Sunny)',
      [WeatherType.SAKURA_SHOWER]: '🌸 桜吹雪 (Sakura Shower)',
      [WeatherType.SUNSET]: '🌇 夕暮れ (Sunset)',
      [WeatherType.RAINY]: '🌧️ 春雨 (Spring Rain)',
      [WeatherType.NIGHT_STARRY]: '🌌 星空 (Starry Night)'
    };
    this.weatherDisplay.textContent = weatherNames[weather] || '🌸 晴れ';
    this.moneyDisplay.textContent = `¥ ${this.inventory.money.toLocaleString()}`;
  }

  public updateQuestDisplay(): void {
    const q = this.quests.getActiveQuest();
    if (!q) {
      this.questTracker.innerHTML = `
        <div class="quest-title">🌸 Sakura Town Life</div>
        <div class="quest-step">Enjoy exploring the town, chatting with residents, and taking scenic photos!</div>
      `;
      return;
    }

    this.questTracker.innerHTML = `
      <div class="quest-title">${q.title} (${q.jpTitle})</div>
      <div class="quest-step">${q.stepDescriptions[q.currentStep] || 'Completed!'}</div>
      <div style="font-size:11px;color:#95a5a6;margin-top:6px;">Step ${q.currentStep + 1} of ${q.totalSteps} • Reward: ¥${q.rewardMoney}</div>
    `;
  }

  public setInteractionPrompt(prompt: { key: string; label: string } | null): void {
    if (!prompt || this.isDialogueActive) {
      this.interactionBadge.style.display = 'none';
      return;
    }
    this.interactionBadge.style.display = 'flex';
    this.interactionBadge.querySelector('.key-icon')!.textContent = prompt.key;
    this.interactionBadge.querySelector('#badge-label')!.textContent = prompt.label;
  }

  public showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  public openDialogue(npc: LivingNPC): void {
    this.isDialogueActive = true;
    this.activeNPC = npc;
    this.currentDialogueIndex = 0;
    this.dialogueBox.style.display = 'flex';

    (this.dialogueBox.querySelector('#diag-npc-name') as HTMLElement).textContent = `${npc.personality.name} (${npc.personality.jpName})`;
    (this.dialogueBox.querySelector('#diag-npc-role') as HTMLElement).textContent = npc.personality.jpRole;

    this.showCurrentDialogueLine();
  }

  private showCurrentDialogueLine(): void {
    if (!this.activeNPC) return;
    const lines = this.activeNPC.personality.defaultDialogue;
    const line = lines[this.currentDialogueIndex % lines.length];

    const textEl = this.dialogueBox.querySelector('#diag-text') as HTMLElement;
    textEl.textContent = '';

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    let charIdx = 0;
    this.typewriterTimer = window.setInterval(() => {
      if (charIdx < line.length) {
        textEl.textContent += line[charIdx];
        if (charIdx % 3 === 0) audio.playDialogueBlip();
        charIdx++;
      } else {
        if (this.typewriterTimer) clearInterval(this.typewriterTimer);
      }
    }, 30);
  }

  public advanceDialogue(): void {
    if (!this.activeNPC) return;
    const lines = this.activeNPC.personality.defaultDialogue;
    this.currentDialogueIndex++;
    if (this.currentDialogueIndex >= lines.length) {
      // Close dialogue
      this.dialogueBox.style.display = 'none';
      this.isDialogueActive = false;
      this.activeNPC = null;
      if (this.typewriterTimer) clearInterval(this.typewriterTimer);

      // Check quest progress
      const q = this.quests.getActiveQuest();
      if (q && q.id === 'quest_welcome' && q.currentStep === 0) {
        this.quests.advanceQuest('quest_welcome');
        this.updateQuestDisplay();
      }
    } else {
      this.showCurrentDialogueLine();
    }
  }

  public openShop(): void {
    this.shopModal.style.display = 'flex';
    const grid = this.shopModal.querySelector('#shop-items-grid') as HTMLElement;
    grid.innerHTML = '';

    Object.values(InventorySystem.catalog).forEach((item) => {
      if (item.category === 'quest') return;
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      card.innerHTML = `
        <div style="font-size:24px;">${item.icon} <span style="font-weight:700;font-size:15px;">${item.name}</span></div>
        <div style="font-size:12px;color:#7f8c8d;">${item.description}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
          <span style="font-weight:700;color:#e74c3c;">¥${item.price}</span>
          <button class="hud-btn" id="buy-btn-${item.id}">Buy</button>
        </div>
      `;
      grid.appendChild(card);

      const buyBtn = card.querySelector(`#buy-btn-${item.id}`) as HTMLButtonElement;
      buyBtn.onclick = () => {
        if (this.inventory.spendMoney(item.price)) {
          this.inventory.addItem(item, 1);
          audio.playVendingMachineBuy();
          this.showToast(`Purchased ${item.name}! Remaining: ¥${this.inventory.money}`);
          this.updateTimeAndWeather(this.timeDisplay.textContent || '', WeatherType.SUNNY);
        } else {
          this.showToast('Not enough Yen in wallet!');
        }
      };
    });
  }

  public closeShop(): void {
    this.shopModal.style.display = 'none';
  }

  public openOmikuji(fortune: OmikujiFortune): void {
    this.omikujiModal.style.display = 'flex';
    (this.omikujiModal.querySelector('#omikuji-rank') as HTMLElement).textContent = fortune.jpRank;
    (this.omikujiModal.querySelector('#omikuji-blessing') as HTMLElement).textContent = fortune.blessing;
    (this.omikujiModal.querySelector('#omikuji-lucky') as HTMLElement).textContent = `Lucky Item: ${fortune.luckyItem}`;
  }

  public togglePhotography(): void {
    const active = this.photoSystem.toggleCameraMode();
    this.photoViewfinder.style.display = active ? 'block' : 'none';
  }

  public toggleInventoryModal(): void {
    const isShowing = this.inventoryModal.style.display === 'flex';
    if (isShowing) {
      this.inventoryModal.style.display = 'none';
      return;
    }

    this.inventoryModal.style.display = 'flex';
    const list = this.inventoryModal.querySelector('#bag-items-list') as HTMLElement;
    list.innerHTML = '';

    if (this.inventory.items.size === 0) {
      list.innerHTML = '<div style="color:#888;">Backpack is empty. Visit Sakura Mart to buy snacks!</div>';
      return;
    }

    this.inventory.items.forEach(({ item, count }) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid #eee;';
      row.innerHTML = `
        <div>
          <span style="font-size:20px;">${item.icon}</span>
          <strong style="margin-left:8px;">${item.name} (${item.jpName})</strong>
          <span style="color:#777;margin-left:8px;">x${count}</span>
        </div>
        ${item.isConsumable ? `<button class="hud-btn" id="consume-${item.id}">Eat/Drink</button>` : ''}
      `;
      list.appendChild(row);

      if (item.isConsumable) {
        const cBtn = row.querySelector(`#consume-${item.id}`) as HTMLButtonElement;
        cBtn.onclick = () => {
          const res = this.inventory.consumeItem(item.id);
          this.showToast(res.message);
          this.toggleInventoryModal(); // refresh
          this.toggleInventoryModal();
        };
      }
    });
  }

  public closeAllModals(): void {
    this.dialogueBox.style.display = 'none';
    this.shopModal.style.display = 'none';
    this.omikujiModal.style.display = 'none';
    this.inventoryModal.style.display = 'none';
    this.helpModal.style.display = 'none';
    this.photoViewfinder.style.display = 'none';
    this.isDialogueActive = false;
    this.photoSystem.isCameraModeActive = false;
  }

  public renderMinimap(
    playerPos: { x: number; z: number },
    playerYaw: number,
    trainPos: { x: number; z: number },
    npcs: LivingNPC[]
  ): void {
    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = 0.85; // Scale world meters to canvas pixels

    // Background grass
    ctx.fillStyle = '#8cb86d';
    ctx.fillRect(0, 0, w, h);

    // River canal (Z: -44 to -34)
    ctx.fillStyle = '#48dbfb';
    const riverY = cy + (-39 - playerPos.z) * scale;
    ctx.fillRect(0, riverY - 5 * scale, w, 10 * scale);

    // Main road (X = 25)
    ctx.fillStyle = '#3d4044';
    const roadX = cx + (25 - playerPos.x) * scale;
    ctx.fillRect(roadX - 4 * scale, 0, 8 * scale, h);

    // Train loop indicator
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 55, 0, Math.PI * 2);
    ctx.stroke();

    // Train dot (Green)
    const tX = cx + (trainPos.x - playerPos.x) * scale;
    const tY = cy + (trainPos.z - playerPos.z) * scale;
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(tX, tY, 5, 0, Math.PI * 2);
    ctx.fill();

    // NPC dots (Yellow)
    ctx.fillStyle = '#f1c40f';
    npcs.forEach((npc) => {
      const nx = cx + (npc.currentPos.x - playerPos.x) * scale;
      const ny = cy + (npc.currentPos.z - playerPos.z) * scale;
      ctx.beginPath();
      ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Player arrow (Center)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(playerYaw);
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 2);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Compass 'N'
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('N', cx - 4, 15);
  }
}
