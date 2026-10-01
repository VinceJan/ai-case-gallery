// src/characters/NPCSystem.ts
// Living townspeople simulation with 24-hour schedules, social interactions, and dialogues.
import * as THREE from 'three';
import { NPCPersonality, NPCScheduleItem, WeatherType } from '../types';
import { AvatarGenerator, AvatarParts } from './AvatarGenerator';
import { physics } from '../engine/Physics';
import { audio } from '../engine/AudioSynthesizer';

export interface LivingNPC {
  personality: NPCPersonality;
  avatar: AvatarParts;
  currentPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  walkTimer: number;
  isInteracting: boolean;
  activeActivity: string;
  isCat?: boolean;
}

export class NPCManager {
  public group: THREE.Group;
  public npcs: Map<string, LivingNPC> = new Map();

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);

    this.initializeCharacters();
  }

  private initializeCharacters(): void {
    // 1. Hina (ひな) - Friendly Sakura Mart Clerk
    const hinaData: NPCPersonality = {
      id: 'hina',
      name: 'Hina',
      jpName: 'ひな',
      role: 'Convenience Store Clerk',
      jpRole: 'さくらマート店員',
      description: 'A cheerful young woman who loves melon pan and strawberry milk.',
      avatarColor: '#ffe0bd',
      outfitColor: '#2ecc71', // Sakura Mart green apron
      hairColor: '#e67e22',   // Caramel brown
      hairStyle: 'ponytail',
      friendship: 10,
      defaultDialogue: [
        'いらっしゃいませ！ Welcome to Sakura Mart 24H!',
        'The fresh Sakura Mochi arrived this morning! It goes wonderfully with hot green tea.',
        'Did you see the cherry petals fluttering outside the window? Late spring is truly the most lovely season.'
      ],
      schedule: [
        { startHour: 6, endHour: 8, activity: 'Walking to store', destination: { x: 34, y: 0, z: 8 }, animation: 'walk', areaName: 'Station Avenue' },
        { startHour: 8, endHour: 17, activity: 'Working cashier shift', destination: { x: 35.5, y: 0, z: 1.2 }, animation: 'work', areaName: 'Sakura Mart' },
        { startHour: 17, endHour: 19, activity: 'Resting by the river canal', destination: { x: 22, y: 0, z: -32 }, animation: 'sit', areaName: 'Sakura River Promenade' },
        { startHour: 19, endHour: 24, activity: 'Returning home to Sakura Villa', destination: { x: -48, y: 0, z: -14 }, animation: 'idle', areaName: 'Residential Quarter' }
      ]
    };
    this.addHumanNPC(hinaData);

    // 2. Sato-san (佐藤さん) - Kind Elderly Shrine Caretaker
    const satoData: NPCPersonality = {
      id: 'sato',
      name: 'Sato-san',
      jpName: '佐藤さん',
      role: 'Town Elder & Shrine Caretaker',
      jpRole: '神社世話人',
      description: 'Has lived in Sakura Town for over 60 years. Tends the sacred ancient tree.',
      avatarColor: '#f1d2b8',
      outfitColor: '#795548', // Traditional brown vest
      hairColor: '#dcdde1',   // Silver grey
      hairStyle: 'short',
      friendship: 15,
      defaultDialogue: [
        'Oh, good day young traveler. Isn’t the hill air sweet today?',
        'The ancient sacred tree (御神木) has protected our town since the Meiji era.',
        'Have you seen our calico cat Mikan? She has a little brass bell around her neck, but I think she lost it near the river bridge!'
      ],
      schedule: [
        { startHour: 5, endHour: 10, activity: 'Sweeping shrine grounds', destination: { x: -38, y: 5.0, z: -62 }, animation: 'work', areaName: 'Sakura Shrine' },
        { startHour: 10, endHour: 15, activity: 'Strolling along Sakura River', destination: { x: -25, y: 0, z: -32 }, animation: 'walk', areaName: 'River Promenade' },
        { startHour: 15, endHour: 18.5, activity: 'Sitting at scenic overlook', destination: { x: -46, y: 5.0, z: -60 }, animation: 'sit', areaName: 'Hilltop Overlook' },
        { startHour: 18.5, endHour: 24, activity: 'Resting in Japanese home', destination: { x: -55, y: 0, z: 2 }, animation: 'idle', areaName: 'Old Residence' }
      ]
    };
    this.addHumanNPC(satoData);

    // 3. Aoi (葵) - High School Student & Sketch Artist
    const aoiData: NPCPersonality = {
      id: 'aoi',
      name: 'Aoi',
      jpName: '葵',
      role: 'High School Student',
      jpRole: '南中学校 2年生',
      description: 'Carries a sketchbook everywhere. Dreams of studying art in Tokyo.',
      avatarColor: '#ffe0bd',
      outfitColor: '#1a237e', // Navy sailor uniform
      hairColor: '#2f3542',   // Deep raven black
      hairStyle: 'bob',
      friendship: 10,
      defaultDialogue: [
        'Hello! I’m trying to capture the way the train reflects in the canal water.',
        'Ren keeps saying he’s going to practice soccer until sunset... he works so hard.',
        'If you visit the shrine, you should look at the Ema prayer plaques. People write their truest wishes there.'
      ],
      schedule: [
        { startHour: 7.5, endHour: 15.5, activity: 'Attending school classes', destination: { x: -30, y: 0, z: 54 }, animation: 'read', areaName: 'South School' },
        { startHour: 15.5, endHour: 17.5, activity: 'Sketching cherry trees by canal', destination: { x: 5, y: 0, z: -32 }, animation: 'sit', areaName: 'Sakura River' },
        { startHour: 17.5, endHour: 19.5, activity: 'Waiting near the railway crossing', destination: { x: 21, y: 0, z: 20 }, animation: 'idle', areaName: 'Railway Crossing' },
        { startHour: 19.5, endHour: 24, activity: 'Doing homework at home', destination: { x: -38, y: 0, z: -6 }, animation: 'idle', areaName: 'Residence' }
      ]
    };
    this.addHumanNPC(aoiData);

    // 4. Ren (莲) - High School Cyclist & Athlete
    const renData: NPCPersonality = {
      id: 'ren',
      name: 'Ren',
      jpName: '蓮',
      role: 'High School Student',
      jpRole: '南中学校 2年生',
      description: 'Energetic and passionate about soccer and cycling.',
      avatarColor: '#ffe0bd',
      outfitColor: '#34495e', // School blazer
      hairColor: '#d35400',   // Spiky reddish brown
      hairStyle: 'spiky',
      friendship: 10,
      defaultDialogue: [
        'Hey there! Beautiful day for a bike ride along the avenue!',
        'Did you hear the train crossing bell? I always try to sprint across before the barrier drops... well, usually!',
        'Um... if you happen to talk to Aoi, don’t mention my shrine wish, okay? It’s kind of embarrassing.'
      ],
      schedule: [
        { startHour: 7.5, endHour: 16.0, activity: 'School & soccer practice', destination: { x: -30, y: 0, z: 58 }, animation: 'work', areaName: 'School Sports Ground' },
        { startHour: 16.0, endHour: 17.5, activity: 'Buying soda at Sakura Mart', destination: { x: 33, y: 0, z: 12 }, animation: 'idle', areaName: 'Sakura Mart' },
        { startHour: 17.5, endHour: 19.0, activity: 'Visiting the shrine Ema rack', destination: { x: -43.5, y: 5.0, z: -67 }, animation: 'pray', areaName: 'Sakura Shrine' },
        { startHour: 19.0, endHour: 24, activity: 'At home resting', destination: { x: -60, y: 0, z: -8 }, animation: 'idle', areaName: 'Residence' }
      ]
    };
    this.addHumanNPC(renData);

    // 5. Takahashi-san (高橋さん) - Station Master
    const takahashiData: NPCPersonality = {
      id: 'takahashi',
      name: 'Takahashi-san',
      jpName: '高橋駅長',
      role: 'Sakura Station Master',
      jpRole: 'さくら町駅 駅長',
      description: 'Has kept the trains running on time for thirty-five years.',
      avatarColor: '#ffe0bd',
      outfitColor: '#1a237e', // Navy JR uniform with gold buttons
      hairColor: '#718093',
      hairStyle: 'hat',       // Station Master Peaked Cap!
      friendship: 20,
      defaultDialogue: [
        'Safety first! Please stand behind the yellow tactile line on the platform.',
        'The 2-car EMU commuter arrives every few minutes on our scenic loop. Feel free to hop on and enjoy the view!',
        'Our departure melody is an original chime composed right here in Sakura Town.'
      ],
      schedule: [
        { startHour: 6, endHour: 22, activity: 'Managing station platform', destination: { x: -10, y: 0.75, z: 23.5 }, animation: 'work', areaName: 'Sakura Station Platform' },
        { startHour: 22, endHour: 24, activity: 'Night station inspection', destination: { x: -15, y: 0, z: 20 }, animation: 'idle', areaName: 'Station Office' }
      ]
    };
    this.addHumanNPC(takahashiData);

    // 6. Kenji (健二) - Cafe Komorebi Barista Master
    const kenjiData: NPCPersonality = {
      id: 'kenji',
      name: 'Kenji',
      jpName: '健二',
      role: 'Cafe Owner & Master Barista',
      jpRole: '珈琲 木漏れ日 店主',
      description: 'A master of slow pour-over coffee who loves vinyl jazz records.',
      avatarColor: '#ffe0bd',
      outfitColor: '#3e2723', // Dark apron
      hairColor: '#2d3436',
      hairStyle: 'short',
      friendship: 15,
      defaultDialogue: [
        'Welcome to Komorebi. Would you like a fresh pour-over coffee?',
        'Sitting on the terrace watching the sakura petals drift down the river is the best therapy.',
        'Coffee is all about time and temperature. Just like life in this town, you shouldn’t rush it.'
      ],
      schedule: [
        { startHour: 8, endHour: 20, activity: 'Brewing coffee at the counter', destination: { x: 17.5, y: 0, z: -17 }, animation: 'work', areaName: 'Cafe Komorebi' },
        { startHour: 20, endHour: 24, activity: 'Listening to records on terrace', destination: { x: 20, y: 0, z: -24 }, animation: 'sit', areaName: 'Cafe Terrace' }
      ]
    };
    this.addHumanNPC(kenjiData);

    // 7. Mikan (ミカン) - Town Calico Cat
    const mikanData: NPCPersonality = {
      id: 'mikan',
      name: 'Mikan',
      jpName: 'ミカン',
      role: 'Town Calico Cat',
      jpRole: '三毛猫',
      description: 'The unofficial mascot of Sakura Town. Loves sunny spots and fish treats.',
      avatarColor: '#ffffff',
      outfitColor: '#ffffff',
      hairColor: '#e67e22',
      hairStyle: 'short',
      friendship: 30,
      defaultDialogue: [
        'Nyaa~ (Mikan gently rubs her head against your shoes)',
        'Purrrr... (Mikan stretches lazily in the warm spring sunshine)',
        'Mew! (Mikan looks toward the river canal and tilts her head curiously)'
      ],
      schedule: [
        { startHour: 6, endHour: 11, activity: 'Napping outside Sakura Mart', destination: { x: 33, y: 0, z: 9 }, animation: 'idle', areaName: 'Sakura Mart' },
        { startHour: 11, endHour: 16, activity: 'Sunbathing on the red bridge', destination: { x: -35, y: 0.35, z: -35 }, animation: 'sit', areaName: 'Red Shrine Bridge' },
        { startHour: 16, endHour: 24, activity: 'Exploring shrine ancient tree', destination: { x: -38, y: 5.0, z: -73 }, animation: 'idle', areaName: 'Sacred Tree' }
      ]
    };
    this.addCatNPC(mikanData);
  }

  private addHumanNPC(data: NPCPersonality): void {
    const avatar = AvatarGenerator.createHumanAvatar({
      hairColor: parseInt(data.hairColor.replace('#', '0x'), 16),
      hairStyle: data.hairStyle,
      outfitColor: parseInt(data.outfitColor.replace('#', '0x'), 16),
      skinColor: parseInt(data.avatarColor.replace('#', '0x'), 16)
    });

    const initPos = new THREE.Vector3(
      data.schedule[0].destination.x,
      data.schedule[0].destination.y,
      data.schedule[0].destination.z
    );
    avatar.group.position.copy(initPos);
    this.group.add(avatar.group);

    this.npcs.set(data.id, {
      personality: data,
      avatar,
      currentPos: initPos,
      targetPos: initPos.clone(),
      walkTimer: Math.random() * 10,
      isInteracting: false,
      activeActivity: data.schedule[0].activity
    });
  }

  private addCatNPC(data: NPCPersonality): void {
    const avatar = AvatarGenerator.createCalicoCat();
    const initPos = new THREE.Vector3(
      data.schedule[0].destination.x,
      data.schedule[0].destination.y,
      data.schedule[0].destination.z
    );
    avatar.group.position.copy(initPos);
    this.group.add(avatar.group);

    this.npcs.set(data.id, {
      personality: data,
      avatar,
      currentPos: initPos,
      targetPos: initPos.clone(),
      walkTimer: 0,
      isInteracting: false,
      activeActivity: data.schedule[0].activity,
      isCat: true
    });
  }

  public update(currentHour: number, weather: WeatherType, delta: number, playerPos: THREE.Vector3): void {
    this.npcs.forEach((npc) => {
      // 1. Determine active schedule by hour
      let activeItem: NPCScheduleItem = npc.personality.schedule[0];
      for (const item of npc.personality.schedule) {
        if (currentHour >= item.startHour && currentHour < item.endHour) {
          activeItem = item;
          break;
        }
      }
      npc.activeActivity = activeItem.activity;
      npc.targetPos.set(activeItem.destination.x, activeItem.destination.y, activeItem.destination.z);

      // Rain umbrella toggle for human NPCs
      if (!npc.isCat && npc.avatar.umbrella) {
        const isOutdoors = Math.abs(npc.currentPos.z) > 10;
        npc.avatar.umbrella.visible = weather === 'rain' && isOutdoors;
      }

      // 2. If talking with player, turn to face player
      const distToPlayer = npc.currentPos.distanceTo(playerPos);
      if (distToPlayer < 2.8) {
        const dx = playerPos.x - npc.currentPos.x;
        const dz = playerPos.z - npc.currentPos.z;
        const targetRotY = Math.atan2(dx, dz);
        npc.avatar.group.rotation.y = THREE.MathUtils.lerp(
          npc.avatar.group.rotation.y,
          targetRotY,
          delta * 4.0
        );
        return;
      }

      // 3. Movement towards target position
      const moveVec = new THREE.Vector3().subVectors(npc.targetPos, npc.currentPos);
      moveVec.y = 0;
      const dist = moveVec.length();

      if (dist > 0.4) {
        // Walking
        moveVec.normalize();
        const moveSpeed = npc.isCat ? 1.6 : 1.2;
        npc.currentPos.addScaledVector(moveVec, moveSpeed * delta);
        npc.currentPos.y = physics.getTerrainHeight(npc.currentPos.x, npc.currentPos.z);
        npc.avatar.group.position.copy(npc.currentPos);

        // Face movement direction
        const rotY = Math.atan2(moveVec.x, moveVec.z);
        npc.avatar.group.rotation.y = rotY;

        // Limb swinging walk animation
        npc.walkTimer += delta * 7.5;
        const swing = Math.sin(npc.walkTimer) * 0.45;
        if (!npc.isCat) {
          npc.avatar.leftArm.rotation.x = swing;
          npc.avatar.rightArm.rotation.x = -swing;
          npc.avatar.leftLeg.rotation.x = -swing;
          npc.avatar.rightLeg.rotation.x = swing;
        }
      } else {
        // Idle animation
        npc.walkTimer += delta * 2.0;
        const breath = Math.sin(npc.walkTimer) * 0.03;
        npc.avatar.group.position.y = npc.currentPos.y + breath;

        if (!npc.isCat) {
          npc.avatar.leftArm.rotation.x = 0;
          npc.avatar.rightArm.rotation.x = 0;
          npc.avatar.leftLeg.rotation.x = 0;
          npc.avatar.rightLeg.rotation.x = 0;
        } else if (npc.avatar.catTail) {
          // Cat tail gentle sway
          npc.avatar.catTail.rotation.y = Math.sin(npc.walkTimer * 1.5) * 0.4;
        }
      }
    });
  }
}
