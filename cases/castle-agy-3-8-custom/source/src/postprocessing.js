import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// Custom Toon Edge Outline Shader
const ToonOutlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    edgeStrength: { value: 1.6 },
    outlineColor: { value: new THREE.Color(0x282334) }, // Muted dark plum ink line
    enabled: { value: true }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float edgeStrength;
    uniform vec3 outlineColor;
    uniform bool enabled;
    varying vec2 vUv;

    void main() {
      vec4 centerColor = texture2D(tDiffuse, vUv);
      if (!enabled) {
        gl_FragColor = centerColor;
        return;
      }

      vec2 texel = 1.0 / resolution;

      // Sobel neighborhood sample
      vec3 c00 = texture2D(tDiffuse, vUv + vec2(-texel.x, -texel.y)).rgb;
      vec3 c01 = texture2D(tDiffuse, vUv + vec2(-texel.x, 0.0)).rgb;
      vec3 c02 = texture2D(tDiffuse, vUv + vec2(-texel.x, texel.y)).rgb;
      vec3 c10 = texture2D(tDiffuse, vUv + vec2(0.0, -texel.y)).rgb;
      vec3 c12 = texture2D(tDiffuse, vUv + vec2(0.0, texel.y)).rgb;
      vec3 c20 = texture2D(tDiffuse, vUv + vec2(texel.x, -texel.y)).rgb;
      vec3 c21 = texture2D(tDiffuse, vUv + vec2(texel.x, 0.0)).rgb;
      vec3 c22 = texture2D(tDiffuse, vUv + vec2(texel.x, texel.y)).rgb;

      // Luminance
      vec3 luma = vec3(0.299, 0.587, 0.114);
      float l00 = dot(c00, luma);
      float l01 = dot(c01, luma);
      float l02 = dot(c02, luma);
      float l10 = dot(c10, luma);
      float l12 = dot(c12, luma);
      float l20 = dot(c20, luma);
      float l21 = dot(c21, luma);
      float l22 = dot(c22, luma);

      float gx = (l20 + 2.0 * l21 + l22) - (l00 + 2.0 * l01 + l02);
      float gy = (l02 + 2.0 * l12 + l22) - (l00 + 2.0 * l10 + l20);
      float g = sqrt(gx * gx + gy * gy);

      // Clean stepped cel-shading outline threshold
      float edge = smoothstep(0.10, 0.32, g * edgeStrength);
      vec3 finalCol = mix(centerColor.rgb, outlineColor, edge * 0.75);

      gl_FragColor = vec4(finalCol, centerColor.a);
    }
  `
};

export function setupPostprocessing(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const outlinePass = new ShaderPass(ToonOutlineShader);
  outlinePass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  composer.addPass(outlinePass);

  function resize(width, height) {
    composer.setSize(width, height);
    outlinePass.uniforms.resolution.value.set(width, height);
  }

  function setOutlineMode(mode) {
    if (mode === 'crisp') {
      outlinePass.uniforms.enabled.value = true;
      outlinePass.uniforms.edgeStrength.value = 2.0;
    } else if (mode === 'soft') {
      outlinePass.uniforms.enabled.value = true;
      outlinePass.uniforms.edgeStrength.value = 1.2;
    } else {
      outlinePass.uniforms.enabled.value = false;
    }
  }

  return { composer, outlinePass, resize, setOutlineMode };
}
