import { Request, Response } from 'express';
import TeamsService from '../services/TeamsSevice';

export default class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) { }

  public async getAllTeams(_req: Request, res: Response) {
    const response = await this.teamsService.getAllTeams();
    return res.status(200).json(response.data);
  }
}
