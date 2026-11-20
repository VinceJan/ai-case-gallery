// Each animation cel is painted on a tiny canvas. Filtering stays nearest-neighbour
// on the lit cutout, but the matching flattened shadow deliberately has soft edges.
function paintCel(kind,action,phase) {
  const c=document.createElement('canvas'); c.width=32;c.height=36;
  const g=c.getContext('2d');
  const rect=(color,x,y,w,h)=>{g.fillStyle=color;g.fillRect(x,y,w,h);};
  const shape=(color,ps)=>{g.fillStyle=color;g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.fill();};
  const n=phase%4, walk=action==='walk', work=action==='work';
  const sway=walk?[0,1,0,1][n]:work?[0,1,1,0][n]:0;
  const step=walk?[3,0,-3,0][n]:0;
  g.save();g.translate(0,-sway);
  if(kind==='knight') {
    const edge='#494950', armor='#969ea4', shade='#687784', pale='#c2c3bc', shine='#d4d1bf', ruby='#933f49';
    const fly=[0,-1,-2,-1][n];
    shape(edge,[[10,16],[18,18],[16,30],[4+fly,32],[5+fly,26],[7,19]]);
    shape(ruby,[[10,17],[15,19],[13,29],[5+fly,31],[6+fly,25],[9,19]]);
    rect('#b76c68',7+fly,25,2,4);
    const legs=[[10+step,24,1],[17-step,24,-1]];
    for(const [x,y,side] of legs){rect(edge,x,y,5,9);rect(shade,x+1,y+1,3,6);rect(armor,x+1,y+1,3,3);rect(edge,x+(side<0?-1:1),y+7,6,2);rect('#89909a',x+1,y+7,4,1);}
    rect(edge,10,15,13,11);rect(shade,11,16,11,9);rect(armor,12,17,9,5);
    rect(pale,12,17,2,4);rect('#65544c',11,22,11,2);rect('#cca576',16,22,3,2);
    rect(edge,9,16,5,6);rect(shade,9,17,4,4);rect(pale,10,16,4,2);
    const arm=walk?step>0?1:0:work?[0,-1,-1,0][n]:0;
    // Warm cream boss and a muted vermilion heraldic diamond on a slate blue shield.
    const sh=[ [19,18],[28,18],[29,20],[29,25],[27,28],[24,30],[21,28],[19,26],[18,22] ].map(([x,y])=>[x,y+arm]);
    shape(edge,sh);shape('#b7a58f',sh.map(([x,y])=>[24+(x-24)*.86,24+arm+(y-24-arm)*.84]));
    shape('#657f8a',[[21,20+arm],[27,20+arm],[27,25+arm],[24,28+arm],[21,25+arm]]);
    rect('#d3c9ab',23,21+arm,2,5);rect('#d3c9ab',22,22+arm,4,2);rect('#b7675e',23,22+arm,2,2);
    // Helmet: chamfered crown, recessed visor, and a trailing dyed plume.
    rect(edge,10,6,11,11);rect(edge,8,9,16,6);rect(edge,11,15,13,3);
    rect(armor,10,8,12,8);rect(pale,12,7,8,3);rect(pale,10,10,3,4);rect(shine,12,8,2,2);
    rect(shade,14,15,9,2);rect('#444752',15,11,9,3);rect('#60616a',16,11,8,1);rect('#b3a99a',18,14,5,1);
    rect(shade,9,12,3,3);rect('#bba285',10,12,1,1);
    rect('#754955',15,4,3,3);rect(ruby,10+fly,2,8-fly,3);rect('#b66e72',9+fly,3,6,1);rect(ruby,7+fly,4,5,2);rect('#a75462',7+fly,6,2,1);
  } else {
    const edge='#565347', green='#718371', dark='#586b5f', jean='#626675', gold='#bd955e', skin='#c59470';
    for(const [x,y] of [[11+step,25],[17-step,25]]){rect(edge,x,y,5,8);rect(jean,x+1,y,3,6);rect('#806759',x-1,y+6,6,2);}
    rect(edge,10,15,13,12);rect(green,11,17,11,8);rect(dark,12,21,9,4);rect('#b8926c',11,24,11,2);
    rect('#927765',15,17,2,7);rect('#b69d76',17,17,2,7);rect('#ccbd91',18,22,1,1);
    rect(edge,12,9,11,8);rect(skin,13,10,9,6);rect('#8d6557',13,10,3,4);rect('#deb18b',16,10,6,4);
    rect('#514e45',20,11,1,2);rect('#a16554',20,14,3,1);
    // Broken-up straw weave, band and broad hat brim.
    rect(edge,11,5,11,6);rect(edge,8,8,17,3);rect(gold,9,8,16,2);rect('#cda96d',12,5,9,3);rect('#dbbb81',13,6,6,1);
    rect('#a16f53',12,7,9,1);rect('#dcbd87',10,8,13,1);rect('#a77c52',9,10,14,1);
    rect(edge,9,16,4,7);rect('#8f9975',9,16,3,4);rect(skin,10,20,2,3);
    const a=work?[0,2,5,3][n]:walk?[1,0,-1,0][n]:0;
    rect(edge,21,17,4,5);rect(green,21,17,4,3);rect(edge,23,20,4,3);rect(skin,24,20,3,2);
    g.save();g.translate(25,21);g.rotate((a*.13)-.25);
    rect('#715743',0,-9,2,19);rect('#b18962',0,-9,1,19);
    rect('#6a6353',-3,8,8,2);rect('#7d7c6a',-3,9,1,3);rect('#7d7c6a',0,9,1,3);rect('#7d7c6a',3,9,1,3);
    g.restore();
  }
  g.restore();return c;
}

