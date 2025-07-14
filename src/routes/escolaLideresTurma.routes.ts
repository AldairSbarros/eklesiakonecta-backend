import { Router, Request, Response, NextFunction } from 'express';
import * as escolaLideresTurmaController from '../controllers/escolaLideresTurma.controller';

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
 * /escola-lideres-turma:
 *   post:
 *     summary: Cria uma nova turma da escola de líderes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 */
router.post('/', asyncHandler(escolaLideresTurmaController.create));

/**
 * @swagger
 * /escola-lideres-turma:
 *   get:
 *     summary: Lista todas as turmas da escola de líderes
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
 */
router.get('/', asyncHandler(escolaLideresTurmaController.list));

/**
 * @swagger
 * /escola-lideres-turma/{id}:
 *   get:
 *     summary: Busca uma turma da escola de líderes por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turma encontrada com sucesso
 */
router.get('/:id', asyncHandler(escolaLideresTurmaController.get));

/**
 * @swagger
 * /escola-lideres-turma/{id}:
 *   put:
 *     summary: Atualiza uma turma da escola de líderes
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
 *         description: Turma atualizada com sucesso
 */
router.put('/:id', asyncHandler(escolaLideresTurmaController.update));

/**
 * @swagger
 * /escola-lideres-turma/{id}:
 *   delete:
 *     summary: Remove uma turma da escola de líderes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Turma removida com sucesso
 */
router.delete('/:id', asyncHandler(escolaLideresTurmaController.remove));

export default router;