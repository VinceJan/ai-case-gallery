(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fa="172",ns={ROTATE:0,DOLLY:1,PAN:2},Qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nh=0,Fa=1,ih=2,el=1,nl=2,Bn=3,Wn=0,Je=1,Ve=2,oi=0,is=1,Oa=2,za=3,Ba=4,sh=5,vi=100,oh=101,rh=102,ah=103,ch=104,lh=200,hh=201,uh=202,dh=203,wr=204,br=205,fh=206,ph=207,mh=208,gh=209,_h=210,vh=211,xh=212,Mh=213,yh=214,Er=0,Tr=1,Ar=2,as=3,Cr=4,Rr=5,Pr=6,Dr=7,il=0,Sh=1,wh=2,ri=0,bh=1,Eh=2,Th=3,sl=4,Ah=5,Ch=6,Rh=7,ol=300,cs=301,ls=302,Lr=303,Ir=304,Io=306,Ds=1e3,Hn=1001,Ur=1002,De=1003,Ph=1004,ks=1005,vn=1006,Ho=1007,Mi=1008,Xn=1009,rl=1010,al=1011,Ls=1012,pa=1013,yi=1014,Pn=1015,Si=1016,ma=1017,ga=1018,hs=1020,cl=35902,ll=1021,hl=1022,xn=1023,ul=1024,dl=1025,ss=1026,us=1027,_a=1028,va=1029,fl=1030,xa=1031,Ma=1033,Mo=33776,yo=33777,So=33778,wo=33779,Nr=35840,Fr=35841,Or=35842,zr=35843,Br=36196,kr=37492,Hr=37496,Gr=37808,Vr=37809,Wr=37810,Xr=37811,Yr=37812,qr=37813,Zr=37814,Kr=37815,jr=37816,$r=37817,Jr=37818,Qr=37819,ta=37820,ea=37821,bo=36492,na=36494,ia=36495,pl=36283,sa=36284,oa=36285,ra=36286,Dh=3200,ml=3201,gl=0,Lh=1,ii="",Ke="srgb",ds="srgb-linear",Ao="linear",ue="srgb",Fi=7680,ka=519,Ih=512,Uh=513,Nh=514,_l=515,Fh=516,Oh=517,zh=518,Bh=519,Ha=35044,Ga="300 es",Gn=2e3,Co=2001;class Ti{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Va=1234567;const Ts=Math.PI/180,Is=180/Math.PI;function Ai(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]).toLowerCase()}function ie(i,t,e){return Math.max(t,Math.min(e,i))}function ya(i,t){return(i%t+t)%t}function kh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hh(i,t,e){return i!==t?(e-i)/(t-i):0}function As(i,t,e){return(1-e)*i+e*t}function Gh(i,t,e,n){return As(i,t,1-Math.exp(-e*n))}function Vh(i,t=1){return t-Math.abs(ya(i,t*2)-t)}function Wh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Xh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Yh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function qh(i,t){return i+Math.random()*(t-i)}function Zh(i){return i*(.5-Math.random())}function Kh(i){i!==void 0&&(Va=i);let t=Va+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function jh(i){return i*Ts}function $h(i){return i*Is}function Jh(i){return(i&i-1)===0&&i!==0}function Qh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function tu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eu(i,t,e,n,s){const o=Math.cos,r=Math.sin,a=o(e/2),c=r(e/2),l=o((t+n)/2),h=r((t+n)/2),u=o((t-n)/2),d=r((t-n)/2),p=o((n-t)/2),g=r((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function $i(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Be={DEG2RAD:Ts,RAD2DEG:Is,generateUUID:Ai,clamp:ie,euclideanModulo:ya,mapLinear:kh,inverseLerp:Hh,lerp:As,damp:Gh,pingpong:Vh,smoothstep:Wh,smootherstep:Xh,randInt:Yh,randFloat:qh,randFloatSpread:Zh,seededRandom:Kh,degToRad:jh,radToDeg:$h,isPowerOfTwo:Jh,ceilPowerOfTwo:Qh,floorPowerOfTwo:tu,setQuaternionFromProperEuler:eu,normalize:qe,denormalize:$i};class Pt{constructor(t=0,e=0){Pt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*s+t.x,this.y=o*s+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ee{constructor(t,e,n,s,o,r,a,c,l){ee.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,c,l)}set(t,e,n,s,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],T=s[1],S=s[4],M=s[7],L=s[2],R=s[5],C=s[8];return o[0]=r*v+a*T+c*L,o[3]=r*m+a*S+c*R,o[6]=r*f+a*M+c*C,o[1]=l*v+h*T+u*L,o[4]=l*m+h*S+u*R,o[7]=l*f+h*M+u*C,o[2]=d*v+p*T+g*L,o[5]=d*m+p*S+g*R,o[8]=d*f+p*M+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+s*o*l-s*r*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,d=a*c-h*o,p=l*o-r*c,g=e*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*r)*v,t[3]=d*v,t[4]=(h*e-s*c)*v,t[5]=(s*o-a*e)*v,t[6]=p*v,t[7]=(n*c-l*e)*v,t[8]=(r*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-s*l,s*c,-s*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Go.makeScale(t,e)),this}rotate(t){return this.premultiply(Go.makeRotation(-t)),this}translate(t,e){return this.premultiply(Go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Go=new ee;function vl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nu(){const i=Ro("canvas");return i.style.display="block",i}const Wa={};function Ji(i){i in Wa||(Wa[i]=!0,console.warn(i))}function iu(i,t,e){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function su(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ou(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Xa=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ya=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ru(){const i={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(s,o,r){return this.enabled===!1||o===r||!o||!r||(this.spaces[o].transfer===ue&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[o].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[o].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ue&&(s.r=os(s.r),s.g=os(s.g),s.b=os(s.b))),s},fromWorkingColorSpace:function(s,o){return this.convert(s,this.workingColorSpace,o)},toWorkingColorSpace:function(s,o){return this.convert(s,o,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ii?Ao:this.spaces[s].transfer},getLuminanceCoefficients:function(s,o=this.workingColorSpace){return s.fromArray(this.spaces[o].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,o,r){return s.copy(this.spaces[o].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ds]:{primaries:t,whitePoint:n,transfer:Ao,toXYZ:Xa,fromXYZ:Ya,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:Xa,fromXYZ:Ya,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),i}const ae=ru();function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Oi;class au{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Oi===void 0&&(Oi=Ro("canvas")),Oi.width=t.width,Oi.height=t.height;const n=Oi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Oi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ro("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=Vn(o[r]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let cu=0;class xl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Ai(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(Vo(s[r].image)):o.push(Vo(s[r]))}else o=Vo(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function Vo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?au.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lu=0;class We extends Ti{constructor(t=We.DEFAULT_IMAGE,e=We.DEFAULT_MAPPING,n=Hn,s=Hn,o=vn,r=Mi,a=xn,c=Xn,l=We.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Ai(),this.name="",this.source=new xl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ol)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ds:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case Ur:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ds:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case Ur:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=ol;We.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,n=0,s=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,M=(p+1)/2,L=(f+1)/2,R=(h+d)/4,C=(u+v)/4,P=(g+m)/4;return S>M&&S>L?S<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(S),s=R/n,o=C/n):M>L?M<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(M),n=R/s,o=P/s):L<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(L),n=C/o,s=P/o),this.set(n,s,o,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-v)/T,this.z=(d-h)/T,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this.w=ie(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this.w=ie(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hu extends Ti{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new We(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const e=Object.assign({},t.texture.image);return this.texture.source=new xl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends hu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ml extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class uu extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=De,this.minFilter=De,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,r,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=o[r+0],p=o[r+1],g=o[r+2],v=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*v,T=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){const L=Math.sqrt(S),R=Math.atan2(L,f*T);m=Math.sin(m*R)/L,a=Math.sin(a*R)/L}const M=a*T;if(c=c*m+d*M,l=l*m+p*M,h=h*m+g*M,u=u*m+v*M,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,o,r){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=o[r],d=o[r+1],p=o[r+2],g=o[r+3];return t[e]=a*g+h*u+c*p-l*d,t[e+1]=c*g+h*d+l*u-a*p,t[e+2]=l*g+h*p+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(o/2),d=c(n/2),p=c(s/2),g=c(o/2);switch(r){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(o-l)*p,this._z=(r-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(o+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(o-l)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(r-s)/p,this._x=(o+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ie(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+s*l-o*c,this._y=s*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-s*a,this._w=r*h-n*a-s*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=o*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*s-a*n),h=2*(a*e-o*s),u=2*(o*n-r*e);return this.x=e+c*l+r*u-a*h,this.y=n+c*h+a*l-o*u,this.z=s+c*u+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=s*c-o*a,this.y=o*r-n*c,this.z=n*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Wo.copy(this).projectOnVector(t),this.sub(Wo)}reflect(t){return this.sub(Wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wo=new I,qa=new wi;class Ci{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,wn):wn.fromBufferAttribute(o,r),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hs.copy(n.boundingBox)),Hs.applyMatrix4(t.matrixWorld),this.union(Hs)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vs),Gs.subVectors(this.max,vs),zi.subVectors(t.a,vs),Bi.subVectors(t.b,vs),ki.subVectors(t.c,vs),Zn.subVectors(Bi,zi),Kn.subVectors(ki,Bi),hi.subVectors(zi,ki);let e=[0,-Zn.z,Zn.y,0,-Kn.z,Kn.y,0,-hi.z,hi.y,Zn.z,0,-Zn.x,Kn.z,0,-Kn.x,hi.z,0,-hi.x,-Zn.y,Zn.x,0,-Kn.y,Kn.x,0,-hi.y,hi.x,0];return!Xo(e,zi,Bi,ki,Gs)||(e=[1,0,0,0,1,0,0,0,1],!Xo(e,zi,Bi,ki,Gs))?!1:(Vs.crossVectors(Zn,Kn),e=[Vs.x,Vs.y,Vs.z],Xo(e,zi,Bi,ki,Gs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const In=[new I,new I,new I,new I,new I,new I,new I,new I],wn=new I,Hs=new Ci,zi=new I,Bi=new I,ki=new I,Zn=new I,Kn=new I,hi=new I,vs=new I,Gs=new I,Vs=new I,ui=new I;function Xo(i,t,e,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){ui.fromArray(i,o);const a=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),c=t.dot(ui),l=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const du=new Ci,xs=new I,Yo=new I;class Ri{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):du.setFromPoints(t).getCenter(n);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xs.subVectors(t,this.center);const e=xs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xs.copy(t.center).add(Yo)),this.expandByPoint(xs.copy(t.center).sub(Yo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Un=new I,qo=new I,Ws=new I,jn=new I,Zo=new I,Xs=new I,Ko=new I;class Uo{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Un.copy(this.origin).addScaledVector(this.direction,e),Un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){qo.copy(t).add(e).multiplyScalar(.5),Ws.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(qo);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Ws),a=jn.dot(this.direction),c=-jn.dot(Ws),l=jn.lengthSq(),h=Math.abs(1-r*r);let u,d,p,g;if(h>0)if(u=r*c-a,d=r*a-c,g=o*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,p=u*(u+r*d+2*a)+d*(r*u+d+2*c)+l}else d=o,u=Math.max(0,-(r*d+a)),p=-u*u+d*(d+2*c)+l;else d=-o,u=Math.max(0,-(r*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-r*o+a)),d=u>0?-o:Math.min(Math.max(-o,-c),o),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-o,-c),o),p=d*(d+2*c)+l):(u=Math.max(0,-(r*o+a)),d=u>0?o:Math.min(Math.max(-o,-c),o),p=-u*u+d*(d+2*c)+l);else d=r>0?-o:o,u=Math.max(0,-(r*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(qo).addScaledVector(Ws,d),p}intersectSphere(t,e){Un.subVectors(t.center,this.origin);const n=Un.dot(this.direction),s=Un.dot(Un)-n*n,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(o=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(o=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Un)!==null}intersectTriangle(t,e,n,s,o){Zo.subVectors(e,t),Xs.subVectors(n,t),Ko.crossVectors(Zo,Xs);let r=this.direction.dot(Ko),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;jn.subVectors(this.origin,t);const c=a*this.direction.dot(Xs.crossVectors(jn,Xs));if(c<0)return null;const l=a*this.direction.dot(Zo.cross(jn));if(l<0||c+l>r)return null;const h=-a*jn.dot(Ko);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fe{constructor(t,e,n,s,o,r,a,c,l,h,u,d,p,g,v,m){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,c,l,h,u,d,p,g,v,m)}set(t,e,n,s,o,r,a,c,l,h,u,d,p,g,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=o,f[5]=r,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Hi.setFromMatrixColumn(t,0).length(),o=1/Hi.setFromMatrixColumn(t,1).length(),r=1/Hi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const d=r*h,p=r*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=g+p*l,e[10]=r*c}else if(t.order==="YXZ"){const d=c*h,p=c*u,g=l*h,v=l*u;e[0]=d+v*a,e[4]=g*a-p,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=p*a-g,e[6]=v+d*a,e[10]=r*c}else if(t.order==="ZXY"){const d=c*h,p=c*u,g=l*h,v=l*u;e[0]=d-v*a,e[4]=-r*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=r*h,e[9]=v-d*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const d=r*h,p=r*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-p,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const d=r*c,p=r*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-d*u,e[8]=g*u+p,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=r*c,p=r*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=r*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fu,t,pu)}lookAt(t,e,n){const s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),$n.crossVectors(n,sn),$n.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),$n.crossVectors(n,sn)),$n.normalize(),Ys.crossVectors(sn,$n),s[0]=$n.x,s[4]=Ys.x,s[8]=sn.x,s[1]=$n.y,s[5]=Ys.y,s[9]=sn.y,s[2]=$n.z,s[6]=Ys.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],T=n[3],S=n[7],M=n[11],L=n[15],R=s[0],C=s[4],P=s[8],w=s[12],y=s[1],D=s[5],Y=s[9],H=s[13],et=s[2],it=s[6],q=s[10],$=s[14],j=s[3],yt=s[7],Rt=s[11],ft=s[15];return o[0]=r*R+a*y+c*et+l*j,o[4]=r*C+a*D+c*it+l*yt,o[8]=r*P+a*Y+c*q+l*Rt,o[12]=r*w+a*H+c*$+l*ft,o[1]=h*R+u*y+d*et+p*j,o[5]=h*C+u*D+d*it+p*yt,o[9]=h*P+u*Y+d*q+p*Rt,o[13]=h*w+u*H+d*$+p*ft,o[2]=g*R+v*y+m*et+f*j,o[6]=g*C+v*D+m*it+f*yt,o[10]=g*P+v*Y+m*q+f*Rt,o[14]=g*w+v*H+m*$+f*ft,o[3]=T*R+S*y+M*et+L*j,o[7]=T*C+S*D+M*it+L*yt,o[11]=T*P+S*Y+M*q+L*Rt,o[15]=T*w+S*H+M*$+L*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+o*c*u-s*l*u-o*a*d+n*l*d+s*a*p-n*c*p)+v*(+e*c*p-e*l*d+o*r*d-s*r*p+s*l*h-o*c*h)+m*(+e*l*u-e*a*p-o*r*u+n*r*p+o*a*h-n*l*h)+f*(-s*a*h-e*c*u+e*a*d+s*r*u-n*r*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],v=t[13],m=t[14],f=t[15],T=u*m*l-v*d*l+v*c*p-a*m*p-u*c*f+a*d*f,S=g*d*l-h*m*l-g*c*p+r*m*p+h*c*f-r*d*f,M=h*v*l-g*u*l+g*a*p-r*v*p-h*a*f+r*u*f,L=g*u*c-h*v*c-g*a*d+r*v*d+h*a*m-r*u*m,R=e*T+n*S+s*M+o*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return t[0]=T*C,t[1]=(v*d*o-u*m*o-v*s*p+n*m*p+u*s*f-n*d*f)*C,t[2]=(a*m*o-v*c*o+v*s*l-n*m*l-a*s*f+n*c*f)*C,t[3]=(u*c*o-a*d*o-u*s*l+n*d*l+a*s*p-n*c*p)*C,t[4]=S*C,t[5]=(h*m*o-g*d*o+g*s*p-e*m*p-h*s*f+e*d*f)*C,t[6]=(g*c*o-r*m*o-g*s*l+e*m*l+r*s*f-e*c*f)*C,t[7]=(r*d*o-h*c*o+h*s*l-e*d*l-r*s*p+e*c*p)*C,t[8]=M*C,t[9]=(g*u*o-h*v*o-g*n*p+e*v*p+h*n*f-e*u*f)*C,t[10]=(r*v*o-g*a*o+g*n*l-e*v*l-r*n*f+e*a*f)*C,t[11]=(h*a*o-r*u*o-h*n*l+e*u*l+r*n*p-e*a*p)*C,t[12]=L*C,t[13]=(h*v*s-g*u*s+g*n*d-e*v*d-h*n*m+e*u*m)*C,t[14]=(g*a*s-r*v*s-g*n*c+e*v*c+r*n*m-e*a*m)*C,t[15]=(r*u*s-h*a*s+h*n*c-e*u*c-r*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*r,0,l*c-s*a,h*c+s*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,r){return this.set(1,n,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,u=a+a,d=o*l,p=o*h,g=o*u,v=r*h,m=r*u,f=a*u,T=c*l,S=c*h,M=c*u,L=n.x,R=n.y,C=n.z;return s[0]=(1-(v+f))*L,s[1]=(p+M)*L,s[2]=(g-S)*L,s[3]=0,s[4]=(p-M)*R,s[5]=(1-(d+f))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+S)*C,s[9]=(m-T)*C,s[10]=(1-(d+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Hi.set(s[0],s[1],s[2]).length();const r=Hi.set(s[4],s[5],s[6]).length(),a=Hi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],bn.copy(this);const l=1/o,h=1/r,u=1/a;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,e.setFromRotationMatrix(bn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,s,o,r,a=Gn){const c=this.elements,l=2*o/(e-t),h=2*o/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let p,g;if(a===Gn)p=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===Co)p=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,o,r,a=Gn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(r-o),d=(e+t)*l,p=(n+s)*h;let g,v;if(a===Gn)g=(r+o)*u,v=-2*u;else if(a===Co)g=o*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Hi=new I,bn=new fe,fu=new I(0,0,0),pu=new I(1,1,1),$n=new I,Ys=new I,sn=new I,Za=new fe,Ka=new wi;class qn{constructor(t=0,e=0,n=0,s=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(ie(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ie(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Za.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Za,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ka.setFromEuler(this),this.setFromQuaternion(Ka,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class yl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let mu=0;const ja=new I,Gi=new wi,Nn=new fe,qs=new I,Ms=new I,gu=new I,_u=new wi,$a=new I(1,0,0),Ja=new I(0,1,0),Qa=new I(0,0,1),tc={type:"added"},vu={type:"removed"},Vi={type:"childadded",child:null},jo={type:"childremoved",child:null};class Re extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new I,e=new qn,n=new wi,s=new I(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new ee}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.premultiply(Gi),this}rotateX(t){return this.rotateOnAxis($a,t)}rotateY(t){return this.rotateOnAxis(Ja,t)}rotateZ(t){return this.rotateOnAxis(Qa,t)}translateOnAxis(t,e){return ja.copy(t).applyQuaternion(this.quaternion),this.position.add(ja.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($a,t)}translateY(t){return this.translateOnAxis(Ja,t)}translateZ(t){return this.translateOnAxis(Qa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qs.copy(t):qs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Ms,qs,this.up):Nn.lookAt(qs,Ms,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),Gi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tc),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vu),jo.child=t,this.dispatchEvent(jo),jo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Nn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tc),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,t,gu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,_u,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];o(t.shapes,u)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),p=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Re.DEFAULT_UP=new I(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new I,Fn=new I,$o=new I,On=new I,Wi=new I,Xi=new I,ec=new I,Jo=new I,Qo=new I,tr=new I,er=new Se,nr=new Se,ir=new Se;class Tn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),En.subVectors(t,e),s.cross(En);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){En.subVectors(s,e),Fn.subVectors(n,e),$o.subVectors(t,e);const r=En.dot(En),a=En.dot(Fn),c=En.dot($o),l=Fn.dot(Fn),h=Fn.dot($o),u=r*l-a*a;if(u===0)return o.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(r*h-a*c)*d;return o.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(t,e,n,s,o,r,a,c){return this.getBarycoord(t,e,n,s,On)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,On.x),c.addScaledVector(r,On.y),c.addScaledVector(a,On.z),c)}static getInterpolatedAttribute(t,e,n,s,o,r){return er.setScalar(0),nr.setScalar(0),ir.setScalar(0),er.fromBufferAttribute(t,e),nr.fromBufferAttribute(t,n),ir.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(er,o.x),r.addScaledVector(nr,o.y),r.addScaledVector(ir,o.z),r}static isFrontFacing(t,e,n,s){return En.subVectors(n,e),Fn.subVectors(t,e),En.cross(Fn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),En.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Tn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let r,a;Wi.subVectors(s,n),Xi.subVectors(o,n),Jo.subVectors(t,n);const c=Wi.dot(Jo),l=Xi.dot(Jo);if(c<=0&&l<=0)return e.copy(n);Qo.subVectors(t,s);const h=Wi.dot(Qo),u=Xi.dot(Qo);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(Wi,r);tr.subVectors(t,o);const p=Wi.dot(tr),g=Xi.dot(tr);if(g>=0&&p<=g)return e.copy(o);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Xi,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ec.subVectors(o,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(ec,a);const f=1/(m+v+d);return r=v*f,a=d*f,e.copy(n).addScaledVector(Wi,r).addScaledVector(Xi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Sl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function sr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=ya(t,1),e=ie(e,0,1),n=ie(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=sr(r,o,t+1/3),this.g=sr(r,o,t),this.b=sr(r,o,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Ke){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const n=Sl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return ae.fromWorkingColorSpace(Ge.copy(this),t),Math.round(ie(Ge.r*255,0,255))*65536+Math.round(ie(Ge.g*255,0,255))*256+Math.round(ie(Ge.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Ge.copy(this),e);const n=Ge.r,s=Ge.g,o=Ge.b,r=Math.max(n,s,o),a=Math.min(n,s,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case n:c=(s-o)/u+(s<o?6:0);break;case s:c=(o-n)/u+2;break;case o:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=Ke){ae.fromWorkingColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,s=Ge.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Zs);const n=As(Jn.h,Zs.h,e),s=As(Jn.s,Zs.s,e),o=As(Jn.l,Zs.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new kt;kt.NAMES=Sl;let xu=0;class Pi extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=is,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wr,this.blendDst=br,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ka,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==is&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wr&&(n.blendSrc=this.blendSrc),this.blendDst!==br&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ka&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Os extends Pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new I,Ks=new Pt;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ha,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ks.fromBufferAttribute(this,e),Ks.applyMatrix3(t),this.setXY(e,Ks.x,Ks.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=$i(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$i(e,this.array)),e}setX(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$i(e,this.array)),e}setY(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$i(e,this.array)),e}setW(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array),o=qe(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ha&&(t.usage=this.usage),t}}class wl extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bl extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _e extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Mu=0;const mn=new fe,or=new Re,Yi=new I,on=new Ci,ys=new Ci,Ue=new I;class ke extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vl(t)?bl:wl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ee().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return or.lookAt(t),or.updateMatrix(),this.applyMatrix4(or.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new _e(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const o=t[s];e.setXYZ(s,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];on.setFromBufferAttribute(o),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(on.min,ys.min),on.expandByPoint(Ue),Ue.addVectors(on.max,ys.max),on.expandByPoint(Ue)):(on.expandByPoint(ys.min),on.expandByPoint(ys.max))}on.getCenter(n);let s=0;for(let o=0,r=t.count;o<r;o++)Ue.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ue.fromBufferAttribute(a,l),c&&(Yi.fromBufferAttribute(t,l),Ue.add(Yi)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new I,c[P]=new I;const l=new I,h=new I,u=new I,d=new Pt,p=new Pt,g=new Pt,v=new I,m=new I;function f(P,w,y){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),d.fromBufferAttribute(o,P),p.fromBufferAttribute(o,w),g.fromBufferAttribute(o,y),h.sub(l),u.sub(l),p.sub(d),g.sub(d);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(D),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),a[P].add(v),a[w].add(v),a[y].add(v),c[P].add(m),c[w].add(m),c[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,w=T.length;P<w;++P){const y=T[P],D=y.start,Y=y.count;for(let H=D,et=D+Y;H<et;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const S=new I,M=new I,L=new I,R=new I;function C(P){L.fromBufferAttribute(s,P),R.copy(L);const w=a[P];S.copy(w),S.sub(L.multiplyScalar(L.dot(w))).normalize(),M.crossVectors(R,w);const D=M.dot(c[P])<0?-1:1;r.setXYZW(P,S.x,S.y,S.z,D)}for(let P=0,w=T.length;P<w;++P){const y=T[P],D=y.start,Y=y.count;for(let H=D,et=D+Y;H<et;H+=3)C(t.getX(H+0)),C(t.getX(H+1)),C(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new I,o=new I,r=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,m),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?p=c[v]*a.data.stride+a.offset:p=c[v]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new hn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ke,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=t(d,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],u=o[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nc=new fe,di=new Uo,js=new Ri,ic=new I,$s=new I,Js=new I,Qs=new I,rr=new I,to=new I,sc=new I,eo=new I;class A extends Re{constructor(t=new ke,e=new Os){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){to.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],u=o[c];h!==0&&(rr.fromBufferAttribute(u,t),r?to.addScaledVector(rr,h):to.addScaledVector(rr.sub(e),h))}e.add(to)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(o),di.copy(t.ray).recast(t.near),!(js.containsPoint(di.origin)===!1&&(di.intersectSphere(js,ic)===null||di.origin.distanceToSquared(ic)>(t.far-t.near)**2))&&(nc.copy(o).invert(),di.copy(t.ray).applyMatrix4(nc),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,n){let s;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,d=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=r[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=T,L=S;M<L;M+=3){const R=a.getX(M),C=a.getX(M+1),P=a.getX(M+2);s=no(this,f,t,n,l,h,u,R,C,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const T=a.getX(m),S=a.getX(m+1),M=a.getX(m+2);s=no(this,r,t,n,l,h,u,T,S,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=r[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=T,L=S;M<L;M+=3){const R=M,C=M+1,P=M+2;s=no(this,f,t,n,l,h,u,R,C,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const T=m,S=m+1,M=m+2;s=no(this,r,t,n,l,h,u,T,S,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function yu(i,t,e,n,s,o,r,a){let c;if(t.side===Je?c=n.intersectTriangle(r,o,s,!0,a):c=n.intersectTriangle(s,o,r,t.side===Wn,a),c===null)return null;eo.copy(a),eo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(eo);return l<e.near||l>e.far?null:{distance:l,point:eo.clone(),object:i}}function no(i,t,e,n,s,o,r,a,c,l){i.getVertexPosition(a,$s),i.getVertexPosition(c,Js),i.getVertexPosition(l,Qs);const h=yu(i,t,e,n,$s,Js,Qs,sc);if(h){const u=new I;Tn.getBarycoord(sc,$s,Js,Qs,u),s&&(h.uv=Tn.getInterpolatedAttribute(s,a,c,l,u,new Pt)),o&&(h.uv1=Tn.getInterpolatedAttribute(o,a,c,l,u,new Pt)),r&&(h.normal=Tn.getInterpolatedAttribute(r,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};Tn.getNormal($s,Js,Qs,d.normal),h.face=d,h.barycoord=u}return h}class at extends ke{constructor(t=1,e=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,r,o,0),g("z","y","x",1,-1,n,e,-t,r,o,1),g("x","z","y",1,1,t,n,e,s,r,2),g("x","z","y",1,-1,t,n,-e,s,r,3),g("x","y","z",1,-1,t,e,n,s,o,4),g("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(c),this.setAttribute("position",new _e(l,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(u,2));function g(v,m,f,T,S,M,L,R,C,P,w){const y=M/C,D=L/P,Y=M/2,H=L/2,et=R/2,it=C+1,q=P+1;let $=0,j=0;const yt=new I;for(let Rt=0;Rt<q;Rt++){const ft=Rt*D-H;for(let Vt=0;Vt<it;Vt++){const Jt=Vt*y-Y;yt[v]=Jt*T,yt[m]=ft*S,yt[f]=et,l.push(yt.x,yt.y,yt.z),yt[v]=0,yt[m]=0,yt[f]=R>0?1:-1,h.push(yt.x,yt.y,yt.z),u.push(Vt/C),u.push(1-Rt/P),$+=1}}for(let Rt=0;Rt<P;Rt++)for(let ft=0;ft<C;ft++){const Vt=d+ft+it*Rt,Jt=d+ft+it*(Rt+1),nt=d+(ft+1)+it*(Rt+1),xt=d+(ft+1)+it*Rt;c.push(Vt,Jt,xt),c.push(Jt,nt,xt),j+=6}a.addGroup(p,j,w),p+=j,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new at(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function fs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ze(i){const t={};for(let e=0;e<i.length;e++){const n=fs(i[e]);for(const s in n)t[s]=n[s]}return t}function Su(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function El(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const wu={clone:fs,merge:Ze};var bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends Pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bu,this.fragmentShader=Eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=Su(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Tl extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new I,oc=new Pt,rc=new Pt;class gn extends Tl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,oc,rc),e.subVectors(rc,oc)}setViewOffset(t,e,n,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ts*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*s/c,e-=r.offsetY*n/l,s*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const qi=-90,Zi=1;class Tu extends Re{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gn(qi,Zi,t,e);s.layers=this.layers,this.add(s);const o=new gn(qi,Zi,t,e);o.layers=this.layers,this.add(o);const r=new gn(qi,Zi,t,e);r.layers=this.layers,this.add(r);const a=new gn(qi,Zi,t,e);a.layers=this.layers,this.add(a);const c=new gn(qi,Zi,t,e);c.layers=this.layers,this.add(c);const l=new gn(qi,Zi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,r),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Al extends We{constructor(t,e,n,s,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:cs,super(t,e,n,s,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Au extends Yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Al(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new at(5,5,5),o=new Mn({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:oi});o.uniforms.tEquirect.value=e;const r=new A(s,o),a=e.minFilter;return e.minFilter===Mi&&(e.minFilter=vn),new Tu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,s);t.setRenderTarget(o)}}class Sa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new kt(t),this.density=e}clone(){return new Sa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Cl extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Rl extends We{constructor(t=null,e=1,n=1,s,o,r,a,c,l=De,h=De,u,d){super(null,r,a,c,l,h,s,o,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ac extends hn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ki=new fe,cc=new fe,io=[],lc=new Ci,Cu=new fe,Ss=new A,ws=new Ri;class Ru extends A{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ac(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Cu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ci),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),lc.copy(t.boundingBox).applyMatrix4(Ki),this.boundingBox.union(lc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ki),ws.copy(t.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(ws)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,o=n.length+1,r=t*o+1;for(let a=0;a<n.length;a++)n[a]=s[r+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ws.copy(this.boundingSphere),ws.applyMatrix4(n),t.ray.intersectsSphere(ws)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,Ki),cc.multiplyMatrices(n,Ki),Ss.matrixWorld=cc,Ss.raycast(t,io);for(let r=0,a=io.length;r<a;r++){const c=io[r];c.instanceId=o,c.object=this,e.push(c)}io.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ac(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Rl(new Float32Array(s*this.count),s,this.count,_a,Pn));const o=this.morphTexture.source.data.data;let r=0;for(let l=0;l<n.length;l++)r+=n[l];const a=this.geometry.morphTargetsRelative?1:1-r,c=s*t;o[c]=a,o.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const ar=new I,Pu=new I,Du=new ee;class ni{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ar.subVectors(n,e).cross(Pu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ar),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Du.getNormalMatrix(t),s=this.coplanarPoint(ar).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Ri,so=new I;class wa{constructor(t=new ni,e=new ni,n=new ni,s=new ni,o=new ni,r=new ni){this.planes=[t,e,n,s,o,r]}set(t,e,n,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Gn){const n=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],T=s[13],S=s[14],M=s[15];if(n[0].setComponents(c-o,d-l,m-p,M-f).normalize(),n[1].setComponents(c+o,d+l,m+p,M+f).normalize(),n[2].setComponents(c+r,d+h,m+g,M+T).normalize(),n[3].setComponents(c-r,d-h,m-g,M-T).normalize(),n[4].setComponents(c-a,d-u,m-v,M-S).normalize(),e===Gn)n[5].setComponents(c+a,d+u,m+v,M+S).normalize();else if(e===Co)n[5].setComponents(a,u,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(so.x=s.normal.x>0?t.max.x:t.min.x,so.y=s.normal.y>0?t.max.y:t.min.y,so.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(so)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Pl extends Pi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Po=new I,Do=new I,hc=new fe,bs=new Uo,oo=new Ri,cr=new I,uc=new I;class Lu extends Re{constructor(t=new ke,e=new Pl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)Po.fromBufferAttribute(e,s-1),Do.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Po.distanceTo(Do);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oo.copy(n.boundingSphere),oo.applyMatrix4(s),oo.radius+=o,t.ray.intersectsSphere(oo)===!1)return;hc.copy(s).invert(),bs.copy(t.ray).applyMatrix4(hc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=l){const f=h.getX(v),T=h.getX(v+1),S=ro(this,t,bs,c,f,T);S&&e.push(S)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(p),f=ro(this,t,bs,c,v,m);f&&e.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=l){const f=ro(this,t,bs,c,v,v+1);f&&e.push(f)}if(this.isLineLoop){const v=ro(this,t,bs,c,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function ro(i,t,e,n,s,o){const r=i.geometry.attributes.position;if(Po.fromBufferAttribute(r,s),Do.fromBufferAttribute(r,o),e.distanceSqToSegment(Po,Do,cr,uc)>n)return;cr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(cr);if(!(c<t.near||c>t.far))return{distance:c,point:uc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const dc=new I,fc=new I;class Iu extends Lu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)dc.fromBufferAttribute(e,s),fc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+dc.distanceTo(fc);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Dl extends Pi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pc=new fe,aa=new Uo,ao=new Ri,co=new I;class Uu extends Re{constructor(t=new ke,e=new Dl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(s),ao.radius+=o,t.ray.intersectsSphere(ao)===!1)return;pc.copy(s).invert(),aa.copy(t.ray).applyMatrix4(pc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,r.start),p=Math.min(l.count,r.start+r.count);for(let g=d,v=p;g<v;g++){const m=l.getX(g);co.fromBufferAttribute(u,m),mc(co,m,c,s,t,e,this)}}else{const d=Math.max(0,r.start),p=Math.min(u.count,r.start+r.count);for(let g=d,v=p;g<v;g++)co.fromBufferAttribute(u,g),mc(co,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function mc(i,t,e,n,s,o,r){const a=aa.distanceSqToPoint(i);if(a<e){const c=new I;aa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class jt extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}class zs extends We{constructor(t,e,n,s,o,r,a,c,l){super(t,e,n,s,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ll extends We{constructor(t,e,n,s,o,r,a,c,l,h=ss){if(h!==ss&&h!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ss&&(n=yi),n===void 0&&h===us&&(n=hs),super(null,s,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:De,this.minFilter=c!==void 0?c:De,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-r,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===r)return s/(o-1);const h=n[s],d=n[s+1]-h,p=(r-h)/d;return(s+p)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),c=e||(r.isVector2?new Pt:new I);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,s=[],o=[],r=[],a=new I,c=new fe;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new I)}o[0]=new I,r[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let p=1;p<=t;p++){if(o[p]=o[p-1].clone(),r[p]=r[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ie(s[p-1].dot(s[p]),-1,1));o[p].applyMatrix4(c.makeRotationAxis(a,g))}r[p].crossVectors(s[p],o[p])}if(e===!0){let p=Math.acos(ie(o[0].dot(o[t]),-1,1));p/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(p=-p);for(let g=1;g<=t;g++)o[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),r[g].crossVectors(s[g],o[g])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ba extends Dn{constructor(t=0,e=0,n=1,s=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Pt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Nu extends ba{constructor(t,e,n,s,o,r){super(t,e,n,n,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Ea(){let i=0,t=0,e=0,n=0;function s(o,r,a,c){i=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){s(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,u){let d=(r-o)/l-(a-o)/(l+h)+(a-r)/h,p=(a-r)/h-(c-r)/(h+u)+(c-a)/u;d*=h,p*=h,s(r,a,d,p)},calc:function(o){const r=o*o,a=r*o;return i+t*o+e*r+n*a}}}const lo=new I,lr=new Ea,hr=new Ea,ur=new Ea;class Fu extends Dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%o]:(lo.subVectors(s[0],s[1]).add(s[0]),l=lo);const u=s[a%o],d=s[(a+1)%o];if(this.closed||a+2<o?h=s[(a+2)%o]:(lo.subVectors(s[o-1],s[o-2]).add(s[o-1]),h=lo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),lr.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,v,m),hr.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,v,m),ur.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(lr.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),hr.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),ur.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(lr.calc(c),hr.calc(c),ur.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function gc(i,t,e,n,s){const o=(n-t)*.5,r=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*i+e}function Ou(i,t){const e=1-i;return e*e*t}function zu(i,t){return 2*(1-i)*i*t}function Bu(i,t){return i*i*t}function Cs(i,t,e,n){return Ou(i,t)+zu(i,e)+Bu(i,n)}function ku(i,t){const e=1-i;return e*e*e*t}function Hu(i,t){const e=1-i;return 3*e*e*i*t}function Gu(i,t){return 3*(1-i)*i*i*t}function Vu(i,t){return i*i*i*t}function Rs(i,t,e,n,s){return ku(i,t)+Hu(i,e)+Gu(i,n)+Vu(i,s)}class Il extends Dn{constructor(t=new Pt,e=new Pt,n=new Pt,s=new Pt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Pt){const n=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Rs(t,s.x,o.x,r.x,a.x),Rs(t,s.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wu extends Dn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Rs(t,s.x,o.x,r.x,a.x),Rs(t,s.y,o.y,r.y,a.y),Rs(t,s.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ul extends Dn{constructor(t=new Pt,e=new Pt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Pt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Pt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xu extends Dn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nl extends Dn{constructor(t=new Pt,e=new Pt,n=new Pt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Pt){const n=e,s=this.v0,o=this.v1,r=this.v2;return n.set(Cs(t,s.x,o.x,r.x),Cs(t,s.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yu extends Dn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,o=this.v1,r=this.v2;return n.set(Cs(t,s.x,o.x,r.x),Cs(t,s.y,o.y,r.y),Cs(t,s.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fl extends Dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Pt){const n=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,c=s[r===0?r:r-1],l=s[r],h=s[r>s.length-2?s.length-1:r+1],u=s[r>s.length-3?s.length-1:r+2];return n.set(gc(a,c.x,l.x,h.x,u.x),gc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Pt().fromArray(s))}return this}}var ca=Object.freeze({__proto__:null,ArcCurve:Nu,CatmullRomCurve3:Fu,CubicBezierCurve:Il,CubicBezierCurve3:Wu,EllipseCurve:ba,LineCurve:Ul,LineCurve3:Xu,QuadraticBezierCurve:Nl,QuadraticBezierCurve3:Yu,SplineCurve:Fl});class qu extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ca[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const r=s[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const r=o[s],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ca[s.type]().fromJSON(s))}return this}}class la extends qu{constructor(t){super(),this.type="Path",this.currentPoint=new Pt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ul(this.currentPoint.clone(),new Pt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new Nl(this.currentPoint.clone(),new Pt(t,e),new Pt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,r){const a=new Il(this.currentPoint.clone(),new Pt(t,e),new Pt(n,s),new Pt(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Fl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,o,r),this}absarc(t,e,n,s,o,r){return this.absellipse(t,e,n,n,s,o,r),this}ellipse(t,e,n,s,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,o,r,a,c),this}absellipse(t,e,n,s,o,r,a,c){const l=new ba(t,e,n,s,o,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ta extends ke{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new I,h=new Pt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const p=n+u/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new _e(r,3)),this.setAttribute("normal",new _e(a,3)),this.setAttribute("uv",new _e(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ta(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Qt extends ke{constructor(t=1,e=1,n=1,s=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),o=Math.floor(o);const h=[],u=[],d=[],p=[];let g=0;const v=[],m=n/2;let f=0;T(),r===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new _e(u,3)),this.setAttribute("normal",new _e(d,3)),this.setAttribute("uv",new _e(p,2));function T(){const M=new I,L=new I;let R=0;const C=(e-t)/n;for(let P=0;P<=o;P++){const w=[],y=P/o,D=y*(e-t)+t;for(let Y=0;Y<=s;Y++){const H=Y/s,et=H*c+a,it=Math.sin(et),q=Math.cos(et);L.x=D*it,L.y=-y*n+m,L.z=D*q,u.push(L.x,L.y,L.z),M.set(it,C,q).normalize(),d.push(M.x,M.y,M.z),p.push(H,1-y),w.push(g++)}v.push(w)}for(let P=0;P<s;P++)for(let w=0;w<o;w++){const y=v[w][P],D=v[w+1][P],Y=v[w+1][P+1],H=v[w][P+1];(t>0||w!==0)&&(h.push(y,D,H),R+=3),(e>0||w!==o-1)&&(h.push(D,Y,H),R+=3)}l.addGroup(f,R,0),f+=R}function S(M){const L=g,R=new Pt,C=new I;let P=0;const w=M===!0?t:e,y=M===!0?1:-1;for(let Y=1;Y<=s;Y++)u.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;const D=g;for(let Y=0;Y<=s;Y++){const et=Y/s*c+a,it=Math.cos(et),q=Math.sin(et);C.x=w*q,C.y=m*y,C.z=w*it,u.push(C.x,C.y,C.z),d.push(0,y,0),R.x=it*.5+.5,R.y=q*.5*y+.5,p.push(R.x,R.y),g++}for(let Y=0;Y<s;Y++){const H=L+Y,et=D+Y;M===!0?h.push(et,et+1,H):h.push(et+1,et,H),P+=3}l.addGroup(f,P,M===!0?1:2),f+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ce extends Qt{constructor(t=1,e=1,n=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Ce(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class No extends ke{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const o=[],r=[];a(s),l(n),h(),this.setAttribute("position",new _e(o,3)),this.setAttribute("normal",new _e(o.slice(),3)),this.setAttribute("uv",new _e(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(T){const S=new I,M=new I,L=new I;for(let R=0;R<e.length;R+=3)p(e[R+0],S),p(e[R+1],M),p(e[R+2],L),c(S,M,L,T)}function c(T,S,M,L){const R=L+1,C=[];for(let P=0;P<=R;P++){C[P]=[];const w=T.clone().lerp(M,P/R),y=S.clone().lerp(M,P/R),D=R-P;for(let Y=0;Y<=D;Y++)Y===0&&P===R?C[P][Y]=w:C[P][Y]=w.clone().lerp(y,Y/D)}for(let P=0;P<R;P++)for(let w=0;w<2*(R-P)-1;w++){const y=Math.floor(w/2);w%2===0?(d(C[P][y+1]),d(C[P+1][y]),d(C[P][y])):(d(C[P][y+1]),d(C[P+1][y+1]),d(C[P+1][y]))}}function l(T){const S=new I;for(let M=0;M<o.length;M+=3)S.x=o[M+0],S.y=o[M+1],S.z=o[M+2],S.normalize().multiplyScalar(T),o[M+0]=S.x,o[M+1]=S.y,o[M+2]=S.z}function h(){const T=new I;for(let S=0;S<o.length;S+=3){T.x=o[S+0],T.y=o[S+1],T.z=o[S+2];const M=m(T)/2/Math.PI+.5,L=f(T)/Math.PI+.5;r.push(M,1-L)}g(),u()}function u(){for(let T=0;T<r.length;T+=6){const S=r[T+0],M=r[T+2],L=r[T+4],R=Math.max(S,M,L),C=Math.min(S,M,L);R>.9&&C<.1&&(S<.2&&(r[T+0]+=1),M<.2&&(r[T+2]+=1),L<.2&&(r[T+4]+=1))}}function d(T){o.push(T.x,T.y,T.z)}function p(T,S){const M=T*3;S.x=t[M+0],S.y=t[M+1],S.z=t[M+2]}function g(){const T=new I,S=new I,M=new I,L=new I,R=new Pt,C=new Pt,P=new Pt;for(let w=0,y=0;w<o.length;w+=9,y+=6){T.set(o[w+0],o[w+1],o[w+2]),S.set(o[w+3],o[w+4],o[w+5]),M.set(o[w+6],o[w+7],o[w+8]),R.set(r[y+0],r[y+1]),C.set(r[y+2],r[y+3]),P.set(r[y+4],r[y+5]),L.copy(T).add(S).add(M).divideScalar(3);const D=m(L);v(R,y+0,T,D),v(C,y+2,S,D),v(P,y+4,M,D)}}function v(T,S,M,L){L<0&&T.x===1&&(r[S]=T.x-1),M.x===0&&M.z===0&&(r[S]=L/2/Math.PI+.5)}function m(T){return Math.atan2(T.z,-T.x)}function f(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new No(t.vertices,t.indices,t.radius,t.details)}}class Aa extends No{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Aa(t.radius,t.detail)}}class rs extends la{constructor(t){super(t),this.uuid=Ai(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new la().fromJSON(s))}return this}}const Zu={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let o=Ol(i,0,s,e,!0);const r=[];if(!o||o.next===o.prev)return r;let a,c,l,h,u,d,p;if(n&&(o=Qu(i,t,o,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return Us(o,r,e,a,c,p,0),r}};function Ol(i,t,e,n,s){let o,r;if(s===hd(i,t,e,n)>0)for(o=t;o<e;o+=n)r=_c(o,i[o],i[o+1],r);else for(o=e-n;o>=t;o-=n)r=_c(o,i[o],i[o+1],r);return r&&Fo(r,r.next)&&(Fs(r),r=r.next),r}function bi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Fo(e,e.next)||ye(e.prev,e,e.next)===0)){if(Fs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Us(i,t,e,n,s,o,r){if(!i)return;!r&&o&&sd(i,n,s,o);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,o?ju(i,n,s,o):Ku(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Fs(i),i=l.next,a=l.next;continue}if(i=l,i===a){r?r===1?(i=$u(bi(i),t,e),Us(i,t,e,n,s,o,2)):r===2&&Ju(i,t,e,n,s,o):Us(bi(i),t,e,n,s,o,1);break}}}function Ku(i){const t=i.prev,e=i,n=i.next;if(ye(t,e,n)>=0)return!1;const s=t.x,o=e.x,r=n.x,a=t.y,c=e.y,l=n.y,h=s<o?s<r?s:r:o<r?o:r,u=a<c?a<l?a:l:c<l?c:l,d=s>o?s>r?s:r:o>r?o:r,p=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&ts(s,a,o,c,r,l,g.x,g.y)&&ye(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ju(i,t,e,n){const s=i.prev,o=i,r=i.next;if(ye(s,o,r)>=0)return!1;const a=s.x,c=o.x,l=r.x,h=s.y,u=o.y,d=r.y,p=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,v=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,f=ha(p,g,t,e,n),T=ha(v,m,t,e,n);let S=i.prevZ,M=i.nextZ;for(;S&&S.z>=f&&M&&M.z<=T;){if(S.x>=p&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&ts(a,h,c,u,l,d,S.x,S.y)&&ye(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=p&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==r&&ts(a,h,c,u,l,d,M.x,M.y)&&ye(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=f;){if(S.x>=p&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&ts(a,h,c,u,l,d,S.x,S.y)&&ye(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=T;){if(M.x>=p&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==r&&ts(a,h,c,u,l,d,M.x,M.y)&&ye(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function $u(i,t,e){let n=i;do{const s=n.prev,o=n.next.next;!Fo(s,o)&&zl(s,n,n.next,o)&&Ns(s,o)&&Ns(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),Fs(n),Fs(n.next),n=i=o),n=n.next}while(n!==i);return bi(n)}function Ju(i,t,e,n,s,o){let r=i;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&ad(r,a)){let c=Bl(r,a);r=bi(r,r.next),c=bi(c,c.next),Us(r,t,e,n,s,o,0),Us(c,t,e,n,s,o,0);return}a=a.next}r=r.next}while(r!==i)}function Qu(i,t,e,n){const s=[];let o,r,a,c,l;for(o=0,r=t.length;o<r;o++)a=t[o]*n,c=o<r-1?t[o+1]*n:i.length,l=Ol(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(rd(l));for(s.sort(td),o=0;o<s.length;o++)e=ed(s[o],e);return e}function td(i,t){return i.x-t.x}function ed(i,t){const e=nd(i,t);if(!e)return t;const n=Bl(e,i);return bi(n,n.next),bi(e,e.next)}function nd(i,t){let e=t,n=-1/0,s;const o=i.x,r=i.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const d=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=o&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===o))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do o>=e.x&&e.x>=c&&o!==e.x&&ts(r<l?o:n,r,c,l,r<l?n:o,r,e.x,e.y)&&(u=Math.abs(r-e.y)/(o-e.x),Ns(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&id(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function id(i,t){return ye(i.prev,i,t.prev)<0&&ye(t.next,i,i.next)<0}function sd(i,t,e,n){let s=i;do s.z===0&&(s.z=ha(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,od(s)}function od(i){let t,e,n,s,o,r,a,c,l=1;do{for(e=i,i=null,o=null,r=0;e;){for(r++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;e=n}o.nextZ=null,l*=2}while(r>1);return i}function ha(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function rd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ts(i,t,e,n,s,o,r,a){return(s-r)*(t-a)>=(i-r)*(o-a)&&(i-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(s-r)*(n-a)}function ad(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!cd(i,t)&&(Ns(i,t)&&Ns(t,i)&&ld(i,t)&&(ye(i.prev,i,t.prev)||ye(i,t.prev,t))||Fo(i,t)&&ye(i.prev,i,i.next)>0&&ye(t.prev,t,t.next)>0)}function ye(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Fo(i,t){return i.x===t.x&&i.y===t.y}function zl(i,t,e,n){const s=uo(ye(i,t,e)),o=uo(ye(i,t,n)),r=uo(ye(e,n,i)),a=uo(ye(e,n,t));return!!(s!==o&&r!==a||s===0&&ho(i,e,t)||o===0&&ho(i,n,t)||r===0&&ho(e,i,n)||a===0&&ho(e,t,n))}function ho(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function uo(i){return i>0?1:i<0?-1:0}function cd(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&zl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ns(i,t){return ye(i.prev,i,i.next)<0?ye(i,t,i.next)>=0&&ye(i,i.prev,t)>=0:ye(i,t,i.prev)<0||ye(i,i.next,t)<0}function ld(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,o=(i.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Bl(i,t){const e=new ua(i.i,i.x,i.y),n=new ua(t.i,t.x,t.y),s=i.next,o=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function _c(i,t,e,n){const s=new ua(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Fs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ua(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function hd(i,t,e,n){let s=0;for(let o=t,r=e-n;o<e;o+=n)s+=(i[r]-i[o])*(i[o+1]+i[r+1]),r=o;return s}class Ps{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return Ps.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];vc(t),xc(n,t);let r=t.length;e.forEach(vc);for(let c=0;c<e.length;c++)s.push(r),r+=e[c].length,xc(n,e[c]);const a=Zu.triangulate(n,s);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}}function vc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function xc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class _n extends ke{constructor(t=new rs([new Pt(.5,.5),new Pt(-.5,.5),new Pt(-.5,-.5),new Pt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];r(l)}this.setAttribute("position",new _e(s,3)),this.setAttribute("uv",new _e(o,2)),this.computeVertexNormals();function r(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:ud;let S,M=!1,L,R,C,P;f&&(S=f.getSpacedPoints(h),M=!0,d=!1,L=f.computeFrenetFrames(h,!1),R=new I,C=new I,P=new I),d||(m=0,p=0,g=0,v=0);const w=a.extractPoints(l);let y=w.shape;const D=w.holes;if(!Ps.isClockWise(y)){y=y.reverse();for(let lt=0,_t=D.length;lt<_t;lt++){const E=D[lt];Ps.isClockWise(E)&&(D[lt]=E.reverse())}}const H=Ps.triangulateShape(y,D),et=y;for(let lt=0,_t=D.length;lt<_t;lt++){const E=D[lt];y=y.concat(E)}function it(lt,_t,E){return _t||console.error("THREE.ExtrudeGeometry: vec does not exist"),lt.clone().addScaledVector(_t,E)}const q=y.length,$=H.length;function j(lt,_t,E){let It,pt,mt;const F=lt.x-_t.x,st=lt.y-_t.y,G=E.x-lt.x,x=E.y-lt.y,_=F*F+st*st,N=F*x-st*G;if(Math.abs(N)>Number.EPSILON){const B=Math.sqrt(_),X=Math.sqrt(G*G+x*x),W=_t.x-st/B,gt=_t.y+F/B,z=E.x-x/X,V=E.y+G/X,ct=((z-W)*x-(V-gt)*G)/(F*x-st*G);It=W+F*ct-lt.x,pt=gt+st*ct-lt.y;const Q=It*It+pt*pt;if(Q<=2)return new Pt(It,pt);mt=Math.sqrt(Q/2)}else{let B=!1;F>Number.EPSILON?G>Number.EPSILON&&(B=!0):F<-Number.EPSILON?G<-Number.EPSILON&&(B=!0):Math.sign(st)===Math.sign(x)&&(B=!0),B?(It=-st,pt=F,mt=Math.sqrt(_)):(It=F,pt=st,mt=Math.sqrt(_/2))}return new Pt(It/mt,pt/mt)}const yt=[];for(let lt=0,_t=et.length,E=_t-1,It=lt+1;lt<_t;lt++,E++,It++)E===_t&&(E=0),It===_t&&(It=0),yt[lt]=j(et[lt],et[E],et[It]);const Rt=[];let ft,Vt=yt.concat();for(let lt=0,_t=D.length;lt<_t;lt++){const E=D[lt];ft=[];for(let It=0,pt=E.length,mt=pt-1,F=It+1;It<pt;It++,mt++,F++)mt===pt&&(mt=0),F===pt&&(F=0),ft[It]=j(E[It],E[mt],E[F]);Rt.push(ft),Vt=Vt.concat(ft)}for(let lt=0;lt<m;lt++){const _t=lt/m,E=p*Math.cos(_t*Math.PI/2),It=g*Math.sin(_t*Math.PI/2)+v;for(let pt=0,mt=et.length;pt<mt;pt++){const F=it(et[pt],yt[pt],It);ut(F.x,F.y,-E)}for(let pt=0,mt=D.length;pt<mt;pt++){const F=D[pt];ft=Rt[pt];for(let st=0,G=F.length;st<G;st++){const x=it(F[st],ft[st],It);ut(x.x,x.y,-E)}}}const Jt=g+v;for(let lt=0;lt<q;lt++){const _t=d?it(y[lt],Vt[lt],Jt):y[lt];M?(C.copy(L.normals[0]).multiplyScalar(_t.x),R.copy(L.binormals[0]).multiplyScalar(_t.y),P.copy(S[0]).add(C).add(R),ut(P.x,P.y,P.z)):ut(_t.x,_t.y,0)}for(let lt=1;lt<=h;lt++)for(let _t=0;_t<q;_t++){const E=d?it(y[_t],Vt[_t],Jt):y[_t];M?(C.copy(L.normals[lt]).multiplyScalar(E.x),R.copy(L.binormals[lt]).multiplyScalar(E.y),P.copy(S[lt]).add(C).add(R),ut(P.x,P.y,P.z)):ut(E.x,E.y,u/h*lt)}for(let lt=m-1;lt>=0;lt--){const _t=lt/m,E=p*Math.cos(_t*Math.PI/2),It=g*Math.sin(_t*Math.PI/2)+v;for(let pt=0,mt=et.length;pt<mt;pt++){const F=it(et[pt],yt[pt],It);ut(F.x,F.y,u+E)}for(let pt=0,mt=D.length;pt<mt;pt++){const F=D[pt];ft=Rt[pt];for(let st=0,G=F.length;st<G;st++){const x=it(F[st],ft[st],It);M?ut(x.x,x.y+S[h-1].y,S[h-1].x+E):ut(x.x,x.y,u+E)}}}nt(),xt();function nt(){const lt=s.length/3;if(d){let _t=0,E=q*_t;for(let It=0;It<$;It++){const pt=H[It];Tt(pt[2]+E,pt[1]+E,pt[0]+E)}_t=h+m*2,E=q*_t;for(let It=0;It<$;It++){const pt=H[It];Tt(pt[0]+E,pt[1]+E,pt[2]+E)}}else{for(let _t=0;_t<$;_t++){const E=H[_t];Tt(E[2],E[1],E[0])}for(let _t=0;_t<$;_t++){const E=H[_t];Tt(E[0]+q*h,E[1]+q*h,E[2]+q*h)}}n.addGroup(lt,s.length/3-lt,0)}function xt(){const lt=s.length/3;let _t=0;ht(et,_t),_t+=et.length;for(let E=0,It=D.length;E<It;E++){const pt=D[E];ht(pt,_t),_t+=pt.length}n.addGroup(lt,s.length/3-lt,1)}function ht(lt,_t){let E=lt.length;for(;--E>=0;){const It=E;let pt=E-1;pt<0&&(pt=lt.length-1);for(let mt=0,F=h+m*2;mt<F;mt++){const st=q*mt,G=q*(mt+1),x=_t+It+st,_=_t+pt+st,N=_t+pt+G,B=_t+It+G;Lt(x,_,N,B)}}}function ut(lt,_t,E){c.push(lt),c.push(_t),c.push(E)}function Tt(lt,_t,E){Dt(lt),Dt(_t),Dt(E);const It=s.length/3,pt=T.generateTopUV(n,s,It-3,It-2,It-1);qt(pt[0]),qt(pt[1]),qt(pt[2])}function Lt(lt,_t,E,It){Dt(lt),Dt(_t),Dt(It),Dt(_t),Dt(E),Dt(It);const pt=s.length/3,mt=T.generateSideWallUV(n,s,pt-6,pt-3,pt-2,pt-1);qt(mt[0]),qt(mt[1]),qt(mt[3]),qt(mt[1]),qt(mt[2]),qt(mt[3])}function Dt(lt){s.push(c[lt*3+0]),s.push(c[lt*3+1]),s.push(c[lt*3+2])}function qt(lt){o.push(lt.x),o.push(lt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return dd(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,r=t.shapes.length;o<r;o++){const a=e[t.shapes[o]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ca[s.type]().fromJSON(s)),new _n(n,t.options)}}const ud={generateTopUV:function(i,t,e,n,s){const o=t[e*3],r=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new Pt(o,r),new Pt(a,c),new Pt(l,h)]},generateSideWallUV:function(i,t,e,n,s,o){const r=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],p=t[s*3+1],g=t[s*3+2],v=t[o*3],m=t[o*3+1],f=t[o*3+2];return Math.abs(a-h)<Math.abs(r-l)?[new Pt(r,1-c),new Pt(l,1-u),new Pt(d,1-g),new Pt(v,1-f)]:[new Pt(a,1-c),new Pt(h,1-u),new Pt(p,1-g),new Pt(m,1-f)]}};function dd(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];e.shapes.push(o.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class si extends No{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new si(t.radius,t.detail)}}class Ne extends ke{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,p=[],g=[],v=[],m=[];for(let f=0;f<h;f++){const T=f*d-r;for(let S=0;S<l;S++){const M=S*u-o;g.push(M,-T,0),v.push(0,0,1),m.push(S/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let T=0;T<a;T++){const S=T+l*f,M=T+l*(f+1),L=T+1+l*(f+1),R=T+1+l*f;p.push(S,M,R),p.push(M,L,R)}this.setIndex(p),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.widthSegments,t.heightSegments)}}class ln extends ke{constructor(t=1,e=32,n=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new I,d=new I,p=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){const T=[],S=f/n;let M=0;f===0&&r===0?M=.5/e:f===n&&c===Math.PI&&(M=-.5/e);for(let L=0;L<=e;L++){const R=L/e;u.x=-t*Math.cos(s+R*o)*Math.sin(r+S*a),u.y=t*Math.cos(r+S*a),u.z=t*Math.sin(s+R*o)*Math.sin(r+S*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(R+M,1-S),T.push(l++)}h.push(T)}for(let f=0;f<n;f++)for(let T=0;T<e;T++){const S=h[f][T+1],M=h[f][T],L=h[f+1][T],R=h[f+1][T+1];(f!==0||r>0)&&p.push(S,M,R),(f!==n-1||c<Math.PI)&&p.push(M,L,R)}this.setIndex(p),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ai extends ke{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const r=[],a=[],c=[],l=[],h=new I,u=new I,d=new I;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const v=g/s*o,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,T=(s+1)*p+g;r.push(v,m,T),r.push(m,f,T)}this.setIndex(r),this.setAttribute("position",new _e(a,3)),this.setAttribute("normal",new _e(c,3)),this.setAttribute("uv",new _e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Di extends Pi{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new kt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gl,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class kl extends Pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fd extends Pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Hl extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class pd extends Hl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const dr=new fe,Mc=new I,yc=new I;class md{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wa,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Mc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mc),yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yc),e.updateMatrixWorld(),dr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ca extends Tl{constructor(t=-1,e=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class gd extends md{constructor(){super(new Ca(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gl extends Hl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new gd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _d extends gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class vd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Sc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Sc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Sc(){return performance.now()}class wc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ie(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ie(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class xd extends Ti{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function bc(i,t,e,n){const s=Md(n);switch(e){case ll:return i*t;case ul:return i*t;case dl:return i*t*2;case _a:return i*t/s.components*s.byteLength;case va:return i*t/s.components*s.byteLength;case fl:return i*t*2/s.components*s.byteLength;case xa:return i*t*2/s.components*s.byteLength;case hl:return i*t*3/s.components*s.byteLength;case xn:return i*t*4/s.components*s.byteLength;case Ma:return i*t*4/s.components*s.byteLength;case Mo:case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case So:case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fr:case zr:return Math.max(i,16)*Math.max(t,8)/4;case Nr:case Or:return Math.max(i,8)*Math.max(t,8)/2;case Br:case kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Yr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qr:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Zr:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Kr:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case jr:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case $r:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Jr:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qr:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ta:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ea:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case bo:case na:case ia:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pl:case sa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case oa:case ra:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Md(i){switch(i){case Xn:case rl:return{byteLength:1,components:1};case Ls:case al:case Si:return{byteLength:2,components:1};case ma:case ga:return{byteLength:2,components:4};case yi:case pa:case Pn:return{byteLength:4,components:1};case cl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fa);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Vl(){let i=null,t=!1,e=null,n=null;function s(o,r){e(o,r),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function yd(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:o,update:r}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ud=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Fd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Xd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_f=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ff=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Of=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$f=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,op=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,up=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_p=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Op=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ne={alphahash_fragment:Sd,alphahash_pars_fragment:wd,alphamap_fragment:bd,alphamap_pars_fragment:Ed,alphatest_fragment:Td,alphatest_pars_fragment:Ad,aomap_fragment:Cd,aomap_pars_fragment:Rd,batching_pars_vertex:Pd,batching_vertex:Dd,begin_vertex:Ld,beginnormal_vertex:Id,bsdfs:Ud,iridescence_fragment:Nd,bumpmap_pars_fragment:Fd,clipping_planes_fragment:Od,clipping_planes_pars_fragment:zd,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:kd,color_fragment:Hd,color_pars_fragment:Gd,color_pars_vertex:Vd,color_vertex:Wd,common:Xd,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:qd,displacementmap_pars_vertex:Zd,displacementmap_vertex:Kd,emissivemap_fragment:jd,emissivemap_pars_fragment:$d,colorspace_fragment:Jd,colorspace_pars_fragment:Qd,envmap_fragment:tf,envmap_common_pars_fragment:ef,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:mf,envmap_vertex:of,fog_vertex:rf,fog_pars_vertex:af,fog_fragment:cf,fog_pars_fragment:lf,gradientmap_pars_fragment:hf,lightmap_pars_fragment:uf,lights_lambert_fragment:df,lights_lambert_pars_fragment:ff,lights_pars_begin:pf,lights_toon_fragment:gf,lights_toon_pars_fragment:_f,lights_phong_fragment:vf,lights_phong_pars_fragment:xf,lights_physical_fragment:Mf,lights_physical_pars_fragment:yf,lights_fragment_begin:Sf,lights_fragment_maps:wf,lights_fragment_end:bf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:Tf,logdepthbuf_pars_vertex:Af,logdepthbuf_vertex:Cf,map_fragment:Rf,map_pars_fragment:Pf,map_particle_fragment:Df,map_particle_pars_fragment:Lf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Uf,morphinstance_vertex:Nf,morphcolor_vertex:Ff,morphnormal_vertex:Of,morphtarget_pars_vertex:zf,morphtarget_vertex:Bf,normal_fragment_begin:kf,normal_fragment_maps:Hf,normal_pars_fragment:Gf,normal_pars_vertex:Vf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:Yf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:Zf,iridescence_pars_fragment:Kf,opaque_fragment:jf,packing:$f,premultiplied_alpha_fragment:Jf,project_vertex:Qf,dithering_fragment:tp,dithering_pars_fragment:ep,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:sp,shadowmap_pars_vertex:op,shadowmap_vertex:rp,shadowmask_pars_fragment:ap,skinbase_vertex:cp,skinning_pars_vertex:lp,skinning_vertex:hp,skinnormal_vertex:up,specularmap_fragment:dp,specularmap_pars_fragment:fp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:_p,uv_pars_fragment:vp,uv_pars_vertex:xp,uv_vertex:Mp,worldpos_vertex:yp,background_vert:Sp,background_frag:wp,backgroundCube_vert:bp,backgroundCube_frag:Ep,cube_vert:Tp,cube_frag:Ap,depth_vert:Cp,depth_frag:Rp,distanceRGBA_vert:Pp,distanceRGBA_frag:Dp,equirect_vert:Lp,equirect_frag:Ip,linedashed_vert:Up,linedashed_frag:Np,meshbasic_vert:Fp,meshbasic_frag:Op,meshlambert_vert:zp,meshlambert_frag:Bp,meshmatcap_vert:kp,meshmatcap_frag:Hp,meshnormal_vert:Gp,meshnormal_frag:Vp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:Yp,meshphysical_frag:qp,meshtoon_vert:Zp,meshtoon_frag:Kp,points_vert:jp,points_frag:$p,shadow_vert:Jp,shadow_frag:Qp,sprite_vert:tm,sprite_frag:em},Ot={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},Rn={basic:{uniforms:Ze([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:Ze([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new kt(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:Ze([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:Ze([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:Ze([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new kt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:Ze([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:Ze([Ot.points,Ot.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:Ze([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:Ze([Ot.common,Ot.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:Ze([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:Ze([Ot.sprite,Ot.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:Ze([Ot.common,Ot.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:Ze([Ot.lights,Ot.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};Rn.physical={uniforms:Ze([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const fo={r:0,b:0,g:0},pi=new qn,nm=new fe;function im(i,t,e,n,s,o,r){const a=new kt(0);let c=o===!0?0:1,l,h,u=null,d=0,p=null;function g(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?e:t).get(M)),M}function v(S){let M=!1;const L=g(S);L===null?f(a,c):L&&L.isColor&&(f(L,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,M){const L=g(M);L&&(L.isCubeTexture||L.mapping===Io)?(h===void 0&&(h=new A(new at(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:fs(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),pi.copy(M.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=L,h.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(nm.makeRotationFromEuler(pi)),h.material.toneMapped=ae.getTransfer(L.colorSpace)!==ue,(u!==L||d!==L.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=L,d=L.version,p=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):L&&L.isTexture&&(l===void 0&&(l=new A(new Ne(2,2),new Mn({name:"BackgroundMaterial",uniforms:fs(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=L,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ae.getTransfer(L.colorSpace)!==ue,L.matrixAutoUpdate===!0&&L.updateMatrix(),l.material.uniforms.uvTransform.value.copy(L.matrix),(u!==L||d!==L.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=L,d=L.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,M){S.getRGB(fo,El(i)),n.buffers.color.setClear(fo.r,fo.g,fo.b,M,r)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),c=M,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(a,c)},render:v,addToRenderList:m,dispose:T}}function sm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let o=s,r=!1;function a(y,D,Y,H,et){let it=!1;const q=u(H,Y,D);o!==q&&(o=q,l(o.object)),it=p(y,H,Y,et),it&&g(y,H,Y,et),et!==null&&t.update(et,i.ELEMENT_ARRAY_BUFFER),(it||r)&&(r=!1,M(y,D,Y,H),et!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(et).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,D,Y){const H=Y.wireframe===!0;let et=n[y.id];et===void 0&&(et={},n[y.id]=et);let it=et[D.id];it===void 0&&(it={},et[D.id]=it);let q=it[H];return q===void 0&&(q=d(c()),it[H]=q),q}function d(y){const D=[],Y=[],H=[];for(let et=0;et<e;et++)D[et]=0,Y[et]=0,H[et]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:Y,attributeDivisors:H,object:y,attributes:{},index:null}}function p(y,D,Y,H){const et=o.attributes,it=D.attributes;let q=0;const $=Y.getAttributes();for(const j in $)if($[j].location>=0){const Rt=et[j];let ft=it[j];if(ft===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),Rt===void 0||Rt.attribute!==ft||ft&&Rt.data!==ft.data)return!0;q++}return o.attributesNum!==q||o.index!==H}function g(y,D,Y,H){const et={},it=D.attributes;let q=0;const $=Y.getAttributes();for(const j in $)if($[j].location>=0){let Rt=it[j];Rt===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(Rt=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(Rt=y.instanceColor));const ft={};ft.attribute=Rt,Rt&&Rt.data&&(ft.data=Rt.data),et[j]=ft,q++}o.attributes=et,o.attributesNum=q,o.index=H}function v(){const y=o.newAttributes;for(let D=0,Y=y.length;D<Y;D++)y[D]=0}function m(y){f(y,0)}function f(y,D){const Y=o.newAttributes,H=o.enabledAttributes,et=o.attributeDivisors;Y[y]=1,H[y]===0&&(i.enableVertexAttribArray(y),H[y]=1),et[y]!==D&&(i.vertexAttribDivisor(y,D),et[y]=D)}function T(){const y=o.newAttributes,D=o.enabledAttributes;for(let Y=0,H=D.length;Y<H;Y++)D[Y]!==y[Y]&&(i.disableVertexAttribArray(Y),D[Y]=0)}function S(y,D,Y,H,et,it,q){q===!0?i.vertexAttribIPointer(y,D,Y,et,it):i.vertexAttribPointer(y,D,Y,H,et,it)}function M(y,D,Y,H){v();const et=H.attributes,it=Y.getAttributes(),q=D.defaultAttributeValues;for(const $ in it){const j=it[$];if(j.location>=0){let yt=et[$];if(yt===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor)),yt!==void 0){const Rt=yt.normalized,ft=yt.itemSize,Vt=t.get(yt);if(Vt===void 0)continue;const Jt=Vt.buffer,nt=Vt.type,xt=Vt.bytesPerElement,ht=nt===i.INT||nt===i.UNSIGNED_INT||yt.gpuType===pa;if(yt.isInterleavedBufferAttribute){const ut=yt.data,Tt=ut.stride,Lt=yt.offset;if(ut.isInstancedInterleavedBuffer){for(let Dt=0;Dt<j.locationSize;Dt++)f(j.location+Dt,ut.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Dt=0;Dt<j.locationSize;Dt++)m(j.location+Dt);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let Dt=0;Dt<j.locationSize;Dt++)S(j.location+Dt,ft/j.locationSize,nt,Rt,Tt*xt,(Lt+ft/j.locationSize*Dt)*xt,ht)}else{if(yt.isInstancedBufferAttribute){for(let ut=0;ut<j.locationSize;ut++)f(j.location+ut,yt.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let ut=0;ut<j.locationSize;ut++)m(j.location+ut);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let ut=0;ut<j.locationSize;ut++)S(j.location+ut,ft/j.locationSize,nt,Rt,ft*xt,ft/j.locationSize*ut*xt,ht)}}else if(q!==void 0){const Rt=q[$];if(Rt!==void 0)switch(Rt.length){case 2:i.vertexAttrib2fv(j.location,Rt);break;case 3:i.vertexAttrib3fv(j.location,Rt);break;case 4:i.vertexAttrib4fv(j.location,Rt);break;default:i.vertexAttrib1fv(j.location,Rt)}}}}T()}function L(){P();for(const y in n){const D=n[y];for(const Y in D){const H=D[Y];for(const et in H)h(H[et].object),delete H[et];delete D[Y]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const Y in D){const H=D[Y];for(const et in H)h(H[et].object),delete H[et];delete D[Y]}delete n[y.id]}function C(y){for(const D in n){const Y=n[D];if(Y[y.id]===void 0)continue;const H=Y[y.id];for(const et in H)h(H[et].object),delete H[et];delete Y[y.id]}}function P(){w(),r=!0,o!==s&&(o=s,l(o.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function om(i,t,e){let n;function s(l){n=l}function o(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function c(l,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)r(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function rm(i,t,e,n){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(C){return!(C!==xn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const P=C===Si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Xn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Pn&&!P)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:M,vertexTextures:L,maxSamples:R}}function am(i){const t=this;let e=null,n=0,s=!1,o=!1;const r=new ni,a=new ee,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||o&&!m)o?h(null):l();else{const T=o?0:n,S=T*4;let M=f.clippingState||null;c.value=M,M=h(g,d,S,p);for(let L=0;L!==S;++L)M[L]=e[L];f.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const f=p+v*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,M=p;S!==v;++S,M+=4)r.copy(u[S]).applyMatrix4(T,a),r.normal.toArray(m,M),m[M+3]=r.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function cm(i){let t=new WeakMap;function e(r,a){return a===Lr?r.mapping=cs:a===Ir&&(r.mapping=ls),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Lr||a===Ir)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new Au(c.height);return l.fromEquirectangularTexture(i,r),t.set(r,l),r.addEventListener("dispose",s),e(l.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}const es=4,Ec=[.125,.215,.35,.446,.526,.582],xi=20,fr=new Ca,Tc=new kt;let pr=null,mr=0,gr=0,_r=!1;const gi=(1+Math.sqrt(5))/2,ji=1/gi,Ac=[new I(-gi,ji,0),new I(gi,ji,0),new I(-ji,0,gi),new I(ji,0,gi),new I(0,gi,-ji),new I(0,gi,ji),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Cc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){pr=this._renderer.getRenderTarget(),mr=this._renderer.getActiveCubeFace(),gr=this._renderer.getActiveMipmapLevel(),_r=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(pr,mr,gr),this._renderer.xr.enabled=_r,t.scissorTest=!1,po(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cs||t.mapping===ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),pr=this._renderer.getRenderTarget(),mr=this._renderer.getActiveCubeFace(),gr=this._renderer.getActiveMipmapLevel(),_r=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Si,format:xn,colorSpace:ds,depthBuffer:!1},s=Rc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rc(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lm(o)),this._blurMaterial=hm(o,t,e)}return s}_compileMaterial(t){const e=new A(this._lodPlanes[0],t);this._renderer.compile(e,fr)}_sceneToCubeUV(t,e,n,s){const a=new gn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Tc),h.toneMapping=ri,h.autoClear=!1;const p=new Os({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),g=new A(new at,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Tc),v=!0);for(let f=0;f<6;f++){const T=f%3;T===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):T===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const S=this._cubeSize;po(s,T*S,f>2?S:0,S,S),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===cs||t.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pc());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new A(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;po(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,fr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Ac[(s-o-1)%Ac.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,s,"latitudinal",o),this._halfBlur(r,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new A(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*xi-1),v=o/g,m=isFinite(o)?1+Math.floor(h*v):xi;m>xi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xi}`);const f=[];let T=0;for(let C=0;C<xi;++C){const P=C/v,w=Math.exp(-P*P/2);f.push(w),C===0?T+=w:C<m&&(T+=2*w)}for(let C=0;C<f.length;C++)f[C]=f[C]/T;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const M=this._sizeLods[s],L=3*M*(s>S-es?s-S+es:0),R=4*(this._cubeSize-M);po(e,L,R,3*M,2*M),c.setRenderTarget(e),c.render(u,fr)}}function lm(i){const t=[],e=[],n=[];let s=i;const o=i-es+1+Ec.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let c=1/a;r>i-es?c=Ec[r-i+es-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,m=2,f=1,T=new Float32Array(v*g*p),S=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let R=0;R<p;R++){const C=R%3*2/3-1,P=R>2?0:-1,w=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];T.set(w,v*g*R),S.set(d,m*g*R);const y=[R,R,R,R,R,R];M.set(y,f*g*R)}const L=new ke;L.setAttribute("position",new hn(T,v)),L.setAttribute("uv",new hn(S,m)),L.setAttribute("faceIndex",new hn(M,f)),t.push(L),s>es&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Rc(i,t,e){const n=new Yn(i,t,e);return n.texture.mapping=Io,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function po(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function hm(i,t,e){const n=new Float32Array(xi),s=new I(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Pc(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Dc(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function um(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Lr||c===Ir,h=c===cs||c===ls;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Cc(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Cc(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function dm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ji("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function fm(i,t,e,n){const s={},o=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",r),delete s[d.id];const p=o.get(d);p&&(t.remove(p),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const p in d)t.update(d[p],i.ARRAY_BUFFER)}function l(u){const d=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const T=p.array;v=p.version;for(let S=0,M=T.length;S<M;S+=3){const L=T[S+0],R=T[S+1],C=T[S+2];d.push(L,R,R,C,C,L)}}else if(g!==void 0){const T=g.array;v=g.version;for(let S=0,M=T.length/3-1;S<M;S+=3){const L=S+0,R=S+1,C=S+2;d.push(L,R,R,C,C,L)}}else return;const m=new(vl(d)?bl:wl)(d,1);m.version=v;const f=o.get(u);f&&t.remove(f),o.set(u,m)}function h(u){const d=o.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return o.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function pm(i,t,e){let n;function s(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function c(d,p){i.drawElements(n,p,o,d*r),e.update(p,n,1)}function l(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,o,d*r,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,o,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/r,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,o,d,0,v,0,g);let f=0;for(let T=0;T<g;T++)f+=p[T]*v[T];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function mm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case i.TRIANGLES:e.triangles+=a*(o/3);break;case i.LINES:e.lines+=a*(o/2);break;case i.LINE_STRIP:e.lines+=a*(o-1);break;case i.LINE_LOOP:e.lines+=a*o;break;case i.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function gm(i,t,e){const n=new WeakMap,s=new Se;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let L=a.attributes.position.count*M,R=1;L>t.maxTextureSize&&(R=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const C=new Float32Array(L*R*4*u),P=new Ml(C,L,R,u);P.type=Pn,P.needsUpdate=!0;const w=M*4;for(let D=0;D<u;D++){const Y=f[D],H=T[D],et=S[D],it=L*R*4*D;for(let q=0;q<Y.count;q++){const $=q*w;g===!0&&(s.fromBufferAttribute(Y,q),C[it+$+0]=s.x,C[it+$+1]=s.y,C[it+$+2]=s.z,C[it+$+3]=0),v===!0&&(s.fromBufferAttribute(H,q),C[it+$+4]=s.x,C[it+$+5]=s.y,C[it+$+6]=s.z,C[it+$+7]=0),m===!0&&(s.fromBufferAttribute(et,q),C[it+$+8]=s.x,C[it+$+9]=s.y,C[it+$+10]=s.z,C[it+$+11]=et.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new Pt(L,R)},n.set(a,d),a.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",r.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:o}}function _m(i,t,e,n){let s=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function r(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}const Wl=new We,Lc=new Ll(1,1),Xl=new Ml,Yl=new uu,ql=new Al,Ic=[],Uc=[],Nc=new Float32Array(16),Fc=new Float32Array(9),Oc=new Float32Array(4);function ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let o=Ic[s];if(o===void 0&&(o=new Float32Array(s),Ic[s]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,i[r].toArray(o,a)}return o}function Le(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ie(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Oo(i,t){let e=Uc[t];e===void 0&&(e=new Int32Array(t),Uc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function vm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2fv(this.addr,t),Ie(e,t)}}function Mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;i.uniform3fv(this.addr,t),Ie(e,t)}}function ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4fv(this.addr,t),Ie(e,t)}}function Sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;Oc.set(n),i.uniformMatrix2fv(this.addr,!1,Oc),Ie(e,n)}}function wm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;Fc.set(n),i.uniformMatrix3fv(this.addr,!1,Fc),Ie(e,n)}}function bm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;Nc.set(n),i.uniformMatrix4fv(this.addr,!1,Nc),Ie(e,n)}}function Em(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2iv(this.addr,t),Ie(e,t)}}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3iv(this.addr,t),Ie(e,t)}}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4iv(this.addr,t),Ie(e,t)}}function Rm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2uiv(this.addr,t),Ie(e,t)}}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3uiv(this.addr,t),Ie(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4uiv(this.addr,t),Ie(e,t)}}function Im(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?(Lc.compareFunction=_l,o=Lc):o=Wl,e.setTexture2D(t||o,s)}function Um(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Yl,s)}function Nm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ql,s)}function Fm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Xl,s)}function Om(i){switch(i){case 5126:return vm;case 35664:return xm;case 35665:return Mm;case 35666:return ym;case 35674:return Sm;case 35675:return wm;case 35676:return bm;case 5124:case 35670:return Em;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Cm;case 5125:return Rm;case 36294:return Pm;case 36295:return Dm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Fm}}function zm(i,t){i.uniform1fv(this.addr,t)}function Bm(i,t){const e=ps(t,this.size,2);i.uniform2fv(this.addr,e)}function km(i,t){const e=ps(t,this.size,3);i.uniform3fv(this.addr,e)}function Hm(i,t){const e=ps(t,this.size,4);i.uniform4fv(this.addr,e)}function Gm(i,t){const e=ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Vm(i,t){const e=ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Wm(i,t){const e=ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Xm(i,t){i.uniform1iv(this.addr,t)}function Ym(i,t){i.uniform2iv(this.addr,t)}function qm(i,t){i.uniform3iv(this.addr,t)}function Zm(i,t){i.uniform4iv(this.addr,t)}function Km(i,t){i.uniform1uiv(this.addr,t)}function jm(i,t){i.uniform2uiv(this.addr,t)}function $m(i,t){i.uniform3uiv(this.addr,t)}function Jm(i,t){i.uniform4uiv(this.addr,t)}function Qm(i,t,e){const n=this.cache,s=t.length,o=Oo(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||Wl,o[r])}function t0(i,t,e){const n=this.cache,s=t.length,o=Oo(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||Yl,o[r])}function e0(i,t,e){const n=this.cache,s=t.length,o=Oo(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||ql,o[r])}function n0(i,t,e){const n=this.cache,s=t.length,o=Oo(e,s);Le(n,o)||(i.uniform1iv(this.addr,o),Ie(n,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||Xl,o[r])}function i0(i){switch(i){case 5126:return zm;case 35664:return Bm;case 35665:return km;case 35666:return Hm;case 35674:return Gm;case 35675:return Vm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return Ym;case 35668:case 35672:return qm;case 35669:case 35673:return Zm;case 5125:return Km;case 36294:return jm;case 36295:return $m;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return e0;case 36289:case 36303:case 36311:case 36292:return n0}}class s0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Om(e.type)}}class o0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=i0(e.type)}}class r0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],n)}}}const vr=/(\w+)(\])?(\[|\.)?/g;function zc(i,t){i.seq.push(t),i.map[t.id]=t}function a0(i,t,e){const n=i.name,s=n.length;for(vr.lastIndex=0;;){const o=vr.exec(n),r=vr.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===s){zc(e,l===void 0?new s0(a,i,t):new o0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new r0(a),zc(e,u)),e=u}}}class Eo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);a0(o,r,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&n.push(r)}return n}}function Bc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const c0=37297;let l0=0;function h0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const kc=new ee;function u0(i){ae._getMatrix(kc,ae.workingColorSpace,i);const t=`mat3( ${kc.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case Ao:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Hc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+h0(i.getShaderSource(t),r)}else return s}function d0(i,t){const e=u0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function f0(i,t){let e;switch(t){case bh:e="Linear";break;case Eh:e="Reinhard";break;case Th:e="Cineon";break;case sl:e="ACESFilmic";break;case Ch:e="AgX";break;case Rh:e="Neutral";break;case Ah:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mo=new I;function p0(){ae.getLuminanceCoefficients(mo);const i=mo.x.toFixed(4),t=mo.y.toFixed(4),e=mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Es).join(`
`)}function g0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function _0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(t,s),r=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:i.getAttribLocation(t,r),locationSize:a}}return e}function Es(i){return i!==""}function Gc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const v0=/^[ \t]*#include +<([\w\d./]+)>/gm;function da(i){return i.replace(v0,M0)}const x0=new Map;function M0(i,t){let e=ne[t];if(e===void 0){const n=x0.get(t);if(n!==void 0)e=ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return da(e)}const y0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wc(i){return i.replace(y0,S0)}function S0(i,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Xc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function w0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===el?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===nl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function b0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cs:case ls:t="ENVMAP_TYPE_CUBE";break;case Io:t="ENVMAP_TYPE_CUBE_UV";break}return t}function E0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ls:t="ENVMAP_MODE_REFRACTION";break}return t}function T0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case il:t="ENVMAP_BLENDING_MULTIPLY";break;case Sh:t="ENVMAP_BLENDING_MIX";break;case wh:t="ENVMAP_BLENDING_ADD";break}return t}function A0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function C0(i,t,e,n){const s=i.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=w0(e),l=b0(e),h=E0(e),u=T0(e),d=A0(e),p=m0(e),g=g0(o),v=s.createProgram();let m,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Es).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Es).join(`
`),f.length>0&&(f+=`
`)):(m=[Xc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),f=[Xc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?ne.tonemapping_pars_fragment:"",e.toneMapping!==ri?f0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,d0("linearToOutputTexel",e.outputColorSpace),p0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Es).join(`
`)),r=da(r),r=Gc(r,e),r=Vc(r,e),a=da(a),a=Gc(a,e),a=Vc(a,e),r=Wc(r),a=Wc(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=T+m+r,M=T+f+a,L=Bc(s,s.VERTEX_SHADER,S),R=Bc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,L),s.attachShader(v,R),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(D){if(i.debug.checkShaderErrors){const Y=s.getProgramInfoLog(v).trim(),H=s.getShaderInfoLog(L).trim(),et=s.getShaderInfoLog(R).trim();let it=!0,q=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(it=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,L,R);else{const $=Hc(s,L,"vertex"),j=Hc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Y+`
`+$+`
`+j)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(H===""||et==="")&&(q=!1);q&&(D.diagnostics={runnable:it,programLog:Y,vertexShader:{log:H,prefix:m},fragmentShader:{log:et,prefix:f}})}s.deleteShader(L),s.deleteShader(R),P=new Eo(s,v),w=_0(s,v)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,c0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=l0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=R,this}let R0=0;class P0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new D0(t),e.set(t,n)),n}}class D0{constructor(t){this.id=R0++,this.code=t,this.usedTimes=0}}function L0(i,t,e,n,s,o,r){const a=new yl,c=new P0,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return l.add(w),w===0?"uv":`uv${w}`}function m(w,y,D,Y,H){const et=Y.fog,it=H.geometry,q=w.isMeshStandardMaterial?Y.environment:null,$=(w.isMeshStandardMaterial?e:t).get(w.envMap||q),j=$&&$.mapping===Io?$.image.height:null,yt=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const Rt=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,ft=Rt!==void 0?Rt.length:0;let Vt=0;it.morphAttributes.position!==void 0&&(Vt=1),it.morphAttributes.normal!==void 0&&(Vt=2),it.morphAttributes.color!==void 0&&(Vt=3);let Jt,nt,xt,ht;if(yt){const Ut=Rn[yt];Jt=Ut.vertexShader,nt=Ut.fragmentShader}else Jt=w.vertexShader,nt=w.fragmentShader,c.update(w),xt=c.getVertexShaderID(w),ht=c.getFragmentShaderID(w);const ut=i.getRenderTarget(),Tt=i.state.buffers.depth.getReversed(),Lt=H.isInstancedMesh===!0,Dt=H.isBatchedMesh===!0,qt=!!w.map,lt=!!w.matcap,_t=!!$,E=!!w.aoMap,It=!!w.lightMap,pt=!!w.bumpMap,mt=!!w.normalMap,F=!!w.displacementMap,st=!!w.emissiveMap,G=!!w.metalnessMap,x=!!w.roughnessMap,_=w.anisotropy>0,N=w.clearcoat>0,B=w.dispersion>0,X=w.iridescence>0,W=w.sheen>0,gt=w.transmission>0,z=_&&!!w.anisotropyMap,V=N&&!!w.clearcoatMap,ct=N&&!!w.clearcoatNormalMap,Q=N&&!!w.clearcoatRoughnessMap,vt=X&&!!w.iridescenceMap,wt=X&&!!w.iridescenceThicknessMap,Mt=W&&!!w.sheenColorMap,bt=W&&!!w.sheenRoughnessMap,Yt=!!w.specularMap,Bt=!!w.specularColorMap,$t=!!w.specularIntensityMap,U=gt&&!!w.transmissionMap,St=gt&&!!w.thicknessMap,tt=!!w.gradientMap,Z=!!w.alphaMap,dt=w.alphaTest>0,Et=!!w.alphaHash,ot=!!w.extensions;let rt=ri;w.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(rt=i.toneMapping);const Ht={shaderID:yt,shaderType:w.type,shaderName:w.name,vertexShader:Jt,fragmentShader:nt,defines:w.defines,customVertexShaderID:xt,customFragmentShaderID:ht,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:Dt,batchingColor:Dt&&H._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&H.instanceColor!==null,instancingMorph:Lt&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ut===null?i.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:ds,alphaToCoverage:!!w.alphaToCoverage,map:qt,matcap:lt,envMap:_t,envMapMode:_t&&$.mapping,envMapCubeUVHeight:j,aoMap:E,lightMap:It,bumpMap:pt,normalMap:mt,displacementMap:d&&F,emissiveMap:st,normalMapObjectSpace:mt&&w.normalMapType===Lh,normalMapTangentSpace:mt&&w.normalMapType===gl,metalnessMap:G,roughnessMap:x,anisotropy:_,anisotropyMap:z,clearcoat:N,clearcoatMap:V,clearcoatNormalMap:ct,clearcoatRoughnessMap:Q,dispersion:B,iridescence:X,iridescenceMap:vt,iridescenceThicknessMap:wt,sheen:W,sheenColorMap:Mt,sheenRoughnessMap:bt,specularMap:Yt,specularColorMap:Bt,specularIntensityMap:$t,transmission:gt,transmissionMap:U,thicknessMap:St,gradientMap:tt,opaque:w.transparent===!1&&w.blending===is&&w.alphaToCoverage===!1,alphaMap:Z,alphaTest:dt,alphaHash:Et,combine:w.combine,mapUv:qt&&v(w.map.channel),aoMapUv:E&&v(w.aoMap.channel),lightMapUv:It&&v(w.lightMap.channel),bumpMapUv:pt&&v(w.bumpMap.channel),normalMapUv:mt&&v(w.normalMap.channel),displacementMapUv:F&&v(w.displacementMap.channel),emissiveMapUv:st&&v(w.emissiveMap.channel),metalnessMapUv:G&&v(w.metalnessMap.channel),roughnessMapUv:x&&v(w.roughnessMap.channel),anisotropyMapUv:z&&v(w.anisotropyMap.channel),clearcoatMapUv:V&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:ct&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:bt&&v(w.sheenRoughnessMap.channel),specularMapUv:Yt&&v(w.specularMap.channel),specularColorMapUv:Bt&&v(w.specularColorMap.channel),specularIntensityMapUv:$t&&v(w.specularIntensityMap.channel),transmissionMapUv:U&&v(w.transmissionMap.channel),thicknessMapUv:St&&v(w.thicknessMap.channel),alphaMapUv:Z&&v(w.alphaMap.channel),vertexTangents:!!it.attributes.tangent&&(mt||_),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!it.attributes.uv&&(qt||Z),fog:!!et,useFog:w.fog===!0,fogExp2:!!et&&et.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Tt,skinning:H.isSkinnedMesh===!0,morphTargets:it.morphAttributes.position!==void 0,morphNormals:it.morphAttributes.normal!==void 0,morphColors:it.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Vt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:rt,decodeVideoTexture:qt&&w.map.isVideoTexture===!0&&ae.getTransfer(w.map.colorSpace)===ue,decodeVideoTextureEmissive:st&&w.emissiveMap.isVideoTexture===!0&&ae.getTransfer(w.emissiveMap.colorSpace)===ue,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ve,flipSided:w.side===Je,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ot&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&w.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function f(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)y.push(D),y.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(T(y,w),S(y,w),y.push(i.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function T(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function S(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function M(w){const y=g[w.type];let D;if(y){const Y=Rn[y];D=wu.clone(Y.uniforms)}else D=w.uniforms;return D}function L(w,y){let D;for(let Y=0,H=h.length;Y<H;Y++){const et=h[Y];if(et.cacheKey===y){D=et,++D.usedTimes;break}}return D===void 0&&(D=new C0(i,y,w,o),h.push(D)),D}function R(w){if(--w.usedTimes===0){const y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function C(w){c.remove(w)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:M,acquireProgram:L,releaseProgram:R,releaseShaderCache:C,programs:h,dispose:P}}function I0(){let i=new WeakMap;function t(r){return i.has(r)}function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function n(r){i.delete(r)}function s(r,a,c){i.get(r)[a]=c}function o(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:o}}function U0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Yc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function qc(){const i=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function r(u,d,p,g,v,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),t++,f}function a(u,d,p,g,v,m){const f=r(u,d,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function c(u,d,p,g,v,m){const f=r(u,d,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||U0),n.length>1&&n.sort(d||Yc),s.length>1&&s.sort(d||Yc)}function h(){for(let u=t,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:a,unshift:c,finish:h,sort:l}}function N0(){let i=new WeakMap;function t(n,s){const o=i.get(n);let r;return o===void 0?(r=new qc,i.set(n,[r])):s>=o.length?(r=new qc,o.push(r)):r=o[s],r}function e(){i=new WeakMap}return{get:t,dispose:e}}function F0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new kt};break;case"SpotLight":e={position:new I,direction:new I,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function O0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let z0=0;function B0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function k0(i){const t=new F0,e=O0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,o=new fe,r=new fe;function a(l){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,T=0,S=0,M=0,L=0,R=0,C=0;l.sort(B0);for(let w=0,y=l.length;w<y;w++){const D=l[w],Y=D.color,H=D.intensity,et=D.distance,it=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=Y.r*H,u+=Y.g*H,d+=Y.b*H;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],H);C++}else if(D.isDirectionalLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const $=D.shadow,j=e.get(D);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize=$.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=it,n.directionalShadowMatrix[p]=D.shadow.matrix,T++}n.directional[p]=q,p++}else if(D.isSpotLight){const q=t.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(Y).multiplyScalar(H),q.distance=et,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[v]=q;const $=D.shadow;if(D.map&&(n.spotLightMap[L]=D.map,L++,$.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[v]=$.matrix,D.castShadow){const j=e.get(D);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize=$.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=it,M++}v++}else if(D.isRectAreaLight){const q=t.get(D);q.color.copy(Y).multiplyScalar(H),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=q,m++}else if(D.isPointLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const $=D.shadow,j=e.get(D);j.shadowIntensity=$.intensity,j.shadowBias=$.bias,j.shadowNormalBias=$.normalBias,j.shadowRadius=$.radius,j.shadowMapSize=$.mapSize,j.shadowCameraNear=$.camera.near,j.shadowCameraFar=$.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=it,n.pointShadowMatrix[g]=D.shadow.matrix,S++}n.point[g]=q,g++}else if(D.isHemisphereLight){const q=t.get(D);q.skyColor.copy(D.color).multiplyScalar(H),q.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[f]=q,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==T||P.numPointShadows!==S||P.numSpotShadows!==M||P.numSpotMaps!==L||P.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=M+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,P.directionalLength=p,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=T,P.numPointShadows=S,P.numSpotShadows=M,P.numSpotMaps=L,P.numLightProbes=C,n.version=z0++)}function c(l,h){let u=0,d=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let f=0,T=l.length;f<T;f++){const S=l[f];if(S.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(S.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),r.identity(),o.copy(S.matrixWorld),o.premultiply(m),r.extractRotation(o),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),g++}else if(S.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Zc(i){const t=new k0(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function H0(i){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new Zc(i),t.set(s,[a])):o>=r.length?(a=new Zc(i),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const G0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,V0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function W0(i,t,e){let n=new wa;const s=new Pt,o=new Pt,r=new Se,a=new kl({depthPacking:ml}),c=new fd,l={},h=e.maxTextureSize,u={[Wn]:Je,[Je]:Wn,[Ve]:Ve},d=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:G0,fragmentShader:V0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ke;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new A(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=el;let f=this.type;this.render=function(R,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const w=i.getRenderTarget(),y=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),Y=i.state;Y.setBlending(oi),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const H=f!==Bn&&this.type===Bn,et=f===Bn&&this.type!==Bn;for(let it=0,q=R.length;it<q;it++){const $=R[it],j=$.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const yt=j.getFrameExtents();if(s.multiply(yt),o.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(o.x=Math.floor(h/yt.x),s.x=o.x*yt.x,j.mapSize.x=o.x),s.y>h&&(o.y=Math.floor(h/yt.y),s.y=o.y*yt.y,j.mapSize.y=o.y)),j.map===null||H===!0||et===!0){const ft=this.type!==Bn?{minFilter:De,magFilter:De}:{};j.map!==null&&j.map.dispose(),j.map=new Yn(s.x,s.y,ft),j.map.texture.name=$.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();const Rt=j.getViewportCount();for(let ft=0;ft<Rt;ft++){const Vt=j.getViewport(ft);r.set(o.x*Vt.x,o.y*Vt.y,o.x*Vt.z,o.y*Vt.w),Y.viewport(r),j.updateMatrices($,ft),n=j.getFrustum(),M(C,P,j.camera,$,this.type)}j.isPointLightShadow!==!0&&this.type===Bn&&T(j,P),j.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(w,y,D)};function T(R,C){const P=t.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Yn(s.x,s.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(C,null,P,d,v,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(C,null,P,p,v,null)}function S(R,C,P,w){let y=null;const D=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)y=D;else if(y=P.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const Y=y.uuid,H=C.uuid;let et=l[Y];et===void 0&&(et={},l[Y]=et);let it=et[H];it===void 0&&(it=y.clone(),et[H]=it,C.addEventListener("dispose",L)),y=it}if(y.visible=C.visible,y.wireframe=C.wireframe,w===Bn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const Y=i.properties.get(y);Y.light=P}return y}function M(R,C,P,w,y){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Bn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const H=t.update(R),et=R.material;if(Array.isArray(et)){const it=H.groups;for(let q=0,$=it.length;q<$;q++){const j=it[q],yt=et[j.materialIndex];if(yt&&yt.visible){const Rt=S(R,yt,w,y);R.onBeforeShadow(i,R,C,P,H,Rt,j),i.renderBufferDirect(P,null,H,Rt,R,j),R.onAfterShadow(i,R,C,P,H,Rt,j)}}}else if(et.visible){const it=S(R,et,w,y);R.onBeforeShadow(i,R,C,P,H,it,null),i.renderBufferDirect(P,null,H,it,R,null),R.onAfterShadow(i,R,C,P,H,it,null)}}const Y=R.children;for(let H=0,et=Y.length;H<et;H++)M(Y[H],C,P,w,y)}function L(R){R.target.removeEventListener("dispose",L);for(const P in l){const w=l[P],y=R.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const X0={[Er]:Tr,[Ar]:Pr,[Cr]:Dr,[as]:Rr,[Tr]:Er,[Pr]:Ar,[Dr]:Cr,[Rr]:as};function Y0(i,t){function e(){let U=!1;const St=new Se;let tt=null;const Z=new Se(0,0,0,0);return{setMask:function(dt){tt!==dt&&!U&&(i.colorMask(dt,dt,dt,dt),tt=dt)},setLocked:function(dt){U=dt},setClear:function(dt,Et,ot,rt,Ht){Ht===!0&&(dt*=rt,Et*=rt,ot*=rt),St.set(dt,Et,ot,rt),Z.equals(St)===!1&&(i.clearColor(dt,Et,ot,rt),Z.copy(St))},reset:function(){U=!1,tt=null,Z.set(-1,0,0,0)}}}function n(){let U=!1,St=!1,tt=null,Z=null,dt=null;return{setReversed:function(Et){if(St!==Et){const ot=t.get("EXT_clip_control");St?ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.ZERO_TO_ONE_EXT):ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.NEGATIVE_ONE_TO_ONE_EXT);const rt=dt;dt=null,this.setClear(rt)}St=Et},getReversed:function(){return St},setTest:function(Et){Et?ut(i.DEPTH_TEST):Tt(i.DEPTH_TEST)},setMask:function(Et){tt!==Et&&!U&&(i.depthMask(Et),tt=Et)},setFunc:function(Et){if(St&&(Et=X0[Et]),Z!==Et){switch(Et){case Er:i.depthFunc(i.NEVER);break;case Tr:i.depthFunc(i.ALWAYS);break;case Ar:i.depthFunc(i.LESS);break;case as:i.depthFunc(i.LEQUAL);break;case Cr:i.depthFunc(i.EQUAL);break;case Rr:i.depthFunc(i.GEQUAL);break;case Pr:i.depthFunc(i.GREATER);break;case Dr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=Et}},setLocked:function(Et){U=Et},setClear:function(Et){dt!==Et&&(St&&(Et=1-Et),i.clearDepth(Et),dt=Et)},reset:function(){U=!1,tt=null,Z=null,dt=null,St=!1}}}function s(){let U=!1,St=null,tt=null,Z=null,dt=null,Et=null,ot=null,rt=null,Ht=null;return{setTest:function(Ut){U||(Ut?ut(i.STENCIL_TEST):Tt(i.STENCIL_TEST))},setMask:function(Ut){St!==Ut&&!U&&(i.stencilMask(Ut),St=Ut)},setFunc:function(Ut,te,me){(tt!==Ut||Z!==te||dt!==me)&&(i.stencilFunc(Ut,te,me),tt=Ut,Z=te,dt=me)},setOp:function(Ut,te,me){(Et!==Ut||ot!==te||rt!==me)&&(i.stencilOp(Ut,te,me),Et=Ut,ot=te,rt=me)},setLocked:function(Ut){U=Ut},setClear:function(Ut){Ht!==Ut&&(i.clearStencil(Ut),Ht=Ut)},reset:function(){U=!1,St=null,tt=null,Z=null,dt=null,Et=null,ot=null,rt=null,Ht=null}}}const o=new e,r=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,T=null,S=null,M=null,L=null,R=null,C=new kt(0,0,0),P=0,w=!1,y=null,D=null,Y=null,H=null,et=null;const it=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,$=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=$>=1):j.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=$>=2);let yt=null,Rt={};const ft=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),Jt=new Se().fromArray(ft),nt=new Se().fromArray(Vt);function xt(U,St,tt,Z){const dt=new Uint8Array(4),Et=i.createTexture();i.bindTexture(U,Et),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ot=0;ot<tt;ot++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(St+ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return Et}const ht={};ht[i.TEXTURE_2D]=xt(i.TEXTURE_2D,i.TEXTURE_2D,1),ht[i.TEXTURE_CUBE_MAP]=xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[i.TEXTURE_2D_ARRAY]=xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ht[i.TEXTURE_3D]=xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ut(i.DEPTH_TEST),r.setFunc(as),pt(!1),mt(Fa),ut(i.CULL_FACE),E(oi);function ut(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Tt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Lt(U,St){return u[U]!==St?(i.bindFramebuffer(U,St),u[U]=St,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=St),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=St),!0):!1}function Dt(U,St){let tt=p,Z=!1;if(U){tt=d.get(St),tt===void 0&&(tt=[],d.set(St,tt));const dt=U.textures;if(tt.length!==dt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let Et=0,ot=dt.length;Et<ot;Et++)tt[Et]=i.COLOR_ATTACHMENT0+Et;tt.length=dt.length,Z=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,Z=!0);Z&&i.drawBuffers(tt)}function qt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const lt={[vi]:i.FUNC_ADD,[oh]:i.FUNC_SUBTRACT,[rh]:i.FUNC_REVERSE_SUBTRACT};lt[ah]=i.MIN,lt[ch]=i.MAX;const _t={[lh]:i.ZERO,[hh]:i.ONE,[uh]:i.SRC_COLOR,[wr]:i.SRC_ALPHA,[_h]:i.SRC_ALPHA_SATURATE,[mh]:i.DST_COLOR,[fh]:i.DST_ALPHA,[dh]:i.ONE_MINUS_SRC_COLOR,[br]:i.ONE_MINUS_SRC_ALPHA,[gh]:i.ONE_MINUS_DST_COLOR,[ph]:i.ONE_MINUS_DST_ALPHA,[vh]:i.CONSTANT_COLOR,[xh]:i.ONE_MINUS_CONSTANT_COLOR,[Mh]:i.CONSTANT_ALPHA,[yh]:i.ONE_MINUS_CONSTANT_ALPHA};function E(U,St,tt,Z,dt,Et,ot,rt,Ht,Ut){if(U===oi){v===!0&&(Tt(i.BLEND),v=!1);return}if(v===!1&&(ut(i.BLEND),v=!0),U!==sh){if(U!==m||Ut!==w){if((f!==vi||M!==vi)&&(i.blendEquation(i.FUNC_ADD),f=vi,M=vi),Ut)switch(U){case is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oa:i.blendFunc(i.ONE,i.ONE);break;case za:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ba:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case za:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ba:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,S=null,L=null,R=null,C.set(0,0,0),P=0,m=U,w=Ut}return}dt=dt||St,Et=Et||tt,ot=ot||Z,(St!==f||dt!==M)&&(i.blendEquationSeparate(lt[St],lt[dt]),f=St,M=dt),(tt!==T||Z!==S||Et!==L||ot!==R)&&(i.blendFuncSeparate(_t[tt],_t[Z],_t[Et],_t[ot]),T=tt,S=Z,L=Et,R=ot),(rt.equals(C)===!1||Ht!==P)&&(i.blendColor(rt.r,rt.g,rt.b,Ht),C.copy(rt),P=Ht),m=U,w=!1}function It(U,St){U.side===Ve?Tt(i.CULL_FACE):ut(i.CULL_FACE);let tt=U.side===Je;St&&(tt=!tt),pt(tt),U.blending===is&&U.transparent===!1?E(oi):E(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),o.setMask(U.colorWrite);const Z=U.stencilWrite;a.setTest(Z),Z&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),st(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ut(i.SAMPLE_ALPHA_TO_COVERAGE):Tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function mt(U){U!==nh?(ut(i.CULL_FACE),U!==D&&(U===Fa?i.cullFace(i.BACK):U===ih?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Tt(i.CULL_FACE),D=U}function F(U){U!==Y&&(q&&i.lineWidth(U),Y=U)}function st(U,St,tt){U?(ut(i.POLYGON_OFFSET_FILL),(H!==St||et!==tt)&&(i.polygonOffset(St,tt),H=St,et=tt)):Tt(i.POLYGON_OFFSET_FILL)}function G(U){U?ut(i.SCISSOR_TEST):Tt(i.SCISSOR_TEST)}function x(U){U===void 0&&(U=i.TEXTURE0+it-1),yt!==U&&(i.activeTexture(U),yt=U)}function _(U,St,tt){tt===void 0&&(yt===null?tt=i.TEXTURE0+it-1:tt=yt);let Z=Rt[tt];Z===void 0&&(Z={type:void 0,texture:void 0},Rt[tt]=Z),(Z.type!==U||Z.texture!==St)&&(yt!==tt&&(i.activeTexture(tt),yt=tt),i.bindTexture(U,St||ht[U]),Z.type=U,Z.texture=St)}function N(){const U=Rt[yt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function B(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function gt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function V(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function wt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(U){Jt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Jt.copy(U))}function bt(U){nt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),nt.copy(U))}function Yt(U,St){let tt=l.get(St);tt===void 0&&(tt=new WeakMap,l.set(St,tt));let Z=tt.get(U);Z===void 0&&(Z=i.getUniformBlockIndex(St,U.name),tt.set(U,Z))}function Bt(U,St){const Z=l.get(St).get(U);c.get(St)!==Z&&(i.uniformBlockBinding(St,Z,U.__bindingPointIndex),c.set(St,Z))}function $t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},yt=null,Rt={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,T=null,S=null,M=null,L=null,R=null,C=new kt(0,0,0),P=0,w=!1,y=null,D=null,Y=null,H=null,et=null,Jt.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:ut,disable:Tt,bindFramebuffer:Lt,drawBuffers:Dt,useProgram:qt,setBlending:E,setMaterial:It,setFlipSided:pt,setCullFace:mt,setLineWidth:F,setPolygonOffset:st,setScissorTest:G,activeTexture:x,bindTexture:_,unbindTexture:N,compressedTexImage2D:B,compressedTexImage3D:X,texImage2D:vt,texImage3D:wt,updateUBOMapping:Yt,uniformBlockBinding:Bt,texStorage2D:ct,texStorage3D:Q,texSubImage2D:W,texSubImage3D:gt,compressedTexSubImage2D:z,compressedTexSubImage3D:V,scissor:Mt,viewport:bt,reset:$t}}function q0(i,t,e,n,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pt,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,_){return p?new OffscreenCanvas(x,_):Ro("canvas")}function v(x,_,N){let B=1;const X=G(x);if((X.width>N||X.height>N)&&(B=N/Math.max(X.width,X.height)),B<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const W=Math.floor(B*X.width),gt=Math.floor(B*X.height);u===void 0&&(u=g(W,gt));const z=_?g(W,gt):u;return z.width=W,z.height=gt,z.getContext("2d").drawImage(x,0,0,W,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+W+"x"+gt+")."),z}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),x;return x}function m(x){return x.generateMipmaps}function f(x){i.generateMipmap(x)}function T(x){return x.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?i.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(x,_,N,B,X=!1){if(x!==null){if(i[x]!==void 0)return i[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let W=_;if(_===i.RED&&(N===i.FLOAT&&(W=i.R32F),N===i.HALF_FLOAT&&(W=i.R16F),N===i.UNSIGNED_BYTE&&(W=i.R8)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(W=i.R8UI),N===i.UNSIGNED_SHORT&&(W=i.R16UI),N===i.UNSIGNED_INT&&(W=i.R32UI),N===i.BYTE&&(W=i.R8I),N===i.SHORT&&(W=i.R16I),N===i.INT&&(W=i.R32I)),_===i.RG&&(N===i.FLOAT&&(W=i.RG32F),N===i.HALF_FLOAT&&(W=i.RG16F),N===i.UNSIGNED_BYTE&&(W=i.RG8)),_===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(W=i.RG8UI),N===i.UNSIGNED_SHORT&&(W=i.RG16UI),N===i.UNSIGNED_INT&&(W=i.RG32UI),N===i.BYTE&&(W=i.RG8I),N===i.SHORT&&(W=i.RG16I),N===i.INT&&(W=i.RG32I)),_===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(W=i.RGB8UI),N===i.UNSIGNED_SHORT&&(W=i.RGB16UI),N===i.UNSIGNED_INT&&(W=i.RGB32UI),N===i.BYTE&&(W=i.RGB8I),N===i.SHORT&&(W=i.RGB16I),N===i.INT&&(W=i.RGB32I)),_===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),N===i.UNSIGNED_INT&&(W=i.RGBA32UI),N===i.BYTE&&(W=i.RGBA8I),N===i.SHORT&&(W=i.RGBA16I),N===i.INT&&(W=i.RGBA32I)),_===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),_===i.RGBA){const gt=X?Ao:ae.getTransfer(B);N===i.FLOAT&&(W=i.RGBA32F),N===i.HALF_FLOAT&&(W=i.RGBA16F),N===i.UNSIGNED_BYTE&&(W=gt===ue?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function M(x,_){let N;return x?_===null||_===yi||_===hs?N=i.DEPTH24_STENCIL8:_===Pn?N=i.DEPTH32F_STENCIL8:_===Ls&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===yi||_===hs?N=i.DEPTH_COMPONENT24:_===Pn?N=i.DEPTH_COMPONENT32F:_===Ls&&(N=i.DEPTH_COMPONENT16),N}function L(x,_){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==De&&x.minFilter!==vn?Math.log2(Math.max(_.width,_.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?_.mipmaps.length:1}function R(x){const _=x.target;_.removeEventListener("dispose",R),P(_),_.isVideoTexture&&h.delete(_)}function C(x){const _=x.target;_.removeEventListener("dispose",C),y(_)}function P(x){const _=n.get(x);if(_.__webglInit===void 0)return;const N=x.source,B=d.get(N);if(B){const X=B[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&w(x),Object.keys(B).length===0&&d.delete(N)}n.remove(x)}function w(x){const _=n.get(x);i.deleteTexture(_.__webglTexture);const N=x.source,B=d.get(N);delete B[_.__cacheKey],r.memory.textures--}function y(x){const _=n.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),n.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(_.__webglFramebuffer[B]))for(let X=0;X<_.__webglFramebuffer[B].length;X++)i.deleteFramebuffer(_.__webglFramebuffer[B][X]);else i.deleteFramebuffer(_.__webglFramebuffer[B]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[B])}else{if(Array.isArray(_.__webglFramebuffer))for(let B=0;B<_.__webglFramebuffer.length;B++)i.deleteFramebuffer(_.__webglFramebuffer[B]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let B=0;B<_.__webglColorRenderbuffer.length;B++)_.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[B]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=x.textures;for(let B=0,X=N.length;B<X;B++){const W=n.get(N[B]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),r.memory.textures--),n.remove(N[B])}n.remove(x)}let D=0;function Y(){D=0}function H(){const x=D;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),D+=1,x}function et(x){const _=[];return _.push(x.wrapS),_.push(x.wrapT),_.push(x.wrapR||0),_.push(x.magFilter),_.push(x.minFilter),_.push(x.anisotropy),_.push(x.internalFormat),_.push(x.format),_.push(x.type),_.push(x.generateMipmaps),_.push(x.premultiplyAlpha),_.push(x.flipY),_.push(x.unpackAlignment),_.push(x.colorSpace),_.join()}function it(x,_){const N=n.get(x);if(x.isVideoTexture&&F(x),x.isRenderTargetTexture===!1&&x.version>0&&N.__version!==x.version){const B=x.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{nt(N,x,_);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function q(x,_){const N=n.get(x);if(x.version>0&&N.__version!==x.version){nt(N,x,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function $(x,_){const N=n.get(x);if(x.version>0&&N.__version!==x.version){nt(N,x,_);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function j(x,_){const N=n.get(x);if(x.version>0&&N.__version!==x.version){xt(N,x,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}const yt={[Ds]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[Ur]:i.MIRRORED_REPEAT},Rt={[De]:i.NEAREST,[Ph]:i.NEAREST_MIPMAP_NEAREST,[ks]:i.NEAREST_MIPMAP_LINEAR,[vn]:i.LINEAR,[Ho]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},ft={[Ih]:i.NEVER,[Bh]:i.ALWAYS,[Uh]:i.LESS,[_l]:i.LEQUAL,[Nh]:i.EQUAL,[zh]:i.GEQUAL,[Fh]:i.GREATER,[Oh]:i.NOTEQUAL};function Vt(x,_){if(_.type===Pn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===vn||_.magFilter===Ho||_.magFilter===ks||_.magFilter===Mi||_.minFilter===vn||_.minFilter===Ho||_.minFilter===ks||_.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(x,i.TEXTURE_WRAP_S,yt[_.wrapS]),i.texParameteri(x,i.TEXTURE_WRAP_T,yt[_.wrapT]),(x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY)&&i.texParameteri(x,i.TEXTURE_WRAP_R,yt[_.wrapR]),i.texParameteri(x,i.TEXTURE_MAG_FILTER,Rt[_.magFilter]),i.texParameteri(x,i.TEXTURE_MIN_FILTER,Rt[_.minFilter]),_.compareFunction&&(i.texParameteri(x,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(x,i.TEXTURE_COMPARE_FUNC,ft[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===De||_.minFilter!==ks&&_.minFilter!==Mi||_.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(x,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Jt(x,_){let N=!1;x.__webglInit===void 0&&(x.__webglInit=!0,_.addEventListener("dispose",R));const B=_.source;let X=d.get(B);X===void 0&&(X={},d.set(B,X));const W=et(_);if(W!==x.__cacheKey){X[W]===void 0&&(X[W]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,N=!0),X[W].usedTimes++;const gt=X[x.__cacheKey];gt!==void 0&&(X[x.__cacheKey].usedTimes--,gt.usedTimes===0&&w(_)),x.__cacheKey=W,x.__webglTexture=X[W].texture}return N}function nt(x,_,N){let B=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(B=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(B=i.TEXTURE_3D);const X=Jt(x,_),W=_.source;e.bindTexture(B,x.__webglTexture,i.TEXTURE0+N);const gt=n.get(W);if(W.version!==gt.__version||X===!0){e.activeTexture(i.TEXTURE0+N);const z=ae.getPrimaries(ae.workingColorSpace),V=_.colorSpace===ii?null:ae.getPrimaries(_.colorSpace),ct=_.colorSpace===ii||z===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let Q=v(_.image,!1,s.maxTextureSize);Q=st(_,Q);const vt=o.convert(_.format,_.colorSpace),wt=o.convert(_.type);let Mt=S(_.internalFormat,vt,wt,_.colorSpace,_.isVideoTexture);Vt(B,_);let bt;const Yt=_.mipmaps,Bt=_.isVideoTexture!==!0,$t=gt.__version===void 0||X===!0,U=W.dataReady,St=L(_,Q);if(_.isDepthTexture)Mt=M(_.format===us,_.type),$t&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,Mt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,Mt,Q.width,Q.height,0,vt,wt,null));else if(_.isDataTexture)if(Yt.length>0){Bt&&$t&&e.texStorage2D(i.TEXTURE_2D,St,Mt,Yt[0].width,Yt[0].height);for(let tt=0,Z=Yt.length;tt<Z;tt++)bt=Yt[tt],Bt?U&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,bt.width,bt.height,vt,wt,bt.data):e.texImage2D(i.TEXTURE_2D,tt,Mt,bt.width,bt.height,0,vt,wt,bt.data);_.generateMipmaps=!1}else Bt?($t&&e.texStorage2D(i.TEXTURE_2D,St,Mt,Q.width,Q.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,vt,wt,Q.data)):e.texImage2D(i.TEXTURE_2D,0,Mt,Q.width,Q.height,0,vt,wt,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Bt&&$t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Mt,Yt[0].width,Yt[0].height,Q.depth);for(let tt=0,Z=Yt.length;tt<Z;tt++)if(bt=Yt[tt],_.format!==xn)if(vt!==null)if(Bt){if(U)if(_.layerUpdates.size>0){const dt=bc(bt.width,bt.height,_.format,_.type);for(const Et of _.layerUpdates){const ot=bt.data.subarray(Et*dt/bt.data.BYTES_PER_ELEMENT,(Et+1)*dt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Et,bt.width,bt.height,1,vt,ot)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,bt.width,bt.height,Q.depth,vt,bt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Mt,bt.width,bt.height,Q.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,bt.width,bt.height,Q.depth,vt,wt,bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Mt,bt.width,bt.height,Q.depth,0,vt,wt,bt.data)}else{Bt&&$t&&e.texStorage2D(i.TEXTURE_2D,St,Mt,Yt[0].width,Yt[0].height);for(let tt=0,Z=Yt.length;tt<Z;tt++)bt=Yt[tt],_.format!==xn?vt!==null?Bt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,bt.width,bt.height,vt,bt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Mt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?U&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,bt.width,bt.height,vt,wt,bt.data):e.texImage2D(i.TEXTURE_2D,tt,Mt,bt.width,bt.height,0,vt,wt,bt.data)}else if(_.isDataArrayTexture)if(Bt){if($t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Mt,Q.width,Q.height,Q.depth),U)if(_.layerUpdates.size>0){const tt=bc(Q.width,Q.height,_.format,_.type);for(const Z of _.layerUpdates){const dt=Q.data.subarray(Z*tt/Q.data.BYTES_PER_ELEMENT,(Z+1)*tt/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,Q.width,Q.height,1,vt,wt,dt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,vt,wt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,Q.width,Q.height,Q.depth,0,vt,wt,Q.data);else if(_.isData3DTexture)Bt?($t&&e.texStorage3D(i.TEXTURE_3D,St,Mt,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,vt,wt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,Q.width,Q.height,Q.depth,0,vt,wt,Q.data);else if(_.isFramebufferTexture){if($t)if(Bt)e.texStorage2D(i.TEXTURE_2D,St,Mt,Q.width,Q.height);else{let tt=Q.width,Z=Q.height;for(let dt=0;dt<St;dt++)e.texImage2D(i.TEXTURE_2D,dt,Mt,tt,Z,0,vt,wt,null),tt>>=1,Z>>=1}}else if(Yt.length>0){if(Bt&&$t){const tt=G(Yt[0]);e.texStorage2D(i.TEXTURE_2D,St,Mt,tt.width,tt.height)}for(let tt=0,Z=Yt.length;tt<Z;tt++)bt=Yt[tt],Bt?U&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,vt,wt,bt):e.texImage2D(i.TEXTURE_2D,tt,Mt,vt,wt,bt);_.generateMipmaps=!1}else if(Bt){if($t){const tt=G(Q);e.texStorage2D(i.TEXTURE_2D,St,Mt,tt.width,tt.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt,wt,Q)}else e.texImage2D(i.TEXTURE_2D,0,Mt,vt,wt,Q);m(_)&&f(B),gt.__version=W.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function xt(x,_,N){if(_.image.length!==6)return;const B=Jt(x,_),X=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,x.__webglTexture,i.TEXTURE0+N);const W=n.get(X);if(X.version!==W.__version||B===!0){e.activeTexture(i.TEXTURE0+N);const gt=ae.getPrimaries(ae.workingColorSpace),z=_.colorSpace===ii?null:ae.getPrimaries(_.colorSpace),V=_.colorSpace===ii||gt===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const ct=_.isCompressedTexture||_.image[0].isCompressedTexture,Q=_.image[0]&&_.image[0].isDataTexture,vt=[];for(let Z=0;Z<6;Z++)!ct&&!Q?vt[Z]=v(_.image[Z],!0,s.maxCubemapSize):vt[Z]=Q?_.image[Z].image:_.image[Z],vt[Z]=st(_,vt[Z]);const wt=vt[0],Mt=o.convert(_.format,_.colorSpace),bt=o.convert(_.type),Yt=S(_.internalFormat,Mt,bt,_.colorSpace),Bt=_.isVideoTexture!==!0,$t=W.__version===void 0||B===!0,U=X.dataReady;let St=L(_,wt);Vt(i.TEXTURE_CUBE_MAP,_);let tt;if(ct){Bt&&$t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Yt,wt.width,wt.height);for(let Z=0;Z<6;Z++){tt=vt[Z].mipmaps;for(let dt=0;dt<tt.length;dt++){const Et=tt[dt];_.format!==xn?Mt!==null?Bt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,Et.width,Et.height,Mt,Et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,Yt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,Et.width,Et.height,Mt,bt,Et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,Yt,Et.width,Et.height,0,Mt,bt,Et.data)}}}else{if(tt=_.mipmaps,Bt&&$t){tt.length>0&&St++;const Z=G(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Yt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Q){Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,vt[Z].width,vt[Z].height,Mt,bt,vt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Yt,vt[Z].width,vt[Z].height,0,Mt,bt,vt[Z].data);for(let dt=0;dt<tt.length;dt++){const ot=tt[dt].image[Z].image;Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,ot.width,ot.height,Mt,bt,ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,Yt,ot.width,ot.height,0,Mt,bt,ot.data)}}else{Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Mt,bt,vt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Yt,Mt,bt,vt[Z]);for(let dt=0;dt<tt.length;dt++){const Et=tt[dt];Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Mt,bt,Et.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,Yt,Mt,bt,Et.image[Z])}}}m(_)&&f(i.TEXTURE_CUBE_MAP),W.__version=X.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function ht(x,_,N,B,X,W){const gt=o.convert(N.format,N.colorSpace),z=o.convert(N.type),V=S(N.internalFormat,gt,z,N.colorSpace),ct=n.get(_),Q=n.get(N);if(Q.__renderTarget=_,!ct.__hasExternalTextures){const vt=Math.max(1,_.width>>W),wt=Math.max(1,_.height>>W);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?e.texImage3D(X,W,V,vt,wt,_.depth,0,gt,z,null):e.texImage2D(X,W,V,vt,wt,0,gt,z,null)}e.bindFramebuffer(i.FRAMEBUFFER,x),mt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,B,X,Q.__webglTexture,0,pt(_)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,B,X,Q.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(x,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,x),_.depthBuffer){const B=_.depthTexture,X=B&&B.isDepthTexture?B.type:null,W=M(_.stencilBuffer,X),gt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=pt(_);mt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,z,W,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,z,W,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,W,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,x)}else{const B=_.textures;for(let X=0;X<B.length;X++){const W=B[X],gt=o.convert(W.format,W.colorSpace),z=o.convert(W.type),V=S(W.internalFormat,gt,z,W.colorSpace),ct=pt(_);N&&mt(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,V,_.width,_.height):mt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,V,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,V,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Tt(x,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,x),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=n.get(_.depthTexture);B.__renderTarget=_,(!B.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),it(_.depthTexture,0);const X=B.__webglTexture,W=pt(_);if(_.depthTexture.format===ss)mt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(_.depthTexture.format===us)mt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Lt(x){const _=n.get(x),N=x.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==x.depthTexture){const B=x.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),B){const X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,B.removeEventListener("dispose",X)};B.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=B}if(x.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Tt(_.__webglFramebuffer,x)}else if(N){_.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[B]),_.__webglDepthbuffer[B]===void 0)_.__webglDepthbuffer[B]=i.createRenderbuffer(),ut(_.__webglDepthbuffer[B],x,!1);else{const X=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[B];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,W)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ut(_.__webglDepthbuffer,x,!1);else{const B=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,X)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(x,_,N){const B=n.get(x);_!==void 0&&ht(B.__webglFramebuffer,x,x.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Lt(x)}function qt(x){const _=x.texture,N=n.get(x),B=n.get(_);x.addEventListener("dispose",C);const X=x.textures,W=x.isWebGLCubeRenderTarget===!0,gt=X.length>1;if(gt||(B.__webglTexture===void 0&&(B.__webglTexture=i.createTexture()),B.__version=_.version,r.memory.textures++),W){N.__webglFramebuffer=[];for(let z=0;z<6;z++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[z]=[];for(let V=0;V<_.mipmaps.length;V++)N.__webglFramebuffer[z][V]=i.createFramebuffer()}else N.__webglFramebuffer[z]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let z=0;z<_.mipmaps.length;z++)N.__webglFramebuffer[z]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(gt)for(let z=0,V=X.length;z<V;z++){const ct=n.get(X[z]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),r.memory.textures++)}if(x.samples>0&&mt(x)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let z=0;z<X.length;z++){const V=X[z];N.__webglColorRenderbuffer[z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[z]);const ct=o.convert(V.format,V.colorSpace),Q=o.convert(V.type),vt=S(V.internalFormat,ct,Q,V.colorSpace,x.isXRRenderTarget===!0),wt=pt(x);i.renderbufferStorageMultisample(i.RENDERBUFFER,wt,vt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,N.__webglColorRenderbuffer[z])}i.bindRenderbuffer(i.RENDERBUFFER,null),x.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),ut(N.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,_);for(let z=0;z<6;z++)if(_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)ht(N.__webglFramebuffer[z][V],x,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,V);else ht(N.__webglFramebuffer[z],x,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);m(_)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let z=0,V=X.length;z<V;z++){const ct=X[z],Q=n.get(ct);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),Vt(i.TEXTURE_2D,ct),ht(N.__webglFramebuffer,x,ct,i.COLOR_ATTACHMENT0+z,i.TEXTURE_2D,0),m(ct)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let z=i.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(z=x.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(z,B.__webglTexture),Vt(z,_),_.mipmaps&&_.mipmaps.length>0)for(let V=0;V<_.mipmaps.length;V++)ht(N.__webglFramebuffer[V],x,_,i.COLOR_ATTACHMENT0,z,V);else ht(N.__webglFramebuffer,x,_,i.COLOR_ATTACHMENT0,z,0);m(_)&&f(z),e.unbindTexture()}x.depthBuffer&&Lt(x)}function lt(x){const _=x.textures;for(let N=0,B=_.length;N<B;N++){const X=_[N];if(m(X)){const W=T(x),gt=n.get(X).__webglTexture;e.bindTexture(W,gt),f(W),e.unbindTexture()}}}const _t=[],E=[];function It(x){if(x.samples>0){if(mt(x)===!1){const _=x.textures,N=x.width,B=x.height;let X=i.COLOR_BUFFER_BIT;const W=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(x),z=_.length>1;if(z)for(let V=0;V<_.length;V++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let V=0;V<_.length;V++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[V]);const ct=n.get(_[V]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,N,B,0,0,N,B,X,i.NEAREST),c===!0&&(_t.length=0,E.length=0,_t.push(i.COLOR_ATTACHMENT0+V),x.depthBuffer&&x.resolveDepthBuffer===!1&&(_t.push(W),E.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,E)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),z)for(let V=0;V<_.length;V++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,gt.__webglColorRenderbuffer[V]);const ct=n.get(_[V]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&c){const _=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function pt(x){return Math.min(s.maxSamples,x.samples)}function mt(x){const _=n.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function F(x){const _=r.render.frame;h.get(x)!==_&&(h.set(x,_),x.update())}function st(x,_){const N=x.colorSpace,B=x.format,X=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||N!==ds&&N!==ii&&(ae.getTransfer(N)===ue?(B!==xn||X!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}function G(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(l.width=x.naturalWidth||x.width,l.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(l.width=x.displayWidth,l.height=x.displayHeight):(l.width=x.width,l.height=x.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=Y,this.setTexture2D=it,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=j,this.rebindTextures=Dt,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=mt}function Z0(i,t){function e(n,s=ii){let o;const r=ae.getTransfer(s);if(n===Xn)return i.UNSIGNED_BYTE;if(n===ma)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ga)return i.UNSIGNED_SHORT_5_5_5_1;if(n===cl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rl)return i.BYTE;if(n===al)return i.SHORT;if(n===Ls)return i.UNSIGNED_SHORT;if(n===pa)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===Si)return i.HALF_FLOAT;if(n===ll)return i.ALPHA;if(n===hl)return i.RGB;if(n===xn)return i.RGBA;if(n===ul)return i.LUMINANCE;if(n===dl)return i.LUMINANCE_ALPHA;if(n===ss)return i.DEPTH_COMPONENT;if(n===us)return i.DEPTH_STENCIL;if(n===_a)return i.RED;if(n===va)return i.RED_INTEGER;if(n===fl)return i.RG;if(n===xa)return i.RG_INTEGER;if(n===Ma)return i.RGBA_INTEGER;if(n===Mo||n===yo||n===So||n===wo)if(r===ue)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Mo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===So)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Mo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===So)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nr||n===Fr||n===Or||n===zr)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Nr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Or)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Br||n===kr||n===Hr)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Br||n===kr)return r===ue?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Hr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Gr||n===Vr||n===Wr||n===Xr||n===Yr||n===qr||n===Zr||n===Kr||n===jr||n===$r||n===Jr||n===Qr||n===ta||n===ea)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Gr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Kr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$r)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ta)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ea)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bo||n===na||n===ia)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===bo)return r===ue?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===na)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ia)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pl||n===sa||n===oa||n===ra)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===bo)return o.COMPRESSED_RED_RGTC1_EXT;if(n===sa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ra)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const K0={type:"move"};class xr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(K0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const j0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class J0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new We,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Mn({vertexShader:j0,fragmentShader:$0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new A(new Ne(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Q0 extends Ti{constructor(t,e){super();const n=this;let s=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const v=new J0,m=e.getContextAttributes();let f=null,T=null;const S=[],M=[],L=new Pt;let R=null;const C=new gn;C.viewport=new Se;const P=new gn;P.viewport=new Se;const w=[C,P],y=new _d;let D=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let xt=S[nt];return xt===void 0&&(xt=new xr,S[nt]=xt),xt.getTargetRaySpace()},this.getControllerGrip=function(nt){let xt=S[nt];return xt===void 0&&(xt=new xr,S[nt]=xt),xt.getGripSpace()},this.getHand=function(nt){let xt=S[nt];return xt===void 0&&(xt=new xr,S[nt]=xt),xt.getHandSpace()};function H(nt){const xt=M.indexOf(nt.inputSource);if(xt===-1)return;const ht=S[xt];ht!==void 0&&(ht.update(nt.inputSource,nt.frame,l||r),ht.dispatchEvent({type:nt.type,data:nt.inputSource}))}function et(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",et),s.removeEventListener("inputsourceschange",it);for(let nt=0;nt<S.length;nt++){const xt=M[nt];xt!==null&&(M[nt]=null,S[nt].disconnect(xt))}D=null,Y=null,v.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,T=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){o=nt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(nt){l=nt},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(nt){if(s=nt,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",et),s.addEventListener("inputsourceschange",it),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(L),s.enabledFeatures!==void 0&&s.enabledFeatures.includes("layers")){let ht=null,ut=null,Tt=null;m.depth&&(Tt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=m.stencil?us:ss,ut=m.stencil?hs:yi);const Lt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:o};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Lt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new Yn(d.textureWidth,d.textureHeight,{format:xn,type:Xn,depthTexture:new Ll(d.textureWidth,d.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{const ht={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new Yn(p.framebufferWidth,p.framebufferHeight,{format:xn,type:Xn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(a),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function it(nt){for(let xt=0;xt<nt.removed.length;xt++){const ht=nt.removed[xt],ut=M.indexOf(ht);ut>=0&&(M[ut]=null,S[ut].disconnect(ht))}for(let xt=0;xt<nt.added.length;xt++){const ht=nt.added[xt];let ut=M.indexOf(ht);if(ut===-1){for(let Lt=0;Lt<S.length;Lt++)if(Lt>=M.length){M.push(ht),ut=Lt;break}else if(M[Lt]===null){M[Lt]=ht,ut=Lt;break}if(ut===-1)break}const Tt=S[ut];Tt&&Tt.connect(ht)}}const q=new I,$=new I;function j(nt,xt,ht){q.setFromMatrixPosition(xt.matrixWorld),$.setFromMatrixPosition(ht.matrixWorld);const ut=q.distanceTo($),Tt=xt.projectionMatrix.elements,Lt=ht.projectionMatrix.elements,Dt=Tt[14]/(Tt[10]-1),qt=Tt[14]/(Tt[10]+1),lt=(Tt[9]+1)/Tt[5],_t=(Tt[9]-1)/Tt[5],E=(Tt[8]-1)/Tt[0],It=(Lt[8]+1)/Lt[0],pt=Dt*E,mt=Dt*It,F=ut/(-E+It),st=F*-E;if(xt.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(st),nt.translateZ(F),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Tt[10]===-1)nt.projectionMatrix.copy(xt.projectionMatrix),nt.projectionMatrixInverse.copy(xt.projectionMatrixInverse);else{const G=Dt+F,x=qt+F,_=pt-st,N=mt+(ut-st),B=lt*qt/x*G,X=_t*qt/x*G;nt.projectionMatrix.makePerspective(_,N,B,X,G,x),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function yt(nt,xt){xt===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(xt.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(s===null)return;let xt=nt.near,ht=nt.far;v.texture!==null&&(v.depthNear>0&&(xt=v.depthNear),v.depthFar>0&&(ht=v.depthFar)),y.near=P.near=C.near=xt,y.far=P.far=C.far=ht,(D!==y.near||Y!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,Y=y.far),C.layers.mask=nt.layers.mask|2,P.layers.mask=nt.layers.mask|4,y.layers.mask=C.layers.mask|P.layers.mask;const ut=nt.parent,Tt=y.cameras;yt(y,ut);for(let Lt=0;Lt<Tt.length;Lt++)yt(Tt[Lt],ut);Tt.length===2?j(y,C,P):y.projectionMatrix.copy(C.projectionMatrix),Rt(nt,y,ut)};function Rt(nt,xt,ht){ht===null?nt.matrix.copy(xt.matrixWorld):(nt.matrix.copy(ht.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(xt.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(xt.projectionMatrix),nt.projectionMatrixInverse.copy(xt.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Is*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(nt){c=nt,d!==null&&(d.fixedFoveation=nt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=nt)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let ft=null;function Vt(nt,xt){if(h=xt.getViewerPose(l||r),g=xt,h!==null){const ht=h.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let ut=!1;ht.length!==y.cameras.length&&(y.cameras.length=0,ut=!0);for(let Lt=0;Lt<ht.length;Lt++){const Dt=ht[Lt];let qt=null;if(p!==null)qt=p.getViewport(Dt);else{const _t=u.getViewSubImage(d,Dt);qt=_t.viewport,Lt===0&&(t.setRenderTargetTextures(T,_t.colorTexture,d.ignoreDepthValues?void 0:_t.depthStencilTexture),t.setRenderTarget(T))}let lt=w[Lt];lt===void 0&&(lt=new gn,lt.layers.enable(Lt),lt.viewport=new Se,w[Lt]=lt),lt.matrix.fromArray(Dt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(Dt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(qt.x,qt.y,qt.width,qt.height),Lt===0&&(y.matrix.copy(lt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ut===!0&&y.cameras.push(lt)}const Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")){const Lt=u.getDepthInformation(ht[0]);Lt&&Lt.isValid&&Lt.texture&&v.init(t,Lt,s.renderState)}}for(let ht=0;ht<S.length;ht++){const ut=M[ht],Tt=S[ht];ut!==null&&Tt!==void 0&&Tt.update(ut,xt,l||r)}ft&&ft(nt,xt),xt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:xt}),g=null}const Jt=new Vl;Jt.setAnimationLoop(Vt),this.setAnimationLoop=function(nt){ft=nt},this.dispose=function(){}}}const mi=new qn,tg=new fe;function eg(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,El(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,T,S,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?o(m,f):f.isMeshToonMaterial?(o(m,f),u(m,f)):f.isMeshPhongMaterial?(o(m,f),h(m,f)):f.isMeshStandardMaterial?(o(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(o(m,f),g(m,f)):f.isMeshDepthMaterial?o(m,f):f.isMeshDistanceMaterial?(o(m,f),v(m,f)):f.isMeshNormalMaterial?o(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,T,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function o(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Je&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Je&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const T=t.get(f),S=T.envMap,M=T.envMapRotation;S&&(m.envMap.value=S,mi.copy(M),mi.x*=-1,mi.y*=-1,mi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),m.envMapRotation.value.setFromMatrix4(tg.makeRotationFromEuler(mi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,T,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Je&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const T=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ng(i,t,e,n){let s={},o={},r=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,S){const M=S.program;n.uniformBlockBinding(T,M)}function l(T,S){let M=s[T.id];M===void 0&&(g(T),M=h(T),s[T.id]=M,T.addEventListener("dispose",m));const L=S.program;n.updateUBOMapping(T,L);const R=t.render.frame;o[T.id]!==R&&(d(T),o[T.id]=R)}function h(T){const S=u();T.__bindingPointIndex=S;const M=i.createBuffer(),L=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,L,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,M),M}function u(){for(let T=0;T<a;T++)if(r.indexOf(T)===-1)return r.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const S=s[T.id],M=T.uniforms,L=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,C=M.length;R<C;R++){const P=Array.isArray(M[R])?M[R]:[M[R]];for(let w=0,y=P.length;w<y;w++){const D=P[w];if(p(D,R,w,L)===!0){const Y=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let et=0;for(let it=0;it<H.length;it++){const q=H[it],$=v(q);typeof q=="number"||typeof q=="boolean"?(D.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,Y+et,D.__data)):q.isMatrix3?(D.__data[0]=q.elements[0],D.__data[1]=q.elements[1],D.__data[2]=q.elements[2],D.__data[3]=0,D.__data[4]=q.elements[3],D.__data[5]=q.elements[4],D.__data[6]=q.elements[5],D.__data[7]=0,D.__data[8]=q.elements[6],D.__data[9]=q.elements[7],D.__data[10]=q.elements[8],D.__data[11]=0):(q.toArray(D.__data,et),et+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,S,M,L){const R=T.value,C=S+"_"+M;if(L[C]===void 0)return typeof R=="number"||typeof R=="boolean"?L[C]=R:L[C]=R.clone(),!0;{const P=L[C];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return L[C]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(T){const S=T.uniforms;let M=0;const L=16;for(let C=0,P=S.length;C<P;C++){const w=Array.isArray(S[C])?S[C]:[S[C]];for(let y=0,D=w.length;y<D;y++){const Y=w[y],H=Array.isArray(Y.value)?Y.value:[Y.value];for(let et=0,it=H.length;et<it;et++){const q=H[et],$=v(q),j=M%L,yt=j%$.boundary,Rt=j+yt;M+=yt,Rt!==0&&L-Rt<$.storage&&(M+=L-Rt),Y.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=M,M+=$.storage}}}const R=M%L;return R>0&&(M+=L-R),T.__size=M,T.__cache={},this}function v(T){const S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){const S=T.target;S.removeEventListener("dispose",m);const M=r.indexOf(S.__bindingPointIndex);r.splice(M,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete o[S.id]}function f(){for(const T in s)i.deleteBuffer(s[T]);r=[],s={},o={}}return{bind:c,update:l,dispose:f}}class ig{constructor(t={}){const{canvas:e=nu(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=r;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const T=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ke,this.toneMapping=ri,this.toneMappingExposure=1;const M=this;let L=!1,R=0,C=0,P=null,w=-1,y=null;const D=new Se,Y=new Se;let H=null;const et=new kt(0);let it=0,q=e.width,$=e.height,j=1,yt=null,Rt=null;const ft=new Se(0,0,q,$),Vt=new Se(0,0,q,$);let Jt=!1;const nt=new wa;let xt=!1,ht=!1;this.transmissionResolutionScale=1;const ut=new fe,Tt=new fe,Lt=new I,Dt=new Se,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function _t(){return P===null?j:1}let E=n;function It(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fa}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),E===null){const O="webgl2";if(E=It(O,b),E===null)throw It(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let pt,mt,F,st,G,x,_,N,B,X,W,gt,z,V,ct,Q,vt,wt,Mt,bt,Yt,Bt,$t,U;function St(){pt=new dm(E),pt.init(),Bt=new Z0(E,pt),mt=new rm(E,pt,t,Bt),F=new Y0(E,pt),mt.reverseDepthBuffer&&d&&F.buffers.depth.setReversed(!0),st=new mm(E),G=new I0,x=new q0(E,pt,F,G,mt,Bt,st),_=new cm(M),N=new um(M),B=new yd(E),$t=new sm(E,B),X=new fm(E,B,st,$t),W=new _m(E,X,B,st),Mt=new gm(E,mt,x),Q=new am(G),gt=new L0(M,_,N,pt,mt,$t,Q),z=new eg(M,G),V=new N0,ct=new H0(pt),wt=new im(M,_,N,F,W,p,c),vt=new W0(M,W,mt),U=new ng(E,st,mt,F),bt=new om(E,pt,st),Yt=new pm(E,pt,st),st.programs=gt.programs,M.capabilities=mt,M.extensions=pt,M.properties=G,M.renderLists=V,M.shadowMap=vt,M.state=F,M.info=st}St();const tt=new Q0(M,E);this.xr=tt,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const b=pt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=pt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(q,$,!1))},this.getSize=function(b){return b.set(q,$)},this.setSize=function(b,O,K=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=b,$=O,e.width=Math.floor(b*j),e.height=Math.floor(O*j),K===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(q*j,$*j).floor()},this.setDrawingBufferSize=function(b,O,K){q=b,$=O,j=K,e.width=Math.floor(b*K),e.height=Math.floor(O*K),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(ft)},this.setViewport=function(b,O,K,J){b.isVector4?ft.set(b.x,b.y,b.z,b.w):ft.set(b,O,K,J),F.viewport(D.copy(ft).multiplyScalar(j).round())},this.getScissor=function(b){return b.copy(Vt)},this.setScissor=function(b,O,K,J){b.isVector4?Vt.set(b.x,b.y,b.z,b.w):Vt.set(b,O,K,J),F.scissor(Y.copy(Vt).multiplyScalar(j).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(b){F.setScissorTest(Jt=b)},this.setOpaqueSort=function(b){yt=b},this.setTransparentSort=function(b){Rt=b},this.getClearColor=function(b){return b.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor.apply(wt,arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha.apply(wt,arguments)},this.clear=function(b=!0,O=!0,K=!0){let J=0;if(b){let k=!1;if(P!==null){const At=P.texture.format;k=At===Ma||At===xa||At===va}if(k){const At=P.texture.type,Ft=At===Xn||At===yi||At===Ls||At===hs||At===ma||At===ga,zt=wt.getClearColor(),Ct=wt.getClearAlpha(),Gt=zt.r,Xt=zt.g,Wt=zt.b;Ft?(g[0]=Gt,g[1]=Xt,g[2]=Wt,g[3]=Ct,E.clearBufferuiv(E.COLOR,0,g)):(v[0]=Gt,v[1]=Xt,v[2]=Wt,v[3]=Ct,E.clearBufferiv(E.COLOR,0,v))}else J|=E.COLOR_BUFFER_BIT}O&&(J|=E.DEPTH_BUFFER_BIT),K&&(J|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),wt.dispose(),V.dispose(),ct.dispose(),G.dispose(),_.dispose(),N.dispose(),W.dispose(),$t.dispose(),U.dispose(),gt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Ee),tt.removeEventListener("sessionend",ce),Xe.stop()};function Z(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const b=st.autoReset,O=vt.enabled,K=vt.autoUpdate,J=vt.needsUpdate,k=vt.type;St(),st.autoReset=b,vt.enabled=O,vt.autoUpdate=K,vt.needsUpdate=J,vt.type=k}function Et(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ot(b){const O=b.target;O.removeEventListener("dispose",ot),rt(O)}function rt(b){Ht(b),G.remove(b)}function Ht(b){const O=G.get(b).programs;O!==void 0&&(O.forEach(function(K){gt.releaseProgram(K)}),b.isShaderMaterial&&gt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,K,J,k,At){O===null&&(O=qt);const Ft=k.isMesh&&k.matrixWorld.determinant()<0,zt=gs(b,O,K,J,k);F.setMaterial(J,Ft);let Ct=K.index,Gt=1;if(J.wireframe===!0){if(Ct=X.getWireframeAttribute(K),Ct===void 0)return;Gt=2}const Xt=K.drawRange,Wt=K.attributes.position;let se=Xt.start*Gt,re=(Xt.start+Xt.count)*Gt;At!==null&&(se=Math.max(se,At.start*Gt),re=Math.min(re,(At.start+At.count)*Gt)),Ct!==null?(se=Math.max(se,0),re=Math.min(re,Ct.count)):Wt!=null&&(se=Math.max(se,0),re=Math.min(re,Wt.count));const Me=re-se;if(Me<0||Me===1/0)return;$t.setup(k,J,zt,K,Ct);let ve,oe=bt;if(Ct!==null&&(ve=B.get(Ct),oe=Yt,oe.setIndex(ve)),k.isMesh)J.wireframe===!0?(F.setLineWidth(J.wireframeLinewidth*_t()),oe.setMode(E.LINES)):oe.setMode(E.TRIANGLES);else if(k.isLine){let Kt=J.linewidth;Kt===void 0&&(Kt=1),F.setLineWidth(Kt*_t()),k.isLineSegments?oe.setMode(E.LINES):k.isLineLoop?oe.setMode(E.LINE_LOOP):oe.setMode(E.LINE_STRIP)}else k.isPoints?oe.setMode(E.POINTS):k.isSprite&&oe.setMode(E.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)oe.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))oe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Kt=k._multiDrawStarts,Oe=k._multiDrawCounts,he=k._multiDrawCount,Sn=Ct?B.get(Ct).bytesPerElement:1,Ni=G.get(J).currentProgram.getUniforms();for(let nn=0;nn<he;nn++)Ni.setValue(E,"_gl_DrawID",nn),oe.render(Kt[nn]/Sn,Oe[nn])}else if(k.isInstancedMesh)oe.renderInstances(se,Me,k.count);else if(K.isInstancedBufferGeometry){const Kt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Oe=Math.min(K.instanceCount,Kt);oe.renderInstances(se,Me,Oe)}else oe.render(se,Me)};function Ut(b,O,K){b.transparent===!0&&b.side===Ve&&b.forceSinglePass===!1?(b.side=Je,b.needsUpdate=!0,le(b,O,K),b.side=Wn,b.needsUpdate=!0,le(b,O,K),b.side=Ve):le(b,O,K)}this.compile=function(b,O,K=null){K===null&&(K=b),f=ct.get(K),f.init(O),S.push(f),K.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),b!==K&&b.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),f.setupLights();const J=new Set;return b.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const At=k.material;if(At)if(Array.isArray(At))for(let Ft=0;Ft<At.length;Ft++){const zt=At[Ft];Ut(zt,K,k),J.add(zt)}else Ut(At,K,k),J.add(At)}),S.pop(),f=null,J},this.compileAsync=function(b,O,K=null){const J=this.compile(b,O,K);return new Promise(k=>{function At(){if(J.forEach(function(Ft){G.get(Ft).currentProgram.isReady()&&J.delete(Ft)}),J.size===0){k(b);return}setTimeout(At,10)}pt.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let te=null;function me(b){te&&te(b)}function Ee(){Xe.stop()}function ce(){Xe.start()}const Xe=new Vl;Xe.setAnimationLoop(me),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(b){te=b,tt.setAnimationLoop(b),b===null?Xe.stop():Xe.start()},tt.addEventListener("sessionstart",Ee),tt.addEventListener("sessionend",ce),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(O),O=tt.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,O,P),f=ct.get(b,S.length),f.init(O),S.push(f),Tt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),nt.setFromProjectionMatrix(Tt),ht=this.localClippingEnabled,xt=Q.init(this.clippingPlanes,ht),m=V.get(b,T.length),m.init(),T.push(m),tt.enabled===!0&&tt.isPresenting===!0){const At=M.xr.getDepthSensingMesh();At!==null&&tn(At,O,-1/0,M.sortObjects)}tn(b,O,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(yt,Rt),lt=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,lt&&wt.addToRenderList(m,b),this.info.render.frame++,xt===!0&&Q.beginShadows();const K=f.state.shadowsArray;vt.render(K,b,O),xt===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,k=m.transmissive;if(f.setupLights(),O.isArrayCamera){const At=O.cameras;if(k.length>0)for(let Ft=0,zt=At.length;Ft<zt;Ft++){const Ct=At[Ft];Ln(J,k,b,Ct)}lt&&wt.render(b);for(let Ft=0,zt=At.length;Ft<zt;Ft++){const Ct=At[Ft];Fe(m,b,Ct,Ct.viewport)}}else k.length>0&&Ln(J,k,b,O),lt&&wt.render(b),Fe(m,b,O);P!==null&&C===0&&(x.updateMultisampleRenderTarget(P),x.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(M,b,O),$t.resetDefaultState(),w=-1,y=null,S.pop(),S.length>0?(f=S[S.length-1],xt===!0&&Q.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function tn(b,O,K,J){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)K=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||nt.intersectsSprite(b)){J&&Dt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Tt);const Ft=W.update(b),zt=b.material;zt.visible&&m.push(b,Ft,zt,K,Dt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||nt.intersectsObject(b))){const Ft=W.update(b),zt=b.material;if(J&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Dt.copy(b.boundingSphere.center)):(Ft.boundingSphere===null&&Ft.computeBoundingSphere(),Dt.copy(Ft.boundingSphere.center)),Dt.applyMatrix4(b.matrixWorld).applyMatrix4(Tt)),Array.isArray(zt)){const Ct=Ft.groups;for(let Gt=0,Xt=Ct.length;Gt<Xt;Gt++){const Wt=Ct[Gt],se=zt[Wt.materialIndex];se&&se.visible&&m.push(b,Ft,se,K,Dt.z,Wt)}}else zt.visible&&m.push(b,Ft,zt,K,Dt.z,null)}}const At=b.children;for(let Ft=0,zt=At.length;Ft<zt;Ft++)tn(At[Ft],O,K,J)}function Fe(b,O,K,J){const k=b.opaque,At=b.transmissive,Ft=b.transparent;f.setupLightsView(K),xt===!0&&Q.setGlobalState(M.clippingPlanes,K),J&&F.viewport(D.copy(J)),k.length>0&&we(k,O,K),At.length>0&&we(At,O,K),Ft.length>0&&we(Ft,O,K),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Ln(b,O,K,J){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[J.id]===void 0&&(f.state.transmissionRenderTarget[J.id]=new Yn(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?Si:Xn,minFilter:Mi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const At=f.state.transmissionRenderTarget[J.id],Ft=J.viewport||D;At.setSize(Ft.z*M.transmissionResolutionScale,Ft.w*M.transmissionResolutionScale);const zt=M.getRenderTarget();M.setRenderTarget(At),M.getClearColor(et),it=M.getClearAlpha(),it<1&&M.setClearColor(16777215,.5),M.clear(),lt&&wt.render(K);const Ct=M.toneMapping;M.toneMapping=ri;const Gt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),f.setupLightsView(J),xt===!0&&Q.setGlobalState(M.clippingPlanes,J),we(b,K,J),x.updateMultisampleRenderTarget(At),x.updateRenderTargetMipmap(At),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Wt=0,se=O.length;Wt<se;Wt++){const re=O[Wt],Me=re.object,ve=re.geometry,oe=re.material,Kt=re.group;if(oe.side===Ve&&Me.layers.test(J.layers)){const Oe=oe.side;oe.side=Je,oe.needsUpdate=!0,ge(Me,K,J,ve,oe,Kt),oe.side=Oe,oe.needsUpdate=!0,Xt=!0}}Xt===!0&&(x.updateMultisampleRenderTarget(At),x.updateRenderTargetMipmap(At))}M.setRenderTarget(zt),M.setClearColor(et,it),Gt!==void 0&&(J.viewport=Gt),M.toneMapping=Ct}function we(b,O,K){const J=O.isScene===!0?O.overrideMaterial:null;for(let k=0,At=b.length;k<At;k++){const Ft=b[k],zt=Ft.object,Ct=Ft.geometry,Gt=J===null?Ft.material:J,Xt=Ft.group;zt.layers.test(K.layers)&&ge(zt,O,K,Ct,Gt,Xt)}}function ge(b,O,K,J,k,At){b.onBeforeRender(M,O,K,J,k,At),b.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(M,O,K,J,b,At),k.transparent===!0&&k.side===Ve&&k.forceSinglePass===!1?(k.side=Je,k.needsUpdate=!0,M.renderBufferDirect(K,O,J,k,b,At),k.side=Wn,k.needsUpdate=!0,M.renderBufferDirect(K,O,J,k,b,At),k.side=Ve):M.renderBufferDirect(K,O,J,k,b,At),b.onAfterRender(M,O,K,J,k,At)}function le(b,O,K){O.isScene!==!0&&(O=qt);const J=G.get(b),k=f.state.lights,At=f.state.shadowsArray,Ft=k.state.version,zt=gt.getParameters(b,k.state,At,O,K),Ct=gt.getProgramCacheKey(zt);let Gt=J.programs;J.environment=b.isMeshStandardMaterial?O.environment:null,J.fog=O.fog,J.envMap=(b.isMeshStandardMaterial?N:_).get(b.envMap||J.environment),J.envMapRotation=J.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Gt===void 0&&(b.addEventListener("dispose",ot),Gt=new Map,J.programs=Gt);let Xt=Gt.get(Ct);if(Xt!==void 0){if(J.currentProgram===Xt&&J.lightsStateVersion===Ft)return en(b,zt),Xt}else zt.uniforms=gt.getUniforms(b),b.onBeforeCompile(zt,M),Xt=gt.acquireProgram(zt,Ct),Gt.set(Ct,Xt),J.uniforms=zt.uniforms;const Wt=J.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Wt.clippingPlanes=Q.uniform),en(b,zt),J.needsLights=ci(b),J.lightsStateVersion=Ft,J.needsLights&&(Wt.ambientLightColor.value=k.state.ambient,Wt.lightProbe.value=k.state.probe,Wt.directionalLights.value=k.state.directional,Wt.directionalLightShadows.value=k.state.directionalShadow,Wt.spotLights.value=k.state.spot,Wt.spotLightShadows.value=k.state.spotShadow,Wt.rectAreaLights.value=k.state.rectArea,Wt.ltc_1.value=k.state.rectAreaLTC1,Wt.ltc_2.value=k.state.rectAreaLTC2,Wt.pointLights.value=k.state.point,Wt.pointLightShadows.value=k.state.pointShadow,Wt.hemisphereLights.value=k.state.hemi,Wt.directionalShadowMap.value=k.state.directionalShadowMap,Wt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Wt.spotShadowMap.value=k.state.spotShadowMap,Wt.spotLightMatrix.value=k.state.spotLightMatrix,Wt.spotLightMap.value=k.state.spotLightMap,Wt.pointShadowMap.value=k.state.pointShadowMap,Wt.pointShadowMatrix.value=k.state.pointShadowMatrix),J.currentProgram=Xt,J.uniformsList=null,Xt}function pe(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Eo.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function en(b,O){const K=G.get(b);K.outputColorSpace=O.outputColorSpace,K.batching=O.batching,K.batchingColor=O.batchingColor,K.instancing=O.instancing,K.instancingColor=O.instancingColor,K.instancingMorph=O.instancingMorph,K.skinning=O.skinning,K.morphTargets=O.morphTargets,K.morphNormals=O.morphNormals,K.morphColors=O.morphColors,K.morphTargetsCount=O.morphTargetsCount,K.numClippingPlanes=O.numClippingPlanes,K.numIntersection=O.numClipIntersection,K.vertexAlphas=O.vertexAlphas,K.vertexTangents=O.vertexTangents,K.toneMapping=O.toneMapping}function gs(b,O,K,J,k){O.isScene!==!0&&(O=qt),x.resetTextureUnits();const At=O.fog,Ft=J.isMeshStandardMaterial?O.environment:null,zt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ds,Ct=(J.isMeshStandardMaterial?N:_).get(J.envMap||Ft),Gt=J.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Xt=!!K.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Wt=!!K.morphAttributes.position,se=!!K.morphAttributes.normal,re=!!K.morphAttributes.color;let Me=ri;J.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Me=M.toneMapping);const ve=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,oe=ve!==void 0?ve.length:0,Kt=G.get(J),Oe=f.state.lights;if(xt===!0&&(ht===!0||b!==y)){const Ye=b===y&&J.id===w;Q.setState(J,b,Ye)}let he=!1;J.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Oe.state.version||Kt.outputColorSpace!==zt||k.isBatchedMesh&&Kt.batching===!1||!k.isBatchedMesh&&Kt.batching===!0||k.isBatchedMesh&&Kt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Kt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Kt.instancing===!1||!k.isInstancedMesh&&Kt.instancing===!0||k.isSkinnedMesh&&Kt.skinning===!1||!k.isSkinnedMesh&&Kt.skinning===!0||k.isInstancedMesh&&Kt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Kt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Kt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Kt.instancingMorph===!1&&k.morphTexture!==null||Kt.envMap!==Ct||J.fog===!0&&Kt.fog!==At||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Q.numPlanes||Kt.numIntersection!==Q.numIntersection)||Kt.vertexAlphas!==Gt||Kt.vertexTangents!==Xt||Kt.morphTargets!==Wt||Kt.morphNormals!==se||Kt.morphColors!==re||Kt.toneMapping!==Me||Kt.morphTargetsCount!==oe)&&(he=!0):(he=!0,Kt.__version=J.version);let Sn=Kt.currentProgram;he===!0&&(Sn=le(J,O,k));let Ni=!1,nn=!1,_s=!1;const xe=Sn.getUniforms(),fn=Kt.uniforms;if(F.useProgram(Sn.program)&&(Ni=!0,nn=!0,_s=!0),J.id!==w&&(w=J.id,nn=!0),Ni||y!==b){F.buffers.depth.getReversed()?(ut.copy(b.projectionMatrix),su(ut),ou(ut),xe.setValue(E,"projectionMatrix",ut)):xe.setValue(E,"projectionMatrix",b.projectionMatrix),xe.setValue(E,"viewMatrix",b.matrixWorldInverse);const je=xe.map.cameraPosition;je!==void 0&&je.setValue(E,Lt.setFromMatrixPosition(b.matrixWorld)),mt.logarithmicDepthBuffer&&xe.setValue(E,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&xe.setValue(E,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,nn=!0,_s=!0)}if(k.isSkinnedMesh){xe.setOptional(E,k,"bindMatrix"),xe.setOptional(E,k,"bindMatrixInverse");const Ye=k.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),xe.setValue(E,"boneTexture",Ye.boneTexture,x))}k.isBatchedMesh&&(xe.setOptional(E,k,"batchingTexture"),xe.setValue(E,"batchingTexture",k._matricesTexture,x),xe.setOptional(E,k,"batchingIdTexture"),xe.setValue(E,"batchingIdTexture",k._indirectTexture,x),xe.setOptional(E,k,"batchingColorTexture"),k._colorsTexture!==null&&xe.setValue(E,"batchingColorTexture",k._colorsTexture,x));const pn=K.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&Mt.update(k,K,Sn),(nn||Kt.receiveShadow!==k.receiveShadow)&&(Kt.receiveShadow=k.receiveShadow,xe.setValue(E,"receiveShadow",k.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(fn.envMap.value=Ct,fn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&O.environment!==null&&(fn.envMapIntensity.value=O.environmentIntensity),nn&&(xe.setValue(E,"toneMappingExposure",M.toneMappingExposure),Kt.needsLights&&Bs(fn,_s),At&&J.fog===!0&&z.refreshFogUniforms(fn,At),z.refreshMaterialUniforms(fn,J,j,$,f.state.transmissionRenderTarget[b.id]),Eo.upload(E,pe(Kt),fn,x)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Eo.upload(E,pe(Kt),fn,x),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&xe.setValue(E,"center",k.center),xe.setValue(E,"modelViewMatrix",k.modelViewMatrix),xe.setValue(E,"normalMatrix",k.normalMatrix),xe.setValue(E,"modelMatrix",k.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Ye=J.uniformsGroups;for(let je=0,ko=Ye.length;je<ko;je++){const li=Ye[je];U.update(li,Sn),U.bind(li,Sn)}}return Sn}function Bs(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function ci(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,O,K){G.get(b.texture).__webglTexture=O,G.get(b.depthTexture).__webglTexture=K;const J=G.get(b);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=K===void 0,J.__autoAllocateDepthBuffer||pt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,O){const K=G.get(b);K.__webglFramebuffer=O,K.__useDefaultFramebuffer=O===void 0};const Li=E.createFramebuffer();this.setRenderTarget=function(b,O=0,K=0){P=b,R=O,C=K;let J=!0,k=null,At=!1,Ft=!1;if(b){const Ct=G.get(b);if(Ct.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(E.FRAMEBUFFER,null),J=!1;else if(Ct.__webglFramebuffer===void 0)x.setupRenderTarget(b);else if(Ct.__hasExternalTextures)x.rebindTextures(b,G.get(b.texture).__webglTexture,G.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Wt=b.depthTexture;if(Ct.__boundDepthTexture!==Wt){if(Wt!==null&&G.has(Wt)&&(b.width!==Wt.image.width||b.height!==Wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(b)}}const Gt=b.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(Ft=!0);const Xt=G.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xt[O])?k=Xt[O][K]:k=Xt[O],At=!0):b.samples>0&&x.useMultisampledRTT(b)===!1?k=G.get(b).__webglMultisampledFramebuffer:Array.isArray(Xt)?k=Xt[K]:k=Xt,D.copy(b.viewport),Y.copy(b.scissor),H=b.scissorTest}else D.copy(ft).multiplyScalar(j).floor(),Y.copy(Vt).multiplyScalar(j).floor(),H=Jt;if(K!==0&&(k=Li),F.bindFramebuffer(E.FRAMEBUFFER,k)&&J&&F.drawBuffers(b,k),F.viewport(D),F.scissor(Y),F.setScissorTest(H),At){const Ct=G.get(b.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ct.__webglTexture,K)}else if(Ft){const Ct=G.get(b.texture),Gt=O;E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,Ct.__webglTexture,K,Gt)}else if(b!==null&&K!==0){const Ct=G.get(b.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Ct.__webglTexture,K)}w=-1},this.readRenderTargetPixels=function(b,O,K,J,k,At,Ft){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ft!==void 0&&(zt=zt[Ft]),zt){F.bindFramebuffer(E.FRAMEBUFFER,zt);try{const Ct=b.texture,Gt=Ct.format,Xt=Ct.type;if(!mt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!mt.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-J&&K>=0&&K<=b.height-k&&E.readPixels(O,K,J,k,Bt.convert(Gt),Bt.convert(Xt),At)}finally{const Ct=P!==null?G.get(P).__webglFramebuffer:null;F.bindFramebuffer(E.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(b,O,K,J,k,At,Ft){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ft!==void 0&&(zt=zt[Ft]),zt){const Ct=b.texture,Gt=Ct.format,Xt=Ct.type;if(!mt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!mt.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=b.width-J&&K>=0&&K<=b.height-k){F.bindFramebuffer(E.FRAMEBUFFER,zt);const Wt=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Wt),E.bufferData(E.PIXEL_PACK_BUFFER,At.byteLength,E.STREAM_READ),E.readPixels(O,K,J,k,Bt.convert(Gt),Bt.convert(Xt),0);const se=P!==null?G.get(P).__webglFramebuffer:null;F.bindFramebuffer(E.FRAMEBUFFER,se);const re=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await iu(E,re,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Wt),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,At),E.deleteBuffer(Wt),E.deleteSync(re),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,O=null,K=0){b.isTexture!==!0&&(Ji("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,b=arguments[1]);const J=Math.pow(2,-K),k=Math.floor(b.image.width*J),At=Math.floor(b.image.height*J),Ft=O!==null?O.x:0,zt=O!==null?O.y:0;x.setTexture2D(b,0),E.copyTexSubImage2D(E.TEXTURE_2D,K,0,0,Ft,zt,k,At),F.unbindTexture()};const Ii=E.createFramebuffer(),Ui=E.createFramebuffer();this.copyTextureToTexture=function(b,O,K=null,J=null,k=0,At=null){b.isTexture!==!0&&(Ji("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,b=arguments[1],O=arguments[2],At=arguments[3]||0,K=null),At===null&&(k!==0?(Ji("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),At=k,k=0):At=0);let Ft,zt,Ct,Gt,Xt,Wt,se,re,Me;const ve=b.isCompressedTexture?b.mipmaps[At]:b.image;if(K!==null)Ft=K.max.x-K.min.x,zt=K.max.y-K.min.y,Ct=K.isBox3?K.max.z-K.min.z:1,Gt=K.min.x,Xt=K.min.y,Wt=K.isBox3?K.min.z:0;else{const pn=Math.pow(2,-k);Ft=Math.floor(ve.width*pn),zt=Math.floor(ve.height*pn),b.isDataArrayTexture?Ct=ve.depth:b.isData3DTexture?Ct=Math.floor(ve.depth*pn):Ct=1,Gt=0,Xt=0,Wt=0}J!==null?(se=J.x,re=J.y,Me=J.z):(se=0,re=0,Me=0);const oe=Bt.convert(O.format),Kt=Bt.convert(O.type);let Oe;O.isData3DTexture?(x.setTexture3D(O,0),Oe=E.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(x.setTexture2DArray(O,0),Oe=E.TEXTURE_2D_ARRAY):(x.setTexture2D(O,0),Oe=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,O.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,O.unpackAlignment);const he=E.getParameter(E.UNPACK_ROW_LENGTH),Sn=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Ni=E.getParameter(E.UNPACK_SKIP_PIXELS),nn=E.getParameter(E.UNPACK_SKIP_ROWS),_s=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,ve.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,ve.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Gt),E.pixelStorei(E.UNPACK_SKIP_ROWS,Xt),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Wt);const xe=b.isDataArrayTexture||b.isData3DTexture,fn=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const pn=G.get(b),Ye=G.get(O),je=G.get(pn.__renderTarget),ko=G.get(Ye.__renderTarget);F.bindFramebuffer(E.READ_FRAMEBUFFER,je.__webglFramebuffer),F.bindFramebuffer(E.DRAW_FRAMEBUFFER,ko.__webglFramebuffer);for(let li=0;li<Ct;li++)xe&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,G.get(b).__webglTexture,k,Wt+li),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,G.get(O).__webglTexture,At,Me+li)),E.blitFramebuffer(Gt,Xt,Ft,zt,se,re,Ft,zt,E.DEPTH_BUFFER_BIT,E.NEAREST);F.bindFramebuffer(E.READ_FRAMEBUFFER,null),F.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(k!==0||b.isRenderTargetTexture||G.has(b)){const pn=G.get(b),Ye=G.get(O);F.bindFramebuffer(E.READ_FRAMEBUFFER,Ii),F.bindFramebuffer(E.DRAW_FRAMEBUFFER,Ui);for(let je=0;je<Ct;je++)xe?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,pn.__webglTexture,k,Wt+je):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,pn.__webglTexture,k),fn?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Ye.__webglTexture,At,Me+je):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Ye.__webglTexture,At),k!==0?E.blitFramebuffer(Gt,Xt,Ft,zt,se,re,Ft,zt,E.COLOR_BUFFER_BIT,E.NEAREST):fn?E.copyTexSubImage3D(Oe,At,se,re,Me+je,Gt,Xt,Ft,zt):E.copyTexSubImage2D(Oe,At,se,re,Gt,Xt,Ft,zt);F.bindFramebuffer(E.READ_FRAMEBUFFER,null),F.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else fn?b.isDataTexture||b.isData3DTexture?E.texSubImage3D(Oe,At,se,re,Me,Ft,zt,Ct,oe,Kt,ve.data):O.isCompressedArrayTexture?E.compressedTexSubImage3D(Oe,At,se,re,Me,Ft,zt,Ct,oe,ve.data):E.texSubImage3D(Oe,At,se,re,Me,Ft,zt,Ct,oe,Kt,ve):b.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,At,se,re,Ft,zt,oe,Kt,ve.data):b.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,At,se,re,ve.width,ve.height,oe,ve.data):E.texSubImage2D(E.TEXTURE_2D,At,se,re,Ft,zt,oe,Kt,ve);E.pixelStorei(E.UNPACK_ROW_LENGTH,he),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Sn),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ni),E.pixelStorei(E.UNPACK_SKIP_ROWS,nn),E.pixelStorei(E.UNPACK_SKIP_IMAGES,_s),At===0&&O.generateMipmaps&&E.generateMipmap(Oe),F.unbindTexture()},this.copyTextureToTexture3D=function(b,O,K=null,J=null,k=0){return b.isTexture!==!0&&(Ji("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,J=arguments[1]||null,b=arguments[2],O=arguments[3],k=arguments[4]||0),Ji('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,K,J,k)},this.initRenderTarget=function(b){G.get(b).__webglFramebuffer===void 0&&x.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?x.setTextureCube(b,0):b.isData3DTexture?x.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?x.setTexture2DArray(b,0):x.setTexture2D(b,0),F.unbindTexture()},this.resetState=function(){R=0,C=0,P=null,F.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}const Kc={type:"change"},Pa={type:"start"},Zl={type:"end"},go=new Uo,jc=new ni,sg=Math.cos(70*Be.DEG2RAD),Pe=new I,$e=2*Math.PI,de={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Mr=1e-6;class og extends xd{constructor(t,e=null){super(t,e),this.state=de.NONE,this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ns.ROTATE,MIDDLE:ns.DOLLY,RIGHT:ns.PAN},this.touches={ONE:Qi.ROTATE,TWO:Qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new wi,this._lastTargetPosition=new I,this._quat=new wi().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wc,this._sphericalDelta=new wc,this._scale=1,this._panOffset=new I,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new I,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ag.bind(this),this._onPointerDown=rg.bind(this),this._onPointerUp=cg.bind(this),this._onContextMenu=mg.bind(this),this._onMouseWheel=ug.bind(this),this._onKeyDown=dg.bind(this),this._onTouchStart=fg.bind(this),this._onTouchMove=pg.bind(this),this._onMouseDown=lg.bind(this),this._onMouseMove=hg.bind(this),this._interceptControlDown=gg.bind(this),this._interceptControlUp=_g.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Kc),this.update(),this.state=de.NONE}update(t=null){const e=this.object.position;Pe.copy(e).sub(this.target),Pe.applyQuaternion(this._quat),this._spherical.setFromVector3(Pe),this.autoRotate&&this.state===de.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=$e:n>Math.PI&&(n-=$e),s<-Math.PI?s+=$e:s>Math.PI&&(s-=$e),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=r!=this._spherical.radius}if(Pe.setFromSpherical(this._spherical),Pe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Pe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=Pe.length();r=this._clampDistance(a*this._scale);const c=a-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),o=!!c}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=c!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),r=Pe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(go.origin.copy(this.object.position),go.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(go.direction))<sg?this.object.lookAt(this.target):(jc.setFromNormalAndCoplanarPoint(this.object.up,this.target),go.intersectPlane(jc,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Mr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Mr||this._lastTargetPosition.distanceToSquared(this.target)>Mr?(this.dispatchEvent(Kc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?$e/60*this.autoRotateSpeed*t:$e/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Pe.setFromMatrixColumn(e,0),Pe.multiplyScalar(-t),this._panOffset.add(Pe)}_panUp(t,e){this.screenSpacePanning===!0?Pe.setFromMatrixColumn(e,1):(Pe.setFromMatrixColumn(e,0),Pe.crossVectors(this.object.up,Pe)),Pe.multiplyScalar(t),this._panOffset.add(Pe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pe.copy(s).sub(this.target);let o=Pe.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*o/n.clientHeight,this.object.matrix),this._panUp(2*e*o/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,o=e-n.top,r=n.width,a=n.height;this._mouse.x=s/r*2-1,this._mouse.y=-(o/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp($e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-$e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft($e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-$e*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,o=Math.sqrt(n*n+s*s);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._rotateEnd.set(s,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,o=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function rg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ag(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function cg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Zl),this.state=de.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function lg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=de.DOLLY;break;case ns.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=de.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=de.ROTATE}break;case ns.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=de.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=de.PAN}break;default:this.state=de.NONE}this.state!==de.NONE&&this.dispatchEvent(Pa)}function hg(i){switch(this.state){case de.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case de.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case de.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ug(i){this.enabled===!1||this.enableZoom===!1||this.state!==de.NONE||(i.preventDefault(),this.dispatchEvent(Pa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Zl))}function dg(i){this.enabled!==!1&&this._handleKeyDown(i)}function fg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Qi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=de.TOUCH_ROTATE;break;case Qi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=de.TOUCH_PAN;break;default:this.state=de.NONE}break;case 2:switch(this.touches.TWO){case Qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=de.TOUCH_DOLLY_PAN;break;case Qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=de.TOUCH_DOLLY_ROTATE;break;default:this.state=de.NONE}break;default:this.state=de.NONE}this.state!==de.NONE&&this.dispatchEvent(Pa)}function pg(i){switch(this._trackPointer(i),this.state){case de.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case de.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case de.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case de.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=de.NONE}}function mg(i){this.enabled!==!1&&i.preventDefault()}function gg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _g(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const be={uTime:{value:0},uWindStrength:{value:1},uSnowAmount:{value:0},uWetness:{value:0},uGlowIntensity:{value:.35}},Zt={baseTrim:12761256,castleStoneAlt:13813683,castleTrim:12365981,retainingWall:11971482,castleRoofDeep:4085872,terracotta:12873036,smithyRoof:6773590,barnRoof:10377282,plasterCream:15853782,plasterOchre:15456696,plasterSage:14541775,plasterBlush:15455946,timberDark:7031605,timberMid:9266501,ironDark:4409426,grassMid:7576662,soilRich:9201736,pathDirt:13613457,wheatGold:15056472,wheatAmber:14000958,hayGold:14795118,waterShallow:7059650,waterDeep:4953e3,bannerCrimson:12996167,bannerBlue:4551582,bannerGold:15120716,windowGlow:16765562,forgeGlow:16743219,leafSun:9681507,leafMid:7314259,leafDeep:5470789,leafAutumn:13736014,pineGreen:5076049,trunkBark:7689533};let yr=null;function ms(){if(yr)return yr;const i=new Uint8Array([138,138,138,255,182,182,182,255,222,222,222,255,255,255,255,255]),t=new Rl(i,4,1,xn);return t.minFilter=De,t.magFilter=De,t.generateMipmaps=!1,t.needsUpdate=!0,yr=t,t}function ti(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function An(i,t,e=1,n=1){const s=document.createElement("canvas");s.width=i,s.height=i;const o=s.getContext("2d");t(o,i);const r=new zs(s);return r.wrapS=Ds,r.wrapT=Ds,r.repeat.set(e,n),r.colorSpace=Ke,r.anisotropy=4,r}const rn={};function zo(){return rn.ready||(rn.baseMasonry=An(256,(i,t)=>{const e=ti(101);i.fillStyle="#6c635c",i.fillRect(0,0,t,t);const n=8,s=t/n;for(let o=0;o<n;o++){const r=4+o%2;let c=-(o%2*(t/r)*.5);for(let l=0;l<=r+1;l++){const h=t/r+(e()-.5)*10,u=138+Math.floor((e()-.5)*26),d=Math.floor(e()*10);i.fillStyle=`rgb(${u+d}, ${u+d-5}, ${u-11})`,i.fillRect(c+2,o*s+2,h-4,s-4),i.fillStyle="rgba(255,250,240,0.16)",i.fillRect(c+2,o*s+2,h-4,3),i.fillStyle="rgba(40,32,28,0.14)",i.fillRect(c+2,(o+1)*s-5,h-4,3),c+=h}}},6,1.15),rn.castleStone=An(256,(i,t)=>{const e=ti(202);i.fillStyle="#bdb19f",i.fillRect(0,0,t,t);const n=8,s=t/n;for(let o=0;o<n;o++){const a=t/4,c=o%2*(a*.5);for(let l=-1;l<=4;l++){const h=216+Math.floor((e()-.5)*20);i.fillStyle=`rgb(${h+8}, ${h+1}, ${h-12})`,i.fillRect(l*a+c+1.5,o*s+1.5,a-3,s-3),i.fillStyle="rgba(255,252,244,0.18)",i.fillRect(l*a+c+1.5,o*s+1.5,a-3,2.5)}}},2,2),rn.retainingStone=An(256,(i,t)=>{const e=ti(303);i.fillStyle="#8d8376",i.fillRect(0,0,t,t);const n=6,s=t/n;for(let o=0;o<n;o++){const a=t/5,c=o%2*(a*.5);for(let l=-1;l<=5;l++){const h=178+Math.floor((e()-.5)*26);i.fillStyle=`rgb(${h+6}, ${h}, ${h-10})`,i.fillRect(l*a+c+2,o*s+2,a-4,s-4)}}},3,1),rn.slateRoof=An(256,(i,t)=>{const e=ti(404);i.fillStyle="#47627a",i.fillRect(0,0,t,t);const n=10,s=8,o=t/n,r=t/s;for(let a=0;a<n;a++){const c=a%2*(r*.5);for(let l=-1;l<=s;l++){const h=Math.floor((e()-.5)*18);i.fillStyle=`rgb(${78+h}, ${107+h}, ${134+h})`,i.fillRect(l*r+c+1,a*o+1,r-2,o-2),i.fillStyle="rgba(220,238,255,0.12)",i.fillRect(l*r+c+1,a*o+1,r-2,2)}}},2,2),rn.thatch=An(256,(i,t)=>{const e=ti(505);i.fillStyle="#d4ac5c",i.fillRect(0,0,t,t);for(let n=0;n<240;n++){const s=e()*t,o=e()*t,r=18+e()*34,a=2+e()*3;i.fillStyle=e()>.45?"rgba(244, 217, 138, 0.42)":"rgba(156, 114, 48, 0.34)",i.fillRect(s,o,a,r)}for(let n=32;n<t;n+=44)i.fillStyle="rgba(128, 92, 38, 0.22)",i.fillRect(0,n,t,4)},1.5,1.5),rn.cobble=An(256,(i,t)=>{const e=ti(606);i.fillStyle="#a99f8c",i.fillRect(0,0,t,t);const n=10,s=10,o=t/n,r=t/s;for(let a=0;a<n;a++){const c=a%2*(r*.5);for(let l=-1;l<=s;l++){const h=192+Math.floor((e()-.5)*26);i.fillStyle=`rgb(${h+8}, ${h+2}, ${h-10})`;const u=l*r+c+2,d=a*o+2;i.beginPath(),i.roundRect(u,d,r-4,o-4,4),i.fill()}}},3,3),rn.furrow=An(256,(i,t)=>{i.fillStyle="#7e5c3e",i.fillRect(0,0,t,t);const e=8,n=t/e;for(let s=0;s<e;s++){const o=s*n;i.fillStyle="#97724f",i.fillRect(0,o+3,t,n*.45),i.fillStyle="#684a31",i.fillRect(0,o+n*.68,t,n*.25)}},2,2),rn.grass=An(256,(i,t)=>{const e=ti(808);i.fillStyle="#83ab62",i.fillRect(0,0,t,t);for(let n=0;n<180;n++){const s=e()*t,o=e()*t,r=6+e()*18;i.fillStyle=e()>.5?"rgba(155, 194, 108, 0.28)":"rgba(98, 142, 74, 0.22)",i.beginPath(),i.arc(s,o,r,0,Math.PI*2),i.fill()}},4,4),rn.wood=An(256,(i,t)=>{const e=ti(909);i.fillStyle="#8b6343",i.fillRect(0,0,t,t);const n=6,s=t/n;for(let o=0;o<n;o++){const r=Math.floor((e()-.5)*18);i.fillStyle=`rgb(${139+r}, ${99+r}, ${67+r})`,i.fillRect(0,o*s+1,t,s-2),i.fillStyle="rgba(54, 34, 20, 0.26)",i.fillRect(0,(o+1)*s-2,t,2)}},1,1),rn.ready=!0),rn}function Nt({color:i=16777215,map:t=null,snowable:e=!0,snowThreshold:n=.52,emissive:s=0,emissiveIntensity:o=0,side:r=Wn,transparent:a=!1,opacity:c=1,vertexColors:l=!1}={}){const h=new Di({color:i,map:t,gradientMap:ms(),emissive:s,emissiveIntensity:o,side:r,transparent:a,opacity:c,vertexColors:l});return e&&(h.customProgramCacheKey=()=>`toon-snow-${n.toFixed(2)}`,h.onBeforeCompile=u=>{u.uniforms.uSnowAmount=be.uSnowAmount,u.uniforms.uWetness=be.uWetness,u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
           varying float vWorldUp;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
           vec3 snowObjNorm = objectNormal;
           #ifdef USE_INSTANCING
             vec3 snowWorldNorm = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * snowObjNorm);
           #else
             vec3 snowWorldNorm = normalize(mat3(modelMatrix) * snowObjNorm);
           #endif
           vWorldUp = snowWorldNorm.y;`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
           uniform float uSnowAmount;
           uniform float uWetness;
           varying float vWorldUp;`).replace("#include <map_fragment>",`#include <map_fragment>
           // Slight cool darkening when wet in rain
           diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.84, 0.87, 0.92), uWetness * 0.45);
           // Clean storybook snow cap on upward surfaces
           float snowMask = smoothstep(${(n-.12).toFixed(2)}, ${(n+.18).toFixed(2)}, vWorldUp) * uSnowAmount;
           diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.94, 0.96, 0.99), snowMask * 0.88);`)}),h}function Lo(i=Zt.windowGlow,t=.65){const e=new Di({color:i,emissive:i,emissiveIntensity:t,gradientMap:ms()});return e.userData.isGlowMaterial=!0,e.userData.baseGlow=t,e}function $c(i,t="solid"){const e=An(128,(s,o)=>{const r=new kt(i);s.fillStyle=`#${r.getHexString()}`,s.fillRect(0,0,o,o),t==="heraldic"?(s.fillStyle="#ebd07e",s.fillRect(0,o*.42,o,o*.16),s.fillRect(o*.24,0,o*.14,o),s.fillStyle="#f6ecd2",s.beginPath(),s.arc(o*.31,o*.5,o*.12,0,Math.PI*2),s.fill()):t==="stripe"&&(s.fillStyle="#f2e8d2",s.fillRect(0,o*.36,o,o*.28))});e.wrapS=Hn,e.wrapT=Hn;const n=new Di({map:e,gradientMap:ms(),side:Ve});return n.customProgramCacheKey=()=>"toon-flag-flutter",n.onBeforeCompile=s=>{s.uniforms.uTime=be.uTime,s.uniforms.uWindStrength=be.uWindStrength,s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
         uniform float uTime;
         uniform float uWindStrength;`).replace("#include <begin_vertex>",`#include <begin_vertex>
         // Assume flag extends along +X from x=0 (pole)
         float dist = clamp(position.x, 0.0, 2.0);
         float wave = sin(dist * 6.0 - uTime * (4.2 + uWindStrength * 2.4)) * 0.09 * dist * (0.65 + uWindStrength * 0.6);
         float wave2 = cos(dist * 10.0 - uTime * 6.5 + position.y * 4.0) * 0.025 * dist * uWindStrength;
         transformed.z += wave + wave2;
         transformed.y += sin(dist * 4.0 - uTime * 3.0) * 0.02 * dist;`)},n}class vg{constructor(t,e,n){this.renderer=t,this.scene=e,this.camera=n;const s=new Pt;t.getDrawingBufferSize(s);const o=Math.max(1,Math.floor(s.x)),r=Math.max(1,Math.floor(s.y));this.colorTarget=new Yn(o,r,{type:Si,samples:4,minFilter:vn,magFilter:vn}),this.normalDepthTarget=new Yn(o,r,{type:Si,samples:0,minFilter:De,magFilter:De}),this.normalDepthMaterial=new Mn({uniforms:{uNear:{value:n.near},uFar:{value:n.far}},vertexShader:`
        varying vec3 vViewNormal;
        varying float vLinDepth;
        uniform float uNear;
        uniform float uFar;
        void main() {
          vec3 n = normal;
          vec4 mvPos;
          #ifdef USE_INSTANCING
            n = mat3(instanceMatrix) * n;
            mvPos = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          #else
            mvPos = modelViewMatrix * vec4(position, 1.0);
          #endif
          vViewNormal = normalize(normalMatrix * n);
          vLinDepth = clamp((-mvPos.z - uNear) / (uFar - uNear), 0.0, 1.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        varying vec3 vViewNormal;
        varying float vLinDepth;
        void main() {
          gl_FragColor = vec4(normalize(vViewNormal) * 0.5 + 0.5, vLinDepth);
        }
      `}),this.postScene=new Cl,this.postCamera=new Ca(-1,1,1,-1,0,1),this.compositeMaterial=new Mn({uniforms:{tColor:{value:this.colorTarget.texture},tNormalDepth:{value:this.normalDepthTarget.texture},uTexelSize:{value:new Pt(1/o,1/r)},uInkColor:{value:new kt(3024171)},uInkStrength:{value:.68}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,fragmentShader:`
        uniform sampler2D tColor;
        uniform sampler2D tNormalDepth;
        uniform vec2 uTexelSize;
        uniform vec3 uInkColor;
        uniform float uInkStrength;
        varying vec2 vUv;

        void main() {
          vec4 baseCol = texture2D(tColor, vUv);
          vec4 ndC = texture2D(tNormalDepth, vUv);

          float edge = 0.0;

          // Only apply 3D ink outline when not masked by pixel characters (a < 0) and not sky (a >= 0.999)
          if (ndC.a >= 0.0) {
            vec2 o1 = vec2(uTexelSize.x, 0.0);
            vec2 o2 = vec2(0.0, uTexelSize.y);

            vec4 ndL = texture2D(tNormalDepth, vUv - o1);
            vec4 ndR = texture2D(tNormalDepth, vUv + o1);
            vec4 ndD = texture2D(tNormalDepth, vUv - o2);
            vec4 ndU = texture2D(tNormalDepth, vUv + o2);

            // Replace masked neighbors with center so pixel standees never create halos
            if (ndL.a < 0.0) ndL = ndC;
            if (ndR.a < 0.0) ndR = ndC;
            if (ndD.a < 0.0) ndD = ndC;
            if (ndU.a < 0.0) ndU = ndC;

            // Depth discontinuity (silhouette & overlapping geometry)
            float dEdgeX = abs(ndL.a - ndR.a);
            float dEdgeY = abs(ndD.a - ndU.a);
            float depthDiff = sqrt(dEdgeX * dEdgeX + dEdgeY * dEdgeY);
            float depthEdge = smoothstep(0.0055, 0.0155, depthDiff);

            // Normal discontinuity (architectural creases & beveled edges)
            vec3 nL = ndL.rgb * 2.0 - 1.0;
            vec3 nR = ndR.rgb * 2.0 - 1.0;
            vec3 nD = ndD.rgb * 2.0 - 1.0;
            vec3 nU = ndU.rgb * 2.0 - 1.0;
            float nDiff = length(nL - nR) + length(nD - nU);
            float normalEdge = smoothstep(0.42, 0.88, nDiff) * 0.72;

            // Suppress normal crease on pure sky pixels
            if (ndC.a > 0.995) {
              normalEdge = 0.0;
            }

            edge = clamp(max(depthEdge, normalEdge), 0.0, 1.0);
            // Distance softening so far silhouettes don't become overly thick
            float distFade = 1.0 - smoothstep(0.32, 0.85, ndC.a) * 0.42;
            edge *= distFade * uInkStrength;
          }

          vec3 finalCol = mix(baseCol.rgb, uInkColor, edge);
          gl_FragColor = vec4(finalCol, 1.0);

          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,depthTest:!1,depthWrite:!1});const a=new A(new Ne(2,2),this.compositeMaterial);this.postScene.add(a),this._hiddenDuringNormalPass=[],this._maskMeshes=[]}setInkStyle(t,e){this.compositeMaterial.uniforms.uInkColor.value.set(t),this.compositeMaterial.uniforms.uInkStrength.value=e}setSize(t,e,n){const s=Math.max(1,Math.floor(t*n)),o=Math.max(1,Math.floor(e*n));this.colorTarget.setSize(s,o),this.normalDepthTarget.setSize(s,o),this.compositeMaterial.uniforms.uTexelSize.value.set(1/s,1/o)}render(){const{renderer:t,scene:e,camera:n}=this;this.normalDepthMaterial.uniforms.uNear.value=n.near,this.normalDepthMaterial.uniforms.uFar.value=n.far,this._hiddenDuringNormalPass.length=0,this._maskMeshes.length=0,e.traverse(c=>{c.visible&&(c.userData.noOutline?(this._hiddenDuringNormalPass.push(c),c.visible=!1):c.userData.outlineMask&&(this._maskMeshes.push(c),c.visible=!1))});const s=e.background,o=e.fog,r=new kt;t.getClearColor(r);const a=t.getClearAlpha();if(e.background=null,e.fog=null,e.overrideMaterial=this.normalDepthMaterial,t.setRenderTarget(this.normalDepthTarget),t.setClearColor(new kt(.5,.5,1),1),t.clear(!0,!0,!1),t.render(e,n),e.overrideMaterial=null,this._maskMeshes.length>0){const c=[];n.layers.set(2);for(let h=0;h<this._maskMeshes.length;h++){const u=this._maskMeshes[h];u.visible=!0,c.push(u.material),u.userData.maskMaterial&&(u.material=u.userData.maskMaterial)}const l=t.autoClear;t.autoClear=!1,t.render(e,n),t.autoClear=l;for(let h=0;h<this._maskMeshes.length;h++)this._maskMeshes[h].material=c[h];n.layers.set(0)}for(let c=0;c<this._hiddenDuringNormalPass.length;c++)this._hiddenDuringNormalPass[c].visible=!0;for(let c=0;c<this._maskMeshes.length;c++)this._maskMeshes[c].visible=!0;e.background=s,e.fog=o,t.setClearColor(r,a),t.setRenderTarget(this.colorTarget),t.clear(!0,!0,!1),t.render(e,n),t.setRenderTarget(null),t.render(this.postScene,this.postCamera)}dispose(){this.colorTarget.dispose(),this.normalDepthTarget.dispose(),this.normalDepthMaterial.dispose(),this.compositeMaterial.dispose()}}const ze=24,zn=ze/2,ei=1.35,_o=2.6,Ae=1.45,To=1.75,Cn=3.25,xg=1.05,Jc=-.16;function kn(i,t,e){const n=-i/2,s=-t/2,o=Math.min(e,i/2,t/2),r=new rs;return r.moveTo(n+o,s),r.lineTo(n+i-o,s),r.quadraticCurveTo(n+i,s,n+i,s+o),r.lineTo(n+i,s+t-o),r.quadraticCurveTo(n+i,s+t,n+i-o,s+t),r.lineTo(n+o,s+t),r.quadraticCurveTo(n,s+t,n,s+t-o),r.lineTo(n,s+o),r.quadraticCurveTo(n,s,n+o,s),r}function an(i,t,e,n,s=.08,o=!1){const r=kn(i,t,n),a=new _n(r,{depth:e,bevelEnabled:s>0,bevelThickness:s,bevelSize:s,bevelSegments:2,curveSegments:10});a.rotateX(-Math.PI/2),a.computeVertexNormals();const c=a.attributes.position,l=a.attributes.normal,h=a.attributes.uv;for(let u=0;u<h.count;u++)if(o){const d=c.getX(u),p=c.getY(u),g=c.getZ(u),v=Math.abs(l.getX(u));Math.abs(l.getY(u))>.65?h.setXY(u,d*.08,g*.08):v>.5?h.setXY(u,g*.09,p*.34):h.setXY(u,d*.09,p*.34)}else h.setXY(u,h.getX(u)*.14,h.getY(u)*.14);return h.needsUpdate=!0,a}function Mg(i){return new Mn({uniforms:{uTime:be.uTime,uWindStrength:be.uWindStrength,uRainIntensity:i.uRainIntensity,uSnowAmount:be.uSnowAmount,uShallowColor:{value:new kt(Zt.waterShallow)},uDeepColor:{value:new kt(Zt.waterDeep)},uLightColor:{value:new kt(16774367)},uSunDir:{value:new I(.55,.78,.45).normalize()}},transparent:!0,side:Ve,vertexShader:`
      uniform float uTime;
      uniform float uWindStrength;
      varying vec3 vWorldPos;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        float w = sin(worldPos.x * 2.1 + uTime * 1.9) * cos(worldPos.z * 2.4 - uTime * 1.5);
        pos.y += w * 0.022 * (0.7 + uWindStrength * 0.35);
        worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform float uWindStrength;
      uniform float uRainIntensity;
      uniform float uSnowAmount;
      uniform vec3 uShallowColor;
      uniform vec3 uDeepColor;
      uniform vec3 uLightColor;
      uniform vec3 uSunDir;
      varying vec3 vWorldPos;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 p = vWorldPos.xz;

        // Layered toon ripple bands
        float r1 = sin(p.x * 3.4 + p.y * 1.6 + uTime * 1.8);
        float r2 = cos(p.x * 2.3 - p.y * 3.1 - uTime * 1.35);
        float ripple = (r1 + r2) * 0.5;

        // Quantized cel water color bands
        float band = smoothstep(-0.2, 0.25, ripple);
        vec3 baseCol = mix(uDeepColor, uShallowColor, 0.38 + band * 0.48);

        // Cool winter tint when snowing
        baseCol = mix(baseCol, vec3(0.68, 0.80, 0.88), uSnowAmount * 0.48);

        // Crisp stylized specular glint streaks
        float glintWave = sin(p.x * 6.5 - p.y * 4.5 + uTime * 2.6) * cos(p.x * 4.2 + p.y * 6.8 - uTime * 2.1);
        float sparkle = smoothstep(0.74, 0.88, glintWave);
        baseCol = mix(baseCol, vec3(0.95, 0.99, 1.0), sparkle * 0.52);

        // Subtle animated foam lines near channel borders
        float edgeFoam = smoothstep(0.42, 0.5, abs(vUv.y - 0.5));
        float foamBreak = step(0.15, sin(p.x * 7.0 + p.y * 7.0 + uTime * 2.2));
        baseCol = mix(baseCol, vec3(0.92, 0.97, 0.99), edgeFoam * foamBreak * 0.42);

        // Raindrop expanding concentric rings when raining
        if (uRainIntensity > 0.02) {
          vec2 cell = floor(p * 1.65);
          vec2 local = fract(p * 1.65) - 0.5;
          float h = hash(cell);
          float t = fract(uTime * 1.35 + h * 6.0);
          float dist = length(local);
          float ring = smoothstep(0.055, 0.01, abs(dist - t * 0.42)) * (1.0 - t);
          baseCol = mix(baseCol, vec3(0.92, 0.96, 1.0), ring * uRainIntensity * 0.72);
        }

        // Tint lightly by current light color (dusk / night / sunny)
        baseCol *= mix(vec3(1.0), uLightColor, 0.45);

        gl_FragColor = vec4(baseCol, 0.88);
      }
    `})}function vo({width:i,depth:t,height:e,steps:n=7,stoneMat:s,trimMat:o,cheekWalls:r=!0}){const a=new jt,c=e/n,l=t/n;for(let h=0;h<n;h++){const u=c*(h+1),d=new at(i,u,l+.02),p=new A(d,s);p.position.set(0,u/2,-t/2+l*(h+.5)),p.castShadow=!0,p.receiveShadow=!0,a.add(p)}if(r){const u=Math.hypot(t,e),d=Math.atan2(e,t);for(const p of[-1,1]){const g=new A(new at(.24,e*.65,t+.08),s);g.position.set(p*(i/2+.24/2),e*.325,0),g.castShadow=!0,g.receiveShadow=!0,a.add(g);const v=new A(new at(.24+.08,.16,u+.15),o);v.position.set(p*(i/2+.24/2),e*.55+.22,0),v.rotation.x=-d,v.castShadow=!0,v.receiveShadow=!0,a.add(v);const m=new A(new at(.24+.12,.65,.24+.12),o);m.position.set(p*(i/2+.24/2),.325,-t/2-.05),m.castShadow=!0,m.receiveShadow=!0,a.add(m)}}return a}function yg(i){const t=zo(),e=new jt;e.name="TerrainAndBase";const n=Nt({color:16777215,map:t.baseMasonry,snowable:!1}),s=Nt({color:Zt.baseTrim,snowable:!0,snowThreshold:.65}),o=Nt({color:16777215,map:t.grass,snowable:!0,snowThreshold:.55}),r=Nt({color:Zt.grassMid,snowable:!0,snowThreshold:.55}),a=Nt({color:16777215,map:t.retainingStone,snowable:!0,snowThreshold:.72}),c=Nt({color:16051940,map:t.castleStone,snowable:!0,snowThreshold:.72}),l=Nt({color:Zt.castleTrim,snowable:!0,snowThreshold:.55}),h=Nt({color:16777215,map:t.cobble,snowable:!0,snowThreshold:.62}),u=Nt({color:Zt.pathDirt,snowable:!0,snowThreshold:.6}),d=Nt({color:6056034,snowable:!1}),p=Nt({color:9340540,snowable:!0,snowThreshold:.6}),g=_o-.62,v=an(ze,ze,g,ei,.08,!0),m=new A(v,n);m.position.y=-_o+.08,m.castShadow=!0,m.receiveShadow=!0,e.add(m);const f=kn(ze,ze,ei),T=kn(ze-.52,ze-.52,ei-.18);f.holes.push(T);const S=new _n(f,{depth:.5,bevelEnabled:!1,curveSegments:10});S.rotateX(-Math.PI/2),S.computeVertexNormals();const M=S.attributes.position,L=S.attributes.normal,R=S.attributes.uv;for(let Z=0;Z<R.count;Z++){const dt=Math.abs(L.getX(Z));R.setXY(Z,(dt>.5?M.getZ(Z):M.getX(Z))*.09,M.getY(Z)*.34)}const C=new A(S,n);C.position.y=-.54,C.receiveShadow=!0,e.add(C);const P=an(ze+.28,ze+.28,.26,ei+.12,.05),w=new A(P,s);w.position.y=-_o-.08,w.receiveShadow=!0,e.add(w);const y=kn(ze+.18,ze+.18,ei+.08),D=kn(ze-.36,ze-.36,ei-.12);y.holes.push(D);const Y=new _n(y,{depth:.24,bevelEnabled:!0,bevelThickness:.04,bevelSize:.04,bevelSegments:2,curveSegments:10});Y.rotateX(-Math.PI/2);const H=new A(Y,s);H.position.y=-.14,H.castShadow=!0,H.receiveShadow=!0,e.add(H);const et=[[-zn+.55,-zn+.55],[zn-.55,-zn+.55],[-zn+.55,zn-.55],[zn-.55,zn-.55]];for(const[Z,dt]of et)for(let Et=0;Et<4;Et++){const ot=new A(new Qt(.92,.92,.42,12),Et%2===0?s:a);ot.position.set(Z,-_o+.45+Et*.58,dt),ot.receiveShadow=!0,e.add(ot)}const it=kn(ze-.34,ze-.34,ei-.14),q=new _n(it,{depth:.18,bevelEnabled:!1,curveSegments:10});q.rotateX(-Math.PI/2);const $=new A(q,d);$.position.y=-.58,$.receiveShadow=!0,e.add($);const j=kn(ze-.38,ze-.38,ei-.16),yt=new la;yt.moveTo(-7.35,2.6),yt.lineTo(-6.25,2.6),yt.lineTo(-6.25,-5.85),yt.lineTo(11.72,-5.85),yt.lineTo(11.72,-6.95),yt.lineTo(-7.35,-6.95),yt.closePath(),j.holes.push(yt);const Rt=new _n(j,{depth:.44,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1,curveSegments:10});Rt.rotateX(-Math.PI/2);const ft=Rt.attributes.uv;for(let Z=0;Z<ft.count;Z++)ft.setXY(Z,ft.getX(Z)*.08,ft.getY(Z)*.08);Rt.computeVertexNormals();const Vt=new A(Rt,o);Vt.position.y=-.44,Vt.receiveShadow=!0,e.add(Vt);const Jt=[{x:2.72,z:5.82,w:17.95,d:.16},{x:2.18,z:6.98,w:19.05,d:.16},{x:-7.38,z:2.25,w:.16,d:9.5},{x:-6.22,z:1.68,w:.16,d:8.35}];for(const Z of Jt){const dt=new A(new at(Z.w,.52,Z.d),p);dt.position.set(Z.x,-.22,Z.z),dt.castShadow=!0,dt.receiveShadow=!0,e.add(dt)}const nt=new A(an(4,6.2,.72,1.1,.06),r);nt.position.set(-9.5,0,-7.2),nt.receiveShadow=!0,e.add(nt);const xt=new A(an(4,6.6,.85,1.1,.06),r);xt.position.set(9.5,0,-7),xt.receiveShadow=!0,e.add(xt);const ht=12.4,ut=6.7,Tt=.05,Lt=-.1,Dt=an(ht,ut,Ae-.12,.65,.05),qt=new A(Dt,a);qt.position.set(Tt,0,Lt),qt.castShadow=!0,qt.receiveShadow=!0,e.add(qt);const lt=an(ht+.12,ut+.12,.16,.68,.03),_t=new A(lt,o);_t.position.set(Tt,Ae-.16,Lt),_t.receiveShadow=!0,e.add(_t);for(const Z of[-5.2,-3.5,-1.75,1.75,3.6,5.3]){const dt=new A(new at(.42,Ae-.06,.34),l);dt.position.set(Z,(Ae-.06)/2,3.28),dt.castShadow=!0,dt.receiveShadow=!0,e.add(dt)}const E=an(5.2,5.5,.06,.85,.01),It=new A(E,h);It.position.set(0,Ae-.02,.45),It.receiveShadow=!0,e.add(It);const pt=new A(an(9.2,1.5,.05,.35,.01),h);pt.position.set(.1,Ae-.02,.65),pt.receiveShadow=!0,e.add(pt);const mt=new A(an(3.7,4.3,To-.14,.95,.05),a);mt.position.set(7.85,0,-.15),mt.castShadow=!0,mt.receiveShadow=!0,e.add(mt);const F=new A(an(3.84,4.44,.18,.98,.03),o);F.position.set(7.85,To-.18,-.15),F.receiveShadow=!0,e.add(F);const st=vo({width:1.3,depth:.72,height:To-Ae,steps:3,stoneMat:l,trimMat:s,cheekWalls:!1});st.rotation.y=Math.PI/2,st.position.set(6.15,Ae,.55),e.add(st);const G=vo({width:2,depth:1.55,height:Ae,steps:7,stoneMat:l,trimMat:s,cheekWalls:!0});G.rotation.y=Math.PI,G.position.set(0,0,4.02),e.add(G);const x=vo({width:1.25,depth:1.45,height:Ae,steps:6,stoneMat:l,trimMat:s,cheekWalls:!0});x.rotation.y=Math.PI,x.position.set(4.5,0,3.98),e.add(x);const _=kn(15.2,7.6,.9),N=kn(14.2,6.7,.65);_.holes.push(N);const B=new _n(_,{depth:1.32,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1,curveSegments:8});B.rotateX(-Math.PI/2);const X=new A(B,a);X.position.set(0,0,-7.25),X.castShadow=!0,X.receiveShadow=!0,e.add(X);const W=new A(new at(14.4,.45,6.9),d);W.position.set(0,.22,-7.25),W.receiveShadow=!0,e.add(W);const gt=new A(an(11.1,5.1,Cn-.14,.55,.06),c);gt.position.set(0,0,-7.65),gt.castShadow=!0,gt.receiveShadow=!0,e.add(gt);const z=new A(an(11.24,5.24,.18,.58,.03),h);z.position.set(0,Cn-.18,-7.65),z.receiveShadow=!0,e.add(z);for(const Z of[-4.5,-2.5,2.5,4.5]){const dt=new A(new at(.55,Cn-.2,.45),l);dt.position.set(Z,(Cn-.2)/2,-5.05),dt.castShadow=!0,dt.receiveShadow=!0,e.add(dt)}const V=vo({width:1.85,depth:1.75,height:Cn-Ae,steps:8,stoneMat:l,trimMat:s,cheekWalls:!0});V.rotation.y=Math.PI,V.position.set(0,Ae,-2.42),e.add(V);const ct=new A(new at(2.35,Cn,.78),c);ct.position.set(0,Cn/2,-3.62),ct.castShadow=!0,ct.receiveShadow=!0,e.add(ct);for(const Z of[-1,1]){const dt=new A(new at(.24,.42,.76),l);dt.position.set(Z*1.05,Cn+.21,-3.62),dt.castShadow=!0,e.add(dt)}const Q=Mg(i),vt=new A(new Ne(14.2,6.7,28,16),Q);vt.rotation.x=-Math.PI/2,vt.position.set(0,xg,-7.25),vt.userData.noOutline=!0,e.add(vt);const wt=new A(new at(.86,.35,1.85),p);wt.position.set(-6.8,.85,-3.15),wt.castShadow=!0,wt.receiveShadow=!0,e.add(wt);const Mt=new A(new Ne(.56,1.8,4,8),Q);Mt.rotation.x=-Math.PI/2,Mt.position.set(-6.8,1.04,-3.15),Mt.userData.noOutline=!0,e.add(Mt);const bt=new A(new Ne(.54,1.28,4,10),Q);bt.position.set(-6.8,.44,-2.14),bt.rotation.x=-.2,bt.userData.noOutline=!0,e.add(bt);const Yt=new A(new Ne(1.08,9.45,6,26),Q);Yt.rotation.x=-Math.PI/2,Yt.position.set(-6.8,Jc,2.2),Yt.userData.noOutline=!0,e.add(Yt);const Bt=new A(new Ne(18.1,1.08,36,6),Q);Bt.rotation.x=-Math.PI/2,Bt.position.set(2.77,Jc,6.4),Bt.userData.noOutline=!0,e.add(Bt);const $t=new Os({color:Zt.waterShallow,transparent:!0,opacity:.92}),U=new A(new Ne(1.12,.38),$t);U.rotation.y=Math.PI/2,U.position.set(zn+.04,-.34,6.4),U.userData.noOutline=!0,e.add(U);function St(Z,dt,Et,ot,rt=0,Ht=.018,Ut=u){const te=new A(an(Et,ot,.04,Math.min(Et,ot)*.42,.005),Ut);te.position.set(Z,Ht,dt),te.rotation.y=rt,te.receiveShadow=!0,e.add(te)}St(0,5.25,3.7,1.15,0,.015,h),St(0,8.95,1.45,3.8,0,.015,u),St(3.1,5.05,3.6,.95,.06,.014,u),St(5.4,4.7,1.8,1.35,-.1,.014,u),St(-3.3,5.15,3.6,.9,-.05,.014,u),St(-5.2,3.5,1,3.2,.22,.014,u);const tt=[[-.25,7.6],[.22,8.15],[-.18,8.75],[.24,9.35],[-.12,9.95],[2.2,5.1],[3.2,5],[4.2,4.9],[-2.1,5.15],[-3.2,5.15]];for(const[Z,dt]of tt){const Et=new A(new Qt(.24,.28,.05,7),l);Et.position.set(Z,.032,dt),Et.scale.set(1.15,1,.85),Et.rotation.y=Z*1.7+dt,Et.receiveShadow=!0,e.add(Et)}return{group:e,waterMat:Q,update(Z,dt){dt&&Q.uniforms.uLightColor.value.copy(dt)}}}function Sg(){const i=zo(),t=new jt;t.name="MedievalCastle",t.position.y=Cn;const e=Nt({color:16249576,map:i.castleStone,snowable:!0,snowThreshold:.65}),n=Nt({color:Zt.castleStoneAlt,map:i.castleStone,snowable:!0,snowThreshold:.65}),s=Nt({color:Zt.castleTrim,snowable:!0,snowThreshold:.55}),o=Nt({color:16777215,map:i.slateRoof,snowable:!0,snowThreshold:.42}),r=Nt({color:Zt.castleRoofDeep,snowable:!0,snowThreshold:.42}),a=Nt({color:Zt.timberDark,snowable:!0,snowThreshold:.65}),c=Nt({color:16777215,map:i.wood,snowable:!0,snowThreshold:.65}),l=Nt({color:Zt.ironDark,snowable:!1}),h=Nt({color:2762026,snowable:!1}),u=Nt({color:Zt.bannerGold,snowable:!1}),d=Lo(Zt.windowGlow,.55),p=Lo(Zt.forgeGlow,1),g=$c(Zt.bannerCrimson,"heraldic"),v=$c(Zt.bannerBlue,"stripe"),m=[d,p],f=[];function T(z,V,ct,Q,vt=0,wt=1){const Mt=new jt,bt=new A(new at(.08*wt,.46*wt,.08),h),Yt=new A(new at(.22*wt,.075*wt,.08),h);Yt.position.y=.06*wt,Mt.add(bt,Yt),Mt.position.set(V,ct,Q),Mt.rotation.y=vt,z.add(Mt)}function S(z,V,ct,Q,vt=0,wt=.34,Mt=.64){const bt=new jt,Yt=new A(new at(wt+.14,Mt+.12,.1),s);bt.add(Yt);const Bt=new A(new at(wt,Mt*.72,.12),d);Bt.position.y=-Mt*.08,bt.add(Bt);const $t=new A(new Qt(wt/2,wt/2,.12,10),d);$t.rotation.x=Math.PI/2,$t.position.y=Mt*.28,bt.add($t);const U=new A(new at(.04,Mt*.9,.14),l),St=new A(new at(wt,.04,.14),l);bt.add(U,St),bt.position.set(V,ct,Q),bt.rotation.y=vt,z.add(bt)}function M(z,V,ct,Q,vt=!0){const wt=new jt,Mt=new A(new Qt(.032,.04,z,6),l);Mt.position.y=z/2,Mt.castShadow=!0,wt.add(Mt);const bt=new A(new ln(.075,8,8),u);bt.position.y=z+.04,wt.add(bt);const Yt=10,Bt=3,$t=new Ne(V,ct,Yt,Bt);if($t.translate(V/2+.03,0,0),vt){const St=$t.attributes.position;for(let tt=0;tt<St.count;tt++){const Z=St.getX(tt),dt=St.getY(tt),Et=Be.clamp(Z/V,0,1);St.setY(tt,dt*(1-Et*.58))}$t.computeVertexNormals()}const U=new A($t,Q);return U.position.y=z-ct*.58,U.castShadow=!0,U.userData.noOutline=!0,wt.add(U),wt}function L({x:z,z:V,radius:ct,height:Q,spireH:vt,flagMat:wt}){const Mt=new jt;Mt.position.set(z,0,V);const bt=new A(new Qt(ct*1.02,ct*1.14,.65,16),n);bt.position.y=.325,bt.castShadow=!0,bt.receiveShadow=!0,Mt.add(bt);const Yt=new A(new Qt(ct,ct*1.03,Q,16),e);Yt.position.y=.5+Q/2,Yt.castShadow=!0,Yt.receiveShadow=!0,Mt.add(Yt);const Bt=new A(new Qt(ct*1.08,ct*1.08,.14,16),s);Bt.position.y=Q*.58,Mt.add(Bt);const $t=.5+Q,U=new A(new Qt(ct*1.18,ct*1.02,.28,16),s);U.position.y=$t-.08,U.castShadow=!0,Mt.add(U);const St=new A(new Qt(ct*1.18,ct*1.18,.42,16),e);St.position.y=$t+.22,St.castShadow=!0,Mt.add(St);const tt=10;for(let rt=0;rt<tt;rt++){const Ht=rt/tt*Math.PI*2,Ut=new A(new at(.28,.28,.24),s);Ut.position.set(Math.cos(Ht)*ct*1.08,$t+.52,Math.sin(Ht)*ct*1.08),Ut.rotation.y=-Ht,Ut.castShadow=!0,Mt.add(Ut)}const Z=new A(new Ce(ct*1.22,vt,16),o);Z.position.y=$t+.52+vt/2,Z.castShadow=!0,Z.receiveShadow=!0,Mt.add(Z);const dt=new A(new at(.28,.34,.34),s);dt.position.set(0,$t+.92,ct*.78),Mt.add(dt);const Et=new A(new Ce(.24,.28,4),r);Et.rotation.y=Math.PI/4,Et.position.set(0,$t+1.22,ct*.78),Mt.add(Et);for(let rt=0;rt<4;rt++){const Ht=rt/4*Math.PI*2+Math.PI/4;T(Mt,Math.sin(Ht)*(ct+.01),Q*.72,Math.cos(Ht)*(ct+.01),Ht,.92)}const ot=M(1.05,.92,.36,wt,!0);return ot.position.y=$t+.52+vt-.08,ot.rotation.y=-.35,Mt.add(ot),t.add(Mt),Mt}function R({x1:z,z1:V,x2:ct,z2:Q,height:vt=2.15,thickness:wt=.58}){const Mt=new jt,bt=ct-z,Yt=Q-V,Bt=Math.hypot(bt,Yt),$t=Math.atan2(bt,Yt);Mt.position.set((z+ct)/2,0,(V+Q)/2),Mt.rotation.y=$t;const U=new A(new at(wt,vt,Bt),e);U.position.y=vt/2,U.castShadow=!0,U.receiveShadow=!0,Mt.add(U);const St=new A(new at(wt+.14,.16,Bt+.04),s);St.position.y=vt+.05,St.castShadow=!0,Mt.add(St);const tt=new A(new at(.18,.3,Bt),e);tt.position.set(wt/2-.05,vt+.24,0),tt.castShadow=!0,Mt.add(tt);const Z=new A(new at(.36,.08,Bt-.1),a);Z.position.set(-wt/2-.12,vt-.12,0),Mt.add(Z);const dt=.62,Et=Math.max(2,Math.floor((Bt-.3)/dt)),ot=-((Et-1)*dt)/2;for(let Ht=0;Ht<Et;Ht++){const Ut=ot+Ht*dt,te=new A(new at(.24,.34,.34),s);te.position.set(wt/2-.04,vt+.5,Ut),te.castShadow=!0,Mt.add(te)}const rt=Math.max(1,Math.floor(Bt/1.55));for(let Ht=0;Ht<rt;Ht++){const Ut=-Bt/2+(Ht+.5)/rt*Bt;T(Mt,wt/2+.01,vt*.62,Ut,Math.PI/2,.9)}t.add(Mt)}function C(z,V,ct){const Q=new jt,vt=new A(new Qt(.14,.18,.38,6),l);vt.position.y=.19,Q.add(vt);const wt=new A(new Qt(.22,.13,.16,6),l);wt.position.y=.42,Q.add(wt);const Mt=new A(new Ce(.13,.28,6),p);Mt.position.y=.58,Mt.userData.noOutline=!0,Q.add(Mt),f.push(Mt),Q.position.set(z,V,ct),t.add(Q)}L({x:-5,z:-5.45,radius:.82,height:2.55,spireH:2.05,flagMat:v}),L({x:5,z:-5.45,radius:.82,height:2.55,spireH:2.05,flagMat:v}),L({x:-5,z:-9.85,radius:.9,height:3.35,spireH:2.35,flagMat:g}),L({x:5,z:-9.85,radius:.9,height:3.35,spireH:2.35,flagMat:g}),R({x1:-1.35,z1:-5.45,x2:-4.45,z2:-5.45,height:2.05}),R({x1:4.45,z1:-5.45,x2:1.35,z2:-5.45,height:2.05}),R({x1:-5,z1:-5.9,x2:-5,z2:-9.3,height:2.2}),R({x1:5,z1:-9.3,x2:5,z2:-5.9,height:2.2}),R({x1:-4.4,z1:-9.85,x2:4.4,z2:-9.85,height:2.35});const P=new jt;P.position.set(0,0,-5.42),t.add(P);for(const z of[-1,1]){const V=new A(new Qt(.66,.72,3.05,12),e);V.position.set(z*1.15,1.525,.14),V.castShadow=!0,V.receiveShadow=!0,P.add(V);const ct=new A(new Qt(.76,.68,.24,12),s);ct.position.set(z*1.15,3.05,.14),P.add(ct);const Q=new A(new Ce(.78,1.32,12),o);Q.position.set(z*1.15,3.82,.14),Q.castShadow=!0,P.add(Q),T(P,z*1.15,2.15,.82,0,.9),T(P,z*1.15,1.15,.82,0,.85);const vt=new A(new Ne(.38,.95),z<0?g:v);vt.position.set(z*1.15,1.72,.86),vt.userData.noOutline=!0,P.add(vt)}const w=new A(new at(2.1,1.38,1.18),e);w.position.set(0,2.38,0),w.castShadow=!0,w.receiveShadow=!0,P.add(w);for(const z of[-1,1]){const V=new A(new at(.5,1.78,1.14),n);V.position.set(z*.82,.89,0),V.castShadow=!0,P.add(V)}for(let z=-2;z<=2;z++){const V=new A(new at(.3,.34,.24),s);V.position.set(z*.48,3.22,.48),V.castShadow=!0,P.add(V)}const y=new A(new at(1.16,1.56,.72),h);y.position.set(0,.78,-.08),P.add(y);const D=new A(new ai(.62,.13,8,14,Math.PI),s);D.position.set(0,1.25,.56),P.add(D);const Y=new jt;for(let z=-2;z<=2;z++){const V=new A(new at(.045,.92,.045),l);V.position.set(z*.22,1.32,.44),Y.add(V)}for(let z=0;z<3;z++){const V=new A(new at(1.08,.045,.045),l);V.position.set(0,.96+z*.28,.44),Y.add(V)}P.add(Y);const H=new A(new Qt(.28,.16,.08,6),Nt({color:Zt.bannerCrimson,snowable:!1}));H.rotation.x=Math.PI/2,H.position.set(0,2.42,.62),P.add(H);const et=new A(new ln(.11,8,8),u);et.position.set(0,2.42,.66),P.add(et);const it=new jt,q=new A(new at(1.38,.14,1.56),c);q.position.set(0,.07,1.04),q.castShadow=!0,q.receiveShadow=!0,it.add(q);for(const z of[.46,.86,1.26,1.62]){const V=new A(new at(1.46,.06,.1),a);V.position.set(0,.15,z),it.add(V)}for(const z of[-1,1]){const V=new I(z*.68,.14,1.56),ct=new I(z*.68,2.15,.58),Q=new I().subVectors(ct,V),vt=Q.length(),wt=new A(new Qt(.032,.032,vt,6),l);wt.position.copy(V).addScaledVector(Q,.5),wt.quaternion.setFromUnitVectors(new I(0,1,0),Q.clone().normalize()),wt.castShadow=!0,it.add(wt);const Mt=new A(new ai(.08,.025,6,10),l);Mt.position.copy(ct),it.add(Mt)}P.add(it),C(-.92,0,-3.62),C(.92,0,-3.62);const $=new jt;$.position.set(0,0,-8.15),t.add($);const j=new A(new at(4.45,.55,2.95),n);j.position.y=.275,j.castShadow=!0,j.receiveShadow=!0,$.add(j);const yt=4.1,Rt=3.95,ft=2.6,Vt=new A(new at(yt,Rt,ft),e);Vt.position.y=.45+Rt/2,Vt.castShadow=!0,Vt.receiveShadow=!0,$.add(Vt);for(const z of[-1,1])for(const V of[-1,1]){const ct=new A(new at(.42,Rt+.15,.42),s);ct.position.set(z*(yt/2-.08),.45+Rt/2,V*(ft/2-.08)),ct.castShadow=!0,$.add(ct)}const Jt=new A(new at(yt+.2,.16,ft+.2),s);Jt.position.y=2.55,$.add(Jt);const nt=.45+Rt,xt=new A(new at(yt+.34,.24,ft+.34),s);xt.position.y=nt+.08,xt.castShadow=!0,$.add(xt);for(let z=-3;z<=3;z++)for(const V of[-1,1]){const ct=new A(new at(.34,.32,.22),s);ct.position.set(z*.62,nt+.34,V*(ft/2+.05)),ct.castShadow=!0,$.add(ct)}const ht=1.85,ut=new rs;ut.moveTo(-ft/2-.14,0),ut.lineTo(ft/2+.14,0),ut.lineTo(0,ht),ut.closePath();const Tt=new _n(ut,{depth:yt+.12,bevelEnabled:!1});Tt.translate(0,0,-4.22/2),Tt.rotateY(Math.PI/2);const Lt=new A(Tt,o);Lt.position.y=nt+.18,Lt.castShadow=!0,Lt.receiveShadow=!0,$.add(Lt);const Dt=new A(new at(yt+.24,.14,.16),s);Dt.position.y=nt+.18+ht,$.add(Dt);for(const z of[-1.05,1.05]){const V=new A(new at(.46,.56,.58),s);V.position.set(z,nt+.72,ft*.32),$.add(V);const ct=new A(new Ce(.4,.42,4),r);ct.rotation.y=Math.PI/4,ct.position.set(z,nt+1.18,ft*.32),$.add(ct);const Q=new A(new at(.24,.3,.08),d);Q.position.set(z,nt+.72,ft*.32+.28),$.add(Q)}const qt=new A(new at(.76,1.18,.14),a);qt.position.set(0,.92,ft/2+.02),$.add(qt);const lt=new A(new ai(.42,.09,6,12,Math.PI),s);lt.position.set(0,1.38,ft/2+.06),$.add(lt),S($,-1.18,3.25,ft/2+.01,0,.36,.7),S($,0,3.32,ft/2+.01,0,.42,.8),S($,1.18,3.25,ft/2+.01,0,.36,.7),T($,-1.2,1.65,ft/2+.02,0,1),T($,1.2,1.65,ft/2+.02,0,1),S($,-1,3.25,-ft/2-.01,Math.PI,.34,.65),S($,1,3.25,-ft/2-.01,Math.PI,.34,.65);const _t=new jt;_t.position.set(1.85,0,-.82);const E=new A(new Qt(.72,.8,5.45,16),e);E.position.y=2.725,E.castShadow=!0,E.receiveShadow=!0,_t.add(E);const It=new A(new Qt(.88,.74,.3,16),s);It.position.y=5.45,_t.add(It);const pt=new A(new Ce(.92,2.35,16),o);pt.position.y=6.72,pt.castShadow=!0,_t.add(pt),S(_t,0,4.45,.73,0,.28,.54),T(_t,.73,3.1,0,Math.PI/2,.9);const mt=M(1.45,1.38,.56,g,!1);mt.position.y=7.8,mt.rotation.y=-.25,_t.add(mt),$.add(_t);const F=new jt;F.position.set(-1.92,0,.9);const st=new A(new Qt(.56,.62,4.55,14),n);st.position.y=2.275,st.castShadow=!0,F.add(st);const G=new A(new Ce(.7,1.65,14),r);G.position.y=5.32,G.castShadow=!0,F.add(G);const x=M(.95,.8,.32,v,!0);x.position.y=6.08,x.rotation.y=-.35,F.add(x),$.add(F);const _=new A(new at(.46,2.2,.46),s);_.position.set(-1.45,nt+1.05,-.65),_.castShadow=!0,$.add(_);const N=new jt;N.position.set(3.55,0,-7.2);const B=new A(new at(1.55,1.25,2.35),Nt({color:Zt.plasterCream,snowable:!0}));B.position.y=.625,B.castShadow=!0,B.receiveShadow=!0,N.add(B);const X=new A(new at(1.85,.14,2.55),Nt({color:Zt.terracotta,snowable:!0,snowThreshold:.45}));X.position.set(-.05,1.42,0),X.rotation.z=.26,X.castShadow=!0,N.add(X);for(const z of[-1.05,0,1.05]){const V=new A(new at(.12,1.26,.12),a);V.position.set(-.75,.63,z),N.add(V)}S(N,-.78,.72,.45,-Math.PI/2,.24,.4),t.add(N);const W=Nt({color:Zt.timberMid,snowable:!0}),gt=[[-3.45,-6.4],[-3.82,-6.58],[-3.55,-6.82],[2.45,-6.25],[2.78,-6.38]];for(const[z,V]of gt){const ct=new A(new Qt(.17,.15,.36,10),W);ct.position.set(z,.18,V),ct.castShadow=!0,t.add(ct)}return C(-.85,0,-6.55),C(.85,0,-6.55),{group:t,glowMaterials:m,update(z){for(let V=0;V<f.length;V++){const ct=f[V],Q=.88+Math.sin(z*9.5+V*2.1)*.14+Math.cos(z*15+V)*.06;ct.scale.set(1,Q,1)}}}}function wg(){const i=zo(),t=new jt;t.name="MedievalVillage";const e=Nt({color:Zt.castleStoneAlt,map:i.retainingStone,snowable:!0,snowThreshold:.65});Nt({color:16051938,map:i.castleStone,snowable:!0,snowThreshold:.65});const n=Nt({color:Zt.timberDark,snowable:!0,snowThreshold:.68}),s=Nt({color:Zt.timberMid,snowable:!0,snowThreshold:.68}),o=Nt({color:16777215,map:i.wood,snowable:!0,snowThreshold:.65}),r=Nt({color:16777215,map:i.thatch,snowable:!0,snowThreshold:.4}),a=Nt({color:Zt.terracotta,snowable:!0,snowThreshold:.42}),c=Nt({color:Zt.barnRoof,snowable:!0,snowThreshold:.42}),l=Nt({color:Zt.smithyRoof,snowable:!0,snowThreshold:.42}),h=Nt({color:Zt.hayGold,snowable:!0,snowThreshold:.45}),u=Nt({color:Zt.ironDark,snowable:!1}),d=Nt({color:16183262,side:Ve,snowable:!1}),p=Lo(Zt.windowGlow,.6),g=Lo(Zt.forgeGlow,1.1),v=[p,g],m=[];let f=null,T=null,S=null;const M=[];function L({w:ot=2,d:rt=1.6,h:Ht=1.35,plasterColor:Ut=Zt.plasterCream,roofMat:te=r,twoStory:me=!1,hasChimney:Ee=!0}){const ce=new jt,Xe=Nt({color:Ut,snowable:!0,snowThreshold:.72}),tn=new A(new at(ot+.1,.26,rt+.1),e);tn.position.y=.13,tn.castShadow=!0,tn.receiveShadow=!0,ce.add(tn);const Fe=me?Ht*.65:Ht,Ln=new A(new at(ot,Fe,rt),Xe);Ln.position.y=.26+Fe/2,Ln.castShadow=!0,Ln.receiveShadow=!0,ce.add(Ln);const we=.085;for(const Ct of[-1,1])for(const Gt of[-1,1]){const Xt=new A(new at(we,Fe+.02,we),n);Xt.position.set(Ct*(ot/2),.26+Fe/2,Gt*(rt/2)),ce.add(Xt)}for(const Ct of[.28,.26+Fe]){const Gt=new A(new at(ot+.06,we,we),n);Gt.position.set(0,Ct,rt/2);const Xt=Gt.clone();Xt.position.z=-rt/2;const Wt=new A(new at(we,we,rt+.06),n);Wt.position.set(-ot/2,Ct,0);const se=Wt.clone();se.position.x=ot/2,ce.add(Gt,Xt,Wt,se)}for(const Ct of[-1,1]){const Gt=new A(new at(we*.8,Fe*.92,we*.8),n);Gt.position.set(Ct*(ot*.34),.26+Fe*.5,rt/2+.01),Gt.rotation.z=Ct*.42,ce.add(Gt)}let ge=.26+Fe,le=ot,pe=rt;if(me){const Ct=Ht*.62,Gt=ot+.26,Xt=rt+.22,Wt=new A(new at(Gt,Ct,Xt),Xe);Wt.position.y=ge+Ct/2,Wt.castShadow=!0,Wt.receiveShadow=!0,ce.add(Wt);for(const ve of[-1,0,1]){const oe=new A(new at(we,Ct,we),n);oe.position.set(ve*(Gt/2),ge+Ct/2,Xt/2),ce.add(oe)}const se=new A(new at(Gt+.08,we,we),n);se.position.set(0,ge+Ct,Xt/2),ce.add(se);const re=new A(new at(.36,.36,.08),p);re.position.set(-Gt*.24,ge+Ct*.52,Xt/2+.01),ce.add(re);const Me=re.clone();Me.position.x=Gt*.24,ce.add(Me),ge+=Ct,le=Gt,pe=Xt}const en=1.08,gs=.24,Bs=.22,ci=new rs;ci.moveTo(-(pe/2+Bs),-.1),ci.lineTo(pe/2+Bs,-.1),ci.lineTo(0,en),ci.closePath();const Li=new _n(ci,{depth:le+gs*2,bevelEnabled:!0,bevelThickness:.05,bevelSize:.04,bevelSegments:2});Li.translate(0,0,-(le+gs*2)/2),Li.rotateY(Math.PI/2);const Ii=Li.attributes.uv;for(let Ct=0;Ct<Ii.count;Ct++)Ii.setXY(Ct,Ii.getX(Ct)*.45,Ii.getY(Ct)*.45);const Ui=new A(Li,te);Ui.position.y=ge,Ui.castShadow=!0,Ui.receiveShadow=!0,ce.add(Ui);const b=new A(new at(le+gs*2+.12,.11,.14),n);b.position.y=ge+en+.02,ce.add(b);const O=new A(new at(.42,.72,.08),s);O.position.set(0,.26+.36,rt/2+.02),ce.add(O);const K=new A(new at(.5,.78,.05),n);K.position.set(0,.26+.39,rt/2+.005),ce.add(K);const J=new A(new at(.34,.34,.07),p);J.position.set(ot*.28,.26+Fe*.54,rt/2+.02),ce.add(J);const k=new A(new at(.4,.12,.14),n);k.position.set(ot*.28,.26+Fe*.32,rt/2+.07),ce.add(k);const At=new A(new at(.34,.09,.1),Nt({color:14906988,snowable:!0}));At.position.set(ot*.28,.26+Fe*.39,rt/2+.07),ce.add(At);const Ft=new A(new at(.07,.34,.34),p);Ft.position.set(ot/2+.02,.26+Fe*.54,0),ce.add(Ft);let zt=null;if(Ee){const Ct=en+.65,Gt=new A(new at(.36,Ct,.36),e);Gt.position.set(-le*.28,ge+Ct*.42,-pe*.18),Gt.castShadow=!0,ce.add(Gt);const Xt=new A(new at(.46,.1,.46),e);Xt.position.set(-le*.28,ge+Ct*.92,-pe*.18),ce.add(Xt),zt=new I(-le*.28,ge+Ct*.96,-pe*.18)}return{mesh:ce,chimneyTipLocal:zt}}const R=[{x:-4.25,y:Ae,z:.25,rotY:.62,w:2.15,d:1.55,h:1.38,plasterColor:Zt.plasterCream,roofMat:r,twoStory:!0,hasChimney:!0},{x:-3.75,y:Ae,z:-1.95,rotY:.28,w:1.9,d:1.45,h:1.22,plasterColor:Zt.plasterOchre,roofMat:r,twoStory:!1,hasChimney:!0},{x:3.95,y:Ae,z:-1.7,rotY:-.36,w:2.1,d:1.55,h:1.35,plasterColor:Zt.plasterSage,roofMat:a,twoStory:!0,hasChimney:!0},{x:4.35,y:Ae,z:.85,rotY:-.68,w:1.95,d:1.5,h:1.25,plasterColor:Zt.plasterBlush,roofMat:r,twoStory:!1,hasChimney:!0}];for(const ot of R){const{mesh:rt,chimneyTipLocal:Ht}=L(ot);if(rt.position.set(ot.x,ot.y,ot.z),rt.rotation.y=ot.rotY,t.add(rt),Ht){rt.updateMatrixWorld(!0);const Ut=Ht.clone().applyMatrix4(rt.matrixWorld);m.push({pos:Ut,rate:1,scale:1})}}m.push({pos:new I(-1.45,Cn+6.55,-8.8),rate:.8,scale:1.15});const C=new jt;C.position.set(.05,Ae,.55);const P=new A(new Qt(.46,.52,.52,12),e);P.position.y=.26,P.castShadow=!0,P.receiveShadow=!0,C.add(P);const w=new A(new Ta(.36,12),Nt({color:Zt.waterDeep,snowable:!1}));w.rotation.x=-Math.PI/2,w.position.y=.48,C.add(w);for(const ot of[-.42,.42]){const rt=new A(new at(.08,.95,.08),n);rt.position.set(ot,.82,0),rt.castShadow=!0,C.add(rt)}const y=new A(new Qt(.04,.04,.96,8),s);y.rotation.z=Math.PI/2,y.position.y=.94,C.add(y);const D=new A(new Qt(.016,.016,.34,6),h);D.position.y=.76,C.add(D);const Y=new A(new Qt(.11,.085,.16,8),s);Y.position.set(0,.58,0),C.add(Y);const H=new A(new at(1.16,.07,.58),r);H.position.set(0,1.38,-.2),H.rotation.x=-.58,H.castShadow=!0;const et=H.clone();et.position.z=.2,et.rotation.x=.58,C.add(H,et),t.add(C);function it(ot,rt,Ht,Ut,te,me){const Ee=new jt;Ee.position.set(ot,Ae,rt),Ee.rotation.y=Ht;const ce=new A(new at(1.22,.46,.64),o);ce.position.y=.23,ce.castShadow=!0,ce.receiveShadow=!0,Ee.add(ce);for(const ge of[-.56,.56])for(const le of[-.28,.28]){const pe=le<0?1.18:1.02,en=new A(new at(.06,pe,.06),n);en.position.set(ge,pe/2,le),en.castShadow=!0,Ee.add(en)}const Xe=5,tn=1.36/Xe,Fe=Nt({color:Ut,snowable:!0,snowThreshold:.45}),Ln=Nt({color:te,snowable:!0,snowThreshold:.45});for(let ge=0;ge<Xe;ge++){const le=new A(new at(tn,.06,.86),ge%2===0?Fe:Ln);le.position.set(-.68+tn*(ge+.5),1.12,.02),le.rotation.x=.22,le.castShadow=!0,Ee.add(le)}if(me==="produce"){const ge=Nt({color:13716295,snowable:!1}),le=Nt({color:8172374,snowable:!1});for(let pe=0;pe<6;pe++){const en=new A(new ln(.075,7,7),pe<3?ge:le);en.position.set(-.35+pe%3*.14+(pe>=3?.5:0),.52,(pe%2-.5)*.16),Ee.add(en)}}else if(me==="bakery"){const ge=Nt({color:14196562,snowable:!1});for(let le=0;le<4;le++){const pe=new A(new ln(.09,8,6),ge);pe.scale.set(1.4,.75,.9),pe.position.set(-.36+le*.24,.52,.02),Ee.add(pe)}}else{const ge=[5011878,13919062,14989912];for(let le=0;le<3;le++){const pe=new A(new Qt(.08,.08,.32,8),Nt({color:ge[le],snowable:!1}));pe.rotation.x=Math.PI/2,pe.position.set(-.3+le*.3,.54,0),Ee.add(pe)}}const we=new A(new Qt(.16,.14,.36,9),s);we.position.set(.76,.18,.08),we.castShadow=!0,Ee.add(we),t.add(Ee)}it(-1.68,1.48,.55,Zt.bannerCrimson,16116953,"produce"),it(1.88,1.05,-.52,Zt.bannerBlue,16116953,"fabric"),it(-1.82,-.55,1.25,14195782,16116953,"bakery");const q=new jt;q.position.set(1.65,Ae,2.38),q.rotation.y=-.38;const $=new A(new at(1.18,.12,.72),o);$.position.y=.34,$.castShadow=!0,q.add($);for(const ot of[-.34,.34]){const rt=new A(new at(1.18,.24,.05),s);rt.position.set(0,.5,ot),rt.castShadow=!0,q.add(rt)}const j=new A(new at(.05,.26,.72),s);j.position.set(-.58,.5,0),q.add(j);for(const ot of[-.22,.22]){const rt=new A(new at(.68,.05,.05),n);rt.position.set(.88,.26,ot),rt.rotation.z=-.18,q.add(rt)}const yt=[[-.36,-.4],[-.36,.4],[.36,-.4],[.36,.4]];for(const[ot,rt]of yt){const Ht=new jt;Ht.position.set(ot,.24,rt);const Ut=new A(new ai(.22,.032,6,12),n);Ht.add(Ut);const te=new A(new Qt(.05,.05,.08,8),u);te.rotation.x=Math.PI/2,Ht.add(te);for(let me=0;me<4;me++){const Ee=new A(new at(.028,.42,.025),s);Ee.rotation.z=me*Math.PI/4,Ht.add(Ee)}q.add(Ht)}const Rt=Nt({color:14468505,snowable:!0});for(let ot=0;ot<3;ot++){const rt=new A(new ln(.18,8,7),Rt);rt.scale.set(1.2,.85,.95),rt.position.set(-.26+ot*.26,.54,(ot%2-.5)*.14),rt.castShadow=!0,q.add(rt)}t.add(q);const ft=new jt;ft.position.set(-3.75,Ae,2.25),ft.rotation.y=.18;const Vt=new A(new at(2.05,.1,1.55),e);Vt.position.y=.05,Vt.receiveShadow=!0,ft.add(Vt);const Jt=new A(new at(1.95,1.15,.22),e);Jt.position.set(0,.62,-.62),Jt.castShadow=!0,ft.add(Jt);const nt=new A(new at(.76,.72,.68),e);nt.position.set(-.48,.42,-.32),nt.castShadow=!0,ft.add(nt);const xt=new A(new Qt(.24,.42,.72,4),e);xt.rotation.y=Math.PI/4,xt.position.set(-.48,1.25,-.36),ft.add(xt);const ht=new A(new at(.38,1.05,.38),e);ht.position.set(-.48,2.02,-.36),ht.castShadow=!0,ft.add(ht);const ut=new A(new at(.46,.14,.36),g);ut.position.set(-.48,.78,-.26),ft.add(ut),S=new A(new Ce(.16,.32,6),g),S.position.set(-.48,.96,-.26),S.userData.noOutline=!0,ft.add(S);for(const ot of[-.92,.92]){const rt=new A(new at(.1,1.25,.1),n);rt.position.set(ot,.68,.66),rt.castShadow=!0,ft.add(rt)}const Tt=new A(new at(2.26,.14,1.76),l);Tt.position.set(0,1.38,.04),Tt.rotation.x=.22,Tt.castShadow=!0,Tt.receiveShadow=!0,ft.add(Tt);const Lt=new A(new Qt(.2,.24,.38,9),s);Lt.position.set(.32,.24,.12),Lt.castShadow=!0,ft.add(Lt);const Dt=new A(new at(.34,.14,.18),u);Dt.position.set(.32,.48,.12);const qt=new A(new Ce(.08,.24,6),u);qt.rotation.z=-Math.PI/2,qt.position.set(.55,.5,.12),ft.add(Dt,qt);const lt=new A(new at(.46,.28,.28),n);lt.position.set(.45,.19,-.32),ft.add(lt);const _t=new A(new at(.38,.04,.2),Nt({color:Zt.waterShallow,snowable:!1}));_t.position.set(.45,.32,-.32),ft.add(_t),t.add(ft),ft.updateMatrixWorld(!0),m.push({pos:new I(-.48,2.58,-.36).applyMatrix4(ft.matrixWorld),rate:1.35,scale:1.15});const E=new jt;E.position.set(7.85,To,-.15),E.rotation.y=-.45;const It=new A(new Qt(1.02,1.18,.95,14),e);It.position.y=.475,It.castShadow=!0,It.receiveShadow=!0,E.add(It);const pt=new A(new Qt(.76,1.02,2.25,14),Nt({color:Zt.plasterCream,snowable:!0,snowThreshold:.65}));pt.position.y=.95+1.125,pt.castShadow=!0,pt.receiveShadow=!0,E.add(pt);const mt=new A(new Qt(.84,.8,.22,14),n);mt.position.y=3.24,E.add(mt);const F=new A(new Ce(.92,1.15,14),c);F.position.y=3.88,F.castShadow=!0,E.add(F);const st=new A(new at(.46,.78,.14),n);st.position.set(0,.42,1.08),E.add(st);const G=new A(new at(.32,.36,.12),p);G.position.set(0,2.1,.88),E.add(G),f=new jt,f.position.set(0,3.28,.95);const x=new A(new Qt(.16,.18,.42,10),n);x.rotation.x=Math.PI/2,x.position.z=-.1,f.add(x);for(let ot=0;ot<4;ot++){const rt=new jt;rt.rotation.z=ot*Math.PI/2+.35;const Ht=new A(new at(.09,2.25,.08),n);Ht.position.y=1.12,Ht.castShadow=!0,rt.add(Ht);const Ut=new A(new Ne(.46,1.65),d);Ut.position.set(.24,1.28,.02),Ut.rotation.y=.14,Ut.castShadow=!0,Ut.userData.noOutline=!0,rt.add(Ut);for(let te=0;te<5;te++){const me=new A(new at(.48,.035,.04),s);me.position.set(.24,.55+te*.38,.01),rt.add(me)}f.add(rt)}E.add(f);for(let ot=0;ot<3;ot++){const rt=new A(new ln(.19,8,7),Rt);rt.scale.set(1.1,.85,.95),rt.position.set(-.78+ot*.24,.16,.95+ot%2*.18),rt.castShadow=!0,E.add(rt)}t.add(E);const _=new jt;_.position.set(-8.45,0,-1.65);const N=new A(new at(1.85,.85,2.1),e);N.position.y=.425,N.castShadow=!0,N.receiveShadow=!0,_.add(N);const B=new A(new at(1.75,1.15,1.95),Nt({color:Zt.plasterOchre,snowable:!0,snowThreshold:.7}));B.position.y=.85+.575,B.castShadow=!0,B.receiveShadow=!0,_.add(B);const X=new rs;X.moveTo(-1.15,-.06),X.lineTo(1.15,-.06),X.lineTo(0,1.05),X.closePath();const W=new _n(X,{depth:2.35,bevelEnabled:!1});W.translate(0,0,-1.175);const gt=new A(W,r);gt.position.y=2,gt.castShadow=!0,gt.receiveShadow=!0,_.add(gt);const z=new A(new at(.32,.34,.08),p);z.position.set(0,1.35,1),_.add(z),T=new jt,T.position.set(1.38,.42,-.15);const V=new A(new Qt(.11,.11,.95,10),n);V.rotation.z=Math.PI/2,V.position.x=-.25,T.add(V);for(const ot of[-.22,.22]){const rt=new A(new ai(.76,.065,7,16),n);rt.rotation.y=Math.PI/2,rt.position.x=ot,rt.castShadow=!0,T.add(rt)}const ct=10;for(let ot=0;ot<ct;ot++){const rt=ot/ct*Math.PI*2,Ht=new A(new at(.5,.06,.26),s);if(Ht.position.set(0,Math.cos(rt)*.74,Math.sin(rt)*.74),Ht.rotation.x=-rt,Ht.castShadow=!0,T.add(Ht),ot%2===0){const Ut=new A(new at(.06,1.5,.07),n);Ut.rotation.x=rt,T.add(Ut)}}_.add(T),t.add(_);const Q=Nt({color:16055036,transparent:!0,opacity:.78,snowable:!1});for(let ot=0;ot<6;ot++){const rt=new A(new ln(.14,7,6),Q);rt.userData.noOutline=!0,rt.userData.phase=ot/6*Math.PI*2,rt.position.set(-6.95+ot%2*.24,-.1,-1.75+(ot-2.5)*.16),t.add(rt),M.push(rt)}const vt=new jt;vt.position.set(6.55,0,3.85),vt.rotation.y=-.35;const wt=new A(new at(2.3,.24,1.8),e);wt.position.y=.12,wt.receiveShadow=!0,vt.add(wt);const Mt=new A(new at(2.15,1.45,1.68),o);Mt.position.y=.24+.725,Mt.castShadow=!0,Mt.receiveShadow=!0,vt.add(Mt);const bt=new rs;bt.moveTo(-1.05,-.08),bt.lineTo(1.05,-.08),bt.lineTo(.62,.68),bt.lineTo(0,1.08),bt.lineTo(-.62,.68),bt.closePath();const Yt=new _n(bt,{depth:2.45,bevelEnabled:!0,bevelThickness:.04,bevelSize:.03,bevelSegments:1});Yt.translate(0,0,-1.225),Yt.rotateY(Math.PI/2);const Bt=new A(Yt,c);Bt.position.y=1.66,Bt.castShadow=!0,Bt.receiveShadow=!0,vt.add(Bt);for(const ot of[-.36,.36]){const rt=new A(new at(.66,1.05,.08),n);rt.position.set(ot,.76,.85),vt.add(rt)}const $t=new A(new at(.46,.42,.08),Nt({color:3877922,snowable:!1}));$t.position.set(0,1.98,.86),vt.add($t);const U=new A(new at(.1,.1,.56),n);U.position.set(0,2.38,1.05),vt.add(U);const St=new A(new Ce(.62,1.08,10),h);St.position.set(1.55,.54,.18),St.castShadow=!0,St.receiveShadow=!0,vt.add(St);for(let ot=0;ot<3;ot++){const rt=new A(new at(.48,.28,.34),h);rt.position.set(-1.38+ot%2*.36,.14+Math.floor(ot/2)*.28,.38),rt.rotation.y=ot*.35,rt.castShadow=!0,vt.add(rt)}t.add(vt);const tt=new Di({color:16052456,transparent:!0,opacity:.62}),Z=new si(.16,1),dt=[],Et=7;for(const ot of m)for(let rt=0;rt<Et;rt++){const Ht=new A(Z,tt.clone());Ht.userData.noOutline=!0,t.add(Ht),dt.push({mesh:Ht,origin:ot.pos,scaleBase:ot.scale,age:rt/Et*4.2,life:4.2,seed:rt*1.7+ot.pos.x})}return{group:t,glowMaterials:v,update(ot,rt){const Ht=be.uWindStrength.value;f&&(f.rotation.z-=ot*(.68+Ht*.45)),T&&(T.rotation.x+=ot*1.35);for(const Ut of M){const te=rt*4.2+Ut.userData.phase,me=.65+(Math.sin(te)*.5+.5)*.65;Ut.scale.setScalar(me),Ut.position.y=-.14+Math.abs(Math.sin(te))*.12}if(S){const Ut=.85+Math.sin(rt*11)*.18+Math.cos(rt*17)*.08;S.scale.set(1,Ut,1)}for(const Ut of dt){Ut.age+=ot*(.85+Ht*.18),Ut.age>=Ut.life&&(Ut.age-=Ut.life);const te=Ut.age/Ut.life,me=te*(.75+Ht*.55)+Math.sin(rt*1.3+Ut.seed)*.12*te,Ee=te*.25+Math.cos(rt*1.1+Ut.seed)*.1*te,ce=te*2.45;Ut.mesh.position.set(Ut.origin.x+me,Ut.origin.y+ce,Ut.origin.z+Ee);const Xe=Ut.scaleBase*(.45+te*1.55);Ut.mesh.scale.setScalar(Xe);const tn=Math.sin(te*Math.PI)*.58;Ut.mesh.material.opacity=tn}}}}function bg(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Eg(){const i=zo(),t=bg(2026),e=new jt;e.name="FarmlandAndWoodland";const n=Nt({color:16777215,map:i.furrow,snowable:!0,snowThreshold:.58}),s=Nt({color:Zt.timberMid,snowable:!0,snowThreshold:.65}),o=Nt({color:Zt.timberDark,snowable:!0,snowThreshold:.65}),r=Nt({color:Zt.castleStoneAlt,map:i.retainingStone,snowable:!0,snowThreshold:.65}),a=Nt({color:Zt.hayGold,snowable:!0,snowThreshold:.45}),c=Nt({color:Zt.trunkBark,snowable:!1}),l=[],h=[];let u=null;const d=[{xMin:-5.65,xMax:-1.15,zMin:7.45,zMax:10.55,density:1},{xMin:1.15,xMax:5.55,zMin:7.45,zMax:10.55,density:1},{xMin:-5.45,xMax:-1.95,zMin:3.72,zMax:5.25,density:.92}];for(const F of d){const st=F.xMax-F.xMin,G=F.zMax-F.zMin,x=(F.xMin+F.xMax)/2,_=(F.zMin+F.zMax)/2,N=new A(new at(st,.12,G),n);N.position.set(x,.04,_),N.receiveShadow=!0,e.add(N);const B=Math.floor(G/.42);for(let X=0;X<B;X++){const W=F.zMin+.22+X*((G-.44)/Math.max(1,B-1)),gt=new A(new Qt(.06,.11,st-.14,5),Nt({color:Zt.soilRich,snowable:!0,snowThreshold:.6}));gt.rotation.z=Math.PI/2,gt.position.set(x,.09,W),gt.receiveShadow=!0,e.add(gt)}}const p=new Ce(.065,.54,4);p.translate(0,.27,0);const g=Nt({color:16777215,snowable:!0,snowThreshold:.5});g.customProgramCacheKey=()=>"toon-wheat-wave",g.onBeforeCompile=F=>{F.uniforms.uTime=be.uTime,F.uniforms.uWindStrength=be.uWindStrength,F.uniforms.uSnowAmount=be.uSnowAmount,F.uniforms.uWetness=be.uWetness,F.vertexShader=F.vertexShader.replace("#include <common>",`#include <common>
         uniform float uTime;
         uniform float uWindStrength;
         varying float vWorldUp;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
         vWorldUp = clamp(position.y * 1.9, 0.0, 1.0);`).replace("#include <begin_vertex>",`#include <begin_vertex>
         vec4 instOrigin = vec4(0.0, 0.0, 0.0, 1.0);
         #ifdef USE_INSTANCING
           instOrigin = instanceMatrix * instOrigin;
         #endif
         float tip = clamp(position.y / 0.54, 0.0, 1.0);
         float bend = tip * tip;
         float phase = instOrigin.x * 0.72 + instOrigin.z * 0.55 - uTime * (2.2 + uWindStrength * 1.15);
         float gust = sin(phase) + 0.35 * sin(phase * 2.1 + instOrigin.x * 1.3);
         float amp = (0.085 + uWindStrength * 0.095) * bend;
         transformed.x += gust * amp;
         transformed.z += cos(phase * 0.85) * amp * 0.55;`),F.fragmentShader=F.fragmentShader.replace("#include <common>",`#include <common>
         uniform float uSnowAmount;
         uniform float uWetness;
         varying float vWorldUp;`).replace("#include <map_fragment>",`#include <map_fragment>
         diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.86, 0.88, 0.92), uWetness * 0.35);
         float snowTip = smoothstep(0.45, 0.95, vWorldUp) * uSnowAmount;
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.97, 0.99), snowTip * 0.85);`)};const v=[],m=[],f=new kt(Zt.wheatGold),T=new kt(Zt.wheatAmber),S=new kt(15782516);for(const F of d){const st=F.zMax-F.zMin,G=Math.floor(st/.42);for(let x=0;x<G;x++){const _=F.zMin+.22+x*((st-.44)/Math.max(1,G-1)),N=.21;for(let B=F.xMin+.16;B<=F.xMax-.16;B+=N)if(!(Math.hypot(B-3.55,_-8.95)<.42))for(let X=0;X<2;X++){const W=B+(t()-.5)*.14,gt=_+(t()-.5)*.16,z=.78+t()*.45,V=.85+t()*.4;v.push({x:W,y:.1,z:gt,rotY:t()*Math.PI*2,sx:V,sy:z,sz:V});const ct=t(),Q=ct<.45?f:ct<.82?T:S;m.push(Q)}}}const M=new Ru(p,g,v.length);M.castShadow=!1,M.receiveShadow=!0,M.userData.noOutline=!0;const L=new Re;for(let F=0;F<v.length;F++){const st=v[F];L.position.set(st.x,st.y,st.z),L.rotation.set(0,st.rotY,0),L.scale.set(st.sx,st.sy,st.sz),L.updateMatrix(),M.setMatrixAt(F,L.matrix),M.setColorAt(F,m[F])}M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0),e.add(M);const R=new A(new at(2.1,.1,.95),n);R.position.set(2.55,.04,4.08),R.receiveShadow=!0,e.add(R);const C=Nt({color:8173924,snowable:!0}),P=Nt({color:14647868,snowable:!0});for(let F=0;F<5;F++)for(let st=0;st<2;st++){const G=F>=3,x=new A(new ln(G?.13:.12,8,7),G?P:C);x.scale.set(1.1,.78,1.1),x.position.set(1.75+F*.4,.14,3.84+st*.45),x.castShadow=!0,e.add(x)}function w(F,st,G,x){const _=G-F,N=x-st,B=Math.hypot(_,N);if(B<.2)return;const X=new jt;X.position.set((F+G)/2,0,(st+x)/2),X.rotation.y=Math.atan2(_,N);const W=Math.max(2,Math.round(B/.95)+1);for(let gt=0;gt<W;gt++){const z=-B/2+gt/(W-1)*B,V=new A(new at(.085,.52,.085),o);V.position.set(0,.26,z),V.castShadow=!0,X.add(V)}for(const gt of[.19,.39]){const z=new A(new at(.05,.065,B),s);z.position.set(0,gt,0),z.castShadow=!0,X.add(z)}e.add(X)}w(-10.8,7.45,-7.2,7.45),w(-10.8,7.45,-10.8,10.65),w(-10.8,10.65,-7.2,10.65),w(-7.2,7.45,-7.2,8.6),w(-7.2,9.5,-7.2,10.65),w(7,7.45,10.8,7.45),w(10.8,7.45,10.8,10.65),w(7,10.65,10.8,10.65),w(7,7.45,7,8.7),w(7,9.6,7,10.65),w(-5.7,7.35,-1.05,7.35),w(1.05,7.35,5.65,7.35),w(-5.65,3.62,-1.9,3.62),u=new jt,u.position.set(3.55,.06,8.95);const y=new A(new Qt(.04,.05,1.38,6),o);y.position.y=.69,y.castShadow=!0,u.add(y);const D=new A(new Qt(.035,.035,1.02,6),o);D.rotation.z=Math.PI/2,D.position.y=.92,u.add(D);const Y=new A(new Ce(.24,.56,7),Nt({color:6128292,snowable:!0}));Y.position.y=.78,Y.castShadow=!0,u.add(Y);const H=new A(new Qt(.08,.09,.78,7),Nt({color:13202514,snowable:!0}));H.rotation.z=Math.PI/2,H.position.y=.92,u.add(H);for(const F of[-.46,.46]){const st=new A(new Ce(.08,.16,5),a);st.rotation.z=F<0?Math.PI/2:-Math.PI/2,st.position.set(F,.92,0),u.add(st)}const et=new A(new ln(.15,8,8),Nt({color:14929056,snowable:!1}));et.position.y=1.18,u.add(et);const it=new A(new Qt(.32,.34,.04,10),a);it.position.set(.02,1.3,0),it.rotation.z=-.16;const q=new A(new Ce(.18,.24,9),a);q.position.set(.04,1.42,0),q.rotation.z=-.16,q.castShadow=!0,u.add(it,q),e.add(u);function $(F,st,G=1,x=!1){const _=new jt;_.position.set(F,.02,st);const N=new A(new Qt(.46*G,.56*G,.5*G,10),a);N.position.y=.25*G,N.castShadow=!0,N.receiveShadow=!0,_.add(N);const B=new A(new Ce(.54*G,.72*G,10),a);B.position.y=(.5+.32)*G,B.castShadow=!0,_.add(B);const X=new A(new ai(.48*G,.032*G,5,12),s);if(X.rotation.x=Math.PI/2,X.position.y=.44*G,_.add(X),x){const W=new jt,gt=new A(new Qt(.022,.024,1.15,5),o);gt.position.y=.57,W.add(gt);const z=new A(new at(.24,.03,.03),o);z.position.y=1.12,W.add(z);for(const V of[-.1,0,.1]){const ct=new A(new at(.022,.22,.022),o);ct.position.set(V,1.24,0),W.add(ct)}W.position.set(.56*G,0,.2),W.rotation.z=.24,W.rotation.y=.4,_.add(W)}e.add(_)}$(6.15,8.25,1.05,!0),$(6.35,9.55,.85,!1),$(-6.25,9.65,.95,!0);function j({x:F,z:st,rotY:G=0,width:x=1.65,span:_=1.65,stone:N=!0}){const B=new jt;B.position.set(F,0,st),B.rotation.y=G;const X=5,W=_/X;for(let gt=0;gt<X;gt++){const z=(gt+.5)/X-.5,V=.22*(1-4*z*z),ct=-.88*z,Q=new A(new at(x,.11,W+.04),N?r:s);Q.position.set(0,.04+V,z*_),Q.rotation.x=-ct*.45,Q.castShadow=!0,Q.receiveShadow=!0,B.add(Q)}for(const gt of[-x/2+.08,x/2-.08])if(N){const z=new A(new at(.14,.34,_*.96),r);z.position.set(gt,.32,0),z.castShadow=!0,B.add(z);for(const V of[-_*.46,_*.46]){const ct=new A(new at(.22,.46,.22),r);ct.position.set(gt,.28,V),ct.castShadow=!0,B.add(ct)}}else{for(const V of[-_*.44,0,_*.44]){const ct=new A(new at(.08,.48,.08),o);ct.position.set(gt,.34+(V===0?.12:0),V),ct.castShadow=!0,B.add(ct)}const z=new A(new at(.07,.07,_*.96),s);z.position.set(gt,.56,0),z.castShadow=!0,B.add(z)}e.add(B)}j({x:0,z:6.4,rotY:0,width:1.75,span:1.65,stone:!0}),j({x:-6.8,z:2.35,rotY:Math.PI/2,width:1.15,span:1.55,stone:!1}),j({x:8.65,z:6.4,rotY:0,width:1.15,span:1.55,stone:!1});const yt=Nt({color:16052196,snowable:!0,snowThreshold:.72}),Rt=Nt({color:6048062,snowable:!1}),ft=Nt({color:15120552,snowable:!1}),Vt=Nt({color:16249575,snowable:!0,snowThreshold:.75}),Jt=Nt({color:4932418,snowable:!1});function nt(F,st,G){const x=new jt;x.position.set(F,0,st),x.rotation.y=G;const _=new A(new at(.42,.36,.76),yt);_.position.y=.42,_.castShadow=!0,x.add(_);const N=new A(new at(.44,.18,.26),Rt);N.position.set(0,.46,-.1);const B=new A(new at(.44,.14,.18),Rt);B.position.set(0,.36,.22),x.add(N,B);for(const z of[-.14,.14])for(const V of[-.26,.26]){const ct=new A(new at(.08,.28,.08),Rt);ct.position.set(z,.14,V),ct.castShadow=!0,x.add(ct)}const X=new jt;X.position.set(0,.5,.36);const W=new A(new at(.26,.24,.26),yt);W.position.set(0,.04,.12),W.castShadow=!0,X.add(W);const gt=new A(new at(.22,.14,.1),ft);gt.position.set(0,-.02,.26),X.add(gt);for(const z of[-.12,.12]){const V=new A(new Ce(.03,.11,5),a);V.position.set(z,.19,.08),V.rotation.z=z<0?.35:-.35,X.add(V)}x.add(X),e.add(x),h.push({headPivot:X,phase:t()*Math.PI*2,speed:.75+t()*.45,basePitch:.25})}function xt(F,st,G){const x=new jt;x.position.set(F,0,st),x.rotation.y=G;const _=new A(new si(.24,1),Vt);_.scale.set(1,.9,1.32),_.position.y=.32,_.castShadow=!0,x.add(_);const N=new A(new si(.17,1),Vt);N.position.set(0,.38,-.14),x.add(N);for(const gt of[-.1,.1])for(const z of[-.16,.16]){const V=new A(new at(.055,.2,.055),Jt);V.position.set(gt,.1,z),V.castShadow=!0,x.add(V)}const B=new jt;B.position.set(0,.35,.26);const X=new A(new at(.16,.16,.2),Jt);X.position.set(0,0,.08),B.add(X);const W=new A(new ln(.1,6,6),Vt);W.position.set(0,.09,.05),B.add(W);for(const gt of[-.1,.1]){const z=new A(new at(.08,.04,.06),Jt);z.position.set(gt,.02,.04),z.rotation.z=gt<0?.45:-.45,B.add(z)}x.add(B),e.add(x),h.push({headPivot:B,phase:t()*Math.PI*2,speed:.9+t()*.55,basePitch:.35})}nt(-9.6,8.5,.65),nt(-8.2,9.75,-1.15),nt(-9.7,9.85,1.4),xt(8.1,8.35,-.5),xt(9.35,8.65,1.2),xt(8.8,9.7,-2.1),xt(10,9.65,.4),xt(8.2,4.45,-.9),xt(9.15,4.95,.7);const ht=[Nt({color:Zt.leafSun,snowable:!0,snowThreshold:.42}),Nt({color:Zt.leafMid,snowable:!0,snowThreshold:.42}),Nt({color:Zt.leafDeep,snowable:!0,snowThreshold:.42}),Nt({color:Zt.leafAutumn,snowable:!0,snowThreshold:.42})],ut=Nt({color:Zt.pineGreen,snowable:!0,snowThreshold:.38});function Tt(F,st,G,x=1,_=0){const N=new jt;N.position.set(F,st,G);const B=1.05*x,X=new A(new Qt(.11*x,.17*x,B,7),c);X.position.y=B/2,X.castShadow=!0,X.receiveShadow=!0,N.add(X);const W=new jt;W.position.y=B*.86;const gt=ht[_%ht.length],z=[[0,.55,0,.72],[-.44,.32,.22,.52],[.45,.35,-.18,.54],[.14,.36,.42,.48],[-.18,.88,-.1,.46]];for(const[V,ct,Q,vt]of z){const wt=new A(new si(vt*x,1),gt);wt.position.set(V*x,ct*x,Q*x),wt.castShadow=!0,wt.receiveShadow=!0,W.add(wt)}N.add(W),e.add(N),l.push({pivot:W,phase:t()*Math.PI*2,speed:1.1+t()*.55,amp:.032+t()*.018})}function Lt(F,st,G,x=1){const _=new jt;_.position.set(F,st,G);const N=new A(new Qt(.09*x,.14*x,.75*x,6),c);N.position.y=.375*x,N.castShadow=!0,_.add(N);const B=new jt;B.position.y=.52*x;const X=[{y:.42,r:.72,h:1.05},{y:1.05,r:.56,h:.92},{y:1.62,r:.38,h:.78}];for(const W of X){const gt=new A(new Ce(W.r*x,W.h*x,8),ut);gt.position.y=W.y*x,gt.castShadow=!0,gt.receiveShadow=!0,B.add(gt)}_.add(B),e.add(_),l.push({pivot:B,phase:t()*Math.PI*2,speed:1.25+t()*.45,amp:.025+t()*.014})}const Dt=[{type:"pine",x:-10.2,y:.72,z:-9.5,s:1.25},{type:"broad",x:-8.6,y:.72,z:-8.9,s:1.15,m:1},{type:"pine",x:-10.5,y:.72,z:-7.1,s:1.18},{type:"broad",x:-8.9,y:.72,z:-6.2,s:1.1,m:0},{type:"broad",x:-10.2,y:.72,z:-4.9,s:.98,m:3},{type:"pine",x:-8.2,y:.72,z:-4.5,s:.92},{type:"pine",x:10.3,y:.85,z:-9.4,s:1.28},{type:"broad",x:8.6,y:.85,z:-8.8,s:1.12,m:2},{type:"pine",x:10.5,y:.85,z:-6.8,s:1.15},{type:"broad",x:8.8,y:.85,z:-5.8,s:1.05,m:0},{type:"broad",x:10.3,y:.85,z:-4.3,s:1.02,m:3},{type:"pine",x:-6.6,y:0,z:-11.05,s:1.05},{type:"pine",x:-3.2,y:0,z:-11.15,s:.92},{type:"pine",x:3.1,y:0,z:-11.15,s:.95},{type:"pine",x:6.7,y:0,z:-11.05,s:1.08},{type:"broad",x:-10.4,y:0,z:-1.8,s:1.08,m:1},{type:"pine",x:-10.6,y:0,z:.8,s:.98},{type:"broad",x:-9.6,y:0,z:3.2,s:1.05,m:0},{type:"broad",x:-10.5,y:0,z:5.2,s:.9,m:2},{type:"broad",x:10.55,y:0,z:1.8,s:1,m:0},{type:"pine",x:10.65,y:0,z:4.1,s:.92},{type:"broad",x:9.85,y:0,z:5.1,s:.82,m:1}];for(const F of Dt)F.type==="pine"?Lt(F.x,F.y,F.z,F.s):Tt(F.x,F.y,F.z,F.s,F.m);const qt=[[-6.1,0,5.1],[-8.8,0,5.4],[-9.2,0,1.4],[-10.9,0,6.2],[10.2,0,3],[10.9,0,6.9],[5.8,0,5.2],[-1.72,0,4.78],[1.68,0,4.78],[-5.4,1.45,2.7],[5.5,1.45,2.6]];for(let F=0;F<qt.length;F++){const[st,G,x]=qt[F],_=new A(new si(.32+F%3*.08,1),ht[F%3]);_.scale.set(1.2,.78,1.1),_.position.set(st,G+.18,x),_.castShadow=!0,_.receiveShadow=!0,e.add(_)}const lt=Nt({color:Zt.retainingWall,snowable:!0,snowThreshold:.55}),_t=[[-7.65,.08,4.2],[-7.55,.06,.8],[-5.9,.06,5.55],[4.4,.06,5.65],[7.4,.07,5.65],[-10.2,.08,6.9]];for(let F=0;F<_t.length;F++){const[st,G,x]=_t[F],_=new A(new Aa(.24+F%2*.1,0),lt);_.scale.set(1.3,.72,1),_.position.set(st,G,x),_.rotation.set(.2,F*1.1,.1),_.castShadow=!0,_.receiveShadow=!0,e.add(_)}const E=Nt({color:6130507,snowable:!1}),It=[[-6.12,3.6],[-6.12,4.8],[-7.48,4.1],[-4.2,5.72],[2.6,5.72],[5.8,7.08],[-3.8,7.08],[9.9,5.72]];for(const[F,st]of It)for(let G=0;G<3;G++){const x=new A(new Qt(.015,.025,.42+G*.08,4),E);x.position.set(F+(G-1)*.09,.16,st+(G%2-.5)*.08),x.rotation.z=(G-1)*.12,x.userData.noOutline=!0,e.add(x)}const pt=[16245644,15902112,14412279,16172398],mt=new ln(.055,5,4);for(let F=0;F<36;F++){const st=(t()-.5)*20.5,G=3.6+t()*7.2;if(G>5.65&&G<7.25||st>-5.8&&st<5.7&&G>7.25||st>-7.5&&st<-6.1)continue;const x=new A(mt,Nt({color:pt[F%pt.length],snowable:!1}));x.position.set(st,.06,G),x.userData.noOutline=!0,e.add(x)}return{group:e,update(F){const st=be.uWindStrength.value;for(const G of l){const x=Math.sin(F*G.speed+G.phase)*G.amp*(.65+st*.6),_=Math.cos(F*G.speed*.72+G.phase)*G.amp*.55*(.65+st*.6);G.pivot.rotation.z=x,G.pivot.rotation.x=_}u&&(u.rotation.z=Math.sin(F*1.4)*.025*(.7+st*.5));for(const G of h){const x=Math.sin(F*G.speed+G.phase);G.headPivot.rotation.x=G.basePitch+(x>.2?(x-.2)*.45:0)}}}}const Tg={".":null,o:"#4e4449",h:"#d6dce0",a:"#b5bec6",s:"#8a949e",v:"#575059",r:"#be625b",d:"#944a46",g:"#d8b464",t:"#e4dac4",b:"#7c5d47",w:"#dfe5ea",c:"#6985a0"},Kl={".":null,o:"#514640",y:"#dcb96d",h:"#be984d",k:"#c06d5a",f:"#e7c6a8",e:"#5a4a44",c:"#e8dfd0",b:"#6e8ba2",d:"#536c82",l:"#7d5f47",m:"#9da4ab"},Ag={...Kl,b:"#779369",d:"#59724e",k:"#cf9b54"},Cg={idle0:["........ooo.........",".......orrro........","......orrrdo........","......oooooo........",".....oahhhaho.......",".....oahhhaho.......",".....oaovvoao.......","....roaaaaaaor......","...orooaggooo.......","..ordooaccaoo..o....","..ordoocggcoo.owo...","..ordooccccoo.owo...","..ordooaccaoo.owo...","...orooattgoooog....","....oooabbao.ob.....","......oaooao........","......obooob........","......oo..oo........","....................","...................."],idle1:["........ooo.........",".......orrro........",".....oorrrdo........","......oooooo........",".....oahhhaho.......",".....oahhhaho.......",".....oaovvoao.......","...rroaaaaaaor......","..ordoogggooo.......",".orddooaccaoo..o....",".orddoocggcoo.owo...","..ordooccccoo.owo...","..ordo.accaoo.owo...","...orooattgoooog....","....oooabbao.ob.....","......oaooao........","......obooob........","......oo..oo........","....................","...................."],patrol0:["........ooo.........",".......orrro........","......orrrdo........","......oooooo....o...",".....oahhhaho..owo..",".....oahhhaho..owo..",".....oaovvoao..owo..","...rroaaaaaaor.owo..","..ordooaggooo..og...","..ordo.accaoo.oob...","..ordoocggcoooo.....","..ordooccccoo.......","...orooaccaoo.......","....oooattgo........","......oabbao........","......oaooao........","......obooob........","......oo..oo........","....................","...................."],patrol1:[".......ooo..........","......orrro.........",".....orrrdo......o..","......oooooo....owo.",".....oahhhaho...owo.",".....oahhhaho..owo..",".....oaovvoao..owo..","..rrroaaaaaaor.og...",".orddooaggooo.oob...",".orddo.accaoooo.....","..ordoocggcoo.......","..ordooccccoo.......","...orooaccaoo.......","....oooattgo........","......oabbao........",".....oao..oao.......",".....obo..obo.......",".....oo....oo.......","....................","...................."],walk0:["........ooo.........",".......orrro........",".....oorrrdo........","......oooooo........",".....oahhhaho.......",".....oahhhaho.......",".....oaovvoao.......","..rrroaaaaaaor......",".orddooaggooo.......",".orddo.accaoo..o....","..ordoocggcoo.owo...","..ordooccccoo.owo...","...orooaccaoo.og....","....oooattgooob.....","......oabbao........",".....oao..oao.......","....obo....obo......","....oo......oo......","....................","...................."],walk1:["....................","........ooo.........",".......orrro........","......orrrdo........","......oooooo........",".....oahhhaho.......",".....oahhhaho.......",".....oaovvoao.......","...rroaaaaaaor......","..ordooaggooo.......","..ordo.accaoo..o....","..ordoocggcoo.owo...","..ordooccccoo.owo...","...orooaccaoo.og....","....oooattgooob.....","......oabbao........","......oaooao........","......obooob........","......oo..oo........","...................."],walk2:["........ooo.........",".......orrro........","......orrrdo........","......oooooo........",".....oahhhaho.......",".....oahhhaho.......",".....oaovvoao.......","...rroaaaaaaor......","..ordooaggooo.......","..ordo.accaoo...o...","..ordoocggcoo..owo..","..ordooccccoo..owo..","...orooaccaoo..og...","....oooattgoooob....","......oabbao........",".......oaooao.......","......obo..obo......","......oo....oo......","....................","...................."]},Qc={idle0:["....................",".......ooooo........",".....ooyyyyyoo......","....oyyhhhhhyyo.....","...ooooooooooooo....","......offfffo.......","......ofefeeo.......","......offfffo.......",".....oookkkooo......","....ooccbbbccoo..m..","....ooccbbbccoo.om..","....oocdbbbdcoolo...",".....ooodddoool.....","......obbbbo.ol.....","......obddbo.ol.....","......obooob.ol.....","......olool..oo.....","......oo.oo.........","....................","...................."],idle1:["....................","....................",".......ooooo........",".....ooyyyyyoo......","....oyyhhhhhyyo.....","...ooooooooooooo....","......offfffo.......","......ofefeeo.......","......offfffo.......",".....oookkkooo...m..","....ooccbbbccoo.om..","....ooccbbbccoolo...","....oocdbbbdcoo.ol..",".....ooodddoo...ol..","......obbbbo....ol..","......obooob....oo..","......olool.........","......oo.oo.........","....................","...................."],work0:[".............om.....",".......ooooo.omm....",".....ooyyyyyool.....","....oyyhhhhhyyol....","...ooooooooooool....","......offfffo.ol....","......ofefeeo.ol....","......offfffoool....",".....oookkkoooo.....","....ooccbbbccoo.....","....ooccbbbcco......",".....oodbbbdo.......","......obbbbo........","......obddbo........",".....obo..obo.......",".....olo..olo.......",".....oo....oo.......","....................","....................","...................."],work1:["....................","....................","........ooooo.......","......ooyyyyyoo.....",".....oyyhhhhhyyo....","....ooooooooooooo...",".......offfffo......",".......ofefeeo......","......oookkkooo.....",".....ooccbbbccoo....",".....oocdbbbdcooo...","......ooodddooool...",".......obbbbo...ol..","......obooobo....ol.",".....olo...olo...omm",".....oo.....oo....om","....................","....................","....................","...................."],walk0:["....................",".......ooooo........",".....ooyyyyyoo......","....oyyhhhhhyyo.....","...ooooooooooooo....","......offfffo.......","......ofefeeo.......","......offfffo.......",".....oookkkooo..m...","....ooccbbbccoo.om..","....ooccbbbccoolo...",".....oodbbbdoo.ol...","......obbbbo...ol...",".....obo..obo..ol...","....olo....olo.oo...","....oo......oo......","....................","....................","....................","...................."],walk1:["....................","....................",".......ooooo........",".....ooyyyyyoo......","....oyyhhhhhyyo.....","...ooooooooooooo....","......offfffo.......","......ofefeeo.......","......offfffo...m...",".....oookkkooo.om...","....ooccbbbccoolo...","....ooccbbbcco.ol...",".....oodbbbdoo.ol...","......obbbbo...ol...","......obooob...oo...","......olool.........","......oo.oo.........","....................","....................","...................."],walk2:["....................",".......ooooo........",".....ooyyyyyoo......","....oyyhhhhhyyo.....","...ooooooooooooo....","......offfffo.......","......ofefeeo.......","......offfffo.......",".....oookkkooo...m..","....ooccbbbccoo.om..","....ooccbbbccoolo...",".....oodbbbdoo.ol...","......obbbbo...ol...",".......obooob..ol...","......olo..olo.oo...","......oo....oo......","....................","....................","....................","...................."]};function Rg(i,t){const e=i.length,n=i[0].length,s=document.createElement("canvas");s.width=n,s.height=e;const o=s.getContext("2d");o.clearRect(0,0,n,e);for(let a=0;a<e;a++){const c=i[a];for(let l=0;l<n;l++){const h=c[l],u=t[h];u&&(o.fillStyle=u,o.fillRect(l,a,1,1))}}const r=new zs(s);return r.magFilter=De,r.minFilter=De,r.generateMipmaps=!1,r.colorSpace=Ke,r.needsUpdate=!0,r}function Sr(i,t){const e={};for(const[n,s]of Object.entries(i))e[n]=Rg(s,t);return e}function Pg(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(64/2,64/2,4,64/2,64/2,64/2);return n.addColorStop(0,"rgba(38, 30, 34, 0.45)"),n.addColorStop(.55,"rgba(38, 30, 34, 0.22)"),n.addColorStop(1,"rgba(38, 30, 34, 0.0)"),e.fillStyle=n,e.fillRect(0,0,64,64),new zs(t)}function Dg(i){return new Mn({uniforms:{uMap:{value:i}},side:Ve,vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D uMap;
      varying vec2 vUv;
      void main() {
        float a = texture2D(uMap, vUv).a;
        if (a < 0.45) discard;
        // Sentinel alpha = -1.0 tells ToonOutlineComposer to skip 3D ink outline here
        gl_FragColor = vec4(0.0, 0.0, 0.0, -1.0);
      }
    `})}class Lg{constructor(t){this.pool=[];const e=new Ne(.11,.075),n=[14465374,13607496,10072934,13076818];for(let s=0;s<48;s++){const o=new Di({color:n[s%n.length],gradientMap:ms(),side:Ve,transparent:!0,opacity:0}),r=new A(e,o);r.visible=!1,r.userData.noOutline=!0,t.add(r),this.pool.push({mesh:r,vel:new I,rotVel:new I,age:0,life:1,active:!1})}this.cursor=0}emit(t,e,n,s=3,o="straw"){for(let r=0;r<s;r++){const a=this.pool[this.cursor];this.cursor=(this.cursor+1)%this.pool.length,a.active=!0,a.age=0,a.life=.65+Math.random()*.55,a.mesh.visible=!0,a.mesh.position.set(t+(Math.random()-.5)*.28,e+.08+Math.random()*.16,n+(Math.random()-.5)*.24);const c=Math.random()*Math.PI*2,l=.35+Math.random()*.55;a.vel.set(Math.cos(c)*l,.85+Math.random()*.75,Math.sin(c)*l),a.rotVel.set((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8),a.mesh.scale.set(o==="straw"?1.3:.95,o==="straw"?.55:.95,1),a.mesh.material.color.setHex(o==="straw"?Math.random()>.35?14728291:13146439:Math.random()>.45?9349471:13208401),a.mesh.material.opacity=.92}}update(t){const e=be.uWindStrength.value;for(const n of this.pool){if(!n.active)continue;if(n.age+=t,n.age>=n.life){n.active=!1,n.mesh.visible=!1;continue}n.vel.y-=2.4*t,n.vel.x+=e*.45*t,n.mesh.position.addScaledVector(n.vel,t),n.mesh.position.y<.04&&(n.mesh.position.y=.04,n.vel.multiplyScalar(.3)),n.mesh.rotation.x+=n.rotVel.x*t,n.mesh.rotation.y+=n.rotVel.y*t,n.mesh.rotation.z+=n.rotVel.z*t;const s=n.age/n.life;n.mesh.material.opacity=(1-Ig(.65,1,s))*.92}}}function Ig(i,t,e){const n=Be.clamp((e-i)/(t-i),0,1);return n*n*(3-2*n)}class xo{constructor({name:t,role:e,frames:n,bounds:s,startPos:o,size:r=.96,particleSystem:a,softShadowTex:c}){this.name=t,this.role=e,this.frames=n,this.bounds=s,this.size=r,this.particles=a,this.root=new jt,this.root.position.set(o.x,s.y,o.z);const l=new Ne(r,r);l.translate(0,r*.5,0);const h=n.idle0;this.material=new Di({map:h,gradientMap:ms(),alphaTest:.45,side:Ve}),this.depthMaterial=new kl({depthPacking:ml,map:h,alphaTest:.45}),this.maskMaterial=Dg(h),this.spriteMesh=new A(l,this.material),this.spriteMesh.castShadow=!0,this.spriteMesh.receiveShadow=!1,this.spriteMesh.customDepthMaterial=this.depthMaterial,this.spriteMesh.userData.outlineMask=!0,this.spriteMesh.userData.maskMaterial=this.maskMaterial,this.spriteMesh.layers.enable(2),this.root.add(this.spriteMesh);const u=new Os({map:c,transparent:!0,opacity:.58,depthWrite:!1});this.groundShadow=new A(new Ne(r*.68,r*.44),u),this.groundShadow.rotation.x=-Math.PI/2,this.groundShadow.position.set(.05,.025,.04),this.groundShadow.userData.noOutline=!0,this.root.add(this.groundShadow),this.state="ACTION",this.facing=Math.random()>.5?1:-1,this.cyclesRemaining=2+Math.floor(Math.random()*2),this.stateTimer=0,this.pauseDuration=1.6,this.pauseFlipped=!1,this.frameTimer=0,this.frameIndex=0,this.stepEmitTimer=0,this.breathPhase=Math.random()*Math.PI*2,this.currentFrameKey="idle0",this.targetPos=new I(o.x,s.y,o.z),this._tempCam=new I}setFrame(t){if(this.currentFrameKey===t)return;this.currentFrameKey=t;const e=this.frames[t];this.material.map=e,this.material.needsUpdate=!0,this.depthMaterial.map=e,this.depthMaterial.needsUpdate=!0,this.maskMaterial.uniforms.uMap.value=e}pickNearbyTarget(){const t=this.root.position;let e=t.x,n=t.z;for(let s=0;s<8;s++){const o=Math.random()*Math.PI*2,r=.85+Math.random()*1.15,a=Be.clamp(t.x+Math.cos(o)*r,this.bounds.xMin,this.bounds.xMax),c=Be.clamp(t.z+Math.sin(o)*r,this.bounds.zMin,this.bounds.zMax);if(Math.hypot(a-t.x,c-t.z)>.55){e=a,n=c;break}}this.targetPos.set(e,this.bounds.y,n)}update(t,e,n){const s=be.uWindStrength.value;n.getWorldPosition(this._tempCam);const o=this._tempCam.x-this.root.position.x,r=this._tempCam.z-this.root.position.z,a=Math.atan2(o,r);if(this.spriteMesh.rotation.y=a,this.stateTimer+=t,this.frameTimer+=t,this.state==="ACTION"){const d=this.role==="knight"?["idle0","idle1","patrol0","patrol1","patrol0","idle1"]:["idle0","work0","work1","work0","work1","idle1"],p=this.role==="knight"?.25:.23;if(this.frameTimer>=p){this.frameTimer-=p,this.frameIndex++;const g=this.frameIndex%d.length;this.role==="farmer"&&(g===2||g===4)?this.particles.emit(this.root.position.x+this.facing*.22,this.bounds.y,this.root.position.z,3,"straw"):this.role==="knight"&&g===3&&this.particles.emit(this.root.position.x,this.bounds.y,this.root.position.z,2,"leaf"),this.frameIndex>=d.length&&(this.frameIndex=0,this.cyclesRemaining--,this.cyclesRemaining<=0&&(this.state="PAUSE",this.stateTimer=0,this.pauseDuration=1.35+Math.random()*.9,this.pauseFlipped=!1,this.frameIndex=0))}this.setFrame(d[this.frameIndex%d.length])}else if(this.state==="PAUSE"){const d=["idle0","idle1"];this.frameTimer>=.34&&(this.frameTimer-=.34,this.frameIndex=(this.frameIndex+1)%d.length),this.setFrame(d[this.frameIndex]),!this.pauseFlipped&&this.stateTimer>=this.pauseDuration*.45&&(this.facing*=-1,this.pauseFlipped=!0),this.stateTimer>=this.pauseDuration&&(this.pickNearbyTarget(),this.state="WALK",this.stateTimer=0,this.frameIndex=0,this.stepEmitTimer=0)}else if(this.state==="WALK"){const d=this.root.position,p=this.targetPos.x-d.x,g=this.targetPos.z-d.z,v=Math.hypot(p,g),m=Math.cos(a),f=-Math.sin(a),T=p*m+g*f;Math.abs(T)>.05&&(this.facing=T>=0?1:-1);const S=this.role==="knight"?.68:.56;if(v<=.08)d.x=this.targetPos.x,d.z=this.targetPos.z,this.state="ACTION",this.stateTimer=0,this.frameIndex=0,this.cyclesRemaining=2+Math.floor(Math.random()*2);else{const M=Math.min(v,S*t);d.x+=p/v*M,d.z+=g/v*M;const L=["walk0","walk1","walk2","walk1"];this.frameTimer>=.18&&(this.frameTimer-=.18,this.frameIndex=(this.frameIndex+1)%L.length),this.setFrame(L[this.frameIndex]),this.stepEmitTimer+=t,this.stepEmitTimer>=.36&&(this.stepEmitTimer=0,this.particles.emit(d.x,this.bounds.y,d.z,2,this.role==="knight"?"leaf":"straw"))}}const c=Math.sin(e*2.6+this.breathPhase),l=1+c*.022,h=this.facing*(1-c*.012);this.spriteMesh.scale.set(h,l,1);const u=Math.sin(e*3.4+this.breathPhase)*.016*(.7+s*.4);this.spriteMesh.rotation.z=u}}function Ug(){const i=new jt;i.name="PixelCharacters";const t=Sr(Cg,Tg),e=Sr(Qc,Kl),n=Sr(Qc,Ag),s=Pg(),o=new Lg(i),r=[new xo({name:"ChibiKnight",role:"knight",frames:t,bounds:{xMin:-1.45,xMax:1.45,zMin:4.92,zMax:5.55,y:.03},startPos:{x:.15,z:5.25},size:.98,particleSystem:o,softShadowTex:s}),new xo({name:"WheatFarmerLeft",role:"farmer",frames:e,bounds:{xMin:-4.8,xMax:-1.85,zMin:7.85,zMax:9.85,y:.08},startPos:{x:-3.15,z:8.85},size:.9,particleSystem:o,softShadowTex:s}),new xo({name:"WheatFarmerRight",role:"farmer",frames:n,bounds:{xMin:1.7,xMax:4.9,zMin:7.85,zMax:9.85,y:.08},startPos:{x:2.45,z:8.75},size:.9,particleSystem:o,softShadowTex:s}),new xo({name:"TerraceFarmer",role:"farmer",frames:e,bounds:{xMin:-4.9,xMax:-2.4,zMin:4.05,zMax:4.95,y:.08},startPos:{x:-3.7,z:4.48},size:.88,particleSystem:o,softShadowTex:s})];for(const a of r)i.add(a.root);return{group:i,characters:r,update(a,c,l){for(const h of r)h.update(a,c,l);o.update(a)}}}const _i={sunny:{label:"晴朗",wind:.75,rain:0,snow:0,mist:0,cloudOpacity:.72,cloudTint:16777215,skyDesat:0,sunMult:1,fogDensity:.0085,inkStrength:.66,windowBoost:0},rain:{label:"细雨",wind:1.65,rain:1,snow:0,mist:.35,cloudOpacity:.88,cloudTint:10135736,skyDesat:.55,sunMult:.55,fogDensity:.017,inkStrength:.58,windowBoost:.55},snow:{label:"飘雪",wind:.95,rain:0,snow:1,mist:.28,cloudOpacity:.85,cloudTint:15134198,skyDesat:.35,sunMult:.78,fogDensity:.0155,inkStrength:.54,windowBoost:.45},fog:{label:"薄雾",wind:.42,rain:0,snow:0,mist:1,cloudOpacity:.82,cloudTint:15789800,skyDesat:.42,sunMult:.7,fogDensity:.025,inkStrength:.48,windowBoost:.3}},cn={day:{label:"日间",sky:14280946,fog:14674414,sunColor:16774622,sunIntensity:1.95,hemiSky:14216191,hemiGround:10785914,hemiIntensity:1.05,sunAzimuth:.68,sunElevation:.94,inkColor:3089964,windowBase:.38,darkUI:!1},dusk:{label:"暮色",sky:15185560,fog:14857116,sunColor:16756331,sunIntensity:1.75,hemiSky:16040868,hemiGround:7100772,hemiIntensity:.88,sunAzimuth:1.25,sunElevation:.44,inkColor:3482411,windowBase:1.05,darkUI:!1},night:{label:"星夜",sky:2371658,fog:2437708,sunColor:10994928,sunIntensity:.88,hemiSky:4940945,hemiGround:2631480,hemiIntensity:.72,sunAzimuth:-.65,sunElevation:.82,inkColor:1448230,windowBase:1.55,darkUI:!0}};function Ng(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(128/2,128/2,6,128/2,128/2,128/2);return n.addColorStop(0,"rgba(248, 250, 252, 0.42)"),n.addColorStop(.5,"rgba(244, 248, 252, 0.18)"),n.addColorStop(1,"rgba(244, 248, 252, 0.0)"),e.fillStyle=n,e.fillRect(0,0,128,128),new zs(t)}function Fg({scene:i,sunLight:t,hemiLight:e,fillLight:n,outlineComposer:s,glowMaterials:o,waterUniforms:r}){const a=new jt;a.name="WeatherAndAtmosphere",i.add(a);let c="sunny",l="day";const h={wind:_i.sunny.wind,rain:0,snow:0,mist:0,cloudOpacity:_i.sunny.cloudOpacity,sunMult:1,fogDensity:_i.sunny.fogDensity,inkStrength:_i.sunny.inkStrength,windowGlow:cn.day.windowBase,sunAzimuth:cn.day.sunAzimuth,sunElevation:cn.day.sunElevation,skyColor:new kt(cn.day.sky),fogColor:new kt(cn.day.fog),sunColor:new kt(cn.day.sunColor),hemiSky:new kt(cn.day.hemiSky),hemiGround:new kt(cn.day.hemiGround),inkColor:new kt(cn.day.inkColor),cloudColor:new kt(16777215)},u=new Di({color:16777215,gradientMap:ms(),transparent:!0,opacity:.72,depthWrite:!1}),d=[],p=[{x:-11,y:12.2,z:-7.5,s:1.15,spd:.36},{x:-2,y:13.4,z:-9.8,s:1.35,spd:.28},{x:7.5,y:11.8,z:-5.2,s:1.05,spd:.34},{x:-7.5,y:12.8,z:3.5,s:.92,spd:.42},{x:4.2,y:13.8,z:6.2,s:.85,spd:.31}];for(const ht of p){const ut=new jt,Tt=[[0,0,0,1.05,.42,.72],[-.85,-.06,.12,.78,.34,.6],[.9,-.04,-.08,.82,.36,.62],[.18,.16,-.15,.68,.32,.56]];for(const[Lt,Dt,qt,lt,_t,E]of Tt){const It=new A(new si(1,1),u);It.position.set(Lt,Dt,qt),It.scale.set(lt,_t,E),It.userData.noOutline=!0,ut.add(It)}ut.position.set(ht.x,ht.y,ht.z),ut.scale.setScalar(ht.s),a.add(ut),d.push({mesh:ut,baseY:ht.y,speed:ht.spd,seed:ht.x})}const g=650,v=new Float32Array(g*6),m=[];for(let ht=0;ht<g;ht++){const ut=(Math.random()-.5)*28,Tt=Math.random()*16,Lt=(Math.random()-.5)*28,Dt=13.5+Math.random()*4.5,qt=.62+Math.random()*.35;m.push({x:ut,y:Tt,z:Lt,speed:Dt,len:qt})}const f=new ke;f.setAttribute("position",new hn(v,3));const T=new Pl({color:14280949,transparent:!0,opacity:0,depthWrite:!1}),S=new Iu(f,T);S.userData.noOutline=!0,S.visible=!1,a.add(S);const M=700,L=new Float32Array(M*3),R=[];for(let ht=0;ht<M;ht++){const ut=(Math.random()-.5)*28,Tt=Math.random()*16,Lt=(Math.random()-.5)*28;R.push({x:ut,y:Tt,z:Lt,speed:1.45+Math.random()*1,phase:Math.random()*Math.PI*2}),L[ht*3]=ut,L[ht*3+1]=Tt,L[ht*3+2]=Lt}const C=new ke;C.setAttribute("position",new hn(L,3));const P=document.createElement("canvas");P.width=32,P.height=32;const w=P.getContext("2d"),y=w.createRadialGradient(16,16,2,16,16,15);y.addColorStop(0,"rgba(255,255,255,1)"),y.addColorStop(.6,"rgba(245,250,255,0.85)"),y.addColorStop(1,"rgba(245,250,255,0)"),w.fillStyle=y,w.fillRect(0,0,32,32);const D=new zs(P),Y=new Dl({map:D,color:16777215,size:.28,transparent:!0,opacity:0,depthWrite:!1}),H=new Uu(C,Y);H.userData.noOutline=!0,H.visible=!1,a.add(H);const et=Ng(),it=[];for(let ht=0;ht<10;ht++){const ut=new Os({map:et,color:16054008,transparent:!0,opacity:0,depthWrite:!1,side:Ve}),Tt=new A(new Ne(8.5+ht%3*2.5,4.2),ut);Tt.rotation.x=-Math.PI/2;const Lt=(ht%5-2)*5.2,Dt=-6.5+Math.floor(ht/5)*11.5,qt=.75+ht%3*.65;Tt.position.set(Lt,qt,Dt),Tt.userData.noOutline=!0,Tt.visible=!1,a.add(Tt),it.push({mesh:Tt,baseX:Lt,baseY:qt,baseZ:Dt,speed:.35+ht%3*.14})}const q=new kt,$=new kt,j=new kt,yt=new kt,Rt=new kt,ft=new kt,Vt=new kt,Jt=new kt(10465472),nt=new kt(14542578),xt=new kt(15133932);return{setWeather(ht){_i[ht]&&(c=ht)},setTimeOfDay(ht){cn[ht]&&(l=ht)},getState(){return{weatherKey:c,timeKey:l}},update(ht,ut){const Tt=_i[c],Lt=cn[l],Dt=1-Math.exp(-ht*2.1);q.setHex(Lt.sky),$.setHex(Lt.fog),j.setHex(Lt.sunColor),yt.setHex(Lt.hemiSky),Rt.setHex(Lt.hemiGround),ft.setHex(Lt.inkColor),Vt.setHex(Tt.cloudTint),c==="rain"?(q.lerp(Jt,l==="night"?.2:l==="dusk"?.35:.6),$.lerp(Jt,l==="night"?.2:l==="dusk"?.38:.62),j.lerp(new kt(13359592),l==="dusk"?.25:.55)):c==="snow"?(q.lerp(nt,l==="night"?.12:l==="dusk"?.2:.48),$.lerp(nt,l==="night"?.14:l==="dusk"?.22:.52)):c==="fog"&&(q.lerp(xt,l==="night"?.18:l==="dusk"?.32:.55),$.lerp(xt,l==="night"?.2:l==="dusk"?.36:.65)),l==="dusk"?Vt.lerp(new kt(16764336),.52):l==="night"&&Vt.lerp(new kt(4938877),.72),h.wind=Be.lerp(h.wind,Tt.wind,Dt),h.rain=Be.lerp(h.rain,Tt.rain,Dt),h.snow=Be.lerp(h.snow,Tt.snow,Dt),h.mist=Be.lerp(h.mist,Tt.mist,Dt),h.cloudOpacity=Be.lerp(h.cloudOpacity,Tt.cloudOpacity,Dt),h.sunMult=Be.lerp(h.sunMult,Tt.sunMult,Dt),h.fogDensity=Be.lerp(h.fogDensity,Tt.fogDensity,Dt),h.inkStrength=Be.lerp(h.inkStrength,Tt.inkStrength,Dt),h.windowGlow=Be.lerp(h.windowGlow,Lt.windowBase+Tt.windowBoost,Dt),h.sunAzimuth=Be.lerp(h.sunAzimuth,Lt.sunAzimuth,Dt),h.sunElevation=Be.lerp(h.sunElevation,Lt.sunElevation,Dt),h.skyColor.lerp(q,Dt),h.fogColor.lerp($,Dt),h.sunColor.lerp(j,Dt),h.hemiSky.lerp(yt,Dt),h.hemiGround.lerp(Rt,Dt),h.inkColor.lerp(ft,Dt),h.cloudColor.lerp(Vt,Dt),be.uWindStrength.value=h.wind,be.uSnowAmount.value=Be.lerp(be.uSnowAmount.value,Tt.snow,1-Math.exp(-ht*1.15)),be.uWetness.value=h.rain,be.uGlowIntensity.value=h.windowGlow,r.uRainIntensity.value=h.rain;const qt=Math.sin(ut*.14)*.14,lt=Math.cos(ut*.11)*.04,_t=h.sunAzimuth+qt,E=h.sunElevation+lt,It=28;t.position.set(Math.cos(E)*Math.sin(_t)*It,Math.sin(E)*It,Math.cos(E)*Math.cos(_t)*It),t.color.copy(h.sunColor),t.intensity=Lt.sunIntensity*h.sunMult,e.color.copy(h.hemiSky),e.groundColor.copy(h.hemiGround),e.intensity=Lt.hemiIntensity,n.color.copy(h.hemiSky),n.intensity=.32*(l==="night"?.65:1),i.background=h.skyColor,i.fog&&(i.fog.color.copy(h.fogColor),i.fog.density=h.fogDensity),s.setInkStyle(h.inkColor,h.inkStrength);for(const mt of o){const F=mt.userData.baseGlow??.6;mt.emissiveIntensity=F*h.windowGlow}u.color.copy(h.cloudColor),u.opacity=h.cloudOpacity;for(const mt of d)mt.mesh.position.x+=ht*mt.speed*(.7+h.wind*.45),mt.mesh.position.y=mt.baseY+Math.sin(ut*.4+mt.seed)*.18,mt.mesh.position.x>16&&(mt.mesh.position.x=-16);if(S.visible=h.rain>.02,S.visible){T.opacity=h.rain*.48;const mt=f.attributes.position,F=.24*h.wind;for(let st=0;st<g;st++){const G=m[st];G.y-=G.speed*ht,G.x+=F*G.speed*.12*ht,G.y<-.5&&(G.y=14.5+Math.random()*2.5,G.x=(Math.random()-.5)*28,G.z=(Math.random()-.5)*28);const x=st*6;mt.array[x]=G.x,mt.array[x+1]=G.y,mt.array[x+2]=G.z,mt.array[x+3]=G.x-F*G.len,mt.array[x+4]=G.y+G.len,mt.array[x+5]=G.z}mt.needsUpdate=!0}if(H.visible=h.snow>.02,H.visible){Y.opacity=h.snow*.88;const mt=C.attributes.position;for(let F=0;F<M;F++){const st=R[F];st.y-=st.speed*ht,st.x+=(Math.sin(ut*1.1+st.phase)*.55+h.wind*.38)*ht,st.z+=Math.cos(ut*.9+st.phase)*.35*ht,st.y<-.5&&(st.y=15+Math.random()*2,st.x=(Math.random()-.5)*28,st.z=(Math.random()-.5)*28),mt.array[F*3]=st.x,mt.array[F*3+1]=st.y,mt.array[F*3+2]=st.z}mt.needsUpdate=!0}const pt=h.mist>.02;for(const mt of it)mt.mesh.visible=pt,pt&&(mt.mesh.position.x+=ht*mt.speed*(.6+h.wind*.35),mt.mesh.position.x>13.5&&(mt.mesh.position.x=-13.5),mt.mesh.material.opacity=h.mist*.52,mt.mesh.material.color.copy(h.fogColor).lerp(new kt(16777215),.45));return h.sunColor}}}const Og={sunny:"☀",rain:"🌧",snow:"❄",fog:"☁"},zg={day:"☼",dusk:"◐",night:"☾"};function Bg(i,t){const e=document.createElement("div");e.className="diorama-ui",e.setAttribute("role","toolbar"),e.setAttribute("aria-label","天气与光影控制");const n=document.createElement("div");n.className="ui-group";const s={};for(const[p,g]of Object.entries(_i)){const v=document.createElement("button");v.type="button",v.className="ui-btn",v.dataset.weather=p,v.innerHTML=`<span class="icon">${Og[p]||""}</span><span>${g.label}</span>`,v.addEventListener("click",()=>{t.setWeather(p),d()}),n.appendChild(v),s[p]=v}const o=document.createElement("div");o.className="ui-divider";const r=document.createElement("div");r.className="ui-group";const a={};for(const[p,g]of Object.entries(cn)){const v=document.createElement("button");v.type="button",v.className="ui-btn",v.dataset.time=p,v.innerHTML=`<span class="icon">${zg[p]||""}</span><span>${g.label}</span>`,v.addEventListener("click",()=>{t.setTimeOfDay(p),d()}),r.appendChild(v),a[p]=v}e.append(n,o,r),i.appendChild(e);const c=document.createElement("button");c.type="button",c.className="ui-toggle-corner",c.title="隐藏 / 显示天气界面 (H)",c.setAttribute("aria-label","切换界面显示");let l=!0;function h(){c.innerHTML=l?'<svg viewBox="0 0 24 24"><path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.2 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6.2 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>'}function u(p){l=p,e.classList.toggle("is-hidden",!l),h()}c.addEventListener("click",()=>u(!l)),window.addEventListener("keydown",p=>{(p.key==="h"||p.key==="H")&&u(!l)}),i.appendChild(c),h();function d(){var m;const{weatherKey:p,timeKey:g}=t.getState();for(const[f,T]of Object.entries(s))T.classList.toggle("is-active",f===p);for(const[f,T]of Object.entries(a))T.classList.toggle("is-active",f===g);const v=!!((m=cn[g])!=null&&m.darkUI);e.classList.toggle("is-dark",v),c.classList.toggle("is-dark",v)}return d(),{syncActive:d,setVisible:u}}const kg=document.getElementById("app"),Hg=document.getElementById("ui-root"),yn=new ig({antialias:!0,powerPreference:"high-performance"}),Gg=Math.min(window.devicePixelRatio||1,2);yn.setPixelRatio(Gg);yn.setSize(window.innerWidth,window.innerHeight);yn.shadowMap.enabled=!0;yn.shadowMap.type=nl;yn.toneMapping=sl;yn.toneMappingExposure=1.05;yn.outputColorSpace=Ke;kg.appendChild(yn.domElement);const un=new Cl;un.background=new kt(14280946);un.fog=new Sa(14674414,.0085);const Ei=new gn(36,window.innerWidth/window.innerHeight,.5,140);Ei.position.set(18.6,17.6,27.4);const Qe=new og(Ei,yn.domElement);Qe.enableDamping=!0;Qe.dampingFactor=.06;Qe.enablePan=!0;Qe.panSpeed=.6;Qe.rotateSpeed=.72;Qe.zoomSpeed=.9;Qe.minDistance=10.5;Qe.maxDistance=56;Qe.minPolarAngle=.22;Qe.maxPolarAngle=Math.PI*.475;Qe.target.set(0,2.35,-.65);Qe.update();const jl=new pd(14216191,10785914,1.05);un.add(jl);const dn=new Gl(16774622,1.95);dn.position.set(14,22,16);dn.castShadow=!0;dn.shadow.mapSize.set(2048,2048);dn.shadow.camera.near=4;dn.shadow.camera.far=68;const Bo=17.5;dn.shadow.camera.left=-Bo;dn.shadow.camera.right=Bo;dn.shadow.camera.top=Bo;dn.shadow.camera.bottom=-Bo;dn.shadow.bias=-55e-5;dn.shadow.normalBias=.035;un.add(dn);const Da=new Gl(12376309,.32);Da.position.set(-16,11,-14);un.add(Da);const La=new vg(yn,un,Ei),$l={uRainIntensity:{value:0}},Jl=yg($l),Ia=Sg(),Ua=wg(),Ql=Eg(),th=Ug();un.add(Jl.group);un.add(Ia.group);un.add(Ua.group);un.add(Ql.group);un.add(th.group);const Vg=[...Ia.glowMaterials,...Ua.glowMaterials],Na=Fg({scene:un,sunLight:dn,hemiLight:jl,fillLight:Da,outlineComposer:La,glowMaterials:Vg,waterUniforms:$l});Bg(Hg,Na);window.__DIORAMA__={scene:un,camera:Ei,controls:Qe,weatherSystem:Na};window.addEventListener("resize",()=>{const i=window.innerWidth,t=window.innerHeight,e=Math.min(window.devicePixelRatio||1,2);Ei.aspect=i/t,Ei.updateProjectionMatrix(),yn.setPixelRatio(e),yn.setSize(i,t),La.setSize(i,t,e)});const tl=new vd;function eh(){requestAnimationFrame(eh);const i=Math.min(tl.getDelta(),.05),t=tl.elapsedTime;be.uTime.value=t,Qe.update();const e=Na.update(i,t);Jl.update(i,e),Ia.update(t),Ua.update(i,t),Ql.update(t),th.update(i,t,Ei),La.render()}eh();
