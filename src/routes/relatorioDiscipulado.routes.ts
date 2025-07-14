import { Router } from 'express';
import * as controller from '../controllers/relatoiroDiscipulado.controller';

const router = Router();

/**
 * @swagger
 * /relatorio-discipulado/por-discipulador:
 *   get:
 *     summary: Retorna o relatório de discipulandos por discipulador
 *     responses:
 *       200:
 *         description: Relatório retornado com sucesso
 */
router.get('/por-discipulador', controller.relatorioDiscipulandosPorDiscipulador);

/**
 * @swagger
 * /relatorio-discipulado/sem-encontro:
 *   get:
 *     summary: Retorna o relatório de discipulandos sem encontro
 *     responses:
 *       200:
 *         description: Relatório retornado com sucesso
 */
router.get('/sem-encontro', controller.relatorioDiscipulandosSemEncontro);

export default router;