import * as THREE from 'three';

// Procedural 2D Pixel Art Generator for Chibi Knight and Farmer
export class PixelCharacterSystem {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.group = new THREE.Group();

    this.particles = [];
    this.characters = [];

    this.initKnight();
    this.initFarmer();

    this.scene.add(this.group);
  }

  // Draw 16x16 or 20x20 pixel sprites on canvas
  createKnightSpriteSheet() {
    // 4 Walk frames + 2 Idle frames = 6 frames of 20x24 pixels
    const frameW = 24;
    const frameH = 28;
    const totalFrames = 6;

    const canvas = document.createElement('canvas');
    canvas.width = frameW * totalFrames;
    canvas.height = frameH;
    const ctx = canvas.getContext('2d');

    // Harmonized palette (slightly desaturated to match 3D cel-shaded scene)
    const C = {
      outline: '#272528',
      helmDark: '#6b7280',
      helmLight: '#9ca3af',
      helmHighlight: '#d1d5db',
      visor: '#1e293b',
      visorGlint: '#67e8f9',
      armorPlate: '#85929e',
      tabardBlue: '#3b82f6',
      goldCrest: '#f59e0b',
      capeRed: '#b91c1c',
      capeDark: '#7f1d1d',
      skin: '#fbcfe8',
      bootBrown: '#5c3a21',
      swordSilver: '#cbd5e1',
      shieldTrim: '#d97706',
    };

    // Draw pixel helper
    const p = (ox, x, y, col) => {
      ctx.fillStyle = col;
      ctx.fillRect(ox + x, y, 1, 1);
    };

    for (let f = 0; f < totalFrames; f++) {
      const ox = f * frameW;
      const isIdle = f >= 4;
      const idleFrame = f - 4;
      const walkFrame = f;

      // Breathing / bob offset
      const bobY = isIdle ? (idleFrame === 1 ? -1 : 0) : (walkFrame % 2 === 1 ? -1 : 0);
      const legStep = isIdle ? 0 : (walkFrame === 0 ? -1 : (walkFrame === 2 ? 1 : 0));
      const capeFlutter = isIdle ? (idleFrame * 1) : ((walkFrame % 2) * 1);

      // 1. Cape behind
      for (let y = 14; y <= 23; y++) {
        for (let x = 6 - capeFlutter; x <= 11; x++) {
          p(ox, x, y + bobY, (x === 6 - capeFlutter || y === 23) ? C.capeDark : C.capeRed);
        }
      }

      // 2. Helmet & Visor
      // Plume / crest
      p(ox, 11, 2 + bobY, C.capeRed);
      p(ox, 11, 3 + bobY, C.capeRed);
      p(ox, 12, 3 + bobY, C.capeDark);

      // Helm dome
      for (let y = 4; y <= 11; y++) {
        for (let x = 8; x <= 16; x++) {
          let col = C.helmLight;
          if (x === 8 || x === 16 || y === 4) col = C.outline;
          else if (x <= 10) col = C.helmHighlight;
          else if (x >= 14) col = C.helmDark;
          p(ox, x, y + bobY, col);
        }
      }

      // Visor slit
      for (let x = 11; x <= 15; x++) {
        p(ox, x, 8 + bobY, C.visor);
      }
      p(ox, 13, 8 + bobY, C.visorGlint);

      // 3. Torso & Tabard
      for (let y = 12; y <= 19; y++) {
        for (let x = 9; x <= 15; x++) {
          let col = C.tabardBlue;
          if (x === 9 || x === 15 || y === 19) col = C.outline;
          else if (x === 12 && (y === 14 || y === 15)) col = C.goldCrest;
          else if (y === 15 && (x >= 11 && x <= 13)) col = C.goldCrest;
          p(ox, x, y + bobY, col);
        }
      }

      // 4. Arms & Shield / Sword
      // Shield on left
      for (let sy = 13; sy <= 19; sy++) {
        for (let sx = 6; sx <= 9; sx++) {
          p(ox, sx, sy + bobY, (sx === 6 || sy === 19) ? C.shieldTrim : C.tabardBlue);
        }
      }
      // Sword on right
      p(ox, 16, 14 + bobY, C.goldCrest); // guard
      p(ox, 17, 13 + bobY, C.swordSilver); // blade
      p(ox, 18, 12 + bobY, C.swordSilver);
      p(ox, 19, 11 + bobY, C.swordSilver);

      // 5. Legs & Boots (Animated steps)
      // Left leg
      const lY = 20 + bobY;
      p(ox, 10 + legStep, lY, C.armorPlate);
      p(ox, 10 + legStep, lY + 1, C.bootBrown);
      p(ox, 10 + legStep, lY + 2, C.bootBrown);

      // Right leg
      p(ox, 14 - legStep, lY, C.armorPlate);
      p(ox, 14 - legStep, lY + 1, C.bootBrown);
      p(ox, 14 - legStep, lY + 2, C.bootBrown);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return { texture: tex, totalFrames, frameW, frameH };
  }

  // Draw Farmer Sprite Sheet
  createFarmerSpriteSheet() {
    const frameW = 24;
    const frameH = 28;
    const totalFrames = 6;

    const canvas = document.createElement('canvas');
    canvas.width = frameW * totalFrames;
    canvas.height = frameH;
    const ctx = canvas.getContext('2d');

    const C = {
      outline: '#2b231d',
      strawHatLight: '#fcd34d',
      strawHatDark: '#d97706',
      hatBand: '#b91c1c',
      skin: '#fed7aa',
      shirtRed: '#ef4444',
      shirtPlaid: '#b91c1c',
      overallsBlue: '#1d4ed8',
      overallsDark: '#1e3a8a',
      bootBrown: '#5c3a21',
      pitchforkWood: '#78350f',
      pitchforkIron: '#94a3b8',
    };

    const p = (ox, x, y, col) => {
      ctx.fillStyle = col;
      ctx.fillRect(ox + x, y, 1, 1);
    };

    for (let f = 0; f < totalFrames; f++) {
      const ox = f * frameW;
      const isWork = f < 4; // 4 farming hoe/pitchfork swing frames
      const isIdle = f >= 4;
      const bobY = isIdle ? ((f - 4) === 1 ? -1 : 0) : (f % 2 === 1 ? -1 : 0);
      const swing = isWork ? (f === 1 ? 2 : (f === 2 ? 4 : (f === 3 ? 2 : 0))) : 0;

      // 1. Straw Hat (Wide brim + peaked crown)
      for (let x = 6; x <= 18; x++) {
        p(ox, x, 7 + bobY, (x === 6 || x === 18) ? C.outline : C.strawHatDark);
        p(ox, x, 8 + bobY, C.strawHatLight);
      }
      for (let y = 3; y <= 6; y++) {
        for (let x = 9; x <= 15; x++) {
          p(ox, x, y + bobY, (y === 6) ? C.hatBand : ((x === 9 || x === 15) ? C.strawHatDark : C.strawHatLight));
        }
      }

      // 2. Head / Face
      for (let y = 9; y <= 12; y++) {
        for (let x = 10; x <= 14; x++) {
          p(ox, x, y + bobY, (x === 10 || x === 14) ? C.outline : C.skin);
        }
      }
      p(ox, 12, 10 + bobY, '#332211'); // eye dot

      // 3. Torso & Overalls
      for (let y = 13; y <= 19; y++) {
        for (let x = 9; x <= 15; x++) {
          let col = (y <= 14) ? C.shirtRed : C.overallsBlue;
          if (x === 9 || x === 15 || y === 19) col = C.outline;
          else if (y >= 15 && (x === 10 || x === 14)) col = C.overallsDark; // suspenders
          p(ox, x, y + bobY, col);
        }
      }

      // 4. Pitchfork
      const forkX = 16 - swing;
      const forkY = 10 + swing;
      for (let py = forkY; py <= forkY + 12; py++) {
        p(ox, forkX, py, C.pitchforkWood);
      }
      // Prongs
      p(ox, forkX - 1, forkY - 1, C.pitchforkIron);
      p(ox, forkX, forkY - 2, C.pitchforkIron);
      p(ox, forkX + 1, forkY - 1, C.pitchforkIron);

      // 5. Legs & Boots
      const lY = 20 + bobY;
      p(ox, 10, lY, C.overallsBlue);
      p(ox, 10, lY + 1, C.bootBrown);
      p(ox, 10, lY + 2, C.bootBrown);

      p(ox, 14, lY, C.overallsBlue);
      p(ox, 14, lY + 1, C.bootBrown);
      p(ox, 14, lY + 2, C.bootBrown);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return { texture: tex, totalFrames, frameW, frameH };
  }

  // Create lit 2.5D pixel billboard plane
  createPixelBillboard(spriteData) {
    const geo = new THREE.PlaneGeometry(1.6, 1.86);
    // Setup UV mapping for single frame
    const uStep = 1 / spriteData.totalFrames;
    const uvs = geo.attributes.uv;
    uvs.setXY(0, 0, 1);
    uvs.setXY(1, uStep, 1);
    uvs.setXY(2, 0, 0);
    uvs.setXY(3, uStep, 0);

    const mat = new THREE.MeshToonMaterial({
      map: spriteData.texture,
      transparent: true,
      alphaTest: 0.1,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = false; // We create soft custom translucent shadow below
    return { mesh, mat, uStep, totalFrames: spriteData.totalFrames };
  }

  // Soft translucent contact shadow disk on ground
  createContactShadow() {
    const shadowGeo = new THREE.CircleGeometry(0.55, 12);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x1a1815,
      transparent: true,
      opacity: 0.28,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    return shadowMesh;
  }

  initKnight() {
    const spriteData = this.createKnightSpriteSheet();
    const billboard = this.createPixelBillboard(spriteData);

    const shadow = this.createContactShadow();
    this.group.add(shadow);

    const charGroup = new THREE.Group();
    charGroup.add(billboard.mesh);
    billboard.mesh.position.y = 0.93;
    this.group.add(charGroup);

    // Waypoints for Knight Patrol on the village main street & castle entrance
    const waypoints = [
      new THREE.Vector3(0.0, 2.65, 0.5),   // village center street
      new THREE.Vector3(-1.8, 2.65, 2.5),  // near market square
      new THREE.Vector3(0.0, 3.4, -3.0),   // base of castle stairs
      new THREE.Vector3(1.5, 2.65, 1.5),   // near well
    ];

    this.characters.push({
      type: 'knight',
      group: charGroup,
      billboard: billboard,
      shadow: shadow,
      waypoints: waypoints,
      currentWpIndex: 0,
      targetWpIndex: 1,
      state: 'patrolling', // 'patrolling' | 'pausing'
      timer: 0,
      pauseDuration: 3.5, // pause a few seconds at waypoint
      moveSpeed: 0.75,
      facingRight: true,
      fpsTimer: 0,
      fpsInterval: 0.18, // ~5.5 FPS authentic retro pixel rate
      currentFrame: 0,
      leafParticleColor: 0xd35400, // autumn leaves kick-up
    });
  }

  initFarmer() {
    const spriteData = this.createFarmerSpriteSheet();
    const billboard = this.createPixelBillboard(spriteData);

    const shadow = this.createContactShadow();
    this.group.add(shadow);

    const charGroup = new THREE.Group();
    charGroup.add(billboard.mesh);
    billboard.mesh.position.y = 0.93;
    this.group.add(charGroup);

    // Waypoints for Farmer moving between wheat ridges & haystacks
    const waypoints = [
      new THREE.Vector3(6.5, 1.25, 13.0),  // between wheat rows
      new THREE.Vector3(8.5, 1.25, 16.5),  // near hay bales
      new THREE.Vector3(5.0, 1.25, 18.0),  // lower wheat plot
      new THREE.Vector3(3.2, 1.25, 14.0),  // near path
    ];

    this.characters.push({
      type: 'farmer',
      group: charGroup,
      billboard: billboard,
      shadow: shadow,
      waypoints: waypoints,
      currentWpIndex: 0,
      targetWpIndex: 1,
      state: 'pausing', // starts tilling
      timer: 0,
      pauseDuration: 4.5,
      moveSpeed: 0.55,
      facingRight: false,
      fpsTimer: 0,
      fpsInterval: 0.22, // ~4.5 FPS retro work animation
      currentFrame: 0,
      leafParticleColor: 0xe67e22, // dry straw / dust kick-up
    });
  }

  // Kick up tiny autumn leaves / dry straw particles when stepping
  emitStepParticles(x, y, z, color) {
    for (let i = 0; i < 2; i++) {
      const pGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
      const pMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });
      const particle = new THREE.Mesh(pGeo, pMat);
      particle.position.set(
        x + (Math.random() - 0.5) * 0.3,
        y + 0.1,
        z + (Math.random() - 0.5) * 0.3
      );
      particle.userData = {
        velX: (Math.random() - 0.5) * 0.6,
        velY: 0.4 + Math.random() * 0.4,
        velZ: (Math.random() - 0.5) * 0.6,
        life: 0.6,
        maxLife: 0.6,
      };
      this.group.add(particle);
      this.particles.push(particle);
    }
  }

  update(delta, time) {
    this.characters.forEach(char => {
      // 1. Billboard Orientation:
      // Face towards camera horizontal plane (Y-axis billboard keeps natural 2.5D perspective)
      char.group.rotation.y = this.camera.rotation.y;

      // 2. Logic & Waypoint navigation
      const currentTarget = char.waypoints[char.targetWpIndex];
      const pos = char.group.position;
      const dx = currentTarget.x - pos.x;
      const dz = currentTarget.z - pos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (char.state === 'patrolling') {
        if (dist < 0.15) {
          // Arrived at waypoint! Switch to pause/idle phase
          char.state = 'pausing';
          char.timer = 0;
          char.currentWpIndex = char.targetWpIndex;
          char.targetWpIndex = (char.targetWpIndex + 1) % char.waypoints.length;
          // Alternate facing left/right on pause
          char.facingRight = !char.facingRight;
        } else {
          // Move towards target
          const moveStep = char.moveSpeed * delta;
          pos.x += (dx / dist) * moveStep;
          pos.z += (dz / dist) * moveStep;
          // Smooth terrain Y interpolation
          pos.y = currentTarget.y;

          // Set facing direction based on movement
          char.facingRight = dx > 0;

          // Emit footstep particles (leaves / dry straw)
          if (Math.random() < 0.25) {
            this.emitStepParticles(pos.x, pos.y, pos.z, char.leafParticleColor);
          }
        }
      } else {
        // Pausing / Working phase
        char.timer += delta;
        if (char.timer > char.pauseDuration) {
          char.state = 'patrolling';
          char.timer = 0;
        }
      }

      // Update Contact Shadow position
      char.shadow.position.set(pos.x, pos.y + 0.02, pos.z);

      // 3. Low-FPS Frame Stepping Animation
      char.fpsTimer += delta;
      if (char.fpsTimer >= char.fpsInterval) {
        char.fpsTimer = 0;
        if (char.state === 'patrolling') {
          // Walk frames (0 to 3)
          char.currentFrame = (char.currentFrame + 1) % 4;
        } else {
          // Idle or Farm Work frames (4 or 5 for knight, 0-3 for farmer working)
          if (char.type === 'knight') {
            char.currentFrame = 4 + (Math.floor(time * 2) % 2);
          } else {
            // Farmer tilling animation
            char.currentFrame = (char.currentFrame + 1) % 4;
          }
        }

        // Update UV coordinates on the billboard mesh for current frame
        const uStep = char.billboard.uStep;
        let uStart = char.currentFrame * uStep;
        let uEnd = uStart + uStep;

        // Direction flipping (left vs right)
        if (!char.facingRight) {
          const temp = uStart;
          uStart = uEnd;
          uEnd = temp;
        }

        const uvs = char.billboard.mesh.geometry.attributes.uv;
        uvs.setXY(0, uStart, 1);
        uvs.setXY(1, uEnd, 1);
        uvs.setXY(2, uStart, 0);
        uvs.setXY(3, uEnd, 0);
        uvs.needsUpdate = true;
      }
    });

    // 4. Update Footstep Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      const d = p.userData;
      d.life -= delta;
      if (d.life <= 0) {
        this.group.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        this.particles.splice(i, 1);
      } else {
        p.position.x += d.velX * delta;
        p.position.y += d.velY * delta;
        p.position.z += d.velZ * delta;
        d.velY -= 1.8 * delta; // gravity
        p.rotation.x += 3.0 * delta;
        p.rotation.y += 2.0 * delta;
        p.material.opacity = d.life / d.maxLife;
      }
    }
  }
}
