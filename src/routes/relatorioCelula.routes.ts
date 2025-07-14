import { Router } from 'express';
import * as relatorioController from '../controllers/relatorioCelula.controller';

const router = Router();

/**
 * @swagger
 * /relatorio-celula/{celulaId}/completo:
 *   get:
 *     summary: Retorna o relatório completo da célula
 *     parameters:
 *       - in: path
 *         name: celulaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relatório completo retornado com sucesso
 */
router.get('/:celulaId/completo', (req, res, next) => {
    relatorioController.relatorioCompleto(req, res, next).catch(next);
});

/**
 * @swagger
 * /relatorio-celula/{celulaId}/presencas:
 *   get:
 *     summary: Retorna o relatório de presenças da célula
 *     parameters:
 *       - in: path
 *         name: celulaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relatório de presenças retornado com sucesso
 */
router.get('/:celulaId/presencas', (req, res, next) => {
    relatorioController.relatorioPresenca(req, res, next).catch(next);
});

export default router;