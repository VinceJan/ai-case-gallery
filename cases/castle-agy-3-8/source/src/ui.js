// Floating Glassmorphism Controller & Weather UI
export class DioramaUI {
  constructor(options) {
    this.weatherSystem = options.weatherSystem;
    this.audioSystem = options.audioSystem;
    this.onCameraPreset = options.onCameraPreset;
    this.onToggleAutoRotate = options.onToggleAutoRotate;

    this.isUiVisible = true;
    this.isAutoRotate = false;

    this.createDom();
    this.bindEvents();
  }

  createDom() {
    // Styles
    const style = document.createElement('style');
    style.textContent = `
      .diorama-hud {
        position: fixed;
        inset: 0;
        pointer-events: none;
        user-select: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        z-index: 1000;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .diorama-hud.hidden {
        opacity: 0;
        transform: scale(0.98);
        pointer-events: none !important;
      }

      /* Floating header pill */
      .top-bar {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.78);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.85);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        border-radius: 999px;
        padding: 6px 18px;
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .title-text {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: #2c3e50;
      }
      .tag-badge {
        background: #eef2f7;
        color: #576574;
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 999px;
        font-weight: 600;
      }

      /* Bottom Control Panel */
      .bottom-panel {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      /* Weather Buttons Group */
      .weather-bar {
        background: rgba(255, 255, 255, 0.82);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
        border-radius: 999px;
        padding: 5px;
        display: flex;
        gap: 4px;
      }
      .weather-btn {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
        color: #4b6584;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .weather-btn:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #1e272e;
      }
      .weather-btn.active {
        background: #2e86de;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(46, 134, 222, 0.35);
      }

      /* Camera Views Bar */
      .camera-bar {
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        border-radius: 999px;
        padding: 4px;
        display: flex;
        gap: 4px;
      }
      .cam-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 500;
        color: #576574;
        transition: all 0.15s ease;
      }
      .cam-btn:hover {
        background: rgba(0, 0, 0, 0.04);
        color: #222f3e;
      }
      .cam-btn.active {
        background: #34495e;
        color: #ffffff;
      }

      /* Quick Actions (Floating Right) */
      .quick-actions {
        position: absolute;
        top: 20px;
        right: 20px;
        pointer-events: auto;
        display: flex;
        gap: 8px;
      }
      .icon-btn {
        background: rgba(255, 255, 255, 0.82);
        backdrop-filter: blur(14px);
        border: 1px solid rgba(255, 255, 255, 0.9);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 15px;
        color: #2c3e50;
        transition: transform 0.2s, background 0.2s;
      }
      .icon-btn:hover {
        transform: translateY(-2px);
        background: #ffffff;
      }
      .icon-btn.active {
        background: #10ac84;
        color: #ffffff;
      }

      /* Persistent Show UI Button when hidden */
      .show-hud-trigger {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1001;
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.7);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        border-radius: 999px;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 600;
        color: #34495e;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.25s;
        opacity: 0.85;
      }
      .show-hud-trigger:hover {
        opacity: 1;
        transform: translateY(-2px);
        background: #ffffff;
      }
      .kbd-badge {
        background: #e2e8f0;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 4px;
        font-family: monospace;
      }
    `;
    document.head.appendChild(style);

    // Root Container
    this.hud = document.createElement('div');
    this.hud.className = 'diorama-hud';
    this.hud.innerHTML = `
      <div class="top-bar">
        <span class="title-text">🏰 中世纪城堡与麦田村庄</span>
        <span class="tag-badge">三渲二微缩模型</span>
      </div>

      <div class="quick-actions">
        <button id="btn-audio" class="icon-btn" title="环境原声 (白噪音/鸟鸣/微雨)">🎵</button>
        <button id="btn-rotate" class="icon-btn" title="自动旋转">🔄</button>
        <button id="btn-hide" class="icon-btn" title="隐藏UI / 纯净观赏 (快捷键 H)">👁️</button>
      </div>

      <div class="bottom-panel">
        <div class="weather-bar">
          <button class="weather-btn active" data-weather="day">☀️ 晴朗白昼</button>
          <button class="weather-btn" data-weather="sunset">🌅 黄金落日</button>
          <button class="weather-btn" data-weather="rain">🌧️ 微雨朦胧</button>
          <button class="weather-btn" data-weather="night">🌙 静谧星夜</button>
          <button class="weather-btn" data-weather="snow">❄️ 冬日初雪</button>
        </div>

        <div class="camera-bar">
          <button class="cam-btn active" data-cam="overview">领地全景</button>
          <button class="cam-btn" data-cam="castle">城堡特写</button>
          <button class="cam-btn" data-cam="village">繁华集市</button>
          <button class="cam-btn" data-cam="farmland">麦浪田园</button>
          <button class="cam-btn" data-cam="knight">像素小人</button>
        </div>
      </div>
    `;
    document.body.appendChild(this.hud);

    // Persistent mini button to restore UI
    this.restoreBtn = document.createElement('div');
    this.restoreBtn.className = 'show-hud-trigger';
    this.restoreBtn.style.display = 'none';
    this.restoreBtn.innerHTML = `<span>👁️ 显示界面</span> <span class="kbd-badge">H</span>`;
    document.body.appendChild(this.restoreBtn);
  }

