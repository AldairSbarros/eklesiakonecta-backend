import { Router, Request, Response, NextFunction } from 'express';
import * as escolaLideresLicaoController from '../controllers/escolaLideresLicao.controller';

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
 * /escola-lideres-licao:
 *   post:
 *     summary: Cria uma nova lição da escola de líderes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Lição criada com sucesso
 */
router.post('/', asyncHandler(escolaLideresLicaoController.create));

/**
 * @swagger
 * /escola-lideres-licao:
 *   get:
 *     summary: Lista todas as lições da escola de líderes
 *     responses:
 *       200:
 *         description: Lista de lições retornada com sucesso
 */
router.get('/', asyncHandler(escolaLideresLicaoController.list));

/**
 * @swagger
 * /escola-lideres-licao/{id}:
 *   get:
 *     summary: Busca uma lição da escola de líderes por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lição encontrada com sucesso
 */
router.get('/:id', asyncHandler(escolaLideresLicaoController.get));

/**
 * @swagger
 * /escola-lideres-licao/{id}:
 *   put:
 *     summary: Atualiza uma lição da escola de líderes
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
 *         description: Lição atualizada com sucesso
 */
router.put('/:id', asyncHandler(escolaLideresLicaoController.update));

/**
 * @swagger
 * /escola-lideres-licao/{id}:
 *   delete:
 *     summary: Remove uma lição da escola de líderes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Lição removida com sucesso
 */
router.delete('/:id', asyncHandler(escolaLideresLicaoController.remove));

export default router;