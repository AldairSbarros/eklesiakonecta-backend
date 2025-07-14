import { Router, Request, Response } from 'express';
import * as ministerioLocalController from '../controllers/ministerioLocal.controller';

const router = Router();

router.post('/', ministerioLocalController.create as (req: Request, res: Response) => any);
router.get('/', ministerioLocalController.list as (req: Request, res: Response) => any);
router.get('/:id', ministerioLocalController.get as (req: Request, res: Response) => any);
router.put('/:id', ministerioLocalController.update as (req: Request, res: Response) => any);
router.delete('/:id', ministerioLocalController.remove as (req: Request, res: Response) => any);

export default router;