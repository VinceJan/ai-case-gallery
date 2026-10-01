var Wv=Object.defineProperty;var Xv=(s,e,t)=>e in s?Wv(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var Qe=(s,e,t)=>Xv(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function Lg(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Xu={exports:{}},jo={},ju={exports:{}},mt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dm;function jv(){if(dm)return mt;dm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),_=Symbol.iterator;function g(O){return O===null||typeof O!="object"?null:(O=_&&O[_]||O["@@iterator"],typeof O=="function"?O:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,T={};function y(O,re,Be){this.props=O,this.context=re,this.refs=T,this.updater=Be||S}y.prototype.isReactComponent={},y.prototype.setState=function(O,re){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,re,"setState")},y.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function v(){}v.prototype=y.prototype;function F(O,re,Be){this.props=O,this.context=re,this.refs=T,this.updater=Be||S}var P=F.prototype=new v;P.constructor=F,E(P,y.prototype),P.isPureReactComponent=!0;var C=Array.isArray,N=Object.prototype.hasOwnProperty,U={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function j(O,re,Be){var ke,Q={},me=null,pe=null;if(re!=null)for(ke in re.ref!==void 0&&(pe=re.ref),re.key!==void 0&&(me=""+re.key),re)N.call(re,ke)&&!k.hasOwnProperty(ke)&&(Q[ke]=re[ke]);var Ce=arguments.length-2;if(Ce===1)Q.children=Be;else if(1<Ce){for(var Le=Array(Ce),Ze=0;Ze<Ce;Ze++)Le[Ze]=arguments[Ze+2];Q.children=Le}if(O&&O.defaultProps)for(ke in Ce=O.defaultProps,Ce)Q[ke]===void 0&&(Q[ke]=Ce[ke]);return{$$typeof:s,type:O,key:me,ref:pe,props:Q,_owner:U.current}}function b(O,re){return{$$typeof:s,type:O.type,key:re,ref:O.ref,props:O.props,_owner:O._owner}}function R(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function I(O){var re={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(Be){return re[Be]})}var ie=/\/+/g;function te(O,re){return typeof O=="object"&&O!==null&&O.key!=null?I(""+O.key):re.toString(36)}function se(O,re,Be,ke,Q){var me=typeof O;(me==="undefined"||me==="boolean")&&(O=null);var pe=!1;if(O===null)pe=!0;else switch(me){case"string":case"number":pe=!0;break;case"object":switch(O.$$typeof){case s:case e:pe=!0}}if(pe)return pe=O,Q=Q(pe),O=ke===""?"."+te(pe,0):ke,C(Q)?(Be="",O!=null&&(Be=O.replace(ie,"$&/")+"/"),se(Q,re,Be,"",function(Ze){return Ze})):Q!=null&&(R(Q)&&(Q=b(Q,Be+(!Q.key||pe&&pe.key===Q.key?"":(""+Q.key).replace(ie,"$&/")+"/")+O)),re.push(Q)),1;if(pe=0,ke=ke===""?".":ke+":",C(O))for(var Ce=0;Ce<O.length;Ce++){me=O[Ce];var Le=ke+te(me,Ce);pe+=se(me,re,Be,Le,Q)}else if(Le=g(O),typeof Le=="function")for(O=Le.call(O),Ce=0;!(me=O.next()).done;)me=me.value,Le=ke+te(me,Ce++),pe+=se(me,re,Be,Le,Q);else if(me==="object")throw re=String(O),Error("Objects are not valid as a React child (found: "+(re==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":re)+"). If you meant to render a collection of children, use an array instead.");return pe}function de(O,re,Be){if(O==null)return O;var ke=[],Q=0;return se(O,ke,"","",function(me){return re.call(Be,me,Q++)}),ke}function ae(O){if(O._status===-1){var re=O._result;re=re(),re.then(function(Be){(O._status===0||O._status===-1)&&(O._status=1,O._result=Be)},function(Be){(O._status===0||O._status===-1)&&(O._status=2,O._result=Be)}),O._status===-1&&(O._status=0,O._result=re)}if(O._status===1)return O._result.default;throw O._result}var fe={current:null},V={transition:null},ce={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:V,ReactCurrentOwner:U};function oe(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:de,forEach:function(O,re,Be){de(O,function(){re.apply(this,arguments)},Be)},count:function(O){var re=0;return de(O,function(){re++}),re},toArray:function(O){return de(O,function(re){return re})||[]},only:function(O){if(!R(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},mt.Component=y,mt.Fragment=t,mt.Profiler=o,mt.PureComponent=F,mt.StrictMode=r,mt.Suspense=h,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ce,mt.act=oe,mt.cloneElement=function(O,re,Be){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var ke=E({},O.props),Q=O.key,me=O.ref,pe=O._owner;if(re!=null){if(re.ref!==void 0&&(me=re.ref,pe=U.current),re.key!==void 0&&(Q=""+re.key),O.type&&O.type.defaultProps)var Ce=O.type.defaultProps;for(Le in re)N.call(re,Le)&&!k.hasOwnProperty(Le)&&(ke[Le]=re[Le]===void 0&&Ce!==void 0?Ce[Le]:re[Le])}var Le=arguments.length-2;if(Le===1)ke.children=Be;else if(1<Le){Ce=Array(Le);for(var Ze=0;Ze<Le;Ze++)Ce[Ze]=arguments[Ze+2];ke.children=Ce}return{$$typeof:s,type:O.type,key:Q,ref:me,props:ke,_owner:pe}},mt.createContext=function(O){return O={$$typeof:u,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:l,_context:O},O.Consumer=O},mt.createElement=j,mt.createFactory=function(O){var re=j.bind(null,O);return re.type=O,re},mt.createRef=function(){return{current:null}},mt.forwardRef=function(O){return{$$typeof:f,render:O}},mt.isValidElement=R,mt.lazy=function(O){return{$$typeof:x,_payload:{_status:-1,_result:O},_init:ae}},mt.memo=function(O,re){return{$$typeof:p,type:O,compare:re===void 0?null:re}},mt.startTransition=function(O){var re=V.transition;V.transition={};try{O()}finally{V.transition=re}},mt.unstable_act=oe,mt.useCallback=function(O,re){return fe.current.useCallback(O,re)},mt.useContext=function(O){return fe.current.useContext(O)},mt.useDebugValue=function(){},mt.useDeferredValue=function(O){return fe.current.useDeferredValue(O)},mt.useEffect=function(O,re){return fe.current.useEffect(O,re)},mt.useId=function(){return fe.current.useId()},mt.useImperativeHandle=function(O,re,Be){return fe.current.useImperativeHandle(O,re,Be)},mt.useInsertionEffect=function(O,re){return fe.current.useInsertionEffect(O,re)},mt.useLayoutEffect=function(O,re){return fe.current.useLayoutEffect(O,re)},mt.useMemo=function(O,re){return fe.current.useMemo(O,re)},mt.useReducer=function(O,re,Be){return fe.current.useReducer(O,re,Be)},mt.useRef=function(O){return fe.current.useRef(O)},mt.useState=function(O){return fe.current.useState(O)},mt.useSyncExternalStore=function(O,re,Be){return fe.current.useSyncExternalStore(O,re,Be)},mt.useTransition=function(){return fe.current.useTransition()},mt.version="18.3.1",mt}var hm;function Sd(){return hm||(hm=1,ju.exports=jv()),ju.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pm;function Yv(){if(pm)return jo;pm=1;var s=Sd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,p){var x,_={},g=null,S=null;p!==void 0&&(g=""+p),h.key!==void 0&&(g=""+h.key),h.ref!==void 0&&(S=h.ref);for(x in h)r.call(h,x)&&!l.hasOwnProperty(x)&&(_[x]=h[x]);if(f&&f.defaultProps)for(x in h=f.defaultProps,h)_[x]===void 0&&(_[x]=h[x]);return{$$typeof:e,type:f,key:g,ref:S,props:_,_owner:o.current}}return jo.Fragment=t,jo.jsx=u,jo.jsxs=u,jo}var mm;function qv(){return mm||(mm=1,Xu.exports=Yv()),Xu.exports}var Z=qv(),$i=Sd();const $v=Lg($i);var Ml={},Yu={exports:{}},Bn={},qu={exports:{}},$u={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gm;function Kv(){return gm||(gm=1,(function(s){function e(V,ce){var oe=V.length;V.push(ce);e:for(;0<oe;){var O=oe-1>>>1,re=V[O];if(0<o(re,ce))V[O]=ce,V[oe]=re,oe=O;else break e}}function t(V){return V.length===0?null:V[0]}function r(V){if(V.length===0)return null;var ce=V[0],oe=V.pop();if(oe!==ce){V[0]=oe;e:for(var O=0,re=V.length,Be=re>>>1;O<Be;){var ke=2*(O+1)-1,Q=V[ke],me=ke+1,pe=V[me];if(0>o(Q,oe))me<re&&0>o(pe,Q)?(V[O]=pe,V[me]=oe,O=me):(V[O]=Q,V[ke]=oe,O=ke);else if(me<re&&0>o(pe,oe))V[O]=pe,V[me]=oe,O=me;else break e}}return ce}function o(V,ce){var oe=V.sortIndex-ce.sortIndex;return oe!==0?oe:V.id-ce.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],p=[],x=1,_=null,g=3,S=!1,E=!1,T=!1,y=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function P(V){for(var ce=t(p);ce!==null;){if(ce.callback===null)r(p);else if(ce.startTime<=V)r(p),ce.sortIndex=ce.expirationTime,e(h,ce);else break;ce=t(p)}}function C(V){if(T=!1,P(V),!E)if(t(h)!==null)E=!0,ae(N);else{var ce=t(p);ce!==null&&fe(C,ce.startTime-V)}}function N(V,ce){E=!1,T&&(T=!1,v(j),j=-1),S=!0;var oe=g;try{for(P(ce),_=t(h);_!==null&&(!(_.expirationTime>ce)||V&&!I());){var O=_.callback;if(typeof O=="function"){_.callback=null,g=_.priorityLevel;var re=O(_.expirationTime<=ce);ce=s.unstable_now(),typeof re=="function"?_.callback=re:_===t(h)&&r(h),P(ce)}else r(h);_=t(h)}if(_!==null)var Be=!0;else{var ke=t(p);ke!==null&&fe(C,ke.startTime-ce),Be=!1}return Be}finally{_=null,g=oe,S=!1}}var U=!1,k=null,j=-1,b=5,R=-1;function I(){return!(s.unstable_now()-R<b)}function ie(){if(k!==null){var V=s.unstable_now();R=V;var ce=!0;try{ce=k(!0,V)}finally{ce?te():(U=!1,k=null)}}else U=!1}var te;if(typeof F=="function")te=function(){F(ie)};else if(typeof MessageChannel<"u"){var se=new MessageChannel,de=se.port2;se.port1.onmessage=ie,te=function(){de.postMessage(null)}}else te=function(){y(ie,0)};function ae(V){k=V,U||(U=!0,te())}function fe(V,ce){j=y(function(){V(s.unstable_now())},ce)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(V){V.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,ae(N))},s.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<V?Math.floor(1e3/V):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_getFirstCallbackNode=function(){return t(h)},s.unstable_next=function(V){switch(g){case 1:case 2:case 3:var ce=3;break;default:ce=g}var oe=g;g=ce;try{return V()}finally{g=oe}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(V,ce){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var oe=g;g=V;try{return ce()}finally{g=oe}},s.unstable_scheduleCallback=function(V,ce,oe){var O=s.unstable_now();switch(typeof oe=="object"&&oe!==null?(oe=oe.delay,oe=typeof oe=="number"&&0<oe?O+oe:O):oe=O,V){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=oe+re,V={id:x++,callback:ce,priorityLevel:V,startTime:oe,expirationTime:re,sortIndex:-1},oe>O?(V.sortIndex=oe,e(p,V),t(h)===null&&V===t(p)&&(T?(v(j),j=-1):T=!0,fe(C,oe-O))):(V.sortIndex=re,e(h,V),E||S||(E=!0,ae(N))),V},s.unstable_shouldYield=I,s.unstable_wrapCallback=function(V){var ce=g;return function(){var oe=g;g=ce;try{return V.apply(this,arguments)}finally{g=oe}}}})($u)),$u}var vm;function Zv(){return vm||(vm=1,qu.exports=Kv()),qu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _m;function Qv(){if(_m)return Bn;_m=1;var s=Sd(),e=Zv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,x={},_={};function g(n){return h.call(_,n)?!0:h.call(x,n)?!1:p.test(n)?_[n]=!0:(x[n]=!0,!1)}function S(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,a,c){if(i===null||typeof i>"u"||S(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function T(n,i,a,c,d,m,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=M}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new T(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];y[i]=new T(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new T(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new T(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new T(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new T(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new T(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new T(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new T(n,5,!1,n.toLowerCase(),null,!1,!1)});var v=/[\-:]([a-z])/g;function F(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(v,F);y[i]=new T(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(v,F);y[i]=new T(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(v,F);y[i]=new T(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new T(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new T("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new T(n,1,!1,n.toLowerCase(),null,!0,!0)});function P(n,i,a,c){var d=y.hasOwnProperty(i)?y[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,a,d,c)&&(a=null),c||d===null?g(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(i=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(i):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,N=Symbol.for("react.element"),U=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),I=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),te=Symbol.for("react.suspense"),se=Symbol.for("react.suspense_list"),de=Symbol.for("react.memo"),ae=Symbol.for("react.lazy"),fe=Symbol.for("react.offscreen"),V=Symbol.iterator;function ce(n){return n===null||typeof n!="object"?null:(n=V&&n[V]||n["@@iterator"],typeof n=="function"?n:null)}var oe=Object.assign,O;function re(n){if(O===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);O=i&&i[1]||""}return`
`+O+n}var Be=!1;function ke(n,i){if(!n||Be)return"";Be=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(J){var c=J}Reflect.construct(n,[],i)}else{try{i.call()}catch(J){c=J}n.call(i.prototype)}else{try{throw Error()}catch(J){c=J}n()}}catch(J){if(J&&c&&typeof J.stack=="string"){for(var d=J.stack.split(`
`),m=c.stack.split(`
`),M=d.length-1,D=m.length-1;1<=M&&0<=D&&d[M]!==m[D];)D--;for(;1<=M&&0<=D;M--,D--)if(d[M]!==m[D]){if(M!==1||D!==1)do if(M--,D--,0>D||d[M]!==m[D]){var z=`
`+d[M].replace(" at new "," at ");return n.displayName&&z.includes("<anonymous>")&&(z=z.replace("<anonymous>",n.displayName)),z}while(1<=M&&0<=D);break}}}finally{Be=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?re(n):""}function Q(n){switch(n.tag){case 5:return re(n.type);case 16:return re("Lazy");case 13:return re("Suspense");case 19:return re("SuspenseList");case 0:case 2:case 15:return n=ke(n.type,!1),n;case 11:return n=ke(n.type.render,!1),n;case 1:return n=ke(n.type,!0),n;default:return""}}function me(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case k:return"Fragment";case U:return"Portal";case b:return"Profiler";case j:return"StrictMode";case te:return"Suspense";case se:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case I:return(n.displayName||"Context")+".Consumer";case R:return(n._context.displayName||"Context")+".Provider";case ie:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case de:return i=n.displayName||null,i!==null?i:me(n.type)||"Memo";case ae:i=n._payload,n=n._init;try{return me(n(i))}catch{}}return null}function pe(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return me(i);case 8:return i===j?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Ce(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Le(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ze(n){var i=Le(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,m=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(M){c=""+M,m.call(this,M)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(M){c=""+M},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function zt(n){n._valueTracker||(n._valueTracker=Ze(n))}function _t(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=Le(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function B(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Ct(n,i){var a=i.checked;return oe({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Je(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=Ce(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function St(n,i){i=i.checked,i!=null&&P(n,"checked",i,!1)}function $e(n,i){St(n,i);var a=Ce(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Fe(n,i.type,a):i.hasOwnProperty("defaultValue")&&Fe(n,i.type,Ce(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Ot(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function Fe(n,i,a){(i!=="number"||B(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var ct=Array.isArray;function Vt(n,i,a,c){if(n=n.options,i){i={};for(var d=0;d<a.length;d++)i["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=i.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Ce(a),i=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function Gt(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return oe({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function L(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(ct(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Ce(a)}}function w(n,i){var a=Ce(i.value),c=Ce(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function $(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function ue(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _e(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?ue(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var le,Ye=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(le=le||document.createElement("div"),le.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=le.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function we(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var ze={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qe=["Webkit","ms","Moz","O"];Object.keys(ze).forEach(function(n){qe.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),ze[i]=ze[n]})});function Ee(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||ze.hasOwnProperty(n)&&ze[n]?(""+i).trim():i+"px"}function De(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=Ee(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var rt=oe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xe(n,i){if(i){if(rt[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Re(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ut=null;function G(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Se=null,Ae=null,Ie=null;function ye(n){if(n=Lo(n)){if(typeof Se!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Oa(i),Se(n.stateNode,n.type,i))}}function he(n){Ae?Ie?Ie.push(n):Ie=[n]:Ae=n}function Ge(){if(Ae){var n=Ae,i=Ie;if(Ie=Ae=null,ye(n),i)for(n=0;n<i.length;n++)ye(i[n])}}function lt(n,i){return n(i)}function bt(){}var Mt=!1;function ei(n,i,a){if(Mt)return n(i,a);Mt=!0;try{return lt(n,i,a)}finally{Mt=!1,(Ae!==null||Ie!==null)&&(bt(),Ge())}}function mn(n,i){var a=n.stateNode;if(a===null)return null;var c=Oa(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var cs=!1;if(f)try{var Gn={};Object.defineProperty(Gn,"passive",{get:function(){cs=!0}}),window.addEventListener("test",Gn,Gn),window.removeEventListener("test",Gn,Gn)}catch{cs=!1}function po(n,i,a,c,d,m,M,D,z){var J=Array.prototype.slice.call(arguments,3);try{i.apply(a,J)}catch(ve){this.onError(ve)}}var Ji=!1,Lr=null,Ii=!1,us=null,fs={onError:function(n){Ji=!0,Lr=n}};function ga(n,i,a,c,d,m,M,D,z){Ji=!1,Lr=null,po.apply(fs,arguments)}function va(n,i,a,c,d,m,M,D,z){if(ga.apply(this,arguments),Ji){if(Ji){var J=Lr;Ji=!1,Lr=null}else throw Error(t(198));Ii||(Ii=!0,us=J)}}function Ui(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function _a(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function xa(n){if(Ui(n)!==n)throw Error(t(188))}function pc(n){var i=n.alternate;if(!i){if(i=Ui(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var d=a.return;if(d===null)break;var m=d.alternate;if(m===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===m.child){for(m=d.child;m;){if(m===a)return xa(d),n;if(m===c)return xa(d),i;m=m.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=m;else{for(var M=!1,D=d.child;D;){if(D===a){M=!0,a=d,c=m;break}if(D===c){M=!0,c=d,a=m;break}D=D.sibling}if(!M){for(D=m.child;D;){if(D===a){M=!0,a=m,c=d;break}if(D===c){M=!0,c=m,a=d;break}D=D.sibling}if(!M)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function ya(n){return n=pc(n),n!==null?Sa(n):null}function Sa(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=Sa(n);if(i!==null)return i;n=n.sibling}return null}var A=e.unstable_scheduleCallback,Y=e.unstable_cancelCallback,ee=e.unstable_shouldYield,ne=e.unstable_requestPaint,W=e.unstable_now,Me=e.unstable_getCurrentPriorityLevel,be=e.unstable_ImmediatePriority,He=e.unstable_UserBlockingPriority,Ue=e.unstable_NormalPriority,it=e.unstable_LowPriority,st=e.unstable_IdlePriority,Ke=null,ot=null;function Rt(n){if(ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Ke,n,void 0,(n.current.flags&128)===128)}catch{}}var Et=Math.clz32?Math.clz32:et,kt=Math.log,Pt=Math.LN2;function et(n){return n>>>=0,n===0?32:31-(kt(n)/Pt|0)|0}var It=64,gt=4194304;function rn(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function ui(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,m=n.pingedLanes,M=a&268435455;if(M!==0){var D=M&~d;D!==0?c=rn(D):(m&=M,m!==0&&(c=rn(m)))}else M=a&~d,M!==0?c=rn(M):m!==0&&(c=rn(m));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,m=i&-i,d>=m||d===16&&(m&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Et(i),d=1<<a,c|=n[a],i&=~d;return c}function wn(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Dr(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,m=n.pendingLanes;0<m;){var M=31-Et(m),D=1<<M,z=d[M];z===-1?((D&a)===0||(D&c)!==0)&&(d[M]=wn(D,i)):z<=i&&(n.expiredLanes|=D),m&=~D}}function Bt(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function An(){var n=It;return It<<=1,(It&4194240)===0&&(It=64),n}function gn(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function Zt(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Et(i),n[i]=a}function vn(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-Et(a),m=1<<d;i[d]=0,c[d]=-1,n[d]=-1,a&=~m}}function Ir(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Et(a),d=1<<c;d&i|n[c]&i&&(n[c]|=i),a&=~d}}var vt=0;function Wd(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Xd,mc,jd,Yd,qd,gc=!1,Ma=[],er=null,tr=null,nr=null,mo=new Map,go=new Map,ir=[],d0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function $d(n,i){switch(n){case"focusin":case"focusout":er=null;break;case"dragenter":case"dragleave":tr=null;break;case"mouseover":case"mouseout":nr=null;break;case"pointerover":case"pointerout":mo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":go.delete(i.pointerId)}}function vo(n,i,a,c,d,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:m,targetContainers:[d]},i!==null&&(i=Lo(i),i!==null&&mc(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function h0(n,i,a,c,d){switch(i){case"focusin":return er=vo(er,n,i,a,c,d),!0;case"dragenter":return tr=vo(tr,n,i,a,c,d),!0;case"mouseover":return nr=vo(nr,n,i,a,c,d),!0;case"pointerover":var m=d.pointerId;return mo.set(m,vo(mo.get(m)||null,n,i,a,c,d)),!0;case"gotpointercapture":return m=d.pointerId,go.set(m,vo(go.get(m)||null,n,i,a,c,d)),!0}return!1}function Kd(n){var i=Ur(n.target);if(i!==null){var a=Ui(i);if(a!==null){if(i=a.tag,i===13){if(i=_a(a),i!==null){n.blockedOn=i,qd(n.priority,function(){jd(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ea(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=_c(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);ut=c,a.target.dispatchEvent(c),ut=null}else return i=Lo(a),i!==null&&mc(i),n.blockedOn=a,!1;i.shift()}return!0}function Zd(n,i,a){Ea(n)&&a.delete(i)}function p0(){gc=!1,er!==null&&Ea(er)&&(er=null),tr!==null&&Ea(tr)&&(tr=null),nr!==null&&Ea(nr)&&(nr=null),mo.forEach(Zd),go.forEach(Zd)}function _o(n,i){n.blockedOn===i&&(n.blockedOn=null,gc||(gc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,p0)))}function xo(n){function i(d){return _o(d,n)}if(0<Ma.length){_o(Ma[0],n);for(var a=1;a<Ma.length;a++){var c=Ma[a];c.blockedOn===n&&(c.blockedOn=null)}}for(er!==null&&_o(er,n),tr!==null&&_o(tr,n),nr!==null&&_o(nr,n),mo.forEach(i),go.forEach(i),a=0;a<ir.length;a++)c=ir[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<ir.length&&(a=ir[0],a.blockedOn===null);)Kd(a),a.blockedOn===null&&ir.shift()}var ds=C.ReactCurrentBatchConfig,Ta=!0;function m0(n,i,a,c){var d=vt,m=ds.transition;ds.transition=null;try{vt=1,vc(n,i,a,c)}finally{vt=d,ds.transition=m}}function g0(n,i,a,c){var d=vt,m=ds.transition;ds.transition=null;try{vt=4,vc(n,i,a,c)}finally{vt=d,ds.transition=m}}function vc(n,i,a,c){if(Ta){var d=_c(n,i,a,c);if(d===null)Nc(n,i,c,wa,a),$d(n,c);else if(h0(d,n,i,a,c))c.stopPropagation();else if($d(n,c),i&4&&-1<d0.indexOf(n)){for(;d!==null;){var m=Lo(d);if(m!==null&&Xd(m),m=_c(n,i,a,c),m===null&&Nc(n,i,c,wa,a),m===d)break;d=m}d!==null&&c.stopPropagation()}else Nc(n,i,c,null,a)}}var wa=null;function _c(n,i,a,c){if(wa=null,n=G(c),n=Ur(n),n!==null)if(i=Ui(n),i===null)n=null;else if(a=i.tag,a===13){if(n=_a(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return wa=n,null}function Qd(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Me()){case be:return 1;case He:return 4;case Ue:case it:return 16;case st:return 536870912;default:return 16}default:return 16}}var rr=null,xc=null,Aa=null;function Jd(){if(Aa)return Aa;var n,i=xc,a=i.length,c,d="value"in rr?rr.value:rr.textContent,m=d.length;for(n=0;n<a&&i[n]===d[n];n++);var M=a-n;for(c=1;c<=M&&i[a-c]===d[m-c];c++);return Aa=d.slice(n,1<c?1-c:void 0)}function Ca(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Ra(){return!0}function eh(){return!1}function Wn(n){function i(a,c,d,m,M){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=m,this.target=M,this.currentTarget=null;for(var D in n)n.hasOwnProperty(D)&&(a=n[D],this[D]=a?a(m):m[D]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Ra:eh,this.isPropagationStopped=eh,this}return oe(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ra)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ra)},persist:function(){},isPersistent:Ra}),i}var hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yc=Wn(hs),yo=oe({},hs,{view:0,detail:0}),v0=Wn(yo),Sc,Mc,So,ba=oe({},yo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==So&&(So&&n.type==="mousemove"?(Sc=n.screenX-So.screenX,Mc=n.screenY-So.screenY):Mc=Sc=0,So=n),Sc)},movementY:function(n){return"movementY"in n?n.movementY:Mc}}),th=Wn(ba),_0=oe({},ba,{dataTransfer:0}),x0=Wn(_0),y0=oe({},yo,{relatedTarget:0}),Ec=Wn(y0),S0=oe({},hs,{animationName:0,elapsedTime:0,pseudoElement:0}),M0=Wn(S0),E0=oe({},hs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),T0=Wn(E0),w0=oe({},hs,{data:0}),nh=Wn(w0),A0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},C0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},R0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function b0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=R0[n])?!!i[n]:!1}function Tc(){return b0}var P0=oe({},yo,{key:function(n){if(n.key){var i=A0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Ca(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?C0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tc,charCode:function(n){return n.type==="keypress"?Ca(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ca(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),L0=Wn(P0),D0=oe({},ba,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ih=Wn(D0),I0=oe({},yo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tc}),U0=Wn(I0),N0=oe({},hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),F0=Wn(N0),O0=oe({},ba,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),k0=Wn(O0),B0=[9,13,27,32],wc=f&&"CompositionEvent"in window,Mo=null;f&&"documentMode"in document&&(Mo=document.documentMode);var z0=f&&"TextEvent"in window&&!Mo,rh=f&&(!wc||Mo&&8<Mo&&11>=Mo),sh=" ",oh=!1;function ah(n,i){switch(n){case"keyup":return B0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lh(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ps=!1;function H0(n,i){switch(n){case"compositionend":return lh(i);case"keypress":return i.which!==32?null:(oh=!0,sh);case"textInput":return n=i.data,n===sh&&oh?null:n;default:return null}}function V0(n,i){if(ps)return n==="compositionend"||!wc&&ah(n,i)?(n=Jd(),Aa=xc=rr=null,ps=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return rh&&i.locale!=="ko"?null:i.data;default:return null}}var G0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ch(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!G0[n.type]:i==="textarea"}function uh(n,i,a,c){he(c),i=Ua(i,"onChange"),0<i.length&&(a=new yc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var Eo=null,To=null;function W0(n){Rh(n,0)}function Pa(n){var i=xs(n);if(_t(i))return n}function X0(n,i){if(n==="change")return i}var fh=!1;if(f){var Ac;if(f){var Cc="oninput"in document;if(!Cc){var dh=document.createElement("div");dh.setAttribute("oninput","return;"),Cc=typeof dh.oninput=="function"}Ac=Cc}else Ac=!1;fh=Ac&&(!document.documentMode||9<document.documentMode)}function hh(){Eo&&(Eo.detachEvent("onpropertychange",ph),To=Eo=null)}function ph(n){if(n.propertyName==="value"&&Pa(To)){var i=[];uh(i,To,n,G(n)),ei(W0,i)}}function j0(n,i,a){n==="focusin"?(hh(),Eo=i,To=a,Eo.attachEvent("onpropertychange",ph)):n==="focusout"&&hh()}function Y0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Pa(To)}function q0(n,i){if(n==="click")return Pa(i)}function $0(n,i){if(n==="input"||n==="change")return Pa(i)}function K0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var fi=typeof Object.is=="function"?Object.is:K0;function wo(n,i){if(fi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!h.call(i,d)||!fi(n[d],i[d]))return!1}return!0}function mh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function gh(n,i){var a=mh(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=mh(a)}}function vh(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?vh(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function _h(){for(var n=window,i=B();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=B(n.document)}return i}function Rc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Z0(n){var i=_h(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&vh(a.ownerDocument.documentElement,a)){if(c!==null&&Rc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,m=Math.min(c.start,d);c=c.end===void 0?m:Math.min(c.end,d),!n.extend&&m>c&&(d=c,c=m,m=d),d=gh(a,m);var M=gh(a,c);d&&M&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==M.node||n.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),m>c?(n.addRange(i),n.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Q0=f&&"documentMode"in document&&11>=document.documentMode,ms=null,bc=null,Ao=null,Pc=!1;function xh(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Pc||ms==null||ms!==B(c)||(c=ms,"selectionStart"in c&&Rc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Ao&&wo(Ao,c)||(Ao=c,c=Ua(bc,"onSelect"),0<c.length&&(i=new yc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=ms)))}function La(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var gs={animationend:La("Animation","AnimationEnd"),animationiteration:La("Animation","AnimationIteration"),animationstart:La("Animation","AnimationStart"),transitionend:La("Transition","TransitionEnd")},Lc={},yh={};f&&(yh=document.createElement("div").style,"AnimationEvent"in window||(delete gs.animationend.animation,delete gs.animationiteration.animation,delete gs.animationstart.animation),"TransitionEvent"in window||delete gs.transitionend.transition);function Da(n){if(Lc[n])return Lc[n];if(!gs[n])return n;var i=gs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in yh)return Lc[n]=i[a];return n}var Sh=Da("animationend"),Mh=Da("animationiteration"),Eh=Da("animationstart"),Th=Da("transitionend"),wh=new Map,Ah="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function sr(n,i){wh.set(n,i),l(i,[n])}for(var Dc=0;Dc<Ah.length;Dc++){var Ic=Ah[Dc],J0=Ic.toLowerCase(),ev=Ic[0].toUpperCase()+Ic.slice(1);sr(J0,"on"+ev)}sr(Sh,"onAnimationEnd"),sr(Mh,"onAnimationIteration"),sr(Eh,"onAnimationStart"),sr("dblclick","onDoubleClick"),sr("focusin","onFocus"),sr("focusout","onBlur"),sr(Th,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Co="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Co));function Ch(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,va(c,i,void 0,n),n.currentTarget=null}function Rh(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var m=void 0;if(i)for(var M=c.length-1;0<=M;M--){var D=c[M],z=D.instance,J=D.currentTarget;if(D=D.listener,z!==m&&d.isPropagationStopped())break e;Ch(d,D,J),m=z}else for(M=0;M<c.length;M++){if(D=c[M],z=D.instance,J=D.currentTarget,D=D.listener,z!==m&&d.isPropagationStopped())break e;Ch(d,D,J),m=z}}}if(Ii)throw n=us,Ii=!1,us=null,n}function Wt(n,i){var a=i[Hc];a===void 0&&(a=i[Hc]=new Set);var c=n+"__bubble";a.has(c)||(bh(i,n,2,!1),a.add(c))}function Uc(n,i,a){var c=0;i&&(c|=4),bh(a,n,c,i)}var Ia="_reactListening"+Math.random().toString(36).slice(2);function Ro(n){if(!n[Ia]){n[Ia]=!0,r.forEach(function(a){a!=="selectionchange"&&(tv.has(a)||Uc(a,!1,n),Uc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Ia]||(i[Ia]=!0,Uc("selectionchange",!1,i))}}function bh(n,i,a,c){switch(Qd(i)){case 1:var d=m0;break;case 4:d=g0;break;default:d=vc}a=d.bind(null,i,a,n),d=void 0,!cs||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,a,{capture:!0,passive:d}):n.addEventListener(i,a,!0):d!==void 0?n.addEventListener(i,a,{passive:d}):n.addEventListener(i,a,!1)}function Nc(n,i,a,c,d){var m=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var M=c.tag;if(M===3||M===4){var D=c.stateNode.containerInfo;if(D===d||D.nodeType===8&&D.parentNode===d)break;if(M===4)for(M=c.return;M!==null;){var z=M.tag;if((z===3||z===4)&&(z=M.stateNode.containerInfo,z===d||z.nodeType===8&&z.parentNode===d))return;M=M.return}for(;D!==null;){if(M=Ur(D),M===null)return;if(z=M.tag,z===5||z===6){c=m=M;continue e}D=D.parentNode}}c=c.return}ei(function(){var J=m,ve=G(a),xe=[];e:{var ge=wh.get(n);if(ge!==void 0){var Ne=yc,Ve=n;switch(n){case"keypress":if(Ca(a)===0)break e;case"keydown":case"keyup":Ne=L0;break;case"focusin":Ve="focus",Ne=Ec;break;case"focusout":Ve="blur",Ne=Ec;break;case"beforeblur":case"afterblur":Ne=Ec;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ne=th;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ne=x0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ne=U0;break;case Sh:case Mh:case Eh:Ne=M0;break;case Th:Ne=F0;break;case"scroll":Ne=v0;break;case"wheel":Ne=k0;break;case"copy":case"cut":case"paste":Ne=T0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ne=ih}var We=(i&4)!==0,Qt=!We&&n==="scroll",q=We?ge!==null?ge+"Capture":null:ge;We=[];for(var X=J,K;X!==null;){K=X;var Te=K.stateNode;if(K.tag===5&&Te!==null&&(K=Te,q!==null&&(Te=mn(X,q),Te!=null&&We.push(bo(X,Te,K)))),Qt)break;X=X.return}0<We.length&&(ge=new Ne(ge,Ve,null,a,ve),xe.push({event:ge,listeners:We}))}}if((i&7)===0){e:{if(ge=n==="mouseover"||n==="pointerover",Ne=n==="mouseout"||n==="pointerout",ge&&a!==ut&&(Ve=a.relatedTarget||a.fromElement)&&(Ur(Ve)||Ve[Ni]))break e;if((Ne||ge)&&(ge=ve.window===ve?ve:(ge=ve.ownerDocument)?ge.defaultView||ge.parentWindow:window,Ne?(Ve=a.relatedTarget||a.toElement,Ne=J,Ve=Ve?Ur(Ve):null,Ve!==null&&(Qt=Ui(Ve),Ve!==Qt||Ve.tag!==5&&Ve.tag!==6)&&(Ve=null)):(Ne=null,Ve=J),Ne!==Ve)){if(We=th,Te="onMouseLeave",q="onMouseEnter",X="mouse",(n==="pointerout"||n==="pointerover")&&(We=ih,Te="onPointerLeave",q="onPointerEnter",X="pointer"),Qt=Ne==null?ge:xs(Ne),K=Ve==null?ge:xs(Ve),ge=new We(Te,X+"leave",Ne,a,ve),ge.target=Qt,ge.relatedTarget=K,Te=null,Ur(ve)===J&&(We=new We(q,X+"enter",Ve,a,ve),We.target=K,We.relatedTarget=Qt,Te=We),Qt=Te,Ne&&Ve)t:{for(We=Ne,q=Ve,X=0,K=We;K;K=vs(K))X++;for(K=0,Te=q;Te;Te=vs(Te))K++;for(;0<X-K;)We=vs(We),X--;for(;0<K-X;)q=vs(q),K--;for(;X--;){if(We===q||q!==null&&We===q.alternate)break t;We=vs(We),q=vs(q)}We=null}else We=null;Ne!==null&&Ph(xe,ge,Ne,We,!1),Ve!==null&&Qt!==null&&Ph(xe,Qt,Ve,We,!0)}}e:{if(ge=J?xs(J):window,Ne=ge.nodeName&&ge.nodeName.toLowerCase(),Ne==="select"||Ne==="input"&&ge.type==="file")var je=X0;else if(ch(ge))if(fh)je=$0;else{je=Y0;var tt=j0}else(Ne=ge.nodeName)&&Ne.toLowerCase()==="input"&&(ge.type==="checkbox"||ge.type==="radio")&&(je=q0);if(je&&(je=je(n,J))){uh(xe,je,a,ve);break e}tt&&tt(n,ge,J),n==="focusout"&&(tt=ge._wrapperState)&&tt.controlled&&ge.type==="number"&&Fe(ge,"number",ge.value)}switch(tt=J?xs(J):window,n){case"focusin":(ch(tt)||tt.contentEditable==="true")&&(ms=tt,bc=J,Ao=null);break;case"focusout":Ao=bc=ms=null;break;case"mousedown":Pc=!0;break;case"contextmenu":case"mouseup":case"dragend":Pc=!1,xh(xe,a,ve);break;case"selectionchange":if(Q0)break;case"keydown":case"keyup":xh(xe,a,ve)}var nt;if(wc)e:{switch(n){case"compositionstart":var at="onCompositionStart";break e;case"compositionend":at="onCompositionEnd";break e;case"compositionupdate":at="onCompositionUpdate";break e}at=void 0}else ps?ah(n,a)&&(at="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(at="onCompositionStart");at&&(rh&&a.locale!=="ko"&&(ps||at!=="onCompositionStart"?at==="onCompositionEnd"&&ps&&(nt=Jd()):(rr=ve,xc="value"in rr?rr.value:rr.textContent,ps=!0)),tt=Ua(J,at),0<tt.length&&(at=new nh(at,n,null,a,ve),xe.push({event:at,listeners:tt}),nt?at.data=nt:(nt=lh(a),nt!==null&&(at.data=nt)))),(nt=z0?H0(n,a):V0(n,a))&&(J=Ua(J,"onBeforeInput"),0<J.length&&(ve=new nh("onBeforeInput","beforeinput",null,a,ve),xe.push({event:ve,listeners:J}),ve.data=nt))}Rh(xe,i)})}function bo(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ua(n,i){for(var a=i+"Capture",c=[];n!==null;){var d=n,m=d.stateNode;d.tag===5&&m!==null&&(d=m,m=mn(n,a),m!=null&&c.unshift(bo(n,m,d)),m=mn(n,i),m!=null&&c.push(bo(n,m,d))),n=n.return}return c}function vs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Ph(n,i,a,c,d){for(var m=i._reactName,M=[];a!==null&&a!==c;){var D=a,z=D.alternate,J=D.stateNode;if(z!==null&&z===c)break;D.tag===5&&J!==null&&(D=J,d?(z=mn(a,m),z!=null&&M.unshift(bo(a,z,D))):d||(z=mn(a,m),z!=null&&M.push(bo(a,z,D)))),a=a.return}M.length!==0&&n.push({event:i,listeners:M})}var nv=/\r\n?/g,iv=/\u0000|\uFFFD/g;function Lh(n){return(typeof n=="string"?n:""+n).replace(nv,`
`).replace(iv,"")}function Na(n,i,a){if(i=Lh(i),Lh(n)!==i&&a)throw Error(t(425))}function Fa(){}var Fc=null,Oc=null;function kc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Bc=typeof setTimeout=="function"?setTimeout:void 0,rv=typeof clearTimeout=="function"?clearTimeout:void 0,Dh=typeof Promise=="function"?Promise:void 0,sv=typeof queueMicrotask=="function"?queueMicrotask:typeof Dh<"u"?function(n){return Dh.resolve(null).then(n).catch(ov)}:Bc;function ov(n){setTimeout(function(){throw n})}function zc(n,i){var a=i,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),xo(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);xo(i)}function or(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Ih(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var _s=Math.random().toString(36).slice(2),Mi="__reactFiber$"+_s,Po="__reactProps$"+_s,Ni="__reactContainer$"+_s,Hc="__reactEvents$"+_s,av="__reactListeners$"+_s,lv="__reactHandles$"+_s;function Ur(n){var i=n[Mi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Ni]||a[Mi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Ih(n);n!==null;){if(a=n[Mi])return a;n=Ih(n)}return i}n=a,a=n.parentNode}return null}function Lo(n){return n=n[Mi]||n[Ni],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function xs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Oa(n){return n[Po]||null}var Vc=[],ys=-1;function ar(n){return{current:n}}function Xt(n){0>ys||(n.current=Vc[ys],Vc[ys]=null,ys--)}function Ht(n,i){ys++,Vc[ys]=n.current,n.current=i}var lr={},_n=ar(lr),Un=ar(!1),Nr=lr;function Ss(n,i){var a=n.type.contextTypes;if(!a)return lr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},m;for(m in a)d[m]=i[m];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function Nn(n){return n=n.childContextTypes,n!=null}function ka(){Xt(Un),Xt(_n)}function Uh(n,i,a){if(_n.current!==lr)throw Error(t(168));Ht(_n,i),Ht(Un,a)}function Nh(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,pe(n)||"Unknown",d));return oe({},a,c)}function Ba(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||lr,Nr=_n.current,Ht(_n,n),Ht(Un,Un.current),!0}function Fh(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=Nh(n,i,Nr),c.__reactInternalMemoizedMergedChildContext=n,Xt(Un),Xt(_n),Ht(_n,n)):Xt(Un),Ht(Un,a)}var Fi=null,za=!1,Gc=!1;function Oh(n){Fi===null?Fi=[n]:Fi.push(n)}function cv(n){za=!0,Oh(n)}function cr(){if(!Gc&&Fi!==null){Gc=!0;var n=0,i=vt;try{var a=Fi;for(vt=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Fi=null,za=!1}catch(d){throw Fi!==null&&(Fi=Fi.slice(n+1)),A(be,cr),d}finally{vt=i,Gc=!1}}return null}var Ms=[],Es=0,Ha=null,Va=0,ti=[],ni=0,Fr=null,Oi=1,ki="";function Or(n,i){Ms[Es++]=Va,Ms[Es++]=Ha,Ha=n,Va=i}function kh(n,i,a){ti[ni++]=Oi,ti[ni++]=ki,ti[ni++]=Fr,Fr=n;var c=Oi;n=ki;var d=32-Et(c)-1;c&=~(1<<d),a+=1;var m=32-Et(i)+d;if(30<m){var M=d-d%5;m=(c&(1<<M)-1).toString(32),c>>=M,d-=M,Oi=1<<32-Et(i)+d|a<<d|c,ki=m+n}else Oi=1<<m|a<<d|c,ki=n}function Wc(n){n.return!==null&&(Or(n,1),kh(n,1,0))}function Xc(n){for(;n===Ha;)Ha=Ms[--Es],Ms[Es]=null,Va=Ms[--Es],Ms[Es]=null;for(;n===Fr;)Fr=ti[--ni],ti[ni]=null,ki=ti[--ni],ti[ni]=null,Oi=ti[--ni],ti[ni]=null}var Xn=null,jn=null,jt=!1,di=null;function Bh(n,i){var a=oi(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function zh(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Xn=n,jn=or(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Xn=n,jn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Fr!==null?{id:Oi,overflow:ki}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=oi(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Xn=n,jn=null,!0):!1;default:return!1}}function jc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Yc(n){if(jt){var i=jn;if(i){var a=i;if(!zh(n,i)){if(jc(n))throw Error(t(418));i=or(a.nextSibling);var c=Xn;i&&zh(n,i)?Bh(c,a):(n.flags=n.flags&-4097|2,jt=!1,Xn=n)}}else{if(jc(n))throw Error(t(418));n.flags=n.flags&-4097|2,jt=!1,Xn=n}}}function Hh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Xn=n}function Ga(n){if(n!==Xn)return!1;if(!jt)return Hh(n),jt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!kc(n.type,n.memoizedProps)),i&&(i=jn)){if(jc(n))throw Vh(),Error(t(418));for(;i;)Bh(n,i),i=or(i.nextSibling)}if(Hh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){jn=or(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}jn=null}}else jn=Xn?or(n.stateNode.nextSibling):null;return!0}function Vh(){for(var n=jn;n;)n=or(n.nextSibling)}function Ts(){jn=Xn=null,jt=!1}function qc(n){di===null?di=[n]:di.push(n)}var uv=C.ReactCurrentBatchConfig;function Do(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(M){var D=d.refs;M===null?delete D[m]:D[m]=M},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Wa(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Gh(n){var i=n._init;return i(n._payload)}function Wh(n){function i(q,X){if(n){var K=q.deletions;K===null?(q.deletions=[X],q.flags|=16):K.push(X)}}function a(q,X){if(!n)return null;for(;X!==null;)i(q,X),X=X.sibling;return null}function c(q,X){for(q=new Map;X!==null;)X.key!==null?q.set(X.key,X):q.set(X.index,X),X=X.sibling;return q}function d(q,X){return q=vr(q,X),q.index=0,q.sibling=null,q}function m(q,X,K){return q.index=K,n?(K=q.alternate,K!==null?(K=K.index,K<X?(q.flags|=2,X):K):(q.flags|=2,X)):(q.flags|=1048576,X)}function M(q){return n&&q.alternate===null&&(q.flags|=2),q}function D(q,X,K,Te){return X===null||X.tag!==6?(X=Bu(K,q.mode,Te),X.return=q,X):(X=d(X,K),X.return=q,X)}function z(q,X,K,Te){var je=K.type;return je===k?ve(q,X,K.props.children,Te,K.key):X!==null&&(X.elementType===je||typeof je=="object"&&je!==null&&je.$$typeof===ae&&Gh(je)===X.type)?(Te=d(X,K.props),Te.ref=Do(q,X,K),Te.return=q,Te):(Te=pl(K.type,K.key,K.props,null,q.mode,Te),Te.ref=Do(q,X,K),Te.return=q,Te)}function J(q,X,K,Te){return X===null||X.tag!==4||X.stateNode.containerInfo!==K.containerInfo||X.stateNode.implementation!==K.implementation?(X=zu(K,q.mode,Te),X.return=q,X):(X=d(X,K.children||[]),X.return=q,X)}function ve(q,X,K,Te,je){return X===null||X.tag!==7?(X=Xr(K,q.mode,Te,je),X.return=q,X):(X=d(X,K),X.return=q,X)}function xe(q,X,K){if(typeof X=="string"&&X!==""||typeof X=="number")return X=Bu(""+X,q.mode,K),X.return=q,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case N:return K=pl(X.type,X.key,X.props,null,q.mode,K),K.ref=Do(q,null,X),K.return=q,K;case U:return X=zu(X,q.mode,K),X.return=q,X;case ae:var Te=X._init;return xe(q,Te(X._payload),K)}if(ct(X)||ce(X))return X=Xr(X,q.mode,K,null),X.return=q,X;Wa(q,X)}return null}function ge(q,X,K,Te){var je=X!==null?X.key:null;if(typeof K=="string"&&K!==""||typeof K=="number")return je!==null?null:D(q,X,""+K,Te);if(typeof K=="object"&&K!==null){switch(K.$$typeof){case N:return K.key===je?z(q,X,K,Te):null;case U:return K.key===je?J(q,X,K,Te):null;case ae:return je=K._init,ge(q,X,je(K._payload),Te)}if(ct(K)||ce(K))return je!==null?null:ve(q,X,K,Te,null);Wa(q,K)}return null}function Ne(q,X,K,Te,je){if(typeof Te=="string"&&Te!==""||typeof Te=="number")return q=q.get(K)||null,D(X,q,""+Te,je);if(typeof Te=="object"&&Te!==null){switch(Te.$$typeof){case N:return q=q.get(Te.key===null?K:Te.key)||null,z(X,q,Te,je);case U:return q=q.get(Te.key===null?K:Te.key)||null,J(X,q,Te,je);case ae:var tt=Te._init;return Ne(q,X,K,tt(Te._payload),je)}if(ct(Te)||ce(Te))return q=q.get(K)||null,ve(X,q,Te,je,null);Wa(X,Te)}return null}function Ve(q,X,K,Te){for(var je=null,tt=null,nt=X,at=X=0,fn=null;nt!==null&&at<K.length;at++){nt.index>at?(fn=nt,nt=null):fn=nt.sibling;var wt=ge(q,nt,K[at],Te);if(wt===null){nt===null&&(nt=fn);break}n&&nt&&wt.alternate===null&&i(q,nt),X=m(wt,X,at),tt===null?je=wt:tt.sibling=wt,tt=wt,nt=fn}if(at===K.length)return a(q,nt),jt&&Or(q,at),je;if(nt===null){for(;at<K.length;at++)nt=xe(q,K[at],Te),nt!==null&&(X=m(nt,X,at),tt===null?je=nt:tt.sibling=nt,tt=nt);return jt&&Or(q,at),je}for(nt=c(q,nt);at<K.length;at++)fn=Ne(nt,q,at,K[at],Te),fn!==null&&(n&&fn.alternate!==null&&nt.delete(fn.key===null?at:fn.key),X=m(fn,X,at),tt===null?je=fn:tt.sibling=fn,tt=fn);return n&&nt.forEach(function(_r){return i(q,_r)}),jt&&Or(q,at),je}function We(q,X,K,Te){var je=ce(K);if(typeof je!="function")throw Error(t(150));if(K=je.call(K),K==null)throw Error(t(151));for(var tt=je=null,nt=X,at=X=0,fn=null,wt=K.next();nt!==null&&!wt.done;at++,wt=K.next()){nt.index>at?(fn=nt,nt=null):fn=nt.sibling;var _r=ge(q,nt,wt.value,Te);if(_r===null){nt===null&&(nt=fn);break}n&&nt&&_r.alternate===null&&i(q,nt),X=m(_r,X,at),tt===null?je=_r:tt.sibling=_r,tt=_r,nt=fn}if(wt.done)return a(q,nt),jt&&Or(q,at),je;if(nt===null){for(;!wt.done;at++,wt=K.next())wt=xe(q,wt.value,Te),wt!==null&&(X=m(wt,X,at),tt===null?je=wt:tt.sibling=wt,tt=wt);return jt&&Or(q,at),je}for(nt=c(q,nt);!wt.done;at++,wt=K.next())wt=Ne(nt,q,at,wt.value,Te),wt!==null&&(n&&wt.alternate!==null&&nt.delete(wt.key===null?at:wt.key),X=m(wt,X,at),tt===null?je=wt:tt.sibling=wt,tt=wt);return n&&nt.forEach(function(Gv){return i(q,Gv)}),jt&&Or(q,at),je}function Qt(q,X,K,Te){if(typeof K=="object"&&K!==null&&K.type===k&&K.key===null&&(K=K.props.children),typeof K=="object"&&K!==null){switch(K.$$typeof){case N:e:{for(var je=K.key,tt=X;tt!==null;){if(tt.key===je){if(je=K.type,je===k){if(tt.tag===7){a(q,tt.sibling),X=d(tt,K.props.children),X.return=q,q=X;break e}}else if(tt.elementType===je||typeof je=="object"&&je!==null&&je.$$typeof===ae&&Gh(je)===tt.type){a(q,tt.sibling),X=d(tt,K.props),X.ref=Do(q,tt,K),X.return=q,q=X;break e}a(q,tt);break}else i(q,tt);tt=tt.sibling}K.type===k?(X=Xr(K.props.children,q.mode,Te,K.key),X.return=q,q=X):(Te=pl(K.type,K.key,K.props,null,q.mode,Te),Te.ref=Do(q,X,K),Te.return=q,q=Te)}return M(q);case U:e:{for(tt=K.key;X!==null;){if(X.key===tt)if(X.tag===4&&X.stateNode.containerInfo===K.containerInfo&&X.stateNode.implementation===K.implementation){a(q,X.sibling),X=d(X,K.children||[]),X.return=q,q=X;break e}else{a(q,X);break}else i(q,X);X=X.sibling}X=zu(K,q.mode,Te),X.return=q,q=X}return M(q);case ae:return tt=K._init,Qt(q,X,tt(K._payload),Te)}if(ct(K))return Ve(q,X,K,Te);if(ce(K))return We(q,X,K,Te);Wa(q,K)}return typeof K=="string"&&K!==""||typeof K=="number"?(K=""+K,X!==null&&X.tag===6?(a(q,X.sibling),X=d(X,K),X.return=q,q=X):(a(q,X),X=Bu(K,q.mode,Te),X.return=q,q=X),M(q)):a(q,X)}return Qt}var ws=Wh(!0),Xh=Wh(!1),Xa=ar(null),ja=null,As=null,$c=null;function Kc(){$c=As=ja=null}function Zc(n){var i=Xa.current;Xt(Xa),n._currentValue=i}function Qc(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Cs(n,i){ja=n,$c=As=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Fn=!0),n.firstContext=null)}function ii(n){var i=n._currentValue;if($c!==n)if(n={context:n,memoizedValue:i,next:null},As===null){if(ja===null)throw Error(t(308));As=n,ja.dependencies={lanes:0,firstContext:n}}else As=As.next=n;return i}var kr=null;function Jc(n){kr===null?kr=[n]:kr.push(n)}function jh(n,i,a,c){var d=i.interleaved;return d===null?(a.next=a,Jc(i)):(a.next=d.next,d.next=a),i.interleaved=a,Bi(n,c)}function Bi(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var ur=!1;function eu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Yh(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function zi(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function fr(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Tt&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,Bi(n,a)}return d=c.interleaved,d===null?(i.next=i,Jc(c)):(i.next=d.next,d.next=i),c.interleaved=i,Bi(n,a)}function Ya(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Ir(n,a)}}function qh(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,m=null;if(a=a.firstBaseUpdate,a!==null){do{var M={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};m===null?d=m=M:m=m.next=M,a=a.next}while(a!==null);m===null?d=m=i:m=m.next=i}else d=m=i;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:m,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function qa(n,i,a,c){var d=n.updateQueue;ur=!1;var m=d.firstBaseUpdate,M=d.lastBaseUpdate,D=d.shared.pending;if(D!==null){d.shared.pending=null;var z=D,J=z.next;z.next=null,M===null?m=J:M.next=J,M=z;var ve=n.alternate;ve!==null&&(ve=ve.updateQueue,D=ve.lastBaseUpdate,D!==M&&(D===null?ve.firstBaseUpdate=J:D.next=J,ve.lastBaseUpdate=z))}if(m!==null){var xe=d.baseState;M=0,ve=J=z=null,D=m;do{var ge=D.lane,Ne=D.eventTime;if((c&ge)===ge){ve!==null&&(ve=ve.next={eventTime:Ne,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var Ve=n,We=D;switch(ge=i,Ne=a,We.tag){case 1:if(Ve=We.payload,typeof Ve=="function"){xe=Ve.call(Ne,xe,ge);break e}xe=Ve;break e;case 3:Ve.flags=Ve.flags&-65537|128;case 0:if(Ve=We.payload,ge=typeof Ve=="function"?Ve.call(Ne,xe,ge):Ve,ge==null)break e;xe=oe({},xe,ge);break e;case 2:ur=!0}}D.callback!==null&&D.lane!==0&&(n.flags|=64,ge=d.effects,ge===null?d.effects=[D]:ge.push(D))}else Ne={eventTime:Ne,lane:ge,tag:D.tag,payload:D.payload,callback:D.callback,next:null},ve===null?(J=ve=Ne,z=xe):ve=ve.next=Ne,M|=ge;if(D=D.next,D===null){if(D=d.shared.pending,D===null)break;ge=D,D=ge.next,ge.next=null,d.lastBaseUpdate=ge,d.shared.pending=null}}while(!0);if(ve===null&&(z=xe),d.baseState=z,d.firstBaseUpdate=J,d.lastBaseUpdate=ve,i=d.shared.interleaved,i!==null){d=i;do M|=d.lane,d=d.next;while(d!==i)}else m===null&&(d.shared.lanes=0);Hr|=M,n.lanes=M,n.memoizedState=xe}}function $h(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var Io={},Ei=ar(Io),Uo=ar(Io),No=ar(Io);function Br(n){if(n===Io)throw Error(t(174));return n}function tu(n,i){switch(Ht(No,i),Ht(Uo,n),Ht(Ei,Io),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:_e(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=_e(i,n)}Xt(Ei),Ht(Ei,i)}function Rs(){Xt(Ei),Xt(Uo),Xt(No)}function Kh(n){Br(No.current);var i=Br(Ei.current),a=_e(i,n.type);i!==a&&(Ht(Uo,n),Ht(Ei,a))}function nu(n){Uo.current===n&&(Xt(Ei),Xt(Uo))}var Yt=ar(0);function $a(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var iu=[];function ru(){for(var n=0;n<iu.length;n++)iu[n]._workInProgressVersionPrimary=null;iu.length=0}var Ka=C.ReactCurrentDispatcher,su=C.ReactCurrentBatchConfig,zr=0,qt=null,sn=null,cn=null,Za=!1,Fo=!1,Oo=0,fv=0;function xn(){throw Error(t(321))}function ou(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!fi(n[a],i[a]))return!1;return!0}function au(n,i,a,c,d,m){if(zr=m,qt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Ka.current=n===null||n.memoizedState===null?mv:gv,n=a(c,d),Fo){m=0;do{if(Fo=!1,Oo=0,25<=m)throw Error(t(301));m+=1,cn=sn=null,i.updateQueue=null,Ka.current=vv,n=a(c,d)}while(Fo)}if(Ka.current=el,i=sn!==null&&sn.next!==null,zr=0,cn=sn=qt=null,Za=!1,i)throw Error(t(300));return n}function lu(){var n=Oo!==0;return Oo=0,n}function Ti(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?qt.memoizedState=cn=n:cn=cn.next=n,cn}function ri(){if(sn===null){var n=qt.alternate;n=n!==null?n.memoizedState:null}else n=sn.next;var i=cn===null?qt.memoizedState:cn.next;if(i!==null)cn=i,sn=n;else{if(n===null)throw Error(t(310));sn=n,n={memoizedState:sn.memoizedState,baseState:sn.baseState,baseQueue:sn.baseQueue,queue:sn.queue,next:null},cn===null?qt.memoizedState=cn=n:cn=cn.next=n}return cn}function ko(n,i){return typeof i=="function"?i(n):i}function cu(n){var i=ri(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=sn,d=c.baseQueue,m=a.pending;if(m!==null){if(d!==null){var M=d.next;d.next=m.next,m.next=M}c.baseQueue=d=m,a.pending=null}if(d!==null){m=d.next,c=c.baseState;var D=M=null,z=null,J=m;do{var ve=J.lane;if((zr&ve)===ve)z!==null&&(z=z.next={lane:0,action:J.action,hasEagerState:J.hasEagerState,eagerState:J.eagerState,next:null}),c=J.hasEagerState?J.eagerState:n(c,J.action);else{var xe={lane:ve,action:J.action,hasEagerState:J.hasEagerState,eagerState:J.eagerState,next:null};z===null?(D=z=xe,M=c):z=z.next=xe,qt.lanes|=ve,Hr|=ve}J=J.next}while(J!==null&&J!==m);z===null?M=c:z.next=D,fi(c,i.memoizedState)||(Fn=!0),i.memoizedState=c,i.baseState=M,i.baseQueue=z,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do m=d.lane,qt.lanes|=m,Hr|=m,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function uu(n){var i=ri(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,m=i.memoizedState;if(d!==null){a.pending=null;var M=d=d.next;do m=n(m,M.action),M=M.next;while(M!==d);fi(m,i.memoizedState)||(Fn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),a.lastRenderedState=m}return[m,c]}function Zh(){}function Qh(n,i){var a=qt,c=ri(),d=i(),m=!fi(c.memoizedState,d);if(m&&(c.memoizedState=d,Fn=!0),c=c.queue,fu(tp.bind(null,a,c,n),[n]),c.getSnapshot!==i||m||cn!==null&&cn.memoizedState.tag&1){if(a.flags|=2048,Bo(9,ep.bind(null,a,c,d,i),void 0,null),un===null)throw Error(t(349));(zr&30)!==0||Jh(a,i,d)}return d}function Jh(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=qt.updateQueue,i===null?(i={lastEffect:null,stores:null},qt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function ep(n,i,a,c){i.value=a,i.getSnapshot=c,np(i)&&ip(n)}function tp(n,i,a){return a(function(){np(i)&&ip(n)})}function np(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!fi(n,a)}catch{return!0}}function ip(n){var i=Bi(n,1);i!==null&&gi(i,n,1,-1)}function rp(n){var i=Ti();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:n},i.queue=n,n=n.dispatch=pv.bind(null,qt,n),[i.memoizedState,n]}function Bo(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=qt.updateQueue,i===null?(i={lastEffect:null,stores:null},qt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function sp(){return ri().memoizedState}function Qa(n,i,a,c){var d=Ti();qt.flags|=n,d.memoizedState=Bo(1|i,a,void 0,c===void 0?null:c)}function Ja(n,i,a,c){var d=ri();c=c===void 0?null:c;var m=void 0;if(sn!==null){var M=sn.memoizedState;if(m=M.destroy,c!==null&&ou(c,M.deps)){d.memoizedState=Bo(i,a,m,c);return}}qt.flags|=n,d.memoizedState=Bo(1|i,a,m,c)}function op(n,i){return Qa(8390656,8,n,i)}function fu(n,i){return Ja(2048,8,n,i)}function ap(n,i){return Ja(4,2,n,i)}function lp(n,i){return Ja(4,4,n,i)}function cp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function up(n,i,a){return a=a!=null?a.concat([n]):null,Ja(4,4,cp.bind(null,i,n),a)}function du(){}function fp(n,i){var a=ri();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&ou(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function dp(n,i){var a=ri();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&ou(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function hp(n,i,a){return(zr&21)===0?(n.baseState&&(n.baseState=!1,Fn=!0),n.memoizedState=a):(fi(a,i)||(a=An(),qt.lanes|=a,Hr|=a,n.baseState=!0),i)}function dv(n,i){var a=vt;vt=a!==0&&4>a?a:4,n(!0);var c=su.transition;su.transition={};try{n(!1),i()}finally{vt=a,su.transition=c}}function pp(){return ri().memoizedState}function hv(n,i,a){var c=mr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},mp(n))gp(i,a);else if(a=jh(n,i,a,c),a!==null){var d=Rn();gi(a,n,c,d),vp(a,i,c)}}function pv(n,i,a){var c=mr(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(mp(n))gp(i,d);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var M=i.lastRenderedState,D=m(M,a);if(d.hasEagerState=!0,d.eagerState=D,fi(D,M)){var z=i.interleaved;z===null?(d.next=d,Jc(i)):(d.next=z.next,z.next=d),i.interleaved=d;return}}catch{}finally{}a=jh(n,i,d,c),a!==null&&(d=Rn(),gi(a,n,c,d),vp(a,i,c))}}function mp(n){var i=n.alternate;return n===qt||i!==null&&i===qt}function gp(n,i){Fo=Za=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function vp(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,Ir(n,a)}}var el={readContext:ii,useCallback:xn,useContext:xn,useEffect:xn,useImperativeHandle:xn,useInsertionEffect:xn,useLayoutEffect:xn,useMemo:xn,useReducer:xn,useRef:xn,useState:xn,useDebugValue:xn,useDeferredValue:xn,useTransition:xn,useMutableSource:xn,useSyncExternalStore:xn,useId:xn,unstable_isNewReconciler:!1},mv={readContext:ii,useCallback:function(n,i){return Ti().memoizedState=[n,i===void 0?null:i],n},useContext:ii,useEffect:op,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Qa(4194308,4,cp.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Qa(4194308,4,n,i)},useInsertionEffect:function(n,i){return Qa(4,2,n,i)},useMemo:function(n,i){var a=Ti();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Ti();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=hv.bind(null,qt,n),[c.memoizedState,n]},useRef:function(n){var i=Ti();return n={current:n},i.memoizedState=n},useState:rp,useDebugValue:du,useDeferredValue:function(n){return Ti().memoizedState=n},useTransition:function(){var n=rp(!1),i=n[0];return n=dv.bind(null,n[1]),Ti().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=qt,d=Ti();if(jt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),un===null)throw Error(t(349));(zr&30)!==0||Jh(c,i,a)}d.memoizedState=a;var m={value:a,getSnapshot:i};return d.queue=m,op(tp.bind(null,c,m,n),[n]),c.flags|=2048,Bo(9,ep.bind(null,c,m,a,i),void 0,null),a},useId:function(){var n=Ti(),i=un.identifierPrefix;if(jt){var a=ki,c=Oi;a=(c&~(1<<32-Et(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=Oo++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=fv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},gv={readContext:ii,useCallback:fp,useContext:ii,useEffect:fu,useImperativeHandle:up,useInsertionEffect:ap,useLayoutEffect:lp,useMemo:dp,useReducer:cu,useRef:sp,useState:function(){return cu(ko)},useDebugValue:du,useDeferredValue:function(n){var i=ri();return hp(i,sn.memoizedState,n)},useTransition:function(){var n=cu(ko)[0],i=ri().memoizedState;return[n,i]},useMutableSource:Zh,useSyncExternalStore:Qh,useId:pp,unstable_isNewReconciler:!1},vv={readContext:ii,useCallback:fp,useContext:ii,useEffect:fu,useImperativeHandle:up,useInsertionEffect:ap,useLayoutEffect:lp,useMemo:dp,useReducer:uu,useRef:sp,useState:function(){return uu(ko)},useDebugValue:du,useDeferredValue:function(n){var i=ri();return sn===null?i.memoizedState=n:hp(i,sn.memoizedState,n)},useTransition:function(){var n=uu(ko)[0],i=ri().memoizedState;return[n,i]},useMutableSource:Zh,useSyncExternalStore:Qh,useId:pp,unstable_isNewReconciler:!1};function hi(n,i){if(n&&n.defaultProps){i=oe({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function hu(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:oe({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var tl={isMounted:function(n){return(n=n._reactInternals)?Ui(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Rn(),d=mr(n),m=zi(c,d);m.payload=i,a!=null&&(m.callback=a),i=fr(n,m,d),i!==null&&(gi(i,n,d,c),Ya(i,n,d))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Rn(),d=mr(n),m=zi(c,d);m.tag=1,m.payload=i,a!=null&&(m.callback=a),i=fr(n,m,d),i!==null&&(gi(i,n,d,c),Ya(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Rn(),c=mr(n),d=zi(a,c);d.tag=2,i!=null&&(d.callback=i),i=fr(n,d,c),i!==null&&(gi(i,n,c,a),Ya(i,n,c))}};function _p(n,i,a,c,d,m,M){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,m,M):i.prototype&&i.prototype.isPureReactComponent?!wo(a,c)||!wo(d,m):!0}function xp(n,i,a){var c=!1,d=lr,m=i.contextType;return typeof m=="object"&&m!==null?m=ii(m):(d=Nn(i)?Nr:_n.current,c=i.contextTypes,m=(c=c!=null)?Ss(n,d):lr),i=new i(a,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=tl,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=m),i}function yp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&tl.enqueueReplaceState(i,i.state,null)}function pu(n,i,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},eu(n);var m=i.contextType;typeof m=="object"&&m!==null?d.context=ii(m):(m=Nn(i)?Nr:_n.current,d.context=Ss(n,m)),d.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(hu(n,i,m,a),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&tl.enqueueReplaceState(d,d.state,null),qa(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function bs(n,i){try{var a="",c=i;do a+=Q(c),c=c.return;while(c);var d=a}catch(m){d=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:d,digest:null}}function mu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function gu(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var _v=typeof WeakMap=="function"?WeakMap:Map;function Sp(n,i,a){a=zi(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){ll||(ll=!0,Lu=c),gu(n,i)},a}function Mp(n,i,a){a=zi(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;a.payload=function(){return c(d)},a.callback=function(){gu(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(a.callback=function(){gu(n,i),typeof c!="function"&&(hr===null?hr=new Set([this]):hr.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),a}function Ep(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new _v;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(a)||(d.add(a),n=Dv.bind(null,n,i,a),i.then(n,n))}function Tp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function wp(n,i,a,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=zi(-1,1),i.tag=2,fr(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var xv=C.ReactCurrentOwner,Fn=!1;function Cn(n,i,a,c){i.child=n===null?Xh(i,null,a,c):ws(i,n.child,a,c)}function Ap(n,i,a,c,d){a=a.render;var m=i.ref;return Cs(i,d),c=au(n,i,a,c,m,d),a=lu(),n!==null&&!Fn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Hi(n,i,d)):(jt&&a&&Wc(i),i.flags|=1,Cn(n,i,c,d),i.child)}function Cp(n,i,a,c,d){if(n===null){var m=a.type;return typeof m=="function"&&!ku(m)&&m.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=m,Rp(n,i,m,c,d)):(n=pl(a.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&d)===0){var M=m.memoizedProps;if(a=a.compare,a=a!==null?a:wo,a(M,c)&&n.ref===i.ref)return Hi(n,i,d)}return i.flags|=1,n=vr(m,c),n.ref=i.ref,n.return=i,i.child=n}function Rp(n,i,a,c,d){if(n!==null){var m=n.memoizedProps;if(wo(m,c)&&n.ref===i.ref)if(Fn=!1,i.pendingProps=c=m,(n.lanes&d)!==0)(n.flags&131072)!==0&&(Fn=!0);else return i.lanes=n.lanes,Hi(n,i,d)}return vu(n,i,a,c,d)}function bp(n,i,a){var c=i.pendingProps,d=c.children,m=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ht(Ls,Yn),Yn|=a;else{if((a&1073741824)===0)return n=m!==null?m.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Ht(Ls,Yn),Yn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:a,Ht(Ls,Yn),Yn|=c}else m!==null?(c=m.baseLanes|a,i.memoizedState=null):c=a,Ht(Ls,Yn),Yn|=c;return Cn(n,i,d,a),i.child}function Pp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function vu(n,i,a,c,d){var m=Nn(a)?Nr:_n.current;return m=Ss(i,m),Cs(i,d),a=au(n,i,a,c,m,d),c=lu(),n!==null&&!Fn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Hi(n,i,d)):(jt&&c&&Wc(i),i.flags|=1,Cn(n,i,a,d),i.child)}function Lp(n,i,a,c,d){if(Nn(a)){var m=!0;Ba(i)}else m=!1;if(Cs(i,d),i.stateNode===null)il(n,i),xp(i,a,c),pu(i,a,c,d),c=!0;else if(n===null){var M=i.stateNode,D=i.memoizedProps;M.props=D;var z=M.context,J=a.contextType;typeof J=="object"&&J!==null?J=ii(J):(J=Nn(a)?Nr:_n.current,J=Ss(i,J));var ve=a.getDerivedStateFromProps,xe=typeof ve=="function"||typeof M.getSnapshotBeforeUpdate=="function";xe||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(D!==c||z!==J)&&yp(i,M,c,J),ur=!1;var ge=i.memoizedState;M.state=ge,qa(i,c,M,d),z=i.memoizedState,D!==c||ge!==z||Un.current||ur?(typeof ve=="function"&&(hu(i,a,ve,c),z=i.memoizedState),(D=ur||_p(i,a,D,c,ge,z,J))?(xe||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=z),M.props=c,M.state=z,M.context=J,c=D):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{M=i.stateNode,Yh(n,i),D=i.memoizedProps,J=i.type===i.elementType?D:hi(i.type,D),M.props=J,xe=i.pendingProps,ge=M.context,z=a.contextType,typeof z=="object"&&z!==null?z=ii(z):(z=Nn(a)?Nr:_n.current,z=Ss(i,z));var Ne=a.getDerivedStateFromProps;(ve=typeof Ne=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(D!==xe||ge!==z)&&yp(i,M,c,z),ur=!1,ge=i.memoizedState,M.state=ge,qa(i,c,M,d);var Ve=i.memoizedState;D!==xe||ge!==Ve||Un.current||ur?(typeof Ne=="function"&&(hu(i,a,Ne,c),Ve=i.memoizedState),(J=ur||_p(i,a,J,c,ge,Ve,z)||!1)?(ve||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(c,Ve,z),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(c,Ve,z)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||D===n.memoizedProps&&ge===n.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||D===n.memoizedProps&&ge===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Ve),M.props=c,M.state=Ve,M.context=z,c=J):(typeof M.componentDidUpdate!="function"||D===n.memoizedProps&&ge===n.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||D===n.memoizedProps&&ge===n.memoizedState||(i.flags|=1024),c=!1)}return _u(n,i,a,c,m,d)}function _u(n,i,a,c,d,m){Pp(n,i);var M=(i.flags&128)!==0;if(!c&&!M)return d&&Fh(i,a,!1),Hi(n,i,m);c=i.stateNode,xv.current=i;var D=M&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&M?(i.child=ws(i,n.child,null,m),i.child=ws(i,null,D,m)):Cn(n,i,D,m),i.memoizedState=c.state,d&&Fh(i,a,!0),i.child}function Dp(n){var i=n.stateNode;i.pendingContext?Uh(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Uh(n,i.context,!1),tu(n,i.containerInfo)}function Ip(n,i,a,c,d){return Ts(),qc(d),i.flags|=256,Cn(n,i,a,c),i.child}var xu={dehydrated:null,treeContext:null,retryLane:0};function yu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Up(n,i,a){var c=i.pendingProps,d=Yt.current,m=!1,M=(i.flags&128)!==0,D;if((D=M)||(D=n!==null&&n.memoizedState===null?!1:(d&2)!==0),D?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),Ht(Yt,d&1),n===null)return Yc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=c.children,n=c.fallback,m?(c=i.mode,m=i.child,M={mode:"hidden",children:M},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=M):m=ml(M,c,0,null),n=Xr(n,c,a,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=yu(a),i.memoizedState=xu,n):Su(i,M));if(d=n.memoizedState,d!==null&&(D=d.dehydrated,D!==null))return yv(n,i,M,c,D,d,a);if(m){m=c.fallback,M=i.mode,d=n.child,D=d.sibling;var z={mode:"hidden",children:c.children};return(M&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=z,i.deletions=null):(c=vr(d,z),c.subtreeFlags=d.subtreeFlags&14680064),D!==null?m=vr(D,m):(m=Xr(m,M,a,null),m.flags|=2),m.return=i,c.return=i,c.sibling=m,i.child=c,c=m,m=i.child,M=n.child.memoizedState,M=M===null?yu(a):{baseLanes:M.baseLanes|a,cachePool:null,transitions:M.transitions},m.memoizedState=M,m.childLanes=n.childLanes&~a,i.memoizedState=xu,c}return m=n.child,n=m.sibling,c=vr(m,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function Su(n,i){return i=ml({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function nl(n,i,a,c){return c!==null&&qc(c),ws(i,n.child,null,a),n=Su(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function yv(n,i,a,c,d,m,M){if(a)return i.flags&256?(i.flags&=-257,c=mu(Error(t(422))),nl(n,i,M,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=c.fallback,d=i.mode,c=ml({mode:"visible",children:c.children},d,0,null),m=Xr(m,d,M,null),m.flags|=2,c.return=i,m.return=i,c.sibling=m,i.child=c,(i.mode&1)!==0&&ws(i,n.child,null,M),i.child.memoizedState=yu(M),i.memoizedState=xu,m);if((i.mode&1)===0)return nl(n,i,M,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var D=c.dgst;return c=D,m=Error(t(419)),c=mu(m,c,void 0),nl(n,i,M,c)}if(D=(M&n.childLanes)!==0,Fn||D){if(c=un,c!==null){switch(M&-M){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|M))!==0?0:d,d!==0&&d!==m.retryLane&&(m.retryLane=d,Bi(n,d),gi(c,n,d,-1))}return Ou(),c=mu(Error(t(421))),nl(n,i,M,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=Iv.bind(null,n),d._reactRetry=i,null):(n=m.treeContext,jn=or(d.nextSibling),Xn=i,jt=!0,di=null,n!==null&&(ti[ni++]=Oi,ti[ni++]=ki,ti[ni++]=Fr,Oi=n.id,ki=n.overflow,Fr=i),i=Su(i,c.children),i.flags|=4096,i)}function Np(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Qc(n.return,i,a)}function Mu(n,i,a,c,d){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=a,m.tailMode=d)}function Fp(n,i,a){var c=i.pendingProps,d=c.revealOrder,m=c.tail;if(Cn(n,i,c.children,a),c=Yt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Np(n,a,i);else if(n.tag===19)Np(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Ht(Yt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(a=i.child,d=null;a!==null;)n=a.alternate,n!==null&&$a(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=i.child,i.child=null):(d=a.sibling,a.sibling=null),Mu(i,!1,d,a,m);break;case"backwards":for(a=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&$a(n)===null){i.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}Mu(i,!0,a,null,m);break;case"together":Mu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function il(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Hi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Hr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=vr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=vr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function Sv(n,i,a){switch(i.tag){case 3:Dp(i),Ts();break;case 5:Kh(i);break;case 1:Nn(i.type)&&Ba(i);break;case 4:tu(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Ht(Xa,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Ht(Yt,Yt.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?Up(n,i,a):(Ht(Yt,Yt.current&1),n=Hi(n,i,a),n!==null?n.sibling:null);Ht(Yt,Yt.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return Fp(n,i,a);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Ht(Yt,Yt.current),c)break;return null;case 22:case 23:return i.lanes=0,bp(n,i,a)}return Hi(n,i,a)}var Op,Eu,kp,Bp;Op=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Eu=function(){},kp=function(n,i,a,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,Br(Ei.current);var m=null;switch(a){case"input":d=Ct(n,d),c=Ct(n,c),m=[];break;case"select":d=oe({},d,{value:void 0}),c=oe({},c,{value:void 0}),m=[];break;case"textarea":d=Gt(n,d),c=Gt(n,c),m=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Fa)}Xe(a,c);var M;a=null;for(J in d)if(!c.hasOwnProperty(J)&&d.hasOwnProperty(J)&&d[J]!=null)if(J==="style"){var D=d[J];for(M in D)D.hasOwnProperty(M)&&(a||(a={}),a[M]="")}else J!=="dangerouslySetInnerHTML"&&J!=="children"&&J!=="suppressContentEditableWarning"&&J!=="suppressHydrationWarning"&&J!=="autoFocus"&&(o.hasOwnProperty(J)?m||(m=[]):(m=m||[]).push(J,null));for(J in c){var z=c[J];if(D=d!=null?d[J]:void 0,c.hasOwnProperty(J)&&z!==D&&(z!=null||D!=null))if(J==="style")if(D){for(M in D)!D.hasOwnProperty(M)||z&&z.hasOwnProperty(M)||(a||(a={}),a[M]="");for(M in z)z.hasOwnProperty(M)&&D[M]!==z[M]&&(a||(a={}),a[M]=z[M])}else a||(m||(m=[]),m.push(J,a)),a=z;else J==="dangerouslySetInnerHTML"?(z=z?z.__html:void 0,D=D?D.__html:void 0,z!=null&&D!==z&&(m=m||[]).push(J,z)):J==="children"?typeof z!="string"&&typeof z!="number"||(m=m||[]).push(J,""+z):J!=="suppressContentEditableWarning"&&J!=="suppressHydrationWarning"&&(o.hasOwnProperty(J)?(z!=null&&J==="onScroll"&&Wt("scroll",n),m||D===z||(m=[])):(m=m||[]).push(J,z))}a&&(m=m||[]).push("style",a);var J=m;(i.updateQueue=J)&&(i.flags|=4)}},Bp=function(n,i,a,c){a!==c&&(i.flags|=4)};function zo(n,i){if(!jt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function yn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function Mv(n,i,a){var c=i.pendingProps;switch(Xc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return yn(i),null;case 1:return Nn(i.type)&&ka(),yn(i),null;case 3:return c=i.stateNode,Rs(),Xt(Un),Xt(_n),ru(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Ga(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,di!==null&&(Uu(di),di=null))),Eu(n,i),yn(i),null;case 5:nu(i);var d=Br(No.current);if(a=i.type,n!==null&&i.stateNode!=null)kp(n,i,a,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return yn(i),null}if(n=Br(Ei.current),Ga(i)){c=i.stateNode,a=i.type;var m=i.memoizedProps;switch(c[Mi]=i,c[Po]=m,n=(i.mode&1)!==0,a){case"dialog":Wt("cancel",c),Wt("close",c);break;case"iframe":case"object":case"embed":Wt("load",c);break;case"video":case"audio":for(d=0;d<Co.length;d++)Wt(Co[d],c);break;case"source":Wt("error",c);break;case"img":case"image":case"link":Wt("error",c),Wt("load",c);break;case"details":Wt("toggle",c);break;case"input":Je(c,m),Wt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Wt("invalid",c);break;case"textarea":L(c,m),Wt("invalid",c)}Xe(a,m),d=null;for(var M in m)if(m.hasOwnProperty(M)){var D=m[M];M==="children"?typeof D=="string"?c.textContent!==D&&(m.suppressHydrationWarning!==!0&&Na(c.textContent,D,n),d=["children",D]):typeof D=="number"&&c.textContent!==""+D&&(m.suppressHydrationWarning!==!0&&Na(c.textContent,D,n),d=["children",""+D]):o.hasOwnProperty(M)&&D!=null&&M==="onScroll"&&Wt("scroll",c)}switch(a){case"input":zt(c),Ot(c,m,!0);break;case"textarea":zt(c),$(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=Fa)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{M=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=ue(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=M.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=M.createElement(a,{is:c.is}):(n=M.createElement(a),a==="select"&&(M=n,c.multiple?M.multiple=!0:c.size&&(M.size=c.size))):n=M.createElementNS(n,a),n[Mi]=i,n[Po]=c,Op(n,i,!1,!1),i.stateNode=n;e:{switch(M=Re(a,c),a){case"dialog":Wt("cancel",n),Wt("close",n),d=c;break;case"iframe":case"object":case"embed":Wt("load",n),d=c;break;case"video":case"audio":for(d=0;d<Co.length;d++)Wt(Co[d],n);d=c;break;case"source":Wt("error",n),d=c;break;case"img":case"image":case"link":Wt("error",n),Wt("load",n),d=c;break;case"details":Wt("toggle",n),d=c;break;case"input":Je(n,c),d=Ct(n,c),Wt("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=oe({},c,{value:void 0}),Wt("invalid",n);break;case"textarea":L(n,c),d=Gt(n,c),Wt("invalid",n);break;default:d=c}Xe(a,d),D=d;for(m in D)if(D.hasOwnProperty(m)){var z=D[m];m==="style"?De(n,z):m==="dangerouslySetInnerHTML"?(z=z?z.__html:void 0,z!=null&&Ye(n,z)):m==="children"?typeof z=="string"?(a!=="textarea"||z!=="")&&we(n,z):typeof z=="number"&&we(n,""+z):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(o.hasOwnProperty(m)?z!=null&&m==="onScroll"&&Wt("scroll",n):z!=null&&P(n,m,z,M))}switch(a){case"input":zt(n),Ot(n,c,!1);break;case"textarea":zt(n),$(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Ce(c.value));break;case"select":n.multiple=!!c.multiple,m=c.value,m!=null?Vt(n,!!c.multiple,m,!1):c.defaultValue!=null&&Vt(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Fa)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return yn(i),null;case 6:if(n&&i.stateNode!=null)Bp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(No.current),Br(Ei.current),Ga(i)){if(c=i.stateNode,a=i.memoizedProps,c[Mi]=i,(m=c.nodeValue!==a)&&(n=Xn,n!==null))switch(n.tag){case 3:Na(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Na(c.nodeValue,a,(n.mode&1)!==0)}m&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[Mi]=i,i.stateNode=c}return yn(i),null;case 13:if(Xt(Yt),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(jt&&jn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Vh(),Ts(),i.flags|=98560,m=!1;else if(m=Ga(i),c!==null&&c.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[Mi]=i}else Ts(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;yn(i),m=!1}else di!==null&&(Uu(di),di=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Yt.current&1)!==0?on===0&&(on=3):Ou())),i.updateQueue!==null&&(i.flags|=4),yn(i),null);case 4:return Rs(),Eu(n,i),n===null&&Ro(i.stateNode.containerInfo),yn(i),null;case 10:return Zc(i.type._context),yn(i),null;case 17:return Nn(i.type)&&ka(),yn(i),null;case 19:if(Xt(Yt),m=i.memoizedState,m===null)return yn(i),null;if(c=(i.flags&128)!==0,M=m.rendering,M===null)if(c)zo(m,!1);else{if(on!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(M=$a(n),M!==null){for(i.flags|=128,zo(m,!1),c=M.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)m=a,n=c,m.flags&=14680066,M=m.alternate,M===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=M.childLanes,m.lanes=M.lanes,m.child=M.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=M.memoizedProps,m.memoizedState=M.memoizedState,m.updateQueue=M.updateQueue,m.type=M.type,n=M.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Ht(Yt,Yt.current&1|2),i.child}n=n.sibling}m.tail!==null&&W()>Ds&&(i.flags|=128,c=!0,zo(m,!1),i.lanes=4194304)}else{if(!c)if(n=$a(M),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),zo(m,!0),m.tail===null&&m.tailMode==="hidden"&&!M.alternate&&!jt)return yn(i),null}else 2*W()-m.renderingStartTime>Ds&&a!==1073741824&&(i.flags|=128,c=!0,zo(m,!1),i.lanes=4194304);m.isBackwards?(M.sibling=i.child,i.child=M):(a=m.last,a!==null?a.sibling=M:i.child=M,m.last=M)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=W(),i.sibling=null,a=Yt.current,Ht(Yt,c?a&1|2:a&1),i):(yn(i),null);case 22:case 23:return Fu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Yn&1073741824)!==0&&(yn(i),i.subtreeFlags&6&&(i.flags|=8192)):yn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Ev(n,i){switch(Xc(i),i.tag){case 1:return Nn(i.type)&&ka(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Rs(),Xt(Un),Xt(_n),ru(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return nu(i),null;case 13:if(Xt(Yt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ts()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Xt(Yt),null;case 4:return Rs(),null;case 10:return Zc(i.type._context),null;case 22:case 23:return Fu(),null;case 24:return null;default:return null}}var rl=!1,Sn=!1,Tv=typeof WeakSet=="function"?WeakSet:Set,Oe=null;function Ps(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Kt(n,i,c)}else a.current=null}function Tu(n,i,a){try{a()}catch(c){Kt(n,i,c)}}var zp=!1;function wv(n,i){if(Fc=Ta,n=_h(),Rc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{a.nodeType,m.nodeType}catch{a=null;break e}var M=0,D=-1,z=-1,J=0,ve=0,xe=n,ge=null;t:for(;;){for(var Ne;xe!==a||d!==0&&xe.nodeType!==3||(D=M+d),xe!==m||c!==0&&xe.nodeType!==3||(z=M+c),xe.nodeType===3&&(M+=xe.nodeValue.length),(Ne=xe.firstChild)!==null;)ge=xe,xe=Ne;for(;;){if(xe===n)break t;if(ge===a&&++J===d&&(D=M),ge===m&&++ve===c&&(z=M),(Ne=xe.nextSibling)!==null)break;xe=ge,ge=xe.parentNode}xe=Ne}a=D===-1||z===-1?null:{start:D,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Oc={focusedElem:n,selectionRange:a},Ta=!1,Oe=i;Oe!==null;)if(i=Oe,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Oe=n;else for(;Oe!==null;){i=Oe;try{var Ve=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ve!==null){var We=Ve.memoizedProps,Qt=Ve.memoizedState,q=i.stateNode,X=q.getSnapshotBeforeUpdate(i.elementType===i.type?We:hi(i.type,We),Qt);q.__reactInternalSnapshotBeforeUpdate=X}break;case 3:var K=i.stateNode.containerInfo;K.nodeType===1?K.textContent="":K.nodeType===9&&K.documentElement&&K.removeChild(K.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Te){Kt(i,i.return,Te)}if(n=i.sibling,n!==null){n.return=i.return,Oe=n;break}Oe=i.return}return Ve=zp,zp=!1,Ve}function Ho(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var m=d.destroy;d.destroy=void 0,m!==void 0&&Tu(i,a,m)}d=d.next}while(d!==c)}}function sl(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function wu(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function Hp(n){var i=n.alternate;i!==null&&(n.alternate=null,Hp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[Mi],delete i[Po],delete i[Hc],delete i[av],delete i[lv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Vp(n){return n.tag===5||n.tag===3||n.tag===4}function Gp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Vp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Au(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Fa));else if(c!==4&&(n=n.child,n!==null))for(Au(n,i,a),n=n.sibling;n!==null;)Au(n,i,a),n=n.sibling}function Cu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Cu(n,i,a),n=n.sibling;n!==null;)Cu(n,i,a),n=n.sibling}var hn=null,pi=!1;function dr(n,i,a){for(a=a.child;a!==null;)Wp(n,i,a),a=a.sibling}function Wp(n,i,a){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Ke,a)}catch{}switch(a.tag){case 5:Sn||Ps(a,i);case 6:var c=hn,d=pi;hn=null,dr(n,i,a),hn=c,pi=d,hn!==null&&(pi?(n=hn,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):hn.removeChild(a.stateNode));break;case 18:hn!==null&&(pi?(n=hn,a=a.stateNode,n.nodeType===8?zc(n.parentNode,a):n.nodeType===1&&zc(n,a),xo(n)):zc(hn,a.stateNode));break;case 4:c=hn,d=pi,hn=a.stateNode.containerInfo,pi=!0,dr(n,i,a),hn=c,pi=d;break;case 0:case 11:case 14:case 15:if(!Sn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var m=d,M=m.destroy;m=m.tag,M!==void 0&&((m&2)!==0||(m&4)!==0)&&Tu(a,i,M),d=d.next}while(d!==c)}dr(n,i,a);break;case 1:if(!Sn&&(Ps(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(D){Kt(a,i,D)}dr(n,i,a);break;case 21:dr(n,i,a);break;case 22:a.mode&1?(Sn=(c=Sn)||a.memoizedState!==null,dr(n,i,a),Sn=c):dr(n,i,a);break;default:dr(n,i,a)}}function Xp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Tv),i.forEach(function(c){var d=Uv.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function mi(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var m=n,M=i,D=M;e:for(;D!==null;){switch(D.tag){case 5:hn=D.stateNode,pi=!1;break e;case 3:hn=D.stateNode.containerInfo,pi=!0;break e;case 4:hn=D.stateNode.containerInfo,pi=!0;break e}D=D.return}if(hn===null)throw Error(t(160));Wp(m,M,d),hn=null,pi=!1;var z=d.alternate;z!==null&&(z.return=null),d.return=null}catch(J){Kt(d,i,J)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)jp(i,n),i=i.sibling}function jp(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(mi(i,n),wi(n),c&4){try{Ho(3,n,n.return),sl(3,n)}catch(We){Kt(n,n.return,We)}try{Ho(5,n,n.return)}catch(We){Kt(n,n.return,We)}}break;case 1:mi(i,n),wi(n),c&512&&a!==null&&Ps(a,a.return);break;case 5:if(mi(i,n),wi(n),c&512&&a!==null&&Ps(a,a.return),n.flags&32){var d=n.stateNode;try{we(d,"")}catch(We){Kt(n,n.return,We)}}if(c&4&&(d=n.stateNode,d!=null)){var m=n.memoizedProps,M=a!==null?a.memoizedProps:m,D=n.type,z=n.updateQueue;if(n.updateQueue=null,z!==null)try{D==="input"&&m.type==="radio"&&m.name!=null&&St(d,m),Re(D,M);var J=Re(D,m);for(M=0;M<z.length;M+=2){var ve=z[M],xe=z[M+1];ve==="style"?De(d,xe):ve==="dangerouslySetInnerHTML"?Ye(d,xe):ve==="children"?we(d,xe):P(d,ve,xe,J)}switch(D){case"input":$e(d,m);break;case"textarea":w(d,m);break;case"select":var ge=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!m.multiple;var Ne=m.value;Ne!=null?Vt(d,!!m.multiple,Ne,!1):ge!==!!m.multiple&&(m.defaultValue!=null?Vt(d,!!m.multiple,m.defaultValue,!0):Vt(d,!!m.multiple,m.multiple?[]:"",!1))}d[Po]=m}catch(We){Kt(n,n.return,We)}}break;case 6:if(mi(i,n),wi(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,m=n.memoizedProps;try{d.nodeValue=m}catch(We){Kt(n,n.return,We)}}break;case 3:if(mi(i,n),wi(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{xo(i.containerInfo)}catch(We){Kt(n,n.return,We)}break;case 4:mi(i,n),wi(n);break;case 13:mi(i,n),wi(n),d=n.child,d.flags&8192&&(m=d.memoizedState!==null,d.stateNode.isHidden=m,!m||d.alternate!==null&&d.alternate.memoizedState!==null||(Pu=W())),c&4&&Xp(n);break;case 22:if(ve=a!==null&&a.memoizedState!==null,n.mode&1?(Sn=(J=Sn)||ve,mi(i,n),Sn=J):mi(i,n),wi(n),c&8192){if(J=n.memoizedState!==null,(n.stateNode.isHidden=J)&&!ve&&(n.mode&1)!==0)for(Oe=n,ve=n.child;ve!==null;){for(xe=Oe=ve;Oe!==null;){switch(ge=Oe,Ne=ge.child,ge.tag){case 0:case 11:case 14:case 15:Ho(4,ge,ge.return);break;case 1:Ps(ge,ge.return);var Ve=ge.stateNode;if(typeof Ve.componentWillUnmount=="function"){c=ge,a=ge.return;try{i=c,Ve.props=i.memoizedProps,Ve.state=i.memoizedState,Ve.componentWillUnmount()}catch(We){Kt(c,a,We)}}break;case 5:Ps(ge,ge.return);break;case 22:if(ge.memoizedState!==null){$p(xe);continue}}Ne!==null?(Ne.return=ge,Oe=Ne):$p(xe)}ve=ve.sibling}e:for(ve=null,xe=n;;){if(xe.tag===5){if(ve===null){ve=xe;try{d=xe.stateNode,J?(m=d.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(D=xe.stateNode,z=xe.memoizedProps.style,M=z!=null&&z.hasOwnProperty("display")?z.display:null,D.style.display=Ee("display",M))}catch(We){Kt(n,n.return,We)}}}else if(xe.tag===6){if(ve===null)try{xe.stateNode.nodeValue=J?"":xe.memoizedProps}catch(We){Kt(n,n.return,We)}}else if((xe.tag!==22&&xe.tag!==23||xe.memoizedState===null||xe===n)&&xe.child!==null){xe.child.return=xe,xe=xe.child;continue}if(xe===n)break e;for(;xe.sibling===null;){if(xe.return===null||xe.return===n)break e;ve===xe&&(ve=null),xe=xe.return}ve===xe&&(ve=null),xe.sibling.return=xe.return,xe=xe.sibling}}break;case 19:mi(i,n),wi(n),c&4&&Xp(n);break;case 21:break;default:mi(i,n),wi(n)}}function wi(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Vp(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(we(d,""),c.flags&=-33);var m=Gp(n);Cu(n,m,d);break;case 3:case 4:var M=c.stateNode.containerInfo,D=Gp(n);Au(n,D,M);break;default:throw Error(t(161))}}catch(z){Kt(n,n.return,z)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Av(n,i,a){Oe=n,Yp(n)}function Yp(n,i,a){for(var c=(n.mode&1)!==0;Oe!==null;){var d=Oe,m=d.child;if(d.tag===22&&c){var M=d.memoizedState!==null||rl;if(!M){var D=d.alternate,z=D!==null&&D.memoizedState!==null||Sn;D=rl;var J=Sn;if(rl=M,(Sn=z)&&!J)for(Oe=d;Oe!==null;)M=Oe,z=M.child,M.tag===22&&M.memoizedState!==null?Kp(d):z!==null?(z.return=M,Oe=z):Kp(d);for(;m!==null;)Oe=m,Yp(m),m=m.sibling;Oe=d,rl=D,Sn=J}qp(n)}else(d.subtreeFlags&8772)!==0&&m!==null?(m.return=d,Oe=m):qp(n)}}function qp(n){for(;Oe!==null;){var i=Oe;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:Sn||sl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!Sn)if(a===null)c.componentDidMount();else{var d=i.elementType===i.type?a.memoizedProps:hi(i.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&$h(i,m,c);break;case 3:var M=i.updateQueue;if(M!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}$h(i,M,a)}break;case 5:var D=i.stateNode;if(a===null&&i.flags&4){a=D;var z=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":z.autoFocus&&a.focus();break;case"img":z.src&&(a.src=z.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var J=i.alternate;if(J!==null){var ve=J.memoizedState;if(ve!==null){var xe=ve.dehydrated;xe!==null&&xo(xe)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Sn||i.flags&512&&wu(i)}catch(ge){Kt(i,i.return,ge)}}if(i===n){Oe=null;break}if(a=i.sibling,a!==null){a.return=i.return,Oe=a;break}Oe=i.return}}function $p(n){for(;Oe!==null;){var i=Oe;if(i===n){Oe=null;break}var a=i.sibling;if(a!==null){a.return=i.return,Oe=a;break}Oe=i.return}}function Kp(n){for(;Oe!==null;){var i=Oe;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{sl(4,i)}catch(z){Kt(i,a,z)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(z){Kt(i,d,z)}}var m=i.return;try{wu(i)}catch(z){Kt(i,m,z)}break;case 5:var M=i.return;try{wu(i)}catch(z){Kt(i,M,z)}}}catch(z){Kt(i,i.return,z)}if(i===n){Oe=null;break}var D=i.sibling;if(D!==null){D.return=i.return,Oe=D;break}Oe=i.return}}var Cv=Math.ceil,ol=C.ReactCurrentDispatcher,Ru=C.ReactCurrentOwner,si=C.ReactCurrentBatchConfig,Tt=0,un=null,Jt=null,pn=0,Yn=0,Ls=ar(0),on=0,Vo=null,Hr=0,al=0,bu=0,Go=null,On=null,Pu=0,Ds=1/0,Vi=null,ll=!1,Lu=null,hr=null,cl=!1,pr=null,ul=0,Wo=0,Du=null,fl=-1,dl=0;function Rn(){return(Tt&6)!==0?W():fl!==-1?fl:fl=W()}function mr(n){return(n.mode&1)===0?1:(Tt&2)!==0&&pn!==0?pn&-pn:uv.transition!==null?(dl===0&&(dl=An()),dl):(n=vt,n!==0||(n=window.event,n=n===void 0?16:Qd(n.type)),n)}function gi(n,i,a,c){if(50<Wo)throw Wo=0,Du=null,Error(t(185));Zt(n,a,c),((Tt&2)===0||n!==un)&&(n===un&&((Tt&2)===0&&(al|=a),on===4&&gr(n,pn)),kn(n,c),a===1&&Tt===0&&(i.mode&1)===0&&(Ds=W()+500,za&&cr()))}function kn(n,i){var a=n.callbackNode;Dr(n,i);var c=ui(n,n===un?pn:0);if(c===0)a!==null&&Y(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Y(a),i===1)n.tag===0?cv(Qp.bind(null,n)):Oh(Qp.bind(null,n)),sv(function(){(Tt&6)===0&&cr()}),a=null;else{switch(Wd(c)){case 1:a=be;break;case 4:a=He;break;case 16:a=Ue;break;case 536870912:a=st;break;default:a=Ue}a=om(a,Zp.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function Zp(n,i){if(fl=-1,dl=0,(Tt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Is()&&n.callbackNode!==a)return null;var c=ui(n,n===un?pn:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=hl(n,c);else{i=c;var d=Tt;Tt|=2;var m=em();(un!==n||pn!==i)&&(Vi=null,Ds=W()+500,Gr(n,i));do try{Pv();break}catch(D){Jp(n,D)}while(!0);Kc(),ol.current=m,Tt=d,Jt!==null?i=0:(un=null,pn=0,i=on)}if(i!==0){if(i===2&&(d=Bt(n),d!==0&&(c=d,i=Iu(n,d))),i===1)throw a=Vo,Gr(n,0),gr(n,c),kn(n,W()),a;if(i===6)gr(n,c);else{if(d=n.current.alternate,(c&30)===0&&!Rv(d)&&(i=hl(n,c),i===2&&(m=Bt(n),m!==0&&(c=m,i=Iu(n,m))),i===1))throw a=Vo,Gr(n,0),gr(n,c),kn(n,W()),a;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:Wr(n,On,Vi);break;case 3:if(gr(n,c),(c&130023424)===c&&(i=Pu+500-W(),10<i)){if(ui(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){Rn(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=Bc(Wr.bind(null,n,On,Vi),i);break}Wr(n,On,Vi);break;case 4:if(gr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var M=31-Et(c);m=1<<M,M=i[M],M>d&&(d=M),c&=~m}if(c=d,c=W()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Cv(c/1960))-c,10<c){n.timeoutHandle=Bc(Wr.bind(null,n,On,Vi),c);break}Wr(n,On,Vi);break;case 5:Wr(n,On,Vi);break;default:throw Error(t(329))}}}return kn(n,W()),n.callbackNode===a?Zp.bind(null,n):null}function Iu(n,i){var a=Go;return n.current.memoizedState.isDehydrated&&(Gr(n,i).flags|=256),n=hl(n,i),n!==2&&(i=On,On=a,i!==null&&Uu(i)),n}function Uu(n){On===null?On=n:On.push.apply(On,n)}function Rv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],m=d.getSnapshot;d=d.value;try{if(!fi(m(),d))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function gr(n,i){for(i&=~bu,i&=~al,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Et(i),c=1<<a;n[a]=-1,i&=~c}}function Qp(n){if((Tt&6)!==0)throw Error(t(327));Is();var i=ui(n,0);if((i&1)===0)return kn(n,W()),null;var a=hl(n,i);if(n.tag!==0&&a===2){var c=Bt(n);c!==0&&(i=c,a=Iu(n,c))}if(a===1)throw a=Vo,Gr(n,0),gr(n,i),kn(n,W()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Wr(n,On,Vi),kn(n,W()),null}function Nu(n,i){var a=Tt;Tt|=1;try{return n(i)}finally{Tt=a,Tt===0&&(Ds=W()+500,za&&cr())}}function Vr(n){pr!==null&&pr.tag===0&&(Tt&6)===0&&Is();var i=Tt;Tt|=1;var a=si.transition,c=vt;try{if(si.transition=null,vt=1,n)return n()}finally{vt=c,si.transition=a,Tt=i,(Tt&6)===0&&cr()}}function Fu(){Yn=Ls.current,Xt(Ls)}function Gr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,rv(a)),Jt!==null)for(a=Jt.return;a!==null;){var c=a;switch(Xc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&ka();break;case 3:Rs(),Xt(Un),Xt(_n),ru();break;case 5:nu(c);break;case 4:Rs();break;case 13:Xt(Yt);break;case 19:Xt(Yt);break;case 10:Zc(c.type._context);break;case 22:case 23:Fu()}a=a.return}if(un=n,Jt=n=vr(n.current,null),pn=Yn=i,on=0,Vo=null,bu=al=Hr=0,On=Go=null,kr!==null){for(i=0;i<kr.length;i++)if(a=kr[i],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,m=a.pending;if(m!==null){var M=m.next;m.next=d,c.next=M}a.pending=c}kr=null}return n}function Jp(n,i){do{var a=Jt;try{if(Kc(),Ka.current=el,Za){for(var c=qt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Za=!1}if(zr=0,cn=sn=qt=null,Fo=!1,Oo=0,Ru.current=null,a===null||a.return===null){on=1,Vo=i,Jt=null;break}e:{var m=n,M=a.return,D=a,z=i;if(i=pn,D.flags|=32768,z!==null&&typeof z=="object"&&typeof z.then=="function"){var J=z,ve=D,xe=ve.tag;if((ve.mode&1)===0&&(xe===0||xe===11||xe===15)){var ge=ve.alternate;ge?(ve.updateQueue=ge.updateQueue,ve.memoizedState=ge.memoizedState,ve.lanes=ge.lanes):(ve.updateQueue=null,ve.memoizedState=null)}var Ne=Tp(M);if(Ne!==null){Ne.flags&=-257,wp(Ne,M,D,m,i),Ne.mode&1&&Ep(m,J,i),i=Ne,z=J;var Ve=i.updateQueue;if(Ve===null){var We=new Set;We.add(z),i.updateQueue=We}else Ve.add(z);break e}else{if((i&1)===0){Ep(m,J,i),Ou();break e}z=Error(t(426))}}else if(jt&&D.mode&1){var Qt=Tp(M);if(Qt!==null){(Qt.flags&65536)===0&&(Qt.flags|=256),wp(Qt,M,D,m,i),qc(bs(z,D));break e}}m=z=bs(z,D),on!==4&&(on=2),Go===null?Go=[m]:Go.push(m),m=M;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var q=Sp(m,z,i);qh(m,q);break e;case 1:D=z;var X=m.type,K=m.stateNode;if((m.flags&128)===0&&(typeof X.getDerivedStateFromError=="function"||K!==null&&typeof K.componentDidCatch=="function"&&(hr===null||!hr.has(K)))){m.flags|=65536,i&=-i,m.lanes|=i;var Te=Mp(m,D,i);qh(m,Te);break e}}m=m.return}while(m!==null)}nm(a)}catch(je){i=je,Jt===a&&a!==null&&(Jt=a=a.return);continue}break}while(!0)}function em(){var n=ol.current;return ol.current=el,n===null?el:n}function Ou(){(on===0||on===3||on===2)&&(on=4),un===null||(Hr&268435455)===0&&(al&268435455)===0||gr(un,pn)}function hl(n,i){var a=Tt;Tt|=2;var c=em();(un!==n||pn!==i)&&(Vi=null,Gr(n,i));do try{bv();break}catch(d){Jp(n,d)}while(!0);if(Kc(),Tt=a,ol.current=c,Jt!==null)throw Error(t(261));return un=null,pn=0,on}function bv(){for(;Jt!==null;)tm(Jt)}function Pv(){for(;Jt!==null&&!ee();)tm(Jt)}function tm(n){var i=sm(n.alternate,n,Yn);n.memoizedProps=n.pendingProps,i===null?nm(n):Jt=i,Ru.current=null}function nm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=Mv(a,i,Yn),a!==null){Jt=a;return}}else{if(a=Ev(a,i),a!==null){a.flags&=32767,Jt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{on=6,Jt=null;return}}if(i=i.sibling,i!==null){Jt=i;return}Jt=i=n}while(i!==null);on===0&&(on=5)}function Wr(n,i,a){var c=vt,d=si.transition;try{si.transition=null,vt=1,Lv(n,i,a,c)}finally{si.transition=d,vt=c}return null}function Lv(n,i,a,c){do Is();while(pr!==null);if((Tt&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=a.lanes|a.childLanes;if(vn(n,m),n===un&&(Jt=un=null,pn=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||cl||(cl=!0,om(Ue,function(){return Is(),null})),m=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||m){m=si.transition,si.transition=null;var M=vt;vt=1;var D=Tt;Tt|=4,Ru.current=null,wv(n,a),jp(a,n),Z0(Oc),Ta=!!Fc,Oc=Fc=null,n.current=a,Av(a),ne(),Tt=D,vt=M,si.transition=m}else n.current=a;if(cl&&(cl=!1,pr=n,ul=d),m=n.pendingLanes,m===0&&(hr=null),Rt(a.stateNode),kn(n,W()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)d=i[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(ll)throw ll=!1,n=Lu,Lu=null,n;return(ul&1)!==0&&n.tag!==0&&Is(),m=n.pendingLanes,(m&1)!==0?n===Du?Wo++:(Wo=0,Du=n):Wo=0,cr(),null}function Is(){if(pr!==null){var n=Wd(ul),i=si.transition,a=vt;try{if(si.transition=null,vt=16>n?16:n,pr===null)var c=!1;else{if(n=pr,pr=null,ul=0,(Tt&6)!==0)throw Error(t(331));var d=Tt;for(Tt|=4,Oe=n.current;Oe!==null;){var m=Oe,M=m.child;if((Oe.flags&16)!==0){var D=m.deletions;if(D!==null){for(var z=0;z<D.length;z++){var J=D[z];for(Oe=J;Oe!==null;){var ve=Oe;switch(ve.tag){case 0:case 11:case 15:Ho(8,ve,m)}var xe=ve.child;if(xe!==null)xe.return=ve,Oe=xe;else for(;Oe!==null;){ve=Oe;var ge=ve.sibling,Ne=ve.return;if(Hp(ve),ve===J){Oe=null;break}if(ge!==null){ge.return=Ne,Oe=ge;break}Oe=Ne}}}var Ve=m.alternate;if(Ve!==null){var We=Ve.child;if(We!==null){Ve.child=null;do{var Qt=We.sibling;We.sibling=null,We=Qt}while(We!==null)}}Oe=m}}if((m.subtreeFlags&2064)!==0&&M!==null)M.return=m,Oe=M;else e:for(;Oe!==null;){if(m=Oe,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:Ho(9,m,m.return)}var q=m.sibling;if(q!==null){q.return=m.return,Oe=q;break e}Oe=m.return}}var X=n.current;for(Oe=X;Oe!==null;){M=Oe;var K=M.child;if((M.subtreeFlags&2064)!==0&&K!==null)K.return=M,Oe=K;else e:for(M=X;Oe!==null;){if(D=Oe,(D.flags&2048)!==0)try{switch(D.tag){case 0:case 11:case 15:sl(9,D)}}catch(je){Kt(D,D.return,je)}if(D===M){Oe=null;break e}var Te=D.sibling;if(Te!==null){Te.return=D.return,Oe=Te;break e}Oe=D.return}}if(Tt=d,cr(),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Ke,n)}catch{}c=!0}return c}finally{vt=a,si.transition=i}}return!1}function im(n,i,a){i=bs(a,i),i=Sp(n,i,1),n=fr(n,i,1),i=Rn(),n!==null&&(Zt(n,1,i),kn(n,i))}function Kt(n,i,a){if(n.tag===3)im(n,n,a);else for(;i!==null;){if(i.tag===3){im(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(hr===null||!hr.has(c))){n=bs(a,n),n=Mp(i,n,1),i=fr(i,n,1),n=Rn(),i!==null&&(Zt(i,1,n),kn(i,n));break}}i=i.return}}function Dv(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Rn(),n.pingedLanes|=n.suspendedLanes&a,un===n&&(pn&a)===a&&(on===4||on===3&&(pn&130023424)===pn&&500>W()-Pu?Gr(n,0):bu|=a),kn(n,i)}function rm(n,i){i===0&&((n.mode&1)===0?i=1:(i=gt,gt<<=1,(gt&130023424)===0&&(gt=4194304)));var a=Rn();n=Bi(n,i),n!==null&&(Zt(n,i,a),kn(n,a))}function Iv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),rm(n,a)}function Uv(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),rm(n,a)}var sm;sm=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Un.current)Fn=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return Fn=!1,Sv(n,i,a);Fn=(n.flags&131072)!==0}else Fn=!1,jt&&(i.flags&1048576)!==0&&kh(i,Va,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;il(n,i),n=i.pendingProps;var d=Ss(i,_n.current);Cs(i,a),d=au(null,i,c,n,d,a);var m=lu();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Nn(c)?(m=!0,Ba(i)):m=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,eu(i),d.updater=tl,i.stateNode=d,d._reactInternals=i,pu(i,c,n,a),i=_u(null,i,c,!0,m,a)):(i.tag=0,jt&&m&&Wc(i),Cn(null,i,d,a),i=i.child),i;case 16:c=i.elementType;e:{switch(il(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=Fv(c),n=hi(c,n),d){case 0:i=vu(null,i,c,n,a);break e;case 1:i=Lp(null,i,c,n,a);break e;case 11:i=Ap(null,i,c,n,a);break e;case 14:i=Cp(null,i,c,hi(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:hi(c,d),vu(n,i,c,d,a);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:hi(c,d),Lp(n,i,c,d,a);case 3:e:{if(Dp(i),n===null)throw Error(t(387));c=i.pendingProps,m=i.memoizedState,d=m.element,Yh(n,i),qa(i,c,null,a);var M=i.memoizedState;if(c=M.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){d=bs(Error(t(423)),i),i=Ip(n,i,c,a,d);break e}else if(c!==d){d=bs(Error(t(424)),i),i=Ip(n,i,c,a,d);break e}else for(jn=or(i.stateNode.containerInfo.firstChild),Xn=i,jt=!0,di=null,a=Xh(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ts(),c===d){i=Hi(n,i,a);break e}Cn(n,i,c,a)}i=i.child}return i;case 5:return Kh(i),n===null&&Yc(i),c=i.type,d=i.pendingProps,m=n!==null?n.memoizedProps:null,M=d.children,kc(c,d)?M=null:m!==null&&kc(c,m)&&(i.flags|=32),Pp(n,i),Cn(n,i,M,a),i.child;case 6:return n===null&&Yc(i),null;case 13:return Up(n,i,a);case 4:return tu(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=ws(i,null,c,a):Cn(n,i,c,a),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:hi(c,d),Ap(n,i,c,d,a);case 7:return Cn(n,i,i.pendingProps,a),i.child;case 8:return Cn(n,i,i.pendingProps.children,a),i.child;case 12:return Cn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,m=i.memoizedProps,M=d.value,Ht(Xa,c._currentValue),c._currentValue=M,m!==null)if(fi(m.value,M)){if(m.children===d.children&&!Un.current){i=Hi(n,i,a);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var D=m.dependencies;if(D!==null){M=m.child;for(var z=D.firstContext;z!==null;){if(z.context===c){if(m.tag===1){z=zi(-1,a&-a),z.tag=2;var J=m.updateQueue;if(J!==null){J=J.shared;var ve=J.pending;ve===null?z.next=z:(z.next=ve.next,ve.next=z),J.pending=z}}m.lanes|=a,z=m.alternate,z!==null&&(z.lanes|=a),Qc(m.return,a,i),D.lanes|=a;break}z=z.next}}else if(m.tag===10)M=m.type===i.type?null:m.child;else if(m.tag===18){if(M=m.return,M===null)throw Error(t(341));M.lanes|=a,D=M.alternate,D!==null&&(D.lanes|=a),Qc(M,a,i),M=m.sibling}else M=m.child;if(M!==null)M.return=m;else for(M=m;M!==null;){if(M===i){M=null;break}if(m=M.sibling,m!==null){m.return=M.return,M=m;break}M=M.return}m=M}Cn(n,i,d.children,a),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,Cs(i,a),d=ii(d),c=c(d),i.flags|=1,Cn(n,i,c,a),i.child;case 14:return c=i.type,d=hi(c,i.pendingProps),d=hi(c.type,d),Cp(n,i,c,d,a);case 15:return Rp(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:hi(c,d),il(n,i),i.tag=1,Nn(c)?(n=!0,Ba(i)):n=!1,Cs(i,a),xp(i,c,d),pu(i,c,d,a),_u(null,i,c,!0,n,a);case 19:return Fp(n,i,a);case 22:return bp(n,i,a)}throw Error(t(156,i.tag))};function om(n,i){return A(n,i)}function Nv(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oi(n,i,a,c){return new Nv(n,i,a,c)}function ku(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Fv(n){if(typeof n=="function")return ku(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ie)return 11;if(n===de)return 14}return 2}function vr(n,i){var a=n.alternate;return a===null?(a=oi(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function pl(n,i,a,c,d,m){var M=2;if(c=n,typeof n=="function")ku(n)&&(M=1);else if(typeof n=="string")M=5;else e:switch(n){case k:return Xr(a.children,d,m,i);case j:M=8,d|=8;break;case b:return n=oi(12,a,i,d|2),n.elementType=b,n.lanes=m,n;case te:return n=oi(13,a,i,d),n.elementType=te,n.lanes=m,n;case se:return n=oi(19,a,i,d),n.elementType=se,n.lanes=m,n;case fe:return ml(a,d,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case R:M=10;break e;case I:M=9;break e;case ie:M=11;break e;case de:M=14;break e;case ae:M=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=oi(M,a,i,d),i.elementType=n,i.type=c,i.lanes=m,i}function Xr(n,i,a,c){return n=oi(7,n,c,i),n.lanes=a,n}function ml(n,i,a,c){return n=oi(22,n,c,i),n.elementType=fe,n.lanes=a,n.stateNode={isHidden:!1},n}function Bu(n,i,a){return n=oi(6,n,null,i),n.lanes=a,n}function zu(n,i,a){return i=oi(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Ov(n,i,a,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gn(0),this.expirationTimes=gn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gn(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Hu(n,i,a,c,d,m,M,D,z){return n=new Ov(n,i,a,D,z),i===1?(i=1,m===!0&&(i|=8)):i=0,m=oi(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},eu(m),n}function kv(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:U,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function am(n){if(!n)return lr;n=n._reactInternals;e:{if(Ui(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Nn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Nn(a))return Nh(n,a,i)}return i}function lm(n,i,a,c,d,m,M,D,z){return n=Hu(a,c,!0,n,d,m,M,D,z),n.context=am(null),a=n.current,c=Rn(),d=mr(a),m=zi(c,d),m.callback=i??null,fr(a,m,d),n.current.lanes=d,Zt(n,d,c),kn(n,c),n}function gl(n,i,a,c){var d=i.current,m=Rn(),M=mr(d);return a=am(a),i.context===null?i.context=a:i.pendingContext=a,i=zi(m,M),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=fr(d,i,M),n!==null&&(gi(n,d,M,m),Ya(n,d,M)),M}function vl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function cm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Vu(n,i){cm(n,i),(n=n.alternate)&&cm(n,i)}function Bv(){return null}var um=typeof reportError=="function"?reportError:function(n){console.error(n)};function Gu(n){this._internalRoot=n}_l.prototype.render=Gu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));gl(n,i,null,null)},_l.prototype.unmount=Gu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Vr(function(){gl(null,n,null,null)}),i[Ni]=null}};function _l(n){this._internalRoot=n}_l.prototype.unstable_scheduleHydration=function(n){if(n){var i=Yd();n={blockedOn:null,target:n,priority:i};for(var a=0;a<ir.length&&i!==0&&i<ir[a].priority;a++);ir.splice(a,0,n),a===0&&Kd(n)}};function Wu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function xl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function fm(){}function zv(n,i,a,c,d){if(d){if(typeof c=="function"){var m=c;c=function(){var J=vl(M);m.call(J)}}var M=lm(i,c,n,0,null,!1,!1,"",fm);return n._reactRootContainer=M,n[Ni]=M.current,Ro(n.nodeType===8?n.parentNode:n),Vr(),M}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var D=c;c=function(){var J=vl(z);D.call(J)}}var z=Hu(n,0,!1,null,null,!1,!1,"",fm);return n._reactRootContainer=z,n[Ni]=z.current,Ro(n.nodeType===8?n.parentNode:n),Vr(function(){gl(i,z,a,c)}),z}function yl(n,i,a,c,d){var m=a._reactRootContainer;if(m){var M=m;if(typeof d=="function"){var D=d;d=function(){var z=vl(M);D.call(z)}}gl(i,M,n,d)}else M=zv(a,i,n,d,c);return vl(M)}Xd=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=rn(i.pendingLanes);a!==0&&(Ir(i,a|1),kn(i,W()),(Tt&6)===0&&(Ds=W()+500,cr()))}break;case 13:Vr(function(){var c=Bi(n,1);if(c!==null){var d=Rn();gi(c,n,1,d)}}),Vu(n,1)}},mc=function(n){if(n.tag===13){var i=Bi(n,134217728);if(i!==null){var a=Rn();gi(i,n,134217728,a)}Vu(n,134217728)}},jd=function(n){if(n.tag===13){var i=mr(n),a=Bi(n,i);if(a!==null){var c=Rn();gi(a,n,i,c)}Vu(n,i)}},Yd=function(){return vt},qd=function(n,i){var a=vt;try{return vt=n,i()}finally{vt=a}},Se=function(n,i,a){switch(i){case"input":if($e(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var d=Oa(c);if(!d)throw Error(t(90));_t(c),$e(c,d)}}}break;case"textarea":w(n,a);break;case"select":i=a.value,i!=null&&Vt(n,!!a.multiple,i,!1)}},lt=Nu,bt=Vr;var Hv={usingClientEntryPoint:!1,Events:[Lo,xs,Oa,he,Ge,Nu]},Xo={findFiberByHostInstance:Ur,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Vv={bundleType:Xo.bundleType,version:Xo.version,rendererPackageName:Xo.rendererPackageName,rendererConfig:Xo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=ya(n),n===null?null:n.stateNode},findFiberByHostInstance:Xo.findFiberByHostInstance||Bv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Sl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Sl.isDisabled&&Sl.supportsFiber)try{Ke=Sl.inject(Vv),ot=Sl}catch{}}return Bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hv,Bn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wu(i))throw Error(t(200));return kv(n,i,null,a)},Bn.createRoot=function(n,i){if(!Wu(n))throw Error(t(299));var a=!1,c="",d=um;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Hu(n,1,!1,null,null,a,!1,c,d),n[Ni]=i.current,Ro(n.nodeType===8?n.parentNode:n),new Gu(i)},Bn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=ya(i),n=n===null?null:n.stateNode,n},Bn.flushSync=function(n){return Vr(n)},Bn.hydrate=function(n,i,a){if(!xl(i))throw Error(t(200));return yl(null,n,i,!0,a)},Bn.hydrateRoot=function(n,i,a){if(!Wu(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,m="",M=um;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(m=a.identifierPrefix),a.onRecoverableError!==void 0&&(M=a.onRecoverableError)),i=lm(i,null,n,1,a??null,d,!1,m,M),n[Ni]=i.current,Ro(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,d]:i.mutableSourceEagerHydrationData.push(a,d);return new _l(i)},Bn.render=function(n,i,a){if(!xl(i))throw Error(t(200));return yl(null,n,i,!1,a)},Bn.unmountComponentAtNode=function(n){if(!xl(n))throw Error(t(40));return n._reactRootContainer?(Vr(function(){yl(null,null,n,!1,function(){n._reactRootContainer=null,n[Ni]=null})}),!0):!1},Bn.unstable_batchedUpdates=Nu,Bn.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!xl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return yl(n,i,a,!1,c)},Bn.version="18.3.1-next-f1338f8080-20240426",Bn}var xm;function Jv(){if(xm)return Yu.exports;xm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Yu.exports=Qv(),Yu.exports}var ym;function e_(){if(ym)return Ml;ym=1;var s=Jv();return Ml.createRoot=s.createRoot,Ml.hydrateRoot=s.hydrateRoot,Ml}var t_=e_();const n_=Lg(t_);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Md="179",i_=0,Sm=1,r_=2,Dg=1,Ig=2,qi=3,Rr=0,Dn=1,Ci=2,Ar=0,to=1,Mm=2,Em=3,Tm=4,s_=5,ts=100,o_=101,a_=102,l_=103,c_=104,u_=200,f_=201,d_=202,h_=203,If=204,Uf=205,p_=206,m_=207,g_=208,v_=209,__=210,x_=211,y_=212,S_=213,M_=214,Nf=0,Ff=1,Of=2,ro=3,kf=4,Bf=5,zf=6,Hf=7,Ug=0,E_=1,T_=2,Cr=0,w_=1,A_=2,C_=3,Ng=4,R_=5,b_=6,P_=7,Fg=300,so=301,oo=302,Vf=303,Gf=304,dc=306,Wf=1e3,is=1001,Xf=1002,Jn=1003,L_=1004,El=1005,Ri=1006,Ku=1007,rs=1008,Li=1009,Og=1010,kg=1011,aa=1012,Ed=1013,os=1014,bi=1015,ha=1016,Td=1017,wd=1018,la=1020,Bg=35902,zg=1021,Hg=1022,Si=1023,ca=1026,ua=1027,Ad=1028,Cd=1029,Vg=1030,Rd=1031,bd=1033,Jl=33776,ec=33777,tc=33778,nc=33779,jf=35840,Yf=35841,qf=35842,$f=35843,Kf=36196,Zf=37492,Qf=37496,Jf=37808,ed=37809,td=37810,nd=37811,id=37812,rd=37813,sd=37814,od=37815,ad=37816,ld=37817,cd=37818,ud=37819,fd=37820,dd=37821,ic=36492,hd=36494,pd=36495,Gg=36283,md=36284,gd=36285,vd=36286,D_=3200,I_=3201,Wg=0,U_=1,wr="",Vn="srgb",ao="srgb-linear",oc="linear",Ut="srgb",Us=7680,wm=519,N_=512,F_=513,O_=514,Xg=515,k_=516,B_=517,z_=518,H_=519,_d=35044,Am="300 es",Pi=2e3,ac=2001;class uo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const o=r[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cm=1234567;const sa=Math.PI/180,fa=180/Math.PI;function Zi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Mn[s&255]+Mn[s>>8&255]+Mn[s>>16&255]+Mn[s>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[r&255]+Mn[r>>8&255]+Mn[r>>16&255]+Mn[r>>24&255]).toLowerCase()}function xt(s,e,t){return Math.max(e,Math.min(t,s))}function Pd(s,e){return(s%e+e)%e}function V_(s,e,t,r,o){return r+(s-e)*(o-r)/(t-e)}function G_(s,e,t){return s!==e?(t-s)/(e-s):0}function oa(s,e,t){return(1-t)*s+t*e}function W_(s,e,t,r){return oa(s,e,1-Math.exp(-t*r))}function X_(s,e=1){return e-Math.abs(Pd(s,e*2)-e)}function j_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Y_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function q_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function $_(s,e){return s+Math.random()*(e-s)}function K_(s){return s*(.5-Math.random())}function Z_(s){s!==void 0&&(Cm=s);let e=Cm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Q_(s){return s*sa}function J_(s){return s*fa}function ex(s){return(s&s-1)===0&&s!==0}function tx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function nx(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ix(s,e,t,r,o){const l=Math.cos,u=Math.sin,f=l(t/2),h=u(t/2),p=l((e+r)/2),x=u((e+r)/2),_=l((e-r)/2),g=u((e-r)/2),S=l((r-e)/2),E=u((r-e)/2);switch(o){case"XYX":s.set(f*x,h*_,h*g,f*p);break;case"YZY":s.set(h*g,f*x,h*_,f*p);break;case"ZXZ":s.set(h*_,h*g,f*x,f*p);break;case"XZX":s.set(f*x,h*E,h*S,f*p);break;case"YXY":s.set(h*S,f*x,h*E,f*p);break;case"ZYZ":s.set(h*E,h*S,f*x,f*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function yi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Lt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Hn={DEG2RAD:sa,RAD2DEG:fa,generateUUID:Zi,clamp:xt,euclideanModulo:Pd,mapLinear:V_,inverseLerp:G_,lerp:oa,damp:W_,pingpong:X_,smoothstep:j_,smootherstep:Y_,randInt:q_,randFloat:$_,randFloatSpread:K_,seededRandom:Z_,degToRad:Q_,radToDeg:J_,isPowerOfTwo:ex,ceilPowerOfTwo:tx,floorPowerOfTwo:nx,setQuaternionFromProperEuler:ix,normalize:Lt,denormalize:yi};class ft{constructor(e=0,t=0){ft.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*o+e.x,this.y=l*o+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class pa{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,u,f){let h=r[o+0],p=r[o+1],x=r[o+2],_=r[o+3];const g=l[u+0],S=l[u+1],E=l[u+2],T=l[u+3];if(f===0){e[t+0]=h,e[t+1]=p,e[t+2]=x,e[t+3]=_;return}if(f===1){e[t+0]=g,e[t+1]=S,e[t+2]=E,e[t+3]=T;return}if(_!==T||h!==g||p!==S||x!==E){let y=1-f;const v=h*g+p*S+x*E+_*T,F=v>=0?1:-1,P=1-v*v;if(P>Number.EPSILON){const N=Math.sqrt(P),U=Math.atan2(N,v*F);y=Math.sin(y*U)/N,f=Math.sin(f*U)/N}const C=f*F;if(h=h*y+g*C,p=p*y+S*C,x=x*y+E*C,_=_*y+T*C,y===1-f){const N=1/Math.sqrt(h*h+p*p+x*x+_*_);h*=N,p*=N,x*=N,_*=N}}e[t]=h,e[t+1]=p,e[t+2]=x,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,o,l,u){const f=r[o],h=r[o+1],p=r[o+2],x=r[o+3],_=l[u],g=l[u+1],S=l[u+2],E=l[u+3];return e[t]=f*E+x*_+h*S-p*g,e[t+1]=h*E+x*g+p*_-f*S,e[t+2]=p*E+x*S+f*g-h*_,e[t+3]=x*E-f*_-h*g-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,u=e._order,f=Math.cos,h=Math.sin,p=f(r/2),x=f(o/2),_=f(l/2),g=h(r/2),S=h(o/2),E=h(l/2);switch(u){case"XYZ":this._x=g*x*_+p*S*E,this._y=p*S*_-g*x*E,this._z=p*x*E+g*S*_,this._w=p*x*_-g*S*E;break;case"YXZ":this._x=g*x*_+p*S*E,this._y=p*S*_-g*x*E,this._z=p*x*E-g*S*_,this._w=p*x*_+g*S*E;break;case"ZXY":this._x=g*x*_-p*S*E,this._y=p*S*_+g*x*E,this._z=p*x*E+g*S*_,this._w=p*x*_-g*S*E;break;case"ZYX":this._x=g*x*_-p*S*E,this._y=p*S*_+g*x*E,this._z=p*x*E-g*S*_,this._w=p*x*_+g*S*E;break;case"YZX":this._x=g*x*_+p*S*E,this._y=p*S*_+g*x*E,this._z=p*x*E-g*S*_,this._w=p*x*_-g*S*E;break;case"XZY":this._x=g*x*_-p*S*E,this._y=p*S*_-g*x*E,this._z=p*x*E+g*S*_,this._w=p*x*_+g*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],u=t[1],f=t[5],h=t[9],p=t[2],x=t[6],_=t[10],g=r+f+_;if(g>0){const S=.5/Math.sqrt(g+1);this._w=.25/S,this._x=(x-h)*S,this._y=(l-p)*S,this._z=(u-o)*S}else if(r>f&&r>_){const S=2*Math.sqrt(1+r-f-_);this._w=(x-h)/S,this._x=.25*S,this._y=(o+u)/S,this._z=(l+p)/S}else if(f>_){const S=2*Math.sqrt(1+f-r-_);this._w=(l-p)/S,this._x=(o+u)/S,this._y=.25*S,this._z=(h+x)/S}else{const S=2*Math.sqrt(1+_-r-f);this._w=(u-o)/S,this._x=(l+p)/S,this._y=(h+x)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,u=e._w,f=t._x,h=t._y,p=t._z,x=t._w;return this._x=r*x+u*f+o*p-l*h,this._y=o*x+u*h+l*f-r*p,this._z=l*x+u*p+r*h-o*f,this._w=u*x-r*f-o*h-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,o=this._y,l=this._z,u=this._w;let f=u*e._w+r*e._x+o*e._y+l*e._z;if(f<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,f=-f):this.copy(e),f>=1)return this._w=u,this._x=r,this._y=o,this._z=l,this;const h=1-f*f;if(h<=Number.EPSILON){const S=1-t;return this._w=S*u+t*this._w,this._x=S*r+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const p=Math.sqrt(h),x=Math.atan2(p,f),_=Math.sin((1-t)*x)/p,g=Math.sin(t*x)/p;return this._w=u*_+this._w*g,this._x=r*_+this._x*g,this._y=o*_+this._y*g,this._z=l*_+this._z*g,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,r=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,u=e.y,f=e.z,h=e.w,p=2*(u*o-f*r),x=2*(f*t-l*o),_=2*(l*r-u*t);return this.x=t+h*p+u*_-f*x,this.y=r+h*x+f*p-l*_,this.z=o+h*_+l*x-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,u=t.x,f=t.y,h=t.z;return this.x=o*h-l*f,this.y=l*u-r*h,this.z=r*f-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Zu.copy(this).projectOnVector(e),this.sub(Zu)}reflect(e){return this.sub(Zu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zu=new H,Rm=new pa;class dt{constructor(e,t,r,o,l,u,f,h,p){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,u,f,h,p)}set(e,t,r,o,l,u,f,h,p){const x=this.elements;return x[0]=e,x[1]=o,x[2]=f,x[3]=t,x[4]=l,x[5]=h,x[6]=r,x[7]=u,x[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,u=r[0],f=r[3],h=r[6],p=r[1],x=r[4],_=r[7],g=r[2],S=r[5],E=r[8],T=o[0],y=o[3],v=o[6],F=o[1],P=o[4],C=o[7],N=o[2],U=o[5],k=o[8];return l[0]=u*T+f*F+h*N,l[3]=u*y+f*P+h*U,l[6]=u*v+f*C+h*k,l[1]=p*T+x*F+_*N,l[4]=p*y+x*P+_*U,l[7]=p*v+x*C+_*k,l[2]=g*T+S*F+E*N,l[5]=g*y+S*P+E*U,l[8]=g*v+S*C+E*k,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],x=e[8];return t*u*x-t*f*p-r*l*x+r*f*h+o*l*p-o*u*h}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],x=e[8],_=x*u-f*p,g=f*h-x*l,S=p*l-u*h,E=t*_+r*g+o*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=_*T,e[1]=(o*p-x*r)*T,e[2]=(f*r-o*u)*T,e[3]=g*T,e[4]=(x*t-o*h)*T,e[5]=(o*l-f*t)*T,e[6]=S*T,e[7]=(r*h-p*t)*T,e[8]=(u*t-r*l)*T,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,u,f){const h=Math.cos(l),p=Math.sin(l);return this.set(r*h,r*p,-r*(h*u+p*f)+u+e,-o*p,o*h,-o*(-p*u+h*f)+f+t,0,0,1),this}scale(e,t){return this.premultiply(Qu.makeScale(e,t)),this}rotate(e){return this.premultiply(Qu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qu=new dt;function jg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function lc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function rx(){const s=lc("canvas");return s.style.display="block",s}const bm={};function no(s){s in bm||(bm[s]=!0,console.warn(s))}function sx(s,e,t){return new Promise(function(r,o){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}const Pm=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lm=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ox(){const s={enabled:!0,workingColorSpace:ao,spaces:{},convert:function(o,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===Ut&&(o.r=Qi(o.r),o.g=Qi(o.g),o.b=Qi(o.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Ut&&(o.r=io(o.r),o.g=io(o.g),o.b=io(o.b))),o},workingToColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},colorSpaceToWorking:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===wr?oc:this.spaces[o].transfer},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,u){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,l){return no("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(o,l)},toWorkingColorSpace:function(o,l){return no("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(o,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[ao]:{primaries:e,whitePoint:r,transfer:oc,toXYZ:Pm,fromXYZ:Lm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vn},outputColorSpaceConfig:{drawingBufferColorSpace:Vn}},[Vn]:{primaries:e,whitePoint:r,transfer:Ut,toXYZ:Pm,fromXYZ:Lm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vn}}}),s}const At=ox();function Qi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function io(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ns;class ax{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Ns===void 0&&(Ns=lc("canvas")),Ns.width=e.width,Ns.height=e.height;const o=Ns.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),r=Ns}return r.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=Qi(l[u]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Qi(t[r]/255)*255):t[r]=Qi(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lx=0;class Ld{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lx++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,f=o.length;u<f;u++)o[u].isDataTexture?l.push(Ju(o[u].image)):l.push(Ju(o[u]))}else l=Ju(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function Ju(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ax.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cx=0;const ef=new H;class Tn extends uo{constructor(e=Tn.DEFAULT_IMAGE,t=Tn.DEFAULT_MAPPING,r=is,o=is,l=Ri,u=rs,f=Si,h=Li,p=Tn.DEFAULT_ANISOTROPY,x=wr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cx++}),this.uuid=Zi(),this.name="",this.source=new Ld(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=f,this.internalFormat=null,this.type=h,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ef).x}get height(){return this.source.getSize(ef).y}get depth(){return this.source.getSize(ef).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}o&&r&&o.isVector2&&r.isVector2||o&&r&&o.isVector3&&r.isVector3||o&&r&&o.isMatrix3&&r.isMatrix3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wf:e.x=e.x-Math.floor(e.x);break;case is:e.x=e.x<0?0:1;break;case Xf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wf:e.y=e.y-Math.floor(e.y);break;case is:e.y=e.y<0?0:1;break;case Xf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=Fg;Tn.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,t=0,r=0,o=1){Nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*o+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const h=e.elements,p=h[0],x=h[4],_=h[8],g=h[1],S=h[5],E=h[9],T=h[2],y=h[6],v=h[10];if(Math.abs(x-g)<.01&&Math.abs(_-T)<.01&&Math.abs(E-y)<.01){if(Math.abs(x+g)<.1&&Math.abs(_+T)<.1&&Math.abs(E+y)<.1&&Math.abs(p+S+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const P=(p+1)/2,C=(S+1)/2,N=(v+1)/2,U=(x+g)/4,k=(_+T)/4,j=(E+y)/4;return P>C&&P>N?P<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(P),o=U/r,l=k/r):C>N?C<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(C),r=U/o,l=j/o):N<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(N),r=k/l,o=j/l),this.set(r,o,l,t),this}let F=Math.sqrt((y-E)*(y-E)+(_-T)*(_-T)+(g-x)*(g-x));return Math.abs(F)<.001&&(F=1),this.x=(y-E)/F,this.y=(_-T)/F,this.z=(g-x)/F,this.w=Math.acos((p+S+v-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ux extends uo{constructor(e=1,t=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=r.depth,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t);const o={width:e,height:t,depth:r.depth},l=new Tn(o);this.textures=[];const u=r.count;for(let f=0;f<u;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const t={minFilter:Ri,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=r,this.textures[o].isArrayTexture=this.textures[o].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new Ld(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class as extends ux{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Yg extends Tn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=Jn,this.minFilter=Jn,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fx extends Tn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=Jn,this.minFilter=Jn,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(vi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(vi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=vi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,f=l.count;u<f;u++)e.isMesh===!0?e.getVertexPosition(u,vi):vi.fromBufferAttribute(l,u),vi.applyMatrix4(e.matrixWorld),this.expandByPoint(vi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Tl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Tl.copy(r.boundingBox)),Tl.applyMatrix4(e.matrixWorld),this.union(Tl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vi),vi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yo),wl.subVectors(this.max,Yo),Fs.subVectors(e.a,Yo),Os.subVectors(e.b,Yo),ks.subVectors(e.c,Yo),xr.subVectors(Os,Fs),yr.subVectors(ks,Os),jr.subVectors(Fs,ks);let t=[0,-xr.z,xr.y,0,-yr.z,yr.y,0,-jr.z,jr.y,xr.z,0,-xr.x,yr.z,0,-yr.x,jr.z,0,-jr.x,-xr.y,xr.x,0,-yr.y,yr.x,0,-jr.y,jr.x,0];return!tf(t,Fs,Os,ks,wl)||(t=[1,0,0,0,1,0,0,0,1],!tf(t,Fs,Os,ks,wl))?!1:(Al.crossVectors(xr,yr),t=[Al.x,Al.y,Al.z],tf(t,Fs,Os,ks,wl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Gi=[new H,new H,new H,new H,new H,new H,new H,new H],vi=new H,Tl=new Pr,Fs=new H,Os=new H,ks=new H,xr=new H,yr=new H,jr=new H,Yo=new H,wl=new H,Al=new H,Yr=new H;function tf(s,e,t,r,o){for(let l=0,u=s.length-3;l<=u;l+=3){Yr.fromArray(s,l);const f=o.x*Math.abs(Yr.x)+o.y*Math.abs(Yr.y)+o.z*Math.abs(Yr.z),h=e.dot(Yr),p=t.dot(Yr),x=r.dot(Yr);if(Math.max(-Math.max(h,p,x),Math.min(h,p,x))>f)return!1}return!0}const dx=new Pr,qo=new H,nf=new H;class fo{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):dx.setFromPoints(e).getCenter(r);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qo.subVectors(e,this.center);const t=qo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(qo,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qo.copy(e.center).add(nf)),this.expandByPoint(qo.copy(e.center).sub(nf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Wi=new H,rf=new H,Cl=new H,Sr=new H,sf=new H,Rl=new H,of=new H;class Dd{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){rf.copy(e).add(t).multiplyScalar(.5),Cl.copy(t).sub(e).normalize(),Sr.copy(this.origin).sub(rf);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Cl),f=Sr.dot(this.direction),h=-Sr.dot(Cl),p=Sr.lengthSq(),x=Math.abs(1-u*u);let _,g,S,E;if(x>0)if(_=u*h-f,g=u*f-h,E=l*x,_>=0)if(g>=-E)if(g<=E){const T=1/x;_*=T,g*=T,S=_*(_+u*g+2*f)+g*(u*_+g+2*h)+p}else g=l,_=Math.max(0,-(u*g+f)),S=-_*_+g*(g+2*h)+p;else g=-l,_=Math.max(0,-(u*g+f)),S=-_*_+g*(g+2*h)+p;else g<=-E?(_=Math.max(0,-(-u*l+f)),g=_>0?-l:Math.min(Math.max(-l,-h),l),S=-_*_+g*(g+2*h)+p):g<=E?(_=0,g=Math.min(Math.max(-l,-h),l),S=g*(g+2*h)+p):(_=Math.max(0,-(u*l+f)),g=_>0?l:Math.min(Math.max(-l,-h),l),S=-_*_+g*(g+2*h)+p);else g=u>0?-l:l,_=Math.max(0,-(u*g+f)),S=-_*_+g*(g+2*h)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,_),o&&o.copy(rf).addScaledVector(Cl,g),S}intersectSphere(e,t){Wi.subVectors(e.center,this.origin);const r=Wi.dot(this.direction),o=Wi.dot(Wi)-r*r,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),f=r-u,h=r+u;return h<0?null:f<0?this.at(h,t):this.at(f,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,u,f,h;const p=1/this.direction.x,x=1/this.direction.y,_=1/this.direction.z,g=this.origin;return p>=0?(r=(e.min.x-g.x)*p,o=(e.max.x-g.x)*p):(r=(e.max.x-g.x)*p,o=(e.min.x-g.x)*p),x>=0?(l=(e.min.y-g.y)*x,u=(e.max.y-g.y)*x):(l=(e.max.y-g.y)*x,u=(e.min.y-g.y)*x),r>u||l>o||((l>r||isNaN(r))&&(r=l),(u<o||isNaN(o))&&(o=u),_>=0?(f=(e.min.z-g.z)*_,h=(e.max.z-g.z)*_):(f=(e.max.z-g.z)*_,h=(e.min.z-g.z)*_),r>h||f>o)||((f>r||r!==r)&&(r=f),(h<o||o!==o)&&(o=h),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,r,o,l){sf.subVectors(t,e),Rl.subVectors(r,e),of.crossVectors(sf,Rl);let u=this.direction.dot(of),f;if(u>0){if(o)return null;f=1}else if(u<0)f=-1,u=-u;else return null;Sr.subVectors(this.origin,e);const h=f*this.direction.dot(Rl.crossVectors(Sr,Rl));if(h<0)return null;const p=f*this.direction.dot(sf.cross(Sr));if(p<0||h+p>u)return null;const x=-f*Sr.dot(of);return x<0?null:this.at(x/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ft{constructor(e,t,r,o,l,u,f,h,p,x,_,g,S,E,T,y){Ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,u,f,h,p,x,_,g,S,E,T,y)}set(e,t,r,o,l,u,f,h,p,x,_,g,S,E,T,y){const v=this.elements;return v[0]=e,v[4]=t,v[8]=r,v[12]=o,v[1]=l,v[5]=u,v[9]=f,v[13]=h,v[2]=p,v[6]=x,v[10]=_,v[14]=g,v[3]=S,v[7]=E,v[11]=T,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ft().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,o=1/Bs.setFromMatrixColumn(e,0).length(),l=1/Bs.setFromMatrixColumn(e,1).length(),u=1/Bs.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,u=Math.cos(r),f=Math.sin(r),h=Math.cos(o),p=Math.sin(o),x=Math.cos(l),_=Math.sin(l);if(e.order==="XYZ"){const g=u*x,S=u*_,E=f*x,T=f*_;t[0]=h*x,t[4]=-h*_,t[8]=p,t[1]=S+E*p,t[5]=g-T*p,t[9]=-f*h,t[2]=T-g*p,t[6]=E+S*p,t[10]=u*h}else if(e.order==="YXZ"){const g=h*x,S=h*_,E=p*x,T=p*_;t[0]=g+T*f,t[4]=E*f-S,t[8]=u*p,t[1]=u*_,t[5]=u*x,t[9]=-f,t[2]=S*f-E,t[6]=T+g*f,t[10]=u*h}else if(e.order==="ZXY"){const g=h*x,S=h*_,E=p*x,T=p*_;t[0]=g-T*f,t[4]=-u*_,t[8]=E+S*f,t[1]=S+E*f,t[5]=u*x,t[9]=T-g*f,t[2]=-u*p,t[6]=f,t[10]=u*h}else if(e.order==="ZYX"){const g=u*x,S=u*_,E=f*x,T=f*_;t[0]=h*x,t[4]=E*p-S,t[8]=g*p+T,t[1]=h*_,t[5]=T*p+g,t[9]=S*p-E,t[2]=-p,t[6]=f*h,t[10]=u*h}else if(e.order==="YZX"){const g=u*h,S=u*p,E=f*h,T=f*p;t[0]=h*x,t[4]=T-g*_,t[8]=E*_+S,t[1]=_,t[5]=u*x,t[9]=-f*x,t[2]=-p*x,t[6]=S*_+E,t[10]=g-T*_}else if(e.order==="XZY"){const g=u*h,S=u*p,E=f*h,T=f*p;t[0]=h*x,t[4]=-_,t[8]=p*x,t[1]=g*_+T,t[5]=u*x,t[9]=S*_-E,t[2]=E*_-S,t[6]=f*x,t[10]=T*_+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hx,e,px)}lookAt(e,t,r){const o=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),Mr.crossVectors(r,qn),Mr.lengthSq()===0&&(Math.abs(r.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),Mr.crossVectors(r,qn)),Mr.normalize(),bl.crossVectors(qn,Mr),o[0]=Mr.x,o[4]=bl.x,o[8]=qn.x,o[1]=Mr.y,o[5]=bl.y,o[9]=qn.y,o[2]=Mr.z,o[6]=bl.z,o[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,u=r[0],f=r[4],h=r[8],p=r[12],x=r[1],_=r[5],g=r[9],S=r[13],E=r[2],T=r[6],y=r[10],v=r[14],F=r[3],P=r[7],C=r[11],N=r[15],U=o[0],k=o[4],j=o[8],b=o[12],R=o[1],I=o[5],ie=o[9],te=o[13],se=o[2],de=o[6],ae=o[10],fe=o[14],V=o[3],ce=o[7],oe=o[11],O=o[15];return l[0]=u*U+f*R+h*se+p*V,l[4]=u*k+f*I+h*de+p*ce,l[8]=u*j+f*ie+h*ae+p*oe,l[12]=u*b+f*te+h*fe+p*O,l[1]=x*U+_*R+g*se+S*V,l[5]=x*k+_*I+g*de+S*ce,l[9]=x*j+_*ie+g*ae+S*oe,l[13]=x*b+_*te+g*fe+S*O,l[2]=E*U+T*R+y*se+v*V,l[6]=E*k+T*I+y*de+v*ce,l[10]=E*j+T*ie+y*ae+v*oe,l[14]=E*b+T*te+y*fe+v*O,l[3]=F*U+P*R+C*se+N*V,l[7]=F*k+P*I+C*de+N*ce,l[11]=F*j+P*ie+C*ae+N*oe,l[15]=F*b+P*te+C*fe+N*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],u=e[1],f=e[5],h=e[9],p=e[13],x=e[2],_=e[6],g=e[10],S=e[14],E=e[3],T=e[7],y=e[11],v=e[15];return E*(+l*h*_-o*p*_-l*f*g+r*p*g+o*f*S-r*h*S)+T*(+t*h*S-t*p*g+l*u*g-o*u*S+o*p*x-l*h*x)+y*(+t*p*_-t*f*S-l*u*_+r*u*S+l*f*x-r*p*x)+v*(-o*f*x-t*h*_+t*f*g+o*u*_-r*u*g+r*h*x)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],x=e[8],_=e[9],g=e[10],S=e[11],E=e[12],T=e[13],y=e[14],v=e[15],F=_*y*p-T*g*p+T*h*S-f*y*S-_*h*v+f*g*v,P=E*g*p-x*y*p-E*h*S+u*y*S+x*h*v-u*g*v,C=x*T*p-E*_*p+E*f*S-u*T*S-x*f*v+u*_*v,N=E*_*h-x*T*h-E*f*g+u*T*g+x*f*y-u*_*y,U=t*F+r*P+o*C+l*N;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/U;return e[0]=F*k,e[1]=(T*g*l-_*y*l-T*o*S+r*y*S+_*o*v-r*g*v)*k,e[2]=(f*y*l-T*h*l+T*o*p-r*y*p-f*o*v+r*h*v)*k,e[3]=(_*h*l-f*g*l-_*o*p+r*g*p+f*o*S-r*h*S)*k,e[4]=P*k,e[5]=(x*y*l-E*g*l+E*o*S-t*y*S-x*o*v+t*g*v)*k,e[6]=(E*h*l-u*y*l-E*o*p+t*y*p+u*o*v-t*h*v)*k,e[7]=(u*g*l-x*h*l+x*o*p-t*g*p-u*o*S+t*h*S)*k,e[8]=C*k,e[9]=(E*_*l-x*T*l-E*r*S+t*T*S+x*r*v-t*_*v)*k,e[10]=(u*T*l-E*f*l+E*r*p-t*T*p-u*r*v+t*f*v)*k,e[11]=(x*f*l-u*_*l-x*r*p+t*_*p+u*r*S-t*f*S)*k,e[12]=N*k,e[13]=(x*T*o-E*_*o+E*r*g-t*T*g-x*r*y+t*_*y)*k,e[14]=(E*f*o-u*T*o-E*r*h+t*T*h+u*r*y-t*f*y)*k,e[15]=(u*_*o-x*f*o+x*r*h-t*_*h-u*r*g+t*f*g)*k,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,u=e.x,f=e.y,h=e.z,p=l*u,x=l*f;return this.set(p*u+r,p*f-o*h,p*h+o*f,0,p*f+o*h,x*f+r,x*h-o*u,0,p*h-o*f,x*h+o*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,u){return this.set(1,r,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,u=t._y,f=t._z,h=t._w,p=l+l,x=u+u,_=f+f,g=l*p,S=l*x,E=l*_,T=u*x,y=u*_,v=f*_,F=h*p,P=h*x,C=h*_,N=r.x,U=r.y,k=r.z;return o[0]=(1-(T+v))*N,o[1]=(S+C)*N,o[2]=(E-P)*N,o[3]=0,o[4]=(S-C)*U,o[5]=(1-(g+v))*U,o[6]=(y+F)*U,o[7]=0,o[8]=(E+P)*k,o[9]=(y-F)*k,o[10]=(1-(g+T))*k,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;let l=Bs.set(o[0],o[1],o[2]).length();const u=Bs.set(o[4],o[5],o[6]).length(),f=Bs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],_i.copy(this);const p=1/l,x=1/u,_=1/f;return _i.elements[0]*=p,_i.elements[1]*=p,_i.elements[2]*=p,_i.elements[4]*=x,_i.elements[5]*=x,_i.elements[6]*=x,_i.elements[8]*=_,_i.elements[9]*=_,_i.elements[10]*=_,t.setFromRotationMatrix(_i),r.x=l,r.y=u,r.z=f,this}makePerspective(e,t,r,o,l,u,f=Pi,h=!1){const p=this.elements,x=2*l/(t-e),_=2*l/(r-o),g=(t+e)/(t-e),S=(r+o)/(r-o);let E,T;if(h)E=l/(u-l),T=u*l/(u-l);else if(f===Pi)E=-(u+l)/(u-l),T=-2*u*l/(u-l);else if(f===ac)E=-u/(u-l),T=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return p[0]=x,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=T,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,t,r,o,l,u,f=Pi,h=!1){const p=this.elements,x=2/(t-e),_=2/(r-o),g=-(t+e)/(t-e),S=-(r+o)/(r-o);let E,T;if(h)E=1/(u-l),T=u/(u-l);else if(f===Pi)E=-2/(u-l),T=-(u+l)/(u-l);else if(f===ac)E=-1/(u-l),T=-l/(u-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return p[0]=x,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=_,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=E,p[14]=T,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Bs=new H,_i=new Ft,hx=new H(0,0,0),px=new H(1,1,1),Mr=new H,bl=new H,qn=new H,Dm=new Ft,Im=new pa;class Di{constructor(e=0,t=0,r=0,o=Di.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],u=o[4],f=o[8],h=o[1],p=o[5],x=o[9],_=o[2],g=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-x,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(f,S),this._z=Math.atan2(h,p)):(this._y=Math.atan2(-_,l),this._z=0);break;case"ZXY":this._x=Math.asin(xt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-xt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-x,p),this._y=Math.atan2(-_,l)):(this._x=0,this._y=Math.atan2(f,S));break;case"XZY":this._z=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-x,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Dm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Im.setFromEuler(this),this.setFromQuaternion(Im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Di.DEFAULT_ORDER="XYZ";class Id{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mx=0;const Um=new H,zs=new pa,Xi=new Ft,Pl=new H,$o=new H,gx=new H,vx=new pa,Nm=new H(1,0,0),Fm=new H(0,1,0),Om=new H(0,0,1),km={type:"added"},_x={type:"removed"},Hs={type:"childadded",child:null},af={type:"childremoved",child:null};class nn extends uo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new H,t=new Di,r=new pa,o=new H(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ft},normalMatrix:{value:new dt}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Id,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.multiply(zs),this}rotateOnWorldAxis(e,t){return zs.setFromAxisAngle(e,t),this.quaternion.premultiply(zs),this}rotateX(e){return this.rotateOnAxis(Nm,e)}rotateY(e){return this.rotateOnAxis(Fm,e)}rotateZ(e){return this.rotateOnAxis(Om,e)}translateOnAxis(e,t){return Um.copy(e).applyQuaternion(this.quaternion),this.position.add(Um.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nm,e)}translateY(e){return this.translateOnAxis(Fm,e)}translateZ(e){return this.translateOnAxis(Om,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Pl.copy(e):Pl.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),$o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt($o,Pl,this.up):Xi.lookAt(Pl,$o,this.up),this.quaternion.setFromRotationMatrix(Xi),o&&(Xi.extractRotation(o.matrixWorld),zs.setFromRotationMatrix(Xi),this.quaternion.premultiply(zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(km),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_x),af.child=e,this.dispatchEvent(af),af.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(km),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,e,gx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,vx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(f=>({...f,boundingBox:f.boundingBox?f.boundingBox.toJSON():void 0,boundingSphere:f.boundingSphere?f.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(f=>({...f})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function l(f,h){return f[h.uuid]===void 0&&(f[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const h=f.shapes;if(Array.isArray(h))for(let p=0,x=h.length;p<x;p++){const _=h[p];l(e.shapes,_)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let h=0,p=this.material.length;h<p;h++)f.push(l(e.materials,this.material[h]));o.material=f}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let f=0;f<this.children.length;f++)o.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let f=0;f<this.animations.length;f++){const h=this.animations[f];o.animations.push(l(e.animations,h))}}if(t){const f=u(e.geometries),h=u(e.materials),p=u(e.textures),x=u(e.images),_=u(e.shapes),g=u(e.skeletons),S=u(e.animations),E=u(e.nodes);f.length>0&&(r.geometries=f),h.length>0&&(r.materials=h),p.length>0&&(r.textures=p),x.length>0&&(r.images=x),_.length>0&&(r.shapes=_),g.length>0&&(r.skeletons=g),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=o,r;function u(f){const h=[];for(const p in f){const x=f[p];delete x.metadata,h.push(x)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}nn.DEFAULT_UP=new H(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xi=new H,ji=new H,lf=new H,Yi=new H,Vs=new H,Gs=new H,Bm=new H,cf=new H,uf=new H,ff=new H,df=new Nt,hf=new Nt,pf=new Nt;class li{constructor(e=new H,t=new H,r=new H){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),xi.subVectors(e,t),o.cross(xi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){xi.subVectors(o,t),ji.subVectors(r,t),lf.subVectors(e,t);const u=xi.dot(xi),f=xi.dot(ji),h=xi.dot(lf),p=ji.dot(ji),x=ji.dot(lf),_=u*p-f*f;if(_===0)return l.set(0,0,0),null;const g=1/_,S=(p*h-f*x)*g,E=(u*x-f*h)*g;return l.set(1-S-E,E,S)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,Yi)===null?!1:Yi.x>=0&&Yi.y>=0&&Yi.x+Yi.y<=1}static getInterpolation(e,t,r,o,l,u,f,h){return this.getBarycoord(e,t,r,o,Yi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,Yi.x),h.addScaledVector(u,Yi.y),h.addScaledVector(f,Yi.z),h)}static getInterpolatedAttribute(e,t,r,o,l,u){return df.setScalar(0),hf.setScalar(0),pf.setScalar(0),df.fromBufferAttribute(e,t),hf.fromBufferAttribute(e,r),pf.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(df,l.x),u.addScaledVector(hf,l.y),u.addScaledVector(pf,l.z),u}static isFrontFacing(e,t,r,o){return xi.subVectors(r,t),ji.subVectors(e,t),xi.cross(ji).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xi.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),xi.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return li.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return li.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,o,l){return li.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return li.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return li.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let u,f;Vs.subVectors(o,r),Gs.subVectors(l,r),cf.subVectors(e,r);const h=Vs.dot(cf),p=Gs.dot(cf);if(h<=0&&p<=0)return t.copy(r);uf.subVectors(e,o);const x=Vs.dot(uf),_=Gs.dot(uf);if(x>=0&&_<=x)return t.copy(o);const g=h*_-x*p;if(g<=0&&h>=0&&x<=0)return u=h/(h-x),t.copy(r).addScaledVector(Vs,u);ff.subVectors(e,l);const S=Vs.dot(ff),E=Gs.dot(ff);if(E>=0&&S<=E)return t.copy(l);const T=S*p-h*E;if(T<=0&&p>=0&&E<=0)return f=p/(p-E),t.copy(r).addScaledVector(Gs,f);const y=x*E-S*_;if(y<=0&&_-x>=0&&S-E>=0)return Bm.subVectors(l,o),f=(_-x)/(_-x+(S-E)),t.copy(o).addScaledVector(Bm,f);const v=1/(y+T+g);return u=T*v,f=g*v,t.copy(r).addScaledVector(Vs,u).addScaledVector(Gs,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Er={h:0,s:0,l:0},Ll={h:0,s:0,l:0};function mf(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class yt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.colorSpaceToWorking(this,t),this}setRGB(e,t,r,o=At.workingColorSpace){return this.r=e,this.g=t,this.b=r,At.colorSpaceToWorking(this,o),this}setHSL(e,t,r,o=At.workingColorSpace){if(e=Pd(e,1),t=xt(t,0,1),r=xt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=mf(u,l,e+1/3),this.g=mf(u,l,e),this.b=mf(u,l,e-1/3)}return At.colorSpaceToWorking(this,o),this}setStyle(e,t=Vn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],f=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vn){const r=qg[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=io(e.r),this.g=io(e.g),this.b=io(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vn){return At.workingToColorSpace(En.copy(this),e),Math.round(xt(En.r*255,0,255))*65536+Math.round(xt(En.g*255,0,255))*256+Math.round(xt(En.b*255,0,255))}getHexString(e=Vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.workingToColorSpace(En.copy(this),t);const r=En.r,o=En.g,l=En.b,u=Math.max(r,o,l),f=Math.min(r,o,l);let h,p;const x=(f+u)/2;if(f===u)h=0,p=0;else{const _=u-f;switch(p=x<=.5?_/(u+f):_/(2-u-f),u){case r:h=(o-l)/_+(o<l?6:0);break;case o:h=(l-r)/_+2;break;case l:h=(r-o)/_+4;break}h/=6}return e.h=h,e.s=p,e.l=x,e}getRGB(e,t=At.workingColorSpace){return At.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=Vn){At.workingToColorSpace(En.copy(this),e);const t=En.r,r=En.g,o=En.b;return e!==Vn?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(Er),this.setHSL(Er.h+e,Er.s+t,Er.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Er),e.getHSL(Ll);const r=oa(Er.h,Ll.h,t),o=oa(Er.s,Ll.s,t),l=oa(Er.l,Ll.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const En=new yt;yt.NAMES=qg;let xx=0;class ls extends uo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xx++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=to,this.side=Rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=If,this.blendDst=Uf,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=ro,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==to&&(r.blending=this.blending),this.side!==Rr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==If&&(r.blendSrc=this.blendSrc),this.blendDst!==Uf&&(r.blendDst=this.blendDst),this.blendEquation!==ts&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==ro&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wm&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const u=[];for(const f in l){const h=l[f];delete h.metadata,u.push(h)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ss extends ls{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=Ug,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const en=new H,Dl=new ft;let yx=0;class ci{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=_d,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Dl.fromBufferAttribute(this,t),Dl.applyMatrix3(e),this.setXY(t,Dl.x,Dl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=yi(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Lt(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),r=Lt(r,this.array),o=Lt(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),r=Lt(r,this.array),o=Lt(o,this.array),l=Lt(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_d&&(e.usage=this.usage),e}}class $g extends ci{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Kg extends ci{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class $t extends ci{constructor(e,t,r){super(new Float32Array(e),t,r)}}let Sx=0;const ai=new Ft,gf=new nn,Ws=new H,$n=new Pr,Ko=new Pr,dn=new H;class In extends uo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jg(e)?Kg:$g)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new dt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ai.makeRotationFromQuaternion(e),this.applyMatrix4(ai),this}rotateX(e){return ai.makeRotationX(e),this.applyMatrix4(ai),this}rotateY(e){return ai.makeRotationY(e),this.applyMatrix4(ai),this}rotateZ(e){return ai.makeRotationZ(e),this.applyMatrix4(ai),this}translate(e,t,r){return ai.makeTranslation(e,t,r),this.applyMatrix4(ai),this}scale(e,t,r){return ai.makeScale(e,t,r),this.applyMatrix4(ai),this}lookAt(e){return gf.lookAt(e),gf.updateMatrix(),this.applyMatrix4(gf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let o=0,l=e.length;o<l;o++){const u=e[o];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new $t(r,3))}else{const r=Math.min(e.length,t.count);for(let o=0;o<r;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];$n.setFromBufferAttribute(l),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const r=this.boundingSphere.center;if($n.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const f=t[l];Ko.setFromBufferAttribute(f),this.morphTargetsRelative?(dn.addVectors($n.min,Ko.min),$n.expandByPoint(dn),dn.addVectors($n.max,Ko.max),$n.expandByPoint(dn)):($n.expandByPoint(Ko.min),$n.expandByPoint(Ko.max))}$n.getCenter(r);let o=0;for(let l=0,u=e.count;l<u;l++)dn.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(dn));if(t)for(let l=0,u=t.length;l<u;l++){const f=t[l],h=this.morphTargetsRelative;for(let p=0,x=f.count;p<x;p++)dn.fromBufferAttribute(f,p),h&&(Ws.fromBufferAttribute(e,p),dn.add(Ws)),o=Math.max(o,r.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,o=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ci(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),f=[],h=[];for(let j=0;j<r.count;j++)f[j]=new H,h[j]=new H;const p=new H,x=new H,_=new H,g=new ft,S=new ft,E=new ft,T=new H,y=new H;function v(j,b,R){p.fromBufferAttribute(r,j),x.fromBufferAttribute(r,b),_.fromBufferAttribute(r,R),g.fromBufferAttribute(l,j),S.fromBufferAttribute(l,b),E.fromBufferAttribute(l,R),x.sub(p),_.sub(p),S.sub(g),E.sub(g);const I=1/(S.x*E.y-E.x*S.y);isFinite(I)&&(T.copy(x).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(I),y.copy(_).multiplyScalar(S.x).addScaledVector(x,-E.x).multiplyScalar(I),f[j].add(T),f[b].add(T),f[R].add(T),h[j].add(y),h[b].add(y),h[R].add(y))}let F=this.groups;F.length===0&&(F=[{start:0,count:e.count}]);for(let j=0,b=F.length;j<b;++j){const R=F[j],I=R.start,ie=R.count;for(let te=I,se=I+ie;te<se;te+=3)v(e.getX(te+0),e.getX(te+1),e.getX(te+2))}const P=new H,C=new H,N=new H,U=new H;function k(j){N.fromBufferAttribute(o,j),U.copy(N);const b=f[j];P.copy(b),P.sub(N.multiplyScalar(N.dot(b))).normalize(),C.crossVectors(U,b);const I=C.dot(h[j])<0?-1:1;u.setXYZW(j,P.x,P.y,P.z,I)}for(let j=0,b=F.length;j<b;++j){const R=F[j],I=R.start,ie=R.count;for(let te=I,se=I+ie;te<se;te+=3)k(e.getX(te+0)),k(e.getX(te+1)),k(e.getX(te+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new ci(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let g=0,S=r.count;g<S;g++)r.setXYZ(g,0,0,0);const o=new H,l=new H,u=new H,f=new H,h=new H,p=new H,x=new H,_=new H;if(e)for(let g=0,S=e.count;g<S;g+=3){const E=e.getX(g+0),T=e.getX(g+1),y=e.getX(g+2);o.fromBufferAttribute(t,E),l.fromBufferAttribute(t,T),u.fromBufferAttribute(t,y),x.subVectors(u,l),_.subVectors(o,l),x.cross(_),f.fromBufferAttribute(r,E),h.fromBufferAttribute(r,T),p.fromBufferAttribute(r,y),f.add(x),h.add(x),p.add(x),r.setXYZ(E,f.x,f.y,f.z),r.setXYZ(T,h.x,h.y,h.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let g=0,S=t.count;g<S;g+=3)o.fromBufferAttribute(t,g+0),l.fromBufferAttribute(t,g+1),u.fromBufferAttribute(t,g+2),x.subVectors(u,l),_.subVectors(o,l),x.cross(_),r.setXYZ(g+0,x.x,x.y,x.z),r.setXYZ(g+1,x.x,x.y,x.z),r.setXYZ(g+2,x.x,x.y,x.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(f,h){const p=f.array,x=f.itemSize,_=f.normalized,g=new p.constructor(h.length*x);let S=0,E=0;for(let T=0,y=h.length;T<y;T++){f.isInterleavedBufferAttribute?S=h[T]*f.data.stride+f.offset:S=h[T]*x;for(let v=0;v<x;v++)g[E++]=p[S++]}return new ci(g,x,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new In,r=this.index.array,o=this.attributes;for(const f in o){const h=o[f],p=e(h,r);t.setAttribute(f,p)}const l=this.morphAttributes;for(const f in l){const h=[],p=l[f];for(let x=0,_=p.length;x<_;x++){const g=p[x],S=e(g,r);h.push(S)}t.morphAttributes[f]=h}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let f=0,h=u.length;f<h;f++){const p=u[f];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const p in h)h[p]!==void 0&&(e[p]=h[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const h in r){const p=r[h];e.data.attributes[h]=p.toJSON(e.data)}const o={};let l=!1;for(const h in this.morphAttributes){const p=this.morphAttributes[h],x=[];for(let _=0,g=p.length;_<g;_++){const S=p[_];x.push(S.toJSON(e.data))}x.length>0&&(o[h]=x,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere=f.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const o=e.attributes;for(const p in o){const x=o[p];this.setAttribute(p,x.clone(t))}const l=e.morphAttributes;for(const p in l){const x=[],_=l[p];for(let g=0,S=_.length;g<S;g++)x.push(_[g].clone(t));this.morphAttributes[p]=x}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,x=u.length;p<x;p++){const _=u[p];this.addGroup(_.start,_.count,_.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zm=new Ft,qr=new Dd,Il=new fo,Hm=new H,Ul=new H,Nl=new H,Fl=new H,vf=new H,Ol=new H,Vm=new H,kl=new H;class ht extends nn{constructor(e=new In,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const f=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const f=this.morphTargetInfluences;if(l&&f){Ol.set(0,0,0);for(let h=0,p=l.length;h<p;h++){const x=f[h],_=l[h];x!==0&&(vf.fromBufferAttribute(_,e),u?Ol.addScaledVector(vf,x):Ol.addScaledVector(vf.sub(t),x))}t.add(Ol)}return t}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Il.copy(r.boundingSphere),Il.applyMatrix4(l),qr.copy(e.ray).recast(e.near),!(Il.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Il,Hm)===null||qr.origin.distanceToSquared(Hm)>(e.far-e.near)**2))&&(zm.copy(l).invert(),qr.copy(e.ray).applyMatrix4(zm),!(r.boundingBox!==null&&qr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,r){let o;const l=this.geometry,u=this.material,f=l.index,h=l.attributes.position,p=l.attributes.uv,x=l.attributes.uv1,_=l.attributes.normal,g=l.groups,S=l.drawRange;if(f!==null)if(Array.isArray(u))for(let E=0,T=g.length;E<T;E++){const y=g[E],v=u[y.materialIndex],F=Math.max(y.start,S.start),P=Math.min(f.count,Math.min(y.start+y.count,S.start+S.count));for(let C=F,N=P;C<N;C+=3){const U=f.getX(C),k=f.getX(C+1),j=f.getX(C+2);o=Bl(this,v,e,r,p,x,_,U,k,j),o&&(o.faceIndex=Math.floor(C/3),o.face.materialIndex=y.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),T=Math.min(f.count,S.start+S.count);for(let y=E,v=T;y<v;y+=3){const F=f.getX(y),P=f.getX(y+1),C=f.getX(y+2);o=Bl(this,u,e,r,p,x,_,F,P,C),o&&(o.faceIndex=Math.floor(y/3),t.push(o))}}else if(h!==void 0)if(Array.isArray(u))for(let E=0,T=g.length;E<T;E++){const y=g[E],v=u[y.materialIndex],F=Math.max(y.start,S.start),P=Math.min(h.count,Math.min(y.start+y.count,S.start+S.count));for(let C=F,N=P;C<N;C+=3){const U=C,k=C+1,j=C+2;o=Bl(this,v,e,r,p,x,_,U,k,j),o&&(o.faceIndex=Math.floor(C/3),o.face.materialIndex=y.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),T=Math.min(h.count,S.start+S.count);for(let y=E,v=T;y<v;y+=3){const F=y,P=y+1,C=y+2;o=Bl(this,u,e,r,p,x,_,F,P,C),o&&(o.faceIndex=Math.floor(y/3),t.push(o))}}}}function Mx(s,e,t,r,o,l,u,f){let h;if(e.side===Dn?h=r.intersectTriangle(u,l,o,!0,f):h=r.intersectTriangle(o,l,u,e.side===Rr,f),h===null)return null;kl.copy(f),kl.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(kl);return p<t.near||p>t.far?null:{distance:p,point:kl.clone(),object:s}}function Bl(s,e,t,r,o,l,u,f,h,p){s.getVertexPosition(f,Ul),s.getVertexPosition(h,Nl),s.getVertexPosition(p,Fl);const x=Mx(s,e,t,r,Ul,Nl,Fl,Vm);if(x){const _=new H;li.getBarycoord(Vm,Ul,Nl,Fl,_),o&&(x.uv=li.getInterpolatedAttribute(o,f,h,p,_,new ft)),l&&(x.uv1=li.getInterpolatedAttribute(l,f,h,p,_,new ft)),u&&(x.normal=li.getInterpolatedAttribute(u,f,h,p,_,new H),x.normal.dot(r.direction)>0&&x.normal.multiplyScalar(-1));const g={a:f,b:h,c:p,normal:new H,materialIndex:0};li.getNormal(Ul,Nl,Fl,g.normal),x.face=g,x.barycoord=_}return x}class Dt extends In{constructor(e=1,t=1,r=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:u};const f=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const h=[],p=[],x=[],_=[];let g=0,S=0;E("z","y","x",-1,-1,r,t,e,u,l,0),E("z","y","x",1,-1,r,t,-e,u,l,1),E("x","z","y",1,1,e,r,t,o,u,2),E("x","z","y",1,-1,e,r,-t,o,u,3),E("x","y","z",1,-1,e,t,r,o,l,4),E("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(h),this.setAttribute("position",new $t(p,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(_,2));function E(T,y,v,F,P,C,N,U,k,j,b){const R=C/k,I=N/j,ie=C/2,te=N/2,se=U/2,de=k+1,ae=j+1;let fe=0,V=0;const ce=new H;for(let oe=0;oe<ae;oe++){const O=oe*I-te;for(let re=0;re<de;re++){const Be=re*R-ie;ce[T]=Be*F,ce[y]=O*P,ce[v]=se,p.push(ce.x,ce.y,ce.z),ce[T]=0,ce[y]=0,ce[v]=U>0?1:-1,x.push(ce.x,ce.y,ce.z),_.push(re/k),_.push(1-oe/j),fe+=1}}for(let oe=0;oe<j;oe++)for(let O=0;O<k;O++){const re=g+O+de*oe,Be=g+O+de*(oe+1),ke=g+(O+1)+de*(oe+1),Q=g+(O+1)+de*oe;h.push(re,Be,Q),h.push(Be,ke,Q),V+=6}f.addGroup(S,V,b),S+=V,g+=fe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function lo(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone():Array.isArray(o)?e[t][r]=o.slice():e[t][r]=o}}return e}function Ln(s){const e={};for(let t=0;t<s.length;t++){const r=lo(s[t]);for(const o in r)e[o]=r[o]}return e}function Ex(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Zg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}const Tx={clone:lo,merge:Ln};var wx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ax=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class br extends ls{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wx,this.fragmentShader=Ax,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lo(e.uniforms),this.uniformsGroups=Ex(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Qg extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=Pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tr=new H,Gm=new ft,Wm=new ft;class Qn extends Qg{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fa*2*Math.atan(Math.tan(sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Tr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Tr.x,Tr.y).multiplyScalar(-e/Tr.z),Tr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Tr.x,Tr.y).multiplyScalar(-e/Tr.z)}getViewSize(e,t){return this.getViewBounds(e,Gm,Wm),t.subVectors(Wm,Gm)}setViewOffset(e,t,r,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(sa*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,p=u.fullHeight;l+=u.offsetX*o/h,t-=u.offsetY*r/p,o*=u.width/h,r*=u.height/p}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xs=-90,js=1;class Cx extends nn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Qn(Xs,js,e,t);o.layers=this.layers,this.add(o);const l=new Qn(Xs,js,e,t);l.layers=this.layers,this.add(l);const u=new Qn(Xs,js,e,t);u.layers=this.layers,this.add(u);const f=new Qn(Xs,js,e,t);f.layers=this.layers,this.add(f);const h=new Qn(Xs,js,e,t);h.layers=this.layers,this.add(h);const p=new Qn(Xs,js,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,u,f,h]=t;for(const p of t)this.remove(p);if(e===Pi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===ac)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,f,h,p,x]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const T=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,o),e.render(t,l),e.setRenderTarget(r,1,o),e.render(t,u),e.setRenderTarget(r,2,o),e.render(t,f),e.setRenderTarget(r,3,o),e.render(t,h),e.setRenderTarget(r,4,o),e.render(t,p),r.texture.generateMipmaps=T,e.setRenderTarget(r,5,o),e.render(t,x),e.setRenderTarget(_,g,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Jg extends Tn{constructor(e=[],t=so,r,o,l,u,f,h,p,x){super(e,t,r,o,l,u,f,h,p,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rx extends as{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new Jg(o),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new Dt(5,5,5),l=new br({name:"CubemapFromEquirect",uniforms:lo(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Dn,blending:Ar});l.uniforms.tEquirect.value=t;const u=new ht(o,l),f=t.minFilter;return t.minFilter===rs&&(t.minFilter=Ri),new Cx(1,10,this).update(e,u),t.minFilter=f,u.geometry.dispose(),u.material.dispose(),this}clear(e,t=!0,r=!0,o=!0){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,o);e.setRenderTarget(l)}}class Ki extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bx={type:"move"};class _f{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,u=null;const f=this._targetRay,h=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const T of e.hand.values()){const y=t.getJointPose(T,r),v=this._getHandJoint(p,T);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const x=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],g=x.position.distanceTo(_.position),S=.02,E=.005;p.inputState.pinching&&g>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));f!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(f.matrix.fromArray(o.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,o.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(o.linearVelocity)):f.hasLinearVelocity=!1,o.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(o.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(bx)))}return f!==null&&(f.visible=o!==null),h!==null&&(h.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Ki;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class Ud{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new yt(e),this.density=t}clone(){return new Ud(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Px extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentIntensity=1,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Lx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_d,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let o=0,l=this.stride;o<l;o++)this.array[e+o]=t.array[r+o];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const bn=new H;class cc{constructor(e,t,r,o=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=o}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let r=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(r=yi(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Lt(r,this.array)),this.data.array[e*this.data.stride+this.offset+t]=r,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yi(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),r=Lt(r,this.array),o=Lt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),r=Lt(r,this.array),o=Lt(o,this.array),l=Lt(l,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=o,this.data.array[e+3]=l,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const o=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[o+l])}return new ci(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new cc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const o=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[o+l])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class e0 extends ls{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ys;const Zo=new H,qs=new H,$s=new H,Ks=new ft,Qo=new ft,t0=new Ft,zl=new H,Jo=new H,Hl=new H,Xm=new ft,xf=new ft,jm=new ft;class Dx extends nn{constructor(e=new e0){if(super(),this.isSprite=!0,this.type="Sprite",Ys===void 0){Ys=new In;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),r=new Lx(t,5);Ys.setIndex([0,1,2,0,2,3]),Ys.setAttribute("position",new cc(r,3,0,!1)),Ys.setAttribute("uv",new cc(r,2,3,!1))}this.geometry=Ys,this.material=e,this.center=new ft(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qs.setFromMatrixScale(this.matrixWorld),t0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$s.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qs.multiplyScalar(-$s.z);const r=this.material.rotation;let o,l;r!==0&&(l=Math.cos(r),o=Math.sin(r));const u=this.center;Vl(zl.set(-.5,-.5,0),$s,u,qs,o,l),Vl(Jo.set(.5,-.5,0),$s,u,qs,o,l),Vl(Hl.set(.5,.5,0),$s,u,qs,o,l),Xm.set(0,0),xf.set(1,0),jm.set(1,1);let f=e.ray.intersectTriangle(zl,Jo,Hl,!1,Zo);if(f===null&&(Vl(Jo.set(-.5,.5,0),$s,u,qs,o,l),xf.set(0,1),f=e.ray.intersectTriangle(zl,Hl,Jo,!1,Zo),f===null))return;const h=e.ray.origin.distanceTo(Zo);h<e.near||h>e.far||t.push({distance:h,point:Zo.clone(),uv:li.getInterpolation(Zo,zl,Jo,Hl,Xm,xf,jm,new ft),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Vl(s,e,t,r,o,l){Ks.subVectors(s,t).addScalar(.5).multiply(r),o!==void 0?(Qo.x=l*Ks.x-o*Ks.y,Qo.y=o*Ks.x+l*Ks.y):Qo.copy(Ks),s.copy(e),s.x+=Qo.x,s.y+=Qo.y,s.applyMatrix4(t0)}class Ix extends Tn{constructor(e=null,t=1,r=1,o,l,u,f,h,p=Jn,x=Jn,_,g){super(null,u,f,h,p,x,o,l,_,g),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ym extends ci{constructor(e,t,r,o=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zs=new Ft,qm=new Ft,Gl=[],$m=new Pr,Ux=new Ft,ea=new ht,ta=new fo;class Nx extends ht{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ym(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let o=0;o<r;o++)this.setMatrixAt(o,Ux)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Zs),$m.copy(e.boundingBox).applyMatrix4(Zs),this.boundingBox.union($m)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Zs),ta.copy(e.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(ta)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const r=t.morphTargetInfluences,o=this.morphTexture.source.data.data,l=r.length+1,u=e*l+1;for(let f=0;f<r.length;f++)r[f]=o[u+f]}raycast(e,t){const r=this.matrixWorld,o=this.count;if(ea.geometry=this.geometry,ea.material=this.material,ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ta.copy(this.boundingSphere),ta.applyMatrix4(r),e.ray.intersectsSphere(ta)!==!1))for(let l=0;l<o;l++){this.getMatrixAt(l,Zs),qm.multiplyMatrices(r,Zs),ea.matrixWorld=qm,ea.raycast(e,Gl);for(let u=0,f=Gl.length;u<f;u++){const h=Gl[u];h.instanceId=l,h.object=this,t.push(h)}Gl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ym(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const r=t.morphTargetInfluences,o=r.length+1;this.morphTexture===null&&(this.morphTexture=new Ix(new Float32Array(o*this.count),o,this.count,Ad,bi));const l=this.morphTexture.source.data.data;let u=0;for(let p=0;p<r.length;p++)u+=r[p];const f=this.geometry.morphTargetsRelative?1:1-u,h=o*e;l[h]=f,l.set(r,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const yf=new H,Fx=new H,Ox=new dt;class Jr{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=yf.subVectors(r,t).cross(Fx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(yf),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Ox.getNormalMatrix(e),o=this.coplanarPoint(yf).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $r=new fo,kx=new ft(.5,.5),Wl=new H;class Nd{constructor(e=new Jr,t=new Jr,r=new Jr,o=new Jr,l=new Jr,u=new Jr){this.planes=[e,t,r,o,l,u]}set(e,t,r,o,l,u){const f=this.planes;return f[0].copy(e),f[1].copy(t),f[2].copy(r),f[3].copy(o),f[4].copy(l),f[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Pi,r=!1){const o=this.planes,l=e.elements,u=l[0],f=l[1],h=l[2],p=l[3],x=l[4],_=l[5],g=l[6],S=l[7],E=l[8],T=l[9],y=l[10],v=l[11],F=l[12],P=l[13],C=l[14],N=l[15];if(o[0].setComponents(p-u,S-x,v-E,N-F).normalize(),o[1].setComponents(p+u,S+x,v+E,N+F).normalize(),o[2].setComponents(p+f,S+_,v+T,N+P).normalize(),o[3].setComponents(p-f,S-_,v-T,N-P).normalize(),r)o[4].setComponents(h,g,y,C).normalize(),o[5].setComponents(p-h,S-g,v-y,N-C).normalize();else if(o[4].setComponents(p-h,S-g,v-y,N-C).normalize(),t===Pi)o[5].setComponents(p+h,S+g,v+y,N+C).normalize();else if(t===ac)o[5].setComponents(h,g,y,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($r)}intersectsSprite(e){$r.center.set(0,0,0);const t=kx.distanceTo(e.center);return $r.radius=.7071067811865476+t,$r.applyMatrix4(e.matrixWorld),this.intersectsSphere($r)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Wl.x=o.normal.x>0?e.max.x:e.min.x,Wl.y=o.normal.y>0?e.max.y:e.min.y,Wl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Wl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class n0 extends ls{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const uc=new H,fc=new H,Km=new Ft,na=new Dd,Xl=new fo,Sf=new H,Zm=new H;class Bx extends nn{constructor(e=new In,t=new n0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let o=1,l=t.count;o<l;o++)uc.fromBufferAttribute(t,o-1),fc.fromBufferAttribute(t,o),r[o]=r[o-1],r[o]+=uc.distanceTo(fc);e.setAttribute("lineDistance",new $t(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Xl.copy(r.boundingSphere),Xl.applyMatrix4(o),Xl.radius+=l,e.ray.intersectsSphere(Xl)===!1)return;Km.copy(o).invert(),na.copy(e.ray).applyMatrix4(Km);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=f*f,p=this.isLineSegments?2:1,x=r.index,g=r.attributes.position;if(x!==null){const S=Math.max(0,u.start),E=Math.min(x.count,u.start+u.count);for(let T=S,y=E-1;T<y;T+=p){const v=x.getX(T),F=x.getX(T+1),P=jl(this,e,na,h,v,F,T);P&&t.push(P)}if(this.isLineLoop){const T=x.getX(E-1),y=x.getX(S),v=jl(this,e,na,h,T,y,E-1);v&&t.push(v)}}else{const S=Math.max(0,u.start),E=Math.min(g.count,u.start+u.count);for(let T=S,y=E-1;T<y;T+=p){const v=jl(this,e,na,h,T,T+1,T);v&&t.push(v)}if(this.isLineLoop){const T=jl(this,e,na,h,E-1,S,E-1);T&&t.push(T)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const f=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function jl(s,e,t,r,o,l,u){const f=s.geometry.attributes.position;if(uc.fromBufferAttribute(f,o),fc.fromBufferAttribute(f,l),t.distanceSqToSegment(uc,fc,Sf,Zm)>r)return;Sf.applyMatrix4(s.matrixWorld);const p=e.ray.origin.distanceTo(Sf);if(!(p<e.near||p>e.far))return{distance:p,point:Zm.clone().applyMatrix4(s.matrixWorld),index:u,face:null,faceIndex:null,barycoord:null,object:s}}class zx extends Tn{constructor(e,t,r,o,l,u,f,h,p){super(e,t,r,o,l,u,f,h,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class i0 extends Tn{constructor(e,t,r=os,o,l,u,f=Jn,h=Jn,p,x=ca,_=1){if(x!==ca&&x!==ua)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:t,depth:_};super(g,o,l,u,f,h,x,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ld(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fd extends In{constructor(e=1,t=32,r=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:o},t=Math.max(3,t);const l=[],u=[],f=[],h=[],p=new H,x=new ft;u.push(0,0,0),f.push(0,0,1),h.push(.5,.5);for(let _=0,g=3;_<=t;_++,g+=3){const S=r+_/t*o;p.x=e*Math.cos(S),p.y=e*Math.sin(S),u.push(p.x,p.y,p.z),f.push(0,0,1),x.x=(u[g]/e+1)/2,x.y=(u[g+1]/e+1)/2,h.push(x.x,x.y)}for(let _=1;_<=t;_++)l.push(_,_+1,0);this.setIndex(l),this.setAttribute("position",new $t(u,3)),this.setAttribute("normal",new $t(f,3)),this.setAttribute("uv",new $t(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fd(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class da extends In{constructor(e=1,t=1,r=1,o=32,l=1,u=!1,f=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:o,heightSegments:l,openEnded:u,thetaStart:f,thetaLength:h};const p=this;o=Math.floor(o),l=Math.floor(l);const x=[],_=[],g=[],S=[];let E=0;const T=[],y=r/2;let v=0;F(),u===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(x),this.setAttribute("position",new $t(_,3)),this.setAttribute("normal",new $t(g,3)),this.setAttribute("uv",new $t(S,2));function F(){const C=new H,N=new H;let U=0;const k=(t-e)/r;for(let j=0;j<=l;j++){const b=[],R=j/l,I=R*(t-e)+e;for(let ie=0;ie<=o;ie++){const te=ie/o,se=te*h+f,de=Math.sin(se),ae=Math.cos(se);N.x=I*de,N.y=-R*r+y,N.z=I*ae,_.push(N.x,N.y,N.z),C.set(de,k,ae).normalize(),g.push(C.x,C.y,C.z),S.push(te,1-R),b.push(E++)}T.push(b)}for(let j=0;j<o;j++)for(let b=0;b<l;b++){const R=T[b][j],I=T[b+1][j],ie=T[b+1][j+1],te=T[b][j+1];(e>0||b!==0)&&(x.push(R,I,te),U+=3),(t>0||b!==l-1)&&(x.push(I,ie,te),U+=3)}p.addGroup(v,U,0),v+=U}function P(C){const N=E,U=new ft,k=new H;let j=0;const b=C===!0?e:t,R=C===!0?1:-1;for(let ie=1;ie<=o;ie++)_.push(0,y*R,0),g.push(0,R,0),S.push(.5,.5),E++;const I=E;for(let ie=0;ie<=o;ie++){const se=ie/o*h+f,de=Math.cos(se),ae=Math.sin(se);k.x=b*ae,k.y=y*R,k.z=b*de,_.push(k.x,k.y,k.z),g.push(0,R,0),U.x=de*.5+.5,U.y=ae*.5*R+.5,S.push(U.x,U.y),E++}for(let ie=0;ie<o;ie++){const te=N+ie,se=I+ie;C===!0?x.push(se,se+1,te):x.push(se+1,se,te),j+=3}p.addGroup(v,j,C===!0?1:2),v+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new da(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Od extends da{constructor(e=1,t=1,r=32,o=1,l=!1,u=0,f=Math.PI*2){super(0,e,t,r,o,l,u,f),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:o,openEnded:l,thetaStart:u,thetaLength:f}}static fromJSON(e){return new Od(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ma extends In{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,u=t/2,f=Math.floor(r),h=Math.floor(o),p=f+1,x=h+1,_=e/f,g=t/h,S=[],E=[],T=[],y=[];for(let v=0;v<x;v++){const F=v*g-u;for(let P=0;P<p;P++){const C=P*_-l;E.push(C,-F,0),T.push(0,0,1),y.push(P/f),y.push(1-v/h)}}for(let v=0;v<h;v++)for(let F=0;F<f;F++){const P=F+p*v,C=F+p*(v+1),N=F+1+p*(v+1),U=F+1+p*v;S.push(P,C,U),S.push(C,N,U)}this.setIndex(S),this.setAttribute("position",new $t(E,3)),this.setAttribute("normal",new $t(T,3)),this.setAttribute("uv",new $t(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.width,e.height,e.widthSegments,e.heightSegments)}}class kd extends In{constructor(e=.5,t=1,r=32,o=1,l=0,u=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:o,thetaStart:l,thetaLength:u},r=Math.max(3,r),o=Math.max(1,o);const f=[],h=[],p=[],x=[];let _=e;const g=(t-e)/o,S=new H,E=new ft;for(let T=0;T<=o;T++){for(let y=0;y<=r;y++){const v=l+y/r*u;S.x=_*Math.cos(v),S.y=_*Math.sin(v),h.push(S.x,S.y,S.z),p.push(0,0,1),E.x=(S.x/t+1)/2,E.y=(S.y/t+1)/2,x.push(E.x,E.y)}_+=g}for(let T=0;T<o;T++){const y=T*(r+1);for(let v=0;v<r;v++){const F=v+y,P=F,C=F+r+1,N=F+r+2,U=F+1;f.push(P,C,U),f.push(C,N,U)}}this.setIndex(f),this.setAttribute("position",new $t(h,3)),this.setAttribute("normal",new $t(p,3)),this.setAttribute("uv",new $t(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kd(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class co extends In{constructor(e=1,t=32,r=16,o=0,l=Math.PI*2,u=0,f=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:o,phiLength:l,thetaStart:u,thetaLength:f},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const h=Math.min(u+f,Math.PI);let p=0;const x=[],_=new H,g=new H,S=[],E=[],T=[],y=[];for(let v=0;v<=r;v++){const F=[],P=v/r;let C=0;v===0&&u===0?C=.5/t:v===r&&h===Math.PI&&(C=-.5/t);for(let N=0;N<=t;N++){const U=N/t;_.x=-e*Math.cos(o+U*l)*Math.sin(u+P*f),_.y=e*Math.cos(u+P*f),_.z=e*Math.sin(o+U*l)*Math.sin(u+P*f),E.push(_.x,_.y,_.z),g.copy(_).normalize(),T.push(g.x,g.y,g.z),y.push(U+C,1-P),F.push(p++)}x.push(F)}for(let v=0;v<r;v++)for(let F=0;F<t;F++){const P=x[v][F+1],C=x[v][F],N=x[v+1][F],U=x[v+1][F+1];(v!==0||u>0)&&S.push(P,C,U),(v!==r-1||h<Math.PI)&&S.push(C,N,U)}this.setIndex(S),this.setAttribute("position",new $t(E,3)),this.setAttribute("normal",new $t(T,3)),this.setAttribute("uv",new $t(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new co(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Bd extends In{constructor(e=1,t=.4,r=12,o=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:o,arc:l},r=Math.floor(r),o=Math.floor(o);const u=[],f=[],h=[],p=[],x=new H,_=new H,g=new H;for(let S=0;S<=r;S++)for(let E=0;E<=o;E++){const T=E/o*l,y=S/r*Math.PI*2;_.x=(e+t*Math.cos(y))*Math.cos(T),_.y=(e+t*Math.cos(y))*Math.sin(T),_.z=t*Math.sin(y),f.push(_.x,_.y,_.z),x.x=e*Math.cos(T),x.y=e*Math.sin(T),g.subVectors(_,x).normalize(),h.push(g.x,g.y,g.z),p.push(E/o),p.push(S/r)}for(let S=1;S<=r;S++)for(let E=1;E<=o;E++){const T=(o+1)*S+E-1,y=(o+1)*(S-1)+E-1,v=(o+1)*(S-1)+E,F=(o+1)*S+E;u.push(T,y,F),u.push(y,v,F)}this.setIndex(u),this.setAttribute("position",new $t(f,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bd(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class tn extends ls{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wg,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hx extends ls{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=D_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vx extends ls{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zd extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Gx extends zd{constructor(e,t,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Mf=new Ft,Qm=new H,Jm=new H;class r0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.mapType=Li,this.map=null,this.mapPass=null,this.matrix=new Ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nd,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Qm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qm),Jm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jm),t.updateMatrixWorld(),Mf.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mf,t.coordinateSystem,t.reversedDepth),t.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Mf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const eg=new Ft,ia=new H,Ef=new H;class Wx extends r0{constructor(){super(new Qn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new Nt(2,1,1,1),new Nt(0,1,1,1),new Nt(3,1,1,1),new Nt(1,1,1,1),new Nt(3,0,1,1),new Nt(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,o=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),ia.setFromMatrixPosition(e.matrixWorld),r.position.copy(ia),Ef.copy(r.position),Ef.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(Ef),r.updateMatrixWorld(),o.makeTranslation(-ia.x,-ia.y,-ia.z),eg.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eg,r.coordinateSystem,r.reversedDepth)}}class Tf extends zd{constructor(e,t,r=0,o=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=o,this.shadow=new Wx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class s0 extends Qg{constructor(e=-1,t=1,r=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,u=r+e,f=o+t,h=o-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,f-=x*this.view.offsetY,h=f-x*this.view.height}this.projectionMatrix.makeOrthographic(l,u,f,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Xx extends r0{constructor(){super(new s0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jx extends zd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new Xx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Yx extends Qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class qx{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const tg=new Ft;class ng{constructor(e,t,r=0,o=1/0){this.ray=new Dd(e,t),this.near=r,this.far=o,this.camera=null,this.layers=new Id,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tg),this}intersectObject(e,t=!0,r=[]){return xd(e,this,r,t),r.sort(ig),r}intersectObjects(e,t=!0,r=[]){for(let o=0,l=e.length;o<l;o++)xd(e[o],this,r,t);return r.sort(ig),r}}function ig(s,e){return s.distance-e.distance}function xd(s,e,t,r){let o=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(o=!1),o===!0&&r===!0){const l=s.children;for(let u=0,f=l.length;u<f;u++)xd(l[u],e,t,!0)}}function rg(s,e,t,r){const o=$x(r);switch(t){case zg:return s*e;case Ad:return s*e/o.components*o.byteLength;case Cd:return s*e/o.components*o.byteLength;case Vg:return s*e*2/o.components*o.byteLength;case Rd:return s*e*2/o.components*o.byteLength;case Hg:return s*e*3/o.components*o.byteLength;case Si:return s*e*4/o.components*o.byteLength;case bd:return s*e*4/o.components*o.byteLength;case Jl:case ec:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case tc:case nc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Yf:case $f:return Math.max(s,16)*Math.max(e,8)/4;case jf:case qf:return Math.max(s,8)*Math.max(e,8)/2;case Kf:case Zf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Qf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Jf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ed:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case td:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case nd:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case id:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case rd:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case sd:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case od:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ad:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ld:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case cd:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case ud:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case fd:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case dd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case ic:case hd:case pd:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Gg:case md:return Math.ceil(s/4)*Math.ceil(e/4)*8;case gd:case vd:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $x(s){switch(s){case Li:case Og:return{byteLength:1,components:1};case aa:case kg:case ha:return{byteLength:2,components:1};case Td:case wd:return{byteLength:2,components:4};case os:case Ed:case bi:return{byteLength:4,components:1};case Bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Md}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Md);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function o0(){let s=null,e=!1,t=null,r=null;function o(l,u){t(l,u),r=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function Kx(s){const e=new WeakMap;function t(f,h){const p=f.array,x=f.usage,_=p.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,p,x),f.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=s.HALF_FLOAT;else if(p instanceof Uint16Array)f.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:f.version,size:_}}function r(f,h,p){const x=h.array,_=h.updateRanges;if(s.bindBuffer(p,f),_.length===0)s.bufferSubData(p,0,x);else{_.sort((S,E)=>S.start-E.start);let g=0;for(let S=1;S<_.length;S++){const E=_[g],T=_[S];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++g,_[g]=T)}_.length=g+1;for(let S=0,E=_.length;S<E;S++){const T=_[S];s.bufferSubData(p,T.start*x.BYTES_PER_ELEMENT,x,T.start,T.count)}h.clearUpdateRanges()}h.onUploadCallback()}function o(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const h=e.get(f);h&&(s.deleteBuffer(h.buffer),e.delete(f))}function u(f,h){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const x=e.get(f);(!x||x.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const p=e.get(f);if(p===void 0)e.set(f,t(f,h));else if(p.version<f.version){if(p.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,f,h),p.version=f.version}}return{get:o,remove:l,update:u}}var Zx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qx=`#ifdef USE_ALPHAHASH
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
#endif`,Jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ey=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ty=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ny=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,iy=`#ifdef USE_AOMAP
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
#endif`,ry=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sy=`#ifdef USE_BATCHING
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
#endif`,oy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ay=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ly=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uy=`#ifdef USE_IRIDESCENCE
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
#endif`,fy=`#ifdef USE_BUMPMAP
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
#endif`,dy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,py=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,my=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_y=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,yy=`#define PI 3.141592653589793
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
} // validated`,Sy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,My=`vec3 transformedNormal = objectNormal;
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
#endif`,Ey=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ty=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ay=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ry=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,by=`#ifdef USE_ENVMAP
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
#endif`,Py=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ly=`#ifdef USE_ENVMAP
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
#endif`,Dy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Iy=`#ifdef USE_ENVMAP
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
#endif`,Uy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ny=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Oy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ky=`#ifdef USE_GRADIENTMAP
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
}`,By=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vy=`uniform bool receiveShadow;
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
#endif`,Gy=`#ifdef USE_ENVMAP
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
#endif`,Wy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qy=`PhysicalMaterial material;
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
#endif`,$y=`struct PhysicalMaterial {
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
}`,Ky=`
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
#endif`,Zy=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,eS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,oS=`#if defined( USE_POINTS_UV )
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
#endif`,aS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,uS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dS=`#ifdef USE_MORPHTARGETS
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
#endif`,hS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_S=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xS=`#ifdef USE_NORMALMAP
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
#endif`,yS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,SS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,MS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ES=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,TS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,AS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,CS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,RS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,PS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,LS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,DS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
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
#endif`,IS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,US=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,NS=`float getShadowMask() {
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
}`,FS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,OS=`#ifdef USE_SKINNING
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
#endif`,kS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,BS=`#ifdef USE_SKINNING
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
#endif`,zS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,HS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,VS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,GS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,WS=`#ifdef USE_TRANSMISSION
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
#endif`,XS=`#ifdef USE_TRANSMISSION
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
#endif`,jS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$S=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const KS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ZS=`uniform sampler2D t2D;
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
}`,QS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,eM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nM=`#include <common>
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
}`,iM=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,rM=`#define DISTANCE
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
}`,sM=`#define DISTANCE
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
}`,oM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,aM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lM=`uniform float scale;
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
}`,cM=`uniform vec3 diffuse;
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
}`,uM=`#include <common>
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
}`,fM=`uniform vec3 diffuse;
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
}`,dM=`#define LAMBERT
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
}`,hM=`#define LAMBERT
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
}`,pM=`#define MATCAP
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
}`,mM=`#define MATCAP
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
}`,gM=`#define NORMAL
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
}`,vM=`#define NORMAL
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
}`,_M=`#define PHONG
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
}`,xM=`#define PHONG
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
}`,yM=`#define STANDARD
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
}`,SM=`#define STANDARD
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
}`,MM=`#define TOON
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
}`,EM=`#define TOON
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
}`,TM=`uniform float size;
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
}`,wM=`uniform vec3 diffuse;
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
}`,AM=`#include <common>
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
}`,CM=`uniform vec3 color;
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
}`,RM=`uniform float rotation;
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
}`,bM=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:Zx,alphahash_pars_fragment:Qx,alphamap_fragment:Jx,alphamap_pars_fragment:ey,alphatest_fragment:ty,alphatest_pars_fragment:ny,aomap_fragment:iy,aomap_pars_fragment:ry,batching_pars_vertex:sy,batching_vertex:oy,begin_vertex:ay,beginnormal_vertex:ly,bsdfs:cy,iridescence_fragment:uy,bumpmap_pars_fragment:fy,clipping_planes_fragment:dy,clipping_planes_pars_fragment:hy,clipping_planes_pars_vertex:py,clipping_planes_vertex:my,color_fragment:gy,color_pars_fragment:vy,color_pars_vertex:_y,color_vertex:xy,common:yy,cube_uv_reflection_fragment:Sy,defaultnormal_vertex:My,displacementmap_pars_vertex:Ey,displacementmap_vertex:Ty,emissivemap_fragment:wy,emissivemap_pars_fragment:Ay,colorspace_fragment:Cy,colorspace_pars_fragment:Ry,envmap_fragment:by,envmap_common_pars_fragment:Py,envmap_pars_fragment:Ly,envmap_pars_vertex:Dy,envmap_physical_pars_fragment:Gy,envmap_vertex:Iy,fog_vertex:Uy,fog_pars_vertex:Ny,fog_fragment:Fy,fog_pars_fragment:Oy,gradientmap_pars_fragment:ky,lightmap_pars_fragment:By,lights_lambert_fragment:zy,lights_lambert_pars_fragment:Hy,lights_pars_begin:Vy,lights_toon_fragment:Wy,lights_toon_pars_fragment:Xy,lights_phong_fragment:jy,lights_phong_pars_fragment:Yy,lights_physical_fragment:qy,lights_physical_pars_fragment:$y,lights_fragment_begin:Ky,lights_fragment_maps:Zy,lights_fragment_end:Qy,logdepthbuf_fragment:Jy,logdepthbuf_pars_fragment:eS,logdepthbuf_pars_vertex:tS,logdepthbuf_vertex:nS,map_fragment:iS,map_pars_fragment:rS,map_particle_fragment:sS,map_particle_pars_fragment:oS,metalnessmap_fragment:aS,metalnessmap_pars_fragment:lS,morphinstance_vertex:cS,morphcolor_vertex:uS,morphnormal_vertex:fS,morphtarget_pars_vertex:dS,morphtarget_vertex:hS,normal_fragment_begin:pS,normal_fragment_maps:mS,normal_pars_fragment:gS,normal_pars_vertex:vS,normal_vertex:_S,normalmap_pars_fragment:xS,clearcoat_normal_fragment_begin:yS,clearcoat_normal_fragment_maps:SS,clearcoat_pars_fragment:MS,iridescence_pars_fragment:ES,opaque_fragment:TS,packing:wS,premultiplied_alpha_fragment:AS,project_vertex:CS,dithering_fragment:RS,dithering_pars_fragment:bS,roughnessmap_fragment:PS,roughnessmap_pars_fragment:LS,shadowmap_pars_fragment:DS,shadowmap_pars_vertex:IS,shadowmap_vertex:US,shadowmask_pars_fragment:NS,skinbase_vertex:FS,skinning_pars_vertex:OS,skinning_vertex:kS,skinnormal_vertex:BS,specularmap_fragment:zS,specularmap_pars_fragment:HS,tonemapping_fragment:VS,tonemapping_pars_fragment:GS,transmission_fragment:WS,transmission_pars_fragment:XS,uv_pars_fragment:jS,uv_pars_vertex:YS,uv_vertex:qS,worldpos_vertex:$S,background_vert:KS,background_frag:ZS,backgroundCube_vert:QS,backgroundCube_frag:JS,cube_vert:eM,cube_frag:tM,depth_vert:nM,depth_frag:iM,distanceRGBA_vert:rM,distanceRGBA_frag:sM,equirect_vert:oM,equirect_frag:aM,linedashed_vert:lM,linedashed_frag:cM,meshbasic_vert:uM,meshbasic_frag:fM,meshlambert_vert:dM,meshlambert_frag:hM,meshmatcap_vert:pM,meshmatcap_frag:mM,meshnormal_vert:gM,meshnormal_frag:vM,meshphong_vert:_M,meshphong_frag:xM,meshphysical_vert:yM,meshphysical_frag:SM,meshtoon_vert:MM,meshtoon_frag:EM,points_vert:TM,points_frag:wM,shadow_vert:AM,shadow_frag:CM,sprite_vert:RM,sprite_frag:bM},Pe={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Ai={basic:{uniforms:Ln([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Ln([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Ln([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Ln([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Ln([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Ln([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Ln([Pe.points,Pe.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Ln([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Ln([Pe.common,Pe.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Ln([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Ln([Pe.sprite,Pe.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:Ln([Pe.common,Pe.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:Ln([Pe.lights,Pe.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Ai.physical={uniforms:Ln([Ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Yl={r:0,b:0,g:0},Kr=new Di,PM=new Ft;function LM(s,e,t,r,o,l,u){const f=new yt(0);let h=l===!0?0:1,p,x,_=null,g=0,S=null;function E(P){let C=P.isScene===!0?P.background:null;return C&&C.isTexture&&(C=(P.backgroundBlurriness>0?t:e).get(C)),C}function T(P){let C=!1;const N=E(P);N===null?v(f,h):N&&N.isColor&&(v(N,1),C=!0);const U=s.xr.getEnvironmentBlendMode();U==="additive"?r.buffers.color.setClear(0,0,0,1,u):U==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||C)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(P,C){const N=E(C);N&&(N.isCubeTexture||N.mapping===dc)?(x===void 0&&(x=new ht(new Dt(1,1,1),new br({name:"BackgroundCubeMaterial",uniforms:lo(Ai.backgroundCube.uniforms),vertexShader:Ai.backgroundCube.vertexShader,fragmentShader:Ai.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),x.geometry.deleteAttribute("normal"),x.geometry.deleteAttribute("uv"),x.onBeforeRender=function(U,k,j){this.matrixWorld.copyPosition(j.matrixWorld)},Object.defineProperty(x.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(x)),Kr.copy(C.backgroundRotation),Kr.x*=-1,Kr.y*=-1,Kr.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Kr.y*=-1,Kr.z*=-1),x.material.uniforms.envMap.value=N,x.material.uniforms.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,x.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,x.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,x.material.uniforms.backgroundRotation.value.setFromMatrix4(PM.makeRotationFromEuler(Kr)),x.material.toneMapped=At.getTransfer(N.colorSpace)!==Ut,(_!==N||g!==N.version||S!==s.toneMapping)&&(x.material.needsUpdate=!0,_=N,g=N.version,S=s.toneMapping),x.layers.enableAll(),P.unshift(x,x.geometry,x.material,0,0,null)):N&&N.isTexture&&(p===void 0&&(p=new ht(new ma(2,2),new br({name:"BackgroundMaterial",uniforms:lo(Ai.background.uniforms),vertexShader:Ai.background.vertexShader,fragmentShader:Ai.background.fragmentShader,side:Rr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(p)),p.material.uniforms.t2D.value=N,p.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,p.material.toneMapped=At.getTransfer(N.colorSpace)!==Ut,N.matrixAutoUpdate===!0&&N.updateMatrix(),p.material.uniforms.uvTransform.value.copy(N.matrix),(_!==N||g!==N.version||S!==s.toneMapping)&&(p.material.needsUpdate=!0,_=N,g=N.version,S=s.toneMapping),p.layers.enableAll(),P.unshift(p,p.geometry,p.material,0,0,null))}function v(P,C){P.getRGB(Yl,Zg(s)),r.buffers.color.setClear(Yl.r,Yl.g,Yl.b,C,u)}function F(){x!==void 0&&(x.geometry.dispose(),x.material.dispose(),x=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return f},setClearColor:function(P,C=1){f.set(P),h=C,v(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(P){h=P,v(f,h)},render:T,addToRenderList:y,dispose:F}}function DM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},o=g(null);let l=o,u=!1;function f(R,I,ie,te,se){let de=!1;const ae=_(te,ie,I);l!==ae&&(l=ae,p(l.object)),de=S(R,te,ie,se),de&&E(R,te,ie,se),se!==null&&e.update(se,s.ELEMENT_ARRAY_BUFFER),(de||u)&&(u=!1,C(R,I,ie,te),se!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(se).buffer))}function h(){return s.createVertexArray()}function p(R){return s.bindVertexArray(R)}function x(R){return s.deleteVertexArray(R)}function _(R,I,ie){const te=ie.wireframe===!0;let se=r[R.id];se===void 0&&(se={},r[R.id]=se);let de=se[I.id];de===void 0&&(de={},se[I.id]=de);let ae=de[te];return ae===void 0&&(ae=g(h()),de[te]=ae),ae}function g(R){const I=[],ie=[],te=[];for(let se=0;se<t;se++)I[se]=0,ie[se]=0,te[se]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:ie,attributeDivisors:te,object:R,attributes:{},index:null}}function S(R,I,ie,te){const se=l.attributes,de=I.attributes;let ae=0;const fe=ie.getAttributes();for(const V in fe)if(fe[V].location>=0){const oe=se[V];let O=de[V];if(O===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(O=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(O=R.instanceColor)),oe===void 0||oe.attribute!==O||O&&oe.data!==O.data)return!0;ae++}return l.attributesNum!==ae||l.index!==te}function E(R,I,ie,te){const se={},de=I.attributes;let ae=0;const fe=ie.getAttributes();for(const V in fe)if(fe[V].location>=0){let oe=de[V];oe===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(oe=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(oe=R.instanceColor));const O={};O.attribute=oe,oe&&oe.data&&(O.data=oe.data),se[V]=O,ae++}l.attributes=se,l.attributesNum=ae,l.index=te}function T(){const R=l.newAttributes;for(let I=0,ie=R.length;I<ie;I++)R[I]=0}function y(R){v(R,0)}function v(R,I){const ie=l.newAttributes,te=l.enabledAttributes,se=l.attributeDivisors;ie[R]=1,te[R]===0&&(s.enableVertexAttribArray(R),te[R]=1),se[R]!==I&&(s.vertexAttribDivisor(R,I),se[R]=I)}function F(){const R=l.newAttributes,I=l.enabledAttributes;for(let ie=0,te=I.length;ie<te;ie++)I[ie]!==R[ie]&&(s.disableVertexAttribArray(ie),I[ie]=0)}function P(R,I,ie,te,se,de,ae){ae===!0?s.vertexAttribIPointer(R,I,ie,se,de):s.vertexAttribPointer(R,I,ie,te,se,de)}function C(R,I,ie,te){T();const se=te.attributes,de=ie.getAttributes(),ae=I.defaultAttributeValues;for(const fe in de){const V=de[fe];if(V.location>=0){let ce=se[fe];if(ce===void 0&&(fe==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),fe==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),ce!==void 0){const oe=ce.normalized,O=ce.itemSize,re=e.get(ce);if(re===void 0)continue;const Be=re.buffer,ke=re.type,Q=re.bytesPerElement,me=ke===s.INT||ke===s.UNSIGNED_INT||ce.gpuType===Ed;if(ce.isInterleavedBufferAttribute){const pe=ce.data,Ce=pe.stride,Le=ce.offset;if(pe.isInstancedInterleavedBuffer){for(let Ze=0;Ze<V.locationSize;Ze++)v(V.location+Ze,pe.meshPerAttribute);R.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Ze=0;Ze<V.locationSize;Ze++)y(V.location+Ze);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let Ze=0;Ze<V.locationSize;Ze++)P(V.location+Ze,O/V.locationSize,ke,oe,Ce*Q,(Le+O/V.locationSize*Ze)*Q,me)}else{if(ce.isInstancedBufferAttribute){for(let pe=0;pe<V.locationSize;pe++)v(V.location+pe,ce.meshPerAttribute);R.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let pe=0;pe<V.locationSize;pe++)y(V.location+pe);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let pe=0;pe<V.locationSize;pe++)P(V.location+pe,O/V.locationSize,ke,oe,O*Q,O/V.locationSize*pe*Q,me)}}else if(ae!==void 0){const oe=ae[fe];if(oe!==void 0)switch(oe.length){case 2:s.vertexAttrib2fv(V.location,oe);break;case 3:s.vertexAttrib3fv(V.location,oe);break;case 4:s.vertexAttrib4fv(V.location,oe);break;default:s.vertexAttrib1fv(V.location,oe)}}}}F()}function N(){j();for(const R in r){const I=r[R];for(const ie in I){const te=I[ie];for(const se in te)x(te[se].object),delete te[se];delete I[ie]}delete r[R]}}function U(R){if(r[R.id]===void 0)return;const I=r[R.id];for(const ie in I){const te=I[ie];for(const se in te)x(te[se].object),delete te[se];delete I[ie]}delete r[R.id]}function k(R){for(const I in r){const ie=r[I];if(ie[R.id]===void 0)continue;const te=ie[R.id];for(const se in te)x(te[se].object),delete te[se];delete ie[R.id]}}function j(){b(),u=!0,l!==o&&(l=o,p(l.object))}function b(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:f,reset:j,resetDefaultState:b,dispose:N,releaseStatesOfGeometry:U,releaseStatesOfProgram:k,initAttributes:T,enableAttribute:y,disableUnusedAttributes:F}}function IM(s,e,t){let r;function o(p){r=p}function l(p,x){s.drawArrays(r,p,x),t.update(x,r,1)}function u(p,x,_){_!==0&&(s.drawArraysInstanced(r,p,x,_),t.update(x,r,_))}function f(p,x,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,x,0,_);let S=0;for(let E=0;E<_;E++)S+=x[E];t.update(S,r,1)}function h(p,x,_,g){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<p.length;E++)u(p[E],x[E],g[E]);else{S.multiDrawArraysInstancedWEBGL(r,p,0,x,0,g,0,_);let E=0;for(let T=0;T<_;T++)E+=x[T]*g[T];t.update(E,r,1)}}this.setMode=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function UM(s,e,t,r){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");o=s.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(k){return!(k!==Si&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(k){const j=k===ha&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(k!==Li&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==bi&&!j)}function h(k){if(k==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const x=h(p);x!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",x,"instead."),p=x);const _=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),F=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),P=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),N=E>0,U=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:f,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:S,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:F,maxVaryings:P,maxFragmentUniforms:C,vertexTextures:N,maxSamples:U}}function NM(s){const e=this;let t=null,r=0,o=!1,l=!1;const u=new Jr,f=new dt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const S=_.length!==0||g||r!==0||o;return o=g,r=_.length,S},this.beginShadows=function(){l=!0,x(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(_,g){t=x(_,g,0)},this.setState=function(_,g,S){const E=_.clippingPlanes,T=_.clipIntersection,y=_.clipShadows,v=s.get(_);if(!o||E===null||E.length===0||l&&!y)l?x(null):p();else{const F=l?0:r,P=F*4;let C=v.clippingState||null;h.value=C,C=x(E,g,P,S);for(let N=0;N!==P;++N)C[N]=t[N];v.clippingState=C,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=F}};function p(){h.value!==t&&(h.value=t,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function x(_,g,S,E){const T=_!==null?_.length:0;let y=null;if(T!==0){if(y=h.value,E!==!0||y===null){const v=S+T*4,F=g.matrixWorldInverse;f.getNormalMatrix(F),(y===null||y.length<v)&&(y=new Float32Array(v));for(let P=0,C=S;P!==T;++P,C+=4)u.copy(_[P]).applyMatrix4(F,f),u.normal.toArray(y,C),y[C+3]=u.constant}h.value=y,h.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,y}}function FM(s){let e=new WeakMap;function t(u,f){return f===Vf?u.mapping=so:f===Gf&&(u.mapping=oo),u}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Vf||f===Gf)if(e.has(u)){const h=e.get(u).texture;return t(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const p=new Rx(h.height);return p.fromEquirectangularTexture(s,u),e.set(u,p),u.addEventListener("dispose",o),t(p.texture,u.mapping)}else return null}}return u}function o(u){const f=u.target;f.removeEventListener("dispose",o);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const eo=4,sg=[.125,.215,.35,.446,.526,.582],ns=20,wf=new s0,og=new yt;let Af=null,Cf=0,Rf=0,bf=!1;const es=(1+Math.sqrt(5))/2,Qs=1/es,ag=[new H(-es,Qs,0),new H(es,Qs,0),new H(-Qs,0,es),new H(Qs,0,es),new H(0,es,-Qs),new H(0,es,Qs),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],OM=new H;class lg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,o=100,l={}){const{size:u=256,position:f=OM}=l;Af=this._renderer.getRenderTarget(),Cf=this._renderer.getActiveCubeFace(),Rf=this._renderer.getActiveMipmapLevel(),bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,r,o,h,f),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ug(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Af,Cf,Rf),this._renderer.xr.enabled=bf,e.scissorTest=!1,ql(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===so||e.mapping===oo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Af=this._renderer.getRenderTarget(),Cf=this._renderer.getActiveCubeFace(),Rf=this._renderer.getActiveMipmapLevel(),bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Ri,minFilter:Ri,generateMipmaps:!1,type:ha,format:Si,colorSpace:ao,depthBuffer:!1},o=cg(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cg(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kM(l)),this._blurMaterial=BM(l,e,t)}return o}_compileMaterial(e){const t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,wf)}_sceneToCubeUV(e,t,r,o,l){const h=new Qn(90,1,t,r),p=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,S=_.toneMapping;_.getClearColor(og),_.toneMapping=Cr,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(o),_.clearDepth(),_.setRenderTarget(null));const T=new ss({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),y=new ht(new Dt,T);let v=!1;const F=e.background;F?F.isColor&&(T.color.copy(F),e.background=null,v=!0):(T.color.copy(og),v=!0);for(let P=0;P<6;P++){const C=P%3;C===0?(h.up.set(0,p[P],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x+x[P],l.y,l.z)):C===1?(h.up.set(0,0,p[P]),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y+x[P],l.z)):(h.up.set(0,p[P],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y,l.z+x[P]));const N=this._cubeSize;ql(o,C*N,P>2?N:0,N,N),_.setRenderTarget(o),v&&_.render(y,h),_.render(e,h)}y.geometry.dispose(),y.material.dispose(),_.toneMapping=S,_.autoClear=g,e.background=F}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===so||e.mapping===oo;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=fg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ug());const l=o?this._cubemapMaterial:this._equirectMaterial,u=new ht(this._lodPlanes[0],l),f=l.uniforms;f.envMap.value=e;const h=this._cubeSize;ql(t,0,0,3*h,2*h),r.setRenderTarget(t),r.render(u,wf)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const o=this._lodPlanes.length;for(let l=1;l<o;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),f=ag[(o-l-1)%ag.length];this._blur(e,l-1,l,u,f)}t.autoClear=r}_blur(e,t,r,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,o,"latitudinal",l),this._halfBlur(u,e,r,r,o,"longitudinal",l)}_halfBlur(e,t,r,o,l,u,f){const h=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const x=3,_=new ht(this._lodPlanes[o],p),g=p.uniforms,S=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*ns-1),T=l/E,y=isFinite(l)?1+Math.floor(x*T):ns;y>ns&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${ns}`);const v=[];let F=0;for(let k=0;k<ns;++k){const j=k/T,b=Math.exp(-j*j/2);v.push(b),k===0?F+=b:k<y&&(F+=2*b)}for(let k=0;k<v.length;k++)v[k]=v[k]/F;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=v,g.latitudinal.value=u==="latitudinal",f&&(g.poleAxis.value=f);const{_lodMax:P}=this;g.dTheta.value=E,g.mipInt.value=P-r;const C=this._sizeLods[o],N=3*C*(o>P-eo?o-P+eo:0),U=4*(this._cubeSize-C);ql(t,N,U,3*C,2*C),h.setRenderTarget(t),h.render(_,wf)}}function kM(s){const e=[],t=[],r=[];let o=s;const l=s-eo+1+sg.length;for(let u=0;u<l;u++){const f=Math.pow(2,o);t.push(f);let h=1/f;u>s-eo?h=sg[u-s+eo-1]:u===0&&(h=0),r.push(h);const p=1/(f-2),x=-p,_=1+p,g=[x,x,_,x,_,_,x,x,_,_,x,_],S=6,E=6,T=3,y=2,v=1,F=new Float32Array(T*E*S),P=new Float32Array(y*E*S),C=new Float32Array(v*E*S);for(let U=0;U<S;U++){const k=U%3*2/3-1,j=U>2?0:-1,b=[k,j,0,k+2/3,j,0,k+2/3,j+1,0,k,j,0,k+2/3,j+1,0,k,j+1,0];F.set(b,T*E*U),P.set(g,y*E*U);const R=[U,U,U,U,U,U];C.set(R,v*E*U)}const N=new In;N.setAttribute("position",new ci(F,T)),N.setAttribute("uv",new ci(P,y)),N.setAttribute("faceIndex",new ci(C,v)),e.push(N),o>eo&&o--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function cg(s,e,t){const r=new as(s,e,t);return r.texture.mapping=dc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function ql(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function BM(s,e,t){const r=new Float32Array(ns),o=new H(0,1,0);return new br({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Hd(),fragmentShader:`

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
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function ug(){return new br({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hd(),fragmentShader:`

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
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function fg(){return new br({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ar,depthTest:!1,depthWrite:!1})}function Hd(){return`

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
	`}function zM(s){let e=new WeakMap,t=null;function r(f){if(f&&f.isTexture){const h=f.mapping,p=h===Vf||h===Gf,x=h===so||h===oo;if(p||x){let _=e.get(f);const g=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return t===null&&(t=new lg(s)),_=p?t.fromEquirectangular(f,_):t.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,e.set(f,_),_.texture;if(_!==void 0)return _.texture;{const S=f.image;return p&&S&&S.height>0||x&&S&&o(S)?(t===null&&(t=new lg(s)),_=p?t.fromEquirectangular(f):t.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,e.set(f,_),f.addEventListener("dispose",l),_.texture):null}}}return f}function o(f){let h=0;const p=6;for(let x=0;x<p;x++)f[x]!==void 0&&h++;return h===p}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:u}}function HM(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let o;switch(r){case"WEBGL_depth_texture":o=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=s.getExtension(r)}return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const o=t(r);return o===null&&no("THREE.WebGLRenderer: "+r+" extension not supported."),o}}}function VM(s,e,t,r){const o={},l=new WeakMap;function u(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const E in g.attributes)e.remove(g.attributes[E]);g.removeEventListener("dispose",u),delete o[g.id];const S=l.get(g);S&&(e.remove(S),l.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function f(_,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,t.memory.geometries++),g}function h(_){const g=_.attributes;for(const S in g)e.update(g[S],s.ARRAY_BUFFER)}function p(_){const g=[],S=_.index,E=_.attributes.position;let T=0;if(S!==null){const F=S.array;T=S.version;for(let P=0,C=F.length;P<C;P+=3){const N=F[P+0],U=F[P+1],k=F[P+2];g.push(N,U,U,k,k,N)}}else if(E!==void 0){const F=E.array;T=E.version;for(let P=0,C=F.length/3-1;P<C;P+=3){const N=P+0,U=P+1,k=P+2;g.push(N,U,U,k,k,N)}}else return;const y=new(jg(g)?Kg:$g)(g,1);y.version=T;const v=l.get(_);v&&e.remove(v),l.set(_,y)}function x(_){const g=l.get(_);if(g){const S=_.index;S!==null&&g.version<S.version&&p(_)}else p(_);return l.get(_)}return{get:f,update:h,getWireframeAttribute:x}}function GM(s,e,t){let r;function o(g){r=g}let l,u;function f(g){l=g.type,u=g.bytesPerElement}function h(g,S){s.drawElements(r,S,l,g*u),t.update(S,r,1)}function p(g,S,E){E!==0&&(s.drawElementsInstanced(r,S,l,g*u,E),t.update(S,r,E))}function x(g,S,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,g,0,E);let y=0;for(let v=0;v<E;v++)y+=S[v];t.update(y,r,1)}function _(g,S,E,T){if(E===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let v=0;v<g.length;v++)p(g[v]/u,S[v],T[v]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,l,g,0,T,0,E);let v=0;for(let F=0;F<E;F++)v+=S[F]*T[F];t.update(v,r,1)}}this.setMode=o,this.setIndex=f,this.render=h,this.renderInstances=p,this.renderMultiDraw=x,this.renderMultiDrawInstances=_}function WM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,f){switch(t.calls++,u){case s.TRIANGLES:t.triangles+=f*(l/3);break;case s.LINES:t.lines+=f*(l/2);break;case s.LINE_STRIP:t.lines+=f*(l-1);break;case s.LINE_LOOP:t.lines+=f*l;break;case s.POINTS:t.points+=f*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function XM(s,e,t){const r=new WeakMap,o=new Nt;function l(u,f,h){const p=u.morphTargetInfluences,x=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,_=x!==void 0?x.length:0;let g=r.get(f);if(g===void 0||g.count!==_){let R=function(){j.dispose(),r.delete(f),f.removeEventListener("dispose",R)};var S=R;g!==void 0&&g.texture.dispose();const E=f.morphAttributes.position!==void 0,T=f.morphAttributes.normal!==void 0,y=f.morphAttributes.color!==void 0,v=f.morphAttributes.position||[],F=f.morphAttributes.normal||[],P=f.morphAttributes.color||[];let C=0;E===!0&&(C=1),T===!0&&(C=2),y===!0&&(C=3);let N=f.attributes.position.count*C,U=1;N>e.maxTextureSize&&(U=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const k=new Float32Array(N*U*4*_),j=new Yg(k,N,U,_);j.type=bi,j.needsUpdate=!0;const b=C*4;for(let I=0;I<_;I++){const ie=v[I],te=F[I],se=P[I],de=N*U*4*I;for(let ae=0;ae<ie.count;ae++){const fe=ae*b;E===!0&&(o.fromBufferAttribute(ie,ae),k[de+fe+0]=o.x,k[de+fe+1]=o.y,k[de+fe+2]=o.z,k[de+fe+3]=0),T===!0&&(o.fromBufferAttribute(te,ae),k[de+fe+4]=o.x,k[de+fe+5]=o.y,k[de+fe+6]=o.z,k[de+fe+7]=0),y===!0&&(o.fromBufferAttribute(se,ae),k[de+fe+8]=o.x,k[de+fe+9]=o.y,k[de+fe+10]=o.z,k[de+fe+11]=se.itemSize===4?o.w:1)}}g={count:_,texture:j,size:new ft(N,U)},r.set(f,g),f.addEventListener("dispose",R)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,t);else{let E=0;for(let y=0;y<p.length;y++)E+=p[y];const T=f.morphTargetsRelative?1:1-E;h.getUniforms().setValue(s,"morphTargetBaseInfluence",T),h.getUniforms().setValue(s,"morphTargetInfluences",p)}h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:l}}function jM(s,e,t,r){let o=new WeakMap;function l(h){const p=r.render.frame,x=h.geometry,_=e.get(h,x);if(o.get(_)!==p&&(e.update(_),o.set(_,p)),h.isInstancedMesh&&(h.hasEventListener("dispose",f)===!1&&h.addEventListener("dispose",f),o.get(h)!==p&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),o.set(h,p))),h.isSkinnedMesh){const g=h.skeleton;o.get(g)!==p&&(g.update(),o.set(g,p))}return _}function u(){o=new WeakMap}function f(h){const p=h.target;p.removeEventListener("dispose",f),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:u}}const a0=new Tn,dg=new i0(1,1),l0=new Yg,c0=new fx,u0=new Jg,hg=[],pg=[],mg=new Float32Array(16),gg=new Float32Array(9),vg=new Float32Array(4);function ho(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=hg[o];if(l===void 0&&(l=new Float32Array(o),hg[o]=l),e!==0){r.toArray(l,0);for(let u=1,f=0;u!==e;++u)f+=t,s[u].toArray(l,f)}return l}function an(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function ln(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function hc(s,e){let t=pg[e];t===void 0&&(t=new Int32Array(e),pg[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function YM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function qM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;s.uniform2fv(this.addr,e),ln(t,e)}}function $M(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;s.uniform3fv(this.addr,e),ln(t,e)}}function KM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;s.uniform4fv(this.addr,e),ln(t,e)}}function ZM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(an(t,r))return;vg.set(r),s.uniformMatrix2fv(this.addr,!1,vg),ln(t,r)}}function QM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(an(t,r))return;gg.set(r),s.uniformMatrix3fv(this.addr,!1,gg),ln(t,r)}}function JM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(an(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(an(t,r))return;mg.set(r),s.uniformMatrix4fv(this.addr,!1,mg),ln(t,r)}}function eE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function tE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;s.uniform2iv(this.addr,e),ln(t,e)}}function nE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;s.uniform3iv(this.addr,e),ln(t,e)}}function iE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;s.uniform4iv(this.addr,e),ln(t,e)}}function rE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function sE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;s.uniform2uiv(this.addr,e),ln(t,e)}}function oE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;s.uniform3uiv(this.addr,e),ln(t,e)}}function aE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;s.uniform4uiv(this.addr,e),ln(t,e)}}function lE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);let l;this.type===s.SAMPLER_2D_SHADOW?(dg.compareFunction=Xg,l=dg):l=a0,t.setTexture2D(e||l,o)}function cE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||c0,o)}function uE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||u0,o)}function fE(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||l0,o)}function dE(s){switch(s){case 5126:return YM;case 35664:return qM;case 35665:return $M;case 35666:return KM;case 35674:return ZM;case 35675:return QM;case 35676:return JM;case 5124:case 35670:return eE;case 35667:case 35671:return tE;case 35668:case 35672:return nE;case 35669:case 35673:return iE;case 5125:return rE;case 36294:return sE;case 36295:return oE;case 36296:return aE;case 35678:case 36198:case 36298:case 36306:case 35682:return lE;case 35679:case 36299:case 36307:return cE;case 35680:case 36300:case 36308:case 36293:return uE;case 36289:case 36303:case 36311:case 36292:return fE}}function hE(s,e){s.uniform1fv(this.addr,e)}function pE(s,e){const t=ho(e,this.size,2);s.uniform2fv(this.addr,t)}function mE(s,e){const t=ho(e,this.size,3);s.uniform3fv(this.addr,t)}function gE(s,e){const t=ho(e,this.size,4);s.uniform4fv(this.addr,t)}function vE(s,e){const t=ho(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function _E(s,e){const t=ho(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function xE(s,e){const t=ho(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function yE(s,e){s.uniform1iv(this.addr,e)}function SE(s,e){s.uniform2iv(this.addr,e)}function ME(s,e){s.uniform3iv(this.addr,e)}function EE(s,e){s.uniform4iv(this.addr,e)}function TE(s,e){s.uniform1uiv(this.addr,e)}function wE(s,e){s.uniform2uiv(this.addr,e)}function AE(s,e){s.uniform3uiv(this.addr,e)}function CE(s,e){s.uniform4uiv(this.addr,e)}function RE(s,e,t){const r=this.cache,o=e.length,l=hc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTexture2D(e[u]||a0,l[u])}function bE(s,e,t){const r=this.cache,o=e.length,l=hc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||c0,l[u])}function PE(s,e,t){const r=this.cache,o=e.length,l=hc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||u0,l[u])}function LE(s,e,t){const r=this.cache,o=e.length,l=hc(t,o);an(r,l)||(s.uniform1iv(this.addr,l),ln(r,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||l0,l[u])}function DE(s){switch(s){case 5126:return hE;case 35664:return pE;case 35665:return mE;case 35666:return gE;case 35674:return vE;case 35675:return _E;case 35676:return xE;case 5124:case 35670:return yE;case 35667:case 35671:return SE;case 35668:case 35672:return ME;case 35669:case 35673:return EE;case 5125:return TE;case 36294:return wE;case 36295:return AE;case 36296:return CE;case 35678:case 36198:case 36298:case 36306:case 35682:return RE;case 35679:case 36299:case 36307:return bE;case 35680:case 36300:case 36308:case 36293:return PE;case 36289:case 36303:case 36311:case 36292:return LE}}class IE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=dE(t.type)}}class UE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=DE(t.type)}}class NE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const f=o[l];f.setValue(e,t[f.id],r)}}}const Pf=/(\w+)(\])?(\[|\.)?/g;function _g(s,e){s.seq.push(e),s.map[e.id]=e}function FE(s,e,t){const r=s.name,o=r.length;for(Pf.lastIndex=0;;){const l=Pf.exec(r),u=Pf.lastIndex;let f=l[1];const h=l[2]==="]",p=l[3];if(h&&(f=f|0),p===void 0||p==="["&&u+2===o){_g(t,p===void 0?new IE(f,s,e):new UE(f,s,e));break}else{let _=t.map[f];_===void 0&&(_=new NE(f),_g(t,_)),t=_}}}class rc{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<r;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);FE(l,u,this)}}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,u=t.length;l!==u;++l){const f=t[l],h=r[f.id];h.needsUpdate!==!1&&f.setValue(e,h.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&r.push(u)}return r}}function xg(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const OE=37297;let kE=0;function BE(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const f=u+1;r.push(`${f===e?">":" "} ${f}: ${t[u]}`)}return r.join(`
`)}const yg=new dt;function zE(s){At._getMatrix(yg,At.workingColorSpace,s);const e=`mat3( ${yg.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(s)){case oc:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Sg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),l=(s.getShaderInfoLog(e)||"").trim();if(r&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const f=parseInt(u[1]);return t.toUpperCase()+`

`+l+`

`+BE(s.getShaderSource(e),f)}else return l}function HE(s,e){const t=zE(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function VE(s,e){let t;switch(e){case w_:t="Linear";break;case A_:t="Reinhard";break;case C_:t="Cineon";break;case Ng:t="ACESFilmic";break;case b_:t="AgX";break;case P_:t="Neutral";break;case R_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $l=new H;function GE(){At.getLuminanceCoefficients($l);const s=$l.x.toFixed(4),e=$l.y.toFixed(4),t=$l.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ra).join(`
`)}function XE(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function jE(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),u=l.name;let f=1;l.type===s.FLOAT_MAT2&&(f=2),l.type===s.FLOAT_MAT3&&(f=3),l.type===s.FLOAT_MAT4&&(f=4),t[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:f}}return t}function ra(s){return s!==""}function Mg(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Eg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YE=/^[ \t]*#include +<([\w\d./]+)>/gm;function yd(s){return s.replace(YE,$E)}const qE=new Map;function $E(s,e){let t=pt[e];if(t===void 0){const r=qE.get(e);if(r!==void 0)t=pt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return yd(t)}const KE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tg(s){return s.replace(KE,ZE)}function ZE(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function wg(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function QE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Dg?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ig?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===qi&&(e="SHADOWMAP_TYPE_VSM"),e}function JE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case so:case oo:e="ENVMAP_TYPE_CUBE";break;case dc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function e1(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case oo:e="ENVMAP_MODE_REFRACTION";break}return e}function t1(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ug:e="ENVMAP_BLENDING_MULTIPLY";break;case E_:e="ENVMAP_BLENDING_MIX";break;case T_:e="ENVMAP_BLENDING_ADD";break}return e}function n1(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function i1(s,e,t,r){const o=s.getContext(),l=t.defines;let u=t.vertexShader,f=t.fragmentShader;const h=QE(t),p=JE(t),x=e1(t),_=t1(t),g=n1(t),S=WE(t),E=XE(l),T=o.createProgram();let y,v,F=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(ra).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(ra).join(`
`),v.length>0&&(v+=`
`)):(y=[wg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+x:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ra).join(`
`),v=[wg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+x:"",t.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cr?"#define TONE_MAPPING":"",t.toneMapping!==Cr?pt.tonemapping_pars_fragment:"",t.toneMapping!==Cr?VE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,HE("linearToOutputTexel",t.outputColorSpace),GE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ra).join(`
`)),u=yd(u),u=Mg(u,t),u=Eg(u,t),f=yd(f),f=Mg(f,t),f=Eg(f,t),u=Tg(u),f=Tg(f),t.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",t.glslVersion===Am?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Am?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const P=F+y+u,C=F+v+f,N=xg(o,o.VERTEX_SHADER,P),U=xg(o,o.FRAGMENT_SHADER,C);o.attachShader(T,N),o.attachShader(T,U),t.index0AttributeName!==void 0?o.bindAttribLocation(T,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(T,0,"position"),o.linkProgram(T);function k(I){if(s.debug.checkShaderErrors){const ie=o.getProgramInfoLog(T)||"",te=o.getShaderInfoLog(N)||"",se=o.getShaderInfoLog(U)||"",de=ie.trim(),ae=te.trim(),fe=se.trim();let V=!0,ce=!0;if(o.getProgramParameter(T,o.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,T,N,U);else{const oe=Sg(o,N,"vertex"),O=Sg(o,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(T,o.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+de+`
`+oe+`
`+O)}else de!==""?console.warn("THREE.WebGLProgram: Program Info Log:",de):(ae===""||fe==="")&&(ce=!1);ce&&(I.diagnostics={runnable:V,programLog:de,vertexShader:{log:ae,prefix:y},fragmentShader:{log:fe,prefix:v}})}o.deleteShader(N),o.deleteShader(U),j=new rc(o,T),b=jE(o,T)}let j;this.getUniforms=function(){return j===void 0&&k(this),j};let b;this.getAttributes=function(){return b===void 0&&k(this),b};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=o.getProgramParameter(T,OE)),R},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kE++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=N,this.fragmentShader=U,this}let r1=0;class s1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new o1(e),t.set(e,r)),r}}class o1{constructor(e){this.id=r1++,this.code=e,this.usedTimes=0}}function a1(s,e,t,r,o,l,u){const f=new Id,h=new s1,p=new Set,x=[],_=o.logarithmicDepthBuffer,g=o.vertexTextures;let S=o.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(b){return p.add(b),b===0?"uv":`uv${b}`}function y(b,R,I,ie,te){const se=ie.fog,de=te.geometry,ae=b.isMeshStandardMaterial?ie.environment:null,fe=(b.isMeshStandardMaterial?t:e).get(b.envMap||ae),V=fe&&fe.mapping===dc?fe.image.height:null,ce=E[b.type];b.precision!==null&&(S=o.getMaxPrecision(b.precision),S!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",S,"instead."));const oe=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,O=oe!==void 0?oe.length:0;let re=0;de.morphAttributes.position!==void 0&&(re=1),de.morphAttributes.normal!==void 0&&(re=2),de.morphAttributes.color!==void 0&&(re=3);let Be,ke,Q,me;if(ce){const Mt=Ai[ce];Be=Mt.vertexShader,ke=Mt.fragmentShader}else Be=b.vertexShader,ke=b.fragmentShader,h.update(b),Q=h.getVertexShaderID(b),me=h.getFragmentShaderID(b);const pe=s.getRenderTarget(),Ce=s.state.buffers.depth.getReversed(),Le=te.isInstancedMesh===!0,Ze=te.isBatchedMesh===!0,zt=!!b.map,_t=!!b.matcap,B=!!fe,Ct=!!b.aoMap,Je=!!b.lightMap,St=!!b.bumpMap,$e=!!b.normalMap,Ot=!!b.displacementMap,Fe=!!b.emissiveMap,ct=!!b.metalnessMap,Vt=!!b.roughnessMap,Gt=b.anisotropy>0,L=b.clearcoat>0,w=b.dispersion>0,$=b.iridescence>0,ue=b.sheen>0,_e=b.transmission>0,le=Gt&&!!b.anisotropyMap,Ye=L&&!!b.clearcoatMap,we=L&&!!b.clearcoatNormalMap,ze=L&&!!b.clearcoatRoughnessMap,qe=$&&!!b.iridescenceMap,Ee=$&&!!b.iridescenceThicknessMap,De=ue&&!!b.sheenColorMap,rt=ue&&!!b.sheenRoughnessMap,Xe=!!b.specularMap,Re=!!b.specularColorMap,ut=!!b.specularIntensityMap,G=_e&&!!b.transmissionMap,Se=_e&&!!b.thicknessMap,Ae=!!b.gradientMap,Ie=!!b.alphaMap,ye=b.alphaTest>0,he=!!b.alphaHash,Ge=!!b.extensions;let lt=Cr;b.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(lt=s.toneMapping);const bt={shaderID:ce,shaderType:b.type,shaderName:b.name,vertexShader:Be,fragmentShader:ke,defines:b.defines,customVertexShaderID:Q,customFragmentShaderID:me,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:S,batching:Ze,batchingColor:Ze&&te._colorsTexture!==null,instancing:Le,instancingColor:Le&&te.instanceColor!==null,instancingMorph:Le&&te.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:pe===null?s.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:ao,alphaToCoverage:!!b.alphaToCoverage,map:zt,matcap:_t,envMap:B,envMapMode:B&&fe.mapping,envMapCubeUVHeight:V,aoMap:Ct,lightMap:Je,bumpMap:St,normalMap:$e,displacementMap:g&&Ot,emissiveMap:Fe,normalMapObjectSpace:$e&&b.normalMapType===U_,normalMapTangentSpace:$e&&b.normalMapType===Wg,metalnessMap:ct,roughnessMap:Vt,anisotropy:Gt,anisotropyMap:le,clearcoat:L,clearcoatMap:Ye,clearcoatNormalMap:we,clearcoatRoughnessMap:ze,dispersion:w,iridescence:$,iridescenceMap:qe,iridescenceThicknessMap:Ee,sheen:ue,sheenColorMap:De,sheenRoughnessMap:rt,specularMap:Xe,specularColorMap:Re,specularIntensityMap:ut,transmission:_e,transmissionMap:G,thicknessMap:Se,gradientMap:Ae,opaque:b.transparent===!1&&b.blending===to&&b.alphaToCoverage===!1,alphaMap:Ie,alphaTest:ye,alphaHash:he,combine:b.combine,mapUv:zt&&T(b.map.channel),aoMapUv:Ct&&T(b.aoMap.channel),lightMapUv:Je&&T(b.lightMap.channel),bumpMapUv:St&&T(b.bumpMap.channel),normalMapUv:$e&&T(b.normalMap.channel),displacementMapUv:Ot&&T(b.displacementMap.channel),emissiveMapUv:Fe&&T(b.emissiveMap.channel),metalnessMapUv:ct&&T(b.metalnessMap.channel),roughnessMapUv:Vt&&T(b.roughnessMap.channel),anisotropyMapUv:le&&T(b.anisotropyMap.channel),clearcoatMapUv:Ye&&T(b.clearcoatMap.channel),clearcoatNormalMapUv:we&&T(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&T(b.clearcoatRoughnessMap.channel),iridescenceMapUv:qe&&T(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&T(b.iridescenceThicknessMap.channel),sheenColorMapUv:De&&T(b.sheenColorMap.channel),sheenRoughnessMapUv:rt&&T(b.sheenRoughnessMap.channel),specularMapUv:Xe&&T(b.specularMap.channel),specularColorMapUv:Re&&T(b.specularColorMap.channel),specularIntensityMapUv:ut&&T(b.specularIntensityMap.channel),transmissionMapUv:G&&T(b.transmissionMap.channel),thicknessMapUv:Se&&T(b.thicknessMap.channel),alphaMapUv:Ie&&T(b.alphaMap.channel),vertexTangents:!!de.attributes.tangent&&($e||Gt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,pointsUvs:te.isPoints===!0&&!!de.attributes.uv&&(zt||Ie),fog:!!se,useFog:b.fog===!0,fogExp2:!!se&&se.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Ce,skinning:te.isSkinnedMesh===!0,morphTargets:de.morphAttributes.position!==void 0,morphNormals:de.morphAttributes.normal!==void 0,morphColors:de.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:re,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:lt,decodeVideoTexture:zt&&b.map.isVideoTexture===!0&&At.getTransfer(b.map.colorSpace)===Ut,decodeVideoTextureEmissive:Fe&&b.emissiveMap.isVideoTexture===!0&&At.getTransfer(b.emissiveMap.colorSpace)===Ut,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ci,flipSided:b.side===Dn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ge&&b.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&b.extensions.multiDraw===!0||Ze)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return bt.vertexUv1s=p.has(1),bt.vertexUv2s=p.has(2),bt.vertexUv3s=p.has(3),p.clear(),bt}function v(b){const R=[];if(b.shaderID?R.push(b.shaderID):(R.push(b.customVertexShaderID),R.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)R.push(I),R.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(F(R,b),P(R,b),R.push(s.outputColorSpace)),R.push(b.customProgramCacheKey),R.join()}function F(b,R){b.push(R.precision),b.push(R.outputColorSpace),b.push(R.envMapMode),b.push(R.envMapCubeUVHeight),b.push(R.mapUv),b.push(R.alphaMapUv),b.push(R.lightMapUv),b.push(R.aoMapUv),b.push(R.bumpMapUv),b.push(R.normalMapUv),b.push(R.displacementMapUv),b.push(R.emissiveMapUv),b.push(R.metalnessMapUv),b.push(R.roughnessMapUv),b.push(R.anisotropyMapUv),b.push(R.clearcoatMapUv),b.push(R.clearcoatNormalMapUv),b.push(R.clearcoatRoughnessMapUv),b.push(R.iridescenceMapUv),b.push(R.iridescenceThicknessMapUv),b.push(R.sheenColorMapUv),b.push(R.sheenRoughnessMapUv),b.push(R.specularMapUv),b.push(R.specularColorMapUv),b.push(R.specularIntensityMapUv),b.push(R.transmissionMapUv),b.push(R.thicknessMapUv),b.push(R.combine),b.push(R.fogExp2),b.push(R.sizeAttenuation),b.push(R.morphTargetsCount),b.push(R.morphAttributeCount),b.push(R.numDirLights),b.push(R.numPointLights),b.push(R.numSpotLights),b.push(R.numSpotLightMaps),b.push(R.numHemiLights),b.push(R.numRectAreaLights),b.push(R.numDirLightShadows),b.push(R.numPointLightShadows),b.push(R.numSpotLightShadows),b.push(R.numSpotLightShadowsWithMaps),b.push(R.numLightProbes),b.push(R.shadowMapType),b.push(R.toneMapping),b.push(R.numClippingPlanes),b.push(R.numClipIntersection),b.push(R.depthPacking)}function P(b,R){f.disableAll(),R.supportsVertexTextures&&f.enable(0),R.instancing&&f.enable(1),R.instancingColor&&f.enable(2),R.instancingMorph&&f.enable(3),R.matcap&&f.enable(4),R.envMap&&f.enable(5),R.normalMapObjectSpace&&f.enable(6),R.normalMapTangentSpace&&f.enable(7),R.clearcoat&&f.enable(8),R.iridescence&&f.enable(9),R.alphaTest&&f.enable(10),R.vertexColors&&f.enable(11),R.vertexAlphas&&f.enable(12),R.vertexUv1s&&f.enable(13),R.vertexUv2s&&f.enable(14),R.vertexUv3s&&f.enable(15),R.vertexTangents&&f.enable(16),R.anisotropy&&f.enable(17),R.alphaHash&&f.enable(18),R.batching&&f.enable(19),R.dispersion&&f.enable(20),R.batchingColor&&f.enable(21),R.gradientMap&&f.enable(22),b.push(f.mask),f.disableAll(),R.fog&&f.enable(0),R.useFog&&f.enable(1),R.flatShading&&f.enable(2),R.logarithmicDepthBuffer&&f.enable(3),R.reversedDepthBuffer&&f.enable(4),R.skinning&&f.enable(5),R.morphTargets&&f.enable(6),R.morphNormals&&f.enable(7),R.morphColors&&f.enable(8),R.premultipliedAlpha&&f.enable(9),R.shadowMapEnabled&&f.enable(10),R.doubleSided&&f.enable(11),R.flipSided&&f.enable(12),R.useDepthPacking&&f.enable(13),R.dithering&&f.enable(14),R.transmission&&f.enable(15),R.sheen&&f.enable(16),R.opaque&&f.enable(17),R.pointsUvs&&f.enable(18),R.decodeVideoTexture&&f.enable(19),R.decodeVideoTextureEmissive&&f.enable(20),R.alphaToCoverage&&f.enable(21),b.push(f.mask)}function C(b){const R=E[b.type];let I;if(R){const ie=Ai[R];I=Tx.clone(ie.uniforms)}else I=b.uniforms;return I}function N(b,R){let I;for(let ie=0,te=x.length;ie<te;ie++){const se=x[ie];if(se.cacheKey===R){I=se,++I.usedTimes;break}}return I===void 0&&(I=new i1(s,R,b,l),x.push(I)),I}function U(b){if(--b.usedTimes===0){const R=x.indexOf(b);x[R]=x[x.length-1],x.pop(),b.destroy()}}function k(b){h.remove(b)}function j(){h.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:C,acquireProgram:N,releaseProgram:U,releaseShaderCache:k,programs:x,dispose:j}}function l1(){let s=new WeakMap;function e(u){return s.has(u)}function t(u){let f=s.get(u);return f===void 0&&(f={},s.set(u,f)),f}function r(u){s.delete(u)}function o(u,f,h){s.get(u)[f]=h}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:o,dispose:l}}function c1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ag(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Cg(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function u(_,g,S,E,T,y){let v=s[e];return v===void 0?(v={id:_.id,object:_,geometry:g,material:S,groupOrder:E,renderOrder:_.renderOrder,z:T,group:y},s[e]=v):(v.id=_.id,v.object=_,v.geometry=g,v.material=S,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=T,v.group=y),e++,v}function f(_,g,S,E,T,y){const v=u(_,g,S,E,T,y);S.transmission>0?r.push(v):S.transparent===!0?o.push(v):t.push(v)}function h(_,g,S,E,T,y){const v=u(_,g,S,E,T,y);S.transmission>0?r.unshift(v):S.transparent===!0?o.unshift(v):t.unshift(v)}function p(_,g){t.length>1&&t.sort(_||c1),r.length>1&&r.sort(g||Ag),o.length>1&&o.sort(g||Ag)}function x(){for(let _=e,g=s.length;_<g;_++){const S=s[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:f,unshift:h,finish:x,sort:p}}function u1(){let s=new WeakMap;function e(r,o){const l=s.get(r);let u;return l===void 0?(u=new Cg,s.set(r,[u])):o>=l.length?(u=new Cg,l.push(u)):u=l[o],u}function t(){s=new WeakMap}return{get:e,dispose:t}}function f1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new yt};break;case"SpotLight":t={position:new H,direction:new H,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new H,halfWidth:new H,halfHeight:new H};break}return s[e.id]=t,t}}}function d1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let h1=0;function p1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function m1(s){const e=new f1,t=d1(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new H);const o=new H,l=new Ft,u=new Ft;function f(p){let x=0,_=0,g=0;for(let b=0;b<9;b++)r.probe[b].set(0,0,0);let S=0,E=0,T=0,y=0,v=0,F=0,P=0,C=0,N=0,U=0,k=0;p.sort(p1);for(let b=0,R=p.length;b<R;b++){const I=p[b],ie=I.color,te=I.intensity,se=I.distance,de=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)x+=ie.r*te,_+=ie.g*te,g+=ie.b*te;else if(I.isLightProbe){for(let ae=0;ae<9;ae++)r.probe[ae].addScaledVector(I.sh.coefficients[ae],te);k++}else if(I.isDirectionalLight){const ae=e.get(I);if(ae.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const fe=I.shadow,V=t.get(I);V.shadowIntensity=fe.intensity,V.shadowBias=fe.bias,V.shadowNormalBias=fe.normalBias,V.shadowRadius=fe.radius,V.shadowMapSize=fe.mapSize,r.directionalShadow[S]=V,r.directionalShadowMap[S]=de,r.directionalShadowMatrix[S]=I.shadow.matrix,F++}r.directional[S]=ae,S++}else if(I.isSpotLight){const ae=e.get(I);ae.position.setFromMatrixPosition(I.matrixWorld),ae.color.copy(ie).multiplyScalar(te),ae.distance=se,ae.coneCos=Math.cos(I.angle),ae.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),ae.decay=I.decay,r.spot[T]=ae;const fe=I.shadow;if(I.map&&(r.spotLightMap[N]=I.map,N++,fe.updateMatrices(I),I.castShadow&&U++),r.spotLightMatrix[T]=fe.matrix,I.castShadow){const V=t.get(I);V.shadowIntensity=fe.intensity,V.shadowBias=fe.bias,V.shadowNormalBias=fe.normalBias,V.shadowRadius=fe.radius,V.shadowMapSize=fe.mapSize,r.spotShadow[T]=V,r.spotShadowMap[T]=de,C++}T++}else if(I.isRectAreaLight){const ae=e.get(I);ae.color.copy(ie).multiplyScalar(te),ae.halfWidth.set(I.width*.5,0,0),ae.halfHeight.set(0,I.height*.5,0),r.rectArea[y]=ae,y++}else if(I.isPointLight){const ae=e.get(I);if(ae.color.copy(I.color).multiplyScalar(I.intensity),ae.distance=I.distance,ae.decay=I.decay,I.castShadow){const fe=I.shadow,V=t.get(I);V.shadowIntensity=fe.intensity,V.shadowBias=fe.bias,V.shadowNormalBias=fe.normalBias,V.shadowRadius=fe.radius,V.shadowMapSize=fe.mapSize,V.shadowCameraNear=fe.camera.near,V.shadowCameraFar=fe.camera.far,r.pointShadow[E]=V,r.pointShadowMap[E]=de,r.pointShadowMatrix[E]=I.shadow.matrix,P++}r.point[E]=ae,E++}else if(I.isHemisphereLight){const ae=e.get(I);ae.skyColor.copy(I.color).multiplyScalar(te),ae.groundColor.copy(I.groundColor).multiplyScalar(te),r.hemi[v]=ae,v++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Pe.LTC_FLOAT_1,r.rectAreaLTC2=Pe.LTC_FLOAT_2):(r.rectAreaLTC1=Pe.LTC_HALF_1,r.rectAreaLTC2=Pe.LTC_HALF_2)),r.ambient[0]=x,r.ambient[1]=_,r.ambient[2]=g;const j=r.hash;(j.directionalLength!==S||j.pointLength!==E||j.spotLength!==T||j.rectAreaLength!==y||j.hemiLength!==v||j.numDirectionalShadows!==F||j.numPointShadows!==P||j.numSpotShadows!==C||j.numSpotMaps!==N||j.numLightProbes!==k)&&(r.directional.length=S,r.spot.length=T,r.rectArea.length=y,r.point.length=E,r.hemi.length=v,r.directionalShadow.length=F,r.directionalShadowMap.length=F,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=F,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=C+N-U,r.spotLightMap.length=N,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=k,j.directionalLength=S,j.pointLength=E,j.spotLength=T,j.rectAreaLength=y,j.hemiLength=v,j.numDirectionalShadows=F,j.numPointShadows=P,j.numSpotShadows=C,j.numSpotMaps=N,j.numLightProbes=k,r.version=h1++)}function h(p,x){let _=0,g=0,S=0,E=0,T=0;const y=x.matrixWorldInverse;for(let v=0,F=p.length;v<F;v++){const P=p[v];if(P.isDirectionalLight){const C=r.directional[_];C.direction.setFromMatrixPosition(P.matrixWorld),o.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(o),C.direction.transformDirection(y),_++}else if(P.isSpotLight){const C=r.spot[S];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(y),C.direction.setFromMatrixPosition(P.matrixWorld),o.setFromMatrixPosition(P.target.matrixWorld),C.direction.sub(o),C.direction.transformDirection(y),S++}else if(P.isRectAreaLight){const C=r.rectArea[E];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(y),u.identity(),l.copy(P.matrixWorld),l.premultiply(y),u.extractRotation(l),C.halfWidth.set(P.width*.5,0,0),C.halfHeight.set(0,P.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),E++}else if(P.isPointLight){const C=r.point[g];C.position.setFromMatrixPosition(P.matrixWorld),C.position.applyMatrix4(y),g++}else if(P.isHemisphereLight){const C=r.hemi[T];C.direction.setFromMatrixPosition(P.matrixWorld),C.direction.transformDirection(y),T++}}}return{setup:f,setupView:h,state:r}}function Rg(s){const e=new m1(s),t=[],r=[];function o(x){p.camera=x,t.length=0,r.length=0}function l(x){t.push(x)}function u(x){r.push(x)}function f(){e.setup(t)}function h(x){e.setupView(t,x)}const p={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:o,state:p,setupLights:f,setupLightsView:h,pushLight:l,pushShadow:u}}function g1(s){let e=new WeakMap;function t(o,l=0){const u=e.get(o);let f;return u===void 0?(f=new Rg(s),e.set(o,[f])):l>=u.length?(f=new Rg(s),u.push(f)):f=u[l],f}function r(){e=new WeakMap}return{get:t,dispose:r}}const v1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_1=`uniform sampler2D shadow_pass;
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
}`;function x1(s,e,t){let r=new Nd;const o=new ft,l=new ft,u=new Nt,f=new Hx({depthPacking:I_}),h=new Vx,p={},x=t.maxTextureSize,_={[Rr]:Dn,[Dn]:Rr,[Ci]:Ci},g=new br({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:v1,fragmentShader:_1}),S=g.clone();S.defines.HORIZONTAL_PASS=1;const E=new In;E.setAttribute("position",new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new ht(E,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dg;let v=this.type;this.render=function(U,k,j){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||U.length===0)return;const b=s.getRenderTarget(),R=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),ie=s.state;ie.setBlending(Ar),ie.buffers.depth.getReversed()?ie.buffers.color.setClear(0,0,0,0):ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);const te=v!==qi&&this.type===qi,se=v===qi&&this.type!==qi;for(let de=0,ae=U.length;de<ae;de++){const fe=U[de],V=fe.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",fe,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;o.copy(V.mapSize);const ce=V.getFrameExtents();if(o.multiply(ce),l.copy(V.mapSize),(o.x>x||o.y>x)&&(o.x>x&&(l.x=Math.floor(x/ce.x),o.x=l.x*ce.x,V.mapSize.x=l.x),o.y>x&&(l.y=Math.floor(x/ce.y),o.y=l.y*ce.y,V.mapSize.y=l.y)),V.map===null||te===!0||se===!0){const O=this.type!==qi?{minFilter:Jn,magFilter:Jn}:{};V.map!==null&&V.map.dispose(),V.map=new as(o.x,o.y,O),V.map.texture.name=fe.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const oe=V.getViewportCount();for(let O=0;O<oe;O++){const re=V.getViewport(O);u.set(l.x*re.x,l.y*re.y,l.x*re.z,l.y*re.w),ie.viewport(u),V.updateMatrices(fe,O),r=V.getFrustum(),C(k,j,V.camera,fe,this.type)}V.isPointLightShadow!==!0&&this.type===qi&&F(V,j),V.needsUpdate=!1}v=this.type,y.needsUpdate=!1,s.setRenderTarget(b,R,I)};function F(U,k){const j=e.update(T);g.defines.VSM_SAMPLES!==U.blurSamples&&(g.defines.VSM_SAMPLES=U.blurSamples,S.defines.VSM_SAMPLES=U.blurSamples,g.needsUpdate=!0,S.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new as(o.x,o.y)),g.uniforms.shadow_pass.value=U.map.texture,g.uniforms.resolution.value=U.mapSize,g.uniforms.radius.value=U.radius,s.setRenderTarget(U.mapPass),s.clear(),s.renderBufferDirect(k,null,j,g,T,null),S.uniforms.shadow_pass.value=U.mapPass.texture,S.uniforms.resolution.value=U.mapSize,S.uniforms.radius.value=U.radius,s.setRenderTarget(U.map),s.clear(),s.renderBufferDirect(k,null,j,S,T,null)}function P(U,k,j,b){let R=null;const I=j.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(I!==void 0)R=I;else if(R=j.isPointLight===!0?h:f,s.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0||k.alphaToCoverage===!0){const ie=R.uuid,te=k.uuid;let se=p[ie];se===void 0&&(se={},p[ie]=se);let de=se[te];de===void 0&&(de=R.clone(),se[te]=de,k.addEventListener("dispose",N)),R=de}if(R.visible=k.visible,R.wireframe=k.wireframe,b===qi?R.side=k.shadowSide!==null?k.shadowSide:k.side:R.side=k.shadowSide!==null?k.shadowSide:_[k.side],R.alphaMap=k.alphaMap,R.alphaTest=k.alphaToCoverage===!0?.5:k.alphaTest,R.map=k.map,R.clipShadows=k.clipShadows,R.clippingPlanes=k.clippingPlanes,R.clipIntersection=k.clipIntersection,R.displacementMap=k.displacementMap,R.displacementScale=k.displacementScale,R.displacementBias=k.displacementBias,R.wireframeLinewidth=k.wireframeLinewidth,R.linewidth=k.linewidth,j.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const ie=s.properties.get(R);ie.light=j}return R}function C(U,k,j,b,R){if(U.visible===!1)return;if(U.layers.test(k.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&R===qi)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,U.matrixWorld);const te=e.update(U),se=U.material;if(Array.isArray(se)){const de=te.groups;for(let ae=0,fe=de.length;ae<fe;ae++){const V=de[ae],ce=se[V.materialIndex];if(ce&&ce.visible){const oe=P(U,ce,b,R);U.onBeforeShadow(s,U,k,j,te,oe,V),s.renderBufferDirect(j,null,te,oe,U,V),U.onAfterShadow(s,U,k,j,te,oe,V)}}}else if(se.visible){const de=P(U,se,b,R);U.onBeforeShadow(s,U,k,j,te,de,null),s.renderBufferDirect(j,null,te,de,U,null),U.onAfterShadow(s,U,k,j,te,de,null)}}const ie=U.children;for(let te=0,se=ie.length;te<se;te++)C(ie[te],k,j,b,R)}function N(U){U.target.removeEventListener("dispose",N);for(const j in p){const b=p[j],R=U.target.uuid;R in b&&(b[R].dispose(),delete b[R])}}}const y1={[Nf]:Ff,[Of]:zf,[kf]:Hf,[ro]:Bf,[Ff]:Nf,[zf]:Of,[Hf]:kf,[Bf]:ro};function S1(s,e){function t(){let G=!1;const Se=new Nt;let Ae=null;const Ie=new Nt(0,0,0,0);return{setMask:function(ye){Ae!==ye&&!G&&(s.colorMask(ye,ye,ye,ye),Ae=ye)},setLocked:function(ye){G=ye},setClear:function(ye,he,Ge,lt,bt){bt===!0&&(ye*=lt,he*=lt,Ge*=lt),Se.set(ye,he,Ge,lt),Ie.equals(Se)===!1&&(s.clearColor(ye,he,Ge,lt),Ie.copy(Se))},reset:function(){G=!1,Ae=null,Ie.set(-1,0,0,0)}}}function r(){let G=!1,Se=!1,Ae=null,Ie=null,ye=null;return{setReversed:function(he){if(Se!==he){const Ge=e.get("EXT_clip_control");he?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Se=he;const lt=ye;ye=null,this.setClear(lt)}},getReversed:function(){return Se},setTest:function(he){he?pe(s.DEPTH_TEST):Ce(s.DEPTH_TEST)},setMask:function(he){Ae!==he&&!G&&(s.depthMask(he),Ae=he)},setFunc:function(he){if(Se&&(he=y1[he]),Ie!==he){switch(he){case Nf:s.depthFunc(s.NEVER);break;case Ff:s.depthFunc(s.ALWAYS);break;case Of:s.depthFunc(s.LESS);break;case ro:s.depthFunc(s.LEQUAL);break;case kf:s.depthFunc(s.EQUAL);break;case Bf:s.depthFunc(s.GEQUAL);break;case zf:s.depthFunc(s.GREATER);break;case Hf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ie=he}},setLocked:function(he){G=he},setClear:function(he){ye!==he&&(Se&&(he=1-he),s.clearDepth(he),ye=he)},reset:function(){G=!1,Ae=null,Ie=null,ye=null,Se=!1}}}function o(){let G=!1,Se=null,Ae=null,Ie=null,ye=null,he=null,Ge=null,lt=null,bt=null;return{setTest:function(Mt){G||(Mt?pe(s.STENCIL_TEST):Ce(s.STENCIL_TEST))},setMask:function(Mt){Se!==Mt&&!G&&(s.stencilMask(Mt),Se=Mt)},setFunc:function(Mt,ei,mn){(Ae!==Mt||Ie!==ei||ye!==mn)&&(s.stencilFunc(Mt,ei,mn),Ae=Mt,Ie=ei,ye=mn)},setOp:function(Mt,ei,mn){(he!==Mt||Ge!==ei||lt!==mn)&&(s.stencilOp(Mt,ei,mn),he=Mt,Ge=ei,lt=mn)},setLocked:function(Mt){G=Mt},setClear:function(Mt){bt!==Mt&&(s.clearStencil(Mt),bt=Mt)},reset:function(){G=!1,Se=null,Ae=null,Ie=null,ye=null,he=null,Ge=null,lt=null,bt=null}}}const l=new t,u=new r,f=new o,h=new WeakMap,p=new WeakMap;let x={},_={},g=new WeakMap,S=[],E=null,T=!1,y=null,v=null,F=null,P=null,C=null,N=null,U=null,k=new yt(0,0,0),j=0,b=!1,R=null,I=null,ie=null,te=null,se=null;const de=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ae=!1,fe=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(fe=parseFloat(/^WebGL (\d)/.exec(V)[1]),ae=fe>=1):V.indexOf("OpenGL ES")!==-1&&(fe=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),ae=fe>=2);let ce=null,oe={};const O=s.getParameter(s.SCISSOR_BOX),re=s.getParameter(s.VIEWPORT),Be=new Nt().fromArray(O),ke=new Nt().fromArray(re);function Q(G,Se,Ae,Ie){const ye=new Uint8Array(4),he=s.createTexture();s.bindTexture(G,he),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ge=0;Ge<Ae;Ge++)G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY?s.texImage3D(Se,0,s.RGBA,1,1,Ie,0,s.RGBA,s.UNSIGNED_BYTE,ye):s.texImage2D(Se+Ge,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ye);return he}const me={};me[s.TEXTURE_2D]=Q(s.TEXTURE_2D,s.TEXTURE_2D,1),me[s.TEXTURE_CUBE_MAP]=Q(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[s.TEXTURE_2D_ARRAY]=Q(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),me[s.TEXTURE_3D]=Q(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),f.setClear(0),pe(s.DEPTH_TEST),u.setFunc(ro),St(!1),$e(Sm),pe(s.CULL_FACE),Ct(Ar);function pe(G){x[G]!==!0&&(s.enable(G),x[G]=!0)}function Ce(G){x[G]!==!1&&(s.disable(G),x[G]=!1)}function Le(G,Se){return _[G]!==Se?(s.bindFramebuffer(G,Se),_[G]=Se,G===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Se),G===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Se),!0):!1}function Ze(G,Se){let Ae=S,Ie=!1;if(G){Ae=g.get(Se),Ae===void 0&&(Ae=[],g.set(Se,Ae));const ye=G.textures;if(Ae.length!==ye.length||Ae[0]!==s.COLOR_ATTACHMENT0){for(let he=0,Ge=ye.length;he<Ge;he++)Ae[he]=s.COLOR_ATTACHMENT0+he;Ae.length=ye.length,Ie=!0}}else Ae[0]!==s.BACK&&(Ae[0]=s.BACK,Ie=!0);Ie&&s.drawBuffers(Ae)}function zt(G){return E!==G?(s.useProgram(G),E=G,!0):!1}const _t={[ts]:s.FUNC_ADD,[o_]:s.FUNC_SUBTRACT,[a_]:s.FUNC_REVERSE_SUBTRACT};_t[l_]=s.MIN,_t[c_]=s.MAX;const B={[u_]:s.ZERO,[f_]:s.ONE,[d_]:s.SRC_COLOR,[If]:s.SRC_ALPHA,[__]:s.SRC_ALPHA_SATURATE,[g_]:s.DST_COLOR,[p_]:s.DST_ALPHA,[h_]:s.ONE_MINUS_SRC_COLOR,[Uf]:s.ONE_MINUS_SRC_ALPHA,[v_]:s.ONE_MINUS_DST_COLOR,[m_]:s.ONE_MINUS_DST_ALPHA,[x_]:s.CONSTANT_COLOR,[y_]:s.ONE_MINUS_CONSTANT_COLOR,[S_]:s.CONSTANT_ALPHA,[M_]:s.ONE_MINUS_CONSTANT_ALPHA};function Ct(G,Se,Ae,Ie,ye,he,Ge,lt,bt,Mt){if(G===Ar){T===!0&&(Ce(s.BLEND),T=!1);return}if(T===!1&&(pe(s.BLEND),T=!0),G!==s_){if(G!==y||Mt!==b){if((v!==ts||C!==ts)&&(s.blendEquation(s.FUNC_ADD),v=ts,C=ts),Mt)switch(G){case to:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Mm:s.blendFunc(s.ONE,s.ONE);break;case Em:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Tm:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case to:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Mm:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Em:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tm:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}F=null,P=null,N=null,U=null,k.set(0,0,0),j=0,y=G,b=Mt}return}ye=ye||Se,he=he||Ae,Ge=Ge||Ie,(Se!==v||ye!==C)&&(s.blendEquationSeparate(_t[Se],_t[ye]),v=Se,C=ye),(Ae!==F||Ie!==P||he!==N||Ge!==U)&&(s.blendFuncSeparate(B[Ae],B[Ie],B[he],B[Ge]),F=Ae,P=Ie,N=he,U=Ge),(lt.equals(k)===!1||bt!==j)&&(s.blendColor(lt.r,lt.g,lt.b,bt),k.copy(lt),j=bt),y=G,b=!1}function Je(G,Se){G.side===Ci?Ce(s.CULL_FACE):pe(s.CULL_FACE);let Ae=G.side===Dn;Se&&(Ae=!Ae),St(Ae),G.blending===to&&G.transparent===!1?Ct(Ar):Ct(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),u.setFunc(G.depthFunc),u.setTest(G.depthTest),u.setMask(G.depthWrite),l.setMask(G.colorWrite);const Ie=G.stencilWrite;f.setTest(Ie),Ie&&(f.setMask(G.stencilWriteMask),f.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),f.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Fe(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):Ce(s.SAMPLE_ALPHA_TO_COVERAGE)}function St(G){R!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),R=G)}function $e(G){G!==i_?(pe(s.CULL_FACE),G!==I&&(G===Sm?s.cullFace(s.BACK):G===r_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ce(s.CULL_FACE),I=G}function Ot(G){G!==ie&&(ae&&s.lineWidth(G),ie=G)}function Fe(G,Se,Ae){G?(pe(s.POLYGON_OFFSET_FILL),(te!==Se||se!==Ae)&&(s.polygonOffset(Se,Ae),te=Se,se=Ae)):Ce(s.POLYGON_OFFSET_FILL)}function ct(G){G?pe(s.SCISSOR_TEST):Ce(s.SCISSOR_TEST)}function Vt(G){G===void 0&&(G=s.TEXTURE0+de-1),ce!==G&&(s.activeTexture(G),ce=G)}function Gt(G,Se,Ae){Ae===void 0&&(ce===null?Ae=s.TEXTURE0+de-1:Ae=ce);let Ie=oe[Ae];Ie===void 0&&(Ie={type:void 0,texture:void 0},oe[Ae]=Ie),(Ie.type!==G||Ie.texture!==Se)&&(ce!==Ae&&(s.activeTexture(Ae),ce=Ae),s.bindTexture(G,Se||me[G]),Ie.type=G,Ie.texture=Se)}function L(){const G=oe[ce];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function w(){try{s.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $(){try{s.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ue(){try{s.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function _e(){try{s.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function le(){try{s.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ye(){try{s.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function we(){try{s.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ze(){try{s.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function qe(){try{s.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ee(){try{s.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function De(G){Be.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),Be.copy(G))}function rt(G){ke.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),ke.copy(G))}function Xe(G,Se){let Ae=p.get(Se);Ae===void 0&&(Ae=new WeakMap,p.set(Se,Ae));let Ie=Ae.get(G);Ie===void 0&&(Ie=s.getUniformBlockIndex(Se,G.name),Ae.set(G,Ie))}function Re(G,Se){const Ie=p.get(Se).get(G);h.get(Se)!==Ie&&(s.uniformBlockBinding(Se,Ie,G.__bindingPointIndex),h.set(Se,Ie))}function ut(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),x={},ce=null,oe={},_={},g=new WeakMap,S=[],E=null,T=!1,y=null,v=null,F=null,P=null,C=null,N=null,U=null,k=new yt(0,0,0),j=0,b=!1,R=null,I=null,ie=null,te=null,se=null,Be.set(0,0,s.canvas.width,s.canvas.height),ke.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),f.reset()}return{buffers:{color:l,depth:u,stencil:f},enable:pe,disable:Ce,bindFramebuffer:Le,drawBuffers:Ze,useProgram:zt,setBlending:Ct,setMaterial:Je,setFlipSided:St,setCullFace:$e,setLineWidth:Ot,setPolygonOffset:Fe,setScissorTest:ct,activeTexture:Vt,bindTexture:Gt,unbindTexture:L,compressedTexImage2D:w,compressedTexImage3D:$,texImage2D:qe,texImage3D:Ee,updateUBOMapping:Xe,uniformBlockBinding:Re,texStorage2D:we,texStorage3D:ze,texSubImage2D:ue,texSubImage3D:_e,compressedTexSubImage2D:le,compressedTexSubImage3D:Ye,scissor:De,viewport:rt,reset:ut}}function M1(s,e,t,r,o,l,u){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ft,x=new WeakMap;let _;const g=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,w){return S?new OffscreenCanvas(L,w):lc("canvas")}function T(L,w,$){let ue=1;const _e=Gt(L);if((_e.width>$||_e.height>$)&&(ue=$/Math.max(_e.width,_e.height)),ue<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const le=Math.floor(ue*_e.width),Ye=Math.floor(ue*_e.height);_===void 0&&(_=E(le,Ye));const we=w?E(le,Ye):_;return we.width=le,we.height=Ye,we.getContext("2d").drawImage(L,0,0,le,Ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+le+"x"+Ye+")."),we}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),L;return L}function y(L){return L.generateMipmaps}function v(L){s.generateMipmap(L)}function F(L){return L.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?s.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function P(L,w,$,ue,_e=!1){if(L!==null){if(s[L]!==void 0)return s[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let le=w;if(w===s.RED&&($===s.FLOAT&&(le=s.R32F),$===s.HALF_FLOAT&&(le=s.R16F),$===s.UNSIGNED_BYTE&&(le=s.R8)),w===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.R8UI),$===s.UNSIGNED_SHORT&&(le=s.R16UI),$===s.UNSIGNED_INT&&(le=s.R32UI),$===s.BYTE&&(le=s.R8I),$===s.SHORT&&(le=s.R16I),$===s.INT&&(le=s.R32I)),w===s.RG&&($===s.FLOAT&&(le=s.RG32F),$===s.HALF_FLOAT&&(le=s.RG16F),$===s.UNSIGNED_BYTE&&(le=s.RG8)),w===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.RG8UI),$===s.UNSIGNED_SHORT&&(le=s.RG16UI),$===s.UNSIGNED_INT&&(le=s.RG32UI),$===s.BYTE&&(le=s.RG8I),$===s.SHORT&&(le=s.RG16I),$===s.INT&&(le=s.RG32I)),w===s.RGB_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.RGB8UI),$===s.UNSIGNED_SHORT&&(le=s.RGB16UI),$===s.UNSIGNED_INT&&(le=s.RGB32UI),$===s.BYTE&&(le=s.RGB8I),$===s.SHORT&&(le=s.RGB16I),$===s.INT&&(le=s.RGB32I)),w===s.RGBA_INTEGER&&($===s.UNSIGNED_BYTE&&(le=s.RGBA8UI),$===s.UNSIGNED_SHORT&&(le=s.RGBA16UI),$===s.UNSIGNED_INT&&(le=s.RGBA32UI),$===s.BYTE&&(le=s.RGBA8I),$===s.SHORT&&(le=s.RGBA16I),$===s.INT&&(le=s.RGBA32I)),w===s.RGB&&$===s.UNSIGNED_INT_5_9_9_9_REV&&(le=s.RGB9_E5),w===s.RGBA){const Ye=_e?oc:At.getTransfer(ue);$===s.FLOAT&&(le=s.RGBA32F),$===s.HALF_FLOAT&&(le=s.RGBA16F),$===s.UNSIGNED_BYTE&&(le=Ye===Ut?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(le=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(le=s.RGB5_A1)}return(le===s.R16F||le===s.R32F||le===s.RG16F||le===s.RG32F||le===s.RGBA16F||le===s.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function C(L,w){let $;return L?w===null||w===os||w===la?$=s.DEPTH24_STENCIL8:w===bi?$=s.DEPTH32F_STENCIL8:w===aa&&($=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===os||w===la?$=s.DEPTH_COMPONENT24:w===bi?$=s.DEPTH_COMPONENT32F:w===aa&&($=s.DEPTH_COMPONENT16),$}function N(L,w){return y(L)===!0||L.isFramebufferTexture&&L.minFilter!==Jn&&L.minFilter!==Ri?Math.log2(Math.max(w.width,w.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?w.mipmaps.length:1}function U(L){const w=L.target;w.removeEventListener("dispose",U),j(w),w.isVideoTexture&&x.delete(w)}function k(L){const w=L.target;w.removeEventListener("dispose",k),R(w)}function j(L){const w=r.get(L);if(w.__webglInit===void 0)return;const $=L.source,ue=g.get($);if(ue){const _e=ue[w.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&b(L),Object.keys(ue).length===0&&g.delete($)}r.remove(L)}function b(L){const w=r.get(L);s.deleteTexture(w.__webglTexture);const $=L.source,ue=g.get($);delete ue[w.__cacheKey],u.memory.textures--}function R(L){const w=r.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),r.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ue=0;ue<6;ue++){if(Array.isArray(w.__webglFramebuffer[ue]))for(let _e=0;_e<w.__webglFramebuffer[ue].length;_e++)s.deleteFramebuffer(w.__webglFramebuffer[ue][_e]);else s.deleteFramebuffer(w.__webglFramebuffer[ue]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[ue])}else{if(Array.isArray(w.__webglFramebuffer))for(let ue=0;ue<w.__webglFramebuffer.length;ue++)s.deleteFramebuffer(w.__webglFramebuffer[ue]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ue=0;ue<w.__webglColorRenderbuffer.length;ue++)w.__webglColorRenderbuffer[ue]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[ue]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const $=L.textures;for(let ue=0,_e=$.length;ue<_e;ue++){const le=r.get($[ue]);le.__webglTexture&&(s.deleteTexture(le.__webglTexture),u.memory.textures--),r.remove($[ue])}r.remove(L)}let I=0;function ie(){I=0}function te(){const L=I;return L>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+o.maxTextures),I+=1,L}function se(L){const w=[];return w.push(L.wrapS),w.push(L.wrapT),w.push(L.wrapR||0),w.push(L.magFilter),w.push(L.minFilter),w.push(L.anisotropy),w.push(L.internalFormat),w.push(L.format),w.push(L.type),w.push(L.generateMipmaps),w.push(L.premultiplyAlpha),w.push(L.flipY),w.push(L.unpackAlignment),w.push(L.colorSpace),w.join()}function de(L,w){const $=r.get(L);if(L.isVideoTexture&&ct(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&$.__version!==L.version){const ue=L.image;if(ue===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ue.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me($,L,w);return}}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+w)}function ae(L,w){const $=r.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){me($,L,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+w)}function fe(L,w){const $=r.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){me($,L,w);return}t.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+w)}function V(L,w){const $=r.get(L);if(L.version>0&&$.__version!==L.version){pe($,L,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+w)}const ce={[Wf]:s.REPEAT,[is]:s.CLAMP_TO_EDGE,[Xf]:s.MIRRORED_REPEAT},oe={[Jn]:s.NEAREST,[L_]:s.NEAREST_MIPMAP_NEAREST,[El]:s.NEAREST_MIPMAP_LINEAR,[Ri]:s.LINEAR,[Ku]:s.LINEAR_MIPMAP_NEAREST,[rs]:s.LINEAR_MIPMAP_LINEAR},O={[N_]:s.NEVER,[H_]:s.ALWAYS,[F_]:s.LESS,[Xg]:s.LEQUAL,[O_]:s.EQUAL,[z_]:s.GEQUAL,[k_]:s.GREATER,[B_]:s.NOTEQUAL};function re(L,w){if(w.type===bi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Ri||w.magFilter===Ku||w.magFilter===El||w.magFilter===rs||w.minFilter===Ri||w.minFilter===Ku||w.minFilter===El||w.minFilter===rs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(L,s.TEXTURE_WRAP_S,ce[w.wrapS]),s.texParameteri(L,s.TEXTURE_WRAP_T,ce[w.wrapT]),(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)&&s.texParameteri(L,s.TEXTURE_WRAP_R,ce[w.wrapR]),s.texParameteri(L,s.TEXTURE_MAG_FILTER,oe[w.magFilter]),s.texParameteri(L,s.TEXTURE_MIN_FILTER,oe[w.minFilter]),w.compareFunction&&(s.texParameteri(L,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(L,s.TEXTURE_COMPARE_FUNC,O[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Jn||w.minFilter!==El&&w.minFilter!==rs||w.type===bi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||r.get(w).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");s.texParameterf(L,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,o.getMaxAnisotropy())),r.get(w).__currentAnisotropy=w.anisotropy}}}function Be(L,w){let $=!1;L.__webglInit===void 0&&(L.__webglInit=!0,w.addEventListener("dispose",U));const ue=w.source;let _e=g.get(ue);_e===void 0&&(_e={},g.set(ue,_e));const le=se(w);if(le!==L.__cacheKey){_e[le]===void 0&&(_e[le]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,$=!0),_e[le].usedTimes++;const Ye=_e[L.__cacheKey];Ye!==void 0&&(_e[L.__cacheKey].usedTimes--,Ye.usedTimes===0&&b(w)),L.__cacheKey=le,L.__webglTexture=_e[le].texture}return $}function ke(L,w,$){return Math.floor(Math.floor(L/$)/w)}function Q(L,w,$,ue){const le=L.updateRanges;if(le.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,$,ue,w.data);else{le.sort((Ee,De)=>Ee.start-De.start);let Ye=0;for(let Ee=1;Ee<le.length;Ee++){const De=le[Ye],rt=le[Ee],Xe=De.start+De.count,Re=ke(rt.start,w.width,4),ut=ke(De.start,w.width,4);rt.start<=Xe+1&&Re===ut&&ke(rt.start+rt.count-1,w.width,4)===Re?De.count=Math.max(De.count,rt.start+rt.count-De.start):(++Ye,le[Ye]=rt)}le.length=Ye+1;const we=s.getParameter(s.UNPACK_ROW_LENGTH),ze=s.getParameter(s.UNPACK_SKIP_PIXELS),qe=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let Ee=0,De=le.length;Ee<De;Ee++){const rt=le[Ee],Xe=Math.floor(rt.start/4),Re=Math.ceil(rt.count/4),ut=Xe%w.width,G=Math.floor(Xe/w.width),Se=Re,Ae=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ut),s.pixelStorei(s.UNPACK_SKIP_ROWS,G),t.texSubImage2D(s.TEXTURE_2D,0,ut,G,Se,Ae,$,ue,w.data)}L.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,we),s.pixelStorei(s.UNPACK_SKIP_PIXELS,ze),s.pixelStorei(s.UNPACK_SKIP_ROWS,qe)}}function me(L,w,$){let ue=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ue=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ue=s.TEXTURE_3D);const _e=Be(L,w),le=w.source;t.bindTexture(ue,L.__webglTexture,s.TEXTURE0+$);const Ye=r.get(le);if(le.version!==Ye.__version||_e===!0){t.activeTexture(s.TEXTURE0+$);const we=At.getPrimaries(At.workingColorSpace),ze=w.colorSpace===wr?null:At.getPrimaries(w.colorSpace),qe=w.colorSpace===wr||we===ze?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let Ee=T(w.image,!1,o.maxTextureSize);Ee=Vt(w,Ee);const De=l.convert(w.format,w.colorSpace),rt=l.convert(w.type);let Xe=P(w.internalFormat,De,rt,w.colorSpace,w.isVideoTexture);re(ue,w);let Re;const ut=w.mipmaps,G=w.isVideoTexture!==!0,Se=Ye.__version===void 0||_e===!0,Ae=le.dataReady,Ie=N(w,Ee);if(w.isDepthTexture)Xe=C(w.format===ua,w.type),Se&&(G?t.texStorage2D(s.TEXTURE_2D,1,Xe,Ee.width,Ee.height):t.texImage2D(s.TEXTURE_2D,0,Xe,Ee.width,Ee.height,0,De,rt,null));else if(w.isDataTexture)if(ut.length>0){G&&Se&&t.texStorage2D(s.TEXTURE_2D,Ie,Xe,ut[0].width,ut[0].height);for(let ye=0,he=ut.length;ye<he;ye++)Re=ut[ye],G?Ae&&t.texSubImage2D(s.TEXTURE_2D,ye,0,0,Re.width,Re.height,De,rt,Re.data):t.texImage2D(s.TEXTURE_2D,ye,Xe,Re.width,Re.height,0,De,rt,Re.data);w.generateMipmaps=!1}else G?(Se&&t.texStorage2D(s.TEXTURE_2D,Ie,Xe,Ee.width,Ee.height),Ae&&Q(w,Ee,De,rt)):t.texImage2D(s.TEXTURE_2D,0,Xe,Ee.width,Ee.height,0,De,rt,Ee.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){G&&Se&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ie,Xe,ut[0].width,ut[0].height,Ee.depth);for(let ye=0,he=ut.length;ye<he;ye++)if(Re=ut[ye],w.format!==Si)if(De!==null)if(G){if(Ae)if(w.layerUpdates.size>0){const Ge=rg(Re.width,Re.height,w.format,w.type);for(const lt of w.layerUpdates){const bt=Re.data.subarray(lt*Ge/Re.data.BYTES_PER_ELEMENT,(lt+1)*Ge/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ye,0,0,lt,Re.width,Re.height,1,De,bt)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ye,0,0,0,Re.width,Re.height,Ee.depth,De,Re.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ye,Xe,Re.width,Re.height,Ee.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else G?Ae&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ye,0,0,0,Re.width,Re.height,Ee.depth,De,rt,Re.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ye,Xe,Re.width,Re.height,Ee.depth,0,De,rt,Re.data)}else{G&&Se&&t.texStorage2D(s.TEXTURE_2D,Ie,Xe,ut[0].width,ut[0].height);for(let ye=0,he=ut.length;ye<he;ye++)Re=ut[ye],w.format!==Si?De!==null?G?Ae&&t.compressedTexSubImage2D(s.TEXTURE_2D,ye,0,0,Re.width,Re.height,De,Re.data):t.compressedTexImage2D(s.TEXTURE_2D,ye,Xe,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):G?Ae&&t.texSubImage2D(s.TEXTURE_2D,ye,0,0,Re.width,Re.height,De,rt,Re.data):t.texImage2D(s.TEXTURE_2D,ye,Xe,Re.width,Re.height,0,De,rt,Re.data)}else if(w.isDataArrayTexture)if(G){if(Se&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ie,Xe,Ee.width,Ee.height,Ee.depth),Ae)if(w.layerUpdates.size>0){const ye=rg(Ee.width,Ee.height,w.format,w.type);for(const he of w.layerUpdates){const Ge=Ee.data.subarray(he*ye/Ee.data.BYTES_PER_ELEMENT,(he+1)*ye/Ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,Ee.width,Ee.height,1,De,rt,Ge)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,De,rt,Ee.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Xe,Ee.width,Ee.height,Ee.depth,0,De,rt,Ee.data);else if(w.isData3DTexture)G?(Se&&t.texStorage3D(s.TEXTURE_3D,Ie,Xe,Ee.width,Ee.height,Ee.depth),Ae&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,De,rt,Ee.data)):t.texImage3D(s.TEXTURE_3D,0,Xe,Ee.width,Ee.height,Ee.depth,0,De,rt,Ee.data);else if(w.isFramebufferTexture){if(Se)if(G)t.texStorage2D(s.TEXTURE_2D,Ie,Xe,Ee.width,Ee.height);else{let ye=Ee.width,he=Ee.height;for(let Ge=0;Ge<Ie;Ge++)t.texImage2D(s.TEXTURE_2D,Ge,Xe,ye,he,0,De,rt,null),ye>>=1,he>>=1}}else if(ut.length>0){if(G&&Se){const ye=Gt(ut[0]);t.texStorage2D(s.TEXTURE_2D,Ie,Xe,ye.width,ye.height)}for(let ye=0,he=ut.length;ye<he;ye++)Re=ut[ye],G?Ae&&t.texSubImage2D(s.TEXTURE_2D,ye,0,0,De,rt,Re):t.texImage2D(s.TEXTURE_2D,ye,Xe,De,rt,Re);w.generateMipmaps=!1}else if(G){if(Se){const ye=Gt(Ee);t.texStorage2D(s.TEXTURE_2D,Ie,Xe,ye.width,ye.height)}Ae&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,De,rt,Ee)}else t.texImage2D(s.TEXTURE_2D,0,Xe,De,rt,Ee);y(w)&&v(ue),Ye.__version=le.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function pe(L,w,$){if(w.image.length!==6)return;const ue=Be(L,w),_e=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,L.__webglTexture,s.TEXTURE0+$);const le=r.get(_e);if(_e.version!==le.__version||ue===!0){t.activeTexture(s.TEXTURE0+$);const Ye=At.getPrimaries(At.workingColorSpace),we=w.colorSpace===wr?null:At.getPrimaries(w.colorSpace),ze=w.colorSpace===wr||Ye===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);const qe=w.isCompressedTexture||w.image[0].isCompressedTexture,Ee=w.image[0]&&w.image[0].isDataTexture,De=[];for(let he=0;he<6;he++)!qe&&!Ee?De[he]=T(w.image[he],!0,o.maxCubemapSize):De[he]=Ee?w.image[he].image:w.image[he],De[he]=Vt(w,De[he]);const rt=De[0],Xe=l.convert(w.format,w.colorSpace),Re=l.convert(w.type),ut=P(w.internalFormat,Xe,Re,w.colorSpace),G=w.isVideoTexture!==!0,Se=le.__version===void 0||ue===!0,Ae=_e.dataReady;let Ie=N(w,rt);re(s.TEXTURE_CUBE_MAP,w);let ye;if(qe){G&&Se&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ie,ut,rt.width,rt.height);for(let he=0;he<6;he++){ye=De[he].mipmaps;for(let Ge=0;Ge<ye.length;Ge++){const lt=ye[Ge];w.format!==Si?Xe!==null?G?Ae&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge,0,0,lt.width,lt.height,Xe,lt.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge,ut,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?Ae&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge,0,0,lt.width,lt.height,Xe,Re,lt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge,ut,lt.width,lt.height,0,Xe,Re,lt.data)}}}else{if(ye=w.mipmaps,G&&Se){ye.length>0&&Ie++;const he=Gt(De[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ie,ut,he.width,he.height)}for(let he=0;he<6;he++)if(Ee){G?Ae&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,De[he].width,De[he].height,Xe,Re,De[he].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ut,De[he].width,De[he].height,0,Xe,Re,De[he].data);for(let Ge=0;Ge<ye.length;Ge++){const bt=ye[Ge].image[he].image;G?Ae&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge+1,0,0,bt.width,bt.height,Xe,Re,bt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge+1,ut,bt.width,bt.height,0,Xe,Re,bt.data)}}else{G?Ae&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Xe,Re,De[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,ut,Xe,Re,De[he]);for(let Ge=0;Ge<ye.length;Ge++){const lt=ye[Ge];G?Ae&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge+1,0,0,Xe,Re,lt.image[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge+1,ut,Xe,Re,lt.image[he])}}}y(w)&&v(s.TEXTURE_CUBE_MAP),le.__version=_e.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function Ce(L,w,$,ue,_e,le){const Ye=l.convert($.format,$.colorSpace),we=l.convert($.type),ze=P($.internalFormat,Ye,we,$.colorSpace),qe=r.get(w),Ee=r.get($);if(Ee.__renderTarget=w,!qe.__hasExternalTextures){const De=Math.max(1,w.width>>le),rt=Math.max(1,w.height>>le);_e===s.TEXTURE_3D||_e===s.TEXTURE_2D_ARRAY?t.texImage3D(_e,le,ze,De,rt,w.depth,0,Ye,we,null):t.texImage2D(_e,le,ze,De,rt,0,Ye,we,null)}t.bindFramebuffer(s.FRAMEBUFFER,L),Fe(w)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ue,_e,Ee.__webglTexture,0,Ot(w)):(_e===s.TEXTURE_2D||_e>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ue,_e,Ee.__webglTexture,le),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(L,w,$){if(s.bindRenderbuffer(s.RENDERBUFFER,L),w.depthBuffer){const ue=w.depthTexture,_e=ue&&ue.isDepthTexture?ue.type:null,le=C(w.stencilBuffer,_e),Ye=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=Ot(w);Fe(w)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,we,le,w.width,w.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,we,le,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,le,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ye,s.RENDERBUFFER,L)}else{const ue=w.textures;for(let _e=0;_e<ue.length;_e++){const le=ue[_e],Ye=l.convert(le.format,le.colorSpace),we=l.convert(le.type),ze=P(le.internalFormat,Ye,we,le.colorSpace),qe=Ot(w);$&&Fe(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,qe,ze,w.width,w.height):Fe(w)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qe,ze,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ze,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ze(L,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,L),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ue=r.get(w.depthTexture);ue.__renderTarget=w,(!ue.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),de(w.depthTexture,0);const _e=ue.__webglTexture,le=Ot(w);if(w.depthTexture.format===ca)Fe(w)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,_e,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,_e,0);else if(w.depthTexture.format===ua)Fe(w)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,_e,0,le):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function zt(L){const w=r.get(L),$=L.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==L.depthTexture){const ue=L.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ue){const _e=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ue.removeEventListener("dispose",_e)};ue.addEventListener("dispose",_e),w.__depthDisposeCallback=_e}w.__boundDepthTexture=ue}if(L.depthTexture&&!w.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");const ue=L.texture.mipmaps;ue&&ue.length>0?Ze(w.__webglFramebuffer[0],L):Ze(w.__webglFramebuffer,L)}else if($){w.__webglDepthbuffer=[];for(let ue=0;ue<6;ue++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[ue]),w.__webglDepthbuffer[ue]===void 0)w.__webglDepthbuffer[ue]=s.createRenderbuffer(),Le(w.__webglDepthbuffer[ue],L,!1);else{const _e=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=w.__webglDepthbuffer[ue];s.bindRenderbuffer(s.RENDERBUFFER,le),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,le)}}else{const ue=L.texture.mipmaps;if(ue&&ue.length>0?t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Le(w.__webglDepthbuffer,L,!1);else{const _e=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,le),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,le)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function _t(L,w,$){const ue=r.get(L);w!==void 0&&Ce(ue.__webglFramebuffer,L,L.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&zt(L)}function B(L){const w=L.texture,$=r.get(L),ue=r.get(w);L.addEventListener("dispose",k);const _e=L.textures,le=L.isWebGLCubeRenderTarget===!0,Ye=_e.length>1;if(Ye||(ue.__webglTexture===void 0&&(ue.__webglTexture=s.createTexture()),ue.__version=w.version,u.memory.textures++),le){$.__webglFramebuffer=[];for(let we=0;we<6;we++)if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer[we]=[];for(let ze=0;ze<w.mipmaps.length;ze++)$.__webglFramebuffer[we][ze]=s.createFramebuffer()}else $.__webglFramebuffer[we]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer=[];for(let we=0;we<w.mipmaps.length;we++)$.__webglFramebuffer[we]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(Ye)for(let we=0,ze=_e.length;we<ze;we++){const qe=r.get(_e[we]);qe.__webglTexture===void 0&&(qe.__webglTexture=s.createTexture(),u.memory.textures++)}if(L.samples>0&&Fe(L)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let we=0;we<_e.length;we++){const ze=_e[we];$.__webglColorRenderbuffer[we]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[we]);const qe=l.convert(ze.format,ze.colorSpace),Ee=l.convert(ze.type),De=P(ze.internalFormat,qe,Ee,ze.colorSpace,L.isXRRenderTarget===!0),rt=Ot(L);s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,De,L.width,L.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+we,s.RENDERBUFFER,$.__webglColorRenderbuffer[we])}s.bindRenderbuffer(s.RENDERBUFFER,null),L.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),Le($.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(le){t.bindTexture(s.TEXTURE_CUBE_MAP,ue.__webglTexture),re(s.TEXTURE_CUBE_MAP,w);for(let we=0;we<6;we++)if(w.mipmaps&&w.mipmaps.length>0)for(let ze=0;ze<w.mipmaps.length;ze++)Ce($.__webglFramebuffer[we][ze],L,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,ze);else Ce($.__webglFramebuffer[we],L,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);y(w)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ye){for(let we=0,ze=_e.length;we<ze;we++){const qe=_e[we],Ee=r.get(qe);let De=s.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(De=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(De,Ee.__webglTexture),re(De,qe),Ce($.__webglFramebuffer,L,qe,s.COLOR_ATTACHMENT0+we,De,0),y(qe)&&v(De)}t.unbindTexture()}else{let we=s.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(we=L.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(we,ue.__webglTexture),re(we,w),w.mipmaps&&w.mipmaps.length>0)for(let ze=0;ze<w.mipmaps.length;ze++)Ce($.__webglFramebuffer[ze],L,w,s.COLOR_ATTACHMENT0,we,ze);else Ce($.__webglFramebuffer,L,w,s.COLOR_ATTACHMENT0,we,0);y(w)&&v(we),t.unbindTexture()}L.depthBuffer&&zt(L)}function Ct(L){const w=L.textures;for(let $=0,ue=w.length;$<ue;$++){const _e=w[$];if(y(_e)){const le=F(L),Ye=r.get(_e).__webglTexture;t.bindTexture(le,Ye),v(le),t.unbindTexture()}}}const Je=[],St=[];function $e(L){if(L.samples>0){if(Fe(L)===!1){const w=L.textures,$=L.width,ue=L.height;let _e=s.COLOR_BUFFER_BIT;const le=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ye=r.get(L),we=w.length>1;if(we)for(let qe=0;qe<w.length;qe++)t.bindFramebuffer(s.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ye.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer);const ze=L.texture.mipmaps;ze&&ze.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer);for(let qe=0;qe<w.length;qe++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(_e|=s.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(_e|=s.STENCIL_BUFFER_BIT)),we){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ye.__webglColorRenderbuffer[qe]);const Ee=r.get(w[qe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ee,0)}s.blitFramebuffer(0,0,$,ue,0,0,$,ue,_e,s.NEAREST),h===!0&&(Je.length=0,St.length=0,Je.push(s.COLOR_ATTACHMENT0+qe),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Je.push(le),St.push(le),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,St)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Je))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),we)for(let qe=0;qe<w.length;qe++){t.bindFramebuffer(s.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.RENDERBUFFER,Ye.__webglColorRenderbuffer[qe]);const Ee=r.get(w[qe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ye.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+qe,s.TEXTURE_2D,Ee,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&h){const w=L.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Ot(L){return Math.min(o.maxSamples,L.samples)}function Fe(L){const w=r.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ct(L){const w=u.render.frame;x.get(L)!==w&&(x.set(L,w),L.update())}function Vt(L,w){const $=L.colorSpace,ue=L.format,_e=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||$!==ao&&$!==wr&&(At.getTransfer($)===Ut?(ue!==Si||_e!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),w}function Gt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(p.width=L.naturalWidth||L.width,p.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(p.width=L.displayWidth,p.height=L.displayHeight):(p.width=L.width,p.height=L.height),p}this.allocateTextureUnit=te,this.resetTextureUnits=ie,this.setTexture2D=de,this.setTexture2DArray=ae,this.setTexture3D=fe,this.setTextureCube=V,this.rebindTextures=_t,this.setupRenderTarget=B,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Fe}function E1(s,e){function t(r,o=wr){let l;const u=At.getTransfer(o);if(r===Li)return s.UNSIGNED_BYTE;if(r===Td)return s.UNSIGNED_SHORT_4_4_4_4;if(r===wd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Bg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Og)return s.BYTE;if(r===kg)return s.SHORT;if(r===aa)return s.UNSIGNED_SHORT;if(r===Ed)return s.INT;if(r===os)return s.UNSIGNED_INT;if(r===bi)return s.FLOAT;if(r===ha)return s.HALF_FLOAT;if(r===zg)return s.ALPHA;if(r===Hg)return s.RGB;if(r===Si)return s.RGBA;if(r===ca)return s.DEPTH_COMPONENT;if(r===ua)return s.DEPTH_STENCIL;if(r===Ad)return s.RED;if(r===Cd)return s.RED_INTEGER;if(r===Vg)return s.RG;if(r===Rd)return s.RG_INTEGER;if(r===bd)return s.RGBA_INTEGER;if(r===Jl||r===ec||r===tc||r===nc)if(u===Ut)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Jl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ec)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===tc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===nc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Jl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ec)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===tc)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===nc)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===jf||r===Yf||r===qf||r===$f)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===jf)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Yf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===qf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===$f)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Kf||r===Zf||r===Qf)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Kf||r===Zf)return u===Ut?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Qf)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Jf||r===ed||r===td||r===nd||r===id||r===rd||r===sd||r===od||r===ad||r===ld||r===cd||r===ud||r===fd||r===dd)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Jf)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ed)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===td)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===nd)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===id)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===rd)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===sd)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===od)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ad)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ld)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===cd)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ud)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===fd)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===dd)return u===Ut?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ic||r===hd||r===pd)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===ic)return u===Ut?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===hd)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===pd)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Gg||r===md||r===gd||r===vd)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===ic)return l.COMPRESSED_RED_RGTC1_EXT;if(r===md)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===gd)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===vd)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===la?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}class f0 extends Tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const T1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w1=`
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

}`;class A1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const r=new f0(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new br({vertexShader:T1,fragmentShader:w1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new ma(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C1 extends uo{constructor(e,t){super();const r=this;let o=null,l=1,u=null,f="local-floor",h=1,p=null,x=null,_=null,g=null,S=null,E=null;const T=new A1,y={},v=t.getContextAttributes();let F=null,P=null;const C=[],N=[],U=new ft;let k=null;const j=new Qn;j.viewport=new Nt;const b=new Qn;b.viewport=new Nt;const R=[j,b],I=new Yx;let ie=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let me=C[Q];return me===void 0&&(me=new _f,C[Q]=me),me.getTargetRaySpace()},this.getControllerGrip=function(Q){let me=C[Q];return me===void 0&&(me=new _f,C[Q]=me),me.getGripSpace()},this.getHand=function(Q){let me=C[Q];return me===void 0&&(me=new _f,C[Q]=me),me.getHandSpace()};function se(Q){const me=N.indexOf(Q.inputSource);if(me===-1)return;const pe=C[me];pe!==void 0&&(pe.update(Q.inputSource,Q.frame,p||u),pe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function de(){o.removeEventListener("select",se),o.removeEventListener("selectstart",se),o.removeEventListener("selectend",se),o.removeEventListener("squeeze",se),o.removeEventListener("squeezestart",se),o.removeEventListener("squeezeend",se),o.removeEventListener("end",de),o.removeEventListener("inputsourceschange",ae);for(let Q=0;Q<C.length;Q++){const me=N[Q];me!==null&&(N[Q]=null,C[Q].disconnect(me))}ie=null,te=null,T.reset();for(const Q in y)delete y[Q];e.setRenderTarget(F),S=null,g=null,_=null,o=null,P=null,ke.stop(),r.isPresenting=!1,e.setPixelRatio(k),e.setSize(U.width,U.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){l=Q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){f=Q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(Q){p=Q},this.getBaseLayer=function(){return g!==null?g:S},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(Q){if(o=Q,o!==null){if(F=e.getRenderTarget(),o.addEventListener("select",se),o.addEventListener("selectstart",se),o.addEventListener("selectend",se),o.addEventListener("squeeze",se),o.addEventListener("squeezestart",se),o.addEventListener("squeezeend",se),o.addEventListener("end",de),o.addEventListener("inputsourceschange",ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(U),typeof XRWebGLBinding<"u"&&(_=new XRWebGLBinding(o,t)),_!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ce=null,Le=null;v.depth&&(Le=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=v.stencil?ua:ca,Ce=v.stencil?la:os);const Ze={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:l};g=_.createProjectionLayer(Ze),o.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),P=new as(g.textureWidth,g.textureHeight,{format:Si,type:Li,depthTexture:new i0(g.textureWidth,g.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const pe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,pe),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),P=new as(S.framebufferWidth,S.framebufferHeight,{format:Si,type:Li,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(h),p=null,u=await o.requestReferenceSpace(f),ke.setContext(o),ke.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function ae(Q){for(let me=0;me<Q.removed.length;me++){const pe=Q.removed[me],Ce=N.indexOf(pe);Ce>=0&&(N[Ce]=null,C[Ce].disconnect(pe))}for(let me=0;me<Q.added.length;me++){const pe=Q.added[me];let Ce=N.indexOf(pe);if(Ce===-1){for(let Ze=0;Ze<C.length;Ze++)if(Ze>=N.length){N.push(pe),Ce=Ze;break}else if(N[Ze]===null){N[Ze]=pe,Ce=Ze;break}if(Ce===-1)break}const Le=C[Ce];Le&&Le.connect(pe)}}const fe=new H,V=new H;function ce(Q,me,pe){fe.setFromMatrixPosition(me.matrixWorld),V.setFromMatrixPosition(pe.matrixWorld);const Ce=fe.distanceTo(V),Le=me.projectionMatrix.elements,Ze=pe.projectionMatrix.elements,zt=Le[14]/(Le[10]-1),_t=Le[14]/(Le[10]+1),B=(Le[9]+1)/Le[5],Ct=(Le[9]-1)/Le[5],Je=(Le[8]-1)/Le[0],St=(Ze[8]+1)/Ze[0],$e=zt*Je,Ot=zt*St,Fe=Ce/(-Je+St),ct=Fe*-Je;if(me.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(ct),Q.translateZ(Fe),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Le[10]===-1)Q.projectionMatrix.copy(me.projectionMatrix),Q.projectionMatrixInverse.copy(me.projectionMatrixInverse);else{const Vt=zt+Fe,Gt=_t+Fe,L=$e-ct,w=Ot+(Ce-ct),$=B*_t/Gt*Vt,ue=Ct*_t/Gt*Vt;Q.projectionMatrix.makePerspective(L,w,$,ue,Vt,Gt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function oe(Q,me){me===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(me.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(o===null)return;let me=Q.near,pe=Q.far;T.texture!==null&&(T.depthNear>0&&(me=T.depthNear),T.depthFar>0&&(pe=T.depthFar)),I.near=b.near=j.near=me,I.far=b.far=j.far=pe,(ie!==I.near||te!==I.far)&&(o.updateRenderState({depthNear:I.near,depthFar:I.far}),ie=I.near,te=I.far),I.layers.mask=Q.layers.mask|6,j.layers.mask=I.layers.mask&3,b.layers.mask=I.layers.mask&5;const Ce=Q.parent,Le=I.cameras;oe(I,Ce);for(let Ze=0;Ze<Le.length;Ze++)oe(Le[Ze],Ce);Le.length===2?ce(I,j,b):I.projectionMatrix.copy(j.projectionMatrix),O(Q,I,Ce)};function O(Q,me,pe){pe===null?Q.matrix.copy(me.matrixWorld):(Q.matrix.copy(pe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(me.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(me.projectionMatrix),Q.projectionMatrixInverse.copy(me.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=fa*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(g===null&&S===null))return h},this.setFoveation=function(Q){h=Q,g!==null&&(g.fixedFoveation=Q),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Q)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(I)},this.getCameraTexture=function(Q){return y[Q]};let re=null;function Be(Q,me){if(x=me.getViewerPose(p||u),E=me,x!==null){const pe=x.views;S!==null&&(e.setRenderTargetFramebuffer(P,S.framebuffer),e.setRenderTarget(P));let Ce=!1;pe.length!==I.cameras.length&&(I.cameras.length=0,Ce=!0);for(let _t=0;_t<pe.length;_t++){const B=pe[_t];let Ct=null;if(S!==null)Ct=S.getViewport(B);else{const St=_.getViewSubImage(g,B);Ct=St.viewport,_t===0&&(e.setRenderTargetTextures(P,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(P))}let Je=R[_t];Je===void 0&&(Je=new Qn,Je.layers.enable(_t),Je.viewport=new Nt,R[_t]=Je),Je.matrix.fromArray(B.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(B.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(Ct.x,Ct.y,Ct.width,Ct.height),_t===0&&(I.matrix.copy(Je.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ce===!0&&I.cameras.push(Je)}const Le=o.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&_){const _t=_.getDepthInformation(pe[0]);_t&&_t.isValid&&_t.texture&&T.init(_t,o.renderState)}if(Le&&Le.includes("camera-access")&&(e.state.unbindTexture(),_))for(let _t=0;_t<pe.length;_t++){const B=pe[_t].camera;if(B){let Ct=y[B];Ct||(Ct=new f0,y[B]=Ct);const Je=_.getCameraImage(B);Ct.sourceTexture=Je}}}for(let pe=0;pe<C.length;pe++){const Ce=N[pe],Le=C[pe];Ce!==null&&Le!==void 0&&Le.update(Ce,me,p||u)}re&&re(Q,me),me.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:me}),E=null}const ke=new o0;ke.setAnimationLoop(Be),this.setAnimationLoop=function(Q){re=Q},this.dispose=function(){}}}const Zr=new Di,R1=new Ft;function b1(s,e){function t(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function r(y,v){v.color.getRGB(y.fogColor.value,Zg(s)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function o(y,v,F,P,C){v.isMeshBasicMaterial||v.isMeshLambertMaterial?l(y,v):v.isMeshToonMaterial?(l(y,v),_(y,v)):v.isMeshPhongMaterial?(l(y,v),x(y,v)):v.isMeshStandardMaterial?(l(y,v),g(y,v),v.isMeshPhysicalMaterial&&S(y,v,C)):v.isMeshMatcapMaterial?(l(y,v),E(y,v)):v.isMeshDepthMaterial?l(y,v):v.isMeshDistanceMaterial?(l(y,v),T(y,v)):v.isMeshNormalMaterial?l(y,v):v.isLineBasicMaterial?(u(y,v),v.isLineDashedMaterial&&f(y,v)):v.isPointsMaterial?h(y,v,F,P):v.isSpriteMaterial?p(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function l(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,t(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,t(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===Dn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,t(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===Dn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,t(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,t(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const F=e.get(v),P=F.envMap,C=F.envMapRotation;P&&(y.envMap.value=P,Zr.copy(C),Zr.x*=-1,Zr.y*=-1,Zr.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Zr.y*=-1,Zr.z*=-1),y.envMapRotation.value.setFromMatrix4(R1.makeRotationFromEuler(Zr)),y.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,t(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,y.aoMapTransform))}function u(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,t(v.map,y.mapTransform))}function f(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function h(y,v,F,P){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*F,y.scale.value=P*.5,v.map&&(y.map.value=v.map,t(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function p(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,t(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function x(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function _(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function g(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function S(y,v,F){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Dn&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=F.texture,y.transmissionSamplerSize.value.set(F.width,F.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,v){v.matcap&&(y.matcap.value=v.matcap)}function T(y,v){const F=e.get(v).light;y.referencePosition.value.setFromMatrixPosition(F.matrixWorld),y.nearDistance.value=F.shadow.camera.near,y.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function P1(s,e,t,r){let o={},l={},u=[];const f=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(F,P){const C=P.program;r.uniformBlockBinding(F,C)}function p(F,P){let C=o[F.id];C===void 0&&(E(F),C=x(F),o[F.id]=C,F.addEventListener("dispose",y));const N=P.program;r.updateUBOMapping(F,N);const U=e.render.frame;l[F.id]!==U&&(g(F),l[F.id]=U)}function x(F){const P=_();F.__bindingPointIndex=P;const C=s.createBuffer(),N=F.__size,U=F.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,N,U),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,P,C),C}function _(){for(let F=0;F<f;F++)if(u.indexOf(F)===-1)return u.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(F){const P=o[F.id],C=F.uniforms,N=F.__cache;s.bindBuffer(s.UNIFORM_BUFFER,P);for(let U=0,k=C.length;U<k;U++){const j=Array.isArray(C[U])?C[U]:[C[U]];for(let b=0,R=j.length;b<R;b++){const I=j[b];if(S(I,U,b,N)===!0){const ie=I.__offset,te=Array.isArray(I.value)?I.value:[I.value];let se=0;for(let de=0;de<te.length;de++){const ae=te[de],fe=T(ae);typeof ae=="number"||typeof ae=="boolean"?(I.__data[0]=ae,s.bufferSubData(s.UNIFORM_BUFFER,ie+se,I.__data)):ae.isMatrix3?(I.__data[0]=ae.elements[0],I.__data[1]=ae.elements[1],I.__data[2]=ae.elements[2],I.__data[3]=0,I.__data[4]=ae.elements[3],I.__data[5]=ae.elements[4],I.__data[6]=ae.elements[5],I.__data[7]=0,I.__data[8]=ae.elements[6],I.__data[9]=ae.elements[7],I.__data[10]=ae.elements[8],I.__data[11]=0):(ae.toArray(I.__data,se),se+=fe.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ie,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(F,P,C,N){const U=F.value,k=P+"_"+C;if(N[k]===void 0)return typeof U=="number"||typeof U=="boolean"?N[k]=U:N[k]=U.clone(),!0;{const j=N[k];if(typeof U=="number"||typeof U=="boolean"){if(j!==U)return N[k]=U,!0}else if(j.equals(U)===!1)return j.copy(U),!0}return!1}function E(F){const P=F.uniforms;let C=0;const N=16;for(let k=0,j=P.length;k<j;k++){const b=Array.isArray(P[k])?P[k]:[P[k]];for(let R=0,I=b.length;R<I;R++){const ie=b[R],te=Array.isArray(ie.value)?ie.value:[ie.value];for(let se=0,de=te.length;se<de;se++){const ae=te[se],fe=T(ae),V=C%N,ce=V%fe.boundary,oe=V+ce;C+=ce,oe!==0&&N-oe<fe.storage&&(C+=N-oe),ie.__data=new Float32Array(fe.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=C,C+=fe.storage}}}const U=C%N;return U>0&&(C+=N-U),F.__size=C,F.__cache={},this}function T(F){const P={boundary:0,storage:0};return typeof F=="number"||typeof F=="boolean"?(P.boundary=4,P.storage=4):F.isVector2?(P.boundary=8,P.storage=8):F.isVector3||F.isColor?(P.boundary=16,P.storage=12):F.isVector4?(P.boundary=16,P.storage=16):F.isMatrix3?(P.boundary=48,P.storage=48):F.isMatrix4?(P.boundary=64,P.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),P}function y(F){const P=F.target;P.removeEventListener("dispose",y);const C=u.indexOf(P.__bindingPointIndex);u.splice(C,1),s.deleteBuffer(o[P.id]),delete o[P.id],delete l[P.id]}function v(){for(const F in o)s.deleteBuffer(o[F]);u=[],o={},l={}}return{bind:h,update:p,dispose:v}}class L1{constructor(e={}){const{canvas:t=rx(),context:r=null,depth:o=!0,stencil:l=!1,alpha:u=!1,antialias:f=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:p=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=u;const E=new Uint32Array(4),T=new Int32Array(4);let y=null,v=null;const F=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let N=!1;this._outputColorSpace=Vn;let U=0,k=0,j=null,b=-1,R=null;const I=new Nt,ie=new Nt;let te=null;const se=new yt(0);let de=0,ae=t.width,fe=t.height,V=1,ce=null,oe=null;const O=new Nt(0,0,ae,fe),re=new Nt(0,0,ae,fe);let Be=!1;const ke=new Nd;let Q=!1,me=!1;const pe=new Ft,Ce=new H,Le=new Nt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function _t(){return j===null?V:1}let B=r;function Ct(A,Y){return t.getContext(A,Y)}try{const A={alpha:!0,depth:o,stencil:l,antialias:f,premultipliedAlpha:h,preserveDrawingBuffer:p,powerPreference:x,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Md}`),t.addEventListener("webglcontextlost",Ae,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",ye,!1),B===null){const Y="webgl2";if(B=Ct(Y,A),B===null)throw Ct(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Je,St,$e,Ot,Fe,ct,Vt,Gt,L,w,$,ue,_e,le,Ye,we,ze,qe,Ee,De,rt,Xe,Re,ut;function G(){Je=new HM(B),Je.init(),Xe=new E1(B,Je),St=new UM(B,Je,e,Xe),$e=new S1(B,Je),St.reversedDepthBuffer&&g&&$e.buffers.depth.setReversed(!0),Ot=new WM(B),Fe=new l1,ct=new M1(B,Je,$e,Fe,St,Xe,Ot),Vt=new FM(C),Gt=new zM(C),L=new Kx(B),Re=new DM(B,L),w=new VM(B,L,Ot,Re),$=new jM(B,w,L,Ot),Ee=new XM(B,St,ct),we=new NM(Fe),ue=new a1(C,Vt,Gt,Je,St,Re,we),_e=new b1(C,Fe),le=new u1,Ye=new g1(Je),qe=new LM(C,Vt,Gt,$e,$,S,h),ze=new x1(C,$,St),ut=new P1(B,Ot,St,$e),De=new IM(B,Je,Ot),rt=new GM(B,Je,Ot),Ot.programs=ue.programs,C.capabilities=St,C.extensions=Je,C.properties=Fe,C.renderLists=le,C.shadowMap=ze,C.state=$e,C.info=Ot}G();const Se=new C1(C,B);this.xr=Se,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const A=Je.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Je.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(A){A!==void 0&&(V=A,this.setSize(ae,fe,!1))},this.getSize=function(A){return A.set(ae,fe)},this.setSize=function(A,Y,ee=!0){if(Se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ae=A,fe=Y,t.width=Math.floor(A*V),t.height=Math.floor(Y*V),ee===!0&&(t.style.width=A+"px",t.style.height=Y+"px"),this.setViewport(0,0,A,Y)},this.getDrawingBufferSize=function(A){return A.set(ae*V,fe*V).floor()},this.setDrawingBufferSize=function(A,Y,ee){ae=A,fe=Y,V=ee,t.width=Math.floor(A*ee),t.height=Math.floor(Y*ee),this.setViewport(0,0,A,Y)},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy(O)},this.setViewport=function(A,Y,ee,ne){A.isVector4?O.set(A.x,A.y,A.z,A.w):O.set(A,Y,ee,ne),$e.viewport(I.copy(O).multiplyScalar(V).round())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,Y,ee,ne){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,Y,ee,ne),$e.scissor(ie.copy(re).multiplyScalar(V).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(A){$e.setScissorTest(Be=A)},this.setOpaqueSort=function(A){ce=A},this.setTransparentSort=function(A){oe=A},this.getClearColor=function(A){return A.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(A=!0,Y=!0,ee=!0){let ne=0;if(A){let W=!1;if(j!==null){const Me=j.texture.format;W=Me===bd||Me===Rd||Me===Cd}if(W){const Me=j.texture.type,be=Me===Li||Me===os||Me===aa||Me===la||Me===Td||Me===wd,He=qe.getClearColor(),Ue=qe.getClearAlpha(),it=He.r,st=He.g,Ke=He.b;be?(E[0]=it,E[1]=st,E[2]=Ke,E[3]=Ue,B.clearBufferuiv(B.COLOR,0,E)):(T[0]=it,T[1]=st,T[2]=Ke,T[3]=Ue,B.clearBufferiv(B.COLOR,0,T))}else ne|=B.COLOR_BUFFER_BIT}Y&&(ne|=B.DEPTH_BUFFER_BIT),ee&&(ne|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ae,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),qe.dispose(),le.dispose(),Ye.dispose(),Fe.dispose(),Vt.dispose(),Gt.dispose(),$.dispose(),Re.dispose(),ut.dispose(),ue.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",mn),Se.removeEventListener("sessionend",cs),Gn.stop()};function Ae(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const A=Ot.autoReset,Y=ze.enabled,ee=ze.autoUpdate,ne=ze.needsUpdate,W=ze.type;G(),Ot.autoReset=A,ze.enabled=Y,ze.autoUpdate=ee,ze.needsUpdate=ne,ze.type=W}function ye(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function he(A){const Y=A.target;Y.removeEventListener("dispose",he),Ge(Y)}function Ge(A){lt(A),Fe.remove(A)}function lt(A){const Y=Fe.get(A).programs;Y!==void 0&&(Y.forEach(function(ee){ue.releaseProgram(ee)}),A.isShaderMaterial&&ue.releaseShaderCache(A))}this.renderBufferDirect=function(A,Y,ee,ne,W,Me){Y===null&&(Y=Ze);const be=W.isMesh&&W.matrixWorld.determinant()<0,He=Ui(A,Y,ee,ne,W);$e.setMaterial(ne,be);let Ue=ee.index,it=1;if(ne.wireframe===!0){if(Ue=w.getWireframeAttribute(ee),Ue===void 0)return;it=2}const st=ee.drawRange,Ke=ee.attributes.position;let ot=st.start*it,Rt=(st.start+st.count)*it;Me!==null&&(ot=Math.max(ot,Me.start*it),Rt=Math.min(Rt,(Me.start+Me.count)*it)),Ue!==null?(ot=Math.max(ot,0),Rt=Math.min(Rt,Ue.count)):Ke!=null&&(ot=Math.max(ot,0),Rt=Math.min(Rt,Ke.count));const Et=Rt-ot;if(Et<0||Et===1/0)return;Re.setup(W,ne,He,ee,Ue);let kt,Pt=De;if(Ue!==null&&(kt=L.get(Ue),Pt=rt,Pt.setIndex(kt)),W.isMesh)ne.wireframe===!0?($e.setLineWidth(ne.wireframeLinewidth*_t()),Pt.setMode(B.LINES)):Pt.setMode(B.TRIANGLES);else if(W.isLine){let et=ne.linewidth;et===void 0&&(et=1),$e.setLineWidth(et*_t()),W.isLineSegments?Pt.setMode(B.LINES):W.isLineLoop?Pt.setMode(B.LINE_LOOP):Pt.setMode(B.LINE_STRIP)}else W.isPoints?Pt.setMode(B.POINTS):W.isSprite&&Pt.setMode(B.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)no("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Pt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Je.get("WEBGL_multi_draw"))Pt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const et=W._multiDrawStarts,It=W._multiDrawCounts,gt=W._multiDrawCount,rn=Ue?L.get(Ue).bytesPerElement:1,ui=Fe.get(ne).currentProgram.getUniforms();for(let wn=0;wn<gt;wn++)ui.setValue(B,"_gl_DrawID",wn),Pt.render(et[wn]/rn,It[wn])}else if(W.isInstancedMesh)Pt.renderInstances(ot,Et,W.count);else if(ee.isInstancedBufferGeometry){const et=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,It=Math.min(ee.instanceCount,et);Pt.renderInstances(ot,Et,It)}else Pt.render(ot,Et)};function bt(A,Y,ee){A.transparent===!0&&A.side===Ci&&A.forceSinglePass===!1?(A.side=Dn,A.needsUpdate=!0,fs(A,Y,ee),A.side=Rr,A.needsUpdate=!0,fs(A,Y,ee),A.side=Ci):fs(A,Y,ee)}this.compile=function(A,Y,ee=null){ee===null&&(ee=A),v=Ye.get(ee),v.init(Y),P.push(v),ee.traverseVisible(function(W){W.isLight&&W.layers.test(Y.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),A!==ee&&A.traverseVisible(function(W){W.isLight&&W.layers.test(Y.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),v.setupLights();const ne=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Me=W.material;if(Me)if(Array.isArray(Me))for(let be=0;be<Me.length;be++){const He=Me[be];bt(He,ee,W),ne.add(He)}else bt(Me,ee,W),ne.add(Me)}),v=P.pop(),ne},this.compileAsync=function(A,Y,ee=null){const ne=this.compile(A,Y,ee);return new Promise(W=>{function Me(){if(ne.forEach(function(be){Fe.get(be).currentProgram.isReady()&&ne.delete(be)}),ne.size===0){W(A);return}setTimeout(Me,10)}Je.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Mt=null;function ei(A){Mt&&Mt(A)}function mn(){Gn.stop()}function cs(){Gn.start()}const Gn=new o0;Gn.setAnimationLoop(ei),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(A){Mt=A,Se.setAnimationLoop(A),A===null?Gn.stop():Gn.start()},Se.addEventListener("sessionstart",mn),Se.addEventListener("sessionend",cs),this.render=function(A,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(Y),Y=Se.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,Y,j),v=Ye.get(A,P.length),v.init(Y),P.push(v),pe.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),ke.setFromProjectionMatrix(pe,Pi,Y.reversedDepth),me=this.localClippingEnabled,Q=we.init(this.clippingPlanes,me),y=le.get(A,F.length),y.init(),F.push(y),Se.enabled===!0&&Se.isPresenting===!0){const Me=C.xr.getDepthSensingMesh();Me!==null&&po(Me,Y,-1/0,C.sortObjects)}po(A,Y,0,C.sortObjects),y.finish(),C.sortObjects===!0&&y.sort(ce,oe),zt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,zt&&qe.addToRenderList(y,A),this.info.render.frame++,Q===!0&&we.beginShadows();const ee=v.state.shadowsArray;ze.render(ee,A,Y),Q===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset();const ne=y.opaque,W=y.transmissive;if(v.setupLights(),Y.isArrayCamera){const Me=Y.cameras;if(W.length>0)for(let be=0,He=Me.length;be<He;be++){const Ue=Me[be];Lr(ne,W,A,Ue)}zt&&qe.render(A);for(let be=0,He=Me.length;be<He;be++){const Ue=Me[be];Ji(y,A,Ue,Ue.viewport)}}else W.length>0&&Lr(ne,W,A,Y),zt&&qe.render(A),Ji(y,A,Y);j!==null&&k===0&&(ct.updateMultisampleRenderTarget(j),ct.updateRenderTargetMipmap(j)),A.isScene===!0&&A.onAfterRender(C,A,Y),Re.resetDefaultState(),b=-1,R=null,P.pop(),P.length>0?(v=P[P.length-1],Q===!0&&we.setGlobalState(C.clippingPlanes,v.state.camera)):v=null,F.pop(),F.length>0?y=F[F.length-1]:y=null};function po(A,Y,ee,ne){if(A.visible===!1)return;if(A.layers.test(Y.layers)){if(A.isGroup)ee=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Y);else if(A.isLight)v.pushLight(A),A.castShadow&&v.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ke.intersectsSprite(A)){ne&&Le.setFromMatrixPosition(A.matrixWorld).applyMatrix4(pe);const be=$.update(A),He=A.material;He.visible&&y.push(A,be,He,ee,Le.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ke.intersectsObject(A))){const be=$.update(A),He=A.material;if(ne&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Le.copy(A.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Le.copy(be.boundingSphere.center)),Le.applyMatrix4(A.matrixWorld).applyMatrix4(pe)),Array.isArray(He)){const Ue=be.groups;for(let it=0,st=Ue.length;it<st;it++){const Ke=Ue[it],ot=He[Ke.materialIndex];ot&&ot.visible&&y.push(A,be,ot,ee,Le.z,Ke)}}else He.visible&&y.push(A,be,He,ee,Le.z,null)}}const Me=A.children;for(let be=0,He=Me.length;be<He;be++)po(Me[be],Y,ee,ne)}function Ji(A,Y,ee,ne){const W=A.opaque,Me=A.transmissive,be=A.transparent;v.setupLightsView(ee),Q===!0&&we.setGlobalState(C.clippingPlanes,ee),ne&&$e.viewport(I.copy(ne)),W.length>0&&Ii(W,Y,ee),Me.length>0&&Ii(Me,Y,ee),be.length>0&&Ii(be,Y,ee),$e.buffers.depth.setTest(!0),$e.buffers.depth.setMask(!0),$e.buffers.color.setMask(!0),$e.setPolygonOffset(!1)}function Lr(A,Y,ee,ne){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[ne.id]===void 0&&(v.state.transmissionRenderTarget[ne.id]=new as(1,1,{generateMipmaps:!0,type:Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float")?ha:Li,minFilter:rs,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:At.workingColorSpace}));const Me=v.state.transmissionRenderTarget[ne.id],be=ne.viewport||I;Me.setSize(be.z*C.transmissionResolutionScale,be.w*C.transmissionResolutionScale);const He=C.getRenderTarget(),Ue=C.getActiveCubeFace(),it=C.getActiveMipmapLevel();C.setRenderTarget(Me),C.getClearColor(se),de=C.getClearAlpha(),de<1&&C.setClearColor(16777215,.5),C.clear(),zt&&qe.render(ee);const st=C.toneMapping;C.toneMapping=Cr;const Ke=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),v.setupLightsView(ne),Q===!0&&we.setGlobalState(C.clippingPlanes,ne),Ii(A,ee,ne),ct.updateMultisampleRenderTarget(Me),ct.updateRenderTargetMipmap(Me),Je.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let Rt=0,Et=Y.length;Rt<Et;Rt++){const kt=Y[Rt],Pt=kt.object,et=kt.geometry,It=kt.material,gt=kt.group;if(It.side===Ci&&Pt.layers.test(ne.layers)){const rn=It.side;It.side=Dn,It.needsUpdate=!0,us(Pt,ee,ne,et,It,gt),It.side=rn,It.needsUpdate=!0,ot=!0}}ot===!0&&(ct.updateMultisampleRenderTarget(Me),ct.updateRenderTargetMipmap(Me))}C.setRenderTarget(He,Ue,it),C.setClearColor(se,de),Ke!==void 0&&(ne.viewport=Ke),C.toneMapping=st}function Ii(A,Y,ee){const ne=Y.isScene===!0?Y.overrideMaterial:null;for(let W=0,Me=A.length;W<Me;W++){const be=A[W],He=be.object,Ue=be.geometry,it=be.group;let st=be.material;st.allowOverride===!0&&ne!==null&&(st=ne),He.layers.test(ee.layers)&&us(He,Y,ee,Ue,st,it)}}function us(A,Y,ee,ne,W,Me){A.onBeforeRender(C,Y,ee,ne,W,Me),A.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(C,Y,ee,ne,A,Me),W.transparent===!0&&W.side===Ci&&W.forceSinglePass===!1?(W.side=Dn,W.needsUpdate=!0,C.renderBufferDirect(ee,Y,ne,W,A,Me),W.side=Rr,W.needsUpdate=!0,C.renderBufferDirect(ee,Y,ne,W,A,Me),W.side=Ci):C.renderBufferDirect(ee,Y,ne,W,A,Me),A.onAfterRender(C,Y,ee,ne,W,Me)}function fs(A,Y,ee){Y.isScene!==!0&&(Y=Ze);const ne=Fe.get(A),W=v.state.lights,Me=v.state.shadowsArray,be=W.state.version,He=ue.getParameters(A,W.state,Me,Y,ee),Ue=ue.getProgramCacheKey(He);let it=ne.programs;ne.environment=A.isMeshStandardMaterial?Y.environment:null,ne.fog=Y.fog,ne.envMap=(A.isMeshStandardMaterial?Gt:Vt).get(A.envMap||ne.environment),ne.envMapRotation=ne.environment!==null&&A.envMap===null?Y.environmentRotation:A.envMapRotation,it===void 0&&(A.addEventListener("dispose",he),it=new Map,ne.programs=it);let st=it.get(Ue);if(st!==void 0){if(ne.currentProgram===st&&ne.lightsStateVersion===be)return va(A,He),st}else He.uniforms=ue.getUniforms(A),A.onBeforeCompile(He,C),st=ue.acquireProgram(He,Ue),it.set(Ue,st),ne.uniforms=He.uniforms;const Ke=ne.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ke.clippingPlanes=we.uniform),va(A,He),ne.needsLights=xa(A),ne.lightsStateVersion=be,ne.needsLights&&(Ke.ambientLightColor.value=W.state.ambient,Ke.lightProbe.value=W.state.probe,Ke.directionalLights.value=W.state.directional,Ke.directionalLightShadows.value=W.state.directionalShadow,Ke.spotLights.value=W.state.spot,Ke.spotLightShadows.value=W.state.spotShadow,Ke.rectAreaLights.value=W.state.rectArea,Ke.ltc_1.value=W.state.rectAreaLTC1,Ke.ltc_2.value=W.state.rectAreaLTC2,Ke.pointLights.value=W.state.point,Ke.pointLightShadows.value=W.state.pointShadow,Ke.hemisphereLights.value=W.state.hemi,Ke.directionalShadowMap.value=W.state.directionalShadowMap,Ke.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ke.spotShadowMap.value=W.state.spotShadowMap,Ke.spotLightMatrix.value=W.state.spotLightMatrix,Ke.spotLightMap.value=W.state.spotLightMap,Ke.pointShadowMap.value=W.state.pointShadowMap,Ke.pointShadowMatrix.value=W.state.pointShadowMatrix),ne.currentProgram=st,ne.uniformsList=null,st}function ga(A){if(A.uniformsList===null){const Y=A.currentProgram.getUniforms();A.uniformsList=rc.seqWithValue(Y.seq,A.uniforms)}return A.uniformsList}function va(A,Y){const ee=Fe.get(A);ee.outputColorSpace=Y.outputColorSpace,ee.batching=Y.batching,ee.batchingColor=Y.batchingColor,ee.instancing=Y.instancing,ee.instancingColor=Y.instancingColor,ee.instancingMorph=Y.instancingMorph,ee.skinning=Y.skinning,ee.morphTargets=Y.morphTargets,ee.morphNormals=Y.morphNormals,ee.morphColors=Y.morphColors,ee.morphTargetsCount=Y.morphTargetsCount,ee.numClippingPlanes=Y.numClippingPlanes,ee.numIntersection=Y.numClipIntersection,ee.vertexAlphas=Y.vertexAlphas,ee.vertexTangents=Y.vertexTangents,ee.toneMapping=Y.toneMapping}function Ui(A,Y,ee,ne,W){Y.isScene!==!0&&(Y=Ze),ct.resetTextureUnits();const Me=Y.fog,be=ne.isMeshStandardMaterial?Y.environment:null,He=j===null?C.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ao,Ue=(ne.isMeshStandardMaterial?Gt:Vt).get(ne.envMap||be),it=ne.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,st=!!ee.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ke=!!ee.morphAttributes.position,ot=!!ee.morphAttributes.normal,Rt=!!ee.morphAttributes.color;let Et=Cr;ne.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Et=C.toneMapping);const kt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Pt=kt!==void 0?kt.length:0,et=Fe.get(ne),It=v.state.lights;if(Q===!0&&(me===!0||A!==R)){const Zt=A===R&&ne.id===b;we.setState(ne,A,Zt)}let gt=!1;ne.version===et.__version?(et.needsLights&&et.lightsStateVersion!==It.state.version||et.outputColorSpace!==He||W.isBatchedMesh&&et.batching===!1||!W.isBatchedMesh&&et.batching===!0||W.isBatchedMesh&&et.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&et.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&et.instancing===!1||!W.isInstancedMesh&&et.instancing===!0||W.isSkinnedMesh&&et.skinning===!1||!W.isSkinnedMesh&&et.skinning===!0||W.isInstancedMesh&&et.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&et.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&et.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&et.instancingMorph===!1&&W.morphTexture!==null||et.envMap!==Ue||ne.fog===!0&&et.fog!==Me||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==we.numPlanes||et.numIntersection!==we.numIntersection)||et.vertexAlphas!==it||et.vertexTangents!==st||et.morphTargets!==Ke||et.morphNormals!==ot||et.morphColors!==Rt||et.toneMapping!==Et||et.morphTargetsCount!==Pt)&&(gt=!0):(gt=!0,et.__version=ne.version);let rn=et.currentProgram;gt===!0&&(rn=fs(ne,Y,W));let ui=!1,wn=!1,Dr=!1;const Bt=rn.getUniforms(),An=et.uniforms;if($e.useProgram(rn.program)&&(ui=!0,wn=!0,Dr=!0),ne.id!==b&&(b=ne.id,wn=!0),ui||R!==A){$e.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Bt.setValue(B,"projectionMatrix",A.projectionMatrix),Bt.setValue(B,"viewMatrix",A.matrixWorldInverse);const vn=Bt.map.cameraPosition;vn!==void 0&&vn.setValue(B,Ce.setFromMatrixPosition(A.matrixWorld)),St.logarithmicDepthBuffer&&Bt.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Bt.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,wn=!0,Dr=!0)}if(W.isSkinnedMesh){Bt.setOptional(B,W,"bindMatrix"),Bt.setOptional(B,W,"bindMatrixInverse");const Zt=W.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),Bt.setValue(B,"boneTexture",Zt.boneTexture,ct))}W.isBatchedMesh&&(Bt.setOptional(B,W,"batchingTexture"),Bt.setValue(B,"batchingTexture",W._matricesTexture,ct),Bt.setOptional(B,W,"batchingIdTexture"),Bt.setValue(B,"batchingIdTexture",W._indirectTexture,ct),Bt.setOptional(B,W,"batchingColorTexture"),W._colorsTexture!==null&&Bt.setValue(B,"batchingColorTexture",W._colorsTexture,ct));const gn=ee.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&Ee.update(W,ee,rn),(wn||et.receiveShadow!==W.receiveShadow)&&(et.receiveShadow=W.receiveShadow,Bt.setValue(B,"receiveShadow",W.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(An.envMap.value=Ue,An.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),ne.isMeshStandardMaterial&&ne.envMap===null&&Y.environment!==null&&(An.envMapIntensity.value=Y.environmentIntensity),wn&&(Bt.setValue(B,"toneMappingExposure",C.toneMappingExposure),et.needsLights&&_a(An,Dr),Me&&ne.fog===!0&&_e.refreshFogUniforms(An,Me),_e.refreshMaterialUniforms(An,ne,V,fe,v.state.transmissionRenderTarget[A.id]),rc.upload(B,ga(et),An,ct)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(rc.upload(B,ga(et),An,ct),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Bt.setValue(B,"center",W.center),Bt.setValue(B,"modelViewMatrix",W.modelViewMatrix),Bt.setValue(B,"normalMatrix",W.normalMatrix),Bt.setValue(B,"modelMatrix",W.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const Zt=ne.uniformsGroups;for(let vn=0,Ir=Zt.length;vn<Ir;vn++){const vt=Zt[vn];ut.update(vt,rn),ut.bind(vt,rn)}}return rn}function _a(A,Y){A.ambientLightColor.needsUpdate=Y,A.lightProbe.needsUpdate=Y,A.directionalLights.needsUpdate=Y,A.directionalLightShadows.needsUpdate=Y,A.pointLights.needsUpdate=Y,A.pointLightShadows.needsUpdate=Y,A.spotLights.needsUpdate=Y,A.spotLightShadows.needsUpdate=Y,A.rectAreaLights.needsUpdate=Y,A.hemisphereLights.needsUpdate=Y}function xa(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(A,Y,ee){const ne=Fe.get(A);ne.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),Fe.get(A.texture).__webglTexture=Y,Fe.get(A.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:ee,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Y){const ee=Fe.get(A);ee.__webglFramebuffer=Y,ee.__useDefaultFramebuffer=Y===void 0};const pc=B.createFramebuffer();this.setRenderTarget=function(A,Y=0,ee=0){j=A,U=Y,k=ee;let ne=!0,W=null,Me=!1,be=!1;if(A){const Ue=Fe.get(A);if(Ue.__useDefaultFramebuffer!==void 0)$e.bindFramebuffer(B.FRAMEBUFFER,null),ne=!1;else if(Ue.__webglFramebuffer===void 0)ct.setupRenderTarget(A);else if(Ue.__hasExternalTextures)ct.rebindTextures(A,Fe.get(A.texture).__webglTexture,Fe.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ke=A.depthTexture;if(Ue.__boundDepthTexture!==Ke){if(Ke!==null&&Fe.has(Ke)&&(A.width!==Ke.image.width||A.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ct.setupDepthRenderbuffer(A)}}const it=A.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(be=!0);const st=Fe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(st[Y])?W=st[Y][ee]:W=st[Y],Me=!0):A.samples>0&&ct.useMultisampledRTT(A)===!1?W=Fe.get(A).__webglMultisampledFramebuffer:Array.isArray(st)?W=st[ee]:W=st,I.copy(A.viewport),ie.copy(A.scissor),te=A.scissorTest}else I.copy(O).multiplyScalar(V).floor(),ie.copy(re).multiplyScalar(V).floor(),te=Be;if(ee!==0&&(W=pc),$e.bindFramebuffer(B.FRAMEBUFFER,W)&&ne&&$e.drawBuffers(A,W),$e.viewport(I),$e.scissor(ie),$e.setScissorTest(te),Me){const Ue=Fe.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ue.__webglTexture,ee)}else if(be){const Ue=Y;for(let it=0;it<A.textures.length;it++){const st=Fe.get(A.textures[it]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+it,st.__webglTexture,ee,Ue)}}else if(A!==null&&ee!==0){const Ue=Fe.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ue.__webglTexture,ee)}b=-1},this.readRenderTargetPixels=function(A,Y,ee,ne,W,Me,be,He=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Fe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&be!==void 0&&(Ue=Ue[be]),Ue){$e.bindFramebuffer(B.FRAMEBUFFER,Ue);try{const it=A.textures[He],st=it.format,Ke=it.type;if(!St.textureFormatReadable(st)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=A.width-ne&&ee>=0&&ee<=A.height-W&&(A.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+He),B.readPixels(Y,ee,ne,W,Xe.convert(st),Xe.convert(Ke),Me))}finally{const it=j!==null?Fe.get(j).__webglFramebuffer:null;$e.bindFramebuffer(B.FRAMEBUFFER,it)}}},this.readRenderTargetPixelsAsync=async function(A,Y,ee,ne,W,Me,be,He=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=Fe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&be!==void 0&&(Ue=Ue[be]),Ue)if(Y>=0&&Y<=A.width-ne&&ee>=0&&ee<=A.height-W){$e.bindFramebuffer(B.FRAMEBUFFER,Ue);const it=A.textures[He],st=it.format,Ke=it.type;if(!St.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ot),B.bufferData(B.PIXEL_PACK_BUFFER,Me.byteLength,B.STREAM_READ),A.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+He),B.readPixels(Y,ee,ne,W,Xe.convert(st),Xe.convert(Ke),0);const Rt=j!==null?Fe.get(j).__webglFramebuffer:null;$e.bindFramebuffer(B.FRAMEBUFFER,Rt);const Et=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await sx(B,Et,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ot),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Me),B.deleteBuffer(ot),B.deleteSync(Et),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Y=null,ee=0){const ne=Math.pow(2,-ee),W=Math.floor(A.image.width*ne),Me=Math.floor(A.image.height*ne),be=Y!==null?Y.x:0,He=Y!==null?Y.y:0;ct.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,ee,0,0,be,He,W,Me),$e.unbindTexture()};const ya=B.createFramebuffer(),Sa=B.createFramebuffer();this.copyTextureToTexture=function(A,Y,ee=null,ne=null,W=0,Me=null){Me===null&&(W!==0?(no("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Me=W,W=0):Me=0);let be,He,Ue,it,st,Ke,ot,Rt,Et;const kt=A.isCompressedTexture?A.mipmaps[Me]:A.image;if(ee!==null)be=ee.max.x-ee.min.x,He=ee.max.y-ee.min.y,Ue=ee.isBox3?ee.max.z-ee.min.z:1,it=ee.min.x,st=ee.min.y,Ke=ee.isBox3?ee.min.z:0;else{const gn=Math.pow(2,-W);be=Math.floor(kt.width*gn),He=Math.floor(kt.height*gn),A.isDataArrayTexture?Ue=kt.depth:A.isData3DTexture?Ue=Math.floor(kt.depth*gn):Ue=1,it=0,st=0,Ke=0}ne!==null?(ot=ne.x,Rt=ne.y,Et=ne.z):(ot=0,Rt=0,Et=0);const Pt=Xe.convert(Y.format),et=Xe.convert(Y.type);let It;Y.isData3DTexture?(ct.setTexture3D(Y,0),It=B.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(ct.setTexture2DArray(Y,0),It=B.TEXTURE_2D_ARRAY):(ct.setTexture2D(Y,0),It=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,Y.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,Y.unpackAlignment);const gt=B.getParameter(B.UNPACK_ROW_LENGTH),rn=B.getParameter(B.UNPACK_IMAGE_HEIGHT),ui=B.getParameter(B.UNPACK_SKIP_PIXELS),wn=B.getParameter(B.UNPACK_SKIP_ROWS),Dr=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,kt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,kt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,it),B.pixelStorei(B.UNPACK_SKIP_ROWS,st),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Ke);const Bt=A.isDataArrayTexture||A.isData3DTexture,An=Y.isDataArrayTexture||Y.isData3DTexture;if(A.isDepthTexture){const gn=Fe.get(A),Zt=Fe.get(Y),vn=Fe.get(gn.__renderTarget),Ir=Fe.get(Zt.__renderTarget);$e.bindFramebuffer(B.READ_FRAMEBUFFER,vn.__webglFramebuffer),$e.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ir.__webglFramebuffer);for(let vt=0;vt<Ue;vt++)Bt&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Fe.get(A).__webglTexture,W,Ke+vt),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Fe.get(Y).__webglTexture,Me,Et+vt)),B.blitFramebuffer(it,st,be,He,ot,Rt,be,He,B.DEPTH_BUFFER_BIT,B.NEAREST);$e.bindFramebuffer(B.READ_FRAMEBUFFER,null),$e.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||Fe.has(A)){const gn=Fe.get(A),Zt=Fe.get(Y);$e.bindFramebuffer(B.READ_FRAMEBUFFER,ya),$e.bindFramebuffer(B.DRAW_FRAMEBUFFER,Sa);for(let vn=0;vn<Ue;vn++)Bt?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,gn.__webglTexture,W,Ke+vn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,gn.__webglTexture,W),An?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Zt.__webglTexture,Me,Et+vn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Zt.__webglTexture,Me),W!==0?B.blitFramebuffer(it,st,be,He,ot,Rt,be,He,B.COLOR_BUFFER_BIT,B.NEAREST):An?B.copyTexSubImage3D(It,Me,ot,Rt,Et+vn,it,st,be,He):B.copyTexSubImage2D(It,Me,ot,Rt,it,st,be,He);$e.bindFramebuffer(B.READ_FRAMEBUFFER,null),$e.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else An?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(It,Me,ot,Rt,Et,be,He,Ue,Pt,et,kt.data):Y.isCompressedArrayTexture?B.compressedTexSubImage3D(It,Me,ot,Rt,Et,be,He,Ue,Pt,kt.data):B.texSubImage3D(It,Me,ot,Rt,Et,be,He,Ue,Pt,et,kt):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Me,ot,Rt,be,He,Pt,et,kt.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Me,ot,Rt,kt.width,kt.height,Pt,kt.data):B.texSubImage2D(B.TEXTURE_2D,Me,ot,Rt,be,He,Pt,et,kt);B.pixelStorei(B.UNPACK_ROW_LENGTH,gt),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,rn),B.pixelStorei(B.UNPACK_SKIP_PIXELS,ui),B.pixelStorei(B.UNPACK_SKIP_ROWS,wn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Dr),Me===0&&Y.generateMipmaps&&B.generateMipmap(It),$e.unbindTexture()},this.copyTextureToTexture3D=function(A,Y,ee=null,ne=null,W=0){return no('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,Y,ee,ne,W)},this.initRenderTarget=function(A){Fe.get(A).__webglFramebuffer===void 0&&ct.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ct.setTextureCube(A,0):A.isData3DTexture?ct.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ct.setTexture2DArray(A,0):ct.setTexture2D(A,0),$e.unbindTexture()},this.resetState=function(){U=0,k=0,j=null,$e.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}}class D1{constructor(){Qe(this,"ctx",null);Qe(this,"master",null)}unlock(){this.ctx||(this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.gain.value=.2,this.master.connect(this.ctx.destination)),this.ctx.state==="suspended"&&this.ctx.resume()}tone(e,t,r="square",o=.2,l=0){if(!this.ctx||!this.master)return;const u=this.ctx.currentTime,f=this.ctx.createOscillator(),h=this.ctx.createGain();f.type=r,f.frequency.setValueAtTime(e,u),f.frequency.exponentialRampToValueAtTime(Math.max(25,e+l),u+t),h.gain.setValueAtTime(o,u),h.gain.exponentialRampToValueAtTime(.001,u+t),f.connect(h).connect(this.master),f.start(u),f.stop(u+t)}noise(e,t,r){if(!this.ctx||!this.master)return;const o=Math.max(1,this.ctx.sampleRate*e),l=this.ctx.createBuffer(1,o,this.ctx.sampleRate),u=l.getChannelData(0);for(let x=0;x<o;x++)u[x]=(Math.random()*2-1)*Math.pow(1-x/o,2);const f=this.ctx.createBufferSource(),h=this.ctx.createBiquadFilter(),p=this.ctx.createGain();h.type="lowpass",h.frequency.value=r,p.gain.value=t,f.buffer=l,f.connect(h).connect(p).connect(this.master),f.start()}shot(e){const t={ak:[105,.18,.56,2100],m4:[145,.13,.4,2600],awp:[62,.42,.9,1400],pistol:[220,.09,.26,3400],deagle:[90,.23,.63,1900],knife:[620,.08,.12,5e3]}[e.sound];this.noise(t[1],t[2],t[3]),this.tone(t[0],t[1],"sawtooth",t[2]*.35,-t[0]*.55)}reload(){this.tone(880,.045,"square",.13,-260),setTimeout(()=>this.tone(520,.08,"triangle",.16,320),520)}step(){this.noise(.055,.08,620),this.tone(75,.04,"sine",.07,-20)}scope(){this.tone(1260,.045,"triangle",.14,-460)}hit(){this.tone(920,.055,"sine",.12,380)}kill(){this.tone(330,.08,"square",.16,280),setTimeout(()=>this.tone(720,.11,"sine",.14,300),80)}plant(){this.tone(980,.09,"square",.13,-200)}beep(e=!1){this.tone(e?1480:1080,.055,"square",.11,20)}defuse(){this.tone(520,.2,"sine",.17,640)}explode(){this.noise(1.1,1,720),this.tone(48,1.25,"sawtooth",.8,-20)}}const Kn={ak47:{id:"ak47",name:"AK-47",shortName:"AK",slot:"primary",damage:36,fireInterval:.102,magazine:30,reserve:90,reloadTime:2.35,spread:.011,recoil:.024,range:90,automatic:!0,color:6960157,sound:"ak"},m4a4:{id:"m4a4",name:"M4A4",shortName:"M4",slot:"primary",damage:31,fireInterval:.087,magazine:30,reserve:90,reloadTime:2.25,spread:.008,recoil:.014,range:90,automatic:!0,color:2700346,sound:"m4"},awp:{id:"awp",name:"AWP",shortName:"AWP",slot:"primary",damage:112,fireInterval:1.42,magazine:10,reserve:30,reloadTime:3.35,spread:.0012,recoil:.046,range:150,automatic:!1,color:5467189,sound:"awp"},glock:{id:"glock",name:"Glock-18",shortName:"GLOCK",slot:"secondary",damage:23,fireInterval:.155,magazine:20,reserve:120,reloadTime:1.95,spread:.018,recoil:.012,range:55,automatic:!1,color:3422266,sound:"pistol"},usp:{id:"usp",name:"USP-S",shortName:"USP",slot:"secondary",damage:27,fireInterval:.17,magazine:12,reserve:48,reloadTime:2.05,spread:.009,recoil:.009,range:65,automatic:!1,color:2435370,sound:"pistol"},deagle:{id:"deagle",name:"Desert Eagle",shortName:"DEAGLE",slot:"secondary",damage:54,fireInterval:.32,magazine:7,reserve:35,reloadTime:2.15,spread:.013,recoil:.032,range:75,automatic:!1,color:10790304,sound:"deagle"},knife:{id:"knife",name:"Tactical Knife",shortName:"KNIFE",slot:"melee",damage:58,fireInterval:.58,magazine:1,reserve:0,reloadTime:0,spread:.04,recoil:.004,range:2.15,automatic:!1,color:11450555,sound:"knife"}},sc=s=>({id:s,ammo:Kn[s].magazine,reserve:Kn[s].reserve});function I1(s,e,t=!1){const r=s.team==="T"?"glock":"usp";s.inventory={secondary:sc(r),melee:sc("knife")},e||(s.inventory.primary=sc(t?"awp":s.team==="T"?"ak47":"m4a4")),s.activeSlot=e?"secondary":"primary",s.armor=e?0:100}function U1(s,e){const t=Kn[e];s.inventory[t.slot]=sc(e),s.activeSlot=t.slot}function zn(s){return s.inventory[s.activeSlot]??s.inventory.secondary??s.inventory.melee}function N1(s,e){s.inventory[e]&&(s.activeSlot=e)}const Kl={skin:new tn({color:12157531,roughness:.82}),boot:new tn({color:1513754,roughness:.9}),dark:new tn({color:2107178,roughness:.78})};function Qr(s,e,t,r){const o=new ht(s,e);return o.castShadow=!0,o.receiveShadow=!0,o.userData.agentId=r,o.userData.zone=t,o}function F1(s,e){const t=new Ki;t.name=`${e}-${s}`;const r=[],o=new tn({color:e==="CT"?3035751:8081970,roughness:.88}),l=new tn({color:e==="CT"?1518908:3352094,roughness:.82}),u=Qr(new Dt(.72,.82,.38),o,"chest",s);u.position.y=1.25,r.push(u),t.add(u);const f=Qr(new Dt(.62,.42,.34),l,"abdomen",s);f.position.y=.66,r.push(f),t.add(f);const h=Qr(new co(.22,12,8),Kl.skin,"head",s);h.position.y=1.89,r.push(h),t.add(h);const p=new ht(new co(.235,12,6,0,Math.PI*2,0,Math.PI*.58),e==="CT"?Kl.dark:l);p.position.y=1.93,p.castShadow=!0,t.add(p);const x=new Dt(.19,.68,.2),_=Qr(x,o,"arm",s);_.position.set(-.47,1.27,-.18),_.rotation.x=-1,_.rotation.z=-.13;const g=Qr(x,o,"arm",s);g.position.set(.47,1.27,-.18),g.rotation.x=-1.08,g.rotation.z=.13,r.push(_,g),t.add(_,g);const S=new ht(new Dt(.2,.2,.2),Kl.skin);S.position.set(-.46,1.05,-.48),t.add(S);const E=S.clone();E.position.x=.46,t.add(E);const T=new Dt(.25,.72,.27),y=Qr(T,o,"leg",s);y.position.set(-.2,.22,0);const v=Qr(T,o,"leg",s);v.position.set(.2,.22,0),r.push(y,v),t.add(y,v);const F=new ht(new Dt(.27,.17,.39),Kl.boot);F.position.set(-.2,-.17,-.06),t.add(F);const P=F.clone();P.position.x=.2,t.add(P);const C=new ht(new Dt(.78,.58,.43),l);if(C.position.set(0,1.25,.01),t.add(C),e==="CT"){const U=new ht(new Dt(.32,.08,.08),new tn({color:1451310,metalness:.45}));U.position.set(0,1.93,-.205),t.add(U)}else{const U=new ht(new Dt(.42,.22,.38),new tn({color:11108940,roughness:1}));U.position.set(0,1.68,0),t.add(U)}const N=Vd(e==="T"?"ak47":"m4a4",!1);return N.name="heldWeapon",N.position.set(.06,1.18,-.65),N.scale.setScalar(.72),t.add(N),{group:t,hitMeshes:r}}function Zl(s,e=.25){return new tn({color:s,roughness:.58,metalness:e})}function Vd(s,e){const t=Kn[s],r=new Ki,o=Zl(t.color),l=Zl(1382169,.6),u=Zl(5988964,.7),f=t.slot==="secondary",h=s==="knife",p=h?.75:f?.58:s==="awp"?1.55:1.15;if(h){const x=new ht(new Dt(.08,.035,.65),u);x.rotation.x=-.08,x.position.z=-.28,r.add(x);const _=new ht(new Od(.065,.23,4),u);_.rotation.x=-Math.PI/2,_.position.z=-.72,r.add(_);const g=new ht(new Dt(.13,.13,.34),l);g.position.z=.2,r.add(g)}else{const x=new ht(new Dt(f?.2:.24,f?.25:.27,p*.55),o);x.position.z=-.14,r.add(x);const _=new ht(new da(f?.035:.045,f?.035:.05,p*.58,8),l);_.rotation.x=Math.PI/2,_.position.set(0,.055,-p*.55),r.add(_);const g=new ht(new Dt(.16,.34,.18),l);if(g.position.set(0,-.25,f?.04:.12),g.rotation.x=-.18,r.add(g),!f){const E=new ht(new Dt(.16,.42,.22),s==="ak47"?o:l);E.position.set(0,-.26,-.15),E.rotation.x=s==="ak47"?-.25:0,r.add(E);const T=new ht(new Dt(.2,.22,.42),s==="ak47"?o:l);T.position.z=.52,T.rotation.x=.08,r.add(T)}if(s==="awp"){const E=new ht(new da(.105,.105,.48,12),l);E.rotation.z=Math.PI/2,E.position.set(0,.23,-.12),r.add(E);const T=new ht(new Fd(.09,12),Zl(3432296,.8));T.rotation.y=Math.PI/2,T.position.set(.245,.23,-.12),r.add(T)}const S=new ht(new Dt(.055,.09,.06),l);S.position.set(0,.2,-p*.51),r.add(S)}return e&&(r.rotation.y=0,r.traverse(x=>{x.renderOrder=4})),r}class O1{constructor(e){Qe(this,"group",new Ki);Qe(this,"weapon",null);Qe(this,"weaponId",null);Qe(this,"recoil",0);Qe(this,"time",0);Qe(this,"hands",[]);e.add(this.group);const t=new tn({color:12157531,roughness:.9,depthTest:!1}),r=new tn({color:2505028,roughness:.9,depthTest:!1}),o=new ht(new Dt(.16,.17,.66),r);o.position.set(-.29,-.28,-.59),o.rotation.x=-1.24,o.rotation.z=-.1;const l=o.clone();l.position.x=.31,l.rotation.z=.1;const u=new ht(new Dt(.17,.16,.22),t);u.position.set(-.29,-.27,-.93);const f=u.clone();f.position.x=.31,this.hands=[o,l,u,f],this.group.add(...this.hands)}setWeapon(e){if(this.weaponId===e)return;this.weapon&&this.group.remove(this.weapon),this.weaponId=e,this.weapon=Vd(e,!0),this.weapon.position.set(.14,-.22,-.78),this.weapon.scale.setScalar(.78),this.group.add(this.weapon);const t=e==="knife";this.hands[0].position.x=t?.12:-.29,this.hands[2].position.x=t?.12:-.29}kick(e){this.recoil=Math.min(.18,this.recoil+e*2.3)}update(e,t,r){this.time+=e,this.recoil=Hn.damp(this.recoil,0,13,e);const o=t?Math.sin(this.time*10)*.009:0;this.group.position.set(0,o,this.recoil),this.group.rotation.x=this.recoil*1.7,this.group.visible=!r}}function Lf(s){var r;const e=s.group.getObjectByName("heldWeapon");e&&s.group.remove(e);const t=Vd(((r=s.inventory[s.activeSlot])==null?void 0:r.id)??"knife",!1);t.name="heldWeapon",t.position.set(.06,1.18,-.65),t.scale.setScalar(.72),s.group.add(t)}const Ql={minX:-52,maxX:52,minZ:-48,maxZ:62},Gd=[{id:"A",center:new H(-32,0,-27),radius:7.2},{id:"B",center:new H(32,0,-28),radius:7.2}],Pn=(s,e)=>new H(s,0,e),Zn=[{id:0,name:"T 出生点",position:Pn(0,54),links:[1,5,9]},{id:1,name:"A 大入口",position:Pn(-27,46),links:[0,2]},{id:2,name:"A 大",position:Pn(-43,19),links:[1,3]},{id:3,name:"A 大斜坡",position:Pn(-42,-13),links:[2,4]},{id:4,name:"A 点",position:Pn(-32,-27),links:[3,8,13]},{id:5,name:"中路上段",position:Pn(-2,31),links:[0,6,9]},{id:6,name:"中路",position:Pn(1,11),links:[5,7,8,10]},{id:7,name:"中门",position:Pn(2,-7),links:[6,12]},{id:8,name:"猫道",position:Pn(-17,-9),links:[6,4]},{id:9,name:"B 洞外",position:Pn(23,43),links:[0,5,10]},{id:10,name:"B 洞",position:Pn(37,20),links:[9,6,11]},{id:11,name:"B 洞出口",position:Pn(34,-10),links:[10,14]},{id:12,name:"CT 出生点",position:Pn(6,-38),links:[7,13,14]},{id:13,name:"A 回防",position:Pn(-17,-36),links:[12,4]},{id:14,name:"B 点",position:Pn(32,-28),links:[12,11]}];function k1(s){const e=new Ki;e.name="Dust II procedural map",s.add(e);const t=[],r=[],o=new tn({color:13149807,roughness:.92}),l=new tn({color:11109721,roughness:.92}),u=new tn({color:13678473,roughness:.86}),f=new tn({color:6114619,roughness:1}),h=new tn({color:7357994,roughness:.86}),p=new ht(new ma(112,122),o);p.rotation.x=-Math.PI/2,p.receiveShadow=!0,e.add(p);const x=new Nx(new Dt(2.7,.025,2.7),new tn({color:12359779,roughness:1}),230),_=new nn;for(let P=0;P<230;P++)_.position.set(-49+P%23*4.45+P%3*.1,.008,-44+Math.floor(P/23)*10.2),_.rotation.y=P%5*.012,_.updateMatrix(),x.setMatrixAt(P,_.matrix);e.add(x);function g(P,C,N,U,k=5,j=l,b=!0,R=!0){const I=new ht(new Dt(N,k,U),j);if(I.position.set(P,k/2,C),I.castShadow=!0,I.receiveShadow=!0,e.add(I),b){const ie={box:new Pr().setFromObject(I),mesh:I,minimap:R};t.push(ie),r.push(I)}return I}g(-54,7,4,114,8),g(54,7,4,114,8),g(0,-50,108,4,8),g(0,64,108,4,8),[[-48,54,10,13],[-43,42,9,18],[-47,-38,9,17],[-5,-44,18,9],[20,-44,14,9],[47,-39,10,18],[46,50,12,15],[32,58,18,8]].forEach(([P,C,N,U],k)=>g(P,C,N,U,7+k%3*2,k%2?u:l)),g(-30,51,23,3,5),g(-17,37,3,20,6),g(-48,3,3,33,6),g(-35,7,3,22,5),g(-47,-8,2,2.5,4,u),g(-12,27,3,26,5),g(9,27,3,25,5),g(-14,4,10,3,5),g(-1.5,4,1,3,5),g(13,4,13,3,5),g(-26,-4,3,25,5),g(-13,-18,12,3,4);const S=g(-17,-8,16,5.5,.38,new tn({color:11832664,roughness:1}),!1);S.position.y=.18;for(let P=0;P<7;P++)g(-10.5-P*2.1,-11.1-P*.5,2.1,1.1,.18+P*.07,u,!1,!1);g(-7.8,-7.2,9,1.2,5.6,l),g(11.8,-7.2,9,1.2,5.6,l);const E=g(-2.4,-7.15,4.2,.38,4.4,h),T=g(6.4,-7.15,4.2,.38,4.4,h);E.rotation.y=-.18,T.rotation.y=.18,t[t.length-2].box.setFromObject(E),t[t.length-1].box.setFromObject(T),v(E),v(T),g(-42,-34,3,19,5),g(-26,-39,28,3,5),g(-21,-26,3,11,5),y(-35,-25,2,2),y(-30.5,-30,2.4,1.8),y(-38,-30.5,1.7,1.7),g(16,59,3,7,6),g(16,38,3,9,6),g(34,51,3,18,6),g(20,34,12,3,5),g(42,34,16,3,5),g(29,20,3,25,5),g(48,13,3,43,6),g(31,1,4,3,5),g(44,-5,3,13,5);for(let P=25;P>=8;P-=4)g(38.5,P,18,.55,.55,f,!1,!1).position.y=4.7;g(38.5,2,5.2,.7,1.3,l,!1).position.y=4.35,g(19,-18,3,24,5),g(45,-27,3,25,5),g(32,-41,29,3,5),g(23,-14,7,2.5,5),g(40,-14,8,2.5,5),y(34,-29,2,2.2),y(39,-34,2.2,2.2),y(26,-33,1.8,1.8),g(-1,-29,4,3,4.5),g(8,-29,4,3,4.5),g(10,-19,3,13,5),g(-5,-45,3,8,5),y(5,-37,2.2,1.8),y(15,-34,2.1,2.1);function y(P,C,N,U){const k=g(P,C,N,U,2.2,h),j=new tn({color:3221536,roughness:.75}),b=new ht(new Dt(N+.035,.13,U+.04),j);b.position.set(P,.55,C);const R=b.clone();return R.position.y=1.72,e.add(b,R),k}function v(P){const C=new tn({color:2433307,metalness:.5,roughness:.5});for(let N=.55;N<4;N+=.72){const U=new ht(new Dt(.1,.1,.09),C);U.position.set(P.position.x,N,P.position.z-.24),e.add(U)}}for(const P of Gd){const C=new ht(new kd(3.25,3.48,48),new ss({color:13915185,side:Ci}));C.rotation.x=-Math.PI/2,C.position.copy(P.center).setY(.035),e.add(C);const N=bg(P.id,"#e85b36",1.2);N.position.copy(P.center).add(new H(0,.15,0)),e.add(N)}[["T SPAWN",0,57],["LONG A",-43,12],["A SITE",-32,-22],["MID",1,13],["MID DOORS",2,-10],["CATWALK",-18,-10],["B TUNNELS",38,18],["B SITE",32,-24],["CT SPAWN",6,-43]].forEach(([P,C,N])=>{const U=bg(P,"#403625",.45);U.position.set(C,.08,N),U.rotation.x=-Math.PI/2,e.add(U)});for(let P=-46;P<=46;P+=9){const C=g(P,61.2,2.6,1.2,1.4,u,!1,!1);C.position.y=6.8}return{group:e,colliders:t,raycastMeshes:r}}function bg(s,e,t=1){const r=document.createElement("canvas");r.width=512,r.height=128;const o=r.getContext("2d");o.font="900 64px Arial",o.textAlign="center",o.textBaseline="middle",o.fillStyle=e,o.fillText(s,256,64);const l=new zx(r);l.colorSpace=Vn;const u=new Dx(new e0({map:l,transparent:!0,depthWrite:!1}));return u.scale.set(6*t,1.5*t,1),u}function Df(s){for(const e of Gd)if(s.distanceToSquared(e.center)<e.radius*e.radius)return e.id;return null}function B1(s){let e=Zn[0],t=1/0;for(const r of Zn){const o=r.position.distanceToSquared(s);o<t&&(t=o,e=r)}return e.name}function Pg(s){let e=0,t=1/0;for(const r of Zn){const o=r.position.distanceToSquared(s);o<t&&(t=o,e=r.id)}return e}function z1(s,e){const t=Pg(s),r=Pg(e),o=new Set([t]),l=new Map,u=new Map([[t,0]]),f=new Map([[t,Zn[t].position.distanceTo(Zn[r].position)]]);for(;o.size;){let h=[...o].sort((p,x)=>(f.get(p)??1/0)-(f.get(x)??1/0))[0];if(h===r){const p=[h];for(;l.has(h);)h=l.get(h),p.unshift(h);return p}o.delete(h);for(const p of Zn[h].links){const x=(u.get(h)??1/0)+Zn[h].position.distanceTo(Zn[p].position);x<(u.get(p)??1/0)&&(l.set(p,h),u.set(p,x),f.set(p,x+Zn[p].position.distanceTo(Zn[r].position)),o.add(p))}}return[t,r]}const H1=["Rook","Viper","Kestrel","Nomad","Ghost"],V1=["Atlas","Bishop","Sable","Mako","Cipher"],G1={head:2,chest:1,abdomen:.84,arm:.66,leg:.55};new H(0,1,0);class W1{constructor(e,t){Qe(this,"container");Qe(this,"listener");Qe(this,"scene",new Px);Qe(this,"camera",new Qn(74,1,.05,180));Qe(this,"renderer",new L1({antialias:!0,powerPreference:"high-performance"}));Qe(this,"clock",new qx);Qe(this,"map",k1(this.scene));Qe(this,"agents",[]);Qe(this,"hitObjects",[]);Qe(this,"viewModel");Qe(this,"audio",new D1);Qe(this,"bomb");Qe(this,"phase","ready");Qe(this,"mode","pistol");Qe(this,"playerTeam","CT");Qe(this,"controlledId",5);Qe(this,"round",1);Qe(this,"roundTime",120);Qe(this,"score",{T:0,CT:0});Qe(this,"banner","");Qe(this,"roundResetAt",0);Qe(this,"keys",new Set);Qe(this,"fireHeld",!1);Qe(this,"triggerLatched",!1);Qe(this,"useHeld",!1);Qe(this,"scoped",!1);Qe(this,"recoilSpread",0);Qe(this,"actionLabel","");Qe(this,"actionProgress",0);Qe(this,"killfeed",[]);Qe(this,"killSerial",0);Qe(this,"lastSnapshot",0);Qe(this,"lastStep",0);Qe(this,"raf",0);Qe(this,"disposed",!1);Qe(this,"flash");Qe(this,"previewAngle",0);Qe(this,"lastFrameTime",performance.now()/1e3);Qe(this,"bombTarget","A");Qe(this,"resize",()=>{const e=this.container.clientWidth||innerWidth,t=this.container.clientHeight||innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)});Qe(this,"onKeyDown",e=>{if(this.keys.add(e.code),["Space","KeyE"].includes(e.code)&&e.preventDefault(),this.phase==="ready"||document.pointerLockElement!==this.renderer.domElement){if(e.code==="Escape")return;this.phase!=="ready"&&this.requestLock()}const t=this.agents[this.controlledId];if(t){if(!t.alive&&e.code==="KeyE"){this.takeOverNext();return}if(!t.alive&&e.code==="KeyQ"){this.spectateNext();return}e.code==="Digit1"&&this.changeSlot("primary"),e.code==="Digit2"&&this.changeSlot("secondary"),e.code==="Digit3"&&this.changeSlot("melee"),this.mode==="rifle"&&e.code==="Digit4"&&this.practiceEquip("ak47"),this.mode==="rifle"&&e.code==="Digit5"&&this.practiceEquip("m4a4"),this.mode==="rifle"&&e.code==="Digit6"&&this.practiceEquip("awp"),this.mode==="rifle"&&e.code==="Digit7"&&this.practiceEquip("deagle"),e.code==="KeyR"&&this.reload(t),e.code==="KeyE"&&(this.useHeld=!0)}});Qe(this,"onKeyUp",e=>{this.keys.delete(e.code),e.code==="KeyE"&&(this.useHeld=!1)});Qe(this,"onMouseMove",e=>{if(document.pointerLockElement!==this.renderer.domElement||this.phase!=="live")return;const t=this.agents[this.controlledId];t!=null&&t.alive&&(t.yaw-=e.movementX*.00175,t.pitch-=e.movementY*.00155,t.pitch=Hn.clamp(t.pitch,-1.45,1.45))});Qe(this,"onMouseDown",e=>{if(!(e.target!==this.renderer.domElement&&document.pointerLockElement!==this.renderer.domElement)){if(this.audio.unlock(),document.pointerLockElement!==this.renderer.domElement){this.requestLock();return}e.button===0&&(this.fireHeld=!0,this.triggerLatched=!1,this.fireControlled()),e.button===2&&this.toggleScope()}});Qe(this,"onMouseUp",e=>{e.button===0&&(this.fireHeld=!1,this.triggerLatched=!1)});Qe(this,"onContextMenu",e=>e.preventDefault());Qe(this,"loop",()=>{if(this.disposed)return;this.raf=requestAnimationFrame(this.loop);const e=performance.now()/1e3,t=Math.min(.04,e-this.lastFrameTime);this.lastFrameTime=e,this.phase==="ready"?this.updatePreview(t):(this.phase==="live"?this.updateGame(t,e):e>=this.roundResetAt&&(this.round++,this.resetRound()),this.updateCamera(t)),this.flash.intensity=Hn.damp(this.flash.intensity,0,25,t),this.renderer.render(this.scene,this.camera),e-this.lastSnapshot>.08&&(this.lastSnapshot=e,this.publish())});this.container=e,this.listener=t,this.scene.background=new yt(9156043),this.scene.fog=new Ud(11124932,.006),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ig,this.renderer.outputColorSpace=Vn,this.renderer.toneMapping=Ng,this.renderer.toneMappingExposure=1.05,e.appendChild(this.renderer.domElement),this.camera.rotation.order="YXZ",this.scene.add(this.camera),this.viewModel=new O1(this.camera),this.flash=new Tf(16757594,0,5),this.camera.add(this.flash),this.flash.position.set(.15,-.12,-1),this.scene.add(new Gx(13428735,7361586,2.3));const r=new jx(16769973,3.7);r.position.set(-30,58,28),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.camera.left=-70,r.shadow.camera.right=70,r.shadow.camera.top=70,r.shadow.camera.bottom=-70,r.shadow.camera.far=150,this.scene.add(r);const o=new ht(new co(155,20,12),new ss({color:8564423,side:Dn}));o.position.y=20,this.scene.add(o),this.bomb=this.createBomb(),this.installEvents(),this.resize(),this.publish(),this.loop()}start(e){this.audio.unlock(),this.mode=e.mode,this.playerTeam=e.team,this.score={T:0,CT:0},this.round=1,this.agents.length||this.createAgents(),this.controlledId=e.team==="T"?0:5,this.resetRound(),this.requestLock()}requestLock(){this.audio.unlock();const e=this.renderer.domElement.requestPointerLock();e&&typeof e.catch=="function"&&e.catch(()=>{})}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.resize),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.onMouseUp),document.removeEventListener("contextmenu",this.onContextMenu),this.renderer.dispose(),this.renderer.domElement.remove()}createAgents(){const e=(t,r,o)=>{const l=F1(t,r);this.scene.add(l.group);const u={id:t,team:r,name:o,isBot:!0,alive:!0,hp:100,armor:0,position:new H,velocity:new H,yaw:r==="T"?Math.PI:0,pitch:0,group:l.group,hitMeshes:l.hitMeshes,inventory:{},activeSlot:"secondary",lastShot:-10,reloadUntil:0,hasBomb:!1,visibleToPlayer:!1,ai:{state:"patrol",targetId:null,navPath:[],navCursor:0,repathAt:0,actionProgress:0,aimError:.08+Math.random()*.08,waypoint:0}};this.agents.push(u),this.hitObjects.push(...l.hitMeshes)};H1.forEach((t,r)=>e(r,"T",t)),V1.forEach((t,r)=>e(r+5,"CT",t))}resetRound(){this.phase="live",this.banner="",this.roundTime=120,this.scoped=!1,this.recoilSpread=0,this.bombTarget=Math.random()>.5?"A":"B",this.agents.forEach((r,o)=>{r.alive=!0,r.hp=100,r.velocity.set(0,0,0),r.hasBomb=!1,r.group.visible=!0,r.position.copy(r.team==="T"?new H(-3+o%5*1.5,0,54+o%2*1.6):new H(2+o%5*1.8,0,-38+o%2*1.5)),r.yaw=r.team==="T"?Math.PI:0,r.pitch=0,r.lastShot=-10,r.reloadUntil=0,r.ai={state:"patrol",targetId:null,navPath:[],navCursor:0,repathAt:0,actionProgress:0,aimError:.055+Math.random()*.1,waypoint:0},I1(r,this.mode==="pistol",!this.mode.includes("pistol")&&(o===2||o===7)),Lf(r),r.group.position.copy(r.position)});const e=this.agents.filter(r=>r.team==="T"),t=e[Math.floor(Math.random()*e.length)];t.hasBomb=!0,this.bomb.carrierId=t.id,this.bomb.state="carried",this.bomb.site=null,this.bomb.timer=40,this.bomb.beepAt=0,this.bomb.mesh.visible=!1,this.bomb.position.copy(t.position),this.setControlled(this.playerTeam==="T"?0:5),this.publish()}setControlled(e){const t=this.agents[this.controlledId];t&&(t.isBot=t.alive,t.group.visible=t.alive),this.controlledId=e;const r=this.agents[e];r.isBot=!1,r.group.visible=!1,this.scoped=!1,this.viewModel.setWeapon(zn(r).id)}createBomb(){const e=new Ki;e.visible=!1;const t=new ht(new Dt(.42,.18,.3),new tn({color:3357228,roughness:.8})),r=new ht(new Dt(.18,.08,.015),new ss({color:6094676}));r.position.set(0,.03,-.158),e.add(t,r);const o=[16729656,15978293,4027903].map((u,f)=>{const h=new ht(new Bd(.13+f*.025,.012,5,12,Math.PI),new ss({color:u}));return h.rotation.x=Math.PI/2,h.position.set(0,.12,.02+f*.035),h});e.add(...o);const l=new Tf(16721173,0,3);return l.name="bombLight",l.position.y=.25,e.add(l),this.scene.add(e),{state:"carried",carrierId:null,position:new H,site:null,timer:40,beepAt:0,mesh:e}}installEvents(){window.addEventListener("resize",this.resize),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.onMouseUp),document.addEventListener("contextmenu",this.onContextMenu)}changeSlot(e){const t=this.agents[this.controlledId];t!=null&&t.alive&&(N1(t,e),this.scoped=!1,this.viewModel.setWeapon(zn(t).id),Lf(t),this.publish())}practiceEquip(e){const t=this.agents[this.controlledId];t!=null&&t.alive&&(U1(t,e),this.scoped=!1,this.viewModel.setWeapon(e),Lf(t),this.publish())}toggleScope(){const e=this.agents[this.controlledId];!(e!=null&&e.alive)||zn(e).id!=="awp"||(this.scoped=!this.scoped,this.audio.scope())}reload(e){const t=zn(e),r=Kn[t.id],o=performance.now()/1e3;!e.alive||r.slot==="melee"||t.ammo>=r.magazine||t.reserve<=0||e.reloadUntil>o||(e.reloadUntil=o+r.reloadTime,this.scoped=!1,e.id===this.controlledId&&this.audio.reload())}updatePreview(e){this.previewAngle+=e*.09,this.camera.position.set(Math.sin(this.previewAngle)*53,44,Math.cos(this.previewAngle)*53+5),this.camera.lookAt(0,0,3),this.viewModel.group.visible=!1}updateGame(e,t){this.roundTime-=e;const r=this.agents[this.controlledId];r!=null&&r.alive&&this.updatePlayer(r,e,t),this.completeReloads(t);for(const o of this.agents)o.alive&&o.id!==this.controlledId&&this.updateAI(o,e,t);this.updateBomb(e,t),this.updateVisibility(),this.checkRoundEnd(),this.roundTime<=0&&this.bomb.state!=="planted"&&this.endRound("CT","时间耗尽 · CT 守住阵地")}updatePlayer(e,t,r){const o=new H(-Math.sin(e.yaw),0,-Math.cos(e.yaw)),l=new H(Math.cos(e.yaw),0,-Math.sin(e.yaw)),u=new H;this.keys.has("KeyW")&&u.add(o),this.keys.has("KeyS")&&u.sub(o),this.keys.has("KeyD")&&u.add(l),this.keys.has("KeyA")&&u.sub(l);const f=u.lengthSq()>0;f&&u.normalize().multiplyScalar(zn(e).id==="knife"?7.1:this.scoped?3:5.8),e.velocity.x=Hn.damp(e.velocity.x,u.x,f?18:12,t),e.velocity.z=Hn.damp(e.velocity.z,u.z,f?18:12,t),this.keys.has("Space")&&e.position.y<=.001&&(e.velocity.y=6.2),e.velocity.y-=17.5*t,this.moveAgent(e,e.velocity.x*t,e.velocity.z*t),e.position.y=Math.max(0,e.position.y+e.velocity.y*t),e.position.y<=0&&(e.velocity.y=0),e.group.position.copy(e.position),e.group.rotation.y=e.yaw,f&&e.position.y===0&&r-this.lastStep>.34&&(this.lastStep=r,this.audio.step()),this.fireHeld&&Kn[zn(e).id].automatic&&this.fireControlled(),this.recoilSpread=Hn.damp(this.recoilSpread,f?.008:0,5,t),this.handlePlayerObjective(e,t),this.viewModel.update(t,f,this.scoped)}moveAgent(e,t,r){const l=e.position.clone();l.x+=t,this.collides(l,.4)||(e.position.x=l.x);const u=e.position.clone();u.z+=r,this.collides(u,.4)||(e.position.z=u.z),e.position.x=Hn.clamp(e.position.x,Ql.minX+1,Ql.maxX-1),e.position.z=Hn.clamp(e.position.z,Ql.minZ+1,Ql.maxZ-1)}collides(e,t){for(const{box:r}of this.map.colliders){if(r.max.y<e.y+.1||r.min.y>e.y+1.7)continue;const o=Hn.clamp(e.x,r.min.x,r.max.x),l=Hn.clamp(e.z,r.min.z,r.max.z);if((e.x-o)*(e.x-o)+(e.z-l)*(e.z-l)<t*t)return!0}return!1}fireControlled(){const e=this.agents[this.controlledId];if(!(e!=null&&e.alive)||this.phase!=="live")return;const t=zn(e),r=Kn[t.id],o=performance.now()/1e3;if(!r.automatic&&this.triggerLatched||(this.triggerLatched=!0,e.reloadUntil>o||o-e.lastShot<r.fireInterval))return;if(t.ammo<=0){this.reload(e);return}e.lastShot=o,r.slot!=="melee"&&t.ammo--,this.audio.shot(r),this.flash.intensity=r.id==="awp"?7:3.2;const l=new H;this.camera.getWorldDirection(l);const u=r.spread+this.recoilSpread+(e.position.y>0?.025:0)+(!this.scoped&&r.id==="awp"?.075:0);l.x+=(Math.random()-.5)*u,l.y+=(Math.random()-.5)*u,l.z+=(Math.random()-.5)*u,l.normalize(),this.castShot(e,this.camera.getWorldPosition(new H),l,r.range,t.id),e.pitch=Math.min(1.45,e.pitch+r.recoil*(.75+Math.random()*.5)),this.recoilSpread=Math.min(.1,this.recoilSpread+r.recoil*.52),this.viewModel.kick(r.recoil),r.id==="awp"&&(this.scoped=!1)}castShot(e,t,r,o,l){const u=new ng(t,r,0,o),f=[...this.map.raycastMeshes,...this.hitObjects.filter(x=>{const _=this.agents[x.userData.agentId];return(_==null?void 0:_.alive)&&_.id!==e.id})],h=u.intersectObjects(f,!1)[0];if(this.spawnTracer(t,(h==null?void 0:h.point)??t.clone().addScaledVector(r,o),Kn[l].color),!(h!=null&&h.object.userData.zone))return;const p=this.agents[h.object.userData.agentId];!p||p.team===e.team||!p.alive||this.damage(p,e,l,h.object.userData.zone)}spawnTracer(e,t,r){const o=[e.clone(),t.clone()],l=new Bx(new In().setFromPoints(o),new n0({color:r===1382169?16765057:16773040,transparent:!0,opacity:.7}));this.scene.add(l),setTimeout(()=>{this.scene.remove(l),l.geometry.dispose(),l.material.dispose()},42)}damage(e,t,r,o){let u=Kn[r].damage*G1[o]*(.94+Math.random()*.12);if(e.armor>0&&o!=="leg"){const f=u*.28;u*=.72,e.armor=Math.max(0,e.armor-f*.65)}e.hp-=u,t.id===this.controlledId&&this.audio.hit(),e.hp<=0&&this.kill(e,t,r,o==="head")}kill(e,t,r,o){e.hp=0,e.alive=!1,e.group.visible=!1,e.velocity.set(0,0,0),e.hasBomb&&(e.hasBomb=!1,this.bomb.state="dropped",this.bomb.carrierId=null,this.bomb.position.copy(e.position),this.bomb.position.y=.12,this.bomb.mesh.position.copy(this.bomb.position),this.bomb.mesh.visible=!0),this.killfeed.unshift({id:++this.killSerial,killer:t.name,victim:e.name,weapon:Kn[r].shortName,headshot:o,team:t.team}),this.killfeed=this.killfeed.slice(0,5),t.id===this.controlledId&&this.audio.kill(),e.id===this.controlledId&&(this.scoped=!1,this.banner="你已阵亡 · E 接管队友 / Q 切换视角")}completeReloads(e){for(const t of this.agents)if(t.reloadUntil&&e>=t.reloadUntil){const r=zn(t),o=Kn[r.id],l=Math.min(o.magazine-r.ammo,r.reserve);r.ammo+=l,r.reserve-=l,t.reloadUntil=0}}updateAI(e,t,r){const o=this.findVisibleEnemy(e);o?(e.ai.state="engage",e.ai.targetId=o.id,this.aiEngage(e,o,t,r)):(e.ai.targetId=null,this.aiObjective(e,t,r)),e.group.position.copy(e.position),e.group.rotation.y=e.yaw}findVisibleEnemy(e){const t=zn(e).id==="awp"?55:31;let r=null,o=t*t;for(const l of this.agents){if(!l.alive||l.team===e.team)continue;const u=e.position.distanceToSquared(l.position);if(u>=o)continue;const f=l.position.clone().sub(e.position).normalize();new H(-Math.sin(e.yaw),0,-Math.cos(e.yaw)).dot(f)<-.2&&e.ai.state!=="engage"||this.lineClear(e.position.clone().add(new H(0,1.55,0)),l.position.clone().add(new H(0,1.25,0)))&&(r=l,o=u)}return r}lineClear(e,t){const r=t.clone().sub(e),o=r.length();return new ng(e,r.normalize(),0,o).intersectObjects(this.map.raycastMeshes,!1).length===0}aiEngage(e,t,r,o){const l=t.position.clone().sub(e.position),u=l.length(),f=Math.atan2(-l.x,-l.z);e.yaw=this.lerpAngle(e.yaw,f,Math.min(1,r*7)),u>(zn(e).id==="awp"?22:12)?this.aiMoveToward(e,t.position,r,.48):Math.random()<.018&&this.moveAgent(e,Math.cos(e.yaw)*(Math.random()-.5),-Math.sin(e.yaw)*(Math.random()-.5));const h=zn(e),p=Kn[h.id];if(h.ammo===0){this.reload(e);return}if(e.reloadUntil>o||o-e.lastShot<p.fireInterval*(p.automatic?1.35:1.7))return;e.lastShot=o,p.slot!=="melee"&&h.ammo--,e.position.distanceTo(this.agents[this.controlledId].position)<42&&this.audio.shot(p);const x=e.position.clone().add(new H(0,1.5,0)),_=t.position.clone().add(new H(0,zn(e).id==="awp"?1.38:1.2,0)).sub(x).normalize(),g=e.ai.aimError*Hn.clamp(u/28,.35,1.2);_.x+=(Math.random()-.5)*g,_.y+=(Math.random()-.5)*g,_.z+=(Math.random()-.5)*g,_.normalize(),this.castShot(e,x,_,p.range,h.id)}aiObjective(e,t,r){let o;if(this.bomb.state==="planted"&&e.team==="CT"){if(e.ai.state="defuse",o=this.bomb.position,e.position.distanceTo(o)<1.35){e.ai.actionProgress+=t,e.ai.actionProgress>=5&&(this.bomb.state="defused",this.audio.defuse(),this.endRound("CT","炸弹已拆除 · CT 胜利"));return}}else if(this.bomb.state==="dropped"&&e.team==="T")e.ai.state="pickup",o=this.bomb.position;else if(e.team==="T"&&e.hasBomb){if(e.ai.state="plant",o=Gd.find(l=>l.id===this.bombTarget).center,Df(e.position)){e.ai.actionProgress+=t,e.ai.actionProgress>=3.1&&this.plantBomb(e,Df(e.position));return}}else{e.ai.state="patrol";const l=this.bombTarget==="A"?[4,8,3]:[14,11,7],u=[4,14,7,13],f=e.team==="T"?l:u;(!e.ai.waypoint||r>e.ai.repathAt+4)&&(e.ai.waypoint=f[(e.id+this.round+Math.floor(r/12))%f.length]),o=Zn[e.ai.waypoint].position}this.aiFollowPath(e,o,t,r)}aiFollowPath(e,t,r,o){(!e.ai.navPath.length||o>e.ai.repathAt)&&(e.ai.navPath=z1(e.position,t),e.ai.navCursor=Math.min(1,e.ai.navPath.length-1),e.ai.repathAt=o+2.4+Math.random());let l=e.ai.navPath.length?Zn[e.ai.navPath[e.ai.navCursor]].position:t;e.position.distanceTo(l)<1.25&&e.ai.navCursor<e.ai.navPath.length-1&&(e.ai.navCursor++,l=Zn[e.ai.navPath[e.ai.navCursor]].position),e.ai.navCursor>=e.ai.navPath.length-1&&e.position.distanceTo(l)<1.5&&(l=t),this.aiMoveToward(e,l,r,1)}aiMoveToward(e,t,r,o){const l=t.clone().sub(e.position);if(l.y=0,l.lengthSq()<.01)return;l.normalize();const u=Math.atan2(-l.x,-l.z);e.yaw=this.lerpAngle(e.yaw,u,Math.min(1,r*5));const f=e.position.clone();this.moveAgent(e,l.x*r*4.25*o,l.z*r*4.25*o),f.distanceToSquared(e.position)<1e-6&&this.moveAgent(e,l.z*r*3.2,-l.x*r*3.2)}lerpAngle(e,t,r){let o=(t-e+Math.PI)%(Math.PI*2)-Math.PI;return o<-Math.PI&&(o+=Math.PI*2),e+o*r}handlePlayerObjective(e,t){if(this.actionLabel="",this.actionProgress=0,!this.useHeld){e.ai.actionProgress=0;return}if(e.team==="T"&&e.hasBomb&&this.bomb.state==="carried"){const r=Df(e.position);if(r){this.actionLabel=`正在安放炸弹 · ${r} 点`,e.ai.actionProgress+=t,this.actionProgress=e.ai.actionProgress/3.1,e.ai.actionProgress>=3.1&&this.plantBomb(e,r);return}}if(e.team==="CT"&&this.bomb.state==="planted"&&e.position.distanceTo(this.bomb.position)<1.5){this.actionLabel="正在拆除炸弹",e.ai.actionProgress+=t,this.actionProgress=e.ai.actionProgress/5,e.ai.actionProgress>=5&&(this.bomb.state="defused",this.audio.defuse(),this.endRound("CT","炸弹已拆除 · CT 胜利"));return}e.ai.actionProgress=0}plantBomb(e,t){e.hasBomb=!1,e.ai.actionProgress=0,this.bomb.state="planted",this.bomb.carrierId=null,this.bomb.site=t,this.bomb.timer=40,this.bomb.position.copy(e.position).setY(.13),this.bomb.mesh.position.copy(this.bomb.position),this.bomb.mesh.visible=!0,this.audio.plant(),this.banner=`炸弹已安放 · ${t} 点`}updateBomb(e,t){if(this.bomb.state==="carried"){const r=this.agents.find(o=>o.id===this.bomb.carrierId);r!=null&&r.alive&&this.bomb.position.copy(r.position)}if(this.bomb.state==="dropped"){for(const r of this.agents)if(r.alive&&r.team==="T"&&r.position.distanceTo(this.bomb.position)<1.15){r.hasBomb=!0,this.bomb.state="carried",this.bomb.carrierId=r.id,this.bomb.mesh.visible=!1,this.audio.plant();break}}if(this.bomb.state==="planted"){this.bomb.timer-=e;const r=Hn.lerp(.16,.92,Hn.clamp(this.bomb.timer/40,0,1));t>=this.bomb.beepAt&&(this.bomb.beepAt=t+r,this.audio.beep(this.bomb.timer<8),this.bomb.mesh.getObjectByName("bombLight").intensity=2.5,setTimeout(()=>{const o=this.bomb.mesh.getObjectByName("bombLight");o&&(o.intensity=0)},80)),this.bomb.mesh.rotation.y+=e*.7,this.bomb.timer<=0&&(this.bomb.state="exploded",this.bomb.mesh.visible=!1,this.audio.explode(),this.explosionVisual(),this.endRound("T","C4 爆炸 · T 胜利"))}}explosionVisual(){const e=new Tf(16738848,32,38);e.position.copy(this.bomb.position).setY(2),this.scene.add(e);const t=new ht(new co(1,16,10),new ss({color:16753190,transparent:!0,opacity:.9}));t.position.copy(this.bomb.position),this.scene.add(t);let r=1;const o=()=>{r+=1.6,t.scale.setScalar(r),t.material.opacity-=.06,e.intensity*=.8,r<16?requestAnimationFrame(o):this.scene.remove(t,e)};o()}updateVisibility(){const e=this.agents.filter(t=>t.alive&&t.team===this.playerTeam);for(const t of this.agents){if(t.team===this.playerTeam){t.visibleToPlayer=!0;continue}t.visibleToPlayer=e.some(r=>r.position.distanceToSquared(t.position)<1444&&this.lineClear(r.position.clone().add(new H(0,1.5,0)),t.position.clone().add(new H(0,1.2,0))))}}checkRoundEnd(){if(this.phase!=="live")return;const e=this.agents.some(r=>r.team==="T"&&r.alive);this.agents.some(r=>r.team==="CT"&&r.alive)?!e&&this.bomb.state!=="planted"&&this.endRound("CT","T 全员阵亡 · CT 胜利"):this.endRound("T","CT 全员阵亡 · T 胜利")}endRound(e,t){this.phase==="live"&&(this.phase="roundEnd",this.score[e]++,this.banner=t,this.scoped=!1,this.roundResetAt=performance.now()/1e3+5)}takeOverNext(){const e=this.agents.filter(r=>r.team===this.playerTeam&&r.alive);if(!e.length)return;const t=e.find(r=>r.id>this.controlledId)??e[0];this.banner=`已接管 ${t.name}`,this.setControlled(t.id)}spectateNext(){const e=this.agents.filter(r=>r.team===this.playerTeam&&r.alive);if(!e.length)return;const t=e.find(r=>r.id>this.controlledId)??e[0];this.controlledId=t.id,this.viewModel.setWeapon(zn(t).id)}updateCamera(e){const t=this.agents[this.controlledId];if(!t)return;if(!t.alive){const o=this.agents.filter(l=>l.team===this.playerTeam&&l.alive);if(o.length){const l=o[0];this.camera.position.lerp(l.position.clone().add(new H(0,3.3,5)),.08),this.camera.lookAt(l.position.clone().add(new H(0,1,0)))}this.viewModel.group.visible=!1;return}this.camera.position.copy(t.position).add(new H(0,1.66,0)),this.camera.rotation.set(t.pitch,t.yaw,0);const r=this.scoped?24:74;this.camera.fov=Hn.damp(this.camera.fov,r,14,e),this.camera.updateProjectionMatrix(),this.viewModel.group.visible=!this.scoped}publish(){var o;const e=this.agents[this.controlledId],t=e?zn(e):{id:"usp",ammo:12,reserve:48},r=Kn[t.id];this.listener({phase:this.phase,mode:this.mode,team:this.playerTeam,round:this.round,time:Math.max(0,this.roundTime),scoreT:this.score.T,scoreCT:this.score.CT,hp:Math.ceil((e==null?void 0:e.hp)??100),armor:Math.ceil((e==null?void 0:e.armor)??0),weapon:t.id,weaponName:r.name,ammo:t.ammo,reserve:t.reserve,reloading:!!(e!=null&&e.reloadUntil),spread:this.recoilSpread,scoped:this.scoped,kills:this.killfeed,actionLabel:this.actionLabel,actionProgress:this.actionProgress,banner:this.banner,location:e?B1(e.position):"TACTICAL MAP",spectator:!!e&&!e.alive,agents:this.agents.map(l=>({id:l.id,name:l.name,team:l.team,alive:l.alive,hp:Math.ceil(l.hp),armor:Math.ceil(l.armor),x:l.position.x,z:l.position.z,yaw:l.yaw,visible:l.visibleToPlayer,controlled:l.id===this.controlledId,hasBomb:l.hasBomb})),bomb:{state:this.bomb.state,x:this.bomb.position.x,z:this.bomb.position.z,site:this.bomb.site,timer:this.bomb.timer,carrierName:this.bomb.carrierId===null?null:((o=this.agents[this.bomb.carrierId])==null?void 0:o.name)??null}})}}const X1={phase:"ready",mode:"pistol",team:"CT",round:1,time:120,scoreT:0,scoreCT:0,hp:100,armor:0,weapon:"usp",weaponName:"USP-S",ammo:12,reserve:48,reloading:!1,spread:0,scoped:!1,agents:[],kills:[],bomb:{state:"carried",x:0,z:54,site:null,timer:40,carrierName:null},actionLabel:"",actionProgress:0,banner:"",location:"TACTICAL MAP",spectator:!1},Js=s=>String(Math.max(0,Math.floor(s))).padStart(2,"0");function j1({game:s}){const e=o=>(o+52)/104*100,t=o=>(o+48)/110*100,r=[[-48,54,10,3],[-41,36,3,31],[-17,39,3,24],[-12,27,3,26],[9,27,3,25],[-10,4,18,3],[13,4,13,3],[-26,-4,3,25],[16,51,3,19],[34,51,3,18],[20,34,12,3],[42,34,16,3],[29,20,3,25],[48,13,3,43],[44,-5,3,13],[19,-18,3,24],[45,-27,3,25],[32,-41,29,3],[-42,-34,3,19],[-26,-39,28,3],[4,-29,12,3]];return Z.jsxs("div",{className:"minimap-shell",children:[Z.jsxs("div",{className:"map-heading",children:[Z.jsx("span",{children:"LIVE MAP"}),Z.jsx("span",{children:s.location})]}),Z.jsxs("svg",{className:"minimap",viewBox:"0 0 100 100",role:"img","aria-label":"Dust2 小地图",children:[Z.jsx("path",{className:"map-route",d:"M49 93 L47 70 L50 51 L48 36 L35 35 L25 17 L18 40 L15 72 M51 50 L50 36 L68 57 L83 60 L81 20 M50 50 L50 36 L56 9 M35 35 L19 19 M50 9 L31 10 M56 9 L81 18"}),r.map((o,l)=>Z.jsx("rect",{className:"map-wall",x:e(o[0]-o[2]/2),y:t(o[1]-o[3]/2),width:o[2]/104*100,height:o[3]/110*100,rx:".5"},l)),Z.jsx("circle",{className:"site-ring",cx:e(-32),cy:t(-27),r:"6.4"}),Z.jsx("text",{className:"site-label",x:e(-32),y:t(-27)+2,children:"A"}),Z.jsx("circle",{className:"site-ring",cx:e(32),cy:t(-28),r:"6.4"}),Z.jsx("text",{className:"site-label",x:e(32),y:t(-28)+2,children:"B"}),s.agents.filter(o=>o.alive&&(o.team===s.team||o.visible)).map(o=>Z.jsxs("g",{transform:`translate(${e(o.x)} ${t(o.z)}) rotate(${-o.yaw*180/Math.PI})`,children:[Z.jsx("path",{className:`player-dot ${o.team==="CT"?"ct":"t"} ${o.controlled?"self":""}`,d:"M0 -3.2 L2.4 2 L0 1.3 L-2.4 2 Z"}),o.hasBomb&&Z.jsx("circle",{className:"carrier-ring",r:"3.7"})]},o.id)),s.bomb.state!=="carried"&&s.bomb.state!=="defused"&&s.bomb.state!=="exploded"&&Z.jsxs("g",{transform:`translate(${e(s.bomb.x)} ${t(s.bomb.z)})`,children:[Z.jsx("rect",{className:"bomb-dot",x:"-2",y:"-2",width:"4",height:"4",rx:".5"}),Z.jsx("text",{className:"bomb-letter",y:"-3.5",children:"C4"})]})]}),Z.jsxs("div",{className:"map-legend",children:[Z.jsxs("span",{children:[Z.jsx("i",{className:"dot ct"}),"CT"]}),Z.jsxs("span",{children:[Z.jsx("i",{className:"dot t"}),"T"]}),Z.jsxs("span",{children:[Z.jsx("i",{className:"diamond"}),"C4"]})]})]})}function Y1({onStart:s}){const[e,t]=$i.useState("pistol"),[r,o]=$i.useState("CT");return Z.jsxs("div",{className:"start-screen",children:[Z.jsx("div",{className:"start-grid"}),Z.jsxs("section",{className:"start-copy",children:[Z.jsxs("div",{className:"eyebrow",children:[Z.jsx("span",{children:"5 VS 5"}),Z.jsx("span",{children:"PROCEDURAL COMBAT SIM"})]}),Z.jsxs("h1",{children:["DUST",Z.jsx("span",{children:"//"}),"II"]}),Z.jsx("p",{className:"lead",children:"穿过中门。守住包点。别让你的队伍少一个人。"}),Z.jsxs("div",{className:"feature-line",children:[Z.jsx("span",{children:"10 名作战单位"}),Z.jsx("span",{children:"全局物理碰撞"}),Z.jsx("span",{children:"C4 回合规则"}),Z.jsx("span",{children:"空间音频反馈"})]})]}),Z.jsxs("section",{className:"deployment",children:[Z.jsxs("div",{className:"panel-title",children:[Z.jsx("span",{children:"01"}),Z.jsxs("div",{children:[Z.jsx("b",{children:"SELECT FORCE"}),Z.jsx("small",{children:"选择你的阵营"})]})]}),Z.jsxs("div",{className:"choice-row",children:[Z.jsxs("button",{className:`choice team-ct ${r==="CT"?"active":""}`,onClick:()=>o("CT"),children:[Z.jsx("i",{children:"CT"}),Z.jsxs("span",{children:[Z.jsx("b",{children:"COUNTER-TERRORISTS"}),Z.jsx("small",{children:"从 CT 出生点部署 · M4A4 / USP-S"})]})]}),Z.jsxs("button",{className:`choice team-t ${r==="T"?"active":""}`,onClick:()=>o("T"),children:[Z.jsx("i",{children:"T"}),Z.jsxs("span",{children:[Z.jsx("b",{children:"TERRORISTS"}),Z.jsx("small",{children:"从 T 出生点部署 · AK-47 / Glock"})]})]})]}),Z.jsxs("div",{className:"panel-title",children:[Z.jsx("span",{children:"02"}),Z.jsxs("div",{children:[Z.jsx("b",{children:"ROUND PROTOCOL"}),Z.jsx("small",{children:"选择装备规则"})]})]}),Z.jsxs("div",{className:"mode-row",children:[Z.jsxs("button",{className:e==="pistol"?"active":"",onClick:()=>t("pistol"),children:[Z.jsx("span",{children:"PISTOL ROUND"}),Z.jsx("small",{children:"标准第一回合 · 默认手枪 · 无主武器 / 无护甲"})]}),Z.jsxs("button",{className:e==="rifle"?"active":"",onClick:()=>t("rifle"),children:[Z.jsx("span",{children:"FULL BUY"}),Z.jsx("small",{children:"步枪、狙击与护甲 · 4—7 快速测试全武器"})]})]}),Z.jsxs("button",{className:"deploy",onClick:()=>s(e,r),children:[Z.jsx("span",{children:"DEPLOY"}),Z.jsx("small",{children:"点击进入 · 锁定鼠标"}),Z.jsx("i",{children:"↗"})]}),Z.jsx("p",{className:"controls",children:"WASD 移动　·　鼠标瞄准 / 射击　·　右键开镜　·　E 互动　·　R 换弹　·　1—3 切枪"})]}),Z.jsx("div",{className:"build-tag",children:"BUILD 02.5 // BROWSER TACTICAL PROTOTYPE"})]})}function q1({game:s,locked:e,onResume:t}){const r=7+s.spread*210;return Z.jsxs("div",{className:"hud",children:[Z.jsxs("header",{className:"scorebar",children:[Z.jsxs("div",{className:"team-score ct",children:[Z.jsx("span",{children:"CT"}),Z.jsx("b",{children:s.scoreCT})]}),Z.jsxs("div",{className:"round-clock",children:[Z.jsxs("small",{children:["ROUND ",Js(s.round)," · ",s.mode==="pistol"?"PISTOL":"FULL BUY"]}),Z.jsxs("strong",{children:[Js(s.time/60),":",Js(s.time%60)]}),Z.jsx("span",{className:`bomb-status ${s.bomb.state}`,children:s.bomb.state==="planted"?`C4 ${Math.ceil(s.bomb.timer)}s · ${s.bomb.site}`:s.bomb.state==="dropped"?"C4 DROPPED":s.bomb.carrierName?`C4 · ${s.bomb.carrierName}`:"OBJECTIVE LIVE"})]}),Z.jsxs("div",{className:"team-score t",children:[Z.jsx("b",{children:s.scoreT}),Z.jsx("span",{children:"T"})]})]}),Z.jsx(j1,{game:s}),Z.jsx("div",{className:"killfeed",children:s.kills.map(o=>Z.jsxs("div",{className:"kill",children:[Z.jsx("b",{className:o.team==="CT"?"blue":"amber",children:o.killer}),Z.jsxs("span",{className:"kill-weapon",children:[o.weapon,o.headshot?" ◉":""]}),Z.jsx("b",{children:o.victim})]},o.id))}),Z.jsx("div",{className:"squad-list",children:s.agents.filter(o=>o.team===s.team).map(o=>Z.jsxs("div",{className:`${o.alive?"":"dead"} ${o.controlled?"controlled":""}`,children:[Z.jsx("i",{children:o.id<5?"T":"CT"}),Z.jsxs("span",{children:[Z.jsxs("b",{children:[o.name,o.controlled?" // YOU":""]}),Z.jsx("small",{children:o.alive?`${o.hp} HP${o.hasBomb?" · C4":""}`:"KIA"})]})]},o.id))}),!s.scoped&&Z.jsxs("div",{className:"crosshair",style:{"--gap":`${r}px`},children:[Z.jsx("i",{className:"ch top"}),Z.jsx("i",{className:"ch right"}),Z.jsx("i",{className:"ch bottom"}),Z.jsx("i",{className:"ch left"}),Z.jsx("i",{className:"center"})]}),s.scoped&&Z.jsxs("div",{className:"scope",children:[Z.jsx("i",{className:"scope-h"}),Z.jsx("i",{className:"scope-v"}),Z.jsx("span",{className:"scope-ring"})]}),s.actionLabel&&Z.jsxs("div",{className:"action",children:[Z.jsx("b",{children:s.actionLabel}),Z.jsx("div",{children:Z.jsx("i",{style:{width:`${s.actionProgress*100}%`}})}),Z.jsx("small",{children:"保持 E 键"})]}),s.banner&&Z.jsxs("div",{className:`banner ${s.phase==="roundEnd"?"round-end":""}`,children:[Z.jsx("span",{children:s.phase==="roundEnd"?"ROUND COMPLETE":"COMBAT NOTICE"}),Z.jsx("b",{children:s.banner}),s.spectator&&Z.jsx("small",{children:"E 接管下一名存活队友 · Q 切换观察"})]}),Z.jsxs("div",{className:"vitals",children:[Z.jsxs("div",{className:"vital",children:[Z.jsx("span",{children:"+"}),Z.jsxs("div",{children:[Z.jsx("small",{children:"HEALTH"}),Z.jsx("b",{children:Js(s.hp)})]})]}),Z.jsxs("div",{className:"vital armor",children:[Z.jsx("span",{children:"◇"}),Z.jsxs("div",{children:[Z.jsx("small",{children:"ARMOR"}),Z.jsx("b",{children:Js(s.armor)})]})]})]}),Z.jsxs("div",{className:"ammo-panel",children:[Z.jsx("div",{className:"weapon-index",children:s.weapon==="knife"?"03":s.weapon==="glock"||s.weapon==="usp"||s.weapon==="deagle"?"02":"01"}),Z.jsxs("div",{className:"weapon-name",children:[Z.jsx("small",{children:s.reloading?"RELOADING…":"ACTIVE WEAPON"}),Z.jsx("b",{children:s.weaponName})]}),Z.jsxs("div",{className:"ammo",children:[Z.jsx("strong",{children:s.weapon==="knife"?"—":Js(s.ammo)}),Z.jsxs("span",{children:["/ ",s.weapon==="knife"?"—":s.reserve]})]}),Z.jsxs("div",{className:"slots",children:[Z.jsx("span",{className:["ak47","m4a4","awp"].includes(s.weapon)?"active":"",children:"1 PRIMARY"}),Z.jsx("span",{className:["glock","usp","deagle"].includes(s.weapon)?"active":"",children:"2 SIDEARM"}),Z.jsx("span",{className:s.weapon==="knife"?"active":"",children:"3 KNIFE"})]})]}),Z.jsxs("div",{className:"objective-hint",children:[s.team==="T"?"携带 C4 进入 A / B 点并按住 E 下包":"阻止下包；靠近已安放 C4 按住 E 拆除",s.mode==="rifle"&&Z.jsx("span",{children:" · 4 AK　5 M4　6 AWP　7 DEAGLE"})]}),!e&&Z.jsxs("button",{className:"pause-card",onClick:t,children:[Z.jsx("span",{children:"TACTICAL LINK PAUSED"}),Z.jsx("b",{children:"点击继续作战"}),Z.jsx("small",{children:"鼠标将重新锁定 · ESC 可释放"})]})]})}function $1(){const s=$i.useRef(null),e=$i.useRef(null),[t,r]=$i.useState(X1),[o,l]=$i.useState(!1),[u,f]=$i.useState(!1);$i.useEffect(()=>{if(!s.current)return;const p=new W1(s.current,r);e.current=p;const x=()=>f(!!document.pointerLockElement);return document.addEventListener("pointerlockchange",x),()=>{document.removeEventListener("pointerlockchange",x),p.dispose(),e.current=null}},[]);const h=(p,x)=>{var _;l(!0),(_=e.current)==null||_.start({mode:p,team:x})};return Z.jsxs("main",{className:"app",children:[Z.jsx("div",{className:"game-mount",ref:s}),o?Z.jsx(q1,{game:t,locked:u,onResume:()=>{var p;return(p=e.current)==null?void 0:p.requestLock()}}):Z.jsx(Y1,{onStart:h})]})}n_.createRoot(document.getElementById("root")).render(Z.jsx($v.StrictMode,{children:Z.jsx($1,{})}));
