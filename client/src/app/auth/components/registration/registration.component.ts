import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],   // ✅ added
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator   // ✅ add validator
    });
  }



  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {

      const formData = { ...this.registrationForm.value };
      delete formData.confirmPassword; // ✅ remove before API

      this.authService.createUser(formData).subscribe(
        response => {
          this.successMessage = 'Registration successful! Redirecting to login...';
          this.errorMessage = null;
          this.registrationForm.reset();

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);
        },
       error => {

  this.errorMessage =
    error?.error?.message ||
    error?.message ||
    'Registration failed';

  this.successMessage = null;
}
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}