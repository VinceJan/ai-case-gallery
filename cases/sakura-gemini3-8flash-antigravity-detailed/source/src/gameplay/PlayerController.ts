// src/gameplay/PlayerController.ts
// Third-person and First-person player controller with bicycle riding, train boarding, and camera collision.
import * as THREE from 'three';
import { AvatarGenerator, AvatarParts } from '../characters/AvatarGenerator';
import { physics } from '../engine/Physics';
import { audio } from '../engine/AudioSynthesizer';
import { Bicycle } from '../vehicles/Bicycle';
import { TrainSystem } from '../vehicles/Train';

export class PlayerController {
  public avatar: AvatarParts;
  public camera: THREE.PerspectiveCamera;
  public position: THREE.Vector3 = new THREE.Vector3(-6, 0, 16); // Center of Station Plaza
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public rotationY: number = -Math.PI / 2; // Face towards crossing and town

  // Camera orbits
  public cameraPitch: number = 0.22; // Comfortable downward viewing angle
  public cameraYaw: number = -Math.PI / 2; // Look towards crossing and Sakura Mart
  public cameraDistance: number = 3.8;
  private minDistance: number = 1.0;
  private maxDistance: number = 8.0;

  // State
  public isGrounded: boolean = true;
  public isSprinting: boolean = false;
  public isRidingBicycle: boolean = false;
  public isRidingTrain: boolean = false;
  public walkTimer: number = 0;
  public footstepTimer: number = 0;

  // Active bicycle reference
  public currentBicycle: Bicycle | null = null;

  // Key states
  public keys: Record<string, boolean> = {};

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.camera = camera;

    // Create stylish anime player avatar (Japanese youth with casual school/travel outfit)
    this.avatar = AvatarGenerator.createHumanAvatar({
      hairColor: 0x3d3d3d,
      hairStyle: 'short',
      outfitColor: 0x3b3a30,
      trouserColor: 0x1e272c,
      hasSchoolBag: true
    });
    this.avatar.root.position.copy(this.position);
    scene.add(this.avatar.root);

