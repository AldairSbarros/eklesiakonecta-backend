import { Router, Request, Response, NextFunction } from 'express';
import * as escolaLideresLicaoController from '../controllers/escolaLideresLicao.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de lições da escola de líderes
router.post('/', asyncHandler(escolaLideresLicaoController.create));
router.get('/', asyncHandler(escolaLideresLicaoController.list));
router.get('/:id', asyncHandler(escolaLideresLicaoController.get));
router.put('/:id', asyncHandler(escolaLideresLicaoController.update));
router.delete('/:id', asyncHandler(escolaLideresLicaoController.remove));

export default router;