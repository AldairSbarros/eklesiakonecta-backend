import { Router, Request, Response } from 'express';
import * as memberController from '../controllers/member.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Cria um novo membro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Membro criado com sucesso
 */
router.post('/', memberController.create);

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Lista todos os membros
 *     responses:
 *       200:
 *         description: Lista de membros retornada com sucesso
 */
router.get('/', memberController.list);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Busca um membro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Membro encontrado com sucesso
 */
router.get('/:id', (req, res, next) => {
  memberController.get(req, res).catch(next);
});

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Atualiza um membro
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
 *         description: Membro atualizado com sucesso
 */
router.put('/:id', memberController.update);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Remove um membro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Membro removido com sucesso
 */
router.delete('/:id', memberController.remove);

/**
 * @swagger
 * /members/{id}/localizacao:
 *   put:
 *     summary: Atualiza a localização do membro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Localização do membro atualizada com sucesso
 */
router.put(
  '/:id/localizacao',
  autenticarJWT,
  autorizarRoles(['ADMIN', 'LIDER']),
  (req, res, next) => {
    memberController.atualizarLocalizacao(req, res).catch(next);
  }
);

export default router;