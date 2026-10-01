// ================================================================
//  HUD / 对话 / 面板 / 地图
// ================================================================
import { QUESTS } from '../systems/quest.js';
import { ITEMS } from '../systems/inventory.js';
import { NPCS } from '../data/npcData.js';
import { LANDMARKS, ROADS, STREAM, TRACK, AREAS, ANCHORS, BUILDINGS, STATION, CROSSING } from '../world/layout.js';
import { SCHEDULE } from '../world/railway.js';
import { phaseOf } from '../systems/time.js';
import { formatClock, clamp, clamp01, lerp, TAU, dist } from '../util/math.js';
import { hex } from '../render/palette.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor(ctx) {
    this.ctx = ctx;
    this.el = {
      hud: $('hud'), day: $('hud-day'), time: $('hud-time'), weather: $('hud-weather'),
      area: $('hud-area'), tracker: $('tracker-list'), trackerCount: $('tracker-count'),
      prompt: $('hint-prompt'), promptText: $('prompt-text'), promptKey: $('prompt-key'),
      toasts: $('toast-stack'), dialogue: $('dialogue'), dlgName: $('dlg-name'),
      dlgText: $('dlg-text'), dlgRel: $('dlg-rel'), dlgNext: $('dlg-next'),
      dlgFace: $('dlg-face'), choice: $('choice-box'), panel: $('panel'),
      journal: $('journal-content'), people: $('people-content'), settings: $('settings-content'),
      map: $('map-canvas'),
    };
    this.dialogQueue = [];
    this.dialogActive = false;
    this.panelOpen = false;
    this.activeTab = 'journal';
    this._toastTimers = [];
    this._lastArea = null;
    this.bind();
  }

  bind() {
    document.querySelectorAll('.panel-tabs button').forEach((b) => {
      b.addEventListener('click', () => {
        const t = b.dataset.tab;
        if (t === 'close') return this.closePanel();
        this.setTab(t);
        this.ctx.audio?.page();
      });
    });
    this.el.dialogue.addEventListener('click', () => this.nextLine());
    this.buildSettings();
  }

  /* ---------------- HUD ---------------- */
  updateHUD(time, weather, player) {
    this.el.time.textContent = formatClock(time.hour);
    this.el.day.textContent = `春 · 第${time.day}日`;
    this.el.weather.textContent = weather?.label || '晴';
    let area = null, best = 1e9;
    for (const a of AREAS) {
      const d = dist(player.pos.x, player.pos.z, a.x, a.z);
      if (d < a.r && d < best) { best = d; area = a; }
    }
    const name = this.ctx.zones?.isIndoor ? (this.ctx.zones.currentZoneName || '室内') : (area?.name || '小镇');
    if (name !== this._lastArea) { this.el.area.textContent = name; this._lastArea = name; }
  }

  /** 每帧：让目标箭头指向目标，并显示距离 */
  updateObjectiveArrow(marker, playerPos, playerYaw) {
    if (!this._arw) return;
    if (!marker) { this._arw.style.opacity = '0.25'; if (this._dist) this._dist.textContent = ''; return; }
    const dx = marker.x - playerPos.x, dz = marker.z - playerPos.z;
    const d = Math.hypot(dx, dz);
    this._arw.style.opacity = '1';
    // 屏幕平面内的方向角（相机 yaw=0 时朝 +z）
    const ang = Math.atan2(dx, dz) - playerYaw;
    this._arw.style.display = 'inline-block';
    this._arw.style.transform = `rotate(${(-ang * 180 / Math.PI).toFixed(1)}deg)`;
    if (this._dist) this._dist.textContent = d > 4 ? ` ${Math.round(d)}m · ` : '';
  }

  /** 当前所在区域名（室外按 AREAS 找最近的，室内用房间名） */
  currentAreaName() {
    if (this.ctx.zones?.isIndoor) return this.ctx.zones.currentZoneName || '室内';
    const p = this.ctx.game.player.pos;
    let area = null, best = 1e9;
    for (const a of AREAS) {
      const d = Math.hypot(p.x - a.x, p.z - a.z);
      if (d < a.r && d < best) { best = d; area = a; }
    }
    return area?.name || '小镇';
  }

  setPrompt(text, key = 'E') {
    if (!text) { this.el.prompt.classList.add('hidden'); return; }
    this.el.prompt.classList.remove('hidden');
    this.el.promptText.textContent = text;
    this.el.promptKey.textContent = key.toUpperCase();
  }

  toast(text, tag = '便笺', cls = '') {
    const d = document.createElement('div');
    d.className = 'toast ' + cls;
    d.innerHTML = `<div class="t-head">${tag}</div><div>${text}</div>`;
    this.el.toasts.appendChild(d);
    setTimeout(() => { d.classList.add('out'); setTimeout(() => d.remove(), 420); }, 4200);
    while (this.el.toasts.children.length > 5) this.el.toasts.firstChild.remove();
  }

  discover(lm) {
    this.toast(`${lm.desc}`, `发现 · ${lm.name}`, 'good');
  }

  questComplete(q) {
    const r = q.reward || {};
    let s = `「${q.title}」完成了`;
    if (r.money) s += ` · 报酬 ${r.money}円`;
    this.toast(s, '完成', 'good');
    this.ctx.audio?.success();
    if (q.reward?.ending) setTimeout(() => this.endingScene(), 1200);
  }

  endingScene() {
    this.saySequence([
      { name: '小镇', text: '傍晚的神社前挂起了纸灯串。商店街的招牌一盏盏亮起来，道口的铃铛安静地等着下一班车。' },
      { name: '小镇', text: '你在这里帮每个人跑了一点小事，于是认识了他们，也被他们记住了。' },
      { name: '', text: '—— 樱花小镇 · 第一章 完 ——' },
    ], () => this.toast('还想继续待着的话，小镇随时都在。', '日常', 'good'));
  }

  /* ---------------- 追踪 ---------------- */
  refreshTracker() {
    const q = this.ctx.quests;
    const el = this.el.tracker;
    el.innerHTML = '';
    const items = [];
    const cq = q.currentQuest;
    if (cq) {
      items.push({ title: cq.title, obj: q.currentObjectiveText, side: false });
    }
    for (const lm of LANDMARKS) {
      if (lm.discover === false || q.discovered.has(lm.id)) continue;
      items.push({ title: '未发现的地方', obj: `在镇上找找看（${q.discoveredCount}/${q.totalLandmarks}）`, side: true });
      break;
    }
    if (q.endingSeen) items.push({ title: '小镇祭 已举办', obj: '章节完成', side: true });
    if (!items.length) items.push({ title: '今天很闲', obj: '去车站的告示板看看', side: true });
    for (const it of items) {
      const d = document.createElement('div');
      d.className = 'trk';
      if (!it.side) d.id = 'trk-active';
      d.innerHTML = `<div class="trk-dot ${it.side ? 'side' : ''}"></div>
        <div class="trk-body"><div class="trk-title">${it.title}</div><div class="trk-obj"><span class="arw" id="obj-arw">➤</span><span id="obj-dist"></span>${it.obj}</div></div>`;
      el.appendChild(d);
    }
    this._arw = this.el.tracker.querySelector('#obj-arw');
    this._dist = this.el.tracker.querySelector('#obj-dist');
    this.el.trackerCount.textContent = q.done.size;
  }

  /* ---------------- 对话 ---------------- */
  saySequence(lines, onDone) {
    this.dialogQueue = [...lines];
    this.dialogOnDone = onDone;
    this.nextLine();
  }

  say(name, text, npcId) {
    this.dialogQueue = [{ name, text, npcId }];
    this.dialogOnDone = null;
    this.nextLine();
  }

  nextLine() {
    if (this.dialogActive) {
      // 打字机未完成则立即完成
      if (this._typing) { this._typing = false; this.el.dlgText.textContent = this._fullText; return; }
      this.dialogActive = false;
      this.el.dialogue.classList.add('hidden');
      this.ctx.game.time.paused = false;   // 对话结束必须把时钟还回来
      const cb = this.dialogOnDone;
      this.dialogOnDone = null;
      if (cb) cb();
      return;
    }
    const line = this.dialogQueue.shift();
    if (!line) return;
    this.dialogActive = true;
    this.el.dialogue.classList.remove('hidden');
    const npc = line.npcId ? this.ctx.npcs.byId[line.npcId] : null;
    this.el.dlgName.textContent = line.name || (npc ? npc.name : '');
    this.el.dlgRel.textContent = '';
    if (npc) {
      const lv = npc.affinity;
      this.el.dlgRel.textContent = npc.met ? (lv >= 4 ? '亲近' : lv >= 2 ? '熟识' : lv >= 1 ? '认识' : '点头之交') : '';
      drawFace(this.el.dlgFace, npc.def.look);
    } else {
      const ctx2 = this.el.dlgFace.getContext('2d');
      ctx2.clearRect(0, 0, 160, 160);
    }
    this.el.dlgNext.style.display = line.name === '' ? 'none' : 'block';
    this.typeText(line.text);
    this.ctx.game.time.paused = true;
  }

  typeText(text) {
    this._fullText = text;
    this._typing = true;
    let i = 0;
    const el = this.el.dlgText;
    el.textContent = '';
    clearInterval(this._typer);
    this._typer = setInterval(() => {
      i += 2;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { this._typing = false; clearInterval(this._typer); }
    }, 16);
  }

  talkTo(npcId) {
    const npc = this.ctx.npcs.byId[npcId];
    if (!npc) return;
    const first = !npc.met;
    npc.met = true;
    npc.facePlayer(this.ctx.game.player.pos.x, this.ctx.game.player.pos.z);
    npc.char.say(2.2);
    const lines = [];
    if (first) {
      lines.push({ npcId, name: npc.name, text: this.ctx.questDialogue.intro(npc) });
    } else {
      lines.push(...this.ctx.questDialogue.talk(npc));
    }
    // 委托推进
    const q = this.ctx.quests;
    const s = q.currentStep;
    if (s && s.type === 'give' && s.to === npcId && this.ctx.inventory.has(s.item)) {
      lines.push({ npcId, name: npc.name, text: this.ctx.questDialogue.receive(npc, s.item) });
      setTimeout(() => q.onTalk(npcId), 400);
    } else if (s && s.type === 'talk' && s.to === npcId) {
      setTimeout(() => q.onTalk(npcId), 400);
    }
    this.saySequence(lines);
  }

  /* ---------------- 面板 ---------------- */
  setTab(t) {
    this.activeTab = t;
    document.querySelectorAll('.panel-tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === t));
    document.querySelectorAll('.tab-page').forEach((p) => p.classList.toggle('active', p.dataset.page === t));
    this.renderTab();
  }
  openPanel(tab = 'journal') {
    this.panelOpen = true;
    this.el.panel.classList.remove('hidden');
    this.ctx.game.input.block(true);
    this.ctx.game.time.paused = true;
    this.setTab(tab);
    this.ctx.audio?.page();
  }
  closePanel() {
    this.panelOpen = false;
    this.el.panel.classList.add('hidden');
    this.ctx.game.input.block(false);
    this.ctx.game.time.paused = false;
  }
  togglePanel(tab) { this.panelOpen ? this.closePanel() : this.openPanel(tab || this.activeTab); }

  renderTab() {
    if (this.activeTab === 'journal') this.renderJournal();
    if (this.activeTab === 'people') this.renderPeople();
    if (this.activeTab === 'map') this.renderMap();
    if (this.activeTab === 'settings') this.buildSettings();
  }

  renderJournal() {
    const q = this.ctx.quests;
    const el = this.el.journal;
    el.innerHTML = '';
    const sec = (title) => {
      const s = document.createElement('div');
      s.className = 'jr-sec';
      s.innerHTML = `<h3>${title}</h3>`;
      el.appendChild(s);
      return s;
    };
    // 进行中
    const cur = q.currentQuest;
    if (cur) {
      const s = sec('进行中');
      const c = document.createElement('div');
      c.className = 'jr-card';
      c.innerHTML = `<div class="jr-t">${cur.title}</div>
        <div class="jr-d">${cur.brief}</div>
        <div class="jr-meta"><span>▸ ${q.currentObjectiveText || ''}</span></div>`;
      s.appendChild(c);
    }
    // 委托列表
    const s2 = sec('便笺一览');
    for (const qq of QUESTS) {
      const done = q.done.has(qq.id);
      const active = q.active === qq.id;
      const avail = q.available().includes(qq);
      if (!done && !active && !avail) continue;
      const c = document.createElement('div');
      c.className = 'jr-card' + (done ? ' done' : '');
      c.innerHTML = `<div class="jr-t">${qq.title}<span class="jr-tag">第${qq.chapter}章</span></div>
        <div class="jr-d">${qq.brief}</div>
        <div class="jr-meta"><span>${done ? '已完成' : active ? '进行中' : '可在告示板接取'}</span>
        ${qq.reward?.money ? `<span>报酬 ${qq.reward.money}円</span>` : ''}</div>`;
      s2.appendChild(c);
    }
    if (!s2.children.length) s2.innerHTML += '<div class="jr-empty">还没有接到委托。去车站的告示板看看吧。</div>';

    // 地标
    const s3 = sec(`发现的地方  ${q.discoveredCount}/${q.totalLandmarks}`);
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    for (const lm of LANDMARKS) {
      const found = q.discovered.has(lm.id);
      const chip = document.createElement('div');
      chip.style.cssText = `padding:6px 12px;border-radius:999px;font-size:12px;border:1px solid ${found ? '#e2738f' : '#ddd'};background:${found ? '#fde4ea' : '#f6f2ea'};color:${found ? '#a04a63' : '#aaa'}`;
      chip.textContent = found ? lm.name : '？？？';
      grid.appendChild(chip);
    }
    s3.appendChild(grid);

    // 手记
    const s4 = sec('手记');
    const log = document.createElement('div');
    log.className = 'jr-empty';
    log.innerHTML = (q.log.length ? q.log.slice(-14).reverse().map((l) => `第${l.day}日 · ${l.text}`).join('<br>') : '还没有值得记下的事。');
    s4.appendChild(log);
  }

  renderPeople() {
    const el = this.el.people;
    el.innerHTML = '';
    for (const def of NPCS) {
      const n = this.ctx.npcs.byId[def.id];
      if (!n) continue;
      const d = document.createElement('div');
      d.className = 'pp';
      d.innerHTML = `<div class="pp-av"><canvas width="120" height="120"></canvas></div>
        <div class="pp-info">
          <div class="pp-name">${def.name} <span style="font-size:11px;color:#a49bab">${def.kana}</span></div>
          <div class="pp-role">${def.role} · ${def.age}岁</div>
          <div class="pp-note">${n.met ? def.habit : '还没说过话。'}</div>
          <div class="pp-rel">${Array.from({ length: 5 }, (_, i) => `<i class="${i < n.affinity ? 'on' : ''}"></i>`).join('')}</div>
          <div class="pp-loc">${n.met ? '现在在：' + this.npcLocation(n) : ''}</div>
        </div>`;
      el.appendChild(d);
      const cv = d.querySelector('canvas');
      drawFace(cv, def.look, true);
    }
  }

  npcLocation(n) {
    if (this.ctx.zones?.isIndoor) return n.zone !== 'world' ? (this.ctx.zones.zones[n.zone]?.name || '室内') : '外面';
    const a = n.activity;
    const map = { sleep: '家里', work: '工作的地方', sit: '坐着休息', walk: '在路上', stand: '在附近' };
    if (n.zone !== 'world') return (this.ctx.zones.zones[n.zone]?.name || '室内');
    return (a ? map[a.act] || '在附近' : '在附近');
  }

  renderMap() {
    const cv = this.el.map;
    const g = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const RANGE = 122;
    const sc = Math.min(W, H) / (RANGE * 2);
    const CX = -6, CZ = 26;                 // 町实际重心
    const px = (x) => W / 2 + (x - CX) * sc;
    const pz = (z) => H / 2 + (z - CZ) * sc;
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#f7f1e6'; g.fillRect(0, 0, W, H);

    // 地形底色
    g.save();
    g.globalAlpha = 0.5;
    g.fillStyle = '#dfe8d2';
    g.beginPath(); g.arc(px(0), pz(0), 86 * sc, 0, TAU); g.fill();
    g.fillStyle = '#cfe0c6';
    g.beginPath(); g.arc(px(0), pz(0), 140 * sc, 0, TAU); g.fill();
    g.restore();

    // 溪流
    g.strokeStyle = '#a8cede'; g.lineWidth = 6 * sc * 3; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath();
    STREAM.pts.forEach(([x, z], i) => (i ? g.lineTo(px(x), pz(z)) : g.moveTo(px(x), pz(z))));
    g.stroke();

    // 铁路
    g.strokeStyle = '#8a8478'; g.lineWidth = 3;
    g.setLineDash([8, 6]);
    g.beginPath();
    for (let x = -RANGE; x <= RANGE; x += 6) {
      const y = pz(TRACK.zAt(x));
      if (x === -RANGE) g.moveTo(px(x), y); else g.lineTo(px(x), y);
    }
    g.stroke();
    g.setLineDash([]);

    // 道路
    g.strokeStyle = '#d8cdb4'; g.lineCap = 'round';
    for (const r of ROADS) {
      g.lineWidth = (r.type === 'asphalt' ? 7 : 4.5) * sc * 1.6;
      g.beginPath();
      r.pts.forEach(([x, z], i) => (i ? g.lineTo(px(x), pz(z)) : g.moveTo(px(x), pz(z))));
      g.stroke();
    }
    // 建筑
    g.fillStyle = '#c4a99a';
    for (const b of BUILDINGS) {
      g.save();
      g.translate(px(b.x), pz(b.z));
      g.rotate(-b.rot);
      g.fillRect(-b.w * sc / 2, -b.d * sc / 2, b.w * sc, b.d * sc);
      g.restore();
    }
    // 车站月台
    g.fillStyle = '#b9a894';
    g.fillRect(px(STATION.platform.x0), pz(3.5), (STATION.platform.x1 - STATION.platform.x0) * sc, 6 * sc);
    // 神社
    g.fillStyle = '#c26a5a';
    g.beginPath(); g.arc(px(24), pz(-54), 9, 0, TAU); g.fill();

    // 地标
    const q = this.ctx.quests;
    for (const lm of LANDMARKS) {
      const found = q.discovered.has(lm.id);
      g.beginPath();
      g.arc(px(lm.x), pz(lm.z), found ? 6 : 5, 0, TAU);
      g.fillStyle = found ? '#e2738f' : '#ffffff';
      g.fill();
      g.strokeStyle = found ? '#b8506c' : '#c0b8ac'; g.lineWidth = 1.6; g.stroke();
      if (found) {
        g.fillStyle = '#5a4a52'; g.font = '11px sans-serif'; g.textAlign = 'center';
        g.fillText(lm.name, px(lm.x), pz(lm.z) - 10);
      }
    }
    // 町民
    for (const n of this.ctx.npcs.list) {
      if (n.zone !== 'world') continue;
      g.beginPath(); g.arc(px(n.pos.x), pz(n.pos.z), 3.4, 0, TAU);
      g.fillStyle = n.isBackground ? '#c8c0b4' : '#ffffff';
      g.fill();
      g.strokeStyle = '#8a8478'; g.lineWidth = 1.2; g.stroke();
    }
    // 目标
    const m = q.objectiveMarker;
    if (m) {
      g.strokeStyle = '#e2738f'; g.lineWidth = 2.4;
      g.beginPath(); g.arc(px(m.x), pz(m.z), 10, 0, TAU); g.stroke();
      g.fillStyle = '#e2738f';
      g.beginPath(); g.arc(px(m.x), pz(m.z), 3, 0, TAU); g.fill();
    }
    // 玩家
    const p = this.ctx.game.player;
    g.save();
    g.translate(px(p.pos.x), pz(p.pos.z));
    g.rotate(-p.yaw + Math.PI);
    g.fillStyle = '#3a7fb5';
    g.beginPath();
    g.moveTo(0, -9); g.lineTo(6, 7); g.lineTo(0, 3.5); g.lineTo(-6, 7);
    g.closePath(); g.fill();
    g.restore();
    g.fillStyle = '#8a8478'; g.font = '10px sans-serif'; g.textAlign = 'left';
    g.fillText('N', W / 2, 16);
  }

  buildSettings() {
    const el = this.el.settings;
    if (!el) return;
    const a = this.ctx.audio;
    el.innerHTML = `
      <div class="jr-sec"><h3>音量</h3></div>
      <div class="set-row"><label>总音量<span class="hint">整体响度</span></label>
        <input type="range" min="0" max="100" value="${(a.volumes.master * 100) | 0}" data-vol="master"></div>
      <div class="set-row"><label>环境音<span class="hint">风、雨、列车、虫鸣</span></label>
        <input type="range" min="0" max="100" value="${(a.volumes.ambient * 100) | 0}" data-vol="ambient"></div>
      <div class="set-row"><label>效果音<span class="hint">脚步、门、铃声</span></label>
        <input type="range" min="0" max="100" value="${(a.volumes.sfx * 100) | 0}" data-vol="sfx"></div>
      <div class="jr-sec" style="margin-top:22px"><h3>时间</h3></div>
      <div class="set-row"><label>时间流速<span class="hint">一天约 ${Math.round(24 / (1 / 70) / 60)} 分钟</span></label>
        <input type="range" min="20" max="240" value="70" data-time="1"></div>
      <div class="set-row"><label>跳过傍晚<span class="hint">开启后夜晚更快到来</span></label>
        <input type="checkbox" data-opt="fastnight"></div>
      <div class="jr-sec" style="margin-top:22px"><h3>存档</h3></div>
      <div class="set-btns">
        <button data-act="save">保存进度</button>
        <button data-act="load">读取进度</button>
        <button data-act="skip">跳到傍晚</button>
        <button data-act="rain">来一场雨</button>
        <button data-act="reset" class="danger">重新开始</button>
      </div>
      <div class="jr-sec" style="margin-top:22px"><h3>统计</h3></div>
      <div class="stat-grid" id="stat-grid"></div>
    `;
    el.querySelectorAll('input[data-vol]').forEach((i) => {
      i.addEventListener('input', () => a.setVolume(i.dataset.vol, i.value / 100));
    });
    el.querySelector('input[data-time]').addEventListener('input', (e) => {
      this.ctx.game.time.scale = 1 / (+e.target.value);
    });
    el.querySelector('input[data-opt="fastnight"]').addEventListener('change', (e) => {
      this.ctx.game.fastNight = e.target.checked;
    });
    el.querySelectorAll('button[data-act]').forEach((b) => {
      b.addEventListener('click', () => this.settingAction(b.dataset.act));
    });
    const sg = document.getElementById('stat-grid');
    const g = this.ctx.game;
    sg.innerHTML = `
      <div>游戏天数<b>${this.ctx.time.day}</b></div>
      <div>完成委托<b>${this.ctx.quests.done.size}/${QUESTS.length}</b></div>
      <div>发现地点<b>${this.ctx.quests.discoveredCount}/${this.ctx.quests.totalLandmarks}</b></div>
      <div>持有金额<b>${this.ctx.inventory.money}円</b></div>
      <div>认识的人<b>${this.ctx.npcs.list.filter((n) => n.met).length}/${NPCS.length}</b></div>
      <div>总亲密度<b>${this.ctx.npcs.list.reduce((s, n) => s + n.affinity, 0)}</b></div>
      <div>当前时刻<b>${formatClock(this.ctx.time.hour)}</b></div>
      <div>所在位置<b>${this.currentAreaName()}</b></div>`;
  }

  settingAction(act) {
    const g = this.ctx.game;
    switch (act) {
      case 'save': g.save(); this.toast('进度已保存。', '存档', 'good'); break;
      case 'load': g.load(); this.toast('已读取进度。', '存档'); this.closePanel(); break;
      case 'skip': g.time.setHour(17.6); this.toast('时间快进到傍晚。', '时间'); break;
      case 'rain': g.weather?.forceRain(); this.toast('云从山那边压过来了。', '天气'); break;
      case 'reset':
        if (confirm('确定要重新开始吗？当前进度会被清除。')) { localStorage.removeItem('sakura-town-save'); location.reload(); }
        break;
    }
  }

  openBoard(kind = 'station') {
    const q = this.ctx.quests;
    q.rollDaily(this.ctx.time.day);
    this.boardKind = kind;
    this.boardEl = document.createElement('div');
    this.boardEl.className = 'panel';
    this.boardEl.innerHTML = `<div class="panel-card" style="width:min(660px,92vw);height:auto;max-height:82vh">
      <div class="panel-tabs"><button class="active">车站告示板</button><button class="tab-x" data-close="1">✕</button></div>
      <div class="panel-body" style="overflow:auto"><div class="tab-page active" id="board-body"></div></div></div>`;
    document.getElementById('app').appendChild(this.boardEl);
    this.boardEl.addEventListener('click', (e) => {
      if (e.target === this.boardEl || e.target.dataset.close) { this.closeBoard(); return; }
      const b = e.target.closest('[data-quest]');
      if (b) { q.accept(b.dataset.quest); this.closeBoard(); }
    });
    this.renderBoard();
    this.ctx.game.time.paused = true;
  }
  closeBoard() {
    this.boardEl?.remove();
    this.boardEl = null;
    this.ctx.game.time.paused = false;
  }
  renderBoard() {
    const body = document.getElementById('board-body');
    if (!body) return;
    const q = this.ctx.quests;
    let html = `<div class="jr-sec"><h3>今天可以接下的事</h3></div>`;
    if (q.currentQuest) {
      html += `<div class="jr-card"><div class="jr-t">进行中：${q.currentQuest.title}</div>
        <div class="jr-d">${q.currentObjectiveText || ''}</div></div>`;
      html += `<div class="set-btns"><button data-act2="abandon">暂时放下</button></div>`;
    }
    const avail = q.atBoard();
    for (const qq of avail) {
      html += `<div class="jr-card"><div class="jr-t">${qq.title}<span class="jr-tag">第${qq.chapter}章</span></div>
        <div class="jr-d">${qq.brief}</div>
        <div class="set-btns"><button data-quest="${qq.id}">接下这件事</button></div></div>`;
    }
    if (!avail.length) html += `<div class="jr-empty">暂时没有新的事了。去镇上走走吧。</div>`;
    html += `<div class="jr-sec" style="margin-top:20px"><h3>町内会通知</h3></div>`;
    for (const d of q.daily) {
      const isActive = q.dailyActive && q.dailyActive.id === d.id;
      const btns = isActive
        ? `<div class="jr-meta"><span>进行中</span><span>报酬 ${d.money}円</span></div>`
        : (q.dailyActive
          ? `<div class="jr-meta"><span>报酬 ${d.money}円</span></div>`
          : `<div class="set-btns"><button data-daily="${d.id}">接下这件事</button></div>`);
      html += `<div class="jr-card"><div class="jr-t">${d.title}</div><div class="jr-d">${d.desc}</div>
        <div class="jr-meta"><span>报酬 ${d.money}円</span><span>委托人：${NPCS.find((n) => n.id === d.to)?.name || ''}</span></div>${btns}</div>`;
    }
    html += `<div class="jr-empty" style="margin-top:6px">※ 「町内会通知」是每天都会出现的小委托，帮忙完成会有好事发生。</div>`;
    body.innerHTML = html;
    for (const b of body.querySelectorAll('[data-daily]')) {
      b.addEventListener('click', () => { q.acceptDaily(b.dataset.daily); this.renderBoard(); });
    }
    body.querySelector('[data-act2="abandon"]')?.addEventListener('click', () => { q.abandon(); this.renderBoard(); });
  }

  openTimetable() {
    const t = this.ctx.time;
    const next = this.ctx.trainSystem.nextTrain(t.hour);
    const rows = SCHEDULE.map((s) => {
      const passed = s.arr < t.hour;
      return `<tr><td>${formatClock(s.arr)}</td><td>${s.dir > 0 ? '下行' : '上行'}</td><td>${s.dest}</td>
        <td style="color:${passed ? '#b8b0bc' : '#4a4452'};font-weight:${passed ? 400 : 600}">${passed ? '已通过' : ''}</td></tr>`;
    }).join('');
    const el = document.createElement('div');
    el.className = 'panel';
    el.innerHTML = `<div class="panel-card" style="width:min(520px,92vw);height:auto">
      <div class="panel-tabs"><button class="active">樱町站 时刻表</button><button class="tab-x" data-close="1">✕</button></div>
      <div class="panel-body" style="overflow:auto"><div class="tab-page active">
        <div class="jr-empty" style="margin-bottom:14px">下一班：<b style="color:#e2738f">${formatClock(next.arr > 24 ? next.arr - 24 : next.arr)}</b>（${next.dir > 0 ? '下行' : '上行'} · 往${next.dest}）
        ${next.tomorrow ? '<br>（今天的末班车已经开走了）' : ''}</div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr style="color:#9a92a0;font-size:11px;letter-spacing:.1em">
            <th style="text-align:left;padding:6px 0">时刻</th><th style="text-align:left">方向</th>
            <th style="text-align:left">目的地</th><th style="text-align:left"></th></tr>
          ${rows}</table>
      </div></div></div>`;
    document.getElementById('app').appendChild(el);
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.dataset.close) { el.remove(); this.ctx.game.time.paused = false; }
    });
    this.ctx.game.time.paused = true;
    this.ctx.audio?.page();
  }

  openLetter() {
    const letters = (this.ctx.quests.flags && this.ctx.quests.flags.letters) || [];
    this.say('藤田 家', letters.length ? letters.join('\n') : '信箱里只有广告传单。', null);
  }

  setPaused(v) { this.ctx.game.time.paused = v; }
}

