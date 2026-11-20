// Groundwork and masonry shared by the valley, village and orchard terraces.
export function buildTerrain(ctx) {
  const {T,root,group,mesh,box,ball,cyl,beam,rng,pick,water}=ctx;
  const land=group(root);
  const corner=0.88, radius=21;
  const outline=[[-radius+corner,-radius],[radius-corner,-radius],[radius,-radius+corner],[radius,radius-corner],[radius-corner,radius],[-radius+corner,radius],[-radius,radius-corner],[-radius,-radius+corner]];
  const canal=[[-19.6,10],[16.5,10],[16.5,-16.9],[18.55,-16.9],[18.55,11.86],[-19.6,11.86]];
  function path(points,shape=new T.Shape()){
    points.forEach(([x,z],i)=>i?shape.lineTo(x,-z):shape.moveTo(x,-z)); shape.closePath(); return shape;
  }
  function flat(shape,y,color){
    const m=mesh(land,new T.ShapeGeometry(shape),color,0,y,0); m.rotation.x=-Math.PI/2; return m;
  }
  function slab(points,top,depth,color,bevel=.13) {
    const geo=new T.ExtrudeGeometry(path(points),{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:1});
    const m=mesh(land,geo,color,0,top-depth,0); m.rotation.x=-Math.PI/2; return m;
  }
  const inset=amount=>outline.map(([x,z])=>[x*(1-amount/21),z*(1-amount/21)]);
  slab(inset(.12),-2.12,.27,0x797162,.16);
  slab(inset(.22),-.20,1.99,0x817665,.12);
  slab(inset(.02),-.17,.29,0xa59b80,.095);
  const greens=new T.MeshStandardMaterial({color:0x929f68,roughness:1});
  greens.onBeforeCompile=s=>{
    s.vertexShader='varying vec3 mossP;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n mossP=(modelMatrix*vec4(position,1.)).xyz;');
    s.fragmentShader='varying vec3 mossP;\n'+s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float lo=sin(mossP.x*.30-mossP.z*.19)*sin(mossP.z*.47+mossP.x*.23);
      float fine=sin(mossP.x*1.3+sin(mossP.z*.87))*sin(mossP.z*.91-mossP.x*.45);
      diffuseColor.rgb *= 1.+lo*.10+fine*.038;
      diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.36,.34,.17),max(0.,lo-.43)*.17);
    `);
  };
  const lawn=path(outline); lawn.holes.push(path(canal,new T.Path())); flat(lawn,.08,greens);
  const paving=[0x9d9077,0xa3977d,0x94866f,0x8e826f,0xaa9c82,0x998c76,0x8e8170];
  for(let side=0;side<8;side++){
    const [ax,az]=outline[side],[bx,bz]=outline[(side+1)%8];
    const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),ux=dx/len,uz=dz/len;
    const strip=group(land,(ax+bx)*.5,(0),(az+bz)*.5); strip.rotation.y=-Math.atan2(uz,ux);
    for(let row=0;row<4;row++){
      let p=-len/2 + .095;
      while(p<len/2-.13){
        const w=Math.min(len/2-p-.09,((row%2 && p<-len/2+.11)?.83:1.48)+rng()*.85);
        box(strip,w-.028,.40+(rng()-.5)*.04,.18,p+w/2,-1.94+row*.456,-.12+(.05*rng()),pick(paving));
        p+=w+.014;
      }
    }
  }
  // The cut through the topsoil forms an actual recessed L-shaped irrigation canal.
  for (let i=0;i<canal.length;i++){
    const [ax,az]=canal[i],[bx,bz]=canal[(i+1)%canal.length];
    const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz),g=group(land,(ax+bx)/2,-.045,(az+bz)/2);
    g.rotation.y=-Math.atan2(dz,dx);
    box(g,len,.295,.065,0,-.026,0,0x796c56);
    for(let k=0;k<len*1.5;k++){
      const pos=(rng()-.5)*(len-.2), out=(rng()-.5)*.23;
      const b=ball(g,.12+rng()*.13,pos,.10,out,pick([0x8b8d66,0x9b9879,0xa4a183,0x7a856b]));
      b.scale.multiply(new T.Vector3(1.38,.58,.82)); b.rotation.y=rng()*6;
      if(rng()<.28 && Math.hypot(b.getWorldPosition(new T.Vector3()).x)>1.8){
        for(let j=0;j<3;j++) beam(g,[pos+j*.075,.125,out],[pos+j*.078+(rng()-.4)*.17,.26+rng()*.28,out+.07],.027,pick([0x778556,0x879557,0xa6aa6a]));
      }
    }
  }
  // The masonry lip tops out at y=-.075; set the water just above it and below the turf.
  water(land,38.15,1.86,-.525,-.047,10.93); water(land,2.05,26.9,17.525,-.047,-3.45);

  function lane(points, color, y=.102){
    const left=[],right=[];
    points.forEach(([x,z,w],i)=>{
      const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)];
      const dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz);
      left.push([x+w*dz/l,z-w*dx/l]); right.push([x-w*dz/l,z+w*dx/l]);
    });
    const m=flat(path([...left,...right.reverse()]),y,color); m.castShadow=false;
  }
  lane([[0,21,1.26],[.14,18.8,1.28],[-.14,15.2,1.24],[.05,12.15,1.34],[.05,11.88,1.35]],0xc1ad82);
  lane([[.05,9.98,1.34],[.03,8.86,1.34],[-.18,7,1.43],[0,4.85,1.38],[.2,2.1,1.22],[-.2,-.3,1.48],[0,-3.95,1.25]],0xc6b288);
  lane([[-12,2.3,.42],[-8.6,2.9,.57],[-6.1,3.55,.74],[-3.6,2.55,.76],[0,2.5,1.2],[3,3.7,.76],[6.9,3.45,.62],[9.9,2.42,.67],[13.4,2.9,.39]],0xc4ad83,.108);
  lane([[-12.4,2.5,.39],[-13.4,1.3,.44],[-13.64,-.25,.40],[-13.01,-1.81,.34],[-11.95,-2.48,.31]],0xb9ab7d,.109);
  lane([[-1.35,13.65,.28],[-3.3,13.15,.34],[-7,12.18,.32],[-13.75,12.25,.43]],0xb2a575,.108);
  for(let i=0;i<182;i++){
    const z=-3.1+rng()*24, x=(rng()-.5)*2.32;
    if(z>9.1&&z<12.75) continue;
    const s=ball(land,.047+rng()*.144,x,.113,z,pick([0xcdbb93,0xd0b88e,0xbca780,0xb6a789]));
    s.scale.multiply(new T.Vector3(1.2,.16,.85));
  }
  // A humpback bridge with a masonry arch, voussoirs, and stone parapets.
  const bridge=group(land,.05,0,10.94), stones=[0xa6a08c,0xb0a58e,0xbbaf97,0x9d927b,0xbab299];
  const steps=14;
  for(let j=0;j<steps;j++){
    const z1=-1.94+3.88*j/steps,z2=-1.94+3.88*(j+1)/steps,z=(z1+z2)/2;
    const y=.13+.57*(1-Math.pow(Math.abs(z)/1.94,1.7));
    const bottom=Math.abs(z)<1.06?-.19+.65*Math.sqrt(Math.max(0,1-(z/1.09)**2)):-.31;
    const d=z2-z1;
    box(bridge,2.53,y-bottom,d+.003,0,(y+bottom)/2,z,pick(stones));
    for(const side of [-1,1]){
      box(bridge,.22,.25,d+.004,side*1.30,y+.105,z,pick(stones));
      box(bridge,.30,.08,d-.014,side*1.3,y+.245,z,0xb9ac93);
      if(j===0 || j===steps-1){box(bridge,.39,.50,.40,side*1.31,y+.17,z,0x9f977f);box(bridge,.48,.105,.47,side*1.31,y+.461,z,0xc0b49c);}
    }
    for(let k=0;k<6;k++) box(bridge,.39,d*.095,d-.015,(k-2.5)*.407,y+.009,z,pick(stones));
  }
  for(const side of [-1,1]) for(let i=0;i<13;i++){
    const a=(i+.5)*Math.PI/13, z=Math.cos(a)*1.04, y=Math.sin(a)*.69-.16;
    const s=box(bridge,.11,.19,.259,side*1.303,y,z,i===6?0xd2c4a9:pick(stones));
    s.rotation.x=Math.atan2(Math.cos(a)*.69,Math.sin(a)*1.04);
  }
  // Corner rosettes are inset into the hand-built plinth.
  for(const x of [-18.8,18.8]) {
    const bolt=cyl(land,.166,.166,.045,x,-1.24,21.001,0x917a56,8); bolt.rotation.x=Math.PI/2;
    const pin=cyl(land,.079,.079,.074,x,-1.24,21.018,0xb9a077,8); pin.rotation.x=Math.PI/2;
  }
  for(let i=0;i<110;i++){
    let x=(rng()-.5)*39, z=(rng()-.5)*39;
    if(Math.abs(x)<1.9 || (x>16.1&&x<18.8&&z>-17.12&&z<12.1) || (z>9.79&&z<12.05)) continue;
    const ring=(Math.abs(x)>15.7 && z<9.6) || z>18.8 || (z<-5.9 && Math.abs(x)>11.5);
    if(!ring) continue;
    const scale=.1+rng()*.22;
    const tint=pick([0xa3aa71,0x758953,0x7f935d,0xabb67c]);
    for(let j=0;j<3;j++) beam(land,[x+(j-1)*.08,.084,z],[x+(j-1)*.16,.09+scale*(1-Math.abs(j-1)*.33),z+(rng()-.5)*.18],.032,tint,.043);
    if(rng()<.25) ball(land,.065,x,.13+scale,z,pick([0xe1c68d,0xd0b474,0xc6a491,0xf1dfae]));
  }
}
