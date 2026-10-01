// Weather: the rain field, eave drips, ground splash rings and volumetric light cones.
import * as THREE from 'three';
import * as L from './layout.js';

const RAIN_BOX = 26;    // metres of rain around the camera
const RAIN_H = 13;

/** Vertical rain streaks, wrapped around the camera. One draw call. */
function rainField(count, shared) {
  const pos = new Float32Array(count * 2 * 3);
  const off = new Float32Array(count * 2 * 3);
  const spd = new Float32Array(count * 2);
  const seed = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * RAIN_BOX;
    const y = Math.random() * RAIN_H;
    const z = (Math.random() - 0.5) * RAIN_BOX;
    const len = 0.16 + Math.random() * 0.24;
    const drift = 0.05 + Math.random() * 0.06;
    const s = 7.5 + Math.random() * 5.5;
    const o = i * 6, p = i * 2;
    pos[o] = pos[o + 3] = x;
    pos[o + 1] = y; pos[o + 2] = z;
    pos[o + 4] = x; pos[o + 5] = y; pos[o + 6] = z;
    off[o] = off[o + 3] = drift; off[o + 1] = 0; off[o + 2] = drift * 0.35;
    off[o + 4] = drift; off[o + 5] = -len; off[o + 6] = drift * 0.35;
    spd[p] = spd[p + 1] = s;
    seed[p] = seed[p + 1] = Math.random();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aOff', new THREE.BufferAttribute(off, 3));
  g.setAttribute('aSpd', new THREE.BufferAttribute(spd, 1));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);

  const m = new THREE.ShaderMaterial({
    uniforms: {
      uTime: shared.uTime,
      uCam: { value: new THREE.Vector3() },
      uBox: { value: RAIN_BOX },
      uH: { value: RAIN_H },
      uCol: { value: new THREE.Color('#bcd4f0') },
      uStr: { value: 1.0 },
      uWind: { value: 0.085 },
    },
    vertexShader: /* glsl */`
      uniform float uTime, uBox, uH, uWind;
      uniform vec3 uCam;
      attribute vec3 aOff; attribute float aSpd; attribute float aSeed;
      varying float vA; varying float vSeed;
      void main(){
        vec3 p = position;
        float y = mod(p.y - uTime * aSpd, uH);
        // wrap the field around the camera so the rain is always where you look
        p.x = mod(p.x - uCam.x + uBox * 0.5, uBox) - uBox * 0.5 + uCam.x;
        p.z = mod(p.z - uCam.z + uBox * 0.5, uBox) - uBox * 0.5 + uCam.z;
        p.y = y;
        p.xz += p.y * uWind;
        p += aOff;
        vA = 0.35 + 0.65 * aSeed;
        vSeed = aSeed;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        // fade very close drops so they don't smear across the lens
        vA *= smoothstep(1.2, 4.0, -mv.z) * (1.0 - smoothstep(11.0, 20.0, -mv.z));
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uCol; uniform float uStr;
      varying float vA; varying float vSeed;
      void main(){
        gl_FragColor = vec4(uCol * (0.22 + 0.22 * vSeed) * uStr, vA * 0.034 * uStr);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
  });
  const mesh = new THREE.LineSegments(g, m);
  mesh.frustumCulled = false;
  mesh.renderOrder = 6;
  return mesh;
}

/** Water dripping off a horizontal edge: short falling segments that restart. */
function dripLine(a, b, count, speed, shared, len = 0.09) {
  const pos = new Float32Array(count * 2 * 3);
  const off = new Float32Array(count * 2 * 3);
  const ph = new Float32Array(count * 2);
  const spd = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t, z = a[2] + (b[2] - a[2]) * t;
    const p = i * 2, o = i * 6;
    for (let j = 0; j < 2; j++) {
      pos[o + j * 3] = x; pos[o + j * 3 + 1] = y; pos[o + j * 3 + 2] = z;
      off[o + j * 3] = 0; off[o + j * 3 + 1] = j === 0 ? 0 : -len; off[o + j * 3 + 2] = 0;
      ph[p + j] = Math.random();
      spd[p + j] = speed * (0.8 + Math.random() * 0.5);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aOff', new THREE.BufferAttribute(off, 3));
  g.setAttribute('aPhase', new THREE.BufferAttribute(ph, 1));
  g.setAttribute('aSpd', new THREE.BufferAttribute(spd, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);
  const m = new THREE.ShaderMaterial({
    uniforms: { uTime: shared.uTime, uCol: { value: new THREE.Color('#cfe0f5') }, uTop: { value: a[1] }, uFall: { value: 3.4 } },
    vertexShader: /* glsl */`
      uniform float uTime, uTop, uFall;
      attribute vec3 aOff; attribute float aPhase; attribute float aSpd;
      varying float vA;
      void main(){
        float t = fract(uTime * aSpd * 0.25 + aPhase);
        float fall = t * t * uFall * aSpd * 0.6;
        vec3 p = position + aOff;
        p.y -= min(fall, uTop + 0.2);
        vA = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.75, 1.0, t));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uCol; varying float vA;
      void main(){ gl_FragColor = vec4(uCol, vA * 0.55); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
  });
  const mesh = new THREE.LineSegments(g, m);
  mesh.frustumCulled = false;
  mesh.renderOrder = 6;
  return mesh;
}

