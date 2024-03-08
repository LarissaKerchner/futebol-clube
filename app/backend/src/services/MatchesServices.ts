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
}
