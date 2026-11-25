import * as THREE from 'three';
import { CollisionSystem } from '../core/CollisionSystem.js';
import { createAnimeCharacter } from './CharacterMesh.js';

export class PlayerController {
  constructor(scene, camera, collision, input) {
    this.scene = scene;
    this.camera = camera;
    this.collision = collision;
    this.input = input;

    // Open scenic spawn on Main Shopping Street intersection looking straight toward the crossing, shops, and valley
    this.position = new THREE.Vector3(0.0, 0, 1.8);
    this.yaw = Math.PI;
    this.speed = 0;

    this.camYaw = 0.08;
    this.camPitch = 0.34;
    this.camDist = 8.2;
    this.targetCamDist = 8.2;

    this.mode = 'WALK';
    this.sitData = null;
    this.boostTimer = 0;

    this.meshObj = createAnimeCharacter({
      scale: 0.96,
      hairColor: 0x3b2d2c,
      shirtColor: 0xfff8ec,
      jacketColor: 0x5c84a8,
      pantsColor: 0x4b4642,
      shoeColor: 0x7c4e38,
      hairStyle: 'short',
      hasBackpack: true,
    });
    this.meshObj.root.position.copy(this.position);
    this.scene.add(this.meshObj.root);

    this._lookTarget = new THREE.Vector3();
    this._desiredCamPos = new THREE.Vector3();
    this._camInitialized = false;
  }

  grantSpeedBoost(seconds = 35) {
    this.boostTimer = Math.max(this.boostTimer, seconds);
  }

  sitOnBench(bench) {
    this.mode = 'SIT';
    this.sitData = bench;
    this.position.copy(bench.sitPos);
    this.yaw = bench.facingYaw;
    this.meshObj.root.position.copy(this.position);
    this.meshObj.root.rotation.y = this.yaw;
  }

  standUp() {
    if (this.mode !== 'SIT') return;
    if (this.sitData) {
      const stepX = this.sitData.x + Math.sin(this.sitData.facingYaw) * 1.1;
      const stepZ = this.sitData.z + Math.cos(this.sitData.facingYaw) * 1.1;
      const resolved = this.collision.resolve(stepX, stepZ, 0.42);
      this.position.set(resolved.x, CollisionSystem.getGroundHeight(resolved.x, resolved.z), resolved.z);
    }
    this.sitData = null;
    this.mode = 'WALK';
  }

  enterFishing(pierPos, facingYaw) {
    this.mode = 'FISH';
    this.position.copy(pierPos);
    this.yaw = facingYaw;
    this.meshObj.root.position.copy(this.position);
    this.meshObj.root.rotation.y = this.yaw;
  }

  exitFishing() {
    if (this.mode === 'FISH') this.mode = 'WALK';
  }

  enterCameraMode() {
    if (this.mode === 'WALK' || this.mode === 'SIT') {
      this._preCamMode = this.mode;
      this.mode = 'CAMERA';
      this.camYaw = this.yaw + Math.PI;
      this.camPitch = 0.04;
      this.meshObj.root.visible = false;
      return true;
    }
    return false;
  }

  exitCameraMode() {
    if (this.mode === 'CAMERA') {
      this.mode = this._preCamMode || 'WALK';
      this.camPitch = 0.36;
      this.meshObj.root.visible = true;
    }
  }

  teleportToHomeWakeup() {
    this.sitData = null;
    this.mode = 'WALK';
    this.position.set(-13.0, 0.16, -5.0);
    this.yaw = 0;
    this.meshObj.root.position.copy(this.position);
    this.meshObj.root.rotation.y = this.yaw;
  }

