import { Router, Request, Response } from 'express';
import * as presencaController from '../controllers/presencaCelula.controller';

const router = Router();

router.post('/', presencaController.create as (req: Request, res: Response) => any);
router.get('/', presencaController.list as (req: Request, res: Response) => any);
router.get('/:id', presencaController.get as (req: Request, res: Response) => any);
router.put('/:id', presencaController.update as (req: Request, res: Response) => any);
router.delete('/:id', presencaController.remove as (req: Request, res: Response) => any);

export default router;