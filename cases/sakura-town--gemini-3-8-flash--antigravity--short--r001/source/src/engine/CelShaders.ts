// src/engine/CelShaders.ts
// Anime Toon / Cel-shading materials with continuous curved world vertex deformation and stylized water.
import * as THREE from 'three';

export class CelShaders {
  private static gradientMap: THREE.DataTexture | null = null;
  public static isCurvedWorld: boolean = true;
  public static curvatureRadius: number = 360.0; // Horizon curve radius for compact planetoid feel

  /** Creates a multi-band anime cel-shading ramp texture */
  public static getGradientMap(): THREE.DataTexture {
    if (this.gradientMap) return this.gradientMap;

    // 4 distinct toon bands: Highlight (1.0), Mid-Light (0.85), Soft-Shadow (0.6), Deep Tint Shadow (0.4)
    const colors = new Uint8Array([
      115, 120, 145, // Cool tinted anime shadow
      170, 175, 190, // Soft midtone
      230, 232, 238, // Direct sunlight
      255, 255, 255  // Warm specular highlight
    ]);

    const texture = new THREE.DataTexture(colors, 4, 1, THREE.RGBAFormat);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    this.gradientMap = texture;
    return texture;
  }

  /**
   * Injects curved world horizon displacement into vertex shader
   */
  public static injectCurvedWorld(material: THREE.Material): void {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uCurvedActive = { value: CelShaders.isCurvedWorld ? 1.0 : 0.0 };
      shader.uniforms.uCurvatureRadius = { value: CelShaders.curvatureRadius };

      shader.vertexShader = `
        uniform float uCurvedActive;
        uniform float uCurvatureRadius;
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

      (material as unknown as { customUniforms?: typeof shader.uniforms }).customUniforms = shader.uniforms;
    };
  }

  /** Creates standard Anime Cel Toon Material with optional texture map and emissive glow */
  public static createToonMaterial(
    color: THREE.ColorRepresentation,
    options: {
      map?: THREE.Texture | null;
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

  /** Animated Anime River Water Shader with caustics and soft foam */
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
        pos.y += sin(pos.x * 0.9 + uTime * 2.2) * 0.035 + cos(pos.z * 1.3 + uTime * 1.6) * 0.025;

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
        vec2 uv1 = vUv * 9.0 + vec2(uTime * 0.05, uTime * 0.03);
        vec2 uv2 = vUv * 13.0 - vec2(uTime * 0.04, uTime * 0.06);

        float n1 = sin(uv1.x * 3.14 + sin(uv1.y * 2.5)) * 0.5 + 0.5;
        float n2 = cos(uv2.x * 2.8 + cos(uv2.y * 3.2)) * 0.5 + 0.5;
        float caustic = pow(n1 * n2, 2.0) * 0.85;

        // Gradient between turquoise blue and clear river green
        vec3 col = mix(uWaterColorDeep, uWaterColorShallow, 0.45 + 0.55 * sin(vUv.x * 2.0));
        col += vec3(caustic * 0.35, caustic * 0.45, caustic * 0.55);

        // Water surface sparkle and foam
        float foam = smoothstep(0.72, 0.96, sin(vUv.y * 32.0 + uTime * 3.0));
        col += vec3(foam * 0.22);

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
        uWaterColorShallow: { value: new THREE.Color(0x6ad4fe) },
        uWaterColorDeep: { value: new THREE.Color(0x19769f) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    (mat as unknown as { customUniforms?: typeof mat.uniforms }).customUniforms = mat.uniforms;
    return mat;
  }
}
