import { Router, Request, Response, NextFunction } from 'express';
import * as permissaoController from '../controllers/permissao.controller';

const router = Router();

// Handler para funções async
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * @swagger
 * /permissao:
 *   post:
 *     summary: Cria uma nova permissão
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
 *         description: Permissão criada com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      return res.status(400).json({ error: 'Schema não informado no header.' });
    }
    const result = await permissaoController.createPermissao(schema, req.body);
    res.status(201).json(result);
  })
);

/**
 * @swagger
 * /permissao:
 *   get:
 *     summary: Lista todas as permissões
 *     parameters:
 *       - in: header
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de permissões retornada com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) {
      return res.status(400).json({ error: 'Schema não informado no header.' });
    }
    const permissoes = await permissaoController.listPermissoes(schema);
    res.json(permissoes);
  })
);

/**
 * @swagger
 * /permissao/{id}:
 *   get:
 *     summary: Busca uma permissão por ID
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
 *         description: Permissão encontrada com sucesso
 *       400:
 *         description: Schema não informado no header
 *       404:
 *         description: Permissão não encontrada
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    if (!schema) {
      return res.status(400).json({ error: 'Schema não informado no header.' });
    }
    const permissao = await permissaoController.getPermissao(schema, Number(id));
    if (!permissao) {
      return res.status(404).json({ error: 'Permissão não encontrada.' });
    }
    res.json(permissao);
  })
);

/**
 * @swagger
 * /permissao/{id}:
 *   put:
 *     summary: Atualiza uma permissão
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
 *         description: Permissão atualizada com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    if (!schema) {
      return res.status(400).json({ error: 'Schema não informado no header.' });
    }
    const permissao = await permissaoController.updatePermissao(schema, Number(id), req.body);
    res.json(permissao);
  })
);

/**
 * @swagger
 * /permissao/{id}:
 *   delete:
 *     summary: Remove uma permissão
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
 *         description: Permissão removida com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    const { id } = req.params;
    if (!schema) {
      return res.status(400).json({ error: 'Schema não informado no header.' });
    }
    await permissaoController.deletePermissao(schema, Number(id));
    res.json({ message: 'Permissão removida com sucesso.' });
  })
);

export default router;