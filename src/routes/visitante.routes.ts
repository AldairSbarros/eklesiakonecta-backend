import { Router } from 'express';
import * as visitanteController from '../controllers/visitanteCelula.controller';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    await visitanteController.create(req, res);
  } catch (err) {
    next(err);
  }
});
router.get('/', async (req, res, next) => {
  try {
    await visitanteController.list(req, res);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
	await visitanteController.get(req, res);
  } catch (err) {
	next(err);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    await visitanteController.update(req, res);
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    await visitanteController.remove(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;