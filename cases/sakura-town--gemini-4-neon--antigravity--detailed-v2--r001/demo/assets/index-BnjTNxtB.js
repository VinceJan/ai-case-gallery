(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ko="172",sl=0,ra=1,rl=2,_c=1,xc=2,_n=3,Mn=0,Ve=1,Je=2,In=0,Ei=1,oa=2,aa=3,ca=4,ol=5,Zn=100,al=101,cl=102,ll=103,hl=104,ul=200,dl=201,fl=202,pl=203,jr=204,Jr=205,ml=206,gl=207,_l=208,xl=209,vl=210,Ml=211,Sl=212,yl=213,wl=214,Qr=0,to=1,eo=2,Ri=3,no=4,io=5,so=6,ro=7,vc=0,El=1,bl=2,Dn=0,Tl=1,Al=2,Rl=3,Mc=4,Cl=5,Pl=6,Ll=7,Sc=300,Ci=301,Pi=302,oo=303,ao=304,ir=306,Sn=1e3,jn=1001,co=1002,Oe=1003,Il=1004,gs=1005,ln=1006,ur=1007,Jn=1008,yn=1009,yc=1010,wc=1011,ss=1012,Go=1013,ti=1014,hn=1015,os=1016,Ho=1017,Vo=1018,Li=1020,Ec=35902,bc=1021,Tc=1022,tn=1023,Ac=1024,Rc=1025,bi=1026,Ii=1027,Wo=1028,Xo=1029,Cc=1030,qo=1031,Yo=1033,Xs=33776,qs=33777,Ys=33778,$s=33779,lo=35840,ho=35841,uo=35842,fo=35843,po=36196,mo=37492,go=37496,_o=37808,xo=37809,vo=37810,Mo=37811,So=37812,yo=37813,wo=37814,Eo=37815,bo=37816,To=37817,Ao=37818,Ro=37819,Co=37820,Po=37821,Zs=36492,Lo=36494,Io=36495,Pc=36283,Do=36284,Uo=36285,No=36286,Dl=3200,Ul=3201,$o=0,Nl=1,Ln="",Ee="srgb",Di="srgb-linear",Js="linear",he="srgb",ai=7680,la=519,Fl=512,Ol=513,Bl=514,Lc=515,zl=516,kl=517,Gl=518,Hl=519,ha=35044,ua="300 es",xn=2e3,Qs=2001;class Ni{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ks=Math.PI/180,Fo=180/Math.PI;function as(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[s&255]+Ce[s>>8&255]+Ce[s>>16&255]+Ce[s>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Qt(s,t,e){return Math.max(t,Math.min(e,s))}function Vl(s,t){return(s%t+t)%t}function dr(s,t,e){return(1-e)*s+e*t}function Xi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ge(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,i,r,o,a,c,l){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],p=n[5],g=n[8],_=i[0],m=i[3],h=i[6],E=i[1],w=i[4],y=i[7],P=i[2],R=i[5],A=i[8];return r[0]=o*_+a*E+c*P,r[3]=o*m+a*w+c*R,r[6]=o*h+a*y+c*A,r[1]=l*_+u*E+d*P,r[4]=l*m+u*w+d*R,r[7]=l*h+u*y+d*A,r[2]=f*_+p*E+g*P,r[5]=f*m+p*w+g*R,r[8]=f*h+p*y+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=u*o-a*l,f=a*c-u*r,p=l*r-o*c,g=e*d+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*l-u*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(u*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(fr.makeScale(t,e)),this}rotate(t){return this.premultiply(fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fr=new $t;function Ic(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function tr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Wl(){const s=tr("canvas");return s.style.display="block",s}const da={};function yi(s){s in da||(da[s]=!0,console.warn(s))}function Xl(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ql(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Yl(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const fa=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pa=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $l(){const s={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(i.r=vn(i.r),i.g=vn(i.g),i.b=vn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(i.r=Ti(i.r),i.g=Ti(i.g),i.b=Ti(i.b))),i},fromWorkingColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},toWorkingColorSpace:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ln?Js:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Di]:{primaries:t,whitePoint:n,transfer:Js,toXYZ:fa,fromXYZ:pa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:n,transfer:he,toXYZ:fa,fromXYZ:pa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),s}const ne=$l();function vn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ti(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ci;class Zl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ci===void 0&&(ci=tr("canvas")),ci.width=t.width,ci.height=t.height;const n=ci.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ci}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=tr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=vn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vn(e[n]/255)*255):e[n]=vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kl=0;class Dc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kl++}),this.uuid=as(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(pr(i[o].image)):r.push(pr(i[o]))}else r=pr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function pr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jl=0;class Ie extends Ni{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=jn,i=jn,r=ln,o=Jn,a=tn,c=yn,l=Ie.DEFAULT_ANISOTROPY,u=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jl++}),this.uuid=as(),this.name="",this.source=new Dc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sn:t.x=t.x-Math.floor(t.x);break;case jn:t.x=t.x<0?0:1;break;case co:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sn:t.y=t.y-Math.floor(t.y);break;case jn:t.y=t.y<0?0:1;break;case co:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=Sc;Ie.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,i=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(l+1)/2,y=(p+1)/2,P=(h+1)/2,R=(u+f)/4,A=(d+_)/4,I=(g+m)/4;return w>y&&w>P?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=R/n,r=A/n):y>P?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=R/i,r=I/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=A/r,i=I/r),this.set(n,i,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-_)/E,this.z=(f-u)/E,this.w=Math.acos((l+p+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jl extends Ni{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ie(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const e=Object.assign({},t.texture.image);return this.texture.source=new Dc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends Jl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Uc extends Ie{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ql extends Ie{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],d=n[i+3];const f=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(d!==_||c!==f||l!==p||u!==g){let m=1-a;const h=c*f+l*p+u*g+d*_,E=h>=0?1:-1,w=1-h*h;if(w>Number.EPSILON){const P=Math.sqrt(w),R=Math.atan2(P,h*E);m=Math.sin(m*R)/P,a=Math.sin(a*R)/P}const y=a*E;if(c=c*m+f*y,l=l*m+p*y,u=u*m+g*y,d=d*m+_*y,m===1-a){const P=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=P,l*=P,u*=P,d*=P}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],d=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*d+c*p-l*f,t[e+1]=c*g+u*f+l*d-a*p,t[e+2]=l*g+u*p+a*f-c*d,t[e+3]=u*g-a*d-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),d=a(r/2),f=c(n/2),p=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*d+l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d+f*p*g;break;case"YZX":this._x=f*u*d+l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d-f*p*g;break;case"XZY":this._x=f*u*d-l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],d=e[10],f=n+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+l)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-i)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ma.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ma.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=i+c*d+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return mr.copy(this).projectOnVector(t),this.sub(mr)}reflect(t){return this.sub(mr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mr=new L,ma=new cs;class ni{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(r,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(t.matrixWorld),this.union(_s)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qi),xs.subVectors(this.max,qi),li.subVectors(t.a,qi),hi.subVectors(t.b,qi),ui.subVectors(t.c,qi),bn.subVectors(hi,li),Tn.subVectors(ui,hi),kn.subVectors(li,ui);let e=[0,-bn.z,bn.y,0,-Tn.z,Tn.y,0,-kn.z,kn.y,bn.z,0,-bn.x,Tn.z,0,-Tn.x,kn.z,0,-kn.x,-bn.y,bn.x,0,-Tn.y,Tn.x,0,-kn.y,kn.x,0];return!gr(e,li,hi,ui,xs)||(e=[1,0,0,0,1,0,0,0,1],!gr(e,li,hi,ui,xs))?!1:(vs.crossVectors(bn,Tn),e=[vs.x,vs.y,vs.z],gr(e,li,hi,ui,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const dn=[new L,new L,new L,new L,new L,new L,new L,new L],sn=new L,_s=new ni,li=new L,hi=new L,ui=new L,bn=new L,Tn=new L,kn=new L,qi=new L,xs=new L,vs=new L,Gn=new L;function gr(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Gn.fromArray(s,r);const a=i.x*Math.abs(Gn.x)+i.y*Math.abs(Gn.y)+i.z*Math.abs(Gn.z),c=t.dot(Gn),l=e.dot(Gn),u=n.dot(Gn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const th=new ni,Yi=new L,_r=new L;class ii{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):th.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yi.subVectors(t,this.center);const e=Yi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Yi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yi.copy(t.center).add(_r)),this.expandByPoint(Yi.copy(t.center).sub(_r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new L,xr=new L,Ms=new L,An=new L,vr=new L,Ss=new L,Mr=new L;class Zo{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fn.copy(this.origin).addScaledVector(this.direction,e),fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){xr.copy(t).add(e).multiplyScalar(.5),Ms.copy(e).sub(t).normalize(),An.copy(this.origin).sub(xr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ms),a=An.dot(this.direction),c=-An.dot(Ms),l=An.lengthSq(),u=Math.abs(1-o*o);let d,f,p,g;if(u>0)if(d=o*c-a,f=o*a-c,g=r*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,p=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+f*(f+2*c)+l);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(xr).addScaledVector(Ms,f),p}intersectSphere(t,e){fn.subVectors(t.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-f.z)*d,c=(t.max.z-f.z)*d):(a=(t.max.z-f.z)*d,c=(t.min.z-f.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,fn)!==null}intersectTriangle(t,e,n,i,r){vr.subVectors(e,t),Ss.subVectors(n,t),Mr.crossVectors(vr,Ss);let o=this.direction.dot(Mr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;An.subVectors(this.origin,t);const c=a*this.direction.dot(Ss.crossVectors(An,Ss));if(c<0)return null;const l=a*this.direction.dot(vr.cross(An));if(l<0||c+l>o)return null;const u=-a*An.dot(Mr);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,i,r,o,a,c,l,u,d,f,p,g,_,m){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,u,d,f,p,g,_,m)}set(t,e,n,i,r,o,a,c,l,u,d,f,p,g,_,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=i,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=_,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/di.setFromMatrixColumn(t,0).length(),r=1/di.setFromMatrixColumn(t,1).length(),o=1/di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*d,g=a*u,_=a*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=p+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,p=c*d,g=l*u,_=l*d;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,p=c*d,g=l*u,_=l*d;e[0]=f-_*a,e[4]=-o*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,p=o*d,g=a*u,_=a*d;e[0]=c*u,e[4]=g*l-p,e[8]=f*l+_,e[1]=c*d,e[5]=_*l+f,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-f*d,e[8]=g*d+p,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*d+g,e[10]=f-_*d}else if(t.order==="XZY"){const f=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=f*d+_,e[5]=o*u,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*u,e[10]=_*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(eh,t,nh)}lookAt(t,e,n){const i=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Rn.crossVectors(n,We),Rn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Rn.crossVectors(n,We)),Rn.normalize(),ys.crossVectors(We,Rn),i[0]=Rn.x,i[4]=ys.x,i[8]=We.x,i[1]=Rn.y,i[5]=ys.y,i[9]=We.y,i[2]=Rn.z,i[6]=ys.z,i[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],h=n[14],E=n[3],w=n[7],y=n[11],P=n[15],R=i[0],A=i[4],I=i[8],M=i[12],v=i[1],C=i[5],H=i[9],V=i[13],Q=i[2],et=i[6],Z=i[10],rt=i[14],$=i[3],ft=i[7],xt=i[11],bt=i[15];return r[0]=o*R+a*v+c*Q+l*$,r[4]=o*A+a*C+c*et+l*ft,r[8]=o*I+a*H+c*Z+l*xt,r[12]=o*M+a*V+c*rt+l*bt,r[1]=u*R+d*v+f*Q+p*$,r[5]=u*A+d*C+f*et+p*ft,r[9]=u*I+d*H+f*Z+p*xt,r[13]=u*M+d*V+f*rt+p*bt,r[2]=g*R+_*v+m*Q+h*$,r[6]=g*A+_*C+m*et+h*ft,r[10]=g*I+_*H+m*Z+h*xt,r[14]=g*M+_*V+m*rt+h*bt,r[3]=E*R+w*v+y*Q+P*$,r[7]=E*A+w*C+y*et+P*ft,r[11]=E*I+w*H+y*Z+P*xt,r[15]=E*M+w*V+y*rt+P*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],d=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],h=t[15];return g*(+r*c*d-i*l*d-r*a*f+n*l*f+i*a*p-n*c*p)+_*(+e*c*p-e*l*f+r*o*f-i*o*p+i*l*u-r*c*u)+m*(+e*l*d-e*a*p-r*o*d+n*o*p+r*a*u-n*l*u)+h*(-i*a*u-e*c*d+e*a*f+i*o*d-n*o*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],h=t[15],E=d*m*l-_*f*l+_*c*p-a*m*p-d*c*h+a*f*h,w=g*f*l-u*m*l-g*c*p+o*m*p+u*c*h-o*f*h,y=u*_*l-g*d*l+g*a*p-o*_*p-u*a*h+o*d*h,P=g*d*c-u*_*c-g*a*f+o*_*f+u*a*m-o*d*m,R=e*E+n*w+i*y+r*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=E*A,t[1]=(_*f*r-d*m*r-_*i*p+n*m*p+d*i*h-n*f*h)*A,t[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*h+n*c*h)*A,t[3]=(d*c*r-a*f*r-d*i*l+n*f*l+a*i*p-n*c*p)*A,t[4]=w*A,t[5]=(u*m*r-g*f*r+g*i*p-e*m*p-u*i*h+e*f*h)*A,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*h-e*c*h)*A,t[7]=(o*f*r-u*c*r+u*i*l-e*f*l-o*i*p+e*c*p)*A,t[8]=y*A,t[9]=(g*d*r-u*_*r-g*n*p+e*_*p+u*n*h-e*d*h)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*h+e*a*h)*A,t[11]=(u*a*r-o*d*r-u*n*l+e*d*l+o*n*p-e*a*p)*A,t[12]=P*A,t[13]=(u*_*i-g*d*i+g*n*f-e*_*f-u*n*m+e*d*m)*A,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*d*i-u*a*i+u*n*c-e*d*c-o*n*f+e*a*f)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,d=a+a,f=r*l,p=r*u,g=r*d,_=o*u,m=o*d,h=a*d,E=c*l,w=c*u,y=c*d,P=n.x,R=n.y,A=n.z;return i[0]=(1-(_+h))*P,i[1]=(p+y)*P,i[2]=(g-w)*P,i[3]=0,i[4]=(p-y)*R,i[5]=(1-(f+h))*R,i[6]=(m+E)*R,i[7]=0,i[8]=(g+w)*A,i[9]=(m-E)*A,i[10]=(1-(f+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=di.set(i[0],i[1],i[2]).length();const o=di.set(i[4],i[5],i[6]).length(),a=di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],rn.copy(this);const l=1/r,u=1/o,d=1/a;return rn.elements[0]*=l,rn.elements[1]*=l,rn.elements[2]*=l,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=d,rn.elements[9]*=d,rn.elements[10]*=d,e.setFromRotationMatrix(rn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=xn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let p,g;if(a===xn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Qs)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=xn){const c=this.elements,l=1/(e-t),u=1/(n-i),d=1/(o-r),f=(e+t)*l,p=(n+i)*u;let g,_;if(a===xn)g=(o+r)*d,_=-2*d;else if(a===Qs)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const di=new L,rn=new ae,eh=new L(0,0,0),nh=new L(1,1,1),Rn=new L,ys=new L,We=new L,ga=new ae,_a=new cs;class un{constructor(t=0,e=0,n=0,i=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],d=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ga.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ga,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _a.setFromEuler(this),this.setFromQuaternion(_a,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class Nc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ih=0;const xa=new L,fi=new cs,pn=new ae,ws=new L,$i=new L,sh=new L,rh=new cs,va=new L(1,0,0),Ma=new L(0,1,0),Sa=new L(0,0,1),ya={type:"added"},oh={type:"removed"},pi={type:"childadded",child:null},Sr={type:"childremoved",child:null};class _e extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=as(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new L,e=new un,n=new cs,i=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ae},normalMatrix:{value:new $t}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.multiply(fi),this}rotateOnWorldAxis(t,e){return fi.setFromAxisAngle(t,e),this.quaternion.premultiply(fi),this}rotateX(t){return this.rotateOnAxis(va,t)}rotateY(t){return this.rotateOnAxis(Ma,t)}rotateZ(t){return this.rotateOnAxis(Sa,t)}translateOnAxis(t,e){return xa.copy(t).applyQuaternion(this.quaternion),this.position.add(xa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(va,t)}translateY(t){return this.translateOnAxis(Ma,t)}translateZ(t){return this.translateOnAxis(Sa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ws.copy(t):ws.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt($i,ws,this.up):pn.lookAt(ws,$i,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),fi.setFromRotationMatrix(pn),this.quaternion.premultiply(fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ya),pi.child=t,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(oh),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ya),pi.child=t,this.dispatchEvent(pi),pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,t,sh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,rh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),d=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}_e.DEFAULT_UP=new L(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new L,mn=new L,yr=new L,gn=new L,mi=new L,gi=new L,wa=new L,wr=new L,Er=new L,br=new L,Tr=new ue,Ar=new ue,Rr=new ue;class Qe{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),on.subVectors(t,e),i.cross(on);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){on.subVectors(i,e),mn.subVectors(n,e),yr.subVectors(t,e);const o=on.dot(on),a=on.dot(mn),c=on.dot(yr),l=mn.dot(mn),u=mn.dot(yr),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gn.x),c.addScaledVector(o,gn.y),c.addScaledVector(a,gn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,o){return Tr.setScalar(0),Ar.setScalar(0),Rr.setScalar(0),Tr.fromBufferAttribute(t,e),Ar.fromBufferAttribute(t,n),Rr.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Tr,r.x),o.addScaledVector(Ar,r.y),o.addScaledVector(Rr,r.z),o}static isFrontFacing(t,e,n,i){return on.subVectors(n,e),mn.subVectors(t,e),on.cross(mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),on.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;mi.subVectors(i,n),gi.subVectors(r,n),wr.subVectors(t,n);const c=mi.dot(wr),l=gi.dot(wr);if(c<=0&&l<=0)return e.copy(n);Er.subVectors(t,i);const u=mi.dot(Er),d=gi.dot(Er);if(u>=0&&d<=u)return e.copy(i);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(mi,o);br.subVectors(t,r);const p=mi.dot(br),g=gi.dot(br);if(g>=0&&p<=g)return e.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(gi,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return wa.subVectors(r,i),a=(d-u)/(d-u+(p-g)),e.copy(i).addScaledVector(wa,a);const h=1/(m+_+f);return o=_*h,a=f*h,e.copy(n).addScaledVector(mi,o).addScaledVector(gi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Fc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},Es={h:0,s:0,l:0};function Cr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Et{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ne.workingColorSpace){if(t=Vl(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Cr(o,r,t+1/3),this.g=Cr(o,r,t),this.b=Cr(o,r,t-1/3)}return ne.toWorkingColorSpace(this,i),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const n=Fc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vn(t.r),this.g=vn(t.g),this.b=vn(t.b),this}copyLinearToSRGB(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return ne.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Qt(Pe.r*255,0,255))*65536+Math.round(Qt(Pe.g*255,0,255))*256+Math.round(Qt(Pe.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ee){ne.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,i=Pe.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Cn),this.setHSL(Cn.h+t,Cn.s+e,Cn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Cn),t.getHSL(Es);const n=dr(Cn.h,Es.h,e),i=dr(Cn.s,Es.s,e),r=dr(Cn.l,Es.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new Et;Et.NAMES=Fc;let ah=0;class Nn extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=as(),this.name="",this.type="Material",this.blending=Ei,this.side=Mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jr,this.blendDst=Jr,this.blendEquation=Zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=la,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ai,this.stencilZFail=ai,this.stencilZPass=ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==Mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jr&&(n.blendSrc=this.blendSrc),this.blendDst!==Jr&&(n.blendDst=this.blendDst),this.blendEquation!==Zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==la&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fi extends Nn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new L,bs=new Jt;class Ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ha,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)bs.fromBufferAttribute(this,e),bs.applyMatrix3(t),this.setXY(e,bs.x,bs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),i=Ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),i=Ge(i,this.array),r=Ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ha&&(t.usage=this.usage),t}}class Oc extends Ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Bc extends Ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pe extends Ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ch=0;const je=new ae,Pr=new _e,_i=new L,Xe=new ni,Zi=new ni,we=new L;class Me extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=as(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ic(t)?Bc:Oc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Pr.lookAt(t),Pr.updateMatrix(),this.applyMatrix4(Pr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Zi.setFromBufferAttribute(a),this.morphTargetsRelative?(we.addVectors(Xe.min,Zi.min),Xe.expandByPoint(we),we.addVectors(Xe.max,Zi.max),Xe.expandByPoint(we)):(Xe.expandByPoint(Zi.min),Xe.expandByPoint(Zi.max))}Xe.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)we.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(we));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)we.fromBufferAttribute(a,l),c&&(_i.fromBufferAttribute(t,l),we.add(_i)),i=Math.max(i,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new L,c[I]=new L;const l=new L,u=new L,d=new L,f=new Jt,p=new Jt,g=new Jt,_=new L,m=new L;function h(I,M,v){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,v),f.fromBufferAttribute(r,I),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),u.sub(l),d.sub(l),p.sub(f),g.sub(f);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(C),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(C),a[I].add(_),a[M].add(_),a[v].add(_),c[I].add(m),c[M].add(m),c[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,M=E.length;I<M;++I){const v=E[I],C=v.start,H=v.count;for(let V=C,Q=C+H;V<Q;V+=3)h(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const w=new L,y=new L,P=new L,R=new L;function A(I){P.fromBufferAttribute(i,I),R.copy(P);const M=a[I];w.copy(M),w.sub(P.multiplyScalar(P.dot(M))).normalize(),y.crossVectors(R,M);const C=y.dot(c[I])<0?-1:1;o.setXYZW(I,w.x,w.y,w.z,C)}for(let I=0,M=E.length;I<M;++I){const v=E[I],C=v.start,H=v.count;for(let V=C,Q=C+H;V<Q;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new L,r=new L,o=new L,a=new L,c=new L,l=new L,u=new L,d=new L;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),d.subVectors(i,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),d.subVectors(i,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let h=0;h<u;h++)f[g++]=l[p++]}return new Ze(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=t(f,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const p=l[d];u.push(p.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],d=r[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ea=new ae,Hn=new Zo,Ts=new ii,ba=new L,As=new L,Rs=new L,Cs=new L,Lr=new L,Ps=new L,Ta=new L,Ls=new L;class U extends _e{constructor(t=new Me,e=new Fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Ps.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(Lr.fromBufferAttribute(d,t),o?Ps.addScaledVector(Lr,u):Ps.addScaledVector(Lr.sub(e),u))}e.add(Ps)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),Hn.copy(t.ray).recast(t.near),!(Ts.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(Ts,ba)===null||Hn.origin.distanceToSquared(ba)>(t.far-t.near)**2))&&(Ea.copy(r).invert(),Hn.copy(t.ray).applyMatrix4(Ea),!(n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Hn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],h=o[m.materialIndex],E=Math.max(m.start,p.start),w=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,P=w;y<P;y+=3){const R=a.getX(y),A=a.getX(y+1),I=a.getX(y+2);i=Is(this,h,t,n,l,u,d,R,A,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const E=a.getX(m),w=a.getX(m+1),y=a.getX(m+2);i=Is(this,o,t,n,l,u,d,E,w,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],h=o[m.materialIndex],E=Math.max(m.start,p.start),w=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,P=w;y<P;y+=3){const R=y,A=y+1,I=y+2;i=Is(this,h,t,n,l,u,d,R,A,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const E=m,w=m+1,y=m+2;i=Is(this,o,t,n,l,u,d,E,w,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function lh(s,t,e,n,i,r,o,a){let c;if(t.side===Ve?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===Mn,a),c===null)return null;Ls.copy(a),Ls.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ls);return l<e.near||l>e.far?null:{distance:l,point:Ls.clone(),object:s}}function Is(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,As),s.getVertexPosition(c,Rs),s.getVertexPosition(l,Cs);const u=lh(s,t,e,n,As,Rs,Cs,Ta);if(u){const d=new L;Qe.getBarycoord(Ta,As,Rs,Cs,d),i&&(u.uv=Qe.getInterpolatedAttribute(i,a,c,l,d,new Jt)),r&&(u.uv1=Qe.getInterpolatedAttribute(r,a,c,l,d,new Jt)),o&&(u.normal=Qe.getInterpolatedAttribute(o,a,c,l,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};Qe.getNormal(As,Rs,Cs,f.normal),u.face=f,u.barycoord=d}return u}class X extends Me{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(d,2));function g(_,m,h,E,w,y,P,R,A,I,M){const v=y/A,C=P/I,H=y/2,V=P/2,Q=R/2,et=A+1,Z=I+1;let rt=0,$=0;const ft=new L;for(let xt=0;xt<Z;xt++){const bt=xt*C-V;for(let Gt=0;Gt<et;Gt++){const te=Gt*v-H;ft[_]=te*E,ft[m]=bt*w,ft[h]=Q,l.push(ft.x,ft.y,ft.z),ft[_]=0,ft[m]=0,ft[h]=R>0?1:-1,u.push(ft.x,ft.y,ft.z),d.push(Gt/A),d.push(1-xt/I),rt+=1}}for(let xt=0;xt<I;xt++)for(let bt=0;bt<A;bt++){const Gt=f+bt+et*xt,te=f+bt+et*(xt+1),tt=f+(bt+1)+et*(xt+1),ut=f+(bt+1)+et*xt;c.push(Gt,te,ut),c.push(te,tt,ut),$+=6}a.addGroup(p,$,M),p+=$,f+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new X(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ui(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ne(s){const t={};for(let e=0;e<s.length;e++){const n=Ui(s[e]);for(const i in n)t[i]=n[i]}return t}function hh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function zc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const uh={clone:Ui,merge:Ne};var dh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends Nn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dh,this.fragmentShader=fh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ui(t.uniforms),this.uniformsGroups=hh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class kc extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new L,Aa=new Jt,Ra=new Jt;class $e extends kc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fo*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z)}getViewSize(t,e){return this.getViewBounds(t,Aa,Ra),e.subVectors(Ra,Aa)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ks*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const xi=-90,vi=1;class ph extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $e(xi,vi,t,e);i.layers=this.layers,this.add(i);const r=new $e(xi,vi,t,e);r.layers=this.layers,this.add(r);const o=new $e(xi,vi,t,e);o.layers=this.layers,this.add(o);const a=new $e(xi,vi,t,e);a.layers=this.layers,this.add(a);const c=new $e(xi,vi,t,e);c.layers=this.layers,this.add(c);const l=new $e(xi,vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(d,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Gc extends Ie{constructor(t,e,n,i,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Ci,super(t,e,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mh extends ei{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Gc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ln}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new X(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:In});r.uniforms.tEquirect.value=e;const o=new U(i,r),a=e.minFilter;return e.minFilter===Jn&&(e.minFilter=ln),new ph(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}class Ko{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Et(t),this.density=e}clone(){return new Ko(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class gh extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Hc extends Ie{constructor(t=null,e=1,n=1,i,r,o,a,c,l=Oe,u=Oe,d,f){super(null,o,a,c,l,u,i,r,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ca extends Ze{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Mi=new ae,Pa=new ae,Ds=[],La=new ni,_h=new ae,Ki=new U,ji=new ii;class Vc extends U{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ca(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,_h)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Mi),La.copy(t.boundingBox).applyMatrix4(Mi),this.boundingBox.union(La)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Mi),ji.copy(t.boundingSphere).applyMatrix4(Mi),this.boundingSphere.union(ji)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ki.geometry=this.geometry,Ki.material=this.material,Ki.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ji.copy(this.boundingSphere),ji.applyMatrix4(n),t.ray.intersectsSphere(ji)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Mi),Pa.multiplyMatrices(n,Mi),Ki.matrixWorld=Pa,Ki.raycast(t,Ds);for(let o=0,a=Ds.length;o<a;o++){const c=Ds[o];c.instanceId=r,c.object=this,e.push(c)}Ds.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ca(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hc(new Float32Array(i*this.count),i,this.count,Wo,hn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Ir=new L,xh=new L,vh=new $t;class Yn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ir.subVectors(n,e).cross(xh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ir),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||vh.getNormalMatrix(t),i=this.coplanarPoint(Ir).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new ii,Us=new L;class jo{constructor(t=new Yn,e=new Yn,n=new Yn,i=new Yn,r=new Yn,o=new Yn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],g=i[9],_=i[10],m=i[11],h=i[12],E=i[13],w=i[14],y=i[15];if(n[0].setComponents(c-r,f-l,m-p,y-h).normalize(),n[1].setComponents(c+r,f+l,m+p,y+h).normalize(),n[2].setComponents(c+o,f+u,m+g,y+E).normalize(),n[3].setComponents(c-o,f-u,m-g,y-E).normalize(),n[4].setComponents(c-a,f-d,m-_,y-w).normalize(),e===xn)n[5].setComponents(c+a,f+d,m+_,y+w).normalize();else if(e===Qs)n[5].setComponents(a,d,_,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(t){return Vn.center.set(0,0,0),Vn.radius=.7071067811865476,Vn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Us.x=i.normal.x>0?t.max.x:t.min.x,Us.y=i.normal.y>0?t.max.y:t.min.y,Us.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sr extends Nn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const er=new L,nr=new L,Ia=new ae,Ji=new Zo,Ns=new ii,Dr=new L,Da=new L;class Jo extends _e{constructor(t=new Me,e=new sr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)er.fromBufferAttribute(e,i-1),nr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=er.distanceTo(nr);t.setAttribute("lineDistance",new pe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(i),Ns.radius+=r,t.ray.intersectsSphere(Ns)===!1)return;Ia.copy(i).invert(),Ji.copy(t.ray).applyMatrix4(Ia);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const h=u.getX(_),E=u.getX(_+1),w=Fs(this,t,Ji,c,h,E);w&&e.push(w)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),h=Fs(this,t,Ji,c,_,m);h&&e.push(h)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const h=Fs(this,t,Ji,c,_,_+1);h&&e.push(h)}if(this.isLineLoop){const _=Fs(this,t,Ji,c,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Fs(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(er.fromBufferAttribute(o,i),nr.fromBufferAttribute(o,r),e.distanceSqToSegment(er,nr,Dr,Da)>n)return;Dr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Dr);if(!(c<t.near||c>t.far))return{distance:c,point:Da.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Ua=new L,Na=new L;class Mh extends Jo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Ua.fromBufferAttribute(e,i),Na.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ua.distanceTo(Na);t.setAttribute("lineDistance",new pe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Oo extends Nn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Fa=new ae,Bo=new Zo,Os=new ii,Bs=new L;class Oa extends _e{constructor(t=new Me,e=new Oo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(i),Os.radius+=r,t.ray.intersectsSphere(Os)===!1)return;Fa.copy(i).invert(),Bo.copy(t.ray).applyMatrix4(Fa);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=f,_=p;g<_;g++){const m=l.getX(g);Bs.fromBufferAttribute(d,m),Ba(Bs,m,c,i,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=f,_=p;g<_;g++)Bs.fromBufferAttribute(d,g),Ba(Bs,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ba(s,t,e,n,i,r,o){const a=Bo.distanceSqToPoint(s);if(a<e){const c=new L;Bo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Xt extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Oi extends Ie{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wc extends Ie{constructor(t,e,n,i,r,o,a,c,l,u=bi){if(u!==bi&&u!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===bi&&(n=ti),n===void 0&&u===Ii&&(n=Li),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Oe,this.minFilter=c!==void 0?c:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Sh{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const u=n[i],f=n[i+1]-u,p=(o-u)/f;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new Jt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new L,i=[],r=[],o=[],a=new L,c=new ae;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qt(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(Qt(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],p*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function yh(s,t){const e=1-s;return e*e*t}function wh(s,t){return 2*(1-s)*s*t}function Eh(s,t){return s*s*t}function Ur(s,t,e,n){return yh(s,t)+wh(s,e)+Eh(s,n)}class bh extends Sh{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Ur(t,i.x,r.x,o.x),Ur(t,i.y,r.y,o.y),Ur(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rr extends Me{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,u=new Jt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const p=n+d/e*i;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,c.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new pe(o,3)),this.setAttribute("normal",new pe(a,3)),this.setAttribute("uv",new pe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class oe extends Me{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],d=[],f=[],p=[];let g=0;const _=[],m=n/2;let h=0;E(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(p,2));function E(){const y=new L,P=new L;let R=0;const A=(e-t)/n;for(let I=0;I<=r;I++){const M=[],v=I/r,C=v*(e-t)+t;for(let H=0;H<=i;H++){const V=H/i,Q=V*c+a,et=Math.sin(Q),Z=Math.cos(Q);P.x=C*et,P.y=-v*n+m,P.z=C*Z,d.push(P.x,P.y,P.z),y.set(et,A,Z).normalize(),f.push(y.x,y.y,y.z),p.push(V,1-v),M.push(g++)}_.push(M)}for(let I=0;I<i;I++)for(let M=0;M<r;M++){const v=_[M][I],C=_[M+1][I],H=_[M+1][I+1],V=_[M][I+1];(t>0||M!==0)&&(u.push(v,C,V),R+=3),(e>0||M!==r-1)&&(u.push(C,H,V),R+=3)}l.addGroup(h,R,0),h+=R}function w(y){const P=g,R=new Jt,A=new L;let I=0;const M=y===!0?t:e,v=y===!0?1:-1;for(let H=1;H<=i;H++)d.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;const C=g;for(let H=0;H<=i;H++){const Q=H/i*c+a,et=Math.cos(Q),Z=Math.sin(Q);A.x=M*Z,A.y=m*v,A.z=M*et,d.push(A.x,A.y,A.z),f.push(0,v,0),R.x=et*.5+.5,R.y=Z*.5*v+.5,p.push(R.x,R.y),g++}for(let H=0;H<i;H++){const V=P+H,Q=C+H;y===!0?u.push(Q,Q+1,V):u.push(Q+1,Q,V),I+=3}l.addGroup(h,I,y===!0?1:2),h+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class He extends oe{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new He(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qo extends Me{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),l(n),u(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const w=new L,y=new L,P=new L;for(let R=0;R<e.length;R+=3)p(e[R+0],w),p(e[R+1],y),p(e[R+2],P),c(w,y,P,E)}function c(E,w,y,P){const R=P+1,A=[];for(let I=0;I<=R;I++){A[I]=[];const M=E.clone().lerp(y,I/R),v=w.clone().lerp(y,I/R),C=R-I;for(let H=0;H<=C;H++)H===0&&I===R?A[I][H]=M:A[I][H]=M.clone().lerp(v,H/C)}for(let I=0;I<R;I++)for(let M=0;M<2*(R-I)-1;M++){const v=Math.floor(M/2);M%2===0?(f(A[I][v+1]),f(A[I+1][v]),f(A[I][v])):(f(A[I][v+1]),f(A[I+1][v+1]),f(A[I+1][v]))}}function l(E){const w=new L;for(let y=0;y<r.length;y+=3)w.x=r[y+0],w.y=r[y+1],w.z=r[y+2],w.normalize().multiplyScalar(E),r[y+0]=w.x,r[y+1]=w.y,r[y+2]=w.z}function u(){const E=new L;for(let w=0;w<r.length;w+=3){E.x=r[w+0],E.y=r[w+1],E.z=r[w+2];const y=m(E)/2/Math.PI+.5,P=h(E)/Math.PI+.5;o.push(y,1-P)}g(),d()}function d(){for(let E=0;E<o.length;E+=6){const w=o[E+0],y=o[E+2],P=o[E+4],R=Math.max(w,y,P),A=Math.min(w,y,P);R>.9&&A<.1&&(w<.2&&(o[E+0]+=1),y<.2&&(o[E+2]+=1),P<.2&&(o[E+4]+=1))}}function f(E){r.push(E.x,E.y,E.z)}function p(E,w){const y=E*3;w.x=t[y+0],w.y=t[y+1],w.z=t[y+2]}function g(){const E=new L,w=new L,y=new L,P=new L,R=new Jt,A=new Jt,I=new Jt;for(let M=0,v=0;M<r.length;M+=9,v+=6){E.set(r[M+0],r[M+1],r[M+2]),w.set(r[M+3],r[M+4],r[M+5]),y.set(r[M+6],r[M+7],r[M+8]),R.set(o[v+0],o[v+1]),A.set(o[v+2],o[v+3]),I.set(o[v+4],o[v+5]),P.copy(E).add(w).add(y).divideScalar(3);const C=m(P);_(R,v+0,E,C),_(A,v+2,w,C),_(I,v+4,y,C)}}function _(E,w,y,P){P<0&&E.x===1&&(o[w]=E.x-1),y.x===0&&y.z===0&&(o[w]=P/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function h(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qo(t.vertices,t.indices,t.radius,t.details)}}class or extends Qo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new or(t.radius,t.detail)}}const zs=new L,ks=new L,Nr=new L,Gs=new Qe;class Th extends Me{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(Ks*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),f={},p=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:h}=Gs;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),h.fromBufferAttribute(a,l[2]),Gs.getNormal(Nr),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,d[2]=`${Math.round(h.x*i)},${Math.round(h.y*i)},${Math.round(h.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let E=0;E<3;E++){const w=(E+1)%3,y=d[E],P=d[w],R=Gs[u[E]],A=Gs[u[w]],I=`${y}_${P}`,M=`${P}_${y}`;M in f&&f[M]?(Nr.dot(f[M].normal)<=r&&(p.push(R.x,R.y,R.z),p.push(A.x,A.y,A.z)),f[M]=null):I in f||(f[I]={index0:l[E],index1:l[w],normal:Nr.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];zs.fromBufferAttribute(a,_),ks.fromBufferAttribute(a,m),p.push(zs.x,zs.y,zs.z),p.push(ks.x,ks.y,ks.z)}this.setAttribute("position",new pe(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ye extends Me{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,d=t/a,f=e/c,p=[],g=[],_=[],m=[];for(let h=0;h<u;h++){const E=h*f-o;for(let w=0;w<l;w++){const y=w*d-r;g.push(y,-E,0),_.push(0,0,1),m.push(w/a),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let E=0;E<a;E++){const w=E+l*h,y=E+l*(h+1),P=E+1+l*(h+1),R=E+1+l*h;p.push(w,y,R),p.push(y,P,R)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ye(t.width,t.height,t.widthSegments,t.heightSegments)}}class Fe extends Me{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new L,f=new L,p=[],g=[],_=[],m=[];for(let h=0;h<=n;h++){const E=[],w=h/n;let y=0;h===0&&o===0?y=.5/e:h===n&&c===Math.PI&&(y=-.5/e);for(let P=0;P<=e;P++){const R=P/e;d.x=-t*Math.cos(i+R*r)*Math.sin(o+w*a),d.y=t*Math.cos(o+w*a),d.z=t*Math.sin(i+R*r)*Math.sin(o+w*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(R+y,1-w),E.push(l++)}u.push(E)}for(let h=0;h<n;h++)for(let E=0;E<e;E++){const w=u[h][E+1],y=u[h][E],P=u[h+1][E],R=u[h+1][E+1];(h!==0||o>0)&&p.push(w,y,R),(h!==n-1||c<Math.PI)&&p.push(y,P,R)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ta extends Me{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],u=new L,d=new L,f=new L;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const _=g/i*r,m=p/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const _=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,h=(i+1)*(p-1)+g,E=(i+1)*p+g;o.push(_,m,E),o.push(m,h,E)}this.setIndex(o),this.setAttribute("position",new pe(a,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ta(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Le extends Nn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ah extends Nn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Et(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Rh extends Nn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ch extends Nn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ea extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ph extends ea{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Et(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Fr=new ae,za=new L,ka=new L;class Xc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jo,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;za.setFromMatrixPosition(t.matrixWorld),e.position.copy(za),ka.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ka),e.updateMatrixWorld(),Fr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ga=new ae,Qi=new L,Or=new L;class Lh extends Xc{constructor(){super(new $e(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Jt(4,2),this._viewportCount=6,this._viewports=[new ue(2,1,1,1),new ue(0,1,1,1),new ue(3,1,1,1),new ue(1,1,1,1),new ue(3,0,1,1),new ue(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Qi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Qi),Or.copy(n.position),Or.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Or),n.updateMatrixWorld(),i.makeTranslation(-Qi.x,-Qi.y,-Qi.z),Ga.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ga)}}class ts extends ea{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Lh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class qc extends kc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ih extends Xc{constructor(){super(new qc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dh extends ea{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new Ih}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Uh extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Nh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ha(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ha();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ha(){return performance.now()}function Va(s,t,e,n){const i=Fh(n);switch(e){case bc:return s*t;case Ac:return s*t;case Rc:return s*t*2;case Wo:return s*t/i.components*i.byteLength;case Xo:return s*t/i.components*i.byteLength;case Cc:return s*t*2/i.components*i.byteLength;case qo:return s*t*2/i.components*i.byteLength;case Tc:return s*t*3/i.components*i.byteLength;case tn:return s*t*4/i.components*i.byteLength;case Yo:return s*t*4/i.components*i.byteLength;case Xs:case qs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ys:case $s:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ho:case fo:return Math.max(s,16)*Math.max(t,8)/4;case lo:case uo:return Math.max(s,8)*Math.max(t,8)/2;case po:case mo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case go:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case _o:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case vo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case So:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case yo:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case wo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case bo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case To:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Co:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Po:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Zs:case Lo:case Io:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Pc:case Do:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Uo:case No:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fh(s){switch(s){case yn:case yc:return{byteLength:1,components:1};case ss:case wc:case os:return{byteLength:2,components:1};case Ho:case Vo:return{byteLength:2,components:4};case ti:case Go:case hn:return{byteLength:4,components:1};case Ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ko);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yc(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Oh(s){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,d=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=s.SHORT;else if(l instanceof Uint32Array)p=s.UNSIGNED_INT;else if(l instanceof Int32Array)p=s.INT;else if(l instanceof Int8Array)p=s.BYTE;else if(l instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const u=c.array,d=c.updateRanges;if(s.bindBuffer(l,a),d.length===0)s.bufferSubData(l,0,u);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];s.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}var Bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zh=`#ifdef USE_ALPHAHASH
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
#endif`,kh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wh=`#ifdef USE_AOMAP
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
#endif`,Xh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qh=`#ifdef USE_BATCHING
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
#endif`,Yh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$h=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jh=`#ifdef USE_IRIDESCENCE
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
#endif`,Jh=`#ifdef USE_BUMPMAP
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
#endif`,Qh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,iu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,su=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ru=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
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
#endif`,au=`#define PI 3.141592653589793
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
} // validated`,cu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lu=`vec3 transformedNormal = objectNormal;
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
#endif`,hu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,du=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pu="gl_FragColor = linearToOutputTexel( gl_FragColor );",mu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gu=`#ifdef USE_ENVMAP
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
#endif`,_u=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xu=`#ifdef USE_ENVMAP
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
#endif`,vu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mu=`#ifdef USE_ENVMAP
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
#endif`,Su=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bu=`#ifdef USE_GRADIENTMAP
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
}`,Tu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Au=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ru=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cu=`uniform bool receiveShadow;
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
#endif`,Pu=`#ifdef USE_ENVMAP
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
#endif`,Lu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Iu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Du=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nu=`PhysicalMaterial material;
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
#endif`,Fu=`struct PhysicalMaterial {
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
}`,Ou=`
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
#endif`,Bu=`#if defined( RE_IndirectDiffuse )
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
#endif`,zu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ku=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yu=`#if defined( USE_POINTS_UV )
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
#endif`,$u=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ku=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ju=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ju=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qu=`#ifdef USE_MORPHTARGETS
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
#endif`,td=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ed=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,od=`#ifdef USE_NORMALMAP
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
#endif`,ad=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ld=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ud=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,md=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_d=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Md=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yd=`float getShadowMask() {
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
}`,wd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ed=`#ifdef USE_SKINNING
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
#endif`,bd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Td=`#ifdef USE_SKINNING
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
#endif`,Ad=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ld=`#ifdef USE_TRANSMISSION
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
#endif`,Id=`#ifdef USE_TRANSMISSION
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
#endif`,Dd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Od=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bd=`uniform sampler2D t2D;
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
}`,zd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`#include <common>
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
}`,Wd=`#if DEPTH_PACKING == 3200
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
}`,Xd=`#define DISTANCE
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
}`,qd=`#define DISTANCE
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
}`,Yd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$d=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zd=`uniform float scale;
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
}`,Kd=`uniform vec3 diffuse;
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
}`,jd=`#include <common>
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
}`,Jd=`uniform vec3 diffuse;
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
}`,Qd=`#define LAMBERT
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
}`,tf=`#define LAMBERT
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
}`,ef=`#define MATCAP
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
}`,nf=`#define MATCAP
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
}`,sf=`#define NORMAL
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
}`,rf=`#define NORMAL
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
}`,of=`#define PHONG
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
}`,af=`#define PHONG
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
}`,cf=`#define STANDARD
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
}`,lf=`#define STANDARD
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
}`,hf=`#define TOON
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
}`,uf=`#define TOON
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
}`,df=`uniform float size;
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
}`,ff=`uniform vec3 diffuse;
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
}`,pf=`#include <common>
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
}`,mf=`uniform vec3 color;
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
}`,gf=`uniform float rotation;
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
}`,_f=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:Bh,alphahash_pars_fragment:zh,alphamap_fragment:kh,alphamap_pars_fragment:Gh,alphatest_fragment:Hh,alphatest_pars_fragment:Vh,aomap_fragment:Wh,aomap_pars_fragment:Xh,batching_pars_vertex:qh,batching_vertex:Yh,begin_vertex:$h,beginnormal_vertex:Zh,bsdfs:Kh,iridescence_fragment:jh,bumpmap_pars_fragment:Jh,clipping_planes_fragment:Qh,clipping_planes_pars_fragment:tu,clipping_planes_pars_vertex:eu,clipping_planes_vertex:nu,color_fragment:iu,color_pars_fragment:su,color_pars_vertex:ru,color_vertex:ou,common:au,cube_uv_reflection_fragment:cu,defaultnormal_vertex:lu,displacementmap_pars_vertex:hu,displacementmap_vertex:uu,emissivemap_fragment:du,emissivemap_pars_fragment:fu,colorspace_fragment:pu,colorspace_pars_fragment:mu,envmap_fragment:gu,envmap_common_pars_fragment:_u,envmap_pars_fragment:xu,envmap_pars_vertex:vu,envmap_physical_pars_fragment:Pu,envmap_vertex:Mu,fog_vertex:Su,fog_pars_vertex:yu,fog_fragment:wu,fog_pars_fragment:Eu,gradientmap_pars_fragment:bu,lightmap_pars_fragment:Tu,lights_lambert_fragment:Au,lights_lambert_pars_fragment:Ru,lights_pars_begin:Cu,lights_toon_fragment:Lu,lights_toon_pars_fragment:Iu,lights_phong_fragment:Du,lights_phong_pars_fragment:Uu,lights_physical_fragment:Nu,lights_physical_pars_fragment:Fu,lights_fragment_begin:Ou,lights_fragment_maps:Bu,lights_fragment_end:zu,logdepthbuf_fragment:ku,logdepthbuf_pars_fragment:Gu,logdepthbuf_pars_vertex:Hu,logdepthbuf_vertex:Vu,map_fragment:Wu,map_pars_fragment:Xu,map_particle_fragment:qu,map_particle_pars_fragment:Yu,metalnessmap_fragment:$u,metalnessmap_pars_fragment:Zu,morphinstance_vertex:Ku,morphcolor_vertex:ju,morphnormal_vertex:Ju,morphtarget_pars_vertex:Qu,morphtarget_vertex:td,normal_fragment_begin:ed,normal_fragment_maps:nd,normal_pars_fragment:id,normal_pars_vertex:sd,normal_vertex:rd,normalmap_pars_fragment:od,clearcoat_normal_fragment_begin:ad,clearcoat_normal_fragment_maps:cd,clearcoat_pars_fragment:ld,iridescence_pars_fragment:hd,opaque_fragment:ud,packing:dd,premultiplied_alpha_fragment:fd,project_vertex:pd,dithering_fragment:md,dithering_pars_fragment:gd,roughnessmap_fragment:_d,roughnessmap_pars_fragment:xd,shadowmap_pars_fragment:vd,shadowmap_pars_vertex:Md,shadowmap_vertex:Sd,shadowmask_pars_fragment:yd,skinbase_vertex:wd,skinning_pars_vertex:Ed,skinning_vertex:bd,skinnormal_vertex:Td,specularmap_fragment:Ad,specularmap_pars_fragment:Rd,tonemapping_fragment:Cd,tonemapping_pars_fragment:Pd,transmission_fragment:Ld,transmission_pars_fragment:Id,uv_pars_fragment:Dd,uv_pars_vertex:Ud,uv_vertex:Nd,worldpos_vertex:Fd,background_vert:Od,background_frag:Bd,backgroundCube_vert:zd,backgroundCube_frag:kd,cube_vert:Gd,cube_frag:Hd,depth_vert:Vd,depth_frag:Wd,distanceRGBA_vert:Xd,distanceRGBA_frag:qd,equirect_vert:Yd,equirect_frag:$d,linedashed_vert:Zd,linedashed_frag:Kd,meshbasic_vert:jd,meshbasic_frag:Jd,meshlambert_vert:Qd,meshlambert_frag:tf,meshmatcap_vert:ef,meshmatcap_frag:nf,meshnormal_vert:sf,meshnormal_frag:rf,meshphong_vert:of,meshphong_frag:af,meshphysical_vert:cf,meshphysical_frag:lf,meshtoon_vert:hf,meshtoon_frag:uf,points_vert:df,points_frag:ff,shadow_vert:pf,shadow_frag:mf,sprite_vert:gf,sprite_frag:_f},_t={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},cn={basic:{uniforms:Ne([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Ne([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Et(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Ne([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Ne([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Ne([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Et(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Ne([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Ne([_t.points,_t.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Ne([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Ne([_t.common,_t.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Ne([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Ne([_t.sprite,_t.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Ne([_t.common,_t.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Ne([_t.lights,_t.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};cn.physical={uniforms:Ne([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Hs={r:0,b:0,g:0},Wn=new un,xf=new ae;function vf(s,t,e,n,i,r,o){const a=new Et(0);let c=r===!0?0:1,l,u,d=null,f=0,p=null;function g(w){let y=w.isScene===!0?w.background:null;return y&&y.isTexture&&(y=(w.backgroundBlurriness>0?e:t).get(y)),y}function _(w){let y=!1;const P=g(w);P===null?h(a,c):P&&P.isColor&&(h(P,1),y=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(w,y){const P=g(y);P&&(P.isCubeTexture||P.mapping===ir)?(u===void 0&&(u=new U(new X(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Ui(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Wn.copy(y.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(xf.makeRotationFromEuler(Wn)),u.material.toneMapped=ne.getTransfer(P.colorSpace)!==he,(d!==P||f!==P.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,d=P,f=P.version,p=s.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new U(new Ye(2,2),new Un({name:"BackgroundMaterial",uniforms:Ui(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ne.getTransfer(P.colorSpace)!==he,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(d!==P||f!==P.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,d=P,f=P.version,p=s.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function h(w,y){w.getRGB(Hs,zc(s)),n.buffers.color.setClear(Hs.r,Hs.g,Hs.b,y,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(w,y=1){a.set(w),c=y,h(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,h(a,c)},render:_,addToRenderList:m,dispose:E}}function Mf(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(v,C,H,V,Q){let et=!1;const Z=d(V,H,C);r!==Z&&(r=Z,l(r.object)),et=p(v,V,H,Q),et&&g(v,V,H,Q),Q!==null&&t.update(Q,s.ELEMENT_ARRAY_BUFFER),(et||o)&&(o=!1,y(v,C,H,V),Q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function c(){return s.createVertexArray()}function l(v){return s.bindVertexArray(v)}function u(v){return s.deleteVertexArray(v)}function d(v,C,H){const V=H.wireframe===!0;let Q=n[v.id];Q===void 0&&(Q={},n[v.id]=Q);let et=Q[C.id];et===void 0&&(et={},Q[C.id]=et);let Z=et[V];return Z===void 0&&(Z=f(c()),et[V]=Z),Z}function f(v){const C=[],H=[],V=[];for(let Q=0;Q<e;Q++)C[Q]=0,H[Q]=0,V[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:V,object:v,attributes:{},index:null}}function p(v,C,H,V){const Q=r.attributes,et=C.attributes;let Z=0;const rt=H.getAttributes();for(const $ in rt)if(rt[$].location>=0){const xt=Q[$];let bt=et[$];if(bt===void 0&&($==="instanceMatrix"&&v.instanceMatrix&&(bt=v.instanceMatrix),$==="instanceColor"&&v.instanceColor&&(bt=v.instanceColor)),xt===void 0||xt.attribute!==bt||bt&&xt.data!==bt.data)return!0;Z++}return r.attributesNum!==Z||r.index!==V}function g(v,C,H,V){const Q={},et=C.attributes;let Z=0;const rt=H.getAttributes();for(const $ in rt)if(rt[$].location>=0){let xt=et[$];xt===void 0&&($==="instanceMatrix"&&v.instanceMatrix&&(xt=v.instanceMatrix),$==="instanceColor"&&v.instanceColor&&(xt=v.instanceColor));const bt={};bt.attribute=xt,xt&&xt.data&&(bt.data=xt.data),Q[$]=bt,Z++}r.attributes=Q,r.attributesNum=Z,r.index=V}function _(){const v=r.newAttributes;for(let C=0,H=v.length;C<H;C++)v[C]=0}function m(v){h(v,0)}function h(v,C){const H=r.newAttributes,V=r.enabledAttributes,Q=r.attributeDivisors;H[v]=1,V[v]===0&&(s.enableVertexAttribArray(v),V[v]=1),Q[v]!==C&&(s.vertexAttribDivisor(v,C),Q[v]=C)}function E(){const v=r.newAttributes,C=r.enabledAttributes;for(let H=0,V=C.length;H<V;H++)C[H]!==v[H]&&(s.disableVertexAttribArray(H),C[H]=0)}function w(v,C,H,V,Q,et,Z){Z===!0?s.vertexAttribIPointer(v,C,H,Q,et):s.vertexAttribPointer(v,C,H,V,Q,et)}function y(v,C,H,V){_();const Q=V.attributes,et=H.getAttributes(),Z=C.defaultAttributeValues;for(const rt in et){const $=et[rt];if($.location>=0){let ft=Q[rt];if(ft===void 0&&(rt==="instanceMatrix"&&v.instanceMatrix&&(ft=v.instanceMatrix),rt==="instanceColor"&&v.instanceColor&&(ft=v.instanceColor)),ft!==void 0){const xt=ft.normalized,bt=ft.itemSize,Gt=t.get(ft);if(Gt===void 0)continue;const te=Gt.buffer,tt=Gt.type,ut=Gt.bytesPerElement,wt=tt===s.INT||tt===s.UNSIGNED_INT||ft.gpuType===Go;if(ft.isInterleavedBufferAttribute){const dt=ft.data,Lt=dt.stride,Dt=ft.offset;if(dt.isInstancedInterleavedBuffer){for(let Wt=0;Wt<$.locationSize;Wt++)h($.location+Wt,dt.meshPerAttribute);v.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Wt=0;Wt<$.locationSize;Wt++)m($.location+Wt);s.bindBuffer(s.ARRAY_BUFFER,te);for(let Wt=0;Wt<$.locationSize;Wt++)w($.location+Wt,bt/$.locationSize,tt,xt,Lt*ut,(Dt+bt/$.locationSize*Wt)*ut,wt)}else{if(ft.isInstancedBufferAttribute){for(let dt=0;dt<$.locationSize;dt++)h($.location+dt,ft.meshPerAttribute);v.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let dt=0;dt<$.locationSize;dt++)m($.location+dt);s.bindBuffer(s.ARRAY_BUFFER,te);for(let dt=0;dt<$.locationSize;dt++)w($.location+dt,bt/$.locationSize,tt,xt,bt*ut,bt/$.locationSize*dt*ut,wt)}}else if(Z!==void 0){const xt=Z[rt];if(xt!==void 0)switch(xt.length){case 2:s.vertexAttrib2fv($.location,xt);break;case 3:s.vertexAttrib3fv($.location,xt);break;case 4:s.vertexAttrib4fv($.location,xt);break;default:s.vertexAttrib1fv($.location,xt)}}}}E()}function P(){I();for(const v in n){const C=n[v];for(const H in C){const V=C[H];for(const Q in V)u(V[Q].object),delete V[Q];delete C[H]}delete n[v]}}function R(v){if(n[v.id]===void 0)return;const C=n[v.id];for(const H in C){const V=C[H];for(const Q in V)u(V[Q].object),delete V[Q];delete C[H]}delete n[v.id]}function A(v){for(const C in n){const H=n[C];if(H[v.id]===void 0)continue;const V=H[v.id];for(const Q in V)u(V[Q].object),delete V[Q];delete H[v.id]}}function I(){M(),o=!0,r!==i&&(r=i,l(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:M,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function Sf(s,t,e){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,d){d!==0&&(s.drawArraysInstanced(n,l,u,d),e.update(u,n,d))}function a(l,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];e.update(p,n,1)}function c(l,u,d,f){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yf(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==tn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===os&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==yn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==hn&&!I)}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),h=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:y,vertexTextures:P,maxSamples:R}}function wf(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new Yn,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||n!==0||i;return i=f,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,h=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const E=r?0:n,w=E*4;let y=h.clippingState||null;c.value=y,y=u(g,f,w,p);for(let P=0;P!==w;++P)y[P]=e[P];h.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,f,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const h=p+_*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<h)&&(m=new Float32Array(h));for(let w=0,y=p;w!==_;++w,y+=4)o.copy(d[w]).applyMatrix4(E,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Ef(s){let t=new WeakMap;function e(o,a){return a===oo?o.mapping=Ci:a===ao&&(o.mapping=Pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===oo||a===ao)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new mh(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const wi=4,Wa=[.125,.215,.35,.446,.526,.582],Kn=20,Br=new qc,Xa=new Et;let zr=null,kr=0,Gr=0,Hr=!1;const $n=(1+Math.sqrt(5))/2,Si=1/$n,qa=[new L(-$n,Si,0),new L($n,Si,0),new L(-Si,0,$n),new L(Si,0,$n),new L(0,$n,-Si),new L(0,$n,Si),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Ya{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){zr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Gr=this._renderer.getActiveMipmapLevel(),Hr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ka(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Za(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(zr,kr,Gr),this._renderer.xr.enabled=Hr,t.scissorTest=!1,Vs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ci||t.mapping===Pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zr=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Gr=this._renderer.getActiveMipmapLevel(),Hr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:os,format:tn,colorSpace:Di,depthBuffer:!1},i=$a(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$a(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bf(r)),this._blurMaterial=Tf(r,t,e)}return i}_compileMaterial(t){const e=new U(this._lodPlanes[0],t);this._renderer.compile(e,Br)}_sceneToCubeUV(t,e,n,i){const a=new $e(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Xa),u.toneMapping=Dn,u.autoClear=!1;const p=new Fi({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new U(new X,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Xa),_=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(a.up.set(0,c[h],0),a.lookAt(l[h],0,0)):E===1?(a.up.set(0,0,c[h]),a.lookAt(0,l[h],0)):(a.up.set(0,c[h],0),a.lookAt(0,0,l[h]));const w=this._cubeSize;Vs(i,E*w,h>2?w:0,w,w),u.setRenderTarget(i),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ci||t.mapping===Pi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ka()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Za());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new U(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Vs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Br)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qa[(i-r-1)%qa.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new U(this._lodPlanes[i],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Kn-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Kn;m>Kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Kn}`);const h=[];let E=0;for(let A=0;A<Kn;++A){const I=A/_,M=Math.exp(-I*I/2);h.push(M),A===0?E+=M:A<m&&(E+=2*M)}for(let A=0;A<h.length;A++)h[A]=h[A]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-n;const y=this._sizeLods[i],P=3*y*(i>w-wi?i-w+wi:0),R=4*(this._cubeSize-y);Vs(e,P,R,3*y,2*y),c.setRenderTarget(e),c.render(d,Br)}}function bf(s){const t=[],e=[],n=[];let i=s;const r=s-wi+1+Wa.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-wi?c=Wa[o-s+wi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,h=1,E=new Float32Array(_*g*p),w=new Float32Array(m*g*p),y=new Float32Array(h*g*p);for(let R=0;R<p;R++){const A=R%3*2/3-1,I=R>2?0:-1,M=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];E.set(M,_*g*R),w.set(f,m*g*R);const v=[R,R,R,R,R,R];y.set(v,h*g*R)}const P=new Me;P.setAttribute("position",new Ze(E,_)),P.setAttribute("uv",new Ze(w,m)),P.setAttribute("faceIndex",new Ze(y,h)),t.push(P),i>wi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $a(s,t,e){const n=new ei(s,t,e);return n.texture.mapping=ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Tf(s,t,e){const n=new Float32Array(Kn),i=new L(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:na(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Za(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:na(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Ka(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function na(){return`

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
	`}function Af(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===oo||c===ao,u=c===Ci||c===Pi;if(l||u){let d=t.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Ya(s)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&i(p)?(e===null&&(e=new Ya(s)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Rf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&yi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Cf(s,t,e,n){const i={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function c(d){const f=d.attributes;for(const p in f)t.update(f[p],s.ARRAY_BUFFER)}function l(d){const f=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let w=0,y=E.length;w<y;w+=3){const P=E[w+0],R=E[w+1],A=E[w+2];f.push(P,R,R,A,A,P)}}else if(g!==void 0){const E=g.array;_=g.version;for(let w=0,y=E.length/3-1;w<y;w+=3){const P=w+0,R=w+1,A=w+2;f.push(P,R,R,A,A,P)}}else return;const m=new(Ic(f)?Bc:Oc)(f,1);m.version=_;const h=r.get(d);h&&t.remove(h),r.set(d,m)}function u(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Pf(s,t,e){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){s.drawElements(n,p,r,f*o),e.update(p,n,1)}function l(f,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,f*o,g),e.update(p,n,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];e.update(m,n,1)}function d(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)l(f[h]/o,p[h],_[h]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,_,0,g);let h=0;for(let E=0;E<g;E++)h+=p[E]*_[E];e.update(h,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Lf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function If(s,t,e){const n=new WeakMap,i=new ue;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let v=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var p=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let P=a.attributes.position.count*y,R=1;P>t.maxTextureSize&&(R=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const A=new Float32Array(P*R*4*d),I=new Uc(A,P,R,d);I.type=hn,I.needsUpdate=!0;const M=y*4;for(let C=0;C<d;C++){const H=h[C],V=E[C],Q=w[C],et=P*R*4*C;for(let Z=0;Z<H.count;Z++){const rt=Z*M;g===!0&&(i.fromBufferAttribute(H,Z),A[et+rt+0]=i.x,A[et+rt+1]=i.y,A[et+rt+2]=i.z,A[et+rt+3]=0),_===!0&&(i.fromBufferAttribute(V,Z),A[et+rt+4]=i.x,A[et+rt+5]=i.y,A[et+rt+6]=i.z,A[et+rt+7]=0),m===!0&&(i.fromBufferAttribute(Q,Z),A[et+rt+8]=i.x,A[et+rt+9]=i.y,A[et+rt+10]=i.z,A[et+rt+11]=Q.itemSize===4?i.w:1)}}f={count:d,texture:I,size:new Jt(P,R)},n.set(a,f),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Df(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,d=t.get(c,u);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return d}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const $c=new Ie,ja=new Wc(1,1),Zc=new Uc,Kc=new Ql,jc=new Gc,Ja=[],Qa=[],tc=new Float32Array(16),ec=new Float32Array(9),nc=new Float32Array(4);function Bi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ja[i];if(r===void 0&&(r=new Float32Array(i),Ja[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Se(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ar(s,t){let e=Qa[t];e===void 0&&(e=new Int32Array(t),Qa[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Uf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Nf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function Ff(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function Of(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function Bf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;nc.set(n),s.uniformMatrix2fv(this.addr,!1,nc),ye(e,n)}}function zf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;ec.set(n),s.uniformMatrix3fv(this.addr,!1,ec),ye(e,n)}}function kf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;tc.set(n),s.uniformMatrix4fv(this.addr,!1,tc),ye(e,n)}}function Gf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Hf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function Vf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function Wf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function Xf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function qf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function Yf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function $f(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function Zf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ja.compareFunction=Lc,r=ja):r=$c,e.setTexture2D(t||r,i)}function Kf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Kc,i)}function jf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||jc,i)}function Jf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Zc,i)}function Qf(s){switch(s){case 5126:return Uf;case 35664:return Nf;case 35665:return Ff;case 35666:return Of;case 35674:return Bf;case 35675:return zf;case 35676:return kf;case 5124:case 35670:return Gf;case 35667:case 35671:return Hf;case 35668:case 35672:return Vf;case 35669:case 35673:return Wf;case 5125:return Xf;case 36294:return qf;case 36295:return Yf;case 36296:return $f;case 35678:case 36198:case 36298:case 36306:case 35682:return Zf;case 35679:case 36299:case 36307:return Kf;case 35680:case 36300:case 36308:case 36293:return jf;case 36289:case 36303:case 36311:case 36292:return Jf}}function tp(s,t){s.uniform1fv(this.addr,t)}function ep(s,t){const e=Bi(t,this.size,2);s.uniform2fv(this.addr,e)}function np(s,t){const e=Bi(t,this.size,3);s.uniform3fv(this.addr,e)}function ip(s,t){const e=Bi(t,this.size,4);s.uniform4fv(this.addr,e)}function sp(s,t){const e=Bi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function rp(s,t){const e=Bi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function op(s,t){const e=Bi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ap(s,t){s.uniform1iv(this.addr,t)}function cp(s,t){s.uniform2iv(this.addr,t)}function lp(s,t){s.uniform3iv(this.addr,t)}function hp(s,t){s.uniform4iv(this.addr,t)}function up(s,t){s.uniform1uiv(this.addr,t)}function dp(s,t){s.uniform2uiv(this.addr,t)}function fp(s,t){s.uniform3uiv(this.addr,t)}function pp(s,t){s.uniform4uiv(this.addr,t)}function mp(s,t,e){const n=this.cache,i=t.length,r=ar(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||$c,r[o])}function gp(s,t,e){const n=this.cache,i=t.length,r=ar(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Kc,r[o])}function _p(s,t,e){const n=this.cache,i=t.length,r=ar(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||jc,r[o])}function xp(s,t,e){const n=this.cache,i=t.length,r=ar(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Zc,r[o])}function vp(s){switch(s){case 5126:return tp;case 35664:return ep;case 35665:return np;case 35666:return ip;case 35674:return sp;case 35675:return rp;case 35676:return op;case 5124:case 35670:return ap;case 35667:case 35671:return cp;case 35668:case 35672:return lp;case 35669:case 35673:return hp;case 5125:return up;case 36294:return dp;case 36295:return fp;case 36296:return pp;case 35678:case 36198:case 36298:case 36306:case 35682:return mp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return xp}}class Mp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qf(e.type)}}class Sp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vp(e.type)}}class yp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Vr=/(\w+)(\])?(\[|\.)?/g;function ic(s,t){s.seq.push(t),s.map[t.id]=t}function wp(s,t,e){const n=s.name,i=n.length;for(Vr.lastIndex=0;;){const r=Vr.exec(n),o=Vr.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ic(e,l===void 0?new Mp(a,s,t):new Sp(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new yp(a),ic(e,d)),e=d}}}class js{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);wp(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function sc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Ep=37297;let bp=0;function Tp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const rc=new $t;function Ap(s){ne._getMatrix(rc,ne.workingColorSpace,s);const t=`mat3( ${rc.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(s)){case Js:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function oc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Tp(s.getShaderSource(t),o)}else return i}function Rp(s,t){const e=Ap(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Cp(s,t){let e;switch(t){case Tl:e="Linear";break;case Al:e="Reinhard";break;case Rl:e="Cineon";break;case Mc:e="ACESFilmic";break;case Pl:e="AgX";break;case Ll:e="Neutral";break;case Cl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ws=new L;function Pp(){ne.getLuminanceCoefficients(Ws);const s=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(es).join(`
`)}function Ip(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Dp(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function es(s){return s!==""}function ac(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Up=/^[ \t]*#include +<([\w\d./]+)>/gm;function zo(s){return s.replace(Up,Fp)}const Np=new Map;function Fp(s,t){let e=Zt[t];if(e===void 0){const n=Np.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return zo(e)}const Op=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(s){return s.replace(Op,Bp)}function Bp(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function hc(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function zp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===_c?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===xc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===_n&&(t="SHADOWMAP_TYPE_VSM"),t}function kp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ci:case Pi:t="ENVMAP_TYPE_CUBE";break;case ir:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Gp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Pi:t="ENVMAP_MODE_REFRACTION";break}return t}function Hp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case vc:t="ENVMAP_BLENDING_MULTIPLY";break;case El:t="ENVMAP_BLENDING_MIX";break;case bl:t="ENVMAP_BLENDING_ADD";break}return t}function Vp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Wp(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=zp(e),l=kp(e),u=Gp(e),d=Hp(e),f=Vp(e),p=Lp(e),g=Ip(r),_=i.createProgram();let m,h,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(es).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(es).join(`
`),h.length>0&&(h+=`
`)):(m=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(es).join(`
`),h=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Dn?Cp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Rp("linearToOutputTexel",e.outputColorSpace),Pp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(es).join(`
`)),o=zo(o),o=ac(o,e),o=cc(o,e),a=zo(a),a=ac(a,e),a=cc(a,e),o=lc(o),a=lc(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===ua?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ua?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const w=E+m+o,y=E+h+a,P=sc(i,i.VERTEX_SHADER,w),R=sc(i,i.FRAGMENT_SHADER,y);i.attachShader(_,P),i.attachShader(_,R),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(C){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),V=i.getShaderInfoLog(P).trim(),Q=i.getShaderInfoLog(R).trim();let et=!0,Z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(et=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,P,R);else{const rt=oc(i,P,"vertex"),$=oc(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+rt+`
`+$)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(V===""||Q==="")&&(Z=!1);Z&&(C.diagnostics={runnable:et,programLog:H,vertexShader:{log:V,prefix:m},fragmentShader:{log:Q,prefix:h}})}i.deleteShader(P),i.deleteShader(R),I=new js(i,_),M=Dp(i,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,Ep)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=bp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=R,this}let Xp=0;class qp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Yp(t),e.set(t,n)),n}}class Yp{constructor(t){this.id=Xp++,this.code=t,this.usedTimes=0}}function $p(s,t,e,n,i,r,o){const a=new Nc,c=new qp,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,v,C,H,V){const Q=H.fog,et=V.geometry,Z=M.isMeshStandardMaterial?H.environment:null,rt=(M.isMeshStandardMaterial?e:t).get(M.envMap||Z),$=rt&&rt.mapping===ir?rt.image.height:null,ft=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const xt=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,bt=xt!==void 0?xt.length:0;let Gt=0;et.morphAttributes.position!==void 0&&(Gt=1),et.morphAttributes.normal!==void 0&&(Gt=2),et.morphAttributes.color!==void 0&&(Gt=3);let te,tt,ut,wt;if(ft){const ee=cn[ft];te=ee.vertexShader,tt=ee.fragmentShader}else te=M.vertexShader,tt=M.fragmentShader,c.update(M),ut=c.getVertexShaderID(M),wt=c.getFragmentShaderID(M);const dt=s.getRenderTarget(),Lt=s.state.buffers.depth.getReversed(),Dt=V.isInstancedMesh===!0,Wt=V.isBatchedMesh===!0,re=!!M.map,Ut=!!M.matcap,fe=!!rt,D=!!M.aoMap,be=!!M.lightMap,qt=!!M.bumpMap,Ht=!!M.normalMap,Rt=!!M.displacementMap,ie=!!M.emissiveMap,Tt=!!M.metalnessMap,b=!!M.roughnessMap,x=M.anisotropy>0,T=M.clearcoat>0,B=M.dispersion>0,z=M.iridescence>0,k=M.sheen>0,ct=M.transmission>0,ot=x&&!!M.anisotropyMap,ht=T&&!!M.clearcoatMap,Nt=T&&!!M.clearcoatNormalMap,at=T&&!!M.clearcoatRoughnessMap,pt=z&&!!M.iridescenceMap,At=z&&!!M.iridescenceThicknessMap,It=k&&!!M.sheenColorMap,St=k&&!!M.sheenRoughnessMap,Yt=!!M.specularMap,Bt=!!M.specularColorMap,ce=!!M.specularIntensityMap,N=ct&&!!M.transmissionMap,mt=ct&&!!M.thicknessMap,Y=!!M.gradientMap,nt=!!M.alphaMap,gt=M.alphaTest>0,vt=!!M.alphaHash,zt=!!M.extensions;let le=Dn;M.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(le=s.toneMapping);const xe={shaderID:ft,shaderType:M.type,shaderName:M.name,vertexShader:te,fragmentShader:tt,defines:M.defines,customVertexShaderID:ut,customFragmentShaderID:wt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Wt,batchingColor:Wt&&V._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&V.instanceColor!==null,instancingMorph:Dt&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:dt===null?s.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Di,alphaToCoverage:!!M.alphaToCoverage,map:re,matcap:Ut,envMap:fe,envMapMode:fe&&rt.mapping,envMapCubeUVHeight:$,aoMap:D,lightMap:be,bumpMap:qt,normalMap:Ht,displacementMap:f&&Rt,emissiveMap:ie,normalMapObjectSpace:Ht&&M.normalMapType===Nl,normalMapTangentSpace:Ht&&M.normalMapType===$o,metalnessMap:Tt,roughnessMap:b,anisotropy:x,anisotropyMap:ot,clearcoat:T,clearcoatMap:ht,clearcoatNormalMap:Nt,clearcoatRoughnessMap:at,dispersion:B,iridescence:z,iridescenceMap:pt,iridescenceThicknessMap:At,sheen:k,sheenColorMap:It,sheenRoughnessMap:St,specularMap:Yt,specularColorMap:Bt,specularIntensityMap:ce,transmission:ct,transmissionMap:N,thicknessMap:mt,gradientMap:Y,opaque:M.transparent===!1&&M.blending===Ei&&M.alphaToCoverage===!1,alphaMap:nt,alphaTest:gt,alphaHash:vt,combine:M.combine,mapUv:re&&_(M.map.channel),aoMapUv:D&&_(M.aoMap.channel),lightMapUv:be&&_(M.lightMap.channel),bumpMapUv:qt&&_(M.bumpMap.channel),normalMapUv:Ht&&_(M.normalMap.channel),displacementMapUv:Rt&&_(M.displacementMap.channel),emissiveMapUv:ie&&_(M.emissiveMap.channel),metalnessMapUv:Tt&&_(M.metalnessMap.channel),roughnessMapUv:b&&_(M.roughnessMap.channel),anisotropyMapUv:ot&&_(M.anisotropyMap.channel),clearcoatMapUv:ht&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:At&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:It&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:St&&_(M.sheenRoughnessMap.channel),specularMapUv:Yt&&_(M.specularMap.channel),specularColorMapUv:Bt&&_(M.specularColorMap.channel),specularIntensityMapUv:ce&&_(M.specularIntensityMap.channel),transmissionMapUv:N&&_(M.transmissionMap.channel),thicknessMapUv:mt&&_(M.thicknessMap.channel),alphaMapUv:nt&&_(M.alphaMap.channel),vertexTangents:!!et.attributes.tangent&&(Ht||x),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!et.attributes.uv&&(re||nt),fog:!!Q,useFog:M.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Lt,skinning:V.isSkinnedMesh===!0,morphTargets:et.morphAttributes.position!==void 0,morphNormals:et.morphAttributes.normal!==void 0,morphColors:et.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Gt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:le,decodeVideoTexture:re&&M.map.isVideoTexture===!0&&ne.getTransfer(M.map.colorSpace)===he,decodeVideoTextureEmissive:ie&&M.emissiveMap.isVideoTexture===!0&&ne.getTransfer(M.emissiveMap.colorSpace)===he,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Je,flipSided:M.side===Ve,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:zt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&M.extensions.multiDraw===!0||Wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return xe.vertexUv1s=l.has(1),xe.vertexUv2s=l.has(2),xe.vertexUv3s=l.has(3),l.clear(),xe}function h(M){const v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)v.push(C),v.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(E(v,M),w(v,M),v.push(s.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function E(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function w(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const v=g[M.type];let C;if(v){const H=cn[v];C=uh.clone(H.uniforms)}else C=M.uniforms;return C}function P(M,v){let C;for(let H=0,V=u.length;H<V;H++){const Q=u[H];if(Q.cacheKey===v){C=Q,++C.usedTimes;break}}return C===void 0&&(C=new Wp(s,v,M,r),u.push(C)),C}function R(M){if(--M.usedTimes===0){const v=u.indexOf(M);u[v]=u[u.length-1],u.pop(),M.destroy()}}function A(M){c.remove(M)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:y,acquireProgram:P,releaseProgram:R,releaseShaderCache:A,programs:u,dispose:I}}function Zp(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Kp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function uc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function dc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,f,p,g,_,m){let h=s[t];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[t]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=m),t++,h}function a(d,f,p,g,_,m){const h=o(d,f,p,g,_,m);p.transmission>0?n.push(h):p.transparent===!0?i.push(h):e.push(h)}function c(d,f,p,g,_,m){const h=o(d,f,p,g,_,m);p.transmission>0?n.unshift(h):p.transparent===!0?i.unshift(h):e.unshift(h)}function l(d,f){e.length>1&&e.sort(d||Kp),n.length>1&&n.sort(f||uc),i.length>1&&i.sort(f||uc)}function u(){for(let d=t,f=s.length;d<f;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function jp(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new dc,s.set(n,[o])):i>=r.length?(o=new dc,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Jp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Et};break;case"SpotLight":e={position:new L,direction:new L,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Et,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":e={color:new Et,position:new L,halfWidth:new L,halfHeight:new L};break}return s[t.id]=e,e}}}function Qp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let tm=0;function em(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function nm(s){const t=new Jp,e=Qp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const i=new L,r=new ae,o=new ae;function a(l){let u=0,d=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,h=0,E=0,w=0,y=0,P=0,R=0,A=0;l.sort(em);for(let M=0,v=l.length;M<v;M++){const C=l[M],H=C.color,V=C.intensity,Q=C.distance,et=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=H.r*V,d+=H.g*V,f+=H.b*V;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(C.sh.coefficients[Z],V);A++}else if(C.isDirectionalLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const rt=C.shadow,$=e.get(C);$.shadowIntensity=rt.intensity,$.shadowBias=rt.bias,$.shadowNormalBias=rt.normalBias,$.shadowRadius=rt.radius,$.shadowMapSize=rt.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=et,n.directionalShadowMatrix[p]=C.shadow.matrix,E++}n.directional[p]=Z,p++}else if(C.isSpotLight){const Z=t.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(H).multiplyScalar(V),Z.distance=Q,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,n.spot[_]=Z;const rt=C.shadow;if(C.map&&(n.spotLightMap[P]=C.map,P++,rt.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=rt.matrix,C.castShadow){const $=e.get(C);$.shadowIntensity=rt.intensity,$.shadowBias=rt.bias,$.shadowNormalBias=rt.normalBias,$.shadowRadius=rt.radius,$.shadowMapSize=rt.mapSize,n.spotShadow[_]=$,n.spotShadowMap[_]=et,y++}_++}else if(C.isRectAreaLight){const Z=t.get(C);Z.color.copy(H).multiplyScalar(V),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=Z,m++}else if(C.isPointLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){const rt=C.shadow,$=e.get(C);$.shadowIntensity=rt.intensity,$.shadowBias=rt.bias,$.shadowNormalBias=rt.normalBias,$.shadowRadius=rt.radius,$.shadowMapSize=rt.mapSize,$.shadowCameraNear=rt.camera.near,$.shadowCameraFar=rt.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=et,n.pointShadowMatrix[g]=C.shadow.matrix,w++}n.point[g]=Z,g++}else if(C.isHemisphereLight){const Z=t.get(C);Z.skyColor.copy(C.color).multiplyScalar(V),Z.groundColor.copy(C.groundColor).multiplyScalar(V),n.hemi[h]=Z,h++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==h||I.numDirectionalShadows!==E||I.numPointShadows!==w||I.numSpotShadows!==y||I.numSpotMaps!==P||I.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=y+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=h,I.numDirectionalShadows=E,I.numPointShadows=w,I.numSpotShadows=y,I.numSpotMaps=P,I.numLightProbes=A,n.version=tm++)}function c(l,u){let d=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let h=0,E=l.length;h<E;h++){const w=l[h];if(w.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(w.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function fc(s){const t=new nm(s),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function im(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new fc(s),t.set(i,[a])):r>=o.length?(a=new fc(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rm=`uniform sampler2D shadow_pass;
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
}`;function om(s,t,e){let n=new jo;const i=new Jt,r=new Jt,o=new ue,a=new Rh({depthPacking:Ul}),c=new Ch,l={},u=e.maxTextureSize,d={[Mn]:Ve,[Ve]:Mn,[Je]:Je},f=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:sm,fragmentShader:rm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new U(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_c;let h=this.type;this.render=function(R,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const M=s.getRenderTarget(),v=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),H=s.state;H.setBlending(In),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const V=h!==_n&&this.type===_n,Q=h===_n&&this.type!==_n;for(let et=0,Z=R.length;et<Z;et++){const rt=R[et],$=rt.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);const ft=$.getFrameExtents();if(i.multiply(ft),r.copy($.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ft.x),i.x=r.x*ft.x,$.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ft.y),i.y=r.y*ft.y,$.mapSize.y=r.y)),$.map===null||V===!0||Q===!0){const bt=this.type!==_n?{minFilter:Oe,magFilter:Oe}:{};$.map!==null&&$.map.dispose(),$.map=new ei(i.x,i.y,bt),$.map.texture.name=rt.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();const xt=$.getViewportCount();for(let bt=0;bt<xt;bt++){const Gt=$.getViewport(bt);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),H.viewport(o),$.updateMatrices(rt,bt),n=$.getFrustum(),y(A,I,$.camera,rt,this.type)}$.isPointLightShadow!==!0&&this.type===_n&&E($,I),$.needsUpdate=!1}h=this.type,m.needsUpdate=!1,s.setRenderTarget(M,v,C)};function E(R,A){const I=t.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ei(i.x,i.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(A,null,I,f,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(A,null,I,p,_,null)}function w(R,A,I,M){let v=null;const C=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)v=C;else if(v=I.isPointLight===!0?c:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=v.uuid,V=A.uuid;let Q=l[H];Q===void 0&&(Q={},l[H]=Q);let et=Q[V];et===void 0&&(et=v.clone(),Q[V]=et,A.addEventListener("dispose",P)),v=et}if(v.visible=A.visible,v.wireframe=A.wireframe,M===_n?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:d[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const H=s.properties.get(v);H.light=I}return v}function y(R,A,I,M,v){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===_n)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const V=t.update(R),Q=R.material;if(Array.isArray(Q)){const et=V.groups;for(let Z=0,rt=et.length;Z<rt;Z++){const $=et[Z],ft=Q[$.materialIndex];if(ft&&ft.visible){const xt=w(R,ft,M,v);R.onBeforeShadow(s,R,A,I,V,xt,$),s.renderBufferDirect(I,null,V,xt,R,$),R.onAfterShadow(s,R,A,I,V,xt,$)}}}else if(Q.visible){const et=w(R,Q,M,v);R.onBeforeShadow(s,R,A,I,V,et,null),s.renderBufferDirect(I,null,V,et,R,null),R.onAfterShadow(s,R,A,I,V,et,null)}}const H=R.children;for(let V=0,Q=H.length;V<Q;V++)y(H[V],A,I,M,v)}function P(R){R.target.removeEventListener("dispose",P);for(const I in l){const M=l[I],v=R.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}const am={[Qr]:to,[eo]:so,[no]:ro,[Ri]:io,[to]:Qr,[so]:eo,[ro]:no,[io]:Ri};function cm(s,t){function e(){let N=!1;const mt=new ue;let Y=null;const nt=new ue(0,0,0,0);return{setMask:function(gt){Y!==gt&&!N&&(s.colorMask(gt,gt,gt,gt),Y=gt)},setLocked:function(gt){N=gt},setClear:function(gt,vt,zt,le,xe){xe===!0&&(gt*=le,vt*=le,zt*=le),mt.set(gt,vt,zt,le),nt.equals(mt)===!1&&(s.clearColor(gt,vt,zt,le),nt.copy(mt))},reset:function(){N=!1,Y=null,nt.set(-1,0,0,0)}}}function n(){let N=!1,mt=!1,Y=null,nt=null,gt=null;return{setReversed:function(vt){if(mt!==vt){const zt=t.get("EXT_clip_control");mt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);const le=gt;gt=null,this.setClear(le)}mt=vt},getReversed:function(){return mt},setTest:function(vt){vt?dt(s.DEPTH_TEST):Lt(s.DEPTH_TEST)},setMask:function(vt){Y!==vt&&!N&&(s.depthMask(vt),Y=vt)},setFunc:function(vt){if(mt&&(vt=am[vt]),nt!==vt){switch(vt){case Qr:s.depthFunc(s.NEVER);break;case to:s.depthFunc(s.ALWAYS);break;case eo:s.depthFunc(s.LESS);break;case Ri:s.depthFunc(s.LEQUAL);break;case no:s.depthFunc(s.EQUAL);break;case io:s.depthFunc(s.GEQUAL);break;case so:s.depthFunc(s.GREATER);break;case ro:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}nt=vt}},setLocked:function(vt){N=vt},setClear:function(vt){gt!==vt&&(mt&&(vt=1-vt),s.clearDepth(vt),gt=vt)},reset:function(){N=!1,Y=null,nt=null,gt=null,mt=!1}}}function i(){let N=!1,mt=null,Y=null,nt=null,gt=null,vt=null,zt=null,le=null,xe=null;return{setTest:function(ee){N||(ee?dt(s.STENCIL_TEST):Lt(s.STENCIL_TEST))},setMask:function(ee){mt!==ee&&!N&&(s.stencilMask(ee),mt=ee)},setFunc:function(ee,Be,Ke){(Y!==ee||nt!==Be||gt!==Ke)&&(s.stencilFunc(ee,Be,Ke),Y=ee,nt=Be,gt=Ke)},setOp:function(ee,Be,Ke){(vt!==ee||zt!==Be||le!==Ke)&&(s.stencilOp(ee,Be,Ke),vt=ee,zt=Be,le=Ke)},setLocked:function(ee){N=ee},setClear:function(ee){xe!==ee&&(s.clearStencil(ee),xe=ee)},reset:function(){N=!1,mt=null,Y=null,nt=null,gt=null,vt=null,zt=null,le=null,xe=null}}}const r=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,p=[],g=null,_=!1,m=null,h=null,E=null,w=null,y=null,P=null,R=null,A=new Et(0,0,0),I=0,M=!1,v=null,C=null,H=null,V=null,Q=null;const et=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,rt=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec($)[1]),Z=rt>=1):$.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Z=rt>=2);let ft=null,xt={};const bt=s.getParameter(s.SCISSOR_BOX),Gt=s.getParameter(s.VIEWPORT),te=new ue().fromArray(bt),tt=new ue().fromArray(Gt);function ut(N,mt,Y,nt){const gt=new Uint8Array(4),vt=s.createTexture();s.bindTexture(N,vt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let zt=0;zt<Y;zt++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(mt,0,s.RGBA,1,1,nt,0,s.RGBA,s.UNSIGNED_BYTE,gt):s.texImage2D(mt+zt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,gt);return vt}const wt={};wt[s.TEXTURE_2D]=ut(s.TEXTURE_2D,s.TEXTURE_2D,1),wt[s.TEXTURE_CUBE_MAP]=ut(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[s.TEXTURE_2D_ARRAY]=ut(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),wt[s.TEXTURE_3D]=ut(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),dt(s.DEPTH_TEST),o.setFunc(Ri),qt(!1),Ht(ra),dt(s.CULL_FACE),D(In);function dt(N){u[N]!==!0&&(s.enable(N),u[N]=!0)}function Lt(N){u[N]!==!1&&(s.disable(N),u[N]=!1)}function Dt(N,mt){return d[N]!==mt?(s.bindFramebuffer(N,mt),d[N]=mt,N===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=mt),N===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=mt),!0):!1}function Wt(N,mt){let Y=p,nt=!1;if(N){Y=f.get(mt),Y===void 0&&(Y=[],f.set(mt,Y));const gt=N.textures;if(Y.length!==gt.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let vt=0,zt=gt.length;vt<zt;vt++)Y[vt]=s.COLOR_ATTACHMENT0+vt;Y.length=gt.length,nt=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,nt=!0);nt&&s.drawBuffers(Y)}function re(N){return g!==N?(s.useProgram(N),g=N,!0):!1}const Ut={[Zn]:s.FUNC_ADD,[al]:s.FUNC_SUBTRACT,[cl]:s.FUNC_REVERSE_SUBTRACT};Ut[ll]=s.MIN,Ut[hl]=s.MAX;const fe={[ul]:s.ZERO,[dl]:s.ONE,[fl]:s.SRC_COLOR,[jr]:s.SRC_ALPHA,[vl]:s.SRC_ALPHA_SATURATE,[_l]:s.DST_COLOR,[ml]:s.DST_ALPHA,[pl]:s.ONE_MINUS_SRC_COLOR,[Jr]:s.ONE_MINUS_SRC_ALPHA,[xl]:s.ONE_MINUS_DST_COLOR,[gl]:s.ONE_MINUS_DST_ALPHA,[Ml]:s.CONSTANT_COLOR,[Sl]:s.ONE_MINUS_CONSTANT_COLOR,[yl]:s.CONSTANT_ALPHA,[wl]:s.ONE_MINUS_CONSTANT_ALPHA};function D(N,mt,Y,nt,gt,vt,zt,le,xe,ee){if(N===In){_===!0&&(Lt(s.BLEND),_=!1);return}if(_===!1&&(dt(s.BLEND),_=!0),N!==ol){if(N!==m||ee!==M){if((h!==Zn||y!==Zn)&&(s.blendEquation(s.FUNC_ADD),h=Zn,y=Zn),ee)switch(N){case Ei:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case oa:s.blendFunc(s.ONE,s.ONE);break;case aa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ca:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ei:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case oa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case aa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ca:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}E=null,w=null,P=null,R=null,A.set(0,0,0),I=0,m=N,M=ee}return}gt=gt||mt,vt=vt||Y,zt=zt||nt,(mt!==h||gt!==y)&&(s.blendEquationSeparate(Ut[mt],Ut[gt]),h=mt,y=gt),(Y!==E||nt!==w||vt!==P||zt!==R)&&(s.blendFuncSeparate(fe[Y],fe[nt],fe[vt],fe[zt]),E=Y,w=nt,P=vt,R=zt),(le.equals(A)===!1||xe!==I)&&(s.blendColor(le.r,le.g,le.b,xe),A.copy(le),I=xe),m=N,M=!1}function be(N,mt){N.side===Je?Lt(s.CULL_FACE):dt(s.CULL_FACE);let Y=N.side===Ve;mt&&(Y=!Y),qt(Y),N.blending===Ei&&N.transparent===!1?D(In):D(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const nt=N.stencilWrite;a.setTest(nt),nt&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ie(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?dt(s.SAMPLE_ALPHA_TO_COVERAGE):Lt(s.SAMPLE_ALPHA_TO_COVERAGE)}function qt(N){v!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),v=N)}function Ht(N){N!==sl?(dt(s.CULL_FACE),N!==C&&(N===ra?s.cullFace(s.BACK):N===rl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Lt(s.CULL_FACE),C=N}function Rt(N){N!==H&&(Z&&s.lineWidth(N),H=N)}function ie(N,mt,Y){N?(dt(s.POLYGON_OFFSET_FILL),(V!==mt||Q!==Y)&&(s.polygonOffset(mt,Y),V=mt,Q=Y)):Lt(s.POLYGON_OFFSET_FILL)}function Tt(N){N?dt(s.SCISSOR_TEST):Lt(s.SCISSOR_TEST)}function b(N){N===void 0&&(N=s.TEXTURE0+et-1),ft!==N&&(s.activeTexture(N),ft=N)}function x(N,mt,Y){Y===void 0&&(ft===null?Y=s.TEXTURE0+et-1:Y=ft);let nt=xt[Y];nt===void 0&&(nt={type:void 0,texture:void 0},xt[Y]=nt),(nt.type!==N||nt.texture!==mt)&&(ft!==Y&&(s.activeTexture(Y),ft=Y),s.bindTexture(N,mt||wt[N]),nt.type=N,nt.texture=mt)}function T(){const N=xt[ft];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function B(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function z(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function k(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ct(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ht(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function At(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(N){te.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),te.copy(N))}function St(N){tt.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),tt.copy(N))}function Yt(N,mt){let Y=l.get(mt);Y===void 0&&(Y=new WeakMap,l.set(mt,Y));let nt=Y.get(N);nt===void 0&&(nt=s.getUniformBlockIndex(mt,N.name),Y.set(N,nt))}function Bt(N,mt){const nt=l.get(mt).get(N);c.get(mt)!==nt&&(s.uniformBlockBinding(mt,nt,N.__bindingPointIndex),c.set(mt,nt))}function ce(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ft=null,xt={},d={},f=new WeakMap,p=[],g=null,_=!1,m=null,h=null,E=null,w=null,y=null,P=null,R=null,A=new Et(0,0,0),I=0,M=!1,v=null,C=null,H=null,V=null,Q=null,te.set(0,0,s.canvas.width,s.canvas.height),tt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:dt,disable:Lt,bindFramebuffer:Dt,drawBuffers:Wt,useProgram:re,setBlending:D,setMaterial:be,setFlipSided:qt,setCullFace:Ht,setLineWidth:Rt,setPolygonOffset:ie,setScissorTest:Tt,activeTexture:b,bindTexture:x,unbindTexture:T,compressedTexImage2D:B,compressedTexImage3D:z,texImage2D:pt,texImage3D:At,updateUBOMapping:Yt,uniformBlockBinding:Bt,texStorage2D:Nt,texStorage3D:at,texSubImage2D:k,texSubImage3D:ct,compressedTexSubImage2D:ot,compressedTexSubImage3D:ht,scissor:It,viewport:St,reset:ce}}function lm(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Jt,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return p?new OffscreenCanvas(b,x):tr("canvas")}function _(b,x,T){let B=1;const z=Tt(b);if((z.width>T||z.height>T)&&(B=T/Math.max(z.width,z.height)),B<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const k=Math.floor(B*z.width),ct=Math.floor(B*z.height);d===void 0&&(d=g(k,ct));const ot=x?g(k,ct):d;return ot.width=k,ot.height=ct,ot.getContext("2d").drawImage(b,0,0,k,ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+k+"x"+ct+")."),ot}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),b;return b}function m(b){return b.generateMipmaps}function h(b){s.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?s.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(b,x,T,B,z=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let k=x;if(x===s.RED&&(T===s.FLOAT&&(k=s.R32F),T===s.HALF_FLOAT&&(k=s.R16F),T===s.UNSIGNED_BYTE&&(k=s.R8)),x===s.RED_INTEGER&&(T===s.UNSIGNED_BYTE&&(k=s.R8UI),T===s.UNSIGNED_SHORT&&(k=s.R16UI),T===s.UNSIGNED_INT&&(k=s.R32UI),T===s.BYTE&&(k=s.R8I),T===s.SHORT&&(k=s.R16I),T===s.INT&&(k=s.R32I)),x===s.RG&&(T===s.FLOAT&&(k=s.RG32F),T===s.HALF_FLOAT&&(k=s.RG16F),T===s.UNSIGNED_BYTE&&(k=s.RG8)),x===s.RG_INTEGER&&(T===s.UNSIGNED_BYTE&&(k=s.RG8UI),T===s.UNSIGNED_SHORT&&(k=s.RG16UI),T===s.UNSIGNED_INT&&(k=s.RG32UI),T===s.BYTE&&(k=s.RG8I),T===s.SHORT&&(k=s.RG16I),T===s.INT&&(k=s.RG32I)),x===s.RGB_INTEGER&&(T===s.UNSIGNED_BYTE&&(k=s.RGB8UI),T===s.UNSIGNED_SHORT&&(k=s.RGB16UI),T===s.UNSIGNED_INT&&(k=s.RGB32UI),T===s.BYTE&&(k=s.RGB8I),T===s.SHORT&&(k=s.RGB16I),T===s.INT&&(k=s.RGB32I)),x===s.RGBA_INTEGER&&(T===s.UNSIGNED_BYTE&&(k=s.RGBA8UI),T===s.UNSIGNED_SHORT&&(k=s.RGBA16UI),T===s.UNSIGNED_INT&&(k=s.RGBA32UI),T===s.BYTE&&(k=s.RGBA8I),T===s.SHORT&&(k=s.RGBA16I),T===s.INT&&(k=s.RGBA32I)),x===s.RGB&&T===s.UNSIGNED_INT_5_9_9_9_REV&&(k=s.RGB9_E5),x===s.RGBA){const ct=z?Js:ne.getTransfer(B);T===s.FLOAT&&(k=s.RGBA32F),T===s.HALF_FLOAT&&(k=s.RGBA16F),T===s.UNSIGNED_BYTE&&(k=ct===he?s.SRGB8_ALPHA8:s.RGBA8),T===s.UNSIGNED_SHORT_4_4_4_4&&(k=s.RGBA4),T===s.UNSIGNED_SHORT_5_5_5_1&&(k=s.RGB5_A1)}return(k===s.R16F||k===s.R32F||k===s.RG16F||k===s.RG32F||k===s.RGBA16F||k===s.RGBA32F)&&t.get("EXT_color_buffer_float"),k}function y(b,x){let T;return b?x===null||x===ti||x===Li?T=s.DEPTH24_STENCIL8:x===hn?T=s.DEPTH32F_STENCIL8:x===ss&&(T=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ti||x===Li?T=s.DEPTH_COMPONENT24:x===hn?T=s.DEPTH_COMPONENT32F:x===ss&&(T=s.DEPTH_COMPONENT16),T}function P(b,x){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Oe&&b.minFilter!==ln?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function R(b){const x=b.target;x.removeEventListener("dispose",R),I(x),x.isVideoTexture&&u.delete(x)}function A(b){const x=b.target;x.removeEventListener("dispose",A),v(x)}function I(b){const x=n.get(b);if(x.__webglInit===void 0)return;const T=b.source,B=f.get(T);if(B){const z=B[x.__cacheKey];z.usedTimes--,z.usedTimes===0&&M(b),Object.keys(B).length===0&&f.delete(T)}n.remove(b)}function M(b){const x=n.get(b);s.deleteTexture(x.__webglTexture);const T=b.source,B=f.get(T);delete B[x.__cacheKey],o.memory.textures--}function v(b){const x=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(x.__webglFramebuffer[B]))for(let z=0;z<x.__webglFramebuffer[B].length;z++)s.deleteFramebuffer(x.__webglFramebuffer[B][z]);else s.deleteFramebuffer(x.__webglFramebuffer[B]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[B])}else{if(Array.isArray(x.__webglFramebuffer))for(let B=0;B<x.__webglFramebuffer.length;B++)s.deleteFramebuffer(x.__webglFramebuffer[B]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let B=0;B<x.__webglColorRenderbuffer.length;B++)x.__webglColorRenderbuffer[B]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[B]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const T=b.textures;for(let B=0,z=T.length;B<z;B++){const k=n.get(T[B]);k.__webglTexture&&(s.deleteTexture(k.__webglTexture),o.memory.textures--),n.remove(T[B])}n.remove(b)}let C=0;function H(){C=0}function V(){const b=C;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),C+=1,b}function Q(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function et(b,x){const T=n.get(b);if(b.isVideoTexture&&Rt(b),b.isRenderTargetTexture===!1&&b.version>0&&T.__version!==b.version){const B=b.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(T,b,x);return}}e.bindTexture(s.TEXTURE_2D,T.__webglTexture,s.TEXTURE0+x)}function Z(b,x){const T=n.get(b);if(b.version>0&&T.__version!==b.version){tt(T,b,x);return}e.bindTexture(s.TEXTURE_2D_ARRAY,T.__webglTexture,s.TEXTURE0+x)}function rt(b,x){const T=n.get(b);if(b.version>0&&T.__version!==b.version){tt(T,b,x);return}e.bindTexture(s.TEXTURE_3D,T.__webglTexture,s.TEXTURE0+x)}function $(b,x){const T=n.get(b);if(b.version>0&&T.__version!==b.version){ut(T,b,x);return}e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+x)}const ft={[Sn]:s.REPEAT,[jn]:s.CLAMP_TO_EDGE,[co]:s.MIRRORED_REPEAT},xt={[Oe]:s.NEAREST,[Il]:s.NEAREST_MIPMAP_NEAREST,[gs]:s.NEAREST_MIPMAP_LINEAR,[ln]:s.LINEAR,[ur]:s.LINEAR_MIPMAP_NEAREST,[Jn]:s.LINEAR_MIPMAP_LINEAR},bt={[Fl]:s.NEVER,[Hl]:s.ALWAYS,[Ol]:s.LESS,[Lc]:s.LEQUAL,[Bl]:s.EQUAL,[Gl]:s.GEQUAL,[zl]:s.GREATER,[kl]:s.NOTEQUAL};function Gt(b,x){if(x.type===hn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===ln||x.magFilter===ur||x.magFilter===gs||x.magFilter===Jn||x.minFilter===ln||x.minFilter===ur||x.minFilter===gs||x.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,ft[x.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,ft[x.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,ft[x.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,xt[x.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,xt[x.minFilter]),x.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,bt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Oe||x.minFilter!==gs&&x.minFilter!==Jn||x.type===hn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const T=t.get("EXT_texture_filter_anisotropic");s.texParameterf(b,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function te(b,x){let T=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",R));const B=x.source;let z=f.get(B);z===void 0&&(z={},f.set(B,z));const k=Q(x);if(k!==b.__cacheKey){z[k]===void 0&&(z[k]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,T=!0),z[k].usedTimes++;const ct=z[b.__cacheKey];ct!==void 0&&(z[b.__cacheKey].usedTimes--,ct.usedTimes===0&&M(x)),b.__cacheKey=k,b.__webglTexture=z[k].texture}return T}function tt(b,x,T){let B=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(B=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(B=s.TEXTURE_3D);const z=te(b,x),k=x.source;e.bindTexture(B,b.__webglTexture,s.TEXTURE0+T);const ct=n.get(k);if(k.version!==ct.__version||z===!0){e.activeTexture(s.TEXTURE0+T);const ot=ne.getPrimaries(ne.workingColorSpace),ht=x.colorSpace===Ln?null:ne.getPrimaries(x.colorSpace),Nt=x.colorSpace===Ln||ot===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let at=_(x.image,!1,i.maxTextureSize);at=ie(x,at);const pt=r.convert(x.format,x.colorSpace),At=r.convert(x.type);let It=w(x.internalFormat,pt,At,x.colorSpace,x.isVideoTexture);Gt(B,x);let St;const Yt=x.mipmaps,Bt=x.isVideoTexture!==!0,ce=ct.__version===void 0||z===!0,N=k.dataReady,mt=P(x,at);if(x.isDepthTexture)It=y(x.format===Ii,x.type),ce&&(Bt?e.texStorage2D(s.TEXTURE_2D,1,It,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,It,at.width,at.height,0,pt,At,null));else if(x.isDataTexture)if(Yt.length>0){Bt&&ce&&e.texStorage2D(s.TEXTURE_2D,mt,It,Yt[0].width,Yt[0].height);for(let Y=0,nt=Yt.length;Y<nt;Y++)St=Yt[Y],Bt?N&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,St.width,St.height,pt,At,St.data):e.texImage2D(s.TEXTURE_2D,Y,It,St.width,St.height,0,pt,At,St.data);x.generateMipmaps=!1}else Bt?(ce&&e.texStorage2D(s.TEXTURE_2D,mt,It,at.width,at.height),N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,at.width,at.height,pt,At,at.data)):e.texImage2D(s.TEXTURE_2D,0,It,at.width,at.height,0,pt,At,at.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Bt&&ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,mt,It,Yt[0].width,Yt[0].height,at.depth);for(let Y=0,nt=Yt.length;Y<nt;Y++)if(St=Yt[Y],x.format!==tn)if(pt!==null)if(Bt){if(N)if(x.layerUpdates.size>0){const gt=Va(St.width,St.height,x.format,x.type);for(const vt of x.layerUpdates){const zt=St.data.subarray(vt*gt/St.data.BYTES_PER_ELEMENT,(vt+1)*gt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,vt,St.width,St.height,1,pt,zt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,St.width,St.height,at.depth,pt,St.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,It,St.width,St.height,at.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,St.width,St.height,at.depth,pt,At,St.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Y,It,St.width,St.height,at.depth,0,pt,At,St.data)}else{Bt&&ce&&e.texStorage2D(s.TEXTURE_2D,mt,It,Yt[0].width,Yt[0].height);for(let Y=0,nt=Yt.length;Y<nt;Y++)St=Yt[Y],x.format!==tn?pt!==null?Bt?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,St.width,St.height,pt,St.data):e.compressedTexImage2D(s.TEXTURE_2D,Y,It,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?N&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,St.width,St.height,pt,At,St.data):e.texImage2D(s.TEXTURE_2D,Y,It,St.width,St.height,0,pt,At,St.data)}else if(x.isDataArrayTexture)if(Bt){if(ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,mt,It,at.width,at.height,at.depth),N)if(x.layerUpdates.size>0){const Y=Va(at.width,at.height,x.format,x.type);for(const nt of x.layerUpdates){const gt=at.data.subarray(nt*Y/at.data.BYTES_PER_ELEMENT,(nt+1)*Y/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,nt,at.width,at.height,1,pt,At,gt)}x.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,pt,At,at.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,It,at.width,at.height,at.depth,0,pt,At,at.data);else if(x.isData3DTexture)Bt?(ce&&e.texStorage3D(s.TEXTURE_3D,mt,It,at.width,at.height,at.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,pt,At,at.data)):e.texImage3D(s.TEXTURE_3D,0,It,at.width,at.height,at.depth,0,pt,At,at.data);else if(x.isFramebufferTexture){if(ce)if(Bt)e.texStorage2D(s.TEXTURE_2D,mt,It,at.width,at.height);else{let Y=at.width,nt=at.height;for(let gt=0;gt<mt;gt++)e.texImage2D(s.TEXTURE_2D,gt,It,Y,nt,0,pt,At,null),Y>>=1,nt>>=1}}else if(Yt.length>0){if(Bt&&ce){const Y=Tt(Yt[0]);e.texStorage2D(s.TEXTURE_2D,mt,It,Y.width,Y.height)}for(let Y=0,nt=Yt.length;Y<nt;Y++)St=Yt[Y],Bt?N&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,pt,At,St):e.texImage2D(s.TEXTURE_2D,Y,It,pt,At,St);x.generateMipmaps=!1}else if(Bt){if(ce){const Y=Tt(at);e.texStorage2D(s.TEXTURE_2D,mt,It,Y.width,Y.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,pt,At,at)}else e.texImage2D(s.TEXTURE_2D,0,It,pt,At,at);m(x)&&h(B),ct.__version=k.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function ut(b,x,T){if(x.image.length!==6)return;const B=te(b,x),z=x.source;e.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+T);const k=n.get(z);if(z.version!==k.__version||B===!0){e.activeTexture(s.TEXTURE0+T);const ct=ne.getPrimaries(ne.workingColorSpace),ot=x.colorSpace===Ln?null:ne.getPrimaries(x.colorSpace),ht=x.colorSpace===Ln||ct===ot?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Nt=x.isCompressedTexture||x.image[0].isCompressedTexture,at=x.image[0]&&x.image[0].isDataTexture,pt=[];for(let nt=0;nt<6;nt++)!Nt&&!at?pt[nt]=_(x.image[nt],!0,i.maxCubemapSize):pt[nt]=at?x.image[nt].image:x.image[nt],pt[nt]=ie(x,pt[nt]);const At=pt[0],It=r.convert(x.format,x.colorSpace),St=r.convert(x.type),Yt=w(x.internalFormat,It,St,x.colorSpace),Bt=x.isVideoTexture!==!0,ce=k.__version===void 0||B===!0,N=z.dataReady;let mt=P(x,At);Gt(s.TEXTURE_CUBE_MAP,x);let Y;if(Nt){Bt&&ce&&e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Yt,At.width,At.height);for(let nt=0;nt<6;nt++){Y=pt[nt].mipmaps;for(let gt=0;gt<Y.length;gt++){const vt=Y[gt];x.format!==tn?It!==null?Bt?N&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,0,0,vt.width,vt.height,It,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,Yt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,0,0,vt.width,vt.height,It,St,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt,Yt,vt.width,vt.height,0,It,St,vt.data)}}}else{if(Y=x.mipmaps,Bt&&ce){Y.length>0&&mt++;const nt=Tt(pt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,Yt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(at){Bt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,pt[nt].width,pt[nt].height,It,St,pt[nt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Yt,pt[nt].width,pt[nt].height,0,It,St,pt[nt].data);for(let gt=0;gt<Y.length;gt++){const zt=Y[gt].image[nt].image;Bt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,0,0,zt.width,zt.height,It,St,zt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,Yt,zt.width,zt.height,0,It,St,zt.data)}}else{Bt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,It,St,pt[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Yt,It,St,pt[nt]);for(let gt=0;gt<Y.length;gt++){const vt=Y[gt];Bt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,0,0,It,St,vt.image[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,gt+1,Yt,It,St,vt.image[nt])}}}m(x)&&h(s.TEXTURE_CUBE_MAP),k.__version=z.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function wt(b,x,T,B,z,k){const ct=r.convert(T.format,T.colorSpace),ot=r.convert(T.type),ht=w(T.internalFormat,ct,ot,T.colorSpace),Nt=n.get(x),at=n.get(T);if(at.__renderTarget=x,!Nt.__hasExternalTextures){const pt=Math.max(1,x.width>>k),At=Math.max(1,x.height>>k);z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY?e.texImage3D(z,k,ht,pt,At,x.depth,0,ct,ot,null):e.texImage2D(z,k,ht,pt,At,0,ct,ot,null)}e.bindFramebuffer(s.FRAMEBUFFER,b),Ht(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,B,z,at.__webglTexture,0,qt(x)):(z===s.TEXTURE_2D||z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,B,z,at.__webglTexture,k),e.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(b,x,T){if(s.bindRenderbuffer(s.RENDERBUFFER,b),x.depthBuffer){const B=x.depthTexture,z=B&&B.isDepthTexture?B.type:null,k=y(x.stencilBuffer,z),ct=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=qt(x);Ht(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot,k,x.width,x.height):T?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,k,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,k,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ct,s.RENDERBUFFER,b)}else{const B=x.textures;for(let z=0;z<B.length;z++){const k=B[z],ct=r.convert(k.format,k.colorSpace),ot=r.convert(k.type),ht=w(k.internalFormat,ct,ot,k.colorSpace),Nt=qt(x);T&&Ht(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,ht,x.width,x.height):Ht(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Nt,ht,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,ht,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Lt(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=n.get(x.depthTexture);B.__renderTarget=x,(!B.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),et(x.depthTexture,0);const z=B.__webglTexture,k=qt(x);if(x.depthTexture.format===bi)Ht(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,z,0,k):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,z,0);else if(x.depthTexture.format===Ii)Ht(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,z,0,k):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,z,0);else throw new Error("Unknown depthTexture format")}function Dt(b){const x=n.get(b),T=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const B=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),B){const z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,B.removeEventListener("dispose",z)};B.addEventListener("dispose",z),x.__depthDisposeCallback=z}x.__boundDepthTexture=B}if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(T)throw new Error("target.depthTexture not supported in Cube render targets");Lt(x.__webglFramebuffer,b)}else if(T){x.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[B]),x.__webglDepthbuffer[B]===void 0)x.__webglDepthbuffer[B]=s.createRenderbuffer(),dt(x.__webglDepthbuffer[B],b,!1);else{const z=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,k=x.__webglDepthbuffer[B];s.bindRenderbuffer(s.RENDERBUFFER,k),s.framebufferRenderbuffer(s.FRAMEBUFFER,z,s.RENDERBUFFER,k)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),dt(x.__webglDepthbuffer,b,!1);else{const B=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,z=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,z),s.framebufferRenderbuffer(s.FRAMEBUFFER,B,s.RENDERBUFFER,z)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Wt(b,x,T){const B=n.get(b);x!==void 0&&wt(B.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),T!==void 0&&Dt(b)}function re(b){const x=b.texture,T=n.get(b),B=n.get(x);b.addEventListener("dispose",A);const z=b.textures,k=b.isWebGLCubeRenderTarget===!0,ct=z.length>1;if(ct||(B.__webglTexture===void 0&&(B.__webglTexture=s.createTexture()),B.__version=x.version,o.memory.textures++),k){T.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(x.mipmaps&&x.mipmaps.length>0){T.__webglFramebuffer[ot]=[];for(let ht=0;ht<x.mipmaps.length;ht++)T.__webglFramebuffer[ot][ht]=s.createFramebuffer()}else T.__webglFramebuffer[ot]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){T.__webglFramebuffer=[];for(let ot=0;ot<x.mipmaps.length;ot++)T.__webglFramebuffer[ot]=s.createFramebuffer()}else T.__webglFramebuffer=s.createFramebuffer();if(ct)for(let ot=0,ht=z.length;ot<ht;ot++){const Nt=n.get(z[ot]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=s.createTexture(),o.memory.textures++)}if(b.samples>0&&Ht(b)===!1){T.__webglMultisampledFramebuffer=s.createFramebuffer(),T.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let ot=0;ot<z.length;ot++){const ht=z[ot];T.__webglColorRenderbuffer[ot]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,T.__webglColorRenderbuffer[ot]);const Nt=r.convert(ht.format,ht.colorSpace),at=r.convert(ht.type),pt=w(ht.internalFormat,Nt,at,ht.colorSpace,b.isXRRenderTarget===!0),At=qt(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,At,pt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,T.__webglColorRenderbuffer[ot])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(T.__webglDepthRenderbuffer=s.createRenderbuffer(),dt(T.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(k){e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture),Gt(s.TEXTURE_CUBE_MAP,x);for(let ot=0;ot<6;ot++)if(x.mipmaps&&x.mipmaps.length>0)for(let ht=0;ht<x.mipmaps.length;ht++)wt(T.__webglFramebuffer[ot][ht],b,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ht);else wt(T.__webglFramebuffer[ot],b,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(x)&&h(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let ot=0,ht=z.length;ot<ht;ot++){const Nt=z[ot],at=n.get(Nt);e.bindTexture(s.TEXTURE_2D,at.__webglTexture),Gt(s.TEXTURE_2D,Nt),wt(T.__webglFramebuffer,b,Nt,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,0),m(Nt)&&h(s.TEXTURE_2D)}e.unbindTexture()}else{let ot=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ot=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ot,B.__webglTexture),Gt(ot,x),x.mipmaps&&x.mipmaps.length>0)for(let ht=0;ht<x.mipmaps.length;ht++)wt(T.__webglFramebuffer[ht],b,x,s.COLOR_ATTACHMENT0,ot,ht);else wt(T.__webglFramebuffer,b,x,s.COLOR_ATTACHMENT0,ot,0);m(x)&&h(ot),e.unbindTexture()}b.depthBuffer&&Dt(b)}function Ut(b){const x=b.textures;for(let T=0,B=x.length;T<B;T++){const z=x[T];if(m(z)){const k=E(b),ct=n.get(z).__webglTexture;e.bindTexture(k,ct),h(k),e.unbindTexture()}}}const fe=[],D=[];function be(b){if(b.samples>0){if(Ht(b)===!1){const x=b.textures,T=b.width,B=b.height;let z=s.COLOR_BUFFER_BIT;const k=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ct=n.get(b),ot=x.length>1;if(ot)for(let ht=0;ht<x.length;ht++)e.bindFramebuffer(s.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ht=0;ht<x.length;ht++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(z|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(z|=s.STENCIL_BUFFER_BIT)),ot){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ct.__webglColorRenderbuffer[ht]);const Nt=n.get(x[ht]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Nt,0)}s.blitFramebuffer(0,0,T,B,0,0,T,B,z,s.NEAREST),c===!0&&(fe.length=0,D.length=0,fe.push(s.COLOR_ATTACHMENT0+ht),b.depthBuffer&&b.resolveDepthBuffer===!1&&(fe.push(k),D.push(k),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ot)for(let ht=0;ht<x.length;ht++){e.bindFramebuffer(s.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,ct.__webglColorRenderbuffer[ht]);const Nt=n.get(x[ht]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,Nt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const x=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function qt(b){return Math.min(i.maxSamples,b.samples)}function Ht(b){const x=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Rt(b){const x=o.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function ie(b,x){const T=b.colorSpace,B=b.format,z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||T!==Di&&T!==Ln&&(ne.getTransfer(T)===he?(B!==tn||z!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",T)),x}function Tt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=H,this.setTexture2D=et,this.setTexture2DArray=Z,this.setTexture3D=rt,this.setTextureCube=$,this.rebindTextures=Wt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=Ht}function hm(s,t){function e(n,i=Ln){let r;const o=ne.getTransfer(i);if(n===yn)return s.UNSIGNED_BYTE;if(n===Ho)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ec)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===yc)return s.BYTE;if(n===wc)return s.SHORT;if(n===ss)return s.UNSIGNED_SHORT;if(n===Go)return s.INT;if(n===ti)return s.UNSIGNED_INT;if(n===hn)return s.FLOAT;if(n===os)return s.HALF_FLOAT;if(n===bc)return s.ALPHA;if(n===Tc)return s.RGB;if(n===tn)return s.RGBA;if(n===Ac)return s.LUMINANCE;if(n===Rc)return s.LUMINANCE_ALPHA;if(n===bi)return s.DEPTH_COMPONENT;if(n===Ii)return s.DEPTH_STENCIL;if(n===Wo)return s.RED;if(n===Xo)return s.RED_INTEGER;if(n===Cc)return s.RG;if(n===qo)return s.RG_INTEGER;if(n===Yo)return s.RGBA_INTEGER;if(n===Xs||n===qs||n===Ys||n===$s)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===lo||n===ho||n===uo||n===fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===lo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ho)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===po||n===mo)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===go)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_o||n===xo||n===vo||n===Mo||n===So||n===yo||n===wo||n===Eo||n===bo||n===To||n===Ao||n===Ro||n===Co||n===Po)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_o)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Mo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===So)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Eo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===To)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ao)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ro)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Co)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Po)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zs||n===Lo||n===Io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Zs)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Pc||n===Do||n===Uo||n===No)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Do)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Uo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===No)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Li?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const um={type:"move"};class Wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),h=this._getHandJoint(l,_);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(um)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Xt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const dm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fm=`
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

}`;class pm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ie,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Un({vertexShader:dm,fragmentShader:fm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new U(new Ye(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mm extends Ni{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,g=null;const _=new pm,m=e.getContextAttributes();let h=null,E=null;const w=[],y=[],P=new Jt;let R=null;const A=new $e;A.viewport=new ue;const I=new $e;I.viewport=new ue;const M=[A,I],v=new Uh;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let ut=w[tt];return ut===void 0&&(ut=new Wr,w[tt]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(tt){let ut=w[tt];return ut===void 0&&(ut=new Wr,w[tt]=ut),ut.getGripSpace()},this.getHand=function(tt){let ut=w[tt];return ut===void 0&&(ut=new Wr,w[tt]=ut),ut.getHandSpace()};function V(tt){const ut=y.indexOf(tt.inputSource);if(ut===-1)return;const wt=w[ut];wt!==void 0&&(wt.update(tt.inputSource,tt.frame,l||o),wt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function Q(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",Q),i.removeEventListener("inputsourceschange",et);for(let tt=0;tt<w.length;tt++){const ut=y[tt];ut!==null&&(y[tt]=null,w[tt].disconnect(ut))}C=null,H=null,_.reset(),t.setRenderTarget(h),p=null,f=null,d=null,i=null,E=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){a=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(tt){l=tt},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(tt){if(i=tt,i!==null){if(h=t.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",Q),i.addEventListener("inputsourceschange",et),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(P),i.enabledFeatures!==void 0&&i.enabledFeatures.includes("layers")){let wt=null,dt=null,Lt=null;m.depth&&(Lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=m.stencil?Ii:bi,dt=m.stencil?Li:ti);const Dt={colorFormat:e.RGBA8,depthFormat:Lt,scaleFactor:r};d=new XRWebGLBinding(i,e),f=d.createProjectionLayer(Dt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new ei(f.textureWidth,f.textureHeight,{format:tn,type:yn,depthTexture:new Wc(f.textureWidth,f.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const wt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,wt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new ei(p.framebufferWidth,p.framebufferHeight,{format:tn,type:yn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function et(tt){for(let ut=0;ut<tt.removed.length;ut++){const wt=tt.removed[ut],dt=y.indexOf(wt);dt>=0&&(y[dt]=null,w[dt].disconnect(wt))}for(let ut=0;ut<tt.added.length;ut++){const wt=tt.added[ut];let dt=y.indexOf(wt);if(dt===-1){for(let Dt=0;Dt<w.length;Dt++)if(Dt>=y.length){y.push(wt),dt=Dt;break}else if(y[Dt]===null){y[Dt]=wt,dt=Dt;break}if(dt===-1)break}const Lt=w[dt];Lt&&Lt.connect(wt)}}const Z=new L,rt=new L;function $(tt,ut,wt){Z.setFromMatrixPosition(ut.matrixWorld),rt.setFromMatrixPosition(wt.matrixWorld);const dt=Z.distanceTo(rt),Lt=ut.projectionMatrix.elements,Dt=wt.projectionMatrix.elements,Wt=Lt[14]/(Lt[10]-1),re=Lt[14]/(Lt[10]+1),Ut=(Lt[9]+1)/Lt[5],fe=(Lt[9]-1)/Lt[5],D=(Lt[8]-1)/Lt[0],be=(Dt[8]+1)/Dt[0],qt=Wt*D,Ht=Wt*be,Rt=dt/(-D+be),ie=Rt*-D;if(ut.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(ie),tt.translateZ(Rt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),Lt[10]===-1)tt.projectionMatrix.copy(ut.projectionMatrix),tt.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Tt=Wt+Rt,b=re+Rt,x=qt-ie,T=Ht+(dt-ie),B=Ut*re/b*Tt,z=fe*re/b*Tt;tt.projectionMatrix.makePerspective(x,T,B,z,Tt,b),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function ft(tt,ut){ut===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(ut.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(i===null)return;let ut=tt.near,wt=tt.far;_.texture!==null&&(_.depthNear>0&&(ut=_.depthNear),_.depthFar>0&&(wt=_.depthFar)),v.near=I.near=A.near=ut,v.far=I.far=A.far=wt,(C!==v.near||H!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),C=v.near,H=v.far),A.layers.mask=tt.layers.mask|2,I.layers.mask=tt.layers.mask|4,v.layers.mask=A.layers.mask|I.layers.mask;const dt=tt.parent,Lt=v.cameras;ft(v,dt);for(let Dt=0;Dt<Lt.length;Dt++)ft(Lt[Dt],dt);Lt.length===2?$(v,A,I):v.projectionMatrix.copy(A.projectionMatrix),xt(tt,v,dt)};function xt(tt,ut,wt){wt===null?tt.matrix.copy(ut.matrixWorld):(tt.matrix.copy(wt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(ut.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(ut.projectionMatrix),tt.projectionMatrixInverse.copy(ut.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Fo*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(tt){c=tt,f!==null&&(f.fixedFoveation=tt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=tt)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let bt=null;function Gt(tt,ut){if(u=ut.getViewerPose(l||o),g=ut,u!==null){const wt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let dt=!1;wt.length!==v.cameras.length&&(v.cameras.length=0,dt=!0);for(let Dt=0;Dt<wt.length;Dt++){const Wt=wt[Dt];let re=null;if(p!==null)re=p.getViewport(Wt);else{const fe=d.getViewSubImage(f,Wt);re=fe.viewport,Dt===0&&(t.setRenderTargetTextures(E,fe.colorTexture,f.ignoreDepthValues?void 0:fe.depthStencilTexture),t.setRenderTarget(E))}let Ut=M[Dt];Ut===void 0&&(Ut=new $e,Ut.layers.enable(Dt),Ut.viewport=new ue,M[Dt]=Ut),Ut.matrix.fromArray(Wt.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(Wt.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(re.x,re.y,re.width,re.height),Dt===0&&(v.matrix.copy(Ut.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),dt===!0&&v.cameras.push(Ut)}const Lt=i.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){const Dt=d.getDepthInformation(wt[0]);Dt&&Dt.isValid&&Dt.texture&&_.init(t,Dt,i.renderState)}}for(let wt=0;wt<w.length;wt++){const dt=y[wt],Lt=w[wt];dt!==null&&Lt!==void 0&&Lt.update(dt,ut,l||o)}bt&&bt(tt,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),g=null}const te=new Yc;te.setAnimationLoop(Gt),this.setAnimationLoop=function(tt){bt=tt},this.dispose=function(){}}}const Xn=new un,gm=new ae;function _m(s,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,zc(s)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function i(m,h,E,w,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(m,h):h.isMeshToonMaterial?(r(m,h),d(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h)):h.isMeshStandardMaterial?(r(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,y)):h.isMeshMatcapMaterial?(r(m,h),g(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),_(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?c(m,h,E,w):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Ve&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Ve&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const E=t.get(h),w=E.envMap,y=E.envMapRotation;w&&(m.envMap.value=w,Xn.copy(y),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),m.envMapRotation.value.setFromMatrix4(gm.makeRotationFromEuler(Xn)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,E,w){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*E,m.scale.value=w*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,E){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ve&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function _(m,h){const E=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function xm(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){const y=w.program;n.uniformBlockBinding(E,y)}function l(E,w){let y=i[E.id];y===void 0&&(g(E),y=u(E),i[E.id]=y,E.addEventListener("dispose",m));const P=w.program;n.updateUBOMapping(E,P);const R=t.render.frame;r[E.id]!==R&&(f(E),r[E.id]=R)}function u(E){const w=d();E.__bindingPointIndex=w;const y=s.createBuffer(),P=E.__size,R=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,P,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,y),y}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const w=i[E.id],y=E.uniforms,P=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let R=0,A=y.length;R<A;R++){const I=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,v=I.length;M<v;M++){const C=I[M];if(p(C,R,M,P)===!0){const H=C.__offset,V=Array.isArray(C.value)?C.value:[C.value];let Q=0;for(let et=0;et<V.length;et++){const Z=V[et],rt=_(Z);typeof Z=="number"||typeof Z=="boolean"?(C.__data[0]=Z,s.bufferSubData(s.UNIFORM_BUFFER,H+Q,C.__data)):Z.isMatrix3?(C.__data[0]=Z.elements[0],C.__data[1]=Z.elements[1],C.__data[2]=Z.elements[2],C.__data[3]=0,C.__data[4]=Z.elements[3],C.__data[5]=Z.elements[4],C.__data[6]=Z.elements[5],C.__data[7]=0,C.__data[8]=Z.elements[6],C.__data[9]=Z.elements[7],C.__data[10]=Z.elements[8],C.__data[11]=0):(Z.toArray(C.__data,Q),Q+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(E,w,y,P){const R=E.value,A=w+"_"+y;if(P[A]===void 0)return typeof R=="number"||typeof R=="boolean"?P[A]=R:P[A]=R.clone(),!0;{const I=P[A];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return P[A]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(E){const w=E.uniforms;let y=0;const P=16;for(let A=0,I=w.length;A<I;A++){const M=Array.isArray(w[A])?w[A]:[w[A]];for(let v=0,C=M.length;v<C;v++){const H=M[v],V=Array.isArray(H.value)?H.value:[H.value];for(let Q=0,et=V.length;Q<et;Q++){const Z=V[Q],rt=_(Z),$=y%P,ft=$%rt.boundary,xt=$+ft;y+=ft,xt!==0&&P-xt<rt.storage&&(y+=P-xt),H.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=rt.storage}}}const R=y%P;return R>0&&(y+=P-R),E.__size=y,E.__cache={},this}function _(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function m(E){const w=E.target;w.removeEventListener("dispose",m);const y=o.indexOf(w.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function h(){for(const E in i)s.deleteBuffer(i[E]);o=[],i={},r={}}return{bind:c,update:l,dispose:h}}class vm{constructor(t={}){const{canvas:e=Wl(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,h=null;const E=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this.toneMapping=Dn,this.toneMappingExposure=1;const y=this;let P=!1,R=0,A=0,I=null,M=-1,v=null;const C=new ue,H=new ue;let V=null;const Q=new Et(0);let et=0,Z=e.width,rt=e.height,$=1,ft=null,xt=null;const bt=new ue(0,0,Z,rt),Gt=new ue(0,0,Z,rt);let te=!1;const tt=new jo;let ut=!1,wt=!1;this.transmissionResolutionScale=1;const dt=new ae,Lt=new ae,Dt=new L,Wt=new ue,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ut=!1;function fe(){return I===null?$:1}let D=n;function be(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ko}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),D===null){const F="webgl2";if(D=be(F,S),D===null)throw be(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let qt,Ht,Rt,ie,Tt,b,x,T,B,z,k,ct,ot,ht,Nt,at,pt,At,It,St,Yt,Bt,ce,N;function mt(){qt=new Rf(D),qt.init(),Bt=new hm(D,qt),Ht=new yf(D,qt,t,Bt),Rt=new cm(D,qt),Ht.reverseDepthBuffer&&f&&Rt.buffers.depth.setReversed(!0),ie=new Lf(D),Tt=new Zp,b=new lm(D,qt,Rt,Tt,Ht,Bt,ie),x=new Ef(y),T=new Af(y),B=new Oh(D),ce=new Mf(D,B),z=new Cf(D,B,ie,ce),k=new Df(D,z,B,ie),It=new If(D,Ht,b),at=new wf(Tt),ct=new $p(y,x,T,qt,Ht,ce,at),ot=new _m(y,Tt),ht=new jp,Nt=new im(qt),At=new vf(y,x,T,Rt,k,p,c),pt=new om(y,k,Ht),N=new xm(D,ie,Ht,Rt),St=new Sf(D,qt,ie),Yt=new Pf(D,qt,ie),ie.programs=ct.programs,y.capabilities=Ht,y.extensions=qt,y.properties=Tt,y.renderLists=ht,y.shadowMap=pt,y.state=Rt,y.info=ie}mt();const Y=new mm(y,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=qt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=qt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(Z,rt,!1))},this.getSize=function(S){return S.set(Z,rt)},this.setSize=function(S,F,G=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,rt=F,e.width=Math.floor(S*$),e.height=Math.floor(F*$),G===!0&&(e.style.width=S+"px",e.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(Z*$,rt*$).floor()},this.setDrawingBufferSize=function(S,F,G){Z=S,rt=F,$=G,e.width=Math.floor(S*G),e.height=Math.floor(F*G),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(C)},this.getViewport=function(S){return S.copy(bt)},this.setViewport=function(S,F,G,W){S.isVector4?bt.set(S.x,S.y,S.z,S.w):bt.set(S,F,G,W),Rt.viewport(C.copy(bt).multiplyScalar($).round())},this.getScissor=function(S){return S.copy(Gt)},this.setScissor=function(S,F,G,W){S.isVector4?Gt.set(S.x,S.y,S.z,S.w):Gt.set(S,F,G,W),Rt.scissor(H.copy(Gt).multiplyScalar($).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(S){Rt.setScissorTest(te=S)},this.setOpaqueSort=function(S){ft=S},this.setTransparentSort=function(S){xt=S},this.getClearColor=function(S){return S.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(S=!0,F=!0,G=!0){let W=0;if(S){let O=!1;if(I!==null){const lt=I.texture.format;O=lt===Yo||lt===qo||lt===Xo}if(O){const lt=I.texture.type,Mt=lt===yn||lt===ti||lt===ss||lt===Li||lt===Ho||lt===Vo,j=At.getClearColor(),J=At.getClearAlpha(),it=j.r,K=j.g,st=j.b;Mt?(g[0]=it,g[1]=K,g[2]=st,g[3]=J,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=it,_[1]=K,_[2]=st,_[3]=J,D.clearBufferiv(D.COLOR,0,_))}else W|=D.COLOR_BUFFER_BIT}F&&(W|=D.DEPTH_BUFFER_BIT),G&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),At.dispose(),ht.dispose(),Nt.dispose(),Tt.dispose(),x.dispose(),T.dispose(),k.dispose(),ce.dispose(),N.dispose(),ct.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",zi),Y.removeEventListener("sessionend",Fn),an.stop()};function nt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const S=ie.autoReset,F=pt.enabled,G=pt.autoUpdate,W=pt.needsUpdate,O=pt.type;mt(),ie.autoReset=S,pt.enabled=F,pt.autoUpdate=G,pt.needsUpdate=W,pt.type=O}function vt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function zt(S){const F=S.target;F.removeEventListener("dispose",zt),le(F)}function le(S){xe(S),Tt.remove(S)}function xe(S){const F=Tt.get(S).programs;F!==void 0&&(F.forEach(function(G){ct.releaseProgram(G)}),S.isShaderMaterial&&ct.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,G,W,O,lt){F===null&&(F=re);const Mt=O.isMesh&&O.matrixWorld.determinant()<0,j=Gi(S,F,G,W,O);Rt.setMaterial(W,Mt);let J=G.index,it=1;if(W.wireframe===!0){if(J=z.getWireframeAttribute(G),J===void 0)return;it=2}const K=G.drawRange,st=G.attributes.position;let yt=K.start*it,Pt=(K.start+K.count)*it;lt!==null&&(yt=Math.max(yt,lt.start*it),Pt=Math.min(Pt,(lt.start+lt.count)*it)),J!==null?(yt=Math.max(yt,0),Pt=Math.min(Pt,J.count)):st!=null&&(yt=Math.max(yt,0),Pt=Math.min(Pt,st.count));const Vt=Pt-yt;if(Vt<0||Vt===1/0)return;ce.setup(O,W,j,G,J);let Ft,Ot=St;if(J!==null&&(Ft=B.get(J),Ot=Yt,Ot.setIndex(Ft)),O.isMesh)W.wireframe===!0?(Rt.setLineWidth(W.wireframeLinewidth*fe()),Ot.setMode(D.LINES)):Ot.setMode(D.TRIANGLES);else if(O.isLine){let Ct=W.linewidth;Ct===void 0&&(Ct=1),Rt.setLineWidth(Ct*fe()),O.isLineSegments?Ot.setMode(D.LINES):O.isLineLoop?Ot.setMode(D.LINE_LOOP):Ot.setMode(D.LINE_STRIP)}else O.isPoints?Ot.setMode(D.POINTS):O.isSprite&&Ot.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Ot.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(qt.get("WEBGL_multi_draw"))Ot.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ct=O._multiDrawStarts,de=O._multiDrawCounts,kt=O._multiDrawCount,De=J?B.get(J).bytesPerElement:1,Te=Tt.get(W).currentProgram.getUniforms();for(let se=0;se<kt;se++)Te.setValue(D,"_gl_DrawID",se),Ot.render(Ct[se]/De,de[se])}else if(O.isInstancedMesh)Ot.renderInstances(yt,Vt,O.count);else if(G.isInstancedBufferGeometry){const Ct=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,de=Math.min(G.instanceCount,Ct);Ot.renderInstances(yt,Vt,de)}else Ot.render(yt,Vt)};function ee(S,F,G){S.transparent===!0&&S.side===Je&&S.forceSinglePass===!1?(S.side=Ve,S.needsUpdate=!0,Bn(S,F,G),S.side=Mn,S.needsUpdate=!0,Bn(S,F,G),S.side=Je):Bn(S,F,G)}this.compile=function(S,F,G=null){G===null&&(G=S),h=Nt.get(G),h.init(F),w.push(h),G.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),S!==G&&S.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),h.setupLights();const W=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const lt=O.material;if(lt)if(Array.isArray(lt))for(let Mt=0;Mt<lt.length;Mt++){const j=lt[Mt];ee(j,G,O),W.add(j)}else ee(lt,G,O),W.add(lt)}),w.pop(),h=null,W},this.compileAsync=function(S,F,G=null){const W=this.compile(S,F,G);return new Promise(O=>{function lt(){if(W.forEach(function(Mt){Tt.get(Mt).currentProgram.isReady()&&W.delete(Mt)}),W.size===0){O(S);return}setTimeout(lt,10)}qt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let Be=null;function Ke(S){Be&&Be(S)}function zi(){an.stop()}function Fn(){an.start()}const an=new Yc;an.setAnimationLoop(Ke),typeof self<"u"&&an.setContext(self),this.setAnimationLoop=function(S){Be=S,Y.setAnimationLoop(S),S===null?an.stop():an.start()},Y.addEventListener("sessionstart",zi),Y.addEventListener("sessionend",Fn),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,F,I),h=Nt.get(S,w.length),h.init(F),w.push(h),Lt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),tt.setFromProjectionMatrix(Lt),wt=this.localClippingEnabled,ut=at.init(this.clippingPlanes,wt),m=ht.get(S,E.length),m.init(),E.push(m),Y.enabled===!0&&Y.isPresenting===!0){const lt=y.xr.getDepthSensingMesh();lt!==null&&ze(lt,F,-1/0,y.sortObjects)}ze(S,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ft,xt),Ut=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Ut&&At.addToRenderList(m,S),this.info.render.frame++,ut===!0&&at.beginShadows();const G=h.state.shadowsArray;pt.render(G,S,F),ut===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,O=m.transmissive;if(h.setupLights(),F.isArrayCamera){const lt=F.cameras;if(O.length>0)for(let Mt=0,j=lt.length;Mt<j;Mt++){const J=lt[Mt];us(W,O,S,J)}Ut&&At.render(S);for(let Mt=0,j=lt.length;Mt<j;Mt++){const J=lt[Mt];On(m,S,J,J.viewport)}}else O.length>0&&us(W,O,S,F),Ut&&At.render(S),On(m,S,F);I!==null&&A===0&&(b.updateMultisampleRenderTarget(I),b.updateRenderTargetMipmap(I)),S.isScene===!0&&S.onAfterRender(y,S,F),ce.resetDefaultState(),M=-1,v=null,w.pop(),w.length>0?(h=w[w.length-1],ut===!0&&at.setGlobalState(y.clippingPlanes,h.state.camera)):h=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function ze(S,F,G,W){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)h.pushLight(S),S.castShadow&&h.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||tt.intersectsSprite(S)){W&&Wt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Lt);const Mt=k.update(S),j=S.material;j.visible&&m.push(S,Mt,j,G,Wt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||tt.intersectsObject(S))){const Mt=k.update(S),j=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Wt.copy(S.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Wt.copy(Mt.boundingSphere.center)),Wt.applyMatrix4(S.matrixWorld).applyMatrix4(Lt)),Array.isArray(j)){const J=Mt.groups;for(let it=0,K=J.length;it<K;it++){const st=J[it],yt=j[st.materialIndex];yt&&yt.visible&&m.push(S,Mt,yt,G,Wt.z,st)}}else j.visible&&m.push(S,Mt,j,G,Wt.z,null)}}const lt=S.children;for(let Mt=0,j=lt.length;Mt<j;Mt++)ze(lt[Mt],F,G,W)}function On(S,F,G,W){const O=S.opaque,lt=S.transmissive,Mt=S.transparent;h.setupLightsView(G),ut===!0&&at.setGlobalState(y.clippingPlanes,G),W&&Rt.viewport(C.copy(W)),O.length>0&&En(O,F,G),lt.length>0&&En(lt,F,G),Mt.length>0&&En(Mt,F,G),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function us(S,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[W.id]===void 0&&(h.state.transmissionRenderTarget[W.id]=new ei(1,1,{generateMipmaps:!0,type:qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float")?os:yn,minFilter:Jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const lt=h.state.transmissionRenderTarget[W.id],Mt=W.viewport||C;lt.setSize(Mt.z*y.transmissionResolutionScale,Mt.w*y.transmissionResolutionScale);const j=y.getRenderTarget();y.setRenderTarget(lt),y.getClearColor(Q),et=y.getClearAlpha(),et<1&&y.setClearColor(16777215,.5),y.clear(),Ut&&At.render(G);const J=y.toneMapping;y.toneMapping=Dn;const it=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),h.setupLightsView(W),ut===!0&&at.setGlobalState(y.clippingPlanes,W),En(S,G,W),b.updateMultisampleRenderTarget(lt),b.updateRenderTargetMipmap(lt),qt.has("WEBGL_multisampled_render_to_texture")===!1){let K=!1;for(let st=0,yt=F.length;st<yt;st++){const Pt=F[st],Vt=Pt.object,Ft=Pt.geometry,Ot=Pt.material,Ct=Pt.group;if(Ot.side===Je&&Vt.layers.test(W.layers)){const de=Ot.side;Ot.side=Ve,Ot.needsUpdate=!0,ri(Vt,G,W,Ft,Ot,Ct),Ot.side=de,Ot.needsUpdate=!0,K=!0}}K===!0&&(b.updateMultisampleRenderTarget(lt),b.updateRenderTargetMipmap(lt))}y.setRenderTarget(j),y.setClearColor(Q,et),it!==void 0&&(W.viewport=it),y.toneMapping=J}function En(S,F,G){const W=F.isScene===!0?F.overrideMaterial:null;for(let O=0,lt=S.length;O<lt;O++){const Mt=S[O],j=Mt.object,J=Mt.geometry,it=W===null?Mt.material:W,K=Mt.group;j.layers.test(G.layers)&&ri(j,F,G,J,it,K)}}function ri(S,F,G,W,O,lt){S.onBeforeRender(y,F,G,W,O,lt),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(y,F,G,W,S,lt),O.transparent===!0&&O.side===Je&&O.forceSinglePass===!1?(O.side=Ve,O.needsUpdate=!0,y.renderBufferDirect(G,F,W,O,S,lt),O.side=Mn,O.needsUpdate=!0,y.renderBufferDirect(G,F,W,O,S,lt),O.side=Je):y.renderBufferDirect(G,F,W,O,S,lt),S.onAfterRender(y,F,G,W,O,lt)}function Bn(S,F,G){F.isScene!==!0&&(F=re);const W=Tt.get(S),O=h.state.lights,lt=h.state.shadowsArray,Mt=O.state.version,j=ct.getParameters(S,O.state,lt,F,G),J=ct.getProgramCacheKey(j);let it=W.programs;W.environment=S.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(S.isMeshStandardMaterial?T:x).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,it===void 0&&(S.addEventListener("dispose",zt),it=new Map,W.programs=it);let K=it.get(J);if(K!==void 0){if(W.currentProgram===K&&W.lightsStateVersion===Mt)return ki(S,j),K}else j.uniforms=ct.getUniforms(S),S.onBeforeCompile(j,y),K=ct.acquireProgram(j,J),it.set(J,K),W.uniforms=j.uniforms;const st=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(st.clippingPlanes=at.uniform),ki(S,j),W.needsLights=ds(S),W.lightsStateVersion=Mt,W.needsLights&&(st.ambientLightColor.value=O.state.ambient,st.lightProbe.value=O.state.probe,st.directionalLights.value=O.state.directional,st.directionalLightShadows.value=O.state.directionalShadow,st.spotLights.value=O.state.spot,st.spotLightShadows.value=O.state.spotShadow,st.rectAreaLights.value=O.state.rectArea,st.ltc_1.value=O.state.rectAreaLTC1,st.ltc_2.value=O.state.rectAreaLTC2,st.pointLights.value=O.state.point,st.pointLightShadows.value=O.state.pointShadow,st.hemisphereLights.value=O.state.hemi,st.directionalShadowMap.value=O.state.directionalShadowMap,st.directionalShadowMatrix.value=O.state.directionalShadowMatrix,st.spotShadowMap.value=O.state.spotShadowMap,st.spotLightMatrix.value=O.state.spotLightMatrix,st.spotLightMap.value=O.state.spotLightMap,st.pointShadowMap.value=O.state.pointShadowMap,st.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=K,W.uniformsList=null,K}function oi(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=js.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ki(S,F){const G=Tt.get(S);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Gi(S,F,G,W,O){F.isScene!==!0&&(F=re),b.resetTextureUnits();const lt=F.fog,Mt=W.isMeshStandardMaterial?F.environment:null,j=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Di,J=(W.isMeshStandardMaterial?T:x).get(W.envMap||Mt),it=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,K=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),st=!!G.morphAttributes.position,yt=!!G.morphAttributes.normal,Pt=!!G.morphAttributes.color;let Vt=Dn;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Vt=y.toneMapping);const Ft=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ot=Ft!==void 0?Ft.length:0,Ct=Tt.get(W),de=h.state.lights;if(ut===!0&&(wt===!0||S!==v)){const jt=S===v&&W.id===M;at.setState(W,S,jt)}let kt=!1;W.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==de.state.version||Ct.outputColorSpace!==j||O.isBatchedMesh&&Ct.batching===!1||!O.isBatchedMesh&&Ct.batching===!0||O.isBatchedMesh&&Ct.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ct.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ct.instancing===!1||!O.isInstancedMesh&&Ct.instancing===!0||O.isSkinnedMesh&&Ct.skinning===!1||!O.isSkinnedMesh&&Ct.skinning===!0||O.isInstancedMesh&&Ct.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ct.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ct.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ct.instancingMorph===!1&&O.morphTexture!==null||Ct.envMap!==J||W.fog===!0&&Ct.fog!==lt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==at.numPlanes||Ct.numIntersection!==at.numIntersection)||Ct.vertexAlphas!==it||Ct.vertexTangents!==K||Ct.morphTargets!==st||Ct.morphNormals!==yt||Ct.morphColors!==Pt||Ct.toneMapping!==Vt||Ct.morphTargetsCount!==Ot)&&(kt=!0):(kt=!0,Ct.__version=W.version);let De=Ct.currentProgram;kt===!0&&(De=Bn(W,F,O));let Te=!1,se=!1,Ue=!1;const Kt=De.getUniforms(),Ae=Ct.uniforms;if(Rt.useProgram(De.program)&&(Te=!0,se=!0,Ue=!0),W.id!==M&&(M=W.id,se=!0),Te||v!==S){Rt.buffers.depth.getReversed()?(dt.copy(S.projectionMatrix),ql(dt),Yl(dt),Kt.setValue(D,"projectionMatrix",dt)):Kt.setValue(D,"projectionMatrix",S.projectionMatrix),Kt.setValue(D,"viewMatrix",S.matrixWorldInverse);const me=Kt.map.cameraPosition;me!==void 0&&me.setValue(D,Dt.setFromMatrixPosition(S.matrixWorld)),Ht.logarithmicDepthBuffer&&Kt.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Kt.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,se=!0,Ue=!0)}if(O.isSkinnedMesh){Kt.setOptional(D,O,"bindMatrix"),Kt.setOptional(D,O,"bindMatrixInverse");const jt=O.skeleton;jt&&(jt.boneTexture===null&&jt.computeBoneTexture(),Kt.setValue(D,"boneTexture",jt.boneTexture,b))}O.isBatchedMesh&&(Kt.setOptional(D,O,"batchingTexture"),Kt.setValue(D,"batchingTexture",O._matricesTexture,b),Kt.setOptional(D,O,"batchingIdTexture"),Kt.setValue(D,"batchingIdTexture",O._indirectTexture,b),Kt.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&Kt.setValue(D,"batchingColorTexture",O._colorsTexture,b));const Re=G.morphAttributes;if((Re.position!==void 0||Re.normal!==void 0||Re.color!==void 0)&&It.update(O,G,De),(se||Ct.receiveShadow!==O.receiveShadow)&&(Ct.receiveShadow=O.receiveShadow,Kt.setValue(D,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ae.envMap.value=J,Ae.flipEnvMap.value=J.isCubeTexture&&J.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(Ae.envMapIntensity.value=F.environmentIntensity),se&&(Kt.setValue(D,"toneMappingExposure",y.toneMappingExposure),Ct.needsLights&&Hi(Ae,Ue),lt&&W.fog===!0&&ot.refreshFogUniforms(Ae,lt),ot.refreshMaterialUniforms(Ae,W,$,rt,h.state.transmissionRenderTarget[S.id]),js.upload(D,oi(Ct),Ae,b)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(js.upload(D,oi(Ct),Ae,b),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Kt.setValue(D,"center",O.center),Kt.setValue(D,"modelViewMatrix",O.modelViewMatrix),Kt.setValue(D,"normalMatrix",O.normalMatrix),Kt.setValue(D,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const jt=W.uniformsGroups;for(let me=0,en=jt.length;me<en;me++){const ge=jt[me];N.update(ge,De),N.bind(ge,De)}}return De}function Hi(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function ds(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(S,F,G){Tt.get(S.texture).__webglTexture=F,Tt.get(S.depthTexture).__webglTexture=G;const W=Tt.get(S);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||qt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,F){const G=Tt.get(S);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};const lr=D.createFramebuffer();this.setRenderTarget=function(S,F=0,G=0){I=S,R=F,A=G;let W=!0,O=null,lt=!1,Mt=!1;if(S){const J=Tt.get(S);if(J.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(D.FRAMEBUFFER,null),W=!1;else if(J.__webglFramebuffer===void 0)b.setupRenderTarget(S);else if(J.__hasExternalTextures)b.rebindTextures(S,Tt.get(S.texture).__webglTexture,Tt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const st=S.depthTexture;if(J.__boundDepthTexture!==st){if(st!==null&&Tt.has(st)&&(S.width!==st.image.width||S.height!==st.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(S)}}const it=S.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(Mt=!0);const K=Tt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(K[F])?O=K[F][G]:O=K[F],lt=!0):S.samples>0&&b.useMultisampledRTT(S)===!1?O=Tt.get(S).__webglMultisampledFramebuffer:Array.isArray(K)?O=K[G]:O=K,C.copy(S.viewport),H.copy(S.scissor),V=S.scissorTest}else C.copy(bt).multiplyScalar($).floor(),H.copy(Gt).multiplyScalar($).floor(),V=te;if(G!==0&&(O=lr),Rt.bindFramebuffer(D.FRAMEBUFFER,O)&&W&&Rt.drawBuffers(S,O),Rt.viewport(C),Rt.scissor(H),Rt.setScissorTest(V),lt){const J=Tt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,J.__webglTexture,G)}else if(Mt){const J=Tt.get(S.texture),it=F;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,J.__webglTexture,G,it)}else if(S!==null&&G!==0){const J=Tt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,J.__webglTexture,G)}M=-1},this.readRenderTargetPixels=function(S,F,G,W,O,lt,Mt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let j=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(j=j[Mt]),j){Rt.bindFramebuffer(D.FRAMEBUFFER,j);try{const J=S.texture,it=J.format,K=J.type;if(!Ht.textureFormatReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(K)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-W&&G>=0&&G<=S.height-O&&D.readPixels(F,G,W,O,Bt.convert(it),Bt.convert(K),lt)}finally{const J=I!==null?Tt.get(I).__webglFramebuffer:null;Rt.bindFramebuffer(D.FRAMEBUFFER,J)}}},this.readRenderTargetPixelsAsync=async function(S,F,G,W,O,lt,Mt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let j=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(j=j[Mt]),j){const J=S.texture,it=J.format,K=J.type;if(!Ht.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(K))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=S.width-W&&G>=0&&G<=S.height-O){Rt.bindFramebuffer(D.FRAMEBUFFER,j);const st=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,st),D.bufferData(D.PIXEL_PACK_BUFFER,lt.byteLength,D.STREAM_READ),D.readPixels(F,G,W,O,Bt.convert(it),Bt.convert(K),0);const yt=I!==null?Tt.get(I).__webglFramebuffer:null;Rt.bindFramebuffer(D.FRAMEBUFFER,yt);const Pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Xl(D,Pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,st),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,lt),D.deleteBuffer(st),D.deleteSync(Pt),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,F=null,G=0){S.isTexture!==!0&&(yi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,S=arguments[1]);const W=Math.pow(2,-G),O=Math.floor(S.image.width*W),lt=Math.floor(S.image.height*W),Mt=F!==null?F.x:0,j=F!==null?F.y:0;b.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,G,0,0,Mt,j,O,lt),Rt.unbindTexture()};const Vi=D.createFramebuffer(),fs=D.createFramebuffer();this.copyTextureToTexture=function(S,F,G=null,W=null,O=0,lt=null){S.isTexture!==!0&&(yi("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,S=arguments[1],F=arguments[2],lt=arguments[3]||0,G=null),lt===null&&(O!==0?(yi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=O,O=0):lt=0);let Mt,j,J,it,K,st,yt,Pt,Vt;const Ft=S.isCompressedTexture?S.mipmaps[lt]:S.image;if(G!==null)Mt=G.max.x-G.min.x,j=G.max.y-G.min.y,J=G.isBox3?G.max.z-G.min.z:1,it=G.min.x,K=G.min.y,st=G.isBox3?G.min.z:0;else{const Re=Math.pow(2,-O);Mt=Math.floor(Ft.width*Re),j=Math.floor(Ft.height*Re),S.isDataArrayTexture?J=Ft.depth:S.isData3DTexture?J=Math.floor(Ft.depth*Re):J=1,it=0,K=0,st=0}W!==null?(yt=W.x,Pt=W.y,Vt=W.z):(yt=0,Pt=0,Vt=0);const Ot=Bt.convert(F.format),Ct=Bt.convert(F.type);let de;F.isData3DTexture?(b.setTexture3D(F,0),de=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(b.setTexture2DArray(F,0),de=D.TEXTURE_2D_ARRAY):(b.setTexture2D(F,0),de=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const kt=D.getParameter(D.UNPACK_ROW_LENGTH),De=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Te=D.getParameter(D.UNPACK_SKIP_PIXELS),se=D.getParameter(D.UNPACK_SKIP_ROWS),Ue=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ft.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ft.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,it),D.pixelStorei(D.UNPACK_SKIP_ROWS,K),D.pixelStorei(D.UNPACK_SKIP_IMAGES,st);const Kt=S.isDataArrayTexture||S.isData3DTexture,Ae=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const Re=Tt.get(S),jt=Tt.get(F),me=Tt.get(Re.__renderTarget),en=Tt.get(jt.__renderTarget);Rt.bindFramebuffer(D.READ_FRAMEBUFFER,me.__webglFramebuffer),Rt.bindFramebuffer(D.DRAW_FRAMEBUFFER,en.__webglFramebuffer);for(let ge=0;ge<J;ge++)Kt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.get(S).__webglTexture,O,st+ge),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.get(F).__webglTexture,lt,Vt+ge)),D.blitFramebuffer(it,K,Mt,j,yt,Pt,Mt,j,D.DEPTH_BUFFER_BIT,D.NEAREST);Rt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||Tt.has(S)){const Re=Tt.get(S),jt=Tt.get(F);Rt.bindFramebuffer(D.READ_FRAMEBUFFER,Vi),Rt.bindFramebuffer(D.DRAW_FRAMEBUFFER,fs);for(let me=0;me<J;me++)Kt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Re.__webglTexture,O,st+me):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Re.__webglTexture,O),Ae?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,jt.__webglTexture,lt,Vt+me):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,jt.__webglTexture,lt),O!==0?D.blitFramebuffer(it,K,Mt,j,yt,Pt,Mt,j,D.COLOR_BUFFER_BIT,D.NEAREST):Ae?D.copyTexSubImage3D(de,lt,yt,Pt,Vt+me,it,K,Mt,j):D.copyTexSubImage2D(de,lt,yt,Pt,it,K,Mt,j);Rt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ae?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(de,lt,yt,Pt,Vt,Mt,j,J,Ot,Ct,Ft.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(de,lt,yt,Pt,Vt,Mt,j,J,Ot,Ft.data):D.texSubImage3D(de,lt,yt,Pt,Vt,Mt,j,J,Ot,Ct,Ft):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,lt,yt,Pt,Mt,j,Ot,Ct,Ft.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,lt,yt,Pt,Ft.width,Ft.height,Ot,Ft.data):D.texSubImage2D(D.TEXTURE_2D,lt,yt,Pt,Mt,j,Ot,Ct,Ft);D.pixelStorei(D.UNPACK_ROW_LENGTH,kt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,De),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Te),D.pixelStorei(D.UNPACK_SKIP_ROWS,se),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ue),lt===0&&F.generateMipmaps&&D.generateMipmap(de),Rt.unbindTexture()},this.copyTextureToTexture3D=function(S,F,G=null,W=null,O=0){return S.isTexture!==!0&&(yi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,S=arguments[2],F=arguments[3],O=arguments[4]||0),yi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,F,G,W,O)},this.initRenderTarget=function(S){Tt.get(S).__webglFramebuffer===void 0&&b.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),Rt.unbindTexture()},this.resetState=function(){R=0,A=0,I=null,Rt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}class Mm{constructor(){this.boxes=[],this.circles=[],this.bounds={minX:-50,maxX:50,minZ:-48,maxZ:42}}addBox(t,e,n,i,r={}){const o={id:r.id||`box_${this.boxes.length}`,minX:Math.min(t,e),maxX:Math.max(t,e),minZ:Math.min(n,i),maxZ:Math.max(n,i),active:r.active??!0,tag:r.tag||"solid"};return this.boxes.push(o),o}addBoxCenter(t,e,n,i,r={}){return this.addBox(t-n/2,t+n/2,e-i/2,e+i/2,r)}addCircle(t,e,n,i={}){const r={x:t,z:e,r:n,active:i.active??!0};return this.circles.push(r),r}addRoomWalls(t,e,n,i,r,o,a,c=0){const l=t-n/2,u=t+n/2,d=e-i/2,f=e+i/2,p=a/2;if(o==="north"){const g=t+c;g-p>l+.05&&this.addBox(l,g-p,d-r/2,d+r/2),u>g+p+.05&&this.addBox(g+p,u,d-r/2,d+r/2)}else this.addBox(l,u,d-r/2,d+r/2);if(o==="south"){const g=t+c;g-p>l+.05&&this.addBox(l,g-p,f-r/2,f+r/2),u>g+p+.05&&this.addBox(g+p,u,f-r/2,f+r/2)}else this.addBox(l,u,f-r/2,f+r/2);if(o==="west"){const g=e+c;g-p>d+.05&&this.addBox(l-r/2,l+r/2,d,g-p),f>g+p+.05&&this.addBox(l-r/2,l+r/2,g+p,f)}else this.addBox(l-r/2,l+r/2,d,f);if(o==="east"){const g=e+c;g-p>d+.05&&this.addBox(u-r/2,u+r/2,d,g-p),f>g+p+.05&&this.addBox(u-r/2,u+r/2,g+p,f)}else this.addBox(u-r/2,u+r/2,d,f)}resolve(t,e,n=.42,i=null){let r=Math.max(this.bounds.minX,Math.min(this.bounds.maxX,t)),o=Math.max(this.bounds.minZ,Math.min(this.bounds.maxZ,e));for(let a=0;a<2;a++){for(let c=0;c<this.boxes.length;c++){const l=this.boxes[c];if(!l.active||i&&i.includes(l.tag))continue;const u=Math.max(l.minX,Math.min(r,l.maxX)),d=Math.max(l.minZ,Math.min(o,l.maxZ)),f=r-u,p=o-d,g=f*f+p*p;if(g<n*n)if(g>1e-6){const _=Math.sqrt(g),m=n-_;r+=f/_*m,o+=p/_*m}else{const _=r-l.minX,m=l.maxX-r,h=o-l.minZ,E=l.maxZ-o,w=Math.min(_,m,h,E);w===_?r=l.minX-n:w===m?r=l.maxX+n:w===h?o=l.minZ-n:o=l.maxZ+n}}for(let c=0;c<this.circles.length;c++){const l=this.circles[c];if(!l.active)continue;const u=r-l.x,d=o-l.z,f=n+l.r,p=u*u+d*d;if(p<f*f&&p>1e-6){const g=Math.sqrt(p),_=f-g;r+=u/g*_,o+=d/g*_}}}return{x:r,z:o}}getGroundHeight(t,e){if(Math.abs(t)<=3.15&&e>=23.8&&e<=34.2){const n=(e-29)/5.2;return Math.max(0,Math.cos(n*Math.PI*.5)*.72)}if(t>=-22.5&&t<=-4&&e>=-18.2&&e<=-14){if(e<-17.4){const n=(e- -18.2)/.8;return .45*Math.max(0,Math.min(1,n))}return .45}return t>=7&&t<=29&&e<=-24&&e>=-47?e>=-33.2?Math.max(0,Math.min(1,(-24-e)/9))*3:3:0}getLocationName(t,e){return t>=-20.5&&t<=-9.5&&e>=6.5&&e<=14.5?"桜マート · 便利店内":t>=9.5&&t<=20.5&&e>=6.5&&e<=14.5?"喫茶 こもれび · 店内":t>=-30.5&&t<=-21.5&&e>=-30.5&&e<=-22.5?"桜荘 · 你的房间":t>=-16.2&&t<=-6.8&&e>=-23&&e<=-18.2?"桜駅 · 候车室":t>=-22.5&&t<=-4&&e>=-18.2&&e<=-13.5?"桜駅 · 月台":Math.abs(t)<=5.5&&e>=-14&&e<=-9.5?"桜町 · 铁路道口":t>=8&&t<=29&&e<=-28?"桜神社 · 山坡展望台":t>=29&&e<=-16&&e>=-32?"山脚林道 · 旧木屋":e>=22?"桜川 · 河畔公园":e>=-4&&e<=18?"桜通り · 商店街":e<=-18&&t<8?"桜丘 · 住宅小巷":"樱花小镇 · 街道"}}let Xr=null,qr=null;function pc(s){const t=new Uint8Array(s.length*4);for(let n=0;n<s.length;n++){const i=s[n];t[n*4+0]=i,t[n*4+1]=i,t[n*4+2]=i,t[n*4+3]=255}const e=new Hc(t,s.length,1,tn);return e.minFilter=Oe,e.magFilter=Oe,e.generateMipmaps=!1,e.needsUpdate=!0,e}function Sm(s=!1){return s?(qr||(qr=pc([105,165,215,255])),qr):(Xr||(Xr=pc([118,188,255])),Xr)}function q(s,t={}){return new Ah({color:s,gradientMap:Sm(t.fourStep??!1),transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??Mn,emissive:t.emissive?new Et(t.emissive):new Et(0),emissiveIntensity:t.emissiveIntensity??0,map:t.map??null,depthWrite:t.depthWrite??!0})}const ym=new sr({color:388e4,transparent:!0,opacity:.28});function wm(s,t=28){const e=new Th(s.geometry,t),n=new Mh(e,ym);return s.add(n),n}function qn({width:s=512,height:t=160,bg:e="#fcf8f2",border:n="#394b6b",text:i="桜駅",subtext:r="",textColor:o="#2c2a35",accentColor:a="#e98aa3",stripe:c=!1,vertical:l=!1}={}){const u=document.createElement("canvas");u.width=s,u.height=t;const d=u.getContext("2d");if(d.fillStyle=e,d.fillRect(0,0,s,t),c&&(d.fillStyle=a,d.fillRect(0,0,s,t*.2),d.fillStyle="#4e9f76",d.fillRect(0,t*.84,s,t*.16)),d.strokeStyle=n,d.lineWidth=Math.max(4,Math.min(s,t)*.04),d.strokeRect(6,6,s-12,t-12),d.fillStyle=o,d.textAlign="center",d.textBaseline="middle",l){const p=[...i],g=Math.floor(Math.min(s*.62,(t-28)/Math.max(1,p.length)));d.font=`800 ${g}px "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Microsoft YaHei", sans-serif`;const _=(t-28)/p.length;p.forEach((m,h)=>{d.fillText(m,s/2,18+_*(h+.5))})}else{const p=Math.floor(r?t*.42:t*.52);d.font=`800 ${p}px "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Microsoft YaHei", sans-serif`,d.fillText(i,s/2,r?t*.42:t*.52),r&&(d.fillStyle=a,d.font=`700 ${Math.floor(t*.18)}px "Hiragino Kaku Gothic ProN", "Yu Gothic UI", sans-serif`,d.fillText(r,s/2,t*.76))}const f=new Oi(u);return f.colorSpace=Ee,f.anisotropy=4,f}function Yr(){const s=document.createElement("canvas");s.width=256,s.height=256;const t=s.getContext("2d");t.fillStyle="#686b75",t.fillRect(0,0,256,256);for(let n=0;n<1400;n++){const i=Math.random()*256,r=Math.random()*256,o=92+Math.floor(Math.random()*26);t.fillStyle=`rgb(${o},${o+2},${o+8})`,t.fillRect(i,r,2,2)}t.fillStyle="rgba(248, 246, 240, 0.85)",t.fillRect(14,0,8,256),t.fillRect(234,0,8,256),t.fillStyle="rgba(246, 240, 224, 0.78)",t.fillRect(125,24,6,92),t.fillRect(125,152,6,80);const e=new Oi(s);return e.wrapS=Sn,e.wrapT=Sn,e.colorSpace=Ee,e}function Em(){const s=document.createElement("canvas");s.width=256,s.height=256;const t=s.getContext("2d");t.fillStyle="#d3cf99",t.fillRect(0,0,256,256),t.strokeStyle="#c2be85",t.lineWidth=1;for(let n=0;n<256;n+=4)t.beginPath(),t.moveTo(0,n),t.lineTo(256,n),t.stroke();t.strokeStyle="#475c4a",t.lineWidth=10,t.strokeRect(5,5,246,246);const e=new Oi(s);return e.wrapS=Sn,e.wrapT=Sn,e.colorSpace=Ee,e}function $r(s="#f4efe6",t="#e8dfd1"){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),i=64;for(let o=0;o<4;o++)for(let a=0;a<4;a++)n.fillStyle=(a+o)%2===0?s:t,n.fillRect(a*i,o*i,i,i);const r=new Oi(e);return r.wrapS=Sn,r.wrapT=Sn,r.colorSpace=Ee,r}function bm(s="#d84a4a"){const t=document.createElement("canvas");t.width=256,t.height=384;const e=t.getContext("2d");e.fillStyle="#f8f5ef",e.fillRect(0,0,256,384),e.fillStyle=s,e.fillRect(0,0,256,46),e.fillStyle="#ffffff",e.font='800 22px "Yu Gothic UI", sans-serif',e.textAlign="center",e.fillText("つめたい · あたたかい",128,30),e.fillStyle="#eef6fb",e.fillRect(16,58,224,178),e.strokeStyle="#b9c6d4",e.lineWidth=3,e.strokeRect(16,58,224,178);const n=["#3fa66b","#e06666","#4a90d9","#d99a4a","#7c5338","#e98aa3"];for(let r=0;r<3;r++){const o=76+r*56;e.fillStyle="#cbd5df",e.fillRect(20,o+36,216,6);for(let a=0;a<6;a++)e.fillStyle=n[(r*2+a)%n.length],e.fillRect(28+a*34,o+6,22,28),e.fillStyle=r===2?"#d9534f":"#2e7bb5",e.fillRect(28+a*34,o+36,22,7)}e.fillStyle="#3c404b",e.fillRect(184,252,46,32),e.fillStyle="#292c35",e.fillRect(24,298,208,62),e.fillStyle="#4e5463",e.fillRect(32,306,192,16);const i=new Oi(t);return i.colorSpace=Ee,i}function Tm(s=!1){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");e.fillStyle=s?"#ffdf9e":"#7b99b5",e.fillRect(0,0,128,128),s||(e.fillStyle="rgba(255,255,255,0.22)",e.beginPath(),e.moveTo(14,14),e.lineTo(54,14),e.lineTo(14,78),e.closePath(),e.fill()),e.strokeStyle="#534a45",e.lineWidth=8,e.strokeRect(4,4,120,120),e.lineWidth=5,e.beginPath(),e.moveTo(64,0),e.lineTo(64,128),e.moveTo(0,64),e.lineTo(128,64),e.stroke();const n=new Oi(t);return n.colorSpace=Ee,n}class Am{constructor(t,e,n,i){this.scene=t,this.camera=e,this.collision=n,this.audio=i,this.position=new L(-24.2,0,-21.3),this.facingYaw=Math.PI*.5,this.speedWalk=4.4,this.speedRun=7.4,this.camYaw=-Math.PI*.58,this.camPitch=.28,this.camDist=6.6,this.minDist=3.2,this.maxDist=13.5,this.keys=new Set,this.isDragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.controlsLocked=!1,this.sitting=null,this.walkCycle=0,this.stepTimer=0,this.mesh=this._buildCharacterMesh(),this.mesh.position.copy(this.position),this.scene.add(this.mesh),this._bindEvents()}_buildCharacterMesh(){const t=new Xt,e=q(16769481),n=q(3090744),i=q(4942735),r=q(16315371),o=q(4605006),a=q(7030581),c=q(13077334),l=q(15305379),u=new X(.16,.56,.18);this.leftLeg=new U(u,o),this.leftLeg.position.set(-.11,.32,0),this.leftLeg.castShadow=!0,this.rightLeg=new U(u,o),this.rightLeg.position.set(.11,.32,0),this.rightLeg.castShadow=!0;const d=new X(.17,.1,.24),f=new U(d,a);f.position.set(0,-.26,.03),this.leftLeg.add(f);const p=new U(d,a);p.position.set(0,-.26,.03),this.rightLeg.add(p),this.torsoGroup=new Xt,this.torsoGroup.position.y=.62;const g=new U(new X(.42,.52,.25),i);g.position.y=.26,g.castShadow=!0,this.torsoGroup.add(g);const _=new U(new X(.18,.44,.26),r);_.position.set(0,.26,.01),this.torsoGroup.add(_);const m=new U(new X(.45,.1,.29),l);m.position.y=.52,this.torsoGroup.add(m);const h=new U(new X(.12,.24,.24),c);h.position.set(-.24,.06,-.02),h.castShadow=!0,this.torsoGroup.add(h);const E=new X(.13,.46,.14);this.leftArm=new U(E,i),this.leftArm.position.set(-.28,.28,0),this.leftArm.castShadow=!0,this.torsoGroup.add(this.leftArm),this.rightArm=new U(E,i),this.rightArm.position.set(.28,.28,0),this.rightArm.castShadow=!0,this.torsoGroup.add(this.rightArm);const w=new Xt;w.position.y=.72;const y=new U(new Fe(.21,14,12),e);y.castShadow=!0,w.add(y);const P=new U(new Fe(.225,14,12,0,Math.PI*2,0,Math.PI*.62),n);P.position.y=.02,P.castShadow=!0,w.add(P);const R=new U(new X(.38,.22,.14),n);R.position.set(0,-.04,-.15),w.add(R);const A=new Fi({color:2367531}),I=new U(new Fe(.024,8,8),A);I.position.set(-.075,0,.19);const M=I.clone();M.position.x=.075,w.add(I,M),this.torsoGroup.add(w),this.umbrella=new Xt;const v=new U(new oe(.015,.015,.95,6),q(5592418));v.position.set(.26,.88,.08);const C=new U(new He(.66,.24,10,1,!0),q(16774648,{transparent:!0,opacity:.72,side:Je}));return C.position.set(.26,1.36,.08),this.umbrella.add(v,C),this.umbrella.visible=!1,this.torsoGroup.add(this.umbrella),t.add(this.leftLeg,this.rightLeg,this.torsoGroup),t}_bindEvents(){window.addEventListener("keydown",t=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(t.code)&&(this.controlsLocked||t.preventDefault()),this.keys.add(t.code)}),window.addEventListener("keyup",t=>{this.keys.delete(t.code)}),window.addEventListener("blur",()=>{this.keys.clear(),this.isDragging=!1}),window.addEventListener("mousedown",t=>{t.target.closest(".panel, .modal-card, .dialogue-box, .title-card, .inventory-bar")||(this.isDragging=!0,this.lastMouseX=t.clientX,this.lastMouseY=t.clientY)}),window.addEventListener("mouseup",()=>{this.isDragging=!1}),window.addEventListener("mousemove",t=>{if(!this.isDragging||this.controlsLocked)return;const e=t.clientX-this.lastMouseX,n=t.clientY-this.lastMouseY;this.lastMouseX=t.clientX,this.lastMouseY=t.clientY,this.camYaw-=e*.0065,this.camPitch=Math.max(.14,Math.min(.95,this.camPitch+n*.0045))}),window.addEventListener("wheel",t=>{this.controlsLocked||t.target.closest(".modal-card")||(this.camDist=Math.max(this.minDist,Math.min(this.maxDist,this.camDist+t.deltaY*.006)))},{passive:!0})}setRaining(t){const e=this.isIndoors();this.umbrella.visible=t&&!e}isIndoors(){const{x:t,z:e}=this.position;return t>=-20.5&&t<=-9.5&&e>=6.5&&e<=14.5||t>=9.5&&t<=20.5&&e>=6.5&&e<=14.5||t>=-30.5&&t<=-21.5&&e>=-30.5&&e<=-22.5||t>=-16.2&&t<=-6.8&&e>=-23&&e<=-18.2}sitDown(t,e){this.sitting={seatPos:t.clone(),seatYaw:e,returnPos:this.position.clone()},this.position.copy(t),this.facingYaw=e,this.mesh.position.copy(t),this.mesh.rotation.y=e,this.torsoGroup.position.y=.44,this.leftLeg.rotation.x=-Math.PI*.46,this.rightLeg.rotation.x=-Math.PI*.46,this.leftArm.rotation.x=0,this.rightArm.rotation.x=0}standUp(){this.sitting&&(this.position.copy(this.sitting.returnPos),this.sitting=null,this.torsoGroup.position.y=.62,this.leftLeg.rotation.x=0,this.rightLeg.rotation.x=0)}teleport(t,e,n=null){this.sitting&&this.standUp();const i=this.collision.getGroundHeight(t,e);this.position.set(t,i,e),n!==null&&(this.facingYaw=n),this.mesh.position.copy(this.position),this.mesh.rotation.y=this.facingYaw}update(t,e){this.controlsLocked||(this.keys.has("KeyQ")&&(this.camYaw+=1.9*t),this.keys.has("KeyE"),this.keys.has("BracketLeft")&&(this.camYaw+=1.9*t),this.keys.has("BracketRight")&&(this.camYaw-=1.9*t),this.keys.has("KeyR")&&(this.camYaw-=1.9*t));let n=0,i=0;if(this.controlsLocked||((this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(n+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(n-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(i+=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(i-=1)),this.sitting)if(n!==0||i!==0)this.standUp();else{this.setRaining(e),this._updateCamera(t);return}if(n!==0||i!==0){const o=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),a=o?this.speedRun:this.speedWalk,c=-Math.sin(this.camYaw),l=-Math.cos(this.camYaw),u=Math.cos(this.camYaw),d=-Math.sin(this.camYaw);let f=c*n+u*i,p=l*n+d*i;const g=Math.hypot(f,p)||1;f/=g,p/=g;const _=this.position.x+f*a*t,m=this.position.z+p*a*t,h=this.collision.resolve(_,m,.4);this.position.x=h.x,this.position.z=h.z,this.position.y=this.collision.getGroundHeight(h.x,h.z);let w=Math.atan2(f,p)-this.facingYaw;for(;w>Math.PI;)w-=Math.PI*2;for(;w<-Math.PI;)w+=Math.PI*2;this.facingYaw+=w*Math.min(1,t*12);const y=o?13:9;this.walkCycle+=t*y;const P=Math.sin(this.walkCycle)*(o?.65:.45);this.leftLeg.rotation.x=P,this.rightLeg.rotation.x=-P,this.leftArm.rotation.x=-P*.75,this.rightArm.rotation.x=P*.75,this.torsoGroup.position.y=.62+Math.abs(Math.sin(this.walkCycle))*.04,this.stepTimer-=t,this.stepTimer<=0&&(this.stepTimer=o?.27:.4,this.audio&&this.audio.playFootstep(this.isIndoors()))}else this.leftLeg.rotation.x*=.82,this.rightLeg.rotation.x*=.82,this.leftArm.rotation.x*=.82,this.rightArm.rotation.x*=.82,this.torsoGroup.position.y=.62+Math.sin(performance.now()*.0025)*.01;this.mesh.position.copy(this.position),this.mesh.rotation.y=this.facingYaw,this.setRaining(e),this._updateCamera(t)}_updateCamera(t){const e=this.isIndoors();let n=e?Math.min(this.camDist,3.8):this.camDist;const i=e?Math.min(this.camPitch,.28):this.camPitch,r=this.position.x,o=this.position.y+1.32,a=this.position.z,c=Math.sin(this.camYaw)*Math.cos(i),l=Math.sin(i),u=Math.cos(this.camYaw)*Math.cos(i),d=10;for(let E=2;E<=d;E++){const w=E/d*n,y=r+c*w,P=o+l*w,R=a+u*w;if(P<4.4){let A=!1;for(let I=0;I<this.collision.boxes.length;I++){const M=this.collision.boxes[I];if(!(!M.active||M.tag==="river"||M.tag==="trackFence"||M.tag==="crossing"||M.tag==="platformEdge")&&y>=M.minX-.25&&y<=M.maxX+.25&&R>=M.minZ-.25&&R<=M.maxZ+.25){A=!0;break}}if(A){n=Math.max(2.1,(E-1)/d*n);break}}}const f=r+c*n,p=o+l*n,g=a+u*n,_=this.collision.getGroundHeight(f,g),m=Math.max(_+.6,p),h=Math.min(1,t*11);this.camera.position.x+=(f-this.camera.position.x)*h,this.camera.position.y+=(m-this.camera.position.y)*h,this.camera.position.z+=(g-this.camera.position.z)*h,this.camera.lookAt(r,o,a)}}function Rm(s,t){const e=new Xt;s.add(e);const n=q(9288048,{fourStep:!0}),i=new U(new Ye(240,240),n);i.rotation.x=-Math.PI/2,i.receiveShadow=!0,e.add(i);const r=q(8235362);[[-26,20,16,12],[24,20,18,12],[-34,-28,18,16],[35,-24,18,18],[0,38,60,14]].forEach(([T,B,z,k])=>{const ct=new U(new rr(Math.max(z,k)*.55,16),r);ct.rotation.x=-Math.PI/2,ct.position.set(T,.01,B),ct.scale.set(z/Math.max(z,k),k/Math.max(z,k),1),ct.receiveShadow=!0,e.add(ct)});const a=Yr();a.repeat.set(1,10);const c=new Le({map:a,roughness:.88,metalness:.04}),l=Yr();l.repeat.set(1,15);const u=new Le({map:l,roughness:.88,metalness:.04}),d=new U(new Ye(6,48),c);d.rotation.x=-Math.PI/2,d.position.set(0,.03,1),d.receiveShadow=!0,e.add(d);const f=new U(new Ye(5.6,12),c);f.rotation.x=-Math.PI/2,f.position.set(0,.028,38.5),f.receiveShadow=!0,e.add(f);const p=new U(new Ye(6.4,92),u);p.rotation.x=-Math.PI/2,p.rotation.z=Math.PI/2,p.position.set(0,.032,2),p.receiveShadow=!0,e.add(p);const g=Yr();g.repeat.set(1,12);const _=new Le({map:g,roughness:.9,metalness:.03}),m=new U(new Ye(4.6,74),_);m.rotation.x=-Math.PI/2,m.rotation.z=Math.PI/2,m.position.set(-1,.029,-22),m.receiveShadow=!0,e.add(m);const h=q(14472907),E=q(15065043),w=(T,B,z,k,ct=.04,ot=h)=>{const ht=new U(new X(z,.08,k),ot);ht.position.set(T,ct,B),ht.receiveShadow=!0,e.add(ht)};w(-22,6,38,1.8),w(22,6,38,1.8),w(-22,-2,38,1.8),w(22,-2,38,1.8),w(-11.5,-22.2,15,5.2,.035,E),w(0,22.8,76,3.4,.038,E);const y=q(16316144);for(let T=-2;T<=2;T++){const B=new U(new Ye(.55,2.2),y);B.rotation.x=-Math.PI/2,B.position.set(T*1.05,.042,6),e.add(B);const z=B.clone();z.position.set(T*1.05,.042,-2),e.add(z)}const P=q(12164213),R=new U(new Ye(16,2.6),P);R.rotation.x=-Math.PI/2,R.rotation.z=.2,R.position.set(30,.025,-24),R.receiveShadow=!0,e.add(R);const A=-.35,I=new Le({color:6468822,roughness:.25,metalness:.15,transparent:!0,opacity:.86}),M=new U(new Ye(160,6.8),I);M.rotation.x=-Math.PI/2,M.position.set(0,A+.22,29),M.receiveShadow=!0,e.add(M);const v=q(10197397),C=new U(new X(160,.8,.9),v);C.position.set(0,-.15,25.4),C.receiveShadow=!0,e.add(C);const H=C.clone();H.position.set(0,-.15,32.6),e.add(H);const V=q(15460319);for(const T of[25.25,32.75])for(const[B,z]of[[-28,49.5],[28,49.5]]){const k=new U(new X(z,.1,.1),V);k.position.set(B,.82,T),k.castShadow=!0,e.add(k);for(let ct=B-z/2;ct<=B+z/2;ct+=4.5){const ot=new U(new X(.12,.85,.12),V);ot.position.set(ct,.42,T),ot.castShadow=!0,e.add(ot)}}t.addBox(-55,-3.15,25,33,{tag:"river"}),t.addBox(3.15,55,25,33,{tag:"river"});const Q=new Xt,et=q(13082226),Z=q(12076862),rt=12;for(let T=0;T<rt;T++){const B=23.8+T/rt*10.4,z=23.8+(T+1)/rt*10.4,k=(B+z)/2,ct=t.getGroundHeight(0,B),ot=t.getGroundHeight(0,z),ht=(ct+ot)/2,Nt=Math.atan2(ot-ct,z-B),at=Math.hypot(z-B,ot-ct)+.08,pt=new U(new X(6,.22,at),et);pt.position.set(0,ht-.08,k),pt.rotation.x=-Nt,pt.receiveShadow=!0,pt.castShadow=!0,Q.add(pt);for(const At of[-2.95,2.95]){const It=new U(new X(.14,.12,at),Z);if(It.position.set(At,ht+.88,k),It.rotation.x=-Nt,Q.add(It),T%2===0){const St=new U(new X(.16,.96,.16),Z);St.position.set(At,ht+.44,k),St.castShadow=!0,Q.add(St)}}}t.addBox(-3.35,-2.9,23.8,34.2),t.addBox(2.9,3.35,23.8,34.2),e.add(Q);const $=q(8169825),ft=q(11052705),xt=new U(new X(22,3,14),$);xt.position.set(18,1.5,-40),xt.receiveShadow=!0,e.add(xt);const bt=new U(new X(22.4,3.1,.8),ft);bt.position.set(18,1.5,-33),bt.receiveShadow=!0,bt.castShadow=!0,e.add(bt);const Gt=18;for(let T=0;T<Gt;T++){const B=T/Gt,z=-24.2-B*8.8,k=(B+.5/Gt)*3,ct=new U(new X(5,k,.65),ft);ct.position.set(16,k/2,z),ct.receiveShadow=!0,ct.castShadow=!0,e.add(ct)}for(const T of[13.3,18.7]){const B=new U(new X(.45,.85,9.6),ft);B.position.set(T,1.8,-28.6),B.rotation.x=Math.atan2(3,9),B.castShadow=!0,e.add(B)}t.addBox(6.8,13.3,-33.4,-24),t.addBox(18.7,29.2,-33.4,-24),t.addBox(6.6,7.2,-46.5,-33),t.addBox(28.8,29.4,-46.5,-33),t.addBox(7,29,-47,-46.2);const te=q(9331521);for(const[T,B]of[[10.2,6.2],[23.8,9.8]]){const z=new U(new X(B,.1,.12),te);z.position.set(T,3.85,-33.15),e.add(z);for(let k=T-B/2;k<=T+B/2;k+=2.2){const ct=new U(new X(.12,.9,.12),te);ct.position.set(k,3.45,-33.15),e.add(ct)}}const tt=q(7051362),ut=q(5998183),wt=q(7640734),dt=(T,B,z,k,ct)=>{const ot=new He(z,k,8),ht=new U(ot,ct);ht.position.set(T,k*.42,B),ht.rotation.y=Math.random()*Math.PI,ht.scale.set(1.35,1,1.15),e.add(ht)};for(let T=0;T<26;T++){const B=T/26*Math.PI*2,z=74+T%3*10,k=Math.cos(B)*z,ct=Math.sin(B)*z,ot=18+T%4*6,ht=24+T%3*7;dt(k,ct,ht,ot,T%2===0?tt:ut)}for(let T=0;T<18;T++){const B=T/18*Math.PI*2+.17,z=108+T%2*14;dt(Math.cos(B)*z,Math.sin(B)*z,36,36+T%3*8,wt)}const Lt=[],Dt=q(6835004),Wt=[q(16762838),q(16757960),q(16767460)],re=q(4617041);function Ut(T,B,z=1,k=!0){const ct=t.getGroundHeight(T,B),ot=new Xt;ot.position.set(T,ct,B);const ht=new U(new oe(.16*z,.28*z,2.5*z,7),Dt);return ht.position.y=1.25*z,ht.castShadow=!0,ot.add(ht),[[0,3.1,0,1.55],[-.95,2.75,.45,1.15],[.95,2.8,-.35,1.2],[.15,3.6,.65,1.05],[-.35,3.45,-.75,1.1]].forEach(([at,pt,At,It],St)=>{const Yt=new U(new or(It*z,1),Wt[St%Wt.length]);Yt.position.set(at*z,pt*z,At*z),Yt.scale.y=.78,Yt.castShadow=!0,ot.add(Yt)}),e.add(ot),Lt.push(ot),k&&t.addCircle(T,B,.42*z),ot}function fe(T,B,z=1,k=!1){const ct=t.getGroundHeight(T,B),ot=new Xt;ot.position.set(T,ct,B);const ht=new U(new oe(.18*z,.28*z,2.2*z,6),Dt);ht.position.y=1.1*z,ot.add(ht);for(let Nt=0;Nt<3;Nt++){const at=new U(new He((1.65-Nt*.35)*z,2.6*z,7),re);at.position.y=(2.6+Nt*1.4)*z,at.castShadow=!0,ot.add(at)}e.add(ot),k&&t.addCircle(T,B,.45*z)}for(let T=-38;T<=38;T+=9.5)Math.abs(T)<5||(Ut(T,24.1,1.05+Math.abs(T)%3*.08,!0),Ut(T+2,34,1.1,!1));Ut(-5.2,-20,.95,!0),Ut(6.5,-20,1.05,!0),Ut(-32,-20,1,!0),Ut(23.5,-39,1.45,!0),Ut(10.5,-36.5,1.1,!0),Ut(-7.2,6.2,.85,!0),Ut(7.2,6.2,.85,!0),Ut(-37,-1.5,1.05,!0),Ut(37,-1.5,1.05,!0);const D=[];for(let T=-54;T<=54;T+=6.5)D.push([T,-49-Math.abs(T)%5]),D.push([T,43+Math.abs(T)%4]);for(let T=-44;T<=40;T+=6.5)Math.abs(T+12)<4.5||(D.push([-52-Math.abs(T)%4,T]),D.push([52+Math.abs(T)%4,T]));D.push([32,-30],[39,-30],[42,-23],[39,-18],[32,-18],[-40,-34],[-42,-26],[-46,-2.5],[-46,6.5],[-49.5,0],[-49.5,4],[-51.5,2],[46,-2.5],[46,6.5],[49.5,0],[49.5,4],[51.5,2],[-39,-25],[-39,-19],[-42,-22],[-4.5,43],[4.5,43],[-2,46.5],[2,46.5]),D.forEach(([T,B],z)=>{z%5===0?Ut(T,B,1.15,!1):fe(T,B,1.1+z%3*.22,!1)});const be=q(15262421),qt=(T,B,z)=>{const k=new Xt;k.position.set(T,0,B),k.rotation.y=z;const ct=new U(new X(5.2,.2,.14),be);ct.position.y=.78;const ot=new U(new X(4.8,.08,.16),q(14261048));ot.position.y=.78,k.add(ct,ot);for(const ht of[-2.2,0,2.2]){const Nt=new U(new X(.16,.9,.16),q(7228212));Nt.position.set(ht,.45,0),k.add(Nt)}e.add(k)};qt(-46.5,2,Math.PI/2),qt(46.5,2,Math.PI/2),qt(-38.5,-22,Math.PI/2),qt(0,42.8,0);const Ht=new Xt;Ht.position.set(36,0,-25),Ht.rotation.y=-.35;const Rt=q(8611921),ie=q(5988713),Tt=new U(new X(3.4,2.3,2.6),Rt);Tt.position.y=1.15,Tt.castShadow=!0,Tt.receiveShadow=!0,Ht.add(Tt);const b=new U(new X(3.9,.2,3.1),ie);b.position.y=2.4,b.rotation.x=.14,b.castShadow=!0,Ht.add(b);const x=new U(new X(.65,.5,.5),q(11962970));return x.position.set(-.9,.25,1.55),x.castShadow=!0,Ht.add(x),e.add(Ht),t.addBoxCenter(36,-25,3.7,3),{group:e,riverWater:M,roadMaterials:[c,u,_],sakuraTrees:Lt,update(T,B){M.position.y=A+.22+Math.sin(T*1.8)*.015;const z=B?.34:.88;c.roughness+=(z-c.roughness)*.05,u.roughness=c.roughness,_.roughness=c.roughness}}}function Cm(s,t){const e=new Xt;s.add(e);const n={doors:{},cafeLights:[],cafeSignMat:null,cafeOpenSign:null,cafeCoffeeCup:null,martLights:[],homeLampLight:null,homeLampShadeMat:null,stationParcelMesh:null,shrineBellGroup:null,shrineLanternMats:[],streetLights:[],houseWindows:{},genericWindows:[],vendingMachines:[],festivalLanterns:[],barberPole:null,lostPhotoMesh:null,mailboxFlag:null};q(16117732);const i=q(7228212),r=q(10909774),o=q(4608614);q(10438980);const a=q(8160657),c=q(12968950,{transparent:!0,opacity:.45});function l({cx:j,cz:J,w:it,d:K,h:st,wallColor:yt,floorTex:Pt,doorSide:Vt,doorW:Ft,doorH:Ot,roofStyle:Ct="gable",roofColor:de=4608614}){const kt=new Xt;kt.position.set(j,0,J);const De=q(yt),Te=.24,se=Pt?q(16777215,{map:Pt}):q(15261649),Ue=new U(new X(it,.14,K),se);Ue.position.y=.07,Ue.receiveShadow=!0,kt.add(Ue);const Kt=(jt,me,en,ge,ke,ps)=>{const zn=new U(new X(ge,ke,ps),De);return zn.position.set(jt,me,en),zn.castShadow=!0,zn.receiveShadow=!0,kt.add(zn),zn},Ae=jt=>{const me=jt==="north"||jt==="south",en=me?it:K,ge=jt==="north"?-K/2:jt==="south"?K/2:jt==="west"?-it/2:it/2;if(jt!==Vt)me?Kt(0,st/2,ge,it,st,Te):Kt(ge,st/2,0,Te,st,K);else{const ke=(en-Ft)/2;me?(Kt(-(Ft/2+ke/2),st/2,ge,ke,st,Te),Kt(Ft/2+ke/2,st/2,ge,ke,st,Te),st>Ot&&Kt(0,Ot+(st-Ot)/2,ge,Ft,st-Ot,Te)):(Kt(ge,st/2,-(Ft/2+ke/2),Te,st,ke),Kt(ge,st/2,Ft/2+ke/2,Te,st,ke),st>Ot&&Kt(ge,Ot+(st-Ot)/2,0,Te,st-Ot,Ft))}};["north","south","east","west"].forEach(Ae);const Re=q(de);if(Ct==="flat"){const jt=new U(new X(it+.5,.35,K+.5),Re);jt.position.y=st+.18,jt.castShadow=!0,kt.add(jt)}else{const jt=new U(new He(Math.max(it,K)*.72,2,4),Re);jt.position.y=st+1,jt.rotation.y=Math.PI/4,jt.scale.set(it/Math.max(it,K),1,K/Math.max(it,K)),jt.castShadow=!0,kt.add(jt)}return t.addRoomWalls(j,J,it,K,.35,Vt,Ft+.15),e.add(kt),kt}const u=$r("#f8f5ef","#eae6dc");u.repeat.set(4,3);const d=l({cx:-15,cz:10.5,w:10,d:7.4,h:3.6,wallColor:16250352,floorTex:u,doorSide:"north",doorW:2.6,doorH:2.5,roofStyle:"flat",roofColor:5399416}),f=qn({text:"桜マート",subtext:"SAKURA MART · 24H",bg:"#ffffff",border:"#4e9f76",textColor:"#2c3d4f",accentColor:"#e98aa3",stripe:!0}),p=new Le({map:f,emissive:16777215,emissiveMap:f,emissiveIntensity:.55,roughness:.4}),g=new U(new X(10.3,1.05,.28),p);g.position.set(0,3.65,-3.75),d.add(g),n.martLights.push(p);for(const j of[-3.1,3.1]){const J=new U(new X(2.6,2,.32),c);J.position.set(j,1.45,-3.68),d.add(J)}const _=new U(new X(1.28,2.45,.1),c);_.position.set(-.64,1.25,-3.68);const m=new U(new X(1.28,2.45,.1),c);m.position.set(.64,1.25,-3.68);const h=q(15305379),E=new U(new X(1.22,.14,.12),h),w=E.clone();_.add(E),m.add(w),d.add(_,m),n.doors.mart={openAmount:0,targetOpen:0,wasOpen:!1,doorPos:new L(-15,0,6.8),update(j){this.openAmount+=(this.targetOpen-this.openAmount)*Math.min(1,j*8),_.position.x=-.64-this.openAmount*1.15,m.position.x=.64+this.openAmount*1.15}};const y=new U(new X(3.4,1,.9),q(15459544));y.position.set(-2.6,.5,2),y.castShadow=!0,d.add(y),t.addBoxCenter(-17.6,12.5,3.5,1);const P=new U(new X(.5,.35,.42),q(3883600));P.position.set(-2.2,1.18,2),d.add(P);const R=new U(new X(.75,2.1,4.4),q(14479611,{emissive:10082037,emissiveIntensity:.35}));R.position.set(4.4,1.1,.4),d.add(R),t.addBoxCenter(-10.6,10.9,.9,4.5);const A=q(15854819),I=[15305379,5943417,15908444,6134740,14183260];for(const j of[.8,2.5]){const J=new U(new X(.7,1.45,3.4),A);J.position.set(j,.76,.3),J.castShadow=!0,d.add(J),t.addBoxCenter(-15+j,10.8,.8,3.5);for(let it=0;it<5;it++){const K=new U(new X(.28,.24,.34),q(I[it%I.length]));K.position.set(j-.22,1.05+it%2*.25,-1+it*.55),d.add(K)}}const M=new ts(16774885,2.2,17,1.4);M.position.set(-15,3.1,10.2),s.add(M),n.martLights.push(M);const v=$r("#9e7450","#8f6644");v.repeat.set(4,3);const C=l({cx:15,cz:10.5,w:10,d:7.4,h:3.6,wallColor:16050904,floorTex:v,doorSide:"north",doorW:1.8,doorH:2.35,roofStyle:"gable",roofColor:7227195}),H=new U(new X(9.6,.16,1.35),q(12081996));H.position.set(0,2.7,-4.25),H.rotation.x=.25,H.castShadow=!0,C.add(H);const V=qn({text:"喫茶 こもれび",subtext:"COFFEE & TOAST · 08:00-21:00",bg:"#3f2e25",border:"#d6a46c",textColor:"#fcefd9",accentColor:"#f0b878"}),Q=new Le({map:V,emissive:16766883,emissiveMap:V,emissiveIntensity:.45,roughness:.5}),et=new U(new X(5.6,.9,.22),Q);et.position.set(0,3.35,-3.82),C.add(et),n.cafeSignMat=Q;for(const j of[-3,3]){const J=new U(new X(2.6,1.6,.3),c);J.position.set(j,1.65,-3.68),C.add(J)}const Z=new Xt;Z.position.set(-.9,0,-3.68);const rt=new U(new X(1.75,2.3,.12),r);rt.position.set(.88,1.18,0);const $=new U(new X(1.1,1.1,.14),c);$.position.set(.88,1.5,0),Z.add(rt,$),C.add(Z);const ft=t.addBoxCenter(15,6.8,1.8,.35,{active:!1,tag:"cafeDoor"});n.doors.cafe={openAmount:0,targetOpen:0,isClosedForNight:!1,doorPos:new L(15,0,6.8),collider:ft,update(j){const J=this.isClosedForNight?0:this.targetOpen;this.openAmount+=(J-this.openAmount)*Math.min(1,j*7),Z.rotation.y=this.openAmount*1.35,this.collider.active=this.isClosedForNight}};const xt=new U(new X(.65,1.05,.12),q(3029812));xt.position.set(-2.3,.55,-4.45),xt.rotation.y=.25,xt.castShadow=!0,C.add(xt);const bt=new U(new X(4.8,1.05,.9),i);bt.position.set(1.6,.55,1.8),bt.castShadow=!0,C.add(bt),t.addBoxCenter(16.6,12.3,4.9,1);const Gt=new U(new oe(.12,.16,.42,8),q(4928808));Gt.position.set(.7,1.28,1.8),C.add(Gt);const te=new U(new oe(.09,.07,.14,10),q(16645111));te.position.set(1.8,1.15,1.55),te.visible=!1,C.add(te),n.cafeCoffeeCup=te;for(const[j,J]of[[-2.7,-.4],[-2.7,1.9]]){const it=new U(new X(1.25,.1,1),r);it.position.set(j,.78,J),it.castShadow=!0;const K=new U(new oe(.08,.12,.75,6),i);K.position.set(j,.38,J),C.add(it,K),t.addBoxCenter(15+j,10.5+J,1.25,1);for(const st of[-.95,.95]){const yt=new U(new X(.48,.08,.48),r);yt.position.set(j+st,.48,J);const Pt=new U(new X(.08,.55,.48),i);Pt.position.set(j+st+(st<0?-.2:.2),.76,J),C.add(yt,Pt)}}const tt=new ts(16763784,2,14,1.5);tt.position.set(15,3,10.5),s.add(tt),n.cafeLights.push(tt);const ut=Em();ut.repeat.set(3,3);const wt=l({cx:-26,cz:-27.2,w:8.2,d:6.8,h:3.4,wallColor:16051939,floorTex:ut,doorSide:"south",doorW:1.7,doorH:2.3,roofStyle:"gable",roofColor:4148323}),dt=new U(new X(1.7,2.25,.1),r);dt.position.set(0,1.15,3.38);const Lt=new U(new X(1.1,1.2,.12),c);Lt.position.set(0,.2,0),dt.add(Lt),wt.add(dt),n.doors.home={openAmount:0,targetOpen:0,doorPos:new L(-26,0,-23.8),update(j){this.openAmount+=(this.targetOpen-this.openAmount)*Math.min(1,j*8),dt.position.x=this.openAmount*1.45}};const Dt=qn({width:256,height:120,text:"桜 荘",subtext:"SAKURA HOUSE",bg:"#f8f2e6",border:"#6e4b34",textColor:"#3f2e25",accentColor:"#c95f7d"}),Wt=new U(new X(1.1,.5,.08),q(16777215,{map:Dt}));Wt.position.set(-1.6,1.85,3.5),wt.add(Wt);const re=new U(new X(1.5,.42,1.1),r);re.position.set(0,.25,-.2),re.castShadow=!0,wt.add(re),t.addBoxCenter(-26,-27.4,1.5,1.1);const Ut=new U(new X(1.5,.18,2.3),q(16645111));Ut.position.set(-2.6,.18,-1.2);const fe=new U(new X(1.54,.2,1.55),q(15305379));fe.position.set(-2.6,.24,-.9);const D=new U(new X(.6,.14,.35),q(16115912));D.position.set(-2.6,.3,-2),wt.add(Ut,fe,D),t.addBoxCenter(-28.6,-28.4,1.5,2.3);const be=new U(new oe(.2,.24,.12,8),i);be.position.set(2.8,.18,-2.1);const qt=new Le({color:16774624,emissive:16763256,emissiveIntensity:.85,roughness:.7}),Ht=new U(new oe(.24,.24,.85,8),qt);Ht.position.set(2.8,.68,-2.1),wt.add(be,Ht),n.homeLampShadeMat=qt;const Rt=new ts(16764808,1.8,12,1.4);Rt.position.set(-23.2,2.2,-29.3),s.add(Rt),n.homeLampLight=Rt;const ie=new Xt;ie.position.set(-23.2,0,-23.2);const Tt=new U(new oe(.05,.05,1.1,6),i);Tt.position.y=.55;const b=new U(new X(.45,.32,.34),q(13193804));b.position.y=1.15,b.castShadow=!0;const x=new U(new X(.06,.24,.14),q(16176229));x.position.set(.26,1.25,0),ie.add(Tt,b,x),e.add(ie),t.addCircle(-23.2,-23.2,.35),n.mailboxFlag=x;const T=new Xt;e.add(T);const B=new U(new X(18.5,.48,4.2),q(14013131));B.position.set(-13.25,.22,-16.1),B.receiveShadow=!0,B.castShadow=!0,T.add(B);const z=new U(new X(18,.03,.28),q(15779656));z.position.set(-13.25,.46,-14.35),T.add(z);const k=new U(new X(16.5,.18,3.6),q(4938867));k.position.set(-13.25,3.65,-16.1),k.castShadow=!0,T.add(k);for(const j of[-20,-15.5,-11,-6.5]){const J=new U(new X(.22,3.2,.22),i);J.position.set(j,2.05,-16.4),J.castShadow=!0,T.add(J)}const ct=qn({text:"桜 駅",subtext:"◀ 山手   SAKURA   河原 ▶",bg:"#ffffff",border:"#394b6b",textColor:"#24324a",accentColor:"#e98aa3"}),ot=new U(new X(3.2,.95,.12),q(16777215,{map:ct}));ot.position.set(-9.5,2.75,-16.1),T.add(ot);const ht=$r("#ebe6dd","#ded8ce");ht.repeat.set(3,2);const Nt=new U(new X(9,.12,4.4),q(16777215,{map:ht}));Nt.position.set(-11.5,.06,-20.4),Nt.receiveShadow=!0,T.add(Nt);const at=q(15985888),pt=(j,J,it,K,st)=>{const yt=new U(new X(it,K,st),at);yt.position.set(j,K/2,J),yt.castShadow=!0,yt.receiveShadow=!0,T.add(yt)};pt(-16,-20.4,.26,3.4,4.4),pt(-7,-20.4,.26,3.4,4.4),pt(-14.5,-22.6,3,3.4,.26),pt(-8.5,-22.6,3,3.4,.26),pt(-11.5,-22.6,3,1,.26);const At=new U(new He(6.8,2,4),o);At.position.set(-11.5,4.35,-20.4),At.rotation.y=Math.PI/4,At.scale.set(1.12,1,.62),At.castShadow=!0,T.add(At);const It=qn({text:"桜 駅",subtext:"SAKURA STATION",bg:"#394b6b",border:"#e98aa3",textColor:"#ffffff",accentColor:"#ffd4e0"}),St=new U(new X(3.2,.88,.16),q(16777215,{map:It}));St.position.set(-11.5,3.1,-22.8),T.add(St),t.addBox(-16.2,-15.8,-22.7,-18.1),t.addBox(-7.2,-6.8,-22.7,-18.1),t.addBox(-16,-13.05,-22.8,-22.4),t.addBox(-9.95,-7,-22.8,-22.4),t.addBox(-22.6,-4,-14.15,-13.7,{tag:"platformEdge"}),t.addBox(-22.8,-22.4,-18.2,-14),t.addBox(-4.2,-3.8,-18.2,-14);const Yt=new U(new X(1.5,.9,.65),r);Yt.position.set(-14.6,.48,-19.8),T.add(Yt),t.addBoxCenter(-14.6,-19.8,1.5,.7);const Bt=new U(new X(.55,.42,.45),q(13935978));Bt.position.set(-14.6,1.14,-19.8);const ce=new U(new X(.57,.08,.12),q(9329976));Bt.add(ce),T.add(Bt),n.stationParcelMesh=Bt;const N=new ts(16772024,1.6,15,1.5);N.position.set(-11.5,3,-18.5),s.add(N),n.streetLights.push({light:N,bulbMat:null,baseIntensity:1.6});const mt=new Xt;e.add(mt);const Y=q(13582904);function nt(j,J,it,K=1){const st=new Xt;st.position.set(j,J,it);const yt=new U(new oe(.16*K,.2*K,3.8*K,8),Y);yt.position.set(-1.7*K,1.9*K,0),yt.castShadow=!0;const Pt=yt.clone();Pt.position.x=1.7*K;const Vt=new U(new X(4.8*K,.28*K,.36*K),Y);Vt.position.y=3.7*K,Vt.castShadow=!0;const Ft=new U(new X(5.1*K,.14*K,.44*K),q(2959923));Ft.position.y=3.88*K;const Ot=new U(new X(4.1*K,.2*K,.24*K),Y);Ot.position.y=3.05*K,st.add(yt,Pt,Vt,Ft,Ot),mt.add(st)}nt(16,0,-24.2,1.05),nt(16,3,-34.2,.95);const gt=new Xt;gt.position.set(16,3,-42.2);const vt=new U(new X(5.6,.55,4.2),q(10854552));vt.position.y=.28;const zt=new U(new X(4.8,2.7,3.4),r);zt.position.y=1.85,zt.castShadow=!0;const le=new U(new He(4.4,2,4),q(3884111));le.position.y=4.1,le.rotation.y=Math.PI/4,le.scale.set(1.25,1,.95),le.castShadow=!0,gt.add(vt,zt,le);const xe=new U(new X(1.4,.85,.7),i);xe.position.set(0,.95,2.2),xe.castShadow=!0,gt.add(xe);const ee=new Xt;ee.position.set(0,2.85,2);const Be=new U(new Fe(.18,10,8),q(14464082));Be.position.y=-.25;const Ke=new U(new oe(.06,.08,1.2,7),q(16051426));Ke.position.y=-.9,ee.add(Be,Ke),gt.add(ee),n.shrineBellGroup=ee,mt.add(gt),t.addBoxCenter(16,-42.2,5.6,4.4);const zi=q(10986912);for(const[j,J]of[[12.5,-35.5],[19.5,-35.5],[12.5,-39.5],[19.5,-39.5]]){const it=new Xt;it.position.set(j,3,J);const K=new U(new oe(.16,.24,1.1,6),zi);K.position.y=.55;const st=new Le({color:16773065,emissive:16758876,emissiveIntensity:.2,roughness:.5}),yt=new U(new X(.38,.42,.38),st);yt.position.y=1.3;const Pt=new U(new He(.45,.35,6),zi);Pt.position.y=1.68,it.add(K,yt,Pt),mt.add(it),n.shrineLanternMats.push(st),t.addCircle(j,J,.3)}const Fn=new Xt;Fn.position.set(34.7,.58,-23.6);const an=new U(new X(.32,.05,.24),new Le({color:16774100,emissive:16765562,emissiveIntensity:.65}));an.rotation.y=.4,Fn.add(an),e.add(Fn),n.lostPhotoMesh=Fn;function ze({x:j,z:J,w:it,d:K,h:st,wallColor:yt,roofColor:Pt,rotY:Vt=0,signText:Ft=null,signSub:Ot="",signBg:Ct="#fcf8f2",signAccent:de="#e98aa3",residentId:kt=null,addBike:De=!1,addLaundry:Te=!1}){const se=new Xt;se.position.set(j,0,J),se.rotation.y=Vt;const Ue=new U(new X(it,st,K),q(yt));Ue.position.y=st/2,Ue.castShadow=!0,Ue.receiveShadow=!0,wm(Ue),se.add(Ue);const Kt=new U(new He(Math.max(it,K)*.78,1.9,4),q(Pt));Kt.position.y=st+.92,Kt.rotation.y=Math.PI/4,Kt.scale.set(it/Math.max(it,K),1,K/Math.max(it,K)),Kt.castShadow=!0,se.add(Kt);const Ae=new U(new X(1.15,2.05,.14),i);Ae.position.set(-it*.22,1.05,K/2+.05),se.add(Ae);const Re=Tm(!1),jt=new Le({map:Re,emissive:16765317,emissiveIntensity:0,roughness:.35}),me=(nn,Wi,hr)=>{const ms=new U(new X(1.15,1.05,.12),jt);ms.position.set(nn,Wi,hr),se.add(ms)};if(me(it*.22,1.55,K/2+.05),st>=4.4&&(me(-it*.22,3.65,K/2+.05),me(it*.22,3.65,K/2+.05)),kt?(n.houseWindows[kt]||(n.houseWindows[kt]=[]),n.houseWindows[kt].push(jt)):n.genericWindows.push(jt),Ft){const nn=qn({text:Ft,subtext:Ot,bg:Ct,border:"#3b4352",accentColor:de}),Wi=new U(new X(Math.min(it*.78,4.4),.78,.18),q(16777215,{map:nn}));Wi.position.set(0,st-.55,K/2+.14),se.add(Wi)}const en=new U(new X(.75,.55,.36),q(15066077));en.position.set(it/2+.22,.32,K*.15);const ge=new U(new rr(.18,10),q(5988457));ge.position.set(.39,0,0),ge.rotation.y=Math.PI/2,en.add(ge),se.add(en);const ke=new U(new oe(.18,.14,.28,7),q(11955022));ke.position.set(-it*.22+.85,.14,K/2+.32);const ps=new U(new or(.28,0),q(6267236));if(ps.position.y=.28,ke.add(ps),se.add(ke),De){const nn=Pm();nn.position.set(it*.34,0,K/2+.55),nn.rotation.y=.2,se.add(nn)}if(Te){const nn=new U(new oe(.03,.03,2.2,6),a);nn.rotation.z=Math.PI/2,nn.position.set(0,2.75,K/2+.45),se.add(nn),[16711422,11063536,16234955].forEach((hr,ms)=>{const sa=new U(new X(.45,.58,.06),q(hr));sa.position.set(-.6+ms*.6,2.42,K/2+.45),se.add(sa)})}e.add(se);const zn=Math.abs(Math.cos(Vt))>.5?it:K,il=Math.abs(Math.cos(Vt))>.5?K:it;return t.addBoxCenter(j,J,zn+.45,il+.45),se}ze({x:-31,z:10.8,w:7.4,d:6.2,h:3.6,wallColor:16051428,roofColor:10438980,rotY:Math.PI,signText:"桜郵便局",signSub:"POST OFFICE 〒",signBg:"#fff8f6",signAccent:"#d64541",addBike:!0}),ze({x:31,z:10.8,w:7.4,d:6.2,h:3.6,wallColor:16314336,roofColor:8869954,rotY:Math.PI,signText:"はなベーカリー",signSub:"BAKERY",signBg:"#fff9ee",signAccent:"#d98a4a",addBike:!0}),ze({x:-15,z:-5.8,w:7.6,d:5.4,h:4.5,wallColor:15393232,roofColor:4543076,rotY:0,signText:"古書 桜堂",signSub:"BOOKS",signBg:"#f6f0e2",signAccent:"#5a6e82"}),ze({x:15,z:-5.8,w:7.4,d:5.4,h:4.2,wallColor:15922422,roofColor:4942466,rotY:0,signText:"理容 かぜ",signSub:"BARBER",signBg:"#ffffff",signAccent:"#4682b4"});const On=new U(new oe(.14,.14,1.05,10),q(15227482));On.position.set(15+3.2,1.35,-2.95);const us=new U(new X(.3,.25,.08),q(4161218));On.add(us),e.add(On),n.barberPole=On,ze({x:26,z:-18.5,w:6.8,d:5.6,h:4.4,wallColor:15722456,roofColor:6113596,rotY:Math.PI,residentId:"kenji",addBike:!0,addLaundry:!0}),ze({x:-31,z:18.8,w:7.4,d:5.8,h:3.4,wallColor:15392713,roofColor:4410460,rotY:0,residentId:"haru",addLaundry:!0}),ze({x:5.5,z:-28,w:6.8,d:5.4,h:4.8,wallColor:15133678,roofColor:5398899,rotY:0,residentId:"ren",addBike:!0}),ze({x:31,z:18.8,w:6.8,d:5.4,h:4.8,wallColor:16051440,roofColor:6120565,rotY:0,residentId:"aoi",addBike:!0}),ze({x:-35,z:-6,w:6.6,d:5.4,h:4.2,wallColor:15788508,roofColor:5530224,rotY:0}),ze({x:34,z:-6,w:6.6,d:5.4,h:4.2,wallColor:15591391,roofColor:7034442,rotY:0});function En(j,J,it,K=0,st="#d84a4a"){const yt=new Xt;yt.position.set(J,0,it),yt.rotation.y=K;const Pt=bm(st),Vt=q(16118508),Ft=new Le({map:Pt,emissive:16777215,emissiveMap:Pt,emissiveIntensity:.32,roughness:.35}),Ot=[Vt,Vt,Vt,Vt,Ft,Vt],Ct=new U(new X(1.1,1.85,.72),Ot);Ct.position.y=.925,Ct.castShadow=!0,yt.add(Ct);const de=new U(new oe(.06,.06,.19,10),q(st==="#d84a4a"?6468718:13929542));de.rotation.z=Math.PI/2,de.position.set(0,.36,.38),de.visible=!1,yt.add(de),e.add(yt),t.addBoxCenter(J,it,1.2,.85);const kt=new L(Math.sin(K),0,Math.cos(K));n.vendingMachines.push({id:j,pos:new L(J,0,it).addScaledVector(kt,.9),canMesh:de,hasDispensedCan:!1,dispensedItemId:null,frontMat:Ft})}En("vm_mart",-9.2,7.6,Math.PI,"#45a36e"),En("vm_station",-6,-21.8,Math.PI,"#d84a4a"),En("vm_park",-10.5,21.3,0,"#4482c9");const ri=new Xt;ri.position.set(-26.5,0,7);const Bn=new U(new oe(.18,.24,.55,10),q(4935255));Bn.position.y=.28;const oi=new U(new oe(.24,.24,.92,12),q(14237496));oi.position.y=.95,oi.castShadow=!0;const ki=new U(new Fe(.26,12,8,0,Math.PI*2,0,Math.PI*.55),q(14237496));ki.position.y=1.4,ri.add(Bn,oi,ki),e.add(ri),t.addCircle(-26.5,7,.38);const Gi=new Xt;Gi.position.set(-5.4,0,-2.4);const Hi=new U(new X(.12,2,.12),i);Hi.position.set(-.95,1,0);const ds=Hi.clone();ds.position.x=.95;const lr=qn({text:"桜町 掲示板",subtext:"春の行事 · 列車運行 · おしらせ",bg:"#f7f1e1",border:"#6e4b34",textColor:"#2e384a",accentColor:"#c95f7d"}),Vi=new U(new X(2.05,1.1,.12),q(16777215,{map:lr}));Vi.position.y=1.45,Vi.castShadow=!0;const fs=new U(new X(2.35,.12,.55),o);fs.position.y=2.12,Gi.add(Hi,ds,Vi,fs),e.add(Gi),t.addBoxCenter(-5.4,-2.4,2.1,.45);function S(j,J,it=0){const K=t.getGroundHeight(j,J),st=new Xt;st.position.set(j,K,J),st.rotation.y=it;const yt=new U(new X(1.75,.1,.52),r);yt.position.y=.46,yt.castShadow=!0;const Pt=new U(new X(1.75,.45,.08),r);Pt.position.set(0,.78,-.22),Pt.rotation.x=-.15;for(const Vt of[-.72,.72]){const Ft=new U(new X(.1,.46,.48),a);Ft.position.set(Vt,.23,0),st.add(Ft)}st.add(yt,Pt),e.add(st),t.addBoxCenter(j,J,Math.abs(Math.cos(it))>.5?1.8:.65,Math.abs(Math.cos(it))>.5?.65:1.8)}S(-6.8,22.2,0),S(7.5,22.2,0),S(-15.5,-16.5,0),S(11.8,-34.2,0);const F=mc(16180920);F.position.set(-22.5,0,-5.2),F.rotation.y=Math.PI/2,e.add(F),t.addBoxCenter(-22.5,-5.2,3.3,1.7);const G=mc(11062752);G.position.set(22.8,0,-14.5),G.rotation.y=Math.PI/2,e.add(G),t.addBoxCenter(22.8,-14.5,3.3,1.7);const W=[[-26,-1.6],[-10,-1.6],[10,-1.6],[26,-1.6],[-26,5.6],[-8,5.6],[8,5.6],[26,5.6],[-16,-19.8],[11,-19.8],[-15,21.4],[15,21.4]],O=q(8157816),lt=new sr({color:3092280,transparent:!0,opacity:.6});W.forEach(([j,J],it)=>{const K=new U(new oe(.1,.14,6.2,7),O);K.position.set(j,3.1,J),K.castShadow=!0,e.add(K);const st=new U(new X(1.1,.1,.1),a);st.position.set(j,5.6,J),e.add(st);const yt=new U(new X(.1,.08,.85),a);yt.position.set(j,4.45,J+(J<2?.35:-.35)),e.add(yt);const Pt=new Le({color:16774100,emissive:16762739,emissiveIntensity:0,roughness:.3}),Vt=new U(new Fe(.17,8,8),Pt);Vt.position.set(j,4.35,J+(J<2?.72:-.72)),e.add(Vt);let Ft=null;it%2===0&&(Ft=new ts(16763776,0,15,1.6),Ft.position.set(j,4.1,J+(J<2?.72:-.72)),s.add(Ft)),n.streetLights.push({light:Ft,bulbMat:Pt,baseIntensity:1.8}),t.addCircle(j,J,.22)}),[[0,1],[1,2],[2,3],[4,5],[5,6],[6,7]].forEach(([j,J])=>{const[it,K]=W[j],[st,yt]=W[J],Pt=new bh(new L(it,5.55,K),new L((it+st)/2,4.85,(K+yt)/2),new L(st,5.55,yt)),Vt=new Me().setFromPoints(Pt.getPoints(10));e.add(new Jo(Vt,lt))});for(let j=-24;j<=24;j+=4.8){if(Math.abs(j)<3.5)continue;const J=new U(new oe(.04,.05,2.7,6),i);J.position.set(j,1.35,24.7),e.add(J);const it=new Le({color:16765662,emissive:16744606,emissiveIntensity:.08,roughness:.5}),K=new U(new Fe(.22,10,8),it);K.scale.set(.85,1.25,.85),K.position.set(j,2.52,24.7),e.add(K),n.festivalLanterns.push(it)}return n}function Pm(){const s=new Xt,t=q(3816517),e=q(14248828),n=new U(new ta(.28,.04,6,12),t);n.position.set(-.42,.3,0);const i=n.clone();i.position.x=.42;const r=new U(new X(.84,.06,.06),e);r.position.set(0,.55,0);const o=new U(new X(.06,.32,.46),q(12107463));o.position.set(.36,.72,0);const a=new U(new X(.24,.2,.28),q(12950121));return a.position.set(.5,.7,0),s.add(n,i,r,o,a),s}function mc(s){const t=new Xt,e=new U(new X(1.5,.65,3),q(s));e.position.y=.55,e.castShadow=!0;const n=new U(new X(1.38,.62,1.85),q(s));n.position.set(0,1.15,-.15),n.castShadow=!0;const i=new U(new X(1.42,.44,1.55),q(8166584));i.position.set(0,1.18,-.15);const r=q(3290173);for(const[o,a]of[[-.72,.92],[.72,.92],[-.72,-.92],[.72,-.92]]){const c=new U(new oe(.26,.26,.18,10),r);c.rotation.z=Math.PI/2,c.position.set(o,.26,a),t.add(c)}return t.add(e,n,i),t}class Lm{constructor(t,e){this.scene=t,this.worldRefs=e,this.timeMinutes=510,this.timeSpeed=1,this.isRaining=!1,this.festivalUnlocked=!1,this.homeLampOn=!0,this.nightFactor=0,this._setupLights(),this._setupSkyAndStars(),this._setupSakuraPetals(),this._setupRain()}_setupLights(){this.hemiLight=new Ph(16774376,8033904,.95),this.scene.add(this.hemiLight),this.sunLight=new Dh(16773590,1.55),this.sunLight.position.set(28,42,22),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.camera.near=5,this.sunLight.shadow.camera.far=140;const t=56;this.sunLight.shadow.camera.left=-t,this.sunLight.shadow.camera.right=t,this.sunLight.shadow.camera.top=t,this.sunLight.shadow.camera.bottom=-t,this.sunLight.shadow.bias=-7e-4,this.scene.add(this.sunLight),this.scene.fog=new Ko(14674162,.0062),this.scene.background=new Et(13427446)}_setupSkyAndStars(){const e=new Float32Array(660);for(let i=0;i<220;i++){const r=Math.random()*Math.PI*2,o=Math.random()*Math.PI*.42,a=135;e[i*3]=Math.sin(o)*Math.cos(r)*a,e[i*3+1]=Math.cos(o)*a+8,e[i*3+2]=Math.sin(o)*Math.sin(r)*a}const n=new Me;n.setAttribute("position",new Ze(e,3)),this.starMat=new Oo({color:16775398,size:1.35,transparent:!0,opacity:0,depthWrite:!1}),this.stars=new Oa(n,this.starMat),this.scene.add(this.stars)}_setupSakuraPetals(){this.petalData=[];const e=new Ye(.14,.1),n=new Fi({color:16765664,side:Je,transparent:!0,opacity:.9});this.petalMesh=new Vc(e,n,260),this.petalDummy=new _e;for(let i=0;i<260;i++)this.petalData.push({x:(Math.random()-.5)*90,y:1+Math.random()*14,z:(Math.random()-.5)*85,vx:.55+Math.random()*.55,vy:-(.35+Math.random()*.35),vz:(Math.random()-.5)*.4,phase:Math.random()*Math.PI*2});this.scene.add(this.petalMesh)}_setupRain(){const e=new Float32Array(1950);for(let i=0;i<650;i++)e[i*3]=(Math.random()-.5)*60,e[i*3+1]=Math.random()*24,e[i*3+2]=(Math.random()-.5)*60;const n=new Me;n.setAttribute("position",new Ze(e,3)),this.rainMat=new Oo({color:13361909,size:.22,transparent:!0,opacity:.65}),this.rainPoints=new Oa(n,this.rainMat),this.rainPoints.visible=!1,this.scene.add(this.rainPoints)}getHour(){return this.timeMinutes/60}getFormattedTime(){const t=Math.floor(this.timeMinutes)%1440,e=Math.floor(t/60),n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}getPeriodInfo(){const t=this.getHour();return t>=5&&t<10?{label:"早晨",icon:"🌅"}:t>=10&&t<16.5?{label:"白天",icon:"☀️"}:t>=16.5&&t<19.2?{label:"傍晚",icon:"🌇"}:{label:"夜晚",icon:"🌙"}}isCafeOpen(){const t=this.getHour();return t>=8&&t<21}update(t,e,n,i={}){this.timeMinutes=(this.timeMinutes+t*2.2*this.timeSpeed)%1440;const r=this.getHour(),o=new Et,a=new Et,c=new Et;let l=1.5,u=.95;if(r>=5&&r<8){const _=(r-5)/3;o.lerpColors(new Et(3818345),new Et(13427446),_),a.lerpColors(new Et(10320526),new Et(15134454),_),c.lerpColors(new Et(16757898),new Et(16773590),_),l=.45+_*1.1,u=.5+_*.45,this.nightFactor=1-_}else if(r>=8&&r<16.5)o.set(13034232),a.set(15003383),c.set(16774366),l=1.55,u=.95,this.nightFactor=0;else if(r>=16.5&&r<19.5){const _=(r-16.5)/3;if(_<.55){const m=_/.55;o.lerpColors(new Et(13034232),new Et(15902092),m),a.lerpColors(new Et(15003383),new Et(15974058),m),c.lerpColors(new Et(16774366),new Et(16751974),m),l=1.55-m*.45}else{const m=(_-.55)/.45;o.lerpColors(new Et(15902092),new Et(2041927),m),a.lerpColors(new Et(15974058),new Et(2436941),m),c.lerpColors(new Et(16751974),new Et(8954584),m),l=1.1-m*.72}u=.95-_*.58,this.nightFactor=Math.max(0,(_-.35)/.65)}else o.set(1778493),a.set(2239302),c.set(9546713),l=.36,u=.36,this.nightFactor=1;this.isRaining&&(o.lerp(new Et(8162974),.45),a.lerp(new Et(9149096),.45),l*=.65),this.scene.background.copy(o),this.scene.fog.color.copy(a),this.scene.fog.density=this.isRaining?.0095:.0058,this.sunLight.color.copy(c),this.sunLight.intensity=l,this.hemiLight.intensity=u;const d=(r-6)/12*Math.PI;r>=6&&r<=18.8?this.sunLight.position.set(Math.cos(d)*44,Math.max(10,Math.sin(d)*48),24):this.sunLight.position.set(-22,34,-18),this.starMat.opacity=Math.max(0,this.nightFactor-.2)*(this.isRaining?.15:.9);const p=Math.max(0,Math.min(1,(this.nightFactor-.1)*1.35));for(const _ of this.worldRefs.streetLights)_.light&&(_.light.intensity=p*_.baseIntensity),_.bulbMat&&(_.bulbMat.emissiveIntensity=p*2.2);for(const _ of this.worldRefs.shrineLanternMats)_.emissiveIntensity=.12+p*1.45;for(const _ of this.worldRefs.martLights)_.isLight?_.intensity=1.6+p*1.4:_.emissiveIntensity=.42+p*.68;const g=this.isCafeOpen();this.worldRefs.doors.cafe&&(this.worldRefs.doors.cafe.isClosedForNight=!g),this.worldRefs.cafeSignMat&&(this.worldRefs.cafeSignMat.emissiveIntensity=g?.35+p*.65:0);for(const _ of this.worldRefs.cafeLights)_.intensity=g?1.5+p*1:0;this.worldRefs.homeLampLight&&(this.worldRefs.homeLampLight.intensity=this.homeLampOn?1.9:0),this.worldRefs.homeLampShadeMat&&(this.worldRefs.homeLampShadeMat.emissiveIntensity=this.homeLampOn?.95:0);for(const[_,m]of Object.entries(this.worldRefs.houseWindows)){const E=i[_]??!1?Math.max(.22,p*1.15):p*.15;for(const w of m)w.emissiveIntensity=E}for(const _ of this.worldRefs.genericWindows)_.emissiveIntensity=p*.85;for(const _ of this.worldRefs.festivalLanterns)_.emissiveIntensity=this.festivalUnlocked?.7+p*1.2:p*.25;this.worldRefs.barberPole&&(this.worldRefs.barberPole.rotation.y+=t*1.8);for(let _=0;_<this.petalData.length;_++){const m=this.petalData[_];m.x+=(m.vx+Math.sin(e+m.phase)*.3)*t,m.y+=m.vy*t,m.z+=(m.vz+Math.cos(e*.8+m.phase)*.25)*t,m.y<.08&&(m.y=9+Math.random()*6,m.x=n.x+(Math.random()-.5)*60,m.z=n.z+(Math.random()-.5)*60),this.petalDummy.position.set(m.x,m.y,m.z),this.petalDummy.rotation.set(e*1.4+m.phase,e+m.phase,e*.7),this.petalDummy.updateMatrix(),this.petalMesh.setMatrixAt(_,this.petalDummy.matrix)}if(this.petalMesh.instanceMatrix.needsUpdate=!0,this.rainPoints.visible=this.isRaining,this.isRaining){const _=this.rainPoints.geometry.attributes.position;for(let m=0;m<_.count;m++){let h=_.getY(m)-18*t;h<0&&(h=22,_.setX(m,n.x+(Math.random()-.5)*46),_.setZ(m,n.z+(Math.random()-.5)*46)),_.setY(m,h)}_.needsUpdate=!0}}}class Im{constructor(t,e,n){this.scene=t,this.collision=e,this.audio=n,this.trackZ=-12,this.state="AWAY",this.timer=10,this.direction=1,this.trainX=-78,this.trainSpeed=0,this.doorOpen=0,this.crossingClosed=!1,this.gateAngle=0,this.flashTimer=0,this.bellTimer=0,this.isDelayed=!1,this.nextTrainCountdown=10,this.group=new Xt,t.add(this.group),this._buildTracksAndTunnels(),this._buildLevelCrossing(),this._buildTrain(),this.northGateCollider=e.addBox(-3.2,3.2,-13.9,-13.2,{active:!1,tag:"crossing"}),this.southGateCollider=e.addBox(-3.2,3.2,-10.6,-9.9,{active:!1,tag:"crossing"}),e.addBox(-55,-3.25,-13.6,-10.4,{tag:"trackFence"}),e.addBox(3.25,55,-13.6,-10.4,{tag:"trackFence"})}_buildTracksAndTunnels(){const t=q(9275522),e=q(6178614),n=q(5725542),i=q(7238523),r=new U(new X(144,.14,3),t);r.position.set(0,.05,this.trackZ),r.receiveShadow=!0,this.group.add(r);for(const _ of[-.62,.62]){const m=new U(new X(144,.1,.1),n);m.position.set(0,.17,this.trackZ+_),this.group.add(m)}const o=new X(.24,.08,2.05),a=130,c=new Vc(o,e,a),l=new _e;for(let _=0;_<a;_++)l.position.set(-65+_*1,.12,this.trackZ),l.updateMatrix(),c.setMatrixAt(_,l.matrix);this.group.add(c);for(let _=-56;_<=56;_+=14){if(Math.abs(_)<4)continue;const m=new U(new oe(.1,.13,5.4,7),i);m.position.set(_,2.7,this.trackZ+1.85),m.castShadow=!0;const h=new U(new X(.12,.12,2.2),i);h.position.set(_,4.9,this.trackZ+.85),this.group.add(m,h)}const u=new Me().setFromPoints([new L(-68,4.8,this.trackZ),new L(68,4.8,this.trackZ)]);this.group.add(new Jo(u,new sr({color:3685188})));const d=q(13552580);for(const[_,m]of[[-29,51],[29,51]]){const h=new U(new X(m,.78,.12),d);h.position.set(_,.4,this.trackZ+1.65),this.group.add(h)}const f=q(8158073),p=new Fi({color:1447968}),g=q(6525276);for(const _ of[-62,62]){const m=new Xt;m.position.set(_,0,this.trackZ);const h=new U(new X(1.4,5.4,6.2),f);h.position.y=2.7;const E=new U(new X(1.6,3.9,3.5),p);E.position.y=1.95;const w=new U(new He(16,15,8),g);w.position.set(_<0?-7.5:7.5,6.8,0),w.scale.set(1.2,1,1.35),m.add(h,E,w),this.group.add(m)}}_buildLevelCrossing(){const t=new Xt;this.group.add(t);const e=new U(new X(6.2,.17,2.9),q(8157557));e.position.set(0,.09,this.trackZ),e.receiveShadow=!0,t.add(e);const n=q(15778878),i=q(2632240);this.crossingLamps=[],this.gatePivots=[],[{x:-3.25,z:this.trackZ+1.85,rotY:0,armDir:1},{x:3.25,z:this.trackZ-1.85,rotY:Math.PI,armDir:-1}].forEach(o=>{const a=new Xt;a.position.set(o.x,0,o.z),a.rotation.y=o.rotY;for(let f=0;f<6;f++){const p=new U(new oe(.09,.09,.52,8),f%2===0?n:i);p.position.y=.26+f*.52,p.castShadow=!0,a.add(p)}const c=new U(new X(.92,.14,.06),n);c.position.set(0,2.75,.1),c.rotation.z=.72;const l=c.clone();l.rotation.z=-.72,a.add(c,l);const u=[];for(const f of[-.26,.26]){const p=new U(new oe(.14,.14,.16,10),i);p.rotation.x=Math.PI/2,p.position.set(f,2.22,.12);const g=new Le({color:5576728,emissive:16720418,emissiveIntensity:0,roughness:.3}),_=new U(new Fe(.11,8,8),g);_.position.set(f,2.22,.2),a.add(p,_),u.push(g)}this.crossingLamps.push(u);const d=new Xt;d.position.set(.15,.98,0);for(let f=0;f<8;f++){const p=new U(new X(.75,.1,.08),f%2===0?n:i);p.position.set(.38+f*.75,0,0),p.castShadow=!0,d.add(p)}a.add(d),this.gatePivots.push(d),t.add(a)})}_buildTrain(){this.trainGroup=new Xt,this.trainGroup.position.set(this.trainX,.24,this.trackZ),this.group.add(this.trainGroup),this.slidingDoors=[],this.trainInteriorMats=[],this.headlightMats=[];const t=q(16249574),e=q(15105176),n=q(8160142),i=q(3817031),r=q(15394008),o=c=>{const l=new Xt;l.position.x=c;const u=new U(new X(10.6,.45,2.35),i);u.position.y=.42,l.add(u);for(const h of[-3.4,3.4]){const E=new U(new X(1.7,.35,1.9),i);E.position.set(h,.22,0),l.add(E)}const d=new U(new X(10.8,2.45,2.52),t);d.position.y=1.85,d.castShadow=!0,d.receiveShadow=!0,l.add(d);const f=new U(new X(10.86,.32,2.56),e);f.position.y=1.28,l.add(f);const p=new U(new X(10.6,.28,2.38),n);p.position.y=3.16,p.castShadow=!0,l.add(p);for(const h of[-2.4,2.4]){const E=new U(new X(1.8,.24,1.2),q(12107463));E.position.set(h,3.4,0),l.add(E)}const g=new Le({color:14413567,emissive:16770221,emissiveIntensity:.35,roughness:.25});this.trainInteriorMats.push(g);for(const h of[-1.27,1.27])for(const E of[-3.9,0,3.9]){const w=new U(new X(2.1,.95,.05),g);w.position.set(E,2.1,h),l.add(w)}for(const h of[-1.29,1.29])for(const E of[-2.1,2.1]){const w=new U(new X(.62,1.85,.07),r);w.position.set(E-.32,1.68,h);const y=new U(new X(.62,1.85,.07),r);y.position.set(E+.32,1.68,h);const P=new U(new X(.42,.72,.09),g);P.position.y=.25;const R=P.clone();w.add(P),y.add(R),l.add(w,y),this.slidingDoors.push({mesh:w,closedX:E-.32,dir:-1}),this.slidingDoors.push({mesh:y,closedX:E+.32,dir:1})}const _=c>0?5.42:-5.42,m=new U(new X(.08,.95,1.9),g);m.position.set(_,2.15,0),l.add(m);for(const h of[-.72,.72]){const E=new Le({color:16775388,emissive:16770713,emissiveIntensity:.9}),w=new U(new Fe(.14,8,8),E);w.position.set(_,1.28,h),l.add(w),this.headlightMats.push(E)}this.trainGroup.add(l)};o(-5.7),o(5.7);const a=new U(new X(.9,2.2,1.8),i);a.position.set(0,1.8,0),this.trainGroup.add(a)}triggerDelay(t=18){this.isDelayed=!0,this.state==="AWAY"&&(this.timer+=t)}getStatusText(){return this.state==="DOORS_OPEN"?"桜駅 停车上下客中":this.state==="WARNING"||this.state==="APPROACHING"?"列车即将进站 · 道口已关闭":this.state==="DEPARTING"?"列车正驶离桜駅":this.isDelayed?`因春季强风微幅延误 (约 ${Math.ceil(this.timer)} 秒后到达)`:`下一班列车约 ${Math.ceil(this.timer)} 秒后进站`}update(t,e,n){if(this.state==="AWAY")this.timer-=t,this.nextTrainCountdown=Math.max(0,this.timer),this.crossingClosed=!1,this.trainGroup.visible=!1,this.timer<=0&&(this.state="WARNING",this.timer=5,this.crossingClosed=!0,this.direction=Math.random()<.5?1:-1,this.trainX=this.direction>0?-74:74,this.trainSpeed=16,this.trainGroup.visible=!0,this.isDelayed=!1);else if(this.state==="WARNING")this.timer-=t,this.crossingClosed=!0,this.timer<=0&&(this.state="APPROACHING");else if(this.state==="APPROACHING"){this.crossingClosed=!0;const c=-13.25,l=Math.abs(this.trainX-c),u=l<26?Math.max(1.8,l/26*15.5):16;this.trainSpeed+=(u-this.trainSpeed)*Math.min(1,t*4),this.trainX+=this.direction*this.trainSpeed*t,(this.direction>0&&this.trainX>=c||this.direction<0&&this.trainX<=c)&&(this.trainX=c,this.trainSpeed=0,this.state="DOORS_OPEN",this.timer=8.5,this.audio&&this.audio.playStationChime(e.distanceTo(new L(c,0,-14))))}else this.state==="DOORS_OPEN"?(this.crossingClosed=!0,this.doorOpen=Math.min(1,this.doorOpen+t*2.2),this.timer-=t,this.timer<=0&&(this.state="DOORS_CLOSING",this.timer=1.6)):this.state==="DOORS_CLOSING"?(this.crossingClosed=!0,this.doorOpen=Math.max(0,this.doorOpen-t*1.8),this.timer-=t,this.timer<=0&&(this.doorOpen=0,this.state="DEPARTING")):this.state==="DEPARTING"&&(this.trainSpeed=Math.min(17.5,this.trainSpeed+4.4*t),this.trainX+=this.direction*this.trainSpeed*t,(this.direction>0&&this.trainX>16||this.direction<0&&this.trainX<-24.5)&&(this.crossingClosed=!1),Math.abs(this.trainX)>76&&(this.state="AWAY",this.timer=28+Math.random()*14));this.trainGroup.position.x=this.trainX;for(let c=0;c<this.slidingDoors.length;c++){const l=this.slidingDoors[c];l.mesh.position.x=l.closedX+l.dir*this.doorOpen*.56}const i=.25+n*.85;for(const c of this.trainInteriorMats)c.emissiveIntensity=i;const r=this.crossingClosed?1:0;this.gateAngle+=(r-this.gateAngle)*Math.min(1,t*3.8);const o=(1-this.gateAngle)*1.38;for(const c of this.gatePivots)c.rotation.z=o;const a=this.gateAngle>.35;if(this.northGateCollider.active=a,this.southGateCollider.active=a,this.crossingClosed){this.flashTimer+=t;const c=Math.floor(this.flashTimer*2.6)%2;for(const[l,u]of this.crossingLamps)l.emissiveIntensity=c===0?2.4:.05,u.emissiveIntensity=c===1?2.4:.05;if(this.bellTimer-=t,this.bellTimer<=0){this.bellTimer=.48;const l=Math.hypot(e.x,e.z-this.trackZ);this.audio&&l<44&&this.audio.playCrossingBell(l)}}else for(const[c,l]of this.crossingLamps)c.emissiveIntensity=0,l.emissiveIntensity=0;if(this.audio){const c=this.state==="WARNING"||this.state==="APPROACHING"||this.state==="DEPARTING",l=Math.hypot(e.x-this.trainX,e.z-this.trackZ),u=c?Math.max(0,1-l/65)*(this.state==="WARNING"?.38:Math.min(1,this.trainSpeed/12)):0;this.audio.setTrainRumble(u)}}}class Dm{constructor(){this.ctx=null,this.muted=!1,this.masterGain=null,this.trainGain=null,this.rainGain=null,this.ambientTimer=2,this.ready=!1}unlock(){if(this.ready){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.muted?0:.45,this.masterGain.connect(this.ctx.destination);const e=this.ctx.sampleRate*2,n=this.ctx.createBuffer(1,e,this.ctx.sampleRate),i=n.getChannelData(0);for(let f=0;f<e;f++)i[f]=Math.random()*2-1;const r=this.ctx.createBufferSource();r.buffer=n,r.loop=!0;const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=340;const a=this.ctx.createGain();a.gain.value=.04,r.connect(o).connect(a).connect(this.masterGain),r.start();const c=this.ctx.createBufferSource();c.buffer=n,c.loop=!0;const l=this.ctx.createBiquadFilter();l.type="bandpass",l.frequency.value=110,l.Q.value=1.6,this.trainGain=this.ctx.createGain(),this.trainGain.gain.value=0,c.connect(l).connect(this.trainGain).connect(this.masterGain),c.start();const u=this.ctx.createBufferSource();u.buffer=n,u.loop=!0;const d=this.ctx.createBiquadFilter();d.type="bandpass",d.frequency.value=1250,d.Q.value=.7,this.rainGain=this.ctx.createGain(),this.rainGain.gain.value=0,u.connect(d).connect(this.rainGain).connect(this.masterGain),u.start(),this.ready=!0}toggleMute(){return this.muted=!this.muted,this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(this.muted?0:.45,this.ctx.currentTime,.05),this.muted}setTrainRumble(t){if(!this.ready||!this.trainGain)return;const e=Math.max(0,Math.min(1,t))*.28;this.trainGain.gain.setTargetAtTime(e,this.ctx.currentTime,.12)}setRain(t){!this.ready||!this.rainGain||this.rainGain.gain.setTargetAtTime(t?.11:0,this.ctx.currentTime,.35)}playCrossingBell(t){if(!this.ready||this.muted)return;const e=Math.max(0,1-t/44)*.14;if(e<=.005)return;const n=this.ctx.currentTime;for(const i of[710,768]){const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(i,n),o.gain.setValueAtTime(e,n),o.gain.exponentialRampToValueAtTime(.001,n+.34),r.connect(o).connect(this.masterGain),r.start(n),r.stop(n+.36)}}playMartChime(){if(!this.ready||this.muted)return;const t=this.ctx.currentTime;[740,587.3,440,587.3].forEach((n,i)=>{const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(n,t+i*.14),o.gain.setValueAtTime(.11,t+i*.14),o.gain.exponentialRampToValueAtTime(.001,t+i*.14+.28),r.connect(o).connect(this.masterGain),r.start(t+i*.14),r.stop(t+i*.14+.3)})}playStationChime(t){if(!this.ready||this.muted||t>45)return;const e=Math.max(.02,(1-t/45)*.12),n=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((i,r)=>{const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type="sine",o.frequency.setValueAtTime(i,n+r*.16),a.gain.setValueAtTime(e,n+r*.16),a.gain.exponentialRampToValueAtTime(.001,n+r*.16+.45),o.connect(a).connect(this.masterGain),o.start(n+r*.16),o.stop(n+r*.16+.48)})}playFootstep(t=!1){if(!this.ready||this.muted)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(t?135:175,e),n.frequency.exponentialRampToValueAtTime(55,e+.06),i.gain.setValueAtTime(.06,e),i.gain.exponentialRampToValueAtTime(.001,e+.065),n.connect(i).connect(this.masterGain),n.start(e),n.stop(e+.07)}playVendingClunk(){if(!this.ready||this.muted)return;const t=this.ctx.currentTime;[220,145].forEach((e,n)=>{const i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="square",i.frequency.setValueAtTime(e,t+n*.12),r.gain.setValueAtTime(.08,t+n*.12),r.gain.exponentialRampToValueAtTime(.001,t+n*.12+.11),i.connect(r).connect(this.masterGain),i.start(t+n*.12),i.stop(t+n*.12+.12)})}playShrineBell(){if(!this.ready||this.muted)return;const t=this.ctx.currentTime;for(let e=0;e<4;e++){const n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="triangle",n.frequency.setValueAtTime(1120+e*210,t+e*.06),i.gain.setValueAtTime(.08,t+e*.06),i.gain.exponentialRampToValueAtTime(.001,t+e*.06+.55),n.connect(i).connect(this.masterGain),n.start(t+e*.06),n.stop(t+e*.06+.58)}}playUiBlip(t=!1){if(!this.ready||this.muted)return;const e=this.ctx.currentTime,n=this.ctx.createOscillator(),i=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(t?780:520,e),i.gain.setValueAtTime(.06,e),i.gain.exponentialRampToValueAtTime(.001,e+.09),n.connect(i).connect(this.masterGain),n.start(e),n.stop(e+.1)}updateAmbient(t,e,n){if(!(!this.ready||this.muted)&&(this.setRain(n),this.ambientTimer-=t,this.ambientTimer<=0)){this.ambientTimer=3.5+Math.random()*4.5;const i=this.ctx.currentTime;if(e>.55)for(let r=0;r<3;r++){const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type="sine",o.frequency.setValueAtTime(3400,i+r*.09),a.gain.setValueAtTime(.015,i+r*.09),a.gain.exponentialRampToValueAtTime(5e-4,i+r*.09+.06),o.connect(a).connect(this.masterGain),o.start(i+r*.09),o.stop(i+r*.09+.07)}else if(!n){const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(1650,i),r.frequency.exponentialRampToValueAtTime(2250,i+.14),o.gain.setValueAtTime(.022,i),o.gain.exponentialRampToValueAtTime(5e-4,i+.22),r.connect(o).connect(this.masterGain),r.start(i),r.stop(i+.24)}}}}class Um{constructor(t,e,n){this.scene=t,this.collision=e,this.railway=n,this.npcs=[],this._spawnCoreResidents(),this._spawnBackgroundCommuters()}_buildHumanoidMesh({hairColor:t,topColor:e,bottomColor:n,apronColor:i=null,heightScale:r=1}){const o=new Xt,a=q(16769481),c=q(t),l=q(e),u=q(n),d=new X(.15,.54,.16),f=new U(d,u);f.position.set(-.1,.28,0),f.castShadow=!0;const p=new U(d,u);p.position.set(.1,.28,0),p.castShadow=!0;const g=new Xt;g.position.y=.58;const _=new U(new X(.4,.5,.24),l);if(_.position.y=.25,_.castShadow=!0,g.add(_),i!==null){const H=new U(new X(.42,.44,.26),q(i));H.position.set(0,.14,.01),g.add(H)}const m=new X(.12,.42,.13),h=new U(m,l);h.position.set(-.26,.26,0);const E=new U(m,l);E.position.set(.26,.26,0),g.add(h,E);const w=new U(new X(.16,.22,.1),q(16711422));w.position.set(.28,-.04,.08),w.visible=!1,g.add(w);const y=new U(new Fe(.2,12,10),a);y.position.y=.7,y.castShadow=!0;const P=new U(new Fe(.215,12,10,0,Math.PI*2,0,Math.PI*.6),c);P.position.y=.72;const R=new Fi({color:2236200}),A=new U(new Fe(.022,6,6),R);A.position.set(-.07,.7,.18);const I=A.clone();I.position.x=.07,g.add(y,P,A,I);const M=new Xt,v=new U(new oe(.014,.014,.9,6),q(5395808));v.position.set(.24,.86,.08);const C=new U(new He(.6,.22,9,1,!0),q(16114410,{transparent:!0,opacity:.82,side:Je}));return C.position.set(.24,1.32,.08),M.add(v,C),M.visible=!1,g.add(M),o.add(f,p,g),o.scale.setScalar(r),{root:o,leftLeg:f,rightLeg:p,leftArm:h,rightArm:E,torso:g,umbrella:M,bag:w}}_buildCatMesh(){const t=new Xt,e=q(16381422),n=q(14256714),i=q(3880246),r=new U(new X(.28,.24,.46),e);r.position.y=.22,r.castShadow=!0;const o=new U(new X(.3,.14,.22),n);o.position.set(0,.28,-.05);const a=new U(new Fe(.15,10,8),e);a.position.set(0,.34,.24),a.castShadow=!0;const c=new U(new He(.055,.12,4),n);c.position.set(-.08,.48,.24);const l=new U(new He(.055,.12,4),i);l.position.set(.08,.48,.24);const u=new U(new oe(.028,.035,.34,6),i);return u.position.set(0,.32,-.26),u.rotation.x=-.6,t.add(r,o,a,c,l,u),{root:t,tail:u,isCat:!0}}_spawnCoreResidents(){this.npcs.push({id:"kenji",name:"佐藤 健二",isCore:!0,speed:2.35,homePos:new L(26,0,-21.8),pos:new L(16.6,0,11.1),yaw:Math.PI,walkPhase:0,carryingBag:!1,isHome:!1,activity:"在喫茶こもれび冲泡咖啡",parts:this._buildHumanoidMesh({hairColor:3879728,topColor:16052198,bottomColor:4144198,apronColor:7030581}),getTarget(t,e,n){return n&&t>=18&&t<21.5&&!e?{x:4.2,z:22.4,activity:"在桜川畔欣赏夜樱灯火",home:!1,indoors:!1}:t>=8&&t<21?{x:16.6,z:11.1,activity:"在喫茶こもれび营业中",home:!1,indoors:!0}:t>=6.8&&t<8?{x:15,z:5.5,activity:"正在开店准备",home:!1,indoors:!1}:{x:26,z:-21.8,activity:"已打烊回家休息",home:!0,indoors:!0}}}),this.npcs.push({id:"aoi",name:"高桥 葵",isCore:!0,speed:2.55,homePos:new L(31,0,15.2),pos:new L(-17.4,0,11.1),yaw:0,walkPhase:1,carryingBag:!1,isHome:!1,activity:"在桜マート值班",parts:this._buildHumanoidMesh({hairColor:6045234,topColor:16711422,bottomColor:3951460,apronColor:5022069,heightScale:.94}),getTarget(t,e,n){return n&&t>=18.5&&t<21&&!e?{x:-4.2,z:22.4,activity:"在河畔公园赏灯",home:!1,indoors:!1}:t>=13&&t<14.5&&!e?{x:-6.8,z:21.2,activity:"在桜川公园午休吹风",home:!1,indoors:!1}:t>=7&&t<22?{x:-17.4,z:11.1,activity:"在桜マート值班",home:!1,indoors:!0}:{x:31,z:15.2,activity:"下班回到公寓休息",home:!0,indoors:!0}}}),this.npcs.push({id:"haru",name:"铃木 ハル",isCore:!0,speed:1.85,homePos:new L(-31,0,15.2),pos:new L(14,3,-35.8),yaw:0,walkPhase:2,carryingBag:!1,isHome:!1,activity:"在桜神社散步参拜",parts:this._buildHumanoidMesh({hairColor:13158092,topColor:10190248,bottomColor:5657180,heightScale:.9}),getTarget(t,e,n){return e&&t>=9&&t<19?{x:12.2,z:11.4,activity:"在喫茶こもれび躲雨喝茶",home:!1,indoors:!0}:n&&t>=18&&t<21&&!e?{x:-8.5,z:22.3,activity:"在河畔看樱花灯笼",home:!1,indoors:!1}:t>=7&&t<11?{x:14.2,z:-36.2,activity:"在桜神社晨间参拜",home:!1,indoors:!1}:t>=11&&t<15?{x:-5.2,z:22.5,activity:"在桜川河畔赏樱",home:!1,indoors:!1}:t>=15&&t<18.5?{x:12.2,z:11.4,activity:"在喫茶こもれび喝下午茶",home:!1,indoors:!0}:{x:-31,z:15.2,activity:"在家中品茶休息",home:!0,indoors:!0}}}),this.npcs.push({id:"ren",name:"田中 レン",isCore:!0,speed:2.65,homePos:new L(5.5,0,-24.5),pos:new L(-11.5,.45,-15.5),yaw:0,walkPhase:3,carryingBag:!1,isHome:!1,activity:"在桜駅月台候车",parts:this._buildHumanoidMesh({hairColor:2500660,topColor:13204317,bottomColor:3884114,heightScale:1.02}),getTarget(t,e,n){return n&&t>=18.5&&t<21.5&&!e?{x:7.5,z:21.6,activity:"在河畔写生夜樱灯火",home:!1,indoors:!1}:t>=7.5&&t<11.5?{x:-11.5,z:-15.5,activity:"在桜駅月台候车",home:!1,indoors:!1}:t>=11.5&&t<14.5?{x:-13.6,z:9.2,activity:"在桜マート买午餐和咖啡",home:!1,indoors:!0,buyBag:!0}:t>=14.5&&t<18.5&&!e?{x:9.2,z:22.6,activity:"在桜川边画电车素描",home:!1,indoors:!1}:t>=18.5&&t<20.5?{x:13.8,z:9,activity:"在喫茶こもれび整理画稿",home:!1,indoors:!0}:{x:5.5,z:-24.5,activity:"在公寓里赶插画稿",home:!0,indoors:!0}}}),this.npcs.push({id:"mike",name:"ミケ",isCore:!0,isCat:!0,speed:1.45,homePos:new L(12.2,0,5.6),pos:new L(12,0,5.6),yaw:0,walkPhase:0,carryingBag:!1,isHome:!1,activity:"在咖啡馆门口晒太阳",parts:this._buildCatMesh(),getTarget(t,e){return e?{x:-10.5,z:-20.2,activity:"在桜駅候车室躲雨打盹",home:!1,indoors:!0}:t>=7&&t<12?{x:12,z:5.6,activity:"在喫茶こもれび门口晒太阳",home:!1,indoors:!1}:t>=12&&t<16.5?{x:2.8,z:22.6,activity:"在桜川桥边看水流",home:!1,indoors:!1}:{x:18.5,z:-36,activity:"在桜神社樱花树下巡逻",home:!1,indoors:!1}}}),this.npcs.forEach(t=>{t.parts.root.position.copy(t.pos),this.scene.add(t.parts.root)})}_spawnBackgroundCommuters(){[{id:"bg_1",name:"小镇通勤者",speed:2.4,pos:new L(4.5,0,2),route:[{x:4.5,z:2},{x:.8,z:2},{x:.8,z:-23},{x:-11.5,z:-23},{x:-9.2,z:-15.5,stationWait:!0},{x:-11.5,z:-23},{x:.8,z:-23},{x:.8,z:2},{x:-18,z:2}],colors:{hairColor:3026486,topColor:5202298,bottomColor:3487552}},{id:"bg_2",name:"散步的邻居",speed:1.9,pos:new L(-18,0,22.5),route:[{x:-18,z:22.5},{x:18,z:22.5},{x:18,z:2.2},{x:-18,z:2.2}],colors:{hairColor:4667438,topColor:14264203,bottomColor:4936798}},{id:"bg_3",name:"放学路过的学生",speed:2.5,pos:new L(12,0,-21.8),route:[{x:12,z:-21.8},{x:-1.4,z:-21.8},{x:-1.4,z:3.5},{x:-15,z:5.4},{x:-1.4,z:3.5},{x:-1.4,z:-21.8}],colors:{hairColor:2236972,topColor:16054009,bottomColor:2964052}}].forEach(e=>{const n=this._buildHumanoidMesh({...e.colors,heightScale:.96});n.root.position.copy(e.pos),this.scene.add(n.root),this.npcs.push({id:e.id,name:e.name,isCore:!1,speed:e.speed,pos:e.pos,yaw:0,walkPhase:Math.random()*5,route:e.route,routeIdx:0,waitTimer:0,parts:n})})}_computeNextStepTarget(t,e){if(Math.hypot(e.x-t.x,e.z-t.z)<1.5)return e;const i=t.z<-13.2,r=e.z<-13.2;if(i!==r)return Math.abs(t.x)>2.2?{x:0,z:i?-21.5:2}:{x:0,z:r?-19.5:-2};const o=t.z<-31&&t.x>8,a=e.z<-31&&e.x>8;if(o!==a)return Math.abs(t.x-16)>2?{x:16,z:o?-34.5:-22.5}:{x:16,z:a?-34.5:-22.5};const c=t.x>-20&&t.x<-10&&t.z>6.8&&t.z<14.2,l=e.x>-20&&e.x<-10&&e.z>6.8&&e.z<14.2;if(c!==l)return{x:-15,z:c?5.6:6.4};const u=t.x>10&&t.x<20&&t.z>6.8&&t.z<14.2,d=e.x>10&&e.x<20&&e.z>6.8&&e.z<14.2;if(u!==d)return{x:15,z:u?5.6:6.4};const f=t.x>-22.6&&t.x<-4&&t.z>-22.6&&t.z<-14,p=e.x>-22.6&&e.x<-4&&e.z>-22.6&&e.z<-14;return!f&&p&&Math.abs(t.x- -11.5)>1.8?{x:-11.5,z:-23.4}:f&&!p&&t.z>-22.4?{x:-11.5,z:-23.6}:Math.abs(e.x-t.x)>9&&t.z>6&&t.z<18&&e.z>6&&e.z<18?{x:t.x,z:2.2}:e}update(t,e,n,i,r,o=null){const a={};for(const c of this.npcs){let l=null,u=!1;if(c.isCore){const h=c.getTarget(e,n,i);l={x:h.x,z:h.z},c.activity=h.activity,c.isHome=!!h.home,u=!!h.indoors,h.buyBag&&(c.carryingBag=!0),h.home&&(c.carryingBag=!1),a[c.id]=c.isHome&&Math.hypot(c.pos.x-h.x,c.pos.z-h.z)<2.2}else{const h=c.route[c.routeIdx];l=h,Math.hypot(h.x-c.pos.x,h.z-c.pos.z)<.85&&(h.stationWait&&this.railway.state!=="DOORS_OPEN"?c.waitTimer=.5:c.waitTimer<=0&&(c.waitTimer=1.6+Math.random()*2,c.routeIdx=(c.routeIdx+1)%c.route.length)),c.waitTimer>0&&(c.waitTimer-=t)}if(o===c.id){const h=r.x-c.pos.x,E=r.z-c.pos.z;c.yaw=Math.atan2(h,E),c.parts.root.rotation.y=c.yaw,this._setIdleAnim(c,n,u);continue}const d=this._computeNextStepTarget(c.pos,l),f=d.x-c.pos.x,p=d.z-c.pos.z,g=Math.hypot(f,p);let _=!1;if(this.railway.crossingClosed&&Math.abs(c.pos.x)<3.6){const h=c.pos.z>-10.5&&c.pos.z<-8.2&&p<-.1,E=c.pos.z<-13.6&&c.pos.z>-16.2&&p>.1;(h||E)&&(_=!0)}if(g>.35&&!_&&(!c.waitTimer||c.waitTimer<=0)){const h=f/g*c.speed,E=p/g*c.speed,w=c.pos.x+h*t,y=c.pos.z+E*t,P=this.collision.resolve(w,y,.34,["cafeDoor"]);c.pos.x=P.x,c.pos.z=P.z,c.pos.y=this.collision.getGroundHeight(P.x,P.z);let A=Math.atan2(h,E)-c.yaw;for(;A>Math.PI;)A-=Math.PI*2;for(;A<-Math.PI;)A+=Math.PI*2;c.yaw+=A*Math.min(1,t*8),c.walkPhase+=t*(c.isCat?10:7.5),this._setWalkAnim(c,n,u)}else this._setIdleAnim(c,n,u);c.parts.root.position.copy(c.pos),c.parts.root.rotation.y=c.yaw}return a}_setWalkAnim(t,e,n){const i=t.parts;if(i.isCat){i.tail.rotation.z=Math.sin(t.walkPhase*.7)*.45,i.root.position.y=t.pos.y+Math.abs(Math.sin(t.walkPhase))*.03;return}const r=Math.sin(t.walkPhase)*.48;i.leftLeg.rotation.x=r,i.rightLeg.rotation.x=-r,i.leftArm.rotation.x=-r*.7,i.rightArm.rotation.x=r*.7,i.umbrella.visible=e&&!n,i.bag.visible=!!t.carryingBag}_setIdleAnim(t,e,n){const i=t.parts;if(i.isCat){i.tail.rotation.z=Math.sin(performance.now()*.004)*.35;return}i.leftLeg.rotation.x*=.85,i.rightLeg.rotation.x*=.85,i.leftArm.rotation.x*=.85,i.rightArm.rotation.x*=.85,i.umbrella.visible=e&&!n,i.bag.visible=!!t.carryingBag}getCoreNPC(t){return this.npcs.find(e=>e.id===t)}}const Zr="sakura_town_save_v1",ns={canned_coffee:{id:"canned_coffee",name:"罐装热咖啡",icon:"☕",consumable:!0,desc:"自动售货机买到的温热咖啡，散发淡淡烘焙香。"},green_tea:{id:"green_tea",name:"樱花绿茶",icon:"🍵",consumable:!0,desc:"清爽回甘的春日限定绿茶。"},onigiri:{id:"onigiri",name:"鲑鱼饭团",icon:"🍙",consumable:!0,desc:"桜マート的人气三角饭团。"},fish_snack:{id:"fish_snack",name:"小鱼干零食",icon:"🐟",consumable:!1,desc:"三花猫ミケ最喜欢的香脆小鱼干。"},coffee_parcel:{id:"coffee_parcel",name:"咖啡豆包裹",icon:"📦",consumable:!1,desc:"寄给喫茶こもれび佐藤健二店长的烘焙豆包裹。"},old_photo:{id:"old_photo",name:"旧樱花照片",icon:"🖼️",consumable:!1,desc:"微微泛黄的照片，拍着二十年前的樱花车站与河岸。"},sakura_charm:{id:"sakura_charm",name:"樱花御守",icon:"🌸",consumable:!1,desc:"ミケ带来的一枚小小樱花护身符，带着木头与花瓣香气。"}},Jc=[{id:"welcome_letter",title:"家门口的欢迎信",hint:"查看桜荘门前的红色信箱，再去商店街的「喫茶 こもれび」向店长佐藤健二打招呼。",desc:"刚搬进桜荘的第一天，门前信箱似乎插着一封邻居留下的信。"},{id:"coffee_parcel",title:"车站里的咖啡豆包裹",hint:"前往北边的「桜駅候车室」木架取回咖啡豆包裹，交给喫茶 こもれび的佐藤健二。",desc:"健二店长订购的春日烘焙豆送到了桜駅寄存架，但他正忙着照看咖啡馆。"},{id:"haru_photo",title:"遗落在山脚的旧照片",hint:"沿着东北方的山脚林道探索「旧木屋」，找回铃木奶奶遗失的旧照片并还给她。",desc:"铃木ハル奶奶散步时不慎把珍藏的樱花小镇旧照片忘在了东边林道的小屋旁。"},{id:"warm_coffee_for_ren",title:"给候车画师的热咖啡",hint:"在任意「自动售货机」买一罐热咖啡并取出，送给自由插画师田中レン。",desc:"高桥葵说田中レン最近为了赶插画稿天天往返车站，一罐热咖啡一定能让他精神起来。"},{id:"feed_mike",title:"与三花猫ミケ交朋友",hint:"带着小鱼干零食（可在桜マート购买或由高桥葵赠送），找到小镇三花猫ミケ喂它。",desc:"小镇吉祥物三花猫ミケ常在神社、咖啡馆门口和河岸公园之间散步。"},{id:"spring_lantern_night",title:"桜川畔的春日灯火",hint:"完成至少3件小镇记事后，前往商店街口的「桜町 掲示板」点亮河畔樱花灯笼！",desc:"大家一起筹备的河畔夜樱点灯就要开始了，点亮灯笼后傍晚和夜晚的河岸会焕然一新。"}],Qc={kenji:{id:"kenji",name:"佐藤 健二",role:"喫茶 こもれび 店长",relation:"高桥葵的舅舅 · 小镇热心人",homeName:"北巷东侧木屋",bio:"经营昭和风老咖啡馆十余年，每天早上八点准时拉开木门，晚上九点打烊回家。"},aoi:{id:"aoi",name:"高桥 葵",role:"桜マート 便利店员",relation:"健二的侄女 · 田中レン的熟人",homeName:"东南侧公寓",bio:"笑容爽朗的便利店店员，最熟悉小镇每个角落的八卦和自动售货机库存。"},haru:{id:"haru",name:"铃木 ハル",role:"退休小学教师",relation:"从小看着健二长大的长辈",homeName:"西南静巷老宅",bio:"喜欢在清晨登上桜神社参拜，午后去河畔长椅赏樱，珍藏着小镇几十年的记忆。"},ren:{id:"ren",name:"田中 レン",role:"自由插画师 / 通勤族",relation:"桜マート常客 · 热爱铁道写生",homeName:"北巷公寓",bio:"常在桜駅搭车往返邻镇交稿，傍晚喜欢坐在河畔画下经过的樱花电车。"},mike:{id:"mike",name:"ミケ (小花)",role:"小镇吉祥物三花猫",relation:"全镇居民共同的邻居",homeName:"随风而居",bio:"一只温顺亲人的三花猫，听说它总能发现小镇里藏着的小小幸运。"}};class Nm{constructor(){this.resetDefaults(),this.hasSavedData=!1,this.load()}resetDefaults(){this.yen=600,this.inventory=[],this.selectedSlot=0,this.knownResidents={},this.friendship={kenji:0,aoi:0,haru:0,ren:0,mike:0},this.quests={welcome_letter:"active",coffee_parcel:"locked",haru_photo:"locked",warm_coffee_for_ren:"locked",feed_mike:"locked",spring_lantern_night:"locked"},this.flags={readWelcomeLetter:!1,pickedParcel:!1,pickedOldPhoto:!1,cafeCoffeeServed:!1,festivalUnlocked:!1,homeLampOn:!0,lastOmikuji:""},this.unlockedLocations={shrine:!1,hiddenShed:!1},this.savedTimeMinutes=510,this.activeEvent=null,this.eventCooldown=35}hasItem(t){return this.inventory.some(e=>e.id===t&&e.count>0)}addItem(t,e=1){const n=this.inventory.find(i=>i.id===t);n?n.count+=e:this.inventory.length<5?this.inventory.push({id:t,count:e}):this.inventory.push({id:t,count:e}),this.save()}removeItem(t,e=1){const n=this.inventory.findIndex(i=>i.id===t);return n===-1?!1:(this.inventory[n].count-=e,this.inventory[n].count<=0&&this.inventory.splice(n,1),this.selectedSlot>=this.inventory.length&&(this.selectedSlot=Math.max(0,this.inventory.length-1)),this.save(),!0)}meetResident(t){return this.knownResidents[t]?!1:(this.knownResidents[t]=!0,this.save(),!0)}addFriendship(t,e=1){this.meetResident(t),this.friendship[t]=Math.min(3,(this.friendship[t]||0)+e),this.save()}setQuest(t,e){if(this.quests[t]==="done"&&e!=="done")return;this.quests[t]=e,this.getCompletedQuestCount()>=3&&this.quests.spring_lantern_night==="locked"&&(this.quests.spring_lantern_night="active"),this.save()}getCompletedQuestCount(){return Object.values(this.quests).filter(t=>t==="done").length}getPrimaryActiveQuest(){for(const t of Jc)if(this.quests[t.id]==="active")return t;return null}save(t=null){t!==null&&(this.savedTimeMinutes=t);try{const e={yen:this.yen,inventory:this.inventory,knownResidents:this.knownResidents,friendship:this.friendship,quests:this.quests,flags:this.flags,unlockedLocations:this.unlockedLocations,savedTimeMinutes:this.savedTimeMinutes};localStorage.setItem(Zr,JSON.stringify(e)),this.hasSavedData=!0}catch{}}load(){try{const t=localStorage.getItem(Zr);if(!t)return!1;const e=JSON.parse(t);return typeof e.yen=="number"&&(this.yen=e.yen),Array.isArray(e.inventory)&&(this.inventory=e.inventory),e.knownResidents&&(this.knownResidents=e.knownResidents),e.friendship&&(this.friendship={...this.friendship,...e.friendship}),e.quests&&(this.quests={...this.quests,...e.quests}),e.flags&&(this.flags={...this.flags,...e.flags}),e.unlockedLocations&&(this.unlockedLocations={...this.unlockedLocations,...e.unlockedLocations}),typeof e.savedTimeMinutes=="number"&&(this.savedTimeMinutes=e.savedTimeMinutes),this.hasSavedData=!0,!0}catch{return!1}}clearSave(){try{localStorage.removeItem(Zr)}catch{}this.resetDefaults(),this.hasSavedData=!1}updateEvents(t,e,n,i){if(this.activeEvent){this.activeEvent.remaining-=t,this.activeEvent.remaining<=0&&(this.activeEvent=null,this.eventCooldown=55+Math.random()*30);return}if(this.eventCooldown-=t,this.eventCooldown<=0){const r=[{id:"train_delay",title:"🚃 列车微幅延误",desc:"因山谷春风较强，桜線下一班列车将稍晚十余秒进站。",duration:38,trigger:()=>e.triggerDelay(16)},{id:"cafe_aroma",title:"☕ こもれび 刚烘好新豆",desc:"商店街飘来浓郁的咖啡香气，去喫茶こもれび坐坐吧。",duration:42,trigger:()=>{}},{id:"sakura_gust",title:"🌸 樱吹雪时刻",desc:"微风吹过樱川河畔，粉色花瓣正缓缓飘落小镇街道。",duration:36,trigger:()=>{}}],o=r[Math.floor(Math.random()*r.length)];this.activeEvent={...o,remaining:o.duration},o.trigger(),i&&i(`${o.title}：${o.desc}`)}}}class Fm{constructor({player:t,worldRefs:e,npcManager:n,gameState:i,atmosphere:r,railway:o,audio:a,ui:c}){this.player=t,this.worldRefs=e,this.npcManager=n,this.gameState=i,this.atmosphere=r,this.railway=o,this.audio=a,this.ui=c,this.currentTarget=null,this.shrineBellSwing=0,this._syncWorldVisuals()}_syncWorldVisuals(){this.worldRefs.stationParcelMesh&&(this.worldRefs.stationParcelMesh.visible=!this.gameState.flags.pickedParcel),this.worldRefs.lostPhotoMesh&&(this.worldRefs.lostPhotoMesh.visible=!this.gameState.flags.pickedOldPhoto),this.worldRefs.mailboxFlag&&(this.worldRefs.mailboxFlag.rotation.z=this.gameState.flags.readWelcomeLetter?-1.2:0),this.worldRefs.cafeCoffeeCup&&(this.worldRefs.cafeCoffeeCup.visible=!!this.gameState.flags.cafeCoffeeServed),this.atmosphere.homeLampOn=this.gameState.flags.homeLampOn,this.atmosphere.festivalUnlocked=!!this.gameState.flags.festivalUnlocked}update(t){const e=this.player.position,n=this.worldRefs.doors;if(n.mart){let a=e.distanceTo(n.mart.doorPos)<3.1;if(!a){for(const c of this.npcManager.npcs)if(c.pos.distanceTo(n.mart.doorPos)<2.6){a=!0;break}}a&&!n.mart.wasOpen&&e.distanceTo(n.mart.doorPos)<12&&this.audio.playMartChime(),n.mart.wasOpen=a,n.mart.targetOpen=a?1:0,n.mart.update(t)}if(n.cafe){const a=e.distanceTo(n.cafe.doorPos)<2.6||this.npcManager.npcs.some(c=>c.pos.distanceTo(n.cafe.doorPos)<2.2);n.cafe.targetOpen=a?1:0,n.cafe.update(t)}if(n.home){const a=e.distanceTo(n.home.doorPos)<2.5;n.home.targetOpen=a?1:0,n.home.update(t)}if(this.shrineBellSwing>.01&&this.worldRefs.shrineBellGroup&&(this.shrineBellSwing*=Math.pow(.18,t),this.worldRefs.shrineBellGroup.rotation.z=Math.sin(performance.now()*.018)*this.shrineBellSwing),!this.gameState.unlockedLocations.shrine&&e.x>10&&e.z<-33&&(this.gameState.unlockedLocations.shrine=!0,this.gameState.save(this.atmosphere.timeMinutes),this.ui.toast("⛩️ 发现地点：桜神社展望台 — 可以俯瞰整座樱花小镇！")),!this.gameState.unlockedLocations.hiddenShed&&e.x>31&&e.z<-20&&e.z>-30&&(this.gameState.unlockedLocations.hiddenShed=!0,this.gameState.save(this.atmosphere.timeMinutes),this.ui.toast("🌲 发现隐藏地点：山脚林道的旧木屋")),this.ui.isOverlayOpen()||this.player.sitting){this.currentTarget=null,this.ui.setInteractPrompt(null);return}const i=this._gatherInteractables();let r=null,o=1/0;for(const a of i){const c=Math.hypot(e.x-a.x,e.z-a.z),l=Math.abs(e.y-(a.y??0));c<=(a.range??2.3)&&l<2.2&&c<o&&(r=a,o=c)}this.currentTarget=r,this.ui.setInteractPrompt(r?r.label:null)}triggerCurrent(){if(this.player.sitting){this.player.standUp(),this.ui.setSitting(!1);return}this.currentTarget&&(this.audio.playUiBlip(!0),this.currentTarget.action(),this._syncWorldVisuals(),this.ui.refreshHud())}_gatherInteractables(){const t=[];for(const n of this.npcManager.npcs)n.isCore&&t.push({x:n.pos.x,y:n.pos.y,z:n.pos.z,range:2.6,label:n.isCat?`抚摸 / 互动：${n.name}`:`交谈：${n.name}`,action:()=>this._talkToResident(n)});for(const n of this.worldRefs.vendingMachines)t.push({x:n.pos.x,y:0,z:n.pos.z,range:2.2,label:n.hasDispensedCan?"取出取货口的饮料罐":"自动售货机 · 购买饮料 (¥120)",action:()=>this._useVendingMachine(n)});t.push({x:-23.2,y:0,z:-23.2,range:2.9,label:this.gameState.flags.readWelcomeLetter?"查看桜荘信箱":"阅读信箱里的欢迎信 ✉️",action:()=>this._interactMailbox()}),t.push({x:-23.2,y:0,z:-29.3,range:2.2,label:this.atmosphere.homeLampOn?"关闭和纸落地灯":"点亮和纸落地灯",action:()=>{this.atmosphere.homeLampOn=!this.atmosphere.homeLampOn,this.gameState.flags.homeLampOn=this.atmosphere.homeLampOn,this.gameState.save(this.atmosphere.timeMinutes),this.ui.toast(this.atmosphere.homeLampOn?"💡 房间里的和纸灯亮起了暖光。":"房间灯光已关闭。")}}),t.push({x:-28.2,y:0,z:-28.2,range:2.3,label:"在被褥休息至清晨 07:30 并存档",action:()=>{this.atmosphere.timeMinutes=450,this.atmosphere.isRaining=!1,this.gameState.save(this.atmosphere.timeMinutes),this.ui.toast("🌙 睡了个好觉……清晨的樱花微风吹进窗来（已自动存档）。")}}),t.push({x:-16.8,y:0,z:11.4,range:2.4,label:"桜マート · 选购商品",action:()=>this._openMartShop()}),this.atmosphere.isCafeOpen()?t.push({x:16.4,y:0,z:11.4,range:2.5,label:"喫茶 こもれび · 点单手冲咖啡 (¥250)",action:()=>this._orderCafeCoffee()}):t.push({x:15,y:0,z:6.3,range:2.2,label:"查看喫茶 こもれび门牌",action:()=>this.ui.toast("☕ 木牌翻到了「本日打烊」，营业时间为 08:00 – 21:00。")}),this.gameState.flags.pickedParcel||t.push({x:-14.6,y:0,z:-19.8,range:2.2,label:"拿取寄存架上的「咖啡豆包裹」📦",action:()=>{this.gameState.flags.pickedParcel=!0,this.gameState.addItem("coffee_parcel",1),this.gameState.quests.coffee_parcel==="locked"&&this.gameState.setQuest("coffee_parcel","active"),this.ui.toast("📦 拿到了寄给喫茶こもれび的「咖啡豆包裹」！")}}),this.gameState.flags.pickedOldPhoto||t.push({x:34.7,y:0,z:-23.6,range:2.4,label:"拾起木箱上泛黄的「旧樱花照片」🖼️",action:()=>{this.gameState.flags.pickedOldPhoto=!0,this.gameState.addItem("old_photo",1),this.gameState.quests.haru_photo==="locked"&&this.gameState.setQuest("haru_photo","active"),this.ui.toast("🖼️ 拾起了「旧樱花照片」！背面写着「铃木ハル 留念」。")}}),t.push({x:16,y:3,z:-39.6,range:2.6,label:"桜神社 · 投币参拜摇铃 (¥5)",action:()=>this._prayAtShrine()}),t.push({x:-5.4,y:0,z:-2.4,range:2.5,label:"查看「桜町 掲示板」",action:()=>this._openNoticeBoard()}),t.push({x:-26.5,y:0,z:7,range:2.2,label:"桜郵便局 · 红色邮筒",action:()=>this.ui.toast("📮 邮筒上贴着班次表：每日上午10点与下午4点收件。")});const e=[{x:-6.8,z:22.2,yaw:0,label:"坐在河畔西侧长椅休息"},{x:7.5,z:22.2,yaw:0,label:"坐在河畔东侧长椅看樱川"},{x:-15.5,z:-16.5,yaw:0,label:"坐在桜駅月台长椅等列车"},{x:11.8,z:-34.2,yaw:0,label:"坐在神社展望台长椅俯瞰小镇"},{x:11.35,z:10.1,yaw:Math.PI/2,label:"坐在喫茶 こもれび靠窗木椅"}];for(const n of e){const i=this.player.collision.getGroundHeight(n.x,n.z);t.push({x:n.x,y:i,z:n.z,range:1.9,label:n.label,action:()=>{this.player.sitDown(new L(n.x,i,n.z),n.yaw),this.ui.setSitting(!0)}})}return t}_useVendingMachine(t){if(t.hasDispensedCan){t.hasDispensedCan=!1,t.canMesh.visible=!1;const e=ns[t.dispensedItemId];this.gameState.addItem(t.dispensedItemId,1),this.ui.toast(`${e.icon} 取出了「${e.name}」！`);return}this.ui.openDialogue({speaker:"自动售货机",role:"つめたい · あたたかい",hearts:0,text:"机器微微发出制冷与保温的嗡嗡声。要投币购买哪一款饮料？（每罐 ¥120）",choices:[{label:"☕ 罐装热咖啡 (¥120)",onSelect:()=>this._dispenseFromVM(t,"canned_coffee")},{label:"🍵 樱花绿茶 (¥120)",onSelect:()=>this._dispenseFromVM(t,"green_tea")},{label:"先不买了",onSelect:()=>{}}]})}_dispenseFromVM(t,e){if(this.gameState.yen<120){this.ui.toast("零钱不够了（需要 ¥120）。");return}this.gameState.yen-=120,this.gameState.save(this.atmosphere.timeMinutes),this.audio.playVendingClunk(),t.hasDispensedCan=!0,t.dispensedItemId=e,t.canMesh.visible=!0,t.canMesh.material.color.setHex(e==="canned_coffee"?12876606:6272371),this.ui.toast("哐当！饮料罐掉进了下方取货口，再按 E 即可取出。")}_interactMailbox(){this.gameState.flags.readWelcomeLetter=!0,this.gameState.save(this.atmosphere.timeMinutes),this.ui.openNotice("✉️ 桜荘信箱 · 欢迎来到樱花小镇",`<div class="notice-section">
        <h4>来自「喫茶 こもれび」佐藤健二的便签</h4>
        <p>新邻居你好！欢迎搬进樱花小镇的桜荘。</p>
        <p>沿门前小路向东过铁路道口，就是商店街了。有空的话欢迎推开街东侧「喫茶 こもれび」的木门，请你喝一杯刚磨好的春季手冲咖啡！</p>
        <p style="margin-top:8px;color:#c95f7d;">—— 佐藤 健二（营业时间 08:00 – 21:00）</p>
      </div>`)}_openMartShop(){this.ui.openDialogue({speaker:"桜マート 收银台",role:"24小时营业",hearts:0,text:"欢迎光临桜マート！货架上摆着刚补货的春日点心与饮品。",choices:[{label:"🍙 鲑鱼饭团 (¥150)",onSelect:()=>this._buyShopItem("onigiri",150)},{label:"🐟 小鱼干零食 (¥140)",onSelect:()=>this._buyShopItem("fish_snack",140)},{label:"🍵 樱花绿茶 (¥120)",onSelect:()=>this._buyShopItem("green_tea",120)},{label:"随便看看",onSelect:()=>{}}]})}_buyShopItem(t,e){if(this.gameState.yen<e){this.ui.toast(`零钱不足（需要 ¥${e}）。`);return}this.gameState.yen-=e,this.gameState.addItem(t,1),this.ui.toast(`已购买 ${ns[t].icon} ${ns[t].name}！`)}_orderCafeCoffee(){if(this.gameState.yen<250){this.ui.toast("手冲咖啡需要 ¥250。");return}this.gameState.yen-=250,this.gameState.flags.cafeCoffeeServed=!0,this.gameState.save(this.atmosphere.timeMinutes),this.ui.toast("☕ 健二把一杯热气腾腾的手冲咖啡放到了木头吧台上，香气四溢！")}_prayAtShrine(){if(this.gameState.yen<5){this.ui.toast("口袋里连 ¥5 硬币也没有了……");return}this.gameState.yen-=5,this.audio.playShrineBell(),this.shrineBellSwing=.42;const t=["【大吉】春风顺意，今日在小镇会有温暖的相遇。","【中吉】放慢脚步，山脚与河岸都藏着小小的惊喜。","【吉】听着列车的声音喝杯热茶，一切都会顺利。","【小吉】留意身边的小动物，它会为你带来好运。"],e=t[Math.floor(Math.random()*t.length)];this.gameState.flags.lastOmikuji=e,this.gameState.save(this.atmosphere.timeMinutes),this.ui.toast(`🔔 摇响铃铛抽到御神签：${e}`)}_openNoticeBoard(){const t=this.gameState.getCompletedQuestCount(),e=t>=3&&!this.gameState.flags.festivalUnlocked,n=this.gameState.activeEvent?`<div class="notice-section"><h4>📢 实时城镇动态 · ${this.gameState.activeEvent.title}</h4><p>${this.gameState.activeEvent.desc}</p></div>`:"",i=this.gameState.flags.festivalUnlocked?'<div class="notice-section"><h4>🏮 桜川夜樱点灯进行中！</h4><p>河畔的樱花灯笼已全部点亮！傍晚 18:00 后居民们会相约到桜川边散步赏灯。</p></div>':e?'<div class="notice-section"><h4>🏮 河畔灯笼点灯准备就绪</h4><p>感谢你这段时间热心帮忙！大家把河畔樱花灯笼的开关留给你啦。</p><button id="btn-trigger-festival" class="btn-primary" style="margin-top:8px;padding:8px 18px;font-size:13px;">🏮 点亮桜川春日灯火！</button></div>':`<div class="notice-section"><h4>🏮 春日河畔点灯预告</h4><p>目前已完成小镇记事 ${t}/3。多和居民们聊聊天、帮些小忙后，就能一起点亮桜川河畔的樱花灯笼！</p></div>`;this.ui.openNotice("📋 桜町 町内掲示板",`${n}
      <div class="notice-section">
        <h4>🚃 桜線 列车实时状态</h4>
        <p>${this.railway.getStatusText()}</p>
      </div>
      <div class="notice-section">
        <h4>🏪 商店街营业信息</h4>
        <p>・桜マート便利店：24小时营业（自动门与夜间照明全天开启）</p>
        <p>・喫茶 こもれび：08:00 – 21:00（每晚9点打烊）</p>
      </div>
      ${i}`);const r=document.getElementById("btn-trigger-festival");r&&r.addEventListener("click",()=>{this.gameState.flags.festivalUnlocked=!0,this.atmosphere.festivalUnlocked=!0,this.gameState.setQuest("spring_lantern_night","done"),this.gameState.yen+=400,this.gameState.save(this.atmosphere.timeMinutes),this.ui.closeNotice(),this.ui.toast("🏮 桜川畔的樱花灯笼一盏盏点亮了！傍晚去河岸看看大家吧！")})}_talkToResident(t){const e=Qc[t.id];this.gameState.meetResident(t.id)&&this.ui.toast(`✨ 认识了新居民：${e.name}（${e.role}）`);const i=this.gameState.friendship[t.id]||0,r=this.atmosphere.isRaining,o=this.atmosphere.getPeriodInfo().label,a=c=>this.ui.openDialogue({speakerId:t.id,...c});if(t.id==="kenji"){if(this.gameState.quests.welcome_letter==="active"){a({speaker:e.name,role:e.role,hearts:i,text:"哎呀，你就是刚搬进桜荘的新邻居吧！看到信箱里的便签了吗？欢迎来到樱花小镇。趁着咖啡还热，对了——能顺路帮我一个小忙吗？我订的一箱春季烘焙咖啡豆刚送到北边「桜駅候车室」的寄存架上，我这边一时走不开。",choices:[{label:"没问题，我去桜駅帮你取回来！",onSelect:()=>{this.gameState.setQuest("welcome_letter","done"),this.gameState.setQuest("coffee_parcel","active"),this.gameState.addFriendship("kenji",1),this.ui.toast("📖 新记事：前往桜駅候车室取回咖啡豆包裹")}}]});return}if(this.gameState.quests.coffee_parcel==="active"&&this.gameState.hasItem("coffee_parcel")){this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:"太感谢你了！这么快就把咖啡豆扛回来了。你看这烘焙的香气——这是跑腿谢礼，另外有空也可以去桜神社或河畔转转，铃木奶奶好像丢了样重要的东西，挺着急的。",choices:[{label:"把咖啡豆包裹交给健二 (+¥300)",onSelect:()=>{this.gameState.removeItem("coffee_parcel",1),this.gameState.yen+=300,this.gameState.setQuest("coffee_parcel","done"),this.gameState.setQuest("haru_photo","active"),this.gameState.addFriendship("kenji",1),this.ui.toast("🎉 完成「车站里的咖啡豆包裹」！获得 ¥300")}}]});return}const c=r?"下着樱花雨的时候，听着屋檐滴水声喝手冲咖啡最舒服了。铃木奶奶通常雨天也会来我店里坐会儿。":this.gameState.flags.festivalUnlocked?"河畔的樱花灯笼亮起来真好看啊！这座小镇因为有你变得更热闹温暖了。":`${o}好呀！我的侄女小葵就在街对面桜マート打工，有空也可以去跟她聊聊。店里每天营业到晚上9点哦。`;this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:c});return}if(t.id==="aoi"){if(this.gameState.quests.warm_coffee_for_ren==="locked"){this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:"欢迎光临桜マート！你是新搬来的邻居吧？我舅舅健二跟我提过你！对了，常来买饭团的插画师田中レン最近总在车站赶稿，看起来困极了。如果你路过自动售货机，能买一罐热咖啡送给他吗？",choices:[{label:"好呀，我买罐热咖啡送给レン！",onSelect:()=>{this.gameState.setQuest("warm_coffee_for_ren","active"),this.gameState.addFriendship("aoi",1),this.ui.toast("📖 新记事：在自动售货机买一罐热咖啡送给田中レン")}}]});return}const c=r?"下雨天便利店的灯光照在湿漉漉的马路上，感觉特别像动画里的场景呢。":this.railway.isDelayed?"刚刚听说桜線的列车因为山风稍微晚点了一会儿，レン大概还在月台上等车呢。":"桜マート24小时亮着灯，晚上散步饿了随时进来买个饭团或者小鱼干吧！三花猫ミケ超爱小鱼干的。";this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:c});return}if(t.id==="haru"){if(this.gameState.hasItem("old_photo")&&this.gameState.quests.haru_photo!=="done"){this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:"天哪……这就是我弄丢的那张旧樱花照片！你看，照片里还是当年刚通车时的桜駅呢，那时候树苗才这么高。真是太谢谢你跑到东边山脚林道帮我找回来！",choices:[{label:"把「旧樱花照片」交还给铃木奶奶 (+¥250)",onSelect:()=>{this.gameState.removeItem("old_photo",1),this.gameState.yen+=250,this.gameState.setQuest("haru_photo","done"),this.gameState.addFriendship("haru",2),this.ui.toast("🎉 完成「遗落在山脚的旧照片」！获得 ¥250")}}]});return}if(this.gameState.quests.haru_photo!=="done"){this.gameState.setQuest("haru_photo","active"),this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:"你好呀，年轻人。我前几天顺着北巷往东边的山脚林道散步，坐在那间旧木屋旁歇脚时，好像把一张珍藏的小镇旧照片落在木箱上了……如果你去那边探索，方便帮我留意一下吗？"});return}this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:r?"下起小雨了，还好喫茶こもれび总是暖洋洋的。":"每年晚春站在桜神社展望台俯瞰电车穿过樱花树，都会觉得住在这里真好啊。"});return}if(t.id==="ren"){if(this.gameState.hasItem("canned_coffee")&&this.gameState.quests.warm_coffee_for_ren!=="done"){this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:"唔……这是热腾腾的罐装咖啡？是小葵托你带给我的吗？太救命了！画了一整晚分镜，刚在桜駅等车都快睡着了。这包刚买的小鱼干送你吧，三花猫ミケ要是闻到一定会粘着你不放！",choices:[{label:"递出「罐装热咖啡」(+¥200 & 小鱼干零食)",onSelect:()=>{this.gameState.removeItem("canned_coffee",1),this.gameState.yen+=200,this.gameState.addItem("fish_snack",1),this.gameState.setQuest("warm_coffee_for_ren","done"),this.gameState.setQuest("feed_mike","active"),this.gameState.addFriendship("ren",2),this.ui.toast("🎉 完成「给候车画师的热咖啡」！获得 ¥200 与 🐟小鱼干零食")}}]});return}this.gameState.quests.warm_coffee_for_ren==="locked"&&this.gameState.setQuest("warm_coffee_for_ren","active"),this.ui.openDialogue({speaker:e.name,role:e.role,hearts:i,text:this.railway.state==="DOORS_OPEN"?"哦！电车门开了，这班樱花涂装的列车每次看都很上镜。":"嗨，新搬来的邻居？我正在画樱花小镇的明信片。要是能喝到一罐自动售货机卖的热咖啡就完美了……"});return}if(t.id==="mike"){if(this.gameState.hasItem("fish_snack")&&this.gameState.quests.feed_mike!=="done"){this.ui.openDialogue({speaker:"ミケ",role:"小镇吉祥物三花猫",hearts:i,text:"喵呜~♪（ミケ嗅到了小鱼干的香气，开心地蹭着你的裤脚，吃完后用爪子从草丛里推给你一枚小小的「樱花御守」！）",choices:[{label:"喂给ミケ「小鱼干零食」🐟",onSelect:()=>{this.gameState.removeItem("fish_snack",1),this.gameState.addItem("sakura_charm",1),this.gameState.setQuest("feed_mike","done"),this.gameState.addFriendship("mike",3),this.ui.toast("🌸 成为了ミケ的好朋友！获得珍贵纪念品「樱花御守」")}}]});return}this.ui.openDialogue({speaker:"ミケ",role:"小镇吉祥物三花猫",hearts:i,text:this.gameState.quests.feed_mike==="done"?"喵~呼噜呼噜……（ミケ懒洋洋地翻了个身，似乎很喜欢有你陪伴的樱花小镇。）":"喵呜？（ミケ歪着头看着你，似乎在期待着香脆的小鱼干零食……）"})}}}class Om{constructor({gameState:t,atmosphere:e,player:n,npcManager:i,railway:r,audio:o}){this.gameState=t,this.atmosphere=e,this.player=n,this.npcManager=i,this.railway=r,this.audio=o,this.notebookTab="quests",this.dialogueOpen=!1,this.notebookOpen=!1,this.noticeOpen=!1,this._cacheElements(),this._bindEvents()}_cacheElements(){this.elTitle=document.getElementById("title-overlay"),this.elBtnStart=document.getElementById("btn-start"),this.elBtnResetSave=document.getElementById("btn-reset-save"),this.elHud=document.getElementById("hud"),this.elTimeIcon=document.getElementById("hud-time-icon"),this.elClock=document.getElementById("hud-clock"),this.elPeriod=document.getElementById("hud-period"),this.elLocation=document.getElementById("hud-location"),this.elWeather=document.getElementById("hud-weather"),this.elEventBanner=document.getElementById("hud-event-banner"),this.elYen=document.getElementById("hud-yen"),this.elQuestTitle=document.getElementById("hud-quest-title"),this.elQuestHint=document.getElementById("hud-quest-hint"),this.elInteract=document.getElementById("interact-prompt"),this.elInteractLabel=document.getElementById("interact-label"),this.elSit=document.getElementById("sit-indicator"),this.elToasts=document.getElementById("toast-container"),this.elInvBar=document.getElementById("inventory-bar"),this.elDialogue=document.getElementById("dialogue-box"),this.elDlgSpeaker=document.getElementById("dialogue-speaker"),this.elDlgRole=document.getElementById("dialogue-role"),this.elDlgHearts=document.getElementById("dialogue-hearts"),this.elDlgText=document.getElementById("dialogue-text"),this.elDlgChoices=document.getElementById("dialogue-choices"),this.elDlgContinue=document.getElementById("dialogue-continue"),this.elNotebook=document.getElementById("notebook-modal"),this.elNotebookBody=document.getElementById("notebook-content"),this.elNotice=document.getElementById("notice-modal"),this.elNoticeTitle=document.getElementById("notice-title"),this.elNoticeBody=document.getElementById("notice-body"),this.btnWeather=document.getElementById("btn-weather"),this.btnTimeSpeed=document.getElementById("btn-time-speed"),this.btnAudio=document.getElementById("btn-audio")}_bindEvents(){this.gameState.hasSavedData&&(this.elBtnStart.textContent="继续小镇生活",this.elBtnResetSave.classList.remove("hidden")),this.elBtnStart.addEventListener("click",()=>{this.audio.unlock(),this.audio.playUiBlip(!0),this.elTitle.classList.add("hidden"),this.elHud.classList.remove("hidden"),this.player.controlsLocked=!1,this.refreshHud(),this.toast("🌸 欢迎来到樱花小镇！先去看看桜荘门前的红色信箱吧。")}),this.elBtnResetSave.addEventListener("click",()=>{this.gameState.clearSave(),window.location.reload()}),document.getElementById("btn-notebook").addEventListener("click",()=>this.toggleNotebook("quests")),document.getElementById("btn-close-notebook").addEventListener("click",()=>this.closeNotebook()),document.getElementById("btn-close-notice").addEventListener("click",()=>this.closeNotice()),document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{this.notebookTab=t.dataset.tab,this._renderNotebook()})}),this.btnWeather.addEventListener("click",()=>{this.atmosphere.isRaining=!this.atmosphere.isRaining,this.audio.playUiBlip(),this.toast(this.atmosphere.isRaining?"🌧️ 下起了轻柔的晚春樱花雨，居民们纷纷撑起伞或进店躲雨。":"☀️ 雨过天晴，温暖的春风重新吹拂小镇。"),this.refreshHud()}),this.btnTimeSpeed.addEventListener("click",()=>{const t=this.atmosphere.timeSpeed===1?3:this.atmosphere.timeSpeed===3?0:1;this.atmosphere.timeSpeed=t,this.btnTimeSpeed.textContent=t===0?"⏸️ 暂停":`⏩ ${t}x`,this.audio.playUiBlip()}),this.btnAudio.addEventListener("click",()=>{this.audio.unlock();const t=this.audio.toggleMute();this.btnAudio.textContent=t?"🔇":"🔊"}),document.getElementById("btn-help").addEventListener("click",()=>{this.openNotice("🌸 樱花小镇 · 操作与生活指南",`<div class="notice-section">
          <h4>基本操作</h4>
          <p><b>W A S D / 方向键</b>：行走 · <b>Shift</b>：小跑</p>
          <p><b>鼠标拖拽 或 Q / R</b>：旋转视角 · <b>滚轮</b>：缩放距离</p>
          <p><b>E 或 空格</b>：与居民交谈、使用自动售货机、坐下、参拜或拾取物品</p>
          <p><b>Tab</b>：打开小镇笔记 · <b>M</b>：直接打开小镇导览图 · <b>1-5</b>：使用随身物品</p>
        </div>
        <div class="notice-section">
          <h4>可进入的建筑</h4>
          <p>・<b>桜マート便利店</b>（24小时自动门与夜间照明）</p>
          <p>・<b>喫茶 こもれび</b>（08:00 – 21:00 营业，可点手冲咖啡并就座）</p>
          <p>・<b>桜荘</b>（你的家，可开关和纸灯、睡在被褥推进至清晨）</p>
          <p>・<b>桜駅</b>（候车室与月台，电车与铁路道口会真实联动运行）</p>
        </div>`)}),this.elDlgContinue.addEventListener("click",()=>this.closeDialogue()),window.addEventListener("keydown",t=>{if(this.elTitle.classList.contains("hidden")){if(t.code==="Escape"){this.dialogueOpen?this.closeDialogue():this.notebookOpen?this.closeNotebook():this.noticeOpen&&this.closeNotice();return}if(t.code==="Tab"){if(t.preventDefault(),this.dialogueOpen)return;this.notebookOpen?this.closeNotebook():this.toggleNotebook("quests");return}if(t.code==="KeyM"&&!this.dialogueOpen&&!this.noticeOpen){this.notebookOpen&&this.notebookTab==="map"?this.closeNotebook():this.toggleNotebook("map");return}if((t.code==="KeyE"||t.code==="Space")&&this.dialogueOpen){this.elDlgChoices.children.length===0&&(t.preventDefault(),this.closeDialogue());return}if(!this.isOverlayOpen()&&/^Digit[1-5]$/.test(t.code)){const e=Number(t.code.slice(-1))-1;this._useInventorySlot(e)}}})}isOverlayOpen(){return!this.elTitle.classList.contains("hidden")||this.dialogueOpen||this.notebookOpen||this.noticeOpen}setInteractPrompt(t){if(!t){this.elInteract.classList.add("hidden");return}this.elInteractLabel.textContent=t,this.elInteract.classList.remove("hidden")}setSitting(t){this.elSit.classList.toggle("hidden",!t)}toast(t){const e=document.createElement("div");e.className="toast",e.textContent=t,this.elToasts.appendChild(e),setTimeout(()=>{e.style.transition="opacity 0.35s",e.style.opacity="0",setTimeout(()=>e.remove(),360)},3400)}openDialogue({speaker:t,role:e="",hearts:n=0,text:i,choices:r=[],speakerId:o=null}){this.dialogueOpen=!0,this.activeSpeakerId=o,this.player.controlsLocked=!0,this.elDlgSpeaker.textContent=t,this.elDlgRole.textContent=e,this.elDlgHearts.textContent=n>0?"♥".repeat(n)+"♡".repeat(Math.max(0,3-n)):"",this.elDlgText.textContent=i,this.elDlgChoices.innerHTML="",r.length>0?(this.elDlgContinue.classList.add("hidden"),r.forEach(a=>{const c=document.createElement("button");c.className="choice-btn",c.textContent=a.label,c.addEventListener("click",()=>{this.audio.playUiBlip(!0),this.closeDialogue(),a.onSelect(),this.refreshHud()}),this.elDlgChoices.appendChild(c)})):this.elDlgContinue.classList.remove("hidden"),this.elDialogue.classList.remove("hidden")}closeDialogue(){this.dialogueOpen=!1,this.activeSpeakerId=null,this.elDialogue.classList.add("hidden"),!this.notebookOpen&&!this.noticeOpen&&(this.player.controlsLocked=!1)}openNotice(t,e){this.noticeOpen=!0,this.player.controlsLocked=!0,this.elNoticeTitle.textContent=t,this.elNoticeBody.innerHTML=e,this.elNotice.classList.remove("hidden")}closeNotice(){this.noticeOpen=!1,this.elNotice.classList.add("hidden"),!this.dialogueOpen&&!this.notebookOpen&&(this.player.controlsLocked=!1)}toggleNotebook(t="quests"){this.notebookTab=t,this.notebookOpen=!0,this.player.controlsLocked=!0,this.elNotebook.classList.remove("hidden"),this._renderNotebook()}closeNotebook(){this.notebookOpen=!1,this.elNotebook.classList.add("hidden"),!this.dialogueOpen&&!this.noticeOpen&&(this.player.controlsLocked=!1)}_useInventorySlot(t){const e=this.gameState.inventory[t];if(!e)return;this.gameState.selectedSlot=t;const n=ns[e.id];n&&n.consumable?(this.gameState.removeItem(e.id,1),this.audio.playUiBlip(!0),this.toast(`${n.icon} 品尝了「${n.name}」，心情变得轻松愉快！`)):n&&this.toast(`${n.icon} ${n.name}：${n.desc}`),this.refreshHud()}refreshHud(){const t=this.atmosphere.getPeriodInfo();this.elTimeIcon.textContent=t.icon,this.elClock.textContent=this.atmosphere.getFormattedTime(),this.elPeriod.textContent=t.label,this.elLocation.textContent=this.player.collision.getLocationName(this.player.position.x,this.player.position.z),this.elWeather.textContent=this.atmosphere.isRaining?"🌧️ 晚春樱雨":"🌸 晴 · 樱花微风",this.elYen.textContent=String(this.gameState.yen),this.gameState.activeEvent?(this.elEventBanner.textContent=this.gameState.activeEvent.title,this.elEventBanner.classList.remove("hidden")):this.elEventBanner.classList.add("hidden");const e=this.gameState.getPrimaryActiveQuest();e?(this.elQuestTitle.textContent=e.title,this.elQuestHint.textContent=e.hint):(this.elQuestTitle.textContent="悠闲漫步樱花小镇",this.elQuestHint.textContent="已完成全部小镇记事，尽情享受春日慢生活吧！"),this.elInvBar.innerHTML="";for(let n=0;n<5;n++){const i=this.gameState.inventory[n],r=i?ns[i.id]:null,o=document.createElement("div");o.className=`inv-slot${n===this.gameState.selectedSlot?" active":""}`,o.title=r?`${r.name}：${r.desc}${r.consumable?"（点击品尝）":""}`:`空栏位 ${n+1}`,o.innerHTML=`
        <span class="inv-slot-num">${n+1}</span>
        <span class="inv-slot-icon">${r?r.icon:""}</span>
        <span class="inv-slot-name">${r?r.name:""}</span>
        ${i&&i.count>1?`<span class="inv-slot-count">×${i.count}</span>`:""}
      `,o.addEventListener("click",()=>this._useInventorySlot(n)),this.elInvBar.appendChild(o)}this.notebookOpen&&this.notebookTab==="map"&&this._drawTownMap()}_renderNotebook(){if(document.querySelectorAll(".tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.tab===this.notebookTab)}),this.notebookTab==="quests"){const t=Jc.map(e=>{const n=this.gameState.quests[e.id],i=n==="done"?"badge-done":n==="active"?"badge-active":"badge-locked",r=n==="done"?"已完成 ✓":n==="active"?"进行中":"待触发";return`
          <div class="entry-card ${n==="done"?"done":""}">
            <div class="entry-title-row">
              <span class="entry-title">${e.title}</span>
              <span class="badge ${i}">${r}</span>
            </div>
            <div class="entry-desc">${n==="locked"?"多与镇上的居民交谈或在小镇漫步，自然就会遇见这件事。":e.hint}</div>
          </div>`}).join("");this.elNotebookBody.innerHTML=`<div class="card-list">${t}</div>`}else if(this.notebookTab==="residents"){const t=Object.values(Qc).map(e=>{const n=!!this.gameState.knownResidents[e.id],i=this.npcManager.getCoreNPC(e.id),r=this.gameState.friendship[e.id]||0;return`
          <div class="entry-card">
            <div class="entry-title-row">
              <span class="entry-title">${n?e.name:"？？？"} <small style="font-weight:500;color:#635f70;">${n?e.role:"尚未认识的邻居"}</small></span>
              <span style="color:#c95f7d;">${n?"♥".repeat(r)+"♡".repeat(3-r):""}</span>
            </div>
            <div class="entry-desc">
              ${n?`${e.bio}<br/><b>关系：</b>${e.relation} · <b>当前去向：</b>${i?i.activity:e.homeName}`:"在小镇里走走，与他们打个招呼吧。"}
            </div>
          </div>`}).join("");this.elNotebookBody.innerHTML=`<div class="card-list">${t}</div>`}else this.notebookTab==="map"?(this.elNotebookBody.innerHTML=`
        <div class="map-canvas-wrap">
          <canvas id="town-map-canvas" width="560" height="400"></canvas>
          <div style="font-size:12px;color:#635f70;">
            🔵 你的位置 · 🌸 可进入核心建筑 · 🚃 实时电车 · 🟠 居民位置 · ⛩️ 桜神社展望台
          </div>
        </div>`,this._drawTownMap()):this.notebookTab==="system"&&(this.elNotebookBody.innerHTML=`
        <div class="card-list">
          <div class="entry-card">
            <div class="entry-title-row"><span class="entry-title">时间快捷调整（体验不同光影）</span></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
              <button class="choice-btn" data-jump="480">🌅 清晨 08:00</button>
              <button class="choice-btn" data-jump="780">☀️ 午后 13:00</button>
              <button class="choice-btn" data-jump="1040">🌇 夕阳 17:20</button>
              <button class="choice-btn" data-jump="1230">🌙 夜晚 20:30</button>
              <button class="choice-btn" data-jump="1300">🌌 深夜 21:40 (咖啡馆打烊)</button>
            </div>
          </div>
          <div class="entry-card">
            <div class="entry-title-row"><span class="entry-title">存档管理</span></div>
            <p class="entry-desc" style="margin-bottom:10px;">系统会在完成记事、获得物品或休息时自动保存进度。${this.gameState.flags.lastOmikuji?`<br/>最近抽到的御神签：${this.gameState.flags.lastOmikuji}`:""}</p>
            <div style="display:flex;gap:10px;">
              <button id="btn-manual-save" class="choice-btn">💾 立即保存</button>
              <button id="btn-clear-save" class="choice-btn" style="border-color:#c9524c;color:#c9524c;">🗑️ 清空存档重新开始</button>
            </div>
          </div>
        </div>`,this.elNotebookBody.querySelectorAll("[data-jump]").forEach(t=>{t.addEventListener("click",()=>{this.atmosphere.timeMinutes=Number(t.dataset.jump),this.toast(`⏰ 时间调整至 ${this.atmosphere.getFormattedTime()}`),this.refreshHud()})}),document.getElementById("btn-manual-save")?.addEventListener("click",()=>{this.gameState.save(this.atmosphere.timeMinutes),this.toast("💾 小镇进度已保存！")}),document.getElementById("btn-clear-save")?.addEventListener("click",()=>{this.gameState.clearSave(),window.location.reload()}))}_drawTownMap(){const t=document.getElementById("town-map-canvas");if(!t)return;const e=t.getContext("2d"),n=t.width,i=t.height,r=u=>n/2+u*5.2,o=u=>i/2+(u+4)*4.2;e.fillStyle="#e7f0dc",e.fillRect(0,0,n,i),e.fillStyle="#7ec4df",e.fillRect(0,o(25.5),n,o(32.5)-o(25.5)),e.fillStyle="#c4c2bd",e.fillRect(r(-3),o(-23),r(3)-r(-3),o(39)-o(-23)),e.fillRect(r(-45),o(-1),r(45)-r(-45),o(5.2)-o(-1)),e.fillRect(r(-36),o(-24.2),r(36)-r(-36),o(-19.8)-o(-24.2)),e.strokeStyle="#575c68",e.lineWidth=4,e.beginPath(),e.moveTo(0,o(-12)),e.lineTo(n,o(-12)),e.stroke();const a=[{x:-11.5,z:-19,label:"桜駅",color:"#394b6b"},{x:-15,z:10.5,label:"桜マート",color:"#4ca175"},{x:15,z:10.5,label:"喫茶こもれび",color:"#966b47"},{x:-26,z:-27.2,label:"桜荘(家)",color:"#c95f7d"},{x:16,z:-40,label:"⛩️桜神社",color:"#cf4238"},{x:36,z:-25,label:"旧木屋",color:"#6b7a5e"},{x:0,z:29,label:"桜川桥",color:"#3a7c9e"}];e.font='700 11px "Yu Gothic UI", "Microsoft YaHei", sans-serif',e.textAlign="center",a.forEach(u=>{const d=r(u.x),f=o(u.z);e.fillStyle=u.color,e.beginPath(),e.arc(d,f,6,0,Math.PI*2),e.fill(),e.fillStyle="#2c2a35",e.fillText(u.label,d,f-10)}),this.railway.trainGroup.visible&&(e.fillStyle="#e67c98",e.fillRect(r(this.railway.trainX)-16,o(-12)-4,32,8));for(const u of this.npcManager.npcs)u.isCore&&(e.fillStyle="#e69345",e.beginPath(),e.arc(r(u.pos.x),o(u.pos.z),4.5,0,Math.PI*2),e.fill());const c=r(this.player.position.x),l=o(this.player.position.z);e.fillStyle="#2c7be5",e.beginPath(),e.arc(c,l,6.5,0,Math.PI*2),e.fill(),e.strokeStyle="#ffffff",e.lineWidth=2,e.stroke()}}const Bm=document.getElementById("game-container"),wn=new vm({antialias:!0,powerPreference:"high-performance"});wn.setSize(window.innerWidth,window.innerHeight);wn.setPixelRatio(Math.min(window.devicePixelRatio,2));wn.shadowMap.enabled=!0;wn.shadowMap.type=xc;wn.toneMapping=Mc;wn.toneMappingExposure=1.06;Bm.appendChild(wn.domElement);const si=new gh,Ai=new $e(52,window.innerWidth/window.innerHeight,.2,260),ls=new Mm,hs=new Dm,cr=new Nm,zm=Rm(si,ls),tl=Cm(si,ls),qe=new Lm(si,tl);qe.timeMinutes=cr.savedTimeMinutes;const rs=new Im(si,ls,hs),Qn=new Am(si,Ai,ls,hs);Qn.controlsLocked=!0;const ia=new Um(si,ls,rs),is=new Om({gameState:cr,atmosphere:qe,player:Qn,npcManager:ia,railway:rs,audio:hs}),el=new Fm({player:Qn,worldRefs:tl,npcManager:ia,gameState:cr,atmosphere:qe,railway:rs,audio:hs,ui:is});window.addEventListener("keydown",s=>{is.isOverlayOpen()||(s.code==="KeyE"||s.code==="Space")&&(s.preventDefault(),el.triggerCurrent())});window.addEventListener("resize",()=>{Ai.aspect=window.innerWidth/window.innerHeight,Ai.updateProjectionMatrix(),wn.setSize(window.innerWidth,window.innerHeight)});const gc=new Nh;let Kr=0;function nl(){requestAnimationFrame(nl);const s=Math.min(gc.getDelta(),.05),t=gc.elapsedTime,e=!document.getElementById("title-overlay").classList.contains("hidden");if(e){const i=t*.12;Ai.position.set(Math.sin(i)*26,13.5,Math.cos(i)*24-2),Ai.lookAt(0,2.2,-4)}else Qn.update(s,qe.isRaining);const n=ia.update(s,qe.getHour(),qe.isRaining,qe.festivalUnlocked,Qn.position,is.activeSpeakerId);qe.update(s,t,Qn.position,n),zm.update(t,qe.isRaining),rs.update(s,Qn.position,qe.nightFactor),hs.updateAmbient(s,qe.nightFactor,qe.isRaining),e||(el.update(s),cr.updateEvents(s,rs,qe,i=>is.toast(i)),Kr-=s,Kr<=0&&(Kr=.25,is.refreshHud())),wn.render(si,Ai)}nl();
