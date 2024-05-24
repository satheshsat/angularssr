import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://expressjs-murex.vercel.app/api/auth/';
  url2 = 'https://expressjs-murex.vercel.app/api/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.url+'login', { email, password });
  }

  register(data: any) {
    return this.http.post(this.url+'register', data);
  }

  resetpass(email: string){
    return this.http.post(this.url+'resetpass', { email });
  }

  logout(){
    return this.http.post(this.url+'logout', {});
  }

  profile(){
    return this.http.get(this.url2+'profile', {});
  }
}
