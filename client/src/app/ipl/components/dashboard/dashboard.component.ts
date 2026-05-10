import { Component, OnInit } from '@angular/core';
import { IplService } from '../../services/ipl.service';
import { Team } from '../../types/Team';
import { Cricketer } from '../../types/Cricketer';
import { Match } from '../../types/Match';
import { TicketBooking } from '../../types/TicketBooking';
import { Vote } from '../../types/Vote';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];
  cricketers: Cricketer[] = [];
  filteredCricketers: Cricketer[] = [];
  matches: Match[] = [];
  filteredMatches: Match[] = [];
  ticketsBooked: TicketBooking[] = [];
  allTicketsBooked: TicketBooking[] = [];
  voteList: Vote[] = [];
  voteArray: Vote[] = [];
  role!: string | null;
  userId!: number;
  userEmail: string = '';

  // Cricketer filters
  cricketerSearchName: string = '';
  cricketerSortAge: string = 'asc';

  // Match filters
  matchStatusFilter: string = '';
  matchVenueSearch: string = '';

  // Multi-select for admin delete
  selectedTeamIds: Set<number> = new Set();
  selectedCricketerIds: Set<number> = new Set();
  selectedMatchIds: Set<number> = new Set();

  constructor(
    private readonly iplService: IplService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userId = Number(localStorage.getItem('user_id'));
    this.userEmail = localStorage.getItem('email') || '';

    if (this.role === 'ADMIN') {
      this.loadAdminData();
    } else {
      this.loadUserData();
    }
  }

  // ─── DATA LOADING ───────────────────────────────────────

  loadAdminData(): void {
    this.loadTeams();
    this.loadCricketers();
    this.loadMatches();
    this.iplService.getAllTicketBookings().subscribe({
      next: (data) => { this.allTicketsBooked = data; },
      error: (e) => console.error('Error loading tickets', e)
    });
    this.iplService.getAllVotes().subscribe({
      next: (data) => { this.voteArray = data; },
      error: (e) => console.error('Error loading votes', e)
    });
  }

  loadUserData(): void {
    this.loadTeams();
    this.loadCricketers();
    this.loadMatches();
    this.iplService.getAllVotes().subscribe({
      next: (data) => { this.voteList = data; },
      error: (e) => console.error('Error loading votes', e)
    });
    // Auto-load tickets for logged-in user
    if (this.userEmail) {
      this.iplService.getBookingsByUserEmail(`${this.userEmail}@gmail.com`).subscribe({
        next: (data) => { this.ticketsBooked = data; },
        error: (e) => console.error('Error loading tickets', e)
      })
      console.log(this.ticketsBooked.length);
      ;
    }
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (res) => { this.teams = res; },
      error: (e) => console.error('Error loading teams', e)
    });
  }

  loadCricketers(): void {
    this.iplService.getAllCricketers().subscribe({
      next: (res) => {
        this.cricketers = res;
        this.applyFilters();
      },
      error: (e) => console.error('Error loading cricketers', e)
    });
  }

  loadMatches(): void {
    this.iplService.getAllMatches().subscribe({
      next: (res) => {
        this.matches = res;
        this.applyMatchFilters();
      },
      error: (e) => console.error('Error loading matches', e)
    });
  }

  // ─── CRICKETER FILTERS ───────────────────────────────────

  applyFilters(): void {
    let result = [...this.cricketers];

    // Search by name
    if (this.cricketerSearchName.trim()) {
      result = result.filter(c =>
        c.cricketerName.toLowerCase().includes(this.cricketerSearchName.toLowerCase())
      );
    }

    // Sort by age
    result.sort((a, b) =>
      this.cricketerSortAge === 'asc' ? a.age - b.age : b.age - a.age
    );

    this.filteredCricketers = result;
  }

  onCricketerSearch(value: string): void {
    this.cricketerSearchName = value;
    this.applyFilters();
  }

  onCricketerSortChange(value: string): void {
    this.cricketerSortAge = value;
    this.applyFilters();
  }

  // ─── MATCH FILTERS ───────────────────────────────────────

  applyMatchFilters(): void {
    let result = [...this.matches];

    if (this.matchStatusFilter) {
      result = result.filter(m =>
        m.status?.toLowerCase() === this.matchStatusFilter.toLowerCase()
      );
    }

    if (this.matchVenueSearch.trim()) {
      result = result.filter(m =>
        m.venue?.toLowerCase().includes(this.matchVenueSearch.toLowerCase())
      );
    }

    this.filteredMatches = result;
  }

  onMatchStatusFilter(value: string): void {
    this.matchStatusFilter = value;
    this.applyMatchFilters();
  }

  onMatchVenueSearch(value: string): void {
    this.matchVenueSearch = value;
    this.applyMatchFilters();
  }

  // ─── NAVIGATION ──────────────────────────────────────────

  editTeam(teamId: number) { this.router.navigate(['/ipl/team/edit', teamId]); }
  editCricketer(cricketerId: number) { this.router.navigate(['/ipl/cricketer/edit', cricketerId]); }
  editMatch(matchId: number) { this.router.navigate(['/ipl/match/edit', matchId]); }

  // ─── SINGLE DELETE ───────────────────────────────────────

  deleteTeam(teamId: number): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.iplService.deleteTeam(teamId).subscribe({
        next: () => { alert('Team deleted successfully.'); this.loadAdminData(); },
        error: () => alert('Unable to delete team.')
      });
    }
  }

  deleteCricketer(cricketerId: number): void {
    if (confirm('Are you sure you want to delete this cricketer?')) {
      this.iplService.deleteCricketer(cricketerId).subscribe({
        next: () => { alert('Cricketer deleted successfully.'); this.loadAdminData(); },
        error: () => alert('Unable to delete cricketer.')
      });
    }
  }

  deleteMatch(matchId: number): void {
    if (confirm('Are you sure you want to delete this match?')) {
      this.iplService.deleteMatch(matchId).subscribe({
        next: () => { alert('Match deleted successfully.'); this.loadAdminData(); },
        error: () => alert('Unable to delete match.')
      });
    }
  }

  // ─── MULTI-SELECT ────────────────────────────────────────

  toggleTeamSelection(teamId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    checked ? this.selectedTeamIds.add(teamId) : this.selectedTeamIds.delete(teamId);
  }

  toggleCricketerSelection(cricketerId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    checked ? this.selectedCricketerIds.add(cricketerId) : this.selectedCricketerIds.delete(cricketerId);
  }

  toggleMatchSelection(matchId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    checked ? this.selectedMatchIds.add(matchId) : this.selectedMatchIds.delete(matchId);
  }

  selectAllTeams(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedTeamIds = checked ? new Set(this.teams.map(t => t.teamId)) : new Set();
  }

  selectAllCricketers(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedCricketerIds = checked ? new Set(this.filteredCricketers.map(c => c.cricketerId)) : new Set();
  }

  selectAllMatches(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedMatchIds = checked ? new Set(this.filteredMatches.map(m => m.matchId)) : new Set();
  }

  // ─── BULK DELETE ─────────────────────────────────────────

  deleteSelectedTeams(): void {
    if (this.selectedTeamIds.size === 0) return;
    if (!confirm(`Delete ${this.selectedTeamIds.size} selected team(s)?`)) return;
    const deletes = Array.from(this.selectedTeamIds).map(id =>
      this.iplService.deleteTeam(id).pipe(catchError(() => of(null)))
    );
    forkJoin(deletes).subscribe(() => {
      this.selectedTeamIds.clear();
      this.loadAdminData();
    });
  }

  deleteSelectedCricketers(): void {
    if (this.selectedCricketerIds.size === 0) return;
    if (!confirm(`Delete ${this.selectedCricketerIds.size} selected cricketer(s)?`)) return;
    const deletes = Array.from(this.selectedCricketerIds).map(id =>
      this.iplService.deleteCricketer(id).pipe(catchError(() => of(null)))
    );
    forkJoin(deletes).subscribe(() => {
      this.selectedCricketerIds.clear();
      this.loadAdminData();
    });
  }

  deleteSelectedMatches(): void {
    if (this.selectedMatchIds.size === 0) return;
    if (!confirm(`Delete ${this.selectedMatchIds.size} selected match(es)?`)) return;
    const deletes = Array.from(this.selectedMatchIds).map(id =>
      this.iplService.deleteMatch(id).pipe(catchError(() => of(null)))
    );
    forkJoin(deletes).subscribe(() => {
      this.selectedMatchIds.clear();
      this.loadAdminData();
    });
  }
}