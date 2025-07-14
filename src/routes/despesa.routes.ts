import { Router, Request, Response, NextFunction } from 'express';
import * as despesaController from '../controllers/despesa.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', asyncHandler(despesaController.criarDespesa));
router.get('/', asyncHandler(despesaController.listarDespesas));
router.get('/:id', asyncHandler(despesaController.obterDespesa));
router.put('/:id', asyncHandler(despesaController.atualizarDespesa));
router.delete('/:id', asyncHandler(despesaController.removerDespesa));

export default router;