// Shop interior: shelves, drink coolers, food cases, register, coffee bar, magazines.
// Bright, warm and full — the warm counterweight to the wet street outside.
import * as THREE from 'three';
import * as L from './layout.js';
import {
  shelfStrip, drinkWall, bentoRow, magazineWall, menuBoard, categorySign, floorGuide, poster, toTex,
} from '../core/canvastex.js';

const IN = L.INSIDE, F = L.FIX;

export function build(ctx) {
  const { mat } = ctx;
  const r = ctx.rng('interior');
  const g = new THREE.Group();
  g.name = 'interior';
  const k = ctx.kit(g);

  const warmEmis = (c, i = 0.2) => mat.toon(c, { paint: 0.03, emissive: '#ffc286', emissiveIntensity: i });
  const shelfBody = warmEmis('#dfe2e6', 0.17);
  const shelfBoard = warmEmis('#f0f2f4', 0.24);
  const steel = warmEmis('#b8bec6', 0.15);

  const y0 = IN.floor;

  // ------------------------------------------------------------------ ceiling lights
  const panelMat = mat.emissive('#fff4dc', 1.35);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
    k.box(1.7, 0.06, 0.5, mat.toon('#f6f4ee', { emissive: '#ffe6bb', emissiveIntensity: 0.3 }),
      [IN.x0 + 1.7 + i * 3.0, IN.ceil - 0.05, IN.z0 + 2.2 + j * 2.6]);
    k.box(1.6, 0.03, 0.42, panelMat, [IN.x0 + 1.7 + i * 3.0, IN.ceil - 0.09, IN.z0 + 2.2 + j * 2.6]);
  }
  // strip light along the front of the ceiling (makes the shopfront read as "lit")
  k.box(IN.x1 - IN.x0 - 0.4, 0.05, 0.16, mat.emissive('#fff0d2', 1.25), [(IN.x0 + IN.x1) / 2, IN.ceil - 0.08, IN.z1 - 0.5]);
  k.box(IN.x1 - IN.x0 - 0.4, 0.05, 0.16, mat.emissive('#fff0d2', 1.1), [(IN.x0 + IN.x1) / 2, IN.ceil - 0.08, IN.z0 + 0.5]);

  const lMain = new THREE.PointLight(new THREE.Color('#ffc98c'), 9, 13, 1.6);
  lMain.position.set((IN.x0 + IN.x1) / 2 - 0.5, 2.3, (IN.z0 + IN.z1) / 2);
  g.add(lMain);
  const lFront = new THREE.PointLight(new THREE.Color('#ffc287'), 2.1, 8, 1.7);
  lFront.position.set((IN.x0 + IN.x1) / 2, 1.7, IN.z1 - 0.7);
  g.add(lFront);

  // ------------------------------------------------------------------ drink coolers (back wall)
  const coolTex = drinkWall(r, { w: 256, h: 256, tint: '#e8eef2' });
  const coolBack = mat.emissive('#f4faff', 1.0);
  const CW = F.coolers;
  const cwW = (CW.x1 - CW.x0) / CW.n;
  for (let i = 0; i < CW.n; i++) {
    const x = CW.x0 + cwW * (i + 0.5);
    const u = k.group([x, 0, 0]);
    k.box(cwW - 0.03, CW.h, 0.62, shelfBody, [0, y0 + CW.h / 2, CW.z - 0.34]);
    k.box(cwW - 0.12, CW.h - 0.14, 0.03, coolBack, [0, y0 + CW.h / 2, CW.z - 0.04]);
    for (let s = 0; s < 4; s++) {
      const sy = y0 + 0.34 + s * 0.44;
      k.box(cwW - 0.1, 0.04, 0.5, shelfBoard, [0, sy, CW.z - 0.3]);
      k.plane(cwW - 0.14, 0.4, mat.emissive('#ffffff', 0.95, { map: coolTex }), [0, sy + 0.22, CW.z - 0.05], null);
    }
    // glass door + frame + handle
    k.plane(cwW - 0.06, CW.h - 0.1, mat.rainGlass({ opacity: 0.13, indoor: 0.25, rain: 0.0, time: ctx.shared.uTime }),
      [0, y0 + CW.h / 2, CW.z + 0.02]);
    k.box(0.05, CW.h - 0.08, 0.07, steel, [-(cwW - 0.06) / 2, y0 + CW.h / 2, CW.z + 0.03]);
    k.box(0.05, CW.h - 0.08, 0.07, steel, [(cwW - 0.06) / 2, y0 + CW.h / 2, CW.z + 0.03]);
    k.box(0.05, 0.5, 0.05, mat.toon('#9aa0a8'), [cwW * 0.34, y0 + 1.1, CW.z + 0.05]);
    // top sign strip
    k.box(cwW - 0.06, 0.26, 0.06, mat.emissive('#e8f6ff', 0.85), [0, y0 + CW.h + 0.14, CW.z + 0.02]);
  }

  // ------------------------------------------------------------------ gondola shelves
  const strips = [
    shelfStrip(r, { w: 1024, h: 128, rows: 1, kind: 'box' }),
    shelfStrip(r, { w: 1024, h: 128, rows: 1, kind: 'box', tint: '#e8e2d2' }),
    shelfStrip(r, { w: 1024, h: 128, rows: 1, kind: 'cup' }),
    shelfStrip(r, { w: 1024, h: 128, rows: 1, kind: 'cup', tint: '#d8e8f0' }),
  ];
  for (const z of F.shelves) {
    const u = k.group([0, 0, z]);
    const w = F.shelfX.x1 - F.shelfX.x0, cx = (F.shelfX.x0 + F.shelfX.x1) / 2;
    k.box(w, 0.14, 0.92, shelfBody, [cx, y0 + 0.07, 0]);
    k.box(w, 1.6, 0.06, mat.toon('#eceef1', { emissive: '#ffcf95', emissiveIntensity: 0.2 }), [cx, y0 + 0.82, 0.4]);  // back panel
    k.box(w, 0.04, 0.92, mat.emissive('#fff2d8', 0.5), [cx, y0 + 1.62, 0]);   // top light
    for (let s = 0; s < 4; s++) {
      const sy = y0 + 0.36 + s * 0.4;
      k.box(w, 0.04, 0.86, shelfBoard, [cx, sy, 0]);
      k.box(w, 0.05, 0.04, mat.emissive('#fffdf2', 0.38), [cx, sy - 0.06, 0.42]);  // price rail
      const st = strips[s];
      // front row of products
      k.plane(w - 0.16, 0.3, mat.emissive('#ffffff', 0.92, { map: st }), [cx, sy + 0.19, 0.4], null);
      k.box(w - 0.3, 0.28, 0.16, mat.toon('#e6e9ee', { emissive: '#ffcf95', emissiveIntensity: 0.28 }), [cx, sy + 0.17, 0.26]);
      k.plane(w - 0.34, 0.24, mat.emissive('#ffffff', 0.88, { map: st }), [cx, sy + 0.17, 0.35], null);
    }
    // end caps
    for (const sgn of [-1, 1]) {
      const ex = cx + sgn * (w / 2 + 0.02);
      k.box(0.05, 1.5, 0.86, shelfBody, [ex, y0 + 0.8, 0]);
      for (let s = 0; s < 3; s++) k.plane(0.8, 0.3, mat.emissive('#ffffff', 0.7, { map: strips[(s + 1) % 4] }), [ex, y0 + 0.4 + s * 0.44, 0], [0, sgn * Math.PI / 2, 0]);
    }
  }

  // ------------------------------------------------------------------ oden + bento (west side)
  const bentoTex = bentoRow(r, { w: 1024, h: 256 });
  k.box(F.oden.w, F.oden.h, F.oden.d, shelfBody, [F.oden.x, y0 + F.oden.h / 2, F.oden.z]);
  k.box(F.oden.w - 0.12, 0.1, F.oden.d - 0.1, mat.emissive('#ffdca6', 0.9), [F.oden.x, y0 + F.oden.h - 0.12, F.oden.z]);
  k.plane(F.oden.d - 0.2, F.oden.h - 0.3, mat.emissive('#ffffff', 0.8, { map: bentoTex }),
    [F.oden.x + F.oden.w / 2 + 0.01, y0 + F.oden.h * 0.6, F.oden.z], [0, Math.PI / 2, 0]);
  k.plane(0.9, 0.5, mat.emissive('#ffffff', 0.7, { map: menuBoard() }),
    [F.oden.x + 0.02, y0 + 2.2, F.oden.z], [0, Math.PI / 2, 0]);
  // pots on top
  for (let i = 0; i < 3; i++) k.cyl(0.16, 0.15, 0.14, mat.toon('#b8bec6', { emissive: '#ffd9a0', emissiveIntensity: 0.4 }), [F.oden.x, y0 + F.oden.h + 0.08, F.oden.z - 0.8 + i * 0.8]);
  // steam
  const steam = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.7),
    new THREE.MeshBasicMaterial({ map: softCircle(), transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xfff0d8 })
  );
  steam.position.set(F.oden.x, y0 + F.oden.h + 0.5, F.oden.z);
  steam.rotation.y = Math.PI / 2;
  g.add(steam);
  ctx.noOutline(steam);
  ctx.onUpdate((dt, t) => {
    steam.material.opacity = 0.10 + 0.07 * (0.5 + 0.5 * Math.sin(t * 1.7));
    steam.scale.set(1 + 0.12 * Math.sin(t * 0.9), 1 + 0.18 * Math.sin(t * 1.3 + 1), 1);
  });

  // bento / onigiri island
  k.box(F.bento.w, F.bento.h, F.bento.d, shelfBody, [F.bento.x, y0 + F.bento.h / 2, F.bento.z]);
  k.box(F.bento.w - 0.1, 0.08, F.bento.d - 0.1, mat.emissive('#ffe2b0', 0.95), [F.bento.x, y0 + F.bento.h - 0.1, F.bento.z]);
  for (let s = 0; s < 3; s++) {
    k.plane(F.bento.w - 0.24, 0.3, mat.emissive('#ffffff', 0.85, { map: bentoTex }),
      [F.bento.x, y0 + 0.5 + s * 0.36, F.bento.z + F.bento.d / 2 + 0.01]);
  }
  k.plane(F.bento.w - 0.3, 1.0, mat.emissive('#ffffff', 0.8, { map: bentoTex }),
    [F.bento.x, y0 + 0.72, F.bento.z - F.bento.d / 2 - 0.01], [0, Math.PI, 0]);
  k.box(F.bento.w + 0.06, 0.1, F.bento.d + 0.06, mat.toon('#d8dbe0', { emissive: '#ffcf95', emissiveIntensity: 0.3 }), [F.bento.x, y0 + F.bento.h + 0.05, F.bento.z]);
  // rice-ball sign on a little stand
  k.box(0.5, 0.02, 0.16, mat.emissive('#ffffff', 0.9, { map: categorySign('おにぎり', '#c0392b') }), [F.bento.x + 0.9, y0 + F.bento.h + 0.16, F.bento.z], [0, 0, 0]);
  k.cyl(0.02, 0.02, 0.14, steel, [F.bento.x + 0.9, y0 + F.bento.h + 0.09, F.bento.z]);

  // ------------------------------------------------------------------ register
  const rg = F.register;
  k.box(rg.w, rg.h, rg.d, mat.toon('#e8e4da', { paint: 0.03, emissive: '#ffcf95', emissiveIntensity: 0.18 }), [rg.x, y0 + rg.h / 2, rg.z]);
  k.box(rg.w + 0.1, 0.07, rg.d + 0.1, mat.toon('#f4f2ec', { emissive: '#ffd9a0', emissiveIntensity: 0.4 }), [rg.x, y0 + rg.h + 0.03, rg.z]);
  k.box(rg.w, 0.1, 0.04, mat.emissive('#3ad0a0', 0.8), [rg.x, y0 + rg.h - 0.14, rg.z + rg.d / 2 + 0.02]);
  // POS terminal
  k.box(0.34, 0.28, 0.26, mat.toon('#3a3f48'), [rg.x + 0.75, y0 + rg.h + 0.2, rg.z - 0.1]);
  k.box(0.3, 0.22, 0.02, mat.emissive('#8fd8ff', 1.2), [rg.x + 0.75, y0 + rg.h + 0.22, rg.z + 0.04], [0.2, 0, 0]);
  k.box(0.5, 0.02, 0.3, mat.toon('#2a2e36'), [rg.x + 0.2, y0 + rg.h + 0.09, rg.z + 0.2]);
  // bag stand + receipt printer
  k.box(0.3, 0.34, 0.3, mat.toon('#e2e5e9'), [rg.x - 0.9, y0 + rg.h + 0.22, rg.z - 0.1]);
  k.box(0.22, 0.2, 0.2, mat.toon('#4a5058'), [rg.x - 0.35, y0 + rg.h + 0.15, rg.z - 0.15]);
  // cigarette wall behind
  k.box(F.cigWall.w, F.cigWall.h, 0.12, mat.toon('#5a5248', { emissive: '#ffcf95', emissiveIntensity: 0.12 }), [F.cigWall.x, y0 + F.cigWall.h / 2, F.cigWall.z]);
  for (let s = 0; s < 5; s++) {
    k.box(F.cigWall.w - 0.2, 0.05, 0.22, shelfBoard, [F.cigWall.x, y0 + 0.5 + s * 0.38, F.cigWall.z + 0.1]);
    k.plane(F.cigWall.w - 0.3, 0.22, mat.emissive('#ffffff', 0.6, { map: strips[(s + 2) % 4] }), [F.cigWall.x, y0 + 0.64 + s * 0.38, F.cigWall.z + 0.22], null);
  }
  k.box(F.cigWall.w, 0.3, 0.3, mat.emissive('#fff0d0', 0.65), [F.cigWall.x, y0 + F.cigWall.h - 0.1, F.cigWall.z + 0.12]);
  k.plane(1.2, 0.26, mat.emissive('#ffffff', 0.8, { map: categorySign('たばこ', '#2a2a2a') }), [F.cigWall.x, y0 + F.cigWall.h + 0.22, F.cigWall.z + 0.12]);
  // ice-cream chest
  k.box(F.iceCase.w, F.iceCase.h, F.iceCase.d, shelfBody, [F.iceCase.x, y0 + F.iceCase.h / 2, F.iceCase.z]);
  k.box(F.iceCase.w - 0.06, 0.04, F.iceCase.d - 0.1, mat.emissive('#dff2ff', 0.95), [F.iceCase.x, y0 + F.iceCase.h - 0.02, F.iceCase.z]);
  k.plane(0.8, 0.24, mat.emissive('#ffffff', 0.7, { map: categorySign('アイス', '#2a6fa8') }), [F.iceCase.x, y0 + F.iceCase.h + 0.2, F.iceCase.z + 0.5], [0, 0, 0]);
  k.cyl(0.02, 0.02, 0.2, steel, [F.iceCase.x, y0 + F.iceCase.h + 0.1, F.iceCase.z + 0.5]);

  // queue guide posts
  const postMat = mat.toon('#c8ccd2', { emissive: '#ffcf95', emissiveIntensity: 0.25 });
  for (const [qx, qz] of [[-4.7, -5.3], [-2.2, -5.3], [-4.7, -4.3], [-2.2, -4.3]]) {
    k.cyl(0.16, 0.2, 0.05, postMat, [qx, y0 + 0.02, qz]);
    k.cyl(0.03, 0.03, 0.85, mat.toon('#8f959d'), [qx, y0 + 0.44, qz]);
  }

  // ------------------------------------------------------------------ coffee bar (by the window)
  const cm = F.coffee;
  k.box(0.7, 1.35, 0.8, mat.toon('#3f444c', { paint: 0.04 }), [cm.x, y0 + 0.68, cm.z]);
  k.box(0.62, 0.5, 0.06, mat.emissive('#ffbe74', 0.9), [cm.x, y0 + 0.95, cm.z + 0.42]);
  k.box(0.6, 0.08, 0.4, steel, [cm.x, y0 + 0.62, cm.z + 0.24]);
  for (let i = 0; i < 3; i++) k.cyl(0.05, 0.05, 0.12, mat.emissive('#e8e4dc', 0.7), [cm.x - 0.18 + i * 0.18, y0 + 0.72, cm.z + 0.28]);
  k.box(0.66, 0.34, 0.02, mat.emissive('#ffffff', 0.7, { map: menuBoard() }), [cm.x - 0.02, y0 + 1.62, cm.z - 0.2], [0, Math.PI, 0]);
  // cup shelf on the side wall
  for (let s = 0; s < 2; s++) k.box(0.5, 0.04, 0.3, shelfBoard, [cm.x - 0.3, y0 + 1.1 + s * 0.4, cm.z - 0.1]);
  k.plane(0.28, 0.2, mat.emissive('#ffffff', 0.9, { map: shelfStrip(r, { w: 256, h: 64, rows: 1, kind: 'cup' }) }), [cm.x - 0.3, y0 + 1.2, cm.z + 0.06], [0, 0, 0]);

  // ------------------------------------------------------------------ magazines (west wall)
  const magTex = magazineWall(r, { w: 512, h: 512 });
  k.box(0.5, 1.8, 1.9, shelfBody, [F.mags.x - 0.1, y0 + 0.95, F.mags.z]);
  for (let s = 0; s < 4; s++) {
    k.box(0.5, 0.04, 1.8, shelfBoard, [F.mags.x - 0.1, y0 + 0.32 + s * 0.42, F.mags.z]);
    k.plane(1.7, 0.3, mat.emissive('#ffffff', 0.62, { map: magTex }), [F.mags.x + 0.16, y0 + 0.48 + s * 0.42, F.mags.z], [0, Math.PI / 2, 0]);
  }
  k.box(0.56, 0.2, 1.9, mat.emissive('#fff0d0', 0.6), [F.mags.x - 0.1, y0 + 1.85, F.mags.z]);

  // ------------------------------------------------------------------ window seating
  const st = F.seat;
  k.box(st.w, 0.06, st.d, mat.toon('#f0ece2', { emissive: '#ffcf95', emissiveIntensity: 0.35 }), [st.x, y0 + 0.78, st.z]);
  k.box(0.12, 0.78, st.d, steel, [st.x - st.w / 2 + 0.06, y0 + 0.39, st.z]);
  k.box(0.12, 0.78, st.d, steel, [st.x + st.w / 2 - 0.06, y0 + 0.39, st.z]);
  for (let i = 0; i < 3; i++) {
    const sx = st.x - 0.85 + i * 0.85;
    k.cyl(0.19, 0.19, 0.08, mat.toon('#c2453f', { paint: 0.04 }), [sx, y0 + 0.46, st.z + 0.45]);
    k.cyl(0.05, 0.05, 0.44, steel, [sx, y0 + 0.22, st.z + 0.45]);
    k.cyl(0.16, 0.16, 0.03, steel, [sx, y0 + 0.02, st.z + 0.45]);
  }
  // a forgotten cup + tray
  k.cyl(0.045, 0.035, 0.1, mat.emissive('#f4f0e6', 0.6), [st.x + 0.5, y0 + 0.86, st.z]);

  // ------------------------------------------------------------------ back room
  k.box(0.06, F.backDoor.y1, 1.0, mat.toon('#c8ccd2', { paint: 0.04 }), [IN.x1 - 0.02, y0 + F.backDoor.y1 / 2, F.backDoor.z]);
  k.box(0.1, 0.3, 0.06, steel, [IN.x1 - 0.06, y0 + 1.0, F.backDoor.z + 0.3]);
  k.plane(0.5, 0.2, mat.emissive('#ffffff', 0.9, { map: categorySign('関係者以外', '#b03a3a') }), [IN.x1 - 0.06, y0 + 1.9, F.backDoor.z], [0, -Math.PI / 2, 0]);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) {
    k.box(0.42, 0.55, 0.4, mat.toon('#a8adb4', { paint: 0.04, emissive: '#ffcf95', emissiveIntensity: 0.15 }),
      [F.lockers.x, y0 + 0.3 + j * 0.58, F.lockers.z + i * 0.44]);
  }
  // stock boxes behind the counter
  for (let i = 0; i < 4; i++) k.box(0.5, 0.36, 0.4, mat.toon('#c8b08a', { paint: 0.05 }), [-5.2 + (i % 2) * 0.55, y0 + 0.2 + Math.floor(i / 2) * 0.38, -8.6]);

  // ------------------------------------------------------------------ hanging signs + posters
  const cats = [['あたたかい', '#c0392b'], ['お菓子', '#1f8f5c'], ['饮料', '#2a4a7a']];
  cats.forEach(([label, col], i) => {
    const sx = IN.x0 + 1.6 + i * 2.9, sz = IN.z1 - 1.5;
    k.cyl(0.015, 0.015, 0.55, steel, [sx, IN.ceil - 0.3, sz]);
    k.cyl(0.015, 0.015, 0.55, steel, [sx + 0.5, IN.ceil - 0.3, sz]);
    const t = categorySign(label, col);
    k.box(0.62, 0.3, 0.03, mat.emissive('#ffffff', 0.72, { map: t }), [sx + 0.25, IN.ceil - 0.7, sz]);
    k.box(0.62, 0.3, 0.03, mat.emissive('#ffffff', 0.66, { map: t }), [sx + 0.25, IN.ceil - 0.7, sz + 0.04], [0, Math.PI, 0]);
  });
  // posters on the west wall above the magazine rack
  for (let i = 0; i < 2; i++) {
    k.plane(0.66, 0.95, mat.emissive('#ffffff', 0.7, { map: poster(i + 3, r) }),
      [IN.x0 + 0.02, y0 + 2.2, -8.4 + i * 0.9], [0, Math.PI / 2, 0]);
  }
  // small potted plant by the door
  k.cyl(0.16, 0.13, 0.26, mat.toon('#b06a4a'), [-1.1, y0 + 0.13, -5.2]);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 6.283;
    k.plane(0.3, 0.5, mat.toon('#5f8c5c', { side: 'double', paint: 0.05 }), [-1.1 + Math.cos(a) * 0.1, y0 + 0.5, -5.2 + Math.sin(a) * 0.1], [0, -a, 0.4]);
  }

  // ------------------------------------------------------------------ floor guide decals
  const arrowTex = floorGuide('arrow'), feetTex = floorGuide('feet');
  for (const [fx, fz, ry] of [[-2.3, -5.9, Math.PI], [-2.3, -8.6, 0], [-4.6, -5.2, Math.PI / 2]]) {
    k.plane(0.5, 0.5, mat.decal('#ffffff', { map: arrowTex, transparent: true, opacity: 0.85 }), [fx, y0 + 0.012, fz], [-Math.PI / 2, 0, ry]);
  }
  k.plane(0.7, 0.7, mat.decal('#ffffff', { map: feetTex, transparent: true, opacity: 0.6 }), [-3.5, y0 + 0.012, -4.6], [-Math.PI / 2, 0, 0]);

  ctx.addStatic(g);
  ctx.reflect(g);
  return g;
}

/** Soft radial sprite used for steam / glows. */
function softCircle() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,0.9)');
  gr.addColorStop(0.5, 'rgba(255,255,255,0.25)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
