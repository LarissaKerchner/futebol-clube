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
    res.status(200).json(serviceResponse.data);
  }

  public async validateToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = await this.jwt.verify(authorization);
    console.log(token);

    res.status(200).json(token);
  }
}

export default LoginController;
