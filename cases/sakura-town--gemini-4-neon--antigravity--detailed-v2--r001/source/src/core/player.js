import * as THREE from 'three';
import { toonMat } from './toonMaterials.js';

export class PlayerController {
  constructor(scene, camera, collision, audio) {
    this.scene = scene;
    this.camera = camera;
    this.collision = collision;
    this.audio = audio;

    this.position = new THREE.Vector3(-24.2, 0, -21.3); // Starts on North Lane right beside Sakura House mailbox facing East toward Station & Town
    this.facingYaw = Math.PI * 0.5; // Facing East (+X) along North Lane toward Station & Crossing
    this.speedWalk = 4.4;
    this.speedRun = 7.4;

    // Third-person orbit camera state (positioned cleanly over the open road, zero eave obstruction)
    this.camYaw = -Math.PI * 0.58;
    this.camPitch = 0.28;
    this.camDist = 6.6;
    this.minDist = 3.2;
    this.maxDist = 13.5;

    this.keys = new Set();
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.controlsLocked = false;

    this.sitting = null; // { seatPos, seatYaw, returnPos }
    this.walkCycle = 0;
    this.stepTimer = 0;

    this.mesh = this._buildCharacterMesh();
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);

    this._bindEvents();
  }

  _buildCharacterMesh() {
    const root = new THREE.Group();

    const matSkin = toonMat(0xffe1c9);
    const matHair = toonMat(0x2f2938);
    const matCardigan = toonMat(0x4b6b8f); // Soft indigo-blue cardigan
    const matShirt = toonMat(0xf8f3eb);
    const matPants = toonMat(0x46444e);
    const matShoes = toonMat(0x6b4735);
    const matBag = toonMat(0xc78b56);
    const matScarf = toonMat(0xe98aa3);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.16, 0.56, 0.18);
    this.leftLeg = new THREE.Mesh(legGeo, matPants);
    this.leftLeg.position.set(-0.11, 0.32, 0);
    this.leftLeg.castShadow = true;

    this.rightLeg = new THREE.Mesh(legGeo, matPants);
    this.rightLeg.position.set(0.11, 0.32, 0);
    this.rightLeg.castShadow = true;

    const shoeGeo = new THREE.BoxGeometry(0.17, 0.1, 0.24);
    const lShoe = new THREE.Mesh(shoeGeo, matShoes);
    lShoe.position.set(0, -0.26, 0.03);
    this.leftLeg.add(lShoe);
    const rShoe = new THREE.Mesh(shoeGeo, matShoes);
    rShoe.position.set(0, -0.26, 0.03);
    this.rightLeg.add(rShoe);

    // Torso
    this.torsoGroup = new THREE.Group();
    this.torsoGroup.position.y = 0.62;

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.25), matCardigan);
    body.position.y = 0.26;
    body.castShadow = true;
    this.torsoGroup.add(body);

    const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.44, 0.26), matShirt);
    shirt.position.set(0, 0.26, 0.01);
    this.torsoGroup.add(shirt);

    const scarf = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.1, 0.29), matScarf);
    scarf.position.y = 0.52;
    this.torsoGroup.add(scarf);

    // Crossbody messenger bag
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.24), matBag);
    bag.position.set(-0.24, 0.06, -0.02);
    bag.castShadow = true;
    this.torsoGroup.add(bag);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.13, 0.46, 0.14);
    this.leftArm = new THREE.Mesh(armGeo, matCardigan);
    this.leftArm.position.set(-0.28, 0.28, 0);
    this.leftArm.castShadow = true;
    this.torsoGroup.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeo, matCardigan);
    this.rightArm.position.set(0.28, 0.28, 0);
    this.rightArm.castShadow = true;
    this.torsoGroup.add(this.rightArm);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.72;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.21, 14, 12), matSkin);
    head.castShadow = true;
    headGroup.add(head);

    // Stylized anime hair cap & bangs
    const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.225, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), matHair);
    hairTop.position.y = 0.02;
    hairTop.castShadow = true;
    headGroup.add(hairTop);

    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.14), matHair);
    hairBack.position.set(0, -0.04, -0.15);
    headGroup.add(hairBack);

    // Simple friendly eyes facing +Z
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x24202b });
    const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), eyeMat);
    lEye.position.set(-0.075, 0.0, 0.19);
    const rEye = lEye.clone();
    rEye.position.x = 0.075;
    headGroup.add(lEye, rEye);

    this.torsoGroup.add(headGroup);

    // Transparent spring umbrella (shown only when raining)
    this.umbrella = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.95, 6), toonMat(0x555562));
    pole.position.set(0.26, 0.88, 0.08);
    const canopy = new THREE.Mesh(
      new THREE.ConeGeometry(0.66, 0.24, 10, 1, true),
      toonMat(0xfff5f8, { transparent: true, opacity: 0.72, side: THREE.DoubleSide })
    );
    canopy.position.set(0.26, 1.36, 0.08);
    this.umbrella.add(pole, canopy);
    this.umbrella.visible = false;
    this.torsoGroup.add(this.umbrella);

    root.add(this.leftLeg, this.rightLeg, this.torsoGroup);
    return root;
  }

  _bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        if (!this.controlsLocked) e.preventDefault();
      }
      this.keys.add(e.code);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    window.addEventListener('blur', () => {
      this.keys.clear();
      this.isDragging = false;
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('.panel, .modal-card, .dialogue-box, .title-card, .inventory-bar')) return;
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging || this.controlsLocked) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.camYaw -= dx * 0.0065;
      this.camPitch = Math.max(0.14, Math.min(0.95, this.camPitch + dy * 0.0045));
    });

    window.addEventListener('wheel', (e) => {
      if (this.controlsLocked) return;
      if (e.target.closest('.modal-card')) return;
      this.camDist = Math.max(this.minDist, Math.min(this.maxDist, this.camDist + e.deltaY * 0.006));
    }, { passive: true });
  }

  setRaining(isRaining) {
    // Fold umbrella when indoors
    const indoors = this.isIndoors();
    this.umbrella.visible = isRaining && !indoors;
  }

  isIndoors() {
    const { x, z } = this.position;
    return (
      (x >= -20.5 && x <= -9.5 && z >= 6.5 && z <= 14.5) ||
      (x >= 9.5 && x <= 20.5 && z >= 6.5 && z <= 14.5) ||
      (x >= -30.5 && x <= -21.5 && z >= -30.5 && z <= -22.5) ||
      (x >= -16.2 && x <= -6.8 && z >= -23.0 && z <= -18.2)
    );
  }

  sitDown(seatPos, seatYaw) {
    this.sitting = {
      seatPos: seatPos.clone(),
      seatYaw,
      returnPos: this.position.clone(),
    };
    this.position.copy(seatPos);
    this.facingYaw = seatYaw;
    this.mesh.position.copy(seatPos);
    this.mesh.rotation.y = seatYaw;
    this.torsoGroup.position.y = 0.44;
    this.leftLeg.rotation.x = -Math.PI * 0.46;
    this.rightLeg.rotation.x = -Math.PI * 0.46;
    this.leftArm.rotation.x = 0;
    this.rightArm.rotation.x = 0;
  }

  standUp() {
    if (!this.sitting) return;
    this.position.copy(this.sitting.returnPos);
    this.sitting = null;
    this.torsoGroup.position.y = 0.62;
    this.leftLeg.rotation.x = 0;
    this.rightLeg.rotation.x = 0;
  }

  teleport(x, z, yaw = null) {
    if (this.sitting) this.standUp();
    const y = this.collision.getGroundHeight(x, z);
    this.position.set(x, y, z);
    if (yaw !== null) this.facingYaw = yaw;
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.facingYaw;
  }

  update(dt, isRaining) {
    if (!this.controlsLocked) {
      // Q / E camera orbit keys
      if (this.keys.has('KeyQ')) this.camYaw += 1.9 * dt;
      if (this.keys.has('KeyE') === false) { /* E is interact */ }
      if (this.keys.has('BracketLeft')) this.camYaw += 1.9 * dt;
      if (this.keys.has('BracketRight')) this.camYaw -= 1.9 * dt;
      // Right-hand rotation convenience: ArrowLeft / ArrowRight also rotate if Shift not held? Better: use Q and R or drag! Wait: let's support Q and C? Let's keep Q/R and drag, and let Arrow keys move cleanly too.
      if (this.keys.has('KeyR')) this.camYaw -= 1.9 * dt;
    }

    let moveForward = 0;
    let moveRight = 0;
    if (!this.controlsLocked) {
      if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) moveForward += 1;
      if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) moveForward -= 1;
      if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) moveRight += 1;
      if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) moveRight -= 1;
    }

    if (this.sitting) {
      if (moveForward !== 0 || moveRight !== 0) {
        this.standUp();
      } else {
        this.setRaining(isRaining);
        this._updateCamera(dt);
        return;
      }
    }

    const moving = moveForward !== 0 || moveRight !== 0;
    if (moving) {
      const running = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
      const speed = running ? this.speedRun : this.speedWalk;

      // Camera forward vector projected on XZ
      const forwardX = -Math.sin(this.camYaw);
      const forwardZ = -Math.cos(this.camYaw);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);

      let dx = forwardX * moveForward + rightX * moveRight;
      let dz = forwardZ * moveForward + rightZ * moveRight;
      const len = Math.hypot(dx, dz) || 1;
      dx /= len;
      dz /= len;

      const nextX = this.position.x + dx * speed * dt;
      const nextZ = this.position.z + dz * speed * dt;
      const resolved = this.collision.resolve(nextX, nextZ, 0.4);

      this.position.x = resolved.x;
      this.position.z = resolved.z;
      this.position.y = this.collision.getGroundHeight(resolved.x, resolved.z);

      // Smooth yaw turn
      const targetYaw = Math.atan2(dx, dz);
      let diff = targetYaw - this.facingYaw;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.facingYaw += diff * Math.min(1, dt * 12);

      // Walk animation
      const freq = running ? 13 : 9;
      this.walkCycle += dt * freq;
      const swing = Math.sin(this.walkCycle) * (running ? 0.65 : 0.45);
      this.leftLeg.rotation.x = swing;
      this.rightLeg.rotation.x = -swing;
      this.leftArm.rotation.x = -swing * 0.75;
      this.rightArm.rotation.x = swing * 0.75;
      this.torsoGroup.position.y = 0.62 + Math.abs(Math.sin(this.walkCycle)) * 0.04;

      // Footsteps audio
      this.stepTimer -= dt;
      if (this.stepTimer <= 0) {
        this.stepTimer = running ? 0.27 : 0.4;
        if (this.audio) this.audio.playFootstep(this.isIndoors());
      }
    } else {
      // Idle settle
      this.leftLeg.rotation.x *= 0.82;
      this.rightLeg.rotation.x *= 0.82;
      this.leftArm.rotation.x *= 0.82;
      this.rightArm.rotation.x *= 0.82;
      this.torsoGroup.position.y = 0.62 + Math.sin(performance.now() * 0.0025) * 0.01;
    }

    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.facingYaw;
    this.setRaining(isRaining);
    this._updateCamera(dt);
  }

  _updateCamera(dt) {
    const indoors = this.isIndoors();
    let effectiveDist = indoors ? Math.min(this.camDist, 3.8) : this.camDist;
    const effectivePitch = indoors ? Math.min(this.camPitch, 0.28) : this.camPitch;

    const targetX = this.position.x;
    const targetY = this.position.y + 1.32;
    const targetZ = this.position.z;

    // Ray-step pullback against solid building boxes to avoid roof/wall clipping
    const dirX = Math.sin(this.camYaw) * Math.cos(effectivePitch);
    const dirY = Math.sin(effectivePitch);
    const dirZ = Math.cos(this.camYaw) * Math.cos(effectivePitch);

    const steps = 10;
    for (let s = 2; s <= steps; s++) {
      const dist = (s / steps) * effectiveDist;
      const sx = targetX + dirX * dist;
      const sy = targetY + dirY * dist;
      const sz = targetZ + dirZ * dist;
      if (sy < 4.4) {
        let hit = false;
        for (let i = 0; i < this.collision.boxes.length; i++) {
          const b = this.collision.boxes[i];
          if (!b.active || b.tag === 'river' || b.tag === 'trackFence' || b.tag === 'crossing' || b.tag === 'platformEdge') continue;
          if (sx >= b.minX - 0.25 && sx <= b.maxX + 0.25 && sz >= b.minZ - 0.25 && sz <= b.maxZ + 0.25) {
            hit = true;
            break;
          }
        }
        if (hit) {
          effectiveDist = Math.max(2.1, ((s - 1) / steps) * effectiveDist);
          break;
        }
      }
    }

    const desiredX = targetX + dirX * effectiveDist;
    const desiredY = targetY + dirY * effectiveDist;
    const desiredZ = targetZ + dirZ * effectiveDist;

    const groundAtCam = this.collision.getGroundHeight(desiredX, desiredZ);
    const clampedY = Math.max(groundAtCam + 0.6, desiredY);

    const lerpFactor = Math.min(1, dt * 11);
    this.camera.position.x += (desiredX - this.camera.position.x) * lerpFactor;
    this.camera.position.y += (clampedY - this.camera.position.y) * lerpFactor;
    this.camera.position.z += (desiredZ - this.camera.position.z) * lerpFactor;
    this.camera.lookAt(targetX, targetY, targetZ);
  }
}
