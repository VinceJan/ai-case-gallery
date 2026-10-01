import {THREE,palette as P,fixed,moving,box,cyl,beam,ball,group,mesh,rounded,path,fence,animations,waterMeshes,rand,range} from './core.js';
export const wheat=[];export const animals=[];
export function buildLand(){
rounded(32,32,1.45,.65,P.mortar,0,-1.08,0);rounded(31.98,31.98,.15,.65,P.lightStone,0,-1.17,0);rounded(31.8,31.8,.48,.61,P.earth,0,-.01,0);rounded(31.7,31.7,.17,.62,P.grass,0,.31,0);
// Masonry wraps all four edges, with staggered courses and a raised coping.
for(let side=0;side<4;side++){const g=group();g.rotation.y=side*Math.PI/2;for(let row=0;row<3;row++)for(let i=0;i<26;i++){const b=box(1.13,.34,.12,[0x92957e,0xa4a58d,0xb1ad95][(i+row)%3],-15.05+i*1.2+(row%2)*.27,-.87+row*.38,15.99,g,true);}box(30.5,.15,.35,P.lightStone,0,.27,15.81,g);}
path([[0,15],[0,10],[.6,7.3],[0,3],[0,-.5]],1.15);path([[-13,2],[-7.5,1.5],[-2,1],[2.2,1],[7.4,1.8],[12,3]],.95);path([[-6,6],[-3.2,6.4],[.6,7.3],[5.5,6.5],[11.8,7.4]],.78);
rounded(22,7.7,.23,.40,P.grassLight,-2,.46,2.05);
path([[0,-.5],[0,3],[.6,5.8]],1.15,.72);path([[-12.8,2],[-7.5,1.5],[-2,1],[2.2,1],[7.4,1.8],[8.4,2.2]],.95,.72);path([[-6,5.7],[-3.2,5.9],[.6,5.8],[5.5,5.9],[8.3,5.9]],.78,.72);
for(let i=0;i<25;i++)box(.76,.22,.19,P.darkStone,-12.1+i*.83,.55,5.94);
for(let i=0;i<3;i++)box(1.5,.09,.22,P.lightStone,.6,.70-i*.08,6.1+i*.25);
for(let i=0;i<11;i++){const z=-.36-i*.17;box(2.15,.14+i*.11,.18,0xc5baa0,0,.74+i*.055,z,fixed,true);}for(const x of[-1.18,1.18]){box(.21,.45,2.1,P.darkStone,x,.90,-1.13);}
// Low terraces on each wing, held with visible stone retaining walls.
for(const x of[-12,12]){rounded(6.6,8.2,.33,.25,0x8e9e61,x,.48,-7.3);for(let i=0;i<8;i++)box(.72,.32,.25,P.darkStone,x-2.95+i*.84,.57,-3.21);}
const patches=[[-8.3,10.3,10.8,7.2], [7.65,11.7,10.5,4.4],[-12.2,-7.7,5.3,7.5],[12.2,-8.5,5.2,8.0], [6.45,8.2,3.1,2.6]];
for(const [x,z,w,d]of patches){const elevated=z<0,y=elevated?.84:.48;rounded(w,d,.075,.14,0x938350,x,y,z);for(let j=0;j<Math.floor(w/.44);j++){const xx=x-w/2+.22+j*.44;box(.19,.035,d-.15,0x746c48,xx,y+.03,z);}
const n=Math.floor(w*d*11),geom=new THREE.ConeGeometry(.067,.34,4);const im=new THREE.InstancedMesh(geom,new THREE.MeshToonMaterial({color:P.gold}),n*2);im.castShadow=true;im.receiveShadow=true;const dummy=new THREE.Object3D(),coords=[];for(let i=0;i<n;i++){const row=Math.floor(rand()*Math.floor(w/.44)),xx=x-w/2+.22+row*.44+range(-.075,.075),zz=z+range(-d/2+.15,d/2-.15),hh=range(.45,.71);coords.push([xx,zz,hh,range(0,6.28)]);for(let k=0;k<2;k++){dummy.position.set(xx+(k?.08:0),y+hh+(k?.12:0),zz);dummy.rotation.set(0,0,k?-.24:.15);dummy.scale.setScalar(1);dummy.updateMatrix();im.setMatrixAt(i*2+k,dummy.matrix);im.setColorAt(i*2+k,new THREE.Color([0xd4b163,0xe0c278,0xc5a557,0xbeb16a][i%4]));}}
moving.add(im);wheat.push({mesh:im,coords,y,dummy});fence(x-w/2,z+d/2+.14,w,'x',y);fence(x-w/2-.12,z-d/2,d,'z',y);}
// Water channel winds down the right wing, then crosses the front.
for(const [x,z,w,d]of[[8.45,5.6,.82,6.2],[5.3,8.5,6.9,.75],[4.35,13.1,.77,8.9]]){box(w+.22,.05,d+.22,P.darkStone,x,.47,z);const wat=box(w,.025,d,P.water,x,.50,z);waterMeshes.push(wat);for(let i=0;i<6;i++)box(.24,.015,.035,0xb8d4bf,x+range(-w*.4,w*.4),.53,z+range(-d*.4,d*.4));}
for(let i=0;i<8;i++)box(.25,.1,1.45,P.wood,4.35-1+i*.28,.65,9.2,fixed,true);for(const z of[8.48,9.92]){for(const x of[3.4,5.3])box(.09,.48,.09,P.wood,x,.92,z);beam([3.4,1.02,z],[5.3,1.02,z],.035,P.wood);}
for(const [x,z]of[[-11.6,6.1],[8.15,14.4],[13.65,2.35]])hay(x,z);
scarecrow(-7.8,10.5);scarecrow(9.8,11.4);
// Trees frame the square without hiding its miniature architecture.
const trees=[[-14,-14],[-11,-14.4],[-8.8,-14.7],[-14.5,-10.8],[-14.4,-3.9],[-14.5,3.1],[-14.7,6.0],[-13.8,13.7],[14.6,-14.6],[11.5,-14.4],[14.8,-11.3],[14.7,-4.4],[14.5,9.7],[14.6,13.7],[-9.8,-2.4],[-8.8,-1.9],[7.5,-1.0],[-2.6,7.35],[6.9,5.8]];
for(const [x,z]of trees)tree(x,z,range(.78,1.18),z<-3?.84:.46);
for(let i=0;i<90;i++){const x=range(-15,15),z=range(-15,15);if(Math.abs(x)<13&&Math.abs(z)<13)continue;ball(range(.07,.17),0x99a184,x,.52,z);}
for(let i=0;i<50;i++){const x=range(-13,13),z=range(6,15);if(Math.abs(x)<1.4)continue;const g=group(x,.48,z);for(let k=0;k<3;k++)beam([0,0,0],[range(-.09,.09),.18,range(-.09,.09)],.012,0x697f47,g);ball(.034,i%3?0xcbb679:0xb78069,0,.19,0,g);}
for(const [x,z]of[[-12.8,4.1],[-12.4,5.4],[-10.1,4.9],[12.8,10.1]])animal(x,z,'sheep');animal(12.6,12.6,'cow');animal(-11.4,2,'cow');
}
function hay(x,z){cyl(.56,.86,P.thatch,x,.88,z,fixed,.39,10);cyl(.44,.59,0xd0b36f,x-.75,.75,z+.3,fixed,.41,10);for(let i=0;i<12;i++){const a=i*Math.PI/6;beam([x+Math.sin(a)*.51,.51,z+Math.cos(a)*.51],[x+Math.sin(a)*.32,1.28,z+Math.cos(a)*.32],.02,0xe0c68b);}for(const y of[.7,1.03]){const t=mesh(new THREE.TorusGeometry(.49,.025,3,12),P.wood,x,y,z);t.rotation.x=Math.PI/2;}}
function scarecrow(x,z){const g=group(x,.49,z);beam([0,0,0],[0,1.7,0],.035,P.wood,g);beam([-.60,1.16,0],[.60,1.1,0],.045,P.wood,g);box(.35,.55,.18,0x9a7654,0,1.06,0,g);ball(.19,0xcbb389,0,1.5,0,g);cyl(.31,.05,0xd0b56e,0,1.64,0,g);cyl(.18,.21,P.thatch,0,1.76,0,g,.12);box(.10,.32,.04,0x9c5e45,.05,1.23,.11,g);}
function tree(x,z,s,y){cyl(.15*s,1.75*s,P.wood,x,y+.88*s,z);const g=group(x,y+1.5*s,z,moving);for(const [a,b,c,r]of[[0,.75,0,.82],[-.5,.15,0,.65],[.4,.25,.25,.72],[0,.2,-.5,.64],[.05,1.26,.03,.5]])ball(r*s,[0x65846a,0x749269,0x94a272][Math.floor(rand()*3)],a*s,b*s,c*s,g,1);const phase=rand()*6.3;animations.push(t=>{g.rotation.z=Math.sin(t*.8+phase)*.018;g.rotation.x=Math.cos(t*.63+phase)*.012;});}
function animal(x,z,type){const g=group(x,.5,z);g.rotation.y=range(-1,1);const sheep=type==='sheep',c=sheep?0xe4dfc4:0xa89479;const body=ball(sheep?.42:.5,c,0,.52,0,g,1);body.scale.set(1.25,1,.85);for(const a of[-.30,.30])for(const b of[-.23,.23])box(.085,.37,.085,sheep?0x675f4d:P.wood,a,.18,b,g);ball(.21,sheep?0x776f5a:0x685d4e,.59,.63,0,g);for(const z of[-.13,.13])ball(.075,c,.56,.78,z,g);if(!sheep){ball(.16,0x786e59,-.16,.84,.25,g);ball(.11,0x786e59,.27,.77,-.3,g);}animals.push(g);}
