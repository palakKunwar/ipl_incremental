import { Team } from "./Team";

export class Match {
  matchId: number;
  firstTeamId: number;
  secondTeamId: number;
  firstTeam?: Team;
  secondTeam?: Team;
  matchDate: Date;
  venue: string;
  result: string;
  status: string;
  winnerTeamId: number;
  winnerTeam?: Team;

  constructor(
    matchId: number,
    firstTeamOrId: Team | number,
    secondTeamOrId: Team | number,
    matchDate: Date,
    venue: string,
    result: string,
    status: string,
    winnerTeamOrId: Team | number
  ) {
    this.matchId = matchId;

    if (typeof firstTeamOrId === "number") {
      this.firstTeamId = firstTeamOrId;
    } else {
      this.firstTeam = firstTeamOrId;
      this.firstTeamId = firstTeamOrId.teamId;
    }

    if (typeof secondTeamOrId === "number") {
      this.secondTeamId = secondTeamOrId;
    } else {
      this.secondTeam = secondTeamOrId;
      this.secondTeamId = secondTeamOrId.teamId;
    }

    if (typeof winnerTeamOrId === "number") {
      this.winnerTeamId = winnerTeamOrId;
    } else {
      this.winnerTeam = winnerTeamOrId;
      this.winnerTeamId = winnerTeamOrId.teamId;
    }

    this.matchDate = matchDate;
    this.venue = venue;
    this.result = result;
    this.status = status;
  }

  displayInfo(): void {
    console.log(`Match ID: ${this.matchId}, 
            Match Date: ${this.matchDate}, 
            Venue: ${this.venue}`);
  }
}