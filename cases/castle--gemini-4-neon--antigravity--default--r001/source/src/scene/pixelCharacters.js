import * as THREE from 'three';
import { ENV_UNIFORMS, getToonGradientMap } from './materials.js';

/**
 * Harmonized low-saturation storybook pixel palettes matching our cel-shaded diorama.
 * Outlines use soft muted charcoal-plum (#4d4347) instead of harsh pure black.
 */
const KNIGHT_PALETTE = {
  '.': null,
  'o': '#4e4449', // soft muted outline
  'h': '#d6dce0', // armor highlight
  'a': '#b5bec6', // armor mid steel
  's': '#8a949e', // armor shade
  'v': '#575059', // helmet visor slit
  'r': '#be625b', // muted crimson cape & plume
  'd': '#944a46', // shaded crimson cape
  'g': '#d8b464', // soft antique gold trim
  't': '#e4dac4', // warm parchment tunic
  'b': '#7c5d47', // leather boots / belt
  'w': '#dfe5ea', // sword blade
  'c': '#6985a0', // muted heraldic shield blue
};

const FARMER_PALETTE_A = {
  '.': null,
  'o': '#514640', // soft warm brown-charcoal outline
  'y': '#dcb96d', // straw hat light
  'h': '#be984d', // straw hat shade
  'k': '#c06d5a', // muted neckerchief / ribbon
  'f': '#e7c6a8', // warm skin tone
  'e': '#5a4a44', // eyes
  'c': '#e8dfd0', // linen shirt
  'b': '#6e8ba2', // dusty blue overalls
  'd': '#536c82', // overalls shade
  'l': '#7d5f47', // boots & wooden handle
  'm': '#9da4ab', // hoe/sickle iron blade
};

const FARMER_PALETTE_B = {
  ...FARMER_PALETTE_A,
  'b': '#779369', // sage green tunic/overalls variant
  'd': '#59724e',
  'k': '#cf9b54',
};

/**
 * Hand-crafted 20x20 chibi pixel sprite frames (facing RIGHT by default).
 * Clean, readable silhouette with chibi proportions (big helmet/straw hat, cute cape/tools).
 */
