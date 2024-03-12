import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import TeamPerformance from '../TeamPerformance';

export default class LeaderboardService {
  constructor(
    private teamsModel: TeamsModel = new TeamsModel(),
    private matchesModel: MatchesModel = new MatchesModel(),
  ) {

  }

  public async getHomeLeaderboardData() {
    const matches = await this.matchesModel.getInProgressFalse();
    const teams = await this.teamsModel.findAll();

    const instanceAllTeam = teams.map((team) => new TeamPerformance(team.teamName, team.id));

    matches.forEach((match) => {
      const homeTeamPerformance = instanceAllTeam.filter((team) => team.id === match.homeTeamId)[0];
      homeTeamPerformance.newMatch(match.homeTeamGoals, match.awayTeamGoals);
    });

    const allTeams = instanceAllTeam.map((team) => team.performance).sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if ((a.goalsFavor - a.goalsOwn) !== (b.goalsFavor - b.goalsOwn)) {
        return (b.goalsFavor - b.goalsOwn) - (a.goalsFavor - a.goalsOwn);
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
