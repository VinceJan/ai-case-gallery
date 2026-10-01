const PIXEL_WIDTH = 24;
const PIXEL_HEIGHT = 32;
const ACTOR_HEIGHT = 1.3;
const INK = '#493b32';

function canvasTexture(THREE, width, height, draw, pixelated = true) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  draw(context);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = pixelated ? THREE.NearestFilter : THREE.LinearFilter;
  texture.minFilter = texture.magFilter;
  texture.generateMipmaps = false;
  if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function pixelBrush(context) {
  return (x, y, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
  };
}

function drawLegs(rect, frame, trousers, highlight) {
  const poses = [[9, 14, 0, 0], [8, 15, 1, 0], [9, 14, 0, 0], [10, 13, 0, 1]];
  const [left, right, leftLift, rightLift] = poses[frame];
  [[left, leftLift], [right, rightLift]].forEach(([x, lift]) => {
    rect(x, 23, 3, 8 - lift, INK);
    rect(x + 1, 24, 2, 5 - lift, trousers);
    rect(x + 1, 25, 1, 3, highlight);
    rect(x - 1, 29 - lift, 5, 3, INK);
    rect(x, 29 - lift, 3, 1, '#82634b');
  });
}

function drawKnight(context, frame, idle = false) {
  const rect = pixelBrush(context);
  const steel = '#aebbb5';
  const light = '#e7e4cf';
  const darkSteel = '#6b7b75';
  const gold = '#dab064';
  const handLift = frame === 1 ? -1 : frame === 3 ? 1 : 0;

  // Cape, boots, and sword sit behind the armour and shield.
  rect(5, 11, 10, 17, INK);
  const capeShift = [0, -1, 0, 1][frame];
  rect(4 + capeShift, 19, 10, 9, INK);
  rect(6, 12, 8, 15, '#a9523c');
  rect(5 + capeShift, 20, 8, 7, '#a9523c');
  rect(6, 14, 2, 12, '#cb7850');
  rect(8, 25, 4, 2, '#d58a5c');
  drawLegs(rect, idle ? 0 : frame, steel, light);
  rect(20, 6 + handLift, 2, 16, INK);
  rect(21, 7 + handLift, 1, 13, light);
  rect(20, 8 + handLift, 1, 12, steel);
  rect(21, 5 + handLift, 1, 2, light);
  rect(18, 20 + handLift, 5, 2, gold);
  rect(20, 22 + handLift, 2, 3, '#76563c');

  rect(8, 12, 10, 12, INK);
  rect(9, 13, 8, 9, steel);
  rect(10, 13, 5, 2, light);
  rect(7, 13, 4, 5, INK);
  rect(8, 14, 3, 3, steel);
  rect(15, 13, 5, 5, INK);
  rect(16, 14, 3, 3, light);
  rect(17, 18, 3, 4, darkSteel);
  rect(18, 21 + handLift, 2, 2, '#cf9867');
  rect(10, 16, 6, 8, '#6b7551');
  rect(11, 16, 1, 6, '#a3a06a');
  rect(9, 21, 8, 2, '#76563c');
  rect(13, 21, 2, 2, gold);
  rect(10, 23, 6, 1, gold);

  rect(10, 0, 5, 2, '#ad563e');
  rect(9, 1, 3, 2, '#cf8152');
  rect(9, 2, 8, 1, INK);
  rect(8, 3, 10, 8, INK);
  rect(9, 10, 8, 2, INK);
  rect(9, 3, 7, 7, steel);
  rect(10, 3, 4, 2, light);
  rect(9, 5, 2, 4, darkSteel);
  rect(12, 6, 6, 2, INK);
  rect(17, 6, 2, 2, INK);
  rect(14, 8, 3, 3, steel);
  rect(14, 9, 1, 2, darkSteel);
  rect(16, 9, 1, 2, darkSteel);

  rect(2, 16, 7, 10, INK);
  rect(3, 25, 5, 3, INK);
  rect(4, 28, 3, 1, INK);
  rect(3, 17, 5, 8, '#70774b');
  rect(4, 25, 3, 2, '#70774b');
  rect(3, 17, 5, 1, gold);
  rect(3, 18, 1, 6, gold);
  rect(5, 19, 1, 5, gold);
  rect(4, 21, 3, 1, gold);
  rect(5, 25, 1, 2, gold);
}

