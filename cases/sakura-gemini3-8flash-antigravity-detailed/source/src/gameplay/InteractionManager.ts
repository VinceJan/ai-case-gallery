// src/gameplay/InteractionManager.ts
// Detects nearby interactive objects and provides contextual action prompts.
import * as THREE from 'three';
import { PlayerController } from './PlayerController';
import { NPCManager, LivingNPC } from '../characters/NPCSystem';
import { FoliageAndProps } from '../world/FoliageAndProps';
import { SakuraMart } from '../buildings/SakuraMart';
import { CafeKomorebi } from '../buildings/CafeKomorebi';
import { PlayerHouse } from '../buildings/PlayerHouse';
import { SakuraShrine, OmikujiFortune } from '../buildings/SakuraShrine';
import { TownSchool } from '../buildings/TownSchool';
import { TrainSystem } from '../vehicles/Train';
import { Bicycle } from '../vehicles/Bicycle';
import { audio } from '../engine/AudioSynthesizer';

export interface InteractionPrompt {
  id: string;
  label: string;
  key: string;
  distance: number;
  onExecute: () => void;
}

export class InteractionManager {
  public currentPrompt: InteractionPrompt | null = null;

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyE' && this.currentPrompt && this.currentPrompt.key === 'E') {
        this.currentPrompt.onExecute();
      }
      if (e.code === 'KeyB' && this.currentPrompt && this.currentPrompt.key === 'B') {
        this.currentPrompt.onExecute();
      }
    });
  }

  public update(
    player: PlayerController,
    npcs: NPCManager,
    props: FoliageAndProps,
    mart: SakuraMart,
    cafe: CafeKomorebi,
    house: PlayerHouse,
    shrine: SakuraShrine,
    school: TownSchool,
    train: TrainSystem,
    bicycle: Bicycle,
    callbacks: {
      onOpenDialogue: (npc: LivingNPC) => void;
      onOpenShop: () => void;
      onOpenOmikuji: (fortune: OmikujiFortune) => void;
      onShowToast: (msg: string) => void;
      onSleep: () => void;
    }
  ): void {
    const pPos = player.position;
    const candidates: InteractionPrompt[] = [];

    // 1. Train Riding / Disembarking
    if (player.isRidingTrain) {
      if (train.currentState === 'STOPPING_AT_STATION') {
        candidates.push({
          id: 'disembark_train',
          label: 'Disembark at Sakura Station',
          key: 'E',
          distance: 0,
          onExecute: () => {
            player.toggleTrainRide();
            player.position.set(-10, 0.75, 23.5); // Step onto platform
            callbacks.onShowToast('You stepped off the train onto the Sakura Station platform.');
          }
        });
      }
    } else if (train.isBoardable(pPos)) {
      candidates.push({
        id: 'board_train',
        label: 'Board Commuter Train (さくら町行)',
        key: 'E',
        distance: pPos.distanceTo(train.car1.position),
        onExecute: () => {
          player.toggleTrainRide();
          callbacks.onShowToast('You boarded the commuter train. Enjoy the scenic journey!');
        }
      });
    }

    // 2. Bicycle Mount / Dismount
    if (player.isRidingBicycle) {
      candidates.push({
        id: 'dismount_bike',
        label: 'Park Bicycle',
        key: 'B',
        distance: 0,
        onExecute: () => {
          player.dismountBicycle();
          callbacks.onShowToast('You parked your bicycle.');
        }
      });
    } else {
      const distToBike = pPos.distanceTo(bicycle.mesh.position);
      if (distToBike < 2.5) {
        candidates.push({
          id: 'mount_bike',
          label: 'Ride Mamachari Bicycle (ママチャリ)',
          key: 'B',
          distance: distToBike,
          onExecute: () => {
            player.mountBicycle(bicycle);
            callbacks.onShowToast('Mounted bicycle! WASD to steer, Shift to speed up, F to ring bell.');
          }
        });
      }
    }

    // 3. Nearby NPCs
    const nearbyNPC = npcs.getNearbyNPC(pPos, 2.5);
    if (nearbyNPC && !player.isRidingTrain && !player.isRidingBicycle) {
      candidates.push({
        id: `talk_${nearbyNPC.personality.id}`,
        label: nearbyNPC.isCat ? 'Pet Mikan the Calico Cat' : `Talk with ${nearbyNPC.personality.name} (${nearbyNPC.personality.jpName})`,
        key: 'E',
        distance: pPos.distanceTo(nearbyNPC.currentPos),
        onExecute: () => {
          if (nearbyNPC.isCat) {
            audio.playCatMeow();
            callbacks.onShowToast('Mikan purred happily as you gently stroked her warm fur!');
          }
          callbacks.onOpenDialogue(nearbyNPC);
        }
      });
    }

    // 4. Vending Machines
    props.vendingMachines.forEach((vm, idx) => {
      const dist = pPos.distanceTo(vm.position);
      if (dist < 2.2) {
        candidates.push({
          id: `vending_${idx}`,
          label: 'Buy Drink from Vending Machine (¥130)',
          key: 'E',
          distance: dist,
          onExecute: () => {
            audio.playVendingMachineBuy();
            callbacks.onShowToast('Inserted ¥130. A chilled can of Sakura Soda dropped with a satisfying clunk!');
          }
        });
      }
    });

    // 5. Sakura Mart Counter
    const distToMartCounter = pPos.distanceTo(mart.checkoutCounterPos);
    if (distToMartCounter < 2.6) {
      candidates.push({
        id: 'mart_counter',
        label: 'Shop at Sakura Mart (さくらマート)',
        key: 'E',
        distance: distToMartCounter,
        onExecute: () => {
          callbacks.onOpenShop();
        }
      });
    }

    // 6. Cafe Komorebi Counter
    const distToCafe = pPos.distanceTo(new THREE.Vector3(cafe.cafePos.x - 2.5, 0.5, cafe.cafePos.z + 1.0));
    if (distToCafe < 2.5) {
      candidates.push({
        id: 'cafe_coffee',
        label: 'Order Hand-Drip Pour-Over Coffee (¥450)',
        key: 'E',
        distance: distToCafe,
        onExecute: () => {
          audio.playDrinkCan();
          callbacks.onShowToast('Kenji poured you a fragrant cup of fresh roast coffee. Warmth fills your soul!');
        }
      });
    }

    // 7. Player House Interactions
    const distToHouseDoor = pPos.distanceTo(new THREE.Vector3(house.housePos.x - 2.2, 0, house.housePos.z + 4.0));
    if (distToHouseDoor < 2.2) {
      candidates.push({
        id: 'house_door',
        label: house.isFrontDoorOpen ? 'Close Front Door' : 'Open Front Door',
        key: 'E',
        distance: distToHouseDoor,
        onExecute: () => house.toggleFrontDoor()
      });
    }

    const distToFridge = pPos.distanceTo(house.fridgePos);
    if (distToFridge < 2.0) {
      candidates.push({
        id: 'house_fridge',
        label: 'Open Fridge & Drink Cold Barley Tea (麦茶)',
        key: 'E',
        distance: distToFridge,
        onExecute: () => {
          audio.playDrinkCan();
          callbacks.onShowToast('You drank refreshing cold barley tea. Stamina completely restored!');
        }
      });
    }

    const distToBed = pPos.distanceTo(house.bedPos);
    if (distToBed < 2.4) {
      candidates.push({
        id: 'house_bed',
        label: 'Sleep in Bed until 07:00 AM (Next Day)',
        key: 'E',
        distance: distToBed,
        onExecute: () => callbacks.onSleep()
      });
    }

    // 8. Shrine Interactions
    const distToSaisen = pPos.distanceTo(shrine.saisenbakoPos);
    if (distToSaisen < 2.5) {
      candidates.push({
        id: 'shrine_pray',
        label: 'Offer 5¥ & Pray at Saisenbako (二礼二拍手一礼)',
        key: 'E',
        distance: distToSaisen,
        onExecute: () => {
          const res = shrine.pray();
          callbacks.onShowToast(res.message);
        }
      });
    }

    const distToOmikuji = pPos.distanceTo(shrine.omikujiPos);
    if (distToOmikuji < 2.2) {
      candidates.push({
        id: 'shrine_omikuji',
        label: 'Draw Omikuji Sacred Fortune (¥100)',
        key: 'E',
        distance: distToOmikuji,
        onExecute: () => {
          const fortune = shrine.drawOmikuji();
          callbacks.onOpenOmikuji(fortune);
        }
      });
    }

    // Sort by proximity
    candidates.sort((a, b) => a.distance - b.distance);
    this.currentPrompt = candidates.length > 0 ? candidates[0] : null;
  }
}
