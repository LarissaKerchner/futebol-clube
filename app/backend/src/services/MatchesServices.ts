import IMatches from '../Interfaces/Matches/IMatches';
import { ServiceResponse, ServiceMessage } from '../utils/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import { upMatche } from '../types/upMatche';
import { NewEntity } from '../Interfaces';
import TeamsModel from '../models/TeamsModel';

export default class MatchesServices {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async getAllMatches() {
    const matches = await this.matchesModel.findAllMatches();
    if (!matches) {
      return { status: 'NOT_FOUND', data: { message: 'No matches found' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getFilteredMatches(inProgress: boolean) {
    const matches = inProgress
      ? await this.matchesModel.getInProgressTrue()
      : await this.matchesModel.getInProgressFalse();
    if (!matches) {
      return { status: 'NOT_FOUND', data: { message: 'No matches found' } };
    }
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatchInProgress(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const getById = await this.matchesModel.getMatcheById(id);
    if (!getById) {
      return { status: 'NOT_FOUND', data: { message: `The id ${id}, not found` } };
    }
    await this.matchesModel.updateFinish(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatches(data: upMatche, id: number): Promise<ServiceResponse<ServiceMessage>> {
    const getById = await this.matchesModel.getMatcheById(id);
    if (!getById) {
      return { status: 'NOT_FOUND', data: { message: `The id ${id}, not found` } };
    }
    if (getById?.inProgress === true) {
      await this.matchesModel.updateMatches(data, id);
      return { status: 'SUCCESSFUL', data: { message: 'Updated match' } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Error when updating' } };
  }

  public async createMatche(data: NewEntity<IMatches>):
  Promise<ServiceResponse<IMatches | ServiceMessage>> {
    const verifyHomeTeams = await this.teamsModel.findById(data.homeTeamId);
    const verifyAwayTeams = await this.teamsModel.findById(data.awayTeamId);
    if (!verifyHomeTeams || !verifyAwayTeams) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    if (data.homeTeamId === data.awayTeamId) {
      return { status: 'UNPROCESSABLE',
        data:
      { message: 'It is not possible to create a match with two equal teams' } };
    }

    const match = await this.matchesModel.create(data);
    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Error when creating the match' } };
    }
    return { status: 'SUCCESSFUL', data: match };
  }
}
