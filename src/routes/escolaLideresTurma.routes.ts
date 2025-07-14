import { Router, Request, Response, NextFunction } from 'express';
import * as escolaLideresTurmaController from '../controllers/escolaLideresTurma.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de turmas da escola de líderes
router.post('/', asyncHandler(escolaLideresTurmaController.create));
router.get('/', asyncHandler(escolaLideresTurmaController.list));
router.get('/:id', asyncHandler(escolaLideresTurmaController.get));
router.put('/:id', asyncHandler(escolaLideresTurmaController.update));
router.delete('/:id', asyncHandler(escolaLideresTurmaController.remove));

export default router;