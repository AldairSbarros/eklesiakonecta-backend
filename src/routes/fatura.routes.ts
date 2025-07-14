import { Router, Request, Response, NextFunction } from 'express';
import * as faturaController from '../controllers/fatura.controller';

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
 * /faturas:
 *   post:
 *     summary: Cria uma nova fatura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Fatura criada com sucesso
 */
router.post('/', asyncHandler(faturaController.create));

/**
 * @swagger
 * /faturas:
 *   get:
 *     summary: Lista todas as faturas
 *     responses:
 *       200:
 *         description: Lista de faturas retornada com sucesso
 */
router.get('/', asyncHandler(faturaController.list));

/**
 * @swagger
 * /faturas/{id}:
 *   get:
 *     summary: Busca uma fatura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fatura encontrada com sucesso
 */
router.get('/:id', asyncHandler(faturaController.get));

/**
 * @swagger
 * /faturas/{id}:
 *   put:
 *     summary: Atualiza uma fatura
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
 *         description: Fatura atualizada com sucesso
 */
router.put('/:id', asyncHandler(faturaController.update));

/**
 * @swagger
 * /faturas/{id}:
 *   delete:
 *     summary: Remove uma fatura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Fatura removida com sucesso
 */
router.delete('/:id', asyncHandler(faturaController.remove));

export default router;