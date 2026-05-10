import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
import { Team } from '../../types/Team';

const ALPHA_PATTERN = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-teamcreate',
  templateUrl: './teamcreate.component.html',
  styleUrls: ['./teamcreate.component.scss']
})
export class TeamCreateComponent implements OnInit {
  teamForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentYear: number = new Date().getFullYear();
  team: Team | null = null;

  constructor(private formBuilder: FormBuilder, private iplService: IplService) {}

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      location: ['', [Validators.required, Validators.pattern(ALPHA_PATTERN)]],
      ownerName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(ALPHA_PATTERN)]],
      establishmentYear: [null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]]
    });
  }

  blockNumbers(event: KeyboardEvent): void {
    if (/[0-9]/.test(event.key)) event.preventDefault();
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      this.iplService.addTeam(this.teamForm.value).subscribe(
        (response: Team) => {
          this.team = response;
          this.successMessage = 'Team created successfully!';
          this.errorMessage = null;
          this.teamForm.reset();
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