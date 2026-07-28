import { CanActivateFn, Router } from '@angular/router';

export const invitationGuard: CanActivateFn = () => {

  const entered = sessionStorage.getItem('invitationEntered');

  if (entered) {
    sessionStorage.removeItem('invitationEntered');
    return true;
  }

  const router = new Router();

  return router.createUrlTree(['/']);

};