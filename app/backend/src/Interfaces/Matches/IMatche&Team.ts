import { Identifiable } from '..';

export default interface IMatcheTeam extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}
