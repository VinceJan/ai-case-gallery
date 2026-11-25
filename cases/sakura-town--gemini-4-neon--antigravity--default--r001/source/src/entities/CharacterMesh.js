import * as THREE from 'three';
import { createToonMaterial } from '../art/ToonMaterials.js';

export function createAnimeCharacter(opts = {}) {
  const {
    scale = 1.0,
    skinColor = 0xfde2cc,
    hairColor = 0x3b2c2a,
    shirtColor = 0xf4f0e8,
    jacketColor = null,
    pantsColor = 0x455870,
    shoeColor = 0x5c4338,
    hairStyle = 'short',
    hatColor = null,
    apronColor = null,
    hasCamera = false,
    hasBackpack = false,
  } = opts;

  const root = new THREE.Group();
  const bodyRoot = new THREE.Group();
  root.add(bodyRoot);

  const skinMat = createToonMaterial(skinColor);
  const hairMat = createToonMaterial(hairColor);
  const shirtMat = createToonMaterial(shirtColor);
  const pantsMat = createToonMaterial(pantsColor);
  const shoeMat = createToonMaterial(shoeColor);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x261d1c });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xf498a6 });

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 0.58, 10), shirtMat);
  torso.position.y = 0.86;
  torso.castShadow = true;
  bodyRoot.add(torso);

  if (jacketColor) {
    const jacket = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.52, 0.34), createToonMaterial(jacketColor));
    jacket.position.set(0, 0.86, -0.02);
    jacket.castShadow = true;
    bodyRoot.add(jacket);
  }
  if (apronColor) {
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.56, 0.08), createToonMaterial(apronColor));
    apron.position.set(0, 0.72, 0.19);
    bodyRoot.add(apron);
  }
  if (hasBackpack) {
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.42, 0.2), createToonMaterial(0xc86452));
    pack.position.set(0, 0.88, -0.24);
    pack.castShadow = true;
    bodyRoot.add(pack);
  }
  if (hasCamera) {
    const cam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.1), createToonMaterial(0x2d3036));
    cam.position.set(0, 0.86, 0.24);
    bodyRoot.add(cam);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8), createToonMaterial(0x4b525c));
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0.86, 0.3);
    bodyRoot.add(lens);
  }

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.38, 0);
  bodyRoot.add(headGroup);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 12), skinMat);
  head.castShadow = true;
  headGroup.add(head);

  for (const sx of [-0.095, 0.095]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), eyeMat);
    eye.scale.set(0.9, 1.25, 0.5);
    eye.position.set(sx, 0.01, 0.255);
    headGroup.add(eye);

    const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.038, 8), blushMat);
    cheek.position.set(sx * 1.45, -0.055, 0.25);
    headGroup.add(cheek);
  }

  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.305, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
  hairCap.position.set(0, 0.03, -0.02);
  hairCap.castShadow = true;
  headGroup.add(hairCap);

  const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.14, 0.12), hairMat);
  bangs.position.set(0, 0.14, 0.21);
  headGroup.add(bangs);

  if (hairStyle === 'bob' || hairStyle === 'ponytail') {
    const backHair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.34, 0.2), hairMat);
    backHair.position.set(0, -0.06, -0.18);
    headGroup.add(backHair);
  }
  if (hairStyle === 'ponytail') {
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.38, 8), hairMat);
    tail.position.set(0, -0.08, -0.34);
    tail.rotation.x = 0.45;
    headGroup.add(tail);
  }
  if (hatColor) {
    const hatMat = createToonMaterial(hatColor);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.4, 0.05, 12), hatMat);
    brim.position.set(0, 0.24, 0.04);
    headGroup.add(brim);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.18, 12), hatMat);
    crown.position.set(0, 0.34, 0);
    headGroup.add(crown);
  }

  const makeArm = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.28, 1.08, 0);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.058, 0.46, 8), jacketColor ? createToonMaterial(jacketColor) : shirtMat);
    arm.position.y = -0.22;
    arm.castShadow = true;
    pivot.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.062, 8, 8), skinMat);
    hand.position.y = -0.46;
    pivot.add(hand);
    bodyRoot.add(pivot);
    return pivot;
  };
  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);

  const makeLeg = (side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.11, 0.56, 0);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.068, 0.48, 8), pantsMat);
    leg.position.y = -0.24;
    leg.castShadow = true;
    pivot.add(leg);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.1, 0.22), shoeMat);
    shoe.position.set(0, -0.5, 0.04);
    shoe.castShadow = true;
    pivot.add(shoe);
    bodyRoot.add(pivot);
    return pivot;
  };
  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  root.scale.setScalar(scale);

  return {
    root, bodyRoot, headGroup, leftArm, rightArm, leftLeg, rightLeg,
    animate(time, speed, isSitting = false) {
      if (isSitting) {
        bodyRoot.position.y = -0.24;
        leftLeg.rotation.x = -Math.PI / 2.2;
        rightLeg.rotation.x = -Math.PI / 2.2;
        leftArm.rotation.x = -0.25;
        rightArm.rotation.x = -0.25;
        headGroup.rotation.y = Math.sin(time * 0.8) * 0.14;
        return;
      }
      if (speed > 0.15) {
        const freq = speed > 4.2 ? 12.5 : 8.5;
        const amp = Math.min(0.75, speed * 0.14);
        const s = Math.sin(time * freq);
        leftLeg.rotation.x = s * amp;
        rightLeg.rotation.x = -s * amp;
        leftArm.rotation.x = -s * amp * 0.8;
        rightArm.rotation.x = s * amp * 0.8;
        bodyRoot.position.y = Math.abs(Math.cos(time * freq)) * 0.055;
      } else {
        leftLeg.rotation.x *= 0.82;
        rightLeg.rotation.x *= 0.82;
        leftArm.rotation.x *= 0.82;
        rightArm.rotation.x *= 0.82;
        bodyRoot.position.y = Math.sin(time * 2.2) * 0.015;
      }
    },
  };
}

