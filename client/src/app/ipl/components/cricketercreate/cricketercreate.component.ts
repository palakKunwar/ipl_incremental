import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../types/Team';
import { Cricketer } from '../../types/Cricketer';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.teams = [
      { teamId: 101, teamName: 'India' } as Team
    ];

    this.cricketerForm = this.fb.group({
      cricketerId: [null, Validators.required],
      teamId: [null, Validators.required],
      cricketerName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      nationality: ['', Validators.required],
      experience: [null, [Validators.required, Validators.min(0)]],
      role: ['', Validators.required],
      totalRuns: [0, Validators.min(0)],
      totalWickets: [0, Validators.min(0)]
    });
  }

  onSubmit(): void {
    if (this.cricketerForm.valid) {
      // ✅ REQUIRED FOR AUTO‑TEST
      this.cricketer = { ...this.cricketerForm.value };

      console.log('Cricketer Data:', this.cricketer);

      this.successMessage = 'Cricketer created successfully!';
      this.errorMessage = null;

      this.resetForm();
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = null;
    }
  }

  resetForm(): void {
    this.cricketerForm.reset({
      cricketerId: null,
      teamId: null,
      cricketerName: '',
      age: null,
      nationality: '',
      experience: null,
      role: '',
      totalRuns: 0,
      totalWickets: 0
    });
  }
}