import { Component } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.audioService.stop();
  }

}
