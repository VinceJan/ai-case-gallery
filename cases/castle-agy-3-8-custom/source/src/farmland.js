import * as THREE from 'three';
import { PALETTE } from './constants.js';
import { getToonMaterial, createWheatMaterial, createFoliageMaterial } from './materials.js';

export function buildFarmland(animatedObjects = []) {
  const farmGroup = new THREE.Group();
  farmGroup.name = 'FarmlandGroup';

  const woodMat = getToonMaterial(PALETTE.WOOD_PLANK);
  const darkWood = getToonMaterial(PALETTE.WOOD_DARK);
  const stoneMat = getToonMaterial(PALETTE.CASTLE_STONE_LIGHT);

  // 1. WHEAT FIELDS & WHEAT WAVES (麦垄麦浪)
  buildWheatFields(farmGroup);

  // 2. RUSTIC FENCES & GATES (篱笆)
  buildRusticFences(farmGroup, darkWood);

  // 3. SCARECROW (稻草人)
  buildScarecrow(farmGroup, darkWood);

  // 4. FIELD HAY BALES & STACKS (干草垛)
  buildFieldHaystacks(farmGroup);

  // 5. BRIDGES OVER CANALS (水渠小桥)
  buildCanalBridges(farmGroup, woodMat, stoneMat);

  // 6. LIVESTOCK: COWS & SHEEP (牛羊与动画)
  buildLivestock(farmGroup, animatedObjects);

  // 7. SURROUNDING FOREST & ORCHARD (环景树林、果园与植被)
  buildFloraAndTrees(farmGroup, darkWood, animatedObjects);

  // 8. VEGETABLE GARDEN & PUMPKINS (蔬菜地与南瓜)
  buildVeggiePatch(farmGroup);

  return farmGroup;
}

// 1. Wheat Fields & Wheat Waves (麦垄麦浪)
function buildWheatFields(parent) {
  const wheatGroup = new THREE.Group();
  wheatGroup.name = 'WheatFields';

  const wheatMat = createWheatMaterial();

  // Create single wheat bunch geometry (3 crossed planes with tapered heads)
  const bunchGeom = new THREE.BufferGeometry();
  const stalkHeight = 1.1;
  const stalkWidth = 0.35;

  // Single stalk blade quad
  const pGeom1 = new THREE.PlaneGeometry(stalkWidth, stalkHeight, 1, 2);
  pGeom1.translate(0, stalkHeight / 2, 0);

  const pGeom2 = pGeom1.clone();
  pGeom2.rotateY(Math.PI / 3);

  const pGeom3 = pGeom1.clone();
  pGeom3.rotateY((Math.PI * 2) / 3);

  // Combine into single bunch geometry
  const bunchMesh = new THREE.Group();
  bunchMesh.add(new THREE.Mesh(pGeom1, wheatMat));
  bunchMesh.add(new THREE.Mesh(pGeom2, wheatMat));
  bunchMesh.add(new THREE.Mesh(pGeom3, wheatMat));

  // Furrows (土垄): create parallel raised earth mounds
  const furrowMat = getToonMaterial(PALETTE.EARTH_PATH);

  // Main Field 1 (Front Left: X from -13 to -1, Z from 9 to 19)
  for (let f = 0; f < 6; f++) {
    const furrowZ = 10.5 + f * 1.5;
    const furrow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.4, 11.5, 6),
      furrowMat
    );
    furrow.rotation.z = Math.PI / 2;
    furrow.position.set(-7.0, 1.25, furrowZ);
    furrow.receiveShadow = true;
    wheatGroup.add(furrow);

    // Stalks along furrow
    for (let x = -12.5; x <= -1.5; x += 0.55) {
      const wheat = bunchMesh.clone();
      const jitterX = (Math.random() - 0.5) * 0.15;
      const jitterZ = (Math.random() - 0.5) * 0.2;
      const scale = 0.85 + Math.random() * 0.3;
      wheat.position.set(x + jitterX, 1.3, furrowZ + jitterZ);
      wheat.scale.set(scale, scale, scale);
      wheat.rotation.y = Math.random() * Math.PI;
      wheatGroup.add(wheat);
    }
  }

  // Field 2 (Right Wing: X from 13.5 to 21.5, Z from 5 to 16)
  for (let f = 0; f < 5; f++) {
    const furrowX = 14.5 + f * 1.6;
    const furrow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.38, 10.0, 6),
      furrowMat
    );
    furrow.rotation.x = Math.PI / 2;
    furrow.position.set(furrowX, 1.35, 10.5);
    furrow.receiveShadow = true;
    wheatGroup.add(furrow);

    for (let z = 6.0; z <= 15.0; z += 0.6) {
      const wheat = bunchMesh.clone();
      const scale = 0.85 + Math.random() * 0.3;
      wheat.position.set(furrowX + (Math.random() - 0.5) * 0.2, 1.4, z + (Math.random() - 0.5) * 0.2);
      wheat.scale.set(scale, scale, scale);
      wheat.rotation.y = Math.random() * Math.PI;
      wheatGroup.add(wheat);
    }
  }

  parent.add(wheatGroup);
}

