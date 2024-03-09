import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';

const messageError = 'Error when making the request';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAllMatches() {
    try {
      const matches = await this.model.findAll({
        include: [{
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
        ],
      });
      return matches;
    } catch (error) {
      throw new Error(messageError);
    }
  }

  async getInProgressTrue() {
    try {
      const matches = await this.model.findAll({
        where: { inProgress: true },
        include: [{
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
      });
      return matches;
    } catch (error) {
      throw new Error(messageError);
    }
  }

  async getInProgressFalse() {
    try {
      const matches = await this.model.findAll({
        where: { inProgress: false },
        include: [{
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        }, {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
      });
      return matches;
    } catch (error) {
      throw new Error(messageError);
    }
  }

  async updateFinish(id: number) {
    try {
      const update = await this.model.update({ inProgress: false }, { where: { id } });
      return update;
    } catch (error) {
      throw new Error(messageError);
    }
  }

  async getMatcheById(id: number) {
    try {
      const matcheById = await this.model.findByPk(id);
      return matcheById;
    } catch (error) {
      throw new Error(messageError);
    }
  }

  async updateMatches(data: any, id: number) {
    const update = await this.model.update(
      { homeTeamGoals: data.homeTeamGoals,
        awayTeamGoals: data.awayTeamGoals },
      { where: { id } },
    );
    return update;
  }
}
