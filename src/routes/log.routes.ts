import { Router, Request, Response, NextFunction } from 'express';
import * as logController from '../controllers/log.controller';

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
 * /log:
 *   post:
 *     summary: Cria um novo log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Log criado com sucesso
 */
router.post('/', asyncHandler(logController.create));

/**
 * @swagger
 * /log:
 *   get:
 *     summary: Lista todos os logs
 *     responses:
 *       200:
 *         description: Lista de logs retornada com sucesso
 */
router.get('/', asyncHandler(logController.list));

/**
 * @swagger
 * /log/{id}:
 *   put:
 *     summary: Atualiza um log
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
 *         description: Log atualizado com sucesso
 */
router.put('/:id', asyncHandler(logController.update));

/**
 * @swagger
 * /log/{id}:
 *   delete:
 *     summary: Remove um log
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Log removido com sucesso
 */
router.delete('/:id', asyncHandler(logController.remove));

export default router;