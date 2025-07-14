import { Router, Request, Response, NextFunction } from 'express';
import * as escolaLideresModuloController from '../controllers/escolaLideresModulo.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de módulos da escola de líderes
router.post('/', asyncHandler(escolaLideresModuloController.create));
router.get('/', asyncHandler(escolaLideresModuloController.list));
router.get('/:id', asyncHandler(escolaLideresModuloController.get));
router.put('/:id', asyncHandler(escolaLideresModuloController.update));
router.delete('/:id', asyncHandler(escolaLideresModuloController.remove));