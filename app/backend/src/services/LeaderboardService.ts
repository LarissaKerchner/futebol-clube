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

  public async getAwayLeaderboardData() {
    const matches = await this.matchesModel.getInProgressFalse();
    const teams = await this.teamsModel.findAll();

    const instanceAllTeam = teams.map((away) => new TeamPerformance(away.teamName, away.id));

    matches.forEach((away) => {
      const awayTeamPerformance = instanceAllTeam.filter((team) => team.id === away.awayTeamId)[0];
      awayTeamPerformance.newMatch(away.awayTeamGoals, away.homeTeamGoals);
    });

    const allTeamAway = instanceAllTeam.map((team) => team.performance).sort((c, d) => {
      if (c.totalPoints !== d.totalPoints) return d.totalPoints - c.totalPoints;
      if (c.totalVictories !== d.totalVictories) return d.totalVictories - c.totalVictories;
      if ((c.goalsFavor - c.goalsOwn) !== (d.goalsFavor - d.goalsOwn)) {
        return (d.goalsFavor - d.goalsOwn) - (c.goalsFavor - c.goalsOwn);
      }
      return d.goalsFavor - c.goalsFavor;
    });

    return { status: 'SUCCESSFUL', data: allTeamAway };
  }
}
