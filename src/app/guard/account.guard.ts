import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

export const accountGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  if(storageService.get('accessToken')){
    return true;  
  }
  router.navigateByUrl('/auth/login');
  return false;
};
