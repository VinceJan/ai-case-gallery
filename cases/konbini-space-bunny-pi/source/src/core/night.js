// Rainy-night specific materials: the wet ground (planar reflection + ripples),
// rain-streaked shop glass, and a few additive glow helpers.
import * as THREE from 'three';

const GLSL_HASH = /* glsl */`
float hash21(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
vec2 hash22(vec2 p){ float n = hash21(p); return vec2(n, hash21(p+n)); }
`;

/** Animated rain rings on a wet plane. Returns the surface gradient (for reflection distortion). */
const RIPPLE = /* glsl */`
vec2 rainRipples(vec2 p, float t){
  vec2 acc = vec2(0.0);
  for (int j = -1; j <= 1; j++){
    for (int i = -1; i <= 1; i++){
      vec2 g = vec2(float(i), float(j));
      vec2 id = floor(p) + g;
      vec2 r1 = hash22(id);
      vec2 r2 = hash22(id + 7.31);
      float ph = fract(t * (0.55 + 0.5*r2.x) + r1.y);
      vec2 c = g + r1;
      vec2 d = floor(p) + c - p;
      float r = length(d);
      float rad = ph * 0.72;
      float w = (r - rad);
      float env = exp(-abs(w)*26.0) * (1.0 - ph) * (1.0 - ph) * step(rad + 0.02, r);
      float ring = sin(w * 52.0);
      acc += normalize(d + 1e-4) * ring * env * 0.9;
    }
  }
  return acc;
}
`;

/**
 * The whole diorama floor: one plane, one draw call.
 * map.rgb = painted surface (asphalt, tiles, paint, grime), map.a = wetness / puddle mask.
 * Adds: quantised moonlight, a blurred planar reflection of the neon + shop windows,
 * animated rain rings, wet sheen and puddle sparkle.
 */
