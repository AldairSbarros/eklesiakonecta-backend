import { Router, Request, Response, NextFunction } from 'express';
import * as faturaController from '../controllers/fatura.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de faturas
router.post('/', asyncHandler(faturaController.create));
router.get('/', asyncHandler(faturaController.list));
router.get('/:id', asyncHandler(faturaController.get));
router.put('/:id', asyncHandler(faturaController.update));
router.delete('/:id', asyncHandler(faturaController.remove));

export default router;