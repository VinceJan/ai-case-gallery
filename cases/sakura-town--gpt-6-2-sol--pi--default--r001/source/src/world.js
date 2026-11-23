import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const riverX = z => 22 + 2.5 * Math.sin(z*.087) + .7 * Math.sin(z*.24);
export const riverWidth = z => 6.5 + .65 * Math.cos(z*.18);
export const riverWalk = z => riverX(z) - riverWidth(z)/2 - 2.9;
export const benchPoint = [riverWalk(9)-.4, 9];
export const petalPoint = [-4.2, 15.5];

export function batch(root) {
  root.updateWorldMatrix(true,true);
  const inv = root.matrixWorld.clone().invert(), map = new Map();
  root.traverse(mesh => {
    if (!mesh.isMesh || Array.isArray(mesh.material) || mesh.isInstancedMesh || mesh.material.transparent || mesh.userData.noBatch) return;
    // Keep view-specific groups separate by batching each room independently.
    const m = mesh.material;
    const g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    const key = `${m.uuid}/${mesh.castShadow}/${mesh.receiveShadow}/${Object.keys(g.attributes).sort().join(',')}`;
    g.applyMatrix4(inv.clone().multiply(mesh.matrixWorld));
    if (!map.has(key)) map.set(key, {mesh, geometries:[], source:[]});
    const entry = map.get(key); entry.geometries.push(g); entry.source.push(mesh);
  });
  for (const {mesh, geometries, source} of map.values()) {
    if (source.length < 2) {geometries[0].dispose(); continue;}
    const geo = mergeGeometries(geometries);
    geometries.forEach(g => g.dispose());
    if (!geo) continue;
    const merged = new T.Mesh(geo,mesh.material);
    merged.castShadow = mesh.castShadow; merged.receiveShadow = mesh.receiveShadow;
    root.add(merged); source.forEach(m => m.removeFromParent());
  }
}

