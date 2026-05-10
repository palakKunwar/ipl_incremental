import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
import { Team } from '../../types/Team';
import { ActivatedRoute } from '@angular/router';

const ALPHA_PATTERN = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-teamedit',
  templateUrl: './teamedit.component.html',
  styleUrls: ['./teamedit.component.scss']
})
export class TeamEditComponent implements OnInit {
  teamForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentYear: number = new Date().getFullYear();
  team: Team | null = null;
  teamId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      location: ['', [Validators.required, Validators.pattern(ALPHA_PATTERN)]],
      ownerName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(ALPHA_PATTERN)]],
      establishmentYear: [null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]]
    });
    this.route.params.subscribe(params => {
      this.teamId = params['teamId'];
      this.loadTeamDetails(this.teamId);
    });
  }

  blockNumbers(event: KeyboardEvent): void {
    if (/[0-9]/.test(event.key)) event.preventDefault();
  }

  loadTeamDetails(teamId: number): void {
    this.iplService.getTeamById(teamId).subscribe({
      next: (response) => {
        this.team = response;
        this.teamForm.patchValue({
          teamName: response.teamName,
          location: response.location,
          ownerName: response.ownerName,
          establishmentYear: response.establishmentYear
        });
      },
      error: (error) => { this.handleError(error); }
    });
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      const updatedTeam: Team = {
        teamId: this.teamId,
        teamName: this.teamForm.value.teamName,
        location: this.teamForm.value.location,
        ownerName: this.teamForm.value.ownerName,
        establishmentYear: this.teamForm.value.establishmentYear,
        displayInfo: function (): void {}
      };
      this.iplService.updateTeam(updatedTeam).subscribe({
        next: (response) => {
          this.team = response;
          this.errorMessage = null;
          this.successMessage = 'Team updated successfully!';
        },
        error: (error) => { this.handleError(error); }
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