export function buildCharacters(ctx,camera,paths) {
  const {T,root,group,box,mesh,updates,rng,pick}=ctx;
  const shadowGeo = new T.PlaneGeometry(1,1);
  const clockReduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function textures(kind,action,i){
    const a=paintCel(kind,action,i), tex=new T.CanvasTexture(a);
    tex.magFilter=T.NearestFilter;tex.minFilter=T.NearestMipmapLinearFilter;tex.colorSpace=T.SRGBColorSpace;
    const b=document.createElement('canvas');b.width=80;b.height=90;
    const p=b.getContext('2d');p.filter='blur(2.5px)';p.drawImage(a,0,0,b.width,b.height);p.filter='none';p.globalCompositeOperation='source-in';p.fillStyle='#fff';p.fillRect(0,0,b.width,b.height);
    return [tex,new T.CanvasTexture(b)];
  }
  const ease=x=>x*x*(3-2*x), lerp=T.MathUtils.lerp;
  for(const [idx,kind] of ['knight','farmer'].entries()){
    const start=group(root); start.userData.dynamic=true;
    const actor=group(start);const height=idx?1.52:1.66, width=height*32/36;
    const anim=Object.fromEntries(['idle','walk','work'].map(a=>[a,Array.from({length:4},(_,i)=>textures(kind,a,i))]));
    const material=new T.MeshStandardMaterial({map:anim.idle[0][0],alphaTest:.34,roughness:.92,side:T.DoubleSide});
    const card=mesh(actor,new T.PlaneGeometry(width,height),material,0,height*.425,0);card.castShadow=false;
    const shadeMat=new T.MeshBasicMaterial({color:0x444d36,map:anim.idle[0][1],transparent:true,opacity:.33,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,side:T.DoubleSide});
    const shade=mesh(start,shadowGeo.clone(),shadeMat,0,.012,0);shade.castShadow=shade.receiveShadow=false;
    const crumbs=Array.from({length:9},()=>{
      const m=box(root,.08,.019,.052,0,-10,0,pick(idx?[0xbc9d63,0xc9ad76,0xe3c58c]:[0xad8954,0xb59b68,0x8c8657]));m.userData.dynamic=true;m.castShadow=false;m.visible=false;
      return {m,angle:rng()*Math.PI*2,speed:.26+rng()*.42,height:.15+rng()*.17,spin:rng()*4,origin:new T.Vector3(),time:-5};
    });
    let last=-1,lastCel='',facing=1;
    const route=paths[kind], period=8.8+(idx*.9);
    const head=new T.Vector3();
    updates.push((t,dt,weather)=>{
      const a=t+idx*3.2, segment=Math.floor(a/period), local=a%period;
      const p=route[segment%route.length], q=route[(segment+1)%route.length];
      const progress=ease(T.MathUtils.clamp((local-6.05)/(period-6.65),0,1));
      const action=local>6.05&&local<period-.60?'walk':idx&&((local>1.2&&local<3.05)||(local>3.8&&local<5.65))?'work':'idle';
      const stride=action==='walk'?Math.floor(local*6):action==='work'?Math.floor(local*5.2):Math.floor(local*2.7);
      const pace=action==='idle'?(Math.sin(local*2.5)*.011):0;
      start.position.set(lerp(p[0],q[0],progress),.122,lerp(p[1],q[1],progress));
      head.copy(camera.position).sub(start.position); actor.rotation.y=Math.atan2(head.x,head.z);
      if(action==='walk') facing=(q[0]-p[0])*Math.cos(actor.rotation.y)-(q[1]-p[1])*Math.sin(actor.rotation.y)>=0?1:-1;
      else facing=(Math.floor(local/1.74)+segment)%2===0?1:-1;
      card.scale.x=facing;card.scale.y=1+pace;card.position.y=height*.425+pace*.22;
      const cel=action+stride%4;
      if(lastCel!==cel){lastCel=cel;[material.map,shadeMat.map]=anim[action][stride%4];}
      shadeMat.opacity=.32*(1-weather.cloud*.44);
      // Project the current silhouette in the approximate direction opposite the key light.
      const attr=shade.geometry.attributes.position, c=Math.cos(actor.rotation.y), s=Math.sin(actor.rotation.y);
      for(let i=0;i<4;i++){
        const u=(i%2-.5)*width*facing,v=i<2?1:0;
        attr.setXYZ(i,u*c+v*.78,0,-u*s-v*.66);
      }
      attr.needsUpdate=true; shade.frustumCulled=false;
      if(stride!==last){last=stride;
        if(!clockReduced && action!=='idle'&&stride%3===0){
          const startIndex=3*(Math.floor(stride/3)%3);
          for(let j=startIndex;j<startIndex+3;j++){
            const f=crumbs[j];f.time=t;f.origin.copy(start.position);f.origin.x+=action==='work'?.25*facing:0;
          }
        }
      }
      for(const f of crumbs){
        const life=(t-f.time)/1.25;f.m.visible=life>=0&&life<1;
        if(f.m.visible){f.m.position.set(f.origin.x+Math.cos(f.angle)*life*f.speed+life*.12*weather.wind,.14+Math.sin(life*Math.PI)*f.height,f.origin.z+Math.sin(f.angle)*life*f.speed);f.m.rotation.set(life*f.spin,f.angle+life*3,life*2);f.m.scale.set(.08*(1-life*.85),.019,.052*(1-life*.85));}
      }
    });
  }
}