// 2. Rustic Wooden Fences & Gates (篱笆)
function buildRusticFences(parent, woodMat) {
  const fenceGroup = new THREE.Group();

  // Fence enclosing front wheat field along the road
  const postGeom = new THREE.CylinderGeometry(0.08, 0.1, 1.1, 6);
  const railGeom = new THREE.CylinderGeometry(0.05, 0.05, 2.3, 6);
  railGeom.rotateZ(Math.PI / 2);

  // Fence strip 1: along Z = 9.2, from X = -13 to -0.5
  for (let x = -13.0; x <= -1.0; x += 2.0) {
    const post = new THREE.Mesh(postGeom, woodMat);
    post.position.set(x, 1.7, 9.2);
    post.rotation.z = (Math.random() - 0.5) * 0.12;
    post.castShadow = true;
    fenceGroup.add(post);

    if (x < -1.5) {
      // Upper rail
      const rail1 = new THREE.Mesh(railGeom, woodMat);
      rail1.position.set(x + 1.0, 2.05, 9.2);
      rail1.castShadow = true;
      // Lower rail
      const rail2 = new THREE.Mesh(railGeom, woodMat);
      rail2.position.set(x + 1.0, 1.55, 9.2);
      rail2.castShadow = true;
      fenceGroup.add(rail1, rail2);
    }
  }

  // Fence Gate (木栅门) at X = -0.5
  const gatePost = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.3, 6), woodMat);
  gatePost.position.set(-0.8, 1.8, 9.2);
  const gateLeaf = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.08), woodMat);
  gateLeaf.position.set(0, 1.8, 9.2);
  gateLeaf.rotation.y = 0.5; // open gate
  fenceGroup.add(gatePost, gateLeaf);

  // Fence strip 2: Pasture fence along left wing (X = -13.0, Z from -4 to 5)
  for (let z = -4.0; z <= 4.0; z += 2.0) {
    const post = new THREE.Mesh(postGeom, woodMat);
    post.position.set(-13.0, 1.5, z);
    post.castShadow = true;
    fenceGroup.add(post);

    if (z < 3.5) {
      const rail = new THREE.Mesh(railGeom, woodMat);
      rail.rotation.y = Math.PI / 2;
      rail.rotation.x = Math.PI / 2;
      rail.position.set(-13.0, 1.7, z + 1.0);
      fenceGroup.add(rail);
    }
  }

  parent.add(fenceGroup);
}

