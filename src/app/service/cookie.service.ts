import { Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieService: SsrCookieService) { }

  set(key: string, value: string){
    return this.cookieService.set(key, value);
  }

  get(key: string){
    return this.cookieService.get(key);
  }

  remove(key: string){
    return this.cookieService.delete(key, '/');
  }
}
