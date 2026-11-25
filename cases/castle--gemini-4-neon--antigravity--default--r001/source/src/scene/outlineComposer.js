import * as THREE from 'three';

/**
 * Cel-shaded ("三渲二") ink-outline post-processing pipeline.
 *
 * Pass 1: Renders opaque 3D diorama meshes to a HalfFloat normal+linearDepth buffer,
 *         then renders pixel-art character standees with an alphaTest mask sentinel
 *         (a = -1.0) so they properly occlude background 3D outlines without getting
 *         3D outlines drawn around themselves.
 * Pass 2: Renders the complete scene (with water, pixel standees, smoke, clouds, weather)
 *         to a 4x MSAA HalfFloat color buffer.
 * Pass 3: Fullscreen composite applies crisp depth + normal ink outlines in warm charcoal
 *         and outputs with Three.js ACES tone mapping + sRGB encoding.
 */
export class ToonOutlineComposer {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    const size = new THREE.Vector2();
    renderer.getDrawingBufferSize(size);
    const w = Math.max(1, Math.floor(size.x));
    const h = Math.max(1, Math.floor(size.y));

    this.colorTarget = new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      samples: 4,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });

    this.normalDepthTarget = new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType,
      samples: 0,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
    });

    this.normalDepthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uNear: { value: camera.near },
        uFar: { value: camera.far },
      },
      vertexShader: `
        varying vec3 vViewNormal;
        varying float vLinDepth;
        uniform float uNear;
        uniform float uFar;
        void main() {
          vec3 n = normal;
          vec4 mvPos;
          #ifdef USE_INSTANCING
            n = mat3(instanceMatrix) * n;
            mvPos = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          #else
            mvPos = modelViewMatrix * vec4(position, 1.0);
          #endif
          vViewNormal = normalize(normalMatrix * n);
          vLinDepth = clamp((-mvPos.z - uNear) / (uFar - uNear), 0.0, 1.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vViewNormal;
        varying float vLinDepth;
        void main() {
          gl_FragColor = vec4(normalize(vViewNormal) * 0.5 + 0.5, vLinDepth);
        }
      `,
    });

    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.compositeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tColor: { value: this.colorTarget.texture },
        tNormalDepth: { value: this.normalDepthTarget.texture },
        uTexelSize: { value: new THREE.Vector2(1 / w, 1 / h) },
        uInkColor: { value: new THREE.Color(0x2e252b) },
        uInkStrength: { value: 0.68 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tColor;
        uniform sampler2D tNormalDepth;
        uniform vec2 uTexelSize;
        uniform vec3 uInkColor;
        uniform float uInkStrength;
        varying vec2 vUv;

        void main() {
          vec4 baseCol = texture2D(tColor, vUv);
          vec4 ndC = texture2D(tNormalDepth, vUv);

          float edge = 0.0;

          // Only apply 3D ink outline when not masked by pixel characters (a < 0) and not sky (a >= 0.999)
          if (ndC.a >= 0.0) {
            vec2 o1 = vec2(uTexelSize.x, 0.0);
            vec2 o2 = vec2(0.0, uTexelSize.y);

            vec4 ndL = texture2D(tNormalDepth, vUv - o1);
            vec4 ndR = texture2D(tNormalDepth, vUv + o1);
            vec4 ndD = texture2D(tNormalDepth, vUv - o2);
            vec4 ndU = texture2D(tNormalDepth, vUv + o2);

            // Replace masked neighbors with center so pixel standees never create halos
            if (ndL.a < 0.0) ndL = ndC;
            if (ndR.a < 0.0) ndR = ndC;
            if (ndD.a < 0.0) ndD = ndC;
            if (ndU.a < 0.0) ndU = ndC;

            // Depth discontinuity (silhouette & overlapping geometry)
            float dEdgeX = abs(ndL.a - ndR.a);
            float dEdgeY = abs(ndD.a - ndU.a);
            float depthDiff = sqrt(dEdgeX * dEdgeX + dEdgeY * dEdgeY);
            float depthEdge = smoothstep(0.0055, 0.0155, depthDiff);

            // Normal discontinuity (architectural creases & beveled edges)
            vec3 nL = ndL.rgb * 2.0 - 1.0;
            vec3 nR = ndR.rgb * 2.0 - 1.0;
            vec3 nD = ndD.rgb * 2.0 - 1.0;
            vec3 nU = ndU.rgb * 2.0 - 1.0;
            float nDiff = length(nL - nR) + length(nD - nU);
            float normalEdge = smoothstep(0.42, 0.88, nDiff) * 0.72;

            // Suppress normal crease on pure sky pixels
            if (ndC.a > 0.995) {
              normalEdge = 0.0;
            }

            edge = clamp(max(depthEdge, normalEdge), 0.0, 1.0);
            // Distance softening so far silhouettes don't become overly thick
            float distFade = 1.0 - smoothstep(0.32, 0.85, ndC.a) * 0.42;
            edge *= distFade * uInkStrength;
          }

          vec3 finalCol = mix(baseCol.rgb, uInkColor, edge);
          gl_FragColor = vec4(finalCol, 1.0);

          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMaterial);
    this.postScene.add(quad);

    // Reusable visibility restoration arrays
    this._hiddenDuringNormalPass = [];
    this._maskMeshes = [];
  }

  setInkStyle(hexOrColor, strength) {
    this.compositeMaterial.uniforms.uInkColor.value.set(hexOrColor);
    this.compositeMaterial.uniforms.uInkStrength.value = strength;
  }

  setSize(width, height, pixelRatio) {
    const w = Math.max(1, Math.floor(width * pixelRatio));
    const h = Math.max(1, Math.floor(height * pixelRatio));
    this.colorTarget.setSize(w, h);
    this.normalDepthTarget.setSize(w, h);
    this.compositeMaterial.uniforms.uTexelSize.value.set(1 / w, 1 / h);
  }

  render() {
    const { renderer, scene, camera } = this;
    this.normalDepthMaterial.uniforms.uNear.value = camera.near;
    this.normalDepthMaterial.uniforms.uFar.value = camera.far;

    // 1. Collect noOutline and outlineMask meshes
    this._hiddenDuringNormalPass.length = 0;
    this._maskMeshes.length = 0;
    scene.traverse((obj) => {
      if (!obj.visible) return;
      if (obj.userData.noOutline) {
        this._hiddenDuringNormalPass.push(obj);
        obj.visible = false;
      } else if (obj.userData.outlineMask) {
        this._maskMeshes.push(obj);
        obj.visible = false;
      }
    });

    // Render opaque 3D geometry to normalDepthTarget
    const prevBg = scene.background;
    const prevFog = scene.fog;
    const prevClearColor = new THREE.Color();
    renderer.getClearColor(prevClearColor);
    const prevClearAlpha = renderer.getClearAlpha();

    scene.background = null;
    scene.fog = null;
    scene.overrideMaterial = this.normalDepthMaterial;

    renderer.setRenderTarget(this.normalDepthTarget);
    renderer.setClearColor(new THREE.Color(0.5, 0.5, 1.0), 1.0);
    renderer.clear(true, true, false);
    renderer.render(scene, camera);

    // 2. Render pixel standee occlusion masks into normalDepthTarget (using existing depth buffer!)
    scene.overrideMaterial = null;
    if (this._maskMeshes.length > 0) {
      // Hide everything except mask meshes temporarily by rendering them via a lightweight swap
      const savedMaterials = [];
      const savedVis = [];
      // Simpler: hide world meshes? No, even cleaner: render each mask mesh individually?
      // Wait: renderer.render renders a scene; we can just toggle maskMeshes visible and keep world hidden?
      // No, if we render only maskMeshes into a tiny helper? Wait: maskMeshes are inside world hierarchy (transformed!).
      // Best trick: traverse direct children of scene? Or keep pixelMaskGroup as a dedicated scene?
      // Actually, we can hide scene children except mask roots, OR swap materials on maskMeshes and set autoClear=false,
      // and hide opaque meshes? Let's use camera layers!
      // Layer 0 = normal scene, Layer 2 = pixel outline mask meshes!
      camera.layers.set(2);
      for (let i = 0; i < this._maskMeshes.length; i++) {
        const m = this._maskMeshes[i];
        m.visible = true;
        savedMaterials.push(m.material);
        if (m.userData.maskMaterial) {
          m.material = m.userData.maskMaterial;
        }
      }
      const prevAutoClear = renderer.autoClear;
      renderer.autoClear = false;
      renderer.render(scene, camera);
      renderer.autoClear = prevAutoClear;

      for (let i = 0; i < this._maskMeshes.length; i++) {
        this._maskMeshes[i].material = savedMaterials[i];
      }
      camera.layers.set(0);
    }

    // Restore visibility & scene settings
    for (let i = 0; i < this._hiddenDuringNormalPass.length; i++) {
      this._hiddenDuringNormalPass[i].visible = true;
    }
    for (let i = 0; i < this._maskMeshes.length; i++) {
      this._maskMeshes[i].visible = true;
    }
    scene.background = prevBg;
    scene.fog = prevFog;
    renderer.setClearColor(prevClearColor, prevClearAlpha);

    // 3. Render full scene to MSAA colorTarget
    renderer.setRenderTarget(this.colorTarget);
    renderer.clear(true, true, false);
    renderer.render(scene, camera);

    // 4. Composite color + ink outlines to screen
    renderer.setRenderTarget(null);
    renderer.render(this.postScene, this.postCamera);
  }

  dispose() {
    this.colorTarget.dispose();
    this.normalDepthTarget.dispose();
    this.normalDepthMaterial.dispose();
    this.compositeMaterial.dispose();
  }
}
