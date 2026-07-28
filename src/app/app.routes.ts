import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvitationComponent } from './invitation/invitation.component';
import { invitationGuard } from './guards/invitation.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'invitation',
    component: InvitationComponent,
    canActivate: [invitationGuard]
  }
];