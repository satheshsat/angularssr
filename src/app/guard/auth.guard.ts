import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CookieService } from '../service/cookie.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  if(cookieService.get('accessToken')){
    router.navigateByUrl('/account/profile');
    return false;  
  }
  return true;
};
