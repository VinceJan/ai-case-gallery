// The convenience store: shell, storefront glazing, awning, signage, roof plant, auto door.
import * as THREE from 'three';
import * as L from './layout.js';
import { signMain, signStrip, brandPanel, windowStickers, poster, toTex, makeCanvas, text, jp } from '../core/canvastex.js';

const S = L.SHOP;
const IN = L.INSIDE;

export function build(ctx) {
  const { mat, palette } = ctx;
  const r = ctx.rng('konbini');
  const g = new THREE.Group();
  g.name = 'konbini';
  const k = ctx.kit(g);

  const W = S.x1 - S.x0, D = S.z1 - S.z0;
  const cx = (S.x0 + S.x1) / 2, cz = (S.z0 + S.z1) / 2;

  // ------------------------------------------------------------------ shell
  const wallMat = mat.toon('#e9e6dd', { paint: 0.05 });
  const wallSide = mat.toon('#dcd9d1', { paint: 0.05 });
  const plinthMat = mat.toon('#4a4e58', { paint: 0.04 });
  const floorMat = mat.toon('#cfd2d6', { paint: 0.03 });

  // floor slab + interior floor
  k.box(W, 0.06, D, plinthMat, [cx, 0.03, cz]);
  k.box(IN.x1 - IN.x0, 0.05, IN.z1 - IN.z0, mat.toon('#e4e1d8', { paint: 0.02, emissive: '#8a6c3e', emissiveIntensity: 0.24 }),
    [(IN.x0 + IN.x1) / 2, 0.055, (IN.z0 + IN.z1) / 2]);
  // ceiling
  k.box(W - S.wall * 2, 0.12, D - S.wall * 2, mat.toon('#f2f0ea', { paint: 0.02, emissive: '#a08050', emissiveIntensity: 0.3 }),
    [cx, IN.ceil + 0.06, cz]);

  // back / side walls
  k.box(W, S.roof, S.wall, wallSide, [cx, S.roof / 2, S.z0 + S.wall / 2]);
  k.box(S.wall, S.roof, D, wallSide, [S.x0 + S.wall / 2, S.roof / 2, cz]);
  k.box(S.wall, S.roof, D, wallSide, [S.x1 - S.wall / 2, S.roof / 2, cz]);

  // front wall: base, head beam, end piers
  const frontZ = S.z1 - S.wall / 2;
  k.box(W, 0.42, S.wall, plinthMat, [cx, 0.21, frontZ]);
  k.box(W, 0.36, S.wall, wallMat, [cx, 0.60, frontZ]);          // 0.42 .. 0.78
  k.box(W, L.GLASS.y1 + 0.02 - 2.3 + 0.0, S.wall, wallMat, [cx, (L.GLASS.y1 + 2.78) / 2, frontZ]);
  // (head beam from 2.30 up to the sign band)
  const headBot = L.GLASS.y1, headTop = L.SIGN_BAND.y0;
  k.box(W, headTop - headBot, S.wall, wallMat, [cx, (headBot + headTop) / 2, frontZ]);
  // end piers flanking the glazing
  k.box(0.22, L.GLASS.y1 - L.GLASS.y0, S.wall, wallMat, [S.x0 + 0.11, (L.GLASS.y0 + L.GLASS.y1) / 2, frontZ]);
  k.box(0.22, L.GLASS.y1 - L.GLASS.y0, S.wall, wallMat, [S.x1 - 0.11, (L.GLASS.y0 + L.GLASS.y1) / 2, frontZ]);

  // facade banding (green + orange stripes above the glazing)
  k.box(W, 0.14, S.wall + 0.02, mat.toon('#1f8f5c'), [cx, L.GLASS.y1 + 0.12, frontZ]);
  k.box(W, 0.05, S.wall + 0.03, mat.toon('#f0703c'), [cx, L.GLASS.y1 + 0.21, frontZ]);

  // ------------------------------------------------------------------ glazing
  const glassMat = mat.rainGlass({ opacity: 0.10, indoor: 0.22, rain: 1.0, time: ctx.shared.uTime, aspect: 1.1 });
  const alu = mat.toon('#b9bdc4', { paint: 0.02 });
  const aluDark = mat.toon('#8d929b', { paint: 0.02 });
  const glassY = (L.GLASS.y0 + L.GLASS.y1) / 2, glassH = L.GLASS.y1 - L.GLASS.y0;
  const panels = [];
  const doorC = (L.DOOR.x0 + L.DOOR.x1) / 2;
  // glazing panels; the doorway is left out
  const PANELS = [
    [-9.86, -8.18], [-8.18, -6.62], [-6.62, -5.06], [-5.06, -3.25],
    [-1.35, -0.46],
  ];
  for (const [a, b] of PANELS) {
    const w = b - a;
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, glassH), glassMat);
    p.position.set((a + b) / 2, glassY, S.z1 - 0.04);
    g.add(p);
    panels.push(p);
    // mullion at the panel's left edge
    k.box(0.08, glassH + 0.1, 0.14, alu, [a, glassY, S.z1 - 0.08]);
    // horizontal transoms
    k.box(w, 0.05, 0.1, alu, [(a + b) / 2, L.GLASS.y0 + 0.03, S.z1 - 0.08]);
    k.box(w, 0.05, 0.1, alu, [(a + b) / 2, L.GLASS.y1 - 0.03, S.z1 - 0.08]);
  }
  k.box(0.08, glassH + 0.1, 0.14, alu, [-0.46, glassY, S.z1 - 0.08]);

  // interior side of the shopfront: warm poster strip taped to the inside of the glass
  const stickerTex = windowStickers();
  const strip = k.plane(W - 0.6, 0.42, mat.emissive('#ffffff', 0.85, { map: stickerTex, transparent: true }),
    [cx - 0.2, L.GLASS.y0 + 0.34, S.z1 - 0.1], [0, Math.PI, 0]);
  strip.material.depthWrite = false;

  // ------------------------------------------------------------------ doorway
  const doorW = L.DOOR.x1 - L.DOOR.x0, doorH = L.DOOR.y1 - L.DOOR.y0;
  k.box(0.1, doorH + 0.12, 0.18, aluDark, [L.DOOR.x0, L.DOOR.y0 + doorH / 2, S.z1 - 0.08]);
  k.box(0.1, doorH + 0.12, 0.18, aluDark, [L.DOOR.x1, L.DOOR.y0 + doorH / 2, S.z1 - 0.08]);
  k.box(doorW + 0.2, 0.14, 0.18, aluDark, [doorC, L.DOOR.y1 + 0.07, S.z1 - 0.08]);
  k.box(doorW + 0.2, 0.1, 0.3, aluDark, [doorC, L.DOOR.y0 - 0.05, S.z1 - 0.15]);   // threshold
  // sensor + "自動ドア" sticker
  k.box(0.22, 0.07, 0.12, mat.toon('#3a3f48'), [doorC, L.DOOR.y1 + 0.17, S.z1 - 0.14]);
  const autoTex = (() => { const { c, x, w, h } = makeCanvas(256, 64); x.clearRect(0, 0, w, h); text(x, '自動ドア', { ...jp(34, 700), x: w / 2, y: h / 2, color: '#1f8f5c' }); return toTex(c); })();
  k.plane(0.7, 0.17, mat.emissive('#ffffff', 0.9, { map: autoTex, transparent: true }), [doorC, L.DOOR.y1 + 0.2, S.z1 - 0.03]);
  // the sliding leaves
  const doorMat = mat.rainGlass({ opacity: 0.11, indoor: 0.3, rain: 0.5, time: ctx.shared.uTime, aspect: 0.6 });
  const leaves = [];
  for (const sgn of [-1, 1]) {
    const lg = new THREE.Group();
    lg.position.set(doorC + sgn * (doorW / 4), 0, S.z1 - 0.07);
    const leaf = new THREE.Mesh(new THREE.PlaneGeometry(doorW / 2 - 0.02, doorH - 0.04), doorMat);
    leaf.position.set(0, L.DOOR.y0 + doorH / 2, 0);
    lg.add(leaf);
    const fr = new THREE.Mesh(new THREE.BoxGeometry(0.05, doorH - 0.04, 0.06), aluDark);
    fr.position.set(-sgn * (doorW / 4 - 0.025), L.DOOR.y0 + doorH / 2, 0);
    lg.add(fr);
    const glint = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.9), mat.emissive('#f4f8ff', 0.5, { transparent: true }));
    glint.position.set(sgn * (doorW / 4 - 0.22), L.DOOR.y0 + doorH * 0.55, 0.012);
    lg.add(glint);
    lg.userData = { sgn, closed: doorC + sgn * (doorW / 4), open: doorC + sgn * (doorW / 4 + doorW / 2 - 0.06) };
    g.add(lg);
    leaves.push(lg);
  }
  // entrance mat
  k.box(2.0, 0.035, 1.0, mat.toon('#2c2f36', { paint: 0.02 }), [doorC, 0.07, S.z1 + 0.75]);
  k.box(1.8, 0.01, 0.82, mat.toon('#43474f'), [doorC, 0.09, S.z1 + 0.75]);

  // ------------------------------------------------------------------ awning
  const aw = L.AWNING;
  const awnW = W - 0.2, awnCx = cx, awnD = S.z1 - aw.z;
  k.box(awnW, 0.09, awnD, mat.toon('#e6e3da', { paint: 0.04 }), [awnCx, aw.y, (S.z1 + aw.z) / 2]);
  k.box(awnW, 0.03, awnD, mat.toon('#cfcbc0'), [awnCx, aw.y - 0.06, (S.z1 + aw.z) / 2]);   // underside
  // fascia light box
  const stripTex = signStrip();
  const fasciaMat = new THREE.MeshBasicMaterial({ map: stripTex, toneMapped: false, color: new THREE.Color(1.25, 1.2, 1.12) });
  k.box(awnW, aw.drop, 0.09, mat.toon('#f4f1e8'), [awnCx, aw.y - 0.02 - aw.drop / 2, aw.z]);
  k.plane(awnW - 0.1, aw.drop - 0.05, fasciaMat, [awnCx, aw.y - 0.02 - aw.drop / 2, aw.z + 0.05]);
  // downlights under the awning
  const dlMat = mat.emissive('#ffe6bd', 1.9);
  for (let i = 0; i < 5; i++) {
    const x = -9.0 + i * 1.9;
    k.cyl(0.1, 0.11, 0.05, dlMat, [x, aw.y - 0.07, aw.z + 0.35]);
  }
  // brackets
  const steel = mat.toon('#9aa1aa', { paint: 0.03 });
  for (let i = 0; i < 3; i++) {
    const x = -8.6 + i * 4.3;
    k.box(0.04, 0.56, 0.04, steel, [x, aw.y + 0.25, aw.z + 0.42], [1.0, 0, 0]);
  }
  k.box(awnW, 0.04, 0.07, steel, [awnCx, aw.y + 0.76, aw.z + 0.02]);

  // ------------------------------------------------------------------ signs
  const sb = L.SIGN_BAND;
  k.box(W - 0.1, sb.y1 - sb.y0, 0.26, mat.toon('#f6f4ee'), [cx, (sb.y0 + sb.y1) / 2, frontZ - 0.02]);
  const signMat = new THREE.MeshBasicMaterial({ map: signMain(), toneMapped: false, color: new THREE.Color(1.2, 1.18, 1.1) });
  k.plane(W - 0.28, sb.y1 - sb.y0 - 0.12, signMat, [cx, (sb.y0 + sb.y1) / 2, frontZ + 0.12]);
  // green under-glow of the sign box
  k.box(W - 0.1, 0.04, 0.3, mat.emissive('#bff0d8', 1.1), [cx, sb.y0 - 0.02, frontZ]);

  // roof sign
  const rs = L.ROOF_SIGN;
  for (const dx of [-rs.w / 2 + 0.3, rs.w / 2 - 0.3]) k.box(0.12, rs.y0 - S.roof + 0.3, 0.12, steel, [rs.x + dx, (S.roof + rs.y0 + 0.3) / 2, frontZ - 0.25]);
  k.box(rs.w, rs.y1 - rs.y0, 0.3, mat.toon('#e9e6de'), [rs.x, (rs.y0 + rs.y1) / 2, frontZ - 0.25]);
  const roofSignMat = new THREE.MeshBasicMaterial({ map: brandPanel(), toneMapped: false, color: new THREE.Color(1.45, 1.4, 1.28) });
  k.plane(rs.w - 0.1, rs.y1 - rs.y0 - 0.12, roofSignMat, [rs.x, (rs.y0 + rs.y1) / 2, frontZ - 0.09]);
  k.plane(rs.w - 0.1, rs.y1 - rs.y0 - 0.12, roofSignMat, [rs.x, (rs.y0 + rs.y1) / 2, frontZ - 0.41], [0, Math.PI, 0]);
  // little mascot light on top
  k.cyl(0.03, 0.03, 0.5, steel, [rs.x, rs.y1 + 0.25, frontZ - 0.25]);
  k.sphere(0.16, mat.emissive('#ffe08a', 1.7), [rs.x, rs.y1 + 0.56, frontZ - 0.25]);

  // ------------------------------------------------------------------ roof
  k.box(W, 0.16, D, mat.toon('#7d8188', { paint: 0.06 }), [cx, S.roof - 0.08, cz]);
  const parapet = mat.toon('#d9d6ce', { paint: 0.05 });
  k.box(W, 0.3, 0.16, parapet, [cx, S.roof + 0.15, S.z1 - 0.08]);
  k.box(W, 0.3, 0.16, parapet, [cx, S.roof + 0.15, S.z0 + 0.08]);
  k.box(0.16, 0.3, D, parapet, [S.x0 + 0.08, S.roof + 0.15, cz]);
  k.box(0.16, 0.3, D, parapet, [S.x1 - 0.08, S.roof + 0.15, cz]);
  k.box(W + 0.06, 0.06, D + 0.06, mat.toon('#5a5e68'), [cx, S.roof + 0.32, cz]);
  // roof deck puddle + drains
  k.plane(2.2, 1.4, mat.decal('#5c6b80', { opacity: 0.55 }), [-3.4, S.roof + 0.01, -9.4], [-Math.PI / 2, 0, 0]);
  // roof plant
  const roofDark = mat.toon('#5f646c', { paint: 0.05 });
  for (const ac of L.AT.acRoof) {
    const u = k.group([ac.x, 0, ac.z]);
    k.box(1.05, 0.72, 0.42, mat.toon('#c9ccd2', { paint: 0.04 }), [0, S.roof + 0.36, 0]);
    k.cyl(0.24, 0.24, 0.06, mat.toon('#6d737c'), [0, S.roof + 0.74, 0]);
    k.cyl(0.2, 0.2, 0.08, mat.toon('#8a9099'), [0, S.roof + 0.76, 0]);
    for (let i = 0; i < 3; i++) k.box(0.5, 0.02, 0.02, mat.toon('#4a4f58'), [0, S.roof + 0.36, 0.22]);
  }
  // ---- rooftop plant: the slab must read as a real Japanese flat roof
  const y0 = S.roof;                       // deck level
  const steelL = mat.toon('#9aa1a8', { paint: 0.04 });
  const steelD = mat.toon('#5f646c', { paint: 0.05 });
  const deckY = mat.toon('#6e737b', { paint: 0.07 });
  // painted maintenance walkway
  k.plane(9.2, 0.12, mat.decal('#c8b45a', { opacity: 0.5 }), [-5.2, y0 + 0.012, -7.2], [-Math.PI / 2, 0, 0]);
  k.plane(0.12, 6.0, mat.decal('#c8b45a', { opacity: 0.5 }), [-1.6, y0 + 0.012, -8.4], [-Math.PI / 2, 0, 0]);

  // 1) water tank on a steel frame  (給水塔)
  {
    const tx = -8.7, tz = -10.4, legH = 0.95, r = 0.78;
    for (let i = 0; i < 4; i++) {
      const ax = tx + (i & 1 ? r * 0.72 : -r * 0.72);
      const az = tz + (i & 2 ? r * 0.72 : -r * 0.72);
      k.box(0.09, legH, 0.09, steelL, [ax, y0 + legH / 2, az]);
    }
    k.box(r * 1.6, 0.06, 0.06, steelL, [tx, y0 + 0.3, tz - r * 0.72]);
    k.box(r * 1.6, 0.06, 0.06, steelL, [tx, y0 + 0.3, tz + r * 0.72]);
    k.box(r * 1.6, 0.06, 0.06, steelL, [tx - r * 0.72, y0 + 0.3, tz], [0, Math.PI / 2, 0]);
    k.box(r * 1.6, 0.06, 0.06, steelL, [tx + r * 0.72, y0 + 0.3, tz], [0, Math.PI / 2, 0]);
    k.cyl(r, r, 0.1, steelD, [tx, y0 + legH, tz]);
    k.cyl(r, r, 1.15, mat.toon('#4f6f8a', { paint: 0.05 }), [tx, y0 + legH + 0.62, tz]);
    k.cyl(r + 0.05, r + 0.05, 0.09, mat.toon('#3f5a72'), [tx, y0 + legH + 1.22, tz]);
    k.cyl(0.16, 0.16, 0.14, steelD, [tx, y0 + legH + 1.32, tz]);
    for (let i = 0; i < 3; i++) {           // hoop bands
      const a = (i / 3) * Math.PI * 2;
      k.cyl(r + 0.02, r + 0.02, 0.05, steelL, [tx, y0 + legH + 0.25 + i * 0.32, tz]);
    }
    k.cyl(0.06, 0.06, 0.9, steelL, [tx + r + 0.06, y0 + legH + 0.2, tz]);   // down pipe
    k.box(0.12, 0.5, 0.12, mat.toon('#2f4a5e'), [tx + r + 0.06, y0 + 0.6, tz]);
  }

  // 2) stair penthouse (階段室) with a lit door
  {
    const px = -6.0, pz = -10.9;
    k.box(1.9, 2.15, 1.7, mat.toon('#cfcbc2', { paint: 0.05 }), [px, y0 + 1.07, pz]);
    k.box(2.05, 0.12, 1.85, mat.toon('#5f646c'), [px, y0 + 2.19, pz]);
    k.box(0.06, 1.85, 0.9, mat.toon('#8b9098'), [px - 0.96, y0 + 0.93, pz + 0.3]);
    k.box(0.05, 0.1, 0.06, mat.toon('#5c626b'), [px - 1.0, y0 + 1.0, pz + 0.62]);
    k.box(0.1, 0.16, 0.34, steelD, [px - 0.96, y0 + 2.0, pz + 0.3]);
    k.box(0.05, 0.06, 0.24, mat.emissive('#ffe0a8', 1.5), [px - 1.02, y0 + 1.92, pz + 0.3]);
    k.box(0.9, 0.1, 0.5, steelD, [px, y0 + 2.35, pz - 0.2]);        // rooftop unit on top
    k.cyl(0.16, 0.16, 0.2, mat.toon('#8f959d'), [px, y0 + 2.5, pz - 0.2]);
    k.box(1.94, 0.09, 1.74, mat.toon('#9aa1a8'), [px, y0 + 1.5, pz]);  // trim band
    k.box(1.94, 0.05, 1.74, mat.toon('#8a9098'), [px, y0 + 0.18, pz]);
    k.box(0.86, 1.9, 0.05, mat.toon('#8b9098'), [px, y0 + 0.97, pz + 0.86]);
    k.box(0.9, 0.06, 0.03, steelD, [px, y0 + 1.94, pz + 0.87]);
    {
      const { c: nc, x: nx } = makeCanvas(256, 80);
      nx.fillStyle = '#c0281f'; nx.fillRect(0, 0, 256, 80);
      nx.fillStyle = 'rgba(255,255,255,0.14)'; nx.fillRect(0, 0, 256, 8); nx.fillRect(0, 72, 256, 8);
      text(nx, '関係者以外', { ...jp(38, 700), x: 128, y: 42, color: '#f7f2e6' });
      k.plane(0.5, 0.16, mat.emissive('#ffffff', 0.35, { map: toTex(nc) }), [px, y0 + 1.72, pz + 0.89]);
    }
    k.box(0.12, 0.14, 0.3, steelD, [px + 0.62, y0 + 2.0, pz + 0.86]);
    k.box(0.06, 0.05, 0.22, mat.emissive('#ffe0a8', 1.5), [px + 0.62, y0 + 1.93, pz + 0.86]);
    k.box(0.55, 0.35, 0.06, mat.toon('#8a9098'), [px - 0.45, y0 + 0.55, pz + 0.86]);
  }

  // 3) condenser bank on steel rails
  for (let i = 0; i < 3; i++) {
    const ax = -4.15, az = -11.1 + i * 0.62;
    k.box(0.98, 0.66, 0.5, mat.toon('#c9ccd2', { paint: 0.04 }), [ax, y0 + 0.44, az]);
    k.cyl(0.22, 0.22, 0.05, mat.toon('#6d737c'), [ax, y0 + 0.79, az], [Math.PI / 2, 0, 0]);
    k.cyl(0.19, 0.19, 0.07, mat.toon('#8a9099'), [ax, y0 + 0.8, az], [Math.PI / 2, 0, 0]);
    for (let f = 0; f < 4; f++) k.box(0.02, 0.5, 0.02, mat.toon('#585e67'), [ax - 0.16 + f * 0.11, y0 + 0.44, az + 0.26]);
    k.box(1.06, 0.06, 0.58, steelD, [ax, y0 + 0.06, az]);
    k.cyl(0.045, 0.045, 0.6, steelL, [ax + 0.5, y0 + 0.4, az + 0.3]);   // refrigerant line
  }
  k.box(0.1, 0.1, 2.2, steelL, [-4.15, y0 + 0.9, -10.7]);

  // 4) satellite dish
  {
    const dx = -1.5, dz = -10.6;
    k.box(0.12, 0.5, 0.12, steelD, [dx, y0 + 0.25, dz]);
    k.cyl(0.36, 0.3, 0.1, mat.toon('#e2e4e6', { paint: 0.03 }), [dx, y0 + 0.62, dz], [1.05, 0.5, 0]);
    k.cyl(0.05, 0.05, 0.4, steelL, [dx + 0.1, y0 + 0.7, dz + 0.16], [0.6, 0, 0]);
  }

  // 5) roof access ladder + hand rail against the alley side
  for (let i = 0; i < 9; i++) k.box(0.44, 0.035, 0.035, mat.toon('#b6bcc4'), [-9.95, y0 + 0.2 + i * 0.38, -8.6]);
  k.cyl(0.04, 0.04, 3.6, mat.toon('#b6bcc4'), [-9.75, y0 + 1.7, -8.6]);
  k.cyl(0.04, 0.04, 3.6, mat.toon('#b6bcc4'), [-10.15, y0 + 1.7, -8.6]);
  k.box(0.1, 0.1, 0.5, steelD, [-9.95, y0 + 0.12, -8.6]);

  // 6) antenna cluster with an aviation lamp
  for (let i = 0; i < 3; i++) {
    const ax = -7.6 + i * 0.34;
    k.cyl(0.032, 0.05, 1.7 + i * 0.35, steelL, [ax, y0 + 0.85 + i * 0.17, -6.2]);
    k.box(0.62 - i * 0.12, 0.018, 0.018, steelL, [ax, y0 + 1.45 + i * 0.3, -6.2]);
  }
  k.box(0.7, 0.018, 0.018, steelL, [-7.4, y0 + 1.2, -6.2]);
  const avLamp = k.sphere(0.06, mat.emissive('#ff6b6b', 2.2), [-7.6, y0 + 1.95, -6.2]);
  ctx.services.roofAvLamp = avLamp;

  // 7) pipe stack, gutter, drain, puddle, roof light
  for (let i = 0; i < 3; i++) k.cyl(0.05, 0.05, 1.1, steelL, [-1.9 + i * 0.22, y0 + 0.55, -11.35]);
  k.box(0.9, 0.1, 0.14, steelD, [-1.7, y0 + 1.05, -11.35]);
  k.cyl(0.18, 0.22, 0.72, mat.toon('#b7bcc3'), [-5.9, y0 + 0.36, -6.5]);
  k.cyl(0.3, 0.18, 0.12, mat.toon('#8f959d'), [-5.9, y0 + 0.78, -6.5]);
  k.cyl(0.24, 0.24, 0.06, mat.toon('#6a7078'), [-3.1, y0 + 0.03, -6.1]);
  k.box(0.4, 0.05, 0.4, steelD, [-2.6, y0 + 0.05, -5.35]);
  k.cyl(0.34, 0.34, 0.05, mat.toon('#aeb4bc'), [-2.6, y0 + 0.08, -5.35]);
  k.box(0.5, 0.16, 0.34, steelD, [-0.95, y0 + 0.08, -6.4]);          // roof hatch
  k.box(0.54, 0.04, 0.38, mat.toon('#9aa1a8'), [-0.95, y0 + 0.18, -6.4]);
  for (const p of [[-3.4, -9.4, 2.2, 1.4], [-7.2, -7.2, 1.6, 1.0], [-2.2, -11.0, 1.3, 0.9]]) {
    k.plane(p[2], p[3], mat.decal('#5c6b80', { opacity: 0.5 }), [p[0], y0 + 0.011, p[1]], [-Math.PI / 2, 0, 0]);
  }
  k.plane(9.0, 0.02, mat.decal('#7e848c', { opacity: 0.0 }), [-5.2, y0 + 0.005, -8.4], [-Math.PI / 2, 0, 0]);

  // ------------------------------------------------------------------ side + back detail
  // east wall: service door, gas riser, meter box, posters
  const ex = S.x1;
  k.box(0.08, 2.05, 0.92, mat.toon('#8f949c', { paint: 0.05 }), [ex + 0.02, 1.03, -9.4]);
  k.box(0.05, 0.5, 0.06, mat.toon('#5c626b'), [ex + 0.07, 1.05, -9.05]);
  k.box(0.3, 0.42, 0.36, mat.toon('#a7acb4'), [ex + 0.06, 1.5, -10.4]);
  // wall lamp over the service door
  k.box(0.12, 0.1, 0.34, mat.toon('#767c85'), [ex + 0.1, 2.42, -9.4]);
  k.box(0.07, 0.04, 0.26, mat.emissive('#ffd9a0', 1.6), [ex + 0.16, 2.36, -9.4]);
  const eastLamp = new THREE.PointLight(new THREE.Color('#ffcf92'), 1.3, 4.5, 2.0);
  eastLamp.position.set(ex + 0.5, 2.3, -9.4);
  g.add(eastLamp);
  // conduit runs + a hose reel, so the wall is not a blank slab
  for (let i = 0; i < 2; i++) k.cyl(0.05, 0.05, 2.6, mat.toon('#b0b6be'), [ex + 0.06, 1.2 + i * 0.14, -11.0 + i * 0.1]);
  k.box(0.14, 0.3, 0.3, mat.toon('#4c5560'), [ex + 0.06, 0.9, -6.6]);
  k.plane(0.34, 0.5, mat.emissive('#ffffff', 0.4, { map: poster(1, r) }), [ex + 0.01, 1.55, -6.6], [0, Math.PI / 2, 0]);
  k.cyl(0.07, 0.07, 2.4, mat.toon('#7d838c'), [ex + 0.09, 1.2, -11.6]);
  for (const pz of [-7.0, -6.2]) k.plane(0.42, 0.6, mat.emissive('#ffffff', 0.5, { map: poster(2, r) }), [ex + 0.01, 1.6, pz], [0, Math.PI / 2, 0]);
  // drainpipe on the corner
  k.cyl(0.09, 0.09, S.roof, mat.toon('#c2c6cc'), [ex + 0.08, S.roof / 2, S.z1 - 0.45]);
  k.cyl(0.11, 0.11, 0.12, mat.toon('#a8adb4'), [ex + 0.08, 0.1, S.z1 - 0.45]);

  // north (alley) wall: high windows, AC, hose box, wall lamp
  const wx = S.x0;
  for (let i = 0; i < 3; i++) {
    k.box(0.06, 0.5, 0.9, mat.toon('#5c646f'), [wx - 0.02, 2.15, -10.2 + i * 1.6]);
  }
  k.box(0.5, 0.62, 0.9, mat.toon('#c4c8ce', { paint: 0.04 }), [wx - 0.3, 2.3, -6.2]);
  k.box(0.46, 0.1, 0.86, mat.toon('#7d838c'), [wx - 0.3, 2.66, -6.2]);
  k.box(0.14, 0.7, 0.5, mat.toon('#b03a3a'), [wx - 0.06, 1.2, -4.9]);
  k.cyl(0.07, 0.07, 3.0, mat.toon('#8b9099'), [wx - 0.08, 1.5, S.z1 - 0.5]);
  // back wall: shutter + crates
  k.box(2.4, 2.2, 0.1, mat.toon('#8a8f97', { paint: 0.06 }), [cx - 1.5, 1.1, S.z0 + 0.05]);
  for (let i = 0; i < 9; i++) k.box(2.3, 0.03, 0.04, mat.toon('#6f757e'), [cx - 1.5, 0.2 + i * 0.24, S.z0 + 0.12]);
  k.box(0.9, 0.7, 0.08, mat.toon('#5d6470'), [cx + 2.6, 1.9, S.z0 + 0.04]);

  // wall-mounted AC condensers
  for (const ac of L.AT.acWall) {
    const u = k.group([ac.x, 0, ac.z], ac.ry);
    k.box(0.9, 0.66, 0.36, mat.toon('#cdd1d6', { paint: 0.04 }), [0, 2.1, 0]);
    k.cyl(0.2, 0.2, 0.05, mat.toon('#787e87'), [0, 2.1, 0.19], [Math.PI / 2, 0, 0]);
    for (let i = 0; i < 3; i++) k.box(0.44, 0.02, 0.02, mat.toon('#565c65'), [0, 2.1, 0.2], [0, 0, i * 0.4]);
    k.box(0.05, 0.5, 0.05, mat.toon('#9aa0a8'), [-0.3, 1.7, 0.14]);
    k.box(0.05, 0.5, 0.05, mat.toon('#9aa0a8'), [0.3, 1.7, 0.14]);
  }

  // ------------------------------------------------------------------ lights
  const warm = new THREE.Color(L.NIGHT.warm);
  const awnLight = new THREE.PointLight(warm, 4.2, 10, 2.0);
  awnLight.position.set(doorC, 2.2, S.z1 + 0.5);
  g.add(awnLight);
  const signLight = new THREE.PointLight(new THREE.Color('#dff5e8'), 1.8, 7, 2.0);
  signLight.position.set(cx, sb.y1 - 0.2, frontZ + 0.7);
  g.add(signLight);
  const roofSignLight = new THREE.PointLight(new THREE.Color('#ffe7bb'), 1.5, 6, 2.0);
  roofSignLight.position.set(rs.x, rs.y0 + 0.4, frontZ + 0.3);
  g.add(roofSignLight);
  ctx.services.signMat = signMat;
  ctx.services.signLight = signLight;
  ctx.services.roofSignMat = roofSignMat;
  ctx.services.roofSignLight = roofSignLight;
  ctx.services.fasciaMat = fasciaMat;
  ctx.services.awnLight = awnLight;

  ctx.reflect(g);

  // ------------------------------------------------------------------ animation
  // auto door: opens now and then, easing in and out
  let nextOpen = 4.5, doorT = 0, state = 'closed';
  ctx.onUpdate((dt, t) => {
    if (t > nextOpen && state === 'closed') { state = 'opening'; doorT = 0; }
    if (state === 'opening') {
      doorT += dt;
      const k01 = Math.min(1, doorT / 0.55);
      const e = k01 * k01 * (3 - 2 * k01);
      for (const lg of leaves) lg.position.x = lg.userData.closed + (lg.userData.open - lg.userData.closed) * e;
      if (k01 >= 1) { state = 'open'; doorT = 0; nextOpen = t + 9 + r() * 12; }
    } else if (state === 'open') {
      doorT += dt;
      const k01 = Math.min(1, doorT / 2.6);
      const e = k01 * k01 * (3 - 2 * k01);
      for (const lg of leaves) lg.position.x = lg.userData.open + (lg.userData.closed - lg.userData.open) * e;
      if (k01 >= 1) { state = 'closing'; doorT = 0; }
    } else if (state === 'closing') {
      doorT += dt;
      const k01 = Math.min(1, doorT / 0.7);
      const e = 1 - k01 * k01 * (3 - 2 * k01);
      for (const lg of leaves) lg.position.x = lg.userData.closed + (lg.userData.open - lg.userData.closed) * e;
      if (k01 >= 1) { state = 'closed'; doorT = 0; nextOpen = t + 7 + r() * 16; }
    }
    // sign flicker: a tired ballast, mostly steady
    const n = Math.sin(t * 37.0) * Math.sin(t * 5.3) * Math.sin(t * 1.7);
    const flick = 1.0 - (n > 0.55 ? 0.42 : 0.0) * (0.6 + 0.4 * Math.sin(t * 2.1));
    const f2 = 0.94 + 0.06 * Math.sin(t * 0.7);
    signMat.color.setRGB(1.2 * flick * f2, 1.18 * flick * f2, 1.1 * flick * f2);
    roofSignMat.color.setRGB(1.45 * flick, 1.4 * flick, 1.28 * flick);
    fasciaMat.color.setRGB(1.25 * (0.97 + 0.03 * Math.sin(t * 3.1)), 1.2 * (0.97 + 0.03 * Math.sin(t * 3.1)), 1.12);
    signLight.intensity = 1.8 * flick;
    roofSignLight.intensity = 1.5 * flick;
  });

  ctx.addStatic(g);
  return { leaves, glassMat, doorMat };
}
