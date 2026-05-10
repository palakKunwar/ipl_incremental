import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IplService } from '../../services/ipl.service';
import { Team } from '../../types/Team';
import { Cricketer } from '../../types/Cricketer';
import { Match } from '../../types/Match';
import { TicketBooking } from '../../types/TicketBooking';
import { Vote } from '../../types/Vote';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teams: Team[] = [];
  cricketers: Cricketer[] = [];
  matches: Match[] = [];

  // USER
  voteList: Vote[] = [];
  ticketsBooked: TicketBooking[] = [];

  // ADMIN
  voteArray: Vote[] = [];
  allTicketsBooked: TicketBooking[] = [];

  emailForm!: FormGroup;
  role!: string | null;
  userId!: number;
  searched = false;

  constructor(
    private iplService: IplService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userId = Number(localStorage.getItem('user_id'));

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Load common data
    this.loadTeams();
    this.loadCricketers();
    this.loadMatches();

    // Role specific loading
    if (this.role === 'USER') {
      this.loadVotes();
    }

    if (this.role === 'ADMIN') {
      this.loadAdminData();
    }
  }

  /* ---------------- COMMON LOADERS ---------------- */

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe(res => this.teams = res);
  }

  loadCricketers(): void {
    this.iplService.getAllCricketers().subscribe(res => this.cricketers = res);
  }

  loadMatches(): void {
    this.iplService.getAllMatches().subscribe(res => this.matches = res);
  }

  /* ---------------- USER FUNCTIONS ---------------- */

  loadVotes(): void {
    this.iplService.getAllVotes().subscribe(res => this.voteList = res);
  }

  loadTicketsBooked(): void {
    const email = this.emailForm.get('email')?.value;
    this.iplService.getBookingsByUserEmail(email).subscribe(res => {
      this.ticketsBooked = res;
      this.searched = true;
    });
  }

  onSubmitEmail(): void {
    if (this.emailForm.valid) {
      this.loadTicketsBooked();
    }
  }

  /* ---------------- ADMIN FUNCTIONS ---------------- */

  loadAdminData(): void {
    this.iplService.getAllVotes().subscribe(res => this.voteArray = res);
    this.iplService.getAllTicketBookings().subscribe(res => this.allTicketsBooked = res);
  }

  editTeam(id: number): void {
    this.router.navigate(['/ipl/team/edit', id]);
  }

  editCricketer(id: number): void {
    this.router.navigate(['/ipl/cricketer/edit', id]);
  }

  editMatch(id: number): void {
    this.router.navigate(['/ipl/match/edit', id]);
  }

  deleteTeam(id: number): void {
    if (confirm('Delete team?')) {
      this.iplService.deleteTeam(id).subscribe(() => this.loadAdminData());
    }
  }

  deleteCricketer(id: number): void {
    if (confirm('Delete cricketer?')) {
      this.iplService.deleteCricketer(id).subscribe(() => this.loadAdminData());
    }
  }

  deleteMatch(id: number): void {
    if (confirm('Delete match?')) {
      this.iplService.deleteMatch(id).subscribe(() => this.loadAdminData());
    }
  }
}