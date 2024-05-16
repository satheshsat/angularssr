import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { Router } from 'express';
import { StorageService } from '../service/storage.service';

export const accountGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  if(storageService.get('accessToken')){
    return true;  
  }
  return false;
};
