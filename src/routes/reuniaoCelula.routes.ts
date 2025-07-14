import { Router, Request, Response } from 'express';
import * as reuniaoController from '../controllers/reuniaoCelula.controller';

const router = Router();

/**
 * @swagger
 * /reuniao-celula:
 *   post:
 *     summary: Cria uma nova reunião de célula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Reunião criada com sucesso
 */
router.post('/', (req, res, next) => {
  Promise.resolve(reuniaoController.create(req, res)).catch(next);
});

/**
 * @swagger
 * /reuniao-celula:
 *   get:
 *     summary: Lista todas as reuniões de célula
 *     responses:
 *       200:
 *         description: Lista de reuniões retornada com sucesso
 */
router.get('/', (req, res, next) => {
  Promise.resolve(reuniaoController.list(req, res)).catch(next);
});

/**
 * @swagger
 * /reuniao-celula/{id}:
 *   get:
 *     summary: Busca uma reunião de célula por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reunião encontrada com sucesso
 */
router.get('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.get(req, res)).catch(next);
});

/**
 * @swagger
 * /reuniao-celula/{id}:
 *   put:
 *     summary: Atualiza uma reunião de célula
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
 *         description: Reunião atualizada com sucesso
 */
router.put('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.update(req, res)).catch(next);
});

/**
 * @swagger
 * /reuniao-celula/{id}:
 *   delete:
 *     summary: Remove uma reunião de célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Reunião removida com sucesso
 */
router.delete('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.remove(req, res)).catch(next);
});

export default router;