// src/gameplay/QuestManager.ts
// Story quests, resident favors, and town progression system.
import { Quest } from '../types';
import { InventorySystem } from './InventorySystem';
import { audio } from '../engine/AudioSynthesizer';

export class QuestManager {
  public quests: Map<string, Quest> = new Map();
  public activeQuestId: string = 'quest_welcome';

  constructor(private inventory: InventorySystem) {
    this.initializeQuests();
  }

  private initializeQuests(): void {
    const list: Quest[] = [
      {
        id: 'quest_welcome',
        title: 'A Spring Arrival in Sakura Town',
        jpTitle: 'さくらの町へようこそ',
        description: 'You stepped off the train into Sakura Town. Begin your journey by greeting the residents.',
        giver: 'Takahashi-san',
        rewardMoney: 500,
        rewardItem: 'sakura_mochi',
        isCompleted: false,
        currentStep: 0,
        totalSteps: 3,
        stepDescriptions: [
          'Talk with Station Master Takahashi on the platform.',
          'Cross the railway crossing and visit Sakura Mart to greet Hina.',
          'Buy a drink from the vending machine or store and drink it.'
        ]
      },
      {
        id: 'quest_mikan_bell',
        title: 'The Lost Brass Bell',
        jpTitle: 'ミカンの失われた鈴',
        description: 'Mikan the calico cat lost her antique collar bell somewhere along the river canal!',
        giver: 'Sato-san',
        rewardMoney: 800,
        rewardItem: 'cat_treat',
        isCompleted: false,
        currentStep: 0,
        totalSteps: 3,
        stepDescriptions: [
          'Talk to Sato-san along the river promenade about Mikan.',
          'Search the grassy bank near the Red Wooden Bridge to find the Lost Brass Bell.',
          'Return the brass bell to Sato-san and pet Mikan!'
        ]
      },
      {
        id: 'quest_mochi_delivery',
        title: 'Afternoon Sweet Sakura Mochi',
        jpTitle: '午後の桜餅便り',
        description: 'Hina at Sakura Mart is preparing seasonal sakura treats and needs fresh matcha.',
        giver: 'Hina',
        rewardMoney: 1200,
        rewardItem: 'sakura_mochi',
        isCompleted: false,
        currentStep: 0,
        totalSteps: 3,
        stepDescriptions: [
          'Ask Hina at Sakura Mart what supplies she needs.',
          'Ride your bicycle to Cafe Komorebi and ask Barista Kenji for fresh matcha.',
          'Deliver the matcha back to Hina at Sakura Mart.'
        ]
      },
      {
        id: 'quest_ema_wishes',
        title: 'Ema Wishes Under the Blossoms',
        jpTitle: '絵馬に込めた願い',
        description: 'High school students Ren and Aoi have heartfelt wishes written on the shrine Ema board.',
        giver: 'Ren',
        rewardMoney: 1000,
        isCompleted: false,
        currentStep: 0,
        totalSteps: 3,
        stepDescriptions: [
          'Climb the hilltop shrine stone steps and inspect the Ema prayer board.',
          'Talk to Ren by the shrine ancient tree.',
          'Deliver Ren’s lucky encouragement note to Aoi at the school classroom.'
        ]
      },
      {
        id: 'quest_sunset_train',
        title: 'The Golden Hour Train',
        jpTitle: '夕暮れの列車を追って',
        description: 'Capture the iconic anime view: the commuter train crossing the river during sunset.',
        giver: 'Aoi',
        rewardMoney: 2000,
        isCompleted: false,
        currentStep: 0,
        totalSteps: 3,
        stepDescriptions: [
          'Wait for sunset (17:00 - 19:30) or relax on the scenic overlook bench.',
          'Press [P] to enter Sakura Snap camera mode.',
          'Take a photograph while the train is crossing the river truss bridge!'
        ]
      }
    ];

    list.forEach((q) => this.quests.set(q.id, q));
  }

  public getActiveQuest(): Quest | null {
    if (!this.activeQuestId || !this.quests.has(this.activeQuestId)) return null;
    return this.quests.get(this.activeQuestId)!;
  }

  public advanceQuest(questId: string): { completed: boolean; message: string } {
    if (!this.quests.has(questId)) return { completed: false, message: 'Quest not found.' };
    const q = this.quests.get(questId)!;
    if (q.isCompleted) return { completed: true, message: 'Quest already finished.' };

    q.currentStep += 1;
    audio.playChimeNote(880, 0.2, 0.1);

    if (q.currentStep >= q.totalSteps) {
      q.isCompleted = true;
      this.inventory.earnMoney(q.rewardMoney);
      if (q.rewardItem && InventorySystem.catalog[q.rewardItem]) {
        this.inventory.addItem(InventorySystem.catalog[q.rewardItem], 1);
      }
      audio.playTrainDepartureMelody();

      // Automatically activate next uncompleted quest
      for (const [id, nextQ] of this.quests.entries()) {
        if (!nextQ.isCompleted) {
          this.activeQuestId = id;
          break;
        }
      }

      return {
        completed: true,
        message: `Quest Completed: "${q.title}"! Earned ¥${q.rewardMoney}${q.rewardItem ? ` + ${q.rewardItem}` : ''}!`
      };
    }

    return {
      completed: false,
      message: `Quest Updated: "${q.title}" - ${q.stepDescriptions[q.currentStep]}`
    };
  }
}
