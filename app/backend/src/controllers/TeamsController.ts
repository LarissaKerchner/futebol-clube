import { Request, Response } from 'express';
import TeamsService from '../services/TeamsSevice';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) { }

  public async getAllTeams(_req: Request, res: Response) {
    const response = await this.teamsService.getAllTeams();
    return res.status(200).json(response.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getTeamById(Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
