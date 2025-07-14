import { Router } from 'express';
import * as investimentosController from '../controllers/investimentos.controller';

const router = Router();

function asyncHandler(fn: any) {
	return function(req: any, res: any, next: any) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

router.post('/', asyncHandler(investimentosController.criarInvestimento));
router.get('/', asyncHandler(investimentosController.listarInvestimentos));
router.get('/:id', asyncHandler(investimentosController.obterInvestimento));
router.put('/:id', asyncHandler(investimentosController.atualizarInvestimento));
router.delete('/:id', asyncHandler(investimentosController.removerInvestimento));

export default router;