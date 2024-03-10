import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matcheFinish = await this.matchesServices.updateMatchInProgress(Number(id));
    if (matcheFinish.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(matcheFinish.status)).json(matcheFinish.data);
    }
    return res.status(200).json(matcheFinish.data);
  }

  public async updateMatche(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    const matche = await this.matchesServices.updateMatches(data, Number(id));
    if (matche.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(matche.status)).json(matche.data);
    }
    return res.status(200).json(matche.data);
  }

  public async createMatche(req: Request, res: Response) {
    const data = req.body;

    const newMatche = await this.matchesServices.createMatche(data);
    if (newMatche.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(newMatche.status)).json(newMatche.data);
    }
    return res.status(201).json(newMatche.data);
  }
}
