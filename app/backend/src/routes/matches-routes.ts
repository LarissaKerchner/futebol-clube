import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middlewares/Validations';

const matchesRouter = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesRouter.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validationToken,
  (req: Request, res: Response) => matchesRouter.finishMatch(req, res),
);
router.patch(
  '/:id',
  Validations.validationToken,
  (req: Request, res: Response) => matchesRouter.updateMatche(req, res),
);

router.post(
  '/',
  Validations.validationToken,
  (req: Request, res: Response) => matchesRouter.createMatche(req, res),
);
export default router;
