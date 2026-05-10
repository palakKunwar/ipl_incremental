import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IplService } from "../../services/ipl.service";
import { Cricketer } from "../../types/Cricketer";
import { Team } from "../../types/Team";

@Component({
  selector: "app-cricketer-create",
  templateUrl: "./cricketercreate.component.html",
  styleUrls: ["./cricketercreate.component.scss"]
})
export class CricketerCreateComponent implements OnInit {
  cricketerForm: FormGroup;
  cricketer: Cricketer | null = null;
  successMessage: string = "";
  errorMessage: string = "";
  teams: Team[] = [];

  constructor(
    private fb: FormBuilder,
    private iplService: IplService
  ) {
    this.cricketerForm = this.fb.group({
      cricketerId: [null, Validators.required],
      teamId: ["", Validators.required],
      cricketerName: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      age: ["", Validators.required],
      nationality: ["", Validators.required],
      experience: ["", [Validators.required, Validators.min(0)]],
      role: ["", Validators.required],
      totalRuns: ["", Validators.required],
      totalWickets: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
      },
      error: () => {
        this.teams = [];
      }
    });
  }

  onSubmit(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.cricketerForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.cricketerForm.markAllAsTouched();
      return;
    }

    const value = this.cricketerForm.value;

    const selectedTeam = this.teams.find(
      (team) => team.teamId === Number(value.teamId)
    );

    if (!selectedTeam) {
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    this.cricketer = new Cricketer(
      value.cricketerId,
      value.cricketerName,
      value.age,
      value.nationality,
      value.experience,
      value.role,
      value.totalRuns,
      value.totalWickets,
      selectedTeam
    );

    this.iplService.addCricketer(this.cricketer).subscribe({
      next: () => {
        this.successMessage = "Cricketer created successfully!";
        this.errorMessage = "";
        this.resetForm();
        this.successMessage = "Cricketer created successfully!";
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  resetForm(): void {
    this.cricketerForm.reset({
      cricketerId: null,
      teamId: "",
      cricketerName: "",
      age: "",
      nationality: "",
      experience: "",
      role: "",
      totalRuns: "",
      totalWickets: ""
    });

    this.errorMessage = "";
    this.cricketer = null;
  }

  handleError(error: any): void {
    this.errorMessage =
      error?.error?.message || "Please fill out all required fields correctly.";
  }
}