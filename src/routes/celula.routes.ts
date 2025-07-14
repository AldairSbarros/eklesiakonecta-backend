import { Router, Request, Response, NextFunction } from 'express';
import * as celulaController from '../controllers/celula.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// CRUD de célula
router.post('/', asyncHandler(celulaController.create));
router.get('/', asyncHandler(celulaController.list));
router.get('/:id', asyncHandler(celulaController.get));
router.put('/:id', asyncHandler(celulaController.update));
router.delete('/:id', asyncHandler(celulaController.remove));
router.put('/:id/localizacao', autenticarJWT, autorizarRoles(['ADMIN', 'LIDER']), asyncHandler(celulaController.atualizarLocalizacao));

// Membros da célula
router.post('/:id/membros', asyncHandler(celulaController.addMembro));
router.delete('/:id/membros/:membroId', asyncHandler(celulaController.removeMembro));
router.get('/:id/membros', celulaController.listarMembros as (req: Request, res: Response, next: NextFunction) => any);

export default router;