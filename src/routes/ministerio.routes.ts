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

// Criar ministério
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

// Listar ministérios
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

// Obter ministério por ID
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

// Atualizar ministério
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

// Remover ministério
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