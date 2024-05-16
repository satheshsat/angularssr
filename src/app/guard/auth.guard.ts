import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  if(storageService.get('accessToken')){
    router.navigateByUrl('/account/profile');
    return false;  
  }
  return true;
};
