import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  selectedRole: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  selectRole(role: string): void {
    this.selectedRole = role;
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (!this.selectedRole) {
      this.errorMessage = 'Please select a login type (User or Admin).';
      return;
    }
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(
        tap((response) => {
          localStorage.setItem("token", response['token']);
          localStorage.setItem("role", response['roles']);
          localStorage.setItem("user_id", response['userId']);
          localStorage.setItem("email",this.loginForm.value.username);
          this.router.navigate(["ipl"]);
        }),
        catchError((error: string) => {
          this.errorMessage = 'Invalid username or password';
          console.error("Login error:", error);
          return of(null);
        })
      ).subscribe();
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}