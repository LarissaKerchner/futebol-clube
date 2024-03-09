import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAllMatches() {
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
  }

  async getInProgressTrue() {
    const matches = await this.model.findAll({
      where: {
        inProgress: true,
      },
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
  }

  async getInProgressFalse() {
    const matches = await this.model.findAll({
      where: {
        inProgress: false,
      },
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
  }
}
