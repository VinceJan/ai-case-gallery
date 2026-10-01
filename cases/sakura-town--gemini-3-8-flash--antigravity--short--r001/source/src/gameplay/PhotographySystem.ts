// src/gameplay/PhotographySystem.ts
// In-game 35mm photography system with viewfinder, shutter sound, and photo album.
import { PhotoRecord } from '../types';
import { audio } from '../engine/AudioSynthesizer';

export class PhotographySystem {
  public photos: PhotoRecord[] = [];
  public isPhotoModeActive: boolean = false;

  public togglePhotoMode(): boolean {
    this.isPhotoModeActive = !this.isPhotoModeActive;
    window.dispatchEvent(
      new CustomEvent('photo_mode_changed', {
        detail: { active: this.isPhotoModeActive }
      })
    );
    return this.isPhotoModeActive;
  }

  public takePhoto(dataUrl: string, locationName: string): PhotoRecord {
    audio.playCameraShutter();

    const photo: PhotoRecord = {
      id: 'photo_' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      dataUrl,
      caption: `Memories of ${locationName}`,
      locationName
    };

    this.photos.unshift(photo);

    window.dispatchEvent(
      new CustomEvent('photo_taken', {
        detail: photo
      })
    );

    return photo;
  }
}
