import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
import { Cricketer } from '../../types/Cricketer';
import { Team } from '../../types/Team';

const ALPHA_PATTERN = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-cricketercreate',
  templateUrl: './cricketercreate.component.html',
  styleUrls: ['./cricketercreate.component.scss']
})
export class CricketerCreateComponent implements OnInit {
  cricketerForm!: FormGroup;
  cricketer: Cricketer | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  teams: Team[] = [];

  roles = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];

  constructor(private formBuilder: FormBuilder, private iplService: IplService) {}

  ngOnInit(): void {
    this.loadTeams();
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
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe((teams) => { this.teams = teams; });
  }

  // Block number key input on alpha-only fields
  blockNumbers(event: KeyboardEvent): void {
    if (/[0-9]/.test(event.key)) event.preventDefault();
  }

  onSubmit(): void {

  if (this.cricketerForm.valid) {

    const formValue = this.cricketerForm.value;

    const payload: any = {

      cricketerName: formValue.cricketerName,
      age: formValue.age,
      nationality: formValue.nationality,
      experience: formValue.experience,
      role: formValue.role,
      totalRuns: formValue.totalRuns,
      totalWickets: formValue.totalWickets,

      team: {
        teamId: formValue.team.teamId
      }

    };

    this.iplService.addCricketer(payload).subscribe({

      next: (response) => {

        this.cricketer = response;

        this.errorMessage = null;

        this.successMessage = 'Cricketer created successfully!';

        this.cricketerForm.reset();
      },

      error: (error) => {

        this.handleError(error);

      }

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