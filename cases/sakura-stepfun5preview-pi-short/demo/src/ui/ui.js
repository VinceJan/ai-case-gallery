// UI 管理：标题、加载、HUD、对话、面板、地图、提示
import { SaveManager } from '../core/save.js';
import { ROADS, TOWN, BUILDINGS, POIS, terrainHeight } from '../world/layout.js';
import { ITEMS } from '../sim/items.js';

const GOALS = [
  { id: 'meet5', text: '认识 5 位镇民', desc: '和镇上的居民们搭话', check: (g) => g.npcs.filter((n) => n.memory.talks > 0).length >= 5 },
  { id: 'meet10', text: '认识 10 位镇民', desc: '小镇很小，很快就会熟悉起来', check: (g) => g.npcs.filter((n) => n.memory.talks > 0).length >= 10 },
  { id: 'gift3', text: '送出 3 份礼物', desc: '投其所好效果更佳', check: (g) => (g.player.stats.gifts || 0) >= 3 },
  { id: 'friend', text: '与任何人成为好友', desc: '好感度 55 以上', check: (g) => g.npcs.some((n) => n.affinity >= 55) },
  { id: 'wallet', text: '归还失主的钱包', desc: '留意镇上闪亮的东西', check: (g) => !!g.flags.walletDone },
  { id: 'train', text: '乘坐电车去城市', desc: '车站站台，电车进站时', check: (g) => g.eventLog.some((e) => e.text.includes('电车')) },
  { id: 'cat', text: '喂食流浪猫', desc: '神社附近可能出现', check: (g) => !!g.flags.catDone || g.eventLog.some((e) => e.text.includes('猫')) },
  { id: 'festival', text: '参加夏日祭', desc: '第 5 天傍晚，神社境内', check: (g) => !!g.flags.festivalToday },
  { id: 'photo', text: '拍 5 张照片', desc: '按 P 拍照', check: (g) => (g.player.stats.photos || 0) >= 5 },
  { id: 'money', text: '攒到 5000 円', desc: '卖点特产，或者找份零工', check: (g) => g.player.money >= 5000 },
  { id: 'sit', text: '在长椅上发呆 3 次', desc: '慢下来才是生活', check: (g) => (g.player.stats.satTimes || 0) >= 3 },
  { id: 'walk', text: '走过 2000 米', desc: '用脚步丈量小镇', check: (g) => (g.player.stats.steps || 0) >= 2000 },
];

export class UI {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.el = {
      title: document.getElementById('title-screen'),
      loading: document.getElementById('loading-screen'),
      loadingFill: document.getElementById('loading-fill'),
      loadingText: document.getElementById('loading-text'),
      hud: document.getElementById('hud'),
      date: document.getElementById('clock-date'),
      time: document.getElementById('clock-time'),
      weather: document.getElementById('clock-weather'),
      money: document.getElementById('money'),
      speed: document.getElementById('speed'),
      toasts: document.getElementById('toasts'),
      stamina: document.getElementById('stamina-fill'),
      prompt: document.getElementById('interact-prompt'),
      subtitle: document.getElementById('subtitle-bar'),
      minimap: document.getElementById('minimap'),
      dialogue: document.getElementById('dialogue-screen'),
      dlgName: document.getElementById('dialogue-name'),
      dlgText: document.getElementById('dialogue-text'),
      dlgChoices: document.getElementById('dialogue-choices'),
      panel: document.getElementById('panel-screen'),
      panelBox: document.getElementById('panel-box'),
      panelTitle: document.getElementById('panel-title'),
      panelBody: document.getElementById('panel-body'),
      panelFooter: document.getElementById('panel-footer'),
      map: document.getElementById('map-screen'),
      bigmap: document.getElementById('bigmap'),
      help: document.getElementById('help-screen'),
      vignette: document.getElementById('vignette'),
    };
    this.mmCtx = this.el.minimap.getContext('2d');
    this.bmCtx = this.el.bigmap.getContext('2d');
    this.goalsDone = new Set();
    this._subtitleTimer = null;
    this._typeTimer = null;

