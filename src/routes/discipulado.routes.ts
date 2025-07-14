import { Router } from 'express';
import * as discipuladoController from '../controllers/discipulado.controller';

const router = Router();

/**
 * @swagger
 * /discipulandos/{id}:
 *   get:
 *     summary: Lista os discipulandos de um discipulador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de discipulandos retornada com sucesso
 */
router.get('/discipulandos/:id', discipuladoController.listarDiscipulandos); // lista discipulandos de um discipulador

/**
 * @swagger
 * /discipulandos:
 *   get:
 *     summary: Lista todos os discipulandos
 *     responses:
 *       200:
 *         description: Lista de todos os discipulandos retornada com sucesso
 */
router.get('/discipulandos', discipuladoController.listarTodosDiscipulandos); // lista todos

/**
 * @swagger
 * /discipulando:
 *   post:
 *     summary: Cria um novo discipulando
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Discipulando criado com sucesso
 */
router.post('/discipulando', discipuladoController.criarDiscipulando); // cria

/**
 * @swagger
 * /discipulando/{id}:
 *   put:
 *     summary: Atualiza um discipulando
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
 *         description: Discipulando atualizado com sucesso
 */
router.put('/discipulando/:id', discipuladoController.atualizarDiscipulando); // atualiza

/**
 * @swagger
 * /discipulando/{id}:
 *   delete:
 *     summary: Remove um discipulando
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Discipulando removido com sucesso
 */
router.delete('/discipulando/:id', discipuladoController.removerDiscipulando); // remove

/**
 * @swagger
 * /discipulador/{id}:
 *   put:
 *     summary: Troca o discipulador de um discipulando
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
 *         description: Discipulador trocado com sucesso
 */
router.put('/discipulador/:id', discipuladoController.trocarDiscipulador); // troca discipulador

export default router;