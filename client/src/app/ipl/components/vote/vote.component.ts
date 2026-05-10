import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IplService } from '../../services/ipl.service';
import { Cricketer } from '../../types/Cricketer';
import { Team } from '../../types/Team';
import { Vote } from '../../types/Vote';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  voteForm!: FormGroup;
  vote: Vote | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  teams: Team[] = [];
  cricketers: Cricketer[] = [];
  userEmail: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email') || '';
    this.loadTeams();
    this.loadCricketers();
    this.voteForm = this.formBuilder.group({
      email: [this.userEmail],
      category: ['', Validators.required],
      cricketer: [null],
      team: [null]
    });
    this.voteForm.get('category')?.valueChanges.subscribe((category) => {
      this.updateValidators(category);
    });
  }

  updateValidators(category: string): void {
    const cricketerControl = this.voteForm.get('cricketer');
    const teamControl = this.voteForm.get('team');
    cricketerControl?.clearValidators();
    teamControl?.clearValidators();
    if (category === 'Cricketer') {
      cricketerControl?.setValidators([Validators.required]);
    } else if (category === 'Team') {
      teamControl?.setValidators([Validators.required]);
    }
    cricketerControl?.updateValueAndValidity();
    teamControl?.updateValueAndValidity();
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  loadCricketers(): void {
    this.iplService.getAllCricketers().subscribe((cricketers) => {
      this.cricketers = cricketers;
    });
  }

  onSubmit(): void {
    if (this.voteForm.valid) {
      this.castVote();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = null;
    }
  }

  private castVote(): void {
    this.iplService.createVote(this.voteForm.value).subscribe(
      (response: Vote) => {
        this.successMessage = 'Vote cast successfully!';
        this.errorMessage = null;
        this.voteForm.patchValue({ category: '', cricketer: null, team: null });
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        this.errorMessage = 'You have already voted in this category. Each user can only vote once per cricketer/team.';
      } else {
        this.errorMessage = `Error: ${error.status} ${error.message}`;
      }
    }
    this.successMessage = null;
  }
}