const KNIGHT_FRAMES = {
  idle0: [
    '........ooo.........',
    '.......orrro........',
    '......orrrdo........',
    '......oooooo........',
    '.....oahhhaho.......',
    '.....oahhhaho.......',
    '.....oaovvoao.......',
    '....roaaaaaaor......',
    '...orooaggooo.......',
    '..ordooaccaoo..o....',
    '..ordoocggcoo.owo...',
    '..ordooccccoo.owo...',
    '..ordooaccaoo.owo...',
    '...orooattgoooog....',
    '....oooabbao.ob.....',
    '......oaooao........',
    '......obooob........',
    '......oo..oo........',
    '....................',
    '....................',
  ],
  idle1: [
    '........ooo.........',
    '.......orrro........',
    '.....oorrrdo........',
    '......oooooo........',
    '.....oahhhaho.......',
    '.....oahhhaho.......',
    '.....oaovvoao.......',
    '...rroaaaaaaor......',
    '..ordoogggooo.......',
    '.orddooaccaoo..o....',
    '.orddoocggcoo.owo...',
    '..ordooccccoo.owo...',
    '..ordo.accaoo.owo...',
    '...orooattgoooog....',
    '....oooabbao.ob.....',
    '......oaooao........',
    '......obooob........',
    '......oo..oo........',
    '....................',
    '....................',
  ],
  patrol0: [
    '........ooo.........',
    '.......orrro........',
    '......orrrdo........',
    '......oooooo....o...',
    '.....oahhhaho..owo..',
    '.....oahhhaho..owo..',
    '.....oaovvoao..owo..',
    '...rroaaaaaaor.owo..',
    '..ordooaggooo..og...',
    '..ordo.accaoo.oob...',
    '..ordoocggcoooo.....',
    '..ordooccccoo.......',
    '...orooaccaoo.......',
    '....oooattgo........',
    '......oabbao........',
    '......oaooao........',
    '......obooob........',
    '......oo..oo........',
    '....................',
    '....................',
  ],
  patrol1: [
    '.......ooo..........',
    '......orrro.........',
    '.....orrrdo......o..',
    '......oooooo....owo.',
    '.....oahhhaho...owo.',
    '.....oahhhaho..owo..',
    '.....oaovvoao..owo..',
    '..rrroaaaaaaor.og...',
    '.orddooaggooo.oob...',
    '.orddo.accaoooo.....',
    '..ordoocggcoo.......',
    '..ordooccccoo.......',
    '...orooaccaoo.......',
    '....oooattgo........',
    '......oabbao........',
    '.....oao..oao.......',
    '.....obo..obo.......',
    '.....oo....oo.......',
    '....................',
    '....................',
  ],
  walk0: [
    '........ooo.........',
    '.......orrro........',
    '.....oorrrdo........',
    '......oooooo........',
    '.....oahhhaho.......',
    '.....oahhhaho.......',
    '.....oaovvoao.......',
    '..rrroaaaaaaor......',
    '.orddooaggooo.......',
    '.orddo.accaoo..o....',
    '..ordoocggcoo.owo...',
    '..ordooccccoo.owo...',
    '...orooaccaoo.og....',
    '....oooattgooob.....',
    '......oabbao........',
    '.....oao..oao.......',
    '....obo....obo......',
    '....oo......oo......',
    '....................',
    '....................',
  ],
  walk1: [
    '....................',
    '........ooo.........',
    '.......orrro........',
    '......orrrdo........',
    '......oooooo........',
    '.....oahhhaho.......',
    '.....oahhhaho.......',
    '.....oaovvoao.......',
    '...rroaaaaaaor......',
    '..ordooaggooo.......',
    '..ordo.accaoo..o....',
    '..ordoocggcoo.owo...',
    '..ordooccccoo.owo...',
    '...orooaccaoo.og....',
    '....oooattgooob.....',
    '......oabbao........',
    '......oaooao........',
    '......obooob........',
    '......oo..oo........',
    '....................',
  ],
  walk2: [
    '........ooo.........',
    '.......orrro........',
    '......orrrdo........',
    '......oooooo........',
    '.....oahhhaho.......',
    '.....oahhhaho.......',
    '.....oaovvoao.......',
    '...rroaaaaaaor......',
    '..ordooaggooo.......',
    '..ordo.accaoo...o...',
    '..ordoocggcoo..owo..',
    '..ordooccccoo..owo..',
    '...orooaccaoo..og...',
    '....oooattgoooob....',
    '......oabbao........',
    '.......oaooao.......',
    '......obo..obo......',
    '......oo....oo......',
    '....................',
    '....................',
  ],
};

