// src/types.ts - Core types for Sakura Town

export enum WeatherType {
  SUNNY = 'SUNNY',
  SAKURA_SHOWER = 'SAKURA_SHOWER',
  SUNSET = 'SUNSET',
  RAINY = 'RAINY',
  NIGHT_STARRY = 'NIGHT_STARRY'
}

export enum TimeOfDay {
  DAWN = 'DAWN',       // 05:00 - 07:00
  MORNING = 'MORNING', // 07:00 - 11:30
  NOON = 'NOON',       // 11:30 - 13:30
  AFTERNOON = 'AFTERNOON', // 13:30 - 17:00
  EVENING = 'EVENING', // 17:00 - 19:30
  NIGHT = 'NIGHT',     // 19:30 - 24:00
  MIDNIGHT = 'MIDNIGHT' // 00:00 - 05:00
}

export interface Item {
  id: string;
  name: string;
  jpName: string;
  description: string;
  price: number;
  icon: string;
  category: 'drink' | 'food' | 'tool' | 'charm' | 'quest';
  staminaRestore?: number;
  isConsumable?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  jpTitle: string;
  description: string;
  giver: string;
  rewardMoney: number;
  rewardItem?: string;
  isCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  stepDescriptions: string[];
}

export interface NPCScheduleItem {
  startHour: number; // 0 to 24 (float)
  endHour: number;
  activity: string;
  destination: { x: number; y: number; z: number };
  animation: 'idle' | 'walk' | 'sit' | 'read' | 'work' | 'pray';
  areaName: string;
}

export interface NPCPersonality {
  id: string;
  name: string;
  jpName: string;
  role: string;
  jpRole: string;
  description: string;
  avatarColor: string;
  outfitColor: string;
  hairColor: string;
  hairStyle: 'short' | 'ponytail' | 'bob' | 'spiky' | 'hat';
  friendship: number; // 0 - 100
  defaultDialogue: string[];
  schedule: NPCScheduleItem[];
}

export interface PhotoRecord {
  id: string;
  timestamp: string;
  timeString: string;
  dataUrl: string;
  locationName: string;
  filterName: string;
  hasTrain: boolean;
  hasCat: boolean;
  hasShrine: boolean;
}

export interface GameSettings {
  curvedWorld: boolean;
  bgmVolume: number;
  sfxVolume: number;
  timeSpeed: number; // 1 = 1 real sec is 1 game minute
  shadows: boolean;
}

export interface SaveData {
  version: number;
  playerPos: { x: number; y: number; z: number };
  playerYaw: number;
  playerMoney: number;
  inventory: { itemId: string; count: number }[];
  completedQuests: string[];
  activeQuests: { id: string; step: number }[];
  friendships: Record<string, number>;
  gameTimeMinutes: number;
  weather: WeatherType;
  unlockedPhotos: PhotoRecord[];
  isRidingBicycle: boolean;
}