/* ------------------------------------------------------------------ *
 *  头像绘制
 * ------------------------------------------------------------------ */
export function drawFace(cv, look, big = false) {
  const g = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  g.clearRect(0, 0, W, H);
  // 背景
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, '#fdeef2'); grd.addColorStop(1, '#f3dfe6');
  g.fillStyle = grd; g.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H * 0.56, r = W * 0.33;
  const hair = hex(look.hair), skin = hex(look.skin);
  // 头发底
  g.fillStyle = hair;
  g.beginPath();
  g.ellipse(cx, cy - r * 0.12, r * 1.08, r * 1.16, 0, 0, TAU);
  g.fill();
  // 脸
  g.fillStyle = skin;
  g.beginPath();
  g.ellipse(cx, cy + r * 0.04, r * 0.86, r * 0.98, 0, 0, TAU);
  g.fill();
  // 发型
  g.fillStyle = hair;
  const style = look.hairStyle;
  if (style === 'bob' || style === 'long' || style === 'bun' || style === 'ponytail') {
    g.beginPath();
    g.ellipse(cx, cy - r * 0.42, r * 1.02, r * 0.62, 0, Math.PI, TAU);
    g.fill();
    g.beginPath();
    g.ellipse(cx - r * 0.84, cy + r * 0.12, r * 0.28, r * 0.62, 0, 0, TAU);
    g.fill();
    g.beginPath();
    g.ellipse(cx + r * 0.84, cy + r * 0.12, r * 0.28, r * 0.62, 0, 0, TAU);
    g.fill();
  } else if (style === 'cap') {
    g.fillStyle = hex(look.hat || 0x4a6b8a);
    g.beginPath();
    g.ellipse(cx, cy - r * 0.5, r * 1.05, r * 0.5, 0, Math.PI, TAU);
    g.fill();
    g.beginPath();
    g.ellipse(cx, cy - r * 0.42, r * 1.3, r * 0.16, 0, 0, Math.PI);
    g.fill();
  } else {
    g.beginPath();
    g.ellipse(cx, cy - r * 0.48, r * 1.0, r * 0.5, 0, Math.PI, TAU);
    g.fill();
  }
  // 眼
  g.fillStyle = '#33262c';
  for (const s of [-1, 1]) {
    g.beginPath();
    g.ellipse(cx + s * r * 0.33, cy - r * 0.02, r * 0.1, r * 0.15, 0, 0, TAU);
    g.fill();
  }
  g.fillStyle = '#fff';
  for (const s of [-1, 1]) {
    g.beginPath();
    g.ellipse(cx + s * r * 0.36, cy - r * 0.07, r * 0.035, r * 0.045, 0, 0, TAU);
    g.fill();
  }
  // 嘴
  g.strokeStyle = '#a85a58'; g.lineWidth = Math.max(1.4, r * 0.06);
  g.beginPath();
  g.arc(cx, cy + r * 0.34, r * 0.16, 0.2, Math.PI - 0.2);
  g.stroke();
  // 腮红
  if (look.blush !== false) {
    g.fillStyle = 'rgba(242,163,168,.5)';
    for (const s of [-1, 1]) {
      g.beginPath();
      g.ellipse(cx + s * r * 0.56, cy + r * 0.2, r * 0.15, r * 0.09, 0, 0, TAU);
      g.fill();
    }
  }
  // 眼镜
  if (look.glasses) {
    g.strokeStyle = '#4a4a52'; g.lineWidth = Math.max(1.2, r * 0.05);
    for (const s of [-1, 1]) {
      g.beginPath();
      g.arc(cx + s * r * 0.33, cy - r * 0.02, r * 0.2, 0, TAU);
      g.stroke();
    }
    g.beginPath(); g.moveTo(cx - r * 0.13, cy - r * 0.04); g.lineTo(cx + r * 0.13, cy - r * 0.04); g.stroke();
  }
}
