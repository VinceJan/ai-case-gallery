import * as THREE from 'three';

export function createRainSystem(scene, dioramaSize = 16) {
  // ----------------------------------------------------
  // 1. FALLING RAIN STREAKS PARTICLE SYSTEM
  // ----------------------------------------------------
  const rainCount = 2200;
  const rainGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(rainCount * 2 * 3); // 2 vertices per rain streak line
  const speeds = new Float32Array(rainCount);

  const rangeX = dioramaSize + 2;
  const rangeZ = dioramaSize + 2;
  const topY = 12.0;
  const bottomY = -0.2;
  const rainLength = 0.42;
  const windTiltX = -0.06;
  const windTiltZ = 0.03;

  for (let i = 0; i < rainCount; i++) {
    const x = (Math.random() - 0.5) * rangeX;
    const y = Math.random() * (topY - bottomY) + bottomY;
    const z = (Math.random() - 0.5) * rangeZ;
    const speed = 13.0 + Math.random() * 6.0;

    // Head of raindrop
    positions[i * 6 + 0] = x;
    positions[i * 6 + 1] = y;
    positions[i * 6 + 2] = z;

    // Tail of raindrop (angled by wind tilt)
    positions[i * 6 + 3] = x - windTiltX * rainLength;
    positions[i * 6 + 4] = y + rainLength;
    positions[i * 6 + 5] = z - windTiltZ * rainLength;

    speeds[i] = speed;
  }

  rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const rainMat = new THREE.LineBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });


  const rainLines = new THREE.LineSegments(rainGeo, rainMat);
  rainLines.name = 'RainParticles';
  scene.add(rainLines);

  // ----------------------------------------------------
  // 2. ROOF EAVES DRIPPING DROPLETS & SPLASHES
  // ----------------------------------------------------
  const dripCount = 18;
  const drips = [];
  const dripMat = new THREE.MeshBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.75
  });
  const splashMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide
  });

  const dripGeo = new THREE.SphereGeometry(0.02, 6, 6);
  const splashGeo = new THREE.RingGeometry(0.01, 0.04, 16);

  // Eaves edge coordinate span: X: [-6.8, 0.5], Y: 3.3, Z: 0.75
  for (let i = 0; i < dripCount; i++) {
    const startX = -6.6 + (i / dripCount) * 7.0;
    const dripMesh = new THREE.Mesh(dripGeo, dripMat);
    scene.add(dripMesh);

    const splashMesh = new THREE.Mesh(splashGeo, splashMat.clone());
    splashMesh.rotation.x = -Math.PI / 2;
    splashMesh.position.set(startX, 0.125, 0.75);
    splashMesh.visible = false;
    scene.add(splashMesh);

    drips.push({
      mesh: dripMesh,
      splash: splashMesh,
      startX: startX,
      startY: 3.3,
      startZ: 0.75,
      y: 3.3,
      vy: 0,
      active: true,
      timer: Math.random() * 2.0,
      splashAge: 0
    });
  }

  // ----------------------------------------------------
  // 3. ANIMATION UPDATE LOOP
  // ----------------------------------------------------
  return {
    update(delta, elapsed, models) {
      // 1. Update rain streaks
      const posAttr = rainGeo.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < rainCount; i++) {
        const idx = i * 6;
        let y = arr[idx + 1] - speeds[i] * delta;
        let x = arr[idx + 0] + windTiltX * speeds[i] * delta;
        let z = arr[idx + 2] + windTiltZ * speeds[i] * delta;

        // Wrap around when falling beneath pedestal
        if (y < bottomY) {
          y = topY;
          x = (Math.random() - 0.5) * rangeX;
          z = (Math.random() - 0.5) * rangeZ;
        }

        arr[idx + 0] = x;
        arr[idx + 1] = y;
        arr[idx + 2] = z;

        arr[idx + 3] = x - windTiltX * rainLength;
        arr[idx + 4] = y + rainLength;
        arr[idx + 5] = z - windTiltZ * rainLength;
      }
      posAttr.needsUpdate = true;

      // 2. Update eaves drips & splashes
      drips.forEach((drip) => {
        if (!drip.active) {
          drip.timer -= delta;
          if (drip.timer <= 0) {
            drip.active = true;
            drip.y = drip.startY;
            drip.vy = 0;
            drip.mesh.visible = true;
          }
        } else {
          drip.vy += 9.8 * delta;
          drip.y -= drip.vy * delta;
          drip.mesh.position.set(drip.startX, drip.y, drip.startZ);

          if (drip.y <= 0.125) {
            drip.active = false;
            drip.mesh.visible = false;
            drip.timer = 0.6 + Math.random() * 1.8;

            // Trigger splash ring
            drip.splash.visible = true;
            drip.splashAge = 0;
            drip.splash.scale.set(1, 1, 1);
          }
        }

        // Expand & fade splash ring
        if (drip.splash.visible) {
          drip.splashAge += delta;
          const s = 1.0 + drip.splashAge * 4.0;
          drip.splash.scale.set(s, s, 1);
          drip.splash.material.opacity = Math.max(0, 0.6 - drip.splashAge * 1.5);
          if (drip.splashAge > 0.4) {
            drip.splash.visible = false;
          }
        }
      });

      // 3. Update ground shader time uniform (ripples & puddles)
      if (models.street && models.street.userData.wetRoadMaterial) {
        models.street.userData.wetRoadMaterial.uniforms.uTime.value = elapsed;
      }

      // 4. Update window rain glass shader time
      if (models.store && models.store.userData.glassMaterial) {
        models.store.userData.glassMaterial.uniforms.uTime.value = elapsed;
      }

      // 5. Automatic Sliding Door occasional open/close cycle
      if (models.store && models.store.userData.leftDoor) {
        // Door cycle: 14 seconds period
        // [0, 6s]: closed
        // [6, 7.5s]: gliding open
        // [7.5, 11s]: fully open (welcoming customers!)
        // [11, 12.5s]: gliding shut
        // [12.5, 14s]: closed
        const cycle = elapsed % 14.0;
        let openAmount = 0.0;

        if (cycle >= 6.0 && cycle < 7.5) {
          // Opening
          const t = (cycle - 6.0) / 1.5;
          openAmount = t * t * (3.0 - 2.0 * t); // smoothstep
        } else if (cycle >= 7.5 && cycle < 11.0) {
          // Fully open
          openAmount = 1.0;
        } else if (cycle >= 11.0 && cycle < 12.5) {
          // Closing
          const t = (cycle - 11.0) / 1.5;
          openAmount = 1.0 - t * t * (3.0 - 2.0 * t);
        } else {
          openAmount = 0.0;
        }

        const maxSlide = models.store.userData.doorW * 0.88;
        models.store.userData.leftDoor.position.x = -openAmount * maxSlide;
        models.store.userData.rightDoor.position.x = openAmount * maxSlide;
      }

      // 6. Sign Subtle Organic Neon Voltage Hum/Flicker
      if (models.store && models.store.userData.signMaterial) {
        // Natural micro-fluctuation with rare brief flicker
        const noiseFlicker = Math.sin(elapsed * 24.0) * 0.03 + Math.sin(elapsed * 7.5) * 0.02;
        let dip = 0.0;
        if (Math.sin(elapsed * 1.7) > 0.98) {
          dip = 0.12 * Math.sin(elapsed * 80.0);
        }
        models.store.userData.signMaterial.opacity = 1.0 - Math.abs(dip) + noiseFlicker;
      }

      // 7. Spinning AC Outdoor Unit Fan
      if (models.furniture && models.furniture.getObjectByName('ACOutdoorUnits')) {
        const acUnit = models.furniture.getObjectByName('ACOutdoorUnits');
        if (acUnit.userData.fanBladeGroup) {
          acUnit.userData.fanBladeGroup.rotation.z += delta * 9.0;
        }
      }

      // 8. Distant Pedestrian Traffic Signal gentle color transitions
      if (models.furniture && models.furniture.getObjectByName('TrafficSignal')) {
        const sig = models.furniture.getObjectByName('TrafficSignal');
        const sigCycle = elapsed % 10.0;
        const isWalk = sigCycle < 6.0;

        if (sig.userData.greenLensMat && sig.userData.redLensMat) {
          // Walk is green, wait is red
          if (isWalk) {
            // Blink green when almost changing (from 4.5s to 6.0s)
            if (sigCycle > 4.5 && Math.sin(elapsed * 12.0) > 0) {
              sig.userData.greenLensMat.color.setHex(0x064e3b); // dimmed
            } else {
              sig.userData.greenLensMat.color.setHex(0x10b981); // bright walk green
            }
            sig.userData.redLensMat.color.setHex(0x450a0a); // dark red
          } else {
            sig.userData.greenLensMat.color.setHex(0x064e3b); // dark green
            sig.userData.redLensMat.color.setHex(0xef4444); // bright stop red
          }
        }
      }
    }
  };
}
