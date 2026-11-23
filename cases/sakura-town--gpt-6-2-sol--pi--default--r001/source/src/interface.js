import { riverX, riverWidth } from './world.js';

export const $=id=>document.getElementById(id);
const mapX=x=>107+x*2.98, mapZ=z=>72+z*1.86;
const riverLine=(side=0)=>Array.from({length:76},(_,i)=>mapX(riverX(i-38)+side*riverWidth(i-38)/2).toFixed(1)+','+mapZ(i-38).toFixed(1)).join(' ');
function mapMarkup(){
  const leaves=Array.from({length:28},(_,i)=>{
    const x=(i*613%219), z=(i*263%141);
    if(x>62&&x<164&&z>37&&z<118)return '';
    return `<circle cx="${x}" cy="${z}" r="${3+i%5}" fill="${i%2?'#bdcfa7':'#cbd7b1'}"/>`;
  }).join('');
  return `<rect width="220" height="142" rx="8" fill="#e7e8ce"/>
  <path d="M0 48 17 33l16 4L56 9l17 16L96 4l16 24 15-12 26 14 22-26 19 27 26 3v-34H0Z" fill="#c4d4b1"/>
  <path d="M0 80q28 23 32 55l47 7H0Zm220-16q-19 9-25 28-13 25-7 50h32Z" fill="#c6d4ad"/>
  <g opacity=".76">${leaves}</g>
  <polyline points="${riverLine()}" fill="none" stroke="#82b6aa" stroke-width="17" stroke-linecap="round"/>
  <polyline points="${riverLine(.19)}" fill="none" stroke="#a9cdba" stroke-width="3"/>
  <path d="M110 14v119M18 83h136" fill="none" stroke="#cbc1a4" stroke-width="14"/>
  <path d="M110 14v119M18 83h136" fill="none" stroke="#f3ebd4" stroke-width="9"/>
  <path d="M7 48h206" stroke="#898a7d" stroke-width="5"/><path d="M7 48h206" stroke="#f5ebd2" stroke-width="2.5" stroke-dasharray="3 3"/>
  <rect x="119" y="31" width="31" height="11" rx="3" fill="#819a8a" stroke="#fff7df"/>
  <rect x="70" y="66" width="26" height="14" rx="3" fill="#b98376" stroke="#fff7df"/>
  <path d="M135 54h18v14h-18zM39 59h19v14H39zM50 102h22v12H50z" fill="#bfb79b" stroke="#fff7df" stroke-linejoin="round" stroke-width="2"/>
  <g fill="#d99493" stroke="#fff0df" stroke-width="1.15"><circle cx="66" cy="89" r="4"/><circle cx="94" cy="102" r="5"/><circle cx="134" cy="98" r="4"/><circle cx="151" cy="55" r="3.5"/><circle cx="99" cy="28" r="3.5"/></g>
  <g text-anchor="middle" font-size="9" font-weight="bold" fill="#364d43" paint-order="stroke" stroke="#f2efdc" stroke-linejoin="round" stroke-width="2.5"><text x="133" y="30">车站</text><text x="59" y="62">茶屋</text><text x="152" y="116">河岸</text></g>
  <path d="m19 16 4.8 11-4.8-2.4-4.8 2.4Z" fill="#61796b"/><text x="19" y="36" text-anchor="middle" font-size="8" fill="#52695c" font-family="Georgia, serif">N</text>
  <circle class="map-target" r="6.5" fill="none" stroke="#bc6c5c" stroke-width="2"/><circle class="map-player" r="4.7" fill="#535e94" stroke="#fffbeb" stroke-width="1.7"/>`;
}
$('mini-map').innerHTML=mapMarkup();
$('guide-btn').setAttribute('aria-label','散步指南');
const overlay=$('overlay'), body=$('dialog-body');
let onClose;
export const isModal=()=>overlay.open;
export function modal(kicker,title,paragraphs,button='继续散步',after=null) {
  if(overlay.open)return;
  $('dialog-kicker').textContent=kicker;$('dialog-title').textContent=title;
  body.replaceChildren(...paragraphs.map(s=>{const p=document.createElement('p');p.textContent=s;return p;}));
  $('dialog-ok').textContent=button;
  onClose=after;overlay.showModal();
}
overlay.addEventListener('close',()=>{const fn=onClose;onClose=null;fn?.();});
export function openMap() {
  modal('步行地图','车站与河谷',['蓝点是你，红圈是现在要去的地方。请从站前街中间的道口穿越铁轨。']);
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 220 142');svg.setAttribute('class','big-map');svg.setAttribute('aria-hidden','true');svg.style.marginBlockStart='10px';svg.innerHTML=mapMarkup();body.append(svg);
  updateDots(...lastDots);
}
export function openGuide() {
  modal('WELCOME TO SAKURA TOWN','散步指南',[
    '欢迎来到樱花小镇。用 WASD 或方向键移动，也可以点击地面走过去。',
    '按 E 或点击互动提示与居民交谈、进出房间。点击手记里的地点，可以步行到眼下的目的地。',
    '道口警铃响起时，请在线外等列车通过。按 M 可打开小镇地图。进度会自动保存在此浏览器。'
  ]);
}
let lastDots=[0,0,0,0];
export function updateDots(x,z,gx,gz){
  lastDots=[x,z,gx,gz];
  const set=(all,a,b)=>document.querySelectorAll(all).forEach(n=>{
    n.style.display=a===null?'none':'';if(a!==null){n.setAttribute('cx',mapX(a).toFixed(1));n.setAttribute('cy',mapZ(b).toFixed(1));}
  });
  set('.map-player',x,z);set('.map-target',gx,gz);
}
let messageTimer;
export const toast=(s)=>{const t=$('toast');t.textContent=s;t.hidden=false;clearTimeout(messageTimer);messageTimer=setTimeout(()=>{t.hidden=true;},3000);};

