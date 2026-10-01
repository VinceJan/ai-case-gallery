/**
 * UI 层：标题画面、HUD、对话、日志、商店、提示、钓鱼条、睡觉转场、小地图。
 * 所有 DOM 都在这里构建，逻辑层只调用方法。
 */
import { BUILDINGS, ROADS, RIVER_CTRL, RAIL_CTRL, makePolyline2D } from '../world/layout.js';
import { doorPosition } from '../world/layout.js';
import { clamp } from '../core/utils.js';

const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

const CONTROLS = [
  ['WASD / ←↑→↓', '移动'],
  ['Shift', '跑步'],
  ['Ctrl / C', '慢走'],
  ['鼠标 / Q E', '转动视角'],
  ['滚轮', '拉近拉远'],
  ['E', '交互 · 对话 · 进入'],
  ['J', '日志与背包'],
  ['H', '操作说明'],
  ['Esc', '取消 / 关闭'],
  ['F1', '开发：推进时间'],
];

export class UI {
  constructor(root) {
    this.root = root;
    this.blockers = new Set();
    this._buildTitle();
    this._buildHud();
    this._buildPrompt();
    this._buildDialogue();
    this._buildToasts();
    this._buildJournal();
    this._buildShop();
    this._buildFishing();
    this._buildFade();
    this._buildMinimap();
    this._buildHelp();
  }

  get blocking() {
    return this.blockers.size > 0;
  }

  _block(name) {
    this.blockers.add(name);
  }
  _unblock(name) {
    this.blockers.delete(name);
  }

