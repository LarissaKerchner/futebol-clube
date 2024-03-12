export default class TeamPerformance {
  private _id: number;
  private _name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;

  constructor(name: string, id: number) {
    this._id = id;
    this._name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  }

  public newMatch(homeGoals: number, awayGoals: number) {
    this.goalsFavor += homeGoals;
    this.goalsOwn += awayGoals;
    this.totalGames += 1;
    if (homeGoals > awayGoals) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    }
    if (homeGoals === awayGoals) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    }

    if (homeGoals < awayGoals) {
      this.totalLosses += 1;
    }
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get performance() {
    return {
      name: this._name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
    };
  }
}
