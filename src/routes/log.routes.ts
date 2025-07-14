import { Router, Request, Response, NextFunction } from 'express';
import * as logController from '../controllers/log.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post('/', asyncHandler(logController.create));
router.get('/', asyncHandler(logController.list));
// router.get('/:id', asyncHandler(logController.get));
router.put('/:id', asyncHandler(logController.update));
router.delete('/:id', asyncHandler(logController.remove));

export default router;