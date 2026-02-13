import { Router } from 'express';
import { createBilling, payBilling } from '../controllers/billingController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/', authenticate, authorize('admin', 'billing'), createBilling);
router.put('/pay/:id', authenticate, authorize('admin', 'billing'), payBilling);

export default router;
