// Street furniture: vending machines, bikes, umbrellas, bins, guardrail, poles, wires,
// lamps, signposts, notice board, traffic light, alley clutter.
import * as THREE from 'three';
import * as L from './layout.js';
import * as geo from '../core/geo.js';
import {
  vendingPanel, vendingButtons, guideSign, roundSign, noticeBoard, poster, neonSign, openSign, toTex, makeCanvas, text, jp, sans,
} from '../core/canvastex.js';

const AT = L.AT;

export function build(ctx) {
  const { mat } = ctx;
  const r = ctx.rng('props');
  const g = new THREE.Group();
  g.name = 'props';
  const k = ctx.kit(g);
  const dyn = new THREE.Group(); dyn.name = 'propsDyn';
  g.add(dyn);

  const steel = mat.toon('#b6bcc4', { paint: 0.04 });
  const darkSteel = mat.toon('#7c828b', { paint: 0.04 });
  const paintedWhite = mat.toon('#e8e9e6', { paint: 0.05 });

  /** Additive glow billboard (lamp haloes, vending spill, neon haze). */
  const halos = [];
  const halo = (parent, x, y, z, size, color, strength = 1) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat.halo(color, strength));
    m.position.set(x, y, z);
    m.userData.billboard = true;
    parent.add(m);
    halos.push(m);
    ctx.noOutline(m);
    return m;
  };

  // ================================================================== vending machines
  const vTex = vendingPanel(r);
  const vBtn = vendingButtons(r);
  const vendFront = (x, z, ry) => {
    const u = k.group([x, 0, z], ry);
    const bodyW = 1.15, bodyH = 1.92, bodyD = 0.78;
    k.box(bodyW, bodyH, bodyD, mat.toon('#eef0f2', { paint: 0.04 }), [0, bodyH / 2, 0]);
    k.box(bodyW + 0.06, 0.09, bodyD + 0.06, mat.toon('#9aa0a8'), [0, bodyH + 0.04, 0]);
    k.box(bodyW - 0.1, 0.05, bodyD - 0.06, mat.toon('#b6bcc4'), [0, bodyH + 0.1, 0]);
    k.box(bodyW + 0.02, 0.12, bodyD + 0.02, mat.toon('#5d646d'), [0, 0.06, 0]);
    k.box(bodyW - 0.02, 0.03, 0.03, mat.toon('#7d848d'), [0, bodyH * 0.62, bodyD / 2 + 0.01]);
    for (const sgn of [-1, 1]) k.plane(0.66, 1.0, mat.emissive('#ffffff', 0.35, { map: poster(0, r) }), [sgn * (bodyW / 2 + 0.01), 1.15, 0], [0, sgn * Math.PI / 2, 0]);
    // lit product display
    k.box(bodyW - 0.14, 1.16, 0.06, mat.emissive('#ffffff', 1.15, { map: vTex }), [0, 1.32, bodyD / 2 + 0.01]);
    k.box(bodyW - 0.2, 1.2, 0.1, mat.emissive('#eaf6ff', 0.5), [0, 1.32, bodyD / 2 - 0.08]);
    // glass
    k.plane(bodyW - 0.12, 1.18, mat.rainGlass({ opacity: 0.16, indoor: 0.2, rain: 0.8, time: ctx.shared.uTime, aspect: 0.9 }),
      [0, 1.32, bodyD / 2 + 0.06]);
    // buttons / coin area
    k.box(bodyW - 0.14, 0.34, 0.05, mat.emissive('#ffffff', 0.8, { map: vBtn }), [0, 0.56, bodyD / 2 + 0.01]);
    k.box(0.2, 0.05, 0.05, darkSteel, [0.4, 0.9, bodyD / 2 + 0.03]);
    k.box(0.3, 0.06, 0.07, mat.toon('#3a4048'), [-0.32, 0.9, bodyD / 2 + 0.03]);
    k.box(0.34, 0.1, 0.1, mat.toon('#2a2f36'), [-0.3, 0.28, bodyD / 2 - 0.02]);  // retrieval flap
    k.box(0.3, 0.02, 0.12, mat.emissive('#ffd24a', 1.1), [0, 0.16, bodyD / 2 + 0.02]);
    // side decal
    
    const pl = new THREE.PointLight(new THREE.Color('#cfe8ff'), 2.4, 4.5, 2.0);
    pl.position.set(0, 1.3, bodyD / 2 + 0.5);
    u.add(pl);
    halo(u, 0, 1.3, bodyD / 2 + 0.16, 1.9, '#bfe4ff', 0.2);
    return u;
  };
  const v1 = vendFront(AT.vending.x, AT.vending.z, AT.vending.ry);
  vendFront(AT.vending2.x, AT.vending2.z, AT.vending2.ry);

  // ================================================================== bicycle
  const bicycle = (x, z, ry, color = '#2f4f6d') => {
    const u = k.group([x, 0, z], ry);
    const frameMat = mat.toon(color, { paint: 0.05 });
    const tyre = mat.toon('#2a2d33');
    const rim = mat.toon('#b9bec6');
    // wheels
    for (const wx of [-0.52, 0.52]) {
      const w = k.group([wx, 0.34, 0], 0);
      k.mesh(new THREE.TorusGeometry(0.33, 0.035, 6, 20), tyre, [0, 0, 0], [0, Math.PI / 2, 0]);
      k.mesh(new THREE.TorusGeometry(0.26, 0.012, 4, 16), rim, [0, 0, 0], [0, Math.PI / 2, 0]);
      for (let i = 0; i < 6; i++) k.box(0.5, 0.008, 0.008, rim, [0, 0, 0], [0, Math.PI / 2, (i / 6) * Math.PI]);
      k.cyl(0.03, 0.03, 0.1, rim, [0, 0, 0], [Math.PI / 2, 0, 0]);
    }
    // frame
    k.box(0.78, 0.035, 0.035, frameMat, [0, 0.62, 0], [0, 0, 0.12]);
    k.box(0.5, 0.035, 0.035, frameMat, [0.16, 0.5, 0], [0, 0, -0.75]);
    k.box(0.62, 0.035, 0.035, frameMat, [-0.18, 0.42, 0], [0, 0, 0.5]);
    k.cyl(0.025, 0.025, 0.4, frameMat, [-0.3, 0.55, 0], [0, 0, 0.35]);
    k.cyl(0.03, 0.03, 0.5, darkSteel, [0.5, 0.62, 0], [0, 0, -0.25]);
    k.box(0.42, 0.025, 0.025, darkSteel, [0.5, 0.9, 0]);
    k.box(0.2, 0.06, 0.14, mat.toon('#3a3f48'), [-0.28, 0.86, 0]);
    // basket
    k.box(0.3, 0.22, 0.24, mat.toon('#c8ccd2', { paint: 0.05 }), [0.52, 0.78, 0]);
    k.box(0.28, 0.02, 0.22, mat.emissive('#f2f4f8', 0.25), [0.52, 0.88, 0]);
    // rear rack + mudguard
    k.box(0.34, 0.02, 0.16, darkSteel, [-0.5, 0.72, 0]);
    // kickstand
    k.box(0.02, 0.3, 0.02, darkSteel, [-0.1, 0.16, 0.1], [0.2, 0, 0.1]);
    return u;
  };
  bicycle(AT.bike.x, AT.bike.z, AT.bike.ry, '#2f5d7a');
  bicycle(AT.bike2.x, AT.bike2.z, AT.bike2.ry, '#7a3b3b');
  bicycle(-11.2, -0.6, Math.PI / 2 + 0.1, '#3d5a3a');

  // ================================================================== umbrella stand
  const umbrellaStand = (x, z, ry, n = 4) => {
    const u = k.group([x, 0, z], ry);
    k.box(0.42, 0.5, 0.42, darkSteel, [0, 0.25, 0]);
    k.box(0.46, 0.05, 0.46, mat.toon('#9aa0a8'), [0, 0.52, 0]);
    const cols = ['#2f4f6d', '#7a3b3b', '#3d5a3a', '#6a5a8a', '#c07a2a'];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283;
      const px = Math.cos(a) * 0.11, pz = Math.sin(a) * 0.11;
      const lean = 0.12 + r() * 0.1;
      k.cyl(0.022, 0.022, 0.95, mat.toon(cols[i % cols.length], { paint: 0.05 }), [px, 0.9, pz], [lean * Math.cos(a), 0, -lean * Math.sin(a)]);
      k.mesh(new THREE.TorusGeometry(0.06, 0.016, 5, 10, Math.PI), darkSteel,
        [px + Math.sin(lean) * 0.5 * Math.cos(a), 1.36, pz - Math.sin(lean) * 0.5 * Math.sin(a)], [0, -a, 0]);
    }
    return u;
  };
  umbrellaStand(AT.umbrella.x, AT.umbrella.z, 0.3, 4);
  umbrellaStand(AT.umbrella2.x, AT.umbrella2.z, -0.4, 3);

  // ================================================================== bins
  const binGroup = (x, z, ry) => {
    const u = k.group([x, 0, z], ry);
    k.box(0.42, 0.72, 0.42, mat.toon('#4d6b5a', { paint: 0.06 }), [0, 0.36, 0]);
    k.box(0.46, 0.06, 0.46, darkSteel, [0, 0.75, 0]);
    k.box(0.3, 0.12, 0.02, mat.toon('#2a2f36'), [0, 0.62, 0.21]);
    k.box(0.42, 0.5, 0.42, mat.toon('#5a6470', { paint: 0.06 }), [0.56, 0.25, 0]);
    k.box(0.46, 0.06, 0.46, darkSteel, [0.56, 0.53, 0]);
    k.box(0.2, 0.16, 0.02, mat.emissive('#3ad0a0', 0.5), [0.56, 0.3, 0.21]);
    return u;
  };
  binGroup(AT.bins.x, AT.bins.z, -0.2);
  binGroup(11.2, 3.4, 0.6);
  // ashtray bin by the door
  k.cyl(0.16, 0.14, 0.7, darkSteel, [-3.9, 0.35, -4.15]);
  k.cyl(0.18, 0.18, 0.05, steel, [-3.9, 0.72, -4.15]);

  // ================================================================== guardrail
  const guard = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(2, Math.round(len / 1.6));
    const postM = mat.toon('#d5d8dc', { paint: 0.05 });
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const px = x0 + (x1 - x0) * t, pz = z0 + (z1 - z0) * t;
      k.box(0.12, 0.95, 0.12, postM, [px, 0.48, pz]);
      k.box(0.16, 0.05, 0.16, postM, [px, 0.96, pz]);
      // reflective band
      k.box(0.13, 0.12, 0.13, mat.emissive('#ff6a4a', 0.5), [px, 0.74, pz]);
    }
    const ang = Math.atan2(z1 - z0, x1 - x0);
    for (const y of [0.72, 0.44]) {
      k.box(len, 0.09, 0.09, postM, [(x0 + x1) / 2, y, (z0 + z1) / 2], [0, -ang, 0]);
    }
  };
  guard(AT.guardFront.x0, AT.guardFront.z, AT.guardFront.x1, AT.guardFront.z);
  guard(AT.guardSide.x, AT.guardSide.z0, AT.guardSide.x, AT.guardSide.z1);
  guard(9.3, 4.4, 9.3, 8.2);

  // ================================================================== utility pole + wires
  const poleAt = (x, z, ry, height = 8.2) => {
    const u = k.group([x, 0, z], ry);
    const conc = mat.toon('#9c9a94', { paint: 0.05 });
    k.box(0.26, height, 0.26, conc, [0, height / 2, 0]);
    k.box(0.34, 0.3, 0.34, mat.toon('#7e7c76'), [0, 0.15, 0]);
    // crossarms
    for (let i = 0; i < 3; i++) {
      const ay = height - 0.4 - i * 0.85;
      k.box(1.9 - i * 0.35, 0.09, 0.1, mat.toon('#6a6258', { paint: 0.05 }), [0, ay, 0]);
      const n = 6 - i;
      for (let j = 0; j < n; j++) {
        const ix = -(n - 1) * 0.15 + j * 0.3 + (i * 0.05);
        k.cyl(0.035, 0.05, 0.12, mat.toon('#cfd8de', { paint: 0.02 }), [ix, ay + 0.11, 0]);
        k.cyl(0.05, 0.05, 0.04, mat.toon('#5a7f9a'), [ix, ay + 0.19, 0]);
      }
    }
    // transformer + service switch
    k.cyl(0.24, 0.24, 0.7, mat.toon('#7e858c', { paint: 0.05 }), [0.3, height - 2.4, 0.18]);
    k.box(0.36, 0.5, 0.24, mat.toon('#c8ccd2'), [-0.32, height - 1.9, 0.16]);
    k.cyl(0.05, 0.05, 0.5, mat.toon('#4a5058'), [0.0, height - 1.4, 0.2]);
    // street lamp arm
    k.cyl(0.06, 0.06, 1.5, steel, [0, height + 0.3, 0.4], [Math.PI / 2.4, 0, 0]);
    // pole number plate
    k.plane(0.24, 0.3, mat.emissive('#e8e4d8', 0.35), [0, 2.4, 0.14]);
    return u;
  };
  const p1 = poleAt(AT.pole.x, AT.pole.z, 0.1);
  const p2 = poleAt(AT.pole2.x, AT.pole2.z, -0.15, 7.4);
  // overhead wires
  for (let i = 0; i < 5; i++) {
    const off = -0.3 + i * 0.15;
    ctx.wires.add(geo.catenary([AT.pole.x + off, 7.9 - i * 0.05, AT.pole.z - 0.05], [AT.pole2.x + off, 7.1 - i * 0.05, AT.pole2.z - 0.05], 0.7, 16), { width: 0.035, color: '#2b2f38' });
  }
  ctx.wires.add(geo.catenary([AT.pole.x + 0.1, 7.4, AT.pole.z - 0.05], [L.SHOP.x0 + 0.2, 4.2, L.SHOP.z1 - 0.3], 0.9, 14), { width: 0.03, color: '#2b2f38' });
  ctx.wires.add(geo.catenary([AT.pole.x - 0.2, 7.0, AT.pole.z - 0.05], [AT.pole.x - 0.2, 5.4, AT.pole.z - 0.05], 0.0, 2), { width: 0.03, color: '#2b2f38' });
  // wires along the alley to the shop's service point
  for (let i = 0; i < 3; i++) {
    ctx.wires.add(geo.catenary([AT.pole2.x + 0.2 + i * 0.1, 6.6 - i * 0.2, AT.pole2.z - 0.05], [L.SHOP.x0 + 0.3, 4.4 - i * 0.2, -7.0 + i * 0.3], 1.1, 14), { width: 0.03, color: '#2b2f38' });
  }

  // ================================================================== street lamps
  const streetLamp = (x, z, armLen, flip = 1) => {
    const u = k.group([x, 0, z], 0);
    const H = 5.4;
    k.cyl(0.13, 0.19, H, mat.toon('#8e949c', { paint: 0.04 }), [0, H / 2, 0]);
    k.cyl(0.24, 0.26, 0.3, darkSteel, [0, 0.15, 0]);
    k.cyl(0.09, 0.09, armLen, mat.toon('#8e949c'), [flip * armLen / 2, H - 0.1, 0], [0, 0, Math.PI / 2]);
    k.cyl(0.07, 0.07, 0.6, mat.toon('#8e949c'), [flip * (armLen - 0.1), H - 0.35, 0], [0.9, 0, 0]);
    k.box(0.62, 0.16, 0.34, mat.toon('#767c85'), [flip * armLen, H - 0.55, 0]);
    const lens = k.box(0.52, 0.06, 0.26, mat.emissive('#ffe6b8', 2.4), [flip * armLen, H - 0.65, 0]);
    const pl = new THREE.PointLight(new THREE.Color('#ffdca8'), 12, 12, 1.9);
    pl.position.set(flip * armLen, H - 0.8, 0);
    u.add(pl);
    halo(u, flip * armLen, H - 0.7, 0, 3.2, '#ffdca8', 0.24);
    // sign band on the pole
    k.plane(0.34, 0.9, mat.emissive('#e8e4d8', 0.4), [0, 3.4, 0.15], [0, 0, 0]);
    ctx.services.lamps = ctx.services.lamps || [];
    return u;
  };
  streetLamp(AT.lamp.x, AT.lamp.z, AT.lamp.arm, -1);
  streetLamp(AT.lamp2.x, AT.lamp2.z, AT.lamp2.arm, -1);
  // small lamp over the shop door
  k.box(0.3, 0.1, 0.16, mat.toon('#767c85'), [AT.entranceLamp.x, 2.34, L.SHOP.z1 + 0.28]);
  k.box(0.22, 0.04, 0.1, mat.emissive('#ffe6b8', 1.8), [AT.entranceLamp.x, 2.28, L.SHOP.z1 + 0.3]);
  // alley wall lamp
  k.box(0.16, 0.12, 0.3, mat.toon('#767c85'), [L.SHOP.x0 - 0.12, 3.1, -6.0]);
  k.box(0.1, 0.04, 0.22, mat.emissive('#ffd9a0', 1.7), [L.SHOP.x0 - 0.2, 3.05, -6.0]);
  const alleyLight = new THREE.PointLight(new THREE.Color('#ffcf92'), 2.6, 6, 2.0);
  alleyLight.position.set(L.SHOP.x0 - 0.5, 2.9, -6.0);
  g.add(alleyLight);
  halo(g, L.SHOP.x0 - 0.4, 3.05, -6.0, 1.7, '#ffcf92', 0.18);

  // ================================================================== signpost + round signs
  k.cyl(0.055, 0.07, 3.0, steel, [AT.signpost.x, 1.5, AT.signpost.z]);
  k.cyl(0.12, 0.14, 0.12, darkSteel, [AT.signpost.x, 0.06, AT.signpost.z]);
  const gs = guideSign('left', '北通り', 'KITA-DORI');
  k.box(1.3, 0.44, 0.05, mat.emissive('#ffffff', 0.75, { map: gs }), [AT.signpost.x - 0.6, 2.65, AT.signpost.z], [0, 0.35, 0]);
  const gs2 = guideSign('right', '駅前通り', 'EKI-MAE');
  k.box(1.1, 0.38, 0.05, mat.emissive('#ffffff', 0.7, { map: gs2 }), [AT.signpost.x + 0.5, 2.2, AT.signpost.z + 0.1], [0, -0.5, 0]);
  k.cyl(0.04, 0.04, 2.6, steel, [-11.0, 1.3, 1.2]);
  k.plane(0.5, 0.5, mat.emissive('#ffffff', 0.6, { map: roundSign('no') }), [-11.0, 2.3, 1.22]);
  k.plane(0.5, 0.5, mat.emissive('#ffffff', 0.6, { map: roundSign('bike') }), [-11.0, 1.7, 1.22]);

  // ================================================================== notice board
  {
    const u = k.group([AT.notice.x, 0, AT.notice.z], AT.notice.ry);
    for (const sx of [-0.55, 0.55]) k.box(0.09, 1.5, 0.09, darkSteel, [sx, 0.75, 0]);
    k.box(1.35, 1.0, 0.09, mat.toon('#e9e4d6', { paint: 0.04 }), [0, 1.1, 0]);
    k.plane(1.15, 0.9, mat.emissive('#ffffff', 0.55, { map: noticeBoard(r) }), [0, 1.1, 0.05]);
    k.box(1.5, 0.08, 0.4, mat.toon('#8d9299'), [0, 1.66, 0.1], [0.12, 0, 0]);
    k.box(0.4, 0.5, 0.3, mat.toon('#4a4f58'), [0, 0.25, 0]);
  }

  // ================================================================== traffic light (far corner)
  const traffic = (() => {
    const u = k.group([AT.traffic.x, 0, AT.traffic.z], 0);
    const H = 5.2;
    k.cyl(0.1, 0.14, H, mat.toon('#5a6068', { paint: 0.05 }), [0, H / 2, 0]);
    k.cyl(0.24, 0.26, 0.3, darkSteel, [0, 0.15, 0]);
    k.cyl(0.08, 0.08, 2.6, mat.toon('#5a6068'), [1.3, H - 0.1, 0], [0, 0, Math.PI / 2]);
    k.box(0.3, 0.72, 0.26, mat.toon('#3f454c'), [2.5, H - 0.45, 0]);
    const lamps = [];
    for (let i = 0; i < 3; i++) {
      const m = new THREE.MeshBasicMaterial({ color: new THREE.Color('#101010').multiplyScalar(0.2), toneMapped: false });
      lamps.push(k.cyl(0.09, 0.09, 0.04, m, [2.5, H - 0.12 - i * 0.22, 0.15], [Math.PI / 2, 0, 0]));
    }
    k.plane(0.7, 0.22, mat.emissive('#2a2a2a', 0.4), [2.5, H + 0.05, 0]);
    const red = lamps[0].material, amber = lamps[1].material, green = lamps[2].material;
    const pl = new THREE.PointLight(new THREE.Color('#ff4030'), 0.7, 5, 2);
    pl.position.set(2.5, H - 0.12, 0.4);
    u.add(pl);
    const hRed = halo(u, 2.5, H - 0.12, 0.3, 1.0, '#ff5040', 0.0);
    const hGreen = halo(u, 2.5, H - 0.56, 0.3, 1.0, '#50ffa0', 0.0);
    return { red, amber, green, pl, hRed, hGreen };
  })();

  // ================================================================== small props
  // hydrant
  k.cyl(0.11, 0.13, 0.6, mat.toon('#b03a3a', { paint: 0.05 }), [AT.hydrant.x, 0.3, AT.hydrant.z]);
  k.cyl(0.08, 0.08, 0.16, mat.toon('#b03a3a'), [AT.hydrant.x, 0.66, AT.hydrant.z]);
  k.sphere(0.08, mat.toon('#c84a4a'), [AT.hydrant.x, 0.74, AT.hydrant.z]);
  k.box(0.34, 0.1, 0.1, mat.toon('#8a2f2f'), [AT.hydrant.x, 0.42, AT.hydrant.z], [0, 0.4, 0]);
  // crates
  const crateColors = ['#2f6ba8', '#c0392b', '#2f8a5a'];
  for (let i = 0; i < 5; i++) {
    const cxx = AT.crates.x + (i % 2) * 0.42, czz = AT.crates.z + Math.floor(i / 2) * 0.3;
    k.box(0.4, 0.26, 0.28, mat.toon(crateColors[i % 3], { paint: 0.05 }), [cxx, 0.13 + (i > 2 ? 0.28 : 0), czz]);
  }
  k.box(0.42, 0.03, 0.3, mat.toon('#1d2a3a'), [AT.crates.x, 0.27, AT.crates.z + 0.3]);
  // planters
  for (const pl of AT.planters) {
    k.cyl(0.3, 0.26, 0.5, mat.toon('#9a9ca2', { paint: 0.06 }), [pl.x, 0.25, pl.z]);
    k.cyl(0.32, 0.32, 0.06, mat.toon('#b0b3b8'), [pl.x, 0.5, pl.z]);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * 6.283;
      k.plane(0.34, 0.5, mat.toon(i % 2 ? '#4e7d4a' : '#3f6b3c', { side: 'double', paint: 0.06 }),
        [pl.x + Math.cos(a) * 0.12, 0.82, pl.z + Math.sin(a) * 0.12], [0, -a, 0.35]);
    }
  }
  // bollards along the far pavement
  for (const b of AT.bollards) {
    k.cyl(0.07, 0.09, 0.75, mat.toon('#d5d8dc', { paint: 0.05 }), [b.x, 0.38, b.z]);
    k.cyl(0.075, 0.075, 0.1, mat.emissive('#ff6a4a', 0.5), [b.x, 0.62, b.z]);
  }
  // traffic cones
  for (const [cx2, cz2] of [[4.9, -0.6], [5.3, -0.75]]) {
    k.cyl(0.02, 0.14, 0.42, mat.toon('#e0632c', { paint: 0.05 }), [cx2, 0.21, cz2]);
    k.box(0.28, 0.03, 0.28, mat.toon('#d8552a'), [cx2, 0.02, cz2]);
  }
  // shop-side clutter: stacked beer crates + a folded sign
  for (let i = 0; i < 3; i++) k.box(0.36, 0.24, 0.26, mat.toon('#2a3f5c', { paint: 0.05 }), [-0.75, 0.13 + i * 0.25, -8.9]);
  k.box(0.5, 0.06, 0.36, mat.toon('#c8ccd2'), [3.0, 0.03, -4.0], [0, 0.3, 0]);
  // A-frame sign
  {
    const u = k.group([-4.6, 0, -3.9], 0.3);
    for (const sgn of [-1, 1]) {
      k.box(0.5, 0.8, 0.03, mat.toon('#2f3440'), [0, 0.42, sgn * 0.16], [sgn * 0.22, 0, 0]);
      k.plane(0.44, 0.7, mat.emissive('#ffffff', 0.45, { map: poster(4, r) }), [0, 0.42, sgn * 0.19], [0, sgn > 0 ? 0 : Math.PI, 0]);
    }
  }
  // wall-mounted poster frames on the shop's east wall
  k.plane(0.5, 0.72, mat.emissive('#ffffff', 0.4, { map: poster(0, r) }), [L.SHOP.x1 + 0.02, 1.7, -3.2], [0, Math.PI / 2, 0]);

  // ================================================================== neon accents
  // a slim vertical sign bolted to the shop's east wall — the colour accent of the corner
  {
    const u = k.group([L.SHOP.x1 + 0.12, 0, -5.9], Math.PI / 2);
    k.box(0.16, 1.9, 0.44, mat.toon('#2a2e38'), [0, 2.35, 0]);
    const nt = neonSign('洗衣', 'クリーニング', '#ff5aa8', '#7ad3ff');
    const nm = new THREE.MeshBasicMaterial({ map: nt, toneMapped: false, color: new THREE.Color(1.5, 1.5, 1.5), transparent: true });
    k.plane(0.38, 1.8, nm, [0, 2.35, 0.09]);
    k.plane(0.38, 1.8, nm, [0, 2.35, -0.09], [0, Math.PI, 0]);
    k.box(0.1, 0.06, 0.5, steel, [0, 3.34, 0]);
    const nl = new THREE.PointLight(new THREE.Color('#ff6ab0'), 2.2, 6, 2.0);
    nl.position.set(L.SHOP.x1 + 0.55, 2.35, -5.9);
    g.add(nl);
    halo(g, L.SHOP.x1 + 0.42, 2.35, -5.9, 1.5, '#ff7ab8', 0.13);
    ctx.services.neonMat = nm;
  }
  // blue "parking" pylon at the corner
  {
    const u = k.group([3.9, 0, 6.2], -0.4);
    k.cyl(0.1, 0.12, 2.6, steel, [0, 1.3, 0]);
    k.box(0.5, 1.15, 0.12, mat.toon('#1b2436'), [0, 2.6, 0]);
    const nt = neonSign('P', '駐車場', '#7ad8ff', '#bfe9ff');
    const nm = new THREE.MeshBasicMaterial({ map: nt, toneMapped: false, color: new THREE.Color(1.4, 1.4, 1.4), transparent: true });
    k.plane(0.42, 1.05, nm, [0, 2.6, 0.07]);
    const nl = new THREE.PointLight(new THREE.Color('#5ad0ff'), 1.6, 5, 2.0);
    nl.position.set(3.9, 2.5, 6.5);
    g.add(nl);
    halo(g, 3.9, 2.5, 6.5, 1.5, '#5ad0ff', 0.13);
  }
  // small "OPEN" sign in the shop window
  {
    const nt = openSign('#ff4a4a');
    k.plane(0.62, 0.31, new THREE.MeshBasicMaterial({ map: nt, toneMapped: false, color: new THREE.Color(1.35, 1.35, 1.35), transparent: true }),
      [-4.35, 2.05, L.SHOP.z1 - 0.02]);
  }

  // ================================================================== animation
  ctx.onUpdate((dt, t) => {
    // traffic light: long red, brief green, occasional amber
    const cyc = t % 24;
    const green = cyc > 17 && cyc < 22.5;
    const amber = cyc > 15.5 && cyc < 17;
    const c = new THREE.Color();
    traffic.red.color.set(green || amber ? '#1a1a1a' : '#ff4030').multiplyScalar(green || amber ? 0.2 : 2.4);
    traffic.amber.color.set(amber ? '#ffb020' : '#1a1a1a').multiplyScalar(amber ? 2.4 : 0.2);
    traffic.green.color.set(green ? '#3cff90' : '#1a1a1a').multiplyScalar(green ? 2.4 : 0.2);
    traffic.pl.color.set(green ? '#40ff90' : '#ff4030');
    traffic.pl.intensity = green ? 0.55 : 0.75;
    traffic.hRed.material.uniforms.uStr.value = green || amber ? 0 : 0.5;
    traffic.hGreen.material.uniforms.uStr.value = green ? 0.5 : 0;
    // neon buzz: a slow, almost-subtle breathing flicker
    const buzz = 0.93 + 0.07 * Math.sin(t * 2.3) + (Math.sin(t * 41.0) * Math.sin(t * 7.7) > 0.86 ? -0.25 : 0);
    if (ctx.services.neonMat) ctx.services.neonMat.color.setRGB(1.5 * buzz, 1.5 * buzz, 1.5 * buzz);
    // haloes + billboard
    for (const h of halos) h.quaternion.copy(ctx.camera.quaternion);
  });

  ctx.addStatic(g);
  ctx.reflect(g);
  return g;
}