function drawFarmer(context, frame, wheatFarmer) {
  const rect = pixelBrush(context);
  const shirt = wheatFarmer ? '#e5d8ad' : '#b96c49';
  const shirtLight = wheatFarmer ? '#f3e7c5' : '#d58b58';
  const trousers = wheatFarmer ? '#727651' : '#626c51';
  const skin = '#d6a070';
  const gold = '#d8ae58';
  const handLift = frame === 1 ? -1 : frame === 3 ? 1 : 0;

  drawLegs(rect, frame, trousers, '#96936b');
  rect(8, 15, 10, 10, INK);
  rect(9, 16, 8, 8, shirt);
  rect(9, 16, 2, 6, shirtLight);
  rect(7, 16, 3, 6, INK);
  rect(8, 17, 2, 3, shirt);
  rect(7, 21, 3, 3, skin);
  rect(17, 16, 3, 6, INK);
  rect(17, 17, 2, 3, shirtLight);
  rect(17, 21 + handLift, 3, 3, skin);
  rect(11, 17, 5, 7, wheatFarmer ? '#a2a078' : '#e0c79a');
  rect(12, 18, 1, 5, wheatFarmer ? '#c7bc8b' : '#f0ddba');
  rect(9, 23, 8, 2, '#79573c');
  rect(13, 23, 2, 1, gold);

  rect(9, 8, 8, 8, INK);
  rect(10, 9, 6, 6, skin);
  rect(10, 9, 2, 4, '#b87950');
  rect(16, 11, 2, 2, skin);
  rect(15, 10, 1, 1, INK);
  rect(14, 14, 2, 1, '#995e42');
  rect(8, 9, 2, wheatFarmer ? 5 : 7, '#795337');
  rect(11, 15, 5, 1, wheatFarmer ? '#b9804d' : '#7e8756');

  // Stepped brim and alternating straw pixels keep the hats visibly pixel-built.
  rect(7, 1, 9, 2, INK);
  rect(6, 3, 11, 4, INK);
  rect(3, 6, 18, 3, INK);
  rect(8, 2, 7, 1, '#e9c879');
  rect(7, 3, 9, 3, gold);
  rect(8, 3, 1, 2, '#f0d990');
  rect(11, 3, 1, 2, '#ebc877');
  rect(14, 3, 1, 2, '#ebc877');
  rect(7, 5, 9, 1, wheatFarmer ? '#a76542' : '#7b8152');
  rect(4, 7, 16, 1, '#e7c575');
  rect(6, 8, 12, 1, '#b78e47');

  if (wheatFarmer) {
    rect(19, 16 + handLift, 1, 12, '#9b7a38');
    rect(21, 14 + handLift, 1, 14, gold);
    rect(18, 18 + handLift, 1, 10, gold);
    rect(19, 12 + handLift, 2, 5, gold);
    rect(21, 10 + handLift, 2, 5, gold);
    rect(17, 14 + handLift, 2, 5, gold);
    rect(19, 13 + handLift, 1, 1, '#f0d48a');
    rect(21, 11 + handLift, 1, 2, '#f0d48a');
    rect(17, 15 + handLift, 1, 1, '#f0d48a');
    rect(18, 22 + handLift, 5, 2, '#b76943');
  } else {
    rect(3, 23, 6, 6, INK);
    rect(4, 24, 4, 4, '#bd924d');
    rect(4, 25, 4, 1, '#e4bf70');
    rect(5, 24, 1, 4, '#e4bf70');
    rect(7, 24, 1, 4, '#97713e');
    rect(20, 19 + handLift, 2, 9, INK);
    rect(20, 20 + handLift, 1, 7, '#c2995c');
    rect(19, 12 + handLift, 4, 2, INK);
    rect(18, 14 + handLift, 3, 3, INK);
    rect(18, 17 + handLift, 2, 3, INK);
    rect(20, 12 + handLift, 3, 1, '#e0dfc9');
    rect(19, 14 + handLift, 1, 5, '#b0b9a7');
  }
}

