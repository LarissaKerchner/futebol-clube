import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.loginService.login(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }
}

export default LoginController;
