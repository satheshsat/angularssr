import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../service/storage.service';
import { jwtDecode } from "jwt-decode";
import { catchError, map, skip, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
const url = 'https://expressjs-murex.vercel.app/api/auth/';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const http = inject(HttpClient)
  const token = storageService.get('accessToken');
  if(req.url.indexOf('/auth') != -1){
    return next(req);
  }
  if(!token){
    router.navigateByUrl('/auth/login');
    return next(req);
  }
  if(!isTokenValid(token)){
    return http.post(url+'refresh', {refreshToken:storageService.get('refreshToken')}, {headers:{ skip: 'true'}}).pipe(switchMap((res: any) => {

      storageService.set('accessToken', res['accessToken']);
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+res['accessToken']
        } 
      });
      return next(req);
  }))
  }else{
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+token
      } 
    });
    return next(req);
  }
};

function isTokenValid(token: any): boolean {
  if (!token) {
      return false;
  }
  return (new Date().getTime() / 1000) < (jwtDecode(token)['exp'] as number);
}