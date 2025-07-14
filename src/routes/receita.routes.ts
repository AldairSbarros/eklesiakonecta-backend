import { Router } from 'express';
import * as receitasController from '../controllers/receitas.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', asyncHandler(receitasController.criarReceita));
router.get('/', asyncHandler(receitasController.listarReceitas));
router.get('/:id', asyncHandler(receitasController.obterReceita));
router.put('/:id', asyncHandler(receitasController.atualizarReceita));
router.delete('/:id', asyncHandler(receitasController.removerReceita));

export default router;