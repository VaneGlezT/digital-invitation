import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
import { AudioService } from '../services/audio.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  private sparkle?: HTMLAudioElement;


  constructor(
    private router: Router,
    private audioService: AudioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {


    if (isPlatformBrowser(this.platformId)) {

      this.sparkle = new Audio(
        'assets/sounds/sparkles.mp3'
      );

      this.sparkle.volume = 0.5;

    }

  }



  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      AOS.init({
        once: false
      });

    }

  }



  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {


      AOS.refresh();


      setTimeout(() => {

        AOS.refresh();

      }, 500);


    }

  }



  openInvitation(): void {


    if (this.sparkle) {

      this.sparkle.play()
        .catch(() => {
          console.log('El navegador bloqueó el sonido.');
        });

    }


    setTimeout(() => {

      this.audioService.play();

    }, 1000);



    this.router.navigate(['/invitation']);


  }


}