(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oa="170",ad=0,fc=1,cd=2,$l=1,jl=2,qn=3,ni=0,Ze=1,rn=2,gi=0,is=1,pc=2,mc=3,gc=4,ld=5,Ri=100,hd=101,dd=102,ud=103,fd=104,pd=200,md=201,gd=202,xd=203,$r=204,jr=205,_d=206,vd=207,yd=208,Md=209,bd=210,wd=211,Sd=212,Td=213,Ed=214,Zr=0,Kr=1,Jr=2,ls=3,Qr=4,ta=5,ea=6,na=7,Zl=0,Ad=1,Rd=2,xi=0,Cd=1,Pd=2,Dd=3,Ld=4,Id=5,zd=6,Ud=7,Kl=300,hs=301,ds=302,ia=303,sa=304,Ko=306,$n=1e3,pi=1001,oa=1002,Ke=1003,kd=1004,Js=1005,Un=1006,ir=1007,Pi=1008,ii=1009,Jl=1010,Ql=1011,Os=1012,Ba=1013,zi=1014,jn=1015,Gs=1016,Ha=1017,Ga=1018,us=1020,th=35902,eh=1021,nh=1022,Mn=1023,ih=1024,sh=1025,ss=1026,fs=1027,oh=1028,Va=1029,rh=1030,Wa=1031,Xa=1033,zo=33776,Uo=33777,ko=33778,No=33779,ra=35840,aa=35841,ca=35842,la=35843,ha=36196,da=37492,ua=37496,fa=37808,pa=37809,ma=37810,ga=37811,xa=37812,_a=37813,va=37814,ya=37815,Ma=37816,ba=37817,wa=37818,Sa=37819,Ta=37820,Ea=37821,Fo=36492,Aa=36494,Ra=36495,ah=36283,Ca=36284,Pa=36285,Da=36286,Nd=3200,Fd=3201,ch=0,Od=1,fi="",dn="srgb",gs="srgb-linear",Jo="linear",xe="srgb",Bi=7680,xc=519,Bd=512,Hd=513,Gd=514,lh=515,Vd=516,Wd=517,Xd=518,qd=519,_c=35044,vc="300 es",Zn=2e3,Go=2001;class xs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sr=Math.PI/180,Vo=180/Math.PI;function Vs(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[s&255]+Qe[s>>8&255]+Qe[s>>16&255]+Qe[s>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function $e(s,t,e){return Math.max(t,Math.min(e,s))}function Yd(s,t){return(s%t+t)%t}function or(s,t,e){return(1-e)*s+e*t}function ws(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ln(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($e(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,n,i,o,r,a,c,l){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l)}set(t,e,n,i,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],x=i[0],g=i[3],m=i[6],_=i[1],b=i[4],y=i[7],A=i[2],w=i[5],R=i[8];return o[0]=r*x+a*_+c*A,o[3]=r*g+a*b+c*w,o[6]=r*m+a*y+c*R,o[1]=l*x+h*_+d*A,o[4]=l*g+h*b+d*w,o[7]=l*m+h*y+d*R,o[2]=u*x+f*_+p*A,o[5]=u*g+f*b+p*w,o[8]=u*m+f*y+p*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+i*o*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*r-a*l,u=a*c-h*o,f=l*o-r*c,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=d*x,t[1]=(i*l-h*n)*x,t[2]=(a*n-i*r)*x,t[3]=u*x,t[4]=(h*e-i*c)*x,t[5]=(i*o-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(r*e-n*o)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(rr.makeScale(t,e)),this}rotate(t){return this.premultiply(rr.makeRotation(-t)),this}translate(t,e){return this.premultiply(rr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const rr=new Qt;function hh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Wo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function $d(){const s=Wo("canvas");return s.style.display="block",s}const yc={};function Ds(s){s in yc||(yc[s]=!0,console.warn(s))}function jd(s,t,e){return new Promise(function(n,i){function o(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function Zd(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Kd(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ce={enabled:!0,workingColorSpace:gs,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===xe&&(s.r=Qn(s.r),s.g=Qn(s.g),s.b=Qn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===xe&&(s.r=os(s.r),s.g=os(s.g),s.b=os(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?Jo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Qn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function os(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Mc=[.64,.33,.3,.6,.15,.06],bc=[.2126,.7152,.0722],wc=[.3127,.329],Sc=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tc=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ce.define({[gs]:{primaries:Mc,whitePoint:wc,transfer:Jo,toXYZ:Sc,fromXYZ:Tc,luminanceCoefficients:bc,workingColorSpaceConfig:{unpackColorSpace:dn},outputColorSpaceConfig:{drawingBufferColorSpace:dn}},[dn]:{primaries:Mc,whitePoint:wc,transfer:xe,toXYZ:Sc,fromXYZ:Tc,luminanceCoefficients:bc,outputColorSpaceConfig:{drawingBufferColorSpace:dn}}});let Hi;class Jd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Hi===void 0&&(Hi=Wo("canvas")),Hi.width=t.width,Hi.height=t.height;const n=Hi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Hi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Wo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=Qn(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Qd=0;class dh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Vs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(ar(i[r].image)):o.push(ar(i[r]))}else o=ar(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function ar(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Jd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let tu=0;class nn extends xs{constructor(t=nn.DEFAULT_IMAGE,e=nn.DEFAULT_MAPPING,n=pi,i=pi,o=Un,r=Pi,a=Mn,c=ii,l=nn.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=Vs(),this.name="",this.source=new dh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $n:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case oa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $n:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case oa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Kl;nn.DEFAULT_ANISOTROPY=1;class _e{constructor(t=0,e=0,n=0,i=1){_e.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,y=(f+1)/2,A=(m+1)/2,w=(h+u)/4,R=(d+x)/4,E=(p+g)/4;return b>y&&b>A?b<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(b),i=w/n,o=R/n):y>A?y<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(y),n=w/i,o=E/i):A<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(A),n=R/o,i=E/o),this.set(n,i,o,e),this}let _=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(d-x)/_,this.z=(u-h)/_,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class eu extends xs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new nn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new dh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends eu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class uh extends nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class nu extends nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _s{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=o[r+0],f=o[r+1],p=o[r+2],x=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=x;return}if(d!==x||c!==u||l!==f||h!==p){let g=1-a;const m=c*u+l*f+h*p+d*x,_=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const A=Math.sqrt(b),w=Math.atan2(A,m*_);g=Math.sin(g*w)/A,a=Math.sin(a*w)/A}const y=a*_;if(c=c*g+u*y,l=l*g+f*y,h=h*g+p*y,d=d*g+x*y,g===1-a){const A=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=A,l*=A,h*=A,d*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=o[r],u=o[r+1],f=o[r+2],p=o[r+3];return t[e]=a*p+h*d+c*f-l*u,t[e+1]=c*p+h*u+l*d-a*f,t[e+2]=l*p+h*f+a*u-c*d,t[e+3]=h*p-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(o/2),u=c(n/2),f=c(i/2),p=c(o/2);switch(r){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(o-l)*f,this._z=(r-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(o+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(o-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(r-i)/f,this._x=(o+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($e(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-o*c,this._y=i*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=o*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ec.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ec.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-o*i),d=2*(o*n-r*e);return this.x=e+c*l+r*d-a*h,this.y=n+c*h+a*l-o*d,this.z=i+c*d+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-o*a,this.y=o*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return cr.copy(this).projectOnVector(t),this.sub(cr)}reflect(t){return this.sub(cr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($e(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cr=new D,Ec=new _s;class Ws{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,Tn):Tn.fromBufferAttribute(o,r),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qs.copy(n.boundingBox)),Qs.applyMatrix4(t.matrixWorld),this.union(Qs)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ss),to.subVectors(this.max,Ss),Gi.subVectors(t.a,Ss),Vi.subVectors(t.b,Ss),Wi.subVectors(t.c,Ss),ri.subVectors(Vi,Gi),ai.subVectors(Wi,Vi),yi.subVectors(Gi,Wi);let e=[0,-ri.z,ri.y,0,-ai.z,ai.y,0,-yi.z,yi.y,ri.z,0,-ri.x,ai.z,0,-ai.x,yi.z,0,-yi.x,-ri.y,ri.x,0,-ai.y,ai.x,0,-yi.y,yi.x,0];return!lr(e,Gi,Vi,Wi,to)||(e=[1,0,0,0,1,0,0,0,1],!lr(e,Gi,Vi,Wi,to))?!1:(eo.crossVectors(ri,ai),e=[eo.x,eo.y,eo.z],lr(e,Gi,Vi,Wi,to))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Hn=[new D,new D,new D,new D,new D,new D,new D,new D],Tn=new D,Qs=new Ws,Gi=new D,Vi=new D,Wi=new D,ri=new D,ai=new D,yi=new D,Ss=new D,to=new D,eo=new D,Mi=new D;function lr(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){Mi.fromArray(s,o);const a=i.x*Math.abs(Mi.x)+i.y*Math.abs(Mi.y)+i.z*Math.abs(Mi.z),c=t.dot(Mi),l=e.dot(Mi),h=n.dot(Mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const iu=new Ws,Ts=new D,hr=new D;class Qo{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):iu.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ts,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(hr)),this.expandByPoint(Ts.copy(t.center).sub(hr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new D,dr=new D,no=new D,ci=new D,ur=new D,io=new D,fr=new D;class fh{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){dr.copy(t).add(e).multiplyScalar(.5),no.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(dr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(no),a=ci.dot(this.direction),c=-ci.dot(no),l=ci.lengthSq(),h=Math.abs(1-r*r);let d,u,f,p;if(h>0)if(d=r*c-a,u=r*a-c,p=o*h,d>=0)if(u>=-p)if(u<=p){const x=1/h;d*=x,u*=x,f=d*(d+r*u+2*a)+u*(r*d+u+2*c)+l}else u=o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;else u=-o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-r*o+a)),u=d>0?-o:Math.min(Math.max(-o,-c),o),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-o,-c),o),f=u*(u+2*c)+l):(d=Math.max(0,-(r*o+a)),u=d>0?o:Math.min(Math.max(-o,-c),o),f=-d*d+u*(u+2*c)+l);else u=r>0?-o:o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(dr).addScaledVector(no,u),f}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(o=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(o=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,i,o){ur.subVectors(e,t),io.subVectors(n,t),fr.crossVectors(ur,io);let r=this.direction.dot(fr),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;ci.subVectors(this.origin,t);const c=a*this.direction.dot(io.crossVectors(ci,io));if(c<0)return null;const l=a*this.direction.dot(ur.cross(ci));if(l<0||c+l>r)return null;const h=-a*ci.dot(fr);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(t,e,n,i,o,r,a,c,l,h,d,u,f,p,x,g){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l,h,d,u,f,p,x,g)}set(t,e,n,i,o,r,a,c,l,h,d,u,f,p,x,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=o,m[5]=r,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Xi.setFromMatrixColumn(t,0).length(),o=1/Xi.setFromMatrixColumn(t,1).length(),r=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const u=r*h,f=r*d,p=a*h,x=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+p*l,e[5]=u-x*l,e[9]=-a*c,e[2]=x-u*l,e[6]=p+f*l,e[10]=r*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,p=l*h,x=l*d;e[0]=u+x*a,e[4]=p*a-f,e[8]=r*l,e[1]=r*d,e[5]=r*h,e[9]=-a,e[2]=f*a-p,e[6]=x+u*a,e[10]=r*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,p=l*h,x=l*d;e[0]=u-x*a,e[4]=-r*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=r*h,e[9]=x-u*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const u=r*h,f=r*d,p=a*h,x=a*d;e[0]=c*h,e[4]=p*l-f,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const u=r*c,f=r*l,p=a*c,x=a*l;e[0]=c*h,e[4]=x-u*d,e[8]=p*d+f,e[1]=d,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+p,e[10]=u-x*d}else if(t.order==="XZY"){const u=r*c,f=r*l,p=a*c,x=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=r*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(su,t,ou)}lookAt(t,e,n){const i=this.elements;return xn.subVectors(t,e),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),li.crossVectors(n,xn),li.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),li.crossVectors(n,xn)),li.normalize(),so.crossVectors(xn,li),i[0]=li.x,i[4]=so.x,i[8]=xn.x,i[1]=li.y,i[5]=so.y,i[9]=xn.y,i[2]=li.z,i[6]=so.z,i[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],x=n[6],g=n[10],m=n[14],_=n[3],b=n[7],y=n[11],A=n[15],w=i[0],R=i[4],E=i[8],v=i[12],M=i[1],C=i[5],L=i[9],I=i[13],H=i[2],V=i[6],B=i[10],Z=i[14],W=i[3],rt=i[7],mt=i[11],At=i[15];return o[0]=r*w+a*M+c*H+l*W,o[4]=r*R+a*C+c*V+l*rt,o[8]=r*E+a*L+c*B+l*mt,o[12]=r*v+a*I+c*Z+l*At,o[1]=h*w+d*M+u*H+f*W,o[5]=h*R+d*C+u*V+f*rt,o[9]=h*E+d*L+u*B+f*mt,o[13]=h*v+d*I+u*Z+f*At,o[2]=p*w+x*M+g*H+m*W,o[6]=p*R+x*C+g*V+m*rt,o[10]=p*E+x*L+g*B+m*mt,o[14]=p*v+x*I+g*Z+m*At,o[3]=_*w+b*M+y*H+A*W,o[7]=_*R+b*C+y*V+A*rt,o[11]=_*E+b*L+y*B+A*mt,o[15]=_*v+b*I+y*Z+A*At,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],x=t[7],g=t[11],m=t[15];return p*(+o*c*d-i*l*d-o*a*u+n*l*u+i*a*f-n*c*f)+x*(+e*c*f-e*l*u+o*r*u-i*r*f+i*l*h-o*c*h)+g*(+e*l*d-e*a*f-o*r*d+n*r*f+o*a*h-n*l*h)+m*(-i*a*h-e*c*d+e*a*u+i*r*d-n*r*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],x=t[13],g=t[14],m=t[15],_=d*g*l-x*u*l+x*c*f-a*g*f-d*c*m+a*u*m,b=p*u*l-h*g*l-p*c*f+r*g*f+h*c*m-r*u*m,y=h*x*l-p*d*l+p*a*f-r*x*f-h*a*m+r*d*m,A=p*d*c-h*x*c-p*a*u+r*x*u+h*a*g-r*d*g,w=e*_+n*b+i*y+o*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=_*R,t[1]=(x*u*o-d*g*o-x*i*f+n*g*f+d*i*m-n*u*m)*R,t[2]=(a*g*o-x*c*o+x*i*l-n*g*l-a*i*m+n*c*m)*R,t[3]=(d*c*o-a*u*o-d*i*l+n*u*l+a*i*f-n*c*f)*R,t[4]=b*R,t[5]=(h*g*o-p*u*o+p*i*f-e*g*f-h*i*m+e*u*m)*R,t[6]=(p*c*o-r*g*o-p*i*l+e*g*l+r*i*m-e*c*m)*R,t[7]=(r*u*o-h*c*o+h*i*l-e*u*l-r*i*f+e*c*f)*R,t[8]=y*R,t[9]=(p*d*o-h*x*o-p*n*f+e*x*f+h*n*m-e*d*m)*R,t[10]=(r*x*o-p*a*o+p*n*l-e*x*l-r*n*m+e*a*m)*R,t[11]=(h*a*o-r*d*o-h*n*l+e*d*l+r*n*f-e*a*f)*R,t[12]=A*R,t[13]=(h*x*i-p*d*i+p*n*u-e*x*u-h*n*g+e*d*g)*R,t[14]=(p*a*i-r*x*i-p*n*c+e*x*c+r*n*g-e*a*g)*R,t[15]=(r*d*i-h*a*i+h*n*c-e*d*c-r*n*u+e*a*u)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,d=a+a,u=o*l,f=o*h,p=o*d,x=r*h,g=r*d,m=a*d,_=c*l,b=c*h,y=c*d,A=n.x,w=n.y,R=n.z;return i[0]=(1-(x+m))*A,i[1]=(f+y)*A,i[2]=(p-b)*A,i[3]=0,i[4]=(f-y)*w,i[5]=(1-(u+m))*w,i[6]=(g+_)*w,i[7]=0,i[8]=(p+b)*R,i[9]=(g-_)*R,i[10]=(1-(u+x))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=Xi.set(i[0],i[1],i[2]).length();const r=Xi.set(i[4],i[5],i[6]).length(),a=Xi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],En.copy(this);const l=1/o,h=1/r,d=1/a;return En.elements[0]*=l,En.elements[1]*=l,En.elements[2]*=l,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=d,En.elements[9]*=d,En.elements[10]*=d,e.setFromRotationMatrix(En),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=Zn){const c=this.elements,l=2*o/(e-t),h=2*o/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,p;if(a===Zn)f=-(r+o)/(r-o),p=-2*r*o/(r-o);else if(a===Go)f=-r/(r-o),p=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=Zn){const c=this.elements,l=1/(e-t),h=1/(n-i),d=1/(r-o),u=(e+t)*l,f=(n+i)*h;let p,x;if(a===Zn)p=(r+o)*d,x=-2*d;else if(a===Go)p=o*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Xi=new D,En=new Wt,su=new D(0,0,0),ou=new D(1,1,1),li=new D,so=new D,xn=new D,Ac=new Wt,Rc=new _s;class kn{constructor(t=0,e=0,n=0,i=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-$e(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ac.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ac,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rc.setFromEuler(this),this.setFromQuaternion(Rc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class ph{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ru=0;const Cc=new D,qi=new _s,Vn=new Wt,oo=new D,Es=new D,au=new D,cu=new _s,Pc=new D(1,0,0),Dc=new D(0,1,0),Lc=new D(0,0,1),Ic={type:"added"},lu={type:"removed"},Yi={type:"childadded",child:null},pr={type:"childremoved",child:null};class ze extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=Vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ze.DEFAULT_UP.clone();const t=new D,e=new kn,n=new _s,i=new D(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Qt}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=ze.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ph,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Pc,t)}rotateY(t){return this.rotateOnAxis(Dc,t)}rotateZ(t){return this.rotateOnAxis(Lc,t)}translateOnAxis(t,e){return Cc.copy(t).applyQuaternion(this.quaternion),this.position.add(Cc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Pc,t)}translateY(t){return this.translateOnAxis(Dc,t)}translateZ(t){return this.translateOnAxis(Lc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?oo.copy(t):oo.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Es,oo,this.up):Vn.lookAt(oo,Es,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),qi.setFromRotationMatrix(Vn),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ic),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lu),pr.child=t,this.dispatchEvent(pr),pr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ic),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,t,au),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,cu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];o(t.shapes,d)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),d=r(t.shapes),u=r(t.skeletons),f=r(t.animations),p=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ze.DEFAULT_UP=new D(0,1,0);ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new D,Wn=new D,mr=new D,Xn=new D,$i=new D,ji=new D,zc=new D,gr=new D,xr=new D,_r=new D,vr=new _e,yr=new _e,Mr=new _e;class Rn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),An.subVectors(t,e),i.cross(An);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){An.subVectors(i,e),Wn.subVectors(n,e),mr.subVectors(t,e);const r=An.dot(An),a=An.dot(Wn),c=An.dot(mr),l=Wn.dot(Wn),h=Wn.dot(mr),d=r*l-a*a;if(d===0)return o.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,p=(r*h-a*c)*u;return o.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,n,i,o,r,a,c){return this.getBarycoord(t,e,n,i,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Xn.x),c.addScaledVector(r,Xn.y),c.addScaledVector(a,Xn.z),c)}static getInterpolatedAttribute(t,e,n,i,o,r){return vr.setScalar(0),yr.setScalar(0),Mr.setScalar(0),vr.fromBufferAttribute(t,e),yr.fromBufferAttribute(t,n),Mr.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(vr,o.x),r.addScaledVector(yr,o.y),r.addScaledVector(Mr,o.z),r}static isFrontFacing(t,e,n,i){return An.subVectors(n,e),Wn.subVectors(t,e),An.cross(Wn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),An.cross(Wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,o){return Rn.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return Rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;$i.subVectors(i,n),ji.subVectors(o,n),gr.subVectors(t,n);const c=$i.dot(gr),l=ji.dot(gr);if(c<=0&&l<=0)return e.copy(n);xr.subVectors(t,i);const h=$i.dot(xr),d=ji.dot(xr);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector($i,r);_r.subVectors(t,o);const f=$i.dot(_r),p=ji.dot(_r);if(p>=0&&f<=p)return e.copy(o);const x=f*l-c*p;if(x<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(ji,a);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return zc.subVectors(o,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(zc,a);const m=1/(g+x+u);return r=x*m,a=u*m,e.copy(n).addScaledVector($i,r).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},ro={h:0,s:0,l:0};function br(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Nt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=dn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=Yd(t,1),e=$e(e,0,1),n=$e(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=br(r,o,t+1/3),this.g=br(r,o,t),this.b=br(r,o,t-1/3)}return ce.toWorkingColorSpace(this,i),this}setStyle(t,e=dn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=dn){const n=mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=dn){return ce.fromWorkingColorSpace(tn.copy(this),t),Math.round($e(tn.r*255,0,255))*65536+Math.round($e(tn.g*255,0,255))*256+Math.round($e(tn.b*255,0,255))}getHexString(t=dn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.fromWorkingColorSpace(tn.copy(this),e);const n=tn.r,i=tn.g,o=tn.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const d=r-a;switch(l=h<=.5?d/(r+a):d/(2-r-a),r){case n:c=(i-o)/d+(i<o?6:0);break;case i:c=(o-n)/d+2;break;case o:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.fromWorkingColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=dn){ce.fromWorkingColorSpace(tn.copy(this),t);const e=tn.r,n=tn.g,i=tn.b;return t!==dn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(ro);const n=or(hi.h,ro.h,e),i=or(hi.s,ro.s,e),o=or(hi.l,ro.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Nt;Nt.NAMES=mh;let hu=0;class vs extends xs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Vs(),this.name="",this.blending=is,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$r,this.blendDst=jr,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==is&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$r&&(n.blendSrc=this.blendSrc),this.blendDst!==jr&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ki extends vs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ke=new D,ao=new wt;class Re{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=_c,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ao.fromBufferAttribute(this,e),ao.applyMatrix3(t),this.setXY(e,ao.x,ao.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix3(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ws(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ln(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ws(e,this.array)),e}setX(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ws(e,this.array)),e}setY(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ws(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ws(e,this.array)),e}setW(t,e){return this.normalized&&(e=ln(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ln(e,this.array),n=ln(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ln(e,this.array),n=ln(n,this.array),i=ln(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=ln(e,this.array),n=ln(n,this.array),i=ln(i,this.array),o=ln(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==_c&&(t.usage=this.usage),t}}class gh extends Re{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends Re{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class re extends Re{constructor(t,e,n){super(new Float32Array(t),e,n)}}let du=0;const yn=new Wt,wr=new ze,Zi=new D,_n=new Ws,As=new Ws,Xe=new D;class De extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=Vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hh(t)?xh:gh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Qt().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,n){return yn.makeTranslation(t,e,n),this.applyMatrix4(yn),this}scale(t,e,n){return yn.makeScale(t,e,n),this.applyMatrix4(yn),this}lookAt(t){return wr.lookAt(t),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,o=t.length;i<o;i++){const r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new re(n,3))}else{for(let n=0,i=e.count;n<i;n++){const o=t[n];e.setXYZ(n,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ws);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];_n.setFromBufferAttribute(o),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];As.setFromBufferAttribute(a),this.morphTargetsRelative?(Xe.addVectors(_n.min,As.min),_n.expandByPoint(Xe),Xe.addVectors(_n.max,As.max),_n.expandByPoint(Xe)):(_n.expandByPoint(As.min),_n.expandByPoint(As.max))}_n.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)Xe.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(Xe));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Xe.fromBufferAttribute(a,l),c&&(Zi.fromBufferAttribute(t,l),Xe.add(Zi)),i=Math.max(i,n.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Re(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let E=0;E<n.count;E++)a[E]=new D,c[E]=new D;const l=new D,h=new D,d=new D,u=new wt,f=new wt,p=new wt,x=new D,g=new D;function m(E,v,M){l.fromBufferAttribute(n,E),h.fromBufferAttribute(n,v),d.fromBufferAttribute(n,M),u.fromBufferAttribute(o,E),f.fromBufferAttribute(o,v),p.fromBufferAttribute(o,M),h.sub(l),d.sub(l),f.sub(u),p.sub(u);const C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(C),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),a[E].add(x),a[v].add(x),a[M].add(x),c[E].add(g),c[v].add(g),c[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let E=0,v=_.length;E<v;++E){const M=_[E],C=M.start,L=M.count;for(let I=C,H=C+L;I<H;I+=3)m(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const b=new D,y=new D,A=new D,w=new D;function R(E){A.fromBufferAttribute(i,E),w.copy(A);const v=a[E];b.copy(v),b.sub(A.multiplyScalar(A.dot(v))).normalize(),y.crossVectors(w,v);const C=y.dot(c[E])<0?-1:1;r.setXYZW(E,b.x,b.y,b.z,C)}for(let E=0,v=_.length;E<v;++E){const M=_[E],C=M.start,L=M.count;for(let I=C,H=C+L;I<H;I+=3)R(t.getX(I+0)),R(t.getX(I+1)),R(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Re(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new D,o=new D,r=new D,a=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),x=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),o.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),h.subVectors(r,o),d.subVectors(i,o),h.cross(d),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),o.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),h.subVectors(r,o),d.subVectors(i,o),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new Re(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],d=o[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uc=new Wt,bi=new fh,co=new Qo,kc=new D,lo=new D,ho=new D,uo=new D,Sr=new D,fo=new D,Nc=new D,po=new D;class O extends ze{constructor(t=new De,e=new ki){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){fo.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],d=o[c];h!==0&&(Sr.fromBufferAttribute(d,t),r?fo.addScaledVector(Sr,h):fo.addScaledVector(Sr.sub(e),h))}e.add(fo)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(o),bi.copy(t.ray).recast(t.near),!(co.containsPoint(bi.origin)===!1&&(bi.intersectSphere(co,kc)===null||bi.origin.distanceToSquared(kc)>(t.far-t.near)**2))&&(Uc.copy(o).invert(),bi.copy(t.ray).applyMatrix4(Uc),!(n.boundingBox!==null&&bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,d=o.attributes.normal,u=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,x=u.length;p<x;p++){const g=u[p],m=r[g.materialIndex],_=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,A=b;y<A;y+=3){const w=a.getX(y),R=a.getX(y+1),E=a.getX(y+2);i=mo(this,m,t,n,l,h,d,w,R,E),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const _=a.getX(g),b=a.getX(g+1),y=a.getX(g+2);i=mo(this,r,t,n,l,h,d,_,b,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let p=0,x=u.length;p<x;p++){const g=u[p],m=r[g.materialIndex],_=Math.max(g.start,f.start),b=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,A=b;y<A;y+=3){const w=y,R=y+1,E=y+2;i=mo(this,m,t,n,l,h,d,w,R,E),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const _=g,b=g+1,y=g+2;i=mo(this,r,t,n,l,h,d,_,b,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function uu(s,t,e,n,i,o,r,a){let c;if(t.side===Ze?c=n.intersectTriangle(r,o,i,!0,a):c=n.intersectTriangle(i,o,r,t.side===ni,a),c===null)return null;po.copy(a),po.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(po);return l<e.near||l>e.far?null:{distance:l,point:po.clone(),object:s}}function mo(s,t,e,n,i,o,r,a,c,l){s.getVertexPosition(a,lo),s.getVertexPosition(c,ho),s.getVertexPosition(l,uo);const h=uu(s,t,e,n,lo,ho,uo,Nc);if(h){const d=new D;Rn.getBarycoord(Nc,lo,ho,uo,d),i&&(h.uv=Rn.getInterpolatedAttribute(i,a,c,l,d,new wt)),o&&(h.uv1=Rn.getInterpolatedAttribute(o,a,c,l,d,new wt)),r&&(h.normal=Rn.getInterpolatedAttribute(r,a,c,l,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new D,materialIndex:0};Rn.getNormal(lo,ho,uo,u.normal),h.face=u,h.barycoord=d}return h}class Ht extends De{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,r,o,0),p("z","y","x",1,-1,n,e,-t,r,o,1),p("x","z","y",1,1,t,n,e,i,r,2),p("x","z","y",1,-1,t,n,-e,i,r,3),p("x","y","z",1,-1,t,e,n,i,o,4),p("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(c),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(d,2));function p(x,g,m,_,b,y,A,w,R,E,v){const M=y/R,C=A/E,L=y/2,I=A/2,H=w/2,V=R+1,B=E+1;let Z=0,W=0;const rt=new D;for(let mt=0;mt<B;mt++){const At=mt*C-I;for(let Bt=0;Bt<V;Bt++){const Zt=Bt*M-L;rt[x]=Zt*_,rt[g]=At*b,rt[m]=H,l.push(rt.x,rt.y,rt.z),rt[x]=0,rt[g]=0,rt[m]=w>0?1:-1,h.push(rt.x,rt.y,rt.z),d.push(Bt/R),d.push(1-mt/E),Z+=1}}for(let mt=0;mt<E;mt++)for(let At=0;At<R;At++){const Bt=u+At+V*mt,Zt=u+At+V*(mt+1),J=u+(At+1)+V*(mt+1),lt=u+(At+1)+V*mt;c.push(Bt,Zt,lt),c.push(Zt,J,lt),W+=6}a.addGroup(f,W,v),f+=W,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ht(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ps(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function on(s){const t={};for(let e=0;e<s.length;e++){const n=ps(s[e]);for(const i in n)t[i]=n[i]}return t}function fu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function _h(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const pu={clone:ps,merge:on};var mu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends vs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mu,this.fragmentShader=gu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ps(t.uniforms),this.uniformsGroups=fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class vh extends ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=Zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const di=new D,Fc=new wt,Oc=new wt;class un extends vh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Vo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vo*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(di.x,di.y).multiplyScalar(-t/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-t/di.z)}getViewSize(t,e){return this.getViewBounds(t,Fc,Oc),e.subVectors(Oc,Fc)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(sr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ki=-90,Ji=1;class xu extends ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new un(Ki,Ji,t,e);i.layers=this.layers,this.add(i);const o=new un(Ki,Ji,t,e);o.layers=this.layers,this.add(o);const r=new un(Ki,Ji,t,e);r.layers=this.layers,this.add(r);const a=new un(Ki,Ji,t,e);a.layers=this.layers,this.add(a);const c=new un(Ki,Ji,t,e);c.layers=this.layers,this.add(c);const l=new un(Ki,Ji,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Go)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class yh extends nn{constructor(t,e,n,i,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:hs,super(t,e,n,i,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _u extends Ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new yh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ht(5,5,5),o=new Dn({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:gi});o.uniforms.tEquirect.value=e;const r=new O(i,o),a=e.minFilter;return e.minFilter===Pi&&(e.minFilter=Un),new xu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const Tr=new D,vu=new D,yu=new Qt;class Ei{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Tr.subVectors(n,e).cross(vu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Tr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yu.getNormalMatrix(t),i=this.coplanarPoint(Tr).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wi=new Qo,go=new D;class qa{constructor(t=new Ei,e=new Ei,n=new Ei,i=new Ei,o=new Ei,r=new Ei){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Zn){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],p=i[9],x=i[10],g=i[11],m=i[12],_=i[13],b=i[14],y=i[15];if(n[0].setComponents(c-o,u-l,g-f,y-m).normalize(),n[1].setComponents(c+o,u+l,g+f,y+m).normalize(),n[2].setComponents(c+r,u+h,g+p,y+_).normalize(),n[3].setComponents(c-r,u-h,g-p,y-_).normalize(),n[4].setComponents(c-a,u-d,g-x,y-b).normalize(),e===Zn)n[5].setComponents(c+a,u+d,g+x,y+b).normalize();else if(e===Go)n[5].setComponents(a,d,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){return wi.center.set(0,0,0),wi.radius=.7071067811865476,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(go.x=i.normal.x>0?t.max.x:t.min.x,go.y=i.normal.y>0?t.max.y:t.min.y,go.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(go)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Mh(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function Mu(s){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(s.bindBuffer(l,a),d.length===0)s.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],x=d[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const x=d[f];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:o,update:r}}class Me extends De{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],p=[],x=[],g=[];for(let m=0;m<h;m++){const _=m*u-r;for(let b=0;b<l;b++){const y=b*d-o;p.push(y,-_,0),x.push(0,0,1),g.push(b/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<a;_++){const b=_+l*m,y=_+l*(m+1),A=_+1+l*(m+1),w=_+1+l*m;f.push(b,y,w),f.push(y,A,w)}this.setIndex(f),this.setAttribute("position",new re(p,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.width,t.height,t.widthSegments,t.heightSegments)}}var bu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wu=`#ifdef USE_ALPHAHASH
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
#endif`,Su=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Au=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ru=`#ifdef USE_AOMAP
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
#endif`,Cu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pu=`#ifdef USE_BATCHING
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
#endif`,Du=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Uu=`#ifdef USE_IRIDESCENCE
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
#endif`,ku=`#ifdef USE_BUMPMAP
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
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xu=`#define PI 3.141592653589793
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
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yu=`vec3 transformedNormal = objectNormal;
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
#endif`,$u=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ju="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qu=`vec4 LinearTransferOETF( in vec4 value ) {
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
}`,df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uf=`LambertMaterial material;
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
material.diffuseColor = diffuseColor.rgb;`,xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_f=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yf=`PhysicalMaterial material;
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
#endif`,Mf=`struct PhysicalMaterial {
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
}`,bf=`
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Tf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cf=`#ifdef USE_MAP
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
#endif`,zf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
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
#endif`,Of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
#endif`,qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
gl_Position = projectionMatrix * mvPosition;`,t0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,n0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,i0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,s0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,o0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,a0=`float getShadowMask() {
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
}`,c0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,l0=`#ifdef USE_SKINNING
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
#endif`,h0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,d0=`#ifdef USE_SKINNING
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
#endif`,u0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,f0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,p0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,m0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,g0=`#ifdef USE_TRANSMISSION
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
#endif`,x0=`#ifdef USE_TRANSMISSION
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
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const b0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,w0=`uniform sampler2D t2D;
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
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`#include <common>
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
}`,C0=`#if DEPTH_PACKING == 3200
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
}`,P0=`#define DISTANCE
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
}`,D0=`#define DISTANCE
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
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`uniform float scale;
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
}`,U0=`uniform vec3 diffuse;
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
}`,k0=`#include <common>
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
}`,N0=`uniform vec3 diffuse;
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
}`,F0=`#define LAMBERT
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
}`,O0=`#define LAMBERT
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
}`,B0=`#define MATCAP
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
}`,H0=`#define MATCAP
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
}`,G0=`#define NORMAL
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
}`,V0=`#define NORMAL
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
}`,W0=`#define PHONG
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
}`,X0=`#define PHONG
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
}`,q0=`#define STANDARD
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
}`,Y0=`#define STANDARD
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
}`,$0=`#define TOON
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
}`,j0=`#define TOON
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
}`,Z0=`uniform float size;
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
}`,K0=`uniform vec3 diffuse;
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
}`,J0=`#include <common>
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
}`,Q0=`uniform vec3 color;
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
}`,tp=`uniform float rotation;
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
}`,ep=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:bu,alphahash_pars_fragment:wu,alphamap_fragment:Su,alphamap_pars_fragment:Tu,alphatest_fragment:Eu,alphatest_pars_fragment:Au,aomap_fragment:Ru,aomap_pars_fragment:Cu,batching_pars_vertex:Pu,batching_vertex:Du,begin_vertex:Lu,beginnormal_vertex:Iu,bsdfs:zu,iridescence_fragment:Uu,bumpmap_pars_fragment:ku,clipping_planes_fragment:Nu,clipping_planes_pars_fragment:Fu,clipping_planes_pars_vertex:Ou,clipping_planes_vertex:Bu,color_fragment:Hu,color_pars_fragment:Gu,color_pars_vertex:Vu,color_vertex:Wu,common:Xu,cube_uv_reflection_fragment:qu,defaultnormal_vertex:Yu,displacementmap_pars_vertex:$u,displacementmap_vertex:ju,emissivemap_fragment:Zu,emissivemap_pars_fragment:Ku,colorspace_fragment:Ju,colorspace_pars_fragment:Qu,envmap_fragment:tf,envmap_common_pars_fragment:ef,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:mf,envmap_vertex:of,fog_vertex:rf,fog_pars_vertex:af,fog_fragment:cf,fog_pars_fragment:lf,gradientmap_pars_fragment:hf,lightmap_pars_fragment:df,lights_lambert_fragment:uf,lights_lambert_pars_fragment:ff,lights_pars_begin:pf,lights_toon_fragment:gf,lights_toon_pars_fragment:xf,lights_phong_fragment:_f,lights_phong_pars_fragment:vf,lights_physical_fragment:yf,lights_physical_pars_fragment:Mf,lights_fragment_begin:bf,lights_fragment_maps:wf,lights_fragment_end:Sf,logdepthbuf_fragment:Tf,logdepthbuf_pars_fragment:Ef,logdepthbuf_pars_vertex:Af,logdepthbuf_vertex:Rf,map_fragment:Cf,map_pars_fragment:Pf,map_particle_fragment:Df,map_particle_pars_fragment:Lf,metalnessmap_fragment:If,metalnessmap_pars_fragment:zf,morphinstance_vertex:Uf,morphcolor_vertex:kf,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:Bf,normal_fragment_maps:Hf,normal_pars_fragment:Gf,normal_pars_vertex:Vf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:qf,clearcoat_normal_fragment_maps:Yf,clearcoat_pars_fragment:$f,iridescence_pars_fragment:jf,opaque_fragment:Zf,packing:Kf,premultiplied_alpha_fragment:Jf,project_vertex:Qf,dithering_fragment:t0,dithering_pars_fragment:e0,roughnessmap_fragment:n0,roughnessmap_pars_fragment:i0,shadowmap_pars_fragment:s0,shadowmap_pars_vertex:o0,shadowmap_vertex:r0,shadowmask_pars_fragment:a0,skinbase_vertex:c0,skinning_pars_vertex:l0,skinning_vertex:h0,skinnormal_vertex:d0,specularmap_fragment:u0,specularmap_pars_fragment:f0,tonemapping_fragment:p0,tonemapping_pars_fragment:m0,transmission_fragment:g0,transmission_pars_fragment:x0,uv_pars_fragment:_0,uv_pars_vertex:v0,uv_vertex:y0,worldpos_vertex:M0,background_vert:b0,background_frag:w0,backgroundCube_vert:S0,backgroundCube_frag:T0,cube_vert:E0,cube_frag:A0,depth_vert:R0,depth_frag:C0,distanceRGBA_vert:P0,distanceRGBA_frag:D0,equirect_vert:L0,equirect_frag:I0,linedashed_vert:z0,linedashed_frag:U0,meshbasic_vert:k0,meshbasic_frag:N0,meshlambert_vert:F0,meshlambert_frag:O0,meshmatcap_vert:B0,meshmatcap_frag:H0,meshnormal_vert:G0,meshnormal_frag:V0,meshphong_vert:W0,meshphong_frag:X0,meshphysical_vert:q0,meshphysical_frag:Y0,meshtoon_vert:$0,meshtoon_frag:j0,points_vert:Z0,points_frag:K0,shadow_vert:J0,shadow_frag:Q0,sprite_vert:tp,sprite_frag:ep},pt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},zn={basic:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:on([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:on([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:on([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:on([pt.points,pt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:on([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:on([pt.common,pt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:on([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:on([pt.sprite,pt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:on([pt.common,pt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:on([pt.lights,pt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};zn.physical={uniforms:on([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const xo={r:0,b:0,g:0},Si=new kn,np=new Wt;function ip(s,t,e,n,i,o,r){const a=new Nt(0);let c=o===!0?0:1,l,h,d=null,u=0,f=null;function p(_){let b=_.isScene===!0?_.background:null;return b&&b.isTexture&&(b=(_.backgroundBlurriness>0?e:t).get(b)),b}function x(_){let b=!1;const y=p(_);y===null?m(a,c):y&&y.isColor&&(m(y,1),b=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(_,b){const y=p(b);y&&(y.isCubeTexture||y.mapping===Ko)?(h===void 0&&(h=new O(new Ht(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:ps(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Si.copy(b.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(np.makeRotationFromEuler(Si)),h.material.toneMapped=ce.getTransfer(y.colorSpace)!==xe,(d!==y||u!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new O(new Me(2,2),new Dn({name:"BackgroundMaterial",uniforms:ps(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=ce.getTransfer(y.colorSpace)!==xe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,b){_.getRGB(xo,_h(s)),n.buffers.color.setClear(xo.r,xo.g,xo.b,b,r)}return{getClearColor:function(){return a},setClearColor:function(_,b=1){a.set(_),c=b,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,m(a,c)},render:x,addToRenderList:g}}function sp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let o=i,r=!1;function a(M,C,L,I,H){let V=!1;const B=d(I,L,C);o!==B&&(o=B,l(o.object)),V=f(M,I,L,H),V&&p(M,I,L,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,y(M,C,L,I),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function d(M,C,L){const I=L.wireframe===!0;let H=n[M.id];H===void 0&&(H={},n[M.id]=H);let V=H[C.id];V===void 0&&(V={},H[C.id]=V);let B=V[I];return B===void 0&&(B=u(c()),V[I]=B),B}function u(M){const C=[],L=[],I=[];for(let H=0;H<e;H++)C[H]=0,L[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:L,attributeDivisors:I,object:M,attributes:{},index:null}}function f(M,C,L,I){const H=o.attributes,V=C.attributes;let B=0;const Z=L.getAttributes();for(const W in Z)if(Z[W].location>=0){const mt=H[W];let At=V[W];if(At===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(At=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(At=M.instanceColor)),mt===void 0||mt.attribute!==At||At&&mt.data!==At.data)return!0;B++}return o.attributesNum!==B||o.index!==I}function p(M,C,L,I){const H={},V=C.attributes;let B=0;const Z=L.getAttributes();for(const W in Z)if(Z[W].location>=0){let mt=V[W];mt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor));const At={};At.attribute=mt,mt&&mt.data&&(At.data=mt.data),H[W]=At,B++}o.attributes=H,o.attributesNum=B,o.index=I}function x(){const M=o.newAttributes;for(let C=0,L=M.length;C<L;C++)M[C]=0}function g(M){m(M,0)}function m(M,C){const L=o.newAttributes,I=o.enabledAttributes,H=o.attributeDivisors;L[M]=1,I[M]===0&&(s.enableVertexAttribArray(M),I[M]=1),H[M]!==C&&(s.vertexAttribDivisor(M,C),H[M]=C)}function _(){const M=o.newAttributes,C=o.enabledAttributes;for(let L=0,I=C.length;L<I;L++)C[L]!==M[L]&&(s.disableVertexAttribArray(L),C[L]=0)}function b(M,C,L,I,H,V,B){B===!0?s.vertexAttribIPointer(M,C,L,H,V):s.vertexAttribPointer(M,C,L,I,H,V)}function y(M,C,L,I){x();const H=I.attributes,V=L.getAttributes(),B=C.defaultAttributeValues;for(const Z in V){const W=V[Z];if(W.location>=0){let rt=H[Z];if(rt===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){const mt=rt.normalized,At=rt.itemSize,Bt=t.get(rt);if(Bt===void 0)continue;const Zt=Bt.buffer,J=Bt.type,lt=Bt.bytesPerElement,Q=J===s.INT||J===s.UNSIGNED_INT||rt.gpuType===Ba;if(rt.isInterleavedBufferAttribute){const K=rt.data,ct=K.stride,ht=rt.offset;if(K.isInstancedInterleavedBuffer){for(let Et=0;Et<W.locationSize;Et++)m(W.location+Et,K.meshPerAttribute);M.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Et=0;Et<W.locationSize;Et++)g(W.location+Et);s.bindBuffer(s.ARRAY_BUFFER,Zt);for(let Et=0;Et<W.locationSize;Et++)b(W.location+Et,At/W.locationSize,J,mt,ct*lt,(ht+At/W.locationSize*Et)*lt,Q)}else{if(rt.isInstancedBufferAttribute){for(let K=0;K<W.locationSize;K++)m(W.location+K,rt.meshPerAttribute);M.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let K=0;K<W.locationSize;K++)g(W.location+K);s.bindBuffer(s.ARRAY_BUFFER,Zt);for(let K=0;K<W.locationSize;K++)b(W.location+K,At/W.locationSize,J,mt,At*lt,At/W.locationSize*K*lt,Q)}}else if(B!==void 0){const mt=B[Z];if(mt!==void 0)switch(mt.length){case 2:s.vertexAttrib2fv(W.location,mt);break;case 3:s.vertexAttrib3fv(W.location,mt);break;case 4:s.vertexAttrib4fv(W.location,mt);break;default:s.vertexAttrib1fv(W.location,mt)}}}}_()}function A(){E();for(const M in n){const C=n[M];for(const L in C){const I=C[L];for(const H in I)h(I[H].object),delete I[H];delete C[L]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const L in C){const I=C[L];for(const H in I)h(I[H].object),delete I[H];delete C[L]}delete n[M.id]}function R(M){for(const C in n){const L=n[C];if(L[M.id]===void 0)continue;const I=L[M.id];for(const H in I)h(I[H].object),delete I[H];delete L[M.id]}}function E(){v(),r=!0,o!==i&&(o=i,l(o.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:E,resetDefaultState:v,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function op(s,t,e){let n;function i(l){n=l}function o(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,d){d!==0&&(s.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)r(l[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=h[x]*u[x];e.update(p,n,1)}}this.setMode=i,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function rp(s,t,e,n){let i;function o(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){return!(R!==Mn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const E=R===Gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ii&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==jn&&!E)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=p>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:A,maxSamples:w}}function ap(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new Ei,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||o&&!g)o?h(null):l();else{const _=o?0:n,b=_*4;let y=m.clippingState||null;c.value=y,y=h(p,u,b,f);for(let A=0;A!==b;++A)y[A]=e[A];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=c.value,p!==!0||g===null){const m=f+x*4,_=u.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,y=f;b!==x;++b,y+=4)r.copy(d[b]).applyMatrix4(_,a),r.normal.toArray(g,y),g[y+3]=r.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function cp(s){let t=new WeakMap;function e(r,a){return a===ia?r.mapping=hs:a===sa&&(r.mapping=ds),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===ia||a===sa)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new _u(c.height);return l.fromEquirectangularTexture(s,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class bh extends vh{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const es=4,Bc=[.125,.215,.35,.446,.526,.582],Ci=20,Er=new bh,Hc=new Nt;let Ar=null,Rr=0,Cr=0,Pr=!1;const Ai=(1+Math.sqrt(5))/2,Qi=1/Ai,Gc=[new D(-Ai,Qi,0),new D(Ai,Qi,0),new D(-Qi,0,Ai),new D(Qi,0,Ai),new D(0,Ai,-Qi),new D(0,Ai,Qi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Vc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ar=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ar,Rr,Cr),this._renderer.xr.enabled=Pr,t.scissorTest=!1,_o(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===hs||t.mapping===ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ar=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:Gs,format:Mn,colorSpace:gs,depthBuffer:!1},i=Wc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wc(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lp(o)),this._blurMaterial=hp(o,t,e)}return i}_compileMaterial(t){const e=new O(this._lodPlanes[0],t);this._renderer.compile(e,Er)}_sceneToCubeUV(t,e,n,i){const a=new un(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Hc),h.toneMapping=xi,h.autoClear=!1;const f=new ki({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),p=new O(new Ht,f);let x=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,x=!0):(f.color.copy(Hc),x=!0);for(let m=0;m<6;m++){const _=m%3;_===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):_===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const b=this._cubeSize;_o(i,_*b,m>2?b:0,b,b),h.setRenderTarget(i),x&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===hs||t.mapping===ds;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=qc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xc());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new O(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;_o(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,Er)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Gc[(i-o-1)%Gc.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new O(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Ci-1),x=o/p,g=isFinite(o)?1+Math.floor(h*x):Ci;g>Ci&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ci}`);const m=[];let _=0;for(let R=0;R<Ci;++R){const E=R/x,v=Math.exp(-E*E/2);m.push(v),R===0?_+=v:R<g&&(_+=2*v)}for(let R=0;R<m.length;R++)m[R]=m[R]/_;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=r==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:b}=this;u.dTheta.value=p,u.mipInt.value=b-n;const y=this._sizeLods[i],A=3*y*(i>b-es?i-b+es:0),w=4*(this._cubeSize-y);_o(e,A,w,3*y,2*y),c.setRenderTarget(e),c.render(d,Er)}}function lp(s){const t=[],e=[],n=[];let i=s;const o=s-es+1+Bc.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>s-es?c=Bc[r-s+es-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,x=3,g=2,m=1,_=new Float32Array(x*p*f),b=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let w=0;w<f;w++){const R=w%3*2/3-1,E=w>2?0:-1,v=[R,E,0,R+2/3,E,0,R+2/3,E+1,0,R,E,0,R+2/3,E+1,0,R,E+1,0];_.set(v,x*p*w),b.set(u,g*p*w);const M=[w,w,w,w,w,w];y.set(M,m*p*w)}const A=new De;A.setAttribute("position",new Re(_,x)),A.setAttribute("uv",new Re(b,g)),A.setAttribute("faceIndex",new Re(y,m)),t.push(A),i>es&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wc(s,t,e){const n=new Ui(s,t,e);return n.texture.mapping=Ko,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _o(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function hp(s,t,e){const n=new Float32Array(Ci),i=new D(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:Ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Xc(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function qc(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ya(){return`

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
	`}function dp(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ia||c===sa,h=c===hs||c===ds;if(l||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Vc(s)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Vc(s)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function up(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ds("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function fp(s,t,e,n){const i={},o=new WeakMap;function r(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);for(const p in u.morphAttributes){const x=u.morphAttributes[p];for(let g=0,m=x.length;g<m;g++)t.remove(x[g])}u.removeEventListener("dispose",r),delete i[u.id];const f=o.get(u);f&&(t.remove(f),o.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)t.update(u[p],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const p in f){const x=f[p];for(let g=0,m=x.length;g<m;g++)t.update(x[g],s.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,p=d.attributes.position;let x=0;if(f!==null){const _=f.array;x=f.version;for(let b=0,y=_.length;b<y;b+=3){const A=_[b+0],w=_[b+1],R=_[b+2];u.push(A,w,w,R,R,A)}}else if(p!==void 0){const _=p.array;x=p.version;for(let b=0,y=_.length/3-1;b<y;b+=3){const A=b+0,w=b+1,R=b+2;u.push(A,w,w,R,R,A)}}else return;const g=new(hh(u)?xh:gh)(u,1);g.version=x;const m=o.get(d);m&&t.remove(m),o.set(d,g)}function h(d){const u=o.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function pp(s,t,e){let n;function i(u){n=u}let o,r;function a(u){o=u.type,r=u.bytesPerElement}function c(u,f){s.drawElements(n,f,o,u*r),e.update(f,n,1)}function l(u,f,p){p!==0&&(s.drawElementsInstanced(n,f,o,u*r,p),e.update(f,n,p))}function h(u,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,o,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function d(u,f,p,x){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)l(u[m]/r,f[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,o,u,0,x,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_]*x[_];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function mp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function gp(s,t,e){const n=new WeakMap,i=new _e;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let M=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let y=0;p===!0&&(y=1),x===!0&&(y=2),g===!0&&(y=3);let A=a.attributes.position.count*y,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const R=new Float32Array(A*w*4*d),E=new uh(R,A,w,d);E.type=jn,E.needsUpdate=!0;const v=y*4;for(let C=0;C<d;C++){const L=m[C],I=_[C],H=b[C],V=A*w*4*C;for(let B=0;B<L.count;B++){const Z=B*v;p===!0&&(i.fromBufferAttribute(L,B),R[V+Z+0]=i.x,R[V+Z+1]=i.y,R[V+Z+2]=i.z,R[V+Z+3]=0),x===!0&&(i.fromBufferAttribute(I,B),R[V+Z+4]=i.x,R[V+Z+5]=i.y,R[V+Z+6]=i.z,R[V+Z+7]=0),g===!0&&(i.fromBufferAttribute(H,B),R[V+Z+8]=i.x,R[V+Z+9]=i.y,R[V+Z+10]=i.z,R[V+Z+11]=H.itemSize===4?i.w:1)}}u={count:d,texture:E,size:new wt(A,w)},n.set(a,u),a.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(s,"morphTargetBaseInfluence",x),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:o}}function xp(s,t,e,n){let i=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class wh extends nn{constructor(t,e,n,i,o,r,a,c,l,h=ss){if(h!==ss&&h!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ss&&(n=zi),n===void 0&&h===fs&&(n=us),super(null,i,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ke,this.minFilter=c!==void 0?c:Ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Sh=new nn,Yc=new wh(1,1),Th=new uh,Eh=new nu,Ah=new yh,$c=[],jc=[],Zc=new Float32Array(16),Kc=new Float32Array(9),Jc=new Float32Array(4);function ys(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=$c[i];if(o===void 0&&(o=new Float32Array(i),$c[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function Ve(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function tr(s,t){let e=jc[t];e===void 0&&(e=new Int32Array(t),jc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function _p(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function vp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function yp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function Mp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function bp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Jc.set(n),s.uniformMatrix2fv(this.addr,!1,Jc),We(e,n)}}function wp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Kc.set(n),s.uniformMatrix3fv(this.addr,!1,Kc),We(e,n)}}function Sp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Zc.set(n),s.uniformMatrix4fv(this.addr,!1,Zc),We(e,n)}}function Tp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Ep(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function Ap(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function Rp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function Cp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Pp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function Dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function Lp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function Ip(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let o;this.type===s.SAMPLER_2D_SHADOW?(Yc.compareFunction=lh,o=Yc):o=Sh,e.setTexture2D(t||o,i)}function zp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Eh,i)}function Up(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ah,i)}function kp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Th,i)}function Np(s){switch(s){case 5126:return _p;case 35664:return vp;case 35665:return yp;case 35666:return Mp;case 35674:return bp;case 35675:return wp;case 35676:return Sp;case 5124:case 35670:return Tp;case 35667:case 35671:return Ep;case 35668:case 35672:return Ap;case 35669:case 35673:return Rp;case 5125:return Cp;case 36294:return Pp;case 36295:return Dp;case 36296:return Lp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return zp;case 35680:case 36300:case 36308:case 36293:return Up;case 36289:case 36303:case 36311:case 36292:return kp}}function Fp(s,t){s.uniform1fv(this.addr,t)}function Op(s,t){const e=ys(t,this.size,2);s.uniform2fv(this.addr,e)}function Bp(s,t){const e=ys(t,this.size,3);s.uniform3fv(this.addr,e)}function Hp(s,t){const e=ys(t,this.size,4);s.uniform4fv(this.addr,e)}function Gp(s,t){const e=ys(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Vp(s,t){const e=ys(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Wp(s,t){const e=ys(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Xp(s,t){s.uniform1iv(this.addr,t)}function qp(s,t){s.uniform2iv(this.addr,t)}function Yp(s,t){s.uniform3iv(this.addr,t)}function $p(s,t){s.uniform4iv(this.addr,t)}function jp(s,t){s.uniform1uiv(this.addr,t)}function Zp(s,t){s.uniform2uiv(this.addr,t)}function Kp(s,t){s.uniform3uiv(this.addr,t)}function Jp(s,t){s.uniform4uiv(this.addr,t)}function Qp(s,t,e){const n=this.cache,i=t.length,o=tr(e,i);Ve(n,o)||(s.uniform1iv(this.addr,o),We(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||Sh,o[r])}function tm(s,t,e){const n=this.cache,i=t.length,o=tr(e,i);Ve(n,o)||(s.uniform1iv(this.addr,o),We(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Eh,o[r])}function em(s,t,e){const n=this.cache,i=t.length,o=tr(e,i);Ve(n,o)||(s.uniform1iv(this.addr,o),We(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||Ah,o[r])}function nm(s,t,e){const n=this.cache,i=t.length,o=tr(e,i);Ve(n,o)||(s.uniform1iv(this.addr,o),We(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Th,o[r])}function im(s){switch(s){case 5126:return Fp;case 35664:return Op;case 35665:return Bp;case 35666:return Hp;case 35674:return Gp;case 35675:return Vp;case 35676:return Wp;case 5124:case 35670:return Xp;case 35667:case 35671:return qp;case 35668:case 35672:return Yp;case 35669:case 35673:return $p;case 5125:return jp;case 36294:return Zp;case 36295:return Kp;case 36296:return Jp;case 35678:case 36198:case 36298:case 36306:case 35682:return Qp;case 35679:case 36299:case 36307:return tm;case 35680:case 36300:case 36308:case 36293:return em;case 36289:case 36303:case 36311:case 36292:return nm}}class sm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Np(e.type)}}class om{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=im(e.type)}}class rm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const Dr=/(\w+)(\])?(\[|\.)?/g;function Qc(s,t){s.seq.push(t),s.map[t.id]=t}function am(s,t,e){const n=s.name,i=n.length;for(Dr.lastIndex=0;;){const o=Dr.exec(n),r=Dr.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){Qc(e,l===void 0?new sm(a,s,t):new om(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new rm(a),Qc(e,d)),e=d}}}class Oo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);am(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function tl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const cm=37297;let lm=0;function hm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const el=new Qt;function dm(s){ce._getMatrix(el,ce.workingColorSpace,s);const t=`mat3( ${el.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(s)){case Jo:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function nl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+hm(s.getShaderSource(t),r)}else return i}function um(s,t){const e=dm(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function fm(s,t){let e;switch(t){case Cd:e="Linear";break;case Pd:e="Reinhard";break;case Dd:e="Cineon";break;case Ld:e="ACESFilmic";break;case zd:e="AgX";break;case Ud:e="Neutral";break;case Id:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const vo=new D;function pm(){ce.getLuminanceCoefficients(vo);const s=vo.x.toFixed(4),t=vo.y.toFixed(4),e=vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ls).join(`
`)}function gm(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function xm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function Ls(s){return s!==""}function il(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _m=/^[ \t]*#include +<([\w\d./]+)>/gm;function La(s){return s.replace(_m,ym)}const vm=new Map;function ym(s,t){let e=ne[t];if(e===void 0){const n=vm.get(t);if(n!==void 0)e=ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return La(e)}const Mm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ol(s){return s.replace(Mm,bm)}function bm(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function rl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===$l?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===jl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===qn&&(t="SHADOWMAP_TYPE_VSM"),t}function Sm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case hs:case ds:t="ENVMAP_TYPE_CUBE";break;case Ko:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Tm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ds:t="ENVMAP_MODE_REFRACTION";break}return t}function Em(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Zl:t="ENVMAP_BLENDING_MULTIPLY";break;case Ad:t="ENVMAP_BLENDING_MIX";break;case Rd:t="ENVMAP_BLENDING_ADD";break}return t}function Am(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Rm(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=wm(e),l=Sm(e),h=Tm(e),d=Em(e),u=Am(e),f=mm(e),p=gm(o),x=i.createProgram();let g,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ls).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ls).join(`
`),m.length>0&&(m+=`
`)):(g=[rl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),m=[rl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?ne.tonemapping_pars_fragment:"",e.toneMapping!==xi?fm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,um("linearToOutputTexel",e.outputColorSpace),pm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ls).join(`
`)),r=La(r),r=il(r,e),r=sl(r,e),a=La(a),a=il(a,e),a=sl(a,e),r=ol(r),a=ol(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=_+g+r,y=_+m+a,A=tl(i,i.VERTEX_SHADER,b),w=tl(i,i.FRAGMENT_SHADER,y);i.attachShader(x,A),i.attachShader(x,w),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(C){if(s.debug.checkShaderErrors){const L=i.getProgramInfoLog(x).trim(),I=i.getShaderInfoLog(A).trim(),H=i.getShaderInfoLog(w).trim();let V=!0,B=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,A,w);else{const Z=nl(i,A,"vertex"),W=nl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+Z+`
`+W)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(I===""||H==="")&&(B=!1);B&&(C.diagnostics={runnable:V,programLog:L,vertexShader:{log:I,prefix:g},fragmentShader:{log:H,prefix:m}})}i.deleteShader(A),i.deleteShader(w),E=new Oo(i,x),v=xm(i,x)}let E;this.getUniforms=function(){return E===void 0&&R(this),E};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,cm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lm++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let Cm=0;class Pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Dm(t),e.set(t,n)),n}}class Dm{constructor(t){this.id=Cm++,this.code=t,this.usedTimes=0}}function Lm(s,t,e,n,i,o,r){const a=new ph,c=new Pm,l=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return l.add(v),v===0?"uv":`uv${v}`}function g(v,M,C,L,I){const H=L.fog,V=I.geometry,B=v.isMeshStandardMaterial?L.environment:null,Z=(v.isMeshStandardMaterial?e:t).get(v.envMap||B),W=Z&&Z.mapping===Ko?Z.image.height:null,rt=p[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const mt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,At=mt!==void 0?mt.length:0;let Bt=0;V.morphAttributes.position!==void 0&&(Bt=1),V.morphAttributes.normal!==void 0&&(Bt=2),V.morphAttributes.color!==void 0&&(Bt=3);let Zt,J,lt,Q;if(rt){const ge=zn[rt];Zt=ge.vertexShader,J=ge.fragmentShader}else Zt=v.vertexShader,J=v.fragmentShader,c.update(v),lt=c.getVertexShaderID(v),Q=c.getFragmentShaderID(v);const K=s.getRenderTarget(),ct=s.state.buffers.depth.getReversed(),ht=I.isInstancedMesh===!0,Et=I.isBatchedMesh===!0,Rt=!!v.map,kt=!!v.matcap,de=!!Z,k=!!v.aoMap,Ue=!!v.lightMap,te=!!v.bumpMap,ie=!!v.normalMap,Ft=!!v.displacementMap,ye=!!v.emissiveMap,Ot=!!v.metalnessMap,P=!!v.roughnessMap,S=v.anisotropy>0,G=v.clearcoat>0,nt=v.dispersion>0,at=v.iridescence>0,tt=v.sheen>0,zt=v.transmission>0,_t=S&&!!v.anisotropyMap,bt=G&&!!v.clearcoatMap,ae=G&&!!v.clearcoatNormalMap,dt=G&&!!v.clearcoatRoughnessMap,St=at&&!!v.iridescenceMap,Gt=at&&!!v.iridescenceThicknessMap,Xt=tt&&!!v.sheenColorMap,Tt=tt&&!!v.sheenRoughnessMap,oe=!!v.specularMap,ee=!!v.specularColorMap,be=!!v.specularIntensityMap,U=zt&&!!v.transmissionMap,gt=zt&&!!v.thicknessMap,$=!!v.gradientMap,st=!!v.alphaMap,Mt=v.alphaTest>0,vt=!!v.alphaHash,Kt=!!v.extensions;let Le=xi;v.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Le=s.toneMapping);const Je={shaderID:rt,shaderType:v.type,shaderName:v.name,vertexShader:Zt,fragmentShader:J,defines:v.defines,customVertexShaderID:lt,customFragmentShaderID:Q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Et,batchingColor:Et&&I._colorsTexture!==null,instancing:ht,instancingColor:ht&&I.instanceColor!==null,instancingMorph:ht&&I.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:K===null?s.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:gs,alphaToCoverage:!!v.alphaToCoverage,map:Rt,matcap:kt,envMap:de,envMapMode:de&&Z.mapping,envMapCubeUVHeight:W,aoMap:k,lightMap:Ue,bumpMap:te,normalMap:ie,displacementMap:u&&Ft,emissiveMap:ye,normalMapObjectSpace:ie&&v.normalMapType===Od,normalMapTangentSpace:ie&&v.normalMapType===ch,metalnessMap:Ot,roughnessMap:P,anisotropy:S,anisotropyMap:_t,clearcoat:G,clearcoatMap:bt,clearcoatNormalMap:ae,clearcoatRoughnessMap:dt,dispersion:nt,iridescence:at,iridescenceMap:St,iridescenceThicknessMap:Gt,sheen:tt,sheenColorMap:Xt,sheenRoughnessMap:Tt,specularMap:oe,specularColorMap:ee,specularIntensityMap:be,transmission:zt,transmissionMap:U,thicknessMap:gt,gradientMap:$,opaque:v.transparent===!1&&v.blending===is&&v.alphaToCoverage===!1,alphaMap:st,alphaTest:Mt,alphaHash:vt,combine:v.combine,mapUv:Rt&&x(v.map.channel),aoMapUv:k&&x(v.aoMap.channel),lightMapUv:Ue&&x(v.lightMap.channel),bumpMapUv:te&&x(v.bumpMap.channel),normalMapUv:ie&&x(v.normalMap.channel),displacementMapUv:Ft&&x(v.displacementMap.channel),emissiveMapUv:ye&&x(v.emissiveMap.channel),metalnessMapUv:Ot&&x(v.metalnessMap.channel),roughnessMapUv:P&&x(v.roughnessMap.channel),anisotropyMapUv:_t&&x(v.anisotropyMap.channel),clearcoatMapUv:bt&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:ae&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:Gt&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&x(v.sheenRoughnessMap.channel),specularMapUv:oe&&x(v.specularMap.channel),specularColorMapUv:ee&&x(v.specularColorMap.channel),specularIntensityMapUv:be&&x(v.specularIntensityMap.channel),transmissionMapUv:U&&x(v.transmissionMap.channel),thicknessMapUv:gt&&x(v.thicknessMap.channel),alphaMapUv:st&&x(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ie||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!V.attributes.uv&&(Rt||st),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:ct,skinning:I.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Bt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Le,decodeVideoTexture:Rt&&v.map.isVideoTexture===!0&&ce.getTransfer(v.map.colorSpace)===xe,decodeVideoTextureEmissive:ye&&v.emissiveMap.isVideoTexture===!0&&ce.getTransfer(v.emissiveMap.colorSpace)===xe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===rn,flipSided:v.side===Ze,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Kt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Kt&&v.extensions.multiDraw===!0||Et)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Je.vertexUv1s=l.has(1),Je.vertexUv2s=l.has(2),Je.vertexUv3s=l.has(3),l.clear(),Je}function m(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)M.push(C),M.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(_(M,v),b(M,v),M.push(s.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function _(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function b(v,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),v.push(a.mask)}function y(v){const M=p[v.type];let C;if(M){const L=zn[M];C=pu.clone(L.uniforms)}else C=v.uniforms;return C}function A(v,M){let C;for(let L=0,I=h.length;L<I;L++){const H=h[L];if(H.cacheKey===M){C=H,++C.usedTimes;break}}return C===void 0&&(C=new Rm(s,M,v,o),h.push(C)),C}function w(v){if(--v.usedTimes===0){const M=h.indexOf(v);h[M]=h[h.length-1],h.pop(),v.destroy()}}function R(v){c.remove(v)}function E(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:A,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:E}}function Im(){let s=new WeakMap;function t(r){return s.has(r)}function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function n(r){s.delete(r)}function i(r,a,c){s.get(r)[a]=c}function o(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:o}}function zm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function al(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function cl(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(d,u,f,p,x,g){let m=s[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:x,group:g},s[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=x,m.group=g),t++,m}function a(d,u,f,p,x,g){const m=r(d,u,f,p,x,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(d,u,f,p,x,g){const m=r(d,u,f,p,x,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||zm),n.length>1&&n.sort(u||al),i.length>1&&i.sort(u||al)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:c,finish:h,sort:l}}function Um(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new cl,s.set(n,[r])):i>=o.length?(r=new cl,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function km(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Nt};break;case"SpotLight":e={position:new D,direction:new D,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function Nm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Fm=0;function Om(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Bm(s){const t=new km,e=Nm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const i=new D,o=new Wt,r=new Wt;function a(l){let h=0,d=0,u=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,p=0,x=0,g=0,m=0,_=0,b=0,y=0,A=0,w=0,R=0;l.sort(Om);for(let v=0,M=l.length;v<M;v++){const C=l[v],L=C.color,I=C.intensity,H=C.distance,V=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=L.r*I,d+=L.g*I,u+=L.b*I;else if(C.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(C.sh.coefficients[B],I);R++}else if(C.isDirectionalLight){const B=t.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Z=C.shadow,W=e.get(C);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=C.shadow.matrix,_++}n.directional[f]=B,f++}else if(C.isSpotLight){const B=t.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(L).multiplyScalar(I),B.distance=H,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,n.spot[x]=B;const Z=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,Z.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[x]=Z.matrix,C.castShadow){const W=e.get(C);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=V,y++}x++}else if(C.isRectAreaLight){const B=t.get(C);B.color.copy(L).multiplyScalar(I),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=B,g++}else if(C.isPointLight){const B=t.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),B.distance=C.distance,B.decay=C.decay,C.castShadow){const Z=C.shadow,W=e.get(C);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,W.shadowCameraNear=Z.camera.near,W.shadowCameraFar=Z.camera.far,n.pointShadow[p]=W,n.pointShadowMap[p]=V,n.pointShadowMatrix[p]=C.shadow.matrix,b++}n.point[p]=B,p++}else if(C.isHemisphereLight){const B=t.get(C);B.skyColor.copy(C.color).multiplyScalar(I),B.groundColor.copy(C.groundColor).multiplyScalar(I),n.hemi[m]=B,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const E=n.hash;(E.directionalLength!==f||E.pointLength!==p||E.spotLength!==x||E.rectAreaLength!==g||E.hemiLength!==m||E.numDirectionalShadows!==_||E.numPointShadows!==b||E.numSpotShadows!==y||E.numSpotMaps!==A||E.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,E.directionalLength=f,E.pointLength=p,E.spotLength=x,E.rectAreaLength=g,E.hemiLength=m,E.numDirectionalShadows=_,E.numPointShadows=b,E.numSpotShadows=y,E.numSpotMaps=A,E.numLightProbes=R,n.version=Fm++)}function c(l,h){let d=0,u=0,f=0,p=0,x=0;const g=h.matrixWorldInverse;for(let m=0,_=l.length;m<_;m++){const b=l[m];if(b.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(b.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(b.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),r.identity(),o.copy(b.matrixWorld),o.premultiply(g),r.extractRotation(o),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),p++}else if(b.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){const y=n.hemi[x];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:a,setupView:c,state:n}}function ll(s){const t=new Bm(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function Hm(s){let t=new WeakMap;function e(i,o=0){const r=t.get(i);let a;return r===void 0?(a=new ll(s),t.set(i,[a])):o>=r.length?(a=new ll(s),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Gm extends vs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Nd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Vm extends vs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xm=`uniform sampler2D shadow_pass;
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
}`;function qm(s,t,e){let n=new qa;const i=new wt,o=new wt,r=new _e,a=new Gm({depthPacking:Fd}),c=new Vm,l={},h=e.maxTextureSize,d={[ni]:Ze,[Ze]:ni,[rn]:rn},u=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:Wm,fragmentShader:Xm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new De;p.setAttribute("position",new Re(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new O(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$l;let m=this.type;this.render=function(w,R,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const v=s.getRenderTarget(),M=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),L=s.state;L.setBlending(gi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const I=m!==qn&&this.type===qn,H=m===qn&&this.type!==qn;for(let V=0,B=w.length;V<B;V++){const Z=w[V],W=Z.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const rt=W.getFrameExtents();if(i.multiply(rt),o.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/rt.x),i.x=o.x*rt.x,W.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/rt.y),i.y=o.y*rt.y,W.mapSize.y=o.y)),W.map===null||I===!0||H===!0){const At=this.type!==qn?{minFilter:Ke,magFilter:Ke}:{};W.map!==null&&W.map.dispose(),W.map=new Ui(i.x,i.y,At),W.map.texture.name=Z.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const mt=W.getViewportCount();for(let At=0;At<mt;At++){const Bt=W.getViewport(At);r.set(o.x*Bt.x,o.y*Bt.y,o.x*Bt.z,o.y*Bt.w),L.viewport(r),W.updateMatrices(Z,At),n=W.getFrustum(),y(R,E,W.camera,Z,this.type)}W.isPointLightShadow!==!0&&this.type===qn&&_(W,E),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(v,M,C)};function _(w,R){const E=t.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ui(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,E,u,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,E,f,x,null)}function b(w,R,E,v){let M=null;const C=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)M=C;else if(M=E.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const L=M.uuid,I=R.uuid;let H=l[L];H===void 0&&(H={},l[L]=H);let V=H[I];V===void 0&&(V=M.clone(),H[I]=V,R.addEventListener("dispose",A)),M=V}if(M.visible=R.visible,M.wireframe=R.wireframe,v===qn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const L=s.properties.get(M);L.light=E}return M}function y(w,R,E,v,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===qn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);const I=t.update(w),H=w.material;if(Array.isArray(H)){const V=I.groups;for(let B=0,Z=V.length;B<Z;B++){const W=V[B],rt=H[W.materialIndex];if(rt&&rt.visible){const mt=b(w,rt,v,M);w.onBeforeShadow(s,w,R,E,I,mt,W),s.renderBufferDirect(E,null,I,mt,w,W),w.onAfterShadow(s,w,R,E,I,mt,W)}}}else if(H.visible){const V=b(w,H,v,M);w.onBeforeShadow(s,w,R,E,I,V,null),s.renderBufferDirect(E,null,I,V,w,null),w.onAfterShadow(s,w,R,E,I,V,null)}}const L=w.children;for(let I=0,H=L.length;I<H;I++)y(L[I],R,E,v,M)}function A(w){w.target.removeEventListener("dispose",A);for(const E in l){const v=l[E],M=w.target.uuid;M in v&&(v[M].dispose(),delete v[M])}}}const Ym={[Zr]:Kr,[Jr]:ea,[Qr]:na,[ls]:ta,[Kr]:Zr,[ea]:Jr,[na]:Qr,[ta]:ls};function $m(s,t){function e(){let U=!1;const gt=new _e;let $=null;const st=new _e(0,0,0,0);return{setMask:function(Mt){$!==Mt&&!U&&(s.colorMask(Mt,Mt,Mt,Mt),$=Mt)},setLocked:function(Mt){U=Mt},setClear:function(Mt,vt,Kt,Le,Je){Je===!0&&(Mt*=Le,vt*=Le,Kt*=Le),gt.set(Mt,vt,Kt,Le),st.equals(gt)===!1&&(s.clearColor(Mt,vt,Kt,Le),st.copy(gt))},reset:function(){U=!1,$=null,st.set(-1,0,0,0)}}}function n(){let U=!1,gt=!1,$=null,st=null,Mt=null;return{setReversed:function(vt){if(gt!==vt){const Kt=t.get("EXT_clip_control");gt?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT);const Le=Mt;Mt=null,this.setClear(Le)}gt=vt},getReversed:function(){return gt},setTest:function(vt){vt?K(s.DEPTH_TEST):ct(s.DEPTH_TEST)},setMask:function(vt){$!==vt&&!U&&(s.depthMask(vt),$=vt)},setFunc:function(vt){if(gt&&(vt=Ym[vt]),st!==vt){switch(vt){case Zr:s.depthFunc(s.NEVER);break;case Kr:s.depthFunc(s.ALWAYS);break;case Jr:s.depthFunc(s.LESS);break;case ls:s.depthFunc(s.LEQUAL);break;case Qr:s.depthFunc(s.EQUAL);break;case ta:s.depthFunc(s.GEQUAL);break;case ea:s.depthFunc(s.GREATER);break;case na:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}st=vt}},setLocked:function(vt){U=vt},setClear:function(vt){Mt!==vt&&(gt&&(vt=1-vt),s.clearDepth(vt),Mt=vt)},reset:function(){U=!1,$=null,st=null,Mt=null,gt=!1}}}function i(){let U=!1,gt=null,$=null,st=null,Mt=null,vt=null,Kt=null,Le=null,Je=null;return{setTest:function(ge){U||(ge?K(s.STENCIL_TEST):ct(s.STENCIL_TEST))},setMask:function(ge){gt!==ge&&!U&&(s.stencilMask(ge),gt=ge)},setFunc:function(ge,wn,On){($!==ge||st!==wn||Mt!==On)&&(s.stencilFunc(ge,wn,On),$=ge,st=wn,Mt=On)},setOp:function(ge,wn,On){(vt!==ge||Kt!==wn||Le!==On)&&(s.stencilOp(ge,wn,On),vt=ge,Kt=wn,Le=On)},setLocked:function(ge){U=ge},setClear:function(ge){Je!==ge&&(s.clearStencil(ge),Je=ge)},reset:function(){U=!1,gt=null,$=null,st=null,Mt=null,vt=null,Kt=null,Le=null,Je=null}}}const o=new e,r=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,x=!1,g=null,m=null,_=null,b=null,y=null,A=null,w=null,R=new Nt(0,0,0),E=0,v=!1,M=null,C=null,L=null,I=null,H=null;const V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Z=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=Z>=1):W.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=Z>=2);let rt=null,mt={};const At=s.getParameter(s.SCISSOR_BOX),Bt=s.getParameter(s.VIEWPORT),Zt=new _e().fromArray(At),J=new _e().fromArray(Bt);function lt(U,gt,$,st){const Mt=new Uint8Array(4),vt=s.createTexture();s.bindTexture(U,vt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Kt=0;Kt<$;Kt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(gt,0,s.RGBA,1,1,st,0,s.RGBA,s.UNSIGNED_BYTE,Mt):s.texImage2D(gt+Kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Mt);return vt}const Q={};Q[s.TEXTURE_2D]=lt(s.TEXTURE_2D,s.TEXTURE_2D,1),Q[s.TEXTURE_CUBE_MAP]=lt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[s.TEXTURE_2D_ARRAY]=lt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Q[s.TEXTURE_3D]=lt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),K(s.DEPTH_TEST),r.setFunc(ls),te(!1),ie(fc),K(s.CULL_FACE),k(gi);function K(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function ct(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function ht(U,gt){return d[U]!==gt?(s.bindFramebuffer(U,gt),d[U]=gt,U===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=gt),U===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=gt),!0):!1}function Et(U,gt){let $=f,st=!1;if(U){$=u.get(gt),$===void 0&&($=[],u.set(gt,$));const Mt=U.textures;if($.length!==Mt.length||$[0]!==s.COLOR_ATTACHMENT0){for(let vt=0,Kt=Mt.length;vt<Kt;vt++)$[vt]=s.COLOR_ATTACHMENT0+vt;$.length=Mt.length,st=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,st=!0);st&&s.drawBuffers($)}function Rt(U){return p!==U?(s.useProgram(U),p=U,!0):!1}const kt={[Ri]:s.FUNC_ADD,[hd]:s.FUNC_SUBTRACT,[dd]:s.FUNC_REVERSE_SUBTRACT};kt[ud]=s.MIN,kt[fd]=s.MAX;const de={[pd]:s.ZERO,[md]:s.ONE,[gd]:s.SRC_COLOR,[$r]:s.SRC_ALPHA,[bd]:s.SRC_ALPHA_SATURATE,[yd]:s.DST_COLOR,[_d]:s.DST_ALPHA,[xd]:s.ONE_MINUS_SRC_COLOR,[jr]:s.ONE_MINUS_SRC_ALPHA,[Md]:s.ONE_MINUS_DST_COLOR,[vd]:s.ONE_MINUS_DST_ALPHA,[wd]:s.CONSTANT_COLOR,[Sd]:s.ONE_MINUS_CONSTANT_COLOR,[Td]:s.CONSTANT_ALPHA,[Ed]:s.ONE_MINUS_CONSTANT_ALPHA};function k(U,gt,$,st,Mt,vt,Kt,Le,Je,ge){if(U===gi){x===!0&&(ct(s.BLEND),x=!1);return}if(x===!1&&(K(s.BLEND),x=!0),U!==ld){if(U!==g||ge!==v){if((m!==Ri||y!==Ri)&&(s.blendEquation(s.FUNC_ADD),m=Ri,y=Ri),ge)switch(U){case is:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pc:s.blendFunc(s.ONE,s.ONE);break;case mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case is:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pc:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,b=null,A=null,w=null,R.set(0,0,0),E=0,g=U,v=ge}return}Mt=Mt||gt,vt=vt||$,Kt=Kt||st,(gt!==m||Mt!==y)&&(s.blendEquationSeparate(kt[gt],kt[Mt]),m=gt,y=Mt),($!==_||st!==b||vt!==A||Kt!==w)&&(s.blendFuncSeparate(de[$],de[st],de[vt],de[Kt]),_=$,b=st,A=vt,w=Kt),(Le.equals(R)===!1||Je!==E)&&(s.blendColor(Le.r,Le.g,Le.b,Je),R.copy(Le),E=Je),g=U,v=!1}function Ue(U,gt){U.side===rn?ct(s.CULL_FACE):K(s.CULL_FACE);let $=U.side===Ze;gt&&($=!$),te($),U.blending===is&&U.transparent===!1?k(gi):k(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),o.setMask(U.colorWrite);const st=U.stencilWrite;a.setTest(st),st&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ye(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?K(s.SAMPLE_ALPHA_TO_COVERAGE):ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function te(U){M!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),M=U)}function ie(U){U!==ad?(K(s.CULL_FACE),U!==C&&(U===fc?s.cullFace(s.BACK):U===cd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ct(s.CULL_FACE),C=U}function Ft(U){U!==L&&(B&&s.lineWidth(U),L=U)}function ye(U,gt,$){U?(K(s.POLYGON_OFFSET_FILL),(I!==gt||H!==$)&&(s.polygonOffset(gt,$),I=gt,H=$)):ct(s.POLYGON_OFFSET_FILL)}function Ot(U){U?K(s.SCISSOR_TEST):ct(s.SCISSOR_TEST)}function P(U){U===void 0&&(U=s.TEXTURE0+V-1),rt!==U&&(s.activeTexture(U),rt=U)}function S(U,gt,$){$===void 0&&(rt===null?$=s.TEXTURE0+V-1:$=rt);let st=mt[$];st===void 0&&(st={type:void 0,texture:void 0},mt[$]=st),(st.type!==U||st.texture!==gt)&&(rt!==$&&(s.activeTexture($),rt=$),s.bindTexture(U,gt||Q[U]),st.type=U,st.texture=gt)}function G(){const U=mt[rt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function nt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function at(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Gt(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(U){Zt.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Zt.copy(U))}function Tt(U){J.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),J.copy(U))}function oe(U,gt){let $=l.get(gt);$===void 0&&($=new WeakMap,l.set(gt,$));let st=$.get(U);st===void 0&&(st=s.getUniformBlockIndex(gt,U.name),$.set(U,st))}function ee(U,gt){const st=l.get(gt).get(U);c.get(gt)!==st&&(s.uniformBlockBinding(gt,st,U.__bindingPointIndex),c.set(gt,st))}function be(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),r.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},rt=null,mt={},d={},u=new WeakMap,f=[],p=null,x=!1,g=null,m=null,_=null,b=null,y=null,A=null,w=null,R=new Nt(0,0,0),E=0,v=!1,M=null,C=null,L=null,I=null,H=null,Zt.set(0,0,s.canvas.width,s.canvas.height),J.set(0,0,s.canvas.width,s.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:K,disable:ct,bindFramebuffer:ht,drawBuffers:Et,useProgram:Rt,setBlending:k,setMaterial:Ue,setFlipSided:te,setCullFace:ie,setLineWidth:Ft,setPolygonOffset:ye,setScissorTest:Ot,activeTexture:P,bindTexture:S,unbindTexture:G,compressedTexImage2D:nt,compressedTexImage3D:at,texImage2D:St,texImage3D:Gt,updateUBOMapping:oe,uniformBlockBinding:ee,texStorage2D:ae,texStorage3D:dt,texSubImage2D:tt,texSubImage3D:zt,compressedTexSubImage2D:_t,compressedTexSubImage3D:bt,scissor:Xt,viewport:Tt,reset:be}}function hl(s,t,e,n){const i=jm(n);switch(e){case eh:return s*t;case ih:return s*t;case sh:return s*t*2;case oh:return s*t/i.components*i.byteLength;case Va:return s*t/i.components*i.byteLength;case rh:return s*t*2/i.components*i.byteLength;case Wa:return s*t*2/i.components*i.byteLength;case nh:return s*t*3/i.components*i.byteLength;case Mn:return s*t*4/i.components*i.byteLength;case Xa:return s*t*4/i.components*i.byteLength;case zo:case Uo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ko:case No:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case aa:case la:return Math.max(s,16)*Math.max(t,8)/4;case ra:case ca:return Math.max(s,8)*Math.max(t,8)/2;case ha:case da:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ua:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case pa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ma:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ga:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case xa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case _a:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case va:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ya:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ma:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ba:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case wa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Sa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ea:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Fo:case Aa:case Ra:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ah:case Ca:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Pa:case Da:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jm(s){switch(s){case ii:case Jl:return{byteLength:1,components:1};case Os:case Ql:case Gs:return{byteLength:2,components:1};case Ha:case Ga:return{byteLength:2,components:4};case zi:case Ba:case jn:return{byteLength:4,components:1};case th:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Zm(s,t,e,n,i,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new wt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,S){return f?new OffscreenCanvas(P,S):Wo("canvas")}function x(P,S,G){let nt=1;const at=Ot(P);if((at.width>G||at.height>G)&&(nt=G/Math.max(at.width,at.height)),nt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const tt=Math.floor(nt*at.width),zt=Math.floor(nt*at.height);d===void 0&&(d=p(tt,zt));const _t=S?p(tt,zt):d;return _t.width=tt,_t.height=zt,_t.getContext("2d").drawImage(P,0,0,tt,zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+tt+"x"+zt+")."),_t}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),P;return P}function g(P){return P.generateMipmaps}function m(P){s.generateMipmap(P)}function _(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(P,S,G,nt,at=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let tt=S;if(S===s.RED&&(G===s.FLOAT&&(tt=s.R32F),G===s.HALF_FLOAT&&(tt=s.R16F),G===s.UNSIGNED_BYTE&&(tt=s.R8)),S===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.R8UI),G===s.UNSIGNED_SHORT&&(tt=s.R16UI),G===s.UNSIGNED_INT&&(tt=s.R32UI),G===s.BYTE&&(tt=s.R8I),G===s.SHORT&&(tt=s.R16I),G===s.INT&&(tt=s.R32I)),S===s.RG&&(G===s.FLOAT&&(tt=s.RG32F),G===s.HALF_FLOAT&&(tt=s.RG16F),G===s.UNSIGNED_BYTE&&(tt=s.RG8)),S===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.RG8UI),G===s.UNSIGNED_SHORT&&(tt=s.RG16UI),G===s.UNSIGNED_INT&&(tt=s.RG32UI),G===s.BYTE&&(tt=s.RG8I),G===s.SHORT&&(tt=s.RG16I),G===s.INT&&(tt=s.RG32I)),S===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.RGB8UI),G===s.UNSIGNED_SHORT&&(tt=s.RGB16UI),G===s.UNSIGNED_INT&&(tt=s.RGB32UI),G===s.BYTE&&(tt=s.RGB8I),G===s.SHORT&&(tt=s.RGB16I),G===s.INT&&(tt=s.RGB32I)),S===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(tt=s.RGBA16UI),G===s.UNSIGNED_INT&&(tt=s.RGBA32UI),G===s.BYTE&&(tt=s.RGBA8I),G===s.SHORT&&(tt=s.RGBA16I),G===s.INT&&(tt=s.RGBA32I)),S===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),S===s.RGBA){const zt=at?Jo:ce.getTransfer(nt);G===s.FLOAT&&(tt=s.RGBA32F),G===s.HALF_FLOAT&&(tt=s.RGBA16F),G===s.UNSIGNED_BYTE&&(tt=zt===xe?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function y(P,S){let G;return P?S===null||S===zi||S===us?G=s.DEPTH24_STENCIL8:S===jn?G=s.DEPTH32F_STENCIL8:S===Os&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===zi||S===us?G=s.DEPTH_COMPONENT24:S===jn?G=s.DEPTH_COMPONENT32F:S===Os&&(G=s.DEPTH_COMPONENT16),G}function A(P,S){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ke&&P.minFilter!==Un?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function w(P){const S=P.target;S.removeEventListener("dispose",w),E(S),S.isVideoTexture&&h.delete(S)}function R(P){const S=P.target;S.removeEventListener("dispose",R),M(S)}function E(P){const S=n.get(P);if(S.__webglInit===void 0)return;const G=P.source,nt=u.get(G);if(nt){const at=nt[S.__cacheKey];at.usedTimes--,at.usedTimes===0&&v(P),Object.keys(nt).length===0&&u.delete(G)}n.remove(P)}function v(P){const S=n.get(P);s.deleteTexture(S.__webglTexture);const G=P.source,nt=u.get(G);delete nt[S.__cacheKey],r.memory.textures--}function M(P){const S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(S.__webglFramebuffer[nt]))for(let at=0;at<S.__webglFramebuffer[nt].length;at++)s.deleteFramebuffer(S.__webglFramebuffer[nt][at]);else s.deleteFramebuffer(S.__webglFramebuffer[nt]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[nt])}else{if(Array.isArray(S.__webglFramebuffer))for(let nt=0;nt<S.__webglFramebuffer.length;nt++)s.deleteFramebuffer(S.__webglFramebuffer[nt]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let nt=0;nt<S.__webglColorRenderbuffer.length;nt++)S.__webglColorRenderbuffer[nt]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[nt]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const G=P.textures;for(let nt=0,at=G.length;nt<at;nt++){const tt=n.get(G[nt]);tt.__webglTexture&&(s.deleteTexture(tt.__webglTexture),r.memory.textures--),n.remove(G[nt])}n.remove(P)}let C=0;function L(){C=0}function I(){const P=C;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),C+=1,P}function H(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function V(P,S){const G=n.get(P);if(P.isVideoTexture&&Ft(P),P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){const nt=P.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(G,P,S);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+S)}function B(P,S){const G=n.get(P);if(P.version>0&&G.__version!==P.version){J(G,P,S);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+S)}function Z(P,S){const G=n.get(P);if(P.version>0&&G.__version!==P.version){J(G,P,S);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+S)}function W(P,S){const G=n.get(P);if(P.version>0&&G.__version!==P.version){lt(G,P,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+S)}const rt={[$n]:s.REPEAT,[pi]:s.CLAMP_TO_EDGE,[oa]:s.MIRRORED_REPEAT},mt={[Ke]:s.NEAREST,[kd]:s.NEAREST_MIPMAP_NEAREST,[Js]:s.NEAREST_MIPMAP_LINEAR,[Un]:s.LINEAR,[ir]:s.LINEAR_MIPMAP_NEAREST,[Pi]:s.LINEAR_MIPMAP_LINEAR},At={[Bd]:s.NEVER,[qd]:s.ALWAYS,[Hd]:s.LESS,[lh]:s.LEQUAL,[Gd]:s.EQUAL,[Xd]:s.GEQUAL,[Vd]:s.GREATER,[Wd]:s.NOTEQUAL};function Bt(P,S){if(S.type===jn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Un||S.magFilter===ir||S.magFilter===Js||S.magFilter===Pi||S.minFilter===Un||S.minFilter===ir||S.minFilter===Js||S.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,rt[S.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,rt[S.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,rt[S.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,mt[S.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,mt[S.minFilter]),S.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,At[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ke||S.minFilter!==Js&&S.minFilter!==Pi||S.type===jn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Zt(P,S){let G=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",w));const nt=S.source;let at=u.get(nt);at===void 0&&(at={},u.set(nt,at));const tt=H(S);if(tt!==P.__cacheKey){at[tt]===void 0&&(at[tt]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,G=!0),at[tt].usedTimes++;const zt=at[P.__cacheKey];zt!==void 0&&(at[P.__cacheKey].usedTimes--,zt.usedTimes===0&&v(S)),P.__cacheKey=tt,P.__webglTexture=at[tt].texture}return G}function J(P,S,G){let nt=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(nt=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(nt=s.TEXTURE_3D);const at=Zt(P,S),tt=S.source;e.bindTexture(nt,P.__webglTexture,s.TEXTURE0+G);const zt=n.get(tt);if(tt.version!==zt.__version||at===!0){e.activeTexture(s.TEXTURE0+G);const _t=ce.getPrimaries(ce.workingColorSpace),bt=S.colorSpace===fi?null:ce.getPrimaries(S.colorSpace),ae=S.colorSpace===fi||_t===bt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let dt=x(S.image,!1,i.maxTextureSize);dt=ye(S,dt);const St=o.convert(S.format,S.colorSpace),Gt=o.convert(S.type);let Xt=b(S.internalFormat,St,Gt,S.colorSpace,S.isVideoTexture);Bt(nt,S);let Tt;const oe=S.mipmaps,ee=S.isVideoTexture!==!0,be=zt.__version===void 0||at===!0,U=tt.dataReady,gt=A(S,dt);if(S.isDepthTexture)Xt=y(S.format===fs,S.type),be&&(ee?e.texStorage2D(s.TEXTURE_2D,1,Xt,dt.width,dt.height):e.texImage2D(s.TEXTURE_2D,0,Xt,dt.width,dt.height,0,St,Gt,null));else if(S.isDataTexture)if(oe.length>0){ee&&be&&e.texStorage2D(s.TEXTURE_2D,gt,Xt,oe[0].width,oe[0].height);for(let $=0,st=oe.length;$<st;$++)Tt=oe[$],ee?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,Tt.width,Tt.height,St,Gt,Tt.data):e.texImage2D(s.TEXTURE_2D,$,Xt,Tt.width,Tt.height,0,St,Gt,Tt.data);S.generateMipmaps=!1}else ee?(be&&e.texStorage2D(s.TEXTURE_2D,gt,Xt,dt.width,dt.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,dt.width,dt.height,St,Gt,dt.data)):e.texImage2D(s.TEXTURE_2D,0,Xt,dt.width,dt.height,0,St,Gt,dt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ee&&be&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,Xt,oe[0].width,oe[0].height,dt.depth);for(let $=0,st=oe.length;$<st;$++)if(Tt=oe[$],S.format!==Mn)if(St!==null)if(ee){if(U)if(S.layerUpdates.size>0){const Mt=hl(Tt.width,Tt.height,S.format,S.type);for(const vt of S.layerUpdates){const Kt=Tt.data.subarray(vt*Mt/Tt.data.BYTES_PER_ELEMENT,(vt+1)*Mt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,vt,Tt.width,Tt.height,1,St,Kt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,Tt.width,Tt.height,dt.depth,St,Tt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,Xt,Tt.width,Tt.height,dt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,Tt.width,Tt.height,dt.depth,St,Gt,Tt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,$,Xt,Tt.width,Tt.height,dt.depth,0,St,Gt,Tt.data)}else{ee&&be&&e.texStorage2D(s.TEXTURE_2D,gt,Xt,oe[0].width,oe[0].height);for(let $=0,st=oe.length;$<st;$++)Tt=oe[$],S.format!==Mn?St!==null?ee?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,Tt.width,Tt.height,St,Tt.data):e.compressedTexImage2D(s.TEXTURE_2D,$,Xt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,Tt.width,Tt.height,St,Gt,Tt.data):e.texImage2D(s.TEXTURE_2D,$,Xt,Tt.width,Tt.height,0,St,Gt,Tt.data)}else if(S.isDataArrayTexture)if(ee){if(be&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,Xt,dt.width,dt.height,dt.depth),U)if(S.layerUpdates.size>0){const $=hl(dt.width,dt.height,S.format,S.type);for(const st of S.layerUpdates){const Mt=dt.data.subarray(st*$/dt.data.BYTES_PER_ELEMENT,(st+1)*$/dt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,st,dt.width,dt.height,1,St,Gt,Mt)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,St,Gt,dt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Xt,dt.width,dt.height,dt.depth,0,St,Gt,dt.data);else if(S.isData3DTexture)ee?(be&&e.texStorage3D(s.TEXTURE_3D,gt,Xt,dt.width,dt.height,dt.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,St,Gt,dt.data)):e.texImage3D(s.TEXTURE_3D,0,Xt,dt.width,dt.height,dt.depth,0,St,Gt,dt.data);else if(S.isFramebufferTexture){if(be)if(ee)e.texStorage2D(s.TEXTURE_2D,gt,Xt,dt.width,dt.height);else{let $=dt.width,st=dt.height;for(let Mt=0;Mt<gt;Mt++)e.texImage2D(s.TEXTURE_2D,Mt,Xt,$,st,0,St,Gt,null),$>>=1,st>>=1}}else if(oe.length>0){if(ee&&be){const $=Ot(oe[0]);e.texStorage2D(s.TEXTURE_2D,gt,Xt,$.width,$.height)}for(let $=0,st=oe.length;$<st;$++)Tt=oe[$],ee?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,St,Gt,Tt):e.texImage2D(s.TEXTURE_2D,$,Xt,St,Gt,Tt);S.generateMipmaps=!1}else if(ee){if(be){const $=Ot(dt);e.texStorage2D(s.TEXTURE_2D,gt,Xt,$.width,$.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St,Gt,dt)}else e.texImage2D(s.TEXTURE_2D,0,Xt,St,Gt,dt);g(S)&&m(nt),zt.__version=tt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function lt(P,S,G){if(S.image.length!==6)return;const nt=Zt(P,S),at=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+G);const tt=n.get(at);if(at.version!==tt.__version||nt===!0){e.activeTexture(s.TEXTURE0+G);const zt=ce.getPrimaries(ce.workingColorSpace),_t=S.colorSpace===fi?null:ce.getPrimaries(S.colorSpace),bt=S.colorSpace===fi||zt===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const ae=S.isCompressedTexture||S.image[0].isCompressedTexture,dt=S.image[0]&&S.image[0].isDataTexture,St=[];for(let st=0;st<6;st++)!ae&&!dt?St[st]=x(S.image[st],!0,i.maxCubemapSize):St[st]=dt?S.image[st].image:S.image[st],St[st]=ye(S,St[st]);const Gt=St[0],Xt=o.convert(S.format,S.colorSpace),Tt=o.convert(S.type),oe=b(S.internalFormat,Xt,Tt,S.colorSpace),ee=S.isVideoTexture!==!0,be=tt.__version===void 0||nt===!0,U=at.dataReady;let gt=A(S,Gt);Bt(s.TEXTURE_CUBE_MAP,S);let $;if(ae){ee&&be&&e.texStorage2D(s.TEXTURE_CUBE_MAP,gt,oe,Gt.width,Gt.height);for(let st=0;st<6;st++){$=St[st].mipmaps;for(let Mt=0;Mt<$.length;Mt++){const vt=$[Mt];S.format!==Mn?Xt!==null?ee?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,0,0,vt.width,vt.height,Xt,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,oe,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ee?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,0,0,vt.width,vt.height,Xt,Tt,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt,oe,vt.width,vt.height,0,Xt,Tt,vt.data)}}}else{if($=S.mipmaps,ee&&be){$.length>0&&gt++;const st=Ot(St[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,gt,oe,st.width,st.height)}for(let st=0;st<6;st++)if(dt){ee?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,St[st].width,St[st].height,Xt,Tt,St[st].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,oe,St[st].width,St[st].height,0,Xt,Tt,St[st].data);for(let Mt=0;Mt<$.length;Mt++){const Kt=$[Mt].image[st].image;ee?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,0,0,Kt.width,Kt.height,Xt,Tt,Kt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,oe,Kt.width,Kt.height,0,Xt,Tt,Kt.data)}}else{ee?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Xt,Tt,St[st]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,oe,Xt,Tt,St[st]);for(let Mt=0;Mt<$.length;Mt++){const vt=$[Mt];ee?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,0,0,Xt,Tt,vt.image[st]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+st,Mt+1,oe,Xt,Tt,vt.image[st])}}}g(S)&&m(s.TEXTURE_CUBE_MAP),tt.__version=at.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Q(P,S,G,nt,at,tt){const zt=o.convert(G.format,G.colorSpace),_t=o.convert(G.type),bt=b(G.internalFormat,zt,_t,G.colorSpace),ae=n.get(S),dt=n.get(G);if(dt.__renderTarget=S,!ae.__hasExternalTextures){const St=Math.max(1,S.width>>tt),Gt=Math.max(1,S.height>>tt);at===s.TEXTURE_3D||at===s.TEXTURE_2D_ARRAY?e.texImage3D(at,tt,bt,St,Gt,S.depth,0,zt,_t,null):e.texImage2D(at,tt,bt,St,Gt,0,zt,_t,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),ie(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,nt,at,dt.__webglTexture,0,te(S)):(at===s.TEXTURE_2D||at>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,nt,at,dt.__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function K(P,S,G){if(s.bindRenderbuffer(s.RENDERBUFFER,P),S.depthBuffer){const nt=S.depthTexture,at=nt&&nt.isDepthTexture?nt.type:null,tt=y(S.stencilBuffer,at),zt=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=te(S);ie(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t,tt,S.width,S.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,_t,tt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,tt,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,zt,s.RENDERBUFFER,P)}else{const nt=S.textures;for(let at=0;at<nt.length;at++){const tt=nt[at],zt=o.convert(tt.format,tt.colorSpace),_t=o.convert(tt.type),bt=b(tt.internalFormat,zt,_t,tt.colorSpace),ae=te(S);G&&ie(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ae,bt,S.width,S.height):ie(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ae,bt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,bt,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ct(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=n.get(S.depthTexture);nt.__renderTarget=S,(!nt.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const at=nt.__webglTexture,tt=te(S);if(S.depthTexture.format===ss)ie(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,at,0,tt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,at,0);else if(S.depthTexture.format===fs)ie(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,at,0,tt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function ht(P){const S=n.get(P),G=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const nt=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),nt){const at=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,nt.removeEventListener("dispose",at)};nt.addEventListener("dispose",at),S.__depthDisposeCallback=at}S.__boundDepthTexture=nt}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ct(S.__webglFramebuffer,P)}else if(G){S.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[nt]),S.__webglDepthbuffer[nt]===void 0)S.__webglDepthbuffer[nt]=s.createRenderbuffer(),K(S.__webglDepthbuffer[nt],P,!1);else{const at=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer[nt];s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,at,s.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),K(S.__webglDepthbuffer,P,!1);else{const nt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,at),s.framebufferRenderbuffer(s.FRAMEBUFFER,nt,s.RENDERBUFFER,at)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Et(P,S,G){const nt=n.get(P);S!==void 0&&Q(nt.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&ht(P)}function Rt(P){const S=P.texture,G=n.get(P),nt=n.get(S);P.addEventListener("dispose",R);const at=P.textures,tt=P.isWebGLCubeRenderTarget===!0,zt=at.length>1;if(zt||(nt.__webglTexture===void 0&&(nt.__webglTexture=s.createTexture()),nt.__version=S.version,r.memory.textures++),tt){G.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[_t]=[];for(let bt=0;bt<S.mipmaps.length;bt++)G.__webglFramebuffer[_t][bt]=s.createFramebuffer()}else G.__webglFramebuffer[_t]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let _t=0;_t<S.mipmaps.length;_t++)G.__webglFramebuffer[_t]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(zt)for(let _t=0,bt=at.length;_t<bt;_t++){const ae=n.get(at[_t]);ae.__webglTexture===void 0&&(ae.__webglTexture=s.createTexture(),r.memory.textures++)}if(P.samples>0&&ie(P)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let _t=0;_t<at.length;_t++){const bt=at[_t];G.__webglColorRenderbuffer[_t]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[_t]);const ae=o.convert(bt.format,bt.colorSpace),dt=o.convert(bt.type),St=b(bt.internalFormat,ae,dt,bt.colorSpace,P.isXRRenderTarget===!0),Gt=te(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Gt,St,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,G.__webglColorRenderbuffer[_t])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),K(G.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(tt){e.bindTexture(s.TEXTURE_CUBE_MAP,nt.__webglTexture),Bt(s.TEXTURE_CUBE_MAP,S);for(let _t=0;_t<6;_t++)if(S.mipmaps&&S.mipmaps.length>0)for(let bt=0;bt<S.mipmaps.length;bt++)Q(G.__webglFramebuffer[_t][bt],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,bt);else Q(G.__webglFramebuffer[_t],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);g(S)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(zt){for(let _t=0,bt=at.length;_t<bt;_t++){const ae=at[_t],dt=n.get(ae);e.bindTexture(s.TEXTURE_2D,dt.__webglTexture),Bt(s.TEXTURE_2D,ae),Q(G.__webglFramebuffer,P,ae,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,0),g(ae)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let _t=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_t=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(_t,nt.__webglTexture),Bt(_t,S),S.mipmaps&&S.mipmaps.length>0)for(let bt=0;bt<S.mipmaps.length;bt++)Q(G.__webglFramebuffer[bt],P,S,s.COLOR_ATTACHMENT0,_t,bt);else Q(G.__webglFramebuffer,P,S,s.COLOR_ATTACHMENT0,_t,0);g(S)&&m(_t),e.unbindTexture()}P.depthBuffer&&ht(P)}function kt(P){const S=P.textures;for(let G=0,nt=S.length;G<nt;G++){const at=S[G];if(g(at)){const tt=_(P),zt=n.get(at).__webglTexture;e.bindTexture(tt,zt),m(tt),e.unbindTexture()}}}const de=[],k=[];function Ue(P){if(P.samples>0){if(ie(P)===!1){const S=P.textures,G=P.width,nt=P.height;let at=s.COLOR_BUFFER_BIT;const tt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,zt=n.get(P),_t=S.length>1;if(_t)for(let bt=0;bt<S.length;bt++)e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,zt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let bt=0;bt<S.length;bt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(at|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(at|=s.STENCIL_BUFFER_BIT)),_t){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,zt.__webglColorRenderbuffer[bt]);const ae=n.get(S[bt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ae,0)}s.blitFramebuffer(0,0,G,nt,0,0,G,nt,at,s.NEAREST),c===!0&&(de.length=0,k.length=0,de.push(s.COLOR_ATTACHMENT0+bt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(de.push(tt),k.push(tt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,k)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,de))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),_t)for(let bt=0;bt<S.length;bt++){e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,zt.__webglColorRenderbuffer[bt]);const ae=n.get(S[bt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,ae,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const S=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function te(P){return Math.min(i.maxSamples,P.samples)}function ie(P){const S=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ft(P){const S=r.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function ye(P,S){const G=P.colorSpace,nt=P.format,at=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||G!==gs&&G!==fi&&(ce.getTransfer(G)===xe?(nt!==Mn||at!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function Ot(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=L,this.setTexture2D=V,this.setTexture2DArray=B,this.setTexture3D=Z,this.setTextureCube=W,this.rebindTextures=Et,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=ie}function Km(s,t){function e(n,i=fi){let o;const r=ce.getTransfer(i);if(n===ii)return s.UNSIGNED_BYTE;if(n===Ha)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ga)return s.UNSIGNED_SHORT_5_5_5_1;if(n===th)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return s.BYTE;if(n===Ql)return s.SHORT;if(n===Os)return s.UNSIGNED_SHORT;if(n===Ba)return s.INT;if(n===zi)return s.UNSIGNED_INT;if(n===jn)return s.FLOAT;if(n===Gs)return s.HALF_FLOAT;if(n===eh)return s.ALPHA;if(n===nh)return s.RGB;if(n===Mn)return s.RGBA;if(n===ih)return s.LUMINANCE;if(n===sh)return s.LUMINANCE_ALPHA;if(n===ss)return s.DEPTH_COMPONENT;if(n===fs)return s.DEPTH_STENCIL;if(n===oh)return s.RED;if(n===Va)return s.RED_INTEGER;if(n===rh)return s.RG;if(n===Wa)return s.RG_INTEGER;if(n===Xa)return s.RGBA_INTEGER;if(n===zo||n===Uo||n===ko||n===No)if(r===xe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===zo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ko)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===No)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===zo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ko)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===No)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ra||n===aa||n===ca||n===la)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===ra)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===aa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ca)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===la)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ha||n===da||n===ua)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===ha||n===da)return r===xe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===ua)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fa||n===pa||n===ma||n===ga||n===xa||n===_a||n===va||n===ya||n===Ma||n===ba||n===wa||n===Sa||n===Ta||n===Ea)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===fa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ma)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ga)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_a)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===va)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ya)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ma)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ba)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ta)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ea)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fo||n===Aa||n===Ra)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Fo)return r===xe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Aa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ra)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ah||n===Ca||n===Pa||n===Da)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Fo)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Ca)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Da)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Jm extends un{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ct extends ze{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ct;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const tg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eg=`
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

}`;class ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new nn,o=t.properties.get(i);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Dn({vertexShader:tg,fragmentShader:eg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new O(new Me(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ig extends xs{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const x=new ng,g=e.getContextAttributes();let m=null,_=null;const b=[],y=[],A=new wt;let w=null;const R=new un;R.viewport=new _e;const E=new un;E.viewport=new _e;const v=[R,E],M=new Jm;let C=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let lt=b[J];return lt===void 0&&(lt=new Lr,b[J]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function(J){let lt=b[J];return lt===void 0&&(lt=new Lr,b[J]=lt),lt.getGripSpace()},this.getHand=function(J){let lt=b[J];return lt===void 0&&(lt=new Lr,b[J]=lt),lt.getHandSpace()};function I(J){const lt=y.indexOf(J.inputSource);if(lt===-1)return;const Q=b[lt];Q!==void 0&&(Q.update(J.inputSource,J.frame,l||r),Q.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",V);for(let J=0;J<b.length;J++){const lt=y[J];lt!==null&&(y[J]=null,b[J].disconnect(lt))}C=null,L=null,x.reset(),t.setRenderTarget(m),f=null,u=null,d=null,i=null,_=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",H),i.addEventListener("inputsourceschange",V),g.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(A),i.renderState.layers===void 0){const lt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(i,e,lt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Ui(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:ii,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let lt=null,Q=null,K=null;g.depth&&(K=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,lt=g.stencil?fs:ss,Q=g.stencil?us:zi);const ct={colorFormat:e.RGBA8,depthFormat:K,scaleFactor:o};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(ct),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new Ui(u.textureWidth,u.textureHeight,{format:Mn,type:ii,depthTexture:new wh(u.textureWidth,u.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),Zt.setContext(i),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function V(J){for(let lt=0;lt<J.removed.length;lt++){const Q=J.removed[lt],K=y.indexOf(Q);K>=0&&(y[K]=null,b[K].disconnect(Q))}for(let lt=0;lt<J.added.length;lt++){const Q=J.added[lt];let K=y.indexOf(Q);if(K===-1){for(let ht=0;ht<b.length;ht++)if(ht>=y.length){y.push(Q),K=ht;break}else if(y[ht]===null){y[ht]=Q,K=ht;break}if(K===-1)break}const ct=b[K];ct&&ct.connect(Q)}}const B=new D,Z=new D;function W(J,lt,Q){B.setFromMatrixPosition(lt.matrixWorld),Z.setFromMatrixPosition(Q.matrixWorld);const K=B.distanceTo(Z),ct=lt.projectionMatrix.elements,ht=Q.projectionMatrix.elements,Et=ct[14]/(ct[10]-1),Rt=ct[14]/(ct[10]+1),kt=(ct[9]+1)/ct[5],de=(ct[9]-1)/ct[5],k=(ct[8]-1)/ct[0],Ue=(ht[8]+1)/ht[0],te=Et*k,ie=Et*Ue,Ft=K/(-k+Ue),ye=Ft*-k;if(lt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ye),J.translateZ(Ft),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),ct[10]===-1)J.projectionMatrix.copy(lt.projectionMatrix),J.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const Ot=Et+Ft,P=Rt+Ft,S=te-ye,G=ie+(K-ye),nt=kt*Rt/P*Ot,at=de*Rt/P*Ot;J.projectionMatrix.makePerspective(S,G,nt,at,Ot,P),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function rt(J,lt){lt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(lt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let lt=J.near,Q=J.far;x.texture!==null&&(x.depthNear>0&&(lt=x.depthNear),x.depthFar>0&&(Q=x.depthFar)),M.near=E.near=R.near=lt,M.far=E.far=R.far=Q,(C!==M.near||L!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,L=M.far),R.layers.mask=J.layers.mask|2,E.layers.mask=J.layers.mask|4,M.layers.mask=R.layers.mask|E.layers.mask;const K=J.parent,ct=M.cameras;rt(M,K);for(let ht=0;ht<ct.length;ht++)rt(ct[ht],K);ct.length===2?W(M,R,E):M.projectionMatrix.copy(R.projectionMatrix),mt(J,M,K)};function mt(J,lt,Q){Q===null?J.matrix.copy(lt.matrixWorld):(J.matrix.copy(Q.matrixWorld),J.matrix.invert(),J.matrix.multiply(lt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(lt.projectionMatrix),J.projectionMatrixInverse.copy(lt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Vo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(J){c=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let At=null;function Bt(J,lt){if(h=lt.getViewerPose(l||r),p=lt,h!==null){const Q=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let K=!1;Q.length!==M.cameras.length&&(M.cameras.length=0,K=!0);for(let ht=0;ht<Q.length;ht++){const Et=Q[ht];let Rt=null;if(f!==null)Rt=f.getViewport(Et);else{const de=d.getViewSubImage(u,Et);Rt=de.viewport,ht===0&&(t.setRenderTargetTextures(_,de.colorTexture,u.ignoreDepthValues?void 0:de.depthStencilTexture),t.setRenderTarget(_))}let kt=v[ht];kt===void 0&&(kt=new un,kt.layers.enable(ht),kt.viewport=new _e,v[ht]=kt),kt.matrix.fromArray(Et.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Et.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),ht===0&&(M.matrix.copy(kt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),K===!0&&M.cameras.push(kt)}const ct=i.enabledFeatures;if(ct&&ct.includes("depth-sensing")){const ht=d.getDepthInformation(Q[0]);ht&&ht.isValid&&ht.texture&&x.init(t,ht,i.renderState)}}for(let Q=0;Q<b.length;Q++){const K=y[Q],ct=b[Q];K!==null&&ct!==void 0&&ct.update(K,lt,l||r)}At&&At(J,lt),lt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:lt}),p=null}const Zt=new Mh;Zt.setAnimationLoop(Bt),this.setAnimationLoop=function(J){At=J},this.dispose=function(){}}}const Ti=new kn,sg=new Wt;function og(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,_h(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,b,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(g,m):m.isMeshToonMaterial?(o(g,m),d(g,m)):m.isMeshPhongMaterial?(o(g,m),h(g,m)):m.isMeshStandardMaterial?(o(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(o(g,m),p(g,m)):m.isMeshDepthMaterial?o(g,m):m.isMeshDistanceMaterial?(o(g,m),x(g,m)):m.isMeshNormalMaterial?o(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,_,b):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ze&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ze&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=t.get(m),b=_.envMap,y=_.envMapRotation;b&&(g.envMap.value=b,Ti.copy(y),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),g.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(Ti)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,_,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ze&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const _=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function rg(s,t,e,n){let i={},o={},r=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,b){const y=b.program;n.uniformBlockBinding(_,y)}function l(_,b){let y=i[_.id];y===void 0&&(p(_),y=h(_),i[_.id]=y,_.addEventListener("dispose",g));const A=b.program;n.updateUBOMapping(_,A);const w=t.render.frame;o[_.id]!==w&&(u(_),o[_.id]=w)}function h(_){const b=d();_.__bindingPointIndex=b;const y=s.createBuffer(),A=_.__size,w=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,A,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,y),y}function d(){for(let _=0;_<a;_++)if(r.indexOf(_)===-1)return r.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const b=i[_.id],y=_.uniforms,A=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let w=0,R=y.length;w<R;w++){const E=Array.isArray(y[w])?y[w]:[y[w]];for(let v=0,M=E.length;v<M;v++){const C=E[v];if(f(C,w,v,A)===!0){const L=C.__offset,I=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let V=0;V<I.length;V++){const B=I[V],Z=x(B);typeof B=="number"||typeof B=="boolean"?(C.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,L+H,C.__data)):B.isMatrix3?(C.__data[0]=B.elements[0],C.__data[1]=B.elements[1],C.__data[2]=B.elements[2],C.__data[3]=0,C.__data[4]=B.elements[3],C.__data[5]=B.elements[4],C.__data[6]=B.elements[5],C.__data[7]=0,C.__data[8]=B.elements[6],C.__data[9]=B.elements[7],C.__data[10]=B.elements[8],C.__data[11]=0):(B.toArray(C.__data,H),H+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,L,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(_,b,y,A){const w=_.value,R=b+"_"+y;if(A[R]===void 0)return typeof w=="number"||typeof w=="boolean"?A[R]=w:A[R]=w.clone(),!0;{const E=A[R];if(typeof w=="number"||typeof w=="boolean"){if(E!==w)return A[R]=w,!0}else if(E.equals(w)===!1)return E.copy(w),!0}return!1}function p(_){const b=_.uniforms;let y=0;const A=16;for(let R=0,E=b.length;R<E;R++){const v=Array.isArray(b[R])?b[R]:[b[R]];for(let M=0,C=v.length;M<C;M++){const L=v[M],I=Array.isArray(L.value)?L.value:[L.value];for(let H=0,V=I.length;H<V;H++){const B=I[H],Z=x(B),W=y%A,rt=W%Z.boundary,mt=W+rt;y+=rt,mt!==0&&A-mt<Z.storage&&(y+=A-mt),L.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=Z.storage}}}const w=y%A;return w>0&&(y+=A-w),_.__size=y,_.__cache={},this}function x(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),b}function g(_){const b=_.target;b.removeEventListener("dispose",g);const y=r.indexOf(b.__bindingPointIndex);r.splice(y,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete o[b.id]}function m(){for(const _ in i)s.deleteBuffer(i[_]);r=[],i={},o={}}return{bind:c,update:l,dispose:m}}class ag{constructor(t={}){const{canvas:e=$d(),context:n=null,depth:i=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const p=new Uint32Array(4),x=new Int32Array(4);let g=null,m=null;const _=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dn,this.toneMapping=xi,this.toneMappingExposure=1;const y=this;let A=!1,w=0,R=0,E=null,v=-1,M=null;const C=new _e,L=new _e;let I=null;const H=new Nt(0);let V=0,B=e.width,Z=e.height,W=1,rt=null,mt=null;const At=new _e(0,0,B,Z),Bt=new _e(0,0,B,Z);let Zt=!1;const J=new qa;let lt=!1,Q=!1;const K=new Wt,ct=new Wt,ht=new D,Et=new _e,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function de(){return E===null?W:1}let k=n;function Ue(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oa}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),k===null){const N="webgl2";if(k=Ue(N,T),k===null)throw Ue(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let te,ie,Ft,ye,Ot,P,S,G,nt,at,tt,zt,_t,bt,ae,dt,St,Gt,Xt,Tt,oe,ee,be,U;function gt(){te=new up(k),te.init(),ee=new Km(k,te),ie=new rp(k,te,t,ee),Ft=new $m(k,te),ie.reverseDepthBuffer&&u&&Ft.buffers.depth.setReversed(!0),ye=new mp(k),Ot=new Im,P=new Zm(k,te,Ft,Ot,ie,ee,ye),S=new cp(y),G=new dp(y),nt=new Mu(k),be=new sp(k,nt),at=new fp(k,nt,ye,be),tt=new xp(k,at,nt,ye),Xt=new gp(k,ie,P),dt=new ap(Ot),zt=new Lm(y,S,G,te,ie,be,dt),_t=new og(y,Ot),bt=new Um,ae=new Hm(te),Gt=new ip(y,S,G,Ft,tt,f,c),St=new qm(y,tt,ie),U=new rg(k,ye,ie,Ft),Tt=new op(k,te,ye),oe=new pp(k,te,ye),ye.programs=zt.programs,y.capabilities=ie,y.extensions=te,y.properties=Ot,y.renderLists=bt,y.shadowMap=St,y.state=Ft,y.info=ye}gt();const $=new ig(y,k);this.xr=$,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=te.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=te.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(B,Z,!1))},this.getSize=function(T){return T.set(B,Z)},this.setSize=function(T,N,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=T,Z=N,e.width=Math.floor(T*W),e.height=Math.floor(N*W),X===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(B*W,Z*W).floor()},this.setDrawingBufferSize=function(T,N,X){B=T,Z=N,W=X,e.width=Math.floor(T*X),e.height=Math.floor(N*X),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(At)},this.setViewport=function(T,N,X,q){T.isVector4?At.set(T.x,T.y,T.z,T.w):At.set(T,N,X,q),Ft.viewport(C.copy(At).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(Bt)},this.setScissor=function(T,N,X,q){T.isVector4?Bt.set(T.x,T.y,T.z,T.w):Bt.set(T,N,X,q),Ft.scissor(L.copy(Bt).multiplyScalar(W).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(T){Ft.setScissorTest(Zt=T)},this.setOpaqueSort=function(T){rt=T},this.setTransparentSort=function(T){mt=T},this.getClearColor=function(T){return T.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor.apply(Gt,arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha.apply(Gt,arguments)},this.clear=function(T=!0,N=!0,X=!0){let q=0;if(T){let F=!1;if(E!==null){const ut=E.texture.format;F=ut===Xa||ut===Wa||ut===Va}if(F){const ut=E.texture.type,yt=ut===ii||ut===zi||ut===Os||ut===us||ut===Ha||ut===Ga,Pt=Gt.getClearColor(),Dt=Gt.getClearAlpha(),$t=Pt.r,Jt=Pt.g,Lt=Pt.b;yt?(p[0]=$t,p[1]=Jt,p[2]=Lt,p[3]=Dt,k.clearBufferuiv(k.COLOR,0,p)):(x[0]=$t,x[1]=Jt,x[2]=Lt,x[3]=Dt,k.clearBufferiv(k.COLOR,0,x))}else q|=k.COLOR_BUFFER_BIT}N&&(q|=k.DEPTH_BUFFER_BIT),X&&(q|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),bt.dispose(),ae.dispose(),Ot.dispose(),S.dispose(),G.dispose(),tt.dispose(),be.dispose(),U.dispose(),zt.dispose(),$.dispose(),$.removeEventListener("sessionstart",oc),$.removeEventListener("sessionend",rc),vi.stop()};function st(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=ye.autoReset,N=St.enabled,X=St.autoUpdate,q=St.needsUpdate,F=St.type;gt(),ye.autoReset=T,St.enabled=N,St.autoUpdate=X,St.needsUpdate=q,St.type=F}function vt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Kt(T){const N=T.target;N.removeEventListener("dispose",Kt),Le(N)}function Le(T){Je(T),Ot.remove(T)}function Je(T){const N=Ot.get(T).programs;N!==void 0&&(N.forEach(function(X){zt.releaseProgram(X)}),T.isShaderMaterial&&zt.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,X,q,F,ut){N===null&&(N=Rt);const yt=F.isMesh&&F.matrixWorld.determinant()<0,Pt=sd(T,N,X,q,F);Ft.setMaterial(q,yt);let Dt=X.index,$t=1;if(q.wireframe===!0){if(Dt=at.getWireframeAttribute(X),Dt===void 0)return;$t=2}const Jt=X.drawRange,Lt=X.attributes.position;let he=Jt.start*$t,we=(Jt.start+Jt.count)*$t;ut!==null&&(he=Math.max(he,ut.start*$t),we=Math.min(we,(ut.start+ut.count)*$t)),Dt!==null?(he=Math.max(he,0),we=Math.min(we,Dt.count)):Lt!=null&&(he=Math.max(he,0),we=Math.min(we,Lt.count));const Te=we-he;if(Te<0||Te===1/0)return;be.setup(F,q,Pt,X,Dt);let cn,fe=Tt;if(Dt!==null&&(cn=nt.get(Dt),fe=oe,fe.setIndex(cn)),F.isMesh)q.wireframe===!0?(Ft.setLineWidth(q.wireframeLinewidth*de()),fe.setMode(k.LINES)):fe.setMode(k.TRIANGLES);else if(F.isLine){let Ut=q.linewidth;Ut===void 0&&(Ut=1),Ft.setLineWidth(Ut*de()),F.isLineSegments?fe.setMode(k.LINES):F.isLineLoop?fe.setMode(k.LINE_LOOP):fe.setMode(k.LINE_STRIP)}else F.isPoints?fe.setMode(k.POINTS):F.isSprite&&fe.setMode(k.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)fe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))fe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ut=F._multiDrawStarts,Bn=F._multiDrawCounts,pe=F._multiDrawCount,Sn=Dt?nt.get(Dt).bytesPerElement:1,Oi=Ot.get(q).currentProgram.getUniforms();for(let gn=0;gn<pe;gn++)Oi.setValue(k,"_gl_DrawID",gn),fe.render(Ut[gn]/Sn,Bn[gn])}else if(F.isInstancedMesh)fe.renderInstances(he,Te,F.count);else if(X.isInstancedBufferGeometry){const Ut=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Bn=Math.min(X.instanceCount,Ut);fe.renderInstances(he,Te,Bn)}else fe.render(he,Te)};function ge(T,N,X){T.transparent===!0&&T.side===rn&&T.forceSinglePass===!1?(T.side=Ze,T.needsUpdate=!0,Ks(T,N,X),T.side=ni,T.needsUpdate=!0,Ks(T,N,X),T.side=rn):Ks(T,N,X)}this.compile=function(T,N,X=null){X===null&&(X=T),m=ae.get(X),m.init(N),b.push(m),X.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),T!==X&&T.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const q=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ut=F.material;if(ut)if(Array.isArray(ut))for(let yt=0;yt<ut.length;yt++){const Pt=ut[yt];ge(Pt,X,F),q.add(Pt)}else ge(ut,X,F),q.add(ut)}),b.pop(),m=null,q},this.compileAsync=function(T,N,X=null){const q=this.compile(T,N,X);return new Promise(F=>{function ut(){if(q.forEach(function(yt){Ot.get(yt).currentProgram.isReady()&&q.delete(yt)}),q.size===0){F(T);return}setTimeout(ut,10)}te.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let wn=null;function On(T){wn&&wn(T)}function oc(){vi.stop()}function rc(){vi.start()}const vi=new Mh;vi.setAnimationLoop(On),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(T){wn=T,$.setAnimationLoop(T),T===null?vi.stop():vi.start()},$.addEventListener("sessionstart",oc),$.addEventListener("sessionend",rc),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(N),N=$.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,N,E),m=ae.get(T,b.length),m.init(N),b.push(m),ct.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),J.setFromProjectionMatrix(ct),Q=this.localClippingEnabled,lt=dt.init(this.clippingPlanes,Q),g=bt.get(T,_.length),g.init(),_.push(g),$.enabled===!0&&$.isPresenting===!0){const ut=y.xr.getDepthSensingMesh();ut!==null&&nr(ut,N,-1/0,y.sortObjects)}nr(T,N,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(rt,mt),kt=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,kt&&Gt.addToRenderList(g,T),this.info.render.frame++,lt===!0&&dt.beginShadows();const X=m.state.shadowsArray;St.render(X,T,N),lt===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=g.opaque,F=g.transmissive;if(m.setupLights(),N.isArrayCamera){const ut=N.cameras;if(F.length>0)for(let yt=0,Pt=ut.length;yt<Pt;yt++){const Dt=ut[yt];cc(q,F,T,Dt)}kt&&Gt.render(T);for(let yt=0,Pt=ut.length;yt<Pt;yt++){const Dt=ut[yt];ac(g,T,Dt,Dt.viewport)}}else F.length>0&&cc(q,F,T,N),kt&&Gt.render(T),ac(g,T,N);E!==null&&(P.updateMultisampleRenderTarget(E),P.updateRenderTargetMipmap(E)),T.isScene===!0&&T.onAfterRender(y,T,N),be.resetDefaultState(),v=-1,M=null,b.pop(),b.length>0?(m=b[b.length-1],lt===!0&&dt.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function nr(T,N,X,q){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){q&&Et.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ct);const yt=tt.update(T),Pt=T.material;Pt.visible&&g.push(T,yt,Pt,X,Et.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const yt=tt.update(T),Pt=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Et.copy(T.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Et.copy(yt.boundingSphere.center)),Et.applyMatrix4(T.matrixWorld).applyMatrix4(ct)),Array.isArray(Pt)){const Dt=yt.groups;for(let $t=0,Jt=Dt.length;$t<Jt;$t++){const Lt=Dt[$t],he=Pt[Lt.materialIndex];he&&he.visible&&g.push(T,yt,he,X,Et.z,Lt)}}else Pt.visible&&g.push(T,yt,Pt,X,Et.z,null)}}const ut=T.children;for(let yt=0,Pt=ut.length;yt<Pt;yt++)nr(ut[yt],N,X,q)}function ac(T,N,X,q){const F=T.opaque,ut=T.transmissive,yt=T.transparent;m.setupLightsView(X),lt===!0&&dt.setGlobalState(y.clippingPlanes,X),q&&Ft.viewport(C.copy(q)),F.length>0&&Zs(F,N,X),ut.length>0&&Zs(ut,N,X),yt.length>0&&Zs(yt,N,X),Ft.buffers.depth.setTest(!0),Ft.buffers.depth.setMask(!0),Ft.buffers.color.setMask(!0),Ft.setPolygonOffset(!1)}function cc(T,N,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[q.id]===void 0&&(m.state.transmissionRenderTarget[q.id]=new Ui(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Gs:ii,minFilter:Pi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ce.workingColorSpace}));const ut=m.state.transmissionRenderTarget[q.id],yt=q.viewport||C;ut.setSize(yt.z,yt.w);const Pt=y.getRenderTarget();y.setRenderTarget(ut),y.getClearColor(H),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),kt&&Gt.render(X);const Dt=y.toneMapping;y.toneMapping=xi;const $t=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),m.setupLightsView(q),lt===!0&&dt.setGlobalState(y.clippingPlanes,q),Zs(T,X,q),P.updateMultisampleRenderTarget(ut),P.updateRenderTargetMipmap(ut),te.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let Lt=0,he=N.length;Lt<he;Lt++){const we=N[Lt],Te=we.object,cn=we.geometry,fe=we.material,Ut=we.group;if(fe.side===rn&&Te.layers.test(q.layers)){const Bn=fe.side;fe.side=Ze,fe.needsUpdate=!0,lc(Te,X,q,cn,fe,Ut),fe.side=Bn,fe.needsUpdate=!0,Jt=!0}}Jt===!0&&(P.updateMultisampleRenderTarget(ut),P.updateRenderTargetMipmap(ut))}y.setRenderTarget(Pt),y.setClearColor(H,V),$t!==void 0&&(q.viewport=$t),y.toneMapping=Dt}function Zs(T,N,X){const q=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ut=T.length;F<ut;F++){const yt=T[F],Pt=yt.object,Dt=yt.geometry,$t=q===null?yt.material:q,Jt=yt.group;Pt.layers.test(X.layers)&&lc(Pt,N,X,Dt,$t,Jt)}}function lc(T,N,X,q,F,ut){T.onBeforeRender(y,N,X,q,F,ut),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(y,N,X,q,T,ut),F.transparent===!0&&F.side===rn&&F.forceSinglePass===!1?(F.side=Ze,F.needsUpdate=!0,y.renderBufferDirect(X,N,q,F,T,ut),F.side=ni,F.needsUpdate=!0,y.renderBufferDirect(X,N,q,F,T,ut),F.side=rn):y.renderBufferDirect(X,N,q,F,T,ut),T.onAfterRender(y,N,X,q,F,ut)}function Ks(T,N,X){N.isScene!==!0&&(N=Rt);const q=Ot.get(T),F=m.state.lights,ut=m.state.shadowsArray,yt=F.state.version,Pt=zt.getParameters(T,F.state,ut,N,X),Dt=zt.getProgramCacheKey(Pt);let $t=q.programs;q.environment=T.isMeshStandardMaterial?N.environment:null,q.fog=N.fog,q.envMap=(T.isMeshStandardMaterial?G:S).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,$t===void 0&&(T.addEventListener("dispose",Kt),$t=new Map,q.programs=$t);let Jt=$t.get(Dt);if(Jt!==void 0){if(q.currentProgram===Jt&&q.lightsStateVersion===yt)return dc(T,Pt),Jt}else Pt.uniforms=zt.getUniforms(T),T.onBeforeCompile(Pt,y),Jt=zt.acquireProgram(Pt,Dt),$t.set(Dt,Jt),q.uniforms=Pt.uniforms;const Lt=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Lt.clippingPlanes=dt.uniform),dc(T,Pt),q.needsLights=rd(T),q.lightsStateVersion=yt,q.needsLights&&(Lt.ambientLightColor.value=F.state.ambient,Lt.lightProbe.value=F.state.probe,Lt.directionalLights.value=F.state.directional,Lt.directionalLightShadows.value=F.state.directionalShadow,Lt.spotLights.value=F.state.spot,Lt.spotLightShadows.value=F.state.spotShadow,Lt.rectAreaLights.value=F.state.rectArea,Lt.ltc_1.value=F.state.rectAreaLTC1,Lt.ltc_2.value=F.state.rectAreaLTC2,Lt.pointLights.value=F.state.point,Lt.pointLightShadows.value=F.state.pointShadow,Lt.hemisphereLights.value=F.state.hemi,Lt.directionalShadowMap.value=F.state.directionalShadowMap,Lt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Lt.spotShadowMap.value=F.state.spotShadowMap,Lt.spotLightMatrix.value=F.state.spotLightMatrix,Lt.spotLightMap.value=F.state.spotLightMap,Lt.pointShadowMap.value=F.state.pointShadowMap,Lt.pointShadowMatrix.value=F.state.pointShadowMatrix),q.currentProgram=Jt,q.uniformsList=null,Jt}function hc(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Oo.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function dc(T,N){const X=Ot.get(T);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function sd(T,N,X,q,F){N.isScene!==!0&&(N=Rt),P.resetTextureUnits();const ut=N.fog,yt=q.isMeshStandardMaterial?N.environment:null,Pt=E===null?y.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:gs,Dt=(q.isMeshStandardMaterial?G:S).get(q.envMap||yt),$t=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Jt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Lt=!!X.morphAttributes.position,he=!!X.morphAttributes.normal,we=!!X.morphAttributes.color;let Te=xi;q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Te=y.toneMapping);const cn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,fe=cn!==void 0?cn.length:0,Ut=Ot.get(q),Bn=m.state.lights;if(lt===!0&&(Q===!0||T!==M)){const vn=T===M&&q.id===v;dt.setState(q,T,vn)}let pe=!1;q.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Bn.state.version||Ut.outputColorSpace!==Pt||F.isBatchedMesh&&Ut.batching===!1||!F.isBatchedMesh&&Ut.batching===!0||F.isBatchedMesh&&Ut.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ut.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ut.instancing===!1||!F.isInstancedMesh&&Ut.instancing===!0||F.isSkinnedMesh&&Ut.skinning===!1||!F.isSkinnedMesh&&Ut.skinning===!0||F.isInstancedMesh&&Ut.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ut.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ut.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ut.instancingMorph===!1&&F.morphTexture!==null||Ut.envMap!==Dt||q.fog===!0&&Ut.fog!==ut||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==dt.numPlanes||Ut.numIntersection!==dt.numIntersection)||Ut.vertexAlphas!==$t||Ut.vertexTangents!==Jt||Ut.morphTargets!==Lt||Ut.morphNormals!==he||Ut.morphColors!==we||Ut.toneMapping!==Te||Ut.morphTargetsCount!==fe)&&(pe=!0):(pe=!0,Ut.__version=q.version);let Sn=Ut.currentProgram;pe===!0&&(Sn=Ks(q,N,F));let Oi=!1,gn=!1,Ms=!1;const Ee=Sn.getUniforms(),Ln=Ut.uniforms;if(Ft.useProgram(Sn.program)&&(Oi=!0,gn=!0,Ms=!0),q.id!==v&&(v=q.id,gn=!0),Oi||M!==T){Ft.buffers.depth.getReversed()?(K.copy(T.projectionMatrix),Zd(K),Kd(K),Ee.setValue(k,"projectionMatrix",K)):Ee.setValue(k,"projectionMatrix",T.projectionMatrix),Ee.setValue(k,"viewMatrix",T.matrixWorldInverse);const si=Ee.map.cameraPosition;si!==void 0&&si.setValue(k,ht.setFromMatrixPosition(T.matrixWorld)),ie.logarithmicDepthBuffer&&Ee.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ee.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,gn=!0,Ms=!0)}if(F.isSkinnedMesh){Ee.setOptional(k,F,"bindMatrix"),Ee.setOptional(k,F,"bindMatrixInverse");const vn=F.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),Ee.setValue(k,"boneTexture",vn.boneTexture,P))}F.isBatchedMesh&&(Ee.setOptional(k,F,"batchingTexture"),Ee.setValue(k,"batchingTexture",F._matricesTexture,P),Ee.setOptional(k,F,"batchingIdTexture"),Ee.setValue(k,"batchingIdTexture",F._indirectTexture,P),Ee.setOptional(k,F,"batchingColorTexture"),F._colorsTexture!==null&&Ee.setValue(k,"batchingColorTexture",F._colorsTexture,P));const bs=X.morphAttributes;if((bs.position!==void 0||bs.normal!==void 0||bs.color!==void 0)&&Xt.update(F,X,Sn),(gn||Ut.receiveShadow!==F.receiveShadow)&&(Ut.receiveShadow=F.receiveShadow,Ee.setValue(k,"receiveShadow",F.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Ln.envMap.value=Dt,Ln.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&N.environment!==null&&(Ln.envMapIntensity.value=N.environmentIntensity),gn&&(Ee.setValue(k,"toneMappingExposure",y.toneMappingExposure),Ut.needsLights&&od(Ln,Ms),ut&&q.fog===!0&&_t.refreshFogUniforms(Ln,ut),_t.refreshMaterialUniforms(Ln,q,W,Z,m.state.transmissionRenderTarget[T.id]),Oo.upload(k,hc(Ut),Ln,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Oo.upload(k,hc(Ut),Ln,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ee.setValue(k,"center",F.center),Ee.setValue(k,"modelViewMatrix",F.modelViewMatrix),Ee.setValue(k,"normalMatrix",F.normalMatrix),Ee.setValue(k,"modelMatrix",F.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const vn=q.uniformsGroups;for(let si=0,oi=vn.length;si<oi;si++){const uc=vn[si];U.update(uc,Sn),U.bind(uc,Sn)}}return Sn}function od(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function rd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(T,N,X){Ot.get(T.texture).__webglTexture=N,Ot.get(T.depthTexture).__webglTexture=X;const q=Ot.get(T);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const X=Ot.get(T);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,X=0){E=T,w=N,R=X;let q=!0,F=null,ut=!1,yt=!1;if(T){const Dt=Ot.get(T);if(Dt.__useDefaultFramebuffer!==void 0)Ft.bindFramebuffer(k.FRAMEBUFFER,null),q=!1;else if(Dt.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(Dt.__hasExternalTextures)P.rebindTextures(T,Ot.get(T.texture).__webglTexture,Ot.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Lt=T.depthTexture;if(Dt.__boundDepthTexture!==Lt){if(Lt!==null&&Ot.has(Lt)&&(T.width!==Lt.image.width||T.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const $t=T.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(yt=!0);const Jt=Ot.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Jt[N])?F=Jt[N][X]:F=Jt[N],ut=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?F=Ot.get(T).__webglMultisampledFramebuffer:Array.isArray(Jt)?F=Jt[X]:F=Jt,C.copy(T.viewport),L.copy(T.scissor),I=T.scissorTest}else C.copy(At).multiplyScalar(W).floor(),L.copy(Bt).multiplyScalar(W).floor(),I=Zt;if(Ft.bindFramebuffer(k.FRAMEBUFFER,F)&&q&&Ft.drawBuffers(T,F),Ft.viewport(C),Ft.scissor(L),Ft.setScissorTest(I),ut){const Dt=Ot.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+N,Dt.__webglTexture,X)}else if(yt){const Dt=Ot.get(T.texture),$t=N||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Dt.__webglTexture,X||0,$t)}v=-1},this.readRenderTargetPixels=function(T,N,X,q,F,ut,yt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Ot.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&yt!==void 0&&(Pt=Pt[yt]),Pt){Ft.bindFramebuffer(k.FRAMEBUFFER,Pt);try{const Dt=T.texture,$t=Dt.format,Jt=Dt.type;if(!ie.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ie.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-q&&X>=0&&X<=T.height-F&&k.readPixels(N,X,q,F,ee.convert($t),ee.convert(Jt),ut)}finally{const Dt=E!==null?Ot.get(E).__webglFramebuffer:null;Ft.bindFramebuffer(k.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(T,N,X,q,F,ut,yt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Ot.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&yt!==void 0&&(Pt=Pt[yt]),Pt){const Dt=T.texture,$t=Dt.format,Jt=Dt.type;if(!ie.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-q&&X>=0&&X<=T.height-F){Ft.bindFramebuffer(k.FRAMEBUFFER,Pt);const Lt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Lt),k.bufferData(k.PIXEL_PACK_BUFFER,ut.byteLength,k.STREAM_READ),k.readPixels(N,X,q,F,ee.convert($t),ee.convert(Jt),0);const he=E!==null?Ot.get(E).__webglFramebuffer:null;Ft.bindFramebuffer(k.FRAMEBUFFER,he);const we=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await jd(k,we,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Lt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ut),k.deleteBuffer(Lt),k.deleteSync(we),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,X=0){T.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const q=Math.pow(2,-X),F=Math.floor(T.image.width*q),ut=Math.floor(T.image.height*q),yt=N!==null?N.x:0,Pt=N!==null?N.y:0;P.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,X,0,0,yt,Pt,F,ut),Ft.unbindTexture()},this.copyTextureToTexture=function(T,N,X=null,q=null,F=0){T.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,T=arguments[1],N=arguments[2],F=arguments[3]||0,X=null);let ut,yt,Pt,Dt,$t,Jt,Lt,he,we;const Te=T.isCompressedTexture?T.mipmaps[F]:T.image;X!==null?(ut=X.max.x-X.min.x,yt=X.max.y-X.min.y,Pt=X.isBox3?X.max.z-X.min.z:1,Dt=X.min.x,$t=X.min.y,Jt=X.isBox3?X.min.z:0):(ut=Te.width,yt=Te.height,Pt=Te.depth||1,Dt=0,$t=0,Jt=0),q!==null?(Lt=q.x,he=q.y,we=q.z):(Lt=0,he=0,we=0);const cn=ee.convert(N.format),fe=ee.convert(N.type);let Ut;N.isData3DTexture?(P.setTexture3D(N,0),Ut=k.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(P.setTexture2DArray(N,0),Ut=k.TEXTURE_2D_ARRAY):(P.setTexture2D(N,0),Ut=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,N.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,N.unpackAlignment);const Bn=k.getParameter(k.UNPACK_ROW_LENGTH),pe=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Sn=k.getParameter(k.UNPACK_SKIP_PIXELS),Oi=k.getParameter(k.UNPACK_SKIP_ROWS),gn=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,Te.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Te.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Dt),k.pixelStorei(k.UNPACK_SKIP_ROWS,$t),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Jt);const Ms=T.isDataArrayTexture||T.isData3DTexture,Ee=N.isDataArrayTexture||N.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Ln=Ot.get(T),bs=Ot.get(N),vn=Ot.get(Ln.__renderTarget),si=Ot.get(bs.__renderTarget);Ft.bindFramebuffer(k.READ_FRAMEBUFFER,vn.__webglFramebuffer),Ft.bindFramebuffer(k.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let oi=0;oi<Pt;oi++)Ms&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ot.get(T).__webglTexture,F,Jt+oi),T.isDepthTexture?(Ee&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ot.get(N).__webglTexture,F,we+oi),k.blitFramebuffer(Dt,$t,ut,yt,Lt,he,ut,yt,k.DEPTH_BUFFER_BIT,k.NEAREST)):Ee?k.copyTexSubImage3D(Ut,F,Lt,he,we+oi,Dt,$t,ut,yt):k.copyTexSubImage2D(Ut,F,Lt,he,we+oi,Dt,$t,ut,yt);Ft.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ft.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Ee?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(Ut,F,Lt,he,we,ut,yt,Pt,cn,fe,Te.data):N.isCompressedArrayTexture?k.compressedTexSubImage3D(Ut,F,Lt,he,we,ut,yt,Pt,cn,Te.data):k.texSubImage3D(Ut,F,Lt,he,we,ut,yt,Pt,cn,fe,Te):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,F,Lt,he,ut,yt,cn,fe,Te.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,F,Lt,he,Te.width,Te.height,cn,Te.data):k.texSubImage2D(k.TEXTURE_2D,F,Lt,he,ut,yt,cn,fe,Te);k.pixelStorei(k.UNPACK_ROW_LENGTH,Bn),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,pe),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Sn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Oi),k.pixelStorei(k.UNPACK_SKIP_IMAGES,gn),F===0&&N.generateMipmaps&&k.generateMipmap(Ut),Ft.unbindTexture()},this.copyTextureToTexture3D=function(T,N,X=null,q=null,F=0){return T.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,T=arguments[2],N=arguments[3],F=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,X,q,F)},this.initRenderTarget=function(T){Ot.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),Ft.unbindTexture()},this.resetState=function(){w=0,R=0,E=null,Ft.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}}class $a{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=n}clone(){return new $a(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class cg extends ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class lg extends nn{constructor(t=null,e=1,n=1,i,o,r,a,c,l=Ke,h=Ke,d,u){super(null,r,a,c,l,h,i,o,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hg extends vs{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const dl=new Wt,Ia=new fh,yo=new Qo,Mo=new D;class Rh extends ze{constructor(t=new De,e=new hg){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,o=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(i),yo.radius+=o,t.ray.intersectsSphere(yo)===!1)return;dl.copy(i).invert(),Ia.copy(t.ray).applyMatrix4(dl);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let p=u,x=f;p<x;p++){const g=l.getX(p);Mo.fromBufferAttribute(d,g),ul(Mo,g,c,i,t,e,this)}}else{const u=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let p=u,x=f;p<x;p++)Mo.fromBufferAttribute(d,p),ul(Mo,p,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function ul(s,t,e,n,i,o,r){const a=Ia.distanceSqToPoint(s);if(a<e){const c=new D;Ia.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class dg extends nn{constructor(t,e,n,i,o,r,a,c,l){super(t,e,n,i,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(o-1);const h=n[i],u=n[i+1]-h,f=(r-h)/u;return(i+f)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),c=e||(r.isVector2?new wt:new D);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,i=[],o=[],r=[],a=new D,c=new Wt;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new D)}o[0]=new D,r[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos($e(i[f-1].dot(i[f]),-1,1));o[f].applyMatrix4(c.makeRotationAxis(a,p))}r[f].crossVectors(i[f],o[f])}if(e===!0){let f=Math.acos($e(o[0].dot(o[t]),-1,1));f/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let p=1;p<=t;p++)o[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],o[p])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ja extends Fn{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new wt){const n=e,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ug extends ja{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Za(){let s=0,t=0,e=0,n=0;function i(o,r,a,c){s=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){i(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,d){let u=(r-o)/l-(a-o)/(l+h)+(a-r)/h,f=(a-r)/h-(c-r)/(h+d)+(c-a)/d;u*=h,f*=h,i(r,a,u,f)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const bo=new D,Ir=new Za,zr=new Za,Ur=new Za;class fg extends Fn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%o]:(bo.subVectors(i[0],i[1]).add(i[0]),l=bo);const d=i[a%o],u=i[(a+1)%o];if(this.closed||a+2<o?h=i[(a+2)%o]:(bo.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=bo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Ir.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,x,g),zr.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,x,g),Ur.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(Ir.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),zr.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Ur.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Ir.calc(c),zr.calc(c),Ur.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function fl(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*s+e}function pg(s,t){const e=1-s;return e*e*t}function mg(s,t){return 2*(1-s)*s*t}function gg(s,t){return s*s*t}function ks(s,t,e,n){return pg(s,t)+mg(s,e)+gg(s,n)}function xg(s,t){const e=1-s;return e*e*e*t}function _g(s,t){const e=1-s;return 3*e*e*s*t}function vg(s,t){return 3*(1-s)*s*s*t}function yg(s,t){return s*s*s*t}function Ns(s,t,e,n,i){return xg(s,t)+_g(s,e)+vg(s,n)+yg(s,i)}class Ch extends Fn{constructor(t=new wt,e=new wt,n=new wt,i=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new wt){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Ns(t,i.x,o.x,r.x,a.x),Ns(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mg extends Fn{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Ns(t,i.x,o.x,r.x,a.x),Ns(t,i.y,o.y,r.y,a.y),Ns(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ph extends Fn{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class bg extends Fn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dh extends Fn{constructor(t=new wt,e=new wt,n=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new wt){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(ks(t,i.x,o.x,r.x),ks(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wg extends Fn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(ks(t,i.x,o.x,r.x),ks(t,i.y,o.y,r.y),ks(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lh extends Fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,c=i[r===0?r:r-1],l=i[r],h=i[r>i.length-2?i.length-1:r+1],d=i[r>i.length-3?i.length-1:r+2];return n.set(fl(a,c.x,l.x,h.x,d.x),fl(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new wt().fromArray(i))}return this}}var pl=Object.freeze({__proto__:null,ArcCurve:ug,CatmullRomCurve3:fg,CubicBezierCurve:Ch,CubicBezierCurve3:Mg,EllipseCurve:ja,LineCurve:Ph,LineCurve3:bg,QuadraticBezierCurve:Dh,QuadraticBezierCurve3:wg,SplineCurve:Lh});class Sg extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new pl[i.type]().fromJSON(i))}return this}}class Tg extends Sg{constructor(t){super(),this.type="Path",this.currentPoint=new wt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ph(this.currentPoint.clone(),new wt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new Dh(this.currentPoint.clone(),new wt(t,e),new wt(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new Ch(this.currentPoint.clone(),new wt(t,e),new wt(n,i),new wt(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Lh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,o,r,a,c),this}absellipse(t,e,n,i,o,r,a,c){const l=new ja(t,e,n,i,o,r,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ka extends De{constructor(t=[new wt(0,-.5),new wt(.5,0),new wt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=$e(i,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],h=1/e,d=new D,u=new wt,f=new D,p=new D,x=new D;let g=0,m=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,f.x=m*1,f.y=-g,f.z=m*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:g=t[_+1].x-t[_].x,m=t[_+1].y-t[_].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(p)}for(let _=0;_<=e;_++){const b=n+_*h*i,y=Math.sin(b),A=Math.cos(b);for(let w=0;w<=t.length-1;w++){d.x=t[w].x*y,d.y=t[w].y,d.z=t[w].x*A,r.push(d.x,d.y,d.z),u.x=_/e,u.y=w/(t.length-1),a.push(u.x,u.y);const R=c[3*w+0]*y,E=c[3*w+1],v=c[3*w+0]*A;l.push(R,E,v)}}for(let _=0;_<e;_++)for(let b=0;b<t.length-1;b++){const y=b+_*t.length,A=y,w=y+t.length,R=y+t.length+1,E=y+1;o.push(A,w,E),o.push(R,E,w)}this.setIndex(o),this.setAttribute("position",new re(r,3)),this.setAttribute("uv",new re(a,2)),this.setAttribute("normal",new re(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.points,t.segments,t.phiStart,t.phiLength)}}class Ja extends Ka{constructor(t=1,e=1,n=4,i=8){const o=new Tg;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Ja(t.radius,t.length,t.capSegments,t.radialSegments)}}class ms extends De{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new D,h=new wt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[u]/t+1)/2,h.y=(r[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)o.push(d,d+1,0);this.setIndex(o),this.setAttribute("position",new re(r,3)),this.setAttribute("normal",new re(a,3)),this.setAttribute("uv",new re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ms(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ne extends De{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),o=Math.floor(o);const h=[],d=[],u=[],f=[];let p=0;const x=[],g=n/2;let m=0;_(),r===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new re(d,3)),this.setAttribute("normal",new re(u,3)),this.setAttribute("uv",new re(f,2));function _(){const y=new D,A=new D;let w=0;const R=(e-t)/n;for(let E=0;E<=o;E++){const v=[],M=E/o,C=M*(e-t)+t;for(let L=0;L<=i;L++){const I=L/i,H=I*c+a,V=Math.sin(H),B=Math.cos(H);A.x=C*V,A.y=-M*n+g,A.z=C*B,d.push(A.x,A.y,A.z),y.set(V,R,B).normalize(),u.push(y.x,y.y,y.z),f.push(I,1-M),v.push(p++)}x.push(v)}for(let E=0;E<i;E++)for(let v=0;v<o;v++){const M=x[v][E],C=x[v+1][E],L=x[v+1][E+1],I=x[v][E+1];(t>0||v!==0)&&(h.push(M,C,I),w+=3),(e>0||v!==o-1)&&(h.push(C,L,I),w+=3)}l.addGroup(m,w,0),m+=w}function b(y){const A=p,w=new wt,R=new D;let E=0;const v=y===!0?t:e,M=y===!0?1:-1;for(let L=1;L<=i;L++)d.push(0,g*M,0),u.push(0,M,0),f.push(.5,.5),p++;const C=p;for(let L=0;L<=i;L++){const H=L/i*c+a,V=Math.cos(H),B=Math.sin(H);R.x=v*B,R.y=g*M,R.z=v*V,d.push(R.x,R.y,R.z),u.push(0,M,0),w.x=V*.5+.5,w.y=B*.5*M+.5,f.push(w.x,w.y),p++}for(let L=0;L<i;L++){const I=A+L,H=C+L;y===!0?h.push(H,H+1,I):h.push(H+1,H,I),E+=3}l.addGroup(m,E,y===!0?1:2),m+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Di extends Ne{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Di(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qa extends De{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const o=[],r=[];a(i),l(n),h(),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(o.slice(),3)),this.setAttribute("uv",new re(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const b=new D,y=new D,A=new D;for(let w=0;w<e.length;w+=3)f(e[w+0],b),f(e[w+1],y),f(e[w+2],A),c(b,y,A,_)}function c(_,b,y,A){const w=A+1,R=[];for(let E=0;E<=w;E++){R[E]=[];const v=_.clone().lerp(y,E/w),M=b.clone().lerp(y,E/w),C=w-E;for(let L=0;L<=C;L++)L===0&&E===w?R[E][L]=v:R[E][L]=v.clone().lerp(M,L/C)}for(let E=0;E<w;E++)for(let v=0;v<2*(w-E)-1;v++){const M=Math.floor(v/2);v%2===0?(u(R[E][M+1]),u(R[E+1][M]),u(R[E][M])):(u(R[E][M+1]),u(R[E+1][M+1]),u(R[E+1][M]))}}function l(_){const b=new D;for(let y=0;y<o.length;y+=3)b.x=o[y+0],b.y=o[y+1],b.z=o[y+2],b.normalize().multiplyScalar(_),o[y+0]=b.x,o[y+1]=b.y,o[y+2]=b.z}function h(){const _=new D;for(let b=0;b<o.length;b+=3){_.x=o[b+0],_.y=o[b+1],_.z=o[b+2];const y=g(_)/2/Math.PI+.5,A=m(_)/Math.PI+.5;r.push(y,1-A)}p(),d()}function d(){for(let _=0;_<r.length;_+=6){const b=r[_+0],y=r[_+2],A=r[_+4],w=Math.max(b,y,A),R=Math.min(b,y,A);w>.9&&R<.1&&(b<.2&&(r[_+0]+=1),y<.2&&(r[_+2]+=1),A<.2&&(r[_+4]+=1))}}function u(_){o.push(_.x,_.y,_.z)}function f(_,b){const y=_*3;b.x=t[y+0],b.y=t[y+1],b.z=t[y+2]}function p(){const _=new D,b=new D,y=new D,A=new D,w=new wt,R=new wt,E=new wt;for(let v=0,M=0;v<o.length;v+=9,M+=6){_.set(o[v+0],o[v+1],o[v+2]),b.set(o[v+3],o[v+4],o[v+5]),y.set(o[v+6],o[v+7],o[v+8]),w.set(r[M+0],r[M+1]),R.set(r[M+2],r[M+3]),E.set(r[M+4],r[M+5]),A.copy(_).add(b).add(y).divideScalar(3);const C=g(A);x(w,M+0,_,C),x(R,M+2,b,C),x(E,M+4,y,C)}}function x(_,b,y,A){A<0&&_.x===1&&(r[b]=_.x-1),y.x===0&&y.z===0&&(r[b]=A/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qa(t.vertices,t.indices,t.radius,t.details)}}class tc extends Qa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new tc(t.radius,t.detail)}}class Pe extends De{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],d=new D,u=new D,f=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){const _=[],b=m/n;let y=0;m===0&&r===0?y=.5/e:m===n&&c===Math.PI&&(y=-.5/e);for(let A=0;A<=e;A++){const w=A/e;d.x=-t*Math.cos(i+w*o)*Math.sin(r+b*a),d.y=t*Math.cos(r+b*a),d.z=t*Math.sin(i+w*o)*Math.sin(r+b*a),p.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(w+y,1-b),_.push(l++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){const b=h[m][_+1],y=h[m][_],A=h[m+1][_],w=h[m+1][_+1];(m!==0||r>0)&&f.push(b,y,w),(m!==n-1||c<Math.PI)&&f.push(y,A,w)}this.setIndex(f),this.setAttribute("position",new re(p,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Bs extends De{constructor(t=1,e=.4,n=12,i=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:o},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],c=[],l=[],h=new D,d=new D,u=new D;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const x=p/i*o,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(x),d.y=(t+e*Math.cos(g))*Math.sin(x),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const x=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,_=(i+1)*f+p;r.push(x,g,_),r.push(g,m,_)}this.setIndex(r),this.setAttribute("position",new re(a,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Kn extends vs{static get type(){return"MeshToonMaterial"}constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Nt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ch,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Xs extends ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ih extends Xs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const kr=new Wt,ml=new D,gl=new D;class ec{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.map=null,this.mapPass=null,this.matrix=new Wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qa,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ml.setFromMatrixPosition(t.matrixWorld),e.position.copy(ml),gl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(gl),e.updateMatrixWorld(),kr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Eg extends ec{constructor(){super(new un(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Vo*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,o=t.distance||e.far;(n!==e.fov||i!==e.aspect||o!==e.far)&&(e.fov=n,e.aspect=i,e.far=o,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Ag extends Xs{constructor(t,e,n=0,i=Math.PI/3,o=0,r=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.target=new ze,this.distance=n,this.angle=i,this.penumbra=o,this.decay=r,this.map=null,this.shadow=new Eg}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const xl=new Wt,Rs=new D,Nr=new D;class Rg extends ec{constructor(){super(new un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new wt(4,2),this._viewportCount=6,this._viewports=[new _e(2,1,1,1),new _e(0,1,1,1),new _e(3,1,1,1),new _e(1,1,1,1),new _e(3,0,1,1),new _e(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,o=t.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Rs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Rs),Nr.copy(n.position),Nr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Nr),n.updateMatrixWorld(),i.makeTranslation(-Rs.x,-Rs.y,-Rs.z),xl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl)}}class Cg extends Xs{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Rg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Pg extends ec{constructor(){super(new bh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dg extends Xs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.target=new ze,this.shadow=new Pg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Lg extends Xs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ig{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_l(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=_l();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function _l(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oa);class zg{constructor(t){this.dom=t,this.keys=new Set,this.pressed=new Set,this.dragging=!1,this.dragDX=0,this.dragDY=0,this.wheel=0,this.enabled=!0,this.pointerLocked=!1,this._last={x:0,y:0},this._blockers=new Set,this.uiKeys=new Set(["escape","j","m","u","p","1","2","3","4"]),window.addEventListener("keydown",e=>{const n=e.key.toLowerCase();this._blockers.size&&!this.uiKeys.has(n)||(this.keys.has(n)||this.pressed.add(n),this.keys.add(n),[" ","tab","arrowup","arrowdown","arrowleft","arrowright"].includes(n)&&e.preventDefault())}),window.addEventListener("keyup",e=>{this.keys.delete(e.key.toLowerCase())}),window.addEventListener("blur",()=>this.keys.clear()),t.addEventListener("mousedown",e=>{e.button!==0&&e.button!==2||(this.dragging=!0,this._last.x=e.clientX,this._last.y=e.clientY)}),window.addEventListener("mouseup",()=>{this.dragging=!1}),window.addEventListener("mousemove",e=>{if(this.pointerLocked){this.dragDX+=e.movementX,this.dragDY+=e.movementY;return}this.dragging&&(this.dragDX+=e.clientX-this._last.x,this.dragDY+=e.clientY-this._last.y,this._last.x=e.clientX,this._last.y=e.clientY)}),t.addEventListener("wheel",e=>{this.wheel+=e.deltaY,e.preventDefault()},{passive:!1}),t.addEventListener("contextmenu",e=>e.preventDefault())}block(t){t?this._blockers.add("ui"):this._blockers.delete("ui")}down(...t){return t.some(e=>this.keys.has(e))}hit(...t){return t.some(e=>this.pressed.has(e))}axis(){let t=0,e=0;this.down("a","arrowleft")&&(t-=1),this.down("d","arrowright")&&(t+=1),this.down("w","arrowup")&&(e+=1),this.down("s","arrowdown")&&(e-=1);const n=Math.hypot(t,e);return n>0?{x:t/n,y:e/n,len:1}:{x:0,y:0,len:0}}endFrame(){this.pressed.clear(),this.dragDX=0,this.dragDY=0,this.wheel=0}}const ot={skyTop:7320552,skyMid:11129842,skyLow:16508646,nightTop:725028,nightMid:1778756,nightLow:3093847,grass:9420922,grassDark:7645282,grassLight:10932621,dirt:12757127,sand:14733996,rock:10130308,rockDark:7827298,asphalt:7237496,asphaltLight:8619149,concrete:12170408,gravel:10721931,water:7645385,wallWood:13214324,wallWoodDark:10320466,wallTileBlue:10468548,roofTile:8225940,doorWood:9133628,window:10406108,windowLit:16770728,sakura:16103112,sakuraDeep:15240104,sakuraPale:16639212,leaf:7645279,leafDark:5077573,leafLight:10275196,pine:4156236,bamboo:10467434,red:14242639,redDeep:11549754,blue:4882357,cream:16446436,silver:12830669,floorWood:13805684,floorTile:14999764,tatami:13615242,lampWarm:16766874,trainBody:15330543,trainStripe:4161448,railSteel:10133672},It=s=>"#"+s.toString(16).padStart(6,"0");function Se(s,t,e){const n=s>>16&255,i=s>>8&255,o=s&255,r=t>>16&255,a=t>>8&255,c=t&255;return(n+(r-n)*e|0)<<16|(i+(a-i)*e|0)<<8|(o+(c-o)*e|0)}function ve(s,t){const e=t>0?t:-t;return t>0?Se(s,16777215,e):Se(s,0,e*.72)}let Fr=null;function mi(){if(Fr)return Fr;const s=[104,158,212,255],t=new Uint8Array(s.length*4);s.forEach((n,i)=>{t[i*4]=n,t[i*4+1]=n,t[i*4+2]=n,t[i*4+3]=255});const e=new lg(t,s.length,1,Mn);return e.minFilter=Ke,e.magFilter=Ke,e.generateMipmaps=!1,e.needsUpdate=!0,Fr=e,e}const rs=new Map,zh=[];let Ug=0;const vl=new WeakMap;function kg(s){let t=vl.get(s);return t===void 0&&(t=++Ug,vl.set(s,t)),t}function Uh(s,t,e){let n=s+t;for(const i in e){const o=e[i];n+="|"+i+":"+(o&&(o.isTexture||o.isMaterial)?"o"+kg(o):JSON.stringify(o))}return n}function et(s,t={}){const e=Uh("t",s,t);if(rs.has(e))return rs.get(e);const{map:n=null,transparent:i=!1,opacity:o=1,side:r=ni,emissive:a=0,emissiveIntensity:c=1,vertexColors:l=!1,alphaTest:h=0,depthWrite:d=!0}=t,u=new Kn({color:s,map:n,transparent:i,opacity:o,side:r,vertexColors:l,alphaTest:h,depthWrite:d,gradientMap:mi(),emissive:a,emissiveIntensity:c});return rs.set(e,u),u}function Li(s,t={}){const e=Uh("b",s,t);if(rs.has(e))return rs.get(e);const n=new ki({color:s,...t});return rs.set(e,n),n}function Cn(s,t={}){const e={material:s,dayEmissive:t.day??new Nt(0),nightEmissive:t.night??new Nt(ot.lampWarm),dayIntensity:t.dayIntensity??1,nightIntensity:t.nightIntensity??1.2,threshold:t.threshold??.28,power:t.power??1,flicker:t.flicker??0};return zh.push(e),e}function Ng(s,t=0){for(const e of zh){const n=Math.max(0,e.threshold??0),i=n<=0?1:Math.max(0,(s-n)/(1-n)),o=i*i*(3-2*i),r=e.dayEmissive.clone().lerp(e.nightEmissive,o);let a=e.dayIntensity+(e.nightIntensity-e.dayIntensity)*o;e.flicker>0&&(a*=1-e.flicker*Math.random()*.5),t>.01&&(a*=1+t*.45,a*=1-t*.07*Math.random()),e.material.emissive.copy(r),e.material.emissiveIntensity=a}}const kh=3879232,Or=new Map;function Nh(s,t){const e=s+"_"+t;if(Or.has(e))return Or.get(e);const n=new ki({color:t,side:Ze,fog:!0,transparent:!1,depthWrite:!0});return n.userData.uThickness={value:s},n.onBeforeCompile=i=>{i.uniforms.uThickness=n.userData.uThickness,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uThickness;`).replace("#include <project_vertex>",`
        vec4 mvPosition = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        mvPosition = modelViewMatrix * mvPosition;
        vec3 outlineN = normalize( normalMatrix * normal );
        mvPosition.xyz += outlineN * min( max( -mvPosition.z, 1.0 ) * uThickness, 0.085 );
        gl_Position = projectionMatrix * mvPosition;
        `)},n.customProgramCacheKey=()=>"outline"+e,Or.set(e,n),n}function Fh(s){const t=s.attributes.position,e=s.attributes.normal;if(!t||!e)return s;const n=t.count,i=new Map,o=r=>`${t.getX(r).toFixed(3)},${t.getY(r).toFixed(3)},${t.getZ(r).toFixed(3)}`;for(let r=0;r<n;r++){const a=o(r);let c=i.get(a);c||(c=[0,0,0,[]],i.set(a,c)),c[0]+=e.getX(r),c[1]+=e.getY(r),c[2]+=e.getZ(r),c[3].push(r)}for(const r of i.values()){let a=r[0],c=r[1],l=r[2];const h=Math.hypot(a,c,l)||1;a/=h,c/=h,l/=h;for(const d of r[3])e.setXYZ(d,a,c,l)}return e.needsUpdate=!0,s}function se(s,t=.014,e=kh){if(!s.geometry)return null;const n=Fh(s.geometry.clone()),i=new O(n,Nh(t,e));return i.name="outline",i.renderOrder=(s.renderOrder||0)-1,i.castShadow=!1,i.receiveShadow=!1,i.matrixAutoUpdate=!1,s.add(i),i}function Fg(s,t=kh){return Nh(s,t)}const Br=new Map;function wo(s,t,e,n=1){const i=`box${s},${t},${e},${n}`;return Br.has(i)||Br.set(i,new Ht(s,t,e,n,n,n)),Br.get(i)}const xt=Math.PI*2,le=(s,t,e)=>s<t?t:s>e?e:s,Ge=s=>s<0?0:s>1?1:s,ft=(s,t,e)=>s+(t-s)*e,Og=(s,t,e)=>t-s===0?0:(e-s)/(t-s),an=(s,t,e)=>{const n=Ge(Og(s,t,e));return n*n*(3-2*n)},me=(s,t,e,n)=>ft(s,t,1-Math.exp(-e*n)),Bg=s=>(s=(s+Math.PI)%xt,s<0&&(s+=xt),s-Math.PI),Xo=(s,t,e,n)=>s+Bg(t-s)*(1-Math.exp(-e*n)),Hg=(s,t,e,n)=>{const i=s-e,o=t-n;return i*i+o*o},bn=(s,t,e,n)=>Math.sqrt(Hg(s,t,e,n));function ue(s=1){let t=s>>>0||1;const e=()=>{t+=1831565813;let n=Math.imul(t^t>>>15,1|t);return n^=n+Math.imul(n^n>>>7,61|n),((n^n>>>14)>>>0)/4294967296};return e.range=(n,i)=>n+e()*(i-n),e.int=(n,i)=>Math.floor(n+e()*(i-n+1)),e.pick=n=>n[Math.floor(e()*n.length)%n.length],e.chance=n=>e()<n,e.sign=()=>e()<.5?-1:1,e}ue(20240401);function nc(s,t,e,n,i,o){const r=i-e,a=o-n,c=r*r+a*a;let l=c>1e-9?((s-e)*r+(t-n)*a)/c:0;l=Ge(l);const h=e+r*l,d=n+a*l;return{t:l,x:h,z:d,d:bn(s,t,h,d)}}function So(s){const t=Math.floor(s)%24,e=Math.floor((s-Math.floor(s))*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}const as=new Map;function Ae(s,t={}){const e=s+JSON.stringify(t);return as.has(e)||as.set(e,et(s,t)),as.get(e)}function Gg(s){return as.has("skin"+s)||as.set("skin"+s,et(s)),as.get("skin"+s)}const Vg={player:{h:1.7,skin:16176573,hair:4863784,hairStyle:"short",top:7315140,topAlt:15921382,bottom:5002344,bottomStyle:"pants",shoes:4012610,accessory:"none",scarf:null}};function Oh(s={}){const t={...Vg.player,...s},e=t.h,n={headR:e*.107,neckY:e*.815,shoulderY:e*.775,chestY:e*.66,waistY:e*.575,hipY:e*.49,kneeY:e*.275,ankleY:e*.075},i=new Ct;i.name="char";const o=Gg(t.skin),r=Ae(t.hair),a=Ae(t.top),c=Ae(t.topAlt??Se(t.top,16777215,.7)),l=Ae(t.bottom),h=Ae(t.shoes),d=Ae(3352108),u=Ae(15901608,{transparent:!0,opacity:.55,depthWrite:!1}),f=Ae(11033176),p=new Ct;p.position.y=n.hipY,i.add(p);const x=new Ct;p.add(x);{const v=new O(new Ne(e*.098,e*.076,n.shoulderY-n.hipY+e*.05,12),a);v.position.y=(n.shoulderY-n.hipY)/2+e*.02,v.scale.z=.78,x.add(v),se(v,.013);const M=new O(new Ht(e*.115,e*.02,e*.075),c);M.position.set(0,n.shoulderY-n.hipY+e*.005,0),x.add(M);const C=new O(new Ht(e*.022,n.shoulderY-n.hipY,e*.012),c);if(C.position.set(0,(n.shoulderY-n.hipY)/2+e*.02,e*.062),x.add(C),t.accessory==="bow"){const L=new Ct;for(const H of[-1,1]){const V=new O(new Di(e*.026,e*.045,4),Ae(13915758));V.position.set(H*e*.024,0,0),V.rotation.z=H*Math.PI/2,L.add(V)}const I=new O(new Pe(e*.012,8,6),Ae(13915758));L.add(I),L.position.set(0,n.shoulderY-n.hipY-e*.015,e*.068),x.add(L)}if(t.accessory==="apron"){const L=new O(new Ht(e*.13,e*.2,e*.012),Ae(16117986));L.position.set(0,n.waistY-n.hipY+e*.02,e*.066),x.add(L)}if(t.accessory==="vest"){const L=new O(new Ht(e*.15,e*.2,e*.075),Ae(5003883));L.position.set(0,n.chestY-n.hipY,0),L.scale.z=1.02,x.add(L)}}const g=new Ct;g.position.y=n.neckY-n.hipY,x.add(g);const m=new Ct;m.position.y=n.headR*.95,g.add(m);{const v=new O(new Pe(n.headR,14,12),o);v.scale.set(1,1.06,.96),se(v,.014),m.add(v);const M=new O(new Pe(n.headR*.7,10,8),o);M.position.set(0,-n.headR*.52,n.headR*.16),M.scale.set(.9,.7,.9),m.add(M);for(const V of[-1,1]){const B=new O(new Pe(n.headR*.2,6,5),o);B.position.set(V*n.headR*.96,-n.headR*.05,0),B.scale.set(.5,1,.7),m.add(B)}const C=n.headR*.06,L=n.headR*.84;for(const V of[-1,1]){const B=new O(new Pe(n.headR*.155,8,8),d);B.position.set(V*n.headR*.36,C,L),B.scale.set(.82,1.16,.5),m.add(B);const Z=new O(new Pe(n.headR*.05,6,5),Li(16777215));Z.position.set(V*n.headR*.4,C+n.headR*.07,L+n.headR*.06),m.add(Z);const W=new O(new Ht(n.headR*.26,n.headR*.055,n.headR*.05),r);if(W.position.set(V*n.headR*.37,C+n.headR*.3,L-n.headR*.02),W.rotation.z=V*.12,m.add(W),t.blush!==!1){const rt=new O(new Me(n.headR*.3,n.headR*.16),u);rt.position.set(V*n.headR*.56,C-n.headR*.2,L-n.headR*.1),rt.rotation.y=V*.5,m.add(rt)}}const I=new O(new Pe(n.headR*.075,6,5),o);I.position.set(0,C-n.headR*.22,L+n.headR*.05),m.add(I);const H=new O(new Ht(n.headR*.18,n.headR*.05,n.headR*.04),f);if(H.position.set(0,C-n.headR*.45,L-n.headR*.02),m.add(H),t.glasses){for(const B of[-1,1]){const Z=new O(new Bs(n.headR*.2,n.headR*.028,5,12),Ae(4868690));Z.position.set(B*n.headR*.36,C,L+n.headR*.02),m.add(Z)}const V=new O(new Ht(n.headR*.2,n.headR*.025,n.headR*.02),Ae(4868690));V.position.set(0,C,L+n.headR*.02),m.add(V)}Wg(m,t,n,r)}const _={};for(const v of["L","R"]){const M=v==="L"?1:-1,C=new Ct;C.position.set(M*e*.098,n.shoulderY-n.hipY,0),x.add(C);const L=new O(new Ne(e*.028,e*.024,e*.155,8),a);L.position.y=-e*.078,se(L,.013),C.add(L);const I=new Ct;I.position.y=-e*.155,C.add(I);const H=new O(new Ne(e*.024,e*.02,e*.145,8),t.sleeveShort?o:a);H.position.y=-e*.072,se(H,.013),I.add(H);const V=new O(new Pe(e*.026,8,6),o);V.position.y=-e*.152,I.add(V),_[v]={sh:C,el:I,hand:V}}const b={};for(const v of["L","R"]){const M=v==="L"?1:-1,C=new Ct;C.position.set(M*e*.045,0,0),p.add(C);const L=new O(new Ne(e*.042,e*.036,n.hipY-n.kneeY+e*.02,8),l);L.position.y=-(n.hipY-n.kneeY)/2,se(L,.013),C.add(L);const I=new Ct;I.position.y=-(n.hipY-n.kneeY),C.add(I);const H=new O(new Ne(e*.034,e*.026,n.kneeY-n.ankleY,8),t.bottomStyle==="skirt"?o:l);H.position.y=-(n.kneeY-n.ankleY)/2,se(H,.013),I.add(H);const V=new O(new Ht(e*.055,e*.032,e*.105),h);V.position.set(0,-n.kneeY+n.ankleY-e*.012,e*.022),se(V,.013),I.add(V),b[v]={hip:C,kn:I,foot:V}}if(t.bottomStyle==="skirt"){const v=typeof t.skirt=="number"?Ae(t.skirt):t.skirt||Ae(4868696),M=new O(new Ne(e*.075,e*.125,e*.16,14,1,!0),v);M.position.y=-e*.04,v.side=rn,se(M,.012),p.add(M)}if(t.bag){const v=new O(new Ht(e*.11,e*.13,e*.05),Ae(t.bag));v.position.set(0,n.waistY-n.hipY-e*.02,-e*.085),x.add(v);const M=new O(new Ht(e*.022,e*.24,e*.012),Ae(5917248));M.position.set(e*.05,n.chestY-n.hipY+e*.02,0),M.rotation.z=-.3,x.add(M)}if(t.hat){const v=new O(new Ne(n.headR*1.15,n.headR*1.2,n.headR*.3,12),Ae(t.hat));v.position.set(0,n.headR*1.02,0),se(v,.013),m.add(v);const M=new O(new Ne(n.headR*1.7,n.headR*1.7,n.headR*.06,14),Ae(t.hat));M.position.set(0,n.headR*.9,-n.headR*.12),m.add(M)}const y=new Ct;{const v=Ae(t.umbrellaColor??4878248),M=Ae(6969930),C=8,L=e*.3,I=e*.24;for(let B=0;B<C;B++){const Z=B/C*xt,W=(B+1)/C*xt,rt=new O(new Di(L,I,C,1,!0),v);rt.geometry=new Di(L,I,C,1,!0),rt.position.y=I/2;const mt=new D(Math.cos(Z)*L,0,Math.sin(Z)*L),At=new D(Math.cos(W)*L,0,Math.sin(W)*L),Bt=new D(0,I,0),Zt=new De;Zt.setAttribute("position",new re([...mt.toArray(),...At.toArray(),...Bt.toArray()],3)),Zt.computeVertexNormals();const J=new O(Zt,v);J.material.side=rn,y.add(J),rt.visible=!1}const H=new O(new Ne(e*.008,e*.008,e*.42,6),M);H.position.y=-e*.12,y.add(H);const V=new O(new Bs(e*.03,e*.008,5,8),M);V.position.y=-e*.33,V.rotation.y=Math.PI/2,y.add(V),y.traverse(B=>{B.isMesh&&(B.castShadow=!0)})}y.position.set(0,n.shoulderY-n.hipY+e*.33,0),y.visible=!1,x.add(y),i.traverse(v=>{v.isMesh&&(v.castShadow=!0,v.receiveShadow=!1)}),y.visible=!1;const A={t:Math.random()*10,phase:Math.random()*xt,mode:"idle",blink:0,nextBlink:1+Math.random()*3,look:0,sitBlend:0,wave:0,talk:0};function w(v){A.mode=v}function R(v,M=0){A.t+=v;const C=M>.08,L=M>3,I=L?7.2:5.6;A.phase+=v*I*le(M/2.6,.35,1.9);const H=Math.sin(A.phase),V=Math.cos(A.phase);if(C){const B=L?.72:.5;b.L.hip.rotation.x=H*B,b.R.hip.rotation.x=-H*B,b.L.kn.rotation.x=-Math.max(0,-H)*B*1.1-.06,b.R.kn.rotation.x=-Math.max(0,H)*B*1.1-.06,_.L.sh.rotation.x=-H*B*.82,_.R.sh.rotation.x=H*B*.82,_.L.sh.rotation.z=.1,_.R.sh.rotation.z=-.1,_.L.el.rotation.x=-.28-Math.max(0,H)*.3,_.R.el.rotation.x=-.28-Math.max(0,-H)*.3,p.position.y=n.hipY+Math.abs(V)*e*.014,p.rotation.y=H*.07,x.rotation.x=L?.16:.07,m.rotation.x=L?-.1:-.03}else{const B=Math.sin(A.t*1.5)*.5+.5;1-A.sitBlend,b.L.hip.rotation.x=me(b.L.hip.rotation.x,.02,8,v),b.R.hip.rotation.x=me(b.R.hip.rotation.x,-.02,8,v),b.L.kn.rotation.x=me(b.L.kn.rotation.x,-.04,8,v),b.R.kn.rotation.x=me(b.R.kn.rotation.x,-.04,8,v),_.L.sh.rotation.x=me(_.L.sh.rotation.x,.03+B*.02,8,v),_.R.sh.rotation.x=me(_.R.sh.rotation.x,.03+B*.02,8,v),_.L.sh.rotation.z=me(_.L.sh.rotation.z,.13,8,v),_.R.sh.rotation.z=me(_.R.sh.rotation.z,-.13,8,v),_.L.el.rotation.x=me(_.L.el.rotation.x,-.16,8,v),_.R.el.rotation.x=me(_.R.el.rotation.x,-.16,8,v),p.position.y=me(p.position.y,n.hipY+B*e*.005,6,v),p.rotation.y=me(p.rotation.y,0,6,v),x.rotation.x=me(x.rotation.x,.015,6,v),m.rotation.x=me(m.rotation.x,0,6,v)}if(A.sitBlend=me(A.sitBlend,A.mode==="sit"?1:0,7,v),A.sitBlend>.01){const B=A.sitBlend;p.position.y=ft(p.position.y,n.hipY-n.kneeY+e*.02,B*.6),b.L.hip.rotation.x=ft(b.L.hip.rotation.x,-1.45,B),b.R.hip.rotation.x=ft(b.R.hip.rotation.x,-1.45,B),b.L.kn.rotation.x=ft(b.L.kn.rotation.x,1.5,B),b.R.kn.rotation.x=ft(b.R.kn.rotation.x,1.5,B),x.rotation.x=ft(x.rotation.x,.12,B)}if(A.wave=Math.max(0,A.wave-v),A.wave>0){const B=Math.sin(A.t*12)*.35;_.R.sh.rotation.z=ft(_.R.sh.rotation.z,-2.1,le(A.wave*3,0,1)),_.R.sh.rotation.x=ft(_.R.sh.rotation.x,.1,le(A.wave*3,0,1)),_.R.el.rotation.x=ft(_.R.el.rotation.x,-.4+B*.4,le(A.wave*3,0,1))}if(A.nextBlink-=v,A.nextBlink<=0&&(A.blink=.12,A.nextBlink=2+Math.random()*4),A.blink>0){A.blink-=v;const B=1-Math.abs(A.blink/.06-1);m.children.forEach(()=>{}),m.userData.eyes&&m.userData.eyes.forEach(Z=>{Z.scale.y=1.16*ft(1,.12,B)})}A.talk>0?(A.talk-=v,m.rotation.y=Math.sin(A.t*9)*.09,g.rotation.x=Math.sin(A.t*6)*.05):(m.rotation.y=me(m.rotation.y,Math.sin(A.t*.5+t.seed0||0)*.12,3,v),g.rotation.x=me(g.rotation.x,0,4,v))}function E(v){y.visible=!!v}return{root:i,hips:p,torso:x,head:m,neck:g,arms:_,legs:b,params:t,state:A,setUmbrella:E,setMode:w,update:R,say:(v=1.2)=>{A.talk=v},wave:(v=1.4)=>{A.wave=v},get headY(){return n.headY??e*.93},height:e}}function Wg(s,t,e,n,i){const o=e.headR,r=t.hairStyle||"short",a=(c,l,h,d,u,f)=>{const p=new Pe(o*1.06,14,10,c,l,0,h),x=new O(p,n);return x.scale.set(d[0],d[1],d[2]),x.position.set(u[0],u[1],u[2]),se(x,.014),s.add(x),x};if(r==="bald"||r==="thin"){a(0,xt,Math.PI*(r==="bald"?.42:.5),[1,1,1],[0,o*.04,0]);for(const c of[-1,1]){const l=new O(new Pe(o*.34,8,6),n);l.position.set(c*o*.94,-o*.12,o*.12),l.scale.set(.6,1.2,.8),s.add(l)}return}if(r==="short"){a(0,xt,Math.PI*.56,[1.02,1.04,1.02],[0,o*.02,0]);for(let c=-2;c<=2;c++){const l=new O(new Ht(o*.34,o*.4,o*.16),n);l.position.set(c*o*.3,o*.42-Math.abs(c)*o*.045,o*.76),l.rotation.z=c*.16,l.rotation.x=-.25,s.add(l)}return}if(r==="bob"){a(0,xt,Math.PI*.62,[1.06,1.02,1.06],[0,o*.01,0]);for(let c=-2;c<=2;c++){const l=new O(new Ht(o*.36,o*.46,o*.16),n);l.position.set(c*o*.31,o*.4-Math.abs(c)*o*.04,o*.74),l.rotation.z=c*.15,l.rotation.x=-.3,s.add(l)}for(const c of[-1,1]){const l=new O(new Ht(o*.3,o*.95,o*.6),n);l.position.set(c*o*.92,-o*.42,o*.1),l.rotation.y=c*.12,se(l,.014),s.add(l)}return}if(r==="long"){a(0,xt,Math.PI*.6,[1.05,1.02,1.05],[0,o*.01,0]);const c=new O(new Ne(o*.95,o*.7,o*2.6,12),n);c.position.set(0,-o*.9,-o*.18),c.scale.z=.6,se(c,.014),s.add(c);for(let l=-2;l<=2;l++){const h=new O(new Ht(o*.36,o*.44,o*.16),n);h.position.set(l*o*.31,o*.4,o*.75),h.rotation.z=l*.14,h.rotation.x=-.28,s.add(h)}for(const l of[-1,1]){const h=new O(new Ht(o*.26,o*1.3,o*.5),n);h.position.set(l*o*.92,-o*.6,o*.16),se(h,.014),s.add(h)}return}if(r==="ponytail"){a(0,xt,Math.PI*.58,[1.04,1.03,1.04],[0,o*.02,0]);const c=new O(new Bs(o*.22,o*.06,5,10),Ae(14711444));c.position.set(0,o*.5,-o*.9),c.rotation.x=1.1,s.add(c);const l=new O(new Ja(o*.3,o*1.3,4,8),n);l.position.set(0,-o*.25,-o*1.15),l.rotation.x=.45,se(l,.014),s.add(l);for(let h=-2;h<=2;h++){const d=new O(new Ht(o*.36,o*.4,o*.16),n);d.position.set(h*o*.3,o*.42,o*.76),d.rotation.z=h*.15,d.rotation.x=-.26,s.add(d)}return}if(r==="cap"){const c=new O(new Pe(o*1.1,12,8,0,xt,0,Math.PI*.5),Ae(t.hat||4877194));c.position.y=o*.12,se(c,.014),s.add(c);const l=new O(new Ne(o*1.35,o*1.35,o*.05,14),Ae(t.hat||4877194));l.position.set(0,o*.16,o*.55),l.scale.z=.8,s.add(l);for(let h=-2;h<=2;h++){const d=new O(new Ht(o*.34,o*.34,o*.16),n);d.position.set(h*o*.3,o*.34,o*.76),d.rotation.x=-.3,s.add(d)}return}if(r==="bun"){a(0,xt,Math.PI*.6,[1.04,1.02,1.04],[0,o*.01,0]);const c=new O(new Pe(o*.42,10,8),n);c.position.set(0,o*.85,-o*.55),se(c,.014),s.add(c);for(let l=-2;l<=2;l++){const h=new O(new Ht(o*.36,o*.44,o*.16),n);h.position.set(l*o*.3,o*.4,o*.76),h.rotation.z=l*.15,h.rotation.x=-.3,s.add(h)}return}a(0,xt,Math.PI*.58,[1.04,1.02,1.04],[0,o*.02,0])}const Yn=new Uint8Array(512),Is=new Float32Array(512);(function(){const t=ue(90210),e=new Uint8Array(256);for(let n=0;n<256;n++)e[n]=n;for(let n=255;n>0;n--){const i=Math.floor(t()*(n+1)),o=e[n];e[n]=e[i],e[i]=o}for(let n=0;n<512;n++)Yn[n]=e[n&255],Is[n]=t()*2-1})();function Fs(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,o=t-n,r=i*i*(3-2*i),a=o*o*(3-2*o),c=e&255,l=n&255,h=Is[Yn[c+Yn[l]]&511],d=Is[Yn[c+Yn[l+1]]&511],u=Is[Yn[c+1+Yn[l]]&511],f=Is[Yn[c+1+Yn[l+1]]&511],p=h+(u-h)*r,x=d+(f-d)*r;return p+(x-p)*a}function yl(s,t,e=4,n=2.03,i=.5){let o=1,r=1,a=0,c=0;for(let l=0;l<e;l++)a+=o*Fs(s*r,t*r),c+=o,o*=i,r*=n;return a/c}function Xg(s,t,e=4){let n=1,i=1,o=0,r=0;for(let a=0;a<e;a++){const c=1-Math.abs(Fs(s*i,t*i));o+=n*c*c,r+=n,n*=.52,i*=2.07}return o/r}const jt={gauge:1.435,zAt:s=>1.6*Math.sin(s/46)+.004*s,y:0,tunnelWest:-117,tunnelEast:117,walkHalfWidth:4.6,bedHalfWidth:3.2,railY:.16},qs=[{id:"main",name:"商店街",type:"asphalt",width:9,pts:[[-86,30],[50,30]],sidewalk:!0},{id:"crossing",name:"道口通り",type:"asphalt",width:7,pts:[[34,30],[34,12],[34,1],[34,-9]],sidewalk:!0},{id:"station-front",name:"駅前通り",type:"asphalt",width:7,pts:[[-10,19.5],[-10,30]],sidewalk:!0},{id:"residential",name:"住宅路",type:"local",width:5.6,pts:[[-44,30],[-44,52],[-6,52]],sidewalk:!1},{id:"kaikan-access",name:"集会所通り",type:"local",width:5.4,pts:[[-86,30],[-78,36],[-68,42]],sidewalk:!1},{id:"west-lane",name:"西の小径",type:"path",width:4.2,pts:[[-84,30.5],[-88,42],[-90,56],[-87,67],[-80,71]],sidewalk:!1},{id:"park-path",name:"公園の径",type:"gravel",width:3.8,pts:[[-30,52],[-31,62],[-32,70],[-32,80]],sidewalk:!1},{id:"shrine-path",name:"参道",type:"path",width:3.6,steps:!0,pts:[[34,-9],[33,-18],[30,-27],[27,-36],[24,-46],[24,-50]],sidewalk:!1},{id:"lookout-path",name:"見晴らし道",type:"path",width:2.8,pts:[[24,-58],[20,-64],[15,-68]],sidewalk:!1},{id:"east-path",name:"林の小径",type:"path",width:3.4,pts:[[50,30],[55,23],[59,14],[60,6]],sidewalk:!1},{id:"bridge",name:"小橋",type:"path",width:4,bridge:!0,pts:[[60,6],[73,2]],sidewalk:!1},{id:"east-trail",name:"沢沿い",type:"path",width:2.8,pts:[[73,2],[78,-8],[80,-18],[80,-27]],sidewalk:!1}],Ii={width:5.2,pts:[[52,-96],[58,-70],[63,-44],[65.5,-20],[66,8],[69,30],[77,56],[88,88]]},Ye={platform:{x0:-25,x1:9,inner:2.5,outer:9.2,h:1.05},roof:{x0:-22,x1:6,y:4.6}},Ie={x:34,z:jt.zAt(34),barrierX:8.2},cs=[{id:"station",kind:"station",name:"樱町车站",x:-10,z:14.6,w:24,d:8.4,rot:0,floors:1,roof:"gable",enter:"station"},{id:"konbini",kind:"shop",name:"樱花便利店",x:0,z:40.5,w:15,d:9,rot:Math.PI,floors:1,roof:"flat",enter:"konbini",sign:{text:"CV",sub:"樱花ストア",vertical:!1,bg:15922423,fg:14240330,accent:14240330,w:640,h:200,size:116,subSize:34,bgImage:"paper"}},{id:"cafe",kind:"cafe",name:"喫茶ひより",x:13,z:40.5,w:9,d:9,rot:Math.PI,floors:2,roof:"gable",enter:"cafe",sign:{text:"ひより",sub:"COFFEE & CAKE",bg:7031354,fg:16774112,accent:15254666,vertical:!1,w:512,h:256,size:104,subSize:26,bgImage:"wood"}},{id:"house-yoko",kind:"house",name:"藤田家",x:-42,z:44,w:10.5,d:8.2,rot:0,floors:1,roof:"hip",enter:"house",wall:15260868,roofCol:8160404},{id:"kaikan",kind:"kaikan",name:"町内集会所",x:-68,z:46,w:16,d:12,rot:0,floors:1,roof:"gable",enter:"kaikan"},{id:"post",kind:"shop",name:"樱町邮局",x:14,z:19.8,w:12,d:8.6,rot:0,floors:1,roof:"flat",sign:{text:"郵便局",sub:"JP POST",bg:16118502,fg:3103290,accent:13193263,w:512,h:200,size:92,subSize:26}},{id:"clinic",kind:"shop",name:"青木内科",x:25,z:19.8,w:9,d:8.6,rot:0,floors:2,roof:"flat",sign:{text:"青木内科",sub:"診療時間 9-18",bg:16645627,fg:3828618,accent:3828618,w:512,h:200,size:76,subSize:22}},{id:"apart",kind:"apartment",name:"樱町公寓",x:44,z:19.8,w:10,d:8.6,rot:0,floors:2,roof:"flat"},{id:"izakaya",kind:"shop",name:"小料理 ます",x:23,z:40.5,w:9,d:9,rot:Math.PI,floors:2,roof:"gable",sign:{text:"ます",sub:"小料理",bg:3812134,fg:16770744,accent:14256970,w:512,h:256,size:120,subSize:30,bgImage:"paper"},lantern:!0},{id:"wagashi",kind:"shop",name:"和菓子 花的国",x:33,z:40.5,w:9,d:9,rot:Math.PI,floors:1,roof:"gable",sign:{text:"花の国",sub:"和菓子",bg:16643820,fg:11554922,accent:9083482,w:512,h:256,size:84,subSize:28},awning:!0},{id:"sundries",kind:"shop",name:" Everyday 杂货",x:44,z:40.5,w:8,d:9,rot:Math.PI,floors:2,roof:"gable",sign:{text:"よろず",sub:"日用品",bg:3099196,fg:15920344,accent:15253835,w:512,h:256,size:100,subSize:26,bgImage:"wood"},lantern:!0},{id:"house-kobayashi",kind:"house",name:"小林家",x:-54,z:44,w:10,d:8,rot:0,floors:1,roof:"gable",wall:14471350,roofCol:9073256},{id:"house-haruka",kind:"house",name:"高橋家",x:-30,z:44,w:9.6,d:8,rot:0,floors:1,roof:"hip",wall:15787730,roofCol:8028818},{id:"house-m1",kind:"house",name:"町宅",x:-18,z:44,w:9,d:7.6,rot:0,floors:1,roof:"gable",wall:14735556,roofCol:7239808},{id:"house-m2",kind:"house",name:"町宅",x:-40,z:60,w:9,d:7.6,rot:Math.PI,floors:1,roof:"gable",wall:15920352,roofCol:9072226},{id:"house-m3",kind:"house",name:"町宅",x:-29,z:60,w:9.4,d:7.6,rot:Math.PI,floors:2,roof:"hip",wall:15129798,roofCol:7635086},{id:"house-m4",kind:"house",name:"町宅",x:-18,z:60,w:9,d:7.6,rot:Math.PI,floors:1,roof:"gable",wall:14208954,roofCol:6713470},{id:"school",kind:"school",name:"樱町小学校",x:-80,z:80,w:30,d:13,rot:0,floors:2,roof:"flat"},{id:"shrine",kind:"shrine",name:"绯樱神社",x:24,z:-54,w:15,d:12,rot:0,floors:1,roof:"shrine"}],qg=[{x:-10,z:25,hw:16,hd:8,rot:0,feather:4},{x:-80,z:72,hw:20,hd:12,rot:0,feather:5},{x:-32,z:76,hw:21,hd:14,rot:0,feather:6},{x:15,z:-68,hw:5,hd:5,rot:0,feather:3},{x:80,z:-27,hw:6,hd:6,rot:0,feather:3},{x:61,z:16,hw:4.5,hd:4.5,rot:0,feather:2.5},{x:0,z:40.5,hw:34,hd:8,rot:0,feather:3.5},{x:26,z:19.8,hw:24,hd:7,rot:0,feather:3.5},{x:60,z:4,hw:9,hd:4,rot:-.3,feather:2}],_i=[{id:"lm-shop",name:"商店街",x:24,z:33,r:8,desc:"傍晚会亮起一排招牌的小街。",discover:!0},{id:"lm-shrine",name:"绯樱神社",x:24,z:-52,r:9,desc:"坡道尽头、石阶之上的老神社。",discover:!0},{id:"lm-lookout",name:"见晴台",x:15,z:-68,r:6,desc:"能一眼望见整个小镇的木制平台。",discover:!0},{id:"lm-waterwheel",name:"水车小屋",x:61,z:16,r:6,desc:"还在转的旧水车，据说能带来好运。",discover:!0},{id:"lm-hut",name:"林间旧屋",x:80,z:-27,r:7,desc:"溪边林子里一间很久没人住的屋子。",discover:!0},{id:"lm-tunnel",name:"隧道口",x:112,z:0,r:10,desc:"铁路切进山体的入口，火车从这里消失。",discover:!0},{id:"lm-school",name:"樱町小学",x:-80,z:76,r:12,desc:"放学后空荡荡的操场。",discover:!1},{id:"lm-kaikan",name:"町内集会所",x:-68,z:46,r:10,desc:"小镇大事都在这里商量。",discover:!0},{id:"lm-park",name:"河童公园",x:-32,z:76,r:12,desc:"有沙坑和滑梯的小公园。",discover:!1},{id:"lm-station",name:"樱町车站",x:-10,z:12,r:10,desc:"小镇的大门。",discover:!1}],Ml=[{id:"station",name:"车站",x:-10,z:14,r:22},{id:"main-st",name:"商店街",x:20,z:30,r:30},{id:"residential",name:"住宅区",x:-32,z:50,r:22},{id:"park",name:"河童公园",x:-32,z:76,r:20},{id:"shrine",name:"神社",x:24,z:-50,r:24},{id:"school",name:"学校",x:-80,z:76,r:22},{id:"kaikan",name:"集会所",x:-68,z:46,r:16},{id:"east-woods",name:"东边的林子",x:74,z:-8,r:26}],Vt={spawn:{x:-10,z:25.5,rot:0},stationDoor:{x:-10,z:19},konbiniDoor:{x:0,z:35.6},konbiniInside:{x:0,z:43.2},cafeDoor:{x:13,z:35.6},cafeInside:{x:13,z:42.6},houseDoor:{x:-42,z:48.5},houseInside:{x:-42,z:42.4},kaikanDoor:{x:-68,z:52.4},kaikanInside:{x:-68,z:49.2},stationInside:{x:-10,z:16.6},noticeBoard:{x:-2.2,z:21.6,rot:-.35},platformCenter:{x:-8,z:5.6},crossingSouth:{x:34,z:8.5},crossingNorth:{x:34,z:-5.5},shrineGate:{x:24,z:-45.5},parkCenter:{x:-32,z:76},benchPark:{x:-30,z:78},schoolGate:{x:-80,z:71},torii:{x:24,z:-45.5},lookout:{x:15,z:-68},bridge:{x:66.5,z:4},waterwheel:{x:61,z:16},hut:{x:80,z:-27}},Yg={x:2400},$g={station:{name:"樱町车站",w:24,d:8.4,wall:15262418,floor:"tile"},konbini:{name:"樱花便利店",w:15,d:9,wall:16054004,floor:"tile"},cafe:{name:"喫茶ひより",w:9,d:9,wall:15786700,floor:"wood"},house:{name:"藤田家",w:10.5,d:8.2,wall:15919830,floor:"wood"},kaikan:{name:"町内集会所",w:16,d:12,wall:15525592,floor:"wood"}},Bh={wagashi:[{item:"dango",price:120,name:"樱花团子"},{item:"drink",price:130,name:"冷泡茶"}],konbini:[{item:"drink",price:130,name:"罐装饮料"},{item:"soda",price:140,name:"苏打水"}]},Hs={size:440,seg:288},qt=Hs.seg+1,qo=Hs.size,Hh=qo/Hs.seg,Gh=qo/2,hn=s=>-Gh+s*Hh,Fe=s=>(s+Gh)/Hh;let Oe=null,Cs=null,Jn=null,zs=null;const ti=-1.25;function Ps(s,t,e,n,i,o){const r=(s-e)*(s-e)+(t-n)*(t-n);return o*Math.exp(-r/(2*i*i*.36))}function jg(s,t){const e=Math.hypot(s,t);let n=yl(s*.0105,t*.0105,3)*1.85+yl(s*.031+31,t*.031-17,2)*.4;n+=Ps(s,t,24,-50,30,5.8),n+=Ps(s,t,-80,-30,30,11),n+=Ps(s,t,-32,76,26,1.5),n+=Ps(s,t,-80,80,28,2.4),n+=Ps(s,t,78,-26,18,2);const i=an(86,160,e);return n+=Math.pow(i,1.7)*(28+Xg(s*.0062,t*.0062,4)*44),n+=an(150,232,e)*30,n}const en=(s,t)=>t*qt+s;function Yo(s,t){const e=le(Math.round(Fe(s)),0,qt-1),n=le(Math.round(Fe(t)),0,qt-1);return Oe[en(e,n)]}function Zg(s,t,e,n,i){const o=Math.abs(s)-(e-i),r=Math.abs(t)-(n-i),a=Math.max(o,0),c=Math.max(r,0);return Math.hypot(a,c)+Math.min(Math.max(o,r),0)-i}function Hr(s,t,e,n,i,o,r,a="flat"){const c=Math.cos(-i),l=Math.sin(-i),h=Math.hypot(e,n)+o+2,d=le(Math.floor(Fe(s-h)),0,qt-1),u=le(Math.ceil(Fe(s+h)),0,qt-1),f=le(Math.floor(Fe(t-h)),0,qt-1),p=le(Math.ceil(Fe(t+h)),0,qt-1),x=a==="pave"?1:.55;for(let g=f;g<=p;g++){const m=hn(g);for(let _=d;_<=u;_++){const b=hn(_),y=(b-s)*c-(m-t)*l,A=(b-s)*l+(m-t)*c,w=Zg(y,A,e,n,Math.min(1.2,Math.min(e,n)*.35));if(w>o)continue;const R=an(0,o,Math.max(0,w)),E=en(_,g);Oe[E]=ft(r,Oe[E],R),R<1&&(Jn[E]=Math.max(Jn[E],x*(1-R)))}}}function Kg(){Cs=new Float32Array(qt*qt),Oe=new Float32Array(qt*qt),Jn=new Float32Array(qt*qt),zs=new Float32Array(qt*qt).fill(9999);for(let e=0;e<qt;e++){const n=hn(e);for(let i=0;i<qt;i++)Cs[en(i,e)]=jg(hn(i),n)}Oe.set(Cs);const s=Vh(Ii.pts,2.2),t=new Float32Array(qt*qt).fill(9999);for(const e of s){const i=le(Math.floor(Fe(Math.min(e.ax,e.bx)-40)),0,qt-1),o=le(Math.ceil(Fe(Math.max(e.ax,e.bx)+40)),0,qt-1),r=le(Math.floor(Fe(Math.min(e.az,e.bz)-40)),0,qt-1),a=le(Math.ceil(Fe(Math.max(e.az,e.bz)+40)),0,qt-1);for(let c=r;c<=a;c++){const l=hn(c);for(let h=i;h<=o;h++){const d=hn(h),u=nc(d,l,e.ax,e.az,e.bx,e.bz);u.d<t[en(h,c)]&&(t[en(h,c)]=u.d)}}}zs=t;for(let e=0;e<qt*qt;e++){const n=t[e];if(n>42)continue;const i=Math.exp(-(n*n)/12.96),o=Math.exp(-(n*n)/144),r=Math.exp(-(n*n)/10.24);Oe[e]-=2.4*o+1.4*r+.35*i}for(let i=0;i<=qt;i++)for(let o=0;o<qt;o++){const r=hn(o),a=Math.abs(hn(i)-jt.zAt(r));if(a>15)continue;const c=en(o,i);if(zs[c]<6)continue;const l=an(4.4,15,a);Oe[c]=ft(0,Oe[c],l),l>.35&&(Jn[c]=Math.max(Jn[c],.9*(1-l)))}for(let e=0;e<qt;e++){const n=hn(e);for(let i=0;i<qt;i++){const o=hn(i),r=Math.abs(o),a=an(104,118,r);if(a<=.001)continue;const c=Math.abs(n-jt.zAt(o));if(c>9)continue;const l=1-an(0,6.5,c),h=en(i,e),d=Math.max(Cs[h],3.5);Oe[h]=ft(Oe[h],d,a*l)}}for(const e of cs){const n=Yo(e.x,e.z);Hr(e.x,e.z,e.w/2+.5,e.d/2+.5,e.rot,2.2,n,"pad")}for(const e of qg){const n=e.y!==void 0?e.y:Yo(e.x,e.z);Hr(e.x,e.z,e.hw,e.hd,e.rot,e.feather,n,"flat")}for(const e of qs)e.bridge||Jg(e);{const e=jt.zAt(0);Hr(-8,e+5.8,19,4.6,0,2.5,0,"pave")}return{H:Oe,Hbase:Cs,roadMask:Jn,streamDist:zs}}function Vh(s,t=1){const e=[],n=[];for(let i=0;i<s.length-1;i++){const[o,r]=s[i],[a,c]=s[i+1],l=Math.hypot(a-o,c-r),h=Math.max(1,Math.ceil(l/8));for(let d=0;d<h;d++){const u=d/h,f=(d+1)/h;n.push([ft(o,a,u),ft(r,c,u),ft(o,a,f),ft(r,c,f)])}}return n.forEach(i=>e.push({ax:i[0],az:i[1],bx:i[2],bz:i[3]})),e}function Jg(s){const t=s.width/2,e=s.type==="asphalt"?3.2:2.4,n=Vh(s.pts,1),i=s.type==="asphalt"?1:s.type==="local"?.7:.45;for(const o of n){const r=Yo(o.ax,o.az),a=Yo(o.bx,o.bz),c=t+e,l=le(Math.floor(Fe(Math.min(o.ax,o.bx)-c)),0,qt-1),h=le(Math.ceil(Fe(Math.max(o.ax,o.bx)+c)),0,qt-1),d=le(Math.floor(Fe(Math.min(o.az,o.bz)-c)),0,qt-1),u=le(Math.ceil(Fe(Math.max(o.az,o.bz)+c)),0,qt-1);for(let f=d;f<=u;f++){const p=hn(f);for(let x=l;x<=h;x++){const g=hn(x),m=nc(g,p,o.ax,o.az,o.bx,o.bz);if(m.d>t+e)continue;const _=en(x,f),b=ft(r,a,m.t),y=an(t,t+e,m.d);Oe[_]=ft(b,Oe[_],y),y<1&&(Jn[_]=Math.max(Jn[_],i*(1-y)))}}}}function j(s,t){const e=Fe(s),n=Fe(t),i=le(Math.floor(e),0,qt-1),o=le(Math.floor(n),0,qt-1),r=Math.min(i+1,qt-1),a=Math.min(o+1,qt-1),c=e-i,l=n-o,h=Oe[en(i,o)],d=Oe[en(r,o)],u=Oe[en(i,a)],f=Oe[en(r,a)];return ft(ft(h,d,c),ft(u,f,c),l)}function Wh(s,t,e=.7){const n=j(s-e,t),i=j(s+e,t),o=j(s,t-e),r=j(s,t+e),a=n-i,c=o-r,l=2*e,h=Math.hypot(a,l,c)||1;return{x:a/h,y:l/h,z:c/h}}function Qg(s,t){return 1-Wh(s,t,1.1).y}function $o(s,t){const e=le(Math.round(Fe(s)),0,qt-1),n=le(Math.round(Fe(t)),0,qt-1);return zs[en(e,n)]}function tx(s,t){const e=le(Math.round(Fe(s)),0,qt-1),n=le(Math.round(Fe(t)),0,qt-1);return Jn[en(e,n)]}const To=new Nt;function ex(s,t,e,n,i){const o=$o(s,t),r=tx(s,t),a=Fs(s*.06,t*.06),c=Fs(s*.017+40,t*.017-22),l=Fs(s*.21-11,t*.21+7);let h=Se(ot.grass,ot.grassDark,Ge(.5+a*.55+c*.35));h=Se(h,ot.grassLight,Ge(.45+l*.6)*.5),h=Se(h,Se(ot.grassDark,ot.leafDark,.5),Ge(c*.4+.18)*.35);const d=an(.45,1.5,e);if(d>0){const p=Se(ot.pine,ot.leafDark,.4+a*.3);h=Se(h,p,Ge(d*1.3));const x=an(.55,1,n)*(.4+d);h=Se(h,Se(ot.rock,ot.rockDark,a*.5),Ge(x))}const u=an(.42,.72,n);h=Se(h,Se(ot.rock,ot.rockDark,.3+a*.4),u*.85);const f=an(9,2.2,o);return h=Se(h,Se(ot.sand,ot.gravel,.4+a*.4),f*.9),e<ti+.4&&(h=Se(h,ot.gravel,an(ti+.4,ti-.6,e))),r>.01&&(h=Se(h,ot.dirt,r*.5)),i.setHex(h),i}function nx(){const s=new Me(qo,qo,Hs.seg,Hs.seg);s.rotateX(-Math.PI/2);const t=s.attributes.position,e=new Float32Array(t.count*3);for(let r=0;r<qt;r++)for(let a=0;a<qt;a++){const c=en(a,r);t.setY(c,Oe[c])}s.setAttribute("color",new Re(e,3)),s.computeVertexNormals();const n=s.attributes.normal;for(let r=0;r<qt;r++)for(let a=0;a<qt;a++){const c=en(a,r),l=hn(a),h=hn(r),d=1-n.getY(c);ex(l,h,Oe[c],d,To),e[c*3]=To.r,e[c*3+1]=To.g,e[c*3+2]=To.b}s.attributes.color.needsUpdate=!0;const i=new Kn({vertexColors:!0,gradientMap:mi()}),o=new O(s,i);return o.name="terrain",o.receiveShadow=!0,o}function Xh(){const s=[],t=Ii.pts;for(let l=0;l<t.length-1;l++){const[h,d]=t[l],[u,f]=t[l+1],p=Math.hypot(u-h,f-d),x=Math.ceil(p/3);for(let g=0;g<x;g++){const m=g/x;s.push([ft(h,u,m),ft(d,f,m)])}}s.push([t[t.length-1][0],t[t.length-1][1]]);const e=Ii.width*.5,n=[],i=[],o=[];let r=0;for(let l=0;l<s.length;l++){const[h,d]=s[l],u=s[Math.max(0,l-1)],f=s[Math.min(s.length-1,l+1)];let p=f[0]-u[0],x=f[1]-u[1];const g=Math.hypot(p,x)||1;p/=g,x/=g;const m=-x,_=p;l>0&&(r+=Math.hypot(h-s[l-1][0],d-s[l-1][1]));const b=e*(.85+.3*Math.sin(r*.13));if(n.push(h+m*b,ti,d+_*b),n.push(h-m*b,ti,d-_*b),i.push(0,r*.14,1,r*.14),l<s.length-1){const y=l*2;o.push(y,y+2,y+1,y+1,y+2,y+3)}}const a=new De;a.setAttribute("position",new re(n,3)),a.setAttribute("uv",new re(i,2)),a.setIndex(o),a.computeVertexNormals();const c=new O(a,new Kn({color:ot.water,transparent:!0,opacity:.86,side:rn}));return c.name="stream-water",c.renderOrder=1,c}class ix{constructor(){this.boxes=[],this.circles=[],this.grid=new Map,this.cell=8}addBox(t,e,n,i,o=0,r=1/0,a=-1){const c={x:t,z:e,hw:n,hd:i,rot:o,top:r,bottom:a,c:Math.cos(o),s:Math.sin(o)};return this.boxes.push(c),c}addCircle(t,e,n,i=1/0,o=-1){const r={x:t,z:e,r:n,top:i,bottom:o};return this.circles.push(r),r}index(){this.grid.clear();const t=this.cell,e=(n,i,o)=>{const r=Math.floor(n/t)+","+Math.floor(i/t);let a=this.grid.get(r);a||(a=[],this.grid.set(r,a)),a.push(o)};for(const n of this.boxes){const i=Math.hypot(n.hw,n.hd)+.5;for(let o=n.x-i;o<=n.x+i;o+=t)for(let r=n.z-i;r<=n.z+i;r+=t)e(o,r,n)}for(const n of this.circles)for(let i=n.x-n.r;i<=n.x+n.r;i+=t)for(let o=n.z-n.r;o<=n.z+n.r;o+=t)e(i,o,n)}near(t,e,n){const i=this.cell,o=[],r=new Set;for(let a=Math.floor((t-n)/i);a<=Math.floor((t+n)/i);a++)for(let c=Math.floor((e-n)/i);c<=Math.floor((e+n)/i);c++){const l=this.grid.get(a+","+c);if(l)for(const h of l)r.has(h)||(r.add(h),o.push(h))}return o}resolve(t,e,n,i=0,o=3){for(let r=0;r<o;r++){const a=this.near(t,e,n+2);let c=!1;for(const l of a)if(!(i+1.2<l.bottom||i>l.top))if(l.hw!==void 0){const h=t-l.x,d=e-l.z,u=h*l.c+d*l.s,f=-h*l.s+d*l.c,p=Math.max(-l.hw,Math.min(l.hw,u)),x=Math.max(-l.hd,Math.min(l.hd,f));let g=u-p,m=f-x,_=Math.hypot(g,m);if(_>n)continue;if(_<1e-6){const E=l.hw-Math.abs(u),v=l.hd-Math.abs(f);E<v?(g=Math.sign(u)||1,m=0,_=0):(g=0,m=Math.sign(f)||1,_=0);const M=n+(E<v?E:v)+.001,C=g,L=m,I=C*l.c-L*l.s,H=C*l.s+L*l.c;t+=I*M,e+=H*M,c=!0;continue}const b=g/_,y=m/_,A=n-_+.001,w=b*l.c-y*l.s,R=b*l.s+y*l.c;t+=w*A,e+=R*A,c=!0}else{const h=t-l.x,d=e-l.z,u=Math.hypot(h,d),f=l.r+n;if(u>=f||u<1e-6)continue;const p=f-u;t+=h/u*p,e+=d/u*p,c=!0}if(!c)break}return{x:t,z:e}}blocked(t,e,n,i,o,r,a=12){for(let c=1;c<a;c++){const l=c/a,h=t+(i-t)*l,d=e+(o-e)*l,u=n+(r-n)*l;for(const f of this.near(h,u,1.5)){if(f.hw===void 0){if(Math.hypot(h-f.x,u-f.z)<f.r)return!0;continue}if(d<f.bottom||d>f.top)continue;const p=h-f.x,x=u-f.z,g=p*f.c+x*f.s,m=-p*f.s+x*f.c;if(Math.abs(g)<f.hw&&Math.abs(m)<f.hd)return!0}}return!1}}const sx=.62,ox=.66;function bl(s,t,e,n,i=j){const o=i(s,t),r=i(e,n);return!(Math.abs(r-o)>sx||Wh(e,n,.8).y<ox||r<ti-1.1)}const rx=2.55,ax=4.9;class cx{constructor(t){this.collision=t,this.pos=new D(0,0,0),this.yaw=0,this.vel=new D,this.speed=0,this.groundFn=()=>0,this.zone="world",this.char=Oh({seed0:.3}),this.obj=this.char.root,this.obj.name="player",this.frozen=!1,this.sitTarget=null,this._bob=0,this.radius=.34,this.speedScale=1}teleport(t,e,n,i){this.pos.set(t,e,n),i!==void 0&&(this.yaw=i),this.vel.set(0,0,0),this.sync()}sync(){this.obj.position.set(this.pos.x,this.pos.y,this.pos.z),this.obj.rotation.y=this.yaw}update(t,e,n){if(this.frozen){this.speed=0,this.char.update(t,0),this.char.setMode(this.sitTarget?"sit":"idle"),this.sync();return}if(this.sitTarget)if(Math.hypot(this.sitTarget.x-this.pos.x,this.sitTarget.z-this.pos.z)>.9||e.hit("e","escape"))this.sitTarget=null;else{this.char.setMode("sit"),this.yaw=Xo(this.yaw,Math.atan2(this.sitTarget.dx??0,this.sitTarget.dz??1),8,t),this.char.update(t,0),this.sync();return}const i=e.axis(),o=e.down("shift");let r=new D;if(i.len>0){const x=Math.cos(n),g=Math.sin(n),m=g,_=x,b=x,y=-g;r.set(m*i.y+b*i.x,0,_*i.y+y*i.x),r.lengthSq()>0&&r.normalize()}const a=(o?ax:rx)*this.speedScale,c=r.multiplyScalar(a),l=i.len>0?18:14;this.vel.x=me(this.vel.x,c.x,l,t),this.vel.z=me(this.vel.z,c.z,l,t),this.speed=Math.hypot(this.vel.x,this.vel.z),this.speed>.12&&(this.yaw=Xo(this.yaw,Math.atan2(this.vel.x,this.vel.z),13,t));const h=this.radius,d=(x,g)=>{const m=this.pos.x+x,_=this.pos.z+g;if(this.zone==="world"&&!bl(this.pos.x,this.pos.z,m,_,this.groundFn))return!1;const b=this.collision.resolve(m,_,h,this.pos.y,3);return this.zone==="world"&&!bl(this.pos.x,this.pos.z,b.x,b.z,this.groundFn)?!1:(this.pos.x=b.x,this.pos.z=b.z,!0)},u=this.vel.x*t,f=this.vel.z*t;d(u,0)||(this.vel.x*=.2),d(0,f)||(this.vel.z*=.2);const p=this.groundFn(this.pos.x,this.pos.z);this.pos.y=me(this.pos.y,p,22,t),Math.abs(this.pos.y-p)<.02&&(this.pos.y=p),this.char.setMode("idle"),this.char.update(t,this.speed),this.sync()}facing(){return this.yaw}}class lx{constructor(t,e){this.cam=t,this.collision=e,this.yaw=Math.PI,this.pitch=.22,this.dist=6.2,this.targetDist=6.2,this.height=1.5,this.target=new D,this.smoothTarget=new D,this.shake=0,this.indoor=!1,this.fovBase=52,this.minDist=1.6,this.maxDist=11,this.ceilH=3,this.headLift=.45}setInterior(t,e=3){this.indoor=t,this.ceilH=e,t?(this.minDist=1.4,this.maxDist=6.5,this.targetDist=3.4,this.headLift=.16,this.pitch=le(this.pitch,.22,.85),this.pitch<.3&&(this.pitch=.31)):(this.minDist=1.6,this.maxDist=11,this.targetDist=6.2,this.headLift=.45,this.pitch=le(this.pitch,-.42,1.05),this.pitch>.25&&(this.pitch=.22))}handleInput(t){if(t.dragDX||t.dragDY){this.yaw-=t.dragDX*.0055;const e=this.indoor?.22:-.42,n=this.indoor?.95:1.05;this.pitch=le(this.pitch+t.dragDY*.004,e,n)}t.wheel&&(this.targetDist=le(this.targetDist+t.wheel*.006,this.minDist,this.maxDist))}update(t,e,n){this.target.set(e.pos.x,e.pos.y+this.height,e.pos.z),this.smoothTarget.lerp(this.target,1-Math.exp(-12*t)),this.dist=me(this.dist,this.targetDist,9,t);const i=Math.cos(this.pitch),o=Math.sin(this.pitch),r=Math.sin(this.yaw)*i,a=Math.cos(this.yaw)*i;let c=this.dist;if(this.collision){const u=this.smoothTarget.x,f=this.smoothTarget.y,p=this.smoothTarget.z,x=this.bounds?8:6;let g=c;for(let m=1;m<=x;m++){const _=m/x,b=u+r*c*_,y=f+o*c*_+this.headLift*_,A=p+a*c*_;if(this.collision.blocked(u,f,p,b,y,A,4)){g=c*_*.88;break}}c=Math.max(1.1,g)}let l=this.smoothTarget.x+r*c,h=this.smoothTarget.y+o*c+this.headLift,d=this.smoothTarget.z+a*c;if(this.groundFn){const u=this.groundFn(l,d)+(this.indoor?.3:.5);h<u&&(h=u)}if(this.bounds){const u=this.bounds;l=le(l,u.x0,u.x1),d=le(d,u.z0,u.z1),h=Math.min(h,u.y??99,this.ceilH-.22)}this.shake>.001&&(l+=(Math.random()-.5)*this.shake,h+=(Math.random()-.5)*this.shake,d+=(Math.random()-.5)*this.shake,this.shake=me(this.shake,0,6,t)),this.cam.position.set(l,h,d),this.cam.lookAt(this.smoothTarget.x,this.smoothTarget.y+.12,this.smoothTarget.z)}addShake(t){this.shake=Math.min(.6,this.shake+t)}}const wl=1.32,hx=2.5,qh={konbini:{x:0,z:-3.9},cafe:{x:0,z:-3.4},station:{x:0,z:4},house:{x:0,z:3.2},kaikan:{x:0,z:4.6}};function Eo(s){const t=Vt[s]||Vt[s+"Door"];return t?{x:t.x,z:t.z,local:qh[s]||{x:0,z:3}}:null}const dx={"house-yoko":{x:-42,z:40.2},"house-kobayashi":{x:-54,z:40.2},"house-haruka":{x:-30,z:40.2},"house-m1":{x:-40,z:56.4},"house-m2":{x:-29,z:56.4}};class Sl{constructor(t,e,n,i={}){this.def=t,this.id=t.id,this.name=t.name,this.nav=n,this.isBackground=!!i.background,this.scale=i.scale||1,this.zone="world",this.affinity=0,this.met=!1,this.flags={},this.rng=Math.random,this.char=Oh({...t.look,seed0:Math.random()*6}),this.obj=this.char.root,this.obj.name="npc-"+t.id,this.obj.scale.setScalar(this.scale),e.add(this.obj),this.pos=new D,this.yaw=0,this.state="idle",this.goal=null,this.leg=null,this.path=null,this.pathIdx=0,this.speedNow=0,this.activity=null,this._curTag=null,this.waitT=0,this.zones=null}get height(){return this.char.height}get isHome(){return this.activity&&(this.activity.act==="sleep"||this.activity.act==="sit")}place(t,e,n=0){this.pos.set(t,j(t,e),e),this.yaw=n,this.obj.rotation.y=n,this.obj.position.copy(this.pos)}resolveSpot(t){if(!t)return{zone:"world",pos:{x:this.pos.x,z:this.pos.z},face:this.yaw};if(t==="home")return{zone:"world",pos:dx[this.def.home]||{x:-42,z:40},face:0};if(qh[t])return{zone:t,pos:{x:0,z:2.5},face:Math.PI};if(t==="platform")return{zone:"world",pos:{x:-6,z:jt.zAt(-6)+6.3},face:0,y:1.05};if(t==="school")return{zone:"world",pos:{x:-80,z:74.2},face:Math.PI};if(t==="shrine")return{zone:"world",pos:{x:24,z:-47.6},face:0};if(t==="lookout")return{zone:"world",pos:{x:Vt.lookout.x,z:Vt.lookout.z+.6},face:Math.PI};if(t==="park:center")return{zone:"world",pos:{x:-32,z:72.5},face:0};let e=this.nav.indexByTag[t];if(e===void 0&&t.startsWith("anchor:")&&(e=this.nav.indexByTag[t]),e!==void 0){const n=this.nav.nodes[e];return{zone:"world",pos:{x:n.x,z:n.z},face:0}}return{zone:"world",pos:{x:this.pos.x,z:this.pos.z},face:this.yaw}}setGoal(t,e="stand"){const n=this.resolveSpot(t);this.goal={...n,act:e,tag:t},this.leg=null,this.path=null}nextLeg(){const t=this.goal;if(!t){this.leg=null;return}if(t.zone==="world"&&this.zone==="world"){const e=this.nav.nearest(this.pos.x,this.pos.z),n=this.nav.nearest(t.pos.x,t.pos.z),i=e.i>=0&&n.i>=0?this.nav.path(e.i,n.i):null;this.path=i&&i.length>1?i:null,this.pathIdx=1,this.leg=this.path?{kind:"world"}:{kind:"spot",target:{x:t.pos.x,z:t.pos.z}}}else if(t.zone==="world"){const e=Eo(this.zone);if(!e){this.leg=null;return}this.leg={kind:"spot",inZone:!0,target:e.local,onDone:"exitZone"}}else if(this.zone==="world"){const e=Eo(t.zone);if(!e){this.leg=null;return}this.leg={kind:"spot",target:{x:e.x,z:e.z},onDone:"enterZone"}}else this.leg={kind:"spot",target:t.pos,onDone:"arrive"}}zoneOrigin(){return this.zones?.[this.zone]?.origin||{x:0,z:0}}toWorld(t){const e=this.zoneOrigin();return{x:e.x+t.x,z:e.z+t.z}}fromWorld(t){const e=this.zoneOrigin();return{x:t.x-e.x,z:t.z-e.z}}update(t,e){this.zones=e.zones;const n=this.currentActivity(e.time.hour,e),i=n.at||n.tag;(i!==this._curTag||n.act!==this._curAct)&&(this._curTag=i,this._curAct=n.act,this.activity=n,this.setGoal(i,n.act)),this.leg||this.nextLeg(),this.step(t,e)}currentActivity(t,e){const n=this.def.schedule;if((e?.weather?.rain??0)>.25&&this.def.rainTag){const o=this._pickSchedule(n,t),r=o&&(o.at||o.tag);if(o&&r!==this.def.rainTag&&o.act==="walk")return{tag:this.def.rainTag,act:"walk"}}if(!n){const o=this.def.period;if(!(o[0]<=o[1]?t>=o[0]&&t<=o[1]:t>=o[0]||t<=o[1]))return{tag:this.def.loop[0],act:"stand"};const a=Math.max(.5,(o[1]-o[0]+24)%24||24),c=(t-o[0]+24)%24,l=le(Math.floor(c/(a/this.def.loop.length)),0,this.def.loop.length-1);return{tag:this.def.loop[l],act:"walk"}}return this._pickSchedule(n,t)}_pickSchedule(t,e){for(const n of t){const[i,o]=n.h;if(i<=o?e>=i&&e<o:e>=i||e<o)return n}return t[t.length-1]}step(t,e){const n=this.leg;if(!n){this.state="idle",this.apply(t);return}const i=this.goal;if(n.kind==="world"&&this.path){const o=this.nav.nodes[this.path[this.pathIdx]];if(!o){this.path=null,this.leg={kind:"spot",target:{x:i.pos.x,z:i.pos.z}},this.apply(t);return}if(bn(this.pos.x,this.pos.z,o.x,o.z)<1)this.pathIdx++,this.pathIdx>=this.path.length&&(this.path=null,this.leg={kind:"spot",target:{x:i.pos.x,z:i.pos.z}});else{if(this.mustWaitForTrain(o,e)){this.state="wait",this.apply(t);return}this.moveTo(o.x,o.z,t,e)}}else{const o=this.targetPoint(n);bn(this.pos.x,this.pos.z,o.x,o.z)<(n.inZone?.55:.5)?this.onArrive(n,e):this.zone==="world"&&this.mustWaitForTrain(o,e)?this.state="wait":this.moveTo(o.x,o.z,t,e,n.inZone?.75:1)}if((!this.leg||this.leg.kind==="spot")&&this.goal&&i.zone===this.zone){const o=this.targetPoint({...this.leg,target:i.pos});bn(this.pos.x,this.pos.z,o.x,o.z)<1?(i.face!==void 0&&(this.yaw=Xo(this.yaw,i.face,3,t)),this.state=i.act==="sit"?"sit":i.act==="work"?"work":"idle",this.speedNow=0):this.state!=="wait"&&this.moveTo(o.x,o.z,t,e,.6)}this.apply(t)}targetPoint(t){const e=this.goal&&this.goal.zone!=="world"&&this.goal.zone===this.zone,n=t.inZone?t.target:t.target||(this.goal&&this.goal.zone!=="world"?this.goal.pos:null);return n?t.inZone||e?this.toWorld(n):n:{x:this.pos.x,z:this.pos.z}}onArrive(t,e){if(t.onDone==="enterZone"){const n=Eo(this.goal.zone),i=this.zones[this.goal.zone]?.origin;n&&i&&(this.zone=this.goal.zone,this.pos.set(i.x+n.local.x,0,i.z+n.local.z)),this.path=null,this.leg=null,this.nextLeg()}else if(t.onDone==="exitZone"){const n=Eo(this.zone);n&&(this.zone="world",this.pos.set(n.x,j(n.x,n.z),n.z)),this.path=null,this.leg=null,this.nextLeg()}else this.path=null,this.leg=null}mustWaitForTrain(t,e){if(!e.trainSystem||!e.trainSystem.crossingBusy||this.zone!=="world")return!1;const n=this.pos.z-jt.zAt(this.pos.x),i=t.z-jt.zAt(t.x);return n*i<0&&Math.abs(this.pos.x-Ie.x)<15}moveTo(t,e,n,i,o=1){const r=t-this.pos.x,a=e-this.pos.z,c=Math.hypot(r,a)||1,h=(this.isBackground?wl*1.08:this.goal?.act==="run"?hx:wl)*(this.def.speed??1)*o,d=r/c*h,u=a/c*h;let f=this.pos.x+d*n,p=this.pos.z+u*n;if(this.zone==="world"){const m=j(this.pos.x,this.pos.z);if(Math.abs(j(f,p)-m)>.7||j(f,p)<ti-1)if(Math.abs(j(f,this.pos.z)-m)<=.7&&j(f,this.pos.z)>=ti-1)p=this.pos.z;else if(Math.abs(j(this.pos.x,p)-m)<=.7&&j(this.pos.x,p)>=ti-1)f=this.pos.x;else{this.state="idle",this.speedNow=0;return}}const x=i.collision.resolve(f,p,.3,this.pos.y,2),g=Math.hypot(x.x-this.pos.x,x.z-this.pos.z);if(this.pos.x=x.x,this.pos.z=x.z,this.speedNow=h,this.yaw=Xo(this.yaw,Math.atan2(d,u),8,n),this.state=g>1e-4?"walk":"wait",this.stuckT=g<.015?(this.stuckT||0)+n:0,this.stuckT>.35&&(this.stuckT=0,this.detour=-(this.detour||1),this.detourT=1.1),this.detourT>0){this.detourT-=n;const m=-a/c,_=r/c;t-this.pos.x,e-this.pos.z,this.pos.x+=m*this.detour*h*n*.9,this.pos.z+=_*this.detour*h*n*.9}}apply(t){this.zone==="world"&&(this.pos.y=me(this.pos.y,j(this.pos.x,this.pos.z),16,t)),this.obj.position.copy(this.pos),this.obj.rotation.y=this.yaw;const e=this.state==="walk"?this.speedNow:0;this.char.setMode(this.state==="sit"?"sit":"idle"),this.char.update(t,e)}facePlayer(t,e){this.yaw=Math.atan2(t-this.pos.x,e-this.pos.z),this.obj.rotation.y=this.yaw}setPose(t){this.state=t}}class ux{constructor(t,e,n,i){this.list=[],this.byId={};for(const o of n){const r=new Sl(o,t,e,{});this.list.push(r),this.byId[o.id]=r}for(const o of i){const r=new Sl(o,t,e,{background:!0,scale:o.scale||1});r.id=o.id,this.list.push(r),this.byId[o.id]=r}}update(t,e){for(const n of this.list)n.update(t,e)}bestFacing(t,e,n,i,o=3.2,r="world"){let a=null,c=-1/0;for(const l of this.list){if(l.zone!==r)continue;const h=l.pos.x-t,d=l.pos.z-e,u=Math.hypot(h,d)||1e-4;if(u>o)continue;const f=(h*n+d*i)/u;if(f<-.2)continue;const p=f*1.6+(1-u/o);p>c&&(c=p,a=l)}return a}nearest(t,e,n=3.2,i="world"){let o=null,r=n;for(const a of this.list){if(a.zone!==i)continue;const c=Math.hypot(a.pos.x-t,a.pos.z-e);c<r&&(r=c,o=a)}return o}allInZone(t){return this.list.filter(e=>e.zone===t)}}const ui=[[0,10467048,.16,3818608,.56,ot.nightTop,ot.nightMid,ot.nightLow,1778496],[4.2,10467048,.16,3818608,.56,ot.nightTop,ot.nightMid,ot.nightLow,1778496],[5.4,16759178,.52,8024728,.8,4147840,13666962,16763296,10721966],[6.6,16765856,.92,11058384,.95,7645400,15908782,16769213,14207168],[8,16773848,1.12,13162728,.92,ot.skyTop,ot.skyMid,ot.skyLow,13886190],[12,16775404,1.22,13820658,.95,6531300,11129842,15134970,13624306],[16,16773328,1.1,13425386,.92,6990816,12376302,16180952,14082280],[17.8,16758903,.86,11050676,.8,5926824,15245705,16766632,14728104],[19.2,15764058,.42,6973584,.7,4015224,11561606,15245438,10126486],[20.6,9414876,.18,4081264,.58,1844304,4868722,8022664,3816024],[22,10467048,.16,3818608,.56,ot.nightTop,ot.nightMid,ot.nightLow,1778496],[24,10467048,.16,3818608,.56,ot.nightTop,ot.nightMid,ot.nightLow,1778496]];function Tl(s){let t=ui[0],e=ui[ui.length-1];for(let i=0;i<ui.length-1;i++)if(s>=ui[i][0]&&s<=ui[i+1][0]){t=ui[i],e=ui[i+1];break}const n=an(t[0],e[0],s);return{sunColor:Se(t[1],e[1],n),sunI:ft(t[2],e[2],n),ambColor:Se(t[3],e[3],n),ambI:ft(t[4],e[4],n),top:Se(t[5],e[5],n),mid:Se(t[6],e[6],n),low:Se(t[7],e[7],n),fog:Se(t[8],e[8],n)}}const fx=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.z = gl_Position.w;   // 永远在最远处
}`,px=`
uniform vec3 uTop, uMid, uLow, uSunColor, uSunDir;
uniform float uNight, uSunSize;
varying vec3 vDir;
void main() {
  float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 c = mix(uLow, uMid, smoothstep(0.42, 0.56, h));
  c = mix(c, uTop, smoothstep(0.55, 0.92, h));
  // 太阳光晕
  float d = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
  c += uSunColor * pow(d, 18.0) * 0.55;
  c += uSunColor * pow(d, 3.0) * 0.10 * (1.0 - uNight);
  // 地平线暖化
  c += uSunColor * 0.06 * (1.0 - smoothstep(0.48, 0.62, h)) * (1.0 - uNight);
  gl_FragColor = vec4(c, 1.0);
}`;class mx{constructor(t){this.scene=t;const e=new Pe(1,32,20);this.uniforms={uTop:{value:new Nt(ot.skyTop)},uMid:{value:new Nt(ot.skyMid)},uLow:{value:new Nt(ot.skyLow)},uSunColor:{value:new Nt(16774108)},uSunDir:{value:new D(0,1,0)},uNight:{value:0},uSunSize:{value:1}},this.mesh=new O(e,new Dn({vertexShader:fx,fragmentShader:px,uniforms:this.uniforms,side:Ze,depthWrite:!1,fog:!1})),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1e3,t.add(this.mesh),this.sunSprite=new O(new ms(14,24),new ki({color:16774880,transparent:!0,depthWrite:!1,fog:!1})),this.sunSprite.renderOrder=-999,t.add(this.sunSprite),this.moonSprite=new O(new ms(9,20),new ki({color:15265532,transparent:!0,depthWrite:!1,fog:!1})),this.moonSprite.renderOrder=-999,t.add(this.moonSprite);const n=ue(1337),i=900,o=new Float32Array(i*3),r=new Float32Array(i);for(let l=0;l<i;l++){const h=n()*xt,d=n()*.55+.02,u=d,f=Math.sqrt(1-d*d);o[l*3]=Math.cos(h)*f*320,o[l*3+1]=u*320,o[l*3+2]=Math.sin(h)*f*320,r[l]=1.2+n()*2.6}const a=new De;a.setAttribute("position",new Re(o,3)),a.setAttribute("aSize",new Re(r,1)),this.starMat=new Dn({uniforms:{uOpacity:{value:0}},vertexShader:`attribute float aSize; varying float vS;
        void main(){ vS=aSize; vec4 mv=modelViewMatrix*vec4(position,1.0);
        gl_Position=projectionMatrix*mv; gl_PointSize=aSize; }`,fragmentShader:`uniform float uOpacity; varying float vS;
        void main(){ vec2 d=gl_PointCoord-0.5; float a=smoothstep(0.5,0.1,length(d));
        gl_FragColor=vec4(vec3(1.0,0.98,0.92), a*uOpacity); }`,transparent:!0,depthWrite:!1,fog:!1}),this.stars=new Rh(a,this.starMat),this.stars.renderOrder=-998,this.stars.frustumCulled=!1,t.add(this.stars),this.buildClouds(),this.sun=new Dg(16774108,1.15),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048);const c=78;this.sun.shadow.camera.left=-c,this.sun.shadow.camera.right=c,this.sun.shadow.camera.top=c,this.sun.shadow.camera.bottom=-c,this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=320,this.sun.shadow.bias=-9e-4,this.sun.shadow.normalBias=.035,this.sunTarget=new ze,t.add(this.sun,this.sunTarget),this.sun.target=this.sunTarget,this.hemi=new Ih(13624306,8030826,.75),t.add(this.hemi),this.ambient=new Lg(16777215,.22),t.add(this.ambient),t.fog=new $a(13624306,120,440),this.state=Tl(12),this.nightT=0}buildClouds(){const t=ue(777);this.clouds=new Ct,this.clouds.name="clouds";const e=et(16645110),n=et(14212584);this.cloudMats=[e,n];for(let i=0;i<16;i++){const o=new Ct,r=3+Math.floor(t()*3),a=1+t()*1.6;for(let h=0;h<r;h++){const d=(4+t()*5)*a,u=new O(new Pe(d,8,6),t()<.3?n:e);u.position.set((h-r/2)*d*1.05,(t()-.5)*d*.45,(t()-.5)*d*.7),u.scale.y=.62,se(u,.012),o.add(u)}const c=t()*xt,l=130+t()*120;o.position.set(Math.cos(c)*l,62+t()*55,Math.sin(c)*l),o.userData.speed=.28+t()*.4,o.userData.ang=c,o.userData.rad=l,this.clouds.add(o)}this.scene.add(this.clouds)}update(t,e,n){const i=Tl(e);this.state=i;const o=Ge(1-an(.16,.52,i.sunI));this.nightT=me(this.nightT,o,4,t);const r=(e-6)/12*Math.PI,a=Math.sin(r),c=Math.cos(r),l=new D(c*.85,Math.max(a,-.25),-.35).normalize(),h=n.x,d=n.y,u=n.z;this.uniforms.uTop.value.setHex(i.top),this.uniforms.uMid.value.setHex(i.mid),this.uniforms.uLow.value.setHex(i.low),this.uniforms.uSunColor.value.setHex(i.sunColor),this.uniforms.uSunDir.value.copy(l),this.uniforms.uNight.value=o,this.mesh.position.set(h,d,u),this.mesh.scale.setScalar(500),this.sunSprite.position.set(h+l.x*300,d+Math.max(.02,a)*300,u+l.z*300),this.sunSprite.lookAt(h,d,u),this.sunSprite.material.color.setHex(i.sunI>.3?16774880:14673663),this.sunSprite.material.opacity=Ge(an(.05,.35,i.sunI)*.95),this.sunSprite.scale.setScalar(ft(.8,1.15,Ge(i.sunI)));const f=new D(-l.x,Math.max(-a,.2),-l.z).normalize();this.moonSprite.position.set(h+f.x*300,d+Math.max(.05,-a)*300,u+f.z*300),this.moonSprite.lookAt(h,d,u),this.moonSprite.material.opacity=Ge(o*.9),this.stars.position.set(h,d,u),this.starMat.uniforms.uOpacity.value=o*.95,this.stars.visible=!this.indoor&&o>.02,this.sunSprite.visible=!this.indoor,this.moonSprite.visible=!this.indoor,this.clouds.visible=!this.indoor,this.sun.color.setHex(i.sunColor),this.sun.intensity=i.sunI,this.sun.position.set(h+l.x*110,d+Math.max(a,.12)*110,u+l.z*110),this.sunTarget.position.set(h,0,u),this.hemi.color.setHex(i.mid),this.hemi.groundColor.setHex(Se(8030826,i.fog,.35)),this.hemi.intensity=i.ambI*1,this.ambient.color.setHex(i.ambColor),this.ambient.intensity=i.ambI*.42,this.indoor&&(this.sun.intensity=.06,this.hemi.intensity=.3,this.hemi.color.setHex(15920348),this.hemi.groundColor.setHex(10129536),this.ambient.intensity=.2,this.ambient.color.setHex(16773856)),this.indoor?(this.scene.fog.color.setHex(3817556),this.scene.fog.near=20,this.scene.fog.far=70):(this.scene.fog.color.setHex(i.fog),this.scene.fog.near=120,this.scene.fog.far=440-o*90);for(const x of this.clouds.children)x.userData.ang+=t*x.userData.speed*.004,x.position.x=Math.cos(x.userData.ang)*x.userData.rad,x.position.z=Math.sin(x.userData.ang)*x.userData.rad;const p=Ge(1-Math.abs(i.sunI-.7)/.5);this.cloudMats[0].color.setHex(Se(16645110,16763296,p*.55)),this.cloudMats[1].color.setHex(Se(14212584,14065832,p*.6))}}const Gr=new Map;function fn(s,t){const e=document.createElement("canvas");return e.width=s,e.height=t,e}function pn(s,{repeat:t=[1,1],wrap:e=!0,aniso:n=4,srgb:i=!0,nearest:o=!1}={}){const r=new dg(s);return r.wrapS=r.wrapT=e?$n:pi,r.repeat.set(t[0],t[1]),r.anisotropy=n,i&&(r.colorSpace=dn),o&&(r.magFilter=Ke,r.minFilter=Ke),r.needsUpdate=!0,r}function mn(s,t){if(Gr.has(s))return Gr.get(s);const e=t();return Gr.set(s,e),e}function sn(s,t,e,n){s.fillStyle=n,s.fillRect(0,0,t,e)}function er(s,t,e,n,i,o,r=1.6){for(let a=0;a<n;a++){s.fillStyle=i[Math.floor(o()*i.length)];const c=r*(.4+o()*1.2);s.fillRect(o()*t,o()*e,c,c)}}function gx(s=ot.wallWood,t=8,e=!1){return mn(`siding${s}${t}${e}`,()=>{const o=fn(256,256),r=o.getContext("2d"),a=ue(s%9973+t);sn(r,256,256,It(s));const c=256/t;for(let l=0;l<t;l++){const h=l*c,d=ve(s,(a()-.45)*.16);r.fillStyle=It(d),r.fillRect(0,h,256,c-1),r.strokeStyle=It(ve(s,-.12)),r.globalAlpha=.35,r.lineWidth=1;for(let u=0;u<5;u++){r.beginPath();const f=h+3+a()*(c-6);r.moveTo(0,f),r.bezierCurveTo(256*.3,f+(a()-.5)*3,256*.7,f+(a()-.5)*3,256,f),r.stroke()}r.globalAlpha=1,r.fillStyle=It(ve(s,-.3)),r.globalAlpha=.5,r.fillRect(0,h+c-2,256,2),r.globalAlpha=1}return pn(o,{repeat:[1,1]})})}function xx(s=ot.roofTile){return mn(`roof${s}`,()=>{const n=fn(256,256),i=n.getContext("2d"),o=ue(4242);sn(i,256,256,It(s));const r=8,a=10,c=256/r,l=256/a;for(let h=0;h<r;h++)for(let d=-1;d<=a;d++){const u=d*l+(h%2?l*.5:0),f=h*c,p=ve(s,(o()-.5)*.2);i.fillStyle=It(p),i.beginPath(),i.moveTo(u,f+c),i.lineTo(u,f+c*.35),i.quadraticCurveTo(u+l*.5,f-c*.2,u+l,f+c*.35),i.lineTo(u+l,f+c),i.closePath(),i.fill(),i.strokeStyle=It(ve(s,-.34)),i.lineWidth=1.4,i.stroke(),i.strokeStyle=It(ve(s,.24)),i.lineWidth=1,i.beginPath(),i.moveTo(u+l*.2,f+c*.7),i.quadraticCurveTo(u+l*.5,f+c*.2,u+l*.8,f+c*.7),i.stroke()}return pn(n,{repeat:[1,1]})})}function El(s=ot.asphalt,t=!1){return mn(`asphalt${s}${t}`,()=>{const i=fn(256,256),o=i.getContext("2d"),r=ue(777+s);sn(o,256,256,It(s)),er(o,256,256,2600,[It(ve(s,.18)),It(ve(s,-.2)),It(ve(s,.08))],r,1.7),o.globalAlpha=.12;for(let a=0;a<14;a++)o.fillStyle=It(ve(s,-.35)),o.beginPath(),o.ellipse(r()*256,r()*256,12+r()*40,6+r()*16,r()*3,0,7),o.fill();return o.globalAlpha=1,t&&(o.strokeStyle=It(ot.cream),o.lineWidth=6,o.setLineDash([34,30]),o.beginPath(),o.moveTo(256/2,0),o.lineTo(256/2,256),o.stroke(),o.setLineDash([])),pn(i,{repeat:[1,1]})})}function _x(s=ot.concrete){return mn(`conc${s}`,()=>{const n=fn(128,128),i=n.getContext("2d"),o=ue(s%631);return sn(i,128,128,It(s)),er(i,128,128,900,[It(ve(s,.12)),It(ve(s,-.12))],o,1.4),pn(n)})}function Ao(s="day"){return mn(`win${s}`,()=>{const n=fn(128,128),i=n.getContext("2d"),o=ue(313+s.length*17),r=It(ot.cream);sn(i,128,128,r);const a=i.createLinearGradient(0,12,0,116);if(s==="night"?(a.addColorStop(0,It(ot.windowLit)),a.addColorStop(1,It(ve(ot.windowLit,-.35)))):(a.addColorStop(0,It(ve(ot.window,.35))),a.addColorStop(1,It(ve(ot.window,-.2)))),i.fillStyle=a,i.fillRect(9,9,110,110),s==="lit"&&(i.fillStyle="rgba(120,80,50,.5)",i.fillRect(20,82,26,36),i.fillStyle="rgba(60,50,40,.45)",i.fillRect(76,94,34,24)),s==="curtain"||s==="lit"){i.fillStyle="rgba(250,240,235,.92)";const c=26;i.beginPath(),i.moveTo(9,9);for(let l=9;l<=9+c;l+=4)i.lineTo(l,9+Math.sin(l*.9)*3);i.lineTo(9+c,40),i.lineTo(9,34),i.fill(),i.beginPath(),i.moveTo(119-c,9);for(let l=0;l<=c;l+=4)i.lineTo(119-c+l,9+Math.sin(l*.9+1)*3);i.lineTo(119,34),i.lineTo(119-c,40),i.fill()}return i.globalAlpha=.28,i.fillStyle="#ffffff",i.beginPath(),i.moveTo(14,112),i.lineTo(84,14),i.lineTo(104,14),i.lineTo(34,112),i.fill(),i.globalAlpha=1,er(i,128,128,90,["rgba(255,255,255,.10)"],o,2),i.strokeStyle=It(ot.cream),i.lineWidth=6,i.strokeRect(9,9,110,110),i.lineWidth=4,i.beginPath(),i.moveTo(128/2,9),i.lineTo(128/2,119),i.stroke(),i.beginPath(),i.moveTo(9,128/2),i.lineTo(119,128/2),i.stroke(),i.strokeStyle="rgba(90,70,60,.35)",i.lineWidth=1.5,i.strokeRect(1,1,126,126),pn(n)})}function Pn(s={}){const{text:t="",sub:e="",bg:n=ot.cream,fg:i=ot.ink||2894387,accent:o=ot.red,vertical:r=!1,w:a=512,h:c=256,bgImage:l="paper",border:h=!0,font:d=700,size:u=96,subSize:f=30,fontFamily:p='"Zen Kaku Gothic New", "Noto Sans SC", sans-serif',key:x=""}=s,g=`sign${x||t+e+n+r+a+c+l}`;return mn(g,()=>{const m=fn(a,c),_=m.getContext("2d"),b=ue(t.length*131+a);if(l==="wood"){sn(_,a,c,It(n));for(let y=0;y<40;y++)_.strokeStyle=It(ve(n,-.14+b()*.2)),_.globalAlpha=.5,_.lineWidth=1+b()*2,_.beginPath(),_.moveTo(0,b()*c),_.lineTo(a,b()*c),_.stroke();_.globalAlpha=1}else if(l==="metal"){const y=_.createLinearGradient(0,0,0,c);y.addColorStop(0,It(ve(n,.16))),y.addColorStop(.5,It(n)),y.addColorStop(1,It(ve(n,-.2))),_.fillStyle=y,_.fillRect(0,0,a,c),_.globalAlpha=.08;for(let A=0;A<c;A+=3)_.fillStyle=A%6?"#000":"#fff",_.fillRect(0,A,a,1);_.globalAlpha=1}else if(l==="night")sn(_,a,c,It(ve(n,-.6)));else{sn(_,a,c,It(n));const y=_.createLinearGradient(0,0,0,c);y.addColorStop(0,"rgba(255,255,255,.14)"),y.addColorStop(1,"rgba(0,0,0,.05)"),_.fillStyle=y,_.fillRect(0,0,a,c),_.globalAlpha=.05,er(_,a,c,700,["#000","#fff"],b,1.6),_.globalAlpha=1}if(h&&(_.strokeStyle=It(o),_.lineWidth=Math.max(3,c*.035),_.strokeRect(_.lineWidth,_.lineWidth,a-_.lineWidth*2,c-_.lineWidth*2)),_.textAlign="center",_.textBaseline="middle",_.fillStyle=It(i),r){const y=[...t],A=c*.82/y.length;_.font=`${d} ${Math.min(u,A*.86)}px ${p}`,y.forEach((w,R)=>{_.fillText(w,a/2,c*.09+A*(R+.5))}),e&&(_.font=`400 ${f}px ${p}`,_.fillStyle=It(o),_.fillText(e,a/2,c*.95))}else _.font=`${d} ${u}px ${p}`,_.fillText(t,a/2,e?c*.42:c*.5),e&&(_.font=`400 ${f}px ${p}`,_.fillStyle=It(o),_.fillText(e,a/2,c*.78));return pn(m)})}function vx(s,t=ot.red,e=16775150){const i=128*Math.max(2,[...s].length)*.72;return Pn({text:s,bg:t,fg:e,vertical:!0,w:128,h:Math.round(i),size:74,subSize:20,bgImage:"paper",border:!1,fontFamily:'"Zen Kaku Gothic New", serif',key:"v"+s+t})}function Al(s="festival"){return mn(`poster${s}`,()=>{const n=fn(256,384),i=n.getContext("2d"),o=ue(s.length*733+5),r={festival:[ot.sakura,ot.cream,ot.red],shop:[ot.cream,ot.woodBeige,ot.redDeep],town:[ot.wallTileBlue,ot.cream,ot.blue],rail:[ot.cream,ot.silver,ot.blue]},[a,c,l]=r[s]||r.festival;sn(i,256,384,It(c)),i.fillStyle=It(a),i.fillRect(0,0,256,92),i.textAlign="center",i.textBaseline="middle";const h={festival:"桜まつり",shop:"本日 特売",town:"町 内 だ よ り",rail:"運 転 お 知 ら せ"};i.fillStyle=It(s==="festival"?6960464:16777215),i.font='700 46px "Zen Kaku Gothic New", serif',i.fillText(h[s]||"おしらせ",256/2,48),i.fillStyle="rgba(60,50,60,.62)";for(let d=0;d<11;d++){const u=256*(.4+o()*.45);i.fillRect(28,130+d*22,u,7)}i.fillStyle=It(l),i.globalAlpha=.85;for(let d=0;d<5;d++)i.beginPath(),i.arc(24+o()*208,120+o()*184,8+o()*16,0,7),i.fill();return i.globalAlpha=1,i.strokeStyle="rgba(120,100,90,.35)",i.lineWidth=2,i.strokeRect(1,1,254,382),pn(n)})}function Yh(){return mn("timetable",()=>{const e=fn(384,512),n=e.getContext("2d");sn(n,384,512,"#fbf6ea"),n.fillStyle=It(ot.blue),n.fillRect(0,0,384,74),n.fillStyle="#fff",n.textAlign="center",n.textBaseline="middle",n.font='700 42px "Zen Kaku Gothic New", sans-serif',n.fillText("桜 町 駅",384/2,38),n.fillStyle=It(ot.ink||2894387),n.font='500 24px "Zen Kaku Gothic New", sans-serif',n.textAlign="left",n.fillText("普通  上り",22,104),n.fillText("普通  下り",22,296);const i=[["6:12","町田"],["7:04","青葉"],["7:38","日向台"],["8:20","城東"],["9:05","青葉"],["9:47","町田"],["10:30","日向台"]];return n.font='400 21px "Zen Kaku Gothic New", sans-serif',i.forEach((r,a)=>{const c=138+a*22;n.fillStyle="rgba(60,50,60,.75)",n.fillText(r[0],26,c),n.fillText("● "+r[1],140,c),n.strokeStyle="rgba(120,100,90,.2)",n.beginPath(),n.moveTo(20,c+11),n.lineTo(364,c+11),n.stroke()}),n.fillStyle="rgba(60,50,60,.75)",n.font='400 21px "Zen Kaku Gothic New", sans-serif',[["11:12","青葉"],["12:30","町田"],["13:08","日向台"],["14:22","城東"],["15:40","青葉"],["17:03","町田"],["18:26","日向台"]].forEach((r,a)=>{const c=330+a*22;n.fillText(r[0],26,c),n.fillText("● "+r[1],140,c),n.strokeStyle="rgba(120,100,90,.2)",n.beginPath(),n.moveTo(20,c+11),n.lineTo(364,c+11),n.stroke()}),n.fillStyle=It(ot.red),n.fillRect(20,468,344,3),pn(e)})}function yx(){return mn("tatami",()=>{const e=fn(256,256),n=e.getContext("2d"),i=ue(9182);sn(n,256,256,It(ot.tatami));for(let o=0;o<256;o+=4)n.fillStyle=It(ve(ot.tatami,o%8===0?.06:-.05)),n.fillRect(0,o,256,2);n.fillStyle=It(ve(ot.tatami,-.35)),n.fillRect(0,0,6,256),n.fillRect(250,0,6,256),n.globalAlpha=.12;for(let o=0;o<40;o++)n.fillStyle=It(ve(ot.tatami,-.3)),n.fillRect(i()*256,i()*256,18,1.5);return n.globalAlpha=1,pn(e,{repeat:[1,1]})})}function Mx(){return mn("floorwood",()=>{const e=fn(256,256),n=e.getContext("2d"),i=ue(6611);sn(n,256,256,It(ot.floorWood));const o=6,r=256/o;for(let a=0;a<o;a++){const c=a*r;n.fillStyle=It(ve(ot.floorWood,(i()-.5)*.14)),n.fillRect(0,c,256,r-1),n.strokeStyle=It(ve(ot.floorWood,-.28)),n.lineWidth=1.4,n.globalAlpha=.6,n.beginPath(),n.moveTo(0,c+r-1.5),n.lineTo(256,c+r-1.5),n.stroke();const l=a*71%128+64;n.beginPath(),n.moveTo(l,c),n.lineTo(l,c+r),n.stroke(),n.globalAlpha=.18;for(let h=0;h<6;h++){n.strokeStyle=It(ve(ot.floorWood,-.2)),n.beginPath();const d=c+3+i()*(r-6);n.moveTo(0,d),n.bezierCurveTo(256*.35,d+(i()-.5)*2,256*.7,d+(i()-.5)*2,256,d),n.stroke()}n.globalAlpha=1}return pn(e,{repeat:[1,1]})})}function bx(){return mn("tilefloor",()=>{const e=fn(256,256),n=e.getContext("2d"),i=ue(3311);sn(n,256,256,It(ot.floorTile));const o=4,r=256/o;for(let a=0;a<o;a++)for(let c=0;c<o;c++)n.fillStyle=It(ve(ot.floorTile,(i()-.5)*.05)),n.fillRect(c*r+1,a*r+1,r-2,r-2),n.strokeStyle=It(ve(ot.floorTile,-.14)),n.lineWidth=2,n.strokeRect(c*r,a*r,r,r);n.globalAlpha=.06;for(let a=0;a<500;a++)n.fillStyle="#6a5a4a",n.fillRect(i()*256,i()*256,1.6,1.6);return n.globalAlpha=1,pn(e,{repeat:[1,1]})})}function wx(s="beverage"){return mn(`vend${s}`,()=>{const n=fn(256,512),i=n.getContext("2d"),o=ue(s==="beverage"?5150:2277);sn(i,256,512,"#f4f6f8"),i.fillStyle="#2a3340",i.fillRect(14,20,228,250);const r=4,a=5,c=222/a,l=250/r,h=s==="beverage"?["#e24a4a","#3f7fc0","#f0b83c","#57a860","#d47ab0","#8a6bc4","#e88b3a","#4fb0b8","#c85a3a","#6a8f3a"]:["#d94a4a","#3f6fbf","#f2c94c","#3fa860","#c04a86"];for(let d=0;d<r;d++){i.fillStyle="#8fb8c8",i.fillRect(18,24+d*l,220,l-6);for(let u=0;u<a;u++){const f=20+u*c,p=26+d*l;i.fillStyle=h[Math.floor(o()*h.length)];const x=c*.62,g=l*.66;i.fillRect(f+(c-x)/2,p+3,x,g),i.fillStyle="rgba(255,255,255,.4)",i.fillRect(f+(c-x)/2,p+3,x*.22,g),i.fillStyle="rgba(0,0,0,.25)",i.fillRect(f+(c-x)/2,p+3+g*.55,x,g*.16)}i.fillStyle="#5c6b7a",i.fillRect(18,24+d*l+l-8,220,4)}i.globalAlpha=.16,i.fillStyle="#fff",i.beginPath(),i.moveTo(20,270),i.lineTo(96,20),i.lineTo(126,20),i.lineTo(50,270),i.fill(),i.globalAlpha=1,i.fillStyle="#e8eef2",i.fillRect(14,282,228,216);for(let d=0;d<4;d++)for(let u=0;u<5;u++){const f=22+u*42.4,p=292+d*50;i.fillStyle="#ff5a4a",i.beginPath(),i.arc(f+16,p+16,11,0,7),i.fill(),i.fillStyle="#2b3a46",i.font="600 13px sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText("¥130",f+16,p+36)}return i.fillStyle="#39424e",i.fillRect(20,470,216,32),i.fillStyle="#161c22",i.fillRect(26,476,204,20),pn(n)})}function Rl(s="snack"){return mn(`shelf${s}`,()=>{const n=fn(256,128),i=n.getContext("2d"),o=ue(s.length*313+17);sn(i,256,128,"#f7f7f2"),i.fillStyle="#c9cdd2",i.fillRect(0,118,256,10);const r=9;for(let a=0;a<r;a++){const c=a*(256/r)+2,l=[["#e8a94c","#d4553f","#5aa06a","#4a7fb5","#d78bb0"],["#7fb5a0","#c96a4a","#e0c14b","#6a8fc4","#b06ab0"]][s==="coffee"?1:0];i.fillStyle=l[Math.floor(o()*l.length)],i.fillRect(c,30,256/r-5,80),i.fillStyle="rgba(255,255,255,.35)",i.fillRect(c,30,256/r-5,10),i.fillStyle="rgba(0,0,0,.18)",i.fillRect(c,98,256/r-5,12)}return i.fillStyle="rgba(70,60,50,.14)",i.fillRect(0,0,256,30),pn(n)})}function $h(){return mn("gravel",()=>{const e=fn(128,128),n=e.getContext("2d"),i=ue(8123);sn(n,128,128,It(ot.gravel));for(let o=0;o<1400;o++){const r=1.4+i()*2.6;n.fillStyle=It(ve(ot.gravel,(i()-.5)*.4)),n.beginPath(),n.ellipse(i()*128,i()*128,r,r*.7,i()*3,0,7),n.fill()}return pn(e,{repeat:[1,1]})})}const Bo=.035;function Cl(s,t,e,n=.18,i=j){const o=[];for(let u=0;u<s.length-1;u++){const[f,p]=s[u],[x,g]=s[u+1],m=Math.hypot(x-f,g-p),_=Math.max(1,Math.ceil(m/2.5));for(let b=0;b<_;b++){const y=b/_;o.push([ft(f,x,y),ft(p,g,y)])}}o.push([s[s.length-1][0],s[s.length-1][1]]);const r=t/2,a=[],c=[],l=[];let h=0;for(let u=0;u<o.length;u++){const[f,p]=o[u],x=o[Math.max(0,u-1)],g=o[Math.min(o.length-1,u+1)];let m=g[0]-x[0],_=g[1]-x[1];const b=Math.hypot(m,_)||1;m/=b,_/=b,u>0&&(h+=Math.hypot(f-o[u-1][0],p-o[u-1][1]));const y=i(f,p)+e;if(a.push(f-_*r,y,p+m*r),a.push(f+_*r,y,p-m*r),c.push(0,h*n,t*n,h*n),u<o.length-1){const A=u*2;l.push(A,A+2,A+1,A+1,A+2,A+3)}}const d=new De;return d.setAttribute("position",new re(a,3)),d.setAttribute("uv",new re(c,2)),d.setIndex(l),d.computeVertexNormals(),d}const jh=[];function Sx(s){for(const t of jh)t.userData._dry||(t.userData._dry=t.color.clone()),t.color.copy(t.userData._dry).multiplyScalar(1-s*.34),t.emissive.setRGB(s*.035,s*.04,s*.05)}function Pl(s){const t=n=>(jh.push(n),n);if(s==="asphalt"){const n=El().clone();return n.needsUpdate=!0,n.wrapS=n.wrapT=$n,n.repeat.set(1,1),t(new Kn({map:n,color:16777215,gradientMap:mi()}))}if(s==="local"){const n=El(ot.asphaltLight).clone();return n.needsUpdate=!0,n.wrapS=n.wrapT=$n,t(new Kn({map:n,color:15921386,gradientMap:mi()}))}if(s==="gravel"){const n=$h().clone();return n.needsUpdate=!0,n.wrapS=n.wrapT=$n,n.repeat.set(2,2),t(new Kn({map:n,color:16777215,gradientMap:mi()}))}const e=_x().clone();return e.needsUpdate=!0,e.wrapS=e.wrapT=$n,e.repeat.set(1.5,1.5),t(new Kn({map:e,color:16184300,gradientMap:mi()}))}function Tx(s,t,e=16643800,n=2.2,i=2.4,o=.06){const r=[];for(let a=0;a<s.length-1;a++){const[c,l]=s[a],[h,d]=s[a+1],u=Math.hypot(h-c,d-l),f=(h-c)/u,p=(d-l)/u;for(let x=0;x<u;x+=n+i){const g=c+f*(x+n/2),m=l+p*(x+n/2),_=new Me(t,n);_.rotateX(-Math.PI/2),_.rotateY(Math.atan2(f,p)),_.translate(g,j(g,m)+o,m),r.push(_)}}return r}function Vr(s){if(!s.length)return null;let t=0,e=0;for(const h of s)t+=h.attributes.position.count,e+=h.index?h.index.count:0;const n=new Float32Array(t*3),i=new Float32Array(t*3),o=new Float32Array(t*2),r=new Uint32Array(e);let a=0,c=0;for(const h of s){const d=h.attributes.position,u=h.attributes.normal,f=h.attributes.uv;for(let x=0;x<d.count;x++)n[(a+x)*3]=d.getX(x),n[(a+x)*3+1]=d.getY(x),n[(a+x)*3+2]=d.getZ(x),i[(a+x)*3]=u.getX(x),i[(a+x)*3+1]=u.getY(x),i[(a+x)*3+2]=u.getZ(x),o[(a+x)*2]=f.getX(x),o[(a+x)*2+1]=f.getY(x);const p=h.index.array;for(let x=0;x<p.length;x++)r[c+x]=p[x]+a;a+=d.count,c+=p.length,h.dispose()}const l=new De;return l.setAttribute("position",new Re(n,3)),l.setAttribute("normal",new Re(i,3)),l.setAttribute("uv",new Re(o,2)),l.setIndex(new Re(r,1)),l}function Zh(){const s=new Ct;s.name="roads";for(const i of qs){if(i.bridge)continue;const o=Cl(i.pts,i.width,Bo,i.type==="asphalt"?.16:.24),r=new O(o,Pl(i.type));if(r.receiveShadow=!0,r.name="road-"+i.id,s.add(r),i.sidewalk)for(const a of[-1,1]){const c=Dl(i.pts,(i.width/2+1.3)*a),l=Cl(c,2.6,.16,.3),h=new O(l,Pl("path"));h.receiveShadow=!0,s.add(h);const d=Dl(i.pts,i.width/2*a),u=Ex(d);s.add(new O(u,et(14209732)))}if(i.id==="main"){const a=Vr(Tx(i.pts,.22));a&&s.add(new O(a,Li(ot.cream)))}}s.add(new O(Vr(Ll(Ie.x,Ie.z+6.6,7.4,3.4)),Li(16184036))),s.add(new O(Vr(Ll(Ie.x,Ie.z-6.6,7.4,3.4)),Li(16184036)));const t=jt.zAt(Ie.x),e=new Me(9.6,7.2);e.rotateX(-Math.PI/2),e.translate(Ie.x,j(Ie.x,t)+Bo+.005,t);const n=new O(e,et(8224648));s.add(n);for(const i of[-1,1]){const o=new Me(9.6,3.2);o.rotateX(-Math.PI/2),o.translate(Ie.x,j(Ie.x,t+i*5.2)+Bo,t+i*5.2),s.add(new O(o,et(7698303)))}return s.add(Ax()),s}function Dl(s,t){const e=[];for(let n=0;n<s.length;n++){const i=s[Math.max(0,n-1)],o=s[Math.min(s.length-1,n+1)];let r=o[0]-i[0],a=o[1]-i[1];const c=Math.hypot(r,a)||1;r/=c,a/=c,e.push([s[n][0]-a*t,s[n][1]+r*t])}return e}function Ex(s){const t=[],e=[],n=[];for(let o=0;o<s.length-1;o++){const[r,a]=s[o],[c,l]=s[o+1],h=Math.hypot(c-r,l-a),d=Math.max(1,Math.ceil(h/2.5));for(let u=0;u<d;u++)n.push([ft(r,c,u/d),ft(a,l,u/d)])}n.push(s[s.length-1]);for(let o=0;o<n.length;o++){const[r,a]=n[o],c=j(r,a);if(t.push(r,c+.18,a),t.push(r,c-.15,a),o<n.length-1){const l=o*2;e.push(l,l+2,l+1,l+1,l+2,l+3)}}const i=new De;return i.setAttribute("position",new re(t,3)),i.setIndex(e),i.computeVertexNormals(),i}function Ll(s,t,e,n){const i=[],r=e/13;for(let a=0;a<7;a++){const c=s-e/2+r*.5+a*r*2,l=new Me(r,n);l.rotateX(-Math.PI/2),l.translate(c,j(c,t)+Bo+.02,t),i.push(l)}return i}function Ax(){const s=new Ct;s.name="bridge";const t=[60,6],e=[73,2],n=(t[0]+e[0])/2,i=(t[1]+e[1])/2,o=Math.hypot(e[0]-t[0],e[1]-t[1]),r=j(t[0],t[1])+.18,a=Math.atan2(e[0]-t[0],e[1]-t[1]),c=wo(4.2,.22,o+1.6),l=new O(c,et(11047032));l.position.set(n,r,i),l.rotation.y=a,l.castShadow=!0,l.receiveShadow=!0,s.add(l);for(const h of[-1,1]){for(let f=0;f<=6;f++){const p=f/6,x=ft(t[0],e[0],p)+Math.cos(a)*0*h,g=ft(t[1],e[1],p),m=-Math.sin(a),_=Math.cos(a),b=new O(wo(.14,.9,.14),et(ot.wallWoodDark));b.position.set(x+m*1.95*h,r+.5,g+_*1.95*h),s.add(b)}const d=new O(wo(.1,.12,o+1.2),et(ot.wallWoodDark));d.position.set(n+-Math.sin(a)*1.95*h,r+.9,i+Math.cos(a)*1.95*h),d.rotation.y=a,s.add(d);const u=d.clone();u.position.y=r+.5,s.add(u)}for(const h of[.35,.65]){const d=ft(t[0],e[0],h),u=ft(t[1],e[1],h),f=new O(wo(1.1,4.5,1.1),et(10130308));f.position.set(d,r-2.3,u),f.rotation.y=a,s.add(f)}return s}const za=[];function Kh(){za.length=0;for(const s of qs){const t=s.pts;for(let e=0;e<t.length-1;e++){const[n,i]=t[e],[o,r]=t[e+1],a=Math.hypot(o-n,r-i),c=Math.max(1,Math.round(a/6));for(let l=0;l<c;l++)za.push({ax:ft(n,o,l/c),az:ft(i,r,l/c),bx:ft(n,o,(l+1)/c),bz:ft(i,r,(l+1)/c),hw:s.width/2,id:s.id})}}}function Ua(s,t){let e=1e9;for(const n of za){const i=nc(s,t,n.ax,n.az,n.bx,n.bz);i.d<e&&(e=i.d)}return e}function He(s,t){const e=s.count;for(let n=0;n<t.p.length;n++)s.p.push(t.p[n]);for(let n=0;n<t.n.length;n++)s.n.push(t.n[n]);for(let n=0;n<t.u.length;n++)s.u.push(t.u[n]);for(let n=0;n<t.i.length;n++)s.i.push(t.i[n]+e)}class z{constructor(){this.p=[],this.n=[],this.u=[],this.i=[]}get count(){return this.p.length/3}vert(t,e,n,i,o,r,a,c){return this.p.push(t,e,n),this.n.push(i,o,r),this.u.push(a,c),this.count-1}tri(t,e,n){this.i.push(t,e,n)}quad(t,e,n,i){this.i.push(t,e,n,t,n,i)}addQuad(t,e,n,i,o,r,a,c,l,h,d,u,f=1,p=1){const x=i-t,g=o-e,m=r-n,_=h-t,b=d-e,y=u-n;let A=g*y-m*b,w=m*_-x*y,R=x*b-g*_;const E=Math.hypot(A,w,R)||1;A/=E,w/=E,R/=E;const v=Math.hypot(x,g,m)*f,M=Math.hypot(_,b,y)*p,C=this.vert(t,e,n,A,w,R,0,0),L=this.vert(i,o,r,A,w,R,v,0),I=this.vert(a,c,l,A,w,R,v,M),H=this.vert(h,d,u,A,w,R,0,M);return this.quad(C,L,I,H),this}addTri(t,e,n,i,o,r,a,c,l,h=1,d=1){const u=i-t,f=o-e,p=r-n,x=a-t,g=c-e,m=l-n;let _=f*m-p*g,b=p*x-u*m,y=u*g-f*x;const A=Math.hypot(_,b,y)||1;_/=A,b/=A,y/=A;const w=Math.hypot(u,f,p)*h,R=Math.hypot(x,g,m)*d,E=this.vert(t,e,n,_,b,y,0,0),v=this.vert(i,o,r,_,b,y,w,0),M=this.vert(a,c,l,_,b,y,w,R);this.tri(E,v,M)}cyl(t,e,n,i,o,r,a=8,c=!0,l=1){const h=this.count;for(let d=0;d<=a;d++){const u=d/a*Math.PI*2,f=Math.cos(u),p=Math.sin(u),x=(o-i)/r;let g=f,m=x,_=p;const b=Math.hypot(g,m,_)||1;this.vert(t+f*i,e+r/2,n+p*i,g/b,m/b,_/b,d/a*l*4,0),this.vert(t+f*o,e-r/2,n+p*o,g/b,m/b,_/b,d/a*l*4,r*l)}for(let d=0;d<a;d++){const u=h+d*2;this.quad(u,u+2,u+3,u+1)}if(c)for(const[d,u,f]of[[e+r/2,i,1],[e-r/2,o,-1]]){if(u<=1e-4)continue;const p=this.vert(t,d,n,0,f,0,.5,.5),x=[];for(let g=0;g<=a;g++){const m=g/a*Math.PI*2;x.push(this.vert(t+Math.cos(m)*u,d,n+Math.sin(m)*u,0,f,0,.5+Math.cos(m)*.5,.5+Math.sin(m)*.5))}for(let g=0;g<a;g++)f>0?this.tri(p,x[g],x[g+1]):this.tri(p,x[g+1],x[g])}return this}sphere(t,e,n,i,o=1,r=0,a=0){const c=new tc(i,o),l=c.attributes.position,h=c.attributes.normal,d=c.attributes.uv,u=this.count;for(let f=0;f<l.count;f++){let p=l.getX(f),x=l.getY(f),g=l.getZ(f);if(r>0){const _=1+Math.sin(p*2.3+a)*Math.cos(g*1.9-a)*Math.sin(x*2.7+1.1)*r;p*=_,x*=_,g*=_}this.vert(t+p,e+x,n+g,h.getX(f),h.getY(f),h.getZ(f),d.getX(f),d.getY(f))}for(let f=0;f<l.count;f+=3)this.tri(u+f,u+f+1,u+f+2);return c.dispose(),this}ring(t,e,n,i,o,r=12){const a=this.count;for(let c=0;c<=r;c++){const l=c/r*Math.PI*2,h=Math.cos(l),d=Math.sin(l);this.vert(t+h*o,e,n+d*o,0,1,0,c/r,0),this.vert(t+h*i,e,n+d*i,0,1,0,c/r,1)}for(let c=0;c<r;c++){const l=a+c*2;this.quad(l,l+2,l+3,l+1)}return this}box(t,e,n,i,o,r,a=.5,c=.5){const l=t-i/2,h=t+i/2,d=e-o/2,u=e+o/2,f=n-r/2,p=n+r/2;return this.addQuad(l,d,p,h,d,p,h,u,p,l,u,p,i*a,o*c),this.addQuad(h,d,f,l,d,f,l,u,f,h,u,f,i*a,o*c),this.addQuad(l,d,f,l,d,p,l,u,p,l,u,f,r*a,o*c),this.addQuad(h,d,p,h,d,f,h,u,f,h,u,p,r*a,o*c),this.addQuad(l,u,p,h,u,p,h,u,f,l,u,f,i*a,r*c),this.addQuad(l,d,f,h,d,f,h,d,p,l,d,p,i*a,r*c),this}applyMatrix(t){return this.p=this._apply(this.p,t,3),this.n=this._normals(this.n,t),this}_apply(t,e,n){const i=new Array(t.length),o=e.elements;for(let r=0;r<t.length;r+=n){const a=t[r],c=t[r+1],l=t[r+2];i[r]=o[0]*a+o[4]*c+o[8]*l+o[12],i[r+1]=o[1]*a+o[5]*c+o[9]*l+o[13],i[r+2]=o[2]*a+o[6]*c+o[10]*l+o[14]}return i}_normals(t,e){const n=new Array(t.length),i=e.elements;for(let o=0;o<t.length;o+=3){const r=t[o],a=t[o+1],c=t[o+2];let l=i[0]*r+i[4]*a+i[8]*c,h=i[1]*r+i[5]*a+i[9]*c,d=i[2]*r+i[6]*a+i[10]*c;const u=Math.hypot(l,h,d)||1;n[o]=l/u,n[o+1]=h/u,n[o+2]=d/u}return n}toGeometry(){const t=new De;return t.setAttribute("position",new re(this.p,3)),t.setAttribute("normal",new re(this.n,3)),t.setAttribute("uv",new re(this.u,2)),t.setIndex(this.i),t.computeBoundingSphere(),t}isEmpty(){return this.i.length===0}}function Rx(s,t,e,n,i=.6,o=0,r=.7){const a=t/2+i,c=e/2+i,l=o+n;s.addQuad(-a,o,c,a,o,c,a,l,0,-a,l,0,t*r,Math.hypot(c,n)*r),s.addQuad(a,o,-c,-a,o,-c,-a,l,0,a,l,0,t*r,Math.hypot(c,n)*r),s.addTri(a,o,-c,a,o,c,a,l,0,e*r,n*r),s.addTri(-a,o,c,-a,o,-c,-a,l,0,e*r,n*r),s.addQuad(-a,o,c,-a,o,-c,a,o,-c,a,o,c,t*r,e*r);const h=.14;return s.box(0,o-h/2,c,t+i*2,h,.16,r),s.box(0,o-h/2,-c,t+i*2,h,.16,r),{height:n}}function Cx(s,t,e,n,i=.6,o=0,r=.7){const a=t/2+i,c=e/2+i,l=o+n,h=Math.max(.4,t/2-e/2+.2);s.addQuad(-a,o,c,a,o,c,h,l,0,-h,l,0,t*r,Math.hypot(c,n)*r),s.addQuad(a,o,-c,-a,o,-c,-h,l,0,h,l,0,t*r,Math.hypot(c,n)*r),s.addQuad(-a,o,-c,-a,o,c,-h,l,0,-h,l,0,e*r,Math.hypot(a,n)*r),s.addQuad(a,o,c,a,o,-c,h,l,0,h,l,0,e*r,Math.hypot(a,n)*r),s.addQuad(-a,o,c,-a,o,-c,a,o,-c,a,o,c,t*r,e*r);const d=.14;return s.box(0,o-d/2,c,t+i*2,d,.16,r),s.box(0,o-d/2,-c,t+i*2,d,.16,r),s.box(-a,o-d/2,0,.16,d,e+i*2,r),s.box(a,o-d/2,0,.16,d,e+i*2,r),{height:n}}function Px(s,t,e,n=0,i=.35,o=.55){const r=t/2+i,a=e/2+i;s.box(0,n-.12,0,t+i*2,.24,e+i*2,.6);const c=.18;return s.box(0,n+o/2,a-c/2,t+i*2,o,c,.6),s.box(0,n+o/2,-a+c/2,t+i*2,o,c,.6),s.box(r-c/2,n+o/2,0,c,o,e+i*2,.6),s.box(-r+c/2,n+o/2,0,c,o,e+i*2,.6),{height:o}}function Dx(s,t,e,n,i=.9,o=0,r=.6){const a=t/2+i,c=e/2+i,l=5;for(const h of[1,-1]){for(let d=0;d<l;d++){const u=d/l,f=(d+1)/l,p=c*(1-u),x=c*(1-f),g=o+n*Math.pow(u,.72),m=o+n*Math.pow(f,.72),_=a*(1-u*.78),b=a*(1-f*.78);h>0?s.addQuad(-_,g,p,_,g,p,b,m,x,-b,m,x,_*2*r,(p-x)*r):s.addQuad(_,g,p,-_,g,p,-b,m,x,b,m,x,_*2*r,(p-x)*r)}s.box(0,o+n+.1,h*.1,.5,.3,.6,.6)}return s.addQuad(-a*.22,o+n,.25,a*.22,o+n,.25,a*.22,o+n,-.25,-a*.22,o+n,-.25,1,1),s.box(0,o-.1,0,t+i*2,.2,e+i*2,.5),{height:n}}const qe=3.05;function Lx(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0)/4294967296}function Ix(s){if(!s.length)return null;let t=0,e=0;for(const h of s)t+=h.attributes.position.count,e+=h.index?h.index.count:0;const n=new Float32Array(t*3),i=new Float32Array(t*3),o=new Float32Array(t*2),r=new Uint32Array(e);let a=0,c=0;for(const h of s){const d=h.attributes.position,u=h.attributes.normal,f=h.attributes.uv;for(let x=0;x<d.count;x++)n[(a+x)*3]=d.getX(x),n[(a+x)*3+1]=d.getY(x),n[(a+x)*3+2]=d.getZ(x),i[(a+x)*3]=u.getX(x),i[(a+x)*3+1]=u.getY(x),i[(a+x)*3+2]=u.getZ(x),o[(a+x)*2]=f.getX(x),o[(a+x)*2+1]=f.getY(x);const p=h.index.array;for(let x=0;x<p.length;x++)r[c+x]=p[x]+a;a+=d.count,c+=p.length,h.dispose()}const l=new De;return l.setAttribute("position",new Re(n,3)),l.setAttribute("normal",new Re(i,3)),l.setAttribute("uv",new Re(o,2)),l.setIndex(new Re(r,1)),l}function zx(s,t){const e={house:[15787730,14996920,14471869,15260868,15920352,14208954,15129024],shop:[16250092,15920352,15525076],cafe:[15721164,15259840],station:[15130573],school:[15328470],apartment:[15722972],kaikan:[15393490]},n=e[s]||e.house;return n[Math.floor(t()*n.length)]}function Ux(s,t){const e={house:[8028818,7239808,9073256,7635086,6713470,9072226,8287360],shop:[7436938,6910346],cafe:[9070166,9726552],station:[7502476],school:[7238788],apartment:[7765644],kaikan:[8028300]},n=e[s]||e.house;return n[Math.floor(t()*n.length)]}const ic=[];function kx(){return ic}function Nx(s,t){const e=new Ct,n=s.sign;if(!n)return null;const i=new Kn({map:Pn(n),transparent:!1,gradientMap:mi(),emissiveMap:Pn(n),emissive:0,emissiveIntensity:1}),o=new O(new Me(n.w/100,n.h/100),i),r=.12,a=new O(new Ht(n.w/100+.1,n.h/100+.1,r),et(n.accent??ot.red));return a.position.z=-.02,e.add(a,o),e.userData.material=i,ic.push({spec:s,material:i,kind:t}),e}function Fx(s,t,e,n,i,o,r,a,c,l){const h=a-c;e.box((n+i)/2,(o+r)/2,h,i-n,r-o,.14,.5),e.box((n+i)/2,o,(a+h)/2,i-n,.1,c,.5),e.box((n+i)/2,r,(a+h)/2,i-n,.1,c,.5),e.box(n,(o+r)/2,(a+h)/2,.12,r-o,c,.5),e.box(i,(o+r)/2,(a+h)/2,.12,r-o,c,.5);const d=3;for(let u=0;u<d;u++){const f=o+.35+u*((r-o-.7)/d),p=(i-n)*(.3+l()*.2),x=ft(n+1,i-1,l());s.box(x,f+.5,h+.5,p,.9,.3,1);for(let g=0;g<7;g++)t.box(x-p/2+.25+g*((p-.5)/6),f+.62,h+.66,.2,.42,.06,1)}t.box((n+i)/2,r-.14,(a+h)/2,(i-n)*.8,.06,.24,1)}function Ox(s,t=0){const e=ue(Math.floor(Lx(s.id)*1e6)+7),{id:n,kind:i,w:o,d:r,rot:a,floors:c=1}=s,l=new Ct;l.name="bld-"+n;const h=s.wall??zx(i,e),d=s.roofCol??Ux(i,e),u=i==="shop"||i==="cafe",f=et(16777215,{map:gx(h,i==="house"?9:6)}),p=et(16777215,{map:xx(d)}),x=et(ot.wallWoodDark),g=et(5592158),m=et(15919832),_=et(10329237),b=et(15920352),y=et(s.doorPaint??ot.doorWood),A=[et(16777215,{map:Ao("day")}),et(16777215,{map:Ao("curtain")}),et(16777215,{map:Ao("day")}),et(16777215,{map:Ao("lit")})];Cn(A[0],{night:new Nt(ot.lampWarm),nightIntensity:1.45,threshold:.3}),Cn(A[1],{night:new Nt(16764814),nightIntensity:.95,threshold:.34}),Cn(A[3],{night:new Nt(ot.lampWarm),nightIntensity:1.7,threshold:.2,dayIntensity:.25});const w={wall:new z,roof:new z,roofTop:new z,trim:new z,dark:new z,light:new z,inner:new z,door:new z},R=c*qe,E=o/2,v=r/2;w.wall.box(0,R/2,-v,o,R,.001,.34),w.wall.p.length=0,w.wall.n.length=0,w.wall.u.length=0,w.wall.i.length=0,w.wall.box(0,R/2,-v+.06,o,R,.12,.34),w.wall.box(-E+.06,R/2,0,.12,R,r,.34),w.wall.box(E-.06,R/2,0,.12,R,r,.34),w.dark.box(0,.16,0,o+.16,.32,r+.16,.6);const M=u?1.45:1.1,C=2.25;let L=-E+M/2+(u?.5:1);i==="station"&&(L=-E+3.4),i==="kaikan"&&(L=-E+2.6),i==="school"&&(L=-E+4.5);const I=.32;let H=null;if(u){const Q=-E+.4,K=E-.4,ct=.55,ht=qe-.45;w.wall.box((Q-E)/2,ct/2,v-.06,Q+E,ct,.12,.34),w.wall.box(0,(ht+qe)/2,v-.06,o,qe-ht,.12,.34),w.wall.box((Q+E)/2,(ct+ht)/2,v-.06,Q+E,ht-ct,.12,.34),w.wall.box((K+E)/2,(ct+ht)/2,v-.06,E-K,ht-ct,.12,.34),Fx(w.dark,w.light,w.inner,Q+.1,K-.1,.3,ht,v-.1,2.1,e);const Et=new Me(K-Q-.1,ht-ct-.1);Et.translate((Q+K)/2,(ct+ht)/2,v+.02);const Rt=new O(Et,et(14674672,{transparent:!0,opacity:.42,depthWrite:!1}));Rt.renderOrder=2,l.add(Rt),l.userData.storeGlass=Rt,H={openX0:Q,openX1:K,sillH:ct,openTop:ht}}else w.wall.box(0,R/2,v-.06,o,R,.12,.34);c>1&&w.wall.box(0,(qe+R)/2,v-.06,o,R-qe,.12,.34),w.dark.box(L,I+C/2,v+.02,M+.26,C+.18,.1,1),w.door.box(L,I+C/2,v+.09,M,C,.09,1),w.light.box(L+M/2+.42,I+C*.78,v+.05,.3,.14,.05,1),w.dark.box(L,.1,v+.72,M+.7,.2,.8,.8),u||(w.trim.box(L,I+C+.35,v+.5,M+1,.1,1,.8),w.trim.box(L-(M+1)/2+.06,I+C+.1,v+.95,.12,.5,.12,1),w.trim.box(L+(M+1)/2-.06,I+C+.1,v+.95,.12,.5,.12,1));const V=[],B=[[],[],[],[]],Z=(Q,K,ct,ht,Et,Rt)=>{const kt=[[0,1],[0,-1],[1,0],[-1,0]][Rt],de=[kt[1],-kt[0]],k=(te,ie,Ft,ye,Ot)=>{const P=Q+de[0]*te,S=ct+de[1]*te,G=Rt<2?Ft:.16,nt=Rt<2?.16:Ft;Ot.box(P,K+ie,S,G,ye,nt,1)};k(0,Et/2+.07,ht+.28,.14,w.trim),k(0,-Et/2-.07,ht+.28,.14,w.trim),k(-ht/2-.07,0,.14,Et,w.trim),k(ht/2+.07,0,.14,Et,w.trim),w.dark.box(Q+kt[0]*.02,K,ct+kt[1]*.02,Rt<2?.06:ht,Et,Rt<2?ht:.06,1);const Ue=new Me(ht,Et);Rt===2&&Ue.rotateY(Math.PI/2),Rt===3&&Ue.rotateY(-Math.PI/2),Rt===1&&Ue.rotateY(Math.PI),Ue.translate(Q+kt[0]*.06,K,ct+kt[1]*.06),B[Rt].push(Ue),V.push({x:Q+kt[0]*.06,y:K,z:ct+kt[1]*.06,w:ht,h:Et,facing:Rt})};for(let Q=0;Q<c;Q++){if(u&&Q===0)continue;const K=Q*qe+1.85,ct=.95,ht=Math.max(1,Math.round((o-ct*2)/2.7));for(let Rt=0;Rt<ht;Rt++){const kt=ft(-E+ct,E-ct,ht===1?.5:Rt/(ht-1));Q===0&&Math.abs(kt-L)<M/2+.75||Z(kt,K,v,1.2,1.3,0)}for(let Rt=0;Rt<ht;Rt++){const kt=ft(-E+ct,E-ct,ht===1?.5:Rt/(ht-1));Z(kt,K,-v,1.1,1.2,1)}const Et=Math.max(1,Math.round((r-ct*2)/2.8));for(let Rt=0;Rt<Et;Rt++){const kt=ft(-v+ct,v-ct,Et===1?.5:Rt/(Et-1));Z(-E,K,kt,1.05,1.2,2),Z(E,K,kt,1.05,1.2,3)}}if(u&&c>1){const Q=qe+1.75,K=.9,ct=Math.max(1,Math.round((o-K*2)/2.6));for(let ht=0;ht<ct;ht++){const Et=ft(-E+K,E-K,ct===1?.5:ht/(ct-1));Z(Et,Q,v,1.5,1.1,0),Z(Et,Q,-v,1.2,1.1,1)}}let W=0;const rt=R,mt=s.roof??(i==="apartment"?"flat":"gable");mt==="gable"?(W=Math.min(r*.5,3.1),Rx(w.roof,o,r,W,.5,rt,.5),w.trim.box(0,rt+W+.07,0,o+1.05,.16,.36,.8)):mt==="hip"?(W=Math.min(r*.46,2.8),Cx(w.roof,o,r,W,.5,rt,.5),w.trim.box(0,rt+W+.06,0,.4,.14,.4,.8)):mt==="flat"?(W=.6,Px(w.roof,o,r,rt,.42,.62),w.roofTop.box(0,rt+.16,0,o-.7,.14,r-.7,.5)):mt==="shrine"&&(W=3.2,Dx(w.roof,o,r,W,1.15,rt,.5)),w.trim.box(0,rt-.17,v+.48,o+1.05,.2,.14,.8),w.trim.box(0,rt-.17,-v-.48,o+1.05,.2,.14,.8);const At=e()<.5?-E+.2:E-.2;if(w.dark.box(At,rt/2,v+.06,.1,rt,.1,1),c>=2&&(i==="apartment"||i==="house"||i==="school")){const Q=qe+.2;w.trim.box(0,Q,v+.55,o-.7,.14,1.1,.8);for(let ct=0;ct<2;ct++)w.trim.box(0,Q+.22+ct*.32,v+1.05,o-.7,.07,.07,1);const K=Math.max(4,Math.round(o/1.15));for(let ct=0;ct<=K;ct++)w.trim.box(ft(-(o-.7)/2,(o-.7)/2,ct/K),Q+.42,v+1.05,.06,.84,.06,1)}if(i==="house"||i==="apartment"){if(e()<.9){const Q=ft(-E+1.1,E-1.1,e()),K=1.05+(c>1?qe:0);w.light.box(Q,K,v+.42,.76,.54,.32,1),w.dark.box(Q,K,v+.6,.58,.4,.04,1)}if(e()<.6){const Q=e()<.5?-E+.7:E-.7;w.dark.box(Q,rt+W+.55,0,.05,1.5,.05,1);for(let K=0;K<4;K++)w.dark.box(Q,rt+W+.95+K*.2,0,.95-K*.17,.04,.04,1)}}if(i==="school"&&(w.light.box(o/2-2.4,rt+2.9,1.35,1.7,1.7,.14,1),w.dark.box(o/2-2.4,rt+2.9,1.45,1.35,1.35,.1,1),w.dark.box(o/2-2.4,rt+5.5,0,3,.5,3,.4)),s.awning||u){const Q=o-.6,K=new z,ct=s.awning?e()<.5?13919599:4882314:12868186,ht=5;for(let Rt=0;Rt<ht;Rt++){const kt=Rt/ht,de=(Rt+1)/ht,k=v+.1+kt*1.15,Ue=v+.1+de*1.15,te=qe-.5-kt*.42,ie=qe-.5-de*.42;K.addQuad(-Q/2,te,k,Q/2,te,k,Q/2,ie,Ue,-Q/2,ie,Ue,Q*.5,.4)}K.box(0,qe-.5,v+1.25,Q,.16,.12,1);const Et=new O(K.toGeometry(),et(ct));l.add(Et),se(Et,.01)}if(s.lantern)for(const Q of[-1,1]){const K=new Ct,ct=new O(new Ne(.24,.24,.5,10),et(15917248));ct.position.set(Q*(E-.9),qe-.75,v+.75);const ht=new O(new Ne(.12,.26,.12,10),et(9060152));ht.position.set(Q*(E-.9),qe-.45,v+.75),K.add(ct,ht),se(ct,.012),l.add(K)}const Bt=(Q,K)=>{if(Q.isEmpty())return null;const ct=new O(Q.toGeometry(),K);return l.add(ct),ct};Bt(w.wall,f),Bt(w.roof,p),Bt(w.roofTop,_),Bt(w.trim,x),Bt(w.dark,g),Bt(w.light,m),Bt(w.inner,b),Bt(w.door,y);for(let Q=0;Q<4;Q++){if(!B[Q].length)continue;const K=Ix(B[Q]);K&&l.add(new O(K,A[Q%A.length]))}const Zt=Nx(s,i);if(Zt){if(u&&H){const Q=s.sign.w/100;Zt.position.set(0,H.openTop+.62,v+.24),Zt.scale.set(Math.min(1,(o-.6)/Q),1,1)}else Zt.position.set(-E+2,qe-.1,v+.2),Zt.scale.setScalar(.7);l.add(Zt),se(Zt.children[0],.008)}if(u&&e()<.75){const Q=s.sign&&s.sign.text.length>2?s.sign.text:"営業中",K=vx(Q,i==="cafe"?7031354:11552063),ct=new Kn({map:K,emissiveMap:K,emissive:0,gradientMap:mi()}),ht=K.image.height/100*.55,Et=new O(new Me(.55,ht),ct),Rt=new O(new Ht(.6,ht+.08,.14),et(3090986)),kt=new O(new Ht(.07,.07,.9),et(3090986)),de=new Ct;de.add(Rt,Et,kt),de.position.set(E-.35,qe-.35,v+.72),l.add(de),ic.push({spec:s,material:ct,kind:"v"+n})}for(const Q of[...l.children])Q.isMesh&&Q.userData.material===void 0&&se(Q,.01);l.position.set(s.x,t,s.z),l.rotation.y=a;const J=ka(s,L,v+1.5),lt={x:s.x,z:s.z,hw:E+.6,hd:v+.6,rot:a,id:n,floors:c};return{group:l,door:{x:J.x,z:J.z,y:t,facing:a},bounds:lt,windows:V,spec:s,storefront:H}}function ka(s,t,e){const n=Math.cos(s.rot),i=Math.sin(s.rot);return{x:s.x+t*n+e*i,z:s.z-t*i+e*n}}const Be={xMin:-220,xMax:220,portalX:106,stopX:-8,carLen:19.6,carGap:1,cars:2},Il=jt.gauge,Bx=Be.carLen*Be.cars+Be.carGap*(Be.cars-1);function Hx(s,t,e,n,i,o=.02){for(let r=t;r<e;r+=3){const a=Math.min(r+3,e),c=jt.zAt(r),l=jt.zAt(a),h=Math.atan2(a-r,l-c),d=Math.hypot(a-r,l-c)+.04,u=new z;u.box(0,i,0,d,o,n*2,.4);const f=new Wt().makeRotationY(h);f.setPosition((r+a)/2,0,(c+l)/2),u.applyMatrix(f),He(s,u)}}function Gx(s){const t=new Ct;t.name="railway";const e=new z;Hx(e,Be.xMin,Be.xMax,3.2,.02,.28);const n=$h().clone();n.needsUpdate=!0,n.wrapS=n.wrapT=$n,n.repeat.set(70,1.6);const i=new O(e.toGeometry(),et(16777215,{map:n}));i.receiveShadow=!0,t.add(i);const o=new z;for(let E=Be.xMin;E<Be.xMax;E+=.64){const v=jt.zAt(E),M=(jt.zAt(E+.2)-jt.zAt(E-.2))/.4,C=new z;C.box(0,.16,0,.24,.16,2.55,1);const L=new Wt().makeRotationY(Math.atan2(1,M));L.setPosition(E,0,v),C.applyMatrix(L),He(o,C)}const r=new O(o.toGeometry(),et(7037011));r.receiveShadow=!0,t.add(r);const a=new z;for(const E of[-1,1])for(let v=Be.xMin;v<Be.xMax;v+=3){const M=Math.min(v+3,Be.xMax),C=jt.zAt(v)+E*Il/2,L=jt.zAt(M)+E*Il/2,I=new z;I.box(0,0,0,Math.hypot(M-v,L-C)+.03,.15,.075,1);const H=new Wt().makeRotationY(Math.atan2(M-v,L-C));H.setPosition((v+M)/2,.255,(C+L)/2),I.applyMatrix(H),He(a,I)}const c=new O(a.toGeometry(),et(ot.railSteel));c.castShadow=!0,t.add(c),se(c,.005);const l=Ye.platform,h=26,d=new z,u=new z,f=new z,p=new z;for(let E=0;E<h;E++){const v=ft(l.x0,l.x1,E/h),M=ft(l.x0,l.x1,(E+1)/h),C=jt.zAt(v)+l.inner,L=jt.zAt(M)+l.inner,I=jt.zAt(v)+l.outer,H=jt.zAt(M)+l.outer,V=Math.atan2(M-v,H-L),B=Math.hypot(M-v,H-C),Z=I-C,W=new z;W.box(0,l.h/2,0,B,l.h,Z,.55);let rt=new Wt().makeRotationY(V);rt.setPosition((v+M)/2,0,(C+I)/2),W.applyMatrix(rt),He(d,W);const mt=(Zt,J,lt,Q)=>{const K=Zt/Z,ct=(Zt+J)/Z,ht=new z;ht.box(0,lt,0,B,.02,J,.5);const Et=(ft(C,L,K)+ft(I,H,ct))/2,Rt=new Wt().makeRotationY(V);Rt.setPosition((v+M)/2,0,Et),ht.applyMatrix(Rt),He(Q,ht)};mt(.12,.95,l.h+.012,u),mt(1.15,.55,l.h+.014,f);const At=new z;At.box(0,l.h+.02,0,B,.03,.18,1);const Bt=new Wt().makeRotationY(V);Bt.setPosition((v+M)/2,0,(C+L)/2),At.applyMatrix(Bt),He(p,At)}const x=new O(d.toGeometry(),et(14078146));x.receiveShadow=!0,x.castShadow=!0,t.add(x);const g=new O(u.toGeometry(),et(12959664));g.receiveShadow=!0,t.add(g);const m=new O(f.toGeometry(),et(15057479));m.receiveShadow=!0,t.add(m),t.add(new O(p.toGeometry(),et(14266936)));const _=new z,b=new z,y=Ye.roof;_.box((y.x0+y.x1)/2,y.y,5.9,y.x1-y.x0+1.6,.16,7.8,.5);for(let E=y.x0;E<=y.x1+.01;E+=6.4){const v=jt.zAt(E)+3.1;b.cyl(E,l.h,v,.1,.13,y.y-l.h,8),b.box(E,y.y-.2,v+.5,.08,.08,1.4),b.box(E,y.y-.48,v+1.1,.07,.56,.07)}const A=new O(_.toGeometry(),et(7172736)),w=new O(b.toGeometry(),et(13025458));t.add(A,w),se(A,.011),t.add(zl(-1),zl(1));const R=new z;for(let E=l.x0-1;E<=l.x1+1;E+=2.4)R.cyl(E,l.h,jt.zAt(E)+l.outer+.12,.045,.05,1,5);for(const E of[.5,.9])for(let v=l.x0-1;v<l.x1+1;v+=2){const M=Math.min(v+2,l.x1+1),C=jt.zAt(v)+l.outer+.12,L=jt.zAt(M)+l.outer+.12,I=new z;I.box(0,0,0,Math.hypot(M-v,L-C)+.02,.05,.05,1);const H=new Wt().makeRotationY(Math.atan2(M-v,L-C));H.setPosition((v+M)/2,l.h+E,(C+L)/2),I.applyMatrix(H),He(R,I)}if(t.add(new O(R.toGeometry(),et(9607587))),s)for(let E=l.x0-1;E<=l.x1+1;E+=1.8)s.addBox(E,jt.zAt(E)+l.outer+.12,.8,.1,0,l.h+1,l.h);return t}function zl(s){const t=new Ct,e=s*Be.portalX,n=jt.zAt(e),i=j(e,n),o=new z,r=new z,a=13,c=8.5,l=3.4;o.box(0,c+1.1,0,l+.8,2.2,a+6.4,.35);for(const h of[-1,1])o.box(0,c*.52,h*(a/2+1.5),l+.6,c*1.05,3,.35),o.box(0,c*.92,h*(a/2+.55),l+.6,1.6,1.6,.35);r.box(0,c*.4,0,l*.5,c*.86,a,1),t.add(new O(o.toGeometry(),et(9406329))),t.add(new O(r.toGeometry(),et(1513244)));for(const h of t.children)se(h,.012);return t.position.set(e,i,n),t.rotation.y=Math.PI/2,t}function Vx(s){const t=new Ct;t.name="crossing";const e=Ie.x,n=Ie.z,i={gates:[],lights:[]},o=Ie.barrierX+.6;for(const a of[-1,1])for(const c of[-1,1]){const l=e+a*Ie.barrierX,h=n+c*5.6,d=j(l,h),u=new z;u.cyl(0,0,0,.14,.19,3.7,8),u.box(0,3.78,0,.36,.22,.36),u.box(0,4.02,0,.52,.16,.52);const f=new O(u.toGeometry(),et(5001821));f.position.set(l,d,h),se(f,.012),t.add(f);const p=Li(4003093,{transparent:!0,opacity:.6}),x=new O(new Pe(.22,10,8),p);x.position.set(l,d+3.62,h),t.add(x),i.lights.push({mesh:x,material:p});const g=new O(new Ne(.18,.21,.28,8),et(2830135));g.position.set(l,d+3.32,h-.36),g.rotation.x=Math.PI/2,t.add(g);const m=new Ct;m.position.set(l,d+1.08,h);const _=-a,b=new z;b.box(_*o/2,0,0,o,.12,.12,1);const y=new O(b.toGeometry(),et(16052710));m.add(y);for(let L=0;L<5;L++){const I=new O(new Ht(.9,.145,.145),et(ot.red));I.position.set(_*(.9+L*1.5),0,0),m.add(I)}const A=new O(new Pe(.11,8,6),et(ot.red));A.position.set(_*o,0,0),m.add(A),t.add(m),i.gates.push({pivot:m,side:a*c,x:l,z:h,y:d});const w=e+a*(Ie.barrierX-1.8),R=j(w,h),E=new z;E.box(0,2.05,0,1.2,.18,.06,1),E.box(0,2.05,0,.18,1.2,.06,1);const v=new O(E.toGeometry(),et(16184038));v.position.set(w,R+1.7,h);const M=new z;M.cyl(0,0,0,.05,.06,1.5,6);const C=new O(M.toGeometry(),et(9607587));C.position.set(w,R,h),t.add(v,C),se(v,.012),s&&s.addCircle(l,h,.32,d+1.5,d-.3)}const r=s?s.addBox(e,n,4.6,2.6,0,2.2,2):null;return t.userData.parts=i,{group:t,parts:i,x:e,z:n,block:r}}function Wx(){const s=Be.carLen,t=2.72,e=3,n=new z,i=new z,o=new z,r=new z,a=new z;n.box(0,1.78,0,s,e,t,.4),n.box(0,3.3,0,s-.5,.2,t-.45,.4),r.box(0,.44,0,s-.5,.5,t-.18,1),o.box(0,1.12,0,s,.24,t+.03,1),o.box(0,2.72,0,s,.09,t+.03,1);for(const c of[-1,1])for(let h=0;h<6;h++){const d=ft(-s/2+2,s/2-3.2,h/5);Math.abs(d)<1.4||Math.abs(d)>4.2||i.box(d,2.22,c*(t/2+.01),1.55,.82,.03,1)}a.box(0,.72,0,s-.3,.06,t-.2,1);for(const c of[-1,1])for(let l=0;l<3;l++){const h=ft(-s/2+2.2,s/2-2.2,l/2);a.box(h,1,c*(t/2-.45),1.5,.5,.55,1)}a.box(0,2.3,0,s-.2,.05,t-.2,1);for(const c of[-1,1]){r.box(c*(s/2-2.7),.38,0,2.6,.46,t-.45,1);for(const l of[-1,1]){const h=new z;h.cyl(0,0,0,.4,.4,.09,12),h.applyMatrix(new Wt().makeRotationX(Math.PI/2)),h.applyMatrix(new Wt().makeTranslation(c*(s/2-2.7),.48,l*.7)),He(r,h)}}return r.box(-s/4,3.46,0,2.3,.22,1.4,1),r.box(s/4,3.46,0,2.3,.22,1.4,1),{body:n,win:i,stripe:o,dark:r,inner:a}}class Xx{constructor(){this.group=new Ct,this.group.name="train",this.doorState=0,this.cars=[],this.mats={body:et(ot.trainBody),win:et(3095110,{transparent:!0,opacity:.92}),stripe:et(ot.trainStripe),dark:et(3883338),inner:et(15262420)},Cn(this.mats.win,{night:new Nt(16767130),nightIntensity:1.4,threshold:.32}),Cn(this.mats.inner,{night:new Nt(16769200),dayIntensity:.5,nightIntensity:1.5,threshold:.3});const t=Wx(),e={};for(const n of Object.keys(t))e[n]=t[n].toGeometry();for(let n=0;n<Be.cars;n++){const i=new Ct;for(const o of Object.keys(e)){const r=new O(e[o],this.mats[o]);r.castShadow=!0,i.add(r)}this.cars.push({group:i,doors:[]}),this.group.add(i)}this._buildDoors(),this.nose=new Ct,this.headMat=Li(16774864),this.tailMat=Li(5841442);for(const n of[-1,1]){const i=new O(new Pe(.16,8,6),this.headMat);i.position.set(0,.95,n*.7),this.nose.add(i)}this.headLight=new Ag(16773320,0,70,.42,.55,1.1),this.headLight.position.set(.3,1,0),this.headTarget=new ze,this.headTarget.position.set(40,.5,0),this.nose.add(this.headLight,this.headTarget),this.headLight.target=this.headTarget,this.group.add(this.nose),this.x=0,this.dir=1,this.setVisible(!1)}_buildDoors(){const t=Be.carLen,e=2.72;for(let n=0;n<this.cars.length;n++){const i=this.cars[n];i.doors=[];for(const o of[-1,1])for(const r of[-t/4,t/4]){const a=new Ct;a.position.set(r,1.24,o*(e/2+.02));const c=new O(new Ht(.6,1.9,.07),this.mats.body),l=new O(new Ht(.6,1.9,.07),this.mats.body),h=new O(new Ht(.5,.72,.03),this.mats.win),d=new O(new Ht(.5,.72,.03),this.mats.win);c.position.x=-.3,l.position.x=.3,h.position.set(-.3,.42,.05),d.position.set(.3,.42,.05),a.add(c,l,h,d),i.group.add(a),i.doors.push({pivot:a,s:o})}}}setVisible(t){this.group.visible=t,this.visible=t}setDoors(t){this.doorTarget=t?1:0}updateDoors(t){this.doorState=me(this.doorState,this.doorTarget||0,5.5,t);for(const e of this.cars)for(const n of e.doors)n.pivot.children[0].position.x=-.3-this.doorState*.62,n.pivot.children[2].position.x=-.3-this.doorState*.62,n.pivot.children[1].position.x=.3+this.doorState*.62,n.pivot.children[3].position.x=.3+this.doorState*.62}place(t,e){const n=Be.carLen+Be.carGap;for(let o=0;o<this.cars.length;o++){const r=(o-(this.cars.length-1)/2)*n,a=t+r;this.cars[o].group.position.set(a,0,jt.zAt(a)),this.cars[o].group.rotation.y=e>0?0:Math.PI}const i=t+e*(Bx/2+.2);this.nose.position.set(i,0,jt.zAt(i)),this.nose.rotation.y=e>0?0:Math.PI,this.headMat.color.setHex(this.night?16774864:15524548),this.x=t,this.dir=e}update(t,e){this.night=e,this.updateDoors(t),this.headLight.intensity=e>.25?14:0,this.headMat.opacity=1}}const Us=[{arr:6.28,dir:1,dest:"町田"},{arr:7.12,dir:1,dest:"青葉"},{arr:7.75,dir:-1,dest:"日向台"},{arr:8.42,dir:1,dest:"城東"},{arr:9.15,dir:-1,dest:"町田"},{arr:9.85,dir:1,dest:"青葉"},{arr:10.55,dir:-1,dest:"日向台"},{arr:11.25,dir:1,dest:"町田"},{arr:12.05,dir:-1,dest:"青葉"},{arr:12.62,dir:1,dest:"日向台"},{arr:13.2,dir:-1,dest:"城東"},{arr:13.9,dir:1,dest:"町田"},{arr:14.5,dir:-1,dest:"青葉"},{arr:15.1,dir:1,dest:"日向台"},{arr:15.8,dir:-1,dest:"町田"},{arr:16.5,dir:1,dest:"城東"},{arr:17.3,dir:-1,dest:"青葉"},{arr:18.1,dir:1,dest:"町田"},{arr:18.9,dir:-1,dest:"日向台"},{arr:19.7,dir:1,dest:"青葉"}],qx=152,Yx=152,$x=.3;class jx{constructor(t,e){this.train=t,this.audio=e,this.state="idle",this.active=null,this.x=0,this.v=0,this.doorOpen=!1,this.listeners={},this.lastDeparture=null,this.dwellLeft=0}on(t,e){var n;((n=this.listeners)[t]||(n[t]=[])).push(e)}emit(t,e){(this.listeners[t]||[]).forEach(n=>n(e))}nextTrain(t){for(const e of Us)if(e.arr>t+.001)return e;return{arr:Us[0].arr+24,dir:Us[0].dir,dest:Us[0].dest,tomorrow:!0}}update(t,e,n){if(this.state==="idle"){const o=e.hour,r=this.nextTrain(o);this.lastDeparture=r,r.arr-o<$x&&r.arr-o>0&&this.begin(r);return}const i=this.active;switch(i.t+=t,this.train.update(t,n),this.state){case"approach":{!i._whistled&&this.x*i.dir<-112&&(i._whistled=!0,this.emit("whistle")),this.v=ft(7,19,Ge(i.t/8.5)),this.x+=this.v*i.dir*t,Math.abs(this.x)<168&&this.train.setVisible(!0),(i.t>9||Math.abs(this.x)<=44)&&(this.state="brake",i.t=0);break}case"brake":{const o=(Math.abs(this.x)-Be.stopX)*i.dir,r=Math.max(1.6,Math.sqrt(Math.max(0,2*2.4*Math.max(0,o))));this.v=me(this.v,r,3,t),this.x+=this.v*i.dir*t,(o<=.06||i.t>10)&&(this.x=Be.stopX,this.v=0,this.state="dwell",i.t=0,this.doorOpen=!0,this.train.setDoors(!0),this.emit("doorsOpen",i),this.emit("arrive",i));break}case"dwell":{this.dwellLeft=24-i.t,i.t>24&&(this.doorOpen=!1,this.train.setDoors(!1),this.state="depart",i.t=0,this.emit("doorsClose",i));break}case"depart":{this.v=ft(0,21,Ge(i.t/7)),this.x+=this.v*i.dir*t,i.t>2.4&&!i._departed&&(i._departed=!0,this.emit("depart",i)),Math.abs(this.x)>Yx&&(this.state="idle",this.train.setVisible(!1),this.active=null,this.v=0);break}}this.train.place(this.x,i.dir)}begin(t){this.active={...t,t:0},this.state="approach",this.x=-t.dir*qx,this.train.setVisible(!0),this.train.place(this.x,t.dir),this.emit("approach",this.active)}get crossingBusy(){return this.state==="approach"?Math.abs(this.x)<96:this.state==="brake"?!0:this.state==="dwell"?!1:this.state==="depart"?this.active&&this.active.t>2.4:!1}}class Zx{constructor(t,e){this.c=t,this.audio=e,this.t=0,this._top=2.2,this._bot=2,this.alarmed=!1,this.blink=0,this.alarmTimer=0}update(t,e){const n=e.crossingBusy,i=n?1:0;this.t=me(this.t,i,n?3.4:1.6,t);const o=Ge(this.t);for(const a of this.c.parts.gates)a.pivot.rotation.x=(1-o)*(Math.PI/2.1)*(a.side>0?1:-1);if(o>.3?(this.alarmRings===void 0&&(this.alarmRings=0),this.alarmTimer-=t,this.alarmTimer<=0&&this.alarmRings<2&&(this.audio?.playCrossingAlarm?.(),this.alarmRings++,this.alarmTimer=.85)):(this.alarmTimer=0,this.alarmRings=0),this.c.block){const a=Ge((o-.25)/.35);this.c.block.top=ft(2.4,1.4,a),this.c.block.bottom=ft(2.2,-1,a)}this.blink+=t*2.4;const r=o>.25&&this.blink%1<.52;for(const a of this.c.parts.lights)a.material.color.setHex(r?16726566:4003093),a.material.opacity=o>.25?1:.55}}class In{constructor(t="props",e=3){this.name=t,this.chunks=e,this.size=300/e,this.map=new Map,this._matIds=new Map,this._matList=[],this.count=0}_matId(t){let e=this._matIds.get(t);return e===void 0&&(e=this._matList.length,this._matIds.set(t,e),this._matList.push(t)),e}push(t,e,n){if(!e||!e.count)return;const i=n?n.elements:null,o=i?i[12]:0,r=i?i[14]:0,a=Math.max(0,Math.min(this.chunks-1,Math.floor((o+150)/this.size))),c=Math.max(0,Math.min(this.chunks-1,Math.floor((r+150)/this.size))),l=`${a},${c}|${this._matId(t)}`;let h=this.map.get(l);h||(h={mat:t,buf:new z},this.map.set(l,h));const d=new z;d.p=e.p.slice(),d.n=e.n.slice(),d.u=e.u.slice(),d.i=e.i.slice(),n&&d.applyMatrix(n),He(h.buf,d),this.count++}build(t={}){const e=new Ct;e.name=this.name;const n=[];for(const{mat:i,buf:o}of this.map.values()){if(o.isEmpty())continue;const r=o.toGeometry(),a=new O(r,i);if(a.castShadow=t.castShadow!==!1,a.receiveShadow=t.receiveShadow!==!1,e.add(a),n.push(a),t.outline){const c=Fh(r.clone()),l=new O(c,Fg(t.outline,t.outlineColor));l.name="outline",l.matrixAutoUpdate=!1,l.renderOrder=(a.renderOrder||0)-1,a.add(l)}}return{group:e,meshes:n}}}function Jh(s=0,t=0,e=0,n=0,i=1,o=1,r=1,a=0,c=0){const l=new Wt;return l.compose(new D(s,t,e),new _s().setFromEuler(new kn(a,n,c,"YXZ")),new D(i,o,r)),l}const it={};function Kx(){const s=(t,e)=>et(t,e);it.bark=s(6967616),it.barkDark=s(5258540),it.sakuraA=s(ot.sakura),it.sakuraB=s(ot.sakuraDeep),it.sakuraC=s(ot.sakuraPale),it.leafA=s(ot.leaf),it.leafB=s(ot.leafLight),it.leafDark=s(ot.leafDark),it.pine=s(ot.pine),it.bamboo=s(ot.bamboo),it.wood=s(11041098),it.woodLight=s(13674616),it.woodDark=s(7031342),it.woodRed=s(10308415),it.metal=s(11054517),it.metalDark=s(7106936),it.white=s(16184558),it.concrete=s(12433580),it.red=s(13652044),it.redDeep=s(10369592),it.blue=s(4882357),it.green=s(6265954),it.yellow=s(15712330),it.rubber=s(3355450),it.gray=s(9408409),it.dark=s(4868692),it.stone=s(10130308),it.stoneDark=s(8025190),it.ceramic=s(14209730),it.fabricA=s(14999762),it.fabricB=s(10469588),it.lampGlass=s(16774360),Cn(it.lampGlass,{night:new Nt(16773320),dayEmissive:new Nt(0),nightIntensity:2.4,threshold:.26}),it.neonSign=s(16777215,{map:Pn({text:"営業中",sub:"OPEN",bg:15247692,fg:4861984,accent:10369592,w:256,h:128,size:62,subSize:20})}),Cn(it.neonSign,{night:new Nt(16765066),nightIntensity:2,threshold:.3}),it.vendBody=s(14673130),it.vendFace=et(16777215,{map:wx("beverage")}),Cn(it.vendFace,{night:new Nt(13624575),nightIntensity:.85,threshold:.3}),Cn(it.vendBody,{night:new Nt(6978192),nightIntensity:.3,threshold:.3}),it.glass=et(13163754,{transparent:!0,opacity:.4,depthWrite:!1}),it.waterLight=s(10405084)}function ts(s,t=1){const e=new Map,n=t*(.85+s()*.35),i=(2.1+s()*.7)*n,o=new z,r=new z,a=new z;o.cyl(0,0,0,.13*n,.24*n,i,7);for(let u=0;u<4;u++){const f=u/4*xt+s();o.cyl(Math.cos(f)*.16*n,.1*n,Math.sin(f)*.16*n,.07*n,.12*n,.4*n,5)}const c=3+Math.floor(s()*2);for(let u=0;u<c;u++){const f=u/c*xt+s()*.8,p=(.9+s()*.6)*n,x=new z;x.cyl(0,0,0,.05*n,.09*n,p,5);const g=new Wt().makeTranslation(0,i*.78,0);g.multiply(new Wt().makeRotationZ(Math.cos(f)*.62)),g.multiply(new Wt().makeRotationX(Math.sin(f)*.62)),x.applyMatrix(g),He(o,x)}const l=i+.5*n,h=(1.35+s()*.4)*n,d=5+Math.floor(s()*3);for(let u=0;u<d;u++){const f=u/d*xt+s()*.6,p=h*(.5+s()*.4),x=Math.cos(f)*h*.55*(.4+s()*.7),g=Math.sin(f)*h*.55*(.4+s()*.7),m=l+(s()-.45)*h*.55;(s()<.3?a:r).sphere(x,m,g,p,1,.16,u*3.7+s()*9)}return r.sphere(0,l+h*.2,0,h*.68,1,.18,4.1),e.set(it.bark,o),e.set(it.sakuraA,r),e.set(it.sakuraB,a),e}function Ul(s,t=1){const e=new Map,n=t*(.8+s()*.5),i=new z,o=new z,r=(5+s()*4)*n;i.cyl(0,0,0,.1*n,.26*n,r*.5,6);const a=4+Math.floor(s()*2);for(let c=0;c<a;c++){const l=c/a,h=r*(.22+l*.72),d=(1.5-l*1.15)*n*(.85+s()*.3),u=new z,f=7;for(let p=0;p<f;p++){const x=p/f*xt,g=(p+1)/f*xt,m=u.vert(Math.cos(x)*d,h-d*.35,Math.sin(x)*d,Math.cos(x)*.4,.4,Math.sin(x)*.4,0,0),_=u.vert(Math.cos(g)*d,h-d*.35,Math.sin(g)*d,Math.cos(g)*.4,.4,Math.sin(g)*.4,1,0),b=u.vert(0,h+d*1.25,0,0,1,0,.5,1);u.tri(m,_,b);const y=u.vert(0,h-d*.35,0,0,-1,0,.5,.5);u.tri(y,_,m)}He(o,u)}return e.set(it.bark,i),e.set(it.pine,o),e}function kl(s,t=1){const e=new Map,n=t*(.8+s()*.5),i=new z,o=new z,r=(2.6+s()*1.6)*n;i.cyl(0,0,0,.12*n,.24*n,r,7);for(let l=0;l<3;l++){const h=s()*xt,d=new z;d.cyl(0,0,0,.05*n,.08*n,(.8+s()*.5)*n,5);const u=new Wt().makeTranslation(0,r*.8,0);u.multiply(new Wt().makeRotationZ(Math.cos(h)*.7)),u.multiply(new Wt().makeRotationX(Math.sin(h)*.7)),d.applyMatrix(u),He(i,d)}const a=r+.7*n,c=(1.25+s()*.55)*n;for(let l=0;l<4;l++){const h=l/4*xt+s();o.sphere(Math.cos(h)*c*.5,a+(s()-.4)*c*.5,Math.sin(h)*c*.5,c*(.5+s()*.3),1,.2,l*5.1)}return o.sphere(0,a+c*.15,0,c*.7,1,.2,2.2),e.set(it.bark,i),e.set(it.leafA,o),e}function Wr(s,t=1){const e=new Map,n=t*(.7+s()*.6),i=new z;return i.sphere(0,.28*n,0,.42*n,1,.24,s()*9),i.sphere(.32*n,.2*n,.16*n,.3*n,1,.24,s()*9),i.sphere(-.28*n,.22*n,-.2*n,.32*n,1,.24,s()*9),e.set(s()<.3?it.leafDark:it.leafB,i),e}function Nl(s,t=1){const e=new Map,n=t*(.7+s()*.7),i=new z;for(let o=0;o<5;o++){const r=s()*xt,a=s()*.16*n,c=(.22+s()*.26)*n;i.cyl(Math.cos(r)*a,c/2,Math.sin(r)*a,.001,.035*n,c,3)}return e.set(s()<.35?it.leafB:it.leafA,i),e}function Jx(s,t=1,e=!1){const n=new Map,i=new z,o=new z,r=new z,a=7.6*t;i.cyl(0,0,0,.1,.15,a,8);for(let c=0;c<3;c++){const l=a-.5-c*.75;i.box(0,l,0,.08,.1,1.5);for(const h of[-.62,0,.62]){o.cyl(0,0,0,.045,.06,.14,5);const d=new Wt().makeTranslation(h,l+.12,0),u=new z;u.cyl(0,0,0,.05,.07,.15,5),u.applyMatrix(d),He(o,u)}}return e&&(r.cyl(0,a-3.4,.24,.26,.26,.9,8),r.box(0,a-3.9,.24,.5,.3,.3)),n.set(it.concrete,i),n.set(it.metal,o),e&&n.set(it.metalDark,r),n}function Ro(s){const t=new Map,e=new z,n=new z;return e.cyl(0,0,0,.07,.11,4,8),e.box(0,.12,0,.3,.24,.3),e.box(0,4.05,.28,.09,.09,.6),e.box(0,3.9,.56,.3,.12,.42),n.box(0,3.76,.56,.24,.16,.34),t.set(it.metalDark,e),t.set(it.lampGlass,n),t}function Co(s){const t=new Map,e=new z;e.box(0,.95,0,1.05,1.9,.72),e.box(0,.06,0,1.12,.12,.78),t.set(it.vendBody,e);const n=new z;return n.box(0,.95,.365,1,1.82,.01),t.set(it.vendFace,n),t}function Xr(s){const t=new Map,e=new z,n=new z;for(let i=0;i<4;i++)e.box(0,.42,-.24+i*.16,1.8,.05,.13);for(let i=0;i<3;i++)e.box(0,.6+i*.17,-.34,1.8,.13,.05);for(const i of[-1,1])n.box(i*.78,.21,-.1,.07,.42,.56),n.box(i*.78,.68,-.34,.06,.66,.06);return t.set(it.wood,e),t.set(it.metalDark,n),t}function Po(s,t=1,e=null){const n=new Map,i=new z,o=new z,r=new z,a=.33*t;for(const c of[-1,1]){const l=new z;l.ring(0,0,0,a-.045,a,14);const h=new Wt().makeTranslation(c*.52,a,0);l.applyMatrix(h),He(r,l);for(let d=0;d<4;d++)o.box(c*.52,a,0,.02,a*1.7,.02)}return i.box(0,.62,0,.86,.05,.05),i.box(-.3,.5,0,.05,.5,.05),i.box(.22,.42,0,.05,.42,.05),i.box(.32,.78,0,.06,.42,.05),i.box(-.42,.78,0,.05,.3,.05),i.box(.34,.96,0,.05,.05,.5),o.box(.5,.62,0,.06,.05,.42),n.set(e?et(e):it.blue,i),n.set(it.dark,o),n.set(it.rubber,r),n}function Do(s,t=1){const e=new Map,n=new z,i=new z,o=new z;n.box(0,.22*t,0,.8*t,.44*t,.8*t),n.box(0,.46*t,0,.86*t,.08*t,.86*t),o.sphere(0,.6*t,0,.34*t,1,.25,1.1);for(let r=0;r<4;r++){const a=r/4*xt;i.sphere(Math.cos(a)*.18*t,.78*t,Math.sin(a)*.18*t,.1*t,1,.1,r)}return e.set(it.ceramic,n),e.set(it.leafDark,o),e.set(it.sakuraB,i),e}function Qx(s){const t=new Map,e=new z,n=new z;return e.cyl(0,0,0,.06,.08,.75,6),n.box(0,.92,0,.32,.38,.44),n.box(0,1.13,0,.36,.06,.48),t.set(it.metalDark,e),t.set(it.red,n),t}function Lo(s){const t=new Map,e=new z,n=new z;return e.cyl(0,.32,0,.28,.25,.64,10),n.cyl(0,.68,0,.31,.31,.08,10),n.cyl(0,.78,0,.16,.2,.14,8),t.set(it.metal,e),t.set(it.dark,n),t}function qr(s){const t=new Map,e=new z;return e.box(0,.35,0,.1,.7,.1),t.set(it.metal,e),t}function t1(s="注意",t="",e=15911244,n=3813926){const i=new Map,o=new z;o.cyl(0,0,0,.045,.045,1.3,6),i.set(it.metalDark,o);const r=et(16777215,{map:Pn({text:s,sub:t,bg:e,fg:n,accent:n,w:256,h:256,size:64,subSize:20,key:"sp"+s+t})});return i.set(r,new z().box(0,1.55,.03,.5,.5,.04)),i}function Fl(s){const t=new Map,e=new z,n=new z;return e.cyl(0,.12,0,.26,.3,.24,6),e.cyl(0,.62,0,.1,.11,.78,6),e.box(0,1.06,0,.36,.1,.36),e.box(0,1.28,0,.3,.34,.3),e.cyl(0,1.56,0,.06,.3,.2,6),e.sphere(0,1.68,0,.09,1,0,0),n.box(0,1.28,0,.32,.36,.32),t.set(it.stone,e),t.set(it.lampGlass,n),t}function e1(s,t=1){const e=new Map,n=t,i=new z,o=new z,r=4.4*n,a=3.4*n;for(const c of[-1,1])i.cyl(c*a/2,0,0,.19*n,.23*n,r,9),o.cyl(c*a/2,0,0,.28*n,.3*n,.3*n,8);return o.box(0,r+.16*n,0,a+1.5*n,.2*n,.36*n),o.box(0,r+.42*n,0,a+1.9*n,.24*n,.5*n),o.box(0,r-.02*n,0,a+.3*n,.2*n,.26*n),i.box(0,r*.72,0,a+.5*n,.16*n,.22*n),i.box(0,r*.3,0,.3*n,r*.72,.24*n),e.set(it.red,i),e.set(it.dark,o),e}function n1(s){const t=new Map,e=new z;for(const i of[-1,1])e.cyl(i*1.2,0,0,.05,.06,1.7,6),e.box(i*1.2,1.72,0,.07,.07,.07);e.box(0,1.7,0,2.4,.02,.02),t.set(it.metal,e);const n=new z;for(let i=0;i<4;i++){const o=-.9+i*.6;n.box(o,1.42,0,.42,.55,.03)}return t.set(s()<.5?it.fabricA:it.fabricB,n),t}function Ol(s){const t=new Map,e=new z;for(let n=0;n<4;n++){const i=-.6+n*.4;e.box(0,.3,i,.5,.05,.05),e.box(-.25,.15,i,.05,.3,.05),e.box(.25,.15,i,.05,.3,.05)}return t.set(it.metal,e),t}function Bl(s){const t=new Map,e=new z,n=new z,i=new z;for(const o of[-1,1])e.box(o*1.5,1.1,0,.1,2.2,.1);return e.box(0,2.2,0,3.3,.12,1.2),i.box(0,1.1,-.5,2.9,2,.05),n.box(0,1,0,2.7,.06,.5),t.set(it.metalDark,e),t.set(it.glass,n),t.set(it.white,i),t}function i1(s){const t=new Map,e=new z,n=new z;return e.cyl(0,0,0,.05,.06,2,6),n.cyl(0,2.2,0,.32,.32,.12,12),t.set(it.metal,e),t.set(it.glass,n),t}function s1(s){const t=new Map,e=new z;return e.cyl(0,0,0,.09,.11,.55,8),e.cyl(0,.55,0,.07,.09,.18,8),e.box(0,.38,0,.34,.1,.1),t.set(it.red,e),t}function o1(s){const t=new Map,e=new z,n=new z,i=new z;for(const o of[-1,1])for(const r of[-1,1])n.cyl(o*.7,.5,r*.7,.06,.06,1,6);n.box(0,1.02,0,1.6,.1,1.6);for(let o=0;o<5;o++)i.box(0,.9-o*.18,.9+o*.42,.8,.06,.5);for(const o of[-1,1])i.box(o*.42,.7,1.4,.06,.5,2.2);return t.set(it.yellow,e),t.set(it.metal,n),t.set(it.red,i),t}function r1(s){const t=new Map,e=new z,n=new z;for(const i of[-1,1])e.box(i*1.1,1.1,0,.09,2.2,.09),e.box(i*1.1,.05,0,.09,.1,.9);e.box(0,2.2,0,2.4,.1,.1);for(const i of[-.55,.55])e.box(i,1.4,0,.03,1.6,.03),e.box(i,.6,0,.03,1.6,.03),n.box(i,.55,0,.5,.06,.3);return t.set(it.metal,e),t.set(it.red,n),t}function a1(s){const t=new Map,e=new z,n=new z;for(const i of[-1,1])e.box(i*1.5,.18,0,.16,.36,3);for(const i of[-1,1])e.box(0,.18,i*1.5,3.16,.36,.16);return n.box(0,.1,0,2.9,.2,2.9),t.set(it.wood,e),t.set(it.stone,n),t}function c1(s){const t=new Map,e=new z,n=new z;return e.cyl(0,.2,0,1.5,1.6,.4,14),e.cyl(0,.55,0,.24,.3,.7,8),e.cyl(0,.95,0,.7,.5,.14,12),n.cyl(0,.36,0,1.35,1.35,.06,14),t.set(it.stone,e),t.set(it.waterLight,n),t}function l1(s){const t=new Map,e=new z,n=new z,i=1.5;e.cyl(0,i,0,i,i,.5,14);const o=new z;for(let a=0;a<10;a++){const c=a/10*xt;o.box(Math.cos(c)*i,Math.sin(c)*i,0,.3,.08,.7)}const r=new Wt().makeRotationX(Math.PI/2);return o.applyMatrix(r),He(n,o),n.box(0,1,-1.6,3.2,2,2.4),t.set(it.wood,e),t.set(it.woodDark,n),t}function h1(s){const t=new Map,e=new z,n=new z;for(const i of[-1,1])e.cyl(i*.8,0,0,.06,.07,1.5,6);return e.box(0,1.6,0,1.7,.08,.08),n.box(0,1.35,0,1.6,1.1,.1),t.set(it.woodDark,e),t.set(it.wood,n),t}function d1(s){const t=new Map,e=new z,n=new z;return e.cyl(0,0,0,.05,.07,6.5,6),n.box(.35,5.6,0,.7,.45,.02),t.set(it.gray,e),t.set(it.white,n),t}function u1(s){const t=new Map,e=new z;return e.cyl(0,0,0,.08,.1,.7,8),e.box(0,.75,0,.3,.08,.1),t.set(it.metal,e),t}class f1{constructor(t,e){this.scene=t,this.collision=e,this.interactables=[],this.landmarks=[],this.discovered=new Set,this.signMeshes=kx(),this.dynamic=[]}addInteract(t){const e={id:t.id,x:t.x,z:t.z,y:t.y??j(t.x,t.z),r:t.r??1.7,label:t.label,key:t.key??"e",kind:t.kind??"use",onUse:t.onUse,data:t.data,enabled:t.enabled??(()=>!0),facing:t.facing,prompt:t.prompt,priority:t.priority??0,target:t.target,text:t.text,item:t.item,count:t.count,once:t.once};return this.interactables.push(e),e}build(){Kx(),ue(20250420),this.terrain=nx(),this.scene.add(this.terrain),this.stream=Xh(),this.scene.add(this.stream),Kh(),this.roads=Zh(),this.scene.add(this.roads),this.railway=Gx(this.collision),this.scene.add(this.railway),this.crossing=Vx(this.collision),this.scene.add(this.crossing.group),this.buildings=[],this.buildingById={};for(const t of cs){const e=j(t.x,t.z)-.05,n=Ox(t,e);this.scene.add(n.group),this.buildings.push(n),this.buildingById[t.id]=n;const i=n.bounds;if(this.collision.addBox(i.x,i.z,i.hw,i.hd,i.rot,e+i.floors*3.05+1,e-.5),Bh[t.id]){const o=Math.sin(n.door.facing+Math.PI/2),r=Math.cos(n.door.facing+Math.PI/2);this.addInteract({id:"shop-"+t.id,x:n.door.x+o*1.9,z:n.door.z+r*1.9,y:e,r:1.7,label:`看看${t.name}的柜台`,kind:"shopBuy",data:{shop:t.id},priority:1})}t.enter&&(Vt[t.id]={x:n.door.x,z:n.door.z},Vt[t.id+"Door"]={x:n.door.x,z:n.door.z},this.addInteract({id:"door-"+t.id,x:n.door.x,z:n.door.z,y:e,r:1.9,label:`进入${t.name}`,kind:"enter",target:t.enter,priority:1,facing:n.door.facing}))}return this.dressStations(),this.dressShrine(),this.dressPark(),this.dressSchool(),this.dressHousing(),this.dressStreets(),this.dressForest(),this.dressWater(),this.landmarkMarkers(),this.train=new Xx,this.scene.add(this.train.group),this.trainSystem=new jx(this.train,null),this.crossingCtl=new Zx(this.crossing,null),this.collision.index(),this}dressStations(){const t=ue(11),e=new In("station-props",3),n=new Ct;n.name="station-detail";for(const A of[-18,-2,4]){const w=jt.zAt(A)+7.4;this.placeProp(e,Xr,A,Ye.platform.h,w,Math.PI),this.addInteract({id:"bench-st"+A,x:A,z:w,y:Ye.platform.h,r:1.5,label:"坐下休息",kind:"sit"})}const i=new Ct,o=new O(new Me(1.3,1.75),et(16777215,{map:Yh()})),r=new O(new Ht(1.42,1.87,.09),et(7031354));r.position.z=-.05,i.add(r,o),se(r,.01),i.position.set(-6,Ye.platform.h+1.4,jt.zAt(-6)+2.3),i.rotation.y=Math.PI,n.add(i),this.addInteract({id:"timetable",x:-6,z:jt.zAt(-6)+2.9,y:Ye.platform.h,r:1.6,label:"查看时刻表",kind:"timetable"});const a=new Ct,c=new O(new Me(2.6,.62),et(16777215,{map:Pn({text:"桜町",sub:"SAKURA-MACHI",bg:16052452,fg:3095108,accent:3833758,w:512,h:128,size:76,subSize:22,key:"stname"})})),l=new O(new Ht(2.72,.74,.1),et(4872806));l.position.z=-.06,a.add(l,c),se(l,.01),a.position.set(-14,Ye.platform.h+2.5,jt.zAt(-14)+2.2),a.rotation.y=Math.PI,n.add(a),this.placeProp(e,Lo,2.5,Ye.platform.h,jt.zAt(2.5)+2.6,0),this.placeProp(e,Ol,6,Ye.platform.h,jt.zAt(6)+2.6,0);const h=new Ct,d=new O(new Ne(.3,.3,.1,16),et(16184038));d.rotation.x=Math.PI/2;const u=new O(new ms(.26,16),et(16777215));u.position.z=.06;const f=new O(new Ht(.02,.14,.01),et(3355450));f.position.set(0,.07,.08);const p=new O(new Ht(.17,.025,.01),et(3355450));p.position.set(.08,0,.08),h.add(d,u,f,p),h.position.set(-10,Ye.platform.h+2.5,jt.zAt(-10)+2.1),h.rotation.y=Math.PI,n.add(h),this.clockHands={hh:f,mh:p};const x=new O(new Me(.7,1.05),et(16777215,{map:Al("rail")})),g=new O(new Ht(.8,1.15,.06),et(5923952));g.position.z=-.04;const m=new Ct;m.add(g,x),m.position.set(3,Ye.platform.h+1.5,jt.zAt(3)+2.2),m.rotation.y=Math.PI,n.add(m),this.placeProp(e,Co,-20.5,Ye.platform.h,jt.zAt(-20.5)+2.4,Math.PI),this.addInteract({id:"vend-station",x:-20.5,z:jt.zAt(-20.5)+3.3,y:Ye.platform.h,r:1.5,label:"自动售货机",kind:"vending",data:{price:130}});const _=h1();this.placeProp(e,()=>_,Vt.noticeBoard.x,j(Vt.noticeBoard.x,Vt.noticeBoard.z),Vt.noticeBoard.z,Vt.noticeBoard.rot),this.addInteract({id:"noticeboard",x:Vt.noticeBoard.x,z:Vt.noticeBoard.z+.7,r:2,label:"查看告示板",kind:"notice",priority:2});const b=new Ct;for(let A=0;A<4;A++){const w=new O(new Me(.34,.46),et(16777215,{map:Al(A%2?"town":"festival")}));w.position.set(-.5+A*.34,1.35+A%2*.06,.06),w.rotation.z=(A-1.5)*.04,b.add(w)}b.position.set(Vt.noticeBoard.x,0,Vt.noticeBoard.z),b.rotation.y=Vt.noticeBoard.rot,n.add(b);const y=[4157340,10243935,5209948,9075274];for(let A=0;A<5;A++){const w=-18+A*1.5,R=21.4;this.placeProp(e,Po,w,0,R,.2+A*.4,1,y[A%y.length]),this.collision.addCircle(w,R,.4,1.2,-.2)}this.placeProp(e,Ol,-15.5,0,21.4,0);for(const[A,w]of[[-20,26.5],[-2,26.5],[3,24]])this.placeProp(e,ts,A,j(A,w),w,t()*xt,.85),this.collision.addCircle(A,w,.4,3,-.3);for(const[A,w]of[[-17,27.6],[1.5,27.6],[-4.5,23.4]])this.placeProp(e,Do,A,j(A,w),w,t()*xt,1);this.scene.add(n),this.scene.add(e.build({outline:.009}).group)}dressShrine(){const t=ue(22),e=new In("shrine-props",3),n=new Ct,i=j(Vt.torii.x,Vt.torii.z),o=e1(t,1);this.placeProp(e,()=>o,Vt.torii.x,i,Vt.torii.z,0,1),this.collision.addCircle(Vt.torii.x-1.75,Vt.torii.z,.3,4.4,0),this.collision.addCircle(Vt.torii.x+1.75,Vt.torii.z,.3,4.4,0);for(let r=0;r<6;r++){const a=r/5,c=ft(33,25,a)+(r%2?2.6:-2.6),l=ft(-12,-44,a);this.placeProp(e,Fl,c,j(c,l),l,0,.9+t()*.2),this.collision.addCircle(c,l,.35,1.6,-.2)}for(const r of[-1,1])for(let a=0;a<2;a++){const c=Vt.shrineGate.x+r*(7+a*2.6),l=-51+a*1.4;this.placeProp(e,Fl,c,j(c,l),l,0,1)}{const r=new Ct,a=new z;for(let c=0;c<8;c++){const l=c/7,h=ft(14,34,l),d=j(h,-47)+3.4-Math.sin(l*Math.PI)*.7;a.box(h,d,-47,2.6,.16,.16,1)}r.add(new O(a.toGeometry(),et(14208922)));for(let c=0;c<4;c++){const l=new O(new Di(.12,.4,4),et(16184558));l.position.set(ft(16,32,c/3),j(0,-47)+2.9,-47),r.add(l)}n.add(r)}{const r=new Ct;for(let c=0;c<3;c++){const l=new O(new Ht(.12,1.3,.12),et(7031342));l.position.set(-1.4+c*1.4,.65,0),r.add(l)}const a=new O(new Ht(3.2,1,.1),et(14206106));a.position.set(0,1.35,0),se(a,.01),r.add(a);for(let c=0;c<8;c++){const l=new O(new Ht(.22,.3,.04),et(c%2?15787216:15257776));l.position.set(-1.3+c%4*.86,1.2-Math.floor(c/4)*.42,.07),r.add(l)}r.position.set(33,j(33,-50),-50),r.rotation.y=-.5,n.add(r),this.collision.addBox(33,-50,1.7,.4,0,j(33,-50)+1.9,0)}{const r=new z,a=new z;a.box(0,2.1,0,2.4,.16,2);for(const l of[-1,1])for(const h of[-1,1])r.cyl(l*1,0,h*.8,.08,.08,2.1,6);r.box(0,.5,0,1.4,.1,.9),r.box(0,.55,-.4,1.4,.14,.1);const c=new Ct;c.add(new O(a.toGeometry(),et(5917242)),new O(r.toGeometry(),et(7031342))),c.position.set(29,j(29,-46.5),-46.5),c.rotation.y=-.3,n.add(c),this.addInteract({id:"chozuya",x:29,z:-45.6,y:j(29,-46.5),r:1.5,label:"掬水（洗手）",kind:"water"})}this.addInteract({id:"shrine-altar",x:Vt.shrineGate.x,z:-48.6,y:j(24,-48.6),r:2,label:"参拜",kind:"offer",priority:1});{const r=new Ct,a=new z;a.box(0,1.3,0,4.4,2.6,3.4),a.box(0,2.75,0,5,.22,4),r.add(new O(a.toGeometry(),et(14734524))),r.position.set(32.5,j(32.5,-55),-55),n.add(r);const c=new O(new Ht(5.4,.3,4.4),et(4868690));c.position.set(0,2.95,0),r.add(c),se(c,.012),this.collision.addBox(32.5,-55,2.4,1.8,0,j(32.5,-55)+3,0)}for(let r=0;r<10;r++){const a=r/9,c=ft(-14,-44,a),l=ft(33.4,25,a);for(const h of[-1,1]){const d=l+h*(4.2+t()*1.4);this.placeProp(e,ts,d,j(d,c),c,t()*xt,.75+t()*.3),this.collision.addCircle(d,c,.35,3,-.3)}}this.buildLookout(e,n),this.scene.add(n),this.scene.add(e.build({outline:.011}).group)}buildLookout(t,e){const{x:n,z:i}=Vt.lookout,o=j(n,i),r=new z;r.box(0,0,0,5.2,.24,3.6);const a=new O(r.toGeometry(),et(11041098));a.position.set(n,o+.12,i),se(a,.012),e.add(a);for(const u of[-1,1])for(const f of[-1,1]){const p=new O(new Ht(.3,o+.4,.3),et(7031342));p.position.set(n+u*2.2,(o+.4)/2-.2,i+f*1.4),e.add(p)}const c=new z;for(let u=0;u<=12;u++){const f=n-2.5+u/12*5;c.box(f,o+.7,i-1.75,.1,.9,.1)}for(let u=0;u<=8;u++){const f=i-1.75+u/8*3.5;c.box(n-2.5,o+.7,f,.1,.9,.1),c.box(n+2.5,o+.7,f,.1,.9,.1)}c.box(n,o+1.12,i-1.75,5.1,.1,.1),c.box(n,o+.78,i-1.75,5.1,.08,.08),e.add(new O(c.toGeometry(),et(7031342)));const l=new O(new Me(.9,.6),et(16777215,{map:Pn({text:"見晴台",sub:"SAKURA-MACHI",bg:15261900,fg:4872772,accent:7047770,w:384,h:256,size:62,subSize:20,key:"lookout"})})),h=new O(new Ht(1,.7,.08),et(7031342));h.position.z=-.05;const d=new Ct;d.add(h,l),d.position.set(n+1.8,o+1.1,i+1),d.rotation.y=-.5,e.add(d),this.addInteract({id:"lookout-sign",x:n+1.5,z:i+1.2,y:o,r:1.4,label:"眺望小镇",kind:"view"}),this.addInteract({id:"lookout",x:n,z:i,y:o,r:2,label:"眺望",kind:"view"}),this.collision.addCircle(n+1.9,i+1.1,.2,1.4,0)}dressPark(){const t=ue(33),e=new In("park-props",3),n=new Ct,i=-32,o=76;this.placeProp(e,a1,i-12,j(i-12,o-2),o-2,.2),this.placeProp(e,o1,i-7,j(i-7,o-3),o-3,-.4),this.placeProp(e,r1,i-2.5,j(i-2.5,o-4),o-4,.3),this.addInteract({id:"swing",x:i-2.5,z:o-4,y:j(i-2.5,o-4),r:1.8,label:"荡秋千",kind:"swing"}),this.placeProp(e,c1,i+3,j(i+3,o-6),o-6,0),this.addInteract({id:"fountain",x:i+3,z:o-5,y:j(i+3,o-6),r:1.6,label:"看看喷泉",kind:"look"});{const r=new Ct,a=new z,c=5.2,l=14;for(let u=0;u<l;u++){const f=u/l*xt,p=(u+1)/l*xt,x=c*(.8+Math.sin(u*2.1)*.14),g=c*(.8+Math.sin((u+1)*2.1)*.14),m=new D(Math.cos(f)*x,0,Math.sin(f)*x),_=new D(Math.cos(p)*g,0,Math.sin(p)*g),b=m.clone().add(_).multiplyScalar(.5),y=m.distanceTo(_)+.3,A=Math.atan2(_.x-m.x,_.z-m.z),w=new z;w.box(0,-.18,0,.6,.5,y,1);const R=new Wt().makeRotationY(A);R.setPosition(b.x,0,b.z),w.applyMatrix(R),He(a,w)}const h=new O(a.toGeometry(),et(9077880));r.add(h);const d=new O(new ms(c*.9,16),et(7317700,{transparent:!0,opacity:.85}));d.rotation.x=-Math.PI/2,d.position.y=-.12,r.add(d),r.position.set(i+11,j(i+11,o+3)+.02,o+3),n.add(r),this.collision.addCircle(i+11,o+3,c*.95,.4,-1),this.addInteract({id:"pond",x:i+11,z:o+3,y:j(i+11,o+3),r:2.2,label:"池边",kind:"look"})}for(let r=0;r<22;r++){const a=t()*xt,c=5+t()*11,l=i+Math.cos(a)*c*1.4,h=o+Math.sin(a)*c;Math.abs(l-(i+11))<6&&Math.abs(h-(o+3))<6||(this.placeProp(e,ts,l,j(l,h),h,t()*xt,.9+t()*.5),this.collision.addCircle(l,h,.4,3.4,-.3))}for(let r=0;r<26;r++){const a=t()*xt,c=2+t()*15,l=i+Math.cos(a)*c*1.5,h=o+Math.sin(a)*c;this.placeProp(e,Wr,l,j(l,h),h,t()*xt,.8+t()*.6)}for(let r=0;r<90;r++){const a=t()*xt,c=2+t()*17,l=i+Math.cos(a)*c*1.6,h=o+Math.sin(a)*c;this.placeProp(e,Nl,l,j(l,h),h,t()*xt,.9+t()*.5)}for(const[r,a,c]of[[Vt.benchPark.x,Vt.benchPark.z,Math.PI],[i-6,o+2,0],[i+6,o+1,.3],[i+1,o-8,2.2]])this.placeProp(e,Xr,r,j(r,a),a,c),this.addInteract({id:"bench-p"+r+"_"+a,x:r,z:a,y:j(r,a),r:1.5,label:"坐下休息",kind:"sit"});for(const[r,a]of[[i-9,o+5],[i+7,o-8],[i+12,o+8]])this.placeProp(e,Ro,r,j(r,a),a,.6);this.placeProp(e,Lo,i-5.4,j(i-5.4,o+2.6),o+2.6,0);{const r=new z;r.box(0,.2,0,1.5,.4,1.5),r.box(0,1.3,0,.8,1.8,.6),r.box(0,2.3,0,1,.2,.8);const a=new Ct;a.add(new O(r.toGeometry(),et(10130308))),a.position.set(i+15,j(i+15,o-8),o-8),n.add(a),se(a.children[0],.012),this.collision.addBox(i+15,o-8,.6,.5,0,3,0),this.addInteract({id:"monument",x:i+15,z:o-7,y:j(i+15,o-8),r:1.5,label:"看看碑",kind:"look"})}{const r=new Ct,a=new O(new Me(1.3,.55),et(16777215,{map:Pn({text:"河童公園",sub:"KAPPA PARK",bg:15003358,fg:3824186,accent:7047770,w:512,h:224,size:70,subSize:22,key:"park"})})),c=new O(new Ht(1.42,.66,.09),et(5925706));c.position.z=-.05;const l=new O(new Ht(.1,1.6,.1),et(5925706));l.position.y=-1,r.add(c,a,l),r.position.set(i-2,j(i-2,o-11),o-11),r.rotation.y=.2,n.add(r),this.collision.addBox(i-2,o-11,.15,.15,0,2.2,0)}this.placeProp(e,Co,i-10.5,j(i-10.5,o+3.2),o+3.2,1.2),this.addInteract({id:"vend-park",x:i-10.5,z:o+3.9,y:j(i-10.5,o+3.2),r:1.5,label:"自动售货机",kind:"vending",data:{price:130}}),this.scene.add(n),this.scene.add(e.build({outline:.011}).group)}dressSchool(){const t=ue(44),e=new In("school-props",1),n=new Ct,i=-80,o=72;{const r=new z;for(const l of[-1,1])r.box(l*2.6,1.6,0,.5,3.2,.5);r.box(0,3.3,0,6,.35,.5);const a=new Ct;a.add(new O(r.toGeometry(),et(13620440)));const c=new O(new Me(3.2,.8),et(16777215,{map:Pn({text:"桜町小学校",bg:15922422,fg:3095108,accent:11553338,w:512,h:128,size:68,key:"school"})}));c.position.set(0,3.3,.27),a.add(c),a.position.set(i,j(i,o),o),n.add(a),se(a.children[0],.012),this.collision.addBox(i-2.6,o,.3,.3,0,3.4,0),this.collision.addBox(i+2.6,o,.3,.3,0,3.4,0)}this.placeProp(e,d1,i+6,j(i+6,o+6),o+6,0);{const r=new z,a=new z;a.box(0,1.5,0,6.4,.14,3.2);for(const l of[-1,1])for(const h of[-1,1])r.cyl(l*3,0,h*1.4,.07,.07,1.5,6);const c=new Ct;c.add(new O(a.toGeometry(),et(7172736)),new O(r.toGeometry(),et(12633288))),c.position.set(i-9,j(i-9,o+3),o+3),n.add(c);for(let l=0;l<5;l++){const h=i-11.4+l*1.1;this.placeProp(e,Po,h,j(h,o+3),o+3,.1*l,.95)}}for(let r=0;r<8;r++){const a=i-14+r*4.2,c=o+9.5;this.placeProp(e,kl,a,j(a,c),c,t()*xt,1.1),this.collision.addCircle(a,c,.4,3.6,-.3)}this.addInteract({id:"school-gate",x:i,z:o+1.4,y:j(i,o),r:2.2,label:"校门",kind:"look"}),this.scene.add(n),this.scene.add(e.build({outline:0}).group)}dressHousing(){const t=ue(55),e=new In("house-props",2),n=new Ct,i=cs.filter(r=>r.kind==="house"),o=[4157340,10243935,5209948,9075274,7035530];for(const r of i){r.x,r.z;const a=ka(r,0,r.d/2+1);if(this.placeProp(e,Qx,a.x+1.6,j(a.x+1.6,a.z+.4),a.z+.4,r.rot,.9),t()<.75){const c=a.x+(t()<.5?-2.4:2.4),l=a.z+.2;this.placeProp(e,Po,c,j(c,l),l,r.rot+t()*.4-.2,.95,o[Math.floor(t()*o.length)]),this.collision.addCircle(c,l,.4,1.2,-.2)}if(t()<.6){const c=a.x+2.6,l=a.z-.3;this.placeProp(e,Do,c,j(c,l),l,t()*xt,.9)}if(t()<.55){const c=a.x-2.8,l=a.z-.5;this.placeProp(e,Lo,c,j(c,l),l,t()*xt,.9)}if(t()<.5){const c=r.x+(t()-.5)*4,l=r.z-r.d/2-2.2;this.placeProp(e,n1,c,j(c,l),l,r.rot+Math.PI/2,.9)}for(let c=0;c<4;c++){const l=(c+.5)/4,h=ft(r.x-r.w/2-1.2,r.x+r.w/2+1.2,l),d=r.z+Math.sin(r.rot)*0+(r.rot===0,1*(r.d/2+1.2));this.placeProp(e,Wr,h,j(h,d),d,t()*xt,.85)}if(t()<.5){const c=r.x+r.w/2+2.2,l=r.z+r.d/2+1.6;this.placeProp(e,Ro,c,j(c,l),l,r.rot+Math.PI)}}for(const r of cs.filter(a=>a.kind==="shop"||a.kind==="cafe")){const a=ka(r,0,r.d/2+1);if(t()<.8){const c=a.x+(t()<.5?-3.4:3.4),l=a.z+.4;this.placeProp(e,Po,c,j(c,l),l,t()*xt,.95,o[Math.floor(t()*o.length)]),this.collision.addCircle(c,l,.4,1.2,-.2)}if(t()<.5){const c=a.x+3,l=a.z+.6;this.placeProp(e,Do,c,j(c,l),l,t()*xt,1)}}this.scene.add(n),this.scene.add(e.build({outline:0}).group)}dressStreets(){const t=ue(66),e=new In("street-props",2),n=new Ct,i=[{pts:[[-40,24.2],[10,24.2],[46,24.2]],ry:0},{pts:[[-40,35.8],[10,35.8],[46,35.8]],ry:Math.PI}];this.poles=[];for(const o of i){const r=[];for(let a=0;a<o.pts.length-1;a++){const[c,l]=o.pts[a],[h,d]=o.pts[a+1],u=Math.hypot(h-c,d-l),f=Math.round(u/17);for(let p=0;p<f;p++){const x=p/f;r.push([ft(c,h,x),ft(l,d,x)])}}r.push(o.pts[o.pts.length-1]);for(let a=0;a<r.length;a++){const[c,l]=r[a],h=j(c,l),d=t()<.35;if(this.placeProp(e,Jx,c,h,l,o.ry,1,d),this.collision.addCircle(c,l,.22,8,0),this.poles.push({x:c,y:h,z:l,ry:o.ry}),a<r.length-1){const[u,f]=r[a+1];for(let p=0;p<3;p++){const x=(p-1)*.62,g=p1(c,h+6.9,l,u,h+6.9,f,1.1,x);e.push(it.dark,g,null)}}}}for(let o=-78;o<=46;o+=15)for(const r of[23.2,36.8])r===36.8&&o>34||(this.placeProp(e,Ro,o,j(o,r),r,r<30?Math.PI:0),this.collision.addCircle(o,r,.18,4.2,0));for(const[o,r,a]of[[-44,27,Math.PI],[-40,55,0],[-28,55,0],[-16,55,0],[-10,24,Math.PI],[-10,27.6,0],[34,24,Math.PI],[34,14,0],[34,-5,Math.PI],[-70,38,-.8]])this.placeProp(e,Ro,o,j(o,r),r,a),this.collision.addCircle(o,r,.18,4.2,0);for(const[o,r,a]of[[6,33.6,Math.PI],[26,33.6,Math.PI],[40,24.4,0]])this.placeProp(e,Xr,o,j(o,r),r,a),this.addInteract({id:"bench-m"+o,x:o,z:r,y:j(o,r),r:1.5,label:"坐下休息",kind:"sit"});for(const[o,r]of[[4,33.6],[24,33.6],[42,24.4],[-16,33.6],[-34,24.4]])this.placeProp(e,Lo,o,j(o,r),r,0);for(const[o,r]of[[0,33.4],[16,33.4],[30,33.4],[44,24.4],[-10,33.4],[-24,33.4],[-40,33.4],[-56,33.4]])this.placeProp(e,Do,o,j(o,r),r,0,1.1);this.placeProp(e,Co,30,j(30,24.3),24.3,0),this.addInteract({id:"vend-main",x:30,z:25.2,y:j(30,24.3),r:1.5,label:"自动售货机",kind:"vending",data:{price:130}}),this.placeProp(e,Co,2,j(2,24.3),24.3,0),this.addInteract({id:"vend-main2",x:2,z:25.2,y:j(2,24.3),r:1.5,label:"自动售货机",kind:"vending",data:{price:130}});for(let o=-6;o<=8;o+=2){for(const a of[-1,1]){const c=Ie.x+a*6.4;this.placeProp(e,qr,c,j(c,o),o,0)}const r=new z;r.box(Ie.x-6.4,j(Ie.x-6.4,o)+.62,o,.09,.24,2),r.box(Ie.x+6.4,j(Ie.x+6.4,o)+.62,o,.09,.24,2),n.add(new O(r.toGeometry(),et(11054517)))}this.placeProp(e,Bl,-16,j(-16,26.8),26.8,0),this.collision.addBox(-16,26.8,1.6,.7,0,2.4,0),this.placeProp(e,Bl,30,j(30,26.8),26.8,Math.PI),this.collision.addBox(30,26.8,1.6,.7,0,2.4,0);for(const[o,r,a,c,l,h]of[[30.5,9.5,.3,"止まれ","",13650506],[37.5,-7.5,3.4,"踏切注意","",15911244],[-13,22.5,.2,"駅前","STATION",4882357],[36,27.5,Math.PI,"注意","LOOK BOTH WAYS",15911244]]){const d=t1(c,l,h);this.placeProp(e,()=>d,o,j(o,r),r,a,1),this.collision.addCircle(o,r,.12,1.8,0)}this.placeProp(e,i1,28.4,j(28.4,6),6,1.2),this.placeProp(e,s1,20,j(20,26.4),26.4,0),this.placeProp(e,u1,-4,j(-4,26.5),26.5,0),this.addInteract({id:"watertap",x:-4,z:27.1,y:j(-4,26.5),r:1.2,label:"水龙头",kind:"water"}),this.scene.add(n),this.scene.add(e.build({outline:0}).group)}offsetLast(){}dressForest(){const t=ue(77),e=new In("forest",5),n=new In("undergrowth",5);for(let i=-80;i<=48;i+=7.5){if(Math.abs(i-34)<9)continue;const o=25.6;Ua(i,o)<3||(this.placeProp(e,ts,i,j(i,o),o,t()*xt,.8+t()*.35),this.collision.addCircle(i,o,.35,3.2,-.3))}for(let i=-76;i<=46;i+=9)this.placeProp(e,ts,i,j(i,34.4),34.4,t()*xt,.75+t()*.3),this.collision.addCircle(i,34.4,.35,3.2,-.3);for(let i=34;i<=52;i+=6)for(const o of[-47,-41])this.placeProp(e,ts,o,j(o,i),i,t()*xt,.7),this.collision.addCircle(o,i,.35,3,-.3);for(let i=0;i<520;i++){const o=t()*xt,r=70+Math.pow(t(),.55)*96,a=Math.cos(o)*r,c=Math.sin(o)*r;if(Math.abs(c-jt.zAt(a))<16||$o(a,c)<5)continue;Qg(a,c);const l=j(a,c);if(l>52)continue;const h=l>22?Ul:t()<.55?kl:Ul;this.placeProp(e,h,a,l,c,t()*xt,.9+t()*.8)}for(let i=0;i<700;i++){const o=t()*xt,r=24+Math.pow(t(),.6)*130,a=Math.cos(o)*r,c=Math.sin(o)*r;if(Ua(a,c)<2.4||Math.abs(c-jt.zAt(a))<5||$o(a,c)<3.4)continue;const l=j(a,c);l>40||this.placeProp(n,t()<.45?Nl:Wr,a,l,c,t()*xt,.8+t()*.7)}for(let i=0;i<70;i++){const o=t()*xt,r=Math.sqrt(t())*9,a=84+Math.cos(o)*r,c=22+Math.sin(o)*r,l=j(a,c),h=new z,d=6+t()*4;h.cyl(0,d/2,0,.06,.08,d,5);const u=new z;for(let f=0;f<3;f++)u.sphere(0,d*(.68+f*.11),0,.55-f*.11,1,.3,f+t()*5);this.placeProp(e,()=>new Map([[it.bamboo,h],[it.leafDark,u]]),a,l,c,t()*xt,1),this.collision.addCircle(a,c,.2,5,0)}this.scene.add(e.build({outline:.011,receiveShadow:!0}).group),this.scene.add(n.build({outline:0,castShadow:!1,receiveShadow:!0}).group)}dressWater(){const t=ue(88),e=new In("water-props",2),n=new Ct;{const{x:i,z:o}=Vt.waterwheel,r=j(i,o),a=l1(),c=new Ct;for(const[l,h]of a){const d=new O(h.toGeometry(),l);c.add(d),se(d,.011)}c.position.set(i,r,o),c.rotation.y=.3,n.add(c),this.waterwheel=c,this.collision.addBox(i,o-1.6,1.7,1.3,.3,r+2.2,0),this.collision.addCircle(i+1.2,o+.8,1.3,1.8,0),this.addInteract({id:"waterwheel",x:i+1.8,z:o+1.2,y:r,r:1.8,label:"看看水车",kind:"waterwheel"})}for(let i=0;i<90;i++){const o=Math.floor(t()*(Ii.pts.length-1)),[r,a]=Ii.pts[o],[c,l]=Ii.pts[o+1],h=t(),d=ft(r,c,h),u=ft(a,l,h);if(Math.hypot(d,u)>150)continue;const f=(t()<.5?-1:1)*(3.2+t()*3.5);let p=c-r,x=l-a;const g=Math.hypot(p,x)||1;p/=g,x/=g;const m=d-x*f,_=u+p*f,b=j(m,_);if(b<-3.5||b>12)continue;const y=new z,A=.4+t()*1.1;y.sphere(0,A*.4,0,A,1,.3,t()*9),this.placeProp(e,()=>new Map([[it.stone,y]]),m,b-A*.2,_,t()*xt,1),A>.9&&this.collision.addCircle(m,_,A*.8,.9,-.3)}{const{x:i,z:o}=Vt.hut,r=j(i,o),a=new z,c=new z;a.box(0,1.3,0,6.4,2.6,5),c.box(0,2.75,0,7,.3,5.6);const l=new z;l.addQuad(-3.5,2.9,2.8,3.5,2.9,2.8,3.5,4,0,-3.5,4,0,3,2),l.addQuad(3.5,2.9,-2.8,-3.5,2.9,-2.8,-3.5,4,0,3.5,4,0,3,2);const h=new Ct;h.add(new O(a.toGeometry(),et(10127984))),h.add(new O(c.toGeometry(),et(5917242)));const d=new O(l.toGeometry(),et(4865850));h.add(d);for(const f of h.children)se(f,.012);h.position.set(i,r,o),h.rotation.y=.24,n.add(h),this.collision.addBox(i,o,3.4,2.7,.24,r+3,0);const u=new O(new Ht(1,1.9,.1),et(4863268));u.position.set(0,.95,2.52),u.rotation.y=.24,u.position.applyAxisAngle(new D(0,1,0),0),h.add(u),this.addInteract({id:"hut-door",x:i+Math.sin(.24)*2.9,z:o+Math.cos(.24)*2.9,y:r,r:1.6,label:"旧屋的门",kind:"look"})}for(const[i,o]of[[59,7.5],[74,.5]])this.placeProp(e,qr,i,j(i,o),o,0),this.placeProp(e,qr,i,j(i,o),o+1.6,0);this.scene.add(n),this.scene.add(e.build({outline:0}).group)}landmarkMarkers(){for(const t of _i)this.landmarks.push({...t,y:j(t.x,t.z)})}placeProp(t,e,n,i,o,r=0,a=1,...c){const l=ue((Math.abs(n*131+o*77)|0)+3),h=e(l,a,...c);if(!h)return;const d=Jh(n,i,o,r,a,a,a);for(const[u,f]of h)f&&f.count&&t.push(u,f,d)}update(t,e,n){if(this.clockHands){const o=e.hour,r=o%1*60;this.clockHands.hh.rotation.z=-(o%12/12)*xt,this.clockHands.mh.rotation.z=-(r/60)*xt}this.waterwheel&&(this.waterwheel.rotation.z+=t*.55);const i=n?n.nightT:0;for(const o of this.signMeshes){const r=i>.3?1:0;o.material.emissive.setScalar(r*.55),o.material.emissiveIntensity=r*.9}}}function p1(s,t,e,n,i,o,r=1.1,a=0){const c=new z;let l=n-s,h=o-e;const d=Math.hypot(l,h)||1,u=-h/d,f=l/d,p=8,x=s+u*a,g=e+f*a,m=n+u*a,_=o+f*a,b=new D,y=new D,A=new D;for(let w=0;w<p;w++){const R=w/p,E=(w+1)/p,v=ft(x,m,R),M=ft(g,_,R),C=ft(x,m,E),L=ft(g,_,E),I=t-Math.sin(R*Math.PI)*r,H=i-Math.sin(E*Math.PI)*r;b.set(C-v,H-I,L-M);const V=b.length()+.02;b.normalize(),y.set(0,1,0).cross(b),y.lengthSq()<1e-6&&y.set(1,0,0),y.normalize(),A.copy(b).cross(y).normalize();const B=new z;B.box(0,0,V/2,.028,.028,V,1);const Z=new Wt().makeBasis(y,A,b);Z.setPosition(v,I,M),B.applyMatrix(Z),He(c,B)}return c}class m1{constructor(){this.nodes=[],this.adj=[]}add(t,e,n=null,i="world"){const o=i==="world"?j(t,e):0,r=this.nodes.length;return this.nodes.push({x:t,y:o,z:e,tag:n,zone:i,edges:[]}),r}link(t,e){if(t===e)return;const n=this.nodes[t],i=this.nodes[e];if(n.zone!==i.zone)return;const o=bn(n.x,n.z,i.x,i.z);o>30||(n.edges.some(r=>r.n===e)||n.edges.push({n:e,d:o}),i.edges.some(r=>r.n===t)||i.edges.push({n:t,d:o}))}nearest(t,e,n="world",i=null){let o=-1,r=1e9;for(let a=0;a<this.nodes.length;a++){const c=this.nodes[a];if(c.zone!==n||i&&!i(c))continue;const l=bn(t,e,c.x,c.z);l<r&&(r=l,o=a)}return{i:o,d:r}}connectToNearest(t,e,n=9,i="world"){const o=this.nearest(t,e,i);if(o.i>=0&&o.d<=n)return o.i;const r=this.add(t,e,null,i);return this.link(r,o.i),r}path(t,e){if(t<0||e<0)return null;if(t===e)return[t];const n=this.nodes.length,i=new Float32Array(n).fill(1/0),o=new Float32Array(n).fill(1/0),r=new Int32Array(n).fill(-1),a=[t],c=new Uint8Array(n),l=this.nodes[e],h=d=>bn(this.nodes[d].x,this.nodes[d].z,l.x,l.z);for(i[t]=0,o[t]=h(t);a.length;){let d=0;for(let f=1;f<a.length;f++)o[a[f]]<o[a[d]]&&(d=f);const u=a.splice(d,1)[0];if(u===e){const f=[];let p=u;for(;p!==-1;)f.push(p),p=r[p];return f.reverse()}c[u]=1;for(const f of this.nodes[u].edges){if(c[f.n])continue;const p=i[u]+f.d;p<i[f.n]&&(r[f.n]=u,i[f.n]=p,o[f.n]=p+h(f.n),a.includes(f.n)||a.push(f.n))}}return null}}function g1(){const s=new m1;for(const e of qs){const n=[];for(let o=0;o<e.pts.length-1;o++){const[r,a]=e.pts[o],[c,l]=e.pts[o+1],h=Math.hypot(c-r,l-a),d=Math.max(1,Math.round(h/4.5));for(let u=0;u<d;u++){const f=u/d,p=s.add(ft(r,c,f),ft(a,l,f),"road");n.push(p)}}const i=s.add(e.pts[e.pts.length-1][0],e.pts[e.pts.length-1][1],"road");n.push(i);for(let o=0;o<n.length-1;o++)s.link(n[o],n[o+1])}{const e=[];for(let n=-96;n<=96;n+=5){const i=jt.zAt(n)+4;e.push(s.add(n,i,"track"))}for(let n=0;n<e.length-1;n++)s.link(e[n],e[n+1]);s.connectToNearest(Ie.x,Ie.z+6.5,12),s.connectToNearest(-6,jt.zAt(-6)+6.2,12)}{const e=s.nodes.length;for(let n=0;n<e;n++)for(let i=n+1;i<e;i++){const o=s.nodes[n],r=s.nodes[i];if(o.zone!==r.zone||o.edges.some(l=>l.n===i))continue;const a=o.x-r.x,c=o.z-r.z;a*a+c*c<3.6*3.6&&s.link(n,i)}}const t=(e,n,i,o=18)=>{const r=s.add(e,n,i),a=[];for(let c=0;c<s.nodes.length;c++){if(c===r)continue;const l=bn(e,n,s.nodes[c].x,s.nodes[c].z);l<o&&a.push([l,c])}a.sort((c,l)=>c[0]-l[0]);for(const[c,l]of a.slice(0,3))s.link(r,l);return r};for(const e of _i)t(e.x,e.z,"lm:"+e.id,20);for(const[e,n]of Object.entries(Vt))t(n.x,n.z,"anchor:"+e,20);for(const e of cs)t(e.x,e.z+e.d/2+2.2,"bld:"+e.id,20);t(0,36.5,"shop:konbini",18),t(13,36.5,"shop:cafe",18),t(-10,20,"shop:station",18),t(30,24,"street:main",18),t(-10,28,"street:station",18),t(-32,52,"street:residential",18),t(-32,76,"park:center",20),t(-8,jt.zAt(-8)+6.2,"platform",16),t(-2.2,22.6,"board",14);for(let e=0;e<s.nodes.length;e++){if(s.nodes[e].edges.length)continue;const n=s.nodes[e],i=s.nearest(n.x,n.z,n.zone);i.i>=0&&i.d<26&&s.link(e,i.i)}return s.indexByTag={},s.nodes.forEach((e,n)=>{e.tag&&s.indexByTag[e.tag]===void 0&&(s.indexByTag[e.tag]=n)}),s}const Y={};function x1(){const s=(n,i)=>et(n,i);Y.wood=s(11895893),Y.woodDark=s(8017462),Y.woodLight=s(14200963),Y.bamboo=s(13350538),Y.wall=s(15986144),Y.wallAccent=s(15129800),Y.wallWood=s(14206112),Y.white=s(16447730),Y.ceil=et(16184298,{side:rn}),Y.wall2=et(15130056,{side:rn}),Y.wallWood2=et(13482132,{side:rn}),Y.cream=s(16183261),Y.metal=s(11844032),Y.metalDark=s(6975608),Y.black=s(3355451),Y.gray=s(9276822),Y.fabric=s(8229800),Y.fabricWarm=s(12882047),Y.leaf=s(6262610),Y.leafDark=s(4221244),Y.ceramic=s(15789282),Y.red=s(13127756),Y.blue=s(4882357),Y.yellow=s(15515728),Y.green=s(6265954),Y.sakura=s(ot.sakura),Y.tatami=s(16777215,{map:yx()}),Y.floorWood=s(16777215,{map:Mx()}),Y.floorTile=s(16777215,{map:bx()}),Y.counter=s(15920868),Y.glow=s(16774880),Cn(Y.glow,{night:new Nt(16773324),nightIntensity:2,threshold:-1}),Y.glass=s(14083822,{transparent:!0,opacity:.42,depthWrite:!1}),Y.screen=s(1778736),Y.paper=s(16184038);const t=Rl("snack").clone();t.needsUpdate=!0,Y.shelfSnack=s(16777215,{map:t});const e=Rl("coffee").clone();e.needsUpdate=!0,Y.shelfCoffee=s(16777215,{map:e})}function Yt(s,t,e){s.has(t)||s.set(t,new z),He(s.get(t),e)}function ei(s,t=Y.wood){const e=new Map,n=new z;n.box(0,.44,0,.42,.05,.42,1),n.box(0,.66,-.19,.4,.42,.05,1);for(const i of[-1,1])for(const o of[-1,1])n.box(i*.17,.22,o*.17,.05,.44,.05,1);return Yt(e,t,n),e}function _1(s){const t=new Map,e=new z;return e.cyl(0,.36,0,.17,.17,.06,10),e.cyl(0,.18,0,.05,.05,.36,6),e.cyl(0,.03,0,.16,.18,.04,10),Yt(t,Y.woodDark,e),t}function Na(s,t=1.2,e=.8,n=.74,i=Y.wood){const o=new Map,r=new z;r.box(0,n,0,t,.06,e,1);for(const a of[-1,1])for(const c of[-1,1])r.box(a*(t/2-.08),n/2,c*(e/2-.08),.06,n,.06,1);return Yt(o,i,r),o}function Hl(s){const t=new Map,e=new z;e.box(0,.36,0,.9,.05,.9,1);for(const n of[-1,1])for(const i of[-1,1])e.box(n*.38,.18,i*.38,.06,.36,.06,1);return Yt(t,Y.woodDark,e),t}function v1(s){const t=new Map,e=new z,n=new z;e.box(0,.22,0,1.9,.32,.8,1),e.box(0,.52,-.36,1.9,.7,.14,1),e.box(-.92,.5,0,.14,.56,.8,1),e.box(.92,.5,0,.14,.56,.8,1);for(const i of[-.42,.42])n.box(i,.46,.04,.78,.14,.66,1);for(const i of[-1,1])for(const o of[-1,1])e.box(i*.85,.05,o*.32,.08,.1,.08,1);return Yt(t,Y.fabric,e),Yt(t,Y.fabricWarm,n),t}function y1(s){const t=new Map,e=new z,n=new z;return e.box(0,.3,0,1.2,.62,.08,1),e.box(0,.05,0,.5,.1,.3,1),e.box(0,.15,0,.16,.2,.14,1),n.box(0,.3,-.05,1.1,.52,.02,1),Yt(t,Y.black,e),Yt(t,Y.screen,n),t}function Ys(s,t=1.2,e=1.8,n=.35,i=Y.wood,o=!0,r=null){const a=new Map,c=new z,l=new z;c.box(0,e/2,-n/2,t,e,.05,1),c.box(-t/2+.03,e/2,0,.06,e,n,1),c.box(t/2-.03,e/2,0,.06,e,n,1);const h=4;for(let d=1;d<=h;d++)c.box(0,e/(h+1)*d,0,t-.1,.04,n,1);if(o)for(let d=0;d<h;d++){const u=e/(h+1)*d+e/(h+1)/2+.03,f=(t-.3)/5-.05,p=.22,x=(t-.3-2*f)/4;for(let g=0;g<5;g++)l.box(-t/2+.15+f/2+g*x,u,.02,f,p,n-.1,1/f,1/p)}return Yt(a,i,c),o&&Yt(a,r||Y.shelfSnack,l),a}function sc(s,t=4,e=.7,n=.95){const i=new Map,o=new z,r=new z;return o.box(0,n/2,0,t,n,e,.8),r.box(0,n+.03,0,t+.12,.06,e+.1,1),Yt(i,Y.counter,o),Yt(i,Y.woodDark,r),i}function Qh(){const s=new Map,t=new z,e=new z;return t.box(0,.16,0,.34,.32,.3,1),e.box(0,.44,-.02,.3,.24,.04,1),e.box(.2,.36,.05,.22,.1,.16,1),Yt(s,Y.cream,t),Yt(s,Y.screen,e),s}function td(){const s=new Map,t=new z,e=new z;return t.box(0,.24,0,.44,.48,.4,1),e.box(0,.12,.22,.3,.1,.06,1),e.cyl(.14,.03,0,.03,.03,.12,6),e.box(0,.5,.06,.36,.06,.3,1),Yt(s,Y.metalDark,t),Yt(s,Y.metal,e),s}function M1(s){const t=new Map,e=new z,n=new z;return e.box(0,.2,0,1,.3,1.95,1),e.box(0,.5,-.95,1,.7,.08,1),n.box(0,.42,.2,.98,.16,1.4,1),n.box(0,.5,-.7,.6,.12,.34,1),Yt(t,Y.woodDark,e),Yt(t,Y.fabricWarm,n),t}function b1(){const s=new Map,t=new z,e=new z;return t.box(0,.85,0,.62,1.7,.66,1),e.box(.28,.9,.34,.04,.5,.04,1),e.box(.28,.4,.34,.04,.4,.04,1),e.box(0,1.35,.33,.6,.03,.02,1),Yt(s,Y.cream,t),Yt(s,Y.metal,e),s}function w1(){const s=new Map,t=new z,e=new z;return t.box(0,.42,0,.58,.84,.58,1),e.cyl(0,.44,.3,.19,.19,.04,12),Yt(s,Y.white,t),Yt(s,Y.glass,e),s}function S1(){const s=new Map,t=new z,e=new z;return t.box(0,.42,0,1.4,.84,.6,.8),e.box(0,.86,0,1.46,.06,.64,1),e.box(0,.9,-.2,.05,.24,.05,1),e.box(0,1.02,-.13,.05,.05,.18,1),Yt(s,Y.woodLight,t),Yt(s,Y.metal,e),s}function T1(){const s=new Map,t=new z,e=new z;t.box(0,.4,0,.7,.8,.6,1),e.box(0,.82,0,.72,.04,.62,1);for(const n of[-1,1])for(const i of[-1,1])e.cyl(n*.16,.85,i*.14,.09,.09,.03,8);return Yt(s,Y.cream,t),Yt(s,Y.black,e),s}function E1(){const s=new Map,t=new z,e=new z;return t.box(0,.95,0,1.2,1.9,.55,.8),e.box(0,.95,.28,.03,1.8,.02,1),e.box(-.12,.95,.29,.04,.16,.03,1),e.box(.12,.95,.29,.04,.16,.03,1),Yt(s,Y.wood,t),Yt(s,Y.woodDark,e),s}function A1(){const s=new Map,t=new z;return t.box(0,.42,0,.9,.06,.34,1),t.box(0,.84,0,.9,.06,.34,1),t.box(-.44,.45,0,.05,.9,.34,1),t.box(.44,.45,0,.05,.9,.34,1),Yt(s,Y.woodLight,t),s}function R1(){const s=new Map,t=new z;for(let e=0;e<3;e++)t.box(0,.5+e*.32,.06,.8,.04,.3,1);return t.box(-.4,.75,0,.05,1.5,.36,1),t.box(.4,.75,0,.05,1.5,.36,1),Yt(s,Y.metal,t),s}function Ni(s,t=1){const e=new Map,n=new z,i=new z;return n.cyl(0,.16*t,0,.18*t,.14*t,.32*t,8),i.sphere(0,.55*t,0,.3*t,1,.3,2),i.sphere(.2*t,.42*t,.1*t,.2*t,1,.3,5),Yt(e,Y.ceramic,n),Yt(e,Y.leaf,i),e}function ed(){const s=new Map,t=new z,e=new z;t.box(0,.9,0,1.4,1.1,.07,1);for(let n=0;n<4;n++)e.box(-.45+n%2*.6,.7+Math.floor(n/2)*.4,.05,.3,.4,.02,1);return Yt(s,Y.woodDark,t),Yt(s,Y.paper,e),s}function $s(s){const t=new Map,e=new z,n=new z;return e.cyl(0,-.03,0,.22,.26,.06,10),n.cyl(0,-.09,0,.2,.2,.05,10),Yt(t,Y.white,e),Yt(t,Y.glow,n),t}function C1(){const s=new Map,t=new z;return t.box(0,.3,0,5.5,.6,3,.8),t.box(0,.75,-1.4,5.5,.9,.2,1),Yt(s,Y.wood,t),s}function P1(s){const t=new Map,e=new z;e.box(0,.7,0,1.4,.05,.7,1);for(const n of[-1,1])for(const i of[-1,1])e.box(n*.62,.35,i*.3,.05,.7,.05,1);return Yt(t,Y.cream,e),t}function D1(){const s=new Map,t=new z,e=new z;return t.box(0,.5,0,1.1,1,.45,1),e.box(0,.55,.24,1,.6,.02,1),Yt(s,Y.cream,t),Yt(s,Y.glass,e),s}function Gl(){const s=new Map,t=new z,e=new z;t.box(0,.9,0,1.2,1.8,.6,1);for(let n=0;n<4;n++)e.box(-.36+n%2*.72,.5+Math.floor(n/2)*.7,.31,.6,.6,.03,1);return Yt(s,Y.white,t),Yt(s,Y.glass,e),s}function L1(){const s=new Map,t=new z,e=new z;return t.box(0,.28,0,1.6,.56,.75,1),e.box(0,.5,0,1.45,.12,.62,1),Yt(s,Y.ceramic,t),Yt(s,Y.glow,e),s}function I1(){const s=new Map,t=new z;return t.box(0,.2,0,.36,.4,.5,1),t.box(0,.42,.04,.36,.08,.42,1),t.box(0,.5,-.2,.38,.5,.2,1),Yt(s,Y.ceramic,t),s}const nd=["station","konbini","cafe","house","kaikan"],z1={station:"station",konbini:"konbini",cafe:"cafe",house:"house-yoko",kaikan:"kaikan"};function Nn(s){return Vt[z1[s]]||{x:0,z:0}}const U1=90;function k1(s){const t=nd.indexOf(s);return{x:Yg.x+t*U1,z:0}}function js(s,t,e,n,i={}){const{wallMat:o=Y.wall,floorMat:r=Y.floorTile,ceil:a=!0,skirt:c=!0,openings:l=[]}=i;let h=null;if(h={h:n+.12,w:t+.4,d:e+.4},c){const d=new z;d.box(0,.06,-e/2+.1,t,.12,.04,1),d.box(0,.06,e/2-.1,t,.12,.04,1),d.box(-t/2+.1,.06,0,.04,.12,e,1),d.box(t/2-.1,.06,0,.04,.12,e,1),je(s,Y.woodDark,d)}return h}function je(s,t,e){s.has(t)||s.set(t,new z),He(s.get(t),e)}function N1(s,t){x1();const e={},n=[],i=[],o=[];for(const r of nd){const a=F1(r,s,t,n,i);e[r]=a;const c=new Ct;c.name="lights-"+r;const l=le(Math.round(a.d/4.5),1,3),h=le(Math.round(a.w/4.5),1,4);for(let u=0;u<h;u++)for(let f=0;f<l;f++){const p=new Cg(16772299,.62,11,1.35);p.position.set(a.origin.x-a.w/2+(u+.5)*(a.w/h),Math.min(2.6,a.h-.5),a.origin.z-a.d/2+(f+.5)*(a.d/l)),c.add(p)}const d=new Ih(16774370,11577492,.16);c.add(d),s.add(c),a.lightGroup=c,a.lights=c.children,o.push({group:c})}return{zones:e,interactables:n,dynamic:i,lights:o}}function F1(s,t,e,n,i){const o=k1(s),r=new Ct;r.name="interior-"+s;const a=new In("int-"+s,1),c=(u,f,p,x,g=0,...m)=>{const _=ue((f*97+x*31+p*7|0)+5),b=u(_,...m),y=Jh(o.x+f,p,x,g,1,1,1);for(const[A,w]of b)w&&w.count&&a.push(A,w,y)},l=(u,f)=>a.push(u,f,null);let h={};const d={station:[24,12,3.4,Y.floorTile],konbini:[15,11,3.1,Y.floorTile],cafe:[9.5,9.5,3,Y.floorWood],house:[11,9,2.8,Y.floorWood],kaikan:[17,13,3.8,Y.floorWood]};{const[u,f,p,x]=d[s],g=new Me(u+.4,f+.4);g.rotateX(Math.PI/2);const m=new O(g,Y.ceil);m.position.set(o.x,p,o.z),r.add(m);const _=x.map?x.map.clone():null;_&&(_.needsUpdate=!0,_.repeat.set((u+.4)/2.2,(f+.4)/2.2));const b=new Me(u+.4,f+.4);b.rotateX(-Math.PI/2);const y=new O(b,_?et(16777215,{map:_}):x);y.position.set(o.x,0,o.z),y.receiveShadow=!0,r.add(y);const A={station:Y.wall2,konbini:Y.wall2,cafe:Y.wallWood2,house:Y.wall2,kaikan:Y.wall2}[s]||Y.wall2,w=(v,M,C,L,I,H)=>{const V=new Me(v,M),B=new O(V,A);B.position.set(o.x+C,L,o.z+I),B.rotation.y=H,B.receiveShadow=!0,r.add(B)};w(u+.4,p,0,p/2,-f/2-.2,0),w(u+.4,p,0,p/2,f/2+.2,0),w(f+.4,p,-u/2-.2,p/2,0,Math.PI/2),w(f+.4,p,u/2+.2,p/2,0,Math.PI/2);const R=new Pe(60,12,8),E=new O(R,new ki({color:2896192,side:Ze,fog:!1}));E.position.set(o.x,0,o.z),r.add(E)}s==="konbini"&&(h=O1(r,c,l,o,n,i)),s==="cafe"&&(h=B1(r,c,l,o,n)),s==="station"&&(h=H1(r,c,l,o,n)),s==="house"&&(h=G1(r,c,l,o,n)),s==="kaikan"&&(h=V1(r,c,l,o,n)),r.add(a.build({outline:.01,castShadow:!0,receiveShadow:!0}).group),t.add(r);for(const u of h.colliders||[])e.addBox(o.x+u.x,u.z,u.hw,u.hd,u.rot||0,u.top??3,u.bottom??-.2);{const[u,f]=d[s],p=.5;e.addBox(o.x,o.z-f/2-p,u/2+p,p,0,4,-1),e.addBox(o.x,o.z+f/2+p,u/2+p,p,0,4,-1),e.addBox(o.x-u/2-p,o.z,p,f/2+p,0,4,-1),e.addBox(o.x+u/2+p,o.z,p,f/2+p,0,4,-1)}return{id:s,group:r,origin:o,w:h.w,d:h.d,h:h.h,groundFn:()=>0,spawn:h.spawn,doors:h.doors||[]}}function O1(s,t,e,n,i,o){const l=new Map;js(l,15,11,3.1,{wallMat:Y.wall,floorMat:Y.floorTile});const h=0,d=-11/2,u=new z;u.box(h-1.35,1.2,d+.05,.3,2.4,.24),u.box(h+1.35,1.2,d+.05,.3,2.4,.24),u.box(h,2.5,d+.05,3,.3,.24),je(l,Y.metalDark,u);const f=new z;f.box(h-4,1.3,d+.05,4.4,2.6,.06),f.box(h+4,1.3,d+.05,4.4,2.6,.06),je(l,Y.glass,f);const p=new z;p.box(h,.02,d+.7,3,.04,1.4,1),je(l,Y.blue,p),t(sc,-1.2,0,11/2-1.2,0,3.4,.8,1),t(Qh,-2.2,1,11/2-1.4,-.3),t(D1,.4,1,11/2-1.3,Math.PI);for(let w=0;w<3;w++){const R=-2.2+w*2.6;for(let E=0;E<3;E++){const v=-4.6+E*4.6;t(Ys,v,0,R,w%2?Math.PI:0,3.2,1.7,.6,Y.white,!0)}}t(Gl,-15/2+.6,0,0,Math.PI/2,1.2,1.9,.65),t(Gl,15/2-.6,0,0,-Math.PI/2,1.2,1.9,.65),t(R1,15/2-1.2,0,-3.6,-Math.PI/2);const x=new z;x.cyl(-3.6,.35,3.4,.26,.22,.7,10),je(l,Y.metal,x);const g=new z;for(let w=0;w<4;w++)g.box(.3,.1+w*.11,11/2-.7,.5,.02,.34,1);je(l,Y.red,g);for(let w=-1;w<=1;w++)for(let R=-1;R<=1;R+=2)t($s,w*4.6,3.1,R*2.6,0);const m=new O(new Me(3.2,1),et(16777215,{map:Pn({text:"桜 ストア",sub:"CONVENIENCE",bg:16185594,fg:14240330,accent:3833758,w:640,h:200,size:92,subSize:28,key:"konsign"})}));m.position.set(n.x,2.45,n.z-11/2+.2),s.add(m),Cn(m.material,{night:new Nt(16777215),nightIntensity:1,threshold:-1});const _=Y.glass,b=new O(new Ht(1.3,2.4,.06),_),y=new O(new Ht(1.3,2.4,.06),_);b.position.set(n.x-.65,1.2,n.z+d+.12),y.position.set(n.x+.65,1.2,n.z+d+.12),new O(new Ht(1.3,2.4,.05),Y.metalDark).position.set(n.x-.65,1.2,n.z+d+.08),s.add(b,y),o.push({kind:"slideDoor",objs:[b,y],closedX:[-.65,.65],openX:[-1.3,1.3]});for(const[w,R]of l)e(w,R);return i.push({id:"konbini-counter",zone:"konbini",x:n.x-1.2,z:n.z+11/2-2.4,y:0,r:1.8,label:"和店员说话",kind:"talk",target:"yoko",priority:1}),i.push({id:"konbini-exit",zone:"konbini",x:n.x,z:n.z-11/2+.9,y:0,r:1.5,label:"出门",kind:"exit",to:{x:Nn("konbini").x,z:Nn("konbini").z+.2,yaw:Math.PI}}),i.push({id:"konbini-buy",zone:"konbini",x:n.x-1.2,z:n.z+11/2-1.9,y:0,r:1.6,label:"结账",kind:"buy",priority:1}),{w:15,d:11,h:3.1,spawn:{x:n.x,z:n.z-11/2+4.6,yaw:0},colliders:[{x:-1.2,z:11/2-1.2,hw:1.7,hd:.5},{x:-15/2+.6,z:0,hw:.35,hd:1,rot:0},{x:15/2-.6,z:0,hw:.35,hd:1,rot:0},{x:15/2-1.2,z:-3.6,hw:.25,hd:.45,rot:0},...[-2.2,.4,3].flatMap(w=>[-4.6,0,4.6].map(R=>({x:R,z:w,hw:1.6,hd:.32})))],doors:[{x:n.x,z:n.z-11/2+1.6}]}}function B1(s,t,e,n,i){const c=new Map;js(c,9.5,9.5,3,{wallMat:Y.wallWood,floorMat:Y.floorWood}),t(sc,0,0,9.5/2-1.2,0,6.4,.75,1.05),t(td,-1.6,1.08,-9.5/2+1,.3),t(Qh,1.8,1.08,-9.5/2+1,-.2);for(let u=0;u<3;u++)t(_1,-1.4+u*1.4,0,-9.5/2+2.1,Math.PI);t(Ys,2.6,0,-9.5/2+.6,0,1.6,1.9,.4,Y.wood,!0,Y.shelfCoffee);const l=[[-2.2,1.2,.5],[1.6,1.6,-.4],[-2,3.8,.2],[2.4,4,3]];for(const[u,f,p]of l)t(Na,u,0,f,p,.95,.75,.72),t(ei,u-.75,0,f,p+Math.PI/2),t(ei,u+.75,0,f,p-Math.PI/2);const h=new z;h.box(9.5/2-.45,.22,1,.7,.44,2.6,1),je(c,Y.woodDark,h),t(Na,9.5/2-.5,0,1,0,.6,1.4,.5),t(Ni,-9.5/2+.6,0,2.4,0,1.1),t(Ni,9.5/2-.7,0,-2.2,0,.9);for(let u=0;u<3;u++)t($s,-2.4+u*2.4,3,.4,0);const d=new O(new Me(1.4,.9),et(16777215,{map:Pn({text:"メニュー",sub:"COFFEE & CAKE",bg:3812134,fg:16770744,accent:14256970,w:384,h:256,size:58,subSize:20,key:"cafeMenu"})}));d.position.set(n.x-1.4,2.1,n.z-9.5/2+.42),s.add(d);for(const[u,f]of c)e(u,f);return i.push({id:"cafe-counter",zone:"cafe",x:n.x,z:n.z-9.5/2+2.6,y:0,r:1.8,label:"点单",kind:"order",priority:1}),i.push({id:"cafe-talk",zone:"cafe",x:n.x+2.2,z:n.z-9.5/2+1,y:0,r:1.6,label:"和店员说话",kind:"talk",target:"sumi"}),i.push({id:"cafe-exit",zone:"cafe",x:n.x,z:n.z-9.5/2+.9,y:0,r:1.4,label:"出门",kind:"exit",to:{x:Nn("cafe").x,z:Nn("cafe").z+.2,yaw:Math.PI}}),{w:9.5,d:9.5,h:3,spawn:{x:n.x,z:n.z-9.5/2+3.6,yaw:0},colliders:[{x:0,z:9.5/2-1.2,hw:3.2,hd:.4},{x:2.6,z:-9.5/2+.6,hw:.8,hd:.2},{x:9.5/2-.45,z:1,hw:.35,hd:1.3},...l.map(([u,f])=>({x:u,z:f,hw:.48,hd:.38}))]}}function H1(s,t,e,n,i){const c=new Map;js(c,24,12,3.4,{wallMat:Y.wall,floorMat:Y.floorTile});const l=new z;l.box(0,.5,-12/2+1.1,8,1,.7,.8),l.box(0,1.45,-12/2+1.1,8,.9,.14,1),je(c,Y.cream,l);for(let f=0;f<3;f++){const p=new z;p.box(-2.6+f*2.6,1.55,-12/2+1.5,.06,.8,.8,1),je(c,Y.glass,p);const x=new z;x.box(-2.6+f*2.6+.3,1.5,-12/2+1.45,.5,.06,.3,1),je(c,Y.metalDark,x)}const h=new z;for(const f of[-4.2,-.2,3.8])h.box(f,.55,2.2,.4,1.1,1.6,1);h.box(0,1.2,2.9,9.5,.3,.4,1),je(c,Y.metalDark,h);for(const f of[-7.5,-2.5,2.5,7.5])t(ei,f,0,.2,Math.PI),t(ei,f,0,-.9,0),t(ei,f,0,1.2,Math.PI);const d=new O(new Me(1.3,1.75),et(16777215,{map:Yh()}));d.position.set(n.x-4,1.7,n.z+12/2-.2),d.rotation.y=Math.PI,s.add(d),t(ed,5,0,12/2-.3,Math.PI);const u=new z;u.box(9,1.05,-12/2+.2,1,2.1,.1,1),je(c,Y.woodDark,u),t(Ys,10,0,1,-Math.PI/2,1.6,1.7,.5,Y.wood,!0);for(let f=0;f<4;f++)t($s,-8+f*5.4,3.4,-2,0);t(Ni,-11,0,3.6,0,1.2),t(Ni,11,0,-3.6,0,1);for(const[f,p]of c)e(f,p);return i.push({id:"station-timetable",zone:"station",x:n.x-4,z:n.z+12/2-.8,y:0,r:1.5,label:"查看时刻表",kind:"timetable"}),i.push({id:"station-window",zone:"station",x:n.x-1,z:n.z-12/2+2.4,y:0,r:2,label:"和站务员说话",kind:"talk",target:"ken",priority:1}),i.push({id:"station-exit",zone:"station",x:n.x,z:n.z+12/2-.9,y:0,r:1.6,label:"出站",kind:"exit",to:{x:Nn("station").x,z:Nn("station").z+.4,yaw:0}}),i.push({id:"station-platform",zone:"station",x:n.x-6,z:n.z-1,y:0,r:2.4,label:"通往月台",kind:"exit",to:{x:Vt.platformCenter.x,z:Vt.platformCenter.z,yaw:Math.PI,y:Ye.platform.h}}),{w:24,d:12,h:3.4,spawn:{x:n.x,z:n.z+12/2-4,yaw:Math.PI},colliders:[{x:0,z:-12/2+1.1,hw:4,hd:.4},{x:9,z:-12/2+.25,hw:.5,hd:.2},{x:10,z:1,hw:.25,hd:.8},{x:5,z:12/2-.35,hw:.7,hd:.2},{x:-4.2,z:2.2,hw:.2,hd:.8},{x:-.2,z:2.2,hw:.2,hd:.8},{x:3.8,z:2.2,hw:.2,hd:.8}]}}function G1(s,t,e,n,i){const c=new Map;js(c,11,9,2.8,{wallMat:Y.wall,floorMat:Y.floorWood});const l=new z;l.box(0,-.02,9/2-1.4,3.4,.1,2.6,.6),je(c,Y.gray,l),t(A1,-1.2,0,9/2-.5,Math.PI);const h=new z;h.box(-11/2+1.6,2.8/2,9/2-2.9,.14,2.8,5.2,.45),h.box(1.8,2.8/2,9/2-5.5,7,2.8,.14,.45),je(c,Y.wallAccent,h),t(v1,-2.6,0,.2,0),t(Hl,-2.6,0,.2,0),t(y1,-2.6,0,-1.6,0),t(Ys,-11/2+.4,0,2,Math.PI/2,1.2,1.5,.4,Y.wood,!0),t(Ni,-5,0,3.2,0,1.1),t(ei,-.6,0,2,-.6),t(Na,3.2,0,1.2,0,1.3,.85,.74);for(const[p,x,g]of[[-.9,0,Math.PI/2],[.9,0,-Math.PI/2],[0,-.65,0],[0,.65,Math.PI]])t(ei,3.2+p,0,1.2+x,g);t(S1,4.4,0,-3.4,Math.PI),t(T1,3.2,0,-3.5,Math.PI),t(b1,5,0,-1.4,-Math.PI/2),t(w1,2,0,-3.6,Math.PI);const d=new z;d.box(-2.8,.03,-2.6,4.2,.06,4.2,1/4.2,1/4.2),je(c,Y.tatami,d),t(M1,-2.8,.06,-2.6,0),t(E1,-4.8,0,-2.6,Math.PI/2),t(Hl,-2.8,.06,-.9,0);for(const[p,x,g]of[[-.8,0,Math.PI/2],[.8,0,-Math.PI/2]])t(ei,-2.8+p,.06,-.9+x,g);const u=new z;u.box(-11/2+1.2,1.3,-9/2+1.6,.12,2.6,3,.5),u.box(-11/2+1.2,1.3,-9/2+3.15,2.4,2.6,.12,.5),je(c,Y.wallAccent,u),t(L1,-3.6,0,-3.4,0),t(I1,-4.8,0,-1.9,Math.PI/2);for(const[p,x]of[[-2.6,.5],[3,1],[-2.8,-2],[0,9/2-1.2]])t($s,p,2.8,x,0);const f=new z;for(let p=0;p<3;p++)f.box(-11/2+.2,1.7-p*0,1+p*.45,.06,.34,.26,1);je(c,Y.woodDark,f);for(const[p,x]of c)e(p,x);return i.push({id:"house-exit",zone:"house",x:n.x,z:n.z+9/2-.8,y:0,r:1.4,label:"出门",kind:"exit",to:{x:Nn("house").x,z:Nn("house").z+.2,yaw:0}}),i.push({id:"house-tv",zone:"house",x:n.x-2.6,z:n.z-1.6,y:0,r:1.4,label:"看电视",kind:"watch"}),i.push({id:"house-mail",zone:"house",x:n.x,z:n.z+9/2-1.9,y:0,r:1.2,label:"查看信件",kind:"letter"}),i.push({id:"house-fridge",zone:"house",x:n.x+5,z:n.z-1.4,y:0,r:1.2,label:"冰箱",kind:"fridge"}),i.push({id:"house-sit",zone:"house",x:n.x-2.6,z:n.z+1.3,y:0,r:1.2,label:"坐下",kind:"sit"}),{w:11,d:9,h:2.8,spawn:{x:n.x,z:n.z+9/2-3.4,yaw:Math.PI},colliders:[{x:-2.6,z:.2,hw:1,hd:.45},{x:-2.6,z:-1.6,hw:.7,hd:.2},{x:-2.6,z:-2.6,hw:1,hd:1},{x:-4.8,z:-2.6,hw:.3,hd:.6},{x:3.2,z:1.2,hw:.65,hd:.45},{x:4.4,z:-3.4,hw:.7,hd:.3},{x:3.2,z:-3.5,hw:.35,hd:.3},{x:5,z:-1.4,hw:.35,hd:.35},{x:2,z:-3.6,hw:.3,hd:.3},{x:-11/2+1.2,z:-9/2+1.6,hw:1.2,hd:1.5},{x:-11/2+1.6,z:9/2-2.9,hw:.1,hd:2.6},{x:1.8,z:9/2-5.5,hw:3.5,hd:.1}]}}function V1(s,t,e,n,i){const c=new Map;js(c,17,13,3.8,{wallMat:Y.wall,floorMat:Y.floorWood}),t(C1,0,0,-13/2+1.8,0),t(ed,-17/2+.3,0,-2,Math.PI/2);for(let h=0;h<3;h++){t(P1,-3+h*3,0,1+h%2*1.4,h*.3);for(let d=0;d<2;d++)t(ei,-3.8+h*3+d*1.6,0,.4+h%2*1.4,0)}t(sc,17/2-3.5,0,-13/2+1,0,3,.7,.95),t(td,17/2-4.2,.98,-13/2+1,0),t(Ys,17/2-.5,0,3,-Math.PI/2,1.6,1.8,.45,Y.wood,!0),t(Ni,-17/2+.8,0,4.6,0,1.3),t(Ni,17/2-.8,0,4.6,0,1.2);for(let h=-1;h<=1;h++)t($s,h*5,3.8,0,0);const l=new O(new Ne(.32,.32,.08,16),et(16184038));l.rotation.x=Math.PI/2,l.position.set(n.x,2.9,n.z-13/2+.3),s.add(l);for(const[h,d]of c)e(h,d);return i.push({id:"kaikan-exit",zone:"kaikan",x:n.x,z:n.z+13/2-.9,y:0,r:1.5,label:"出门",kind:"exit",to:{x:Nn("kaikan").x,z:Nn("kaikan").z+.2,yaw:0}}),i.push({id:"kaikan-board",zone:"kaikan",x:n.x-17/2+.8,z:n.z-2,y:0,r:1.6,label:"看公告",kind:"kaikanBoard"}),i.push({id:"kaikan-sit",zone:"kaikan",x:n.x-3,z:n.z+2.4,y:0,r:1.3,label:"坐下",kind:"sit"}),{w:17,d:13,h:3.8,spawn:{x:n.x,z:n.z+13/2-4,yaw:Math.PI},colliders:[{x:0,z:-13/2+1.8,hw:2.8,hd:1.5},{x:17/2-3.5,z:-13/2+1,hw:1.5,hd:.35},{x:17/2-.5,z:3,hw:.25,hd:.8},...[-3,0,3].map((h,d)=>({x:h,z:1+d%2*1.4,hw:.7,hd:.35}))]}}const Vl=[{id:"dawn",name:"清晨",from:4.6,to:7},{id:"morning",name:"上午",from:7,to:11},{id:"noon",name:"午后",from:11,to:15},{id:"late",name:"傍晚前",from:15,to:17.4},{id:"evening",name:"黄昏",from:17.4,to:19.6},{id:"night",name:"夜晚",from:19.6,to:4.6}];function W1(s){for(const t of Vl)if(t.from<=t.to?s>=t.from&&s<t.to:s>=t.from||s<t.to)return t;return Vl[0]}class X1{constructor(){this.hour=7,this.day=1,this.scale=1/70,this.paused=!1,this.startHour=7,this.totalHours=0,this.onHour=null,this.onNewDay=null}update(t){if(this.paused)return;const e=this.hour;this.hour+=t*this.scale,this.totalHours+=t*this.scale,this.hour>=24&&(this.hour-=24,this.day++,this.onNewDay&&this.onNewDay(this.day));const n=Math.floor(e),i=Math.floor(this.hour);n!==i&&this.onHour&&this.onHour(i)}get phase(){return W1(this.hour)}get isNight(){const t=this.hour;return t>=19.6||t<4.6}get isDark(){const t=this.hour;return t>=19||t<6}get daylight(){return Ge((Math.sin((this.hour-6)/12*Math.PI)+.15)/1.15)}setHour(t){const e=(t%24+24)%24;e<this.hour&&this.day++,this.hour=e}get untilNextHour(){return Math.floor(this.hour)+1-this.hour}}class q1{constructor(){this.ctx=null,this.ready=!1,this.enabled=!0,this.volumes={master:.8,sfx:1,ambient:.8},this._loops={},this._rng=ue(4242)}init(){if(this.ctx)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t;const e=this.ctx;this.master=e.createGain(),this.master.gain.value=this.volumes.master,this.master.connect(e.destination),this.comp=e.createDynamicsCompressor(),this.comp.threshold.value=-14,this.comp.ratio.value=5,this.comp.connect(this.master),this.sfx=e.createGain(),this.sfx.gain.value=this.volumes.sfx,this.sfx.connect(this.comp),this.amb=e.createGain(),this.amb.gain.value=0,this.amb.connect(this.comp);const n=e.sampleRate*2,i=e.createBuffer(1,n,e.sampleRate),o=i.getChannelData(0);for(let d=0;d<n;d++)o[d]=Math.random()*2-1;this.noiseBuf=i;const r=e.createBuffer(1,n,e.sampleRate),a=r.getChannelData(0);let c=0,l=0,h=0;for(let d=0;d<n;d++){const u=Math.random()*2-1;c=.99765*c+u*.099046,l=.963*l+u*.2965164,h=.57*h+u*1.0526913,a[d]=(c+l+h+u*.1848)*.22}this.pinkBuf=r,this.ready=!0,this._startAmbience()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}get t(){return this.ctx?this.ctx.currentTime:0}_gain(t=1){const e=this.ctx.createGain();return e.gain.value=t,e}_noise(t=!1,e=!1){const n=this.ctx.createBufferSource();return n.buffer=t?this.pinkBuf:this.noiseBuf,n.loop=e,n}_env(t,e,n,i,o=1){const r=t.gain;r.cancelScheduledValues(e),r.setValueAtTime(1e-4,e),r.exponentialRampToValueAtTime(Math.max(2e-4,o),e+n),r.exponentialRampToValueAtTime(1e-4,e+n+i)}_startAmbience(){const t=this.ctx,e=this._noise(!0,!0),n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=420,n.Q.value=.6;const i=this._gain(0);e.connect(n),n.connect(i),i.connect(this.amb),e.start(),this._loops.wind={src:e,gain:i,filter:n};const o=this._noise(!1,!0),r=t.createBiquadFilter();r.type="highpass",r.frequency.value=900;const a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=6200;const c=this._gain(0);o.connect(r),r.connect(a),a.connect(c),c.connect(this.amb),o.start(),this._loops.rain={src:o,gain:c};const l=this._noise(!0,!0),h=t.createBiquadFilter();h.type="lowpass",h.frequency.value=180;const d=this._gain(0),u=t.createOscillator();u.type="sawtooth",u.frequency.value=42;const f=this._gain(0);l.connect(h),h.connect(d),d.connect(this.amb),u.connect(f),f.connect(this.amb),l.start(),u.start(),this._loops.train={src:l,gain:d,osc:u,oscGain:f,filter:h};const p=this._noise(!1,!0),x=t.createBiquadFilter();x.type="bandpass",x.frequency.value=2200,x.Q.value=.5;const g=this._gain(0);p.connect(x),x.connect(g),g.connect(this.amb),p.start(),this._loops.stream={src:p,gain:g}}updateAmbience(t,{night:e=0,rain:n=0,indoors:i=!1,trainDist:o=999,nearStream:r=0,wind:a=.4}={}){if(!this.ready)return;const c=this.t,l=(u,f)=>{const p=this._loops[u];p&&p.gain.gain.setTargetAtTime(Math.max(0,f),c,.35)},h=i?.45:1;l("wind",(.05+a*.16)*(1-n*.5)*h),l("rain",n*.3*h),l("stream",r*.22*h);const d=o<190?Ge(1-o/190)**1.6:0;this._loops.train&&(this._loops.train.gain.gain.setTargetAtTime(d*.55,c,.2),this._loops.train.oscGain.gain.setTargetAtTime(d*.1,c,.2),this._loops.train.filter.frequency.setTargetAtTime(120+d*260,c,.3),this._loops.train.osc.frequency.setTargetAtTime(38+d*16,c,.4)),this.amb.gain.setTargetAtTime(this.volumes.ambient*(i?.55:1),c,.4)}_tone(t,e,n="sine",i=.2,o=0,r=null,a=0){if(!this.ready)return;const c=this.ctx,l=this.t+o,h=c.createOscillator(),d=this._gain(0);h.type=n,h.frequency.setValueAtTime(t,l),a&&h.frequency.exponentialRampToValueAtTime(Math.max(20,t+a),l+e),h.connect(d),d.connect(r||this.sfx),this._env(d,l,Math.min(.02,e*.2),e,i),h.start(l),h.stop(l+e+.1)}_burst(t,e,n,i=.2,o=0,r=1,a=!1){if(!this.ready)return;const c=this.ctx,l=this.t+o,h=this._noise(a),d=c.createBiquadFilter();d.type=e,d.frequency.value=n,d.Q.value=r;const u=this._gain(0);h.connect(d),d.connect(u),u.connect(this.sfx),this._env(u,l,.006,t,i),h.start(l,Math.random()*1.5),h.stop(l+t+.05)}footstep(t="grass",e=.12){const n={grass:[.16,"bandpass",900,.09],asphalt:[.09,"bandpass",1600,.1],wood:[.12,"bandpass",420,.12],tile:[.07,"highpass",2400,.1],gravel:[.14,"bandpass",2200,.11]}[t]||[.12,"bandpass",1200,.1];this._burst(n[0],n[1],n[2]*(.85+Math.random()*.3),n[3]*e)}doorOpen(){this._burst(.28,"lowpass",700,.09,0,1,!0),this._tone(180,.1,"sine",.05,.02)}doorClose(){this._burst(.12,"lowpass",380,.13,0,1,!0)}doorChime(){[0,.09,.18].forEach((e,n)=>this._tone(1046*[1,1.5,2][n],.5,"sine",.1-n*.02,e))}chime(){[523,659,784].forEach((t,e)=>this._tone(t,.7,"triangle",.11,e*.14))}click(){this._tone(880,.05,"square",.035)}page(){this._burst(.14,"bandpass",2600,.07,0,.7)}playCrossingAlarm(){this.crossAlarm()}crossAlarm(){for(let t=0;t<2;t++)this._tone(t?660:880,.22,"square",.055,t*.26)}whistle(t=!1){const e=t?1.4:.85;this._tone(1180,e,"sine",.1,0,null,-260),this._tone(1760,e,"sine",.05,.02,null,-380),this._burst(e*.7,"bandpass",2400,.045,0,2)}brake(){if(!this.ready)return;const t=this.ctx,e=this.t,n=this._noise(!0),i=t.createBiquadFilter();i.type="bandpass",i.frequency.value=1800,i.Q.value=6;const o=this._gain(0);n.connect(i),i.connect(o),o.connect(this.sfx),o.gain.setValueAtTime(1e-4,e),o.gain.exponentialRampToValueAtTime(.05,e+.4),o.gain.exponentialRampToValueAtTime(1e-4,e+3.4),i.frequency.setValueAtTime(2400,e),i.frequency.exponentialRampToValueAtTime(600,e+3.4),n.start(e),n.stop(e+3.6)}vending(){this._burst(.09,"bandpass",2800,.12,0,2),this._burst(.2,"lowpass",500,.1,.12,1,!0),this._tone(1568,.16,"sine",.07,.3)}coin(){this._tone(1568,.09,"square",.05),this._tone(2093,.22,"square",.045,.07)}pour(){this._burst(.5,"bandpass",700,.07,0,1.2,!0)}success(){[523,659,784,1046].forEach((t,e)=>this._tone(t,.45,"triangle",.1,e*.1))}discover(){[784,988,1175,1568].forEach((t,e)=>this._tone(t,.6,"sine",.08,e*.11))}cat(){this._tone(760,.22,"sawtooth",.05,0,null,260),this._tone(900,.18,"sawtooth",.04,.26,null,-180)}bird(){const t=2200+Math.random()*1600,e=2+Math.floor(Math.random()*3);for(let n=0;n<e;n++)this._tone(t*(1+n*.08),.07,"sine",.028,n*.09,null,380)}cricket(){for(let t=0;t<3;t++)this._burst(.03,"bandpass",4200,.022,t*.05,12)}cicada(){if(!this.ready)return;const t=this.ctx,e=this.t,n=1.8+Math.random(),i=t.createOscillator(),o=this._gain(0),r=t.createOscillator(),a=this._gain(.012);i.type="sawtooth",i.frequency.value=1750,r.type="square",r.frequency.value=42,r.connect(a),a.connect(o.gain);const c=t.createBiquadFilter();c.type="bandpass",c.frequency.value=2e3,c.Q.value=2,i.connect(c),c.connect(o),o.connect(this.amb),o.gain.setValueAtTime(1e-4,e),o.gain.exponentialRampToValueAtTime(.02,e+.3),o.gain.exponentialRampToValueAtTime(1e-4,e+n),i.start(e),r.start(e),i.stop(e+n+.1),r.stop(e+n+.1)}thud(t=.1){this._burst(.16,"lowpass",220,t,0,1,!0)}splash(){this._burst(.4,"highpass",1400,.09,0,.8)}swing(){this._tone(320,.5,"sine",.04,0,null,120),this._tone(480,.4,"sine",.03,.2,null,-80)}shrineBell(){this._tone(740,1.6,"sine",.07),this._tone(1110,1.2,"sine",.04,.01),this._tone(1480,.8,"sine",.02,.02)}trainHorn(){this.whistle(!0)}stop(){this.brake()}setVolume(t,e){if(this.volumes[t]=e,!this.ready)return;const n=this.t;t==="master"&&this.master.gain.setTargetAtTime(e,n,.1),t==="sfx"&&this.sfx.gain.setTargetAtTime(e,n,.1),t==="ambient"&&this.amb.gain.setTargetAtTime(e,n,.1)}setMuted(t){this.enabled=!t,this.ready&&this.master.gain.setTargetAtTime(t?0:this.volumes.master,this.t,.15)}}class Y1{constructor(t){this.game=t,this.zones={},this.current="world",this.player=t.player,this.rig=t.rig,this.rig.groundFn=(e,n)=>this.groundFn(e,n),this.fadeEl=document.getElementById("fade"),this.onChange=null}setZones(t){this.zones=t}get isIndoor(){return this.current!=="world"}groundFn(t,e){return this.isIndoor?0:j(t,e)}async enter(t,e=null){if(this.current===t)return;const n=this.zones[t];n&&(await this._fade(async()=>{this.current=t,this.currentZoneName=n.name||t,this.player.zone=t,this.player.groundFn=()=>0;const i=e&&e.x!==void 0?e:n.spawn;this.player.teleport(i.x,i.y||0,i.z,i.yaw??0),this.rig.yaw=(i.yaw??0)+Math.PI,this.rig.smoothTarget.copy(this.player.pos),document.body.classList.add("interior");const o=n.w/2-.7,r=n.d/2-.7;this.rig.bounds={x0:n.origin.x-o,x1:n.origin.x+o,z0:n.origin.z-r,z1:n.origin.z+r,y:2.95},this.rig.setInterior(!0,n.h??3),this._setInteriorLight(!0)}),this.onChange&&this.onChange(t))}async exit(t){this.current!=="world"&&(await this._fade(async()=>{this.current="world",this.currentZoneName="",this.player.zone="world",this.player.groundFn=j;const e=t.y!==void 0?t.y:j(t.x,t.z);this.player.teleport(t.x,e,t.z,t.yaw??0),this.rig.yaw=(t.yaw??0)+Math.PI,this.rig.smoothTarget.copy(this.player.pos),document.body.classList.remove("interior"),this.rig.bounds=null,this.rig.setInterior(!1),this._setInteriorLight(!1)}),this.onChange&&this.onChange("world"))}_setInteriorLight(t){const e=this.game;if(e.sky){e.sky.mesh.visible=!t,e.sky.stars.visible=!t&&e.sky.nightT>.02,e.sky.sunSprite.visible=!t,e.sky.moonSprite.visible=!t,e.sky.clouds.visible=!t,e.sky.indoor=t,e.sky.sun.castShadow=!t,e.skyIndoor=t;for(const n of Object.values(e.interiorZones||{}))n.lightGroup&&(n.lightGroup.visible=t)}}_fade(t){return new Promise(e=>{const n=this.fadeEl;n.classList.add("on"),setTimeout(async()=>{await t(),n.classList.remove("on"),setTimeout(e,400)},390)})}}class $1{constructor(t){this.ctx=t,this.items=[],this.current=null,this.locked=!1}setItems(t){this.items=t}refresh(){const t=this.ctx;this.items=[...t.town?.interactables||[],...t.zones?.interactables||[]]}update(t){const e=this.ctx,n=e.game.player;if(n.frozen||this.locked){this.setCurrent(null);return}this.refresh();let i=null,o=-1;const r=e.zones.current,a=Math.sin(n.yaw),c=Math.cos(n.yaw);for(const h of this.items){if(h.zone&&h.zone!==r||h.enabled&&!h.enabled())continue;const d=h.x-n.pos.x,u=h.z-n.pos.z,f=Math.hypot(d,u),p=h.r||1.6;if(f>p)continue;const x=f<.25?1:(d*a+u*c)/f;if(x<-.25)continue;const g=(h.priority||0)*3+(1-f/p)+x*.4;g>o&&(o=g,i=h)}const l=e.npcs.bestFacing(n.pos.x,n.pos.z,a,c,2.8,r);if(l){const h=l.pos.x-n.pos.x,d=l.pos.z-n.pos.z,u=Math.hypot(h,d)||1,f=2.4+(h*a+d*c)/u*.4;f>o&&(o=f,i={id:"npc-"+l.id,npc:l,label:`和${l.name}说话`,kind:"talkNpc",r:2.8})}this.setCurrent(i)}setCurrent(t){this.current!==t&&(this.current=t,this.ctx.ui&&this.ctx.ui.setPrompt(t?t.label:null,t&&t.key||"E"))}trigger(){const t=this.current;return!t||this.locked?!1:(this.ctx.audio?.click(),this.handle(t),!0)}handle(t){const e=this.ctx,n=e.game;switch(t.kind){case"enter":{e.zones.enter(t.target);break}case"exit":{e.zones.exit(t.to);break}case"talk":{e.ui.talkTo(t.target);break}case"talkNpc":{const i=t.npc;i.facePlayer(n.player.pos.x,n.player.pos.z),e.ui.talkTo(i.id);break}case"vending":{e.quests.onVending(t);break}case"notice":{e.ui.openBoard();break}case"sit":{const i=n.player;i.sitTarget={x:t.x+Math.sin(i.yaw)*.35,z:t.z+Math.cos(i.yaw)*.35,dx:Math.sin(i.yaw),dz:Math.cos(i.yaw)},e.audio?.thud(.06);break}case"swing":{e.audio?.swing(),e.ui.toast("秋千荡得很高，风从耳边过去。","日常");break}case"water":{e.inventory.add("water",1),e.audio?.pour(),e.ui.toast("掬起一掬凉水，整个人清醒了。","清"),e.quests.progress("wash");break}case"offer":{e.quests.doOffer();break}case"photo":{e.quests.doPhoto(t);break}case"timetable":{e.ui.openTimetable();break}case"order":{e.quests.doOrder();break}case"shopBuy":{e.quests.buyFromShop(t.data?.shop);break}case"buy":{e.quests.doCheckout();break}case"letter":{e.ui.openLetter();break}case"watch":{e.ui.toast("电视里在放天气预报，明天也是晴天。","日常"),e.audio?.chime();break}case"fridge":{e.inventory.has("drink")?(e.inventory.remove("drink",1),e.ui.toast("从冰箱里拿了一罐饮料。","日常"),e.audio?.vending()):e.ui.toast("冰箱里只有明天要用的食材。","日常");break}case"kaikanBoard":{e.ui.openBoard("kaikan");break}case"view":{e.ui.toast(t.text||"从这里能看见整个小镇。","风景"),e.quests.discoverNearest(n.player.pos.x,n.player.pos.z,26);break}case"look":{e.ui.toast(t.text||"看了一会儿。","日常"),e.quests.discoverNearest(n.player.pos.x,n.player.pos.z,20);break}case"waterwheel":{e.ui.toast("水车吱呀吱呀地转着，水声很规律。","日常"),e.audio?.pour(),e.quests.discoverNearest(n.player.pos.x,n.player.pos.z,12);break}case"cat":{e.quests.petCat();break}case"pickup":{e.quests.pickup(t);break}default:t.onUse&&t.onUse(t)}}}const jo={drink:{name:"罐装饮料",icon:"🥤",price:130,desc:"自动售货机里最常见的那种。甜甜的。"},soda:{name:"橘子汽水",icon:"🧃",price:150,desc:"玻璃瓶装，开盖会“呲”的一声。"},coffee:{name:"手冲咖啡",icon:"☕",price:480,desc:"ひより的手冲，酸得恰到好处。"},cake:{name:"草莓蛋糕",icon:"🍰",price:520,desc:"奶油有点甜，但很好吃。"},umbrella:{name:"浅蓝色折叠伞",icon:"☂️",desc:"阳子的伞，伞柄上贴着一枚小樱花贴纸。"},radio:{name:"老式收音机",icon:"📻",desc:"野上先生修好的。旋钮有点松，但声音很清楚。"},notebook:{name:"深蓝色笔记本",icon:"📒",desc:"扉页上写着「高橋 遥」。里面画满了小小的地图。"},film:{name:"胶卷",icon:"🎞️",desc:"还剩七张。拍完小镇就刚好。"},ema:{name:"绘马",icon:"🐎",desc:"在背面写下心愿就能挂在社殿上。"},dango:{name:"祭典团子",icon:"🍡",desc:"三颗一串，樱花色的那颗最好吃。"},cotton:{name:"棉花糖",icon:"🍥",desc:"祭典摊子上现做的，粉红色。"},chair:{name:"折叠椅",icon:"🪑",desc:"集会所缺的那种。一共要三把。"},cat:{name:"三花猫",icon:"🐈",desc:"它叫小豆，是镇上有名的三花猫。"},camera:{name:"小型相机",icon:"📷",desc:"澄借给你的。按下快门就能留下风景。"},charm:{name:"御守",icon:"🧧",desc:"神社里求来的。小小的，红色。"},letter:{name:"一封信",icon:"✉️",desc:"今天新送到的信。"}};class j1{constructor(){this.slots={},this.money=1500,this.newFlags={}}add(t,e=1){return this.slots[t]=(this.slots[t]||0)+e,!0}remove(t,e=1){return this.slots[t]?(this.slots[t]-=e,this.slots[t]<=0&&delete this.slots[t],!0):!1}has(t,e=1){return(this.slots[t]||0)>=e}count(t){return this.slots[t]||0}get isEmpty(){return Object.keys(this.slots).length===0}pay(t){return this.money<t?!1:(this.money-=t,!0)}earn(t){this.money+=t}list(){return Object.keys(this.slots).filter(t=>jo[t]).map(t=>({id:t,n:this.slots[t],...jo[t]}))}serialize(){return{slots:this.slots,money:this.money}}load(t){t&&(this.slots=t.slots||{},this.money=t.money??1500)}}const ns=[{id:"q1",chapter:1,title:"第一件小事",giver:"notice",brief:"车站的站务员小林健想拜托你送一罐饮料过去——他忙了一早上，还没顾上买。",reward:{money:200,affinity:{ken:1}},steps:[{id:"s1",type:"buy",item:"drink",desc:"在任意一台自动售货机买一罐饮料",hint:"车站前、商店街、公园都有售货机"},{id:"s2",type:"give",item:"drink",to:"ken",desc:"把饮料交给站务员 健"}]},{id:"q2",chapter:1,title:"落在门口的伞",giver:"yoko",brief:"阳子下班时发现伞忘在商店街的花の國门口了。明天就要下雨，她有点担心。",requires:["q1"],reward:{money:150,affinity:{yoko:1}},steps:[{id:"s1",type:"go",at:{x:33,z:36,r:5},desc:"去和菓子店「花の国」门口",hint:"商店街往东第三家"},{id:"s2",type:"interact",id:"q2-umbrella",desc:"收起那把浅蓝色的伞"},{id:"s3",type:"give",item:"umbrella",to:"yoko",desc:"把伞还给 阳子"}]},{id:"q3",chapter:1,title:"修好的收音机",giver:"nogami",brief:"野上先生修好了用了三十年的收音机，想在神社的社殿前听一次天气预报。他年纪大了，路上有段坡。",requires:["q1"],reward:{money:300,affinity:{nogami:1},unlock:"charm"},steps:[{id:"s1",type:"talk",to:"nogami",desc:"去住宅区找 野上先生 取收音机"},{id:"s2",type:"give",item:"radio",to:"nogami",desc:"确认拿到收音机"},{id:"s3",type:"go",at:{x:24,z:-50,r:9},desc:"把收音机带到神社"},{id:"s4",type:"interact",id:"q3-radio",desc:"在社殿前放收音机"}]},{id:"q4",chapter:2,title:"月台上的笔记",giver:"ken",brief:"有位乘客说，把一本深蓝色的笔记本落在了月台上。健翻遍了候车室也没找到。",requires:["q2"],reward:{money:260,affinity:{ken:1,haruka:1}},steps:[{id:"s1",type:"go",at:{x:6,z:7.5,r:4.5},desc:"去月台东侧找一找"},{id:"s2",type:"interact",id:"q4-book",desc:"捡起笔记本"},{id:"s3",type:"give",item:"notebook",to:"ken",desc:"交还给站务员 健"}]},{id:"q5",chapter:2,title:"汽水与黄昏",giver:"haruka",brief:"遥想买一罐汽水，可是身上只剩硬币了。她想在公园的长椅上喝。",requires:["q1"],reward:{money:180,affinity:{haruka:1}},steps:[{id:"s1",type:"buy",item:"soda",desc:"买一罐橘子汽水"},{id:"s2",type:"go",at:{x:-30,z:78,r:5},desc:"去公园的长椅"},{id:"s3",type:"interact",id:"q5-sit",desc:"坐下陪遥喝汽水"}]},{id:"q6",chapter:2,title:"从高处看小镇",giver:"sumi",brief:"澄想拍一张「从山顶看下来的樱町」，交这次照片参加摄影比赛。相机她可以借你。",requires:["q1"],reward:{money:350,affinity:{sumi:1},unlock:"film"},steps:[{id:"s1",type:"talk",to:"sumi",desc:"向 澄 借相机"},{id:"s2",type:"go",at:{x:Vt.lookout.x,z:Vt.lookout.z,r:5},desc:"去神社后坡的见晴台"},{id:"s3",type:"photo",desc:"拍下小镇的黄昏"},{id:"s4",type:"give",item:"film",to:"sumi",desc:"把胶卷交给 澄"}]},{id:"q7",chapter:2,title:"小豆不见了",giver:"nogami",brief:"三花猫小豆从早上就没回家。爷爷有点担心——虽然他说「猫总是有自己的事」。",requires:["q3"],reward:{money:240,affinity:{nogami:1,haruka:1}},steps:[{id:"s1",type:"discover",lm:"lm-waterwheel",desc:"去溪边找找"},{id:"s2",type:"go",at:{x:Vt.waterwheel.x+1.6,z:Vt.waterwheel.z+1.2,r:4},desc:"找到小豆"},{id:"s3",type:"interact",id:"q7-cat",desc:"把小豆抱起来"},{id:"s4",type:"give",item:"cat",to:"nogami",desc:"把猫还给 野上先生"}]},{id:"q8",chapter:3,title:"集会所缺的三把椅子",giver:"kaikan",brief:"周末有町内会。集会所的折叠椅不够用了，健说散落在镇上的三把椅子得找回来。",requires:["q4"],reward:{money:400,affinity:{ken:1,nogami:1}},steps:[{id:"s1",type:"go",at:{x:30,z:33.6,r:4},desc:"在商店街找到第一把"},{id:"s2",type:"interact",id:"q8-chair1",desc:"收起折叠椅"},{id:"s3",type:"go",at:{x:-44,z:27,r:5},desc:"在车站前找到第二把"},{id:"s4",type:"interact",id:"q8-chair2",desc:"收起折叠椅"},{id:"s5",type:"go",at:{x:-32,z:76,r:6},desc:"在公园找到第三把"},{id:"s6",type:"interact",id:"q8-chair3",desc:"收起折叠椅"},{id:"s7",type:"go",at:{x:Vt.kaikanDoor.x,z:Vt.kaikanDoor.z,r:4},desc:"把椅子送到集会所"}]},{id:"q9",chapter:3,title:"神社的旧物",giver:"sumi",brief:"神社后院的仓库里有一台老式留声机。澄想拍下它，但仓库钥匙在集会所。",requires:["q6"],reward:{money:320,affinity:{sumi:1},unlock:"charm"},steps:[{id:"s1",type:"go",at:{x:Vt.kaikanDoor.x,z:Vt.kaikanDoor.z,r:4},desc:"去集会所取钥匙"},{id:"s2",type:"interact",id:"q9-key",desc:"和集会所的人拿钥匙"},{id:"s3",type:"go",at:{x:32.5,z:-58,r:5},desc:"打开神社后院的仓库"},{id:"s4",type:"interact",id:"q9-phono",desc:"拍下留声机"},{id:"s5",type:"give",item:"film",to:"sumi",desc:"把胶卷交给 澄"}]},{id:"q10",chapter:4,title:"小镇祭的准备",giver:"kaikan",brief:"町内会要在神社办一次小祭。棉花糖、团子、绘马……还差一些东西，健说「差一个人来张罗」。",requires:["q7","q8"],reward:{money:800,affinity:{ken:2,yoko:2,sumi:2,nogami:2,haruka:2},ending:!0},steps:[{id:"s1",type:"buy",item:"drink",count:2,desc:"买两罐饮料（给祭典补给）"},{id:"s2",type:"go",at:{x:13,z:36,r:5},desc:"去喫茶ひより"},{id:"s3",type:"interact",id:"q10-order",desc:"向 澄 订一批祭典团子"},{id:"s4",type:"go",at:{x:24,z:-50,r:9},desc:"把东西布置到神社"},{id:"s5",type:"interact",id:"q10-decorate",desc:"挂上绘马，布置摊位"}]}],Yr=[{id:"d-vending",title:"帮阳子补货",desc:"店里囤货不够了，能帮忙带两罐饮料吗？",need:"drink",count:2,to:"yoko",money:260,affinity:{yoko:1}},{id:"d-company",title:"陪爷爷走走",desc:"老爷子的膝盖不太行了，能陪他去一趟神社吗？",need:null,to:"nogami",goto:"shrine",money:180,affinity:{nogami:1}},{id:"d-souvenir",title:"给澄带点心",desc:"澄说想吃花の国的草饼。",need:"dango",count:1,to:"sumi",money:220,affinity:{sumi:1}},{id:"d-lost",title:"找回落下的东西",desc:"有人在商店街捡到一样东西，先放在站务室。",need:"drink",count:1,to:"ken",money:150,affinity:{ken:1}}],Wl=["棉花糖在夕阳里转成一团粉色，像一小朵云。","老板递来一串团子：「趁热吃，凉了就不好吃了。」","金鱼在水盆里游来游去，小孩子蹲了很久不肯走。","「一发入魂！」——欢呼声混着蝉鸣。","石阶上坐满了人。抬头能看见今晚的第一颗星。"];class Z1{constructor(t){this.ctx=t,this.done=new Set,this.active=null,this.stepIdx=0,this.stepFlags={},this.daily=[],this.dailyDay=0,this.dailyActive=null,this.log=[],this.discovered=new Set,this.landmarks=_i,this.catFound=!1,this.photoTaken=0,this.endingSeen=!1,this.festival=!1,this.flags={letters:[]},this.pickupNodes=[]}get currentStep(){if(!this.active)return null;const t=ns.find(e=>e.id===this.active);return t&&t.steps[this.stepIdx]||null}get currentQuest(){return this.active?ns.find(t=>t.id===this.active):null}get currentObjectiveText(){const t=this.currentStep;return t?t.type==="give"&&!this.ctx.inventory.has(t.item)?`取得「${jo[t.item]?.name||t.item}」再交给对方`:t.type==="buy"&&t.count?`${t.desc}（${this.buyCount(t)}/${t.count}）`:t.desc:null}buyCount(t){return t.count?this.stepFlags["count_"+t.id]||0:1}available(){return ns.filter(t=>!this.done.has(t.id)&&(!t.requires||t.requires.every(e=>this.done.has(e))))}atBoard(){return this.available()}accept(t){if(this.done.has(t))return;const e=ns.find(n=>n.id===t);e&&(this.active=t,this.stepIdx=0,this.stepFlags={},this.log.push({day:this.ctx.time.day,text:`接下了「${e.title}」`}),this.ctx.ui.toast(`接下了委托：${e.title}`,"便笺"),this.refreshTracker(),this.spawnQuestProps())}abandon(){this.active&&(this.log.push({day:this.ctx.time.day,text:`放下了「${this.currentQuest.title}」`}),this.active=null,this.stepFlags={},this.refreshTracker())}advance(){const t=this.currentQuest;t&&(this.stepIdx++,this.stepIdx>=t.steps.length?this.completeQuest(t):(this.spawnQuestProps(),this.refreshTracker()))}completeQuest(t){this.done.add(t.id),this.active=null,this.stepIdx=0,this.stepFlags={};const e=t.reward||{};e.money&&this.ctx.inventory.earn(e.money);for(const[n,i]of Object.entries(e.affinity||{}))this.addAffinity(n,i);e.unlock&&this.ctx.inventory.add(e.unlock,1),this.log.push({day:this.ctx.time.day,text:`完成了「${t.title}」`}),this.ctx.ui.questComplete(t),this.refreshTracker(),this.clearQuestProps(),e.ending&&(this.endingSeen=!0,this.startFestival())}startFestival(){this.ctx,!this.festival&&(this.spawnFestivalStalls(),this.ctx.time.hour=Math.max(this.ctx.time.hour,17.6),this.festival=!0)}spawnFestivalStalls(){const t=this.ctx;t.town.interactables=t.town.interactables.filter(o=>!String(o.id).startsWith("festival-"));const e=24,n=-50,i=[{x:e-5.5,z:n-3,label:"棉花糖摊"},{x:e+5.5,z:n-3,label:"团子摊"},{x:e-5.5,z:n+3,label:"金鱼捞"},{x:e+5.5,z:n+3,label:"射击摊"},{x:e,z:n-5.5,label:"神社前广场"}];for(const[o,r]of i.entries())t.town.addInteract({id:"festival-"+o,x:r.x,z:r.z,r:2.2,label:`看看${r.label}`,kind:"view",text:Wl[o%Wl.length],priority:0});t.ui.toast("小镇祭开始了。神社前摆起了摊位，镇上的人陆陆续续过去。","小镇祭"),t.audio?.chime(),this.refreshTracker()}addAffinity(t,e){const n=this.ctx.npcs.byId[t];n&&(n.affinity=Math.min(5,n.affinity+e),n.met||(n.met=!0,this.ctx.ui.toast(`认识了 ${n.name}`,"相识")),this.refreshTracker())}progress(t,e){const n=this.currentStep;if(!n)return!1;if(t==="buy"&&n.type==="buy"&&n.item===e.item){const i=n.count||1,o=this.stepFlags["count_"+n.id]||0;return this.stepFlags["count_"+n.id]=o+1,this.stepFlags["count_"+n.id]>=i?this.advance():(this.refreshTracker(),this.ctx.ui.toast(`还差 ${i-this.stepFlags["count_"+n.id]} 份`,"便笺")),!0}return t==="interact"&&n.type==="interact"&&n.id===e.id?(this.advance(),!0):t==="photo"&&n.type==="photo"?(this.advance(),!0):t==="go"&&n.type==="go"&&n.at&&bn(this.ctx.game.player.pos.x,this.ctx.game.player.pos.z,n.at.x,n.at.z)<(n.at.r||5)?(this.advance(),!0):t==="talk"&&n.type==="talk"&&n.to===e.id?(this.advance(),!0):!1}get objectiveMarker(){const t=this.currentStep;if(!t)return null;if(t.type==="go"&&t.at)return{x:t.at.x,z:t.at.z,label:t.desc};if(t.type==="talk"||t.type==="give"){const e=this.ctx.npcs.byId[t.to];if(e)return{x:e.pos.x,z:e.pos.z,label:`找 ${e.name}`}}return null}onVending(t){const e=this.ctx.inventory,n=t.data?.price||130;if(!e.pay(n)){this.ctx.ui.toast("钱包里不够了。","便笺"),this.ctx.audio?.click();return}e.add("drink",1),this.ctx.audio?.vending(),this.ctx.ui.toast(`买下一罐饮料（−${n}円）`,"商店"),this.progress("buy",{item:"drink"}),this.refreshTracker()}buyFromShop(t){const e=Bh[t];if(!e||!e.length)return;this.ctx.inventory;const n=e.map((i,o)=>`${o+1}. ${i.name} ${i.price}円`).join("   ");this.ctx.ui.toast(n+"　（按住数字键购买）","商店"),this.pendingShop={shopId:t,stock:e}}buyItem(t){const e=this.pendingShop;if(!e)return;const n=e.stock.find(i=>i.item===t);if(n){if(!this.ctx.inventory.pay(n.price)){this.ctx.ui.toast("钱包里不够了。","商店"),this.ctx.audio?.click();return}this.ctx.inventory.add(n.item,1),this.ctx.audio?.coin(),this.ctx.ui.toast(`买下了${n.name}（−${n.price}円）`,"商店"),this.progress("buy",{item:n.item}),this.refreshTracker()}}doCheckout(){const t=this.ctx.inventory;if(t.count("drink")+t.count("soda")===0){this.ctx.ui.toast("手上没有要结账的东西。","日常");return}this.ctx.ui.toast("阳子把东西装进袋子，笑着说谢谢。","日常"),this.ctx.audio?.coin()}doOrder(){const t=this.currentStep;this.ctx.ui.toast(t&&t.id==="q10-order"?"澄把一整箱祭典团子搬到柜台上：「够不够？」":"澄把一杯刚好的手冲推过来，附带两块小饼干。","日常"),t&&t.type==="interact"&&t.id==="q10-order"?(this.ctx.inventory.add("dango",2),this.advance()):this.ctx.audio?.chime(),this.refreshTracker()}doOffer(){const t=this.ctx.inventory;if(t.money<100){this.ctx.ui.toast("香资需要 100 円。","日常");return}t.pay(100),this.ctx.audio?.shrineBell(),this.ctx.ui.toast("合掌，摇铃。心里默默许了个愿。","神社"),t.has("charm")||t.add("charm",1),this.discoverNearest(this.ctx.game.player.pos.x,this.ctx.game.player.pos.z,12)}doPhoto(t){this.photoTaken++,this.ctx.inventory.add("film",1),this.ctx.ui.toast(`咔嚓。胶卷上还剩 ${this.ctx.inventory.count("film")} 张。`,"风景"),this.progress("photo",{}),this.progress("interact",{id:"photo"}),this.refreshTracker()}pickup(t){t.item&&this.ctx.inventory.add(t.item,t.count||1)&&(this.ctx.audio?.coin(),this.ctx.ui.toast(`捡到了「${jo[t.item]?.name||t.item}」`,"获得")),this.progress("interact",{id:t.id})}petCat(){this.catFound=!0,this.ctx.inventory.add("cat",1),this.ctx.audio?.cat(),this.ctx.ui.toast("小豆眯起眼睛，喉咙里发出呼噜声。","日常"),this.progress("interact",{id:"q7-cat"})}discoverNearest(t,e,n=14){for(const i of this.landmarks)this.discovered.has(i.id)||Math.hypot(i.x-t,i.z-e)<n&&(this.discovered.add(i.id),this.ctx.ui.discover(i),this.ctx.audio?.discover(),this.log.push({day:this.ctx.time.day,text:`发现了「${i.name}」`}),this.refreshTracker())}checkDiscoveries(){const t=this.ctx.game.player.pos;this.discoverNearest(t.x,t.z,11),this.tick()}tick(){this.checkDaily();const t=this.currentStep;if(t){if(t.type==="go"&&t.at){const e=this.ctx.game.player.pos;bn(e.x,e.z,t.at.x,t.at.z)<(t.at.r||5)&&this.advance();return}t.type==="discover"&&t.lm&&this.discovered.has(t.lm)&&this.advance()}}get discoveredCount(){return this.discovered.size}get totalLandmarks(){return _i.filter(t=>t.discover!==!1).length}acceptDaily(t){const e=Yr.find(n=>n.id===t);!e||this.dailyActive||(this.dailyActive=e,this.ctx.ui.toast(`接下了「${e.title}」`,"町内会"),this.refreshTracker())}completeDaily(){const t=this.dailyActive;if(t){this.ctx.inventory.earn(t.money);for(const[e,n]of Object.entries(t.affinity||{}))this.addAffinity(e,n);this.log.push({day:this.ctx.time.day,text:`帮街坊完成了「${t.title}」`}),this.dailyActive=null,this.ctx.ui.toast(`「${t.title}」办好了（+${t.money}円）`,"町内会"),this.refreshTracker()}}get dailyMarker(){const t=this.dailyActive;if(!t)return null;if(t.goto){const e=_i.find(n=>n.id===t.goto);if(e)return{x:e.x,z:e.z,label:t.title}}if(t.to){const e=this.ctx.npcs.byId[t.to];if(e)return{x:e.pos.x,z:e.pos.z,label:`找 ${e.name}`}}return null}checkDaily(){const t=this.dailyActive;if(t){if(t.need&&this.ctx.inventory.count(t.need)>=(t.count||1)){this.completeDaily();return}t.goto&&this.discovered.has(t.goto)&&this.completeDaily()}}rollDaily(t){if(this.dailyDay===t&&this.daily.length)return;this.dailyDay=t;const e=[...Yr],n=[];for(let i=0;i<2&&e.length;i++){const o=Math.floor(Math.random()*e.length);n.push(e.splice(o,1)[0])}this.daily=n}spawnQuestProps(){this.clearQuestProps();const t=this.currentStep;if(!t)return;const e=this.ctx;if(t.type==="interact"&&t.id&&!t.at){const n=this.stepLocation(t);n&&(e.town.addInteract({id:t.id,x:n.x,z:n.z,y:j(n.x,n.z),r:n.r??1.9,label:n.label||t.desc,kind:n.kind||"pickup",item:n.item,priority:2}),n.kind==="cat"&&this.spawnCat(n.x,n.z,n.y??j(n.x,n.z)))}}spawnCat(t,e,n){const i=this.ctx;this._cat&&(i.town.scene.remove(this._cat),this._cat=null);const o=new Ct,r=et(16183526),a=et(14196830),c=new O(new Pe(.22,10,8),r);c.scale.set(1.5,.85,.9),c.position.y=.2,o.add(c);for(const d of[-1,1]){const u=new O(new Pe(.1,8,6),a);u.position.set(d*.12,.3,.05),o.add(u)}const l=new O(new Pe(.13,10,8),r);l.position.set(.3,.3,0),o.add(l);for(const d of[-1,1]){const u=new O(new Di(.05,.09,4),a);u.position.set(.3+d*.07,.41,0),o.add(u)}const h=new O(new Ne(.03,.03,.34,6),r);h.rotation.z=1.1,h.position.set(-.32,.3,0),o.add(h),o.position.set(t,n,e),o.traverse(d=>{d.castShadow=!0}),i.town.scene.add(o),this._cat=o}clearQuestProps(){const t=this.ctx;this._cat&&(t.town.scene.remove(this._cat),this._cat=null),t.town.interactables=t.town.interactables.filter(e=>!String(e.id).startsWith("q"))}stepLocation(t){return{"q2-umbrella":{x:33,z:34.6,item:"umbrella"},"q4-book":{x:6.2,z:7.6,item:"notebook"},"q3-radio":{x:24.6,z:-46.6,item:null},"q9-key":{x:Vt.kaikanDoor.x,z:Vt.kaikanDoor.z,item:null},"q9-phono":{x:32.5,z:-58,item:null},"q10-decorate":{x:25.3,z:-46.6,item:null},"q5-sit":{x:-30,z:78,item:null},"q7-cat":{x:Vt.waterwheel.x-2.2,z:Vt.waterwheel.z+1.4,kind:"cat",r:2.2},"q8-chair1":{x:30,z:33.4,item:"chair"},"q8-chair2":{x:-44,z:27.4,item:"chair"},"q8-chair3":{x:-32,z:76.4,item:"chair"}}[t.id]||null}onInteractStep(t){const e=this.currentStep;return e&&e.type==="interact"&&e.id===t?(this.advance(),!0):!1}onTalk(t){const e=this.dailyActive;if(e&&e.to===t&&!e.need&&!e.goto)return this.completeDaily(),!0;const n=this.currentStep;if(n&&n.type==="talk"&&n.to===t){this.advance();const i=this.currentStep;return i&&i.type==="give"&&i.to===t&&i.item&&!this.ctx.inventory.has(i.item)&&(this.ctx.inventory.add(i.item,1),this.ctx.ui.toast(`${this.ctx.npcs.byId[t]?.name||"对方"} 把它交给了你。`,"获得")),!0}if(n&&n.type==="give"){const i=n.item;if(this.ctx.inventory.has(i)&&n.to===t)return this.advance(),!0}return!1}refreshTracker(){this.ctx.ui&&this.ctx.ui.refreshTracker()}serialize(){return{done:[...this.done],active:this.active,stepIdx:this.stepIdx,dailyActive:this.dailyActive?.id||null,stepFlags:this.stepFlags,discovered:[...this.discovered],log:this.log.slice(-40),catFound:this.catFound,photoTaken:this.photoTaken,dailyDay:this.dailyDay,daily:this.daily,endingSeen:this.endingSeen,festival:this.festival}}load(t){t&&(this.done=new Set(t.done||[]),this.active=t.active||null,this.stepIdx=t.stepIdx||0,this.stepFlags=t.stepFlags||{},this.discovered=new Set(t.discovered||[]),this.log=t.log||[],this.catFound=!!t.catFound,this.photoTaken=t.photoTaken||0,this.dailyDay=t.dailyDay||0,this.daily=t.daily||[],this.dailyActive=Yr.find(e=>e.id===t.dailyActive)||null,this.endingSeen=!!t.endingSeen,this.festival=!!t.festival,this.festival&&this.spawnFestivalStalls())}}const K1=[{id:"animal",weight:1,minHour:8,maxHour:19,cooldown:1,start(s){const t=[{x:-32,z:70,text:"一只三花猫蹲在公园的草丛边，看见你过来也不跑。"},{x:24,z:-46,text:"神社的石灯笼后面传来猫叫，一只猫探出头。"},{x:66,z:4,text:"小桥上蹲着一只猫，尾巴垂在桥边晃。"},{x:30,z:33,text:"商店街上有只猫正在盯着一扇窗户。"}],e=t[Math.floor(Math.random()*t.length)];return s.town.addInteract({id:"ev-animal",x:e.x,z:e.z,r:2,label:"摸摸小猫",kind:"look",priority:1,text:e.text,once:!0}),s.ui.toast(e.text,"町内","good"),s.audio?.cat(),0}},{id:"trainDelay",weight:.8,minHour:6,maxHour:21,cooldown:1,start(s){return s.trainSystem.delay=25,s.ui.toast("车站广播：「ご迷惑をおかけしますが、次の列車はやく到着します。」","铁路","warn"),s.audio?.page(),0}},{id:"shopLate",weight:.9,minHour:8,maxHour:15,cooldown:1,start(s){return s.shopLate=!0,s.ui.toast("喫茶ひより的招牌还没亮——老板今天起晚了。","町内"),0}},{id:"community",weight:.7,minHour:16,maxHour:20,cooldown:1,start(s){const t=[{x:-68,z:52,who:"nogami"},{x:30,z:33,who:"ken"},{x:0,z:36,who:"yoko"}],e=t[Math.floor(Math.random()*t.length)];return s.town.addInteract({id:"ev-community",x:e.x,z:e.z,r:2.2,label:"和街坊聊聊",kind:"look",priority:1,text:"大家围在一起说镇上的事，谁家孩子考上高中了，祭典预算还差多少。"}),s.ui.toast("商店街那边有人在聊天。","町内"),0}},{id:"crossingTrouble",weight:.6,minHour:8,maxHour:19,cooldown:1,start(s){return s.crossingTrouble=!0,s.ui.toast("道口的警示灯灭了一盏。看起来得等一会儿。","町内","warn"),s.audio?.click(),28},end(s){s.ui.toast("道口的警示灯恢复了。「抱歉，是接触不良。」","町内","good")}},{id:"lostItem",weight:.8,minHour:9,maxHour:18,cooldown:1,start(s){const t=[{x:34,z:25,item:"drink",text:"路边躺着一罐没喝完的饮料。"},{x:-30,z:78,item:"dango",text:"长椅上落着一串团子。"},{x:24,z:-48,item:"ema",text:"社殿前有一枚掉在地上的绘马。"},{x:-6,z:6,item:"notebook",text:"月台上有一本深蓝色笔记本。"}],e=t[Math.floor(Math.random()*t.length)];return s.town.addInteract({id:"ev-lost",x:e.x,z:e.z,r:1.9,label:"捡起东西",kind:"pickup",item:e.item,priority:1,text:e.text}),s.ui.toast(e.text,"町内"),0}}];class J1{constructor(t){this.ctx=t,this.cooldowns={},this.timer=70,this.active=null,this.activeT=0}update(t){const e=this.ctx,n=e.time;for(const l of Object.keys(this.cooldowns))this.cooldowns[l]-=t;if(this.active&&(this.activeT-=t,this.activeT<=0&&(this.active.def.end?.(e),this.active=null)),this.timer-=t,this.timer>0||(this.timer=100+Math.random()*140,n.day===1&&n.hour<11)||this.active)return;const i=K1.filter(l=>{if((this.cooldowns[l.id]||0)>0)return!1;const h=n.hour;return l.minHour<=l.maxHour?h>=l.minHour&&h<l.maxHour:h>=l.minHour||h<l.maxHour});if(!i.length)return;const o=i.reduce((l,h)=>l+h.weight,0);let r=Math.random()*o,a=i[0];for(const l of i)if(r-=l.weight,r<=0){a=l;break}const c=a.start(e)??0;this.cooldowns[a.id]=240,c>0&&(this.active={def:a},this.activeT=c)}}const Q1=`
uniform float uTime;
uniform vec3 uCam;
uniform float uSpeed;
attribute float aOffset;
attribute float aLen;
varying float vA;
void main(){
  vec3 p = position;
  float h = 26.0;
  p.y = mod(p.y - uTime * uSpeed * (0.7 + aOffset * 0.6), h);
  vec3 wp = vec3(uCam.x + p.x, p.y - 2.0, uCam.z + p.z);
  wp.x += sin(uTime * 0.4 + aOffset * 6.28) * 0.6;
  vec4 mv = modelViewMatrix * vec4(wp, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (7.0 + aLen * 5.0) * (16.0 / max(2.0, -mv.z));
  vA = 1.0 - smoothstep(16.0, 34.0, -mv.z);
}`,t_=`
varying float vA;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  // 竖直雨丝
  float a = smoothstep(0.5, 0.08, abs(d.x) * 3.2) * smoothstep(0.5, 0.02, abs(d.y));
  gl_FragColor = vec4(0.82, 0.89, 0.98, a * 0.55 * vA);
}`;class e_{constructor(t){this.scene=t,this.state="clear",this.target=0,this.rain=0,this.clouds=0,this.forced=!1,this.nextChange=3,this.wind=.4,this.rng=ue(9021),this.buildRain()}buildRain(){const e=new Float32Array(7800),n=new Float32Array(2600),i=new Float32Array(2600);for(let r=0;r<2600;r++)e[r*3]=(this.rng()-.5)*40,e[r*3+1]=this.rng()*26,e[r*3+2]=(this.rng()-.5)*40,n[r]=this.rng(),i[r]=.5+this.rng()*.5;const o=new De;o.setAttribute("position",new Re(e,3)),o.setAttribute("aOffset",new Re(n,1)),o.setAttribute("aLen",new Re(i,1)),this.rainMat=new Dn({uniforms:{uTime:{value:0},uCam:{value:new D},uSpeed:{value:17}},vertexShader:Q1,fragmentShader:t_,transparent:!0,depthWrite:!1}),this.points=new Rh(o,this.rainMat),this.points.frustumCulled=!1,this.points.visible=!1,this.scene.add(this.points)}forceRain(){this.forced=!0,this.state="rain",this.target=1}get label(){return this.state==="rain"?"雨":this.clouds>.5?"阴":"晴"}update(t,e,n){if(this.nextChange-=t,this.nextChange<=0&&!this.forced){this.nextChange=40+this.rng()*90;const i=this.rng();i<.55?(this.state="clear",this.target=0):i<.8?(this.state="cloudy",this.target=0):(this.state="rain",this.target=1)}this.forced&&this.nextChange<=0&&(this.nextChange=200),this.rain=me(this.rain,this.target,.6,t),this.clouds=me(this.clouds,this.state==="rain"?1:this.state==="cloudy"?.6:0,.5,t),this.wind=.3+this.clouds*.5+Math.sin(e.hour*1.7)*.1,this.points.visible=this.rain>.02,this.points.visible&&(this.rainMat.uniforms.uTime.value+=t,this.rainMat.uniforms.uCam.value.copy(n))}applyLights(t){const e=this.rain;if(Sx(e),t.sun.intensity*=(1-e*.62)*(1-this.clouds*.18),t.hemi.intensity*=1-e*.1,e>.01){const n=t.scene.fog;n.color.lerp(new Nt(9413296),e*.7),n.near=ft(120,45,e),n.far=ft(440,220,e)}}}const Ho=[{id:"yoko",rainTag:"konbini",name:"藤田 阳子",kana:"ふじた ようこ",age:26,role:"樱花便利店 店员",home:"house-yoko",look:{h:1.63,skin:16176573,hair:6965812,hairStyle:"ponytail",top:15921382,topAlt:15231622,bottom:5925514,bottomStyle:"skirt",skirt:4872306,shoes:15262940,accessory:"apron",blush:!0},likes:["抹茶的东西","商店街闲逛","晚上的安静"],habit:"下班后会在车站前的长椅坐一会儿。",schedule:[{h:[0,6.2],at:"home",act:"sleep",face:Math.PI},{h:[6.2,7.4],at:"street:station",act:"walk"},{h:[7.4,8.6],at:"konbini",act:"walk"},{h:[8.6,21.4],at:"konbini",act:"work",face:Math.PI},{h:[21.4,22.4],at:"street:station",act:"walk"},{h:[22.4,24],at:"home",act:"sleep",face:Math.PI}],greet:["啊，你好。早上就出来逛啦？","欢迎光临——啊，是你。","今天天气不错呢，适合慢悠悠地走走。"]},{id:"ken",rainTag:"station",name:"小林 健",kana:"こばやし けん",age:35,role:"樱町车站 站务员",home:"house-kobayashi",look:{h:1.74,skin:15715758,hair:3025456,hairStyle:"short",top:4876938,topAlt:3822704,bottom:3817290,bottomStyle:"pants",shoes:3092278,accessory:"vest",blush:!1},likes:["准点的列车","整理时刻表","车站的安静"],habit:"总在站台上确认月台的情况。",schedule:[{h:[0,5.6],at:"home",act:"sleep",face:Math.PI},{h:[5.6,6.4],at:"street:station",act:"walk"},{h:[6.4,7],at:"platform",act:"stand",face:Math.PI},{h:[7,12],at:"station",act:"work",face:0},{h:[12,12.6],at:"platform",act:"stand",face:Math.PI},{h:[12.6,19.2],at:"station",act:"work",face:0},{h:[19.2,20.2],at:"street:station",act:"walk"},{h:[20.2,24],at:"home",act:"sleep",face:Math.PI}],greet:["欢迎来到樱町站。","下一班车的时间，要不要看看？","道口那边要等一等，火车来了不能过。"]},{id:"sumi",rainTag:"cafe",name:"森 澄",kana:"もり すみ",age:22,role:"大学生 / 喫茶ひより兼职",home:"house-m2",look:{h:1.6,skin:16309702,hair:3813440,hairStyle:"bob",top:9420968,topAlt:15921382,bottom:15921382,bottomStyle:"skirt",skirt:15255658,shoes:15921382,accessory:"bag",bag:12873850,blush:!0},likes:["拍照","山顶的风景","新的咖啡店"],habit:"喜欢往山上跑，从高处看小镇。",schedule:[{h:[0,8.4],at:"home",act:"sleep",face:Math.PI},{h:[8.4,11],at:"park:center",act:"stand"},{h:[11,12],at:"street:main",act:"walk"},{h:[12,17],at:"cafe",act:"work",face:0},{h:[17,18.6],at:"shrine",act:"stand"},{h:[18.6,20],at:"lookout",act:"stand"},{h:[20,24],at:"home",act:"sleep",face:Math.PI}],greet:["嗨——你也觉得这里很适合发呆吧？","刚从山上下来，风好大。","要喝点什么吗？今天我班。"]},{id:"nogami",rainTag:"kaikan",name:"野上 源一",kana:"のがみ げんいち",age:74,role:"退休教师",home:"house-m1",look:{h:1.6,skin:15255976,hair:14210252,hairStyle:"thin",top:10127978,topAlt:8022602,bottom:5921378,bottomStyle:"pants",shoes:4866104,glasses:!0,blush:!1},likes:["神社的安静","下棋","听年轻人说话"],habit:"每天上午去神社，下午在公园的长椅坐着。",schedule:[{h:[0,6.4],at:"home",act:"sleep",face:Math.PI},{h:[6.4,7.4],at:"street:residential",act:"walk"},{h:[7.4,11],at:"shrine",act:"stand"},{h:[11,12],at:"street:main",act:"walk"},{h:[12,16.6],at:"park:center",act:"sit"},{h:[16.6,18],at:"anchor:benchPark",act:"sit"},{h:[18,19.2],at:"street:residential",act:"walk"},{h:[19.2,24],at:"home",act:"sleep",face:Math.PI}],greet:["年轻人，走慢一点没关系，这镇子就是拿来慢慢走的。","啊，是你。樱花今年开得正好呢。","坐会儿吧？石头被晒得暖暖的。"]},{id:"haruka",rainTag:"school",name:"高橋 遥",kana:"たかはし はるか",age:17,role:"樱町高中 三年级",home:"house-haruka",look:{h:1.58,skin:16309444,hair:4863536,hairStyle:"bob",top:15921382,topAlt:5930933,bottom:4869994,bottomStyle:"skirt",skirt:4147814,shoes:16184558,accessory:"bow",bag:6978202,blush:!0},likes:["放学后的车站","汽水","秘密的地方"],habit:"放学后先在车站看一会儿车才回家。",schedule:[{h:[0,7.2],at:"home",act:"sleep",face:Math.PI},{h:[7.2,7.8],at:"street:residential",act:"walk"},{h:[7.8,15.2],at:"school",act:"stand",face:Math.PI},{h:[15.2,16.2],at:"platform",act:"stand",face:0},{h:[16.2,18],at:"park:center",act:"stand"},{h:[18,19.2],at:"street:main",act:"walk"},{h:[19.2,24],at:"home",act:"sleep",face:Math.PI}],greet:["啊，你在到处走啊。这镇子虽然小，但是藏着不少东西哦。","刚从学校回来，累死了。","嘘——那边有人在练小号。"]}],n_=[{id:"bg-commuter-1",name:"上班族",look:{h:1.72,skin:15715758,hair:3025456,hairStyle:"short",top:5923440,topAlt:4147802,bottom:3817290,bottomStyle:"pants",shoes:3092278,accessory:"bag",bag:4868690,blush:!1},loop:["platform","street:main","street:residential"],period:[7.4,19.2],speed:1.25},{id:"bg-commuter-2",name:"上班族",look:{h:1.66,skin:16176573,hair:3813432,hairStyle:"bob",top:9075354,topAlt:15921382,bottom:4869994,bottomStyle:"skirt",skirt:4147814,shoes:3816002,accessory:"bag",bag:6969962,blush:!1},loop:["street:residential","street:main","platform"],period:[8,19],speed:1.15},{id:"bg-shopper",name:"来买菜的太太",look:{h:1.58,skin:16309702,hair:4864560,hairStyle:"bun",top:13936762,topAlt:15919320,bottom:6969946,bottomStyle:"skirt",skirt:8022634,shoes:4866104,accessory:"bag",bag:10127978,blush:!0},loop:["konbini","street:main","street:residential"],period:[9,17],speed:1},{id:"bg-student",name:"小学生",look:{h:1.32,skin:16309702,hair:3813424,hairStyle:"short",top:6982325,topAlt:15921382,bottom:4868698,bottomStyle:"pants",shoes:3816002,blush:!0},loop:["school","street:residential","park:center"],period:[7.8,15],speed:1.1,scale:.78}],Ce=s=>document.getElementById(s);class i_{constructor(t){this.ctx=t,this.el={hud:Ce("hud"),day:Ce("hud-day"),time:Ce("hud-time"),weather:Ce("hud-weather"),area:Ce("hud-area"),tracker:Ce("tracker-list"),trackerCount:Ce("tracker-count"),prompt:Ce("hint-prompt"),promptText:Ce("prompt-text"),promptKey:Ce("prompt-key"),toasts:Ce("toast-stack"),dialogue:Ce("dialogue"),dlgName:Ce("dlg-name"),dlgText:Ce("dlg-text"),dlgRel:Ce("dlg-rel"),dlgNext:Ce("dlg-next"),dlgFace:Ce("dlg-face"),choice:Ce("choice-box"),panel:Ce("panel"),journal:Ce("journal-content"),people:Ce("people-content"),settings:Ce("settings-content"),map:Ce("map-canvas")},this.dialogQueue=[],this.dialogActive=!1,this.panelOpen=!1,this.activeTab="journal",this._toastTimers=[],this._lastArea=null,this.bind()}bind(){document.querySelectorAll(".panel-tabs button").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.tab;if(e==="close")return this.closePanel();this.setTab(e),this.ctx.audio?.page()})}),this.el.dialogue.addEventListener("click",()=>this.nextLine()),this.buildSettings()}updateHUD(t,e,n){this.el.time.textContent=So(t.hour),this.el.day.textContent=`春 · 第${t.day}日`,this.el.weather.textContent=e?.label||"晴";let i=null,o=1e9;for(const a of Ml){const c=bn(n.pos.x,n.pos.z,a.x,a.z);c<a.r&&c<o&&(o=c,i=a)}const r=this.ctx.zones?.isIndoor?this.ctx.zones.currentZoneName||"室内":i?.name||"小镇";r!==this._lastArea&&(this.el.area.textContent=r,this._lastArea=r)}updateObjectiveArrow(t,e,n){if(!this._arw)return;if(!t){this._arw.style.opacity="0.25",this._dist&&(this._dist.textContent="");return}const i=t.x-e.x,o=t.z-e.z,r=Math.hypot(i,o);this._arw.style.opacity="1";const a=Math.atan2(i,o)-n;this._arw.style.display="inline-block",this._arw.style.transform=`rotate(${(-a*180/Math.PI).toFixed(1)}deg)`,this._dist&&(this._dist.textContent=r>4?` ${Math.round(r)}m · `:"")}currentAreaName(){if(this.ctx.zones?.isIndoor)return this.ctx.zones.currentZoneName||"室内";const t=this.ctx.game.player.pos;let e=null,n=1e9;for(const i of Ml){const o=Math.hypot(t.x-i.x,t.z-i.z);o<i.r&&o<n&&(n=o,e=i)}return e?.name||"小镇"}setPrompt(t,e="E"){if(!t){this.el.prompt.classList.add("hidden");return}this.el.prompt.classList.remove("hidden"),this.el.promptText.textContent=t,this.el.promptKey.textContent=e.toUpperCase()}toast(t,e="便笺",n=""){const i=document.createElement("div");for(i.className="toast "+n,i.innerHTML=`<div class="t-head">${e}</div><div>${t}</div>`,this.el.toasts.appendChild(i),setTimeout(()=>{i.classList.add("out"),setTimeout(()=>i.remove(),420)},4200);this.el.toasts.children.length>5;)this.el.toasts.firstChild.remove()}discover(t){this.toast(`${t.desc}`,`发现 · ${t.name}`,"good")}questComplete(t){const e=t.reward||{};let n=`「${t.title}」完成了`;e.money&&(n+=` · 报酬 ${e.money}円`),this.toast(n,"完成","good"),this.ctx.audio?.success(),t.reward?.ending&&setTimeout(()=>this.endingScene(),1200)}endingScene(){this.saySequence([{name:"小镇",text:"傍晚的神社前挂起了纸灯串。商店街的招牌一盏盏亮起来，道口的铃铛安静地等着下一班车。"},{name:"小镇",text:"你在这里帮每个人跑了一点小事，于是认识了他们，也被他们记住了。"},{name:"",text:"—— 樱花小镇 · 第一章 完 ——"}],()=>this.toast("还想继续待着的话，小镇随时都在。","日常","good"))}refreshTracker(){const t=this.ctx.quests,e=this.el.tracker;e.innerHTML="";const n=[],i=t.currentQuest;i&&n.push({title:i.title,obj:t.currentObjectiveText,side:!1});for(const o of _i)if(!(o.discover===!1||t.discovered.has(o.id))){n.push({title:"未发现的地方",obj:`在镇上找找看（${t.discoveredCount}/${t.totalLandmarks}）`,side:!0});break}t.endingSeen&&n.push({title:"小镇祭 已举办",obj:"章节完成",side:!0}),n.length||n.push({title:"今天很闲",obj:"去车站的告示板看看",side:!0});for(const o of n){const r=document.createElement("div");r.className="trk",o.side||(r.id="trk-active"),r.innerHTML=`<div class="trk-dot ${o.side?"side":""}"></div>
        <div class="trk-body"><div class="trk-title">${o.title}</div><div class="trk-obj"><span class="arw" id="obj-arw">➤</span><span id="obj-dist"></span>${o.obj}</div></div>`,e.appendChild(r)}this._arw=this.el.tracker.querySelector("#obj-arw"),this._dist=this.el.tracker.querySelector("#obj-dist"),this.el.trackerCount.textContent=t.done.size}saySequence(t,e){this.dialogQueue=[...t],this.dialogOnDone=e,this.nextLine()}say(t,e,n){this.dialogQueue=[{name:t,text:e,npcId:n}],this.dialogOnDone=null,this.nextLine()}nextLine(){if(this.dialogActive){if(this._typing){this._typing=!1,this.el.dlgText.textContent=this._fullText;return}this.dialogActive=!1,this.el.dialogue.classList.add("hidden"),this.ctx.game.time.paused=!1;const n=this.dialogOnDone;this.dialogOnDone=null,n&&n();return}const t=this.dialogQueue.shift();if(!t)return;this.dialogActive=!0,this.el.dialogue.classList.remove("hidden");const e=t.npcId?this.ctx.npcs.byId[t.npcId]:null;if(this.el.dlgName.textContent=t.name||(e?e.name:""),this.el.dlgRel.textContent="",e){const n=e.affinity;this.el.dlgRel.textContent=e.met?n>=4?"亲近":n>=2?"熟识":n>=1?"认识":"点头之交":"",Xl(this.el.dlgFace,e.def.look)}else this.el.dlgFace.getContext("2d").clearRect(0,0,160,160);this.el.dlgNext.style.display=t.name===""?"none":"block",this.typeText(t.text),this.ctx.game.time.paused=!0}typeText(t){this._fullText=t,this._typing=!0;let e=0;const n=this.el.dlgText;n.textContent="",clearInterval(this._typer),this._typer=setInterval(()=>{e+=2,n.textContent=t.slice(0,e),e>=t.length&&(this._typing=!1,clearInterval(this._typer))},16)}talkTo(t){const e=this.ctx.npcs.byId[t];if(!e)return;const n=!e.met;e.met=!0,e.facePlayer(this.ctx.game.player.pos.x,this.ctx.game.player.pos.z),e.char.say(2.2);const i=[];n?i.push({npcId:t,name:e.name,text:this.ctx.questDialogue.intro(e)}):i.push(...this.ctx.questDialogue.talk(e));const o=this.ctx.quests,r=o.currentStep;r&&r.type==="give"&&r.to===t&&this.ctx.inventory.has(r.item)?(i.push({npcId:t,name:e.name,text:this.ctx.questDialogue.receive(e,r.item)}),setTimeout(()=>o.onTalk(t),400)):r&&r.type==="talk"&&r.to===t&&setTimeout(()=>o.onTalk(t),400),this.saySequence(i)}setTab(t){this.activeTab=t,document.querySelectorAll(".panel-tabs button").forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),document.querySelectorAll(".tab-page").forEach(e=>e.classList.toggle("active",e.dataset.page===t)),this.renderTab()}openPanel(t="journal"){this.panelOpen=!0,this.el.panel.classList.remove("hidden"),this.ctx.game.input.block(!0),this.ctx.game.time.paused=!0,this.setTab(t),this.ctx.audio?.page()}closePanel(){this.panelOpen=!1,this.el.panel.classList.add("hidden"),this.ctx.game.input.block(!1),this.ctx.game.time.paused=!1}togglePanel(t){this.panelOpen?this.closePanel():this.openPanel(t||this.activeTab)}renderTab(){this.activeTab==="journal"&&this.renderJournal(),this.activeTab==="people"&&this.renderPeople(),this.activeTab==="map"&&this.renderMap(),this.activeTab==="settings"&&this.buildSettings()}renderJournal(){const t=this.ctx.quests,e=this.el.journal;e.innerHTML="";const n=h=>{const d=document.createElement("div");return d.className="jr-sec",d.innerHTML=`<h3>${h}</h3>`,e.appendChild(d),d},i=t.currentQuest;if(i){const h=n("进行中"),d=document.createElement("div");d.className="jr-card",d.innerHTML=`<div class="jr-t">${i.title}</div>
        <div class="jr-d">${i.brief}</div>
        <div class="jr-meta"><span>▸ ${t.currentObjectiveText||""}</span></div>`,h.appendChild(d)}const o=n("便笺一览");for(const h of ns){const d=t.done.has(h.id),u=t.active===h.id,f=t.available().includes(h);if(!d&&!u&&!f)continue;const p=document.createElement("div");p.className="jr-card"+(d?" done":""),p.innerHTML=`<div class="jr-t">${h.title}<span class="jr-tag">第${h.chapter}章</span></div>
        <div class="jr-d">${h.brief}</div>
        <div class="jr-meta"><span>${d?"已完成":u?"进行中":"可在告示板接取"}</span>
        ${h.reward?.money?`<span>报酬 ${h.reward.money}円</span>`:""}</div>`,o.appendChild(p)}o.children.length||(o.innerHTML+='<div class="jr-empty">还没有接到委托。去车站的告示板看看吧。</div>');const r=n(`发现的地方  ${t.discoveredCount}/${t.totalLandmarks}`),a=document.createElement("div");a.style.cssText="display:flex;flex-wrap:wrap;gap:8px";for(const h of _i){const d=t.discovered.has(h.id),u=document.createElement("div");u.style.cssText=`padding:6px 12px;border-radius:999px;font-size:12px;border:1px solid ${d?"#e2738f":"#ddd"};background:${d?"#fde4ea":"#f6f2ea"};color:${d?"#a04a63":"#aaa"}`,u.textContent=d?h.name:"？？？",a.appendChild(u)}r.appendChild(a);const c=n("手记"),l=document.createElement("div");l.className="jr-empty",l.innerHTML=t.log.length?t.log.slice(-14).reverse().map(h=>`第${h.day}日 · ${h.text}`).join("<br>"):"还没有值得记下的事。",c.appendChild(l)}renderPeople(){const t=this.el.people;t.innerHTML="";for(const e of Ho){const n=this.ctx.npcs.byId[e.id];if(!n)continue;const i=document.createElement("div");i.className="pp",i.innerHTML=`<div class="pp-av"><canvas width="120" height="120"></canvas></div>
        <div class="pp-info">
          <div class="pp-name">${e.name} <span style="font-size:11px;color:#a49bab">${e.kana}</span></div>
          <div class="pp-role">${e.role} · ${e.age}岁</div>
          <div class="pp-note">${n.met?e.habit:"还没说过话。"}</div>
          <div class="pp-rel">${Array.from({length:5},(r,a)=>`<i class="${a<n.affinity?"on":""}"></i>`).join("")}</div>
          <div class="pp-loc">${n.met?"现在在："+this.npcLocation(n):""}</div>
        </div>`,t.appendChild(i);const o=i.querySelector("canvas");Xl(o,e.look,!0)}}npcLocation(t){if(this.ctx.zones?.isIndoor)return t.zone!=="world"?this.ctx.zones.zones[t.zone]?.name||"室内":"外面";const e=t.activity,n={sleep:"家里",work:"工作的地方",sit:"坐着休息",walk:"在路上",stand:"在附近"};return t.zone!=="world"?this.ctx.zones.zones[t.zone]?.name||"室内":e&&n[e.act]||"在附近"}renderMap(){const t=this.el.map,e=t.getContext("2d"),n=t.width,i=t.height,o=122,r=Math.min(n,i)/(o*2),a=-6,c=26,l=p=>n/2+(p-a)*r,h=p=>i/2+(p-c)*r;e.clearRect(0,0,n,i),e.fillStyle="#f7f1e6",e.fillRect(0,0,n,i),e.save(),e.globalAlpha=.5,e.fillStyle="#dfe8d2",e.beginPath(),e.arc(l(0),h(0),86*r,0,xt),e.fill(),e.fillStyle="#cfe0c6",e.beginPath(),e.arc(l(0),h(0),140*r,0,xt),e.fill(),e.restore(),e.strokeStyle="#a8cede",e.lineWidth=6*r*3,e.lineCap="round",e.lineJoin="round",e.beginPath(),Ii.pts.forEach(([p,x],g)=>g?e.lineTo(l(p),h(x)):e.moveTo(l(p),h(x))),e.stroke(),e.strokeStyle="#8a8478",e.lineWidth=3,e.setLineDash([8,6]),e.beginPath();for(let p=-o;p<=o;p+=6){const x=h(jt.zAt(p));p===-o?e.moveTo(l(p),x):e.lineTo(l(p),x)}e.stroke(),e.setLineDash([]),e.strokeStyle="#d8cdb4",e.lineCap="round";for(const p of qs)e.lineWidth=(p.type==="asphalt"?7:4.5)*r*1.6,e.beginPath(),p.pts.forEach(([x,g],m)=>m?e.lineTo(l(x),h(g)):e.moveTo(l(x),h(g))),e.stroke();e.fillStyle="#c4a99a";for(const p of cs)e.save(),e.translate(l(p.x),h(p.z)),e.rotate(-p.rot),e.fillRect(-p.w*r/2,-p.d*r/2,p.w*r,p.d*r),e.restore();e.fillStyle="#b9a894",e.fillRect(l(Ye.platform.x0),h(3.5),(Ye.platform.x1-Ye.platform.x0)*r,6*r),e.fillStyle="#c26a5a",e.beginPath(),e.arc(l(24),h(-54),9,0,xt),e.fill();const d=this.ctx.quests;for(const p of _i){const x=d.discovered.has(p.id);e.beginPath(),e.arc(l(p.x),h(p.z),x?6:5,0,xt),e.fillStyle=x?"#e2738f":"#ffffff",e.fill(),e.strokeStyle=x?"#b8506c":"#c0b8ac",e.lineWidth=1.6,e.stroke(),x&&(e.fillStyle="#5a4a52",e.font="11px sans-serif",e.textAlign="center",e.fillText(p.name,l(p.x),h(p.z)-10))}for(const p of this.ctx.npcs.list)p.zone==="world"&&(e.beginPath(),e.arc(l(p.pos.x),h(p.pos.z),3.4,0,xt),e.fillStyle=p.isBackground?"#c8c0b4":"#ffffff",e.fill(),e.strokeStyle="#8a8478",e.lineWidth=1.2,e.stroke());const u=d.objectiveMarker;u&&(e.strokeStyle="#e2738f",e.lineWidth=2.4,e.beginPath(),e.arc(l(u.x),h(u.z),10,0,xt),e.stroke(),e.fillStyle="#e2738f",e.beginPath(),e.arc(l(u.x),h(u.z),3,0,xt),e.fill());const f=this.ctx.game.player;e.save(),e.translate(l(f.pos.x),h(f.pos.z)),e.rotate(-f.yaw+Math.PI),e.fillStyle="#3a7fb5",e.beginPath(),e.moveTo(0,-9),e.lineTo(6,7),e.lineTo(0,3.5),e.lineTo(-6,7),e.closePath(),e.fill(),e.restore(),e.fillStyle="#8a8478",e.font="10px sans-serif",e.textAlign="left",e.fillText("N",n/2,16)}buildSettings(){const t=this.el.settings;if(!t)return;const e=this.ctx.audio;t.innerHTML=`
      <div class="jr-sec"><h3>音量</h3></div>
      <div class="set-row"><label>总音量<span class="hint">整体响度</span></label>
        <input type="range" min="0" max="100" value="${e.volumes.master*100|0}" data-vol="master"></div>
      <div class="set-row"><label>环境音<span class="hint">风、雨、列车、虫鸣</span></label>
        <input type="range" min="0" max="100" value="${e.volumes.ambient*100|0}" data-vol="ambient"></div>
      <div class="set-row"><label>效果音<span class="hint">脚步、门、铃声</span></label>
        <input type="range" min="0" max="100" value="${e.volumes.sfx*100|0}" data-vol="sfx"></div>
      <div class="jr-sec" style="margin-top:22px"><h3>时间</h3></div>
      <div class="set-row"><label>时间流速<span class="hint">一天约 ${Math.round(24/(1/70)/60)} 分钟</span></label>
        <input type="range" min="20" max="240" value="70" data-time="1"></div>
      <div class="set-row"><label>跳过傍晚<span class="hint">开启后夜晚更快到来</span></label>
        <input type="checkbox" data-opt="fastnight"></div>
      <div class="jr-sec" style="margin-top:22px"><h3>存档</h3></div>
      <div class="set-btns">
        <button data-act="save">保存进度</button>
        <button data-act="load">读取进度</button>
        <button data-act="skip">跳到傍晚</button>
        <button data-act="rain">来一场雨</button>
        <button data-act="reset" class="danger">重新开始</button>
      </div>
      <div class="jr-sec" style="margin-top:22px"><h3>统计</h3></div>
      <div class="stat-grid" id="stat-grid"></div>
    `,t.querySelectorAll("input[data-vol]").forEach(i=>{i.addEventListener("input",()=>e.setVolume(i.dataset.vol,i.value/100))}),t.querySelector("input[data-time]").addEventListener("input",i=>{this.ctx.game.time.scale=1/+i.target.value}),t.querySelector('input[data-opt="fastnight"]').addEventListener("change",i=>{this.ctx.game.fastNight=i.target.checked}),t.querySelectorAll("button[data-act]").forEach(i=>{i.addEventListener("click",()=>this.settingAction(i.dataset.act))});const n=document.getElementById("stat-grid");this.ctx.game,n.innerHTML=`
      <div>游戏天数<b>${this.ctx.time.day}</b></div>
      <div>完成委托<b>${this.ctx.quests.done.size}/${ns.length}</b></div>
      <div>发现地点<b>${this.ctx.quests.discoveredCount}/${this.ctx.quests.totalLandmarks}</b></div>
      <div>持有金额<b>${this.ctx.inventory.money}円</b></div>
      <div>认识的人<b>${this.ctx.npcs.list.filter(i=>i.met).length}/${Ho.length}</b></div>
      <div>总亲密度<b>${this.ctx.npcs.list.reduce((i,o)=>i+o.affinity,0)}</b></div>
      <div>当前时刻<b>${So(this.ctx.time.hour)}</b></div>
      <div>所在位置<b>${this.currentAreaName()}</b></div>`}settingAction(t){const e=this.ctx.game;switch(t){case"save":e.save(),this.toast("进度已保存。","存档","good");break;case"load":e.load(),this.toast("已读取进度。","存档"),this.closePanel();break;case"skip":e.time.setHour(17.6),this.toast("时间快进到傍晚。","时间");break;case"rain":e.weather?.forceRain(),this.toast("云从山那边压过来了。","天气");break;case"reset":confirm("确定要重新开始吗？当前进度会被清除。")&&(localStorage.removeItem("sakura-town-save"),location.reload());break}}openBoard(t="station"){const e=this.ctx.quests;e.rollDaily(this.ctx.time.day),this.boardKind=t,this.boardEl=document.createElement("div"),this.boardEl.className="panel",this.boardEl.innerHTML=`<div class="panel-card" style="width:min(660px,92vw);height:auto;max-height:82vh">
      <div class="panel-tabs"><button class="active">车站告示板</button><button class="tab-x" data-close="1">✕</button></div>
      <div class="panel-body" style="overflow:auto"><div class="tab-page active" id="board-body"></div></div></div>`,document.getElementById("app").appendChild(this.boardEl),this.boardEl.addEventListener("click",n=>{if(n.target===this.boardEl||n.target.dataset.close){this.closeBoard();return}const i=n.target.closest("[data-quest]");i&&(e.accept(i.dataset.quest),this.closeBoard())}),this.renderBoard(),this.ctx.game.time.paused=!0}closeBoard(){this.boardEl?.remove(),this.boardEl=null,this.ctx.game.time.paused=!1}renderBoard(){const t=document.getElementById("board-body");if(!t)return;const e=this.ctx.quests;let n='<div class="jr-sec"><h3>今天可以接下的事</h3></div>';e.currentQuest&&(n+=`<div class="jr-card"><div class="jr-t">进行中：${e.currentQuest.title}</div>
        <div class="jr-d">${e.currentObjectiveText||""}</div></div>`,n+='<div class="set-btns"><button data-act2="abandon">暂时放下</button></div>');const i=e.atBoard();for(const o of i)n+=`<div class="jr-card"><div class="jr-t">${o.title}<span class="jr-tag">第${o.chapter}章</span></div>
        <div class="jr-d">${o.brief}</div>
        <div class="set-btns"><button data-quest="${o.id}">接下这件事</button></div></div>`;i.length||(n+='<div class="jr-empty">暂时没有新的事了。去镇上走走吧。</div>'),n+='<div class="jr-sec" style="margin-top:20px"><h3>町内会通知</h3></div>';for(const o of e.daily){const a=e.dailyActive&&e.dailyActive.id===o.id?`<div class="jr-meta"><span>进行中</span><span>报酬 ${o.money}円</span></div>`:e.dailyActive?`<div class="jr-meta"><span>报酬 ${o.money}円</span></div>`:`<div class="set-btns"><button data-daily="${o.id}">接下这件事</button></div>`;n+=`<div class="jr-card"><div class="jr-t">${o.title}</div><div class="jr-d">${o.desc}</div>
        <div class="jr-meta"><span>报酬 ${o.money}円</span><span>委托人：${Ho.find(c=>c.id===o.to)?.name||""}</span></div>${a}</div>`}n+='<div class="jr-empty" style="margin-top:6px">※ 「町内会通知」是每天都会出现的小委托，帮忙完成会有好事发生。</div>',t.innerHTML=n;for(const o of t.querySelectorAll("[data-daily]"))o.addEventListener("click",()=>{e.acceptDaily(o.dataset.daily),this.renderBoard()});t.querySelector('[data-act2="abandon"]')?.addEventListener("click",()=>{e.abandon(),this.renderBoard()})}openTimetable(){const t=this.ctx.time,e=this.ctx.trainSystem.nextTrain(t.hour),n=Us.map(o=>{const r=o.arr<t.hour;return`<tr><td>${So(o.arr)}</td><td>${o.dir>0?"下行":"上行"}</td><td>${o.dest}</td>
        <td style="color:${r?"#b8b0bc":"#4a4452"};font-weight:${r?400:600}">${r?"已通过":""}</td></tr>`}).join(""),i=document.createElement("div");i.className="panel",i.innerHTML=`<div class="panel-card" style="width:min(520px,92vw);height:auto">
      <div class="panel-tabs"><button class="active">樱町站 时刻表</button><button class="tab-x" data-close="1">✕</button></div>
      <div class="panel-body" style="overflow:auto"><div class="tab-page active">
        <div class="jr-empty" style="margin-bottom:14px">下一班：<b style="color:#e2738f">${So(e.arr>24?e.arr-24:e.arr)}</b>（${e.dir>0?"下行":"上行"} · 往${e.dest}）
        ${e.tomorrow?"<br>（今天的末班车已经开走了）":""}</div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr style="color:#9a92a0;font-size:11px;letter-spacing:.1em">
            <th style="text-align:left;padding:6px 0">时刻</th><th style="text-align:left">方向</th>
            <th style="text-align:left">目的地</th><th style="text-align:left"></th></tr>
          ${n}</table>
      </div></div></div>`,document.getElementById("app").appendChild(i),i.addEventListener("click",o=>{(o.target===i||o.target.dataset.close)&&(i.remove(),this.ctx.game.time.paused=!1)}),this.ctx.game.time.paused=!0,this.ctx.audio?.page()}openLetter(){const t=this.ctx.quests.flags&&this.ctx.quests.flags.letters||[];this.say("藤田 家",t.length?t.join(`
`):"信箱里只有广告传单。",null)}setPaused(t){this.ctx.game.time.paused=t}}function Xl(s,t,e=!1){const n=s.getContext("2d"),i=s.width,o=s.height;n.clearRect(0,0,i,o);const r=n.createLinearGradient(0,0,0,o);r.addColorStop(0,"#fdeef2"),r.addColorStop(1,"#f3dfe6"),n.fillStyle=r,n.fillRect(0,0,i,o);const a=i/2,c=o*.56,l=i*.33,h=It(t.hair),d=It(t.skin);n.fillStyle=h,n.beginPath(),n.ellipse(a,c-l*.12,l*1.08,l*1.16,0,0,xt),n.fill(),n.fillStyle=d,n.beginPath(),n.ellipse(a,c+l*.04,l*.86,l*.98,0,0,xt),n.fill(),n.fillStyle=h;const u=t.hairStyle;u==="bob"||u==="long"||u==="bun"||u==="ponytail"?(n.beginPath(),n.ellipse(a,c-l*.42,l*1.02,l*.62,0,Math.PI,xt),n.fill(),n.beginPath(),n.ellipse(a-l*.84,c+l*.12,l*.28,l*.62,0,0,xt),n.fill(),n.beginPath(),n.ellipse(a+l*.84,c+l*.12,l*.28,l*.62,0,0,xt),n.fill()):u==="cap"?(n.fillStyle=It(t.hat||4877194),n.beginPath(),n.ellipse(a,c-l*.5,l*1.05,l*.5,0,Math.PI,xt),n.fill(),n.beginPath(),n.ellipse(a,c-l*.42,l*1.3,l*.16,0,0,Math.PI),n.fill()):(n.beginPath(),n.ellipse(a,c-l*.48,l*1,l*.5,0,Math.PI,xt),n.fill()),n.fillStyle="#33262c";for(const f of[-1,1])n.beginPath(),n.ellipse(a+f*l*.33,c-l*.02,l*.1,l*.15,0,0,xt),n.fill();n.fillStyle="#fff";for(const f of[-1,1])n.beginPath(),n.ellipse(a+f*l*.36,c-l*.07,l*.035,l*.045,0,0,xt),n.fill();if(n.strokeStyle="#a85a58",n.lineWidth=Math.max(1.4,l*.06),n.beginPath(),n.arc(a,c+l*.34,l*.16,.2,Math.PI-.2),n.stroke(),t.blush!==!1){n.fillStyle="rgba(242,163,168,.5)";for(const f of[-1,1])n.beginPath(),n.ellipse(a+f*l*.56,c+l*.2,l*.15,l*.09,0,0,xt),n.fill()}if(t.glasses){n.strokeStyle="#4a4a52",n.lineWidth=Math.max(1.2,l*.05);for(const f of[-1,1])n.beginPath(),n.arc(a+f*l*.33,c-l*.02,l*.2,0,xt),n.stroke();n.beginPath(),n.moveTo(a-l*.13,c-l*.04),n.lineTo(a+l*.13,c-l*.04),n.stroke()}}const Io=s=>s[Math.floor(Math.random()*s.length)],s_={dawn:["起得真早。","这个点街上还没什么人呢。","空气凉凉的，很舒服。"],morning:["早上好。","今天天气不错。","这会儿生意还没开始忙。"],noon:["中午好，饿了吧。","这个点儿太阳正烈。"],late:["下午了，一天过得好快。","再过一个钟头天就要暗下来了。"],evening:["今天的光很好看。","傍晚的町内，安静得刚好。"],night:["这么晚还在外面？","夜里的小镇很适合散步。"]},o_={nogami:[["……你来了。","年轻人总是脚步匆匆的。","坐下吧，晒晒太阳。"],["最近常看到你。","这个镇子因为有你热闹了点。","有空的话，再来坐坐。"],["你已经不是客人了。","有什么需要帮忙的，说一声。","这镇子很小，但够温暖。"],["你这孩子，跟我年轻时候一个样。","坐吧，别站着。","今天的茶我自己泡的。"],["以后啊，这镇子的事你也可以拿主意。","我这把老骨头，就托付给你一点了。","来都来了，再喝一杯。"]],yoko:[["欢迎光临。","要喝点什么吗？","今天很热吧。"],["又见面了。","刚才有个人来买汽水呢。","店里刚补了货。"],["你可是我们的老顾客了。","这把伞你拿着吧。","有空常来坐。"],["以后啊，这间店就靠你多照应了。","你来的那天开始，客人就变多了。","有空来喝杯茶，我给你留着。"]],ken:[["你好。","车马上要来了。","道口那边请等一等。"],["今天人不多，挺清闲。","刚才那班车晚了五分钟。","月台上风大，注意。"],["有你在，这镇子安心多了。","有什么想知道的，问我就行。","祭典的事，交给我吧。"],["下回你值班，我就能歇一会儿了。","你值班的时候，车站都热闹点。","有你在，这班车上我不困。"]],sumi:[["嗨。","你也是来拍照的吗？","今天的云很好看。"],["又见面啦。","我从山上拍到一张特别好的。","要不要来杯咖啡？"],["你真的会留下来看这个镇子啊。","下次比赛得奖了，第一个给你看。","这杯我请。"],["这张照片，送你了。","胶卷你自己留着吧。","下次一起去山顶吧。"]],haruka:[["啊。","放学了，真累。","你在镇上到处跑呢？"],["又遇到你了！","车站那边今天车很多。","公园里那只猫超可爱。"],["我跟你说个秘密。","这个镇子的人都挺好的。","以后你要是走了，我会寂寞的。"],["你是我第一个想告诉的人。","车站每天放学都有人。","以后也一起走吧。"]]},r_=["……","今天也是平静的一天。","你慢慢逛，我不打扰你。"],a_={intro(s){return{yoko:"啊，你不是住在镇上的吧？我是这里便利店的店员，藤田阳子。有什么事都可以来找我。",ken:"你好，我是车站的站务员，小林健。有问题问我就对了。",sumi:"嗨！我是森澄，大学一年级，周末在这里帮忙。很高兴认识你。",nogami:"……你好啊年轻人。我是野上，教了一辈子书，现在什么也不教了。",haruka:"啊……同学？我不是啦。我是高橋遥，高三的。你是……新来的？"}[s.id]||"你好。"},receive(s,t){return{drink:"谢谢！正好渴了。……你真是个好人。",soda:"橘子汽水！我就知道你会买这个。……谢啦。",umbrella:"啊，我的伞！还以为丢在花の国门口了呢。谢谢你跑这一趟。",radio:"真是修好了啊……这台跟了我三十年了。谢谢你，年轻人。",notebook:"这本笔记是那个高中女孩的吧。太好了，落在车上可就麻烦了。",film:"拍到了吗？太好了。……你真的很认真呢。",cat:"小豆！你跑哪儿去了……谢谢你啊，帮我把它带回来。",chair:"嗯，椅子都找齐了。这样集会所就够用了。",film2:"这张照片我要放大看。"}[t]||"谢谢你。"},talk(s){const t=s.__hour??12,e=t<7?"dawn":t<11?"morning":t<15?"noon":t<17.4?"late":t<19.6?"evening":"night",n=s.affinity,i=[...o_[s.id]?.[Math.min(n,4)]||r_];Math.random()<.5&&i.push(Io(s_[e])),Math.random()<.3&&i.push("……");const o=Io(i);if(s.__hour=t,n>=2&&s.def?.likes?.length&&Math.random()<.22){const r=Io(s.def.likes);return[o,`我最喜欢${r}。`]}return n>=2&&Math.random()<.25?[o,Io(s.id==="nogami"?["你知道吗，这镇子的樱花是四十年前三个人一起种的。","神社后面那条路，秋天最好看。","有事的话，来住宅区找我，别客气。"]:s.id==="yoko"?["便利店夜里最亮。路过的人看见灯就会安心一点。","明天可能会下雨，记得带伞。","大家喜欢的口味我都记着呢。"]:s.id==="ken"?["这条线路已经开了三十年了。","月台尽头能看到整个小镇的屋顶。","火车准点的时候，大家表情都很轻松。"]:s.id==="sumi"?["见晴台是我最喜欢的地方。你一定要去看看。","山上的云比山下快。","你的话，应该会喜欢这里。"]:["车站每天放学都有一堆人。","公园那只猫是我喂的啦。","你要是无聊，可以去商店街逛逛。"])]:[o]}},ql="sakura-town-save";class c_{constructor(t){this.canvas=t,this.renderer=new ag({canvas:t,antialias:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=jl,this.renderer.outputColorSpace=dn,this.scene=new cg,this.camera=new un(52,innerWidth/innerHeight,.1,700),this.scene.add(this.camera),this.clock=new Ig,this.input=new zg(t),this.collision=new ix,this.player=new cx(this.collision),this.rig=new lx(this.camera,this.collision),this.rig.groundFn=j,this.paused=!1,this.fastNight=!1,this.debugFree=!1,this.stepT=0,this.game=this}onProgress(t,e){this._progress?.(t,e)}async boot(){const t=async(e,n,i)=>(this.onProgress(e,n),await new Promise(o=>setTimeout(o,10)),i?.());await t(5,"塑造山谷与溪流…",()=>Kg()),await t(18,"计算道路与人行道…",()=>Kh()),await t(30,"搭建町内建筑…",()=>{this.town=new f1(this.scene,this.collision),this.town.build()}),await t(50,"铺设铁轨与月台…",()=>{this.scene.add(Zh()),this.scene.add(Xh())}),await t(60,"布置室内…",()=>{const e=N1(this.scene,this.collision);this.interiorZones=e.zones,this.interiorInteractables=e.interactables,this.interiorDynamic=e.dynamic,this.interiorLights=e.lights}),await t(72,"整理碰撞…",()=>this.collision.index()),await t(80,"准备天空与光…",()=>{this.sky=new mx(this.scene),this.time=new X1,this.audio=new q1,this.weather=new e_(this.scene)}),await t(88,"町民们正在醒来…",()=>{this.nav=g1(),this.npcs=new ux(this.scene,this.nav,Ho,n_),this.inventory=new j1,this.zones=new Y1(this),this.zones.setZones(this.interiorZones),this.zones.interactables=this.interiorInteractables;for(const e of Object.keys(this.interiorZones))this.interiorZones[e].name=$g[e]?.name||e;this.zones.currentZoneName="",this.quests=new Z1(this),this.questDialogue=a_,this.ui=new i_(this),this.interaction=new $1(this),this.events=new J1(this)}),await t(96,"最后一遍检查…",()=>{this.setupWorld(),this.resize(),this.interaction.refresh(),this.ui.refreshTracker()}),await t(100,"准备完成")}setupWorld(){this.player.groundFn=j;const t={x:-10,z:25.5,yaw:0};this.player.teleport(t.x,j(t.x,t.z),t.z,t.yaw),this.rig.yaw=t.yaw+Math.PI,this.rig.pitch=.19,this.rig.smoothTarget.copy(this.player.pos),this.scene.add(this.player.obj);for(const e of this.npcs.list){const n=e.resolveSpot(e.def.schedule?e.def.schedule[0].at||e.def.schedule[0].tag:e.def.loop[0]);if(n.zone==="world")e.place(n.pos.x,n.pos.z,n.face||0);else{const i=this.interiorZones[n.zone]?.origin;i&&(e.zone=n.zone,e.pos.set(i.x+n.pos.x,0,i.z+n.pos.z),e.obj.position.copy(e.pos),e.yaw=n.face||0,e.obj.rotation.y=e.yaw)}}this.heightAt=j,this.trainSystem=this.town.trainSystem,this.trainSystem.audio=this.audio,this.town.crossingCtl.audio=this.audio,this.town.trainSystem.on("whistle",()=>this.audio.whistle(!1)),this.town.trainSystem.on("arrive",()=>{this.audio.chime(),this.audio.brake()}),this.town.trainSystem.on("doorsOpen",()=>this.audio.doorChime()),this.town.trainSystem.on("doorsClose",()=>this.audio.doorChime()),this.town.trainSystem.on("approach",()=>this.rig.addShake(.02)),this.time.onNewDay=e=>{this.quests.rollDaily(e),this.ui.toast(`第 ${e} 天开始了。`,"清晨"),this.ui.refreshTracker()}}resize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight)}setFreeCam(t,e){this.freeCam=t?{pos:t,look:e}:null}setHour(t){this.time.hour=t}onPauseUI(){}start(){this.audio.init(),this.audio.resume(),this.clock.start(),this.quests.rollDaily(this.time.day),this.renderer.setAnimationLoop(()=>this.frame())}frame(){const t=Math.min(this.clock.getDelta(),.05);try{this.tick(t),this._err=null}catch(e){this._err=e,this._reported||(this._reported=!0,console.error("[SakuraTown] frame error:",e));try{this.input.endFrame()}catch{}}}tick(t){const e=this.ui,n=this.zones.isIndoor;this.handleKeys(),!this.paused&&!e.dialogActive&&!e.panelOpen&&!this.boardEl&&(this.time.update(t),this.fastNight&&this.time.hour>18.4&&this.time.hour<20&&(this.time.hour+=t*.05)),this.sky.update(t,this.time.hour,this.camera.position),this.skyIndoor||this.weather.applyLights(this.sky),this.weather.update(t,this.time,this.camera.position),Ng(this.sky.nightT,this.weather.rain),this.paused||this.player.update(t,this.input,this.rig.yaw),this.paused||(this.town.trainSystem.update(t,this.time,this.sky.nightT),this.town.crossingCtl.update(t,this.town.trainSystem)),this.town.train.update(t,this.sky.nightT),this.paused||this.npcs.update(t,{time:this.time,trainSystem:this.town.trainSystem,zones:this.interiorZones,collision:this.collision,weather:this.weather,player:this.player}),this.town.update(t,this.time,this.sky),this.updateInteriorDynamic(t),this.interaction.locked=e.dialogActive||e.panelOpen||!!this.boardEl,this.interaction.update(t),this.input.hit("e")&&this.interaction.trigger(),this.paused||(this.events.update(t),this.stepT+=t,this.stepT>.4&&(this.stepT=0,this.quests.checkDiscoveries()));const o=!this.zones.isIndoor&&this.weather.rain>.25;this.player.char.setUmbrella(o);for(const r of this.npcs.list)r.char.setUmbrella(o&&r.zone==="world");e.updateHUD(this.time,this.weather,this.player),this.updateObjectiveMarker(),this.updateAudio(t,n),this.rig.handleInput(this.input),this.freeCam?(this.camera.position.set(...this.freeCam.pos),this.camera.lookAt(...this.freeCam.look)):this.rig.update(t,this.player),this.input.endFrame(),this.renderer.render(this.scene,this.camera),this._saveT=(this._saveT||0)+t,this._saveT>30&&(this._saveT=0,this.save(!0))}handleKeys(){if(this.input.hit("escape")){this.ui.dialogActive?this.ui.nextLine():this.boardEl?this.ui.closeBoard():this.ui.panelOpen?this.ui.closePanel():this.quests.pendingShop?(this.quests.pendingShop=null,this.ui.toast("没有买什么。","商店")):this.ui.togglePanel("settings");return}if(this.input.hit("j")&&this.ui.togglePanel("journal"),this.input.hit("m")&&this.ui.togglePanel("map"),this.input.hit("u")&&this.ui.togglePanel("people"),this.input.hit("p")&&this.save(),this.quests.pendingShop){for(let t=0;t<this.quests.pendingShop.stock.length;t++)if(this.input.hit(String(t+1))){this.quests.buyItem(this.quests.pendingShop.stock[t].item);break}this.input.hit("escape")&&(this.quests.pendingShop=null,this.ui.toast("没有买什么。","商店"))}}updateInteriorDynamic(t){for(const e of this.interiorDynamic){if(e.kind!=="slideDoor")continue;const n=bn(this.player.pos.x,this.player.pos.z,e.objs[0].position.x,e.objs[0].position.z)<3.2&&this.player.zone==="konbini";e.open=me(e.open||0,n?1:0,6,t),e.objs[0].position.x=e.baseX0??(e.baseX0=e.objs[0].position.x),e.objs[1].position.x=e.baseX1??(e.baseX1=e.objs[1].position.x),e.objs[0].position.x=e.baseX0-e.open*.62,e.objs[1].position.x=e.baseX1+e.open*.62}}updateObjectiveMarker(){const t=this.quests.objectiveMarker;this.ui.updateObjectiveArrow(t&&!this.zones.isIndoor?t:null,this.player.pos,this.rig.yaw)}updateAudio(t,e){if(!this.audio.ready)return;const n=this.player.pos,i=this.town.trainSystem,o=i.state==="idle"?999:Math.abs(i.x-n.x),r=$o(n.x,n.z);if(this._footAcc=(this._footAcc||0)+this.player.speed*t,this._footAcc>.78){this._footAcc=0;const a=this.roadNear(n.x,n.z);this.audio.footstep(a,.9)}this.audio.updateAmbience(t,{night:this.sky.nightT,rain:this.weather.rain,indoors:e,trainDist:o,nearStream:Ge(1-r/14),wind:this.weather.wind}),this._ambT=(this._ambT||0)-t,this._ambT<=0&&(this._ambT=2.2+Math.random()*5,e||(this.sky.nightT>.5?this.audio.cricket():this.weather.rain<.2?this.audio.bird():this.time.hour>15&&this.time.hour<20&&Math.random()<.4&&this.audio.cicada()))}roadNear(t,e){const n=this._roadDist?this._roadDist(t,e):99;return n<4?"asphalt":n<9?"gravel":"grass"}save(t=!1){try{const e={v:2,time:{day:this.time.day,hour:this.time.hour},pos:{x:this.player.pos.x,y:this.player.pos.y,z:this.player.pos.z,yaw:this.player.yaw,zone:this.player.zone},inv:this.inventory.serialize(),quests:this.quests.serialize(),affinity:Object.fromEntries(this.npcs.list.map(n=>[n.id,{a:n.affinity,m:n.met}])),weather:{state:this.weather.state},flags:{shopLate:!!this.shopLate}};return localStorage.setItem(ql,JSON.stringify(e)),!0}catch{return!1}}async load(){try{const t=localStorage.getItem(ql);if(!t){this.ui.toast("还没有存档。","存档");return}const e=JSON.parse(t);if(e.time&&(this.time.day=e.time.day,this.time.hour=e.time.hour),this.inventory.load(e.inv),this.quests.load(e.quests),e.affinity)for(const[n,i]of Object.entries(e.affinity)){const o=this.npcs.byId[n];o&&(o.affinity=i.a,o.met=i.m)}if(e.weather&&(this.weather.state=e.weather.state,this.weather.target=e.weather.state==="rain"?1:0),this.shopLate=e.flags?.shopLate,e.pos)if(e.pos.zone&&e.pos.zone!=="world"&&this.interiorZones[e.pos.zone]){const n={x:e.pos.x,y:e.pos.y,z:e.pos.z,yaw:e.pos.yaw};await this.zones.enter(e.pos.zone,n)}else this.player.teleport(e.pos.x,j(e.pos.x,e.pos.z),e.pos.z,e.pos.yaw);return this.ui.refreshTracker(),this.quests.spawnQuestProps(),!0}catch{return this.ui.toast("读取失败。","存档"),!1}}}const l_=document.getElementById("scene"),Fi=new c_(l_);window.__game=Fi;const h_=document.getElementById("load-bar"),d_=document.getElementById("load-pct"),Fa=document.getElementById("load-text"),Zo=document.getElementById("btn-start"),Yl=document.getElementById("title-screen");Fi.onProgress=(s,t)=>{h_.style.width=s+"%",d_.textContent=Math.round(s)+"%",t&&(Fa.textContent=t)};window.addEventListener("resize",()=>Fi.resize());(async()=>{try{await Fi.boot(),Fi._roadDist=Ua,Zo.disabled=!1,Zo.textContent="开 始";const s=!!localStorage.getItem("sakura-town-save");Fa.textContent=s?"检测到上次的存档 · 可以继续":"一切就绪"}catch(s){throw console.error(s),Fa.textContent="出错了："+s.message,s}})();function u_(s){Yl.style.opacity="0",setTimeout(()=>{Yl.style.display="none"},900),document.getElementById("hud").classList.remove("hidden"),Fi.start(),s&&setTimeout(()=>Fi.load(),400)}const id=!!localStorage.getItem("sakura-town-save");id&&(Zo.textContent="继 续");Zo.addEventListener("click",()=>u_(id));
