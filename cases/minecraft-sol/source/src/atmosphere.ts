import * as THREE from 'three';
import { VoxelWorld, WATER_LEVEL } from './world';

function createShoreTexture(world: VoxelWorld): THREE.DataTexture {
  const data = new Uint8Array(world.size * world.size * 4);
  for (let z = 0; z < world.size; z++) {
    for (let x = 0; x < world.size; x++) {
      const wx = x - world.half, wz = z - world.half;
      let distance = 6;
      if (world.getSurfaceY(wx, wz) <= WATER_LEVEL) {
        for (let dz = -5; dz <= 5; dz++) {
          for (let dx = -5; dx <= 5; dx++) {
            if (world.getSurfaceY(wx + dx, wz + dz) > WATER_LEVEL) distance = Math.min(distance, Math.hypot(dx, dz));
          }
        }
      } else distance = 0;
      const index = (z * world.size + x) * 4;
      data[index] = data[index + 1] = data[index + 2] = Math.round(distance / 6 * 255);
      data[index + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, world.size, world.size, THREE.RGBAFormat);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

const skyVertex = `
  varying vec3 vDirection;
  void main() {
    vDirection = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragment = `
  uniform vec3 uSun;
  uniform float uDay;
  varying vec3 vDirection;
  void main() {
    vec3 d = normalize(vDirection);
    float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
    float horizon = pow(1.0 - abs(d.y), 5.0);
    vec3 zenith = mix(vec3(0.017, 0.027, 0.073), vec3(0.12, 0.34, 0.60), uDay);
    vec3 low = mix(vec3(0.10, 0.075, 0.12), vec3(0.56, 0.73, 0.78), uDay);
    vec3 col = mix(low, zenith, smoothstep(0.02, 0.95, h));
    col += vec3(0.92, 0.38, 0.13) * horizon * (1.0 - uDay) * 0.65;
    float sun = max(dot(d, normalize(uSun)), 0.0);
    col += vec3(1.0, 0.73, 0.41) * pow(sun, 110.0) * 0.30;
    col += vec3(1.0, 0.91, 0.72) * pow(sun, 2600.0) * 2.8;
    col += vec3(0.93, 0.65, 0.36) * pow(sun, 9.0) * 0.10;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const cloudVertex = `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cloudFragment = `
  uniform float uTime;
  uniform float uDay;
  varying vec2 vPos;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), f.x),
               mix(hash(i+vec2(0.0,1.0)), hash(i+1.0), f.x), f.y);
  }
  void main() {
    vec2 p = vPos * 0.021 + vec2(uTime * 0.002, uTime * 0.0007);
    float n = noise(p) * 0.59 + noise(p * 2.1) * 0.29 + noise(p * 4.2) * 0.12;
    float edge = smoothstep(0.44, 0.63, n);
    float centerFade = 1.0 - smoothstep(115.0, 220.0, length(vPos));
    vec3 color = mix(vec3(0.45, 0.48, 0.58), vec3(1.0, 0.94, 0.83), uDay);
    gl_FragColor = vec4(color, edge * centerFade * 0.46);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const waterVertex = `
  uniform float uTime;
  varying vec3 vWorld;
  varying vec2 vUv;
  void main() {
    vec3 p = position;
    p.z += sin(p.x * 0.38 + uTime * 0.68) * 0.038;
    p.z += cos(p.y * 0.28 - uTime * 0.51) * 0.028;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const waterFragment = `
  uniform float uTime;
  uniform vec3 uSun;
  uniform float uDay;
  uniform sampler2D uShore;
  varying vec3 vWorld;
  varying vec2 vUv;
  void main() {
    vec2 p = vWorld.xz;
    float a = sin(p.x * 1.22 + p.y * .68 + uTime * 1.25);
    float b = sin(p.y * 1.73 - p.x * .41 - uTime * 1.05);
    float c = sin((p.x + p.y) * 3.5 + uTime * 2.0);
    vec3 normal = normalize(vec3((a + c * .27) * .11, 1.0, (b + c * .22) * .10));
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.4);
    float specular = pow(max(dot(reflect(-normalize(uSun), normal), viewDir), 0.0), 62.0);
    float ripple = a * .018 + b * .014 + c * .007;
    vec3 deep = mix(vec3(.025,.08,.13), vec3(.025,.19,.26), uDay);
    vec3 shallow = mix(vec3(.09,.20,.24), vec3(.12,.43,.46), uDay);
    vec3 col = mix(deep, shallow, .48 + ripple * 4.0);
    col = mix(col, vec3(.55,.76,.77), fresnel * .42);
    col += vec3(1.0,.79,.53) * specular * 1.3 * uDay;
    float shoreDistance = texture2D(uShore, clamp((p + 32.0) / 64.0, 0.0, 1.0)).r * 6.0;
    float shore = 1.0 - smoothstep(.45, 3.4, shoreDistance);
    float foam = smoothstep(.3, .85, sin(p.x * 1.6 + p.y * .7 + uTime * .88) * .5 + .5);
    col = mix(col, vec3(.78,.91,.86), shore * foam * .45);
    float shimmer = pow(max(sin(p.x * 3.9 + uTime * 1.7) * sin(p.y * 2.8 - uTime * 1.2), 0.0), 10.0);
    col += vec3(.31,.48,.45) * shimmer * .11;
    gl_FragColor = vec4(col, .83 + fresnel * .12);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class Atmosphere {
  readonly sky: THREE.Mesh;
  readonly clouds: THREE.Mesh;
  readonly water: THREE.Mesh;
  readonly sun = new THREE.Vector3();
  readonly skyMaterial: THREE.ShaderMaterial;
  readonly cloudMaterial: THREE.ShaderMaterial;
  readonly waterMaterial: THREE.ShaderMaterial;
  readonly daylight = new THREE.DirectionalLight('#fff0d4', 2.8);
  readonly ambient = new THREE.HemisphereLight('#b9dbff', '#6b6a53', 1.7);
  private time = 0;

  constructor(private scene: THREE.Scene, world: VoxelWorld) {
    this.skyMaterial = new THREE.ShaderMaterial({
      uniforms: { uSun: { value: this.sun }, uDay: { value: 1 } },
      vertexShader: skyVertex, fragmentShader: skyFragment,
      side: THREE.BackSide, depthWrite: false,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 24), this.skyMaterial);
    this.sky.renderOrder = -10;
    scene.add(this.sky);

    this.cloudMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uDay: { value: 1 } },
      vertexShader: cloudVertex, fragmentShader: cloudFragment,
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    this.clouds = new THREE.Mesh(new THREE.PlaneGeometry(450, 450, 1, 1), this.cloudMaterial);
    this.clouds.rotation.x = -Math.PI / 2;
    this.clouds.position.y = 68;
    this.clouds.renderOrder = -5;
    scene.add(this.clouds);

    this.waterMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uSun: { value: this.sun }, uDay: { value: 1 }, uShore: { value: createShoreTexture(world) } },
      vertexShader: waterVertex, fragmentShader: waterFragment,
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    this.water = new THREE.Mesh(new THREE.PlaneGeometry(64, 64, 96, 96), this.waterMaterial);
    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = WATER_LEVEL + .47;
    this.water.renderOrder = 3;
    scene.add(this.water);

    this.daylight.castShadow = true;
    this.daylight.shadow.mapSize.set(1024, 1024);
    this.daylight.shadow.camera.left = -55;
    this.daylight.shadow.camera.right = 55;
    this.daylight.shadow.camera.top = 55;
    this.daylight.shadow.camera.bottom = -55;
    this.daylight.shadow.camera.near = .5;
    this.daylight.shadow.camera.far = 180;
    this.daylight.shadow.bias = -.00035;
    this.daylight.shadow.normalBias = .025;
    scene.add(this.daylight, this.daylight.target, this.ambient);
    scene.fog = new THREE.FogExp2('#a2bdc1', .0075);
    this.setDayTime(.43);
  }

  setDayTime(value: number): void {
    const angle = (value - .25) * Math.PI * 2;
    const height = Math.sin(angle);
    this.sun.set(Math.cos(angle) * .83, height, .38).normalize();
    const day = THREE.MathUtils.smoothstep(height, -.05, .48);
    this.skyMaterial.uniforms.uDay.value = day;
    this.cloudMaterial.uniforms.uDay.value = day;
    this.waterMaterial.uniforms.uDay.value = day;
    this.daylight.position.copy(this.sun).multiplyScalar(78);
    this.daylight.intensity = .15 + day * 2.9;
    this.ambient.intensity = .34 + day * 1.3;
    this.daylight.color.set(day > .65 ? '#fff2d9' : '#ff9f69');
    (this.scene.fog as THREE.FogExp2).color.set(day > .4 ? '#9ebdc1' : '#20283f');
  }

  update(delta: number): void {
    this.time += delta;
    this.cloudMaterial.uniforms.uTime.value = this.time;
    this.waterMaterial.uniforms.uTime.value = this.time;
  }
}
