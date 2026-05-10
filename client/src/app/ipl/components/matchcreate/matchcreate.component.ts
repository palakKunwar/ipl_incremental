import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
import { Match } from '../../types/Match';
import { Team } from '../../types/Team';

const ALPHA_PATTERN = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-matchcreate',
  templateUrl: './matchcreate.component.html',
  styleUrls: ['./matchcreate.component.scss']
})
export class MatchCreateComponent implements OnInit {
  matchForm!: FormGroup;
  match: Match | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  teams: Team[] = [];

  statuses = ['Pending', 'Completed', 'Abandoned', 'No Result'];

  constructor(private formBuilder: FormBuilder, private iplService: IplService) {}

  ngOnInit(): void {
    this.loadTeams();
    this.matchForm = this.formBuilder.group({
      firstTeam: [null, Validators.required],
      secondTeam: [null, Validators.required],
      matchDate: [null, Validators.required],
      venue: ['', [Validators.required, Validators.pattern(ALPHA_PATTERN)]],
      result: [''],
      status: ['', Validators.required]
    });
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe((teams) => { this.teams = teams; });
  }

  blockNumbers(event: KeyboardEvent): void {
    if (/[0-9]/.test(event.key)) event.preventDefault();
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      this.iplService.addMatch(this.matchForm.value).subscribe(
        (response: Match) => {
          this.match = response;
          this.successMessage = 'Match created successfully!';
          this.errorMessage = null;
          this.matchForm.reset();
        },
        (error: HttpErrorResponse) => { this.handleError(error); }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorMessage = error.status === 400
      ? 'Bad request. Please check your input.'
      : `Error: ${error.status} ${error.message}`;
    this.successMessage = null;
  }
}