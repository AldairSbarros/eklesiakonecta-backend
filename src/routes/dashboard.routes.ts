import { Router } from 'express';
import * as dashController from '../controllers/dash.controller';

const router = Router();

router.get('/resumo-financeiro', (req, res, next) => {
  dashController.resumoFinanceiro(req, res).catch(next);
});
router.get('/resumo-financeiro-mensal', (req, res, next) => {
  dashController.resumoFinanceiroMensal(req, res).catch(next);
});

export default router;