import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

/**
 * @swagger
 * /doc:
 *   get:
 *     summary: Retorna a documentação em Markdown
 *     responses:
 *       200:
 *         description: Documentação retornada com sucesso
 *         content:
 *           text/markdown:
 *             schema:
 *               type: string
 *       500:
 *         description: Documentação não encontrada
 */
router.get('/', (_req: Request, res: Response) => {
  const docPath = path.resolve(__dirname, '../../DOCUMENTACAO.md');
  fs.readFile(docPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Documentação não encontrada.');
    res.type('text/markdown').send(data);
  });
});

export default router;