export function buildFields(ctx) {
  const { T, root, group, box, cyl, ball, beam, mesh, mat, rng, pick, updates } = ctx;
  const farm = group(root);
  const TAU = Math.PI * 2;
  const range = (a, b) => a + (b - a) * rng();
  const earth = .08;
  const tilt = new T.Object3D();
  const tint = new T.Color();

  function lump(parent, x, y, z, sx, sy, sz, color, detail = 0) {
    const m = ball(parent, 1, x, y, z, color, detail);
    m.scale.set(sx, sy, sz);
    return m;
  }

  // Vertex colors keep all the broken edges and bevels in one terrain mesh.
  function faces() {
    const pos = [], colors = [];
    const add = (a, b, c, color) => {
      pos.push(...a, ...b, ...c);
      for (let i = 0; i < 3; i++) colors.push(color.r, color.g, color.b);
    };
    return {
      tri(a, b, c, color) { add(a, b, c, color); },
      quad(a, b, c, d, color) { add(a, b, c, color); add(a, c, d, color); },
      finish() {
        const g = new T.BufferGeometry();
        g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
        g.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
        g.computeVertexNormals();
        return g;
      },
    };
  }
  const soil = faces();
  function patch(x0, x1, z0, z1, y, color, rough = .09) {
    const dz = Math.min(1, z1 - z0);
    const edge = [
      [x0 + .16, z0 + .06 * dz], [x0, z0 + .28 * dz], [x0 + range(0, rough), (z0 + z1) / 2],
      [x0 + .05, z1 - .18 * dz], [x0 + .23, z1], [(x0 + x1) / 2, z1 - range(0, rough) * dz],
      [x1 - .18, z1 - .04 * dz], [x1, z1 - .24 * dz], [x1 - range(0, rough), (z0 + z1) / 2],
      [x1 - .04, z0 + .17 * dz], [x1 - .25, z0], [(x0 + x1) / 2, z0 + range(0, rough) * dz],
    ].map(([x, z]) => [x, y, z]);
    const center = [(x0 + x1) / 2, y, (z0 + z1) / 2];
    for (let i = 0; i < edge.length; i++) soil.tri(center, edge[i], edge[(i + 1) % edge.length], tint.setHex(color));
  }

  const crops = { grain: [], beet: [], cabbage: [] };
  const wheat = { kind: 'grain', step: .265, scale: [.84, 1.13], dirt: 0x8e694d, furrow: 0xa78155,
    colors: [0xe0b257, 0xe9ba63, 0xd8a54b, 0xf1c878, 0xd2a052] };
  const oats = { kind: 'grain', step: .29, scale: [.62, .88], dirt: 0x8d6f50, furrow: 0xad8b62,
    colors: [0xdac077, 0xcfad61, 0xe7ce8d, 0xc6b16b, 0xe0bf76] };
  const beets = { kind: 'beet', step: .44, scale: [.77, 1.12], dirt: 0x795b47, furrow: 0x946e53,
    colors: [0x8b4b56, 0x995664, 0x78444b, 0x876057, 0x6c6250] };
  const greens = { kind: 'cabbage', step: .49, scale: [.8, 1.16], dirt: 0x785d47, furrow: 0x967557,
    colors: [0x7f985d, 0x8da36a, 0x718751, 0xa1a86a, 0x809866] };

  function plot(x0, x1, z0, z1, rows, crop) {
    patch(x0, x1, z0, z1, .091, crop.dirt);
    const pitch = (z1 - z0) / rows;
    for (let row = 0; row < rows; row++) {
      const z = z0 + (row + .5) * pitch;
      const a = x0 + range(.15, .32), b = x1 - range(.15, .29);
      const width = pitch * range(.29, .36);
      const knots = [a, a + (b - a) * .23, a + (b - a) * .51, a + (b - a) * .78, b];
      const slices = knots.map((x, i) => {
        const zc = z + range(-.035, .035), w = width * (i === 0 || i === knots.length - 1 ? .35 : 1);
        const h = i === 0 || i === knots.length - 1 ? .111 : range(.148, .172);
        return [[x, .095, zc - w], [x, h, zc - w * .4], [x, h, zc + w * .4], [x, .095, zc + w]];
      });
      for (let j = 1; j < slices.length; j++) {
        for (let k = 0; k < 3; k++) {
          soil.quad(slices[j - 1][k], slices[j - 1][k + 1], slices[j][k + 1], slices[j][k],
            tint.setHex(crop.furrow).multiplyScalar((k === 1 ? 1 : .85) * range(.94, 1.06)));
        }
      }
      for (let x = a + range(.07, .2); x < b - .06; x += crop.step * range(.84, 1.17)) {
        const s = range(...crop.scale) * (1 + .10 * Math.sin(x * 1.3 + z * .9));
        crops[crop.kind].push([x, .149, z + range(-.105, .105), range(0, TAU), s, pick(crop.colors)]);
        if (crop.kind === 'grain' && rng() < .62) {
          crops.grain.push([x + range(-.1, .12), .122, z + width * (rng() < .5 ? -.72 : .72),
            range(0, TAU), s * range(.66, .92), pick(crop.colors)]);
        }
      }
    }
  }

  // Set the first two beds back from the diagonal towpath on the left bank.
  plot(-15.94, -8.03, 12.85, 18.57, 8, wheat);
  plot(-7.73, -2.08, 14.05, 15.36, 2, oats);
  plot(-7.73, -2.08, 15.59, 18.57, 4, beets);
  plot(2.06, 9.12, 12.45, 14.43, 3, oats);
  plot(9.49, 15.56, 12.45, 14.43, 3, greens);
  plot(2.06, 8.3, 15.6, 18.56, 4, beets);
  plot(8.66, 15.56, 15.6, 18.56, 4, greens);
  plot(-8.35, -2.11, 5.48, 9.4, 5, oats);
  plot(2.1, 7.78, 5.48, 7.13, 2, greens);
  plot(2.1, 7.78, 7.44, 9.4, 3, beets);

  // The right-hand crop blocks are split by a walkable east-west farm track.
  patch(1.61, 15.68, 14.55, 15.48, .089, 0xb3a073, .07);
  patch(1.64, 15.58, 14.72, 14.93, .093, 0xbfaa7d, .035);
  patch(1.67, 15.6, 15.09, 15.31, .093, 0xbba77b, .04);
  patch(-15.93, -8.81, 5.5, 9.46, .089, 0x8d9b60);
  patch(8.35, 15.74, 5.5, 9.46, .089, 0x92a167);
  patch(-12.14, -9.07, 6.38, 7.33, .094, 0x9ea46c);
  patch(-15.35, -13.32, 8.25, 9.16, .094, 0x859556);
  patch(10.82, 14.25, 6.29, 7.55, .094, 0x9ca86e);
  patch(9.03, 11.36, 8.32, 9.07, .094, 0x87995e);
  const ground = mesh(farm, soil.finish(), new T.MeshStandardMaterial({ vertexColors: true, roughness: 1 }));
  ground.castShadow = false;
  ground.receiveShadow = true;

  const shade = (v) => tint.setRGB(v, v, v);
  function blade(f, base, mid, tip, angle, w, light) {
    const dx = Math.cos(angle) * w, dz = -Math.sin(angle) * w;
    const left = [mid[0] - dx, mid[1] - w * .16, mid[2] - dz];
    const right = [mid[0] + dx, mid[1] - w * .16, mid[2] + dz];
    f.tri(base, left, mid, shade(light * .83));
    f.tri(base, mid, right, shade(light));
    f.tri(left, tip, mid, shade(light * .83));
    f.tri(mid, tip, right, shade(light));
  }
  function cerealGeometry() {
    const f = faces();
    for (let i = 0; i < 5; i++) {
      const a = i * 2.399, u = Math.sin(a), v = Math.cos(a);
      const x = u * (.02 + i * .01), z = v * (.02 + i * .008);
      const h = [.61, .47, .55, .43, .52][i], lean = .032 + i * .012;
      const nx = x + u * lean, nz = z + v * lean;
      const w = .009;
      f.quad([x - v * w, 0, z + u * w], [x + v * w, 0, z - u * w],
        [nx + v * .005, h, nz - u * .005], [nx - v * .005, h, nz + u * .005], shade(.69));
      blade(f, [x, h * .32, z], [x + u * .065, h * .59, z + v * .065],
        [x + u * .141, h * .63, z + v * .141], a, .022, .83);
      const y = h - .089;
      const shoulder = [0, 1, 2].map(j => {
        const b = a + j * TAU / 3;
        return [nx + Math.sin(b) * .033, h - .026, nz + Math.cos(b) * .033];
      });
      const nose = [nx + u * .022, h + .062, nz + v * .022];
      const base = [nx - u * .008, y, nz - v * .008];
      for (let j = 0; j < 3; j++) {
        const p = shoulder[j], q = shoulder[(j + 1) % 3];
        f.tri(base, q, p, shade(.93 + .045 * j));
        f.tri(p, q, nose, shade(.99 + .045 * j));
      }
    }
    return f.finish();
  }
  function rosetteGeometry(beet) {
    const f = faces();
    for (let i = 0; i < 10; i++) {
      const a = i * 2.399, ring = i < 6;
      const u = Math.sin(a), v = Math.cos(a);
      const r = (beet ? .162 : .217) * (ring ? 1 : .59) * (1 + .13 * Math.cos(i * 2));
      const h = (beet ? .26 : .162) * (ring ? 1 : 1.21) * (1 + .12 * Math.sin(i));
      const m = r * (beet ? .69 : .63);
      const base = [u * .016, .009, v * .016];
      const stem = [u * m * .57, h * .63, v * m * .57];
      if (beet) blade(f, base, stem, [u * m, h * .87, v * m], a, .014, 1.03);
      blade(f, beet ? stem : base, [u * m, h, v * m], [u * r, h * (ring ? .78 : .96), v * r],
        a, (beet ? .067 : .103) * (ring ? 1 : .67), (ring ? .94 : 1.13) + .07 * Math.sin(i * 3));
    }
    return f.finish();
  }

  function instances(geometry, material, items) {
    const m = new T.InstancedMesh(geometry, material, items.length);
    for (let i = 0; i < items.length; i++) {
      const [x, y, z, angle, s, color] = items[i];
      tilt.position.set(x, y, z);
      tilt.rotation.set(0, angle, 0);
      tilt.scale.set(s, s, s);
      tilt.updateMatrix();
      m.setMatrixAt(i, tilt.matrix);
      m.setColorAt(i, tint.setHex(color));
    }
    m.instanceMatrix.needsUpdate = true;
    m.instanceColor.needsUpdate = true;
    m.castShadow = m.receiveShadow = true;
    farm.add(m);
    return m;
  }

  const waveTime = { value: 0 }, waveWind = { value: .35 };
  function grainBend(shader) {
    shader.uniforms.fieldTime = waveTime;
    shader.uniforms.fieldWind = waveWind;
    shader.vertexShader = 'uniform float fieldTime;\nuniform float fieldWind;\n' +
      shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        mat4 stalkWorld = modelMatrix * instanceMatrix;
        vec3 stalkAt = stalkWorld[3].xyz;
        float gust = sin(stalkAt.x * 1.14 + stalkAt.z * .69 - fieldTime * 2.05);
        float ripple = sin(stalkAt.x * 2.05 - stalkAt.z * .95 - fieldTime * 3.25);
        float bend = transformed.y * transformed.y * (.11 + fieldWind * .29);
        vec3 drift = vec3(.28 + gust * .66 + ripple * .14, 0., .12 + gust * .36) * bend;
        vec3 basisX = stalkWorld[0].xyz;
        vec3 basisZ = stalkWorld[2].xyz;
        transformed.x += dot(drift, basisX) / dot(basisX, basisX);
        transformed.z += dot(drift, basisZ) / dot(basisZ, basisZ);
      `);
  }
  const plantMat = () => new T.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: T.DoubleSide });
  const grainMat = plantMat();
  grainMat.onBeforeCompile = grainBend;
  const grain = instances(cerealGeometry(), grainMat, crops.grain);
  grain.userData.dynamic = true;
  grain.computeBoundingSphere();
  grain.boundingSphere.radius += .25;
  grain.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, side: T.DoubleSide });
  grain.customDepthMaterial.onBeforeCompile = grainBend;
  const leaves = plantMat();
  instances(rosetteGeometry(true), leaves, crops.beet);
  instances(rosetteGeometry(false), leaves, crops.cabbage);

  const postColors = [0x8b6a4d, 0xa18058, 0x957352, 0x85664c];
  function fence(x0, z0, x1, z1, tall = false) {
    const count = Math.max(1, Math.round(Math.hypot(x1 - x0, z1 - z0) / 1.26));
    let prev;
    for (let i = 0; i <= count; i++) {
      const x = x0 + (x1 - x0) * i / count, z = z0 + (z1 - z0) * i / count;
      const h = (tall ? .77 : .62) + range(-.033, .033);
      const post = box(farm, .115, h, .125, x, earth + h / 2, z, pick(postColors));
      post.rotation.y = range(-.16, .16);
      const cap = cyl(farm, .037, .088, .074, x, earth + h + .029, z, 0xaf8c62, 4);
      cap.rotation.y = Math.PI / 4 + post.rotation.y;
      if (prev) {
        for (const offset of [.18, .43]) {
          beam(farm, [prev.x, earth + prev.h - offset, prev.z], [x, earth + h - offset, z], .083,
            offset > .3 ? 0x957555 : 0xb39065, .061);
        }
      }
      prev = { x, z, h };
    }
  }

  // Open ends face the farm lane. The pasture fences have separate gate gaps.
  fence(-15.87, 12.76, -8.24, 12.76);
  fence(-15.98, 12.96, -15.98, 14.74);
  fence(-15.98, 16.42, -15.98, 18.73);
  fence(-15.79, 18.78, -11.97, 18.78);
  fence(-10.65, 18.78, -4.03, 18.78);
  fence(2.25, 18.78, 7.29, 18.78);
  fence(9.08, 18.78, 14.93, 18.78);
  fence(15.78, 16.08, 15.78, 18.59);
  fence(15.78, 12.56, 15.78, 14.35);
  fence(10.5, 12.23, 15.57, 12.23);
  for (const [a, b, gate] of [[-16.02, -8.75, -10.31], [8.25, 15.8, 9.81]]) {
    fence(a + .16, 5.52, gate - .58, 5.52, true);
    fence(gate + .58, 5.52, b - .16, 5.52, true);
    fence(a, 5.7, a, 9.21, true);
    fence(a + .16, 9.39, b - .16, 9.39, true);
    fence(b, 5.7, b, 9.21, true);
  }

  const ringGeo = new T.TorusGeometry(1, .045, 4, 10);
  function roll(x, z, radius, length, yaw) {
    const g = group(farm, x, earth + radius * .92, z);
    g.rotation.y = yaw;
    const rollBody = cyl(g, radius, radius, length, 0, 0, 0, 0xc09755, 10);
    rollBody.rotation.z = Math.PI / 2;
    for (const xx of [-.27 * length, .27 * length]) {
      const ring = mesh(g, ringGeo, 0x957444, xx, 0, 0);
      ring.rotation.y = Math.PI / 2;
      ring.scale.setScalar(radius);
    }
    for (const side of [-1, 1]) {
      for (const [ratio, color] of [[.7, 0xb4894d], [.43, 0xd6ae63], [.2, 0xa98149]]) {
        const ring = mesh(g, ringGeo, color, side * (length / 2 + .009), 0, 0);
        ring.rotation.y = Math.PI / 2;
        ring.scale.setScalar(radius * ratio);
      }
    }
    for (let i = 0; i < 9; i++) {
      const a = (i + .5) * TAU / 10, yy = Math.cos(a) * radius * .969, zz = Math.sin(a) * radius * .969;
      const xx = range(-.4, .24) * length;
      beam(g, [xx, yy, zz], [xx + length * range(.12, .23), yy, zz], .019, pick([0xb38951, 0xd6b16b, 0xdcc381]));
    }
  }
  roll(-17.14, 13.86, .43, .73, -.3);
  roll(-17.88, 14.64, .4, .76, .23);
  roll(-17.22, 15.17, .34, .62, .43);
  roll(-9.18, 8.79, .29, .49, .17);
  roll(15.07, 19.47, .36, .67, -.41);

  const scare = group(farm, -10.52, earth, 15.52);
  scare.rotation.y = .33;
  cyl(scare, .05, .075, 1.76, 0, .88, 0, 0x876446, 6);
  beam(scare, [-.7, 1.35, 0], [.68, 1.39, 0], .087, 0xa1825c);
  const coat = cyl(scare, .247, .167, .52, 0, 1.18, 0, 0x688283, 5);
  coat.rotation.y = .65;
  beam(scare, [-.17, 1.39, 0], [-.55, 1.33, 0], .148, 0x688283, .12);
  beam(scare, [.17, 1.39, 0], [.54, 1.41, 0], .146, 0x718b8d, .12);
  beam(scare, [-.13, .99, .011], [.14, .99, .011], .058, 0x957049, .295);
  for (const sign of [-1, 1]) for (let i = 0; i < 3; i++) {
    beam(scare, [sign * .54, 1.37, .032 * (i - 1)], [sign * (.69 + i * .027), 1.24 + i * .071, .036 * (i - 1)], .022, 0xd4b172);
  }
  lump(scare, .012, 1.63, 0, .148, .169, .143, 0xd5b181, 1);
  cyl(scare, .246, .253, .039, -.014, 1.745, 0, 0xbe9c60, 9).rotation.z = .17;
  cyl(scare, .114, .159, .166, -.034, 1.834, 0, 0xc5a46a, 8).rotation.z = .17;
  cyl(scare, .144, .154, .039, -.029, 1.785, 0, 0x896b49, 8).rotation.z = .17;
  cyl(scare, .134, .152, .077, 0, 1.474, 0, 0xa05a4b, 7);
  beam(scare, [.09, 1.47, .086], [.236, 1.295, .131], .064, 0xa05a4b, .035);

  function cow(x, z, size, yaw, coatColor, grazing) {
    const g = group(farm, x, earth, z);
    g.rotation.y = yaw;
    g.scale.setScalar(size);
    const cream = 0xe5d8b8, hoof = 0x4d4136;
    lump(g, 0, .74, 0, .69, .392, .343, cream, 1);
    lump(g, -.39, .77, -.03, .359, .345, .33, coatColor, 1);
    lump(g, .23, .83, .24, .293, .244, .106, coatColor, 1).rotation.z = -.28;
    lump(g, -.17, .7, .297, .161, .18, .054, coatColor).rotation.z = .42;
    lump(g, .25, .963, -.18, .23, .153, .184, coatColor, 1);
    for (const xx of [-.445, .396]) for (const zz of [-.214, .214]) {
      beam(g, [xx, .59, zz], [xx - .055, .096, zz * 1.16], .128, xx < 0 ? coatColor : cream);
      box(g, .145, .113, .14, xx - .05, .063, zz * 1.16, hoof).rotation.y = zz * .64;
    }
    const y = grazing ? .465 : .91;
    beam(g, [.36, .86, 0], [.77, y + .06, 0], .34, coatColor, .36);
    lump(g, .788, y, 0, .277, .229, .229, coatColor, 1).rotation.z = grazing ? -.5 : -.16;
    lump(g, .977, y - .08, 0, .172, .121, .204, 0xb68e7c, 1);
    lump(g, .907, y + .071, 0, .132, .114, .091, cream);
    for (const side of [-1, 1]) {
      lump(g, .725, y + .106, side * .24, .11, .064, .129, coatColor).rotation.x = side * .37;
      lump(g, .758, y + .147, side * .255, .064, .027, .075, 0xac826b);
      beam(g, [.745, y + .161, side * .151], [.724, y + .273, side * .193], .054, 0xd0b993);
      lump(g, .86, y + .052, side * .177, .029, .033, .022, 0x302a23);
      lump(g, 1.087, y - .056, side * .1, .021, .021, .032, 0x765c4c);
    }
    beam(g, [-.56, .94, 0], [-.78, .74, .058], .051, coatColor);
    beam(g, [-.78, .74, .058], [-.75, .45, .123], .042, coatColor);
    lump(g, -.75, .445, .123, .06, .097, .068, coatColor);
  }

  function sheep(x, z, size, yaw, grazing) {
    const g = group(farm, x, earth, z);
    g.rotation.y = yaw;
    g.scale.setScalar(size);
    const dark = 0x5d5247;
    for (const xx of [-.27, .27]) for (const zz of [-.148, .148]) {
      beam(g, [xx, .4, zz], [xx - .031, .045, zz * 1.11], .073, dark);
    }
    lump(g, -.019, .532, 0, .492, .321, .289, 0xded9bd, 1);
    for (const [xx, yy, zz, s] of [
      [-.265, .61, .14, .263], [.06, .664, .115, .279], [.223, .52, .104, .253],
      [-.145, .54, .239, .224], [-.241, .632, -.14, .262], [.094, .642, -.147, .262],
      [.245, .529, -.123, .223], [-.454, .566, 0, .125],
    ]) lump(g, xx, yy, zz, s, s * .93, s * .85, pick([0xe5dfc5, 0xdcd7bd, 0xf0e9d2, 0xeae3ca]));
    const y = grazing ? .337 : .58;
    beam(g, [.245, .59, 0], [.422, y + .02, 0], .18, dark, .21);
    lump(g, .435, y, 0, .193, .16, .154, dark, 1).rotation.z = grazing ? -.55 : -.17;
    lump(g, .419, y + .115, 0, .135, .112, .146, 0xe2dcc3);
    for (const sign of [-1, 1]) {
      lump(g, .374, y + .04, sign * .165, .097, .053, .104, dark).rotation.x = sign * .37;
      lump(g, .496, y + .023, sign * .118, .024, .025, .02, 0x342e27);
    }
  }
  cow(-13.94, 7.64, .97, -.42, 0x6c4e3c, false);
  cow(-11.38, 8.03, .88, 2.58, 0x4c4540, true);
  sheep(10.09, 7.61, .94, -.61, false);
  sheep(11.82, 8.33, .82, .33, true);
  sheep(13.09, 6.7, .9, -1.36, false);
  sheep(14.05, 7.82, .74, 2.52, true);

  function trough(x, z, length) {
    const g = group(farm, x, earth, z);
    box(g, length, .135, .42, 0, .131, 0, 0x755b45);
    box(g, length - .034, .022, .295, 0, .197, 0, 0x7f9690);
    for (const side of [-1, 1]) {
      box(g, length + .056, .13, .062, 0, .194, side * .191, 0xaa8965);
      box(g, .072, .131, .335, side * length * .478, .193, 0, 0x9b7d5e);
      box(g, .14, .118, .435, side * length * .32, .061, 0, 0x775c46);
    }
  }
  trough(-14.69, 6.12, 1.03);
  trough(14.62, 8.72, .77);

  // Low pasture tufts, field-edge weeds and pale flower heads, all instanced.
  const grass = [], blooms = [];
  const meadow = [0x758b52, 0x849b5d, 0x69854e, 0xa0a36a, 0x8e9c5d];
  function tuft(x, z, s, flower = false) {
    grass.push([x, earth + .017, z, range(0, TAU), s, pick(meadow)]);
    if (flower) blooms.push([x + .02, earth + .017 + s * .232, z + .028, range(0, TAU), s * .036,
      pick([0xe8d6a4, 0xeddfbd, 0xcdb779, 0xc6a0a0])]);
  }
  for (const [a, b] of [[-15.82, -8.91], [8.47, 15.62]]) {
    for (let i = 0; i < 82; i++) tuft(range(a, b), range(5.65, 9.22), range(.36, .91), rng() < .10);
  }
  for (const [a, b, c, d, n] of [
    [-20.65, -16.66, -18.9, 9.43, 134], [-20.6, -16.32, 12.23, 20.58, 75],
    [-16.0, -1.84, 19.19, 20.69, 68], [1.85, 16.7, 19.22, 20.72, 70],
    [17.23, 20.67, 12.84, 20.64, 61], [19.18, 20.7, -19.6, 11.38, 68],
    [-15.62, -2.25, 18.85, 19.15, 28], [2.07, 15.54, 18.85, 19.16, 28],
    [-15.57, -2.15, 12.06, 12.21, 28], [2.12, 15.57, 12.06, 12.2, 24],
  ]) for (let i = 0; i < n; i++) tuft(range(a, b), range(c, d), range(.49, 1.27), rng() < .12);
  const grassFaces = faces();
  for (let i = 0; i < 6; i++) {
    const a = i * 2.399;
    const u = Math.sin(a), v = Math.cos(a), h = .25 - .021 * i;
    blade(grassFaces, [u * .021, 0, v * .021], [u * .072, h * .57, v * .072],
      [u * .15, h, v * .15], a, .022, 1 - .023 * i);
  }
  const meadowGrass = instances(grassFaces.finish(), leaves, grass);
  meadowGrass.castShadow = false;
  instances(new T.IcosahedronGeometry(1, 0), mat(0xffffff), blooms).castShadow = false;

  const shrubs = [0x748650, 0x82945b, 0x617648, 0x91a068, 0x738c5e];
  function scrub(x, z, size) {
    for (let i = 0; i < 4; i++) {
      const a = i * 2.399;
      const r = i ? range(.28, .51) * size : 0;
      const s = size * (i ? range(.52, .79) : .86);
      lump(farm, x + Math.cos(a) * r, earth + .27 * s, z + Math.sin(a) * r, s * .65, s * .53, s * .59, pick(shrubs));
    }
  }
  for (const [x, z, s] of [
    [-19.85, 19.8, 1.05], [-17.37, 20.11, .7], [-13.76, 20.12, .58], [-5.08, 20.28, .61],
    [4.82, 20.2, .48], [11.59, 20.22, .61], [16.45, 20.14, .71], [20.07, 19.95, .93],
    [19.55, 16.4, .72], [19.93, 12.59, .79], [-19.42, 12.58, .74], [-17.8, 18.7, .65],
    [-17.35, 8.85, .73], [-18.89, 4.54, 1.01], [-16.54, .22, .98], [-19.83, -6.99, .94],
    [-13.34, -16.3, 1.01], [13.5, -18.18, .95], [14.42, -10.89, .94], [19.97, 8.84, .71],
    [19.86, 2.7, .69], [19.91, -5.5, .83], [19.77, -13.87, .67],
  ]) scrub(x, z, s);

  const broad = [], needles = [];
  const broadColors = [0x657e4c, 0x78925b, 0x809963, 0x8da26a, 0x718957];
  const pineColors = [0x4c6d55, 0x5b7b5c, 0x698866, 0x79936a];
  function tree(x, z, h, pine = false, narrow = 1) {
    const trunk = 0x806449;
    const thick = h * (pine ? .043 : .054);
    const g = group(farm, x, earth, z);
    const phase = x * .58 + z * .51;
    const sway = (pine ? .77 : 1) * Math.sqrt(h);
    const add = (list, xx, yy, zz, sx, sy, sz, color, rx = 0, rz = 0) => {
      list.push({ x: x + xx, y: earth + yy, z: z + zz, sx, sy, sz, rx, rz,
        yaw: range(0, TAU), color, phase, dx: xx, dz: zz, dy: Math.max(0, yy - h * .44), sway });
    };
    cyl(g, thick * .54, thick, h * .73, 0, h * .365, 0, trunk, 7);
    if (pine) {
      for (let i = 0; i < 4; i++) {
        const r = h * (.282 - i * .043) * narrow;
        add(needles, 0, h * (.459 + i * .155), 0, r, h * (.38 - i * .028), r,
          pineColors[i], range(-.035, .035), range(-.035, .035));
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const a = i * TAU / 4 + phase;
        const r = h * range(.16, .21) * narrow;
        const dx = Math.cos(a) * r, dz = Math.sin(a) * r, yy = h * range(.65, .76);
        beam(g, [0, h * .35, 0], [dx * .91, yy, dz * .91], thick * .66, trunk);
        add(broad, dx, yy, dz, h * .212 * narrow, h * range(.21, .25), h * .203 * narrow,
          broadColors[i], range(-.2, .2), range(-.2, .2));
      }
      add(broad, -.025, h * .869, .018, h * .229 * narrow, h * .242, h * .217 * narrow, broadColors[4], .09, -.08);
      add(broad, h * .084 * narrow, h * .965, -h * .072 * narrow, h * .144 * narrow, h * .143, h * .145 * narrow, broadColors[3]);
    }
  }

  // Taller silhouettes at the back and outer left; keep the near view open.
  for (const args of [
    [-19.15, 18.33, 1.58, false, .88], [-19.35, 15.03, 1.75, false, .8],
    [-19.61, 8.09, 2.32, false, .93], [-18.11, 6.13, 1.87],
    [-19.09, 3.45, 3.0], [-17.2, 1.35, 2.57, true], [-19.42, -.3, 3.66, true],
    [-18.12, -3.0, 3.07], [-19.38, -5.77, 3.65], [-16.72, -5.8, 2.75],
    [-18.65, -8.47, 4.14, true], [-15.93, -9.44, 3.32], [-19.32, -11.6, 3.8],
    [-17.28, -13.55, 4.22, true], [-14.37, -13.03, 3.15], [-19.13, -15.95, 4.13],
    [-16.25, -17.47, 4.24], [-12.97, -18.52, 3.32, true, .91],
    [-19.16, -19.05, 4.18, true], [-15.12, -19.55, 3.63, true],
    [12.96, -19.32, 3.17, true, .86], [15.06, -18.83, 3.57], [19.64, -19.03, 3.9, true, .75],
    [19.84, -16.15, 3.46, false, .71], [14.74, -15.74, 3.53, true], [12.93, -13.44, 2.71, true, .86],
    [19.89, -11.47, 3.02, true, .77], [14.26, -12.43, 3.39, false, .93],
    [14.95, -8.8, 2.69, true, .88], [19.88, -7.92, 3.07, false, .7],
    [19.94, -3.83, 2.76, true, .78], [19.94, .55, 2.24, false, .76],
    [19.86, 4.47, 2.1, true, .83], [19.91, 7.51, 1.8, false, .81],
    [19.96, 13.92, 1.64, false, .8], [19.78, 18.02, 1.54, false, .88],
    [-15.24, 20.08, 1.27, false, .89], [16.12, 19.48, 1.21, false, .81],
  ]) tree(...args);

  function movingCanopy(geometry, parts) {
    const m = new T.InstancedMesh(geometry, mat(0xffffff), parts.length);
    m.userData.dynamic = true;
    m.instanceMatrix.setUsage(T.DynamicDrawUsage);
    m.castShadow = m.receiveShadow = true;
    m.frustumCulled = false;
    for (let i = 0; i < parts.length; i++) m.setColorAt(i, tint.setHex(parts[i].color));
    m.instanceColor.needsUpdate = true;
    farm.add(m);
    return (time, wind) => {
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const ax = Math.sin(time * 1.07 + p.phase) * wind * p.sway * .025;
        const az = Math.sin(time * .79 + p.phase * .8) * wind * p.sway * .021;
        tilt.position.set(p.x + ax * p.dy, p.y - ax * p.dx - az * p.dz, p.z + az * p.dy);
        tilt.rotation.set(p.rx + az, p.yaw, p.rz - ax);
        tilt.scale.set(p.sx, p.sy, p.sz);
        tilt.updateMatrix();
        m.setMatrixAt(i, tilt.matrix);
      }
      m.instanceMatrix.needsUpdate = true;
    };
  }
  const swayBroad = movingCanopy(new T.IcosahedronGeometry(1, 1), broad);
  const swayPines = movingCanopy(new T.CylinderGeometry(.12, 1, 1, 7), needles);
  function animate(t, dt, weather) {
    const wind = Number.isFinite(weather?.wind) ? T.MathUtils.clamp(weather.wind, 0, 1.5) : .35;
    waveTime.value = t;
    waveWind.value = wind;
    swayBroad(t, .3 + wind);
    swayPines(t, .3 + wind);
  }
  animate(0, 0);
  updates.push(animate);
}
