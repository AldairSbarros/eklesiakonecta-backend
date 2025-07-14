// import { Router } from 'express';
// import * as webhookController from '../controllers/webhook.controller';



// const router = Router();

// // Helper to wrap async route handlers and forward errors to Express
// const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

// // router.post('/', asyncHandler(webhookController.create));
// // Uncomment the above line after implementing and exporting 'create' in webhook.controller
// router.get('/', asyncHandler(webhookController.list));
// router.get('/:id', asyncHandler(webhookController.get));
// router.put('/:id', asyncHandler(webhookController.update));
// router.delete('/:id', asyncHandler(webhookController.remove));

// export default router;