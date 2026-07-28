import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const invitationGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const entered = sessionStorage.getItem('invitationEntered');

  if (entered) {
    sessionStorage.removeItem('invitationEntered');
    return true;
  }

  return router.createUrlTree(['/']);

};