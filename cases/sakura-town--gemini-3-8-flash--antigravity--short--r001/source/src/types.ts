// src/types.ts
// Core TypeScript interfaces and enumerations for Sakura Town.

export type WeatherType = 'sunny' | 'sakura_storm' | 'rain' | 'twilight' | 'night';

export interface NPCScheduleItem {
  startHour: number;
  endHour: number;
  activity: string;
  destination: { x: number; y: number; z: number };
  animation: 'idle' | 'walk' | 'sit' | 'work' | 'read' | 'pray';
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
  hairStyle: 'bob' | 'ponytail' | 'short' | 'spiky' | 'hat';
  friendship: number;
  defaultDialogue: string[];
  schedule: NPCScheduleItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  jpName: string;
  description: string;
  category: 'food' | 'drink' | 'quest' | 'tool' | 'charm';
  icon: string;
  count: number;
  isUsable: boolean;
}

export interface Quest {
  id: string;
  title: string;
  jpTitle: string;
  giver: string;
  description: string;
  rewardText: string;
  stage: number;
  maxStages: number;
  completed: boolean;
  active: boolean;
  requiredItem?: string;
  targetNPC?: string;
}

export interface PhotoRecord {
  id: string;
  timestamp: string;
  dataUrl: string;
  caption: string;
  locationName: string;
}

export interface InteractiveObject {
  id: string;
  prompt: string;
  distance: number;
  position: { x: number; y: number; z: number };
  onInteract: () => void;
}

export interface TimeState {
  hour: number;
  minute: number;
  day: number;
  isDaytime: boolean;
  isNight: boolean;
  formattedTime: string;
}
