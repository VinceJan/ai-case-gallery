(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eo="170",gl=0,ta=1,_l=2,xc=1,vc=2,un=3,pn=0,Re=1,ze=2,Rn=0,mi=1,ea=2,na=3,ia=4,xl=5,kn=100,vl=101,Ml=102,yl=103,Sl=104,wl=200,bl=201,Tl=202,El=203,Nr=204,Fr=205,Al=206,Cl=207,Rl=208,Pl=209,Dl=210,Ll=211,Il=212,Ul=213,Nl=214,Or=0,Br=1,zr=2,yi=3,kr=4,Hr=5,Vr=6,Gr=7,Mc=0,Fl=1,Ol=2,Pn=0,Bl=1,zl=2,kl=3,yc=4,Hl=5,Vl=6,Gl=7,Sc=300,Si=301,wi=302,Wr=303,Xr=304,Ws=306,$i=1e3,Vn=1001,Yr=1002,Pe=1003,Wl=1004,os=1005,tn=1006,Qs=1007,Gn=1008,mn=1009,wc=1010,bc=1011,Ki=1012,Ao=1013,Wn=1014,en=1015,es=1016,Co=1017,Ro=1018,bi=1020,Tc=35902,Ec=1021,Ac=1022,Ve=1023,Cc=1024,Rc=1025,gi=1026,Ti=1027,Po=1028,Do=1029,Pc=1030,Lo=1031,Io=1033,Is=33776,Us=33777,Ns=33778,Fs=33779,qr=35840,Zr=35841,$r=35842,Kr=35843,Jr=36196,jr=37492,Qr=37496,to=37808,eo=37809,no=37810,io=37811,so=37812,ro=37813,oo=37814,ao=37815,co=37816,lo=37817,ho=37818,uo=37819,fo=37820,po=37821,Os=36492,mo=36494,go=36495,Dc=36283,_o=36284,xo=36285,vo=36286,Xl=3200,Yl=3201,Lc=0,ql=1,An="",Le="srgb",Ai="srgb-linear",Xs="linear",re="srgb",Kn=7680,sa=519,Zl=512,$l=513,Kl=514,Ic=515,Jl=516,jl=517,Ql=518,th=519,ra=35044,oa="300 es",dn=2e3,ks=2001;class Ci{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const we=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let aa=1234567;const Wi=Math.PI/180,Ji=180/Math.PI;function qn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(we[i&255]+we[i>>8&255]+we[i>>16&255]+we[i>>24&255]+"-"+we[t&255]+we[t>>8&255]+"-"+we[t>>16&15|64]+we[t>>24&255]+"-"+we[e&63|128]+we[e>>8&255]+"-"+we[e>>16&255]+we[e>>24&255]+we[n&255]+we[n>>8&255]+we[n>>16&255]+we[n>>24&255]).toLowerCase()}function ve(i,t,e){return Math.max(t,Math.min(e,i))}function Uo(i,t){return(i%t+t)%t}function eh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function nh(i,t,e){return i!==t?(e-i)/(t-i):0}function Xi(i,t,e){return(1-e)*i+e*t}function ih(i,t,e,n){return Xi(i,t,1-Math.exp(-e*n))}function sh(i,t=1){return t-Math.abs(Uo(i,t*2)-t)}function rh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function oh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ah(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ch(i,t){return i+Math.random()*(t-i)}function lh(i){return i*(.5-Math.random())}function hh(i){i!==void 0&&(aa=i);let t=aa+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function uh(i){return i*Wi}function dh(i){return i*Ji}function fh(i){return(i&i-1)===0&&i!==0}function ph(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function mh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gh(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ui(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ue={DEG2RAD:Wi,RAD2DEG:Ji,generateUUID:qn,clamp:ve,euclideanModulo:Uo,mapLinear:eh,inverseLerp:nh,lerp:Xi,damp:ih,pingpong:sh,smoothstep:rh,smootherstep:oh,randInt:ah,randFloat:ch,randFloatSpread:lh,seededRandom:hh,degToRad:uh,radToDeg:dh,isPowerOfTwo:fh,ceilPowerOfTwo:ph,floorPowerOfTwo:mh,setQuaternionFromProperEuler:gh,normalize:Ee,denormalize:ui};class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,s,r,o,a,c,l){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],v=s[4],x=s[7],L=s[2],A=s[5],E=s[8];return r[0]=o*_+a*M+c*L,r[3]=o*m+a*v+c*A,r[6]=o*p+a*x+c*E,r[1]=l*_+h*M+u*L,r[4]=l*m+h*v+u*A,r[7]=l*p+h*x+u*E,r[2]=f*_+d*M+g*L,r[5]=f*m+d*v+g*A,r[8]=f*p+d*x+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(tr.makeScale(t,e)),this}rotate(t){return this.premultiply(tr.makeRotation(-t)),this}translate(t,e){return this.premultiply(tr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const tr=new Gt;function Uc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Hs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _h(){const i=Hs("canvas");return i.style.display="block",i}const ca={};function Vi(i){i in ca||(ca[i]=!0,console.warn(i))}function xh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function vh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Mh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jt={enabled:!0,workingColorSpace:Ai,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===re&&(i.r=fn(i.r),i.g=fn(i.g),i.b=fn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===re&&(i.r=_i(i.r),i.g=_i(i.g),i.b=_i(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===An?Xs:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const la=[.64,.33,.3,.6,.15,.06],ha=[.2126,.7152,.0722],ua=[.3127,.329],da=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fa=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[Ai]:{primaries:la,whitePoint:ua,transfer:Xs,toXYZ:da,fromXYZ:fa,luminanceCoefficients:ha,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:la,whitePoint:ua,transfer:re,toXYZ:da,fromXYZ:fa,luminanceCoefficients:ha,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}});let Jn;class yh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Jn===void 0&&(Jn=Hs("canvas")),Jn.width=t.width,Jn.height=t.height;const n=Jn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Jn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=fn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(fn(e[n]/255)*255):e[n]=fn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Sh=0;class Nc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=qn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(er(s[o].image)):r.push(er(s[o]))}else r=er(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function er(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wh=0;class Te extends Ci{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,n=Vn,s=Vn,r=tn,o=Gn,a=Ve,c=mn,l=Te.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=qn(),this.name="",this.source=new Nc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $i:t.x=t.x-Math.floor(t.x);break;case Vn:t.x=t.x<0?0:1;break;case Yr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $i:t.y=t.y-Math.floor(t.y);break;case Vn:t.y=t.y<0?0:1;break;case Yr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=Sc;Te.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,x=(d+1)/2,L=(p+1)/2,A=(h+f)/4,E=(u+_)/4,P=(g+m)/4;return v>x&&v>L?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=E/n):x>L?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=P/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=E/r,s=P/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bh extends Ci{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Te(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Nc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends bh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Fc extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Th extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a;const p=c*f+l*d+h*g+u*_,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const L=Math.sqrt(v),A=Math.atan2(L,p*M);m=Math.sin(m*A)/L,a=Math.sin(a*A)/L}const x=a*M;if(c=c*m+f*x,l=l*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return nr.copy(this).projectOnVector(t),this.sub(nr)}reflect(t){return this.sub(nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nr=new C,pa=new ns;class Zn{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,qe):qe.fromBufferAttribute(r,o),qe.applyMatrix4(t.matrixWorld),this.expandByPoint(qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),as.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),as.copy(n.boundingBox)),as.applyMatrix4(t.matrixWorld),this.union(as)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qe),qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ui),cs.subVectors(this.max,Ui),jn.subVectors(t.a,Ui),Qn.subVectors(t.b,Ui),ti.subVectors(t.c,Ui),Mn.subVectors(Qn,jn),yn.subVectors(ti,Qn),Ln.subVectors(jn,ti);let e=[0,-Mn.z,Mn.y,0,-yn.z,yn.y,0,-Ln.z,Ln.y,Mn.z,0,-Mn.x,yn.z,0,-yn.x,Ln.z,0,-Ln.x,-Mn.y,Mn.x,0,-yn.y,yn.x,0,-Ln.y,Ln.x,0];return!ir(e,jn,Qn,ti,cs)||(e=[1,0,0,0,1,0,0,0,1],!ir(e,jn,Qn,ti,cs))?!1:(ls.crossVectors(Mn,yn),e=[ls.x,ls.y,ls.z],ir(e,jn,Qn,ti,cs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(on[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),on[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),on[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),on[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),on[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),on[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),on[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),on[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(on),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const on=[new C,new C,new C,new C,new C,new C,new C,new C],qe=new C,as=new Zn,jn=new C,Qn=new C,ti=new C,Mn=new C,yn=new C,Ln=new C,Ui=new C,cs=new C,ls=new C,In=new C;function ir(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){In.fromArray(i,r);const a=s.x*Math.abs(In.x)+s.y*Math.abs(In.y)+s.z*Math.abs(In.z),c=t.dot(In),l=e.dot(In),h=n.dot(In);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Eh=new Zn,Ni=new C,sr=new C;class Ri{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Eh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ni.subVectors(t,this.center);const e=Ni.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ni,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ni.copy(t.center).add(sr)),this.expandByPoint(Ni.copy(t.center).sub(sr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new C,rr=new C,hs=new C,Sn=new C,or=new C,us=new C,ar=new C;class Oc{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){rr.copy(t).add(e).multiplyScalar(.5),hs.copy(e).sub(t).normalize(),Sn.copy(this.origin).sub(rr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(hs),a=Sn.dot(this.direction),c=-Sn.dot(hs),l=Sn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(rr).addScaledVector(hs,f),d}intersectSphere(t,e){an.subVectors(t.center,this.origin);const n=an.dot(this.direction),s=an.dot(an)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,n,s,r){or.subVectors(e,t),us.subVectors(n,t),ar.crossVectors(or,us);let o=this.direction.dot(ar),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Sn.subVectors(this.origin,t);const c=a*this.direction.dot(us.crossVectors(Sn,us));if(c<0)return null;const l=a*this.direction.dot(or.cross(Sn));if(l<0||c+l>o)return null;const h=-a*Sn.dot(ar);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ei.setFromMatrixColumn(t,0).length(),r=1/ei.setFromMatrixColumn(t,1).length(),o=1/ei.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ah,t,Ch)}lookAt(t,e,n){const s=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),wn.crossVectors(n,Fe),wn.lengthSq()===0&&(Math.abs(n.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),wn.crossVectors(n,Fe)),wn.normalize(),ds.crossVectors(Fe,wn),s[0]=wn.x,s[4]=ds.x,s[8]=Fe.x,s[1]=wn.y,s[5]=ds.y,s[9]=Fe.y,s[2]=wn.z,s[6]=ds.z,s[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],v=n[7],x=n[11],L=n[15],A=s[0],E=s[4],P=s[8],b=s[12],S=s[1],D=s[5],k=s[9],B=s[13],Y=s[2],Z=s[6],X=s[10],W=s[14],O=s[3],nt=s[7],ht=s[11],ft=s[15];return r[0]=o*A+a*S+c*Y+l*O,r[4]=o*E+a*D+c*Z+l*nt,r[8]=o*P+a*k+c*X+l*ht,r[12]=o*b+a*B+c*W+l*ft,r[1]=h*A+u*S+f*Y+d*O,r[5]=h*E+u*D+f*Z+d*nt,r[9]=h*P+u*k+f*X+d*ht,r[13]=h*b+u*B+f*W+d*ft,r[2]=g*A+_*S+m*Y+p*O,r[6]=g*E+_*D+m*Z+p*nt,r[10]=g*P+_*k+m*X+p*ht,r[14]=g*b+_*B+m*W+p*ft,r[3]=M*A+v*S+x*Y+L*O,r[7]=M*E+v*D+x*Z+L*nt,r[11]=M*P+v*k+x*X+L*ht,r[15]=M*b+v*B+x*W+L*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,v=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,x=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,L=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,A=e*M+n*v+s*x+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return t[0]=M*E,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*E,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*E,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*E,t[4]=v*E,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*E,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*E,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*E,t[8]=x*E,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*E,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*E,t[12]=L*E,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*E,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*E,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,M=c*l,v=c*h,x=c*u,L=n.x,A=n.y,E=n.z;return s[0]=(1-(_+p))*L,s[1]=(d+x)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(d-x)*A,s[5]=(1-(f+p))*A,s[6]=(m+M)*A,s[7]=0,s[8]=(g+v)*E,s[9]=(m-M)*E,s[10]=(1-(f+_))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ei.set(s[0],s[1],s[2]).length();const o=ei.set(s[4],s[5],s[6]).length(),a=ei.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ze.copy(this);const l=1/r,h=1/o,u=1/a;return Ze.elements[0]*=l,Ze.elements[1]*=l,Ze.elements[2]*=l,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=u,Ze.elements[9]*=u,Ze.elements[10]*=u,e.setFromRotationMatrix(Ze),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=dn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,g;if(a===dn)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ks)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=dn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*l,d=(n+s)*h;let g,_;if(a===dn)g=(o+r)*u,_=-2*u;else if(a===ks)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ei=new C,Ze=new se,Ah=new C(0,0,0),Ch=new C(1,1,1),wn=new C,ds=new C,Fe=new C,ma=new se,ga=new ns;class gn{constructor(t=0,e=0,n=0,s=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ve(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ma.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ma,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ga.setFromEuler(this),this.setFromQuaternion(ga,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class Bc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rh=0;const _a=new C,ni=new ns,cn=new se,fs=new C,Fi=new C,Ph=new C,Dh=new ns,xa=new C(1,0,0),va=new C(0,1,0),Ma=new C(0,0,1),ya={type:"added"},Lh={type:"removed"},ii={type:"childadded",child:null},cr={type:"childremoved",child:null};class me extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new C,e=new gn,n=new ns,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Gt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.multiply(ni),this}rotateOnWorldAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.premultiply(ni),this}rotateX(t){return this.rotateOnAxis(xa,t)}rotateY(t){return this.rotateOnAxis(va,t)}rotateZ(t){return this.rotateOnAxis(Ma,t)}translateOnAxis(t,e){return _a.copy(t).applyQuaternion(this.quaternion),this.position.add(_a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xa,t)}translateY(t){return this.translateOnAxis(va,t)}translateZ(t){return this.translateOnAxis(Ma,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fs.copy(t):fs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(Fi,fs,this.up):cn.lookAt(fs,Fi,this.up),this.quaternion.setFromRotationMatrix(cn),s&&(cn.extractRotation(s.matrixWorld),ni.setFromRotationMatrix(cn),this.quaternion.premultiply(ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ya),ii.child=t,this.dispatchEvent(ii),ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Lh),cr.child=t,this.dispatchEvent(cr),cr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ya),ii.child=t,this.dispatchEvent(ii),ii.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,t,Ph),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,Dh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}me.DEFAULT_UP=new C(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $e=new C,ln=new C,lr=new C,hn=new C,si=new C,ri=new C,Sa=new C,hr=new C,ur=new C,dr=new C,fr=new oe,pr=new oe,mr=new oe;class Ke{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),$e.subVectors(t,e),s.cross($e);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){$e.subVectors(s,e),ln.subVectors(n,e),lr.subVectors(t,e);const o=$e.dot($e),a=$e.dot(ln),c=$e.dot(lr),l=ln.dot(ln),h=ln.dot(lr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,hn)===null?!1:hn.x>=0&&hn.y>=0&&hn.x+hn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,hn.x),c.addScaledVector(o,hn.y),c.addScaledVector(a,hn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return fr.setScalar(0),pr.setScalar(0),mr.setScalar(0),fr.fromBufferAttribute(t,e),pr.fromBufferAttribute(t,n),mr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(fr,r.x),o.addScaledVector(pr,r.y),o.addScaledVector(mr,r.z),o}static isFrontFacing(t,e,n,s){return $e.subVectors(n,e),ln.subVectors(t,e),$e.cross(ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),$e.cross(ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ke.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;si.subVectors(s,n),ri.subVectors(r,n),hr.subVectors(t,n);const c=si.dot(hr),l=ri.dot(hr);if(c<=0&&l<=0)return e.copy(n);ur.subVectors(t,s);const h=si.dot(ur),u=ri.dot(ur);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(si,o);dr.subVectors(t,r);const d=si.dot(dr),g=ri.dot(dr);if(g>=0&&d<=g)return e.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ri,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Sa.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Sa,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(si,o).addScaledVector(ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},ps={h:0,s:0,l:0};function gr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=Uo(t,1),e=ve(e,0,1),n=ve(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=gr(o,r,t+1/3),this.g=gr(o,r,t),this.b=gr(o,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){const n=zc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fn(t.r),this.g=fn(t.g),this.b=fn(t.b),this}copyLinearToSRGB(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return Jt.fromWorkingColorSpace(be.copy(this),t),Math.round(ve(be.r*255,0,255))*65536+Math.round(ve(be.g*255,0,255))*256+Math.round(ve(be.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(be.copy(this),e);const n=be.r,s=be.g,r=be.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=Le){Jt.fromWorkingColorSpace(be.copy(this),t);const e=be.r,n=be.g,s=be.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(bn),this.setHSL(bn.h+t,bn.s+e,bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(bn),t.getHSL(ps);const n=Xi(bn.h,ps.h,e),s=Xi(bn.s,ps.s,e),r=Xi(bn.l,ps.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const be=new Ot;Ot.NAMES=zc;let Ih=0;class Pi extends Ci{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=qn(),this.name="",this.blending=mi,this.side=pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nr,this.blendDst=Fr,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==mi&&(n.blending=this.blending),this.side!==pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Nr&&(n.blendSrc=this.blendSrc),this.blendDst!==Fr&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Kn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Kn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ie extends Pi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new C,ms=new ct;class Je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ra,this.updateRanges=[],this.gpuType=en,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ms.fromBufferAttribute(this,e),ms.applyMatrix3(t),this.setXY(e,ms.x,ms.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ui(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ui(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ui(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ui(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ui(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ra&&(t.usage=this.usage),t}}class kc extends Je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Hc extends Je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Qt extends Je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Uh=0;const He=new se,_r=new me,oi=new C,Oe=new Zn,Oi=new Zn,xe=new C;class Me extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Uc(t)?Hc:kc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return He.makeRotationFromQuaternion(t),this.applyMatrix4(He),this}rotateX(t){return He.makeRotationX(t),this.applyMatrix4(He),this}rotateY(t){return He.makeRotationY(t),this.applyMatrix4(He),this}rotateZ(t){return He.makeRotationZ(t),this.applyMatrix4(He),this}translate(t,e,n){return He.makeTranslation(t,e,n),this.applyMatrix4(He),this}scale(t,e,n){return He.makeScale(t,e,n),this.applyMatrix4(He),this}lookAt(t){return _r.lookAt(t),_r.updateMatrix(),this.applyMatrix4(_r.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oi).negate(),this.translate(oi.x,oi.y,oi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Qt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Oe.setFromBufferAttribute(r),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,Oe.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,Oe.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(Oe.min),this.boundingBox.expandByPoint(Oe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Oe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Oi.setFromBufferAttribute(a),this.morphTargetsRelative?(xe.addVectors(Oe.min,Oi.min),Oe.expandByPoint(xe),xe.addVectors(Oe.max,Oi.max),Oe.expandByPoint(xe)):(Oe.expandByPoint(Oi.min),Oe.expandByPoint(Oi.max))}Oe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)xe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(xe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)xe.fromBufferAttribute(a,l),c&&(oi.fromBufferAttribute(t,l),xe.add(oi)),s=Math.max(s,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new C,c[P]=new C;const l=new C,h=new C,u=new C,f=new ct,d=new ct,g=new ct,_=new C,m=new C;function p(P,b,S){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),a[P].add(_),a[b].add(_),a[S].add(_),c[P].add(m),c[b].add(m),c[S].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let P=0,b=M.length;P<b;++P){const S=M[P],D=S.start,k=S.count;for(let B=D,Y=D+k;B<Y;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const v=new C,x=new C,L=new C,A=new C;function E(P){L.fromBufferAttribute(s,P),A.copy(L);const b=a[P];v.copy(b),v.sub(L.multiplyScalar(L.dot(b))).normalize(),x.crossVectors(A,b);const D=x.dot(c[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,D)}for(let P=0,b=M.length;P<b;++P){const S=M[P],D=S.start,k=S.count;for(let B=D,Y=D+k;B<Y;B+=3)E(t.getX(B+0)),E(t.getX(B+1)),E(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Je(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wa=new se,Un=new Oc,gs=new Ri,ba=new C,_s=new C,xs=new C,vs=new C,xr=new C,Ms=new C,Ta=new C,ys=new C;class I extends me{constructor(t=new Me,e=new Ie){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ms.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(xr.fromBufferAttribute(u,t),o?Ms.addScaledVector(xr,h):Ms.addScaledVector(xr.sub(e),h))}e.add(Ms)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gs.copy(n.boundingSphere),gs.applyMatrix4(r),Un.copy(t.ray).recast(t.near),!(gs.containsPoint(Un.origin)===!1&&(Un.intersectSphere(gs,ba)===null||Un.origin.distanceToSquared(ba)>(t.far-t.near)**2))&&(wa.copy(r).invert(),Un.copy(t.ray).applyMatrix4(wa),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),v=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,L=v;x<L;x+=3){const A=a.getX(x),E=a.getX(x+1),P=a.getX(x+2);s=Ss(this,p,t,n,l,h,u,A,E,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=Ss(this,o,t,n,l,h,u,M,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),v=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,L=v;x<L;x+=3){const A=x,E=x+1,P=x+2;s=Ss(this,p,t,n,l,h,u,A,E,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,v=m+1,x=m+2;s=Ss(this,o,t,n,l,h,u,M,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Nh(i,t,e,n,s,r,o,a){let c;if(t.side===Re?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===pn,a),c===null)return null;ys.copy(a),ys.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ys);return l<e.near||l>e.far?null:{distance:l,point:ys.clone(),object:i}}function Ss(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,_s),i.getVertexPosition(c,xs),i.getVertexPosition(l,vs);const h=Nh(i,t,e,n,_s,xs,vs,Ta);if(h){const u=new C;Ke.getBarycoord(Ta,_s,xs,vs,u),s&&(h.uv=Ke.getInterpolatedAttribute(s,a,c,l,u,new ct)),r&&(h.uv1=Ke.getInterpolatedAttribute(r,a,c,l,u,new ct)),o&&(h.normal=Ke.getInterpolatedAttribute(o,a,c,l,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new C,materialIndex:0};Ke.getNormal(_s,xs,vs,f.normal),h.face=f,h.barycoord=u}return h}class j extends Me{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(u,2));function g(_,m,p,M,v,x,L,A,E,P,b){const S=x/E,D=L/P,k=x/2,B=L/2,Y=A/2,Z=E+1,X=P+1;let W=0,O=0;const nt=new C;for(let ht=0;ht<X;ht++){const ft=ht*D-B;for(let Lt=0;Lt<Z;Lt++){const te=Lt*S-k;nt[_]=te*M,nt[m]=ft*v,nt[p]=Y,l.push(nt.x,nt.y,nt.z),nt[_]=0,nt[m]=0,nt[p]=A>0?1:-1,h.push(nt.x,nt.y,nt.z),u.push(Lt/E),u.push(1-ht/P),W+=1}}for(let ht=0;ht<P;ht++)for(let ft=0;ft<E;ft++){const Lt=f+ft+Z*ht,te=f+ft+Z*(ht+1),J=f+(ft+1)+Z*(ht+1),ot=f+(ft+1)+Z*ht;c.push(Lt,te,ot),c.push(te,J,ot),O+=6}a.addGroup(d,O,b),d+=O,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new j(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ei(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ae(i){const t={};for(let e=0;e<i.length;e++){const n=Ei(i[e]);for(const s in n)t[s]=n[s]}return t}function Fh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Oh={clone:Ei,merge:Ae};var Bh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Pi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bh,this.fragmentShader=zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ei(t.uniforms),this.uniformsGroups=Fh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Gc extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new C,Ea=new ct,Aa=new ct;class Be extends Gc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ji*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Wi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(Wi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z)}getViewSize(t,e){return this.getViewBounds(t,Ea,Aa),e.subVectors(Aa,Ea)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Wi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,ci=1;class kh extends me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Be(ai,ci,t,e);s.layers=this.layers,this.add(s);const r=new Be(ai,ci,t,e);r.layers=this.layers,this.add(r);const o=new Be(ai,ci,t,e);o.layers=this.layers,this.add(o);const a=new Be(ai,ci,t,e);a.layers=this.layers,this.add(a);const c=new Be(ai,ci,t,e);c.layers=this.layers,this.add(c);const l=new Be(ai,ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Wc extends Te{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Si,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hh extends Xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Wc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new j(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:Ei(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Re,blending:Rn});r.uniforms.tEquirect.value=e;const o=new I(s,r),a=e.minFilter;return e.minFilter===Gn&&(e.minFilter=tn),new kh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const vr=new C,Vh=new C,Gh=new Gt;class Bn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=vr.subVectors(n,e).cross(Vh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(vr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Gh.getNormalMatrix(t),s=this.coplanarPoint(vr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new Ri,ws=new C;class Ys{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,o=new Bn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=dn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],M=s[13],v=s[14],x=s[15];if(n[0].setComponents(c-r,f-l,m-d,x-p).normalize(),n[1].setComponents(c+r,f+l,m+d,x+p).normalize(),n[2].setComponents(c+o,f+h,m+g,x+M).normalize(),n[3].setComponents(c-o,f-h,m-g,x-M).normalize(),n[4].setComponents(c-a,f-u,m-_,x-v).normalize(),e===dn)n[5].setComponents(c+a,f+u,m+_,x+v).normalize();else if(e===ks)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(t){return Nn.center.set(0,0,0),Nn.radius=.7071067811865476,Nn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ws.x=s.normal.x>0?t.max.x:t.min.x,ws.y=s.normal.y>0?t.max.y:t.min.y,ws.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ws)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xc(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Wh(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Ce extends Me{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*f-o;for(let v=0;v<l;v++){const x=v*u-r;g.push(x,-M,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const v=M+l*p,x=M+l*(p+1),L=M+1+l*(p+1),A=M+1+l*p;d.push(v,x,A),d.push(x,L,A)}this.setIndex(d),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ce(t.width,t.height,t.widthSegments,t.heightSegments)}}var Xh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yh=`#ifdef USE_ALPHAHASH
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
#endif`,qh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$h=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jh=`#ifdef USE_AOMAP
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
#endif`,jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qh=`#ifdef USE_BATCHING
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
#endif`,tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,su=`#ifdef USE_IRIDESCENCE
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
#endif`,ru=`#ifdef USE_BUMPMAP
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
#endif`,ou=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,au=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pu=`#define PI 3.141592653589793
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
} // validated`,mu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gu=`vec3 transformedNormal = objectNormal;
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
#endif`,_u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Su=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wu=`#ifdef USE_ENVMAP
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
#endif`,bu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tu=`#ifdef USE_ENVMAP
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
#endif`,Eu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Au=`#ifdef USE_ENVMAP
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
#endif`,Cu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ru=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Du=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lu=`#ifdef USE_GRADIENTMAP
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
}`,Iu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fu=`uniform bool receiveShadow;
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
#endif`,Ou=`#ifdef USE_ENVMAP
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
#endif`,Bu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ku=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vu=`PhysicalMaterial material;
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
#endif`,Gu=`struct PhysicalMaterial {
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
}`,Wu=`
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
#endif`,Xu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$u=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ku=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ju=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ju=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,td=`#if defined( USE_POINTS_UV )
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
#endif`,ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,id=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,od=`#ifdef USE_MORPHTARGETS
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
#endif`,ad=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fd=`#ifdef USE_NORMALMAP
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
#endif`,pd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,md=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Md=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Td=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ed=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ad=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Rd=`float getShadowMask() {
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
}`,Pd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dd=`#ifdef USE_SKINNING
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
#endif`,Ld=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Id=`#ifdef USE_SKINNING
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
#endif`,Ud=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Od=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bd=`#ifdef USE_TRANSMISSION
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
#endif`,zd=`#ifdef USE_TRANSMISSION
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
#endif`,kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xd=`uniform sampler2D t2D;
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
}`,Yd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$d=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kd=`#include <common>
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
}`,Jd=`#if DEPTH_PACKING == 3200
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
}`,jd=`#define DISTANCE
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
}`,Qd=`#define DISTANCE
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
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`uniform float scale;
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
}`,sf=`uniform vec3 diffuse;
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
}`,rf=`#include <common>
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
}`,of=`uniform vec3 diffuse;
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
}`,af=`#define LAMBERT
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
}`,cf=`#define LAMBERT
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
}`,lf=`#define MATCAP
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
}`,hf=`#define MATCAP
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
}`,uf=`#define NORMAL
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
}`,df=`#define NORMAL
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
}`,ff=`#define PHONG
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
}`,pf=`#define PHONG
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
}`,mf=`#define STANDARD
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
}`,gf=`#define STANDARD
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
}`,_f=`#define TOON
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
}`,xf=`#define TOON
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
}`,vf=`uniform float size;
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
}`,Mf=`uniform vec3 diffuse;
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
}`,yf=`#include <common>
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
}`,Sf=`uniform vec3 color;
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
}`,wf=`uniform float rotation;
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
}`,bf=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:Xh,alphahash_pars_fragment:Yh,alphamap_fragment:qh,alphamap_pars_fragment:Zh,alphatest_fragment:$h,alphatest_pars_fragment:Kh,aomap_fragment:Jh,aomap_pars_fragment:jh,batching_pars_vertex:Qh,batching_vertex:tu,begin_vertex:eu,beginnormal_vertex:nu,bsdfs:iu,iridescence_fragment:su,bumpmap_pars_fragment:ru,clipping_planes_fragment:ou,clipping_planes_pars_fragment:au,clipping_planes_pars_vertex:cu,clipping_planes_vertex:lu,color_fragment:hu,color_pars_fragment:uu,color_pars_vertex:du,color_vertex:fu,common:pu,cube_uv_reflection_fragment:mu,defaultnormal_vertex:gu,displacementmap_pars_vertex:_u,displacementmap_vertex:xu,emissivemap_fragment:vu,emissivemap_pars_fragment:Mu,colorspace_fragment:yu,colorspace_pars_fragment:Su,envmap_fragment:wu,envmap_common_pars_fragment:bu,envmap_pars_fragment:Tu,envmap_pars_vertex:Eu,envmap_physical_pars_fragment:Ou,envmap_vertex:Au,fog_vertex:Cu,fog_pars_vertex:Ru,fog_fragment:Pu,fog_pars_fragment:Du,gradientmap_pars_fragment:Lu,lightmap_pars_fragment:Iu,lights_lambert_fragment:Uu,lights_lambert_pars_fragment:Nu,lights_pars_begin:Fu,lights_toon_fragment:Bu,lights_toon_pars_fragment:zu,lights_phong_fragment:ku,lights_phong_pars_fragment:Hu,lights_physical_fragment:Vu,lights_physical_pars_fragment:Gu,lights_fragment_begin:Wu,lights_fragment_maps:Xu,lights_fragment_end:Yu,logdepthbuf_fragment:qu,logdepthbuf_pars_fragment:Zu,logdepthbuf_pars_vertex:$u,logdepthbuf_vertex:Ku,map_fragment:Ju,map_pars_fragment:ju,map_particle_fragment:Qu,map_particle_pars_fragment:td,metalnessmap_fragment:ed,metalnessmap_pars_fragment:nd,morphinstance_vertex:id,morphcolor_vertex:sd,morphnormal_vertex:rd,morphtarget_pars_vertex:od,morphtarget_vertex:ad,normal_fragment_begin:cd,normal_fragment_maps:ld,normal_pars_fragment:hd,normal_pars_vertex:ud,normal_vertex:dd,normalmap_pars_fragment:fd,clearcoat_normal_fragment_begin:pd,clearcoat_normal_fragment_maps:md,clearcoat_pars_fragment:gd,iridescence_pars_fragment:_d,opaque_fragment:xd,packing:vd,premultiplied_alpha_fragment:Md,project_vertex:yd,dithering_fragment:Sd,dithering_pars_fragment:wd,roughnessmap_fragment:bd,roughnessmap_pars_fragment:Td,shadowmap_pars_fragment:Ed,shadowmap_pars_vertex:Ad,shadowmap_vertex:Cd,shadowmask_pars_fragment:Rd,skinbase_vertex:Pd,skinning_pars_vertex:Dd,skinning_vertex:Ld,skinnormal_vertex:Id,specularmap_fragment:Ud,specularmap_pars_fragment:Nd,tonemapping_fragment:Fd,tonemapping_pars_fragment:Od,transmission_fragment:Bd,transmission_pars_fragment:zd,uv_pars_fragment:kd,uv_pars_vertex:Hd,uv_vertex:Vd,worldpos_vertex:Gd,background_vert:Wd,background_frag:Xd,backgroundCube_vert:Yd,backgroundCube_frag:qd,cube_vert:Zd,cube_frag:$d,depth_vert:Kd,depth_frag:Jd,distanceRGBA_vert:jd,distanceRGBA_frag:Qd,equirect_vert:tf,equirect_frag:ef,linedashed_vert:nf,linedashed_frag:sf,meshbasic_vert:rf,meshbasic_frag:of,meshlambert_vert:af,meshlambert_frag:cf,meshmatcap_vert:lf,meshmatcap_frag:hf,meshnormal_vert:uf,meshnormal_frag:df,meshphong_vert:ff,meshphong_frag:pf,meshphysical_vert:mf,meshphysical_frag:gf,meshtoon_vert:_f,meshtoon_frag:xf,points_vert:vf,points_frag:Mf,shadow_vert:yf,shadow_frag:Sf,sprite_vert:wf,sprite_frag:bf},dt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Qe={basic:{uniforms:Ae([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ae([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ae([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ae([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ae([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ae([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ae([dt.points,dt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ae([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ae([dt.common,dt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ae([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ae([dt.sprite,dt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Ae([dt.common,dt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Ae([dt.lights,dt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Qe.physical={uniforms:Ae([Qe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const bs={r:0,b:0,g:0},Fn=new gn,Tf=new se;function Ef(i,t,e,n,s,r,o){const a=new Ot(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function _(M){let v=!1;const x=g(M);x===null?p(a,c):x&&x.isColor&&(p(x,1),v=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===Ws)?(h===void 0&&(h=new I(new j(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Ei(Qe.backgroundCube.uniforms),vertexShader:Qe.backgroundCube.vertexShader,fragmentShader:Qe.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Fn.copy(v.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Tf.makeRotationFromEuler(Fn)),h.material.toneMapped=Jt.getTransfer(x.colorSpace)!==re,(u!==x||f!==x.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new I(new Ce(2,2),new _n({name:"BackgroundMaterial",uniforms:Ei(Qe.background.uniforms),vertexShader:Qe.background.vertexShader,fragmentShader:Qe.background.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(x.colorSpace)!==re,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(bs,Vc(i)),n.buffers.color.setClear(bs.r,bs.g,bs.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:_,addToRenderList:m}}function Af(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,D,k,B,Y){let Z=!1;const X=u(B,k,D);r!==X&&(r=X,l(r.object)),Z=d(S,B,k,Y),Z&&g(S,B,k,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(S,D,k,B),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,D,k){const B=k.wireframe===!0;let Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let Z=Y[D.id];Z===void 0&&(Z={},Y[D.id]=Z);let X=Z[B];return X===void 0&&(X=f(c()),Z[B]=X),X}function f(S){const D=[],k=[],B=[];for(let Y=0;Y<e;Y++)D[Y]=0,k[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:B,object:S,attributes:{},index:null}}function d(S,D,k,B){const Y=r.attributes,Z=D.attributes;let X=0;const W=k.getAttributes();for(const O in W)if(W[O].location>=0){const ht=Y[O];let ft=Z[O];if(ft===void 0&&(O==="instanceMatrix"&&S.instanceMatrix&&(ft=S.instanceMatrix),O==="instanceColor"&&S.instanceColor&&(ft=S.instanceColor)),ht===void 0||ht.attribute!==ft||ft&&ht.data!==ft.data)return!0;X++}return r.attributesNum!==X||r.index!==B}function g(S,D,k,B){const Y={},Z=D.attributes;let X=0;const W=k.getAttributes();for(const O in W)if(W[O].location>=0){let ht=Z[O];ht===void 0&&(O==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),O==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor));const ft={};ft.attribute=ht,ht&&ht.data&&(ft.data=ht.data),Y[O]=ft,X++}r.attributes=Y,r.attributesNum=X,r.index=B}function _(){const S=r.newAttributes;for(let D=0,k=S.length;D<k;D++)S[D]=0}function m(S){p(S,0)}function p(S,D){const k=r.newAttributes,B=r.enabledAttributes,Y=r.attributeDivisors;k[S]=1,B[S]===0&&(i.enableVertexAttribArray(S),B[S]=1),Y[S]!==D&&(i.vertexAttribDivisor(S,D),Y[S]=D)}function M(){const S=r.newAttributes,D=r.enabledAttributes;for(let k=0,B=D.length;k<B;k++)D[k]!==S[k]&&(i.disableVertexAttribArray(k),D[k]=0)}function v(S,D,k,B,Y,Z,X){X===!0?i.vertexAttribIPointer(S,D,k,Y,Z):i.vertexAttribPointer(S,D,k,B,Y,Z)}function x(S,D,k,B){_();const Y=B.attributes,Z=k.getAttributes(),X=D.defaultAttributeValues;for(const W in Z){const O=Z[W];if(O.location>=0){let nt=Y[W];if(nt===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(nt=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(nt=S.instanceColor)),nt!==void 0){const ht=nt.normalized,ft=nt.itemSize,Lt=t.get(nt);if(Lt===void 0)continue;const te=Lt.buffer,J=Lt.type,ot=Lt.bytesPerElement,bt=J===i.INT||J===i.UNSIGNED_INT||nt.gpuType===Ao;if(nt.isInterleavedBufferAttribute){const lt=nt.data,Dt=lt.stride,zt=nt.offset;if(lt.isInstancedInterleavedBuffer){for(let Ft=0;Ft<O.locationSize;Ft++)p(O.location+Ft,lt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Ft=0;Ft<O.locationSize;Ft++)m(O.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Ft=0;Ft<O.locationSize;Ft++)v(O.location+Ft,ft/O.locationSize,J,ht,Dt*ot,(zt+ft/O.locationSize*Ft)*ot,bt)}else{if(nt.isInstancedBufferAttribute){for(let lt=0;lt<O.locationSize;lt++)p(O.location+lt,nt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let lt=0;lt<O.locationSize;lt++)m(O.location+lt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let lt=0;lt<O.locationSize;lt++)v(O.location+lt,ft/O.locationSize,J,ht,ft*ot,ft/O.locationSize*lt*ot,bt)}}else if(X!==void 0){const ht=X[W];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(O.location,ht);break;case 3:i.vertexAttrib3fv(O.location,ht);break;case 4:i.vertexAttrib4fv(O.location,ht);break;default:i.vertexAttrib1fv(O.location,ht)}}}}M()}function L(){P();for(const S in n){const D=n[S];for(const k in D){const B=D[k];for(const Y in B)h(B[Y].object),delete B[Y];delete D[k]}delete n[S]}}function A(S){if(n[S.id]===void 0)return;const D=n[S.id];for(const k in D){const B=D[k];for(const Y in B)h(B[Y].object),delete B[Y];delete D[k]}delete n[S.id]}function E(S){for(const D in n){const k=n[D];if(k[S.id]===void 0)continue;const B=k[S.id];for(const Y in B)h(B[Y].object),delete B[Y];delete k[S.id]}}function P(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Cf(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Rf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Ve&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===es&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==mn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==en&&!P)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:L,maxSamples:A}}function Pf(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Bn,a=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,v=M*4;let x=p.clippingState||null;c.value=x,x=h(g,f,v,d);for(let L=0;L!==v;++L)x[L]=e[L];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=d;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Df(i){let t=new WeakMap;function e(o,a){return a===Wr?o.mapping=Si:a===Xr&&(o.mapping=wi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wr||a===Xr)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Hh(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Yc extends Gc{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const di=4,Ca=[.125,.215,.35,.446,.526,.582],Hn=20,Mr=new Yc,Ra=new Ot;let yr=null,Sr=0,wr=0,br=!1;const zn=(1+Math.sqrt(5))/2,li=1/zn,Pa=[new C(-zn,li,0),new C(zn,li,0),new C(-li,0,zn),new C(li,0,zn),new C(0,zn,-li),new C(0,zn,li),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Da{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){yr=this._renderer.getRenderTarget(),Sr=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),br=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ua(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ia(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yr,Sr,wr),this._renderer.xr.enabled=br,t.scissorTest=!1,Ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yr=this._renderer.getRenderTarget(),Sr=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),br=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:es,format:Ve,colorSpace:Ai,depthBuffer:!1},s=La(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=La(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lf(r)),this._blurMaterial=If(r,t,e)}return s}_compileMaterial(t){const e=new I(this._lodPlanes[0],t);this._renderer.compile(e,Mr)}_sceneToCubeUV(t,e,n,s){const a=new Be(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ra),h.toneMapping=Pn,h.autoClear=!1;const d=new Ie({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),g=new I(new j,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Ra),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;Ts(s,M*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Si||t.mapping===wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ua()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ia());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new I(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ts(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Mr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Pa[(s-r-1)%Pa.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new I(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Hn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Hn;m>Hn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hn}`);const p=[];let M=0;for(let E=0;E<Hn;++E){const P=E/_,b=Math.exp(-P*P/2);p.push(b),E===0?M+=b:E<m&&(M+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const x=this._sizeLods[s],L=3*x*(s>v-di?s-v+di:0),A=4*(this._cubeSize-x);Ts(e,L,A,3*x,2*x),c.setRenderTarget(e),c.render(u,Mr)}}function Lf(i){const t=[],e=[],n=[];let s=i;const r=i-di+1+Ca.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-di?c=Ca[o-i+di-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),v=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let A=0;A<d;A++){const E=A%3*2/3-1,P=A>2?0:-1,b=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];M.set(b,_*g*A),v.set(f,m*g*A);const S=[A,A,A,A,A,A];x.set(S,p*g*A)}const L=new Me;L.setAttribute("position",new Je(M,_)),L.setAttribute("uv",new Je(v,m)),L.setAttribute("faceIndex",new Je(x,p)),t.push(L),s>di&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function La(i,t,e){const n=new Xn(i,t,e);return n.texture.mapping=Ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ts(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function If(i,t,e){const n=new Float32Array(Hn),s=new C(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Hn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:No(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Ia(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:No(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Ua(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function No(){return`

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
	`}function Uf(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Wr||c===Xr,h=c===Si||c===wi;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Da(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Da(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Nf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Vi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ff(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let v=0,x=M.length;v<x;v+=3){const L=M[v+0],A=M[v+1],E=M[v+2];f.push(L,A,A,E,E,L)}}else if(g!==void 0){const M=g.array;_=g.version;for(let v=0,x=M.length/3-1;v<x;v+=3){const L=v+0,A=v+1,E=v+2;f.push(L,A,A,E,E,L)}}else return;const m=new(Uc(f)?Hc:kc)(f,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Of(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Bf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zf(i,t,e){const n=new WeakMap,s=new oe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let S=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let L=a.attributes.position.count*x,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const E=new Float32Array(L*A*4*u),P=new Fc(E,L,A,u);P.type=en,P.needsUpdate=!0;const b=x*4;for(let D=0;D<u;D++){const k=p[D],B=M[D],Y=v[D],Z=L*A*4*D;for(let X=0;X<k.count;X++){const W=X*b;g===!0&&(s.fromBufferAttribute(k,X),E[Z+W+0]=s.x,E[Z+W+1]=s.y,E[Z+W+2]=s.z,E[Z+W+3]=0),_===!0&&(s.fromBufferAttribute(B,X),E[Z+W+4]=s.x,E[Z+W+5]=s.y,E[Z+W+6]=s.z,E[Z+W+7]=0),m===!0&&(s.fromBufferAttribute(Y,X),E[Z+W+8]=s.x,E[Z+W+9]=s.y,E[Z+W+10]=s.z,E[Z+W+11]=Y.itemSize===4?s.w:1)}}f={count:u,texture:P,size:new ct(L,A)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function kf(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class qc extends Te{constructor(t,e,n,s,r,o,a,c,l,h=gi){if(h!==gi&&h!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gi&&(n=Wn),n===void 0&&h===Ti&&(n=bi),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Pe,this.minFilter=c!==void 0?c:Pe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Zc=new Te,Na=new qc(1,1),$c=new Fc,Kc=new Th,Jc=new Wc,Fa=[],Oa=[],Ba=new Float32Array(16),za=new Float32Array(9),ka=new Float32Array(4);function Di(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Fa[s];if(r===void 0&&(r=new Float32Array(s),Fa[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function _e(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function qs(i,t){let e=Oa[t];e===void 0&&(e=new Int32Array(t),Oa[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),_e(e,t)}}function Gf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),_e(e,t)}}function Wf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),_e(e,t)}}function Xf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;ka.set(n),i.uniformMatrix2fv(this.addr,!1,ka),_e(e,n)}}function Yf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;za.set(n),i.uniformMatrix3fv(this.addr,!1,za),_e(e,n)}}function qf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;Ba.set(n),i.uniformMatrix4fv(this.addr,!1,Ba),_e(e,n)}}function Zf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function $f(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),_e(e,t)}}function Kf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),_e(e,t)}}function Jf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),_e(e,t)}}function jf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),_e(e,t)}}function tp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),_e(e,t)}}function ep(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),_e(e,t)}}function np(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Na.compareFunction=Ic,r=Na):r=Zc,e.setTexture2D(t||r,s)}function ip(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Kc,s)}function sp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Jc,s)}function rp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||$c,s)}function op(i){switch(i){case 5126:return Hf;case 35664:return Vf;case 35665:return Gf;case 35666:return Wf;case 35674:return Xf;case 35675:return Yf;case 35676:return qf;case 5124:case 35670:return Zf;case 35667:case 35671:return $f;case 35668:case 35672:return Kf;case 35669:case 35673:return Jf;case 5125:return jf;case 36294:return Qf;case 36295:return tp;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return np;case 35679:case 36299:case 36307:return ip;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return rp}}function ap(i,t){i.uniform1fv(this.addr,t)}function cp(i,t){const e=Di(t,this.size,2);i.uniform2fv(this.addr,e)}function lp(i,t){const e=Di(t,this.size,3);i.uniform3fv(this.addr,e)}function hp(i,t){const e=Di(t,this.size,4);i.uniform4fv(this.addr,e)}function up(i,t){const e=Di(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function dp(i,t){const e=Di(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fp(i,t){const e=Di(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function pp(i,t){i.uniform1iv(this.addr,t)}function mp(i,t){i.uniform2iv(this.addr,t)}function gp(i,t){i.uniform3iv(this.addr,t)}function _p(i,t){i.uniform4iv(this.addr,t)}function xp(i,t){i.uniform1uiv(this.addr,t)}function vp(i,t){i.uniform2uiv(this.addr,t)}function Mp(i,t){i.uniform3uiv(this.addr,t)}function yp(i,t){i.uniform4uiv(this.addr,t)}function Sp(i,t,e){const n=this.cache,s=t.length,r=qs(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Zc,r[o])}function wp(i,t,e){const n=this.cache,s=t.length,r=qs(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Kc,r[o])}function bp(i,t,e){const n=this.cache,s=t.length,r=qs(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Jc,r[o])}function Tp(i,t,e){const n=this.cache,s=t.length,r=qs(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||$c,r[o])}function Ep(i){switch(i){case 5126:return ap;case 35664:return cp;case 35665:return lp;case 35666:return hp;case 35674:return up;case 35675:return dp;case 35676:return fp;case 5124:case 35670:return pp;case 35667:case 35671:return mp;case 35668:case 35672:return gp;case 35669:case 35673:return _p;case 5125:return xp;case 36294:return vp;case 36295:return Mp;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Sp;case 35679:case 36299:case 36307:return wp;case 35680:case 36300:case 36308:case 36293:return bp;case 36289:case 36303:case 36311:case 36292:return Tp}}class Ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=op(e.type)}}class Cp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ep(e.type)}}class Rp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Tr=/(\w+)(\])?(\[|\.)?/g;function Ha(i,t){i.seq.push(t),i.map[t.id]=t}function Pp(i,t,e){const n=i.name,s=n.length;for(Tr.lastIndex=0;;){const r=Tr.exec(n),o=Tr.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ha(e,l===void 0?new Ap(a,i,t):new Cp(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Rp(a),Ha(e,u)),e=u}}}class Bs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Pp(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Va(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Dp=37297;let Lp=0;function Ip(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ga=new Gt;function Up(i){Jt._getMatrix(Ga,Jt.workingColorSpace,i);const t=`mat3( ${Ga.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case Xs:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Wa(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ip(i.getShaderSource(t),o)}else return s}function Np(i,t){const e=Up(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fp(i,t){let e;switch(t){case Bl:e="Linear";break;case zl:e="Reinhard";break;case kl:e="Cineon";break;case yc:e="ACESFilmic";break;case Vl:e="AgX";break;case Gl:e="Neutral";break;case Hl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Es=new C;function Op(){Jt.getLuminanceCoefficients(Es);const i=Es.x.toFixed(4),t=Es.y.toFixed(4),e=Es.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gi).join(`
`)}function zp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function kp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Gi(i){return i!==""}function Xa(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ya(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mo(i){return i.replace(Hp,Gp)}const Vp=new Map;function Gp(i,t){let e=Xt[t];if(e===void 0){const n=Vp.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Mo(e)}const Wp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qa(i){return i.replace(Wp,Xp)}function Xp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Za(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Yp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===xc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===vc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function qp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Si:case wi:t="ENVMAP_TYPE_CUBE";break;case Ws:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Zp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case wi:t="ENVMAP_MODE_REFRACTION";break}return t}function $p(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Mc:t="ENVMAP_BLENDING_MULTIPLY";break;case Fl:t="ENVMAP_BLENDING_MIX";break;case Ol:t="ENVMAP_BLENDING_ADD";break}return t}function Kp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Jp(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Yp(e),l=qp(e),h=Zp(e),u=$p(e),f=Kp(e),d=Bp(e),g=zp(r),_=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gi).join(`
`),p.length>0&&(p+=`
`)):(m=[Za(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gi).join(`
`),p=[Za(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pn?"#define TONE_MAPPING":"",e.toneMapping!==Pn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Pn?Fp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,Np("linearToOutputTexel",e.outputColorSpace),Op(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gi).join(`
`)),o=Mo(o),o=Xa(o,e),o=Ya(o,e),a=Mo(a),a=Xa(a,e),a=Ya(a,e),o=qa(o),a=qa(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===oa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=M+m+o,x=M+p+a,L=Va(s,s.VERTEX_SHADER,v),A=Va(s,s.FRAGMENT_SHADER,x);s.attachShader(_,L),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function E(D){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(L).trim(),Y=s.getShaderInfoLog(A).trim();let Z=!0,X=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,L,A);else{const W=Wa(s,L,"vertex"),O=Wa(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+W+`
`+O)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||Y==="")&&(X=!1);X&&(D.diagnostics={runnable:Z,programLog:k,vertexShader:{log:B,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(L),s.deleteShader(A),P=new Bs(s,_),b=kp(s,_)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Dp)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=A,this}let jp=0;class Qp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tm(t),e.set(t,n)),n}}class tm{constructor(t){this.id=jp++,this.code=t,this.usedTimes=0}}function em(i,t,e,n,s,r,o){const a=new Bc,c=new Qp,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,D,k,B){const Y=k.fog,Z=B.geometry,X=b.isMeshStandardMaterial?k.environment:null,W=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),O=W&&W.mapping===Ws?W.image.height:null,nt=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const ht=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ft=ht!==void 0?ht.length:0;let Lt=0;Z.morphAttributes.position!==void 0&&(Lt=1),Z.morphAttributes.normal!==void 0&&(Lt=2),Z.morphAttributes.color!==void 0&&(Lt=3);let te,J,ot,bt;if(nt){const ie=Qe[nt];te=ie.vertexShader,J=ie.fragmentShader}else te=b.vertexShader,J=b.fragmentShader,c.update(b),ot=c.getVertexShaderID(b),bt=c.getFragmentShaderID(b);const lt=i.getRenderTarget(),Dt=i.state.buffers.depth.getReversed(),zt=B.isInstancedMesh===!0,Ft=B.isBatchedMesh===!0,Kt=!!b.map,tt=!!b.matcap,rt=!!W,R=!!b.aoMap,Rt=!!b.lightMap,it=!!b.bumpMap,yt=!!b.normalMap,ut=!!b.displacementMap,It=!!b.emissiveMap,vt=!!b.metalnessMap,T=!!b.roughnessMap,y=b.anisotropy>0,z=b.clearcoat>0,$=b.dispersion>0,et=b.iridescence>0,K=b.sheen>0,Tt=b.transmission>0,pt=y&&!!b.anisotropyMap,Mt=z&&!!b.clearcoatMap,qt=z&&!!b.clearcoatNormalMap,st=z&&!!b.clearcoatRoughnessMap,St=et&&!!b.iridescenceMap,Ut=et&&!!b.iridescenceThicknessMap,Bt=K&&!!b.sheenColorMap,wt=K&&!!b.sheenRoughnessMap,Zt=!!b.specularMap,Wt=!!b.specularColorMap,ae=!!b.specularIntensityMap,U=Tt&&!!b.transmissionMap,mt=Tt&&!!b.thicknessMap,q=!!b.gradientMap,Q=!!b.alphaMap,xt=b.alphaTest>0,gt=!!b.alphaHash,Ht=!!b.extensions;let fe=Pn;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(fe=i.toneMapping);const Se={shaderID:nt,shaderType:b.type,shaderName:b.name,vertexShader:te,fragmentShader:J,defines:b.defines,customVertexShaderID:ot,customFragmentShaderID:bt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Ft,batchingColor:Ft&&B._colorsTexture!==null,instancing:zt,instancingColor:zt&&B.instanceColor!==null,instancingMorph:zt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Ai,alphaToCoverage:!!b.alphaToCoverage,map:Kt,matcap:tt,envMap:rt,envMapMode:rt&&W.mapping,envMapCubeUVHeight:O,aoMap:R,lightMap:Rt,bumpMap:it,normalMap:yt,displacementMap:f&&ut,emissiveMap:It,normalMapObjectSpace:yt&&b.normalMapType===ql,normalMapTangentSpace:yt&&b.normalMapType===Lc,metalnessMap:vt,roughnessMap:T,anisotropy:y,anisotropyMap:pt,clearcoat:z,clearcoatMap:Mt,clearcoatNormalMap:qt,clearcoatRoughnessMap:st,dispersion:$,iridescence:et,iridescenceMap:St,iridescenceThicknessMap:Ut,sheen:K,sheenColorMap:Bt,sheenRoughnessMap:wt,specularMap:Zt,specularColorMap:Wt,specularIntensityMap:ae,transmission:Tt,transmissionMap:U,thicknessMap:mt,gradientMap:q,opaque:b.transparent===!1&&b.blending===mi&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:xt,alphaHash:gt,combine:b.combine,mapUv:Kt&&_(b.map.channel),aoMapUv:R&&_(b.aoMap.channel),lightMapUv:Rt&&_(b.lightMap.channel),bumpMapUv:it&&_(b.bumpMap.channel),normalMapUv:yt&&_(b.normalMap.channel),displacementMapUv:ut&&_(b.displacementMap.channel),emissiveMapUv:It&&_(b.emissiveMap.channel),metalnessMapUv:vt&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:pt&&_(b.anisotropyMap.channel),clearcoatMapUv:Mt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:qt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(b.sheenRoughnessMap.channel),specularMapUv:Zt&&_(b.specularMap.channel),specularColorMapUv:Wt&&_(b.specularColorMap.channel),specularIntensityMapUv:ae&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:mt&&_(b.thicknessMap.channel),alphaMapUv:Q&&_(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(yt||y),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(Kt||Q),fog:!!Y,useFog:b.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Lt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:fe,decodeVideoTexture:Kt&&b.map.isVideoTexture===!0&&Jt.getTransfer(b.map.colorSpace)===re,decodeVideoTextureEmissive:It&&b.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(b.emissiveMap.colorSpace)===re,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ze,flipSided:b.side===Re,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ht&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&b.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Se.vertexUv1s=l.has(1),Se.vertexUv2s=l.has(2),Se.vertexUv3s=l.has(3),l.clear(),Se}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(M(S,b),v(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function M(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function v(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const S=g[b.type];let D;if(S){const k=Qe[S];D=Oh.clone(k.uniforms)}else D=b.uniforms;return D}function L(b,S){let D;for(let k=0,B=h.length;k<B;k++){const Y=h[k];if(Y.cacheKey===S){D=Y,++D.usedTimes;break}}return D===void 0&&(D=new Jp(i,S,b,r),h.push(D)),D}function A(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function E(b){c.remove(b)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:L,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:P}}function nm(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function im(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function $a(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ka(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||im),n.length>1&&n.sort(f||$a),s.length>1&&s.sort(f||$a)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function sm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ka,i.set(n,[o])):s>=r.length?(o=new Ka,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function rm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Ot};break;case"SpotLight":e={position:new C,direction:new C,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function om(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let am=0;function cm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function lm(i){const t=new rm,e=om(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new se,o=new se;function a(l){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,v=0,x=0,L=0,A=0,E=0;l.sort(cm);for(let b=0,S=l.length;b<S;b++){const D=l[b],k=D.color,B=D.intensity,Y=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=k.r*B,u+=k.g*B,f+=k.b*B;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],B);E++}else if(D.isDirectionalLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,O=e.get(D);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,n.directionalShadow[d]=O,n.directionalShadowMap[d]=Z,n.directionalShadowMatrix[d]=D.shadow.matrix,M++}n.directional[d]=X,d++}else if(D.isSpotLight){const X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(k).multiplyScalar(B),X.distance=Y,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[_]=X;const W=D.shadow;if(D.map&&(n.spotLightMap[L]=D.map,L++,W.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[_]=W.matrix,D.castShadow){const O=e.get(D);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=Z,x++}_++}else if(D.isRectAreaLight){const X=t.get(D);X.color.copy(k).multiplyScalar(B),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=X,m++}else if(D.isPointLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const W=D.shadow,O=e.get(D);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,O.shadowCameraNear=W.camera.near,O.shadowCameraFar=W.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=D.shadow.matrix,v++}n.point[g]=X,g++}else if(D.isHemisphereLight){const X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(B),X.groundColor.copy(D.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==M||P.numPointShadows!==v||P.numSpotShadows!==x||P.numSpotMaps!==L||P.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,P.directionalLength=d,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=M,P.numPointShadows=v,P.numSpotShadows=x,P.numSpotMaps=L,P.numLightProbes=E,n.version=am++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const v=l[p];if(v.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(v.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(v.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Ja(i){const t=new lm(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function hm(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ja(i),t.set(s,[a])):r>=o.length?(a=new Ja(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class um extends Pi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Xl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class dm extends Pi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pm=`uniform sampler2D shadow_pass;
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
}`;function mm(i,t,e){let n=new Ys;const s=new ct,r=new ct,o=new oe,a=new um({depthPacking:Yl}),c=new dm,l={},h=e.maxTextureSize,u={[pn]:Re,[Re]:pn,[ze]:ze},f=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:fm,fragmentShader:pm}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new I(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xc;let p=this.type;this.render=function(A,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Rn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=p!==un&&this.type===un,Y=p===un&&this.type!==un;for(let Z=0,X=A.length;Z<X;Z++){const W=A[Z],O=W.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const nt=O.getFrameExtents();if(s.multiply(nt),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,O.mapSize.y=r.y)),O.map===null||B===!0||Y===!0){const ft=this.type!==un?{minFilter:Pe,magFilter:Pe}:{};O.map!==null&&O.map.dispose(),O.map=new Xn(s.x,s.y,ft),O.map.texture.name=W.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const ht=O.getViewportCount();for(let ft=0;ft<ht;ft++){const Lt=O.getViewport(ft);o.set(r.x*Lt.x,r.y*Lt.y,r.x*Lt.z,r.y*Lt.w),k.viewport(o),O.updateMatrices(W,ft),n=O.getFrustum(),x(E,P,O.camera,W,this.type)}O.isPointLightShadow!==!0&&this.type===un&&M(O,P),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,D)};function M(A,E){const P=t.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Xn(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(E,null,P,f,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(E,null,P,d,_,null)}function v(A,E,P,b){let S=null;const D=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)S=D;else if(S=P.isPointLight===!0?c:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=S.uuid,B=E.uuid;let Y=l[k];Y===void 0&&(Y={},l[k]=Y);let Z=Y[B];Z===void 0&&(Z=S.clone(),Y[B]=Z,E.addEventListener("dispose",L)),S=Z}if(S.visible=E.visible,S.wireframe=E.wireframe,b===un?S.side=E.shadowSide!==null?E.shadowSide:E.side:S.side=E.shadowSide!==null?E.shadowSide:u[E.side],S.alphaMap=E.alphaMap,S.alphaTest=E.alphaTest,S.map=E.map,S.clipShadows=E.clipShadows,S.clippingPlanes=E.clippingPlanes,S.clipIntersection=E.clipIntersection,S.displacementMap=E.displacementMap,S.displacementScale=E.displacementScale,S.displacementBias=E.displacementBias,S.wireframeLinewidth=E.wireframeLinewidth,S.linewidth=E.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=i.properties.get(S);k.light=P}return S}function x(A,E,P,b,S){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===un)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const B=t.update(A),Y=A.material;if(Array.isArray(Y)){const Z=B.groups;for(let X=0,W=Z.length;X<W;X++){const O=Z[X],nt=Y[O.materialIndex];if(nt&&nt.visible){const ht=v(A,nt,b,S);A.onBeforeShadow(i,A,E,P,B,ht,O),i.renderBufferDirect(P,null,B,ht,A,O),A.onAfterShadow(i,A,E,P,B,ht,O)}}}else if(Y.visible){const Z=v(A,Y,b,S);A.onBeforeShadow(i,A,E,P,B,Z,null),i.renderBufferDirect(P,null,B,Z,A,null),A.onAfterShadow(i,A,E,P,B,Z,null)}}const k=A.children;for(let B=0,Y=k.length;B<Y;B++)x(k[B],E,P,b,S)}function L(A){A.target.removeEventListener("dispose",L);for(const P in l){const b=l[P],S=A.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const gm={[Or]:Br,[zr]:Vr,[kr]:Gr,[yi]:Hr,[Br]:Or,[Vr]:zr,[Gr]:kr,[Hr]:yi};function _m(i,t){function e(){let U=!1;const mt=new oe;let q=null;const Q=new oe(0,0,0,0);return{setMask:function(xt){q!==xt&&!U&&(i.colorMask(xt,xt,xt,xt),q=xt)},setLocked:function(xt){U=xt},setClear:function(xt,gt,Ht,fe,Se){Se===!0&&(xt*=fe,gt*=fe,Ht*=fe),mt.set(xt,gt,Ht,fe),Q.equals(mt)===!1&&(i.clearColor(xt,gt,Ht,fe),Q.copy(mt))},reset:function(){U=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,mt=!1,q=null,Q=null,xt=null;return{setReversed:function(gt){if(mt!==gt){const Ht=t.get("EXT_clip_control");mt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const fe=xt;xt=null,this.setClear(fe)}mt=gt},getReversed:function(){return mt},setTest:function(gt){gt?lt(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(gt){q!==gt&&!U&&(i.depthMask(gt),q=gt)},setFunc:function(gt){if(mt&&(gt=gm[gt]),Q!==gt){switch(gt){case Or:i.depthFunc(i.NEVER);break;case Br:i.depthFunc(i.ALWAYS);break;case zr:i.depthFunc(i.LESS);break;case yi:i.depthFunc(i.LEQUAL);break;case kr:i.depthFunc(i.EQUAL);break;case Hr:i.depthFunc(i.GEQUAL);break;case Vr:i.depthFunc(i.GREATER);break;case Gr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=gt}},setLocked:function(gt){U=gt},setClear:function(gt){xt!==gt&&(mt&&(gt=1-gt),i.clearDepth(gt),xt=gt)},reset:function(){U=!1,q=null,Q=null,xt=null,mt=!1}}}function s(){let U=!1,mt=null,q=null,Q=null,xt=null,gt=null,Ht=null,fe=null,Se=null;return{setTest:function(ie){U||(ie?lt(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(ie){mt!==ie&&!U&&(i.stencilMask(ie),mt=ie)},setFunc:function(ie,Xe,sn){(q!==ie||Q!==Xe||xt!==sn)&&(i.stencilFunc(ie,Xe,sn),q=ie,Q=Xe,xt=sn)},setOp:function(ie,Xe,sn){(gt!==ie||Ht!==Xe||fe!==sn)&&(i.stencilOp(ie,Xe,sn),gt=ie,Ht=Xe,fe=sn)},setLocked:function(ie){U=ie},setClear:function(ie){Se!==ie&&(i.clearStencil(ie),Se=ie)},reset:function(){U=!1,mt=null,q=null,Q=null,xt=null,gt=null,Ht=null,fe=null,Se=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,v=null,x=null,L=null,A=null,E=new Ot(0,0,0),P=0,b=!1,S=null,D=null,k=null,B=null,Y=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,W=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(O)[1]),X=W>=1):O.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),X=W>=2);let nt=null,ht={};const ft=i.getParameter(i.SCISSOR_BOX),Lt=i.getParameter(i.VIEWPORT),te=new oe().fromArray(ft),J=new oe().fromArray(Lt);function ot(U,mt,q,Q){const xt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(U,gt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<q;Ht++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(mt,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(mt+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return gt}const bt={};bt[i.TEXTURE_2D]=ot(i.TEXTURE_2D,i.TEXTURE_2D,1),bt[i.TEXTURE_CUBE_MAP]=ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),bt[i.TEXTURE_2D_ARRAY]=ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),bt[i.TEXTURE_3D]=ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(i.DEPTH_TEST),o.setFunc(yi),it(!1),yt(ta),lt(i.CULL_FACE),R(Rn);function lt(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Dt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function zt(U,mt){return u[U]!==mt?(i.bindFramebuffer(U,mt),u[U]=mt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=mt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=mt),!0):!1}function Ft(U,mt){let q=d,Q=!1;if(U){q=f.get(mt),q===void 0&&(q=[],f.set(mt,q));const xt=U.textures;if(q.length!==xt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Ht=xt.length;gt<Ht;gt++)q[gt]=i.COLOR_ATTACHMENT0+gt;q.length=xt.length,Q=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Q=!0);Q&&i.drawBuffers(q)}function Kt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const tt={[kn]:i.FUNC_ADD,[vl]:i.FUNC_SUBTRACT,[Ml]:i.FUNC_REVERSE_SUBTRACT};tt[yl]=i.MIN,tt[Sl]=i.MAX;const rt={[wl]:i.ZERO,[bl]:i.ONE,[Tl]:i.SRC_COLOR,[Nr]:i.SRC_ALPHA,[Dl]:i.SRC_ALPHA_SATURATE,[Rl]:i.DST_COLOR,[Al]:i.DST_ALPHA,[El]:i.ONE_MINUS_SRC_COLOR,[Fr]:i.ONE_MINUS_SRC_ALPHA,[Pl]:i.ONE_MINUS_DST_COLOR,[Cl]:i.ONE_MINUS_DST_ALPHA,[Ll]:i.CONSTANT_COLOR,[Il]:i.ONE_MINUS_CONSTANT_COLOR,[Ul]:i.CONSTANT_ALPHA,[Nl]:i.ONE_MINUS_CONSTANT_ALPHA};function R(U,mt,q,Q,xt,gt,Ht,fe,Se,ie){if(U===Rn){_===!0&&(Dt(i.BLEND),_=!1);return}if(_===!1&&(lt(i.BLEND),_=!0),U!==xl){if(U!==m||ie!==b){if((p!==kn||x!==kn)&&(i.blendEquation(i.FUNC_ADD),p=kn,x=kn),ie)switch(U){case mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ea:i.blendFunc(i.ONE,i.ONE);break;case na:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ia:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ea:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case na:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ia:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,v=null,L=null,A=null,E.set(0,0,0),P=0,m=U,b=ie}return}xt=xt||mt,gt=gt||q,Ht=Ht||Q,(mt!==p||xt!==x)&&(i.blendEquationSeparate(tt[mt],tt[xt]),p=mt,x=xt),(q!==M||Q!==v||gt!==L||Ht!==A)&&(i.blendFuncSeparate(rt[q],rt[Q],rt[gt],rt[Ht]),M=q,v=Q,L=gt,A=Ht),(fe.equals(E)===!1||Se!==P)&&(i.blendColor(fe.r,fe.g,fe.b,Se),E.copy(fe),P=Se),m=U,b=!1}function Rt(U,mt){U.side===ze?Dt(i.CULL_FACE):lt(i.CULL_FACE);let q=U.side===Re;mt&&(q=!q),it(q),U.blending===mi&&U.transparent===!1?R(Rn):R(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const Q=U.stencilWrite;a.setTest(Q),Q&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),It(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(U){S!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),S=U)}function yt(U){U!==gl?(lt(i.CULL_FACE),U!==D&&(U===ta?i.cullFace(i.BACK):U===_l?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),D=U}function ut(U){U!==k&&(X&&i.lineWidth(U),k=U)}function It(U,mt,q){U?(lt(i.POLYGON_OFFSET_FILL),(B!==mt||Y!==q)&&(i.polygonOffset(mt,q),B=mt,Y=q)):Dt(i.POLYGON_OFFSET_FILL)}function vt(U){U?lt(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+Z-1),nt!==U&&(i.activeTexture(U),nt=U)}function y(U,mt,q){q===void 0&&(nt===null?q=i.TEXTURE0+Z-1:q=nt);let Q=ht[q];Q===void 0&&(Q={type:void 0,texture:void 0},ht[q]=Q),(Q.type!==U||Q.texture!==mt)&&(nt!==q&&(i.activeTexture(q),nt=q),i.bindTexture(U,mt||bt[U]),Q.type=U,Q.texture=mt)}function z(){const U=ht[nt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function qt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(U){te.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),te.copy(U))}function wt(U){J.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),J.copy(U))}function Zt(U,mt){let q=l.get(mt);q===void 0&&(q=new WeakMap,l.set(mt,q));let Q=q.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(mt,U.name),q.set(U,Q))}function Wt(U,mt){const Q=l.get(mt).get(U);c.get(mt)!==Q&&(i.uniformBlockBinding(mt,Q,U.__bindingPointIndex),c.set(mt,Q))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},nt=null,ht={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,v=null,x=null,L=null,A=null,E=new Ot(0,0,0),P=0,b=!1,S=null,D=null,k=null,B=null,Y=null,te.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:lt,disable:Dt,bindFramebuffer:zt,drawBuffers:Ft,useProgram:Kt,setBlending:R,setMaterial:Rt,setFlipSided:it,setCullFace:yt,setLineWidth:ut,setPolygonOffset:It,setScissorTest:vt,activeTexture:T,bindTexture:y,unbindTexture:z,compressedTexImage2D:$,compressedTexImage3D:et,texImage2D:St,texImage3D:Ut,updateUBOMapping:Zt,uniformBlockBinding:Wt,texStorage2D:qt,texStorage3D:st,texSubImage2D:K,texSubImage3D:Tt,compressedTexSubImage2D:pt,compressedTexSubImage3D:Mt,scissor:Bt,viewport:wt,reset:ae}}function ja(i,t,e,n){const s=xm(n);switch(e){case Ec:return i*t;case Cc:return i*t;case Rc:return i*t*2;case Po:return i*t/s.components*s.byteLength;case Do:return i*t/s.components*s.byteLength;case Pc:return i*t*2/s.components*s.byteLength;case Lo:return i*t*2/s.components*s.byteLength;case Ac:return i*t*3/s.components*s.byteLength;case Ve:return i*t*4/s.components*s.byteLength;case Io:return i*t*4/s.components*s.byteLength;case Is:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ns:case Fs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Zr:case Kr:return Math.max(i,16)*Math.max(t,8)/4;case qr:case $r:return Math.max(i,8)*Math.max(t,8)/2;case Jr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case eo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case no:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case io:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case so:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ro:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case oo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ao:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case co:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case uo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case fo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case po:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Os:case mo:case go:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Dc:case _o:return Math.ceil(i/4)*Math.ceil(t/4)*8;case xo:case vo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xm(i){switch(i){case mn:case wc:return{byteLength:1,components:1};case Ki:case bc:case es:return{byteLength:2,components:1};case Co:case Ro:return{byteLength:2,components:4};case Wn:case Ao:case en:return{byteLength:4,components:1};case Tc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function vm(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ct,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,y){return d?new OffscreenCanvas(T,y):Hs("canvas")}function _(T,y,z){let $=1;const et=vt(T);if((et.width>z||et.height>z)&&($=z/Math.max(et.width,et.height)),$<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor($*et.width),Tt=Math.floor($*et.height);u===void 0&&(u=g(K,Tt));const pt=y?g(K,Tt):u;return pt.width=K,pt.height=Tt,pt.getContext("2d").drawImage(T,0,0,K,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+K+"x"+Tt+")."),pt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(T,y,z,$,et=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=y;if(y===i.RED&&(z===i.FLOAT&&(K=i.R32F),z===i.HALF_FLOAT&&(K=i.R16F),z===i.UNSIGNED_BYTE&&(K=i.R8)),y===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.R8UI),z===i.UNSIGNED_SHORT&&(K=i.R16UI),z===i.UNSIGNED_INT&&(K=i.R32UI),z===i.BYTE&&(K=i.R8I),z===i.SHORT&&(K=i.R16I),z===i.INT&&(K=i.R32I)),y===i.RG&&(z===i.FLOAT&&(K=i.RG32F),z===i.HALF_FLOAT&&(K=i.RG16F),z===i.UNSIGNED_BYTE&&(K=i.RG8)),y===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RG8UI),z===i.UNSIGNED_SHORT&&(K=i.RG16UI),z===i.UNSIGNED_INT&&(K=i.RG32UI),z===i.BYTE&&(K=i.RG8I),z===i.SHORT&&(K=i.RG16I),z===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGB8UI),z===i.UNSIGNED_SHORT&&(K=i.RGB16UI),z===i.UNSIGNED_INT&&(K=i.RGB32UI),z===i.BYTE&&(K=i.RGB8I),z===i.SHORT&&(K=i.RGB16I),z===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),z===i.UNSIGNED_INT&&(K=i.RGBA32UI),z===i.BYTE&&(K=i.RGBA8I),z===i.SHORT&&(K=i.RGBA16I),z===i.INT&&(K=i.RGBA32I)),y===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),y===i.RGBA){const Tt=et?Xs:Jt.getTransfer($);z===i.FLOAT&&(K=i.RGBA32F),z===i.HALF_FLOAT&&(K=i.RGBA16F),z===i.UNSIGNED_BYTE&&(K=Tt===re?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(T,y){let z;return T?y===null||y===Wn||y===bi?z=i.DEPTH24_STENCIL8:y===en?z=i.DEPTH32F_STENCIL8:y===Ki&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Wn||y===bi?z=i.DEPTH_COMPONENT24:y===en?z=i.DEPTH_COMPONENT32F:y===Ki&&(z=i.DEPTH_COMPONENT16),z}function L(T,y){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Pe&&T.minFilter!==tn?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function A(T){const y=T.target;y.removeEventListener("dispose",A),P(y),y.isVideoTexture&&h.delete(y)}function E(T){const y=T.target;y.removeEventListener("dispose",E),S(y)}function P(T){const y=n.get(T);if(y.__webglInit===void 0)return;const z=T.source,$=f.get(z);if($){const et=$[y.__cacheKey];et.usedTimes--,et.usedTimes===0&&b(T),Object.keys($).length===0&&f.delete(z)}n.remove(T)}function b(T){const y=n.get(T);i.deleteTexture(y.__webglTexture);const z=T.source,$=f.get(z);delete $[y.__cacheKey],o.memory.textures--}function S(T){const y=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let et=0;et<y.__webglFramebuffer[$].length;et++)i.deleteFramebuffer(y.__webglFramebuffer[$][et]);else i.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)i.deleteFramebuffer(y.__webglFramebuffer[$]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const z=T.textures;for(let $=0,et=z.length;$<et;$++){const K=n.get(z[$]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(z[$])}n.remove(T)}let D=0;function k(){D=0}function B(){const T=D;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),D+=1,T}function Y(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function Z(T,y){const z=n.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){const $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(z,T,y);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+y)}function X(T,y){const z=n.get(T);if(T.version>0&&z.__version!==T.version){J(z,T,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+y)}function W(T,y){const z=n.get(T);if(T.version>0&&z.__version!==T.version){J(z,T,y);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+y)}function O(T,y){const z=n.get(T);if(T.version>0&&z.__version!==T.version){ot(z,T,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+y)}const nt={[$i]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[Yr]:i.MIRRORED_REPEAT},ht={[Pe]:i.NEAREST,[Wl]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[Qs]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},ft={[Zl]:i.NEVER,[th]:i.ALWAYS,[$l]:i.LESS,[Ic]:i.LEQUAL,[Kl]:i.EQUAL,[Ql]:i.GEQUAL,[Jl]:i.GREATER,[jl]:i.NOTEQUAL};function Lt(T,y){if(y.type===en&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===tn||y.magFilter===Qs||y.magFilter===os||y.magFilter===Gn||y.minFilter===tn||y.minFilter===Qs||y.minFilter===os||y.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,nt[y.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,nt[y.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,nt[y.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ht[y.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ht[y.minFilter]),y.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ft[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Pe||y.minFilter!==os&&y.minFilter!==Gn||y.type===en&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function te(T,y){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",A));const $=y.source;let et=f.get($);et===void 0&&(et={},f.set($,et));const K=Y(y);if(K!==T.__cacheKey){et[K]===void 0&&(et[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),et[K].usedTimes++;const Tt=et[T.__cacheKey];Tt!==void 0&&(et[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&b(y)),T.__cacheKey=K,T.__webglTexture=et[K].texture}return z}function J(T,y,z){let $=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=i.TEXTURE_3D);const et=te(T,y),K=y.source;e.bindTexture($,T.__webglTexture,i.TEXTURE0+z);const Tt=n.get(K);if(K.version!==Tt.__version||et===!0){e.activeTexture(i.TEXTURE0+z);const pt=Jt.getPrimaries(Jt.workingColorSpace),Mt=y.colorSpace===An?null:Jt.getPrimaries(y.colorSpace),qt=y.colorSpace===An||pt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let st=_(y.image,!1,s.maxTextureSize);st=It(y,st);const St=r.convert(y.format,y.colorSpace),Ut=r.convert(y.type);let Bt=v(y.internalFormat,St,Ut,y.colorSpace,y.isVideoTexture);Lt($,y);let wt;const Zt=y.mipmaps,Wt=y.isVideoTexture!==!0,ae=Tt.__version===void 0||et===!0,U=K.dataReady,mt=L(y,st);if(y.isDepthTexture)Bt=x(y.format===Ti,y.type),ae&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,Bt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Bt,st.width,st.height,0,St,Ut,null));else if(y.isDataTexture)if(Zt.length>0){Wt&&ae&&e.texStorage2D(i.TEXTURE_2D,mt,Bt,Zt[0].width,Zt[0].height);for(let q=0,Q=Zt.length;q<Q;q++)wt=Zt[q],Wt?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,Ut,wt.data):e.texImage2D(i.TEXTURE_2D,q,Bt,wt.width,wt.height,0,St,Ut,wt.data);y.generateMipmaps=!1}else Wt?(ae&&e.texStorage2D(i.TEXTURE_2D,mt,Bt,st.width,st.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,St,Ut,st.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,st.width,st.height,0,St,Ut,st.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Wt&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Bt,Zt[0].width,Zt[0].height,st.depth);for(let q=0,Q=Zt.length;q<Q;q++)if(wt=Zt[q],y.format!==Ve)if(St!==null)if(Wt){if(U)if(y.layerUpdates.size>0){const xt=ja(wt.width,wt.height,y.format,y.type);for(const gt of y.layerUpdates){const Ht=wt.data.subarray(gt*xt/wt.data.BYTES_PER_ELEMENT,(gt+1)*xt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,gt,wt.width,wt.height,1,St,Ht)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,st.depth,St,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Bt,wt.width,wt.height,st.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,st.depth,St,Ut,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Bt,wt.width,wt.height,st.depth,0,St,Ut,wt.data)}else{Wt&&ae&&e.texStorage2D(i.TEXTURE_2D,mt,Bt,Zt[0].width,Zt[0].height);for(let q=0,Q=Zt.length;q<Q;q++)wt=Zt[q],y.format!==Ve?St!==null?Wt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Bt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,St,Ut,wt.data):e.texImage2D(i.TEXTURE_2D,q,Bt,wt.width,wt.height,0,St,Ut,wt.data)}else if(y.isDataArrayTexture)if(Wt){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Bt,st.width,st.height,st.depth),U)if(y.layerUpdates.size>0){const q=ja(st.width,st.height,y.format,y.type);for(const Q of y.layerUpdates){const xt=st.data.subarray(Q*q/st.data.BYTES_PER_ELEMENT,(Q+1)*q/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,st.width,st.height,1,St,Ut,xt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,St,Ut,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,st.width,st.height,st.depth,0,St,Ut,st.data);else if(y.isData3DTexture)Wt?(ae&&e.texStorage3D(i.TEXTURE_3D,mt,Bt,st.width,st.height,st.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,St,Ut,st.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,st.width,st.height,st.depth,0,St,Ut,st.data);else if(y.isFramebufferTexture){if(ae)if(Wt)e.texStorage2D(i.TEXTURE_2D,mt,Bt,st.width,st.height);else{let q=st.width,Q=st.height;for(let xt=0;xt<mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,Bt,q,Q,0,St,Ut,null),q>>=1,Q>>=1}}else if(Zt.length>0){if(Wt&&ae){const q=vt(Zt[0]);e.texStorage2D(i.TEXTURE_2D,mt,Bt,q.width,q.height)}for(let q=0,Q=Zt.length;q<Q;q++)wt=Zt[q],Wt?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,St,Ut,wt):e.texImage2D(i.TEXTURE_2D,q,Bt,St,Ut,wt);y.generateMipmaps=!1}else if(Wt){if(ae){const q=vt(st);e.texStorage2D(i.TEXTURE_2D,mt,Bt,q.width,q.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,Ut,st)}else e.texImage2D(i.TEXTURE_2D,0,Bt,St,Ut,st);m(y)&&p($),Tt.__version=K.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function ot(T,y,z){if(y.image.length!==6)return;const $=te(T,y),et=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+z);const K=n.get(et);if(et.version!==K.__version||$===!0){e.activeTexture(i.TEXTURE0+z);const Tt=Jt.getPrimaries(Jt.workingColorSpace),pt=y.colorSpace===An?null:Jt.getPrimaries(y.colorSpace),Mt=y.colorSpace===An||Tt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const qt=y.isCompressedTexture||y.image[0].isCompressedTexture,st=y.image[0]&&y.image[0].isDataTexture,St=[];for(let Q=0;Q<6;Q++)!qt&&!st?St[Q]=_(y.image[Q],!0,s.maxCubemapSize):St[Q]=st?y.image[Q].image:y.image[Q],St[Q]=It(y,St[Q]);const Ut=St[0],Bt=r.convert(y.format,y.colorSpace),wt=r.convert(y.type),Zt=v(y.internalFormat,Bt,wt,y.colorSpace),Wt=y.isVideoTexture!==!0,ae=K.__version===void 0||$===!0,U=et.dataReady;let mt=L(y,Ut);Lt(i.TEXTURE_CUBE_MAP,y);let q;if(qt){Wt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Zt,Ut.width,Ut.height);for(let Q=0;Q<6;Q++){q=St[Q].mipmaps;for(let xt=0;xt<q.length;xt++){const gt=q[xt];y.format!==Ve?Bt!==null?Wt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt,0,0,gt.width,gt.height,Bt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt,Zt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt,0,0,gt.width,gt.height,Bt,wt,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt,Zt,gt.width,gt.height,0,Bt,wt,gt.data)}}}else{if(q=y.mipmaps,Wt&&ae){q.length>0&&mt++;const Q=vt(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Zt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(st){Wt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,St[Q].width,St[Q].height,Bt,wt,St[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Zt,St[Q].width,St[Q].height,0,Bt,wt,St[Q].data);for(let xt=0;xt<q.length;xt++){const Ht=q[xt].image[Q].image;Wt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt+1,0,0,Ht.width,Ht.height,Bt,wt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt+1,Zt,Ht.width,Ht.height,0,Bt,wt,Ht.data)}}else{Wt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Bt,wt,St[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Zt,Bt,wt,St[Q]);for(let xt=0;xt<q.length;xt++){const gt=q[xt];Wt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt+1,0,0,Bt,wt,gt.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xt+1,Zt,Bt,wt,gt.image[Q])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),K.__version=et.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function bt(T,y,z,$,et,K){const Tt=r.convert(z.format,z.colorSpace),pt=r.convert(z.type),Mt=v(z.internalFormat,Tt,pt,z.colorSpace),qt=n.get(y),st=n.get(z);if(st.__renderTarget=y,!qt.__hasExternalTextures){const St=Math.max(1,y.width>>K),Ut=Math.max(1,y.height>>K);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,K,Mt,St,Ut,y.depth,0,Tt,pt,null):e.texImage2D(et,K,Mt,St,Ut,0,Tt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),yt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,et,st.__webglTexture,0,it(y)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,et,st.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(T,y,z){if(i.bindRenderbuffer(i.RENDERBUFFER,T),y.depthBuffer){const $=y.depthTexture,et=$&&$.isDepthTexture?$.type:null,K=x(y.stencilBuffer,et),Tt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=it(y);yt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,K,y.width,y.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,T)}else{const $=y.textures;for(let et=0;et<$.length;et++){const K=$[et],Tt=r.convert(K.format,K.colorSpace),pt=r.convert(K.type),Mt=v(K.internalFormat,Tt,pt,K.colorSpace),qt=it(y);z&&yt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,qt,Mt,y.width,y.height):yt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qt,Mt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Dt(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(y.depthTexture);$.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z(y.depthTexture,0);const et=$.__webglTexture,K=it(y);if(y.depthTexture.format===gi)yt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(y.depthTexture.format===Ti)yt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function zt(T){const y=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==T.depthTexture){const $=T.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){const et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",et)};$.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=$}if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Dt(y.__webglFramebuffer,T)}else if(z){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=i.createRenderbuffer(),lt(y.__webglDepthbuffer[$],T,!1);else{const et=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),lt(y.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(T,y,z){const $=n.get(T);y!==void 0&&bt($.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&zt(T)}function Kt(T){const y=T.texture,z=n.get(T),$=n.get(y);T.addEventListener("dispose",E);const et=T.textures,K=T.isWebGLCubeRenderTarget===!0,Tt=et.length>1;if(Tt||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=y.version,o.memory.textures++),K){z.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[pt]=[];for(let Mt=0;Mt<y.mipmaps.length;Mt++)z.__webglFramebuffer[pt][Mt]=i.createFramebuffer()}else z.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let pt=0;pt<y.mipmaps.length;pt++)z.__webglFramebuffer[pt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let pt=0,Mt=et.length;pt<Mt;pt++){const qt=n.get(et[pt]);qt.__webglTexture===void 0&&(qt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&yt(T)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pt=0;pt<et.length;pt++){const Mt=et[pt];z.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[pt]);const qt=r.convert(Mt.format,Mt.colorSpace),st=r.convert(Mt.type),St=v(Mt.internalFormat,qt,st,Mt.colorSpace,T.isXRRenderTarget===!0),Ut=it(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,St,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,z.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(z.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Lt(i.TEXTURE_CUBE_MAP,y);for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0)for(let Mt=0;Mt<y.mipmaps.length;Mt++)bt(z.__webglFramebuffer[pt][Mt],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt);else bt(z.__webglFramebuffer[pt],T,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let pt=0,Mt=et.length;pt<Mt;pt++){const qt=et[pt],st=n.get(qt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),Lt(i.TEXTURE_2D,qt),bt(z.__webglFramebuffer,T,qt,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),m(qt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,$.__webglTexture),Lt(pt,y),y.mipmaps&&y.mipmaps.length>0)for(let Mt=0;Mt<y.mipmaps.length;Mt++)bt(z.__webglFramebuffer[Mt],T,y,i.COLOR_ATTACHMENT0,pt,Mt);else bt(z.__webglFramebuffer,T,y,i.COLOR_ATTACHMENT0,pt,0);m(y)&&p(pt),e.unbindTexture()}T.depthBuffer&&zt(T)}function tt(T){const y=T.textures;for(let z=0,$=y.length;z<$;z++){const et=y[z];if(m(et)){const K=M(T),Tt=n.get(et).__webglTexture;e.bindTexture(K,Tt),p(K),e.unbindTexture()}}}const rt=[],R=[];function Rt(T){if(T.samples>0){if(yt(T)===!1){const y=T.textures,z=T.width,$=T.height;let et=i.COLOR_BUFFER_BIT;const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(T),pt=y.length>1;if(pt)for(let Mt=0;Mt<y.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Mt=0;Mt<y.length;Mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const qt=n.get(y[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qt,0)}i.blitFramebuffer(0,0,z,$,0,0,z,$,et,i.NEAREST),c===!0&&(rt.length=0,R.length=0,rt.push(i.COLOR_ATTACHMENT0+Mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(rt.push(K),R.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,R)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Mt=0;Mt<y.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const qt=n.get(y[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,qt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function it(T){return Math.min(s.maxSamples,T.samples)}function yt(T){const y=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ut(T){const y=o.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function It(T,y){const z=T.colorSpace,$=T.format,et=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Ai&&z!==An&&(Jt.getTransfer(z)===re?($!==Ve||et!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}function vt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.setTexture2D=Z,this.setTexture2DArray=X,this.setTexture3D=W,this.setTextureCube=O,this.rebindTextures=Ft,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=yt}function Mm(i,t){function e(n,s=An){let r;const o=Jt.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===Co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ro)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wc)return i.BYTE;if(n===bc)return i.SHORT;if(n===Ki)return i.UNSIGNED_SHORT;if(n===Ao)return i.INT;if(n===Wn)return i.UNSIGNED_INT;if(n===en)return i.FLOAT;if(n===es)return i.HALF_FLOAT;if(n===Ec)return i.ALPHA;if(n===Ac)return i.RGB;if(n===Ve)return i.RGBA;if(n===Cc)return i.LUMINANCE;if(n===Rc)return i.LUMINANCE_ALPHA;if(n===gi)return i.DEPTH_COMPONENT;if(n===Ti)return i.DEPTH_STENCIL;if(n===Po)return i.RED;if(n===Do)return i.RED_INTEGER;if(n===Pc)return i.RG;if(n===Lo)return i.RG_INTEGER;if(n===Io)return i.RGBA_INTEGER;if(n===Is||n===Us||n===Ns||n===Fs)if(o===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Is)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Is)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qr||n===Zr||n===$r||n===Kr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===qr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Zr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$r)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Kr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jr||n===jr||n===Qr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Jr||n===jr)return o===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qr)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===to||n===eo||n===no||n===io||n===so||n===ro||n===oo||n===ao||n===co||n===lo||n===ho||n===uo||n===fo||n===po)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===to)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===eo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===no)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===io)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===so)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ro)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ao)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===co)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===lo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ho)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===uo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===po)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Os||n===mo||n===go)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Os)return o===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===mo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dc||n===_o||n===xo||n===vo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Os)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class ym extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Nt extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sm={type:"move"};class Er{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Nt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const wm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bm=`
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

}`;class Tm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Te,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new _n({vertexShader:wm,fragmentShader:bm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new I(new Ce(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Em extends Ci{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=new Tm,m=e.getContextAttributes();let p=null,M=null;const v=[],x=[],L=new ct;let A=null;const E=new Be;E.viewport=new oe;const P=new Be;P.viewport=new oe;const b=[E,P],S=new ym;let D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ot=v[J];return ot===void 0&&(ot=new Er,v[J]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(J){let ot=v[J];return ot===void 0&&(ot=new Er,v[J]=ot),ot.getGripSpace()},this.getHand=function(J){let ot=v[J];return ot===void 0&&(ot=new Er,v[J]=ot),ot.getHandSpace()};function B(J){const ot=x.indexOf(J.inputSource);if(ot===-1)return;const bt=v[ot];bt!==void 0&&(bt.update(J.inputSource,J.frame,l||o),bt.dispatchEvent({type:J.type,data:J.inputSource}))}function Y(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Z);for(let J=0;J<v.length;J++){const ot=x[J];ot!==null&&(x[J]=null,v[J].disconnect(ot))}D=null,k=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,M=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const ot={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Xn(d.framebufferWidth,d.framebufferHeight,{format:Ve,type:mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ot=null,bt=null,lt=null;m.depth&&(lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=m.stencil?Ti:gi,bt=m.stencil?bi:Wn);const Dt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Dt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new Xn(f.textureWidth,f.textureHeight,{format:Ve,type:mn,depthTexture:new qc(f.textureWidth,f.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),te.setContext(s),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(J){for(let ot=0;ot<J.removed.length;ot++){const bt=J.removed[ot],lt=x.indexOf(bt);lt>=0&&(x[lt]=null,v[lt].disconnect(bt))}for(let ot=0;ot<J.added.length;ot++){const bt=J.added[ot];let lt=x.indexOf(bt);if(lt===-1){for(let zt=0;zt<v.length;zt++)if(zt>=x.length){x.push(bt),lt=zt;break}else if(x[zt]===null){x[zt]=bt,lt=zt;break}if(lt===-1)break}const Dt=v[lt];Dt&&Dt.connect(bt)}}const X=new C,W=new C;function O(J,ot,bt){X.setFromMatrixPosition(ot.matrixWorld),W.setFromMatrixPosition(bt.matrixWorld);const lt=X.distanceTo(W),Dt=ot.projectionMatrix.elements,zt=bt.projectionMatrix.elements,Ft=Dt[14]/(Dt[10]-1),Kt=Dt[14]/(Dt[10]+1),tt=(Dt[9]+1)/Dt[5],rt=(Dt[9]-1)/Dt[5],R=(Dt[8]-1)/Dt[0],Rt=(zt[8]+1)/zt[0],it=Ft*R,yt=Ft*Rt,ut=lt/(-R+Rt),It=ut*-R;if(ot.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(It),J.translateZ(ut),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Dt[10]===-1)J.projectionMatrix.copy(ot.projectionMatrix),J.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const vt=Ft+ut,T=Kt+ut,y=it-It,z=yt+(lt-It),$=tt*Kt/T*vt,et=rt*Kt/T*vt;J.projectionMatrix.makePerspective(y,z,$,et,vt,T),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function nt(J,ot){ot===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ot.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ot=J.near,bt=J.far;_.texture!==null&&(_.depthNear>0&&(ot=_.depthNear),_.depthFar>0&&(bt=_.depthFar)),S.near=P.near=E.near=ot,S.far=P.far=E.far=bt,(D!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,k=S.far),E.layers.mask=J.layers.mask|2,P.layers.mask=J.layers.mask|4,S.layers.mask=E.layers.mask|P.layers.mask;const lt=J.parent,Dt=S.cameras;nt(S,lt);for(let zt=0;zt<Dt.length;zt++)nt(Dt[zt],lt);Dt.length===2?O(S,E,P):S.projectionMatrix.copy(E.projectionMatrix),ht(J,S,lt)};function ht(J,ot,bt){bt===null?J.matrix.copy(ot.matrixWorld):(J.matrix.copy(bt.matrixWorld),J.matrix.invert(),J.matrix.multiply(ot.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ot.projectionMatrix),J.projectionMatrixInverse.copy(ot.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ji*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(J){c=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let ft=null;function Lt(J,ot){if(h=ot.getViewerPose(l||o),g=ot,h!==null){const bt=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let lt=!1;bt.length!==S.cameras.length&&(S.cameras.length=0,lt=!0);for(let zt=0;zt<bt.length;zt++){const Ft=bt[zt];let Kt=null;if(d!==null)Kt=d.getViewport(Ft);else{const rt=u.getViewSubImage(f,Ft);Kt=rt.viewport,zt===0&&(t.setRenderTargetTextures(M,rt.colorTexture,f.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(M))}let tt=b[zt];tt===void 0&&(tt=new Be,tt.layers.enable(zt),tt.viewport=new oe,b[zt]=tt),tt.matrix.fromArray(Ft.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(Ft.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),zt===0&&(S.matrix.copy(tt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),lt===!0&&S.cameras.push(tt)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const zt=u.getDepthInformation(bt[0]);zt&&zt.isValid&&zt.texture&&_.init(t,zt,s.renderState)}}for(let bt=0;bt<v.length;bt++){const lt=x[bt],Dt=v[bt];lt!==null&&Dt!==void 0&&Dt.update(lt,ot,l||o)}ft&&ft(J,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const te=new Xc;te.setAnimationLoop(Lt),this.setAnimationLoop=function(J){ft=J},this.dispose=function(){}}}const On=new gn,Am=new se;function Cm(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Vc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Re&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Re&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),v=M.envMap,x=M.envMapRotation;v&&(m.envMap.value=v,On.copy(x),On.x*=-1,On.y*=-1,On.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),m.envMapRotation.value.setFromMatrix4(Am.makeRotationFromEuler(On)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Re&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rm(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){const x=v.program;n.uniformBlockBinding(M,x)}function l(M,v){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));const L=v.program;n.updateUBOMapping(M,L);const A=t.render.frame;r[M.id]!==A&&(f(M),r[M.id]=A)}function h(M){const v=u();M.__bindingPointIndex=v;const x=i.createBuffer(),L=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,L,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=s[M.id],x=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,E=x.length;A<E;A++){const P=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,S=P.length;b<S;b++){const D=P[b];if(d(D,A,b,L)===!0){const k=D.__offset,B=Array.isArray(D.value)?D.value:[D.value];let Y=0;for(let Z=0;Z<B.length;Z++){const X=B[Z],W=_(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,k+Y,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,Y),Y+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,v,x,L){const A=M.value,E=v+"_"+x;if(L[E]===void 0)return typeof A=="number"||typeof A=="boolean"?L[E]=A:L[E]=A.clone(),!0;{const P=L[E];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return L[E]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function g(M){const v=M.uniforms;let x=0;const L=16;for(let E=0,P=v.length;E<P;E++){const b=Array.isArray(v[E])?v[E]:[v[E]];for(let S=0,D=b.length;S<D;S++){const k=b[S],B=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,Z=B.length;Y<Z;Y++){const X=B[Y],W=_(X),O=x%L,nt=O%W.boundary,ht=O+nt;x+=nt,ht!==0&&L-ht<W.storage&&(x+=L-ht),k.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=W.storage}}}const A=x%L;return A>0&&(x+=L-A),M.__size=x,M.__cache={},this}function _(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){const v=M.target;v.removeEventListener("dispose",m);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Pm{constructor(t={}){const{canvas:e=_h(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Le,this.toneMapping=Pn,this.toneMappingExposure=1;const x=this;let L=!1,A=0,E=0,P=null,b=-1,S=null;const D=new oe,k=new oe;let B=null;const Y=new Ot(0);let Z=0,X=e.width,W=e.height,O=1,nt=null,ht=null;const ft=new oe(0,0,X,W),Lt=new oe(0,0,X,W);let te=!1;const J=new Ys;let ot=!1,bt=!1;const lt=new se,Dt=new se,zt=new C,Ft=new oe,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function rt(){return P===null?O:1}let R=n;function Rt(w,N){return e.getContext(w,N)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Eo}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),R===null){const N="webgl2";if(R=Rt(N,w),R===null)throw Rt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let it,yt,ut,It,vt,T,y,z,$,et,K,Tt,pt,Mt,qt,st,St,Ut,Bt,wt,Zt,Wt,ae,U;function mt(){it=new Nf(R),it.init(),Wt=new Mm(R,it),yt=new Rf(R,it,t,Wt),ut=new _m(R,it),yt.reverseDepthBuffer&&f&&ut.buffers.depth.setReversed(!0),It=new Bf(R),vt=new nm,T=new vm(R,it,ut,vt,yt,Wt,It),y=new Df(x),z=new Uf(x),$=new Wh(R),ae=new Af(R,$),et=new Ff(R,$,It,ae),K=new kf(R,et,$,It),Bt=new zf(R,yt,T),st=new Pf(vt),Tt=new em(x,y,z,it,yt,ae,st),pt=new Cm(x,vt),Mt=new sm,qt=new hm(it),Ut=new Ef(x,y,z,ut,K,d,c),St=new mm(x,K,yt),U=new Rm(R,It,yt,ut),wt=new Cf(R,it,It),Zt=new Of(R,it,It),It.programs=Tt.programs,x.capabilities=yt,x.extensions=it,x.properties=vt,x.renderLists=Mt,x.shadowMap=St,x.state=ut,x.info=It}mt();const q=new Em(x,R);this.xr=q,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const w=it.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=it.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(w){w!==void 0&&(O=w,this.setSize(X,W,!1))},this.getSize=function(w){return w.set(X,W)},this.setSize=function(w,N,H=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,W=N,e.width=Math.floor(w*O),e.height=Math.floor(N*O),H===!0&&(e.style.width=w+"px",e.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(X*O,W*O).floor()},this.setDrawingBufferSize=function(w,N,H){X=w,W=N,O=H,e.width=Math.floor(w*H),e.height=Math.floor(N*H),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(D)},this.getViewport=function(w){return w.copy(ft)},this.setViewport=function(w,N,H,G){w.isVector4?ft.set(w.x,w.y,w.z,w.w):ft.set(w,N,H,G),ut.viewport(D.copy(ft).multiplyScalar(O).round())},this.getScissor=function(w){return w.copy(Lt)},this.setScissor=function(w,N,H,G){w.isVector4?Lt.set(w.x,w.y,w.z,w.w):Lt.set(w,N,H,G),ut.scissor(k.copy(Lt).multiplyScalar(O).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(w){ut.setScissorTest(te=w)},this.setOpaqueSort=function(w){nt=w},this.setTransparentSort=function(w){ht=w},this.getClearColor=function(w){return w.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(w=!0,N=!0,H=!0){let G=0;if(w){let F=!1;if(P!==null){const at=P.texture.format;F=at===Io||at===Lo||at===Do}if(F){const at=P.texture.type,_t=at===mn||at===Wn||at===Ki||at===bi||at===Co||at===Ro,Et=Ut.getClearColor(),At=Ut.getClearAlpha(),kt=Et.r,Vt=Et.g,Ct=Et.b;_t?(g[0]=kt,g[1]=Vt,g[2]=Ct,g[3]=At,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=kt,_[1]=Vt,_[2]=Ct,_[3]=At,R.clearBufferiv(R.COLOR,0,_))}else G|=R.COLOR_BUFFER_BIT}N&&(G|=R.DEPTH_BUFFER_BIT),H&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Mt.dispose(),qt.dispose(),vt.dispose(),y.dispose(),z.dispose(),K.dispose(),ae.dispose(),U.dispose(),Tt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Yo),q.removeEventListener("sessionend",qo),Dn.stop()};function Q(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const w=It.autoReset,N=St.enabled,H=St.autoUpdate,G=St.needsUpdate,F=St.type;mt(),It.autoReset=w,St.enabled=N,St.autoUpdate=H,St.needsUpdate=G,St.type=F}function gt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ht(w){const N=w.target;N.removeEventListener("dispose",Ht),fe(N)}function fe(w){Se(w),vt.remove(w)}function Se(w){const N=vt.get(w).programs;N!==void 0&&(N.forEach(function(H){Tt.releaseProgram(H)}),w.isShaderMaterial&&Tt.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,H,G,F,at){N===null&&(N=Kt);const _t=F.isMesh&&F.matrixWorld.determinant()<0,Et=fl(w,N,H,G,F);ut.setMaterial(G,_t);let At=H.index,kt=1;if(G.wireframe===!0){if(At=et.getWireframeAttribute(H),At===void 0)return;kt=2}const Vt=H.drawRange,Ct=H.attributes.position;let jt=Vt.start*kt,ce=(Vt.start+Vt.count)*kt;at!==null&&(jt=Math.max(jt,at.start*kt),ce=Math.min(ce,(at.start+at.count)*kt)),At!==null?(jt=Math.max(jt,0),ce=Math.min(ce,At.count)):Ct!=null&&(jt=Math.max(jt,0),ce=Math.min(ce,Ct.count));const le=ce-jt;if(le<0||le===1/0)return;ae.setup(F,G,Et,H,At);let De,ee=wt;if(At!==null&&(De=$.get(At),ee=Zt,ee.setIndex(De)),F.isMesh)G.wireframe===!0?(ut.setLineWidth(G.wireframeLinewidth*rt()),ee.setMode(R.LINES)):ee.setMode(R.TRIANGLES);else if(F.isLine){let Pt=G.linewidth;Pt===void 0&&(Pt=1),ut.setLineWidth(Pt*rt()),F.isLineSegments?ee.setMode(R.LINES):F.isLineLoop?ee.setMode(R.LINE_LOOP):ee.setMode(R.LINE_STRIP)}else F.isPoints?ee.setMode(R.POINTS):F.isSprite&&ee.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ee.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))ee.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pt=F._multiDrawStarts,rn=F._multiDrawCounts,ne=F._multiDrawCount,Ye=At?$.get(At).bytesPerElement:1,$n=vt.get(G).currentProgram.getUniforms();for(let Ne=0;Ne<ne;Ne++)$n.setValue(R,"_gl_DrawID",Ne),ee.render(Pt[Ne]/Ye,rn[Ne])}else if(F.isInstancedMesh)ee.renderInstances(jt,le,F.count);else if(H.isInstancedBufferGeometry){const Pt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,rn=Math.min(H.instanceCount,Pt);ee.renderInstances(jt,le,rn)}else ee.render(jt,le)};function ie(w,N,H){w.transparent===!0&&w.side===ze&&w.forceSinglePass===!1?(w.side=Re,w.needsUpdate=!0,rs(w,N,H),w.side=pn,w.needsUpdate=!0,rs(w,N,H),w.side=ze):rs(w,N,H)}this.compile=function(w,N,H=null){H===null&&(H=w),p=qt.get(H),p.init(N),v.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==H&&w.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const G=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const at=F.material;if(at)if(Array.isArray(at))for(let _t=0;_t<at.length;_t++){const Et=at[_t];ie(Et,H,F),G.add(Et)}else ie(at,H,F),G.add(at)}),v.pop(),p=null,G},this.compileAsync=function(w,N,H=null){const G=this.compile(w,N,H);return new Promise(F=>{function at(){if(G.forEach(function(_t){vt.get(_t).currentProgram.isReady()&&G.delete(_t)}),G.size===0){F(w);return}setTimeout(at,10)}it.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Xe=null;function sn(w){Xe&&Xe(w)}function Yo(){Dn.stop()}function qo(){Dn.start()}const Dn=new Xc;Dn.setAnimationLoop(sn),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(w){Xe=w,q.setAnimationLoop(w),w===null?Dn.stop():Dn.start()},q.addEventListener("sessionstart",Yo),q.addEventListener("sessionend",qo),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(N),N=q.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,N,P),p=qt.get(w,v.length),p.init(N),v.push(p),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),J.setFromProjectionMatrix(Dt),bt=this.localClippingEnabled,ot=st.init(this.clippingPlanes,bt),m=Mt.get(w,M.length),m.init(),M.push(m),q.enabled===!0&&q.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&js(at,N,-1/0,x.sortObjects)}js(w,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(nt,ht),tt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,tt&&Ut.addToRenderList(m,w),this.info.render.frame++,ot===!0&&st.beginShadows();const H=p.state.shadowsArray;St.render(H,w,N),ot===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const at=N.cameras;if(F.length>0)for(let _t=0,Et=at.length;_t<Et;_t++){const At=at[_t];$o(G,F,w,At)}tt&&Ut.render(w);for(let _t=0,Et=at.length;_t<Et;_t++){const At=at[_t];Zo(m,w,At,At.viewport)}}else F.length>0&&$o(G,F,w,N),tt&&Ut.render(w),Zo(m,w,N);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(x,w,N),ae.resetDefaultState(),b=-1,S=null,v.pop(),v.length>0?(p=v[v.length-1],ot===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function js(w,N,H,G){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||J.intersectsSprite(w)){G&&Ft.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Dt);const _t=K.update(w),Et=w.material;Et.visible&&m.push(w,_t,Et,H,Ft.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||J.intersectsObject(w))){const _t=K.update(w),Et=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ft.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ft.copy(_t.boundingSphere.center)),Ft.applyMatrix4(w.matrixWorld).applyMatrix4(Dt)),Array.isArray(Et)){const At=_t.groups;for(let kt=0,Vt=At.length;kt<Vt;kt++){const Ct=At[kt],jt=Et[Ct.materialIndex];jt&&jt.visible&&m.push(w,_t,jt,H,Ft.z,Ct)}}else Et.visible&&m.push(w,_t,Et,H,Ft.z,null)}}const at=w.children;for(let _t=0,Et=at.length;_t<Et;_t++)js(at[_t],N,H,G)}function Zo(w,N,H,G){const F=w.opaque,at=w.transmissive,_t=w.transparent;p.setupLightsView(H),ot===!0&&st.setGlobalState(x.clippingPlanes,H),G&&ut.viewport(D.copy(G)),F.length>0&&ss(F,N,H),at.length>0&&ss(at,N,H),_t.length>0&&ss(_t,N,H),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function $o(w,N,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Xn(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?es:mn,minFilter:Gn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const at=p.state.transmissionRenderTarget[G.id],_t=G.viewport||D;at.setSize(_t.z,_t.w);const Et=x.getRenderTarget();x.setRenderTarget(at),x.getClearColor(Y),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),tt&&Ut.render(H);const At=x.toneMapping;x.toneMapping=Pn;const kt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),ot===!0&&st.setGlobalState(x.clippingPlanes,G),ss(w,H,G),T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at),it.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Ct=0,jt=N.length;Ct<jt;Ct++){const ce=N[Ct],le=ce.object,De=ce.geometry,ee=ce.material,Pt=ce.group;if(ee.side===ze&&le.layers.test(G.layers)){const rn=ee.side;ee.side=Re,ee.needsUpdate=!0,Ko(le,H,G,De,ee,Pt),ee.side=rn,ee.needsUpdate=!0,Vt=!0}}Vt===!0&&(T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at))}x.setRenderTarget(Et),x.setClearColor(Y,Z),kt!==void 0&&(G.viewport=kt),x.toneMapping=At}function ss(w,N,H){const G=N.isScene===!0?N.overrideMaterial:null;for(let F=0,at=w.length;F<at;F++){const _t=w[F],Et=_t.object,At=_t.geometry,kt=G===null?_t.material:G,Vt=_t.group;Et.layers.test(H.layers)&&Ko(Et,N,H,At,kt,Vt)}}function Ko(w,N,H,G,F,at){w.onBeforeRender(x,N,H,G,F,at),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(x,N,H,G,w,at),F.transparent===!0&&F.side===ze&&F.forceSinglePass===!1?(F.side=Re,F.needsUpdate=!0,x.renderBufferDirect(H,N,G,F,w,at),F.side=pn,F.needsUpdate=!0,x.renderBufferDirect(H,N,G,F,w,at),F.side=ze):x.renderBufferDirect(H,N,G,F,w,at),w.onAfterRender(x,N,H,G,F,at)}function rs(w,N,H){N.isScene!==!0&&(N=Kt);const G=vt.get(w),F=p.state.lights,at=p.state.shadowsArray,_t=F.state.version,Et=Tt.getParameters(w,F.state,at,N,H),At=Tt.getProgramCacheKey(Et);let kt=G.programs;G.environment=w.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(w.isMeshStandardMaterial?z:y).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,kt===void 0&&(w.addEventListener("dispose",Ht),kt=new Map,G.programs=kt);let Vt=kt.get(At);if(Vt!==void 0){if(G.currentProgram===Vt&&G.lightsStateVersion===_t)return jo(w,Et),Vt}else Et.uniforms=Tt.getUniforms(w),w.onBeforeCompile(Et,x),Vt=Tt.acquireProgram(Et,At),kt.set(At,Vt),G.uniforms=Et.uniforms;const Ct=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ct.clippingPlanes=st.uniform),jo(w,Et),G.needsLights=ml(w),G.lightsStateVersion=_t,G.needsLights&&(Ct.ambientLightColor.value=F.state.ambient,Ct.lightProbe.value=F.state.probe,Ct.directionalLights.value=F.state.directional,Ct.directionalLightShadows.value=F.state.directionalShadow,Ct.spotLights.value=F.state.spot,Ct.spotLightShadows.value=F.state.spotShadow,Ct.rectAreaLights.value=F.state.rectArea,Ct.ltc_1.value=F.state.rectAreaLTC1,Ct.ltc_2.value=F.state.rectAreaLTC2,Ct.pointLights.value=F.state.point,Ct.pointLightShadows.value=F.state.pointShadow,Ct.hemisphereLights.value=F.state.hemi,Ct.directionalShadowMap.value=F.state.directionalShadowMap,Ct.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ct.spotShadowMap.value=F.state.spotShadowMap,Ct.spotLightMatrix.value=F.state.spotLightMatrix,Ct.spotLightMap.value=F.state.spotLightMap,Ct.pointShadowMap.value=F.state.pointShadowMap,Ct.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Vt,G.uniformsList=null,Vt}function Jo(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=Bs.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function jo(w,N){const H=vt.get(w);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function fl(w,N,H,G,F){N.isScene!==!0&&(N=Kt),T.resetTextureUnits();const at=N.fog,_t=G.isMeshStandardMaterial?N.environment:null,Et=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ai,At=(G.isMeshStandardMaterial?z:y).get(G.envMap||_t),kt=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Vt=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ct=!!H.morphAttributes.position,jt=!!H.morphAttributes.normal,ce=!!H.morphAttributes.color;let le=Pn;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(le=x.toneMapping);const De=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ee=De!==void 0?De.length:0,Pt=vt.get(G),rn=p.state.lights;if(ot===!0&&(bt===!0||w!==S)){const ke=w===S&&G.id===b;st.setState(G,w,ke)}let ne=!1;G.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==rn.state.version||Pt.outputColorSpace!==Et||F.isBatchedMesh&&Pt.batching===!1||!F.isBatchedMesh&&Pt.batching===!0||F.isBatchedMesh&&Pt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pt.instancing===!1||!F.isInstancedMesh&&Pt.instancing===!0||F.isSkinnedMesh&&Pt.skinning===!1||!F.isSkinnedMesh&&Pt.skinning===!0||F.isInstancedMesh&&Pt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pt.instancingMorph===!1&&F.morphTexture!==null||Pt.envMap!==At||G.fog===!0&&Pt.fog!==at||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==st.numPlanes||Pt.numIntersection!==st.numIntersection)||Pt.vertexAlphas!==kt||Pt.vertexTangents!==Vt||Pt.morphTargets!==Ct||Pt.morphNormals!==jt||Pt.morphColors!==ce||Pt.toneMapping!==le||Pt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Pt.__version=G.version);let Ye=Pt.currentProgram;ne===!0&&(Ye=rs(G,N,F));let $n=!1,Ne=!1,Li=!1;const he=Ye.getUniforms(),je=Pt.uniforms;if(ut.useProgram(Ye.program)&&($n=!0,Ne=!0,Li=!0),G.id!==b&&(b=G.id,Ne=!0),$n||S!==w){ut.buffers.depth.getReversed()?(lt.copy(w.projectionMatrix),vh(lt),Mh(lt),he.setValue(R,"projectionMatrix",lt)):he.setValue(R,"projectionMatrix",w.projectionMatrix),he.setValue(R,"viewMatrix",w.matrixWorldInverse);const xn=he.map.cameraPosition;xn!==void 0&&xn.setValue(R,zt.setFromMatrixPosition(w.matrixWorld)),yt.logarithmicDepthBuffer&&he.setValue(R,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&he.setValue(R,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Ne=!0,Li=!0)}if(F.isSkinnedMesh){he.setOptional(R,F,"bindMatrix"),he.setOptional(R,F,"bindMatrixInverse");const ke=F.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),he.setValue(R,"boneTexture",ke.boneTexture,T))}F.isBatchedMesh&&(he.setOptional(R,F,"batchingTexture"),he.setValue(R,"batchingTexture",F._matricesTexture,T),he.setOptional(R,F,"batchingIdTexture"),he.setValue(R,"batchingIdTexture",F._indirectTexture,T),he.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&he.setValue(R,"batchingColorTexture",F._colorsTexture,T));const Ii=H.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&Bt.update(F,H,Ye),(Ne||Pt.receiveShadow!==F.receiveShadow)&&(Pt.receiveShadow=F.receiveShadow,he.setValue(R,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(je.envMap.value=At,je.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(je.envMapIntensity.value=N.environmentIntensity),Ne&&(he.setValue(R,"toneMappingExposure",x.toneMappingExposure),Pt.needsLights&&pl(je,Li),at&&G.fog===!0&&pt.refreshFogUniforms(je,at),pt.refreshMaterialUniforms(je,G,O,W,p.state.transmissionRenderTarget[w.id]),Bs.upload(R,Jo(Pt),je,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Bs.upload(R,Jo(Pt),je,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&he.setValue(R,"center",F.center),he.setValue(R,"modelViewMatrix",F.modelViewMatrix),he.setValue(R,"normalMatrix",F.normalMatrix),he.setValue(R,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const ke=G.uniformsGroups;for(let xn=0,vn=ke.length;xn<vn;xn++){const Qo=ke[xn];U.update(Qo,Ye),U.bind(Qo,Ye)}}return Ye}function pl(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function ml(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,N,H){vt.get(w.texture).__webglTexture=N,vt.get(w.depthTexture).__webglTexture=H;const G=vt.get(w);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,N){const H=vt.get(w);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,H=0){P=w,A=N,E=H;let G=!0,F=null,at=!1,_t=!1;if(w){const At=vt.get(w);if(At.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(At.__hasExternalTextures)T.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ct=w.depthTexture;if(At.__boundDepthTexture!==Ct){if(Ct!==null&&vt.has(Ct)&&(w.width!==Ct.image.width||w.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const kt=w.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(_t=!0);const Vt=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Vt[N])?F=Vt[N][H]:F=Vt[N],at=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?F=vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Vt)?F=Vt[H]:F=Vt,D.copy(w.viewport),k.copy(w.scissor),B=w.scissorTest}else D.copy(ft).multiplyScalar(O).floor(),k.copy(Lt).multiplyScalar(O).floor(),B=te;if(ut.bindFramebuffer(R.FRAMEBUFFER,F)&&G&&ut.drawBuffers(w,F),ut.viewport(D),ut.scissor(k),ut.setScissorTest(B),at){const At=vt.get(w.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,H)}else if(_t){const At=vt.get(w.texture),kt=N||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,At.__webglTexture,H||0,kt)}b=-1},this.readRenderTargetPixels=function(w,N,H,G,F,at,_t){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(Et=Et[_t]),Et){ut.bindFramebuffer(R.FRAMEBUFFER,Et);try{const At=w.texture,kt=At.format,Vt=At.type;if(!yt.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-G&&H>=0&&H<=w.height-F&&R.readPixels(N,H,G,F,Wt.convert(kt),Wt.convert(Vt),at)}finally{const At=P!==null?vt.get(P).__webglFramebuffer:null;ut.bindFramebuffer(R.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(w,N,H,G,F,at,_t){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(Et=Et[_t]),Et){const At=w.texture,kt=At.format,Vt=At.type;if(!yt.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=w.width-G&&H>=0&&H<=w.height-F){ut.bindFramebuffer(R.FRAMEBUFFER,Et);const Ct=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ct),R.bufferData(R.PIXEL_PACK_BUFFER,at.byteLength,R.STREAM_READ),R.readPixels(N,H,G,F,Wt.convert(kt),Wt.convert(Vt),0);const jt=P!==null?vt.get(P).__webglFramebuffer:null;ut.bindFramebuffer(R.FRAMEBUFFER,jt);const ce=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await xh(R,ce,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ct),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,at),R.deleteBuffer(Ct),R.deleteSync(ce),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,N=null,H=0){w.isTexture!==!0&&(Vi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,w=arguments[1]);const G=Math.pow(2,-H),F=Math.floor(w.image.width*G),at=Math.floor(w.image.height*G),_t=N!==null?N.x:0,Et=N!==null?N.y:0;T.setTexture2D(w,0),R.copyTexSubImage2D(R.TEXTURE_2D,H,0,0,_t,Et,F,at),ut.unbindTexture()},this.copyTextureToTexture=function(w,N,H=null,G=null,F=0){w.isTexture!==!0&&(Vi("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1],N=arguments[2],F=arguments[3]||0,H=null);let at,_t,Et,At,kt,Vt,Ct,jt,ce;const le=w.isCompressedTexture?w.mipmaps[F]:w.image;H!==null?(at=H.max.x-H.min.x,_t=H.max.y-H.min.y,Et=H.isBox3?H.max.z-H.min.z:1,At=H.min.x,kt=H.min.y,Vt=H.isBox3?H.min.z:0):(at=le.width,_t=le.height,Et=le.depth||1,At=0,kt=0,Vt=0),G!==null?(Ct=G.x,jt=G.y,ce=G.z):(Ct=0,jt=0,ce=0);const De=Wt.convert(N.format),ee=Wt.convert(N.type);let Pt;N.isData3DTexture?(T.setTexture3D(N,0),Pt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Pt=R.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Pt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const rn=R.getParameter(R.UNPACK_ROW_LENGTH),ne=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ye=R.getParameter(R.UNPACK_SKIP_PIXELS),$n=R.getParameter(R.UNPACK_SKIP_ROWS),Ne=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,le.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,le.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,At),R.pixelStorei(R.UNPACK_SKIP_ROWS,kt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Vt);const Li=w.isDataArrayTexture||w.isData3DTexture,he=N.isDataArrayTexture||N.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const je=vt.get(w),Ii=vt.get(N),ke=vt.get(je.__renderTarget),xn=vt.get(Ii.__renderTarget);ut.bindFramebuffer(R.READ_FRAMEBUFFER,ke.__webglFramebuffer),ut.bindFramebuffer(R.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let vn=0;vn<Et;vn++)Li&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,F,Vt+vn),w.isDepthTexture?(he&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,vt.get(N).__webglTexture,F,ce+vn),R.blitFramebuffer(At,kt,at,_t,Ct,jt,at,_t,R.DEPTH_BUFFER_BIT,R.NEAREST)):he?R.copyTexSubImage3D(Pt,F,Ct,jt,ce+vn,At,kt,at,_t):R.copyTexSubImage2D(Pt,F,Ct,jt,ce+vn,At,kt,at,_t);ut.bindFramebuffer(R.READ_FRAMEBUFFER,null),ut.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else he?w.isDataTexture||w.isData3DTexture?R.texSubImage3D(Pt,F,Ct,jt,ce,at,_t,Et,De,ee,le.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Pt,F,Ct,jt,ce,at,_t,Et,De,le.data):R.texSubImage3D(Pt,F,Ct,jt,ce,at,_t,Et,De,ee,le):w.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,F,Ct,jt,at,_t,De,ee,le.data):w.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,F,Ct,jt,le.width,le.height,De,le.data):R.texSubImage2D(R.TEXTURE_2D,F,Ct,jt,at,_t,De,ee,le);R.pixelStorei(R.UNPACK_ROW_LENGTH,rn),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ne),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ye),R.pixelStorei(R.UNPACK_SKIP_ROWS,$n),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ne),F===0&&N.generateMipmaps&&R.generateMipmap(Pt),ut.unbindTexture()},this.copyTextureToTexture3D=function(w,N,H=null,G=null,F=0){return w.isTexture!==!0&&(Vi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,w=arguments[2],N=arguments[3],F=arguments[4]||0),Vi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,N,H,G,F)},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),ut.unbindTexture()},this.resetState=function(){A=0,E=0,P=null,ut.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}class Fo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ot(t),this.density=e}clone(){return new Fo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Dm extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class jc extends Te{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Pe,h=Pe,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qa extends Je{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const hi=new se,tc=new se,As=[],ec=new Zn,Lm=new se,Bi=new I,zi=new Ri;class yo extends I{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Lm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hi),ec.copy(t.boundingBox).applyMatrix4(hi),this.boundingBox.union(ec)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hi),zi.copy(t.boundingSphere).applyMatrix4(hi),this.boundingSphere.union(zi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Bi.geometry=this.geometry,Bi.material=this.material,Bi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zi.copy(this.boundingSphere),zi.applyMatrix4(n),t.ray.intersectsSphere(zi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,hi),tc.multiplyMatrices(n,hi),Bi.matrixWorld=tc,Bi.raycast(t,As);for(let o=0,a=As.length;o<a;o++){const c=As[o];c.instanceId=r,c.object=this,e.push(c)}As.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new jc(new Float32Array(s*this.count),s,this.count,Po,en));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Oo extends Pi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Vs=new C,Gs=new C,nc=new se,ki=new Oc,Cs=new Ri,Ar=new C,ic=new C;class Qc extends me{constructor(t=new Me,e=new Oo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Vs.fromBufferAttribute(e,s-1),Gs.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Vs.distanceTo(Gs);t.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(s),Cs.radius+=r,t.ray.intersectsSphere(Cs)===!1)return;nc.copy(s).invert(),ki.copy(t.ray).applyMatrix4(nc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),v=Rs(this,t,ki,c,p,M);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=Rs(this,t,ki,c,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=Rs(this,t,ki,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Rs(this,t,ki,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Rs(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(Vs.fromBufferAttribute(o,s),Gs.fromBufferAttribute(o,r),e.distanceSqToSegment(Vs,Gs,Ar,ic)>n)return;Ar.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ar);if(!(c<t.near||c>t.far))return{distance:c,point:ic.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Im extends Te{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ct:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,s=[],r=[],o=[],a=new C,c=new se;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ve(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ve(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Bo extends nn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ct){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Um extends Bo{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function zo(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Ps=new C,Cr=new zo,Rr=new zo,Pr=new zo;class Nm extends nn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Ps.subVectors(s[0],s[1]).add(s[0]),l=Ps);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ps.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ps),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Cr.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Rr.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),Pr.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Cr.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Rr.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Pr.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Cr.calc(c),Rr.calc(c),Pr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function sc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Fm(i,t){const e=1-i;return e*e*t}function Om(i,t){return 2*(1-i)*i*t}function Bm(i,t){return i*i*t}function Yi(i,t,e,n){return Fm(i,t)+Om(i,e)+Bm(i,n)}function zm(i,t){const e=1-i;return e*e*e*t}function km(i,t){const e=1-i;return 3*e*e*i*t}function Hm(i,t){return 3*(1-i)*i*i*t}function Vm(i,t){return i*i*i*t}function qi(i,t,e,n,s){return zm(i,t)+km(i,e)+Hm(i,n)+Vm(i,s)}class tl extends nn{constructor(t=new ct,e=new ct,n=new ct,s=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ct){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(qi(t,s.x,r.x,o.x,a.x),qi(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gm extends nn{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(qi(t,s.x,r.x,o.x,a.x),qi(t,s.y,r.y,o.y,a.y),qi(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class el extends nn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wm extends nn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nl extends nn{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Yi(t,s.x,r.x,o.x),Yi(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xm extends nn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Yi(t,s.x,r.x,o.x),Yi(t,s.y,r.y,o.y),Yi(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class il extends nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(sc(a,c.x,l.x,h.x,u.x),sc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ct().fromArray(s))}return this}}var So=Object.freeze({__proto__:null,ArcCurve:Um,CatmullRomCurve3:Nm,CubicBezierCurve:tl,CubicBezierCurve3:Gm,EllipseCurve:Bo,LineCurve:el,LineCurve3:Wm,QuadraticBezierCurve:nl,QuadraticBezierCurve3:Xm,SplineCurve:il});class Ym extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new So[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new So[s.type]().fromJSON(s))}return this}}class wo extends Ym{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new el(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new nl(this.currentPoint.clone(),new ct(t,e),new ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new tl(this.currentPoint.clone(),new ct(t,e),new ct(n,s),new ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new il(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Bo(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ko extends Me{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ve(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new C,f=new ct,d=new C,g=new C,_=new C;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=e;M++){const v=n+M*h*s,x=Math.sin(v),L=Math.cos(v);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*x,u.y=t[A].y,u.z=t[A].x*L,o.push(u.x,u.y,u.z),f.x=M/e,f.y=A/(t.length-1),a.push(f.x,f.y);const E=c[3*A+0]*x,P=c[3*A+1],b=c[3*A+0]*L;l.push(E,P,b)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){const x=v+M*t.length,L=x,A=x+t.length,E=x+t.length+1,P=x+1;r.push(L,A,P),r.push(E,P,A)}this.setIndex(r),this.setAttribute("position",new Qt(o,3)),this.setAttribute("uv",new Qt(a,2)),this.setAttribute("normal",new Qt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ko(t.points,t.segments,t.phiStart,t.phiLength)}}class Ho extends ko{constructor(t=1,e=1,n=4,s=8){const r=new wo;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Ho(t.radius,t.length,t.capSegments,t.radialSegments)}}class Zs extends Me{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new C,h=new ct;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Qt(o,3)),this.setAttribute("normal",new Qt(a,3)),this.setAttribute("uv",new Qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Yt extends Me{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Qt(u,3)),this.setAttribute("normal",new Qt(f,3)),this.setAttribute("uv",new Qt(d,2));function M(){const x=new C,L=new C;let A=0;const E=(e-t)/n;for(let P=0;P<=r;P++){const b=[],S=P/r,D=S*(e-t)+t;for(let k=0;k<=s;k++){const B=k/s,Y=B*c+a,Z=Math.sin(Y),X=Math.cos(Y);L.x=D*Z,L.y=-S*n+m,L.z=D*X,u.push(L.x,L.y,L.z),x.set(Z,E,X).normalize(),f.push(x.x,x.y,x.z),d.push(B,1-S),b.push(g++)}_.push(b)}for(let P=0;P<s;P++)for(let b=0;b<r;b++){const S=_[b][P],D=_[b+1][P],k=_[b+1][P+1],B=_[b][P+1];(t>0||b!==0)&&(h.push(S,D,B),A+=3),(e>0||b!==r-1)&&(h.push(D,k,B),A+=3)}l.addGroup(p,A,0),p+=A}function v(x){const L=g,A=new ct,E=new C;let P=0;const b=x===!0?t:e,S=x===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;const D=g;for(let k=0;k<=s;k++){const Y=k/s*c+a,Z=Math.cos(Y),X=Math.sin(Y);E.x=b*X,E.y=m*S,E.z=b*Z,u.push(E.x,E.y,E.z),f.push(0,S,0),A.x=Z*.5+.5,A.y=X*.5*S+.5,d.push(A.x,A.y),g++}for(let k=0;k<s;k++){const B=L+k,Y=D+k;x===!0?h.push(Y,Y+1,B):h.push(Y+1,Y,B),P+=3}l.addGroup(p,P,x===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ge extends Yt{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ge(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $s extends Me{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Qt(r,3)),this.setAttribute("normal",new Qt(r.slice(),3)),this.setAttribute("uv",new Qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const v=new C,x=new C,L=new C;for(let A=0;A<e.length;A+=3)d(e[A+0],v),d(e[A+1],x),d(e[A+2],L),c(v,x,L,M)}function c(M,v,x,L){const A=L+1,E=[];for(let P=0;P<=A;P++){E[P]=[];const b=M.clone().lerp(x,P/A),S=v.clone().lerp(x,P/A),D=A-P;for(let k=0;k<=D;k++)k===0&&P===A?E[P][k]=b:E[P][k]=b.clone().lerp(S,k/D)}for(let P=0;P<A;P++)for(let b=0;b<2*(A-P)-1;b++){const S=Math.floor(b/2);b%2===0?(f(E[P][S+1]),f(E[P+1][S]),f(E[P][S])):(f(E[P][S+1]),f(E[P+1][S+1]),f(E[P+1][S]))}}function l(M){const v=new C;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(M),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const M=new C;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];const x=m(M)/2/Math.PI+.5,L=p(M)/Math.PI+.5;o.push(x,1-L)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){const v=o[M+0],x=o[M+2],L=o[M+4],A=Math.max(v,x,L),E=Math.min(v,x,L);A>.9&&E<.1&&(v<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),L<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,v){const x=M*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){const M=new C,v=new C,x=new C,L=new C,A=new ct,E=new ct,P=new ct;for(let b=0,S=0;b<r.length;b+=9,S+=6){M.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),A.set(o[S+0],o[S+1]),E.set(o[S+2],o[S+3]),P.set(o[S+4],o[S+5]),L.copy(M).add(v).add(x).divideScalar(3);const D=m(L);_(A,S+0,M,D),_(E,S+2,v,D),_(P,S+4,x,D)}}function _(M,v,x,L){L<0&&M.x===1&&(o[v]=M.x-1),x.x===0&&x.z===0&&(o[v]=L/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.vertices,t.indices,t.radius,t.details)}}class Vo extends $s{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Vo(t.radius,t.detail)}}class sl extends wo{constructor(t){super(t),this.uuid=qn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new wo().fromJSON(s))}return this}}const qm={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=rl(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(n&&(r=jm(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return ji(r,o,e,a,c,d,0),o}};function rl(i,t,e,n,s){let r,o;if(s===l0(i,t,e,n)>0)for(r=t;r<e;r+=n)o=rc(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=rc(r,i[r],i[r+1],o);return o&&Ks(o,o.next)&&(ts(o),o=o.next),o}function Yn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ks(e,e.next)||de(e.prev,e,e.next)===0)){if(ts(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ji(i,t,e,n,s,r,o){if(!i)return;!o&&r&&i0(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?$m(i,n,s,r):Zm(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),ts(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Km(Yn(i),t,e),ji(i,t,e,n,s,r,2)):o===2&&Jm(i,t,e,n,s,r):ji(Yn(i),t,e,n,s,r,1);break}}}function Zm(i){const t=i.prev,e=i,n=i.next;if(de(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&fi(s,a,r,c,o,l,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function $m(i,t,e,n){const s=i.prev,r=i,o=i.next;if(de(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=bo(d,g,t,e,n),M=bo(_,m,t,e,n);let v=i.prevZ,x=i.nextZ;for(;v&&v.z>=p&&x&&x.z<=M;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&fi(a,h,c,u,l,f,v.x,v.y)&&de(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&fi(a,h,c,u,l,f,x.x,x.y)&&de(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&fi(a,h,c,u,l,f,v.x,v.y)&&de(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&fi(a,h,c,u,l,f,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Km(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Ks(s,r)&&ol(s,n,n.next,r)&&Qi(s,r)&&Qi(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ts(n),ts(n.next),n=i=r),n=n.next}while(n!==i);return Yn(n)}function Jm(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&o0(o,a)){let c=al(o,a);o=Yn(o,o.next),c=Yn(c,c.next),ji(o,t,e,n,s,r,0),ji(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function jm(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=rl(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(r0(l));for(s.sort(Qm),r=0;r<s.length;r++)e=t0(s[r],e);return e}function Qm(i,t){return i.x-t.x}function t0(i,t){const e=e0(i,t);if(!e)return t;const n=al(e,i);return Yn(n,n.next),Yn(e,e.next)}function e0(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&fi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Qi(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&n0(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function n0(i,t){return de(i.prev,i,t.prev)<0&&de(t.next,i,i.next)<0}function i0(i,t,e,n){let s=i;do s.z===0&&(s.z=bo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,s0(s)}function s0(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function bo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function r0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function o0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!a0(i,t)&&(Qi(i,t)&&Qi(t,i)&&c0(i,t)&&(de(i.prev,i,t.prev)||de(i,t.prev,t))||Ks(i,t)&&de(i.prev,i,i.next)>0&&de(t.prev,t,t.next)>0)}function de(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ks(i,t){return i.x===t.x&&i.y===t.y}function ol(i,t,e,n){const s=Ls(de(i,t,e)),r=Ls(de(i,t,n)),o=Ls(de(e,n,i)),a=Ls(de(e,n,t));return!!(s!==r&&o!==a||s===0&&Ds(i,e,t)||r===0&&Ds(i,n,t)||o===0&&Ds(e,i,n)||a===0&&Ds(e,t,n))}function Ds(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ls(i){return i>0?1:i<0?-1:0}function a0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ol(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Qi(i,t){return de(i.prev,i,i.next)<0?de(i,t,i.next)>=0&&de(i,i.prev,t)>=0:de(i,t,i.prev)<0||de(i,i.next,t)<0}function c0(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function al(i,t){const e=new To(i.i,i.x,i.y),n=new To(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function rc(i,t,e,n){const s=new To(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ts(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function To(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function l0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Zi{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Zi.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];oc(t),ac(n,t);let o=t.length;e.forEach(oc);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,ac(n,e[c]);const a=qm.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function oc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ac(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Go extends Me{constructor(t=new sl([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new Qt(s,3)),this.setAttribute("uv",new Qt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:h0;let v,x=!1,L,A,E,P;p&&(v=p.getSpacedPoints(h),x=!0,f=!1,L=p.computeFrenetFrames(h,!1),A=new C,E=new C,P=new C),f||(m=0,d=0,g=0,_=0);const b=a.extractPoints(l);let S=b.shape;const D=b.holes;if(!Zi.isClockWise(S)){S=S.reverse();for(let tt=0,rt=D.length;tt<rt;tt++){const R=D[tt];Zi.isClockWise(R)&&(D[tt]=R.reverse())}}const B=Zi.triangulateShape(S,D),Y=S;for(let tt=0,rt=D.length;tt<rt;tt++){const R=D[tt];S=S.concat(R)}function Z(tt,rt,R){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(rt,R)}const X=S.length,W=B.length;function O(tt,rt,R){let Rt,it,yt;const ut=tt.x-rt.x,It=tt.y-rt.y,vt=R.x-tt.x,T=R.y-tt.y,y=ut*ut+It*It,z=ut*T-It*vt;if(Math.abs(z)>Number.EPSILON){const $=Math.sqrt(y),et=Math.sqrt(vt*vt+T*T),K=rt.x-It/$,Tt=rt.y+ut/$,pt=R.x-T/et,Mt=R.y+vt/et,qt=((pt-K)*T-(Mt-Tt)*vt)/(ut*T-It*vt);Rt=K+ut*qt-tt.x,it=Tt+It*qt-tt.y;const st=Rt*Rt+it*it;if(st<=2)return new ct(Rt,it);yt=Math.sqrt(st/2)}else{let $=!1;ut>Number.EPSILON?vt>Number.EPSILON&&($=!0):ut<-Number.EPSILON?vt<-Number.EPSILON&&($=!0):Math.sign(It)===Math.sign(T)&&($=!0),$?(Rt=-It,it=ut,yt=Math.sqrt(y)):(Rt=ut,it=It,yt=Math.sqrt(y/2))}return new ct(Rt/yt,it/yt)}const nt=[];for(let tt=0,rt=Y.length,R=rt-1,Rt=tt+1;tt<rt;tt++,R++,Rt++)R===rt&&(R=0),Rt===rt&&(Rt=0),nt[tt]=O(Y[tt],Y[R],Y[Rt]);const ht=[];let ft,Lt=nt.concat();for(let tt=0,rt=D.length;tt<rt;tt++){const R=D[tt];ft=[];for(let Rt=0,it=R.length,yt=it-1,ut=Rt+1;Rt<it;Rt++,yt++,ut++)yt===it&&(yt=0),ut===it&&(ut=0),ft[Rt]=O(R[Rt],R[yt],R[ut]);ht.push(ft),Lt=Lt.concat(ft)}for(let tt=0;tt<m;tt++){const rt=tt/m,R=d*Math.cos(rt*Math.PI/2),Rt=g*Math.sin(rt*Math.PI/2)+_;for(let it=0,yt=Y.length;it<yt;it++){const ut=Z(Y[it],nt[it],Rt);lt(ut.x,ut.y,-R)}for(let it=0,yt=D.length;it<yt;it++){const ut=D[it];ft=ht[it];for(let It=0,vt=ut.length;It<vt;It++){const T=Z(ut[It],ft[It],Rt);lt(T.x,T.y,-R)}}}const te=g+_;for(let tt=0;tt<X;tt++){const rt=f?Z(S[tt],Lt[tt],te):S[tt];x?(E.copy(L.normals[0]).multiplyScalar(rt.x),A.copy(L.binormals[0]).multiplyScalar(rt.y),P.copy(v[0]).add(E).add(A),lt(P.x,P.y,P.z)):lt(rt.x,rt.y,0)}for(let tt=1;tt<=h;tt++)for(let rt=0;rt<X;rt++){const R=f?Z(S[rt],Lt[rt],te):S[rt];x?(E.copy(L.normals[tt]).multiplyScalar(R.x),A.copy(L.binormals[tt]).multiplyScalar(R.y),P.copy(v[tt]).add(E).add(A),lt(P.x,P.y,P.z)):lt(R.x,R.y,u/h*tt)}for(let tt=m-1;tt>=0;tt--){const rt=tt/m,R=d*Math.cos(rt*Math.PI/2),Rt=g*Math.sin(rt*Math.PI/2)+_;for(let it=0,yt=Y.length;it<yt;it++){const ut=Z(Y[it],nt[it],Rt);lt(ut.x,ut.y,u+R)}for(let it=0,yt=D.length;it<yt;it++){const ut=D[it];ft=ht[it];for(let It=0,vt=ut.length;It<vt;It++){const T=Z(ut[It],ft[It],Rt);x?lt(T.x,T.y+v[h-1].y,v[h-1].x+R):lt(T.x,T.y,u+R)}}}J(),ot();function J(){const tt=s.length/3;if(f){let rt=0,R=X*rt;for(let Rt=0;Rt<W;Rt++){const it=B[Rt];Dt(it[2]+R,it[1]+R,it[0]+R)}rt=h+m*2,R=X*rt;for(let Rt=0;Rt<W;Rt++){const it=B[Rt];Dt(it[0]+R,it[1]+R,it[2]+R)}}else{for(let rt=0;rt<W;rt++){const R=B[rt];Dt(R[2],R[1],R[0])}for(let rt=0;rt<W;rt++){const R=B[rt];Dt(R[0]+X*h,R[1]+X*h,R[2]+X*h)}}n.addGroup(tt,s.length/3-tt,0)}function ot(){const tt=s.length/3;let rt=0;bt(Y,rt),rt+=Y.length;for(let R=0,Rt=D.length;R<Rt;R++){const it=D[R];bt(it,rt),rt+=it.length}n.addGroup(tt,s.length/3-tt,1)}function bt(tt,rt){let R=tt.length;for(;--R>=0;){const Rt=R;let it=R-1;it<0&&(it=tt.length-1);for(let yt=0,ut=h+m*2;yt<ut;yt++){const It=X*yt,vt=X*(yt+1),T=rt+Rt+It,y=rt+it+It,z=rt+it+vt,$=rt+Rt+vt;zt(T,y,z,$)}}}function lt(tt,rt,R){c.push(tt),c.push(rt),c.push(R)}function Dt(tt,rt,R){Ft(tt),Ft(rt),Ft(R);const Rt=s.length/3,it=M.generateTopUV(n,s,Rt-3,Rt-2,Rt-1);Kt(it[0]),Kt(it[1]),Kt(it[2])}function zt(tt,rt,R,Rt){Ft(tt),Ft(rt),Ft(Rt),Ft(rt),Ft(R),Ft(Rt);const it=s.length/3,yt=M.generateSideWallUV(n,s,it-6,it-3,it-2,it-1);Kt(yt[0]),Kt(yt[1]),Kt(yt[3]),Kt(yt[1]),Kt(yt[2]),Kt(yt[3])}function Ft(tt){s.push(c[tt*3+0]),s.push(c[tt*3+1]),s.push(c[tt*3+2])}function Kt(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return u0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new So[s.type]().fromJSON(s)),new Go(n,t.options)}}const h0={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ct(r,o),new ct(a,c),new ct(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ct(o,1-c),new ct(l,1-u),new ct(f,1-g),new ct(_,1-p)]:[new ct(a,1-c),new ct(h,1-u),new ct(d,1-g),new ct(m,1-p)]}};function u0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Js extends $s{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Js(t.radius,t.detail)}}class Wo extends Me{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new C,g=new ct;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,v=M,x=M+n+1,L=M+n+2,A=M+1;a.push(v,x,A),a.push(x,L,A)}}this.setIndex(a),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(l,3)),this.setAttribute("uv",new Qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ue extends Me{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new C,f=new C,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],v=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){const A=L/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(A+x,1-v),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const v=h[p][M+1],x=h[p][M],L=h[p+1][M],A=h[p+1][M+1];(p!==0||o>0)&&d.push(v,x,A),(p!==n-1||c<Math.PI)&&d.push(x,L,A)}this.setIndex(d),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ue(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class is extends Me{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new C,u=new C,f=new C;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const _=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,M=(s+1)*d+g;o.push(_,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new Qt(a,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new is(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class d0 extends Pi{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Ot(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Xo extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class f0 extends Xo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Dr=new se,cc=new C,lc=new C;class cl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;cc.setFromMatrixPosition(t.matrixWorld),e.position.copy(cc),lc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lc),e.updateMatrixWorld(),Dr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const hc=new se,Hi=new C,Lr=new C;class p0 extends cl{constructor(){super(new Be(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Hi),Lr.copy(n.position),Lr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Lr),n.updateMatrixWorld(),s.makeTranslation(-Hi.x,-Hi.y,-Hi.z),hc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hc)}}class xi extends Xo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new p0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class m0 extends cl{constructor(){super(new Yc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class g0 extends Xo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new m0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=uc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=uc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function uc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eo);const En=[{hour:0,skyTop:988720,skyMid:1845325,skyHorizon:2898014,sunColor:10139903,sunIntensity:.25,hemiSky:3886466,hemiGround:1908779,hemiIntensity:.55,fogColor:1910854,nightFactor:1},{hour:5.5,skyTop:3097464,skyMid:8813224,skyHorizon:16037540,sunColor:16762525,sunIntensity:.72,hemiSky:12297416,hemiGround:6050640,hemiIntensity:.75,fogColor:14661560,nightFactor:.45},{hour:8,skyTop:4953051,skyMid:9160178,skyHorizon:14675964,sunColor:16774622,sunIntensity:1.55,hemiSky:11919100,hemiGround:8817780,hemiIntensity:.92,fogColor:13953784,nightFactor:0},{hour:13,skyTop:4032728,skyMid:8503540,skyHorizon:14610943,sunColor:16776176,sunIntensity:1.7,hemiSky:12772863,hemiGround:9147769,hemiIntensity:.96,fogColor:14085370,nightFactor:0},{hour:16.5,skyTop:5341886,skyMid:10926555,skyHorizon:16638654,sunColor:16766360,sunIntensity:1.45,hemiSky:15127484,hemiGround:8681060,hemiIntensity:.88,fogColor:15915458,nightFactor:.08},{hour:18.2,skyTop:3885184,skyMid:13203078,skyHorizon:16757627,sunColor:16749148,sunIntensity:1.15,hemiSky:15244960,hemiGround:6442318,hemiIntensity:.76,fogColor:15246742,nightFactor:.62},{hour:20,skyTop:1449794,skyMid:2897510,skyHorizon:5327992,sunColor:10796799,sunIntensity:.35,hemiSky:5004948,hemiGround:2434613,hemiIntensity:.6,fogColor:2765396,nightFactor:.95},{hour:24,skyTop:988720,skyMid:1845325,skyHorizon:2898014,sunColor:10139903,sunIntensity:.25,hemiSky:3886466,hemiGround:1908779,hemiIntensity:.55,fogColor:1910854,nightFactor:1}];class x0{constructor(){this.day=1,this.minutes=495,this.speedMultiplier=1,this.paused=!1,this.colors={skyTop:new Ot,skyMid:new Ot,skyHorizon:new Ot,sunColor:new Ot,hemiSky:new Ot,hemiGround:new Ot,fogColor:new Ot},this.sunIntensity=1.5,this.hemiIntensity=.9,this.nightFactor=0,this.sunDirection=new C(.4,.7,.3).normalize(),this._tmpA=new Ot,this._tmpB=new Ot,this._computeState()}get hour(){return this.minutes/60}toggleSpeed(){return this.speedMultiplier=this.speedMultiplier===1?3:1,this.speedMultiplier}advanceToNextMorning(){this.day+=1,this.minutes=450,this._computeState()}setHour(t){this.minutes=(t%24+24)%24*60,this._computeState()}update(t){this.paused||(this.minutes+=t*1.5*this.speedMultiplier,this.minutes>=1440&&(this.minutes-=1440,this.day+=1)),this._computeState()}getFormattedTime(){const t=Math.floor(this.minutes),e=Math.floor(t/60)%24,n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}getPeriodInfo(){const t=this.hour;return t>=5&&t<8?{label:"清晨",icon:"🌅"}:t>=8&&t<11.5?{label:"上午",icon:"☀"}:t>=11.5&&t<14?{label:"正午",icon:"☀"}:t>=14&&t<17?{label:"午后",icon:"🌤"}:t>=17&&t<19.2?{label:"黄昏",icon:"🌇"}:{label:"夜晚",icon:"🌙"}}_lerpColor(t,e,n,s){this._tmpA.setHex(e),this._tmpB.setHex(n),t.copy(this._tmpA).lerp(this._tmpB,s)}_computeState(){const t=this.hour;let e=En[0],n=En[En.length-1];for(let a=0;a<En.length-1;a++)if(t>=En[a].hour&&t<=En[a+1].hour){e=En[a],n=En[a+1];break}const s=Math.max(1e-4,n.hour-e.hour),r=Ue.smoothstep((t-e.hour)/s,0,1);if(this._lerpColor(this.colors.skyTop,e.skyTop,n.skyTop,r),this._lerpColor(this.colors.skyMid,e.skyMid,n.skyMid,r),this._lerpColor(this.colors.skyHorizon,e.skyHorizon,n.skyHorizon,r),this._lerpColor(this.colors.sunColor,e.sunColor,n.sunColor,r),this._lerpColor(this.colors.hemiSky,e.hemiSky,n.hemiSky,r),this._lerpColor(this.colors.hemiGround,e.hemiGround,n.hemiGround,r),this._lerpColor(this.colors.fogColor,e.fogColor,n.fogColor,r),this.sunIntensity=Ue.lerp(e.sunIntensity,n.sunIntensity,r),this.hemiIntensity=Ue.lerp(e.hemiIntensity,n.hemiIntensity,r),this.nightFactor=Ue.lerp(e.nightFactor,n.nightFactor,r),t>=5.5&&t<=19){const c=(t-5.5)/13.5*Math.PI;this.sunDirection.set(Math.cos(c)*.85,Math.max(.14,Math.sin(c)*.88),.42).normalize()}else this.sunDirection.set(-.35,.72,.45).normalize()}}class ye{constructor(){this.boxes=[],this.circles=[],this.cameraBoxes=[],this.bounds={minX:-54,maxX:56,minZ:-44,maxZ:34}}addCameraBox(t,e,n,s,r,o,a=null){this.cameraBoxes.push({minX:Math.min(t,s),maxX:Math.max(t,s),minY:Math.min(e,r),maxY:Math.max(e,r),minZ:Math.min(n,o),maxZ:Math.max(n,o),buildingId:a})}castCameraRay(t,e,n,s,r,o,a=null){const c=s-t,l=r-e,h=o-n;let u=1;for(const f of this.cameraBoxes){if(a&&f.buildingId===a)continue;let d=0,g=u;if(Math.abs(c)<1e-6){if(t<f.minX||t>f.maxX)continue}else{let _=(f.minX-t)/c,m=(f.maxX-t)/c;if(_>m&&([_,m]=[m,_]),d=Math.max(d,_),g=Math.min(g,m),d>g)continue}if(Math.abs(l)<1e-6){if(e<f.minY||e>f.maxY)continue}else{let _=(f.minY-e)/l,m=(f.maxY-e)/l;if(_>m&&([_,m]=[m,_]),d=Math.max(d,_),g=Math.min(g,m),d>g)continue}if(Math.abs(h)<1e-6){if(n<f.minZ||n>f.maxZ)continue}else{let _=(f.minZ-n)/h,m=(f.maxZ-n)/h;if(_>m&&([_,m]=[m,_]),d=Math.max(d,_),g=Math.min(g,m),d>g)continue}d>.02&&d<u&&(u=d)}return u}addBox(t,e,n,s,r=null){const o={id:r,minX:Math.min(t,n),maxX:Math.max(t,n),minZ:Math.min(e,s),maxZ:Math.max(e,s),active:!0};return this.boxes.push(o),o}addBoxCenter(t,e,n,s,r=null){return this.addBox(t-n/2,e-s/2,t+n/2,e+s/2,r)}addCircle(t,e,n,s=null){const r={id:s,x:t,z:e,r:n,active:!0};return this.circles.push(r),r}setActiveById(t,e){for(const n of this.boxes)n.id===t&&(n.active=e);for(const n of this.circles)n.id===t&&(n.active=e)}static getRiverCenterX(t){return 29+Math.sin(t*.045)*2.2}static getTerrainMeshHeight(t,e){let n=0;const s=ye.getRiverCenterX(e),r=Math.abs(t-s);if(r<6.8&&(r<4.5?n=-1.85:n=-1.85*(1-(r-4.5)/2.3)),t>=36.2&&e>=-18&&e<=8)if(t>=40.6&&t<=55.5&&e>=-15.5&&e<=1.2)n=Math.max(n,2);else{const h=Math.max(0,Math.min(1,(t-36.2)/5.2)),u=e>1.2?Math.max(0,1-(e-1.2)/6.5):1;n=Math.max(n,2*h*u)}const o=Math.max(0,Math.abs(t)-55),a=Math.max(0,e-35),c=Math.max(0,-37-e),l=Math.sqrt(o*o+a*a+c*c);if(l>0){const h=Math.abs(e+18)<7.5&&Math.abs(t)<108,u=Math.abs(t-s)<8.5,f=h||u?.08:1,d=1+.25*Math.sin(t*.08)*Math.cos(e*.07);n+=Math.pow(l/16,1.55)*4.5*d*f}return n}static getGroundHeight(t,e){if(e>=-.3&&e<=4.5&&t>=21.2&&t<=36.8){const n=(t-21.2)/15.599999999999998;return .18+Math.sin(n*Math.PI)*.95}if(e>=11.4&&e<=16.6&&t>=21.4&&t<=27)return-.62;if(e>=12.2&&e<=15.8&&t>=19.3&&t<21.4)return-.62*((t-19.3)/2.099999999999998);if(t>=-26.5&&t<=-10.5&&e>=-24.4&&e<=-19.9){if(t>-12.2){const n=(t- -10.5)/-1.6999999999999993;return .65*Math.min(1,Math.max(0,n))}return .65}if(t>=36.8&&t<40.6&&e>=-.8&&e<=4.2){const n=(t-36.8)/3.8000000000000043;return 2*Math.min(1,Math.max(0,n))}return ye.getTerrainMeshHeight(t,e)}resolve(t,e,n=.42,s=!1){let r=Math.max(this.bounds.minX+n,Math.min(this.bounds.maxX-n,t)),o=Math.max(this.bounds.minZ+n,Math.min(this.bounds.maxZ-n,e));const a=o>=.1&&o<=4.1&&r>=20.8&&r<=37.2,c=o>=11.7&&o<=16.3&&r>=20.5&&r<=26.6;if(!a&&!c){const l=ye.getRiverCenterX(o),h=5.3+n,u=r-l;Math.abs(u)<h&&(r=l+(u<0?-h:h))}for(let l=0;l<3;l++){for(const h of this.boxes){if(!h.active||s&&h.id==="crossing_gate")continue;const u=Math.max(h.minX,Math.min(r,h.maxX)),f=Math.max(h.minZ,Math.min(o,h.maxZ)),d=r-u,g=o-f,_=d*d+g*g;if(_<n*n)if(_>1e-5){const m=Math.sqrt(_),p=n-m;r+=d/m*p,o+=g/m*p}else{const m=Math.abs(r-h.minX),p=Math.abs(h.maxX-r),M=Math.abs(o-h.minZ),v=Math.abs(h.maxZ-o),x=Math.min(m,p,M,v);x===m?r=h.minX-n:x===p?r=h.maxX+n:x===M?o=h.minZ-n:o=h.maxZ+n}}for(const h of this.circles){if(!h.active)continue;const u=r-h.x,f=o-h.z,d=n+h.r,g=u*u+f*f;if(g<d*d&&g>1e-5){const _=Math.sqrt(g),m=d-_;r+=u/_*m,o+=f/_*m}}}return{x:r,z:o}}}class v0{constructor(t){this.canvas=t,this.keys=new Set,this.isDragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.orbitDeltaX=0,this.orbitDeltaY=0,this.zoomDelta=0,this.listeners=new Map,this._onKeyDown=e=>{if(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))return;const n=e.code;["Tab","Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(n)&&e.preventDefault(),this.keys.has(n)||(this.keys.add(n),this._emit(n))},this._onKeyUp=e=>{this.keys.delete(e.code)},this._onBlur=()=>{this.keys.clear(),this.isDragging=!1},this._onMouseDown=e=>{e.target===this.canvas&&(e.button===0||e.button===2)&&(this.isDragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY)},this._onMouseMove=e=>{this.isDragging&&(this.orbitDeltaX+=e.clientX-this.lastMouseX,this.orbitDeltaY+=e.clientY-this.lastMouseY,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY)},this._onMouseUp=()=>{this.isDragging=!1},this._onWheel=e=>{e.target===this.canvas&&(this.zoomDelta+=Math.sign(e.deltaY))},this._onContextMenu=e=>{e.target===this.canvas&&e.preventDefault()},window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp),window.addEventListener("blur",this._onBlur),window.addEventListener("mousedown",this._onMouseDown),window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("mouseup",this._onMouseUp),window.addEventListener("wheel",this._onWheel,{passive:!0}),window.addEventListener("contextmenu",this._onContextMenu)}onKeyPress(t,e){this.listeners.has(t)||this.listeners.set(t,[]),this.listeners.get(t).push(e)}_emit(t){const e=this.listeners.get(t);if(e)for(const n of e)n()}isDown(t){return this.keys.has(t)}getMoveAxes(){let t=0,e=0;return(this.isDown("KeyW")||this.isDown("ArrowUp"))&&(t+=1),(this.isDown("KeyS")||this.isDown("ArrowDown"))&&(t-=1),(this.isDown("KeyD")||this.isDown("ArrowRight"))&&(e+=1),(this.isDown("KeyA")||this.isDown("ArrowLeft"))&&(e-=1),{forward:t,right:e}}getKeyCameraTurn(){let t=0;return this.isDown("KeyQ")&&(t+=1),this.isDown("KeyR")&&(t-=1),t}consumeOrbit(){const t=this.orbitDeltaX,e=this.orbitDeltaY,n=this.zoomDelta;return this.orbitDeltaX=0,this.orbitDeltaY=0,this.zoomDelta=0,{dx:t,dy:e,zoom:n}}}class M0{constructor(){this.ctx=null,this.master=null,this.enabled=!0,this.initialized=!1,this._musicTimer=0,this._ambientTimer=2.5,this._stepCooldown=0,this._melodyIdx=0,this._scale=[523.25,587.33,659.25,783.99,880,1046.5,783.99,659.25]}init(){if(this.initialized){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume();return}try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.enabled?.42:0,this.master.connect(this.ctx.destination),this.initialized=!0}catch{this.initialized=!1}}toggle(){return this.enabled=!this.enabled,this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.enabled?.42:0,this.ctx.currentTime,.08),this.enabled}update(t,e,n){!this.initialized||!this.enabled||!this.ctx||this.ctx.state!=="running"||(this._stepCooldown>0&&(this._stepCooldown-=t),this._musicTimer-=t,this._musicTimer<=0&&(this._musicTimer=2.6+Math.random()*2.4,this._playCozyNote(e)),this._ambientTimer-=t,this._ambientTimer<=0&&(this._ambientTimer=6.5+Math.random()*7.5,e<.5?Math.random()<.55&&this._playUguisuBird():this._playEveningCricket(),n&&this._playWaterRipple()))}_playCozyNote(t){const e=this.ctx.currentTime,n=this._scale[this._melodyIdx%this._scale.length];this._melodyIdx+=Math.random()<.65?1:2;const s=t>.6?n*.5:n,r=this.ctx.createOscillator(),o=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",o.type="triangle",r.frequency.setValueAtTime(s,e),o.frequency.setValueAtTime(s*2,e),a.gain.setValueAtTime(1e-4,e),a.gain.linearRampToValueAtTime(.032,e+.04),a.gain.exponentialRampToValueAtTime(1e-4,e+2.4);const c=this.ctx.createGain();c.gain.value=.14,r.connect(a),o.connect(c),c.connect(a),a.connect(this.master),r.start(e),o.start(e),r.stop(e+2.5),o.stop(e+2.5)}_playUguisuBird(){const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(1650,t),e.frequency.linearRampToValueAtTime(1720,t+.45),e.frequency.setValueAtTime(2150,t+.52),e.frequency.linearRampToValueAtTime(2550,t+.64),e.frequency.linearRampToValueAtTime(1950,t+.8),n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(.025,t+.08),n.gain.setValueAtTime(.022,t+.44),n.gain.linearRampToValueAtTime(.001,t+.49),n.gain.linearRampToValueAtTime(.032,t+.54),n.gain.exponentialRampToValueAtTime(1e-4,t+.86),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.9)}_playEveningCricket(){const t=this.ctx.currentTime;for(let e=0;e<4;e++){const n=t+e*.13,s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(4150,n),r.gain.setValueAtTime(1e-4,n),r.gain.linearRampToValueAtTime(.015,n+.02),r.gain.exponentialRampToValueAtTime(1e-4,n+.1),s.connect(r),r.connect(this.master),s.start(n),s.stop(n+.11)}}_playWaterRipple(){const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(620+Math.random()*200,t),e.frequency.exponentialRampToValueAtTime(980,t+.12),n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(.018,t+.02),n.gain.exponentialRampToValueAtTime(1e-4,t+.16),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.18)}playFumikiriBell(t=1){if(!this.initialized||!this.enabled||!this.ctx||t<=.02)return;const e=this.ctx.currentTime,n=.15*Math.min(1,t);[705,768,1412].forEach((s,r)=>{const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type=r===2?"sine":"triangle",o.frequency.setValueAtTime(s,e),a.gain.setValueAtTime(1e-4,e),a.gain.linearRampToValueAtTime(n*(r===2?.32:.7),e+.008),a.gain.exponentialRampToValueAtTime(1e-4,e+.38),o.connect(a),a.connect(this.master),o.start(e),o.stop(e+.4)})}playTrainClack(t=1){if(!this.initialized||!this.enabled||!this.ctx||t<=.03)return;const e=this.ctx.currentTime,n=.12*Math.min(1,t);[0,.14].forEach(s=>{const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(115,e+s),r.frequency.exponentialRampToValueAtTime(48,e+s+.09),o.gain.setValueAtTime(n,e+s),o.gain.exponentialRampToValueAtTime(1e-4,e+s+.1),r.connect(o),o.connect(this.master),r.start(e+s),r.stop(e+s+.12)})}playTrainHorn(t=1){if(!this.initialized||!this.enabled||!this.ctx||t<=.04)return;const e=this.ctx.currentTime,n=.08*Math.min(1,t);[330,415.3].forEach(s=>{const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sawtooth";const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.value=900,r.frequency.setValueAtTime(s,e),o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(n,e+.08),o.gain.setValueAtTime(n*.85,e+.55),o.gain.exponentialRampToValueAtTime(1e-4,e+.95),r.connect(a),a.connect(o),o.connect(this.master),r.start(e),r.stop(e+1)})}playStationChime(t=1){if(!this.initialized||!this.enabled||!this.ctx||t<=.05)return;const e=this.ctx.currentTime,n=.07*Math.min(1,t);[659.25,783.99,1046.5,880,1046.5].forEach((s,r)=>{const o=e+r*.16,a=this.ctx.createOscillator(),c=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime(s,o),c.gain.setValueAtTime(1e-4,o),c.gain.linearRampToValueAtTime(n,o+.02),c.gain.exponentialRampToValueAtTime(1e-4,o+.5),a.connect(c),c.connect(this.master),a.start(o),a.stop(o+.55)})}playFootstep(t=!1){if(!this.initialized||!this.enabled||!this.ctx||this._stepCooldown>0)return;this._stepCooldown=.28;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="triangle",n.frequency.setValueAtTime(t?190:120+Math.random()*25,e),n.frequency.exponentialRampToValueAtTime(55,e+.055),s.gain.setValueAtTime(.032,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.06),n.connect(s),s.connect(this.master),n.start(e),n.stop(e+.065)}playDoorChime(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime;[880,1174.66].forEach((e,n)=>{const s=t+n*.11,r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(e,s),o.gain.setValueAtTime(.08,s),o.gain.exponentialRampToValueAtTime(1e-4,s+.45),r.connect(o),o.connect(this.master),r.start(s),r.stop(s+.48)})}playShrineBell(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime;[420,635,980,1340].forEach((e,n)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type=n%2===0?"triangle":"sine",s.frequency.setValueAtTime(e,t),r.gain.setValueAtTime(.09/(n+1),t),r.gain.exponentialRampToValueAtTime(1e-4,t+1.5),s.connect(r),r.connect(this.master),s.start(t),s.stop(t+1.55)})}playVendingClunk(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(1040,t),n.gain.setValueAtTime(.07,t),n.gain.exponentialRampToValueAtTime(1e-4,t+.12),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.13);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="triangle",s.frequency.setValueAtTime(160,t+.25),s.frequency.exponentialRampToValueAtTime(70,t+.36),r.gain.setValueAtTime(.11,t+.25),r.gain.exponentialRampToValueAtTime(1e-4,t+.38),s.connect(r),r.connect(this.master),s.start(t+.25),s.stop(t+.4)}playCameraShutter(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createBuffer(1,this.ctx.sampleRate*.08,this.ctx.sampleRate),n=e.getChannelData(0);for(let a=0;a<n.length;a++)n[a]=(Math.random()*2-1)*Math.exp(-a/(n.length*.22));const s=this.ctx.createBufferSource();s.buffer=e;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.value=2400;const o=this.ctx.createGain();o.gain.value=.24,s.connect(r),r.connect(o),o.connect(this.master),s.start(t)}playCatMeow(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(620,t),e.frequency.linearRampToValueAtTime(920,t+.12),e.frequency.exponentialRampToValueAtTime(540,t+.36),n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(.09,t+.05),n.gain.exponentialRampToValueAtTime(1e-4,t+.38),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.4)}playSuccessChime(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((e,n)=>{const s=t+n*.085,r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(e,s),o.gain.setValueAtTime(.075,s),o.gain.exponentialRampToValueAtTime(1e-4,s+.35),r.connect(o),o.connect(this.master),r.start(s),r.stop(s+.38)})}playSplash(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createBuffer(1,this.ctx.sampleRate*.18,this.ctx.sampleRate),n=e.getChannelData(0);for(let a=0;a<n.length;a++)n[a]=(Math.random()*2-1)*Math.exp(-a/(n.length*.35));const s=this.ctx.createBufferSource();s.buffer=e;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1600,t),r.frequency.exponentialRampToValueAtTime(420,t+.18);const o=this.ctx.createGain();o.gain.value=.2,s.connect(r),r.connect(o),o.connect(this.master),s.start(t)}playUiClick(){if(!this.initialized||!this.enabled||!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(740,t),n.gain.setValueAtTime(.045,t),n.gain.exponentialRampToValueAtTime(1e-4,t+.06),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.07)}}function ll(i){const t=new Uint8Array(i.length*4);for(let n=0;n<i.length;n++){const s=i[n];t[n*4]=s,t[n*4+1]=s,t[n*4+2]=s,t[n*4+3]=255}const e=new jc(t,i.length,1,Ve);return e.minFilter=Pe,e.magFilter=Pe,e.generateMipmaps=!1,e.needsUpdate=!0,e}const y0=ll([118,192,255]),S0=ll([102,162,214,255]),Ir=new Map;function V(i,t={}){const{gradient:e=y0,map:n=null,side:s=pn,transparent:r=!1,opacity:o=1,emissive:a=0,emissiveIntensity:c=0,cacheKey:l=null}=t;if(l&&Ir.has(l))return Ir.get(l);const h=new d0({color:i,gradientMap:e,map:n,side:s,transparent:r,opacity:o,emissive:a,emissiveIntensity:c});return l&&Ir.set(l,h),h}function We(i,t,e,n=1,s=1){const r=document.createElement("canvas");r.width=i,r.height=t;const o=r.getContext("2d");e(o,i,t);const a=new Im(r);return a.colorSpace=Le,(n!==1||s!==1)&&(a.wrapS=$i,a.wrapT=$i,a.repeat.set(n,s)),a.needsUpdate=!0,a}function Cn(i="#9a6b48",t="#7d5234",e=1,n=1){return We(256,256,(s,r,o)=>{s.fillStyle=i,s.fillRect(0,0,r,o),s.strokeStyle=t,s.lineWidth=3;for(let a=0;a<r;a+=32)s.beginPath(),s.moveTo(a,0),s.lineTo(a,o),s.stroke();s.fillStyle="rgba(255,255,255,0.05)";for(let a=0;a<16;a++)s.fillRect(a*32+4,0,8,o)},e,n)}function hl(i="#455163",t="#5e6d82",e=2,n=2){return We(256,256,(s,r,o)=>{s.fillStyle=i,s.fillRect(0,0,r,o);const a=r/8,c=o/8;for(let l=0;l<8;l++)for(let h=0;h<8;h++){const u=h*a,f=l*c;s.fillStyle=t,s.beginPath(),s.arc(u+a*.5,f+c*.72,a*.44,0,Math.PI),s.fill(),s.strokeStyle="rgba(22, 28, 38, 0.42)",s.lineWidth=2.5,s.beginPath(),s.moveTo(u,f+c),s.lineTo(u+a,f+c),s.stroke()}},e,n)}function w0(i=2,t=2){return We(256,256,(e,n,s)=>{e.fillStyle="#d3c98d",e.fillRect(0,0,n,s),e.strokeStyle="rgba(154, 142, 88, 0.25)",e.lineWidth=2;for(let r=0;r<s;r+=6)e.beginPath(),e.moveTo(0,r),e.lineTo(n,r),e.stroke();e.strokeStyle="#385840",e.lineWidth=10,e.strokeRect(5,5,n-10,s-10)},i,t)}function Ur(){return We(256,256,(i,t,e)=>{i.fillStyle="#fcf6e8",i.fillRect(0,0,t,e),i.strokeStyle="#a37b52",i.lineWidth=8,i.strokeRect(4,4,t-8,e-8),i.lineWidth=5;for(let n=64;n<t;n+=64)i.beginPath(),i.moveTo(n,0),i.lineTo(n,e),i.stroke();for(let n=64;n<e;n+=64)i.beginPath(),i.moveTo(0,n),i.lineTo(t,n),i.stroke()})}function dc(i=1,t=8){return We(256,256,(e,n,s)=>{e.fillStyle="#686d76",e.fillRect(0,0,n,s);for(let r=0;r<400;r++)e.fillStyle=r%2===0?"rgba(255,255,255,0.05)":"rgba(30,34,42,0.08)",e.fillRect(Math.random()*n,Math.random()*s,3,3);e.fillStyle="#f2f0e8",e.fillRect(14,0,10,s),e.fillRect(n-24,0,10,s)},i,t)}function b0(i=14,t=14){return We(256,256,(e,n,s)=>{e.fillStyle="#7bb868",e.fillRect(0,0,n,s);const r=["#88c472","#6fa95e","#92cb78","#74b064"];for(let o=0;o<120;o++)e.fillStyle=r[o%r.length],e.beginPath(),e.ellipse(Math.random()*n,Math.random()*s,10+Math.random()*22,6+Math.random()*14,Math.random()*Math.PI,0,Math.PI*2),e.fill();e.fillStyle="#f9c7d5";for(let o=0;o<26;o++)e.beginPath(),e.ellipse(Math.random()*n,Math.random()*s,3,1.8,Math.random()*3,0,Math.PI*2),e.fill()},i,t)}function ul(i=2,t=6){return We(256,256,(e,n,s)=>{e.fillStyle="#b9b4a8",e.fillRect(0,0,n,s),e.strokeStyle="#928c80",e.lineWidth=4;for(let r=0;r<4;r++){const o=r*64,a=r%2*32;for(let c=-1;c<5;c++){const l=c*64+a;e.fillStyle=(r+c)%2===0?"#cbc5b8":"#bfb9ac",e.fillRect(l+3,o+3,58,58),e.strokeRect(l+2,o+2,60,60)}}},i,t)}function pi(i,t="",e="#fff7ea",n="#3b2c27",s="#d46a84"){return We(512,256,(r,o,a)=>{r.fillStyle=e,r.fillRect(0,0,o,a),r.strokeStyle=s,r.lineWidth=14,r.strokeRect(12,12,o-24,a-24),r.fillStyle=n,r.textAlign="center",r.textBaseline="middle",r.font='bold 68px "PingFang SC", "Microsoft YaHei", sans-serif',r.fillText(i,o/2,t?a*.42:a*.5),t&&(r.fillStyle=s,r.font='bold 30px "PingFang SC", "Microsoft YaHei", sans-serif',r.fillText(t,o/2,a*.75))})}function fc(i,t="#2e5478",e="#fffaf0"){return We(256,128,(n,s,r)=>{n.fillStyle=t,n.fillRect(0,0,s,r),n.fillStyle="rgba(0,0,0,0.22)",n.fillRect(s/3-2,r*.25,4,r*.75),n.fillRect(s*2/3-2,r*.25,4,r*.75),n.fillStyle=e,n.textAlign="center",n.textBaseline="middle",n.font='bold 46px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(i,s/2,r*.52)})}function T0(){return We(256,512,(i,t,e)=>{i.fillStyle="#e7535b",i.fillRect(0,0,t,e),i.fillStyle="#eef7ff",i.fillRect(18,24,t-36,250);const n=["#f49ab0","#5db6e8","#7ac97e","#f5c252","#8c5a3c","#ff7b54"];for(let s=0;s<3;s++){const r=44+s*78;i.fillStyle="#d3e4f0",i.fillRect(22,r+48,t-44,10);for(let o=0;o<5;o++)i.fillStyle=n[(s*5+o)%n.length],i.fillRect(32+o*40,r+8,26,40),i.fillStyle=o%2===0?"#3e92cc":"#e65c5c",i.fillRect(34+o*40,r+58,22,10)}i.fillStyle="#2d3138",i.fillRect(28,360,t-56,86),i.fillStyle="#f2f2f2",i.fillRect(174,290,56,52)})}function E0(){return We(256,64,(i,t,e)=>{i.fillStyle="#f8d247",i.fillRect(0,0,t,e),i.fillStyle="#242529";for(let n=-64;n<t+64;n+=48)i.beginPath(),i.moveTo(n,0),i.lineTo(n+24,0),i.lineTo(n+4,e),i.lineTo(n-20,e),i.closePath(),i.fill()},4,1)}function A0(){return We(256,256,(i,t,e)=>{i.fillStyle="#5eb6d9",i.fillRect(0,0,t,e),i.strokeStyle="rgba(255, 255, 255, 0.42)",i.lineWidth=4;for(let n=0;n<24;n++){const s=Math.random()*t,r=Math.random()*e;i.beginPath(),i.moveTo(s,r),i.quadraticCurveTo(s+14,r+10,s+28,r),i.stroke()}i.fillStyle="rgba(255, 255, 255, 0.25)";for(let n=0;n<18;n++)i.beginPath(),i.ellipse(Math.random()*t,Math.random()*e,14,3,0,0,Math.PI*2),i.fill()},2,10)}const $t={bark:V(7031869,{cacheKey:"bark"}),sakuraLight:V(16503519,{cacheKey:"sakuraLight"}),sakuraMid:V(16035011,{cacheKey:"sakuraMid"}),sakuraDeep:V(15240361,{cacheKey:"sakuraDeep"}),cedarDark:V(3828301,{cacheKey:"cedarDark"}),cedarMid:V(4948060,{cacheKey:"cedarMid"}),woodWarm:V(10776391,{cacheKey:"woodWarm"}),woodDark:V(6702382,{cacheKey:"woodDark"}),metalDark:V(3817287,{cacheKey:"metalDark"}),concrete:V(12499890,{cacheKey:"concrete"}),stone:V(10131600,{cacheKey:"stone"}),postRed:V(14170934,{cacheKey:"postRed"}),white:V(16184300,{cacheKey:"white"}),orange:V(15631666,{cacheKey:"orange"})};function vi(i=1,t=1){const e=new Nt,n=i,s=new I(new Yt(.22*n,.36*n,2.7*n,7),$t.bark);s.position.y=1.15*n,s.rotation.z=Math.sin(t*3.1)*.08,s.castShadow=!0,s.receiveShadow=!0,e.add(s);for(let c=0;c<2;c++){const l=new I(new Yt(.11*n,.18*n,1.5*n,6),$t.bark),h=c===0?1:-1;l.position.set(h*.55*n,2.35*n,(c-.5)*.35*n),l.rotation.z=-h*.55,l.castShadow=!0,e.add(l)}const r=[$t.sakuraLight,$t.sakuraMid,$t.sakuraDeep],o=[[0,3.35,0,1.65,0],[-1.15,2.95,.45,1.25,1],[1.18,3.05,-.35,1.28,1],[.35,2.85,1.05,1.15,2],[-.5,3.1,-.95,1.12,0],[.7,3.7,.35,1.05,0],[-.75,3.55,-.2,1,2]],a=new Js(1,1);return o.forEach(([c,l,h,u,f],d)=>{const g=new I(a,r[(f+Math.floor(t))%3]);g.position.set(c*n,l*n,h*n),g.scale.set(u*n*1.12,u*n*.82,u*n*1.08),g.rotation.y=(t+d)*.7,g.castShadow=!0,g.receiveShadow=!0,e.add(g)}),e}function C0(i=1){const t=new Nt,e=new I(new Yt(.18*i,.3*i,2.6*i,6),$t.bark);e.position.y=.9*i,e.castShadow=!0,t.add(e);const n=[{y:2.4,r:1.5,h:2.3,mat:$t.cedarDark},{y:3.7,r:1.22,h:2.1,mat:$t.cedarMid},{y:4.9,r:.88,h:1.8,mat:$t.cedarDark}];for(const s of n){const r=new I(new Ge(s.r*i,s.h*i,7),s.mat);r.position.y=s.y*i,r.castShadow=!0,r.receiveShadow=!0,t.add(r)}return t}function Mi(){const i=new Nt,t=new I(new j(1.9,.12,.56),$t.woodWarm);t.position.y=.48,t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new I(new j(1.9,.42,.1),$t.woodWarm);e.position.set(0,.82,-.25),e.rotation.x=-.14,e.castShadow=!0,i.add(e);for(const n of[-.76,.76]){const s=new I(new j(.1,.48,.5),$t.metalDark);s.position.set(n,.24,0),s.castShadow=!0,i.add(s)}return i}function pc(i=!1){const t=new Nt,e=new I(new Yt(.11,.15,7.6,8),$t.concrete);e.position.y=3.8,e.castShadow=!0,t.add(e);for(const n of[6.4,7.15]){const s=new I(new j(1.5,.08,.08),$t.metalDark);s.position.y=n,t.add(s);for(const r of[-.62,.62]){const o=new I(new Yt(.05,.06,.14,6),$t.white);o.position.set(r,n+.09,0),t.add(o)}}if(i){const n=new I(new Yt(.24,.24,.68,8),$t.concrete);n.position.set(.32,5.5,0),t.add(n)}return t}function mc(i){const t=new Nt,e=new Oo({color:2500914,transparent:!0,opacity:.72});for(let n=0;n<i.length-1;n++){const s=i[n],r=i[n+1];for(const o of[-.55,.55]){const a=[];for(let c=0;c<=10;c++){const l=c/10;a.push(new C(Ue.lerp(s.x,r.x,l),Ue.lerp(s.y,r.y,l)+7.1-Math.sin(l*Math.PI)*.42,Ue.lerp(s.z,r.z,l)+o*.25))}t.add(new Qc(new Me().setFromPoints(a),e))}}return t}function R0(){const i=new Nt,t=V(15094619),e=V(16777215,{map:T0(),emissive:16770262,emissiveIntensity:.22}),n=new I(new j(1.15,2.05,.78),[t,t,t,t,e,t]);n.position.y=1.025,n.castShadow=!0,n.receiveShadow=!0,i.add(n);const s=new I(new j(.45,.72,.48),V(6131384));return s.position.set(.88,.36,.05),s.castShadow=!0,i.add(s),i}function P0(){const i=new Nt,t=new I(new Yt(.24,.26,.72,10),$t.postRed);t.position.y=.36,t.castShadow=!0,i.add(t);const e=new I(new j(.5,.65,.42),$t.postRed);e.position.y=1.02,e.castShadow=!0,i.add(e);const n=new I(new j(.56,.1,.48),$t.postRed);n.position.y=1.38,i.add(n);const s=new I(new j(.32,.06,.04),$t.metalDark);return s.position.set(0,1.15,.21),i.add(s),i}function D0(){const i=new Nt,t=new I(new Yt(.06,.09,3.8,7),$t.metalDark);t.position.y=1.9,t.castShadow=!0,i.add(t);const e=new I(new j(.65,.07,.07),$t.metalDark);e.position.set(.28,3.72,0),i.add(e);const n=new I(new Ge(.26,.18,8),$t.metalDark);n.position.set(.54,3.62,0),i.add(n);const s=new I(new ue(.14,8,8),new Ie({color:16771509}));s.position.set(.54,3.48,0),i.add(s);const r=new xi(16763776,0,11,1.6);return r.position.set(.54,3.25,0),i.add(r),i.userData.lampLight=r,i}function L0(){const i=new Nt,t=new I(new Yt(.26,.34,.25,6),$t.stone);t.position.y=.125,i.add(t);const e=new I(new Yt(.14,.17,.95,6),$t.stone);e.position.y=.72,e.castShadow=!0,i.add(e);const n=V(16773583,{emissive:16757575,emissiveIntensity:.2}),s=new I(new j(.36,.38,.36),n);s.position.y=1.38,i.add(s);const r=new I(new Ge(.45,.28,6),$t.stone);r.position.y=1.7,r.castShadow=!0,i.add(r);const o=new xi(16758886,0,8,1.7);return o.position.set(0,1.38,0),i.add(o),i.userData.lampLight=o,i.userData.glowMaterial=n,i}function I0(){const i=new Nt,t=new I(new Yt(.05,.06,3,6),$t.orange);t.position.y=1.5,t.castShadow=!0,i.add(t);const e=new I(new Yt(.34,.34,.08,14),$t.orange);e.rotation.x=Math.PI/2,e.position.set(0,2.85,.08),i.add(e);const n=new I(new ue(.29,12,8,0,Math.PI*2,0,Math.PI*.35),V(13165813,{gradient:S0}));return n.rotation.x=Math.PI/2,n.position.set(0,2.85,.04),i.add(n),i}function U0(){const i=new Nt;for(const n of[-.95,.95]){const s=new I(new j(.12,2.1,.12),$t.woodDark);s.position.set(n,1.05,0),s.castShadow=!0,i.add(s)}const t=new I(new j(1.9,1.15,.1),V(16777215,{map:pi("町内掲示板","樱花季 · 邻里留言","#efe3cc","#46342a","#7c5c44")}));t.position.set(0,1.45,0),t.castShadow=!0,i.add(t);const e=new I(new j(2.25,.1,.56),$t.woodDark);return e.position.set(0,2.15,0),e.rotation.x=.12,e.castShadow=!0,i.add(e),i}function N0(i=15232892){const t=new Nt,e=V(i),n=new is(.32,.045,6,14);for(const c of[-.52,.52]){const l=new I(n,$t.metalDark);l.position.set(c,.34,0),l.castShadow=!0,t.add(l)}const s=new I(new j(.95,.06,.06),e);s.position.set(0,.58,0),s.rotation.z=-.18,t.add(s);const r=new I(new Yt(.03,.03,.65,6),$t.metalDark);r.position.set(.42,.72,0),r.rotation.z=.22,t.add(r);const o=new I(new Yt(.025,.025,.48,6),$t.metalDark);o.rotation.x=Math.PI/2,o.position.set(.36,1.02,0),t.add(o);const a=new I(new j(.28,.22,.32),$t.woodWarm);return a.position.set(.56,.86,0),t.add(a),t}class F0{constructor(t,e){this.scene=t,this.collision=e,this.waterTexture=null,this.waterMesh=null,this.benches=[]}build(){this._buildBasinTerrain(),this._buildSurroundingMountainsAndForest(),this._buildRiverAndEmbankments(),this._buildRedBridge(),this._buildFishingPier(),this._buildRoadsAndPaths(),this._buildNorthernFields()}_buildBasinTerrain(){const t=new Ce(230,220,115,110);t.rotateX(-Math.PI/2);const e=t.attributes.position;for(let s=0;s<e.count;s++){const r=e.getX(s),o=e.getZ(s);e.setY(s,ye.getTerrainMeshHeight(r,o))}t.computeVertexNormals();const n=new I(t,V(16777215,{map:b0(22,22)}));n.receiveShadow=!0,this.scene.add(n)}_buildSurroundingMountainsAndForest(){const t=V(5606500),e=V(6526091),n=V(8562626),s=new Nt;[{count:18,radius:108,minH:22,maxH:38,minR:26,maxR:40,mat:t},{count:22,radius:158,minH:36,maxH:64,minR:38,maxR:58,mat:e},{count:24,radius:215,minH:52,maxH:92,minR:52,maxR:78,mat:n}].forEach((c,l)=>{for(let h=0;h<c.count;h++){const u=h/c.count*Math.PI*2+l*.35,f=c.radius+Math.sin(h*4.7+l)*12,d=Math.cos(u)*f,g=Math.sin(u)*f-6,_=c.minH+(Math.sin(h*2.9+l*5)+1)*.5*(c.maxH-c.minH),m=c.minR+(Math.cos(h*3.3+l)+1)*.5*(c.maxR-c.minR),p=new I(new Ge(m,_,7),c.mat);p.position.set(d,_*.42-3,g),p.rotation.y=h*.9,s.add(p)}}),this.scene.add(s);const o=[];for(let c=0;c<64;c++){const l=c/64*Math.PI*2,h=59+c%3*7+Math.sin(c*2.3)*3,u=46+c%4*6+Math.cos(c*1.9)*3,f=Math.cos(l)*h,d=Math.sin(l)*u-6;Math.abs(d+18)<6.5||Math.abs(f-ye.getRiverCenterX(d))<8.5||o.push({x:f,z:d,isSakura:c%5===0,scale:1.05+c%4*.2})}const a=[{x:52,z:-26,isSakura:!0,scale:1.25},{x:48,z:-30,isSakura:!1,scale:1.3},{x:54,z:-5,isSakura:!1,scale:1.35},{x:53,z:7,isSakura:!0,scale:1.2},{x:44,z:16,isSakura:!1,scale:1.2},{x:-45,z:-28,isSakura:!0,scale:1.25},{x:-42,z:-34,isSakura:!1,scale:1.3},{x:-46,z:14,isSakura:!0,scale:1.2},{x:-38,z:24,isSakura:!1,scale:1.25},{x:8,z:28,isSakura:!0,scale:1.18},{x:16,z:26,isSakura:!1,scale:1.22}];[...o,...a].forEach((c,l)=>{const h=c.isSakura?vi(c.scale,l+1):C0(c.scale),u=ye.getTerrainMeshHeight(c.x,c.z);h.position.set(c.x,u-.15,c.z),h.rotation.y=l*1.1,this.scene.add(h)})}_buildRiverAndEmbankments(){const t=new Ce(10.6,210,4,80);t.rotateX(-Math.PI/2);const e=t.attributes.position;for(let r=0;r<e.count;r++)e.setX(r,e.getX(r)+ye.getRiverCenterX(e.getZ(r)));t.computeVertexNormals(),this.waterTexture=A0(),this.waterMesh=new I(t,V(16777215,{map:this.waterTexture,transparent:!0,opacity:.88})),this.waterMesh.position.y=-1.12,this.waterMesh.receiveShadow=!0,this.scene.add(this.waterMesh),[-30,-8,10,21].forEach((r,o)=>{const a=ye.getRiverCenterX(r),c=a-7.6,l=vi(1.08,o*2+3);if(l.position.set(c,0,r),this.scene.add(l),this.collision.addCircle(c,r,.55),r!==-8){const h=a+7.8,u=vi(1.04,o*2+7);u.position.set(h,ye.getTerrainMeshHeight(h,r),r),this.scene.add(u),this.collision.addCircle(h,r,.55)}});const n=Mi();n.position.set(21.4,0,-4.5),n.rotation.y=Math.PI/2,this.scene.add(n),this.collision.addBoxCenter(21.4,-4.5,.8,2),this.benches.push({id:"bench_river_north",label:"坐在樱川河畔长椅上",x:21.4,y:0,z:-4.5,sitPos:new C(21.55,.45,-4.5),facingYaw:Math.PI/2});const s=Mi();s.position.set(21.4,0,8.2),s.rotation.y=Math.PI/2,this.scene.add(s),this.collision.addBoxCenter(21.4,8.2,.8,2),this.benches.push({id:"bench_river_south",label:"坐在樱花树下看河水",x:21.4,y:0,z:8.2,sitPos:new C(21.55,.45,8.2),facingYaw:Math.PI/2})}_buildRedBridge(){const t=new Nt,e=V(16777215,{map:Cn("#b07d52","#8e613c",3,1)}),n=V(13912379),s=V(15910482),r=16,o=21.2,c=36.8-o,l=2.1,h=4.2;for(let u=0;u<r;u++){const f=u/r,d=(u+1)/r,g=(f+d)*.5,_=o+g*c,m=.18+Math.sin(f*Math.PI)*.95,p=.18+Math.sin(d*Math.PI)*.95,M=(m+p)*.5,v=c/r,x=Math.atan2(p-m,v),L=new I(new j(v+.08,.24,h),e);L.position.set(_,M-.12,l),L.rotation.z=x,L.castShadow=!0,L.receiveShadow=!0,t.add(L);for(const A of[-1,1]){const E=l+A*(h*.5-.12),P=new I(new j(v+.06,.1,.12),n);P.position.set(_,M+.92,E),P.rotation.z=x,P.castShadow=!0,t.add(P);const b=new I(new j(v+.06,.07,.09),n);b.position.set(_,M+.48,E),b.rotation.z=x,t.add(b)}}for(const u of[0,.25,.5,.75,1]){const f=o+u*c,d=.18+Math.sin(u*Math.PI)*.95;for(const g of[-1,1]){const _=l+g*(h*.5-.12),m=new I(new j(.2,1.15,.2),n);m.position.set(f,d+.55,_),m.castShadow=!0,t.add(m);const p=new I(new ue(.13,8,8),s);p.position.set(f,d+1.18,_),t.add(p)}}this.collision.addBox(21.4,-.35,36.6,.12),this.collision.addBox(21.4,4.08,36.6,4.55),this.scene.add(t)}_buildFishingPier(){const t=new Nt,e=V(16777215,{map:Cn("#9c6e46","#7a5232",2,2)}),n=V(6505260),s=new I(new j(5.5,.22,4.8),e);s.position.set(24.15,-.73,14),s.castShadow=!0,s.receiveShadow=!0,t.add(s);for(const o of[22,24.2,26.5])for(const a of[12,16]){const c=new I(new Yt(.14,.16,1.7,7),n);c.position.set(o,-1.25,a),c.castShadow=!0,t.add(c)}for(let o=0;o<4;o++){const a=new I(new j(.6,.18,3.2),e);a.position.set(19.6+o*.52,-.14-o*.16,14),a.receiveShadow=!0,t.add(a)}const r=new I(new Yt(.24,.19,.36,10),V(12883298));r.position.set(25.6,-.44,12.4),r.castShadow=!0,t.add(r),this.collision.addBox(26.85,11.4,27.5,16.6),this.collision.addBox(21.4,11,27,11.55),this.collision.addBox(21.4,16.45,27,17),this.scene.add(t)}_buildRoadsAndPaths(){const t=V(16777215,{map:dc(1,10)}),e=V(16777215,{map:dc(1,9)}),n=V(16777215,{map:ul(2,6)}),s=V(13152910),r=new I(new Ce(5.6,48),t);r.rotation.x=-Math.PI/2,r.position.set(0,.03,-10),r.receiveShadow=!0,this.scene.add(r);const o=new I(new Ce(5.8,52),e);o.rotation.x=-Math.PI/2,o.rotation.z=Math.PI/2,o.position.set(-4.5,.035,2.1),o.receiveShadow=!0,this.scene.add(o);const a=V(16118764);for(let u=-2;u<=2;u++){const f=new I(new Ce(.45,2),a);f.rotation.x=-Math.PI/2,f.position.set(u*.9,.045,-1.6),this.scene.add(f)}const c=new I(new Ce(11,2.8),n);c.rotation.x=-Math.PI/2,c.position.set(-5.5,.04,-22.2),c.receiveShadow=!0,this.scene.add(c);const l=new I(new Ce(2.4,30),s);l.rotation.x=-Math.PI/2,l.position.set(19.6,.025,2.5),l.receiveShadow=!0,this.scene.add(l);const h=new I(new Ce(2.2,4.5),n);h.rotation.x=-Math.PI/2,h.position.set(-13,.04,-1.4),h.receiveShadow=!0,this.scene.add(h)}_buildNorthernFields(){const t=V(8281925),e=V(6530635),n=V(8108752,{transparent:!0,opacity:.78}),s=new I(new j(13.5,.14,7.2),t);s.position.set(-13,.05,-31.5),s.receiveShadow=!0,this.scene.add(s);for(let g=0;g<4;g++){const _=new I(new j(12.2,.22,.8),t);_.position.set(-13,.14,-34+g*1.65),this.scene.add(_);for(let m=0;m<8;m++){const p=new I(new Vo(.36,0),e);p.position.set(-18.2+m*1.48,.42,-34+g*1.65),p.castShadow=!0,this.scene.add(p)}}const r=new I(new j(12.6,.22,8.2),V(8960109));r.position.set(12,.06,-31.5),r.receiveShadow=!0,this.scene.add(r);const o=new I(new Ce(11.4,7),n);o.rotation.x=-Math.PI/2,o.position.set(12,.19,-31.5),this.scene.add(o);const a=new Nt;a.position.set(-12.8,.12,-31.5);const c=new I(new Yt(.06,.07,1.9,6),V(8148792));c.position.y=.95,a.add(c);const l=new I(new Yt(.05,.05,1.4,6),V(8148792));l.rotation.z=Math.PI/2,l.position.y=1.32,a.add(l);const h=new I(new j(.55,.72,.25),V(5404840));h.position.y=1.15,a.add(h);const u=new I(new ue(.22,8,8),V(15785922));u.position.y=1.66,a.add(u);const f=new I(new Ge(.52,.22,8),V(14465128));f.position.y=1.88,a.add(f),this.scene.add(a);const d=Mi();d.position.set(0,.02,-34.2),this.scene.add(d),this.collision.addBoxCenter(0,-34.2,2,.8),this.benches.push({id:"bench_north_overlook",label:"坐在北丘长椅眺望电车与小镇",x:0,y:0,z:-34.2,sitPos:new C(0,.48,-34.05),facingYaw:0})}update(t){this.waterTexture&&(this.waterTexture.offset.y-=t*.18)}}class O0{constructor(t,e){this.scene=t,this.collision=e,this.enterableBuildings=[],this.nightLights=[],this.nightWindows=[],this.barberPole=null,this.benches=[],this.landmarks={}}build(){this._buildKomorebiBakery(),this._buildAobaGeneralStore(),this._buildPlayerCottage(),this._buildDecorativeTownhouses(),this._buildStreetDetails()}_createGableRoof(t,e,n,s="#465266",r="#606f88"){const o=new Nt,a=hl(s,r,3,2),c=V(16777215,{map:a,side:ze}),l=V(6112048),h=t+1,f=(e+1)/2,d=Math.sqrt(f*f+n*n),g=Math.atan2(n,f);for(const v of[-1,1]){const x=new I(new j(h,.18,d),c);x.position.set(0,n*.5,v*(f*.5)),x.rotation.x=v*g,x.castShadow=!0,x.receiveShadow=!0,o.add(x)}const _=new sl;_.moveTo(-e/2,0),_.lineTo(e/2,0),_.lineTo(0,n),_.closePath();const m=new Go(_,{depth:.22,bevelEnabled:!1}),p=V(16248802);for(const v of[-t/2,t/2-.22]){const x=new I(m,p);x.rotation.y=Math.PI/2,x.position.set(v,0,0),o.add(x)}const M=new I(new j(h+.15,.22,.28),l);return M.position.y=n+.05,o.add(M),o}_buildHollowRoom({cx:t,cz:e,width:n,depth:s,wallH:r,doorSide:o,doorWidth:a=1.9,wallMat:c,floorMat:l}){const h=new Nt,u=.26,f=new I(new j(n,.16,s),l);f.position.set(t,.08,e),f.receiveShadow=!0,h.add(f);const d=(p,M,v,x,L=r,A=r/2+.12)=>{const E=new I(new j(v,L,x),c);return E.position.set(p,A,M),E.castShadow=!0,E.receiveShadow=!1,h.add(E),E},g=n/2,_=s/2;d(t-g+u/2,e,u,s),d(t+g-u/2,e,u,s),this.collision.addBoxCenter(t-g+u/2,e,u+.1,s),this.collision.addBoxCenter(t+g-u/2,e,u+.1,s);const m=(p,M)=>{if(!M)d(t,p,n,u),this.collision.addBoxCenter(t,p,n,u+.1);else{const v=(n-a)/2;d(t-g+v/2,p,v,u),d(t+g-v/2,p,v,u);const x=2.3;d(t,p,a,u,r-x,x+(r-x)/2+.12),this.collision.addBoxCenter(t-g+v/2,p,v,u+.1),this.collision.addBoxCenter(t+g-v/2,p,v,u+.1)}};return m(e-_+u/2,o==="north"),m(e+_-u/2,o==="south"),h}_buildKomorebiBakery(){const o=new Nt,a=V(16511455),c=V(16777215,{map:Cn("#c79667","#a6764c",3,3)}),l=V(8147508);o.add(this._buildHollowRoom({cx:-11.5,cz:9.2,width:8.4,depth:6.8,wallH:3.5,doorSide:"north",doorWidth:2,wallMat:a,floorMat:c}));const h=new I(new j(8.4-.35,.16,1.25),V(14710925));h.position.set(-11.5,2.7,9.2-6.8/2-.55),h.rotation.x=.28,h.castShadow=!0,o.add(h);const u=new I(new j(3.2,.82,.14),V(16777215,{map:pi("木漏れ日","手工面包 · 咖啡","#fff9ee","#4e3529","#d87088")}));u.position.set(-11.5,3.22,9.2-6.8/2-.18),o.add(u);const f=V(14414079,{transparent:!0,opacity:.45,emissive:16766878,emissiveIntensity:.18});this.nightWindows.push(f);for(const x of[-11.5-2.6,-11.5+2.6]){const L=new I(new j(2.1,1.5,.12),f);L.position.set(x,1.75,9.2-6.8/2-.02),o.add(L)}const d=new I(new j(1.95,2.25,.1),V(16777215,{map:Ur()}));d.position.set(-11.5,1.24,9.2-6.8/2+.14),o.add(d);const g=this._createGableRoof(8.4,6.8,2.2,"#8b4b43","#a75e54");g.position.set(-11.5,3.5+.12,9.2),o.add(g);const _=new I(new j(4.2,1.05,.95),l);_.position.set(-11.5-1.2,.68,9.2+1.4),_.castShadow=!0,o.add(_),this.collision.addBoxCenter(-11.5-1.2,9.2+1.4,4.2,.95);const m=[15249496,15900852,14192450,16110744];for(let x=0;x<6;x++){const L=new I(new ue(.18,8,6),V(m[x%m.length]));L.scale.set(1.1,.65,.9),L.position.set(-11.5-2.6+x*.56,1.3,9.2+1.32),o.add(L)}const p=new I(new j(.55,.52,.45),V(13126989));p.position.set(-11.5+.4,1.46,9.2+1.45),o.add(p);for(const x of[9.2-.9,9.2+1.3]){const L=new I(new Yt(.58,.58,.08,12),V(13211238));L.position.set(-11.5+2.45,.88,x),o.add(L);const A=new I(new Yt(.08,.16,.72,8),l);A.position.set(-11.5+2.45,.52,x),o.add(A),this.collision.addCircle(-11.5+2.45,x,.55)}const M=new xi(16766878,1.35,11,1.4);M.position.set(-11.5,2.9,9.2),o.add(M);const v=N0(15762843);v.position.set(-11.5-4.7,.02,9.2-2.6),v.rotation.y=.3,o.add(v),this.collision.addCircle(-11.5-4.7,9.2-2.6,.65),this.scene.add(o),this.collision.addCameraBox(-11.5-8.4/2-.7,0,9.2-6.8/2-.7,-11.5+8.4/2+.7,3.5+2.6,9.2+6.8/2+.7,"bakery"),this.enterableBuildings.push({id:"bakery",name:"「木漏れ日」面包咖啡馆",bounds:{minX:-11.5-8.4/2+.15,maxX:-11.5+8.4/2-.15,minZ:9.2-6.8/2+.15,maxZ:9.2+6.8/2-.15},doorCenter:new C(-11.5,0,9.2-6.8/2),roofGroup:g,doorMesh:d,doorClosedX:-11.5,doorOpenX:-11.5+1.55,doorOpenProgress:0,wasOpen:!1,interiorLight:M})}_buildAobaGeneralStore(){const o=new Nt,a=V(16777215,{map:Cn("#997352","#7a593d",3,2)}),c=V(16777215,{map:Cn("#b8946e","#997754",3,3)});o.add(this._buildHollowRoom({cx:10.2,cz:9.2,width:8,depth:6.6,wallH:3.5,doorSide:"north",doorWidth:2,wallMat:a,floorMat:c}));const l=new I(new Ce(2.3,.85),V(16777215,{map:fc("青 葉","#345c84","#fff9ee"),side:ze}));l.position.set(10.2,2.38,9.2-6.6/2-.25),o.add(l);const h=new I(new j(3.2,.82,.14),V(16777215,{map:pi("青葉商店","日用杂货 · 钓具 · 零食","#f4efe2","#2b4238","#4d8262")}));h.position.set(10.2,3.2,9.2-6.6/2-.18),o.add(h);const u=new I(new j(1.95,2.25,.1),V(16777215,{map:Ur()}));u.position.set(10.2,1.24,9.2-6.6/2+.14),o.add(u);const f=this._createGableRoof(8,6.6,2.1,"#435854","#58706b");f.position.set(10.2,3.5+.12,9.2),o.add(f);const d=V(8148537),g=new I(new j(3.2,1,.85),d);g.position.set(10.2+1.5,.66,9.2+1.5),o.add(g),this.collision.addBoxCenter(10.2+1.5,9.2+1.5,3.2,.85);const _=new I(new ue(.16,8,8),V(16775920));_.position.set(10.2+.5,1.32,9.2+1.38),o.add(_);const m=new I(new j(.65,2.1,4.4),d);m.position.set(10.2-3.3,1.22,9.2+.4),o.add(m),this.collision.addBoxCenter(10.2-3.3,9.2+.4,.7,4.4);const p=[15895692,8046989,15911260,8041704,15244996];for(let L=0;L<8;L++){const A=new I(new j(.28,.3,.34),V(p[L%p.length]));A.position.set(10.2-3.1,.94+L%2*.62,9.2-1.2+Math.floor(L/2)*.95),o.add(A)}const M=Mi();M.position.set(10.2+2.4,0,9.2-6.6/2-.75),M.rotation.y=Math.PI,o.add(M),this.collision.addBoxCenter(10.2+2.4,9.2-6.6/2-.75,1.9,.65),this.benches.push({id:"bench_aoba",label:"坐在青叶商店门前纳凉",x:10.2+2.4,y:0,z:9.2-6.6/2-.75,sitPos:new C(10.2+2.4,.48,9.2-6.6/2-.85),facingYaw:Math.PI});const v=new I(new j(.6,.45,.48),V(14043979));v.position.set(10.2-2.9,.24,9.2-6.6/2-.55),v.castShadow=!0,o.add(v);const x=new xi(16769192,1.3,11,1.4);x.position.set(10.2,2.85,9.2),o.add(x),this.scene.add(o),this.collision.addCameraBox(10.2-8/2-.7,0,9.2-6.6/2-.7,10.2+8/2+.7,3.5+2.6,9.2+6.6/2+.7,"general_store"),this.enterableBuildings.push({id:"general_store",name:"「青叶商店」杂货铺",bounds:{minX:10.2-8/2+.15,maxX:10.2+8/2-.15,minZ:9.2-6.6/2+.15,maxZ:9.2+6.6/2-.15},doorCenter:new C(10.2,0,9.2-6.6/2),roofGroup:f,doorMesh:u,doorClosedX:10.2,doorOpenX:10.2+1.55,doorOpenProgress:0,wasOpen:!1,interiorLight:x})}_buildPlayerCottage(){const o=new Nt,a=V(16249576),c=V(16777215,{map:w0(3,3)});o.add(this._buildHollowRoom({cx:-13,cz:-6.8,width:7.4,depth:6.2,wallH:3.3,doorSide:"south",doorWidth:1.9,wallMat:a,floorMat:c}));const l=new I(new j(7.4+.4,.18,1.1),V(16777215,{map:Cn("#a87950","#875c38",3,1)}));l.position.set(-13,.09,-6.8+6.2/2+.45),l.receiveShadow=!0,o.add(l);const h=new I(new j(1.1,.42,.08),V(16777215,{map:pi("樱花小筑","我的家","#f5e8d0","#453226","#d87088")}));h.position.set(-13+1.75,1.65,-6.8+6.2/2+.08),o.add(h);const u=new I(new j(1.88,2.2,.1),V(16777215,{map:Ur()}));u.position.set(-13,1.22,-6.8+6.2/2-.14),o.add(u);const f=this._createGableRoof(7.4,6.2,2.15,"#465266","#5f6f8a");f.position.set(-13,3.3+.12,-6.8),o.add(f);const d=new I(new j(1.4,.38,1),V(9329722));d.position.set(-13+.8,.36,-6.8-.1),d.castShadow=!0,o.add(d),this.collision.addBoxCenter(-13+.8,-6.8-.1,1.4,1);const g=new I(new ue(.14,8,8),V(5407332));g.position.set(-13+.8,.66,-6.8-.1),o.add(g);const _=new I(new j(1.45,.18,2.2),V(16249835));_.position.set(-13-2.1,.26,-6.8-.8),o.add(_);const m=new I(new j(1.48,.16,1.55),V(15375280));m.position.set(-13-2.1,.36,-6.8-.45),o.add(m);const p=new I(new j(.62,.16,.35),V(16776696));p.position.set(-13-2.1,.39,-6.8-1.6),o.add(p);const M=new I(new j(1.6,1.75,.45),V(8673852));M.position.set(-13+1.8,1.04,-6.8-2.55),o.add(M),this.collision.addBoxCenter(-13+1.8,-6.8-2.55,1.6,.55);const v=new xi(16767910,1.25,10,1.4);v.position.set(-13,2.75,-6.8),o.add(v);const x=vi(.88,11);x.position.set(-13-4.7,0,-6.8+1.2),o.add(x),this.collision.addCircle(-13-4.7,-6.8+1.2,.5),this.scene.add(o),this.collision.addCameraBox(-13-7.4/2-.7,0,-6.8-6.2/2-.7,-13+7.4/2+.7,3.3+2.5,-6.8+6.2/2+.7,"cottage"),this.landmarks.futon=new C(-13-2.1,.2,-6.8-.8),this.enterableBuildings.push({id:"cottage",name:"樱花小筑（我的家）",bounds:{minX:-13-7.4/2+.15,maxX:-13+7.4/2-.15,minZ:-6.8-6.2/2+.15,maxZ:-6.8+6.2/2-.15},doorCenter:new C(-13,0,-6.8+6.2/2),roofGroup:f,doorMesh:u,doorClosedX:-13,doorOpenX:-13+1.48,doorOpenProgress:0,wasOpen:!1,interiorLight:v})}_buildDecorativeTownhouses(){this._createSimpleHouse({cx:-22.2,cz:9.4,w:6.4,d:6.2,h:4.4,wallColor:15397622,roofA:"#4e677a",roofB:"#66849a",signTitle:"樱花理发",signSub:"BARBER",signZSide:-1});const t=new Nt;t.position.set(-19.5,1.45,5.95);const e=new I(new Yt(.14,.14,.82,10),V(16777215,{map:fc("///","#e64d54","#3c78c8")}));t.add(e);const n=new I(new ue(.15,8,8),V(14212580));n.position.y=.44,t.add(n),this.scene.add(t),this.barberPole=e,this._createSimpleHouse({cx:10.6,cz:-6.8,w:7.2,d:6,h:3.8,wallColor:16248550,roofA:"#8c4b45",roofB:"#a85f58",signTitle:"樱花邮局",signSub:"〒 POST",signZSide:1}),this._createSimpleHouse({cx:-23.5,cz:-7,w:5.8,d:5.6,h:4.6,wallColor:16250351,roofA:"#3d4554",roofB:"#515c6e",signTitle:"",signSub:"",signZSide:1}),this._createSimpleHouse({cx:-.6,cz:14.8,w:7.8,d:6.2,h:4.9,wallColor:15787218,roofA:"#515a68",roofB:"#697485",signTitle:"",signSub:"",signZSide:-1})}_createSimpleHouse({cx:t,cz:e,w:n,d:s,h:r,wallColor:o,roofA:a,roofB:c,signTitle:l,signSub:h,signZSide:u}){const f=new Nt,d=new I(new j(n,r,s),V(o));d.position.set(t,r/2,e),d.castShadow=!0,d.receiveShadow=!0,f.add(d);const g=this._createGableRoof(n,s,2,a,c);g.position.set(t,r,e),f.add(g);const _=V(13164527,{emissive:16765060,emissiveIntensity:.05});this.nightWindows.push(_);const m=e+u*(s/2+.04);for(const M of[-n*.25,n*.25]){const v=new I(new j(1.15,1.05,.08),_);v.position.set(t+M,r>4.2?3.1:1.9,m),f.add(v)}const p=new I(new j(1.2,2.1,.1),V(8148024));if(p.position.set(t,1.05,m),f.add(p),l){const M=new I(new j(2.6,.74,.12),V(16777215,{map:pi(l,h)}));M.position.set(t,r-.72,m+u*.08),f.add(M)}this.scene.add(f),this.collision.addBoxCenter(t,e,n+.2,s+.2),this.collision.addCameraBox(t-n/2-.65,0,e-s/2-.65,t+n/2+.65,r+2.4,e+s/2+.65,null)}_buildStreetDetails(){const t=R0();t.position.set(4.6,0,5.5),t.rotation.y=Math.PI,this.scene.add(t),this.collision.addBoxCenter(4.6,5.5,1.5,.9),this.landmarks.vending=new C(4.6,0,4.9);const e=P0();e.position.set(6.2,0,-3.4),this.scene.add(e),this.collision.addCircle(6.2,-3.4,.4),this.landmarks.postbox=new C(6.2,0,-3.4);const n=U0();n.position.set(-4.8,0,-2.2),n.rotation.y=.28,this.scene.add(n),this.collision.addBoxCenter(-4.8,-2.2,2,.5),this.landmarks.noticeBoard=new C(-4.8,0,-2.2);const s=I0();s.position.set(3.6,0,-1.6),s.rotation.y=-Math.PI*.75,this.scene.add(s),this.collision.addCircle(3.6,-1.6,.25);const r=[new C(-25,0,-1.2),new C(-7,0,-1.2),new C(4.2,0,-1.2),new C(17.5,0,-1.2)];r.forEach((c,l)=>{const h=pc(l===1);h.position.copy(c),this.scene.add(h),this.collision.addCircle(c.x,c.z,.28)}),this.scene.add(mc(r));const o=[new C(3.8,0,-12.8),new C(3.8,0,-23.5)];o.forEach(c=>{const l=pc(!1);l.position.copy(c),l.rotation.y=Math.PI/2,this.scene.add(l),this.collision.addCircle(c.x,c.z,.28)}),this.scene.add(mc([r[2],...o]));const a=[{x:-16.5,z:5,rot:-Math.PI/2},{x:-3.8,z:5.2,rot:-Math.PI/2},{x:16.5,z:5.2,rot:-Math.PI/2},{x:-3.5,z:-12.5,rot:0},{x:18.8,z:-.6,rot:Math.PI/2},{x:18.8,z:12.2,rot:Math.PI/2}];for(const c of a){const l=D0();l.position.set(c.x,0,c.z),l.rotation.y=c.rot,this.scene.add(l),this.collision.addCircle(c.x,c.z,.22),this.nightLights.push(l.userData.lampLight)}[{x:-6.2,z:6.8,s:.92},{x:17,z:-4.2,s:1.02},{x:-18.5,z:-1.5,s:.92}].forEach((c,l)=>{const h=vi(c.s,20+l);h.position.set(c.x,0,c.z),this.scene.add(h),this.collision.addCircle(c.x,c.z,.45)})}update(t,e,n,s){let r=null;for(const o of this.enterableBuildings){const a=e.x>=o.bounds.minX&&e.x<=o.bounds.maxX&&e.z>=o.bounds.minZ&&e.z<=o.bounds.maxZ;a&&(r=o),o.roofGroup.visible=!a;const c=e.distanceTo(o.doorCenter)<2.6;c&&!o.wasOpen&&s&&s.playDoorChime(),o.wasOpen=c,o.doorOpenProgress+=((c?1:0)-o.doorOpenProgress)*Math.min(1,t*8),o.doorMesh.position.x=Ue.lerp(o.doorClosedX,o.doorOpenX,o.doorOpenProgress),o.interiorLight.intensity=1.15+n*1.1}for(const o of this.nightLights)o.intensity=n*2.4;for(const o of this.nightWindows)o.emissiveIntensity=.06+n*.85;return this.barberPole&&(this.barberPole.rotation.y+=t*1.8),r}}class B0{constructor(t,e){this.scene=t,this.collision=e,this.lanternLights=[],this.lanternMats=[],this.bellRope=null,this.bellSwing=0,this.benches=[],this.landmarks={}}build(){this._buildStairsAndTerrace(),this._buildToriiGates(),this._buildShrineHall(),this._buildSacredWeepingSakura(),this._buildLanternsAndDetails()}_buildStairsAndTerrace(){const t=V(16777215,{map:ul(2,3)}),e=V(10131342);for(let s=0;s<10;s++){const r=(s+.5)/10,o=new I(new j(.44,.24,3.6),e);o.position.set(36.8+r*3.8,r*2-.1,1.7),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o)}const n=new I(new j(11.5,.16,12.2),t);n.position.set(46.2,1.98,-4.6),n.receiveShadow=!0,this.scene.add(n)}_createTorii(t=1){const e=new Nt,n=V(14041396),s=V(2631982);for(const l of[-1,1]){const h=new I(new Yt(.18*t,.22*t,4.1*t,8),n);h.position.set(l*1.65*t,2.05*t,0),h.castShadow=!0,e.add(h);const u=new I(new Yt(.26*t,.3*t,.45*t,8),s);u.position.set(l*1.65*t,.22*t,0),e.add(u)}const r=new I(new j(4.4*t,.24*t,.24*t),n);r.position.y=3.2*t,r.castShadow=!0,e.add(r);const o=new I(new j(5.1*t,.28*t,.38*t),n);o.position.y=4.05*t,o.castShadow=!0,e.add(o);const a=new I(new j(5.3*t,.14*t,.44*t),s);a.position.y=4.24*t,e.add(a);const c=new I(new j(.45*t,.68*t,.14*t),s);return c.position.y=3.65*t,e.add(c),e}_buildToriiGates(){const t=this._createTorii(1);t.position.set(36.9,.08,1.7),t.rotation.y=Math.PI/2,this.scene.add(t),this.collision.addCircle(36.9,.05,.26),this.collision.addCircle(36.9,3.35,.26);const e=this._createTorii(.95);e.position.set(42.2,2,-1.6),e.rotation.y=.25,this.scene.add(e),this.collision.addCircle(40.6,-2,.26),this.collision.addCircle(43.8,-1.2,.26)}_buildShrineHall(){const s=new Nt,r=V(16777215,{map:Cn("#8a5738","#693f26",2,2)}),o=V(16248802),a=V(16777215,{map:hl("#3a4250","#505c6f",3,2)}),c=V(15382596),l=new I(new j(6.8,.45,4.8),r);l.position.set(46.5,2+.22,-9.6),l.castShadow=!0,l.receiveShadow=!0,s.add(l);const h=new I(new j(5.6,2.9,3.4),o);h.position.set(46.5,2+1.9,-9.6-.35),h.castShadow=!0,s.add(h);for(const p of[-2.8,-1.1,1.1,2.8]){const M=new I(new Yt(.14,.15,2.8,8),r);M.position.set(46.5+p,2+1.85,-9.6+1.9),M.castShadow=!0,s.add(M)}const u=new I(new Ge(5.6,2.4,4),a);u.rotation.y=Math.PI/4,u.scale.set(1.15,1,.92),u.position.set(46.5,2+4.45,-9.6),u.castShadow=!0,s.add(u);const f=new I(new j(1.5,.72,.75),r);f.position.set(46.5,2+.68,-9.6+2.15),f.castShadow=!0,s.add(f);const d=new Nt;d.position.set(46.5,2+3.25,-9.6+2.15);const g=new I(new ue(.24,10,10),c);g.position.y=-.25,d.add(g);const _=new I(new Yt(.08,.1,1.75,8),V(14175301));_.position.y=-1.2,d.add(_),s.add(d),this.bellRope=d;const m=new xi(16763768,.6,12,1.5);m.position.set(46.5,2+2.6,-9.6+1.9),s.add(m),this.lanternLights.push(m),this.scene.add(s),this.collision.addBoxCenter(46.5,-9.6,7,4.9),this.collision.addCameraBox(46.5-3.8,2,-9.6-2.8,46.5+3.8,2+5.8,-9.6+2.8,null),this.landmarks.shrineOffering=new C(46.5,2,-9.6+2.9)}_buildSacredWeepingSakura(){const t=vi(1.65,99);t.position.set(51.6,2,-3.8),this.scene.add(t),this.collision.addCircle(51.6,-3.8,.85);const e=new I(new is(.56,.11,7,16),V(14204284));e.rotation.x=Math.PI/2,e.position.set(51.6,3.25,-3.8),this.scene.add(e)}_buildLanternsAndDetails(){for(const[e,n,s]of[[37.4,.2,.1],[37.4,.2,3.3],[42.8,2,-5.8],[49.8,2,-5.8]]){const r=L0();r.position.set(e,n,s),this.scene.add(r),this.collision.addCircle(e,s,.35),this.lanternLights.push(r.userData.lampLight),this.lanternMats.push(r.userData.glowMaterial)}const t=Mi();t.position.set(41.8,2,-6.2),t.rotation.y=-Math.PI/2,this.scene.add(t),this.collision.addBoxCenter(41.8,-6.2,.8,2),this.benches.push({id:"bench_shrine",label:"坐在神社观景椅俯瞰樱花小镇",x:41.8,y:2,z:-6.2,sitPos:new C(41.65,2.48,-6.2),facingYaw:-Math.PI/2})}ringBell(){this.bellSwing=1}update(t,e){this.bellSwing>.01&&this.bellRope?(this.bellSwing*=Math.exp(-t*2.2),this.bellRope.rotation.x=Math.sin(performance.now()*.016)*.42*this.bellSwing):this.bellRope&&(this.bellRope.rotation.x=0);for(const n of this.lanternLights)n.intensity=.25+e*2.1;for(const n of this.lanternMats)n.emissiveIntensity=.15+e*1.1}}class z0{constructor(t,e){this.scene=t,this.collision=e,this.trackZ=-18,this.stationX=-18.5,this.crossingX=0,this.trainGroup=null,this.trainDoors=[],this.trainX=-132,this.trainSpeed=0,this.direction=1,this.state="IDLE",this.stateTimer=12,this.doorOpenProgress=0,this._clackTimer=0,this.gateArms=[],this.gateAngle=0,this.gatesClosed=!1,this.crossingLamps=[],this.arrowLeftMats=[],this.arrowRightMats=[],this._flashTimer=0,this._bellTimer=0,this.benches=[],this.landmarks={}}build(){this._buildTracksAndTunnels(),this._buildRailwayBridge(),this._buildSakuraStation(),this._buildFumikiriCrossing(),this._buildCommuterTrain()}_buildTracksAndTunnels(){const t=this.trackZ,e=new I(new j(250,.24,3.8),V(10328464));e.position.set(0,.08,t),e.receiveShadow=!0,this.scene.add(e);const n=240,s=new yo(new j(.28,.12,2.4),V(6506807),n),r=new me;for(let u=0;u<n;u++)r.position.set(-120+u,.22,t),r.updateMatrix(),s.setMatrixAt(u,r.matrix);s.receiveShadow=!0,this.scene.add(s);const o=V(12633806);for(const u of[t-.65,t+.65]){const f=new I(new j(252,.14,.11),o);f.position.set(0,.32,u),this.scene.add(f)}const a=V(7042173);for(let u=-60;u<=60;u+=18){if(Math.abs(u-this.crossingX)<5||Math.abs(u-29)<8)continue;const f=new I(new j(.18,5.8,.18),a);f.position.set(u,2.9,t-2.25),f.castShadow=!0,this.scene.add(f);const d=new I(new j(.12,.12,2.4),a);d.position.set(u,5.2,t-1.15),this.scene.add(d)}const c=new I(new j(240,.04,.04),V(3027256));c.position.set(0,5.12,t),this.scene.add(c);const l=V(8157812),h=new Ie({color:1316124});for(const u of[-96,96]){const f=new Nt;f.position.set(u,0,t);const d=new I(new j(2.6,6.2,8.2),l);d.position.y=3.1,f.add(d);const g=new I(new j(2.8,4.4,4.2),h);g.position.y=2.2,f.add(g),this.scene.add(f)}this.collision.addBox(-60,t-1.65,-3.1,t+1.65),this.collision.addBox(3.1,t-1.65,60,t+1.65)}_buildRailwayBridge(){const t=new Nt,e=V(13124922),n=V(11249565),s=this.trackZ;for(const r of[23.2,34.8]){const o=new I(new j(1.4,3.2,4),n);o.position.set(r,-1.2,s),t.add(o)}for(const r of[-1,1]){const o=s+r*1.85,a=new I(new j(17.5,.26,.24),e);a.position.set(29,.35,o),t.add(a);const c=new I(new j(14.5,.24,.24),e);c.position.set(29,3.6,o),t.add(c);for(let l=0;l<6;l++){const h=new I(new j(.2,3.6,.2),e);h.position.set(21.8+l*2.88,1.98,o),h.rotation.z=l%2===0?-.35:.35,h.castShadow=!0,t.add(h)}}for(let r=23;r<=35;r+=3){const o=new I(new j(.2,.2,3.9),e);o.position.set(r,3.6,s),t.add(o)}this.scene.add(t)}_buildSakuraStation(){const t=this.stationX,e=-22.2,n=16,s=4.4,r=.65,o=new Nt,a=V(16777215,{map:Cn("#966844","#754e30",2,1)}),c=new I(new j(n,r,s),V(13157560));c.position.set(t,r/2,e),c.receiveShadow=!0,c.castShadow=!0,o.add(c);const l=new I(new j(n-1.2,.03,.28),V(15911742));l.position.set(t-.3,r+.015,e+s/2-.45),o.add(l);for(const _ of[t-4.2,t,t+4.2]){const m=new I(new j(.18,2.8,.18),a);m.position.set(_,r+1.4,e-1.1),m.castShadow=!0,o.add(m)}const h=new I(new j(10.2,.18,3.2),V(4877405));h.position.set(t,r+2.85,e-.4),h.rotation.x=.12,h.castShadow=!0,o.add(h);const u=new I(new j(9.6,2.2,.14),a);u.position.set(t,r+1.1,e-1.85),o.add(u);const f=new I(new j(2.6,1.05,.1),V(16777215,{map:pi("さくら · 樱花","◀ 山口     河原 ▶","#fffdf8","#22352c","#3d8f5d")}));f.position.set(t+5.6,r+1.75,e-1.3),o.add(f);for(const _ of[-1,1]){const m=new I(new Yt(.05,.05,1.8,6),V(4936540));m.position.set(t+5.6+_,r+.9,e-1.3),o.add(m)}const d=Mi();d.position.set(t-1.6,r,e-1.35),o.add(d),this.benches.push({id:"bench_station",label:"坐在樱花站月台等电车",x:t-1.6,y:r,z:e-1.35,sitPos:new C(t-1.6,r+.48,e-1.22),facingYaw:0});const g=new I(new j(.45,1.15,.45),V(4618910));g.position.set(t+6.4,r+.58,e+.6),o.add(g),this.landmarks.stationTimetable=new C(t+6.4,r,e+.6),this.collision.addBox(t-n/2-.3,e-s/2-.2,t+n/2,e-s/2+.25),this.collision.addBox(t-n/2-.3,e-s/2,t-n/2+.2,e+s/2),this.scene.add(o)}_buildFumikiriCrossing(){const t=this.crossingX,e=this.trackZ,n=new I(new j(6.2,.3,3.6),V(5988456));n.position.set(t,.14,e),n.receiveShadow=!0,this.scene.add(n);const s=V(16777215,{map:E0()}),r=V(2632240);for(const o of[{x:t+3.2,z:e+2.55,armDir:-1},{x:t-3.2,z:e-2.55,armDir:1}]){const a=new Nt;a.position.set(o.x,0,o.z);const c=new I(new Yt(.11,.13,4.1,8),s);c.position.y=2.05,c.castShadow=!0,a.add(c);for(const v of[.75,-.75]){const x=new I(new j(1.25,.18,.08),s);x.position.set(0,3.55,o.armDir<0?.12:-.12),x.rotation.z=v,a.add(x)}const l=o.armDir<0?.16:-.16;for(const v of[-.34,.34]){const x=new I(new Yt(.18,.18,.16,10),r);x.rotation.x=Math.PI/2,x.position.set(v,2.55,l),a.add(x);const L=new Ie({color:5576728}),A=new I(new Zs(.14,10),L);A.position.set(v,2.55,l+(o.armDir<0?.09:-.09)),o.armDir>0&&(A.rotation.y=Math.PI),a.add(A),this.crossingLamps.push({mat:L,side:v<0?0:1})}const h=new I(new j(.95,.32,.18),r);h.position.set(0,3.02,l),a.add(h);const u=new Ie({color:3877396}),f=new Ie({color:3877396}),d=new Ge(.11,.24,3),g=new I(d,u);g.rotation.z=Math.PI/2,g.position.set(-.24,3.02,l+(o.armDir<0?.1:-.1)),a.add(g);const _=new I(d,f);_.rotation.z=-Math.PI/2,_.position.set(.24,3.02,l+(o.armDir<0?.1:-.1)),a.add(_),this.arrowLeftMats.push(u),this.arrowRightMats.push(f);const m=new I(new j(.45,.55,.45),V(15123271));m.position.set(0,1,0),a.add(m);const p=new Nt;p.position.set(0,1.05,0);const M=new I(new Yt(.055,.07,5.4,7),s);M.position.y=2.7,p.add(M),a.add(p),this.gateArms.push({pivot:p,dir:o.armDir}),this.scene.add(a),this.collision.addCircle(o.x,o.z,.35)}this.collision.addBox(t-3,e+2.25,t+3,e+2.85,"crossing_gate"),this.collision.addBox(t-3,e-2.85,t+3,e-2.25,"crossing_gate"),this.collision.setActiveById("crossing_gate",!1)}_buildCommuterTrain(){this.trainGroup=new Nt,this.trainGroup.position.set(this.trainX,.42,this.trackZ);const t=V(16512744),e=V(5020278),n=V(8160654),s=V(3290685),r=V(14085884,{emissive:16770216,emissiveIntensity:.35});this.trainWinMat=r;const o=11.4;for(const l of[-6,6]){const h=new Nt;h.position.x=l;const u=new I(new j(o-.6,.55,2.3),s);u.position.y=.32,h.add(u);const f=new I(new j(o,1.05,2.65),e);f.position.y=1.08,f.castShadow=!0,h.add(f);const d=new I(new j(o,1.45,2.62),t);d.position.y=2.32,d.castShadow=!0,h.add(d);const g=new I(new j(o-.15,.35,2.45),n);g.position.y=3.18,h.add(g);const _=new I(new j(3.2,.28,1.4),V(13160148));_.position.y=3.45,h.add(_);for(const m of[-1,1]){for(const p of[-3.8,-1.6,1.6,3.8]){const M=new I(new j(1.5,.95,.08),r);M.position.set(p,2.25,m*1.32),h.add(M)}for(const p of[-1,1]){const M=new I(new j(.66,1.95,.1),V(4162916)),v=p*.34;M.position.set(v,1.62,m*1.33),h.add(M),this.trainDoors.push({mesh:M,closedX:v,openX:v+p*.55})}}if(l<0){const m=new I(new j(1.2,1.15,1.1),s);m.position.set(0,4.05,0),h.add(m)}this.trainGroup.add(h)}const a=new Ie({color:16774592});for(const l of[-11.750000000000002,11.750000000000002]){const h=new I(new j(.1,1,2),r);h.position.set(l,2.35,0),this.trainGroup.add(h);for(const u of[-.72,.72]){const f=new I(new ue(.14,8,8),a);f.position.set(l,1.18,u),this.trainGroup.add(f)}}const c=new I(new j(.7,2.2,1.8),s);c.position.set(0,1.75,0),this.trainGroup.add(c),this.scene.add(this.trainGroup)}getStatus(){return{state:this.state,trainX:this.trainX,direction:this.direction,gatesClosed:this.gatesClosed,nextArrivalSec:this.state==="IDLE"?Math.ceil(this.stateTimer):0,isVisibleInTown:Math.abs(this.trainX)<65}}update(t,e,n,s){const r=Math.hypot(e.x-this.crossingX,e.z-this.trackZ),o=Math.hypot(e.x-this.trainX,e.z-this.trackZ),a=Math.max(0,1-r/52),c=Math.max(0,1-o/58);this.trainWinMat&&(this.trainWinMat.emissiveIntensity=.22+n*1.1);const l=16.5;if(this.state==="IDLE")this.stateTimer-=t,this.stateTimer<=0&&(this.state="APPROACHING",this.trainX=this.direction>0?-125:125,this.trainSpeed=l,s&&s.playTrainHorn(Math.max(.3,c)));else if(this.state==="APPROACHING"){const d=(this.stationX-this.trainX)*this.direction;d>0?(this.trainSpeed=Math.min(l,Math.max(1.8,d*.62)),this.trainX+=this.direction*this.trainSpeed*t,d<=.35&&(this.trainX=this.stationX,this.trainSpeed=0,this.state="BOARDING",this.stateTimer=7.5,s&&s.playStationChime(Math.max(.25,c)))):this.state="DEPARTING"}else this.state==="BOARDING"?(this.stateTimer-=t,this.stateTimer<=0&&(this.state="DEPARTING",s&&s.playTrainHorn(Math.max(.25,c)))):this.state==="DEPARTING"&&(this.trainSpeed=Math.min(l,this.trainSpeed+t*6.2),this.trainX+=this.direction*this.trainSpeed*t,Math.abs(this.trainX)>130&&(this.state="IDLE",this.trainSpeed=0,this.direction*=-1,this.stateTimer=55));this.trainGroup.position.x=this.trainX;const h=this.state==="BOARDING"&&this.stateTimer>1?1:0;this.doorOpenProgress+=(h-this.doorOpenProgress)*Math.min(1,t*5);for(const d of this.trainDoors)d.mesh.position.x=Ue.lerp(d.closedX,d.openX,this.doorOpenProgress);this.trainSpeed>2.5&&Math.abs(this.trainX)<85&&(this._clackTimer-=t*(this.trainSpeed/12),this._clackTimer<=0&&(this._clackTimer=.55,s&&s.playTrainClack(c)));let u=!1;if(this.state!=="IDLE"){const d=this.trainX-this.crossingX;u=this.direction>0?d>-34&&d<26:d<52&&d>-17}this.gatesClosed=u,this.collision.setActiveById("crossing_gate",u);const f=u?Math.PI/2:0;this.gateAngle+=(f-this.gateAngle)*Math.min(1,t*4.5);for(const d of this.gateArms)d.pivot.rotation.z=d.dir<0?this.gateAngle:-this.gateAngle;if(u){this._flashTimer+=t;const d=Math.floor(this._flashTimer*2.4)%2;for(const g of this.crossingLamps)g.mat.color.setHex(g.side===d?16726843:5576728);for(const g of this.arrowRightMats)g.color.setHex(this.direction>0?16758835:3877396);for(const g of this.arrowLeftMats)g.color.setHex(this.direction<0?16758835:3877396);this._bellTimer-=t,this._bellTimer<=0&&(this._bellTimer=.44,s&&s.playFumikiriBell(a))}else{for(const d of this.crossingLamps)d.mat.color.setHex(4528152);for(const d of this.arrowRightMats)d.color.setHex(3877396);for(const d of this.arrowLeftMats)d.color.setHex(3877396);this._bellTimer=0}}}class k0{constructor(t){this.scene=t,this.skyUniforms=null,this.clouds=[],this.petalsMesh=null,this.petalData=[],this.firefliesMesh=null,this.fireflyData=[],this._dummy=new me}build(){this._buildAnimeSkyDome(),this._buildFluffyClouds(),this._buildSakuraPetals(),this._buildFireflies()}_buildAnimeSkyDome(){this.skyUniforms={uTopColor:{value:new Ot(4953051)},uMidColor:{value:new Ot(9160178)},uHorizonColor:{value:new Ot(14675964)},uSunDir:{value:new C(.4,.7,.3).normalize()},uSunColor:{value:new Ot(16774622)},uNightFactor:{value:0}};const t=new _n({uniforms:this.skyUniforms,side:Re,depthWrite:!1,vertexShader:`
        varying vec3 vWorldDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldDir = normalize(position);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        uniform vec3 uTopColor;
        uniform vec3 uMidColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uSunDir;
        uniform vec3 uSunColor;
        uniform float uNightFactor;
        varying vec3 vWorldDir;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main() {
          vec3 dir = normalize(vWorldDir);
          float h = clamp(dir.y, 0.0, 1.0);
          vec3 col = mix(uHorizonColor, uMidColor, smoothstep(0.0, 0.28, h));
          col = mix(col, uTopColor, smoothstep(0.24, 0.82, h));
          float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
          col += uSunColor * (pow(sunDot, 16.0) * 0.35 + smoothstep(0.9965, 0.9985, sunDot) * 0.9);
          if (uNightFactor > 0.2 && h > 0.12) {
            vec2 starCell = floor(dir.xz / (dir.y + 0.35) * 42.0);
            if (hash(starCell) > 0.985) col += vec3(0.95, 0.96, 1.0) * uNightFactor * smoothstep(0.12, 0.45, h);
          }
          gl_FragColor = vec4(col, 1.0);
        }
      `});this.scene.add(new I(new ue(280,24,16),t))}_buildFluffyClouds(){const t=V(16777215,{transparent:!0,opacity:.92}),e=new Js(1,1);for(let n=0;n<14;n++){const s=new Nt,r=4+n%3;for(let o=0;o<r;o++){const a=new I(e,t),c=3.8+(n+o)%3*1.9;a.scale.set(c*1.5,c*.65,c*1.1),a.position.set((o-r/2)*3.6,Math.sin(o*1.4)*1.1,o%2*1.6),s.add(a)}s.position.set(-160+n/14*320,46+n%4*7,-120+Math.sin(n*2.1)*95),s.userData.speed=.8+n%3*.35,this.scene.add(s),this.clouds.push(s)}this.cloudMat=t}_buildSakuraPetals(){this.petalsMesh=new yo(new Ce(.16,.11),new Ie({color:16762582,side:ze,transparent:!0,opacity:.9}),240);for(let e=0;e<240;e++)this.petalData.push({x:(Math.random()-.5)*105,y:.5+Math.random()*14,z:(Math.random()-.5)*85-5,vx:.55+Math.random()*.65,vy:-(.45+Math.random()*.45),vz:.18+Math.random()*.35,phase:Math.random()*Math.PI*2,rotSpeed:1.4+Math.random()*2.4});this.scene.add(this.petalsMesh)}_buildFireflies(){this.fireflyMat=new Ie({color:16056220,transparent:!0,opacity:0}),this.firefliesMesh=new yo(new ue(.08,6,6),this.fireflyMat,42);for(let e=0;e<42;e++){const n=e%3===0;this.fireflyData.push({baseX:n?44+(Math.random()-.5)*14:26+(Math.random()-.5)*14,baseY:n?2.6+Math.random()*2.2:.4+Math.random()*2,baseZ:n?-4+(Math.random()-.5)*12:(Math.random()-.5)*44,phase:Math.random()*Math.PI*2})}this.scene.add(this.firefliesMesh)}update(t,e){const n=performance.now()*.001;this.skyUniforms&&(this.skyUniforms.uTopColor.value.copy(e.colors.skyTop),this.skyUniforms.uMidColor.value.copy(e.colors.skyMid),this.skyUniforms.uHorizonColor.value.copy(e.colors.skyHorizon),this.skyUniforms.uSunDir.value.copy(e.sunDirection),this.skyUniforms.uSunColor.value.copy(e.colors.sunColor),this.skyUniforms.uNightFactor.value=e.nightFactor),this.cloudMat&&(this.cloudMat.color.setHex(16777215).lerp(e.colors.skyHorizon,.45),this.cloudMat.opacity=Ue.lerp(.92,.32,e.nightFactor));for(const r of this.clouds)r.position.x+=r.userData.speed*t,r.position.x>175&&(r.position.x=-175);for(let r=0;r<this.petalData.length;r++){const o=this.petalData[r];o.x+=(o.vx+Math.sin(n*1.3+o.phase)*.35)*t,o.y+=o.vy*t,o.z+=(o.vz+Math.cos(n*1.1+o.phase)*.25)*t,(o.y<.08||o.x>58||o.z>42)&&(o.x=(Math.random()-.5)*105-8,o.y=9+Math.random()*7,o.z=(Math.random()-.5)*80-6),this._dummy.position.set(o.x,o.y,o.z),this._dummy.rotation.set(n*o.rotSpeed+o.phase,n*o.rotSpeed*.7,Math.sin(n*2+o.phase)*.8),this._dummy.scale.setScalar(1),this._dummy.updateMatrix(),this.petalsMesh.setMatrixAt(r,this._dummy.matrix)}this.petalsMesh.instanceMatrix.needsUpdate=!0;const s=Ue.clamp((e.nightFactor-.35)*1.5,0,.95);if(this.fireflyMat.opacity=s,s>.02){for(let r=0;r<this.fireflyData.length;r++){const o=this.fireflyData[r];this._dummy.position.set(o.baseX+Math.sin(n*.7+o.phase)*.9,o.baseY+Math.sin(n*1.1+o.phase*1.3)*.45,o.baseZ+Math.cos(n*.6+o.phase)*.9),this._dummy.rotation.set(0,0,0),this._dummy.scale.setScalar(.6+.55*Math.sin(n*3.2+o.phase)),this._dummy.updateMatrix(),this.firefliesMesh.setMatrixAt(r,this._dummy.matrix)}this.firefliesMesh.instanceMatrix.needsUpdate=!0}}}function dl(i={}){const{scale:t=1,skinColor:e=16638668,hairColor:n=3877930,shirtColor:s=16052456,jacketColor:r=null,pantsColor:o=4544624,shoeColor:a=6046520,hairStyle:c="short",hatColor:l=null,apronColor:h=null,hasCamera:u=!1,hasBackpack:f=!1}=i,d=new Nt,g=new Nt;d.add(g);const _=V(e),m=V(n),p=V(s),M=V(o),v=V(a),x=new Ie({color:2497820}),L=new Ie({color:16029862}),A=new I(new Yt(.22,.27,.58,10),p);if(A.position.y=.86,A.castShadow=!0,g.add(A),r){const W=new I(new j(.5,.52,.34),V(r));W.position.set(0,.86,-.02),W.castShadow=!0,g.add(W)}if(h){const W=new I(new j(.42,.56,.08),V(h));W.position.set(0,.72,.19),g.add(W)}if(f){const W=new I(new j(.36,.42,.2),V(13132882));W.position.set(0,.88,-.24),W.castShadow=!0,g.add(W)}if(u){const W=new I(new j(.18,.12,.1),V(2961462));W.position.set(0,.86,.24),g.add(W);const O=new I(new Yt(.04,.04,.08,8),V(4936284));O.rotation.x=Math.PI/2,O.position.set(0,.86,.3),g.add(O)}const E=new Nt;E.position.set(0,1.38,0),g.add(E);const P=new I(new ue(.28,14,12),_);P.castShadow=!0,E.add(P);for(const W of[-.095,.095]){const O=new I(new ue(.036,8,8),x);O.scale.set(.9,1.25,.5),O.position.set(W,.01,.255),E.add(O);const nt=new I(new Zs(.038,8),L);nt.position.set(W*1.45,-.055,.25),E.add(nt)}const b=new I(new ue(.305,14,10,0,Math.PI*2,0,Math.PI*.62),m);b.position.set(0,.03,-.02),b.castShadow=!0,E.add(b);const S=new I(new j(.42,.14,.12),m);if(S.position.set(0,.14,.21),E.add(S),c==="bob"||c==="ponytail"){const W=new I(new j(.5,.34,.2),m);W.position.set(0,-.06,-.18),E.add(W)}if(c==="ponytail"){const W=new I(new Ge(.11,.38,8),m);W.position.set(0,-.08,-.34),W.rotation.x=.45,E.add(W)}if(l){const W=V(l),O=new I(new Yt(.38,.4,.05,12),W);O.position.set(0,.24,.04),E.add(O);const nt=new I(new Yt(.24,.28,.18,12),W);nt.position.set(0,.34,0),E.add(nt)}const D=W=>{const O=new Nt;O.position.set(W*.28,1.08,0);const nt=new I(new Yt(.065,.058,.46,8),r?V(r):p);nt.position.y=-.22,nt.castShadow=!0,O.add(nt);const ht=new I(new ue(.062,8,8),_);return ht.position.y=-.46,O.add(ht),g.add(O),O},k=D(-1),B=D(1),Y=W=>{const O=new Nt;O.position.set(W*.11,.56,0);const nt=new I(new Yt(.08,.068,.48,8),M);nt.position.y=-.24,nt.castShadow=!0,O.add(nt);const ht=new I(new j(.13,.1,.22),v);return ht.position.set(0,-.5,.04),ht.castShadow=!0,O.add(ht),g.add(O),O},Z=Y(-1),X=Y(1);return d.scale.setScalar(t),{root:d,bodyRoot:g,headGroup:E,leftArm:k,rightArm:B,leftLeg:Z,rightLeg:X,animate(W,O,nt=!1){if(nt){g.position.y=-.24,Z.rotation.x=-Math.PI/2.2,X.rotation.x=-Math.PI/2.2,k.rotation.x=-.25,B.rotation.x=-.25,E.rotation.y=Math.sin(W*.8)*.14;return}if(O>.15){const ht=O>4.2?12.5:8.5,ft=Math.min(.75,O*.14),Lt=Math.sin(W*ht);Z.rotation.x=Lt*ft,X.rotation.x=-Lt*ft,k.rotation.x=-Lt*ft*.8,B.rotation.x=Lt*ft*.8,g.position.y=Math.abs(Math.cos(W*ht))*.055}else Z.rotation.x*=.82,X.rotation.x*=.82,k.rotation.x*=.82,B.rotation.x*=.82,g.position.y=Math.sin(W*2.2)*.015}}}function H0(){const i=new Nt,t=V(15637069),e=V(16774628),n=V(16099512),s=new Ie({color:2497820}),r=new I(new Ho(.16,.28,6,10),t);r.rotation.x=Math.PI/2,r.position.set(0,.24,0),r.castShadow=!0,i.add(r);const o=new I(new ue(.14,8,8),e);o.position.set(0,.2,.14),i.add(o);const a=new Nt;a.position.set(0,.36,.24),i.add(a);const c=new I(new ue(.16,10,10),t);c.castShadow=!0,a.add(c);for(const d of[-.09,.09]){const g=new I(new Ge(.055,.11,4),t);g.position.set(d,.15,0),g.rotation.z=-d*2,a.add(g);const _=new I(new Ge(.03,.07,4),n);_.position.set(d,.14,.025),_.rotation.z=-d*2,a.add(_);const m=new I(new ue(.022,6,6),s);m.position.set(d*.65,.02,.14),a.add(m)}const l=new I(new is(.13,.022,6,12),V(14240587));l.rotation.x=Math.PI/2,l.position.set(0,.29,.18),i.add(l);const h=new I(new ue(.032,8,8),V(16108364));h.position.set(0,.23,.3),i.add(h);const u=new Nt;u.position.set(0,.28,-.22);const f=new I(new Yt(.028,.04,.36,6),t);return f.position.set(0,.16,-.06),f.rotation.x=-.45,u.add(f),i.add(u),{root:i,headGroup:a,animate(d,g){u.rotation.z=Math.sin(d*(g>.1?8:3.2))*.38,i.position.y=g>.1?Math.abs(Math.sin(d*9))*.04:0}}}class V0{constructor(t,e,n,s){this.scene=t,this.camera=e,this.collision=n,this.input=s,this.position=new C(0,0,1.8),this.yaw=Math.PI,this.speed=0,this.camYaw=.08,this.camPitch=.34,this.camDist=8.2,this.targetCamDist=8.2,this.mode="WALK",this.sitData=null,this.boostTimer=0,this.meshObj=dl({scale:.96,hairColor:3878188,shirtColor:16775404,jacketColor:6063272,pantsColor:4933186,shoeColor:8146488,hairStyle:"short",hasBackpack:!0}),this.meshObj.root.position.copy(this.position),this.scene.add(this.meshObj.root),this._lookTarget=new C,this._desiredCamPos=new C,this._camInitialized=!1}grantSpeedBoost(t=35){this.boostTimer=Math.max(this.boostTimer,t)}sitOnBench(t){this.mode="SIT",this.sitData=t,this.position.copy(t.sitPos),this.yaw=t.facingYaw,this.meshObj.root.position.copy(this.position),this.meshObj.root.rotation.y=this.yaw}standUp(){if(this.mode==="SIT"){if(this.sitData){const t=this.sitData.x+Math.sin(this.sitData.facingYaw)*1.1,e=this.sitData.z+Math.cos(this.sitData.facingYaw)*1.1,n=this.collision.resolve(t,e,.42);this.position.set(n.x,ye.getGroundHeight(n.x,n.z),n.z)}this.sitData=null,this.mode="WALK"}}enterFishing(t,e){this.mode="FISH",this.position.copy(t),this.yaw=e,this.meshObj.root.position.copy(this.position),this.meshObj.root.rotation.y=this.yaw}exitFishing(){this.mode==="FISH"&&(this.mode="WALK")}enterCameraMode(){return this.mode==="WALK"||this.mode==="SIT"?(this._preCamMode=this.mode,this.mode="CAMERA",this.camYaw=this.yaw+Math.PI,this.camPitch=.04,this.meshObj.root.visible=!1,!0):!1}exitCameraMode(){this.mode==="CAMERA"&&(this.mode=this._preCamMode||"WALK",this.camPitch=.36,this.meshObj.root.visible=!0)}teleportToHomeWakeup(){this.sitData=null,this.mode="WALK",this.position.set(-13,.16,-5),this.yaw=0,this.meshObj.root.position.copy(this.position),this.meshObj.root.rotation.y=this.yaw}update(t,e,n,s){const r=!!e;this.boostTimer>0&&(this.boostTimer=Math.max(0,this.boostTimer-t));const{dx:o,dy:a,zoom:c}=this.input.consumeOrbit();if(!n){const E=this.input.getKeyCameraTurn();E!==0&&(this.camYaw+=E*t*1.85),this.mode==="CAMERA"?(this.camYaw-=o*.0045,this.camPitch=Ue.clamp(this.camPitch+a*.004,-.45,.55)):(this.camYaw-=o*.006,this.camPitch=Ue.clamp(this.camPitch+a*.0045,.16,.92),this.targetCamDist=Ue.clamp(this.targetCamDist+c*.9,5.2,15.5))}let l=0;if(!n&&this.mode==="WALK"){const{forward:E,right:P}=this.input.getMoveAxes();if(E!==0||P!==0){const D=Math.hypot(E,P),k=E/D,B=P/D,Y=-Math.sin(this.camYaw)*k+Math.cos(this.camYaw)*B,Z=-Math.cos(this.camYaw)*k-Math.sin(this.camYaw)*B,X=this.input.isDown("ShiftLeft")||this.input.isDown("ShiftRight"),W=this.boostTimer>0?1.24:1,O=(X?6.6:4.2)*W;l=O;const nt=this.collision.resolve(this.position.x+Y*O*t,this.position.z+Z*O*t,.42);this.position.x=nt.x,this.position.z=nt.z;let ft=Math.atan2(Y,Z)-this.yaw;for(;ft>Math.PI;)ft-=Math.PI*2;for(;ft<-Math.PI;)ft+=Math.PI*2;if(this.yaw+=ft*Math.min(1,t*12),s){const Lt=r||this.position.x>21&&this.position.z>0&&this.position.z<17;s.playFootstep(Lt)}}const b=ye.getGroundHeight(this.position.x,this.position.z),S=r?Math.max(b,.16):b;this.position.y+=(S-this.position.y)*Math.min(1,t*14)}else if(!n&&this.mode==="SIT"){const{forward:E,right:P}=this.input.getMoveAxes();(E!==0||P!==0)&&this.standUp()}if(this.speed=l,this.meshObj.root.position.copy(this.position),this.meshObj.root.rotation.y=this.yaw,this.meshObj.animate(performance.now()*.001,l,this.mode==="SIT"),this.mode==="CAMERA"){this.camera.position.set(this.position.x,this.position.y+1.52,this.position.z);const E=-Math.sin(this.camYaw)*Math.cos(this.camPitch),P=-Math.sin(this.camPitch),b=-Math.cos(this.camYaw)*Math.cos(this.camPitch);this._lookTarget.set(this.camera.position.x+E*10,this.camera.position.y+P*10,this.camera.position.z+b*10),this.camera.lookAt(this._lookTarget);return}const h=r?Math.min(this.targetCamDist,7.2):this.targetCamDist,u=r?Math.max(this.camPitch,.78):this.camPitch,f=Math.cos(u)*h,d=Math.sin(u)*h;this._lookTarget.set(this.position.x,this.position.y+1.25,this.position.z);const g=this._lookTarget.x+Math.sin(this.camYaw)*f,_=this._lookTarget.y+d,m=this._lookTarget.z+Math.cos(this.camYaw)*f,p=e?e.id:null,M=this.collision.castCameraRay(this._lookTarget.x,this._lookTarget.y,this._lookTarget.z,g,_,m,p),v=M<1?Math.max(2.3,h*M-.55):h;this.camDist+=(v-this.camDist)*Math.min(1,t*(v<this.camDist?18:7));const x=Math.cos(u)*this.camDist,L=Math.sin(u)*this.camDist;this._desiredCamPos.set(this._lookTarget.x+Math.sin(this.camYaw)*x,this._lookTarget.y+L,this._lookTarget.z+Math.cos(this.camYaw)*x);const A=ye.getGroundHeight(this._desiredCamPos.x,this._desiredCamPos.z);this._desiredCamPos.y<A+.8&&(this._desiredCamPos.y=A+.8),this._camInitialized?this.camera.position.lerp(this._desiredCamPos,Math.min(1,t*12)):(this.camera.position.copy(this._desiredCamPos),this._camInitialized=!0),this.camera.lookAt(this._lookTarget)}}const gc={bakeryCounter:{x:-11.5,z:9.2,label:"在木漏れ日面包店忙碌"},bakeryPorch:{x:-11.5,z:4.5,label:"在面包店门口打扫"},catBakerySun:{x:-11.2,z:4.6,label:"在面包店门口晒太阳"},catShrineNap:{x:44.6,z:-3.6,label:"在樱森神社台阶边打盹"},catRiverNap:{x:20,z:-4.2,label:"在樱川河堤舔毛发呆"},catAobaNap:{x:12.2,z:4.4,label:"在青叶商店门前打瞌睡"},aobaCounter:{x:10.2,z:9.2,label:"在青叶商店看店"},aobaBench:{x:12.4,z:4.4,label:"在青叶商店门前乘凉"},riverBenchNorth:{x:20,z:-4.2,label:"在樱川河畔散步"},riverBenchSouth:{x:20,z:8.2,label:"在樱花河堤吹风"},bridgeCenter:{x:29,z:2.1,label:"在樱川红桥上写生"},shrinePlaza:{x:45.2,z:-4.2,label:"在樱森神社参拜"},stationPlatform:{x:-16.2,z:-21.8,label:"在樱花站月台看电车"},crossingSouth:{x:-2,z:-13.6,label:"在铁道口等电车经过"},northField:{x:-4.2,z:-28.5,label:"在北侧田野边玩耍"},pierBank:{x:19.6,z:13.8,label:"在钓鱼栈道旁看河水"},bakeryCafeTable:{x:-10.3,z:7.4,label:"在面包店里喝咖啡"},streetPlaza:{x:-2.6,z:1.6,label:"在商店街闲逛"}};function G0(i,t,e,n){const s=[],r=(c,l)=>s.push(new C(c,0,l));let o=i,a=t;return a>5.8&&o<-6&&o>-16&&!(n>5.8&&e<-6&&e>-16)?(r(-11.5,4.4),o=-11.5,a=4.4):a>5.8&&o>5.5&&o<15&&!(n>5.8&&e>5.5&&e<15)&&(r(10.2,4.4),o=10.2,a=4.4),o>35&&e<25&&(r(41.2,1.7),r(36,2.1),r(21,2.1),o=21,a=2.1),a<-18&&n>-18?(o<-10&&r(-6,-22.2),r(0,-22),r(0,-14.2),o=0,a=-14.2):a>-18&&n<-18&&(r(0,-14.2),r(0,-22),o=0,a=-22,e<-10&&n>-25&&r(-6,-22.2)),o<25&&e>35&&(r(20.5,2.1),r(36.5,2.1),r(41.2,1.7)),n>5.8&&e<-6&&e>-16?r(-11.5,4.4):n>5.8&&e>5.5&&e<15&&r(10.2,4.4),r(e,n),s}class W0{constructor(t){this.scene=t,this.npcs=[]}build(){const t=[{id:"misaki",name:"美咲",role:"「木漏れ日」面包咖啡馆店主",mapColor:"#e87893",isCat:!1,meshOpts:{scale:.94,hairColor:6044718,hairStyle:"ponytail",shirtColor:16775148,apronColor:14250890,pantsColor:7034441},schedule:[{from:0,to:7.5,spot:"bakeryPorch"},{from:7.5,to:18,spot:"bakeryCounter"},{from:18,to:21,spot:"riverBenchSouth"},{from:21,to:24.1,spot:"bakeryCounter"}],scheduleSummary:"06:00 店前清扫 · 07:30-18:00 面包店营业 · 18:00-21:00 樱川河堤散步"},{id:"genzo",name:"源造爷爷",role:"「青叶商店」老店主",mapColor:"#4c8c64",isCat:!1,meshOpts:{scale:.92,hairColor:14079182,hairStyle:"short",shirtColor:15261900,jacketColor:6189148,apronColor:3496056,pantsColor:4540750},schedule:[{from:0,to:8.2,spot:"shrinePlaza"},{from:8.2,to:18.8,spot:"aobaCounter"},{from:18.8,to:22,spot:"aobaBench"},{from:22,to:24.1,spot:"aobaCounter"}],scheduleSummary:"清晨 樱森神社散步 · 08:15-18:45 青叶商店营业 · 傍晚 店前长椅纳凉"},{id:"yuu",name:"小悠",role:"热爱电车的小学生",mapColor:"#e8a23c",isCat:!1,meshOpts:{scale:.72,hairColor:3418662,hairStyle:"short",hatColor:15911244,shirtColor:16118506,jacketColor:4880552,pantsColor:3951715,hasBackpack:!0},schedule:[{from:0,to:10.5,spot:"crossingSouth"},{from:10.5,to:14.5,spot:"northField"},{from:14.5,to:18.2,spot:"pierBank"},{from:18.2,to:24.1,spot:"streetPlaza"}],scheduleSummary:"上午 铁道口看电车 · 中午 北侧田野 · 午后 河畔栈道 · 傍晚 商店街"},{id:"haruto",name:"晴人",role:"旅居小镇的摄影师",mapColor:"#5685b8",isCat:!1,meshOpts:{scale:1,hairColor:2895930,hairStyle:"short",shirtColor:15725301,jacketColor:8088924,pantsColor:4145994,hasCamera:!0},schedule:[{from:0,to:11,spot:"bridgeCenter"},{from:11,to:14,spot:"bakeryCafeTable"},{from:14,to:17.5,spot:"shrinePlaza"},{from:17.5,to:24.1,spot:"stationPlatform"}],scheduleSummary:"上午 樱川红桥写生拍照 · 中午 面包店喝咖啡 · 午后 神社 · 黄昏 樱花站月台"},{id:"mikan",name:"阿橘",role:"小镇的橘色招财猫",mapColor:"#f28c38",isCat:!0,schedule:[{from:0,to:10,spot:"catBakerySun"},{from:10,to:15,spot:"catShrineNap"},{from:15,to:19,spot:"catRiverNap"},{from:19,to:24.1,spot:"catAobaNap"}],scheduleSummary:"喜欢晒太阳，经常在面包店门口、神社台阶、河堤与杂货店前打盹"}];for(const e of t){const n=e.isCat?H0():dl(e.meshOpts),s=this._getSpotKeyForHour(e,8.25),r=gc[s],o=ye.getGroundHeight(r.x,r.z),a={...e,meshObj:n,position:new C(r.x,o,r.z),yaw:0,currentSpotKey:s,activityLabel:r.label,path:[],waitingAtCrossing:!1,talkingToPlayer:!1};n.root.position.copy(a.position),this.scene.add(n.root),this.npcs.push(a)}}_getSpotKeyForHour(t,e){for(const n of t.schedule)if(e>=n.from&&e<n.to)return n.spot;return t.schedule[0].spot}update(t,e,n,s){const r=performance.now()*.001;for(const o of this.npcs){const a=this._getSpotKeyForHour(o,e);if(a!==o.currentSpotKey){o.currentSpotKey=a;const h=gc[a];o.activityLabel=h.label,o.path=G0(o.position.x,o.position.z,h.x,h.z)}let c=0;if(o.talkingToPlayer){let u=Math.atan2(s.x-o.position.x,s.z-o.position.z)-o.yaw;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;o.yaw+=u*Math.min(1,t*8)}else if(o.path.length>0){const h=o.path[0],u=h.x-o.position.x,f=h.z-o.position.z,d=Math.hypot(u,f),g=n.gatesClosed&&o.position.z>-15.3&&o.position.z<-13.4&&Math.abs(o.position.x)<3.8&&f<0,_=n.gatesClosed&&o.position.z<-20.7&&o.position.z>-22.6&&Math.abs(o.position.x)<3.8&&f>0;if(o.waitingAtCrossing=g||_,!o.waitingAtCrossing)if(d<.3)o.path.shift();else{const m=o.isCat?2.1:2.35;c=m;const p=Math.min(d,m*t);o.position.x+=u/d*p,o.position.z+=f/d*p;let v=Math.atan2(u,f)-o.yaw;for(;v>Math.PI;)v-=Math.PI*2;for(;v<-Math.PI;)v+=Math.PI*2;o.yaw+=v*Math.min(1,t*9)}}else if(o.position.distanceTo(s)<4.5){let u=Math.atan2(s.x-o.position.x,s.z-o.position.z)-o.yaw;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;o.yaw+=u*Math.min(1,t*3.5)}const l=ye.getGroundHeight(o.position.x,o.position.z);o.position.y+=(l-o.position.y)*Math.min(1,t*12),o.meshObj.root.position.copy(o.position),o.meshObj.root.rotation.y=o.yaw,o.meshObj.animate(r+o.position.x*.2,c,!1)}}}const zs={sakura_anpan:{name:"刚出炉的樱花红豆包",desc:"美咲亲手烤制，还带着暖呼呼的樱叶香气。",price:180,edible:!0},melonpan:{name:"脆皮菠萝包",desc:"金黄酥脆，散步时吃一口心情会变好。",price:160,edible:!0},matcha_latte:{name:"冰镇抹茶拿铁",desc:"微苦回甘，喝完步履轻快。",price:220,edible:!0,boost:!0},ramune:{name:"弹珠汽水",desc:"青叶商店招牌冰饮，带着清脆的气泡声。",price:140,edible:!0,boost:!0},canned_coffee:{name:"自动售货机热咖啡",desc:"街头售货机买的温暖罐装咖啡，提神又暖手。",price:120,edible:!0,boost:!0},peach_water:{name:"白桃气泡水",desc:"春日限定清甜白桃饮品。",price:130,edible:!0,boost:!0},postcard:{name:"樱花小镇明信片",desc:"印着樱川红桥与电车的明信片，可以去邮筒寄出。",price:100},ayu_fish:{name:"樱川香鱼",desc:"清澈河水里钓到的银亮香鱼，橘猫阿橘最喜欢了。",sellPrice:160},yamame_fish:{name:"山女鱼",desc:"带着漂亮斑纹的溪流鱼。",sellPrice:220},river_crab:{name:"河岸小螃蟹",desc:"举着小钳子的活泼河蟹。",sellPrice:120},koi_fish:{name:"锦鲤（放生留念）",desc:"河底偶遇的华丽锦鲤，带来好兆头！",sellPrice:380},brass_bell:{name:"小悠的电车铜铃",desc:"河水冲刷得闪闪发亮的小电车挂件，该还给小悠了。",questItem:!0},clover_charm:{name:"四叶草护身符",desc:"阿橘送给你的春日幸运礼物。",questItem:!0},omikuji:{name:"樱森神社御神签",desc:"在樱森神社抽到的签纸，记着温柔的祝福。"}};class X0{constructor(){this.yen=650,this.inventory={melonpan:1},this.photos=[],this.latestOmikuji=null,this.postedPostcards=0,this.tasks={anpan_delivery:{id:"anpan_delivery",title:"趁热送去的樱花红豆包",status:"available",hint:"把美咲刚烤好的「樱花红豆包」送到街对面青叶商店的源造爷爷手中。",doneText:"源造爷爷收到热乎乎的樱花红豆包非常开心，还聊起了小镇往事。"},lost_bell:{id:"lost_bell",title:"遗落在樱川边的电车铜铃",status:"available",hint:"去东侧河畔的木栈道垂钓，帮小悠找回掉进河里的电车铜铃。",doneText:"从樱川里钓回了闪亮的铜铃，小悠开心地挂回了书包上。"},train_photo:{id:"train_photo",title:"樱花电车经过的瞬间",status:"available",hint:"按 C 打开胶片相机，拍下「樱花电车」驶过小镇或车站的照片，拿给摄影师晴人看。",doneText:"成功定格了电车驶过樱花山谷的画面，晴人把这张照片珍藏进了画册。"},feed_cat:{id:"feed_cat",title:"给阿橘的新鲜小鱼",status:"available",hint:"在河畔木栈道钓一条樱川香鱼（或溪流鱼），分给小镇橘猫「阿橘」。",doneText:"阿橘吃得呼噜直响，还用爪子推来一枚四叶草幸运护身符！"},shrine_wish:{id:"shrine_wish",title:"樱森神社的祈愿与来信",status:"available",hint:"走过红桥登上樱森神社摇铃抽签，或在青叶商店买一张明信片投入红色邮筒。",doneText:"在千年枝垂樱下听见清脆铃音，也把春天的问候寄向了远方。"}}}addItem(t,e=1){this.inventory[t]=(this.inventory[t]||0)+e}removeItem(t,e=1){return(this.inventory[t]||0)<e?!1:(this.inventory[t]-=e,this.inventory[t]<=0&&delete this.inventory[t],!0)}hasItem(t,e=1){return(this.inventory[t]||0)>=e}hasAnyFish(){return this.hasItem("ayu_fish")||this.hasItem("yamame_fish")||this.hasItem("river_crab")}consumeOneFish(){return this.hasItem("ayu_fish")?this.removeItem("ayu_fish",1):this.hasItem("yamame_fish")?this.removeItem("yamame_fish",1):this.hasItem("river_crab")?this.removeItem("river_crab",1):!1}spendYen(t){return this.yen<t?!1:(this.yen-=t,!0)}addYen(t){this.yen+=t}startTask(t){const e=this.tasks[t];return e&&e.status==="available"?(e.status="active",!0):!1}completeTask(t){const e=this.tasks[t];return e&&e.status!=="done"?(e.status="done",!0):!1}hasTrainPhoto(){return this.photos.some(t=>t.tags.includes("train"))}getActiveTasks(){return Object.values(this.tasks).filter(t=>t.status==="active")}}class Y0{constructor(t,e,n,s){this.scene=t,this.gameState=e,this.audio=n,this.ui=s,this.active=!1,this.phase="IDLE",this.waitTimer=0,this.cursorPos=0,this.cursorDir=1,this.sweetStart=.36,this.sweetEnd=.64,this.castCount=0,this.rigGroup=new Nt,this.rigGroup.visible=!1;const r=new I(new Yt(.015,.032,2.8,6),V(8147764));r.position.set(26.7,.52,14),r.rotation.z=-1.05,this.rigGroup.add(r),this.bobber=new Nt;const o=new I(new ue(.11,8,8),V(15224146));o.position.y=.04;const a=new I(new ue(.11,8,8),V(16775922));a.position.y=-.03,this.bobber.add(o,a),this.bobber.position.set(29.2,-1.06,14),this.rigGroup.add(this.bobber),this.ripple=new I(new Wo(.18,.28,16),new Ie({color:16777215,transparent:!0,opacity:.7,side:ze})),this.ripple.rotation.x=-Math.PI/2,this.ripple.position.set(29.2,-1.08,14),this.rigGroup.add(this.ripple),this.line=new Qc(new Me().setFromPoints([new C(27.85,1.2,14),new C(29.2,-1.02,14)]),new Oo({color:16054524,transparent:!0,opacity:.75})),this.rigGroup.add(this.line),this.scene.add(this.rigGroup)}start(){this.active=!0,this.rigGroup.visible=!0,this._startNewCast(),this.ui.showFishingUI(!0)}stop(){this.active=!1,this.phase="IDLE",this.rigGroup.visible=!1,this.ui.showFishingUI(!1)}_startNewCast(){this.phase="WAITING",this.waitTimer=2+Math.random()*2.6,this.cursorPos=.05,this.cursorDir=1,this.audio.playSplash(),this.ui.updateFishingUI("WAITING",0,"浮漂轻轻晃动，静静等待鱼儿上钩…")}triggerPull(){if(this.active){if(this.phase==="WAITING"){this.ui.showToast("提竿太早啦，鱼儿还没咬钩呢！重新抛竿…"),this._startNewCast();return}this.phase==="BITING"&&(this.cursorPos>=this.sweetStart&&this.cursorPos<=this.sweetEnd?this._resolveCatch():(this.audio.playSplash(),this.ui.showToast("差一点点，鱼儿摆尾游走啦！再试一次吧"),this._startNewCast()))}}_resolveCatch(){if(this.castCount+=1,this.audio.playSuccessChime(),this.gameState.tasks.lost_bell.status==="active"&&!this.gameState.hasItem("brass_bell")&&(this.castCount>=2||Math.random()<.55)){this.gameState.addItem("brass_bell",1),this.ui.showToast("✨ 钓到了闪闪发亮的「小悠的电车铜铃」！快拿去还给小悠吧"),this._startNewCast();return}const e=Math.random();let n="ayu_fish",s="🐟 钓到了银亮的「樱川香鱼」！";e>.88?(n="koi_fish",s="✨ 好运气！河底跃出一尾华丽的「锦鲤」！"):e>.6?(n="yamame_fish",s="🐟 钓到了清流里的「山女鱼」！"):e>.42&&(n="river_crab",s="🦀 钓起一只举着钳子的「河岸小螃蟹」！"),this.gameState.addItem(n,1),this.ui.showToast(s),this._startNewCast()}update(t){if(!this.active)return;const e=performance.now()*.001;if(this.phase==="WAITING"){this.waitTimer-=t,this.bobber.position.y=-1.06+Math.sin(e*3.5)*.04;const n=.8+e*.6%1*.9;this.ripple.scale.setScalar(n),this.ripple.material.opacity=Math.max(0,.7-e*.6%1*.7),this.waitTimer<=0&&(this.phase="BITING",this.cursorPos=.05,this.cursorDir=1,this.audio.playSplash(),this.ui.updateFishingUI("BITING",this.cursorPos,"⚡ 浮漂沉下去了！看准时机提竿！"))}else this.phase==="BITING"&&(this.bobber.position.y=-1.2+Math.sin(e*24)*.06,this.ripple.scale.setScalar(1.3+Math.sin(e*16)*.35),this.ripple.material.opacity=.85,this.cursorPos+=this.cursorDir*t*1.05,this.cursorPos>=.98?(this.cursorPos=.98,this.cursorDir=-1):this.cursorPos<=.02&&(this.cursorPos=.02,this.cursorDir=1),this.ui.updateFishingUI("BITING",this.cursorPos,"⚡ 鱼儿咬钩了！在樱粉色区域按下 E 或 Space！"))}}class q0{constructor(t,e,n,s,r,o,a,c,l){this.renderer=t,this.scene=e,this.camera=n,this.gameState=s,this.railway=r,this.npcSystem=o,this.timeSystem=a,this.audio=c,this.ui=l,this._frustum=new Ys,this._projScreenMatrix=new se,this._tmpVec=new C}analyzeFrame(){this.camera.updateMatrixWorld(),this._projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._projScreenMatrix);const t=[],e=[],n=this.railway.getStatus();n.isVisibleInTown&&(this._tmpVec.set(n.trainX,2,this.railway.trackZ),this.camera.position.distanceTo(this._tmpVec)<78&&this._frustum.containsPoint(this._tmpVec)&&(t.push("train"),e.push("樱花电车"))),this._tmpVec.set(45.5,4,-7),this.camera.position.distanceTo(this._tmpVec)<70&&this._frustum.containsPoint(this._tmpVec)&&(t.push("shrine"),e.push("樱森神社")),this._tmpVec.set(29,1.5,2.1),this.camera.position.distanceTo(this._tmpVec)<55&&this._frustum.containsPoint(this._tmpVec)&&(t.push("bridge"),e.push("樱川红桥"));for(const s of this.npcSystem.npcs)if(this._tmpVec.set(s.position.x,s.position.y+1,s.position.z),this.camera.position.distanceTo(this._tmpVec)<28&&this._frustum.containsPoint(this._tmpVec)){t.push(`npc_${s.id}`),e.push(s.name);break}return this.timeSystem.hour>=16.5&&this.timeSystem.hour<=19.2&&(t.push("sunset"),e.push("黄昏暮色")),{tags:t,labels:e}}capturePhoto(){this.audio.playCameraShutter(),this.ui.triggerCameraFlash();const t=this.analyzeFrame();this.renderer.render(this.scene,this.camera);const e=this.renderer.domElement,n=document.createElement("canvas");n.width=480,n.height=300;const s=n.getContext("2d"),r=e.width/e.height,o=n.width/n.height;let a=0,c=0,l=e.width,h=e.height;r>o?(l=e.height*o,a=(e.width-l)/2):(h=e.width/o,c=(e.height-h)/2),s.drawImage(e,a,c,l,h,0,0,n.width,n.height),s.fillStyle="rgba(255, 198, 120, 0.92)",s.font="bold 14px monospace",s.fillText(`DAY ${this.timeSystem.day}  ${this.timeSystem.getFormattedTime()}`,n.width-135,n.height-14);const u=n.toDataURL("image/jpeg",.84),f=t.labels.length>0?t.labels.slice(0,2).join(" · "):"樱花小镇的午后风景",d={dataUrl:u,caption:f,timeLabel:`第 ${this.timeSystem.day} 天 ${this.timeSystem.getFormattedTime()}`,tags:t.tags};return this.gameState.photos.unshift(d),this.gameState.photos.length>18&&this.gameState.photos.pop(),this.ui.showToast(t.tags.includes("train")?"📸 拍到了「樱花电车」驶过的绝佳瞬间！快去给晴人看看吧":`📸 已保存照片「${f}」到小镇相册`),d}}const _c=[{rank:"大吉",text:"春风顺意，今日在樱川边会有意外的小确幸。"},{rank:"中吉",text:"放慢脚步听听道口的铃声，温柔的事正悄悄靠近。"},{rank:"吉",text:"一杯热茶配刚出炉的面包，便是最好的日常。"},{rank:"小吉",text:"偶遇橘猫时记得摸摸它的下巴，好运会翻倍。"}];class Z0{constructor(t){this.ctx=t,this.points=[],this.nearest=null,this._activeNpc=null}registerStaticPoints(){const{town:t,shrine:e,railway:n,terrain:s}=this.ctx;this.points=[];for(const r of[...s.benches,...t.benches,...e.benches,...n.benches])this.points.push({id:r.id,label:r.label,pos:new C(r.x,r.y,r.z),radius:2.3,action:()=>{this.ctx.audio.playUiClick(),this.ctx.player.sitOnBench(r),this.ctx.ui.showSitBar(!0)}});this.points.push({id:"fishing_pier",label:"在樱川木栈道垂钓",pos:new C(25.4,-.62,14),radius:2.8,action:()=>{this.ctx.player.enterFishing(new C(25.6,-.62,14),Math.PI/2),this.ctx.fishing.start()}}),this.points.push({id:"vending",label:"使用街头自动售货机",pos:t.landmarks.vending,radius:2.4,action:()=>this._openVendingDialogue()}),this.points.push({id:"shrine_bell",label:"摇铃参拜 · 抽御神签",pos:e.landmarks.shrineOffering,radius:2.8,action:()=>this._openShrineDialogue()}),this.points.push({id:"postbox",label:"查看红色邮筒",pos:t.landmarks.postbox,radius:2.3,action:()=>this._openPostboxDialogue()}),this.points.push({id:"notice_board",label:"阅读町内掲示板",pos:t.landmarks.noticeBoard,radius:2.6,action:()=>this._openNoticeBoardDialogue()}),this.points.push({id:"timetable",label:"查看樱花站电车时刻表",pos:n.landmarks.stationTimetable,radius:2.5,action:()=>this._openTimetableDialogue()}),this.points.push({id:"home_futon",label:"在暖和的被褥里休息到明早",pos:t.landmarks.futon,radius:2.4,action:()=>this._openSleepDialogue()})}findNearest(t){let e=null,n=1/0;for(const s of this.ctx.npcSystem.npcs){const r=t.distanceTo(s.position);r<2.65&&r<n&&(n=r,e={id:`npc_${s.id}`,label:s.isCat?`抚摸${s.name}`:`和${s.name}聊聊天`,action:()=>this._openNpcDialogue(s)})}for(const s of this.points){const r=t.distanceTo(s.pos);r<s.radius&&r<n&&(n=r,e=s)}return this.nearest=e,e}triggerNearest(){this.nearest&&this.nearest.action()}closeDialogue(){this._activeNpc&&(this._activeNpc.talkingToPlayer=!1,this._activeNpc=null),this.ctx.ui.hideDialogue()}_openNpcDialogue(t){this._activeNpc=t,t.talkingToPlayer=!0,this.ctx.audio.playUiClick(),t.id==="misaki"?this._talkMisaki(t):t.id==="genzo"?this._talkGenzo(t):t.id==="yuu"?this._talkYuu(t):t.id==="haruto"?this._talkHaruto(t):t.id==="mikan"&&this._talkMikan(t)}_talkMisaki(t){const e=this.ctx.gameState,n=e.tasks.anpan_delivery,s=this.ctx.timeSystem.hour,r=s<11?"早安呀！今天刚烤好的面包带着樱叶香气，闻着就让人心情舒畅。":s<18?"欢迎光临「木漏れ日」！散步累了的话，来块刚出炉的面包吧。":"傍晚的河风真舒服呢，忙完一天最喜欢在樱花树下发会儿呆了。",o=[];n.status==="available"?o.push({label:"「需要帮忙送刚出炉的红豆包吗？」",primary:!0,onClick:()=>{e.startTask("anpan_delivery"),e.addItem("sakura_anpan",1),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast("🥖 收到「刚出炉的樱花红豆包」 · 新见闻已记入手账"),this.ctx.ui.showDialogue(t.name,t.role,"呀，正好麻烦你啦！这炉「樱花红豆包」特别松软，街对面青叶商店的源造爷爷最爱趁热吃。帮我送一个过去吧？",[{label:"包在我身上！",primary:!0,onClick:()=>this.closeDialogue()}])}}):n.status==="active"&&o.push({label:"关于红豆包的去向",onClick:()=>this.ctx.ui.showDialogue(t.name,t.role,"源造爷爷平时上午到傍晚都在街对面的「青叶商店」看店哦，傍晚有时会坐在店门前的木凳上乘凉。",[{label:"好的，我这就去",onClick:()=>this.closeDialogue()}])}),o.push({label:"买点面包和咖啡",onClick:()=>this._openShopMenu(t,["sakura_anpan","melonpan","matcha_latte"])}),o.push({label:"先逛逛再聊",onClick:()=>this.closeDialogue()}),this.ctx.ui.showDialogue(t.name,t.role,r,o)}_talkGenzo(t){const e=this.ctx.gameState,n=e.tasks.anpan_delivery,s=[];n.status==="active"&&e.hasItem("sakura_anpan")&&s.push({label:"把热乎乎的「樱花红豆包」递给爷爷",primary:!0,onClick:()=>{e.removeItem("sakura_anpan",1),e.completeTask("anpan_delivery"),e.addYen(320),e.addItem("ramune",1),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast("🎉 完成见闻「趁热送去的樱花红豆包」！获得 ¥320 与弹珠汽水"),this.ctx.ui.showDialogue(t.name,t.role,`哦吼！还热乎着呢！美咲这丫头手艺真是越来越好了，香气跟三十年前的老面包房一模一样。
谢谢你跑这一趟，这瓶冰镇弹珠汽水和一点零花钱拿去路上喝吧！`,[{label:"谢谢源造爷爷！",primary:!0,onClick:()=>this.closeDialogue()}])}});const o=["ayu_fish","yamame_fish","river_crab","koi_fish"].filter(c=>e.hasItem(c));o.length>0&&s.push({label:"把钓到的樱川渔获寄售给商店",onClick:()=>{let c=0;for(const l of o){const h=e.inventory[l]||0;c+=h*(zs[l].sellPrice||120),e.removeItem(l,h)}e.addYen(c),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast(`💰 源造爷爷收下了新鲜河鲜，获得 ¥${c}`),this.ctx.ui.showDialogue(t.name,t.role,`哟，真新鲜的樱川鱼货！镇上好几户人家晚上正好想煮鱼汤呢，这 ¥${c} 你收好。`,[{label:"多谢照顾生意！",onClick:()=>this.closeDialogue()}])}}),s.push({label:"逛逛杂货与明信片",onClick:()=>this._openShopMenu(t,["postcard","ramune","peach_water"])}),s.push({label:"告辞",onClick:()=>this.closeDialogue()});const a=this.ctx.timeSystem.hour<8.5?"早上好呀，年轻人！一大早去樱森神社走走，身子骨都舒坦多了。":"欢迎欢迎！青叶商店里弹珠汽水、樱花明信片什么都有。要是去河边钓鱼了，也可以拿来我这儿换零花钱。";this.ctx.ui.showDialogue(t.name,t.role,a,s)}_talkYuu(t){const e=this.ctx.gameState,n=e.tasks.lost_bell,s=[];n.status==="active"&&e.hasItem("brass_bell")?s.push({label:"把钓上来的「电车铜铃」还给小悠",primary:!0,onClick:()=>{e.removeItem("brass_bell",1),e.completeTask("lost_bell"),e.addYen(280),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast("🎉 完成见闻「遗落在樱川边的电车铜铃」！获得 ¥280"),this.ctx.ui.showDialogue(t.name,t.role,`哇！！真的是我的小电车铜铃！居然真的在樱川河底找到了！
听，摇起来声音跟道口一模一样！太感谢了，这是我攒的零花钱，一定要收下！`,[{label:"以后看电车要拿稳哦",primary:!0,onClick:()=>this.closeDialogue()}])}}):n.status==="available"&&s.push({label:"「你在找什么东西吗？」",primary:!0,onClick:()=>{e.startTask("lost_bell"),this.ctx.ui.showToast("📝 新见闻已记入手账：遗落在樱川边的电车铜铃"),this.ctx.ui.showDialogue(t.name,t.role,`呜…刚才听见樱花电车过铁桥的声音太兴奋，我不小心把最喜欢的「电车铜铃」掉进樱川里了…
听说顺着水流漂到东边「钓鱼木栈道」那儿去了，如果你去钓鱼的时候捞到它，能帮我带回来吗？`,[{label:"没问题，我去木栈道试试！",primary:!0,onClick:()=>this.closeDialogue()}])}}),s.push({label:"聊聊樱花电车",onClick:()=>{const o=this.ctx.railway.getStatus(),a=o.state==="IDLE"?`下一趟电车大概 ${o.nextArrivalSec} 秒后就会从山洞里钻出来哦！道口会发出「叮当叮当」的声音！`:"快看快看！电车正在小镇里运行呢！绿白涂装的两节车厢最帅了！";this.ctx.ui.showDialogue(t.name,t.role,a,[{label:"一起听电车声吧",onClick:()=>this.closeDialogue()}])}}),s.push({label:"待会儿见",onClick:()=>this.closeDialogue()});const r=n.status==="done"?"嘿嘿，我的电车铜铃现在牢牢系在书包上啦！今天电车也在准点运行哦！":"每次听见「叮当叮当」的道口铃声，我就忍不住想冲过去看两节绿白电车开过红铁桥！";this.ctx.ui.showDialogue(t.name,t.role,r,s)}_talkHaruto(t){const e=this.ctx.gameState,n=e.tasks.train_photo,s=[];n.status!=="done"&&e.hasTrainPhoto()?s.push({label:"把刚拍下的「樱花电车照片」给晴人看",primary:!0,onClick:()=>{e.completeTask("train_photo"),e.addYen(350),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast("🎉 完成见闻「樱花电车经过的瞬间」！获得 ¥350"),this.ctx.ui.showDialogue(t.name,t.role,`太棒了！光线、山谷和驶过樱花林的电车构图都恰到好处，像动画电影的一帧一样。
谢谢你和我分享这张胶片，这一点冲洗费和谢礼请收下！`,[{label:"能拍到真是太好了",primary:!0,onClick:()=>this.closeDialogue()}])}}):n.status==="available"&&s.push({label:"「在拍什么题材的照片？」",primary:!0,onClick:()=>{e.startTask("train_photo"),this.ctx.ui.showToast("📸 新见闻已记入手账：樱花电车经过的瞬间"),this.ctx.ui.showDialogue(t.name,t.role,`我想收集一组「樱花电车穿过山谷」的胶片照，但一个人分身乏术。
按 C 键就能打开随身胶片机，等电车进站或经过道口时按下快门，拍到了拿给我看看好吗？`,[{label:"好呀，我留意电车时间！",primary:!0,onClick:()=>this.closeDialogue()}])}}),s.push({label:"祝你采风顺利",onClick:()=>this.closeDialogue()});const r=n.status==="done"?"这座山谷小镇无论清晨、午后还是黄昏，光线都温柔得不可思议。多按 C 键留住喜欢的瞬间吧。":"你好呀，我也刚来樱花小镇住下不久。站台、红桥和神社的视角都很适合拍照呢。";this.ctx.ui.showDialogue(t.name,t.role,r,s)}_talkMikan(t){const e=this.ctx.gameState,n=e.tasks.feed_cat;this.ctx.audio.playCatMeow();const s=[{label:"轻轻挠挠阿橘的下巴",onClick:()=>{this.ctx.audio.playCatMeow(),n.status==="available"&&(e.startTask("feed_cat"),this.ctx.ui.showToast("🐾 新见闻：阿橘似乎很想吃樱川里的新鲜小鱼")),this.ctx.ui.showDialogue(t.name,t.role,"喵呜～（阿橘眯起眼睛发出满足的呼噜声，闻了闻你的衣角，好像很期待樱川河里的新鲜小鱼呢。）",[{label:"好乖好乖",onClick:()=>this.closeDialogue()}])}}];e.hasAnyFish()&&s.unshift({label:"把一条新鲜河鱼分享给阿橘",primary:!0,onClick:()=>{e.consumeOneFish(),this.ctx.audio.playCatMeow(),n.status!=="done"?(e.completeTask("feed_cat"),e.addItem("clover_charm",1),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast("🎉 完成见闻「给阿橘的新鲜小鱼」！获得「四叶草护身符」"),this.ctx.ui.showDialogue(t.name,t.role,"喵呜！！（阿橘开心地大快朵颐，吃完后用毛茸茸的脑袋蹭了蹭你的裤脚，还用爪子推来一枚「四叶草护身符」！）",[{label:"谢谢你，阿橘！",primary:!0,onClick:()=>this.closeDialogue()}])):this.ctx.ui.showDialogue(t.name,t.role,"喵～（阿橘吃得心满意足，在阳光下打了个滚！）",[{label:"慢慢晒太阳吧",onClick:()=>this.closeDialogue()}])}}),s.push({label:"挥手告别",onClick:()=>this.closeDialogue()}),this.ctx.ui.showDialogue(t.name,t.role,"喵～？（圆滚滚的橘猫歪着头望着你，脖子上的金色小铃铛轻响了一下。）",s)}_openShopMenu(t,e){const n=this.ctx.gameState,s=e.map(r=>{const o=zs[r];return{label:`${o.name}（¥${o.price}）`,disabled:n.yen<o.price,onClick:()=>{n.spendYen(o.price)&&(n.addItem(r,1),this.ctx.audio.playSuccessChime(),this.ctx.ui.showToast(`🛍 购买了「${o.name}」`),this._openShopMenu(t,e))}}});s.push({label:"谢谢，暂时这些就好",onClick:()=>this.closeDialogue()}),this.ctx.ui.showDialogue(t.name,`${t.role} · 当前持有 ¥${n.yen}`,"看看今天想带点什么回去吧？（买到的饮品和面包可以在手账→随身行囊里享用哦）",s)}_openVendingDialogue(){const t=this.ctx.gameState;this.ctx.audio.playUiClick();const e=["canned_coffee","peach_water"].map(n=>{const s=zs[n];return{label:`投币购买 ${s.name}（¥${s.price}）`,disabled:t.yen<s.price,primary:n==="peach_water",onClick:()=>{t.spendYen(s.price)&&(this.ctx.audio.playVendingClunk(),this.ctx.player.grantSpeedBoost(40),this.ctx.ui.showToast(`🥤 「哐当！」喝下${s.name}，脚步变得轻快了！`),this.closeDialogue())}}});e.push({label:"先不买了",onClick:()=>this.closeDialogue()}),this.ctx.ui.showDialogue("自动售货机",`商店街街角 · 当前持有 ¥${t.yen}`,"霓虹微亮的红白售货机，摆着冰镇白桃气泡水与微温的罐装咖啡。买一罐喝下还能短暂提升散步速度！",e)}_openShrineDialogue(){const t=this.ctx.gameState;this.ctx.audio.playUiClick();const e=[{label:"投入香油钱 ¥50 · 摇铃抽御神签",primary:!0,disabled:t.yen<50,onClick:()=>{t.spendYen(50),this.ctx.shrine.ringBell(),this.ctx.audio.playShrineBell();const n=_c[Math.floor(Math.random()*_c.length)];t.latestOmikuji=n,t.addItem("omikuji",1),t.tasks.shrine_wish.status!=="done"&&(t.completeTask("shrine_wish"),this.ctx.ui.showToast("⛩ 完成见闻「樱森神社的祈愿与来信」")),this.ctx.ui.showDialogue("樱森神社 · 御神签",`签运：【${n.rank}】`,`清脆的铜铃在山谷间回荡。
你展开折叠的签纸，上面工整地写着：
「${n.text}」`,[{label:"收进手账，心怀感谢",primary:!0,onClick:()=>this.closeDialogue()}])}},{label:"只是轻轻摇铃祈愿",onClick:()=>{this.ctx.shrine.ringBell(),this.ctx.audio.playShrineBell(),this.ctx.ui.showToast("🔔 神社铜铃悠悠响起，樱花瓣随风落下…"),this.closeDialogue()}},{label:"离开",onClick:()=>this.closeDialogue()}];this.ctx.ui.showDialogue("樱森神社 · 拜殿","千年枝垂樱守护的山丘神社","朱红鸟居后是一片安静的石庭，微风吹过枝垂樱，花瓣飘落在赛钱箱旁。",e)}_openPostboxDialogue(){const t=this.ctx.gameState;this.ctx.audio.playUiClick();const e=[];t.hasItem("postcard")&&e.push({label:"寄出一张「樱花小镇明信片」",primary:!0,onClick:()=>{t.removeItem("postcard",1),t.postedPostcards+=1,this.ctx.audio.playSuccessChime(),t.tasks.shrine_wish.status!=="done"&&t.completeTask("shrine_wish"),this.ctx.ui.showToast("📮 明信片已投入红邮筒，把樱花小镇的春风寄向远方！"),this.closeDialogue()}}),e.push({label:"离开",onClick:()=>this.closeDialogue()});const n=t.hasItem("postcard")?"复古的红色圆柱邮筒，写着每日下午四点取信。要现在寄出从青叶商店买的樱花明信片吗？":"复古的红色圆柱邮筒。如果在「青叶商店」买了明信片，可以来这里寄给远方的朋友哦。";this.ctx.ui.showDialogue("樱花邮局 · 红色邮筒","〒 町内便",n,e)}_openNoticeBoardDialogue(){this.ctx.audio.playUiClick(),this.ctx.gameState.startTask("shrine_wish"),this.ctx.ui.showDialogue("町内掲示板","樱花小镇春季公告",`【樱花季便民贴士】
• 「木漏れ日」面包店早上出炉樱花红豆包，美咲好像正找人帮忙捎给源造爷爷。
• 樱川东侧木栈道已开放垂钓，听说小学生小悠在河边掉了心爱的铜铃。
• 樱花电铁约每分钟有一班列车经停「樱花站」，过道口请留意红灯与遮断杆。
• 欢迎跨过樱川红桥前往「樱森神社」摇铃抽签，或在黄昏欣赏山谷落日与萤火虫！`,[{label:"记在心里了",primary:!0,onClick:()=>this.closeDialogue()}])}_openTimetableDialogue(){this.ctx.audio.playUiClick();const t=this.ctx.railway.getStatus(),e=t.direction>0?"开往 河原方向（东行 ▶）":"开往 山口方向（西行 ◀）",n=t.state==="IDLE"?`下一班电车：约 ${t.nextArrivalSec} 秒后进站
运行方向：${e}`:`当前列车状态：${t.state==="BOARDING"?"正在樱花站停靠上下客":"正在小镇区间运行中"}
运行方向：${e}`;this.ctx.ui.showDialogue("樱花站 · 时刻表","樱花电铁 · 单线往返",`${n}

提示：按 C 键开启相机模式，可在月台或道口拍下电车驶过樱花山谷的瞬间。`,[{label:"知道了",primary:!0,onClick:()=>this.closeDialogue()}])}_openSleepDialogue(){this.ctx.audio.playUiClick(),this.ctx.ui.showDialogue("樱花小筑 · 温暖被褥",`第 ${this.ctx.timeSystem.day} 天 · ${this.ctx.timeSystem.getFormattedTime()}`,"叠得整整齐齐的樱花粉棉被散发着阳光晒过的香气。要休息一晚，迎接下一个晴朗的清晨吗？",[{label:"盖上被子，睡到明天早上 07:30",primary:!0,onClick:()=>{this.closeDialogue(),this.ctx.sleepCallback()}},{label:"再在小镇逛一会儿",onClick:()=>this.closeDialogue()}])}}class $0{constructor(){this.els={titleScreen:document.getElementById("title-screen"),btnStart:document.getElementById("btn-start"),hud:document.getElementById("hud"),weatherIcon:document.getElementById("hud-weather-icon"),day:document.getElementById("hud-day"),period:document.getElementById("hud-period"),clock:document.getElementById("hud-clock"),yen:document.getElementById("hud-yen"),location:document.getElementById("hud-location"),trainBanner:document.getElementById("hud-train-banner"),trainText:document.getElementById("hud-train-text"),minimap:document.getElementById("minimap-canvas"),btnNotebook:document.getElementById("btn-notebook"),btnCamera:document.getElementById("btn-camera"),btnSpeed:document.getElementById("btn-speed"),btnAudio:document.getElementById("btn-audio"),interactPrompt:document.getElementById("interact-prompt"),interactLabel:document.getElementById("interact-label"),activeTaskHint:document.getElementById("active-task-hint"),taskHintBody:document.getElementById("task-hint-body"),sitBar:document.getElementById("sit-bar"),btnStandUp:document.getElementById("btn-stand-up"),toastContainer:document.getElementById("toast-container"),dialogueOverlay:document.getElementById("dialogue-overlay"),dialogueSpeaker:document.getElementById("dialogue-speaker"),dialogueRole:document.getElementById("dialogue-role"),dialogueText:document.getElementById("dialogue-text"),dialogueChoices:document.getElementById("dialogue-choices"),fishingUi:document.getElementById("fishing-ui"),fishingStatus:document.getElementById("fishing-status"),fishingBarWrap:document.getElementById("fishing-bar-wrap"),fishingCursor:document.getElementById("fishing-cursor"),btnCancelFish:document.getElementById("btn-cancel-fish"),cameraUi:document.getElementById("camera-ui"),vfSubject:document.getElementById("vf-subject"),vfTime:document.getElementById("vf-time"),btnSnap:document.getElementById("btn-snap"),btnExitCam:document.getElementById("btn-exit-cam"),cameraFlash:document.getElementById("camera-flash"),notebookModal:document.getElementById("notebook-modal"),notebookBody:document.getElementById("notebook-body"),btnCloseNotebook:document.getElementById("btn-close-notebook"),fadeCurtain:document.getElementById("fade-curtain"),fadeMessage:document.getElementById("fade-message")},this.mmCtx=this.els.minimap.getContext("2d"),this.dialogueOpen=!1,this.notebookOpen=!1,this.currentTab="tasks",this._notebookContext=null,document.querySelectorAll(".nb-tab").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".nb-tab").forEach(e=>e.classList.remove("active")),t.classList.add("active"),this.currentTab=t.dataset.tab,this._notebookContext&&this.renderNotebook(this._notebookContext)})}),this.els.btnCloseNotebook.addEventListener("click",()=>this.toggleNotebook(!1))}hideTitleAndShowHud(){this.els.titleScreen.style.opacity="0",setTimeout(()=>this.els.titleScreen.classList.add("hidden"),450),this.els.hud.classList.remove("hidden")}showToast(t){const e=document.createElement("div");e.className="toast",e.textContent=t,this.els.toastContainer.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.35s ease",setTimeout(()=>e.remove(),360)},3400)}setPrompt(t,e=""){t&&!this.dialogueOpen&&!this.notebookOpen?(this.els.interactLabel.textContent=e,this.els.interactPrompt.classList.remove("hidden")):this.els.interactPrompt.classList.add("hidden")}showSitBar(t){this.els.sitBar.classList.toggle("hidden",!t)}showDialogue(t,e,n,s){this.dialogueOpen=!0,this.els.dialogueSpeaker.textContent=t,this.els.dialogueRole.textContent=e,this.els.dialogueText.textContent=n,this.els.dialogueChoices.innerHTML="";for(const r of s){const o=document.createElement("button");o.className=`choice-btn${r.primary?" primary":""}`,o.textContent=r.label,o.disabled=!!r.disabled,o.addEventListener("click",()=>{!o.disabled&&r.onClick&&r.onClick()}),this.els.dialogueChoices.appendChild(o)}this.els.dialogueOverlay.classList.remove("hidden"),this.setPrompt(!1)}hideDialogue(){this.dialogueOpen=!1,this.els.dialogueOverlay.classList.add("hidden")}showFishingUI(t){this.els.fishingUi.classList.toggle("hidden",!t)}updateFishingUI(t,e,n){this.els.fishingStatus.textContent=n,t==="BITING"?(this.els.fishingBarWrap.classList.remove("hidden"),this.els.fishingCursor.style.left=`${(e*100).toFixed(1)}%`):this.els.fishingBarWrap.classList.add("hidden")}showCameraUI(t){this.els.cameraUi.classList.toggle("hidden",!t),t&&this.setPrompt(!1)}updateCameraViewfinder(t,e){this.els.vfTime.textContent=e,this.els.vfSubject.textContent=t.length>0?`取景中：${t.join(" · ")}`:"构图中 · 拖动鼠标调整镜头"}triggerCameraFlash(){this.els.cameraFlash.classList.add("active"),requestAnimationFrame(()=>setTimeout(()=>this.els.cameraFlash.classList.remove("active"),40))}toggleNotebook(t,e=null){e&&(this._notebookContext=e),this.notebookOpen=typeof t=="boolean"?t:!this.notebookOpen,this.els.notebookModal.classList.toggle("hidden",!this.notebookOpen),this.notebookOpen&&this._notebookContext&&this.renderNotebook(this._notebookContext)}renderNotebook(t){const{gameState:e,npcSystem:n,player:s,audio:r}=t,o=this.els.notebookBody;if(o.innerHTML="",this.currentTab==="tasks")for(const a of Object.values(e.tasks)){const c=document.createElement("div");c.className=`nb-item${a.status==="done"?" done":""}`;const l=a.status==="done"?"已完成":a.status==="active"?"进行中":"等待发现";c.innerHTML=`
          <div>
            <div class="nb-item-title">${a.title}</div>
            <div class="nb-item-desc">${a.status==="done"?a.doneText:a.status==="active"?a.hint:"在小镇散步、和邻里聊天或看看公告板，或许会自然遇见这段小故事。"}</div>
          </div>
          <span class="nb-badge${a.status==="done"?" done":""}">${l}</span>
        `,o.appendChild(c)}else if(this.currentTab==="bag"){const a=Object.entries(e.inventory);if(a.length===0){o.innerHTML='<div class="empty-note">行囊还是空的，去逛逛面包店、杂货铺或河畔木栈道吧。</div>';return}for(const[c,l]of a){const h=zs[c];if(!h)continue;const u=document.createElement("div");if(u.className="nb-item",u.innerHTML=`<div><div class="nb-item-title">${h.name} × ${l}</div><div class="nb-item-desc">${h.desc}</div></div>`,h.edible){const f=document.createElement("button");f.className="btn-small",f.textContent="享用",f.addEventListener("click",()=>{e.removeItem(c,1),r.playSuccessChime(),h.boost&&s.grantSpeedBoost(40),this.showToast(`✨ 享用了「${h.name}」，心情暖洋洋的！`),this.renderNotebook(t)}),u.appendChild(f)}o.appendChild(u)}}else if(this.currentTab==="residents")for(const a of n.npcs){const c=document.createElement("div");c.className="nb-item",c.innerHTML=`
          <div>
            <div class="nb-item-title">${a.name} · <span style="font-weight:500;color:#766762">${a.role}</span></div>
            <div class="nb-item-desc"><b>此刻：</b>${a.waitingAtCrossing?"正在铁道口等待电车通过":a.activityLabel}<br/><b>日常作息：</b>${a.scheduleSummary}</div>
          </div>
          <span class="nb-badge" style="background:${a.mapColor}22;color:${a.mapColor}">居民</span>
        `,o.appendChild(c)}else if(this.currentTab==="album"){if(e.photos.length===0){o.innerHTML='<div class="empty-note">胶片相册还没有照片。<br/>随时按下 <kbd>C</kbd> 键举起相机，记录樱花、电车与河谷黄昏吧！</div>';return}const a=document.createElement("div");a.className="album-grid";for(const c of e.photos){const l=document.createElement("div");l.className="photo-card",l.innerHTML=`<img src="${c.dataUrl}" alt="${c.caption}" /><div class="photo-caption">${c.caption}</div><div class="photo-meta">${c.timeLabel}</div>`,a.appendChild(l)}o.appendChild(a)}}async playSleepFade(t,e){this.els.fadeMessage.textContent=t,this.els.fadeCurtain.classList.remove("hidden"),await new Promise(n=>requestAnimationFrame(n)),this.els.fadeCurtain.classList.add("visible"),await new Promise(n=>setTimeout(n,750)),e&&e(),await new Promise(n=>setTimeout(n,650)),this.els.fadeCurtain.classList.remove("visible"),await new Promise(n=>setTimeout(n,620)),this.els.fadeCurtain.classList.add("hidden")}updateHud(t,e,n,s,r,o,a){const c=t.getPeriodInfo();this.els.weatherIcon.textContent=c.icon,this.els.day.textContent=`第 ${t.day} 天`,this.els.period.textContent=c.label,this.els.clock.textContent=t.getFormattedTime(),this.els.yen.textContent=String(e.yen);let l="樱花小镇 · 商店街";r?l=r.name:n.x>36?l="樱森神社 · 千年枝垂樱":n.x>21&&n.z>10?l="樱川河畔 · 垂钓木栈道":n.x>21&&n.z>=-1&&n.z<=5?l="樱川红桥":n.z<-25?l="北侧铁道田野":n.x<-9&&n.z<-19?l="樱花电铁 · 樱花站月台":Math.abs(n.z+18)<4.5&&(l="樱花电铁 · 踏切道口"),this.els.location.textContent=l,o.state!=="IDLE"?(this.els.trainBanner.classList.remove("hidden"),this.els.trainText.textContent=o.state==="BOARDING"?"樱花电车正停靠樱花站":o.gatesClosed?"叮当叮当！电车正在通过道口":"樱花电车正在山谷间行驶"):this.els.trainBanner.classList.add("hidden");const h=e.getActiveTasks();h.length>0?(this.els.activeTaskHint.classList.remove("hidden"),this.els.taskHintBody.textContent=`• ${h[0].title}：${h[0].hint}`):this.els.activeTaskHint.classList.add("hidden"),this._drawMiniMap(n,s,o,a)}_drawMiniMap(t,e,n,s){const r=this.mmCtx,o=148,a=148;r.clearRect(0,0,o,a);const c=d=>(d+42)/102*o,l=d=>(d+42)/76*a;r.fillStyle="#cfe5bd",r.fillRect(0,0,o,a),r.strokeStyle="#6ec2e2",r.lineWidth=12,r.beginPath();for(let d=-42;d<=34;d+=4){const g=ye.getRiverCenterX(d);d===-42?r.moveTo(c(g),l(d)):r.lineTo(c(g),l(d))}r.stroke(),r.strokeStyle="#9aa0a8",r.lineWidth=6,r.beginPath(),r.moveTo(c(-30),l(2.1)),r.lineTo(c(22),l(2.1)),r.moveTo(c(0),l(-35)),r.lineTo(c(0),l(14)),r.stroke(),r.strokeStyle="#d64c42",r.lineWidth=5,r.beginPath(),r.moveTo(c(21),l(2.1)),r.lineTo(c(37),l(2.1)),r.stroke(),r.strokeStyle="#4e4c49",r.lineWidth=2.5,r.setLineDash([4,3]),r.beginPath(),r.moveTo(0,l(-18)),r.lineTo(o,l(-18)),r.stroke(),r.setLineDash([]);const h=[{x:-11.5,z:9.2,bw:8.4,bd:6.8,col:"#e88da3"},{x:10.2,z:9.2,bw:8,bd:6.6,col:"#5c8c72"},{x:-13,z:-6.8,bw:7.4,bd:6.2,col:"#6984a8"},{x:46.5,z:-9.6,bw:7,bd:5,col:"#d85448"},{x:-18.5,z:-22.2,bw:15,bd:4.2,col:"#7c8b84"}];for(const d of h)r.fillStyle=d.col,r.fillRect(c(d.x-d.bw/2),l(d.z-d.bd/2),d.bw/102*o,d.bd/76*a);if(n.isVisibleInTown){r.fillStyle="#2f9468",r.strokeStyle="#fff",r.lineWidth=1.5;const d=c(n.trainX),g=l(-18);r.fillRect(d-10,g-3,20,6),r.strokeRect(d-10,g-3,20,6)}for(const d of s)r.fillStyle=d.mapColor,r.beginPath(),r.arc(c(d.position.x),l(d.position.z),3.3,0,Math.PI*2),r.fill(),r.strokeStyle="#fff",r.lineWidth=1,r.stroke();const u=c(t.x),f=l(t.z);r.save(),r.translate(u,f),r.rotate(-e+Math.PI),r.fillStyle="#2d2424",r.strokeStyle="#fff",r.lineWidth=1.6,r.beginPath(),r.moveTo(0,-6),r.lineTo(4.5,4.5),r.lineTo(0,2),r.lineTo(-4.5,4.5),r.closePath(),r.fill(),r.stroke(),r.restore()}}class K0{constructor(){this.canvas=document.getElementById("game-canvas"),this.started=!1,this._initRendererAndScene(),this._initSystems(),this._bindControls(),this._bindResize(),this.clock=new _0,this._titleAngle=.5,this._animate=this._animate.bind(this),requestAnimationFrame(this._animate)}_initRendererAndScene(){this.renderer=new Pm({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=vc,this.renderer.outputColorSpace=Le,this.renderer.toneMapping=yc,this.renderer.toneMappingExposure=1.06,this.scene=new Dm,this.scene.fog=new Fo(13953784,.0046),this.camera=new Be(48,window.innerWidth/window.innerHeight,.15,420),this.hemiLight=new f0(11919100,8817780,.92),this.scene.add(this.hemiLight),this.sunLight=new g0(16774622,1.55),this.sunLight.position.set(45,62,32),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.camera.near=5,this.sunLight.shadow.camera.far=190;const t=62;this.sunLight.shadow.camera.left=-t,this.sunLight.shadow.camera.right=t,this.sunLight.shadow.camera.top=t,this.sunLight.shadow.camera.bottom=-t,this.sunLight.shadow.bias=-8e-4,this.sunLight.shadow.normalBias=.12,this.sunLight.shadow.radius=2.5,this.scene.add(this.sunLight)}_initSystems(){this.timeSystem=new x0,this.collision=new ye,this.input=new v0(this.canvas),this.audio=new M0,this.gameState=new X0,this.ui=new $0,this.atmosphere=new k0(this.scene),this.atmosphere.build(),this.terrain=new F0(this.scene,this.collision),this.terrain.build(),this.town=new O0(this.scene,this.collision),this.town.build(),this.shrine=new B0(this.scene,this.collision),this.shrine.build(),this.railway=new z0(this.scene,this.collision),this.railway.build(),this.player=new V0(this.scene,this.camera,this.collision,this.input),this.npcSystem=new W0(this.scene),this.npcSystem.build(),this.fishing=new Y0(this.scene,this.gameState,this.audio,this.ui),this.photoSystem=new q0(this.renderer,this.scene,this.camera,this.gameState,this.railway,this.npcSystem,this.timeSystem,this.audio,this.ui),this.interactions=new Z0({gameState:this.gameState,player:this.player,npcSystem:this.npcSystem,terrain:this.terrain,town:this.town,shrine:this.shrine,railway:this.railway,fishing:this.fishing,timeSystem:this.timeSystem,audio:this.audio,ui:this.ui,sleepCallback:()=>this._sleepToNextMorning()}),this.interactions.registerStaticPoints()}_bindControls(){this.ui.els.btnStart.addEventListener("click",()=>{this.started=!0,this.audio.init(),this.audio.playSuccessChime(),this.ui.hideTitleAndShowHud(),this.ui.showToast("🌸 欢迎来到樱花小镇！四处走走，和邻里打个招呼吧")}),this.ui.els.btnNotebook.addEventListener("click",()=>this._toggleNotebook()),this.ui.els.btnCamera.addEventListener("click",()=>this._toggleCameraMode()),this.ui.els.btnSpeed.addEventListener("click",()=>{this.audio.playUiClick();const t=this.timeSystem.toggleSpeed();this.ui.els.btnSpeed.textContent=`${t}x`,this.ui.showToast(t>1?"⏩ 时间流速已切换为 3x":"⏱ 时间流速已恢复为 1x")}),this.ui.els.btnAudio.addEventListener("click",()=>{this.audio.init(),this.ui.els.btnAudio.textContent=this.audio.toggle()?"🔊":"🔇"}),this.ui.els.btnStandUp.addEventListener("click",()=>{this.player.standUp(),this.ui.showSitBar(!1)}),this.ui.els.btnCancelFish.addEventListener("click",()=>this._exitFishing()),this.ui.els.btnSnap.addEventListener("click",()=>this.photoSystem.capturePhoto()),this.ui.els.btnExitCam.addEventListener("click",()=>this._toggleCameraMode(!1)),this.input.onKeyPress("KeyE",()=>this._handlePrimaryAction()),this.input.onKeyPress("Space",()=>this._handlePrimaryAction()),this.input.onKeyPress("KeyC",()=>{!this.started||this.ui.dialogueOpen||this.ui.notebookOpen||this.fishing.active||this._toggleCameraMode()}),this.input.onKeyPress("Tab",()=>{!this.started||this.ui.dialogueOpen||this.fishing.active||(this.player.mode==="CAMERA"&&this._toggleCameraMode(!1),this._toggleNotebook())}),this.input.onKeyPress("Escape",()=>{this.ui.notebookOpen?this.ui.toggleNotebook(!1):this.ui.dialogueOpen?this.interactions.closeDialogue():this.fishing.active?this._exitFishing():this.player.mode==="CAMERA"?this._toggleCameraMode(!1):this.player.mode==="SIT"&&(this.player.standUp(),this.ui.showSitBar(!1))})}_handlePrimaryAction(){if(!(!this.started||this.ui.notebookOpen)){if(this.player.mode==="CAMERA"){this.photoSystem.capturePhoto();return}if(this.fishing.active){this.fishing.triggerPull();return}if(!this.ui.dialogueOpen){if(this.player.mode==="SIT"){this.player.standUp(),this.ui.showSitBar(!1);return}this.interactions.triggerNearest()}}}_toggleNotebook(){this.audio.playUiClick(),this.ui.toggleNotebook(void 0,{gameState:this.gameState,npcSystem:this.npcSystem,player:this.player,audio:this.audio})}_toggleCameraMode(t){const e=typeof t=="boolean"?t:this.player.mode!=="CAMERA";this.audio.playUiClick(),e?this.player.enterCameraMode()&&this.ui.showCameraUI(!0):(this.player.exitCameraMode(),this.ui.showCameraUI(!1))}_exitFishing(){this.fishing.stop(),this.player.exitFishing()}async _sleepToNextMorning(){await this.ui.playSleepFade(`晚安，樱花小镇 · 即将迎来第 ${this.timeSystem.day+1} 天`,()=>{this.timeSystem.advanceToNextMorning(),this.player.teleportToHomeWakeup()}),this.ui.showToast(`🌅 早安！今天是第 ${this.timeSystem.day} 天，阳光真好`)}_bindResize(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}_updateLighting(){const t=this.timeSystem;this.hemiLight.color.copy(t.colors.hemiSky),this.hemiLight.groundColor.copy(t.colors.hemiGround),this.hemiLight.intensity=t.hemiIntensity,this.sunLight.color.copy(t.colors.sunColor),this.sunLight.intensity=t.sunIntensity,this.sunLight.position.copy(t.sunDirection).multiplyScalar(78),this.scene.fog.color.copy(t.colors.fogColor)}_animate(){requestAnimationFrame(this._animate);const t=Math.min(this.clock.getDelta(),.05);this.timeSystem.update(this.started?t:t*.25),this._updateLighting(),this.atmosphere.update(t,this.timeSystem),this.terrain.update(t);const e=this.player.position,n=this.town.update(t,e,this.timeSystem.nightFactor,this.started?this.audio:null);this.shrine.update(t,this.timeSystem.nightFactor),this.railway.update(t,e,this.timeSystem.nightFactor,this.started?this.audio:null);const s=this.railway.getStatus();if(this.npcSystem.update(t,this.timeSystem.hour,s,e),!this.started){this._titleAngle+=t*.085,this.camera.position.set(Math.cos(this._titleAngle)*34+6,15.5,Math.sin(this._titleAngle)*28+4),this.camera.lookAt(5,2.2,-3),this.renderer.render(this.scene,this.camera);return}const r=this.ui.dialogueOpen||this.ui.notebookOpen;if(this.player.update(t,n,r,this.audio),this.player.mode!=="SIT"&&this.ui.showSitBar(!1),this.fishing.update(t),!r&&this.player.mode==="WALK"){const o=this.interactions.findNearest(e);this.ui.setPrompt(!!o,o?o.label:"")}else this.ui.setPrompt(!1);if(this.player.mode==="CAMERA"){const o=this.photoSystem.analyzeFrame();this.ui.updateCameraViewfinder(o.labels,this.timeSystem.getFormattedTime())}this.audio.update(t,this.timeSystem.nightFactor,Math.abs(e.x-29)<15),this.ui.updateHud(this.timeSystem,this.gameState,e,this.player.yaw,n,s,this.npcSystem.npcs),this.renderer.render(this.scene,this.camera)}}window.addEventListener("DOMContentLoaded",()=>{window.__sakuraGame=new K0});
