import { Router } from 'express';
import * as congregacaoController from '../controllers/congregacao.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

/**
 * @swagger
 * /congregacoes:
 *   post:
 *     summary: Cria uma nova congregação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Congregação criada
 */
router.post('/', congregacaoController.create);

/**
 * @swagger
 * /congregacoes:
 *   get:
 *     summary: Lista todas as congregações
 *     responses:
 *       200:
 *         description: Lista de congregações
 */
router.get('/', congregacaoController.list);

/**
 * @swagger
 * /congregacoes/{id}:
 *   put:
 *     summary: Atualiza uma congregação
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
 *         description: Congregação atualizada
 */
router.put('/:id', congregacaoController.update);

/**
 * @swagger
 * /congregacoes/{id}:
 *   delete:
 *     summary: Remove uma congregação
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Congregação removida
 */
router.delete('/:id', congregacaoController.remove);

/**
 * @swagger
 * /congregacoes/{id}/localizacao:
 *   put:
 *     summary: Atualiza a localização da congregação
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
 *         description: Localização da congregação atualizada
 */
router.put(
  '/:id/localizacao',
  autenticarJWT,
  autorizarRoles(['ADMIN']),
  (req, res, next) => {
    Promise.resolve(congregacaoController.atualizarLocalizacao(req, res)).catch(next);
  }
  );

export default router;