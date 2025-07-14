import { Router } from 'express';
import * as encontroController from '../controllers/encontro.controller';

const router = Router();

router.post('/', (req, res, next) => {
  encontroController.create(req, res).catch(next);
});
router.get('/', (req, res, next) => {
  encontroController.list(req, res).catch(next);
});
router.get('/:id', (req, res, next) => {
  encontroController.get(req, res).catch(next);
});
router.put('/:id', (req, res, next) => {
  encontroController.update(req, res).catch(next);
});
router.delete('/:id', (req, res, next) => {
  encontroController.remove(req, res).catch(next);
});

export default router;