    // 标题按钮
    document.getElementById('btn-new-game').onclick = () => this.onNewGame();
    document.getElementById('btn-continue').onclick = () => this.onContinue();
    document.getElementById('btn-help').onclick = () => this.showHelp(true);
    document.getElementById('btn-help-close').onclick = () => this.showHelp(false);
    if (!SaveManager.has(0)) document.getElementById('btn-continue').disabled = true;
  }

  bindGame(game) {
    this.game = game;
    if (game.input) game.input.onPress = (code) => this.onKey(code);
  }

  onNewGame() { this.game?.requestNewGame?.(); }
  onContinue() { this.game?.requestContinue?.(); }

  // ---------------- 加载/标题 ----------------
  setLoading(pct, text) {
    this.el.loadingFill.style.width = pct + '%';
    this.el.loadingText.textContent = text;
  }
  showTitle(show) {
    this.el.title.classList.toggle('hidden', !show);
    if (show) {
      // 刷新“读取自动存档”按钮状态
      document.getElementById('btn-continue').disabled = !SaveManager.has(0);
    }
  }
  showLoading(show) { this.el.loading.classList.toggle('hidden', !show); }
  showHelp(show) {
    this.el.help.classList.toggle('hidden', !show);
    if (this.game) this.game.input.enabled = !show;
  }

  // ---------------- HUD ----------------
  hud(d) {
    this.el.date.textContent = d.dateText;
    this.el.time.textContent = d.timeText;
    this.el.weather.textContent = d.weatherIcon;
    this.el.money.textContent = d.money.toLocaleString();
    this.el.speed.textContent = d.speed;
    this.el.stamina.style.width = d.stamina + '%';
    this.el.stamina.style.background = d.stamina > 30 ? 'linear-gradient(90deg,#a8d08d,#7fb069)' : 'linear-gradient(90deg,#e08a8a,#c96f6f)';
    this.el.vignette.className = d.night ? 'night' : d.rainy ? 'rainy' : '';
  }

  toast(title, text, kind = '') {
    const div = document.createElement('div');
    div.className = 'toast ' + kind;
    div.innerHTML = '<div class="toast-title"></div><div></div>';
    div.children[0].textContent = title;
    div.children[1].textContent = text;
    this.el.toasts.appendChild(div);
    while (this.el.toasts.children.length > 5) this.el.toasts.firstChild.remove();
    setTimeout(() => {
      div.style.transition = 'opacity .5s, transform .5s';
      div.style.opacity = '0';
      div.style.transform = 'translateX(30px)';
      setTimeout(() => div.remove(), 520);
    }, 4600);
  }

  prompt(html) {
    if (!html) { this.el.prompt.classList.add('hidden'); return; }
    this.el.prompt.innerHTML = html.replace('[E]', '<span class="key">E</span>');
    this.el.prompt.classList.remove('hidden');
  }

  subtitle(text, sec = 3) {
    this.el.subtitle.textContent = text;
    this.el.subtitle.classList.remove('hidden');
    clearTimeout(this._subtitleTimer);
    this._subtitleTimer = setTimeout(() => this.el.subtitle.classList.add('hidden'), sec * 1000);
  }

  // ---------------- 对话 ----------------
  dialogue(dlg) {
    this.el.dialogue.classList.remove('hidden');
    this.el.dlgName.innerHTML = '';
    this.el.dlgName.textContent = dlg.name;
    if (dlg.relation) {
      const s = document.createElement('span');
      s.className = 'rel';
      s.textContent = dlg.relation;
      this.el.dlgName.appendChild(s);
    }
    this.typeText(dlg.text);
    this.dialogueChoices(dlg.choices || []);
  }

  typeText(text) {
    clearInterval(this._typeTimer);
    this.el.dlgText.textContent = '';
    let i = 0;
    this._typeTimer = setInterval(() => {
      i += 2;
      this.el.dlgText.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(this._typeTimer);
    }, 16);
  }

  dialogueText(text) { this.typeText(text); }

  dialogueChoices(choices) {
    this.el.dlgChoices.innerHTML = '';
    for (const c of choices) {
      const b = document.createElement('button');
      b.className = 'dialogue-choice' + (c.dim ? ' dim' : '');
      b.textContent = c.label;
      b.onclick = () => {
        if (c.dim) return;
        this.game.onDialogueChoice(c.value);
      };
      this.el.dlgChoices.appendChild(b);
    }
  }

  hideDialogue() {
    this.el.dialogue.classList.add('hidden');
  }

  // ---------------- 面板 ----------------
  panel({ title, sub, items = [], sellTitle, sellItems = [], empty, cancel, footer = [] }) {
    this.el.panel.classList.remove('hidden');
    this.el.panelTitle.innerHTML = '';
    const t = document.createElement('span');
    t.textContent = title;
    this.el.panelTitle.appendChild(t);
    if (sub) {
      const s = document.createElement('span');
      s.className = 'sub';
      s.textContent = sub;
      this.el.panelTitle.appendChild(s);
    }
    const x = document.createElement('span');
    x.className = 'panel-close-x';
    x.textContent = '✕';
    x.onclick = () => cancel?.();
    this.el.panelTitle.appendChild(x);

    this.el.panelBody.innerHTML = '';
    const renderItems = (list, priceMode) => {
      if (!list.length) {
        const d = document.createElement('div');
        d.style.cssText = 'opacity:.55;padding:14px;text-align:center';
        d.textContent = empty || '（空）';
        this.el.panelBody.appendChild(d);
        return;
      }
      for (const it of list) {
        const row = document.createElement('div');
        row.className = 'item-row' + (it.dim ? '' : ' affordable');
        row.innerHTML = `<div class="icon">${it.icon}</div>
          <div class="info"><div class="name"></div><div class="desc"></div></div>`;
        row.querySelector('.name').textContent = it.name;
        row.querySelector('.desc').textContent = it.desc || '';
        if (it.price) {
          const p = document.createElement('div');
          p.className = 'price';
          p.textContent = it.price;
          row.appendChild(p);
        }
        const btn = document.createElement('button');
        btn.textContent = priceMode === 'sell' ? '出售' : (it.btnLabel || (priceMode === 'buy' ? '购买' : '选择'));
        btn.disabled = !!it.dim;
        btn.onclick = () => this.game.onPanelChoice(it.value);
        row.appendChild(btn);
        this.el.panelBody.appendChild(row);
      }
    };
    renderItems(items, 'buy');
    if (sellItems.length || sellTitle) {
      const h = document.createElement('div');
      h.style.cssText = 'margin:14px 0 6px;opacity:.8;letter-spacing:2px';
      h.textContent = sellTitle || '出售';
      this.el.panelBody.appendChild(h);
      renderItems(sellItems, 'sell');
    }

    this.el.panelFooter.innerHTML = '';
    for (const f of footer) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = f.label;
      b.onclick = f.action;
      this.el.panelFooter.appendChild(b);
    }
    const close = document.createElement('button');
    close.className = 'btn';
    close.textContent = '关闭';
    close.onclick = () => cancel?.();
    this.el.panelFooter.appendChild(close);
  }

  hidePanel() { this.el.panel.classList.add('hidden'); }

  // ---------------- 背包 ----------------
  openInventory(game) {
    const items = game.player.inventory.map((i) => {
      const it = ITEMS[i.id];
      return {
        icon: it.icon, name: it.name + ' ×' + i.n, desc: it.desc,
        value: 'use:' + i.id, btnLabel: it.kind === 'food' || it.kind === 'drink' ? '使用' : (i.id === 'camera' ? '拍照' : '查看'),
      };
    });
    this.panel({
      title: '背包', sub: '钱包 ¥' + game.player.money.toLocaleString() + ' · 体力 ' + Math.round(game.player.stamina),
      items, empty: '背包空空如也',
      cancel: () => { this.hidePanel(); game.mode = game.prevMode || 'town'; },
      footer: [
        { label: '小镇目标', action: () => this.openGoals(game) },
        { label: '事件记录', action: () => this.openEventLog(game) },
      ],
    });
  }

  checkGoals(game) {
    for (const g of GOALS) {
      if (this.goalsDone.has(g.id)) continue;
      let done = false;
      try { done = g.check(game); } catch (e) { /* 数据未就绪 */ }
      if (done) {
        this.goalsDone.add(g.id);
        this.toast('目标达成', g.text, 'friend');
        game.logEvent('达成了目标：' + g.text);
      }
    }
  }

  openGoals(game) {
    const items = GOALS.map((g) => {
      const done = g.check(game);
      if (done && !this.goalsDone.has(g.id)) {
        this.goalsDone.add(g.id);
        this.toast('目标达成', g.text, 'friend');
        game.logEvent('达成了目标：' + g.text);
      }
      return { icon: done ? '✅' : '⬜', name: g.text, desc: g.desc, value: 'noop', btnLabel: done ? '已完成' : '进行中', dim: !done };
    });
    this.panel({
      title: '小镇目标', sub: '慢慢来，不着急',
      items, empty: '没有目标',
      cancel: () => this.openInventory(game),
      footer: [{ label: '返回背包', action: () => this.openInventory(game) }],
    });
  }

  openEventLog(game) {
    const items = game.eventLog.map((e) => ({
      icon: '📖', name: e.text, desc: '第' + e.day + '天 ' + e.time, value: 'noop', btnLabel: '', dim: true,
    }));
    this.panel({
      title: '事件记录', sub: '在这个小镇度过的日子',
      items, empty: '还没有什么值得记录的事',
      cancel: () => this.openInventory(game),
      footer: [{ label: '返回背包', action: () => this.openInventory(game) }],
    });
  }

  // ---------------- 菜单 ----------------
  openMenu(game) {
    this.panel({
      title: '菜单', sub: game.clock.dateText + ' ' + game.clock.timeText,
      items: [
        { icon: '▶️', name: '继续游戏', desc: '', value: 'menu:resume', btnLabel: '继续' },
        { icon: '💾', name: '保存到存档 1', desc: SaveManager.info(1) ? '已有存档：第' + SaveManager.info(1).day + '天' : '空槽位', value: 'menu:save1', btnLabel: '保存' },
        { icon: '📂', name: '读取存档 1', desc: SaveManager.info(1) ? '第' + SaveManager.info(1).day + '天 ' + SaveManager.info(1).time : '空槽位', value: 'menu:load1', btnLabel: '读取' },
        { icon: '🔊', name: (game.audio.muted ? '开启声音' : '关闭声音'), desc: '音量 ' + Math.round(game.audio.volume * 100) + '%', value: 'menu:mute', btnLabel: game.audio.muted ? '开启' : '静音' },
        { icon: '⏱', name: '时间流速', desc: '当前 ' + game.clock.speedIndex + 'x（1/2/3 键切换，0 暂停）', value: 'menu:speed', btnLabel: '切换' },
        { icon: '🏠', name: '返回标题画面', desc: '记得先保存进度', value: 'menu:title', btnLabel: '返回' },
      ],
      cancel: () => { this.hidePanel(); game.mode = 'town'; },
      footer: [{ label: '继续游戏', action: () => { this.hidePanel(); game.mode = 'town'; } }],
    });
  }

  onMenuChoice(value, game) {
    if (value === 'menu:resume') { this.hidePanel(); game.mode = 'town'; }
    else if (value === 'menu:save1') { game.saveSlot(1); this.openMenu(game); }
    else if (value === 'menu:load1') { if (game.loadSlot(1)) { this.hidePanel(); game.mode = 'town'; } }
    else if (value === 'menu:mute') {
      game.audio.setMuted(!game.audio.muted);
      this.openMenu(game);
    } else if (value === 'menu:speed') {
      game.setSpeed(game.clock.speedIndex >= 3 ? 1 : game.clock.speedIndex + 1);
      this.openMenu(game);
    } else if (value === 'menu:title') {
      game.autoSave();
      this.hidePanel();
      game.mode = 'title';
      game.showTitleScreen();
    }
  }

  // ---------------- 地图 ----------------
  showMap(game) {
    this.el.map.classList.remove('hidden');
    this.drawBigMap(game);
  }
  hideMap() { this.el.map.classList.add('hidden'); }

  // 世界坐标 → 小地图坐标
  mapTransform(ctx, w, h) {
    const pad = 10;
    const minX = TOWN.bounds.minX - 6, maxX = TOWN.bounds.maxX + 6;
    const minZ = TOWN.bounds.minZ - 6, maxZ = TOWN.bounds.maxZ + 6;
    const sx = (w - pad * 2) / (maxX - minX);
    const sz = (h - pad * 2) / (maxZ - minZ);
    const s = Math.min(sx, sz);
    const ox = pad + (w - pad * 2 - (maxX - minX) * s) / 2;
    const oz = pad + (h - pad * 2 - (maxZ - minZ) * s) / 2;
    return { x: (wx) => ox + (wx - minX) * s, z: (wz) => oz + (wz - minZ) * s, s };
  }

  drawMinimap(game) {
    const now = performance.now();
    if (now - (this._lastMm || 0) < 66) return; // ~15fps 足够
    this._lastMm = now;
    const ctx = this.mmCtx;
    const w = this.el.minimap.width, h = this.el.minimap.height;
    this._drawMapBase(ctx, w, h, game, false);
  }

  drawBigMap(game) {
    const ctx = this.bmCtx;
    const w = this.el.bigmap.width, h = this.el.bigmap.height;
    this._drawMapBase(ctx, w, h, game, true);
  }

  _drawMapBase(ctx, w, h, game, big) {
    const t = this.mapTransform(ctx, w, h);
    ctx.clearRect(0, 0, w, h);
    // 草地
    ctx.fillStyle = '#7a9a58';
    ctx.fillRect(0, 0, w, h);
    // 河
    ctx.fillStyle = '#5f96a8';
    ctx.fillRect(t.x(TOWN.bounds.minX), t.z(TOWN.river.zMin), t.x(TOWN.bounds.maxX) - t.x(TOWN.bounds.minX), t.z(TOWN.river.zMax) - t.z(TOWN.river.zMin));
    // 公园水池
    ctx.fillStyle = '#6fa8b8';
    ctx.beginPath();
    ctx.ellipse(t.x(-40), t.z(40), 12 * t.s, 8 * t.s, 0, 0, 7);
    ctx.fill();
    // 水田
    ctx.fillStyle = '#8aa860';
    for (const [px, pz] of [[-116, 74], [-96, 74], [-116, 96], [-96, 96]]) {
      ctx.fillRect(t.x(px - 10), t.z(pz - 10), 20 * t.s, 20 * t.s);
    }
    // 神社山
    ctx.fillStyle = '#6f9150';
    ctx.beginPath();
    ctx.arc(t.x(0), t.z(102), 32 * t.s, 0, 7);
    ctx.fill();
    // 道路
    ctx.strokeStyle = '#9a9aa2';
    ctx.lineWidth = Math.max(2, 5 * t.s);
    ctx.lineCap = 'round';
    for (const r of ROADS) {
      ctx.beginPath();
      ctx.moveTo(t.x(r.x1), t.z(r.z1));
      ctx.lineTo(t.x(r.x2), t.z(r.z2));
      ctx.stroke();
    }
    // 建筑
    for (const b of BUILDINGS) {
      const isShop = b.id.startsWith('shop') || b.id === 'post_office';
      ctx.fillStyle = b.playerHome ? '#4ad0c0' : isShop ? '#d9a441' : '#b08070';
      const c = Math.cos(-b.rotY), s2 = Math.sin(-b.rotY);
      const pts = [[-b.w / 2, -b.d / 2], [b.w / 2, -b.d / 2], [b.w / 2, b.d / 2], [-b.w / 2, b.d / 2]]
        .map(([lx, lz]) => [t.x(b.x + lx * c + lz * s2), t.z(b.z - lx * s2 + lz * c)]);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 4; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fill();
    }
    // 栅栏边界
    ctx.strokeStyle = '#8a7a6a';
    ctx.lineWidth = 2;
    ctx.strokeRect(t.x(TOWN.bounds.minX), t.z(TOWN.bounds.minZ), t.x(TOWN.bounds.maxX) - t.x(TOWN.bounds.minX), t.z(TOWN.bounds.maxZ) - t.z(TOWN.bounds.minZ));
    // 事件标记
    for (const [id, m] of game.markers) {
      const x = t.x(m.x), z = t.z(m.z);
      const pulse = 3 + Math.sin(performance.now() / 200) * 1.5;
      ctx.fillStyle = '#ffd98a';
      ctx.beginPath();
      ctx.arc(x, z, pulse + 2, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#7a4a2a';
      ctx.font = `${big ? 11 : 9}px sans-serif`;
      ctx.textAlign = 'center';
      if (big) ctx.fillText(m.label, x, z - 8);
    }
    // 电车
    if (game.town) {
      const tr = game.town.train;
      ctx.fillStyle = '#e8e4da';
      ctx.fillRect(t.x(tr.x - 9), t.z(TOWN.track.z - 1), 18 * t.s, 2.4 * t.s);
    }
    // NPC
    for (const npc of game.npcs || []) {
      if (npc.state === 'sleep') continue;
      const x = t.x(npc.pos.x), z = t.z(npc.pos.z);
      ctx.fillStyle = npc.affinity >= 55 ? '#7fd0a0' : npc.affinity >= 20 ? '#ffb7c5' : '#e8e4da';
      ctx.beginPath();
      ctx.arc(x, z, big ? 3.4 : 2.6, 0, 7);
      ctx.fill();
      if (big) {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(npc.name, x, z - 6);
      }
    }
    // 玩家
    const px = t.x(game.player.pos.x), pz = t.z(game.player.pos.z);
    ctx.fillStyle = '#3f8adf';
    ctx.beginPath();
    ctx.arc(px, pz, big ? 4.5 : 3.4, 0, 7);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // 玩家朝向
    ctx.strokeStyle = '#3f8adf';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, pz);
    ctx.lineTo(px + Math.sin(game.player.heading) * (big ? 12 : 8), pz + Math.cos(game.player.heading) * (big ? 12 : 8));
    ctx.stroke();
    if (big) {
      // 区域标注
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      const labels = [
        ['商店街', 10, -40], ['樱花神社', 0, 104], ['公园', -40, 36], ['住宅区', -98, 10],
        ['樱花站', -48, -95], ['水田', -100, 92], ['农场', 96, 92], ['河对岸', 0, -133],
      ];
      for (const [name, lx, lz] of labels) ctx.fillText(name, t.x(lx), t.z(lz));
    }
  }

  // ---------------- 键盘路由 ----------------
  onKey(code) {
    const game = this.game;
    if (!game) return;
    if (code === 'Escape') {
      if (game.mode === 'dialogue') game.onDialogueChoice('bye');
      else if (game.mode === 'panel') { this.hidePanel(); game.mode = game.prevMode || 'town'; }
      else if (game.mode === 'map') game.toggleMap();
      else game.toggleMenu();
      return;
    }
    if (game.mode === 'menu' || game.mode === 'title') return;
    if (code === 'KeyE' || code === 'Enter') {
      if (game.mode === 'dialogue') {
        const first = this.el.dlgChoices.firstChild;
        if (first && !first.disabled) first.click();
      } else if (game.mode === 'town' || game.mode === 'interior') game.interact();
      return;
    }
    if (code === 'Tab' || code === 'KeyI') { game.toggleInventory(); return; }
    if (code === 'KeyM') { game.toggleMap(); return; }
    if (code === 'KeyP' && game.mode === 'town') { game.takePhoto(); return; }
    if (code === 'Space' && game.mode === 'town') { game.player.jump(); return; }
    if (code === 'Digit1') game.setSpeed(1);
    if (code === 'Digit2') game.setSpeed(2);
    if (code === 'Digit3') game.setSpeed(3);
    if (code === 'Digit0') game.setSpeed(game.clock.speedIndex === 0 ? 1 : 0);
  }
}
