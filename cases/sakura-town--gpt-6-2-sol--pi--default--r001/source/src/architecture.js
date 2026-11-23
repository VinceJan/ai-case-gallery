import * as THREE from 'three';

// The buildings are little stage sets: big, legible silhouettes first, then
// alternating joinery, ceramics and painted lettering at pedestrian scale.
export function makeArchitecture(outside, indoor, _kit) {
  const colliders = [];
  const innerColliders = { cafe: [], station: [] };
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const barrelGeo = new THREE.CylinderGeometry(1, 1, 1, 12);
  const potGeo = new THREE.CylinderGeometry(1, 0.71, 1, 10);
  const pebbleGeo = new THREE.IcosahedronGeometry(1, 1);
  const faceGeo = new THREE.PlaneGeometry(1, 1);
  const tileGeo = roofTileGeometry();
  const gradient = new THREE.DataTexture(new Uint8Array([91, 151, 206, 255]), 4, 1, THREE.RedFormat);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  const materials = new Map();
  const signs = new Map();
  const ink = '#293a40';
  const wood = '#755345';
  const end = '#52403b';
  const butter = '#f6e4bf';
  const warm = '#deb27f';
  const paper = '#fff1ca';
  const brass = '#cfaa62';
  const glass = '#587d83';
  const salmon = '#d77d73';

  function paint(color) {
    if (!materials.has(color)) {
      materials.set(color, new THREE.MeshToonMaterial({ color, gradientMap: gradient }));
    }
    return materials.get(color);
  }

  function piece(parent, geometry, material, x, y, z, sx, sy, sz, cast = true) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    mesh.castShadow = cast;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function box(p, x, y, z, w, h, d, c, cast) {
    return piece(p, boxGeo, paint(c), x, y, z, w, h, d, cast);
  }

  function drum(p, x, y, z, radius, h, c, cast = true, tapered = false) {
    return piece(p, tapered ? potGeo : barrelGeo, paint(c), x, y, z, radius, h, radius, cast);
  }

  function pebble(p, x, y, z, w, h, d, c) {
    return piece(p, pebbleGeo, paint(c), x, y, z, w, h, d, false);
  }

  function group(p, name, x = 0, y = 0, z = 0, yaw = 0) {
    const g = new THREE.Group();
    g.name = name;
    g.position.set(x, y, z);
    g.rotation.y = yaw;
    p.add(g);
    return g;
  }

  function obstacle(list, x, z, w, d) {
    list.push([x - w / 2, x + w / 2, z - d / 2, z + d / 2]);
  }

  // Sign sizes are in world units. Text is hand-set on reusable opaque artwork
  // (no depth sorting or transparency required for static batching).
  function print(p, x, y, z, w, h, lines, { bg = paper, fg = ink, style = 'board', accent = salmon } = {}) {
    const key = JSON.stringify([w, h, lines, bg, fg, style, accent]);
    if (!signs.has(key)) {
      const ratio = w / h;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(Math.min(768, 384 * ratio));
      canvas.height = Math.round(canvas.width / ratio);
      const ctx = canvas.getContext('2d');
      const W = canvas.width;
      const H = canvas.height;
      const u = Math.min(W, H);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      if (style === 'view') {
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#85b4be');
        sky.addColorStop(0.6, '#cee0d1');
        sky.addColorStop(1, '#f9dfab');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#f9ebc9';
        ctx.beginPath();
        ctx.arc(W * 0.72, H * 0.36, H * 0.11, 0, Math.PI * 2);
        ctx.fill();
        for (let layer = 0; layer < 3; ++layer) {
          ctx.fillStyle = ['#a0b9ad', '#709b99', '#507c7e'][layer];
          ctx.beginPath();
          ctx.moveTo(0, H);
          for (let i = 0; i <= 12; ++i) {
            ctx.lineTo(W * i / 12, H * (0.66 + 0.14 * Math.sin(i * 0.88 + layer) + layer * 0.09));
          }
          ctx.lineTo(W, H);
          ctx.fill();
        }
        for (let i = 0; i < 45; ++i) {
          ctx.fillStyle = i % 3 ? '#f0b9aa' : '#ffe1bb';
          ctx.beginPath();
          ctx.arc(W * noise(i, 70) * 0.33, H * (0.19 + noise(i, 71) * 0.48), u * (0.014 + noise(i, 72) * 0.023), 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.strokeStyle = accent;
        ctx.lineWidth = u * 0.019;
        ctx.strokeRect(u * 0.075, u * 0.075, W - u * 0.15, H - u * 0.15);
        if (style === 'stamp') {
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(W * 0.5, H * 0.27, u * 0.115, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = bg;
          ctx.beginPath();
          ctx.arc(W * 0.5, H * 0.27, u * 0.057, 0, Math.PI * 2);
          ctx.stroke();
        }
        const top = style === 'stamp' ? 0.39 : 0.11;
        const row = (0.87 - top) / lines.length;
        ctx.fillStyle = fg;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        lines.forEach((text, i) => {
          const size = H * row * (i === 0 ? 0.77 : 0.61);
          ctx.font = `${i === 0 ? 700 : 500} ${size}px "Noto Sans CJK JP", "Yu Gothic", Meiryo, sans-serif`;
          ctx.fillText(text, W / 2, H * (top + row * (i + 0.5)), W - u * 0.27);
        });
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      signs.set(key, new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
    }
    const mesh = piece(p, faceGeo, signs.get(key), x, y, z, w, h, 1, false);
    mesh.receiveShadow = false;
    return mesh;
  }

  function plaque(p, x, y, z, w, h, lines, opts) {
    box(p, x, y, z, w + 0.11, h + 0.11, 0.09, opts?.frame ?? end);
    print(p, x, y, z + 0.048, w, h, lines, opts);
  }

  function windowUnit(p, x, y, z, w, h, { frame = wood, curtain, view = false, panes = 2 } = {}) {
    const g = group(p, 'Sash window', x, y, z);
    box(g, 0, 0, 0, w + 0.18, h + 0.17, 0.10, frame);
    if (view) print(g, 0, 0, 0.054, w, h, [], { style: 'view' });
    else {
      box(g, 0, 0, 0.05, w, h, 0.035, glass, false);
      box(g, 0, h * 0.32, 0.069, w, h * 0.21, 0.008, '#82a7a6', false);
      box(g, 0, -h * 0.37, 0.069, w, h * 0.24, 0.008, '#4d6a6c', false);
    }
    for (let i = 1; i < panes; i++) box(g, (i / panes - 0.5) * w, 0, 0.088, 0.055, h, 0.065, frame);
    box(g, 0, h * 0.19, 0.088, w, 0.06, 0.065, frame);
    box(g, 0, -h / 2 - 0.055, 0.087, w + 0.28, 0.085, 0.24, frame);
    if (curtain) {
      for (const side of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
          const ch = h * (0.46 - i * 0.065);
          box(g, side * (w * 0.45 - i * w * 0.061), h / 2 - ch / 2, 0.13, w * 0.069, ch, 0.045, i % 2 ? paper : curtain, false);
        }
      }
    }
    return g;
  }

  function slidingDoor(p, x, z, width, height, frame, panel = glass) {
    box(p, x, height / 2 + 0.14, z, width + 0.19, height + 0.12, 0.16, frame);
    for (const side of [-1, 1]) {
      const at = x + side * width * 0.25;
      box(p, at, height / 2 + 0.13, z + 0.086, width * 0.47, height - 0.09, 0.025, panel, false);
      box(p, at, height * 0.74, z + 0.102, width * 0.46, height * 0.21, 0.013, '#a6bbad', false);
      box(p, at, height * 0.22, z + 0.107, width * 0.48, height * 0.32, 0.02, frame, false);
      box(p, at, height * 0.53, z + 0.11, width * 0.48, 0.057, 0.04, frame);
      box(p, x + side * width * 0.13, height * 0.45, z + 0.14, 0.04, 0.18, 0.045, brass, false);
    }
    box(p, x, 0.12, z + 0.16, width + 0.29, 0.13, 0.30, '#b4a08d');
  }

  function cladding(p, length, z, y0, height, colors) {
    const courses = Math.ceil(height / 0.25);
    for (let j = 0; j < courses; j++) {
      const yy = y0 + (j + 0.5) * height / courses;
      // Alternating board joints read as clapboard even under soft lighting.
      const seam = ((j % 3) - 1) * length * 0.13;
      const first = length / 2 + seam;
      box(p, -length / 2 + first / 2, yy, z, first - 0.012, height / courses - 0.015, 0.075, colors[j % colors.length], false);
      box(p, seam + (length - first) / 2, yy, z, length - first - 0.012, height / courses - 0.015, 0.075, colors[(j + 1) % colors.length], false);
    }
  }

  function shell(p, w, d, wallH, colors, frame, claddingHeight = wallH - 0.42) {
    box(p, 0, 0.13, 0, w + 0.17, 0.26, d + 0.12, '#a49788');
    box(p, 0, (wallH + 0.26) / 2, 0, w - 0.13, wallH - 0.26, d - 0.13, colors[0]);
    for (let i = 0; i < 4; i++) {
      const length = i % 2 ? d : w;
      const g = group(p, 'Timber elevation', [0, w / 2, 0, -w / 2][i], 0, [d / 2, 0, -d / 2, 0][i], i * Math.PI / 2);
      if (claddingHeight < wallH - 0.42) {
        box(g, 0, (claddingHeight + 0.37 + wallH) / 2, 0, length, wallH - claddingHeight - 0.37, 0.058, colors[0], false);
      }
      cladding(g, length, 0, 0.30, claddingHeight, colors);
      for (const x of [-length / 2 + 0.075, length / 2 - 0.075]) {
        box(g, x, wallH / 2 + 0.08, 0.055, 0.15, wallH - 0.16, 0.14, frame);
      }
      box(g, 0, 0.31, 0.055, length, 0.16, 0.15, frame);
      box(g, 0, wallH - 0.08, 0.055, length, 0.22, 0.17, frame);
      if (claddingHeight < wallH - 0.42) box(g, 0, claddingHeight + 0.32, 0.054, length, 0.12, 0.11, frame);
    }
  }

  function roof(p, w, d, y, rise, palette, frame, overhang = 0.42) {
    const rw = w + 2 * overhang;
    const run = d / 2 + overhang;
    const angle = Math.atan2(rise, run);
    const slope = Math.hypot(rise, run);
    const cols = Math.ceil(rw / 0.46);
    const rows = Math.ceil(slope / 0.40);
    const col = rw / cols;
    const row = slope / rows;
    const gableRise = rise * (d / 2) / run;
    const gableY = y + rise - gableRise - 0.045;
    // Fill and cap the attic so the projecting eaves don't expose a slit of sky.
    box(p, 0, (y + gableY - 0.16) / 2, 0, w - 0.015, gableY - y + 0.16, d - 0.02, palette.gable);
    const gable = triangularPrism(d, gableRise, w - 0.02);
    piece(p, gable, paint(palette.gable), 0, gableY, 0, 1, 1, 1);
    for (const side of [-1, 1]) {
      const g = group(p, 'Attic louver', side * (w / 2 + 0.018), gableY + gableRise * 0.37, 0, side * Math.PI / 2);
      const span = Math.min(1.38, d * 0.28);
      box(g, 0, 0, 0, span + 0.12, 0.42, 0.075, frame);
      for (let i = 0; i < 4; i++) box(g, 0, -0.138 + i * 0.091, 0.043, span - 0.055, 0.044, 0.040, palette.edge, false);
      box(g, 0, 0, 0.066, 0.053, 0.36, 0.034, frame, false);
    }
    for (const s of [-1, 1]) {
      const deck = box(p, 0, y + rise / 2 - 0.055, s * run / 2, rw + 0.06, 0.14, slope + 0.03, frame);
      deck.rotation.x = s * angle;
      box(p, 0, y - 0.09, s * run, rw + 0.14, 0.22, 0.13, frame);
      box(p, 0, y + 0.015, s * (run + 0.034), rw + 0.11, 0.06, 0.12, palette.edge);
      for (const x of [-rw / 2, rw / 2]) {
        const bar = box(p, x, y + rise / 2 + 0.04, s * run / 2, 0.15, 0.20, slope + 0.20, palette.edge);
        bar.rotation.x = s * angle;
        const timber = box(p, Math.sign(x) * (w / 2 + 0.02), y + rise - gableRise / 2 - 0.08, s * d / 4, 0.10, 0.14, Math.hypot(d / 2, gableRise), frame);
        timber.rotation.x = s * angle;
      }
      for (let i = 0; i <= cols; i += 2) {
        box(p, (i / cols - 0.5) * w, y - 0.16, s * (run - 0.23), 0.12, 0.13, 0.53, frame, false);
      }
      // A line of rounded ceramic nosings makes the tile courses legible at street scale.
      for (let i = 1; i < cols; ++i) {
        const offset = (rows - 1) % 2 ? -0.5 : 0;
        const nosing = drum(p, s * ((i + offset) * col - rw / 2), y + 0.068, s * (run + 0.06), 0.069, 0.085, palette.edge, false);
        nosing.rotation.x = Math.PI / 2;
      }
      for (let j = 0; j < rows; ++j) {
        const progress = (j + 0.51) / rows;
        // The alternating half-pans break up long straight seams.
        let left = -rw / 2 + 0.025;
        let i = 0;
        while (left < rw / 2 - 0.04) {
          const width = Math.min(j % 2 && i === 0 ? col / 2 : col, rw / 2 - 0.025 - left);
          const color = palette.tiles[Math.floor(noise(i + 53 * (s + 1), j) * palette.tiles.length)];
          const tile = piece(p, tileGeo, paint(color), left + width / 2, y + (1 - progress) * rise + 0.063, s * progress * run, width - 0.009, 0.13, row * 1.17, j === rows - 1);
          tile.rotation.set(s * angle, s < 0 ? Math.PI : 0, 0, 'XYZ');
          left += width;
          i++;
        }
      }
    }
    for (let i = 0; i < cols; ++i) {
      const crest = drum(p, (i + 0.5 - cols / 2) * col, y + rise + 0.12, 0, 0.145, col + 0.018, i % 3 ? palette.edge : palette.tiles[1]);
      crest.rotation.z = Math.PI / 2;
    }
    for (const x of [-rw / 2, rw / 2]) {
      const cap = drum(p, x, y + rise + 0.14, 0, 0.20, 0.14, palette.edge);
      cap.rotation.z = Math.PI / 2;
      const medallion = drum(p, x + Math.sign(x) * 0.075, y + rise + 0.14, 0, 0.079, 0.018, palette.tiles[1], false);
      medallion.rotation.z = Math.PI / 2;
    }
  }

  // The offset runs along the bracket back from the hook to the mounting wall.
  function lantern(p, x, y, z, color = '#e68e71', h = 0.53, dx = 0, dz = -0.36) {
    const radius = h * 0.37;
    const bracketY = y + h * 0.85;
    box(p, x + dx, bracketY, z + dz, 0.105, 0.24, 0.105, end, false);
    box(p, x + dx / 2, bracketY, z + dz / 2, Math.abs(dx) + 0.06, 0.062, Math.abs(dz) + 0.06, wood, false);
    box(p, x, y + h * 0.66, z, 0.036, h * 0.45, 0.036, end, false);
    pebble(p, x, y, z, radius, h * 0.49, radius, color);
    for (let i = -2; i <= 2; ++i) drum(p, x, y + i * h * 0.16, z, radius * (1.01 - 0.051 * i * i), 0.015, color === paper ? '#d4b989' : '#c26b59', false);
    for (const s of [-1, 1]) drum(p, x, y + s * h * 0.45, z, radius * 0.56, 0.052, end, false);
  }

  function planter(p, x, z, w, depth, style = 'flowers') {
    box(p, x, 0.16, z, w, 0.28, depth, '#927661');
    box(p, x, 0.30, z, w + 0.09, 0.10, depth + 0.07, '#bc997b');
    box(p, x, 0.355, z, w - 0.09, 0.026, depth - 0.085, '#61504b', false);
    const n = Math.max(3, Math.round(w / 0.23));
    for (let i = 0; i < n; i++) {
      const px = x + (i / (n - 1) - 0.5) * (w - 0.15);
      const pz = z + (noise(i, 201) - 0.5) * depth * 0.51;
      const y = 0.45 + noise(i, 202) * 0.10;
      pebble(p, px, y, pz, 0.17, 0.15, 0.15, ['#677f61', '#859466', '#4f775f'][i % 3]);
      if (style === 'flowers') {
        for (let j = 0; j < 3; ++j) pebble(p, px + (j - 1) * 0.067, y + 0.12 + noise(i, j) * 0.07, pz + (j % 2 ? 0.062 : 0), 0.067, 0.06, 0.064, ['#f2b8b6', '#f4d58d', '#ccaed3', '#f4dfcb'][(i + j) % 4]);
      }
    }
  }

  function fence(p, x, z, length, yaw = 0, c = '#9a7961') {
    const g = group(p, 'Garden fence', x, 0, z, yaw);
    const posts = Math.ceil(length / 0.37);
    for (let i = 0; i <= posts; ++i) {
      const a = (i / posts - 0.5) * length;
      const tall = i % 4 === 0 || i === posts;
      box(g, a, tall ? 0.47 : 0.40, 0, tall ? 0.13 : 0.085, tall ? 0.94 : 0.80, tall ? 0.14 : 0.08, c);
      if (tall) box(g, a, 0.95, 0, 0.17, 0.065, 0.17, wood);
    }
    for (const y of [0.26, 0.65]) box(g, 0, y, -0.04, length, 0.075, 0.10, c);
  }

  function vending(p, x, z, color, yaw = 0) {
    const g = group(p, 'Drinks vending machine', x, 0, z, yaw);
    box(g, 0, 0.095, 0, 0.87, 0.19, 0.63, ink);
    box(g, 0, 1.01, 0, 0.90, 1.76, 0.66, color);
    box(g, 0, 1.28, 0.337, 0.72, 0.86, 0.059, '#e1e1c9');
    for (let r = 0; r < 3; r++) {
      const y = 1.02 + r * 0.24;
      box(g, 0, y - 0.099, 0.377, 0.69, 0.032, 0.043, '#829599', false);
      for (let i = 0; i < 6; i++) {
        const c = ['#d99280', '#88ab93', '#d5b670', '#adabc6', '#6a96a4', '#f0e4af'][(i + r * 3) % 6];
        const a = (i - 2.5) * 0.104;
        drum(g, a, y, 0.385, 0.031, 0.125, c, false);
        drum(g, a, y + 0.068, 0.385, 0.022, 0.019, paper, false);
      }
    }
    print(g, 0, 1.78, 0.335, 0.70, 0.12, ['冷たい飲みもの  •  DRINKS'], { bg: color, fg: paper, accent: paper });
    box(g, -0.11, 0.38, 0.34, 0.48, 0.24, 0.055, '#455259', false);
    box(g, -0.11, 0.31, 0.38, 0.44, 0.045, 0.045, '#778080', false);
    box(g, 0.29, 0.69, 0.35, 0.10, 0.18, 0.052, ink, false);
    box(g, 0.29, 0.72, 0.381, 0.057, 0.025, 0.013, '#acd192', false);
    return g;
  }

  function crate(p, x, y, z, c = '#aa805c') {
    box(p, x, y + 0.15, z, 0.53, 0.30, 0.38, wood);
    for (let i = 0; i < 3; i++) box(p, x, y + 0.054 + 0.097 * i, z + 0.196, 0.55, 0.082, 0.026, c, false);
    for (const s of [-1, 1]) box(p, x + s * 0.22, y + 0.15, z + 0.214, 0.06, 0.31, 0.022, warm, false);
  }

  const tealRoof = { tiles: ['#496a73', '#4d7078', '#507378', '#53777c', '#56797e', '#4b6d73'], edge: '#344d56', gable: '#ded2b3' };
  const railRoof = { tiles: ['#705f6a', '#76646f', '#796970', '#7d6d75', '#74646c'], edge: '#524651', gable: '#e2cead' };
  const houseRoofs = [
    { tiles: ['#6c666e', '#7e737c', '#84777b', '#736975'], edge: '#504a57', gable: '#d6beaa' },
    { tiles: ['#826259', '#9e7965', '#a77f6b', '#936e64'], edge: '#684d4d', gable: '#e0c4a7' },
    { tiles: ['#5c747a', '#697f84', '#75898d', '#657b82'], edge: '#485960', gable: '#d2d0bd' },
  ];

  // Harukaze: deep glazed shopfront, long eaves, salmon-colored split noren.
  const cafe = group(outside, '春风茶屋 · Harukaze', -8, 0, 0);
  shell(cafe, 9.2, 6, 3.47, ['#f3dfb6', '#ead3aa', '#f6e5bf', '#e9cda0'], wood);
  roof(cafe, 9.2, 6, 3.48, 1.73, tealRoof, end, 0.48);
  obstacle(colliders, -8, 0, 9.32, 6.10);
  slidingDoor(cafe, 1, 3.075, 1.66, 2.43, end);
  windowUnit(cafe, -2.39, 1.69, 3.055, 3.20, 1.52, { curtain: '#efdfa9', panes: 4 });
  windowUnit(cafe, 3.15, 1.68, 3.055, 1.69, 1.51, { curtain: '#efdfa9', panes: 3 });
  const cafeSide = group(cafe, 'East facade', 4.655, 0, 0, Math.PI / 2);
  windowUnit(cafeSide, -1.19, 1.74, 0.02, 2.02, 1.54, { curtain: '#ead9a5', panes: 3 });
  windowUnit(cafeSide, 1.31, 1.78, 0.02, 1.43, 1.24, { frame: end });
  for (const x of [-4.34, -0.46, 2.25, 4.42]) box(cafe, x, 1.63, 3.11, 0.13, 2.58, 0.14, wood);
  for (const x of [-2.4, 3.13]) {
    box(cafe, x, 0.68, 3.08, x < 0 ? 3.31 : 1.73, 0.51, 0.14, '#53817d');
    for (let j = -2; j <= 2; ++j) box(cafe, x + j * (x < 0 ? 0.61 : 0.30), 0.68, 3.16, 0.046, 0.46, 0.054, '#6f9a8b', false);
  }
  plaque(cafe, -1.49, 2.97, 3.15, 3.77, 0.61, ['はるかぜ茶屋', '春风茶屋   /   HARUKAZE TEA HOUSE'], { bg: '#37595b', fg: paper, accent: brass });
  box(cafe, 1, 2.60, 3.29, 1.98, 0.056, 0.065, '#4c3933');
  for (let i = 0; i < 4; i++) {
    const x = 1 + (i - 1.5) * 0.46;
    box(cafe, x, 2.30 - (i % 2) * 0.025, 3.29, 0.432, 0.55 + (i % 2) * 0.05, 0.048, i % 2 ? '#d98c80' : salmon);
    box(cafe, x, 2.045 - (i % 2) * 0.05, 3.32, 0.42, 0.027, 0.026, '#ba6665', false);
    print(cafe, x, 2.31, 3.318, 0.32, 0.32, [['春', '風', '茶', '屋'][i]], { bg: i % 2 ? '#d98c80' : salmon, fg: '#fff2d0', accent: '#dc9588' });
  }
  lantern(cafe, -0.35, 2.73, 3.33);
  lantern(cafe, 3.99, 2.72, 3.32, paper);
  planter(cafe, -2.8, 3.41, 1.92, 0.41);
  obstacle(colliders, -10.8, 3.41, 2.01, 0.48);
  planter(cafe, 3.15, 3.41, 1.26, 0.38, 'leaves');
  obstacle(colliders, -4.85, 3.41, 1.35, 0.45);
  const mail = group(cafe, 'Vermilion post box', 5.24, 0, 1.88, -0.08);
  drum(mail, 0, 0.10, 0, 0.26, 0.18, '#77716a');
  drum(mail, 0, 0.48, 0, 0.09, 0.80, '#954e4d');
  box(mail, 0, 1.02, 0, 0.49, 0.46, 0.37, '#bc544d');
  box(mail, 0, 1.26, 0, 0.53, 0.07, 0.40, '#dc7560');
  box(mail, 0, 1.117, 0.193, 0.32, 0.052, 0.023, '#553c3b', false);
  print(mail, 0, 0.96, 0.198, 0.29, 0.20, ['〒', 'POST'], { bg: '#bc544d', fg: paper, accent: '#d67e66' });
  obstacle(colliders, -2.76, 1.88, 0.55, 0.55);
  const board = group(cafe, 'Daily specials', -1.06, 0, 3.64, -0.16);
  for (const s of [-1, 1]) {
    box(board, s * 0.32, 0.44, 0.02, 0.064, 0.88, 0.06, wood);
    const leg = box(board, s * 0.32, 0.44, -0.171, 0.063, 0.90, 0.065, wood);
    leg.rotation.x = 0.32;
  }
  plaque(board, 0, 0.55, 0.04, 0.58, 0.56, ['本日の甘味', '桜もち', '抹茶  •  MATCHA'], { bg: '#3f5454', fg: paper, accent: '#c3a676' });
  obstacle(colliders, -9.06, 3.54, 0.75, 0.56);
  crate(cafe, -4.96, 0, 2.12);
  crate(cafe, -4.96, 0.30, 2.13, '#bc9674');
  obstacle(colliders, -12.96, 2.12, 0.60, 0.45);

  // The sill meets the raised platform, while the stone base and walls sit
  // behind its rear edge. The asymmetrical facade keeps the entry at x = 8.
  const station = group(outside, '桜ヶ丘駅 · Sakuragaoka', 8.74, 0.41, -20.39);
  const stationGreen = '#557777';
  box(station, 0, -0.205, 0, 9.31, 0.41, 5.74, '#8e877b');
  shell(station, 9.25, 5.70, 3.62, ['#efe1c3', '#d9d3b7', '#c3cbb2', '#d4d5bc'], stationGreen, 0.96);
  roof(station, 9.25, 5.70, 3.64, 1.64, railRoof, '#4a484a', 0.45);
  obstacle(colliders, 8.74, -20.39, 9.42, 5.82);
  slidingDoor(station, -0.74, 2.925, 2.20, 2.42, stationGreen);
  const wings = [[-3.25, 2.08], [2.70, 2.71]];
  for (const [x, w] of wings) windowUnit(station, x, 1.77, 2.895, w, 1.48, { frame: stationGreen, panes: 4 });
  for (const x of [-4.47, -2.02, 0.79, 1.19, 4.34]) box(station, x, 1.84, 2.93, 0.13, 2.96, 0.14, stationGreen);
  const stationSide = group(station, 'East station elevation', 4.68, 0, 0, Math.PI / 2);
  for (const x of [-1.43, 1.43]) windowUnit(stationSide, x, 1.83, 0, 1.62, 1.38, { frame: stationGreen, panes: 3 });
  plaque(station, -0.74, 3.04, 2.99, 3.11, 0.60, ['桜ヶ丘駅', 'SAKURAGAOKA STATION'], { bg: '#e8e1c9', fg: '#36535a', accent: '#9e756d' });
  plaque(station, -3.30, 2.99, 2.98, 1.64, 0.27, ['きっぷうりば   /   TICKETS'], { bg: '#597879', fg: paper, accent: '#a7b6a0' });
  plaque(station, 2.71, 2.99, 2.98, 2.14, 0.27, ['待合室   /   WAITING ROOM'], { bg: '#597879', fg: paper, accent: '#a7b6a0' });
  for (const x of [-2.07, 0.60]) lantern(station, x, 2.55, 3.05, paper, 0.37, 0, -0.20);
  vending(outside, 13.08, -24.15, '#719b9b', Math.PI / 2);
  obstacle(colliders, 13.08, -24.15, 0.72, 0.95);
  planter(outside, 12.20, -24.09, 0.82, 0.55, 'leaves');
  obstacle(colliders, 12.20, -24.09, 0.91, 0.62);

  function home({ x, z, w, d, h, palette, title, shop = false }) {
    const g = group(outside, title, x, 0, z);
    const blends = [
      ['#d5c3ad', '#c3a994', '#dccbb3'],
      ['#e6ceb0', '#d9bd9d', '#efdbbc'],
      ['#c9cfb8', '#b6c5b2', '#d5d8c1'],
    ][palette];
    const trim = ['#725c56', '#886356', '#64766e'][palette];
    shell(g, w, d, h, blends, trim, shop ? h - 0.42 : 1.04);
    roof(g, w, d, h + 0.025, d * 0.245 + 0.22, houseRoofs[palette], trim, 0.31);
    obstacle(colliders, x, z, w + 0.16, d + 0.12);
    slidingDoor(g, -w * 0.27, d / 2 + 0.075, 0.94, h * 0.77, trim);
    windowUnit(g, w * 0.19, h * 0.58, d / 2 + 0.056, w * 0.39, h * 0.41, { frame: trim, curtain: shop ? paper : undefined, panes: 3 });
    const side = group(g, 'Side windows', w / 2 + 0.053, 0, 0, Math.PI / 2);
    windowUnit(side, -d * 0.17, h * 0.58, 0, d * 0.38, h * 0.39, { frame: trim });
    windowUnit(side, d * 0.27, h * 0.61, 0, d * 0.23, h * 0.31, { frame: trim });
    box(side, d * 0.23, 0.62, 0.086, 0.59, 0.43, 0.24, '#b6b4a5');
    for (let i = 0; i < 4; i++) box(side, d * 0.23, 0.49 + i * 0.078, 0.211, 0.44, 0.019, 0.017, '#858e82', false);
    if (shop) {
      plaque(g, w * 0.18, h - 0.37, d / 2 + 0.129, w * 0.46, 0.31, [title], { bg: trim, fg: paper, accent: warm });
      lantern(g, -w * 0.42, h - 0.34, d / 2 + 0.22, paper, 0.36);
    } else {
      plaque(g, -w * 0.45, h * 0.60, d / 2 + 0.08, 0.19, 0.29, ['山', '本'], { bg: blends[0], fg: end, accent: trim });
    }
    const px = w * 0.22;
    const pz = d / 2 + 0.25;
    planter(g, px, pz, w * 0.34, 0.37, shop ? 'flowers' : 'leaves');
    obstacle(colliders, x + px, z + pz, w * 0.34 + 0.09, 0.44);
    return g;
  }

  const florist = home({ x: -18, z: -6, w: 5.0, d: 3.95, h: 2.78, palette: 0, title: '花と暮らし', shop: true });
  planter(florist, -1.67, 2.41, 1.04, 0.45);
  obstacle(colliders, -19.67, -3.59, 1.13, 0.52);
  const ceramics = home({ x: -20, z: 1.13, w: 4.60, d: 2.44, h: 2.57, palette: 1, title: '小さな陶器店', shop: true });
  for (let i = 0; i < 3; i++) drum(ceramics, -1.98 + 0.19 * i, 0.17, 1.49, 0.092, 0.31, ['#8f9b8f', '#cf9e80', '#b6a799'][i], true, true);
  obstacle(colliders, -21.79, 2.62, 0.57, 0.21);
  const eastHouse = home({ x: 9, z: -2, w: 5.56, d: 4.16, h: 2.90, palette: 2, title: 'East garden house' });
  fence(eastHouse, 3.28, 0.04, 3.74, Math.PI / 2);
  obstacle(colliders, 12.28, -1.96, 0.18, 3.91);
  planter(eastHouse, 3.77, 1.01, 0.56, 1.11);
  obstacle(colliders, 12.77, -0.99, 0.65, 1.18);
  const northHouse = home({ x: -9, z: -23, w: 5.83, d: 4.58, h: 2.93, palette: 1, title: 'North cottage' });
  fence(northHouse, -3.42, 0.05, 4.33, Math.PI / 2);
  obstacle(colliders, -12.42, -22.95, 0.18, 4.50);
  const southHouse = home({ x: -12, z: 21, w: 5.74, d: 3.82, h: 2.76, palette: 0, title: '風見商店', shop: true });
  vending(southHouse, 3.42, 1.18, '#ad6d65', 0.15);
  obstacle(colliders, -8.58, 22.37, 1.0, 0.90);

  function room(name, wall, frame, base, floorColors, plank) {
    const g = group(indoor, name);
    const w = 12;
    const d = 9;
    box(g, 0, -0.16, 0, w + 0.06, 0.24, d + 0.06, base, false);
    const cols = plank ? 6 : 15;
    const rows = plank ? 27 : 11;
    const cw = w / cols;
    const cd = d / rows;
    for (let j = 0; j < rows; j++) {
      const offset = plank && j % 3 ? (j % 3) * cw / 3 : 0;
      for (let i = -1; i < cols; i++) {
        const a = Math.max(-w / 2, i * cw - w / 2 + offset);
        const b = Math.min(w / 2, (i + 1) * cw - w / 2 + offset);
        if (b - a <= 0.025) continue;
        const c = floorColors[Math.floor(noise(i + 36, j + 57) * floorColors.length)];
        box(g, (a + b) / 2, -0.021, (j + 0.5) * cd - d / 2, b - a - 0.014, 0.042, cd - 0.014, c, false);
      }
    }
    const back = group(g, 'Back wall', 0, 0, -4.43);
    const left = group(g, 'Left wall', -5.93, 0, 0, Math.PI / 2);
    for (const [surface, len] of [[back, w], [left, d]]) {
      box(surface, 0, 1.57, -0.04, len, 3.14, 0.20, wall, false);
      cladding(surface, len, 0.074, 0.09, 0.95, [frame, base, frame]);
      box(surface, 0, 0.08, 0.13, len, 0.16, 0.10, base);
      box(surface, 0, 1.06, 0.13, len, 0.10, 0.125, frame);
      box(surface, 0, 3.13, 0.01, len + 0.05, 0.17, 0.30, frame);
      box(surface, 0, 2.95, 0.072, len, 0.065, 0.07, frame);
      for (const x of [-len / 2 + 0.08, len / 2 - 0.08]) box(surface, x, 1.60, 0.092, 0.15, 3.06, 0.14, frame);
    }
    // Keep the exit visible without adding a third wall to the cutaway.
    box(g, 0, 0.015, 3.90, 1.78, 0.03, 0.86, frame, false);
    for (let i = 0; i < 8; i++) box(g, 0, 0.035, 3.54 + i * 0.10, 1.55, 0.014, 0.016, '#b9a581', false);
    print(g, 0, 0.044, 4.05, 1.02, 0.25, ['出口   /   EXIT'], { bg: base, fg: paper, accent: warm }).rotation.x = -Math.PI / 2;
    return { g, back, left };
  }

  function shelf(p, x, z, w, depth, frame) {
    for (const s of [-1, 1]) box(p, x + s * (w / 2 - 0.04), 0.69, z, 0.08, 1.38, depth, frame);
    for (const y of [0.13, 0.69, 1.33]) box(p, x, y, z, w, 0.09, depth, frame);
  }

  function crock(p, x, y, z, c = paper, radius = 0.10) {
    drum(p, x, y + 0.071, z, radius, 0.142, c, false, true);
    drum(p, x, y + 0.144, z, radius * 0.89, 0.013, '#514440', false);
    drum(p, x, y + 0.012, z, radius * 1.25, 0.025, c, false);
  }

  function plantPot(p, x, y, z, scale = 1) {
    drum(p, x, y + 0.154 * scale, z, 0.24 * scale, 0.30 * scale, '#bf896f', true, true);
    drum(p, x, y + 0.296 * scale, z, 0.253 * scale, 0.075 * scale, '#d6a082');
    drum(p, x, y + 0.336 * scale, z, 0.206 * scale, 0.012 * scale, end, false);
    for (let i = 0; i < 8; ++i) {
      const angle = i * 2.4;
      const len = (0.13 + 0.19 * noise(i, 11)) * scale;
      const leaf = pebble(p, x + Math.cos(angle) * len, y + (0.43 + noise(i, 12) * 0.38) * scale, z + Math.sin(angle) * len, 0.19 * scale, 0.12 * scale, 0.11 * scale, ['#7d9166', '#5a7f6a', '#91a471'][i % 3]);
      leaf.rotation.set(0, -angle, 0.53);
    }
  }

  function counter(p, x, z, w, d, base, top) {
    box(p, x, 0.48, z, w - 0.13, 0.91, d - 0.10, base);
    box(p, x, 0.085, z, w - 0.24, 0.17, d - 0.14, end);
    const slats = Math.round(w / 0.17);
    for (let i = 0; i < slats; i++) box(p, x + ((i + 0.5) / slats - 0.5) * (w - 0.20), 0.48, z + d / 2 - 0.033, 0.105, 0.66, 0.035, base, false);
    box(p, x, 0.95, z, w, 0.12, d, top);
  }

  function cafeChair(p, x, z, yaw, seat) {
    const g = group(p, 'Dining chair', x, 0, z, yaw);
    for (const i of [-1, 1]) for (const s of [-1, 1]) box(g, i * 0.19, s < 0 ? 0.42 : 0.22, s * 0.17, 0.062, s < 0 ? 0.84 : 0.44, 0.057, wood);
    box(g, 0, 0.44, 0, 0.48, 0.083, 0.46, wood);
    box(g, 0, 0.49, 0.016, 0.42, 0.055, 0.37, seat);
    for (const y of [0.66, 0.81]) box(g, 0, y, -0.169, 0.44, 0.066, 0.061, wood);
  }

  function teaTable(g, x, z, seat) {
    drum(g, x, 0.06, z, 0.29, 0.12, end);
    drum(g, x, 0.43, z, 0.083, 0.73, wood);
    drum(g, x, 0.80, z, 0.61, 0.105, '#b28660');
    drum(g, x, 0.855, z, 0.585, 0.018, '#d0a77a');
    cafeChair(g, x - 0.87, z, -Math.PI / 2, seat);
    cafeChair(g, x + 0.87, z, Math.PI / 2, seat);
    crock(g, x + 0.24, 0.866, z - 0.08, '#759b8f', 0.082);
    crock(g, x - 0.24, 0.866, z + 0.06, paper, 0.082);
    drum(g, x, 0.876, z + 0.22, 0.145, 0.02, '#dfdbc0', false);
    pebble(g, x, 0.923, z + 0.22, 0.085, 0.05, 0.063, '#de9b9e');
    obstacle(innerColliders.cafe, x, z, 2.31, 1.23);
  }

  const tea = room('cafe', '#efd9ad', '#82604b', '#9c775a', ['#c39469', '#bc8e63', '#d0a478', '#cb9c70', '#be956e'], true);
  const tg = tea.g;
  windowUnit(tea.left, 1.02, 1.98, 0.112, 2.48, 1.54, { view: true, curtain: '#e5a28c', panes: 3 });
  windowUnit(tea.back, 3.61, 1.95, 0.113, 3.27, 1.52, { view: true, curtain: '#e3a395', panes: 4 });
  plaque(tea.back, -2.20, 2.13, 0.128, 3.40, 1.10, ['はるかぜ茶屋', '抹茶   /   玄米茶   /   ほうじ茶', '桜もち    •    季節の和菓子'], { bg: '#3e5b56', fg: '#ffedbf', accent: '#bd9875' });
  plaque(tea.left, -1.10, 2.12, 0.12, 0.79, 1.04, ['春風', '花より', '団子'], { style: 'stamp', bg: '#efdabe', accent: '#c67b71' });
  const teaCounter = group(tg, 'Tea and sweets counter', 0, 0, -0.33);
  counter(teaCounter, -2.43, -3.30, 4.63, 1.04, '#64877d', '#c9a37a');
  obstacle(innerColliders.cafe, -2.43, -3.73, 4.63, 1.24);
  // Pastry cabinet: reflective bands and an open-front framed display keep the
  // buns legible in the cutaway without alpha-blended panes.
  box(teaCounter, -3.37, 1.13, -3.24, 1.76, 0.20, 0.74, '#9d7960');
  box(teaCounter, -3.37, 1.71, -3.27, 1.76, 0.068, 0.68, wood);
  for (const x of [-4.21, -2.53]) for (const z of [-3.60, -2.94]) box(teaCounter, x, 1.43, z, 0.046, 0.57, 0.046, '#bd9e78');
  box(teaCounter, -3.37, 1.46, -3.62, 1.64, 0.46, 0.035, '#799a96', false);
  for (const y of [1.22, 1.45]) {
    box(teaCounter, -3.37, y, -3.27, 1.65, 0.034, 0.61, '#c9c9b4', false);
    for (let i = 0; i < 6; i++) {
      const x = -4.0 + i * 0.247;
      drum(teaCounter, x, y + 0.024, -3.16, 0.097, 0.024, paper, false);
      pebble(teaCounter, x, y + 0.082, -3.16, 0.083, 0.063, 0.057, [salmon, '#d6b473', '#96a578'][i % 3]);
    }
  }
  const kettle = pebble(teaCounter, -1.58, 1.25, -3.40, 0.24, 0.22, 0.24, '#53696b');
  kettle.castShadow = true;
  drum(teaCounter, -1.58, 1.44, -3.40, 0.13, 0.063, ink);
  drum(teaCounter, -1.58, 1.49, -3.40, 0.042, 0.069, wood);
  box(teaCounter, -1.84, 1.27, -3.40, 0.21, 0.072, 0.071, '#53696b').rotation.z = -0.56;
  box(teaCounter, -1.29, 1.30, -3.41, 0.097, 0.15, 0.06, wood).rotation.z = 0.35;
  for (let i = 0; i < 3; i++) crock(teaCounter, -0.92 + i * 0.25, 1.014, -3.20, i % 2 ? '#a4b694' : paper, 0.083);
  const bento = group(teaCounter, 'Cloth-wrapped lunch', -2.17, 1.015, -3.05, -0.22);
  box(bento, 0, 0.067, 0, 0.4, 0.134, 0.29, salmon);
  box(bento, 0, 0.133, 0, 0.40, 0.022, 0.088, '#f0c6ac', false);
  box(bento, 0, 0.139, 0, 0.092, 0.022, 0.29, '#f0c6ac', false);
  pebble(bento, 0, 0.168, 0, 0.103, 0.047, 0.054, '#e5a995');
  shelf(tg, 3.6, -3.90, 3.20, 0.62, wood);
  obstacle(innerColliders.cafe, 3.6, -3.90, 3.20, 0.62);
  for (let i = 0; i < 7; i++) {
    const x = 2.38 + i * 0.38;
    const c = ['#8a9e86', '#c98979', '#d6b988', '#6d8b88'][i % 4];
    drum(tg, x, 0.89, -3.87, 0.135, 0.31, c);
    drum(tg, x, 1.052, -3.87, 0.139, 0.041, end, false);
    box(tg, x, 0.89, -3.736, 0.111, 0.087, 0.012, paper, false);
    crock(tg, x, 1.38, -3.86, c, 0.095);
  }
  plantPot(tg, 5.31, 0, -3.81, 0.95);
  obstacle(innerColliders.cafe, 5.31, -3.81, 0.57, 0.55);
  plantPot(tg, -5.37, 0, 2.62, 1.17);
  obstacle(innerColliders.cafe, -5.37, 2.62, 0.73, 0.70);
  teaTable(tg, -3.31, 0.71, '#b77970');
  teaTable(tg, 2.90, -0.83, '#779d90');
  teaTable(tg, 3.56, 2.05, '#b77970');
  lantern(tg, -4.34, 2.43, -3.97, paper, 0.54, 0, -0.43);
  lantern(tg, 1.03, 2.55, -3.96, '#e8a18c', 0.56, 0, -0.43);
  lantern(tg, -5.46, 2.23, 2.77, paper, 0.57, -0.43, 0);

  function bench(p, x, z, length, yaw, c) {
    const g = group(p, 'Waiting bench', x, 0, z, yaw);
    for (const s of [-1, 1]) {
      const a = s * (length / 2 - 0.18);
      box(g, a, 0.23, 0.16, 0.11, 0.46, 0.11, ink);
      box(g, a, 0.46, -0.27, 0.11, 0.92, 0.11, ink);
    }
    for (let j = 0; j < 4; j++) box(g, 0, 0.46, j * 0.14 - 0.214, length, 0.11, 0.127, c);
    for (const y of [0.68, 0.86]) box(g, 0, y, -0.29, length, 0.144, 0.074, c);
    return g;
  }

  function ticketMachine(p, x, z, c) {
    box(p, x, 0.91, z, 0.70, 1.76, 0.54, c);
    box(p, x, 0.07, z, 0.75, 0.14, 0.59, ink);
    print(p, x, 1.60, z + 0.276, 0.55, 0.21, ['きっぷ'], { bg: '#e8e1c7', fg: ink, accent: c });
    box(p, x, 1.29, z + 0.275, 0.44, 0.27, 0.05, '#40585b', false);
    box(p, x, 1.30, z + 0.303, 0.36, 0.18, 0.013, '#99bcb1', false);
    for (let i = -1; i <= 1; i++) box(p, x + i * 0.1, 1.08, z + 0.287, 0.062, 0.049, 0.017, paper, false);
    box(p, x + 0.11, 0.87, z + 0.285, 0.16, 0.055, 0.028, ink, false);
    box(p, x, 0.62, z + 0.279, 0.37, 0.103, 0.033, '#495858', false);
  }

  const waiting = room('station', '#e8dfc2', '#66847f', '#5b6e69', ['#cec7b0', '#d8cfb6', '#d3cbb9', '#bfc4b5', '#ddd3bb'], false);
  const sg = waiting.g;
  windowUnit(waiting.left, 0.61, 2.02, 0.113, 2.89, 1.45, { view: true, frame: stationGreen, panes: 4 });
  windowUnit(waiting.back, 4.31, 2.05, 0.115, 2.31, 1.46, { frame: stationGreen, view: true, panes: 3 });
  plaque(waiting.back, 0.78, 2.80, 0.123, 3.58, 0.36, ['桜ヶ丘駅   /   SAKURAGAOKA'], { bg: '#4c6b6d', fg: paper, accent: '#adc0aa' });
  plaque(waiting.back, -3.69, 2.38, 0.122, 2.70, 0.62, ['のりば案内    /    PLATFORM', '①  桜並木   ━━   桜ヶ丘   ━━   川辺  ②'], { bg: '#f2e8c9', accent: '#8b9e84' });
  plaque(waiting.left, -1.80, 2.02, 0.126, 1.30, 1.13, ['時刻表', '08    12   34   52', '09    16   38   59', '10    18   37   51'], { bg: '#eee3bf', accent: '#819783' });
  plaque(waiting.left, 2.90, 2.10, 0.125, 1.03, 1.31, ['桜まつり', '春の旅', 'SAKURA LINE'], { style: 'stamp', bg: '#eddaca', accent: '#cc8a83' });
  // Slim ticket ledge leaves room for the station master to stand behind it.
  counter(sg, 1.02, -2.57, 3.25, 0.34, stationGreen, '#af9272');
  obstacle(innerColliders.station, 1.02, -2.57, 3.25, 0.34);
  plaque(sg, 1.04, 0.59, -2.356, 1.72, 0.34, ['駅務室   /   INFORMATION'], { bg: '#e0d8b8', fg: '#486461', accent: '#a88b70', frame: '#456460' });
  windowUnit(waiting.back, 0.78, 1.94, 0.115, 2.78, 1.18, { frame: stationGreen, panes: 3 });
  box(sg, 2.12, 1.11, -2.58, 0.41, 0.18, 0.28, ink);
  box(sg, 2.12, 1.21, -2.58, 0.31, 0.04, 0.21, '#899f94', false).rotation.x = -0.18;
  box(sg, 0.20, 1.038, -2.58, 0.32, 0.035, 0.23, paper, false);
  box(sg, 0.22, 1.063, -2.56, 0.23, 0.026, 0.17, '#b6a88a', false);
  lantern(sg, 2.43, 2.49, -3.97, paper, 0.47, 0, -0.43);
  for (const x of [-4.49, -3.59]) {
    ticketMachine(sg, x, -3.87, x < -4 ? '#7a9b91' : '#b58479');
    obstacle(innerColliders.station, x, -3.87, 0.76, 0.59);
  }
  // Round station clock, with modelled hands and hour marks.
  const clock = group(sg, 'Station clock', -1.63, 2.21, -4.22);
  drum(clock, 0, 0, 0, 0.37, 0.12, ink).rotation.x = Math.PI / 2;
  drum(clock, 0, 0, 0.07, 0.318, 0.024, '#f4e7bf', false).rotation.x = Math.PI / 2;
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    box(clock, 0.266 * Math.sin(a), 0.266 * Math.cos(a), 0.085, 0.017, i % 3 ? 0.022 : 0.043, 0.012, ink, false).rotation.z = -a;
  }
  box(clock, -0.051, 0.034, 0.09, 0.124, 0.024, 0.013, ink, false).rotation.z = -0.55;
  box(clock, 0.076, 0.069, 0.10, 0.207, 0.016, 0.013, '#a5655f', false).rotation.z = 0.73;
  bench(sg, -5.30, 0.57, 2.92, Math.PI / 2, '#ae8c6e');
  obstacle(innerColliders.station, -5.30, 0.57, 0.63, 2.92);
  bench(sg, 4.36, -3.68, 2.40, 0, '#ae8c6e');
  obstacle(innerColliders.station, 4.36, -3.68, 2.40, 0.63);
  bench(sg, 3.51, 1.77, 2.46, -0.09, '#7c9689');
  obstacle(innerColliders.station, 3.51, 1.77, 2.54, 0.84);
  plantPot(sg, -5.36, 0, 3.02, 1.02);
  obstacle(innerColliders.station, -5.36, 3.02, 0.64, 0.64);
  vending(sg, 5.14, -1.41, '#b98176', 0.19);
  obstacle(innerColliders.station, 5.14, -1.41, 1.04, 0.88);
  drum(sg, 4.66, 0.32, -0.47, 0.24, 0.64, '#87a297', true, true);
  drum(sg, 4.66, 0.643, -0.47, 0.222, 0.028, ink, false);
  obstacle(innerColliders.station, 4.66, -0.47, 0.48, 0.48);
  for (let i = 0; i < 3; i++) {
    const x = 4.54 + 0.105 * i;
    box(sg, x, 0.76, -0.47, 0.031, 0.71, 0.03, ['#bd7770', '#e0ad75', '#496d70'][i]).rotation.z = (i - 1) * 0.16;
    box(sg, x - (i - 1) * 0.051, 1.10, -0.47, 0.082, 0.04, 0.034, end);
  }
  for (let i = 0; i < 7; i++) box(sg, -2.94 + i * 0.98, 0.007, 3.14, 0.64, 0.014, 0.075, '#c3a871', false);

  tea.g.visible = false;
  waiting.g.visible = false;
  return { colliders, innerColliders };
}

function noise(a, b) {
  const n = Math.sin(a * 91.716 + b * 37.651 + 5.8) * 43758.5453;
  return n - Math.floor(n);
}

function indexedShape(vertices, indices, uv) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

function roofTileGeometry() {
  const vertices = [];
  const uv = [];
  const indices = [];
  // Recessed pan, rolled shoulder and a turned-down open eave lip.
  const profile = [0.72, 0.90, 0.55, 0.28, 0.24, 0.29, 0.48, 0.68, 0.72];
  for (const [z, y] of [[-0.50, -0.04], [0.37, 0.20], [0.49, 0.14], [0.51, -0.20]]) {
    profile.forEach((height, i) => {
      const a = i / (profile.length - 1);
      vertices.push(a - 0.5, height + y, z);
      uv.push(a, z + 0.5);
    });
  }
  const stride = profile.length;
  for (let j = 0; j < 3; ++j) for (let i = 0; i < stride - 1; ++i) {
    const a = j * stride + i;
    indices.push(a, a + stride, a + 1, a + 1, a + stride, a + stride + 1);
  }
  return indexedShape(vertices, indices, uv);
}

function triangularPrism(d, h, w) {
  const v = [];
  const uv = [];
  const ind = [];
  const a = [-w / 2, 0, -d / 2];
  const b = [-w / 2, 0, d / 2];
  const c = [-w / 2, h, 0];
  const e = [w / 2, 0, -d / 2];
  const f = [w / 2, 0, d / 2];
  const g = [w / 2, h, 0];
  for (const face of [[a, b, c], [e, g, f], [a, c, g, e], [b, f, g, c], [a, e, f, b]]) {
    const start = v.length / 3;
    face.forEach((point, i) => {
      v.push(...point);
      uv.push(i === 1 || i === 2 ? 1 : 0, i >= 2 ? 1 : 0);
    });
    ind.push(start, start + 1, start + 2);
    if (face.length === 4) ind.push(start, start + 2, start + 3);
  }
  return indexedShape(v, ind, uv);
}