  bindEvents() {
    // Weather Buttons
    const weatherBtns = this.hud.querySelectorAll('.weather-btn');
    weatherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        weatherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const weather = btn.getAttribute('data-weather');
        this.weatherSystem.setPreset(weather);
        if (this.audioSystem) {
          this.audioSystem.setWeather(weather);
        }
      });
    });

    // Camera Preset Buttons
    const camBtns = this.hud.querySelectorAll('.cam-btn');
    camBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        camBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const camPreset = btn.getAttribute('data-cam');
        if (this.onCameraPreset) {
          this.onCameraPreset(camPreset);
        }
      });
    });

    // Audio Toggle
    const audioBtn = this.hud.querySelector('#btn-audio');
    audioBtn.addEventListener('click', () => {
      if (this.audioSystem) {
        const isPlaying = this.audioSystem.toggle();
        audioBtn.classList.toggle('active', isPlaying);
      }
    });

    // Auto Rotate Toggle
    const rotateBtn = this.hud.querySelector('#btn-rotate');
    rotateBtn.addEventListener('click', () => {
      this.isAutoRotate = !this.isAutoRotate;
      rotateBtn.classList.toggle('active', this.isAutoRotate);
      if (this.onToggleAutoRotate) {
        this.onToggleAutoRotate(this.isAutoRotate);
      }
    });

    // Hide UI Button
    const hideBtn = this.hud.querySelector('#btn-hide');
    hideBtn.addEventListener('click', () => this.toggleUI());

    // Restore UI Button
    this.restoreBtn.addEventListener('click', () => this.toggleUI());

    // Keyboard Shortcuts: 'H' for hide/show UI, 1-5 for weathers, Space for rotate
    window.addEventListener('keydown', (e) => {
      if (e.key === 'h' || e.key === 'H') {
        this.toggleUI();
      } else if (e.key === ' ') {
        e.preventDefault();
        this.isAutoRotate = !this.isAutoRotate;
        rotateBtn.classList.toggle('active', this.isAutoRotate);
        if (this.onToggleAutoRotate) this.onToggleAutoRotate(this.isAutoRotate);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (weatherBtns[idx]) weatherBtns[idx].click();
      }
    });
  }

  toggleUI() {
    this.isUiVisible = !this.isUiVisible;
    if (this.isUiVisible) {
      this.hud.classList.remove('hidden');
      this.restoreBtn.style.display = 'none';
    } else {
      this.hud.classList.add('hidden');
      this.restoreBtn.style.display = 'flex';
    }
  }
}
