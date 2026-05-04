import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ["", Validators.required],
      username: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    });
  }

  onSubmit(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.registrationForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.authService.createUser(this.registrationForm.value).subscribe({
      next: () => {
        this.successMessage = "Registration successful!";
        this.resetForm();
        this.successMessage = "Registration successful!";
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || "Please fill out all required fields correctly.";
      }
    });
  }

  resetForm(): void {
    this.registrationForm.reset({
      fullName: "",
      username: "",
      email: "",
      password: ""
    });

    this.errorMessage = "";
  }
}