import * as THREE from 'three';

export class BaseTerrain {
  constructor(scene, materials) {
    this.scene = scene;
    this.mat = materials;
    this.group = new THREE.Group();
    this.animatedWater = null;

    this.buildBasePlinth();
    this.buildTerracedTerrain();
    this.buildRetainingWalls();
    this.buildStairsAndPaths();
    this.buildWaterSystem();

    this.scene.add(this.group);
  }

  // Create rounded rectangle 2D shape for the diorama base
  createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  buildBasePlinth() {
    const size = 52;
    const radius = 3.5;
    const height = 4.5;

    // 1. Lower pedestal rim (dark slate bevel base)
    const rimShape = this.createRoundedRectShape(size + 1.2, size + 1.2, radius + 0.6);
    const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.4,
      bevelThickness: 0.4,
    });
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, this.mat.plinthRim);
    rimMesh.position.y = -height - 0.4;
    rimMesh.receiveShadow = true;
    rimMesh.castShadow = true;
    this.group.add(rimMesh);

    // 2. Main Stone Plinth Body
    const baseShape = this.createRoundedRectShape(size, size, radius);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.25,
      bevelThickness: 0.25,
    });
    baseGeo.rotateX(Math.PI / 2);
    const baseMesh = new THREE.Mesh(baseGeo, this.mat.plinthStone);
    baseMesh.position.y = 0;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    this.group.add(baseMesh);

    // Decorative molding band at plinth top
    const bandShape = this.createRoundedRectShape(size + 0.3, size + 0.3, radius + 0.15);
    const bandGeo = new THREE.ExtrudeGeometry(bandShape, {
      depth: 0.3,
      bevelEnabled: false,
    });
    bandGeo.rotateX(Math.PI / 2);
    const bandMesh = new THREE.Mesh(bandGeo, this.mat.castleDarkStone);
    bandMesh.position.y = 0.15;
    this.group.add(bandMesh);
  }

  buildTerracedTerrain() {
    // Front Low: Farmland plateau (Y: 0.2 to 1.0)
    // Middle: Village plateau (Y: 2.2 to 2.8)
    // Rear High: Castle rock plateau (Y: 5.2 to 6.2)

    // Farmland Base Layer (Front & Wings)
    const farmGeo = new THREE.BoxGeometry(49, 1.2, 49);
    const farmMesh = new THREE.Mesh(farmGeo, this.mat.grassTerrain);
    farmMesh.position.set(0, 0.6, 0);
    farmMesh.receiveShadow = true;
    this.group.add(farmMesh);

    // Gentle knolls / undulations on farmland flanks
    const knollGeo1 = new THREE.CylinderGeometry(8, 10, 0.8, 8);
    const knoll1 = new THREE.Mesh(knollGeo1, this.mat.grassTerrain);
    knoll1.position.set(-17, 1.1, 14);
    knoll1.receiveShadow = true;
    this.group.add(knoll1);

    // Windmill knoll (Right Wing)
    const millKnollGeo = new THREE.CylinderGeometry(7, 9, 2.2, 8);
    const millKnoll = new THREE.Mesh(millKnollGeo, this.mat.grassTerrain);
    millKnoll.position.set(16.5, 1.7, -1);
    millKnoll.receiveShadow = true;
    this.group.add(millKnoll);

    // Middle Terrace: Village Level (Z: -7 to 7, X: -22 to 16, Y: 1.2 to 2.4)
    const villageGeo = new THREE.BoxGeometry(40, 1.6, 17);
    const villageMesh = new THREE.Mesh(villageGeo, this.mat.grassTerrain);
    villageMesh.position.set(-2, 1.8, 0);
    villageMesh.receiveShadow = true;
    this.group.add(villageMesh);

    // High Terrace: Castle Rock Mountain (Z: -24 to -6, X: -22 to 22, Y: 2.2 to 5.4)
    const castleMountGeo = new THREE.BoxGeometry(44, 3.4, 18);
    const castleMountMesh = new THREE.Mesh(castleMountGeo, this.mat.cliffRock);
    castleMountMesh.position.set(0, 3.5, -15);
    castleMountMesh.receiveShadow = true;
    castleMountMesh.castShadow = true;
    this.group.add(castleMountMesh);

    // Castle grassy courtyard plateau on top
    const castlePlateauGeo = new THREE.BoxGeometry(41, 0.6, 16);
    const castlePlateauMesh = new THREE.Mesh(castlePlateauGeo, this.mat.grassTerrain);
    castlePlateauMesh.position.set(0, 5.3, -15);
    castlePlateauMesh.receiveShadow = true;
    this.group.add(castlePlateauMesh);

    // Rocky outcrops supporting the castle terrace
    const rockGeo = new THREE.DodecahedronGeometry(1.8, 0);
    for (let i = 0; i < 14; i++) {
      const rock = new THREE.Mesh(rockGeo, this.mat.cliffRock);
      const angle = (i / 14) * Math.PI;
      const x = Math.cos(angle) * 20 + (Math.random() - 0.5) * 2;
      const z = -6.5 + (Math.random() - 0.5) * 1.5;
      rock.position.set(x, 3.2 + (Math.random() - 0.5) * 0.8, z);
      rock.scale.set(1 + Math.random() * 0.5, 0.8 + Math.random() * 0.6, 1.2 + Math.random() * 0.5);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      rock.receiveShadow = true;
      this.group.add(rock);
    }
  }

  buildRetainingWalls() {
    // 1. High Castle retaining wall (separating Castle plateau from Village)
    const wallSegLength = 3.5;
    const wallHeight = 2.4;
    const wallDepth = 0.8;

    // Left castle retaining wall
    for (let x = -20; x <= -4.5; x += wallSegLength) {
      this.createWallBlock(x, 4.4, -6.6, wallSegLength - 0.1, wallHeight, wallDepth);
    }
    // Right castle retaining wall
    for (let x = 4.5; x <= 20; x += wallSegLength) {
      this.createWallBlock(x, 4.4, -6.6, wallSegLength - 0.1, wallHeight, wallDepth);
    }

    // 2. Village to Farmland retaining wall (separating Village from Farmland)
    // Center left wall
    for (let x = -21; x <= -2; x += wallSegLength) {
      this.createWallBlock(x, 2.0, 7.8, wallSegLength - 0.1, 1.4, 0.7);
    }
    // Center right wall
    for (let x = 6; x <= 21; x += wallSegLength) {
      this.createWallBlock(x, 2.0, 7.8, wallSegLength - 0.1, 1.4, 0.7);
    }

    // 3. Windmill hill retaining wall
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 0.7 + 0.3;
      const x = 16.5 + Math.cos(angle) * 7.5;
      const z = -1 + Math.sin(angle) * 7.5;
      this.createWallBlock(x, 1.8, z, 2.2, 1.5, 0.6, -angle + Math.PI / 2);
    }
  }

  createWallBlock(x, y, z, w, h, d, rotY = 0) {
    const wallGeo = new THREE.BoxGeometry(w, h, d);
    const wallMesh = new THREE.Mesh(wallGeo, this.mat.castleStone);
    wallMesh.position.set(x, y, z);
    wallMesh.rotation.y = rotY;
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    this.group.add(wallMesh);

    // Stone coping ledge on top
    const capGeo = new THREE.BoxGeometry(w + 0.2, 0.2, d + 0.25);
    const capMesh = new THREE.Mesh(capGeo, this.mat.castleDarkStone);
    capMesh.position.set(x, y + h / 2 + 0.1, z);
    capMesh.rotation.y = rotY;
    capMesh.castShadow = true;
    capMesh.receiveShadow = true;
    this.group.add(capMesh);
  }

  buildStairsAndPaths() {
    // 1. Castle Stairway: Grand stone stairs climbing from Village (-1 to 1, Z: -6.5 to -3) up to Castle Gate (Y: 2.6 -> 5.4)
    const stepCount = 10;
    const startY = 2.6;
    const endY = 5.3;
    const startZ = -3.2;
    const endZ = -6.5;

    for (let i = 0; i < stepCount; i++) {
      const t = i / (stepCount - 1);
      const stepY = startY + t * (endY - startY);
      const stepZ = startZ + t * (endZ - startZ);
      const stepGeo = new THREE.BoxGeometry(3.6, 0.35, 0.65);
      const step = new THREE.Mesh(stepGeo, this.mat.castleDarkStone);
      step.position.set(0, stepY, stepZ);
      step.castShadow = true;
      step.receiveShadow = true;
      this.group.add(step);
    }

    // Stone balustrade flanking the castle stairs
    [-2.0, 2.0].forEach(bx => {
      const railGeo = new THREE.BoxGeometry(0.35, 0.8, 3.8);
      const rail = new THREE.Mesh(railGeo, this.mat.castleStone);
      rail.position.set(bx, 4.2, -4.8);
      rail.rotation.x = Math.atan2(endY - startY, endZ - startZ) - Math.PI / 2;
      this.group.add(rail);

      // Newel posts with stone orbs
      [startZ, endZ].forEach((pz, idx) => {
        const postGeo = new THREE.BoxGeometry(0.5, 1.2, 0.5);
        const post = new THREE.Mesh(postGeo, this.mat.castleStone);
        const py = idx === 0 ? startY + 0.5 : endY + 0.5;
        post.position.set(bx, py, pz);
        this.group.add(post);

        const orbGeo = new THREE.SphereGeometry(0.25, 8, 8);
        const orb = new THREE.Mesh(orbGeo, this.mat.castleDarkStone);
        orb.position.set(bx, py + 0.7, pz);
        this.group.add(orb);
      });
    });

    // 2. Village Main Street: Cobblestone avenue (Z: -3 to 7, X: -2.5 to 2.5)
    const mainStreetGeo = new THREE.PlaneGeometry(5.2, 11);
    mainStreetGeo.rotateX(-Math.PI / 2);
    const mainStreet = new THREE.Mesh(mainStreetGeo, this.mat.cobblestonePath);
    mainStreet.position.set(0, 2.62, 2.2);
    mainStreet.receiveShadow = true;
    this.group.add(mainStreet);

    // Village Market Plaza: Wider cobblestone apron (Z: 0 to 6, X: -8 to 8)
    const plazaGeo = new THREE.PlaneGeometry(15, 6.5);
    plazaGeo.rotateX(-Math.PI / 2);
    const plaza = new THREE.Mesh(plazaGeo, this.mat.cobblestonePath);
    plaza.position.set(0, 2.61, 3.2);
    plaza.receiveShadow = true;
    this.group.add(plaza);

    // 3. Village to Farmland Stairs: Connecting village plaza down to Farmland (Z: 6.8 to 8.8, Y: 2.6 -> 1.2)
    const farmSteps = 6;
    for (let i = 0; i < farmSteps; i++) {
      const t = i / (farmSteps - 1);
      const stepY = 2.5 - t * 1.3;
      const stepZ = 7.0 + t * 1.6;
      const stepGeo = new THREE.BoxGeometry(3.2, 0.28, 0.5);
      const step = new THREE.Mesh(stepGeo, this.mat.castleDarkStone);
      step.position.set(2.0, stepY, stepZ);
      step.castShadow = true;
      step.receiveShadow = true;
      this.group.add(step);
    }

    // 4. Dirt paths meandering through the wheat fields
    const dirtPathsData = [
      { x: 2.0, z: 12.5, w: 2.6, d: 8, rot: 0 },
      { x: -6.0, z: 14.0, w: 2.2, d: 12, rot: 0.3 },
      { x: 10.0, z: 15.0, w: 2.0, d: 10, rot: -0.25 },
      { x: 10.0, z: 4.5, w: 2.2, d: 8, rot: 0.7 }, // path to windmill
    ];

    dirtPathsData.forEach(p => {
      const pGeo = new THREE.PlaneGeometry(p.w, p.d);
      pGeo.rotateX(-Math.PI / 2);
      const pMesh = new THREE.Mesh(pGeo, this.mat.dirtPath);
      pMesh.position.set(p.x, 1.22, p.z);
      pMesh.rotation.y = p.rot;
      pMesh.receiveShadow = true;
      this.group.add(pMesh);
    });
  }

  buildWaterSystem() {
    // 1. Castle Moat (U-shaped water channel in front and flanks of the castle)
    // Center moat trench (under the drawbridge)
    const centerMoatGeo = new THREE.PlaneGeometry(16, 4.2);
    centerMoatGeo.rotateX(-Math.PI / 2);
    const centerMoat = new THREE.Mesh(centerMoatGeo, this.mat.water);
    centerMoat.position.set(0, 4.4, -6.8);
    centerMoat.receiveShadow = true;
    this.group.add(centerMoat);

    // Left moat wing
    const leftMoatGeo = new THREE.PlaneGeometry(4.2, 14);
    leftMoatGeo.rotateX(-Math.PI / 2);
    const leftMoat = new THREE.Mesh(leftMoatGeo, this.mat.water);
    leftMoat.position.set(-15, 4.4, -13);
    leftMoat.receiveShadow = true;
    this.group.add(leftMoat);

    // Right moat wing
    const rightMoatGeo = new THREE.PlaneGeometry(4.2, 14);
    rightMoatGeo.rotateX(-Math.PI / 2);
    const rightMoat = new THREE.Mesh(rightMoatGeo, this.mat.water);
    rightMoat.position.set(15, 4.4, -13);
    rightMoat.receiveShadow = true;
    this.group.add(rightMoat);

    // 2. Irrigation River Canal winding from village down through the farmland
    // Flow canal (Z: 0 to 24, X: -10 to -7)
    const canalPoints = [
      new THREE.Vector3(-14, 2.1, -1),
      new THREE.Vector3(-13, 2.0, 4),
      new THREE.Vector3(-11, 1.1, 9),
      new THREE.Vector3(-10, 0.9, 16),
      new THREE.Vector3(-12, 0.8, 23),
    ];

    const canalCurve = new THREE.CatmullRomCurve3(canalPoints);
    const canalTubeGeo = new THREE.TubeGeometry(canalCurve, 32, 1.2, 8, false);
    // Flatten tube into a water ribbon surface
    canalTubeGeo.scale(1.4, 0.15, 1.0);
    const canalWater = new THREE.Mesh(canalTubeGeo, this.mat.water);
    canalWater.receiveShadow = true;
    this.group.add(canalWater);

    // Stone embankment curbs along the canal
    for (let t = 0; t <= 1; t += 0.08) {
      const pt = canalCurve.getPoint(t);
      const tangent = canalCurve.getTangent(t);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      [-1.4, 1.4].forEach(side => {
        const stoneGeo = new THREE.DodecahedronGeometry(0.45, 0);
        const stone = new THREE.Mesh(stoneGeo, this.mat.castleDarkStone);
        stone.position.set(pt.x + normal.x * side, pt.y + 0.1, pt.z + normal.z * side);
        stone.rotation.set(Math.random(), Math.random(), Math.random());
        stone.castShadow = true;
        this.group.add(stone);
      });
    }

    // Waterfall spillway from moat to village canal
    const waterfallGeo = new THREE.PlaneGeometry(2.4, 3.0);
    const waterfall = new THREE.Mesh(waterfallGeo, this.mat.water);
    waterfall.position.set(-14.5, 3.2, -4);
    waterfall.rotation.y = -Math.PI / 4;
    waterfall.rotation.x = Math.PI / 6;
    this.group.add(waterfall);

    this.animatedWater = [centerMoat, leftMoat, rightMoat, canalWater, waterfall];
  }

  update(time) {
    // Subtle wave shimmer on water
    if (this.animatedWater) {
      const shimmer = Math.sin(time * 2.5) * 0.03;
      this.animatedWater.forEach((w, idx) => {
        w.position.y += Math.sin(time * 2 + idx) * 0.001;
      });
    }
  }
}
