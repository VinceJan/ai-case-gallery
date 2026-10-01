import {THREE,palette as P,fixed,moving,box,cyl,beam,group,mesh,rounded,roof,windowOn,animations,waterMeshes,rand} from './core.js';
function battlements(x,y,z,len,axis,parent=fixed){for(let a=-len/2+.27;a<len/2;a+=.70)box(axis==='x'?.37:.54,.52,axis==='z'?.37:.54,P.lightStone,x+(axis==='x'?a:0),y,z+(axis==='z'?a:0),parent,true);}
function tower(x,z,y,height=3.7,r=1.0){cyl(r,height,P.stone,x,y+height/2,z,fixed,r*.96,12);cyl(r*1.09,.26,P.lightStone,x,y+height-.15,z,fixed,r*1.09,12);cyl(r*1.12,.27,P.darkStone,x,y+.22,z,fixed,r*1.12,12);const cap=cyl(r*1.32,2.2,P.roof,x,y+height+1.12,z,fixed,.04,12);for(let a=0;a<6;a++){const angle=a*Math.PI/3;box(.12,.65,.04,0x4e5d55,x+Math.sin(angle)*r*.987,y+height*.62,z+Math.cos(angle)*r*.987).rotation.y=angle;}
for(let level=0;level<5;level++){const yy=y+.5+level*.60;for(let a=0;a<12;a++){let angle=(a+.5*(level%2))*Math.PI/6;const m=box(.34,.045,.025,0xa49f8b,x+Math.sin(angle)*r*1.004,yy,z+Math.cos(angle)*r*1.004);m.rotation.y=angle;}}
cyl(.065,.55,P.gold,x,y+height+2.46,z);return y+height+2.73;}
export function flag(x,y,z,size=1){const g=group(x,y,z,moving);cyl(.042,2.0,P.wood,0,1,0,g);const geo=new THREE.PlaneGeometry(size*1.12,size*.68,10,3);geo.translate(size*.56,0,0);const f=mesh(geo,0xa8644f,0,1.5,0,g,false,{side:THREE.DoubleSide});const orig=geo.attributes.position.array.slice();animations.push(t=>{const a=geo.attributes.position;for(let i=0;i<a.count;i++){const xx=orig[i*3];a.setZ(i,Math.sin(xx*4-t*2.4)*.13*xx);a.setY(i,orig[i*3+1]+Math.sin(xx*5-t*2.4)*.03*xx);}a.needsUpdate=true;geo.computeVertexNormals();});const emblem=mesh(new THREE.CircleGeometry(size*.13,4),P.gold,size*.46,1.5,.035,g);emblem.rotation.z=Math.PI/4;}
export function buildCastle(){
rounded(19,12.9,1.3,.65,P.darkStone,0,.4,-8.15);rounded(18.85,12.7,.12,.6,P.grass,0,1.7,-8.15);
// The ring is open at the gate; the bridge is the only dry crossing.
const y=1.84;for(const [x,z,w,d]of[[0,-14.1,17.4,1.2],[0,-2.5,17.4,1.35],[-8.2,-8.3,1.25,10.5],[8.2,-8.3,1.25,10.5]]){const m=rounded(w,d,.045,.18,P.water,x,y,z);m.material=meshWater();waterMeshes.push(m);for(let i=0;i<10;i++){const xx=x+(rand()-.5)*w,zz=z+(rand()-.5)*d;box(.28,.01,.035,0xc0dad0,xx,y+.055,zz);}}
rounded(14.45,9.15,.12,.2,0xb9b595,0,1.83,-8.3);
for(const x of[-6.65,6.65]){box(.55,2.15,8.5,P.stone,x,2.98,-8.35,fixed,true);battlements(x,4.27,-8.35,8.5,'z');}
box(13.3,2.15,.55,P.stone,0,2.98,-12.5,fixed,true);battlements(0,4.27,-12.5,13.3,'x');
for(const x of[-4.1,4.1]){box(5.2,2.15,.55,P.stone,x,2.98,-4.1,fixed,true);battlements(x,4.27,-4.1,5.2,'x');}
// Walkways, murder-hole slits, buttresses and staggered mortar lines make the enclosure defensible.
for(const x of[-6.24,6.24])box(.52,.16,7.7,P.darkStone,x,3.77,-8.35);
box(12.7,.16,.53,P.darkStone,0,3.77,-12.08);
for(const x of[-5.4,-3.7,3.7,5.4]){box(.14,.64,.035,0x5b6558,x,3.25,-3.815);box(.36,.06,.04,0x5b6558,x,3.3,-3.8);box(.24,1.45,.38,0xb8b198,x,2.67,-3.72);}
for(let row=0;row<5;row++){const yy=2.1+row*.4;for(let i=0;i<21;i++){let xx=-6.1+i*.6+(row%2)*.3;if(Math.abs(xx)<1.5)continue;box(.53,.017,.022,0xb0aa94,xx,yy,-3.81);box(.018,.28,.022,0xb0aa94,xx+.27,yy+.15,-3.81);}for(const x of[-6.934,6.934])for(let i=0;i<14;i++){const zz=-12.1+i*.55+(row%2)*.275;box(.022,.017,.48,0xb0aa94,x,yy,zz);box(.022,.28,.017,0xb0aa94,x,yy+.15,zz+.24);}}
for(const x of[-6.65,6.65])for(const z of[-12.5,-4.1]){const yy=tower(x,z,1.92,3.55,.88);flag(x,yy,z,.65);}
// Gatehouse with a true arched aperture, portcullis and roofed guard rooms.
const arch=new THREE.Shape();arch.moveTo(-1.45,0);arch.lineTo(-1.45,3.25);arch.lineTo(1.45,3.25);arch.lineTo(1.45,0);arch.lineTo(.79,0);arch.lineTo(.79,1.42);arch.absarc(0,1.42,.79,0,Math.PI,false);arch.lineTo(-.79,0);arch.lineTo(-1.45,0);const ag=new THREE.ExtrudeGeometry(arch,{depth:1.25,bevelEnabled:false,curveSegments:12});mesh(ag,P.lightStone,0,1.9,-4.62,fixed,true);roof(3.35,1.25,1.55,P.roof,0,5.18,-3.99);
for(let i=-.68;i<=.7;i+=.23)box(.055,1.68,.06,P.timber,i,2.86,-3.39);for(let i=0;i<4;i++)box(1.45,.045,.07,P.timber,0,2.16+i*.37,-3.38);
for(const x of[-1.06,1.06])windowOn(x,4.4,-3.36,.20,.50);
for(let i=0;i<11;i++)box(1.64,.12,.24,P.wood,0,1.95,-3.08+i*.24,fixed,true);for(const x of[-.87,.87])beam([x,3.55,-3.34],[x,2.05,-.66],.025,0x666b5e);
// Defensive keep: a stepped stone volume with buttresses and arrow slits.
box(5.1,4.65,4.15,P.lightStone,-.5,4.29,-9.15,fixed,true);box(5.38,.24,4.38,P.darkStone,-.5,6.65,-9.15);roof(5.8,2.45,4.75,P.roof,-.5,6.79,-9.15);
for(let row=0;row<10;row++){const yy=2.26+row*.43;for(let i=0;i<8;i++){const xx=-2.81+i*.64+(row%2)*.28;if(xx>1.9)continue;box(.52,.012,.022,0xc9c0a8,xx,yy,-7.066);}}
for(let row=1;row<9;row++){const frac=row/9;for(const a of[-1,1])beam([-.5+a*2.9*(1-frac),6.8+2.45*frac,-11.55],[-.5+a*2.9*(1-frac),6.8+2.45*frac,-6.77],.018,0x647d82);}
for(const x of[-2.93,1.93])for(const z of[-10.97,-7.3])box(.39,4.75,.42,P.stone,x,4.25,z,fixed,true);
for(const yy of[3.55,5.48])for(const x of[-2.05,-.55,1.0])windowOn(x,yy,-7.05,.39,.68);
for(const x of[-2.05,-.55,1.0]){box(.14,.6,.045,0x4c5951,x,3.7,-11.25);box(.3,.06,.05,0x4c5951,x,3.7,-11.26);}
box(2.1,2.6,2.8,P.stone,3.53,3.23,-10.1,fixed,true);roof(2.45,1.5,3.1,P.roof,3.53,4.54,-10.1);windowOn(3.53,3.42,-8.68);
const top=tower(-2.4,-10.9,5.1,3.4,.65);flag(-2.4,top,-10.9,.95);
// Cobblestones and courtyard supplies.
for(let i=0;i<65;i++){let x=(rand()-.5)*11,z=-5.7-rand()*5;if(Math.abs(x)<3&&z<-7)continue;const m=cyl(.13,.055,0xa9ad96,x,1.99,z,fixed,.15,6);m.scale.z=.7;}
box(1.65,.32,1.3,0x8c7855,4.1,2.11,-6.1);for(let i=0;i<4;i++)box(.65,.65,.65,P.wood,3.6+(i%2)*.7,2.5+Math.floor(i/2)*.67,-6.1,fixed,true);
}
function meshWater(){return new THREE.MeshToonMaterial({color:P.water,transparent:true,opacity:.87});}
