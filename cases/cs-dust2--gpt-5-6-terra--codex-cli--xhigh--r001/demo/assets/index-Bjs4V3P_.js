var S0=Object.defineProperty;var M0=(s,e,t)=>e in s?S0(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var et=(s,e,t)=>M0(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();var Lc={exports:{}},zo={},Dc={exports:{}},dt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hp;function E0(){if(Hp)return dt;Hp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),f=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.iterator;function x(U){return U===null||typeof U!="object"?null:(U=_&&U[_]||U["@@iterator"],typeof U=="function"?U:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,w={};function y(U,ie,De){this.props=U,this.context=ie,this.refs=w,this.updater=De||S}y.prototype.isReactComponent={},y.prototype.setState=function(U,ie){if(typeof U!="object"&&typeof U!="function"&&U!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,U,ie,"setState")},y.prototype.forceUpdate=function(U){this.updater.enqueueForceUpdate(this,U,"forceUpdate")};function v(){}v.prototype=y.prototype;function I(U,ie,De){this.props=U,this.context=ie,this.refs=w,this.updater=De||S}var D=I.prototype=new v;D.constructor=I,E(D,y.prototype),D.isPureReactComponent=!0;var C=Array.isArray,q=Object.prototype.hasOwnProperty,O={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function V(U,ie,De){var Q,fe={},Me=null,_e=null;if(ie!=null)for(Q in ie.ref!==void 0&&(_e=ie.ref),ie.key!==void 0&&(Me=""+ie.key),ie)q.call(ie,Q)&&!N.hasOwnProperty(Q)&&(fe[Q]=ie[Q]);var we=arguments.length-2;if(we===1)fe.children=De;else if(1<we){for(var Ie=Array(we),Ze=0;Ze<we;Ze++)Ie[Ze]=arguments[Ze+2];fe.children=Ie}if(U&&U.defaultProps)for(Q in we=U.defaultProps,we)fe[Q]===void 0&&(fe[Q]=we[Q]);return{$$typeof:s,type:U,key:Me,ref:_e,props:fe,_owner:O.current}}function b(U,ie){return{$$typeof:s,type:U.type,key:ie,ref:U.ref,props:U.props,_owner:U._owner}}function R(U){return typeof U=="object"&&U!==null&&U.$$typeof===s}function k(U){var ie={"=":"=0",":":"=2"};return"$"+U.replace(/[=:]/g,function(De){return ie[De]})}var ne=/\/+/g;function K(U,ie){return typeof U=="object"&&U!==null&&U.key!=null?k(""+U.key):ie.toString(36)}function ae(U,ie,De,Q,fe){var Me=typeof U;(Me==="undefined"||Me==="boolean")&&(U=null);var _e=!1;if(U===null)_e=!0;else switch(Me){case"string":case"number":_e=!0;break;case"object":switch(U.$$typeof){case s:case e:_e=!0}}if(_e)return _e=U,fe=fe(_e),U=Q===""?"."+K(_e,0):Q,C(fe)?(De="",U!=null&&(De=U.replace(ne,"$&/")+"/"),ae(fe,ie,De,"",function(Ze){return Ze})):fe!=null&&(R(fe)&&(fe=b(fe,De+(!fe.key||_e&&_e.key===fe.key?"":(""+fe.key).replace(ne,"$&/")+"/")+U)),ie.push(fe)),1;if(_e=0,Q=Q===""?".":Q+":",C(U))for(var we=0;we<U.length;we++){Me=U[we];var Ie=Q+K(Me,we);_e+=ae(Me,ie,De,Ie,fe)}else if(Ie=x(U),typeof Ie=="function")for(U=Ie.call(U),we=0;!(Me=U.next()).done;)Me=Me.value,Ie=Q+K(Me,we++),_e+=ae(Me,ie,De,Ie,fe);else if(Me==="object")throw ie=String(U),Error("Objects are not valid as a React child (found: "+(ie==="[object Object]"?"object with keys {"+Object.keys(U).join(", ")+"}":ie)+"). If you meant to render a collection of children, use an array instead.");return _e}function ce(U,ie,De){if(U==null)return U;var Q=[],fe=0;return ae(U,Q,"","",function(Me){return ie.call(De,Me,fe++)}),Q}function oe(U){if(U._status===-1){var ie=U._result;ie=ie(),ie.then(function(De){(U._status===0||U._status===-1)&&(U._status=1,U._result=De)},function(De){(U._status===0||U._status===-1)&&(U._status=2,U._result=De)}),U._status===-1&&(U._status=0,U._result=ie)}if(U._status===1)return U._result.default;throw U._result}var ue={current:null},z={transition:null},le={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:z,ReactCurrentOwner:O};function se(){throw Error("act(...) is not supported in production builds of React.")}return dt.Children={map:ce,forEach:function(U,ie,De){ce(U,function(){ie.apply(this,arguments)},De)},count:function(U){var ie=0;return ce(U,function(){ie++}),ie},toArray:function(U){return ce(U,function(ie){return ie})||[]},only:function(U){if(!R(U))throw Error("React.Children.only expected to receive a single React element child.");return U}},dt.Component=y,dt.Fragment=t,dt.Profiler=a,dt.PureComponent=I,dt.StrictMode=r,dt.Suspense=h,dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=le,dt.act=se,dt.cloneElement=function(U,ie,De){if(U==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+U+".");var Q=E({},U.props),fe=U.key,Me=U.ref,_e=U._owner;if(ie!=null){if(ie.ref!==void 0&&(Me=ie.ref,_e=O.current),ie.key!==void 0&&(fe=""+ie.key),U.type&&U.type.defaultProps)var we=U.type.defaultProps;for(Ie in ie)q.call(ie,Ie)&&!N.hasOwnProperty(Ie)&&(Q[Ie]=ie[Ie]===void 0&&we!==void 0?we[Ie]:ie[Ie])}var Ie=arguments.length-2;if(Ie===1)Q.children=De;else if(1<Ie){we=Array(Ie);for(var Ze=0;Ze<Ie;Ze++)we[Ze]=arguments[Ze+2];Q.children=we}return{$$typeof:s,type:U.type,key:fe,ref:Me,props:Q,_owner:_e}},dt.createContext=function(U){return U={$$typeof:f,_currentValue:U,_currentValue2:U,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},U.Provider={$$typeof:l,_context:U},U.Consumer=U},dt.createElement=V,dt.createFactory=function(U){var ie=V.bind(null,U);return ie.type=U,ie},dt.createRef=function(){return{current:null}},dt.forwardRef=function(U){return{$$typeof:c,render:U}},dt.isValidElement=R,dt.lazy=function(U){return{$$typeof:g,_payload:{_status:-1,_result:U},_init:oe}},dt.memo=function(U,ie){return{$$typeof:m,type:U,compare:ie===void 0?null:ie}},dt.startTransition=function(U){var ie=z.transition;z.transition={};try{U()}finally{z.transition=ie}},dt.unstable_act=se,dt.useCallback=function(U,ie){return ue.current.useCallback(U,ie)},dt.useContext=function(U){return ue.current.useContext(U)},dt.useDebugValue=function(){},dt.useDeferredValue=function(U){return ue.current.useDeferredValue(U)},dt.useEffect=function(U,ie){return ue.current.useEffect(U,ie)},dt.useId=function(){return ue.current.useId()},dt.useImperativeHandle=function(U,ie,De){return ue.current.useImperativeHandle(U,ie,De)},dt.useInsertionEffect=function(U,ie){return ue.current.useInsertionEffect(U,ie)},dt.useLayoutEffect=function(U,ie){return ue.current.useLayoutEffect(U,ie)},dt.useMemo=function(U,ie){return ue.current.useMemo(U,ie)},dt.useReducer=function(U,ie,De){return ue.current.useReducer(U,ie,De)},dt.useRef=function(U){return ue.current.useRef(U)},dt.useState=function(U){return ue.current.useState(U)},dt.useSyncExternalStore=function(U,ie,De){return ue.current.useSyncExternalStore(U,ie,De)},dt.useTransition=function(){return ue.current.useTransition()},dt.version="18.3.1",dt}var Vp;function nd(){return Vp||(Vp=1,Dc.exports=E0()),Dc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gp;function T0(){if(Gp)return zo;Gp=1;var s=nd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function f(c,h,m){var g,_={},x=null,S=null;m!==void 0&&(x=""+m),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(S=h.ref);for(g in h)r.call(h,g)&&!l.hasOwnProperty(g)&&(_[g]=h[g]);if(c&&c.defaultProps)for(g in h=c.defaultProps,h)_[g]===void 0&&(_[g]=h[g]);return{$$typeof:e,type:c,key:x,ref:S,props:_,_owner:a.current}}return zo.Fragment=t,zo.jsx=f,zo.jsxs=f,zo}var Wp;function w0(){return Wp||(Wp=1,Lc.exports=T0()),Lc.exports}var Xe=w0(),cl=nd(),fl={},Ic={exports:{}},Fn={},Uc={exports:{}},Nc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xp;function A0(){return Xp||(Xp=1,(function(s){function e(z,le){var se=z.length;z.push(le);e:for(;0<se;){var U=se-1>>>1,ie=z[U];if(0<a(ie,le))z[U]=le,z[se]=ie,se=U;else break e}}function t(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var le=z[0],se=z.pop();if(se!==le){z[0]=se;e:for(var U=0,ie=z.length,De=ie>>>1;U<De;){var Q=2*(U+1)-1,fe=z[Q],Me=Q+1,_e=z[Me];if(0>a(fe,se))Me<ie&&0>a(_e,fe)?(z[U]=_e,z[Me]=se,U=Me):(z[U]=fe,z[Q]=se,U=Q);else if(Me<ie&&0>a(_e,se))z[U]=_e,z[Me]=se,U=Me;else break e}}return le}function a(z,le){var se=z.sortIndex-le.sortIndex;return se!==0?se:z.id-le.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var f=Date,c=f.now();s.unstable_now=function(){return f.now()-c}}var h=[],m=[],g=1,_=null,x=3,S=!1,E=!1,w=!1,y=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function D(z){for(var le=t(m);le!==null;){if(le.callback===null)r(m);else if(le.startTime<=z)r(m),le.sortIndex=le.expirationTime,e(h,le);else break;le=t(m)}}function C(z){if(w=!1,D(z),!E)if(t(h)!==null)E=!0,oe(q);else{var le=t(m);le!==null&&ue(C,le.startTime-z)}}function q(z,le){E=!1,w&&(w=!1,v(V),V=-1),S=!0;var se=x;try{for(D(le),_=t(h);_!==null&&(!(_.expirationTime>le)||z&&!k());){var U=_.callback;if(typeof U=="function"){_.callback=null,x=_.priorityLevel;var ie=U(_.expirationTime<=le);le=s.unstable_now(),typeof ie=="function"?_.callback=ie:_===t(h)&&r(h),D(le)}else r(h);_=t(h)}if(_!==null)var De=!0;else{var Q=t(m);Q!==null&&ue(C,Q.startTime-le),De=!1}return De}finally{_=null,x=se,S=!1}}var O=!1,N=null,V=-1,b=5,R=-1;function k(){return!(s.unstable_now()-R<b)}function ne(){if(N!==null){var z=s.unstable_now();R=z;var le=!0;try{le=N(!0,z)}finally{le?K():(O=!1,N=null)}}else O=!1}var K;if(typeof I=="function")K=function(){I(ne)};else if(typeof MessageChannel<"u"){var ae=new MessageChannel,ce=ae.port2;ae.port1.onmessage=ne,K=function(){ce.postMessage(null)}}else K=function(){y(ne,0)};function oe(z){N=z,O||(O=!0,K())}function ue(z,le){V=y(function(){z(s.unstable_now())},le)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,oe(q))},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return t(h)},s.unstable_next=function(z){switch(x){case 1:case 2:case 3:var le=3;break;default:le=x}var se=x;x=le;try{return z()}finally{x=se}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(z,le){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var se=x;x=z;try{return le()}finally{x=se}},s.unstable_scheduleCallback=function(z,le,se){var U=s.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?U+se:U):se=U,z){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=se+ie,z={id:g++,callback:le,priorityLevel:z,startTime:se,expirationTime:ie,sortIndex:-1},se>U?(z.sortIndex=se,e(m,z),t(h)===null&&z===t(m)&&(w?(v(V),V=-1):w=!0,ue(C,se-U))):(z.sortIndex=ie,e(h,z),E||S||(E=!0,oe(q))),z},s.unstable_shouldYield=k,s.unstable_wrapCallback=function(z){var le=x;return function(){var se=x;x=le;try{return z.apply(this,arguments)}finally{x=se}}}})(Nc)),Nc}var jp;function R0(){return jp||(jp=1,Uc.exports=A0()),Uc.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yp;function C0(){if(Yp)return Fn;Yp=1;var s=nd(),e=R0();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(n,i){f(n,i),f(n+"Capture",i)}function f(n,i){for(a[n]=i,n=0;n<i.length;n++)r.add(i[n])}var c=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},_={};function x(n){return h.call(_,n)?!0:h.call(g,n)?!1:m.test(n)?_[n]=!0:(g[n]=!0,!1)}function S(n,i,o,u){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,o,u){if(i===null||typeof i>"u"||S(n,i,o,u))return!0;if(u)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function w(n,i,o,u,d,p,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=p,this.removeEmptyString=M}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new w(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];y[i]=new w(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new w(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new w(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new w(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new w(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new w(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new w(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new w(n,5,!1,n.toLowerCase(),null,!1,!1)});var v=/[\-:]([a-z])/g;function I(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(v,I);y[i]=new w(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(v,I);y[i]=new w(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(v,I);y[i]=new w(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new w(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new w("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new w(n,1,!1,n.toLowerCase(),null,!0,!0)});function D(n,i,o,u){var d=y.hasOwnProperty(i)?y[i]:null;(d!==null?d.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,o,d,u)&&(o=null),u||d===null?x(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):d.mustUseProperty?n[d.propertyName]=o===null?d.type===3?!1:"":o:(i=d.attributeName,u=d.attributeNamespace,o===null?n.removeAttribute(i):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,u?n.setAttributeNS(u,i,o):n.setAttribute(i,o))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,q=Symbol.for("react.element"),O=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),V=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),k=Symbol.for("react.context"),ne=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),ae=Symbol.for("react.suspense_list"),ce=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),ue=Symbol.for("react.offscreen"),z=Symbol.iterator;function le(n){return n===null||typeof n!="object"?null:(n=z&&n[z]||n["@@iterator"],typeof n=="function"?n:null)}var se=Object.assign,U;function ie(n){if(U===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);U=i&&i[1]||""}return`
`+U+n}var De=!1;function Q(n,i){if(!n||De)return"";De=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(J){var u=J}Reflect.construct(n,[],i)}else{try{i.call()}catch(J){u=J}n.call(i.prototype)}else{try{throw Error()}catch(J){u=J}n()}}catch(J){if(J&&u&&typeof J.stack=="string"){for(var d=J.stack.split(`
`),p=u.stack.split(`
`),M=d.length-1,L=p.length-1;1<=M&&0<=L&&d[M]!==p[L];)L--;for(;1<=M&&0<=L;M--,L--)if(d[M]!==p[L]){if(M!==1||L!==1)do if(M--,L--,0>L||d[M]!==p[L]){var F=`
`+d[M].replace(" at new "," at ");return n.displayName&&F.includes("<anonymous>")&&(F=F.replace("<anonymous>",n.displayName)),F}while(1<=M&&0<=L);break}}}finally{De=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?ie(n):""}function fe(n){switch(n.tag){case 5:return ie(n.type);case 16:return ie("Lazy");case 13:return ie("Suspense");case 19:return ie("SuspenseList");case 0:case 2:case 15:return n=Q(n.type,!1),n;case 11:return n=Q(n.type.render,!1),n;case 1:return n=Q(n.type,!0),n;default:return""}}function Me(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case N:return"Fragment";case O:return"Portal";case b:return"Profiler";case V:return"StrictMode";case K:return"Suspense";case ae:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case k:return(n.displayName||"Context")+".Consumer";case R:return(n._context.displayName||"Context")+".Provider";case ne:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case ce:return i=n.displayName||null,i!==null?i:Me(n.type)||"Memo";case oe:i=n._payload,n=n._init;try{return Me(n(i))}catch{}}return null}function _e(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Me(i);case 8:return i===V?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function we(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ie(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ze(n){var i=Ie(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(M){u=""+M,p.call(this,M)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return u},setValue:function(M){u=""+M},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Pt(n){n._valueTracker||(n._valueTracker=Ze(n))}function gt(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),u="";return n&&(u=Ie(n)?n.checked?"true":"false":n.value),n=u,n!==o?(i.setValue(n),!0):!1}function It(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function X(n,i){var o=i.checked;return se({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function yn(n,i){var o=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;o=we(i.value!=null?i.value:o),n._wrapperState={initialChecked:u,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function mt(n,i){i=i.checked,i!=null&&D(n,"checked",i,!1)}function ct(n,i){mt(n,i);var o=we(i.value),u=i.type;if(o!=null)u==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Rt(n,i.type,o):i.hasOwnProperty("defaultValue")&&Rt(n,i.type,we(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function qe(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function Rt(n,i,o){(i!=="number"||It(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var Ye=Array.isArray;function P(n,i,o,u){if(n=n.options,i){i={};for(var d=0;d<o.length;d++)i["$"+o[d]]=!0;for(o=0;o<n.length;o++)d=i.hasOwnProperty("$"+n[o].value),n[o].selected!==d&&(n[o].selected=d),d&&u&&(n[o].defaultSelected=!0)}else{for(o=""+we(o),i=null,d=0;d<n.length;d++){if(n[d].value===o){n[d].selected=!0,u&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function T(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return se({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Z(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(Ye(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:we(o)}}function pe(n,i){var o=we(i.value),u=we(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),u!=null&&(n.defaultValue=""+u)}function ge(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function de(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?de(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ae,Ue=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,u,d){MSApp.execUnsafeLocalFunction(function(){return n(i,o,u,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ae=Ae||document.createElement("div"),Ae.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ae.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ut(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var ye={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fe=["Webkit","ms","Moz","O"];Object.keys(ye).forEach(function(n){Fe.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),ye[i]=ye[n]})});function Qe(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||ye.hasOwnProperty(n)&&ye[n]?(""+i).trim():i+"px"}function Je(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var u=o.indexOf("--")===0,d=Qe(o,i[o],u);o==="float"&&(o="cssFloat"),u?n.setProperty(o,d):n[o]=d}}var Oe=se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ft(n,i){if(i){if(Oe[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function rt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var At=null;function H(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Re=null,re=null,he=null;function Pe(n){if(n=To(n)){if(typeof Re!="function")throw Error(t(280));var i=n.stateNode;i&&(i=wa(i),Re(n.stateNode,n.type,i))}}function be(n){re?he?he.push(n):he=[n]:re=n}function st(){if(re){var n=re,i=he;if(he=re=null,Pe(n),i)for(n=0;n<i.length;n++)Pe(i[n])}}function Nt(n,i){return n(i)}function $t(){}var xt=!1;function bn(n,i,o){if(xt)return n(i,o);xt=!0;try{return Nt(n,i,o)}finally{xt=!1,(re!==null||he!==null)&&($t(),st())}}function Sn(n,i){var o=n.stateNode;if(o===null)return null;var u=wa(o);if(u===null)return null;o=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var ss=!1;if(c)try{var Zi={};Object.defineProperty(Zi,"passive",{get:function(){ss=!0}}),window.addEventListener("test",Zi,Zi),window.removeEventListener("test",Zi,Zi)}catch{ss=!1}function Ri(n,i,o,u,d,p,M,L,F){var J=Array.prototype.slice.call(arguments,3);try{i.apply(o,J)}catch(ve){this.onError(ve)}}var Ci=!1,Pr=null,Lr=!1,Qi=null,sa={onError:function(n){Ci=!0,Pr=n}};function os(n,i,o,u,d,p,M,L,F){Ci=!1,Pr=null,Ri.apply(sa,arguments)}function oa(n,i,o,u,d,p,M,L,F){if(os.apply(this,arguments),Ci){if(Ci){var J=Pr;Ci=!1,Pr=null}else throw Error(t(198));Lr||(Lr=!0,Qi=J)}}function _i(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function aa(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function la(n){if(_i(n)!==n)throw Error(t(188))}function Jl(n){var i=n.alternate;if(!i){if(i=_i(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,u=i;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(u=d.return,u!==null){o=u;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return la(d),n;if(p===u)return la(d),i;p=p.sibling}throw Error(t(188))}if(o.return!==u.return)o=d,u=p;else{for(var M=!1,L=d.child;L;){if(L===o){M=!0,o=d,u=p;break}if(L===u){M=!0,u=d,o=p;break}L=L.sibling}if(!M){for(L=p.child;L;){if(L===o){M=!0,o=p,u=d;break}if(L===u){M=!0,u=p,o=d;break}L=L.sibling}if(!M)throw Error(t(189))}}if(o.alternate!==u)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function A(n){return n=Jl(n),n!==null?G(n):null}function G(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=G(n);if(i!==null)return i;n=n.sibling}return null}var ee=e.unstable_scheduleCallback,te=e.unstable_cancelCallback,W=e.unstable_shouldYield,Te=e.unstable_requestPaint,Se=e.unstable_now,Ve=e.unstable_getCurrentPriorityLevel,ze=e.unstable_ImmediatePriority,tt=e.unstable_UserBlockingPriority,it=e.unstable_NormalPriority,Ge=e.unstable_LowPriority,_t=e.unstable_IdlePriority,Tt=null,vt=null;function fn(n){if(vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(Tt,n,void 0,(n.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:Mt,je=Math.log,ii=Math.LN2;function Mt(n){return n>>>=0,n===0?32:31-(je(n)/ii|0)|0}var dn=64,ri=4194304;function Kt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function xi(n,i){var o=n.pendingLanes;if(o===0)return 0;var u=0,d=n.suspendedLanes,p=n.pingedLanes,M=o&268435455;if(M!==0){var L=M&~d;L!==0?u=Kt(L):(p&=M,p!==0&&(u=Kt(p)))}else M=o&~d,M!==0?u=Kt(M):p!==0&&(u=Kt(p));if(u===0)return 0;if(i!==0&&i!==u&&(i&d)===0&&(d=u&-u,p=i&-i,d>=p||d===16&&(p&4194240)!==0))return i;if((u&4)!==0&&(u|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)o=31-ot(i),d=1<<o,u|=n[o],i&=~d;return u}function Dt(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xn(n,i){for(var o=n.suspendedLanes,u=n.pingedLanes,d=n.expirationTimes,p=n.pendingLanes;0<p;){var M=31-ot(p),L=1<<M,F=d[M];F===-1?((L&o)===0||(L&u)!==0)&&(d[M]=Dt(L,i)):F<=i&&(n.expiredLanes|=L),p&=~L}}function bi(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Mn(){var n=dn;return dn<<=1,(dn&4194240)===0&&(dn=64),n}function jn(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function Pn(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-ot(i),n[i]=o}function ua(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<o;){var d=31-ot(o),p=1<<d;i[d]=0,u[d]=-1,n[d]=-1,o&=~p}}function eu(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var u=31-ot(o),d=1<<u;d&i|n[u]&i&&(n[u]|=i),o&=~d}}var Ct=0;function xd(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var yd,tu,Sd,Md,Ed,nu=!1,ca=[],Ji=null,er=null,tr=null,ao=new Map,lo=new Map,nr=[],Gg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Td(n,i){switch(n){case"focusin":case"focusout":Ji=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":ao.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":lo.delete(i.pointerId)}}function uo(n,i,o,u,d,p){return n===null||n.nativeEvent!==p?(n={blockedOn:i,domEventName:o,eventSystemFlags:u,nativeEvent:p,targetContainers:[d]},i!==null&&(i=To(i),i!==null&&tu(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function Wg(n,i,o,u,d){switch(i){case"focusin":return Ji=uo(Ji,n,i,o,u,d),!0;case"dragenter":return er=uo(er,n,i,o,u,d),!0;case"mouseover":return tr=uo(tr,n,i,o,u,d),!0;case"pointerover":var p=d.pointerId;return ao.set(p,uo(ao.get(p)||null,n,i,o,u,d)),!0;case"gotpointercapture":return p=d.pointerId,lo.set(p,uo(lo.get(p)||null,n,i,o,u,d)),!0}return!1}function wd(n){var i=Dr(n.target);if(i!==null){var o=_i(i);if(o!==null){if(i=o.tag,i===13){if(i=aa(o),i!==null){n.blockedOn=i,Ed(n.priority,function(){Sd(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function fa(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=ru(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var u=new o.constructor(o.type,o);At=u,o.target.dispatchEvent(u),At=null}else return i=To(o),i!==null&&tu(i),n.blockedOn=o,!1;i.shift()}return!0}function Ad(n,i,o){fa(n)&&o.delete(i)}function Xg(){nu=!1,Ji!==null&&fa(Ji)&&(Ji=null),er!==null&&fa(er)&&(er=null),tr!==null&&fa(tr)&&(tr=null),ao.forEach(Ad),lo.forEach(Ad)}function co(n,i){n.blockedOn===i&&(n.blockedOn=null,nu||(nu=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Xg)))}function fo(n){function i(d){return co(d,n)}if(0<ca.length){co(ca[0],n);for(var o=1;o<ca.length;o++){var u=ca[o];u.blockedOn===n&&(u.blockedOn=null)}}for(Ji!==null&&co(Ji,n),er!==null&&co(er,n),tr!==null&&co(tr,n),ao.forEach(i),lo.forEach(i),o=0;o<nr.length;o++)u=nr[o],u.blockedOn===n&&(u.blockedOn=null);for(;0<nr.length&&(o=nr[0],o.blockedOn===null);)wd(o),o.blockedOn===null&&nr.shift()}var as=C.ReactCurrentBatchConfig,da=!0;function jg(n,i,o,u){var d=Ct,p=as.transition;as.transition=null;try{Ct=1,iu(n,i,o,u)}finally{Ct=d,as.transition=p}}function Yg(n,i,o,u){var d=Ct,p=as.transition;as.transition=null;try{Ct=4,iu(n,i,o,u)}finally{Ct=d,as.transition=p}}function iu(n,i,o,u){if(da){var d=ru(n,i,o,u);if(d===null)Su(n,i,u,ha,o),Td(n,u);else if(Wg(d,n,i,o,u))u.stopPropagation();else if(Td(n,u),i&4&&-1<Gg.indexOf(n)){for(;d!==null;){var p=To(d);if(p!==null&&yd(p),p=ru(n,i,o,u),p===null&&Su(n,i,u,ha,o),p===d)break;d=p}d!==null&&u.stopPropagation()}else Su(n,i,u,null,o)}}var ha=null;function ru(n,i,o,u){if(ha=null,n=H(u),n=Dr(n),n!==null)if(i=_i(n),i===null)n=null;else if(o=i.tag,o===13){if(n=aa(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return ha=n,null}function Rd(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ve()){case ze:return 1;case tt:return 4;case it:case Ge:return 16;case _t:return 536870912;default:return 16}default:return 16}}var ir=null,su=null,pa=null;function Cd(){if(pa)return pa;var n,i=su,o=i.length,u,d="value"in ir?ir.value:ir.textContent,p=d.length;for(n=0;n<o&&i[n]===d[n];n++);var M=o-n;for(u=1;u<=M&&i[o-u]===d[p-u];u++);return pa=d.slice(n,1<u?1-u:void 0)}function ma(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function ga(){return!0}function bd(){return!1}function kn(n){function i(o,u,d,p,M){this._reactName=o,this._targetInst=d,this.type=u,this.nativeEvent=p,this.target=M,this.currentTarget=null;for(var L in n)n.hasOwnProperty(L)&&(o=n[L],this[L]=o?o(p):p[L]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?ga:bd,this.isPropagationStopped=bd,this}return se(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=ga)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=ga)},persist:function(){},isPersistent:ga}),i}var ls={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ou=kn(ls),ho=se({},ls,{view:0,detail:0}),qg=kn(ho),au,lu,po,va=se({},ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cu,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==po&&(po&&n.type==="mousemove"?(au=n.screenX-po.screenX,lu=n.screenY-po.screenY):lu=au=0,po=n),au)},movementY:function(n){return"movementY"in n?n.movementY:lu}}),Pd=kn(va),$g=se({},va,{dataTransfer:0}),Kg=kn($g),Zg=se({},ho,{relatedTarget:0}),uu=kn(Zg),Qg=se({},ls,{animationName:0,elapsedTime:0,pseudoElement:0}),Jg=kn(Qg),ev=se({},ls,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),tv=kn(ev),nv=se({},ls,{data:0}),Ld=kn(nv),iv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ov(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=sv[n])?!!i[n]:!1}function cu(){return ov}var av=se({},ho,{key:function(n){if(n.key){var i=iv[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=ma(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?rv[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cu,charCode:function(n){return n.type==="keypress"?ma(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?ma(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),lv=kn(av),uv=se({},va,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dd=kn(uv),cv=se({},ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cu}),fv=kn(cv),dv=se({},ls,{propertyName:0,elapsedTime:0,pseudoElement:0}),hv=kn(dv),pv=se({},va,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),mv=kn(pv),gv=[9,13,27,32],fu=c&&"CompositionEvent"in window,mo=null;c&&"documentMode"in document&&(mo=document.documentMode);var vv=c&&"TextEvent"in window&&!mo,Id=c&&(!fu||mo&&8<mo&&11>=mo),Ud=" ",Nd=!1;function Fd(n,i){switch(n){case"keyup":return gv.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Od(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var us=!1;function _v(n,i){switch(n){case"compositionend":return Od(i);case"keypress":return i.which!==32?null:(Nd=!0,Ud);case"textInput":return n=i.data,n===Ud&&Nd?null:n;default:return null}}function xv(n,i){if(us)return n==="compositionend"||!fu&&Fd(n,i)?(n=Cd(),pa=su=ir=null,us=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Id&&i.locale!=="ko"?null:i.data;default:return null}}var yv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function kd(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!yv[n.type]:i==="textarea"}function zd(n,i,o,u){be(u),i=Ma(i,"onChange"),0<i.length&&(o=new ou("onChange","change",null,o,u),n.push({event:o,listeners:i}))}var go=null,vo=null;function Sv(n){ih(n,0)}function _a(n){var i=ps(n);if(gt(i))return n}function Mv(n,i){if(n==="change")return i}var Bd=!1;if(c){var du;if(c){var hu="oninput"in document;if(!hu){var Hd=document.createElement("div");Hd.setAttribute("oninput","return;"),hu=typeof Hd.oninput=="function"}du=hu}else du=!1;Bd=du&&(!document.documentMode||9<document.documentMode)}function Vd(){go&&(go.detachEvent("onpropertychange",Gd),vo=go=null)}function Gd(n){if(n.propertyName==="value"&&_a(vo)){var i=[];zd(i,vo,n,H(n)),bn(Sv,i)}}function Ev(n,i,o){n==="focusin"?(Vd(),go=i,vo=o,go.attachEvent("onpropertychange",Gd)):n==="focusout"&&Vd()}function Tv(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return _a(vo)}function wv(n,i){if(n==="click")return _a(i)}function Av(n,i){if(n==="input"||n==="change")return _a(i)}function Rv(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var si=typeof Object.is=="function"?Object.is:Rv;function _o(n,i){if(si(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),u=Object.keys(i);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var d=o[u];if(!h.call(i,d)||!si(n[d],i[d]))return!1}return!0}function Wd(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Xd(n,i){var o=Wd(n);n=0;for(var u;o;){if(o.nodeType===3){if(u=n+o.textContent.length,n<=i&&u>=i)return{node:o,offset:i-n};n=u}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Wd(o)}}function jd(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?jd(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Yd(){for(var n=window,i=It();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=It(n.document)}return i}function pu(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Cv(n){var i=Yd(),o=n.focusedElem,u=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&jd(o.ownerDocument.documentElement,o)){if(u!==null&&pu(o)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=o.textContent.length,p=Math.min(u.start,d);u=u.end===void 0?p:Math.min(u.end,d),!n.extend&&p>u&&(d=u,u=p,p=d),d=Xd(o,p);var M=Xd(o,u);d&&M&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==M.node||n.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),p>u?(n.addRange(i),n.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var bv=c&&"documentMode"in document&&11>=document.documentMode,cs=null,mu=null,xo=null,gu=!1;function qd(n,i,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;gu||cs==null||cs!==It(u)||(u=cs,"selectionStart"in u&&pu(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),xo&&_o(xo,u)||(xo=u,u=Ma(mu,"onSelect"),0<u.length&&(i=new ou("onSelect","select",null,i,o),n.push({event:i,listeners:u}),i.target=cs)))}function xa(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var fs={animationend:xa("Animation","AnimationEnd"),animationiteration:xa("Animation","AnimationIteration"),animationstart:xa("Animation","AnimationStart"),transitionend:xa("Transition","TransitionEnd")},vu={},$d={};c&&($d=document.createElement("div").style,"AnimationEvent"in window||(delete fs.animationend.animation,delete fs.animationiteration.animation,delete fs.animationstart.animation),"TransitionEvent"in window||delete fs.transitionend.transition);function ya(n){if(vu[n])return vu[n];if(!fs[n])return n;var i=fs[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in $d)return vu[n]=i[o];return n}var Kd=ya("animationend"),Zd=ya("animationiteration"),Qd=ya("animationstart"),Jd=ya("transitionend"),eh=new Map,th="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function rr(n,i){eh.set(n,i),l(i,[n])}for(var _u=0;_u<th.length;_u++){var xu=th[_u],Pv=xu.toLowerCase(),Lv=xu[0].toUpperCase()+xu.slice(1);rr(Pv,"on"+Lv)}rr(Kd,"onAnimationEnd"),rr(Zd,"onAnimationIteration"),rr(Qd,"onAnimationStart"),rr("dblclick","onDoubleClick"),rr("focusin","onFocus"),rr("focusout","onBlur"),rr(Jd,"onTransitionEnd"),f("onMouseEnter",["mouseout","mouseover"]),f("onMouseLeave",["mouseout","mouseover"]),f("onPointerEnter",["pointerout","pointerover"]),f("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dv=new Set("cancel close invalid load scroll toggle".split(" ").concat(yo));function nh(n,i,o){var u=n.type||"unknown-event";n.currentTarget=o,oa(u,i,void 0,n),n.currentTarget=null}function ih(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var u=n[o],d=u.event;u=u.listeners;e:{var p=void 0;if(i)for(var M=u.length-1;0<=M;M--){var L=u[M],F=L.instance,J=L.currentTarget;if(L=L.listener,F!==p&&d.isPropagationStopped())break e;nh(d,L,J),p=F}else for(M=0;M<u.length;M++){if(L=u[M],F=L.instance,J=L.currentTarget,L=L.listener,F!==p&&d.isPropagationStopped())break e;nh(d,L,J),p=F}}}if(Lr)throw n=Qi,Lr=!1,Qi=null,n}function Ft(n,i){var o=i[Ru];o===void 0&&(o=i[Ru]=new Set);var u=n+"__bubble";o.has(u)||(rh(i,n,2,!1),o.add(u))}function yu(n,i,o){var u=0;i&&(u|=4),rh(o,n,u,i)}var Sa="_reactListening"+Math.random().toString(36).slice(2);function So(n){if(!n[Sa]){n[Sa]=!0,r.forEach(function(o){o!=="selectionchange"&&(Dv.has(o)||yu(o,!1,n),yu(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Sa]||(i[Sa]=!0,yu("selectionchange",!1,i))}}function rh(n,i,o,u){switch(Rd(i)){case 1:var d=jg;break;case 4:d=Yg;break;default:d=iu}o=d.bind(null,i,o,n),d=void 0,!ss||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),u?d!==void 0?n.addEventListener(i,o,{capture:!0,passive:d}):n.addEventListener(i,o,!0):d!==void 0?n.addEventListener(i,o,{passive:d}):n.addEventListener(i,o,!1)}function Su(n,i,o,u,d){var p=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var M=u.tag;if(M===3||M===4){var L=u.stateNode.containerInfo;if(L===d||L.nodeType===8&&L.parentNode===d)break;if(M===4)for(M=u.return;M!==null;){var F=M.tag;if((F===3||F===4)&&(F=M.stateNode.containerInfo,F===d||F.nodeType===8&&F.parentNode===d))return;M=M.return}for(;L!==null;){if(M=Dr(L),M===null)return;if(F=M.tag,F===5||F===6){u=p=M;continue e}L=L.parentNode}}u=u.return}bn(function(){var J=p,ve=H(o),xe=[];e:{var me=eh.get(n);if(me!==void 0){var Le=ou,ke=n;switch(n){case"keypress":if(ma(o)===0)break e;case"keydown":case"keyup":Le=lv;break;case"focusin":ke="focus",Le=uu;break;case"focusout":ke="blur",Le=uu;break;case"beforeblur":case"afterblur":Le=uu;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Le=Pd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Le=Kg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Le=fv;break;case Kd:case Zd:case Qd:Le=Jg;break;case Jd:Le=hv;break;case"scroll":Le=qg;break;case"wheel":Le=mv;break;case"copy":case"cut":case"paste":Le=tv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Le=Dd}var Be=(i&4)!==0,Xt=!Be&&n==="scroll",j=Be?me!==null?me+"Capture":null:me;Be=[];for(var B=J,$;B!==null;){$=B;var Ee=$.stateNode;if($.tag===5&&Ee!==null&&($=Ee,j!==null&&(Ee=Sn(B,j),Ee!=null&&Be.push(Mo(B,Ee,$)))),Xt)break;B=B.return}0<Be.length&&(me=new Le(me,ke,null,o,ve),xe.push({event:me,listeners:Be}))}}if((i&7)===0){e:{if(me=n==="mouseover"||n==="pointerover",Le=n==="mouseout"||n==="pointerout",me&&o!==At&&(ke=o.relatedTarget||o.fromElement)&&(Dr(ke)||ke[Pi]))break e;if((Le||me)&&(me=ve.window===ve?ve:(me=ve.ownerDocument)?me.defaultView||me.parentWindow:window,Le?(ke=o.relatedTarget||o.toElement,Le=J,ke=ke?Dr(ke):null,ke!==null&&(Xt=_i(ke),ke!==Xt||ke.tag!==5&&ke.tag!==6)&&(ke=null)):(Le=null,ke=J),Le!==ke)){if(Be=Pd,Ee="onMouseLeave",j="onMouseEnter",B="mouse",(n==="pointerout"||n==="pointerover")&&(Be=Dd,Ee="onPointerLeave",j="onPointerEnter",B="pointer"),Xt=Le==null?me:ps(Le),$=ke==null?me:ps(ke),me=new Be(Ee,B+"leave",Le,o,ve),me.target=Xt,me.relatedTarget=$,Ee=null,Dr(ve)===J&&(Be=new Be(j,B+"enter",ke,o,ve),Be.target=$,Be.relatedTarget=Xt,Ee=Be),Xt=Ee,Le&&ke)t:{for(Be=Le,j=ke,B=0,$=Be;$;$=ds($))B++;for($=0,Ee=j;Ee;Ee=ds(Ee))$++;for(;0<B-$;)Be=ds(Be),B--;for(;0<$-B;)j=ds(j),$--;for(;B--;){if(Be===j||j!==null&&Be===j.alternate)break t;Be=ds(Be),j=ds(j)}Be=null}else Be=null;Le!==null&&sh(xe,me,Le,Be,!1),ke!==null&&Xt!==null&&sh(xe,Xt,ke,Be,!0)}}e:{if(me=J?ps(J):window,Le=me.nodeName&&me.nodeName.toLowerCase(),Le==="select"||Le==="input"&&me.type==="file")var We=Mv;else if(kd(me))if(Bd)We=Av;else{We=Tv;var $e=Ev}else(Le=me.nodeName)&&Le.toLowerCase()==="input"&&(me.type==="checkbox"||me.type==="radio")&&(We=wv);if(We&&(We=We(n,J))){zd(xe,We,o,ve);break e}$e&&$e(n,me,J),n==="focusout"&&($e=me._wrapperState)&&$e.controlled&&me.type==="number"&&Rt(me,"number",me.value)}switch($e=J?ps(J):window,n){case"focusin":(kd($e)||$e.contentEditable==="true")&&(cs=$e,mu=J,xo=null);break;case"focusout":xo=mu=cs=null;break;case"mousedown":gu=!0;break;case"contextmenu":case"mouseup":case"dragend":gu=!1,qd(xe,o,ve);break;case"selectionchange":if(bv)break;case"keydown":case"keyup":qd(xe,o,ve)}var Ke;if(fu)e:{switch(n){case"compositionstart":var nt="onCompositionStart";break e;case"compositionend":nt="onCompositionEnd";break e;case"compositionupdate":nt="onCompositionUpdate";break e}nt=void 0}else us?Fd(n,o)&&(nt="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(nt="onCompositionStart");nt&&(Id&&o.locale!=="ko"&&(us||nt!=="onCompositionStart"?nt==="onCompositionEnd"&&us&&(Ke=Cd()):(ir=ve,su="value"in ir?ir.value:ir.textContent,us=!0)),$e=Ma(J,nt),0<$e.length&&(nt=new Ld(nt,n,null,o,ve),xe.push({event:nt,listeners:$e}),Ke?nt.data=Ke:(Ke=Od(o),Ke!==null&&(nt.data=Ke)))),(Ke=vv?_v(n,o):xv(n,o))&&(J=Ma(J,"onBeforeInput"),0<J.length&&(ve=new Ld("onBeforeInput","beforeinput",null,o,ve),xe.push({event:ve,listeners:J}),ve.data=Ke))}ih(xe,i)})}function Mo(n,i,o){return{instance:n,listener:i,currentTarget:o}}function Ma(n,i){for(var o=i+"Capture",u=[];n!==null;){var d=n,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=Sn(n,o),p!=null&&u.unshift(Mo(n,p,d)),p=Sn(n,i),p!=null&&u.push(Mo(n,p,d))),n=n.return}return u}function ds(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function sh(n,i,o,u,d){for(var p=i._reactName,M=[];o!==null&&o!==u;){var L=o,F=L.alternate,J=L.stateNode;if(F!==null&&F===u)break;L.tag===5&&J!==null&&(L=J,d?(F=Sn(o,p),F!=null&&M.unshift(Mo(o,F,L))):d||(F=Sn(o,p),F!=null&&M.push(Mo(o,F,L)))),o=o.return}M.length!==0&&n.push({event:i,listeners:M})}var Iv=/\r\n?/g,Uv=/\u0000|\uFFFD/g;function oh(n){return(typeof n=="string"?n:""+n).replace(Iv,`
`).replace(Uv,"")}function Ea(n,i,o){if(i=oh(i),oh(n)!==i&&o)throw Error(t(425))}function Ta(){}var Mu=null,Eu=null;function Tu(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var wu=typeof setTimeout=="function"?setTimeout:void 0,Nv=typeof clearTimeout=="function"?clearTimeout:void 0,ah=typeof Promise=="function"?Promise:void 0,Fv=typeof queueMicrotask=="function"?queueMicrotask:typeof ah<"u"?function(n){return ah.resolve(null).then(n).catch(Ov)}:wu;function Ov(n){setTimeout(function(){throw n})}function Au(n,i){var o=i,u=0;do{var d=o.nextSibling;if(n.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(u===0){n.removeChild(d),fo(i);return}u--}else o!=="$"&&o!=="$?"&&o!=="$!"||u++;o=d}while(o);fo(i)}function sr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function lh(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var hs=Math.random().toString(36).slice(2),yi="__reactFiber$"+hs,Eo="__reactProps$"+hs,Pi="__reactContainer$"+hs,Ru="__reactEvents$"+hs,kv="__reactListeners$"+hs,zv="__reactHandles$"+hs;function Dr(n){var i=n[yi];if(i)return i;for(var o=n.parentNode;o;){if(i=o[Pi]||o[yi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=lh(n);n!==null;){if(o=n[yi])return o;n=lh(n)}return i}n=o,o=n.parentNode}return null}function To(n){return n=n[yi]||n[Pi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ps(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function wa(n){return n[Eo]||null}var Cu=[],ms=-1;function or(n){return{current:n}}function Ot(n){0>ms||(n.current=Cu[ms],Cu[ms]=null,ms--)}function Ut(n,i){ms++,Cu[ms]=n.current,n.current=i}var ar={},hn=or(ar),Ln=or(!1),Ir=ar;function gs(n,i){var o=n.type.contextTypes;if(!o)return ar;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=i[p];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function Dn(n){return n=n.childContextTypes,n!=null}function Aa(){Ot(Ln),Ot(hn)}function uh(n,i,o){if(hn.current!==ar)throw Error(t(168));Ut(hn,i),Ut(Ln,o)}function ch(n,i,o){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return o;u=u.getChildContext();for(var d in u)if(!(d in i))throw Error(t(108,_e(n)||"Unknown",d));return se({},o,u)}function Ra(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||ar,Ir=hn.current,Ut(hn,n),Ut(Ln,Ln.current),!0}function fh(n,i,o){var u=n.stateNode;if(!u)throw Error(t(169));o?(n=ch(n,i,Ir),u.__reactInternalMemoizedMergedChildContext=n,Ot(Ln),Ot(hn),Ut(hn,n)):Ot(Ln),Ut(Ln,o)}var Li=null,Ca=!1,bu=!1;function dh(n){Li===null?Li=[n]:Li.push(n)}function Bv(n){Ca=!0,dh(n)}function lr(){if(!bu&&Li!==null){bu=!0;var n=0,i=Ct;try{var o=Li;for(Ct=1;n<o.length;n++){var u=o[n];do u=u(!0);while(u!==null)}Li=null,Ca=!1}catch(d){throw Li!==null&&(Li=Li.slice(n+1)),ee(ze,lr),d}finally{Ct=i,bu=!1}}return null}var vs=[],_s=0,ba=null,Pa=0,Yn=[],qn=0,Ur=null,Di=1,Ii="";function Nr(n,i){vs[_s++]=Pa,vs[_s++]=ba,ba=n,Pa=i}function hh(n,i,o){Yn[qn++]=Di,Yn[qn++]=Ii,Yn[qn++]=Ur,Ur=n;var u=Di;n=Ii;var d=32-ot(u)-1;u&=~(1<<d),o+=1;var p=32-ot(i)+d;if(30<p){var M=d-d%5;p=(u&(1<<M)-1).toString(32),u>>=M,d-=M,Di=1<<32-ot(i)+d|o<<d|u,Ii=p+n}else Di=1<<p|o<<d|u,Ii=n}function Pu(n){n.return!==null&&(Nr(n,1),hh(n,1,0))}function Lu(n){for(;n===ba;)ba=vs[--_s],vs[_s]=null,Pa=vs[--_s],vs[_s]=null;for(;n===Ur;)Ur=Yn[--qn],Yn[qn]=null,Ii=Yn[--qn],Yn[qn]=null,Di=Yn[--qn],Yn[qn]=null}var zn=null,Bn=null,zt=!1,oi=null;function ph(n,i){var o=Qn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function mh(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,zn=n,Bn=sr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,zn=n,Bn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Ur!==null?{id:Di,overflow:Ii}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Qn(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,zn=n,Bn=null,!0):!1;default:return!1}}function Du(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Iu(n){if(zt){var i=Bn;if(i){var o=i;if(!mh(n,i)){if(Du(n))throw Error(t(418));i=sr(o.nextSibling);var u=zn;i&&mh(n,i)?ph(u,o):(n.flags=n.flags&-4097|2,zt=!1,zn=n)}}else{if(Du(n))throw Error(t(418));n.flags=n.flags&-4097|2,zt=!1,zn=n}}}function gh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;zn=n}function La(n){if(n!==zn)return!1;if(!zt)return gh(n),zt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Tu(n.type,n.memoizedProps)),i&&(i=Bn)){if(Du(n))throw vh(),Error(t(418));for(;i;)ph(n,i),i=sr(i.nextSibling)}if(gh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){Bn=sr(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}Bn=null}}else Bn=zn?sr(n.stateNode.nextSibling):null;return!0}function vh(){for(var n=Bn;n;)n=sr(n.nextSibling)}function xs(){Bn=zn=null,zt=!1}function Uu(n){oi===null?oi=[n]:oi.push(n)}var Hv=C.ReactCurrentBatchConfig;function wo(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var u=o.stateNode}if(!u)throw Error(t(147,n));var d=u,p=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(M){var L=d.refs;M===null?delete L[p]:L[p]=M},i._stringRef=p,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function Da(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function _h(n){var i=n._init;return i(n._payload)}function xh(n){function i(j,B){if(n){var $=j.deletions;$===null?(j.deletions=[B],j.flags|=16):$.push(B)}}function o(j,B){if(!n)return null;for(;B!==null;)i(j,B),B=B.sibling;return null}function u(j,B){for(j=new Map;B!==null;)B.key!==null?j.set(B.key,B):j.set(B.index,B),B=B.sibling;return j}function d(j,B){return j=gr(j,B),j.index=0,j.sibling=null,j}function p(j,B,$){return j.index=$,n?($=j.alternate,$!==null?($=$.index,$<B?(j.flags|=2,B):$):(j.flags|=2,B)):(j.flags|=1048576,B)}function M(j){return n&&j.alternate===null&&(j.flags|=2),j}function L(j,B,$,Ee){return B===null||B.tag!==6?(B=wc($,j.mode,Ee),B.return=j,B):(B=d(B,$),B.return=j,B)}function F(j,B,$,Ee){var We=$.type;return We===N?ve(j,B,$.props.children,Ee,$.key):B!==null&&(B.elementType===We||typeof We=="object"&&We!==null&&We.$$typeof===oe&&_h(We)===B.type)?(Ee=d(B,$.props),Ee.ref=wo(j,B,$),Ee.return=j,Ee):(Ee=nl($.type,$.key,$.props,null,j.mode,Ee),Ee.ref=wo(j,B,$),Ee.return=j,Ee)}function J(j,B,$,Ee){return B===null||B.tag!==4||B.stateNode.containerInfo!==$.containerInfo||B.stateNode.implementation!==$.implementation?(B=Ac($,j.mode,Ee),B.return=j,B):(B=d(B,$.children||[]),B.return=j,B)}function ve(j,B,$,Ee,We){return B===null||B.tag!==7?(B=Gr($,j.mode,Ee,We),B.return=j,B):(B=d(B,$),B.return=j,B)}function xe(j,B,$){if(typeof B=="string"&&B!==""||typeof B=="number")return B=wc(""+B,j.mode,$),B.return=j,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case q:return $=nl(B.type,B.key,B.props,null,j.mode,$),$.ref=wo(j,null,B),$.return=j,$;case O:return B=Ac(B,j.mode,$),B.return=j,B;case oe:var Ee=B._init;return xe(j,Ee(B._payload),$)}if(Ye(B)||le(B))return B=Gr(B,j.mode,$,null),B.return=j,B;Da(j,B)}return null}function me(j,B,$,Ee){var We=B!==null?B.key:null;if(typeof $=="string"&&$!==""||typeof $=="number")return We!==null?null:L(j,B,""+$,Ee);if(typeof $=="object"&&$!==null){switch($.$$typeof){case q:return $.key===We?F(j,B,$,Ee):null;case O:return $.key===We?J(j,B,$,Ee):null;case oe:return We=$._init,me(j,B,We($._payload),Ee)}if(Ye($)||le($))return We!==null?null:ve(j,B,$,Ee,null);Da(j,$)}return null}function Le(j,B,$,Ee,We){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return j=j.get($)||null,L(B,j,""+Ee,We);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case q:return j=j.get(Ee.key===null?$:Ee.key)||null,F(B,j,Ee,We);case O:return j=j.get(Ee.key===null?$:Ee.key)||null,J(B,j,Ee,We);case oe:var $e=Ee._init;return Le(j,B,$,$e(Ee._payload),We)}if(Ye(Ee)||le(Ee))return j=j.get($)||null,ve(B,j,Ee,We,null);Da(B,Ee)}return null}function ke(j,B,$,Ee){for(var We=null,$e=null,Ke=B,nt=B=0,on=null;Ke!==null&&nt<$.length;nt++){Ke.index>nt?(on=Ke,Ke=null):on=Ke.sibling;var Et=me(j,Ke,$[nt],Ee);if(Et===null){Ke===null&&(Ke=on);break}n&&Ke&&Et.alternate===null&&i(j,Ke),B=p(Et,B,nt),$e===null?We=Et:$e.sibling=Et,$e=Et,Ke=on}if(nt===$.length)return o(j,Ke),zt&&Nr(j,nt),We;if(Ke===null){for(;nt<$.length;nt++)Ke=xe(j,$[nt],Ee),Ke!==null&&(B=p(Ke,B,nt),$e===null?We=Ke:$e.sibling=Ke,$e=Ke);return zt&&Nr(j,nt),We}for(Ke=u(j,Ke);nt<$.length;nt++)on=Le(Ke,j,nt,$[nt],Ee),on!==null&&(n&&on.alternate!==null&&Ke.delete(on.key===null?nt:on.key),B=p(on,B,nt),$e===null?We=on:$e.sibling=on,$e=on);return n&&Ke.forEach(function(vr){return i(j,vr)}),zt&&Nr(j,nt),We}function Be(j,B,$,Ee){var We=le($);if(typeof We!="function")throw Error(t(150));if($=We.call($),$==null)throw Error(t(151));for(var $e=We=null,Ke=B,nt=B=0,on=null,Et=$.next();Ke!==null&&!Et.done;nt++,Et=$.next()){Ke.index>nt?(on=Ke,Ke=null):on=Ke.sibling;var vr=me(j,Ke,Et.value,Ee);if(vr===null){Ke===null&&(Ke=on);break}n&&Ke&&vr.alternate===null&&i(j,Ke),B=p(vr,B,nt),$e===null?We=vr:$e.sibling=vr,$e=vr,Ke=on}if(Et.done)return o(j,Ke),zt&&Nr(j,nt),We;if(Ke===null){for(;!Et.done;nt++,Et=$.next())Et=xe(j,Et.value,Ee),Et!==null&&(B=p(Et,B,nt),$e===null?We=Et:$e.sibling=Et,$e=Et);return zt&&Nr(j,nt),We}for(Ke=u(j,Ke);!Et.done;nt++,Et=$.next())Et=Le(Ke,j,nt,Et.value,Ee),Et!==null&&(n&&Et.alternate!==null&&Ke.delete(Et.key===null?nt:Et.key),B=p(Et,B,nt),$e===null?We=Et:$e.sibling=Et,$e=Et);return n&&Ke.forEach(function(y0){return i(j,y0)}),zt&&Nr(j,nt),We}function Xt(j,B,$,Ee){if(typeof $=="object"&&$!==null&&$.type===N&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case q:e:{for(var We=$.key,$e=B;$e!==null;){if($e.key===We){if(We=$.type,We===N){if($e.tag===7){o(j,$e.sibling),B=d($e,$.props.children),B.return=j,j=B;break e}}else if($e.elementType===We||typeof We=="object"&&We!==null&&We.$$typeof===oe&&_h(We)===$e.type){o(j,$e.sibling),B=d($e,$.props),B.ref=wo(j,$e,$),B.return=j,j=B;break e}o(j,$e);break}else i(j,$e);$e=$e.sibling}$.type===N?(B=Gr($.props.children,j.mode,Ee,$.key),B.return=j,j=B):(Ee=nl($.type,$.key,$.props,null,j.mode,Ee),Ee.ref=wo(j,B,$),Ee.return=j,j=Ee)}return M(j);case O:e:{for($e=$.key;B!==null;){if(B.key===$e)if(B.tag===4&&B.stateNode.containerInfo===$.containerInfo&&B.stateNode.implementation===$.implementation){o(j,B.sibling),B=d(B,$.children||[]),B.return=j,j=B;break e}else{o(j,B);break}else i(j,B);B=B.sibling}B=Ac($,j.mode,Ee),B.return=j,j=B}return M(j);case oe:return $e=$._init,Xt(j,B,$e($._payload),Ee)}if(Ye($))return ke(j,B,$,Ee);if(le($))return Be(j,B,$,Ee);Da(j,$)}return typeof $=="string"&&$!==""||typeof $=="number"?($=""+$,B!==null&&B.tag===6?(o(j,B.sibling),B=d(B,$),B.return=j,j=B):(o(j,B),B=wc($,j.mode,Ee),B.return=j,j=B),M(j)):o(j,B)}return Xt}var ys=xh(!0),yh=xh(!1),Ia=or(null),Ua=null,Ss=null,Nu=null;function Fu(){Nu=Ss=Ua=null}function Ou(n){var i=Ia.current;Ot(Ia),n._currentValue=i}function ku(n,i,o){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===o)break;n=n.return}}function Ms(n,i){Ua=n,Nu=Ss=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(In=!0),n.firstContext=null)}function $n(n){var i=n._currentValue;if(Nu!==n)if(n={context:n,memoizedValue:i,next:null},Ss===null){if(Ua===null)throw Error(t(308));Ss=n,Ua.dependencies={lanes:0,firstContext:n}}else Ss=Ss.next=n;return i}var Fr=null;function zu(n){Fr===null?Fr=[n]:Fr.push(n)}function Sh(n,i,o,u){var d=i.interleaved;return d===null?(o.next=o,zu(i)):(o.next=d.next,d.next=o),i.interleaved=o,Ui(n,u)}function Ui(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var ur=!1;function Bu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mh(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ni(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function cr(n,i,o){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(yt&2)!==0){var d=u.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),u.pending=i,Ui(n,o)}return d=u.interleaved,d===null?(i.next=i,zu(u)):(i.next=d.next,d.next=i),u.interleaved=i,Ui(n,o)}function Na(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,eu(n,o)}}function Eh(n,i){var o=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var M={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=M:p=p.next=M,o=o.next}while(o!==null);p===null?d=p=i:p=p.next=i}else d=p=i;o={baseState:u.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:u.shared,effects:u.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function Fa(n,i,o,u){var d=n.updateQueue;ur=!1;var p=d.firstBaseUpdate,M=d.lastBaseUpdate,L=d.shared.pending;if(L!==null){d.shared.pending=null;var F=L,J=F.next;F.next=null,M===null?p=J:M.next=J,M=F;var ve=n.alternate;ve!==null&&(ve=ve.updateQueue,L=ve.lastBaseUpdate,L!==M&&(L===null?ve.firstBaseUpdate=J:L.next=J,ve.lastBaseUpdate=F))}if(p!==null){var xe=d.baseState;M=0,ve=J=F=null,L=p;do{var me=L.lane,Le=L.eventTime;if((u&me)===me){ve!==null&&(ve=ve.next={eventTime:Le,lane:0,tag:L.tag,payload:L.payload,callback:L.callback,next:null});e:{var ke=n,Be=L;switch(me=i,Le=o,Be.tag){case 1:if(ke=Be.payload,typeof ke=="function"){xe=ke.call(Le,xe,me);break e}xe=ke;break e;case 3:ke.flags=ke.flags&-65537|128;case 0:if(ke=Be.payload,me=typeof ke=="function"?ke.call(Le,xe,me):ke,me==null)break e;xe=se({},xe,me);break e;case 2:ur=!0}}L.callback!==null&&L.lane!==0&&(n.flags|=64,me=d.effects,me===null?d.effects=[L]:me.push(L))}else Le={eventTime:Le,lane:me,tag:L.tag,payload:L.payload,callback:L.callback,next:null},ve===null?(J=ve=Le,F=xe):ve=ve.next=Le,M|=me;if(L=L.next,L===null){if(L=d.shared.pending,L===null)break;me=L,L=me.next,me.next=null,d.lastBaseUpdate=me,d.shared.pending=null}}while(!0);if(ve===null&&(F=xe),d.baseState=F,d.firstBaseUpdate=J,d.lastBaseUpdate=ve,i=d.shared.interleaved,i!==null){d=i;do M|=d.lane,d=d.next;while(d!==i)}else p===null&&(d.shared.lanes=0);zr|=M,n.lanes=M,n.memoizedState=xe}}function Th(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],d=u.callback;if(d!==null){if(u.callback=null,u=o,typeof d!="function")throw Error(t(191,d));d.call(u)}}}var Ao={},Si=or(Ao),Ro=or(Ao),Co=or(Ao);function Or(n){if(n===Ao)throw Error(t(174));return n}function Hu(n,i){switch(Ut(Co,i),Ut(Ro,n),Ut(Si,Ao),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:He(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=He(i,n)}Ot(Si),Ut(Si,i)}function Es(){Ot(Si),Ot(Ro),Ot(Co)}function wh(n){Or(Co.current);var i=Or(Si.current),o=He(i,n.type);i!==o&&(Ut(Ro,n),Ut(Si,o))}function Vu(n){Ro.current===n&&(Ot(Si),Ot(Ro))}var Bt=or(0);function Oa(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Gu=[];function Wu(){for(var n=0;n<Gu.length;n++)Gu[n]._workInProgressVersionPrimary=null;Gu.length=0}var ka=C.ReactCurrentDispatcher,Xu=C.ReactCurrentBatchConfig,kr=0,Ht=null,Zt=null,rn=null,za=!1,bo=!1,Po=0,Vv=0;function pn(){throw Error(t(321))}function ju(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!si(n[o],i[o]))return!1;return!0}function Yu(n,i,o,u,d,p){if(kr=p,Ht=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,ka.current=n===null||n.memoizedState===null?jv:Yv,n=o(u,d),bo){p=0;do{if(bo=!1,Po=0,25<=p)throw Error(t(301));p+=1,rn=Zt=null,i.updateQueue=null,ka.current=qv,n=o(u,d)}while(bo)}if(ka.current=Va,i=Zt!==null&&Zt.next!==null,kr=0,rn=Zt=Ht=null,za=!1,i)throw Error(t(300));return n}function qu(){var n=Po!==0;return Po=0,n}function Mi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?Ht.memoizedState=rn=n:rn=rn.next=n,rn}function Kn(){if(Zt===null){var n=Ht.alternate;n=n!==null?n.memoizedState:null}else n=Zt.next;var i=rn===null?Ht.memoizedState:rn.next;if(i!==null)rn=i,Zt=n;else{if(n===null)throw Error(t(310));Zt=n,n={memoizedState:Zt.memoizedState,baseState:Zt.baseState,baseQueue:Zt.baseQueue,queue:Zt.queue,next:null},rn===null?Ht.memoizedState=rn=n:rn=rn.next=n}return rn}function Lo(n,i){return typeof i=="function"?i(n):i}function $u(n){var i=Kn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=Zt,d=u.baseQueue,p=o.pending;if(p!==null){if(d!==null){var M=d.next;d.next=p.next,p.next=M}u.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,u=u.baseState;var L=M=null,F=null,J=p;do{var ve=J.lane;if((kr&ve)===ve)F!==null&&(F=F.next={lane:0,action:J.action,hasEagerState:J.hasEagerState,eagerState:J.eagerState,next:null}),u=J.hasEagerState?J.eagerState:n(u,J.action);else{var xe={lane:ve,action:J.action,hasEagerState:J.hasEagerState,eagerState:J.eagerState,next:null};F===null?(L=F=xe,M=u):F=F.next=xe,Ht.lanes|=ve,zr|=ve}J=J.next}while(J!==null&&J!==p);F===null?M=u:F.next=L,si(u,i.memoizedState)||(In=!0),i.memoizedState=u,i.baseState=M,i.baseQueue=F,o.lastRenderedState=u}if(n=o.interleaved,n!==null){d=n;do p=d.lane,Ht.lanes|=p,zr|=p,d=d.next;while(d!==n)}else d===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Ku(n){var i=Kn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=o.dispatch,d=o.pending,p=i.memoizedState;if(d!==null){o.pending=null;var M=d=d.next;do p=n(p,M.action),M=M.next;while(M!==d);si(p,i.memoizedState)||(In=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,u]}function Ah(){}function Rh(n,i){var o=Ht,u=Kn(),d=i(),p=!si(u.memoizedState,d);if(p&&(u.memoizedState=d,In=!0),u=u.queue,Zu(Ph.bind(null,o,u,n),[n]),u.getSnapshot!==i||p||rn!==null&&rn.memoizedState.tag&1){if(o.flags|=2048,Do(9,bh.bind(null,o,u,d,i),void 0,null),sn===null)throw Error(t(349));(kr&30)!==0||Ch(o,i,d)}return d}function Ch(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=Ht.updateQueue,i===null?(i={lastEffect:null,stores:null},Ht.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function bh(n,i,o,u){i.value=o,i.getSnapshot=u,Lh(i)&&Dh(n)}function Ph(n,i,o){return o(function(){Lh(i)&&Dh(n)})}function Lh(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!si(n,o)}catch{return!0}}function Dh(n){var i=Ui(n,1);i!==null&&ci(i,n,1,-1)}function Ih(n){var i=Mi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Lo,lastRenderedState:n},i.queue=n,n=n.dispatch=Xv.bind(null,Ht,n),[i.memoizedState,n]}function Do(n,i,o,u){return n={tag:n,create:i,destroy:o,deps:u,next:null},i=Ht.updateQueue,i===null?(i={lastEffect:null,stores:null},Ht.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(u=o.next,o.next=n,n.next=u,i.lastEffect=n)),n}function Uh(){return Kn().memoizedState}function Ba(n,i,o,u){var d=Mi();Ht.flags|=n,d.memoizedState=Do(1|i,o,void 0,u===void 0?null:u)}function Ha(n,i,o,u){var d=Kn();u=u===void 0?null:u;var p=void 0;if(Zt!==null){var M=Zt.memoizedState;if(p=M.destroy,u!==null&&ju(u,M.deps)){d.memoizedState=Do(i,o,p,u);return}}Ht.flags|=n,d.memoizedState=Do(1|i,o,p,u)}function Nh(n,i){return Ba(8390656,8,n,i)}function Zu(n,i){return Ha(2048,8,n,i)}function Fh(n,i){return Ha(4,2,n,i)}function Oh(n,i){return Ha(4,4,n,i)}function kh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function zh(n,i,o){return o=o!=null?o.concat([n]):null,Ha(4,4,kh.bind(null,i,n),o)}function Qu(){}function Bh(n,i){var o=Kn();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&ju(i,u[1])?u[0]:(o.memoizedState=[n,i],n)}function Hh(n,i){var o=Kn();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&ju(i,u[1])?u[0]:(n=n(),o.memoizedState=[n,i],n)}function Vh(n,i,o){return(kr&21)===0?(n.baseState&&(n.baseState=!1,In=!0),n.memoizedState=o):(si(o,i)||(o=Mn(),Ht.lanes|=o,zr|=o,n.baseState=!0),i)}function Gv(n,i){var o=Ct;Ct=o!==0&&4>o?o:4,n(!0);var u=Xu.transition;Xu.transition={};try{n(!1),i()}finally{Ct=o,Xu.transition=u}}function Gh(){return Kn().memoizedState}function Wv(n,i,o){var u=pr(n);if(o={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null},Wh(n))Xh(i,o);else if(o=Sh(n,i,o,u),o!==null){var d=Tn();ci(o,n,u,d),jh(o,i,u)}}function Xv(n,i,o){var u=pr(n),d={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null};if(Wh(n))Xh(i,d);else{var p=n.alternate;if(n.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var M=i.lastRenderedState,L=p(M,o);if(d.hasEagerState=!0,d.eagerState=L,si(L,M)){var F=i.interleaved;F===null?(d.next=d,zu(i)):(d.next=F.next,F.next=d),i.interleaved=d;return}}catch{}finally{}o=Sh(n,i,d,u),o!==null&&(d=Tn(),ci(o,n,u,d),jh(o,i,u))}}function Wh(n){var i=n.alternate;return n===Ht||i!==null&&i===Ht}function Xh(n,i){bo=za=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function jh(n,i,o){if((o&4194240)!==0){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,eu(n,o)}}var Va={readContext:$n,useCallback:pn,useContext:pn,useEffect:pn,useImperativeHandle:pn,useInsertionEffect:pn,useLayoutEffect:pn,useMemo:pn,useReducer:pn,useRef:pn,useState:pn,useDebugValue:pn,useDeferredValue:pn,useTransition:pn,useMutableSource:pn,useSyncExternalStore:pn,useId:pn,unstable_isNewReconciler:!1},jv={readContext:$n,useCallback:function(n,i){return Mi().memoizedState=[n,i===void 0?null:i],n},useContext:$n,useEffect:Nh,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,Ba(4194308,4,kh.bind(null,i,n),o)},useLayoutEffect:function(n,i){return Ba(4194308,4,n,i)},useInsertionEffect:function(n,i){return Ba(4,2,n,i)},useMemo:function(n,i){var o=Mi();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var u=Mi();return i=o!==void 0?o(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=Wv.bind(null,Ht,n),[u.memoizedState,n]},useRef:function(n){var i=Mi();return n={current:n},i.memoizedState=n},useState:Ih,useDebugValue:Qu,useDeferredValue:function(n){return Mi().memoizedState=n},useTransition:function(){var n=Ih(!1),i=n[0];return n=Gv.bind(null,n[1]),Mi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var u=Ht,d=Mi();if(zt){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),sn===null)throw Error(t(349));(kr&30)!==0||Ch(u,i,o)}d.memoizedState=o;var p={value:o,getSnapshot:i};return d.queue=p,Nh(Ph.bind(null,u,p,n),[n]),u.flags|=2048,Do(9,bh.bind(null,u,p,o,i),void 0,null),o},useId:function(){var n=Mi(),i=sn.identifierPrefix;if(zt){var o=Ii,u=Di;o=(u&~(1<<32-ot(u)-1)).toString(32)+o,i=":"+i+"R"+o,o=Po++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=Vv++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},Yv={readContext:$n,useCallback:Bh,useContext:$n,useEffect:Zu,useImperativeHandle:zh,useInsertionEffect:Fh,useLayoutEffect:Oh,useMemo:Hh,useReducer:$u,useRef:Uh,useState:function(){return $u(Lo)},useDebugValue:Qu,useDeferredValue:function(n){var i=Kn();return Vh(i,Zt.memoizedState,n)},useTransition:function(){var n=$u(Lo)[0],i=Kn().memoizedState;return[n,i]},useMutableSource:Ah,useSyncExternalStore:Rh,useId:Gh,unstable_isNewReconciler:!1},qv={readContext:$n,useCallback:Bh,useContext:$n,useEffect:Zu,useImperativeHandle:zh,useInsertionEffect:Fh,useLayoutEffect:Oh,useMemo:Hh,useReducer:Ku,useRef:Uh,useState:function(){return Ku(Lo)},useDebugValue:Qu,useDeferredValue:function(n){var i=Kn();return Zt===null?i.memoizedState=n:Vh(i,Zt.memoizedState,n)},useTransition:function(){var n=Ku(Lo)[0],i=Kn().memoizedState;return[n,i]},useMutableSource:Ah,useSyncExternalStore:Rh,useId:Gh,unstable_isNewReconciler:!1};function ai(n,i){if(n&&n.defaultProps){i=se({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function Ju(n,i,o,u){i=n.memoizedState,o=o(u,i),o=o==null?i:se({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var Ga={isMounted:function(n){return(n=n._reactInternals)?_i(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var u=Tn(),d=pr(n),p=Ni(u,d);p.payload=i,o!=null&&(p.callback=o),i=cr(n,p,d),i!==null&&(ci(i,n,d,u),Na(i,n,d))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var u=Tn(),d=pr(n),p=Ni(u,d);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=cr(n,p,d),i!==null&&(ci(i,n,d,u),Na(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=Tn(),u=pr(n),d=Ni(o,u);d.tag=2,i!=null&&(d.callback=i),i=cr(n,d,u),i!==null&&(ci(i,n,u,o),Na(i,n,u))}};function Yh(n,i,o,u,d,p,M){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,p,M):i.prototype&&i.prototype.isPureReactComponent?!_o(o,u)||!_o(d,p):!0}function qh(n,i,o){var u=!1,d=ar,p=i.contextType;return typeof p=="object"&&p!==null?p=$n(p):(d=Dn(i)?Ir:hn.current,u=i.contextTypes,p=(u=u!=null)?gs(n,d):ar),i=new i(o,p),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ga,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=p),i}function $h(n,i,o,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,u),i.state!==n&&Ga.enqueueReplaceState(i,i.state,null)}function ec(n,i,o,u){var d=n.stateNode;d.props=o,d.state=n.memoizedState,d.refs={},Bu(n);var p=i.contextType;typeof p=="object"&&p!==null?d.context=$n(p):(p=Dn(i)?Ir:hn.current,d.context=gs(n,p)),d.state=n.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(Ju(n,i,p,o),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&Ga.enqueueReplaceState(d,d.state,null),Fa(n,o,d,u),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function Ts(n,i){try{var o="",u=i;do o+=fe(u),u=u.return;while(u);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:n,source:i,stack:d,digest:null}}function tc(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function nc(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var $v=typeof WeakMap=="function"?WeakMap:Map;function Kh(n,i,o){o=Ni(-1,o),o.tag=3,o.payload={element:null};var u=i.value;return o.callback=function(){Ka||(Ka=!0,vc=u),nc(n,i)},o}function Zh(n,i,o){o=Ni(-1,o),o.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var d=i.value;o.payload=function(){return u(d)},o.callback=function(){nc(n,i)}}var p=n.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){nc(n,i),typeof u!="function"&&(dr===null?dr=new Set([this]):dr.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),o}function Qh(n,i,o){var u=n.pingCache;if(u===null){u=n.pingCache=new $v;var d=new Set;u.set(i,d)}else d=u.get(i),d===void 0&&(d=new Set,u.set(i,d));d.has(o)||(d.add(o),n=u0.bind(null,n,i,o),i.then(n,n))}function Jh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function ep(n,i,o,u,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Ni(-1,1),i.tag=2,cr(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var Kv=C.ReactCurrentOwner,In=!1;function En(n,i,o,u){i.child=n===null?yh(i,null,o,u):ys(i,n.child,o,u)}function tp(n,i,o,u,d){o=o.render;var p=i.ref;return Ms(i,d),u=Yu(n,i,o,u,p,d),o=qu(),n!==null&&!In?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Fi(n,i,d)):(zt&&o&&Pu(i),i.flags|=1,En(n,i,u,d),i.child)}function np(n,i,o,u,d){if(n===null){var p=o.type;return typeof p=="function"&&!Tc(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,ip(n,i,p,u,d)):(n=nl(o.type,null,u,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(p=n.child,(n.lanes&d)===0){var M=p.memoizedProps;if(o=o.compare,o=o!==null?o:_o,o(M,u)&&n.ref===i.ref)return Fi(n,i,d)}return i.flags|=1,n=gr(p,u),n.ref=i.ref,n.return=i,i.child=n}function ip(n,i,o,u,d){if(n!==null){var p=n.memoizedProps;if(_o(p,u)&&n.ref===i.ref)if(In=!1,i.pendingProps=u=p,(n.lanes&d)!==0)(n.flags&131072)!==0&&(In=!0);else return i.lanes=n.lanes,Fi(n,i,d)}return ic(n,i,o,u,d)}function rp(n,i,o){var u=i.pendingProps,d=u.children,p=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ut(As,Hn),Hn|=o;else{if((o&1073741824)===0)return n=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Ut(As,Hn),Hn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=p!==null?p.baseLanes:o,Ut(As,Hn),Hn|=u}else p!==null?(u=p.baseLanes|o,i.memoizedState=null):u=o,Ut(As,Hn),Hn|=u;return En(n,i,d,o),i.child}function sp(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function ic(n,i,o,u,d){var p=Dn(o)?Ir:hn.current;return p=gs(i,p),Ms(i,d),o=Yu(n,i,o,u,p,d),u=qu(),n!==null&&!In?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Fi(n,i,d)):(zt&&u&&Pu(i),i.flags|=1,En(n,i,o,d),i.child)}function op(n,i,o,u,d){if(Dn(o)){var p=!0;Ra(i)}else p=!1;if(Ms(i,d),i.stateNode===null)Xa(n,i),qh(i,o,u),ec(i,o,u,d),u=!0;else if(n===null){var M=i.stateNode,L=i.memoizedProps;M.props=L;var F=M.context,J=o.contextType;typeof J=="object"&&J!==null?J=$n(J):(J=Dn(o)?Ir:hn.current,J=gs(i,J));var ve=o.getDerivedStateFromProps,xe=typeof ve=="function"||typeof M.getSnapshotBeforeUpdate=="function";xe||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(L!==u||F!==J)&&$h(i,M,u,J),ur=!1;var me=i.memoizedState;M.state=me,Fa(i,u,M,d),F=i.memoizedState,L!==u||me!==F||Ln.current||ur?(typeof ve=="function"&&(Ju(i,o,ve,u),F=i.memoizedState),(L=ur||Yh(i,o,L,u,me,F,J))?(xe||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=F),M.props=u,M.state=F,M.context=J,u=L):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{M=i.stateNode,Mh(n,i),L=i.memoizedProps,J=i.type===i.elementType?L:ai(i.type,L),M.props=J,xe=i.pendingProps,me=M.context,F=o.contextType,typeof F=="object"&&F!==null?F=$n(F):(F=Dn(o)?Ir:hn.current,F=gs(i,F));var Le=o.getDerivedStateFromProps;(ve=typeof Le=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(L!==xe||me!==F)&&$h(i,M,u,F),ur=!1,me=i.memoizedState,M.state=me,Fa(i,u,M,d);var ke=i.memoizedState;L!==xe||me!==ke||Ln.current||ur?(typeof Le=="function"&&(Ju(i,o,Le,u),ke=i.memoizedState),(J=ur||Yh(i,o,J,u,me,ke,F)||!1)?(ve||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(u,ke,F),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(u,ke,F)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||L===n.memoizedProps&&me===n.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||L===n.memoizedProps&&me===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=ke),M.props=u,M.state=ke,M.context=F,u=J):(typeof M.componentDidUpdate!="function"||L===n.memoizedProps&&me===n.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||L===n.memoizedProps&&me===n.memoizedState||(i.flags|=1024),u=!1)}return rc(n,i,o,u,p,d)}function rc(n,i,o,u,d,p){sp(n,i);var M=(i.flags&128)!==0;if(!u&&!M)return d&&fh(i,o,!1),Fi(n,i,p);u=i.stateNode,Kv.current=i;var L=M&&typeof o.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&M?(i.child=ys(i,n.child,null,p),i.child=ys(i,null,L,p)):En(n,i,L,p),i.memoizedState=u.state,d&&fh(i,o,!0),i.child}function ap(n){var i=n.stateNode;i.pendingContext?uh(n,i.pendingContext,i.pendingContext!==i.context):i.context&&uh(n,i.context,!1),Hu(n,i.containerInfo)}function lp(n,i,o,u,d){return xs(),Uu(d),i.flags|=256,En(n,i,o,u),i.child}var sc={dehydrated:null,treeContext:null,retryLane:0};function oc(n){return{baseLanes:n,cachePool:null,transitions:null}}function up(n,i,o){var u=i.pendingProps,d=Bt.current,p=!1,M=(i.flags&128)!==0,L;if((L=M)||(L=n!==null&&n.memoizedState===null?!1:(d&2)!==0),L?(p=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),Ut(Bt,d&1),n===null)return Iu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=u.children,n=u.fallback,p?(u=i.mode,p=i.child,M={mode:"hidden",children:M},(u&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=M):p=il(M,u,0,null),n=Gr(n,u,o,null),p.return=i,n.return=i,p.sibling=n,i.child=p,i.child.memoizedState=oc(o),i.memoizedState=sc,n):ac(i,M));if(d=n.memoizedState,d!==null&&(L=d.dehydrated,L!==null))return Zv(n,i,M,u,L,d,o);if(p){p=u.fallback,M=i.mode,d=n.child,L=d.sibling;var F={mode:"hidden",children:u.children};return(M&1)===0&&i.child!==d?(u=i.child,u.childLanes=0,u.pendingProps=F,i.deletions=null):(u=gr(d,F),u.subtreeFlags=d.subtreeFlags&14680064),L!==null?p=gr(L,p):(p=Gr(p,M,o,null),p.flags|=2),p.return=i,u.return=i,u.sibling=p,i.child=u,u=p,p=i.child,M=n.child.memoizedState,M=M===null?oc(o):{baseLanes:M.baseLanes|o,cachePool:null,transitions:M.transitions},p.memoizedState=M,p.childLanes=n.childLanes&~o,i.memoizedState=sc,u}return p=n.child,n=p.sibling,u=gr(p,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=o),u.return=i,u.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=u,i.memoizedState=null,u}function ac(n,i){return i=il({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Wa(n,i,o,u){return u!==null&&Uu(u),ys(i,n.child,null,o),n=ac(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Zv(n,i,o,u,d,p,M){if(o)return i.flags&256?(i.flags&=-257,u=tc(Error(t(422))),Wa(n,i,M,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(p=u.fallback,d=i.mode,u=il({mode:"visible",children:u.children},d,0,null),p=Gr(p,d,M,null),p.flags|=2,u.return=i,p.return=i,u.sibling=p,i.child=u,(i.mode&1)!==0&&ys(i,n.child,null,M),i.child.memoizedState=oc(M),i.memoizedState=sc,p);if((i.mode&1)===0)return Wa(n,i,M,null);if(d.data==="$!"){if(u=d.nextSibling&&d.nextSibling.dataset,u)var L=u.dgst;return u=L,p=Error(t(419)),u=tc(p,u,void 0),Wa(n,i,M,u)}if(L=(M&n.childLanes)!==0,In||L){if(u=sn,u!==null){switch(M&-M){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(u.suspendedLanes|M))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,Ui(n,d),ci(u,n,d,-1))}return Ec(),u=tc(Error(t(421))),Wa(n,i,M,u)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=c0.bind(null,n),d._reactRetry=i,null):(n=p.treeContext,Bn=sr(d.nextSibling),zn=i,zt=!0,oi=null,n!==null&&(Yn[qn++]=Di,Yn[qn++]=Ii,Yn[qn++]=Ur,Di=n.id,Ii=n.overflow,Ur=i),i=ac(i,u.children),i.flags|=4096,i)}function cp(n,i,o){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),ku(n.return,i,o)}function lc(n,i,o,u,d){var p=n.memoizedState;p===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:d}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=u,p.tail=o,p.tailMode=d)}function fp(n,i,o){var u=i.pendingProps,d=u.revealOrder,p=u.tail;if(En(n,i,u.children,o),u=Bt.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&cp(n,o,i);else if(n.tag===19)cp(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Ut(Bt,u),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(o=i.child,d=null;o!==null;)n=o.alternate,n!==null&&Oa(n)===null&&(d=o),o=o.sibling;o=d,o===null?(d=i.child,i.child=null):(d=o.sibling,o.sibling=null),lc(i,!1,d,o,p);break;case"backwards":for(o=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&Oa(n)===null){i.child=d;break}n=d.sibling,d.sibling=o,o=d,d=n}lc(i,!0,o,null,p);break;case"together":lc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Xa(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Fi(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),zr|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=gr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=gr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function Qv(n,i,o){switch(i.tag){case 3:ap(i),xs();break;case 5:wh(i);break;case 1:Dn(i.type)&&Ra(i);break;case 4:Hu(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,d=i.memoizedProps.value;Ut(Ia,u._currentValue),u._currentValue=d;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(Ut(Bt,Bt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?up(n,i,o):(Ut(Bt,Bt.current&1),n=Fi(n,i,o),n!==null?n.sibling:null);Ut(Bt,Bt.current&1);break;case 19:if(u=(o&i.childLanes)!==0,(n.flags&128)!==0){if(u)return fp(n,i,o);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Ut(Bt,Bt.current),u)break;return null;case 22:case 23:return i.lanes=0,rp(n,i,o)}return Fi(n,i,o)}var dp,uc,hp,pp;dp=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},uc=function(){},hp=function(n,i,o,u){var d=n.memoizedProps;if(d!==u){n=i.stateNode,Or(Si.current);var p=null;switch(o){case"input":d=X(n,d),u=X(n,u),p=[];break;case"select":d=se({},d,{value:void 0}),u=se({},u,{value:void 0}),p=[];break;case"textarea":d=T(n,d),u=T(n,u),p=[];break;default:typeof d.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=Ta)}ft(o,u);var M;o=null;for(J in d)if(!u.hasOwnProperty(J)&&d.hasOwnProperty(J)&&d[J]!=null)if(J==="style"){var L=d[J];for(M in L)L.hasOwnProperty(M)&&(o||(o={}),o[M]="")}else J!=="dangerouslySetInnerHTML"&&J!=="children"&&J!=="suppressContentEditableWarning"&&J!=="suppressHydrationWarning"&&J!=="autoFocus"&&(a.hasOwnProperty(J)?p||(p=[]):(p=p||[]).push(J,null));for(J in u){var F=u[J];if(L=d!=null?d[J]:void 0,u.hasOwnProperty(J)&&F!==L&&(F!=null||L!=null))if(J==="style")if(L){for(M in L)!L.hasOwnProperty(M)||F&&F.hasOwnProperty(M)||(o||(o={}),o[M]="");for(M in F)F.hasOwnProperty(M)&&L[M]!==F[M]&&(o||(o={}),o[M]=F[M])}else o||(p||(p=[]),p.push(J,o)),o=F;else J==="dangerouslySetInnerHTML"?(F=F?F.__html:void 0,L=L?L.__html:void 0,F!=null&&L!==F&&(p=p||[]).push(J,F)):J==="children"?typeof F!="string"&&typeof F!="number"||(p=p||[]).push(J,""+F):J!=="suppressContentEditableWarning"&&J!=="suppressHydrationWarning"&&(a.hasOwnProperty(J)?(F!=null&&J==="onScroll"&&Ft("scroll",n),p||L===F||(p=[])):(p=p||[]).push(J,F))}o&&(p=p||[]).push("style",o);var J=p;(i.updateQueue=J)&&(i.flags|=4)}},pp=function(n,i,o,u){o!==u&&(i.flags|=4)};function Io(n,i){if(!zt)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function mn(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,u=0;if(i)for(var d=n.child;d!==null;)o|=d.lanes|d.childLanes,u|=d.subtreeFlags&14680064,u|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)o|=d.lanes|d.childLanes,u|=d.subtreeFlags,u|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=u,n.childLanes=o,i}function Jv(n,i,o){var u=i.pendingProps;switch(Lu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return mn(i),null;case 1:return Dn(i.type)&&Aa(),mn(i),null;case 3:return u=i.stateNode,Es(),Ot(Ln),Ot(hn),Wu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(La(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,oi!==null&&(yc(oi),oi=null))),uc(n,i),mn(i),null;case 5:Vu(i);var d=Or(Co.current);if(o=i.type,n!==null&&i.stateNode!=null)hp(n,i,o,u,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return mn(i),null}if(n=Or(Si.current),La(i)){u=i.stateNode,o=i.type;var p=i.memoizedProps;switch(u[yi]=i,u[Eo]=p,n=(i.mode&1)!==0,o){case"dialog":Ft("cancel",u),Ft("close",u);break;case"iframe":case"object":case"embed":Ft("load",u);break;case"video":case"audio":for(d=0;d<yo.length;d++)Ft(yo[d],u);break;case"source":Ft("error",u);break;case"img":case"image":case"link":Ft("error",u),Ft("load",u);break;case"details":Ft("toggle",u);break;case"input":yn(u,p),Ft("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!p.multiple},Ft("invalid",u);break;case"textarea":Z(u,p),Ft("invalid",u)}ft(o,p),d=null;for(var M in p)if(p.hasOwnProperty(M)){var L=p[M];M==="children"?typeof L=="string"?u.textContent!==L&&(p.suppressHydrationWarning!==!0&&Ea(u.textContent,L,n),d=["children",L]):typeof L=="number"&&u.textContent!==""+L&&(p.suppressHydrationWarning!==!0&&Ea(u.textContent,L,n),d=["children",""+L]):a.hasOwnProperty(M)&&L!=null&&M==="onScroll"&&Ft("scroll",u)}switch(o){case"input":Pt(u),qe(u,p,!0);break;case"textarea":Pt(u),ge(u);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(u.onclick=Ta)}u=d,i.updateQueue=u,u!==null&&(i.flags|=4)}else{M=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=de(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=M.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=M.createElement(o,{is:u.is}):(n=M.createElement(o),o==="select"&&(M=n,u.multiple?M.multiple=!0:u.size&&(M.size=u.size))):n=M.createElementNS(n,o),n[yi]=i,n[Eo]=u,dp(n,i,!1,!1),i.stateNode=n;e:{switch(M=rt(o,u),o){case"dialog":Ft("cancel",n),Ft("close",n),d=u;break;case"iframe":case"object":case"embed":Ft("load",n),d=u;break;case"video":case"audio":for(d=0;d<yo.length;d++)Ft(yo[d],n);d=u;break;case"source":Ft("error",n),d=u;break;case"img":case"image":case"link":Ft("error",n),Ft("load",n),d=u;break;case"details":Ft("toggle",n),d=u;break;case"input":yn(n,u),d=X(n,u),Ft("invalid",n);break;case"option":d=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},d=se({},u,{value:void 0}),Ft("invalid",n);break;case"textarea":Z(n,u),d=T(n,u),Ft("invalid",n);break;default:d=u}ft(o,d),L=d;for(p in L)if(L.hasOwnProperty(p)){var F=L[p];p==="style"?Je(n,F):p==="dangerouslySetInnerHTML"?(F=F?F.__html:void 0,F!=null&&Ue(n,F)):p==="children"?typeof F=="string"?(o!=="textarea"||F!=="")&&ut(n,F):typeof F=="number"&&ut(n,""+F):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?F!=null&&p==="onScroll"&&Ft("scroll",n):F!=null&&D(n,p,F,M))}switch(o){case"input":Pt(n),qe(n,u,!1);break;case"textarea":Pt(n),ge(n);break;case"option":u.value!=null&&n.setAttribute("value",""+we(u.value));break;case"select":n.multiple=!!u.multiple,p=u.value,p!=null?P(n,!!u.multiple,p,!1):u.defaultValue!=null&&P(n,!!u.multiple,u.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Ta)}switch(o){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return mn(i),null;case 6:if(n&&i.stateNode!=null)pp(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(o=Or(Co.current),Or(Si.current),La(i)){if(u=i.stateNode,o=i.memoizedProps,u[yi]=i,(p=u.nodeValue!==o)&&(n=zn,n!==null))switch(n.tag){case 3:Ea(u.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ea(u.nodeValue,o,(n.mode&1)!==0)}p&&(i.flags|=4)}else u=(o.nodeType===9?o:o.ownerDocument).createTextNode(u),u[yi]=i,i.stateNode=u}return mn(i),null;case 13:if(Ot(Bt),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(zt&&Bn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)vh(),xs(),i.flags|=98560,p=!1;else if(p=La(i),u!==null&&u.dehydrated!==null){if(n===null){if(!p)throw Error(t(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(t(317));p[yi]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;mn(i),p=!1}else oi!==null&&(yc(oi),oi=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Bt.current&1)!==0?Qt===0&&(Qt=3):Ec())),i.updateQueue!==null&&(i.flags|=4),mn(i),null);case 4:return Es(),uc(n,i),n===null&&So(i.stateNode.containerInfo),mn(i),null;case 10:return Ou(i.type._context),mn(i),null;case 17:return Dn(i.type)&&Aa(),mn(i),null;case 19:if(Ot(Bt),p=i.memoizedState,p===null)return mn(i),null;if(u=(i.flags&128)!==0,M=p.rendering,M===null)if(u)Io(p,!1);else{if(Qt!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(M=Oa(n),M!==null){for(i.flags|=128,Io(p,!1),u=M.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=o,o=i.child;o!==null;)p=o,n=u,p.flags&=14680066,M=p.alternate,M===null?(p.childLanes=0,p.lanes=n,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=M.childLanes,p.lanes=M.lanes,p.child=M.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=M.memoizedProps,p.memoizedState=M.memoizedState,p.updateQueue=M.updateQueue,p.type=M.type,n=M.dependencies,p.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return Ut(Bt,Bt.current&1|2),i.child}n=n.sibling}p.tail!==null&&Se()>Rs&&(i.flags|=128,u=!0,Io(p,!1),i.lanes=4194304)}else{if(!u)if(n=Oa(M),n!==null){if(i.flags|=128,u=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Io(p,!0),p.tail===null&&p.tailMode==="hidden"&&!M.alternate&&!zt)return mn(i),null}else 2*Se()-p.renderingStartTime>Rs&&o!==1073741824&&(i.flags|=128,u=!0,Io(p,!1),i.lanes=4194304);p.isBackwards?(M.sibling=i.child,i.child=M):(o=p.last,o!==null?o.sibling=M:i.child=M,p.last=M)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=Se(),i.sibling=null,o=Bt.current,Ut(Bt,u?o&1|2:o&1),i):(mn(i),null);case 22:case 23:return Mc(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(Hn&1073741824)!==0&&(mn(i),i.subtreeFlags&6&&(i.flags|=8192)):mn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function e0(n,i){switch(Lu(i),i.tag){case 1:return Dn(i.type)&&Aa(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Es(),Ot(Ln),Ot(hn),Wu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Vu(i),null;case 13:if(Ot(Bt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));xs()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Ot(Bt),null;case 4:return Es(),null;case 10:return Ou(i.type._context),null;case 22:case 23:return Mc(),null;case 24:return null;default:return null}}var ja=!1,gn=!1,t0=typeof WeakSet=="function"?WeakSet:Set,Ne=null;function ws(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(u){Gt(n,i,u)}else o.current=null}function cc(n,i,o){try{o()}catch(u){Gt(n,i,u)}}var mp=!1;function n0(n,i){if(Mu=da,n=Yd(),pu(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var d=u.anchorOffset,p=u.focusNode;u=u.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var M=0,L=-1,F=-1,J=0,ve=0,xe=n,me=null;t:for(;;){for(var Le;xe!==o||d!==0&&xe.nodeType!==3||(L=M+d),xe!==p||u!==0&&xe.nodeType!==3||(F=M+u),xe.nodeType===3&&(M+=xe.nodeValue.length),(Le=xe.firstChild)!==null;)me=xe,xe=Le;for(;;){if(xe===n)break t;if(me===o&&++J===d&&(L=M),me===p&&++ve===u&&(F=M),(Le=xe.nextSibling)!==null)break;xe=me,me=xe.parentNode}xe=Le}o=L===-1||F===-1?null:{start:L,end:F}}else o=null}o=o||{start:0,end:0}}else o=null;for(Eu={focusedElem:n,selectionRange:o},da=!1,Ne=i;Ne!==null;)if(i=Ne,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Ne=n;else for(;Ne!==null;){i=Ne;try{var ke=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(ke!==null){var Be=ke.memoizedProps,Xt=ke.memoizedState,j=i.stateNode,B=j.getSnapshotBeforeUpdate(i.elementType===i.type?Be:ai(i.type,Be),Xt);j.__reactInternalSnapshotBeforeUpdate=B}break;case 3:var $=i.stateNode.containerInfo;$.nodeType===1?$.textContent="":$.nodeType===9&&$.documentElement&&$.removeChild($.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ee){Gt(i,i.return,Ee)}if(n=i.sibling,n!==null){n.return=i.return,Ne=n;break}Ne=i.return}return ke=mp,mp=!1,ke}function Uo(n,i,o){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var d=u=u.next;do{if((d.tag&n)===n){var p=d.destroy;d.destroy=void 0,p!==void 0&&cc(i,o,p)}d=d.next}while(d!==u)}}function Ya(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var u=o.create;o.destroy=u()}o=o.next}while(o!==i)}}function fc(n){var i=n.ref;if(i!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof i=="function"?i(n):i.current=n}}function gp(n){var i=n.alternate;i!==null&&(n.alternate=null,gp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[yi],delete i[Eo],delete i[Ru],delete i[kv],delete i[zv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function vp(n){return n.tag===5||n.tag===3||n.tag===4}function _p(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||vp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function dc(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=Ta));else if(u!==4&&(n=n.child,n!==null))for(dc(n,i,o),n=n.sibling;n!==null;)dc(n,i,o),n=n.sibling}function hc(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(hc(n,i,o),n=n.sibling;n!==null;)hc(n,i,o),n=n.sibling}var ln=null,li=!1;function fr(n,i,o){for(o=o.child;o!==null;)xp(n,i,o),o=o.sibling}function xp(n,i,o){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(Tt,o)}catch{}switch(o.tag){case 5:gn||ws(o,i);case 6:var u=ln,d=li;ln=null,fr(n,i,o),ln=u,li=d,ln!==null&&(li?(n=ln,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):ln.removeChild(o.stateNode));break;case 18:ln!==null&&(li?(n=ln,o=o.stateNode,n.nodeType===8?Au(n.parentNode,o):n.nodeType===1&&Au(n,o),fo(n)):Au(ln,o.stateNode));break;case 4:u=ln,d=li,ln=o.stateNode.containerInfo,li=!0,fr(n,i,o),ln=u,li=d;break;case 0:case 11:case 14:case 15:if(!gn&&(u=o.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){d=u=u.next;do{var p=d,M=p.destroy;p=p.tag,M!==void 0&&((p&2)!==0||(p&4)!==0)&&cc(o,i,M),d=d.next}while(d!==u)}fr(n,i,o);break;case 1:if(!gn&&(ws(o,i),u=o.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=o.memoizedProps,u.state=o.memoizedState,u.componentWillUnmount()}catch(L){Gt(o,i,L)}fr(n,i,o);break;case 21:fr(n,i,o);break;case 22:o.mode&1?(gn=(u=gn)||o.memoizedState!==null,fr(n,i,o),gn=u):fr(n,i,o);break;default:fr(n,i,o)}}function yp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new t0),i.forEach(function(u){var d=f0.bind(null,n,u);o.has(u)||(o.add(u),u.then(d,d))})}}function ui(n,i){var o=i.deletions;if(o!==null)for(var u=0;u<o.length;u++){var d=o[u];try{var p=n,M=i,L=M;e:for(;L!==null;){switch(L.tag){case 5:ln=L.stateNode,li=!1;break e;case 3:ln=L.stateNode.containerInfo,li=!0;break e;case 4:ln=L.stateNode.containerInfo,li=!0;break e}L=L.return}if(ln===null)throw Error(t(160));xp(p,M,d),ln=null,li=!1;var F=d.alternate;F!==null&&(F.return=null),d.return=null}catch(J){Gt(d,i,J)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Sp(i,n),i=i.sibling}function Sp(n,i){var o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ui(i,n),Ei(n),u&4){try{Uo(3,n,n.return),Ya(3,n)}catch(Be){Gt(n,n.return,Be)}try{Uo(5,n,n.return)}catch(Be){Gt(n,n.return,Be)}}break;case 1:ui(i,n),Ei(n),u&512&&o!==null&&ws(o,o.return);break;case 5:if(ui(i,n),Ei(n),u&512&&o!==null&&ws(o,o.return),n.flags&32){var d=n.stateNode;try{ut(d,"")}catch(Be){Gt(n,n.return,Be)}}if(u&4&&(d=n.stateNode,d!=null)){var p=n.memoizedProps,M=o!==null?o.memoizedProps:p,L=n.type,F=n.updateQueue;if(n.updateQueue=null,F!==null)try{L==="input"&&p.type==="radio"&&p.name!=null&&mt(d,p),rt(L,M);var J=rt(L,p);for(M=0;M<F.length;M+=2){var ve=F[M],xe=F[M+1];ve==="style"?Je(d,xe):ve==="dangerouslySetInnerHTML"?Ue(d,xe):ve==="children"?ut(d,xe):D(d,ve,xe,J)}switch(L){case"input":ct(d,p);break;case"textarea":pe(d,p);break;case"select":var me=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var Le=p.value;Le!=null?P(d,!!p.multiple,Le,!1):me!==!!p.multiple&&(p.defaultValue!=null?P(d,!!p.multiple,p.defaultValue,!0):P(d,!!p.multiple,p.multiple?[]:"",!1))}d[Eo]=p}catch(Be){Gt(n,n.return,Be)}}break;case 6:if(ui(i,n),Ei(n),u&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,p=n.memoizedProps;try{d.nodeValue=p}catch(Be){Gt(n,n.return,Be)}}break;case 3:if(ui(i,n),Ei(n),u&4&&o!==null&&o.memoizedState.isDehydrated)try{fo(i.containerInfo)}catch(Be){Gt(n,n.return,Be)}break;case 4:ui(i,n),Ei(n);break;case 13:ui(i,n),Ei(n),d=n.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(gc=Se())),u&4&&yp(n);break;case 22:if(ve=o!==null&&o.memoizedState!==null,n.mode&1?(gn=(J=gn)||ve,ui(i,n),gn=J):ui(i,n),Ei(n),u&8192){if(J=n.memoizedState!==null,(n.stateNode.isHidden=J)&&!ve&&(n.mode&1)!==0)for(Ne=n,ve=n.child;ve!==null;){for(xe=Ne=ve;Ne!==null;){switch(me=Ne,Le=me.child,me.tag){case 0:case 11:case 14:case 15:Uo(4,me,me.return);break;case 1:ws(me,me.return);var ke=me.stateNode;if(typeof ke.componentWillUnmount=="function"){u=me,o=me.return;try{i=u,ke.props=i.memoizedProps,ke.state=i.memoizedState,ke.componentWillUnmount()}catch(Be){Gt(u,o,Be)}}break;case 5:ws(me,me.return);break;case 22:if(me.memoizedState!==null){Tp(xe);continue}}Le!==null?(Le.return=me,Ne=Le):Tp(xe)}ve=ve.sibling}e:for(ve=null,xe=n;;){if(xe.tag===5){if(ve===null){ve=xe;try{d=xe.stateNode,J?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(L=xe.stateNode,F=xe.memoizedProps.style,M=F!=null&&F.hasOwnProperty("display")?F.display:null,L.style.display=Qe("display",M))}catch(Be){Gt(n,n.return,Be)}}}else if(xe.tag===6){if(ve===null)try{xe.stateNode.nodeValue=J?"":xe.memoizedProps}catch(Be){Gt(n,n.return,Be)}}else if((xe.tag!==22&&xe.tag!==23||xe.memoizedState===null||xe===n)&&xe.child!==null){xe.child.return=xe,xe=xe.child;continue}if(xe===n)break e;for(;xe.sibling===null;){if(xe.return===null||xe.return===n)break e;ve===xe&&(ve=null),xe=xe.return}ve===xe&&(ve=null),xe.sibling.return=xe.return,xe=xe.sibling}}break;case 19:ui(i,n),Ei(n),u&4&&yp(n);break;case 21:break;default:ui(i,n),Ei(n)}}function Ei(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(vp(o)){var u=o;break e}o=o.return}throw Error(t(160))}switch(u.tag){case 5:var d=u.stateNode;u.flags&32&&(ut(d,""),u.flags&=-33);var p=_p(n);hc(n,p,d);break;case 3:case 4:var M=u.stateNode.containerInfo,L=_p(n);dc(n,L,M);break;default:throw Error(t(161))}}catch(F){Gt(n,n.return,F)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function i0(n,i,o){Ne=n,Mp(n)}function Mp(n,i,o){for(var u=(n.mode&1)!==0;Ne!==null;){var d=Ne,p=d.child;if(d.tag===22&&u){var M=d.memoizedState!==null||ja;if(!M){var L=d.alternate,F=L!==null&&L.memoizedState!==null||gn;L=ja;var J=gn;if(ja=M,(gn=F)&&!J)for(Ne=d;Ne!==null;)M=Ne,F=M.child,M.tag===22&&M.memoizedState!==null?wp(d):F!==null?(F.return=M,Ne=F):wp(d);for(;p!==null;)Ne=p,Mp(p),p=p.sibling;Ne=d,ja=L,gn=J}Ep(n)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,Ne=p):Ep(n)}}function Ep(n){for(;Ne!==null;){var i=Ne;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:gn||Ya(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!gn)if(o===null)u.componentDidMount();else{var d=i.elementType===i.type?o.memoizedProps:ai(i.type,o.memoizedProps);u.componentDidUpdate(d,o.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&Th(i,p,u);break;case 3:var M=i.updateQueue;if(M!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}Th(i,M,o)}break;case 5:var L=i.stateNode;if(o===null&&i.flags&4){o=L;var F=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":F.autoFocus&&o.focus();break;case"img":F.src&&(o.src=F.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var J=i.alternate;if(J!==null){var ve=J.memoizedState;if(ve!==null){var xe=ve.dehydrated;xe!==null&&fo(xe)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}gn||i.flags&512&&fc(i)}catch(me){Gt(i,i.return,me)}}if(i===n){Ne=null;break}if(o=i.sibling,o!==null){o.return=i.return,Ne=o;break}Ne=i.return}}function Tp(n){for(;Ne!==null;){var i=Ne;if(i===n){Ne=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Ne=o;break}Ne=i.return}}function wp(n){for(;Ne!==null;){var i=Ne;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ya(4,i)}catch(F){Gt(i,o,F)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var d=i.return;try{u.componentDidMount()}catch(F){Gt(i,d,F)}}var p=i.return;try{fc(i)}catch(F){Gt(i,p,F)}break;case 5:var M=i.return;try{fc(i)}catch(F){Gt(i,M,F)}}}catch(F){Gt(i,i.return,F)}if(i===n){Ne=null;break}var L=i.sibling;if(L!==null){L.return=i.return,Ne=L;break}Ne=i.return}}var r0=Math.ceil,qa=C.ReactCurrentDispatcher,pc=C.ReactCurrentOwner,Zn=C.ReactCurrentBatchConfig,yt=0,sn=null,Yt=null,un=0,Hn=0,As=or(0),Qt=0,No=null,zr=0,$a=0,mc=0,Fo=null,Un=null,gc=0,Rs=1/0,Oi=null,Ka=!1,vc=null,dr=null,Za=!1,hr=null,Qa=0,Oo=0,_c=null,Ja=-1,el=0;function Tn(){return(yt&6)!==0?Se():Ja!==-1?Ja:Ja=Se()}function pr(n){return(n.mode&1)===0?1:(yt&2)!==0&&un!==0?un&-un:Hv.transition!==null?(el===0&&(el=Mn()),el):(n=Ct,n!==0||(n=window.event,n=n===void 0?16:Rd(n.type)),n)}function ci(n,i,o,u){if(50<Oo)throw Oo=0,_c=null,Error(t(185));Pn(n,o,u),((yt&2)===0||n!==sn)&&(n===sn&&((yt&2)===0&&($a|=o),Qt===4&&mr(n,un)),Nn(n,u),o===1&&yt===0&&(i.mode&1)===0&&(Rs=Se()+500,Ca&&lr()))}function Nn(n,i){var o=n.callbackNode;Xn(n,i);var u=xi(n,n===sn?un:0);if(u===0)o!==null&&te(o),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(o!=null&&te(o),i===1)n.tag===0?Bv(Rp.bind(null,n)):dh(Rp.bind(null,n)),Fv(function(){(yt&6)===0&&lr()}),o=null;else{switch(xd(u)){case 1:o=ze;break;case 4:o=tt;break;case 16:o=it;break;case 536870912:o=_t;break;default:o=it}o=Np(o,Ap.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function Ap(n,i){if(Ja=-1,el=0,(yt&6)!==0)throw Error(t(327));var o=n.callbackNode;if(Cs()&&n.callbackNode!==o)return null;var u=xi(n,n===sn?un:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||i)i=tl(n,u);else{i=u;var d=yt;yt|=2;var p=bp();(sn!==n||un!==i)&&(Oi=null,Rs=Se()+500,Hr(n,i));do try{a0();break}catch(L){Cp(n,L)}while(!0);Fu(),qa.current=p,yt=d,Yt!==null?i=0:(sn=null,un=0,i=Qt)}if(i!==0){if(i===2&&(d=bi(n),d!==0&&(u=d,i=xc(n,d))),i===1)throw o=No,Hr(n,0),mr(n,u),Nn(n,Se()),o;if(i===6)mr(n,u);else{if(d=n.current.alternate,(u&30)===0&&!s0(d)&&(i=tl(n,u),i===2&&(p=bi(n),p!==0&&(u=p,i=xc(n,p))),i===1))throw o=No,Hr(n,0),mr(n,u),Nn(n,Se()),o;switch(n.finishedWork=d,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:Vr(n,Un,Oi);break;case 3:if(mr(n,u),(u&130023424)===u&&(i=gc+500-Se(),10<i)){if(xi(n,0)!==0)break;if(d=n.suspendedLanes,(d&u)!==u){Tn(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=wu(Vr.bind(null,n,Un,Oi),i);break}Vr(n,Un,Oi);break;case 4:if(mr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,d=-1;0<u;){var M=31-ot(u);p=1<<M,M=i[M],M>d&&(d=M),u&=~p}if(u=d,u=Se()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*r0(u/1960))-u,10<u){n.timeoutHandle=wu(Vr.bind(null,n,Un,Oi),u);break}Vr(n,Un,Oi);break;case 5:Vr(n,Un,Oi);break;default:throw Error(t(329))}}}return Nn(n,Se()),n.callbackNode===o?Ap.bind(null,n):null}function xc(n,i){var o=Fo;return n.current.memoizedState.isDehydrated&&(Hr(n,i).flags|=256),n=tl(n,i),n!==2&&(i=Un,Un=o,i!==null&&yc(i)),n}function yc(n){Un===null?Un=n:Un.push.apply(Un,n)}function s0(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var u=0;u<o.length;u++){var d=o[u],p=d.getSnapshot;d=d.value;try{if(!si(p(),d))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function mr(n,i){for(i&=~mc,i&=~$a,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-ot(i),u=1<<o;n[o]=-1,i&=~u}}function Rp(n){if((yt&6)!==0)throw Error(t(327));Cs();var i=xi(n,0);if((i&1)===0)return Nn(n,Se()),null;var o=tl(n,i);if(n.tag!==0&&o===2){var u=bi(n);u!==0&&(i=u,o=xc(n,u))}if(o===1)throw o=No,Hr(n,0),mr(n,i),Nn(n,Se()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Vr(n,Un,Oi),Nn(n,Se()),null}function Sc(n,i){var o=yt;yt|=1;try{return n(i)}finally{yt=o,yt===0&&(Rs=Se()+500,Ca&&lr())}}function Br(n){hr!==null&&hr.tag===0&&(yt&6)===0&&Cs();var i=yt;yt|=1;var o=Zn.transition,u=Ct;try{if(Zn.transition=null,Ct=1,n)return n()}finally{Ct=u,Zn.transition=o,yt=i,(yt&6)===0&&lr()}}function Mc(){Hn=As.current,Ot(As)}function Hr(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,Nv(o)),Yt!==null)for(o=Yt.return;o!==null;){var u=o;switch(Lu(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Aa();break;case 3:Es(),Ot(Ln),Ot(hn),Wu();break;case 5:Vu(u);break;case 4:Es();break;case 13:Ot(Bt);break;case 19:Ot(Bt);break;case 10:Ou(u.type._context);break;case 22:case 23:Mc()}o=o.return}if(sn=n,Yt=n=gr(n.current,null),un=Hn=i,Qt=0,No=null,mc=$a=zr=0,Un=Fo=null,Fr!==null){for(i=0;i<Fr.length;i++)if(o=Fr[i],u=o.interleaved,u!==null){o.interleaved=null;var d=u.next,p=o.pending;if(p!==null){var M=p.next;p.next=d,u.next=M}o.pending=u}Fr=null}return n}function Cp(n,i){do{var o=Yt;try{if(Fu(),ka.current=Va,za){for(var u=Ht.memoizedState;u!==null;){var d=u.queue;d!==null&&(d.pending=null),u=u.next}za=!1}if(kr=0,rn=Zt=Ht=null,bo=!1,Po=0,pc.current=null,o===null||o.return===null){Qt=1,No=i,Yt=null;break}e:{var p=n,M=o.return,L=o,F=i;if(i=un,L.flags|=32768,F!==null&&typeof F=="object"&&typeof F.then=="function"){var J=F,ve=L,xe=ve.tag;if((ve.mode&1)===0&&(xe===0||xe===11||xe===15)){var me=ve.alternate;me?(ve.updateQueue=me.updateQueue,ve.memoizedState=me.memoizedState,ve.lanes=me.lanes):(ve.updateQueue=null,ve.memoizedState=null)}var Le=Jh(M);if(Le!==null){Le.flags&=-257,ep(Le,M,L,p,i),Le.mode&1&&Qh(p,J,i),i=Le,F=J;var ke=i.updateQueue;if(ke===null){var Be=new Set;Be.add(F),i.updateQueue=Be}else ke.add(F);break e}else{if((i&1)===0){Qh(p,J,i),Ec();break e}F=Error(t(426))}}else if(zt&&L.mode&1){var Xt=Jh(M);if(Xt!==null){(Xt.flags&65536)===0&&(Xt.flags|=256),ep(Xt,M,L,p,i),Uu(Ts(F,L));break e}}p=F=Ts(F,L),Qt!==4&&(Qt=2),Fo===null?Fo=[p]:Fo.push(p),p=M;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var j=Kh(p,F,i);Eh(p,j);break e;case 1:L=F;var B=p.type,$=p.stateNode;if((p.flags&128)===0&&(typeof B.getDerivedStateFromError=="function"||$!==null&&typeof $.componentDidCatch=="function"&&(dr===null||!dr.has($)))){p.flags|=65536,i&=-i,p.lanes|=i;var Ee=Zh(p,L,i);Eh(p,Ee);break e}}p=p.return}while(p!==null)}Lp(o)}catch(We){i=We,Yt===o&&o!==null&&(Yt=o=o.return);continue}break}while(!0)}function bp(){var n=qa.current;return qa.current=Va,n===null?Va:n}function Ec(){(Qt===0||Qt===3||Qt===2)&&(Qt=4),sn===null||(zr&268435455)===0&&($a&268435455)===0||mr(sn,un)}function tl(n,i){var o=yt;yt|=2;var u=bp();(sn!==n||un!==i)&&(Oi=null,Hr(n,i));do try{o0();break}catch(d){Cp(n,d)}while(!0);if(Fu(),yt=o,qa.current=u,Yt!==null)throw Error(t(261));return sn=null,un=0,Qt}function o0(){for(;Yt!==null;)Pp(Yt)}function a0(){for(;Yt!==null&&!W();)Pp(Yt)}function Pp(n){var i=Up(n.alternate,n,Hn);n.memoizedProps=n.pendingProps,i===null?Lp(n):Yt=i,pc.current=null}function Lp(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=Jv(o,i,Hn),o!==null){Yt=o;return}}else{if(o=e0(o,i),o!==null){o.flags&=32767,Yt=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Qt=6,Yt=null;return}}if(i=i.sibling,i!==null){Yt=i;return}Yt=i=n}while(i!==null);Qt===0&&(Qt=5)}function Vr(n,i,o){var u=Ct,d=Zn.transition;try{Zn.transition=null,Ct=1,l0(n,i,o,u)}finally{Zn.transition=d,Ct=u}return null}function l0(n,i,o,u){do Cs();while(hr!==null);if((yt&6)!==0)throw Error(t(327));o=n.finishedWork;var d=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var p=o.lanes|o.childLanes;if(ua(n,p),n===sn&&(Yt=sn=null,un=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Za||(Za=!0,Np(it,function(){return Cs(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=Zn.transition,Zn.transition=null;var M=Ct;Ct=1;var L=yt;yt|=4,pc.current=null,n0(n,o),Sp(o,n),Cv(Eu),da=!!Mu,Eu=Mu=null,n.current=o,i0(o),Te(),yt=L,Ct=M,Zn.transition=p}else n.current=o;if(Za&&(Za=!1,hr=n,Qa=d),p=n.pendingLanes,p===0&&(dr=null),fn(o.stateNode),Nn(n,Se()),i!==null)for(u=n.onRecoverableError,o=0;o<i.length;o++)d=i[o],u(d.value,{componentStack:d.stack,digest:d.digest});if(Ka)throw Ka=!1,n=vc,vc=null,n;return(Qa&1)!==0&&n.tag!==0&&Cs(),p=n.pendingLanes,(p&1)!==0?n===_c?Oo++:(Oo=0,_c=n):Oo=0,lr(),null}function Cs(){if(hr!==null){var n=xd(Qa),i=Zn.transition,o=Ct;try{if(Zn.transition=null,Ct=16>n?16:n,hr===null)var u=!1;else{if(n=hr,hr=null,Qa=0,(yt&6)!==0)throw Error(t(331));var d=yt;for(yt|=4,Ne=n.current;Ne!==null;){var p=Ne,M=p.child;if((Ne.flags&16)!==0){var L=p.deletions;if(L!==null){for(var F=0;F<L.length;F++){var J=L[F];for(Ne=J;Ne!==null;){var ve=Ne;switch(ve.tag){case 0:case 11:case 15:Uo(8,ve,p)}var xe=ve.child;if(xe!==null)xe.return=ve,Ne=xe;else for(;Ne!==null;){ve=Ne;var me=ve.sibling,Le=ve.return;if(gp(ve),ve===J){Ne=null;break}if(me!==null){me.return=Le,Ne=me;break}Ne=Le}}}var ke=p.alternate;if(ke!==null){var Be=ke.child;if(Be!==null){ke.child=null;do{var Xt=Be.sibling;Be.sibling=null,Be=Xt}while(Be!==null)}}Ne=p}}if((p.subtreeFlags&2064)!==0&&M!==null)M.return=p,Ne=M;else e:for(;Ne!==null;){if(p=Ne,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:Uo(9,p,p.return)}var j=p.sibling;if(j!==null){j.return=p.return,Ne=j;break e}Ne=p.return}}var B=n.current;for(Ne=B;Ne!==null;){M=Ne;var $=M.child;if((M.subtreeFlags&2064)!==0&&$!==null)$.return=M,Ne=$;else e:for(M=B;Ne!==null;){if(L=Ne,(L.flags&2048)!==0)try{switch(L.tag){case 0:case 11:case 15:Ya(9,L)}}catch(We){Gt(L,L.return,We)}if(L===M){Ne=null;break e}var Ee=L.sibling;if(Ee!==null){Ee.return=L.return,Ne=Ee;break e}Ne=L.return}}if(yt=d,lr(),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(Tt,n)}catch{}u=!0}return u}finally{Ct=o,Zn.transition=i}}return!1}function Dp(n,i,o){i=Ts(o,i),i=Kh(n,i,1),n=cr(n,i,1),i=Tn(),n!==null&&(Pn(n,1,i),Nn(n,i))}function Gt(n,i,o){if(n.tag===3)Dp(n,n,o);else for(;i!==null;){if(i.tag===3){Dp(i,n,o);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(dr===null||!dr.has(u))){n=Ts(o,n),n=Zh(i,n,1),i=cr(i,n,1),n=Tn(),i!==null&&(Pn(i,1,n),Nn(i,n));break}}i=i.return}}function u0(n,i,o){var u=n.pingCache;u!==null&&u.delete(i),i=Tn(),n.pingedLanes|=n.suspendedLanes&o,sn===n&&(un&o)===o&&(Qt===4||Qt===3&&(un&130023424)===un&&500>Se()-gc?Hr(n,0):mc|=o),Nn(n,i)}function Ip(n,i){i===0&&((n.mode&1)===0?i=1:(i=ri,ri<<=1,(ri&130023424)===0&&(ri=4194304)));var o=Tn();n=Ui(n,i),n!==null&&(Pn(n,i,o),Nn(n,o))}function c0(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),Ip(n,o)}function f0(n,i){var o=0;switch(n.tag){case 13:var u=n.stateNode,d=n.memoizedState;d!==null&&(o=d.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),Ip(n,o)}var Up;Up=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||Ln.current)In=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return In=!1,Qv(n,i,o);In=(n.flags&131072)!==0}else In=!1,zt&&(i.flags&1048576)!==0&&hh(i,Pa,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;Xa(n,i),n=i.pendingProps;var d=gs(i,hn.current);Ms(i,o),d=Yu(null,i,u,n,d,o);var p=qu();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Dn(u)?(p=!0,Ra(i)):p=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Bu(i),d.updater=Ga,i.stateNode=d,d._reactInternals=i,ec(i,u,n,o),i=rc(null,i,u,!0,p,o)):(i.tag=0,zt&&p&&Pu(i),En(null,i,d,o),i=i.child),i;case 16:u=i.elementType;e:{switch(Xa(n,i),n=i.pendingProps,d=u._init,u=d(u._payload),i.type=u,d=i.tag=h0(u),n=ai(u,n),d){case 0:i=ic(null,i,u,n,o);break e;case 1:i=op(null,i,u,n,o);break e;case 11:i=tp(null,i,u,n,o);break e;case 14:i=np(null,i,u,ai(u.type,n),o);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,d=i.pendingProps,d=i.elementType===u?d:ai(u,d),ic(n,i,u,d,o);case 1:return u=i.type,d=i.pendingProps,d=i.elementType===u?d:ai(u,d),op(n,i,u,d,o);case 3:e:{if(ap(i),n===null)throw Error(t(387));u=i.pendingProps,p=i.memoizedState,d=p.element,Mh(n,i),Fa(i,u,null,o);var M=i.memoizedState;if(u=M.element,p.isDehydrated)if(p={element:u,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){d=Ts(Error(t(423)),i),i=lp(n,i,u,o,d);break e}else if(u!==d){d=Ts(Error(t(424)),i),i=lp(n,i,u,o,d);break e}else for(Bn=sr(i.stateNode.containerInfo.firstChild),zn=i,zt=!0,oi=null,o=yh(i,null,u,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(xs(),u===d){i=Fi(n,i,o);break e}En(n,i,u,o)}i=i.child}return i;case 5:return wh(i),n===null&&Iu(i),u=i.type,d=i.pendingProps,p=n!==null?n.memoizedProps:null,M=d.children,Tu(u,d)?M=null:p!==null&&Tu(u,p)&&(i.flags|=32),sp(n,i),En(n,i,M,o),i.child;case 6:return n===null&&Iu(i),null;case 13:return up(n,i,o);case 4:return Hu(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=ys(i,null,u,o):En(n,i,u,o),i.child;case 11:return u=i.type,d=i.pendingProps,d=i.elementType===u?d:ai(u,d),tp(n,i,u,d,o);case 7:return En(n,i,i.pendingProps,o),i.child;case 8:return En(n,i,i.pendingProps.children,o),i.child;case 12:return En(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(u=i.type._context,d=i.pendingProps,p=i.memoizedProps,M=d.value,Ut(Ia,u._currentValue),u._currentValue=M,p!==null)if(si(p.value,M)){if(p.children===d.children&&!Ln.current){i=Fi(n,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var L=p.dependencies;if(L!==null){M=p.child;for(var F=L.firstContext;F!==null;){if(F.context===u){if(p.tag===1){F=Ni(-1,o&-o),F.tag=2;var J=p.updateQueue;if(J!==null){J=J.shared;var ve=J.pending;ve===null?F.next=F:(F.next=ve.next,ve.next=F),J.pending=F}}p.lanes|=o,F=p.alternate,F!==null&&(F.lanes|=o),ku(p.return,o,i),L.lanes|=o;break}F=F.next}}else if(p.tag===10)M=p.type===i.type?null:p.child;else if(p.tag===18){if(M=p.return,M===null)throw Error(t(341));M.lanes|=o,L=M.alternate,L!==null&&(L.lanes|=o),ku(M,o,i),M=p.sibling}else M=p.child;if(M!==null)M.return=p;else for(M=p;M!==null;){if(M===i){M=null;break}if(p=M.sibling,p!==null){p.return=M.return,M=p;break}M=M.return}p=M}En(n,i,d.children,o),i=i.child}return i;case 9:return d=i.type,u=i.pendingProps.children,Ms(i,o),d=$n(d),u=u(d),i.flags|=1,En(n,i,u,o),i.child;case 14:return u=i.type,d=ai(u,i.pendingProps),d=ai(u.type,d),np(n,i,u,d,o);case 15:return ip(n,i,i.type,i.pendingProps,o);case 17:return u=i.type,d=i.pendingProps,d=i.elementType===u?d:ai(u,d),Xa(n,i),i.tag=1,Dn(u)?(n=!0,Ra(i)):n=!1,Ms(i,o),qh(i,u,d),ec(i,u,d,o),rc(null,i,u,!0,n,o);case 19:return fp(n,i,o);case 22:return rp(n,i,o)}throw Error(t(156,i.tag))};function Np(n,i){return ee(n,i)}function d0(n,i,o,u){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qn(n,i,o,u){return new d0(n,i,o,u)}function Tc(n){return n=n.prototype,!(!n||!n.isReactComponent)}function h0(n){if(typeof n=="function")return Tc(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ne)return 11;if(n===ce)return 14}return 2}function gr(n,i){var o=n.alternate;return o===null?(o=Qn(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function nl(n,i,o,u,d,p){var M=2;if(u=n,typeof n=="function")Tc(n)&&(M=1);else if(typeof n=="string")M=5;else e:switch(n){case N:return Gr(o.children,d,p,i);case V:M=8,d|=8;break;case b:return n=Qn(12,o,i,d|2),n.elementType=b,n.lanes=p,n;case K:return n=Qn(13,o,i,d),n.elementType=K,n.lanes=p,n;case ae:return n=Qn(19,o,i,d),n.elementType=ae,n.lanes=p,n;case ue:return il(o,d,p,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case R:M=10;break e;case k:M=9;break e;case ne:M=11;break e;case ce:M=14;break e;case oe:M=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=Qn(M,o,i,d),i.elementType=n,i.type=u,i.lanes=p,i}function Gr(n,i,o,u){return n=Qn(7,n,u,i),n.lanes=o,n}function il(n,i,o,u){return n=Qn(22,n,u,i),n.elementType=ue,n.lanes=o,n.stateNode={isHidden:!1},n}function wc(n,i,o){return n=Qn(6,n,null,i),n.lanes=o,n}function Ac(n,i,o){return i=Qn(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function p0(n,i,o,u,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=jn(0),this.expirationTimes=jn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=jn(0),this.identifierPrefix=u,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Rc(n,i,o,u,d,p,M,L,F){return n=new p0(n,i,o,L,F),i===1?(i=1,p===!0&&(i|=8)):i=0,p=Qn(3,null,null,i),n.current=p,p.stateNode=n,p.memoizedState={element:u,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bu(p),n}function m0(n,i,o){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:O,key:u==null?null:""+u,children:n,containerInfo:i,implementation:o}}function Fp(n){if(!n)return ar;n=n._reactInternals;e:{if(_i(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Dn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Dn(o))return ch(n,o,i)}return i}function Op(n,i,o,u,d,p,M,L,F){return n=Rc(o,u,!0,n,d,p,M,L,F),n.context=Fp(null),o=n.current,u=Tn(),d=pr(o),p=Ni(u,d),p.callback=i??null,cr(o,p,d),n.current.lanes=d,Pn(n,d,u),Nn(n,u),n}function rl(n,i,o,u){var d=i.current,p=Tn(),M=pr(d);return o=Fp(o),i.context===null?i.context=o:i.pendingContext=o,i=Ni(p,M),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=cr(d,i,M),n!==null&&(ci(n,d,M,p),Na(n,d,M)),M}function sl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function kp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function Cc(n,i){kp(n,i),(n=n.alternate)&&kp(n,i)}function g0(){return null}var zp=typeof reportError=="function"?reportError:function(n){console.error(n)};function bc(n){this._internalRoot=n}ol.prototype.render=bc.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));rl(n,i,null,null)},ol.prototype.unmount=bc.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Br(function(){rl(null,n,null,null)}),i[Pi]=null}};function ol(n){this._internalRoot=n}ol.prototype.unstable_scheduleHydration=function(n){if(n){var i=Md();n={blockedOn:null,target:n,priority:i};for(var o=0;o<nr.length&&i!==0&&i<nr[o].priority;o++);nr.splice(o,0,n),o===0&&wd(n)}};function Pc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function al(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Bp(){}function v0(n,i,o,u,d){if(d){if(typeof u=="function"){var p=u;u=function(){var J=sl(M);p.call(J)}}var M=Op(i,u,n,0,null,!1,!1,"",Bp);return n._reactRootContainer=M,n[Pi]=M.current,So(n.nodeType===8?n.parentNode:n),Br(),M}for(;d=n.lastChild;)n.removeChild(d);if(typeof u=="function"){var L=u;u=function(){var J=sl(F);L.call(J)}}var F=Rc(n,0,!1,null,null,!1,!1,"",Bp);return n._reactRootContainer=F,n[Pi]=F.current,So(n.nodeType===8?n.parentNode:n),Br(function(){rl(i,F,o,u)}),F}function ll(n,i,o,u,d){var p=o._reactRootContainer;if(p){var M=p;if(typeof d=="function"){var L=d;d=function(){var F=sl(M);L.call(F)}}rl(i,M,n,d)}else M=v0(o,i,n,d,u);return sl(M)}yd=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=Kt(i.pendingLanes);o!==0&&(eu(i,o|1),Nn(i,Se()),(yt&6)===0&&(Rs=Se()+500,lr()))}break;case 13:Br(function(){var u=Ui(n,1);if(u!==null){var d=Tn();ci(u,n,1,d)}}),Cc(n,1)}},tu=function(n){if(n.tag===13){var i=Ui(n,134217728);if(i!==null){var o=Tn();ci(i,n,134217728,o)}Cc(n,134217728)}},Sd=function(n){if(n.tag===13){var i=pr(n),o=Ui(n,i);if(o!==null){var u=Tn();ci(o,n,i,u)}Cc(n,i)}},Md=function(){return Ct},Ed=function(n,i){var o=Ct;try{return Ct=n,i()}finally{Ct=o}},Re=function(n,i,o){switch(i){case"input":if(ct(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var u=o[i];if(u!==n&&u.form===n.form){var d=wa(u);if(!d)throw Error(t(90));gt(u),ct(u,d)}}}break;case"textarea":pe(n,o);break;case"select":i=o.value,i!=null&&P(n,!!o.multiple,i,!1)}},Nt=Sc,$t=Br;var _0={usingClientEntryPoint:!1,Events:[To,ps,wa,be,st,Sc]},ko={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},x0={bundleType:ko.bundleType,version:ko.version,rendererPackageName:ko.rendererPackageName,rendererConfig:ko.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=A(n),n===null?null:n.stateNode},findFiberByHostInstance:ko.findFiberByHostInstance||g0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ul=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ul.isDisabled&&ul.supportsFiber)try{Tt=ul.inject(x0),vt=ul}catch{}}return Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_0,Fn.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pc(i))throw Error(t(200));return m0(n,i,null,o)},Fn.createRoot=function(n,i){if(!Pc(n))throw Error(t(299));var o=!1,u="",d=zp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Rc(n,1,!1,null,null,o,!1,u,d),n[Pi]=i.current,So(n.nodeType===8?n.parentNode:n),new bc(i)},Fn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=A(i),n=n===null?null:n.stateNode,n},Fn.flushSync=function(n){return Br(n)},Fn.hydrate=function(n,i,o){if(!al(i))throw Error(t(200));return ll(null,n,i,!0,o)},Fn.hydrateRoot=function(n,i,o){if(!Pc(n))throw Error(t(405));var u=o!=null&&o.hydratedSources||null,d=!1,p="",M=zp;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(M=o.onRecoverableError)),i=Op(i,null,n,1,o??null,d,!1,p,M),n[Pi]=i.current,So(n),u)for(n=0;n<u.length;n++)o=u[n],d=o._getVersion,d=d(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,d]:i.mutableSourceEagerHydrationData.push(o,d);return new ol(i)},Fn.render=function(n,i,o){if(!al(i))throw Error(t(200));return ll(null,n,i,!1,o)},Fn.unmountComponentAtNode=function(n){if(!al(n))throw Error(t(40));return n._reactRootContainer?(Br(function(){ll(null,null,n,!1,function(){n._reactRootContainer=null,n[Pi]=null})}),!0):!1},Fn.unstable_batchedUpdates=Sc,Fn.unstable_renderSubtreeIntoContainer=function(n,i,o,u){if(!al(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return ll(n,i,o,!1,u)},Fn.version="18.3.1-next-f1338f8080-20240426",Fn}var qp;function b0(){if(qp)return Ic.exports;qp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Ic.exports=C0(),Ic.exports}var $p;function P0(){if($p)return fl;$p=1;var s=b0();return fl.createRoot=s.createRoot,fl.hydrateRoot=s.hydrateRoot,fl}var L0=P0();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const id="170",D0=0,Kp=1,I0=2,ag=1,lg=2,Gi=3,Cr=0,On=1,Wi=2,Ar=0,qs=1,Zp=2,Qp=3,Jp=4,U0=5,Qr=100,N0=101,F0=102,O0=103,k0=104,z0=200,B0=201,H0=202,V0=203,pf=204,mf=205,G0=206,W0=207,X0=208,j0=209,Y0=210,q0=211,$0=212,K0=213,Z0=214,gf=0,vf=1,_f=2,Zs=3,xf=4,yf=5,Sf=6,Mf=7,ug=0,Q0=1,J0=2,Rr=0,e_=1,t_=2,n_=3,i_=4,r_=5,s_=6,o_=7,cg=300,Qs=301,Js=302,Ef=303,Tf=304,$l=306,wf=1e3,es=1001,Af=1002,gi=1003,a_=1004,dl=1005,wi=1006,Fc=1007,ts=1008,Ki=1009,fg=1010,dg=1011,ea=1012,rd=1013,ns=1014,ji=1015,na=1016,sd=1017,od=1018,eo=1020,hg=35902,pg=1021,mg=1022,mi=1023,gg=1024,vg=1025,$s=1026,to=1027,_g=1028,ad=1029,xg=1030,ld=1031,ud=1033,kl=33776,zl=33777,Bl=33778,Hl=33779,Rf=35840,Cf=35841,bf=35842,Pf=35843,Lf=36196,Df=37492,If=37496,Uf=37808,Nf=37809,Ff=37810,Of=37811,kf=37812,zf=37813,Bf=37814,Hf=37815,Vf=37816,Gf=37817,Wf=37818,Xf=37819,jf=37820,Yf=37821,Vl=36492,qf=36494,$f=36495,yg=36283,Kf=36284,Zf=36285,Qf=36286,l_=3200,u_=3201,Sg=0,c_=1,wr="",ei="srgb",ro="srgb-linear",Kl="linear",Lt="srgb",bs=7680,em=519,f_=512,d_=513,h_=514,Mg=515,p_=516,m_=517,g_=518,v_=519,Jf=35044,tm="300 es",Yi=2e3,Wl=2001;class so{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,f=a.length;l<f;l++)a[l].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nm=1234567;const Zo=Math.PI/180,ta=180/Math.PI;function qi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(vn[s&255]+vn[s>>8&255]+vn[s>>16&255]+vn[s>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]).toLowerCase()}function Rn(s,e,t){return Math.max(e,Math.min(t,s))}function cd(s,e){return(s%e+e)%e}function __(s,e,t,r,a){return r+(s-e)*(a-r)/(t-e)}function x_(s,e,t){return s!==e?(t-s)/(e-s):0}function Qo(s,e,t){return(1-t)*s+t*e}function y_(s,e,t,r){return Qo(s,e,1-Math.exp(-t*r))}function S_(s,e=1){return e-Math.abs(cd(s,e*2)-e)}function M_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function E_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function T_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function w_(s,e){return s+Math.random()*(e-s)}function A_(s){return s*(.5-Math.random())}function R_(s){s!==void 0&&(nm=s);let e=nm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function C_(s){return s*Zo}function b_(s){return s*ta}function P_(s){return(s&s-1)===0&&s!==0}function L_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function D_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function I_(s,e,t,r,a){const l=Math.cos,f=Math.sin,c=l(t/2),h=f(t/2),m=l((e+r)/2),g=f((e+r)/2),_=l((e-r)/2),x=f((e-r)/2),S=l((r-e)/2),E=f((r-e)/2);switch(a){case"XYX":s.set(c*g,h*_,h*x,c*m);break;case"YZY":s.set(h*x,c*g,h*_,c*m);break;case"ZXZ":s.set(h*_,h*x,c*g,c*m);break;case"XZX":s.set(c*g,h*E,h*S,c*m);break;case"YXY":s.set(h*S,c*g,h*E,c*m);break;case"ZYZ":s.set(h*E,h*S,c*g,c*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function pi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function bt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const U_={DEG2RAD:Zo,RAD2DEG:ta,generateUUID:qi,clamp:Rn,euclideanModulo:cd,mapLinear:__,inverseLerp:x_,lerp:Qo,damp:y_,pingpong:S_,smoothstep:M_,smootherstep:E_,randInt:T_,randFloat:w_,randFloatSpread:A_,seededRandom:R_,degToRad:C_,radToDeg:b_,isPowerOfTwo:P_,ceilPowerOfTwo:L_,floorPowerOfTwo:D_,setQuaternionFromProperEuler:I_,normalize:bt,denormalize:pi};class pt{constructor(e=0,t=0){pt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Rn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),l=this.x-e.x,f=this.y-e.y;return this.x=l*r-f*a+e.x,this.y=l*a+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class at{constructor(e,t,r,a,l,f,c,h,m){at.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,f,c,h,m)}set(e,t,r,a,l,f,c,h,m){const g=this.elements;return g[0]=e,g[1]=a,g[2]=c,g[3]=t,g[4]=l,g[5]=h,g[6]=r,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,f=r[0],c=r[3],h=r[6],m=r[1],g=r[4],_=r[7],x=r[2],S=r[5],E=r[8],w=a[0],y=a[3],v=a[6],I=a[1],D=a[4],C=a[7],q=a[2],O=a[5],N=a[8];return l[0]=f*w+c*I+h*q,l[3]=f*y+c*D+h*O,l[6]=f*v+c*C+h*N,l[1]=m*w+g*I+_*q,l[4]=m*y+g*D+_*O,l[7]=m*v+g*C+_*N,l[2]=x*w+S*I+E*q,l[5]=x*y+S*D+E*O,l[8]=x*v+S*C+E*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],f=e[4],c=e[5],h=e[6],m=e[7],g=e[8];return t*f*g-t*c*m-r*l*g+r*c*h+a*l*m-a*f*h}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],f=e[4],c=e[5],h=e[6],m=e[7],g=e[8],_=g*f-c*m,x=c*h-g*l,S=m*l-f*h,E=t*_+r*x+a*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=_*w,e[1]=(a*m-g*r)*w,e[2]=(c*r-a*f)*w,e[3]=x*w,e[4]=(g*t-a*h)*w,e[5]=(a*l-c*t)*w,e[6]=S*w,e[7]=(r*h-m*t)*w,e[8]=(f*t-r*l)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,l,f,c){const h=Math.cos(l),m=Math.sin(l);return this.set(r*h,r*m,-r*(h*f+m*c)+f+e,-a*m,a*h,-a*(-m*f+h*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(Oc.makeScale(e,t)),this}rotate(e){return this.premultiply(Oc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Oc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Oc=new at;function Eg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Xl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function N_(){const s=Xl("canvas");return s.style.display="block",s}const im={};function $o(s){s in im||(im[s]=!0,console.warn(s))}function F_(s,e,t){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}function O_(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function k_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const St={enabled:!0,workingColorSpace:ro,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Lt&&(s.r=$i(s.r),s.g=$i(s.g),s.b=$i(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Lt&&(s.r=Ks(s.r),s.g=Ks(s.g),s.b=Ks(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wr?Kl:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function $i(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ks(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const rm=[.64,.33,.3,.6,.15,.06],sm=[.2126,.7152,.0722],om=[.3127,.329],am=new at().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lm=new at().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);St.define({[ro]:{primaries:rm,whitePoint:om,transfer:Kl,toXYZ:am,fromXYZ:lm,luminanceCoefficients:sm,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:rm,whitePoint:om,transfer:Lt,toXYZ:am,fromXYZ:lm,luminanceCoefficients:sm,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}});let Ps;class z_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ps===void 0&&(Ps=Xl("canvas")),Ps.width=e.width,Ps.height=e.height;const r=Ps.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Ps}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xl("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let f=0;f<l.length;f++)l[f]=$i(l[f]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor($i(t[r]/255)*255):t[r]=$i(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let B_=0;class Tg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:B_++}),this.uuid=qi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let f=0,c=a.length;f<c;f++)a[f].isDataTexture?l.push(kc(a[f].image)):l.push(kc(a[f]))}else l=kc(a);r.url=l}return t||(e.images[this.uuid]=r),r}}function kc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?z_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let H_=0;class Cn extends so{constructor(e=Cn.DEFAULT_IMAGE,t=Cn.DEFAULT_MAPPING,r=es,a=es,l=wi,f=ts,c=mi,h=Ki,m=Cn.DEFAULT_ANISOTROPY,g=wr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:H_++}),this.uuid=qi(),this.name="",this.source=new Tg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=f,this.anisotropy=m,this.format=c,this.internalFormat=null,this.type=h,this.offset=new pt(0,0),this.repeat=new pt(1,1),this.center=new pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new at,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wf:e.x=e.x-Math.floor(e.x);break;case es:e.x=e.x<0?0:1;break;case Af:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wf:e.y=e.y-Math.floor(e.y);break;case es:e.y=e.y<0?0:1;break;case Af:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Cn.DEFAULT_IMAGE=null;Cn.DEFAULT_MAPPING=cg;Cn.DEFAULT_ANISOTROPY=1;class Wt{constructor(e=0,t=0,r=0,a=1){Wt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=this.w,f=e.elements;return this.x=f[0]*t+f[4]*r+f[8]*a+f[12]*l,this.y=f[1]*t+f[5]*r+f[9]*a+f[13]*l,this.z=f[2]*t+f[6]*r+f[10]*a+f[14]*l,this.w=f[3]*t+f[7]*r+f[11]*a+f[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,l;const h=e.elements,m=h[0],g=h[4],_=h[8],x=h[1],S=h[5],E=h[9],w=h[2],y=h[6],v=h[10];if(Math.abs(g-x)<.01&&Math.abs(_-w)<.01&&Math.abs(E-y)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+w)<.1&&Math.abs(E+y)<.1&&Math.abs(m+S+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const D=(m+1)/2,C=(S+1)/2,q=(v+1)/2,O=(g+x)/4,N=(_+w)/4,V=(E+y)/4;return D>C&&D>q?D<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(D),a=O/r,l=N/r):C>q?C<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(C),r=O/a,l=V/a):q<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(q),r=N/l,a=V/l),this.set(r,a,l,t),this}let I=Math.sqrt((y-E)*(y-E)+(_-w)*(_-w)+(x-g)*(x-g));return Math.abs(I)<.001&&(I=1),this.x=(y-E)/I,this.y=(_-w)/I,this.z=(x-g)/I,this.w=Math.acos((m+S+v-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class V_ extends so{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Wt(0,0,e,t),this.scissorTest=!1,this.viewport=new Wt(0,0,e,t);const a={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Cn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const f=r.count;for(let c=0;c<f;c++)this.textures[c]=l.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Tg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class is extends V_{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class wg extends Cn{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=gi,this.minFilter=gi,this.wrapR=es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class G_ extends Cn{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=gi,this.minFilter=gi,this.wrapR=es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ia{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,l,f,c){let h=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];const x=l[f+0],S=l[f+1],E=l[f+2],w=l[f+3];if(c===0){e[t+0]=h,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(c===1){e[t+0]=x,e[t+1]=S,e[t+2]=E,e[t+3]=w;return}if(_!==w||h!==x||m!==S||g!==E){let y=1-c;const v=h*x+m*S+g*E+_*w,I=v>=0?1:-1,D=1-v*v;if(D>Number.EPSILON){const q=Math.sqrt(D),O=Math.atan2(q,v*I);y=Math.sin(y*O)/q,c=Math.sin(c*O)/q}const C=c*I;if(h=h*y+x*C,m=m*y+S*C,g=g*y+E*C,_=_*y+w*C,y===1-c){const q=1/Math.sqrt(h*h+m*m+g*g+_*_);h*=q,m*=q,g*=q,_*=q}}e[t]=h,e[t+1]=m,e[t+2]=g,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,a,l,f){const c=r[a],h=r[a+1],m=r[a+2],g=r[a+3],_=l[f],x=l[f+1],S=l[f+2],E=l[f+3];return e[t]=c*E+g*_+h*S-m*x,e[t+1]=h*E+g*x+m*_-c*S,e[t+2]=m*E+g*S+c*x-h*_,e[t+3]=g*E-c*_-h*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,l=e._z,f=e._order,c=Math.cos,h=Math.sin,m=c(r/2),g=c(a/2),_=c(l/2),x=h(r/2),S=h(a/2),E=h(l/2);switch(f){case"XYZ":this._x=x*g*_+m*S*E,this._y=m*S*_-x*g*E,this._z=m*g*E+x*S*_,this._w=m*g*_-x*S*E;break;case"YXZ":this._x=x*g*_+m*S*E,this._y=m*S*_-x*g*E,this._z=m*g*E-x*S*_,this._w=m*g*_+x*S*E;break;case"ZXY":this._x=x*g*_-m*S*E,this._y=m*S*_+x*g*E,this._z=m*g*E+x*S*_,this._w=m*g*_-x*S*E;break;case"ZYX":this._x=x*g*_-m*S*E,this._y=m*S*_+x*g*E,this._z=m*g*E-x*S*_,this._w=m*g*_+x*S*E;break;case"YZX":this._x=x*g*_+m*S*E,this._y=m*S*_+x*g*E,this._z=m*g*E-x*S*_,this._w=m*g*_-x*S*E;break;case"XZY":this._x=x*g*_-m*S*E,this._y=m*S*_-x*g*E,this._z=m*g*E+x*S*_,this._w=m*g*_+x*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],l=t[8],f=t[1],c=t[5],h=t[9],m=t[2],g=t[6],_=t[10],x=r+c+_;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(g-h)*S,this._y=(l-m)*S,this._z=(f-a)*S}else if(r>c&&r>_){const S=2*Math.sqrt(1+r-c-_);this._w=(g-h)/S,this._x=.25*S,this._y=(a+f)/S,this._z=(l+m)/S}else if(c>_){const S=2*Math.sqrt(1+c-r-_);this._w=(l-m)/S,this._x=(a+f)/S,this._y=.25*S,this._z=(h+g)/S}else{const S=2*Math.sqrt(1+_-r-c);this._w=(f-a)/S,this._x=(l+m)/S,this._y=(h+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,l=e._z,f=e._w,c=t._x,h=t._y,m=t._z,g=t._w;return this._x=r*g+f*c+a*m-l*h,this._y=a*g+f*h+l*c-r*m,this._z=l*g+f*m+r*h-a*c,this._w=f*g-r*c-a*h-l*m,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,f=this._w;let c=f*e._w+r*e._x+a*e._y+l*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=f,this._x=r,this._y=a,this._z=l,this;const h=1-c*c;if(h<=Number.EPSILON){const S=1-t;return this._w=S*f+t*this._w,this._x=S*r+t*this._x,this._y=S*a+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const m=Math.sqrt(h),g=Math.atan2(m,c),_=Math.sin((1-t)*g)/m,x=Math.sin(t*g)/m;return this._w=f*_+this._w*x,this._x=r*_+this._x*x,this._y=a*_+this._y*x,this._z=l*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,t=0,r=0){Y.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(um.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(um.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*a,this.y=l[1]*t+l[4]*r+l[7]*a,this.z=l[2]*t+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=e.elements,f=1/(l[3]*t+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*a+l[12])*f,this.y=(l[1]*t+l[5]*r+l[9]*a+l[13])*f,this.z=(l[2]*t+l[6]*r+l[10]*a+l[14])*f,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,l=e.x,f=e.y,c=e.z,h=e.w,m=2*(f*a-c*r),g=2*(c*t-l*a),_=2*(l*r-f*t);return this.x=t+h*m+f*_-c*g,this.y=r+h*g+c*m-l*_,this.z=a+h*_+l*g-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*a,this.y=l[1]*t+l[5]*r+l[9]*a,this.z=l[2]*t+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,l=e.z,f=t.x,c=t.y,h=t.z;return this.x=a*h-l*c,this.y=l*f-r*h,this.z=r*c-a*f,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return zc.copy(this).projectOnVector(e),this.sub(zc)}reflect(e){return this.sub(zc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Rn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zc=new Y,um=new ia;class ra{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let f=0,c=l.count;f<c;f++)e.isMesh===!0?e.getVertexPosition(f,fi):fi.fromBufferAttribute(l,f),fi.applyMatrix4(e.matrixWorld),this.expandByPoint(fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),hl.copy(r.boundingBox)),hl.applyMatrix4(e.matrixWorld),this.union(hl)}const a=e.children;for(let l=0,f=a.length;l<f;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fi),fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bo),pl.subVectors(this.max,Bo),Ls.subVectors(e.a,Bo),Ds.subVectors(e.b,Bo),Is.subVectors(e.c,Bo),_r.subVectors(Ds,Ls),xr.subVectors(Is,Ds),Wr.subVectors(Ls,Is);let t=[0,-_r.z,_r.y,0,-xr.z,xr.y,0,-Wr.z,Wr.y,_r.z,0,-_r.x,xr.z,0,-xr.x,Wr.z,0,-Wr.x,-_r.y,_r.x,0,-xr.y,xr.x,0,-Wr.y,Wr.x,0];return!Bc(t,Ls,Ds,Is,pl)||(t=[1,0,0,0,1,0,0,0,1],!Bc(t,Ls,Ds,Is,pl))?!1:(ml.crossVectors(_r,xr),t=[ml.x,ml.y,ml.z],Bc(t,Ls,Ds,Is,pl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ki=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],fi=new Y,hl=new ra,Ls=new Y,Ds=new Y,Is=new Y,_r=new Y,xr=new Y,Wr=new Y,Bo=new Y,pl=new Y,ml=new Y,Xr=new Y;function Bc(s,e,t,r,a){for(let l=0,f=s.length-3;l<=f;l+=3){Xr.fromArray(s,l);const c=a.x*Math.abs(Xr.x)+a.y*Math.abs(Xr.y)+a.z*Math.abs(Xr.z),h=e.dot(Xr),m=t.dot(Xr),g=r.dot(Xr);if(Math.max(-Math.max(h,m,g),Math.min(h,m,g))>c)return!1}return!0}const W_=new ra,Ho=new Y,Hc=new Y;class Zl{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):W_.setFromPoints(e).getCenter(r);let a=0;for(let l=0,f=e.length;l<f;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ho.subVectors(e,this.center);const t=Ho.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(Ho,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ho.copy(e.center).add(Hc)),this.expandByPoint(Ho.copy(e.center).sub(Hc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zi=new Y,Vc=new Y,gl=new Y,yr=new Y,Gc=new Y,vl=new Y,Wc=new Y;class fd{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,t),zi.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){Vc.copy(e).add(t).multiplyScalar(.5),gl.copy(t).sub(e).normalize(),yr.copy(this.origin).sub(Vc);const l=e.distanceTo(t)*.5,f=-this.direction.dot(gl),c=yr.dot(this.direction),h=-yr.dot(gl),m=yr.lengthSq(),g=Math.abs(1-f*f);let _,x,S,E;if(g>0)if(_=f*h-c,x=f*c-h,E=l*g,_>=0)if(x>=-E)if(x<=E){const w=1/g;_*=w,x*=w,S=_*(_+f*x+2*c)+x*(f*_+x+2*h)+m}else x=l,_=Math.max(0,-(f*x+c)),S=-_*_+x*(x+2*h)+m;else x=-l,_=Math.max(0,-(f*x+c)),S=-_*_+x*(x+2*h)+m;else x<=-E?(_=Math.max(0,-(-f*l+c)),x=_>0?-l:Math.min(Math.max(-l,-h),l),S=-_*_+x*(x+2*h)+m):x<=E?(_=0,x=Math.min(Math.max(-l,-h),l),S=x*(x+2*h)+m):(_=Math.max(0,-(f*l+c)),x=_>0?l:Math.min(Math.max(-l,-h),l),S=-_*_+x*(x+2*h)+m);else x=f>0?-l:l,_=Math.max(0,-(f*x+c)),S=-_*_+x*(x+2*h)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,_),a&&a.copy(Vc).addScaledVector(gl,x),S}intersectSphere(e,t){zi.subVectors(e.center,this.origin);const r=zi.dot(this.direction),a=zi.dot(zi)-r*r,l=e.radius*e.radius;if(a>l)return null;const f=Math.sqrt(l-a),c=r-f,h=r+f;return h<0?null:c<0?this.at(h,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,l,f,c,h;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),g>=0?(l=(e.min.y-x.y)*g,f=(e.max.y-x.y)*g):(l=(e.max.y-x.y)*g,f=(e.min.y-x.y)*g),r>f||l>a||((l>r||isNaN(r))&&(r=l),(f<a||isNaN(a))&&(a=f),_>=0?(c=(e.min.z-x.z)*_,h=(e.max.z-x.z)*_):(c=(e.max.z-x.z)*_,h=(e.min.z-x.z)*_),r>h||c>a)||((c>r||r!==r)&&(r=c),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,t,r,a,l){Gc.subVectors(t,e),vl.subVectors(r,e),Wc.crossVectors(Gc,vl);let f=this.direction.dot(Wc),c;if(f>0){if(a)return null;c=1}else if(f<0)c=-1,f=-f;else return null;yr.subVectors(this.origin,e);const h=c*this.direction.dot(vl.crossVectors(yr,vl));if(h<0)return null;const m=c*this.direction.dot(Gc.cross(yr));if(m<0||h+m>f)return null;const g=-c*yr.dot(Wc);return g<0?null:this.at(g/f,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(e,t,r,a,l,f,c,h,m,g,_,x,S,E,w,y){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,f,c,h,m,g,_,x,S,E,w,y)}set(e,t,r,a,l,f,c,h,m,g,_,x,S,E,w,y){const v=this.elements;return v[0]=e,v[4]=t,v[8]=r,v[12]=a,v[1]=l,v[5]=f,v[9]=c,v[13]=h,v[2]=m,v[6]=g,v[10]=_,v[14]=x,v[3]=S,v[7]=E,v[11]=w,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,a=1/Us.setFromMatrixColumn(e,0).length(),l=1/Us.setFromMatrixColumn(e,1).length(),f=1/Us.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*f,t[9]=r[9]*f,t[10]=r[10]*f,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,l=e.z,f=Math.cos(r),c=Math.sin(r),h=Math.cos(a),m=Math.sin(a),g=Math.cos(l),_=Math.sin(l);if(e.order==="XYZ"){const x=f*g,S=f*_,E=c*g,w=c*_;t[0]=h*g,t[4]=-h*_,t[8]=m,t[1]=S+E*m,t[5]=x-w*m,t[9]=-c*h,t[2]=w-x*m,t[6]=E+S*m,t[10]=f*h}else if(e.order==="YXZ"){const x=h*g,S=h*_,E=m*g,w=m*_;t[0]=x+w*c,t[4]=E*c-S,t[8]=f*m,t[1]=f*_,t[5]=f*g,t[9]=-c,t[2]=S*c-E,t[6]=w+x*c,t[10]=f*h}else if(e.order==="ZXY"){const x=h*g,S=h*_,E=m*g,w=m*_;t[0]=x-w*c,t[4]=-f*_,t[8]=E+S*c,t[1]=S+E*c,t[5]=f*g,t[9]=w-x*c,t[2]=-f*m,t[6]=c,t[10]=f*h}else if(e.order==="ZYX"){const x=f*g,S=f*_,E=c*g,w=c*_;t[0]=h*g,t[4]=E*m-S,t[8]=x*m+w,t[1]=h*_,t[5]=w*m+x,t[9]=S*m-E,t[2]=-m,t[6]=c*h,t[10]=f*h}else if(e.order==="YZX"){const x=f*h,S=f*m,E=c*h,w=c*m;t[0]=h*g,t[4]=w-x*_,t[8]=E*_+S,t[1]=_,t[5]=f*g,t[9]=-c*g,t[2]=-m*g,t[6]=S*_+E,t[10]=x-w*_}else if(e.order==="XZY"){const x=f*h,S=f*m,E=c*h,w=c*m;t[0]=h*g,t[4]=-_,t[8]=m*g,t[1]=x*_+w,t[5]=f*g,t[9]=S*_-E,t[2]=E*_-S,t[6]=c*g,t[10]=w*_+x}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(X_,e,j_)}lookAt(e,t,r){const a=this.elements;return Vn.subVectors(e,t),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),Sr.crossVectors(r,Vn),Sr.lengthSq()===0&&(Math.abs(r.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),Sr.crossVectors(r,Vn)),Sr.normalize(),_l.crossVectors(Vn,Sr),a[0]=Sr.x,a[4]=_l.x,a[8]=Vn.x,a[1]=Sr.y,a[5]=_l.y,a[9]=Vn.y,a[2]=Sr.z,a[6]=_l.z,a[10]=Vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,f=r[0],c=r[4],h=r[8],m=r[12],g=r[1],_=r[5],x=r[9],S=r[13],E=r[2],w=r[6],y=r[10],v=r[14],I=r[3],D=r[7],C=r[11],q=r[15],O=a[0],N=a[4],V=a[8],b=a[12],R=a[1],k=a[5],ne=a[9],K=a[13],ae=a[2],ce=a[6],oe=a[10],ue=a[14],z=a[3],le=a[7],se=a[11],U=a[15];return l[0]=f*O+c*R+h*ae+m*z,l[4]=f*N+c*k+h*ce+m*le,l[8]=f*V+c*ne+h*oe+m*se,l[12]=f*b+c*K+h*ue+m*U,l[1]=g*O+_*R+x*ae+S*z,l[5]=g*N+_*k+x*ce+S*le,l[9]=g*V+_*ne+x*oe+S*se,l[13]=g*b+_*K+x*ue+S*U,l[2]=E*O+w*R+y*ae+v*z,l[6]=E*N+w*k+y*ce+v*le,l[10]=E*V+w*ne+y*oe+v*se,l[14]=E*b+w*K+y*ue+v*U,l[3]=I*O+D*R+C*ae+q*z,l[7]=I*N+D*k+C*ce+q*le,l[11]=I*V+D*ne+C*oe+q*se,l[15]=I*b+D*K+C*ue+q*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[12],f=e[1],c=e[5],h=e[9],m=e[13],g=e[2],_=e[6],x=e[10],S=e[14],E=e[3],w=e[7],y=e[11],v=e[15];return E*(+l*h*_-a*m*_-l*c*x+r*m*x+a*c*S-r*h*S)+w*(+t*h*S-t*m*x+l*f*x-a*f*S+a*m*g-l*h*g)+y*(+t*m*_-t*c*S-l*f*_+r*f*S+l*c*g-r*m*g)+v*(-a*c*g-t*h*_+t*c*x+a*f*_-r*f*x+r*h*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],f=e[4],c=e[5],h=e[6],m=e[7],g=e[8],_=e[9],x=e[10],S=e[11],E=e[12],w=e[13],y=e[14],v=e[15],I=_*y*m-w*x*m+w*h*S-c*y*S-_*h*v+c*x*v,D=E*x*m-g*y*m-E*h*S+f*y*S+g*h*v-f*x*v,C=g*w*m-E*_*m+E*c*S-f*w*S-g*c*v+f*_*v,q=E*_*h-g*w*h-E*c*x+f*w*x+g*c*y-f*_*y,O=t*I+r*D+a*C+l*q;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/O;return e[0]=I*N,e[1]=(w*x*l-_*y*l-w*a*S+r*y*S+_*a*v-r*x*v)*N,e[2]=(c*y*l-w*h*l+w*a*m-r*y*m-c*a*v+r*h*v)*N,e[3]=(_*h*l-c*x*l-_*a*m+r*x*m+c*a*S-r*h*S)*N,e[4]=D*N,e[5]=(g*y*l-E*x*l+E*a*S-t*y*S-g*a*v+t*x*v)*N,e[6]=(E*h*l-f*y*l-E*a*m+t*y*m+f*a*v-t*h*v)*N,e[7]=(f*x*l-g*h*l+g*a*m-t*x*m-f*a*S+t*h*S)*N,e[8]=C*N,e[9]=(E*_*l-g*w*l-E*r*S+t*w*S+g*r*v-t*_*v)*N,e[10]=(f*w*l-E*c*l+E*r*m-t*w*m-f*r*v+t*c*v)*N,e[11]=(g*c*l-f*_*l-g*r*m+t*_*m+f*r*S-t*c*S)*N,e[12]=q*N,e[13]=(g*w*a-E*_*a+E*r*x-t*w*x-g*r*y+t*_*y)*N,e[14]=(E*c*a-f*w*a-E*r*h+t*w*h+f*r*y-t*c*y)*N,e[15]=(f*_*a-g*c*a+g*r*h-t*_*h-f*r*x+t*c*x)*N,this}scale(e){const t=this.elements,r=e.x,a=e.y,l=e.z;return t[0]*=r,t[4]*=a,t[8]*=l,t[1]*=r,t[5]*=a,t[9]*=l,t[2]*=r,t[6]*=a,t[10]*=l,t[3]*=r,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),l=1-r,f=e.x,c=e.y,h=e.z,m=l*f,g=l*c;return this.set(m*f+r,m*c-a*h,m*h+a*c,0,m*c+a*h,g*c+r,g*h-a*f,0,m*h-a*c,g*h+a*f,l*h*h+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,l,f){return this.set(1,r,l,0,e,1,f,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,l=t._x,f=t._y,c=t._z,h=t._w,m=l+l,g=f+f,_=c+c,x=l*m,S=l*g,E=l*_,w=f*g,y=f*_,v=c*_,I=h*m,D=h*g,C=h*_,q=r.x,O=r.y,N=r.z;return a[0]=(1-(w+v))*q,a[1]=(S+C)*q,a[2]=(E-D)*q,a[3]=0,a[4]=(S-C)*O,a[5]=(1-(x+v))*O,a[6]=(y+I)*O,a[7]=0,a[8]=(E+D)*N,a[9]=(y-I)*N,a[10]=(1-(x+w))*N,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;let l=Us.set(a[0],a[1],a[2]).length();const f=Us.set(a[4],a[5],a[6]).length(),c=Us.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],di.copy(this);const m=1/l,g=1/f,_=1/c;return di.elements[0]*=m,di.elements[1]*=m,di.elements[2]*=m,di.elements[4]*=g,di.elements[5]*=g,di.elements[6]*=g,di.elements[8]*=_,di.elements[9]*=_,di.elements[10]*=_,t.setFromRotationMatrix(di),r.x=l,r.y=f,r.z=c,this}makePerspective(e,t,r,a,l,f,c=Yi){const h=this.elements,m=2*l/(t-e),g=2*l/(r-a),_=(t+e)/(t-e),x=(r+a)/(r-a);let S,E;if(c===Yi)S=-(f+l)/(f-l),E=-2*f*l/(f-l);else if(c===Wl)S=-f/(f-l),E=-f*l/(f-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=m,h[4]=0,h[8]=_,h[12]=0,h[1]=0,h[5]=g,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=S,h[14]=E,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,r,a,l,f,c=Yi){const h=this.elements,m=1/(t-e),g=1/(r-a),_=1/(f-l),x=(t+e)*m,S=(r+a)*g;let E,w;if(c===Yi)E=(f+l)*_,w=-2*_;else if(c===Wl)E=l*_,w=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=2*m,h[4]=0,h[8]=0,h[12]=-x,h[1]=0,h[5]=2*g,h[9]=0,h[13]=-S,h[2]=0,h[6]=0,h[10]=w,h[14]=-E,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Us=new Y,di=new kt,X_=new Y(0,0,0),j_=new Y(1,1,1),Sr=new Y,_l=new Y,Vn=new Y,cm=new kt,fm=new ia;class Ai{constructor(e=0,t=0,r=0,a=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,l=a[0],f=a[4],c=a[8],h=a[1],m=a[5],g=a[9],_=a[2],x=a[6],S=a[10];switch(t){case"XYZ":this._y=Math.asin(Rn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-f,l)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Rn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(c,S),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-_,l),this._z=0);break;case"ZXY":this._x=Math.asin(Rn(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-Rn(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(Rn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,l)):(this._x=0,this._y=Math.atan2(c,S));break;case"XZY":this._z=Math.asin(-Rn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(c,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return cm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fm.setFromEuler(this),this.setFromQuaternion(fm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class dd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Y_=0;const dm=new Y,Ns=new ia,Bi=new kt,xl=new Y,Vo=new Y,q_=new Y,$_=new ia,hm=new Y(1,0,0),pm=new Y(0,1,0),mm=new Y(0,0,1),gm={type:"added"},K_={type:"removed"},Fs={type:"childadded",child:null},Xc={type:"childremoved",child:null};class en extends so{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const e=new Y,t=new Ai,r=new ia,a=new Y(1,1,1);function l(){r.setFromEuler(t,!1)}function f(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new kt},normalMatrix:{value:new at}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.multiply(Ns),this}rotateOnWorldAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.premultiply(Ns),this}rotateX(e){return this.rotateOnAxis(hm,e)}rotateY(e){return this.rotateOnAxis(pm,e)}rotateZ(e){return this.rotateOnAxis(mm,e)}translateOnAxis(e,t){return dm.copy(e).applyQuaternion(this.quaternion),this.position.add(dm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hm,e)}translateY(e){return this.translateOnAxis(pm,e)}translateZ(e){return this.translateOnAxis(mm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?xl.copy(e):xl.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Vo,xl,this.up):Bi.lookAt(xl,Vo,this.up),this.quaternion.setFromRotationMatrix(Bi),a&&(Bi.extractRotation(a.matrixWorld),Ns.setFromRotationMatrix(Bi),this.quaternion.premultiply(Ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gm),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(K_),Xc.child=e,this.dispatchEvent(Xc),Xc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gm),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const f=this.children[r].getObjectByProperty(e,t);if(f!==void 0)return f}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let l=0,f=a.length;l<f;l++)a[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,e,q_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,$_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let l=0,f=a.length;l<f;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(c,h){return c[h.uuid]===void 0&&(c[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const h=c.shapes;if(Array.isArray(h))for(let m=0,g=h.length;m<g;m++){const _=h[m];l(e.shapes,_)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let h=0,m=this.material.length;h<m;h++)c.push(l(e.materials,this.material[h]));a.material=c}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let c=0;c<this.children.length;c++)a.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let c=0;c<this.animations.length;c++){const h=this.animations[c];a.animations.push(l(e.animations,h))}}if(t){const c=f(e.geometries),h=f(e.materials),m=f(e.textures),g=f(e.images),_=f(e.shapes),x=f(e.skeletons),S=f(e.animations),E=f(e.nodes);c.length>0&&(r.geometries=c),h.length>0&&(r.materials=h),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),_.length>0&&(r.shapes=_),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=a,r;function f(c){const h=[];for(const m in c){const g=c[m];delete g.metadata,h.push(g)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}en.DEFAULT_UP=new Y(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hi=new Y,Hi=new Y,jc=new Y,Vi=new Y,Os=new Y,ks=new Y,vm=new Y,Yc=new Y,qc=new Y,$c=new Y,Kc=new Wt,Zc=new Wt,Qc=new Wt;class ni{constructor(e=new Y,t=new Y,r=new Y){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),hi.subVectors(e,t),a.cross(hi);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,r,a,l){hi.subVectors(a,t),Hi.subVectors(r,t),jc.subVectors(e,t);const f=hi.dot(hi),c=hi.dot(Hi),h=hi.dot(jc),m=Hi.dot(Hi),g=Hi.dot(jc),_=f*m-c*c;if(_===0)return l.set(0,0,0),null;const x=1/_,S=(m*h-c*g)*x,E=(f*g-c*h)*x;return l.set(1-S-E,E,S)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getInterpolation(e,t,r,a,l,f,c,h){return this.getBarycoord(e,t,r,a,Vi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,Vi.x),h.addScaledVector(f,Vi.y),h.addScaledVector(c,Vi.z),h)}static getInterpolatedAttribute(e,t,r,a,l,f){return Kc.setScalar(0),Zc.setScalar(0),Qc.setScalar(0),Kc.fromBufferAttribute(e,t),Zc.fromBufferAttribute(e,r),Qc.fromBufferAttribute(e,a),f.setScalar(0),f.addScaledVector(Kc,l.x),f.addScaledVector(Zc,l.y),f.addScaledVector(Qc,l.z),f}static isFrontFacing(e,t,r,a){return hi.subVectors(r,t),Hi.subVectors(e,t),hi.cross(Hi).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hi.subVectors(this.c,this.b),Hi.subVectors(this.a,this.b),hi.cross(Hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ni.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,l){return ni.getInterpolation(e,this.a,this.b,this.c,t,r,a,l)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,l=this.c;let f,c;Os.subVectors(a,r),ks.subVectors(l,r),Yc.subVectors(e,r);const h=Os.dot(Yc),m=ks.dot(Yc);if(h<=0&&m<=0)return t.copy(r);qc.subVectors(e,a);const g=Os.dot(qc),_=ks.dot(qc);if(g>=0&&_<=g)return t.copy(a);const x=h*_-g*m;if(x<=0&&h>=0&&g<=0)return f=h/(h-g),t.copy(r).addScaledVector(Os,f);$c.subVectors(e,l);const S=Os.dot($c),E=ks.dot($c);if(E>=0&&S<=E)return t.copy(l);const w=S*m-h*E;if(w<=0&&m>=0&&E<=0)return c=m/(m-E),t.copy(r).addScaledVector(ks,c);const y=g*E-S*_;if(y<=0&&_-g>=0&&S-E>=0)return vm.subVectors(l,a),c=(_-g)/(_-g+(S-E)),t.copy(a).addScaledVector(vm,c);const v=1/(y+w+x);return f=w*v,c=x*v,t.copy(r).addScaledVector(Os,f).addScaledVector(ks,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ag={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mr={h:0,s:0,l:0},yl={h:0,s:0,l:0};function Jc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ht{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ei){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.toWorkingColorSpace(this,t),this}setRGB(e,t,r,a=St.workingColorSpace){return this.r=e,this.g=t,this.b=r,St.toWorkingColorSpace(this,a),this}setHSL(e,t,r,a=St.workingColorSpace){if(e=cd(e,1),t=Rn(t,0,1),r=Rn(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,f=2*r-l;this.r=Jc(f,l,e+1/3),this.g=Jc(f,l,e),this.b=Jc(f,l,e-1/3)}return St.toWorkingColorSpace(this,a),this}setStyle(e,t=ei){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const f=a[1],c=a[2];switch(f){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],f=l.length;if(f===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(f===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ei){const r=Ag[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ei){return St.fromWorkingColorSpace(_n.copy(this),e),Math.round(Rn(_n.r*255,0,255))*65536+Math.round(Rn(_n.g*255,0,255))*256+Math.round(Rn(_n.b*255,0,255))}getHexString(e=ei){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.fromWorkingColorSpace(_n.copy(this),t);const r=_n.r,a=_n.g,l=_n.b,f=Math.max(r,a,l),c=Math.min(r,a,l);let h,m;const g=(c+f)/2;if(c===f)h=0,m=0;else{const _=f-c;switch(m=g<=.5?_/(f+c):_/(2-f-c),f){case r:h=(a-l)/_+(a<l?6:0);break;case a:h=(l-r)/_+2;break;case l:h=(r-a)/_+4;break}h/=6}return e.h=h,e.s=m,e.l=g,e}getRGB(e,t=St.workingColorSpace){return St.fromWorkingColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=ei){St.fromWorkingColorSpace(_n.copy(this),e);const t=_n.r,r=_n.g,a=_n.b;return e!==ei?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(Mr),this.setHSL(Mr.h+e,Mr.s+t,Mr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Mr),e.getHSL(yl);const r=Qo(Mr.h,yl.h,t),a=Qo(Mr.s,yl.s,t),l=Qo(Mr.l,yl.l,t);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*a,this.g=l[1]*t+l[4]*r+l[7]*a,this.b=l[2]*t+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new ht;ht.NAMES=Ag;let Z_=0;class rs extends so{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=qi(),this.name="",this.blending=qs,this.side=Cr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pf,this.blendDst=mf,this.blendEquation=Qr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=em,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==qs&&(r.blending=this.blending),this.side!==Cr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==pf&&(r.blendSrc=this.blendSrc),this.blendDst!==mf&&(r.blendDst=this.blendDst),this.blendEquation!==Qr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Zs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==em&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const f=[];for(const c in l){const h=l[c];delete h.metadata,f.push(h)}return f}if(t){const l=a(e.textures),f=a(e.images);l.length>0&&(r.textures=l),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class hd extends rs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=ug,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const qt=new Y,Sl=new pt;class vi{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Jf,this.updateRanges=[],this.gpuType=ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Sl.fromBufferAttribute(this,t),Sl.applyMatrix3(e),this.setXY(t,Sl.x,Sl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=pi(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=bt(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),r=bt(r,this.array),a=bt(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),r=bt(r,this.array),a=bt(a,this.array),l=bt(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jf&&(e.usage=this.usage),e}}class Rg extends vi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Cg extends vi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class cn extends vi{constructor(e,t,r){super(new Float32Array(e),t,r)}}let Q_=0;const Jn=new kt,ef=new en,zs=new Y,Gn=new ra,Go=new ra,an=new Y;class Wn extends so{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Eg(e)?Cg:Rg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new at().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jn.makeRotationFromQuaternion(e),this.applyMatrix4(Jn),this}rotateX(e){return Jn.makeRotationX(e),this.applyMatrix4(Jn),this}rotateY(e){return Jn.makeRotationY(e),this.applyMatrix4(Jn),this}rotateZ(e){return Jn.makeRotationZ(e),this.applyMatrix4(Jn),this}translate(e,t,r){return Jn.makeTranslation(e,t,r),this.applyMatrix4(Jn),this}scale(e,t,r){return Jn.makeScale(e,t,r),this.applyMatrix4(Jn),this}lookAt(e){return ef.lookAt(e),ef.updateMatrix(),this.applyMatrix4(ef.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zs).negate(),this.translate(zs.x,zs.y,zs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const f=e[a];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new cn(r,3))}else{for(let r=0,a=t.count;r<a;r++){const l=e[r];t.setXYZ(r,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ra);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Gn.setFromBufferAttribute(l),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const r=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let l=0,f=t.length;l<f;l++){const c=t[l];Go.setFromBufferAttribute(c),this.morphTargetsRelative?(an.addVectors(Gn.min,Go.min),Gn.expandByPoint(an),an.addVectors(Gn.max,Go.max),Gn.expandByPoint(an)):(Gn.expandByPoint(Go.min),Gn.expandByPoint(Go.max))}Gn.getCenter(r);let a=0;for(let l=0,f=e.count;l<f;l++)an.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(an));if(t)for(let l=0,f=t.length;l<f;l++){const c=t[l],h=this.morphTargetsRelative;for(let m=0,g=c.count;m<g;m++)an.fromBufferAttribute(c,m),h&&(zs.fromBufferAttribute(e,m),an.add(zs)),a=Math.max(a,r.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vi(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),c=[],h=[];for(let V=0;V<r.count;V++)c[V]=new Y,h[V]=new Y;const m=new Y,g=new Y,_=new Y,x=new pt,S=new pt,E=new pt,w=new Y,y=new Y;function v(V,b,R){m.fromBufferAttribute(r,V),g.fromBufferAttribute(r,b),_.fromBufferAttribute(r,R),x.fromBufferAttribute(l,V),S.fromBufferAttribute(l,b),E.fromBufferAttribute(l,R),g.sub(m),_.sub(m),S.sub(x),E.sub(x);const k=1/(S.x*E.y-E.x*S.y);isFinite(k)&&(w.copy(g).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(k),y.copy(_).multiplyScalar(S.x).addScaledVector(g,-E.x).multiplyScalar(k),c[V].add(w),c[b].add(w),c[R].add(w),h[V].add(y),h[b].add(y),h[R].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let V=0,b=I.length;V<b;++V){const R=I[V],k=R.start,ne=R.count;for(let K=k,ae=k+ne;K<ae;K+=3)v(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const D=new Y,C=new Y,q=new Y,O=new Y;function N(V){q.fromBufferAttribute(a,V),O.copy(q);const b=c[V];D.copy(b),D.sub(q.multiplyScalar(q.dot(b))).normalize(),C.crossVectors(O,b);const k=C.dot(h[V])<0?-1:1;f.setXYZW(V,D.x,D.y,D.z,k)}for(let V=0,b=I.length;V<b;++V){const R=I[V],k=R.start,ne=R.count;for(let K=k,ae=k+ne;K<ae;K+=3)N(e.getX(K+0)),N(e.getX(K+1)),N(e.getX(K+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new vi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new Y,l=new Y,f=new Y,c=new Y,h=new Y,m=new Y,g=new Y,_=new Y;if(e)for(let x=0,S=e.count;x<S;x+=3){const E=e.getX(x+0),w=e.getX(x+1),y=e.getX(x+2);a.fromBufferAttribute(t,E),l.fromBufferAttribute(t,w),f.fromBufferAttribute(t,y),g.subVectors(f,l),_.subVectors(a,l),g.cross(_),c.fromBufferAttribute(r,E),h.fromBufferAttribute(r,w),m.fromBufferAttribute(r,y),c.add(g),h.add(g),m.add(g),r.setXYZ(E,c.x,c.y,c.z),r.setXYZ(w,h.x,h.y,h.z),r.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,S=t.count;x<S;x+=3)a.fromBufferAttribute(t,x+0),l.fromBufferAttribute(t,x+1),f.fromBufferAttribute(t,x+2),g.subVectors(f,l),_.subVectors(a,l),g.cross(_),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(c,h){const m=c.array,g=c.itemSize,_=c.normalized,x=new m.constructor(h.length*g);let S=0,E=0;for(let w=0,y=h.length;w<y;w++){c.isInterleavedBufferAttribute?S=h[w]*c.data.stride+c.offset:S=h[w]*g;for(let v=0;v<g;v++)x[E++]=m[S++]}return new vi(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wn,r=this.index.array,a=this.attributes;for(const c in a){const h=a[c],m=e(h,r);t.setAttribute(c,m)}const l=this.morphAttributes;for(const c in l){const h=[],m=l[c];for(let g=0,_=m.length;g<_;g++){const x=m[g],S=e(x,r);h.push(S)}t.morphAttributes[c]=h}t.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let c=0,h=f.length;c<h;c++){const m=f[c];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const h in r){const m=r[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],g=[];for(let _=0,x=m.length;_<x;_++){const S=m[_];g.push(S.toJSON(e.data))}g.length>0&&(a[h]=g,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const a=e.attributes;for(const m in a){const g=a[m];this.setAttribute(m,g.clone(t))}const l=e.morphAttributes;for(const m in l){const g=[],_=l[m];for(let x=0,S=_.length;x<S;x++)g.push(_[x].clone(t));this.morphAttributes[m]=g}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,g=f.length;m<g;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _m=new kt,jr=new fd,Ml=new Zl,xm=new Y,El=new Y,Tl=new Y,wl=new Y,tf=new Y,Al=new Y,ym=new Y,Rl=new Y;class Vt extends en{constructor(e=new Wn,t=new hd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const c=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,f=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const c=this.morphTargetInfluences;if(l&&c){Al.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const g=c[h],_=l[h];g!==0&&(tf.fromBufferAttribute(_,e),f?Al.addScaledVector(tf,g):Al.addScaledVector(tf.sub(t),g))}t.add(Al)}return t}raycast(e,t){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Ml.copy(r.boundingSphere),Ml.applyMatrix4(l),jr.copy(e.ray).recast(e.near),!(Ml.containsPoint(jr.origin)===!1&&(jr.intersectSphere(Ml,xm)===null||jr.origin.distanceToSquared(xm)>(e.far-e.near)**2))&&(_m.copy(l).invert(),jr.copy(e.ray).applyMatrix4(_m),!(r.boundingBox!==null&&jr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,jr)))}_computeIntersections(e,t,r){let a;const l=this.geometry,f=this.material,c=l.index,h=l.attributes.position,m=l.attributes.uv,g=l.attributes.uv1,_=l.attributes.normal,x=l.groups,S=l.drawRange;if(c!==null)if(Array.isArray(f))for(let E=0,w=x.length;E<w;E++){const y=x[E],v=f[y.materialIndex],I=Math.max(y.start,S.start),D=Math.min(c.count,Math.min(y.start+y.count,S.start+S.count));for(let C=I,q=D;C<q;C+=3){const O=c.getX(C),N=c.getX(C+1),V=c.getX(C+2);a=Cl(this,v,e,r,m,g,_,O,N,V),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const E=Math.max(0,S.start),w=Math.min(c.count,S.start+S.count);for(let y=E,v=w;y<v;y+=3){const I=c.getX(y),D=c.getX(y+1),C=c.getX(y+2);a=Cl(this,f,e,r,m,g,_,I,D,C),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}else if(h!==void 0)if(Array.isArray(f))for(let E=0,w=x.length;E<w;E++){const y=x[E],v=f[y.materialIndex],I=Math.max(y.start,S.start),D=Math.min(h.count,Math.min(y.start+y.count,S.start+S.count));for(let C=I,q=D;C<q;C+=3){const O=C,N=C+1,V=C+2;a=Cl(this,v,e,r,m,g,_,O,N,V),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const E=Math.max(0,S.start),w=Math.min(h.count,S.start+S.count);for(let y=E,v=w;y<v;y+=3){const I=y,D=y+1,C=y+2;a=Cl(this,f,e,r,m,g,_,I,D,C),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}}}function J_(s,e,t,r,a,l,f,c){let h;if(e.side===On?h=r.intersectTriangle(f,l,a,!0,c):h=r.intersectTriangle(a,l,f,e.side===Cr,c),h===null)return null;Rl.copy(c),Rl.applyMatrix4(s.matrixWorld);const m=t.ray.origin.distanceTo(Rl);return m<t.near||m>t.far?null:{distance:m,point:Rl.clone(),object:s}}function Cl(s,e,t,r,a,l,f,c,h,m){s.getVertexPosition(c,El),s.getVertexPosition(h,Tl),s.getVertexPosition(m,wl);const g=J_(s,e,t,r,El,Tl,wl,ym);if(g){const _=new Y;ni.getBarycoord(ym,El,Tl,wl,_),a&&(g.uv=ni.getInterpolatedAttribute(a,c,h,m,_,new pt)),l&&(g.uv1=ni.getInterpolatedAttribute(l,c,h,m,_,new pt)),f&&(g.normal=ni.getInterpolatedAttribute(f,c,h,m,_,new Y),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const x={a:c,b:h,c:m,normal:new Y,materialIndex:0};ni.getNormal(El,Tl,wl,x.normal),g.face=x,g.barycoord=_}return g}class Jt extends Wn{constructor(e=1,t=1,r=1,a=1,l=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:l,depthSegments:f};const c=this;a=Math.floor(a),l=Math.floor(l),f=Math.floor(f);const h=[],m=[],g=[],_=[];let x=0,S=0;E("z","y","x",-1,-1,r,t,e,f,l,0),E("z","y","x",1,-1,r,t,-e,f,l,1),E("x","z","y",1,1,e,r,t,a,f,2),E("x","z","y",1,-1,e,r,-t,a,f,3),E("x","y","z",1,-1,e,t,r,a,l,4),E("x","y","z",-1,-1,e,t,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new cn(m,3)),this.setAttribute("normal",new cn(g,3)),this.setAttribute("uv",new cn(_,2));function E(w,y,v,I,D,C,q,O,N,V,b){const R=C/N,k=q/V,ne=C/2,K=q/2,ae=O/2,ce=N+1,oe=V+1;let ue=0,z=0;const le=new Y;for(let se=0;se<oe;se++){const U=se*k-K;for(let ie=0;ie<ce;ie++){const De=ie*R-ne;le[w]=De*I,le[y]=U*D,le[v]=ae,m.push(le.x,le.y,le.z),le[w]=0,le[y]=0,le[v]=O>0?1:-1,g.push(le.x,le.y,le.z),_.push(ie/N),_.push(1-se/V),ue+=1}}for(let se=0;se<V;se++)for(let U=0;U<N;U++){const ie=x+U+ce*se,De=x+U+ce*(se+1),Q=x+(U+1)+ce*(se+1),fe=x+(U+1)+ce*se;h.push(ie,De,fe),h.push(De,Q,fe),z+=6}c.addGroup(S,z,b),S+=z,x+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function no(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const a=s[t][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone():Array.isArray(a)?e[t][r]=a.slice():e[t][r]=a}}return e}function An(s){const e={};for(let t=0;t<s.length;t++){const r=no(s[t]);for(const a in r)e[a]=r[a]}return e}function ex(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function bg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}const tx={clone:no,merge:An};var nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ix=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class br extends rs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nx,this.fragmentShader=ix,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=no(e.uniforms),this.uniformsGroups=ex(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const f=this.uniforms[a].value;f&&f.isTexture?t.uniforms[a]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?t.uniforms[a]={type:"c",value:f.getHex()}:f&&f.isVector2?t.uniforms[a]={type:"v2",value:f.toArray()}:f&&f.isVector3?t.uniforms[a]={type:"v3",value:f.toArray()}:f&&f.isVector4?t.uniforms[a]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?t.uniforms[a]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?t.uniforms[a]={type:"m4",value:f.toArray()}:t.uniforms[a]={value:f}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Pg extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=Yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Er=new Y,Sm=new pt,Mm=new pt;class ti extends Pg{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ta*2*Math.atan(Math.tan(Zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Er.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Er.x,Er.y).multiplyScalar(-e/Er.z),Er.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Er.x,Er.y).multiplyScalar(-e/Er.z)}getViewSize(e,t){return this.getViewBounds(e,Sm,Mm),t.subVectors(Mm,Sm)}setViewOffset(e,t,r,a,l,f){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zo*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,l=-.5*a;const f=this.view;if(this.view!==null&&this.view.enabled){const h=f.fullWidth,m=f.fullHeight;l+=f.offsetX*a/h,t-=f.offsetY*r/m,a*=f.width/h,r*=f.height/m}const c=this.filmOffset;c!==0&&(l+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bs=-90,Hs=1;class rx extends en{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new ti(Bs,Hs,e,t);a.layers=this.layers,this.add(a);const l=new ti(Bs,Hs,e,t);l.layers=this.layers,this.add(l);const f=new ti(Bs,Hs,e,t);f.layers=this.layers,this.add(f);const c=new ti(Bs,Hs,e,t);c.layers=this.layers,this.add(c);const h=new ti(Bs,Hs,e,t);h.layers=this.layers,this.add(h);const m=new ti(Bs,Hs,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,l,f,c,h]=t;for(const m of t)this.remove(m);if(e===Yi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Wl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,f,c,h,m,g]=this.children,_=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(t,l),e.setRenderTarget(r,1,a),e.render(t,f),e.setRenderTarget(r,2,a),e.render(t,c),e.setRenderTarget(r,3,a),e.render(t,h),e.setRenderTarget(r,4,a),e.render(t,m),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,a),e.render(t,g),e.setRenderTarget(_,x,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Lg extends Cn{constructor(e,t,r,a,l,f,c,h,m,g){e=e!==void 0?e:[],t=t!==void 0?t:Qs,super(e,t,r,a,l,f,c,h,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sx extends is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new Lg(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:wi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Jt(5,5,5),l=new br({name:"CubemapFromEquirect",uniforms:no(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:On,blending:Ar});l.uniforms.tEquirect.value=t;const f=new Vt(a,l),c=t.minFilter;return t.minFilter===ts&&(t.minFilter=wi),new rx(1,10,this).update(e,f),t.minFilter=c,f.geometry.dispose(),f.material.dispose(),this}clear(e,t,r,a){const l=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(t,r,a);e.setRenderTarget(l)}}const nf=new Y,ox=new Y,ax=new at;class Kr{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=nf.subVectors(r,t).cross(ox.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(nf),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||ax.getNormalMatrix(e),a=this.coplanarPoint(nf).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yr=new Zl,bl=new Y;class pd{constructor(e=new Kr,t=new Kr,r=new Kr,a=new Kr,l=new Kr,f=new Kr){this.planes=[e,t,r,a,l,f]}set(e,t,r,a,l,f){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(r),c[3].copy(a),c[4].copy(l),c[5].copy(f),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Yi){const r=this.planes,a=e.elements,l=a[0],f=a[1],c=a[2],h=a[3],m=a[4],g=a[5],_=a[6],x=a[7],S=a[8],E=a[9],w=a[10],y=a[11],v=a[12],I=a[13],D=a[14],C=a[15];if(r[0].setComponents(h-l,x-m,y-S,C-v).normalize(),r[1].setComponents(h+l,x+m,y+S,C+v).normalize(),r[2].setComponents(h+f,x+g,y+E,C+I).normalize(),r[3].setComponents(h-f,x-g,y-E,C-I).normalize(),r[4].setComponents(h-c,x-_,y-w,C-D).normalize(),t===Yi)r[5].setComponents(h+c,x+_,y+w,C+D).normalize();else if(t===Wl)r[5].setComponents(c,_,w,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yr)}intersectsSprite(e){return Yr.center.set(0,0,0),Yr.radius=.7071067811865476,Yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yr)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(bl.x=a.normal.x>0?e.max.x:e.min.x,bl.y=a.normal.y>0?e.max.y:e.min.y,bl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(bl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dg(){let s=null,e=!1,t=null,r=null;function a(l,f){t(l,f),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function lx(s){const e=new WeakMap;function t(c,h){const m=c.array,g=c.usage,_=m.byteLength,x=s.createBuffer();s.bindBuffer(h,x),s.bufferData(h,m,g),c.onUploadCallback();let S;if(m instanceof Float32Array)S=s.FLOAT;else if(m instanceof Uint16Array)c.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=s.SHORT;else if(m instanceof Uint32Array)S=s.UNSIGNED_INT;else if(m instanceof Int32Array)S=s.INT;else if(m instanceof Int8Array)S=s.BYTE;else if(m instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:c.version,size:_}}function r(c,h,m){const g=h.array,_=h.updateRanges;if(s.bindBuffer(m,c),_.length===0)s.bufferSubData(m,0,g);else{_.sort((S,E)=>S.start-E.start);let x=0;for(let S=1;S<_.length;S++){const E=_[x],w=_[S];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++x,_[x]=w)}_.length=x+1;for(let S=0,E=_.length;S<E;S++){const w=_[S];s.bufferSubData(m,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function l(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=e.get(c);h&&(s.deleteBuffer(h.buffer),e.delete(c))}function f(c,h){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const g=e.get(c);(!g||g.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const m=e.get(c);if(m===void 0)e.set(c,t(c,h));else if(m.version<c.version){if(m.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,c,h),m.version=c.version}}return{get:a,remove:l,update:f}}class io extends Wn{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const l=e/2,f=t/2,c=Math.floor(r),h=Math.floor(a),m=c+1,g=h+1,_=e/c,x=t/h,S=[],E=[],w=[],y=[];for(let v=0;v<g;v++){const I=v*x-f;for(let D=0;D<m;D++){const C=D*_-l;E.push(C,-I,0),w.push(0,0,1),y.push(D/c),y.push(1-v/h)}}for(let v=0;v<h;v++)for(let I=0;I<c;I++){const D=I+m*v,C=I+m*(v+1),q=I+1+m*(v+1),O=I+1+m*v;S.push(D,C,O),S.push(C,q,O)}this.setIndex(S),this.setAttribute("position",new cn(E,3)),this.setAttribute("normal",new cn(w,3)),this.setAttribute("uv",new cn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.width,e.height,e.widthSegments,e.heightSegments)}}var ux=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cx=`#ifdef USE_ALPHAHASH
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
#endif`,fx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,px=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mx=`#ifdef USE_AOMAP
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
#endif`,gx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vx=`#ifdef USE_BATCHING
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
#endif`,_x=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mx=`#ifdef USE_IRIDESCENCE
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
#endif`,Ex=`#ifdef USE_BUMPMAP
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
#endif`,Tx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Px=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Dx=`#define PI 3.141592653589793
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
} // validated`,Ix=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ux=`vec3 transformedNormal = objectNormal;
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
#endif`,Nx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ox=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hx=`#ifdef USE_ENVMAP
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
#endif`,Vx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gx=`#ifdef USE_ENVMAP
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
#endif`,Wx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,jx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$x=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kx=`#ifdef USE_GRADIENTMAP
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
}`,Zx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ey=`uniform bool receiveShadow;
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
#endif`,ty=`#ifdef USE_ENVMAP
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
#endif`,ny=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ry=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,oy=`PhysicalMaterial material;
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
#endif`,ay=`struct PhysicalMaterial {
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
}`,ly=`
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
#endif`,uy=`#if defined( RE_IndirectDiffuse )
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
#endif`,cy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,py=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,my=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_y=`#if defined( USE_POINTS_UV )
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
#endif`,xy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,My=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ey=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ty=`#ifdef USE_MORPHTARGETS
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
#endif`,wy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ay=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ry=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,by=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Py=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ly=`#ifdef USE_NORMALMAP
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
#endif`,Dy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Iy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Uy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ny=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Oy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ky=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,By=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yy=`float getShadowMask() {
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
}`,qy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$y=`#ifdef USE_SKINNING
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
#endif`,Ky=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zy=`#ifdef USE_SKINNING
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
#endif`,Qy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nS=`#ifdef USE_TRANSMISSION
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
#endif`,iS=`#ifdef USE_TRANSMISSION
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
#endif`,rS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uS=`uniform sampler2D t2D;
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
}`,cS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pS=`#include <common>
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
}`,mS=`#if DEPTH_PACKING == 3200
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
}`,gS=`#define DISTANCE
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
}`,vS=`#define DISTANCE
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
}`,_S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yS=`uniform float scale;
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
}`,SS=`uniform vec3 diffuse;
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
}`,MS=`#include <common>
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
}`,ES=`uniform vec3 diffuse;
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
}`,TS=`#define LAMBERT
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
}`,wS=`#define LAMBERT
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
}`,AS=`#define MATCAP
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
}`,RS=`#define MATCAP
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
}`,CS=`#define NORMAL
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
}`,bS=`#define NORMAL
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
}`,PS=`#define PHONG
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
}`,LS=`#define PHONG
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
}`,DS=`#define STANDARD
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
}`,IS=`#define STANDARD
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
}`,US=`#define TOON
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
}`,NS=`#define TOON
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
}`,FS=`uniform float size;
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
}`,OS=`uniform vec3 diffuse;
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
}`,kS=`#include <common>
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
}`,zS=`uniform vec3 color;
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
}`,BS=`uniform float rotation;
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
}`,HS=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:ux,alphahash_pars_fragment:cx,alphamap_fragment:fx,alphamap_pars_fragment:dx,alphatest_fragment:hx,alphatest_pars_fragment:px,aomap_fragment:mx,aomap_pars_fragment:gx,batching_pars_vertex:vx,batching_vertex:_x,begin_vertex:xx,beginnormal_vertex:yx,bsdfs:Sx,iridescence_fragment:Mx,bumpmap_pars_fragment:Ex,clipping_planes_fragment:Tx,clipping_planes_pars_fragment:wx,clipping_planes_pars_vertex:Ax,clipping_planes_vertex:Rx,color_fragment:Cx,color_pars_fragment:bx,color_pars_vertex:Px,color_vertex:Lx,common:Dx,cube_uv_reflection_fragment:Ix,defaultnormal_vertex:Ux,displacementmap_pars_vertex:Nx,displacementmap_vertex:Fx,emissivemap_fragment:Ox,emissivemap_pars_fragment:kx,colorspace_fragment:zx,colorspace_pars_fragment:Bx,envmap_fragment:Hx,envmap_common_pars_fragment:Vx,envmap_pars_fragment:Gx,envmap_pars_vertex:Wx,envmap_physical_pars_fragment:ty,envmap_vertex:Xx,fog_vertex:jx,fog_pars_vertex:Yx,fog_fragment:qx,fog_pars_fragment:$x,gradientmap_pars_fragment:Kx,lightmap_pars_fragment:Zx,lights_lambert_fragment:Qx,lights_lambert_pars_fragment:Jx,lights_pars_begin:ey,lights_toon_fragment:ny,lights_toon_pars_fragment:iy,lights_phong_fragment:ry,lights_phong_pars_fragment:sy,lights_physical_fragment:oy,lights_physical_pars_fragment:ay,lights_fragment_begin:ly,lights_fragment_maps:uy,lights_fragment_end:cy,logdepthbuf_fragment:fy,logdepthbuf_pars_fragment:dy,logdepthbuf_pars_vertex:hy,logdepthbuf_vertex:py,map_fragment:my,map_pars_fragment:gy,map_particle_fragment:vy,map_particle_pars_fragment:_y,metalnessmap_fragment:xy,metalnessmap_pars_fragment:yy,morphinstance_vertex:Sy,morphcolor_vertex:My,morphnormal_vertex:Ey,morphtarget_pars_vertex:Ty,morphtarget_vertex:wy,normal_fragment_begin:Ay,normal_fragment_maps:Ry,normal_pars_fragment:Cy,normal_pars_vertex:by,normal_vertex:Py,normalmap_pars_fragment:Ly,clearcoat_normal_fragment_begin:Dy,clearcoat_normal_fragment_maps:Iy,clearcoat_pars_fragment:Uy,iridescence_pars_fragment:Ny,opaque_fragment:Fy,packing:Oy,premultiplied_alpha_fragment:ky,project_vertex:zy,dithering_fragment:By,dithering_pars_fragment:Hy,roughnessmap_fragment:Vy,roughnessmap_pars_fragment:Gy,shadowmap_pars_fragment:Wy,shadowmap_pars_vertex:Xy,shadowmap_vertex:jy,shadowmask_pars_fragment:Yy,skinbase_vertex:qy,skinning_pars_vertex:$y,skinning_vertex:Ky,skinnormal_vertex:Zy,specularmap_fragment:Qy,specularmap_pars_fragment:Jy,tonemapping_fragment:eS,tonemapping_pars_fragment:tS,transmission_fragment:nS,transmission_pars_fragment:iS,uv_pars_fragment:rS,uv_pars_vertex:sS,uv_vertex:oS,worldpos_vertex:aS,background_vert:lS,background_frag:uS,backgroundCube_vert:cS,backgroundCube_frag:fS,cube_vert:dS,cube_frag:hS,depth_vert:pS,depth_frag:mS,distanceRGBA_vert:gS,distanceRGBA_frag:vS,equirect_vert:_S,equirect_frag:xS,linedashed_vert:yS,linedashed_frag:SS,meshbasic_vert:MS,meshbasic_frag:ES,meshlambert_vert:TS,meshlambert_frag:wS,meshmatcap_vert:AS,meshmatcap_frag:RS,meshnormal_vert:CS,meshnormal_frag:bS,meshphong_vert:PS,meshphong_frag:LS,meshphysical_vert:DS,meshphysical_frag:IS,meshtoon_vert:US,meshtoon_frag:NS,points_vert:FS,points_frag:OS,shadow_vert:kS,shadow_frag:zS,sprite_vert:BS,sprite_frag:HS},Ce={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new at}},envmap:{envMap:{value:null},envMapRotation:{value:new at},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new at}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new at}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new at},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new at},normalScale:{value:new pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new at},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new at}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new at}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new at}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0},uvTransform:{value:new at}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new at},alphaMap:{value:null},alphaMapTransform:{value:new at},alphaTest:{value:0}}},Ti={basic:{uniforms:An([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:An([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new ht(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:An([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:An([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:An([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new ht(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:An([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:An([Ce.points,Ce.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:An([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:An([Ce.common,Ce.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:An([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:An([Ce.sprite,Ce.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new at},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new at}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:An([Ce.common,Ce.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:An([Ce.lights,Ce.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};Ti.physical={uniforms:An([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new at},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new at},clearcoatNormalScale:{value:new pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new at},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new at},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new at},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new at},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new at},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new at},transmissionSamplerSize:{value:new pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new at},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new at},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new at},anisotropyVector:{value:new pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new at}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const Pl={r:0,b:0,g:0},qr=new Ai,VS=new kt;function GS(s,e,t,r,a,l,f){const c=new ht(0);let h=l===!0?0:1,m,g,_=null,x=0,S=null;function E(I){let D=I.isScene===!0?I.background:null;return D&&D.isTexture&&(D=(I.backgroundBlurriness>0?t:e).get(D)),D}function w(I){let D=!1;const C=E(I);C===null?v(c,h):C&&C.isColor&&(v(C,1),D=!0);const q=s.xr.getEnvironmentBlendMode();q==="additive"?r.buffers.color.setClear(0,0,0,1,f):q==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(s.autoClear||D)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(I,D){const C=E(D);C&&(C.isCubeTexture||C.mapping===$l)?(g===void 0&&(g=new Vt(new Jt(1,1,1),new br({name:"BackgroundCubeMaterial",uniforms:no(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(q,O,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(g)),qr.copy(D.backgroundRotation),qr.x*=-1,qr.y*=-1,qr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),g.material.uniforms.envMap.value=C,g.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(VS.makeRotationFromEuler(qr)),g.material.toneMapped=St.getTransfer(C.colorSpace)!==Lt,(_!==C||x!==C.version||S!==s.toneMapping)&&(g.material.needsUpdate=!0,_=C,x=C.version,S=s.toneMapping),g.layers.enableAll(),I.unshift(g,g.geometry,g.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new Vt(new io(2,2),new br({name:"BackgroundMaterial",uniforms:no(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Cr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,m.material.toneMapped=St.getTransfer(C.colorSpace)!==Lt,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(_!==C||x!==C.version||S!==s.toneMapping)&&(m.material.needsUpdate=!0,_=C,x=C.version,S=s.toneMapping),m.layers.enableAll(),I.unshift(m,m.geometry,m.material,0,0,null))}function v(I,D){I.getRGB(Pl,bg(s)),r.buffers.color.setClear(Pl.r,Pl.g,Pl.b,D,f)}return{getClearColor:function(){return c},setClearColor:function(I,D=1){c.set(I),h=D,v(c,h)},getClearAlpha:function(){return h},setClearAlpha:function(I){h=I,v(c,h)},render:w,addToRenderList:y}}function WS(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let l=a,f=!1;function c(R,k,ne,K,ae){let ce=!1;const oe=_(K,ne,k);l!==oe&&(l=oe,m(l.object)),ce=S(R,K,ne,ae),ce&&E(R,K,ne,ae),ae!==null&&e.update(ae,s.ELEMENT_ARRAY_BUFFER),(ce||f)&&(f=!1,C(R,k,ne,K),ae!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(ae).buffer))}function h(){return s.createVertexArray()}function m(R){return s.bindVertexArray(R)}function g(R){return s.deleteVertexArray(R)}function _(R,k,ne){const K=ne.wireframe===!0;let ae=r[R.id];ae===void 0&&(ae={},r[R.id]=ae);let ce=ae[k.id];ce===void 0&&(ce={},ae[k.id]=ce);let oe=ce[K];return oe===void 0&&(oe=x(h()),ce[K]=oe),oe}function x(R){const k=[],ne=[],K=[];for(let ae=0;ae<t;ae++)k[ae]=0,ne[ae]=0,K[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:ne,attributeDivisors:K,object:R,attributes:{},index:null}}function S(R,k,ne,K){const ae=l.attributes,ce=k.attributes;let oe=0;const ue=ne.getAttributes();for(const z in ue)if(ue[z].location>=0){const se=ae[z];let U=ce[z];if(U===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(U=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(U=R.instanceColor)),se===void 0||se.attribute!==U||U&&se.data!==U.data)return!0;oe++}return l.attributesNum!==oe||l.index!==K}function E(R,k,ne,K){const ae={},ce=k.attributes;let oe=0;const ue=ne.getAttributes();for(const z in ue)if(ue[z].location>=0){let se=ce[z];se===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(se=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(se=R.instanceColor));const U={};U.attribute=se,se&&se.data&&(U.data=se.data),ae[z]=U,oe++}l.attributes=ae,l.attributesNum=oe,l.index=K}function w(){const R=l.newAttributes;for(let k=0,ne=R.length;k<ne;k++)R[k]=0}function y(R){v(R,0)}function v(R,k){const ne=l.newAttributes,K=l.enabledAttributes,ae=l.attributeDivisors;ne[R]=1,K[R]===0&&(s.enableVertexAttribArray(R),K[R]=1),ae[R]!==k&&(s.vertexAttribDivisor(R,k),ae[R]=k)}function I(){const R=l.newAttributes,k=l.enabledAttributes;for(let ne=0,K=k.length;ne<K;ne++)k[ne]!==R[ne]&&(s.disableVertexAttribArray(ne),k[ne]=0)}function D(R,k,ne,K,ae,ce,oe){oe===!0?s.vertexAttribIPointer(R,k,ne,ae,ce):s.vertexAttribPointer(R,k,ne,K,ae,ce)}function C(R,k,ne,K){w();const ae=K.attributes,ce=ne.getAttributes(),oe=k.defaultAttributeValues;for(const ue in ce){const z=ce[ue];if(z.location>=0){let le=ae[ue];if(le===void 0&&(ue==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),ue==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const se=le.normalized,U=le.itemSize,ie=e.get(le);if(ie===void 0)continue;const De=ie.buffer,Q=ie.type,fe=ie.bytesPerElement,Me=Q===s.INT||Q===s.UNSIGNED_INT||le.gpuType===rd;if(le.isInterleavedBufferAttribute){const _e=le.data,we=_e.stride,Ie=le.offset;if(_e.isInstancedInterleavedBuffer){for(let Ze=0;Ze<z.locationSize;Ze++)v(z.location+Ze,_e.meshPerAttribute);R.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Ze=0;Ze<z.locationSize;Ze++)y(z.location+Ze);s.bindBuffer(s.ARRAY_BUFFER,De);for(let Ze=0;Ze<z.locationSize;Ze++)D(z.location+Ze,U/z.locationSize,Q,se,we*fe,(Ie+U/z.locationSize*Ze)*fe,Me)}else{if(le.isInstancedBufferAttribute){for(let _e=0;_e<z.locationSize;_e++)v(z.location+_e,le.meshPerAttribute);R.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let _e=0;_e<z.locationSize;_e++)y(z.location+_e);s.bindBuffer(s.ARRAY_BUFFER,De);for(let _e=0;_e<z.locationSize;_e++)D(z.location+_e,U/z.locationSize,Q,se,U*fe,U/z.locationSize*_e*fe,Me)}}else if(oe!==void 0){const se=oe[ue];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(z.location,se);break;case 3:s.vertexAttrib3fv(z.location,se);break;case 4:s.vertexAttrib4fv(z.location,se);break;default:s.vertexAttrib1fv(z.location,se)}}}}I()}function q(){V();for(const R in r){const k=r[R];for(const ne in k){const K=k[ne];for(const ae in K)g(K[ae].object),delete K[ae];delete k[ne]}delete r[R]}}function O(R){if(r[R.id]===void 0)return;const k=r[R.id];for(const ne in k){const K=k[ne];for(const ae in K)g(K[ae].object),delete K[ae];delete k[ne]}delete r[R.id]}function N(R){for(const k in r){const ne=r[k];if(ne[R.id]===void 0)continue;const K=ne[R.id];for(const ae in K)g(K[ae].object),delete K[ae];delete ne[R.id]}}function V(){b(),f=!0,l!==a&&(l=a,m(l.object))}function b(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:c,reset:V,resetDefaultState:b,dispose:q,releaseStatesOfGeometry:O,releaseStatesOfProgram:N,initAttributes:w,enableAttribute:y,disableUnusedAttributes:I}}function XS(s,e,t){let r;function a(m){r=m}function l(m,g){s.drawArrays(r,m,g),t.update(g,r,1)}function f(m,g,_){_!==0&&(s.drawArraysInstanced(r,m,g,_),t.update(g,r,_))}function c(m,g,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,g,0,_);let S=0;for(let E=0;E<_;E++)S+=g[E];t.update(S,r,1)}function h(m,g,_,x){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<m.length;E++)f(m[E],g[E],x[E]);else{S.multiDrawArraysInstancedWEBGL(r,m,0,g,0,x,0,_);let E=0;for(let w=0;w<_;w++)E+=g[w]*x[w];t.update(E,r,1)}}this.setMode=a,this.render=l,this.renderInstances=f,this.renderMultiDraw=c,this.renderMultiDrawInstances=h}function jS(s,e,t,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function f(N){return!(N!==mi&&r.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(N){const V=N===na&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==Ki&&r.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==ji&&!V)}function h(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const g=h(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=t.logarithmicDepthBuffer===!0,x=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),D=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),q=E>0,O=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:f,textureTypeReadable:c,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:I,maxVaryings:D,maxFragmentUniforms:C,vertexTextures:q,maxSamples:O}}function YS(s){const e=this;let t=null,r=0,a=!1,l=!1;const f=new Kr,c=new at,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const S=_.length!==0||x||r!==0||a;return a=x,r=_.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(_,x){t=g(_,x,0)},this.setState=function(_,x,S){const E=_.clippingPlanes,w=_.clipIntersection,y=_.clipShadows,v=s.get(_);if(!a||E===null||E.length===0||l&&!y)l?g(null):m();else{const I=l?0:r,D=I*4;let C=v.clippingState||null;h.value=C,C=g(E,x,D,S);for(let q=0;q!==D;++q)C[q]=t[q];v.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=I}};function m(){h.value!==t&&(h.value=t,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(_,x,S,E){const w=_!==null?_.length:0;let y=null;if(w!==0){if(y=h.value,E!==!0||y===null){const v=S+w*4,I=x.matrixWorldInverse;c.getNormalMatrix(I),(y===null||y.length<v)&&(y=new Float32Array(v));for(let D=0,C=S;D!==w;++D,C+=4)f.copy(_[D]).applyMatrix4(I,c),f.normal.toArray(y,C),y[C+3]=f.constant}h.value=y,h.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,y}}function qS(s){let e=new WeakMap;function t(f,c){return c===Ef?f.mapping=Qs:c===Tf&&(f.mapping=Js),f}function r(f){if(f&&f.isTexture){const c=f.mapping;if(c===Ef||c===Tf)if(e.has(f)){const h=e.get(f).texture;return t(h,f.mapping)}else{const h=f.image;if(h&&h.height>0){const m=new sx(h.height);return m.fromEquirectangularTexture(s,f),e.set(f,m),f.addEventListener("dispose",a),t(m.texture,f.mapping)}else return null}}return f}function a(f){const c=f.target;c.removeEventListener("dispose",a);const h=e.get(c);h!==void 0&&(e.delete(c),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class Ig extends Pg{constructor(e=-1,t=1,r=1,a=-1,l=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=l,this.far=f,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,l,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,f=r+e,c=a+t,h=a-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,f=l+m*this.view.width,c-=g*this.view.offsetY,h=c-g*this.view.height}this.projectionMatrix.makeOrthographic(l,f,c,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ys=4,Em=[.125,.215,.35,.446,.526,.582],Jr=20,rf=new Ig,Tm=new ht;let sf=null,of=0,af=0,lf=!1;const Zr=(1+Math.sqrt(5))/2,Vs=1/Zr,wm=[new Y(-Zr,Vs,0),new Y(Zr,Vs,0),new Y(-Vs,0,Zr),new Y(Vs,0,Zr),new Y(0,Zr,-Vs),new Y(0,Zr,Vs),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)];class Am{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,a=100){sf=this._renderer.getRenderTarget(),of=this._renderer.getActiveCubeFace(),af=this._renderer.getActiveMipmapLevel(),lf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sf,of,af),this._renderer.xr.enabled=lf,e.scissorTest=!1,Ll(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qs||e.mapping===Js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sf=this._renderer.getRenderTarget(),of=this._renderer.getActiveCubeFace(),af=this._renderer.getActiveMipmapLevel(),lf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:wi,minFilter:wi,generateMipmaps:!1,type:na,format:mi,colorSpace:ro,depthBuffer:!1},a=Rm(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rm(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$S(l)),this._blurMaterial=KS(l,e,t)}return a}_compileMaterial(e){const t=new Vt(this._lodPlanes[0],e);this._renderer.compile(t,rf)}_sceneToCubeUV(e,t,r,a){const c=new ti(90,1,t,r),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(Tm),g.toneMapping=Rr,g.autoClear=!1;const S=new hd({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1}),E=new Vt(new Jt,S);let w=!1;const y=e.background;y?y.isColor&&(S.color.copy(y),e.background=null,w=!0):(S.color.copy(Tm),w=!0);for(let v=0;v<6;v++){const I=v%3;I===0?(c.up.set(0,h[v],0),c.lookAt(m[v],0,0)):I===1?(c.up.set(0,0,h[v]),c.lookAt(0,m[v],0)):(c.up.set(0,h[v],0),c.lookAt(0,0,m[v]));const D=this._cubeSize;Ll(a,I*D,v>2?D:0,D,D),g.setRenderTarget(a),w&&g.render(E,c),g.render(e,c)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,e.background=y}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===Qs||e.mapping===Js;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=bm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cm());const l=a?this._cubemapMaterial:this._equirectMaterial,f=new Vt(this._lodPlanes[0],l),c=l.uniforms;c.envMap.value=e;const h=this._cubeSize;Ll(t,0,0,3*h,2*h),r.setRenderTarget(t),r.render(f,rf)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const f=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),c=wm[(a-l-1)%wm.length];this._blur(e,l-1,l,f,c)}t.autoClear=r}_blur(e,t,r,a,l){const f=this._pingPongRenderTarget;this._halfBlur(e,f,t,r,a,"latitudinal",l),this._halfBlur(f,e,r,r,a,"longitudinal",l)}_halfBlur(e,t,r,a,l,f,c){const h=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Vt(this._lodPlanes[a],m),x=m.uniforms,S=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Jr-1),w=l/E,y=isFinite(l)?1+Math.floor(g*w):Jr;y>Jr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Jr}`);const v=[];let I=0;for(let N=0;N<Jr;++N){const V=N/w,b=Math.exp(-V*V/2);v.push(b),N===0?I+=b:N<y&&(I+=2*b)}for(let N=0;N<v.length;N++)v[N]=v[N]/I;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=v,x.latitudinal.value=f==="latitudinal",c&&(x.poleAxis.value=c);const{_lodMax:D}=this;x.dTheta.value=E,x.mipInt.value=D-r;const C=this._sizeLods[a],q=3*C*(a>D-Ys?a-D+Ys:0),O=4*(this._cubeSize-C);Ll(t,q,O,3*C,2*C),h.setRenderTarget(t),h.render(_,rf)}}function $S(s){const e=[],t=[],r=[];let a=s;const l=s-Ys+1+Em.length;for(let f=0;f<l;f++){const c=Math.pow(2,a);t.push(c);let h=1/c;f>s-Ys?h=Em[f-s+Ys-1]:f===0&&(h=0),r.push(h);const m=1/(c-2),g=-m,_=1+m,x=[g,g,_,g,_,_,g,g,_,_,g,_],S=6,E=6,w=3,y=2,v=1,I=new Float32Array(w*E*S),D=new Float32Array(y*E*S),C=new Float32Array(v*E*S);for(let O=0;O<S;O++){const N=O%3*2/3-1,V=O>2?0:-1,b=[N,V,0,N+2/3,V,0,N+2/3,V+1,0,N,V,0,N+2/3,V+1,0,N,V+1,0];I.set(b,w*E*O),D.set(x,y*E*O);const R=[O,O,O,O,O,O];C.set(R,v*E*O)}const q=new Wn;q.setAttribute("position",new vi(I,w)),q.setAttribute("uv",new vi(D,y)),q.setAttribute("faceIndex",new vi(C,v)),e.push(q),a>Ys&&a--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Rm(s,e,t){const r=new is(s,e,t);return r.texture.mapping=$l,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ll(s,e,t,r,a){s.viewport.set(e,t,r,a),s.scissor.set(e,t,r,a)}function KS(s,e,t){const r=new Float32Array(Jr),a=new Y(0,1,0);return new br({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:md(),fragmentShader:`

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
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function Cm(){return new br({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:md(),fragmentShader:`

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
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function bm(){return new br({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:md(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function md(){return`

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
	`}function ZS(s){let e=new WeakMap,t=null;function r(c){if(c&&c.isTexture){const h=c.mapping,m=h===Ef||h===Tf,g=h===Qs||h===Js;if(m||g){let _=e.get(c);const x=_!==void 0?_.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==x)return t===null&&(t=new Am(s)),_=m?t.fromEquirectangular(c,_):t.fromCubemap(c,_),_.texture.pmremVersion=c.pmremVersion,e.set(c,_),_.texture;if(_!==void 0)return _.texture;{const S=c.image;return m&&S&&S.height>0||g&&S&&a(S)?(t===null&&(t=new Am(s)),_=m?t.fromEquirectangular(c):t.fromCubemap(c),_.texture.pmremVersion=c.pmremVersion,e.set(c,_),c.addEventListener("dispose",l),_.texture):null}}}return c}function a(c){let h=0;const m=6;for(let g=0;g<m;g++)c[g]!==void 0&&h++;return h===m}function l(c){const h=c.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function f(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:f}}function QS(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&$o("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function JS(s,e,t,r){const a={},l=new WeakMap;function f(_){const x=_.target;x.index!==null&&e.remove(x.index);for(const E in x.attributes)e.remove(x.attributes[E]);for(const E in x.morphAttributes){const w=x.morphAttributes[E];for(let y=0,v=w.length;y<v;y++)e.remove(w[y])}x.removeEventListener("dispose",f),delete a[x.id];const S=l.get(x);S&&(e.remove(S),l.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function c(_,x){return a[x.id]===!0||(x.addEventListener("dispose",f),a[x.id]=!0,t.memory.geometries++),x}function h(_){const x=_.attributes;for(const E in x)e.update(x[E],s.ARRAY_BUFFER);const S=_.morphAttributes;for(const E in S){const w=S[E];for(let y=0,v=w.length;y<v;y++)e.update(w[y],s.ARRAY_BUFFER)}}function m(_){const x=[],S=_.index,E=_.attributes.position;let w=0;if(S!==null){const I=S.array;w=S.version;for(let D=0,C=I.length;D<C;D+=3){const q=I[D+0],O=I[D+1],N=I[D+2];x.push(q,O,O,N,N,q)}}else if(E!==void 0){const I=E.array;w=E.version;for(let D=0,C=I.length/3-1;D<C;D+=3){const q=D+0,O=D+1,N=D+2;x.push(q,O,O,N,N,q)}}else return;const y=new(Eg(x)?Cg:Rg)(x,1);y.version=w;const v=l.get(_);v&&e.remove(v),l.set(_,y)}function g(_){const x=l.get(_);if(x){const S=_.index;S!==null&&x.version<S.version&&m(_)}else m(_);return l.get(_)}return{get:c,update:h,getWireframeAttribute:g}}function eM(s,e,t){let r;function a(x){r=x}let l,f;function c(x){l=x.type,f=x.bytesPerElement}function h(x,S){s.drawElements(r,S,l,x*f),t.update(S,r,1)}function m(x,S,E){E!==0&&(s.drawElementsInstanced(r,S,l,x*f,E),t.update(S,r,E))}function g(x,S,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,x,0,E);let y=0;for(let v=0;v<E;v++)y+=S[v];t.update(y,r,1)}function _(x,S,E,w){if(E===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let v=0;v<x.length;v++)m(x[v]/f,S[v],w[v]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,l,x,0,w,0,E);let v=0;for(let I=0;I<E;I++)v+=S[I]*w[I];t.update(v,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function tM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,f,c){switch(t.calls++,f){case s.TRIANGLES:t.triangles+=c*(l/3);break;case s.LINES:t.lines+=c*(l/2);break;case s.LINE_STRIP:t.lines+=c*(l-1);break;case s.LINE_LOOP:t.lines+=c*l;break;case s.POINTS:t.points+=c*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function nM(s,e,t){const r=new WeakMap,a=new Wt;function l(f,c,h){const m=f.morphTargetInfluences,g=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,_=g!==void 0?g.length:0;let x=r.get(c);if(x===void 0||x.count!==_){let R=function(){V.dispose(),r.delete(c),c.removeEventListener("dispose",R)};var S=R;x!==void 0&&x.texture.dispose();const E=c.morphAttributes.position!==void 0,w=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,v=c.morphAttributes.position||[],I=c.morphAttributes.normal||[],D=c.morphAttributes.color||[];let C=0;E===!0&&(C=1),w===!0&&(C=2),y===!0&&(C=3);let q=c.attributes.position.count*C,O=1;q>e.maxTextureSize&&(O=Math.ceil(q/e.maxTextureSize),q=e.maxTextureSize);const N=new Float32Array(q*O*4*_),V=new wg(N,q,O,_);V.type=ji,V.needsUpdate=!0;const b=C*4;for(let k=0;k<_;k++){const ne=v[k],K=I[k],ae=D[k],ce=q*O*4*k;for(let oe=0;oe<ne.count;oe++){const ue=oe*b;E===!0&&(a.fromBufferAttribute(ne,oe),N[ce+ue+0]=a.x,N[ce+ue+1]=a.y,N[ce+ue+2]=a.z,N[ce+ue+3]=0),w===!0&&(a.fromBufferAttribute(K,oe),N[ce+ue+4]=a.x,N[ce+ue+5]=a.y,N[ce+ue+6]=a.z,N[ce+ue+7]=0),y===!0&&(a.fromBufferAttribute(ae,oe),N[ce+ue+8]=a.x,N[ce+ue+9]=a.y,N[ce+ue+10]=a.z,N[ce+ue+11]=ae.itemSize===4?a.w:1)}}x={count:_,texture:V,size:new pt(q,O)},r.set(c,x),c.addEventListener("dispose",R)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",f.morphTexture,t);else{let E=0;for(let y=0;y<m.length;y++)E+=m[y];const w=c.morphTargetsRelative?1:1-E;h.getUniforms().setValue(s,"morphTargetBaseInfluence",w),h.getUniforms().setValue(s,"morphTargetInfluences",m)}h.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:l}}function iM(s,e,t,r){let a=new WeakMap;function l(h){const m=r.render.frame,g=h.geometry,_=e.get(h,g);if(a.get(_)!==m&&(e.update(_),a.set(_,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),a.get(h)!==m&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const x=h.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return _}function f(){a=new WeakMap}function c(h){const m=h.target;m.removeEventListener("dispose",c),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:l,dispose:f}}class Ug extends Cn{constructor(e,t,r,a,l,f,c,h,m,g=$s){if(g!==$s&&g!==to)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===$s&&(r=ns),r===void 0&&g===to&&(r=eo),super(null,a,l,f,c,h,g,r,m),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:gi,this.minFilter=h!==void 0?h:gi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ng=new Cn,Pm=new Ug(1,1),Fg=new wg,Og=new G_,kg=new Lg,Lm=[],Dm=[],Im=new Float32Array(16),Um=new Float32Array(9),Nm=new Float32Array(4);function oo(s,e,t){const r=s[0];if(r<=0||r>0)return s;const a=e*t;let l=Lm[a];if(l===void 0&&(l=new Float32Array(a),Lm[a]=l),e!==0){r.toArray(l,0);for(let f=1,c=0;f!==e;++f)c+=t,s[f].toArray(l,c)}return l}function tn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function nn(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function Ql(s,e){let t=Dm[e];t===void 0&&(t=new Int32Array(e),Dm[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function rM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function sM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2fv(this.addr,e),nn(t,e)}}function oM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;s.uniform3fv(this.addr,e),nn(t,e)}}function aM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4fv(this.addr,e),nn(t,e)}}function lM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(tn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,r))return;Nm.set(r),s.uniformMatrix2fv(this.addr,!1,Nm),nn(t,r)}}function uM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(tn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,r))return;Um.set(r),s.uniformMatrix3fv(this.addr,!1,Um),nn(t,r)}}function cM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(tn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,r))return;Im.set(r),s.uniformMatrix4fv(this.addr,!1,Im),nn(t,r)}}function fM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function dM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2iv(this.addr,e),nn(t,e)}}function hM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;s.uniform3iv(this.addr,e),nn(t,e)}}function pM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4iv(this.addr,e),nn(t,e)}}function mM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function gM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2uiv(this.addr,e),nn(t,e)}}function vM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;s.uniform3uiv(this.addr,e),nn(t,e)}}function _M(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4uiv(this.addr,e),nn(t,e)}}function xM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(Pm.compareFunction=Mg,l=Pm):l=Ng,t.setTexture2D(e||l,a)}function yM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||Og,a)}function SM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||kg,a)}function MM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||Fg,a)}function EM(s){switch(s){case 5126:return rM;case 35664:return sM;case 35665:return oM;case 35666:return aM;case 35674:return lM;case 35675:return uM;case 35676:return cM;case 5124:case 35670:return fM;case 35667:case 35671:return dM;case 35668:case 35672:return hM;case 35669:case 35673:return pM;case 5125:return mM;case 36294:return gM;case 36295:return vM;case 36296:return _M;case 35678:case 36198:case 36298:case 36306:case 35682:return xM;case 35679:case 36299:case 36307:return yM;case 35680:case 36300:case 36308:case 36293:return SM;case 36289:case 36303:case 36311:case 36292:return MM}}function TM(s,e){s.uniform1fv(this.addr,e)}function wM(s,e){const t=oo(e,this.size,2);s.uniform2fv(this.addr,t)}function AM(s,e){const t=oo(e,this.size,3);s.uniform3fv(this.addr,t)}function RM(s,e){const t=oo(e,this.size,4);s.uniform4fv(this.addr,t)}function CM(s,e){const t=oo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function bM(s,e){const t=oo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function PM(s,e){const t=oo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function LM(s,e){s.uniform1iv(this.addr,e)}function DM(s,e){s.uniform2iv(this.addr,e)}function IM(s,e){s.uniform3iv(this.addr,e)}function UM(s,e){s.uniform4iv(this.addr,e)}function NM(s,e){s.uniform1uiv(this.addr,e)}function FM(s,e){s.uniform2uiv(this.addr,e)}function OM(s,e){s.uniform3uiv(this.addr,e)}function kM(s,e){s.uniform4uiv(this.addr,e)}function zM(s,e,t){const r=this.cache,a=e.length,l=Ql(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let f=0;f!==a;++f)t.setTexture2D(e[f]||Ng,l[f])}function BM(s,e,t){const r=this.cache,a=e.length,l=Ql(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let f=0;f!==a;++f)t.setTexture3D(e[f]||Og,l[f])}function HM(s,e,t){const r=this.cache,a=e.length,l=Ql(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let f=0;f!==a;++f)t.setTextureCube(e[f]||kg,l[f])}function VM(s,e,t){const r=this.cache,a=e.length,l=Ql(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let f=0;f!==a;++f)t.setTexture2DArray(e[f]||Fg,l[f])}function GM(s){switch(s){case 5126:return TM;case 35664:return wM;case 35665:return AM;case 35666:return RM;case 35674:return CM;case 35675:return bM;case 35676:return PM;case 5124:case 35670:return LM;case 35667:case 35671:return DM;case 35668:case 35672:return IM;case 35669:case 35673:return UM;case 5125:return NM;case 36294:return FM;case 36295:return OM;case 36296:return kM;case 35678:case 36198:case 36298:case 36306:case 35682:return zM;case 35679:case 36299:case 36307:return BM;case 35680:case 36300:case 36308:case 36293:return HM;case 36289:case 36303:case 36311:case 36292:return VM}}class WM{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=EM(t.type)}}class XM{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=GM(t.type)}}class jM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let l=0,f=a.length;l!==f;++l){const c=a[l];c.setValue(e,t[c.id],r)}}}const uf=/(\w+)(\])?(\[|\.)?/g;function Fm(s,e){s.seq.push(e),s.map[e.id]=e}function YM(s,e,t){const r=s.name,a=r.length;for(uf.lastIndex=0;;){const l=uf.exec(r),f=uf.lastIndex;let c=l[1];const h=l[2]==="]",m=l[3];if(h&&(c=c|0),m===void 0||m==="["&&f+2===a){Fm(t,m===void 0?new WM(c,s,e):new XM(c,s,e));break}else{let _=t.map[c];_===void 0&&(_=new jM(c),Fm(t,_)),t=_}}}class Gl{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(t,a),f=e.getUniformLocation(t,l.name);YM(l,f,this)}}setValue(e,t,r,a){const l=this.map[t];l!==void 0&&l.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let l=0,f=t.length;l!==f;++l){const c=t[l],h=r[c.id];h.needsUpdate!==!1&&c.setValue(e,h.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,l=e.length;a!==l;++a){const f=e[a];f.id in t&&r.push(f)}return r}}function Om(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const qM=37297;let $M=0;function KM(s,e){const t=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let f=a;f<l;f++){const c=f+1;r.push(`${c===e?">":" "} ${c}: ${t[f]}`)}return r.join(`
`)}const km=new at;function ZM(s){St._getMatrix(km,St.workingColorSpace,s);const e=`mat3( ${km.elements.map(t=>t.toFixed(4))} )`;switch(St.getTransfer(s)){case Kl:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function zm(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const f=parseInt(l[1]);return t.toUpperCase()+`

`+a+`

`+KM(s.getShaderSource(e),f)}else return a}function QM(s,e){const t=ZM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function JM(s,e){let t;switch(e){case e_:t="Linear";break;case t_:t="Reinhard";break;case n_:t="Cineon";break;case i_:t="ACESFilmic";break;case s_:t="AgX";break;case o_:t="Neutral";break;case r_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Dl=new Y;function eE(){St.getLuminanceCoefficients(Dl);const s=Dl.x.toFixed(4),e=Dl.y.toFixed(4),t=Dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ko).join(`
`)}function nE(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function iE(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),f=l.name;let c=1;l.type===s.FLOAT_MAT2&&(c=2),l.type===s.FLOAT_MAT3&&(c=3),l.type===s.FLOAT_MAT4&&(c=4),t[f]={type:l.type,location:s.getAttribLocation(e,f),locationSize:c}}return t}function Ko(s){return s!==""}function Bm(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rE=/^[ \t]*#include +<([\w\d./]+)>/gm;function ed(s){return s.replace(rE,oE)}const sE=new Map;function oE(s,e){let t=lt[e];if(t===void 0){const r=sE.get(e);if(r!==void 0)t=lt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return ed(t)}const aE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vm(s){return s.replace(aE,lE)}function lE(s,e,t,r){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function Gm(s){let e=`precision ${s.precision} float;
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
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ag?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===lg?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function cE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Qs:case Js:e="ENVMAP_TYPE_CUBE";break;case $l:e="ENVMAP_TYPE_CUBE_UV";break}return e}function fE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Js:e="ENVMAP_MODE_REFRACTION";break}return e}function dE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ug:e="ENVMAP_BLENDING_MULTIPLY";break;case Q0:e="ENVMAP_BLENDING_MIX";break;case J0:e="ENVMAP_BLENDING_ADD";break}return e}function hE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function pE(s,e,t,r){const a=s.getContext(),l=t.defines;let f=t.vertexShader,c=t.fragmentShader;const h=uE(t),m=cE(t),g=fE(t),_=dE(t),x=hE(t),S=tE(t),E=nE(l),w=a.createProgram();let y,v,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Ko).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Ko).join(`
`),v.length>0&&(v+=`
`)):(y=[Gm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ko).join(`
`),v=[Gm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",t.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rr?"#define TONE_MAPPING":"",t.toneMapping!==Rr?lt.tonemapping_pars_fragment:"",t.toneMapping!==Rr?JM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,QM("linearToOutputTexel",t.outputColorSpace),eE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ko).join(`
`)),f=ed(f),f=Bm(f,t),f=Hm(f,t),c=ed(c),c=Bm(c,t),c=Hm(c,t),f=Vm(f),c=Vm(c),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",t.glslVersion===tm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===tm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const D=I+y+f,C=I+v+c,q=Om(a,a.VERTEX_SHADER,D),O=Om(a,a.FRAGMENT_SHADER,C);a.attachShader(w,q),a.attachShader(w,O),t.index0AttributeName!==void 0?a.bindAttribLocation(w,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function N(k){if(s.debug.checkShaderErrors){const ne=a.getProgramInfoLog(w).trim(),K=a.getShaderInfoLog(q).trim(),ae=a.getShaderInfoLog(O).trim();let ce=!0,oe=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(ce=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,w,q,O);else{const ue=zm(a,q,"vertex"),z=zm(a,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+ne+`
`+ue+`
`+z)}else ne!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ne):(K===""||ae==="")&&(oe=!1);oe&&(k.diagnostics={runnable:ce,programLog:ne,vertexShader:{log:K,prefix:y},fragmentShader:{log:ae,prefix:v}})}a.deleteShader(q),a.deleteShader(O),V=new Gl(a,w),b=iE(a,w)}let V;this.getUniforms=function(){return V===void 0&&N(this),V};let b;this.getAttributes=function(){return b===void 0&&N(this),b};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=a.getProgramParameter(w,qM)),R},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$M++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=q,this.fragmentShader=O,this}let mE=0;class gE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(t),l=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(l)===!1&&(f.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new vE(e),t.set(e,r)),r}}class vE{constructor(e){this.id=mE++,this.code=e,this.usedTimes=0}}function _E(s,e,t,r,a,l,f){const c=new dd,h=new gE,m=new Set,g=[],_=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(b){return m.add(b),b===0?"uv":`uv${b}`}function y(b,R,k,ne,K){const ae=ne.fog,ce=K.geometry,oe=b.isMeshStandardMaterial?ne.environment:null,ue=(b.isMeshStandardMaterial?t:e).get(b.envMap||oe),z=ue&&ue.mapping===$l?ue.image.height:null,le=E[b.type];b.precision!==null&&(S=a.getMaxPrecision(b.precision),S!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",S,"instead."));const se=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,U=se!==void 0?se.length:0;let ie=0;ce.morphAttributes.position!==void 0&&(ie=1),ce.morphAttributes.normal!==void 0&&(ie=2),ce.morphAttributes.color!==void 0&&(ie=3);let De,Q,fe,Me;if(le){const xt=Ti[le];De=xt.vertexShader,Q=xt.fragmentShader}else De=b.vertexShader,Q=b.fragmentShader,h.update(b),fe=h.getVertexShaderID(b),Me=h.getFragmentShaderID(b);const _e=s.getRenderTarget(),we=s.state.buffers.depth.getReversed(),Ie=K.isInstancedMesh===!0,Ze=K.isBatchedMesh===!0,Pt=!!b.map,gt=!!b.matcap,It=!!ue,X=!!b.aoMap,yn=!!b.lightMap,mt=!!b.bumpMap,ct=!!b.normalMap,qe=!!b.displacementMap,Rt=!!b.emissiveMap,Ye=!!b.metalnessMap,P=!!b.roughnessMap,T=b.anisotropy>0,Z=b.clearcoat>0,pe=b.dispersion>0,ge=b.iridescence>0,de=b.sheen>0,He=b.transmission>0,Ae=T&&!!b.anisotropyMap,Ue=Z&&!!b.clearcoatMap,ut=Z&&!!b.clearcoatNormalMap,ye=Z&&!!b.clearcoatRoughnessMap,Fe=ge&&!!b.iridescenceMap,Qe=ge&&!!b.iridescenceThicknessMap,Je=de&&!!b.sheenColorMap,Oe=de&&!!b.sheenRoughnessMap,ft=!!b.specularMap,rt=!!b.specularColorMap,At=!!b.specularIntensityMap,H=He&&!!b.transmissionMap,Re=He&&!!b.thicknessMap,re=!!b.gradientMap,he=!!b.alphaMap,Pe=b.alphaTest>0,be=!!b.alphaHash,st=!!b.extensions;let Nt=Rr;b.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(Nt=s.toneMapping);const $t={shaderID:le,shaderType:b.type,shaderName:b.name,vertexShader:De,fragmentShader:Q,defines:b.defines,customVertexShaderID:fe,customFragmentShaderID:Me,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:S,batching:Ze,batchingColor:Ze&&K._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&K.instanceColor!==null,instancingMorph:Ie&&K.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:ro,alphaToCoverage:!!b.alphaToCoverage,map:Pt,matcap:gt,envMap:It,envMapMode:It&&ue.mapping,envMapCubeUVHeight:z,aoMap:X,lightMap:yn,bumpMap:mt,normalMap:ct,displacementMap:x&&qe,emissiveMap:Rt,normalMapObjectSpace:ct&&b.normalMapType===c_,normalMapTangentSpace:ct&&b.normalMapType===Sg,metalnessMap:Ye,roughnessMap:P,anisotropy:T,anisotropyMap:Ae,clearcoat:Z,clearcoatMap:Ue,clearcoatNormalMap:ut,clearcoatRoughnessMap:ye,dispersion:pe,iridescence:ge,iridescenceMap:Fe,iridescenceThicknessMap:Qe,sheen:de,sheenColorMap:Je,sheenRoughnessMap:Oe,specularMap:ft,specularColorMap:rt,specularIntensityMap:At,transmission:He,transmissionMap:H,thicknessMap:Re,gradientMap:re,opaque:b.transparent===!1&&b.blending===qs&&b.alphaToCoverage===!1,alphaMap:he,alphaTest:Pe,alphaHash:be,combine:b.combine,mapUv:Pt&&w(b.map.channel),aoMapUv:X&&w(b.aoMap.channel),lightMapUv:yn&&w(b.lightMap.channel),bumpMapUv:mt&&w(b.bumpMap.channel),normalMapUv:ct&&w(b.normalMap.channel),displacementMapUv:qe&&w(b.displacementMap.channel),emissiveMapUv:Rt&&w(b.emissiveMap.channel),metalnessMapUv:Ye&&w(b.metalnessMap.channel),roughnessMapUv:P&&w(b.roughnessMap.channel),anisotropyMapUv:Ae&&w(b.anisotropyMap.channel),clearcoatMapUv:Ue&&w(b.clearcoatMap.channel),clearcoatNormalMapUv:ut&&w(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&w(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&w(b.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&w(b.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&w(b.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&w(b.sheenRoughnessMap.channel),specularMapUv:ft&&w(b.specularMap.channel),specularColorMapUv:rt&&w(b.specularColorMap.channel),specularIntensityMapUv:At&&w(b.specularIntensityMap.channel),transmissionMapUv:H&&w(b.transmissionMap.channel),thicknessMapUv:Re&&w(b.thicknessMap.channel),alphaMapUv:he&&w(b.alphaMap.channel),vertexTangents:!!ce.attributes.tangent&&(ct||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!ce.attributes.uv&&(Pt||he),fog:!!ae,useFog:b.fog===!0,fogExp2:!!ae&&ae.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:we,skinning:K.isSkinnedMesh===!0,morphTargets:ce.morphAttributes.position!==void 0,morphNormals:ce.morphAttributes.normal!==void 0,morphColors:ce.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:ie,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&k.length>0,shadowMapType:s.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Pt&&b.map.isVideoTexture===!0&&St.getTransfer(b.map.colorSpace)===Lt,decodeVideoTextureEmissive:Rt&&b.emissiveMap.isVideoTexture===!0&&St.getTransfer(b.emissiveMap.colorSpace)===Lt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Wi,flipSided:b.side===On,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:st&&b.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&b.extensions.multiDraw===!0||Ze)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return $t.vertexUv1s=m.has(1),$t.vertexUv2s=m.has(2),$t.vertexUv3s=m.has(3),m.clear(),$t}function v(b){const R=[];if(b.shaderID?R.push(b.shaderID):(R.push(b.customVertexShaderID),R.push(b.customFragmentShaderID)),b.defines!==void 0)for(const k in b.defines)R.push(k),R.push(b.defines[k]);return b.isRawShaderMaterial===!1&&(I(R,b),D(R,b),R.push(s.outputColorSpace)),R.push(b.customProgramCacheKey),R.join()}function I(b,R){b.push(R.precision),b.push(R.outputColorSpace),b.push(R.envMapMode),b.push(R.envMapCubeUVHeight),b.push(R.mapUv),b.push(R.alphaMapUv),b.push(R.lightMapUv),b.push(R.aoMapUv),b.push(R.bumpMapUv),b.push(R.normalMapUv),b.push(R.displacementMapUv),b.push(R.emissiveMapUv),b.push(R.metalnessMapUv),b.push(R.roughnessMapUv),b.push(R.anisotropyMapUv),b.push(R.clearcoatMapUv),b.push(R.clearcoatNormalMapUv),b.push(R.clearcoatRoughnessMapUv),b.push(R.iridescenceMapUv),b.push(R.iridescenceThicknessMapUv),b.push(R.sheenColorMapUv),b.push(R.sheenRoughnessMapUv),b.push(R.specularMapUv),b.push(R.specularColorMapUv),b.push(R.specularIntensityMapUv),b.push(R.transmissionMapUv),b.push(R.thicknessMapUv),b.push(R.combine),b.push(R.fogExp2),b.push(R.sizeAttenuation),b.push(R.morphTargetsCount),b.push(R.morphAttributeCount),b.push(R.numDirLights),b.push(R.numPointLights),b.push(R.numSpotLights),b.push(R.numSpotLightMaps),b.push(R.numHemiLights),b.push(R.numRectAreaLights),b.push(R.numDirLightShadows),b.push(R.numPointLightShadows),b.push(R.numSpotLightShadows),b.push(R.numSpotLightShadowsWithMaps),b.push(R.numLightProbes),b.push(R.shadowMapType),b.push(R.toneMapping),b.push(R.numClippingPlanes),b.push(R.numClipIntersection),b.push(R.depthPacking)}function D(b,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),R.dispersion&&c.enable(20),R.batchingColor&&c.enable(21),b.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.reverseDepthBuffer&&c.enable(4),R.skinning&&c.enable(5),R.morphTargets&&c.enable(6),R.morphNormals&&c.enable(7),R.morphColors&&c.enable(8),R.premultipliedAlpha&&c.enable(9),R.shadowMapEnabled&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.decodeVideoTextureEmissive&&c.enable(20),R.alphaToCoverage&&c.enable(21),b.push(c.mask)}function C(b){const R=E[b.type];let k;if(R){const ne=Ti[R];k=tx.clone(ne.uniforms)}else k=b.uniforms;return k}function q(b,R){let k;for(let ne=0,K=g.length;ne<K;ne++){const ae=g[ne];if(ae.cacheKey===R){k=ae,++k.usedTimes;break}}return k===void 0&&(k=new pE(s,R,b,l),g.push(k)),k}function O(b){if(--b.usedTimes===0){const R=g.indexOf(b);g[R]=g[g.length-1],g.pop(),b.destroy()}}function N(b){h.remove(b)}function V(){h.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:C,acquireProgram:q,releaseProgram:O,releaseShaderCache:N,programs:g,dispose:V}}function xE(){let s=new WeakMap;function e(f){return s.has(f)}function t(f){let c=s.get(f);return c===void 0&&(c={},s.set(f,c)),c}function r(f){s.delete(f)}function a(f,c,h){s.get(f)[c]=h}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:l}}function yE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Wm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Xm(){const s=[];let e=0;const t=[],r=[],a=[];function l(){e=0,t.length=0,r.length=0,a.length=0}function f(_,x,S,E,w,y){let v=s[e];return v===void 0?(v={id:_.id,object:_,geometry:x,material:S,groupOrder:E,renderOrder:_.renderOrder,z:w,group:y},s[e]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=S,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=w,v.group=y),e++,v}function c(_,x,S,E,w,y){const v=f(_,x,S,E,w,y);S.transmission>0?r.push(v):S.transparent===!0?a.push(v):t.push(v)}function h(_,x,S,E,w,y){const v=f(_,x,S,E,w,y);S.transmission>0?r.unshift(v):S.transparent===!0?a.unshift(v):t.unshift(v)}function m(_,x){t.length>1&&t.sort(_||yE),r.length>1&&r.sort(x||Wm),a.length>1&&a.sort(x||Wm)}function g(){for(let _=e,x=s.length;_<x;_++){const S=s[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:r,transparent:a,init:l,push:c,unshift:h,finish:g,sort:m}}function SE(){let s=new WeakMap;function e(r,a){const l=s.get(r);let f;return l===void 0?(f=new Xm,s.set(r,[f])):a>=l.length?(f=new Xm,l.push(f)):f=l[a],f}function t(){s=new WeakMap}return{get:e,dispose:t}}function ME(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new ht};break;case"SpotLight":t={position:new Y,direction:new Y,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return s[e.id]=t,t}}}function EE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let TE=0;function wE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function AE(s){const e=new ME,t=EE(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new Y);const a=new Y,l=new kt,f=new kt;function c(m){let g=0,_=0,x=0;for(let b=0;b<9;b++)r.probe[b].set(0,0,0);let S=0,E=0,w=0,y=0,v=0,I=0,D=0,C=0,q=0,O=0,N=0;m.sort(wE);for(let b=0,R=m.length;b<R;b++){const k=m[b],ne=k.color,K=k.intensity,ae=k.distance,ce=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)g+=ne.r*K,_+=ne.g*K,x+=ne.b*K;else if(k.isLightProbe){for(let oe=0;oe<9;oe++)r.probe[oe].addScaledVector(k.sh.coefficients[oe],K);N++}else if(k.isDirectionalLight){const oe=e.get(k);if(oe.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const ue=k.shadow,z=t.get(k);z.shadowIntensity=ue.intensity,z.shadowBias=ue.bias,z.shadowNormalBias=ue.normalBias,z.shadowRadius=ue.radius,z.shadowMapSize=ue.mapSize,r.directionalShadow[S]=z,r.directionalShadowMap[S]=ce,r.directionalShadowMatrix[S]=k.shadow.matrix,I++}r.directional[S]=oe,S++}else if(k.isSpotLight){const oe=e.get(k);oe.position.setFromMatrixPosition(k.matrixWorld),oe.color.copy(ne).multiplyScalar(K),oe.distance=ae,oe.coneCos=Math.cos(k.angle),oe.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),oe.decay=k.decay,r.spot[w]=oe;const ue=k.shadow;if(k.map&&(r.spotLightMap[q]=k.map,q++,ue.updateMatrices(k),k.castShadow&&O++),r.spotLightMatrix[w]=ue.matrix,k.castShadow){const z=t.get(k);z.shadowIntensity=ue.intensity,z.shadowBias=ue.bias,z.shadowNormalBias=ue.normalBias,z.shadowRadius=ue.radius,z.shadowMapSize=ue.mapSize,r.spotShadow[w]=z,r.spotShadowMap[w]=ce,C++}w++}else if(k.isRectAreaLight){const oe=e.get(k);oe.color.copy(ne).multiplyScalar(K),oe.halfWidth.set(k.width*.5,0,0),oe.halfHeight.set(0,k.height*.5,0),r.rectArea[y]=oe,y++}else if(k.isPointLight){const oe=e.get(k);if(oe.color.copy(k.color).multiplyScalar(k.intensity),oe.distance=k.distance,oe.decay=k.decay,k.castShadow){const ue=k.shadow,z=t.get(k);z.shadowIntensity=ue.intensity,z.shadowBias=ue.bias,z.shadowNormalBias=ue.normalBias,z.shadowRadius=ue.radius,z.shadowMapSize=ue.mapSize,z.shadowCameraNear=ue.camera.near,z.shadowCameraFar=ue.camera.far,r.pointShadow[E]=z,r.pointShadowMap[E]=ce,r.pointShadowMatrix[E]=k.shadow.matrix,D++}r.point[E]=oe,E++}else if(k.isHemisphereLight){const oe=e.get(k);oe.skyColor.copy(k.color).multiplyScalar(K),oe.groundColor.copy(k.groundColor).multiplyScalar(K),r.hemi[v]=oe,v++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ce.LTC_FLOAT_1,r.rectAreaLTC2=Ce.LTC_FLOAT_2):(r.rectAreaLTC1=Ce.LTC_HALF_1,r.rectAreaLTC2=Ce.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=_,r.ambient[2]=x;const V=r.hash;(V.directionalLength!==S||V.pointLength!==E||V.spotLength!==w||V.rectAreaLength!==y||V.hemiLength!==v||V.numDirectionalShadows!==I||V.numPointShadows!==D||V.numSpotShadows!==C||V.numSpotMaps!==q||V.numLightProbes!==N)&&(r.directional.length=S,r.spot.length=w,r.rectArea.length=y,r.point.length=E,r.hemi.length=v,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=C+q-O,r.spotLightMap.length=q,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=N,V.directionalLength=S,V.pointLength=E,V.spotLength=w,V.rectAreaLength=y,V.hemiLength=v,V.numDirectionalShadows=I,V.numPointShadows=D,V.numSpotShadows=C,V.numSpotMaps=q,V.numLightProbes=N,r.version=TE++)}function h(m,g){let _=0,x=0,S=0,E=0,w=0;const y=g.matrixWorldInverse;for(let v=0,I=m.length;v<I;v++){const D=m[v];if(D.isDirectionalLight){const C=r.directional[_];C.direction.setFromMatrixPosition(D.matrixWorld),a.setFromMatrixPosition(D.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(y),_++}else if(D.isSpotLight){const C=r.spot[S];C.position.setFromMatrixPosition(D.matrixWorld),C.position.applyMatrix4(y),C.direction.setFromMatrixPosition(D.matrixWorld),a.setFromMatrixPosition(D.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(y),S++}else if(D.isRectAreaLight){const C=r.rectArea[E];C.position.setFromMatrixPosition(D.matrixWorld),C.position.applyMatrix4(y),f.identity(),l.copy(D.matrixWorld),l.premultiply(y),f.extractRotation(l),C.halfWidth.set(D.width*.5,0,0),C.halfHeight.set(0,D.height*.5,0),C.halfWidth.applyMatrix4(f),C.halfHeight.applyMatrix4(f),E++}else if(D.isPointLight){const C=r.point[x];C.position.setFromMatrixPosition(D.matrixWorld),C.position.applyMatrix4(y),x++}else if(D.isHemisphereLight){const C=r.hemi[w];C.direction.setFromMatrixPosition(D.matrixWorld),C.direction.transformDirection(y),w++}}}return{setup:c,setupView:h,state:r}}function jm(s){const e=new AE(s),t=[],r=[];function a(g){m.camera=g,t.length=0,r.length=0}function l(g){t.push(g)}function f(g){r.push(g)}function c(){e.setup(t)}function h(g){e.setupView(t,g)}const m={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:c,setupLightsView:h,pushLight:l,pushShadow:f}}function RE(s){let e=new WeakMap;function t(a,l=0){const f=e.get(a);let c;return f===void 0?(c=new jm(s),e.set(a,[c])):l>=f.length?(c=new jm(s),f.push(c)):c=f[l],c}function r(){e=new WeakMap}return{get:t,dispose:r}}class CE extends rs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=l_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bE extends rs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const PE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LE=`uniform sampler2D shadow_pass;
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
}`;function DE(s,e,t){let r=new pd;const a=new pt,l=new pt,f=new Wt,c=new CE({depthPacking:u_}),h=new bE,m={},g=t.maxTextureSize,_={[Cr]:On,[On]:Cr,[Wi]:Wi},x=new br({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pt},radius:{value:4}},vertexShader:PE,fragmentShader:LE}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const E=new Wn;E.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Vt(E,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ag;let v=this.type;this.render=function(O,N,V){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||O.length===0)return;const b=s.getRenderTarget(),R=s.getActiveCubeFace(),k=s.getActiveMipmapLevel(),ne=s.state;ne.setBlending(Ar),ne.buffers.color.setClear(1,1,1,1),ne.buffers.depth.setTest(!0),ne.setScissorTest(!1);const K=v!==Gi&&this.type===Gi,ae=v===Gi&&this.type!==Gi;for(let ce=0,oe=O.length;ce<oe;ce++){const ue=O[ce],z=ue.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;a.copy(z.mapSize);const le=z.getFrameExtents();if(a.multiply(le),l.copy(z.mapSize),(a.x>g||a.y>g)&&(a.x>g&&(l.x=Math.floor(g/le.x),a.x=l.x*le.x,z.mapSize.x=l.x),a.y>g&&(l.y=Math.floor(g/le.y),a.y=l.y*le.y,z.mapSize.y=l.y)),z.map===null||K===!0||ae===!0){const U=this.type!==Gi?{minFilter:gi,magFilter:gi}:{};z.map!==null&&z.map.dispose(),z.map=new is(a.x,a.y,U),z.map.texture.name=ue.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const se=z.getViewportCount();for(let U=0;U<se;U++){const ie=z.getViewport(U);f.set(l.x*ie.x,l.y*ie.y,l.x*ie.z,l.y*ie.w),ne.viewport(f),z.updateMatrices(ue,U),r=z.getFrustum(),C(N,V,z.camera,ue,this.type)}z.isPointLightShadow!==!0&&this.type===Gi&&I(z,V),z.needsUpdate=!1}v=this.type,y.needsUpdate=!1,s.setRenderTarget(b,R,k)};function I(O,N){const V=e.update(w);x.defines.VSM_SAMPLES!==O.blurSamples&&(x.defines.VSM_SAMPLES=O.blurSamples,S.defines.VSM_SAMPLES=O.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new is(a.x,a.y)),x.uniforms.shadow_pass.value=O.map.texture,x.uniforms.resolution.value=O.mapSize,x.uniforms.radius.value=O.radius,s.setRenderTarget(O.mapPass),s.clear(),s.renderBufferDirect(N,null,V,x,w,null),S.uniforms.shadow_pass.value=O.mapPass.texture,S.uniforms.resolution.value=O.mapSize,S.uniforms.radius.value=O.radius,s.setRenderTarget(O.map),s.clear(),s.renderBufferDirect(N,null,V,S,w,null)}function D(O,N,V,b){let R=null;const k=V.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(k!==void 0)R=k;else if(R=V.isPointLight===!0?h:c,s.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const ne=R.uuid,K=N.uuid;let ae=m[ne];ae===void 0&&(ae={},m[ne]=ae);let ce=ae[K];ce===void 0&&(ce=R.clone(),ae[K]=ce,N.addEventListener("dispose",q)),R=ce}if(R.visible=N.visible,R.wireframe=N.wireframe,b===Gi?R.side=N.shadowSide!==null?N.shadowSide:N.side:R.side=N.shadowSide!==null?N.shadowSide:_[N.side],R.alphaMap=N.alphaMap,R.alphaTest=N.alphaTest,R.map=N.map,R.clipShadows=N.clipShadows,R.clippingPlanes=N.clippingPlanes,R.clipIntersection=N.clipIntersection,R.displacementMap=N.displacementMap,R.displacementScale=N.displacementScale,R.displacementBias=N.displacementBias,R.wireframeLinewidth=N.wireframeLinewidth,R.linewidth=N.linewidth,V.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const ne=s.properties.get(R);ne.light=V}return R}function C(O,N,V,b,R){if(O.visible===!1)return;if(O.layers.test(N.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===Gi)&&(!O.frustumCulled||r.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,O.matrixWorld);const K=e.update(O),ae=O.material;if(Array.isArray(ae)){const ce=K.groups;for(let oe=0,ue=ce.length;oe<ue;oe++){const z=ce[oe],le=ae[z.materialIndex];if(le&&le.visible){const se=D(O,le,b,R);O.onBeforeShadow(s,O,N,V,K,se,z),s.renderBufferDirect(V,null,K,se,O,z),O.onAfterShadow(s,O,N,V,K,se,z)}}}else if(ae.visible){const ce=D(O,ae,b,R);O.onBeforeShadow(s,O,N,V,K,ce,null),s.renderBufferDirect(V,null,K,ce,O,null),O.onAfterShadow(s,O,N,V,K,ce,null)}}const ne=O.children;for(let K=0,ae=ne.length;K<ae;K++)C(ne[K],N,V,b,R)}function q(O){O.target.removeEventListener("dispose",q);for(const V in m){const b=m[V],R=O.target.uuid;R in b&&(b[R].dispose(),delete b[R])}}}const IE={[gf]:vf,[_f]:Sf,[xf]:Mf,[Zs]:yf,[vf]:gf,[Sf]:_f,[Mf]:xf,[yf]:Zs};function UE(s,e){function t(){let H=!1;const Re=new Wt;let re=null;const he=new Wt(0,0,0,0);return{setMask:function(Pe){re!==Pe&&!H&&(s.colorMask(Pe,Pe,Pe,Pe),re=Pe)},setLocked:function(Pe){H=Pe},setClear:function(Pe,be,st,Nt,$t){$t===!0&&(Pe*=Nt,be*=Nt,st*=Nt),Re.set(Pe,be,st,Nt),he.equals(Re)===!1&&(s.clearColor(Pe,be,st,Nt),he.copy(Re))},reset:function(){H=!1,re=null,he.set(-1,0,0,0)}}}function r(){let H=!1,Re=!1,re=null,he=null,Pe=null;return{setReversed:function(be){if(Re!==be){const st=e.get("EXT_clip_control");Re?st.clipControlEXT(st.LOWER_LEFT_EXT,st.ZERO_TO_ONE_EXT):st.clipControlEXT(st.LOWER_LEFT_EXT,st.NEGATIVE_ONE_TO_ONE_EXT);const Nt=Pe;Pe=null,this.setClear(Nt)}Re=be},getReversed:function(){return Re},setTest:function(be){be?_e(s.DEPTH_TEST):we(s.DEPTH_TEST)},setMask:function(be){re!==be&&!H&&(s.depthMask(be),re=be)},setFunc:function(be){if(Re&&(be=IE[be]),he!==be){switch(be){case gf:s.depthFunc(s.NEVER);break;case vf:s.depthFunc(s.ALWAYS);break;case _f:s.depthFunc(s.LESS);break;case Zs:s.depthFunc(s.LEQUAL);break;case xf:s.depthFunc(s.EQUAL);break;case yf:s.depthFunc(s.GEQUAL);break;case Sf:s.depthFunc(s.GREATER);break;case Mf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}he=be}},setLocked:function(be){H=be},setClear:function(be){Pe!==be&&(Re&&(be=1-be),s.clearDepth(be),Pe=be)},reset:function(){H=!1,re=null,he=null,Pe=null,Re=!1}}}function a(){let H=!1,Re=null,re=null,he=null,Pe=null,be=null,st=null,Nt=null,$t=null;return{setTest:function(xt){H||(xt?_e(s.STENCIL_TEST):we(s.STENCIL_TEST))},setMask:function(xt){Re!==xt&&!H&&(s.stencilMask(xt),Re=xt)},setFunc:function(xt,bn,Sn){(re!==xt||he!==bn||Pe!==Sn)&&(s.stencilFunc(xt,bn,Sn),re=xt,he=bn,Pe=Sn)},setOp:function(xt,bn,Sn){(be!==xt||st!==bn||Nt!==Sn)&&(s.stencilOp(xt,bn,Sn),be=xt,st=bn,Nt=Sn)},setLocked:function(xt){H=xt},setClear:function(xt){$t!==xt&&(s.clearStencil(xt),$t=xt)},reset:function(){H=!1,Re=null,re=null,he=null,Pe=null,be=null,st=null,Nt=null,$t=null}}}const l=new t,f=new r,c=new a,h=new WeakMap,m=new WeakMap;let g={},_={},x=new WeakMap,S=[],E=null,w=!1,y=null,v=null,I=null,D=null,C=null,q=null,O=null,N=new ht(0,0,0),V=0,b=!1,R=null,k=null,ne=null,K=null,ae=null;const ce=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let oe=!1,ue=0;const z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(z)[1]),oe=ue>=1):z.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),oe=ue>=2);let le=null,se={};const U=s.getParameter(s.SCISSOR_BOX),ie=s.getParameter(s.VIEWPORT),De=new Wt().fromArray(U),Q=new Wt().fromArray(ie);function fe(H,Re,re,he){const Pe=new Uint8Array(4),be=s.createTexture();s.bindTexture(H,be),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let st=0;st<re;st++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(Re,0,s.RGBA,1,1,he,0,s.RGBA,s.UNSIGNED_BYTE,Pe):s.texImage2D(Re+st,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Pe);return be}const Me={};Me[s.TEXTURE_2D]=fe(s.TEXTURE_2D,s.TEXTURE_2D,1),Me[s.TEXTURE_CUBE_MAP]=fe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[s.TEXTURE_2D_ARRAY]=fe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Me[s.TEXTURE_3D]=fe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),f.setClear(1),c.setClear(0),_e(s.DEPTH_TEST),f.setFunc(Zs),mt(!1),ct(Kp),_e(s.CULL_FACE),X(Ar);function _e(H){g[H]!==!0&&(s.enable(H),g[H]=!0)}function we(H){g[H]!==!1&&(s.disable(H),g[H]=!1)}function Ie(H,Re){return _[H]!==Re?(s.bindFramebuffer(H,Re),_[H]=Re,H===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Re),H===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Re),!0):!1}function Ze(H,Re){let re=S,he=!1;if(H){re=x.get(Re),re===void 0&&(re=[],x.set(Re,re));const Pe=H.textures;if(re.length!==Pe.length||re[0]!==s.COLOR_ATTACHMENT0){for(let be=0,st=Pe.length;be<st;be++)re[be]=s.COLOR_ATTACHMENT0+be;re.length=Pe.length,he=!0}}else re[0]!==s.BACK&&(re[0]=s.BACK,he=!0);he&&s.drawBuffers(re)}function Pt(H){return E!==H?(s.useProgram(H),E=H,!0):!1}const gt={[Qr]:s.FUNC_ADD,[N0]:s.FUNC_SUBTRACT,[F0]:s.FUNC_REVERSE_SUBTRACT};gt[O0]=s.MIN,gt[k0]=s.MAX;const It={[z0]:s.ZERO,[B0]:s.ONE,[H0]:s.SRC_COLOR,[pf]:s.SRC_ALPHA,[Y0]:s.SRC_ALPHA_SATURATE,[X0]:s.DST_COLOR,[G0]:s.DST_ALPHA,[V0]:s.ONE_MINUS_SRC_COLOR,[mf]:s.ONE_MINUS_SRC_ALPHA,[j0]:s.ONE_MINUS_DST_COLOR,[W0]:s.ONE_MINUS_DST_ALPHA,[q0]:s.CONSTANT_COLOR,[$0]:s.ONE_MINUS_CONSTANT_COLOR,[K0]:s.CONSTANT_ALPHA,[Z0]:s.ONE_MINUS_CONSTANT_ALPHA};function X(H,Re,re,he,Pe,be,st,Nt,$t,xt){if(H===Ar){w===!0&&(we(s.BLEND),w=!1);return}if(w===!1&&(_e(s.BLEND),w=!0),H!==U0){if(H!==y||xt!==b){if((v!==Qr||C!==Qr)&&(s.blendEquation(s.FUNC_ADD),v=Qr,C=Qr),xt)switch(H){case qs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Zp:s.blendFunc(s.ONE,s.ONE);break;case Qp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Jp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case qs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Zp:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Qp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Jp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}I=null,D=null,q=null,O=null,N.set(0,0,0),V=0,y=H,b=xt}return}Pe=Pe||Re,be=be||re,st=st||he,(Re!==v||Pe!==C)&&(s.blendEquationSeparate(gt[Re],gt[Pe]),v=Re,C=Pe),(re!==I||he!==D||be!==q||st!==O)&&(s.blendFuncSeparate(It[re],It[he],It[be],It[st]),I=re,D=he,q=be,O=st),(Nt.equals(N)===!1||$t!==V)&&(s.blendColor(Nt.r,Nt.g,Nt.b,$t),N.copy(Nt),V=$t),y=H,b=!1}function yn(H,Re){H.side===Wi?we(s.CULL_FACE):_e(s.CULL_FACE);let re=H.side===On;Re&&(re=!re),mt(re),H.blending===qs&&H.transparent===!1?X(Ar):X(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),f.setFunc(H.depthFunc),f.setTest(H.depthTest),f.setMask(H.depthWrite),l.setMask(H.colorWrite);const he=H.stencilWrite;c.setTest(he),he&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Rt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?_e(s.SAMPLE_ALPHA_TO_COVERAGE):we(s.SAMPLE_ALPHA_TO_COVERAGE)}function mt(H){R!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),R=H)}function ct(H){H!==D0?(_e(s.CULL_FACE),H!==k&&(H===Kp?s.cullFace(s.BACK):H===I0?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):we(s.CULL_FACE),k=H}function qe(H){H!==ne&&(oe&&s.lineWidth(H),ne=H)}function Rt(H,Re,re){H?(_e(s.POLYGON_OFFSET_FILL),(K!==Re||ae!==re)&&(s.polygonOffset(Re,re),K=Re,ae=re)):we(s.POLYGON_OFFSET_FILL)}function Ye(H){H?_e(s.SCISSOR_TEST):we(s.SCISSOR_TEST)}function P(H){H===void 0&&(H=s.TEXTURE0+ce-1),le!==H&&(s.activeTexture(H),le=H)}function T(H,Re,re){re===void 0&&(le===null?re=s.TEXTURE0+ce-1:re=le);let he=se[re];he===void 0&&(he={type:void 0,texture:void 0},se[re]=he),(he.type!==H||he.texture!==Re)&&(le!==re&&(s.activeTexture(re),le=re),s.bindTexture(H,Re||Me[H]),he.type=H,he.texture=Re)}function Z(){const H=se[le];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function pe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ge(){try{s.compressedTexImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function de(){try{s.texSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function He(){try{s.texSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ae(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ue(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ut(){try{s.texStorage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ye(){try{s.texStorage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Fe(){try{s.texImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Qe(){try{s.texImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Je(H){De.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),De.copy(H))}function Oe(H){Q.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Q.copy(H))}function ft(H,Re){let re=m.get(Re);re===void 0&&(re=new WeakMap,m.set(Re,re));let he=re.get(H);he===void 0&&(he=s.getUniformBlockIndex(Re,H.name),re.set(H,he))}function rt(H,Re){const he=m.get(Re).get(H);h.get(Re)!==he&&(s.uniformBlockBinding(Re,he,H.__bindingPointIndex),h.set(Re,he))}function At(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),f.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),g={},le=null,se={},_={},x=new WeakMap,S=[],E=null,w=!1,y=null,v=null,I=null,D=null,C=null,q=null,O=null,N=new ht(0,0,0),V=0,b=!1,R=null,k=null,ne=null,K=null,ae=null,De.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),l.reset(),f.reset(),c.reset()}return{buffers:{color:l,depth:f,stencil:c},enable:_e,disable:we,bindFramebuffer:Ie,drawBuffers:Ze,useProgram:Pt,setBlending:X,setMaterial:yn,setFlipSided:mt,setCullFace:ct,setLineWidth:qe,setPolygonOffset:Rt,setScissorTest:Ye,activeTexture:P,bindTexture:T,unbindTexture:Z,compressedTexImage2D:pe,compressedTexImage3D:ge,texImage2D:Fe,texImage3D:Qe,updateUBOMapping:ft,uniformBlockBinding:rt,texStorage2D:ut,texStorage3D:ye,texSubImage2D:de,texSubImage3D:He,compressedTexSubImage2D:Ae,compressedTexSubImage3D:Ue,scissor:Je,viewport:Oe,reset:At}}function Ym(s,e,t,r){const a=NE(r);switch(t){case pg:return s*e;case gg:return s*e;case vg:return s*e*2;case _g:return s*e/a.components*a.byteLength;case ad:return s*e/a.components*a.byteLength;case xg:return s*e*2/a.components*a.byteLength;case ld:return s*e*2/a.components*a.byteLength;case mg:return s*e*3/a.components*a.byteLength;case mi:return s*e*4/a.components*a.byteLength;case ud:return s*e*4/a.components*a.byteLength;case kl:case zl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Bl:case Hl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cf:case Pf:return Math.max(s,16)*Math.max(e,8)/4;case Rf:case bf:return Math.max(s,8)*Math.max(e,8)/2;case Lf:case Df:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case If:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Uf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Nf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ff:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Of:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case kf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case zf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Bf:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Hf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Vf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Gf:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Wf:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Xf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case jf:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Yf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Vl:case qf:case $f:return Math.ceil(s/4)*Math.ceil(e/4)*16;case yg:case Kf:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Zf:case Qf:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function NE(s){switch(s){case Ki:case fg:return{byteLength:1,components:1};case ea:case dg:case na:return{byteLength:2,components:1};case sd:case od:return{byteLength:2,components:4};case ns:case rd:case ji:return{byteLength:4,components:1};case hg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function FE(s,e,t,r,a,l,f){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new pt,g=new WeakMap;let _;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(P,T){return S?new OffscreenCanvas(P,T):Xl("canvas")}function w(P,T,Z){let pe=1;const ge=Ye(P);if((ge.width>Z||ge.height>Z)&&(pe=Z/Math.max(ge.width,ge.height)),pe<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const de=Math.floor(pe*ge.width),He=Math.floor(pe*ge.height);_===void 0&&(_=E(de,He));const Ae=T?E(de,He):_;return Ae.width=de,Ae.height=He,Ae.getContext("2d").drawImage(P,0,0,de,He),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+de+"x"+He+")."),Ae}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),P;return P}function y(P){return P.generateMipmaps}function v(P){s.generateMipmap(P)}function I(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function D(P,T,Z,pe,ge=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let de=T;if(T===s.RED&&(Z===s.FLOAT&&(de=s.R32F),Z===s.HALF_FLOAT&&(de=s.R16F),Z===s.UNSIGNED_BYTE&&(de=s.R8)),T===s.RED_INTEGER&&(Z===s.UNSIGNED_BYTE&&(de=s.R8UI),Z===s.UNSIGNED_SHORT&&(de=s.R16UI),Z===s.UNSIGNED_INT&&(de=s.R32UI),Z===s.BYTE&&(de=s.R8I),Z===s.SHORT&&(de=s.R16I),Z===s.INT&&(de=s.R32I)),T===s.RG&&(Z===s.FLOAT&&(de=s.RG32F),Z===s.HALF_FLOAT&&(de=s.RG16F),Z===s.UNSIGNED_BYTE&&(de=s.RG8)),T===s.RG_INTEGER&&(Z===s.UNSIGNED_BYTE&&(de=s.RG8UI),Z===s.UNSIGNED_SHORT&&(de=s.RG16UI),Z===s.UNSIGNED_INT&&(de=s.RG32UI),Z===s.BYTE&&(de=s.RG8I),Z===s.SHORT&&(de=s.RG16I),Z===s.INT&&(de=s.RG32I)),T===s.RGB_INTEGER&&(Z===s.UNSIGNED_BYTE&&(de=s.RGB8UI),Z===s.UNSIGNED_SHORT&&(de=s.RGB16UI),Z===s.UNSIGNED_INT&&(de=s.RGB32UI),Z===s.BYTE&&(de=s.RGB8I),Z===s.SHORT&&(de=s.RGB16I),Z===s.INT&&(de=s.RGB32I)),T===s.RGBA_INTEGER&&(Z===s.UNSIGNED_BYTE&&(de=s.RGBA8UI),Z===s.UNSIGNED_SHORT&&(de=s.RGBA16UI),Z===s.UNSIGNED_INT&&(de=s.RGBA32UI),Z===s.BYTE&&(de=s.RGBA8I),Z===s.SHORT&&(de=s.RGBA16I),Z===s.INT&&(de=s.RGBA32I)),T===s.RGB&&Z===s.UNSIGNED_INT_5_9_9_9_REV&&(de=s.RGB9_E5),T===s.RGBA){const He=ge?Kl:St.getTransfer(pe);Z===s.FLOAT&&(de=s.RGBA32F),Z===s.HALF_FLOAT&&(de=s.RGBA16F),Z===s.UNSIGNED_BYTE&&(de=He===Lt?s.SRGB8_ALPHA8:s.RGBA8),Z===s.UNSIGNED_SHORT_4_4_4_4&&(de=s.RGBA4),Z===s.UNSIGNED_SHORT_5_5_5_1&&(de=s.RGB5_A1)}return(de===s.R16F||de===s.R32F||de===s.RG16F||de===s.RG32F||de===s.RGBA16F||de===s.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function C(P,T){let Z;return P?T===null||T===ns||T===eo?Z=s.DEPTH24_STENCIL8:T===ji?Z=s.DEPTH32F_STENCIL8:T===ea&&(Z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ns||T===eo?Z=s.DEPTH_COMPONENT24:T===ji?Z=s.DEPTH_COMPONENT32F:T===ea&&(Z=s.DEPTH_COMPONENT16),Z}function q(P,T){return y(P)===!0||P.isFramebufferTexture&&P.minFilter!==gi&&P.minFilter!==wi?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function O(P){const T=P.target;T.removeEventListener("dispose",O),V(T),T.isVideoTexture&&g.delete(T)}function N(P){const T=P.target;T.removeEventListener("dispose",N),R(T)}function V(P){const T=r.get(P);if(T.__webglInit===void 0)return;const Z=P.source,pe=x.get(Z);if(pe){const ge=pe[T.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&b(P),Object.keys(pe).length===0&&x.delete(Z)}r.remove(P)}function b(P){const T=r.get(P);s.deleteTexture(T.__webglTexture);const Z=P.source,pe=x.get(Z);delete pe[T.__cacheKey],f.memory.textures--}function R(P){const T=r.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),r.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(T.__webglFramebuffer[pe]))for(let ge=0;ge<T.__webglFramebuffer[pe].length;ge++)s.deleteFramebuffer(T.__webglFramebuffer[pe][ge]);else s.deleteFramebuffer(T.__webglFramebuffer[pe]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[pe])}else{if(Array.isArray(T.__webglFramebuffer))for(let pe=0;pe<T.__webglFramebuffer.length;pe++)s.deleteFramebuffer(T.__webglFramebuffer[pe]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let pe=0;pe<T.__webglColorRenderbuffer.length;pe++)T.__webglColorRenderbuffer[pe]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[pe]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Z=P.textures;for(let pe=0,ge=Z.length;pe<ge;pe++){const de=r.get(Z[pe]);de.__webglTexture&&(s.deleteTexture(de.__webglTexture),f.memory.textures--),r.remove(Z[pe])}r.remove(P)}let k=0;function ne(){k=0}function K(){const P=k;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),k+=1,P}function ae(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function ce(P,T){const Z=r.get(P);if(P.isVideoTexture&&qe(P),P.isRenderTargetTexture===!1&&P.version>0&&Z.__version!==P.version){const pe=P.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(Z,P,T);return}}t.bindTexture(s.TEXTURE_2D,Z.__webglTexture,s.TEXTURE0+T)}function oe(P,T){const Z=r.get(P);if(P.version>0&&Z.__version!==P.version){Q(Z,P,T);return}t.bindTexture(s.TEXTURE_2D_ARRAY,Z.__webglTexture,s.TEXTURE0+T)}function ue(P,T){const Z=r.get(P);if(P.version>0&&Z.__version!==P.version){Q(Z,P,T);return}t.bindTexture(s.TEXTURE_3D,Z.__webglTexture,s.TEXTURE0+T)}function z(P,T){const Z=r.get(P);if(P.version>0&&Z.__version!==P.version){fe(Z,P,T);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture,s.TEXTURE0+T)}const le={[wf]:s.REPEAT,[es]:s.CLAMP_TO_EDGE,[Af]:s.MIRRORED_REPEAT},se={[gi]:s.NEAREST,[a_]:s.NEAREST_MIPMAP_NEAREST,[dl]:s.NEAREST_MIPMAP_LINEAR,[wi]:s.LINEAR,[Fc]:s.LINEAR_MIPMAP_NEAREST,[ts]:s.LINEAR_MIPMAP_LINEAR},U={[f_]:s.NEVER,[v_]:s.ALWAYS,[d_]:s.LESS,[Mg]:s.LEQUAL,[h_]:s.EQUAL,[g_]:s.GEQUAL,[p_]:s.GREATER,[m_]:s.NOTEQUAL};function ie(P,T){if(T.type===ji&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===wi||T.magFilter===Fc||T.magFilter===dl||T.magFilter===ts||T.minFilter===wi||T.minFilter===Fc||T.minFilter===dl||T.minFilter===ts)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,le[T.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,le[T.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,le[T.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,se[T.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,se[T.minFilter]),T.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,U[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===gi||T.minFilter!==dl&&T.minFilter!==ts||T.type===ji&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const Z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,a.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function De(P,T){let Z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",O));const pe=T.source;let ge=x.get(pe);ge===void 0&&(ge={},x.set(pe,ge));const de=ae(T);if(de!==P.__cacheKey){ge[de]===void 0&&(ge[de]={texture:s.createTexture(),usedTimes:0},f.memory.textures++,Z=!0),ge[de].usedTimes++;const He=ge[P.__cacheKey];He!==void 0&&(ge[P.__cacheKey].usedTimes--,He.usedTimes===0&&b(T)),P.__cacheKey=de,P.__webglTexture=ge[de].texture}return Z}function Q(P,T,Z){let pe=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(pe=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(pe=s.TEXTURE_3D);const ge=De(P,T),de=T.source;t.bindTexture(pe,P.__webglTexture,s.TEXTURE0+Z);const He=r.get(de);if(de.version!==He.__version||ge===!0){t.activeTexture(s.TEXTURE0+Z);const Ae=St.getPrimaries(St.workingColorSpace),Ue=T.colorSpace===wr?null:St.getPrimaries(T.colorSpace),ut=T.colorSpace===wr||Ae===Ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let ye=w(T.image,!1,a.maxTextureSize);ye=Rt(T,ye);const Fe=l.convert(T.format,T.colorSpace),Qe=l.convert(T.type);let Je=D(T.internalFormat,Fe,Qe,T.colorSpace,T.isVideoTexture);ie(pe,T);let Oe;const ft=T.mipmaps,rt=T.isVideoTexture!==!0,At=He.__version===void 0||ge===!0,H=de.dataReady,Re=q(T,ye);if(T.isDepthTexture)Je=C(T.format===to,T.type),At&&(rt?t.texStorage2D(s.TEXTURE_2D,1,Je,ye.width,ye.height):t.texImage2D(s.TEXTURE_2D,0,Je,ye.width,ye.height,0,Fe,Qe,null));else if(T.isDataTexture)if(ft.length>0){rt&&At&&t.texStorage2D(s.TEXTURE_2D,Re,Je,ft[0].width,ft[0].height);for(let re=0,he=ft.length;re<he;re++)Oe=ft[re],rt?H&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,Oe.width,Oe.height,Fe,Qe,Oe.data):t.texImage2D(s.TEXTURE_2D,re,Je,Oe.width,Oe.height,0,Fe,Qe,Oe.data);T.generateMipmaps=!1}else rt?(At&&t.texStorage2D(s.TEXTURE_2D,Re,Je,ye.width,ye.height),H&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ye.width,ye.height,Fe,Qe,ye.data)):t.texImage2D(s.TEXTURE_2D,0,Je,ye.width,ye.height,0,Fe,Qe,ye.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){rt&&At&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Re,Je,ft[0].width,ft[0].height,ye.depth);for(let re=0,he=ft.length;re<he;re++)if(Oe=ft[re],T.format!==mi)if(Fe!==null)if(rt){if(H)if(T.layerUpdates.size>0){const Pe=Ym(Oe.width,Oe.height,T.format,T.type);for(const be of T.layerUpdates){const st=Oe.data.subarray(be*Pe/Oe.data.BYTES_PER_ELEMENT,(be+1)*Pe/Oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,be,Oe.width,Oe.height,1,Fe,st)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,Oe.width,Oe.height,ye.depth,Fe,Oe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,re,Je,Oe.width,Oe.height,ye.depth,0,Oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?H&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,Oe.width,Oe.height,ye.depth,Fe,Qe,Oe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,re,Je,Oe.width,Oe.height,ye.depth,0,Fe,Qe,Oe.data)}else{rt&&At&&t.texStorage2D(s.TEXTURE_2D,Re,Je,ft[0].width,ft[0].height);for(let re=0,he=ft.length;re<he;re++)Oe=ft[re],T.format!==mi?Fe!==null?rt?H&&t.compressedTexSubImage2D(s.TEXTURE_2D,re,0,0,Oe.width,Oe.height,Fe,Oe.data):t.compressedTexImage2D(s.TEXTURE_2D,re,Je,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?H&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,Oe.width,Oe.height,Fe,Qe,Oe.data):t.texImage2D(s.TEXTURE_2D,re,Je,Oe.width,Oe.height,0,Fe,Qe,Oe.data)}else if(T.isDataArrayTexture)if(rt){if(At&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Re,Je,ye.width,ye.height,ye.depth),H)if(T.layerUpdates.size>0){const re=Ym(ye.width,ye.height,T.format,T.type);for(const he of T.layerUpdates){const Pe=ye.data.subarray(he*re/ye.data.BYTES_PER_ELEMENT,(he+1)*re/ye.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,ye.width,ye.height,1,Fe,Qe,Pe)}T.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Fe,Qe,ye.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Je,ye.width,ye.height,ye.depth,0,Fe,Qe,ye.data);else if(T.isData3DTexture)rt?(At&&t.texStorage3D(s.TEXTURE_3D,Re,Je,ye.width,ye.height,ye.depth),H&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Fe,Qe,ye.data)):t.texImage3D(s.TEXTURE_3D,0,Je,ye.width,ye.height,ye.depth,0,Fe,Qe,ye.data);else if(T.isFramebufferTexture){if(At)if(rt)t.texStorage2D(s.TEXTURE_2D,Re,Je,ye.width,ye.height);else{let re=ye.width,he=ye.height;for(let Pe=0;Pe<Re;Pe++)t.texImage2D(s.TEXTURE_2D,Pe,Je,re,he,0,Fe,Qe,null),re>>=1,he>>=1}}else if(ft.length>0){if(rt&&At){const re=Ye(ft[0]);t.texStorage2D(s.TEXTURE_2D,Re,Je,re.width,re.height)}for(let re=0,he=ft.length;re<he;re++)Oe=ft[re],rt?H&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,Fe,Qe,Oe):t.texImage2D(s.TEXTURE_2D,re,Je,Fe,Qe,Oe);T.generateMipmaps=!1}else if(rt){if(At){const re=Ye(ye);t.texStorage2D(s.TEXTURE_2D,Re,Je,re.width,re.height)}H&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Fe,Qe,ye)}else t.texImage2D(s.TEXTURE_2D,0,Je,Fe,Qe,ye);y(T)&&v(pe),He.__version=de.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function fe(P,T,Z){if(T.image.length!==6)return;const pe=De(P,T),ge=T.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+Z);const de=r.get(ge);if(ge.version!==de.__version||pe===!0){t.activeTexture(s.TEXTURE0+Z);const He=St.getPrimaries(St.workingColorSpace),Ae=T.colorSpace===wr?null:St.getPrimaries(T.colorSpace),Ue=T.colorSpace===wr||He===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const ut=T.isCompressedTexture||T.image[0].isCompressedTexture,ye=T.image[0]&&T.image[0].isDataTexture,Fe=[];for(let he=0;he<6;he++)!ut&&!ye?Fe[he]=w(T.image[he],!0,a.maxCubemapSize):Fe[he]=ye?T.image[he].image:T.image[he],Fe[he]=Rt(T,Fe[he]);const Qe=Fe[0],Je=l.convert(T.format,T.colorSpace),Oe=l.convert(T.type),ft=D(T.internalFormat,Je,Oe,T.colorSpace),rt=T.isVideoTexture!==!0,At=de.__version===void 0||pe===!0,H=ge.dataReady;let Re=q(T,Qe);ie(s.TEXTURE_CUBE_MAP,T);let re;if(ut){rt&&At&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,ft,Qe.width,Qe.height);for(let he=0;he<6;he++){re=Fe[he].mipmaps;for(let Pe=0;Pe<re.length;Pe++){const be=re[Pe];T.format!==mi?Je!==null?rt?H&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe,0,0,be.width,be.height,Je,be.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe,ft,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):rt?H&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe,0,0,be.width,be.height,Je,Oe,be.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe,ft,be.width,be.height,0,Je,Oe,be.data)}}}else{if(re=T.mipmaps,rt&&At){re.length>0&&Re++;const he=Ye(Fe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,ft,he.width,he.height)}for(let he=0;he<6;he++)if(ye){rt?H&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Fe[he].width,Fe[he].height,Je,Oe,Fe[he].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ft,Fe[he].width,Fe[he].height,0,Je,Oe,Fe[he].data);for(let Pe=0;Pe<re.length;Pe++){const st=re[Pe].image[he].image;rt?H&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe+1,0,0,st.width,st.height,Je,Oe,st.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe+1,ft,st.width,st.height,0,Je,Oe,st.data)}}else{rt?H&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Je,Oe,Fe[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ft,Je,Oe,Fe[he]);for(let Pe=0;Pe<re.length;Pe++){const be=re[Pe];rt?H&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe+1,0,0,Je,Oe,be.image[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Pe+1,ft,Je,Oe,be.image[he])}}}y(T)&&v(s.TEXTURE_CUBE_MAP),de.__version=ge.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function Me(P,T,Z,pe,ge,de){const He=l.convert(Z.format,Z.colorSpace),Ae=l.convert(Z.type),Ue=D(Z.internalFormat,He,Ae,Z.colorSpace),ut=r.get(T),ye=r.get(Z);if(ye.__renderTarget=T,!ut.__hasExternalTextures){const Fe=Math.max(1,T.width>>de),Qe=Math.max(1,T.height>>de);ge===s.TEXTURE_3D||ge===s.TEXTURE_2D_ARRAY?t.texImage3D(ge,de,Ue,Fe,Qe,T.depth,0,He,Ae,null):t.texImage2D(ge,de,Ue,Fe,Qe,0,He,Ae,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),ct(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,ge,ye.__webglTexture,0,mt(T)):(ge===s.TEXTURE_2D||ge>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,pe,ge,ye.__webglTexture,de),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(P,T,Z){if(s.bindRenderbuffer(s.RENDERBUFFER,P),T.depthBuffer){const pe=T.depthTexture,ge=pe&&pe.isDepthTexture?pe.type:null,de=C(T.stencilBuffer,ge),He=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ae=mt(T);ct(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ae,de,T.width,T.height):Z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,de,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,de,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,He,s.RENDERBUFFER,P)}else{const pe=T.textures;for(let ge=0;ge<pe.length;ge++){const de=pe[ge],He=l.convert(de.format,de.colorSpace),Ae=l.convert(de.type),Ue=D(de.internalFormat,He,Ae,de.colorSpace),ut=mt(T);Z&&ct(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,Ue,T.width,T.height):ct(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,Ue,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Ue,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function we(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pe=r.get(T.depthTexture);pe.__renderTarget=T,(!pe.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ce(T.depthTexture,0);const ge=pe.__webglTexture,de=mt(T);if(T.depthTexture.format===$s)ct(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0,de):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ge,0);else if(T.depthTexture.format===to)ct(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0,de):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ge,0);else throw new Error("Unknown depthTexture format")}function Ie(P){const T=r.get(P),Z=P.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==P.depthTexture){const pe=P.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),pe){const ge=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,pe.removeEventListener("dispose",ge)};pe.addEventListener("dispose",ge),T.__depthDisposeCallback=ge}T.__boundDepthTexture=pe}if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");we(T.__webglFramebuffer,P)}else if(Z){T.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[pe]),T.__webglDepthbuffer[pe]===void 0)T.__webglDepthbuffer[pe]=s.createRenderbuffer(),_e(T.__webglDepthbuffer[pe],P,!1);else{const ge=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=T.__webglDepthbuffer[pe];s.bindRenderbuffer(s.RENDERBUFFER,de),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,de)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),_e(T.__webglDepthbuffer,P,!1);else{const pe=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,pe,s.RENDERBUFFER,ge)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ze(P,T,Z){const pe=r.get(P);T!==void 0&&Me(pe.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Z!==void 0&&Ie(P)}function Pt(P){const T=P.texture,Z=r.get(P),pe=r.get(T);P.addEventListener("dispose",N);const ge=P.textures,de=P.isWebGLCubeRenderTarget===!0,He=ge.length>1;if(He||(pe.__webglTexture===void 0&&(pe.__webglTexture=s.createTexture()),pe.__version=T.version,f.memory.textures++),de){Z.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(T.mipmaps&&T.mipmaps.length>0){Z.__webglFramebuffer[Ae]=[];for(let Ue=0;Ue<T.mipmaps.length;Ue++)Z.__webglFramebuffer[Ae][Ue]=s.createFramebuffer()}else Z.__webglFramebuffer[Ae]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Z.__webglFramebuffer=[];for(let Ae=0;Ae<T.mipmaps.length;Ae++)Z.__webglFramebuffer[Ae]=s.createFramebuffer()}else Z.__webglFramebuffer=s.createFramebuffer();if(He)for(let Ae=0,Ue=ge.length;Ae<Ue;Ae++){const ut=r.get(ge[Ae]);ut.__webglTexture===void 0&&(ut.__webglTexture=s.createTexture(),f.memory.textures++)}if(P.samples>0&&ct(P)===!1){Z.__webglMultisampledFramebuffer=s.createFramebuffer(),Z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let Ae=0;Ae<ge.length;Ae++){const Ue=ge[Ae];Z.__webglColorRenderbuffer[Ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Z.__webglColorRenderbuffer[Ae]);const ut=l.convert(Ue.format,Ue.colorSpace),ye=l.convert(Ue.type),Fe=D(Ue.internalFormat,ut,ye,Ue.colorSpace,P.isXRRenderTarget===!0),Qe=mt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,Fe,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,Z.__webglColorRenderbuffer[Ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(Z.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(Z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(de){t.bindTexture(s.TEXTURE_CUBE_MAP,pe.__webglTexture),ie(s.TEXTURE_CUBE_MAP,T);for(let Ae=0;Ae<6;Ae++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ue=0;Ue<T.mipmaps.length;Ue++)Me(Z.__webglFramebuffer[Ae][Ue],P,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Ue);else Me(Z.__webglFramebuffer[Ae],P,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);y(T)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(He){for(let Ae=0,Ue=ge.length;Ae<Ue;Ae++){const ut=ge[Ae],ye=r.get(ut);t.bindTexture(s.TEXTURE_2D,ye.__webglTexture),ie(s.TEXTURE_2D,ut),Me(Z.__webglFramebuffer,P,ut,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,0),y(ut)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let Ae=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ae=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ae,pe.__webglTexture),ie(Ae,T),T.mipmaps&&T.mipmaps.length>0)for(let Ue=0;Ue<T.mipmaps.length;Ue++)Me(Z.__webglFramebuffer[Ue],P,T,s.COLOR_ATTACHMENT0,Ae,Ue);else Me(Z.__webglFramebuffer,P,T,s.COLOR_ATTACHMENT0,Ae,0);y(T)&&v(Ae),t.unbindTexture()}P.depthBuffer&&Ie(P)}function gt(P){const T=P.textures;for(let Z=0,pe=T.length;Z<pe;Z++){const ge=T[Z];if(y(ge)){const de=I(P),He=r.get(ge).__webglTexture;t.bindTexture(de,He),v(de),t.unbindTexture()}}}const It=[],X=[];function yn(P){if(P.samples>0){if(ct(P)===!1){const T=P.textures,Z=P.width,pe=P.height;let ge=s.COLOR_BUFFER_BIT;const de=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,He=r.get(P),Ae=T.length>1;if(Ae)for(let Ue=0;Ue<T.length;Ue++)t.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,He.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglFramebuffer);for(let Ue=0;Ue<T.length;Ue++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ge|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ge|=s.STENCIL_BUFFER_BIT)),Ae){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,He.__webglColorRenderbuffer[Ue]);const ut=r.get(T[Ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ut,0)}s.blitFramebuffer(0,0,Z,pe,0,0,Z,pe,ge,s.NEAREST),h===!0&&(It.length=0,X.length=0,It.push(s.COLOR_ATTACHMENT0+Ue),P.depthBuffer&&P.resolveDepthBuffer===!1&&(It.push(de),X.push(de),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,X)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,It))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ae)for(let Ue=0;Ue<T.length;Ue++){t.bindFramebuffer(s.FRAMEBUFFER,He.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,He.__webglColorRenderbuffer[Ue]);const ut=r.get(T[Ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,He.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,ut,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,He.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&h){const T=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function mt(P){return Math.min(a.maxSamples,P.samples)}function ct(P){const T=r.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function qe(P){const T=f.render.frame;g.get(P)!==T&&(g.set(P,T),P.update())}function Rt(P,T){const Z=P.colorSpace,pe=P.format,ge=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Z!==ro&&Z!==wr&&(St.getTransfer(Z)===Lt?(pe!==mi||ge!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),T}function Ye(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(m.width=P.naturalWidth||P.width,m.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(m.width=P.displayWidth,m.height=P.displayHeight):(m.width=P.width,m.height=P.height),m}this.allocateTextureUnit=K,this.resetTextureUnits=ne,this.setTexture2D=ce,this.setTexture2DArray=oe,this.setTexture3D=ue,this.setTextureCube=z,this.rebindTextures=Ze,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=yn,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=ct}function OE(s,e){function t(r,a=wr){let l;const f=St.getTransfer(a);if(r===Ki)return s.UNSIGNED_BYTE;if(r===sd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===od)return s.UNSIGNED_SHORT_5_5_5_1;if(r===hg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===fg)return s.BYTE;if(r===dg)return s.SHORT;if(r===ea)return s.UNSIGNED_SHORT;if(r===rd)return s.INT;if(r===ns)return s.UNSIGNED_INT;if(r===ji)return s.FLOAT;if(r===na)return s.HALF_FLOAT;if(r===pg)return s.ALPHA;if(r===mg)return s.RGB;if(r===mi)return s.RGBA;if(r===gg)return s.LUMINANCE;if(r===vg)return s.LUMINANCE_ALPHA;if(r===$s)return s.DEPTH_COMPONENT;if(r===to)return s.DEPTH_STENCIL;if(r===_g)return s.RED;if(r===ad)return s.RED_INTEGER;if(r===xg)return s.RG;if(r===ld)return s.RG_INTEGER;if(r===ud)return s.RGBA_INTEGER;if(r===kl||r===zl||r===Bl||r===Hl)if(f===Lt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===kl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===zl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Bl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Hl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===kl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===zl)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Bl)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Hl)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Rf||r===Cf||r===bf||r===Pf)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===Rf)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Cf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===bf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Pf)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Lf||r===Df||r===If)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Lf||r===Df)return f===Lt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===If)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Uf||r===Nf||r===Ff||r===Of||r===kf||r===zf||r===Bf||r===Hf||r===Vf||r===Gf||r===Wf||r===Xf||r===jf||r===Yf)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Uf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Nf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ff)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Of)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===kf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===zf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Bf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Hf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Vf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Gf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Wf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Xf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===jf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Yf)return f===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Vl||r===qf||r===$f)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Vl)return f===Lt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===qf)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===$f)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===yg||r===Kf||r===Zf||r===Qf)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Vl)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Kf)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Zf)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Qf)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===eo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}class kE extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Xi extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zE={type:"move"};class cf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,l=null,f=null;const c=this._targetRay,h=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const w of e.hand.values()){const y=t.getJointPose(w,r),v=this._getHandJoint(m,w);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=g.position.distanceTo(_.position),S=.02,E=.005;m.inputState.pinching&&x>S+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));c!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(zE)))}return c!==null&&(c.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Xi;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const BE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,HE=`
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

}`;class VE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const a=new Cn,l=e.properties.get(a);l.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new br({vertexShader:BE,fragmentShader:HE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vt(new io(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class GE extends so{constructor(e,t){super();const r=this;let a=null,l=1,f=null,c="local-floor",h=1,m=null,g=null,_=null,x=null,S=null,E=null;const w=new VE,y=t.getContextAttributes();let v=null,I=null;const D=[],C=[],q=new pt;let O=null;const N=new ti;N.viewport=new Wt;const V=new ti;V.viewport=new Wt;const b=[N,V],R=new kE;let k=null,ne=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let fe=D[Q];return fe===void 0&&(fe=new cf,D[Q]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(Q){let fe=D[Q];return fe===void 0&&(fe=new cf,D[Q]=fe),fe.getGripSpace()},this.getHand=function(Q){let fe=D[Q];return fe===void 0&&(fe=new cf,D[Q]=fe),fe.getHandSpace()};function K(Q){const fe=C.indexOf(Q.inputSource);if(fe===-1)return;const Me=D[fe];Me!==void 0&&(Me.update(Q.inputSource,Q.frame,m||f),Me.dispatchEvent({type:Q.type,data:Q.inputSource}))}function ae(){a.removeEventListener("select",K),a.removeEventListener("selectstart",K),a.removeEventListener("selectend",K),a.removeEventListener("squeeze",K),a.removeEventListener("squeezestart",K),a.removeEventListener("squeezeend",K),a.removeEventListener("end",ae),a.removeEventListener("inputsourceschange",ce);for(let Q=0;Q<D.length;Q++){const fe=C[Q];fe!==null&&(C[Q]=null,D[Q].disconnect(fe))}k=null,ne=null,w.reset(),e.setRenderTarget(v),S=null,x=null,_=null,a=null,I=null,De.stop(),r.isPresenting=!1,e.setPixelRatio(O),e.setSize(q.width,q.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){l=Q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(Q){m=Q},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(Q){if(a=Q,a!==null){if(v=e.getRenderTarget(),a.addEventListener("select",K),a.addEventListener("selectstart",K),a.addEventListener("selectend",K),a.addEventListener("squeeze",K),a.addEventListener("squeezestart",K),a.addEventListener("squeezeend",K),a.addEventListener("end",ae),a.addEventListener("inputsourceschange",ce),y.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(q),a.renderState.layers===void 0){const fe={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,t,fe),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),I=new is(S.framebufferWidth,S.framebufferHeight,{format:mi,type:Ki,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let fe=null,Me=null,_e=null;y.depth&&(_e=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=y.stencil?to:$s,Me=y.stencil?eo:ns);const we={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:l};_=new XRWebGLBinding(a,t),x=_.createProjectionLayer(we),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),I=new is(x.textureWidth,x.textureHeight,{format:mi,type:Ki,depthTexture:new Ug(x.textureWidth,x.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(h),m=null,f=await a.requestReferenceSpace(c),De.setContext(a),De.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function ce(Q){for(let fe=0;fe<Q.removed.length;fe++){const Me=Q.removed[fe],_e=C.indexOf(Me);_e>=0&&(C[_e]=null,D[_e].disconnect(Me))}for(let fe=0;fe<Q.added.length;fe++){const Me=Q.added[fe];let _e=C.indexOf(Me);if(_e===-1){for(let Ie=0;Ie<D.length;Ie++)if(Ie>=C.length){C.push(Me),_e=Ie;break}else if(C[Ie]===null){C[Ie]=Me,_e=Ie;break}if(_e===-1)break}const we=D[_e];we&&we.connect(Me)}}const oe=new Y,ue=new Y;function z(Q,fe,Me){oe.setFromMatrixPosition(fe.matrixWorld),ue.setFromMatrixPosition(Me.matrixWorld);const _e=oe.distanceTo(ue),we=fe.projectionMatrix.elements,Ie=Me.projectionMatrix.elements,Ze=we[14]/(we[10]-1),Pt=we[14]/(we[10]+1),gt=(we[9]+1)/we[5],It=(we[9]-1)/we[5],X=(we[8]-1)/we[0],yn=(Ie[8]+1)/Ie[0],mt=Ze*X,ct=Ze*yn,qe=_e/(-X+yn),Rt=qe*-X;if(fe.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Rt),Q.translateZ(qe),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),we[10]===-1)Q.projectionMatrix.copy(fe.projectionMatrix),Q.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Ye=Ze+qe,P=Pt+qe,T=mt-Rt,Z=ct+(_e-Rt),pe=gt*Pt/P*Ye,ge=It*Pt/P*Ye;Q.projectionMatrix.makePerspective(T,Z,pe,ge,Ye,P),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function le(Q,fe){fe===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(fe.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(a===null)return;let fe=Q.near,Me=Q.far;w.texture!==null&&(w.depthNear>0&&(fe=w.depthNear),w.depthFar>0&&(Me=w.depthFar)),R.near=V.near=N.near=fe,R.far=V.far=N.far=Me,(k!==R.near||ne!==R.far)&&(a.updateRenderState({depthNear:R.near,depthFar:R.far}),k=R.near,ne=R.far),N.layers.mask=Q.layers.mask|2,V.layers.mask=Q.layers.mask|4,R.layers.mask=N.layers.mask|V.layers.mask;const _e=Q.parent,we=R.cameras;le(R,_e);for(let Ie=0;Ie<we.length;Ie++)le(we[Ie],_e);we.length===2?z(R,N,V):R.projectionMatrix.copy(N.projectionMatrix),se(Q,R,_e)};function se(Q,fe,Me){Me===null?Q.matrix.copy(fe.matrixWorld):(Q.matrix.copy(Me.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(fe.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(fe.projectionMatrix),Q.projectionMatrixInverse.copy(fe.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ta*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&S===null))return h},this.setFoveation=function(Q){h=Q,x!==null&&(x.fixedFoveation=Q),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Q)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(R)};let U=null;function ie(Q,fe){if(g=fe.getViewerPose(m||f),E=fe,g!==null){const Me=g.views;S!==null&&(e.setRenderTargetFramebuffer(I,S.framebuffer),e.setRenderTarget(I));let _e=!1;Me.length!==R.cameras.length&&(R.cameras.length=0,_e=!0);for(let Ie=0;Ie<Me.length;Ie++){const Ze=Me[Ie];let Pt=null;if(S!==null)Pt=S.getViewport(Ze);else{const It=_.getViewSubImage(x,Ze);Pt=It.viewport,Ie===0&&(e.setRenderTargetTextures(I,It.colorTexture,x.ignoreDepthValues?void 0:It.depthStencilTexture),e.setRenderTarget(I))}let gt=b[Ie];gt===void 0&&(gt=new ti,gt.layers.enable(Ie),gt.viewport=new Wt,b[Ie]=gt),gt.matrix.fromArray(Ze.transform.matrix),gt.matrix.decompose(gt.position,gt.quaternion,gt.scale),gt.projectionMatrix.fromArray(Ze.projectionMatrix),gt.projectionMatrixInverse.copy(gt.projectionMatrix).invert(),gt.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),Ie===0&&(R.matrix.copy(gt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),_e===!0&&R.cameras.push(gt)}const we=a.enabledFeatures;if(we&&we.includes("depth-sensing")){const Ie=_.getDepthInformation(Me[0]);Ie&&Ie.isValid&&Ie.texture&&w.init(e,Ie,a.renderState)}}for(let Me=0;Me<D.length;Me++){const _e=C[Me],we=D[Me];_e!==null&&we!==void 0&&we.update(_e,fe,m||f)}U&&U(Q,fe),fe.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:fe}),E=null}const De=new Dg;De.setAnimationLoop(ie),this.setAnimationLoop=function(Q){U=Q},this.dispose=function(){}}}const $r=new Ai,WE=new kt;function XE(s,e){function t(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function r(y,v){v.color.getRGB(y.fogColor.value,bg(s)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function a(y,v,I,D,C){v.isMeshBasicMaterial||v.isMeshLambertMaterial?l(y,v):v.isMeshToonMaterial?(l(y,v),_(y,v)):v.isMeshPhongMaterial?(l(y,v),g(y,v)):v.isMeshStandardMaterial?(l(y,v),x(y,v),v.isMeshPhysicalMaterial&&S(y,v,C)):v.isMeshMatcapMaterial?(l(y,v),E(y,v)):v.isMeshDepthMaterial?l(y,v):v.isMeshDistanceMaterial?(l(y,v),w(y,v)):v.isMeshNormalMaterial?l(y,v):v.isLineBasicMaterial?(f(y,v),v.isLineDashedMaterial&&c(y,v)):v.isPointsMaterial?h(y,v,I,D):v.isSpriteMaterial?m(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function l(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,t(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,t(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===On&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,t(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===On&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,t(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,t(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const I=e.get(v),D=I.envMap,C=I.envMapRotation;D&&(y.envMap.value=D,$r.copy(C),$r.x*=-1,$r.y*=-1,$r.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&($r.y*=-1,$r.z*=-1),y.envMapRotation.value.setFromMatrix4(WE.makeRotationFromEuler($r)),y.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,t(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,y.aoMapTransform))}function f(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,t(v.map,y.mapTransform))}function c(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function h(y,v,I,D){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*I,y.scale.value=D*.5,v.map&&(y.map.value=v.map,t(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function m(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,t(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function g(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function _(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function x(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function S(y,v,I){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===On&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,v){v.matcap&&(y.matcap.value=v.matcap)}function w(y,v){const I=e.get(v).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function jE(s,e,t,r){let a={},l={},f=[];const c=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(I,D){const C=D.program;r.uniformBlockBinding(I,C)}function m(I,D){let C=a[I.id];C===void 0&&(E(I),C=g(I),a[I.id]=C,I.addEventListener("dispose",y));const q=D.program;r.updateUBOMapping(I,q);const O=e.render.frame;l[I.id]!==O&&(x(I),l[I.id]=O)}function g(I){const D=_();I.__bindingPointIndex=D;const C=s.createBuffer(),q=I.__size,O=I.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,q,O),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,D,C),C}function _(){for(let I=0;I<c;I++)if(f.indexOf(I)===-1)return f.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const D=a[I.id],C=I.uniforms,q=I.__cache;s.bindBuffer(s.UNIFORM_BUFFER,D);for(let O=0,N=C.length;O<N;O++){const V=Array.isArray(C[O])?C[O]:[C[O]];for(let b=0,R=V.length;b<R;b++){const k=V[b];if(S(k,O,b,q)===!0){const ne=k.__offset,K=Array.isArray(k.value)?k.value:[k.value];let ae=0;for(let ce=0;ce<K.length;ce++){const oe=K[ce],ue=w(oe);typeof oe=="number"||typeof oe=="boolean"?(k.__data[0]=oe,s.bufferSubData(s.UNIFORM_BUFFER,ne+ae,k.__data)):oe.isMatrix3?(k.__data[0]=oe.elements[0],k.__data[1]=oe.elements[1],k.__data[2]=oe.elements[2],k.__data[3]=0,k.__data[4]=oe.elements[3],k.__data[5]=oe.elements[4],k.__data[6]=oe.elements[5],k.__data[7]=0,k.__data[8]=oe.elements[6],k.__data[9]=oe.elements[7],k.__data[10]=oe.elements[8],k.__data[11]=0):(oe.toArray(k.__data,ae),ae+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ne,k.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(I,D,C,q){const O=I.value,N=D+"_"+C;if(q[N]===void 0)return typeof O=="number"||typeof O=="boolean"?q[N]=O:q[N]=O.clone(),!0;{const V=q[N];if(typeof O=="number"||typeof O=="boolean"){if(V!==O)return q[N]=O,!0}else if(V.equals(O)===!1)return V.copy(O),!0}return!1}function E(I){const D=I.uniforms;let C=0;const q=16;for(let N=0,V=D.length;N<V;N++){const b=Array.isArray(D[N])?D[N]:[D[N]];for(let R=0,k=b.length;R<k;R++){const ne=b[R],K=Array.isArray(ne.value)?ne.value:[ne.value];for(let ae=0,ce=K.length;ae<ce;ae++){const oe=K[ae],ue=w(oe),z=C%q,le=z%ue.boundary,se=z+le;C+=le,se!==0&&q-se<ue.storage&&(C+=q-se),ne.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),ne.__offset=C,C+=ue.storage}}}const O=C%q;return O>0&&(C+=q-O),I.__size=C,I.__cache={},this}function w(I){const D={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(D.boundary=4,D.storage=4):I.isVector2?(D.boundary=8,D.storage=8):I.isVector3||I.isColor?(D.boundary=16,D.storage=12):I.isVector4?(D.boundary=16,D.storage=16):I.isMatrix3?(D.boundary=48,D.storage=48):I.isMatrix4?(D.boundary=64,D.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),D}function y(I){const D=I.target;D.removeEventListener("dispose",y);const C=f.indexOf(D.__bindingPointIndex);f.splice(C,1),s.deleteBuffer(a[D.id]),delete a[D.id],delete l[D.id]}function v(){for(const I in a)s.deleteBuffer(a[I]);f=[],a={},l={}}return{bind:h,update:m,dispose:v}}class YE{constructor(e={}){const{canvas:t=N_(),context:r=null,depth:a=!0,stencil:l=!1,alpha:f=!1,antialias:c=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=f;const E=new Uint32Array(4),w=new Int32Array(4);let y=null,v=null;const I=[],D=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ei,this.toneMapping=Rr,this.toneMappingExposure=1;const C=this;let q=!1,O=0,N=0,V=null,b=-1,R=null;const k=new Wt,ne=new Wt;let K=null;const ae=new ht(0);let ce=0,oe=t.width,ue=t.height,z=1,le=null,se=null;const U=new Wt(0,0,oe,ue),ie=new Wt(0,0,oe,ue);let De=!1;const Q=new pd;let fe=!1,Me=!1;const _e=new kt,we=new kt,Ie=new Y,Ze=new Wt,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function It(){return V===null?z:1}let X=r;function yn(A,G){return t.getContext(A,G)}try{const A={alpha:!0,depth:a,stencil:l,antialias:c,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${id}`),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",be,!1),X===null){const G="webgl2";if(X=yn(G,A),X===null)throw yn(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let mt,ct,qe,Rt,Ye,P,T,Z,pe,ge,de,He,Ae,Ue,ut,ye,Fe,Qe,Je,Oe,ft,rt,At,H;function Re(){mt=new QS(X),mt.init(),rt=new OE(X,mt),ct=new jS(X,mt,e,rt),qe=new UE(X,mt),ct.reverseDepthBuffer&&x&&qe.buffers.depth.setReversed(!0),Rt=new tM(X),Ye=new xE,P=new FE(X,mt,qe,Ye,ct,rt,Rt),T=new qS(C),Z=new ZS(C),pe=new lx(X),At=new WS(X,pe),ge=new JS(X,pe,Rt,At),de=new iM(X,ge,pe,Rt),Je=new nM(X,ct,P),ye=new YS(Ye),He=new _E(C,T,Z,mt,ct,At,ye),Ae=new XE(C,Ye),Ue=new SE,ut=new RE(mt),Qe=new GS(C,T,Z,qe,de,S,h),Fe=new DE(C,de,ct),H=new jE(X,Rt,ct,qe),Oe=new XS(X,mt,Rt),ft=new eM(X,mt,Rt),Rt.programs=He.programs,C.capabilities=ct,C.extensions=mt,C.properties=Ye,C.renderLists=Ue,C.shadowMap=Fe,C.state=qe,C.info=Rt}Re();const re=new GE(C,X);this.xr=re,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const A=mt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=mt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(A){A!==void 0&&(z=A,this.setSize(oe,ue,!1))},this.getSize=function(A){return A.set(oe,ue)},this.setSize=function(A,G,ee=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}oe=A,ue=G,t.width=Math.floor(A*z),t.height=Math.floor(G*z),ee===!0&&(t.style.width=A+"px",t.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(oe*z,ue*z).floor()},this.setDrawingBufferSize=function(A,G,ee){oe=A,ue=G,z=ee,t.width=Math.floor(A*ee),t.height=Math.floor(G*ee),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(k)},this.getViewport=function(A){return A.copy(U)},this.setViewport=function(A,G,ee,te){A.isVector4?U.set(A.x,A.y,A.z,A.w):U.set(A,G,ee,te),qe.viewport(k.copy(U).multiplyScalar(z).round())},this.getScissor=function(A){return A.copy(ie)},this.setScissor=function(A,G,ee,te){A.isVector4?ie.set(A.x,A.y,A.z,A.w):ie.set(A,G,ee,te),qe.scissor(ne.copy(ie).multiplyScalar(z).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(A){qe.setScissorTest(De=A)},this.setOpaqueSort=function(A){le=A},this.setTransparentSort=function(A){se=A},this.getClearColor=function(A){return A.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(A=!0,G=!0,ee=!0){let te=0;if(A){let W=!1;if(V!==null){const Te=V.texture.format;W=Te===ud||Te===ld||Te===ad}if(W){const Te=V.texture.type,Se=Te===Ki||Te===ns||Te===ea||Te===eo||Te===sd||Te===od,Ve=Qe.getClearColor(),ze=Qe.getClearAlpha(),tt=Ve.r,it=Ve.g,Ge=Ve.b;Se?(E[0]=tt,E[1]=it,E[2]=Ge,E[3]=ze,X.clearBufferuiv(X.COLOR,0,E)):(w[0]=tt,w[1]=it,w[2]=Ge,w[3]=ze,X.clearBufferiv(X.COLOR,0,w))}else te|=X.COLOR_BUFFER_BIT}G&&(te|=X.DEPTH_BUFFER_BIT),ee&&(te|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Ue.dispose(),ut.dispose(),Ye.dispose(),T.dispose(),Z.dispose(),de.dispose(),At.dispose(),H.dispose(),He.dispose(),re.dispose(),re.removeEventListener("sessionstart",ss),re.removeEventListener("sessionend",Zi),Ri.stop()};function he(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Pe(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const A=Rt.autoReset,G=Fe.enabled,ee=Fe.autoUpdate,te=Fe.needsUpdate,W=Fe.type;Re(),Rt.autoReset=A,Fe.enabled=G,Fe.autoUpdate=ee,Fe.needsUpdate=te,Fe.type=W}function be(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function st(A){const G=A.target;G.removeEventListener("dispose",st),Nt(G)}function Nt(A){$t(A),Ye.remove(A)}function $t(A){const G=Ye.get(A).programs;G!==void 0&&(G.forEach(function(ee){He.releaseProgram(ee)}),A.isShaderMaterial&&He.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,ee,te,W,Te){G===null&&(G=Pt);const Se=W.isMesh&&W.matrixWorld.determinant()<0,Ve=aa(A,G,ee,te,W);qe.setMaterial(te,Se);let ze=ee.index,tt=1;if(te.wireframe===!0){if(ze=ge.getWireframeAttribute(ee),ze===void 0)return;tt=2}const it=ee.drawRange,Ge=ee.attributes.position;let _t=it.start*tt,Tt=(it.start+it.count)*tt;Te!==null&&(_t=Math.max(_t,Te.start*tt),Tt=Math.min(Tt,(Te.start+Te.count)*tt)),ze!==null?(_t=Math.max(_t,0),Tt=Math.min(Tt,ze.count)):Ge!=null&&(_t=Math.max(_t,0),Tt=Math.min(Tt,Ge.count));const vt=Tt-_t;if(vt<0||vt===1/0)return;At.setup(W,te,Ve,ee,ze);let fn,ot=Oe;if(ze!==null&&(fn=pe.get(ze),ot=ft,ot.setIndex(fn)),W.isMesh)te.wireframe===!0?(qe.setLineWidth(te.wireframeLinewidth*It()),ot.setMode(X.LINES)):ot.setMode(X.TRIANGLES);else if(W.isLine){let je=te.linewidth;je===void 0&&(je=1),qe.setLineWidth(je*It()),W.isLineSegments?ot.setMode(X.LINES):W.isLineLoop?ot.setMode(X.LINE_LOOP):ot.setMode(X.LINE_STRIP)}else W.isPoints?ot.setMode(X.POINTS):W.isSprite&&ot.setMode(X.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ot.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(mt.get("WEBGL_multi_draw"))ot.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const je=W._multiDrawStarts,ii=W._multiDrawCounts,Mt=W._multiDrawCount,dn=ze?pe.get(ze).bytesPerElement:1,ri=Ye.get(te).currentProgram.getUniforms();for(let Kt=0;Kt<Mt;Kt++)ri.setValue(X,"_gl_DrawID",Kt),ot.render(je[Kt]/dn,ii[Kt])}else if(W.isInstancedMesh)ot.renderInstances(_t,vt,W.count);else if(ee.isInstancedBufferGeometry){const je=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,ii=Math.min(ee.instanceCount,je);ot.renderInstances(_t,vt,ii)}else ot.render(_t,vt)};function xt(A,G,ee){A.transparent===!0&&A.side===Wi&&A.forceSinglePass===!1?(A.side=On,A.needsUpdate=!0,os(A,G,ee),A.side=Cr,A.needsUpdate=!0,os(A,G,ee),A.side=Wi):os(A,G,ee)}this.compile=function(A,G,ee=null){ee===null&&(ee=A),v=ut.get(ee),v.init(G),D.push(v),ee.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),A!==ee&&A.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),v.setupLights();const te=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Te=W.material;if(Te)if(Array.isArray(Te))for(let Se=0;Se<Te.length;Se++){const Ve=Te[Se];xt(Ve,ee,W),te.add(Ve)}else xt(Te,ee,W),te.add(Te)}),D.pop(),v=null,te},this.compileAsync=function(A,G,ee=null){const te=this.compile(A,G,ee);return new Promise(W=>{function Te(){if(te.forEach(function(Se){Ye.get(Se).currentProgram.isReady()&&te.delete(Se)}),te.size===0){W(A);return}setTimeout(Te,10)}mt.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let bn=null;function Sn(A){bn&&bn(A)}function ss(){Ri.stop()}function Zi(){Ri.start()}const Ri=new Dg;Ri.setAnimationLoop(Sn),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(A){bn=A,re.setAnimationLoop(A),A===null?Ri.stop():Ri.start()},re.addEventListener("sessionstart",ss),re.addEventListener("sessionend",Zi),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(G),G=re.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,G,V),v=ut.get(A,D.length),v.init(G),D.push(v),we.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Q.setFromProjectionMatrix(we),Me=this.localClippingEnabled,fe=ye.init(this.clippingPlanes,Me),y=Ue.get(A,I.length),y.init(),I.push(y),re.enabled===!0&&re.isPresenting===!0){const Te=C.xr.getDepthSensingMesh();Te!==null&&Ci(Te,G,-1/0,C.sortObjects)}Ci(A,G,0,C.sortObjects),y.finish(),C.sortObjects===!0&&y.sort(le,se),gt=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,gt&&Qe.addToRenderList(y,A),this.info.render.frame++,fe===!0&&ye.beginShadows();const ee=v.state.shadowsArray;Fe.render(ee,A,G),fe===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=y.opaque,W=y.transmissive;if(v.setupLights(),G.isArrayCamera){const Te=G.cameras;if(W.length>0)for(let Se=0,Ve=Te.length;Se<Ve;Se++){const ze=Te[Se];Lr(te,W,A,ze)}gt&&Qe.render(A);for(let Se=0,Ve=Te.length;Se<Ve;Se++){const ze=Te[Se];Pr(y,A,ze,ze.viewport)}}else W.length>0&&Lr(te,W,A,G),gt&&Qe.render(A),Pr(y,A,G);V!==null&&(P.updateMultisampleRenderTarget(V),P.updateRenderTargetMipmap(V)),A.isScene===!0&&A.onAfterRender(C,A,G),At.resetDefaultState(),b=-1,R=null,D.pop(),D.length>0?(v=D[D.length-1],fe===!0&&ye.setGlobalState(C.clippingPlanes,v.state.camera)):v=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function Ci(A,G,ee,te){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)ee=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)v.pushLight(A),A.castShadow&&v.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Q.intersectsSprite(A)){te&&Ze.setFromMatrixPosition(A.matrixWorld).applyMatrix4(we);const Se=de.update(A),Ve=A.material;Ve.visible&&y.push(A,Se,Ve,ee,Ze.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Q.intersectsObject(A))){const Se=de.update(A),Ve=A.material;if(te&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ze.copy(A.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ze.copy(Se.boundingSphere.center)),Ze.applyMatrix4(A.matrixWorld).applyMatrix4(we)),Array.isArray(Ve)){const ze=Se.groups;for(let tt=0,it=ze.length;tt<it;tt++){const Ge=ze[tt],_t=Ve[Ge.materialIndex];_t&&_t.visible&&y.push(A,Se,_t,ee,Ze.z,Ge)}}else Ve.visible&&y.push(A,Se,Ve,ee,Ze.z,null)}}const Te=A.children;for(let Se=0,Ve=Te.length;Se<Ve;Se++)Ci(Te[Se],G,ee,te)}function Pr(A,G,ee,te){const W=A.opaque,Te=A.transmissive,Se=A.transparent;v.setupLightsView(ee),fe===!0&&ye.setGlobalState(C.clippingPlanes,ee),te&&qe.viewport(k.copy(te)),W.length>0&&Qi(W,G,ee),Te.length>0&&Qi(Te,G,ee),Se.length>0&&Qi(Se,G,ee),qe.buffers.depth.setTest(!0),qe.buffers.depth.setMask(!0),qe.buffers.color.setMask(!0),qe.setPolygonOffset(!1)}function Lr(A,G,ee,te){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[te.id]===void 0&&(v.state.transmissionRenderTarget[te.id]=new is(1,1,{generateMipmaps:!0,type:mt.has("EXT_color_buffer_half_float")||mt.has("EXT_color_buffer_float")?na:Ki,minFilter:ts,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:St.workingColorSpace}));const Te=v.state.transmissionRenderTarget[te.id],Se=te.viewport||k;Te.setSize(Se.z,Se.w);const Ve=C.getRenderTarget();C.setRenderTarget(Te),C.getClearColor(ae),ce=C.getClearAlpha(),ce<1&&C.setClearColor(16777215,.5),C.clear(),gt&&Qe.render(ee);const ze=C.toneMapping;C.toneMapping=Rr;const tt=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),v.setupLightsView(te),fe===!0&&ye.setGlobalState(C.clippingPlanes,te),Qi(A,ee,te),P.updateMultisampleRenderTarget(Te),P.updateRenderTargetMipmap(Te),mt.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Ge=0,_t=G.length;Ge<_t;Ge++){const Tt=G[Ge],vt=Tt.object,fn=Tt.geometry,ot=Tt.material,je=Tt.group;if(ot.side===Wi&&vt.layers.test(te.layers)){const ii=ot.side;ot.side=On,ot.needsUpdate=!0,sa(vt,ee,te,fn,ot,je),ot.side=ii,ot.needsUpdate=!0,it=!0}}it===!0&&(P.updateMultisampleRenderTarget(Te),P.updateRenderTargetMipmap(Te))}C.setRenderTarget(Ve),C.setClearColor(ae,ce),tt!==void 0&&(te.viewport=tt),C.toneMapping=ze}function Qi(A,G,ee){const te=G.isScene===!0?G.overrideMaterial:null;for(let W=0,Te=A.length;W<Te;W++){const Se=A[W],Ve=Se.object,ze=Se.geometry,tt=te===null?Se.material:te,it=Se.group;Ve.layers.test(ee.layers)&&sa(Ve,G,ee,ze,tt,it)}}function sa(A,G,ee,te,W,Te){A.onBeforeRender(C,G,ee,te,W,Te),A.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(C,G,ee,te,A,Te),W.transparent===!0&&W.side===Wi&&W.forceSinglePass===!1?(W.side=On,W.needsUpdate=!0,C.renderBufferDirect(ee,G,te,W,A,Te),W.side=Cr,W.needsUpdate=!0,C.renderBufferDirect(ee,G,te,W,A,Te),W.side=Wi):C.renderBufferDirect(ee,G,te,W,A,Te),A.onAfterRender(C,G,ee,te,W,Te)}function os(A,G,ee){G.isScene!==!0&&(G=Pt);const te=Ye.get(A),W=v.state.lights,Te=v.state.shadowsArray,Se=W.state.version,Ve=He.getParameters(A,W.state,Te,G,ee),ze=He.getProgramCacheKey(Ve);let tt=te.programs;te.environment=A.isMeshStandardMaterial?G.environment:null,te.fog=G.fog,te.envMap=(A.isMeshStandardMaterial?Z:T).get(A.envMap||te.environment),te.envMapRotation=te.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,tt===void 0&&(A.addEventListener("dispose",st),tt=new Map,te.programs=tt);let it=tt.get(ze);if(it!==void 0){if(te.currentProgram===it&&te.lightsStateVersion===Se)return _i(A,Ve),it}else Ve.uniforms=He.getUniforms(A),A.onBeforeCompile(Ve,C),it=He.acquireProgram(Ve,ze),tt.set(ze,it),te.uniforms=Ve.uniforms;const Ge=te.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ge.clippingPlanes=ye.uniform),_i(A,Ve),te.needsLights=Jl(A),te.lightsStateVersion=Se,te.needsLights&&(Ge.ambientLightColor.value=W.state.ambient,Ge.lightProbe.value=W.state.probe,Ge.directionalLights.value=W.state.directional,Ge.directionalLightShadows.value=W.state.directionalShadow,Ge.spotLights.value=W.state.spot,Ge.spotLightShadows.value=W.state.spotShadow,Ge.rectAreaLights.value=W.state.rectArea,Ge.ltc_1.value=W.state.rectAreaLTC1,Ge.ltc_2.value=W.state.rectAreaLTC2,Ge.pointLights.value=W.state.point,Ge.pointLightShadows.value=W.state.pointShadow,Ge.hemisphereLights.value=W.state.hemi,Ge.directionalShadowMap.value=W.state.directionalShadowMap,Ge.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ge.spotShadowMap.value=W.state.spotShadowMap,Ge.spotLightMatrix.value=W.state.spotLightMatrix,Ge.spotLightMap.value=W.state.spotLightMap,Ge.pointShadowMap.value=W.state.pointShadowMap,Ge.pointShadowMatrix.value=W.state.pointShadowMatrix),te.currentProgram=it,te.uniformsList=null,it}function oa(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=Gl.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function _i(A,G){const ee=Ye.get(A);ee.outputColorSpace=G.outputColorSpace,ee.batching=G.batching,ee.batchingColor=G.batchingColor,ee.instancing=G.instancing,ee.instancingColor=G.instancingColor,ee.instancingMorph=G.instancingMorph,ee.skinning=G.skinning,ee.morphTargets=G.morphTargets,ee.morphNormals=G.morphNormals,ee.morphColors=G.morphColors,ee.morphTargetsCount=G.morphTargetsCount,ee.numClippingPlanes=G.numClippingPlanes,ee.numIntersection=G.numClipIntersection,ee.vertexAlphas=G.vertexAlphas,ee.vertexTangents=G.vertexTangents,ee.toneMapping=G.toneMapping}function aa(A,G,ee,te,W){G.isScene!==!0&&(G=Pt),P.resetTextureUnits();const Te=G.fog,Se=te.isMeshStandardMaterial?G.environment:null,Ve=V===null?C.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:ro,ze=(te.isMeshStandardMaterial?Z:T).get(te.envMap||Se),tt=te.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,it=!!ee.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Ge=!!ee.morphAttributes.position,_t=!!ee.morphAttributes.normal,Tt=!!ee.morphAttributes.color;let vt=Rr;te.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(vt=C.toneMapping);const fn=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,ot=fn!==void 0?fn.length:0,je=Ye.get(te),ii=v.state.lights;if(fe===!0&&(Me===!0||A!==R)){const Mn=A===R&&te.id===b;ye.setState(te,A,Mn)}let Mt=!1;te.version===je.__version?(je.needsLights&&je.lightsStateVersion!==ii.state.version||je.outputColorSpace!==Ve||W.isBatchedMesh&&je.batching===!1||!W.isBatchedMesh&&je.batching===!0||W.isBatchedMesh&&je.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&je.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&je.instancing===!1||!W.isInstancedMesh&&je.instancing===!0||W.isSkinnedMesh&&je.skinning===!1||!W.isSkinnedMesh&&je.skinning===!0||W.isInstancedMesh&&je.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&je.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&je.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&je.instancingMorph===!1&&W.morphTexture!==null||je.envMap!==ze||te.fog===!0&&je.fog!==Te||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ye.numPlanes||je.numIntersection!==ye.numIntersection)||je.vertexAlphas!==tt||je.vertexTangents!==it||je.morphTargets!==Ge||je.morphNormals!==_t||je.morphColors!==Tt||je.toneMapping!==vt||je.morphTargetsCount!==ot)&&(Mt=!0):(Mt=!0,je.__version=te.version);let dn=je.currentProgram;Mt===!0&&(dn=os(te,G,W));let ri=!1,Kt=!1,xi=!1;const Dt=dn.getUniforms(),Xn=je.uniforms;if(qe.useProgram(dn.program)&&(ri=!0,Kt=!0,xi=!0),te.id!==b&&(b=te.id,Kt=!0),ri||R!==A){qe.buffers.depth.getReversed()?(_e.copy(A.projectionMatrix),O_(_e),k_(_e),Dt.setValue(X,"projectionMatrix",_e)):Dt.setValue(X,"projectionMatrix",A.projectionMatrix),Dt.setValue(X,"viewMatrix",A.matrixWorldInverse);const jn=Dt.map.cameraPosition;jn!==void 0&&jn.setValue(X,Ie.setFromMatrixPosition(A.matrixWorld)),ct.logarithmicDepthBuffer&&Dt.setValue(X,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Dt.setValue(X,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,Kt=!0,xi=!0)}if(W.isSkinnedMesh){Dt.setOptional(X,W,"bindMatrix"),Dt.setOptional(X,W,"bindMatrixInverse");const Mn=W.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Dt.setValue(X,"boneTexture",Mn.boneTexture,P))}W.isBatchedMesh&&(Dt.setOptional(X,W,"batchingTexture"),Dt.setValue(X,"batchingTexture",W._matricesTexture,P),Dt.setOptional(X,W,"batchingIdTexture"),Dt.setValue(X,"batchingIdTexture",W._indirectTexture,P),Dt.setOptional(X,W,"batchingColorTexture"),W._colorsTexture!==null&&Dt.setValue(X,"batchingColorTexture",W._colorsTexture,P));const bi=ee.morphAttributes;if((bi.position!==void 0||bi.normal!==void 0||bi.color!==void 0)&&Je.update(W,ee,dn),(Kt||je.receiveShadow!==W.receiveShadow)&&(je.receiveShadow=W.receiveShadow,Dt.setValue(X,"receiveShadow",W.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Xn.envMap.value=ze,Xn.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&G.environment!==null&&(Xn.envMapIntensity.value=G.environmentIntensity),Kt&&(Dt.setValue(X,"toneMappingExposure",C.toneMappingExposure),je.needsLights&&la(Xn,xi),Te&&te.fog===!0&&Ae.refreshFogUniforms(Xn,Te),Ae.refreshMaterialUniforms(Xn,te,z,ue,v.state.transmissionRenderTarget[A.id]),Gl.upload(X,oa(je),Xn,P)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Gl.upload(X,oa(je),Xn,P),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Dt.setValue(X,"center",W.center),Dt.setValue(X,"modelViewMatrix",W.modelViewMatrix),Dt.setValue(X,"normalMatrix",W.normalMatrix),Dt.setValue(X,"modelMatrix",W.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const Mn=te.uniformsGroups;for(let jn=0,Pn=Mn.length;jn<Pn;jn++){const ua=Mn[jn];H.update(ua,dn),H.bind(ua,dn)}}return dn}function la(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function Jl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(A,G,ee){Ye.get(A.texture).__webglTexture=G,Ye.get(A.depthTexture).__webglTexture=ee;const te=Ye.get(A);te.__hasExternalTextures=!0,te.__autoAllocateDepthBuffer=ee===void 0,te.__autoAllocateDepthBuffer||mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,G){const ee=Ye.get(A);ee.__webglFramebuffer=G,ee.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(A,G=0,ee=0){V=A,O=G,N=ee;let te=!0,W=null,Te=!1,Se=!1;if(A){const ze=Ye.get(A);if(ze.__useDefaultFramebuffer!==void 0)qe.bindFramebuffer(X.FRAMEBUFFER,null),te=!1;else if(ze.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(ze.__hasExternalTextures)P.rebindTextures(A,Ye.get(A.texture).__webglTexture,Ye.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ge=A.depthTexture;if(ze.__boundDepthTexture!==Ge){if(Ge!==null&&Ye.has(Ge)&&(A.width!==Ge.image.width||A.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const tt=A.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(Se=!0);const it=Ye.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(it[G])?W=it[G][ee]:W=it[G],Te=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?W=Ye.get(A).__webglMultisampledFramebuffer:Array.isArray(it)?W=it[ee]:W=it,k.copy(A.viewport),ne.copy(A.scissor),K=A.scissorTest}else k.copy(U).multiplyScalar(z).floor(),ne.copy(ie).multiplyScalar(z).floor(),K=De;if(qe.bindFramebuffer(X.FRAMEBUFFER,W)&&te&&qe.drawBuffers(A,W),qe.viewport(k),qe.scissor(ne),qe.setScissorTest(K),Te){const ze=Ye.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+G,ze.__webglTexture,ee)}else if(Se){const ze=Ye.get(A.texture),tt=G||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,ze.__webglTexture,ee||0,tt)}b=-1},this.readRenderTargetPixels=function(A,G,ee,te,W,Te,Se){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Ve=Ve[Se]),Ve){qe.bindFramebuffer(X.FRAMEBUFFER,Ve);try{const ze=A.texture,tt=ze.format,it=ze.type;if(!ct.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-te&&ee>=0&&ee<=A.height-W&&X.readPixels(G,ee,te,W,rt.convert(tt),rt.convert(it),Te)}finally{const ze=V!==null?Ye.get(V).__webglFramebuffer:null;qe.bindFramebuffer(X.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(A,G,ee,te,W,Te,Se){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Ve=Ve[Se]),Ve){const ze=A.texture,tt=ze.format,it=ze.type;if(!ct.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=A.width-te&&ee>=0&&ee<=A.height-W){qe.bindFramebuffer(X.FRAMEBUFFER,Ve);const Ge=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Ge),X.bufferData(X.PIXEL_PACK_BUFFER,Te.byteLength,X.STREAM_READ),X.readPixels(G,ee,te,W,rt.convert(tt),rt.convert(it),0);const _t=V!==null?Ye.get(V).__webglFramebuffer:null;qe.bindFramebuffer(X.FRAMEBUFFER,_t);const Tt=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await F_(X,Tt,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Ge),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Te),X.deleteBuffer(Ge),X.deleteSync(Tt),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,G=null,ee=0){A.isTexture!==!0&&($o("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,A=arguments[1]);const te=Math.pow(2,-ee),W=Math.floor(A.image.width*te),Te=Math.floor(A.image.height*te),Se=G!==null?G.x:0,Ve=G!==null?G.y:0;P.setTexture2D(A,0),X.copyTexSubImage2D(X.TEXTURE_2D,ee,0,0,Se,Ve,W,Te),qe.unbindTexture()},this.copyTextureToTexture=function(A,G,ee=null,te=null,W=0){A.isTexture!==!0&&($o("WebGLRenderer: copyTextureToTexture function signature has changed."),te=arguments[0]||null,A=arguments[1],G=arguments[2],W=arguments[3]||0,ee=null);let Te,Se,Ve,ze,tt,it,Ge,_t,Tt;const vt=A.isCompressedTexture?A.mipmaps[W]:A.image;ee!==null?(Te=ee.max.x-ee.min.x,Se=ee.max.y-ee.min.y,Ve=ee.isBox3?ee.max.z-ee.min.z:1,ze=ee.min.x,tt=ee.min.y,it=ee.isBox3?ee.min.z:0):(Te=vt.width,Se=vt.height,Ve=vt.depth||1,ze=0,tt=0,it=0),te!==null?(Ge=te.x,_t=te.y,Tt=te.z):(Ge=0,_t=0,Tt=0);const fn=rt.convert(G.format),ot=rt.convert(G.type);let je;G.isData3DTexture?(P.setTexture3D(G,0),je=X.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(P.setTexture2DArray(G,0),je=X.TEXTURE_2D_ARRAY):(P.setTexture2D(G,0),je=X.TEXTURE_2D),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,G.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,G.unpackAlignment);const ii=X.getParameter(X.UNPACK_ROW_LENGTH),Mt=X.getParameter(X.UNPACK_IMAGE_HEIGHT),dn=X.getParameter(X.UNPACK_SKIP_PIXELS),ri=X.getParameter(X.UNPACK_SKIP_ROWS),Kt=X.getParameter(X.UNPACK_SKIP_IMAGES);X.pixelStorei(X.UNPACK_ROW_LENGTH,vt.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,vt.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,ze),X.pixelStorei(X.UNPACK_SKIP_ROWS,tt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,it);const xi=A.isDataArrayTexture||A.isData3DTexture,Dt=G.isDataArrayTexture||G.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Xn=Ye.get(A),bi=Ye.get(G),Mn=Ye.get(Xn.__renderTarget),jn=Ye.get(bi.__renderTarget);qe.bindFramebuffer(X.READ_FRAMEBUFFER,Mn.__webglFramebuffer),qe.bindFramebuffer(X.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Pn=0;Pn<Ve;Pn++)xi&&X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ye.get(A).__webglTexture,W,it+Pn),A.isDepthTexture?(Dt&&X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ye.get(G).__webglTexture,W,Tt+Pn),X.blitFramebuffer(ze,tt,Te,Se,Ge,_t,Te,Se,X.DEPTH_BUFFER_BIT,X.NEAREST)):Dt?X.copyTexSubImage3D(je,W,Ge,_t,Tt+Pn,ze,tt,Te,Se):X.copyTexSubImage2D(je,W,Ge,_t,Tt+Pn,ze,tt,Te,Se);qe.bindFramebuffer(X.READ_FRAMEBUFFER,null),qe.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else Dt?A.isDataTexture||A.isData3DTexture?X.texSubImage3D(je,W,Ge,_t,Tt,Te,Se,Ve,fn,ot,vt.data):G.isCompressedArrayTexture?X.compressedTexSubImage3D(je,W,Ge,_t,Tt,Te,Se,Ve,fn,vt.data):X.texSubImage3D(je,W,Ge,_t,Tt,Te,Se,Ve,fn,ot,vt):A.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,W,Ge,_t,Te,Se,fn,ot,vt.data):A.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,W,Ge,_t,vt.width,vt.height,fn,vt.data):X.texSubImage2D(X.TEXTURE_2D,W,Ge,_t,Te,Se,fn,ot,vt);X.pixelStorei(X.UNPACK_ROW_LENGTH,ii),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Mt),X.pixelStorei(X.UNPACK_SKIP_PIXELS,dn),X.pixelStorei(X.UNPACK_SKIP_ROWS,ri),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Kt),W===0&&G.generateMipmaps&&X.generateMipmap(je),qe.unbindTexture()},this.copyTextureToTexture3D=function(A,G,ee=null,te=null,W=0){return A.isTexture!==!0&&($o("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ee=arguments[0]||null,te=arguments[1]||null,A=arguments[2],G=arguments[3],W=arguments[4]||0),$o('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,G,ee,te,W)},this.initRenderTarget=function(A){Ye.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),qe.unbindTexture()},this.resetState=function(){O=0,N=0,V=null,qe.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=St._getDrawingBufferColorSpace(e),t.unpackColorSpace=St._getUnpackColorSpace()}}class gd{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new ht(e),this.near=t,this.far=r}clone(){return new gd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class qE extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class $E{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jf,this.updateRanges=[],this.version=0,this.uuid=qi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let a=0,l=this.stride;a<l;a++)this.array[e+a]=t.array[r+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new Y;class jl{constructor(e,t,r,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let r=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(r=pi(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=bt(r,this.array)),this.data.array[e*this.data.stride+this.offset+t]=r,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pi(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),r=bt(r,this.array),a=bt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),r=bt(r,this.array),a=bt(a,this.array),l=bt(l,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=a,this.data.array[e+3]=l,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const a=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[a+l])}return new vi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new jl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const a=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[a+l])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class zg extends rs{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Gs;const Wo=new Y,Ws=new Y,Xs=new Y,js=new pt,Xo=new pt,Bg=new kt,Il=new Y,jo=new Y,Ul=new Y,qm=new pt,ff=new pt,$m=new pt;class KE extends en{constructor(e=new zg){if(super(),this.isSprite=!0,this.type="Sprite",Gs===void 0){Gs=new Wn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),r=new $E(t,5);Gs.setIndex([0,1,2,0,2,3]),Gs.setAttribute("position",new jl(r,3,0,!1)),Gs.setAttribute("uv",new jl(r,2,3,!1))}this.geometry=Gs,this.material=e,this.center=new pt(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ws.setFromMatrixScale(this.matrixWorld),Bg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ws.multiplyScalar(-Xs.z);const r=this.material.rotation;let a,l;r!==0&&(l=Math.cos(r),a=Math.sin(r));const f=this.center;Nl(Il.set(-.5,-.5,0),Xs,f,Ws,a,l),Nl(jo.set(.5,-.5,0),Xs,f,Ws,a,l),Nl(Ul.set(.5,.5,0),Xs,f,Ws,a,l),qm.set(0,0),ff.set(1,0),$m.set(1,1);let c=e.ray.intersectTriangle(Il,jo,Ul,!1,Wo);if(c===null&&(Nl(jo.set(-.5,.5,0),Xs,f,Ws,a,l),ff.set(0,1),c=e.ray.intersectTriangle(Il,Ul,jo,!1,Wo),c===null))return;const h=e.ray.origin.distanceTo(Wo);h<e.near||h>e.far||t.push({distance:h,point:Wo.clone(),uv:ni.getInterpolation(Wo,Il,jo,Ul,qm,ff,$m,new pt),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Nl(s,e,t,r,a,l){js.subVectors(s,t).addScalar(.5).multiply(r),a!==void 0?(Xo.x=l*js.x-a*js.y,Xo.y=a*js.x+l*js.y):Xo.copy(js),s.copy(e),s.x+=Xo.x,s.y+=Xo.y,s.applyMatrix4(Bg)}class vd extends rs{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Yl=new Y,ql=new Y,Km=new kt,Yo=new fd,Fl=new Zl,df=new Y,Zm=new Y;class Hg extends en{constructor(e=new Wn,t=new vd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let a=1,l=t.count;a<l;a++)Yl.fromBufferAttribute(t,a-1),ql.fromBufferAttribute(t,a),r[a]=r[a-1],r[a]+=Yl.distanceTo(ql);e.setAttribute("lineDistance",new cn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,f=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Fl.copy(r.boundingSphere),Fl.applyMatrix4(a),Fl.radius+=l,e.ray.intersectsSphere(Fl)===!1)return;Km.copy(a).invert(),Yo.copy(e.ray).applyMatrix4(Km);const c=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=c*c,m=this.isLineSegments?2:1,g=r.index,x=r.attributes.position;if(g!==null){const S=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let w=S,y=E-1;w<y;w+=m){const v=g.getX(w),I=g.getX(w+1),D=Ol(this,e,Yo,h,v,I);D&&t.push(D)}if(this.isLineLoop){const w=g.getX(E-1),y=g.getX(S),v=Ol(this,e,Yo,h,w,y);v&&t.push(v)}}else{const S=Math.max(0,f.start),E=Math.min(x.count,f.start+f.count);for(let w=S,y=E-1;w<y;w+=m){const v=Ol(this,e,Yo,h,w,w+1);v&&t.push(v)}if(this.isLineLoop){const w=Ol(this,e,Yo,h,E-1,S);w&&t.push(w)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const c=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}}function Ol(s,e,t,r,a,l){const f=s.geometry.attributes.position;if(Yl.fromBufferAttribute(f,a),ql.fromBufferAttribute(f,l),t.distanceSqToSegment(Yl,ql,df,Zm)>r)return;df.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(df);if(!(h<e.near||h>e.far))return{distance:h,point:Zm.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Qm=new Y,Jm=new Y;class ZE extends Hg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let a=0,l=t.count;a<l;a+=2)Qm.fromBufferAttribute(t,a),Jm.fromBufferAttribute(t,a+1),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Qm.distanceTo(Jm);e.setAttribute("lineDistance",new cn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class eg extends Cn{constructor(e,t,r,a,l,f,c,h,m){super(e,t,r,a,l,f,c,h,m),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jo extends Wn{constructor(e=1,t=1,r=1,a=32,l=1,f=!1,c=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:a,heightSegments:l,openEnded:f,thetaStart:c,thetaLength:h};const m=this;a=Math.floor(a),l=Math.floor(l);const g=[],_=[],x=[],S=[];let E=0;const w=[],y=r/2;let v=0;I(),f===!1&&(e>0&&D(!0),t>0&&D(!1)),this.setIndex(g),this.setAttribute("position",new cn(_,3)),this.setAttribute("normal",new cn(x,3)),this.setAttribute("uv",new cn(S,2));function I(){const C=new Y,q=new Y;let O=0;const N=(t-e)/r;for(let V=0;V<=l;V++){const b=[],R=V/l,k=R*(t-e)+e;for(let ne=0;ne<=a;ne++){const K=ne/a,ae=K*h+c,ce=Math.sin(ae),oe=Math.cos(ae);q.x=k*ce,q.y=-R*r+y,q.z=k*oe,_.push(q.x,q.y,q.z),C.set(ce,N,oe).normalize(),x.push(C.x,C.y,C.z),S.push(K,1-R),b.push(E++)}w.push(b)}for(let V=0;V<a;V++)for(let b=0;b<l;b++){const R=w[b][V],k=w[b+1][V],ne=w[b+1][V+1],K=w[b][V+1];(e>0||b!==0)&&(g.push(R,k,K),O+=3),(t>0||b!==l-1)&&(g.push(k,ne,K),O+=3)}m.addGroup(v,O,0),v+=O}function D(C){const q=E,O=new pt,N=new Y;let V=0;const b=C===!0?e:t,R=C===!0?1:-1;for(let ne=1;ne<=a;ne++)_.push(0,y*R,0),x.push(0,R,0),S.push(.5,.5),E++;const k=E;for(let ne=0;ne<=a;ne++){const ae=ne/a*h+c,ce=Math.cos(ae),oe=Math.sin(ae);N.x=b*oe,N.y=y*R,N.z=b*ce,_.push(N.x,N.y,N.z),x.push(0,R,0),O.x=ce*.5+.5,O.y=oe*.5*R+.5,S.push(O.x,O.y),E++}for(let ne=0;ne<a;ne++){const K=q+ne,ae=k+ne;C===!0?g.push(ae,ae+1,K):g.push(ae+1,ae,K),V+=3}m.addGroup(v,V,C===!0?1:2),v+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _d extends Wn{constructor(e=1,t=32,r=16,a=0,l=Math.PI*2,f=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:a,phiLength:l,thetaStart:f,thetaLength:c},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const h=Math.min(f+c,Math.PI);let m=0;const g=[],_=new Y,x=new Y,S=[],E=[],w=[],y=[];for(let v=0;v<=r;v++){const I=[],D=v/r;let C=0;v===0&&f===0?C=.5/t:v===r&&h===Math.PI&&(C=-.5/t);for(let q=0;q<=t;q++){const O=q/t;_.x=-e*Math.cos(a+O*l)*Math.sin(f+D*c),_.y=e*Math.cos(f+D*c),_.z=e*Math.sin(a+O*l)*Math.sin(f+D*c),E.push(_.x,_.y,_.z),x.copy(_).normalize(),w.push(x.x,x.y,x.z),y.push(O+C,1-D),I.push(m++)}g.push(I)}for(let v=0;v<r;v++)for(let I=0;I<t;I++){const D=g[v][I+1],C=g[v][I],q=g[v+1][I],O=g[v+1][I+1];(v!==0||f>0)&&S.push(D,C,O),(v!==r-1||h<Math.PI)&&S.push(C,q,O)}this.setIndex(S),this.setAttribute("position",new cn(E,3)),this.setAttribute("normal",new cn(w,3)),this.setAttribute("uv",new cn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _d(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class QE extends rs{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sg,this.normalScale=new pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vg extends en{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ht(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class JE extends Vg{constructor(e,t,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ht(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const hf=new kt,tg=new Y,ng=new Y;class eT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pt(512,512),this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pd,this._frameExtents=new pt(1,1),this._viewportCount=1,this._viewports=[new Wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;tg.setFromMatrixPosition(e.matrixWorld),t.position.copy(tg),ng.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ng),t.updateMatrixWorld(),hf.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hf),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(hf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class tT extends eT{constructor(){super(new Ig(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nT extends Vg{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new tT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class iT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ig(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ig();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ig(){return performance.now()}const rg=new kt;class rT{constructor(e,t,r=0,a=1/0){this.ray=new fd(e,t),this.near=r,this.far=a,this.camera=null,this.layers=new dd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return rg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rg),this}intersectObject(e,t=!0,r=[]){return td(e,this,r,t),r.sort(sg),r}intersectObjects(e,t=!0,r=[]){for(let a=0,l=e.length;a<l;a++)td(e[a],this,r,t);return r.sort(sg),r}}function sg(s,e){return s.distance-e.distance}function td(s,e,t,r){let a=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(a=!1),a===!0&&r===!0){const l=s.children;for(let f=0,c=l.length;f<c;f++)td(l[f],e,t,!0)}}class sT extends ZE{constructor(e=10,t=10,r=4473924,a=8947848){r=new ht(r),a=new ht(a);const l=t/2,f=e/t,c=e/2,h=[],m=[];for(let x=0,S=0,E=-c;x<=t;x++,E+=f){h.push(-c,0,E,c,0,E),h.push(E,0,-c,E,0,c);const w=x===l?r:a;w.toArray(m,S),S+=3,w.toArray(m,S),S+=3,w.toArray(m,S),S+=3,w.toArray(m,S),S+=3}const g=new Wn;g.setAttribute("position",new cn(h,3)),g.setAttribute("color",new cn(m,3));const _=new vd({vertexColors:!0,toneMapped:!1});super(g,_),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:id}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=id);const Tr={ak:{name:"AK-47",slot:"primary",mag:30,reserve:90,damage:39,delay:.105,reload:2.45,recoil:1.7,automatic:!0,range:100,sound:"ak"},m4:{name:"M4A4",slot:"primary",mag:30,reserve:90,damage:33,delay:.082,reload:2.35,recoil:.66,automatic:!0,range:100,sound:"m4"},awp:{name:"AWP",slot:"primary",mag:5,reserve:30,damage:175,delay:1.05,reload:3.4,recoil:2.5,automatic:!1,range:150,sound:"awp"},glock:{name:"GLOCK-18",slot:"secondary",mag:20,reserve:120,damage:21,delay:.17,reload:2.2,recoil:.42,automatic:!1,range:55,sound:"pistol"},usp:{name:"USP-S",slot:"secondary",mag:12,reserve:48,damage:25,delay:.19,reload:2.15,recoil:.43,automatic:!1,range:58,sound:"pistol"},deagle:{name:"DESERT EAGLE",slot:"secondary",mag:7,reserve:35,damage:53,delay:.37,reload:2.45,recoil:1.05,automatic:!1,range:70,sound:"pistol"},knife:{name:"KNIFE",slot:"knife",mag:1,reserve:0,damage:55,delay:.58,reload:0,recoil:0,automatic:!1,range:2.8,sound:"knife"}},oT={head:2,chest:1,abdomen:.9,arm:.65,leg:.7},wt=Y,qo=(s,e,t)=>Math.max(e,Math.min(t,s)),xn=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z),og=(s,e,t)=>s+Math.atan2(Math.sin(e-s),Math.cos(e-s))*t,jt={sand:12952948,darkSand:8940359,wall:10191198,blue:3439006,tan:11954242};class aT{constructor(){et(this,"ctx",null)}unlock(){this.ctx||(this.ctx=new AudioContext),this.ctx.state==="suspended"&&this.ctx.resume()}tone(e,t,r,a=.06,l=0){if(!this.ctx)return;const f=this.ctx,c=f.currentTime,h=f.createOscillator(),m=f.createGain();h.type=r,h.frequency.setValueAtTime(e,c),l&&h.frequency.exponentialRampToValueAtTime(Math.max(20,e+l),c+t),m.gain.setValueAtTime(a,c),m.gain.exponentialRampToValueAtTime(.001,c+t),h.connect(m).connect(f.destination),h.start(c),h.stop(c+t)}noise(e,t,r){if(!this.ctx)return;const a=this.ctx,l=Math.max(1,Math.floor(a.sampleRate*e),1),f=a.createBuffer(1,l,a.sampleRate).getChannelData(0);for(let g=0;g<l;g++)f[g]=(Math.random()*2-1)*(1-g/l);const c=a.createBufferSource(),h=a.createBiquadFilter(),m=a.createGain();c.buffer=a.createBuffer(1,l,a.sampleRate),c.buffer.getChannelData(0).set(f),h.type="lowpass",h.frequency.value=r,m.gain.value=t,c.connect(h).connect(m).connect(a.destination),c.start()}play(e){this.ctx&&(e==="ak"?(this.noise(.09,.15,1100),this.tone(80,.08,"sawtooth",.08,-30)):e==="m4"?(this.noise(.055,.09,1800),this.tone(130,.045,"square",.04,-20)):e==="awp"?(this.noise(.24,.22,720),this.tone(55,.2,"sawtooth",.16,-25)):e==="pistol"?(this.noise(.06,.1,2200),this.tone(210,.06,"square",.05,-80)):e==="knife"?this.tone(270,.09,"sawtooth",.07,250):e==="reload"?(this.tone(380,.035,"square",.035,-80),setTimeout(()=>this.tone(510,.05,"square",.035,-120),180)):e==="step"?this.noise(.025,.025,350):e==="hit"?this.tone(860,.045,"sine",.04,120):e==="kill"?(this.tone(620,.08,"square",.06,180),setTimeout(()=>this.tone(930,.1,"sine",.04,120),85)):e==="scope"?this.tone(530,.07,"sine",.035,-250):e==="plant"?this.tone(450,.08,"square",.05,-50):e==="defuse"?this.tone(710,.07,"sine",.04,80):e==="boom"&&(this.noise(.65,.35,250),this.tone(55,.45,"sawtooth",.16,-40)))}}class lT{constructor(e,t){et(this,"root");et(this,"emit");et(this,"renderer");et(this,"scene",new qE);et(this,"camera",new ti(74,1,.05,170));et(this,"clock",new iT);et(this,"sound",new aT);et(this,"walls",[]);et(this,"fighters",[]);et(this,"nodeGraph",{});et(this,"bomb");et(this,"keys",new Set);et(this,"mouseDown",!1);et(this,"rightDown",!1);et(this,"eDown",!1);et(this,"pointerLocked",!1);et(this,"yaw",Math.PI);et(this,"pitch",-.08);et(this,"controlledId","ct0");et(this,"playerOrigin","ct0");et(this,"raf",0);et(this,"now",0);et(this,"round",1);et(this,"roundTimer",115);et(this,"phase","live");et(this,"nextRound",0);et(this,"message","PISTOL ROUND // ELIMINATE THE ENEMY");et(this,"messageUntil",5);et(this,"feeds",[]);et(this,"bombMesh");et(this,"viewModel");et(this,"tracerGroup",new Xi);et(this,"lastHUD",0);et(this,"pistolRound",!0);et(this,"tempRay",new rT);et(this,"tmpA",new wt);et(this,"tmpB",new wt);et(this,"onResize",()=>{this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight)});et(this,"onKeyDown",e=>{const t=e.key.toLowerCase();this.keys.add(t),[" ","w","a","s","d","e","r","1","2","3","4","5","q"].includes(t)&&e.preventDefault(),t==="r"&&this.reload(this.controlled()),t==="1"&&this.switchSlot("primary"),t==="2"&&this.switchSlot("secondary"),t==="3"&&this.switchSlot("knife"),t==="4"&&this.equipSpecial("awp"),t==="5"&&this.equipSpecial("deagle"),t==="q"&&this.takeOver()});et(this,"onKeyUp",e=>{this.keys.delete(e.key.toLowerCase())});et(this,"onMouseMove",e=>{this.pointerLocked&&(this.yaw-=e.movementX*.0022,this.pitch=qo(this.pitch-e.movementY*.002,-1.43,1.43))});et(this,"onLockChange",()=>{this.pointerLocked=document.pointerLockElement===this.renderer.domElement});et(this,"onMouseDown",e=>{this.pointerLocked&&(e.button===0&&(this.mouseDown=!0),e.button===2&&(this.rightDown=!0,e.preventDefault()))});et(this,"onMouseUp",e=>{e.button===0&&(this.mouseDown=!1),e.button===2&&(this.rightDown=!1)});et(this,"loop",()=>{this.raf=requestAnimationFrame(this.loop);const e=Math.min(.05,this.clock.getDelta());this.now+=e,this.phase==="live"?this.updateLive(e):this.now>=this.nextRound&&this.resetRound(!1),this.renderer.render(this.scene,this.camera),this.now-this.lastHUD>.1&&(this.lastHUD=this.now,this.publishHUD())});et(this,"wasScoped",!1);this.root=e,this.emit=t,this.renderer=new YE({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=lg,e.appendChild(this.renderer.domElement),this.scene.background=new ht(9480369),this.scene.fog=new gd(9480369,64,135),this.camera.rotation.order="YXZ",this.viewModel=this.makeViewModel(),this.camera.add(this.viewModel),this.scene.add(this.camera),this.scene.add(this.tracerGroup),this.bombMesh=this.makeBomb(),this.scene.add(this.bombMesh),this.makeLighting(),this.makeMap(),this.makeFighters(),this.resetRound(!0),this.installEvents(),this.loop()}lock(){this.sound.unlock(),this.renderer.domElement.requestPointerLock()}dispose(){cancelAnimationFrame(this.raf),this.renderer.domElement.remove(),this.renderer.dispose(),window.removeEventListener("resize",this.onResize),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("pointerlockchange",this.onLockChange),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.onMouseUp)}installEvents(){window.addEventListener("resize",this.onResize),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("pointerlockchange",this.onLockChange),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.onMouseUp)}makeLighting(){const e=new JE(14872565,7626823,2);this.scene.add(e);const t=new nT(16773072,2.4);t.position.set(-30,55,20),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-80,t.shadow.camera.right=80,t.shadow.camera.top=80,t.shadow.camera.bottom=-80,this.scene.add(t)}mat(e,t=.9){return new QE({color:e,roughness:t,metalness:.03})}box(e,t,r,a,l,f,c,h=!0,m=""){const g=new Vt(new Jt(a,l,f),this.mat(c));return g.position.set(e,t,r),g.castShadow=g.receiveShadow=!0,g.name=m,this.scene.add(g),h&&(g.userData.wall=!0,this.walls.push({x:e,z:r,w:a,d:f,mesh:g})),g}makeMap(){const e=new Vt(new io(118,118,12,12),this.mat(jt.sand));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,this.scene.add(e);const t=new sT(116,58,9401682,10651488);t.position.y=.015,t.material.transparent=!0,t.material.opacity=.16,this.scene.add(t),this.box(0,3,-58,118,6,2,jt.wall),this.box(0,3,58,118,6,2,jt.wall),this.box(-58,3,0,2,6,118,jt.wall),this.box(58,3,0,2,6,118,jt.wall),this.box(-19,3,27,3,6,24,jt.wall),this.box(-46,3,31,3,6,50,jt.wall),this.box(-32,3,8,28,6,3,jt.wall),this.box(-7,2.5,-18,27,5,3,jt.wall),this.box(-21,2.5,-31,3,5,21,jt.wall),this.box(11.5,3,12,3,6,27,jt.wall),this.box(22,3,12,3,6,20,jt.wall),this.box(16.8,3,1.7,2.2,6,4.5,7103057,!0,"MID DOORS LEFT"),this.box(16.8,3,-4.8,2.2,6,4.5,7103057,!0,"MID DOORS RIGHT");const r=this.box(16.8,6.4,-1.55,2.2,1.4,2.2,5524544,!1,"MID DOORS LINTEL");r.userData.wall=!0,this.box(21,3,35,3,6,30,jt.wall),this.box(46,3,28,3,6,38,jt.wall),this.box(34,3,17,16,6,3,jt.wall),this.box(9,3,-42,35,6,3,jt.wall),this.box(43,3,-38,3,6,25,jt.wall),this.box(31,3,-29,3,6,15,jt.wall),this.crate(-37,-13,4,3.8,4),this.crate(-29,-20,5,4.5,5),this.crate(-42,-26,3,3,3),this.crate(-33,19,4,4,4),this.crate(-31,34,3,3,5),this.crate(35,-13,5,4,4),this.crate(42,-20,3,3,3),this.crate(28,-4,4,3,4),this.crate(31,26,4,3,4),this.crate(3,13,3,3,3),this.crate(8,-7,3,2.5,5),this.crate(26,-37,4,3,4),this.makeSiteMark(-35,-18,"A"),this.makeSiteMark(36,-18,"B"),this.makeSign(-2,49,"T SPAWN"),this.makeSign(28,-47,"CT SPAWN"),this.makeSign(8,10,"MID"),this.makeSign(-30,27,"A LONG"),this.makeSign(34,28,"B TUNNELS"),this.makeSign(-12,-10,"CATWALK"),this.makeSign(16,-2,"MID DOORS"),this.nodeGraph={T:{x:0,z:47,links:["long1","mid","tuntop"]},long1:{x:-32,z:42,links:["T","long2"]},long2:{x:-32,z:22,links:["long1","A"]},mid:{x:0,z:17,links:["T","midtop","cat"]},midtop:{x:0,z:28,links:["mid","upper"]},upper:{x:15,z:28,links:["midtop","doors"]},doors:{x:15,z:0,links:["upper","ctlower"]},ctlower:{x:27,z:-8,links:["doors","ctmid","B"]},ctmid:{x:27,z:5,links:["ctlower","B","CT"]},cat:{x:-10,z:-7,links:["mid","A","ctramp"]},A:{x:-35,z:-18,links:["long2","cat","ctramp"]},ctramp:{x:2,z:-29,links:["A","cat","CT"]},tuntop:{x:26,z:47,links:["T","tun1"]},tun1:{x:32,z:31,links:["tuntop","tun2"]},tun2:{x:36,z:12,links:["tun1","B"]},B:{x:36,z:-17,links:["tun2","ctmid","ctlower"]},CT:{x:27,z:-44,links:["ctmid","ctramp"]}}}crate(e,t,r,a,l){const f=this.box(e,a/2,t,r,a,l,jt.darkSand,!0,"wooden tactical crate"),c=this.box(e,a+.04,t,r+.12,.12,l+.12,13016413,!1);return c.castShadow=!0,f}makeSiteMark(e,t,r){const a=document.createElement("canvas");a.width=256,a.height=256;const l=a.getContext("2d");l.fillStyle="#b8452e",l.globalAlpha=.82,l.font="bold 180px sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(r,128,137);const f=new eg(a),c=new Vt(new io(9,9),new hd({map:f,transparent:!0,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set(e,.04,t),this.scene.add(c)}makeSign(e,t,r){const a=document.createElement("canvas");a.width=512,a.height=96;const l=a.getContext("2d");l.fillStyle="#2d2820",l.fillRect(0,0,512,96),l.strokeStyle="#d6bd78",l.lineWidth=5,l.strokeRect(3,3,506,90),l.fillStyle="#f0d68e",l.font="bold 43px sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(r,256,51);const f=new KE(new zg({map:new eg(a),depthTest:!1}));f.position.set(e,5.7,t),f.scale.set(9,1.7,1),this.scene.add(f)}makeBomb(){const e=new Xi,t=this.mat(2106662,.45),r=this.mat(13874249,.3),a=new Vt(new Jt(.75,.45,.35),t);a.position.y=.28,a.castShadow=!0,e.add(a);const l=new Vt(new Jt(.45,.2,.02),r);l.position.set(0,.33,.19),e.add(l);for(let f=0;f<3;f++){const c=new Vt(new Jo(.018,.018,.55,6),f===1?r:this.mat(11090735));c.rotation.z=.5+f*.25,c.position.set(-.2+f*.18,.56,.02),e.add(c)}return e.visible=!1,e}makeFighters(){const e=[[-0,-44],[24,-47],[31,-45],[22,-39],[34,-37]],t=[[0,47],[-4,45],[4,45],[6,50],[-6,50]];e.forEach((r,a)=>this.fighters.push(this.makeFighter(`ct${a}`,a===0?"YOU":`CT-${a}`,"CT",new wt(r[0],0,r[1]),a!==0))),t.forEach((r,a)=>this.fighters.push(this.makeFighter(`t${a}`,`T-${a+1}`,"T",new wt(r[0],0,r[1]),!0)))}makeFighter(e,t,r,a,l){const f=new Xi;f.name=t,this.scene.add(f);const c=this.mat(r==="CT"?12230778:12024400),h=this.mat(r==="CT"?jt.blue:jt.tan),m=this.mat(r==="CT"?1981001:6107172);this.mat(2236962);const g=(x,S,E,w,y,v)=>{const I=new Vt(x,S);return I.position.set(E,w,y),I.castShadow=!0,I.receiveShadow=!0,v&&(I.userData.combatantId=e,I.userData.hitbox=v),f.add(I),I};g(new _d(.26,12,10),c,0,1.72,0,"head"),g(new Jt(.55,.52,.28),h,0,1.35,0,"chest"),g(new Jt(.48,.28,.26),m,0,.97,0,"abdomen"),g(new Jt(.16,.56,.16),h,-.4,1.28,.02,"arm"),g(new Jt(.16,.56,.16),h,.4,1.28,.02,"arm"),g(new Jt(.2,.62,.2),m,-.17,.47,0,"leg"),g(new Jt(.2,.62,.2),m,.17,.47,0,"leg");const _=this.makeWorldGun(r==="CT"?"m4":"ak");return _.position.set(.28,1.28,-.32),_.rotation.set(0,0,-.1),f.add(_),{id:e,name:t,team:r,group:f,spawn:a.clone(),ai:l,health:100,armor:100,alive:!0,velocityY:0,yaw:r==="CT"?Math.PI:0,pitch:0,primary:r==="CT"?"m4":"ak",secondary:r==="CT"?"usp":"glock",selected:r==="CT"?"m4":"ak",ammo:{},reserve:{},nextShot:0,reloadingUntil:0,reloadWeapon:null,recoil:0,c4:!1,navPath:[],navIndex:0,navGoal:"",patrol:0,lastThink:0,targetId:null,lastStep:0,killCount:0}}makeWorldGun(e){const t=new Xi,r=this.mat(e==="ak"?3681314:2369578,.42),a=this.mat(e==="ak"?8474930:3290680),l=new Vt(new Jt(.12,.11,.65),r);l.position.z=-.18,l.castShadow=!0,t.add(l);const f=new Vt(new Jt(.13,.14,.28),a);f.position.z=.25,t.add(f);const c=new Vt(new Jo(.032,.032,.35,7),r);c.rotation.x=Math.PI/2,c.position.set(0,.03,-.62),t.add(c);const h=new Vt(new Jt(.09,.2,.1),a);if(h.position.set(0,-.13,.03),h.rotation.x=-.35,t.add(h),e==="awp"){const m=new Vt(new Jo(.07,.07,.4,8),r);m.rotation.x=Math.PI/2,m.position.set(0,.12,-.15),t.add(m)}return t}makeViewModel(){const e=new Xi;e.position.set(.46,-.42,-.75);const t=this.mat(12160872),r=this.mat(3230816);for(const l of[-.18,.2]){const f=new Vt(new Jt(.17,.18,.5),r);f.position.set(l,-.12,.12),f.rotation.x=-.55,e.add(f);const c=new Vt(new Jt(.14,.12,.15),t);c.position.set(l,-.02,-.14),e.add(c)}const a=this.makeWorldGun("m4");return a.name="view-gun",a.scale.set(1.25,1.25,1.25),a.position.set(.03,.02,-.24),a.rotation.set(-.04,.1,0),e.add(a),e}updateLive(e){this.controlled().alive||this.takeOver(),this.updatePlayer(e);for(const r of this.fighters)r.alive&&r.ai&&r.id!==this.controlledId&&this.updateAI(r,e);this.updateBomb(e),this.updateReloads(),this.updateTracers(e),this.checkRound(e)}controlled(){return this.fighters.find(e=>e.id===this.controlledId)||this.fighters[0]}updatePlayer(e){const t=this.controlled();if(!t.alive)return;t.group.visible=!1,t.yaw=this.yaw,t.pitch=this.pitch;const r=new wt(Math.sin(this.yaw),0,Math.cos(this.yaw)),a=new wt(r.z,0,-r.x),l=new wt;this.keys.has("w")&&l.add(r),this.keys.has("s")&&l.sub(r),this.keys.has("d")&&l.add(a),this.keys.has("a")&&l.sub(a),l.lengthSq()&&(l.normalize().multiplyScalar(5.45*e),this.moveWithCollision(t,l.x,l.z),this.now-t.lastStep>.36&&(t.lastStep=this.now,this.sound.play("step"))),this.keys.has(" ")&&t.group.position.y<=.01&&(t.velocityY=5.7),t.velocityY-=15*e,t.group.position.y+=t.velocityY*e,t.group.position.y<0&&(t.group.position.y=0,t.velocityY=0),this.camera.position.copy(t.group.position).add(new wt(0,1.55,0)),this.camera.rotation.y=this.yaw,this.camera.rotation.x=this.pitch;const f=t.selected==="awp"&&this.rightDown,c=f?28:74;Math.abs(this.camera.fov-c)>.05&&(this.camera.fov=U_.lerp(this.camera.fov,c,.25),this.camera.updateProjectionMatrix()),f!==this.wasScoped&&(this.wasScoped=f,this.sound.play("scope")),this.viewModel.visible=!f,t.recoil=Math.max(0,t.recoil-e*5.2),this.viewModel.position.x=.46+Math.sin(this.now*2.2)*.006,this.viewModel.position.y=-.42+Math.sin(this.now*4.4)*.006,this.mouseDown&&this.fireFromPlayer(t),this.keys.has("e")&&this.tryInteract(t,e)}moveWithCollision(e,t,r){let l=e.group.position.x+t,f=e.group.position.z;for(const c of this.walls)Math.abs(l-c.x)<c.w/2+.36&&Math.abs(f-c.z)<c.d/2+.36&&(l=e.group.position.x<c.x?c.x-c.w/2-.36:c.x+c.w/2+.36);f=e.group.position.z+r;for(const c of this.walls)Math.abs(l-c.x)<c.w/2+.36&&Math.abs(f-c.z)<c.d/2+.36&&(f=e.group.position.z<c.z?c.z-c.d/2-.36:c.z+c.d/2+.36);e.group.position.x=qo(l,-56.2,56.2),e.group.position.z=qo(f,-56.2,56.2)}updateReloads(){for(const e of this.fighters)if(e.reloadingUntil&&this.now>=e.reloadingUntil&&e.reloadWeapon){const t=e.reloadWeapon,r=Tr[t],a=r.mag-e.ammo[t],l=Math.min(a,e.reserve[t]);e.ammo[t]+=l,e.reserve[t]-=l,e.reloadingUntil=0,e.reloadWeapon=null}}reload(e){const t=e.selected,r=Tr[t];!e.alive||t==="knife"||e.reloadingUntil||e.ammo[t]>=r.mag||e.reserve[t]<=0||(e.reloadingUntil=this.now+r.reload,e.reloadWeapon=t,this.sound.play("reload"))}switchSlot(e){const t=this.controlled();let r;e==="primary"&&(r=t.primary||void 0),e==="secondary"&&(r=t.secondary),e==="knife"&&(r="knife"),!(!r||t.selected===r)&&(t.selected=r,this.refreshViewGun(r),this.sound.play("scope"))}equipSpecial(e){const t=this.controlled();if(this.pistolRound&&e==="awp"){this.message="AWP UNAVAILABLE IN PISTOL ROUND",this.messageUntil=this.now+1.5;return}e==="awp"?t.primary="awp":t.secondary="deagle",t.selected=e,this.refreshViewGun(e),this.message=`EQUIPPED ${Tr[e].name}`,this.messageUntil=this.now+1.5}refreshViewGun(e){const t=this.viewModel.getObjectByName("view-gun");t&&this.viewModel.remove(t);const r=this.makeWorldGun(e);r.name="view-gun",r.scale.set(1.25,1.25,1.25),r.position.set(.03,.02,-.24),r.rotation.set(-.04,.1,0),e==="knife"&&(r.scale.set(.9,.9,.9),r.rotation.z=.7),this.viewModel.add(r)}fireFromPlayer(e){const t=new wt;this.camera.getWorldDirection(t);const r=Tr[e.selected].recoil*.004+e.recoil*.007;t.x+=(Math.random()-.5)*r,t.y+=(Math.random()-.5)*r,t.z+=(Math.random()-.5)*r,t.normalize();const a=this.camera.getWorldPosition(new wt);this.fire(e,a,t,!0)}fire(e,t,r,a=!1,l){const f=e.selected,c=Tr[f];if(!e.alive||this.now<e.nextShot||e.reloadingUntil)return;if(f==="knife"){const _=l||this.closestMelee(e,t,r);_&&(this.applyDamage(e,_,"chest",c.damage),this.makeTracer(t,_.group.position.clone().add(new wt(0,1.2,0)),13492207)),e.nextShot=this.now+c.delay,this.sound.play("knife");return}if(e.ammo[f]<=0){this.reload(e);return}e.ammo[f]--,e.nextShot=this.now+c.delay,e.recoil=Math.min(6,e.recoil+c.recoil),this.sound.play(c.sound);let h=t.clone().addScaledVector(r,c.range),m,g="chest";if(l)m=l,g=Math.random()<.12?"head":Math.random()<.22?"arm":Math.random()<.18?"leg":"chest",h=l.group.position.clone().add(new wt(0,g==="head"?1.7:1.2,0));else{this.tempRay.set(t,r),this.tempRay.far=c.range;const _=[...this.walls.map(S=>S.mesh),...this.fighters.filter(S=>S.alive&&S.id!==e.id).map(S=>S.group)],x=this.tempRay.intersectObjects(_,!0);if(x.length){h=x[0].point;const S=x[0].object.userData;S.combatantId&&(m=this.fighters.find(E=>E.id===S.combatantId),g=S.hitbox||"chest")}}this.makeTracer(t,h,c.sound==="awp"?16246973:16762986),m&&this.applyDamage(e,m,g,c.damage),a&&c.sound==="awp"&&(this.pitch+=.025)}closestMelee(e,t,r){return this.fighters.filter(a=>a.alive&&a.team!==e.team&&xn(a.group.position,t)<3.2&&r.dot(a.group.position.clone().add(new wt(0,1,0)).sub(t).normalize())>.4&&!this.blocked(t,a.group.position.clone().add(new wt(0,1,0)))).sort((a,l)=>xn(a.group.position,t)-xn(l.group.position,t))[0]}makeTracer(e,t,r){const a=new Wn().setFromPoints([e,t]),l=new Hg(a,new vd({color:r,transparent:!0,opacity:.9}));l.userData.life=.065,this.tracerGroup.add(l)}updateTracers(e){for(const t of[...this.tracerGroup.children]){const r=t;r.userData.life-=e,r.material.opacity=Math.max(0,r.userData.life*14),r.userData.life<=0&&(this.tracerGroup.remove(r),r.geometry.dispose(),r.material.dispose())}}applyDamage(e,t,r,a){if(!t.alive)return;let l=a*oT[r];if(t.armor>0&&r!=="leg"){const f=Math.min(t.armor,l*.45);t.armor-=Math.round(f),l-=f*.62}t.health-=Math.round(l),e.id===this.controlledId&&this.sound.play("hit"),!(t.health>0)&&(t.health=0,t.alive=!1,t.group.visible=!1,e.killCount++,this.sound.play("kill"),this.addFeed(`${e.name}  ${r==="head"?"◉":"✕"}  ${t.name}`,e.team),t.c4&&(t.c4=!1,this.bomb.carrier=null,this.bomb.pos.copy(t.group.position),this.bomb.pos.y=.04,this.bombMesh.position.copy(this.bomb.pos),this.bombMesh.visible=!0,this.message="C4 DROPPED",this.messageUntil=this.now+2),t.id===this.controlledId&&(this.message="YOU ARE DOWN — PRESS Q TO TAKE OVER"))}addFeed(e,t){this.feeds.unshift({text:e,team:t==="CT"?"ct":"t"}),this.feeds=this.feeds.slice(0,5)}updateAI(e,t){const r=this.findVisibleEnemy(e);if(r){e.targetId=r.id;const f=r.group.position.clone().sub(e.group.position),c=Math.atan2(f.x,f.z);e.yaw=og(e.yaw,c,t*6),e.group.rotation.y=e.yaw;const h=xn(e.group.position,r.group.position);h>7&&this.moveAI(e,r.group.position,t,.72);const m=e.group.position.clone().add(new wt(0,1.45,0)),g=r.group.position.clone().add(new wt(0,1.3,0)).sub(m).normalize();h<Tr[e.selected].range*.72&&Math.abs(Math.atan2(Math.sin(c-e.yaw),Math.cos(c-e.yaw)))<.35&&this.fire(e,m,g,!1,r);return}e.targetId=null;let a,l="";if(this.bomb.planted)e.team==="CT"?(a=this.bomb.pos,l="DEFUSE"):(a=this.bomb.pos.clone().add(new wt(Number(e.id.slice(1))%2?4:-4,0,3)),l="HOLD");else if(e.team==="T"&&this.bomb.carrier===null)a=this.bomb.pos,l="RECOVER C4";else if(e.team==="T"&&e.c4){const f=e.id==="t0"||e.id==="t2"?new wt(-35,0,-18):new wt(36,0,-18);a=f,l=f.x<0?"A SITE":"B SITE"}else if(e.team==="T"){const f=this.fighters.find(c=>c.c4);a=f?f.group.position.clone():new wt(-35,0,-18),l="ESCORT"}else a=[new wt(27,0,5),new wt(-10,0,-7),new wt(36,0,-17),new wt(-35,0,-18)][Number(e.id.slice(2))%4],l="HOLD";this.moveAI(e,a,t,1),this.now-e.lastThink>1&&(e.lastThink=this.now,e.navGoal=l)}findVisibleEnemy(e){let t,r=999;for(const a of this.fighters)if(a.alive&&a.team!==e.team){const l=xn(e.group.position,a.group.position);l<44&&l<r&&this.canSee(e,a)&&(t=a,r=l)}return t}canSee(e,t){const r=e.group.position.clone().add(new wt(0,1.47,0)),a=t.group.position.clone().add(new wt(0,1.3,0));return!this.blocked(r,a)}blocked(e,t){const r=t.clone().sub(e),a=r.length();return r.normalize(),this.tempRay.set(e,r),this.tempRay.far=Math.max(0,a-.25),this.tempRay.intersectObjects(this.walls.map(l=>l.mesh),!1).length>0}moveAI(e,t,r,a){const l=`${Math.round(t.x)}:${Math.round(t.z)}`;(e.navGoal!==l||!e.navPath.length)&&(e.navPath=this.pathBetween(e.group.position,t),e.navIndex=0,e.navGoal=l);let f=e.navPath[e.navIndex]||t;xn(e.group.position,f)<1.15&&e.navIndex<e.navPath.length-1&&(e.navIndex++,f=e.navPath[e.navIndex]);const c=f.clone().sub(e.group.position);if(c.y=0,c.lengthSq()<.08)return;c.normalize();const h=Math.atan2(c.x,c.z);e.yaw=og(e.yaw,h,r*5),e.group.rotation.y=e.yaw,this.moveWithCollision(e,c.x*3.55*r*a,c.z*3.55*r*a),this.now-e.lastStep>.52&&(e.lastStep=this.now,this.sound.play("step"))}pathBetween(e,t){const r=Object.entries(this.nodeGraph),a=_=>r.reduce((x,[S,E])=>xn(_,new wt(E.x,0,E.z))<xn(_,new wt(this.nodeGraph[x].x,0,this.nodeGraph[x].z))?S:x,r[0][0]),l=a(e),f=a(t),c={[l]:void 0},h=[l];for(let _=0;_<h.length;_++){const x=h[_];if(x===f)break;for(const S of this.nodeGraph[x].links)S in c||(c[S]=x,h.push(S))}const m=[];let g=f;for(;g;)m.unshift(g),g=c[g];return m.map(_=>new wt(this.nodeGraph[_].x,0,this.nodeGraph[_].z)).concat([t.clone()])}updateBomb(e){if(this.bomb.planted){this.bomb.timer-=e,this.bombMesh.visible=!0,this.bombMesh.position.copy(this.bomb.pos),this.bombMesh.rotation.y+=e*3;const t=.3+Math.max(0,1-this.bomb.timer/40)*.4;this.bombMesh.visible=Math.sin(this.now*10)>-.8||t>.55;let r;const a=this.controlled();a.alive&&a.team==="CT"&&xn(a.group.position,this.bomb.pos)<3&&this.keys.has("e")?r=a:r=this.fighters.filter(l=>l.alive&&l.ai&&l.team==="CT"&&xn(l.group.position,this.bomb.pos)<2.6).sort((l,f)=>xn(l.group.position,this.bomb.pos)-xn(f.group.position,this.bomb.pos))[0],r?(this.bomb.defuser=r.id,this.bomb.defuse+=e,Math.floor((this.bomb.defuse-e)*2)!==Math.floor(this.bomb.defuse*2)&&this.sound.play("defuse"),this.bomb.defuse>=6&&(this.bombMesh.visible=!1,this.addFeed(`${r.name} DEFUSED THE C4`,"CT"),this.endRound("CT","C4 DEFUSED"))):(this.bomb.defuser=null,this.bomb.defuse=Math.max(0,this.bomb.defuse-e*1.8)),this.bomb.timer<=0&&(this.sound.play("boom"),this.bombMesh.visible=!1,this.addFeed("C4 EXPLODED","T"),this.endRound("T","C4 DETONATED"))}else{if(this.bomb.carrier===null){const r=this.fighters.find(a=>a.alive&&a.team==="T"&&xn(a.group.position,this.bomb.pos)<1.5);r&&(r.c4=!0,this.bomb.carrier=r.id,this.bombMesh.visible=!1,this.message=`${r.name} RECOVERED C4`,this.messageUntil=this.now+1.5)}const t=this.fighters.find(r=>r.id===this.bomb.carrier);if(t&&t.alive){const r=xn(t.group.position,new wt(-35,0,-18))<8,a=xn(t.group.position,new wt(36,0,-18))<8,l=t.ai||t.id===this.controlledId&&this.keys.has("e");(r||a)&&l?(this.bomb.plant+=e,Math.floor((this.bomb.plant-e)*2)!==Math.floor(this.bomb.plant*2)&&this.sound.play("plant"),this.bomb.plant>=2.8&&this.plantBomb(t)):this.bomb.plant=Math.max(0,this.bomb.plant-e*2)}}}plantBomb(e){this.bomb.planted=!0,this.bomb.carrier=null,e.c4=!1,this.bomb.pos.copy(e.group.position),this.bomb.pos.y=.04,this.bomb.timer=40,this.bomb.plant=0,this.bombMesh.visible=!0,this.bombMesh.position.copy(this.bomb.pos),this.sound.play("plant"),this.addFeed(`${e.name} PLANTED THE C4`,"T"),this.message="BOMB PLANTED — CT MUST DEFUSE",this.messageUntil=this.now+3}tryInteract(e,t){e.team==="T"&&e.c4&&!this.bomb.planted||e.team==="CT"&&this.bomb.planted&&xn(e.group.position,this.bomb.pos)<3&&(this.message="DEFUSING C4…",this.messageUntil=this.now+.3)}checkRound(e){if(this.phase!=="live")return;const t=this.fighters.filter(a=>a.alive&&a.team==="T").length;if(this.fighters.filter(a=>a.alive&&a.team==="CT").length===0){this.endRound("T","COUNTER-TERRORISTS ELIMINATED");return}if(t===0&&!this.bomb.planted){this.endRound("CT","TERRORISTS ELIMINATED");return}this.bomb.planted||(this.roundTimer-=e,this.roundTimer<=0&&this.endRound("CT","TIME EXPIRED"))}endRound(e,t){this.phase!=="ended"&&(this.phase="ended",this.nextRound=this.now+4.5,this.message=`${e} WIN — ${t}`,this.messageUntil=this.nextRound,this.addFeed(`${e} WIN // ${t}`,e),this.mouseDown=!1)}resetRound(e){this.phase="live",e||(this.round++,this.pistolRound=this.round===1),this.roundTimer=115,this.controlledId=this.playerOrigin,this.yaw=Math.PI,this.pitch=-.08,this.feeds=[];for(const r of this.fighters){r.health=100,r.armor=this.pistolRound?0:100,r.alive=!0,r.velocityY=0,r.group.position.copy(r.spawn),r.group.rotation.y=r.team==="CT"?Math.PI:0,r.group.visible=r.id!==this.controlledId,r.c4=!1,r.primary=this.pistolRound?null:r.team==="CT"?"m4":"ak",r.secondary=r.team==="CT"?"usp":"glock",r.selected=r.primary||r.secondary,r.nextShot=0,r.reloadingUntil=0,r.reloadWeapon=null,r.recoil=0,r.navPath=[],r.navGoal="",r.ammo={},r.reserve={};for(const[a,l]of Object.entries(Tr))r.ammo[a]=l.mag,r.reserve[a]=l.reserve}if(!this.pistolRound){const r=this.fighters.find(l=>l.id==="t3");r&&(r.primary="awp",r.selected="awp");const a=this.fighters.find(l=>l.id==="ct2");a&&(a.secondary="deagle")}const t=this.fighters.find(r=>r.id==="t0");t.c4=!0,this.bomb={carrier:t.id,pos:t.group.position.clone(),planted:!1,timer:0,plant:0,defuse:0,defuser:null},this.bombMesh.visible=!1,this.refreshViewGun(this.controlled().selected),this.message=this.pistolRound?"PISTOL ROUND // DEFAULT SIDEARMS ONLY":"BUY COMPLETE // RIFLE ROUND",this.messageUntil=this.now+4}takeOver(){const e=this.controlled(),t=this.fighters.filter(l=>l.alive&&l.team===e.team);if(!t.length)return;let r=t.findIndex(l=>l.id===e.id);r=(r+1)%t.length;const a=t[r];if(!(a.id===e.id&&e.alive)){for(const l of this.fighters)l.id===this.controlledId&&(l.group.visible=l.alive);this.controlledId=a.id,a.group.visible=!1,this.yaw=a.yaw,this.pitch=0,this.refreshViewGun(a.selected),this.message=`TAKEOVER // ${a.name}`,this.messageUntil=this.now+1.5}}publishHUD(){const e=this.controlled(),t=Tr[e.selected],r=m=>({x:qo((m.x+58)/116*100,1,99),z:qo((58-m.z)/116*100,1,99)}),a=this.fighters.filter(m=>m.alive&&m.team===e.team).map(m=>({id:m.id,...r(m.group.position),team:m.team,isSelf:m.id===e.id})),l=this.fighters.filter(m=>m.alive&&m.team!==e.team&&e.alive&&this.canSee(e,m)).map(m=>({id:m.id,...r(m.group.position),team:m.team})),f=this.fighters.find(m=>m.id===this.bomb.carrier),c=this.bomb.planted||!f?this.bomb.pos:f.group.position,h=this.bomb.planted?"C4 ARMED":this.bomb.carrier?"T 已持包":"C4 DROPPED";this.emit({health:e.health,armor:e.armor,ammo:e.ammo[e.selected],reserve:e.reserve[e.selected],weapon:t.name,weaponKind:t.slot,round:this.round,roundTime:this.roundTimer,phase:this.phase==="live"?"LIVE FIRE":"ROUND COMPLETE",team:e.team,controlledName:e.name,alive:e.alive,bomb:h,bombTimer:this.bomb.planted?this.bomb.timer:0,feed:this.feeds,players:this.fighters.filter(m=>m.team===e.team).map(m=>({id:m.id,name:m.name,team:m.team,hp:m.health,alive:m.alive})),message:this.now<this.messageUntil?this.message:"",scope:e.selected==="awp"&&this.rightDown&&e.alive,minimap:a,visibleEnemies:l,bombPoint:r(c),crosshair:e.recoil*4+(e.selected==="awp"&&this.rightDown?0:1),objective:this.objectiveFor(e),reload:e.reloadingUntil?Math.max(0,e.reloadingUntil-this.now):0})}objectiveFor(e){return this.bomb.planted?e.team==="CT"?"GET TO C4 — HOLD E TO DEFUSE":"DEFEND THE ARMED C4":e.team==="T"?e.c4?"ENTER A OR B — HOLD E TO PLANT":this.bomb.carrier?"ESCORT THE C4 CARRIER":"RECOVER THE DROPPED C4":"STOP THE T SIDE — PROTECT BOTH SITES"}}const uT={health:100,armor:100,ammo:12,reserve:48,weapon:"USP-S",weaponKind:"pistol",round:1,roundTime:115,phase:"准备中",team:"CT",controlledName:"YOU",alive:!0,bomb:"T 已持包",bombTimer:0,feed:[],players:[],message:"点击进入战场",scope:!1,bombPoint:{x:50,z:9},minimap:[],visibleEnemies:[],crosshair:0,objective:"阻止 T 安放 C4",reload:0};function cT(){const s=cl.useRef(null),e=cl.useRef(null),[t,r]=cl.useState(uT);cl.useEffect(()=>{if(!s.current)return;const l=new lT(s.current,r);return e.current=l,()=>l.dispose()},[]);const a=()=>{var l;return(l=e.current)==null?void 0:l.lock()};return Xe.jsxs("main",{onClick:a,children:[Xe.jsx("div",{ref:s,className:"viewport"}),Xe.jsxs("div",{className:`overlay ${t.scope?"scoped":""}`,children:[t.scope&&Xe.jsxs("div",{className:"scope",children:[Xe.jsx("i",{}),Xe.jsx("b",{}),Xe.jsx("em",{})]}),Xe.jsxs("div",{className:"topbar",children:[Xe.jsxs("div",{className:"brand",children:["DUST//PROTOCOL ",Xe.jsx("span",{children:"PROCEDURAL ARENA"})]}),Xe.jsxs("div",{className:"round",children:[Xe.jsxs("strong",{children:["ROUND ",t.round]}),Xe.jsx("span",{children:fT(t.roundTime)}),Xe.jsx("small",{children:t.phase})]}),Xe.jsx("div",{className:"feed",children:t.feed.map((l,f)=>Xe.jsx("div",{className:l.team,children:l.text},`${l.text}${f}`))})]}),Xe.jsxs("div",{className:"radar",children:[Xe.jsx("div",{className:"radar-title",children:"DUST2 // TACTICAL MAP"}),Xe.jsxs("div",{className:"radar-map",children:[Xe.jsx("span",{className:"map-zone t",children:"T SPAWN"}),Xe.jsx("span",{className:"map-zone a",children:"A SITE"}),Xe.jsx("span",{className:"map-zone m",children:"MID / DOORS"}),Xe.jsx("span",{className:"map-zone b",children:"B SITE"}),Xe.jsx("span",{className:"map-zone c",children:"CT SPAWN"}),t.minimap.map(l=>Xe.jsx("i",{className:`dot ${l.team.toLowerCase()} ${l.isSelf?"self":""}`,style:{left:`${l.x}%`,top:`${l.z}%`}},l.id)),t.visibleEnemies.map(l=>Xe.jsx("i",{className:"dot enemy",style:{left:`${l.x}%`,top:`${l.z}%`}},l.id)),t.bombPoint&&Xe.jsx("i",{className:"bomb-dot",style:{left:`${t.bombPoint.x}%`,top:`${t.bombPoint.z}%`},children:"C4"})]})]}),Xe.jsxs("div",{className:"objective",children:[Xe.jsx("b",{children:"OBJECTIVE"}),Xe.jsx("span",{children:t.objective}),t.bombTimer>0&&Xe.jsx("progress",{max:"40",value:t.bombTimer})]}),Xe.jsxs("div",{className:"crosshair",style:{transform:`scale(${1+t.crosshair/24})`},children:[Xe.jsx("i",{}),Xe.jsx("i",{}),Xe.jsx("i",{}),Xe.jsx("i",{})]}),Xe.jsxs("div",{className:"bottom",children:[Xe.jsxs("div",{className:"vitals",children:[Xe.jsxs("div",{children:[Xe.jsx("small",{children:"HEALTH"}),Xe.jsx("b",{children:Math.max(0,t.health)})]}),Xe.jsxs("div",{children:[Xe.jsx("small",{children:"ARMOR"}),Xe.jsx("b",{children:t.armor})]})]}),Xe.jsxs("div",{className:"status",children:[Xe.jsxs("span",{children:[t.controlledName,!t.alive&&" // SPECTATING"]}),Xe.jsx("b",{children:t.team})]}),Xe.jsxs("div",{className:"weapon",children:[Xe.jsxs("div",{className:"ammo",children:[Xe.jsx("b",{children:t.ammo}),Xe.jsxs("span",{children:["/ ",t.reserve]})]}),Xe.jsx("strong",{children:t.weapon}),Xe.jsx("small",{children:t.reload?"RELOADING…":t.weaponKind.toUpperCase()})]})]}),Xe.jsx("div",{className:"team-panel",children:t.players.map(l=>Xe.jsxs("div",{className:`${l.team.toLowerCase()} ${l.alive?"":"dead"}`,children:[Xe.jsx("i",{}),l.name,Xe.jsx("span",{children:l.hp})]},l.id))}),Xe.jsx("div",{className:"help",children:"CLICK: LOCK AIM   ·   WASD MOVE   SPACE JUMP   LMB FIRE   RMB SCOPE   R RELOAD   1 / 2 / 3 SWITCH   4 AWP   5 DEAGLE   E PLANT / DEFUSE   Q TAKE OVER"}),t.message&&Xe.jsx("div",{className:"message",children:t.message})]})]})}function fT(s){const e=Math.max(0,Math.ceil(s));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}L0.createRoot(document.getElementById("root")).render(Xe.jsx(cT,{}));
