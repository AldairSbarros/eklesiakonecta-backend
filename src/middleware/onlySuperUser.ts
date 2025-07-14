import { Request, Response, NextFunction } from 'express';

export function onlySuperUser(req: Request, res: Response, next: NextFunction): void {
  const user = (req as any).user;
  if (user && user.superuser) {
    next();
    return;
  }
  res.status(403).json({ error: 'Acesso restrito ao superusuário.' });
}