// 3. Scarecrow (稻草人)
function buildScarecrow(parent, darkWood) {
  const scarecrowGroup = new THREE.Group();
  scarecrowGroup.position.set(-5.5, 1.25, 14.5);
  scarecrowGroup.rotation.y = 0.3;

  // Vertical pole
  const vPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 2.6, 6),
    darkWood
  );
  vPole.position.y = 1.3;
  vPole.castShadow = true;
  scarecrowGroup.add(vPole);

  // Horizontal arm crossbar
  const hBar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.8, 6),
    darkWood
  );
  hBar.rotation.z = Math.PI / 2;
  hBar.position.y = 1.95;
  hBar.castShadow = true;
  scarecrowGroup.add(hBar);

  // Ragged Tunic Coat (burlap/terracotta)
  const coat = new THREE.Mesh(
    new THREE.ConeGeometry(0.42, 1.1, 6),
    getToonMaterial(PALETTE.BRICK_RED)
  );
  coat.position.y = 1.6;
  coat.castShadow = true;
  scarecrowGroup.add(coat);

  // Straw Head (burlap ball)
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 8, 8),
    getToonMaterial(PALETTE.THATCH_ROOF)
  );
  head.position.y = 2.22;
  head.castShadow = true;
  scarecrowGroup.add(head);

  // Floppy Straw Hat
  const hatBrim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.48, 0.48, 0.04, 8),
    getToonMaterial(PALETTE.THATCH_ROOF_DARK)
  );
  hatBrim.position.y = 2.38;
  hatBrim.rotation.z = 0.15;
  const hatCrown = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 0.45, 8),
    getToonMaterial(PALETTE.THATCH_ROOF_DARK)
  );
  hatCrown.position.set(0.04, 2.6, 0);
  hatCrown.rotation.z = 0.2;
  scarecrowGroup.add(hatBrim, hatCrown);

  // Straw tufts poking from sleeves
  const strawL = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.35, 5),
    getToonMaterial(PALETTE.WHEAT_GOLD)
  );
  strawL.rotation.z = Math.PI / 2;
  strawL.position.set(-0.95, 1.95, 0);
  const strawR = strawL.clone();
  strawR.rotation.z = -Math.PI / 2;
  strawR.position.x = 0.95;
  scarecrowGroup.add(strawL, strawR);

  parent.add(scarecrowGroup);
}

// 4. Field Hay Bales & Stacks (干草垛)
function buildFieldHaystacks(parent) {
  const stackGroup = new THREE.Group();
  const thatchMat = getToonMaterial(PALETTE.THATCH_ROOF);
  const goldMat = getToonMaterial(PALETTE.WHEAT_GOLD);

  // Field conical stack
  const stack = new THREE.Mesh(
    new THREE.ConeGeometry(1.3, 1.9, 8),
    thatchMat
  );
  stack.position.set(-1.5, 1.25 + 0.95, 17.5);
  stack.castShadow = true;
  stackGroup.add(stack);

  // Round bales in field
  const baleGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.85, 8);
  baleGeom.rotateZ(Math.PI / 2);

  [[-11.0, 1.25 + 0.42, 19.5, 0.4], [15.5, 1.25 + 0.42, 17.2, -0.2], [18.0, 1.25 + 0.42, 6.5, 0.8]].forEach(([bx, by, bz, rot]) => {
    const bale = new THREE.Mesh(baleGeom, goldMat);
    bale.position.set(bx, by, bz);
    bale.rotation.y = rot;
    bale.castShadow = true;
    stackGroup.add(bale);
  });

  parent.add(stackGroup);
}

// 5. Bridges over Waterways (水渠小桥)
function buildCanalBridges(parent, woodMat, stoneMat) {
  const bridgeGroup = new THREE.Group();

  // 1. Arched Stone Bridge over stream (X = -16.5, Z = 1.0) connecting Village to Pasture
  const stoneBridge = new THREE.Group();
  stoneBridge.position.set(-16.5, 1.2, 1.0);

  // Arch roadway deck
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.35, 2.4),
    stoneMat
  );
  deck.position.y = 0.55;
  deck.castShadow = true;
  deck.receiveShadow = true;
  stoneBridge.add(deck);

  // Low stone side parapets
  const sideGeom = new THREE.BoxGeometry(4.2, 0.5, 0.35);
  const sideL = new THREE.Mesh(sideGeom, stoneMat);
  sideL.position.set(0, 0.9, -1.1);
  sideL.castShadow = true;
  const sideR = sideL.clone();
  sideR.position.z = 1.1;
  stoneBridge.add(sideL, sideR);

  bridgeGroup.add(stoneBridge);

  // 2. Rustic Wooden Plank Footbridge over southern stream (X = -16.5, Z = 13.0)
  const woodBridge = new THREE.Group();
  woodBridge.position.set(-16.5, 1.1, 13.0);

  // Log stringers
  const logGeom = new THREE.CylinderGeometry(0.12, 0.12, 4.2, 6);
  logGeom.rotateZ(Math.PI / 2);
  const logL = new THREE.Mesh(logGeom, woodMat);
  logL.position.set(0, 0.15, -0.6);
  const logR = logL.clone();
  logR.position.z = 0.6;
  woodBridge.add(logL, logR);

  // Wooden transverse planks
  for (let x = -1.8; x <= 1.8; x += 0.32) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.08, 1.6),
      woodMat
    );
    plank.position.set(x, 0.28, 0);
    plank.rotation.y = (Math.random() - 0.5) * 0.08;
    plank.castShadow = true;
    woodBridge.add(plank);
  }

  // Wooden rope handrail posts
  const postGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.9, 6);
  [[-1.6, -0.75], [1.6, -0.75], [-1.6, 0.75], [1.6, 0.75]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(postGeom, woodMat);
    post.position.set(px, 0.65, pz);
    woodBridge.add(post);
  });

  bridgeGroup.add(woodBridge);
  parent.add(bridgeGroup);
}

