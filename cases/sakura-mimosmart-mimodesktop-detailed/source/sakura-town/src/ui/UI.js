/**
 * DOM UI layer: clock, stats, quests, toasts, dialogue, map, hints.
 */
export class UI {
  constructor(game) {
    this.game = game;
    this.els = {
      hud: document.getElementById('hud'),
      clockTime: document.getElementById('clock-time'),
      clockDay: document.getElementById('clock-day'),
      clockDate: document.getElementById('clock-date'),
      clockWeather: document.getElementById('clock-weather'),
      statMoney: document.getElementById('stat-money'),
      statBond: document.getElementById('stat-bond'),
      statHelps: document.getElementById('stat-helps'),
      questList: document.getElementById('quest-list'),
      interactHint: document.getElementById('interact-hint'),
      interactText: document.getElementById('interact-text'),
      toastStack: document.getElementById('toast-stack'),
      dialogue: document.getElementById('dialogue'),
      dialogueSpeaker: document.getElementById('dialogue-speaker'),
      dialogueText: document.getElementById('dialogue-text'),
      dialogueChoices: document.getElementById('dialogue-choices'),
      mapOverlay: document.getElementById('map-overlay'),
      mapCanvasWrap: document.getElementById('map-canvas-wrap'),
      mapLegend: document.getElementById('map-legend'),
      fade: document.getElementById('fade'),
      title: document.getElementById('title-screen'),
      loadingFill: document.getElementById('loading-fill'),
    };
    this.toasts = [];
  }

  showHUD() {
    this.els.hud.style.display = 'block';
    this.els.title.classList.add('hidden');
  }

  setLoading(pct) {
    if (this.els.loadingFill) this.els.loadingFill.style.width = `${Math.round(pct * 100)}%`;
  }

  updateClock(timeSys, weatherSys) {
    this.els.clockTime.textContent = timeSys.format();
    this.els.clockDay.textContent = timeSys.dayOfWeek;
    this.els.clockDate.textContent = timeSys.dateLabel;
    this.els.clockWeather.textContent = weatherSys.name;
  }

  updateStats(worldState) {
    this.els.statMoney.textContent = `¥${worldState.money.toLocaleString()}`;
    this.els.statBond.textContent = String(worldState.bond);
    this.els.statHelps.textContent = String(worldState.helpsCompleted);
  }

  renderQuests(quests) {
    const root = this.els.questList;
    root.innerHTML = '';
    const visible = quests.filter((q) => !q.done).slice(0, 4);
    const done = quests.filter((q) => q.done).slice(-1);
    for (const q of [...visible, ...done]) {
      const div = document.createElement('div');
      div.className = 'quest-item' + (q.done ? ' done' : '');
      div.innerHTML = `<strong>${q.title}</strong><br><span style="opacity:.85;font-size:12px">${q.desc}</span>`;
      root.appendChild(div);
    }
    if (!root.children.length) {
      root.innerHTML = '<div class="quest-item" style="opacity:.6">在小镇里走走，事情会自然出现。</div>';
    }
  }

  showInteractHint(hint) {
    if (!hint) {
      this.els.interactHint.classList.remove('visible');
      return;
    }
    this.els.interactText.textContent = hint.label;
    this.els.interactHint.classList.add('visible');
  }

  toast(msg, duration = 3200) {
    const div = document.createElement('div');
    div.className = 'toast';
    div.textContent = msg;
    this.els.toastStack.appendChild(div);
    setTimeout(() => {
      div.style.opacity = '0';
      div.style.transition = 'opacity .4s';
      setTimeout(() => div.remove(), 400);
    }, duration);
  }

  showDialogue(speaker, text, choices) {
    this.els.dialogue.classList.add('visible');
    this.els.dialogueSpeaker.textContent = speaker;
    this.els.dialogueText.textContent = text;
    const box = this.els.dialogueChoices;
    box.innerHTML = '';
    if (choices && choices.length) {
      for (const c of choices) {
        const btn = document.createElement('button');
        btn.className = 'dialogue-choice';
        btn.textContent = c.label;
        btn.addEventListener('click', () => c.action());
        box.appendChild(btn);
      }
    }
  }

  hideDialogue() {
    this.els.dialogue.classList.remove('visible');
    this.els.dialogueChoices.innerHTML = '';
  }

