// src/engine/CelShaders.ts
// Anime Toon / Cel-shading materials with optional curved world vertex deformation.
import * as THREE from 'three';

export class CelShaders {
  private static gradientMap: THREE.DataTexture | null = null;
  public static isCurvedWorld: boolean = true;
  public static curvatureRadius: number = 320.0; // Horizon curve radius

  /** Creates a 3-step anime cel-shading ramp texture */
  public static getGradientMap(): THREE.DataTexture {
    if (this.gradientMap) return this.gradientMap;

    // 4 distinct bands: Highlight (1.0), Mid-Light (0.85), Mid-Shadow (0.6), Deep Shadow (0.4)
    const colors = new Uint8Array([
      110, 115, 140, // Cool tinted shadow
      165, 170, 185, // Soft midtone
      225, 228, 235, // Direct light
      255, 255, 255  // Warm highlight
    ]);

    const texture = new THREE.DataTexture(colors, 4, 1, THREE.RGBFormat || THREE.RGBAFormat);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    this.gradientMap = texture;
    return texture;
  }

  /**
   * Modifies a material's vertex shader to inject curved world horizon displacement
   */
  public static injectCurvedWorld(material: THREE.Material): void {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uCurvedActive = { value: CelShaders.isCurvedWorld ? 1.0 : 0.0 };
      shader.uniforms.uCurvatureRadius = { value: CelShaders.curvatureRadius };
      shader.uniforms.uCameraPos = { value: new THREE.Vector3() };

      shader.vertexShader = `
        uniform float uCurvedActive;
        uniform float uCurvatureRadius;
        uniform vec3 uCameraPos;
        ${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vec4 tempWorldPos = modelMatrix * vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          tempWorldPos = modelMatrix * (instanceMatrix * vec4( transformed, 1.0 ));
        #endif
        if (uCurvedActive > 0.5) {
          float distSq = dot(tempWorldPos.xz, tempWorldPos.xz);
          transformed.y -= distSq / (2.0 * uCurvatureRadius);
        }
        `
      );

      // Keep reference to uniforms for runtime updates
      (material as unknown as { customUniforms?: typeof shader.uniforms }).customUniforms = shader.uniforms;
    };
  }

  /** Creates standard Anime Cel Toon Material */
  public static createToonMaterial(
    color: THREE.ColorRepresentation,
    options: {
      map?: THREE.Texture | null;
      roughness?: number;
      transparent?: boolean;
      opacity?: number;
      side?: THREE.Side;
      emissive?: THREE.ColorRepresentation;
      emissiveIntensity?: number;
      wireframe?: boolean;
    } = {}
  ): THREE.MeshToonMaterial {
    const mat = new THREE.MeshToonMaterial({
      color: new THREE.Color(color),
      gradientMap: this.getGradientMap(),
      map: options.map || null,
      transparent: options.transparent ?? false,
      opacity: options.opacity ?? 1.0,
      side: options.side ?? THREE.FrontSide,
      emissive: options.emissive ? new THREE.Color(options.emissive) : new THREE.Color(0x000000),
      emissiveIntensity: options.emissiveIntensity ?? 0.0,
      wireframe: options.wireframe ?? false
    });

    this.injectCurvedWorld(mat);
    return mat;
  }

  /** Animated Anime River Water Shader Material */
  public static createAnimeWaterMaterial(): THREE.ShaderMaterial {
    const vertexShader = `
      uniform float uTime;
      uniform float uCurvedActive;
      uniform float uCurvatureRadius;
      varying vec2 vUv;
      varying vec3 vWorldPos;

      void main() {
        vUv = uv;
        vec3 pos = position;
        // Subtle ripple waves
        pos.y += sin(pos.x * 0.8 + uTime * 2.0) * 0.04 + cos(pos.z * 1.2 + uTime * 1.5) * 0.03;

        vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
        if (uCurvedActive > 0.5) {
          float distSq = dot(worldPosition.xz, worldPosition.xz);
          worldPosition.y -= distSq / (2.0 * uCurvatureRadius);
        }

        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uWaterColorShallow;
      uniform vec3 uWaterColorDeep;
      varying vec2 vUv;
      varying vec3 vWorldPos;

      void main() {
        // Anime stylized water caustics pattern
        vec2 uv1 = vUv * 8.0 + vec2(uTime * 0.05, uTime * 0.03);
        vec2 uv2 = vUv * 12.0 - vec2(uTime * 0.04, uTime * 0.06);

        float n1 = sin(uv1.x * 3.14 + sin(uv1.y * 2.5)) * 0.5 + 0.5;
        float n2 = cos(uv2.x * 2.8 + cos(uv2.y * 3.2)) * 0.5 + 0.5;
        float caustic = pow(n1 * n2, 2.0) * 0.8;

        // Soft gradient between deep turquoise and sparkling surface
        vec3 col = mix(uWaterColorDeep, uWaterColorShallow, 0.5 + 0.5 * sin(vUv.x * 2.0));
        col += vec3(caustic * 0.4, caustic * 0.5, caustic * 0.6);

        // Gentle rim sparkle
        float foam = smoothstep(0.7, 0.95, sin(vUv.y * 30.0 + uTime * 3.0));
        col += vec3(foam * 0.2);

        gl_FragColor = vec4(col, 0.88);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uCurvedActive: { value: CelShaders.isCurvedWorld ? 1.0 : 0.0 },
        uCurvatureRadius: { value: CelShaders.curvatureRadius },
        uWaterColorShallow: { value: new THREE.Color(0x70d6ff) },
        uWaterColorDeep: { value: new THREE.Color(0x1a759f) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    (mat as unknown as { customUniforms?: typeof mat.uniforms }).customUniforms = mat.uniforms;
    return mat;
  }
}
