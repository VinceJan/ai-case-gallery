// Night sky dome, distant city backdrop, fog and the global light rig.
import * as THREE from 'three';
import * as L from './layout.js';
import { makeCanvas, toTex } from '../core/canvastex.js';

/** Painted backdrop: gradient sky + a far city silhouette with a few lit windows. */
function backdropTexture(rng) {
  const W = 2048, H = 512;
  const { c, x } = makeCanvas(W, H);
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0.00, '#04060e');
  g.addColorStop(0.42, '#0a1120');
  g.addColorStop(0.68, '#0f1a30');
  g.addColorStop(0.86, '#1a2a46');
  g.addColorStop(1.00, '#24375a');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  // low cloud band
  for (let i = 0; i < 40; i++) {
    const cy = H * (0.30 + rng() * 0.45), w = 120 + rng() * 460, h = 16 + rng() * 44;
    const gg = x.createRadialGradient(rng() * W, cy, 0, rng() * W, cy, w);
    x.globalAlpha = 0.10 + rng() * 0.12;
    x.fillStyle = '#5d7aa8';
    x.beginPath(); x.ellipse(rng() * W, cy, w, h, 0, 0, 6.3); x.fill();
    x.globalAlpha = 1;
  }
  // three depth layers of buildings
  const layers = [
    { top: 0.66, col: '#1b2b48', hMin: 0.12, hMax: 0.28, lit: 0.20, wMin: 30, wMax: 90 },
    { top: 0.74, col: '#142238', hMin: 0.16, hMax: 0.36, lit: 0.28, wMin: 24, wMax: 70 },
    { top: 0.84, col: '#0d1628', hMin: 0.20, hMax: 0.50, lit: 0.36, wMin: 18, wMax: 54 },
  ];
  for (const ly of layers) {
    let px = -40;
    while (px < W + 40) {
      const bw = ly.wMin + rng() * (ly.wMax - ly.wMin);
      const bh = H * (ly.hMin + rng() * (ly.hMax - ly.hMin));
      const by = H * ly.top - bh;
      x.fillStyle = ly.col; x.fillRect(px, by, bw, H - by);
      // roof detail
      if (rng() < 0.4) { x.fillRect(px + bw * 0.2, by - 6 - rng() * 16, 3, 18); }
      if (rng() < 0.25) { x.fillRect(px + bw * 0.55, by - 10, bw * 0.3, 10); }
      // lit windows
      const cols = Math.max(1, Math.floor(bw / 9)), rows = Math.max(1, Math.floor(bh / 11));
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        if (rng() > ly.lit * 0.42) continue;
        const wx = px + 4 + i * 9, wy = by + 5 + j * 11;
        x.fillStyle = ['#ffd9a0', '#ffe9c0', '#cfe2ff', '#ffcf8a', '#ffa8c8'][Math.floor(rng() * 5)];
        x.globalAlpha = 0.55 + rng() * 0.45;
        x.fillRect(wx, wy, 5, 7);
        x.globalAlpha = 1;
      }
      px += bw + 2 + rng() * 10;
    }
    // haze between layers
    const hz = x.createLinearGradient(0, H * (ly.top - 0.2), 0, H);
    hz.addColorStop(0, 'rgba(40,60,96,0)');
    hz.addColorStop(1, 'rgba(40,62,98,0.5)');
    x.fillStyle = hz; x.fillRect(0, H * (ly.top - 0.2), W, H);
  }
  return toTex(c);
}

export function build(ctx) {
  const { scene, mat } = ctx;
  const rng = ctx.rng('sky');
  const group = new THREE.Group();
  group.name = 'sky';

  scene.fog = new THREE.Fog(new THREE.Color(L.NIGHT.fog), L.NIGHT.fogNear, L.NIGHT.fogFar);

  // ---- backdrop cylinder
  const tex = backdropTexture(rng);
  tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(2.4, 1);
  const dome = new THREE.Mesh(
    new THREE.CylinderGeometry(105, 105, 62, 48, 1, true),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, toneMapped: false, fog: false, depthWrite: false })
  );
  dome.position.y = 12;
  dome.renderOrder = -10;
  group.add(dome);

  // a soft ground haze ring so the plinth does not float in a void
  const haze = new THREE.Mesh(
    new THREE.CircleGeometry(120, 48),
    new THREE.MeshBasicMaterial({ color: 0x0b1220, transparent: true, opacity: 0.9, fog: false, depthWrite: false })
  );
  haze.rotation.x = -Math.PI / 2;
  haze.position.y = -3.2;
  haze.renderOrder = -9;
  group.add(haze);

  // ---- lights
  const hemi = new THREE.HemisphereLight(new THREE.Color('#33496f'), new THREE.Color('#161b26'), 0.6);
  hemi.position.set(0, 20, 0);
  group.add(hemi);

  const moon = new THREE.DirectionalLight(new THREE.Color(L.NIGHT.moon), 1.05);
  moon.position.set(L.SUN_DIR[0] * 30, L.SUN_DIR[1] * 30, L.SUN_DIR[2] * 30);
  moon.target.position.set(-3, 0, -5);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const S = 17;
  moon.shadow.camera.left = -S; moon.shadow.camera.right = S;
  moon.shadow.camera.top = S; moon.shadow.camera.bottom = -S;
  moon.shadow.camera.near = 1; moon.shadow.camera.far = 90;
  moon.shadow.bias = -0.0012;
  moon.shadow.normalBias = 0.02;
  group.add(moon, moon.target);
  ctx.moon = moon;

  // a cool fill from the opposite side so silhouettes never go flat black
  const fill = new THREE.DirectionalLight(new THREE.Color('#5d7cb8'), 0.34);
  fill.position.set(-14, 9, 16);
  group.add(fill);

  ctx.addStatic(group);
  ctx.reflect(dome);
  return { moon, hemi };
}
