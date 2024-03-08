import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class Validations {
  static validationLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validationToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const payload = JWT.verify(authorization.split(' ')[1]);
      res.locals.user = payload;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
