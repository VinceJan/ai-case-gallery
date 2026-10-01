// src/gameplay/PhotographySystem.ts
// In-game anime camera viewfinder, snapshot capture, filters, and photo album gallery.
import * as THREE from 'three';
import { PhotoRecord } from '../types';
import { audio } from '../engine/AudioSynthesizer';

export class PhotographySystem {
  public isCameraModeActive: boolean = false;
  public photos: PhotoRecord[] = [];
  public currentFilter: 'normal' | 'warm' | 'vintage' | 'bloom' = 'normal';
  public zoomLevel: number = 1.0;

  constructor() {
    this.loadSavedPhotos();
  }

  private loadSavedPhotos(): void {
    try {
      const data = localStorage.getItem('sakura_photos');
      if (data) {
        this.photos = JSON.parse(data);
      }
    } catch {
      this.photos = [];
    }
  }

  public savePhotos(): void {
    try {
      localStorage.setItem('sakura_photos', JSON.stringify(this.photos));
    } catch (e) {
      console.warn('Failed to save photos to storage:', e);
    }
  }

  public toggleCameraMode(): boolean {
    this.isCameraModeActive = !this.isCameraModeActive;
    audio.playUIConfirm();
    return this.isCameraModeActive;
  }

  public takePhoto(
    renderer: THREE.WebGLRenderer,
    timeString: string,
    playerPos: THREE.Vector3,
    trainPos: THREE.Vector3,
    catPos: THREE.Vector3
  ): PhotoRecord {
    audio.playCameraShutter();

    // Capture WebGL canvas as data URL
    const canvas = renderer.domElement;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    // Subject recognition
    const distToTrain = playerPos.distanceTo(trainPos);
    const distToCat = playerPos.distanceTo(catPos);
    const distToShrine = playerPos.distanceTo(new THREE.Vector3(-38, 5, -68));

    const photo: PhotoRecord = {
      id: `photo_${Date.now()}`,
      timestamp: new Date().toLocaleDateString(),
      timeString,
      dataUrl,
      locationName: this.getLocationName(playerPos),
      filterName: this.currentFilter,
      hasTrain: distToTrain < 40.0,
      hasCat: distToCat < 15.0,
      hasShrine: distToShrine < 35.0
    };

    this.photos.unshift(photo);
    if (this.photos.length > 20) {
      this.photos.pop(); // Keep last 20 photos
    }
    this.savePhotos();

    return photo;
  }

  private getLocationName(pos: THREE.Vector3): string {
    if (pos.z > 40) return 'Town School (町立学校)';
    if (pos.z < -45 && pos.x < -15) return 'Sakura Shrine Hill (さくら神社)';
    if (pos.z < -30 && pos.z > -45) return 'Sakura River Canal (さくら川)';
    if (pos.x > 30 && pos.z > -10 && pos.z < 20) return 'Sakura Mart (さくらマート)';
    if (pos.x > 10 && pos.z < -10) return 'Cafe Komorebi (珈琲 木漏れ日)';
    if (pos.x < -30 && pos.z > -15 && pos.z < 15) return 'Residential Quarter (さくら住宅街)';
    if (pos.z > 15 && pos.z < 35 && pos.x > 15) return 'Railway Crossing (踏切)';
    return 'Sakura Station Plaza (さくら町駅前)';
  }
}