/** Soft light shaft under a lamp / sign — cheap fake volumetrics. */
export function lightCone(parent, x, y, z, radius, height, color, strength = 0.5) {
  const g = new THREE.ConeGeometry(radius, height, 18, 1, true);
  const m = new THREE.ShaderMaterial({
    uniforms: { uCol: { value: new THREE.Color(color) }, uStr: { value: strength } },
    vertexShader: /* glsl */`
      varying float vY; varying vec3 vN; varying vec3 vV;
      void main(){
        vY = uv.y;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uCol; uniform float uStr; varying float vY; varying vec3 vN; varying vec3 vV;
      void main(){
        float edge = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 1.4);
        float a = pow(clamp(vY, 0.0, 1.0), 1.6) * (0.35 + 0.65 * edge);
        gl_FragColor = vec4(uCol * a * uStr, a * 0.55 * uStr);
      }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.position.set(x, y - height / 2, z);
  mesh.renderOrder = 5;
  parent.add(mesh);
  return mesh;
}

export function build(ctx) {
  const { mat } = ctx;
  const g = new THREE.Group();
  g.name = 'weather';
  ctx.add(g);

  // ---- the rain itself
  const rain = rainField(1500, ctx.shared);
  g.add(rain);
  ctx.noOutline(rain);

  // ---- drips off the awning edge, the sign band and the vending machine
  const drips = new THREE.Group();
  const awn = L.AWNING, S = L.SHOP;
  drips.add(dripLine([S.x0 + 0.3, awn.y - 0.28, awn.z], [S.x1 - 0.3, awn.y - 0.28, awn.z], 90, 1.0, ctx.shared, 0.1));
  drips.add(dripLine([S.x0 + 0.4, L.SIGN_BAND.y0 - 0.06, S.z1 + 0.12], [S.x1 - 0.4, L.SIGN_BAND.y0 - 0.06, S.z1 + 0.12], 40, 0.8, ctx.shared, 0.08));
  drips.add(dripLine([L.AT.vending.x - 0.6, 1.97, L.AT.vending.z - 0.3], [L.AT.vending.x + 0.6, 1.97, L.AT.vending.z - 0.3], 22, 1.1, ctx.shared, 0.09));
  drips.add(dripLine([L.AT.pole.x - 0.2, 4.6, L.AT.pole.z + 0.3], [L.AT.pole.x + 0.2, 4.6, L.AT.pole.z + 0.3], 10, 1.2, ctx.shared, 0.07));
  g.add(drips);
  ctx.noOutline(drips);

  // ---- light shafts
  const cones = new THREE.Group();
  lightCone(cones, L.AT.lamp.x - L.AT.lamp.arm, 4.8, L.AT.lamp.z, 2.9, 4.8, '#ffd9a0', 0.22);
  lightCone(cones, L.AT.lamp2.x - L.AT.lamp2.arm, 4.8, L.AT.lamp2.z, 2.6, 4.8, '#ffd9a0', 0.18);
  lightCone(cones, (L.DOOR.x0 + L.DOOR.x1) / 2, 2.4, S.z1 + 0.7, 2.0, 2.4, '#ffcf92', 0.14);
  lightCone(cones, L.AT.vending.x, 1.9, L.AT.vending.z + 0.3, 1.1, 1.9, '#cfe8ff', 0.16);
  lightCone(cones, S.x0 - 0.3, 3.0, -6.0, 1.2, 3.0, '#ffcf92', 0.16);
  g.add(cones);
  ctx.noOutline(cones);

  // ---- drifting mist near the ground
  const mistTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const x = c.getContext('2d');
    const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,0.55)');
    gr.addColorStop(0.45, 'rgba(255,255,255,0.16)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const mist = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(8, 2.4), new THREE.MeshBasicMaterial({
      map: mistTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      color: new THREE.Color('#3f5a88'), opacity: 0.05,
    }));
    m.position.set(-10 + Math.random() * 22, 0.5 + Math.random() * 0.8, -6 + Math.random() * 16);
    m.renderOrder = 4;
    mist.add(m);
  }
  g.add(mist);
  ctx.noOutline(mist);

  // ---- animation
  const basePos = mist.children.map((m) => m.position.clone());
  ctx.onUpdate((dt, t) => {
    rain.material.uniforms.uCam.value.copy(ctx.camera.position);
    rain.material.uniforms.uStr.value = 0.92 + 0.08 * Math.sin(t * 0.31);
    mist.children.forEach((m, i) => {
      const p = basePos[i];
      m.position.set(p.x + Math.sin(t * 0.12 + i) * 2.4, p.y + Math.sin(t * 0.2 + i * 1.7) * 0.25, p.z + Math.cos(t * 0.09 + i * 0.7) * 1.6);
      m.quaternion.copy(ctx.camera.quaternion);
      m.material.opacity = 0.035 + 0.025 * (0.5 + 0.5 * Math.sin(t * 0.23 + i * 2.1));
    });
    cones.children.forEach((c, i) => { c.material.uniforms.uStr.value = (i < 2 ? 0.14 : 0.15) * (0.9 + 0.1 * Math.sin(t * 0.7 + i)); });
  });

  return g;
}
