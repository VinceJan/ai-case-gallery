import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function makeWorld(root) {
  let seed = 3874009;
  const rng = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const pick = a => a[Math.floor(rng()*a.length)];
  const mats = new Map(), geos = new Map(), updates = [];
  const get = (key, fn) => { if (!geos.has(key)) geos.set(key,fn()); return geos.get(key); };
  const mat = color => {
    if (color?.isMaterial) return color;
    if (!mats.has(color)) {
      const surface=new T.MeshStandardMaterial({color, roughness:.89, flatShading:true});
      surface.userData.solidColor=true;
      mats.set(color,surface);
    }
    return mats.get(color);
  };
  function group(parent, x=0, y=0, z=0) {
    const g = new T.Group(); g.position.set(x,y,z); parent.add(g); return g;
  }
  function mesh(parent, geometry, color, x=0, y=0, z=0) {
    const m = new T.Mesh(geometry,mat(color)); m.position.set(x,y,z);
    m.castShadow = m.receiveShadow = true; parent.add(m); return m;
  }
  function box(parent,w,h,d,x,y,z,color) {
    const m = mesh(parent, get('box',()=>new T.BoxGeometry()),color,x,y,z); m.scale.set(w,h,d); return m;
  }
  function cyl(parent,rt,rb,h,x,y,z,color,n=12) {
    const r=Math.max(rt,rb,.001);
    const m=mesh(parent,get(`cyl${Math.round(rt/r*1000)},${Math.round(rb/r*1000)},${n}`,()=>new T.CylinderGeometry(rt/r,rb/r,1,n)),color,x,y,z);
    m.scale.set(r,h,r); return m;
  }
  function ball(parent,r,x,y,z,color,detail=0) {
    const m=mesh(parent,get('ico'+detail,()=>new T.IcosahedronGeometry(1,detail)),color,x,y,z); m.scale.setScalar(r); return m;
  }
  const axis = new T.Vector3(0,1,0);
  function beam(parent,a,b,w,color,depth=w) {
    const va=new T.Vector3(...a), vb=new T.Vector3(...b), delta=vb.clone().sub(va);
    const m=box(parent,w,delta.length(),depth,(va.x+vb.x)/2,(va.y+vb.y)/2,(va.z+vb.z)/2,color);
    m.quaternion.setFromUnitVectors(axis,delta.normalize()); return m;
  }
  const wave = {time:{value:0}, flow:{value:1}, damp:{value:0}};
  const waterMat = new T.MeshStandardMaterial({color:0x509598, roughness:.32, metalness:.025});
  waterMat.onBeforeCompile = s => {
    Object.assign(s.uniforms,wave);
    s.vertexShader = 'varying vec3 basinP;\n' + s.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n basinP = (modelMatrix * vec4(position, 1.0)).xyz;');
    s.fragmentShader = 'varying vec3 basinP; uniform float time; uniform float flow; uniform float damp;\n' + s.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      vec2 p = basinP.xz;
      float foam = sin(p.x*2.15 + p.y*5.8 + sin(p.x*.90-p.y*1.9 + time*.55)*1.65-time*1.1*flow);
      float islands = sin(p.x*1.92+p.y*1.15 + time*.35)*sin(p.x*.43-p.y*1.22-time*.46);
      float ripple = smoothstep(.92,.998,foam)*smoothstep(.22,.91,islands);
      float tint = .14*sin(p.x*.57+p.y*.53)+.08*sin(p.x*1.8-p.y*1.12 + time*.6);
      vec2 cell = floor(p*2.85);
      float shift = fract(sin(dot(cell,vec2(52.61,31.41)))*4128.32);
      float count = fract(time*1.75+shift*9.);
      vec2 dropAt = fract(p*2.85)-vec2(.35+.26*shift,.55-.16*shift);
      float drops = (1.-smoothstep(.024,.065,abs(length(dropAt)-count*.38)))*(1.-count)*step(.47,shift);
      diffuseColor.rgb *= 1.+tint;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.64,.83,.74), ripple*.62 + drops*damp*.54);
    `);
  };
  function water(parent,w,d,x,y,z,_seed=0) {
    const m = mesh(parent,new T.PlaneGeometry(w,d),waterMat,x,y,z); m.rotation.x=-Math.PI/2;
    m.userData.dynamic = true; m.castShadow=false; return m;
  }
  updates.push((t,dt,weather)=>{ wave.time.value=t; wave.flow.value=.7+weather.wind*.55; wave.damp.value=weather.rain; });
  return {T,root,rng,pick,mat,mesh,box,cyl,ball,group,beam,water,updates};
}

export function batchSolids(root) {
  root.updateMatrixWorld(true);
  const batches=new Map(), owned=new Set(), retained=new Set();
  const solidMaterial=new T.MeshStandardMaterial({vertexColors:true,roughness:.89,flatShading:true});
  root.traverse(m=>{
    if (!m.isMesh) return;
    let p=m, makesDynamic=false;
    while (p) { if (p.userData.dynamic || !p.visible) { makesDynamic=true; break; } p=p.parent; }
    if (makesDynamic || m.isInstancedMesh || m.isSkinnedMesh || Array.isArray(m.material) || m.material.transparent || m.customDepthMaterial || m.material.alphaTest>0) {
      retained.add(m.geometry); return;
    }
    const solid=m.material.userData.solidColor;
    const keys=solid?'position,normal,color':Object.keys(m.geometry.attributes).sort().join(',');
    const key=[solid?'solid':m.material.id,m.castShadow,m.receiveShadow,Boolean(m.geometry.index),keys].join(':');
    if (!batches.has(key)) batches.set(key,[]);
    batches.get(key).push(m);
  });
  const inverse=root.matrixWorld.clone().invert();
  for (const batch of batches.values()) {
    if (batch.length<2) { retained.add(batch[0].geometry); continue; }
    const solid=batch[0].material.userData.solidColor;
    const parts=batch.map(m=>{
      const geo=m.geometry.clone().applyMatrix4(inverse.clone().multiply(m.matrixWorld));
      if(!solid)return geo;
      for(const key of Object.keys(geo.attributes)) if(key!=='position'&&key!=='normal') geo.deleteAttribute(key);
      if(!geo.hasAttribute('normal')) geo.computeVertexNormals();
      const colors=new Float32Array(geo.attributes.position.count*3);
      const {r,g,b}=m.material.color;
      for(let i=0;i<colors.length;i+=3){colors[i]=r;colors[i+1]=g;colors[i+2]=b;}
      geo.setAttribute('color',new T.BufferAttribute(colors,3));
      return geo;
    });
    const geometry=mergeGeometries(parts);
    for (const g of parts) g.dispose();
    if(!geometry){ for (const m of batch) retained.add(m.geometry); continue; }
    const b=new T.Mesh(geometry,solid?solidMaterial:batch[0].material);
    b.castShadow=batch[0].castShadow; b.receiveShadow=batch[0].receiveShadow;
    root.add(b);
    for (const m of batch) { owned.add(m.geometry); m.removeFromParent(); }
  }
  for (const g of owned) if(!retained.has(g)) g.dispose();
}