const FARMER_FRAMES = {
  idle0: [
    '....................',
    '.......ooooo........',
    '.....ooyyyyyoo......',
    '....oyyhhhhhyyo.....',
    '...ooooooooooooo....',
    '......offfffo.......',
    '......ofefeeo.......',
    '......offfffo.......',
    '.....oookkkooo......',
    '....ooccbbbccoo..m..',
    '....ooccbbbccoo.om..',
    '....oocdbbbdcoolo...',
    '.....ooodddoool.....',
    '......obbbbo.ol.....',
    '......obddbo.ol.....',
    '......obooob.ol.....',
    '......olool..oo.....',
    '......oo.oo.........',
    '....................',
    '....................',
  ],
  idle1: [
    '....................',
    '....................',
    '.......ooooo........',
    '.....ooyyyyyoo......',
    '....oyyhhhhhyyo.....',
    '...ooooooooooooo....',
    '......offfffo.......',
    '......ofefeeo.......',
    '......offfffo.......',
    '.....oookkkooo...m..',
    '....ooccbbbccoo.om..',
    '....ooccbbbccoolo...',
    '....oocdbbbdcoo.ol..',
    '.....ooodddoo...ol..',
    '......obbbbo....ol..',
    '......obooob....oo..',
    '......olool.........',
    '......oo.oo.........',
    '....................',
    '....................',
  ],
  work0: [
    '.............om.....',
    '.......ooooo.omm....',
    '.....ooyyyyyool.....',
    '....oyyhhhhhyyol....',
    '...ooooooooooool....',
    '......offfffo.ol....',
    '......ofefeeo.ol....',
    '......offfffoool....',
    '.....oookkkoooo.....',
    '....ooccbbbccoo.....',
    '....ooccbbbcco......',
    '.....oodbbbdo.......',
    '......obbbbo........',
    '......obddbo........',
    '.....obo..obo.......',
    '.....olo..olo.......',
    '.....oo....oo.......',
    '....................',
    '....................',
    '....................',
  ],
  work1: [
    '....................',
    '....................',
    '........ooooo.......',
    '......ooyyyyyoo.....',
    '.....oyyhhhhhyyo....',
    '....ooooooooooooo...',
    '.......offfffo......',
    '.......ofefeeo......',
    '......oookkkooo.....',
    '.....ooccbbbccoo....',
    '.....oocdbbbdcooo...',
    '......ooodddooool...',
    '.......obbbbo...ol..',
    '......obooobo....ol.',
    '.....olo...olo...omm',
    '.....oo.....oo....om',
    '....................',
    '....................',
    '....................',
    '....................',
  ],
  walk0: [
    '....................',
    '.......ooooo........',
    '.....ooyyyyyoo......',
    '....oyyhhhhhyyo.....',
    '...ooooooooooooo....',
    '......offfffo.......',
    '......ofefeeo.......',
    '......offfffo.......',
    '.....oookkkooo..m...',
    '....ooccbbbccoo.om..',
    '....ooccbbbccoolo...',
    '.....oodbbbdoo.ol...',
    '......obbbbo...ol...',
    '.....obo..obo..ol...',
    '....olo....olo.oo...',
    '....oo......oo......',
    '....................',
    '....................',
    '....................',
    '....................',
  ],
  walk1: [
    '....................',
    '....................',
    '.......ooooo........',
    '.....ooyyyyyoo......',
    '....oyyhhhhhyyo.....',
    '...ooooooooooooo....',
    '......offfffo.......',
    '......ofefeeo.......',
    '......offfffo...m...',
    '.....oookkkooo.om...',
    '....ooccbbbccoolo...',
    '....ooccbbbcco.ol...',
    '.....oodbbbdoo.ol...',
    '......obbbbo...ol...',
    '......obooob...oo...',
    '......olool.........',
    '......oo.oo.........',
    '....................',
    '....................',
    '....................',
  ],
  walk2: [
    '....................',
    '.......ooooo........',
    '.....ooyyyyyoo......',
    '....oyyhhhhhyyo.....',
    '...ooooooooooooo....',
    '......offfffo.......',
    '......ofefeeo.......',
    '......offfffo.......',
    '.....oookkkooo...m..',
    '....ooccbbbccoo.om..',
    '....ooccbbbccoolo...',
    '.....oodbbbdoo.ol...',
    '......obbbbo...ol...',
    '.......obooob..ol...',
    '......olo..olo.oo...',
    '......oo....oo......',
    '....................',
    '....................',
    '....................',
    '....................',
  ],
};