export function makeLandscape(root) {
  let seed = 984365;
  const rand = () => ((seed = (Math.imul(1664525, seed)+1013904223)>>>0) / 4294967296);
  const between = (a,b) => a + rand()*(b-a);
  const mats = new Map();
  const toon = color => {
    if (!mats.has(color)) mats.set(color, new T.MeshToonMaterial({color}));
    return mats.get(color);
  };
  const choose = a => a[Math.floor(rand()*a.length)];
  const cube = new T.BoxGeometry(1,1,1), blob = new T.IcosahedronGeometry(1,1), coarse = new T.IcosahedronGeometry(1,0), grassBlade = new T.ConeGeometry(1,1,3);
  function shape(geo,color,x,y,z,sx,sy,sz,shadow=true,angle=0) {
    const o = new T.Mesh(geo,toon(color)); o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.y=angle;
    o.castShadow = shadow; o.receiveShadow = true; root.add(o); return o;
  }
  const box = (c,x,y,z,w,h,d,s=true,a=0) => shape(cube,c,x,y,z,w,h,d,s,a);
  function beam(c,a,b,r=0.14,r2=r) {
    const A=new T.Vector3(...a),B=new T.Vector3(...b), v=B.clone().sub(A);
    const o=new T.Mesh(new T.CylinderGeometry(r2,r,v.length(),6),toon(c)); o.position.copy(A.addScaledVector(v,.5));
    o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize()); o.castShadow=true; o.receiveShadow=true; root.add(o); return o;
  }
  function strip(left,right,y,material,step=2,z0=-110,z1=95) {
    const pos=[], uv=[];
    for (let z=z0;z<z1;z+=step) {
      let n=Math.min(z1,z+step); let a=left(z), b=right(z), c=left(n),d=right(n);
      let xy=(x,z,k)=>[x,typeof y==='function'?y(z,k):y,z];
      pos.push(...xy(a,z,0),...xy(c,n,0),...xy(b,z,1),...xy(b,z,1),...xy(c,n,0),...xy(d,n,1));
      uv.push(0,z,0,n,1,z,1,z,0,n,1,n);
    }
    const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.Float32BufferAttribute(pos,3)); geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.computeVertexNormals();
    const mesh=new T.Mesh(geo,material);mesh.receiveShadow=true;root.add(mesh);return mesh;
  }
  const west=z=>riverX(z)-riverWidth(z)/2, east=z=>riverX(z)+riverWidth(z)/2;
  strip(()=>-118, z=>west(z)-.65,0,toon(0x9db878));
  strip(z=>east(z)+.7,()=>130,0,toon(0x91b575));
  strip(z=>west(z)-.65,z=>west(z)+.55,(z,k)=>k?-.72:0,toon(0xc7b38c));
  strip(z=>east(z)-.6,z=>east(z)+.7,(z,k)=>k?0:-.72,toon(0xbdac82));
  const waterMat = new T.ShaderMaterial({
    uniforms:{uTime:{value:0}, fogColor:{value:new T.Color(0xd1e9e5)},fogNear:{value:43},fogFar:{value:122}},fog:true,
    vertexShader:`varying vec3 vWorld;\n#include <fog_pars_vertex>\nvoid main(){vWorld=position; vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}`,
    fragmentShader:`uniform float uTime;varying vec3 vWorld;\n#include <fog_pars_fragment>\nvoid main(){vec2 p=vWorld.xz;float s=sin(p.x*1.14 + sin(p.y*.43)*.32); float r=sin(p.y*3.65-uTime*1.9 + sin(p.x*2.42+p.y*.11)*2.1); float glint=smoothstep(.92,1.,r)*smoothstep(.1,.87,sin(p.x*.9+p.y*.65)); vec3 c=mix(vec3(.12,.46,.45),vec3(.29,.70,.64),.55+.44*s);c=mix(c,vec3(.74,.92,.79),glint*.57);gl_FragColor=vec4(c,1.);\n#include <colorspace_fragment>\n#include <fog_fragment>\n}`
  });
  strip(west,east,-.40,waterMat).userData.noBatch=true;
  strip(z=>riverWalk(z)-.92,z=>riverWalk(z)+.92,.025,toon(0xd4c59e),1,-29,32);
  strip(z=>riverWalk(z)-1.08,z=>riverWalk(z)-.9,.039,toon(0xb4a47e),1,-29,32);
  strip(z=>riverWalk(z)+.9,z=>riverWalk(z)+1.08,.039,toon(0xb4a47e),1,-29,32);
  const walk = 0xd7c7a5, curb=0xc2bba1, asphalt=0xb2b0a0;
  box(asphalt,1,.033,-.4,5.2,.06,63,false);
  box(asphalt,-8,.044,6.15,47,.062,4.95,false);
  for (const dx of [-2.62,2.62]) for (const [z,len] of [[-23.4,15.5],[-3.1,13.3],[20.65,23.6]]) {
    box(walk,1+dx*1.265,.075,z,1.3,.12,len,false);
    box(curb,1+dx,.10,z,.11,.15,len,false);
  }
  for (const dz of [-2.54,2.54]) for(const [x,w] of [[-17.75,24.5],[9.5,12]]) {
    box(walk,x,.078,6.15+dz*1.23,w,.12,1.42,false);
    box(curb,x,.106,6.15+dz,w,.14,.13,false);
    for(let xx=x-w/2+.37;xx<x+w/2;xx+=.89) box(0xc9b998,xx,.144,6.15+dz*1.23,.018,.009,1.23,false);
  }
  box(0xcebea0,-7.1,.053,2.95,10,.10,3.4,false);
  box(0xd7c497,-13.8,.028,17,1.45,.05,18.1,false,.18);
  box(0xcebea0,8.5,.027,-11.1,10.1,.048,1.1,false);
  box(0xcebea0,5.35,.034,-10.3,2.3,.05,1.1,false);
  for (const z of [-25,-20,-6,-1,12,17,22,27]) box(0xd3c5ac,1,.069,z, .085,.007,1.65,false);
  for (let i=0;i<6;i++) {
    box(0xe8e2c8,-1.03+i*.805,.077,2.65,.46,.009,1.18,false);
    box(0xe8e2c8,4.55,.077,4.21+i*.77,1.08,.009,.43,false);
  }
  // Layered physical ridges; only the walkable basin has a flat grade.
  const slopes=[];
  const groundHeight=(x,z)=>Math.max(0,...slopes.map(f=>f(x,z)));
  function hill(cx,cz,rx,rz,h,color,detail=24) {
    const verts=[],idx=[];
    const surface=(x,z)=>{
      const ax=(x-cx)/rx,az=(z-cz)/rz,d=Math.hypot(ax,az);
      if(d>=1)return -.24;
      const ridge=.96+.13*Math.cos(ax*10+az*5)+.064*Math.sin(ax*23-az*17);
      return (1-d)**.84*h*ridge-.24;
    };
    slopes.push(surface);
    for (let j=0;j<=detail;j++) for (let i=0;i<=detail;i++) {
      const x=cx+(i/detail*2-1)*1.06*rx,z=cz+(j/detail*2-1)*1.06*rz;
      verts.push(x,surface(x,z),z);
      if(i<detail&&j<detail){const k=j*(detail+1)+i;idx.push(k,k+detail+1,k+1,k+1,k+detail+1,k+detail+2);}
    }
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();
    const m=new T.Mesh(g,toon(color));m.receiveShadow=true;root.add(m);
  }
  hill(-95,-103,66,38,24,0x719da3);hill(-43,-111,53,35,24,0x80a7a8);hill(12,-117,64,43,22,0x779ea7);hill(65,-115,61,48,23,0x68929e);hill(111,-98,55,52,21,0x729f9f);
  hill(-70,-75,50,39,16,0x648e7a);hill(-32,-77,45,36,18,0x7da28a);hill(-2,-85,39,33,13,0x719b84);hill(41,-81,30,36,15,0x749787);hill(75,-78,51,37,19,0x749989);
  hill(-51,-34,29,29,15,0x7e9f76);hill(-55,7,27,30,14,0x86a772);hill(52,-24,21,36,15,0x7fa07b);hill(58,25,30,33,16,0x769571);hill(-43,44,25,21,13,0x82a36f);
  // Stylized cloud cards are geometry with soft silhouettes, behind the ridgelines.
  const clouds=new T.Group();root.add(clouds);
  const cloudMat=new T.MeshBasicMaterial({color:0xf5f5e1, fog:false});
  const cloudGeo=new T.SphereGeometry(1,16,8);
  for(const [x,y,z,w] of [[-112,21,-138,25],[-39,21,-153,36],[38,23,-147,26],[91,20,-132,31]]) {
    for(let i=0;i<6;i++) {
      const cl=new T.Mesh(cloudGeo,cloudMat);
      cl.position.set(x+(i-2.5)*w*.27,y+Math.sin((i+.2)*.71)*2.25,z+Math.cos(i)*4);
      cl.scale.set(w*between(.18,.35),between(1.1,3.8),between(2.3,5));clouds.add(cl);
    }
  }
  const wood=0x665341;
  const sakura = [0xf3b0b9,0xe99aa9,0xf7c4c9,0xf2b9c5,0xe9a6b6,0xffd6d7];
  const leaf = [0x6f9d72,0x83b079,0x8db77d,0x68976b,0xa5be80];
  const pines = [0x658d75,0x5d866c,0x77a37a,0x5e8977,0x85ae82];
  const treeRoots=[];
  function tree(x,z,s,pink=false,pine=false) {
    const colors=pink?sakura:pine?pines:leaf;
    if (Math.abs(x)<28 && Math.abs(z)<32) treeRoots.push([x,z,.36*s]);
    const elevation=groundHeight(x,z), height=(pink?3.65:3.8)*s, spread=(pink?1.98:1.55)*s;
    const lean=between(-.4,.4)*s;
    beam(wood,[x,elevation-.19*s,z],[x+lean,elevation+height*.85,z-.12*s],.25*s,.105*s);
    if(pine) {
      for(let i=0;i<5;i++) {
        const r = s*(1.54-i*.249);
        shape(blob,choose(colors),x+lean*i*.2,elevation+height*(.42+i*.145),z,r,1.02*s,r*.86,true,rand()*6);
      }
      return;
    }
    for(let i=0;i<6;i++) {
      const a=(i/6)*Math.PI*2+between(-.5,.5), r=between(.43,.93)*spread;
      const dx=Math.cos(a)*r, dz=Math.sin(a)*r;
      const y=elevation+height+between(-.55,.63)*s;
      beam(wood,[x+lean*.55,elevation+height*.49,z],[x+dx*.91,y-.39*s,z+dz*.91],.108*s,.035*s);
      shape(blob,choose(colors),x+dx,y,z+dz,between(.83,1.22)*s,between(.70,.95)*s,between(.76,1.16)*s,true,a);
      shape(blob,choose(colors),x+dx*1.26,y+.27*s,z+dz*1.15,.66*s,.52*s,.57*s,true,a+.7);
      if(pink) for (let j=0;j<2;j++) {
        const q=a+j*1.55;
        shape(coarse,choose(colors),x+dx+Math.cos(q)*.7*s,y+between(-.35,.62)*s,z+dz+Math.sin(q)*.68*s,.44*s,.34*s,.40*s,true,q);
      }
    }
    shape(blob,choose(colors),x+lean,elevation+height+.61*s,z,1.33*s,.96*s,1.1*s,true,2.24);
  }
  const blossomTrees=[[-14.2,5.5,1.32],[-5.3,15.4,1.21],[9,13.8,1.32],[15.5,1.8,1.17],[12.9,-8.2,1.19],[16.2,20.7,1.16],[-6.3,-6.9,1.05],[-23.2,11.8,1.26],[-2.2,-24.6,1.14],[-17.8,-16.7,1.26]];
  blossomTrees.forEach(([x,z,s])=>tree(x,z,s,true));
  for(const [x,z,s] of [[-24,-8,1.25],[-23,-21,1.55],[-26,17,1.44],[-14,-11,1.17],[-17,11,1.06],[8,-8.5,1.02],[14.8,25,1.16],[-10,24,1.33],[5.8,25,1.22],[-27,-27,1.46],[-28,21,1.25],[-2,26,1.05]]) tree(x,z,s,false,rand()>.45);
  for(let i=0;i<227;i++) {
    let z=between(-77,46), x=between(-56,50);
    if(Math.abs(z+13)<3.4 || Math.abs(x-1)<5 || (x>-33 && x<30 && z>-31 && z<29) || (x>west(z)-2 && x<east(z)+2)) continue;
    tree(x,z,between(.72,1.48),rand()<.085,rand()>.37);
  }
  // Pebbles, low ground cover and uneven green edge around the streets.
  for(let i=0;i<480;i++){
    let x=between(-32,35),z=between(-34,32);
    if(Math.abs(x-1)<4 || (z>2.15&&z<10.2&&x<15.5) || Math.abs(z+13)<2.75 || Math.abs(x-riverWalk(z))<1.35 || (x>west(z)-.6&&x<east(z)+1.1)) continue;
    const color=choose([0x8eaa68,0xaac481,0xb5c781,0x789d65,0x92b377]);
    const scale=between(.12,.36);
    if(rand()>.66) shape(blob,color,x,.04,z,scale,.08+scale*.35,scale*.72,false,rand()*6);
    else for(let j=0;j<3;j++) {
      const b=shape(grassBlade,color,x+between(-.12,.14),.12,z+between(-.12,.14),.036,scale,.048,false,rand()*6);b.rotation.z=between(-.45,.5);
    }
  }
  for(let i=0;i<137;i++){
    const z=between(-41,42); if(Math.abs(z+13)<2.5)continue;
    const x=rand()<.69? west(z)+between(-.65,.48): east(z)+between(-.48,.6),sc=between(.18,.58);
    shape(coarse,choose([0xbab49b,0xa3a391,0x8f9a89,0xc4bfa7]),x,-.21,z,sc,sc*.68,sc*.84,true,rand()*6);
  }
  for(let i=0;i<220;i++){
    const tree=choose(blossomTrees),a=rand()*6.28,d=between(.55,4);
    const x=tree[0]+Math.cos(a)*d,z=tree[1]+Math.sin(a)*d;
    shape(coarse,choose(sakura),x,.151,z,.05,.01,.095,false,a);
  }
  // Rail bridge abutments and guard walks on the river crossing.
  box(0xc1c2ad,riverX(-13),-.40,-13,riverWidth(-13)+2,.69,2.55,true);
  for(const z of [-14.37,-11.63]) {
    box(0x7b8780,riverX(z),.30,z,riverWidth(z)+2,.12,.095,true);
    for(let x=west(z)-.71;x<east(z)+.8;x+=.94)box(0x7b8780,x,.105,z,.085,.45,.10,true);
  }
  const fence=0x8e8065;
  for(const a of [-21,-10,-2,4,13,19,25]) for(let i=0;i<5;i++){
    const z=a+i*.97; if(Math.abs(z+13)<2 || (z>5.3&&z<7.9))continue;
    const x=west(z)-1.13;
    box(fence,x,.36,z,.11,.73,.11,true);
    if(i<4){let nz=z+.97;beam(0xa09274,[x,.52,z],[west(nz)-1.13,.52,nz],.047);}
  }
  const [bx,bz]=benchPoint;
  for(const dx of [-.54,.54]) box(0x576760,bx+dx,.25,bz,.13,.5,.49,true);
  for(const dz of [-.29,-.10,.09]) box(0x9d714d,bx,.52,bz+dz,1.52,.09,.16,true);
  for(const y of [.73,.90]) box(0x9d714d,bx,y,bz-.30,1.52,.12,.075,true);
  for(const [x,z] of [[4.6,9.4],[-4.4,2.5],[4.9,-7.5],[12.6,7.9],[-14.2,9.2]]) {
    box(0x6c816e,x,1.39,z,.11,2.75,.11,true);box(0xe6cf93,x,2.77,z,.33,.32,.31,true);box(0x546b61,x,2.95,z,.43,.13,.40,true);box(0x6c816e,x,.12,z,.24,.20,.24,true);
  }
  // Utility poles and cable sag follow the back of the street, not the path.
  const poles=[[-24,-10],[-13,-10],[-3.6,-10]];
  for(const [x,z] of poles){box(0x777d73,x,2.35,z,.16,4.7,.16,true);box(0x777d73,x,4.22,z,.95,.09,.11,true);box(0xb7b7a3,x,4.34,z,.13,.22,.12,true);}
  for(let i=1;i<poles.length;i++)for(const dx of [-.35,.35]){
    const a=poles[i-1],b=poles[i];
    const nodes=[new T.Vector3(a[0]+dx,4.24,a[1]),new T.Vector3((a[0]+b[0])/2+dx,3.78,-10),new T.Vector3(b[0]+dx,4.24,b[1])];
    const o=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(nodes),10,.028,4,false),toon(0x6d746c));root.add(o);
  }
  const petalGeo=new T.CircleGeometry(.084,5);petalGeo.scale(.72,1.45,1);
  const petalMat=new T.MeshBasicMaterial({color:0xfad0cb,side:T.DoubleSide});
  const petals=new T.InstancedMesh(petalGeo,petalMat,81);petals.frustumCulled=false;petals.instanceMatrix.setUsage(T.DynamicDrawUsage);
  const winds=Array.from({length:81},()=>{let [x,z]=choose(blossomTrees);return [x+between(-3,3),z+between(-3,3),rand()*6.8,between(.44,.95),rand()*6.3];});
  const tmp=new T.Object3D();
  return { petalMesh:petals, treeRoots, groundHeight, update(time){
    waterMat.uniforms.uTime.value=time;
    for(let i=0;i<winds.length;i++){
      const [x,z,y,v,k]=winds[i],h=(y-time*v%6.9+6.9)%6.9;
      tmp.position.set(x+(6.9-h)*.55+Math.sin(time*.76+k)*.63,.2+h,z+Math.sin(time*.6+k+h)*1.15);
      tmp.rotation.set(time*1.1+k,k+time*.54,time*.74+k);tmp.updateMatrix();petals.setMatrixAt(i,tmp.matrix);
    }petals.instanceMatrix.needsUpdate=true;
  }};
}
