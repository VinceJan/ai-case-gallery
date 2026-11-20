const presets={
  sun:   {cloud:.14,rain:0, mist:.015,wind:.83,sun:2.6,sky:0xeae6d8,horizon:0xd1ccba,key:0xffecd2,amb:0xfff3e1,fog:0xdbdfcf},
  cloud: {cloud:.73,rain:0, mist:.035,wind:1.59,sun:1.28,sky:0xdfe3dc,horizon:0xc2cabc,key:0xe4ecde,amb:0xf0f1e5,fog:0xc9d5c9},
  rain:  {cloud:.96,rain:1, mist:.13, wind:2.1,sun:.77,sky:0xc9d1cd,horizon:0x9dada6,key:0xd3dfdd,amb:0xe1e9e3,fog:0xaebfba},
  mist:  {cloud:.42,rain:0, mist:.48, wind:.35,sun:1.30,sky:0xe6e8dd,horizon:0xc1cec3,key:0xfff4dd,amb:0xeaf2e2,fog:0xd5dfd4},
};
const colors=['sky','horizon','key','amb','fog'];
const levels=['cloud','rain','mist','wind','sun'];

export function buildWeather(ctx, scene, sun, ambient, floor, reduced) {
  const {T,root,rng,updates}=ctx;
  const state=Object.fromEntries([...levels.map(k=>[k,presets.sun[k]]),...colors.map(k=>[k,new T.Color(presets.sun[k])])]);
  const palette=Object.fromEntries(Object.entries(presets).map(([key,v])=>[key,{...v,...Object.fromEntries(colors.map(k=>[k,new T.Color(v[k])]))}]));
  let mode='sun',cycle=false,age=0,styleTime=0,lastSky='',lastHorizon='';
  const cloudTex = cloudTexture(T);
  const clouds=[];
  for(let i=0;i<9;i++){
    const material=new T.SpriteMaterial({map:cloudTex,color:0xfff7e9,transparent:true,depthWrite:false,opacity:.32,fog:true,toneMapped:false});
    const m=new T.Sprite(material); m.userData.dynamic=true; scene.add(m);
    const lane=i%3, y=lane===2?11.5+rng()*2.9:7.5+rng()*4.4, z=-23-lane*3+rng()*5, x=(i-4)*8;
    clouds.push({m,x,y,z,width:8+rng()*9,height:1.2+rng()*1.65,speed:.21+rng()*.13,phase:rng()*7});
  }
  const count=510, arr=new Float32Array(count*6), values=[];
  for(let i=0;i<count;i++)values.push([(rng()-.5)*44,rng()*22,(rng()-.5)*43,.23+rng()*.55,7.5+rng()*4.2,rng()]);
  const geom=new T.BufferGeometry();geom.setAttribute('position',new T.BufferAttribute(arr,3).setUsage(T.DynamicDrawUsage));
  const rain=new T.LineSegments(geom,new T.LineBasicMaterial({color:0xe1ecea,transparent:true,opacity:0,depthWrite:false}));
  rain.frustumCulled=false;rain.visible=false;root.add(rain);
  const style=document.documentElement.style;
  const update=(t,dt)=>{
    age+=dt;
    if(cycle&&age>=38){
      const names=Object.keys(presets);mode=names[(names.indexOf(mode)+1)%names.length];age=0;
      const selection=document.querySelector(`input[name="weather"][value="${mode}"]`);
      if(selection) selection.checked=true;
    }
    const target=palette[mode], blend=1-Math.exp(-dt*1.54);
    for(const k of levels) state[k]+=(target[k]-state[k])*blend;
    for(const k of colors) state[k].lerp(target[k],blend);
    sun.intensity=state.sun*(1+Math.sin(t*.21)*.043-Math.sin(t*.35)*state.cloud*.042);
    sun.color.copy(state.key); ambient.color.copy(state.amb); ambient.intensity=1.88+state.cloud*.21;
    floor.opacity=.11*(1-state.cloud*.65);
    scene.fog.color.copy(state.fog);scene.fog.near=58-state.mist*58;scene.fog.far=198-state.mist*223;
    styleTime-=dt;
    if(styleTime<=0){
      const sky=state.sky.getHexString(), horizon=state.horizon.getHexString();
      if(sky!==lastSky){style.setProperty('--sky','#'+sky);lastSky=sky;}
      if(horizon!==lastHorizon){style.setProperty('--horizon','#'+horizon);lastHorizon=horizon;}
      styleTime=.08;
    }
    for(const {m,x,y,z,width,height,speed,phase} of clouds){
      const pos=((x+40+t*speed*(reduced?.1:1))%80+80)%80-40;
      m.position.set(pos,y+Math.sin(t*.12+phase)*.23,z);m.scale.set(width,height*(1+state.cloud*.45),1);
      m.material.opacity=(.25+state.cloud*.42)*T.MathUtils.smoothstep(40-Math.abs(pos),0,8)*(1-state.mist*.15);
      m.material.color.copy(state.key).lerp(state.fog,state.cloud*.35);
    }
    rain.visible=state.rain>.018;
    if(rain.visible){
      rain.material.opacity=state.rain*(reduced?.15:.37);
      const fall=reduced?t*.36:t;
      for(let i=0;i<count;i++){
        const [x0,y0,z,len,speed,cut]=values[i], k=i*6;
        const y=((y0-fall*speed)%22+22)%22;
        const x=x0+(22-y)*.092+(cut-.5)*.26;
        arr[k]=x;arr[k+1]=cut<state.rain?y:-12;arr[k+2]=z;
        arr[k+3]=x-len*.095;arr[k+4]=arr[k+1]+len;arr[k+5]=z-.03;
      }
      geom.attributes.position.needsUpdate=true;
    }
    return state;
  };
  return {state,update,set(next){ if(palette[next]){mode=next;age=0;} },cycle(value){cycle=value;age=0;}};
}

