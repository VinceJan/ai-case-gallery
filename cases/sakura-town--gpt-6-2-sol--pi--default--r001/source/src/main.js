import * as T from 'three';
import { makeArchitecture } from './architecture.js';
import { makeRail, makePerson } from './life.js';
import { makeLandscape, batch, riverX, riverWidth, benchPoint, petalPoint, riverWalk } from './world.js';
import { clockAt, loadState, SAVE_KEY, localRailBlocked, findPath, START } from './sim.js';
import { $, modal, isModal, openGuide, openMap, updateDots, toast, makeAudio } from './interface.js';
import './style.css';

try { play(); } catch(error) {
  console.error(error);
  const el=$('fatal');el.hidden=false;el.textContent='三维场景未能启动。请尝试在启用 WebGL 2 与硬件加速的浏览器中重新打开。';
}

function play(){
  let raw;try{raw=localStorage.getItem(SAVE_KEY);}catch{}
  const state=loadState(raw);
  const save=()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));}catch{}};
  const viewport=$('viewport');
  const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-label','三维小镇场景，可用方向键移动，或点击地面步行');
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('fatal').hidden=false;$('fatal').textContent='图形环境已断开。自动存档仍在，刷新页面即可继续。';save();});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{$('fatal').hidden=true;});
  viewport.append(renderer.domElement);
  const scene=new T.Scene(), outdoorBackground=new T.Color(0xd1e9e5), indoorBackground=new T.Color(0xc3cec0);
  const fog=new T.Fog(outdoorBackground,51,181);
  const outside=new T.Group(), indoor=new T.Group(), land=new T.Group(), architecture=new T.Group();
  scene.add(outside,indoor);outside.add(land,architecture);
  const exteriorCamera=new T.PerspectiveCamera(38,1,.2,245);
  const interiorCamera=new T.OrthographicCamera(-13,13,7,-7,.1,100);
  let camera=exteriorCamera;
  const hemi=new T.HemisphereLight(0xfff1d9,0xaab8b3,1.7);scene.add(hemi);
  const light=new T.DirectionalLight(0xffefce,1.48);light.position.set(-23,37,17);
  light.castShadow=true;light.shadow.mapSize.set(2048,2048);
  Object.assign(light.shadow.camera,{near:1,far:115,left:-34,right:34,top:34,bottom:-34});
  light.shadow.bias=-.00035;light.shadow.normalBias=.04;scene.add(light,light.target);
  const fill=new T.DirectionalLight(0xd6ecef,.26);fill.position.set(24,11,-13);scene.add(fill);
  const landscape=makeLandscape(land);
  const buildings=makeArchitecture(architecture,indoor,{});
  const rooms={cafe:indoor.getObjectByName('cafe'),station:indoor.getObjectByName('station')};
  const rail=makeRail(outside);
  batch(land);batch(architecture);if(rail.staticGroup)batch(rail.staticGroup);
  for(const room of Object.values(rooms))if(room)batch(room);
  outside.add(landscape.petalMesh);
  const party=new T.Group();scene.add(party);
  const player=makePerson({top:0xd39158,pants:0x3d5b60,hair:0x3d383b,skin:0xffd4ad,bag:0xebc579,hairStyle:'crop'});
  const haru=makePerson({top:0xc66d73,pants:0x514951,hair:0x524140,skin:0xffd7b6,bag:0xf0d2aa,bagStyle:'satchel',hairStyle:'bun'});
  const stationMaster=makePerson({top:0x496b6b,pants:0x465459,hair:0x3e463f,skin:0xe6ae86,hat:0x46605c});
  const gardener=makePerson({top:0x77839f,pants:0x70664c,hair:0x584d3e,skin:0xf3c09e,hairStyle:'bob'});
  party.add(player.group,haru.group,stationMaster.group,gardener.group);
  player.group.rotation.y=Math.PI;
  const ring=new T.Mesh(new T.RingGeometry(.30,.40,32),new T.MeshBasicMaterial({color:0xfff1ce,side:T.DoubleSide,transparent:true,opacity:.86,depthWrite:false}));
  ring.rotation.x=-Math.PI/2;ring.visible=false;scene.add(ring);
  const petal=new T.Mesh(new T.OctahedronGeometry(.17),new T.MeshBasicMaterial({color:0xffe9d9}));
  petal.visible=false;outside.add(petal);
  const audio=makeAudio();
  const keys=new Set(), inputKeys=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight']);
  const camFocus=new T.Vector3(), viewMarker=new T.Vector3();
  const outsideOffset=new T.Vector3(12.4,14.3,36), insideOffset=new T.Vector3(13,22,24);
  const cameraGoal=new T.Vector3();
  let width=1,height=1, dirtySize=true, phase=clockAt(state.seconds), zoneChanged=true;
  let route=[], destination=null, autoTarget=null, replanAt=0, near=null, blockedHintAt=-10, seated=false;
  let hudAt=0, savedAt=state.seconds, renderedAt=performance.now(), frame=0, lastDisplayed='', pointerDown=null;
  const cssMarker=$('marker'), questButton=$('route-btn'), interactButton=$('interact');
  const stationDoor=[8,-16.45], cafeDoor=[-7,3.70], exit=[0,3.75];
  const innerCounter={cafe:[-2,-2.1],station:[1,-2.1]};
  const daily=[
    ['今日委托','春风里的便当','去春风茶屋门口，与小春说说话。','春风茶屋'],
    ['今日委托','春风里的便当','进茶屋，去柜台拿准备好的便当。','茶屋柜台'],
    ['今日委托','春风里的便当','进茶屋，去柜台拿准备好的便当。','茶屋柜台'],
    ['今日委托','春风里的便当','穿过铁路道口，把便当交给车站里的站长。','樱丘车站'],
    ['春日逸闻','从河边寄一张明信片','委托送到了。去河边长椅坐一会儿吧。','河岸长椅'],
    ['春日逸闻','从河边寄一张明信片','沿路找一片落下的樱花花瓣。','站前樱花树'],
    ['春日逸闻','从河边寄一张明信片','把花瓣带给小春，做一张春日明信片。','春风茶屋'],
    ['旅途印章','把春天留在这里','便当已送达，也收到了手作明信片。小镇还可以继续自由散步。','']
  ];
  const haruP=[-7.65,4.85], naokiP=[8.6,-15.35], gardenerP=[13,12];
  const chore=(p,stops,baseX,baseZ)=>{
    const minute=phase.minute+(state.seconds*.77)%1;
    for(let i=1;i<stops.length;i++){
      const [a,x,z]=stops[i-1],[b,nx,nz]=stops[i];
      if(minute<b){const f=T.MathUtils.clamp((minute-a)/Math.max(1,b-a),0,1);p[0]=x+(nx-x)*f;p[1]=z+(nz-z)*f;return;}
    }
    p[0]=baseX;p[1]=baseZ;
  };
  function poseResident(actor,x,z,dt,visible,angle=.12){
    const prev=actor.group.position, dx=x-prev.x,dz=z-prev.z;
    const moving=visible&&!zoneChanged&&dt>0&&Math.hypot(dx,dz)>.001;
    if(moving)face(actor.group,Math.atan2(dx,dz),dt);else if(zoneChanged)actor.group.rotation.y=angle;
    prev.set(x,floorHeight(x,z),z);actor.group.visible=visible;actor.pose(state.seconds,moving);
  }
  function residents(dt){
    const m=phase.minute;
    chore(haruP,[[495,-7.65,4.85],[534,-7.65,4.85],[541,-7.65,6.10],[553,-10.75,6.15],[594,-10.75,6.15],[608,-7.65,6.15],[616,-7.65,4.85],[914,-7.65,4.85],[927,-6.6,5.8],[993,-6.6,5.8],[1010,-7.65,4.85]],-7.65,4.85);
    chore(naokiP,[[495,6.2,-15.4],[516,6.2,-15.4],[531,10.7,-15.4],[550,10.7,-15.4],[574,5,-15.4],[593,5,-15.4],[608,6.2,-15.4],[954,6.2,-15.4],[985,11.5,-15.4],[1030,6.2,-15.4]],6.2,-15.4);
    chore(gardenerP,[[495,14.5,12.2],[518,14.5,12.2],[533,14.85,10],[570,14.85,10],[601,riverWalk(3),3],[1030,riverWalk(3),3],[1060,14.5,12.2]],14.5,12.2);
    poseResident(haru,state.zone==='cafe'?-2.8:haruP[0],state.zone==='cafe'?-2.45:haruP[1],dt,state.zone!=='station');
    poseResident(stationMaster,state.zone==='station'?1.5:naokiP[0],state.zone==='station'?-2.41:naokiP[1],dt,state.zone==='station'||(state.zone==='outside'&&porterOutside(m)));
    poseResident(gardener,gardenerP[0],gardenerP[1],dt,state.zone==='outside',-.6);
  }
  const porterOutside=m=>(m>=480&&m<527)||(m>=954&&m<1030);
  function face(person,angle,dt){const dif=Math.atan2(Math.sin(angle-person.rotation.y),Math.cos(angle-person.rotation.y));person.rotation.y+=dif*Math.min(1,dt*15);}
  const action=(id,pos,label,name=label,lift=2.3,r=1.75)=>({id,pos,label,name,lift,r});
  function actions(){
    if(state.zone==='cafe')return [action('exit',exit,'离开茶屋','茶屋出口',.65),action('counter',innerCounter.cafe,'与小春交谈','小春',2.24,1.82)];
    if(state.zone==='station')return [action('exit',exit,'离开车站','车站出口',.65),action('deliver',innerCounter.station,'与站长交谈','站长',2.24,1.82)];
    const a=[action('haru',haruP,'与小春交谈','小春',2.17),action('cafe',cafeDoor,'进入春风茶屋','春风茶屋',2.44,1.38),action('station',stationDoor,'进入樱丘车站','樱丘车站',2.5,1.72),action('bench',benchPoint,'在长椅上休息','河岸长椅',1.25,1.66),action('yumi',gardenerP,'与由美交谈','由美',2.15,1.6)];
    if(porterOutside(phase.minute))a.push(action('porter',naokiP,'与站长交谈','站长',2.15,1.55));
    if(state.stage===5)a.push(action('petal',petalPoint,'拾起樱花花瓣','落下的花瓣',.65,1.4));
    return a;
  }
  function targetId(){
    const s=state.stage;
    if(s===7)return null;
    if(state.zone==='station')return s===3?'deliver':'exit';
    if(state.zone==='cafe')return s>=1&&s<=2?'counter':s===0||s===6?'counter':'exit';
    return ['haru','cafe','cafe','station','bench','petal','haru'][s];
  }
  function showQuest(){
    const [tag,title,desc,dest]=daily[state.stage];
    $('quest-tag').textContent=tag;$('quest-title').textContent=title;$('quest-desc').textContent=desc;
    $('route-label').textContent=targetId()==='exit'?'回到小镇街道':dest;questButton.hidden=!dest;
    const rank=[0,1,1,2,0,1,2,3][state.stage];
    Array.from($('progress').children).forEach((n,i)=>{n.className=i<rank?'done':i===rank?'current':'';});
    $('progress').setAttribute('aria-label',`当前任务进度：${rank} / 3`);
  }
  function stopRoute(){route=[];destination=null;autoTarget=null;ring.visible=false;}
  function changeZone(zone,x,z){
    stopRoute();keys.clear();near=null;seated=false;state.zone=zone;state.x=x;state.z=z;zoneChanged=true;
    outside.visible=zone==='outside';indoor.visible=!outside.visible;
    for(const [key,group] of Object.entries(rooms))if(group)group.visible=key===zone;
    camera=outside.visible?exteriorCamera:interiorCamera;
    scene.background=outside.visible?outdoorBackground:indoorBackground;scene.fog=outside.visible?fog:null;
    dirtySize=true;showQuest();save();
  }
  function stepTo(n){state.stage=n;showQuest();save();}
  function talk(speaker,title,text){keys.clear();stopRoute();modal(speaker,title,[text]);}
  function perform(item){
    if(!item||isModal())return;
    stopRoute();const s=state.stage;
    switch(item.id){
      case 'exit':{
        const c=state.zone==='cafe';changeZone('outside',...(c?[-6.81,4.25]:[7.8,-15.5]));return;}
      case 'cafe':if(s===1)stepTo(2);changeZone('cafe',0,2.75);return;
      case 'station':changeZone('station',0,2.75);return;
      case 'haru':case 'counter':
        if(s===0){stepTo(1);talk('春风茶屋 · 小春','能帮我跑个腿吗？','我给站长做了份竹笋便当，就放在茶屋柜台。取上它，过了道口就是车站。别急，看到红灯就等下一阵风。');}
        else if(s===6){stepTo(7);talk('春风茶屋 · 小春','春日明信片','是河岸那株樱花的花瓣呀。来，把它夹进纸里……好了。这张明信片送你，下次经过小镇的时候，记得再来坐坐。');}
        else if(item.id==='counter'&&s<=2){stepTo(3);talk('春风茶屋 · 柜台','拿到了竹笋便当','隔着包布，还能摸到一点暖意。请把便当交给樱丘车站里的站长。');}
        else talk('春风茶屋 · 小春','今天的茶刚沏好','如果不赶时间，就沿着小镇散会儿步。顺着水声走，河边有一张长椅。');
        return;
      case 'deliver':
        if(s===3){stepTo(4);talk('樱丘车站 · 站长','正好赶上饭点','真香！替我谢谢小春。车站的活总也做不完，你可别像我一样忙。去河岸坐坐吧，那里的春风最好。');}
        else talk('樱丘车站 · 站长','山间慢车','列车会在站台停一小会儿。这里不卖急行票，小镇也不是个需要匆忙的地方。');
        return;
      case 'porter':
        talk('樱丘车站 · 站长','站台巡查','我看一眼站台就回值班室。要找我，进站在柜台等一下就好。');return;
      case 'bench':
        seated=true;
        if(s===4){stepTo(5);talk('河谷 · 春风','河水带来一片春天','你听了一会儿流水。来路那棵樱花树下，似乎落了一片完整的花瓣。小春也许会喜欢它。');}
        else talk('河谷 · 春风','在河边歇一歇','河面泛着细碎的光，远处是缓缓穿过盆地的列车。');
        return;
      case 'petal':stepTo(6);toast('拾起一片樱花花瓣');return;
      case 'yumi':talk('河岸 · 由美','春风向哪吹','早上我在河边看花，过一会儿要去看看街角的新芽。要是看见花瓣落在水上，可以跟着它走一小段。');return;
    }
  }
  function free(x,z,testGate=false,fromZ=z){
    const pad=.23;
    if(state.zone!=='outside'){
      if(x<-5.65||x>5.65||z<-4.16||z>4.25)return false;
      return !(buildings.innerColliders[state.zone]??[]).some(([a,b,c,d])=>x>a-pad&&x<b+pad&&z>c-pad&&z<d+pad);
    }
    if(x<-30.6||x>riverX(z)-riverWidth(z)/2-.91||z<-31.2||z>32.1||landscape.groundHeight(x,z)>.48)return false;
    if(Math.abs(x-benchPoint[0])<.85&&Math.abs(z-benchPoint[1])<.35)return false;
    if(localRailBlocked(x,z,testGate&&rail.warning,fromZ))return false;
    if(landscape.treeRoots.some(([tx,tz,r])=>Math.hypot(x-tx,z-tz)<r+pad))return false;
    return !buildings.colliders.some(([a,b,c,d])=>x>a-pad&&x<b+pad&&z>c-pad&&z<d+pad);
  }
  function guideTo(x,z,id=null,quiet=false){
    seated=false;
    const dest=[x,z];
    let result=findPath([state.x,state.z],dest,(a,b)=>free(a,b));
    autoTarget=id;destination=dest;route=result;replanAt=state.seconds+.65;
    const final=result.at(-1);
    ring.visible=Boolean(final);if(final)ring.position.set(final[0],.164,final[1]);
    if(!result.length&&Math.hypot(x-state.x,z-state.z)>1.52){if(!quiet)toast('这里不通，试着沿街道走。');stopRoute();}
  }
  function followQuest(){
    if(isModal())return;const target=actions().find(a=>a.id===targetId());
    if(!target)return;
    if(Math.hypot(target.pos[0]-state.x,target.pos[1]-state.z)<target.r){perform(target);return;}
    guideTo(...target.pos,target.id);
  }
  function floorHeight(x,z){
    if(state.zone!=='outside')return .025;
    if(x>3.55&&x<16.15&&z>=-17.58&&z<=-14.56)return .595*T.MathUtils.smoothstep(x,3.55,4.17);
    return Math.max(.09,landscape.groundHeight(x,z));
  }
  function placePlayer(moving){
    if(seated){player.group.position.set(benchPoint[0],0,benchPoint[1]-.04);player.group.rotation.y=0;}
    else player.group.position.set(state.x,floorHeight(state.x,state.z),state.z);
    player.pose(state.seconds,moving,seated);
  }
  function walk(dt){
    let dx=0,dz=0;
    if(keys.has('KeyA')||keys.has('ArrowLeft'))dx--;
    if(keys.has('KeyD')||keys.has('ArrowRight'))dx++;
    if(keys.has('KeyW')||keys.has('ArrowUp'))dz--;
    if(keys.has('KeyS')||keys.has('ArrowDown'))dz++;
    if(dx||dz){stopRoute();seated=false;}
    else if(autoTarget&&destination&&state.seconds>=replanAt){
      const item=actions().find(a=>a.id===autoTarget);
      if(item&&Math.hypot(item.pos[0]-destination[0],item.pos[1]-destination[1])>.56)guideTo(...item.pos,item.id,true);
      else replanAt=state.seconds+.65;
    }
    const onTrack=state.zone==='outside'&&state.x>-1.65&&state.x<3.65&&state.z>-14.58&&state.z<-11.42;
    if(onTrack&&rail.warning){
      stopRoute(); // Clear the track before the gates descend, even if idling.
      dx=0;dz=Math.sign(state.z+13||dz||1);
    }
    if(!dx&&!dz&&route.length){
      if(Math.hypot(route[0][0]-state.x,route[0][1]-state.z)<.19)route.shift();
      if(route.length){dx=route[0][0]-state.x;dz=route[0][1]-state.z;}
      else stopRoute();
    }
    let moved=false;
    if(dx||dz){
      const norm=Math.hypot(dx,dz),dist=Math.min((state.zone==='outside'?5.35:3.5)*dt,route.length?norm:Infinity);
      const sx=dx/norm*dist,sz=dz/norm*dist;
      const x=state.x,z=state.z;
      if(free(x+sx,z+sz,true,z)){state.x+=sx;state.z+=sz;}
      else {
        if(sx&&free(x+sx,z,true,z))state.x+=sx;
        if(sz&&free(state.x,z+sz,true,z))state.z+=sz;
      }
      moved=Math.hypot(state.x-x,state.z-z)>.0001;
      if(moved)face(player.group,Math.atan2(state.x-x,state.z-z),dt);
      else if(state.zone==='outside'&&rail.warning&&Math.abs(z+13)<3.1&&x>-2.2&&x<4.2&&state.seconds-blockedHintAt>4){toast('道口暂时关闭，等列车通过后再走。');blockedHintAt=state.seconds;}
    }
    placePlayer(moved);
  }
  function locate(){
    if(state.zone==='cafe')return '春风茶屋';
    if(state.zone==='station')return '樱丘车站';
    if(state.z<-14.5)return state.x>3?'樱丘站前':'北侧坡道';
    if(state.x>12)return '河谷小径';
    if(state.x<-12||state.z>17)return '住宅坡道';
    return '站前街道';
  }
  function size(){
    width=viewport.clientWidth;height=Math.max(1,viewport.clientHeight);
    const aspect=width/height;
    exteriorCamera.aspect=aspect;exteriorCamera.fov=T.MathUtils.radToDeg(2*Math.atan(Math.tan(T.MathUtils.degToRad(19))*Math.max(1,.88/aspect)));
    const vertical=13.1*Math.max(1,1.04/aspect);
    interiorCamera.left=-vertical*aspect/2;interiorCamera.right=vertical*aspect/2;interiorCamera.top=vertical/2;interiorCamera.bottom=-vertical/2;
    camera.updateProjectionMatrix();renderer.setSize(width,height,false);dirtySize=false;
  }
  function cameraStep(dt){
    const isOutside=state.zone==='outside';
    const tx=isOutside?1.85+(state.x-START.x)*.78:state.x*.25;
    const ty=isOutside?1.9:1.0;
    const tz=isOutside?-2.85+(state.z-START.z)*.79:state.z*.32-.45;
    camFocus.lerp(cameraGoal.set(tx,ty,tz),zoneChanged?1:1-Math.exp(-dt*5.3));
    camera.position.copy(camFocus).add(isOutside?outsideOffset:insideOffset);camera.lookAt(camFocus);camera.updateMatrixWorld();
  }
  function hud(dt){
    const current=actions();
    const nearest=current.map(a=>[a,Math.hypot(a.pos[0]-state.x,a.pos[1]-state.z)]).filter(([a,d])=>d<a.r).sort((a,b)=>a[1]-b[1]);
    const target=current.find(a=>a.id===targetId());
    near=nearest.find(([a])=>a.id===target?.id)?.[0]??nearest[0]?.[0]??null;
    interactButton.hidden=!near;if(near&&$('interact-label').textContent!==near.label)$('interact-label').textContent=near.label;
    cssMarker.hidden=true;
    if(target){
      viewMarker.set(target.pos[0],target.lift,target.pos[1]).project(camera);
      if(Math.abs(viewMarker.x)<.96&&viewMarker.y>-.84&&viewMarker.y<.8){
        const x=(viewMarker.x+1)*width*.5,y=(1-viewMarker.y)*height*.5;
        cssMarker.style.left=x+'px';cssMarker.style.top=y+'px';cssMarker.hidden=false;
        if($('marker-name').textContent!==target.name)$('marker-name').textContent=target.name;
      }
    }
    hudAt+=dt;
    if(hudAt>.15||zoneChanged){
      hudAt=0;
      if(lastDisplayed!==phase.text){lastDisplayed=phase.text;$('clock').textContent=phase.text;$('cal').textContent=phase.day===1?'春・第一日':`春・第 ${phase.day} 日`;}
      const place=locate();if($('place').textContent!==place)$('place').textContent=place;
      const outsideDots=state.zone==='outside'?[state.x,state.z]:state.zone==='cafe'?cafeDoor:stationDoor;
      const tg=state.zone==='outside'?(target?.pos??[null,null]):outsideDots;
      updateDots(...outsideDots,...tg);
    }
  }
  const plane=new T.Plane(new T.Vector3(0,1,0),0),pointer=new T.Vector2(),cast=new T.Raycaster(),point=new T.Vector3();
  renderer.domElement.addEventListener('pointerdown',e=>{if(e.button===0)pointerDown=[e.clientX,e.clientY];});
  renderer.domElement.addEventListener('pointerup',e=>{
    const p=pointerDown;pointerDown=null;
    if(!p||Math.hypot(e.clientX-p[0],e.clientY-p[1])>10||isModal())return;
    const b=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-b.left)/width*2-1,1-(e.clientY-b.top)/height*2);
    cast.setFromCamera(pointer,camera);
    if(cast.ray.intersectPlane(plane,point))guideTo(point.x,point.z);
  });
  window.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||isModal())return;
    if(inputKeys.has(e.code)){e.preventDefault();keys.add(e.code);return;}
    if(!e.repeat&&e.code==='KeyE'){e.preventDefault();if(near)perform(near);else toast('走近居民、门口或长椅，再按 E 互动。');}
    if(!e.repeat&&e.code==='KeyM'){e.preventDefault();keys.clear();openMap();}
  });
  window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
  window.addEventListener('pagehide',save);
  document.addEventListener('visibilitychange',()=>{keys.clear();if(document.hidden){save();cancelAnimationFrame(frame);audio.update(false,false,false,0);}else{renderedAt=performance.now();frame=requestAnimationFrame(loop);}});
  new ResizeObserver(()=>{dirtySize=true;}).observe(viewport);
  $('guide-btn').addEventListener('click',()=>{keys.clear();openGuide();});
  $('map-btn').addEventListener('click',()=>{keys.clear();openMap();});
  interactButton.addEventListener('click',()=>perform(near));
  questButton.addEventListener('click',followQuest);cssMarker.addEventListener('click',followQuest);
  if(!free(state.x,state.z)){
    const [x,z]=state.zone==='outside'?[START.x,START.z]:[0,2.75];state.x=x;state.z=z;
  }
  changeZone(state.zone,state.x,state.z);
  function loop(now){
    if(document.hidden)return;
    frame=requestAnimationFrame(loop);
    const dt=Math.min(.06,Math.max(0,(now-renderedAt)/1000));renderedAt=now;
    if(!isModal()){state.seconds+=dt;phase=clockAt(state.seconds);}
    const simDt=isModal()?0:dt;
    if(dirtySize)size();
    rail.update(state.seconds+3.4);if(state.zone==='outside')landscape.update(state.seconds);
    const hour=phase.hour;
    const daylight=T.MathUtils.clamp(Math.sin((hour-4)*Math.PI/17),.25,1);
    light.intensity=1.50*daylight+.15;hemi.intensity=1.15+.64*daylight;
    petal.visible=state.stage===5;petal.position.set(petalPoint[0],.18+.07*Math.sin(state.seconds*4),petalPoint[1]);petal.rotation.y=state.seconds*2;
    residents(simDt);if(simDt>0)walk(simDt);else placePlayer(false);
    cameraStep(dt);hud(dt);zoneChanged=false;
    audio.update(true,state.zone==='outside'&&!isModal(),rail.warning,Math.hypot(state.x-1,state.z+13));
    if(state.seconds-savedAt>8){savedAt=state.seconds;save();}
    ring.material.opacity=.62+.28*Math.sin(state.seconds*6);
    renderer.render(scene,camera);
  }
  if(!document.hidden)frame=requestAnimationFrame(loop);
}
