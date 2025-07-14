import { Router, Request, Response, NextFunction } from 'express';
import * as sermaoController from '../controllers/sermao.controller';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.create(req, res)).catch(next);
});
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.list(req, res)).catch(next);
});
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.get(req, res)).catch(next);
});
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.update(req, res)).catch(next);
});
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(sermaoController.remove(req, res)).catch(next);
});

export default router;