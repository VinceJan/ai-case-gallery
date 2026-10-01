/**
 * 设置面板（自包含）
 *
 * 刻意做成一个独立模块：不改 ui.js / style.css，所有 DOM 与样式都在这里，
 * 通过 opts 拿到的 input / audio / engine 实例去生效。
 * 颜色一律走 style.css 里已有的 CSS 变量，保证和现有 UI 同一套观感。
 */

export const SETTINGS_DEFAULTS = {
  sensitivity: 1.0,     // 0.4 ~ 2.5
  invertY: false,
  volume: 0.7,          // 0 ~ 1
  muted: false,
  quality: 'balanced',   // low | balanced | high
  showHints: true,
};

const STORAGE_KEY = 'sakura-town-settings';

const STYLE = `
.stp-mask{position:absolute;inset:0;background:rgba(40,30,44,.55);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;z-index:34;pointer-events:auto}
.stp-mask.on{display:flex}
.stp-card{width:min(460px,92vw);max-height:86vh;overflow:hidden auto;position:relative;
  background:linear-gradient(160deg,var(--paper) 0%,var(--paper-2) 100%);
  border:2px solid rgba(200,91,124,.35);border-radius:16px;box-shadow:var(--shadow);
  padding:20px 24px 18px;color:var(--ink);font-family:var(--font);
  animation:stpIn .2s ease}
.stp-mask.on .stp-card{animation:stpIn .2s ease}
@keyframes stpIn{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
.stp-card::after{content:"";position:absolute;inset:4px;border:1px solid rgba(200,91,124,.16);border-radius:12px;pointer-events:none}
.stp-head{display:flex;align-items:baseline;gap:10px;margin-bottom:2px}
.stp-head h2{margin:0;font-family:var(--font-title);font-size:23px;letter-spacing:.1em;color:var(--sakura-deep)}
.stp-sub{font-size:12px;color:var(--ink-soft);margin-bottom:14px}
.stp-close{margin-left:auto;font-size:12px;color:var(--ink-soft);background:rgba(0,0,0,.05);
  border:none;border-radius:999px;padding:4px 12px;cursor:pointer;font-family:var(--font)}
.stp-close:hover{background:rgba(200,91,124,.14);color:var(--sakura-deep)}
.stp-sec{font-size:11.5px;font-weight:800;letter-spacing:.14em;color:var(--sakura-deep);margin:16px 0 7px}
.stp-sec:first-of-type{margin-top:4px}
.stp-row{display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:11px;margin-bottom:6px;
  background:rgba(255,255,255,.55);border:1px solid transparent}
.stp-row:hover{border-color:rgba(232,127,157,.32)}
.stp-lbl{flex:1;min-width:0}
.stp-lbl .n{font-size:14px;font-weight:600}
.stp-lbl .d{font-size:11.5px;color:var(--ink-soft);margin-top:2px;line-height:1.4}
.stp-val{font-size:13px;font-weight:700;color:var(--sakura-deep);font-variant-numeric:tabular-nums;min-width:46px;text-align:right}
.stp-row input[type=range]{width:132px;accent-color:var(--sakura);cursor:pointer}
.stp-row input[type=range]:focus-visible{outline:2px solid var(--sakura-deep);outline-offset:3px;border-radius:4px}
.stp-row.disabled{opacity:.45}
.stp-row input[type=checkbox]{width:19px;height:19px;accent-color:var(--sakura-deep);cursor:pointer;flex:none}
.stp-row input[type=checkbox]:focus-visible{outline:2px solid var(--sakura-deep);outline-offset:3px}
.stp-seg{display:flex;gap:4px;background:rgba(0,0,0,.05);border-radius:999px;padding:3px}
.stp-seg button{border:none;background:transparent;font-family:var(--font);font-size:12.5px;font-weight:700;
  color:var(--ink-soft);padding:5px 13px;border-radius:999px;cursor:pointer}
.stp-seg button.on{background:var(--sakura-deep);color:#fff}
.stp-seg button:focus-visible{outline:2px solid var(--sakura-deep);outline-offset:2px}
.stp-foot{display:flex;align-items:center;gap:10px;margin-top:16px;padding-top:12px;border-top:1px solid rgba(0,0,0,.07)}
.stp-reset{border:none;background:rgba(0,0,0,.06);color:var(--ink-soft);font-family:var(--font);
  font-size:12.5px;font-weight:700;padding:6px 14px;border-radius:999px;cursor:pointer}
.stp-reset:hover{background:rgba(200,91,124,.14);color:var(--sakura-deep)}
.stp-note{margin-left:auto;font-size:11.5px;color:var(--ink-soft)}
.stp-card button:focus-visible,.stp-close:focus-visible{outline:2px solid var(--sakura-deep);outline-offset:2px}
`;

