import { ITEMS } from '../gameplay/GameState.js';
import { CollisionSystem } from '../core/CollisionSystem.js';

export class UIManager {
  constructor() {
    this.els = {
      titleScreen: document.getElementById('title-screen'),
      btnStart: document.getElementById('btn-start'),
      hud: document.getElementById('hud'),
      weatherIcon: document.getElementById('hud-weather-icon'),
      day: document.getElementById('hud-day'),
      period: document.getElementById('hud-period'),
      clock: document.getElementById('hud-clock'),
      yen: document.getElementById('hud-yen'),
      location: document.getElementById('hud-location'),
      trainBanner: document.getElementById('hud-train-banner'),
      trainText: document.getElementById('hud-train-text'),
      minimap: document.getElementById('minimap-canvas'),
      btnNotebook: document.getElementById('btn-notebook'),
      btnCamera: document.getElementById('btn-camera'),
      btnSpeed: document.getElementById('btn-speed'),
      btnAudio: document.getElementById('btn-audio'),
      interactPrompt: document.getElementById('interact-prompt'),
      interactLabel: document.getElementById('interact-label'),
      activeTaskHint: document.getElementById('active-task-hint'),
      taskHintBody: document.getElementById('task-hint-body'),
      sitBar: document.getElementById('sit-bar'),
      btnStandUp: document.getElementById('btn-stand-up'),
      toastContainer: document.getElementById('toast-container'),
      dialogueOverlay: document.getElementById('dialogue-overlay'),
      dialogueSpeaker: document.getElementById('dialogue-speaker'),
      dialogueRole: document.getElementById('dialogue-role'),
      dialogueText: document.getElementById('dialogue-text'),
      dialogueChoices: document.getElementById('dialogue-choices'),
      fishingUi: document.getElementById('fishing-ui'),
      fishingStatus: document.getElementById('fishing-status'),
      fishingBarWrap: document.getElementById('fishing-bar-wrap'),
      fishingCursor: document.getElementById('fishing-cursor'),
      btnCancelFish: document.getElementById('btn-cancel-fish'),
      cameraUi: document.getElementById('camera-ui'),
      vfSubject: document.getElementById('vf-subject'),
      vfTime: document.getElementById('vf-time'),
      btnSnap: document.getElementById('btn-snap'),
      btnExitCam: document.getElementById('btn-exit-cam'),
      cameraFlash: document.getElementById('camera-flash'),
      notebookModal: document.getElementById('notebook-modal'),
      notebookBody: document.getElementById('notebook-body'),
      btnCloseNotebook: document.getElementById('btn-close-notebook'),
      fadeCurtain: document.getElementById('fade-curtain'),
      fadeMessage: document.getElementById('fade-message'),
    };

    this.mmCtx = this.els.minimap.getContext('2d');
    this.dialogueOpen = false;
    this.notebookOpen = false;
    this.currentTab = 'tasks';
    this._notebookContext = null;

    document.querySelectorAll('.nb-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nb-tab').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        if (this._notebookContext) this.renderNotebook(this._notebookContext);
      });
    });

    this.els.btnCloseNotebook.addEventListener('click', () => this.toggleNotebook(false));
  }

  hideTitleAndShowHud() {
    this.els.titleScreen.style.opacity = '0';
    setTimeout(() => this.els.titleScreen.classList.add('hidden'), 450);
    this.els.hud.classList.remove('hidden');
  }

  showToast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    this.els.toastContainer.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.35s ease';
      setTimeout(() => el.remove(), 360);
    }, 3400);
  }

  setPrompt(visible, label = '') {
    if (visible && !this.dialogueOpen && !this.notebookOpen) {
      this.els.interactLabel.textContent = label;
      this.els.interactPrompt.classList.remove('hidden');
    } else {
      this.els.interactPrompt.classList.add('hidden');
    }
  }

  showSitBar(visible) { this.els.sitBar.classList.toggle('hidden', !visible); }

  showDialogue(speaker, role, text, choices) {
    this.dialogueOpen = true;
    this.els.dialogueSpeaker.textContent = speaker;
    this.els.dialogueRole.textContent = role;
    this.els.dialogueText.textContent = text;
    this.els.dialogueChoices.innerHTML = '';

    for (const c of choices) {
      const btn = document.createElement('button');
      btn.className = `choice-btn${c.primary ? ' primary' : ''}`;
      btn.textContent = c.label;
      btn.disabled = !!c.disabled;
      btn.addEventListener('click', () => { if (!btn.disabled && c.onClick) c.onClick(); });
      this.els.dialogueChoices.appendChild(btn);
    }

    this.els.dialogueOverlay.classList.remove('hidden');
    this.setPrompt(false);
  }

  hideDialogue() {
    this.dialogueOpen = false;
    this.els.dialogueOverlay.classList.add('hidden');
  }

  showFishingUI(visible) { this.els.fishingUi.classList.toggle('hidden', !visible); }

  updateFishingUI(phase, cursor01, statusText) {
    this.els.fishingStatus.textContent = statusText;
    if (phase === 'BITING') {
      this.els.fishingBarWrap.classList.remove('hidden');
      this.els.fishingCursor.style.left = `${(cursor01 * 100).toFixed(1)}%`;
    } else {
      this.els.fishingBarWrap.classList.add('hidden');
    }
  }

  showCameraUI(visible) {
    this.els.cameraUi.classList.toggle('hidden', !visible);
    if (visible) this.setPrompt(false);
  }

  updateCameraViewfinder(labels, timeStr) {
    this.els.vfTime.textContent = timeStr;
    this.els.vfSubject.textContent = labels.length > 0 ? `取景中：${labels.join(' · ')}` : '构图中 · 拖动鼠标调整镜头';
  }

  triggerCameraFlash() {
    this.els.cameraFlash.classList.add('active');
    requestAnimationFrame(() => setTimeout(() => this.els.cameraFlash.classList.remove('active'), 40));
  }

  toggleNotebook(forceState, context = null) {
    if (context) this._notebookContext = context;
    this.notebookOpen = typeof forceState === 'boolean' ? forceState : !this.notebookOpen;
    this.els.notebookModal.classList.toggle('hidden', !this.notebookOpen);
    if (this.notebookOpen && this._notebookContext) this.renderNotebook(this._notebookContext);
  }

  renderNotebook(ctx) {
    const { gameState, npcSystem, player, audio } = ctx;
    const body = this.els.notebookBody;
    body.innerHTML = '';

    if (this.currentTab === 'tasks') {
      for (const t of Object.values(gameState.tasks)) {
        const div = document.createElement('div');
        div.className = `nb-item${t.status === 'done' ? ' done' : ''}`;
        const badgeText = t.status === 'done' ? '已完成' : t.status === 'active' ? '进行中' : '等待发现';
        div.innerHTML = `
          <div>
            <div class="nb-item-title">${t.title}</div>
            <div class="nb-item-desc">${t.status === 'done' ? t.doneText : t.status === 'active' ? t.hint : '在小镇散步、和邻里聊天或看看公告板，或许会自然遇见这段小故事。'}</div>
          </div>
          <span class="nb-badge${t.status === 'done' ? ' done' : ''}">${badgeText}</span>
        `;
        body.appendChild(div);
      }
    } else if (this.currentTab === 'bag') {
      const entries = Object.entries(gameState.inventory);
      if (entries.length === 0) {
        body.innerHTML = '<div class="empty-note">行囊还是空的，去逛逛面包店、杂货铺或河畔木栈道吧。</div>';
        return;
      }
      for (const [id, count] of entries) {
        const item = ITEMS[id];
        if (!item) continue;
        const div = document.createElement('div');
        div.className = 'nb-item';
        div.innerHTML = `<div><div class="nb-item-title">${item.name} × ${count}</div><div class="nb-item-desc">${item.desc}</div></div>`;
        if (item.edible) {
          const btn = document.createElement('button');
          btn.className = 'btn-small';
          btn.textContent = '享用';
          btn.addEventListener('click', () => {
            gameState.removeItem(id, 1);
            audio.playSuccessChime();
            if (item.boost) player.grantSpeedBoost(40);
            this.showToast(`✨ 享用了「${item.name}」，心情暖洋洋的！`);
            this.renderNotebook(ctx);
          });
          div.appendChild(btn);
        }
        body.appendChild(div);
      }
    } else if (this.currentTab === 'residents') {
      for (const npc of npcSystem.npcs) {
        const div = document.createElement('div');
        div.className = 'nb-item';
        div.innerHTML = `
          <div>
            <div class="nb-item-title">${npc.name} · <span style="font-weight:500;color:#766762">${npc.role}</span></div>
            <div class="nb-item-desc"><b>此刻：</b>${npc.waitingAtCrossing ? '正在铁道口等待电车通过' : npc.activityLabel}<br/><b>日常作息：</b>${npc.scheduleSummary}</div>
          </div>
          <span class="nb-badge" style="background:${npc.mapColor}22;color:${npc.mapColor}">居民</span>
        `;
        body.appendChild(div);
      }
    } else if (this.currentTab === 'album') {
      if (gameState.photos.length === 0) {
        body.innerHTML = '<div class="empty-note">胶片相册还没有照片。<br/>随时按下 <kbd>C</kbd> 键举起相机，记录樱花、电车与河谷黄昏吧！</div>';
        return;
      }
      const grid = document.createElement('div');
      grid.className = 'album-grid';
      for (const p of gameState.photos) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `<img src="${p.dataUrl}" alt="${p.caption}" /><div class="photo-caption">${p.caption}</div><div class="photo-meta">${p.timeLabel}</div>`;
        grid.appendChild(card);
      }
      body.appendChild(grid);
    }
  }

  async playSleepFade(message, onMidpoint) {
    this.els.fadeMessage.textContent = message;
    this.els.fadeCurtain.classList.remove('hidden');
    await new Promise((r) => requestAnimationFrame(r));
    this.els.fadeCurtain.classList.add('visible');
    await new Promise((r) => setTimeout(r, 750));
    if (onMidpoint) onMidpoint();
    await new Promise((r) => setTimeout(r, 650));
    this.els.fadeCurtain.classList.remove('visible');
    await new Promise((r) => setTimeout(r, 620));
    this.els.fadeCurtain.classList.add('hidden');
  }

  updateHud(timeSystem, gameState, playerPos, playerYaw, currentBuilding, railwayStatus, npcs) {
    const period = timeSystem.getPeriodInfo();
    this.els.weatherIcon.textContent = period.icon;
    this.els.day.textContent = `第 ${timeSystem.day} 天`;
    this.els.period.textContent = period.label;
    this.els.clock.textContent = timeSystem.getFormattedTime();
    this.els.yen.textContent = String(gameState.yen);

    let loc = '樱花小镇 · 商店街';
    if (currentBuilding) loc = currentBuilding.name;
    else if (playerPos.x > 36) loc = '樱森神社 · 千年枝垂樱';
    else if (playerPos.x > 21 && playerPos.z > 10) loc = '樱川河畔 · 垂钓木栈道';
    else if (playerPos.x > 21 && playerPos.z >= -1 && playerPos.z <= 5) loc = '樱川红桥';
    else if (playerPos.z < -25) loc = '北侧铁道田野';
    else if (playerPos.x < -9 && playerPos.z < -19) loc = '樱花电铁 · 樱花站月台';
    else if (Math.abs(playerPos.z + 18) < 4.5) loc = '樱花电铁 · 踏切道口';
    this.els.location.textContent = loc;

    if (railwayStatus.state !== 'IDLE') {
      this.els.trainBanner.classList.remove('hidden');
      this.els.trainText.textContent = railwayStatus.state === 'BOARDING'
        ? '樱花电车正停靠樱花站'
        : railwayStatus.gatesClosed
          ? '叮当叮当！电车正在通过道口'
          : '樱花电车正在山谷间行驶';
    } else {
      this.els.trainBanner.classList.add('hidden');
    }

    const activeTasks = gameState.getActiveTasks();
    if (activeTasks.length > 0) {
      this.els.activeTaskHint.classList.remove('hidden');
      this.els.taskHintBody.textContent = `• ${activeTasks[0].title}：${activeTasks[0].hint}`;
    } else {
      this.els.activeTaskHint.classList.add('hidden');
    }

    this._drawMiniMap(playerPos, playerYaw, railwayStatus, npcs);
  }

  _drawMiniMap(playerPos, playerYaw, railwayStatus, npcs) {
    const ctx = this.mmCtx;
    const w = 148;
    const h = 148;
    ctx.clearRect(0, 0, w, h);

    const toMX = (wx) => ((wx + 42) / 102) * w;
    const toMZ = (wz) => ((wz + 42) / 76) * h;

    ctx.fillStyle = '#cfe5bd';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#6ec2e2';
    ctx.lineWidth = 12;
    ctx.beginPath();
    for (let z = -42; z <= 34; z += 4) {
      const rx = CollisionSystem.getRiverCenterX(z);
      if (z === -42) ctx.moveTo(toMX(rx), toMZ(z));
      else ctx.lineTo(toMX(rx), toMZ(z));
    }
    ctx.stroke();

    ctx.strokeStyle = '#9aa0a8';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(toMX(-30), toMZ(2.1)); ctx.lineTo(toMX(22), toMZ(2.1));
    ctx.moveTo(toMX(0), toMZ(-35)); ctx.lineTo(toMX(0), toMZ(14));
    ctx.stroke();

    ctx.strokeStyle = '#d64c42';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(toMX(21), toMZ(2.1)); ctx.lineTo(toMX(37), toMZ(2.1));
    ctx.stroke();

    ctx.strokeStyle = '#4e4c49';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(0, toMZ(-18)); ctx.lineTo(w, toMZ(-18));
    ctx.stroke();
    ctx.setLineDash([]);

    const buildings = [
      { x: -11.5, z: 9.2, bw: 8.4, bd: 6.8, col: '#e88da3' },
      { x: 10.2, z: 9.2, bw: 8.0, bd: 6.6, col: '#5c8c72' },
      { x: -13.0, z: -6.8, bw: 7.4, bd: 6.2, col: '#6984a8' },
      { x: 46.5, z: -9.6, bw: 7.0, bd: 5.0, col: '#d85448' },
      { x: -18.5, z: -22.2, bw: 15, bd: 4.2, col: '#7c8b84' },
    ];
    for (const b of buildings) {
      ctx.fillStyle = b.col;
      ctx.fillRect(toMX(b.x - b.bw / 2), toMZ(b.z - b.bd / 2), (b.bw / 102) * w, (b.bd / 76) * h);
    }

    if (railwayStatus.isVisibleInTown) {
      ctx.fillStyle = '#2f9468';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      const tx = toMX(railwayStatus.trainX);
      const tz = toMZ(-18);
      ctx.fillRect(tx - 10, tz - 3, 20, 6);
      ctx.strokeRect(tx - 10, tz - 3, 20, 6);
    }

    for (const npc of npcs) {
      ctx.fillStyle = npc.mapColor;
      ctx.beginPath();
      ctx.arc(toMX(npc.position.x), toMZ(npc.position.z), 3.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const px = toMX(playerPos.x);
    const pz = toMZ(playerPos.z);
    ctx.save();
    ctx.translate(px, pz);
    ctx.rotate(-playerYaw + Math.PI);
    ctx.fillStyle = '#2d2424';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(0, -6); ctx.lineTo(4.5, 4.5); ctx.lineTo(0, 2); ctx.lineTo(-4.5, 4.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
