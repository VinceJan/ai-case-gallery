import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function createWorld(scene) {
 const animations={flags:[],wheels:[],trees:[],smoke:[],water:[],clouds:[],wheat:[]};
 const ramp=new THREE.DataTexture(new Uint8Array([105,158,206,255]),4,1,THREE.RedFormat);ramp.needsUpdate=true;ramp.minFilter=ramp.magFilter=THREE.NearestFilter;
 const palette={grass:0x8d9c58,grass2:0x9caa68,grass3:0xaaba73,stone:0xabb0a1,stoneLight:0xc5c9b6,stoneDark:0x838d80,roof:0x8d5140,roofLight:0xab6450,wood:0x62523b,woodLight:0x96724b,plaster:0xe3d4af,water:0x739e9a,wheat:0xc8a755,wheatLight:0xe4c77b};
 const mats={};for(const [k,c]of Object.entries(palette))mats[k]=new THREE.MeshToonMaterial({color:c,gradientMap:ramp});
 const material=(color)=>new THREE.MeshToonMaterial({color,gradientMap:ramp});
 const root=new THREE.Group();scene.add(root);
 const boxGeo=new THREE.BoxGeometry(1,1,1), cylinderGeo=new THREE.CylinderGeometry(1,1,1,12), sphereGeo=new THREE.IcosahedronGeometry(1,1);
 function mesh(geo,mat,x,y,z,parent=root){const m=new THREE.Mesh(geo,typeof mat==='string'?mats[mat]:mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function box(w,h,d,x,y,z,mat='stone',parent=root){let m=mesh(boxGeo,mat,x,y,z,parent);m.scale.set(w,h,d);return m;}
 function cylinder(r,h,x,y,z,mat='wood',parent=root,rt=r,n=12){return mesh(new THREE.CylinderGeometry(rt,r,h,n),mat,x,y,z,parent);}
 function ball(r,x,y,z,mat,parent=root){let m=mesh(sphereGeo,mat,x,y,z,parent);m.scale.setScalar(r);return m;}
 function beam(a,b,r=.045,mat='wood',parent=root){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),mid=av.clone().add(bv).multiplyScalar(.5);const m=mesh(new THREE.CylinderGeometry(r,r,av.distanceTo(bv),6),mat,...mid.toArray(),parent);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),bv.sub(av).normalize());return m;}
 function roof(w,h,d,x,y,z,mat='roof',parent=root){const s=new THREE.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(0,h);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false});g.translate(0,0,-d/2);const m=mesh(g,mat,x,y,z,parent);return m;}
 function rounded(w,h,d,x,y,z,mat,r=.2){return mesh(new RoundedBoxGeometry(w,h,d,2,r),mat,x,y,z);}
 let seed=6721;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
 // A masonry-edged, rounded square specimen base.
 rounded(30,1.15,30,0,-.15,0,'stoneDark',.32);
 rounded(30.05,.22,30.05,0,.48,0,'stoneLight',.15);
 rounded(29.8,.32,29.8,0,.68,0,'grass',.2);
 for(let row=0;row<3;row++)for(let i=0;i<24;i++){
  let p=-14.45+i*1.23+(row%2)*.59;if(p>14.6)continue;
  for(let side=0;side<4;side++){
   const b=box(1.15,.28,.045,side<2?p:(side===2?-15.015:15.015),.22-row*.3,side<2?(side===0?15.015:-15.015):p,rand()>.7?'stoneLight':'stone');if(side>1)b.rotation.y=Math.PI/2;
  }
 }
 const plaqueCanvas=document.createElement('canvas');plaqueCanvas.width=512;plaqueCanvas.height=100;const pc=plaqueCanvas.getContext('2d');pc.fillStyle='#5a6355';pc.fillRect(0,0,512,100);pc.strokeStyle='#aeb59d';pc.lineWidth=2;pc.strokeRect(10,10,492,80);pc.font='24px Georgia';pc.fillStyle='#e2dfbf';pc.textAlign='center';pc.fillText('W I L L O W M E R E',256,61);const plaque=mesh(new THREE.PlaneGeometry(3.2,.62),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(plaqueCanvas)}),0,-.04,15.05);plaque.castShadow=false;
 // Rising land and retaining stone terraces.
 rounded(23,.4,13,0,1, -6.4,'grass2',.5);
 rounded(19,1.4,10,0,1.85,-8.9,'grass',.55);
 rounded(17.6,.2,9,0,2.65,-8.7,'grass2',.4);
 for(let r=0;r<4;r++)for(let i=0;i<28;i++){const x=-9.2+i*.68+(r%2)*.33;if(x>9.35)continue;box(.62,.29,.3,x,1.25+r*.31,-3.98,r%2?'stone':'stoneDark');}
 // Lower village plateau and orchard verges.
 rounded(18,.32,8,0,1.01,1.5,'grass2',.4);
 for(let side of[-1,1])for(let i=0;i<10;i++)box(.65,.35,.35,side*9,1.13,-2+i*.72,'stone');
 function path(points,width,y,color=0xc7b38b){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(p[0],y,p[1])));const verts=[],indices=[];const steps=80;for(let i=0;i<=steps;i++){let v=curve.getPoint(i/steps),t=curve.getTangent(i/steps),n=new THREE.Vector3(-t.z,0,t.x).multiplyScalar(width/2);verts.push(v.x+n.x,v.y,v.z+n.z,v.x-n.x,v.y,v.z-n.z);if(i<steps){let k=i*2;indices.push(k,k+2,k+1,k+1,k+2,k+3);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(indices);g.computeVertexNormals();return mesh(g,new THREE.MeshToonMaterial({color,gradientMap:ramp,side:THREE.DoubleSide}),0,0,0);}
 path([[-1,14],[-1,10],[0,7],[.7,4],[0,1]],1.05,.855);
 path([[-8,3],[-4,2],[0,2],[5,1],[9,3]],.8,1.185);
 path([[-1,4],[-4,5],[-8,7],[-12,10]],.6,.86);
 path([[1,7],[6,8],[9,10],[14,11]],.65,.86);
 // Broad center stairs climb to the protected estate.
 for(let i=0;i<9;i++)box(2.35,.19,.38,0,1.13+i*.18,-.1-i*.34,'stoneLight');
 for(const side of[-1,1]){beam([side*1.22,1.1,.1],[side*1.22,2.85,-2.8],.08,'stone');for(let i=0;i<4;i++)box(.18,.55,.18,side*1.22,1.35+i*.45,-i*.87,'stone');}
 // Moat, granite banks, and bridge.
 rounded(17.7,.12,1.45,0,2.73,-3.24,'water',.16);
 for(const x of[-8.3,8.3])rounded(1.05,.1,8.6,x,2.72,-7.9,'water',.2);
 for(const z of[-2.55,-4]){box(17.3,.2,.19,0,2.77,z,'stone');}
 function waterShimmers(x,z,w,d,y){const group=new THREE.Group();root.add(group);for(let i=0;i<22;i++){const p=box(.13+rand()*.65,.009,.026,x+(rand()-.5)*w,y,z+(rand()-.5)*d,material(0xb6d1b9),group);p.userData.phase=rand()*6.28;animations.water.push(p);}return group;}
 waterShimmers(0,-3.25,17,1.1,2.805);
 // Curtain walls with individual coping, merlons and arrowslits.
 function wall(x,z,w,d){box(w,2.22,d,x,3.91,z,'stone');box(w+.08,.16,d+.12,x,4.91,z,'stoneLight');let count=Math.floor((w>d?w:d)/.72);for(let i=0;i<count;i++){box(w>d?.4:w+.06,.5,w>d?d+.06:.4,x+(w>d?(-w/2+.4+i*.72):0),5.23,z+(w>d?0:(-d/2+.4+i*.72)),'stoneLight');}for(let row=0;row<4;row++)for(let i=0;i<count;i++){if(w>d)box(.43,.017,.015,x-w/2+.45+i*.72+(row%2)*.2,3.05+row*.44,z+d/2+.01,'stoneDark');else box(.015,.017,.42,x+w/2+.01,3.05+row*.44,z-d/2+.45+i*.72,'stoneDark');}}
 wall(-4.5,-4.75,5.1,.48);wall(4.5,-4.75,5.1,.48);wall(0,-11.8,13.8,.5);wall(-7,-8.2,.5,7.3);wall(7,-8.2,.5,7.3);
 const dark=material(0x3e4946), iron=material(0x494b40), flagMat=material(0xa85743);
 function window(x,y,z,w=.3,h=.65,parent=root){box(w,h,.06,x,y,z,dark,parent);box(w+.12,.1,.09,x,y-h/2,z,'stoneLight',parent);}
 function tower(x,z,large=false){const g=new THREE.Group();g.position.set(x,2.78,z);root.add(g);let r=large?1.25:.91,h=large?4.2:3.15;cylinder(r,h,0,h/2,0,'stone',g,r,12);cylinder(r+.1,.18,0,.25,0,'stoneDark',g,r+.1,12);cylinder(r+.14,.16,0,h-.1,0,'stoneLight',g,r+.14,12);cylinder(r+.26,1.75,0,h+.77,0,'roof',g,0,12);cylinder(r+.29,.11,0,h-.05,0,'roofLight',g,r+.29,12);for(let i=0;i<12;i++){let a=i*Math.PI/6;beam([Math.cos(a)*(r+.25),h-.04,Math.sin(a)*(r+.25)],[0,h+1.66,0],.02,'roofLight',g);}window(0,h*.55,r+.012,.17,.65,g);window(r*.7,h*.68,r*.7,.16,.55,g);cylinder(.055,.45,0,h+1.84,0,'wood',g);ball(.11,0,h+2.09,0,'wheatLight',g);return g;}
 for(const x of[-7,7])for(const z of[-4.8,-11.8])tower(x,z,z<-10);
 // Gatehouse with an inset arched portcullis.
 box(2.8,2.9,1.35,0,4.22,-4.75,'stoneLight');
 const archShape=new THREE.Shape();archShape.moveTo(-.75,0);archShape.lineTo(-.75,1.6);archShape.absarc(0,1.6,.75,Math.PI,0,true);archShape.lineTo(.75,0);archShape.closePath();const arch=mesh(new THREE.ShapeGeometry(archShape),dark,0,2.79,-4.055);
 for(let i=0;i<9;i++){let a=i*Math.PI/8;let b=box(.27,.28,.12,Math.cos(a)*.91,4.39+Math.sin(a)*.91,-4.0,'stone');b.rotation.z=a-Math.PI/2;}
 for(let side of[-1,1])for(let i=0;i<5;i++)box(.27,.29,.12,side*.9,2.95+i*.3,-4.0,'stone');
 for(let i=0;i<7;i++)box(.045,1.84,.06,-.61+i*.203,3.77,-3.99,iron);
 for(let i=0;i<4;i++)box(1.35,.045,.06,0,3+i*.4,-3.98,iron);
 roof(3.2,1.1,1.65,0,5.69,-4.75);window(-1.02,4.7,-4.055,.14,.45);window(1.02,4.7,-4.055,.14,.45);
 for(let i=0;i<11;i++)box(1.72,.09,.17,0,2.84,-3.94+i*.18,'woodLight');for(let x of[-.84,.84])beam([x,2.9,-2.2],[x,4.65,-4.02],.026,iron);
 // The main keep: a complete manor with defense gallery and attached hall.
 box(5,4.85,3.3,0,5.2,-8.9,'stoneLight');box(5.3,.22,3.6,0,7.61,-8.9,'stone');roof(5.8,2,3.9,0,7.78,-8.9);
 for(let x of[-1.6,0,1.6])for(let y of[4.5,6.45]){window(x,y,-7.23,.45,.94);box(.045,.94,.075,x,y,-7.18,'stoneDark');box(.48,.045,.075,x,y,-7.17,'stoneDark');}
 for(let z of[-9.7,-8.2]){const w=box(.06,.85,.4,2.52,6.35,z,dark);box(.1,.12,.6,2.55,5.95,z,'stone');}
 for(let i=0;i<7;i++){box(.3,.4,.3,-2.4+i*.8,7.98,-7.04,'stone');}
 box(3.3,2.1,2.3,-3.95,3.87,-8.8,'stone');roof(3.85,1.4,2.8,-3.95,4.98,-8.8);window(-3.95,4,-7.63,.35,.68);
 tower(2.3,-10,true);
 box(.57,1.3,.55,-1.5,9.02,-9.6,'stone');box(.75,.18,.75,-1.5,9.69,-9.6,'stoneDark');
 // Pennants use actual waving geometry rather than rigid rotation.
 function flag(x,y,z,size=1){cylinder(.035,1.8,x,y-.5,z,'wood');const geo=new THREE.PlaneGeometry(size,.57*size,12,4);geo.translate(size/2,0,0);const m=mesh(geo,new THREE.MeshToonMaterial({color:0xa65441,gradientMap:ramp,side:THREE.DoubleSide}),x,y,z);m.userData.base=geo.attributes.position.array.slice();animations.flags.push(m);box(.13,.09,.04,x+size*.32,y,z,material(0xe5cb87));}
 flag(2.3,10.55,-10,1.15);flag(-7,8.26,-11.8,.85);flag(7,7.2,-4.8,.8);
 // Cottage builders: timber frames, dormers, tiling, shutters and chimneys.
 const smokeMat=new THREE.MeshBasicMaterial({color:0xd8d9c7,transparent:true,opacity:.28,depthWrite:false});
 function chimneySmoke(x,y,z){for(let i=0;i<5;i++){const s=ball(.18,x,y+i*.31,z,smokeMat);s.userData={origin:new THREE.Vector3(x,y,z),phase:i/5};s.castShadow=false;animations.smoke.push(s);}}
 function house(x,z,w=2.6,d=2.1,rotation=0,thatched=false){const g=new THREE.Group();g.position.set(x,1.18,z);g.rotation.y=rotation;root.add(g);const h=1.7;box(w,h,d,0,h/2,0,'plaster',g);box(w+.12,.17,d+.12,0,.08,0,'stone',g);roof(w+.46,1.23,d+.46,0,h,0,thatched?'wheat':'roof',g);
 for(let xx of[-w/2,w/2]){box(.105,h,.11,xx,h/2,d/2+.02,'wood',g);box(.105,h,.11,xx,h/2,-d/2-.02,'wood',g);}box(w,.09,.09,0,h-.03,d/2+.045,'wood',g);box(w,.09,.09,0,.47,d/2+.045,'wood',g);box(.11,h,.11,0,h/2,d/2+.035,'wood',g);
 beam([-w/2,.5,d/2+.05],[0,h-.1,d/2+.05],.045,'wood',g);beam([0,h-.1,d/2+.05],[w/2,.5,d/2+.05],.045,'wood',g);beam([-w/2,h,d/2+.02],[0,h+1.18,d/2+.02],.045,'wood',g);beam([0,h+1.18,d/2+.02],[w/2,h,d/2+.02],.045,'wood',g);box(.07,1.1,.07,0,h+.5,d/2+.02,'wood',g);
 box(.48,1.08,.07,-w*.22,.58,d/2+.085,'wood',g);box(.43,.025,.09,-w*.22,.92,d/2+.13,'woodLight',g);ball(.025,-w*.22,.53,d/2+.145,'wheat',g);
 for(const side of[-1,1]){box(.06,.5,.48,side*(w/2+.02),1.11,0,dark,g);box(.09,.53,.21,side*(w/2+.06),1.11,-.35,'woodLight',g);box(.09,.53,.21,side*(w/2+.06),1.11,.35,'woodLight',g);box(.13,.07,.8,side*(w/2+.1),.84,0,'wood',g);}
 box(.54,.46,.08,w*.23,1.08,d/2+.06,dark,g);box(.04,.47,.09,w*.23,1.08,d/2+.11,'woodLight',g);box(.54,.04,.09,w*.23,1.08,d/2+.12,'woodLight',g);
 for(let i=0;i<6;i++){let yy=h+.15+i*.18,xx=(w/2+.23)*(1-i/7);for(let side of[-1,1]){const b=box(.025,.027,d+.47,side*xx,yy,0,thatched?'wheatLight':'roofLight',g);}}
 box(.4,1,.42,-w*.27,h+.95,-d*.23,'stone',g);box(.5,.13,.52,-w*.27,h+1.45,-d*.23,'stoneDark',g);
 let smokePos=new THREE.Vector3(-w*.27,h+1.6,-d*.23).applyAxisAngle(new THREE.Vector3(0,1,0),rotation).add(g.position);chimneySmoke(...smokePos.toArray());
 // doorstep, flower beds and stacked firewood.
 box(.7,.14,.38,-w*.22,.06,d/2+.2,'stone',g);for(let i=0;i<4;i++)ball(.1,w/2+.22,.27,-.6+i*.25,'grass',g);for(let i=0;i<3;i++)ball(.07,w/2+.2,.37,-.5+i*.27,material(i%2?0xb8865a:0xd1bc81),g);return g;
 }
 house(-4.6,1.1,2.7,2.25,.12);house(-4,4.3,2.25,1.9,-.25,true);house(4.2,.7,2.8,2.1,-.12);house(5.4,4.3,2.25,2.15,.28,true);house(-7.4,-1,2,1.8,.2,true);
 // Stone well with pitched shelter and hanging pail.
 const well=new THREE.Group();well.position.set(-.9,1.18,2.2);root.add(well);cylinder(.58,.57,0,.29,0,'stone',well,.58,12);cylinder(.43,.025,0,.585,0,dark,well,.43,12);for(let i=0;i<12;i++){let a=i*Math.PI/6;box(.24,.2,.18,Math.cos(a)*.51,.55,Math.sin(a)*.51,'stoneLight',well);}for(let x of[-.65,.65])box(.09,1.7,.09,x,.9,0,'wood',well);roof(1.7,.55,1.25,0,1.63,0,'roof',well);beam([-.66,1.25,0],[.66,1.25,0],.06,'woodLight',well);beam([0,1.25,0],[0,.65,0],.015,'wood',well);cylinder(.13,.22,0,.58,0,'woodLight',well,.17,8);
 // A lively canvas-covered market, baskets and produce.
 const canvasMat=material(0xe4d5ae),redMat=material(0xa65d46);
 function stall(x,z,rot=0){const g=new THREE.Group();g.position.set(x,1.18,z);g.rotation.y=rot;root.add(g);box(1.8,.6,.8,0,.3,0,'woodLight',g);for(let xx of[-.9,.9])for(let zz of[-.5,.5])box(.065,1.62,.065,xx,.8,zz,'wood',g);for(let i=0;i<6;i++){const cloth=box(.34,.055,1.28,-.85+i*.34,1.61,0,i%2?redMat:canvasMat,g);cloth.rotation.x=.12;box(.34,.17,.05,-.85+i*.34,1.47,.64,i%2?redMat:canvasMat,g);}for(let i=0;i<4;i++){box(.35,.12,.6,-.62+i*.4,.66,0,'wood',g);for(let j=0;j<6;j++)ball(.07,-.72+i*.4+(j%2)*.15,.77,Math.floor(j/2)*.15-.17,material(i%2?0x859653:0xb47a49),g);}cylinder(.25,.36,1.17,.2,.3,'woodLight',g,.3,10);return g;}
 stall(1.8,3.4,-.08);stall(2.15,1.25,.08);
 // Barn and bundles of hay.
 const barn=new THREE.Group();barn.position.set(-7.2,.85,8.4);barn.rotation.y=.1;root.add(barn);box(3,2.2,2.8,0,1.1,0,material(0x915d45),barn);roof(3.5,1.6,3.25,0,2.18,0,'wheat',barn);for(let i=0;i<13;i++)box(.035,2.12,.025,-1.44+i*.24,1.1,1.42,'woodLight',barn);box(1.3,1.8,.06,0,.9,1.45,'wood',barn);beam([-.62,.12,1.5],[.62,1.7,1.5],.06,'woodLight',barn);beam([.62,.12,1.5],[-.62,1.7,1.5],.06,'woodLight',barn);box(.09,1.7,.07,0,.9,1.51,'woodLight',barn);
 function hay(x,z,s=.65){cylinder(s,s*1.2,x,.85+s*.6,z,'wheat',root,s*.38,12);for(let i=0;i<10;i++){let a=i*Math.PI/5;beam([x+Math.cos(a)*s,.87,z+Math.sin(a)*s],[x+Math.cos(a)*s*.3,.85+s*1.2,z+Math.sin(a)*s*.3],.019,'wheatLight');}cylinder(.025,s*.5,x,.85+s*1.4,z,'wood');}
 hay(-9.4,8.7,.8);hay(-8.8,10,.65);hay(6.1,11.6,.55);hay(-5.1,9.7,.6);
 // Windmill on the western verge.
 const mill=new THREE.Group();mill.position.set(-11.4,1.13,1.6);root.add(mill);cylinder(.93,3,0,1.5,0,'plaster',mill,.58,10);cylinder(1.02,.2,0,.2,0,'stone',mill,1.02,10);cylinder(.83,1.25,0,3.55,0,'roof',mill,0,10);box(.42,.75,.06,0,.43,.93,'wood',mill);window(0,2.15,.72,.25,.43,mill);
 const blades=new THREE.Group();blades.position.set(0,2.82,.87);mill.add(blades);for(let i=0;i<4;i++){let arm=new THREE.Group();arm.rotation.z=i*Math.PI/2;blades.add(arm);box(.075,2.15,.08,0,1.02,0,'wood',arm);for(let k=0;k<8;k++){box(.36,.09,.035,.12,.52+k*.19,.035,'plaster',arm);box(.015,1.43,.04,.3,1.15,.07,'woodLight',arm);}}ball(.17,0,0,.08,'woodLight',blades);animations.wheels.push({mesh:blades,speed:.13,axis:'z'});
 // Eastern stream, footbridge and water mill.
 path([[10,-1],[10.4,3],[9.8,7],[10.5,11],[11,14.5]],.85,.87,0x739e9a);waterShimmers(10.3,7,.55,13,.89);
 for(let i=0;i<13;i++)box(2.25,.1,.16,10.1,1.09,8.8+i*.17,'woodLight');for(let x of[9.04,11.16]){beam([x,1.58,8.8],[x,1.58,10.8],.035,'wood');for(let z of[8.85,9.85,10.75])box(.08,.7,.08,x,1.28,z,'wood');}
 house(8,4.1,2.3,2.6,0,false);
 const wheel=new THREE.Group();wheel.position.set(9.54,1.9,4.25);wheel.rotation.y=Math.PI/2;root.add(wheel);const ringMat=mats.wood;for(let zz of[-.24,.24]){const ring=mesh(new THREE.TorusGeometry(.95,.075,6,20),ringMat,0,0,zz,wheel);for(let i=0;i<10;i++){let a=i*Math.PI/5;beam([0,0,zz],[Math.cos(a)*.95,Math.sin(a)*.95,zz],.045,'woodLight',wheel);}}for(let i=0;i<14;i++){let a=i*Math.PI/7;const paddle=box(.4,.11,.62,Math.cos(a)*.97,Math.sin(a)*.97,0,'woodLight',wheel);paddle.rotation.z=a+Math.PI/2;}animations.wheels.push({mesh:wheel,speed:.28,axis:'z'});
 // Blacksmith's open awning, forge and ironwork.
 const smith=house(-7.4,4.1,2.5,2.2,.1);for(let xx of[-1.3,1.3])box(.085,1.4,.085,xx,.7,2.05,'wood',smith);const awning=box(2.9,.08,1.24,0,1.45,1.63,'woodLight',smith);awning.rotation.x=.1;box(.65,.36,.5,.6,.3,1.6,iron,smith);box(.8,.14,.35,.6,.55,1.6,iron,smith);box(.3,.55,.3,-.65,.29,1.67,'stone',smith);ball(.18,-.65,.62,1.67,material(0xdd9753),smith);
 // Handcart with barrels, sacks and actual spoked wheels.
 const cart=new THREE.Group();cart.position.set(-2.3,1.18,5);cart.rotation.y=-.35;root.add(cart);box(1.05,.1,1.55,0,.48,0,'wood',cart);for(let side of[-1,1])for(let i=0;i<3;i++)box(.05,.16,1.55,side*.53,.6+i*.18,0,'woodLight',cart);box(1.05,.42,.06,0,.7,-.74,'woodLight',cart);for(let x of[-.69,.69]){const w=mesh(new THREE.TorusGeometry(.36,.055,5,12),mats.woodLight,x,.36,.2,cart);w.rotation.y=Math.PI/2;for(let i=0;i<6;i++){let a=i*Math.PI/3;beam([x,.36,.2],[x,.36+Math.sin(a)*.34,.2+Math.cos(a)*.34],.02,'wood',cart);}}for(let x of[-.4,.4])beam([x,.44,.6],[x,.32,2.25],.045,'wood',cart);ball(.34,0,.83,0,'plaster',cart);cylinder(.24,.47,0,.82,-.46,'woodLight',cart,.24,10);
 // Fences, cultivated plots and animated instanced wheat.
 function fence(x1,z1,x2,z2){let length=Math.hypot(x2-x1,z2-z1),num=Math.ceil(length/.9);for(let i=0;i<=num;i++){let x=x1+(x2-x1)*i/num,z=z1+(z2-z1)*i/num;box(.085,.62,.085,x,1.15,z,'wood');}for(let y of[1.07,1.36])beam([x1,y,z1],[x2,y,z2],.035,'woodLight');}
 fence(-13,12.9,-3.1,12.9);fence(-13,12.9,-13,6.1);fence(2,13.1,8.4,13.1);fence(8.4,13.1,8.4,7.3);fence(-13,-4,-10,-4);fence(12,-6,12,4.9);
 const plots=[[-9.1,11.4,6.4,2.3],[-4.2,11.3,2.5,2.7],[4.9,10,5.2,4.5],[-11.8,-5.6,2.2,4.9],[12.5,2.6,2.4,7],[5.1,6.5,4.8,1.5]];
 let positions=[];for(let [x,z,w,d]of plots){box(w,.035,d,x,.857,z,material(0x9a8551));for(let row=0;row<Math.floor(w/.3);row++){let xx=x-w/2+.17+row*.3;box(.075,.045,d-.1,xx,.889,z,'woodLight');for(let i=0;i<d/.2;i++)positions.push([xx+(rand()-.5)*.1,.9,z-d/2+.1+i*.2+(rand()-.5)*.1,rand()]);}}
 const stalks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.013,.018,.49,4),mats.wheat,positions.length);const ears=new THREE.InstancedMesh(new THREE.ConeGeometry(.068,.23,5),mats.wheatLight,positions.length);root.add(stalks,ears);stalks.castShadow=ears.castShadow=true;const dummy=new THREE.Object3D();function updateWheat(t){for(let i=0;i<positions.length;i++){const[x,y,z,r]=positions[i];let angle=Math.sin(t*1.35+x*.5+z*.65)*.11;dummy.position.set(x+angle*.17,y+.24+r*.06,z);dummy.rotation.set(0,r*4,angle);dummy.scale.setScalar(.85+r*.28);dummy.updateMatrix();stalks.setMatrixAt(i,dummy.matrix);dummy.position.set(x-angle*.2,y+.55+r*.06,z);dummy.updateMatrix();ears.setMatrixAt(i,dummy.matrix);}stalks.instanceMatrix.needsUpdate=true;ears.instanceMatrix.needsUpdate=true;}updateWheat(0);
 // A vegetable garden with neat green leaves and pumpkins.
 for(let i=0;i<4;i++)for(let j=0;j<8;j++){let x=-11.6+i*.4,z=5.2+j*.25;ball(.1,x,.98,z,material(j%3===0?0xb88343:0x718951));if(j%3===0)beam([x,1.06,z],[x+.03,1.18,z],.017,'grass');}
 // Friendly scarecrows.
 function scarecrow(x,z){box(.08,1.25,.08,x,1.5,z,'wood');beam([x-.5,1.79,z],[x+.5,1.79,z],.045,'wood');box(.32,.43,.18,x,1.63,z,material(0x9b7050));ball(.15,x,2.01,z,'plaster');cylinder(.25,.04,x,2.12,z,'wheat');cylinder(.14,.18,x,2.21,z,'wheat');for(let side of[-1,1])beam([x+side*.37,1.75,z],[x+side*.48,1.48,z],.025,'wheatLight');}scarecrow(4.8,9.7);scarecrow(-11,11.4);
 // Grazing animals, with tiny ears, dark noses and pale wool.
 function animal(x,z,type='sheep',angle=0){const g=new THREE.Group();g.position.set(x,.87,z);g.rotation.y=angle;root.add(g);let cow=type==='cow',s=cow?1:.65;for(let xx of[-.24,.24])for(let zz of[-.38,.38])box(.075,.37,.075,xx*s,.18*s,zz*s,'wood',g);const body=ball(.47,0,.54*s,0,cow?'plaster':material(0xe4e0c8),g);body.scale.set(.4*s,.32*s,.6*s);const head=ball(.21,0,.56*s,.5*s,cow?'plaster':dark,g);head.scale.set(.16*s,.18*s,.22*s);box(.25*s,.12*s,.16*s,0,.47*s,.67*s,cow?'woodLight':dark,g);for(let side of[-1,1]){box(.17*s,.045,.08,side*.19*s,.66*s,.5*s,'plaster',g);if(cow)beam([side*.12,.75,.43],[side*.19,.89,.43],.025,'wheatLight',g);}if(cow){ball(.2,.2,.58,-.15,dark,g);ball(.14,-.22,.63,.2,dark,g);}else for(let i=0;i<8;i++)ball(.17,(rand()-.5)*.4,.43+rand()*.2,(rand()-.5)*.56,'plaster',g);beam([0,.56*s,-.42*s],[.08,.3*s,-.57*s],.025,'wood',g);return g;}
 animal(-11.4,6.9,'cow',-.6);animal(-10,6.5,'cow',.7);animal(12.4,10.4,'sheep',1.2);animal(13.4,9.2,'sheep',-.9);animal(12.2,8.7,'sheep',.2);animal(13.5,11.5,'sheep',2.4);
 // The surrounding woodland: sculpted foliage, tapering trunks, firs, rocks.
 const foliage=[material(0x687e48),material(0x809155),material(0x9ba262),material(0x768c5a)];
 function tree(x,z,s=1,y=.85,conifer=false){const g=new THREE.Group();g.position.set(x,y,z);root.add(g);cylinder(.1*s,1.5*s,0,.75*s,0,'wood',g,.06*s,7);if(conifer){for(let i=0;i<3;i++)cylinder((.8-i*.15)*s,1.4*s,0,(1.2+i*.62)*s,0,foliage[0],g,0,7);}else{for(const side of[-1,1])beam([0,.8*s,0],[side*.42*s,1.62*s,0],.045*s,'wood',g);for(let i=0;i<5;i++){let a=i*2.4;const b=ball((i===4?.66:.57)*s,i===4?0:Math.sin(a)*.43*s,(i===4?2.1:1.65)*s,i===4?0:Math.cos(a)*.35*s,foliage[i%4],g);b.scale.y=1.05;}}g.userData.phase=rand()*6.28;animations.trees.push(g);return g;}
 for(let i=0;i<14;i++){let x=-13.2+i*2,z=-13.5+(rand()-.5)*.6;tree(x,z,.8+rand()*.7,.85,i%3===0);}
 for(let i=0;i<7;i++){tree(-13.6,-10+i*2,.8+rand()*.5,.85,i%2===0);tree(13.8,-9.5+i*2,1+rand()*.35,.85,i%3===0);}
 tree(-12.3,10.5,1.1);tree(-3.1,7.7,.85);tree(7,12.8,.9);tree(12.9,12.9,1.1);tree(-8.4,-2.7,.8,1.22);tree(8.5,-1.4,.85,1.22);
 for(let i=0;i<40;i++){let side=i%2?-1:1,x=side*(12.8+rand()*1.3),z=-12+rand()*25;const rock=ball(.12+rand()*.23,x,.9,z,i%3?'stoneDark':'stone');rock.scale.y=.65;}
 for(let i=0;i<40;i++){let x=(rand()-.5)*28,z=(rand()-.5)*28;if(z<4&&Math.abs(x)<10)continue;for(let j=0;j<3;j++)beam([x,.86,z],[x+(rand()-.5)*.15,1+rand()*.12,z+(rand()-.5)*.15],.012,'grass');}
 // Soft, small drifting clouds hover around the high manor.
 const cloudMat=new THREE.MeshBasicMaterial({color:0xf7f5e9,transparent:true,opacity:.59,depthWrite:false});for(let i=0;i<3;i++){const g=new THREE.Group();root.add(g);g.position.set(-10+i*9,12.2+i*.65,-11-i*1.4);for(let j=0;j<5;j++){let b=ball(.75+j%2*.3,(j-2)*.69,j%2*.22,0,cloudMat,g);b.scale.set(1,.36,.6);b.castShadow=false;}g.userData.origin=g.position.x;animations.clouds.push(g);}
 // Batch stationary craftsmanship by material; preserve independently animated objects.
 root.updateMatrixWorld(true);
 const dynamic=new Set([...animations.flags,...animations.trees,...animations.smoke,...animations.water,...animations.clouds,...animations.wheels.map(w=>w.mesh)]);
 const batches=new Map();
 root.traverse(object=>{if(!object.isMesh||object.isInstancedMesh)return;let ancestor=object;while(ancestor&&ancestor!==root){if(dynamic.has(ancestor))return;ancestor=ancestor.parent;}if(Array.isArray(object.material))return;let batch=batches.get(object.material);if(!batch){batch=[];batches.set(object.material,batch);}batch.push(object);});
 for(const[mat,objects]of batches){if(objects.length<2)continue;const geometries=objects.map(o=>{let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);return g;});const merged=mergeGeometries(geometries,false);if(merged){const combined=new THREE.Mesh(merged,mat);combined.castShadow=true;combined.receiveShadow=true;combined.name='batched-handcraft';root.add(combined);objects.forEach(o=>o.removeFromParent());}geometries.forEach(g=>g.dispose());}
 return {root,animations,update(t){for(const f of animations.flags){let p=f.geometry.attributes.position;for(let i=0;i<p.count;i++){let x=f.userData.base[i*3],y=f.userData.base[i*3+1];p.setZ(i,Math.sin(x*5-t*2.1+y*2)*x*.17);p.setY(i,y+Math.sin(x*4-t*2)*x*.025);}p.needsUpdate=true;f.geometry.computeVertexNormals();}for(const w of animations.wheels)w.mesh.rotation[w.axis]=t*w.speed;for(const tree of animations.trees)tree.rotation.z=Math.sin(t*.7+tree.userData.phase)*.015;for(const s of animations.smoke){let p=(t*.095+s.userData.phase)%1;s.position.copy(s.userData.origin);s.position.y+=p*1.8;s.position.x+=Math.sin(p*3+t*.2)*p*.35;s.scale.setScalar(.12+p*.24);s.material=smokeMat;}for(const p of animations.water)p.scale.x=.7+Math.sin(t*1.2+p.userData.phase)*.4;for(const c of animations.clouds)c.position.x=c.userData.origin+Math.sin(t*.025+c.userData.origin)*1.8;updateWheat(t);}};
}
