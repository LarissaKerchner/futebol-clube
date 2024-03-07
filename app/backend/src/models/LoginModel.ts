import ILogin from '../Interfaces/Users/ILogin';
import IUserModel from '../Interfaces/Users/IUserModel';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;
  async findByEmail(data: string): Promise<ILogin | null> {
    const user = await this.model.findOne({ where: { email: data } });
    if (!user) return null;
    const { email, password }: ILogin = user;
    return { email, password };
  }
}
