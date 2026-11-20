import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';
import { makeWorld, batchSolids } from './world.js';
import { buildTerrain } from './terrain.js';
import { buildCastle } from './castle.js';
import { buildVillage } from './village.js';
import { buildFields } from './fields.js';
import { buildCharacters } from './characters.js';
import { buildWeather, setupWeatherPanel } from './weather.js';

const loading=document.querySelector('#loading');
try {
  const slot=document.querySelector('#canvas-slot');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.06;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label','三维领地：拖动或用方向键旋转，滚轮、双指或加减键缩放。按 W 打开天气。');
  slot.append(canvas);
  const scene=new T.Scene();scene.fog=new T.Fog(0xdfdfd0,57,195);
  const root=new T.Group();scene.add(root);
  const camera=new T.OrthographicCamera(-30,30,20,-20,.4,255);
  const origin=new T.Vector3(0,3.25,0);
  camera.position.set(32,37.25,51);camera.lookAt(origin);
  const orbit=new OrbitControls(camera,canvas);orbit.target.copy(origin);
  orbit.enableDamping=!reduced;orbit.dampingFactor=.086;orbit.enablePan=false;
  orbit.rotateSpeed=.64;orbit.zoomSpeed=.83;orbit.minZoom=.75;orbit.maxZoom=3.2;
  orbit.minPolarAngle=.20;orbit.maxPolarAngle=1.26;orbit.update();orbit.saveState();
  const offset=new T.Vector3(), sphere=new T.Spherical();
  canvas.addEventListener('keydown',event=>{
    offset.copy(camera.position).sub(orbit.target);sphere.setFromVector3(offset);
    switch(event.key){
      case 'ArrowLeft':sphere.theta-=.12;break;
      case 'ArrowRight':sphere.theta+=.12;break;
      case 'ArrowUp':sphere.phi=Math.max(orbit.minPolarAngle,sphere.phi-.09);break;
      case 'ArrowDown':sphere.phi=Math.min(orbit.maxPolarAngle,sphere.phi+.09);break;
      case '+':case '=':camera.zoom=Math.min(orbit.maxZoom,camera.zoom*1.12);camera.updateProjectionMatrix();break;
      case '-':camera.zoom=Math.max(orbit.minZoom,camera.zoom/1.12);camera.updateProjectionMatrix();break;
      case 'Home':orbit.reset();event.preventDefault();return;
      default:return;
    }
    camera.position.copy(orbit.target).add(offset.setFromSpherical(sphere));orbit.update();event.preventDefault();
  });
  const hemi=new T.HemisphereLight(0xfff3e1,0x949885,1.88);scene.add(hemi);
  const sun=new T.DirectionalLight(0xffecd2,2.6);sun.position.set(-26,43,22);sun.target.position.set(0,0,-2);scene.add(sun,sun.target);
  sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
  Object.assign(sun.shadow.camera,{left:-33,right:33,bottom:-30,top:33,near:1,far:104});
  sun.shadow.normalBias=.047;sun.shadow.bias=-.00017;sun.shadow.radius=3;
  const fill=new T.DirectionalLight(0xe6eeff,.32);fill.position.set(16,12,-30);scene.add(fill);
  const floor=new T.ShadowMaterial({color:0x393d31,opacity:.11,depthWrite:false});
  const ground=new T.Mesh(new T.PlaneGeometry(130,130),floor);ground.rotation.x=-Math.PI/2;ground.position.y=-2.565;ground.receiveShadow=true;scene.add(ground);
  const contact=new T.Mesh(new T.PlaneGeometry(57,57),new T.ShaderMaterial({
    transparent:true,depthWrite:false,toneMapped:false,
    vertexShader:'varying vec2 p; void main(){p=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec2 p; void main(){
      vec2 a=abs(p-vec2(.44,.18))-vec2(19.65); 
      float d=length(max(a,0.))+min(max(a.x,a.y),0.)-1.0;
      float alpha=exp(-max(d,0.)*max(d,0.)*.33)*.24;
      gl_FragColor=vec4(.28,.29,.24,alpha);
    }`,
  }));
  contact.rotation.x=-Math.PI/2;contact.position.y=-2.555;contact.renderOrder=-1;scene.add(contact);

  const ctx=makeWorld(root);
  buildTerrain(ctx);
  buildCastle(ctx);
  buildVillage(ctx);
  const fieldLayout=buildFields(ctx);
  buildCharacters(ctx,camera,{
    knight:[[-.50,4.65],[.93,5.25],[.13,6.01],[-1.04,4.06]],
    farmer:fieldLayout?.farmerRoute ?? [[6,14.96],[4.88,15.04],[5.55,14.88],[6.88,14.97]],
  });
  const weather=buildWeather(ctx,scene,sun,hemi,floor,reduced);
  batchSolids(root);
  setupWeatherPanel(weather).catch(console.error);

  let resolutionScale=1;
  function resize(){
    const w=slot.clientWidth,h=slot.clientHeight;
    if(!w||!h)return;
    const aspect=w/h, height=Math.max(41.2,65.5/aspect);
    camera.left=-height*aspect/2;camera.right=height*aspect/2;
    camera.bottom=-height/2;camera.top=height/2;camera.updateProjectionMatrix();
    const maxDpr=w*h>1800000?1.15:1.4;
    renderer.setPixelRatio(Math.max(.65,Math.min(window.devicePixelRatio||1,maxDpr)*resolutionScale));
    renderer.setSize(w,h,false);
  }
  resize();new ResizeObserver(resize).observe(slot);
  let last=0,sim=0,shadowAt=0,sampleTime=0,sampleCount=0;
  renderer.setAnimationLoop(ms=>{
    try {
      const elapsed=last?(ms-last)/1000:0;last=ms;
      const step=Math.min(elapsed,.16);
      sim+=step*(reduced?.2:1);
      if(ms>=shadowAt){renderer.shadowMap.needsUpdate=true;shadowAt=ms+(reduced?380:115);}
      // Preserve edge quality on fast devices; trade resolution for motion on slower ones.
      if(elapsed>0&&elapsed<.5&&!document.hidden){sampleTime+=elapsed;sampleCount++;}
      if(sampleTime>=2.2){
        const fps=sampleCount/sampleTime;
        if(fps<28&&resolutionScale>.66){resolutionScale=Math.max(.65,resolutionScale*.84);resize();}
        sampleTime=0;sampleCount=0;
      }
      orbit.update(step);const climate=weather.update(sim,step);
      for(const fn of ctx.updates)fn(sim,step,climate);
      renderer.render(scene,camera);
      if(!loading.hidden){loading.hidden=true;document.documentElement.dataset.ready='true';}
    } catch (error) {renderer.setAnimationLoop(null);showError(error);}
  });
} catch(error) {showError(error);}

function showError(error){
  loading.hidden=false;
  loading.textContent='暂时无法绘制蓟丘领。请确认浏览器已启用 WebGL 2 和硬件加速，然后刷新重试。';
  console.error(error);
}
