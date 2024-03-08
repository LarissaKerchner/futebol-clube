import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const matches = await this.matchesServices.getAllMatches();
    if (matches.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }
    return res.status(200).json(matches.data);
  }
}
