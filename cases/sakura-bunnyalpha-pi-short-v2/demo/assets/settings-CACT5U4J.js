const n={sensitivity:1,invertY:!1,volume:.7,muted:!1,quality:"balanced",showHints:!0},d="sakura-town-settings",p=`
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
`;let r=!1;function c(a){if(r)return;r=!0;const t=a.createElement("style");t.id="stp-style",t.textContent=p,a.head.appendChild(t)}const l={low:{shadow:!1,dpr:1},balanced:{shadow:!0,dpr:1.5},high:{shadow:!0,dpr:2}};function u(){try{const a=localStorage.getItem(d);if(!a)return{};const t=JSON.parse(a);return t&&typeof t=="object"?t:{}}catch{return{}}}class v{constructor(t={}){this.root=t.root||document.body,this.input=t.input||null,this.audio=t.audio||null,this.engine=t.engine||null,this.onChange=t.onChange||null,this.values={...n,...u()},this._open=!1,this._built=!1,this._els={}}mount(){if(this._built)return this;c(document);const t=document.createElement("div");t.className="stp-mask",t.innerHTML=`
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
      </div>`,this.root.appendChild(t),this._els.mask=t,this._els.card=t.querySelector(".stp-card"),this._els.close=t.querySelector(".stp-close"),this._els.reset=t.querySelector(".stp-reset"),this._els.segBtns=[...t.querySelectorAll(".stp-seg button")];for(const s of t.querySelectorAll(".stp-row")){const i=s.dataset.k;this._els[i]={row:s,range:s.querySelector("input[type=range]"),check:s.querySelector("input[type=checkbox]"),val:s.querySelector(".stp-val")}}this._els.mask.addEventListener("mousedown",s=>{s.target===this._els.mask&&this.close()}),this._els.close.addEventListener("click",()=>this.close()),this._els.reset.addEventListener("click",()=>this.reset());for(const s of["sensitivity","volume"]){const i=this._els[s].range;i.addEventListener("input",()=>this.set(s,parseFloat(i.value),{silent:!0})),i.addEventListener("change",()=>this.set(s,parseFloat(i.value)))}for(const s of["invertY","muted","showHints"])this._els[s].check.addEventListener("change",()=>this.set(s,this._els[s].check.checked));for(const s of this._els.segBtns)s.addEventListener("click",()=>this.set("quality",s.dataset.v));this._built=!0;for(const s of Object.keys(this.values))this.set(s,this.values[s],{silent:!0});return this._syncDom(),this}unmount(){this._els.mask?.remove(),this._built=!1,this._open=!1}open(){this.mount(),this._open=!0,this._els.mask.classList.add("on"),this._syncDom();try{this._els.sensitivity?.range?.focus()}catch{}this.audio?.uiOpen?.(),this.onChange?.("__open",!0)}close(){this._open&&(this._open=!1,this._els.mask.classList.remove("on"),this.audio?.uiClose?.(),this.onChange?.("__open",!1))}toggle(){return this._open?this.close():this.open(),this._open}isOpen(){return this._open}get(t){return this.values[t]}set(t,s,{silent:i=!1}={}){if(t==="__open"||!(t in n))return;let e=s;if(t==="sensitivity"?e=Math.max(.4,Math.min(2.5,parseFloat(e)||1)):t==="volume"?e=Math.max(0,Math.min(1,parseFloat(e)||0)):t==="quality"?e=l[e]?e:"balanced":e=!!e,this.values[t]===e){this._syncDom();return}this.values[t]=e,this._apply(t),this._syncDom(),this._persist(),i||this.onChange?.(t,e)}reset(){for(const t of Object.keys(n))this.set(t,n[t]);this.audio?.uiTick?.(),this.onChange?.("__reset",!0)}isDirty(){return Object.keys(n).some(t=>this.values[t]!==n[t])}_apply(t){const s=this.values[t];switch(t){case"sensitivity":this.input&&(this.input.sensitivity=s);break;case"invertY":this.input&&(this.input.invertY=s);break;case"volume":this.audio&&(this.audio.setMasterVolume?this.audio.setMasterVolume(s):this.audio.setVolume?.(s));break;case"muted":this.audio&&(this.audio.setMuted?this.audio.setMuted(s):this.audio.setEnabled?.(!s));break;case"quality":{const i=l[s],e=this.engine?.renderer;if(!e)break;e.shadowMap.enabled=i.shadow,e.setPixelRatio(Math.min(window.devicePixelRatio||1,i.dpr)),e.shadowMap.needsUpdate=!0,this.scene?.traverse?.(o=>{o.material&&(o.material.needsUpdate=!0)});break}}}_syncDom(){if(!this._built)return;const t=i=>{const e=this._els[i];if(!e)return;const o=this.values[i];e.range&&(e.range.value=o),e.check&&(e.check.checked=o),e.val&&(e.val.textContent=i==="volume"?`${Math.round(o*100)}%`:Number(o).toFixed(2))};t("sensitivity"),t("invertY"),t("volume"),t("muted"),t("showHints");const s=this._els.volume?.row;s&&s.classList.toggle("disabled",this.values.muted);for(const i of this._els.segBtns||[])i.classList.toggle("on",i.dataset.v===this.values.quality)}_persist(){try{localStorage.setItem(d,JSON.stringify(this.values))}catch{}}}export{n as SETTINGS_DEFAULTS,v as SettingsPanel};
