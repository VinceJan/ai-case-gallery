import { ITEMS, QUEST_DEFS, RESIDENT_PROFILES } from '../systems/gameState.js';

export class UIController {
  constructor({ gameState, atmosphere, player, npcManager, railway, audio }) {
    this.gameState = gameState;
    this.atmosphere = atmosphere;
    this.player = player;
    this.npcManager = npcManager;
    this.railway = railway;
    this.audio = audio;

    this.notebookTab = 'quests';
    this.dialogueOpen = false;
    this.notebookOpen = false;
    this.noticeOpen = false;

    this._cacheElements();
    this._bindEvents();
  }

  _cacheElements() {
    this.elTitle = document.getElementById('title-overlay');
    this.elBtnStart = document.getElementById('btn-start');
    this.elBtnResetSave = document.getElementById('btn-reset-save');
    this.elHud = document.getElementById('hud');
    this.elTimeIcon = document.getElementById('hud-time-icon');
    this.elClock = document.getElementById('hud-clock');
    this.elPeriod = document.getElementById('hud-period');
    this.elLocation = document.getElementById('hud-location');
    this.elWeather = document.getElementById('hud-weather');
    this.elEventBanner = document.getElementById('hud-event-banner');
    this.elYen = document.getElementById('hud-yen');
    this.elQuestTitle = document.getElementById('hud-quest-title');
    this.elQuestHint = document.getElementById('hud-quest-hint');
    this.elInteract = document.getElementById('interact-prompt');
    this.elInteractLabel = document.getElementById('interact-label');
    this.elSit = document.getElementById('sit-indicator');
    this.elToasts = document.getElementById('toast-container');
    this.elInvBar = document.getElementById('inventory-bar');

    this.elDialogue = document.getElementById('dialogue-box');
    this.elDlgSpeaker = document.getElementById('dialogue-speaker');
    this.elDlgRole = document.getElementById('dialogue-role');
    this.elDlgHearts = document.getElementById('dialogue-hearts');
    this.elDlgText = document.getElementById('dialogue-text');
    this.elDlgChoices = document.getElementById('dialogue-choices');
    this.elDlgContinue = document.getElementById('dialogue-continue');

    this.elNotebook = document.getElementById('notebook-modal');
    this.elNotebookBody = document.getElementById('notebook-content');

    this.elNotice = document.getElementById('notice-modal');
    this.elNoticeTitle = document.getElementById('notice-title');
    this.elNoticeBody = document.getElementById('notice-body');

    this.btnWeather = document.getElementById('btn-weather');
    this.btnTimeSpeed = document.getElementById('btn-time-speed');
    this.btnAudio = document.getElementById('btn-audio');
  }

