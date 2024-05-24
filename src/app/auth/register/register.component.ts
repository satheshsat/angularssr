import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  message = null;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$")]],
          password: ['', [Validators.required, Validators.minLength(6)]]
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
    this.authService.register(this.form.value).subscribe((res)=>{
      this.router.navigateByUrl('/auth/login');
    },err => {
      this.message = err.error?.message ? err.error?.message : 'Something went wrong please try again';
      this.loading = false;
    })
  }
}