// 6. Livestock: Cows & Sheep with idle grazing animations (牛羊)
function buildLivestock(parent, animatedObjects) {
  const herdGroup = new THREE.Group();
  herdGroup.name = 'Livestock';

  const cowMatWhite = getToonMaterial(PALETTE.COW_WHITE);
  const cowMatBlack = getToonMaterial(PALETTE.COW_BLACK);
  const sheepWoolMat = getToonMaterial(PALETTE.SHEEP_WOOL);
  const sheepSkinMat = getToonMaterial(PALETTE.SHEEP_FACE);

  // --- TWO CUTE CEL COWS ---
  const cowConfigs = [
    { pos: [-16.0, 1.25, -1.5], rotY: 0.8 },
    { pos: [-18.5, 1.25, 2.5], rotY: -0.6 }
  ];

  cowConfigs.forEach((cc, idx) => {
    const cow = new THREE.Group();
    cow.position.set(...cc.pos);
    cow.rotation.y = cc.rotY;

    // Cow body (rounded box)
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.9, 1.8), cowMatWhite);
    body.position.y = 0.9;
    body.castShadow = true;
    cow.add(body);

    // Black patches on body
    const patch = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.5, 0.8), cowMatBlack);
    patch.position.set(0, 1.0, 0.1);
    cow.add(patch);

    // 4 sturdy legs
    const legGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 6);
    [[-0.38, -0.6], [0.38, -0.6], [-0.38, 0.6], [0.38, 0.6]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeom, cowMatWhite);
      leg.position.set(lx, 0.35, lz);
      leg.castShadow = true;
      cow.add(leg);
    });

    // Cow head & neck (animated chewing/bobbing)
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 1.0, 0.9);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.6, 0.75), cowMatWhite);
    head.position.set(0, -0.15, 0.4);
    head.castShadow = true;
    headPivot.add(head);

    // Pink muzzle
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.3, 0.3), getToonMaterial(0xe8a29b));
    muzzle.position.set(0, -0.28, 0.85);
    headPivot.add(muzzle);

    // Cute horns
    const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.25, 5), getToonMaterial(0xdfd4bc));
    hornL.rotation.z = -0.4;
    hornL.position.set(-0.28, 0.2, 0.4);
    const hornR = hornL.clone();
    hornR.rotation.z = 0.4;
    hornR.position.x = 0.28;
    headPivot.add(hornL, hornR);

    cow.add(headPivot);

    // Tail
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.6, 5), cowMatBlack);
    tail.position.set(0, 0.8, -0.95);
    tail.rotation.x = -0.3;
    cow.add(tail);

    herdGroup.add(cow);

    // Animation: head dips and chews grass
    animatedObjects.push({
      update: (delta, time) => {
        const chew = Math.sin(time * 3.5 + idx * 2.0) * 0.06;
        const dip = Math.sin(time * 0.8 + idx * 1.5) * 0.15;
        headPivot.rotation.x = 0.3 + dip;
        headPivot.rotation.y = chew;
        tail.rotation.z = Math.sin(time * 2.5 + idx) * 0.2;
      }
    });
  });

  // --- THREE FLUFFY SHEEP ---
  const sheepConfigs = [
    { pos: [-15.5, 1.25, 4.0], rotY: 1.2 },
    { pos: [-18.0, 1.25, -3.2], rotY: -1.8 },
    { pos: [-14.5, 1.25, -2.5], rotY: 0.3 }
  ];

  sheepConfigs.forEach((sc, idx) => {
    const sheep = new THREE.Group();
    sheep.position.set(...sc.pos);
    sheep.rotation.y = sc.rotY;

    // Woolly body (puff cloud shape)
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 8), sheepWoolMat);
    body.scale.set(0.9, 0.85, 1.3);
    body.position.y = 0.72;
    body.castShadow = true;
    sheep.add(body);

    // 4 tiny black legs
    const legGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 5);
    [[-0.26, -0.4], [0.26, -0.4], [-0.26, 0.4], [0.26, 0.4]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeom, sheepSkinMat);
      leg.position.set(lx, 0.25, lz);
      leg.castShadow = true;
      sheep.add(leg);
    });

    // Dark head & face
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.75, 0.65);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 7, 7), sheepSkinMat);
    head.scale.set(0.85, 0.9, 1.1);
    head.position.set(0, -0.08, 0.2);
    head.castShadow = true;
    headPivot.add(head);

    // Floppy ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.08), sheepSkinMat);
    earL.position.set(-0.22, 0.02, 0.15);
    earL.rotation.z = -0.3;
    const earR = earL.clone();
    earR.position.x = 0.22;
    earR.rotation.z = 0.3;
    headPivot.add(earL, earR);

    // Wool cap on top of head
    const woolCap = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), sheepWoolMat);
    woolCap.position.set(0, 0.12, 0.15);
    headPivot.add(woolCap);

    sheep.add(headPivot);
    herdGroup.add(sheep);

    // Animation: gentle bobbing and grass grazing
    animatedObjects.push({
      update: (delta, time) => {
        const bob = Math.sin(time * 2.2 + idx * 1.8) * 0.08;
        headPivot.rotation.x = 0.25 + bob;
      }
    });
  });

  parent.add(herdGroup);
}

