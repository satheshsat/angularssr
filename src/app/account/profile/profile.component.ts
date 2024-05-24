import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService = inject(AuthService);
  router = inject(Router);
  storageService = inject(StorageService);
  ngOnInit() {
    this.profile();
  }

  profile(){
    this.authService.profile().subscribe((res)=>{
      console.log(res);
    })
  }

  logout(){
    this.authService.logout().subscribe((res)=>{
      console.log(res);
      this.storageService.clear();
      this.router.navigateByUrl('/auth/login')
    })
  }
}