export function makeAudio(){
  let ac, mix, breeze, enabled=false, bellAt=0, birdAt=0, lastBell=false;
  const btn=$('sound-btn');
  function note(t,f,end,seconds,level,type='sine') {
    const osc=ac.createOscillator(),g=ac.createGain();osc.type=type;osc.frequency.setValueAtTime(f,t);osc.frequency.exponentialRampToValueAtTime(end,t+seconds);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(level,t+.021);g.gain.exponentialRampToValueAtTime(.0001,t+seconds);
    osc.connect(g);g.connect(mix);osc.start(t);osc.stop(t+seconds+.01);
  }
  btn.addEventListener('click',async()=>{
    if(!window.AudioContext){toast('此浏览器不支持环境音。');return;}
    try {
      if(!ac){
        ac=new AudioContext();mix=ac.createGain();mix.gain.value=.36;mix.connect(ac.destination);
        const n=ac.sampleRate*3,buf=ac.createBuffer(1,n,ac.sampleRate),out=buf.getChannelData(0);
        let last=0;for(let i=0;i<n;i++){last=(last+(Math.random()*2-1)*.02)/1.02;out[i]=last*2;}
        const noise=ac.createBufferSource();noise.buffer=buf;noise.loop=true;breeze=ac.createGain();breeze.gain.value=.21;noise.connect(breeze);breeze.connect(mix);noise.start();
      }
      const next=!enabled;if(next)await ac.resume();else await ac.suspend();enabled=next;
      btn.setAttribute('aria-pressed',String(enabled));btn.setAttribute('aria-label',enabled?'关闭环境音':'打开环境音');btn.querySelector('use').setAttribute('href',enabled?'#sound':'#mute');
    } catch {toast('暂时无法播放环境音。');}
  });
  return {update(visible,outside,warning,distance){
    if(!enabled||!ac)return;
    const t=ac.currentTime;
    mix.gain.setTargetAtTime(visible?(outside?.36:.12):0,t,.16);
    if(!visible)return;
    if(outside&&warning&&distance<27&&(!lastBell||t>=bellAt)){
      note(t,573,562,.23,.11*Math.max(.12,1-distance/31),'triangle');note(t,1130,1080,.15,.031);bellAt=t+.71;
    }
    lastBell=warning;
    if(outside&&t>=birdAt){for(let i=0;i<2+Math.floor(Math.random()*3);i++)note(t+i*.14,1450+Math.random()*500,900+Math.random()*900,.12,.024);birdAt=t+4+Math.random()*7;}
  }};
}
