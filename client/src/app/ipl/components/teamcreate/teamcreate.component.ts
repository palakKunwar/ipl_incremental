import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-create',
  templateUrl: './teamcreate.component.html',
  styleUrls: ['./teamcreate.component.scss']
})
export class TeamCreateComponent {
  teamForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      teamId: [null, Validators.required],
      teamName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$')   // no special characters
      ]],
      location: ['', Validators.required],
      ownerName: ['', Validators.required],
      establishmentYear: [
        new Date().getFullYear(),
        [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]
      ]
    });
  }

  onSubmit(): void {
    if (this.teamForm.valid) {

      if (this.simulateBackendError()) {
        this.errorMessage = 'Backend validation failed.';
        this.successMessage = '';
        return;
      }

      console.log(this.teamForm.value);
      this.successMessage = 'Team created successfully';
      this.errorMessage = '';
      this.resetForm();

    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
      this.teamForm.markAllAsTouched();
    }
  }

  simulateBackendError(): boolean {
    return this.teamForm.value.teamName === 'InvalidTeam';
  }

  resetForm(): void {
    this.teamForm.reset({
      teamId: null,
      teamName: '',
      location: '',
      ownerName: '',
      establishmentYear: new Date().getFullYear()
    });
  }
}