import * as THREE from 'three';

// 1. Anime Cel-Shading Gradient Maps
// Generates a 3-step or 4-step discrete ramp texture for MeshToonMaterial
export function createToonGradientMap(steps = 3) {
  const canvas = document.createElement('canvas');
  canvas.width = steps;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < steps; i++) {
    // Stepped brightness values for crisp anime cell division
    const v = Math.round(100 + (155 * (i + 1)) / steps);
    ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
    ctx.fillRect(i, 0, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

const defaultGradientMap = createToonGradientMap(3);
const smoothGradientMap = createToonGradientMap(4);

// 2. Helper to create Cel-Shaded Materials
export function createToonMaterial(color, options = {}) {
  const cleanOptions = { ...options };
  delete cleanOptions.roughness;
  delete cleanOptions.metalness;
  delete cleanOptions.smooth;

  return new THREE.MeshToonMaterial({
    color: color,
    gradientMap: options.smooth ? smoothGradientMap : defaultGradientMap,
    ...cleanOptions
  });
}


// 3. Inverted Hull Anime Outline Helper
// Creates a slightly expanded mesh with front-face culling to generate clean anime contour outlines
export function addAnimeOutline(mesh, thickness = 0.025, outlineColor = 0x111625) {
  if (!mesh.geometry) return;

  const outlineMat = new THREE.ShaderMaterial({
    uniforms: {
      uThickness: { value: thickness },
      uColor: { value: new THREE.Color(outlineColor) }
    },
    vertexShader: `
      uniform float uThickness;
      void main() {
        vec3 transformed = position + normal * uThickness;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: true
  });

  const outlineMesh = new THREE.Mesh(mesh.geometry, outlineMat);
  outlineMesh.name = 'outline';
  mesh.add(outlineMesh);
  return outlineMesh;
}

// 4. Custom Wet Asphalt & Puddle Ripple Shader Material
export function createWetRoadMaterial() {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAsphaltColor: { value: new THREE.Color(0x1a2130) },
      uWetColor: { value: new THREE.Color(0x0a0e17) },
      uStoreLightColor: { value: new THREE.Color(0xffe8a3) },
      uStoreLightPos: { value: new THREE.Vector3(0, 2.5, -1.0) },
      uStreetLightColor: { value: new THREE.Color(0x7dd3fc) },
      uStreetLightPos: { value: new THREE.Vector3(5.5, 4.5, 5.0) },
      uNeonColor: { value: new THREE.Color(0x38bdf8) },
      uNeonPos: { value: new THREE.Vector3(0, 3.8, -4.2) }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uAsphaltColor;
      uniform vec3 uWetColor;
      uniform vec3 uStoreLightColor;
      uniform vec3 uStoreLightPos;
      uniform vec3 uStreetLightColor;
      uniform vec3 uStreetLightPos;
      uniform vec3 uNeonColor;
      uniform vec3 uNeonPos;

      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      // Pseudo-random noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      // Raindrop concentric ripple function
      float ripple(vec2 uv, vec2 center, float timeOffset) {
        float t = fract((uTime * 0.8 + timeOffset));
        float d = length(uv - center);
        float radius = t * 0.45;
        float wave = sin((d - radius) * 45.0) * exp(-d * 6.0) * (1.0 - t);
        return smoothstep(0.0, 0.03, radius - d) * wave;
      }

      void main() {
        vec3 V = normalize(cameraPosition - vWorldPosition);

        // Puddle pattern based on multi-frequency noise
        float puddle = noise(vWorldPosition.xz * 0.45) * 0.6 + noise(vWorldPosition.xz * 1.2) * 0.4;
        puddle = smoothstep(0.35, 0.65, puddle);

        // Compute animated ripple normals in wet puddles
        vec2 p = vWorldPosition.xz;
        float rip = 0.0;
        rip += ripple(p, vec2(1.2, 2.5), 0.0);
        rip += ripple(p, vec2(-2.5, 4.0), 0.33);
        rip += ripple(p, vec2(3.0, -1.0), 0.66);
        rip += ripple(p, vec2(-1.0, 0.5), 0.2);
        rip += ripple(p, vec2(4.5, 3.2), 0.5);
        rip += ripple(p, vec2(-3.5, 1.8), 0.85);

        vec3 N = normalize(vNormal + vec3(rip * puddle * 0.35, 0.0, rip * puddle * 0.35));

        // Base asphalt color mixed with wet darkness
        vec3 baseColor = mix(uAsphaltColor, uWetColor, puddle * 0.7);

        // Stylized anime wet specular reflections
        vec3 finalColor = baseColor;

        // 1. Convenience Store Warm Glow reflection
        vec3 L_store = normalize(uStoreLightPos - vWorldPosition);
        float dist_store = length(uStoreLightPos - vWorldPosition);
        vec3 H_store = normalize(L_store + V);
        float spec_store = pow(max(dot(N, H_store), 0.0), 32.0);
        float atten_store = 1.0 / (1.0 + 0.08 * dist_store * dist_store);
        // Wide anime wet reflection smear
        float smear_store = pow(max(dot(reflect(-V, N), L_store), 0.0), 12.0);
        finalColor += uStoreLightColor * (spec_store * 2.2 + smear_store * 0.9) * atten_store * (0.3 + 0.7 * puddle);

        // 2. Street Lamp Cool Cyan Reflection
        vec3 L_street = normalize(uStreetLightPos - vWorldPosition);
        float dist_street = length(uStreetLightPos - vWorldPosition);
        vec3 H_street = normalize(L_street + V);
        float spec_street = pow(max(dot(N, H_street), 0.0), 40.0);
        float atten_street = 1.0 / (1.0 + 0.05 * dist_street * dist_street);
        finalColor += uStreetLightColor * spec_street * atten_street * (0.4 + 0.6 * puddle);

        // 3. Neon Sign Reflection
        vec3 L_neon = normalize(uNeonPos - vWorldPosition);
        float dist_neon = length(uNeonPos - vWorldPosition);
        vec3 H_neon = normalize(L_neon + V);
        float spec_neon = pow(max(dot(N, H_neon), 0.0), 24.0);
        finalColor += uNeonColor * spec_neon * (1.0 / (1.0 + 0.1 * dist_neon * dist_neon)) * puddle;

        // Cel-shaded ambient lighting step
        float fresnel = pow(1.0 - max(dot(V, N), 0.0), 3.0);
        finalColor += vec3(0.08, 0.12, 0.22) * fresnel * (0.5 + 0.5 * puddle);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  });

  return material;
}

// 5. Rain-streaked Anime Window Glass Material (Crystal clear with delicate rain trails)
export function createRainGlassMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uGlassColor: { value: new THREE.Color(0x93c5fd) },
      uWarmInterior: { value: new THREE.Color(0xffedd5) },
      uOpacity: { value: 0.05 }
    },

    vertexShader: `
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uGlassColor;
      uniform vec3 uWarmInterior;
      uniform float uOpacity;

      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(41.23, 73.19))) * 12345.678);
      }

      // Vertical rain dribble trails sliding down the window pane
      float rainStreak(vec2 uv) {
        float xId = floor(uv.x * 28.0);
        float speed = 1.0 + hash(vec2(xId, 1.0)) * 1.2;
        float y = fract(uv.y * 2.5 + uTime * speed * 0.35 + hash(vec2(xId, 3.0)));
        float streak = smoothstep(0.0, 0.08, y) * smoothstep(0.8, 0.15, y);
        float colX = abs(fract(uv.x * 28.0) - 0.5);
        return smoothstep(0.12, 0.0, colX) * streak;
      }

      void main() {
        vec3 V = normalize(cameraPosition - vWorldPosition);
        vec3 N = normalize(vNormal);

        // Grazing angle Fresnel reflection
        float fresnel = pow(1.0 - max(dot(V, N), 0.0), 3.8);

        // Delicate rain streaks
        float streak = rainStreak(vUv);

        vec3 color = mix(uGlassColor, vec3(0.9, 0.95, 1.0), fresnel * 0.5);
        color += vec3(1.0, 1.0, 1.0) * streak * 0.35;

        // Crystal clear base with delicate reflections and rain dribbles
        float alpha = uOpacity + fresnel * 0.25 + streak * 0.16;
        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.75));
      }

    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

