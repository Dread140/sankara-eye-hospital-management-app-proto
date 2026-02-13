import { Router } from 'express';
import { createBilling, payBilling } from '../controllers/billingController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.post('/', authenticate, authorize('admin', 'billing'), asyncHandler(createBilling));
router.put('/pay/:id', authenticate, authorize('admin', 'billing'), asyncHandler(payBilling));

export default router;