let styleInjected = false;
function injectStyle(doc) {
  if (styleInjected) return;
  styleInjected = true;
  const el = doc.createElement('style');
  el.id = 'stp-style';
  el.textContent = STYLE;
  doc.head.appendChild(el);
}

const QUALITY_PRESETS = {
  low: { shadow: false, dpr: 1 },
  balanced: { shadow: true, dpr: 1.5 },
  high: { shadow: true, dpr: 2 },
};

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    return o && typeof o === 'object' ? o : {};
  } catch (e) {
    return {};
  }
}

export class SettingsPanel {
  constructor(opts = {}) {
    this.root = opts.root || document.body;
    this.input = opts.input || null;
    this.audio = opts.audio || null;
    this.engine = opts.engine || null;
    this.onChange = opts.onChange || null;

    this.values = { ...SETTINGS_DEFAULTS, ...loadStored() };
    this._open = false;
    this._built = false;
    this._els = {};
  }

  // -------------------------------------------------------------- 生命周期
  mount() {
    if (this._built) return this;
    injectStyle(document);

    const mask = document.createElement('div');
    mask.className = 'stp-mask';
    mask.innerHTML = `
      <div class="stp-card" role="dialog" aria-modal="true" aria-label="设置">
        <div class="stp-head"><h2>设置</h2>
          <button class="stp-close" type="button" aria-label="关闭设置">Esc 关闭</button></div>
        <div class="stp-sub">改完立即生效，并会自动保存。</div>

        <div class="stp-sec">视角</div>
        <div class="stp-row" data-k="sensitivity">
          <div class="stp-lbl"><div class="n">鼠标灵敏度</div><div class="d">越高转得越快</div></div>
          <input type="range" min="0.4" max="2.5" step="0.05" aria-label="鼠标灵敏度">
          <div class="stp-val"></div>
        </div>
        <div class="stp-row" data-k="invertY">
          <div class="stp-lbl"><div class="n">反转 Y 轴</div><div class="d">上下转视角时方向相反</div></div>
          <input type="checkbox" aria-label="反转 Y 轴">
        </div>

        <div class="stp-sec">声音</div>
        <div class="stp-row" data-k="volume">
          <div class="stp-lbl"><div class="n">主音量</div></div>
          <input type="range" min="0" max="1" step="0.05" aria-label="主音量">
          <div class="stp-val"></div>
        </div>
        <div class="stp-row" data-k="muted">
          <div class="stp-lbl"><div class="n">静音</div></div>
          <input type="checkbox" aria-label="静音">
        </div>

        <div class="stp-sec">画面</div>
        <div class="stp-row" data-k="quality">
          <div class="stp-lbl"><div class="n">画质</div><div class="d">低画质关闭阴影，帧数更稳</div></div>
          <div class="stp-seg">
            <button type="button" data-v="low">低</button>
            <button type="button" data-v="balanced">均衡</button>
            <button type="button" data-v="high">高清</button>
          </div>
        </div>
        <div class="stp-row" data-k="showHints">
          <div class="stp-lbl"><div class="n">显示操作提示</div><div class="d">屏幕底部的按键条</div></div>
          <input type="checkbox" aria-label="显示操作提示">
        </div>

        <div class="stp-foot">
          <button class="stp-reset" type="button">恢复默认</button>
          <div class="stp-note">设置会自动保存</div>
        </div>
      </div>`;
    this.root.appendChild(mask);

    this._els.mask = mask;
    this._els.card = mask.querySelector('.stp-card');
    this._els.close = mask.querySelector('.stp-close');
    this._els.reset = mask.querySelector('.stp-reset');
    this._els.segBtns = [...mask.querySelectorAll('.stp-seg button')];

    for (const row of mask.querySelectorAll('.stp-row')) {
      const k = row.dataset.k;
      this._els[k] = {
        row,
        range: row.querySelector('input[type=range]'),
        check: row.querySelector('input[type=checkbox]'),
        val: row.querySelector('.stp-val'),
      };
    }

    // 事件
    this._els.mask.addEventListener('mousedown', (e) => {
      if (e.target === this._els.mask) this.close();
    });
    this._els.close.addEventListener('click', () => this.close());
    this._els.reset.addEventListener('click', () => this.reset());

    for (const k of ['sensitivity', 'volume']) {
      const r = this._els[k].range;
      r.addEventListener('input', () => this.set(k, parseFloat(r.value), { silent: true }));
      r.addEventListener('change', () => this.set(k, parseFloat(r.value)));
    }
    for (const k of ['invertY', 'muted', 'showHints']) {
      this._els[k].check.addEventListener('change', () => this.set(k, this._els[k].check.checked));
    }
    for (const b of this._els.segBtns) {
      b.addEventListener('click', () => this.set('quality', b.dataset.v));
    }

    this._built = true;
    // 用存储里的值静默同步一次，让游戏启动就生效
    for (const k of Object.keys(this.values)) this.set(k, this.values[k], { silent: true });
    this._syncDom();
    return this;
  }

