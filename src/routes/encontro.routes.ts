import { Router } from 'express';
import * as encontroController from '../controllers/encontro.controller';

const router = Router();

/**
 * @swagger
 * /encontros:
 *   post:
 *     summary: Cria um novo encontro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Encontro criado com sucesso
 */
router.post('/', (req, res, next) => {
  encontroController.create(req, res).catch(next);
});

/**
 * @swagger
 * /encontros:
 *   get:
 *     summary: Lista todos os encontros
 *     responses:
 *       200:
 *         description: Lista de encontros retornada com sucesso
 */
router.get('/', (req, res, next) => {
  encontroController.list(req, res).catch(next);
});

/**
 * @swagger
 * /encontros/{id}:
 *   get:
 *     summary: Busca um encontro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encontro encontrado com sucesso
 */
router.get('/:id', (req, res, next) => {
  encontroController.get(req, res).catch(next);
});

/**
 * @swagger
 * /encontros/{id}:
 *   put:
 *     summary: Atualiza um encontro
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
 *         description: Encontro atualizado com sucesso
 */
router.put('/:id', (req, res, next) => {
  encontroController.update(req, res).catch(next);
});

/**
 * @swagger
 * /encontros/{id}:
 *   delete:
 *     summary: Remove um encontro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Encontro removido com sucesso
 */
router.delete('/:id', (req, res, next) => {
  encontroController.remove(req, res).catch(next);
});

export default router;