  // ------------------------------------------------------------------ 标题
  _buildTitle() {
    const t = el('div');
    t.id = 'title';
    const petals = el('div', 'petal-bg');
    for (let i = 0; i < 26; i++) {
      const p = el('div', 'petal');
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${7 + Math.random() * 9}s`;
      p.style.animationDelay = `${-Math.random() * 12}s`;
      const s = 8 + Math.random() * 14;
      p.style.width = `${s}px`;
      p.style.height = `${s}px`;
      petals.appendChild(p);
    }
    t.appendChild(petals);
    t.appendChild(el('div', 'kanji', '樱花小镇'));
    t.appendChild(el('div', 'romaji', 'SAKURA TOWN'));
    t.appendChild(el('div', 'tagline', '群山与河谷之间的小镇 —— 铁路会来，人也会来'));
    const c = el('div', 'controls');
    for (const [k, v] of CONTROLS.slice(0, 8)) {
      c.appendChild(el('b', null, k));
      c.appendChild(el('span', null, v));
    }
    t.appendChild(c);
    t.appendChild(el('div', 'start-hint', '按 空格 / 点击  开始新的一天'));
    this.root.appendChild(t);
    this.title = t;
  }

  hideTitle() {
    this.title.classList.add('hidden');
  }

  /**
   * 标题画面增强：存档续玩 + 设置入口。
   * @param {object} o { hasSave, onContinue, onSettings, onNewGame }
   */
  enhanceTitle(o) {
    const bar = el('div', 'title-actions');
    const mk = (label, primary, fn) => {
      const b = el('button', `title-btn ${primary ? 'primary' : ''}`, label);
      b.type = 'button';
      b.addEventListener('click', (e) => { e.stopPropagation(); fn(); });
      return b;
    };
    if (o.hasSave) {
      bar.appendChild(mk('继续上次', true, o.onContinue));
      bar.appendChild(mk('设置', false, o.onSettings));
    } else {
      bar.appendChild(mk('设置', false, o.onSettings));
    }
    this.title.appendChild(bar);
    if (o.hasSave) {
      this.title.querySelector('.start-hint').textContent = '按 空格 开始新的一天';
      const sub = el('div', 'save-note', `存档：第 ${o.hasSave.day} 天 · ${o.hasSave.time} · ${o.hasSave.when}`);
      this.title.appendChild(sub);
    }
  }

  // ------------------------------------------------------------------ HUD
  _buildHud() {
    const left = el('div', 'hud');
    left.id = 'hud-left';
    const clock = el('div');
    clock.id = 'clock';
    const dial = el('div', 'dial');
    dial.appendChild(el('i'));
    const txt = el('div', 'txt');
    const time = el('div', 'time', '07:12');
    const date = el('div', 'date', '星期一 · 第 1 天');
    txt.appendChild(time);
    txt.appendChild(date);
    clock.appendChild(dial);
    clock.appendChild(txt);
    left.appendChild(clock);

    const money = el('div', 'chip money');
    money.appendChild(el('span', 'ico', '💴'));
    const mval = el('span', 'val', '¥300');
    money.appendChild(mval);
    left.appendChild(money);

    const stam = el('div');
    stam.id = 'stamina';
    stam.innerHTML = '<i></i>';
    left.appendChild(stam);

    const goal = el('div');
    goal.id = 'goal';
    goal.innerHTML = '<div class="t">当前目标</div><div class="o">—</div><div class="q"></div>';
    left.appendChild(goal);
    this.root.appendChild(left);

    const right = el('div', 'hud');
    right.id = 'hud-right';
    const place = el('div', 'chip place', '樱花町');
    right.appendChild(place);
    this.root.appendChild(right);

    const lockHint = el('div');
    lockHint.id = 'lock-hint';
    lockHint.innerHTML = '<span class="dot"></span><span>点击画面锁定鼠标，即可 360° 自由转动视角</span>';
    this.root.appendChild(lockHint);
    this.lockHint = lockHint;

    const hint = el('div');
    hint.id = 'hint-bar';
    hint.innerHTML = `<span><span class="k">E</span> 交互</span>
      <span><span class="k">J</span> 日志</span>
      <span><span class="k">H</span> 帮助</span>`;
    this.root.appendChild(hint);

    this.ui = { time, date, money: mval, place, goal, dial, stam: stam.querySelector('i') };
  }

  updateHud(s) {
    this.ui.time.textContent = s.timeText;
    this.ui.date.textContent = `${s.dayName} · 第 ${s.day} 天`;
    this.ui.money.textContent = `¥${s.money}`;
    this.ui.place.textContent = s.place;
    const g = this.ui.goal;
    if (s.goal) {
      g.style.display = '';
      g.querySelector('.o').textContent = s.goal.text;
      g.querySelector('.q').textContent = s.goal.title || '';
    } else {
      g.style.display = 'none';
    }
    if (this.ui.stam) {
      const v = Math.max(0, Math.min(100, s.stamina ?? 100));
      this.ui.stam.parentElement.style.opacity = v > 62 ? '0' : '1';
      this.ui.stam.style.width = `${v}%`;
      this.ui.stam.style.background = v > 35 ? 'var(--matcha)' : 'var(--sakura-deep)';
    }
    const h = (s.hour % 12) / 12 * 360;
    const mi = (s.minute / 60) * 360;
    this.ui.dial.style.setProperty('--h-angle', `${h}deg`);
    this.ui.dial.style.setProperty('--m-angle', `${mi}deg`);
  }

  // ------------------------------------------------------------------ 提示
  _buildPrompt() {
    const p = el('div');
    p.id = 'prompt';
    p.innerHTML = '<span class="key">E</span><span class="txt"></span><span class="sub"></span>';
    this.root.appendChild(p);
    this.prompt = p;
    this.promptTxt = p.querySelector('.txt');
    this.promptSub = p.querySelector('.sub');
  }

  setPrompt(text, sub = '') {
    if (!text) {
      this.prompt.classList.remove('on');
      return;
    }
    this.promptTxt.textContent = text;
    this.promptSub.textContent = sub || '';
    this.prompt.classList.add('on');
  }

  // ------------------------------------------------------------------ 对话
  _buildDialogue() {
    const d = el('div', 'panel');
    d.id = 'dialogue';
    d.innerHTML = `<div class="name"></div><div class="text"></div>
      <div class="next"><span class="k">E</span> 继续</div>`;
    this.root.appendChild(d);
    this.dialogue = d;
    this.dName = d.querySelector('.name');
    this.dText = d.querySelector('.text');
    this._dlg = null;
  }

  get dialogueOpen() {
    return !!this._dlg;
  }

  /** @param {{name,text,face}[]} lines @param {Function} onEnd */
  showDialogue(lines, onEnd, onLine) {
    this._dlg = { lines, i: 0, out: '', full: '', onEnd, onLine, t: 0 };
    this._block('dialogue');
    this.dialogue.classList.add('on');
    this._renderDialogue();
  }

  _renderDialogue() {
    const d = this._dlg;
    const line = d.lines[d.i];
    this.dName.textContent = line.name || '';
    this.dText.textContent = d.out;
    d.onLine?.(line);
  }

  /** @returns {boolean} true 表示对话已结束 */
  advanceDialogue(dt) {
    const d = this._dlg;
    if (!d) return false;
    const line = d.lines[d.i];
    d.t += dt;
    // 打字机
    if (d.out.length < line.text.length) {
      const speed = 42;
      const n = Math.min(line.text.length, Math.floor(d.out.length + dt * speed));
      d.out = line.text.slice(0, n);
      if (n % 3 === 0) this.onType?.();
      this._renderDialogue();
      return false;
    }
    return true;
  }

  /** 玩家按 E：文字没打完就全部显示，否则下一句 */
  nextDialogue() {
    const d = this._dlg;
    if (!d) return;
    const line = d.lines[d.i];
    if (d.out.length < line.text.length) {
      d.out = line.text;
      this._renderDialogue();
      return;
    }
    d.i++;
    d.out = '';
    d.t = 0;
    if (d.i >= d.lines.length) {
      this.endDialogue();
    } else {
      this._renderDialogue();
    }
  }

  endDialogue() {
    const d = this._dlg;
    this._dlg = null;
    this._unblock('dialogue');
    this.dialogue.classList.remove('on');
    d?.onEnd?.();
  }

  // ------------------------------------------------------------------ 提示气泡
  _buildToasts() {
    const t = el('div');
    t.id = 'toasts';
    this.root.appendChild(t);
    this.toasts = t;
  }

  toast(text, kind = '') {
    const t = el('div', `toast ${kind}`, text);
    this.toasts.appendChild(t);
    setTimeout(() => t.remove(), 3200);
    while (this.toasts.children.length > 5) this.toasts.firstChild.remove();
  }

  // ------------------------------------------------------------------ 日志
  _buildJournal() {
    const o = el('div', 'overlay');
    o.id = 'journal';
    const s = el('div', 'panel sheet');
    s.innerHTML = `<div class="close">J / Esc 关闭</div>
      <h2>樱花町 日志</h2>
      <div class="sub">镇上的日子一天天过去，值得记下来的事。</div>
      <div class="tabs"><div class="tab active" data-t="q">任务</div><div class="tab" data-t="b">背包</div><div class="tab" data-t="t">今日</div></div>
      <div class="scroll"></div>`;
    o.appendChild(s);
    this.root.appendChild(o);
    this.journal = o;
    this.journalBody = s.querySelector('.scroll');
    this.journalTabs = s.querySelectorAll('.tab');
    this._journalTab = 'q';
    this.journalTabs.forEach((t) => {
      t.style.pointerEvents = 'auto';
      t.addEventListener('click', () => {
        this._journalTab = t.dataset.t;
        this.journalTabs.forEach((x) => x.classList.toggle('active', x === t));
        this.renderJournal(this._journalData);
      });
    });
  }

  get journalOpen() {
    return this.journal.classList.contains('on');
  }

  showJournal(data) {
    this._journalData = data;
    this.renderJournal(data);
    this.journal.classList.add('on');
    this._block('journal');
  }

  hideJournal() {
    this.journal.classList.remove('on');
    this._unblock('journal');
  }

  renderJournal(data) {
    if (!data) return;
    const b = this.journalBody;
    b.innerHTML = '';
    if (this._journalTab === 'q') {
      const all = [...data.done.slice().reverse(), ...data.active, ...data.available];
      if (all.length === 0) {
        b.appendChild(el('div', 'bag-empty', '还没有接到任何事。跟镇民聊聊天吧。'));
        return;
      }
      for (const q of all) {
        const row = el('div', `quest-row ${q.status}`);
        const badge = q.status === 'done' ? '已完成' : q.status === 'active' ? `进行中 ${q.stepIndex + 1}/${q.total}` : '未开始';
        row.innerHTML = `<div class="qt"><span>${q.title}</span><span class="badge">${badge}</span></div>
          <div class="qs">${q.summary}</div>`;
        if (q.status === 'active' && q.steps?.length) {
          q.steps.forEach((s, i) => {
            const mark = i < q.stepIndex ? '✓' : i === q.stepIndex ? '▸' : '·';
            const st = el('div', 'st', `<span class="mark">${mark}</span><span>${s}</span>`);
            if (i < q.stepIndex) st.style.opacity = '0.55';
            row.appendChild(st);
          });
        }
        b.appendChild(row);
      }
    } else if (this._journalTab === 'b') {
      if (data.bag.length === 0) {
        b.appendChild(el('div', 'bag-empty', '背包是空的。'));
        return;
      }
      const grid = el('div', 'bag-grid');
      for (const it of data.bag) {
        const d = el('div', `bag-item ${data.held === it.id ? 'held' : ''} ${it.use ? 'clickable' : ''}`);
        d.innerHTML = `<span class="ic">${it.icon}</span><span class="nm">${it.name}${it.use ? `<em class="usetip">${it.use}</em>` : ''}</span><span class="ct">×${it.count}</span>`;
        d.title = it.desc || '';
        if (it.use && data.onUse) {
          d.style.pointerEvents = 'auto';
          d.style.cursor = 'pointer';
          d.addEventListener('click', () => data.onUse(it.id, it));
        }
        grid.appendChild(d);
      }
      b.appendChild(grid);
      b.appendChild(el('div', 'shop-note', data.heldName ? `手持：${data.heldName}　·　点击物品可使用` : '点击物品可使用/送出'));
    } else {
      const list = el('div', 'shop-grid');
      for (const line of data.log) {
        list.appendChild(el('div', 'bag-item', line));
      }
      if (data.log.length === 0) list.appendChild(el('div', 'bag-empty', '今天还没有发生什么特别的事。'));
      b.appendChild(list);
    }
  }

  // ------------------------------------------------------------------ 商店
  _buildShop() {
    const o = el('div', 'overlay');
    o.id = 'shop';
    const s = el('div', 'panel sheet');
    s.innerHTML = `<div class="close">E / Esc 关闭</div><h2></h2><div class="sub"></div><div class="shop-grid scroll"></div>
      <div class="shop-note"></div>`;
    o.appendChild(s);
    this.root.appendChild(o);
    this.shop = o;
    this.shopTitle = s.querySelector('h2');
    this.shopSub = s.querySelector('.sub');
    this.shopBody = s.querySelector('.shop-grid');
    this.shopNote = s.querySelector('.shop-note');
  }

  get shopOpen() {
    return this.shop.classList.contains('on');
  }

  showShop(data) {
    this._shopData = data;
    this.renderShop();
    this.shop.classList.add('on');
    this._block('shop');
  }

  hideShop() {
    this.shop.classList.remove('on');
    this._unblock('shop');
  }

  renderShop() {
    const d = this._shopData;
    if (!d) return;
    this.shopTitle.textContent = d.title;
    this.shopSub.textContent = d.sub;
    this.shopBody.innerHTML = '';
    for (const it of d.items) {
      const can = d.money >= it.price;
      const row = el('div', `shop-item ${can ? '' : 'cant'}`);
      row.innerHTML = `<span class="ic">${it.icon}</span>
        <span class="info"><span class="nm">${it.name}</span><span class="ds">${it.desc || ''}</span></span>
        <span class="pr">¥${it.price}</span>
        <span class="buy">购买</span>`;
      row.addEventListener('click', () => d.onBuy(it));
      this.shopBody.appendChild(row);
    }
    this.shopNote.textContent = `持有 ¥${d.money}`;
  }

  updateShopMoney(money) {
    if (!this._shopData) return;
    this._shopData.money = money;
    this.renderShop();
  }

  // ------------------------------------------------------------------ 钓鱼
  _buildFishing() {
    const f = el('div');
    f.id = 'fishing';
    f.innerHTML = `<div class="label"></div>
      <div class="bar"><div class="zone"></div><div class="ptr"></div><div class="prog"></div></div>`;
    this.root.appendChild(f);
    this.fishing = f;
    this.fLabel = f.querySelector('.label');
    this.fZone = f.querySelector('.zone');
    this.fPtr = f.querySelector('.ptr');
    this.fProg = f.querySelector('.prog');
  }

  setFishing(h) {
    if (!h) {
      this.fishing.classList.remove('on');
      return;
    }
    this.fishing.classList.add('on');
    const labels = {
      casting: '抛竿中……',
      waiting: '等待咬钩……（有动静就按 E）',
      bite: '咬钩了！！快按 E！',
      reel: '按住 E 收线，别让指针离开绿区',
      result: '',
    };
    this.fLabel.textContent = labels[h.state] || '';
    const showBar = h.state === 'reel';
    this.fZone.style.display = showBar ? '' : 'none';
    this.fPtr.style.display = showBar ? '' : 'none';
    this.fProg.style.display = showBar ? '' : 'none';
    if (showBar) {
      this.fZone.style.left = `${(h.zone - h.zoneHalf) * 100}%`;
      this.fZone.style.width = `${h.zoneHalf * 200}%`;
      this.fPtr.style.left = `${h.pointer * 100}%`;
      this.fProg.style.width = `${h.progress * 100}%`;
    }
  }

  // ------------------------------------------------------------------ 转场
  _buildFade() {
    const f = el('div');
    f.id = 'fade';
    f.innerHTML = '<div class="msg"></div>';
    this.root.appendChild(f);
    this.fade = f;
    this.fadeMsg = f.querySelector('.msg');
  }

  fadeTo(on, msg = '') {
    if (msg) this.fadeMsg.innerHTML = msg;
    this.fade.classList.toggle('on', on);
  }

  // ------------------------------------------------------------------ 帮助
  _buildHelp() {
    const o = el('div', 'overlay');
    o.id = 'help';
    const s = el('div', 'panel sheet');
    s.innerHTML = `<div class="close">H / Esc 关闭</div><h2>操作说明</h2>
      <div class="sub">在樱花町生活，你需要知道的就这些。</div>
      <div class="help-grid"></div>`;
    const g = s.querySelector('.help-grid');
    const sections = [
      ['移动', [['WASD / 方向键', '走动'], ['Shift', '跑步'], ['Ctrl / C', '慢走（安静）']]],
      ['视角与相机', [['鼠标移动', '转动视角（点击画面锁定鼠标）'], ['滚轮', '拉近 / 拉远'], ['Q / E', '左右转视角（E 同时也是交互键）']]],
      ['互动', [['E', '进入建筑 · 对话 · 买东西 · 采集 · 钓鱼'], ['F', '把手持物品递给面前的人'], ['J', '查看日志与背包'], ['K', '设置（灵敏度 / 音量 / 画质）'], ['H', '本说明'], ['Esc', '关闭面板 / 起身']],],
      ['生活', [['在床铺上睡觉', '会推进到第二天早上'], ['钓鱼', '抛竿后等咬钩，咬钩瞬间按 E'], ['铁路', '列车进站前道口会警铃 + 落杆，请勿抢行'], ['镇民', '每个人都有作息，早晚都可能遇到不同的人']]],
    ];
    for (const [title, rows] of sections) {
      g.appendChild(el('div', 'help-sec', title));
      for (const [k, v] of rows) {
        g.appendChild(el('div', 'k', k));
        g.appendChild(el('div', null, v));
      }
    }
    o.appendChild(s);
    this.root.appendChild(o);
    this.help = o;
  }

  get helpOpen() {
    return this.help.classList.contains('on');
  }

  showHelp() {
    this.help.classList.add('on');
    this._block('help');
  }

  hideHelp() {
    this.help.classList.remove('on');
    this._unblock('help');
  }

  // ------------------------------------------------------------------ 小地图
  _buildMinimap() {
    const d = el('div');
    d.id = 'minimap';
    const cv = el('canvas');
    cv.width = 296;
    cv.height = 296;
    d.appendChild(cv);
    this.root.appendChild(d);
    this.mapCanvas = cv;
    this.mapCtx = cv.getContext('2d');
    this._mapStatic = null;
  }

  _renderStaticMap() {
    const S = 512;
    const c = document.createElement('canvas');
    c.width = S;
    c.height = S;
    const g = c.getContext('2d');
    const span = 230; // 地图覆盖的世界范围
    const toPx = (x, z) => [((x + span / 2) / span) * S, ((z + span / 2) / span) * S];
    g.fillStyle = '#d8e2c8';
    g.fillRect(0, 0, S, S);

    // 河
    g.strokeStyle = '#8fc4dc';
    g.lineWidth = 9;
    g.lineJoin = 'round';
    g.beginPath();
    const rp = makePolyline2D(RIVER_CTRL, 4);
    rp.forEach((p, i) => {
      const [px, py] = toPx(p.x, p.z);
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    });
    g.stroke();

    // 路
    g.strokeStyle = '#f0ece0';
    g.lineCap = 'round';
    for (const r of ROADS) {
      g.lineWidth = r.style === 'stone' ? 3 : r.style === 'dirt' ? 2.5 : 4.5;
      g.beginPath();
      const pts = makePolyline2D(r.pts, 6);
      pts.forEach((p, i) => {
        const [px, py] = toPx(p.x, p.z);
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      });
      g.stroke();
    }

    // 铁轨
    g.strokeStyle = '#8a7f74';
    g.lineWidth = 3;
    g.beginPath();
    const tp = makePolyline2D(RAIL_CTRL, 5);
    tp.forEach((p, i) => {
      const [px, py] = toPx(p.x, p.z);
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    });
    g.stroke();

    // 建筑
    for (const b of BUILDINGS) {
      const c2 = Math.cos(b.rot || 0);
      const s2 = Math.sin(b.rot || 0);
      const hw = b.w / 2 + 0.6;
      const hd = b.d / 2 + 0.6;
      const pts = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]].map(([lx, lz]) => [
        b.x + lx * c2 + lz * s2,
        b.z - lx * s2 + lz * c2,
      ]);
      g.beginPath();
      pts.forEach(([x, z], i) => {
        const [px, py] = toPx(x, z);
        if (i === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      });
      g.closePath();
      g.fillStyle = b.enterable ? '#d86a7a' : '#b09a86';
      g.fill();
      g.strokeStyle = 'rgba(70,50,60,0.45)';
      g.lineWidth = 1.2;
      g.stroke();
    }
    this._mapStatic = c;
    this._mapSpan = span;
  }

  updateMinimap(player, npcs, trainHead, night = 0) {
    if (!this._mapStatic) this._renderStaticMap();
    const S = this.mapCanvas.width;
    const g = this.mapCtx;
    g.clearRect(0, 0, S, S);
    g.save();
    g.beginPath();
    g.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
    g.clip();
    const view = 96; // 视野世界尺寸
    const scale = S / view;
    g.translate(S / 2, S / 2);
    g.scale(scale, scale);
    g.translate(-player.x, -player.z);
    g.imageSmoothingEnabled = true;
    g.drawImage(this._mapStatic, -this._mapSpan / 2, -this._mapSpan / 2, this._mapSpan, this._mapSpan);

    // NPC
    g.fillStyle = '#3f6a8a';
    for (const n of npcs) {
      if (!n.visible) continue;
      g.beginPath();
      g.arc(n.x, n.z, 1.5, 0, Math.PI * 2);
      g.fill();
    }
    // 列车
    if (trainHead) {
      g.fillStyle = '#3f7fb5';
      g.beginPath();
      g.arc(trainHead.x, trainHead.z, 2.6, 0, Math.PI * 2);
      g.fill();
    }
    // 玩家
    g.fillStyle = '#c85b7c';
    g.strokeStyle = '#fff';
    g.lineWidth = 0.8;
    g.beginPath();
    g.arc(player.x, player.z, 2.6, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    // 朝向
    g.beginPath();
    g.moveTo(player.x, player.z);
    g.lineTo(player.x + Math.sin(player.yaw) * 6, player.z + Math.cos(player.yaw) * 6);
    g.strokeStyle = '#c85b7c';
    g.lineWidth = 1.2;
    g.stroke();
    g.restore();
    // 夜里给地图压一层夜色
    if (night > 0.02) {
      g.save();
      g.beginPath();
      g.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
      g.clip();
      g.fillStyle = `rgba(18,28,64,${0.46 * night})`;
      g.fillRect(0, 0, S, S);
      g.restore();
    }
  }

  /** 只有在户外、没有面板、且鼠标未锁定时才提示 */
  setLockHint(on) {
    if (this._lockHintOn === on) return;
    this._lockHintOn = on;
    this.lockHint.classList.toggle('on', on);
  }

  setHintsVisible(on) {
    const e = this.root.querySelector('#hint-bar');
    if (e) e.style.opacity = on ? '' : '0';
  }

  setMinimapVisible(on) {
    const e = this.root.querySelector('#minimap');
    if (e) e.style.opacity = on ? '' : '0';
  }

  setHudVisible(on) {
    for (const id of ['hud-left', 'hud-right', 'minimap', 'hint-bar', 'lock-hint']) {
      const e = this.root.querySelector(`#${id}`);
      if (e) e.style.opacity = on ? '' : '0';
    }
  }
}