    this.setupInputListeners();
  }

  private setupInputListeners(): void {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // AudioContext unlock on first key
      audio.ensureContext();

      // Bicycle Bell
      if (e.code === 'KeyF' && this.isRidingBicycle && this.currentBicycle) {
        this.currentBicycle.ringBell();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mouse Look / Orbit
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    window.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        isMouseDown = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        audio.ensureContext();
      }
    });

    window.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isMouseDown || document.pointerLockElement) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        const sensitivity = 0.0035;
        this.cameraYaw -= deltaX * sensitivity;
        this.cameraPitch = Math.max(-0.4, Math.min(1.2, this.cameraPitch + deltaY * sensitivity));
      }
    });

    // Zoom
    window.addEventListener('wheel', (e) => {
      this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance + e.deltaY * 0.005));
    });
  }

  public update(delta: number, train: TrainSystem, isRaining: boolean): void {
    // 1. Train Riding Mode
    if (this.isRidingTrain) {
      // Pin player inside car 1
      this.position.copy(train.car1.position);
      this.position.y += 0.8;
      this.avatar.root.position.copy(this.position);
      this.avatar.root.rotation.y = train.car1.rotation.y;
      AvatarGenerator.updateWalkCycle(this.avatar, 0, 0, false);
      this.updateCamera();
      return;
    }

    // 2. Bicycle Riding Mode
    if (this.isRidingBicycle && this.currentBicycle) {
      let forward = 0;
      let steer = 0;
      if (this.keys['KeyW'] || this.keys['ArrowUp']) forward += 1;
      if (this.keys['KeyS'] || this.keys['ArrowDown']) forward -= 0.6;
      if (this.keys['KeyA'] || this.keys['ArrowLeft']) steer += 1;
      if (this.keys['KeyD'] || this.keys['ArrowRight']) steer -= 1;

      this.currentBicycle.updateRiding(delta, forward, steer);
      this.position.copy(this.currentBicycle.mesh.position);
      this.position.y += 0.2; // Sit height on saddle

      this.avatar.root.position.copy(this.position);
      this.avatar.root.rotation.y = this.currentBicycle.heading;

      // Animate pedaling legs
      this.avatar.leftLeg.rotation.x = Math.sin(this.currentBicycle.pedalCrank.rotation.z) * 0.45;
      this.avatar.rightLeg.rotation.x = -Math.sin(this.currentBicycle.pedalCrank.rotation.z) * 0.45;
      this.avatar.leftArm.rotation.x = -Math.PI / 4;
      this.avatar.rightArm.rotation.x = -Math.PI / 4;

      this.updateCamera();
      return;
    }

    // 3. Normal Walking & Running Mode
    let moveX = 0;
    let moveZ = 0;

    if (this.keys['KeyW'] || this.keys['ArrowUp']) moveZ -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) moveZ += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveX -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) moveX += 1;

    this.isSprinting = !!(this.keys['ShiftLeft'] || this.keys['ShiftRight']);
    const moveSpeed = this.isSprinting ? 6.2 : 3.2; // m/s

    const inputLen = Math.sqrt(moveX * moveX + moveZ * moveZ);
    if (inputLen > 0.001) {
      moveX /= inputLen;
      moveZ /= inputLen;

      // Transform input relative to camera yaw
      const forward = new THREE.Vector3(-Math.sin(this.cameraYaw), 0, -Math.cos(this.cameraYaw));
      const right = new THREE.Vector3(Math.cos(this.cameraYaw), 0, -Math.sin(this.cameraYaw));

      const moveDir = new THREE.Vector3()
        .addScaledVector(right, moveX)
        .addScaledVector(forward, -moveZ)
        .normalize();

      const moveStep = moveDir.clone().multiplyScalar(moveSpeed * delta);

      // Resolve collisions and stair climbing
      const { newPos, grounded } = physics.moveActor(this.position, moveStep, 0.35, 1.6, 0.45);
      this.position.copy(newPos);
      this.isGrounded = grounded;

      // Rotate avatar smoothly to face movement direction
      const targetRotY = Math.atan2(moveDir.x, moveDir.z);
      this.rotationY += (targetRotY - this.rotationY) * delta * 12.0;
      this.avatar.root.rotation.y = this.rotationY;

      this.walkTimer += delta * (this.isSprinting ? 1.6 : 1.0);

      // Footstep audio
      this.footstepTimer += delta * (this.isSprinting ? 2.5 : 1.6);
      if (this.footstepTimer >= 0.7) {
        this.footstepTimer = 0;
        audio.playFootstep('asphalt');
      }
    } else {
      // Idle gravity check
      const groundY = physics.getGroundHeight(this.position.x, this.position.z);
      if (this.position.y > groundY) {
        this.position.y = Math.max(groundY, this.position.y - 9.8 * delta * 0.5);
      }
    }

    // Jump (Space)
    if (this.keys['Space'] && this.isGrounded) {
      this.position.y += 0.8;
      this.isGrounded = false;
      audio.playFootstep('asphalt');
    }

    this.avatar.root.position.copy(this.position);

    // Update walk & umbrella animations
    const currentSpeed = inputLen > 0.001 ? moveSpeed : 0;
    AvatarGenerator.updateWalkCycle(this.avatar, currentSpeed, this.walkTimer, isRaining);

    // Update 3rd-person follow camera
    this.updateCamera();
  }

  private updateCamera(): void {
    // Camera target: Player head height (Y + 1.35m)
    const target = this.position.clone().add(new THREE.Vector3(0, 1.35, 0));

    // Spherical offset from yaw and pitch
    const cosPitch = Math.cos(this.cameraPitch);
    const sinPitch = Math.sin(this.cameraPitch);
    const sinYaw = Math.sin(this.cameraYaw);
    const cosYaw = Math.cos(this.cameraYaw);

    const camOffset = new THREE.Vector3(
      sinYaw * cosPitch * this.cameraDistance,
      sinPitch * this.cameraDistance,
      cosYaw * cosPitch * this.cameraDistance
    );

    const desiredCamPos = target.clone().add(camOffset);

    // Camera raycast / collision check to prevent clipping into ground or walls
    const groundAtCam = physics.getGroundHeight(desiredCamPos.x, desiredCamPos.z) + 0.4;
    if (desiredCamPos.y < groundAtCam) {
      desiredCamPos.y = groundAtCam;
    }

    this.camera.position.lerp(desiredCamPos, 0.25);
    this.camera.lookAt(target);
  }

  public mountBicycle(bike: Bicycle): void {
    this.isRidingBicycle = true;
    this.currentBicycle = bike;
    bike.isMounted = true;
    audio.playUIConfirm();
  }

  public dismountBicycle(): void {
    if (this.currentBicycle) {
      this.currentBicycle.isMounted = false;
      this.currentBicycle.speed = 0;
    }
    this.isRidingBicycle = false;
    this.currentBicycle = null;
    audio.playUIConfirm();
  }

  public toggleTrainRide(): void {
    this.isRidingTrain = !this.isRidingTrain;
    audio.playUIConfirm();
  }
}
