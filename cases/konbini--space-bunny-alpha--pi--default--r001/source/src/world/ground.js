// The base plate: one big painted texture (asphalt, tiles, paint, grime, puddles) driven by
// the wet-ground shader, plus the plinth, kerbs, gutters and drains.
import * as THREE from 'three';
import * as L from './layout.js';
import { makeCanvas, toTex, text, jp, sans, basePlate } from '../core/canvastex.js';

const S = 2048;                       // texture resolution for the whole 24 m plate
const M = S / L.BASE;                 // pixels per metre
const px = (m) => (m + L.HALF) * M;

function noiseSpeckle(x, x0, y0, w, h, n, colors, r) {
  for (let i = 0; i < n; i++) {
    x.fillStyle = colors[Math.floor(r() * colors.length)];
    const s = 1 + r() * 3;
    x.fillRect(x0 + r() * w, y0 + r() * h, s, s);
  }
}

export function build(ctx) {
  const r = ctx.rng('ground');
  const { mat, palette } = ctx;
  const group = new THREE.Group();
  group.name = 'ground';
  const kit = ctx.kit(group);

  // ---------------------------------------------------------------- painted plate
  const A = makeCanvas(S, S);   // colour
  const B = makeCanvas(S, S);   // wetness (alpha)
  const x = A.x, b = B.x;
  b.fillStyle = 'rgba(0,0,0,0.70)'; b.fillRect(0, 0, S, S);          // sidewalk: damp
  const wetRoad = (x0, z0, x1, z1, a) => { b.fillStyle = `rgba(0,0,0,${a})`; b.fillRect(px(x0), px(z0), (x1 - x0) * M, (z1 - z0) * M); };

  // sidewalk base
  x.fillStyle = '#8b8d92'; x.fillRect(0, 0, S, S);
  for (let i = 0; i < 2600; i++) {
    x.fillStyle = ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.06)', 'rgba(120,124,132,0.10)'][i % 3];
    x.fillRect(r() * S, r() * S, 6 + r() * 26, 6 + r() * 26);
  }
  // slab joints (0.9 m grid), slightly different tone per slab
  for (let sx = -L.HALF; sx < L.HALF; sx += 0.9) {
    for (let sz = -L.HALF; sz < L.HALF; sz += 0.9) {
      x.fillStyle = `rgba(255,255,255,${0.02 + r() * 0.03})`;
      x.fillRect(px(sx) + 1, px(sz) + 1, 0.9 * M - 2, 0.9 * M - 2);
      x.strokeStyle = 'rgba(0,0,0,0.16)'; x.lineWidth = 1.6;
      x.strokeRect(px(sx), px(sz), 0.9 * M, 0.9 * M);
    }
  }

  // parking lot surface (behind the block)
  const lotX0 = -L.HALF, lotX1 = 4.2, lotZ0 = 4.2;
  x.fillStyle = '#5f6167'; x.fillRect(px(lotX0), px(lotZ0), (lotX1 - lotX0) * M, (L.HALF - lotZ0) * M);
  x.fillStyle = 'rgba(0,0,0,0.12)';
  for (let i = 0; i < 900; i++) { x.fillRect(px(lotX0) + r() * (lotX1 - lotX0) * M, px(lotZ0) + r() * (L.HALF - lotZ0) * M, 2 + r() * 5, 2 + r() * 5); }
  wetRoad(lotX0, lotZ0, lotX1, L.HALF, 0.72);
  // parking bays
  x.strokeStyle = 'rgba(240,238,226,0.85)'; x.lineWidth = 5;
  for (let i = 0; i < 5; i++) {
    const bx = -11.2 + i * 2.6;
    x.beginPath(); x.moveTo(px(bx), px(lotZ0 + 0.4)); x.lineTo(px(bx), px(lotZ0 + 5.0)); x.stroke();
  }
  x.beginPath(); x.moveTo(px(-11.2), px(lotZ0 + 5.0)); x.lineTo(px(-11.2 + 5 * 2.6), px(lotZ0 + 5.0)); x.stroke();
  // bay numbers
  for (let i = 0; i < 5; i++) {
    x.save(); x.translate(px(-11.2 + i * 2.6 + 1.3), px(lotZ0 + 4.5)); x.rotate(-Math.PI / 2);
    text(x, String(12 + i), { ...sans(40, 700), x: 0, y: 0, color: 'rgba(240,238,226,0.75)' });
    x.restore();
  }

  // ---------------------------------------------------------------- roads
  const roadA = () => { x.fillStyle = '#4b4d54'; x.fillRect(0, px(L.ROAD_A.z0), S, (L.ROAD_A.z1 - L.ROAD_A.z0) * M); };
  const roadB = () => { x.fillStyle = '#4b4d54'; x.fillRect(px(L.ROAD_B.x0), px(L.ROAD_A.z0), (L.ROAD_B.x1 - L.ROAD_B.x0) * M, S); };
  roadA(); roadB();
  // asphalt grain + patches
  noiseSpeckle(x, 0, px(L.ROAD_A.z0), S, (L.ROAD_A.z1 - L.ROAD_A.z0) * M, 9000, ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.10)', 'rgba(90,94,104,0.14)'], r);
  noiseSpeckle(x, px(L.ROAD_B.x0), px(L.ROAD_A.z0), (L.ROAD_B.x1 - L.ROAD_B.x0) * M, S, 5200, ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.10)'], r);
  for (let i = 0; i < 5; i++) {  // repair patches
    x.fillStyle = 'rgba(30,32,38,0.35)';
    x.beginPath(); x.ellipse(px(-11 + r() * 21), px(-1.0 + r() * 5), (0.6 + r() * 1.6) * M, (0.4 + r() * 1.0) * M, r() * 3, 0, 6.3); x.fill();
  }
  // cracks
  x.strokeStyle = 'rgba(20,22,28,0.5)';
  for (let i = 0; i < 26; i++) {
    x.lineWidth = 1 + r() * 2.4;
    let cx = px(r() * 22 - 11), cy = px(L.ROAD_A.z0 + r() * 5.4);
    x.beginPath(); x.moveTo(cx, cy);
    for (let k = 0; k < 5; k++) { cx += (r() - 0.5) * 60; cy += (r() - 0.5) * 60; x.lineTo(cx, cy); }
    x.stroke();
  }
  wetRoad(-L.HALF, L.ROAD_A.z0, L.ROAD_B.x0, L.ROAD_A.z1, 0.90);
  wetRoad(L.ROAD_B.x0, L.ROAD_A.z0, L.ROAD_B.x1, L.HALF, 0.90);

  // kerb line (the kerb itself is geometry; this is the painted edge)
  x.strokeStyle = 'rgba(240,240,235,0.55)'; x.lineWidth = 6;
  x.beginPath(); x.moveTo(0, px(L.ROAD_A.z0)); x.lineTo(px(L.ROAD_B.x0), px(L.ROAD_A.z0));
  x.moveTo(px(L.ROAD_B.x0), px(L.ROAD_A.z0)); x.lineTo(px(L.ROAD_B.x0), px(L.HALF));
  x.moveTo(px(L.ROAD_B.x1), px(L.ROAD_A.z0)); x.lineTo(px(L.ROAD_B.x1), px(L.HALF)); x.stroke();

  // road paint
  x.fillStyle = 'rgba(238,196,72,0.9)';   // centre line
  for (let i = 0; i < 22; i++) x.fillRect(px(-12 + i * 0.95), px(1.5) - 4, 0.55 * M, 8);
  for (let i = 0; i < 14; i++) x.fillRect(px(6.7) - 4, px(L.ROAD_A.z0 + i * 0.95), 8, 0.55 * M);
  // stop bar + painted とまれ
  x.fillStyle = 'rgba(240,238,230,0.9)';
  x.fillRect(px(-9.2), px(3.5), 5.4 * M, 0.35 * M);
  x.save(); x.translate(px(-6.5), px(2.5)); x.rotate(Math.PI);
  text(x, 'とまれ', { ...jp(70, 700), x: 0, y: 0, color: 'rgba(240,238,230,0.8)' });
  x.restore();
  x.fillRect(px(L.ROAD_B.x0 + 0.3), px(4.6), 0.35 * M, 3.0 * M);
  x.save(); x.translate(px(5.6), px(6.1)); x.rotate(-Math.PI / 2);
  text(x, 'とまれ', { ...jp(70, 700), x: 0, y: 0, color: 'rgba(240,238,230,0.8)' });
  x.restore();

  // crosswalk (zebra) in front of the shop
  const cw = L.CROSSWALK;
  for (let i = 0; i < cw.stripes; i++) {
    const sx = cw.x0 + i * (cw.w + cw.gap);
    x.fillStyle = 'rgba(238,238,232,0.88)';
    x.fillRect(px(sx), px(L.ROAD_A.z0 + 0.1), cw.w * M, (L.ROAD_A.z1 - L.ROAD_A.z0 - 0.2) * M);
  }
  // wear on the stripes
  for (let i = 0; i < 120; i++) {
    x.fillStyle = 'rgba(60,62,70,0.35)';
    x.fillRect(px(cw.x0 + r() * 4.2), px(L.ROAD_A.z0 + r() * 5.2), 3 + r() * 10, 3 + r() * 10);
  }

  // tactile paving (点字ブロック) along the kerb near the crossing and at the corner
  const tactile = (x0, z0, x1, z1) => {
    x.fillStyle = '#c8a94e'; x.fillRect(px(x0), px(z0), (x1 - x0) * M, (z1 - z0) * M);
    for (let i = px(x0); i < px(x1); i += 14) for (let j = px(z0); j < px(z1); j += 14) {
      x.fillStyle = 'rgba(0,0,0,0.18)';
      x.beginPath(); x.arc(i + 7, j + 7, 3.4, 0, 6.3); x.fill();
      x.fillStyle = 'rgba(255,240,190,0.25)';
      x.beginPath(); x.arc(i + 6, j + 6, 3.0, 0, 6.3); x.fill();
    }
  };
  tactile(cw.x0 - 0.3, L.ROAD_A.z0 - 0.75, cw.x0 + 4.3, L.ROAD_A.z0 - 0.05);
  tactile(L.ROAD_B.x0 + 0.05, 4.6, L.ROAD_B.x0 + 0.75, 10.5);
  b.fillStyle = 'rgba(0,0,0,0.30)';
  b.fillRect(px(cw.x0 - 0.3), px(L.ROAD_A.z0 - 0.75), 4.6 * M, 0.7 * M);
  b.fillRect(px(L.ROAD_B.x0 + 0.05), px(4.6), 0.7 * M, 5.9 * M);

  // ---------------------------------------------------------------- gutters & drains
  const gutter = (x0, z0, x1, z1) => {
    x.fillStyle = 'rgba(20,22,28,0.55)'; x.fillRect(px(x0), px(z0), (x1 - x0) * M, (z1 - z0) * M);
    x.strokeStyle = 'rgba(150,155,165,0.25)'; x.lineWidth = 2;
    x.strokeRect(px(x0), px(z0), (x1 - x0) * M, (z1 - z0) * M);
  };
  gutter(-L.HALF, L.ROAD_A.z0 - 0.22, L.ROAD_B.x0, L.ROAD_A.z0);
  gutter(L.ROAD_B.x0 - 0.22, L.ROAD_A.z0, L.ROAD_B.x0, L.HALF);
  b.fillStyle = 'rgba(0,0,0,1)';
  b.fillRect(px(-L.HALF), px(L.ROAD_A.z0 - 0.22), (L.ROAD_B.x0 + L.HALF) * M, 0.22 * M);
  b.fillRect(px(L.ROAD_B.x0 - 0.22), px(L.ROAD_A.z0), 0.22 * M, (L.HALF - L.ROAD_A.z0) * M);
  // grates
  const grate = (gx, gz, w, h, rot = 0) => {
    x.save(); x.translate(px(gx), px(gz)); x.rotate(rot);
    x.fillStyle = '#3a3d44'; x.fillRect(-w * M / 2, -h * M / 2, w * M, h * M);
    x.fillStyle = '#191b20';
    const step = 0.09 * M;
    for (let i = step * 0.5; i < w * M; i += step) x.fillRect(-w * M / 2 + i, -h * M / 2 + 2, step * 0.5, h * M - 4);
    x.strokeStyle = 'rgba(160,166,176,0.35)'; x.lineWidth = 2; x.strokeRect(-w * M / 2, -h * M / 2, w * M, h * M);
    x.restore();
    b.fillStyle = 'rgba(0,0,0,1)'; b.fillRect(px(gx - w / 2), px(gz - h / 2), w * M, h * M);
  };
  grate(-2.2, L.ROAD_A.z0 - 0.11, 0.62, 0.2);
  grate(6.6, 8.4, 0.2, 0.62);
  grate(-6.4, L.ROAD_A.z0 - 0.11, 0.62, 0.2);
  // manhole + service covers
  for (const [mx, mz, rad] of [[-8.2, 2.1, 0.36], [2.6, 8.0, 0.32], [10.6, 1.2, 0.34], [-3.0, 9.0, 0.3]]) {
    x.fillStyle = '#3d4047'; x.beginPath(); x.arc(px(mx), px(mz), rad * M, 0, 6.3); x.fill();
    x.strokeStyle = 'rgba(160,166,176,0.4)'; x.lineWidth = 3; x.beginPath(); x.arc(px(mx), px(mz), rad * M * 0.92, 0, 6.3); x.stroke();
    x.fillStyle = 'rgba(20,22,28,0.5)';
    for (let i = 0; i < 8; i++) { const a = (i / 8) * 6.283; x.fillRect(px(mx) + Math.cos(a) * rad * M * 0.6 - 4, px(mz) + Math.sin(a) * rad * M * 0.6 - 4, 8, 8); }
  }

  // ---------------------------------------------------------------- puddles
  const puddle = (pux, puz, rx, rz, rot = 0) => {
    x.save(); x.translate(px(pux), px(puz)); x.rotate(rot);
    const g = x.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, rz) * M);
    g.addColorStop(0, 'rgba(24,30,44,0.62)');
    g.addColorStop(0.72, 'rgba(28,34,48,0.40)');
    g.addColorStop(1, 'rgba(30,36,50,0)');
    x.fillStyle = g; x.beginPath(); x.ellipse(0, 0, rx * M, rz * M, 0, 0, 6.3); x.fill();
    x.restore();
    b.save(); b.translate(px(pux), px(puz)); b.rotate(rot);
    const g2 = b.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, rz) * M);
    g2.addColorStop(0, 'rgba(0,0,0,1)'); g2.addColorStop(0.7, 'rgba(0,0,0,0.95)'); g2.addColorStop(1, 'rgba(0,0,0,0)');
    b.fillStyle = g2; b.beginPath(); b.ellipse(0, 0, rx * M, rz * M, 0, 0, 6.3); b.fill();
    b.restore();
  };
  for (let i = 0; i < 34; i++) {
    const onRoadA = r() < 0.55;
    const pux = onRoadA ? -12 + r() * 24 : (r() < 0.5 ? 4.2 + r() * 5 : -12 + r() * 16);
    const puz = onRoadA ? L.ROAD_A.z0 + r() * 5.4 : -4.6 + r() * 8;
    puddle(pux, puz, 0.4 + r() * 1.5, 0.25 + r() * 0.7, r() * 3);
  }
  puddle(-2.3, -3.5, 2.6, 1.0);          // the puddle right outside the door
  puddle(3.6, -2.2, 1.2, 0.6);
  puddle(-11.1, -1.0, 0.5, 1.4);        // the alley collects water
  puddle(2.0, 7.2, 1.8, 1.0);
  puddle(-5.0, 7.8, 1.4, 0.8);

  // dry-ish patches directly under the awning
  b.save();
  const ug = b.createLinearGradient(0, px(-4.6), 0, px(-3.4));
  ug.addColorStop(0, 'rgba(0,0,0,0.55)'); ug.addColorStop(1, 'rgba(0,0,0,0)');
  b.fillStyle = ug; b.fillRect(px(L.SHOP.x0), px(-4.6), (L.SHOP.x1 - L.SHOP.x0) * M, 1.2 * M);
  b.restore();

  // grime near the shop and the lot edges
  for (let i = 0; i < 40; i++) {
    x.fillStyle = `rgba(40,44,52,${0.05 + r() * 0.1})`;
    x.beginPath(); x.ellipse(px(-11 + r() * 21), px(r() < 0.5 ? -4.4 + r() * 3.4 : 4.4 + r() * 7), (0.3 + r()) * M, (0.3 + r()) * M, r() * 3, 0, 6.3); x.fill();
  }

  // ---------------------------------------------------------------- merge colour + wetness
  // The wetness layer is carried in canvas B's ALPHA channel; read it as such or the
  // (premultiplied) RGB of the finished plate is lost.
  const img = x.getImageData(0, 0, S, S);
  const wet = b.getImageData(0, 0, S, S).data;
  for (let i = 0; i < img.data.length; i += 4) img.data[i + 3] = Math.max(38, wet[i + 3]);
  x.putImageData(img, 0, 0);
  const groundTex = toTex(A.c);
  groundTex.anisotropy = 16;

  const gMat = mat.wetGround({ ambient: L.NIGHT.ambient, moon: L.NIGHT.moon, reflGain: 1.35, scale: 1.15 });
  gMat.uniforms.tMap.value = groundTex;
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(L.BASE, L.BASE), gMat);
  plate.rotation.x = -Math.PI / 2;
  plate.position.y = 0.002;
  plate.receiveShadow = true;
  plate.name = 'groundPlate';
  group.add(plate);
  ctx.groundMat = gMat;

  // ---------------------------------------------------------------- plinth
  const plinthMat = mat.toon('#20242e', { paint: 0.05 });
  const pw = L.BASE + L.PLINTH_OVER * 2;
  const plinth = kit.box(pw, L.PLINTH_H, pw, plinthMat, [0, -L.PLINTH_H / 2 - 0.002, 0]);
  plinth.name = 'plinth';
  // bevel rim
  kit.box(pw + 0.06, 0.05, pw + 0.06, mat.toon('#2c3240'), [0, -0.03, 0]);
  // name plate on the front rim
  const plateTex = basePlate();
  const np = kit.plane(3.4, 0.42, mat.emissive('#ffffff', 0.32, { map: plateTex }), [0, -0.3, pw / 2 + 0.005]);
  np.renderOrder = 1;

  // ---------------------------------------------------------------- kerbs
  const kerbMat = mat.toon('#9a9ca2', { paint: 0.06 });
  const kerb = (x0, z0, x1, z1) => kit.box(x1 - x0, 0.15, z1 - z0, kerbMat, [(x0 + x1) / 2, 0.075, (z0 + z1) / 2]);
  kerb(-L.HALF, L.ROAD_A.z0 - 0.3, L.ROAD_B.x0, L.ROAD_A.z0);
  kerb(L.ROAD_B.x0, L.ROAD_A.z0, L.ROAD_B.x0 + 0.3, L.HALF);
  kerb(L.ROAD_B.x1 - 0.3, L.ROAD_A.z0, L.ROAD_B.x1, L.HALF);
  kerb(L.ROAD_B.x1, L.ROAD_A.z0 - 0.3, L.HALF, L.ROAD_A.z0);
  // kerb nosing highlight
  const nose = mat.toon('#c9ccd2', { paint: 0.02 });
  kit.box(L.ROAD_B.x0 + L.HALF, 0.03, 0.06, nose, [(L.ROAD_B.x0 - L.HALF) / 2, 0.152, L.ROAD_A.z0 - 0.29]);

  // ---------------------------------------------------------------- alley threshold
  kit.box(0.1, 0.16, L.HALF - 0.0, kerbMat, [L.SHOP.x0 - 0.05, 0.08, (L.HALF + L.ROAD_A.z1) / 2]);

  ctx.addStatic(group);
  return { plate, groundMat: gMat, size: S };
}
