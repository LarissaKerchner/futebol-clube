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
}
