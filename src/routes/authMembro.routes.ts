import { Router } from 'express';
import { loginMembro } from '../controllers/authMembro.controller';

const router = Router();

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/login-membro', asyncHandler(loginMembro));

export default router;