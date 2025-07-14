import { Router, Request, Response, NextFunction } from 'express';
import * as ministerioService from '../services/ministerio.service';
import { autenticarJWT } from '../middleware/autenticarJWT';

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
 * /ministerios:
 *   post:
 *     summary: Cria um novo ministério
 *     security:
 *       - bearerAuth: []
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
 *         description: Ministério criado com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.post(
  '/',
  autenticarJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const ministerio = await ministerioService.createMinisterio(schema, req.body);
    res.status(201).json(ministerio);
  })
);

/**
 * @swagger
 * /ministerios:
 *   get:
 *     summary: Lista todos os ministérios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de ministérios retornada com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.get(
  '/',
  autenticarJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const ministerios = await ministerioService.listMinisterios(schema);
    res.json(ministerios);
  })
);

/**
 * @swagger
 * /ministerios/{id}:
 *   get:
 *     summary: Busca um ministério por ID
 *     security:
 *       - bearerAuth: []
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
 *         description: Ministério encontrado com sucesso
 *       400:
 *         description: Schema não informado no header
 *       404:
 *         description: Ministério não encontrado
 */
router.get(
  '/:id',
  autenticarJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const ministerio = await ministerioService.getMinisterio(schema, Number(id));
    if (!ministerio) return res.status(404).json({ error: 'Ministério não encontrado.' });
    res.json(ministerio);
  })
);

/**
 * @swagger
 * /ministerios/{id}:
 *   put:
 *     summary: Atualiza um ministério
 *     security:
 *       - bearerAuth: []
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
 *         description: Ministério atualizado com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.put(
  '/:id',
  autenticarJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    const ministerio = await ministerioService.updateMinisterio(schema, Number(id), req.body);
    res.json(ministerio);
  })
);

/**
 * @swagger
 * /ministerios/{id}:
 *   delete:
 *     summary: Remove um ministério
 *     security:
 *       - bearerAuth: []
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
 *         description: Ministério removido com sucesso
 *       400:
 *         description: Schema não informado no header
 */
router.delete(
  '/:id',
  autenticarJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const schema = req.headers['schema'] as string;
    if (!schema) return res.status(400).json({ error: 'Schema não informado no header.' });
    const { id } = req.params;
    await ministerioService.deleteMinisterio(schema, Number(id));
    res.json({ message: 'Ministério removido com sucesso.' });
  })
);

export default router;