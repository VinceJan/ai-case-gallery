// src/characters/AvatarGenerator.ts
// Anime 3D character avatar and animal model generator with procedural animations.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';

export interface AvatarParts {
  root: THREE.Group;
  head: THREE.Group;
  torso: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
  umbrella?: THREE.Group;
  catTail?: THREE.Group;
}

export class AvatarGenerator {
  /** Builds an anime human character */
  public static createHumanAvatar(options: {
    skinColor?: number;
    hairColor?: number;
    hairStyle?: 'short' | 'ponytail' | 'bob' | 'spiky' | 'hat';
    outfitColor?: number;
    trouserColor?: number;
    isFemale?: boolean;
    hasSchoolBag?: boolean;
  } = {}): AvatarParts {
    const root = new THREE.Group();

    const skinMat = CelShaders.createToonMaterial(options.skinColor ?? 0xffe0bd); // Anime pale warm skin
    const hairMat = CelShaders.createToonMaterial(options.hairColor ?? 0x2c2c54);
    const outfitMat = CelShaders.createToonMaterial(options.outfitColor ?? 0x34495e);
    const trouserMat = CelShaders.createToonMaterial(options.trouserColor ?? 0x2c3e50);
    const shoeMat = CelShaders.createToonMaterial(0x1e272c);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const blushMat = CelShaders.createToonMaterial(0xff7675);

    // 1. Torso
    const torso = new THREE.Group();
    torso.position.y = 0.85;

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.48, 0.24), outfitMat);
    chest.position.y = 0.24;
    chest.castShadow = true;
    torso.add(chest);

    // White shirt collar / tie detail
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.04), CelShaders.createToonMaterial(0xffffff));
    collar.position.set(0, 0.44, 0.12);
    torso.add(collar);

    if (options.hasSchoolBag) {
      const bagMat = CelShaders.createToonMaterial(0x192a56);
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.16), bagMat);
      bag.position.set(0, 0.22, -0.18);
      torso.add(bag);
    }
    root.add(torso);

    // 2. Head & Anime Hair
    const head = new THREE.Group();
    head.position.y = 0.52; // Relative to torso
    torso.add(head);

    // Head sphere/box
    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.34, 0.3), skinMat);
    headMesh.position.y = 0.17;
    head.add(headMesh);

    // Anime Eyes
    for (const ex of [-0.08, 0.08]) {
      const eye = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.08), eyeMat);
      eye.position.set(ex, 0.18, 0.155);
      head.add(eye);

      // Cute blush dot under eyes
      const blush = new THREE.Mesh(new THREE.CircleGeometry(0.03, 8), blushMat);
      blush.position.set(ex * 1.35, 0.11, 0.155);
      head.add(blush);
    }

    // Hair Style
    const hairGroup = new THREE.Group();
    head.add(hairGroup);

    // Main hair cap
    const hairCap = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.34), hairMat);
    hairCap.position.set(0, 0.3, 0);
    hairGroup.add(hairCap);

    // Front bangs fringe
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.08), hairMat);
    bangs.position.set(0, 0.26, 0.16);
    hairGroup.add(bangs);

    if (options.hairStyle === 'ponytail') {
      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.38, 6), hairMat);
      tail.position.set(0, 0.18, -0.22);
      tail.rotation.x = -Math.PI / 4;
      hairGroup.add(tail);
    } else if (options.hairStyle === 'hat') {
      // Station Master Peaked Hat
      const hatMat = CelShaders.createToonMaterial(0x1a237e); // JR Navy
      const goldMat = CelShaders.createToonMaterial(0xffd700);

      const hatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.14, 12), hatMat);
      hatCrown.position.set(0, 0.38, 0);
      hairGroup.add(hatCrown);

      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.14), CelShaders.createToonMaterial(0x111111));
      visor.position.set(0, 0.32, 0.18);
      visor.rotation.x = Math.PI / 10;
      hairGroup.add(visor);

      const badge = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), goldMat);
      badge.position.set(0, 0.38, 0.21);
      hairGroup.add(badge);
    }

    // 3. Arms & Hands
    const armGeo = new THREE.BoxGeometry(0.11, 0.44, 0.11);

    // Left Arm
    const leftArm = new THREE.Group();
    leftArm.position.set(-0.27, 0.42, 0);
    const leftArmMesh = new THREE.Mesh(armGeo, outfitMat);
    leftArmMesh.position.y = -0.22;
    leftArm.add(leftArmMesh);
    torso.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Group();
    rightArm.position.set(0.27, 0.42, 0);
    const rightArmMesh = new THREE.Mesh(armGeo, outfitMat);
    rightArmMesh.position.y = -0.22;
    rightArm.add(rightArmMesh);
    torso.add(rightArm);

    // 4. Legs & Shoes
    const legGeo = new THREE.BoxGeometry(0.14, 0.85, 0.14);

    // Left Leg
    const leftLeg = new THREE.Group();
    leftLeg.position.set(-0.12, 0.85, 0);
    const leftLegMesh = new THREE.Mesh(legGeo, trouserMat);
    leftLegMesh.position.y = -0.425;
    leftLegMesh.castShadow = true;
    leftLeg.add(leftLegMesh);

    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.22), shoeMat);
    leftShoe.position.set(0, -0.82, 0.04);
    leftLeg.add(leftShoe);
    root.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Group();
    rightLeg.position.set(0.12, 0.85, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, trouserMat);
    rightLegMesh.position.y = -0.425;
    rightLegMesh.castShadow = true;
    rightLeg.add(rightLegMesh);

    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.22), shoeMat);
    rightShoe.position.set(0, -0.82, 0.04);
    rightLeg.add(rightShoe);
    root.add(rightLeg);

    // 5. Folded or Open Umbrella (attached to right hand)
    const umbrella = new THREE.Group();
    umbrella.visible = false;
    rightArm.add(umbrella);

    const shaftMat = CelShaders.createToonMaterial(0xdcdde1);
    const canopyMat = CelShaders.createToonMaterial(0x48dbfb); // Cute sky blue vinyl umbrella

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.95, 6), shaftMat);
    shaft.position.set(0, -0.25, 0);
    umbrella.add(shaft);

    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.35, 10), canopyMat);
    canopy.position.set(0, 0.2, 0);
    umbrella.add(canopy);

    return { root, head, torso, leftArm, rightArm, leftLeg, rightLeg, umbrella };
  }

  /** Builds the town calico cat (Mikan ミカン) */
  public static createCatAvatar(): AvatarParts {
    const root = new THREE.Group();

    const whiteMat = CelShaders.createToonMaterial(0xffffff);
    const orangeMat = CelShaders.createToonMaterial(0xff9f43);
    const blackMat = CelShaders.createToonMaterial(0x2f3640);
    const pinkMat = CelShaders.createToonMaterial(0xff9ff3);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x10ac84 }); // Green feline eyes

    // Torso / Cat Body
    const torso = new THREE.Group();
    torso.position.y = 0.25;

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.45), whiteMat);
    torso.add(body);

    // Orange calico patch on back
    const patch = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.2), orangeMat);
    patch.position.set(0.04, 0.06, -0.05);
    torso.add(patch);

    root.add(torso);

    // Head
    const head = new THREE.Group();
    head.position.set(0, 0.14, 0.28);
    torso.add(head);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.2), whiteMat);
    head.add(headMesh);

    // Triangular Cat Ears
    for (const ex of [-0.08, 0.08]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 3), ex < 0 ? orangeMat : blackMat);
      ear.position.set(ex, 0.14, 0);
      head.add(ear);

      // Green eyes
      const eye = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.04), eyeMat);
      eye.position.set(ex, 0.03, 0.105);
      head.add(eye);
    }

    // Pink nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), pinkMat);
    nose.position.set(0, -0.01, 0.105);
    head.add(nose);

    // Bell Collar (Red collar with brass bell!)
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 8), CelShaders.createToonMaterial(0xd63031));
    collar.position.set(0, -0.08, 0.18);
    head.add(collar);

    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), CelShaders.createToonMaterial(0xffd700));
    bell.position.set(0, -0.1, 0.25);
    head.add(bell);

    // Paws / Legs
    const legGeo = new THREE.BoxGeometry(0.07, 0.2, 0.07);
    const leftLeg = new THREE.Group();
    leftLeg.position.set(-0.09, 0.2, 0.14);
    leftLeg.add(new THREE.Mesh(legGeo, whiteMat));
    root.add(leftLeg);

    const rightLeg = new THREE.Group();
    rightLeg.position.set(0.09, 0.2, 0.14);
    rightLeg.add(new THREE.Mesh(legGeo, whiteMat));
    root.add(rightLeg);

    const leftArm = new THREE.Group();
    leftArm.position.set(-0.09, 0.2, -0.14);
    leftArm.add(new THREE.Mesh(legGeo, orangeMat));
    root.add(leftArm);

    const rightArm = new THREE.Group();
    rightArm.position.set(0.09, 0.2, -0.14);
    rightArm.add(new THREE.Mesh(legGeo, blackMat));
    root.add(rightArm);

    // Animated Curling Tail
    const catTail = new THREE.Group();
    catTail.position.set(0, 0.08, -0.22);
    const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.32, 6), blackMat);
    tailMesh.rotation.x = Math.PI / 4;
    tailMesh.position.set(0, 0.12, -0.08);
    catTail.add(tailMesh);
    torso.add(catTail);

    return { root, head, torso, leftArm, rightArm, leftLeg, rightLeg, catTail };
  }

  /** Updates walk cycle procedural animation */
  public static updateWalkCycle(
    parts: AvatarParts,
    walkSpeed: number,
    walkTimer: number,
    isRaining: boolean = false
  ): void {
    if (walkSpeed > 0.05) {
      const cycle = Math.sin(walkTimer * 8.0);
      parts.leftLeg.rotation.x = cycle * 0.55;
      parts.rightLeg.rotation.x = -cycle * 0.55;

      if (!isRaining) {
        parts.leftArm.rotation.x = -cycle * 0.45;
        parts.rightArm.rotation.x = cycle * 0.45;
      }

      // Torso subtle bobbing
      parts.torso.position.y = 0.85 + Math.abs(Math.sin(walkTimer * 16.0)) * 0.04;
    } else {
      // Idle pose
      parts.leftLeg.rotation.x = 0;
      parts.rightLeg.rotation.x = 0;
      parts.torso.position.y = 0.85;

      if (!isRaining) {
        parts.leftArm.rotation.x = 0;
        parts.rightArm.rotation.x = 0;
      }
    }

    // Umbrella holding pose
    if (parts.umbrella) {
      parts.umbrella.visible = isRaining;
      if (isRaining) {
        // Raise right arm up to hold umbrella above head
        parts.rightArm.rotation.x = -Math.PI / 1.4;
        parts.rightArm.rotation.z = -0.25;
      }
    }

    // Cat tail swishing
    if (parts.catTail) {
      parts.catTail.rotation.y = Math.sin(walkTimer * 4.0) * 0.35;
    }
  }
}
