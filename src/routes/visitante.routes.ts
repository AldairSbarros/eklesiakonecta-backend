import { Router } from 'express';
import * as visitanteController from '../controllers/visitanteCelula.controller';

const router = Router();

/**
 * @swagger
 * /visitante:
 *   post:
 *     summary: Cria um novo visitante de célula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Visitante criado com sucesso
 */
router.post('/', async (req, res, next) => {
  try {
    await visitanteController.create(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /visitante:
 *   get:
 *     summary: Lista todos os visitantes de célula
 *     responses:
 *       200:
 *         description: Lista de visitantes retornada com sucesso
 */
router.get('/', async (req, res, next) => {
  try {
    await visitanteController.list(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /visitante/{id}:
 *   get:
 *     summary: Busca um visitante de célula por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visitante encontrado com sucesso
 */
router.get('/:id', async (req, res, next) => {
  try {
    await visitanteController.get(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /visitante/{id}:
 *   put:
 *     summary: Atualiza um visitante de célula
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
 *         description: Visitante atualizado com sucesso
 */
router.put('/:id', async (req, res, next) => {
  try {
    await visitanteController.update(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /visitante/{id}:
 *   delete:
 *     summary: Remove um visitante de célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Visitante removido com sucesso
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await visitanteController.remove(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;