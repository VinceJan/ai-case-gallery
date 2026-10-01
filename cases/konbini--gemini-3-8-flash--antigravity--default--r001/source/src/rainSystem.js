import * as THREE from 'three';

export function createRainSystem(materials, canopyBounds) {
  const rainGroup = new THREE.Group();
  rainGroup.name = 'rain_system';

  // 1. Anime Rain Streaks (Delicate cel-shaded line streaks)
  const rainCount = 1750;
  const rainPositions = new Float32Array(rainCount * 6); // 2 vertices per streak

  const rainVelocities = new Float32Array(rainCount);
  const rainLengths = new Float32Array(rainCount);

  // Bounds of the diorama rain volume
  const xMin = -12.5, xMax = 12.5;
  const zMin = -12.5, zMax = 12.5;
  const yMin = 0.05, yMax = 13.5;

  // Rain slant angle: ~12 degrees wind tilt
  const windAngle = 0.22;
  const sinWind = Math.sin(windAngle);
  const cosWind = Math.cos(windAngle);

  for (let i = 0; i < rainCount; i++) {
    const x = xMin + Math.random() * (xMax - xMin);
    const y = yMin + Math.random() * (yMax - yMin);
    const z = zMin + Math.random() * (zMax - zMin);

    const len = 0.32 + Math.random() * 0.28;
    rainLengths[i] = len;
    rainVelocities[i] = 16.0 + Math.random() * 7.0;

    const idx = i * 6;
    // Top vertex
    rainPositions[idx] = x;
    rainPositions[idx + 1] = y;
    rainPositions[idx + 2] = z;

    // Bottom vertex (slanted)
    rainPositions[idx + 3] = x - sinWind * len;
    rainPositions[idx + 4] = y - cosWind * len;
    rainPositions[idx + 5] = z;
  }

  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

  const rainMat = new THREE.LineBasicMaterial({
    color: 0xa5b4fc,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending
  });

  const rainMesh = new THREE.LineSegments(rainGeo, rainMat);
  rainGroup.add(rainMesh);

  // 2. Eaves Dripping Water Droplets (屋檐滴水)
  const dripCount = 24;
  const drips = [];
  const dripGeo = new THREE.SphereGeometry(0.025, 6, 6);
  const dripMat = new THREE.MeshBasicMaterial({
    color: 0xbfdbfe,
    transparent: true,
    opacity: 0.8
  });

  // Awning eaves line positions
  for (let i = 0; i < dripCount; i++) {
    const mesh = new THREE.Mesh(dripGeo, dripMat);
    const drip = {
      mesh: mesh,
      x: canopyBounds.canopyMinX + Math.random() * (canopyBounds.canopyMaxX - canopyBounds.canopyMinX),
      y: 4.1,
      z: canopyBounds.canopyEavesZ,
      vy: 0,
      active: Math.random() > 0.5,
      delay: Math.random() * 3.0
    };
    mesh.position.set(drip.x, drip.y, drip.z);
    mesh.visible = drip.active;
    rainGroup.add(mesh);
    drips.push(drip);
  }

  // 3. Puddle Ripple Rings (地面积水波纹)
  const maxRipples = 32;
  const ripples = [];
  const rippleGeo = new THREE.RingGeometry(0.04, 0.08, 16);
  rippleGeo.rotateX(-Math.PI / 2);

  for (let i = 0; i < maxRipples; i++) {
    const mat = materials.rippleRing.clone();
    const mesh = new THREE.Mesh(rippleGeo, mat);
    mesh.visible = false;
    rainGroup.add(mesh);

    ripples.push({
      mesh: mesh,
      mat: mat,
      scale: 0.1,
      opacity: 0.7,
      active: false,
      timer: Math.random() * 2.0
    });
  }

  function spawnRipple(x, z, groundY = 0.03) {
    for (let r of ripples) {
      if (!r.active) {
        r.active = true;
        r.mesh.visible = true;
        r.mesh.position.set(x, groundY, z);
        r.scale = 0.1;
        r.opacity = 0.75;
        r.mesh.scale.set(r.scale, 1, r.scale);
        r.mat.opacity = r.opacity;
        break;
      }
    }
  }

  // 4. Oden Simmering Steam Particles (关东煮热气)
  const steamCount = 14;
  const steamParticles = [];
  const steamGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
    depthWrite: false
  });

  const odenOrigin = new THREE.Vector3(3.7, 1.45, -4.0); // Inside store near oden pot

  for (let s = 0; s < steamCount; s++) {
    const mesh = new THREE.Mesh(steamGeo, steamMat.clone());
    const particle = {
      mesh: mesh,
      x: odenOrigin.x + (Math.random() - 0.5) * 0.35,
      y: odenOrigin.y + Math.random() * 0.4,
      z: odenOrigin.z + (Math.random() - 0.5) * 0.35,
      vy: 0.4 + Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vz: (Math.random() - 0.5) * 0.08,
      life: Math.random(),
      maxLife: 1.2 + Math.random() * 0.8
    };
    mesh.position.set(particle.x, particle.y, particle.z);
    rainGroup.add(mesh);
    steamParticles.push(particle);
  }

  // Update Animation Loop
  function update(delta) {
    // 1. Update rain streaks
    const pos = rainGeo.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      const idx = i * 6;
      const v = rainVelocities[i] * delta;
      const len = rainLengths[i];

      // Move along trajectory
      pos[idx] -= sinWind * v;
      pos[idx + 1] -= cosWind * v;
      pos[idx + 3] -= sinWind * v;
      pos[idx + 4] -= cosWind * v;

      // Reset when hitting bottom or going out of bounds
      if (pos[idx + 4] < yMin) {
        // Randomly trigger puddle ripple on the street when rain hits
        if (Math.random() > 0.96) {
          spawnRipple(pos[idx + 3], pos[idx + 5], 0.03);
        }

        const newX = xMin + Math.random() * (xMax - xMin);
        const newY = yMax;
        const newZ = zMin + Math.random() * (zMax - zMin);

        pos[idx] = newX;
        pos[idx + 1] = newY;
        pos[idx + 2] = newZ;
        pos[idx + 3] = newX - sinWind * len;
        pos[idx + 4] = newY - cosWind * len;
        pos[idx + 5] = newZ;
      }
    }
    rainGeo.attributes.position.needsUpdate = true;

    // 2. Update eaves dripping water
    for (let d of drips) {
      if (!d.active) {
        d.delay -= delta;
        if (d.delay <= 0) {
          d.active = true;
          d.mesh.visible = true;
          d.y = 4.1;
          d.vy = 0;
          d.x = canopyBounds.canopyMinX + Math.random() * (canopyBounds.canopyMaxX - canopyBounds.canopyMinX);
        }
      } else {
        d.vy += 9.8 * delta; // Gravity
        d.y -= d.vy * delta;

        if (d.y <= 0.22) { // Hits sidewalk
          spawnRipple(d.x, d.z, 0.22);
          d.active = false;
          d.mesh.visible = false;
          d.delay = 0.8 + Math.random() * 2.5;
        } else {
          d.mesh.position.set(d.x, d.y, d.z);
        }
      }
    }

    // 3. Update expanding puddle ripple rings
    for (let r of ripples) {
      if (r.active) {
        r.scale += delta * 1.35;
        r.opacity -= delta * 0.95;

        if (r.opacity <= 0.0) {
          r.active = false;
          r.mesh.visible = false;
        } else {
          r.mesh.scale.set(r.scale, 1, r.scale);
          r.mat.opacity = r.opacity;
        }
      }
    }

    // 4. Update Oden steam
    for (let p of steamParticles) {
      p.life += delta;
      if (p.life >= p.maxLife) {
        p.life = 0;
        p.x = odenOrigin.x + (Math.random() - 0.5) * 0.35;
        p.y = odenOrigin.y;
        p.z = odenOrigin.z + (Math.random() - 0.5) * 0.35;
      } else {
        p.y += p.vy * delta;
        p.x += p.vx * delta;
        p.z += p.vz * delta;

        const progress = p.life / p.maxLife;
        const scale = 0.5 + progress * 1.5;
        p.mesh.scale.set(scale, scale, scale);
        p.mesh.material.opacity = (1.0 - progress) * 0.25;
        p.mesh.position.set(p.x, p.y, p.z);
      }
    }
  }

  return {
    group: rainGroup,
    update: update
  };
}