export function createCatMesh() {
  const root = new THREE.Group();
  const orangeMat = createToonMaterial(0xee9a4d);
  const creamMat = createToonMaterial(0xfff5e4);
  const earInnerMat = createToonMaterial(0xf5a8b8);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x261d1c });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.28, 6, 10), orangeMat);
  body.rotation.x = Math.PI / 2;
  body.position.set(0, 0.24, 0);
  body.castShadow = true;
  root.add(body);

  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), creamMat);
  belly.position.set(0, 0.2, 0.14);
  root.add(belly);

  const head = new THREE.Group();
  head.position.set(0, 0.36, 0.24);
  root.add(head);

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), orangeMat);
  skull.castShadow = true;
  head.add(skull);

  for (const sx of [-0.09, 0.09]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.11, 4), orangeMat);
    ear.position.set(sx, 0.15, 0);
    ear.rotation.z = -sx * 2.0;
    head.add(ear);
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.07, 4), earInnerMat);
    inner.position.set(sx, 0.14, 0.025);
    inner.rotation.z = -sx * 2.0;
    head.add(inner);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), eyeMat);
    eye.position.set(sx * 0.65, 0.02, 0.14);
    head.add(eye);
  }

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.022, 6, 12), createToonMaterial(0xd94b4b));
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, 0.29, 0.18);
  root.add(collar);
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), createToonMaterial(0xf5cb4c));
  bell.position.set(0, 0.23, 0.3);
  root.add(bell);

  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.28, -0.22);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.04, 0.36, 6), orangeMat);
  tail.position.set(0, 0.16, -0.06);
  tail.rotation.x = -0.45;
  tailPivot.add(tail);
  root.add(tailPivot);

  return {
    root, headGroup: head,
    animate(time, speed) {
      tailPivot.rotation.z = Math.sin(time * (speed > 0.1 ? 8 : 3.2)) * 0.38;
      root.position.y = speed > 0.1 ? Math.abs(Math.sin(time * 9)) * 0.04 : 0;
    },
  };
}
