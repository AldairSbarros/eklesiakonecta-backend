import { Router, Request, Response, NextFunction } from 'express';
import * as despesaController from '../controllers/despesa.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /despesas:
 *   post:
 *     summary: Cria uma nova despesa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Despesa criada
 */
router.post('/', asyncHandler(despesaController.criarDespesa));

/**
 * @swagger
 * /despesas:
 *   get:
 *     summary: Lista todas as despesas
 *     responses:
 *       200:
 *         description: Lista de despesas
 */
router.get('/', asyncHandler(despesaController.listarDespesas));

/**
 * @swagger
 * /despesas/{id}:
 *   get:
 *     summary: Busca uma despesa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Despesa encontrada
 */
router.get('/:id', asyncHandler(despesaController.obterDespesa));

/**
 * @swagger
 * /despesas/{id}:
 *   put:
 *     summary: Atualiza uma despesa
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
 *         description: Despesa atualizada
 */
router.put('/:id', asyncHandler(despesaController.atualizarDespesa));

/**
 * @swagger
 * /despesas/{id}:
 *   delete:
 *     summary: Remove uma despesa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Despesa removida
 */
router.delete('/:id', asyncHandler(despesaController.removerDespesa));
export default router;