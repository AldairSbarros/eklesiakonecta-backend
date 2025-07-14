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

/**
 * @swagger
 * /relatorio/mensal:
 *   get:
 *     summary: Retorna o relatório mensal
 *     responses:
 *       200:
 *         description: Relatório mensal retornado com sucesso
 */
router.get('/mensal', asyncHandler(async (req, res) => relatorioController.relatorioMensal(req)));

/**
 * @swagger
 * /relatorio/discipulado/por-discipulador:
 *   get:
 *     summary: Retorna o relatório de discipulado por discipulador
 *     responses:
 *       200:
 *         description: Relatório de discipulado retornado com sucesso
 */
router.get('/discipulado/por-discipulador', asyncHandler(relatorioController.relatorioDiscipuladoPorDiscipulador));

/**
 * @swagger
 * /relatorio/mensal/pdf:
 *   get:
 *     summary: Retorna o relatório mensal em PDF
 *     responses:
 *       200:
 *         description: PDF do relatório mensal retornado com sucesso
 */
router.get('/mensal/pdf', asyncHandler(async (req, res) => relatorioController.relatorioMensalPDF(req)));

/**
 * @swagger
 * /relatorio/celulas:
 *   get:
 *     summary: Retorna o relatório de células
 *     responses:
 *       200:
 *         description: Relatório de células retornado com sucesso
 */
router.get('/celulas', asyncHandler(relatorioController.relatorioCelulas));

/**
 * @swagger
 * /relatorio/financeiro:
 *   get:
 *     summary: Retorna o relatório financeiro
 *     responses:
 *       200:
 *         description: Relatório financeiro retornado com sucesso
 */
router.get('/financeiro', asyncHandler(relatorioController.relatorioFinanceiro));

export default router;