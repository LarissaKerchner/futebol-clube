import { Request, Router, Response } from 'express';

import LoginController from '../controllers/LoginController';
import Validations from '../middlewares/Validations';

const loginRouter = new LoginController();

const router = Router();

router.post(
  '/',
  Validations.validationLogin,
  (req: Request, res: Response) => loginRouter.login(req, res),
);

router.post('/role', loginRouter.validateToken);

export default router;