function renderSpriteFrame(rows, palette) {
  const h = rows.length;
  const w = rows[0].length;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);

  for (let y = 0; y < h; y++) {
    const line = rows[y];
    for (let x = 0; x < w; x++) {
      const ch = line[x];
      const col = palette[ch];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function buildFrameSet(frameMap, palette) {
  const out = {};
  for (const [k, rows] of Object.entries(frameMap)) {
    out[k] = renderSpriteFrame(rows, palette);
  }
  return out;
}

/**
 * Create a soft radial blurred ground shadow texture for gentle semi-transparent contact shadow.
 */
function createSoftShadowTexture() {
  const s = 64;
  const canvas = document.createElement('canvas');
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2);
  grad.addColorStop(0, 'rgba(38, 30, 34, 0.45)');
  grad.addColorStop(0.55, 'rgba(38, 30, 34, 0.22)');
  grad.addColorStop(1, 'rgba(38, 30, 34, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

/**
 * Outline-mask ShaderMaterial used during Pass 1 of ToonOutlineComposer
 * so pixel standees cleanly occlude background 3D edges without getting 3D-outlined.
 */
function createOutlineMaskMaterial(initialTexture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: initialTexture },
    },
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      varying vec2 vUv;
      void main() {
        float a = texture2D(uMap, vUv).a;
        if (a < 0.45) discard;
        // Sentinel alpha = -1.0 tells ToonOutlineComposer to skip 3D ink outline here
        gl_FragColor = vec4(0.0, 0.0, 0.0, -1.0);
      }
    `,
  });
}

/**
 * Tiny kicked-up fallen leaves & dry straw particle pool triggered by character actions & footsteps.
 */
class LeafStrawParticles {
  constructor(parent) {
    this.pool = [];
    const geo = new THREE.PlaneGeometry(0.11, 0.075);
    const palette = [
      0xdcb95e, // dry straw gold
      0xcfa248, // wheat chaff
      0x99b366, // fallen meadow leaf
      0xc78952, // autumn leaf
    ];

    for (let i = 0; i < 48; i++) {
      const mat = new THREE.MeshToonMaterial({
        color: palette[i % palette.length],
        gradientMap: getToonGradientMap(),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.userData.noOutline = true;
      parent.add(mesh);
      this.pool.push({
        mesh,
        vel: new THREE.Vector3(),
        rotVel: new THREE.Vector3(),
        age: 0,
        life: 1,
        active: false,
      });
    }
    this.cursor = 0;
  }

  emit(x, y, z, count = 3, kind = 'straw') {
    for (let i = 0; i < count; i++) {
      const p = this.pool[this.cursor];
      this.cursor = (this.cursor + 1) % this.pool.length;
      p.active = true;
      p.age = 0;
      p.life = 0.65 + Math.random() * 0.55;
      p.mesh.visible = true;
      p.mesh.position.set(
        x + (Math.random() - 0.5) * 0.28,
        y + 0.08 + Math.random() * 0.16,
        z + (Math.random() - 0.5) * 0.24
      );
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.35 + Math.random() * 0.55;
      p.vel.set(Math.cos(angle) * spd, 0.85 + Math.random() * 0.75, Math.sin(angle) * spd);
      p.rotVel.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      p.mesh.scale.set(
        kind === 'straw' ? 1.3 : 0.95,
        kind === 'straw' ? 0.55 : 0.95,
        1
      );
      p.mesh.material.color.setHex(
        kind === 'straw'
          ? Math.random() > 0.35 ? 0xe0bc63 : 0xc89947
          : Math.random() > 0.45 ? 0x8ea95f : 0xc98b51
      );
      p.mesh.material.opacity = 0.92;
    }
  }

  update(dt) {
    const wind = ENV_UNIFORMS.uWindStrength.value;
    for (const p of this.pool) {
      if (!p.active) continue;
      p.age += dt;
      if (p.age >= p.life) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.vel.y -= 2.4 * dt;
      p.vel.x += wind * 0.45 * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      if (p.mesh.position.y < 0.04) {
        p.mesh.position.y = 0.04;
        p.vel.multiplyScalar(0.3);
      }
      p.mesh.rotation.x += p.rotVel.x * dt;
      p.mesh.rotation.y += p.rotVel.y * dt;
      p.mesh.rotation.z += p.rotVel.z * dt;

      const t = p.age / p.life;
      p.mesh.material.opacity = (1.0 - smoothstep(0.65, 1.0, t)) * 0.92;
    }
  }
}

function smoothstep(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Lit 2D Pixel Standee Character with:
 * - Low-FPS discrete pixel animation loops (patrol / farm work / walk)
 * - Wandering to nearby positions after several action loops
 * - Facing alternation (left <-> right) during pause phases
 * - Soft breathing squash/stretch & subtle cape/wind sway
 * - Real pixel-silhouette directional shadow casting + soft semi-transparent contact shadow
 * - Kicked-up fallen leaves & dry straw particles
 */
class PixelCharacter {
  constructor({
    name,
    role, // 'knight' | 'farmer'
    frames,
    bounds, // { xMin, xMax, zMin, zMax, y }
    startPos,
    size = 0.96,
    particleSystem,
    softShadowTex,
  }) {
    this.name = name;
    this.role = role;
    this.frames = frames;
    this.bounds = bounds;
    this.size = size;
    this.particles = particleSystem;

    this.root = new THREE.Group();
    this.root.position.set(startPos.x, bounds.y, startPos.z);

    // Geometry anchored at bottom center (y = 0 at boots!) so breathing stays grounded
    const geo = new THREE.PlaneGeometry(size, size);
    geo.translate(0, size * 0.5, 0);

    const initialTex = frames.idle0;

    // Lit cel-shaded standee material (receives scene sun, ambient, fog & weather color!)
    this.material = new THREE.MeshToonMaterial({
      map: initialTex,
      gradientMap: getToonGradientMap(),
      alphaTest: 0.45,
      side: THREE.DoubleSide,
    });

    // Exact pixel-silhouette depth material for real shadow-map casting!
    this.depthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      map: initialTex,
      alphaTest: 0.45,
    });

    // Outline occlusion mask material for ToonOutlineComposer Pass 1
    this.maskMaterial = createOutlineMaskMaterial(initialTex);

    this.spriteMesh = new THREE.Mesh(geo, this.material);
    this.spriteMesh.castShadow = true;
    this.spriteMesh.receiveShadow = false;
    this.spriteMesh.customDepthMaterial = this.depthMaterial;
    this.spriteMesh.userData.outlineMask = true;
    this.spriteMesh.userData.maskMaterial = this.maskMaterial;
    this.spriteMesh.layers.enable(2);
    this.root.add(this.spriteMesh);

    // Soft semi-transparent ground silhouette shadow blob underneath feet
    const shadowMat = new THREE.MeshBasicMaterial({
      map: softShadowTex,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    this.groundShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 0.68, size * 0.44),
      shadowMat
    );
    this.groundShadow.rotation.x = -Math.PI / 2;
    this.groundShadow.position.set(0.05, 0.025, 0.04);
    this.groundShadow.userData.noOutline = true;
    this.root.add(this.groundShadow);

    // Behavior state machine
    this.state = 'ACTION'; // 'ACTION' | 'PAUSE' | 'WALK'
    this.facing = Math.random() > 0.5 ? 1 : -1;
    this.cyclesRemaining = 2 + Math.floor(Math.random() * 2);
    this.stateTimer = 0;
    this.pauseDuration = 1.6;
    this.pauseFlipped = false;

    this.frameTimer = 0;
    this.frameIndex = 0;
    this.stepEmitTimer = 0;
    this.breathPhase = Math.random() * Math.PI * 2;
    this.currentFrameKey = 'idle0';

    this.targetPos = new THREE.Vector3(startPos.x, bounds.y, startPos.z);
    this._tempCam = new THREE.Vector3();
  }

  setFrame(key) {
    if (this.currentFrameKey === key) return;
    this.currentFrameKey = key;
    const tex = this.frames[key];
    this.material.map = tex;
    this.material.needsUpdate = true;
    this.depthMaterial.map = tex;
    this.depthMaterial.needsUpdate = true;
    this.maskMaterial.uniforms.uMap.value = tex;
  }

  pickNearbyTarget() {
    const cur = this.root.position;
    let tx = cur.x;
    let tz = cur.z;
    // Choose a nearby spot 0.85..2.1 units away inside bounds
    for (let attempt = 0; attempt < 8; attempt++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = 0.85 + Math.random() * 1.15;
      const cx = THREE.MathUtils.clamp(cur.x + Math.cos(ang) * dist, this.bounds.xMin, this.bounds.xMax);
      const cz = THREE.MathUtils.clamp(cur.z + Math.sin(ang) * dist, this.bounds.zMin, this.bounds.zMax);
      if (Math.hypot(cx - cur.x, cz - cur.z) > 0.55) {
        tx = cx;
        tz = cz;
        break;
      }
    }
    this.targetPos.set(tx, this.bounds.y, tz);
  }

  update(dt, time, camera) {
    const wind = ENV_UNIFORMS.uWindStrength.value;

    // 1. Cylindrical Y-axis billboard facing camera horizontally
    camera.getWorldPosition(this._tempCam);
    const dxCam = this._tempCam.x - this.root.position.x;
    const dzCam = this._tempCam.z - this.root.position.z;
    const billYaw = Math.atan2(dxCam, dzCam);
    this.spriteMesh.rotation.y = billYaw;

    // 2. State machine & low-FPS pixel frame stepping
    this.stateTimer += dt;
    this.frameTimer += dt;

    if (this.state === 'ACTION') {
      // Low-framerate patrol / farm work cycle (~4.2 FPS)
      const seq =
        this.role === 'knight'
          ? ['idle0', 'idle1', 'patrol0', 'patrol1', 'patrol0', 'idle1']
          : ['idle0', 'work0', 'work1', 'work0', 'work1', 'idle1'];
      const frameStep = this.role === 'knight' ? 0.25 : 0.23;

      if (this.frameTimer >= frameStep) {
        this.frameTimer -= frameStep;
        this.frameIndex++;

        // Kick up fallen leaves or dry straw on energetic action beats!
        const seqPos = this.frameIndex % seq.length;
        if (this.role === 'farmer' && (seqPos === 2 || seqPos === 4)) {
          this.particles.emit(
            this.root.position.x + this.facing * 0.22,
            this.bounds.y,
            this.root.position.z,
            3,
            'straw'
          );
        } else if (this.role === 'knight' && seqPos === 3) {
          this.particles.emit(
            this.root.position.x,
            this.bounds.y,
            this.root.position.z,
            2,
            'leaf'
          );
        }

        // Complete a full action cycle
        if (this.frameIndex >= seq.length) {
          this.frameIndex = 0;
          this.cyclesRemaining--;
          if (this.cyclesRemaining <= 0) {
            // Transition to PAUSE stage (will alternate facing left <-> right!)
            this.state = 'PAUSE';
            this.stateTimer = 0;
            this.pauseDuration = 1.35 + Math.random() * 0.9;
            this.pauseFlipped = false;
            this.frameIndex = 0;
          }
        }
      }
      this.setFrame(seq[this.frameIndex % seq.length]);
    } else if (this.state === 'PAUSE') {
      // Gentle idle / cape flutter during pause (~3 FPS)
      const idleSeq = ['idle0', 'idle1'];
      if (this.frameTimer >= 0.34) {
        this.frameTimer -= 0.34;
        this.frameIndex = (this.frameIndex + 1) % idleSeq.length;
      }
      this.setFrame(idleSeq[this.frameIndex]);

      // Mid-pause: flip horizontal facing left <-> right cleanly!
      if (!this.pauseFlipped && this.stateTimer >= this.pauseDuration * 0.45) {
        this.facing *= -1;
        this.pauseFlipped = true;
      }

      if (this.stateTimer >= this.pauseDuration) {
        // Begin light walk to a new nearby spot
        this.pickNearbyTarget();
        this.state = 'WALK';
        this.stateTimer = 0;
        this.frameIndex = 0;
        this.stepEmitTimer = 0;
      }
    } else if (this.state === 'WALK') {
      const cur = this.root.position;
      const dx = this.targetPos.x - cur.x;
      const dz = this.targetPos.z - cur.z;
      const dist = Math.hypot(dx, dz);

      // Compute horizontal screen-space direction relative to camera right vector so sprite faces walking direction!
      const camRightX = Math.cos(billYaw);
      const camRightZ = -Math.sin(billYaw);
      const dotRight = dx * camRightX + dz * camRightZ;
      if (Math.abs(dotRight) > 0.05) {
        this.facing = dotRight >= 0 ? 1 : -1;
      }

      const speed = this.role === 'knight' ? 0.68 : 0.56;
      if (dist <= 0.08) {
        cur.x = this.targetPos.x;
        cur.z = this.targetPos.z;
        this.state = 'ACTION';
        this.stateTimer = 0;
        this.frameIndex = 0;
        this.cyclesRemaining = 2 + Math.floor(Math.random() * 2);
      } else {
        const move = Math.min(dist, speed * dt);
        cur.x += (dx / dist) * move;
        cur.z += (dz / dist) * move;

        // Low-FPS bouncy walk frames (~5.5 FPS)
        const walkSeq = ['walk0', 'walk1', 'walk2', 'walk1'];
        if (this.frameTimer >= 0.18) {
          this.frameTimer -= 0.18;
          this.frameIndex = (this.frameIndex + 1) % walkSeq.length;
        }
        this.setFrame(walkSeq[this.frameIndex]);

        // Footsteps kick up tiny fallen leaves / dry straw bits
        this.stepEmitTimer += dt;
        if (this.stepEmitTimer >= 0.36) {
          this.stepEmitTimer = 0;
          this.particles.emit(
            cur.x,
            this.bounds.y,
            cur.z,
            2,
            this.role === 'knight' ? 'leaf' : 'straw'
          );
        }
      }
    }

    // 3. Extremely subtle breathing & cape wind micro-rhythm (anchored cleanly at feet!)
    const breath = Math.sin(time * 2.6 + this.breathPhase);
    const scaleY = 1.0 + breath * 0.022;
    const scaleX = this.facing * (1.0 - breath * 0.012);
    this.spriteMesh.scale.set(scaleX, scaleY, 1.0);

    // Micro cape/plume lean with gentle wind rhythm (barely 1.5 degrees)
    const capeRhythm = Math.sin(time * 3.4 + this.breathPhase) * 0.016 * (0.7 + wind * 0.4);
    this.spriteMesh.rotation.z = capeRhythm;
  }
}

export function buildPixelCharacters() {
  const group = new THREE.Group();
  group.name = 'PixelCharacters';

  const knightFrames = buildFrameSet(KNIGHT_FRAMES, KNIGHT_PALETTE);
  const farmerFramesA = buildFrameSet(FARMER_FRAMES, FARMER_PALETTE_A);
  const farmerFramesB = buildFrameSet(FARMER_FRAMES, FARMER_PALETTE_B);
  const softShadowTex = createSoftShadowTexture();

  const particles = new LeafStrawParticles(group);

  const characters = [
    // 1. Chibi Pixel Knight patrolling in front of the village entrance plaza!
    new PixelCharacter({
      name: 'ChibiKnight',
      role: 'knight',
      frames: knightFrames,
      bounds: { xMin: -1.45, xMax: 1.45, zMin: 4.92, zMax: 5.55, y: 0.03 },
      startPos: { x: 0.15, z: 5.25 },
      size: 0.98,
      particleSystem: particles,
      softShadowTex,
    }),
    // 2. Pixel Farmer #1 tending the front-left golden wheat plot
    new PixelCharacter({
      name: 'WheatFarmerLeft',
      role: 'farmer',
      frames: farmerFramesA,
      bounds: { xMin: -4.8, xMax: -1.85, zMin: 7.85, zMax: 9.85, y: 0.08 },
      startPos: { x: -3.15, z: 8.85 },
      size: 0.9,
      particleSystem: particles,
      softShadowTex,
    }),
    // 3. Pixel Farmer #2 tending the front-right wheat plot near scarecrow
    new PixelCharacter({
      name: 'WheatFarmerRight',
      role: 'farmer',
      frames: farmerFramesB,
      bounds: { xMin: 1.7, xMax: 4.9, zMin: 7.85, zMax: 9.85, y: 0.08 },
      startPos: { x: 2.45, z: 8.75 },
      size: 0.9,
      particleSystem: particles,
      softShadowTex,
    }),
    // 4. Pixel Farmer #3 tending the upper-left terraced patch near the village wall
    new PixelCharacter({
      name: 'TerraceFarmer',
      role: 'farmer',
      frames: farmerFramesA,
      bounds: { xMin: -4.9, xMax: -2.4, zMin: 4.05, zMax: 4.95, y: 0.08 },
      startPos: { x: -3.7, z: 4.48 },
      size: 0.88,
      particleSystem: particles,
      softShadowTex,
    }),
  ];

  for (const ch of characters) {
    group.add(ch.root);
  }

  return {
    group,
    characters,
    update(dt, time, camera) {
      for (const ch of characters) {
        ch.update(dt, time, camera);
      }
      particles.update(dt);
    },
  };
}
