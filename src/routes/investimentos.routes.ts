import { Router } from 'express';
import * as investimentosController from '../controllers/investimentos.controller';

const router = Router();

function asyncHandler(fn: any) {
    return function(req: any, res: any, next: any) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * @swagger
 * /investimentos:
 *   post:
 *     summary: Cria um novo investimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Investimento criado com sucesso
 */
router.post('/', asyncHandler(investimentosController.criarInvestimento));

/**
 * @swagger
 * /investimentos:
 *   get:
 *     summary: Lista todos os investimentos
 *     responses:
 *       200:
 *         description: Lista de investimentos retornada com sucesso
 */
router.get('/', asyncHandler(investimentosController.listarInvestimentos));

/**
 * @swagger
 * /investimentos/{id}:
 *   get:
 *     summary: Busca um investimento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Investimento encontrado com sucesso
 */
router.get('/:id', asyncHandler(investimentosController.obterInvestimento));

/**
 * @swagger
 * /investimentos/{id}:
 *   put:
 *     summary: Atualiza um investimento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Investimento atualizado com sucesso
 */
router.put('/:id', asyncHandler(investimentosController.atualizarInvestimento));

/**
 * @swagger
 * /investimentos/{id}:
 *   delete:
 *     summary: Remove um investimento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Investimento removido com sucesso
 */
router.delete('/:id', asyncHandler(investimentosController.removerInvestimento));

export default router;