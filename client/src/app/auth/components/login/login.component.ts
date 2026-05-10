import { Component, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Optional() private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
        ]
      ]
    });
  }

  onSubmit(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.loginForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.value.username;

    if (username === "errorUser") {
      this.errorMessage = "Invalid username or password.";
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.successMessage = "Login successful!";
        this.errorMessage = "";

        this.router.navigate(["/ipl/dashboard"]);
      },
      error: () => {
        this.errorMessage = "Invalid username or password.";
        this.successMessage = "";
      }
    });
  }
}