  unmount() {
    this._els.mask?.remove();
    this._built = false;
    this._open = false;
  }

  open() {
    this.mount();
    this._open = true;
    this._els.mask.classList.add('on');
    this._syncDom();
    // 焦点给第一个控件，方便键盘操作
    try { this._els.sensitivity?.range?.focus(); } catch (e) { /* 忽略 */ }
    this.audio?.uiOpen?.();
    this.onChange?.('__open', true);
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this._els.mask.classList.remove('on');
    this.audio?.uiClose?.();
    this.onChange?.('__open', false);
  }

  toggle() {
    if (this._open) this.close();
    else this.open();
    return this._open;
  }

  isOpen() {
    return this._open;
  }

  // -------------------------------------------------------------- 读写
  get(key) {
    return this.values[key];
  }

  set(key, value, { silent = false } = {}) {
    if (key === '__open' || !(key in SETTINGS_DEFAULTS)) return;
    let v = value;
    if (key === 'sensitivity') v = Math.max(0.4, Math.min(2.5, parseFloat(v) || 1));
    else if (key === 'volume') v = Math.max(0, Math.min(1, parseFloat(v) || 0));
    else if (key === 'quality') v = QUALITY_PRESETS[v] ? v : 'balanced';
    else v = !!v;

    if (this.values[key] === v) {
      this._syncDom();
      return;
    }
    this.values[key] = v;
    this._apply(key);
    this._syncDom();
    this._persist();
    if (!silent) this.onChange?.(key, v);
  }

  reset() {
    for (const k of Object.keys(SETTINGS_DEFAULTS)) this.set(k, SETTINGS_DEFAULTS[k]);
    this.audio?.uiTick?.();
    this.onChange?.('__reset', true);
  }

  isDirty() {
    return Object.keys(SETTINGS_DEFAULTS).some((k) => this.values[k] !== SETTINGS_DEFAULTS[k]);
  }

  // -------------------------------------------------------------- 内部
  _apply(key) {
    const v = this.values[key];
    switch (key) {
      case 'sensitivity':
        if (this.input) this.input.sensitivity = v;
        break;
      case 'invertY':
        if (this.input) this.input.invertY = v;
        break;
      case 'volume':
        if (this.audio) {
          if (this.audio.setMasterVolume) this.audio.setMasterVolume(v);
          else this.audio.setVolume?.(v);
        }
        break;
      case 'muted':
        if (this.audio) {
          if (this.audio.setMuted) this.audio.setMuted(v);
          else this.audio.setEnabled?.(!v);
        }
        break;
      case 'quality': {
        const p = QUALITY_PRESETS[v];
        const r = this.engine?.renderer;
        if (!r) break;
        r.shadowMap.enabled = p.shadow;
        r.setPixelRatio(Math.min(window.devicePixelRatio || 1, p.dpr));
        // 阴影开关变化后需要让材质重新编译
        r.shadowMap.needsUpdate = true;
        this.scene?.traverse?.((o) => { if (o.material) o.material.needsUpdate = true; });
        break;
      }
      default:
        break;
    }
  }

  _syncDom() {
    if (!this._built) return;
    const set = (k) => {
      const e = this._els[k];
      if (!e) return;
      const v = this.values[k];
      if (e.range) e.range.value = v;
      if (e.check) e.check.checked = v;
      if (e.val) e.val.textContent = k === 'volume' ? `${Math.round(v * 100)}%` : Number(v).toFixed(2);
    };
    set('sensitivity');
    set('invertY');
    set('volume');
    set('muted');
    set('showHints');
    // 静音时音量条置灰
    const vr = this._els.volume?.row;
    if (vr) vr.classList.toggle('disabled', this.values.muted);
    for (const b of this._els.segBtns || []) b.classList.toggle('on', b.dataset.v === this.values.quality);
  }

  _persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values));
    } catch (e) { /* 隐私模式下静默失败 */ }
  }
}
