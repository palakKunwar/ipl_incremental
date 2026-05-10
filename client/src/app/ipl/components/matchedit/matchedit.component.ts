import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
import { Match } from '../../types/Match';
import { Team } from '../../types/Team';
import { ActivatedRoute } from '@angular/router';

const ALPHA_PATTERN = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-matchedit',
  templateUrl: './matchedit.component.html',
  styleUrls: ['./matchedit.component.scss']
})
export class MatchEditComponent implements OnInit {
  matchForm!: FormGroup;
  match: Match | null = null;
  matchId!: number;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  teams: Team[] = [];
  statuses = ['Pending', 'Completed', 'Abandoned', 'No Result'];

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.matchForm = this.formBuilder.group({
      firstTeam: [null, Validators.required],
      secondTeam: [null, Validators.required],
      matchDate: [null, Validators.required],
      venue: ['', [Validators.required, Validators.pattern(ALPHA_PATTERN)]],
      result: [''],
      status: ['', Validators.required],
      winnerTeam: [null]
    });
    this.route.params.subscribe(params => {
      this.matchId = params['matchId'];
      this.loadTeamsAndMatchDetails(this.matchId);
    });
  }

  blockNumbers(event: KeyboardEvent): void {
    if (/[0-9]/.test(event.key)) event.preventDefault();
  }

  loadTeamsAndMatchDetails(matchId: number): void {
    this.iplService.getAllTeams().subscribe({
      next: (teams) => { this.teams = teams; this.loadMatchDetails(matchId); },
      error: (error) => console.error('Error loading teams:', error)
    });
  }

  loadMatchDetails(matchId: number): void {
    this.iplService.getMatchById(matchId).subscribe({
      next: (response) => {
        this.match = response;
        this.matchForm.patchValue({
          firstTeam: this.teams.find(t => t.teamId === response.firstTeam.teamId),
          secondTeam: this.teams.find(t => t.teamId === response.secondTeam.teamId),
          matchDate: response.matchDate,
          venue: response.venue,
          result: response.result,
          status: response.status,
          winnerTeam: response.winnerTeam !== null
            ? this.teams.find(t => t.teamId === response.winnerTeam.teamId)
            : null
        });
      },
      error: (error) => this.handleError(error)
    });
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      const updatedMatch: Match = {
        matchId: this.matchId,
        matchDate: this.matchForm.value.matchDate,
        firstTeam: this.matchForm.value.firstTeam,
        secondTeam: this.matchForm.value.secondTeam,
        venue: this.matchForm.value.venue,
        result: this.matchForm.value.result,
        status: this.matchForm.value.status,
        winnerTeam: this.matchForm.value.winnerTeam,
        displayInfo: function (): void {}
      };
      this.iplService.updateMatch(updatedMatch).subscribe({
        next: (response) => {
          this.match = response;
          this.errorMessage = null;
          this.successMessage = 'Match updated successfully!';
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