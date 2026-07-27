import { Component } from '@angular/core';
import { AudioService } from '../services/audio.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {

  tiempo = {
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  };

  intervalo: any;

  // Fecha del evento
  fechaEvento = new Date('2026-10-24T20:00:00');

  constructor(private audioService: AudioService) { }


  ngOnInit(): void {
    this.actualizarContador();

    this.intervalo = setInterval(() => {
      this.actualizarContador();
    }, 1000);
  }


  ngAfterViewInit(): void {
    AOS.init({
      once: false
    });

    setTimeout(() => {
      AOS.refresh();
    });
  }

  ngOnDestroy(): void {
    this.audioService.stop();
    clearInterval(this.intervalo);
  }

  actualizarContador() {

    const ahora = new Date().getTime();
    const diferencia = this.fechaEvento.getTime() - ahora;

    if (diferencia <= 0) {
      clearInterval(this.intervalo);

      this.tiempo = {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0
      };

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
  }

}
