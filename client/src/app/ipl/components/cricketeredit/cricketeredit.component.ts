import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cricketer } from "../../types/Cricketer";
import { Team } from "../../types/Team";

@Component({
  selector: "app-cricketer-edit",
  templateUrl: "./cricketeredit.component.html",
  styleUrls: ["./cricketeredit.component.scss"]
})
export class CricketerEditComponent implements OnInit {
  cricketerForm: FormGroup;
  cricketer: Cricketer | null = null;
  teams: Team[] = [];

  cricketerId: number = 0;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService,
    private route: ActivatedRoute
  ) {
    this.cricketerForm = this.formBuilder.group({
      teamId: ["", Validators.required],
      cricketerName: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      age: ["", [Validators.required, Validators.min(18)]],
      nationality: ["", Validators.required],
      experience: ["", [Validators.required, Validators.min(0)]],
      role: ["", Validators.required],
      totalRuns: ["", [Validators.required, Validators.min(0)]],
      totalWickets: ["", [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const routeId =
      this.route.snapshot.paramMap.get("cricketerId") ||
      this.route.snapshot.paramMap.get("id");

    this.cricketerId = Number(routeId);

    this.loadTeams();

    if (this.cricketerId) {
      this.loadCricketerDetails(this.cricketerId);
    }
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (teams: Team[]) => {
        this.teams = teams;
      },
      error: () => {
        this.teams = [];
      }
    });
  }

  loadCricketerDetails(cricketerId: number): void {
    this.iplService.getCricketerById(cricketerId).subscribe({
      next: (cricketer: Cricketer) => {
        this.cricketer = cricketer;

        const teamId =
          cricketer.team?.teamId ||
          cricketer.teamId ||
          "";

        this.cricketerForm.patchValue({
          teamId: teamId,
          cricketerName: cricketer.cricketerName,
          age: cricketer.age,
          nationality: cricketer.nationality,
          experience: cricketer.experience,
          role: cricketer.role,
          totalRuns: cricketer.totalRuns,
          totalWickets: cricketer.totalWickets
        });
      },
      error: () => {
        this.errorMessage = "Unable to load cricketer details.";
        this.successMessage = null;
      }
    });
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.cricketerForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.cricketerForm.markAllAsTouched();
      return;
    }

    const value = this.cricketerForm.value;

    const selectedTeam = this.teams.find(
      (team: Team) => team.teamId === Number(value.teamId)
    );

    if (!selectedTeam) {
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    const updatedCricketer = new Cricketer(
      this.cricketerId,
      value.cricketerName,
      value.age,
      value.nationality,
      value.experience,
      value.role,
      value.totalRuns,
      value.totalWickets,
      selectedTeam
    );

    this.iplService.updateCricketer(updatedCricketer).subscribe({
      next: (response: Cricketer) => {
        this.cricketer = response;
        this.successMessage = "Cricketer updated successfully!";
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = "Unable to update cricketer.";
        this.successMessage = null;
      }
    });
  }

  resetForm(): void {
    this.cricketerForm.reset({
      teamId: "",
      cricketerName: "",
      age: "",
      nationality: "",
      experience: "",
      role: "",
      totalRuns: "",
      totalWickets: ""
    });

    this.successMessage = null;
    this.errorMessage = null;
    this.cricketer = null;
  }
}
import { ActivatedRoute } from "@angular/router";
import { IplService } from "../../services/ipl.service";
