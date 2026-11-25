import * as THREE from 'three';
import {
  PALETTE,
  ENV_UNIFORMS,
  getTextures,
  createToonMaterial,
} from './materials.js';

// Deterministic PRNG for organic but reproducible placement
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildFarmland() {
  const textures = getTextures();
  const rand = mulberry32(2026);
  const group = new THREE.Group();
  group.name = 'FarmlandAndWoodland';

  // Materials
  const soilMat = createToonMaterial({
    color: 0xffffff,
    map: textures.furrow,
    snowable: true,
    snowThreshold: 0.58,
  });
  const woodFenceMat = createToonMaterial({
    color: PALETTE.timberMid,
    snowable: true,
    snowThreshold: 0.65,
  });
  const woodDarkMat = createToonMaterial({
    color: PALETTE.timberDark,
    snowable: true,
    snowThreshold: 0.65,
  });
  const stoneBridgeMat = createToonMaterial({
    color: PALETTE.castleStoneAlt,
    map: textures.retainingStone,
    snowable: true,
    snowThreshold: 0.65,
  });
  const hayMat = createToonMaterial({
    color: PALETTE.hayGold,
    snowable: true,
    snowThreshold: 0.45,
  });
  const trunkMat = createToonMaterial({
    color: PALETTE.trunkBark,
    snowable: false,
  });

  const swayTrees = [];
  const grazingAnimals = [];
  let scarecrowGroup = null;

  // =========================================================================
  // 1. TILLED SOIL FURROW BEDS & WIND-RIPPLING WHEAT FIELDS (麦垄麦浪)
  // =========================================================================
  const wheatPlots = [
    // Front-left broad golden wheat field
    { xMin: -5.65, xMax: -1.15, zMin: 7.45, zMax: 10.55, density: 1.0 },
    // Front-right broad golden wheat field
    { xMin: 1.15, xMax: 5.55, zMin: 7.45, zMax: 10.55, density: 1.0 },
    // Upper-left cozy terraced wheat patch (between village retaining wall & canal)
    { xMin: -5.45, xMax: -1.95, zMin: 3.72, zMax: 5.25, density: 0.92 },
  ];

  // Add raised tilled earth furrow beds + soil ridges (麦垄)
  for (const p of wheatPlots) {
    const w = p.xMax - p.xMin;
    const d = p.zMax - p.zMin;
    const cx = (p.xMin + p.xMax) / 2;
    const cz = (p.zMin + p.zMax) / 2;

    const soilBed = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), soilMat);
    soilBed.position.set(cx, 0.04, cz);
    soilBed.receiveShadow = true;
    group.add(soilBed);

    // Distinct parallel raised soil furrow ridges (麦垄)
    const rowCount = Math.floor(d / 0.42);
    for (let r = 0; r < rowCount; r++) {
      const rz = p.zMin + 0.22 + r * ((d - 0.44) / Math.max(1, rowCount - 1));
      const ridge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.11, w - 0.14, 5),
        createToonMaterial({ color: PALETTE.soilRich, snowable: true, snowThreshold: 0.6 })
      );
      ridge.rotation.z = Math.PI / 2;
      ridge.position.set(cx, 0.09, rz);
      ridge.receiveShadow = true;
      group.add(ridge);
    }
  }

  // Stylized Instanced Golden Wheat Stalks with GPU traveling wind waves (麦浪起伏)
  const wheatGeo = new THREE.ConeGeometry(0.065, 0.54, 4);
  wheatGeo.translate(0, 0.27, 0); // anchor base at y = 0

  const wheatMat = createToonMaterial({
    color: 0xffffff,
    snowable: true,
    snowThreshold: 0.5,
  });
  wheatMat.customProgramCacheKey = () => 'toon-wheat-wave';
  wheatMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = ENV_UNIFORMS.uTime;
    shader.uniforms.uWindStrength = ENV_UNIFORMS.uWindStrength;
    shader.uniforms.uSnowAmount = ENV_UNIFORMS.uSnowAmount;
    shader.uniforms.uWetness = ENV_UNIFORMS.uWetness;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uTime;
         uniform float uWindStrength;
         varying float vWorldUp;`
      )
      .replace(
        '#include <beginnormal_vertex>',
        `#include <beginnormal_vertex>
         vWorldUp = clamp(position.y * 1.9, 0.0, 1.0);`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         vec4 instOrigin = vec4(0.0, 0.0, 0.0, 1.0);
         #ifdef USE_INSTANCING
           instOrigin = instanceMatrix * instOrigin;
         #endif
         float tip = clamp(position.y / 0.54, 0.0, 1.0);
         float bend = tip * tip;
         float phase = instOrigin.x * 0.72 + instOrigin.z * 0.55 - uTime * (2.2 + uWindStrength * 1.15);
         float gust = sin(phase) + 0.35 * sin(phase * 2.1 + instOrigin.x * 1.3);
         float amp = (0.085 + uWindStrength * 0.095) * bend;
         transformed.x += gust * amp;
         transformed.z += cos(phase * 0.85) * amp * 0.55;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uSnowAmount;
         uniform float uWetness;
         varying float vWorldUp;`
      )
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
         diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.86, 0.88, 0.92), uWetness * 0.35);
         float snowTip = smoothstep(0.45, 0.95, vWorldUp) * uSnowAmount;
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.97, 0.99), snowTip * 0.85);`
      );
  };

  // Precompute all wheat blade transforms neatly aligned along furrow rows
  const wheatTransforms = [];
  const wheatColors = [];
  const colGold = new THREE.Color(PALETTE.wheatGold);
  const colAmber = new THREE.Color(PALETTE.wheatAmber);
  const colLight = new THREE.Color(0xf0d274);

  for (const p of wheatPlots) {
    const d = p.zMax - p.zMin;
    const rowCount = Math.floor(d / 0.42);
    for (let r = 0; r < rowCount; r++) {
      const rz = p.zMin + 0.22 + r * ((d - 0.44) / Math.max(1, rowCount - 1));
      const stepX = 0.21;
      for (let x = p.xMin + 0.16; x <= p.xMax - 0.16; x += stepX) {
        // Leave a tiny breathing clearing around the scarecrow at (3.55, 8.95)
        if (Math.hypot(x - 3.55, rz - 8.95) < 0.42) continue;

        // Place a small 2-stalk cluster per furrow spot for lushness
        for (let k = 0; k < 2; k++) {
          const wx = x + (rand() - 0.5) * 0.14;
          const wz = rz + (rand() - 0.5) * 0.16;
          const hScale = 0.78 + rand() * 0.45;
          const wScale = 0.85 + rand() * 0.4;
          wheatTransforms.push({
            x: wx,
            y: 0.1,
            z: wz,
            rotY: rand() * Math.PI * 2,
            sx: wScale,
            sy: hScale,
            sz: wScale,
          });
          const cPick = rand();
          const c = cPick < 0.45 ? colGold : cPick < 0.82 ? colAmber : colLight;
          wheatColors.push(c);
        }
      }
    }
  }

  const wheatMesh = new THREE.InstancedMesh(wheatGeo, wheatMat, wheatTransforms.length);
  wheatMesh.castShadow = false;
  wheatMesh.receiveShadow = true;
  wheatMesh.userData.noOutline = true;

  const dummy = new THREE.Object3D();
  for (let i = 0; i < wheatTransforms.length; i++) {
    const t = wheatTransforms[i];
    dummy.position.set(t.x, t.y, t.z);
    dummy.rotation.set(0, t.rotY, 0);
    dummy.scale.set(t.sx, t.sy, t.sz);
    dummy.updateMatrix();
    wheatMesh.setMatrixAt(i, dummy.matrix);
    wheatMesh.setColorAt(i, wheatColors[i]);
  }
  wheatMesh.instanceMatrix.needsUpdate = true;
  if (wheatMesh.instanceColor) wheatMesh.instanceColor.needsUpdate = true;
  group.add(wheatMesh);

  // Cozy little vegetable patch (cabbages & pumpkins) nestled near the eastern steps (x: 1.6..3.4, z: 3.7..4.4)
  const vegBed = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.1, 0.95), soilMat);
  vegBed.position.set(2.55, 0.04, 4.08);
  vegBed.receiveShadow = true;
  group.add(vegBed);

  const cabbageMat = createToonMaterial({ color: 0x7cb964, snowable: true });
  const pumpkinMat = createToonMaterial({ color: 0xdf823c, snowable: true });
  for (let ix = 0; ix < 5; ix++) {
    for (let iz = 0; iz < 2; iz++) {
      const isPumpkin = ix >= 3;
      const veg = new THREE.Mesh(
        new THREE.SphereGeometry(isPumpkin ? 0.13 : 0.12, 8, 7),
        isPumpkin ? pumpkinMat : cabbageMat
      );
      veg.scale.set(1.1, 0.78, 1.1);
      veg.position.set(1.75 + ix * 0.4, 0.14, 3.84 + iz * 0.45);
      veg.castShadow = true;
      group.add(veg);
    }
  }

  // =========================================================================
  // 2. WOODEN SPLIT-RAIL FENCES (篱笆)
  // =========================================================================
  function addFenceLine(x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    if (len < 0.2) return;
    const fGroup = new THREE.Group();
    fGroup.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
    fGroup.rotation.y = Math.atan2(dx, dz);

    const posts = Math.max(2, Math.round(len / 0.95) + 1);
    for (let i = 0; i < posts; i++) {
      const pz = -len / 2 + (i / (posts - 1)) * len;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.52, 0.085), woodDarkMat);
      post.position.set(0, 0.26, pz);
      post.castShadow = true;
      fGroup.add(post);
    }

    for (const ry of [0.19, 0.39]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.065, len), woodFenceMat);
      rail.position.set(0, ry, 0);
      rail.castShadow = true;
      fGroup.add(rail);
    }
    group.add(fGroup);
  }

  // Cow pasture fence (front-left flank: x in [-10.8, -7.2], z in [7.45, 10.65])
  addFenceLine(-10.8, 7.45, -7.2, 7.45);
  addFenceLine(-10.8, 7.45, -10.8, 10.65);
  addFenceLine(-10.8, 10.65, -7.2, 10.65);
  addFenceLine(-7.2, 7.45, -7.2, 8.6); // leave tiny pasture gate gap
  addFenceLine(-7.2, 9.5, -7.2, 10.65);

  // Sheep pasture fence (front-right flank: x in [7.0, 10.8], z in [7.45, 10.65])
  addFenceLine(7.0, 7.45, 10.8, 7.45);
  addFenceLine(10.8, 7.45, 10.8, 10.65);
  addFenceLine(7.0, 10.65, 10.8, 10.65);
  addFenceLine(7.0, 7.45, 7.0, 8.7);
  addFenceLine(7.0, 9.6, 7.0, 10.65);

  // Neat wheat-field border fences along front road edge
  addFenceLine(-5.7, 7.35, -1.05, 7.35);
  addFenceLine(1.05, 7.35, 5.65, 7.35);
  addFenceLine(-5.65, 3.62, -1.9, 3.62);

  // =========================================================================
  // 3. SCARECROW (稻草人) & HAYSTACKS (干草垛)
  // =========================================================================
  scarecrowGroup = new THREE.Group();
  scarecrowGroup.position.set(3.55, 0.06, 8.95);

  const scPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.38, 6), woodDarkMat);
  scPole.position.y = 0.69;
  scPole.castShadow = true;
  scarecrowGroup.add(scPole);

  const scCross = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.02, 6), woodDarkMat);
  scCross.rotation.z = Math.PI / 2;
  scCross.position.y = 0.92;
  scarecrowGroup.add(scCross);

  // Patched terracotta/blue tunic
  const scTunic = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.56, 7),
    createToonMaterial({ color: 0x5d82a4, snowable: true })
  );
  scTunic.position.y = 0.78;
  scTunic.castShadow = true;
  scarecrowGroup.add(scTunic);

  // Sleeves + straw hands
  const scSleeves = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.09, 0.78, 7),
    createToonMaterial({ color: 0xc97452, snowable: true })
  );
  scSleeves.rotation.z = Math.PI / 2;
  scSleeves.position.y = 0.92;
  scarecrowGroup.add(scSleeves);

  for (const sx of [-0.46, 0.46]) {
    const strawTuft = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 5), hayMat);
    strawTuft.rotation.z = sx < 0 ? Math.PI / 2 : -Math.PI / 2;
    strawTuft.position.set(sx, 0.92, 0);
    scarecrowGroup.add(strawTuft);
  }

  // Burlap head & tilted woven straw hat
  const scHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 8, 8),
    createToonMaterial({ color: 0xe3cca0, snowable: false })
  );
  scHead.position.y = 1.18;
  scarecrowGroup.add(scHead);

  const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.04, 10), hayMat);
  hatBrim.position.set(0.02, 1.3, 0);
  hatBrim.rotation.z = -0.16;
  const hatCrown = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.24, 9), hayMat);
  hatCrown.position.set(0.04, 1.42, 0);
  hatCrown.rotation.z = -0.16;
  hatCrown.castShadow = true;
  scarecrowGroup.add(hatBrim, hatCrown);
  group.add(scarecrowGroup);

  // Domed Haystacks (干草垛) with straw waistbands & leaning wooden pitchfork
  function addHaystack(x, z, scale = 1.0, withPitchfork = false) {
    const hs = new THREE.Group();
    hs.position.set(x, 0.02, z);

    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.46 * scale, 0.56 * scale, 0.5 * scale, 10), hayMat);
    lower.position.y = 0.25 * scale;
    lower.castShadow = true;
    lower.receiveShadow = true;
    hs.add(lower);

    const dome = new THREE.Mesh(new THREE.ConeGeometry(0.54 * scale, 0.72 * scale, 10), hayMat);
    dome.position.y = (0.5 + 0.32) * scale;
    dome.castShadow = true;
    hs.add(dome);

    const band = new THREE.Mesh(
      new THREE.TorusGeometry(0.48 * scale, 0.032 * scale, 5, 12),
      woodFenceMat
    );
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.44 * scale;
    hs.add(band);

    if (withPitchfork) {
      const pf = new THREE.Group();
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 1.15, 5), woodDarkMat);
      handle.position.y = 0.57;
      pf.add(handle);
      const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.03), woodDarkMat);
      crossbar.position.y = 1.12;
      pf.add(crossbar);
      for (const tx of [-0.1, 0, 0.1]) {
        const tine = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.22, 0.022), woodDarkMat);
        tine.position.set(tx, 1.24, 0);
        pf.add(tine);
      }
      pf.position.set(0.56 * scale, 0.0, 0.2);
      pf.rotation.z = 0.24;
      pf.rotation.y = 0.4;
      hs.add(pf);
    }

    group.add(hs);
  }

  addHaystack(6.15, 8.25, 1.05, true);
  addHaystack(6.35, 9.55, 0.85, false);
  addHaystack(-6.25, 9.65, 0.95, true);

  // =========================================================================
  // 4. CANAL BRIDGES (水渠小桥)
  // =========================================================================
  // Main Front Arched Stone-and-Timber Bridge at (0.0, 0.0, 6.4)
  function createCanalBridge({ x, z, rotY = 0, width = 1.65, span = 1.65, stone = true }) {
    const br = new THREE.Group();
    br.position.set(x, 0.0, z);
    br.rotation.y = rotY;

    // Gentle arched plank deck built from 5 angled plank sections
    const segs = 5;
    const segLen = span / segs;
    for (let i = 0; i < segs; i++) {
      const t = (i + 0.5) / segs - 0.5; // -0.5 .. +0.5
      const archY = 0.22 * (1 - 4 * t * t);
      const slope = -0.88 * t;
      const plank = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.11, segLen + 0.04),
        stone ? stoneBridgeMat : woodFenceMat
      );
      plank.position.set(0, 0.04 + archY, t * span);
      plank.rotation.x = -slope * 0.45;
      plank.castShadow = true;
      plank.receiveShadow = true;
      br.add(plank);
    }

    // Side arched parapets or timber rails
    for (const sx of [-width / 2 + 0.08, width / 2 - 0.08]) {
      if (stone) {
        // Low stone bridge walls + corner bollards
        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.34, span * 0.96),
          stoneBridgeMat
        );
        rail.position.set(sx, 0.32, 0);
        rail.castShadow = true;
        br.add(rail);
        for (const sz of [-span * 0.46, span * 0.46]) {
          const bollard = new THREE.Mesh(
            new THREE.BoxGeometry(0.22, 0.46, 0.22),
            stoneBridgeMat
          );
          bollard.position.set(sx, 0.28, sz);
          bollard.castShadow = true;
          br.add(bollard);
        }
      } else {
        for (const sz of [-span * 0.44, 0, span * 0.44]) {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.08), woodDarkMat);
          post.position.set(sx, 0.34 + (sz === 0 ? 0.12 : 0), sz);
          post.castShadow = true;
          br.add(post);
        }
        const hand = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, span * 0.96), woodFenceMat);
        hand.position.set(sx, 0.56, 0);
        hand.castShadow = true;
        br.add(hand);
      }
    }
    group.add(br);
  }

  // Main front stone-arch bridge carrying village footpath south into wheat fields
  createCanalBridge({ x: 0.0, z: 6.4, rotY: 0, width: 1.75, span: 1.65, stone: true });
  // Western rustic wooden footbridge crossing vertical canal leg to meadow & watermill
  createCanalBridge({ x: -6.8, z: 2.35, rotY: Math.PI / 2, width: 1.15, span: 1.55, stone: false });
  // Eastern rustic farm footbridge crossing horizontal canal leg to sheep pasture
  createCanalBridge({ x: 8.65, z: 6.4, rotY: 0, width: 1.15, span: 1.55, stone: false });

  // =========================================================================
  // 5. STYLIZED DAIRY COWS & FLUFFY SHEEP (牛羊)
  // =========================================================================
  const cowWhiteMat = createToonMaterial({ color: 0xf4efe4, snowable: true, snowThreshold: 0.72 });
  const cowSpotMat = createToonMaterial({ color: 0x5c493e, snowable: false });
  const cowSnoutMat = createToonMaterial({ color: 0xe6b8a8, snowable: false });
  const woolMat = createToonMaterial({ color: 0xf7f2e7, snowable: true, snowThreshold: 0.75 });
  const sheepDarkMat = createToonMaterial({ color: 0x4b4342, snowable: false });

  function createCow(x, z, rotY) {
    const cow = new THREE.Group();
    cow.position.set(x, 0.0, z);
    cow.rotation.y = rotY;

    // Rounded torso
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.76), cowWhiteMat);
    body.position.y = 0.42;
    body.castShadow = true;
    cow.add(body);

    // Cute brown/charcoal cow patches
    const spot1 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.18, 0.26), cowSpotMat);
    spot1.position.set(0, 0.46, -0.1);
    const spot2 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.18), cowSpotMat);
    spot2.position.set(0, 0.36, 0.22);
    cow.add(spot1, spot2);

    // 4 legs
    for (const lx of [-0.14, 0.14]) {
      for (const lz of [-0.26, 0.26]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.08), cowSpotMat);
        leg.position.set(lx, 0.14, lz);
        leg.castShadow = true;
        cow.add(leg);
      }
    }

    // Articulated head for subtle grazing bob
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.5, 0.36);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.26), cowWhiteMat);
    head.position.set(0, 0.04, 0.12);
    head.castShadow = true;
    headPivot.add(head);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.1), cowSnoutMat);
    snout.position.set(0, -0.02, 0.26);
    headPivot.add(snout);

    for (const hx of [-0.12, 0.12]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.11, 5), hayMat);
      horn.position.set(hx, 0.19, 0.08);
      horn.rotation.z = hx < 0 ? 0.35 : -0.35;
      headPivot.add(horn);
    }
    cow.add(headPivot);

    group.add(cow);
    grazingAnimals.push({
      headPivot,
      phase: rand() * Math.PI * 2,
      speed: 0.75 + rand() * 0.45,
      basePitch: 0.25,
    });
  }

  function createSheep(x, z, rotY) {
    const sheep = new THREE.Group();
    sheep.position.set(x, 0.0, z);
    sheep.rotation.y = rotY;

    // Fluffy clustered wool cloud body
    const woolMain = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 1), woolMat);
    woolMain.scale.set(1.0, 0.9, 1.32);
    woolMain.position.y = 0.32;
    woolMain.castShadow = true;
    sheep.add(woolMain);

    const woolPuff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.17, 1), woolMat);
    woolPuff.position.set(0, 0.38, -0.14);
    sheep.add(woolPuff);

    // Tiny legs
    for (const lx of [-0.1, 0.1]) {
      for (const lz of [-0.16, 0.16]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.2, 0.055), sheepDarkMat);
        leg.position.set(lx, 0.1, lz);
        leg.castShadow = true;
        sheep.add(leg);
      }
    }

    // Articulated dark face & floppy ears
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.35, 0.26);

    const face = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.2), sheepDarkMat);
    face.position.set(0, 0, 0.08);
    headPivot.add(face);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), woolMat);
    cap.position.set(0, 0.09, 0.05);
    headPivot.add(cap);

    for (const ex of [-0.1, 0.1]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.06), sheepDarkMat);
      ear.position.set(ex, 0.02, 0.04);
      ear.rotation.z = ex < 0 ? 0.45 : -0.45;
      headPivot.add(ear);
    }

    sheep.add(headPivot);
    group.add(sheep);
    grazingAnimals.push({
      headPivot,
      phase: rand() * Math.PI * 2,
      speed: 0.9 + rand() * 0.55,
      basePitch: 0.35,
    });
  }

  // Place Dairy Cows in front-left fenced meadow
  createCow(-9.6, 8.5, 0.65);
  createCow(-8.2, 9.75, -1.15);
  createCow(-9.7, 9.85, 1.4);

  // Place Fluffy Sheep in front-right fenced meadow & near barn
  createSheep(8.1, 8.35, -0.5);
  createSheep(9.35, 8.65, 1.2);
  createSheep(8.8, 9.7, -2.1);
  createSheep(10.0, 9.65, 0.4);
  createSheep(8.2, 4.45, -0.9);
  createSheep(9.15, 4.95, 0.7);

  // =========================================================================
  // 6. PERIMETER WOODLAND TREES & BUSHES WITH GENTLE BREEZE SWAY (环景树林 + 树摇)
  // =========================================================================
  const leafMats = [
    createToonMaterial({ color: PALETTE.leafSun, snowable: true, snowThreshold: 0.42 }),
    createToonMaterial({ color: PALETTE.leafMid, snowable: true, snowThreshold: 0.42 }),
    createToonMaterial({ color: PALETTE.leafDeep, snowable: true, snowThreshold: 0.42 }),
    createToonMaterial({ color: PALETTE.leafAutumn, snowable: true, snowThreshold: 0.42 }),
  ];
  const pineMat = createToonMaterial({
    color: PALETTE.pineGreen,
    snowable: true,
    snowThreshold: 0.38,
  });

  function createBroadleafTree(x, y, z, scale = 1.0, matIdx = 0) {
    const tGroup = new THREE.Group();
    tGroup.position.set(x, y, z);

    const trunkH = 1.05 * scale;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11 * scale, 0.17 * scale, trunkH, 7),
      trunkMat
    );
    trunk.position.y = trunkH / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tGroup.add(trunk);

    // Crown pivot placed at top of trunk for natural breeze sway
    const crownPivot = new THREE.Group();
    crownPivot.position.y = trunkH * 0.86;
    const lMat = leafMats[matIdx % leafMats.length];

    const blobs = [
      [0, 0.55, 0, 0.72],
      [-0.44, 0.32, 0.22, 0.52],
      [0.45, 0.35, -0.18, 0.54],
      [0.14, 0.36, 0.42, 0.48],
      [-0.18, 0.88, -0.1, 0.46],
    ];
    for (const [bx, by, bz, br] of blobs) {
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(br * scale, 1), lMat);
      puff.position.set(bx * scale, by * scale, bz * scale);
      puff.castShadow = true;
      puff.receiveShadow = true;
      crownPivot.add(puff);
    }

    tGroup.add(crownPivot);
    group.add(tGroup);
    swayTrees.push({
      pivot: crownPivot,
      phase: rand() * Math.PI * 2,
      speed: 1.1 + rand() * 0.55,
      amp: 0.032 + rand() * 0.018,
    });
  }

  function createPineTree(x, y, z, scale = 1.0) {
    const tGroup = new THREE.Group();
    tGroup.position.set(x, y, z);

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09 * scale, 0.14 * scale, 0.75 * scale, 6),
      trunkMat
    );
    trunk.position.y = 0.375 * scale;
    trunk.castShadow = true;
    tGroup.add(trunk);

    const crownPivot = new THREE.Group();
    crownPivot.position.y = 0.52 * scale;

    const tiers = [
      { y: 0.42, r: 0.72, h: 1.05 },
      { y: 1.05, r: 0.56, h: 0.92 },
      { y: 1.62, r: 0.38, h: 0.78 },
    ];
    for (const tier of tiers) {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(tier.r * scale, tier.h * scale, 8),
        pineMat
      );
      cone.position.y = tier.y * scale;
      cone.castShadow = true;
      cone.receiveShadow = true;
      crownPivot.add(cone);
    }

    tGroup.add(crownPivot);
    group.add(tGroup);
    swayTrees.push({
      pivot: crownPivot,
      phase: rand() * Math.PI * 2,
      speed: 1.25 + rand() * 0.45,
      amp: 0.025 + rand() * 0.014,
    });
  }

  // Rear-Left Woodland Hillside (sitting on leftHill y=0.72 & flanking meadow)
  const treeSpecs = [
    // Rear-left hill (y = 0.72)
    { type: 'pine', x: -10.2, y: 0.72, z: -9.5, s: 1.25 },
    { type: 'broad', x: -8.6, y: 0.72, z: -8.9, s: 1.15, m: 1 },
    { type: 'pine', x: -10.5, y: 0.72, z: -7.1, s: 1.18 },
    { type: 'broad', x: -8.9, y: 0.72, z: -6.2, s: 1.1, m: 0 },
    { type: 'broad', x: -10.2, y: 0.72, z: -4.9, s: 0.98, m: 3 },
    { type: 'pine', x: -8.2, y: 0.72, z: -4.5, s: 0.92 },

    // Rear-right hill (y = 0.85)
    { type: 'pine', x: 10.3, y: 0.85, z: -9.4, s: 1.28 },
    { type: 'broad', x: 8.6, y: 0.85, z: -8.8, s: 1.12, m: 2 },
    { type: 'pine', x: 10.5, y: 0.85, z: -6.8, s: 1.15 },
    { type: 'broad', x: 8.8, y: 0.85, z: -5.8, s: 1.05, m: 0 },
    { type: 'broad', x: 10.3, y: 0.85, z: -4.3, s: 1.02, m: 3 },

    // Rear backdrop behind castle moat (shorter framing pines along z = -11.05)
    { type: 'pine', x: -6.6, y: 0.0, z: -11.05, s: 1.05 },
    { type: 'pine', x: -3.2, y: 0.0, z: -11.15, s: 0.92 },
    { type: 'pine', x: 3.1, y: 0.0, z: -11.15, s: 0.95 },
    { type: 'pine', x: 6.7, y: 0.0, z: -11.05, s: 1.08 },

    // Western flank woodland bordering the watermill & pasture (y = 0.0)
    { type: 'broad', x: -10.4, y: 0.0, z: -1.8, s: 1.08, m: 1 },
    { type: 'pine', x: -10.6, y: 0.0, z: 0.8, s: 0.98 },
    { type: 'broad', x: -9.6, y: 0.0, z: 3.2, s: 1.05, m: 0 },
    { type: 'broad', x: -10.5, y: 0.0, z: 5.2, s: 0.9, m: 2 },

    // Eastern flank framing near windmill knoll & pasture (y = 0.0)
    { type: 'broad', x: 10.55, y: 0.0, z: 1.8, s: 1.0, m: 0 },
    { type: 'pine', x: 10.65, y: 0.0, z: 4.1, s: 0.92 },
    { type: 'broad', x: 9.85, y: 0.0, z: 5.1, s: 0.82, m: 1 },
  ];

  for (const t of treeSpecs) {
    if (t.type === 'pine') {
      createPineTree(t.x, t.y, t.z, t.s);
    } else {
      createBroadleafTree(t.x, t.y, t.z, t.s, t.m);
    }
  }

  // Stylized bushes, boulders, canal reeds & wildflowers
  const bushPositions = [
    [-6.1, 0, 5.1], [-8.8, 0, 5.4], [-9.2, 0, 1.4], [-10.9, 0, 6.2],
    [10.2, 0, 3.0], [10.9, 0, 6.9], [5.8, 0, 5.2], [-1.72, 0, 4.78],
    [1.68, 0, 4.78], [-5.4, 1.45, 2.7], [5.5, 1.45, 2.6],
  ];
  for (let i = 0; i < bushPositions.length; i++) {
    const [bx, by, bz] = bushPositions[i];
    const bush = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.32 + (i % 3) * 0.08, 1),
      leafMats[i % 3]
    );
    bush.scale.set(1.2, 0.78, 1.1);
    bush.position.set(bx, by + 0.18, bz);
    bush.castShadow = true;
    bush.receiveShadow = true;
    group.add(bush);
  }

  // Mossy boulders & river stones along canal & hill bases
  const rockMat = createToonMaterial({ color: PALETTE.retainingWall, snowable: true, snowThreshold: 0.55 });
  const rockPositions = [
    [-7.65, 0.08, 4.2], [-7.55, 0.06, 0.8], [-5.9, 0.06, 5.55],
    [4.4, 0.06, 5.65], [7.4, 0.07, 5.65], [-10.2, 0.08, 6.9],
  ];
  for (let i = 0; i < rockPositions.length; i++) {
    const [rx, ry, rz] = rockPositions[i];
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24 + (i % 2) * 0.1, 0), rockMat);
    rock.scale.set(1.3, 0.72, 1.0);
    rock.position.set(rx, ry, rz);
    rock.rotation.set(0.2, i * 1.1, 0.1);
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  }

  // Reeds along the canal banks
  const reedMat = createToonMaterial({ color: 0x5d8b4b, snowable: false });
  const reedSpots = [
    [-6.12, 3.6], [-6.12, 4.8], [-7.48, 4.1], [-4.2, 5.72],
    [2.6, 5.72], [5.8, 7.08], [-3.8, 7.08], [9.9, 5.72],
  ];
  for (const [rx, rz] of reedSpots) {
    for (let k = 0; k < 3; k++) {
      const reed = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.025, 0.42 + k * 0.08, 4), reedMat);
      reed.position.set(rx + (k - 1) * 0.09, 0.16, rz + (k % 2 - 0.5) * 0.08);
      reed.rotation.z = (k - 1) * 0.12;
      reed.userData.noOutline = true;
      group.add(reed);
    }
  }

  // Tiny cheerful wildflowers dotting the front meadows
  const flowerColors = [0xf7e38c, 0xf2a5a0, 0xdbe9f7, 0xf6c56e];
  const flowerGeo = new THREE.SphereGeometry(0.055, 5, 4);
  for (let i = 0; i < 36; i++) {
    const fx = (rand() - 0.5) * 20.5;
    const fz = 3.6 + rand() * 7.2;
    // Skip canal & wheat beds
    if (fz > 5.65 && fz < 7.25) continue;
    if (fx > -5.8 && fx < 5.7 && fz > 7.25) continue;
    if (fx > -7.5 && fx < -6.1) continue;
    const fl = new THREE.Mesh(
      flowerGeo,
      createToonMaterial({ color: flowerColors[i % flowerColors.length], snowable: false })
    );
    fl.position.set(fx, 0.06, fz);
    fl.userData.noOutline = true;
    group.add(fl);
  }

  return {
    group,
    update(time) {
      const wind = ENV_UNIFORMS.uWindStrength.value;

      // Gentle tree crown breeze sway (树摇)
      for (const t of swayTrees) {
        const s = Math.sin(time * t.speed + t.phase) * t.amp * (0.65 + wind * 0.6);
        const s2 = Math.cos(time * t.speed * 0.72 + t.phase) * t.amp * 0.55 * (0.65 + wind * 0.6);
        t.pivot.rotation.z = s;
        t.pivot.rotation.x = s2;
      }

      // Subtle scarecrow breeze sway
      if (scarecrowGroup) {
        scarecrowGroup.rotation.z = Math.sin(time * 1.4) * 0.025 * (0.7 + wind * 0.5);
      }

      // Peaceful cow & sheep grazing bob
      for (const a of grazingAnimals) {
        const bob = Math.sin(time * a.speed + a.phase);
        a.headPivot.rotation.x = a.basePitch + (bob > 0.2 ? (bob - 0.2) * 0.45 : 0);
      }
    },
  };
}
