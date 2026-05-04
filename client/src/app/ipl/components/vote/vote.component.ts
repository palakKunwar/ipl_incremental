import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vote } from '../../types/Vote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  voteForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  vote: Vote | null = null;

  constructor(private fb: FormBuilder) {
    this.voteForm = this.fb.group({
      voteId: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      cricketerId: ['', Validators.required],
      teamId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.voteForm.valid) {
      const value = this.voteForm.value;

      this.vote = new Vote(
        value.voteId,
        value.email,
        value.category,
        value.cricketerId,
        value.teamId
      );

      console.log(this.vote);
      this.successMessage = 'Vote submitted successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
      this.voteForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.voteForm.reset({
      voteId: null,
      email: '',
      category: '',
      cricketerId: '',
      teamId: ''
    });

    this.successMessage = '';
    this.errorMessage = '';
    this.vote = null;
  }
}