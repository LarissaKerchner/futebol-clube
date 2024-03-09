import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.matchesServices.getFilteredMatches(inProgress === 'true');
      return res.status(200).json(matches.data);
    }
    const allMatches = await this.matchesServices.getAllMatches();
    return res.status(200).json(allMatches.data);
  }
}
