import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AudioService } from '../services/audio.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvitationComponent {

  /* tiempo = {
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  };

  intervalo: any;
  fechaEvento = new Date('2026-10-24T20:00:00'); */
  mostrarOpciones = false;
  images = [
    'girl.jpeg',
    'girl1.jpeg',
    'girls2.jpeg',
    'girls3.jpeg'
  ];

  constructor(
    private audioService: AudioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
  }

  ngOnInit(): void {
    /*  this.actualizarContador(); */

    /*    if (isPlatformBrowser(this.platformId)) {
         this.intervalo = setInterval(() => {
           this.actualizarContador();
         }, 1000);
       } */
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const AOS = await import('aos');

      AOS.default.init({
        once: true,
        duration: 1400,
        offset: 100
      });

      setTimeout(() => {
        AOS.default.refreshHard();
      }, 2000);
    }
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden) {
      this.audioService.pause();
    }
  }

  @HostListener('window:pagehide')
  @HostListener('window:beforeunload')
  stopAudio(): void {
    this.audioService.stop();
  }

  ngOnDestroy(): void {
    /*  if (this.intervalo) {
       clearInterval(this.intervalo);
     } */

    this.audioService.stop();
  }

  openWhatsApp(phone: string, nombre: string): void {
    const message =
      `Hola, ${nombre}. Me gustaría confirmar mi asistencia a los XV años de Lu.
      Mi nombre es:`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  cerrarModal(): void {
    this.mostrarOpciones = false;
  }

  /*   actualizarContador(): void {
      const ahora = new Date().getTime();
      const diferencia = this.fechaEvento.getTime() - ahora;
  
      if (diferencia <= 0) {
        this.tiempo = {
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0
        };
  
        clearInterval(this.intervalo);
        return;
      }
  
      this.tiempo.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  
      this.tiempo.horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );
  
      this.tiempo.minutos = Math.floor(
        (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
      );
  
      this.tiempo.segundos = Math.floor(
        (diferencia % (1000 * 60)) /
        1000
      );
    } */
}