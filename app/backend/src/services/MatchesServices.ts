import { ServiceResponse, ServiceMessage } from '../utils/ServiceResponse';
import MatchesModel from '../models/MatchesModel';

export default class MatchesServices {
  constructor(private matchesModel: MatchesModel = new MatchesModel()) { }

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

  public async updateMatches(data: any, id: number): Promise<ServiceResponse<ServiceMessage>> {
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
}
