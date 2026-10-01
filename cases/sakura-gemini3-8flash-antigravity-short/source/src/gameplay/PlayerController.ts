// src/gameplay/PlayerController.ts
// Third-person / First-person player controller with bicycle riding and train passenger modes.
import * as THREE from 'three';
import { AvatarGenerator, AvatarParts } from '../characters/AvatarGenerator';
import { physics } from '../engine/Physics';
import { audio } from '../engine/AudioSynthesizer';
import { Bicycle } from '../vehicles/Bicycle';
import { TrainSystem } from '../vehicles/Train';

export class PlayerController {
  public avatar: AvatarParts;
  public camera: THREE.PerspectiveCamera;
  public position: THREE.Vector3 = new THREE.Vector3(15, 0, 10);
  public velocity: THREE.Vector3 = new THREE.Vector3();

  // Control State
  private keys: Record<string, boolean> = {};
  private moveSpeed: number = 4.5;
  private sprintMultiplier: number = 1.65;
  private walkTimer: number = 0;
  private footstepTimer: number = 0;

  // Camera Orbit
  public isFirstPerson: boolean = false;
  private cameraDistance: number = 5.2;
  private cameraPitch: number = 0.28;
  private cameraYaw: number = 0.0;
  private isPointerLocked: boolean = false;

  // Mounts
  public ridingBicycle: Bicycle | null = null;
  public ridingTrain: TrainSystem | null = null;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.camera = camera;

    // Create Player 3D Avatar (Youthful adventurer in casual jacket)
    this.avatar = AvatarGenerator.createHumanAvatar({
      hairColor: 0x34495e,
      hairStyle: 'spiky',
      outfitColor: 0xe67e22, // Orange windbreaker
      skinColor: 0xffe0bd
    });
    this.avatar.group.position.copy(this.position);
    scene.add(this.avatar.group);

    this.setupInputs();
  }

  private setupInputs(): void {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'KeyV') {
        this.isFirstPerson = !this.isFirstPerson;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mouse drag for camera orbit
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    window.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        isMouseDown = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isMouseDown) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        this.cameraYaw -= deltaX * 0.005;
        this.cameraPitch = Math.max(-0.4, Math.min(1.1, this.cameraPitch + deltaY * 0.005));
      }
    });

    // Mouse scroll wheel for camera zoom
    window.addEventListener('wheel', (e) => {
      this.cameraDistance = Math.max(1.8, Math.min(14.0, this.cameraDistance + e.deltaY * 0.005));
    });
  }

  public mountBicycle(bike: Bicycle): void {
    if (this.ridingBicycle) {
      this.ridingBicycle.isMounted = false;
      this.ridingBicycle = null;
    } else {
      this.ridingBicycle = bike;
      bike.isMounted = true;
      audio.playBicycleBell();
    }
  }

  public update(delta: number): void {
    // 1. Train Riding Mode
    if (this.ridingTrain && this.ridingTrain.isPlayerRiding) {
      this.position.copy(this.ridingTrain.trainWorldPos);
      this.position.y += 0.4;
      this.avatar.group.position.copy(this.position);
      this.updateCamera();
      return;
    }

    // 2. Input Direction relative to camera yaw
    let forward = 0;
    let right = 0;

    if (this.keys['KeyW'] || this.keys['ArrowUp']) forward += 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) forward -= 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) right -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) right += 1;

    const isMoving = forward !== 0 || right !== 0;
    const isSprinting = this.keys['ShiftLeft'] || this.keys['ShiftRight'];

    let currentSpeed = this.moveSpeed;
    if (this.ridingBicycle) {
      currentSpeed = 8.5; // Fast bike speed
    } else if (isSprinting) {
      currentSpeed *= this.sprintMultiplier;
    }

    if (isMoving) {
      // Calculate world movement vector based on camera yaw
      const moveAngle = Math.atan2(right, forward) + this.cameraYaw;
      const moveX = Math.sin(moveAngle);
      const moveZ = Math.cos(moveAngle);

      this.velocity.x = moveX * currentSpeed;
      this.velocity.z = moveZ * currentSpeed;

      // Update position
      this.position.x += this.velocity.x * delta;
      this.position.z += this.velocity.z * delta;

      // Resolve obstacle collisions
      physics.resolveCollision(this.position, 0.45);

      // Rotate avatar towards movement direction
      const targetRotY = moveAngle;
      this.avatar.group.rotation.y = THREE.MathUtils.lerp(
        this.avatar.group.rotation.y,
        targetRotY,
        delta * 12.0
      );

      // Limb swing animation
      this.walkTimer += delta * (isSprinting ? 12 : 8);
      const swing = Math.sin(this.walkTimer) * 0.55;
      this.avatar.leftArm.rotation.x = swing;
      this.avatar.rightArm.rotation.x = -swing;
      this.avatar.leftLeg.rotation.x = -swing;
      this.avatar.rightLeg.rotation.x = swing;

      // Bicycle wheel roll
      if (this.ridingBicycle) {
        this.ridingBicycle.group.position.copy(this.position);
        this.ridingBicycle.group.rotation.y = targetRotY;
        this.ridingBicycle.update(currentSpeed, delta);
      }

      // Footstep sound
      this.footstepTimer += delta * (isSprinting ? 2.5 : 1.8);
      if (this.footstepTimer > 0.8 && !this.ridingBicycle) {
        this.footstepTimer = 0;
        audio.playFootstep('road');
      }
    } else {
      this.velocity.set(0, 0, 0);
      // Idle breath
      this.walkTimer += delta * 2.0;
      this.avatar.leftArm.rotation.x = 0;
      this.avatar.rightArm.rotation.x = 0;
      this.avatar.leftLeg.rotation.x = 0;
      this.avatar.rightLeg.rotation.x = 0;
    }

    // Snap to terrain height
    this.position.y = physics.getTerrainHeight(this.position.x, this.position.z);
    this.avatar.group.position.copy(this.position);

    this.updateCamera();
  }

  private updateCamera(): void {
    if (this.isFirstPerson) {
      // First person view from avatar head
      this.avatar.group.visible = false;
      this.camera.position.set(this.position.x, this.position.y + 1.6, this.position.z);
      const lookTarget = new THREE.Vector3(
        this.position.x + Math.sin(this.cameraYaw) * Math.cos(this.cameraPitch) * 10,
        this.position.y + 1.6 + Math.sin(this.cameraPitch) * 10,
        this.position.z + Math.cos(this.cameraYaw) * Math.cos(this.cameraPitch) * 10
      );
      this.camera.lookAt(lookTarget);
    } else {
      // Third person orbit view
      this.avatar.group.visible = true;
      const camY = this.position.y + 1.5 + Math.sin(this.cameraPitch) * this.cameraDistance;
      const horizDist = Math.cos(this.cameraPitch) * this.cameraDistance;
      const camX = this.position.x - Math.sin(this.cameraYaw) * horizDist;
      const camZ = this.position.z - Math.cos(this.cameraYaw) * horizDist;

      this.camera.position.set(camX, camY, camZ);
      this.camera.lookAt(this.position.x, this.position.y + 1.4, this.position.z);
    }
  }
}
