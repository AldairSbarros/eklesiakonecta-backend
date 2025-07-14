import { Router, Request, Response, NextFunction } from 'express';
import * as relatorioController from '../controllers/relatorio.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get('/mensal', asyncHandler(async (req, res) => relatorioController.relatorioMensal(req)));
router.get('/discipulado/por-discipulador', asyncHandler(relatorioController.relatorioDiscipuladoPorDiscipulador));
router.get('/mensal/pdf', asyncHandler(async (req, res) => relatorioController.relatorioMensalPDF(req)));
router.get('/celulas', asyncHandler(relatorioController.relatorioCelulas));
router.get('/financeiro', asyncHandler(relatorioController.relatorioFinanceiro));
router.get('/discipulado/por-discipulador', asyncHandler(relatorioController.relatorioDiscipuladoPorDiscipulador));
export default router;