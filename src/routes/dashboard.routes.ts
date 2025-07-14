import { Router } from 'express';
import * as dashController from '../controllers/dash.controller';

const router = Router();

/**
 * @swagger
 * /dashboard/resumo-financeiro:
 *   get:
 *     summary: Retorna o resumo financeiro geral
 *     responses:
 *       200:
 *         description: Resumo financeiro retornado com sucesso
 */
router.get('/resumo-financeiro', (req, res, next) => {
  dashController.resumoFinanceiro(req, res).catch(next);
});

/**
 * @swagger
 * /dashboard/resumo-financeiro-mensal:
 *   get:
 *     summary: Retorna o resumo financeiro mensal
 *     responses:
 *       200:
 *         description: Resumo financeiro mensal retornado com sucesso
 */
router.get('/resumo-financeiro-mensal', (req, res, next) => {
  dashController.resumoFinanceiroMensal(req, res).catch(next);
});
export default router;