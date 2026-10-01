import * as THREE from 'three';
export { THREE };
export const scene=new THREE.Scene(), fixed=new THREE.Group(), moving=new THREE.Group(); scene.add(fixed,moving);
export const palette={stone:0xc4bba0,lightStone:0xd9d0b9,darkStone:0x8e9381,mortar:0x697565,grass:0x91a765,grassLight:0xa8b978,earth:0x7d7753,roof:0x526e76,roofLight:0x708b8b,wood:0x735d42,timber:0x514b3d,plaster:0xe4d8b9,thatch:0xbca15f,gold:0xd4b460,water:0x72b0b0,red:0xa85f47};
const ramp=new THREE.DataTexture(new Uint8Array([105,170,220,255]),4,1,THREE.RedFormat); ramp.minFilter=ramp.magFilter=THREE.NearestFilter; ramp.needsUpdate=true;
const materials=new Map(); export function mat(color,opts={}){const key=color+JSON.stringify(opts);if(!materials.has(key))materials.set(key,new THREE.MeshToonMaterial({color,gradientMap:ramp,...opts}));return materials.get(key);}
const lineMat=new THREE.LineBasicMaterial({color:0x424d43,transparent:true,opacity:.18});
export function mesh(geo,color,x=0,y=0,z=0,parent=fixed,edge=false,opts={}){const m=new THREE.Mesh(geo,mat(color,opts));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);if(edge){const l=new THREE.LineSegments(new THREE.EdgesGeometry(geo,26),lineMat);m.add(l);}return m;}
export function box(w,h,d,color,x,y,z,parent=fixed,edge=false){return mesh(new THREE.BoxGeometry(w,h,d),color,x,y,z,parent,edge);}
export function cyl(r,h,color,x,y,z,parent=fixed,r2=r,n=8){return mesh(new THREE.CylinderGeometry(r2,r,h,n),color,x,y,z,parent);}
export function ball(r,color,x,y,z,parent=fixed,detail=0){return mesh(new THREE.IcosahedronGeometry(r,detail),color,x,y,z,parent);}
export function beam(a,b,r,color,parent=fixed,n=5){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b);const m=cyl(r,A.distanceTo(B),color,...A.clone().add(B).multiplyScalar(.5).toArray(),parent,r,n);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),B.sub(A).normalize());return m;}
export function group(x=0,y=0,z=0,parent=fixed){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);return g;}
export function roof(w,h,d,color,x,y,z,parent=fixed){const s=new THREE.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(0,h);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false});g.translate(0,0,-d/2);return mesh(g,color,x,y,z,parent,true);}
export function rounded(w,d,h,r,color,x,y,z,parent=fixed){const s=new THREE.Shape(),a=-w/2,b=-d/2;s.moveTo(a+r,b);s.lineTo(a+w-r,b);s.quadraticCurveTo(a+w,b,a+w,b+r);s.lineTo(a+w,b+d-r);s.quadraticCurveTo(a+w,b+d,a+w-r,b+d);s.lineTo(a+r,b+d);s.quadraticCurveTo(a,b+d,a,b+d-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);const geo=new THREE.ExtrudeGeometry(s,{depth:h,bevelEnabled:false,curveSegments:4});geo.rotateX(-Math.PI/2);return mesh(geo,color,x,y,z,parent);}
let seed=7321;export function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}export const range=(a,b)=>a+(b-a)*rand();
export const animations=[];export const waterMeshes=[];export const windows=[];
export function path(points,width=.85,y=.44,color=0xc8bc93){for(let i=0;i<points.length-1;i++){const [x,z]=points[i],[xx,zz]=points[i+1],len=Math.hypot(xx-x,zz-z);const p=box(width,.055,len+.14,color,(x+xx)/2,y,(z+zz)/2);p.rotation.y=Math.atan2(xx-x,zz-z);}}
export function windowOn(x,y,z,w=.32,h=.48,parent=fixed){box(w,h,.045,0x46564f,x,y,z,parent);box(w+.12,.075,.10,palette.wood,x,y-h/2,z+.04,parent);const pane=box(w*.68,h*.68,.047,0xd3ad69,x,y,z+.012,parent);windows.push(pane);}
export function barrel(x,y,z,r=.28,parent=fixed){cyl(r,.55,palette.wood,x,y+.27,z,parent,r*.92,10);for(const h of [.1,.43]){const t=mesh(new THREE.TorusGeometry(r,.025,4,10),0x56615a,x,y+h,z,parent);t.rotation.x=Math.PI/2;}cyl(r*.81,.025,0xa59062,x,y+.56,z,parent);}
export function fence(x,z,len,axis='x',y=.46){for(let i=0;i<=len;i+=.85){const xx=x+(axis==='x'?i:0),zz=z+(axis==='z'?i:0);box(.13,.83,.13,palette.wood,xx,y+.41,zz);cyl(.12,.15,palette.wood,xx,y+.88,zz,fixed,0,4);}for(const yy of [.33,.64]){const p=box(axis==='x'?len:.075,.085,axis==='z'?len:.075,palette.wood,x+(axis==='x'?len/2:0),y+yy,z+(axis==='z'?len/2:0));}}