/** Adds three lit pixel standees. update takes elapsed time and delta in seconds. */
export function createActors(THREE, scene) {
  const group = new THREE.Group();
  group.name = 'actors';
  scene.add(group);

  const frames = (draw) => Array.from({ length: 4 }, (_, frame) =>
    canvasTexture(THREE, PIXEL_WIDTH, PIXEL_HEIGHT, (context) => draw(context, frame)));
  const shadowTexture = canvasTexture(THREE, 64, 64, (context) => {
    const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(57, 43, 28, 0.32)');
    gradient.addColorStop(0.4, 'rgba(57, 43, 28, 0.18)');
    gradient.addColorStop(1, 'rgba(57, 43, 28, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
  }, false);
  const particleTextures = {
    straw: canvasTexture(THREE, 8, 8, (context) => {
      const rect = pixelBrush(context);
      rect(2, 1, 1, 3, '#ecd38c');
      rect(3, 3, 1, 3, '#d6b363');
      rect(4, 5, 1, 2, '#ad8748');
    }),
    leaf: canvasTexture(THREE, 8, 8, (context) => {
      const rect = pixelBrush(context);
      rect(3, 1, 2, 1, '#87905b');
      rect(2, 2, 4, 3, '#87905b');
      rect(3, 5, 2, 1, '#70794d');
      rect(3, 2, 1, 4, '#b0ac72');
      rect(4, 6, 1, 1, '#987d49');
    }),
  };
  const standeeGeometry = new THREE.PlaneGeometry(
    ACTOR_HEIGHT * PIXEL_WIDTH / PIXEL_HEIGHT, ACTOR_HEIGHT);
  const shadowGeometry = new THREE.PlaneGeometry(0.85, 0.46);
  const actors = [
    {
      name: 'knight', ground: 1.15, offset: 0, idle: 8.0, travel: 4.8, trail: 'leaf',
      route: [[-1.8, 3.6], [-0.45, 4.6], [0.5, 4.8]],
      textures: frames(drawKnight),
      idleTextures: frames((context, frame) => drawKnight(context, frame, true)),
    },
    {
      name: 'farmer-wheat', ground: 0.8, offset: 3.1, idle: 8.6, travel: 5.6, trail: 'straw',
      route: [[-5.0, 8.1], [-3.4, 9.3], [-4.6, 10.7]],
      textures: frames((context, frame) => drawFarmer(context, frame, true)),
    },
    {
      name: 'farmer-basket', ground: 0.8, offset: 6.2, idle: 9.2, travel: 5.4, trail: 'straw',
      route: [[4.5, 7.0], [6.0, 8.2], [4.8, 9.8]],
      textures: frames((context, frame) => drawFarmer(context, frame, false)),
    },
  ].map((actor) => {
    const root = new THREE.Group();
    root.name = actor.name;
    group.add(root);
    const billboard = new THREE.Group();
    root.add(billboard);
    const material = new THREE.MeshLambertMaterial({
      map: actor.textures[0], alphaTest: 0.5, side: THREE.DoubleSide,
    });
    const standee = new THREE.Mesh(standeeGeometry, material);
    standee.name = `${actor.name}-standee`;
    standee.castShadow = true;
    standee.receiveShadow = true;
    billboard.add(standee);
    const shadow = new THREE.Mesh(shadowGeometry, new THREE.MeshBasicMaterial({
      map: shadowTexture, transparent: true, depthWrite: false, opacity: 0.85,
    }));
    shadow.name = `${actor.name}-ground-shadow`;
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.012;
    root.add(shadow);
    return { ...actor, root, billboard, standee, lastStep: -1, frame: 0 };
  });

  // A fixed pool leaves no accumulating trail objects during long sessions.
  const particleGeometry = new THREE.PlaneGeometry(1, 1);
  const particles = Array.from({ length: 18 }, (_, index) => {
    const mesh = new THREE.Mesh(particleGeometry, new THREE.MeshLambertMaterial({
      map: particleTextures.leaf, side: THREE.DoubleSide,
      transparent: true, depthWrite: false, alphaTest: 0.02,
    }));
    mesh.name = `footstep-particle-${index}`;
    mesh.visible = false;
    group.add(mesh);
    return { mesh, age: 0, life: 0, vx: 0, vy: 0, vz: 0, spin: 0, ground: 0 };
  });
  let nextParticle = 0;
  const cameraPosition = new THREE.Vector3(30, 29, 38);

  function spawnFootstep(actor, yaw, dx, dz, step) {
    const particle = particles[nextParticle % particles.length];
    const seed = nextParticle++ * 2.399963;
    const side = step % 8 === 0 ? -1 : 1;
    particle.age = 0;
    particle.life = 0.75 + 0.15 * (0.5 + 0.5 * Math.sin(seed));
    particle.ground = actor.ground + 0.02;
    particle.vx = Math.cos(yaw) * side * 0.1 - dx * 0.025;
    particle.vy = 0.23;
    particle.vz = -Math.sin(yaw) * side * 0.1 - dz * 0.025;
    particle.spin = Math.sin(seed) * 2;
    particle.mesh.position.set(
      actor.root.position.x + Math.cos(yaw) * side * 0.13,
      particle.ground + 0.02,
      actor.root.position.z - Math.sin(yaw) * side * 0.13);
    particle.mesh.rotation.set(0, yaw, Math.sin(seed));
    particle.mesh.scale.set(0.12, 0.12, 1);
    particle.mesh.material.map = particleTextures[actor.trail];
    particle.mesh.material.opacity = 0.8;
    particle.mesh.visible = true;
  }

  function update(t = 0, dt = 0) {
    const time = Number.isFinite(t) ? Math.max(0, t) : 0;
    const delta = Number.isFinite(dt) ? Math.max(0, dt) : 0;
    const camera = scene.userData.camera;
    if (camera) camera.getWorldPosition(cameraPosition);

    for (const particle of particles) {
      if (!particle.mesh.visible) continue;
      particle.age += delta;
      if (particle.age >= particle.life) {
        particle.mesh.visible = false;
        continue;
      }
      particle.vy -= delta * 0.65;
      particle.mesh.position.x += particle.vx * delta;
      particle.mesh.position.z += particle.vz * delta;
      particle.mesh.position.y = Math.max(particle.ground,
        particle.mesh.position.y + particle.vy * delta);
      particle.mesh.rotation.y = Math.atan2(
        cameraPosition.x - particle.mesh.position.x, cameraPosition.z - particle.mesh.position.z);
      particle.mesh.rotation.z += particle.spin * delta;
      particle.mesh.material.opacity = 0.8 * (1 - particle.age / particle.life);
    }

    for (const actor of actors) {
      const localTime = time + actor.offset;
      const duration = actor.idle + actor.travel;
      const loop = Math.floor(localTime / duration);
      const phase = localTime % duration;
      const from = actor.route[loop % actor.route.length];
      const to = actor.route[(loop + 1) % actor.route.length];
      const walking = phase >= actor.idle;
      const progress = walking ? (phase - actor.idle) / actor.travel : 0;
      // Smooth starts and stops; each loop begins exactly at the last destination.
      const eased = progress * progress * (3 - 2 * progress);
      const dx = to[0] - from[0];
      const dz = to[1] - from[1];
      actor.root.position.set(from[0] + dx * eased, actor.ground, from[1] + dz * eased);
      const yaw = Math.atan2(
        cameraPosition.x - actor.root.position.x, cameraPosition.z - actor.root.position.z);
      actor.billboard.rotation.y = yaw;
      const facing = walking
        ? (dx * Math.cos(yaw) - dz * Math.sin(yaw) >= 0 ? 1 : -1)
        : (Math.floor(localTime / 2.8) % 2 === 0 ? 1 : -1);
      const step = walking ? Math.floor((phase - actor.idle) * 5) : -1;
      const frame = walking ? step % 4 : actor.idleTextures ? Math.floor(localTime * 2) % 4 : 0;
      const texture = !walking && actor.idleTextures ? actor.idleTextures[frame] : actor.textures[frame];
      if (actor.standee.material.map !== texture) {
        actor.standee.material.map = texture;
        actor.frame = frame;
      }
      const breath = 1 + Math.sin(localTime * 2.1) * 0.006;
      const bob = walking && frame % 2 === 1 ? 0.018 : 0;
      actor.standee.scale.set(facing, breath, 1);
      actor.standee.position.y = ACTOR_HEIGHT * breath / 2 + bob;
      actor.standee.rotation.z = walking ? [0, -0.018, 0, 0.018][frame] : 0;
      if (walking && delta > 0 && step !== actor.lastStep && step % 4 === 0) {
        spawnFootstep(actor, yaw, dx, dz, step);
      }
      actor.lastStep = step;
    }
  }

  update(0, 0);
  return { update };
}
