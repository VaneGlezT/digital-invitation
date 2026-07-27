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

  play() {
    if (this.audio) {
      this.audio.play().catch(error => {
        console.log('Audio bloqueado:', error);
      });
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}