import { Router, Request, Response, NextFunction } from 'express';
import * as celulaController from '../controllers/celula.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

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
 * /celulas:
 *   post:
 *     summary: Cria uma nova célula
 *     responses:
 *       201:
 *         description: Célula criada
 */
router.post('/', asyncHandler(celulaController.create));

/**
 * @swagger
 * /celulas:
 *   get:
 *     summary: Lista todas as células
 *     responses:
 *       200:
 *         description: Lista de células
 */
router.get('/', asyncHandler(celulaController.list));

/**
 * @swagger
 * /celulas/{id}:
 *   get:
 *     summary: Busca uma célula por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Célula encontrada
 */
router.get('/:id', asyncHandler(celulaController.get));

/**
 * @swagger
 * /celulas/{id}:
 *   put:
 *     summary: Atualiza uma célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Célula atualizada
 */
router.put('/:id', asyncHandler(celulaController.update));

/**
 * @swagger
 * /celulas/{id}:
 *   delete:
 *     summary: Remove uma célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Célula removida
 */
router.delete('/:id', asyncHandler(celulaController.remove));

/**
 * @swagger
 * /celulas/{id}/localizacao:
 *   put:
 *     summary: Atualiza a localização da célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Localização atualizada
 */
router.put('/:id/localizacao', autenticarJWT, autorizarRoles(['ADMIN', 'LIDER']), asyncHandler(celulaController.atualizarLocalizacao));

/**
 * @swagger
 * /celulas/{id}/membros:
 *   post:
 *     summary: Adiciona um membro à célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Membro adicionado à célula
 */
router.post('/:id/membros', asyncHandler(celulaController.addMembro));

/**
 * @swagger
 * /celulas/{id}/membros/{membroId}:
 *   delete:
 *     summary: Remove um membro da célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: membroId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Membro removido da célula
 */
router.delete('/:id/membros/:membroId', asyncHandler(celulaController.removeMembro));

/**
 * @swagger
 * /celulas/{id}/membros:
 *   get:
 *     summary: Lista os membros de uma célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de membros da célula
 */
router.get('/:id/membros', celulaController.listarMembros as (req: Request, res: Response, next: NextFunction) => any);

export default router;