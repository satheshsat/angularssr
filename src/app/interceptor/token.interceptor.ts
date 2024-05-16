import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../service/storage.service';
import { jwtDecode } from "jwt-decode";
import { catchError, map, skip, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
const url = 'https://expressjs-murex.vercel.app/api/auth/';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const http = inject(HttpClient)
  const token = storageService.get('accessToken');
  if(!token){
    router.navigateByUrl('/auth/login');
    return next(req);
  }
  if(!isTokenValid(token)){
    http.post(url+'refresh', {}, {headers:{ skip: 'true'}}).subscribe((res: any)=>{
      storageService.set('accessToken', res['accessToken']);
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+res['accessToken']
        } 
      });
    })
  }else{
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+token
      } 
    });
  }
  if (req.headers.get("skip")) {
    return next(req).pipe(
      map((event: any) => {
          return event;
      }),
      catchError((error: any) => {

          if (error.status === 401) {
              localStorage.clear();
              router.navigateByUrl('/auth/login');
          }
          return throwError(error);
      })
    );
  }
  return next(req);
};

function isTokenValid(token: any): boolean {
  if (!token) {
      return false;
  }
  return (new Date().getTime() / 1000) < (jwtDecode(token)['exp'] as number);
}