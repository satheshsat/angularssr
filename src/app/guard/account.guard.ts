import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CookieService } from '../service/cookie.service';

export const accountGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  if(cookieService.get('accessToken')){
    return true;  
  }
  router.navigateByUrl('/auth/login');
  return false;
};