  _bindEvents() {
    if (this.gameState.hasSavedData) {
      this.elBtnStart.textContent = '继续小镇生活';
      this.elBtnResetSave.classList.remove('hidden');
    }

    this.elBtnStart.addEventListener('click', () => {
      this.audio.unlock();
      this.audio.playUiBlip(true);
      this.elTitle.classList.add('hidden');
      this.elHud.classList.remove('hidden');
      this.player.controlsLocked = false;
      this.refreshHud();
      this.toast('🌸 欢迎来到樱花小镇！先去看看桜荘门前的红色信箱吧。');
    });

    this.elBtnResetSave.addEventListener('click', () => {
      this.gameState.clearSave();
      window.location.reload();
    });

    document.getElementById('btn-notebook').addEventListener('click', () => this.toggleNotebook('quests'));
    document.getElementById('btn-close-notebook').addEventListener('click', () => this.closeNotebook());
    document.getElementById('btn-close-notice').addEventListener('click', () => this.closeNotice());

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.notebookTab = btn.dataset.tab;
        this._renderNotebook();
      });
    });

    this.btnWeather.addEventListener('click', () => {
      this.atmosphere.isRaining = !this.atmosphere.isRaining;
      this.audio.playUiBlip();
      this.toast(this.atmosphere.isRaining ? '🌧️ 下起了轻柔的晚春樱花雨，居民们纷纷撑起伞或进店躲雨。' : '☀️ 雨过天晴，温暖的春风重新吹拂小镇。');
      this.refreshHud();
    });

    this.btnTimeSpeed.addEventListener('click', () => {
      const next = this.atmosphere.timeSpeed === 1 ? 3 : this.atmosphere.timeSpeed === 3 ? 0 : 1;
      this.atmosphere.timeSpeed = next;
      this.btnTimeSpeed.textContent = next === 0 ? '⏸️ 暂停' : `⏩ ${next}x`;
      this.audio.playUiBlip();
    });

    this.btnAudio.addEventListener('click', () => {
      this.audio.unlock();
      const muted = this.audio.toggleMute();
      this.btnAudio.textContent = muted ? '🔇' : '🔊';
    });

    document.getElementById('btn-help').addEventListener('click', () => {
      this.openNotice(
        '🌸 樱花小镇 · 操作与生活指南',
        `<div class="notice-section">
          <h4>基本操作</h4>
          <p><b>W A S D / 方向键</b>：行走 · <b>Shift</b>：小跑</p>
          <p><b>鼠标拖拽 或 Q / R</b>：旋转视角 · <b>滚轮</b>：缩放距离</p>
          <p><b>E 或 空格</b>：与居民交谈、使用自动售货机、坐下、参拜或拾取物品</p>
          <p><b>Tab</b>：打开小镇笔记 · <b>M</b>：直接打开小镇导览图 · <b>1-5</b>：使用随身物品</p>
        </div>
        <div class="notice-section">
          <h4>可进入的建筑</h4>
          <p>・<b>桜マート便利店</b>（24小时自动门与夜间照明）</p>
          <p>・<b>喫茶 こもれび</b>（08:00 – 21:00 营业，可点手冲咖啡并就座）</p>
          <p>・<b>桜荘</b>（你的家，可开关和纸灯、睡在被褥推进至清晨）</p>
          <p>・<b>桜駅</b>（候车室与月台，电车与铁路道口会真实联动运行）</p>
        </div>`
      );
    });

    this.elDlgContinue.addEventListener('click', () => this.closeDialogue());

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (!this.elTitle.classList.contains('hidden')) return;

      if (e.code === 'Escape') {
        if (this.dialogueOpen) this.closeDialogue();
        else if (this.notebookOpen) this.closeNotebook();
        else if (this.noticeOpen) this.closeNotice();
        return;
      }

      if (e.code === 'Tab') {
        e.preventDefault();
        if (this.dialogueOpen) return;
        if (this.notebookOpen) this.closeNotebook();
        else this.toggleNotebook('quests');
        return;
      }

      if (e.code === 'KeyM' && !this.dialogueOpen && !this.noticeOpen) {
        if (this.notebookOpen && this.notebookTab === 'map') this.closeNotebook();
        else this.toggleNotebook('map');
        return;
      }

      if ((e.code === 'KeyE' || e.code === 'Space') && this.dialogueOpen) {
        if (this.elDlgChoices.children.length === 0) {
          e.preventDefault();
          this.closeDialogue();
        }
        return;
      }

      // Inventory 1-5 quick use
      if (!this.isOverlayOpen() && /^Digit[1-5]$/.test(e.code)) {
        const idx = Number(e.code.slice(-1)) - 1;
        this._useInventorySlot(idx);
      }
    });
  }

  isOverlayOpen() {
    return (
      !this.elTitle.classList.contains('hidden') ||
      this.dialogueOpen ||
      this.notebookOpen ||
      this.noticeOpen
    );
  }

  setInteractPrompt(label) {
    if (!label) {
      this.elInteract.classList.add('hidden');
      return;
    }
    this.elInteractLabel.textContent = label;
    this.elInteract.classList.remove('hidden');
  }

  setSitting(isSitting) {
    this.elSit.classList.toggle('hidden', !isSitting);
  }

  toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    this.elToasts.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.35s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 360);
    }, 3400);
  }

  openDialogue({ speaker, role = '', hearts = 0, text, choices = [], speakerId = null }) {
    this.dialogueOpen = true;
    this.activeSpeakerId = speakerId;
    this.player.controlsLocked = true;
    this.elDlgSpeaker.textContent = speaker;
    this.elDlgRole.textContent = role;
    this.elDlgHearts.textContent = hearts > 0 ? '♥'.repeat(hearts) + '♡'.repeat(Math.max(0, 3 - hearts)) : '';
    this.elDlgText.textContent = text;
    this.elDlgChoices.innerHTML = '';

    if (choices.length > 0) {
      this.elDlgContinue.classList.add('hidden');
      choices.forEach((c) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = c.label;
        btn.addEventListener('click', () => {
          this.audio.playUiBlip(true);
          this.closeDialogue();
          c.onSelect();
          this.refreshHud();
        });
        this.elDlgChoices.appendChild(btn);
      });
    } else {
      this.elDlgContinue.classList.remove('hidden');
    }
    this.elDialogue.classList.remove('hidden');
  }

  closeDialogue() {
    this.dialogueOpen = false;
    this.activeSpeakerId = null;
    this.elDialogue.classList.add('hidden');
    if (!this.notebookOpen && !this.noticeOpen) this.player.controlsLocked = false;
  }

  openNotice(title, html) {
    this.noticeOpen = true;
    this.player.controlsLocked = true;
    this.elNoticeTitle.textContent = title;
    this.elNoticeBody.innerHTML = html;
    this.elNotice.classList.remove('hidden');
  }

  closeNotice() {
    this.noticeOpen = false;
    this.elNotice.classList.add('hidden');
    if (!this.dialogueOpen && !this.notebookOpen) this.player.controlsLocked = false;
  }

  toggleNotebook(tab = 'quests') {
    this.notebookTab = tab;
    this.notebookOpen = true;
    this.player.controlsLocked = true;
    this.elNotebook.classList.remove('hidden');
    this._renderNotebook();
  }

  closeNotebook() {
    this.notebookOpen = false;
    this.elNotebook.classList.add('hidden');
    if (!this.dialogueOpen && !this.noticeOpen) this.player.controlsLocked = false;
  }

  _useInventorySlot(idx) {
    const slot = this.gameState.inventory[idx];
    if (!slot) return;
    this.gameState.selectedSlot = idx;
    const def = ITEMS[slot.id];
    if (def && def.consumable) {
      this.gameState.removeItem(slot.id, 1);
      this.audio.playUiBlip(true);
      this.toast(`${def.icon} 品尝了「${def.name}」，心情变得轻松愉快！`);
    } else if (def) {
      this.toast(`${def.icon} ${def.name}：${def.desc}`);
    }
    this.refreshHud();
  }

  refreshHud() {
    const period = this.atmosphere.getPeriodInfo();
    this.elTimeIcon.textContent = period.icon;
    this.elClock.textContent = this.atmosphere.getFormattedTime();
    this.elPeriod.textContent = period.label;
    this.elLocation.textContent = this.player.collision.getLocationName(this.player.position.x, this.player.position.z);
    this.elWeather.textContent = this.atmosphere.isRaining ? '🌧️ 晚春樱雨' : '🌸 晴 · 樱花微风';
    this.elYen.textContent = String(this.gameState.yen);

    if (this.gameState.activeEvent) {
      this.elEventBanner.textContent = this.gameState.activeEvent.title;
      this.elEventBanner.classList.remove('hidden');
    } else {
      this.elEventBanner.classList.add('hidden');
    }

    const activeQ = this.gameState.getPrimaryActiveQuest();
    if (activeQ) {
      this.elQuestTitle.textContent = activeQ.title;
      this.elQuestHint.textContent = activeQ.hint;
    } else {
      this.elQuestTitle.textContent = '悠闲漫步樱花小镇';
      this.elQuestHint.textContent = '已完成全部小镇记事，尽情享受春日慢生活吧！';
    }

    // Render 5-slot inventory bar
    this.elInvBar.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const slot = this.gameState.inventory[i];
      const def = slot ? ITEMS[slot.id] : null;
      const div = document.createElement('div');
      div.className = `inv-slot${i === this.gameState.selectedSlot ? ' active' : ''}`;
      div.title = def ? `${def.name}：${def.desc}${def.consumable ? '（点击品尝）' : ''}` : `空栏位 ${i + 1}`;
      div.innerHTML = `
        <span class="inv-slot-num">${i + 1}</span>
        <span class="inv-slot-icon">${def ? def.icon : ''}</span>
        <span class="inv-slot-name">${def ? def.name : ''}</span>
        ${slot && slot.count > 1 ? `<span class="inv-slot-count">×${slot.count}</span>` : ''}
      `;
      div.addEventListener('click', () => this._useInventorySlot(i));
      this.elInvBar.appendChild(div);
    }

    // Live-update Town Map canvas if notebook map tab is open
    if (this.notebookOpen && this.notebookTab === 'map') {
      this._drawTownMap();
    }
  }

  _renderNotebook() {
    document.querySelectorAll('.tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === this.notebookTab);
    });

    if (this.notebookTab === 'quests') {
      const cards = QUEST_DEFS.map((q) => {
        const status = this.gameState.quests[q.id];
        const badgeClass = status === 'done' ? 'badge-done' : status === 'active' ? 'badge-active' : 'badge-locked';
        const badgeText = status === 'done' ? '已完成 ✓' : status === 'active' ? '进行中' : '待触发';
        return `
          <div class="entry-card ${status === 'done' ? 'done' : ''}">
            <div class="entry-title-row">
              <span class="entry-title">${q.title}</span>
              <span class="badge ${badgeClass}">${badgeText}</span>
            </div>
            <div class="entry-desc">${status === 'locked' ? '多与镇上的居民交谈或在小镇漫步，自然就会遇见这件事。' : q.hint}</div>
          </div>`;
      }).join('');
      this.elNotebookBody.innerHTML = `<div class="card-list">${cards}</div>`;
    } else if (this.notebookTab === 'residents') {
      const cards = Object.values(RESIDENT_PROFILES).map((r) => {
        const known = !!this.gameState.knownResidents[r.id];
        const npc = this.npcManager.getCoreNPC(r.id);
        const hearts = this.gameState.friendship[r.id] || 0;
        return `
          <div class="entry-card">
            <div class="entry-title-row">
              <span class="entry-title">${known ? r.name : '？？？'} <small style="font-weight:500;color:#635f70;">${known ? r.role : '尚未认识的邻居'}</small></span>
              <span style="color:#c95f7d;">${known ? '♥'.repeat(hearts) + '♡'.repeat(3 - hearts) : ''}</span>
            </div>
            <div class="entry-desc">
              ${known ? `${r.bio}<br/><b>关系：</b>${r.relation} · <b>当前去向：</b>${npc ? npc.activity : r.homeName}` : '在小镇里走走，与他们打个招呼吧。'}
            </div>
          </div>`;
      }).join('');
      this.elNotebookBody.innerHTML = `<div class="card-list">${cards}</div>`;
    } else if (this.notebookTab === 'map') {
      this.elNotebookBody.innerHTML = `
        <div class="map-canvas-wrap">
          <canvas id="town-map-canvas" width="560" height="400"></canvas>
          <div style="font-size:12px;color:#635f70;">
            🔵 你的位置 · 🌸 可进入核心建筑 · 🚃 实时电车 · 🟠 居民位置 · ⛩️ 桜神社展望台
          </div>
        </div>`;
      this._drawTownMap();
    } else if (this.notebookTab === 'system') {
      this.elNotebookBody.innerHTML = `
        <div class="card-list">
          <div class="entry-card">
            <div class="entry-title-row"><span class="entry-title">时间快捷调整（体验不同光影）</span></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
              <button class="choice-btn" data-jump="480">🌅 清晨 08:00</button>
              <button class="choice-btn" data-jump="780">☀️ 午后 13:00</button>
              <button class="choice-btn" data-jump="1040">🌇 夕阳 17:20</button>
              <button class="choice-btn" data-jump="1230">🌙 夜晚 20:30</button>
              <button class="choice-btn" data-jump="1300">🌌 深夜 21:40 (咖啡馆打烊)</button>
            </div>
          </div>
          <div class="entry-card">
            <div class="entry-title-row"><span class="entry-title">存档管理</span></div>
            <p class="entry-desc" style="margin-bottom:10px;">系统会在完成记事、获得物品或休息时自动保存进度。${this.gameState.flags.lastOmikuji ? `<br/>最近抽到的御神签：${this.gameState.flags.lastOmikuji}` : ''}</p>
            <div style="display:flex;gap:10px;">
              <button id="btn-manual-save" class="choice-btn">💾 立即保存</button>
              <button id="btn-clear-save" class="choice-btn" style="border-color:#c9524c;color:#c9524c;">🗑️ 清空存档重新开始</button>
            </div>
          </div>
        </div>`;
      this.elNotebookBody.querySelectorAll('[data-jump]').forEach((b) => {
        b.addEventListener('click', () => {
          this.atmosphere.timeMinutes = Number(b.dataset.jump);
          this.toast(`⏰ 时间调整至 ${this.atmosphere.getFormattedTime()}`);
          this.refreshHud();
        });
      });
      document.getElementById('btn-manual-save')?.addEventListener('click', () => {
        this.gameState.save(this.atmosphere.timeMinutes);
        this.toast('💾 小镇进度已保存！');
      });
      document.getElementById('btn-clear-save')?.addEventListener('click', () => {
        this.gameState.clearSave();
        window.location.reload();
      });
    }
  }

  _drawTownMap() {
    const canvas = document.getElementById('town-map-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const toX = (wx) => W / 2 + wx * 5.2;
    const toY = (wz) => H / 2 + (wz + 4) * 4.2;

    ctx.fillStyle = '#e7f0dc';
    ctx.fillRect(0, 0, W, H);

    // River
    ctx.fillStyle = '#7ec4df';
    ctx.fillRect(0, toY(25.5), W, toY(32.5) - toY(25.5));

    // Roads
    ctx.fillStyle = '#c4c2bd';
    ctx.fillRect(toX(-3), toY(-23), toX(3) - toX(-3), toY(39) - toY(-23));
    ctx.fillRect(toX(-45), toY(-1), toX(45) - toX(-45), toY(5.2) - toY(-1));
    ctx.fillRect(toX(-36), toY(-24.2), toX(36) - toX(-36), toY(-19.8) - toY(-24.2));

    // Railway line
    ctx.strokeStyle = '#575c68';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, toY(-12));
    ctx.lineTo(W, toY(-12));
    ctx.stroke();

    // Key landmarks
    const landmarks = [
      { x: -11.5, z: -19, label: '桜駅', color: '#394b6b' },
      { x: -15, z: 10.5, label: '桜マート', color: '#4ca175' },
      { x: 15, z: 10.5, label: '喫茶こもれび', color: '#966b47' },
      { x: -26, z: -27.2, label: '桜荘(家)', color: '#c95f7d' },
      { x: 16, z: -40, label: '⛩️桜神社', color: '#cf4238' },
      { x: 36, z: -25, label: '旧木屋', color: '#6b7a5e' },
      { x: 0, z: 29, label: '桜川桥', color: '#3a7c9e' },
    ];
    ctx.font = '700 11px "Yu Gothic UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    landmarks.forEach((l) => {
      const lx = toX(l.x);
      const ly = toY(l.z);
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.arc(lx, ly, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2c2a35';
      ctx.fillText(l.label, lx, ly - 10);
    });

    // Live Train marker
    if (this.railway.trainGroup.visible) {
      ctx.fillStyle = '#e67c98';
      ctx.fillRect(toX(this.railway.trainX) - 16, toY(-12) - 4, 32, 8);
    }

    // Core NPCs
    for (const npc of this.npcManager.npcs) {
      if (!npc.isCore) continue;
      ctx.fillStyle = '#e69345';
      ctx.beginPath();
      ctx.arc(toX(npc.pos.x), toY(npc.pos.z), 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Player marker
    const px = toX(this.player.position.x);
    const py = toY(this.player.position.z);
    ctx.fillStyle = '#2c7be5';
    ctx.beginPath();
    ctx.arc(px, py, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
