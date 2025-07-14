import { Router, Request, Response, NextFunction } from 'express';
import * as arquivoController from '../controllers/arquivo.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post('/', asyncHandler(arquivoController.create));
router.get('/', asyncHandler(arquivoController.list));
router.get('/:id', asyncHandler(arquivoController.get));
router.put('/:id', asyncHandler(arquivoController.update));
router.delete('/:id', asyncHandler(arquivoController.remove));

export default router;