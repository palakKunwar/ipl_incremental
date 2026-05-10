import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IplService } from "../../services/ipl.service";
import { Cricketer } from "../../types/Cricketer";
import { Team } from "../../types/Team";
import { ActivatedRoute, Router } from "@angular/router";

const ALPHA_PATTERN = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-cricketeredit',
  templateUrl: './cricketeredit.component.html',
  styleUrls: ['./cricketeredit.component.scss'],
})
export class CricketerEditComponent implements OnInit {
  cricketerForm!: FormGroup;
  cricketer: Cricketer | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  teams: Team[] = [];
  cricketerId!: number;
  roles = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cricketerForm = this.formBuilder.group({
      team: [null, Validators.required],
      cricketerName: ['', [Validators.required, Validators.pattern(ALPHA_PATTERN)]],
      age: [null, [Validators.required, Validators.min(18)]],
      nationality: ['', [Validators.required, Validators.pattern(ALPHA_PATTERN)]],
      experience: [null, [Validators.required, Validators.min(0)]],
      role: ['', Validators.required],
      totalRuns: [null, [Validators.min(0)]],
      totalWickets: [null, [Validators.min(0)]],
    });
    this.route.paramMap.subscribe(paramMap => {
      const id = Number(paramMap.get('cricketerId'));
      this.cricketerId = id;
      if (!Number.isFinite(id)) {
        this.errorMessage = 'Invalid cricketer id in route';
        return;
      }
      this.loadTeamsAndCricketerDetails(id);
    });
  }

  blockNumbers(event: KeyboardEvent): void {
    if (/[0-9]/.test(event.key)) event.preventDefault();
  }

  loadTeamsAndCricketerDetails(cricketerId: number): void {
    this.iplService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams;
        this.loadCricketerDetails(cricketerId);
      },
      error: (error) => console.error('Error loading teams:', error)
    });
  }

  loadCricketerDetails(cricketerId: number): void {
    this.iplService.getCricketerById(cricketerId).subscribe({
      next: (response) => {
        const selectedTeam = this.teams.find(team => team.teamId === response.team.teamId);
        this.cricketer = response;
        this.cricketerForm.patchValue({
          team: selectedTeam,
          cricketerName: response.cricketerName,
          age: response.age,
          nationality: response.nationality,
          experience: response.experience,
          role: response.role,
          totalRuns: response.totalRuns,
          totalWickets: response.totalWickets
        });
      },
      error: (error) => this.handleError(error)
    });
  }

  onSubmit(): void {
    if (this.cricketerForm.valid) {
      const updatedCricketer: Cricketer = {
        cricketerId: this.cricketerId,
        team: this.cricketerForm.value.team,
        cricketerName: this.cricketerForm.value.cricketerName,
        age: this.cricketerForm.value.age,
        nationality: this.cricketerForm.value.nationality,
        experience: this.cricketerForm.value.experience,
        role: this.cricketerForm.value.role,
        totalRuns: this.cricketerForm.value.totalRuns,
        totalWickets: this.cricketerForm.value.totalWickets,
        displayInfo: function (): void {}
      };
      this.iplService.updateCricketer(updatedCricketer).subscribe({
        next: (response) => {
          this.cricketer = response;
          this.errorMessage = null;
          this.successMessage = 'Cricketer updated successfully!';
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorMessage = error.status === 400
      ? 'Bad request. Please check your input.'
      : `Error: ${error.status} ${error.message}`;
    this.successMessage = null;
  }
}