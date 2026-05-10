import { Team } from "./Team";

export class Cricketer {
  cricketerId: number;
  teamId: number;
  team?: Team;
  cricketerName: string;
  age: number;
  nationality: string;
  experience: number;
  role: string;
  totalRuns: number;
  totalWickets: number;

  constructor(
    cricketerId: number,
    teamId: number,
    cricketerName: string,
    age: number,
    nationality: string,
    experience: number,
    role: string,
    totalRuns: number,
    totalWickets: number
  );

  constructor(
    cricketerId: number,
    cricketerName: string,
    age: number,
    nationality: string,
    experience: number,
    role: string,
    totalRuns: number,
    totalWickets: number,
    team: Team
  );

  constructor(
    cricketerId: number,
    secondParam: number | string,
    thirdParam: string | number,
    fourthParam: number | string,
    fifthParam: string | number,
    sixthParam: number | string,
    seventhParam: string | number,
    eighthParam: number,
    ninthParam: number | Team,
    tenthParam?: number
  ) {
    this.cricketerId = cricketerId;

    if (typeof secondParam === "number") {
      this.teamId = secondParam;
      this.cricketerName = thirdParam as string;
      this.age = fourthParam as number;
      this.nationality = fifthParam as string;
      this.experience = sixthParam as number;
      this.role = seventhParam as string;
      this.totalRuns = eighthParam;
      this.totalWickets = tenthParam as number;
    } else {
      this.cricketerName = secondParam;
      this.age = thirdParam as number;
      this.nationality = fourthParam as string;
      this.experience = fifthParam as number;
      this.role = sixthParam as string;
      this.totalRuns = seventhParam as number;
      this.totalWickets = eighthParam;
      this.team = ninthParam as Team;
      this.teamId = this.team.teamId;
    }
  }

  displayInfo(): void {
    console.log(`Cricketer ID: ${this.cricketerId}`);
    console.log(`Team ID: ${this.teamId}`);
    console.log(`Cricketer Name: ${this.cricketerName}`);
  }
}