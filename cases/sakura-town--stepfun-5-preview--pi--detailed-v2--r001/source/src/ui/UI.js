// UI：HUD / 对话 / 任务日志 / 小地图 / 标题 / 暂停菜单
import { LOCATIONS, ROADS } from '../world/Layout.js';
import { riverX } from '../world/Terrain.js';
import { QUEST_DEFS } from '../data/quests.js';
import { clamp } from '../core/Utils.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor(game) {
    this.game = game;
    this.el = {
      loading: $('loading'), loadingBar: $('loading-bar-fill'), loadingText: $('loading-text'),
      title: $('title'), btnNew: $('btn-new'), btnContinue: $('btn-continue'), btnHelp: $('btn-help'),
      help: $('help'), btnHelpClose: $('btn-help-close'),
      hud: $('hud'), clockTime: $('clock-time'), clockInfo: $('clock-info'),
      tracker: $('quest-tracker'), toasts: $('toasts'),
      minimapBox: $('minimap-box'), minimap: $('minimap'), minimapLabel: $('minimap-label'),
      coins: $('coins'), items: $('items'),
      prompt: $('prompt'), promptText: $('prompt-text'),
      banner: $('location-banner'),
      dialogue: $('dialogue'), dlgName: $('dialogue-name'), dlgText: $('dialogue-text'),
      dlgChoices: $('dialogue-choices'), dlgNext: $('dialogue-next'),
      questlog: $('questlog'), qlActive: $('questlog-active'), qlDone: $('questlog-done'),
      pause: $('pause'), volMaster: $('vol-master'), volTime: $('vol-time'),
      btnSave: $('btn-save'), btnLoad: $('btn-load'), btnResume: $('btn-resume'), btnQuit: $('btn-quit'),
    };
    this.mm = this.el.minimap.getContext('2d');
    this.dlg = null;          // 对话状态
    this.panelState = null;   // 选择面板状态
    this.questLogOpen = false;
    this.pauseOpen = false;
    this.mapBig = false;
    this.toastList = [];
    this.bannerT = 0;
    this.lastBanner = '';
    this._bindButtons();
    this.refreshTracker();
    this.refreshItems();
  }

  /* ================= 标题 / 加载 ================= */
  showTitle() {
    this.el.title.classList.remove('hidden');
    this.el.hud.classList.add('hidden');
    this.el.btnContinue.disabled = !localStorage.getItem('sakura_town_save_v1');
    this.el.btnContinue.style.opacity = this.el.btnContinue.disabled ? 0.45 : 1;
  }
  hideTitle() {
    this.el.title.classList.add('hidden');
    this.el.hud.classList.remove('hidden');
  }
  setLoading(p, text) {
    this.el.loadingBar.style.width = `${Math.round(p * 100)}%`;
    if (text) this.el.loadingText.textContent = text;
  }
  hideLoading() { this.el.loading.classList.add('hidden'); }

  _bindButtons() {
    const g = this.game;
    this.el.btnNew.onclick = () => { g.audio.init(); g.audio.blip(); g.newGame(); };
    this.el.btnContinue.onclick = () => { g.audio.init(); g.audio.blip(); g.loadGame(); };
    this.el.btnHelp.onclick = () => { this.el.help.classList.remove('hidden'); };
    this.el.btnHelpClose.onclick = () => { this.el.help.classList.add('hidden'); };
    this.el.btnResume.onclick = () => this.togglePause(false);
    this.el.btnQuit.onclick = () => { this.togglePause(false); g.toTitle(); };
    this.el.btnSave.onclick = () => { g.saveGame(); this.toast('已保存'); };
    this.el.btnLoad.onclick = () => { g.loadGame(); this.togglePause(false); this.toast('已读取'); };
    this.el.volMaster.oninput = () => g.audio.setMasterVolume(this.el.volMaster.value / 100);
    this.el.volTime.oninput = () => { g.time.timeScale = this.el.volTime.value / 10; };
    this.el.minimapBox.onclick = () => {
      this.mapBig = !this.mapBig;
      this.el.minimapBox.classList.toggle('big', this.mapBig);
    };
  }

  /* ================= HUD ================= */
  toast(text, gold = false) {
    const div = document.createElement('div');
    div.className = 'toast' + (gold ? ' gold' : '');
    div.textContent = text;
    this.el.toasts.appendChild(div);
    this.toastList.push({ div, t: 4.2 });
    while (this.toastList.length > 4) {
      const old = this.toastList.shift();
      old.div.remove();
    }
  }

  setPrompt(text) {
    if (!text) { this.el.prompt.classList.add('hidden'); return; }
    this.el.prompt.classList.remove('hidden');
    this.el.promptText.textContent = text;
  }

  banner(text) {
    if (text === this.lastBanner) return;
    this.lastBanner = text;
    this.el.banner.textContent = text;
    this.el.banner.classList.remove('hidden');
    this.el.banner.style.animation = 'none';
    void this.el.banner.offsetWidth;
    this.el.banner.style.animation = '';
    this.bannerT = 3.0;
  }

  refreshItems() {
    const box = this.el.items;
    box.innerHTML = '';
    for (const it of this.game.items) {
      const chip = document.createElement('div');
      chip.className = 'item-chip';
      chip.textContent = it.name;
      box.appendChild(chip);
    }
    this.el.coins.textContent = `￥${this.game.coins}`;
  }

  refreshTracker() {
    const box = this.el.tracker;
    box.innerHTML = '';
    for (const q of this.game.quests.active) {
      const div = document.createElement('div');
      div.className = 'quest-card';
      const stage = q.def.stages[q.stage];
      div.innerHTML = `<div class="q-title">${q.def.title}</div><div class="q-step">${stage ? stage.text : '…'}</div>`;
      box.appendChild(div);
    }
  }

  refreshQuestLog() {
    const act = this.el.qlActive;
    act.innerHTML = '';
    if (!this.game.quests.active.length) {
      act.innerHTML = '<div class="questlog-entry"><div class="qe-desc">现在没有进行中的委托。去公告板看看吧。</div></div>';
    }
    for (const q of this.game.quests.active) {
      const stage = q.def.stages[q.stage];
      const div = document.createElement('div');
      div.className = 'questlog-entry';
      div.innerHTML = `<div class="qe-title">${q.def.title}</div><div class="qe-desc">${q.def.desc}</div>
        <div class="qe-step">▸ ${stage ? stage.text : '…'}</div>`;
      act.appendChild(div);
    }
    const done = this.el.qlDone;
    done.innerHTML = '';
    if (!this.game.quests.completed.length) done.innerHTML = '<div class="qe-desc">还没有完成的委托。</div>';
    for (const id of this.game.quests.completed) {
      const def = QUEST_DEFS.find((d) => d.id === id);
      if (!def) continue;
      const div = document.createElement('div');
      div.className = 'questlog-entry done';
      div.innerHTML = `<div class="qe-title">${def.title}</div><div class="qe-desc">${def.doneText || ''}</div>`;
      done.appendChild(div);
    }
  }

  refreshMinimapMarkers() { /* 小地图每帧实时绘制，无需缓存 */ }

  /* ================= 对话 ================= */
  /** 显示一段对话；返回 Promise（全部结束后 resolve） */
  say(name, lines) {
    return new Promise((resolve) => {
      this.dlg = { name, lines: [...lines], idx: 0, chars: 0, resolve, speed: 26 };
      this.el.dialogue.classList.remove('hidden');
      this.el.dlgName.textContent = name;
      this.el.dlgText.textContent = '';
      this.el.dlgChoices.innerHTML = '';
      this.el.dlgNext.classList.remove('hidden');
      this._showLine();
    });
  }

  _showLine() {
    const d = this.dlg;
    if (!d) return;
    if (d.idx >= d.lines.length) {
      this._endDialogue();
      return;
    }
    d.full = d.lines[d.idx];
    d.chars = 0;
    this.el.dlgText.textContent = '';
  }

  _endDialogue() {
    const d = this.dlg;
    this.dlg = null;
    this.el.dialogue.classList.add('hidden');
    if (d && d.resolve) d.resolve();
  }

  /** 选择分支 */
  choice(title, options) {
    return new Promise((resolve) => {
      this.dlg = { name: title, lines: [], idx: 0, chars: 0, resolve: null, choiceResolve: resolve, options };
      this.el.dialogue.classList.remove('hidden');
      this.el.dlgName.textContent = title;
      this.el.dlgText.textContent = '';
      this.el.dlgNext.classList.add('hidden');
      const box = this.el.dlgChoices;
      box.innerHTML = '';
      options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span class="choice-key">${i + 1}</span>${opt.text}`;
        btn.onclick = () => this._pickOption(i);
        box.appendChild(btn);
      });
    });
  }

  _pickOption(i) {
    const d = this.dlg;
    if (!d || !d.options) return;
    const opt = d.options[i];
    this.dlg = null;
    this.el.dialogue.classList.add('hidden');
    this.el.dlgChoices.innerHTML = '';
    if (d.choiceResolve) d.choiceResolve(opt ? opt.value : null);
  }

  /** 确认对话框（是/否） */
  confirm(title, desc = '') {
    return new Promise((resolve) => {
      this.choice(title, [
        { text: desc ? `${desc} —— 是` : '是', value: true },
        { text: '否', value: false },
      ]).then(resolve);
    });
  }

  /** 通用列表面板（公告板等） */
  panel(title, entries) {
    return new Promise((resolve) => {
      this.panelState = { title, entries, resolve };
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.id = 'ui-panel';
      overlay.innerHTML = `<div class="panel" style="width:640px"><h2>${title}</h2><div id="ui-panel-list"></div></div>`;
      document.body.appendChild(overlay);
      const list = overlay.querySelector('#ui-panel-list');
      entries.forEach((e) => {
        const div = document.createElement('div');
        div.className = 'questlog-entry';
        div.style.cursor = 'pointer';
        div.innerHTML = `<div class="qe-title">${e.text}</div>${e.desc ? `<div class="qe-desc">${e.desc}</div>` : ''}`;
        div.onclick = () => {
          overlay.remove();
          this.panelState = null;
          resolve(e.value);
        };
        list.appendChild(div);
      });
      this._panelOverlay = overlay;
    });
  }

  get dialogueActive() { return !!this.dlg; }
  get blocking() { return !!this.dlg || !!this.panelState || this.questLogOpen || this.pauseOpen; }

  /** 每帧更新（打字机 / toast / 时钟 / 小地图） */
  update(dt) {
    // 对话打字
    if (this.dlg && this.dlg.full !== undefined) {
      const d = this.dlg;
      d.chars += d.speed * dt;
      const n = Math.min(d.full.length, Math.floor(d.chars));
      if (this.el.dlgText.textContent.length !== n) {
        this.el.dlgText.textContent = d.full.slice(0, n);
      }
      if (n >= d.full.length) {
        this.el.dlgNext.classList.remove('hidden');
        d.full = undefined;
      }
    }
    // toast 消失
    for (let i = this.toastList.length - 1; i >= 0; i--) {
      const t = this.toastList[i];
      t.t -= dt;
      t.div.style.opacity = clamp(t.t / 1.2, 0, 1);
      if (t.t <= 0) { t.div.remove(); this.toastList.splice(i, 1); }
    }
    // 地名横幅
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      if (this.bannerT <= 0) this.el.banner.classList.add('hidden');
    }
    // 时钟
    const tm = this.game.time;
    this.el.clockTime.textContent = tm.timeString();
    const w = this.game.weather.raining ? '雨' : '晴';
    this.el.clockInfo.textContent = `第 ${tm.day} 天 · ${w} · ${tm.phase}`;
    this.el.coins.textContent = `￥${this.game.coins}`;

    // 小地图
    this.drawMinimap();
  }

  drawMinimap() {
    const g = this.game;
    const cv = this.el.minimap;
    const size = this.mapBig ? 380 : 200;
    if (cv.width !== size) { cv.width = size; cv.height = size; }
    const ctx = this.mm;
    const S = size / 300;
    const cx = size / 2, cy = size / 2;
    const toX = (x) => cx + x * S;
    const toY = (z) => cy + (z - 20) * S;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#33503a';
    ctx.fillRect(0, 0, size, size);

    // 河
    ctx.strokeStyle = '#4d7fa6';
    ctx.lineWidth = 5 * S * 1.2;
    ctx.beginPath();
    for (let z = -80; z <= 115; z += 4) {
      const x = riverX(z);
      if (z === -80) ctx.moveTo(toX(x), toY(z));
      else ctx.lineTo(toX(x), toY(z));
    }
    ctx.stroke();

    // 道路
    ctx.strokeStyle = '#8d867a';
    for (const r of ROADS) {
      ctx.lineWidth = Math.max(1.5, r.w * S * 0.9);
      ctx.beginPath();
      r.pts.forEach(([x, z], i) => (i ? ctx.lineTo(toX(x), toY(z)) : ctx.moveTo(toX(x), toY(z))));
      ctx.stroke();
    }

    // 铁路
    ctx.strokeStyle = '#5a5348';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(toX(-124), toY(-42)); ctx.lineTo(toX(124), toY(-42));
    ctx.stroke();

    // 建筑
    ctx.fillStyle = '#a08d74';
    for (const key of Object.keys(LOCATIONS)) {
      const l = LOCATIONS[key];
      if (!l.bldg) continue;
      ctx.fillRect(toX(l.bldg[0]), toY(l.bldg[1]), l.bldg[2] * S, l.bldg[3] * S);
    }

    // 任务标记
    for (const m of g.quests.markers) {
      const x = toX(m.mesh.position.x), y = toY(m.mesh.position.z);
      ctx.fillStyle = '#ff9ec0';
      ctx.beginPath();
      ctx.moveTo(x, y - 5); ctx.lineTo(x + 4, y); ctx.lineTo(x, y + 5); ctx.lineTo(x - 4, y);
      ctx.closePath(); ctx.fill();
    }

    // NPC（核心居民）
    ctx.fillStyle = '#ffe9a8';
    for (const npc of g.npcs.npcs) {
      if (!npc.visible || npc.def.background) continue;
      ctx.beginPath();
      ctx.arc(toX(npc.pos.x), toY(npc.pos.z), 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
    // 猫
    ctx.fillStyle = '#f2a75c';
    ctx.beginPath();
    ctx.arc(toX(g.npcs.cat.pos.x), toY(g.npcs.cat.pos.z), 2, 0, Math.PI * 2);
    ctx.fill();

    // 玩家
    const px = toX(g.player.pos.x), py = toY(g.player.pos.z);
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-g.player.yaw + Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -6); ctx.lineTo(4.4, 5); ctx.lineTo(0, 2.6); ctx.lineTo(-4.4, 5);
    ctx.closePath(); ctx.fill();
    ctx.restore();

    // 指北
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.font = `${Math.round(11)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('N', size - 14, 16);
  }

  /* ================= 面板开关 ================= */
  toggleQuestLog(force) {
    this.questLogOpen = force !== undefined ? force : !this.questLogOpen;
    this.el.questlog.classList.toggle('hidden', !this.questLogOpen);
    if (this.questLogOpen) this.refreshQuestLog();
  }

  togglePause(force) {
    this.pauseOpen = force !== undefined ? force : !this.pauseOpen;
    this.el.pause.classList.toggle('hidden', !this.pauseOpen);
    this.game.time.paused = this.pauseOpen;
    if (this.pauseOpen) {
      this.el.volMaster.value = Math.round(this.game.audio.masterVol * 100);
      this.el.volTime.value = Math.round(this.game.time.timeScale * 10);
    }
  }

  /** 键盘（对话/面板中） */
  handleKeys(input) {
    if (this.dlg) {
      if (this.dlg.options) {
        for (let i = 1; i <= this.dlg.options.length; i++) {
          if (input.justPressed(`Digit${i}`)) { this._pickOption(i - 1); return true; }
        }
        return true;
      }
      if (input.justPressed('KeyE') || input.justPressed('Space') || input.justPressed('Enter')) {
        if (this.dlg.full !== undefined) {
          // 正在打字 → 直接显示完整行
          this.dlg.chars = this.dlg.full.length;
          this.el.dlgText.textContent = this.dlg.full;
          this.dlg.full = undefined;
          this.el.dlgNext.classList.remove('hidden');
        } else {
          this.dlg.idx++;
          this._showLine();
        }
        this.game.audio.blip();
        input.consume('KeyE');
        input.consume('Space');
        input.consume('Enter');
        return true;
      }
      return true;
    }
    if (this.panelState) return true;
    return false;
  }
}
