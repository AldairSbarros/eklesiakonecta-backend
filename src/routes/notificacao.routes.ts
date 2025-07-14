import { Router, Request, Response, NextFunction } from 'express';
import * as notificacaoController from '../controllers/notificacao.controller';

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
 * /notificacao:
 *   post:
 *     summary: Cria uma nova notificação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Notificação criada com sucesso
 */
router.post('/', asyncHandler(notificacaoController.create));

/**
 * @swagger
 * /notificacao:
 *   get:
 *     summary: Lista todas as notificações
 *     responses:
 *       200:
 *         description: Lista de notificações retornada com sucesso
 */
router.get('/', asyncHandler(notificacaoController.list));

/**
 * @swagger
 * /notificacao/{id}:
 *   get:
 *     summary: Busca uma notificação por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notificação encontrada com sucesso
 */
router.get('/:id', asyncHandler(notificacaoController.get));

/**
 * @swagger
 * /notificacao/{id}:
 *   put:
 *     summary: Atualiza uma notificação
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
 *         description: Notificação atualizada com sucesso
 */
router.put('/:id', asyncHandler(notificacaoController.update));

/**
 * @swagger
 * /notificacao/{id}:
 *   delete:
 *     summary: Remove uma notificação
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Notificação removida com sucesso
 */
router.delete('/:id', asyncHandler(notificacaoController.remove));

export default router;