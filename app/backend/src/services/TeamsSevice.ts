import TeamsModel from '../models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ServiceResponse } from '../utils/ServiceResponse';

export default class TeamsService {
  constructor(private teamsModel: TeamsModel = new TeamsModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }
}
