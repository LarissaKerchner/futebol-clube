import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsRouter.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsRouter.getTeamById(req, res));

export default router;
