import { Router, Request, Response, NextFunction } from 'express';
import * as escolaLideresModuloController from '../controllers/escolaLideresModulo.controller';

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
 * /escola-lideres-modulo:
 *   post:
 *     summary: Cria um novo módulo da escola de líderes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Módulo criado com sucesso
 */
router.post('/', asyncHandler(escolaLideresModuloController.create));

/**
 * @swagger
 * /escola-lideres-modulo:
 *   get:
 *     summary: Lista todos os módulos da escola de líderes
 *     responses:
 *       200:
 *         description: Lista de módulos retornada com sucesso
 */
router.get('/', asyncHandler(escolaLideresModuloController.list));

/**
 * @swagger
 * /escola-lideres-modulo/{id}:
 *   get:
 *     summary: Busca um módulo da escola de líderes por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Módulo encontrado com sucesso
 */
router.get('/:id', asyncHandler(escolaLideresModuloController.get));

/**
 * @swagger
 * /escola-lideres-modulo/{id}:
 *   put:
 *     summary: Atualiza um módulo da escola de líderes
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
 *         description: Módulo atualizado com sucesso
 */
router.put('/:id', asyncHandler(escolaLideresModuloController.update));

/**
 * @swagger
 * /escola-lideres-modulo/{id}:
 *   delete:
 *     summary: Remove um módulo da escola de líderes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Módulo removido com sucesso
 */
router.delete('/:id', asyncHandler(escolaLideresModuloController.remove));

export default router;