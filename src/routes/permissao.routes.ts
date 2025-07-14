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

// CRUD de permissões
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