// src/gameplay/InteractionManager.ts
// Handles proximity detection and contextual triggers for all interactive elements in the town.
import * as THREE from 'three';
import { InteractiveObject } from '../types';

export class InteractionManager {
  private interactables: InteractiveObject[] = [];
  public currentActive: InteractiveObject | null = null;

  constructor() {
    this.setupKeyboard();
  }

  private setupKeyboard(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyE' && this.currentActive) {
        this.currentActive.onInteract();
      }
    });
  }

  public register(item: InteractiveObject): void {
    this.interactables.push(item);
  }

  public clear(): void {
    this.interactables = [];
  }

  public update(playerPos: THREE.Vector3): void {
    let closestItem: InteractiveObject | null = null;
    let closestDist = Infinity;

    for (const item of this.interactables) {
      const dx = playerPos.x - item.position.x;
      const dy = playerPos.y - item.position.y;
      const dz = playerPos.z - item.position.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist <= item.distance && dist < closestDist) {
        closestDist = dist;
        closestItem = item;
      }
    }

    if (this.currentActive !== closestItem) {
      this.currentActive = closestItem;
      window.dispatchEvent(
        new CustomEvent('interaction_changed', {
          detail: closestItem ? { prompt: closestItem.prompt, id: closestItem.id } : null
        })
      );
    }
  }
}
