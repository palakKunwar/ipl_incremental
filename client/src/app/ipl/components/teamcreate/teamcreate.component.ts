import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IplService } from "../../services/ipl.service";
import { Team } from "../../types/Team";

@Component({
  selector: "app-team-create",
  templateUrl: "./teamcreate.component.html",
  styleUrls: ["./teamcreate.component.scss"]
})
export class TeamCreateComponent {
  teamForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentYear: number = new Date().getFullYear();
  team: Team | null = null;

  constructor(private fb: FormBuilder, private iplService: IplService) {
    this.teamForm = this.fb.group({
      teamName: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      location: ["", Validators.required],
      ownerName: ["", [Validators.required, Validators.minLength(2)]],
      establishmentYear: [
        "",
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currentYear)
        ]
      ]
    });
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.teamForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.successMessage = null;
      this.teamForm.markAllAsTouched();
      return;
    }

    const value = this.teamForm.value;

    this.team = new Team(
      0,
      value.teamName,
      value.location,
      value.ownerName,
      value.establishmentYear
    );

    this.iplService.addTeam(this.team).subscribe({
      next: () => {
        this.successMessage = "Team created successfully!";
        this.errorMessage = null;
        this.resetForm();
        this.successMessage = "Team created successfully!";
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || "Please fill out all required fields correctly.";
        this.successMessage = null;
      }
    });
  }

  resetForm(): void {
    this.teamForm.reset({
      teamName: "",
      location: "",
      ownerName: "",
      establishmentYear: ""
    });

    this.team = null;
  }
}