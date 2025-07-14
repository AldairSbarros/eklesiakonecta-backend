import { Router, Request, Response, NextFunction } from 'express';
import { criarMensagem, listarMensagens, listarMensagensPDF, obterMensagem, atualizarMensagem, removerMensagem } from '../controllers/mensagemCelula.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /mensagem-celula:
 *   post:
 *     summary: Cria uma nova mensagem de célula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso
 */
router.post('/', asyncHandler(criarMensagem));

/**
 * @swagger
 * /mensagem-celula:
 *   get:
 *     summary: Lista todas as mensagens de célula
 *     responses:
 *       200:
 *         description: Lista de mensagens retornada com sucesso
 */
router.get('/', asyncHandler(listarMensagens));

/**
 * @swagger
 * /mensagem-celula/pdfs:
 *   get:
 *     summary: Lista os PDFs das mensagens de célula
 *     responses:
 *       200:
 *         description: Lista de PDFs retornada com sucesso
 */
router.get('/pdfs', asyncHandler(listarMensagensPDF));

/**
 * @swagger
 * /mensagem-celula/{id}:
 *   get:
 *     summary: Busca uma mensagem de célula por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensagem encontrada com sucesso
 */
router.get('/:id', asyncHandler(obterMensagem));

/**
 * @swagger
 * /mensagem-celula/{id}:
 *   put:
 *     summary: Atualiza uma mensagem de célula
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
 *         description: Mensagem atualizada com sucesso
 */
router.put('/:id', asyncHandler(atualizarMensagem));

/**
 * @swagger
 * /mensagem-celula/{id}:
 *   delete:
 *     summary: Remove uma mensagem de célula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Mensagem removida com sucesso
 */
router.delete('/:id', asyncHandler(removerMensagem));

export default router;