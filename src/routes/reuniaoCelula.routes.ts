import { Router, Request, Response } from 'express';
import * as reuniaoController from '../controllers/reuniaoCelula.controller';

const router = Router();

router.post('/', (req, res, next) => {
  Promise.resolve(reuniaoController.create(req, res)).catch(next);
});
router.get('/', (req, res, next) => {
  Promise.resolve(reuniaoController.list(req, res)).catch(next);
});
router.get('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.get(req, res)).catch(next);
});
router.put('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.update(req, res)).catch(next);
});
router.delete('/:id', (req, res, next) => {
  Promise.resolve(reuniaoController.remove(req, res)).catch(next);
});

export default router;