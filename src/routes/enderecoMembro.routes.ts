import { Router, Request, Response, NextFunction } from 'express';
import * as enderecoMembroController from '../controllers/enderecoMembro.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de endereço do membro
router.post('/', asyncHandler(enderecoMembroController.create));
router.get('/', asyncHandler(enderecoMembroController.list));
router.get('/:id', asyncHandler(enderecoMembroController.get));
router.put('/:id', asyncHandler(enderecoMembroController.update));
router.delete('/:id', asyncHandler(enderecoMembroController.remove));

export default router;