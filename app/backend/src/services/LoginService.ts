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
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const user = await this.userModel.findByEmail(data.email);
    console.log(user);
    if (!user || user.email === null || !emailRegex.test(data.email)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    if (data.password.length < 6 || !compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = this.jwt.sign({ email: user.email, role: user.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
