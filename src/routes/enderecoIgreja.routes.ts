import { Router, Request, Response, NextFunction } from 'express';
import * as enderecoIgrejaController from '../controllers/enderecoIgreja.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de endereço da igreja
router.post('/', asyncHandler(enderecoIgrejaController.create));
router.get('/', asyncHandler(enderecoIgrejaController.list));
router.get('/:id', asyncHandler(enderecoIgrejaController.get));
router.put('/:id', asyncHandler(enderecoIgrejaController.update));
router.delete('/:id', asyncHandler(enderecoIgrejaController.remove));