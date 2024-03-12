import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async getHomeLeaderboard(_req: Request, res: Response) {
    try {
      const leaderboardData = await this.leaderboardService.getHomeLeaderboardData();
      return res.status(200).json(leaderboardData.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getAwayLeaderboard(_req: Request, res: Response) {
    try {
      const leaderboardData = await this.leaderboardService.getAwayLeaderboardData();
      return res.status(200).json(leaderboardData.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async allTeamsPerformance(_req: Request, res: Response) {
    const leaderboardData = await this.leaderboardService.allTeamsPeformance();
    return res.status(200).json(leaderboardData.data);
  }
}
