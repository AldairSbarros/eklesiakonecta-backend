import { Router, RequestHandler } from 'express';
import * as tokenController from '../controllers/tokenRecuperacaoSenha.controller';

const router = Router();

/**
 * @swagger
 * /token-recuperacao-senha:
 *   post:
 *     summary: Cria um novo token de recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Token criado com sucesso
 */
router.post('/', tokenController.create as RequestHandler);

/**
 * @swagger
 * /token-recuperacao-senha/{id}:
 *   get:
 *     summary: Busca um token de recuperação de senha por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token encontrado com sucesso
 */
router.get('/:id', tokenController.get as RequestHandler);

/**
 * @swagger
 * /token-recuperacao-senha/{id}:
 *   put:
 *     summary: Atualiza um token de recuperação de senha
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
 *         description: Token atualizado com sucesso
 */
router.put('/:id', tokenController.update as RequestHandler);

/**
 * @swagger
 * /token-recuperacao-senha/{id}:
 *   delete:
 *     summary: Remove um token de recuperação de senha
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Token removido com sucesso
 */
router.delete('/:id', tokenController.remove as RequestHandler);
export default router;