import { Router } from 'express';
import * as pastorController from '../controllers/pastor.controller';

const router = Router();

router.post('/', (req, res, next) => {
  Promise.resolve(pastorController.create(req, res)).catch(next);
});
router.get('/', (req, res, next) => {
  Promise.resolve(pastorController.list(req, res)).catch(next);
});
router.get('/:id', (req, res, next) => {
  Promise.resolve(pastorController.get(req, res)).catch(next);
});
router.put('/:id', (req, res, next) => {
  Promise.resolve(pastorController.update(req, res)).catch(next);
});
router.delete('/:id', (req, res, next) => {
  Promise.resolve(pastorController.remove(req, res)).catch(next);
});

export default router;