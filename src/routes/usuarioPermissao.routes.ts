import { Router } from 'express';
import * as usuarioPermissaoController from '../controllers/usuarioPermissao.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';

const router = Router();

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * @swagger
 * /usuario-permissao:
 *   post:
 *     summary: Cria uma nova permissão de usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Permissão de usuário criada com sucesso
 */
router.post('/', autenticarJWT, asyncHandler(usuarioPermissaoController.create));

/**
 * @swagger
 * /usuario-permissao:
 *   get:
 *     summary: Lista todas as permissões de usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de permissões de usuário retornada com sucesso
 */
router.get('/', autenticarJWT, asyncHandler(usuarioPermissaoController.list));

/**
 * @swagger
 * /usuario-permissao/{id}:
 *   put:
 *     summary: Atualiza uma permissão de usuário
 *     security:
 *       - bearerAuth: []
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
 *         description: Permissão de usuário atualizada com sucesso
 */
router.put('/:id', autenticarJWT, asyncHandler(usuarioPermissaoController.update));

/**
 * @swagger
 * /usuario-permissao/{id}:
 *   delete:
 *     summary: Remove uma permissão de usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Permissão de usuário removida com sucesso
 */
router.delete('/:id', autenticarJWT, asyncHandler(usuarioPermissaoController.remove));

export default router;