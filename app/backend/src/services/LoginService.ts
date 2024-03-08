import { compareSync } from 'bcryptjs';
import IToken from '../Interfaces/Users/IToken';
import UserModel from '../models/LoginModel';
import ILogin from '../Interfaces/Users/ILogin';
import { ServiceMessage, ServiceResponse } from '../utils/ServiceResponse';
import JWT from '../utils/JWT';

export default class LoginService {
  constructor(
    private userModel: UserModel = new UserModel(),
    private jwt = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!compareSync(data.password, user.password) && data.password.length < 6) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const token = this.jwt.sign({ email: user.email, role: user.role });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
  }
}