export function wetGround(mat, shared, opts = {}) {
  const m = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        tMap: { value: null },
        tRefl: { value: null },
        uReflMat: { value: new THREE.Matrix4() },
        uTime: shared.uTime,
        uReflOn: { value: 1 },
        uMoon: { value: new THREE.Vector3(0.35, 0.8, -0.45).normalize() },
        uAmb: { value: new THREE.Color(opts.ambient || '#2a3550') },
        uMoonCol: { value: new THREE.Color(opts.moon || '#9fc0f0') },
        uReflGain: { value: opts.reflGain ?? 1.0 },
        uRipple: { value: opts.ripple ?? 1.0 },
        uScale: { value: opts.scale ?? 1.0 },
      },
    ]),
    vertexShader: /* glsl */`
      #include <common>
      #include <fog_pars_vertex>
      varying vec3 vW; varying vec2 vUv;
      void main(){
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz; vUv = uv;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: /* glsl */`
      #include <common>
      #include <fog_pars_fragment>
      uniform sampler2D tMap, tRefl; uniform mat4 uReflMat;
      uniform float uTime, uReflOn, uReflGain, uRipple, uScale;
      uniform vec3 uMoon, uAmb, uMoonCol;
      varying vec3 vW; varying vec2 vUv;
      ${GLSL_HASH}
      ${RIPPLE}
      void main(){
        vec4 base = texture2D(tMap, vUv);
        float wet = base.a;
        vec3 albedo = base.rgb;
        // ---- quantised moonlight on a flat plane (toon)
        float nl = max(dot(vec3(0.0,1.0,0.0), uMoon), 0.0);
        float band = nl < 0.25 ? 0.35 : (nl < 0.62 ? 0.68 : 1.0);
        vec3 col = albedo * (uAmb + uMoonCol * band * 0.20);
        // wet asphalt is darker & more saturated than dry
        col = mix(col, col * vec3(0.62,0.68,0.82), wet * 0.55);
        // ---- rain rings
        vec2 rp = vW.xz * uScale;
        vec2 grad = rainRipples(rp, uTime) * uRipple * (0.35 + 0.65*wet);
        // fine wind-blown water texture
        float n = hash21(floor(vW.xz * 26.0 + vec2(uTime*0.7, -uTime*0.4)));
        grad += (n - 0.5) * 0.05 * wet;
        // ---- planar reflection
        vec3 refl = vec3(0.0);
        if (uReflOn > 0.5 && wet > 0.02) {
          vec4 c = uReflMat * vec4(vW, 1.0);
          vec2 suv = c.xy / max(c.w, 1e-4);
          vec2 ruv = suv * 0.5 + 0.5;
          ruv += grad * 0.011;
          vec2 px = vec2(0.0016) * (1.0 + length(grad) * 6.0);
          refl  = texture2D(tRefl, ruv).rgb * 0.34;
          refl += texture2D(tRefl, ruv + vec2( px.x,  px.y*0.4)).rgb * 0.165;
          refl += texture2D(tRefl, ruv + vec2(-px.x, -px.y*0.4)).rgb * 0.165;
          refl += texture2D(tRefl, ruv + vec2( px.x*0.3, -px.y)).rgb * 0.165;
          refl += texture2D(tRefl, ruv + vec2(-px.x*0.3,  px.y)).rgb * 0.165;
          // keep the sample inside the frame
          vec2 e = step(vec2(0.0), ruv) * step(ruv, vec2(1.0));
          float inside = e.x * e.y;
          refl *= inside;
        }
        // Fresnel: at grazing angles the road turns into a mirror.
        vec3 V = normalize(cameraPosition - vW);
        float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 2.0);
        float k = wet * (0.30 + 0.70 * fres) * uReflGain;
        col = mix(col, col * 0.5 + refl * 0.8, clamp(k, 0.0, 0.92));
        // ripple crests catch a little extra light
        col += (0.5 + 0.5 * min(length(grad), 1.0)) * wet * vec3(0.05, 0.07, 0.11) * 0.13;
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
      }`,
    fog: true,
  });
  m.name = 'wetGround';
  return m;
}

/**
 * Shop window glass: see-through, night sky tint, plus rain that runs down it.
 * Streaks are anchored in world space, so neighbouring panes never sync up.
 */
export function rainGlass(opts = {}) {
  const m = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: opts.time || { value: 0 },
        uTint: { value: new THREE.Color(opts.tint || '#8fa8c4') },
        uSky: { value: new THREE.Color(opts.sky || '#3c5a86') },
        uWarm: { value: new THREE.Color(opts.warm || '#ffcf8a') },
        uOpacity: { value: opts.opacity ?? 0.30 },
        uRain: { value: opts.rain ?? 1.0 },
        uIndoor: { value: opts.indoor ?? 0.0 },   // warm spill from the shop inside
        uAspect: { value: opts.aspect ?? 1.0 },
      },
    ]),
    vertexShader: /* glsl */`
      #include <common>
      #include <fog_pars_vertex>
      varying vec3 vW; varying vec2 vUv; varying vec3 vN;
      void main(){
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz; vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: /* glsl */`
      #include <common>
      #include <fog_pars_fragment>
      uniform float uTime, uOpacity, uRain, uIndoor, uAspect;
      uniform vec3 uTint, uSky, uWarm;
      varying vec3 vW; varying vec2 vUv; varying vec3 vN;
      ${GLSL_HASH}
      // thin vertical water film: layered scrolling streaks + slow fat droplets
      float film(vec2 uv, float t, float seed, float w){
        float acc = 0.0;
        // 1) fast thin streaks
        vec2 a = vec2(uv.x * 26.0 + seed*7.0, uv.y * 1.6 - t * (0.55 + seed*0.3));
        float cell = floor(a.x);
        float r = hash21(vec2(cell, seed));
        float lane = fract(a.x) - 0.5;
        float on = step(0.55, r);
        float streak = smoothstep(w, 0.0, abs(lane) * (0.6 + 0.8*r)) * on;
        float run = smoothstep(0.0, 0.35, fract(a.y + r*3.0));
        acc += streak * run * 0.9;
        // 2) slow fat droplets sliding down
        vec2 b = vec2(uv.x * 11.0 + seed*3.0, uv.y * 6.0 - t * 0.28);
        vec2 bi = floor(b), bf = fract(b) - 0.5;
        float d = hash21(bi + seed);
        float dd = length(bf * vec2(1.0, 0.8));
        acc += smoothstep(0.16, 0.02, dd) * step(0.62, d) * 1.4;
        // 3) static condensation speckle
        acc += step(0.86, hash21(floor(uv * vec2(90.0, 90.0)))) * 0.35;
        return acc;
      }
      void main(){
        vec3 V = normalize(cameraPosition - vW);
        vec3 N = normalize(vN); if (dot(N, V) < 0.0) N = -N;
        float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
        vec3 R = reflect(-V, N);
        vec3 sky = mix(uTint, uSky, clamp(R.y * 1.4 + 0.35, 0.0, 1.0));
        vec3 col = mix(uTint * 0.5, sky, 0.45 + 0.5 * fres);
        col += uWarm * uIndoor * (0.30 + 0.25 * fres);
        float ph = hash21(floor(vW.xz * 3.0 + vW.y * 2.0));
        float wetness = film(vec2(vUv.x * uAspect, vUv.y), uTime, ph, 0.22) * uRain;
        col += vec3(0.85, 0.90, 1.0) * wetness * 0.55;
        float a = clamp(uOpacity + fres * 0.30 + wetness * 0.35 + uIndoor * 0.10, 0.0, 1.0);
        gl_FragColor = vec4(col, a);
        #include <fog_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: true,
  });
  m.name = 'rainGlass';
  return m;
}

/** Additive billboard glow (lamp haloes, sign bloom, vending-machine spill). */
export function haloMaterial(color, strength = 1.0) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uCol: { value: new THREE.Color(color) },
      uStr: { value: strength },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        // camera-facing quad, anchored at the object origin
        vec3 c = (modelViewMatrix * vec4(0.0,0.0,0.0,1.0)).xyz;
        vec3 p = c + vec3(position.x * length(vec3(modelMatrix[0].xyz)), position.y * length(vec3(modelMatrix[1].xyz)), 0.0);
        gl_Position = projectionMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uCol; uniform float uStr; varying vec2 vUv;
      void main(){
        float d = length(vUv - 0.5) * 2.0;
        float a = pow(max(0.0, 1.0 - d), 2.6);
        a += pow(max(0.0, 1.0 - d), 9.0) * 0.9;
        gl_FragColor = vec4(uCol * uStr * a, a * uStr);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}

export function createNightMaterials(mat, shared) {
  return {
    wetGround: (opts) => wetGround(mat, shared, opts),
    rainGlass,
    halo: haloMaterial,
  };
}
