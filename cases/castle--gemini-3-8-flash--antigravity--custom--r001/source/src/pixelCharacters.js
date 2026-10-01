import * as THREE from 'three';
import { contactShadowMaterial, toonGradientMap } from './materials.js';

// Procedurally generate pixel art sprite sheets on HTML Canvas
function generatePixelKnightTexture() {
  const canvas = document.createElement('canvas');
  // 6 frames: Idle0, Idle1, Walk0, Walk1, Walk2, Walk3
  const frameWidth = 32;
  const frameHeight = 32;
  const frameCount = 6;
  canvas.width = frameWidth * frameCount;
  canvas.height = frameHeight;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // Harmonious Cel Muted Palette (3-tone shading, dark plum outline)
  const OUTLINE = '#292534';
  const ARMOR_LIGHT = '#8b9bb4';
  const ARMOR_MID = '#5e6f88';
  const ARMOR_DARK = '#3d495d';
  const CAPE_RED = '#a83c3c';
  const CAPE_LIGHT = '#c75151';
  const TUNIC_CREAM = '#ede7d8';
  const SKIN = '#f1c8a5';
  const GOLD = '#dcb143';

  // Helper to draw a pixel block
  function p(f, x, y, col) {
    ctx.fillStyle = col;
    ctx.fillRect(f * frameWidth + x, y, 1, 1);
  }

  // Draw Knight frames
  for (let f = 0; f < frameCount; f++) {
    const isWalk = f >= 2;
    const walkStep = f - 2;
    const isIdle1 = f === 1;

    const bobY = isWalk ? (walkStep % 2 === 0 ? 0 : -1) : (isIdle1 ? -1 : 0);
    const legOffsetL = isWalk ? (walkStep === 0 ? 2 : (walkStep === 2 ? -2 : 0)) : 0;
    const legOffsetR = isWalk ? (walkStep === 0 ? -2 : (walkStep === 2 ? 2 : 0)) : 0;

    // Cape (behind body)
    const capeFlutter = isIdle1 ? 1 : (isWalk ? ((walkStep % 2) * 2 - 1) : 0);
    for (let cy = 14 + bobY; cy <= 24 + bobY; cy++) {
      for (let cx = 8; cx <= 13; cx++) {
        p(f, cx - capeFlutter, cy, (cx === 8 ? CAPE_LIGHT : CAPE_RED));
      }
    }

    // Helmet & Plume (Head)
    // Plume
    p(f, 16, 3 + bobY, CAPE_LIGHT);
    p(f, 17, 4 + bobY, CAPE_RED);
    p(f, 18, 5 + bobY, CAPE_RED);
    p(f, 15, 4 + bobY, CAPE_LIGHT);

    // Helmet dome
    for (let hx = 12; hx <= 20; hx++) {
      for (let hy = 6 + bobY; hy <= 13 + bobY; hy++) {
        let col = ARMOR_MID;
        if (hx <= 14) col = ARMOR_LIGHT;
        if (hx >= 19) col = ARMOR_DARK;
        if (hy === 6 + bobY || hx === 12 || hx === 20) col = OUTLINE;
        p(f, hx, hy, col);
      }
    }

    // Visor slit & Eye glint
    p(f, 14, 10 + bobY, OUTLINE);
    p(f, 15, 10 + bobY, OUTLINE);
    p(f, 16, 10 + bobY, OUTLINE);
    p(f, 17, 10 + bobY, OUTLINE);
    p(f, 18, 10 + bobY, OUTLINE);
    p(f, 16, 10 + bobY, '#ffffff'); // glint

    // Face / chin reveal
    p(f, 15, 12 + bobY, SKIN);
    p(f, 16, 12 + bobY, SKIN);

    // Torso / Breastplate
    for (let tx = 13; tx <= 19; tx++) {
      for (let ty = 14 + bobY; ty <= 20 + bobY; ty++) {
        let col = TUNIC_CREAM;
        if (ty >= 15 + bobY && ty <= 18 + bobY && tx >= 14 && tx <= 18) {
          col = (tx === 14 || tx === 15) ? ARMOR_LIGHT : ARMOR_MID;
        }
        if (tx === 13 || tx === 19 || ty === 20 + bobY) col = OUTLINE;
        p(f, tx, ty, col);
      }
    }

    // Shield (held in left hand, facing viewer)
    const shieldBob = isWalk && walkStep === 0 ? -1 : 0;
    for (let sx = 9; sx <= 13; sx++) {
      for (let sy = 15 + bobY + shieldBob; sy <= 22 + bobY + shieldBob; sy++) {
        let scol = ARMOR_LIGHT;
        if (sx === 9 || sx === 13 || sy === 22 + bobY + shieldBob) scol = OUTLINE;
        if (sx === 11 || sy === 18 + bobY + shieldBob) scol = GOLD; // golden cross
        p(f, sx, sy, scol);
      }
    }

    // Sword at hip (right hand)
    p(f, 21, 16 + bobY, GOLD); // pommel
    p(f, 21, 17 + bobY, OUTLINE); // crossguard
    p(f, 22, 17 + bobY, OUTLINE);
    p(f, 21, 18 + bobY, ARMOR_LIGHT); // blade
    p(f, 21, 19 + bobY, ARMOR_LIGHT);
    p(f, 21, 20 + bobY, ARMOR_MID);

    // Legs & Greaves
    // Left leg
    for (let ly = 21 + bobY; ly <= 26; ly++) {
      p(f, 14 + legOffsetL, ly, ARMOR_MID);
      p(f, 15 + legOffsetL, ly, ARMOR_DARK);
    }
    // Right leg
    for (let ry = 21 + bobY; ry <= 26; ry++) {
      p(f, 17 + legOffsetR, ry, ARMOR_LIGHT);
      p(f, 18 + legOffsetR, ry, ARMOR_MID);
    }

    // Boots
    p(f, 13 + legOffsetL, 26, OUTLINE);
    p(f, 14 + legOffsetL, 26, OUTLINE);
    p(f, 17 + legOffsetR, 26, OUTLINE);
    p(f, 18 + legOffsetR, 26, OUTLINE);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return { texture, frameCount, frameWidth, frameHeight };
}

// Procedurally generate pixel art farmer sprite sheet
function generatePixelFarmerTexture() {
  const canvas = document.createElement('canvas');
  // 6 frames: Idle0, Idle1, Work0 (raise hoe), Work1 (strike hoe), Walk0, Walk1
  const frameWidth = 32;
  const frameHeight = 32;
  const frameCount = 6;
  canvas.width = frameWidth * frameCount;
  canvas.height = frameHeight;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const OUTLINE = '#292534';
  const STRAW_LIGHT = '#e3b95d';
  const STRAW_MID = '#c59539';
  const OVERALLS_BLUE = '#4f6c8d';
  const SHIRT_CREAM = '#e8e2d4';
  const SKIN = '#f1c8a5';
  const WOOD_BROWN = '#7c5432';
  const HOE_IRON = '#67717e';

  function p(f, x, y, col) {
    ctx.fillStyle = col;
    ctx.fillRect(f * frameWidth + x, y, 1, 1);
  }

  for (let f = 0; f < frameCount; f++) {
    const isWork0 = f === 2; // raise hoe
    const isWork1 = f === 3; // strike hoe
    const isWalk = f >= 4;
    const walkStep = f - 4;
    const isIdle1 = f === 1;

    const bobY = isWalk ? (walkStep === 0 ? 0 : -1) : (isWork1 ? 1 : 0);
    const legOffsetL = isWalk ? (walkStep === 0 ? 2 : -2) : 0;
    const legOffsetR = isWalk ? (walkStep === 0 ? -2 : 2) : 0;

    // Straw Hat (Floppy brim & Crown)
    // Brim
    for (let bx = 9; bx <= 23; bx++) {
      p(f, bx, 8 + bobY, OUTLINE);
      p(f, bx, 9 + bobY, bx <= 15 ? STRAW_LIGHT : STRAW_MID);
    }
    // Crown
    for (let cx = 13; cx <= 19; cx++) {
      for (let cy = 5 + bobY; cy <= 7 + bobY; cy++) {
        p(f, cx, cy, cx <= 15 ? STRAW_LIGHT : STRAW_MID);
      }
      p(f, cx, 4 + bobY, OUTLINE);
    }

    // Farmer Face & Eyes
    for (let fx = 13; fx <= 19; fx++) {
      for (let fy = 10 + bobY; fy <= 13 + bobY; fy++) {
        p(f, fx, fy, SKIN);
      }
    }
    p(f, 15, 11 + bobY, OUTLINE); // eye
    p(f, 18, 11 + bobY, OUTLINE); // eye
    if (isIdle1) {
      // wiping brow
      p(f, 19, 10 + bobY, SHIRT_CREAM);
      p(f, 20, 10 + bobY, SKIN);
    }

    // Shirt & Overalls (Torso)
    for (let tx = 13; tx <= 19; tx++) {
      for (let ty = 14 + bobY; ty <= 20 + bobY; ty++) {
        let col = SHIRT_CREAM;
        if (ty >= 16 + bobY) col = OVERALLS_BLUE; // dungarees
        if (tx === 14 || tx === 18) col = OVERALLS_BLUE; // straps
        if (tx === 13 || tx === 19 || ty === 20 + bobY) col = OUTLINE;
        p(f, tx, ty, col);
      }
    }

    // Hoe / Pitchfork Tool
    if (isWork0) {
      // Raised high
      for (let i = 0; i < 9; i++) {
        p(f, 21 + i, 16 - i, WOOD_BROWN);
      }
      p(f, 29, 7, HOE_IRON);
      p(f, 29, 8, HOE_IRON);
    } else if (isWork1) {
      // Striking down into soil
      for (let i = 0; i < 9; i++) {
        p(f, 20 + i, 18 + i, WOOD_BROWN);
      }
      p(f, 28, 25, HOE_IRON);
      p(f, 28, 26, HOE_IRON);
      // Spark / soil fleck
      p(f, 29, 24, STRAW_LIGHT);
      p(f, 27, 24, STRAW_MID);
    } else {
      // Resting on shoulder or at side
      for (let i = 0; i < 9; i++) {
        p(f, 20 + i, 14 + i, WOOD_BROWN);
      }
      p(f, 28, 22, HOE_IRON);
      p(f, 28, 23, HOE_IRON);
    }

    // Legs
    for (let ly = 21 + bobY; ly <= 25; ly++) {
      p(f, 14 + legOffsetL, ly, OVERALLS_BLUE);
      p(f, 15 + legOffsetL, ly, OVERALLS_BLUE);
      p(f, 17 + legOffsetR, ly, OVERALLS_BLUE);
      p(f, 18 + legOffsetR, ly, OVERALLS_BLUE);
    }

    // Brown work boots
    p(f, 13 + legOffsetL, 26, WOOD_BROWN);
    p(f, 14 + legOffsetL, 26, OUTLINE);
    p(f, 17 + legOffsetR, 26, WOOD_BROWN);
    p(f, 18 + legOffsetR, 26, OUTLINE);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return { texture, frameCount, frameWidth, frameHeight };
}

// Particle System for Leaves & Straw (动作带动落叶干草)
class LeafStrawParticlePool {
  constructor(scene) {
    this.maxParticles = 40;
    this.particles = [];
    this.group = new THREE.Group();
    this.group.name = 'LeafStrawParticles';
    scene.add(this.group);

    const leafMat = new THREE.MeshBasicMaterial({
      color: 0x6e9b46,
      side: THREE.DoubleSide
    });
    const strawMat = new THREE.MeshBasicMaterial({
      color: 0xdeb34e,
      side: THREE.DoubleSide
    });

    const leafGeom = new THREE.PlaneGeometry(0.12, 0.08);
    const strawGeom = new THREE.PlaneGeometry(0.14, 0.04);

    for (let i = 0; i < this.maxParticles; i++) {
      const isStraw = i % 2 === 0;
      const mesh = new THREE.Mesh(
        isStraw ? strawGeom : leafGeom,
        isStraw ? strawMat : leafMat
      );
      mesh.visible = false;
      this.group.add(mesh);

      this.particles.push({
        mesh,
        active: false,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        rotVel: (Math.random() - 0.5) * 6.0,
        life: 0,
        maxLife: 0.8 + Math.random() * 0.4
      });
    }
  }

  spawn(x, y, z, type = 'straw') {
    const p = this.particles.find(item => !item.active);
    if (!p) return;

    p.active = true;
    p.mesh.visible = true;
    p.pos.set(x + (Math.random() - 0.5) * 0.2, y + 0.1, z + (Math.random() - 0.5) * 0.2);
    p.mesh.position.copy(p.pos);

    // Initial upward pop & random lateral drift
    p.vel.set(
      (Math.random() - 0.5) * 0.6 + 0.3, // slight wind drift
      0.8 + Math.random() * 0.5,
      (Math.random() - 0.5) * 0.6
    );
    p.life = 0;
    p.mesh.scale.set(1, 1, 1);
  }

  update(delta) {
    this.particles.forEach(p => {
      if (!p.active) return;
      p.life += delta;
      if (p.life >= p.maxLife) {
        p.active = false;
        p.mesh.visible = false;
        return;
      }

      // Gravity & air drag
      p.vel.y -= 2.2 * delta;
      p.pos.addScaledVector(p.vel, delta);
      p.mesh.position.copy(p.pos);
      p.mesh.rotation.z += p.rotVel * delta;

      // Shrink and fade
      const progress = p.life / p.maxLife;
      const scale = Math.max(0.01, 1.0 - progress * 0.8);
      p.mesh.scale.set(scale, scale, scale);
    });
  }
}

export function buildPixelCharacters(scene, camera, animatedObjects) {
  const charactersGroup = new THREE.Group();
  charactersGroup.name = 'PixelCharacters';
  scene.add(charactersGroup);

  // Particle pool for leaves & straw
  const particlePool = new LeafStrawParticlePool(scene);

  // 1. Q-VERSION PIXEL KNIGHT (村庄前的小骑士)
  const knightData = generatePixelKnightTexture();
  const knightStandee = createStandeeCharacter({
    name: 'PixelKnight',
    spriteData: knightData,
    initialPos: [0.0, 3.84, 4.8],
    scale: 1.75,
    camera,
    waypoints: [
      new THREE.Vector3(0.0, 3.84, 4.8),
      new THREE.Vector3(3.2, 3.84, 4.5),
      new THREE.Vector3(0.5, 3.84, 3.6),
      new THREE.Vector3(-3.2, 3.84, 4.4)
    ],
    patrolSpeed: 1.15,
    idleLoopsCount: 4,
    type: 'knight',
    particlePool
  });
  charactersGroup.add(knightStandee.root);
  animatedObjects.push(knightStandee);

  // 2. Q-VERSION PIXEL FARMER (农田中的农夫)
  const farmerData = generatePixelFarmerTexture();
  const farmerStandee = createStandeeCharacter({
    name: 'PixelFarmer',
    spriteData: farmerData,
    initialPos: [-4.5, 1.25, 9.8],
    scale: 1.8,
    camera,
    waypoints: [
      new THREE.Vector3(-4.5, 1.25, 9.8),
      new THREE.Vector3(-7.5, 1.25, 9.8),
      new THREE.Vector3(-1.8, 1.25, 10.5),
      new THREE.Vector3(1.2, 1.25, 13.0)
    ],
    patrolSpeed: 0.95,
    idleLoopsCount: 5,
    type: 'farmer',
    particlePool
  });
  charactersGroup.add(farmerStandee.root);
  animatedObjects.push(farmerStandee);

  // Particle pool update loop
  animatedObjects.push({
    update: (delta) => particlePool.update(delta)
  });

  return { charactersGroup, knightStandee, farmerStandee };
}

// Standee Character Factory & State Machine
function createStandeeCharacter(cfg) {
  const root = new THREE.Group();
  root.name = cfg.name;
  root.position.copy(cfg.waypoints[0]);

  const { texture, frameCount } = cfg.spriteData;

  // Custom Plane Material using the sprite texture
  // Texture frame UV setup: frameCount horizontal tiles
  const frameWidthUV = 1.0 / frameCount;

  // Clone texture for independent UV offset
  const charTexture = texture.clone();
  charTexture.needsUpdate = true;
  charTexture.repeat.set(frameWidthUV, 1.0);
  charTexture.offset.set(0, 0);

  const mat = new THREE.MeshToonMaterial({
    map: charTexture,
    gradientMap: toonGradientMap,
    transparent: true,
    alphaTest: 0.18,
    side: THREE.DoubleSide
  });

  const quadGeom = new THREE.PlaneGeometry(1.2, 1.2);
  quadGeom.translate(0, 0.6, 0); // pivot at feet

  const mesh = new THREE.Mesh(quadGeom, mat);
  mesh.castShadow = true;
  mesh.scale.set(cfg.scale, cfg.scale, cfg.scale);
  root.add(mesh);

  // Soft semi-transparent circular contact shadow on ground beneath feet
  const shadowGeom = new THREE.PlaneGeometry(1.1, 0.7);
  shadowGeom.rotateX(-Math.PI / 2);
  const contactShadow = new THREE.Mesh(shadowGeom, contactShadowMaterial);
  contactShadow.position.set(0, 0.03, 0);
  root.add(contactShadow);

  // State Machine Variables
  let currentWaypointIndex = 0;
  let state = 'IDLE'; // 'IDLE', 'WALK', 'WORK'
  let stateTimer = 0;
  let animTimer = 0;
  let currentFrame = 0;
  let idleCount = 0;
  let facingSign = 1; // 1 = right, -1 = left

  // Low-fps frame timing (5 FPS = 0.20s per frame)
  const FRAME_DURATION = 0.20;

  // Waypoints
  const waypoints = cfg.waypoints;

  function setFrame(frameIndex) {
    currentFrame = frameIndex;
    charTexture.offset.x = frameIndex * frameWidthUV;
  }

  return {
    root,
    mesh,
    update: (delta, time) => {
      // 1. Standee Billboard Yaw Alignment:
      // Face towards camera horizontal plane (acrylic standee upright posture)
      const camPos = cfg.camera.position;
      const angle = Math.atan2(camPos.x - root.position.x, camPos.z - root.position.z);
      mesh.rotation.y = angle;

      // 2. Micro Breathing & Cape Flutter Cadence (轻微呼吸律动)
      const breath = Math.sin(time * 3.5) * 0.025;
      mesh.scale.y = cfg.scale * (1.0 + breath);
      mesh.scale.x = cfg.scale * facingSign * (1.0 - breath * 0.5);

      // 3. Low-FPS Animation Cycle & Behavior State Machine
      animTimer += delta;
      stateTimer += delta;

      if (state === 'IDLE' || state === 'WORK') {
        // Idle / Work low-fps stepping
        if (animTimer >= FRAME_DURATION) {
          animTimer = 0;

          if (cfg.type === 'knight') {
            // Knight Idle: 2 frames (0 and 1)
            setFrame(currentFrame === 0 ? 1 : 0);
            idleCount++;

            // Every 4 cycles: "停顿阶段改变朝向以左右交替"
            if (idleCount % 6 === 0) {
              facingSign = -facingSign;
            }

            // After sufficient idle loops: move to next waypoint
            if (idleCount >= cfg.idleLoopsCount * 4) {
              idleCount = 0;
              state = 'WALK';
              currentWaypointIndex = (currentWaypointIndex + 1) % waypoints.length;
            }
          } else {
            // Farmer: alternating hoeing work (frames 2, 3) and inspecting idle (0, 1)
            if (idleCount < cfg.idleLoopsCount * 2) {
              // Hoe work cycle
              const nextF = currentFrame === 2 ? 3 : 2;
              setFrame(nextF);

              // On hoe strike (frame 3): burst straw & dry grass!
              if (nextF === 3) {
                cfg.particlePool.spawn(root.position.x, root.position.y, root.position.z, 'straw');
              }
            } else {
              // Idle wipe brow & look around
              setFrame(currentFrame === 0 ? 1 : 0);
              if (idleCount % 4 === 0) {
                facingSign = -facingSign; // turn left / right
              }
            }
            idleCount++;

            if (idleCount >= cfg.idleLoopsCount * 4) {
              idleCount = 0;
              state = 'WALK';
              currentWaypointIndex = (currentWaypointIndex + 1) % waypoints.length;
            }
          }
        }
      } else if (state === 'WALK') {
        // Walk State: Move towards target waypoint
        const targetWP = waypoints[currentWaypointIndex];
        const dir = targetWP.clone().sub(root.position);
        const dist = dir.length();

        // Face in direction of motion (left or right relative to screen)
        if (Math.abs(dir.x) > 0.05) {
          facingSign = dir.x >= 0 ? 1 : -1;
        }

        // Low-fps walk frames
        if (animTimer >= FRAME_DURATION) {
          animTimer = 0;
          if (cfg.type === 'knight') {
            // Walk frames 2, 3, 4, 5
            setFrame(2 + ((currentFrame - 2 + 1) % 4));
          } else {
            // Farmer walk frames 4, 5
            setFrame(currentFrame === 4 ? 5 : 4);
          }

          // Walking kicks up tiny leaves/straw specks!
          cfg.particlePool.spawn(
            root.position.x,
            root.position.y,
            root.position.z,
            cfg.type === 'knight' ? 'leaf' : 'straw'
          );
        }

        // Move position
        const moveDist = cfg.patrolSpeed * delta;
        if (dist <= moveDist) {
          root.position.copy(targetWP);
          state = cfg.type === 'knight' ? 'IDLE' : 'WORK';
          stateTimer = 0;
          idleCount = 0;
          setFrame(0);
        } else {
          dir.normalize();
          root.position.addScaledVector(dir, moveDist);
        }
      }
    }
  };
}