function cloudTexture(T){
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=88;
  const c=canvas.getContext('2d');
  for(const [x,y,rx,ry,alpha] of [[128,59,113,22,.74],[99,48,73,26,.79],[147,44,63,31,.66],[53,58,42,18,.65],[192,56,50,19,.65],[125,36,40,25,.73],[79,66,68,12,.27],[166,68,78,11,.30]]){
    c.save();c.translate(x,y);c.scale(rx,ry);
    const radial=c.createRadialGradient(0,0,.24,0,0,1);
    radial.addColorStop(0,`rgba(255,255,255,${alpha})`);radial.addColorStop(.66,`rgba(255,255,255,${alpha*.9})`);radial.addColorStop(1,'rgba(255,255,255,0)');
    c.fillStyle=radial;c.fillRect(-1,-1,2,2);c.restore();
  }
  const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;return map;
}

export async function setupWeatherPanel(weather){
  const panel=document.querySelector('#weather-panel'), trigger=document.querySelector('#weather-trigger'),close=document.querySelector('#weather-close');
  // Load compatibility code only on engines missing the corresponding native API.
  if (!('popover' in HTMLElement.prototype)) {
    try { await import('@oddbird/popover-polyfill'); } catch { /* Use a hidden-panel fallback. */ }
  }
  const hasPopover=typeof panel.togglePopover==='function';
  if (!hasPopover){panel.hidden=true;panel.removeAttribute('popover');}
  const hasCommands=hasPopover&&'commandForElement' in HTMLButtonElement.prototype;
  if (!hasCommands&&hasPopover){
    try { await import('invokers-polyfill'); } catch { /* Buttons below handle older engines. */ }
  }
  const nativeOrPolyfill=hasPopover&&'commandForElement' in HTMLButtonElement.prototype;
  let open=false;
  function setOpen(value){
    open=value;trigger.setAttribute('aria-expanded',String(value));
  }
  function change(value){
    if(hasPopover){ if(value) panel.showPopover(); else panel.hidePopover();}
    else {panel.hidden=!value;setOpen(value); if(value)panel.querySelector('input:checked')?.focus();}
  }
  panel.addEventListener('toggle',e=>setOpen(e.newState==='open'));
  if(!nativeOrPolyfill){
    trigger.addEventListener('click',()=>change(!open));close.addEventListener('click',()=>change(false));
  }
  close.addEventListener('click',()=>requestAnimationFrame(()=>trigger.focus({preventScroll:true})));
  let peekTimer;
  document.querySelector('canvas')?.addEventListener('pointerup',event=>{
    if(event.pointerType!=='touch')return;
    trigger.dataset.peek='true';clearTimeout(peekTimer);
    peekTimer=setTimeout(()=>delete trigger.dataset.peek,2800);
  });
  document.addEventListener('keydown',event=>{
    if(event.code==='KeyW'&&!event.repeat&&!event.ctrlKey&&!event.altKey&&!event.metaKey){event.preventDefault();change(!open);}
    if(!hasPopover&&open&&event.key==='Escape'){change(false);trigger.focus({preventScroll:true});}
  });
  if(!hasPopover){document.addEventListener('pointerdown',event=>{if(open&&!panel.contains(event.target)&&!trigger.contains(event.target))change(false);});}
  panel.addEventListener('change',e=>{
    if(e.target.name==='weather')weather.set(e.target.value);
    if(e.target.id==='weather-cycle')weather.cycle(e.target.checked);
  });
}