  update(dt, currentBuilding, isUiBlocked, audio) {
    const isIndoors = Boolean(currentBuilding);
    if (this.boostTimer > 0) this.boostTimer = Math.max(0, this.boostTimer - dt);

    const { dx, dy, zoom } = this.input.consumeOrbit();
    if (!isUiBlocked) {
      const keyTurn = this.input.getKeyCameraTurn();
      if (keyTurn !== 0) this.camYaw += keyTurn * dt * 1.85;

      if (this.mode === 'CAMERA') {
        this.camYaw -= dx * 0.0045;
        this.camPitch = THREE.MathUtils.clamp(this.camPitch + dy * 0.004, -0.45, 0.55);
      } else {
        this.camYaw -= dx * 0.006;
        this.camPitch = THREE.MathUtils.clamp(this.camPitch + dy * 0.0045, 0.16, 0.92);
        this.targetCamDist = THREE.MathUtils.clamp(this.targetCamDist + zoom * 0.9, 5.2, 15.5);
      }
    }

    let moveSpeed = 0;
    if (!isUiBlocked && this.mode === 'WALK') {
      const { forward, right } = this.input.getMoveAxes();
      if (forward !== 0 || right !== 0) {
        const len = Math.hypot(forward, right);
        const nf = forward / len;
        const nr = right / len;

        const dirX = -Math.sin(this.camYaw) * nf + Math.cos(this.camYaw) * nr;
        const dirZ = -Math.cos(this.camYaw) * nf - Math.sin(this.camYaw) * nr;

        const isSprint = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight');
        const boost = this.boostTimer > 0 ? 1.24 : 1.0;
        const baseSpeed = (isSprint ? 6.6 : 4.2) * boost;
        moveSpeed = baseSpeed;

        const resolved = this.collision.resolve(this.position.x + dirX * baseSpeed * dt, this.position.z + dirZ * baseSpeed * dt, 0.42);
        this.position.x = resolved.x;
        this.position.z = resolved.z;

        const targetYaw = Math.atan2(dirX, dirZ);
        let diff = targetYaw - this.yaw;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        this.yaw += diff * Math.min(1, dt * 12);

        if (audio) {
          const onWood = isIndoors || (this.position.x > 21 && this.position.z > 0 && this.position.z < 17);
          audio.playFootstep(onWood);
        }
      }

      const groundY = CollisionSystem.getGroundHeight(this.position.x, this.position.z);
      const targetY = isIndoors ? Math.max(groundY, 0.16) : groundY;
      this.position.y += (targetY - this.position.y) * Math.min(1, dt * 14);
    } else if (!isUiBlocked && this.mode === 'SIT') {
      const { forward, right } = this.input.getMoveAxes();
      if (forward !== 0 || right !== 0) this.standUp();
    }

    this.speed = moveSpeed;
    this.meshObj.root.position.copy(this.position);
    this.meshObj.root.rotation.y = this.yaw;
    this.meshObj.animate(performance.now() * 0.001, moveSpeed, this.mode === 'SIT');

    if (this.mode === 'CAMERA') {
      this.camera.position.set(this.position.x, this.position.y + 1.52, this.position.z);
      const lookDirX = -Math.sin(this.camYaw) * Math.cos(this.camPitch);
      const lookDirY = -Math.sin(this.camPitch);
      const lookDirZ = -Math.cos(this.camYaw) * Math.cos(this.camPitch);
      this._lookTarget.set(
        this.camera.position.x + lookDirX * 10,
        this.camera.position.y + lookDirY * 10,
        this.camera.position.z + lookDirZ * 10
      );
      this.camera.lookAt(this._lookTarget);
      return;
    }

    // Smooth cutaway overhead camera indoors + spring-arm occlusion check against all building boxes!
    const desiredDist = isIndoors ? Math.min(this.targetCamDist, 7.2) : this.targetCamDist;
    const pitch = isIndoors ? Math.max(this.camPitch, 0.78) : this.camPitch;
    const horiz = Math.cos(pitch) * desiredDist;
    const vert = Math.sin(pitch) * desiredDist;

    this._lookTarget.set(this.position.x, this.position.y + 1.25, this.position.z);
    const rawCamX = this._lookTarget.x + Math.sin(this.camYaw) * horiz;
    const rawCamY = this._lookTarget.y + vert;
    const rawCamZ = this._lookTarget.z + Math.cos(this.camYaw) * horiz;

    const ignoreId = currentBuilding ? currentBuilding.id : null;
    const hitT = this.collision.castCameraRay(
      this._lookTarget.x, this._lookTarget.y, this._lookTarget.z,
      rawCamX, rawCamY, rawCamZ,
      ignoreId
    );
    const safeDist = hitT < 1.0 ? Math.max(2.3, desiredDist * hitT - 0.55) : desiredDist;
    this.camDist += (safeDist - this.camDist) * Math.min(1, dt * (safeDist < this.camDist ? 18 : 7));

    const actualHoriz = Math.cos(pitch) * this.camDist;
    const actualVert = Math.sin(pitch) * this.camDist;
    this._desiredCamPos.set(
      this._lookTarget.x + Math.sin(this.camYaw) * actualHoriz,
      this._lookTarget.y + actualVert,
      this._lookTarget.z + Math.cos(this.camYaw) * actualHoriz
    );

    const camGround = CollisionSystem.getGroundHeight(this._desiredCamPos.x, this._desiredCamPos.z);
    if (this._desiredCamPos.y < camGround + 0.8) this._desiredCamPos.y = camGround + 0.8;

    if (!this._camInitialized) {
      this.camera.position.copy(this._desiredCamPos);
      this._camInitialized = true;
    } else {
      this.camera.position.lerp(this._desiredCamPos, Math.min(1, dt * 12));
    }
    this.camera.lookAt(this._lookTarget);
  }
}
