import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio?: HTMLAudioElement;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio('sounds/tangled.mp3');
      this.audio.loop = true;
    }

  }

  play(): void {
    this.audio?.play()
      .catch(() => {
        console.log('Audio bloqueado por el navegador');
      });
  }

  pause(): void {
    this.audio?.pause();
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

}