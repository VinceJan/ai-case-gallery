export function buildVillage(ctx) {
  const { T, root, group, box, cyl, ball, beam, mesh, rng, updates } = ctx;
  const village = group(root, 0, .08, 0);
  const oak = 0x503324, endgrain = 0x82563a, edge = 0x69452d, iron = 0x353635;
  const plaster = [0xe5cc9f, 0xf0dcb6, 0xe1c29c, 0xf1d6ad, 0xd9ba94];
  const rock = [0x8b8272, 0x9f947f, 0xb0a38b, 0x766f65, 0x978b7b];
  const palettes = {
    straw: [0xb78543, 0xca9850, 0xd4a35d, 0xbe8b49, 0xa9773d, 0xdfb16a],
    honey: [0xc29758, 0xd3a55c, 0xe2b66f, 0xbc8746, 0xaf7d42, 0xe8bc77],
    clay: [0x9e5541, 0xb2684e, 0xbf7557, 0xa15b47, 0x884b3d, 0xd08363],
    bark: [0x77503a, 0x866047, 0x935e41, 0x684736, 0x795342, 0xa27150]
  };
  const rand = (a, b) => a + (b - a) * rng();
  const choose = a => a[Math.floor(rng() * a.length) % a.length];
  const flame = new T.MeshStandardMaterial({ color: 0xfbb24f, emissive: 0xfa641b, emissiveIntensity: 1.1, flatShading: true });
  const goldGlass = new T.MeshStandardMaterial({ color: 0xf3bb65, emissive: 0xd98838, emissiveIntensity: .37 });
  const duskGlass = 0x5c6870;
  const curve = (p, points, width, color, depth = width) => {
    for (let i = 1; i < points.length; i++) beam(p, points[i - 1], points[i], width, color, depth);
  };
  function torus(p, r, tube, x, y, z, color, flat = false, n = 16) {
    const m = mesh(p, new T.TorusGeometry(r, tube, 5, n), color, x, y, z);
    if (flat) m.rotation.x = -Math.PI / 2;
    return m;
  }
  // Small faceted surfaces, collected by color so the roof does not create thousands of Mesh objects.
  function surfaces(p, colors) {
    const chunks = colors.map(() => ({ pos: [], uv: [], ind: [] }));
    return {
      quad(k, pts, reverse = false) {
        const b = chunks[k], i = b.pos.length / 3;
        for (const pt of pts) b.pos.push(...pt);
        b.uv.push(0, 0, 1, 0, 1, 1, 0, 1);
        b.ind.push(...(reverse ? [i, i + 2, i + 1, i, i + 3, i + 2] : [i, i + 1, i + 2, i, i + 2, i + 3]));
      },
      finish() {
        chunks.forEach((b, i) => {
          if (!b.ind.length) return;
          const g = new T.BufferGeometry();
          g.setAttribute('position', new T.Float32BufferAttribute(b.pos, 3));
          g.setAttribute('uv', new T.Float32BufferAttribute(b.uv, 2));
          g.setIndex(b.ind);
          g.computeVertexNormals();
          mesh(p, g, colors[i]);
        });
      }
    };
  }
  function roof(p, half, length, y, rise, kind, axial = false) {
    const r = group(p, 0, y, 0);
    if (axial) r.rotation.y = Math.PI / 2;
    const tones = palettes[kind], thatch = kind === 'straw' || kind === 'honey';
    const rows = Math.max(4, Math.ceil(Math.hypot(half, rise) / (thatch ? .23 : .29)));
    const cols = Math.max(4, Math.ceil(length / (thatch ? .24 : .235)));
    const pitch = u => rise * (u + (thatch ? .19 : .065) * u * (1 - u));
    const skin = surfaces(r, [...tones, tones[4], tones[5]]);
    for (const side of [-1, 1]) {
      const pt = (u, z, lift = 0) => [side * half * (1 - u), pitch(u) + lift, z];
      const face = (k, a, b, c, d) => skin.quad(k, [a, b, c, d], side > 0);
      for (let i = 0; i < rows; i++) {
        const u = i / rows, v = (i + 1) / rows;
        face(4, pt(u, -length / 2, -.035), pt(u, length / 2, -.035), pt(v, length / 2, -.035), pt(v, -length / 2, -.035));
        const step = length / cols;
        for (let j = -1; j < cols; j++) {
          const l = Math.max(-length / 2, -length / 2 + (j + (i % 2) * .49) * step - .009);
          const h = Math.min(length / 2, -length / 2 + (j + 1 + (i % 2) * .49) * step + .01);
          if (h - l < .035) continue;
          const shade = Math.floor(rand(0, 6));
          const toe = u + rand(-.024, .004), top = Math.min(1.012, v + .049);
          const bulge = rand(.018, .038), thickness = thatch ? .09 : .055;
          const at = (s, t, lift = 0) => {
            const hump = Math.sin(s * Math.PI);
            const f = toe + t * (top - toe) + (1 - hump) * .017 * (1 - t);
            return pt(f, l + (h - l) * (s + (t - .55) * .065 * (1 - 2 * s)),
              .016 + thickness * (1 - t) + bulge * hump + lift);
          };
          const bands = thatch ? [0, .25, .56, .81, 1] : [0, .19, .40, .61, .80, 1];
          for (let k = 1; k < bands.length; k++) {
            const a = bands[k - 1], b = bands[k];
            face(shade, at(a, 0), at(b, 0), at(b, .39), at(a, .39));
            face(shade, at(a, .39), at(b, .39), at(b, 1), at(a, 1));
            // Little dark endgrain edges beneath each overlapping course.
            const under = q => [q[0], q[1] - thickness * .82, q[2]];
            face(6, under(at(a, 0)), under(at(b, 0)), at(b, 0), at(a, 0));
          }
          if (thatch) {
            for (let f = 0; f < 3; f++) {
              const a = (f + rand(.29, .69)) / 3, b = a + rand(.018, .048), t = rand(.31, .73);
              face(f === 0 ? 6 : 7, at(a, .04, .013), at(b, .04, .013), at(b + .013, t, .016), at(a + .022, t, .016));
            }
          }
        }
      }
      for (const z of [-length / 2 - .007, length / 2 + .007]) {
        const points = Array.from({ length: 6 }, (_, i) => pt(i / 5, z, -.043));
        curve(r, points, thatch ? .102 : .108, thatch ? tones[4] : edge, .09);
      }
      beam(r, pt(0, -length / 2, -.086), pt(0, length / 2, -.086), .12, oak);
    }
    skin.finish();
    const ridge = cyl(r, thatch ? .123 : .094, thatch ? .123 : .094, length + .12, 0, rise + .056, 0, tones[2], 9);
    ridge.rotation.x = Math.PI / 2;
    for (let z = -length / 2 + .1; z < length / 2; z += thatch ? .35 : .23) {
      const collar = cyl(r, thatch ? .131 : .101, thatch ? .131 : .101, thatch ? .034 : .052, 0, rise + .056, z, tones[3], 9);
      collar.rotation.x = Math.PI / 2;
    }
    return r;
  }
  function gables(p, span, run, y, rise, over, axial, color) {
    const g = group(p, 0, y, 0);
    if (axial) g.rotation.y = Math.PI / 2;
    const e = rise * (over / (span / 2 + over)) * .93;
    const tip = rise - .018;
    const shape = new T.Shape();
    shape.moveTo(-span / 2, -.075); shape.lineTo(span / 2, -.075); shape.lineTo(span / 2, e);
    shape.lineTo(0, tip); shape.lineTo(-span / 2, e); shape.closePath();
    for (const side of [-1, 1]) {
      const front = group(g, 0, 0, side * run / 2);
      if (side < 0) front.rotation.y = Math.PI;
      mesh(front, new T.ExtrudeGeometry(shape, { depth: .045, bevelEnabled: false }), color, 0, 0, -.019);
      curve(front, [[-span / 2, e, .023], [0, tip, .023], [span / 2, e, .023]], .101, oak);
      beam(front, [0, .015, .05], [0, tip, .05], .115, oak);
      for (const s of [-1, 1]) {
        beam(front, [s * span * .34, .03, .048], [s * span * .16, tip * .65, .048], .077, edge);
      }
      if (span > 2.8 && rise > 1) window(front, 0, tip * .39, .48, .43, side > 0, false, false);
    }
  }
  function window(p, x, y, w, h, lit, shutters = true, flowers = false, shutter = 0x647365) {
    const g = group(p, x, y, .071);
    box(g, w + .12, h + .12, .10, 0, 0, .022, oak);
    box(g, w, h, .038, 0, 0, .086, lit ? goldGlass : duskGlass);
    for (const xx of [-w / 2, 0, w / 2]) box(g, .041, h + .032, .037, xx, 0, .112, endgrain);
    for (const yy of [-h / 2, 0, h / 2]) box(g, w, .043, .037, 0, yy, .113, endgrain);
    box(g, w + .26, .086, .17, 0, -h / 2 - .065, .106, edge);
    if (shutters) for (const s of [-1, 1]) {
      const leaf = group(g, s * (w / 2 + .144), 0, .096);
      leaf.rotation.y = s * -.23;
      for (let i = -1; i <= 1; i++) box(leaf, .087, h + .033, .06, i * .092, 0, 0, shutter);
      for (const v of [-.29, .29]) box(leaf, .279, .038, .031, 0, h * v, .044, edge);
    }
    if (flowers) {
      box(g, w + .16, .148, .17, 0, -h / 2 - .138, .187, 0x80543b);
      for (let i = 0; i < 8; i++) {
        const u = rand(-w * .49, w * .49), yy = -h / 2 + rand(-.073, -.01), z = rand(.17, .26);
        ball(g, .067, u, yy - .04, z, choose([0x586744, 0x71804b, 0x818a52]));
        ball(g, rand(.028, .051), u, yy + .015, z, choose([0xb15b65, 0xe5bd78, 0xa27caa, 0xcc765a]));
      }
    }
  }
  function door(p, x, ground, w, h, color = 0x78523a) {
    const f = group(p, x, ground, .068);
    for (let j = 0; j < 7; j++) {
      const u = (j - 3) / 3.6, high = h - .19 + .19 * Math.sqrt(1 - u * u);
      box(f, w / 7 - .009, high, .096, u * w * .507, high / 2, .032, j % 3 === 0 ? endgrain : color);
    }
    const arc = [[-w * .56, 0, .07], [-w * .56, h - .23, .07]];
    for (let k = 0; k <= 8; k++) {
      const a = Math.PI * (1 - k / 8);
      arc.push([w * .56 * Math.cos(a), h - .23 + .253 * Math.sin(a), .07]);
    }
    arc.push([w * .56, 0, .07]);
    curve(f, arc, .084, oak, .105);
    for (const yy of [h * .26, h * .70]) {
      box(f, w * .37, .065, .032, -w * .287, yy, .092, iron);
      ball(f, .023, -w * .17, yy, .115, 0x79746a);
    }
    torus(f, .048, .013, w * .28, h * .47, .109, 0x9b7950, false, 10);
  }
  function stones(p, w, d, h) {
    box(p, w + .04, h, d + .04, 0, h / 2, 0, 0x70675a);
    for (const [len, out, angle] of [[w, d / 2, 0], [w, d / 2, Math.PI], [d, w / 2, Math.PI / 2], [d, w / 2, -Math.PI / 2]]) {
      const f = group(p, Math.sin(angle) * out, 0, Math.cos(angle) * out);
      f.rotation.y = angle;
      const n = Math.ceil(len / .36);
      for (let row = 0; row < 2; row++) for (let i = 0; i <= n; i++) {
        const a = Math.max(-len / 2, (i - row * .5) / n * len - len / 2);
        const b = Math.min(len / 2, (i + 1 - row * .5) / n * len - len / 2);
        if (b - a < .07) continue;
        const m = box(f, b - a - .017, h / 2 - .019, rand(.087, .137), (a + b) / 2, (row + .5) * h / 2 + rand(-.011, .011), .039, choose(rock));
        m.rotation.z = rand(-.039, .039);
      }
    }
  }
  function pad(p, w, d, z = 0) {
    box(p, w, .064, d, 0, .027, z, 0x9e8d70);
    const n = Math.ceil(w / .37);
    for (let i = 0; i < n; i++) {
      const m = box(p, w / n - .025, .078, rand(.20, .32), (i + .5) * w / n - w / 2, .042, z + d / 2 - .075, choose(rock));
      m.rotation.y = rand(-.15, .15);
    }
  }
  function lantern(p, x, y, z) {
    beam(p, [x, y + .13, z - .11], [x, y + .13, z + .022], .034, iron);
    box(p, .125, .172, .128, x, y, z, goldGlass);
    for (const i of [-1, 1]) for (const j of [-1, 1]) box(p, .022, .19, .022, x + i * .063, y, z + j * .063, iron);
    box(p, .167, .036, .16, x, y - .097, z, iron);
    cyl(p, .037, .123, .073, x, y + .113, z, iron, 4).rotation.y = Math.PI / 4;
  }
  function smoke(p, x, y, z, scale) {
    const holder = group(p, x, y, z);
    holder.userData.dynamic = true;
    for (let i = 0; i < 5; i++) {
      const material = new T.MeshStandardMaterial({ color: 0xc4bfb3, transparent: true, opacity: .2, depthWrite: false, flatShading: true, roughness: 1 });
      const cloud = mesh(holder, new T.IcosahedronGeometry(1, 1), material);
      cloud.userData.dynamic = true;
      cloud.castShadow = cloud.receiveShadow = false;
      const phase = i / 5 + rand(0, .09), wobble = rand(0, 6.28);
      updates.push((t, dt, weather) => {
        const a = (t * .159 + phase) % 1;
        const wind = Number.isFinite(weather?.wind) ? Math.max(0, Math.min(2.3, weather.wind)) : .22;
        const s = scale * (.15 + a * .48);
        cloud.position.set((.36 + wind * .23) * a * a + Math.sin(wobble + t * .57) * a * .13, a * 1.66 * scale, Math.sin(wobble + a * 4) * a * .26);
        cloud.scale.set(s, s * .74, s * .86);
        cloud.rotation.set(wobble + a * 1.3, t * .19 + wobble, a);
        material.opacity = Math.sin(Math.PI * a) * (.26 - a * .066);
      });
      material.opacity = 0;
    }
  }
  function chimney(p, x, y, z, height, color, puff) {
    box(p, .48, height, .48, x, y + height / 2, z, color);
    for (let i = 0; i < Math.ceil(height / .157); i++) {
      const yy = y + .085 + i * .152;
      if (yy > y + height - .027) break;
      for (const side of [-1, 1]) {
        const v = (i % 2 - .5) * .15;
        box(p, .20, .068, .019, x + side * .11, yy + v * .15, z + .244, choose([color, 0xa27b64, 0x876b5e, 0xb38a70]));
        box(p, .019, .067, .21, x + .245, yy - v * .18, z + side * .11, choose([color, 0x9c7967, 0x785e51]));
      }
    }
    const top = y + height;
    box(p, .61, .106, .61, x, top, z, 0x6e584a);
    box(p, .335, .011, .335, x, top + .056, z, 0x362c27);
    for (const s of [-1, 1]) {
      box(p, .097, .083, .558, x + s * .219, top + .087, z, color);
      box(p, .344, .083, .095, x, top + .087, z + s * .225, color);
    }
    box(p, .16, .009, .138, x + .029, top + .063, z - .018, flame);
    if (puff) smoke(p, x, top + .15, z, puff);
  }
  function sign(p, x, y, z, type) {
    const f = group(p, x, y, z);
    beam(f, [0, .39, -.32], [0, .39, .08], .054, iron);
    for (const s of [-1, 1]) beam(f, [s * .139, .32, .038], [s * .139, .21, .038], .021, iron);
    box(f, .49, .379, .079, 0, .015, .038, oak);
    box(f, .424, .309, .028, 0, .014, .089, type === 'smith' ? 0x586064 : 0x526a5b);
    if (type === 'smith') {
      box(f, .214, .038, .018, -.009, .047, .11, 0xe2c591);
      beam(f, [-.16, .054, .118], [-.081, .013, .118], .032, 0xe2c591);
      box(f, .103, .12, .026, 0, -.007, .11, 0xe2c591);
      box(f, .159, .037, .027, 0, -.072, .11, 0xe2c591);
    } else {
      cyl(f, .082, .062, .156, -.034, .011, .117, 0xdcb170, 9);
      torus(f, .043, .012, .048, .034, .117, 0xdcb170, false, 10);
      box(f, .16, .029, .043, -.037, .088, .12, 0xf3d9a4);
    }
  }
  function cottage(o) {
    const { x, z, w, d, body, rise, kind, axial = false, stone = .31, loft = false, shop = false } = o;
    const g = group(village, x, 0, z), eave = body + stone;
    const wallColor = plaster[o.plaster ?? 0];
    box(g, w, body, d, 0, stone + body / 2, 0, wallColor);
    stones(g, w + .045, d + .045, stone);
    pad(g, w + .27, .26, d / 2 + .115);
    box(g, .91, .11, .30, 0, .10, d / 2 + .16, rock[2]);
    for (const [len, out, angle, face] of [[w, d / 2, 0, 0], [w, d / 2, Math.PI, 1], [d, w / 2, Math.PI / 2, 2], [d, w / 2, -Math.PI / 2, 3]]) {
      const f = group(g, Math.sin(angle) * out, 0, Math.cos(angle) * out);
      f.rotation.y = angle;
      const bars = [stone + .047, stone + .37, eave - .124], split = stone + body * .54;
      if (loft) bars.push(split);
      for (const y of bars) box(f, len + .095, .125, .122, 0, y, .023, oak);
      const bays = len > 3.15 ? 3 : 2;
      const bw = len / bays;
      for (let i = 0; i <= bays; i++) {
        const xx = -len / 2 + i * bw;
        box(f, i === 0 || i === bays ? .143 : .108, body + .063, .137, xx, stone + body / 2, .027, oak);
        if (loft) box(f, .153, .099, .198, xx, split - .105, .052, endgrain);
      }
      for (let i = 0; i < bays; i++) {
        const cx = (i + .5) * bw - len / 2, s = i % 2 ? -1 : 1;
        const doorway = (face === 0 && i === Math.floor((bays - 1) / 2)) || (shop && face === 2 && i === 1);
        if (!doorway) {
          box(f, bw - .15, (loft ? split : eave) - stone - .58, .018, cx, stone + ((loft ? split : eave) - stone) * .5 + .15, .01, choose(plaster));
          const hasWin = face < 3 || i === 0;
          if (hasWin) window(f, cx, loft ? stone + .89 : stone + body * .52, Math.min(.65, bw * .50), loft ? .48 : .64, !!((i + face + o.plaster) % 3), bw > .95, face === 0 && !shop, o.shutter);
          else beam(f, [cx - s * bw * .46, stone + .40, .056], [cx + s * bw * .44, loft ? split - .09 : eave - .18, .056], .091, edge);
          beam(f, [cx - s * bw * .45, stone + .09, .058], [cx + s * bw * .32, stone + .36, .058], .075, edge);
        } else {
          // The base rail disappears behind the deeply framed opening.
          box(f, .72, .113, .046, cx, stone - .017, .12, edge);
          door(f, cx, stone - .014, Math.min(.77, bw * .69), loft ? 1.34 : Math.min(1.68, body - .27), o.door);
          if (face === 0) {
            box(f, .84, .13, .34, cx, .135, .177, rock[2]);
            lantern(f, cx + bw * .47, stone + 1.24, .221);
          }
        }
        if (loft) {
          const gy = (split + eave) / 2;
          if (face !== 1 || i % 2 === 0) window(f, cx, gy, Math.min(.72, bw * .47), .62, i % 2 === 0, bw > 1.10, face === 0 && i === 1, o.shutter);
          for (const side of [-1, 1]) beam(f, [cx + side * bw * .47, split + .075, .059], [cx + side * bw * .27, gy + .31, .059], .072, edge);
        }
      }
    }
    const span = axial ? d : w, run = axial ? w : d, over = .24;
    gables(g, span, run, eave, rise, over, axial, wallColor);
    roof(g, span / 2 + over, run + .50, eave, rise, kind, axial);
    if (o.chimney) chimney(g, ...o.chimney);
    return g;
  }

  const inn = cottage({ x: -6.11, z: -2.99, w: 3.95, d: 3.40, body: 3.06, rise: 1.54, kind: 'honey', axial: true, loft: true, plaster: 1, shutter: 0x6b7865, chimney: [1.15, 3.86, -.60, 1.31, 0xa17760, 1.04] });
  sign(inn, .91, 2.24, 2.03, 'inn');
  cottage({ x: -2.77, z: -3.30, w: 2.12, d: 2.85, body: 1.97, rise: 1.16, kind: 'clay', plaster: 3, shutter: 0x668184, door: 0x5e6a59, chimney: [-.51, 2.45, -.52, .99, 0x97725e, .71] });
  cottage({ x: 3.02, z: -3.14, w: 2.48, d: 3.30, body: 2.32, rise: 1.34, kind: 'straw', plaster: 2, shutter: 0x8c6550, chimney: [.68, 2.82, -.63, 1.09, 0x996d59, .76] });
  cottage({ x: 7.20, z: -3.01, w: 4.23, d: 3.42, body: 3.26, rise: 1.48, kind: 'honey', loft: true, axial: true, plaster: 0, shutter: 0x67766f, door: 0x654332, chimney: [-1.22, 4.02, -.43, 1.41, 0x957864, .97] });

  function windmill(x, z) {
    const g = group(village, x, 0, z), n = 12;
    const masonry = surfaces(g, rock);
    const radius = y => 1.20 - y * .072;
    const ringPt = (a, y, off = 0) => [(radius(y) + off) * Math.sin(a), y, (radius(y) + off) * Math.cos(a)];
    cyl(g, radius(3.77) - .054, radius(0) - .054, 3.77, 0, 1.885, 0, 0x9d907a, 24);
    for (let row = 0; row < 14; row++) {
      const sy = row * .267 + .009, ty = sy + rand(.226, .248);
      for (let j = 0; j < n; j++) {
        const a = (j + (row % 2) * .5 + .019) * Math.PI * 2 / n, b = a + .961 * Math.PI * 2 / n;
        const off = rand(.003, .052), m = (a + b) / 2, k = Math.floor(rand(0, rock.length));
        masonry.quad(k, [ringPt(a, sy, off), ringPt(m, sy, off + .006), ringPt(m, ty, off + .007), ringPt(a, ty, off)]);
        masonry.quad(k, [ringPt(m, sy, off + .006), ringPt(b, sy, off), ringPt(b, ty, off), ringPt(m, ty, off + .007)]);
      }
    }
    masonry.finish();
    cyl(g, 1.189, 1.255, .14, 0, .071, 0, rock[0], n);
    cyl(g, .945, .983, .132, 0, 3.72, 0, rock[2], n);
    cyl(g, 1.08, .926, .26, 0, 3.88, 0, edge, 16);
    cyl(g, 1.051, 1.08, .54, 0, 4.20, 0, oak, 16);
    for (let i = 0; i < 16; i++) {
      const a = (i + .5) * Math.PI / 8;
      const stave = box(g, .373, .49, .084, Math.sin(a) * 1.038, 4.19, Math.cos(a) * 1.038, i % 3 ? edge : endgrain);
      stave.rotation.y = a;
    }
    const f = group(g, 0, .15, 1.185);
    door(f, 0, 0, .64, 1.43, 0x75503a);
    for (let i = 0; i < 3; i++) box(g, .91 - i * .07, .097, .25, 0, .05 + i * .06, 1.66 - i * .16, rock[i]);
    lantern(f, .55, 1.33, .23);
    const side = group(g, .995, 2.33, 0);
    side.rotation.y = Math.PI / 2;
    window(side, 0, 0, .46, .58, true, false);
    window(f, 0, 2.49, .39, .48, false, false);
    const cap = surfaces(g, palettes.bark);
    const r = t => 1.285 * (1 - t) ** 1.22 + .047;
    const pos = (a, t, lip) => [(r(t) + lip) * Math.sin(a), 4.52 + t * 1.51, (r(t) + lip) * Math.cos(a)];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 24; j++) {
        const a = j * Math.PI / 12, b = (j + 1) * Math.PI / 12, u = i / 9, v = (i + 1) / 9;
        cap.quad(3, [pos(a, u, -.02), pos(b, u, -.02), pos(b, v, -.02), pos(a, v, -.02)]);
      }
      const count = Math.max(7, 25 - i * 2);
      for (let j = 0; j < count; j++) {
        const k = Math.floor(rand(0, 6)), a = (j + i * .49) / count * Math.PI * 2, b = a + Math.PI * 2.045 / count, mid = (a + b) / 2;
        const t = i / 9, t1 = Math.min(1, t + .15), lip = rand(.032, .075);
        cap.quad(k, [pos(a, t, lip), pos(mid, t - .012, lip + .018), pos(mid, t1, .012), pos(a, t1, .006)]);
        cap.quad(k, [pos(mid, t - .012, lip + .018), pos(b, t, lip), pos(b, t1, .006), pos(mid, t1, .012)]);
        cap.quad(3, [pos(a, t, .007), pos(mid, t - .012, .009), pos(mid, t - .012, lip + .018), pos(a, t, lip)]);
        cap.quad(3, [pos(mid, t - .012, .009), pos(b, t, .007), pos(b, t, lip), pos(mid, t - .012, lip + .018)]);
      }
    }
    cap.finish();
    ball(g, .104, 0, 6.067, 0, 0xaa834f, 1);
    const axle = cyl(g, .167, .167, .69, 0, 4.46, 1.206, oak, 10);
    axle.rotation.x = Math.PI / 2;
    const rotor = group(g, 0, 4.46, 1.53);
    rotor.userData.dynamic = true;
    rotor.rotation.z = .28;
    const hub = cyl(rotor, .208, .236, .21, 0, 0, .035, endgrain, 10);
    hub.rotation.x = Math.PI / 2;
    const bolt = cyl(rotor, .085, .09, .07, 0, 0, .165, iron, 8);
    bolt.rotation.x = Math.PI / 2;
    for (let i = 0; i < 4; i++) {
      const sail = group(rotor);
      sail.rotation.z = i * Math.PI / 2;
      beam(sail, [0, .062, 0], [0, 2.39, 0], .106, oak, .094);
      const right = u => .28 + u * .245;
      const l = -.12;
      for (const xAt of [() => l, u => right(u) * .52, right]) {
        beam(sail, [xAt(0), .78, .014], [xAt(1), 2.33, .014], .038, endgrain, .046);
      }
      for (let j = 0; j <= 8; j++) {
        const u = j / 8, y = .78 + 1.55 * u;
        beam(sail, [l - .035, y, .029], [right(u) + .016, y, .029], j % 4 === 0 ? .048 : .031, j % 2 ? edge : 0xa67c51, .039);
      }
      const linen = surfaces(sail, [0xe4cba1, 0xcfb98e]);
      for (let j = 0; j < 4; j++) {
        const u = j / 8, v = (j + 1) / 8, y = .78 + u * 1.55, end = .78 + v * 1.55;
        const a = [right(u) * .54, y, .052], b = [right(u) - .011, y, .052];
        const c = [right(v) - .011, end, .052], d = [right(v) * .54, end, .052];
        linen.quad(j % 2, [a, b, c, d]); linen.quad(1, [a, b, c, d], true);
      }
      linen.finish();
    }
    // Also flag children for batchers that inspect meshes rather than ancestors.
    rotor.traverse(node => { node.userData.dynamic = true; });
    updates.push((t, dt, weather) => {
      const wind = typeof weather?.wind === 'number' ? Math.max(0, Math.min(1.8, weather.wind)) : .28;
      rotor.rotation.z -= (Number.isFinite(dt) ? Math.max(0, Math.min(dt, .1)) : 0) * (.155 + .115 * wind);
    });
  }
  windmill(-11.51, -3.58);

  function barrel(p, x, z, h = .49, r = .224, y = 0) {
    const g = group(p, x, y, z);
    cyl(g, r, r * .84, h * .53, 0, h * .265, 0, edge, 12);
    cyl(g, r * .86, r, h * .47, 0, h * .765, 0, endgrain, 12);
    cyl(g, r * .77, r * .77, .025, 0, h - .004, 0, 0xa2784d, 12);
    for (const f of [.2, .50, .81]) cyl(g, r * (1.045 - Math.abs(.5 - f) * .29), r * (1.045 - Math.abs(.5 - f) * .29), .041, 0, h * f, 0, iron, 12);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      beam(g, [Math.sin(a) * r * .878, .022, Math.cos(a) * r * .878], [Math.sin(a) * r * 1.011, h * .49, Math.cos(a) * r * 1.011], .016, oak);
      beam(g, [Math.sin(a) * r * 1.011, h * .51, Math.cos(a) * r * 1.011], [Math.sin(a) * r * .883, h - .016, Math.cos(a) * r * .883], .014, oak);
    }
    return g;
  }
  function hay(p, x, y, z, w, h, d, angle = 0) {
    const g = group(p, x, y, z);
    g.rotation.y = angle;
    box(g, w, h, d, 0, h / 2, 0, 0xc59d59);
    for (let j = 0; j < 34; j++) {
      const a = rand(-w * .46, w * .40), b = rand(.022, h - .027);
      beam(g, [a, b, d * .503], [Math.min(w * .53, a + rand(.053, .26)), b + rand(-.04, .04), d * .514], .014, choose([0xe0bc75, 0xab8044, 0xd8ad62]));
      const q = rand(-d * .5, d * .49);
      beam(g, [a, h + .007, q], [Math.min(w * .55, a + rand(.06, .25)), h + rand(.004, .027), q + rand(-.025, .025)], .014, choose([0xe5bf78, 0xb98c49, 0xd4aa64]));
    }
    for (const s of [-1, 1]) {
      const u = s * w * .263;
      beam(g, [u, .018, d * .516], [u, h + .021, d * .516], .021, 0x8c683d);
      beam(g, [u, h + .024, -d * .51], [u, h + .024, d * .525], .021, 0x8c683d);
    }
    return g;
  }
  function granary(x, z) {
    const g = group(village, x, 0, z), w = 2.68, d = 2.79, base = .54, top = 2.45;
    for (const xx of [-1.02, 1.02]) for (const zz of [-1.06, 1.06]) {
      cyl(g, .136, .207, .35, xx, .175, zz, rock[0], 8);
      cyl(g, .275, .192, .151, xx, .40, zz, rock[2], 10);
    }
    box(g, w + .09, .148, d + .11, 0, base, 0, oak);
    box(g, w, top - base, d, 0, (top + base) / 2, 0, 0x694932);
    for (const [len, out, angle] of [[w, d / 2, 0], [w, d / 2, Math.PI], [d, w / 2, Math.PI / 2], [d, w / 2, -Math.PI / 2]]) {
      const f = group(g, Math.sin(angle) * out, 0, Math.cos(angle) * out);
      f.rotation.y = angle;
      const n = Math.ceil(len / .17);
      for (let i = 0; i < n; i++) box(f, len / n - .013, top - base, .054, (i + .5) * len / n - len / 2, (base + top) / 2 + rand(-.025, .009), .04, choose([edge, 0x865e40, 0x8e6544, 0x79543a, 0x9a704b]));
      for (const yy of [base + .091, top - .09]) box(f, len + .13, .15, .126, 0, yy, .068, oak);
      for (const s of [-1, 1]) {
        box(f, .134, top - base, .15, s * len / 2, (top + base) / 2, .057, oak);
        beam(f, [s * len * .474, base + .15, .077], [s * len * .25, top - .16, .077], .092, endgrain);
      }
      if (angle === 0) door(f, 0, base + .05, .82, 1.57, 0x8a5938);
      else window(f, 0, 1.94, .49, .37, false, false);
    }
    for (let i = -2; i <= 2; i++) beam(g, [i * .139, .047, 2.42], [i * .139, base + .045, 1.41], .132, i % 2 ? edge : endgrain, .073);
    for (let j = 0; j < 5; j++) box(g, .72, .033, .041, 0, .075 + j * .10, 2.35 - j * .195, oak);
    gables(g, w, d, top, 1.16, .24, false, 0x916744);
    roof(g, w / 2 + .24, d + .48, top, 1.16, 'bark');
    beam(g, [0, 2.81, 1.35], [0, 2.81, 1.94], .112, oak);
    const pulley = cyl(g, .104, .104, .10, 0, 2.68, 1.87, edge, 10);
    pulley.rotation.z = Math.PI / 2;
    beam(g, [.084, 2.70, 1.91], [.084, 1.46, 1.91], .025, 0xa68b60);
    torus(g, .049, .014, .084, 1.42, 1.91, iron);
    barrel(g, .99, 1.75, .57, .235);
    hay(g, -.86, 0, 1.87, .65, .36, .48, .18);
  }
  granary(11.84, -3.16);

  function smithy(x, z) {
    const g = group(village, x, 0, z);
    pad(g, 3.76, 3.42, .54);
    box(g, 3.46, .26, .28, 0, .16, -1.01, rock[0]);
    box(g, 3.40, 2.13, .26, 0, 1.27, -1.03, plaster[2]);
    box(g, .18, 2.13, 1.64, 1.66, 1.26, -.23, plaster[0]);
    for (const xx of [-1.68, -.53, .5, 1.68]) box(g, .137, 2.35, .16, xx, 1.18, -.888, oak);
    for (const yy of [.34, 1.33, 2.34]) box(g, 3.51, .126, .171, 0, yy, -.891, oak);
    box(g, .152, 2.38, .158, 1.67, 1.19, .59, oak);
    beam(g, [1.758, .31, -.89], [1.758, 2.22, .57], .085, edge);
    const backRoof = group(g, 0, 0, -.38);
    gables(backRoof, 3.48, 1.63, 2.37, 1.01, .21, false, plaster[0]);
    roof(backRoof, 1.95, 1.98, 2.37, 1.01, 'bark');
    // Open-sided lean-to with hand-split boards and rows of iron nail heads.
    const fz = 1.84, bz = .26, fy = 1.99, by = 2.42;
    for (const xx of [-1.65, 1.65]) {
      box(g, .156, fy, .164, xx, fy / 2 + .048, fz - .17, oak);
      box(g, .238, .145, .241, xx, .098, fz - .17, rock[2]);
      beam(g, [xx, 1.43, fz - .17], [xx, 2.18, .94], .10, edge);
      beam(g, [xx, 1.47, fz - .17], [xx * .72, 1.94, fz - .17], .091, edge);
    }
    box(g, 3.65, .142, .146, 0, fy + .015, fz - .17, oak);
    for (let i = 0; i < 19; i++) {
      const u = (i - 9) * .199, tone = choose([0x654d39, 0x805e44, 0x89674c, 0x70523b, 0x967557]);
      beam(g, [u, by + rand(-.014, .016), bz], [u, fy + .09 + rand(-.019, .016), fz + rand(-.022, .041)], .207, tone, .089);
      if (i % 2 === 0) ball(g, .021, u, fy + .144, fz - .077, iron);
    }
    box(g, 3.81, .119, .076, 0, fy + .071, fz + .041, edge);
    sign(g, -1.45, 1.70, 2.11, 'smith');
    lantern(g, 1.47, 1.67, 1.87);

    const hearth = group(g, .92, .02, -.42);
    box(hearth, 1.18, .62, .91, 0, .32, 0, 0x655c55);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
      box(hearth, .248, .154, .11, (i - 1.5) * .285 + (j % 2 ? .023 : -.031), .146 + j * .178, .438, choose(rock));
    }
    box(hearth, 1.24, .133, .96, 0, .65, .008, 0x887260);
    box(hearth, 1.04, .024, .72, .011, .729, .076, 0x2f2a25);
    for (let i = 0; i < 15; i++) {
      const xx = rand(-.37, .37), zz = rand(-.12, .32);
      ball(hearth, rand(.046, .093), xx, rand(.738, .793), zz, choose([0x47302a, 0xae481f, 0x773126, 0x382d28]));
      if (i < 7) {
        const ember = ball(hearth, rand(.05, .092), xx, rand(.765, .87), zz, flame);
        ember.scale.x *= .89;
        ember.scale.y *= rand(.98, 1.9);
        ember.scale.z *= .79;
      }
    }
    box(hearth, .98, .09, .72, 0, 1.25, -.003, 0x443c35);
    const hood = surfaces(hearth, [0x554841, 0x49423c]);
    hood.quad(0, [[-.50, 1.25, .36], [.50, 1.25, .36], [.234, 1.68, .043], [-.234, 1.68, .043]]);
    hood.quad(1, [[.50, 1.25, .36], [.50, 1.25, -.36], [.234, 1.68, -.43], [.234, 1.68, .043]]);
    hood.quad(1, [[-.50, 1.25, -.36], [-.50, 1.25, .36], [-.234, 1.68, .043], [-.234, 1.68, -.43]]);
    hood.finish();
    chimney(hearth, 0, 1.61, -.191, 2.12, 0x8b6958, .97);
    const light = new T.PointLight(0xff852f, 1.4, 2.30, 2);
    light.position.set(.02, .98, .33);
    hearth.add(light);
    updates.push(t => { light.intensity = 1.30 + .24 * Math.sin(t * 12.7) + .16 * Math.sin(t * 7.9); });

    const anvil = group(g, -.04, 0, 1.06);
    anvil.rotation.y = -.19;
    cyl(anvil, .245, .29, .57, 0, .285, 0, edge, 10);
    cyl(anvil, .273, .273, .046, 0, .426, 0, iron, 10);
    box(anvil, .43, .10, .26, 0, .59, 0, iron);
    box(anvil, .31, .19, .20, .008, .716, 0, 0x444441);
    box(anvil, .51, .098, .256, -.049, .832, 0, 0x5b5a54);
    const horn = mesh(anvil, new T.CylinderGeometry(.024, .115, .27, 6), 0x52534d, .322, .814, 0);
    horn.rotation.z = -Math.PI / 2;
    box(anvil, .52, .026, .256, -.047, .887, 0, 0x77756c);
    const hammer = group(anvil, -.07, .91, .012);
    hammer.rotation.y = -.64;
    box(hammer, .039, .035, .217, 0, .025, 0, endgrain);
    box(hammer, .133, .069, .066, 0, .045, -.104, iron);
    barrel(g, 1.30, 1.31, .48, .225);
    cyl(g, .187, .187, .014, 1.30, .5, 1.31, 0x647474, 12);
    box(g, 1.26, .114, .46, -.98, .85, -.545, endgrain);
    for (const xx of [-1.52, -.44]) box(g, .091, .79, .12, xx, .43, -.51, oak);
    box(g, 1.25, .087, .093, -.98, 1.66, -.77, edge);
    const tools = group(g, -1.48, 0, -.698);
    for (let i = 0; i < 5; i++) {
      const u = i * .238, lean = (i - 2) * .047;
      torus(tools, .035, .009, u, 1.61, .02, iron, false, 8);
      beam(tools, [u, 1.58, .03], [u + lean, 1.05 + (i % 3) * .09, .045], .028, i === 2 ? endgrain : iron);
      if (i === 0 || i === 2) box(tools, .16, .07, .086, u + lean, 1.06 + (i % 3) * .09, .046, iron);
      else if (i === 1) beam(tools, [u, 1.58, .032], [u + .09, 1.17, .042], .023, iron);
      else if (i === 3) torus(tools, .075, .014, u + lean, 1.01, .043, iron, false, 10);
      else beam(tools, [u + lean, 1.14, .034], [u + lean + .056, 1.08, .06], .027, iron);
    }
    box(g, .38, .14, .38, -.86, .15, .12, 0x544737);
    for (let i = 0; i < 7; i++) ball(g, rand(.044, .09), -.86 + rand(-.13, .14), rand(.22, .27), .12 + rand(-.12, .14), 0x463f36);
  }
  smithy(11.37, 1.07);

  function crate(p, w, h, d, x, y, z) {
    const g = group(p, x, y, z);
    box(g, w, .052, d, 0, .026, 0, oak);
    for (const s of [-1, 1]) {
      for (let i = 0; i < 2; i++) {
        box(g, w, h * .38, .038, 0, h * (.31 + i * .46), s * (d / 2 - .018), i ? endgrain : edge);
        box(g, .034, h * .38, d - .056, s * (w / 2 - .016), h * (.31 + i * .46), 0, i ? 0x946c4c : endgrain);
      }
      for (const t of [-1, 1]) box(g, .047, h, .044, s * (w / 2 - .025), h / 2, t * (d / 2 + .001), 0xa3784e);
    }
    return g;
  }
  function produce(p, kind, w, d, x, y, z) {
    const g = crate(p, w, .15, d, x, y, z);
    const tones = {
      apples: [0xc65d45, 0xb64a36, 0xd28351, 0xd5a15c, 0xd06243],
      cabbages: [0x7d884e, 0x788e59, 0x97a465, 0x657848],
      bread: [0xd6a766, 0xb9884a, 0xcd9653, 0xdcb474],
      gourds: [0xd38740, 0xc47335, 0xda9d46, 0xddad5e],
      turnips: [0xc8a3ac, 0xd5b5a9, 0xa58599, 0xe2c9af]
    }[kind];
    const cols = kind === 'bread' ? 3 : Math.round(w / .133), rows = kind === 'bread' ? 2 : 3;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const a = (i + .5) * w / cols - w / 2 + rand(-.023, .023), b = (j + .5) * d / rows - d / 2 + rand(-.015, .015);
      const rad = kind === 'bread' ? rand(.074, .096) : rand(.053, .083);
      const yy = rand(.141, .175);
      const m = ball(g, rad, a, yy, b, choose(tones), kind === 'bread' ? 1 : 0);
      if (kind === 'bread') {
        m.scale.set(rad * .86, rad * .70, rad * 1.39);
        m.rotation.y = rand(-.22, .22);
        for (let k = -1; k <= 1; k++) beam(g, [a - .041, yy + rad * .62, b + k * .042], [a + .037, yy + rad * .65, b + k * .042 + .016], .012, 0xe9c58b);
      } else if (kind === 'cabbages') {
        for (let k = 0; k < 3; k++) {
          const th = k * 2.1 + i;
          const leaf = ball(g, rad * .7, a + rad * .48 * Math.cos(th), yy + .023, b + rad * .45 * Math.sin(th), tones[k]);
          leaf.scale.y *= .54;
        }
      } else {
        m.scale.x *= kind === 'gourds' ? 1.08 : 1;
        m.scale.y *= kind === 'turnips' ? 1.15 : .88;
        const leaf = ball(g, rad * .35, a + .013, yy + rad * .83, b, kind === 'gourds' ? 0x7b6335 : 0x617046);
        leaf.scale.y *= .49;
        leaf.scale.z *= .63;
      }
    }
  }
  function stall(x, z, angle, width, tones, goods) {
    const g = group(village, x, 0, z);
    g.rotation.y = angle;
    pad(g, width + .17, 1.37, .05);
    const xPost = width / 2 - .12;
    for (const s of [-1, 1]) {
      box(g, .082, 2.07, .091, s * xPost, 1.06, .56, endgrain);
      box(g, .097, 2.04, .086, s * xPost, 1.04, -.57, oak);
      beam(g, [s * xPost, 1.58, .56], [s * (xPost - .26), 1.97, .56], .065, edge);
      beam(g, [s * xPost, 2.01, -.62], [s * xPost, 2.34, -.09], .068, edge);
      beam(g, [s * xPost, 2.34, -.09], [s * xPost, 2.04, .63], .068, edge);
    }
    for (const [yy, zz] of [[2.037, .59], [2.23, -.08], [1.978, -.57]]) box(g, width + .06, .065, .066, 0, yy, zz, oak);
    // Cloth follows a shallow sag between poles; each front stripe has a hanging scallop.
    const cloth = surfaces(g, tones), n = 10;
    const profile = [[-.686, 2.016], [-.48, 2.10], [-.079, 2.365], [.15, 2.252], [.49, 2.091], [.722, 2.046]];
    const border = width * .5 + .14, dw = 2 * border / n;
    const clothQuad = (k, a, b, c, d) => { cloth.quad(k, [a, b, c, d]); cloth.quad(k, [a, b, c, d], true); };
    const at = (i, s, j) => [dw * (i + s) - border, profile[j][1] - .022 * Math.sin(s * Math.PI), profile[j][0]];
    for (let i = 0; i < n; i++) {
      const k = i % 2;
      for (let j = 0; j < profile.length - 1; j++) for (let m = 0; m < 3; m++) {
        const a = m / 3, b = (m + 1) / 3;
        clothQuad(k, at(i, a, j), at(i, a, j + 1), at(i, b, j + 1), at(i, b, j));
      }
      for (let m = 0; m < 5; m++) {
        const a = m / 5, b = (m + 1) / 5;
        const bottom = s => [dw * (i + s) - border, 1.965 - Math.sin(s * Math.PI) * .10, .745 + Math.sin(s * Math.PI) * .017];
        const stitch = pt => [pt[0], pt[1] + .020, pt[2] - .004];
        const aa = bottom(a), bb = bottom(b);
        clothQuad(k, stitch(aa), stitch(bb), at(i, b, 5), at(i, a, 5));
        clothQuad(2, aa, bb, stitch(bb), stitch(aa));
      }
    }
    cloth.finish();
    for (let i = 0; i < n; i++) box(g, width / n - .01, .61, .057, (i + .5) * width / n - width / 2, .48, .336, i % 3 ? edge : endgrain);
    box(g, width + .13, .095, .64, 0, .834, .089, 0x9c7250);
    box(g, width + .12, .11, .091, 0, .786, .386, oak);
    const wGoods = (width - .16) / goods.length;
    goods.forEach((kind, i) => produce(g, kind, wGoods - .062, .45, (i + .5) * wGoods - (width - .16) / 2, .886, .114));
    box(g, .46, .21, .038, xPost - .21, .588, .381, 0x594b38);
    for (let i = 0; i < 3; i++) box(g, i % 2 ? .217 : .30, .017, .01, xPost - .21, .64 - i * .051, .407, 0xd6bf90);
    barrel(g, -width / 2 - .09, .52, .42, .168);
  }
  stall(-8.13, 1.30, -.15, 2.17, [0xa95346, 0xe2c290, 0x855348], ['apples', 'gourds', 'turnips']);
  stall(-4.57, .93, .08, 2.32, [0x527a86, 0xe6ceaa, 0x4c6170], ['bread', 'bread', 'apples']);
  stall(5.54, .71, -.15, 2.18, [0x748456, 0xe3c080, 0x6f6548], ['cabbages', 'gourds', 'turnips']);

  function well(x, z) {
    const g = group(village, x, 0, z);
    pad(g, 1.94, 1.92);
    const masonry = surfaces(g, [...rock, 0x6d665a]);
    const N = 12;
    const pt = (r, a, y) => [r * Math.sin(a), y, r * Math.cos(a)];
    for (let row = 0; row < 4; row++) {
      const rim = row === 3;
      const y = row * .198 + .061, h = rim ? .137 : .18;
      const half = Math.PI / N;
      for (let i = 0; i < N; i++) {
        const a = (i + .5 * (row % 2)) * half * 2, b = a + half * 1.90;
        const out = (rim ? .824 : .76) + rand(-.017, .017), inner = rim ? .52 : .575;
        const k = Math.floor(rand(0, rock.length));
        for (const [l, r] of [[a, (a + b) / 2], [(a + b) / 2, b]]) {
          const A = pt(out, l, y + h), B = pt(out, r, y + h), C = pt(inner, r, y + h), D = pt(inner, l, y + h);
          masonry.quad(k, [pt(out, l, y), pt(out, r, y), B, A]);
          masonry.quad(k, [A, B, C, D]);
          masonry.quad(row < 2 ? 5 : k, [pt(inner, r, y), pt(inner, l, y), D, C]);
        }
      }
    }
    masonry.finish();
    const liner = mesh(g, new T.CylinderGeometry(.585, .585, .605, 24, 1, true), new T.MeshStandardMaterial({ color: 0x59574f, side: T.DoubleSide }), 0, .35, 0);
    liner.castShadow = false;
    cyl(g, .558, .558, .017, 0, .29, 0, 0x455e5a, 24);
    torus(g, .207, .008, .07, .302, -.03, 0x657e75, true, 16);
    torus(g, .126, .008, .07, .303, -.03, 0x708379, true, 16);
    for (const s of [-1, 1]) {
      box(g, .124, 2.35, .148, s * .65, 1.20, -.089, oak);
      beam(g, [s * .65, 1.74, -.089], [s * .33, 2.302, -.089], .088, edge);
    }
    const crank = cyl(g, .104, .104, 1.49, 0, 1.54, -.061, endgrain, 12);
    crank.rotation.z = Math.PI / 2;
    for (let i = -4; i <= 4; i++) {
      torus(g, .105, .015, i * .025, 1.54, -.061, 0xa9906c, false, 12).rotation.y = Math.PI / 2;
    }
    beam(g, [.775, 1.54, -.061], [.808, 1.688, .104], .046, iron);
    beam(g, [.808, 1.688, .104], [.964, 1.688, .104], .059, endgrain);
    beam(g, [.034, 1.54, .058], [.034, .724, .058], .021, 0xaa9068);
    barrel(g, .034, .058, .215, .134, .506);
    torus(g, .09, .013, .034, .742, .058, iron, false, 12);
    const canopy = group(g, 0, 0, -.12);
    roof(canopy, .547, 1.64, 2.33, .47, 'bark', true);
    box(g, 1.45, .096, .13, 0, 2.304, -.089, edge);
    barrel(g, .97, .42, .34, .152);
  }
  well(3.58, 3.42);

  function cart(x, z) {
    const g = group(village, x, 0, z);
    g.rotation.y = .51;
    const wheel = side => {
      const w = group(g, side * .76, .477, -.095);
      w.rotation.y = Math.PI / 2;
      torus(w, .423, .046, 0, 0, 0, edge, false, 16);
      torus(w, .449, .021, 0, 0, .006, iron, false, 16);
      const hub = cyl(w, .105, .123, .175, 0, 0, 0, 0x8b6243, 10);
      hub.rotation.x = Math.PI / 2;
      for (let i = 0; i < 9; i++) {
        const a = i * Math.PI * 2 / 9;
        beam(w, [Math.sin(a) * .07, Math.cos(a) * .07, .003], [Math.sin(a) * .411, Math.cos(a) * .411, .003], .045, i % 2 ? endgrain : edge, .042);
      }
      ball(w, .069, 0, 0, side * .094, iron);
    };
    wheel(-1); wheel(1);
    const ax = cyl(g, .044, .044, 1.47, 0, .477, -.095, iron, 8);
    ax.rotation.z = Math.PI / 2;
    for (let i = -3; i <= 3; i++) box(g, .160, .089, 1.45, i * .166, .595, -.153, i % 2 ? 0x956e4a : endgrain);
    for (const s of [-1, 1]) {
      beam(g, [s * .51, .551, -.88], [s * .62, .381, 1.635], .081, oak);
      for (const q of [-1, 1]) box(g, .093, .456, .092, s * .561, .786, q > 0 ? .49 : -.84, oak);
      for (const yy of [.727, .903]) box(g, .075, .108, 1.43, s * .546, yy, -.174, yy > .8 ? 0x9d7551 : edge);
    }
    for (const z of [-.86, .527]) box(g, 1.08, .208, .061, 0, .72, z, edge);
    hay(g, -.088, .643, -.445, .79, .26, .54, -.14);
    produce(g, 'gourds', .45, .40, .18, .645, .172);
    torus(g, .088, .017, -.31, .65, .25, 0xa58b62, true, 12);
  }
  cart(7.59, 3.20);

  // Small clusters of yard stones and goods tie the separate buildings to the square.
  function cobbles(x, z, n, w, d) {
    for (let i = 0; i < n; i++) {
      const xx = x + rand(-w / 2, w / 2), zz = z + rand(-d / 2, d / 2);
      const p = cyl(village, rand(.073, .147), rand(.080, .157), rand(.029, .055), xx, .018, zz, choose([0xa9987d, 0x9b8c71, 0xaf9b7d, 0xb5a080]), 5);
      p.rotation.y = rand(0, 6.28);
      p.scale.z *= rand(.67, 1.38);
    }
  }
  cobbles(-6.50, 2.42, 44, 5.05, 1.31);
  cobbles(-3.69, 3.72, 15, 1.51, 1.24);
  cobbles(4.37, 2.06, 29, 2.67, .98);
  cobbles(9.29, 3.09, 21, 2.16, .89);
  cobbles(-11.53, -1.14, 18, 1.53, .60);
  cobbles(12.87, 3.17, 13, 1.09, .72);

  const stack = group(village, -10.93, 0, .332);
  stack.rotation.y = -.27;
  pad(stack, 1.95, 1.32);
  hay(stack, -.52, .062, -.15, .78, .38, .60);
  hay(stack, .329, .062, -.09, .76, .36, .63, .08);
  hay(stack, -.45, .446, -.18, .74, .33, .55, -.11);
  barrel(stack, .77, .42, .55, .214);
  crate(stack, .46, .275, .385, -.12, .061, .36);
  barrel(village, -5.24, -.79, .56, .232);
  barrel(village, -4.76, -.72, .43, .182);
  barrel(village, 6.81, -.82, .56, .23);
  barrel(village, 13.56, 2.29, .54, .235);
  crate(village, .48, .29, .42, 12.94, .02, 3.44);
  const logs = group(village, 8.50, 0, -.70);
  logs.rotation.y = -.287;
  for (let i = 0; i < 9; i++) {
    const xx = (i % 4) * .174 - .28 + Math.floor(i / 4) * .069, yy = .101 + Math.floor(i / 4) * .143;
    const l = rand(.49, .69), r = rand(.069, .091);
    cyl(logs, r, r * .86, l, xx, yy, 0, edge, 7).rotation.x = Math.PI / 2;
    cyl(logs, r * .77, r * .77, .015, xx, yy, l / 2 + .005, 0xb88d5e, 7).rotation.x = Math.PI / 2;
  }
}
