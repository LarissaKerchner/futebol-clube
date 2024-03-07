import ITeams from './ITeams';
import { ID } from '..';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>
  findById(id: ID): Promise<ITeams | null>
}
