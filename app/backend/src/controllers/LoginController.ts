import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';
import JWT from '../utils/JWT';

class LoginController {
  constructor(
    private loginService = new LoginService(),
    private jwt = JWT,
  ) { }

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.loginService.login(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public getRole(_req: Request, res: Response) {
    const { role } = res.locals.user;
    console.log(this);
    return res.status(200).json({ role });
  }
}

export default LoginController;