  showMap(show = true) {
    this.els.mapOverlay.classList.toggle('visible', show);
    if (show) {
      this.drawMap();
    } else if (this.els.mapCanvasWrap) {
      this.els.mapCanvasWrap.innerHTML = '';
    }
  }

  drawMap() {
    const wrap = this.els.mapCanvasWrap;
    wrap.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'map-canvas';
    canvas.width = 640;
    canvas.height = 420;
    canvas.style.maxWidth = '100%';
    wrap.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#2a3a4a');
    grad.addColorStop(1, '#3a4a52');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // map layout → canvas (layout is roughly -60..60)
    const scale = 3.2;
    const cx = w / 2;
    const cy = h / 2;
    const toMap = (x, z) => [cx + x * scale, cy + z * scale];

    // roads (simplified ring)
    ctx.strokeStyle = '#6a7078';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    const ring = [
      [0, -38], [22, -34], [38, -18], [42, 2], [36, 22], [18, 36],
      [-4, 40], [-26, 34], [-40, 16], [-42, -6], [-32, -28], [-14, -38],
    ];
    ctx.beginPath();
    ring.forEach(([x, z], i) => {
      const [mx, my] = toMap(x, z);
      if (i === 0) ctx.moveTo(mx, my);
      else ctx.lineTo(mx, my);
    });
    ctx.closePath();
    ctx.stroke();

    // railway
    ctx.strokeStyle = '#2a2a30';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    const rail = [
      [8, -52], [32, -48], [52, -28], [58, 0], [52, 28], [32, 48],
      [4, 56], [-26, 50], [-48, 30], [-56, 2], [-50, -26], [-28, -46], [-2, -54], [8, -52],
    ];
    rail.forEach(([x, z], i) => {
      const [mx, my] = toMap(x, z);
      if (i === 0) ctx.moveTo(mx, my);
      else ctx.lineTo(mx, my);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // river
    ctx.strokeStyle = '#4a8ab0';
    ctx.lineWidth = 8;
    ctx.beginPath();
    const river = [[-20, -48], [4, -42], [16, -40], [28, -36], [44, -20]];
    river.forEach(([x, z], i) => {
      const [mx, my] = toMap(x, z);
      if (i === 0) ctx.moveTo(mx, my);
      else ctx.lineTo(mx, my);
    });
    ctx.stroke();

    // places
    const places = [
      { id: 'station', name: '桜町駅', x: 0, z: -4, color: '#e0c040' },
      { id: 'konbini', name: '便利店', x: -20, z: -14, color: '#4a90c0' },
      { id: 'cafe', name: '咖啡店', x: 16, z: -8, color: '#c45c48' },
      { id: 'school', name: '学校', x: 36, z: 22, color: '#6a8a5a' },
      { id: 'park', name: '公园', x: 12, z: -18, color: '#e080a0' },
      { id: 'shrine', name: '神社', x: -32, z: 34, color: '#d06040' },
      { id: 'clinic', name: '诊所', x: -28, z: 2, color: '#e8e8e8' },
      { id: 'shop', name: '商店街', x: 2, z: -28, color: '#c0a060' },
    ];

    for (const p of places) {
      const [mx, my] = toMap(p.x, p.z);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(mx, my, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f5f1ea';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.name, mx, my + 22);
    }

    // player
    const player = this.game.player;
    if (player) {
      const [mx, my] = toMap(player.x, player.z);
      ctx.fillStyle = '#fff8e0';
      ctx.beginPath();
      ctx.arc(mx, my, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#2a2a30';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // legend
    const legend = this.els.mapLegend;
    legend.innerHTML = `
      <div class="legend-item"><div class="legend-dot" style="background:#fff8e0"></div>你的位置</div>
      <div class="legend-item"><div class="legend-dot" style="background:#e0c040"></div>车站</div>
      <div class="legend-item"><div class="legend-dot" style="background:#e080a0"></div>公园樱花</div>
      <div class="legend-item"><div class="legend-dot" style="background:#4a8ab0"></div>河川</div>
      <div class="legend-item"><div class="legend-dot" style="background:#2a2a30"></div>铁道</div>
    `;
  }

  fade(visible, duration = 600) {
    this.els.fade.style.transition = `opacity ${duration}ms ease`;
    this.els.fade.classList.toggle('visible', visible);
  }
}
