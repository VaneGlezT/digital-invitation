import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  private sparkle = new Audio('sounds/sparkles.mp3');

  constructor(
    private router: Router,
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
    AOS.init();
  }


  ngAfterViewInit(): void {
    AOS.init({
      once: false
    });

    setTimeout(() => {
      AOS.refresh();
    });
  }

  openInvitation() {
    this.sparkle.volume = 0.5;

    this.sparkle.play().catch(() => {
      console.log('El navegador bloqueó el sonido.');
    });
    setTimeout(() => {
      this.audioService.play();
    },1000);
    
    this.router.navigate(['/invitation']);
  }

}
