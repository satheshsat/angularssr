import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../service/storage.service';
import { CookieService } from '../../service/cookie.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    form!: FormGroup;
    loading = false;
    submitted = false;

    message = null;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private storageService: StorageService,
        private cookieService: CookieService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$")]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.message = null;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f['email'].value, this.f['password'].value).subscribe((res: any)=>{
          console.log(res);
          this.storageService.set('userData', JSON.stringify(res.data))
          this.cookieService.set('accessToken', res.accessToken)
          this.cookieService.set('refreshToken', res.refreshToken)
          this.router.navigateByUrl('/account/profile');
        }, (err)=>{
          this.message = err.error?.message ? err.error?.message : 'Something went wrong please try again';
          this.loading = false;
          console.log(err);
        })
    }
}
