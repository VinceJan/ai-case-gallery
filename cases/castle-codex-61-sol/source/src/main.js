import {THREE,scene,fixed,mesh,box,animations,moving} from './core.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {buildLand,wheat} from './land.js';
import {buildCastle} from './castle.js';
import {buildVillage} from './village.js';
import {buildCharacters,updateCharacters,people} from './characters.js';
import {buildAtmosphere,updateAtmosphere,environment} from './weather.js';
const root=document.getElementById('realm'),canvas=document.getElementById('world');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});}catch(err){document.getElementById('loading').textContent='当前设备无法启动 WebGL，请使用支持三维加速的浏览器。';throw err;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
const camera=new THREE.OrthographicCamera(-30,30,19,-19,.1,180);camera.position.set(34,30,42);
const controls=new OrbitControls(camera,canvas);controls.target.set(0,2.6,0);controls.enableDamping=true;controls.dampingFactor=.07;controls.minPolarAngle=.35;controls.maxPolarAngle=1.38;controls.minZoom=.64;controls.maxZoom=2.8;controls.enablePan=false;controls.rotateSpeed=.7;controls.zoomSpeed=.7;
function resize(){const w=root.clientWidth,h=root.clientHeight,aspect=w/h;const span=aspect<1.2?23/aspect:18.3;camera.left=-span*aspect;camera.right=span*aspect;camera.top=span;camera.bottom=-span;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
new ResizeObserver(resize).observe(root);resize();
buildLand();buildCastle();buildVillage();buildCharacters();buildAtmosphere();
// Static architecture is batched by material. Animated groups remain independent.
fixed.updateMatrixWorld(true);const buckets=new Map(),lineBuckets=new Map();fixed.traverse(o=>{if(o.isMesh){const key=o.material;const source=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();const geo=source.applyMatrix4(o.matrixWorld);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(geo);}else if(o.isLineSegments){const geo=o.geometry.clone().applyMatrix4(o.matrixWorld);if(!lineBuckets.has(o.material))lineBuckets.set(o.material,[]);lineBuckets.get(o.material).push(geo);}});
fixed.clear();for(const [material,geometries]of buckets){const geom=mergeGeometries(geometries,false);if(!geom)throw new Error('Static geometry batch failed');const m=new THREE.Mesh(geom,material);m.castShadow=m.receiveShadow=true;fixed.add(m);geometries.forEach(g=>g.dispose());}for(const [material,geometries]of lineBuckets){fixed.add(new THREE.LineSegments(mergeGeometries(geometries,false),material));geometries.forEach(g=>g.dispose());}
// Soft studio floor anchors the object in a quiet presentation space.
const floor=new THREE.Mesh(new THREE.PlaneGeometry(220,220),new THREE.ShadowMaterial({opacity:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.19;floor.receiveShadow=true;scene.add(floor);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');environment.motion=!reduced.matches;document.getElementById('motion').checked=environment.motion;reduced.addEventListener('change',e=>{environment.motion=!e.matches;document.getElementById('motion').checked=environment.motion;});
const weatherNames={clear:'晴朗',rain:'细雨',fog:'晨雾',snow:'飘雪'};
document.querySelectorAll('[data-weather]').forEach(b=>b.addEventListener('click',()=>{environment.weather=b.dataset.weather;document.querySelectorAll('[data-weather]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.getElementById('weather-name').textContent=weatherNames[environment.weather];document.getElementById('weather-description').textContent={clear:'日光落在田埂上',rain:'雨丝掠过屋檐',fog:'薄雾漫过护城河',snow:'雪花轻落丰穗领地'}[environment.weather];}));
const hour=document.getElementById('hour'),wind=document.getElementById('wind');hour.addEventListener('input',()=>{environment.hour=Number(hour.value);document.getElementById('hour-value').textContent=`${String(Math.floor(environment.hour)).padStart(2,'0')}:${environment.hour%1>=.5?'30':'00'}`;document.getElementById('day-name').textContent=environment.hour>=6&&environment.hour<17?'白昼':environment.hour>=17&&environment.hour<20?'黄昏':'夜晚';});wind.addEventListener('input',()=>{environment.wind=Number(wind.value);document.getElementById('wind-value').textContent=environment.wind<.25?'轻风':environment.wind<.65?'微风':'徐风';});document.getElementById('motion').addEventListener('change',e=>environment.motion=e.target.checked);
let uiVisible=true;function toggleUI(){uiVisible=!uiVisible;root.classList.toggle('quiet',!uiVisible);document.getElementById('hide-ui').setAttribute('aria-label',uiVisible?'隐藏界面':'显示界面');document.getElementById('hide-ui').title=uiVisible?'隐藏界面 · H':'显示界面 · H';document.getElementById('hide-ui').setAttribute('aria-pressed',String(!uiVisible));}document.getElementById('hide-ui').addEventListener('click',toggleUI);document.addEventListener('keydown',e=>{if(e.target.matches('input:not([type="range"]):not([type="checkbox"]),textarea'))return;if(e.key.toLowerCase()==='h')toggleUI();if(e.key==='Escape'&&!uiVisible)toggleUI();});
document.getElementById('reset-view').addEventListener('click',()=>{camera.position.set(34,30,42);camera.zoom=1;controls.target.set(0,2.6,0);camera.updateProjectionMatrix();controls.update();});
document.getElementById('loading').remove();
let last=performance.now(),time=0,wheatLast=-1,frames=0;
function frame(now){requestAnimationFrame(frame);const dt=Math.max(0,Math.min((now-last)/1000,.08));last=now;if(environment.motion)time+=dt;controls.update();const windTime=time*(.4+environment.wind*1.5);for(const f of animations)f(windTime);updateCharacters(time,camera,environment.wind);updateAtmosphere(time,dt);root.classList.toggle('night',environment.hour<6||environment.hour>=19);
if(time-wheatLast>1/16){wheatLast=time;for(const field of wheat){const {dummy,coords,mesh:im,y}=field;for(let i=0;i<coords.length;i++){const [x,z,h,p]=coords[i],sway=Math.sin(x*.8+z*.6-time*1.5+p*.13)*(.025+environment.wind*.045);for(let k=0;k<2;k++){dummy.position.set(x+(k?.08:0)+sway,y+h+(k?.12:0),z);dummy.rotation.set(sway*.5,0,(k?-.24:.15)+sway);dummy.updateMatrix();im.setMatrixAt(i*2+k,dummy.matrix);}}im.instanceMatrix.needsUpdate=true;}}
renderer.render(scene,camera);frames++;}
requestAnimationFrame(frame);
// A narrow inspection surface for render / interaction acceptance checks.
window.realm={environment,camera,controls,people,renderer,scene,get time(){return time},get frames(){return frames}};
