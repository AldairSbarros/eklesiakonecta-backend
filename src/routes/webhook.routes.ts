import { Router, Request, Response, NextFunction } from 'express';
import * as webhookController from '../controllers/webhook.controller';

const router = Router();

// Helper para funções async
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Cria um novo webhook
 *     parameters:
 *       - in: header
 *         name: schema
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
 *       201:
 *         description: Webhook criado com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
  const webhook = await webhookController.createWebhook(schema, req.body);
  res.status(201).json(webhook);
}));

/**
 * @swagger
 * /webhook:
 *   get:
 *     summary: Lista todos os webhooks
 *     parameters:
 *       - in: header
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de webhooks retornada com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
  const webhooks = await webhookController.listWebhooks(schema);
  res.json(webhooks);
}));

/**
 * @swagger
 * /webhook/{id}:
 *   get:
 *     summary: Busca um webhook por ID
 *     parameters:
 *       - in: header
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Webhook encontrado com sucesso
 *       400:
 *         description: Schema não informado no header
 *       404:
 *         description: Webhook não encontrado
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
  const webhook = await webhookController.getWebhook(schema, Number(id));
  if (!webhook) return res.status(404).json({ error: 'Webhook não encontrado.' });
  res.json(webhook);
}));

/**
 * @swagger
 * /webhook/{id}:
 *   put:
 *     summary: Atualiza um webhook
 *     parameters:
 *       - in: header
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook atualizado com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
  const webhook = await webhookController.updateWebhook(schema, Number(id), req.body);
  res.json(webhook);
}));

/**
 * @swagger
 * /webhook/{id}:
 *   delete:
 *     summary: Remove um webhook
 *     parameters:
 *       - in: header
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Webhook removido com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const schema = req.headers['schema'] as string;
  const { id } = req.params;
  if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
  await webhookController.deleteWebhook(schema, Number(id));
  res.json({ message: 'Webhook removido com sucesso.' });
}));