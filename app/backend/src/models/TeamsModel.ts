import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams.map(({ id, teamName }) => ({ id, teamName }));
  }
}