// 7. Surrounding Forest, Trees & Orchard (环景树林)
function buildFloraAndTrees(parent, darkWood, animatedObjects) {
  const floraGroup = new THREE.Group();
  floraGroup.name = 'FloraAndTrees';

  const oakMat1 = createFoliageMaterial(PALETTE.LEAF_OAK);
  const oakMat2 = createFoliageMaterial(PALETTE.LEAF_OAK_LIGHT);
  const pineMat = createFoliageMaterial(PALETTE.LEAF_PINE);

  // Tree locations around borders and scenic spots
  const treeList = [
    // Left border & orchard (apple trees)
    { type: 'apple', pos: [-21.0, 1.3, 8.5], scale: 1.1 },
    { type: 'apple', pos: [-20.5, 1.3, 14.5], scale: 1.0 },
    { type: 'apple', pos: [-19.5, 1.3, -4.5], scale: 1.15 },

    // Front corners & field edges
    { type: 'oak', pos: [-10.5, 1.25, 21.0], scale: 1.3 },
    { type: 'oak', pos: [6.5, 1.25, 20.5], scale: 1.2 },
    { type: 'oak', pos: [11.0, 1.25, 19.5], scale: 1.4 },

    // Right wing trees
    { type: 'oak', pos: [21.5, 1.35, 13.5], scale: 1.25 },
    { type: 'oak', pos: [22.0, 1.35, 3.5], scale: 1.3 },
    { type: 'oak', pos: [21.0, 2.4, -4.0], scale: 1.1 },

    // Rocky slope & castle backdrop mountain pines
    { type: 'pine', pos: [-19.0, 5.0, -11.0], scale: 1.4 },
    { type: 'pine', pos: [-18.5, 6.0, -18.0], scale: 1.6 },
    { type: 'pine', pos: [18.5, 5.0, -11.0], scale: 1.4 },
    { type: 'pine', pos: [19.0, 6.0, -18.0], scale: 1.5 },
    { type: 'pine', pos: [-6.0, 7.2, -21.0], scale: 1.3 },
    { type: 'pine', pos: [6.0, 7.2, -21.0], scale: 1.3 }
  ];

  treeList.forEach(t => {
    const tree = new THREE.Group();
    tree.position.set(...t.pos);
    tree.scale.set(t.scale, t.scale, t.scale);

    if (t.type === 'pine') {
      // Conical Pine Tree
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.35, 2.4, 6),
        darkWood
      );
      trunk.position.y = 1.2;
      trunk.castShadow = true;
      tree.add(trunk);

      // 3 Tiered Pine Cones
      const tiers = [
        { r: 1.6, h: 2.2, y: 2.5 },
        { r: 1.3, h: 2.0, y: 3.8 },
        { r: 0.9, h: 1.8, y: 5.0 }
      ];
      tiers.forEach(tier => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(tier.r, tier.h, 7), pineMat);
        cone.position.y = tier.y;
        cone.castShadow = true;
        tree.add(cone);
      });
    } else {
      // Stylized Broadleaf Oak / Apple Tree
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.45, 2.6, 7),
        darkWood
      );
      trunk.position.y = 1.3;
      trunk.rotation.z = (Math.random() - 0.5) * 0.1;
      trunk.castShadow = true;
      tree.add(trunk);

      // Puffy cloud-like foliage crowns (3-4 intersecting deformed spheres)
      const crownMat = (t.type === 'apple' || Math.random() > 0.5) ? oakMat1 : oakMat2;
      const sphereGeom = new THREE.DodecahedronGeometry(1.4, 1);

      const crown1 = new THREE.Mesh(sphereGeom, crownMat);
      crown1.position.set(0, 3.2, 0);
      crown1.scale.set(1.1, 0.9, 1.1);
      crown1.castShadow = true;

      const crown2 = new THREE.Mesh(sphereGeom, crownMat);
      crown2.position.set(0.6, 3.7, 0.3);
      crown2.scale.set(0.85, 0.85, 0.85);

      const crown3 = new THREE.Mesh(sphereGeom, crownMat);
      crown3.position.set(-0.5, 3.6, -0.4);
      crown3.scale.set(0.9, 0.85, 0.9);

      tree.add(crown1, crown2, crown3);

      // If Apple tree, add bright red dot apples
      if (t.type === 'apple') {
        const appleGeom = new THREE.DodecahedronGeometry(0.12, 1);
        const appleMat = getToonMaterial(PALETTE.APPLE_RED);
        for (let i = 0; i < 7; i++) {
          const apple = new THREE.Mesh(appleGeom, appleMat);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI * 0.6;
          const rad = 1.35;
          apple.position.set(
            Math.sin(phi) * Math.cos(theta) * rad,
            3.2 + Math.cos(phi) * rad * 0.8,
            Math.sin(phi) * Math.sin(theta) * rad
          );
          tree.add(apple);
        }
      }
    }

    floraGroup.add(tree);
  });

  parent.add(floraGroup);
}

