import ITeams from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbTeam = await this.model.findByPk(id);
    if (!dbTeam) return null;
    const { teamName }: ITeams = dbTeam;
    return { id, teamName };
  }
}
