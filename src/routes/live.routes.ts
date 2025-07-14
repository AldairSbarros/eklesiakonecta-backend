import { Router } from 'express';
import * as liveController from '../controllers/live.controller';

const router = Router();

router.post('/', liveController.create);
router.get('/:churchId', liveController.listByChurch);

export default router;