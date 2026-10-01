import * as THREE from 'three';

export function makeFlowMaterial(opacity = 0.9) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 }, uOpacity: { value: opacity } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        float edge = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
        float stream = sin(vUv.y * 73.0 - uTime * 5.2 + sin(vUv.x * 13.0) * 1.1);
        float shine = smoothstep(0.52, 0.96, stream) * 0.34;
        float ripples = pow(max(0.0, sin(vUv.y * 28.0 - uTime * 2.7 + vUv.x * 4.0)), 12.0) * 0.23;
        vec3 deep = vec3(0.025, 0.28, 0.34);
        vec3 pale = vec3(0.53, 0.84, 0.82);
        vec3 color = mix(deep, pale, shine + ripples);
        float alpha = uOpacity * edge * (0.82 + shine * 0.38 + ripples);
        gl_FragColor = vec4(color, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

function makeRibbon(points, heightAt, width) {
  const route = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal');
  const steps = Math.max(100, points.length * 32);
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const point = route.getPoint(t);
    const tangent = route.getTangent(t);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(width * 0.5);
    const y = heightAt(point.x, point.z) + 0.22;
    positions.push(point.x - side.x, y, point.z - side.z, point.x + side.x, y, point.z + side.z);
    uvs.push(0, t * 3.3, 1, t * 3.3);
    if (i < steps) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeCurtain(x, z, top, bottom, width, material, lean = 0) {
  const geometry = new THREE.BufferGeometry();
  const positions = [
    x - width * 0.5, bottom, z + lean,
    x + width * 0.5, bottom, z - lean,
    x + width * 0.5, top, z - lean * 0.25,
    x - width * 0.5, top, z + lean * 0.25,
  ];
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 1, 1, 1, 1, 0, 0, 0], 2));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  return mesh;
}

export function createWater(terrain) {
  const root = new THREE.Group();
  root.name = 'Waterways and waterfalls';
  const flowMaterial = makeFlowMaterial(0.9);
  const fineFlowMaterial = makeFlowMaterial(0.76);

  const primaryRoute = [
    [-10.8, -10.0], [-10.0, -7.0], [-9.2, -3.6], [-8.7, 1.6],
    [-9.0, 6.8], [-10.4, 11.5], [-12.4, 16.8], [-13.8, 21.6], [-14.0, 24.4],
  ];
  const secondaryRoute = [
    [8.0, -10.0], [9.0, -6.0], [10.8, -1.8], [12.7, 2.5],
    [14.2, 7.2], [15.6, 11.8], [17.2, 16.0], [18.0, 20.0],
  ];
  root.add(new THREE.Mesh(makeRibbon(primaryRoute, terrain.heightAt, 2.15), flowMaterial));
  root.add(new THREE.Mesh(makeRibbon(secondaryRoute, terrain.heightAt, 1.28), fineFlowMaterial));

  const upper = terrain.heightAt(-9.0, -2.2) + 0.12;
  const lower = terrain.heightAt(-9.0, 2.3) + 0.22;
  root.add(makeCurtain(-9.0, 0.55, Math.max(upper, lower + 2.0), lower, 3.2, flowMaterial, 0.28));

  const secondTop = terrain.heightAt(-12.2, 8.6) + 0.1;
  const secondBottom = terrain.heightAt(-12.2, 12.1) + 0.22;
  if (secondTop - secondBottom > 1.65) {
    root.add(makeCurtain(-12.2, 11.2, secondTop, secondBottom, 2.35, fineFlowMaterial, -0.18));
  }

  const poolMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 q = (vUv - 0.5) * 2.0;
        float radius = length(q);
        float edge = 1.0 - smoothstep(0.78, 1.0, radius);
        float ripple = pow(max(0.0, sin(radius * 54.0 - uTime * 2.1)), 8.0) * 0.28;
        vec3 color = mix(vec3(0.07, 0.34, 0.39), vec3(0.42, 0.72, 0.67), ripple);
        gl_FragColor = vec4(color, edge * 0.82);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const pool = new THREE.Mesh(new THREE.CircleGeometry(1, 72), poolMaterial);
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(-14.0, Math.max(1.08, terrain.heightAt(-14, 24.5) + 0.07), 24.5);
  pool.scale.set(11.5, 1, 6.3);
  pool.renderOrder = 1;
  root.add(pool);

  const foam = new THREE.Group();
  const foamMaterial = new THREE.MeshBasicMaterial({ color: 0xc8e6dd, transparent: true, opacity: 0.32, depthWrite: false });
  for (let i = 0; i < 14; i += 1) {
    const radius = 0.18 + (i % 4) * 0.09;
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius, radius + 0.055, 24), foamMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(-14 + Math.sin(i * 7.2) * (1.2 + (i % 5) * 0.75), pool.position.y + 0.04 + i * 0.001, 23.0 + Math.cos(i * 3.8) * (0.6 + (i % 4) * 0.65));
    foam.add(ring);
  }
  root.add(foam);

  return {
    root,
    update(time) {
      flowMaterial.uniforms.uTime.value = time;
      fineFlowMaterial.uniforms.uTime.value = time * 1.16;
      poolMaterial.uniforms.uTime.value = time;
      foam.rotation.y = Math.sin(time * 0.15) * 0.02;
    },
  };
}
