import { Router, Request, Response } from 'express';
import * as vendaController from '../controllers/venda.controller';

const router = Router();

/**
 * @swagger
 * /venda:
 *   post:
 *     summary: Cria uma nova venda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 */
router.post('/', async (req: Request, res: Response, next) => {
    try {
        await vendaController.create(req, res);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /venda:
 *   get:
 *     summary: Lista todas as vendas
 *     responses:
 *       200:
 *         description: Lista de vendas retornada com sucesso
 */
router.get('/', async (req: Request, res: Response, next) => {
    try {
        await vendaController.list(req, res);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /venda/{id}:
 *   put:
 *     summary: Atualiza uma venda
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
 *         description: Venda atualizada com sucesso
 */
router.put('/:id', async (req: Request, res: Response, next) => {
    try {
        await vendaController.update(req, res);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /venda/{id}:
 *   delete:
 *     summary: Remove uma venda
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Venda removida com sucesso
 */
router.delete('/:id', async (req: Request, res: Response, next) => {
    try {
        await vendaController.remove(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;