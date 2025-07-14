import { Router } from 'express';
import { createDevUser } from '../controllers/devuser.controller';
import { autenticarJWT } from '../middleware/autenticarJWT';
import { onlySuperUser } from '../middleware/onlySuperUser';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// Rota protegida: apenas superusuário autenticado pode criar DevUser
router.post('/devuser', autenticarJWT, onlySuperUser, asyncHandler(createDevUser));

export default router;