// 8. Vegetable Patch & Pumpkins (菜园与南瓜地)
function buildVeggiePatch(parent) {
  const veggieGroup = new THREE.Group();
  veggieGroup.position.set(2.5, 1.25, 16.5);

  // Raised dirt bed
  const bed = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.25, 2.8),
    getToonMaterial(PALETTE.EARTH_PATH)
  );
  bed.position.y = 0.12;
  bed.receiveShadow = true;
  veggieGroup.add(bed);

  // Cabbage rows (green leafy globes)
  const cabbageMat = getToonMaterial(0x4ca050);
  for (let x = -1.2; x <= -0.2; x += 0.5) {
    for (let z = -0.9; z <= 0.9; z += 0.55) {
      const cabbage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15, 1), cabbageMat);
      cabbage.position.set(x, 0.32, z);
      veggieGroup.add(cabbage);
    }
  }

  // Orange Pumpkins on the soil
  const pumpkinMat = getToonMaterial(PALETTE.PUMPKIN_ORANGE);
  [[0.6, 0.28, -0.6, 0.26], [1.1, 0.24, 0.2, 0.22], [0.5, 0.3, 0.7, 0.3]].forEach(([px, py, pz, pr]) => {
    const pumpkin = new THREE.Mesh(new THREE.SphereGeometry(pr, 8, 8), pumpkinMat);
    pumpkin.scale.set(1.2, 0.8, 1.2);
    pumpkin.position.set(px, py, pz);
    pumpkin.castShadow = true;

    // Green pumpkin stem
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.04, 0.15, 5),
      getToonMaterial(0x386628)
    );
    stem.position.set(px, py + pr * 0.8, pz);
    stem.rotation.z = 0.2;
    veggieGroup.add(pumpkin, stem);
  });

  parent.add(veggieGroup);
}
