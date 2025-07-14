import { Router, Request, Response, NextFunction } from 'express';
import * as notificacaoController from '../controllers/notificacao.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de notificações
router.post('/', asyncHandler(notificacaoController.create));
router.get('/', asyncHandler(notificacaoController.list));
router.get('/:id', asyncHandler(notificacaoController.get));
router.put('/:id', asyncHandler(notificacaoController.update));
router.delete('/:id', asyncHandler(notificacaoController.remove));

export default router;