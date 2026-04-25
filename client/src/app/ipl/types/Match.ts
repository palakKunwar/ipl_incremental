import { Team } from './Team';
export class Match {
    matchId: number;
    firstTeamId: number; // ManyToOne relationship with Team
    secondTeamId: number; // ManyToOne relationship with Team
    matchDate: Date;
    venue: string;
    result: string;
    status: string;
    winnerTeamId: number; // ManyToOne relationship with Team
    constructor(
        matchId: number,
        firstTeamId: number,
        secondTeamId: number,
        matchDate: Date,
        venue: string,
        result: string,
        status: string,
        winnerTeamId: number
    ) {
        this.matchId = matchId;
        this.firstTeamId = firstTeamId;
        this.secondTeamId = secondTeamId;
        this.matchDate = matchDate;
        this.venue = venue;
        this.result = result;
        this.status = status;
        this.winnerTeamId = winnerTeamId;
    }
    displayInfo() {
        console.log(`Match ID: ${this.matchId}`);
        console.log(`Match Date: ${this.matchDate}`);
        console.log(`Match Venue: ${this.venue}`);
        // console.log(`First Team:${this.firstTeamId}`);
        // console.log(`Second Team:${this.secondTeamId}`);
        // console.log(`Winner:${this.winnerTeamId}`);
    }
 
}

 