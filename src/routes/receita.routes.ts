import { Router } from 'express';
import * as receitasController from '../controllers/receitas.controller';

const router = Router();

// Helper para funções async
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /receita:
 *   post:
 *     summary: Cria uma nova receita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Receita criada com sucesso
 */
router.post('/', asyncHandler(receitasController.criarReceita));

/**
 * @swagger
 * /receita:
 *   get:
 *     summary: Lista todas as receitas
 *     responses:
 *       200:
 *         description: Lista de receitas retornada com sucesso
 */
router.get('/', asyncHandler(receitasController.listarReceitas));

/**
 * @swagger
 * /receita/{id}:
 *   get:
 *     summary: Busca uma receita por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receita encontrada com sucesso
 */
router.get('/:id', asyncHandler(receitasController.obterReceita));

/**
 * @swagger
 * /receita/{id}:
 *   put:
 *     summary: Atualiza uma receita
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
 *         description: Receita atualizada com sucesso
 */
router.put('/:id', asyncHandler(receitasController.atualizarReceita));

/**
 * @swagger
 * /receita/{id}:
 *   delete:
 *     summary: Remove uma receita
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Receita removida com sucesso
 */
router.delete('/:id', asyncHandler(receitasController.removerReceita));
export default router;