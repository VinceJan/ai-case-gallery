// src/characters/AvatarGenerator.ts
// Generates procedural anime humanoid avatars and town calico cat with animation pivots.
import * as THREE from 'three';
import { CelShaders } from '../engine/CelShaders';

export interface AvatarParts {
  group: THREE.Group;
  head: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
  umbrella?: THREE.Group;
  catTail?: THREE.Group;
}

export class AvatarGenerator {
  /**
   * Creates a stylized Japanese anime human avatar with animatable limb joints
   */
  public static createHumanAvatar(options: {
    skinColor?: number;
    outfitColor?: number;
    hairColor?: number;
    hairStyle?: 'bob' | 'ponytail' | 'short' | 'spiky' | 'hat';
    isFemale?: boolean;
  }): AvatarParts {
    const group = new THREE.Group();

    const skinMat = CelShaders.createToonMaterial(options.skinColor ?? 0xffe0bd);
    const outfitMat = CelShaders.createToonMaterial(options.outfitColor ?? 0x2c3e50);
    const hairMat = CelShaders.createToonMaterial(options.hairColor ?? 0x2d3436);
    const darkMat = CelShaders.createToonMaterial(0x1e272e);
    const whiteMat = CelShaders.createToonMaterial(0xffffff);

    // 1. Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.65, 0.28), outfitMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    group.add(torso);

    // Collar / Tie accent
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.25, 0.04), darkMat);
    tie.position.set(0, 1.25, 0.15);
    group.add(tie);

    // 2. Head & Neck
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.55, 0);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.36), skinMat);
    headGroup.add(head);

    // Anime Eyes
    for (const ex of [-0.09, 0.09]) {
      const eyeWhite = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), whiteMat);
      eyeWhite.position.set(ex, 0.02, 0.185);
      headGroup.add(eyeWhite);

      const pupil = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.06), darkMat);
      pupil.position.set(ex, 0.02, 0.188);
      headGroup.add(pupil);
    }

    // Hair styles
    const style = options.hairStyle ?? 'short';
    if (style === 'hat') {
      // Station Master Peaked Cap (制帽)
      const capMat = CelShaders.createToonMaterial(0x1a237e);
      const goldMat = CelShaders.createToonMaterial(0xf1c40f);

      const capCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.18, 16), capMat);
      capCrown.position.set(0, 0.24, 0);
      headGroup.add(capCrown);

      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.04, 0.2), darkMat);
      visor.position.set(0, 0.16, 0.18);
      headGroup.add(visor);

      const goldBand = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.03, 0.02), goldMat);
      goldBand.position.set(0, 0.19, 0.18);
      headGroup.add(goldBand);
    } else {
      // Hair crown
      const hairCrown = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.4), hairMat);
      hairCrown.position.set(0, 0.16, -0.02);
      headGroup.add(hairCrown);

      // Front Anime Bangs
      const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.14, 0.1), hairMat);
      bangs.position.set(0, 0.12, 0.17);
      headGroup.add(bangs);

      if (style === 'ponytail') {
        const pony = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 8), hairMat);
        pony.rotation.x = -Math.PI / 3;
        pony.position.set(0, 0.18, -0.32);
        headGroup.add(pony);
      } else if (style === 'bob') {
        const bobL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.28), hairMat);
        bobL.position.set(-0.21, -0.05, 0);
        headGroup.add(bobL);

        const bobR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.28), hairMat);
        bobR.position.set(0.21, -0.05, 0);
        headGroup.add(bobR);
      }
    }
    group.add(headGroup);

    // 3. Arms with shoulder pivots
    const makeArm = (isLeft: boolean) => {
      const armGroup = new THREE.Group();
      armGroup.position.set(isLeft ? -0.34 : 0.34, 1.32, 0);

      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.14), outfitMat);
      arm.position.y = -0.28;
      armGroup.add(arm);

      // Hand
      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.12, 0.11), skinMat);
      hand.position.y = -0.62;
      armGroup.add(hand);

      return armGroup;
    };

    const leftArm = makeArm(true);
    const rightArm = makeArm(false);
    group.add(leftArm);
    group.add(rightArm);

    // 4. Legs with hip pivots
    const makeLeg = (isLeft: boolean) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(isLeft ? -0.15 : 0.15, 0.72, 0);

      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.18), darkMat);
      leg.position.y = -0.32;
      legGroup.add(leg);

      // Shoe
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.26), darkMat);
      shoe.position.set(0, -0.66, 0.04);
      legGroup.add(shoe);

      return legGroup;
    };

    const leftLeg = makeLeg(true);
    const rightLeg = makeLeg(false);
    group.add(leftLeg);
    group.add(rightLeg);

    // 5. Anime Vinyl Umbrella (for rainy weather, attached to right arm)
    const umbrella = new THREE.Group();
    umbrella.position.set(0, -0.6, 0.15);

    const uShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 1.1, 6),
      CelShaders.createToonMaterial(0xdcdde1)
    );
    umbrella.add(uShaft);

    const uCanopy = new THREE.Mesh(
      new THREE.ConeGeometry(0.75, 0.35, 8),
      CelShaders.createToonMaterial(0x81d4fa, { transparent: true, opacity: 0.6 })
    );
    uCanopy.position.y = 0.5;
    umbrella.add(uCanopy);
    umbrella.visible = false;
    rightArm.add(umbrella);

    return { group, head: headGroup, leftArm, rightArm, leftLeg, rightLeg, umbrella };
  }

  /**
   * Creates 3D Animated Town Calico Cat (三毛猫 - Mikan)
   */
  public static createCalicoCat(): AvatarParts {
    const group = new THREE.Group();

    const whiteMat = CelShaders.createToonMaterial(0xffffff);
    const orangeMat = CelShaders.createToonMaterial(0xe67e22); // Calico orange patch
    const blackMat = CelShaders.createToonMaterial(0x2d3436);  // Calico black patch
    const bellMat = CelShaders.createToonMaterial(0xf1c40f);   // Golden collar bell
    const redCollarMat = CelShaders.createToonMaterial(0xe74c3c);

    // 1. Cat Body (Oval box)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.52), whiteMat);
    body.position.y = 0.26;
    body.castShadow = true;
    group.add(body);

    // Orange Calico patch on back
    const patch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.24), orangeMat);
    patch.position.set(0.08, 0.41, 0.05);
    group.add(patch);

    // 2. Head with Ears and Whiskers
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.36, 0.32);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.24), whiteMat);
    headGroup.add(head);

    // Pointy cat ears
    for (const earSide of [-0.09, 0.09]) {
      const ear = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.12, 4),
        earSide < 0 ? orangeMat : blackMat
      );
      ear.position.set(earSide, 0.16, 0.02);
      headGroup.add(ear);
    }

    // Collar & Brass Bell
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.24), redCollarMat);
    collar.position.set(0, -0.1, -0.04);
    headGroup.add(collar);

    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), bellMat);
    bell.position.set(0, -0.13, 0.08);
    headGroup.add(bell);

    group.add(headGroup);

    // 3. Four Little Paws
    const paws: THREE.Mesh[] = [];
    for (const px of [-0.11, 0.11]) {
      for (const pz of [-0.18, 0.18]) {
        const paw = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.16, 0.09), whiteMat);
        paw.position.set(px, 0.08, pz);
        group.add(paw);
        paws.push(paw);
      }
    }

    // 4. Animated Curled Tail
    const catTail = new THREE.Group();
    catTail.position.set(0, 0.32, -0.26);

    const tailGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 6);
    const tailMesh = new THREE.Mesh(tailGeo, blackMat);
    tailMesh.rotation.x = Math.PI / 3;
    tailMesh.position.set(0, 0.14, -0.12);
    catTail.add(tailMesh);
    group.add(catTail);

    return {
      group,
      head: headGroup,
      leftArm: new THREE.Group(),
      rightArm: new THREE.Group(),
      leftLeg: new THREE.Group(),
      rightLeg: new THREE.Group(),
      catTail
    };
  }
}
