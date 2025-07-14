import { Router } from 'express';
import * as pastorController from '../controllers/pastor.controller';

const router = Router();

/**
 * @swagger
 * /pastor:
 *   post:
 *     summary: Cria um novo pastor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Pastor criado com sucesso
 */
router.post('/', (req, res, next) => {
  Promise.resolve(pastorController.create(req, res)).catch(next);
});

/**
 * @swagger
 * /pastor:
 *   get:
 *     summary: Lista todos os pastores
 *     responses:
 *       200:
 *         description: Lista de pastores retornada com sucesso
 */
router.get('/', (req, res, next) => {
  Promise.resolve(pastorController.list(req, res)).catch(next);
});

/**
 * @swagger
 * /pastor/{id}:
 *   get:
 *     summary: Busca um pastor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pastor encontrado com sucesso
 */
router.get('/:id', (req, res, next) => {
  Promise.resolve(pastorController.get(req, res)).catch(next);
});

/**
 * @swagger
 * /pastor/{id}:
 *   put:
 *     summary: Atualiza um pastor
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
 *         description: Pastor atualizado com sucesso
 */
router.put('/:id', (req, res, next) => {
  Promise.resolve(pastorController.update(req, res)).catch(next);
});

/**
 * @swagger
 * /pastor/{id}:
 *   delete:
 *     summary: Remove um pastor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pastor removido com sucesso
 */
router.delete('/:id', (req, res, next) => {
  Promise.resolve(pastorController.remove(req, res)).catch(next);
});

export default router;