import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesRouter.getAllMatches(req, res));

export default router;
