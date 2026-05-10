import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IplService } from "../../services/ipl.service";
import { Match } from "../../types/Match";
import { Team } from "../../types/Team";

@Component({
  selector: "app-match-create",
  templateUrl: "./matchcreate.component.html",
  styleUrls: ["./matchcreate.component.scss"]
})
export class MatchCreateComponent implements OnInit {
  matchForm: FormGroup;
  match: Match | null = null;
  successMessage: string = "";
  errorMessage: string = "";
  teams: Team[] = [];

  constructor(private fb: FormBuilder, private iplService: IplService) {
    this.matchForm = this.fb.group({
      matchId: [null, Validators.required],
      firstTeamId: ["", Validators.required],
      secondTeamId: ["", Validators.required],
      matchDate: ["", Validators.required],
      venue: ["", Validators.required],
      result: ["", Validators.required],
      status: ["", Validators.required],
      winnerTeamId: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (data) => {
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

    if (this.matchForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.matchForm.markAllAsTouched();
      return;
    }

    this.addMatch();
  }

  addMatch(): void {
    const value = this.matchForm.value;

    const firstTeam = this.teams.find((team) => team.teamId === Number(value.firstTeamId));
    const secondTeam = this.teams.find((team) => team.teamId === Number(value.secondTeamId));
    const winnerTeam = this.teams.find((team) => team.teamId === Number(value.winnerTeamId));

    if (!firstTeam || !secondTeam || !winnerTeam) {
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    this.match = new Match(
      value.matchId,
      firstTeam,
      secondTeam,
      new Date(value.matchDate),
      value.venue,
      value.result,
      value.status,
      winnerTeam
    );

    this.iplService.addMatch(this.match).subscribe({
      next: () => {
        this.successMessage = "Match created successfully!";
        this.resetForm();
        this.successMessage = "Match created successfully!";
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  resetForm(): void {
    this.matchForm.reset({
      matchId: null,
      firstTeamId: "",
      secondTeamId: "",
      matchDate: "",
      venue: "",
      result: "",
      status: "",
      winnerTeamId: ""
    });

    this.errorMessage = "";
    this.match = null;
  }

  handleError(error: any): void {
    this.errorMessage =
      error?.error?.message || "Please fill out all required fields correctly.";
  }
}